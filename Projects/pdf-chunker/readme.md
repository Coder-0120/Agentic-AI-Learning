# 📄 Chat with PDF v1 - Gemini + FAISS RAG System

A beginner-friendly **Retrieval-Augmented Generation (RAG)** project that extracts text from PDFs, converts it into vector embeddings, stores them in **FAISS**, retrieves relevant context based on user questions, and generates intelligent answers using **Google Gemini**.

---

# 🚀 Features

* 📄 PDF text extraction using `pdf-parse`
* ✂️ Chunking with overlap for better context preservation
* 🧠 Embeddings using Google Gemini (`gemini-embedding-001`)
* ⚡ Vector storage using FAISS (`faiss-node`)
* 🔍 Semantic similarity search
* 📊 Top-K relevant chunk retrieval
* 🤖 AI-generated answers using Gemini
* 💬 Interactive terminal chat with PDF
* 🚪 Exit anytime using `exit`

---

# 🏗️ Tech Stack

* Node.js
* Google Gemini API (`@google/genai`)
* FAISS (`faiss-node`)
* pdf-parse
* dotenv
* readline

---

# 📁 Project Structure

```bash
chat-with-pdf/
│
├── sample.pdf          # Input PDF
├── index.js            # Main Application
├── .env                # Gemini API Key
├── package.json
└── node_modules
```

---

# ⚙️ Installation

```bash
git clone https://github.com/Coder-0120/Agentic-AI-Learning.git
cd Projects
cd pdf-chunker

npm install
```

Create a `.env` file:

```env
GEMINI_API_KEY=your_api_key_here
```

---

# ▶️ Run Project

```bash
node index.js
```

---

# 💬 Example Usage

```bash
❓ Ask Question:
> What is FAISS?

🤖 Answer:

FAISS is a library developed by Facebook AI Research
for efficient similarity search and clustering of
dense vector embeddings.
```

---

# 🧠 RAG System Flowchart (PDF → FAISS → Gemini Answer)

## 📊 System Architecture

```text
┌──────────────────────┐
│      PDF FILE        │
│     sample.pdf       │
└─────────┬────────────┘
          │
          ▼
┌──────────────────────┐
│  PDF TEXT EXTRACTION │
│      pdf-parse       │
└─────────┬────────────┘
          │
          ▼
┌──────────────────────┐
│     CLEAN TEXT       │
└─────────┬────────────┘
          │
          ▼
┌──────────────────────────────────┐
│        TEXT CHUNKING             │
│                                  │
│ Chunk 1: 0–500 chars             │
│ Chunk 2: 400–900 chars           │
│ Chunk 3: 800–1300 chars          │
│                                  │
│ Overlap preserves context        │
└─────────┬────────────────────────┘
          │
          ▼
┌──────────────────────────────────┐
│ EMBEDDING GENERATION (GEMINI)    │
│                                  │
│ Text → Vector Embedding          │
└─────────┬────────────────────────┘
          │
          ▼
┌──────────────────────────────────┐
│         FAISS INDEX              │
│                                  │
│ Store all chunk embeddings       │
└─────────┬────────────────────────┘
          │
          ▼
┌──────────────────────┐
│    USER QUESTION     │
│ "What is FAISS?"     │
└─────────┬────────────┘
          │
          ▼
┌──────────────────────────────────┐
│ QUERY EMBEDDING (GEMINI)         │
│                                  │
│ Question → Vector                │
└─────────┬────────────────────────┘
          │
          ▼
┌──────────────────────────────────┐
│        FAISS SEARCH              │
│                                  │
│ Retrieve Top-K Similar Chunks    │
└─────────┬────────────────────────┘
          │
          ▼
┌──────────────────────────────────┐
│     RELEVANT CONTEXT BUILT       │
│                                  │
│ Top Retrieved Chunks Combined    │
└─────────┬────────────────────────┘
          │
          ▼
┌──────────────────────────────────┐
│       GEMINI GENERATION          │
│                                  │
│ Context + Question               │
│            ↓                     │
│      Generate Answer             │
└─────────┬────────────────────────┘
          │
          ▼
┌──────────────────────────────────┐
│        FINAL RESPONSE            │
│                                  │
│ AI Answer Based On PDF Content   │
└──────────────────────────────────┘
```

---

# 📚 Learning Outcomes

Through this project, I learned:

* PDF Parsing
* Text Chunking Strategies
* Embeddings & Vector Representations
* Semantic Search
* Cosine Similarity Concepts
* Vector Databases (FAISS)
* Retrieval-Augmented Generation (RAG)
* Google Gemini Embeddings
* Building a Chat with PDF Application
* End-to-End AI Pipeline Development

---

# 🔮 Future Improvements

* Save FAISS index to disk
* Load embeddings without recomputing
* Source citations
* Page references
* Multiple PDF support
* Web UI using React
* Conversation memory
* Hybrid Search (Keyword + Vector Search)
* Reranking
* Production-grade RAG Pipeline

```
```
