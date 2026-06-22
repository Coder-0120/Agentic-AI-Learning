# 🎓 Student Registration Agent

A command-line AI-style registration agent built with Node.js that demonstrates **Conversation State Management** and **State Persistence**.

The agent guides users through a multi-step student registration workflow while maintaining progress across interactions and application restarts.

---

# 🚀 Project Overview

This project simulates how modern AI agents manage workflows.

Instead of collecting all information at once, the agent gathers details step by step:

* Student Name
* Branch
* Academic Year

The agent keeps track of the current registration progress using a state object and saves it to a file, allowing interrupted workflows to resume later.

---

# 🎯 Learning Objectives

This project helps understand:

* Conversation State Management
* Multi-Step User Workflows
* State Persistence
* Agent-Based Thinking
* Workflow Recovery After Restart
* Building Stateful AI Applications

---

# 🧠 What is Conversation State?

Conversation state represents the current progress of an ongoing task.

Example:

```javascript
{
  registering: true,
  name: "Anshul",
  branch: null,
  year: null
}
```

The agent knows:

✅ Registration started

✅ Name collected

❌ Branch missing

❌ Year missing

Therefore, the next question should be:

```text
Which Branch?
```

---

# 📁 State Persistence

The current registration state is stored inside:

```text
state.json
```

Example:

```json
{
  "registering": true,
  "name": "Anshul",
  "branch": null,
  "year": null
}
```

This allows the application to resume an incomplete registration even after:

* Application restart
* System shutdown
* Unexpected crash

---

# 🔄 Registration Workflow

```text
Start Registration
        │
        ▼
 Ask Student Name
        │
        ▼
   Ask Branch
        │
        ▼
    Ask Year
        │
        ▼
 Registration Complete
        │
        ▼
   Reset State
```

---

# 📊 State Transition Example

### Initial State

```javascript
{
  registering: false,
  name: null,
  branch: null,
  year: null
}
```

---

### Registration Started

```javascript
{
  registering: true,
  name: null,
  branch: null,
  year: null
}
```

---

### Name Collected

```javascript
{
  registering: true,
  name: "Anshul",
  branch: null,
  year: null
}
```

---

### Branch Collected

```javascript
{
  registering: true,
  name: "Anshul",
  branch: "CSE",
  year: null
}
```

---

### Registration Completed

```javascript
{
  registering: true,
  name: "Anshul",
  branch: "CSE",
  year: "4"
}
```

---

# 🏗️ System Architecture

```text
User Input
     │
     ▼
Conversation State
     │
     ▼
Decision Logic
     │
     ▼
Next Question
     │
     ▼
State Update
     │
     ▼
Save To state.json
     │
     ▼
Continue Workflow
```

---

# 💬 Example Interaction

```text
Bot: Say 'Register' to start registration.

You: Register

Bot: Name of Student?

You: Anshul

Bot: Which Branch?

You: CSE

Bot: Which Year?

You: 4

✅ Registration Done!

Name: Anshul
Branch: CSE
Year: 4
```

---

# 🔄 Workflow Recovery Example

Suppose registration is interrupted after entering the student's name.

Saved State:

```json
{
  "registering": true,
  "name": "Anshul",
  "branch": null,
  "year": null
}
```

After restarting the application:

```text
📂 Loaded State:
{
  registering: true,
  name: 'Anshul',
  branch: null,
  year: null
}

🔄 Previous registration found.

Bot: Which Branch?
```

The workflow continues from where it stopped.

---

# 🧩 Core Concepts Demonstrated

## Conversation State

Tracks the progress of a task.

## State Persistence

Stores progress in a file.

## Workflow Management

Determines the next step dynamically.

## Recovery Mechanism

Resumes incomplete processes.

## Agent Thinking Pattern

```text
Current State
      │
      ▼
Missing Information?
      │
      ▼
Ask Next Question
      │
      ▼
Update State
      │
      ▼
Save State
      │
      ▼
Repeat Until Complete
```

---

# 📚 Memory vs State

## Memory

Stores conversation history.

```json
[
  {
    "role": "user",
    "content": "My name is Anshul"
  }
]
```

Purpose:

```text
Remember what was said.
```

---

## State

Stores workflow progress.

```json
{
  "registering": true,
  "name": "Anshul",
  "branch": null,
  "year": null
}
```

Purpose:

```text
Remember where we are in the task.
```

---

# 🌟 Key Takeaway

This project introduces one of the most important concepts in Agentic AI:

**Conversation State Management**

Modern AI systems such as booking agents, customer support bots, workflow assistants, and agent frameworks rely on state to track progress and make decisions.

Understanding state management is a crucial step before learning:

* Tool Calling
* Agent Loops
* Multi-Agent Systems
* LangGraph
* Autonomous Agents
