---
title: 创建并部署一个去中心化金融应用程序
description: 将 ERC20 代币存入智能合约，铸造流动性矿池代币
author: "strykerin"
tags:
  - "solidity"
  - "deFi"
  - "web3.js"
  - "truffle"
  - "ganache"
  - "智能合约"
skill: intermediate
lang: zh
published: 2020-12-31
source: www.github.com
sourceUrl: https://github.com/strykerin/DeFi-Token-Farm
---

在本教程中，我们将使用 Solidity 构建一个去中心化金融应用程序。用户可以将 ERC20 代币存入智能合约，然后铸造流动性矿池代币并将这些代币转给他们。 用户之后可以通过消耗智能合约上的流动性矿池代币来赎回他们的 ERC20 代币，然后 ERC20 代币将会转回给他们。

## 安装 Truffle 和 Ganache {#install-truffle-and-ganache}

如果这是您第一次编写智能合约，您需要搭建您的环境。 我们将使用两个工具：[Truffle](https://www.trufflesuite.com/) 和 [Ganache](https://www.trufflesuite.com/ganache)。

Truffle 是用于开发以太坊智能合约的开发环境和测试框架。 使用 Truffle 可以很容易地在区块链中创建和部署智能合约。 Ganach 可以帮助我们创建一个本地以太坊区块链，用以测试智能合约。 它模拟真实的网络功能，前 10 个帐户存入了 100 个测试以太币，如此可以随意部署和测试智能合约。 Ganache 可提供桌面应用程序和命令行工具。 在本文中，我们将使用有图形界面的桌面应用程序。

![Ganache 图形界面桌面应用程序](https://cdn-images-1.medium.com/max/2360/1*V1iQ5onbLbT5Ib2QaiOSyg.png)_Ganache UI desktop application_

要创建项目，请运行以下命令：

```bash
mkdir your-project-name
cd your-project-name
truffle init
```

这将为智能合约的开发和部署创建一个空白项目， 创建的项目结构如下：

- `contracts`：存放 solidity 智能合约的文件夹

- `migrations`：存放部署脚本的文件夹

- `test`：存放智能合约测试文件的文件夹

- `truffle-config.js`：Truffle 配置文件

## 创建 ERC20 代币 {#create-the-erc20-token}

首先，我们需要创建 ERC20 代币，用于在智能合约上质押。 要创建同质化代币，我们首先需要安装 OpenZeppelin 库。 该库包含 ERC20 和 ERC721 等标准的实现。 如需安装，请运行以下命令：

```bash
npm install @openzeppelin/contracts
```

使用 OpenZepelin 库，我们可以通过写入 `contracts/MyToken.sol` 创建我们的 ERC20 代币，需用到以下 solidity 代码：

```solidity
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MyToken is ERC20 {
    constructor() public ERC20("MyToken", "MTKN"){
        _mint(msg.sender, 1000000000000000000000000);
    }
}
```

在上述代码中：

- 第 3 行：我们从包含此代币标准实现的 openzepelin 导入 ERC20.sol 合约。

- 第 5 行：我们继承了 ERC20.sol 合约。

- 第 6 行：我们要调用 ERC20.sol 构造函数，并将名称和符号参数分别设为 `"MyToken"` 和 `"MTKN"`。

- 第 7 行：我们为正在部署智能合约的账户铸造和转移 100 万代币（我们默认为 ERC20 代币使用 18 位小数）。这意味着，如果我们想要铸造 1 个代币，则需将其表示为 100000000000000，即 1 和 18 个零）。

我们可以看到，ERC20.sol 构造函数实现下方，`_decimals` 字段设置为 18：

```solidity
string private _name;
string private _symbol;
uint8 private _decimals;

constructor (string memory name_, string memory symbol_) public {
    _name = name_;
    _symbol = symbol_;
    _decimals = 18;
}
```

## 编译 ERC20 代币 {#compile-the-erc20-token}

要编译我们的智能合约，我们必须首先检查我们的 solidity 编译器版本。 可以通过运行以下命令来检查：

```bash
truffle version
```

默认版本是 `Solidity v0.5.16`。 由于我们的代币基于 solidity 版本 `0.6.2` 编写，如果我们运行命令来编译合约，我们会遇到编译器错误。 要使用指定的 solidity 编译器版本，请转到文件 `truffle-config.js`，设为所需的编译器版本，如下所示：

```javascript
// Configure your compilers
compilers: {
  solc: {
    version: "^0.8.0",    // Fetch exact version from solc-bin (default: truffle's version)
    // docker: true,        // Use "0.5.1" you've installed locally with docker (default: false)
    // settings: {          // See the solidity docs for advice about optimization and evmVersion
    //  optimizer: {
    //    enabled: false,
    //    runs: 200
    //  },
    //  evmVersion: "byzantium"
    // }
  }
}
```

现在，我们可以通过运行以下命令来编译智能合约：

```bash
truffle compile
```

## 部署 ERC20 代币 {#deploy-erc20-token}

编译后，我们现在便可以部署代币了。

在 `migrations` 文件夹中，创建一个名为 `2_depu_Tokens.js` 的文件。 我们将在该文件中部署 ERC20 代币和 FarmToken 智能合约。 以下代码用于部署我们的 MyToken.sol 合约：

```javascript
const MyToken = artifacts.require("MyToken")

module.exports = async function (deployer, network, accounts) {
  // Deploy MyToken
  await deployer.deploy(MyToken)
  const myToken = await MyToken.deployed()
}
```

打开 Ganache 并选择“快速启动”选项，启动本地以太坊区块链。 要部署合约，请运行：

```bash
truffle migrate
```

用于部署合同的地址是 Ganache 显示的地址列表中的第一个地址。 为核实这一点，我们可以打开 Ganache 桌面应用程序，然后可以核实第一个帐户的以太币余额已经减少，这是我们部署智能合约的以太币成本：

![Ganache 桌面应用程序](https://cdn-images-1.medium.com/max/2346/1*1iJ9VRlyLuza58HL3DLfpg.png)_Ganache desktop application_

为了验证 100 万 MyToken 代币是否已发送到部署者地址，我们可以使用 Truffle 控制台与我们部署的智能合约进行交互。

> [Truffle 控制台是一个基础型交互式控制台，可连接到任何以太坊客户端。](https://www.trufflesuite.com/docs/truffle/getting-started/using-truffle-develop-and-the-console)

要与智能合约交互，请运行以下命令：

```bash
truffle console
```

现在，我们可以在终端写入以下命令：

- 获取智能合约：`myToken = await MyToken.depolyed()`

- 从 Ganache 获取账户组：`accounts = await web3.eth.getAccounts()`

- 获取第一个帐户的余额：`balance = await myToken.balance Of(accounts[0])`

- 格式化具有 18 位小数的余额：`web3.utils.fromWei(Balance.toString())`

通过运行上述命令，我们会看到第一个地址实际上有 100 万 MyToken：

![第一个地址有 1000000 MyToken](https://cdn-images-1.medium.com/max/2000/1*AQlj9A7dw-qtY4QAD3Bpxw.png)

_第一个地址有 1000000 MyToken_

## 创建 FarmToken 智能合约 {#create-farmtoken-smart-contract}

FarmToken 智能合约将包含 3 个函数：

- `balance()`：获取 FarmToken 智能合约上的 MyToken 余额。

- `deposit(uint256 _amount)`：代表用户将 MyToken 转移到 FarmToken 智能合约，然后铸造 FarmToken 并转账给用户。

- `withdraw(uint256 _amount)`：消耗用户的 FarmToken 并将 MyToken 转到用户的地址。

我们来看看 FarmToken 构造函数：

```solidity
pragma solidity ^0.6.2;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/Address.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract FarmToken is ERC20 {
    using Address for address;
    using SafeMath for uint256; // As of Solidity v0.8.0, mathematical operations can be done safely without the need for SafeMath
    using SafeERC20 for IERC20;

    IERC20 public token;

    constructor(address _token)
        public
        ERC20("FarmToken", "FRM")
    {
        token = IERC20(_token);
    }
```

- 第 3-6 行：我们要从 openzepelin 导入下列合约：IERC20.sol、Address.sol、SafeERC20.sol 和 ERC20.sol。

- 第 8 行：FarmToken 将继承 ERC20 合约。

- 14-19 行：FarmToken 构造函数将接收 MyToken 合约地址作为参数，我们将把此地址分配给我们名为 `token` 的公共变量。

我们来实现 `balance()` 函数。 它将不会收到任何参数，将返回此智能合约上的 MyToken 余额。 可按如下所示实现：

```solidity
function balance() public view returns (uint256) {
    return token.balanceOf(address(this));
}
```

对于 `deposit(uint256 _amount)` 函数，将接收用户想要存入的金额作为参数，铸造 FarmTokens 并转给用户：

```solidity
function deposit(uint256 _amount) public {
    // Amount must be greater than zero
    require(_amount > 0, "amount cannot be 0");

    // Transfer MyToken to smart contract
    token.safeTransferFrom(msg.sender, address(this), _amount);

    // Mint FarmToken to msg sender
    _mint(msg.sender, _amount);
}
```

对于 `withdraw(uint256 _amount)` 函数，将接收用户想要消耗的 FarmTokens 数额作为参数，然后将相同数额的 MyToken 返还给用户：

```solidity
function withdraw(uint256 _amount) public {
    // Burn FarmTokens from msg sender
    _burn(msg.sender, _amount);

    // Transfer MyTokens from this smart contract to msg sender
    token.safeTransfer(msg.sender, _amount);
}
```

现在我们将部署我们的智能合约。 为此，我们将返回文件 `2_depu_Tokens.js` 并添加要部署的新合约：

```javascript
const MyToken = artifacts.require("MyToken")
const FarmToken = artifacts.require("FarmToken")

module.exports = async function (deployer, network, accounts) {
  // Deploy MyToken
  await deployer.deploy(MyToken)
  const myToken = await MyToken.deployed()

  // Deploy Farm Token
  await deployer.deploy(FarmToken, myToken.address)
  const farmToken = await FarmToken.deployed()
}
```

请注意，在部署 FarmToken 时，我们将已部署的 MyToken 合约的地址作为参数传递。

现在，运行 `truffle compile` 和 `truffle migrate` 来部署我们的合约。

我们来测试一下我们的智能合约。 不要使用 `truffle console` 与我们的智能合约交互，我们将创建一个脚本来自动执行此过程。 创建一个名为 `scripts` 的文件夹，并添加以下文件 `getMyTokenBalance.js`。 该文件将核查 FarmToken 智能合约中的 MyToken 余额：

```javascript
const MyToken = artifacts.require("MyToken")
const FarmToken = artifacts.require("FarmToken")

module.exports = async function (callback) {
  myToken = await MyToken.deployed()
  farmToken = await FarmToken.deployed()
  balance = await myToken.balanceOf(farmToken.address)
  console.log(web3.utils.fromWei(balance.toString()))
  callback()
}
```

要执行此脚本，请运行以下 cli 命令：

```bash
truffle exec .\scripts\getMyTokenBalance.js
```

我们将得到预期结果 0。 如果您收到尚未部署 FarmToken 的错误，则表明 truffle 网络尚未收到最新版本的合约代码。 只需关闭 ganache，然后再快速启动，并确保运行 `truffle migrate`。

现在，让我们把 MyToken 押在智能合约上。 由于 `deposit(uint256 _amount)` 函数调用了来自 ERC20 的 `safeTransferFrom` 函数，用户必须首先批准智能合约，才能以用户的名义转账 MyToken。 因此，在下面的脚本中，我们将首先批准此步骤，然后调用函数：

```javascript
const MyToken = artifacts.require("MyToken")
const FarmToken = artifacts.require("FarmToken")

module.exports = async function (callback) {
  const accounts = await new web3.eth.getAccounts()
  const myToken = await MyToken.deployed()
  const farmToken = await FarmToken.deployed()

  // Returns the remaining number of tokens that spender will be allowed to spend on behalf of owner through transferFrom.
  // This is zero by default.
  const allowanceBefore = await myToken.allowance(
    accounts[0],
    farmToken.address
  )
  console.log(
    "Amount of MyToken FarmToken is allowed to transfer on our behalf Before: " +
      allowanceBefore.toString()
  )

  // In order to allow the Smart Contract to transfer to MyToken (ERC-20) on the accounts[0] behalf,
  // we must explicitly allow it.
  // We allow farmToken to transfer x amount of MyToken on our behalf
  await myToken.approve(farmToken.address, web3.utils.toWei("100", "ether"))

  // Validate that the farmToken can now move x amount of MyToken on our behalf
  const allowanceAfter = await myToken.allowance(accounts[0], farmToken.address)
  console.log(
    "Amount of MyToken FarmToken is allowed to transfer on our behalf After: " +
      allowanceAfter.toString()
  )

  // Verify accounts[0] and farmToken balance of MyToken before and after the transfer
  balanceMyTokenBeforeAccounts0 = await myToken.balanceOf(accounts[0])
  balanceMyTokenBeforeFarmToken = await myToken.balanceOf(farmToken.address)
  console.log("*** My Token ***")
  console.log(
    "Balance MyToken Before accounts[0] " +
      web3.utils.fromWei(balanceMyTokenBeforeAccounts0.toString())
  )
  console.log(
    "Balance MyToken Before TokenFarm " +
      web3.utils.fromWei(balanceMyTokenBeforeFarmToken.toString())
  )

  console.log("*** Farm Token ***")
  balanceFarmTokenBeforeAccounts0 = await farmToken.balanceOf(accounts[0])
  balanceFarmTokenBeforeFarmToken = await farmToken.balanceOf(farmToken.address)
  console.log(
    "Balance FarmToken Before accounts[0] " +
      web3.utils.fromWei(balanceFarmTokenBeforeAccounts0.toString())
  )
  console.log(
    "Balance FarmToken Before TokenFarm " +
      web3.utils.fromWei(balanceFarmTokenBeforeFarmToken.toString())
  )
  // Call Deposit function from FarmToken
  console.log("Call Deposit Function")
  await farmToken.deposit(web3.utils.toWei("100", "ether"))
  console.log("*** My Token ***")
  balanceMyTokenAfterAccounts0 = await myToken.balanceOf(accounts[0])
  balanceMyTokenAfterFarmToken = await myToken.balanceOf(farmToken.address)
  console.log(
    "Balance MyToken After accounts[0] " +
      web3.utils.fromWei(balanceMyTokenAfterAccounts0.toString())
  )
  console.log(
    "Balance MyToken After TokenFarm " +
      web3.utils.fromWei(balanceMyTokenAfterFarmToken.toString())
  )

  console.log("*** Farm Token ***")
  balanceFarmTokenAfterAccounts0 = await farmToken.balanceOf(accounts[0])
  balanceFarmTokenAfterFarmToken = await farmToken.balanceOf(farmToken.address)
  console.log(
    "Balance FarmToken After accounts[0] " +
      web3.utils.fromWei(balanceFarmTokenAfterAccounts0.toString())
  )
  console.log(
    "Balance FarmToken After TokenFarm " +
      web3.utils.fromWei(balanceFarmTokenAfterFarmToken.toString())
  )

  // End function
  callback()
}
```

要运行此脚本：`truffle exec .\script\transferMyTokenToFarmToken.js`。 您将在控制台上看到如下输出：

![transferMyTokenToFarmToken.js 的输出](https://cdn-images-1.medium.com/max/2000/1*MoekE2QCw7vB98u5dl7ang.png)

_transferMyTokenToFarmToken.js 的输出_

正如我们所见，我们已成功将 MyToken 存入智能合约，因为第一个帐户现在已经有了 FarmToken。

要取款：

```javascript
const MyToken = artifacts.require("MyToken")
const FarmToken = artifacts.require("FarmToken")

module.exports = async function (callback) {
  const accounts = await new web3.eth.getAccounts()
  const myToken = await MyToken.deployed()
  const farmToken = await FarmToken.deployed()

  // Verify accounts[0] and farmToken balance of MyToken before and after the transfer
  balanceMyTokenBeforeAccounts0 = await myToken.balanceOf(accounts[0])
  balanceMyTokenBeforeFarmToken = await myToken.balanceOf(farmToken.address)
  console.log("*** My Token ***")
  console.log(
    "Balance MyToken Before accounts[0] " +
      web3.utils.fromWei(balanceMyTokenBeforeAccounts0.toString())
  )
  console.log(
    "Balance MyToken Before TokenFarm " +
      web3.utils.fromWei(balanceMyTokenBeforeFarmToken.toString())
  )

  console.log("*** Farm Token ***")
  balanceFarmTokenBeforeAccounts0 = await farmToken.balanceOf(accounts[0])
  balanceFarmTokenBeforeFarmToken = await farmToken.balanceOf(farmToken.address)
  console.log(
    "Balance FarmToken Before accounts[0] " +
      web3.utils.fromWei(balanceFarmTokenBeforeAccounts0.toString())
  )
  console.log(
    "Balance FarmToken Before TokenFarm " +
      web3.utils.fromWei(balanceFarmTokenBeforeFarmToken.toString())
  )

  // Call Deposit function from FarmToken
  console.log("Call Withdraw Function")
  await farmToken.withdraw(web3.utils.toWei("100", "ether"))

  console.log("*** My Token ***")
  balanceMyTokenAfterAccounts0 = await myToken.balanceOf(accounts[0])
  balanceMyTokenAfterFarmToken = await myToken.balanceOf(farmToken.address)
  console.log(
    "Balance MyToken After accounts[0] " +
      web3.utils.fromWei(balanceMyTokenAfterAccounts0.toString())
  )
  console.log(
    "Balance MyToken After TokenFarm " +
      web3.utils.fromWei(balanceMyTokenAfterFarmToken.toString())
  )

  console.log("*** Farm Token ***")
  balanceFarmTokenAfterAccounts0 = await farmToken.balanceOf(accounts[0])
  balanceFarmTokenAfterFarmToken = await farmToken.balanceOf(farmToken.address)
  console.log(
    "Balance FarmToken After accounts[0] " +
      web3.utils.fromWei(balanceFarmTokenAfterAccounts0.toString())
  )
  console.log(
    "Balance FarmToken After TokenFarm " +
      web3.utils.fromWei(balanceFarmTokenAfterFarmToken.toString())
  )

  // End function
  callback()
}
```

要运行此脚本：`truffle exec .\script\transferMyTokenToFarmToken.js`。 正如我们在下面的输出中所看到的，我们已经成功地取回了 MyToken，并消耗掉了 FarmToken：

![withdrawMyTokenFromTokenFarm.js 的输出](https://cdn-images-1.medium.com/max/2000/1*jHYlTFg0NgGbhASpsRvc0w.png)

_withdrawMyTokenFromTokenFarm.js 的输出_

## 参考文献 {#references}

[合约 - OpenZepelin 文档](https://docs.openzeppelin.com/contracts/3.x/)

[智能合约的适用工具 | Truffle 套装](https://www.trufflesuite.com/)

[Ganache | Truffle 套装](https://www.trufflesuite.com/ganache)

[什么是去中心化金融？ 初学者指南（2021 年更新）(99bitcoins.com)](https://99bitcoins.com/what-is-defi/)

[去中心化金融 - DeFi Pulse 的去中心化金融排行榜](https://defipulse.com/)
