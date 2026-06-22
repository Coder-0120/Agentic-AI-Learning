import readline from "readline";
import fs from "fs";

/*
|--------------------------------------------------------------------------
| Conversation State
|--------------------------------------------------------------------------
*/
let state = {
  registering: false,
  name: null,
  branch: null,
  year: null,
};
if (fs.existsSync("state.json")) {
  const data = fs.readFileSync("state.json", "utf8");

  if (data.trim()) {
    state = JSON.parse(data);
  }
}

console.log("\n📂 Loaded State:");
console.log(state);

/*
|--------------------------------------------------------------------------
| Readline Setup
|--------------------------------------------------------------------------
*/
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

/*
|--------------------------------------------------------------------------
| Ask Question
|--------------------------------------------------------------------------
*/
function askQuestion(question) {
  return new Promise((resolve) => {
    rl.question(question, resolve);
  });
}

/*
|--------------------------------------------------------------------------
| Reset Registeration state
|--------------------------------------------------------------------------
*/
function resetOrder() {
  state = {
    registering: false,
    name: null,
    branch: null,
    year: null,
  };
    saveState();

}
// to save student data in state.json
function saveState() {
  fs.writeFileSync(
    "state.json",
    JSON.stringify(state, null, 2)
  );
}
/*
|--------------------------------------------------------------------------
| Main Chat
|--------------------------------------------------------------------------
*/
async function startAgent() {
  console.log("\n Student Registeration Agent");
  if (state.registering) {
  console.log("\n🔄 Previous registration found.");

  if (!state.name) {
    console.log("Bot: Name of Student?");
  } else if (!state.branch) {
    console.log("Bot: Which Branch?");
  } else if (!state.year) {
    console.log("Bot: Which Year?");
  }
}
   console.log("\nBot: Say 'Register' to start registration.\n");
  console.log("Type 'exit' to quit.\n");

  while (true) {
    const userInput = await askQuestion("You: ");

    if (userInput.toLowerCase() === "exit") {
      console.log("\n👋 Goodbye!");
      rl.close();
      break;
    }

    /*
    ------------------------------------------------------------------------
    | Start Registeration
    ------------------------------------------------------------------------
    */
    if (
      !state.registering &&
      userInput.toLowerCase().includes("register")
    ) {
      state.registering = true;
      saveState();
      console.log("\nBot: Name of Student?");
      continue;
    }

    /*
    ------------------------------------------------------------------------
    | Student Name
    ------------------------------------------------------------------------
    */
    if (state.registering && !state.name) {
      state.name = userInput;
      saveState();
      console.log("\n📌 Current State:");
      console.log(state);
      console.log("\nBot: Which Branch?");
      console.log("Options: CSE,CSE-DS,CSE-AIML,IT,ECE,ME\n");
      continue;
    }

    /*
    ------------------------------------------------------------------------
    | Which Year
    ------------------------------------------------------------------------
    */
    if (state.registering && !state.branch) {
      state.branch = userInput;
      saveState();
      console.log("\n📌 Current State:");
      console.log(state);
      console.log("\nBot: Which year ?\n");
      continue;
    }

    /*
    ------------------------------------------------------------------------
    | Quantity
    ------------------------------------------------------------------------
    */
    if (state.registering && !state.year) {
      state.year = userInput;
      saveState();
      console.log("\n📌 Final State:");
      console.log(state);
      console.log("\n✅ Registration Done!");
      console.log(`Name: ${state.name}`);
      console.log(`Branch: ${state.branch}`);
      console.log(`Year: ${state.year}`);
      resetOrder();
       console.log(
      "\nBot: Say 'Register' to start registration.\n"
    );

      continue;
    }

    /*
    ------------------------------------------------------------------------
    | Default Response
    ------------------------------------------------------------------------
    */
    console.log(
      "\nBot: Say 'Register' to start registraion.\n"
    );
  }
}

/*
|--------------------------------------------------------------------------
| Run Agent
|--------------------------------------------------------------------------
*/
startAgent();