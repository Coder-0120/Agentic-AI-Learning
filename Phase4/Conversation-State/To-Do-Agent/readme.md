# 📝 Task Creation Agent

A stateful command-line Task Management Agent built with Node.js that demonstrates **Conversation State Management**, **State Persistence**, and **Task Storage**.

This project simulates how modern AI agents collect information through multi-step conversations, maintain workflow state, and store completed tasks for future retrieval.

---

# 🚀 Project Overview

The Task Creation Agent helps users create and manage tasks through natural conversation.

Instead of asking for all details at once, the agent collects information step-by-step:

* Task Title
* Deadline
* Priority

The agent remembers unfinished workflows using `state.json` and stores completed tasks in `tasks.json`.

---

# ✨ Features

### 📌 Create Tasks

Create tasks through a guided conversation.

### 💾 Persistent State

Resume incomplete task creation even after restarting the application.

### 📋 View All Tasks

Display all saved tasks at any time.

### 🗑 Delete Tasks

Remove a specific task.

### 🧹 Clear Tasks

Delete all stored tasks.

### 🔄 Workflow Recovery

Continue from the exact step where the conversation stopped.

---

# 🎯 Learning Objectives

This project demonstrates:

* Conversation State Management
* Multi-Step Workflows
* Persistent Storage
* CRUD Operations
* Agent-Based Thinking
* Workflow Recovery
* State vs Data Separation

---

# 🧠 Core Concept

The project uses two different files:

## 1️⃣ state.json

Stores the current workflow progress.

Example:

```json
{
  "creatingTask": true,
  "taskTitle": "Learn LangGraph",
  "deadline": null,
  "priority": null
}
```

Purpose:

```text
Remember where the conversation currently is.
```

---

## 2️⃣ tasks.json

Stores completed tasks.

Example:

```json
[
  {
    "title": "Learn LangGraph",
    "deadline": "Tomorrow",
    "priority": "High"
  },
  {
    "title": "Build AI Agent",
    "deadline": "Sunday",
    "priority": "Medium"
  }
]
```

Purpose:

```text
Store completed work permanently.
```

---

# 📂 Project Structure

```text
Task-Agent
│
├── index.js
├── state.json
├── tasks.json
└── README.md
```

---

# 🔄 Workflow

```text
User Starts Task
        │
        ▼
 Ask Task Title
        │
        ▼
 Ask Deadline
        │
        ▼
 Ask Priority
        │
        ▼
 Save Task
        │
        ▼
 Reset State
```

---

# 📊 State Transition Example

### Initial State

```json
{
  "creatingTask": false,
  "taskTitle": null,
  "deadline": null,
  "priority": null
}
```

---

### After "add task"

```json
{
  "creatingTask": true,
  "taskTitle": null,
  "deadline": null,
  "priority": null
}
```

---

### After Entering Title

```json
{
  "creatingTask": true,
  "taskTitle": "Learn LangGraph",
  "deadline": null,
  "priority": null
}
```

---

### After Entering Deadline

```json
{
  "creatingTask": true,
  "taskTitle": "Learn LangGraph",
  "deadline": "Tomorrow",
  "priority": null
}
```

---

### Final State

```json
{
  "creatingTask": true,
  "taskTitle": "Learn LangGraph",
  "deadline": "Tomorrow",
  "priority": "High"
}
```

---

# 🏗️ System Architecture

```text
┌─────────────┐
│ User Input  │
└──────┬──────┘
       │
       ▼
┌─────────────┐
│ Agent Logic │
└──────┬──────┘
       │
       ▼
┌─────────────┐
│ State Check │
└──────┬──────┘
       │
       ▼
┌─────────────┐
│ Ask Question│
└──────┬──────┘
       │
       ▼
┌─────────────┐
│ Update State│
└──────┬──────┘
       │
       ▼
┌─────────────┐
│ Save Files  │
└─────────────┘
```

---

# 💬 Example Conversation

```text
You: add task

Bot: What is the task title?

You: Learn LangGraph

Bot: What is the deadline?

You: Tomorrow

Bot: What is the priority?

You: High

✅ Task Created Successfully

Title: Learn LangGraph
Deadline: Tomorrow
Priority: High
```

---

# 📋 Available Commands

### Create a Task

```text
add task
```

### View All Tasks

```text
show tasks
```

### Delete a Task

```text
delete 1
```

### Clear All Tasks

```text
clear tasks
```

### Exit Application

```text
exit
```

---

# 🔄 Workflow Recovery Example

Imagine the application closes after entering a task title.

Saved State:

```json
{
  "creatingTask": true,
  "taskTitle": "Learn LangGraph",
  "deadline": null,
  "priority": null
}
```

After restarting:

```text
🔄 Incomplete Task Found

Bot: What is the deadline?
```

The conversation resumes automatically.

---

# 📚 State vs Data

## State

```json
{
  "creatingTask": true,
  "taskTitle": "Learn LangGraph"
}
```

Represents:

```text
Current workflow progress
```

---

## Data

```json
[
  {
    "title": "Learn LangGraph",
    "deadline": "Tomorrow",
    "priority": "High"
  }
]
```

Represents:

```text
Completed tasks
```

---

# 🌟 Key Takeaways

This project teaches one of the most important concepts in Agentic AI:

### Conversation State Management

Modern AI systems use state to:

* Track progress
* Handle multi-step workflows
* Resume interrupted tasks
* Make intelligent decisions

The same concepts power:

* AI Assistants
* Flight Booking Agents
* Customer Support Agents
* LangGraph Workflows
* Multi-Agent Systems

---

# 🎓 What You Learned

✅ Conversation State

✅ State Persistence

✅ Data Persistence

✅ CRUD Operations

✅ Multi-Step Conversations

✅ Workflow Recovery

✅ Agent Design Fundamentals

This project serves as an excellent foundation before learning Tool Calling, ReAct Agents, LangGraph, and advanced Agentic AI workflows.
