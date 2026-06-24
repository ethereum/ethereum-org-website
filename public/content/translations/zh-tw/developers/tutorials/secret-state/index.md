---
title: "使用零知識實現秘密狀態"
description: "鏈上遊戲受到限制，因為它們無法保留任何隱藏資訊。閱讀本教學後，讀者將能夠結合零知識證明與伺服器元件，建立具有秘密狀態、鏈下元件的可驗證遊戲。我們將透過建立踩地雷遊戲來示範此技術。"
author: "奧里·波梅蘭茨"
tags:
  - 伺服器
  - 鏈下
  - 中心化
  - 零知識
  - Zokrates
  - MUD
  - 隱私
skill: advanced
breadcrumb: "ZK 秘密狀態"
lang: zh-tw
published: 2025-03-15
---

_區塊鏈上沒有秘密_。發布在區塊鏈上的所有內容都公開供所有人閱讀。這是必要的，因為區塊鏈的基礎是任何人都能夠驗證它。然而，遊戲通常依賴於秘密狀態。例如，如果你可以直接進入區塊鏈瀏覽器查看地圖，那麼 [踩地雷](<https://en.wikipedia.org/wiki/Minesweeper_(video_game)>) 遊戲就完全沒有意義了。

最簡單的解決方案是使用[伺服器元件](/developers/tutorials/server-components/)來保存秘密狀態。然而，我們使用區塊鏈的原因是為了防止遊戲開發者作弊。我們需要確保伺服器元件的誠實性。伺服器可以提供狀態的雜湊，並使用[零知識證明](/zero-knowledge-proofs/#why-zero-knowledge-proofs-are-important)來證明用於計算移動結果的狀態是正確的。

閱讀本文後，你將了解如何建立這種保存秘密狀態的伺服器、用於顯示狀態的用戶端，以及用於兩者之間通訊的鏈上元件。我們使用的主要工具將是：

| 工具                                          | 用途                                                    | 驗證版本 |
| --------------------------------------------- | ------------------------------------------------------- | ------------------: |
| [Zokrates](https://zokrates.github.io/)       | 零知識證明及其驗證                                      |               1.1.9 |
| [TypeScript](https://www.typescriptlang.org/) | 伺服器和用戶端的程式語言                                |               5.4.2 |
| [Node](https://nodejs.org/en)                 | 執行伺服器                                              |             20.18.2 |
| [Viem](https://viem.sh/)                      | 與區塊鏈通訊                                            |              2.9.20 |
| [MUD](https://mud.dev/)                       | 鏈上資料管理                                            |              2.0.12 |
| [React](https://react.dev/)                   | 用戶端使用者介面                                        |              18.2.0 |
| [Vite](https://vitejs.dev/)                   | 提供用戶端程式碼                                        |               4.2.1 |

## 踩地雷範例 {#minesweeper}

[踩地雷](<https://en.wikipedia.org/wiki/Minesweeper_(video_game)>) 是一款包含隱藏地雷區地圖的遊戲。玩家選擇在特定位置挖掘。如果該位置有地雷，遊戲就結束了。否則，玩家會得知該位置周圍八個方格中的地雷數量。

此應用程式使用 [MUD](https://mud.dev/) 編寫，這是一個讓我們能使用[鍵值資料庫 (key-value database)](https://aws.amazon.com/nosql/key-value/) 將資料儲存在鏈上，並自動與鏈下元件同步該資料的框架。除了同步之外，MUD 還能輕鬆提供存取控制，並讓其他使用者以非許可制的方式[擴充](https://mud.dev/guides/extending-a-world)我們的應用程式。

### 執行踩地雷範例 {#running-minesweeper-example}

若要執行踩地雷範例：

1. 確保您[已安裝必備軟體](https://mud.dev/quickstart#prerequisites)：[Node](https://mud.dev/quickstart#prerequisites)、[Foundry](https://book.getfoundry.sh/getting-started/installation)、[`git`](https://git-scm.com/downloads)、[`pnpm`](https://git-scm.com/downloads) 以及 [`mprocs`](https://github.com/pvolok/mprocs)。

2. 複製 (Clone) 儲存庫。

   ```sh copy
   git clone https://github.com/qbzzt/20240901-secret-state.git
   ```

3. 安裝套件。

   ```sh copy
   cd 20240901-secret-state/
   pnpm install
   npm install -g mprocs
   ```

   如果 Foundry 是作為 `pnpm install` 的一部分安裝的，您需要重新啟動命令列介面。

4. 編譯合約

    ```sh copy
    cd packages/contracts
    forge build
    cd ../..
    ```


5. 啟動程式（包含一個 [anvil](https://book.getfoundry.sh/anvil/) 區塊鏈）並等待。

   ```sh copy
   mprocs
   ```

   請注意，啟動需要很長時間。若要查看進度，請先使用向下箭頭捲動至 _contracts_ 索引標籤，以查看正在部署的 MUD 合約。當您看到 _Waiting for file changes…_ 訊息時，表示合約已部署，後續進度將在 _server_ 索引標籤中顯示。在那裡，請等待直到出現 _Verifier address: 0x...._ 訊息。

   如果此步驟成功，您將看到 `mprocs` 畫面，左側顯示不同的處理程序，右側顯示目前所選處理程序的主控台輸出。

   ![The mprocs screen](./mprocs.png)

   如果 `mprocs` 發生問題，您可以手動執行這四個處理程序，每個處理程序都在各自的命令列視窗中執行：

   - **Anvil**

     ```sh
     cd packages/contracts
     anvil --base-fee 0 --block-time 2
     ```

   - **Contracts** 

     ```sh
     cd packages/contracts
     pnpm mud dev-contracts --rpc http://127.0.0.1:8545
     ```

   - **Server**

     ```sh
     cd packages/server
     pnpm start
     ```  

   - **Client**

     ```sh
     cd packages/client
     pnpm run dev
     ```  

6. 現在您可以瀏覽至[用戶端](http://localhost:3000)，點擊 **New Game**，然後開始遊玩。

### 資料表 {#tables}

我們需要在鏈上建立[幾個資料表](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/mud.config.ts)。

- `Configuration`：此資料表是一個單例 (singleton)，它沒有金鑰且只有單筆記錄。它用於保存遊戲設定資訊：
  - `height`：地雷區的高度
  - `width`：地雷區的寬度
  - `numberOfBombs`：每個地雷區中的炸彈數量
- `VerifierAddress`：此資料表也是一個單例。它用於保存設定的一部分，即驗證者合約的地址 (`verifier`)。我們本可以將此資訊放在 `Configuration` 資料表中，但它是由另一個元件（伺服器）設定的，因此將其放在獨立的資料表中會更容易。

- `PlayerGame`：金鑰是玩家的地址。資料為：

  - `gameId`：32 位元組的值，為玩家正在遊玩之地圖的雜湊 (遊戲識別碼)。
  - `win`：布林值，表示玩家是否贏得遊戲。
  - `lose`：布林值，表示玩家是否輸掉遊戲。
  - `digNumber`：遊戲中成功挖掘的次數。

- `GamePlayer`：此資料表保存反向對應，從 `gameId` 對應到玩家地址。

- `Map`：金鑰是包含三個值的元組 (tuple)：

  - `gameId`：32 位元組的值，為玩家正在遊玩之地圖的雜湊 (遊戲識別碼)。
  - `x` 座標
  - `y` 座標

  該值是一個單一數字。如果偵測到炸彈，則為 255。否則，它是該位置周圍的炸彈數量加一。我們不能只使用炸彈數量，因為預設情況下，EVM 中的所有儲存空間和 MUD 中的所有列值都是零。我們需要區分「玩家尚未在此處挖掘」和「玩家在此處挖掘，並發現周圍有零顆炸彈」。

此外，用戶端與伺服器之間的通訊是透過鏈上元件進行的。這也是使用資料表來實作的。

- `PendingGame`：尚未處理的開始新遊戲請求。
- `PendingDig`：尚未處理的在特定遊戲中特定位置挖掘的請求。這是一個[鏈下資料表](https://mud.dev/store/tables#types-of-tables)，這意味著它不會被寫入 EVM 儲存空間，只能在鏈下使用事件來讀取。

### 執行與資料流程 {#execution-data-flows}

這些流程協調了用戶端、鏈上元件與伺服器之間的執行。

#### 初始化 {#initialization-flow}

當您執行 `mprocs` 時，會發生以下步驟：

1. [`mprocs`](https://github.com/pvolok/mprocs) 執行四個元件：

   - [Anvil](https://book.getfoundry.sh/anvil/)，執行一個本機區塊鏈
   - [Contracts](https://github.com/qbzzt/20240901-secret-state/tree/main/packages/contracts)，編譯（如果需要）並部署 MUD 的合約
   - [Client](https://github.com/qbzzt/20240901-secret-state/tree/main/packages/client)，執行 [Vite](https://vitejs.dev/) 以將 UI 和用戶端程式碼提供給網頁瀏覽器。
   - [Server](https://github.com/qbzzt/20240901-secret-state/tree/main/packages/server)，執行伺服器操作

2. `contracts` 套件會部署 MUD 合約，然後執行[`PostDeploy.s.sol` 腳本](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/script/PostDeploy.s.sol)。此腳本會設定組態。來自 GitHub 的程式碼指定了[一個 10x5 的地雷區，其中包含八顆地雷](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/script/PostDeploy.s.sol#L23)。

3. [伺服器](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts)首先會[設定 MUD](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L6)。除此之外，這會啟動資料同步，以便在伺服器的記憶體中存在相關資料表的副本。

4. 伺服器訂閱了一個函數，以便[在 `Configuration` 資料表變更時](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L23)執行。[此函數](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L24-L168)會在 `PostDeploy.s.sol` 執行並修改資料表後被呼叫。

5. 當伺服器初始化函數取得設定後，[它會呼叫 `zkFunctions`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L34-L35) 來初始化[伺服器的零知識部分](#using-zokrates-from-typescript)。這必須在我們取得設定後才能進行，因為零知識函數必須將地雷區的寬度和高度作為常數。

6. 在伺服器的零知識部分初始化之後，下一步是[將零知識驗證者合約部署到區塊鏈](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L42-L53)，並在 MUD 中設定驗證者地址。

7. 最後，我們訂閱更新，這樣我們就能看到玩家何時請求[開始新遊戲](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L55-L71)或[在現有遊戲中挖掘](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L73-L108)。

#### 新遊戲 {#new-game-flow}

這是當玩家請求新遊戲時會發生的情況。

1. 如果該玩家沒有正在進行的遊戲，或者有一個遊戲但 gameId 為零，用戶端會顯示一個[新遊戲按鈕](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/client/src/App.tsx#L175)。當使用者按下此按鈕時，[React 會執行 `newGame` 函數](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/client/src/App.tsx#L96)。

2. [`newGame`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/client/src/mud/createSystemCalls.ts#L43-L46) 是一個 `System` 呼叫。在 MUD 中，所有呼叫都會透過 `World` 合約進行路由，在大多數情況下，您會呼叫 `<namespace>__<function name>`。在這種情況下，呼叫是針對 `app__newGame`，然後 MUD 會將其路由到 [`GameSystem` 中的 `newGame`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/GameSystem.sol#L16-L22)。

3. 鏈上函數會檢查玩家是否沒有正在進行的遊戲，如果沒有，則[將請求新增至 `PendingGame` 資料表](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/GameSystem.sol#L21)。

4. 伺服器偵測到 `PendingGame` 的變更，並[執行訂閱的函數](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L55-L71)。此函數會呼叫 [`newGame`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L110-L114)，進而呼叫 [`createGame`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L116-L144)。

5. `createGame` 做的第一件事是[建立一個包含適當數量地雷的隨機地圖](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L120-L135)。然後，它呼叫 [`makeMapBorders`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L147-L166) 來建立一個帶有空白邊界的地圖，這對於 Zokrates 是必要的。最後，`createGame` 呼叫 [`calculateMapHash`](#calculatemaphash)，以取得地圖的雜湊，該雜湊將用作遊戲 ID。

6. `newGame` 函數將新遊戲新增至 `gamesInProgress`。

7. 伺服器做的最後一件事是呼叫鏈上的 [`app__newGameResponse`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol#L38-L43)。此函數位於不同的 `System`（即 [`ServerSystem`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol)）中，以啟用存取控制。存取控制定義在 [MUD 設定檔](https://mud.dev/config) [`mud.config.ts`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/mud.config.ts#L67-L72) 中。

   存取清單僅允許單一地址呼叫 `System`。這將伺服器函數的存取權限限制為單一地址，因此沒有人可以冒充伺服器。

8. 鏈上元件會更新相關的資料表：

   - 在 `PlayerGame` 中建立遊戲。
   - 在 `GamePlayer` 中設定反向對應。
   - 從 `PendingGame` 中移除請求。

9. 伺服器識別出 `PendingGame` 中的變更，但不會執行任何操作，因為 [`wantsGame`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L58-L60) 為 false。

10. 在用戶端上，[`gameRecord`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/client/src/App.tsx#L143-L148) 被設定為玩家地址的 `PlayerGame` 項目。當 `PlayerGame` 變更時，`gameRecord` 也會跟著變更。

11. 如果 `gameRecord` 中有值，且遊戲尚未分出勝負，用戶端會[顯示地圖](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/client/src/App.tsx#L175-L190)。

#### 挖掘 {#dig-flow}

1. 玩家[點擊地圖儲存格的按鈕](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/client/src/App.tsx#L188)，這會呼叫 [`dig` 函數](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/client/src/mud/createSystemCalls.ts#L33-L36)。此函數會呼叫[鏈上的 `dig`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/GameSystem.sol#L24-L32)。

2. 鏈上元件會[執行一些合理性檢查 (sanity checks)](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/GameSystem.sol#L25-L30)，如果成功，則將挖掘請求新增至 [`PendingDig`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/GameSystem.sol#L31)。

3. 伺服器[偵測到 `PendingDig` 的變更](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L73)。[如果它是有效的](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L75-L84)，它會[呼叫零知識程式碼](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L86-L95)（如下所述）以產生結果以及證明其有效的證明。

4. [伺服器](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L97-L107)呼叫鏈上的 [`digResponse`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol#L45-L64)。

5. `digResponse` 會做兩件事。首先，它會檢查[零知識證明](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol#L47-L61)。然後，如果證明驗證通過，它會呼叫 [`processDigResult`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol#L67-L86) 來實際處理結果。

6. `processDigResult` 會檢查遊戲是否已[輸掉](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol#L76-L78)或[贏得](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol#L83-L86)，並[更新鏈上地圖 `Map`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol#L80)。

7. 用戶端會自動接收更新並[更新顯示給玩家的地圖](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/client/src/App.tsx#L175-L190)，並在適用的情況下告訴玩家是贏還是輸。

## 使用 Zokrates {#using-zokrates}

在上面解釋的流程中，我們跳過了零知識的部分，將它們視為黑盒子。現在讓我們打開它，看看這些程式碼是如何編寫的。

### 對地圖進行雜湊運算 {#hashing-map}

我們可以使用[這段 JavaScript 程式碼](https://github.com/ZK-Plus/ICBC24_Tutorial_Compute-Offchain-Verify-onchain/tree/solutions/exercise)來實作 [Poseidon](https://www.poseidon-hash.info)，這是我們使用的 Zokrates 雜湊函數。然而，雖然這樣做會更快，但也比直接使用 Zokrates 雜湊函數來得複雜。這是一篇教學文章，因此程式碼針對簡單性而非效能進行了最佳化。因此，我們需要兩個不同的 Zokrates 程式，一個僅用於計算地圖的雜湊（`hash`），另一個用於實際建立在地圖某個位置挖掘結果的零知識證明（`dig`）。

### 雜湊函數 {#hash-function}

這是計算地圖雜湊的函數。我們將逐行檢視這段程式碼。

```
import "hashes/poseidon/poseidon.zok" as poseidon;
import "utils/pack/bool/pack128.zok" as pack128;
```

這兩行從 [Zokrates 標準函式庫](https://zokrates.github.io/toolbox/stdlib.html)匯入兩個函數。[第一個函數](https://github.com/Zokrates/ZoKrates/blob/latest/zokrates_stdlib/stdlib/hashes/poseidon/poseidon.zok)是 [Poseidon 雜湊](https://www.poseidon-hash.info/)。它接受一個 [`field` 元素](https://zokrates.github.io/language/types.html#field)陣列並回傳一個 `field`。

Zokrates 中的 field 元素通常小於 256 位元，但相差不大。為了簡化程式碼，我們將地圖限制為最多 512 位元，並對包含四個 field 的陣列進行雜湊運算，且在每個 field 中我們僅使用 128 位元。[`pack128` 函數](https://github.com/Zokrates/ZoKrates/blob/latest/zokrates_stdlib/stdlib/utils/pack/bool/pack128.zok)為此目的將 128 位元的陣列轉換為 `field`。

```
def hashMap(bool[${width+2}][${height+2}] map) -> field {
```

這一行開始定義函數。`hashMap` 接收一個名為 `map` 的單一參數，這是一個二維的 `bool`(ean) 陣列。地圖的大小為 `width+2` 乘 `height+2`，原因將在[下方解釋](#why-map-border)。

我們可以使用 `${width+2}` 和 `${height+2}`，因為 Zokrates 程式在此應用程式中儲存為[模板字串](https://www.w3schools.com/js/js_string_templates.asp)。`${` 和 `}` 之間的程式碼由 JavaScript 評估，這樣程式就可以用於不同的地圖大小。地圖參數周圍有一個寬度為一個位置的邊界，其中沒有任何炸彈，這就是我們需要在寬度和高度上加二的原因。

回傳值是一個包含雜湊的 `field`。

```
bool[512] mut map1d = [false; 512];
```

地圖是二維的。然而，`pack128` 函數不適用於二維陣列。因此，我們首先使用 `map1d` 將地圖展平為 512 位元組的陣列。預設情況下，Zokrates 變數是常數，但我們需要在迴圈中為這個陣列賦值，因此我們將其定義為 [`mut`](https://zokrates.github.io/language/variables.html#mutability)。

我們需要初始化陣列，因為 Zokrates 沒有 `undefined`。`[false; 512]` 表達式代表[一個包含 512 個 `false` 值的陣列](https://zokrates.github.io/language/types.html#declaration-and-initialization)。

```
u32 mut counter = 0;
```

我們還需要一個計數器來區分我們已經在 `map1d` 中填入的位元和尚未填入的位元。

```
for u32 x in 0..${width+2} {
```

這就是在 Zokrates 中宣告 [`for` 迴圈](https://zokrates.github.io/language/control_flow.html#for-loops)的方式。Zokrates 的 `for` 迴圈必須具有固定的邊界，因為雖然它看起來像是一個迴圈，但編譯器實際上會將其「展開」。表達式 `${width+2}` 是一個編譯期常數，因為 `width` 是由 TypeScript 程式碼在呼叫編譯器之前設定的。

```
for u32 y in 0..${height+2} {
         map1d[counter] = map[x][y];
         counter = counter+1;
      }
   }
```

對於地圖中的每個位置，將該值放入 `map1d` 陣列中並遞增計數器。

```
field[4] hashMe = [
        pack128(map1d[0..128]),
        pack128(map1d[128..256]),
        pack128(map1d[256..384]),
        pack128(map1d[384..512])
    ];
```

使用 `pack128` 從 `map1d` 建立一個包含四個 `field` 值的陣列。在 Zokrates 中，`array[a..b]` 代表從 `a` 開始並在 `b-1` 結束的陣列切片。

```
return poseidon(hashMe);
}
```

使用 `poseidon` 將此陣列轉換為雜湊。

### 雜湊程式 {#hash-program}

伺服器需要直接呼叫 `hashMap` 來建立遊戲識別碼。然而，Zokrates 只能呼叫程式上的 `main` 函數來啟動，因此我們建立了一個帶有 `main` 的程式來呼叫雜湊函數。

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

// 在位置 (x,y) 的地雷數量
def map2mineCount(bool[${width+2}][${height+2}] map, u32 x, u32 y) -> u8 {
   return if map[x+1][y+1] { 1 } else { 0 };
}
```

#### 為什麼需要地圖邊界 {#why-map-border}

零知識證明使用[算術電路](https://medium.com/web3studio/simple-explanations-of-arithmetic-circuits-and-zero-knowledge-proofs-806e59a79785)，它沒有與 `if` 敘述簡單對應的等價物。相反地，它們使用等同於[條件運算子](https://en.wikipedia.org/wiki/Ternary_conditional_operator)的方法。如果 `a` 可以是零或一，您可以將 `if a { b } else { c }` 計算為 `ab+(1-a)c`。

正因為如此，Zokrates 的 `if` 敘述總是會評估兩個分支。例如，如果您有以下程式碼：

```
bool[5] arr = [false; 5];
u32 index=10;
return if index>4 { 0 } else { arr[index] }
```

它會發生錯誤，因為它需要計算 `arr[10]`，即使該值稍後會乘以零。

這就是我們需要在地圖周圍留出一個位置寬度邊界的原因。我們需要計算某個位置周圍的地雷總數，這意味著我們需要查看我們正在挖掘的位置的上一列和下一列、左側和右側的位置。這意味著這些位置必須存在於提供給 Zokrates 的地圖陣列中。

```
def main(private bool[${width+2}][${height+2}] map, u32 x, u32 y) -> (field, u8) {
```

預設情況下，Zokrates 證明包含其輸入。除非您確實知道是哪個位置，否則知道某個地點周圍有五顆地雷是沒有用的（而且您不能只是將其與您的請求進行比對，因為那樣證明者可能會使用不同的值而不告訴您）。然而，我們需要對地圖保密，同時將其提供給 Zokrates。解決方案是使用 `private` 參數，這是一個_不會_被證明揭露的參數。

這開啟了另一個濫用的途徑。證明者可以使用正確的座標，但建立一個在該位置周圍（甚至可能在該位置本身）有任意數量地雷的地圖。為了防止這種濫用，我們讓零知識證明包含地圖的雜湊，也就是遊戲識別碼。

```
return (hashMap(map),
```

這裡的回傳值是一個元組，包含地圖雜湊陣列以及挖掘結果。

```
if map2mineCount(map, x, y) > 0 { 0xFF } else {
```

我們使用 255 作為特殊值，以防該位置本身有炸彈。

```
map2mineCount(map, x-1, y-1) + map2mineCount(map, x, y-1) + map2mineCount(map, x+1, y-1) +
            map2mineCount(map, x-1, y) + map2mineCount(map, x+1, y) +
            map2mineCount(map, x-1, y+1) + map2mineCount(map, x, y+1) + map2mineCount(map, x+1, y+1)
         }
   );
}
```

如果玩家沒有踩到地雷，則將該位置周圍區域的地雷數量相加並回傳。

### 從 TypeScript 使用 Zokrates {#using-zokrates-from-typescript}

Zokrates 有一個命令列介面，但在這個程式中，我們在 [TypeScript 程式碼](https://zokrates.github.io/toolbox/zokrates_js.html)中使用它。

包含 Zokrates 定義的函式庫稱為 [`zero-knowledge.ts`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/zero-knowledge.ts)。

```typescript
import { initialize as zokratesInitialize } from "zokrates-js"
```

匯入 [Zokrates JavaScript 綁定](https://zokrates.github.io/toolbox/zokrates_js.html)。我們只需要 [`initialize`](https://zokrates.github.io/toolbox/zokrates_js.html#initialize) 函數，因為它會回傳一個解析為所有 Zokrates 定義的 promise。

```typescript
export const zkFunctions = async (width: number, height: number) : Promise<any> => {
```

與 Zokrates 本身類似，我們也只匯出一個函數，它同樣是[非同步的](https://www.w3schools.com/js/js_async.asp)。當它最終回傳時，它會提供幾個函數，我們將在下面看到。

```typescript
const zokrates = await zokratesInitialize()
```

初始化 Zokrates，從函式庫中取得我們需要的一切。

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

接下來是我們在上面看到的雜湊函數和兩個 Zokrates 程式。

```typescript
const digCompiled = zokrates.compile(digProgram)
const hashCompiled = zokrates.compile(hashProgram)
```

在這裡我們編譯這些程式。

```typescript
// 建立用於零知識驗證的金鑰。
// 在生產系統上，您會需要使用設定儀式。
// (https://zokrates.github.io/toolbox/trusted_setup.html#initializing-a-phase-2-ceremony).
const keySetupResults = zokrates.setup(digCompiled.program, "")
const verifierKey = keySetupResults.vk
const proverKey = keySetupResults.pk
```

在生產系統上，我們可能會使用更複雜的[設定儀式](https://zokrates.github.io/toolbox/trusted_setup.html#initializing-a-phase-2-ceremony)，但這對於示範來說已經足夠了。使用者知道證明者金鑰並不是問題——除非事情是真實的，否則他們仍然無法使用它來證明任何事情。因為我們指定了熵（第二個參數，`""`），所以結果將始終相同。

**注意：** Zokrates 程式的編譯和金鑰建立是緩慢的過程。不需要每次都重複這些步驟，只需在地圖大小改變時進行即可。在生產系統上，您只需執行一次，然後儲存輸出。我在這裡不這樣做的唯一原因為了簡單起見。

#### `calculateMapHash` {#calculatemaphash}

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

[`computeWitness`](https://zokrates.github.io/toolbox/zokrates_js.html#computewitnessartifacts-args-options) 函數實際執行 Zokrates 程式。它回傳一個包含兩個欄位的結構：`output`，這是程式作為 JSON 字串的輸出；以及 `witness`，這是建立結果的零知識證明所需的資訊。在這裡我們只需要輸出。

輸出是一個形式為 `"31337"` 的字串，即一個用引號括起來的十進位數字。但我們在 `viem` 中需要的輸出是形式為 `0x60A7` 的十六進位數字。因此，我們使用 `.slice(1,-1)` 移除引號，然後使用 `BigInt` 將剩餘的字串（這是一個十進位數字）轉換為 [`BigInt`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt)。`.toString(16)` 將這個 `BigInt` 轉換為十六進位字串，而 `"0x"+` 則加上十六進位數字的標記。

```typescript
// 挖掘並回傳結果的零知識證明
// (伺服器端程式碼)
```

零知識證明包含公開輸入（`x` 和 `y`）以及結果（地圖的雜湊和炸彈數量）。

```typescript
    const zkDig = function(map: boolean[][], x: number, y: number) : any {
        if (x<0 || x>=width || y<0 || y>=height)
            throw new Error("Trying to dig outside the map")
```

在 Zokrates 中檢查索引是否超出邊界是個問題，所以我們在這裡進行檢查。

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

使用 [`generateProof`](https://zokrates.github.io/toolbox/zokrates_js.html#generateproofprogram-witness-provingkey-entropy) 並回傳證明。

```typescript
const solidityVerifier = `
        // Map size: ${width} x ${height}
        \n${zokrates.exportSolidityVerifier(verifierKey)}
        `
```

一個 Solidity 驗證者，這是一個我們可以部署到區塊鏈上的智能合約，用於驗證由 `digCompiled.program` 產生的證明。

```typescript
    return {
        zkDig,
        calculateMapHash,
        solidityVerifier,
    }
}
```

最後，回傳其他程式碼可能需要的所有內容。

## 安全性測試 {#security-tests}

安全性測試非常重要，因為功能性錯誤最終會暴露出來。但如果應用程式不安全，這種情況很可能會隱藏很長一段時間，直到有人作弊並捲走屬於他人的資源時才會被發現。

### 權限 {#permissions}

在這個遊戲中有一個特權實體，即伺服器。它是唯一被允許呼叫 [`ServerSystem`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol) 中函數的使用者。我們可以使用 [`cast`](https://book.getfoundry.sh/cast/) 來驗證對許可制函數的呼叫是否僅限於伺服器帳戶。

[伺服器的私鑰位於 `setupNetwork.ts` 中](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/mud/setupNetwork.ts#L52)。

1. 在執行 `anvil`（區塊鏈）的電腦上，設定這些環境變數。

   ```sh copy
   WORLD_ADDRESS=0x8d8b6b8414e1e3dcfd4168561b9be6bd3bf6ec4b
   UNAUTHORIZED_KEY=0x5de4111afa1a4b94908f83103eb1f1706367c2e68ca870fc3fb9a804cdab365a
   AUTHORIZED_KEY=0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d
   ```

2. 使用 `cast` 嘗試將驗證者地址設定為未經授權的地址。

   ```sh copy
   cast send $WORLD_ADDRESS 'app__setVerifier(address)' `cast address-zero` --private-key $UNAUTHORIZED_KEY
   ```

   不僅 `cast` 會回報失敗，您還可以在瀏覽器上的遊戲中開啟 **MUD Dev Tools**，點擊 **Tables**，然後選擇 **app\_\_VerifierAddress**。您會看到該地址不為零。

3. 將驗證者地址設定為伺服器的地址。

   ```sh copy
   cast send $WORLD_ADDRESS 'app__setVerifier(address)' `cast address-zero` --private-key $AUTHORIZED_KEY
   ```

   現在 **app\_\_VerifiedAddress** 中的地址應該為零。

同一個 `System` 中的所有 MUD 函數都會經過相同的存取控制，因此我認為這個測試已經足夠。如果您覺得不夠，可以檢查 [`ServerSystem`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol) 中的其他函數。

### 零知識濫用 {#zero-knowledge-abuses}

驗證 Zokrates 的數學原理超出了本教學（以及我的能力）範圍。然而，我們可以對零知識程式碼執行各種檢查，以驗證如果實作不正確，它就會失敗。所有這些測試都需要我們更改 [`zero-knowledge.ts`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/zero-knowledge.ts) 並重新啟動整個應用程式。僅僅重新啟動伺服器程序是不夠的，因為這會使應用程式處於不可能的狀態（玩家有正在進行的遊戲，但伺服器已無法存取該遊戲）。

#### 錯誤的答案 {#wrong-answer}

最簡單的可能性是在零知識證明中提供錯誤的答案。為此，我們進入 `zkDig` 並[修改第 91 行](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/zero-knowledge.ts#L91)：

```ts
proof.inputs[3] = "0x" + "1".padStart(64, "0")
```

這意味著無論正確答案為何，我們都會始終聲稱有一顆炸彈。嘗試遊玩這個版本，您會在 `pnpm dev` 畫面的 **server** 分頁中看到此錯誤：

```
cause: {
        code: 3,
        message: 'execution reverted: revert: Zero knowledge verification fail',
        data: '0x08c379a0000000000000000000000000000000000000000000000000000000000000002000000000000000
000000000000000000000000000000000000000000000000205a65726f206b6e6f776c6564676520766572696669636174696f6
e206661696c'
      },
```

因此，這種作弊方式會失敗。

#### 錯誤的證明 {#wrong-proof}

如果我們提供正確的資訊，但證明資料錯誤，會發生什麼事？現在，將第 91 行替換為：

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

它仍然會失敗，但現在失敗沒有給出原因，因為它發生在呼叫驗證者期間。

### 使用者如何驗證零信任程式碼？ {#user-verify-zero-trust}

智能合約相對容易驗證。通常，開發者會將原始碼發佈到區塊鏈瀏覽器，而區塊鏈瀏覽器會驗證原始碼是否確實編譯為[合約部署交易](/developers/docs/smart-contracts/deploying/)中的程式碼。在 MUD `System` 的情況下，這會[稍微複雜一點](https://mud.dev/cli/verify)，但不會複雜太多。

這在零知識中比較困難。驗證者包含一些常數並對它們執行一些計算。這並不能告訴您正在證明什麼。

```solidity
    function verifyingKey() pure internal returns (VerifyingKey memory vk) {
        vk.alpha = Pairing.G1Point(uint256(0x0f43f4fe7b5c2326fed4ac6ed2f4003ab9ab4ea6f667c2bdd77afb068617ee16), uint256(0x25a77832283f9726935219b5f4678842cda465631e72dbb24708a97ba5d0ce6f));
        vk.beta = Pairing.G2Point([uint256(0x2cebd0fbd21aca01910581537b21ae4fed46bc0e524c055059aa164ba0a6b62b), uint256(0x18fd4a7bc386cf03a95af7163d5359165acc4e7961cb46519e6d9ee4a1e2b7e9)], [uint256(0x11449dee0199ef6d8eebfe43b548e875c69e7ce37705ee9a00c81fe52f11a009), uint256(0x066d0c83b32800d3f335bb9e8ed5e2924cf00e77e6ec28178592eac9898e1a00)]);
```

解決方案（至少在區塊鏈瀏覽器將 Zokrates 驗證加入其使用者介面之前）是讓應用程式開發者公開 Zokrates 程式，並讓至少一部分使用者使用適當的驗證金鑰自行編譯它們。

為此：

1. [安裝 Zokrates](https://zokrates.github.io/gettingstarted.html)。
2. 建立一個包含 Zokrates 程式的檔案 `dig.zok`。下方的程式碼假設您保留了原始的地圖大小，即 10x5。

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


    // 位置 (x,y) 的地雷數量
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

3. 編譯 Zokrates 程式碼並建立驗證金鑰。驗證金鑰必須使用與原始伺服器相同的熵來建立，[在此情況下為空字串](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/zero-knowledge.ts#L67)。

   ```sh copy
   zokrates compile --input dig.zok
   zokrates setup -e ""
   ```

4. 自行建立 Solidity 驗證者，並驗證其在功能上是否與區塊鏈上的驗證者相同（伺服器會加入註解，但這並不重要）。

   ```sh copy
   zokrates export-verifier
   diff verifier.sol ~/20240901-secret-state/packages/contracts/src/verifier.sol
   ```

## 設計決策 {#design}

在任何足夠複雜的應用程式中，都會有相互競爭的設計目標需要權衡。讓我們來看看一些權衡，以及為什麼目前的解決方案比其他選項更好。

### 為什麼需要零知識 {#why-zero-knowledge}

對於踩地雷遊戲，你其實不需要零知識。伺服器可以一直保留地圖，然後在遊戲結束時將其全部揭露。接著，在遊戲結束時，智能合約可以計算地圖雜湊，驗證它是否相符，如果不相符，則懲罰伺服器或完全作廢該遊戲。

我沒有使用這個較簡單的解決方案，因為它只適用於具有明確結束狀態的短期遊戲。當遊戲可能是無限的（例如[自主世界](https://0xparc.org/blog/autonomous-worlds)的情況），你需要一個能在_不_揭露狀態的情況下證明狀態的解決方案。

作為一篇教學文章，本文需要一個容易理解的短期遊戲，但這項技術對於較長的遊戲最為有用。

### 為什麼選擇 Zokrates？ {#why-zokrates}

[Zokrates](https://zokrates.github.io/) 並不是唯一可用的零知識函式庫，但它類似於一般的[指令式](https://en.wikipedia.org/wiki/Imperative_programming)程式語言，並且支援布林變數。

對於你的應用程式，如果有不同的需求，你可能會傾向使用 [Circum](https://docs.circom.io/getting-started/installation/) 或 [Cairo](https://www.cairo-lang.org/tutorials/getting-started-with-cairo/)。

### 何時編譯 Zokrates {#when-compile-zokrates}

在這個程式中，我們[每次伺服器啟動時](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/zero-knowledge.ts#L60-L61)都會編譯 Zokrates 程式。這顯然是浪費資源，但這是一篇教學文章，為了簡單起見而進行了最佳化。

如果我正在編寫生產等級的應用程式，我會檢查是否已經有這個地雷區大小的已編譯 Zokrates 程式檔案，如果有就使用它。在鏈上部署驗證者合約也是如此。

### 建立驗證者與證明者金鑰 {#key-creation}

[金鑰建立](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/zero-knowledge.ts#L63-L69)是另一種純粹的計算，對於給定的地雷區大小，不需要執行超過一次。同樣地，為了簡單起見，它只執行一次。

此外，我們可以使用[初始設定儀式 (setup ceremony)](https://zokrates.github.io/toolbox/trusted_setup.html#initializing-a-phase-2-ceremony)。初始設定儀式的優點在於，你需要來自每個參與者的熵或某些中間結果，才能在零知識證明上作弊。如果至少有一位儀式參與者是誠實的並刪除了該資訊，那麼零知識證明就能免受某些攻擊。然而，_沒有任何機制_可以驗證該資訊是否已從所有地方刪除。如果零知識證明至關重要，你會希望參與初始設定儀式。

在這裡，我們依賴有數十名參與者的 [perpetual powers of tau](https://github.com/privacy-scaling-explorations/perpetualpowersoftau)。它可能已經夠安全了，而且簡單得多。我們在金鑰建立期間也不會加入熵，這使得使用者更容易[驗證零知識配置](#user-verify-zero-trust)。

### 在哪裡驗證 {#where-verification}

我們可以在鏈上（這會消耗燃料）或在客戶端（使用 [`verify`](https://zokrates.github.io/toolbox/zokrates_js.html#verifyverificationkey-proof)）驗證零知識證明。我選擇了前者，因為這讓你可以[驗證驗證者](#user-verify-zero-trust)一次，然後只要它的合約地址保持不變，就可以信任它不會改變。如果在客戶端進行驗證，你每次下載客戶端時都必須驗證收到的程式碼。

此外，雖然這款遊戲是單人遊戲，但許多區塊鏈遊戲都是多人遊戲。鏈上驗證意味著你只需驗證零知識證明一次。在客戶端進行驗證則需要每個客戶端獨立驗證。

### 在 TypeScript 還是 Zokrates 中攤平地圖？ {#where-flatten}

一般來說，當處理可以在 TypeScript 或 Zokrates 中完成時，最好在 TypeScript 中進行，因為它快得多，而且不需要零知識證明。舉例來說，這就是為什麼我們不向 Zokrates 提供雜湊並讓它驗證其正確性的原因。雜湊運算必須在 Zokrates 內部完成，但回傳的雜湊與鏈上雜湊之間的比對可以在其外部進行。

然而，我們仍然[在 Zokrates 中攤平地圖](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/zero-knowledge.ts#L15-L20)，儘管我們本可以在 TypeScript 中完成。原因在於，我認為其他選項更糟。

- 提供一個一維布林陣列給 Zokrates 程式碼，並使用像是 `x*(height+2)
+y` 的表達式來取得二維地圖。這會讓[程式碼](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/zero-knowledge.ts#L44-L47)變得有些複雜，所以我認為對於一篇教學文章來說，效能的提升並不值得。

- 將一維陣列和二維陣列都傳送給 Zokrates。然而，這個解決方案對我們沒有任何好處。Zokrates 程式碼必須驗證提供給它的一維陣列確實是二維陣列的正確表示。因此不會有任何效能提升。

- 在 Zokrates 中攤平二維陣列。這是最簡單的選項，所以我選擇了它。

### 在哪裡儲存地圖 {#where-store-maps}

在這個應用程式中，[`gamesInProgress`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L20) 只是記憶體中的一個變數。這意味著如果你的伺服器當機並需要重新啟動，它儲存的所有資訊都會遺失。玩家不僅無法繼續他們的遊戲，甚至無法開始新遊戲，因為鏈上元件認為他們仍有遊戲正在進行中。

對於生產系統來說，這顯然是糟糕的設計，在生產系統中你會將這些資訊儲存在資料庫中。我在這裡使用變數的唯一原因是因為這是一篇教學文章，而簡單性是主要的考量。

## 結論：在什麼情況下這是合適的技術？ {#conclusion}

所以，現在您知道如何編寫一款遊戲，其伺服器儲存著不屬於鏈上的秘密狀態。但在什麼情況下您應該這樣做呢？主要有兩個考量。

- _長期運行的遊戲_：[如上所述](#why-zero-knowledge)，在短期遊戲中，您可以在遊戲結束後發佈狀態並在當時驗證所有內容。但當遊戲需要很長或無限期的時間，且狀態需要保持秘密時，這就不是一個可行的選項。

- _可接受某種程度的中心化_：零知識證明可以驗證完整性，確保實體沒有偽造結果。但它們無法確保該實體仍然可用並能回覆訊息。在可用性也需要去中心化的情況下，零知識證明並不是一個充分的解決方案，您需要[多方計算](https://en.wikipedia.org/wiki/Secure_multi-party_computation)。

[點擊此處查看我更多的作品](https://cryptodocguy.pro/)。

### 致謝 {#acknowledgements}

- Alvaro Alonso 閱讀了本文的草稿，並釐清了我對 Zokrates 的一些誤解。

任何剩餘的錯誤均由我本人負責。