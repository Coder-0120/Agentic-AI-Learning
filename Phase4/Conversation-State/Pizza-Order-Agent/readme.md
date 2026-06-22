# 🍕 Pizza Order Agent

A simple command-line Pizza Ordering Agent built using Node.js and Conversation State Management.

This project demonstrates how an AI agent can maintain state across multiple user interactions and guide users through a multi-step workflow.

---

# 📖 Overview

The Pizza Order Agent helps users place a pizza order by collecting the following information step by step:

* Pizza Type
* Pizza Size
* Quantity

Instead of asking all questions at once, the agent tracks the current state of the conversation and asks only for the missing information.

This mimics how modern AI agents manage workflows and user interactions.

---

# 🎯 Learning Objectives

This project helps understand:

* Conversation State Management
* Multi-turn Conversations
* State Transitions
* Agent Workflows
* Conditional Logic
* User Interaction Handling

---

# 🧠 Conversation State

The agent maintains the following state:

```javascript
{
  ordering: false,
  pizzaType: null,
  size: null,
  quantity: null
}
```

Each user response updates a specific part of the state until all required information is collected.

---

# 🔄 Workflow

1. User starts an order.
2. Agent asks for pizza type.
3. Agent asks for pizza size.
4. Agent asks for quantity.
5. Agent confirms the order.
6. Agent resets the state for the next order.

---

# 📊 State Transition Flow

```text
┌─────────────┐
│ Start Order │
└──────┬──────┘
       │
       ▼
┌────────────────────┐
│ Ask Pizza Type     │
└──────┬─────────────┘
       │
       ▼
┌────────────────────┐
│ Ask Pizza Size     │
└──────┬─────────────┘
       │
       ▼
┌────────────────────┐
│ Ask Quantity       │
└──────┬─────────────┘
       │
       ▼
┌────────────────────┐
│ Confirm Order      │
└──────┬─────────────┘
       │
       ▼
┌────────────────────┐
│ Reset State        │
└────────────────────┘
```

---

# 🏗️ Architecture

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
Order Confirmation
```

---

# 💬 Example Conversation

```text
You: I want pizza

Bot: Which pizza would you like?

You: Farmhouse

Bot: What size?

You: Large

Bot: How many pizzas do you want?

You: 2

Bot: Order Confirmed!

Pizza: Farmhouse
Size: Large
Quantity: 2
```

---

# 🔍 Example State Updates

Initial State:

```javascript
{
  ordering: true,
  pizzaType: null,
  size: null,
  quantity: null
}
```

After Selecting Pizza:

```javascript
{
  ordering: true,
  pizzaType: "Farmhouse",
  size: null,
  quantity: null
}
```

After Selecting Size:

```javascript
{
  ordering: true,
  pizzaType: "Farmhouse",
  size: "Large",
  quantity: null
}
```

After Selecting Quantity:

```javascript
{
  ordering: true,
  pizzaType: "Farmhouse",
  size: "Large",
  quantity: "2"
}
```

---

# 🚀 Key Concepts Demonstrated

## Conversation State

Stores the current progress of the conversation.

## Multi-Step Workflow

Collects information in multiple stages.

## Conditional Routing

Determines the next question based on missing data.

## State Reset

Resets the workflow after successful completion.

## Agent Thinking Pattern

```text
Current State
      │
      ▼
Missing Information?
      │
      ▼
Ask Question
      │
      ▼
Update State
      │
      ▼
Repeat Until Complete
```

---

# 📚 What This Project Teaches

Before building advanced AI agents, it is important to understand:

* Short-Term Memory
* Long-Term Memory
* Conversation State
* Workflow Management

This Pizza Order Agent is a practical introduction to Conversation State Management, which is a core concept used in modern Agentic AI systems.
