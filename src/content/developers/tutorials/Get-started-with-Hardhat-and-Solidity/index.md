---
title: "Get started with Hardhat and Solidity"
description: Hardhat and solidity tutorial for absolute beginners.
author: Kundan Mishra
lang: en
sidebar: true
tags: ["solidity", "smart contracts", "blockchain", "Hardhat", "ethereum"]
skill: begginers
published: 2022-01-30
source: mishra811.hashnode.dev
sourceUrl: https://mishra811.hashnode.dev/get-started-with-hardhat-and-solidity
---

If you are someone who writes smart contracts on daily basis. You might be familiar with **remix** IDE or even if you are a beginner and looking for some tools to write your first contract you should have heard of remix IDE.

It's a great tool to start writing, testing, and deploying your contracts. But the problem is that this IDE only runs in the browser.

What if we could have the same environment locally on our machine?
Then comes in the picture **Hardhat**.

**This tutorial is for beginners** and **intermediate** developers. In this tutorial, I will teach you how to use **Hardhat** to write, test and deploy your contracts ASAP. We will also be learning the basics of solidity and smart contracts side by side by building a simple **Counter** project.
In this project, we will store a number on the blockchain and write three functions to increment its value by 1, decrement the value by 1, and a function to set the value equals zero.

Not only we will be writing solidity for our contracts but also we will be testing and deploying our contract to a testnet using javascript.

## Prerequisites:

1. You should have a basic knowledge of how **Blockchain** works. Read more about it [here](https://builtin.com/blockchain).
2. A basic knowledge of **JavaScript**. Learn javascript for free [here](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/).
3. **Nodejs** installed in your computer. Install it from [here](https://nodejs.org/en/).
4. **Metamask** installed in your browser. How to install metamask, read about it [here](https://www.geeksforgeeks.org/how-to-install-and-use-metamask-on-google-chrome/).

## Project overview:

1. Folder structure.
2. Smart contracts.
3. Tests.
4. Deployment.

Now I am assuming that you have installed **nodejs** and **metamask** and you are ready to build.

But before we move forward and learn how to use hardhat. Let's take a look at what is hardhat.

> Hardhat is a development environment to compile, deploy, test, and debug your Ethereum software. It helps developers manage and automate the recurring tasks that are inherent to the process of building smart contracts and dApps, as well as easily introducing more functionality around this workflow.

So the first thing we need to do is to install **Hardhat** locally in our machine. For this open your terminal or command prompt and write this command.

```
npm install --save-dev hardhat

```

Now, wait for some time until it gets installed. After the process is over you can check to make sure if the installation was successful by this command:

```
npx hardhat help

```

You should see something like this in your terminal:

```
Hardhat version 2.8.3

Usage: hardhat [GLOBAL OPTIONS] <TASK> [TASK OPTIONS]

GLOBAL OPTIONS:

  --config              A Hardhat config file.
  --emoji               Use emoji in messages.
  --help                Shows this message, or a task's help if its name is provided
  --max-memory          The maximum amount of memory that Hardhat can use.
  --network             The network to connect to.
  --show-stack-traces   Show stack traces.
  --tsconfig            A TypeScript config file.
  --verbose             Enables Hardhat verbose logging
  --version             Shows hardhat's version.


AVAILABLE TASKS:

  accounts      Prints the list of accounts
  check         Check whatever you need
  clean         Clears the cache and deletes all artifacts
  compile       Compiles the entire project, building all artifacts
  console       Opens a hardhat console
  flatten       Flattens and prints contracts and their dependencies
  help          Prints this message
  node          Starts a JSON-RPC server on top of Hardhat Network
  run           Runs a user-defined script after compiling the project
  test          Runs mocha tests

To get help for a specific task run: npx hardhat help [task]
```

Note that this is the version at the time of writing this blog.

### Folder Structure

Let's quickly initialise the project, first enter the **desktop** directory:

```
cd Desktop
```

now make a directory named **tutorial** inside the desktop directory:

```
mkdir tutorial
```

Enter into the tutorial directory:

```
cd tutorial
```

Now you are inside the tutorial directory run this command to initialize the project

```
npx hardhat
```

You should see something like this in your terminal.
![Screenshot (31).png](https://cdn.hashnode.com/res/hashnode/image/upload/v1643438665755/_J_8dNi0l.png)

This is a command-line interface by Hardhat which allows us to set up a project.

Just select the first option which says **> Create a basic sample project** and hit enter now this will ask you some questions like **> Hardhat project root**, **> Do you want to add a .gitignore? (Y/n)** etc. Just hit enter every time.

Now your project has been initialized but you should be seeing some dependencies to install in your terminal let's quickly install them:

```
npm install --save-dev "hardhat@^2.8.2" "@nomiclabs/hardhat-waffle@^2.0.0" "ethereum-waffle@^3.0.0" "chai@^4.2.0" "@nomiclabs/hardhat-ethers@^2.0.0" "ethers@^5.0.0"
```

Now that we have our project ready just open this project in your favorite IDE or text editor. I am using VS Code but you can use any of them.

Your folder structure should be like this.

![Screenshot (33).png](https://cdn.hashnode.com/res/hashnode/image/upload/v1643439760393/gQ95VP6Ij.png)

First, we have the **contracts** folder. Here we will be writing our contracts. Now you might be thinking "what is a smart contract anyway?". Don't worry we will look into that shortly in the next section of our project.

You see we have a file with a **.sol** extension which tells us that this is a solidity( a language used to code smart contracts on ethereum blockchain) file.

Next, we have **node modules**. This folder just stores all our dependencies used in the project,
note that it is little faded. This is because we have put node modules in our **.gitignore** file, which just keeps records of all the files which we don't want to track via git( a version controle system).

Next we got a **scripts folder** this folder consists of javascript files with some scripts to deploy our smart contract.

Next we have **test** folder which consists test files for our contracts.

Now we have already talked about **.gitignore** file above.

Next, we have the **hardhat.config.js** file, which just has some settings about our project.

Next, we have the **package-lock.json** and **package.json** files, these files are just maintaining the packages used in our project.

At last, we have **README.md**, this file is documenting our project.

Now let's do some cleanup I want you to delete these files:

1. Greeter.sol in contracts folder.
2. sample-scripts.js in scripts folder.
3. sample-test.js in test folder.

### Smart contracts

What is a smart contract in simple words?

> Smart contracts are simply programs stored on a blockchain that run when predetermined conditions are met. They typically are used to automate the execution of an agreement so that all participants can be immediately certain of the outcome, without an intermediary's involvement or time loss.

The programming language used to write smart contracts on ethereum is **solidity**.

> Solidity is an object-oriented programming language, meaning that it is organized by data or objects rather than functions or logic. Its main purpose is for developing smart contracts for the Ethereum blockchain.

create a new file named **Counter.sol** inside contracts directory and write this code .

```
//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract Counter {
    uint public number = 2;

    function increment() public {
        number++;
        console.log("number is %d",number);
    }

    function decrement() public {
        number --;
        console.log("number is %d",number);
    }

    function backToZero() public{
        number=0;
        console.log("number is %d",number);
    }
}
```

Let's break it down into pieces to get a better understanding:

```
//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";
```

You see "SPDX-License-Identifier" is used to represent that this code is open source.
In the next line, we are declaring the solidity version we want to use because solidity is evolving really fast, and every now and then a new version of solidity releases, that's why it is important to tell the compiler which version of solidity we are using.

In the next line, we are importing a file that let us use console statement in solidity for debugging.

> Note: solidity does not support console statements. That's why here we are importing a hardhat module to allow the use of console statements.

Now let's take a look at what is happening in the code,

```
contract Counter{}
```

Here we have a contract named "Counter". In solidity a class is represented by the keyword 'contract'. So, here we are just defining a class named "Counter"

Now let's take a look at the functions and variables in this code,

```
contract Counter {
    uint public number = 2;

    function increment() public {
        number++;
        console.log("number is %d",number);
    }

    function decrement() public {
        number --;
        console.log("number is %d",number);
    }

    function backToZero() public{
        number=0;
        console.log("number is %d",number);
    }
}
```

Solidity is statically typed, so you have to define the data type of variables you are using.
In the first line of the contract, we are declaring a variable that is an unsigned integer(non-negative) named "number" and initializing it with the value of 2. This variable will be stored on the blockchain and in solidity, these kinds of variables are known as "state variables".

Note that we also have a "public" keyword with "number" variable, which means that the value of this variable can be accessed from outside this contract with a getter function ".number()", this function is automatically generated by solidity whenever we use "public" keyword with a state variable.

```
    function increment() public {
        number++;
        console.log("number is %d",number);
    }

```

Next, we have our first function. The "public" here means that this function can be executed from outside this contract. In this function we are just incrementing the value of "number" by 1 and then logging it into the console.

```
    function decrement() public {
        number --;
        console.log("number is %d",number);
    }
```

Next, we have our second function we are just decrementing the value of "number" by 1 and then logging it into the console.

```
    function backToZero() public{
        number=0;
        console.log("number is %d",number);
    }

```

Next, we have our last function we are just setting the value of "number" equals 0 and then logging it into the console.

Now what you can do is open your terminal, locate to the tutorial folder and try to compile this contract by using this command,

```
npx hardhat compile
```

As a result, you should see this message on the console if you haven't made any syntax error in your code.

```
Compiling 1 file with 0.8.4
Solidity compilation finished successfully

```

Also, observe your folder structure, now at the top you should see two new folders generated named "artifacts" and "cache".

![Screenshot (37).png](https://cdn.hashnode.com/res/hashnode/image/upload/v1643519508530/Yl2Hu-PY7.png)

This "artifact" folder is very important for us as it holds a JSON format data known as ABI(Application Binary Interface) about our contract that can be later used when we want to interact with our contract through a client side application, like a website, a web app or even a mobile app.

### Tests

Now is the time to test our contracts, first thing to do is create a file called test.js inside the test folder and paste this code.

```
const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Counter", function () {
  let Counter;
  let counter;

  beforeEach(async () => {
    Counter = await ethers.getContractFactory("Counter");
    counter = await Counter.deploy();
    await counter.deployed();
  });

  it("Should increment the number", async function () {
    let number = await counter.number();
    const incrementTxn = await counter.increment();
    await incrementTxn.wait();
    expect(await counter.number()).to.equal(parseInt(number) + 1);
  });

  it("Should decrement the number", async function () {
    let number = await counter.number();
    const decrementTxn = await counter.decrement();
    await decrementTxn.wait();
    expect(await counter.number()).to.equal(parseInt(number) - 1);
  });

  it("Should set the number equal to zero", async function () {
    const zeroTxn = await counter.backToZero();
    await zeroTxn.wait();
    expect(await counter.number()).to.equal(0);
  });
});


```

Let's break this down. The first thing to notice is that this is a javascript file

```
const { expect } = require("chai");
const { ethers } = require("hardhat");
```

We are importing expect from "chai' which is a javascript testing library and "ethers" which is a javascript library that helps us to interact and execute the functions of the contract.

```
describe("Counter", function () {
  let Counter;
  let counter;
});
```

describe is used to define a test block that can contain a multiple numbers of tests inside it. Each test is represented with an "it" block. Here describe is taking two parameters first is the contract name and the second is the function in which we will write tests.

Then we are declaring two variables "Counter" and "counter".

```
  beforeEach(async () => {
    Counter = await ethers.getContractFactory("Counter");
    counter = await Counter.deploy();
    await counter.deployed();
  });
```

This is "beforeEach" hook this hook will run every time a new test runs, here we have three tests so the code inside the hook will run three times. The reason for using this hook is that every single test is independent of each other and runs on different instances of the contract. So for every single "it" block we have to get a new instance of the contract.

Inside the beforeEach, in the first line we are accessing the contract form the contractFactory in hardhat. In the next line we are deploying this contracting and then storing the deployed instance of the contract in the "counter" variable. Then we are waiting for this contract to be deployed.

These contracts are deployed on hardhat's very own local blockchain.

Let's move further we have our first "it" block

```
  it("Should increment the number", async function () {
    let number = await counter.number();
    const incrementTxn = await counter.increment();
    await incrementTxn.wait();
    expect(await counter.number()).to.equal(parseInt(number) + 1);
  });
```

The "it" block takes two parameters. First the test case description and an async function in which we will write the test case.

In the first line of the code inside the async function we are getting the current value of "number" from our contract. Remember when I told you we will get a getter function for this variable.
In the next line, we are making a transaction using the increment function of our contract and storing it in the "incrementTxn" variable. In the next line, we are waiting for this transaction to finish.

Now we are using "expect" which we imported from "chai" to compare the value of the number at the start of the test and after the transaction. If this "expect" block returns **True**, the test will pass.

> Note: every single test or every single "it" block is independent of each other so every time an "it" block starts to execute "number" variable will be initialized again with a value "2" as it was in our contract.

```
  it("Should decrement the number", async function () {
    let number = await counter.number();
    const decrementTxn = await counter.decrement();
    await decrementTxn.wait();
    expect(await counter.number()).to.equal(parseInt(number) - 1);
  });
```

In the first line of the code inside the async function we are getting the current value of "number" from our contract.
In the next line, we are making a transaction using the decrement function of our contract and storing it in the "decrementTxn" variable. In the next line, we are waiting for this transaction to finish.
If this "expect" block returns **True**, the test will pass.

```
  it("Should set the number equal to zero", async function () {
    const zeroTxn = await counter.backToZero();
    await zeroTxn.wait();
    expect(await counter.number()).to.equal(0);
  });
```

In the first line, we are making a transaction using the backToZero function of our contract and storing it in the "zeroTxn" variable. In the next line, we are waiting for this transaction to finish.
In the "expect" block we are comparing the "number" to zero.
If this "expect" block returns **True**, the test will pass.

Now let's run these tests, through your terminal locate to turorial folder and run this command.

```
npx hardhat test
```

If all the tests pass, you will see this output in the console.

```

  Counter
number is 3
    √ Should increment the number (46ms)
number is 1
    √ Should decrement the number
number is 0
    √ Should set the number equal to zero


  3 passing (1s)
```

When we run these tests hardhat create a local blockchain under the hood and after all the tests finish, this local blockchain will be destroyed.

If you want to keep this blockchain alive run this command in the terminal

```
npx hardhat node
```

You should see 20 new fake ethereum accounts created with fake ethers in the terminal.

### Deployment

Now that we have our contract ready and tested, Let us deploy it to the blockhain.

First thing to do is to create a new file named **deploy.js** inside the scripts folder and paste this code in it .

```
const hre = require("hardhat");

async function main() {
  const Counter = await hre.ethers.getContractFactory("Counter");
  const counter = await Counter.deploy();

  await counter.deployed();

  console.log("Counter deployed to:", counter.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
```

This is not that complicated to understand we have the "main" function.
Inside the main function, in the first line, we are accessing the contract then we are deploying that contract and storing the instance of deployed contract in "counter" variable, and then we are waiting for this contract to be deployed and then we are printing the address of the deployed contract.

Next we are calling that main function and since main returns a promise, we are resolving it.

First, let's deploy it to our local hardhat blockchain, for that locate to tutorial folder and run this command.

```
npx hardhat run scripts/deploy.js
```

As a result you will see something like this in your console.

```
Counter deployed to: 0x5FbDB2315678afecb367f032d93F642f64180aa3
```

This is the address of our deployed contract.

Now let's deploy this contract to a live testnet. This time we will deploy this contract to ropsten testnet.
For that, you need fake ethers. Head over to a ropsten faucet and put in your metamask account address and request for some ethers. Now wait till you receive these ethers.

I am using this faucet: [ropsten faucet](https://faucet.dimensions.network/)

Once you have some ethers in your account you need a node provider. You see to put your code on the blockchain you need a node connected to the blockchain and running your own node is time-consuming and takes a lot of effort.

We will be using a node service provider called **Alchemy**
Head over to **Alchemy** and sign up for free : [alchemy ](https://www.alchemy.com/)

Great now that you have an alchemy account open your dashboard.

You should see something like this

![Screenshot (39).png](https://cdn.hashnode.com/res/hashnode/image/upload/v1643524188187/4YlBknddw.png)

Now I have some projects already here, But in your case, this dashboard should be empty.

So now let's make a new project.

Click on the **CREATE APP** button on the top-right corner of the dashboard.

Now a modal form should appear and ask you to fill in the details of the project. Fill this form like this. Don't forget to select **Ropsten** in the network options. Like this.

![Screenshot (41).png](https://cdn.hashnode.com/res/hashnode/image/upload/v1643524452851/xefU7znlz.png)

Click on **CREATE APP** and now you should see this app in your dashboard.
![Screenshot (45).png](https://cdn.hashnode.com/res/hashnode/image/upload/v1643524522656/bPb06FSEA.png)

Click on **View Details** in the counter app.
You will be redirected to a page like this.

![Screenshot (46).png](https://cdn.hashnode.com/res/hashnode/image/upload/v1643524616373/r_S0NphD2.png)

Click on **VIEW KEY**. This will open up a modal with two keys. Copy the **HTTPS** key and save it somewhere. We need this key a the time of deployment.
Now you just need your metamask account's **Private Key** which has fake ethers. This should be a long string of hexadecimal characters.

For getting the private key, open your metamask.

![Screenshot (48).png](https://cdn.hashnode.com/res/hashnode/image/upload/v1643525188653/M8xyFBb3V.png)

Click on the three dots in top-right corner.

![Screenshot (52).png](https://cdn.hashnode.com/res/hashnode/image/upload/v1643525600124/_InSmuyqN.png)

Click on **acccount details**

![Screenshot (55).png](https://cdn.hashnode.com/res/hashnode/image/upload/v1643525644624/_1I69KZuf.png)

Click on **export private key**

![Screenshot (53).png](https://cdn.hashnode.com/res/hashnode/image/upload/v1643525681419/OIC19hsZ_.png)

Put in your password and hit **Confirm**, this will show you your private key, copy it and save it somewhere safe.

> Note: Never share your account's private key with anyone.

Now open **hardhat.config.js** file and paste this in there.

```
require("@nomiclabs/hardhat-waffle");

task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.8.4",
  networks: {
    ropsten: {
      url: `${YOUR_ALCHEMY_API_KEY}`,
      accounts: [
        `0x${YOUR_ACCOUNT_PRIVATE_KEY}`,
      ],
    },
  },
};

```

Now fill in your **api key** and **private key**.

After this locate to tutorial folder and run this command.

```
npx hardhat run scripts/deploy.js --network ropsten
```

Wait for around 1-2 minutes and you should see something like this in your console.

```
Counter deployed to: 0x3CCD177C848cF776Eaa487fe8549001473Bff6A9
```

This is your deployed contract address.

Head over to [Ropsten etherscan](https://ropsten.etherscan.io/)

Put in your contract address and search for your contract.

Congrats you have successfully wrote, tested and deployed a smart contract using solidity and hardhat.
