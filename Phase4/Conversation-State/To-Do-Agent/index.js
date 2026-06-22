
import fs from "fs";
import readline from "readline";

/*
|--------------------------------------------------------------------------
| Load State
|--------------------------------------------------------------------------
*/
let state = {
  creatingTask: false,
  taskTitle: null,
  deadline: null,
  priority: null,
};

if (fs.existsSync("state.json")) {
  const data = fs.readFileSync("state.json", "utf8");

  if (data.trim()) {
    state = JSON.parse(data);
  }
}

/*
|--------------------------------------------------------------------------
| Load Tasks
|--------------------------------------------------------------------------
*/
let tasks = [];

if (fs.existsSync("tasks.json")) {
  const data = fs.readFileSync("tasks.json", "utf8");

  if (data.trim()) {
    tasks = JSON.parse(data);
  }
}

/*
|--------------------------------------------------------------------------
| Save State
|--------------------------------------------------------------------------
*/
function saveState() {
  fs.writeFileSync(
    "state.json",
    JSON.stringify(state, null, 2)
  );
}

/*
|--------------------------------------------------------------------------
| Save Tasks
|--------------------------------------------------------------------------
*/
function saveTasks() {
  fs.writeFileSync(
    "tasks.json",
    JSON.stringify(tasks, null, 2)
  );
}

/*
|--------------------------------------------------------------------------
| Reset State
|--------------------------------------------------------------------------
*/
function resetState() {
  state = {
    creatingTask: false,
    taskTitle: null,
    deadline: null,
    priority: null,
  };

  saveState();
}

/*
|--------------------------------------------------------------------------
| Readline Setup
|--------------------------------------------------------------------------
*/
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function askQuestion(question) {
  return new Promise((resolve) => {
    rl.question(question, resolve);
  });
}

/*
|--------------------------------------------------------------------------
| Main Agent
|--------------------------------------------------------------------------
*/
async function startAgent() {
  console.log("\n📝 Task Creation Agent");
  console.log("Type 'exit' to quit.\n");

  /*
  --------------------------------------------------------------------------
  | Resume Previous Workflow
  --------------------------------------------------------------------------
  */
  if (state.creatingTask) {
    console.log("🔄 Incomplete Task Found");

    if (!state.taskTitle) {
      console.log("Bot: What is the task title?");
    } else if (!state.deadline) {
      console.log("Bot: What is the deadline?");
    } else if (!state.priority) {
      console.log("Bot: What is the priority?");
    }
  } else {
    console.log(
      "Commands: add task | show tasks | delete <number> | clear tasks\n"
    );
  }

  while (true) {
    const userInput = await askQuestion("You: ");

    if (userInput.toLowerCase() === "exit") {
      console.log("\n👋 Goodbye!");
      rl.close();
      break;
    }

    /*
    ------------------------------------------------------------------------
    | Show Tasks
    ------------------------------------------------------------------------
    */
    if (userInput.toLowerCase() === "show tasks") {
      if (tasks.length === 0) {
        console.log("\n📭 No Tasks Found\n");
        continue;
      }

      console.log("\n📋 All Tasks\n");

      tasks.forEach((task, index) => {
        console.log(`${index + 1}. ${task.title}`);
        console.log(`   Deadline: ${task.deadline}`);
        console.log(`   Priority: ${task.priority}\n`);
      });

      continue;
    }

    /*
    ------------------------------------------------------------------------
    | Delete Task
    ------------------------------------------------------------------------
    */
    if (userInput.toLowerCase().startsWith("delete")) {
      const taskNumber = parseInt(
        userInput.split(" ")[1]
      );

      if (
        isNaN(taskNumber) ||
        taskNumber < 1 ||
        taskNumber > tasks.length
      ) {
        console.log("\n❌ Invalid Task Number\n");
        continue;
      }

      const deletedTask =
        tasks.splice(taskNumber - 1, 1);

      saveTasks();

      console.log(
        `\n🗑 Deleted: ${deletedTask[0].title}\n`
      );

      continue;
    }

    /*
    ------------------------------------------------------------------------
    | Clear Tasks
    ------------------------------------------------------------------------
    */
    if (userInput.toLowerCase() === "clear tasks") {
      tasks = [];
      saveTasks();

      console.log("\n🧹 All Tasks Cleared\n");
      continue;
    }

    /*
    ------------------------------------------------------------------------
    | Start Task Creation
    ------------------------------------------------------------------------
    */
    if (
      !state.creatingTask &&
      userInput.toLowerCase() === "add task"
    ) {
      state.creatingTask = true;
      saveState();

      console.log("\nBot: What is the task title?\n");

      continue;
    }

    /*
    ------------------------------------------------------------------------
    | Task Title
    ------------------------------------------------------------------------
    */
    if (
      state.creatingTask &&
      !state.taskTitle
    ) {
      state.taskTitle = userInput;
      saveState();

      console.log("\n📌 Current State:");
      console.log(state);

      console.log("\nBot: What is the deadline?\n");

      continue;
    }

    /*
    ------------------------------------------------------------------------
    | Deadline
    ------------------------------------------------------------------------
    */
    if (
      state.creatingTask &&
      !state.deadline
    ) {
      state.deadline = userInput;
      saveState();

      console.log("\n📌 Current State:");
      console.log(state);

      console.log(
        "\nBot: What is the priority? (High/Medium/Low)\n"
      );

      continue;
    }

    /*
    ------------------------------------------------------------------------
    | Priority
    ------------------------------------------------------------------------
    */
    if (
      state.creatingTask &&
      !state.priority
    ) {
      state.priority = userInput;
      saveState();

      /*
      ----------------------------------------------------------------------
      | Save Completed Task
      ----------------------------------------------------------------------
      */
      tasks.push({
        title: state.taskTitle,
        deadline: state.deadline,
        priority: state.priority,
      });

      saveTasks();

      console.log("\n✅ Task Created Successfully\n");

      console.log(`Title: ${state.taskTitle}`);
      console.log(`Deadline: ${state.deadline}`);
      console.log(`Priority: ${state.priority}\n`);

      resetState();

      continue;
    }

    /*
    ------------------------------------------------------------------------
    | Default Message
    ------------------------------------------------------------------------
    */
    console.log(
      "\nCommands: add task | show tasks | delete <number> | clear tasks\n"
    );
  }
}

/*
|--------------------------------------------------------------------------
| Run Agent
|--------------------------------------------------------------------------
*/
startAgent();
