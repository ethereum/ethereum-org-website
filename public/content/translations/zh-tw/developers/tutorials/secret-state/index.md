---
title: 使用零知識證明建立秘密狀態
description: 鏈上遊戲有所限制，因為它們無法保存任何隱藏資訊。 閱讀本教學課程後，讀者將能夠結合零知識證明和伺服器元件，建立具有秘密狀態、鏈下元件的可驗證遊戲。 我們將透過建立踩地雷遊戲來示範此技術。
author: 作者：Ori Pomerantz
tags: [ "伺服器", "鏈下", "中心化", "零知識", "zokrates", "mud" ]
skill: advanced
lang: zh-tw
published: 2025-03-15
---

_在區塊鏈上沒有秘密_。 發佈在區塊鏈上的所有內容，每個人都可以公開讀取。 這是必要的，因為區塊鏈的基礎是任何人都能夠驗證它。 然而，遊戲通常仰賴秘密狀態。 例如，如果你能直接到區塊鏈瀏覽器上查看地圖，[踩地雷](https://en.wikipedia.org/wiki/Minesweeper_\(video_game\))遊戲就完全沒有意義了。

最簡單的解決方案是使用[伺服器元件](/developers/tutorials/server-components/)來保存秘密狀態。 然而，我們使用區塊鏈的原因是為了防止遊戲開發者作弊。 我們需要確保伺服器元件的誠實性。 伺服器可以提供狀態的哈希，並使用[零知識證明](/zero-knowledge-proofs/#why-zero-knowledge-proofs-are-important)來證明用於計算移動結果的狀態是正確的。

閱讀本文後，你將了解如何建立這類保存秘密狀態的伺服器、一個用於顯示狀態的用戶端，以及一個用於兩者之間通訊的鏈上元件。 我們將使用的主要工具有：

| 工具                                            | 目的             |                                 已在版本上驗證 |
| --------------------------------------------- | -------------- | --------------------------------------: |
| [Zokrates](https://zokrates.github.io/)       | 零知識證明及其驗證      |   1.1.9 |
| [Typescript](https://www.typescriptlang.org/) | 伺服器和用戶端的程式設計語言 |   5.4.2 |
| [Node](https://nodejs.org/en)                 | 執行伺服器          | 20.18.2 |
| [Viem](https://viem.sh/)                      | 與區塊鏈通訊         |  2.9.20 |
| [MUD](https://mud.dev/)                       | 鏈上資料管理         |  2.0.12 |
| [React](https://react.dev/)                   | 用戶端使用者介面       |  18.2.0 |
| [Vite](https://vitejs.dev/)                   | 提供用戶端程式碼       |   4.2.1 |

## 踩地雷範例 {#minesweeper}

[踩地雷](https://en.wikipedia.org/wiki/Minesweeper_\(video_game\)) 是一款包含秘密地雷區地圖的遊戲。 玩家選擇在特定位置挖掘。 如果該位置有地雷，遊戲就結束了。 否則，玩家會得到該位置周圍八個方格中的地雷數量。

此應用程式使用 [MUD](https://mud.dev/) 編寫，這是一個讓我們可以使用[鍵值資料庫](https://aws.amazon.com/nosql/key-value/)將資料儲存在鏈上，並自動將該資料與鏈下元件同步的框架。 除了同步之外，MUD 還能輕鬆提供存取控制，並讓其他使用者能[無需許可地擴充](https://mud.dev/guides/extending-a-world)我們的應用程式。

### 執行踩地雷範例 {#running-minesweeper-example}

若要執行踩地雷範例：

1. 確保您已[安裝先決條件](https://mud.dev/quickstart#prerequisites)：[Node](https://mud.dev/quickstart#prerequisites)、[Foundry](https://book.getfoundry.sh/getting-started/installation)、[`git`](https://git-scm.com/downloads)、[`pnpm`](https://git-scm.com/downloads) 和 [`mprocs`](https://github.com/pvolok/mprocs)。

2. 複製儲存庫。

   ```sh copy
   git clone https://github.com/qbzzt/20240901-secret-state.git
   ```

3. 安裝套件。

   ```sh copy
   cd 20240901-secret-state/
   pnpm install
   npm install -g mprocs
   ```

   如果 Foundry 是作為 `pnpm install` 的一部分安裝的，您需要重新啟動命令列 shell。

4. 編譯合約

    ```sh copy
    cd packages/contracts
    forge build
    cd ../..
    ```

5. 啟動程式（包括 [anvil](https://book.getfoundry.sh/anvil/) 區塊鏈）並等待。

   ```sh copy
   mprocs
   ```

   請注意，啟動需要很長時間。 若要查看進度，請先使用向下箭頭捲動至 _contracts_ 索引標籤，以查看正在部署的 MUD 合約。 當您收到訊息 _Waiting for file changes…_ 時，表示合約已部署，後續進度將在 _server_ 索引標籤中顯示。 在那裡，您要等到收到訊息 _Verifier address: 0x...._。

   如果此步驟成功，您會看到 `mprocs` 螢幕，左側是不同的程序，右側是目前所選程序的主控台輸出。

   ![mprocs 螢幕](./mprocs.png)

   如果 `mprocs` 出現問題，您可以手動執行這四個程序，每個程序都在各自的命令列視窗中執行：

   - **Anvil**

     ```sh
     cd packages/contracts
     anvil --base-fee 0 --block-time 2
     ```

   - **合約**

     ```sh
     cd packages/contracts
     pnpm mud dev-contracts --rpc http://127.0.0.1:8545
     ```

   - **伺服器**

     ```sh
     cd packages/server
     pnpm start
     ```

   - **用戶端**

     ```sh
     cd packages/client
     pnpm run dev
     ```

6. 現在您可以瀏覽至[用戶端](http://localhost:3000)，點擊 **New Game**，然後開始遊戲。

### 資料表 {#tables}

我們需要在鏈上建立[數個資料表](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/mud.config.ts)。

- `Configuration`：此資料表是單例，它沒有鍵且只有單一記錄。 它用於保存遊戲設定資訊：
  - `height`：地雷區的高度
  - `width`：地雷區的寬度
  - `numberOfBombs`：每個地雷區中的炸彈數量

- `VerifierAddress`：此資料表也是單例。 它用於保存設定的一部分，即驗證者合約 (`verifier`) 的地址。 我們可以將此資訊放在 `Configuration` 資料表中，但它是由另一個元件（伺服器）設定的，因此將其放在單獨的資料表中更容易。

- `PlayerGame`：鍵是玩家的地址。 資料是：

  - `gameId`：一個 32 位元組的值，是玩家正在遊玩的地圖的哈希（遊戲識別碼）。
  - `win`：一個布林值，表示玩家是否贏得了遊戲。
  - `lose`：一個布林值，表示玩家是否輸掉了遊戲。
  - `digNumber`：遊戲中成功挖掘的次數。

- `GamePlayer`：此資料表保存從 `gameId` 到玩家地址的反向對應。

- `Map`：鍵是由三個值組成的元組：

  - `gameId`：一個 32 位元組的值，是玩家正在遊玩的地圖的哈希（遊戲識別碼）。
  - `x` 座標
  - `y` 座標

  值是一個單一數字。 如果偵測到炸彈，則為 255。 否則，它是該位置周圍炸彈數量加一。 我們不能只使用炸彈的數量，因為在 EVM 中所有儲存空間和 MUD 中所有行值預設為零。 我們需要區分「玩家還沒有在這裡挖掘」和「玩家在這裡挖掘了，但發現周圍沒有炸彈」。

此外，用戶端和伺服器之間的通訊是透過鏈上元件進行的。 這也是使用資料表實作的。

- `PendingGame`：未處理的新遊戲開始請求。
- `PendingDig`：在特定遊戲的特定位置挖掘的未處理請求。 這是一個[鏈下資料表](https://mud.dev/store/tables#types-of-tables)，表示它不會寫入 EVM 儲存空間，只能透過事件在鏈下讀取。

### 執行與資料流 {#execution-data-flows}

這些流程協調用戶端、鏈上元件和伺服器之間的執行。

#### 初始化 {#initialization-flow}

當您執行 `mprocs` 時，會發生以下步驟：

1. [`mprocs`](https://github.com/pvolok/mprocs) 會執行四個元件：

   - [Anvil](https://book.getfoundry.sh/anvil/)，執行本機區塊鏈
   - [合約](https://github.com/qbzzt/20240901-secret-state/tree/main/packages/contracts)，編譯（如果需要）並部署 MUD 的合約
   - [用戶端](https://github.com/qbzzt/20240901-secret-state/tree/main/packages/client)，執行 [Vite](https://vitejs.dev/) 以向 Web 瀏覽器提供 UI 和用戶端程式碼。
   - [伺服器](https://github.com/qbzzt/20240901-secret-state/tree/main/packages/server)，執行伺服器動作

2. `contracts` 套件會部署 MUD 合約，然後執行 [`PostDeploy.s.sol` 指令碼](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/script/PostDeploy.s.sol)。 此指令碼會設定組態。 來自 github 的程式碼指定了[一個 10x5 的地雷區，其中有八個地雷](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/script/PostDeploy.s.sol#L23)。

3. [伺服器](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts) 首先[設定 MUD](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L6)。 除其他事項外，這會啟動資料同步，因此相關資料表的副本會存在於伺服器的記憶體中。

4. 伺服器訂閱一個函式，以便[在 `Configuration` 資料表變更時](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L23)執行。 `PostDeploy.s.sol` 執行並修改資料表後，會呼叫[此函式](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L24-L168)。

5. 當伺服器初始化函式取得設定後，[它會呼叫 `zkFunctions`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L34-L35) 來初始化[伺服器的零知識部分](#using-zokrates-from-typescript)。 在我們取得設定之前，這無法發生，因為零知識函式必須將地雷區的寬度和高度作為常數。

6. 伺服器的零知識部分初始化後，下一步是[將零知識驗證合約部署到區塊鏈](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L42-L53)並在 MUD 中設定驗證對象地址。

7. 最後，我們訂閱更新，這樣我們就可以看到玩家何時請求[開始新遊戲](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L55-L71)或[在現有遊戲中挖掘](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L73-L108)。

#### 新遊戲 {#new-game-flow}

這是玩家請求新遊戲時發生的情況。

1. 如果此玩家沒有正在進行的遊戲，或者有遊戲但 gameId 為零，用戶端會顯示[新遊戲按鈕](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/client/src/App.tsx#L175)。 當使用者按下此按鈕時，[React 會執行 `newGame` 函式](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/client/src/App.tsx#L96)。

2. [`newGame`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/client/src/mud/createSystemCalls.ts#L43-L46) 是一個 `System` 呼叫。 在 MUD 中，所有呼叫都透過 `World` 合約路由，在大多數情況下，您會呼叫 `<namespace>__<function name>`。 在這種情況下，呼叫的是 `app__newGame`，然後 MUD 會將其路由到 [`GameSystem` 中的 `newGame`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/GameSystem.sol#L16-L22)。

3. 鏈上函式會檢查玩家是否沒有正在進行的遊戲，如果沒有，則[將請求新增至 `PendingGame` 資料表](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/GameSystem.sol#L21)。

4. 伺服器偵測到 `PendingGame` 中的變更，並[執行訂閱的函式](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L55-L71)。 此函式會呼叫 [`newGame`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L110-L114)，而後者又會呼叫 [`createGame`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L116-L144)。

5. `createGame` 做的第一件事是[建立一個具有適當數量地雷的隨機地圖](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L120-L135)。 然後，它會呼叫 [`makeMapBorders`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L147-L166) 來建立一個帶有空白邊界的地圖，這對於 Zokrates 是必要的。 最後，`createGame` 會呼叫 [`calculateMapHash`](#calculateMapHash) 來取得地圖的哈希，該哈希用作遊戲 ID。

6. `newGame` 函式將新遊戲新增至 `gamesInProgress`。

7. 伺服器做的最後一件事是呼叫 [`app__newGameResponse`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol#L38-L43)，這是在鏈上進行的。 此函式位於另一個 `System` 中，即 [`ServerSystem`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol)，以啟用存取控制。 存取控制在 [MUD 設定檔](https://mud.dev/config) [`mud.config.ts`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/mud.config.ts#L67-L72) 中定義。

   存取清單只允許單一地址呼叫 `System`。 這將對伺服器函式的存取限制為單一地址，因此沒有人可以冒充伺服器。

8. 鏈上元件會更新相關資料表：

   - 在 `PlayerGame` 中建立遊戲。
   - 在 `GamePlayer` 中設定反向對應。
   - 從 `PendingGame` 中移除請求。

9. 伺服器識別到 `PendingGame` 的變更，但不會執行任何操作，因為 [`wantsGame`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L58-L60) 為 false。

10. 在用戶端，[`gameRecord`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/client/src/App.tsx#L143-L148) 被設定為玩家地址的 `PlayerGame` 項目。 當 `PlayerGame` 變更時，`gameRecord` 也會變更。

11. 如果 `gameRecord` 中有值，且遊戲尚未分出勝負，用戶端會[顯示地圖](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/client/src/App.tsx#L175-L190)。

#### 挖掘 {#dig-flow}

1. 玩家[點擊地圖儲存格的按鈕](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/client/src/App.tsx#L188)，這會呼叫 [`dig` 函式](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/client/src/mud/createSystemCalls.ts#L33-L36)。 此函式會[在鏈上呼叫 `dig`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/GameSystem.sol#L24-L32)。

2. 鏈上元件會[執行一些健全性檢查](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/GameSystem.sol#L25-L30)，如果成功，則將挖掘請求新增至 [`PendingDig`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/GameSystem.sol#L31)。

3. 伺服器[偵測到 `PendingDig` 的變更](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L73)。 [如果有效](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L75-L84)，它會[呼叫零知識程式碼](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L86-L95)（如下所述）以產生結果和其有效的證明。

4. [伺服器](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L97-L107) 在鏈上呼叫 [`digResponse`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol#L45-L64)。

5. `digResponse` 做兩件事。 首先，它會檢查[零知識證明](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol#L47-L61)。 然後，如果證明通過檢查，它會呼叫 [`processDigResult`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol#L67-L86) 來實際處理結果。

6. `processDigResult` 檢查遊戲是否已[失敗](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol#L76-L78)或[獲勝](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol#L83-L86)，並[更新鏈上地圖 `Map`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol#L80)。

7. 用戶端會自動擷取更新並[更新顯示給玩家的地圖](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/client/src/App.tsx#L175-L190)，並在適用的情況下告知玩家是獲勝還是失敗。

## 使用 Zokrates {#using-zokrates}

在上述流程中，我們跳過了零知識部分，將其視為一個黑盒子。 現在讓我們打開它，看看程式碼是如何編寫的。

### 對地圖進行哈希 {#hashing-map}

我們可以使用[此 JavaScript 程式碼](https://github.com/ZK-Plus/ICBC24_Tutorial_Compute-Offchain-Verify-onchain/tree/solutions/exercise)來實作 [Poseidon](https://www.poseidon-hash.info)，這是我們使用的 Zokrates 哈希函式。 然而，雖然這樣做會更快，但它也比僅使用 Zokrates 哈希函式來做更複雜。 這是一個教學課程，因此程式碼是為簡單性而非效能而優化的。 因此，我們需要兩個不同的 Zokrates 程式，一個只計算地圖的哈希（`hash`），另一個則實際建立在地圖上某個位置挖掘結果的零知識證明（`dig`）。

### 哈希函式 {#hash-function}

這是計算地圖哈希的函式。 我們將逐行檢視此程式碼。

```
import "hashes/poseidon/poseidon.zok" as poseidon;
import "utils/pack/bool/pack128.zok" as pack128;
```

這兩行從 [Zokrates 標準程式庫](https://zokrates.github.io/toolbox/stdlib.html)匯入兩個函式。 [第一個函式](https://github.com/Zokrates/ZoKrates/blob/latest/zokrates_stdlib/stdlib/hashes/poseidon/poseidon.zok) 是 [Poseidon 哈希](https://www.poseidon-hash.info/). 它接受一個 [`field` 元素](https://zokrates.github.io/language/types.html#field)的陣列，並傳回一個 `field`。

Zokrates 中的欄位元素通常長度小於 256 位元，但不會少太多。 為了簡化程式碼，我們將地圖限制為最多 512 位元，並對四個欄位的陣列進行哈希處理，每個欄位只使用 128 位元。 為此，[`pack128` 函式](https://github.com/Zokrates/ZoKrates/blob/latest/zokrates_stdlib/stdlib/utils/pack/bool/pack128.zok) 會將 128 位元的陣列轉換成 `field`。

```
        def hashMap(bool[${width+2}][${height+2}] map) -> field {
```

此行開始函式定義。 `hashMap` 取得一個名為 `map` 的單一參數，它是一個二維 `bool`(ean) 陣列。 地圖的大小是 `width+2` 乘以 `height+2`，原因[如下所述](#why-map-border)。

我們可以使用 `${width+2}` 和 `${height+2}`，因為 Zokrates 程式在此應用程式中以[範本字串](https://www.w3schools.com/js/js_string_templates.asp)的形式儲存。 `${` 和 `}` 之間的程式碼由 JavaScript 評估，這樣程式就可以用於不同大小的地圖。 地圖參數周圍有一個寬度為一個位置的邊界，其中沒有任何炸彈，這就是我們需要將寬度和高度加二的原因。

傳回值是包含哈希的 `field`。

```
   bool[512] mut map1d = [false; 512];
```

地圖是二維的。 然而，`pack128` 函式不適用於二維陣列。 所以我們先使用 `map1d` 將地圖扁平化為一個 512 位元組的陣列。 預設情況下，Zokrates 變數是常數，但我們需要在迴圈中為此陣列賦值，因此我們將其定義為 [`mut`](https://zokrates.github.io/language/variables.html#mutability)。

我們需要初始化陣列，因為 Zokrates 沒有 `undefined`。 `[false; 512]` 運算式表示[一個包含 512 個 `false` 值的陣列](https://zokrates.github.io/language/types.html#declaration-and-initialization)。

```
   u32 mut counter = 0;
```

我們還需要一個計數器來區分我們已在 `map1d` 中填入的位元和尚未填入的位元。

```
   for u32 x in 0..${width+2} {
```

這是在 Zokrates 中宣告 [`for` 迴圈](https://zokrates.github.io/language/control_flow.html#for-loops)的方式。 Zokrates `for` 迴圈必須有固定的邊界，因為雖然它看起來像一個迴圈，但編譯器實際上會「展開」它。 運算式 `${width+2}` 是一個編譯時常數，因為 `width` 是由 TypeScript 程式碼在呼叫編譯器之前設定的。

```
      for u32 y in 0..${height+2} {
         map1d[counter] = map[x][y];
         counter = counter+1;
      }
   }
```

對於地圖中的每個位置，將該值放入 `map1d` 陣列並遞增計數器。

```
    field[4] hashMe = [
        pack128(map1d[0..128]),
        pack128(map1d[128..256]),
        pack128(map1d[256..384]),
        pack128(map1d[384..512])
    ];
```

`pack128` 從 `map1d` 建立一個包含四個 `field` 值的陣列。 在 Zokrates 中，`array[a..b]` 表示從 `a` 開始到 `b-1` 結束的陣列切片。

```
    return poseidon(hashMe);
}
```

使用 `poseidon` 將此陣列轉換為哈希。

### 哈希程式 {#hash-program}

伺服器需要直接呼叫 `hashMap` 來建立遊戲識別碼。 然而，Zokrates 只能呼叫程式上的 `main` 函式來啟動，所以我們建立一個帶有呼叫哈希函式的 `main` 函式的程式。

```
${hashFragment}

def main(bool[${width+2}][${height+2}] map) -> field {
    return hashMap(map);
}
```

### 挖掘程式 {#dig-program}

這是應用程式零知識部分的核心，我們在這裡產生用於驗證挖掘結果的證明。

```
${hashFragment}

// The number of mines in location (x,y)
def map2mineCount(bool[${width+2}][${height+2}] map, u32 x, u32 y) -> u8 {
   return if map[x+1][y+1] { 1 } else { 0 };
}
```

#### 為什麼需要地圖邊界 {#why-map-border}

零知識證明使用[算術電路](https://medium.com/web3studio/simple-explanations-of-arithmetic-circuits-and-zero-knowledge-proofs-806e59a79785)，它沒有與 `if` 陳述式等效的簡單方法。 取而代之的是，他們使用等效於[條件運算子](https://en.wikipedia.org/wiki/Ternary_conditional_operator)的方法。 如果 `a` 可以是零或一，您可以將 `if a { b } else { c }` 計算為 `ab+(1-a)c`。

因此，Zokrates `if` 陳述式總是會評估兩個分支。 例如，如果您有這段程式碼：

```
bool[5] arr = [false; 5];
u32 index=10;
return if index>4 { 0 } else { arr[index] }
```

它會出錯，因為它需要計算 `arr[10]`，即使該值稍後會乘以零。

這就是我們需要在地圖周圍留一個位置寬邊界的原因。 我們需要計算一個位置周圍的地雷總數，這表示我們需要查看我們挖掘位置的上一行和下一行、左側和右側的位置。 這意味著這些位置必須存在於提供給 Zokrates 的地圖陣列中。

```
def main(private bool[${width+2}][${height+2}] map, u32 x, u32 y) -> (field, u8) {
```

預設情況下，Zokrates 證明包含其輸入。 除非您實際知道是哪個點，否則知道某個點周圍有五個地雷是沒有用的（而且您不能只將它與您的請求匹配，因為那樣證明者就可以使用不同的值而不告訴您）。 然而，我們需要將地圖保密，同時將其提供給 Zokrates。 解決方案是使用一個 `private` 參數，一個_不_會被證明揭示的參數。

這開啟了另一個濫用的途徑。 證明者可以使用正確的座標，但建立一個在地點周圍有任意數量地雷的地圖，甚至可能在地點本身就有地雷。 為防止這種濫用，我們讓零知識證明包含地圖的哈希，也就是遊戲識別碼。

```
   return (hashMap(map),
```

此處的傳回值是一個元組，其中包含地圖哈希陣列以及挖掘結果。

```
         if map2mineCount(map, x, y) > 0 { 0xFF } else {
```

如果位置本身有炸彈，我們使用 255 作為特殊值。

```
            map2mineCount(map, x-1, y-1) + map2mineCount(map, x, y-1) + map2mineCount(map, x+1, y-1) +
            map2mineCount(map, x-1, y) + map2mineCount(map, x+1, y) +
            map2mineCount(map, x-1, y+1) + map2mineCount(map, x, y+1) + map2mineCount(map, x+1, y+1)
         }
   );
}
```

如果玩家沒有踩到地雷，則將該位置周圍區域的地雷數量相加並傳回。

### 從 TypeScript 使用 Zokrates {#using-zokrates-from-typescript}

Zokrates 有一個命令列介面，但在這個程式中，我們在 [TypeScript 程式碼](https://zokrates.github.io/toolbox/zokrates_js.html)中使用它。

包含 Zokrates 定義的程式庫稱為 [`zero-knowledge.ts`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/zero-knowledge.ts)。

```typescript
import { initialize as zokratesInitialize } from "zokrates-js"
```

匯入 [Zokrates JavaScript 繫結](https://zokrates.github.io/toolbox/zokrates_js.html)。 我們只需要 [`initialize`](https://zokrates.github.io/toolbox/zokrates_js.html#initialize) 函式，因為它會傳回一個解析為所有 Zokrates 定義的 promise。

```typescript
export const zkFunctions = async (width: number, height: number) : Promise<any> => {
```

與 Zokrates 本身相似，我們也只匯出一個函式，這個函式也是[非同步的](https://www.w3schools.com/js/js_async.asp)。 當它最終傳回時，它會提供幾個函式，如下所示。

```typescript
const zokrates = await zokratesInitialize()
```

初始化 Zokrates，從程式庫中取得我們需要的一切。

```typescript
const hashFragment = `
        import "utils/pack/bool/pack128.zok" as pack128;
        import "hashes/poseidon/poseidon.zok" as poseidon;
            .
            .
            .
        }
    `

const hashProgram = `
        ${hashFragment}
            .
            .
            .
    `

const digProgram = `
        ${hashFragment}
            .
            .
            .
    `
```

接下來是我們上面看到的哈希函式和兩個 Zokrates 程式。

```typescript
const digCompiled = zokrates.compile(digProgram)
const hashCompiled = zokrates.compile(hashProgram)
```

我們在這裡編譯這些程式。

```typescript
// Create the keys for zero knowledge verification.
// On a production system you'd want to use a setup ceremony.
// (https://zokrates.github.io/toolbox/trusted_setup.html#initializing-a-phase-2-ceremony).
const keySetupResults = zokrates.setup(digCompiled.program, "")
const verifierKey = keySetupResults.vk
const proverKey = keySetupResults.pk
```

在生產系統上，我們可能會使用更複雜的[設定儀式](https://zokrates.github.io/toolbox/trusted_setup.html#initializing-a-phase-2-ceremony)，但對於示範來說，這已經足夠了。 使用者知道證明者金鑰不是問題——他們仍然無法用它來證明事情，除非事情是真的。 因為我們指定了熵（第二個參數 `""`），所以結果總會是相同的。

**注意：** Zokrates 程式的編譯和金鑰的建立是緩慢的過程。 不需要每次都重複它們，只有當地圖大小改變時才需要。 在生產系統上，您只會做一次，然後儲存輸出。 我不在這裡這樣做的唯一原因是為了簡單起見。

#### `calculateMapHash` {#calculateMapHash}

```typescript
const calculateMapHash = function (hashMe: boolean[][]): string {
  return (
    "0x" +
    BigInt(zokrates.computeWitness(hashCompiled, [hashMe]).output.slice(1, -1))
      .toString(16)
      .padStart(64, "0")
  )
}
```

[`computeWitness`](https://zokrates.github.io/toolbox/zokrates_js.html#computewitnessartifacts-args-options) 函式實際上會執行 Zokrates 程式。 它會傳回一個包含兩個欄位的結構：`output`，即程式的輸出，為 JSON 字串；以及 `witness`，即建立結果的零知識證明所需的資訊。 這裡我們只需要輸出。

輸出是一個形式為 `"31337"` 的字串，一個用引號括起來的十進位數字。 但我們需要 `viem` 的輸出是一個形式為 `0x60A7` 的十六進位數字。 所以我們使用 `.slice(1,-1)` 來移除引號，然後使用 `BigInt` 將剩餘的字串（一個十進位數字）轉換為 [`BigInt`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt)。 `.toString(16)` 將此 `BigInt` 轉換為十六進位字串，而 `"0x"+` 則添加了十六進位數字的標記。

```typescript
// Dig and return a zero knowledge proof of the result
// (server-side code)
```

零知識證明包括公共輸入（`x` 和 `y`）和結果（地圖的哈希和炸彈的數量）。

```typescript
    const zkDig = function(map: boolean[][], x: number, y: number) : any {
        if (x<0 || x>=width || y<0 || y>=height)
            throw new Error("Trying to dig outside the map")
```

在 Zokrates 中檢查索引是否越界是一個問題，所以我們在這裡進行檢查。

```typescript
const runResults = zokrates.computeWitness(digCompiled, [map, `${x}`, `${y}`])
```

執行挖掘程式。

```typescript
        const proof = zokrates.generateProof(
            digCompiled.program,
            runResults.witness,
            proverKey)

        return proof
    }
```

使用 [`generateProof`](https://zokrates.github.io/toolbox/zokrates_js.html#generateproofprogram-witness-provingkey-entropy) 並傳回證明。

```typescript
const solidityVerifier = `
        // Map size: ${width} x ${height}
        \n${zokrates.exportSolidityVerifier(verifierKey)}
        `
```

一個 Solidity 驗證器，這是一個我們可以部署到區塊鏈並用來驗證由 `digCompiled.program` 產生的證明的智能合約。

```typescript
    return {
        zkDig,
        calculateMapHash,
        solidityVerifier,
    }
}
```

最後，傳回其他程式碼可能需要的一切。

## 安全性測試 {#security-tests}

安全性測試很重要，因為功能錯誤最終會顯現出來。 但如果應用程式不安全，這很可能會隱藏很長一段時間，直到有人作弊並竊取屬於他人的資源時才會被揭露。

### 權限 {#permissions}

在這個遊戲中，有一個特權實體，那就是伺服器。 它是唯一允許呼叫 [`ServerSystem`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol) 中函式的使用者。 我們可以使用 [`cast`](https://book.getfoundry.sh/cast/) 來驗證對權限函式的呼叫僅能以伺服器帳戶進行。

[伺服器的私密金鑰在 `setupNetwork.ts` 中](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/mud/setupNetwork.ts#L52)。

1. 在執行 `anvil`（區塊鏈）的電腦上，設定這些環境變數。

   ```sh copy
   WORLD_ADDRESS=0x8d8b6b8414e1e3dcfd4168561b9be6bd3bf6ec4b
   UNAUTHORIZED_KEY=0x5de4111afa1a4b94908f83103eb1f1706367c2e68ca870fc3fb9a804cdab365a
   AUTHORIZED_KEY=0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d
   ```

2. 使用 `cast` 嘗試將驗證器地址設定為未經授權的地址。

   ```sh copy
   cast send $WORLD_ADDRESS 'app__setVerifier(address)' `cast address-zero` --private-key $UNAUTHORIZED_KEY
   ```

   `cast` 不僅會報告失敗，您還可以在瀏覽器中的遊戲中開啟 **MUD 開發工具**，點擊**資料表**，然後選擇 **app\_\_VerifierAddress**。 查看地址是否不為零。

3. 將驗證器地址設定為伺服器的地址。

   ```sh copy
   cast send $WORLD_ADDRESS 'app__setVerifier(address)' `cast address-zero` --private-key $AUTHORIZED_KEY
   ```

   **app\_\_VerifiedAddress** 中的地址現在應為零。

所有在同一個 `System` 中的 MUD 函式都經過相同的存取控制，所以我認為這個測試是足夠的。 如果您不這麼認為，您可以檢查 [`ServerSystem`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol) 中的其他函式。

### 零知識濫用 {#zero-knowledge-abuses}

驗證 Zokrates 的數學超出了本教學課程的範圍（以及我的能力）。 然而，我們可以對零知識程式碼執行各種檢查，以驗證如果它沒有正確完成就會失敗。 所有這些測試都要求我們更改 [`zero-knowledge.ts`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/zero-knowledge.ts) 並重新啟動整個應用程式。 僅重新啟動伺服器程序是不夠的，因為它會使應用程式處於不可能的狀態（玩家正在進行遊戲，但遊戲不再對伺服器可用）。

#### 錯誤答案 {#wrong-answer}

最簡單的可能性是在零知識證明中提供錯誤的答案。 為此，我們進入 `zkDig` 並[修改第 91 行](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/zero-knowledge.ts#L91)：

```ts
proof.inputs[3] = "0x" + "1".padStart(64, "0")
```

這表示無論正確答案為何，我們都將始終聲稱有一個炸彈。 嘗試用這個版本玩遊戲，您會在 `pnpm dev` 畫面的 **server** 標籤中看到此錯誤：

```
      cause: {
        code: 3,
        message: 'execution reverted: revert: Zero knowledge verification fail',
        data: '0x08c379a0000000000000000000000000000000000000000000000000000000000000002000000000000000
000000000000000000000000000000000000000000000000205a65726f206b6e6f776c6564676520766572696669636174696f6
e206661696c'
      },
```

所以這種作弊方式會失敗。

#### 錯誤的證明 {#wrong-proof}

如果我們提供正確的資訊，但證明資料錯誤會發生什麼？ 現在，將第 91 行替換為：

```ts
proof.proof = {
  a: ["0x" + "1".padStart(64, "0"), "0x" + "2".padStart(64, "0")],
  b: [
    ["0x" + "1".padStart(64, "0"), "0x" + "2".padStart(64, "0")],
    ["0x" + "1".padStart(64, "0"), "0x" + "2".padStart(64, "0")],
  ],
  c: ["0x" + "1".padStart(64, "0"), "0x" + "2".padStart(64, "0")],
}
```

它仍然失敗，但現在它在沒有原因的情況下失敗，因為它發生在驗證器呼叫期間。

### 使用者如何驗證零信任程式碼？ {#user-verify-zero-trust}

智能合約相對容易驗證。 通常，開發者會將原始碼發佈到區塊瀏覽器，而區塊瀏覽器會驗證原始碼是否確實編譯為[合約部署交易](/developers/docs/smart-contracts/deploying/)中的程式碼。 在 MUD `System`s 的情況下，這[稍微複雜一些](https://mud.dev/cli/verify)，但不會複雜太多。

這對零知識來說更難。 驗證器包含一些常數，並對它們執行一些計算。 這不會告訴您正在證明什麼。

```solidity
    function verifyingKey() pure internal returns (VerifyingKey memory vk) {
        vk.alpha = Pairing.G1Point(uint256(0x0f43f4fe7b5c2326fed4ac6ed2f4003ab9ab4ea6f667c2bdd77afb068617ee16), uint256(0x25a77832283f9726935219b5f4678842cda465631e72dbb24708a97ba5d0ce6f));
        vk.beta = Pairing.G2Point([uint256(0x2cebd0fbd21aca01910581537b21ae4fed46bc0e524c055059aa164ba0a6b62b), uint256(0x18fd4a7bc386cf03a95af7163d5359165acc4e7961cb46519e6d9ee4a1e2b7e9)], [uint256(0x11449dee0199ef6d8eebfe43b548e875c69e7ce37705ee9a00c81fe52f11a009), uint256(0x066d0c83b32800d3f335bb9e8ed5e2924cf00e77e6ec28178592eac9898e1a00)]);
```

解決方案是，至少在區塊瀏覽器將 Zokrates 驗證新增到其使用者介面之前，應用程式開發者應提供 Zokrates 程式，並讓至少一些使用者使用適當的驗證金鑰自行編譯它們。

若要如此做：

1. [安裝 Zokrates](https://zokrates.github.io/gettingstarted.html)。

2. 建立一個名為 `dig.zok` 的檔案，其中包含 Zokrates 程式。 以下程式碼假設您保留了原始地圖大小 10x5。

   ```zokrates
    import "utils/pack/bool/pack128.zok" as pack128;
    import "hashes/poseidon/poseidon.zok" as poseidon;

    def hashMap(bool[12][7] map) -> field {
        bool[512] mut map1d = [false; 512];
        u32 mut counter = 0;

        for u32 x in 0..12 {
            for u32 y in 0..7 {
                map1d[counter] = map[x][y];
                counter = counter+1;
            }
        }

        field[4] hashMe = [
            pack128(map1d[0..128]),
            pack128(map1d[128..256]),
            pack128(map1d[256..384]),
            pack128(map1d[384..512])
        ];

        return poseidon(hashMe);
    }


    // The number of mines in location (x,y)
    def map2mineCount(bool[12][7] map, u32 x, u32 y) -> u8 {
        return if map[x+1][y+1] { 1 } else { 0 };
    }

    def main(private bool[12][7] map, u32 x, u32 y) -> (field, u8) {
        return (hashMap(map) ,
            if map2mineCount(map, x, y) > 0 { 0xFF } else {
                map2mineCount(map, x-1, y-1) + map2mineCount(map, x, y-1) + map2mineCount(map, x+1, y-1) +
                map2mineCount(map, x-1, y) + map2mineCount(map, x+1, y) +
                map2mineCount(map, x-1, y+1) + map2mineCount(map, x, y+1) + map2mineCount(map, x+1, y+1)
            }
        );
    }
   ```

3. 編譯 Zokrates 程式碼並建立驗證金鑰。 驗證金鑰必須使用原始伺服器中使用的相同熵來建立，[在這種情況下是一個空字串](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/zero-knowledge.ts#L67)。

   ```sh copy
   zokrates compile --input dig.zok
   zokrates setup -e ""
   ```

4. 自行建立 Solidity 驗證器，並驗證其功能上與區塊鏈上的驗證器相同（伺服器會新增註解，但這不重要）。

   ```sh copy
   zokrates export-verifier
   diff verifier.sol ~/20240901-secret-state/packages/contracts/src/verifier.sol
   ```

## 設計決策 {#design}

在任何足夠複雜的應用程式中，都有相互競爭的設計目標，需要權衡取捨。 讓我們看看一些權衡以及為什麼當前的解決方案優於其他選項。

### 為什麼是零知識 {#why-zero-knowledge}

對於踩地雷遊戲，您並不需要真正的零知識。 伺服器可以一直持有地圖，然後在遊戲結束時揭示所有內容。 然後，在遊戲結束時，智能合約可以計算地圖哈希，驗證其是否匹配，如果不匹配則懲罰伺服器或完全忽略遊戲。

我沒有使用這個更簡單的解決方案，因為它只適用於具有明確結束狀態的短遊戲。 當遊戲可能無限進行時（例如[自主世界](https://0xparc.org/blog/autonomous-worlds)的情況），您需要一個可以在_不_揭示狀態的情況下證明狀態的解決方案。

作為教學課程，本文需要一個簡短且易於理解的遊戲，但此技術對於較長的遊戲最有用。

### 為什麼是 Zokrates？ {#why-zokrates}

[Zokrates](https://zokrates.github.io/) 並不是唯一可用的零知識程式庫，但它與正常的、[命令式](https://en.wikipedia.org/wiki/Imperative_programming)程式設計語言相似，並支援布林變數。

對於您的應用程式，由於有不同的需求，您可能更喜歡使用 [Circum](https://docs.circom.io/getting-started/installation/) 或 [Cairo](https://www.cairo-lang.org/tutorials/getting-started-with-cairo/)。

### 何時編譯 Zokrates {#when-compile-zokrates}

在這個程式中，我們在[每次伺服器啟動時](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/zero-knowledge.ts#L60-L61)編譯 Zokrates 程式。 這顯然是浪費資源，但這是一個教學課程，以簡單為優化目標。

如果我正在編寫一個生產級的應用程式，我會檢查我是否擁有此地雷區大小的已編譯 Zokrates 程式檔案，如果是，就使用它。 在鏈上部署驗證器合約也是如此。

### 建立驗證器和證明者金鑰 {#key-creation}

[金鑰建立](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/zero-knowledge.ts#L63-L69)是另一個純粹的計算，對於給定的地雷區大小，不需要執行多次。 同樣，為了簡單起見，它只執行一次。

此外，我們可以使用[設定儀式](https://zokrates.github.io/toolbox/trusted_setup.html#initializing-a-phase-2-ceremony)。 設定儀式的優點是，您需要每個參與者的熵或一些中間結果才能在零知識證明上作弊。 如果至少有一個儀式參與者是誠實的並刪除了該資訊，那麼零知識證明就可以免受某些攻擊。 然而，_沒有機制_可以驗證資訊是否已從所有地方刪除。 如果零知識證明至關重要，您會希望參與設定儀式。

在這裡，我們依賴 [perpetual powers of tau](https://github.com/privacy-scaling-explorations/perpetualpowersoftau)，它有數十名參與者。 這可能足夠安全，而且簡單得多。 我們在金鑰建立過程中也不添加熵，這使得使用者更容易[驗證零知識設定](#user-verify-zero-trust)。

### 在哪裡驗證 {#where-verification}

我們可以在鏈上（這會消耗 gas）或在用戶端（使用 [`verify`](https://zokrates.github.io/toolbox/zokrates_js.html#verifyverificationkey-proof)）驗證零知識證明。 我選擇了前者，因為這可以讓您[驗證驗證器](#user-verify-zero-trust)一次，然後相信只要其合約地址保持不變，它就不會改變。 如果驗證是在用戶端上完成的，那麼您每次下載用戶端時都必須驗證您收到的程式碼。

此外，雖然這個遊戲是單人遊戲，但很多區塊鏈遊戲都是多人遊戲。 鏈上驗證意味著您只需驗證零知識證明一次。 在用戶端進行驗證將需要每個用戶端獨立驗證。

### 在 TypeScript 或 Zokrates 中扁平化地圖？ {#where-flatten}

一般來說，當處理可以在 TypeScript 或 Zokrates 中完成時，最好在 TypeScript 中進行，因為它快得多，且不需要零知識證明。 這就是為什麼，例如，我們不向 Zokrates 提供哈希並讓它驗證其是否正確的原因。 哈希必須在 Zokrates 內部完成，但傳回的哈希與鏈上的哈希之間的匹配可以在其外部進行。

然而，我們仍然[在 Zokrates 中扁平化地圖](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/zero-knowledge.ts#L15-L20)，而我們本可以在 TypeScript 中完成。 原因是我認為其他選項更糟。

- 向 Zokrates 程式碼提供一個布林值的一維陣列，並使用 `x*(height+2)
  +y` 之類的運算式來取得二維地圖。 這會讓[程式碼](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/zero-knowledge.ts#L44-L47)變得更複雜一些，所以我決定對於教學課程來說，效能的提升不值得這樣做。

- 向 Zokrates 傳送一維陣列和二維陣列。 然而，這個解決方案對我們沒有任何好處。 Zokrates 程式碼必須驗證它所提供的一維陣列是否真的是二維陣列的正確表示。 所以不會有任何效能提升。

- 在 Zokrates 中扁平化二維陣列。 這是最簡單的選項，所以我選擇了它。

### 地圖儲存在哪裡 {#where-store-maps}

在這個應用程式中，[`gamesInProgress`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L20) 只是記憶體中的一個變數。 這意味著如果您的伺服器死機並需要重新啟動，它儲存的所有資訊都會遺失。 玩家不僅無法繼續他們的遊戲，他們甚至無法開始新遊戲，因為鏈上元件認為他們仍在進行遊戲。

對於生產系統來說，這顯然是不好的設計，在生產系統中，您會將此資訊儲存在資料庫中。 我之所以在這裡使用變數，唯一的原因是這是一個教學課程，簡單性是主要考量。

## 結論：在什麼條件下這是一種適當的技術？ {#conclusion}

所以，現在您知道如何編寫一個帶有伺服器的遊戲，該伺服器儲存不屬於鏈上的秘密狀態。 但您應該在什麼情況下這樣做呢？ 有兩個主要考量。

- _長期運行的遊戲_：[如上所述](#why-zero-knowledge)，在一個短遊戲中，您可以在遊戲結束後發佈狀態，然後進行驗證。 但當遊戲需要很長或不確定的時間，並且狀態需要保密時，這就不是一個選項。

- _可接受某些中心化_：零知識證明可以驗證完整性，即實體沒有偽造結果。 它們無法做的是確保實體仍然可用並回答訊息。 在可用性也需要去中心化的情況下，零知識證明並不是一個足夠的解決方案，您需要[多方計算](https://en.wikipedia.org/wiki/Secure_multi-party_computation)。

[在此查看我的更多作品](https://cryptodocguy.pro/)。

### 致謝 {#acknowledgements}

- Alvaro Alonso 閱讀了本文的草稿，並澄清了我對 Zokrates 的一些誤解。

任何剩餘的錯誤都由我負責。
