---
title: 使用零知识实现秘密状态
description: 链上游戏受到限制，因为它们无法保留任何隐藏信息。阅读本教程后，读者将能够结合零知识证明和服务器组件，创建具有秘密状态、链下组件的可验证游戏。我们将通过创建一个扫雷游戏来演示实现此目的的技术。
author: 奥里·波梅兰茨
tags:
  - 服务器
  - 链下
  - 中心化
  - 零知识
  - zokrates
  - mud
  - 隐私
skill: advanced
breadcrumb: ZK 秘密状态
lang: zh
published: 2025-03-15
---

_区块链上没有秘密_。发布在区块链上的所有内容都向所有人公开，任何人都可以读取。这是必要的，因为区块链的基础是任何人都可以对其进行验证。然而，游戏通常依赖于秘密状态。例如，如果你可以直接在区块浏览器上查看地图，那么[扫雷](<https://en.wikipedia.org/wiki/Minesweeper_(video_game)>)游戏就完全失去了意义。

最简单的解决方案是使用[服务器组件](/developers/tutorials/server-components/)来保存秘密状态。然而，我们使用区块链的原因是为了防止游戏开发者作弊。我们需要确保服务器组件的诚实性。服务器可以提供状态的哈希，并使用[零知识证明](/zero-knowledge-proofs/#why-zero-knowledge-proofs-are-important)来证明用于计算移动结果的状态是正确的。

阅读本文后，你将了解如何创建这种保存秘密状态的服务器、用于显示状态的客户端，以及用于两者之间通信的链上组件。我们将使用的主要工具包括：

| 工具                                          | 用途                                                 | 验证版本 |
| --------------------------------------------- | ------------------------------------------------------- | ------------------: |
| [Zokrates](https://zokrates.github.io/)       | 零知识证明及其验证            |               1.1.9 |
| [TypeScript](https://www.typescriptlang.org/) | 用于服务器和客户端的编程语言 |               5.4.2 |
| [Node](https://nodejs.org/en)                 | 运行服务器                                      |             20.18.2 |
| [Viem](https://viem.sh/)                      | 与区块链通信                       |              2.9.20 |
| [MUD](https://mud.dev/)                       | 链上数据管理                                 |              2.0.12 |
| [React](https://react.dev/)                   | 客户端用户界面                                   |              18.2.0 |
| [Vite](https://vitejs.dev/)                   | 提供客户端代码服务                                 |               4.2.1 |

## 扫雷游戏示例 {#minesweeper}

[扫雷](<https://en.wikipedia.org/wiki/Minesweeper_(video_game)>) 是一款包含隐藏雷区地图的游戏。玩家选择在特定位置挖掘。如果该位置有地雷，游戏结束。否则，玩家将获得该位置周围八个方块中的地雷数量。

此应用程序使用 [MUD](https://mud.dev/) 编写，该框架允许我们使用[键值数据库](https://aws.amazon.com/nosql/key-value/)在链上存储数据，并自动将该数据与链下组件同步。除了同步之外，MUD 还可以轻松提供访问控制，并让其他用户能够无许可地[扩展](https://mud.dev/guides/extending-a-world)我们的应用程序。

### 运行扫雷游戏示例 {#running-minesweeper-example}

要运行扫雷游戏示例：

1. 确保你[已安装必备组件](https://mud.dev/quickstart#prerequisites)：[Node](https://mud.dev/quickstart#prerequisites)、[Foundry](https://book.getfoundry.sh/getting-started/installation)、[`git`](https://git-scm.com/downloads)、[`pnpm`](https://git-scm.com/downloads) 和 [`mprocs`](https://github.com/pvolok/mprocs)。

2. 克隆代码库。

   ```sh copy
   git clone https://github.com/qbzzt/20240901-secret-state.git
   ```

3. 安装包。

   ```sh copy
   cd 20240901-secret-state/
   pnpm install
   npm install -g mprocs
   ```

   如果 Foundry 是作为 `pnpm install` 的一部分安装的，你需要重新启动命令行 shell。

4. 编译合约

    ```sh copy
    cd packages/contracts
    forge build
    cd ../..
    ```


5. 启动程序（包括一条 [anvil](https://book.getfoundry.sh/anvil/) 区块链）并等待。

   ```sh copy
   mprocs
   ```

   请注意，启动需要很长时间。要查看进度，首先使用向下箭头滚动到 _contracts_ 选项卡，以查看正在部署的 MUD 合约。当你收到消息 _Waiting for file changes…_ 时，说明合约已部署，进一步的进度将在 _server_ 选项卡中显示。在那里，你需要等待直到收到消息 _Verifier address: 0x...._。

   如果此步骤成功，你将看到 `mprocs` 屏幕，左侧是不同的进程，右侧是当前所选进程的控制台输出。

   ![The mprocs screen](./mprocs.png)

   如果 `mprocs` 出现问题，你可以手动运行这四个进程，每个进程在各自的命令行窗口中运行：

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

6. 现在你可以浏览到[客户端](http://localhost:3000)，点击 **New Game**（新游戏），然后开始游玩。

### 表 {#tables}

我们需要在链上建立[几个表](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/mud.config.ts)。

- `Configuration`：此表是一个单例，它没有密钥，只有一条记录。它用于保存游戏配置信息：
  - `height`：雷区的高度
  - `width`：雷区的宽度
  - `numberOfBombs`：每个雷区中的炸弹数量
- `VerifierAddress`：此表也是一个单例。它用于保存配置的一部分，即验证者合约的地址 (`verifier`)。我们本可以将此信息放在 `Configuration` 表中，但它是由另一个组件（服务器）设置的，因此将其放在单独的表中更容易。

- `PlayerGame`：密钥是玩家的地址。数据为：

  - `gameId`：32 字节的值，即玩家正在游玩的地图的哈希（游戏标识符）。
  - `win`：一个布尔值，表示玩家是否赢得了游戏。
  - `lose`：一个布尔值，表示玩家是否输掉了游戏。
  - `digNumber`：游戏中成功挖掘的次数。

- `GamePlayer`：此表保存反向映射，从 `gameId` 到玩家地址。

- `Map`：密钥是包含三个值的元组：

  - `gameId`：32 字节的值，即玩家正在游玩的地图的哈希（游戏标识符）。
  - `x` 坐标
  - `y` 坐标

  该值是一个数字。如果检测到炸弹，则为 255。否则，它是该位置周围的炸弹数量加一。我们不能仅仅使用炸弹的数量，因为默认情况下 EVM 中的所有存储和 MUD 中的所有行值都为零。我们需要区分“玩家尚未在此处挖掘”和“玩家在此处挖掘，发现周围有零个炸弹”。

此外，客户端和服务器之间的通信通过链上组件进行。这也是使用表来实现的。

- `PendingGame`：未处理的开始新游戏的请求。
- `PendingDig`：未处理的在特定游戏中特定位置挖掘的请求。这是一个[链下表](https://mud.dev/store/tables#types-of-tables)，这意味着它不会被写入 EVM 存储，只能使用事件在链下读取。

### 执行和数据流 {#execution-data-flows}

这些流程协调客户端、链上组件和服务器之间的执行。

#### 初始化 {#initialization-flow}

当你运行 `mprocs` 时，会发生以下步骤：

1. [`mprocs`](https://github.com/pvolok/mprocs) 运行四个组件：

   - [Anvil](https://book.getfoundry.sh/anvil/)，运行本地区块链
   - [Contracts](https://github.com/qbzzt/20240901-secret-state/tree/main/packages/contracts)，编译（如果需要）并部署 MUD 的合约
   - [Client](https://github.com/qbzzt/20240901-secret-state/tree/main/packages/client)，运行 [Vite](https://vitejs.dev/) 以向 Web 浏览器提供 UI 和客户端代码。
   - [Server](https://github.com/qbzzt/20240901-secret-state/tree/main/packages/server)，执行服务器操作

2. `contracts` 包部署 MUD 合约，然后运行 [`PostDeploy.s.sol` 脚本](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/script/PostDeploy.s.sol)。此脚本设置配置。来自 GitHub 的代码指定了[一个包含八个地雷的 10x5 雷区](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/script/PostDeploy.s.sol#L23)。

3. [服务器](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts)首先[设置 MUD](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L6)。除其他事项外，这会激活数据同步，以便在服务器内存中存在相关表的副本。

4. 服务器订阅一个函数，以便[在 `Configuration` 表更改时](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L23)执行。[此函数](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L24-L168)在 `PostDeploy.s.sol` 执行并修改表后被调用。

5. 当服务器初始化函数获得配置后，[它会调用 `zkFunctions`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L34-L35) 来初始化[服务器的零知识部分](#using-zokrates-from-typescript)。这必须在我们获得配置之后才能发生，因为零知识函数必须将雷区的宽度和高度作为常量。

6. 在服务器的零知识部分初始化之后，下一步是[将零知识验证合约部署到区块链](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L42-L53)并在 MUD 中设置验证者地址。

7. 最后，我们订阅更新，以便在玩家请求[开始新游戏](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L55-L71)或[在现有游戏中挖掘](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L73-L108)时能够看到。

#### 新游戏 {#new-game-flow}

当玩家请求新游戏时，会发生以下情况。

1. 如果该玩家没有正在进行的游戏，或者有一个游戏但 gameId 为零，客户端将显示一个[新游戏按钮](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/client/src/App.tsx#L175)。当用户按下此按钮时，[React 会运行 `newGame` 函数](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/client/src/App.tsx#L96)。

2. [`newGame`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/client/src/mud/createSystemCalls.ts#L43-L46) 是一个 `System` 调用。在 MUD 中，所有调用都通过 `World` 合约路由，在大多数情况下，你调用 `<namespace>__<function name>`。在这种情况下，调用的是 `app__newGame`，然后 MUD 将其路由到 [`GameSystem` 中的 `newGame`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/GameSystem.sol#L16-L22)。

3. 链上函数检查玩家是否没有正在进行的游戏，如果没有，则[将请求添加到 `PendingGame` 表中](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/GameSystem.sol#L21)。

4. 服务器检测到 `PendingGame` 中的更改并[运行订阅的函数](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L55-L71)。此函数调用 [`newGame`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L110-L114)，后者又调用 [`createGame`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L116-L144)。

5. `createGame` 做的第一件事是[创建一个包含适当数量地雷的随机地图](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L120-L135)。然后，它调用 [`makeMapBorders`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L147-L166) 创建一个带有空白边界的地图，这对于 Zokrates 是必需的。最后，`createGame` 调用 [`calculateMapHash`](#calculatemaphash)，以获取地图的哈希，该哈希用作游戏 ID。

6. `newGame` 函数将新游戏添加到 `gamesInProgress` 中。

7. 服务器做的最后一件事是调用 [`app__newGameResponse`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol#L38-L43)，这是在链上的。此函数位于不同的 `System`（即 [`ServerSystem`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol)）中，以启用访问控制。访问控制在 [MUD 配置文件](https://mud.dev/config) [`mud.config.ts`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/mud.config.ts#L67-L72) 中定义。

   访问列表仅允许单个地址调用 `System`。这限制了对服务器函数的访问，使其仅限于单个地址，因此没有人可以冒充服务器。

8. 链上组件更新相关表：

   - 在 `PlayerGame` 中创建游戏。
   - 在 `GamePlayer` 中设置反向映射。
   - 从 `PendingGame` 中删除请求。

9. 服务器识别出 `PendingGame` 中的更改，但不执行任何操作，因为 [`wantsGame`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L58-L60) 为 false。

10. 在客户端上，[`gameRecord`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/client/src/App.tsx#L143-L148) 设置为玩家地址的 `PlayerGame` 条目。当 `PlayerGame` 更改时，`gameRecord` 也会更改。

11. 如果 `gameRecord` 中有值，并且游戏尚未分出胜负，客户端将[显示地图](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/client/src/App.tsx#L175-L190)。

#### 挖掘 {#dig-flow}

1. 玩家[点击地图单元格的按钮](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/client/src/App.tsx#L188)，这会调用 [`dig` 函数](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/client/src/mud/createSystemCalls.ts#L33-L36)。此函数在链上调用 [`dig`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/GameSystem.sol#L24-L32)。

2. 链上组件[执行一些健全性检查](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/GameSystem.sol#L25-L30)，如果成功，则将挖掘请求添加到 [`PendingDig`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/GameSystem.sol#L31) 中。

3. 服务器[检测到 `PendingDig` 中的更改](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L73)。[如果有效](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L75-L84)，它会[调用零知识代码](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L86-L95)（如下所述）以生成结果及其有效的证明。

4. [服务器](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L97-L107)在链上调用 [`digResponse`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol#L45-L64)。

5. `digResponse` 做两件事。首先，它检查[零知识证明](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol#L47-L61)。然后，如果证明通过，它会调用 [`processDigResult`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol#L67-L86) 来实际处理结果。

6. `processDigResult` 检查游戏是否已[失败](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol#L76-L78)或[获胜](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol#L83-L86)，并[更新链上地图 `Map`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol#L80)。

7. 客户端自动获取更新并[更新显示给玩家的地图](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/client/src/App.tsx#L175-L190)，并在适用的情况下告诉玩家是赢还是输。

## 使用 Zokrates {#using-zokrates}

在上面解释的流程中，我们跳过了零知识部分，将其视为一个黑盒。现在让我们打开它，看看这些代码是如何编写的。

### 对地图进行哈希处理 {#hashing-map}

我们可以使用[这段 JavaScript 代码](https://github.com/ZK-Plus/ICBC24_Tutorial_Compute-Offchain-Verify-onchain/tree/solutions/exercise)来实现 [Poseidon](https://www.poseidon-hash.info)，即我们使用的 Zokrates 哈希函数。然而，虽然这样做会更快，但也比直接使用 Zokrates 哈希函数更复杂。这是一个教程，因此代码针对简单性而非性能进行了优化。因此，我们需要两个不同的 Zokrates 程序，一个仅用于计算地图的哈希（`hash`），另一个用于实际创建地图上某个位置挖掘结果的零知识证明（`dig`）。

### 哈希函数 {#hash-function}

这是计算地图哈希的函数。我们将逐行查看这段代码。

```
import "hashes/poseidon/poseidon.zok" as poseidon;
import "utils/pack/bool/pack128.zok" as pack128;
```

这两行从 [Zokrates 标准库](https://zokrates.github.io/toolbox/stdlib.html)导入了两个函数。[第一个函数](https://github.com/Zokrates/ZoKrates/blob/latest/zokrates_stdlib/stdlib/hashes/poseidon/poseidon.zok)是 [Poseidon 哈希](https://www.poseidon-hash.info/)。它接收一个 [`field` 元素](https://zokrates.github.io/language/types.html#field)数组并返回一个 `field`。

Zokrates 中的 field 元素通常小于 256 位，但相差不大。为了简化代码，我们将地图限制为最多 512 位，并对包含四个 field 的数组进行哈希处理，在每个 field 中我们仅使用 128 位。[`pack128` 函数](https://github.com/Zokrates/ZoKrates/blob/latest/zokrates_stdlib/stdlib/utils/pack/bool/pack128.zok)为此目的将 128 位数组转换为 `field`。

```
def hashMap(bool[${width+2}][${height+2}] map) -> field {
```

这一行开始定义一个函数。`hashMap` 接收一个名为 `map` 的参数，这是一个二维 `bool`(ean) 数组。地图的大小为 `width+2` 乘 `height+2`，原因将在[下文解释](#why-map-border)。

我们可以使用 `${width+2}` 和 `${height+2}`，因为 Zokrates 程序在此应用程序中作为[模板字符串](https://www.w3schools.com/js/js_string_templates.asp)存储。`${` 和 `}` 之间的代码由 JavaScript 计算，这样该程序就可以用于不同的地图大小。地图参数周围有一个宽度为 1 个位置的无炸弹边界，这就是我们需要在宽度和高度上加 2 的原因。

返回值是一个包含哈希的 `field`。

```
bool[512] mut map1d = [false; 512];
```

地图是二维的。然而，`pack128` 函数不适用于二维数组。因此，我们首先使用 `map1d` 将地图展平为 512 字节的数组。默认情况下，Zokrates 变量是常量，但我们需要在循环中为该数组赋值，因此我们将其定义为 [`mut`](https://zokrates.github.io/language/variables.html#mutability)。

我们需要初始化该数组，因为 Zokrates 没有 `undefined`。`[false; 512]` 表达式表示[一个包含 512 个 `false` 值的数组](https://zokrates.github.io/language/types.html#declaration-and-initialization)。

```
u32 mut counter = 0;
```

我们还需要一个计数器来区分我们在 `map1d` 中已经填充的位和尚未填充的位。

```
for u32 x in 0..${width+2} {
```

这就是在 Zokrates 中声明 [`for` 循环](https://zokrates.github.io/language/control_flow.html#for-loops)的方法。Zokrates 的 `for` 循环必须具有固定的边界，因为虽然它看起来像一个循环，但编译器实际上会将其“展开”。表达式 `${width+2}` 是一个编译时常量，因为 `width` 是由 TypeScript 代码在调用编译器之前设置的。

```
for u32 y in 0..${height+2} {
         map1d[counter] = map[x][y];
         counter = counter+1;
      }
   }
```

对于地图中的每个位置，将该值放入 `map1d` 数组中并递增计数器。

```
field[4] hashMe = [
        pack128(map1d[0..128]),
        pack128(map1d[128..256]),
        pack128(map1d[256..384]),
        pack128(map1d[384..512])
    ];
```

使用 `pack128` 从 `map1d` 创建一个包含四个 `field` 值的数组。在 Zokrates 中，`array[a..b]` 表示从 `a` 开始到 `b-1` 结束的数组切片。

```
return poseidon(hashMe);
}
```

使用 `poseidon` 将此数组转换为哈希。

### 哈希程序 {#hash-program}

服务器需要直接调用 `hashMap` 来创建游戏标识符。然而，Zokrates 只能调用程序上的 `main` 函数来启动，因此我们创建了一个带有调用哈希函数的 `main` 的程序。

```
${hashFragment}

def main(bool[${width+2}][${height+2}] map) -> field {
    return hashMap(map);
}
```

### 挖掘程序 {#dig-program}

这是应用程序零知识部分的核心，我们在这里生成用于验证挖掘结果的证明。

```
${hashFragment}

// 位置 (x,y) 的地雷数量
def map2mineCount(bool[${width+2}][${height+2}] map, u32 x, u32 y) -> u8 {
   return if map[x+1][y+1] { 1 } else { 0 };
}
```

#### 为什么需要地图边界 {#why-map-border}

零知识证明使用[算术电路](https://medium.com/web3studio/simple-explanations-of-arithmetic-circuits-and-zero-knowledge-proofs-806e59a79785)，它没有与 `if` 语句简单等效的结构。相反，它们使用等效的[条件运算符](https://en.wikipedia.org/wiki/Ternary_conditional_operator)。如果 `a` 可以是 0 或 1，你可以将 `if a { b } else { c }` 计算为 `ab+(1-a)c`。

正因为如此，Zokrates 的 `if` 语句总是会计算两个分支。例如，如果你有以下代码：

```
bool[5] arr = [false; 5];
u32 index=10;
return if index>4 { 0 } else { arr[index] }
```

它会报错，因为它需要计算 `arr[10]`，即使该值稍后会乘以零。

这就是我们需要在地图周围设置一个宽度为 1 个位置的边界的原因。我们需要计算某个位置周围的地雷总数，这意味着我们需要查看我们正在挖掘的位置的上一行和下一行、左侧和右侧的位置。这意味着这些位置必须存在于提供给 Zokrates 的地图数组中。

```
def main(private bool[${width+2}][${height+2}] map, u32 x, u32 y) -> (field, u8) {
```

默认情况下，Zokrates 证明包含其输入。除非你确切知道是哪个位置，否则知道某个位置周围有五个地雷毫无用处（而且你不能仅仅将其与你的请求匹配，因为那样证明者可能会使用不同的值而不告诉你）。然而，我们需要在将地图提供给 Zokrates 的同时对其保密。解决方案是使用 `private` 参数，该参数_不会_被证明泄露。

这开启了另一种滥用的可能。证明者可以使用正确的坐标，但创建一个在该位置周围（甚至可能在该位置本身）有任意数量地雷的地图。为了防止这种滥用，我们让零知识证明包含地图的哈希，即游戏标识符。

```
return (hashMap(map),
```

这里的返回值是一个元组，包含地图哈希数组以及挖掘结果。

```
if map2mineCount(map, x, y) > 0 { 0xFF } else {
```

我们使用 255 作为特殊值，以防该位置本身有炸弹。

```
map2mineCount(map, x-1, y-1) + map2mineCount(map, x, y-1) + map2mineCount(map, x+1, y-1) +
            map2mineCount(map, x-1, y) + map2mineCount(map, x+1, y) +
            map2mineCount(map, x-1, y+1) + map2mineCount(map, x, y+1) + map2mineCount(map, x+1, y+1)
         }
   );
}
```

如果玩家没有触雷，则将该位置周围区域的地雷数量相加并返回。

### 在 TypeScript 中使用 Zokrates {#using-zokrates-from-typescript}

Zokrates 有一个命令行界面，但在本程序中，我们在 [TypeScript 代码](https://zokrates.github.io/toolbox/zokrates_js.html)中使用它。

包含 Zokrates 定义的库称为 [`zero-knowledge.ts`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/zero-knowledge.ts)。

```typescript
import { initialize as zokratesInitialize } from "zokrates-js"
```

导入 [Zokrates JavaScript 绑定](https://zokrates.github.io/toolbox/zokrates_js.html)。我们只需要 [`initialize`](https://zokrates.github.io/toolbox/zokrates_js.html#initialize) 函数，因为它返回一个解析为所有 Zokrates 定义的 promise。

```typescript
export const zkFunctions = async (width: number, height: number) : Promise<any> => {
```

与 Zokrates 本身类似，我们也只导出一个函数，该函数也是[异步的](https://www.w3schools.com/js/js_async.asp)。当它最终返回时，它会提供几个函数，我们将在下面看到。

```typescript
const zokrates = await zokratesInitialize()
```

初始化 Zokrates，从库中获取我们需要的一切。

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

接下来是我们上面看到的哈希函数和两个 Zokrates 程序。

```typescript
const digCompiled = zokrates.compile(digProgram)
const hashCompiled = zokrates.compile(hashProgram)
```

在这里我们编译这些程序。

```typescript
// 创建用于零知识验证的密钥。
// 在生产系统中，你需要使用设置仪式。
// (https://zokrates.github.io/toolbox/trusted_setup.html#initializing-a-phase-2-ceremony)。
const keySetupResults = zokrates.setup(digCompiled.program, "")
const verifierKey = keySetupResults.vk
const proverKey = keySetupResults.pk
```

在生产系统上，我们可能会使用更复杂的[设置仪式](https://zokrates.github.io/toolbox/trusted_setup.html#initializing-a-phase-2-ceremony)，但这对于演示来说已经足够了。用户知道证明者密钥并不是问题——除非事情是真的，否则他们仍然无法使用它来证明。因为我们指定了熵（第二个参数 `""`），所以结果总是相同的。

**注意：** 编译 Zokrates 程序和创建密钥是缓慢的过程。没有必要每次都重复这些操作，只需在地图大小改变时进行即可。在生产系统上，你只需执行一次，然后存储输出。我在这里不这样做的唯一原因是为了简单起见。

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

[`computeWitness`](https://zokrates.github.io/toolbox/zokrates_js.html#computewitnessartifacts-args-options) 函数实际运行 Zokrates 程序。它返回一个包含两个字段的结构：`output`（作为 JSON 字符串的程序输出）和 `witness`（创建结果的零知识证明所需的信息）。在这里我们只需要输出。

输出是一个形式为 `"31337"` 的字符串，即用引号括起来的十进制数。但我们为 `viem` 所需的输出是形式为 `0x60A7` 的十六进制数。因此，我们使用 `.slice(1,-1)` 去除引号，然后使用 `BigInt` 将剩余的字符串（即十进制数）转换为 [`BigInt`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt)。`.toString(16)` 将此 `BigInt` 转换为十六进制字符串，而 `"0x"+` 添加了十六进制数的标记。

```typescript
// 挖掘并返回结果的零知识证明
// （服务端代码）
```

零知识证明包含公共输入（`x` 和 `y`）以及结果（地图的哈希和炸弹数量）。

```typescript
    const zkDig = function(map: boolean[][], x: number, y: number) : any {
        if (x<0 || x>=width || y<0 || y>=height)
            throw new Error("Trying to dig outside the map")
```

在 Zokrates 中检查索引是否越界是个问题，所以我们在这里进行检查。

```typescript
const runResults = zokrates.computeWitness(digCompiled, [map, `${x}`, `${y}`])
```

执行挖掘程序。

```typescript
        const proof = zokrates.generateProof(
            digCompiled.program,
            runResults.witness,
            proverKey)

        return proof
    }
```

使用 [`generateProof`](https://zokrates.github.io/toolbox/zokrates_js.html#generateproofprogram-witness-provingkey-entropy) 并返回证明。

```typescript
const solidityVerifier = `
        // Map size: ${width} x ${height}
        \n${zokrates.exportSolidityVerifier(verifierKey)}
        `
```

一个 Solidity 验证者，这是一个我们可以部署到区块链上的智能合约，用于验证由 `digCompiled.program` 生成的证明。

```typescript
    return {
        zkDig,
        calculateMapHash,
        solidityVerifier,
    }
}
```

最后，返回其他代码可能需要的所有内容。

## 安全测试 {#security-tests}

安全测试非常重要，因为功能性错误最终会暴露出来。但如果应用程序不安全，这种隐患很可能会隐藏很长时间，直到有人作弊并卷走属于他人的资源时才会被发现。

### 权限 {#permissions}

在这个游戏中有一个特权实体，即服务器。它是唯一被允许调用 [`ServerSystem`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol) 中功能的用户。我们可以使用 [`cast`](https://book.getfoundry.sh/cast/) 来验证对许可型函数的调用是否仅限于服务器账户。

[服务器的私钥位于 `setupNetwork.ts` 中](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/mud/setupNetwork.ts#L52)。

1. 在运行 `anvil`（区块链）的计算机上，设置这些环境变量。

   ```sh copy
   WORLD_ADDRESS=0x8d8b6b8414e1e3dcfd4168561b9be6bd3bf6ec4b
   UNAUTHORIZED_KEY=0x5de4111afa1a4b94908f83103eb1f1706367c2e68ca870fc3fb9a804cdab365a
   AUTHORIZED_KEY=0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d
   ```

2. 使用 `cast` 尝试将验证者地址设置为未经授权的地址。

   ```sh copy
   cast send $WORLD_ADDRESS 'app__setVerifier(address)' `cast address-zero` --private-key $UNAUTHORIZED_KEY
   ```

   不仅 `cast` 会报告失败，而且你可以在浏览器的游戏中打开 **MUD Dev Tools**，点击 **Tables**，然后选择 **app\_\_VerifierAddress**。可以看到该地址不为零。

3. 将验证者地址设置为服务器的地址。

   ```sh copy
   cast send $WORLD_ADDRESS 'app__setVerifier(address)' `cast address-zero` --private-key $AUTHORIZED_KEY
   ```

   **app\_\_VerifiedAddress** 中的地址现在应该为零。

同一个 `System` 中的所有 MUD 函数都经过相同的访问控制，因此我认为这个测试已经足够了。如果你觉得不够，可以检查 [`ServerSystem`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/contracts/src/systems/ServerSystem.sol) 中的其他函数。

### 零知识滥用 {#zero-knowledge-abuses}

验证 Zokrates 的数学原理超出了本教程的范围（也超出了我的能力）。但是，我们可以对零知识代码运行各种检查，以验证如果操作不正确，它就会失败。所有这些测试都需要我们更改 [`zero-knowledge.ts`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/zero-knowledge.ts) 并重新启动整个应用程序。仅仅重启服务器进程是不够的，因为这会使应用程序处于一种不可能的状态（玩家有一个正在进行的游戏，但该游戏对服务器不再可用）。

#### 错误答案 {#wrong-answer}

最简单的情况是在零知识证明中提供错误的答案。为此，我们进入 `zkDig` 并[修改第 91 行](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/zero-knowledge.ts#L91)：

```ts
proof.inputs[3] = "0x" + "1".padStart(64, "0")
```

这意味着无论正确答案是什么，我们都将始终声称有一颗炸弹。尝试玩一下这个版本，你会在 `pnpm dev` 屏幕的 **server** 选项卡中看到这个错误：

```
cause: {
        code: 3,
        message: 'execution reverted: revert: Zero knowledge verification fail',
        data: '0x08c379a0000000000000000000000000000000000000000000000000000000000000002000000000000000
000000000000000000000000000000000000000000000000205a65726f206b6e6f776c6564676520766572696669636174696f6
e206661696c'
      },
```

因此，这种作弊方式会失败。

#### 错误证明 {#wrong-proof}

如果我们提供正确的信息，但证明数据是错误的，会发生什么？现在，将第 91 行替换为：

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

它仍然会失败，但现在失败没有给出原因，因为它发生在验证者调用期间。

### 用户如何验证零信任代码？ {#user-verify-zero-trust}

智能合约相对容易验证。通常，开发者将源代码发布到区块浏览器，区块浏览器会验证源代码是否确实编译为[合约部署交易](/developers/docs/smart-contracts/deploying/)中的代码。在 MUD `System` 的情况下，这会[稍微复杂一些](https://mud.dev/cli/verify)，但差别不大。

对于零知识来说，这要困难得多。验证者包含一些常量并对它们进行一些计算。这并不能告诉你正在证明什么。

```solidity
    function verifyingKey() pure internal returns (VerifyingKey memory vk) {
        vk.alpha = Pairing.G1Point(uint256(0x0f43f4fe7b5c2326fed4ac6ed2f4003ab9ab4ea6f667c2bdd77afb068617ee16), uint256(0x25a77832283f9726935219b5f4678842cda465631e72dbb24708a97ba5d0ce6f));
        vk.beta = Pairing.G2Point([uint256(0x2cebd0fbd21aca01910581537b21ae4fed46bc0e524c055059aa164ba0a6b62b), uint256(0x18fd4a7bc386cf03a95af7163d5359165acc4e7961cb46519e6d9ee4a1e2b7e9)], [uint256(0x11449dee0199ef6d8eebfe43b548e875c69e7ce37705ee9a00c81fe52f11a009), uint256(0x066d0c83b32800d3f335bb9e8ed5e2924cf00e77e6ec28178592eac9898e1a00)]);
```

解决方案是（至少在区块浏览器将 Zokrates 验证添加到其用户界面之前），应用程序开发者公开 Zokrates 程序，并让至少一部分用户使用适当的验证密钥自行编译它们。

为此，请执行以下操作：

1. [安装 Zokrates](https://zokrates.github.io/gettingstarted.html)。
2. 创建一个包含 Zokrates 程序的文件 `dig.zok`。下面的代码假设你保留了原始地图大小，即 10x5。

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


    // 位置 (x,y) 的地雷数量
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

3. 编译 Zokrates 代码并创建验证密钥。验证密钥必须使用与原始服务器中相同的熵来创建，[在本例中为空字符串](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/zero-knowledge.ts#L67)。

   ```sh copy
   zokrates compile --input dig.zok
   zokrates setup -e ""
   ```

4. 自行创建 Solidity 验证者，并验证它在功能上是否与区块链上的验证者相同（服务器添加了注释，但这并不重要）。

   ```sh copy
   zokrates export-verifier
   diff verifier.sol ~/20240901-secret-state/packages/contracts/src/verifier.sol
   ```

## 设计决策 {#design}

在任何足够复杂的应用程序中，都会存在相互竞争的设计目标，需要进行权衡。让我们来看看其中的一些权衡，以及为什么当前的解决方案优于其他选项。

### 为什么使用零知识 {#why-zero-knowledge}

对于扫雷游戏，你其实并不需要零知识。服务器可以一直保存地图，然后在游戏结束时将其全部显示出来。接着，在游戏结束时，智能合约可以计算地图哈希，验证其是否匹配，如果不匹配，则惩罚服务器或完全作废该游戏。

我没有使用这种更简单的解决方案，因为它只适用于具有明确结束状态的短期游戏。当一个游戏可能是无限的（例如[自主世界](https://0xparc.org/blog/autonomous-worlds)的情况），你需要一种在_不_泄露状态的情况下证明状态的解决方案。

作为一篇教程，本文需要一个易于理解的简短游戏，但这种技术对于较长的游戏最为有用。

### 为什么选择 Zokrates？ {#why-zokrates}

[Zokrates](https://zokrates.github.io/) 并不是唯一可用的零知识库，但它类似于普通的[命令式](https://en.wikipedia.org/wiki/Imperative_programming)编程语言，并且支持布尔变量。

对于具有不同要求的应用程序，你可能更倾向于使用 [Circum](https://docs.circom.io/getting-started/installation/) 或 [Cairo](https://www.cairo-lang.org/tutorials/getting-started-with-cairo/)。

### 何时编译 Zokrates {#when-compile-zokrates}

在这个程序中，我们[每次服务器启动时](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/zero-knowledge.ts#L60-L61)都会编译 Zokrates 程序。这显然是对资源的浪费，但这是一篇教程，为了简单起见进行了优化。

如果我正在编写一个生产级别的应用程序，我会检查是否有一个包含此雷区大小的已编译 Zokrates 程序的文件，如果有，则使用它。在链上部署验证者合约也是如此。

### 创建验证者和证明者密钥 {#key-creation}

[密钥创建](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/zero-knowledge.ts#L63-L69)是另一种纯计算，对于给定的雷区大小，不需要进行多次。同样，为了简单起见，它只执行一次。

此外，我们可以使用[设置仪式](https://zokrates.github.io/toolbox/trusted_setup.html#initializing-a-phase-2-ceremony)。设置仪式的优点是，你需要每个参与者的熵或某些中间结果才能在零知识证明上作弊。如果至少有一位仪式参与者是诚实的并删除了该信息，那么零知识证明就可以免受某些攻击。然而，_没有机制_可以验证信息是否已从所有地方删除。如果零知识证明至关重要，你会希望参与设置仪式。

在这里，我们依赖于有数十名参与者的[永久 tau 幂（perpetual powers of tau）](https://github.com/privacy-scaling-explorations/perpetualpowersoftau)。它可能足够安全，而且简单得多。我们也没有在密钥创建期间添加熵，这使得用户更容易[验证零知识配置](#user-verify-zero-trust)。

### 在哪里验证 {#where-verification}

我们可以在链上（这会消耗 Gas）或在客户端中（使用 [`verify`](https://zokrates.github.io/toolbox/zokrates_js.html#verifyverificationkey-proof)）验证零知识证明。我选择了前者，因为这让你只需[验证验证者](#user-verify-zero-trust)一次，然后就可以相信只要它的合约地址保持不变，它就不会改变。如果在客户端进行验证，你每次下载客户端时都必须验证收到的代码。

此外，虽然这个游戏是单人游戏，但许多区块链游戏都是多人游戏。链上验证意味着你只需验证一次零知识证明。在客户端进行验证则需要每个客户端独立验证。

### 在 TypeScript 还是 Zokrates 中展平地图？ {#where-flatten}

一般来说，当处理既可以在 TypeScript 中进行，也可以在 Zokrates 中进行时，最好在 TypeScript 中进行，因为它要快得多，并且不需要零知识证明。例如，这就是为什么我们不向 Zokrates 提供哈希并让它验证其是否正确的原因。哈希处理必须在 Zokrates 内部完成，但返回的哈希与链上哈希之间的匹配可以在其外部进行。

然而，我们仍然[在 Zokrates 中展平地图](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/zero-knowledge.ts#L15-L20)，尽管我们本可以在 TypeScript 中完成。原因在于，在我看来，其他选项更糟。

- 向 Zokrates 代码提供一个一维布尔数组，并使用诸如 `x*(height+2)
+y` 的表达式来获取二维地图。这会使[代码](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/zero-knowledge.ts#L44-L47)变得有些复杂，所以我认为对于一篇教程来说，性能提升是不值得的。

- 将一维数组和二维数组都发送给 Zokrates。然而，这个解决方案并没有给我们带来任何好处。Zokrates 代码必须验证提供给它的一维数组确实是二维数组的正确表示。因此不会有任何性能提升。

- 在 Zokrates 中展平二维数组。这是最简单的选项，所以我选择了它。

### 在哪里存储地图 {#where-store-maps}

在这个应用程序中，[`gamesInProgress`](https://github.com/qbzzt/20240901-secret-state/blob/main/packages/server/src/app.ts#L20) 只是内存中的一个变量。这意味着如果你的服务器崩溃并需要重启，它存储的所有信息都会丢失。玩家不仅无法继续他们的游戏，甚至无法开始新游戏，因为链上组件认为他们仍有游戏在进行中。

对于生产系统来说，这显然是糟糕的设计，在生产系统中，你会将这些信息存储在数据库中。我在这里使用变量的唯一原因是因为这是一篇教程，简单性是主要考虑因素。

## 结论：在什么条件下这种技术是合适的？ {#conclusion}

所以，现在你知道如何编写一个带有服务器的游戏，该服务器存储不属于链上的秘密状态。但在什么情况下你应该这样做呢？主要有两个考虑因素。

- _长期运行的游戏_：[如上所述](#why-zero-knowledge)，在短期游戏中，你可以在游戏结束后直接发布状态并验证一切。但当游戏需要很长或无限期的时间，并且状态需要保持秘密时，这就行不通了。

- _可接受一定程度的中心化_：零知识证明可以验证完整性，即某个实体没有伪造结果。但它们无法确保该实体仍然可用并回复消息。在可用性也需要去中心化的情形下，零知识证明并不是一个充分的解决方案，你需要[多方计算](https://en.wikipedia.org/wiki/Secure_multi-party_computation)。

[点击此处查看我的更多作品](https://cryptodocguy.pro/)。

### 致谢 {#acknowledgements}

- Alvaro Alonso 阅读了本文的草稿，并澄清了我对 Zokrates 的一些误解。

任何遗留的错误均由我本人负责。