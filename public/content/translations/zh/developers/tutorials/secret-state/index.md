---
title: 为保密状态使用零知识
description: 链上游戏受到限制，因为它们无法保留任何隐藏信息。 阅读本教程后，读者将能够结合零知识证明和服务器组件，创建具有脱链保密状态组件的可验证游戏。 我们将通过创建一个扫雷游戏来演示实现此目标的技术。
author: Ori Pomerantz
tags: [ "服务器", "链下", "中心化", "零知识", "zokrates", "mud" ]
skill: advanced
lang: zh
published: 2025-03-15
---

_区块链上没有秘密_。 发布在区块链上的所有内容都对所有人开放阅读。 这是必要的，因为区块链的基础是任何人都能对其进行验证。 然而，游戏通常依赖于保密状态。 例如，如果可以去区块链浏览器上查看地图，那么[扫雷](https://en.wikipedia.org/wiki/Minesweeper_\(video_game\))游戏就毫无意义。

最简单的解决方案是使用[服务器组件](/developers/tutorials/server-components/)来保存保密状态。 然而，我们使用区块链的原因是防止游戏开发者作弊。 我们需要确保服务器组件的诚实性。 服务器可以提供状态的哈希，并使用[零知识证明](/zero-knowledge-proofs/#why-zero-knowledge-proofs-are-important)来证明用于计算移动结果的状态是正确的。

阅读本文后，你将了解如何创建这种保存保密状态的服务器、用于显示状态的客户端以及用于两者之间通信的链上组件。 我们使用的主要工具将是：

| 工具                                            | 目的           |                                 已在版本上验证 |
| --------------------------------------------- | ------------ | --------------------------------------: |
| [Zokrates](https://zokrates.github.io/)       | 零知识证明及其验证    |   1.1.9 |
| [Typescript](https://www.typescriptlang.org/) | 服务器和客户端的编程语言 |   5.4.2 |
| [Node](https://nodejs.org/en)                 | 运行服务器        | 20.18.2 |
| [Viem](https://viem.sh/)                      | 与区块链通信       |  2.9.20 |
| [MUD](https://mud.dev/)                       | 链上数据管理       |  2.0.12 |
| [React](https://react.dev/)                   | 客户端用户界面      |  18.2.0 |
| [Vite](https://vitejs.dev/)                   | 提供客户端代码      |   4.2.1 |

## 扫雷示例 {#minesweeper}

[扫雷](https://en.wikipedia.org/wiki/Minesweeper_\(video_game\)) 是一款包含带雷区秘密地图的游戏。 玩家选择在特定位置挖掘。 如果该位置有地雷，游戏结束。 否则，玩家会得到该位置周围八个方格中的地雷数量。

此应用程序使用 [MUD](https://mud.dev/) 编写，这是一个允许我们使用[键值数据库](https://aws.amazon.com/nosql/key-value/)在链上存储数据并自动与脱链组件同步该数据的框架。 除了同步之外，MUD 还可以轻松地提供访问控制，并让其他用户无需许可即可[扩展](https://mud.dev/guides/extending-a-world)我们的应用程序。

### 运行扫雷示例 {#running-minesweeper-example}

要运行扫雷示例：

1. 确保你已[安装先决条件](https://mud.dev/quickstart#prerequisites)：[Node](https://mud.dev/quickstart#prerequisites)、[Foundry](https://book.getfoundry.sh/getting-started/installation)、[`git`](https://git-scm.com/downloads)、[`pnpm`](https://git-scm.com/downloads) 和 [`mprocs`](https://github.com/pvolok/mprocs)。

2. 克隆存储库。

   ```sh copy
   git clone https://github.com/qbzzt/20240901-secret-state.git
   ```

3. 安装软件包。

   ```sh copy
   cd 20240901-secret-state/\npnpm install\nnpm install -g mprocs
   ```

   如果 Foundry 是作为 `pnpm install` 的一部分安装的，你需要重新启动命令行 shell。

4. 编译合约

    ```sh copy
    cd packages/contracts\nforge build\ncd ../..
    ```

5. 启动程序（包括 [anvil](https://book.getfoundry.sh/anvil/) 区块链）并等待。

   ```sh copy
   mprocs
   ```

   请注意，启动需要很长时间。 要查看进度，首先使用向下箭头滚动到 _contracts_ 选项卡，查看正在部署的 MUD 合约。 当收到 _Waiting for file changes…_ 信息时，合约已部署，进一步的进度将在 _server_ 选项卡中进行。 在那里，等待直到收到信息 _Verifier address: 0x...._。

   如果此步骤成功，你将看到 `mprocs` 屏幕，左侧是不同的进程，右侧是当前选定进程的控制台输出。

   ![mprocs 屏幕](./mprocs.png)

   如果 `mprocs` 出现问题，你可以在各自的命令行窗口中手动运行四个进程：

   - **Anvil**

     ```sh
     cd packages/contracts\nanvil --base-fee 0 --block-time 2
     ```

   - **合约**

     ```sh
     cd packages/contracts\npnpm mud dev-contracts --rpc http://127.0.0.1:8545
     ```

   - **服务器**

     ```sh
     cd packages/server\npnpm start
     ```

   - **客户端**

     ```sh
     cd packages/client\npnpm run dev
     ```

6. 现在你可以浏览到[客户端](http://localhost:3000)，点击**新游戏**，然后开始玩。

### 表 {#tables}

我们需要在链上创建[多个表](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/mud.config.ts)。

- `Configuration`：此表是单例，没有键，只有一条记录。 它用于保存游戏配置信息：
  - `height`：雷区的高度
  - `width`：雷区的宽度
  - `numberOfBombs`：每个雷区中的炸弹数量

- `VerifierAddress`：此表也是单例。 它用于保存配置的一部分，即验证者合约 (`verifier`) 的地址。 我们可以将此信息放在 `Configuration` 表中，但它是由不同的组件（服务器）设置的，因此将其放在单独的表中更容易。

- `PlayerGame`：键是玩家的地址。 数据为：

  - `gameId`：32 字节的值，是玩家正在玩的地图的哈希（游戏标识符）。
  - `win`：一个布尔值，表示玩家是否赢得游戏。
  - `lose`：一个布尔值，表示玩家是否输掉游戏。
  - `digNumber`：游戏中成功挖掘的次数。

- `GamePlayer`：此表保存反向映射，从 `gameId` 到玩家地址。

- `Map`：键是包含三个值的元组：

  - `gameId`：32 字节的值，是玩家正在玩的地图的哈希（游戏标识符）。
  - `x` 坐标
  - `y` 坐标

  值是一个数字。 如果检测到炸弹，则为 255。 否则，它是该位置周围的炸弹数量加一。 我们不能只使用炸弹的数量，因为默认情况下 EVM 中的所有存储和 MUD 中的所有行值都为零。 我们需要区分“玩家还没有在这里挖掘”和“玩家在这里挖掘了，发现周围没有炸弹”。

此外，客户端和服务器之间的通信通过链上组件进行。 这也是使用表实现的。

- `PendingGame`：未处理的开始新游戏的请求。
- `PendingDig`：未处理的在特定游戏中特定位置挖掘的请求。 这是一个[脱链表](https://mud.dev/store/tables#types-of-tables)，意味着它不会写入 EVM 存储，只能使用事件在脱链上读取。

### 执行和数据流 {#execution-data-flows}

这些流程协调客户端、链上组件和服务器之间的执行。

#### 初始化 {#initialization-flow}

当你运行 `mprocs` 时，会发生以下步骤：

1. [`mprocs`](https://github.com/pvolok/mprocs) 运行四个组件：

   - [Anvil](https://book.getfoundry.sh/anvil/)，运行本地区块链
   - [Contracts](https://github.com/qbzzt/20240901-secret-state/tree/main/packages/contracts)，它会编译（如果需要）和部署 MUD 的合约
   - [Client](https://github.com/qbzzt/20240901-secret-state/tree/main/packages/client)，它运行 [Vite](https://vitejs.dev/) 来为网络浏览器提供 UI 和客户端代码。
   - [Server](https://github.com/qbzzt/20240901-secret-state/tree/main/packages/server)，它执行服务器操作

2. `contracts` 包部署 MUD 合约，然后运行[ `PostDeploy.s.sol` 脚本](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/script/PostDeploy.s.sol)。 此脚本设置配置。 来自 github 的代码指定了[一个 10x5 的雷区，其中有 8 个地雷](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/script/PostDeploy.s.sol#L23)。

3. [服务器](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts) 通过[设置 MUD](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L6) 来启动。 除此之外，这会激活数据同步，以便在服务器内存中存在相关表的副本。

4. 服务器订阅一个函数，该函数在 [`Configuration` 表更改时](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L23)执行。 `PostDeploy.s.sol` 执行并修改表后，会调用[此函数](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L24-L168)。

5. 当服务器初始化函数获取配置后，[它会调用 `zkFunctions`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L34-L35)来初始化[服务器的零知识部分](#using-zokrates-from-typescript)。 这只有在我们获得配置后才能发生，因为零知识函数必须将雷区的宽度和高度作为常量。

6. 服务器的零知识部分初始化后，下一步是[将零知识验证合约部署到区块链](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L42-L53)并在 MUD 中设置被验证者地址。

7. 最后，我们订阅更新，这样当玩家请求[开始新游戏](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L55-L71)或[在现有游戏中挖掘](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L73-L108)时，我们就能看到。

#### 新游戏 {#new-game-flow}

这是当玩家请求新游戏时发生的情况。

1. 如果此玩家没有进行中的游戏，或者有一个但 gameId 为零的游戏，客户端会显示一个[新游戏按钮](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/client/src/App.tsx#L175)。 当用户按下此按钮时，[React 会运行 `newGame` 函数](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/client/src/App.tsx#L96)。

2. [`newGame`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/client/src/mud/createSystemCalls.ts#L43-L46) 是一个 `System` 调用。 在 MUD 中，所有调用都通过 `World` 合约路由，在大多数情况下，你调用 `<namespace>__<function name>`。 在这种情况下，调用的是 `app__newGame`，然后 MUD 将其路由到 [`GameSystem` 中的 `newGame`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/GameSystem.sol#L16-L22)。

3. 链上函数检查玩家是否没有进行中的游戏，如果没有，则[将请求添加到 `PendingGame` 表](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/GameSystem.sol#L21)。

4. 服务器检测到 `PendingGame` 中的更改并[运行订阅的函数](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L55-L71)。 此函数调用 [`newGame`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L110-L114)，后者又调用 [`createGame`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L116-L144)。

5. `createGame` 做的第一件事是[创建一个包含适当数量地雷的随机地图](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L120-L135)。 然后，它调用 [`makeMapBorders`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L147-L166) 来创建一张带有空白边框的地图，这对于 Zokrates 是必需的。 最后，`createGame`调用 [`calculateMapHash`](#calculateMapHash)，以获取地图的哈希，该哈希用作游戏 ID。

6. `newGame` 函数将新游戏添加到 `gamesInProgress`。

7. 服务器做的最后一件事是调用 [`app__newGameResponse`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol#L38-L43)，这是链上操作。 此函数位于不同的 `System` 中，即 [`ServerSystem`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol)，以启用访问控制。 访问控制在 [MUD 配置文件](https://mud.dev/config) [`mud.config.ts`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/mud.config.ts#L67-L72) 中定义。

   访问列表只允许单个地址调用 `System`。 这将服务器功能的访问权限限制为单个地址，因此没有人可以冒充服务器。

8. 链上组件更新相关表：

   - 在 `PlayerGame` 中创建游戏。
   - 在 `GamePlayer` 中设置反向映射。
   - 从 `PendingGame` 中删除请求。

9. 服务器识别到 `PendingGame` 中的变化，但由于 [`wantsGame`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L58-L60) 为 false，因此不执行任何操作。

10. 在客户端，[`gameRecord`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/client/src/App.tsx#L143-L148) 被设置为玩家地址的 `PlayerGame` 条目。 当 `PlayerGame` 改变时，`gameRecord` 也会改变。

11. 如果 `gameRecord` 中有值，并且游戏尚未分出胜负，客户端会[显示地图](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/client/src/App.tsx#L175-L190)。

#### 挖掘 {#dig-flow}

1. 玩家[点击地图单元格的按钮](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/client/src/App.tsx#L188)，这会调用 [`dig` 函数](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/client/src/mud/createSystemCalls.ts#L33-L36)。 此函数在链上调用 [`dig`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/GameSystem.sol#L24-L32)。

2. 链上组件[执行多项健全性检查](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/GameSystem.sol#L25-L30)，如果成功，则将挖掘请求添加到 [`PendingDig`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/GameSystem.sol#L31)。

3. 服务器[检测到 `PendingDig` 中的变化](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L73)。 [如果有效](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L75-L84)，它会[调用零知识代码](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L86-L95)（如下所述）来生成结果和证明其有效的证据。

4. [服务器](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L97-L107) 在链上调用 [`digResponse`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol#L45-L64)。

5. `digResponse` 做两件事。 首先，它检查[零知识证明](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol#L47-L61)。 然后，如果证明通过，它会调用 [`processDigResult`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol#L67-L86) 来实际处理结果。

6. `processDigResult` 检查游戏是否[失败](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol#L76-L78)或[获胜](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol#L83-L86)，并[更新 `Map`（链上地图）](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol#L80)。

7. 客户端会自动获取更新并[更新显示给玩家的地图](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/client/src/App.tsx#L175-L190)，并在适用时告知玩家是赢是输。

## 使用 Zokrates {#using-zokrates}

在上面解释的流程中，我们跳过了零知识部分，将其视为一个黑匣子。 现在让我们打开它，看看这段代码是如何编写的。

### 对地图进行哈希 {#hashing-map}

我们可以使用[此 JavaScript 代码](https://github.com/ZK-Plus/ICBC24_Tutorial_Compute-Offchain-Verify-onchain/tree/solutions/exercise) 来实现我们使用的 Zokrates 哈希函数 [Poseidon](https://www.poseidon-hash.info)。 然而，虽然这样做会更快，但也会比仅仅使用 Zokrates 哈希函数来做要复杂得多。 这是一个教程，因此代码为简单性而非性能进行了优化。 因此，我们需要两个不同的 Zokrates 程序，一个仅用于计算地图的哈希（`hash`），另一个用于实际创建地图上某个位置挖掘结果的零知识证明（`dig`）。

### 哈希函数 {#hash-function}

这是计算地图哈希的函数。 我们将逐行分析这段代码。

```
import "hashes/poseidon/poseidon.zok" as poseidon;\nimport "utils/pack/bool/pack128.zok" as pack128;
```

这两行从 [Zokrates 标准程序库](https://zokrates.github.io/toolbox/stdlib.html)中导入两个函数。 [第一个函数](https://github.com/Zokrates/ZoKrates/blob/latest/zokrates_stdlib/stdlib/hashes/poseidon/poseidon.zok)是 [Poseidon 哈希](https://www.poseidon-hash.info/)。 它接受一个 [`field` 元素](https://zokrates.github.io/language/types.html#field)数组并返回一个 `field`。

Zokrates 中的字段元素通常小于 256 位，但相差不大。 为了简化代码，我们将地图限制为最多 512 位，并对一个包含四个字段的数组进行哈希，每个字段我们只使用 128 位。 为此，[`pack128` 函数](https://github.com/Zokrates/ZoKrates/blob/latest/zokrates_stdlib/stdlib/utils/pack/bool/pack128.zok)将一个 128 位数组转换为一个 `field`。

```
        def hashMap(bool[${width+2}][${height+2}] map) -> field {
```

这一行开始了一个函数定义。 `hashMap` 接受一个名为 `map` 的参数，它是一个二维 `bool`(ean) 数组。 地图的尺寸是 `width+2` 乘以 `height+2`，原因[在下面解释](#why-map-border)。

我们可以使用 `${width+2}` 和 `${height+2}`，因为 Zokrates 程序在此应用程序中作为[模板字符串](https://www.w3schools.com/js/js_string_templates.asp)存储。 `${` 和 `}` 之间的代码由 JavaScript 评估，这样程序就可以用于不同的地图大小。 地图参数周围有一个单位宽度的无炸弹边框，这就是我们需要将宽度和高度加二的原因。

返回值是一个包含哈希的 `field`。

```
   bool[512] mut map1d = [false; 512];
```

地图是二维的。 然而，`pack128` 函数不适用于二维数组。 所以我们首先使用 `map1d` 将地图展平为一个 512 字节的数组。 默认情况下，Zokrates 变量是常量，但我们需要在循环中为这个数组赋值，所以我们将其定义为 [`mut`](https://zokrates.github.io/language/variables.html#mutability)。

我们需要初始化数组，因为 Zokrates 没有 `undefined`。 `[false; 512]` 表达式表示[一个包含 512 个 `false` 值的数组](https://zokrates.github.io/language/types.html#declaration-and-initialization)。

```
   u32 mut counter = 0;
```

我们还需要一个计数器来区分我们在 `map1d` 中已经填充的位和尚未填充的位。

```
   for u32 x in 0..${width+2} {
```

这是在 Zokrates 中声明 [`for` 循环](https://zokrates.github.io/language/control_flow.html#for-loops)的方式。 Zokrates 的 `for` 循环必须有固定的边界，因为虽然它看起来像一个循环，但编译器实际上会“展开”它。 表达式 `${width+2}` 是一个编译时常量，因为 `width` 是在 TypeScript 代码调用编译器之前设置的。

```
      for u32 y in 0..${height+2} {\n         map1d[counter] = map[x][y];\n         counter = counter+1;\n      }\n   }
```

对于地图中的每个位置，将该值放入 `map1d` 数组并增加计数器。

```
    field[4] hashMe = [\n        pack128(map1d[0..128]),\n        pack128(map1d[128..256]),\n        pack128(map1d[256..384]),\n        pack128(map1d[384..512])\n    ];
```

`pack128` 用于从 `map1d` 创建一个包含四个 `field` 值的数组。 在 Zokrates 中，`array[a..b]` 表示从 `a` 开始到 `b-1` 结束的数组切片。

```
    return poseidon(hashMe);\n}
```

使用 `poseidon` 将此数组转换为哈希。

### 哈希程序 {#hash-program}

服务器需要直接调用 `hashMap` 来创建游戏标识符。 然而，Zokrates 只能调用程序上的 `main` 函数来启动，所以我们创建了一个带有 `main` 的程序，该程序调用哈希函数。

```
${hashFragment}\n\ndef main(bool[${width+2}][${height+2}] map) -> field {\n    return hashMap(map);\n}
```

### 挖掘程序 {#dig-program}

这是应用程序零知识部分的核心，我们在这里生成用于验证挖掘结果的证明。

```
${hashFragment}\n\n// (x,y) 位置的地雷数量\ndef map2mineCount(bool[${width+2}][${height+2}] map, u32 x, u32 y) -> u8 {\n   return if map[x+1][y+1] { 1 } else { 0 };\n}
```

#### 为何需要地图边框 {#why-map-border}

零知识证明使用[算术电路](https://medium.com/web3studio/simple-explanations-of-arithmetic-circuits-and-zero-knowledge-proofs-806e59a79785)，它没有 `if` 语句的简单等价物。 相反，它们使用[条件运算符](https://en.wikipedia.org/wiki/Ternary_conditional_operator)的等价物。 如果 `a` 可以是零或一，你可以将 `if a { b } else { c }` 计算为 `ab+(1-a)c`。

因此，Zokrates 的 `if` 语句总是会评估两个分支。 例如，如果你有以下代码：

```
bool[5] arr = [false; 5];\nu32 index=10;\nreturn if index>4 { 0 } else { arr[index] }
```

它会出错，因为它需要计算 `arr[10]`，即使该值稍后会乘以零。

这就是为什么我们需要在地图周围设置一个单位宽度的边框。 我们需要计算一个位置周围的地雷总数，这意味着我们需要看到我们正在挖掘的位置的上方一行、下方一行、左边和右边的位置。 这意味着这些位置必须存在于提供给 Zokrates 的地图数组中。

```
def main(private bool[${width+2}][${height+2}] map, u32 x, u32 y) -> (field, u8) {
```

默认情况下，Zokrates 证明包含其输入。 知道一个地点周围有五个地雷是没有用的，除非你真的知道是哪个地点（而且你不能仅仅将它与你的请求匹配，因为那样证明者可能会使用不同的值而不会告诉你）。 然而，我们需要在将地图提供给 Zokrates 的同时保持其保密。 解决方案是使用一个 `private` 参数，一个_不_被证明揭示的参数。

这为滥用开辟了另一条途径。 证明者可以使用正确的坐标，但在该位置周围创建一个包含任意数量地雷的地图，甚至可能在该位置本身创建地雷。 为防止这种滥用，我们让零知识证明包含地图的哈希，即游戏标识符。

```
   return (hashMap(map),
```

这里的返回值是一个元组，包括地图哈希数组和挖掘结果。

```
         if map2mineCount(map, x, y) > 0 { 0xFF } else {
```

如果该位置本身有炸弹，我们使用 255 作为特殊值。

```
            map2mineCount(map, x-1, y-1) + map2mineCount(map, x, y-1) + map2mineCount(map, x+1, y-1) +\n            map2mineCount(map, x-1, y) + map2mineCount(map, x+1, y) +\n            map2mineCount(map, x-1, y+1) + map2mineCount(map, x, y+1) + map2mineCount(map, x+1, y+1)\n         }\n   );\n}
```

如果玩家没有踩到地雷，则将该位置周围区域的地雷数量相加并返回。

### 在 TypeScript 中使用 Zokrates {#using-zokrates-from-typescript}

Zokrates 有一个命令行界面，但在这个程序中，我们在 [TypeScript 代码](https://zokrates.github.io/toolbox/zokrates_js.html)中使用它。

包含 Zokrates 定义的程序库名为 [`zero-knowledge.ts`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/zero-knowledge.ts)。

```typescript
import { initialize as zokratesInitialize } from "zokrates-js"
```

导入 [Zokrates JavaScript 绑定](https://zokrates.github.io/toolbox/zokrates_js.html)。 我们只需要 [`initialize`](https://zokrates.github.io/toolbox/zokrates_js.html#initialize) 函数，因为它返回一个解析为所有 Zokrates 定义的 promise。

```typescript
export const zkFunctions = async (width: number, height: number) : Promise<any> => {
```

与 Zokrates 本身类似，我们也只导出一个函数，该函数也是[异步的](https://www.w3schools.com/js/js_async.asp)。 当它最终返回时，它提供了几个函数，如下所示。

```typescript
const zokrates = await zokratesInitialize()
```

初始化 Zokrates，从程序库中获取我们需要的一切。

```typescript
const hashFragment = `\n        import "utils/pack/bool/pack128.zok" as pack128;\n        import "hashes/poseidon/poseidon.zok" as poseidon;\n            .\n            .\n            .\n        }\n    `\n\nconst hashProgram = `\n        ${hashFragment}\n            .\n            .\n            .\n    `\n\nconst digProgram = `\n        ${hashFragment}\n            .\n            .\n            .\n    `
```

接下来是我们上面看到的哈希函数和两个 Zokrates 程序。

```typescript
const digCompiled = zokrates.compile(digProgram)\nconst hashCompiled = zokrates.compile(hashProgram)
```

这里我们编译这些程序。

```typescript
// 为零知识验证创建密钥。\n// 在生产系统上，您需要使用设置仪式。\n// (https://zokrates.github.io/toolbox/trusted_setup.html#initializing-a-phase-2-ceremony)。\nconst keySetupResults = zokrates.setup(digCompiled.program, "")\nconst verifierKey = keySetupResults.vk\nconst proverKey = keySetupResults.pk
```

在生产系统上，我们可能会使用更复杂的[设置仪式](https://zokrates.github.io/toolbox/trusted_setup.html#initializing-a-phase-2-ceremony)，但对于演示来说，这已经足够了。 用户知道证明者密钥不是问题 - 他们仍然不能用它来证明事情，除非它们是真实的。 因为我们指定了熵（第二个参数，`""`），所以结果总是相同的。

\*\*注意：\*\*Zokrates 程序的编译和密钥创建是缓慢的过程。 不需要每次都重复它们，只需在地图大小改变时重复即可。 在生产系统上，你只需执行一次，然后存储输出。 我在这里不这样做只是为了简单起见。

#### `calculateMapHash` {#calculateMapHash}

```typescript
const calculateMapHash = function (hashMe: boolean[][]): string {\n  return (\n    "0x" +\n    BigInt(zokrates.computeWitness(hashCompiled, [hashMe]).output.slice(1, -1))\n      .toString(16)\n      .padStart(64, "0")\n  )\n}
```

[`computeWitness`](https://zokrates.github.io/toolbox/zokrates_js.html#computewitnessartifacts-args-options) 函数实际上运行 Zokrates 程序。 它返回一个包含两个字段的结构：`output`，即程序的输出（作为 JSON 字符串），和 `witness`，即创建结果的零知识证明所需的信息。 在这里，我们只需要输出。

输出是一个形如 `"31337"` 的字符串，即一个用引号括起来的十进制数。 但我们需要的 `viem` 输出是形如 `0x60A7` 的十六进制数。 所以我们使用 `.slice(1,-1)` 去掉引号，然后用 `BigInt` 将剩余的字符串（一个十进制数）转换成一个 [`BigInt`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt)。 `.toString(16)` 将这个 `BigInt` 转换成一个十六进制字符串，`"0x"+` 添加了十六进制数的标记。

```typescript
// 挖掘并返回结果的零知识证明\n// (服务器端代码)
```

零知识证明包括公共输入（`x` 和 `y`）和结果（地图的哈希和炸弹数量）。

```typescript
    const zkDig = function(map: boolean[][], x: number, y: number) : any {\n        if (x<0 || x>=width || y<0 || y>=height)\n            throw new Error("Trying to dig outside the map")
```

在 Zokrates 中检查索引是否越界是个问题，所以我们在这里做。

```typescript
const runResults = zokrates.computeWitness(digCompiled, [map, `${x}`, `${y}`])
```

执行挖掘程序。

```typescript
        const proof = zokrates.generateProof(\n            digCompiled.program,\n            runResults.witness,\n            proverKey)\n\n        return proof\n    }
```

使用 [`generateProof`](https://zokrates.github.io/toolbox/zokrates_js.html#generateproofprogram-witness-provingkey-entropy) 并返回证明。

```typescript
const solidityVerifier = `\n        // 地图尺寸: ${width} x ${height}\n        \n${zokrates.exportSolidityVerifier(verifierKey)}\n        `
```

一个 Solidity 验证者，这是一个我们可以部署到区块链并用于验证 `digCompiled.program` 生成的证明的智能合约。

```typescript
    return {\n        zkDig,\n        calculateMapHash,\n        solidityVerifier,\n    }\n}
```

最后，返回其他代码可能需要的所有内容。

## 安全测试 {#security-tests}

安全测试很重要，因为功能性漏洞最终会暴露出来。 但如果应用程序不安全，那么在有人作弊并窃取他人资源而被揭露之前，这种不安全性很可能会隐藏很长一段时间。

### 权限 {#permissions}

这个游戏中有一个特权实体，即服务器。 它是唯一允许调用 [`ServerSystem`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol) 中函数的用户。 我们可以使用 [`cast`](https://book.getfoundry.sh/cast/) 来验证对有权限函数的调用是否只允许作为服务器帐户进行。

[服务器的私钥位于 `setupNetwork.ts`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/mud/setupNetwork.ts#L52)。

1. 在运行 `anvil`（区块链）的计算机上，设置这些环境变量。

   ```sh copy
   WORLD_ADDRESS=0x8d8b6b8414e1e3dcfd4168561b9be6bd3bf6ec4b\nUNAUTHORIZED_KEY=0x5de4111afa1a4b94908f83103eb1f1706367c2e68ca870fc3fb9a804cdab365a\nAUTHORIZED_KEY=0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d
   ```

2. 使用 `cast` 尝试将验证者地址设置为未经授权的地址。

   ```sh copy
   cast send $WORLD_ADDRESS 'app__setVerifier(address)' `cast address-zero` --private-key $UNAUTHORIZED_KEY
   ```

   不仅 `cast` 会报告失败，你还可以在浏览器中的游戏中打开 **MUD 开发工具**，点击**表格**，然后选择 **app\_\_VerifierAddress**。 看到地址不为零。

3. 将验证者地址设置为服务器的地址。

   ```sh copy
   cast send $WORLD_ADDRESS 'app__setVerifier(address)' `cast address-zero` --private-key $AUTHORIZED_KEY
   ```

   **app\_\_VerifiedAddress** 中的地址现在应该为零。

同一 `System` 中的所有 MUD 函数都经过相同的访问控制，因此我认为此测试已足够。 如果你不这么认为，可以检查 [`ServerSystem`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol) 中的其他函数。

### 零知识滥用 {#zero-knowledge-abuses}

验证 Zokrates 的数学超出了本教程的范围（也超出了我的能力）。 然而，我们可以对零知识代码运行各种检查，以验证如果操作不正确，它会失败。 所有这些测试都将要求我们更改 [`zero-knowledge.ts`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/zero-knowledge.ts) 并重新启动整个应用程序。 仅仅重新启动服务器进程是不够的，因为它会将应用程序置于一种不可能的状态（玩家正在进行游戏，但服务器不再可用该游戏）。

#### 错误答案 {#wrong-answer}

最简单的可能性是在零知识证明中提供错误的答案。 为此，我们进入 `zkDig` 内部并[修改第 91 行](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/zero-knowledge.ts#L91)：

```ts
proof.inputs[3] = "0x" + "1".padStart(64, "0")
```

这意味着无论正确答案是什么，我们总是声称只有一个炸弹。 尝试玩这个版本，你会在 `pnpm dev` 屏幕的**服务器**选项卡中看到这个错误：

```
      cause: {\n        code: 3,\n        message: 'execution reverted: revert: Zero knowledge verification fail',\n        data: '0x08c379a0000000000000000000000000000000000000000000000000000000000000002000000000000000\n000000000000000000000000000000000000000000000000205a65726f206b6e6f776c6564676520766572696669636174696f6\ne206661696c'\n      },
```

所以这种作弊会失败。

#### 错误的证明 {#wrong-proof}

如果我们提供正确的信息，但只有错误的证明数据，会发生什么？ 现在，将第 91 行替换为：

```ts
proof.proof = {\n  a: ["0x" + "1".padStart(64, "0"), "0x" + "2".padStart(64, "0")],\n  b: [\n    ["0x" + "1".padStart(64, "0"), "0x" + "2".padStart(64, "0")],\n    ["0x" + "1".padStart(64, "0"), "0x" + "2".padStart(64, "0")],\n  ],\n  c: ["0x" + "1".padStart(64, "0"), "0x" + "2".padStart(64, "0")],\n}
```

它仍然失败，但现在它失败时没有给出原因，因为它是在验证者调用期间发生的。

### 用户如何验证零信任代码？ {#user-verify-zero-trust}

智能合约相对容易验证。 通常，开发者会将源代码发布到区块浏览器，区块浏览器会验证源代码确实能编译成[合约部署交易](/developers/docs/smart-contracts/deploying/)中的代码。 在 MUD `System` 的情况下，这[稍微复杂一些](https://mud.dev/cli/verify)，但相差不大。

对于零知识来说，这更难。 验证者包含一些常量并对它们进行一些计算。 这并不能告诉你正在证明什么。

```solidity
    function verifyingKey() pure internal returns (VerifyingKey memory vk) {\n        vk.alpha = Pairing.G1Point(uint256(0x0f43f4fe7b5c2326fed4ac6ed2f4003ab9ab4ea6f667c2bdd77afb068617ee16), uint256(0x25a77832283f9726935219b5f4678842cda465631e72dbb24708a97ba5d0ce6f));\n        vk.beta = Pairing.G2Point([uint256(0x2cebd0fbd21aca01910581537b21ae4fed46bc0e524c055059aa164ba0a6b62b), uint256(0x18fd4a7bc386cf03a95af7163d5359165acc4e7961cb46519e6d9ee4a1e2b7e9)], [uint256(0x11449dee0199ef6d8eebfe43b548e875c69e7ce37705ee9a00c81fe52f11a009), uint256(0x066d0c83b32800d3f335bb9e8ed5e2924cf00e77e6ec28178592eac9898e1a00)]);
```

解决方案是，至少在区块浏览器将 Zokrates 验证添加到其用户界面之前，应用程序开发者应提供 Zokrates 程序，并且至少有一些用户使用适当的验证密钥自行编译它们。

要做到这一点：

1. [安装 Zokrates](https://zokrates.github.io/gettingstarted.html)。

2. 创建一个文件 `dig.zok`，包含 Zokrates 程序。 下面的代码假设你保留了原始地图尺寸 10x5。

   ```zokrates
    import "utils/pack/bool/pack128.zok" as pack128;\n import "hashes/poseidon/poseidon.zok" as poseidon;\n\n def hashMap(bool[12][7] map) -> field {\n     bool[512] mut map1d = [false; 512];\n     u32 mut counter = 0;\n\n     for u32 x in 0..12 {\n         for u32 y in 0..7 {\n             map1d[counter] = map[x][y];\n             counter = counter+1;\n         }\n     }\n\n     field[4] hashMe = [\n         pack128(map1d[0..128]),\n         pack128(map1d[128..256]),\n         pack128(map1d[256..384]),\n         pack128(map1d[384..512])\n     ];\n\n     return poseidon(hashMe);\n }\n\n\n // (x,y) 位置的地雷数量\n def map2mineCount(bool[12][7] map, u32 x, u32 y) -> u8 {\n     return if map[x+1][y+1] { 1 } else { 0 };\n }\n\n def main(private bool[12][7] map, u32 x, u32 y) -> (field, u8) {\n     return (hashMap(map) ,\n         if map2mineCount(map, x, y) > 0 { 0xFF } else {\n             map2mineCount(map, x-1, y-1) + map2mineCount(map, x, y-1) + map2mineCount(map, x+1, y-1) +\n             map2mineCount(map, x-1, y) + map2mineCount(map, x+1, y) +\n             map2mineCount(map, x-1, y+1) + map2mineCount(map, x, y+1) + map2mineCount(map, x+1, y+1)\n         }\n     );\n }
   ```

3. 编译 Zokrates 代码并创建验证密钥。 验证密钥必须使用与原始服务器相同的熵来创建，[在这种情况下为空字符串](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/zero-knowledge.ts#L67)。

   ```sh copy
   zokrates compile --input dig.zok\nzokrates setup -e ""
   ```

4. 自己创建 Solidity 验证者，并验证其功能与区块链上的验证者相同（服务器添加了一条注释，但这不重要）。

   ```sh copy
   zokrates export-verifier\ndiff verifier.sol ~/20240901-secret-state/packages/contracts/src/verifier.sol
   ```

## 设计决策 {#design}

在任何足够复杂的应用程序中，都存在需要权衡取舍的相互竞争的设计目标。 让我们看看一些权衡取舍，以及为什么当前的解决方案比其他选项更可取。

### 为何使用零知识 {#why-zero-knowledge}

对于扫雷游戏，你并不真正需要零知识。 服务器可以一直持有地图，然后在游戏结束时才全部揭示。 然后，在游戏结束时，智能合约可以计算地图哈希，验证其是否匹配，如果不匹配，则惩罚服务器或完全忽略该游戏。

我没有使用这个更简单的解决方案，因为它只适用于具有明确定义的结束状态的短时游戏。 当一个游戏可能是无限的（例如[自治世界](https://0xparc.org/blog/autonomous-worlds)），你需要一个在_不_揭示状态的情况下证明其状态的解决方案。

作为一篇教程，本文需要一个易于理解的短时游戏，但这项技术对于较长的游戏最为有用。

### 为何选择 Zokrates？ {#why-zokrates}

[Zokrates](https://zokrates.github.io/) 不是唯一可用的零知识程序库，但它类似于一种普通的[命令式](https://en.wikipedia.org/wiki/Imperative_programming)编程语言，并支持布尔变量。

对于你的应用程序，如果有不同的需求，你可能更愿意使用 [Circum](https://docs.circom.io/getting-started/installation/) 或 [Cairo](https://www.cairo-lang.org/tutorials/getting-started-with-cairo/)。

### 何时编译 Zokrates {#when-compile-zokrates}

在这个程序中，我们[每次服务器启动时](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/zero-knowledge.ts#L60-L61)都会编译 Zokrates 程序。 这显然是浪费资源，但这是一个教程，为简单性而优化。

如果我正在编写一个生产级应用程序，我会检查是否有一个包含此雷区大小的已编译 Zokrates 程序的文件，如果有，就使用它。 在链上部署验证者合约也是如此。

### 创建验证者和证明者密钥 {#key-creation}

[密钥创建](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/zero-knowledge.ts#L63-L69)是另一个纯计算，对于给定的雷区大小，不需要执行多次。 同样，为了简单起见，它只执行一次。

此外，我们可以使用[一个设置仪式](https://zokrates.github.io/toolbox/trusted_setup.html#initializing-a-phase-2-ceremony)。 设置仪式的优点是，你需要每个参与者的熵或一些中间结果才能在零知识证明上作弊。 如果至少有一名仪式参与者是诚实的并删除了该信息，那么零知识证明就可以免受某些攻击。 然而，_没有机制_可以验证信息已从所有地方删除。 如果零知识证明至关重要，你应参与设置仪式。

在这里，我们依赖于[perpetual powers of tau](https://github.com/privacy-scaling-explorations/perpetualpowersoftau)，它有数十名参与者。 这可能足够安全，而且简单得多。 我们也不在密钥创建期间添加熵，这使得用户更容易[验证零知识配置](#user-verify-zero-trust)。

### 在哪里验证 {#where-verification}

我们可以在链上（需要消耗燃料）或客户端（使用 [`verify`](https://zokrates.github.io/toolbox/zokrates_js.html#verifyverificationkey-proof)）验证零知识证明。 我选择了第一种，因为这让你可以[验证验证者](#user-verify-zero-trust)一次，然后只要其合约地址保持不变，就可以信任它不会改变。 如果在客户端进行验证，你每次下载客户端时都必须验证收到的代码。

此外，虽然这个游戏是单人游戏，但许多区块链游戏是多人游戏。 链上验证意味着你只需验证一次零知识证明。 在客户端进行验证将需要每个客户端独立验证。

### 在 TypeScript 还是 Zokrates 中展平地图？ {#where-flatten}

总的来说，当处理可以在 TypeScript 或 Zokrates 中完成时，最好在 TypeScript 中完成，因为它速度快得多，并且不需要零知识证明。 例如，这就是我们不向 Zokrates 提供哈希并让其验证其正确性的原因。 哈希必须在 Zokrates 内部完成，但返回的哈希与链上哈希之间的匹配可以在其外部进行。

然而，我们仍然在 [Zokrates 中展平地图](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/zero-knowledge.ts#L15-L20)，而我们本可以在 TypeScript 中完成。 原因是在我看来，其他选择更糟。

- 向 Zokrates 代码提供一个一维布尔数组，并使用诸如 `x*(height+2)\n+y` 的表达式来获取二维地图。 这会使[代码](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/zero-knowledge.ts#L44-L47)变得更复杂一些，所以我认为对于一个教程来说，性能提升是不值得的。

- 向 Zokrates 发送一维数组和二维数组。 然而，这个解决方案对我们没有任何好处。 Zokrates 代码必须验证提供的一维数组确实是二维数组的正确表示。 所以不会有任何性能提升。

- 在 Zokrates 中展平二维数组。 这是最简单的选择，所以我选择了它。

### 在哪里存储地图 {#where-store-maps}

在此应用程序中，[`gamesInProgress`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L20) 只是内存中的一个变量。 这意味着如果你的服务器崩溃并需要重新启动，它存储的所有信息都将丢失。 玩家不仅无法继续他们的游戏，甚至无法开始新游戏，因为链上组件认为他们仍在进行游戏。

这对于生产系统来说显然是糟糕的设计，在生产系统中，你会将此信息存储在数据库中。 我在这里使用变量的唯一原因是因为这是一个教程，简单性是主要考虑因素。

## 结论：在什么条件下这是合适的技术？ {#conclusion}

所以，现在你知道如何编写一个带有服务器的游戏，该服务器存储不属于链上的保密状态。 但在什么情况下你应该这样做呢？ 主要有两个考虑因素。

- _长期运行的游戏_：[如上所述](#why-zero-knowledge)，在短时游戏中，你可以在游戏结束后发布状态，然后对所有内容进行验证。 但当游戏时间很长或不确定，并且状态需要保密时，这就不是一个选项。

- _可接受一定的中心化_：零知识证明可以验证完整性，即实体没有伪造结果。 他们不能做的是确保该实体仍然可用并回答信息。 在可用性也需要去中心化的情况下，零知识证明不是一个充分的解决方案，你需要[多方计算](https://en.wikipedia.org/wiki/Secure_multi-party_computation)。

[点击此处查看我的更多作品](https://cryptodocguy.pro/)。

### 致谢 {#acknowledgements}

- Alvaro Alonso 阅读了本文的草稿，并澄清了我对 Zokrates 的一些误解。

任何剩余的错误都由我负责。
