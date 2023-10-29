                         /////////////////////// ...ATM MACHINE... ///////////////////////

import inquirer from "inquirer";

interface Transaction {
  type: string;
  amount: number;
  date: Date;
}

interface Account {
  accountNumber: string;
  pin: string;
  balance: number;
}

let account: Account = {
  accountNumber: "123456789",
  pin: "2222",
  balance: 10000,
};

async function login() {
  const input = await inquirer.prompt([
    {
      name: "accountNumber",
      type: "string",
      message: "Enter your account number"
    },
    {
      name: "pin",
      type: "password",
      message: "Please enter your pin",
      mask: "*"
    }
  ]);

  if (input.accountNumber === account.accountNumber && input.pin === account.pin) {
    console.log("Your login is successful");
    return true;
  } else {
    console.log("Login error");
    return false;
  }
};
function checkBalance() {
  console.log(`Your account balance is ${account.balance}`);
}

async function withdrawAmount() {
  const { amount } = await inquirer.prompt([
    {
      name: "amount",
      type: "number",
      message: "Enter amount you want to withdraw"
    }
  ]);

  if (amount <= account.balance) {
    account.balance -= amount;
    ({
      type: 'Withdrawal',
      amount,
      date: new Date()
    });
    console.log("Your withdrawal was successful");
  } else {
    console.log("Insufficient balance");
  }
}

async function performAction() {
  const { action } = await inquirer.prompt([
    {
      name: "action",
      type: "list",
      message: "What would you like to do?",
      choices: ["Check Balance", "Withdraw", "View Transactions", "Logout"],
    },
  ]);

  switch (action) {
    case "Check Balance":
      checkBalance();
      break;
    case "Withdraw":
      await withdrawAmount();
      break;
    case "View Transactions":
      break;
    case "Logout":
      console.log("You have logged out successfully");
      break;
    default:
      console.log("Invalid action");
  }
}

async function main() {
  const loggedIn = await login();
  
  if (loggedIn) {
    await performAction();
  }
}
main();
