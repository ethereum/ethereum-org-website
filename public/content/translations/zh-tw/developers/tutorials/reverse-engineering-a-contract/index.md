---
title: "對合約進行逆向工程"
description: 如何在沒有原始碼的情況下理解合約
author: 作者：Ori Pomerantz
lang: zh-tw
tags: [ "evm", "opcodes" ]
skill: advanced
published: 2021-12-30
---

## 介紹 {#introduction}

_區塊鏈上沒有秘密_，發生的一切都是一致、可驗證且公開的。 理想情況下，[合約應在 Etherscan 上發布並驗證其原始碼](https://etherscan.io/address/0xb8901acb165ed027e32754e0ffe830802919727f#code)。 然而，[情況並非總是如此](https://etherscan.io/address/0x2510c039cc3b061d79e564b38836da87e31b342f#code)。 在本文中，您將學習如何透過查看一個沒有原始碼的合約 [`0x2510c039cc3b061d79e564b38836da87e31b342f`](https://etherscan.io/address/0x2510c039cc3b061d79e564b38836da87e31b342f) 來對其進行逆向工程。

有反向編譯器，但它們並不總能產生[可用的結果](https://etherscan.io/bytecode-decompiler?a=0x2510c039cc3b061d79e564b38836da87e31b342f)。 在本文中，您將學習如何手動從 [opcodes](https://github.com/wolflo/evm-opcodes) 逆向工程並理解一個合約，以及如何解釋反編譯器的結果。

要理解本文，您應該已經了解 EVM 的基礎知識，並至少對 EVM 組譯器有些熟悉。 [您可以在此處閱讀有關這些主題的資訊](https://medium.com/mycrypto/the-ethereum-virtual-machine-how-does-it-work-9abac2b7c9e)。

## 準備可執行程式碼 {#prepare-the-executable-code}

您可以前往合約的 Etherscan 頁面，點擊 **Contract** 標籤，然後點擊 **Switch to Opcodes View** 來取得 opcodes。 您將得到一個每行一個 opcode 的視圖。

![來自 Etherscan 的 Opcode 視圖](opcode-view.png)

然而，為了能夠理解跳轉，您需要知道每個 opcode 在程式碼中的位置。 要做到這一點，一種方法是打開一個 Google 試算表並將 opcodes 貼到 C 欄。[您可以透過建立這個已準備好的試算表的副本來跳過以下步驟](https://docs.google.com/spreadsheets/d/1tKmTJiNjUwHbW64wCKOSJxHjmh0bAUapt6btUYE7kDA/edit?usp=sharing)。

下一步是取得正確的程式碼位置，以便我們能夠理解跳轉。 我們將 opcode 大小放在 B 欄，位置（十六進位）放在 A 欄。在儲存格 `B1` 中輸入此函數，然後複製並貼到 B 欄的其餘部分，直到程式碼結束。 完成此操作後，您可以隱藏 B 欄。

```
=1+IF(REGEXMATCH(C1,"PUSH"),REGEXEXTRACT(C1,"PUSH(\d+)"),0)
```

首先，此函數為 opcode 本身增加一個位元組，然後尋找 `PUSH`。 Push opcodes 很特殊，因為它們需要額外的位元組來儲存被推送的值。 如果 opcode 是 `PUSH`，我們就提取位元組數並將其加上。

在 `A1` 中放入第一個位移量，零。 然後，在 `A2` 中放入此函數，並再次複製貼到 A 欄的其餘部分：

```
=dec2hex(hex2dec(A1)+B1)
```

我們需要此函數來提供十六進位值，因為在跳轉（`JUMP` 和 `JUMPI`）之前推送的值是以十六進位形式給我們的。

## 進入點 (0x00) {#the-entry-point-0x00}

合約總是從第一個位元組開始執行。 這是程式碼的初始部分：

| 位移 | Opcode       | 堆疊（在 opcode 之後）                                |
| -: | ------------ | ---------------------------------------------- |
|  0 | PUSH1 0x80   | 0x80                                           |
|  2 | PUSH1 0x40   | 0x40, 0x80                                     |
|  4 | MSTORE       | 空的                                             |
|  5 | PUSH1 0x04   | 0x04                                           |
|  7 | CALLDATASIZE | CALLDATASIZE 0x04                              |
|  8 | LT           | CALLDATASIZE\<4      |
|  9 | PUSH2 0x005e | 0x5E CALLDATASIZE\<4 |
|  C | JUMPI        | 空的                                             |

這段程式碼做了兩件事：

1. 將 0x80 作為一個 32 位元組的值寫入記憶體位置 0x40-0x5F（0x80 儲存在 0x5F，而 0x40-0x5E 都是零）。
2. 讀取 calldata 大小。 通常，以太坊合約的呼叫資料遵循[應用程式二進位介面 (ABI)](https://docs.soliditylang.org/en/v0.8.10/abi-spec.html)，該介面至少需要四個位元組用於函數選擇器。 如果呼叫資料大小小於四，跳轉到 0x5E。

![這部分的流程圖](flowchart-entry.png)

### 0x5E 的處理常式（用於非 ABI 呼叫資料）{#the-handler-at-0x5e-for-non-abi-call-data}

| 位移 | Opcode       |
| -: | ------------ |
| 5E | JUMPDEST     |
| 5E | CALLDATASIZE |
| 60 | PUSH2 0x007c |
| 63 | JUMPI        |

此程式碼片段以 `JUMPDEST` 開頭。 EVM（以太坊虛擬機）程式如果跳轉到不是 `JUMPDEST` 的 opcode，將會拋出例外。 然後它會查看 CALLDATASIZE，如果它是「真」（即，非零），則跳轉到 0x7C。 我們稍後會講到這個。

| 位移 | Opcode     | 堆疊（在 opcode 之後）                                                                        |
| -: | ---------- | -------------------------------------------------------------------------------------- |
| 64 | CALLVALUE  | 呼叫提供的 [Wei](/glossary/#wei)。 在 Solidity 中稱為 `msg.value`                                |
| 65 | PUSH1 0x06 | 6 CALLVALUE                                                                            |
| 67 | PUSH1 0x00 | 0 6 CALLVALUE                                                                          |
| 69 | DUP3       | CALLVALUE 0 6 CALLVALUE                                                                |
| 6A | DUP3       | 6 CALLVALUE 0 6 CALLVALUE                                                              |
| 6B | SLOAD      | Storage[6] CALLVALUE 0 6 CALLVALUE |

所以當沒有呼叫資料時，我們讀取 Storage[6] 的值。 我們還不知道這個值是什麼，但我們可以尋找合約收到的沒有呼叫資料的交易。 在 Etherscan 中，僅轉帳 ETH 而沒有任何呼叫資料（因此沒有方法）的交易，其方法為 `Transfer`。 事實上，[合約收到的第一筆交易](https://etherscan.io/tx/0xeec75287a583c36bcc7ca87685ab41603494516a0f5986d18de96c8e630762e7) 就是一筆轉帳。

如果我們查看那筆交易並點擊 **Click to see More**，我們會看到呼叫資料（稱為輸入資料）確實是空的（`0x`）。 另請注意，其價值為 1.559 ETH，這在稍後會相關。

![呼叫資料為空](calldata-empty.png)

接下來，點擊 **State** 標籤並展開我們正在進行逆向工程的合約 (0x2510...)。 您可以看到 `Storage[6]` 在交易期間確實發生了變化，如果您將 Hex 改為 **Number**，您會看到它變成了 1,559,000,000,000,000,000，即以 wei 為單位的轉帳值（為清晰起見，我加了逗號），對應於下一個合約值。

![Storage[6] 的變化](storage6.png)

如果我們查看由[同一時期的其他 `Transfer` 交易](https://etherscan.io/tx/0xf708d306de39c422472f43cb975d97b66fd5d6a6863db627067167cbf93d84d1#statechange)引起的狀態變更，我們可以看到 `Storage[6]` 在一段時間內追蹤了合約的價值。 目前我們將其稱為 `Value*`。 星號 (`*`) 提醒我們，我們還不_知道_這個變數的作用，但它不可能只是為了追蹤合約價值，因為當您可以使用 `ADDRESS BALANCE` 取得帳戶餘額時，沒有必要使用非常昂貴的儲存空間。 第一個 opcode 推送合約自己的地址。 第二個 opcode 讀取堆疊頂部的地址，並將其替換為該地址的餘額。

| 位移 | Opcode       | 堆疊                                          |
| -: | ------------ | ------------------------------------------- |
| 6C | PUSH2 0x0075 | 0x75 Value\* CALLVALUE 0 6 CALLVALUE        |
| 6F | SWAP2        | CALLVALUE Value\* 0x75 0 6 CALLVALUE        |
| 70 | SWAP1        | Value\* CALLVALUE 0x75 0 6 CALLVALUE        |
| 71 | PUSH2 0x01a7 | 0x01A7 Value\* CALLVALUE 0x75 0 6 CALLVALUE |
| 74 | JUMP         |                                             |

我們將在跳轉目的地繼續追蹤這段程式碼。

|  位移 | Opcode     | 堆疊                                                          |
| --: | ---------- | ----------------------------------------------------------- |
| 1A7 | JUMPDEST   | Value\* CALLVALUE 0x75 0 6 CALLVALUE                        |
| 1A8 | PUSH1 0x00 | 0x00 Value\* CALLVALUE 0x75 0 6 CALLVALUE                   |
| 1AA | DUP3       | CALLVALUE 0x00 Value\* CALLVALUE 0x75 0 6 CALLVALUE         |
| 1AB | NOT        | 2^256-CALLVALUE-1 0x00 Value\* CALLVALUE 0x75 0 6 CALLVALUE |

`NOT` 是位元運算，所以它會反轉呼叫值中每個位元的值。

|  位移 | Opcode       | 堆疊                                                                                                     |
| --: | ------------ | ------------------------------------------------------------------------------------------------------ |
| 1AC | DUP3         | Value\* 2^256-CALLVALUE-1 0x00 Value\* CALLVALUE 0x75 0 6 CALLVALUE                                    |
| 1AD | GT           | Value\*>2^256-CALLVALUE-1 0x00 Value\* CALLVALUE 0x75 0 6 CALLVALUE                                    |
| 1AE | ISZERO       | Value\*\<=2^256-CALLVALUE-1 0x00 Value\* CALLVALUE 0x75 0 6 CALLVALUE        |
| 1AF | PUSH2 0x01df | 0x01DF Value\*\<=2^256-CALLVALUE-1 0x00 Value\* CALLVALUE 0x75 0 6 CALLVALUE |
| 1B2 | JUMPI        |                                                                                                        |

如果 `Value*` 小於或等於 2^256-CALLVALUE-1，我們就跳轉。 這看起來像是防止溢位的邏輯。 事實上，我們看到在位移 0x01DE 處，經過一些無意義的操作後（例如，寫入即將被刪除的記憶體），如果檢測到溢位，合約會還原，這是正常行為。

請注意，這樣的溢位極不可能發生，因為它需要呼叫值加上 `Value*` 的總和與 2^256 wei（約 10^59 ETH）相當。 [在撰寫本文時，ETH 的總供應量不到兩億](https://etherscan.io/stat/supply)。

|  位移 | Opcode   | 堆疊                                        |
| --: | -------- | ----------------------------------------- |
| 1DF | JUMPDEST | 0x00 Value\* CALLVALUE 0x75 0 6 CALLVALUE |
| 1E0 | POP      | Value\* CALLVALUE 0x75 0 6 CALLVALUE      |
| 1E1 | ADD      | Value\*+CALLVALUE 0x75 0 6 CALLVALUE      |
| 1E2 | SWAP1    | 0x75 Value\*+CALLVALUE 0 6 CALLVALUE      |
| 1E3 | JUMP     |                                           |

如果我們到達這裡，取得 `Value* + CALLVALUE` 並跳轉到位移 0x75。

| 位移 | Opcode   | 堆疊                              |
| -: | -------- | ------------------------------- |
| 75 | JUMPDEST | Value\*+CALLVALUE 0 6 CALLVALUE |
| 76 | SWAP1    | 0 Value\*+CALLVALUE 6 CALLVALUE |
| 77 | SWAP2    | 6 Value\*+CALLVALUE 0 CALLVALUE |
| 78 | SSTORE   | 0 CALLVALUE                     |

如果我們到達這裡（這要求呼叫資料為空），我們會將呼叫值加到 `Value*` 上。 這與我們所說的 `Transfer` 交易的作用一致。

| 位移 | Opcode |
| -: | ------ |
| 79 | POP    |
| 7A | POP    |
| 7B | STOP   |

最後，清除堆疊（這不是必要的）並標示交易成功結束。

總結一下，這是初始程式碼的流程圖。

![進入點流程圖](flowchart-entry.png)

## 0x7C 的處理常式 {#the-handler-at-0x7c}

我故意不在標題中說明這個處理常式的作用。 重點不是教您這個特定合約如何運作，而是如何對合約進行逆向工程。 您將透過追蹤程式碼，以與我相同的方式了解它的作用。

我們從幾個地方來到這裡：

- 如果呼叫資料為 1、2 或 3 個位元組（從位移 0x63 開始）
- 如果方法簽名未知（從位移 0x42 和 0x5D 開始）

| 位移 | Opcode       | 堆疊                                                                       |
| -: | ------------ | ------------------------------------------------------------------------ |
| 7C | JUMPDEST     |                                                                          |
| 7D | PUSH1 0x00   | 0x00                                                                     |
| 7F | PUSH2 0x009d | 0x9D 0x00                                                                |
| 82 | PUSH1 0x03   | 0x03 0x9D 0x00                                                           |
| 84 | SLOAD        | Storage[3] 0x9D 0x00 |

這是另一個儲存單元，我在任何交易中都找不到它，所以很難知道它的意思。 下面的程式碼將使其更清晰。

| 位移 | Opcode                                            | 堆疊                                                                                                                                                  |
| -: | ------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| 85 | PUSH20 0xffffffffffffffffffffffffffffffffffffffff | 0xff....ff Storage[3] 0x9D 0x00 |
| 9A | AND                                               | Storage[3]-as-address 0x9D 0x00                                                                 |

這些 opcodes 將我們從 Storage[3] 讀取的值截斷為 160 位元，即以太坊地址的長度。

| 位移 | Opcode | 堆疊                                                                                  |
| -: | ------ | ----------------------------------------------------------------------------------- |
| 9B | SWAP1  | 0x9D Storage[3]-as-address 0x00 |
| 9C | JUMP   | Storage[3]-as-address 0x00      |

這個跳轉是多餘的，因為我們要去下一個 opcode。 這段程式碼的 gas 效率遠不及應有的水平。

| 位移 | Opcode     | 堆疊                                                                                                                                      |
| -: | ---------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| 9D | JUMPDEST   | Storage[3]-as-address 0x00                                                          |
| 9E | SWAP1      | 0x00 Storage[3]-as-address                                                          |
| 9F | POP        | Storage[3]-as-address                                                               |
| A0 | PUSH1 0x40 | 0x40 Storage[3]-as-address                                                          |
| A2 | MLOAD      | Mem[0x40] Storage[3]-as-address |

在程式碼的最開頭，我們將 Mem[0x40] 設置為 0x80。 如果我們稍後查看 0x40，我們會發現我們沒有改變它——所以我們可以假設它是 0x80。

| 位移 | Opcode       | 堆疊                                                                                                    |
| -: | ------------ | ----------------------------------------------------------------------------------------------------- |
| A3 | CALLDATASIZE | CALLDATASIZE 0x80 Storage[3]-as-address           |
| A4 | PUSH1 0x00   | 0x00 CALLDATASIZE 0x80 Storage[3]-as-address      |
| A6 | DUP3         | 0x80 0x00 CALLDATASIZE 0x80 Storage[3]-as-address |
| A7 | CALLDATACOPY | 0x80 Storage[3]-as-address                        |

將所有呼叫資料複製到記憶體，從 0x80 開始。

| 位移 | Opcode                             | 堆疊                                                                                                                                                                                       |
| -: | ---------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| A8 | PUSH1 0x00                         | 0x00 0x80 Storage[3]-as-address                                                                                                      |
| AA | DUP1                               | 0x00 0x00 0x80 Storage[3]-as-address                                                                                                 |
| AB | CALLDATASIZE                       | CALLDATASIZE 0x00 0x00 0x80 Storage[3]-as-address                                                                                    |
| AC | DUP4                               | 0x80 CALLDATASIZE 0x00 0x00 0x80 Storage[3]-as-address                                                                               |
| AD | DUP6                               | Storage[3]-as-address 0x80 CALLDATASIZE 0x00 0x00 0x80 Storage[3]-as-address     |
| AE | GAS                                | GAS Storage[3]-as-address 0x80 CALLDATASIZE 0x00 0x00 0x80 Storage[3]-as-address |
| AF | DELEGATE_CALL |                                                                                                                                                                                          |

現在事情清楚多了。 這個合約可以作為[代理](https://blog.openzeppelin.com/proxy-patterns/)，呼叫 Storage[3] 中的地址來完成實際工作。 `DELEGATE_CALL` 呼叫一個單獨的合約，但停留在同一個儲存空間。 這意味著被代理的合約，即我們作為代理的合約，會存取相同的儲存空間。 呼叫的參數是：

- _Gas_：所有剩餘的 gas
- _被呼叫的地址_：Storage[3]-as-address
- _呼叫資料_：從 0x80 開始的 CALLDATASIZE 位元組，這是我們放置原始呼叫資料的地方
- _返回資料_：無 (0x00 - 0x00) 我們將透過其他方式取得返回資料（見下文）

| 位移 | Opcode         | 堆疊                                                                                                                                                                                            |
| -: | -------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| B0 | RETURNDATASIZE | RETURNDATASIZE (((呼叫成功/失敗))) 0x80 Storage[3]-as-address                          |
| B1 | DUP1           | RETURNDATASIZE RETURNDATASIZE (((呼叫成功/失敗))) 0x80 Storage[3]-as-address           |
| B2 | PUSH1 0x00     | 0x00 RETURNDATASIZE RETURNDATASIZE (((呼叫成功/失敗))) 0x80 Storage[3]-as-address      |
| B4 | DUP5           | 0x80 0x00 RETURNDATASIZE RETURNDATASIZE (((呼叫成功/失敗))) 0x80 Storage[3]-as-address |
| B5 | RETURNDATACOPY | RETURNDATASIZE (((呼叫成功/失敗))) 0x80 Storage[3]-as-address                          |

在這裡，我們將所有返回資料複製到從 0x80 開始的記憶體緩衝區。

| 位移 | Opcode       | 堆疊                                                                                                                                                                                                                                                                                                                     |
| -: | ------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| B6 | DUP2         | (((呼叫成功/失敗))) RETURNDATASIZE (((呼叫成功/失敗))) 0x80 Storage[3]-as-address                                                                            |
| B7 | DUP1         | (((呼叫成功/失敗))) (((呼叫成功/失敗))) RETURNDATASIZE (((呼叫成功/失敗))) 0x80 Storage[3]-as-address     |
| B8 | ISZERO       | (((呼叫失敗了嗎))) (((呼叫成功/失敗))) RETURNDATASIZE (((呼叫成功/失敗))) 0x80 Storage[3]-as-address      |
| B9 | PUSH2 0x00c0 | 0xC0 (((呼叫失敗了嗎))) (((呼叫成功/失敗))) RETURNDATASIZE (((呼叫成功/失敗))) 0x80 Storage[3]-as-address |
| BC | JUMPI        | (((呼叫成功/失敗))) RETURNDATASIZE (((呼叫成功/失敗))) 0x80 Storage[3]-as-address                                                                            |
| BD | DUP2         | RETURNDATASIZE (((呼叫成功/失敗))) RETURNDATASIZE (((呼叫成功/失敗))) 0x80 Storage[3]-as-address                                                             |
| BE | DUP5         | 0x80 RETURNDATASIZE (((呼叫成功/失敗))) RETURNDATASIZE (((呼叫成功/失敗))) 0x80 Storage[3]-as-address                                                        |
| BF | RETURN       |                                                                                                                                                                                                                                                                                                                        |

因此，在呼叫之後，我們將返回資料複製到緩衝區 0x80 - 0x80+RETURNDATASIZE，如果呼叫成功，我們就用那個緩衝區進行 `RETURN`。

### DELEGATECALL 失敗 {#delegatecall-failed}

如果我們到達這裡，到 0xC0，這意味著我們呼叫的合約已還原。 由於我們只是該合約的代理，我們希望返回相同的資料並也進行還原。

| 位移 | Opcode   | 堆疊                                                                                                                                                                                                                                                              |
| -: | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| C0 | JUMPDEST | (((呼叫成功/失敗))) RETURNDATASIZE (((呼叫成功/失敗))) 0x80 Storage[3]-as-address                     |
| C1 | DUP2     | RETURNDATASIZE (((呼叫成功/失敗))) RETURNDATASIZE (((呼叫成功/失敗))) 0x80 Storage[3]-as-address      |
| C2 | DUP5     | 0x80 RETURNDATASIZE (((呼叫成功/失敗))) RETURNDATASIZE (((呼叫成功/失敗))) 0x80 Storage[3]-as-address |
| C3 | REVERT   |                                                                                                                                                                                                                                                                 |

所以我們使用與之前用於 `RETURN` 相同的緩衝區進行 `REVERT`：0x80 - 0x80+RETURNDATASIZE

![代理呼叫流程圖](flowchart-proxy.png)

## ABI 呼叫 {#abi-calls}

如果呼叫資料大小為四個位元組或更多，這可能是一個有效的 ABI 呼叫。

| 位移 | Opcode       | 堆疊                                                                                                       |
| -: | ------------ | -------------------------------------------------------------------------------------------------------- |
|  D | PUSH1 0x00   | 0x00                                                                                                     |
|  F | CALLDATALOAD | (((呼叫資料的第一個字 (256 位元)))      |
| 10 | PUSH1 0xe0   | 0xE0 (((呼叫資料的第一個字 (256 位元))) |
| 12 | SHR          | (((呼叫資料的前 32 位元 (4 位元組)))    |

Etherscan 告訴我們 `1C` 是一個未知的 opcode，因為[它是在 Etherscan 編寫此功能後添加的](https://eips.ethereum.org/EIPS/eip-145)，而且他們尚未更新。 一份[最新的 opcode 表格](https://github.com/wolflo/evm-opcodes)顯示這是向右移位

| 位移 | Opcode           | 堆疊                                                                                                                                                                                                                     |
| -: | ---------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 13 | DUP1             | (((呼叫資料的前 32 位元 (4 位元組))) (((呼叫資料的前 32 位元 (4 位元組)))            |
| 14 | PUSH4 0x3cd8045e | 0x3CD8045E (((呼叫資料的前 32 位元 (4 位元組))) (((呼叫資料的前 32 位元 (4 位元組))) |
| 19 | GT               | 0x3CD8045E>呼叫資料的前 32 位元 (((呼叫資料的前 32 位元 (4 位元組)))                                                                                          |
| 1A | PUSH2 0x0043     | 0x43 0x3CD8045E>呼叫資料的前 32 位元 (((呼叫資料的前 32 位元 (4 位元組)))                                                                                     |
| 1D | JUMPI            | (((呼叫資料的前 32 位元 (4 位元組)))                                                                                                                  |

像這樣將方法簽名匹配測試分成兩部分，平均可以節省一半的測試時間。 緊隨其後的程式碼和 0x43 中的程式碼遵循相同的模式：`DUP1` 呼叫資料的前 32 位元，`PUSH4 (((方法簽名)))`，執行 `EQ` 檢查是否相等，然後如果方法簽名匹配則 `JUMPI`。 以下是方法簽名、它們的地址，以及（如果已知）[相應的方法定義](https://www.4byte.directory/)：

| 方法                                                                                                        | 方法簽名       | 跳轉到的位移 |
| --------------------------------------------------------------------------------------------------------- | ---------- | ------ |
| [splitter()](https://www.4byte.directory/signatures/?bytes4_signature=0x3cd8045e)      | 0x3cd8045e | 0x0103 |
| ???                                                                                                       | 0x81e580d3 | 0x0138 |
| [currentWindow()](https://www.4byte.directory/signatures/?bytes4_signature=0xba0bafb4) | 0xba0bafb4 | 0x0158 |
| ???                                                                                                       | 0x1f135823 | 0x00C4 |
| [merkleRoot()](https://www.4byte.directory/signatures/?bytes4_signature=0x2eb4a7ab)    | 0x2eb4a7ab | 0x00ED |

如果找不到匹配項，程式碼會跳轉到 [0x7C 的代理處理常式](#the-handler-at-0x7c)，希望我們作為代理的合約有匹配項。

![ABI 呼叫流程圖](flowchart-abi.png)

## splitter() {#splitter}

|  位移 | Opcode       | 堆疊                            |
| --: | ------------ | ----------------------------- |
| 103 | JUMPDEST     |                               |
| 104 | CALLVALUE    | CALLVALUE                     |
| 105 | DUP1         | CALLVALUE CALLVALUE           |
| 106 | ISZERO       | CALLVALUE==0 CALLVALUE        |
| 107 | PUSH2 0x010f | 0x010F CALLVALUE==0 CALLVALUE |
| 10A | JUMPI        | CALLVALUE                     |
| 10B | PUSH1 0x00   | 0x00 CALLVALUE                |
| 10D | DUP1         | 0x00 0x00 CALLVALUE           |
| 10E | REVERT       |                               |

這個函數首先檢查呼叫是否發送了任何 ETH。 這個函數不是 [`payable`](https://solidity-by-example.org/payable/)。 如果有人向我們發送 ETH，那一定是個錯誤，我們希望 `REVERT` 以避免那些 ETH 留在他們無法取回的地方。

|  位移 | Opcode                                            | 堆疊                                                                                                                                                                                                     |
| --: | ------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 10F | JUMPDEST                                          |                                                                                                                                                                                                        |
| 110 | POP                                               |                                                                                                                                                                                                        |
| 111 | PUSH1 0x03                                        | 0x03                                                                                                                                                                                                   |
| 113 | SLOAD                                             | (((Storage[3] 又名我們代理的合約)))                                                                |
| 114 | PUSH1 0x40                                        | 0x40 (((Storage[3] 又名我們代理的合約)))                                                           |
| 116 | MLOAD                                             | 0x80 (((Storage[3] 又名我們代理的合約)))                                                           |
| 117 | PUSH20 0xffffffffffffffffffffffffffffffffffffffff | 0xFF...FF 0x80 (((Storage[3] 又名我們代理的合約))) |
| 12C | SWAP1                                             | 0x80 0xFF...FF (((Storage[3] 又名我們代理的合約))) |
| 12D | SWAP2                                             | (((Storage[3] 又名我們代理的合約))) 0xFF...FF 0x80 |
| 12E | AND                                               | ProxyAddr 0x80                                                                                                                                                                                         |
| 12F | DUP2                                              | 0x80 ProxyAddr 0x80                                                                                                                                                                                    |
| 130 | MSTORE                                            | 0x80                                                                                                                                                                                                   |

而 0x80 現在包含代理地址

|  位移 | Opcode       | 堆疊        |
| --: | ------------ | --------- |
| 131 | PUSH1 0x20   | 0x20 0x80 |
| 133 | ADD          | 0xA0      |
| 134 | PUSH2 0x00e4 | 0xE4 0xA0 |
| 137 | JUMP         | 0xA0      |

### E4 程式碼 {#the-e4-code}

這是我們第一次看到這些行，但它們與其他方法共用（見下文）。 所以我們將堆疊中的值稱為 X，並記住，在 `splitter()` 中，這個 X 的值是 0xA0。

| 位移 | Opcode     | 堆疊          |
| -: | ---------- | ----------- |
| E4 | JUMPDEST   | X           |
| E5 | PUSH1 0x40 | 0x40 X      |
| E7 | MLOAD      | 0x80 X      |
| E8 | DUP1       | 0x80 0x80 X |
| E9 | SWAP2      | X 0x80 0x80 |
| EA | SUB        | X-0x80 0x80 |
| EB | SWAP1      | 0x80 X-0x80 |
| EC | RETURN     |             |

所以這段程式碼在堆疊中接收一個記憶體指標 (X)，並使合約以一個 0x80 - X 的緩衝區 `RETURN`。

在 `splitter()` 的情況下，這會返回我們代理的地址。 `RETURN` 返回 0x80-0x9F 中的緩衝區，這是我們寫入此資料的位置（上面的位移 0x130）。

## currentWindow() {#currentwindow}

位移 0x158-0x163 中的程式碼與我們在 `splitter()` 的 0x103-0x10E 中看到的相同（除了 `JUMPI` 目的地），所以我們知道 `currentWindow()` 也不是 `payable`。

|  位移 | Opcode       | 堆疊                                                                       |
| --: | ------------ | ------------------------------------------------------------------------ |
| 164 | JUMPDEST     |                                                                          |
| 165 | POP          |                                                                          |
| 166 | PUSH2 0x00da | 0xDA                                                                     |
| 169 | PUSH1 0x01   | 0x01 0xDA                                                                |
| 16B | SLOAD        | Storage[1] 0xDA      |
| 16C | DUP2         | 0xDA Storage[1] 0xDA |
| 16D | JUMP         | Storage[1] 0xDA      |

### DA 程式碼 {#the-da-code}

這段程式碼也與其他方法共用。 所以我們將堆疊中的值稱為 Y，並記住，在 `currentWindow()` 中，這個 Y 的值是 Storage[1]。

| 位移 | Opcode     | 堆疊               |
| -: | ---------- | ---------------- |
| DA | JUMPDEST   | Y 0xDA           |
| DB | PUSH1 0x40 | 0x40 Y 0xDA      |
| DD | MLOAD      | 0x80 Y 0xDA      |
| DE | SWAP1      | Y 0x80 0xDA      |
| DF | DUP2       | 0x80 Y 0x80 0xDA |
| E0 | MSTORE     | 0x80 0xDA        |

將 Y 寫入 0x80-0x9F。

| 位移 | Opcode     | 堆疊             |
| -: | ---------- | -------------- |
| E1 | PUSH1 0x20 | 0x20 0x80 0xDA |
| E3 | ADD        | 0xA0 0xDA      |

其餘的已在[上面](#the-e4-code)解釋過了。 所以跳轉到 0xDA 會將堆疊頂部 (Y) 寫入 0x80-0x9F，並返回該值。 在 `currentWindow()` 的情況下，它返回 Storage[1]。

## merkleRoot() {#merkleroot}

位移 0xED-0xF8 中的程式碼與我們在 `splitter()` 的 0x103-0x10E 中看到的相同（除了 `JUMPI` 目的地），所以我們知道 `merkleRoot()` 也不是 `payable`。

|  位移 | Opcode       | 堆疊                                                                       |
| --: | ------------ | ------------------------------------------------------------------------ |
|  F9 | JUMPDEST     |                                                                          |
|  FA | POP          |                                                                          |
|  FB | PUSH2 0x00da | 0xDA                                                                     |
|  FE | PUSH1 0x00   | 0x00 0xDA                                                                |
| 100 | SLOAD        | Storage[0] 0xDA      |
| 101 | DUP2         | 0xDA Storage[0] 0xDA |
| 102 | JUMP         | Storage[0] 0xDA      |

跳轉後發生的事情[我們已經弄清楚了](#the-da-code)。 所以 `merkleRoot()` 返回 Storage[0]。

## 0x81e580d3 {#0x81e580d3}

位移 0x138-0x143 中的程式碼與我們在 `splitter()` 的 0x103-0x10E 中看到的相同（除了 `JUMPI` 目的地），所以我們知道這個函數也不是 `payable`。

|  位移 | Opcode       | 堆疊                                                                              |
| --: | ------------ | ------------------------------------------------------------------------------- |
| 144 | JUMPDEST     |                                                                                 |
| 145 | POP          |                                                                                 |
| 146 | PUSH2 0x00da | 0xDA                                                                            |
| 149 | PUSH2 0x0153 | 0x0153 0xDA                                                                     |
| 14C | CALLDATASIZE | CALLDATASIZE 0x0153 0xDA                                                        |
| 14D | PUSH1 0x04   | 0x04 CALLDATASIZE 0x0153 0xDA                                                   |
| 14F | PUSH2 0x018f | 0x018F 0x04 CALLDATASIZE 0x0153 0xDA                                            |
| 152 | JUMP         | 0x04 CALLDATASIZE 0x0153 0xDA                                                   |
| 18F | JUMPDEST     | 0x04 CALLDATASIZE 0x0153 0xDA                                                   |
| 190 | PUSH1 0x00   | 0x00 0x04 CALLDATASIZE 0x0153 0xDA                                              |
| 192 | PUSH1 0x20   | 0x20 0x00 0x04 CALLDATASIZE 0x0153 0xDA                                         |
| 194 | DUP3         | 0x04 0x20 0x00 0x04 CALLDATASIZE 0x0153 0xDA                                    |
| 195 | DUP5         | CALLDATASIZE 0x04 0x20 0x00 0x04 CALLDATASIZE 0x0153 0xDA                       |
| 196 | SUB          | CALLDATASIZE-4 0x20 0x00 0x04 CALLDATASIZE 0x0153 0xDA                          |
| 197 | SLT          | CALLDATASIZE-4\<32 0x00 0x04 CALLDATASIZE 0x0153 0xDA |
| 198 | ISZERO       | CALLDATASIZE-4>=32 0x00 0x04 CALLDATASIZE 0x0153 0xDA                           |
| 199 | PUSH2 0x01a0 | 0x01A0 CALLDATASIZE-4>=32 0x00 0x04 CALLDATASIZE 0x0153 0xDA                    |
| 19C | JUMPI        | 0x00 0x04 CALLDATASIZE 0x0153 0xDA                                              |

看起來這個函數至少需要 32 個位元組（一個字）的呼叫資料。

|  位移 | Opcode | 堆疊                                           |
| --: | ------ | -------------------------------------------- |
| 19D | DUP1   | 0x00 0x00 0x04 CALLDATASIZE 0x0153 0xDA      |
| 19E | DUP2   | 0x00 0x00 0x00 0x04 CALLDATASIZE 0x0153 0xDA |
| 19F | REVERT |                                              |

如果它沒有得到呼叫資料，交易會被還原而沒有任何返回資料。

讓我們看看如果函數_確實_得到了它需要的呼叫資料會發生什麼。

|  位移 | Opcode       | 堆疊                                                          |
| --: | ------------ | ----------------------------------------------------------- |
| 1A0 | JUMPDEST     | 0x00 0x04 CALLDATASIZE 0x0153 0xDA                          |
| 1A1 | POP          | 0x04 CALLDATASIZE 0x0153 0xDA                               |
| 1A2 | CALLDATALOAD | calldataload(4) CALLDATASIZE 0x0153 0xDA |

`calldataload(4)` 是呼叫資料中方法簽名_之後_的第一個字

|  位移 | Opcode       | 堆疊                                                                                                                                                                                                                   |
| --: | ------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1A3 | SWAP2        | 0x0153 CALLDATASIZE calldataload(4) 0xDA                                                                                                                                                          |
| 1A4 | SWAP1        | CALLDATASIZE 0x0153 calldataload(4) 0xDA                                                                                                                                                          |
| 1A5 | POP          | 0x0153 calldataload(4) 0xDA                                                                                                                                                                       |
| 1A6 | JUMP         | calldataload(4) 0xDA                                                                                                                                                                              |
| 153 | JUMPDEST     | calldataload(4) 0xDA                                                                                                                                                                              |
| 154 | PUSH2 0x016e | 0x016E calldataload(4) 0xDA                                                                                                                                                                       |
| 157 | JUMP         | calldataload(4) 0xDA                                                                                                                                                                              |
| 16E | JUMPDEST     | calldataload(4) 0xDA                                                                                                                                                                              |
| 16F | PUSH1 0x04   | 0x04 calldataload(4) 0xDA                                                                                                                                                                         |
| 171 | DUP2         | calldataload(4) 0x04 calldataload(4) 0xDA                                                                                                                                      |
| 172 | DUP2         | 0x04 calldataload(4) 0x04 calldataload(4) 0xDA                                                                                                                                 |
| 173 | SLOAD        | Storage[4] calldataload(4) 0x04 calldataload(4) 0xDA                                                                       |
| 174 | DUP2         | calldataload(4) Storage[4] calldataload(4) 0x04 calldataload(4) 0xDA                                    |
| 175 | LT           | calldataload(4)\<Storage[4] calldataload(4) 0x04 calldataload(4) 0xDA         |
| 176 | PUSH2 0x017e | 0x017EC calldataload(4)\<Storage[4] calldataload(4) 0x04 calldataload(4) 0xDA |
| 179 | JUMPI        | calldataload(4) 0x04 calldataload(4) 0xDA                                                                                                                                      |

如果第一個字不小於 Storage[4]，函數將失敗。 它會還原而不返回任何值：

|  位移 | Opcode     | 堆疊                                                            |
| --: | ---------- | ------------------------------------------------------------- |
| 17A | PUSH1 0x00 | 0x00 ...      |
| 17C | DUP1       | 0x00 0x00 ... |
| 17D | REVERT     |                                                               |

如果 calldataload(4) 小於 Storage[4]，我們得到這段程式碼：

|  位移 | Opcode     | 堆疊                                                                                        |
| --: | ---------- | ----------------------------------------------------------------------------------------- |
| 17E | JUMPDEST   | calldataload(4) 0x04 calldataload(4) 0xDA           |
| 17F | PUSH1 0x00 | 0x00 calldataload(4) 0x04 calldataload(4) 0xDA      |
| 181 | SWAP2      | 0x04 calldataload(4) 0x00 calldataload(4) 0xDA      |
| 182 | DUP3       | 0x00 0x04 calldataload(4) 0x00 calldataload(4) 0xDA |
| 183 | MSTORE     | calldataload(4) 0x00 calldataload(4) 0xDA           |

記憶體位置 0x00-0x1F 現在包含資料 0x04（0x00-0x1E 全為零，0x1F 為四）

|  位移 | Opcode     | 堆疊                                                                                                                                                                                                                         |
| --: | ---------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 184 | PUSH1 0x20 | 0x20 calldataload(4) 0x00 calldataload(4) 0xDA                                                                                                                                       |
| 186 | SWAP1      | calldataload(4) 0x20 0x00 calldataload(4) 0xDA                                                                                                                                       |
| 187 | SWAP2      | 0x00 0x20 calldataload(4) calldataload(4) 0xDA                                                                                                                                       |
| 188 | SHA3       | (((SHA3 of 0x00-0x1F))) calldataload(4) calldataload(4) 0xDA                                                                |
| 189 | ADD        | (((SHA3 of 0x00-0x1F)))+calldataload(4) calldataload(4) 0xDA                                                                |
| 18A | SLOAD      | Storage[(((SHA3 of 0x00-0x1F))) + calldataload(4)] calldataload(4) 0xDA |

所以在儲存中有一個查找表，它從 0x000...0004 的 SHA3 開始，並為每個合法的呼叫資料值（值小於 Storage[4]）提供一個條目。

|  位移 | Opcode | 堆疊                                                                                                                                                                                                                         |
| --: | ------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 18B | SWAP1  | calldataload(4) Storage[(((SHA3 of 0x00-0x1F))) + calldataload(4)] 0xDA |
| 18C | POP    | Storage[(((SHA3 of 0x00-0x1F))) + calldataload(4)] 0xDA                                    |
| 18D | DUP2   | 0xDA Storage[(((SHA3 of 0x00-0x1F))) + calldataload(4)] 0xDA                               |
| 18E | JUMP   | Storage[(((SHA3 of 0x00-0x1F))) + calldataload(4)] 0xDA                                    |

我們已經知道位移 [0xDA 的程式碼](#the-da-code) 的作用，它將堆疊頂部的值返回給呼叫者。 所以這個函數將查找表中的值返回給呼叫者。

## 0x1f135823 {#0x1f135823}

位移 0xC4-0xCF 中的程式碼與我們在 `splitter()` 的 0x103-0x10E 中看到的相同（除了 `JUMPI` 目的地），所以我們知道這個函數也不是 `payable`。

| 位移 | Opcode       | 堆疊                |
| -: | ------------ | ----------------- |
| D0 | JUMPDEST     |                   |
| D1 | POP          |                   |
| D2 | PUSH2 0x00da | 0xDA              |
| D5 | PUSH1 0x06   | 0x06 0xDA         |
| D7 | SLOAD        | Value\* 0xDA      |
| D8 | DUP2         | 0xDA Value\* 0xDA |
| D9 | JUMP         | Value\* 0xDA      |

我們已經知道位移 [0xDA 的程式碼](#the-da-code) 的作用，它將堆疊頂部的值返回給呼叫者。 所以這個函數返回 `Value*`。

### 方法摘要 {#method-summary}

此時您是否覺得您已經理解了合約？ 我不覺得。 到目前為止，我們有這些方法：

| 方法                                                   | 意義                                                                              |
| ---------------------------------------------------- | ------------------------------------------------------------------------------- |
| 轉帳                                                   | 接受呼叫提供的值，並將 `Value*` 增加該金額                                                      |
| [splitter()](#splitter)           | 返回 Storage[3]，即代理地址         |
| [currentWindow()](#currentwindow) | 返回 Storage[1]               |
| [merkleRoot()](#merkeroot)        | 返回 Storage[0]               |
| [0x81e580d3](#0x81e580d3)                            | 從查找表中返回值，前提是參數小於 Storage[4] |
| [0x1f135823](#0x1f135823)                            | 返回 Storage[6]，又名。 Value\*   |

但我們知道任何其他功能都由 Storage[3] 中的合約提供。 也許如果我們知道那個合約是什麼，它會給我們一些線索。 幸運的是，這是區塊鏈，至少在理論上，一切都是已知的。 我們沒有看到任何設定 Storage[3] 的方法，所以它一定是由建構子設定的。

## 建構函式 {#the-constructor}

當我們[查看合約](https://etherscan.io/address/0x2510c039cc3b061d79e564b38836da87e31b342f)時，我們也可以看到創建它的交易。

![點擊創建交易](create-tx.png)

如果我們點擊那筆交易，然後點擊 **State** 標籤，我們可以看到參數的初始值。 具體來說，我們可以看到 Storage[3] 包含 [0x2f81e57ff4f4d83b40a9f719fd892d8e806e0761](https://etherscan.io/address/0x2f81e57ff4f4d83b40a9f719fd892d8e806e0761)。 該合約必須包含缺失的功能。 我們可以使用用於我們正在調查的合約的相同工具來理解它。

## 代理合約 {#the-proxy-contract}

使用我們用於上面原始合約的相同技術，我們可以看到合約在以下情況下會還原：

- 呼叫附加了任何 ETH (0x05-0x0F)
- 呼叫資料大小小於四 (0x10-0x19 和 0xBE-0xC2)

它支援的方法是：

| 方法                                                                                                                                                                                     | 方法簽名                         | 跳轉到的位移 |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------- | ------ |
| [scaleAmountByPercentage(uint256,uint256)](https://www.4byte.directory/signatures/?bytes4_signature=0x8ffb5c97)                                                     | 0x8ffb5c97                   | 0x0135 |
| [isClaimed(uint256,address)](https://www.4byte.directory/signatures/?bytes4_signature=0xd2ef0795)                                                                   | 0xd2ef0795                   | 0x0151 |
| [claim(uint256,address,uint256,bytes32[])](https://www.4byte.directory/signatures/?bytes4_signature=0x2e7ba6ef) | 0x2e7ba6ef                   | 0x00F4 |
| [incrementWindow()](https://www.4byte.directory/signatures/?bytes4_signature=0x338b1d31)                                                                            | 0x338b1d31                   | 0x0110 |
| ???                                                                                                                                                                                    | 0x3f26479e                   | 0x0118 |
| ???                                                                                                                                                                                    | 0x1e7df9d3                   | 0x00C3 |
| [currentWindow()](https://www.4byte.directory/signatures/?bytes4_signature=0xba0bafb4)                                                                              | [0xba0bafb4](#currentwindow) | 0x0148 |
| [merkleRoot()](https://www.4byte.directory/signatures/?bytes4_signature=0x2eb4a7ab)                                                                                 | [0x2eb4a7ab](#merkleroot)    | 0x0107 |
| ???                                                                                                                                                                                    | [0x81e580d3](#0x81e580d3)    | 0x0122 |
| ???                                                                                                                                                                                    | [0x1f135823](#0x1f135823)    | 0x00D8 |

我們可以忽略最下面的四個方法，因為我們永遠不會到達它們。 它們的簽名使得我們的原始合約會自行處理它們（您可以點擊簽名以查看上面的詳細資訊），所以它們必須是[被覆蓋的方法](https://medium.com/upstate-interactive/solidity-override-vs-virtual-functions-c0a5dfb83aaf)。

剩下的方法之一是 `claim(<params>)`，另一個是 `isClaimed(<params>)`，所以它看起來像一個空投合約。 與其逐個 opcode 瀏覽其餘部分，我們可以[嘗試反編譯器](https://etherscan.io/bytecode-decompiler?a=0x2f81e57ff4f4d83b40a9f719fd892d8e806e0761)，它從這個合約中為三個函數產生了可用的結果。 對其他函數的逆向工程留給讀者作為練習。

### scaleAmountByPercentage {#scaleamountbypercentage}

以下是反編譯器為此函數提供的內容：

```python
def unknown8ffb5c97(uint256 _param1, uint256 _param2) payable:
  require calldata.size - 4 >=′ 64
  if _param1 and _param2 > -1 / _param1:
      revert with 0, 17
  return (_param1 * _param2 / 100 * 10^6)
```

第一個 `require` 測試呼叫資料除了函數簽名的四個位元組外，至少還有 64 個位元組，足以容納兩個參數。 如果不是，顯然有問題。

`if` 語句似乎檢查 `_param1` 是否不為零，以及 `_param1 * _param2` 是否不為負。 這可能是為了防止環繞的情況。

最後，函數返回一個縮放後的值。

### 申領 {#claim}

反編譯器創建的程式碼很複雜，並非所有程式碼都與我們相關。 我將跳過其中一部分，專注於我認為提供有用資訊的行

```python
def unknown2e7ba6ef(uint256 _param1, uint256 _param2, uint256 _param3, array _param4) payable:
  ...
  require _param2 == addr(_param2)
  ...
  if currentWindow <= _param1:
      revert with 0, 'cannot claim for a future window'
```

我們在這裡看到兩個重要的事情：

- `_param2`，雖然它被聲明為 `uint256`，但實際上是一個地址
- `_param1` 是被申領的窗口，必須是 `currentWindow` 或更早。

```python
  ...
  if stor5[_claimWindow][addr(_claimFor)]:
      revert with 0, 'Account already claimed the given window'
```

所以現在我們知道 Storage[5] 是一個視窗和地址的陣列，以及地址是否已為該視窗申領獎勵。

```python
  ...
  idx = 0
  s = 0
  while idx < _param4.length:
  ...
      if s + sha3(mem[(32 * _param4.length) + 328 len mem[(32 * _param4.length) + 296]]) > mem[(32 * idx) + 296]:
          mem[mem[64] + 32] = mem[(32 * idx) + 296]
          ...
          s = sha3(mem[_62 + 32 len mem[_62]])
          continue
      ...
      s = sha3(mem[_66 + 32 len mem[_66]])
      continue
  if unknown2eb4a7ab != s:
      revert with 0, 'Invalid proof'
```

我們知道 `unknown2eb4a7ab` 實際上是 `merkleRoot()` 函數，所以這段程式碼看起來像是在驗證一個 [merkle 證明](https://medium.com/crypto-0-nite/merkle-proofs-explained-6dd429623dc5)。 這意味著 `_param4` 是一個 merkle 證明。

```python
call addr(_param2) with:
     value unknown81e580d3[_param1] * _param3 / 100 * 10^6 wei
       gas 30000 wei
```

這是一個合約將自己的 ETH 轉移到另一個地址（合約或外部擁有）的方式。 它以要轉移的金額作為值來呼叫它。 所以看起來這是一次 ETH 空投。

```python
if not return_data.size:
      if not ext_call.success:
          require ext_code.size(stor2)
          call stor2.deposit() with:
             value unknown81e580d3[_param1] * _param3 / 100 * 10^6 wei
```

最下面兩行告訴我們，Storage[2] 也是我們呼叫的一個合約。 如果我們[查看建構子交易](https://etherscan.io/tx/0xa1ea0549fb349eb7d3aff90e1d6ce7469fdfdcd59a2fd9b8d1f5e420c0d05b58#statechange)，我們會看到這個合約是 [0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2](https://etherscan.io/address/0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2)，一個 [其原始碼已上傳到 Etherscan 的](https://etherscan.io/address/0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2#code) 包裝以太幣合約。

所以看起來合約試圖將 ETH 發送給 `_param2`。 如果能成功，那就太好了。 如果不行，它會嘗試發送 [WETH](https://weth.tkn.eth.limo/)。 如果 `_param2` 是一個外部擁有的帳戶 (EOA)，那麼它總是可以接收 ETH，但合約可以拒絕接收 ETH。 然而，WETH 是 ERC-20，合約不能拒絕接受它。

```python
log 0xdbd5389f: addr(_param2), unknown81e580d3[_param1] * _param3 / 100 * 10^6, bool(ext_call.success)
```

在函數的末尾，我們看到一個日誌條目正在生成。 [查看生成的日誌條目](https://etherscan.io/address/0x2510c039cc3b061d79e564b38836da87e31b342f#events) 並過濾以 `0xdbd5...` 開頭的主題。 如果我們[點擊其中一筆產生此類條目的交易](https://etherscan.io/tx/0xe7d3b7e00f645af17dfbbd010478ef4af235896c65b6548def1fe95b3b7d2274)，我們會看到它確實看起來像一次申領——該帳戶向我們正在進行逆向工程的合約發送了一條訊息，並作為回報收到了 ETH。

![一次申領交易](claim-tx.png)

### 1e7df9d3 {#1e7df9d3}

這個函數與上面的 [`claim`](#claim) 非常相似。 它還會檢查 merkle 證明，嘗試將 ETH 轉移給第一個，並產生相同類型的日誌條目。

```python
def unknown1e7df9d3(uint256 _param1, uint256 _param2, array _param3) payable:
  ...
  idx = 0
  s = 0
  while idx < _param3.length:
      if idx >= mem[96]:
          revert with 0, 50
      _55 = mem[(32 * idx) + 128]
      if s + sha3(mem[(32 * _param3.length) + 160 len mem[(32 * _param3.length) + 128]]) > mem[(32 * idx) + 128]:
          ...
          s = sha3(mem[_58 + 32 len mem[_58]])
          continue
      mem[mem[64] + 32] = s + sha3(mem[(32 * _param3.length) + 160 len mem[(32 * _param3.length) + 128]])
  ...
  if unknown2eb4a7ab != s:
      revert with 0, 'Invalid proof'
  ...
  call addr(_param1) with:
     value s wei
       gas 30000 wei
  if not return_data.size:
      if not ext_call.success:
          require ext_code.size(stor2)
          call stor2.deposit() with:
             value s wei
               gas gas_remaining wei
  ...
  log 0xdbd5389f: addr(_param1), s, bool(ext_call.success)
```

主要區別在於第一個參數，即要提領的視窗，不存在。 取而代之的是，有一個迴圈遍歷所有可以申領的視窗。

```python
  idx = 0
  s = 0
  while idx < currentWindow:
      ...
      if stor5[mem[0]]:
          if idx == -1:
              revert with 0, 17
          idx = idx + 1
          s = s
          continue
      ...
      stor5[idx][addr(_param1)] = 1
      if idx >= unknown81e580d3.length:
          revert with 0, 50
      mem[0] = 4
      if unknown81e580d3[idx] and _param2 > -1 / unknown81e580d3[idx]:
          revert with 0, 17
      if s > !(unknown81e580d3[idx] * _param2 / 100 * 10^6):
          revert with 0, 17
      if idx == -1:
          revert with 0, 17
      idx = idx + 1
      s = s + (unknown81e580d3[idx] * _param2 / 100 * 10^6)
      continue
```

所以它看起來像一個申領所有視窗的 `claim` 變體。

## 結論 {#conclusion}

到目前為止，您應該知道如何使用 opcodes 或（當它起作用時）反編譯器來理解沒有原始碼的合約。 從本文的篇幅可以明顯看出，對合約進行逆向工程並非易事，但在一個安全至關重要的系統中，能夠驗證合約是否如承諾般運作是一項重要的技能。

[在此查看我的更多作品](https://cryptodocguy.pro/)。
