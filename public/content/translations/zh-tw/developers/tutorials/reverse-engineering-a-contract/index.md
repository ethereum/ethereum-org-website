---
title: "逆向工程合約"
description: 如何在沒有原始碼的情況下理解合約
author: 奧里·波梅蘭茨
lang: zh-tw
tags: ["evm", "操作碼"]
skill: advanced
breadcrumb: 逆向工程
published: 2021-12-30
---
## 簡介 {#introduction}

_區塊鏈上沒有秘密_，發生的每一件事都是一致、可驗證且公開透明的。理想情況下，[合約應該在 Etherscan 上發布並驗證其原始碼](https://etherscan.io/address/0xb8901acb165ed027e32754e0ffe830802919727f#code)。然而，[情況並非總是如此](https://etherscan.io/address/0x2510c039cc3b061d79e564b38836da87e31b342f#code)。在本文中，你將學習如何透過查看一個沒有原始碼的合約 [`0x2510c039cc3b061d79e564b38836da87e31b342f`](https://etherscan.io/address/0x2510c039cc3b061d79e564b38836da87e31b342f) 來對合約進行逆向工程。

雖然有反編譯器，但它們並不總是能產生[可用的結果](https://etherscan.io/bytecode-decompiler?a=0x2510c039cc3b061d79e564b38836da87e31b342f)。在本文中，你將學習如何從[操作碼](https://github.com/wolflo/evm-opcodes)手動逆向工程並理解合約，以及如何解讀反編譯器的結果。

為了能夠理解本文，你應該已經具備 EVM 的基礎知識，並且至少對 EVM 組合語言有一定程度的熟悉。[你可以在這裡閱讀有關這些主題的資訊](https://medium.com/mycrypto/the-ethereum-virtual-machine-how-does-it-work-9abac2b7c9e)。

## 準備可執行程式碼 {#prepare-the-executable-code}

您可以前往 Etherscan 查看該合約，點擊 **Contract** 標籤，然後點擊 **Switch to Opcodes View** 來取得操作碼。您將看到每行一個操作碼的畫面。

![Opcode View from Etherscan](opcode-view.png)

然而，為了能夠理解跳轉 (jump)，您需要知道每個操作碼在程式碼中的位置。為此，一種方法是開啟 Google 試算表，並將操作碼貼到 C 欄。[您可以透過建立這份已準備好的試算表副本來跳過以下步驟](https://docs.google.com/spreadsheets/d/1tKmTJiNjUwHbW64wCKOSJxHjmh0bAUapt6btUYE7kDA/edit?usp=sharing)。

下一步是取得正確的程式碼位置，以便我們能夠理解跳轉。我們將把操作碼大小放在 B 欄，並將位置（十六進位）放在 A 欄。在儲存格 `B1` 中輸入此函式，然後將其複製並貼到 B 欄的其餘部分，直到程式碼結束。完成此操作後，您可以隱藏 B 欄。

```
=1+IF(REGEXMATCH(C1,"PUSH"),REGEXEXTRACT(C1,"PUSH(\d+)"),0)
```

首先，此函式會為操作碼本身加上一個位元組，然後尋找 `PUSH`。PUSH 操作碼比較特別，因為它們需要額外的位元組來存放被推入的值。如果操作碼是 `PUSH`，我們會提取位元組的數量並將其加上。

在 `A1` 中輸入第一個偏移量：零。接著，在 `A2` 中輸入此函式，並再次將其複製並貼到 A 欄的其餘部分：

```
=dec2hex(hex2dec(A1)+B1)
```

我們需要這個函式來提供十六進位值，因為在跳轉之前推入的值（`JUMP` 和 `JUMPI`）是以十六進位提供的。

## 進入點 (0x00) {#the-entry-point-0x00}

合約總是從第一個位元組開始執行。這是程式碼的初始部分：

| 偏移量 | 操作碼       | 堆疊（操作碼執行後） |
| -----: | ------------ | ------------------------ |
|      0 | PUSH1 0x80   | 0x80                     |
|      2 | PUSH1 0x40   | 0x40, 0x80               |
|      4 | MSTORE       | 空                    |
|      5 | PUSH1 0x04   | 0x04                     |
|      7 | CALLDATASIZE | CALLDATASIZE 0x04        |
|      8 | LT           | CALLDATASIZE\<4           |
|      9 | PUSH2 0x005e | 0x5E CALLDATASIZE\<4      |
|      C | JUMPI        | 空                    |

這段程式碼執行兩件事：

1. 將 0x80 作為 32 位元組的值寫入記憶體位置 0x40-0x5F（0x80 儲存在 0x5F 中，而 0x40-0x5E 全為零）。
2. 讀取呼叫資料大小。通常以太坊合約的呼叫資料遵循[應用程式二進位介面 (ABI)](https://docs.soliditylang.org/en/v0.8.10/abi-spec.html)，這至少需要四個位元組作為函式選擇器。如果呼叫資料大小小於四，則跳轉至 0x5E。

![Flowchart for this portion](flowchart-entry.png)

### 0x5E 處的處理常式（針對非 ABI 呼叫資料） {#the-handler-at-0x5e-for-non-abi-call-data}

| 偏移量 | 操作碼       |
| -----: | ------------ |
|     5E | JUMPDEST     |
|     5F | CALLDATASIZE |
|     60 | PUSH2 0x007c |
|     63 | JUMPI        |

此片段以 `JUMPDEST` 開頭。如果你跳轉到非 `JUMPDEST` 的操作碼，EVM（以太坊虛擬機）程式會拋出例外。接著它會檢查 CALLDATASIZE，如果為「真」（即不為零），則跳轉至 0x7C。我們將在下面討論這一點。

| 偏移量 | 操作碼     | 堆疊（操作碼執行後）                                                       |
| -----: | ---------- | -------------------------------------------------------------------------- |
|     64 | CALLVALUE  | 呼叫提供的 [Wei](/glossary/#wei)。在 Solidity 中稱為 `msg.value` |
|     65 | PUSH1 0x06 | 6 CALLVALUE                                                                |
|     67 | PUSH1 0x00 | 0 6 CALLVALUE                                                              |
|     69 | DUP3       | CALLVALUE 0 6 CALLVALUE                                                    |
|     6A | DUP3       | 6 CALLVALUE 0 6 CALLVALUE                                                  |
|     6B | SLOAD      | Storage[6] CALLVALUE 0 6 CALLVALUE                                         |

因此，當沒有呼叫資料時，我們會讀取 Storage[6] 的值。我們還不知道這個值是什麼，但我們可以尋找合約在沒有呼叫資料的情況下接收到的交易。僅轉帳 ETH 而沒有任何呼叫資料（因此沒有方法）的交易，在 Etherscan 中的方法為 `Transfer`。事實上，[合約收到的第一筆交易](https://etherscan.io/tx/0xeec75287a583c36bcc7ca87685ab41603494516a0f5986d18de96c8e630762e7)就是一筆轉帳。

如果我們查看該筆交易並點擊 **Click to see More**（點擊查看更多），我們會看到呼叫資料（稱為輸入資料）確實是空的（`0x`）。還請注意，該值為 1.559 ETH，這在稍後會很重要。

![The call data is empty](calldata-empty.png)

接下來，點擊 **State**（狀態）標籤並展開我們正在逆向工程的合約 (0x2510...)。你可以看到 `Storage[6]` 在交易期間確實發生了變化，如果你將 Hex（十六進位）更改為 **Number**（數字），你會看到它變成了 1,559,000,000,000,000,000，即以 wei 為單位的轉帳值（為了清楚起見，我加上了逗號），對應於下一個合約值。

![Storage[6] 的變化](storage6.png)

如果我們查看由[同一時期其他 `Transfer` 交易](https://etherscan.io/tx/0xf708d306de39c422472f43cb975d97b66fd5d6a6863db627067167cbf93d84d1#statechange)引起的狀態變化，我們會看到 `Storage[6]` 追蹤了合約價值一段時間。現在我們將其稱為 `Value*`。星號 (`*`) 提醒我們，我們還不_知道_這個變數的作用，但它不可能只是用來追蹤合約價值，因為當你可以使用 `ADDRESS BALANCE` 獲取帳戶餘額時，根本不需要使用非常昂貴的儲存空間。第一個操作碼會推入合約自身的地址。第二個操作碼會讀取堆疊頂部的地址，並將其替換為該地址的餘額。

| 偏移量 | 操作碼       | 堆疊                                        |
| -----: | ------------ | ------------------------------------------- |
|     6C | PUSH2 0x0075 | 0x75 Value\* CALLVALUE 0 6 CALLVALUE        |
|     6F | SWAP2        | CALLVALUE Value\* 0x75 0 6 CALLVALUE        |
|     70 | SWAP1        | Value\* CALLVALUE 0x75 0 6 CALLVALUE        |
|     71 | PUSH2 0x01a7 | 0x01A7 Value\* CALLVALUE 0x75 0 6 CALLVALUE |
|     74 | JUMP         |

我們將在跳轉目的地繼續追蹤這段程式碼。

| 偏移量 | 操作碼     | 堆疊                                                        |
| -----: | ---------- | ----------------------------------------------------------- |
|    1A7 | JUMPDEST   | Value\* CALLVALUE 0x75 0 6 CALLVALUE                        |
|    1A8 | PUSH1 0x00 | 0x00 Value\* CALLVALUE 0x75 0 6 CALLVALUE                   |
|    1AA | DUP3       | CALLVALUE 0x00 Value\* CALLVALUE 0x75 0 6 CALLVALUE         |
|    1AB | NOT        | 2^256-CALLVALUE-1 0x00 Value\* CALLVALUE 0x75 0 6 CALLVALUE |

`NOT` 是位元運算，因此它會反轉呼叫值中每個位元的值。

| 偏移量 | 操作碼       | 堆疊                                                                        |
| -----: | ------------ | --------------------------------------------------------------------------- |
|    1AC | DUP3         | Value\* 2^256-CALLVALUE-1 0x00 Value\* CALLVALUE 0x75 0 6 CALLVALUE         |
|    1AD | GT           | Value\*>2^256-CALLVALUE-1 0x00 Value\* CALLVALUE 0x75 0 6 CALLVALUE         |
|    1AE | ISZERO       | Value\*\<=2^256-CALLVALUE-1 0x00 Value\* CALLVALUE 0x75 0 6 CALLVALUE        |
|    1AF | PUSH2 0x01df | 0x01DF Value\*\<=2^256-CALLVALUE-1 0x00 Value\* CALLVALUE 0x75 0 6 CALLVALUE |
|    1B2 | JUMPI        |

如果 `Value*` 小於或等於 2^256-CALLVALUE-1，我們就會跳轉。這看起來像是防止溢位的邏輯。事實上，我們看到在執行了一些無意義的操作（例如，寫入記憶體即將被刪除）之後，在偏移量 0x01DE 處，如果檢測到溢位，合約就會回滾，這是正常的行為。

請注意，這種溢位極不可能發生，因為這需要呼叫值加上 `Value*` 達到接近 2^256 wei，大約是 10^59 ETH。[在撰寫本文時，ETH 的總供應量不到兩億](https://etherscan.io/stat/supply)。

| 偏移量 | 操作碼   | 堆疊                                      |
| -----: | -------- | ----------------------------------------- |
|    1DF | JUMPDEST | 0x00 Value\* CALLVALUE 0x75 0 6 CALLVALUE |
|    1E0 | POP      | Value\* CALLVALUE 0x75 0 6 CALLVALUE      |
|    1E1 | ADD      | Value\*+CALLVALUE 0x75 0 6 CALLVALUE      |
|    1E2 | SWAP1    | 0x75 Value\*+CALLVALUE 0 6 CALLVALUE      |
|    1E3 | JUMP     |

如果我們到達這裡，取得 `Value* + CALLVALUE` 並跳轉至偏移量 0x75。

| 偏移量 | 操作碼   | 堆疊                            |
| -----: | -------- | ------------------------------- |
|     75 | JUMPDEST | Value\*+CALLVALUE 0 6 CALLVALUE |
|     76 | SWAP1    | 0 Value\*+CALLVALUE 6 CALLVALUE |
|     77 | SWAP2    | 6 Value\*+CALLVALUE 0 CALLVALUE |
|     78 | SSTORE   | 0 CALLVALUE                     |

如果我們到達這裡（這需要呼叫資料為空），我們會將呼叫值加到 `Value*` 中。這與我們所說的 `Transfer` 交易的作用是一致的。

| 偏移量 | 操作碼 |
| -----: | ------ |
|     79 | POP    |
|     7A | POP    |
|     7B | STOP   |

最後，清除堆疊（這不是必須的）並發出交易成功結束的訊號。

總結來說，這是初始程式碼的流程圖。

![Entry point flowchart](flowchart-entry.png)

## 位於 0x7C 的處理常式 {#the-handler-at-0x7c}

我故意不在標題中說明這個處理常式的作用。重點不是要教你這個特定的合約是如何運作的，而是要教你如何逆向工程合約。你將會用和我一樣的方式，透過追蹤程式碼來了解它的作用。

我們可以從幾個地方來到這裡：

- 如果有 1、2 或 3 個位元組的呼叫資料（來自偏移量 0x63）
- 如果方法簽章未知（來自偏移量 0x42 和 0x5D）

| 偏移量 | 操作碼       | 堆疊                 |
| -----: | ------------ | -------------------- |
|     7C | JUMPDEST     |
|     7D | PUSH1 0x00   | 0x00                 |
|     7F | PUSH2 0x009d | 0x9D 0x00            |
|     82 | PUSH1 0x03   | 0x03 0x9D 0x00       |
|     84 | SLOAD        | Storage[3] 0x9D 0x00 |

這是另一個儲存單元，我在任何交易中都找不到它，所以很難知道它的含義。下面的程式碼會讓它變得更清楚。

| 偏移量 | 操作碼                                            | 堆疊                            |
| -----: | ------------------------------------------------- | ------------------------------- |
|     85 | PUSH20 0xffffffffffffffffffffffffffffffffffffffff | 0xff....ff Storage[3] 0x9D 0x00 |
|     9A | AND                                               | Storage[3]-as-address 0x9D 0x00 |

這些操作碼將我們從 Storage[3] 讀取的值截斷為 160 位元，即以太坊地址的長度。

| 偏移量 | 操作碼 | 堆疊                            |
| -----: | ------ | ------------------------------- |
|     9B | SWAP1  | 0x9D Storage[3]-as-address 0x00 |
|     9C | JUMP   | Storage[3]-as-address 0x00      |

這個跳躍是多餘的，因為我們即將進入下一個操作碼。這段程式碼的 gas 效率遠不如預期。

| 偏移量 | 操作碼     | 堆疊                            |
| -----: | ---------- | ------------------------------- |
|     9D | JUMPDEST   | Storage[3]-as-address 0x00      |
|     9E | SWAP1      | 0x00 Storage[3]-as-address      |
|     9F | POP        | Storage[3]-as-address           |
|     A0 | PUSH1 0x40 | 0x40 Storage[3]-as-address      |
|     A2 | MLOAD      | Mem[0x40] Storage[3]-as-address |

在程式碼的最開始，我們將 Mem[0x40] 設為 0x80。如果我們稍後尋找 0x40，會發現我們沒有改變它——所以我們可以假設它是 0x80。

| 偏移量 | 操作碼       | 堆疊                                              |
| -----: | ------------ | ------------------------------------------------- |
|     A3 | CALLDATASIZE | CALLDATASIZE 0x80 Storage[3]-as-address           |
|     A4 | PUSH1 0x00   | 0x00 CALLDATASIZE 0x80 Storage[3]-as-address      |
|     A6 | DUP3         | 0x80 0x00 CALLDATASIZE 0x80 Storage[3]-as-address |
|     A7 | CALLDATACOPY | 0x80 Storage[3]-as-address                        |

將所有呼叫資料複製到記憶體中，從 0x80 開始。

| 偏移量 | 操作碼        | 堆疊                                                                             |
| -----: | ------------- | -------------------------------------------------------------------------------- |
|     A8 | PUSH1 0x00    | 0x00 0x80 Storage[3]-as-address                                                  |
|     AA | DUP1          | 0x00 0x00 0x80 Storage[3]-as-address                                             |
|     AB | CALLDATASIZE  | CALLDATASIZE 0x00 0x00 0x80 Storage[3]-as-address                                |
|     AC | DUP4          | 0x80 CALLDATASIZE 0x00 0x00 0x80 Storage[3]-as-address                           |
|     AD | DUP6          | Storage[3]-as-address 0x80 CALLDATASIZE 0x00 0x00 0x80 Storage[3]-as-address     |
|     AE | GAS           | GAS Storage[3]-as-address 0x80 CALLDATASIZE 0x00 0x00 0x80 Storage[3]-as-address |
|     AF | DELEGATE_CALL |

現在事情變得清楚多了。這個合約可以作為一個[代理](https://blog.openzeppelin.com/proxy-patterns/)，呼叫 Storage[3] 中的地址來執行實際工作。`DELEGATE_CALL` 會呼叫一個獨立的合約，但保留在相同的儲存空間中。這意味著被委託的合約（即我們為其代理的合約）會存取相同的儲存空間。呼叫的參數為：

- _Gas_：所有剩餘的 gas
- _被呼叫的地址_：Storage[3]-as-address
- _呼叫資料_：從 0x80 開始的 CALLDATASIZE 個位元組，這也是我們放置原始呼叫資料的地方
- _回傳資料_：無 (0x00 - 0x00) 我們將透過其他方式取得回傳資料（見下文）

| 偏移量 | 操作碼         | 堆疊                                                                                          |
| -----: | -------------- | --------------------------------------------------------------------------------------------- |
|     B0 | RETURNDATASIZE | RETURNDATASIZE (((呼叫成功/失敗))) 0x80 Storage[3]-as-address                                 |
|     B1 | DUP1           | RETURNDATASIZE RETURNDATASIZE (((呼叫成功/失敗))) 0x80 Storage[3]-as-address                  |
|     B2 | PUSH1 0x00     | 0x00 RETURNDATASIZE RETURNDATASIZE (((呼叫成功/失敗))) 0x80 Storage[3]-as-address             |
|     B4 | DUP5           | 0x80 0x00 RETURNDATASIZE RETURNDATASIZE (((呼叫成功/失敗))) 0x80 Storage[3]-as-address        |
|     B5 | RETURNDATACOPY | RETURNDATASIZE (((呼叫成功/失敗))) 0x80 Storage[3]-as-address                                 |

在這裡，我們將所有回傳資料複製到從 0x80 開始的記憶體緩衝區。

| 偏移量 | 操作碼       | 堆疊                                                                                                                         |
| -----: | ------------ | ---------------------------------------------------------------------------------------------------------------------------- |
|     B6 | DUP2         | (((呼叫成功/失敗))) RETURNDATASIZE (((呼叫成功/失敗))) 0x80 Storage[3]-as-address                                            |
|     B7 | DUP1         | (((呼叫成功/失敗))) (((呼叫成功/失敗))) RETURNDATASIZE (((呼叫成功/失敗))) 0x80 Storage[3]-as-address                          |
|     B8 | ISZERO       | (((呼叫是否失敗))) (((呼叫成功/失敗))) RETURNDATASIZE (((呼叫成功/失敗))) 0x80 Storage[3]-as-address                           |
|     B9 | PUSH2 0x00c0 | 0xC0 (((呼叫是否失敗))) (((呼叫成功/失敗))) RETURNDATASIZE (((呼叫成功/失敗))) 0x80 Storage[3]-as-address                      |
|     BC | JUMPI        | (((呼叫成功/失敗))) RETURNDATASIZE (((呼叫成功/失敗))) 0x80 Storage[3]-as-address                                            |
|     BD | DUP2         | RETURNDATASIZE (((呼叫成功/失敗))) RETURNDATASIZE (((呼叫成功/失敗))) 0x80 Storage[3]-as-address                               |
|     BE | DUP5         | 0x80 RETURNDATASIZE (((呼叫成功/失敗))) RETURNDATASIZE (((呼叫成功/失敗))) 0x80 Storage[3]-as-address                          |
|     BF | RETURN       |                                                                                                                              |

因此，在呼叫之後，我們將回傳資料複製到緩衝區 0x80 - 0x80+RETURNDATASIZE，如果呼叫成功，我們接著會使用完全相同的緩衝區執行 `RETURN`。

### DELEGATECALL 失敗 {#delegatecall-failed}

如果我們來到這裡（0xC0），這意味著我們呼叫的合約已回滾。由於我們只是該合約的代理，我們希望回傳相同的資料並同樣進行回滾。

| 偏移量 | 操作碼   | 堆疊                                                                                                                |
| -----: | -------- | ------------------------------------------------------------------------------------------------------------------- |
|     C0 | JUMPDEST | (((呼叫成功/失敗))) RETURNDATASIZE (((呼叫成功/失敗))) 0x80 Storage[3]-as-address                                   |
|     C1 | DUP2     | RETURNDATASIZE (((呼叫成功/失敗))) RETURNDATASIZE (((呼叫成功/失敗))) 0x80 Storage[3]-as-address                      |
|     C2 | DUP5     | 0x80 RETURNDATASIZE (((呼叫成功/失敗))) RETURNDATASIZE (((呼叫成功/失敗))) 0x80 Storage[3]-as-address                 |
|     C3 | REVERT   |

所以我們使用稍早用於 `RETURN` 的相同緩衝區來執行 `REVERT`：0x80 - 0x80+RETURNDATASIZE

![Call to proxy flowchart](flowchart-proxy.png)

## ABI 呼叫 {#abi-calls}

如果呼叫資料的大小為四個位元組或更多，這可能是一個有效的 ABI 呼叫。

| 偏移量 | 操作碼       | 堆疊                                              |
| -----: | ------------ | ------------------------------------------------- |
|      D | PUSH1 0x00   | 0x00                                              |
|      F | CALLDATALOAD | (((呼叫資料的第一個字組 (256 位元))))             |
|     10 | PUSH1 0xe0   | 0xE0 (((呼叫資料的第一個字組 (256 位元))))        |
|     12 | SHR          | (((呼叫資料的前 32 位元 (4 個位元組))))           |

Etherscan 告訴我們 `1C` 是一個未知的操作碼，因為[它是在 Etherscan 編寫此功能之後才加入的](https://eips.ethereum.org/EIPS/eip-145)，而他們尚未更新。一份[最新的操作碼表](https://github.com/wolflo/evm-opcodes)顯示這是向右位移 (shift right)。

| 偏移量 | 操作碼           | 堆疊                                                                                                     |
| -----: | ---------------- | -------------------------------------------------------------------------------------------------------- |
|     13 | DUP1             | (((呼叫資料的前 32 位元 (4 個位元組)))) (((呼叫資料的前 32 位元 (4 個位元組))))                          |
|     14 | PUSH4 0x3cd8045e | 0x3CD8045E (((呼叫資料的前 32 位元 (4 個位元組)))) (((呼叫資料的前 32 位元 (4 個位元組))))               |
|     19 | GT               | 0x3CD8045E>呼叫資料的前-32-位元 (((呼叫資料的前 32 位元 (4 個位元組))))                                  |
|     1A | PUSH2 0x0043     | 0x43 0x3CD8045E>呼叫資料的前-32-位元 (((呼叫資料的前 32 位元 (4 個位元組))))                             |
|     1D | JUMPI            | (((呼叫資料的前 32 位元 (4 個位元組))))                                                                  |

像這樣將方法簽章比對測試分成兩半，平均可以節省一半的測試次數。緊接在後面的程式碼以及 0x43 中的程式碼都遵循相同的模式：`DUP1` 呼叫資料的前 32 位元，`PUSH4 (((method signature>`，執行 `EQ` 來檢查是否相等，如果方法簽章相符則 `JUMPI`。以下是方法簽章、它們的地址，以及（如果已知的話）[對應的方法定義](https://www.4byte.directory/)：

| 方法                                                                                   | 方法簽章 | 跳轉偏移量 |
| -------------------------------------------------------------------------------------- | -------- | ---------- |
| [splitter()](https://www.4byte.directory/signatures/?bytes4_signature=0x3cd8045e)                | 0x3cd8045e | 0x0103     |
| ???                                                                                    | 0x81e580d3 | 0x0138     |
| [currentWindow()](https://www.4byte.directory/signatures/?bytes4_signature=0xba0bafb4)           | 0xba0bafb4 | 0x0158     |
| ???                                                                                    | 0x1f135823 | 0x00C4     |
| [merkleRoot()](https://www.4byte.directory/signatures/?bytes4_signature=0x2eb4a7ab)              | 0x2eb4a7ab | 0x00ED     |

如果找不到相符項目，程式碼會跳轉到 [0x7C 處的代理處理常式](#the-handler-at-0x7c)，期望我們所代理的合約中有相符的項目。

![ABI calls flowchart](flowchart-abi.png)

## splitter() {#splitter}

| 偏移量 | 操作碼       | 堆疊                          |
| -----: | ------------ | ----------------------------- |
|    103 | JUMPDEST     |
|    104 | CALLVALUE    | CALLVALUE                     |
|    105 | DUP1         | CALLVALUE CALLVALUE           |
|    106 | ISZERO       | CALLVALUE==0 CALLVALUE        |
|    107 | PUSH2 0x010f | 0x010F CALLVALUE==0 CALLVALUE |
|    10A | JUMPI        | CALLVALUE                     |
|    10B | PUSH1 0x00   | 0x00 CALLVALUE                |
|    10D | DUP1         | 0x00 0x00 CALLVALUE           |
|    10E | REVERT       |

這個函式做的第一件事是檢查呼叫是否沒有發送任何 ETH。這個函式不是 [`payable`](https://solidity-by-example.org/payable/)。如果有人發送 ETH 給我們，那一定是個錯誤，我們希望 `REVERT` 以避免將這些 ETH 留在他們無法取回的地方。

| 偏移量 | 操作碼                                            | 堆疊                                                                        |
| -----: | ------------------------------------------------- | --------------------------------------------------------------------------- |
|    10F | JUMPDEST                                          |
|    110 | POP                                               |
|    111 | PUSH1 0x03                                        | 0x03                                                                        |
|    113 | SLOAD                                             | (((Storage[3] 也就是我們作為代理的合約)))                                   |
|    114 | PUSH1 0x40                                        | 0x40 (((Storage[3] 也就是我們作為代理的合約)))                              |
|    116 | MLOAD                                             | 0x80 (((Storage[3] 也就是我們作為代理的合約)))                              |
|    117 | PUSH20 0xffffffffffffffffffffffffffffffffffffffff | 0xFF...FF 0x80 (((Storage[3] 也就是我們作為代理的合約)))                    |
|    12C | SWAP1                                             | 0x80 0xFF...FF (((Storage[3] 也就是我們作為代理的合約)))                    |
|    12D | SWAP2                                             | (((Storage[3] 也就是我們作為代理的合約))) 0xFF...FF 0x80                    |
|    12E | AND                                               | ProxyAddr 0x80                                                              |
|    12F | DUP2                                              | 0x80 ProxyAddr 0x80                                                         |
|    130 | MSTORE                                            | 0x80                                                                        |

現在 0x80 包含了代理地址

| 偏移量 | 操作碼       | 堆疊      |
| -----: | ------------ | --------- |
|    131 | PUSH1 0x20   | 0x20 0x80 |
|    133 | ADD          | 0xA0      |
|    134 | PUSH2 0x00e4 | 0xE4 0xA0 |
|    137 | JUMP         | 0xA0      |

### E4 程式碼 {#the-e4-code}

這是我們第一次看到這些行，但它們與其他方法共用（見下文）。因此，我們將堆疊中的值稱為 X，並記住，在 `splitter()` 中，這個 X 的值是 0xA0。

| 偏移量 | 操作碼     | 堆疊        |
| -----: | ---------- | ----------- |
|     E4 | JUMPDEST   | X           |
|     E5 | PUSH1 0x40 | 0x40 X      |
|     E7 | MLOAD      | 0x80 X      |
|     E8 | DUP1       | 0x80 0x80 X |
|     E9 | SWAP2      | X 0x80 0x80 |
|     EA | SUB        | X-0x80 0x80 |
|     EB | SWAP1      | 0x80 X-0x80 |
|     EC | RETURN     |

因此，這段程式碼在堆疊中接收一個記憶體指標 (X)，並使合約以 0x80 - X 的緩衝區進行 `RETURN`。

在 `splitter()` 的情況下，這會回傳我們作為代理的地址。`RETURN` 會回傳 0x80-0x9F 中的緩衝區，這正是我們寫入此資料的地方（上方偏移量 0x130）。

## currentWindow() {#currentwindow}

偏移量 0x158-0x163 中的程式碼與我們在 `splitter()` 的 0x103-0x10E 中看到的完全相同（除了 `JUMPI` 目的地之外），因此我們知道 `currentWindow()` 也不是 `payable`。

| 偏移量 | 操作碼       | 堆疊                 |
| -----: | ------------ | -------------------- |
|    164 | JUMPDEST     |
|    165 | POP          |
|    166 | PUSH2 0x00da | 0xDA                 |
|    169 | PUSH1 0x01   | 0x01 0xDA            |
|    16B | SLOAD        | Storage[1] 0xDA      |
|    16C | DUP2         | 0xDA Storage[1] 0xDA |
|    16D | JUMP         | Storage[1] 0xDA      |

### DA 程式碼 {#the-da-code}

這段程式碼也與其他方法共用。因此我們將堆疊中的值稱為 Y，只要記住，在 `currentWindow()` 中，這個 Y 的值是 Storage[1]。

| 偏移量 | 操作碼     | 堆疊             |
| -----: | ---------- | ---------------- |
|     DA | JUMPDEST   | Y 0xDA           |
|     DB | PUSH1 0x40 | 0x40 Y 0xDA      |
|     DD | MLOAD      | 0x80 Y 0xDA      |
|     DE | SWAP1      | Y 0x80 0xDA      |
|     DF | DUP2       | 0x80 Y 0x80 0xDA |
|     E0 | MSTORE     | 0x80 0xDA        |

將 Y 寫入 0x80-0x9F。

| 偏移量 | 操作碼     | 堆疊           |
| -----: | ---------- | -------------- |
|     E1 | PUSH1 0x20 | 0x20 0x80 0xDA |
|     E3 | ADD        | 0xA0 0xDA      |

其餘部分在[上方](#the-e4-code)已經解釋過了。因此，跳轉到 0xDA 會將堆疊頂部 (Y) 寫入 0x80-0x9F，並回傳該值。在 `currentWindow()` 的情況下，它會回傳 Storage[1]。

## merkleRoot() {#merkleroot}

偏移量 0xED-0xF8 中的程式碼與我們在 `splitter()` 中的 0x103-0x10E 看到的完全相同（除了 `JUMPI` 目的地之外），因此我們知道 `merkleRoot()` 也不是 `payable`。

| 偏移量 | 操作碼       | 堆疊                 |
| -----: | ------------ | -------------------- |
|     F9 | JUMPDEST     |
|     FA | POP          |
|     FB | PUSH2 0x00da | 0xDA                 |
|     FE | PUSH1 0x00   | 0x00 0xDA            |
|    100 | SLOAD        | Storage[0] 0xDA      |
|    101 | DUP2         | 0xDA Storage[0] 0xDA |
|    102 | JUMP         | Storage[0] 0xDA      |

跳轉之後發生的事情[我們已經弄清楚了](#the-da-code)。因此 `merkleRoot()` 會回傳 Storage[0]。

## 0x81e580d3 {#0x81e580d3}

偏移量 0x138-0x143 中的程式碼與我們在 `splitter()` 的 0x103-0x10E 中看到的完全相同（除了 `JUMPI` 目的地之外），所以我們知道這個函式也不是 `payable`。

| 偏移量 | 操作碼       | 堆疊                                                         |
| -----: | ------------ | ------------------------------------------------------------ |
|    144 | JUMPDEST     |
|    145 | POP          |
|    146 | PUSH2 0x00da | 0xDA                                                         |
|    149 | PUSH2 0x0153 | 0x0153 0xDA                                                  |
|    14C | CALLDATASIZE | CALLDATASIZE 0x0153 0xDA                                     |
|    14D | PUSH1 0x04   | 0x04 CALLDATASIZE 0x0153 0xDA                                |
|    14F | PUSH2 0x018f | 0x018F 0x04 CALLDATASIZE 0x0153 0xDA                         |
|    152 | JUMP         | 0x04 CALLDATASIZE 0x0153 0xDA                                |
|    18F | JUMPDEST     | 0x04 CALLDATASIZE 0x0153 0xDA                                |
|    190 | PUSH1 0x00   | 0x00 0x04 CALLDATASIZE 0x0153 0xDA                           |
|    192 | PUSH1 0x20   | 0x20 0x00 0x04 CALLDATASIZE 0x0153 0xDA                      |
|    194 | DUP3         | 0x04 0x20 0x00 0x04 CALLDATASIZE 0x0153 0xDA                 |
|    195 | DUP5         | CALLDATASIZE 0x04 0x20 0x00 0x04 CALLDATASIZE 0x0153 0xDA    |
|    196 | SUB          | CALLDATASIZE-4 0x20 0x00 0x04 CALLDATASIZE 0x0153 0xDA       |
|    197 | SLT          | CALLDATASIZE-4\<32 0x00 0x04 CALLDATASIZE 0x0153 0xDA         |
|    198 | ISZERO       | CALLDATASIZE-4>=32 0x00 0x04 CALLDATASIZE 0x0153 0xDA        |
|    199 | PUSH2 0x01a0 | 0x01A0 CALLDATASIZE-4>=32 0x00 0x04 CALLDATASIZE 0x0153 0xDA |
|    19C | JUMPI        | 0x00 0x04 CALLDATASIZE 0x0153 0xDA                           |

看起來這個函式接受至少 32 位元組（一個字組）的呼叫資料。

| 偏移量 | 操作碼 | 堆疊                                         |
| -----: | ------ | -------------------------------------------- |
|    19D | DUP1   | 0x00 0x00 0x04 CALLDATASIZE 0x0153 0xDA      |
|    19E | DUP2   | 0x00 0x00 0x00 0x04 CALLDATASIZE 0x0153 0xDA |
|    19F | REVERT |

如果它沒有獲取到呼叫資料，交易將被回滾且沒有任何回傳資料。

讓我們看看如果函式_確實_獲取了它需要的呼叫資料會發生什麼事。

| 偏移量 | 操作碼       | 堆疊                                     |
| -----: | ------------ | ---------------------------------------- |
|    1A0 | JUMPDEST     | 0x00 0x04 CALLDATASIZE 0x0153 0xDA       |
|    1A1 | POP          | 0x04 CALLDATASIZE 0x0153 0xDA            |
|    1A2 | CALLDATALOAD | calldataload(4) CALLDATASIZE 0x0153 0xDA |

`calldataload(4)` 是方法簽章_之後_呼叫資料的第一個字組

| 偏移量 | 操作碼       | 堆疊                                                                         |
| -----: | ------------ | ---------------------------------------------------------------------------- |
|    1A3 | SWAP2        | 0x0153 CALLDATASIZE calldataload(4) 0xDA                                     |
|    1A4 | SWAP1        | CALLDATASIZE 0x0153 calldataload(4) 0xDA                                     |
|    1A5 | POP          | 0x0153 calldataload(4) 0xDA                                                  |
|    1A6 | JUMP         | calldataload(4) 0xDA                                                         |
|    153 | JUMPDEST     | calldataload(4) 0xDA                                                         |
|    154 | PUSH2 0x016e | 0x016E calldataload(4) 0xDA                                                  |
|    157 | JUMP         | calldataload(4) 0xDA                                                         |
|    16E | JUMPDEST     | calldataload(4) 0xDA                                                         |
|    16F | PUSH1 0x04   | 0x04 calldataload(4) 0xDA                                                    |
|    171 | DUP2         | calldataload(4) 0x04 calldataload(4) 0xDA                                    |
|    172 | DUP2         | 0x04 calldataload(4) 0x04 calldataload(4) 0xDA                               |
|    173 | SLOAD        | Storage[4] calldataload(4) 0x04 calldataload(4) 0xDA                         |
|    174 | DUP2         | calldataload(4) Storage[4] calldataload(4) 0x04 calldataload(4) 0xDA         |
|    175 | LT           | calldataload(4)\<Storage[4] calldataload(4) 0x04 calldataload(4) 0xDA         |
|    176 | PUSH2 0x017e | 0x017EC calldataload(4)\<Storage[4] calldataload(4) 0x04 calldataload(4) 0xDA |
|    179 | JUMPI        | calldataload(4) 0x04 calldataload(4) 0xDA                                    |

如果第一個字組不小於 Storage[4]，則函式失敗。它會回滾且沒有任何回傳值：

| 偏移量 | 操作碼     | 堆疊          |
| -----: | ---------- | ------------- |
|    17A | PUSH1 0x00 | 0x00 ...      |
|    17C | DUP1       | 0x00 0x00 ... |
|    17D | REVERT     |

如果 calldataload(4) 小於 Storage[4]，我們會得到這段程式碼：

| 偏移量 | 操作碼     | 堆疊                                                |
| -----: | ---------- | --------------------------------------------------- |
|    17E | JUMPDEST   | calldataload(4) 0x04 calldataload(4) 0xDA           |
|    17F | PUSH1 0x00 | 0x00 calldataload(4) 0x04 calldataload(4) 0xDA      |
|    181 | SWAP2      | 0x04 calldataload(4) 0x00 calldataload(4) 0xDA      |
|    182 | DUP3       | 0x00 0x04 calldataload(4) 0x00 calldataload(4) 0xDA |
|    183 | MSTORE     | calldataload(4) 0x00 calldataload(4) 0xDA           |

現在記憶體位置 0x00-0x1F 包含資料 0x04（0x00-0x1E 全為零，0x1F 為 4）

| 偏移量 | 操作碼     | 堆疊                                                                    |
| -----: | ---------- | ----------------------------------------------------------------------- |
|    184 | PUSH1 0x20 | 0x20 calldataload(4) 0x00 calldataload(4) 0xDA                          |
|    186 | SWAP1      | calldataload(4) 0x20 0x00 calldataload(4) 0xDA                          |
|    187 | SWAP2      | 0x00 0x20 calldataload(4) calldataload(4) 0xDA                          |
|    188 | SHA3       | (((SHA3 of 0x00-0x1F))) calldataload(4) calldataload(4) 0xDA            |
|    189 | ADD        | (((SHA3 of 0x00-0x1F)))+calldataload(4) calldataload(4) 0xDA            |
|    18A | SLOAD      | Storage[(((SHA3 of 0x00-0x1F))) + calldataload(4)] calldataload(4) 0xDA |

因此，在儲存空間中有一個查詢表，它從 0x000...0004 的 SHA3 開始，並且為每個合法的呼叫資料值（小於 Storage[4] 的值）都有一個條目。

| 偏移量 | 操作碼 | 堆疊                                                                    |
| -----: | ------ | ----------------------------------------------------------------------- |
|    18B | SWAP1  | calldataload(4) Storage[(((SHA3 of 0x00-0x1F))) + calldataload(4)] 0xDA |
|    18C | POP    | Storage[(((SHA3 of 0x00-0x1F))) + calldataload(4)] 0xDA                 |
|    18D | DUP2   | 0xDA Storage[(((SHA3 of 0x00-0x1F))) + calldataload(4)] 0xDA            |
|    18E | JUMP   | Storage[(((SHA3 of 0x00-0x1F))) + calldataload(4)] 0xDA                 |

我們已經知道[偏移量 0xDA 處的程式碼](#the-da-code)的作用，它會將堆疊頂部的值回傳給呼叫者。所以這個函式會將查詢表中的值回傳給呼叫者。

## 0x1f135823 {#0x1f135823}

偏移量 0xC4-0xCF 中的程式碼與我們在 `splitter()` 的 0x103-0x10E 中看到的完全相同（除了 `JUMPI` 目的地之外），因此我們知道此函式也不是 `payable`。

| 偏移量 | 操作碼       | 堆疊             |
| -----: | ------------ | ----------------- |
|     D0 | JUMPDEST     |
|     D1 | POP          |
|     D2 | PUSH2 0x00da | 0xDA              |
|     D5 | PUSH1 0x06   | 0x06 0xDA         |
|     D7 | SLOAD        | Value\* 0xDA      |
|     D8 | DUP2         | 0xDA Value\* 0xDA |
|     D9 | JUMP         | Value\* 0xDA      |

我們已經知道 [偏移量 0xDA 處的程式碼](#the-da-code) 的作用，它會將堆疊頂端的值回傳給呼叫者。因此，此函式會回傳 `Value*`。

### 方法總結 {#method-summary}

到目前為止，你覺得自己了解這個合約了嗎？我不覺得。目前我們有以下這些方法：

| 方法                            | 意義                                                                              |
| --------------------------------- | ------------------------------------------------------------------------------------ |
| Transfer                          | 接受呼叫提供的值，並將 `Value*` 增加該數量           |
| [splitter()](#splitter)           | 回傳 Storage[3]，即代理地址                                                 |
| [currentWindow()](#currentwindow) | 回傳 Storage[1]                                                                    |
| [merkleRoot()](#merkleroot)        | 回傳 Storage[0]                                                                    |
| [0x81e580d3](#0x81e580d3)         | 從查詢表中回傳值，前提是參數小於 Storage[4] |
| [0x1f135823](#0x1f135823)         | 回傳 Storage[6]，也就是 Value\*                                                    |

但我們知道任何其他功能都是由 Storage[3] 中的合約提供的。也許如果我們知道那個合約是什麼，就會給我們一些線索。幸運的是，這是區塊鏈，一切都是公開透明的（至少理論上是如此）。我們沒有看到任何設定 Storage[3] 的方法，所以它一定是由建構函式設定的。

## 建構函式 {#the-constructor}

當我們[查看合約](https://etherscan.io/address/0x2510c039cc3b061d79e564b38836da87e31b342f)時，我們也可以看到建立該合約的交易。

![Click the create transaction](create-tx.png)

如果我們點擊該交易，然後點擊 **狀態** 分頁，我們可以看到參數的初始值。具體來說，我們可以看到 Storage[3] 包含 [0x2f81e57ff4f4d83b40a9f719fd892d8e806e0761](https://etherscan.io/address/0x2f81e57ff4f4d83b40a9f719fd892d8e806e0761)。該合約必定包含缺失的功能。我們可以使用與調查目前合約時相同的工具來理解它。

## 代理合約 {#the-proxy-contract}

使用與上述原始合約相同的技術，我們可以看到如果發生以下情況，合約將會回滾：

- 呼叫中附帶了任何 ETH (0x05-0x0F)
- 呼叫資料大小小於 4 (0x10-0x19 和 0xBE-0xC2)

並且它支援的方法有：

| 方法                                                                                                          | 方法簽章             | 跳轉偏移量 |
| --------------------------------------------------------------------------------------------------------------- | ---------------------------- | ------------------- |
| [scaleAmountByPercentage(uint256,uint256)](https://www.4byte.directory/signatures/?bytes4_signature=0x8ffb5c97)          | 0x8ffb5c97                   | 0x0135              |
| [isClaimed(uint256,address)](https://www.4byte.directory/signatures/?bytes4_signature=0xd2ef0795)               | 0xd2ef0795                   | 0x0151              |
| [claim(uint256,address,uint256,bytes32[])](https://www.4byte.directory/signatures/?bytes4_signature=0x2e7ba6ef) | 0x2e7ba6ef                   | 0x00F4              |
| [incrementWindow()](https://www.4byte.directory/signatures/?bytes4_signature=0x338b1d31)                        | 0x338b1d31                   | 0x0110              |
| ???                                                                                                             | 0x3f26479e                   | 0x0118              |
| ???                                                                                                             | 0x1e7df9d3                   | 0x00C3              |
| [currentWindow()](https://www.4byte.directory/signatures/?bytes4_signature=0xba0bafb4)                          | [0xba0bafb4](#currentwindow) | 0x0148              |
| [merkleRoot()](https://www.4byte.directory/signatures/?bytes4_signature=0x2eb4a7ab)                             | [0x2eb4a7ab](#merkleroot)    | 0x0107              |
| ???                                                                                                             | [0x81e580d3](#0x81e580d3)    | 0x0122              |
| ???                                                                                                             | [0x1f135823](#0x1f135823)    | 0x00D8              |

我們可以忽略最底部的四個方法，因為我們永遠不會執行到它們。它們的簽章表明我們的原始合約會自行處理它們（您可以點擊簽章查看上述詳細資訊），因此它們必定是[被覆寫的方法](https://medium.com/upstate-interactive/solidity-override-vs-virtual-functions-c0a5dfb83aaf)。

剩下的方法中，一個是 `claim(<params>)`，另一個是 `isClaimed(<params>)`，所以這看起來像是一個空投合約。與其逐個操作碼檢查其餘部分，我們不如[嘗試使用反編譯器](https://etherscan.io/bytecode-decompiler?a=0x2f81e57ff4f4d83b40a9f719fd892d8e806e0761)，它能為此合約中的三個函式產生可用的結果。對其他函式進行逆向工程則留給讀者作為練習。

### scaleAmountByPercentage {#scaleamountbypercentage}

這是反編譯器為此函式提供的內容：

```python
def unknown8ffb5c97(uint256 _param1, uint256 _param2) payable:
  require calldata.size - 4 >=′ 64
  if _param1 and _param2 > -1 / _param1:
      revert with 0, 17
  return (_param1 * _param2 / 100 * 10^6)
```

第一個 `require` 測試呼叫資料除了函式簽章的 4 個位元組之外，是否至少還有 64 個位元組，這足以容納兩個參數。如果沒有，那麼顯然有問題。

`if` 敘述似乎在檢查 `_param1` 不為零，且 `_param1 * _param2` 不為負數。這可能是為了防止發生數值繞回 (wrap around) 的情況。

最後，該函式回傳一個按比例縮放的值。

### claim {#claim}

反編譯器產生的程式碼很複雜，而且並非所有內容都與我們相關。我將跳過其中一部分，專注於我認為能提供有用資訊的行數。

```python
def unknown2e7ba6ef(uint256 _param1, uint256 _param2, uint256 _param3, array _param4) payable:
  ...
  require _param2 == addr(_param2)
  ...
  if currentWindow <= _param1:
      revert with 0, 'cannot claim for a future window'
```

我們在這裡看到兩件重要的事情：

- `_param2` 雖然被宣告為 `uint256`，但實際上是一個地址
- `_param1` 是正在被申領的視窗 (window)，它必須是 `currentWindow` 或更早的視窗。

```python
  ...
  if stor5[_claimWindow][addr(_claimFor)]:
      revert with 0, 'Account already claimed the given window'
```

所以現在我們知道 Storage[5] 是一個包含視窗和地址的陣列，以及該地址是否已申領了該視窗的獎勵。

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

我們知道 `unknown2eb4a7ab` 實際上是函式 `merkleRoot()`，所以這段程式碼看起來像是在驗證[默克爾證明](https://medium.com/crypto-0-nite/merkle-proofs-explained-6dd429623dc5)。這意味著 `_param4` 是一個默克爾證明。

```python
  call addr(_param2) with:
     value unknown81e580d3[_param1] * _param3 / 100 * 10^6 wei
       gas 30000 wei
```

這就是合約將自己的 ETH 轉帳到另一個地址（合約或外部擁有）的方式。它會使用要轉帳的金額作為值來呼叫它。所以這看起來像是 ETH 的空投。

```python
  if not return_data.size:
      if not ext_call.success:
          require ext_code.size(stor2)
          call stor2.deposit() with:
             value unknown81e580d3[_param1] * _param3 / 100 * 10^6 wei
```

底部的兩行告訴我們 Storage[2] 也是我們呼叫的一個合約。如果我們[查看建構函式交易](https://etherscan.io/tx/0xa1ea0549fb349eb7d3aff90e1d6ce7469fdfdcd59a2fd9b8d1f5e420c0d05b58#statechange)，我們會看到這個合約是 [0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2](https://etherscan.io/address/0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2)，這是一個包裝以太幣 (wETH) 合約，[其原始碼已上傳至 Etherscan](https://etherscan.io/address/0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2#code)。

所以看起來合約試圖將 ETH 發送到 `_param2`。如果成功，那很好。如果不成功，它會嘗試發送 [WETH](https://weth.tkn.eth.limo/)。如果 `_param2` 是一個外部擁有帳戶 (EOA)，那麼它總是能接收 ETH，但合約可以拒絕接收 ETH。然而，WETH 是 ERC-20，合約無法拒絕接受它。

```python
  ...
  log 0xdbd5389f: addr(_param2), unknown81e580d3[_param1] * _param3 / 100 * 10^6, bool(ext_call.success)
```

在函式的最後，我們看到產生了一個日誌條目。[查看產生的日誌條目](https://etherscan.io/address/0x2510c039cc3b061d79e564b38836da87e31b342f#events)並篩選以 `0xdbd5...` 開頭的主題。如果我們[點擊其中一筆產生此類條目的交易](https://etherscan.io/tx/0xe7d3b7e00f645af17dfbbd010478ef4af235896c65b6548def1fe95b3b7d2274)，我們會發現它確實看起來像是一次申領——該帳戶向我們正在逆向工程的合約發送了一則訊息，並作為回報獲得了 ETH。

![A claim transaction](claim-tx.png)

### 1e7df9d3 {#1e7df9d3}

這個函式與上面的 [`claim`](#claim) 非常相似。它同樣會檢查默克爾證明，嘗試將 ETH 轉帳給第一個地址，並產生相同類型的日誌條目。

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

主要的區別在於，第一個參數（要提取的視窗）不存在。取而代之的是一個遍歷所有可申領視窗的迴圈。

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

所以它看起來像是 `claim` 的一個變體，用於申領所有的視窗。

## 結論 {#conclusion}

到目前為止，您應該已經知道如何透過使用操作碼或（在可行的情況下）反編譯器，來理解那些無法取得原始碼的合約。從本文的長度可以明顯看出，逆向工程一份合約並非易事，但在一個安全性至關重要的系統中，能夠驗證合約是否如預期般運作是一項重要的技能。

[點擊此處查看我的更多作品](https://cryptodocguy.pro/)。