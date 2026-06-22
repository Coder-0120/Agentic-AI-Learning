import readline from "readline";

/*
|--------------------------------------------------------------------------
| Conversation State
|--------------------------------------------------------------------------
*/
let state = {
  ordering: false,
  pizzaType: null,
  size: null,
  quantity: null,
};

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
| Reset Order
|--------------------------------------------------------------------------
*/
function resetOrder() {
  state = {
    ordering: false,
    pizzaType: null,
    size: null,
    quantity: null,
  };
}

/*
|--------------------------------------------------------------------------
| Main Chat
|--------------------------------------------------------------------------
*/
async function startAgent() {
  console.log("\n🍕 Pizza Order Agent");
   console.log("\nBot: Say 'I want pizza' to start ordering.\n");
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
    | Start Order
    ------------------------------------------------------------------------
    */
    if (
      !state.ordering &&
      userInput.toLowerCase().includes("pizza")
    ) {
      state.ordering = true;

      console.log("\nBot: Which pizza would you like?");
      console.log("Options: Margherita, Farmhouse, Veggie, Paneer\n");

      continue;
    }

    /*
    ------------------------------------------------------------------------
    | Pizza Type
    ------------------------------------------------------------------------
    */
    if (state.ordering && !state.pizzaType) {
      state.pizzaType = userInput;

      console.log("\n📌 Current State:");
      console.log(state);

      console.log("\nBot: What size?");
      console.log("Options: Small, Medium, Large\n");

      continue;
    }

    /*
    ------------------------------------------------------------------------
    | Pizza Size
    ------------------------------------------------------------------------
    */
    if (state.ordering && !state.size) {
      state.size = userInput;

      console.log("\n📌 Current State:");
      console.log(state);

      console.log("\nBot: How many pizzas do you want?\n");

      continue;
    }

    /*
    ------------------------------------------------------------------------
    | Quantity
    ------------------------------------------------------------------------
    */
    if (state.ordering && !state.quantity) {
      state.quantity = userInput;

      console.log("\n📌 Final State:");
      console.log(state);
      console.log("\n✅ Order Confirmed!");
      console.log(`🍕 Pizza: ${state.pizzaType}`);
      console.log(`📏 Size: ${state.size}`);
      console.log(`🔢 Quantity: ${state.quantity}`);

      console.log("\nThank you for ordering!\n");

      resetOrder();
       console.log(
      "\nBot: Say 'I want pizza' to start ordering.\n"
    );

      continue;
    }

    /*
    ------------------------------------------------------------------------
    | Default Response
    ------------------------------------------------------------------------
    */
    console.log(
      "\nBot: Say 'I want pizza' to start ordering.\n"
    );
  }
}

/*
|--------------------------------------------------------------------------
| Run Agent
|--------------------------------------------------------------------------
*/
startAgent();