---
title: DeFiアプリを作成してデプロイする
description: スマートコントラクトへERC-20トークンを入金し、Farm Tokenをミントする
author: "strykerin"
tags:
  - "Solidity"
  - "DeFi"
  - "web3.js"
  - "Truffle"
  - "Ganache"
  - "スマートコントラクト"
skill: intermediate
lang: ja
published: 2020-12-31
source: github.com
sourceUrl: https://github.com/strykerin/DeFi-Token-Farm
---

このチュートリアルでは、Solidity を使用して DeFi アプリケーションを構築します。このアプリケーションでは、ERC20 トークンをスマートコントラクトに入金した上で、Farm Token を発行して転送することができます。 ユーザーはその後、スマートコントラクトで Farm Token をバーンすることで ERC-20 トークンを引き出すことができ、ERC-20 トークンは再度ユーザーに転送されます。

## Truffle と Ganache をインストールする {#install-truffle-and-ganache}

はじめてスマートコントラクトを作成する場合は、環境設定が必要です。 [Truffle](https://www.trufflesuite.com/)と[Ganache](https://www.trufflesuite.com/ganache)という 2 つのツールを使用します。

Truffle はイーサリアムのスマートコントラクトを開発するための開発環境とテストフレームワークです。 Truffle を使用すると、簡単にスマートコントラクトを構築し、ブロックチェーンでデプロイできます。 Ganache は、スマートコントラクトをテストするために、ローカルのイーサリアムブロックチェーンを作成することができます。 Ganache は、実際のネットワークの機能をシミュレートし、最初の 10 アカウントに対しテスト用の 100ether が供給します。 これにより、無料で自由にスマートコントラクトをデプロイし、テストできるようになります。 Ganache は、デスクトップアプリケーションとコマンドラインツールの両方が提供されています。 この記事では、UI デスクトップアプリケーションを使用します。

![Ganache UIデスクトップアプリケーション](https://cdn-images-1.medium.com/max/2360/1*V1iQ5onbLbT5Ib2QaiOSyg.png)_Ganache の UI デスクトップアプリケーション _

プロジェクトを作成するには、次のコマンドを実行します

```bash
mkdir your-project-name
cd your-project-name
truffle init
```

これにより、スマートコントラクトを開発し、デプロイするための空のプロジェクトが作成されます。 作成したプロジェクトの構造は以下のようになります：

- `contracts`：Solidity で作成したスマートコントラクトのフォルダ

- `migrations`：デプロイ用スクリプトのフォルダ

- `test`：スマートコントラクトをテストするためのフォルダ

- `truffle-config.js`：Truffle の設定ファイル

## ERC-20 トークンを作成する {#create-the-erc20-token}

最初に、スマートコントラクトにステークするために使用する ERC-20 トークンを作成する必要があります。 代替可能なトークンを作成するには、まず OpenZeppelin ライブラリをインストールする必要があります。 このライブラリには、ERC-20 や ERC-721 のような標準の実装が含まれています。 インストールするには、以下のコマンドを実行します：

```bash
npm install @openzeppelin/contracts
```

OpenZeppelin ライブラリを使用して、`contracts/MyToken.sol`に以下の Solidity コードを書き込むことで ERC-20 トークンを作成できます。

```solidity
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MyToken is ERC20 {
    constructor() public ERC20("MyToken", "MTKN"){
        _mint(msg.sender, 1000000000000000000000000);
    }
}
```

上記のコードでは：

- 3 行目：このトークン標準の実装を含む OpenZeppelin から、ERC20.sol コントラクトをインポートします。

- 5 行目：ERC20.sol コントラクトを継承します。

- 6 行目：ERC20.sol コンストラクタを呼び出し、名前とシンボルパラメータを `"MyToken"` と `"MTKN"` として引き渡します。

- 7 行目：スマートコントラクトをデプロイしているアカウントに、100 万トークンを発行して転送します（ERC-20 トークンでは、デフォルトである小数点以下 18 桁を使用します。 つまり、1 トークンをミントしたい場合は、1000000000000000000 と、1 の後に 18 個の 0 を付けて表します） 。

以下の ERC20.sol コンストラクタの実装では、 `_decimals`フィールドが 18 に設定されているのが確認できます：

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

## ERC-20 トークンをコンパイルする {#compile-the-erc20-token}

スマートコントラクトをコンパイルするには、まず Solidity コンパイラのバージョンを確認してください。 バージョンを確認するには、以下のコマンドを実行します：

```bash
truffle version
```

デフォルトのバージョンは `Solidity v0.5.16` です。 このトークンは Solidity のバージョン `0.6.2` を使って作成されているため、このコマンドを実行してコントラクトをコンパイルしようとするとエラーが発生します。 使用したい Solidity コンパイラのバージョンを指定するには、`truffle-config.js`を開き、以下のように設定します。

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

以下のコマンドを実行すると、スマートコントラクトがコンパイルされます。

```bash
truffle compile
```

## ERC-20 トークンをデプロイする {#deploy-erc20-token}

コンパイルが完了すると、トークンをデプロイできるようになります。

`migrations`フォルダに、 `2_deploy_Tokens.js`という名前のファイルを作成します。 このファイルでは、ERC-20 トークンと Farm Token スマートコントラクトの両方をデプロイします。 以下のコードは、MyToken.sol コントラクトをデプロイするために使用します：

```javascript
const MyToken = artifacts.require("MyToken")

module.exports = async function (deployer, network, accounts) {
  // Deploy MyToken
  await deployer.deploy(MyToken)
  const myToken = await MyToken.deployed()
}
```

Ganache を開いて「QuickStart」のオプションを選択すると、ローカルのイーサリアムブロックチェーンが開始されます。 コントラクトをデプロイするには、以下を実行します：

```bash
truffle migrate
```

コントラクトのデプロイに使用するアドレスは、Ganache で表示されるアドレスリストの一番上のアドレスです。 これを確認するには、Ganache のデスクトップアプリケーションを開きます。スマートコントラクトをデプロイするためにコストが発生したため、リストの一番上のアカウントでは ether の残高が減少していることを確認してください。

![Ganacheデスクトップアプリケーション](https://cdn-images-1.medium.com/max/2346/1*1iJ9VRlyLuza58HL3DLfpg.png)_Ganache デスクトップアプリケーション_

デプロイ先アドレスに「MyToken」トークンが 100 万個送信されたことを確認するには、Truffle Console を使ってデプロイ済みのスマートコントラクトと接続します。

> [Truffle Console は、あらゆるイーサリアムクライアントに接続できる基本的な対話型コンソールです。](https://www.trufflesuite.com/docs/truffle/getting-started/using-truffle-develop-and-the-console)

スマートコントラクトとのやりとりを実行するには、以下のコマンドを実行します：

```bash
truffle console
```

ターミナル上で、以下のコマンドが入力可能になりました：

- スマートコントラクトの取得： `myToken = await MyToken.deployed()`

- Ganache からアカウント情報を取得する：`accounts = await web3.eth.getAccounts()`

- 一番上のアカウントの残高を取得する： `balance = await myToken.balanceOf(accounts[0])`

- 残高のフォーマットを、小数点以下 18 桁に設定する：`web3.utils.fromWei(balance.toString())`

上記のコマンドを実行すると、最初のアドレスに実際に 100 万個の MyTokens が含まれていることが確認できます。

![一番上のアドレスに、100万MyTokenが含まれています](https://cdn-images-1.medium.com/max/2000/1*AQlj9A7dw-qtY4QAD3Bpxw.png)

_最初のアドレスに、100 万 MyTokens が含まれています。_

## Farm Token のスマートコントラクトを作成する {#create-farmtoken-smart-contract}

Farm Token のスマートコントラクトは、以下の 3 つの機能を持ちます：

- `balance()`：Farm Token スマートコントラクトにおける MyToken の残高を取得します。

- `deposit(uint256 _amount)`：ユーザーを代理して MyToken を Farm Token スマートコントラクトに転送し、Farm Token を作成した上でユーザーに返送します。

- `withdraw(uint256 _amount)`：ユーザーの Farm Token をバーンし、MyToken をユーザーのアドレスに転送します。

以下の Farm Token コンストラクタを確認してください：

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

- 3 ～ 6 行目： OpenZeppelin から、以下のコントラクト（IERC20.sol、Address.sol、SafeERC20.sol、ERC20.sol）をインポートします。

- 8 行目：この Farm Token は、ERC-20 コントラクトを継承します。

- 14 ～ 19 行目：Farm Token コンストラクタは、MyToken コントラクトのアドレスをパラメータとして受け取り、このコントラクトに`token`の public 変数を割り当てます。

それでは、`balance()`関数を実装しましょう。 この関数は、パラメータを受け取らず、スマートコントラクトの MyToken 残高を返します。 以下のように実装します：

```solidity
function balance() public view returns (uint256) {
    return token.balanceOf(address(this));
}
```

`deposit(uint256 _amount)`関数は、ユーザーが入金したい金額をパラメータとして受け取り、Farm Token を作成した上でユーザーに転送します。

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

`withdraw(uint256 _amount)` 関数は、ユーザーがバーンしたい Farm Token の金額をパラメータして受け取り、同額の My Token をユーザーに転送します。

```solidity
function withdraw(uint256 _amount) public {
    // Burn FarmTokens from msg sender
    _burn(msg.sender, _amount);

    // Transfer MyTokens from this smart contract to msg sender
    token.safeTransfer(msg.sender, _amount);
}
```

次に、スマートコントラクトを実装します。 `2_deploy_Tokens.js`ファイルに戻り、デプロイする新しいコントラクトを追加してください：

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

Farm Token をデプロイする時は、デプロイ済みの MyToken コントラクトのアドレスがパラメータとして提供される点に注意してください。

次に、`truffle compile`と `truffle migrate`を実行して、コントラクトをデプロイします。

次に、スマートコントラクトのテストを実行します。 スマートコントラクトとのやり取りには、`truffle console`を使用するのではなく、テストプロセスを自動化するスクリプトを作成します。 `scripts`というフォルダを作成し、`getMyTokenBalance.js`ファイルを追加してください。 このファイルで、Farm Token スマートコントラクトにおける MyToken 残高を確認できます。

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

このスクリプトを実行するには、以下の cli コマンドを実行します：

```bash
truffle exec .\scripts\getMyTokenBalance.js
```

ここでは、予想通り「0」が表示されます。 Farm Token がデプロイされていないというエラーが表示された場合、Truffle ネットワークに最新バージョンのコントラクトコードが提供されていないことを意味します。 Ganache を閉じて再度 quickstart を実行してから、確実に`truffle migrate`を実行してください。

次に、MyToken をこのスマートコントラクト上でステーキングしましょう。 `deposit(uint256 _amount)` は ERC-20 の`safeTransferFrom`関数を呼び出す関数ですから、ユーザーはまず、スマートコントラクトがユーザーの代理として MyToken を送信するのを承認する必要があります。 このため以下のスクリプトでは、まずこのステップを承認し、その上で関数を呼び出します。

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

`truffle exec .\scripts\transferMyTokenToFarmToken.js`で、このスクリプトを実行できます。 コンソールには、次のように表示されます。

![transferMyTokenToFarmToken.jsの出力](https://cdn-images-1.medium.com/max/2000/1*MoekE2QCw7vB98u5dl7ang.png)

_transferMyTokenToFarmToken.js の出力_

一番上のアカウントに Farm Token が入金されたことが確認できるので、スマートコントラクトに MyToken を入金することができました。

出金は、以下の方法で行います：

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

`truffle exec .\scripts\drawMyTokenFromTokenFarm.js`で、このスクリプトを実行できます。 以下の出力では、再度 My Token を取得できており、Farm Token がバーンされたことを確認できます。

![withdrawMyTokenFromTokenFarm.jsの出力](https://cdn-images-1.medium.com/max/2000/1*jHYlTFg0NgGbhASpsRvc0w.png)

_withdrawMyTokenFromTokenFarm.js の出力_

## 参考文献 {#references}

[コントラクト - OpenZeppelin 関連文書](https://docs.openzeppelin.com/contracts/3.x/)

[スマートコントラクトに最適なツール | Truffle Suite](https://www.trufflesuite.com/)

[Ganache | Truffle Suite](https://www.trufflesuite.com/ganache)

[分散型金融（DeFi）とは 初心者向けガイド（2021 年更新版）（99bitcoins.com）](https://99bitcoins.com/what-is-defi/)

[DeFi - DeFi Llama の分散型金融リーダーボード](https://defillama.com/)
