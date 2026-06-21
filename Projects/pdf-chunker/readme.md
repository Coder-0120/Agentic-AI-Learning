# 📄 PDF Chunker + FAISS + Gemini RAG System

A beginner-friendly **Retrieval-Augmented Generation (RAG)** project that extracts text from PDFs, converts it into embeddings, stores them in a vector database (FAISS), and performs semantic search using AI embeddings.

---

# 🚀 Features

- 📄 PDF text extraction using `pdf-parse`
- ✂️ Chunking with overlap (context preservation)
- 🧠 Embeddings using Google Gemini (`gemini-embedding-001`)
- ⚡ Vector storage using FAISS (`faiss-node`)
- 🔍 Semantic similarity search
- 📊 Top-K relevant chunk retrieval

---

# 🏗️ Tech Stack

- Node.js
- FAISS (faiss-node)
- Google Gemini AI (@google/genai)
- pdf-parse
- dotenv

---

# 📁 Project Structure

```bash
pdf-chunker/
│
├── sample.pdf          # Input PDF file
├── index.js            # Main RAG pipeline
├── .env                # API keys
├── package.json
└── node_modules

```
# 🧠 RAG System Flowchart (PDF → FAISS → AI Answer)

## 📊 System Architecture

```text
┌──────────────────────┐
│      PDF FILE        │
│   (sample.pdf)      │
└─────────┬────────────┘
          │
          ▼
┌──────────────────────┐
│  PDF TEXT EXTRACTION │
│     pdf-parse        │
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
│  Chunk1: 0–100 chars            │
│  Chunk2: 80–180 chars           │
│  Chunk3: 160–260 chars          │
│  (Overlap preserved context)    │
└─────────┬────────────────────────┘
          │
          ▼
┌──────────────────────────────────┐
│   EMBEDDING GENERATION (GEMINI) │
│   Text → Vector Representation   │
└─────────┬────────────────────────┘
          │
          ▼
┌──────────────────────────────────┐
│        FAISS INDEX               │
│   Stores all vector embeddings  │
└─────────┬────────────────────────┘
          │
          ▼
┌──────────────────────┐
│   USER QUESTION      │
│ "What is FAISS?"     │
└─────────┬────────────┘
          │
          ▼
┌──────────────────────────────────┐
│ QUERY EMBEDDING (GEMINI)        │
│ Question → Vector               │
└─────────┬────────────────────────┘
          │
          ▼
┌──────────────────────────────────┐
│     FAISS SEARCH ENGINE          │
│ Finds nearest vectors (Top K)    │
└─────────┬────────────────────────┘
          │
          ▼
┌──────────────────────────────────┐
│   TOP MATCHING CHUNKS RETURNED   │
│ Relevant PDF text snippets       │
└──────────────────────────────────┘