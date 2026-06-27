# YouTube Summarizer (Multi-Agents)

A privacy-focused application that extracts transcripts from YouTube videos and generates structured summaries using local LLMs via Ollama. By utilizing a local AI environment, this tool ensures your data remains private while providing high-quality insights.

## 🚀 Features

- **Automatic Transcript Extraction**: Seamlessly fetches caption data directly from any provided YouTube URL.
- **Local AI Summarization**: Leverages Ollama to generate structured summaries in the following format:
    - **TL;DR**: A concise one-sentence essence of the video.
    - **Key Highlights**: Detailed bullet points of the most important information.
    - **Conclusion**: A final summary or take-away.
- **Lightweight Web UI**: A simple and intuitive browser interface for quick execution.

## 🛠️ Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) installed on your machine.
- [Ollama](https://ollama.com/) installed and running locally.
- The required LLM model pulled (default is `gemma4:12b`):
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
   - `PORT`: The port the server will run on (Default: `3000`)
   - `OLLAMA_HOST`: The URL of your Ollama server (Default: `http://localhost:11434`)
   - `OLLAMA_MODEL`: The model name to be used (Default: `gemma4:12b`)
   - `OLLAMA_CTX`: Context window size for the LLM (Default: `65536`)

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
4. The AI will analyze the transcript and display a structured summary on the screen.

## 💻 Tech Stack

- **Backend**: Node.js, Express
- **AI Engine**: Ollama (Local LLM)
- **Key Libraries**: `youtube-transcript`, `dotenv`, `cors`
- **Frontend**: Vanilla HTML, CSS, JavaScript

---

# YouTube Summarizer (マルチエージェント版)

YouTube動画の文字起こしデータを取得し、ローカルLLM（Ollama）を使用して要約を作成するアプリケーションです。外部サービスへの依存を避け、プライバシーに配慮した完全ローカル環境での動作を実現しています。

## 🚀 主な機能

- **YouTube文字起こしの自動取得**: 動画URLから字幕データを自動的に抽出します。
- **ローカルLLMによる構造化要約**: Ollamaを使用し、以下の形式で日本語の要約を作成します：
    - **一言で言うと？**: 内容を簡潔にまとめた一文。
    - **重要ポイント**: 重要な情報を箇条書きで抽出。
    - **まとめ・結論**: 全体の結論や要点。
- **シンプルなWeb UI**: ブラウザから簡単にURLを入力して要約を実行できる直感的なインターフェース。

## 🛠️ セットアップ

### 前提条件

- [Node.js](https://nodejs.org/) がインストールされていること。
- [Ollama](https://ollama.com/) がインストールされ、起動していること。
- 使用するLLMモデル（デフォルトは `gemma4:12b`）がプル済みであること：
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
   - `PORT`: サーバーのポート番号（デフォルト: `3000`）
   - `OLLAMA_HOST`: OllamaサーバーのURL（デフォルト: `http://localhost:11434`）
   - `OLLAMA_MODEL`: 使用するモデル名（デフォルト: `gemma4:12b`）
   - `OLLAMA_CTX`: コンテキストウィンドウサイズ（デフォルト: `65536`）

### アプリの起動

以下のコマンドでサーバーを起動します：
```bash
npm start
```
起動後、ブラウザで `http://localhost:3000` にアクセスしてください。

## 📖 使用方法

1. ブラウザでアプリを開きます。
2. 要約したいYouTube動画のURLを入力し、「要約」ボタンをクリックします。
3. AIが字幕を解析し、構造化された要約が表示されます。

## 💻 技術スタック

- **Backend**: Node.js, Express
- **AI Engine**: Ollama (Local LLM)
- **Libraries**: `youtube-transcript`, `dotenv`, `cors`
- **Frontend**: HTML, CSS, JavaScript (Vanilla JS)