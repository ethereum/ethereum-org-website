---
title: Smart contract security
description: Security considerations for Ethereum developers
lang: en
---

Ethereum smart contracts are extremely flexible, capable of both holding large quantities of tokens (often in excess of $1B) and running immutable logic based on previously deployed smart contract code. While this has created a vibrant and creative ecosystem of trustless, interconnected smart contracts, it is also the perfect ecosystem to attract attackers looking to profit by exploiting vulnerabilities in smart contracts and unexpected behavior in Ethereum. Smart contract code _usually_ cannot be changed to patch security flaws, assets that have been stolen from smart contracts are irrecoverable, and stolen assets are extremely difficult to track. The total of amount of value stolen or lost due to smart contract issues is easily over $1B. Some of the larger due to smart contract coding errors include:

- [Parity multi-sig issue #1 - $30M lost](https://www.coindesk.com/30-million-ether-reported-stolen-parity-wallet-breach)
- [Parity multi-sig issue #2 - $300M locked](https://www.theguardian.com/technology/2017/nov/08/cryptocurrency-300m-dollars-stolen-bug-ether)
- [TheDAO hack, 3.6M ETH! Over $1B in today's ETH prices](https://hackingdistributed.com/2016/06/18/analysis-of-the-dao-exploit/)

## Prerequisites {#prerequisites}

This will cover smart contract security so make sure you're familiar with [smart contracts](/developers/docs/smart-contracts/) before tackling security.

## How to write more secure smart contract code {#how-to-write-more-secure-smart-contract-code}

Before launching any code to Mainnet, it is important to take sufficient precaution to protect anything of value your smart contract is entrusted with. In this article, we will discuss a few specific attacks, provide resources to learn about more attack types, and leave you with some basic tooling and best practices to ensure your contracts function correctly and securely.

## Audits are not a silver bullet {#audits-are-not-a-silver-bullet}

Years prior, the tooling for writing, compiling, testing, and deploying smart contracts was very immature, leading many projects to write Solidity code in haphazard ways, throw it over a wall to an auditor who would investigate the code to ensure it functions securely and as expected. In 2020, the development processes and tooling that support writing Solidity is significantly better; leveraging these best practices not only ensures your project is easier to manage, it is a vital part of your project's security. An audit at the end of writing your smart contract is no longer sufficient as the only security consideration your project makes. Security starts before you write your first line of smart contract code, **security starts with proper design and development processes**.

## Smart contract development process {#smart-contract-development-process}

At a minimum:

- All code stored in a version control system, such as git
- All code modifications made via Pull Requests
- All Pull Requests have at least one reviewer. _If you are a solo project, consider finding another solo author and trade code reviews!_
- A single command compiles, deploys, and runs a suite of tests against your code using a development Ethereum environment (See: Truffle)
- You have run your code through basic code analysis tools such as Mythril and Slither, ideally before each pull request is merged, comparing differences in output
- Solidity does not emit ANY compiler warnings
- Your code is well-documented

There is much more to be said for development process, but these items are a good place to start. For more items and detailed explanations, see the [process quality checklist provided by DeFiSafety](https://docs.defisafety.com/review-process-documentation/process-quality-audit-process). [DefiSafety](https://defisafety.com/) is an unofficial public service publishing reviews of various large, public Ethereum dapps. Part of the DeFiSafety rating system includes how well the project adheres to this process quality checklist. By following these processes:

- You will produce more secure code, via reproducible, automated tests
- Auditors will be able to review your project more effectively
- Easier onboarding of new developers
- Allows developers to quickly iterate, test, and get feedback on modifications
- Less likely your project experiences regressions

## Attacks and vulnerabilities {#attacks-and-vulnerabilities}

Now that you are writing Solidity code using an efficient development process, let's look at some common Solidity vulnerabilities to see what can go wrong.

### Re-entrancy {#re-entrancy}

Re-entrancy is one of the largest and most significant security issue to consider when developing Smart Contracts. While the EVM cannot run multiple contracts at the same time, a contract calling a different contract pauses the calling contract's execution and memory state until the call returns, at which point execution proceeds normally. This pausing and re-starting can create a vulnerability known as "re-entrancy".

Here is a simple version of a contract that is vulnerable to re-entrancy:

```solidity
// THIS CONTRACT HAS INTENTIONAL VULNERABILITY, DO NOT COPY
contract Victim {
    mapping (address => uint256) public balances;

    function deposit() external payable {
        balances[msg.sender] += msg.value;
    }

    function withdraw() external {
        uint256 amount = balances[msg.sender];
        (bool success, ) = msg.sender.call.value(amount)("");
        require(success);
        balances[msg.sender] = 0;
    }
}
```

To allow a user to withdraw ETH they have previously stored on the contract, this function

1. Reads how much balance a user has
2. Sends them that balance amount in ETH
3. Resets their balance to 0, so they cannot withdraw their balance again.

If called from a regular account (such as your own MetaMask account), this functions as expected: msg.sender.call.value() simply sends your account ETH. However, smart contracts can make calls as well. If a custom, malicious contract is the one calling `withdraw()`, msg.sender.call.value() will not only send `amount` of ETH, it will also implicitly call the contract to begin executing code. Imagine this malicious contract:

```solidity
contract Attacker {
    function beginAttack() external payable {
        Victim(VICTIM_ADDRESS).deposit.value(1 ether)();
        Victim(VICTIM_ADDRESS).withdraw();
    }

    function() external payable {
        if (gasleft() > 40000) {
            Victim(VICTIM_ADDRESS).withdraw();
        }
    }
}
```

Calling Attacker.beginAttack() will start a cycle that looks something like:

```
0.) Attacker's EOA calls Attacker.beginAttack() with 1 ETH
0.) Attacker.beginAttack() deposits 1 ETH into Victim

  1.) Attacker -> Victim.withdraw()
  1.) Victim reads balances[msg.sender]
  1.) Victim sends ETH to Attacker (which executes default function)
    2.) Attacker -> Victim.withdraw()
    2.) Victim reads balances[msg.sender]
    2.) Victim sends ETH to Attacker (which executes default function)
      3.) Attacker -> Victim.withdraw()
      3.) Victim reads balances[msg.sender]
      3.) Victim sends ETH to Attacker (which executes default function)
        4.) Attacker no longer has enough gas, returns without calling again
      3.) balances[msg.sender] = 0;
    2.) balances[msg.sender] = 0; (it was already 0)
  1.) balances[msg.sender] = 0; (it was already 0)
```

Calling Attacker.beginAttack with 1 ETH will re-entrancy attack Victim, withdrawing more ETH than it provided (taken from other users' balances, causing the Victim contract to become under-collateralized)

### How to deal with re-entrancy (the wrong way) {#how-to-deal-with-re-entrancy-the-wrong-way}

One might consider defeating re-entrancy by simply preventing any smart contracts from interacting with your code. You search stackoverflow, you find this snippet of code with tons of upvotes:

```solidity
function isContract(address addr) internal returns (bool) {
  uint size;
  assembly { size := extcodesize(addr) }
  return size > 0;
}
```

Seems to make sense: contracts have code, if the caller has any code, don't allow it to deposit. Let's add it:

```solidity
// THIS CONTRACT HAS INTENTIONAL VULNERABILITY, DO NOT COPY
contract ContractCheckVictim {
    mapping (address => uint256) public balances;

    function isContract(address addr) internal returns (bool) {
        uint size;
        assembly { size := extcodesize(addr) }
        return size > 0;
    }

    function deposit() external payable {
        require(!isContract(msg.sender)); // <- NEW LINE
        balances[msg.sender] += msg.value;
    }

    function withdraw() external {
        uint256 amount = balances[msg.sender];
        (bool success, ) = msg.sender.call.value(amount)("");
        require(success);
        balances[msg.sender] = 0;
    }
}
```

Now in order to deposit ETH, you must not have smart contract code at your address. However, this is easily defeated with the following Attacker contract:

```solidity
contract ContractCheckAttacker {
    constructor() public payable {
        ContractCheckVictim(VICTIM_ADDRESS).deposit(1 ether); // <- New line
    }

    function beginAttack() external payable {
        ContractCheckVictim(VICTIM_ADDRESS).withdraw();
    }

    function() external payable {
	    if (gasleft() > 40000) {
		    Victim(VICTIM_ADDRESS).withdraw();
	    }
   }
}
```

Whereas the first attack was an attack on contract logic, this is an attack on Ethereum contract deployment behavior. During construction, a contract has not yet returned its code to be deployed at its address, but retains full EVM control DURING this process.

It is technically possible to prevent smart contracts from calling your code, using this line:

```solidity
require(tx.origin == msg.sender)
```

However, this is still not a good solution. One of the most exciting aspects of Ethereum is its composability, smart contracts integrate with and building on each other. By using the line above, you are limiting the usefulness of your project.

### How to deal with re-entrancy (the right way) {#how-to-deal-with-re-entrancy-the-right-way}

By simply switching the order of the storage update and external call, we prevent the re-entrancy condition that enabled the attack. Calling back into withdraw, while possible, will not benefit the attacker, since the `balances` storage will already be set to 0.

```solidity
contract NoLongerAVictim {
    function withdraw() external {
        uint256 amount = balances[msg.sender];
        balances[msg.sender] = 0;
        (bool success, ) = msg.sender.call.value(amount)("");
        require(success);
    }
}
```

The code above follows the "Checks-Effects-Interactions" design pattern, which helps protect against re-entrancy. You can [read more about Checks-Effects-Interactions here](https://fravoll.github.io/solidity-patterns/checks_effects_interactions.html)

### How to deal with re-entrancy (the nuclear option) {#how-to-deal-with-re-entrancy-the-nuclear-option}

Any time you are sending ETH to an untrusted address or interacting with an unknown contract (such as calling `transfer()` of a user-provided token address), you open yourself up to the possibility of re-entrancy. **By designing contracts that neither send ETH nor call untrusted contracts, you prevent the possibility of re-entrancy!**

## More attack types {#more-attack-types}

The attack types above cover smart-contract coding issues (re-entrancy) and Ethereum oddities (running code inside contract constructors, before code is available at the contract address). There are many, many more attack types to be aware of, such as:

- Front-running
- ETH send rejection
- Integer overflow/underflow

Further reading:

- [Consensys Smart Contract Known Attacks](https://consensys.github.io/smart-contract-best-practices/attacks/) - A very readable explanation of the most significant vulnerabilities, with sample code for most.
- [SWC Registry](https://swcregistry.io/docs/SWC-128) - Curated list of CWE's that apply to Ethereum and smart contracts

## Security tools {#security-tools}

While there is no substitute for understanding Ethereum security basics and engaging a professional auditing firm to review your code, there are many tools available to help highlight potential issues in your code.

### Smart contract security {#smart-contract-security}

**Slither -** **_Solidity static analysis framework written in Python 3._**

- [GitHub](https://github.com/crytic/slither)

**MythX -** **_Security analysis API for Ethereum smart contracts._**

- [mythx.io](https://mythx.io/)
- [Documentation](https://docs.mythx.io/)

**Mythril -** **_Security analysis tool for EVM bytecode._**

- [mythril](https://github.com/ConsenSys/mythril)
- [Documentation](https://mythril-classic.readthedocs.io/en/master/about.html)

**Manticore -** **_A command line interface that uses a symbolic execution tool on smart contracts and binaries._**

- [GitHub](https://github.com/trailofbits/manticore)
- [Documentation](https://github.com/trailofbits/manticore/wiki)

**Securify -** **_Security scanner for Ethereum smart contracts._**

- [securify.chainsecurity.com](https://securify.chainsecurity.com/)
- [Discord](https://discordapp.com/invite/nN77ckb)

**ERC20 Verifier -** **_A verification tool used to check if a contract complies with the ERC20 standard._**

- [erc20-verifier.openzeppelin.com](https://erc20-verifier.openzeppelin.com)
- [Forum](https://forum.openzeppelin.com/t/online-erc20-contract-verifier/1575)

### Formal Verification {#formal-verification}

**Information on Formal Verification**

- [How formal verification of smart-contacts works](https://runtimeverification.com/blog/how-formal-verification-of-smart-contracts-works/) _July 20, 2018 - Brian Marick_
- [How Formal Verification Can Ensure Flawless Smart Contracts](https://media.consensys.net/how-formal-verification-can-ensure-flawless-smart-contracts-cbda8ad99bd1) _Jan 29, 2018 - Bernard Mueller_

### Using tools {#using-tools}

Two of the most popular tools for smart contract security analysis are:

- [Slither](https://github.com/crytic/slither) by [Trail of Bits](https://www.trailofbits.com/) (hosted version: [Crytic](https://crytic.io/))
- [Mythril](https://github.com/ConsenSys/mythril) by [ConsenSys](https://consensys.net/) (hosted version: [MythX](https://mythx.io/))

Both are useful tools that analyze your code and report issues. Each has a [commercial] hosted version, but are also available for free to run locally. The following is a quick example of how to run Slither, which is made available in a convenient Docker image `trailofbits/eth-security-toolbox`. You will need to [install Docker if you don't already have it installed](https://docs.docker.com/get-docker/).

```bash
$ mkdir test-slither
$ curl https://gist.githubusercontent.com/epheph/460e6ff4f02c4ac582794a41e1f103bf/raw/9e761af793d4414c39370f063a46a3f71686b579/gistfile1.txt > bad-contract.sol
$ docker run -v `pwd`:/share  -it --rm trailofbits/eth-security-toolbox
docker$ cd /share
docker$ solc-select 0.5.11
docker$ slither bad-contract.sol
```

Will generate this output:

```bash
ethsec@1435b241ca60:/share$ slither bad-contract.sol
INFO:Detectors:
Reentrancy in Victim.withdraw() (bad-contract.sol#11-16):
	External calls:
	- (success) = msg.sender.call.value(amount)() (bad-contract.sol#13)
	State variables written after the call(s):
	- balances[msg.sender] = 0 (bad-contract.sol#15)
Reference: https://github.com/crytic/slither/wiki/Detector-Documentation#reentrancy-vulnerabilities
INFO:Detectors:
Low level call in Victim.withdraw() (bad-contract.sol#11-16):
	- (success) = msg.sender.call.value(amount)() (bad-contract.sol#13)
Reference: https://github.com/crytic/slither/wiki/Detector-Documentation#low-level-calls
INFO:Slither:bad-contract.sol analyzed (1 contracts with 46 detectors), 2 result(s) found
INFO:Slither:Use https://crytic.io/ to get access to additional detectors and GitHub integration
```

Slither has identified the potential for re-entrancy here, identifying the key lines where the issue might occur and giving us a link for more details about the issue:

> Reference: https://github.com/crytic/slither/wiki/Detector-Documentation#reentrancy-vulnerabilities

allowing you to quickly learn about potential problems with your code. Like all automated testing tools, Slither is not perfect, and it errs on the side of reporting too much. It can warn about a potential re-entrancy, even when no exploitable vulnerability exists. Often, reviewing the DIFFERENCE in Slither output between code changes is extremely illuminating, helping discover vulnerabilities that were introduced much earlier than waiting until your project is code-complete.

## Further reading {#further-reading}

**Smart contract security best practices guides**

- [consensys.github.io/smart-contract-best-practices/](https://consensys.github.io/smart-contract-best-practices/)
- [GitHub](https://github.com/ConsenSys/smart-contract-best-practices/)
- [Aggregated collection of security recommendations and best practices](https://github.com/guylando/KnowledgeLists/blob/master/EthereumSmartContracts.md)

**Smart contract security verification standard (SCSVS)**

- [securing.github.io/SCSVS/](https://securing.github.io/SCSVS/)

_Know of a community resource that helped you? Edit this page and add it!_

## Related tutorials {#related-tutorials}

- [Secure development workflow](/developers/tutorials/secure-development-workflow/)
- [How to use Slither to find smart contract bugs](/developers/tutorials/how-to-use-slither-to-find-smart-contract-bugs/)
- [How to use Manticore to find smart contract bugs](/developers/tutorials/how-to-use-manticore-to-find-smart-contract-bugs/)
- [Security guidelines](/developers/tutorials/smart-contract-security-guidelines/)
- [Token security](/developers/tutorials/token-integration-checklist/)
