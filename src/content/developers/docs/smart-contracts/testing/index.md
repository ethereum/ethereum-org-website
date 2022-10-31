---
title: Testing smart contracts
description: An overview of techniques and considerations for testing Ethereum smart contracts
lang: en
---

Testing [smart contracts](/developers/docs/smart-contracts/) is one of the most important measures for improving [smart contract security](/developers/docs/smart-contracts/security/). Unlike traditional software, smart contracts cannot typically be updated after launching, making it imperative to test rigorously before deploying contracts on the Ethereum network.

## What is smart contract testing? {#what-is-smart-contract-testing}

Smart contract testing means performing detailed analysis and evaluation of a smart contract to assess the quality of its source code during the development cycle. Testing a smart contract makes it easier to identify bugs and vulnerabilities and reduces the possibility of software errors that could lead to costly exploits.

Smart contract testing takes many forms, with different methods offering benefits. Strategies for testing Ethereum smart contracts can be classified into two broad categories: **automated testing** and **manual testing**.

### Automated testing {#automated-testing}

Automated testing involves using automated tools to carry out scripted testing of smart contracts. This technique relies on automated software that can execute repeated tests to find defects in smart contracts.

Automated testing is efficient, uses fewer resources, and promises higher levels of coverage than manual analysis. Automated testing tools can also be configured with test data, allowing them to compare predicted behaviors with actual results.

### Manual testing {#manual-testing}

Manual testing is human-aided and involves an individual who executes testing steps manually. Code audits, where developers and/or auditors, go over every line of contract code, are an example of manual testing for smart contracts.

Manual testing of smart contracts requires considerable skill and a considerable investment of time, money, and effort. Moreover, manual testing can sometimes be susceptible to the problems of human error.

However, applying manual testing to smart contracts can also be beneficial. Code audits harness human intelligence to find defects in contract code that might go undetected during automated testing.

Manual-testing your smart contracts can also reveal vulnerabilities that exist outside the code, but can still affect it. For example, a smart contract audit can discover vulnerabilities arising from flawed interaction with off-chain components.

## Why is it important to test smart contracts? {#benefits-of-smart-contract-testing}

Testing smart contracts is important for the following reasons:

### 1. Smart contracts are high-value applications {#smart-contracts-are-high-value-applications}

Smart contracts often deal with high-value financial assets, especially in industries like [decentralized finance (DeFi)](/defi/), and valuable items, such as [non-fungible tokens (NFTs)](/nft/). As such, minor vulnerabilities in smart contracts can and often lead to massive, irrecoverable losses for users. Comprehensive testing can, however, expose errors in smart contract code and reduce security risks before deployment.

### 2. Smart contracts are immutable {#smart-contracts-are-immutable}

Smart contracts deployed in the [Ethereum Virtual Machine (EVM)](/developers/docs/evm/) are immutable by default. While traditional developers may be used to fixing software bugs after launching, Ethereum development leaves little room for patching security flaws once a smart contract is live on the blockchain.

While upgradeability mechanisms for smart contracts, such as proxy patterns, these can be difficult to implement. Besides reducing immutability and introducing complexity, upgrades often demand complex governance processes.

For the most part, upgrades should be considered a last resort and avoided unless necessary. Detecting potential vulnerabilities and flaws in your smart contract during the pre-launch phase reduces the need for a logic upgrade.

## Automated testing for smart contracts {#automated-testing-for-smart-contracts}

### 1. Functional testing {#functional-testing}

Functional testing verifies the functionality of a smart contract and provides assurance that each function in the code works as expected. Functional testing requires understanding how your smart contract should behave in certain conditions. Then you can test each function by running computations with selected values and comparing the returned output with the expected output.

Functional testing covers three methods: **unit testing**, **integration testing**, and **system testing**.

#### Unit testing

Unit testing involves testing individual components in a smart contract for correctness. A unit test is simple, quick to run, and provides a clear idea of what went wrong if the test fails.

Unit tests are crucial for smart contract development, especially if you need to add new logic to the code. You can verify the behavior of each function and confirm that it executes as intended.

Running a unit test often requires creating _assertions_—simple, informal statements specifying requirements for a smart contract. Unit testing can then be used to test each assertion and see if it holds true under execution.

Examples of contract-related assertions include:

i. "Only the admin can pause the contract"

ii. "Non-admins cannot mint new tokens"

iii. "The contract reverts on errors"

#### Integration testing

Integration testing is a level higher than unit testing on the testing hierarchy. In integration testing, individual components of the smart contract are tested together.

This approach detects errors arising from interactions between different components of a contract or across multiple contracts. You should use this method if you have a complex contract with multiple functions or one that interfaces with other contracts.

Integration testing can be useful for ensuring that things like [inheritance](https://docs.soliditylang.org/en/v0.8.12/contracts.html#inheritance) and dependency injection work properly.

#### System testing

System testing is the final phase of functional testing for smart contracts. A system evaluates the smart contract as one fully integrated product to see if it performs as specified in the technical requirements.

You can think of this stage as checking the end-to-end flow of your smart contract from a user’s point of view. A good way to perform system testing on a smart contract is to deploy it on a production-like environment, such as a [testnet](/developers/docs/networks/#ethereum-testnets) or [development network](/developers/docs/development-networks/).

Here, end-users can perform trial runs and report any issues with the contract’s business logic and overall functionality. System testing is important because you cannot change code once the contract is deployed in the main EVM environment.

### 2. Static/dynamic analysis {#static-dynamic-analysis}

Static analysis and dynamic analysis are two automated testing methods for evaluating the security qualities of smart contracts. Both techniques, however, use different approaches for finding defects in contract code.

#### Static analysis

Static analysis examines the source code or bytecode of a smart contract before execution. This means you can debug contract code without actually running the program. Static analyzers can detect common vulnerabilities in Ethereum smart contracts and aid compliance with best practices.

#### Dynamic analysis

Dynamic analysis techniques require executing the smart contract in a runtime environment to identify issues in your code. Dynamic code analyzers observe contract behaviors during execution and generate a detailed report of identified vulnerabilities and property violations.

Fuzzing is an example of a dynamic analysis technique for testing contracts. During fuzz testing, a fuzzer feeds your smart contract with malformed and invalid data and monitors how the contract responds to those inputs.

Like any program, smart contracts rely on inputs provided by users to execute functions. And, while we assume users will provide correct inputs, this may not always be the case.

In some cases, sending incorrect input values to a smart contract can cause resource leaks, crashes, or worse, lead to unintended code execution. Fuzzing campaigns identify such problems beforehand, allowing you to eliminate the vulnerability.

## Manual testing for smart contracts {#manual-testing-for-smart-contracts}

### 1. Code audits {#code-audits}

A code audit is a detailed evaluation of a smart contract's source code to uncover possible failure-points, security flaws, and poor development practices. While code audits can be automated, we refer to human-aided code analysis here.

Code audits require an attacker mindset to map out possible attack vectors in smart contracts. Even if you run automated audits, analyzing every line of source code is a minimum requirement for writing secure smart contracts.

You can also commission a security audit to give users higher assurances of smart contract safety. Audits benefit from extensive analysis performed by cybersecurity professionals and detect potential vulnerabilities or bugs that could break the smart contract functionality.

### 2. Bug bounties {#bug-bounties}

A bug bounty is a financial reward given to an individual who discovers a vulnerability or bug in a program's code and reports to developers. Bug bounties are similar to audits since it involves asking others to help find defects in smart contracts. The major difference is that bug bounty programs are open to the wider developer/hacker community.

Bug bounty programs often attract a broad class of ethical hackers and independent security professionals with unique skills and experience. This may be an advantage over smart contract audits that mainly rely on teams who may possess limited or narrow expertise.

## Testing vs. formal verification {#testing-vs-formal-verification}

While testing helps confirm that a contract returns the expected results for some data inputs, it cannot conclusively prove the same for inputs not used during tests. Testing a smart contract cannot guarantee "functional correctness", meaning it cannot show that a program behaves as required for _all_ sets of input values and conditions.

As such, developers are encouraged to incorporate **formal verification** into their approach for assessing the correctness of smart contracts. Formal verification uses [formal methods](https://www.brookings.edu/techstream/formal-methods-as-a-path-toward-better-cybersecurity/)—mathematically rigorous techniques for specifying and verifying software.

Formal verification is considered important for smart contracts because it helps developers formally test assumptions relating to smart contracts. This is done by creating formal specifications that describe a smart contract's properties and verifying that a formal model of the smart contract matches the specification. This approach increases confidence that a smart contract will only execute functions as defined in its business logic and nothing else.

[More on formal verification for smart contracts](/developers/docs/smart-contracts/formal-verification)

## Testing tools and libraries {#testing-tools-and-libraries}

### Unit testing tools {#unit-testing-tools}

**Solidity-Coverage** - _Solidity code coverage tool useful for testing smart contracts._

- [GitHub](https://github.com/sc-forks/solidity-coverage)

**Waffle** - _Framework for advanced smart contract development and testing (based on ethers.js)_.

- [Documentation](https://ethereum-waffle.readthedocs.io/en/latest/)
- [GitHub](https://github.com/TrueFiEng/Waffle)
- [Website](https://getwaffle.io/)

**Remix Tests** - _Tool for testing Solidity smart contracts. Works underneath Remix IDE "Solidity Unit Testing" plugin which is used to write and run test cases for a contract._

- [Documentation](https://remix-ide.readthedocs.io/en/latest/unittesting.html)
- [GitHub](https://github.com/ethereum/remix-project/tree/master/libs/remix-tests)

**OpenZeppelin Test Helpers** - _Assertion library for Ethereum smart contract testing. Make sure your contracts behave as expected!_

- [GitHub](https://github.com/OpenZeppelin/openzeppelin-test-helpers)
- [Documentation](https://docs.openzeppelin.com/test-helpers)

**Truffle smart contract test framework** - _Automated testing framework to make testing your contracts a breeze._

- [Documentation](https://trufflesuite.com/docs/truffle/testing/testing-your-contracts/)
- [Website](https://trufflesuite.com/)

**Brownie unit testing framework** - _Brownie utilizes Pytest, a feature-rich test framework that lets you write small tests with minimal code, scales well for large projects, and is highly extendable._

- [Documentation](https://eth-brownie.readthedocs.io/en/v1.0.0_a/tests.html)
- [GitHub](https://github.com/eth-brownie/brownie)

**Foundry Tests** - _Foundry offers Forge, a fast and flexible Ethereum testing framework capable of executing simple unit tests, gas optimization checks, and contract fuzzing._

- [GitHub](https://github.com/foundry-rs/foundry/tree/master/forge)
- [Documentation](https://book.getfoundry.sh/forge/)

**Etheno** - _All-in-one Ethereum testing tool comprising a JSON RPC multiplexer, analysis tool wrapper, and test integration tool. Etheno eliminates the complexity of setting up analysis tools like Manticore and Echidna on large, multi-contract projects._

- [GitHub](https://github.com/crytic/etheno)

### Static analysis tools {#static-analysis-tools}

**Mythril** - _EVM bytecode assessment tool for detecting contract vulnerabilities using taint analysis, concolic analysis, and control flow checking._

- [GitHub](https://github.com/ConsenSys/mythril-classic)
- [Documentation](https://mythril-classic.readthedocs.io/en/master/about.html)

**Slither** - _Python-based Solidity static analysis framework for finding vulnerabilities, enhancing code comprehension, and writing custom analyses for smart contracts._

- [GitHub](https://github.com/crytic/slither)

**Rattle** - _EVM bytecode static analysis framework designed to work on deployed smart contracts._

- [GitHub](https://github.com/crytic/rattle)

### Dynamic analysis tools {#dynamic-analysis-tools}

**Echidna** - _Fast contract fuzzer for detecting vulnerabilities in smart contracts through property-based testing._

- [GitHub](https://github.com/crytic/echidna/)

**Harvey** - _Automated fuzzing tool useful for detecting property violations in smart contract code._

- [Website](https://consensys.net/diligence/fuzzing/)

**Manticore** - _Dynamic symbolic execution framework for analyzing EVM bytecode._

- [GitHub](https://github.com/trailofbits/manticore)
- [Documentation](https://github.com/trailofbits/manticore/wiki)

### Smart contract auditing services {#smart-contract-auditing-services}

**ConsenSys Diligence** - _Smart contract auditing service helping projects across the blockchain ecosystem ensure their protocols are ready for launch and built to protect users._

- [Website](https://consensys.net/diligence/)

**CertiK** - _Blockchain security firm pioneering the use of cutting-edge formal Verification technology on smart contracts and blockchain networks._

- [Website](https://www.certik.com/)

**Trail of Bits** - _Cybersecurity company that combines security research with an attacker mentality to reduce risk and fortify code._

- [Website](https://www.trailofbits.com/)

**PeckShield** - _Blockchain security company offering products and services for the security, privacy, and usability of the entire blockchain ecosystem._

- [Website](https://peckshield.com/)

**QuantStamp** - _Auditing service facilitating the mainstream adoption of blockchain technology through security and risk assessment services._

- [Website](https://quantstamp.com/)

**OpenZeppelin** - _Smart contract security company providing security audits for distributed systems._

- [Website](https://www.openzeppelin.com/security-audits)

### Bug bounty platforms {#bug-bounty-platforms}

**Immunefi** - _Bug bounty platform for smart contracts and DeFi projects, where security researchers review code, disclose vulnerabilities, get paid, and make crypto safer._

- [Website](https://immunefi.com/)

**HackerOne** - _Vulnerability coordination and bug bounty platform that connects businesses with penetration testers and cybersecurity researchers._

- [Website](https://www.hackerone.com/)

## Related tutorials {#related-tutorials}

- [Solidity and Truffle Continuous Integration Setup](/developers/tutorials/solidity-and-truffle-continuous-integration-setup/) _– How to setup Travis or Circle CI for Truffle testing along with useful plugins._
- [Testing products overview](/developers/tutorials/guide-to-smart-contract-security-tools/) _– An overview and comparison of different testing products._
- [How to use Echidna to test smart contracts](/developers/tutorials/how-to-use-echidna-to-test-smart-contracts/)
- [How to use Manticore to find smart contract bugs](/developers/tutorials/how-to-use-manticor-to-find-smart-contract-bugs/)
- [How to use Slither to find smart contract bugs](/developers/tutorials/how-to-use-slither-to-find-smart-contract-bugs/)
- [How to mock Solidity contracts for testing](/developers/tutorials/how-to-mock-solidity-contracts-for-testing/)
- [How to migrate from Truffle Tests to OpenZeppelin Test Environment](https://docs.openzeppelin.com/test-environment/0.1/migrating-from-truffle)
- [How to test contracts after they have been deployed on a network](https://fulldecent.blogspot.com/2019/04/testing-deployed-ethereum-contracts.html)
- [Learn Blockchain, Solidity, and Full Stack Web3 Development with JavaScript (YouTube)](https://www.youtube.com/watch?v=gyMwXuJrbJQ)
- [Solidity, Blockchain, and Smart Contract Course (YouTube)](https://www.youtube.com/watch?v=M576WGiDBdQ)

## Further reading {#further-reading}

- [An In-Depth Guide to Testing Ethereum Smart Contracts](https://iamdefinitelyahuman.medium.com/an-in-depth-guide-to-testing-ethereum-smart-contracts-2e41b2770297) - _Ben Hauser_
- [How to Test Ethereum Smart Contracts](https://betterprogramming.pub/how-to-test-ethereum-smart-contracts-35abc8fa199d) - _Alex Roan_
