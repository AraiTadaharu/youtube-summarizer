# YouTube Summarizer (Multi-Agents)

A privacy-focused application that extracts transcripts from YouTube videos and generates comprehensive, high-quality summaries using local LLMs via Ollama or LM Studio. By utilizing a local AI environment, this tool ensures your data remains private while providing deep insights through a multi-agent pipeline.

## 🚀 Features

- **Automatic Transcript Extraction**: Seamlessly fetches caption data directly from any provided YouTube URL.
- **Multi-Agent Summarization Pipeline**: Instead of a simple summary, it employs three specialized AI agents to ensure maximum accuracy and depth:
    1. **Data Analyst**: Extracts structured facts and detailed discourse.
    2. **Fact Checker**: Critically reviews the extraction against the original transcript to find missing gaps or errors.
    3. **Technical Editor**: Synthesizes everything into a comprehensive, professional detailed guide/summary in Markdown format.
- **Flexible AI Providers**: Supports both [Ollama](https://ollama.com/) and [LM Studio](https://lmstudio.ai/).
- **Automatic Archiving**: Every generated summary is automatically saved as a `.md` file in the `summaries/` directory for future reference.
- **Lightweight Web UI**: A simple and intuitive browser interface for quick execution.

## 🛠️ Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) installed on your machine.
- Either [Ollama](https://ollama.com/) or [LM Studio](https://lmstudio.ai/) installed and running locally.
- If using Ollama, the required LLM model pulled (default is `gemma4:12b`):
  ```bash
  ollama pull gemma4:12b
  ```

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/youtube-summarizer.git
   cd youtube-summarizer
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure Environment Variables**
   Copy the example `.env` file to create your own configuration:
   ```bash
   cp .env.example .env
   ```
   Edit `.env` and adjust the following if necessary:
   - `AI_PROVIDER`: The AI engine to use (`ollama` or `lmstudio`).
   - `PORT`: The port the server will run on (Default: `3000`).
   - **For Ollama**:
     - `OLLAMA_HOST`: URL of your Ollama server (Default: `http://localhost:11434`).
     - `OLLAMA_MODEL`: Model name to be used (Default: `gemma4:12b`).
     - `OLLAMA_CTX`: Context window size (Default: `65536`).
   - **For LM Studio**:
     - `LM_STUDIO_HOST`: URL of your LM Studio server (Default: `http://localhost:1234`).
     - `LM_STUDIO_MODEL`: Model name (often ignored by LM Studio).

### Running the Application

Start the server using:
```bash
npm start
```
Once started, open your browser and navigate to `http://localhost:3000`.

## 📖 Usage

1. Open the application in your web browser.
2. Paste the URL of the YouTube video you wish to summarize.
3. Click the **Summarize** button.
4. The multi-agent pipeline will analyze the transcript and display a detailed summary.
5. Check the `summaries/` folder in the project root to find the saved Markdown file of the result.

## 💻 Tech Stack

- **Backend**: Node.js, Express
- **AI Engine**: Ollama / LM Studio (Local LLM)
- **Key Libraries**: `youtube-transcript`, `dotenv`, `cors`
- **Frontend**: Vanilla HTML, CSS, JavaScript

---

# YouTube Summarizer (マルチエージェント版)

YouTube動画の文字起こしデータを取得し、ローカルLLM（Ollama または LM Studio）を使用して高度な構造化要約を作成するアプリケーションです。外部サービスへの依存を避け、プライバシーに配慮した完全ローカル環境での動作を実現しています。

## 🚀 主な機能

- **YouTube文字起こしの自動取得**: 動画URLから字幕データを自動的に抽出します。
- **マルチエージェントによる詳細要約パイプライン**: 単なる要約ではなく、3つの専門エージェントを連携させることで、極めて精度の高い詳細な解説を作成します：
    1. **データアナリスト**: 客観的な事実に基き、議論の流れや結論を構造的に抽出。
    2. **事実チェッカー**: 元の文字起こしと照らし合わせ、漏れや誤解がないか批判的に検討し修正案を提示。
    3. **テクニカルエディター**: 上記の結果を統合し、動画を見なくても内容が十分に把握できる包括的な詳細解説書（Markdown形式）を作成。
- **柔軟なAIプロバイダー選択**: [Ollama](https://ollama.com/) および [LM Studio](https://lmstudio.ai/) の両方をサポートしています。
- **自動アーカイブ機能**: 生成された要約は、後で確認できるように `summaries/` ディレクトリに `.md` ファイルとして自動的に保存されます。
- **シンプルなWeb UI**: ブラウザから簡単にURLを入力して要約を実行できる直感的なインターフェース。

## 🛠️ セットアップ

### 前提条件

- [Node.js](https://nodejs.org/) がインストールされていること。
- [Ollama](https://ollama.com/) または [LM Studio](https://lmstudio.ai/) がインストールされ、起動していること。
- Ollamaを使用する場合、使用するLLMモデル（デフォルトは `gemma4:12b`）がプル済みであること：
  ```bash
  ollama pull gemma4:12b
  ```

### インストール手順

1. **リポジトリのクローン**
   ```bash
   git clone https://github.com/your-username/youtube-summarizer.git
   cd youtube-summarizer
   ```

2. **依存関係のインストール**
   ```bash
   npm install
   ```

3. **環境変数の設定**
   `.env.example` をコピーして `.env` ファイルを作成し、必要に応じて設定を変更してください。
   ```bash
   cp .env.example .env
   ```
   - `AI_PROVIDER`: 使用するAIエンジン (`ollama` または `lmstudio`)
   - `PORT`: サーバーのポート番号（デフォルト: `3000`）
   - **Ollama設定**:
     - `OLLAMA_HOST`: OllamaサーバーのURL（デフォルト: `http://localhost:11434`）
     - `OLLAMA_MODEL`: 使用するモデル名（デフォルト: `gemma4:12b`）
     - `OLLAMA_CTX`: コンテキストウィンドウサイズ（デフォルト: `65536`）
   - **LM Studio設定**:
     - `LM_STUDIO_HOST`: LM StudioサーバーのURL（デフォルト: `http://localhost:1234`）
     - `LM_STUDIO_MODEL`: 使用するモデル名（多くの場合、ロードされているモデルが自動使用されます）

### アプリの起動

以下のコマンドでサーバーを起動します：
```bash
npm start
```
起動後、ブラウザで `http://localhost:3000` にアクセスしてください。

## 📖 使用方法

1. ブラウザでアプリを開きます。
2. 要約したいYouTube動画のURLを入力し、「要約」ボタンをクリックします。
3. マルチエージェントパイプラインが作動し、詳細な構造化要約が表示されます。
4. プロジェクトルートの `summaries/` フォルダに保存されたMarkdownファイルを確認してください。

## 💻 技術スタック

- **Backend**: Node.js, Express
- **AI Engine**: Ollama / LM Studio (Local LLM)
- **Libraries**: `youtube-transcript`, `dotenv`, `cors`
- **Frontend**: HTML, CSS, JavaScript (Vanilla JS)