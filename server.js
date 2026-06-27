const express = require('express');
const cors = require('cors');
const { YoutubeTranscript } = require('youtube-transcript');
const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

const PORT = process.env.PORT || 3000;
const OLLAMA_HOST = process.env.OLLAMA_HOST || 'http://localhost:11434';
const OLLAMA_MODEL = process.env.OLLAMA_MODEL || 'gemma4:12b';
const OLLAMA_CTX = parseInt(process.env.OLLAMA_CTX) || 65536;

// Helper to extract video ID from YouTube URL
function extractVideoId(url) {
    const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
}

// Helper to get video title from YouTube page
async function getVideoTitle(url) {
    try {
        const response = await fetch(url);
        const html = await response.text();
        const match = html.match(/<title>(.*?)<\/title>/);
        if (match && match[1]) {
            // Remove " - YouTube" from the end of the title
            return match[1].replace(' - YouTube', '').trim();
        }
    } catch (error) {
        console.error(`Error fetching title for ${url}:`, error);
    }
    return 'untitled_video';
}

// Helper to save summary to a markdown file
function saveSummaryToFile(title, summary) {
    const summariesDir = path.join(__dirname, 'summaries');
    if (!fs.existsSync(summariesDir)) {
        fs.mkdirSync(summariesDir);
    }

    // Sanitize title for filename
    const safeTitle = title.replace(/[\\/:*?"<>|]/g, '_');
    const filePath = path.join(summariesDir, `${safeTitle}.md`);

    try {
        fs.writeFileSync(filePath, summary, 'utf8');
        return filePath;
    } catch (error) {
        console.error(`Error saving file ${filePath}:`, error);
        throw error;
    }
}

// Helper to call Ollama API
async function callLLM(systemPrompt, userPrompt) {
    const response = await fetch(`${OLLAMA_HOST}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            model: OLLAMA_MODEL,
            messages: [
                { role: 'system', content: systemPrompt },
                { role: 'user', content: userPrompt }
            ],
            options: {
                num_ctx: OLLAMA_CTX
            },
            stream: false,
        })
    });

    if (!response.ok) {
        const errorData = await response.text();
        throw new Error(`Ollama APIエラー: ${response.status} ${errorData}`);
    }

    const data = await response.json();
    return data.message.content;
}

app.post('/summarize', async (req, res) => {
    const { url } = req.body;
    if (!url) {
        return res.status(400).json({ error: 'URLが必要です' });
    }

    const videoId = extractVideoId(url);
    if (!videoId) {
        return res.status(400).json({ error: '無効なYouTube URLです' });
    }

    try {
        // 1. タイトルと字幕の取得 (並行して実行)
        const [title, transcriptItems] = await Promise.all([
            getVideoTitle(url),
            YoutubeTranscript.fetchTranscript(videoId).catch(e => null)
        ]);

        if (!transcriptItems) {
            return res.status(404).json({ error: 'この動画には利用可能な字幕が見つかりませんでした' });
        }

        const fullText = transcriptItems.map(item => item.text).join(' ');
        if (!fullText) {
            return res.status(404).json({ error: '文字起こしデータが空です' });
        }

        // マルチエージェント要約フロー

        // Agent 1: データアナリストによる詳細な構造化抽出
        const agent1System = 'あなたは優秀なデータアナリストです。提示されるYouTubeの文字起こしデータから、客観的な事実に基づき、主要なアジェンダ、詳細な議論の流れ、具体的な結論、および重要な発言を詳細に構造化して抽出してください。要約しすぎず、可能な限り具体的に記述し、情報の漏れがないように箇条書きで出力してください。';
        const agent1User = `以下の文字起こしデータを解析してください：\n\n${fullText}`;
        const agent1Result = await callLLM(agent1System, agent1User);

        // Agent 2: 事実チェッカーによる詳細な批判的検討
        const agent2System = 'あなたは非常に厳格な事実チェッカーであり、批判的思考の専門家です。【元の文字起こしデータ】と【Agent 1の抽出結果】を徹底的に比較してください。さらに深掘りすべき詳細な説明や背景、省略された重要な論理展開、または誤解を招く表現を特定し、どのように具体的に補足・修正すべきかを詳細な指摘リストとして出力してください。もし十分な詳細さが確保されており修正の必要がなければ「追加・修正の必要なし」と述べてください。';
        const agent2User = `【元の文字起こしデータ】\n${fullText}\n\n【Agent 1の抽出結果】\n${agent1Result}`;
        const agent2Result = await callLLM(agent2System, agent2User);

        // Agent 3: テクニカルエディターによる包括的な詳細解説作成
        const agent3System = 'あなたはプロのテクニカルエディターです。【Agent 1の初期抽出】に対し、【Agent 2の批判的指摘・補足】を完全に統合・反映させ、読者が動画を見なくてもその内容を十分に把握できるよう、包括的かつ詳細な解説書を作成してください。単なる要約ではなく、各トピックについて詳しく説明し、深い洞察が得られる形式にしてください。構造的で見やすいMarkdown形式（適切な見出し、太字、箇条書き）で出力してください。出力は最終成果物となるMarkdownのみとし、前置きや挨拶は一切省いてください。';
        const agent3User = `【Agent 1の初期要約】\n${agent1Result}\n\n【Agent 2の批判的指摘・補足】\n${agent2Result}`;
        const finalSummary = await callLLM(agent3System, agent3User);

        // 要約結果をファイルに保存
        saveSummaryToFile(title, finalSummary);

        res.json({ summary: finalSummary, title });

    } catch (error) {
        console.error('Error summarizing video:', error);
        res.status(500).json({ error: '動画の要約に失敗しました。Ollamaサーバーが起動しているか、モデル名が正しいか確認してください。 詳細: ' + error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    console.log(`Connecting to Ollama at: ${OLLAMA_HOST} (Model: ${OLLAMA_MODEL})`);
});