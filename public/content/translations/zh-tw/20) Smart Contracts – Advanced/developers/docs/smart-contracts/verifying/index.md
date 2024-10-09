---
title: 驗證智慧型合約
description: 以太坊智能合約源程式碼驗證簡介
lang: zh-tw
---

[智能合約](/developers/docs/smart-contracts/)被設計為「不需信任」，意味著使用者在與合約互動前不需要相信第三方（如開發者和公司）。 作為實現不需信任的必要條件，用戶和其他開發者必須能夠驗證智能合約的源程式碼。 源程式碼驗證可確保用戶和開發者所發佈的合約代碼，和在以太坊區塊鏈上運行的合約地址的代碼相同。

區分「源程式碼驗證」和「[形式驗證](/developers/docs/smart-contracts/formal-verification/)」是很重要的。 源程式碼驗證（將在下面詳細解釋）指的是驗證給定由高級語言（例如 Solidity）編寫的智能合約源程式碼，是否被編譯為在合約地址執行的相同位元組碼。 而形式驗證則描述了驗證智能合約的正確性，這意味著合約按預期運行。 雖然需要依情境而定，但合約驗證通常指的是源程式碼驗證。

## 甚麼是源程式碼驗證？ {#what-is-source-code-verification}

在[Ethereum 虛擬機 (EVM)](/developers/docs/evm/)部署智能合約前，開發者會將合約的源程式碼（[用 Solidity ](/developers/docs/smart-contracts/languages/)或其他高階語言編寫的指令）[編譯](/developers/docs/smart-contracts/compiling/)為位元組碼。 由於 EVM 無法解讀高階指令，把源程式碼編譯為位元組碼（即低階機器指令）是在 EVM 執行合約邏輯的必需步驟。

源程式碼驗證是將智能合約的源程式碼與合約創建時使用的編譯位元組碼進行比較，以檢測任何差異。 驗證智能合約很重要，因為宣傳的合約代碼可能與在區塊鏈上運行的程式碼有所不同。

經過驗證的智能合約讓所有人可以通過其所編寫的高階語言來研究合約的功能，而不必閱讀機器碼。 函式，值，通常還有變數名稱和註解都會與編譯和部署時的原始源程式碼相同。 這使閱讀程式碼更為容易。 源程式碼驗證還提供了程式碼文檔，讓終端用戶了解智能合約的設計目的。

### 什麼是完全驗證？ {#full-verification}

源程式碼中有部分內容不會影響到編譯完成的位元組碼，例如註解和變數名稱。 這意味著，即使兩份源程式碼使用不同的變數名稱和註解，也能驗證相同的合約。 這樣一來，惡意行為者可以在源程式碼中添加欺騙性的註解或給予誤導性的變數名稱，並使用與原始源程式碼不同的程式碼來驗證合約。

可以通過在位元組碼中附加額外數據來避免這種情況，這些數據作為源程式碼準確性的_加密保證_以及編譯信息的_指紋_。 所需的信息可以在[ Solidity 的合約元數據](https://docs.soliditylang.org/en/v0.8.15/metadata.html)中找到，並將該文件的雜湊值附加到合約的位元組碼中。 你可以在[元數據遊樂場](https://playground.sourcify.dev)中看到它的實際應用。

The metadata file contains information about the compilation of the contract including the source files and their hashes. Meaning, if any of the compilation settings or even a byte in one of the source files change, the metadata file changes. Consequently the hash of the metadata file, which is appended to the bytecode, also changes. That means if a contract's bytecode + the appended metadata hash match with the given source code and compilation settings, we can be sure this is exactly the same source code used in the original compilation, not even a single byte is different.

This type of verification that leverages the metadata hash is referred to as **"[full verification](https://docs.sourcify.dev/docs/full-vs-partial-match/)"** (also "perfect verification"). If the metadata hashes do not match or are not considered in verification it would be a "partial match", which currently is the more common way to verify contracts. It is possible to [insert malicious code](https://samczsun.com/hiding-in-plain-sight/) that wouldn't be reflected in the verified source code without full verification. Most developers are not aware of the full verification and don't keep the metadata file of their compilation, hence partial verification has been the de facto method to verify contracts so far.

## Why is source code verification important? {#importance-of-source-code-verification}

### Trustlessness {#trustlessness}

Trustlessness is arguably the biggest premise for smart contracts and [decentralized applications (dapps)](/developers/docs/dapps/). Smart contracts are “immutable” and cannot be altered; a contract will only execute the business logic defined in the code at the time of deployment. This means developers and enterprises cannot tamper with a contract's code after deploying on Ethereum.

For a smart contract to be trustless, the contract code should be available for independent verification. While the compiled bytecode for every smart contract is publicly available on the blockchain, low-level language is difficult to understand—for both developers and users.

Projects reduce trust assumptions by publishing the source code of their contracts. But this leads to another problem: it is difficult to verify that the published source code matches the contract bytecode. In this scenario, the value of trustlessness is lost because users have to trust developers not to change a contract's business logic (i.e., by changing the bytecode) before deploying it on the blockchain.

Source code verification tools provide guarantees that a smart contract’s source code files matches the assembly code. The result is a trustless ecosystem, where users don’t blindly trust third parties and instead verify code before depositing funds into a contract.

### 使用者安全 {#user-safety}

With smart contracts, there’s usually a lot of money at stake. This calls for higher security guarantees and verification of a smart contract’s logic before using it. The problem is that unscrupulous developers can deceive users by inserting malicious code in a smart contract. Without verification, malicious smart contracts can have [backdoors](https://www.trustnodes.com/2018/11/10/concerns-rise-over-backdoored-smart-contracts), controversial access control mechanisms, exploitable vulnerabilities, and other things that jeopardize user safety that would go undetected.

Publishing a smart contract's source code files makes it easier for those interested, such as auditors, to assess the contract for potential attack vectors. With multiple parties independently verifying a smart contract, users have stronger guarantees of its security.

## How to verify source code for Ethereum smart contracts {#source-code-verification-for-ethereum-smart-contracts}

[Deploying a smart contract on Ethereum](/developers/docs/smart-contracts/deploying/) requires sending a transaction with a data payload (compiled bytecode) to a special address. The data payload is generated by compiling the source code, plus the [constructor arguments](https://docs.soliditylang.org/en/v0.8.14/contracts.html#constructor) of the contract instance appended to the data payload in the transaction. Compilation is deterministic, meaning it always produces the same output (i.e., contract bytecode) if the same source files, and compilation settings (e.g. compiler version, optimizer) are used.

![A diagram showing showing smart contract source code verification](./source-code-verification.png)

Verifying a smart contract basically involves the following steps:

1. Input the source files and compilation settings to a compiler.

2. Compiler outputs the bytecode of the contract

3. Get the bytecode of the deployed contract at a given address

4. Compare the deployed bytecode with the recompiled bytecode. If the codes match, the contract gets verified with the given source code and compilation settings.

5. Additionally, if the metadata hashes at the end of the bytecode match, it will be a full match.

Note that this is a simplistic description of verification and there are many exceptions that would not work with this such as having [immutable variables](https://docs.sourcify.dev/docs/immutables/).

## Source code verification tools {#source-code-verification-tools}

The traditional process of verifying contracts can be complex. This is why we have tools for verifying source code for smart contracts deployed on Ethereum. These tools automate large parts of the source code verification and also curate verified contracts for the benefits of users.

### Etherscan {#etherscan}

Although mostly known as an [Ethereum blockchain explorer](/developers/docs/data-and-analytics/block-explorers/), Etherscan also offers a [source code verification service](https://etherscan.io/verifyContract) for smart contract developers and users.

Etherscan allows you to recompile contract bytecode from the original data payload (source code, library address, compiler settings, contract address, etc.) If the recompiled bytecode is associated with the bytecode (and constructor parameters) of the on-chain contract, then [the contract is verified](https://info.etherscan.com/types-of-contract-verification/).

Once verified, your contract’s source code receives a "Verified" label and is published on Etherscan for others to audit. It also gets added to the [Verified Contracts](https://etherscan.io/contractsVerified/) section—a repository of smart contracts with verified source codes.

Etherscan is the most used tool for verifying contracts. However, Etherscan's contract verification has a drawback: it fails to compare the **metadata hash** of the on-chain bytecode and recompiled bytecode. Therefore the matches in Etherscan are partial matches.

[有關在 Etherscan 上驗證合約的更多資訊](https://medium.com/etherscan-blog/verifying-contracts-on-etherscan-f995ab772327)。

### Sourcify {#sourcify}

[Sourcify](https://sourcify.dev/#/verifier) 是另一個用於驗證開源和去中心化合約的工具。 它不是區塊瀏覽器，並只會驗證[不同的基於以太坊虛擬機的網路](https://docs.sourcify.dev/docs/chains)上的合約。 它充當其他工具在其之上構建的公共基礎設施，旨在使用元資料檔案中的[應用程式二階位介面](/developers/docs/smart-contracts/compiling/#web-applications)和 [NatSpec](https://docs.soliditylang.org/en/v0.8.15/natspec-format.html) 註釋來實現更人性化的合約互動。

跟 Etherscan 不同，Sourcify 支援與元資料雜​​湊的完全匹配。 The verified contracts are served in its [public repository](https://docs.sourcify.dev/docs/repository/) on HTTP and [IPFS](https://docs.ipfs.io/concepts/what-is-ipfs/#what-is-ipfs), which is a decentralized, [content-addressed](https://web3.storage/docs/concepts/content-addressing/) storage. This allows fetching the metadata file of a contract over IPFS since the appended metadata hash is an IPFS hash.

Additionally, one can also retrieve the source code files over IPFS, as IPFS hashes of these files are also found in the metadata. A contract can be verified by providing the metadata file and source files over its API or the [UI](https://sourcify.dev/#/verifier), or using the plugins. Sourcify monitoring tool also listens to contract creations on new blocks and tries to verify the contracts if their metadata and source files are published on IPFS.

[更多有關 Sourcify 上驗證合約的資訊](https://blog.soliditylang.org/2020/06/25/sourcify-faq/)。

### Tenderly {#tenderly}

The [Tenderly platform](https://tenderly.co/) enables Web3 developers to build, test, monitor, and operate smart contracts. Combining debugging tools with observability and infrastructure building blocks, Tenderly helps developers accelerate smart contract development. To fully enable Tenderly features, developers need to [perform source code verification](https://docs.tenderly.co/monitoring/contract-verification) using several methods.

私下或公開地驗證合約皆可行。 如果私下驗證，則智慧型合約僅對你（以及專案中的其他成員）可見。 公開驗證合約讓使用 Tenderly 平台的每個人都可見。

You can verify your contracts using the [Dashboard](https://docs.tenderly.co/monitoring/smart-contract-verification/verifying-a-smart-contract), [Tenderly Hardhat plugin](https://docs.tenderly.co/monitoring/smart-contract-verification/verifying-contracts-using-the-tenderly-hardhat-plugin), or [CLI](https://docs.tenderly.co/monitoring/smart-contract-verification/verifying-contracts-using-cli).

When verifying contracts through the Dashboard, you need to import the source file or the metadata file generated by the Solidity compiler, the address/network, and compiler settings.

Using the Tenderly Hardhat plugin allows for more control over the verification process with less effort, enabling you to choose between automatic (no-code) and manual (code-based) verification.

## 了解更多 {#further-reading}

- [驗證合約原始碼](https://programtheblockchain.com/posts/2018/01/16/verifying-contract-source-code/)
