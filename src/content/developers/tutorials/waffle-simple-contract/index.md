---
title: Test "hello world" smart contract with easy and fun Waffle library
description: Tutorial for beginners
author: ethereum.org
tags: ["smart contracts", "solidity", "Waffle", "testing"]
skill: beginner
lang: en
sidebar: true
published: 2020-09-11
---
# What you'll learn
- Testing a simple smart contract with Waffle library

## Assumptions
- You possess very basic knowledge of smart contracts and Solidity
- You got ts-node and typescript already included in your project
# Getting started with Waffle

Open the terminal inside of your project folder and run: 
```
yarn add --dev ethereum-waffle
```
or alternatively, if you use npm:
```bash
npm install --save-dev ethereum-waffle
```
That will add the Waffle library to your project. You should now see ``node_modules`` directory along with ``package.json`` and ``yarn.lock`` files.

## Example smart contract

Below, you can see a simple smart contract that we'll work on. It’s functionality comes down to splitting Wei equally and transferring them to two receivers. For each transfer, the contract emits a Transfer event. 

We will revert the transaction in case of uneven number of Wei, so that we can test if the transaction was actually reverted. Btw, if we allow to split an uneven number of Wei, as shown below, we would lose one Wei forever.
Copy the code below and place it in ``src/EtherSplitter.sol``.

```solidity
pragma solidity ^0.6.0;

contract EtherSplitter {
    address payable receiver1;
    address payable receiver2;

    event Transfer(address from, address to, uint256 amount);

    constructor(address payable _address1, address payable _address2) public {
        receiver1 = _address1;
        receiver2 = _address2;
    }
    
    function split() public payable {
        require(msg.value % 2 == 0, 'Uneven Wei amount not allowed');
        receiver1.transfer(msg.value / 2);
        emit Transfer(msg.sender, receiver1, msg.value / 2);
        receiver2.transfer(msg.value / 2);
        emit Transfer(msg.sender, receiver2, msg.value / 2);
    }
}
```

## Compile the contract
Before the testing part starts, we want to compile our Ether splitter contract, so we must add the following entry to the package.json file:
```json
"scripts": {
    "build": "waffle"
  }
```
Next, in the project root directory, create ``waffle.json`` file (it's important to preserve the name!) and paste the following code there:
```json
  "compilerType": "solcjs",
  "compilerVersion": "0.6.2",
  "sourceDirectory": "./src",
  "outputDirectory": "./build"
}
```
Save everything and run ``` yarn build ```. As a result, the ``build`` directory should appear and our compiled contract should be inside it.

# Testing with Waffle
Tests in Waffle are written using Mocha and Chai. Therefore, run the following command to add mocha and chai to your project:
```bash
yarn add --dev mocha @types/mocha chai
```
or with npm:
```bash
npm install --save-dev mocha @types/mocha chai @types/chai
```

To enable running your tests, update your  package.json file and add the ``"test"`` entry in the scripts part:
```json
"scripts": {
    "build": "waffle",
    "test": "export NODE_ENV=test && mocha 'test/**/*.test.ts'"
  }
```
If you want to execute your tests, just run ```yarn test``` in your console.

Now create the ``test`` directory and put the new file ``EtherSplitter.test.ts`` there. This is where we'll be writing some tests for our contract. 
Copy the snippet below and save it to our test file. It's our base to which will gradually add some tests.
```ts
import {expect, use} from 'chai';
import {Contract} from 'ethers';
import {deployContract, MockProvider, solidity} from 'ethereum-waffle';
import EtherSplitter from '../build/EtherSplitter.json';

use(solidity);

describe('Ether Splitter', () => {
  const [sender, receiver1, receiver2] = new MockProvider().getWallets();
  let splitter: Contract;


  beforeEach(async () => {
    splitter = await deployContract(sender, EtherSplitter, [receiver1.address, receiver2.address]);
  });

  // we will be adding our tests here

});
```
Now let's examine what is happening in there. 
The ``MockProvider`` comes up with a local mock version of the blockchain. It also delivers mock wallets that will serve us for testing our contract. We can get up to ten wallets by calling ``getWallets()`` method on the provider. In our example, we get three wallets - for the sender and for two receivers.

Next, we declare a variable called 'splitter' - this is our mock EtherSplitter contract. It is created ``beforeEach`` execution of a single test by ``deployContract`` method. This method simulates deployment of a contract from the wallet passed as the first parameter (sender's wallet in our case). It's worth noticing here that, by default, all the Wei passed during testing will come from the wallet that the contract was deployed from - again, the sender's in our case. So, as the first argument, we provide a wallet that will pay for the deployment. The second parameter is the ABI and bytecode of our contract - it can be found in the json file with compiled EtherSplitter contract. The third parameter is an array with the contract's constructor arguments, which in our case, are the two addresses of receivers.

## ``changeBalances``

In the first test, will check if the split method actually changed the balances of our wallets. If we passed 50 Wei to the split method (the Wei are taken from the sender's wallet), we would expect the balances of receiver1 and receiver2 to increse by 25 Wei. We will use Waffle's ``changeBalances`` matcher:
```ts
it('Changes accounts balances', async () => {
  await expect(() => splitter.split({value: 50}))
    .to.changeBalances([receiver1, receiver2], [25, 25]);
});
```
As the first parameter, we pass an array of wallets the balances of which we want to check, and as the second -  an array of increases on corresponding accounts. 
If we wanted to check the balance of one specific wallet, we could also use ``changeBalance`` matcher, as in the example below:
```ts
it('Changes account balance', async () => {
  await expect(() => splitter.split({value: 50}))
    .to.changeBalance(receiver1, 25);
});
```
Note that in both cases of ``changeBalance`` and ``changeBalances`` we pass the split function as a callback because the matcher needs to access the state of balances before and after the call.

Now, we'll test if the Transfer event was emitted after each transfer of Wei. We'll turn to another matcher from Waffle: 
## ``Emit``
```ts
it('Emits event on transfer to first receiver', async () => {
  await expect(splitter.split({value: 50})).to.emit(splitter, 'Transfer')
    .withArgs(sender.address, receiver1.address, 25);
});

it('Emits event on transfer to second receiver', async () => {
  await expect(splitter.split({value: 50})).to.emit(splitter, 'Transfer')
    .withArgs(sender.address, receiver2.address, 25);
});
```
The ``emit`` matcher allows us to check if a contract emitted the specified event on calling a method. As the parameters, we provide the mock contract that we predict to emit the event, along with the name of that event. In our case, the mock contract is ``splitter`` and the name of the event - ``Transfer``. We can also verify the precise values of arguments that the event was emmited with - we pass as many arguments to ``withArgs`` matcher, as our event expects. In case of EtherSplitter contract, we pass the addresses of the sender and the receiver along with the transferred Wei amount.
## ``revertedWith``
As the last example, we'll check if the transaction was reverted in case of uneven number of Wei. We'll use ``revertedWith`` matcher:
```ts
it('Reverts when Vei amount uneven', async () => {
    await expect(splitter.split({value: 51})).to.be.revertedWith('Uneven Wei amount not allowed');
});
```
The test, if passed, will assure us that the transaction was reverted indeed. However, there must be also an exact match between the messages that we passed in ``require`` statement and the message we expect in ``revertedWith``. If we go back to the code of EtherSplitter contract, in the ``require`` statement, we provide the message: "Uneven Wei amount not allowed". This matches the message we expect in our test. If they were not equal, the test would fail.

**Congratulations! You've made your first big step towards testing smart contracts with Waffle like a pro! You might be interested in our other tutorials:**
