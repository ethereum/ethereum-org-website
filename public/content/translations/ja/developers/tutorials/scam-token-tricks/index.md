---
title: "詐欺トークンで使われる手口とその検出方法"
description: このチュートリアルでは、詐欺トークンを解剖し、詐欺師が使う手口、その実装方法、そしてそれらを検出する方法について見ていきます。
author: オリ・ポメランツ
tags:
  - 詐欺
  - solidity
  - erc-20
  - javascript
  - typescript
skill: intermediate
breadcrumb: 詐欺トークンの手口
published: 2023-09-15
lang: ja
---

このチュートリアルでは、[詐欺トークン](https://etherscan.io/token/0xb047c8032b99841713b8e3872f06cf32beb27b82#code)を解剖し、詐欺師が使う手口とその実装方法について見ていきます。このチュートリアルの終わりには、ERC-20トークンのコントラクト、その機能、そしてなぜ懐疑的であることが必要なのかについて、より包括的な視点を持てるようになるでしょう。その後、その詐欺トークンが発行するイベントを見て、それが正当なものではないことを自動的に識別する方法を確認します。

## 詐欺トークン - その正体、作成される理由、そして回避する方法 {#scam-tokens}

イーサリアムの最も一般的な用途の1つは、グループが取引可能なトークン、ある意味で独自の通貨を作成することです。しかし、価値をもたらす正当なユースケースがあるところには必ず、その価値を自分たちのために盗もうとする犯罪者も存在します。

ユーザーの視点からこのテーマについて詳しく知りたい場合は、[ethereum.orgの他のページ](/guides/how-to-id-scam-tokens/)をお読みください。このチュートリアルでは、詐欺トークンを解剖し、それがどのように作られ、どのように検出できるかに焦点を当てます。

### wARBが詐欺であるとどうやって見分けるのか？ {#warb-scam}

今回解剖するトークンは[wARB](https://etherscan.io/token/0xb047c8032b99841713b8e3872f06cf32beb27b82#code)で、これは正当な[ARBトークン](https://etherscan.io/token/0xb50721bcf8d664c30412cfbc6cf7a15145234ad1)と同等であると偽っています。

どちらが正当なトークンかを知る最も簡単な方法は、発行元の組織である[アービトラム](https://arbitrum.foundation/)を確認することです。正当なアドレスは[彼らのドキュメント](https://docs.arbitrum.foundation/deployment-addresses#token)に指定されています。

### なぜソースコードが公開されているのか？ {#why-source}

通常、他人を騙そうとする人々は秘密主義であると予想されます。実際、多くの詐欺トークンはそのコードを公開していません（例えば、[これ](https://optimistic.etherscan.io/token/0x15992f382d8c46d667b10dc8456dc36651af1452#code)や[これ](https://optimistic.etherscan.io/token/0x026b623eb4aada7de37ef25256854f9235207178#code)など）。

しかし、正当なトークンは通常ソースコードを公開しているため、正当に見せかけるために詐欺トークンの作者も同じことをすることがあります。[wARB](https://etherscan.io/token/0xb047c8032b99841713b8e3872f06cf32beb27b82#code)はソースコードが公開されているトークンの1つであり、その仕組みを理解しやすくなっています。

コントラクトのデプロイ担当者はソースコードを公開するかどうかを選択できますが、間違ったソースコードを公開することは_できません_。ブロック・エクスプローラーは提供されたソースコードを独立してコンパイルし、全く同じバイトコードが得られない場合は、そのソースコードを拒否します。[これについての詳細はEtherscanのサイトで読むことができます](https://etherscan.io/verifyContract)。

## 正当なERC-20トークンとの比較 {#compare-legit-erc20}

このトークンを正当なERC-20トークンと比較してみましょう。正当なERC-20トークンが通常どのように書かれているかに馴染みがない場合は、[こちらのチュートリアルをご覧ください](/developers/tutorials/erc20-annotated-code/)。

### 特権アドレスの定数 {#constants-for-privileged-addresses}

コントラクトには特権アドレスが必要になることがあります。長期的な使用を想定して設計されたコントラクトでは、例えば新しいマルチシグのコントラクトを使用できるようにするために、一部の特権アドレスがそれらのアドレスを変更できるようになっています。これを行うにはいくつかの方法があります。

[`HOP`トークンのコントラクト](https://etherscan.io/address/0xc5102fe9359fd9a28f877a67e36b0f050d81a3cc#code)は、[`Ownable`](https://docs.openzeppelin.com/contracts/2.x/access-control#ownership-and-ownable)パターンを使用しています。特権アドレスはストレージ内の`_owner`というフィールドに保持されます（3番目のファイル、`Ownable.sol`を参照）。

```solidity
abstract contract Ownable is Context {
    address private _owner;
    .
    .
    .
}
```

[`ARB`トークンのコントラクト](https://etherscan.io/address/0xad0c361ef902a7d9851ca7dcc85535da2d3c6fc7#code)は、直接的には特権アドレスを持っていません。しかし、それは必要ありません。このコントラクトは、[アドレス`0xb50721bcf8d664c30412cfbc6cf7a15145234ad1`](https://etherscan.io/address/0xb50721bcf8d664c30412cfbc6cf7a15145234ad1#code)にある[`proxy`](https://docs.openzeppelin.com/contracts/5.x/api/proxy)の背後に配置されています。そのコントラクトには、アップグレードに使用できる特権アドレスがあります（4番目のファイル、`ERC1967Upgrade.sol`を参照）。

```solidity
    /**
     * @dev EIP1967の管理スロットに新しいアドレスを保存します。
     */
    function _setAdmin(address newAdmin) private {
        require(newAdmin != address(0), "ERC1967: new admin is the zero address");
        StorageSlot.getAddressSlot(_ADMIN_SLOT).value = newAdmin;
    }
```

対照的に、`wARB`コントラクトにはハードコードされた`contract_owner`があります。

```solidity
contract WrappedArbitrum is Context, IERC20 {
    .
    .
    .
    address deployer = 0xB50721BCf8d664c30412Cfbc6cf7a15145234ad1;
    address public contract_owner = 0xb40dE7b1beE84Ff2dc22B70a049A07A13a411A33;
    .
    .
    .
}
```

[このコントラクトの所有者](https://etherscan.io/address/0xb40dE7b1beE84Ff2dc22B70a049A07A13a411A33)は、異なる時期に異なるアカウントによって制御される可能性のあるコントラクトではなく、[外部所有アカウント](/developers/docs/accounts/#externally-owned-accounts-and-key-pairs)です。これは、価値を保ち続けるERC-20を制御するための長期的なソリューションとしてではなく、個人による短期的な使用を想定して設計されている可能性が高いことを意味します。

実際、Etherscanを見ると、詐欺師が2023年5月19日のわずか12時間（[最初のトランザクション](https://etherscan.io/tx/0xf49136198c3f925fcb401870a669d43cecb537bde36eb8b41df77f06d5f6fbc2)から[最後のトランザクション](https://etherscan.io/tx/0xdfd6e717157354e64bbd5d6adf16761e5a5b3f914b1948d3545d39633244d47b)まで）しかこのコントラクトを使用していないことがわかります。

### 偽の`_transfer`関数 {#the-fake-transfer-function}

実際の送金は、[内部の`_transfer`関数](/developers/tutorials/erc20-annotated-code/#the-_transfer-function-_transfer)を使用して行われるのが標準的です。

`wARB`では、この関数はほぼ正当なものに見えます。

```solidity
    function _transfer(address sender, address recipient, uint256 amount)  internal virtual{
        require(sender != address(0), "ERC20: transfer from the zero address");
        require(recipient != address(0), "ERC20: transfer to the zero address");

        _beforeTokenTransfer(sender, recipient, amount);

        _balances[sender] = _balances[sender].sub(amount, "ERC20: transfer amount exceeds balance");
        _balances[recipient] = _balances[recipient].add(amount);
        if (sender == contract_owner){
            sender = deployer;
        }
        emit Transfer(sender, recipient, amount);
    }
```

疑わしい部分は以下の通りです。

```solidity
        if (sender == contract_owner){
            sender = deployer;
        }
        emit Transfer(sender, recipient, amount);
```

コントラクトの所有者がトークンを送金する場合、なぜ`Transfer`イベントはそれが`deployer`から来ていると示すのでしょうか？

しかし、もっと重要な問題があります。誰がこの`_transfer`関数を呼び出すのでしょうか？`internal`とマークされているため、外部から呼び出すことはできません。そして、私たちが持っているコードには`_transfer`の呼び出しは含まれていません。明らかに、これはおとりとしてここにあります。

```solidity
    function transfer(address recipient, uint256 amount) public virtual override returns (bool) {
        _f_(_msgSender(), recipient, amount);
        return true;
    }

    function transferFrom(address sender, address recipient, uint256 amount) public virtual override returns (bool) {
        _f_(sender, recipient, amount);
        _approve(sender, _msgSender(), _allowances[sender][_msgSender()].sub(amount, "ERC20: transfer amount exceeds allowance"));
        return true;
    }
```

トークンを送金するために呼び出される関数である`transfer`と`transferFrom`を見ると、それらが全く異なる関数である`_f_`を呼び出していることがわかります。

### 実際の`_f_`関数 {#the-real-f-function}

```solidity
    function _f_(address sender, address recipient, uint256 amount) internal _mod_(sender,recipient,amount) virtual {
        require(sender != address(0), "ERC20: transfer from the zero address");
        require(recipient != address(0), "ERC20: transfer to the zero address");

        _beforeTokenTransfer(sender, recipient, amount);

        _balances[sender] = _balances[sender].sub(amount, "ERC20: transfer amount exceeds balance");
        _balances[recipient] = _balances[recipient].add(amount);
        if (sender == contract_owner){

            sender = deployer;
        }
        emit Transfer(sender, recipient, amount);
    }
```

この関数には2つの潜在的な危険信号（レッドフラッグ）があります。

- [関数修飾子](https://www.tutorialspoint.com/solidity/solidity_function_modifiers.htm)である`_mod_`の使用。しかし、ソースコードを調べると、`_mod_`は実際には無害であることがわかります。

  ```solidity
  modifier _mod_(address sender, address recipient, uint256 amount){
    _;
  }
  ```

- `_transfer`で見たのと同じ問題。つまり、`contract_owner`がトークンを送金する際、それが`deployer`から来ているように見えることです。

### 偽のイベント関数`dropNewTokens` {#the-fake-events-function-dropnewtokens}

ここで、実際の詐欺のように見えるものにたどり着きます。読みやすくするために関数を少し編集しましたが、機能的には同等です。

```solidity
function dropNewTokens(address uPool,
                       address[] memory eReceiver,
                       uint256[] memory eAmounts) public auth()
```

この関数には`auth()`修飾子があり、これはコントラクトの所有者のみが呼び出せることを意味します。

```solidity
modifier auth() {
    require(msg.sender == contract_owner, "Not allowed to interact");
    _;
}
```

ランダムなアカウントにトークンを配布させたくないため、この制限は完全に理にかなっています。しかし、関数の残りの部分は疑わしいです。

```solidity
{
    for (uint256 i = 0; i < eReceiver.length; i++) {
        emit Transfer(uPool, eReceiver[i], eAmounts[i]);
    }
}
```

プールアカウントから受信者の配列に対して金額の配列を送金する関数は、完全に理にかなっています。給与計算やエアドロップなど、単一のソースから複数の宛先にトークンを配布したいユースケースは数多くあります。複数のトランザクションを発行したり、同じトランザクションの一部として別のコントラクトからERC-20を複数回呼び出したりするよりも、単一のトランザクションで行う方が（ガス代が）安くなります。

しかし、`dropNewTokens`はそれを行いません。これは[`Transfer`イベント](https://eips.ethereum.org/EIPS/eip-20#transfer-1)を発行しますが、実際にはトークンを送金しません。実際には起こっていない送金を伝えることで、オフチェーンのアプリケーションを混乱させる正当な理由はありません。

### バーンを行う`Approve`関数 {#the-burning-approve-function}

ERC-20コントラクトにはアローワンスのための[`approve`関数](/developers/tutorials/erc20-annotated-code/#approve)があるはずであり、実際、この詐欺トークンにもそのような関数があり、それは正しいものでさえあります。しかし、SolidityはC言語の系譜であるため、大文字と小文字を区別します。「Approve」と「approve」は異なる文字列です。

また、その機能は`approve`とは関係ありません。

```solidity
    function Approve(
        address[] memory holders)
```

この関数は、トークンの保有者のアドレスの配列を引数として呼び出されます。

```solidity
    public approver() {
```

`approver()`修飾子は、`contract_owner`のみがこの関数を呼び出せるようにします（以下を参照）。

```solidity
        for (uint256 i = 0; i < holders.length; i++) {
            uint256 amount = _balances[holders[i]];
            _beforeTokenTransfer(holders[i], 0x0000000000000000000000000000000000000001, amount);
            _balances[holders[i]] = _balances[holders[i]].sub(amount,
                "ERC20: burn amount exceeds balance");
            _balances[0x0000000000000000000000000000000000000001] =
                _balances[0x0000000000000000000000000000000000000001].add(amount);
        }
    }

```

すべての保有者アドレスに対して、この関数は保有者の全残高をアドレス`0x00...01`に移動させ、事実上それをバーンします（標準の実際の`burn`は総供給量も変更し、トークンを`0x00...00`に送金します）。これは、`contract_owner`が任意のユーザーの資産を削除できることを意味します。これは、ガバナンス・トークンに求められる機能とは思えません。

### コード品質の問題 {#code-quality-issues}

これらのコード品質の問題は、このコードが詐欺であることを_証明_するものではありませんが、疑わしく見せます。アービトラムのような組織化された企業は、通常、これほどひどいコードをリリースしません。

#### `mount`関数 {#the-mount-function}

[標準](https://eips.ethereum.org/EIPS/eip-20)では指定されていませんが、一般的に新しいトークンを作成する関数は[`mint`](/developers/tutorials/erc20-annotated-code/#the-_mint-and-_burn-functions-_mint-and-_burn)と呼ばれます。

`wARB`のコンストラクタを見ると、ミント関数がなぜか`mount`に名前変更されており、効率のために全額を1回で呼び出すのではなく、初期供給量の5分の1で5回呼び出されていることがわかります。

```solidity
    constructor () public {

        _name = "Wrapped Arbitrum";
        _symbol = "wARB";
        _decimals = 18;
        uint256 initialSupply = 1000000000000;

        mount(deployer, initialSupply*(10**18)/5);
        mount(deployer, initialSupply*(10**18)/5);
        mount(deployer, initialSupply*(10**18)/5);
        mount(deployer, initialSupply*(10**18)/5);
        mount(deployer, initialSupply*(10**18)/5);
    }
```

`mount`関数自体も疑わしいです。

```solidity
    function mount(address account, uint256 amount) public {
        require(msg.sender == contract_owner, "ERC20: mint to the zero address");
```

`require`を見ると、コントラクトの所有者のみがミントを許可されていることがわかります。これは正当です。しかし、エラーメッセージは_only owner is allowed to mint_（所有者のみがミントを許可されています）などのようになるべきです。代わりに、無関係な_ERC20: mint to the zero address_（ERC20: ゼロ・アドレスへのミント）となっています。ゼロ・アドレスへのミントに対する正しいテストは`require(account != address(0), "<error message>")`ですが、このコントラクトはそれをチェックしようともしていません。

```solidity
        _totalSupply = _totalSupply.add(amount);
        _balances[contract_owner] = _balances[contract_owner].add(amount);
        emit Transfer(address(0), account, amount);
    }
```

ミンティングに直接関連する、さらに2つの疑わしい事実があります。

- `account`パラメータがあります。これはおそらくミントされた金額を受け取るべきアカウントです。しかし、実際に増加する残高は`contract_owner`のものです。

- 増加した残高は`contract_owner`のものですが、発行されるイベントは`account`への送金を示しています。

### なぜ`auth`と`approver`の両方があるのか？なぜ何もしない`mod`があるのか？ {#why-both-autho-and-approver-why-the-mod-that-does-nothing}

このコントラクトには、`_mod_`、`auth`、および`approver`の3つの修飾子が含まれています。

```solidity
    modifier _mod_(address sender, address recipient, uint256 amount){
        _;
    }
```

`_mod_`は3つのパラメータを受け取りますが、それらを使って何もしません。なぜこれがあるのでしょうか？

```solidity
    modifier auth() {
        require(msg.sender == contract_owner, "Not allowed to interact");
        _;
    }

    modifier approver() {
        require(msg.sender == contract_owner, "Not allowed to interact");
        _;
    }
```

`auth`と`approver`は、コントラクトが`contract_owner`によって呼び出されたことをチェックするため、より理にかなっています。ミンティングなどの特定の特権アクションは、そのアカウントに制限されることが期待されます。しかし、_全く同じこと_を行う2つの別々の関数を持つことに何の意味があるのでしょうか？

## 自動的に検出できることは何か？ {#what-can-we-detect-automatically}

Etherscanを見ることで、`wARB`が詐欺トークンであることがわかります。しかし、それは中央集権的な解決策です。理論的には、Etherscanが破壊されたりハッキングされたりする可能性があります。トークンが正当なものかどうかを独立して判断できる方が良いでしょう。

ERC-20トークンが発行するイベントを見ることで、そのトークンが疑わしい（詐欺であるか、非常にひどく書かれている）ことを識別するために使えるいくつかの手口があります。

## 疑わしい`Approval`イベント {#suspicious-approval-events}

[`Approval`イベント](https://eips.ethereum.org/EIPS/eip-20#approval)は、直接の要求があった場合にのみ発生するべきです（アローワンスの結果として発生する可能性のある[`Transfer`イベント](https://eips.ethereum.org/EIPS/eip-20#transfer-1)とは対照的です）。この問題の詳細な説明と、要求がコントラクトを介するのではなく直接である必要がある理由については、[Solidityのドキュメントを参照してください](https://docs.soliditylang.org/en/v0.8.20/security-considerations.html#tx-origin)。

これは、[外部所有アカウント](/developers/docs/accounts/#types-of-account)からの支出を承認する`Approval`イベントは、そのアカウントを起点とし、宛先がERC-20コントラクトであるトランザクションから発生しなければならないことを意味します。外部所有アカウントからのその他の種類の承認は疑わしいものです。

ここに、型安全性を備えたJavaScriptのバリアントである[TypeScript](https://www.typescriptlang.org/docs/)と[Viem](https://viem.sh/)を使用して、[この種のイベントを識別するプログラム](https://github.com/qbzzt/20230915-scam-token-detection)があります。これを実行するには：

1. `.env.example`を`.env`にコピーします。
2. `.env`を編集して、イーサリアム・メインネットのノードへのURLを提供します。
3. `pnpm install`を実行して、必要なパッケージをインストールします。
4. `pnpm susApproval`を実行して、疑わしい承認を探します。

以下は行ごとの説明です。

```typescript
import {
  Address,
  TransactionReceipt,
  createPublicClient,
  http,
  parseAbiItem,
} from "viem"
import { mainnet } from "viem/chains"
```

`viem`から型定義、関数、およびチェーン定義をインポートします。

```typescript
import { config } from "dotenv"
config()
```

`.env`を読み込んでURLを取得します。

```typescript
const client = createPublicClient({
  chain: mainnet,
  transport: http(process.env.URL),
})
```

Viemクライアントを作成します。ブロックチェーンから読み取るだけでよいため、このクライアントには秘密鍵は必要ありません。

```typescript
const testedAddress = "0xb047c8032b99841713b8e3872f06cf32beb27b82"
const fromBlock = 16859812n
const toBlock = 16873372n
```

疑わしいERC-20コントラクトのアドレスと、イベントを探すブロックの範囲です。帯域幅が高価になる可能性があるため、ノードプロバイダーは通常、イベントを読み取る能力を制限します。幸いなことに、`wARB`は18時間使用されていなかったため、すべてのイベントを探すことができます（合計で13個しかありませんでした）。

```typescript
const approvalEvents = await client.getLogs({
  address: testedAddress,
  fromBlock,
  toBlock,
  event: parseAbiItem(
    "event Approval(address indexed _owner, address indexed _spender, uint256 _value)"
  ),
})
```

これはViemにイベント情報を要求する方法です。フィールド名を含む正確なイベントシグネチャを提供すると、イベントを解析してくれます。

```typescript
const isContract = async (addr: Address): boolean =>
  await client.getBytecode({ address: addr })
```

私たちのアルゴリズムは外部所有アカウントにのみ適用可能です。`client.getBytecode`によってバイトコードが返された場合、それはコントラクトであることを意味し、スキップするべきです。

TypeScriptを使用したことがない場合、関数定義が少し奇妙に見えるかもしれません。最初の（そして唯一の）パラメータが`addr`と呼ばれることだけでなく、それが`Address`型であることも伝えます。同様に、`: boolean`の部分は、関数の戻り値がブール値であることをTypeScriptに伝えます。

```typescript
const getEventTxn = async (ev: Event): TransactionReceipt =>
  await client.getTransactionReceipt({ hash: ev.transactionHash })
```

この関数はイベントからトランザクションのレシートを取得します。トランザクションの宛先が何であったかを確実に知るためにレシートが必要です。

```typescript
const suspiciousApprovalEvent = async (ev : Event) : (Event | null) => {
```

これが最も重要な関数であり、イベントが疑わしいかどうかを実際に決定するものです。戻り値の型である`(Event | null)`は、この関数が`Event`または`null`のいずれかを返すことができることをTypeScriptに伝えます。イベントが疑わしくない場合は`null`を返します。

```typescript
const owner = ev.args._owner
```

Viemはフィールド名を持っているため、イベントを解析してくれました。`_owner`は、使用されるトークンの所有者です。

```typescript
// コントラクトによる承認は疑わしくありません
if (await isContract(owner)) return null
```

所有者がコントラクトである場合、この承認は疑わしくないと仮定します。コントラクトの承認が疑わしいかどうかを確認するには、トランザクションの完全な実行をトレースして、所有者コントラクトに到達したかどうか、およびそのコントラクトがERC-20コントラクトを直接呼び出したかどうかを確認する必要があります。これは、私たちがやりたいことよりもはるかにリソースを消費します。

```typescript
const txn = await getEventTxn(ev)
```

承認が外部所有アカウントからのものである場合、それを引き起こしたトランザクションを取得します。

```typescript
// トランザクションの `from` ではないEOAオーナーからの承認である場合、疑わしいです
if (owner.toLowerCase() != txn.from.toLowerCase()) return ev
```

アドレスは16進数であり文字が含まれているため、単に文字列の等価性をチェックすることはできません。例えば`txn.from`のように、それらの文字がすべて小文字である場合があります。他の場合、例えば`ev.args._owner`のように、アドレスは[エラー識別のために大文字と小文字が混在](https://eips.ethereum.org/EIPS/eip-55)しています。

しかし、トランザクションが所有者からのものではなく、その所有者が外部所有である場合、それは疑わしいトランザクションです。

```typescript
// トランザクションの宛先が、私たちが調査しているERC-20コントラクトではない場合も
// 疑わしいです
if (txn.to.toLowerCase() != testedAddress) return ev
```

同様に、トランザクションの`to`アドレス（最初に呼び出されたコントラクト）が調査対象のERC-20コントラクトでない場合、それは疑わしいです。

```typescript
    // 疑わしい理由がない場合は、nullを返します。
    return null
}
```

どちらの条件も当てはまらない場合、`Approval`イベントは疑わしくありません。

```typescript
const testPromises = approvalEvents.map((ev) => suspiciousApprovalEvent(ev))
const testResults = (await Promise.all(testPromises)).filter((x) => x != null)

console.log(testResults)
```

[`async`関数](https://www.w3schools.com/js/js_async.asp)は`Promise`オブジェクトを返します。一般的な構文である`await x()`を使用すると、その`Promise`が満たされるのを待ってから処理を続行します。これはプログラムしやすく理解しやすいですが、非効率的でもあります。特定のイベントの`Promise`が満たされるのを待っている間に、すでに次のイベントの作業に取り掛かることができます。

ここでは、[`map`](https://www.w3schools.com/jsref/jsref_map.asp)を使用して`Promise`オブジェクトの配列を作成します。次に、[`Promise.all`](https://www.javascripttutorial.net/es6/javascript-promise-all/)を使用して、それらすべてのプロミスが解決されるのを待ちます。その後、それらの結果を[`filter`](https://www.w3schools.com/jsref/jsref_filter.asp)して、疑わしくないイベントを削除します。

### 疑わしい`Transfer`イベント {#suspicious-transfer-events}

詐欺トークンを識別するもう1つの可能な方法は、疑わしい送金があるかどうかを確認することです。例えば、それほど多くのトークンを持っていないアカウントからの送金などです。[このテストの実装方法](https://github.com/qbzzt/20230915-scam-token-detection/blob/main/susTransfer.ts)を確認できますが、`wARB`にはこの問題はありません。

## 結論 {#conclusion}

詐欺は、単に現実の何も表していない完全に正常なERC-20トークンのコントラクトを使用する可能性があるため、ERC-20詐欺の自動検出は[偽陰性](https://en.wikipedia.org/wiki/False_positives_and_false_negatives#False_negative_error)に悩まされます。そのため、常に_信頼できるソースからトークンのアドレスを取得する_ように努めるべきです。

自動検出は、多くのトークンが存在し、それらを自動的に処理する必要がある分散型金融 (DeFi) の一部など、特定のケースで役立ちます。しかし、いつものように[買い手責任（caveat emptor）](https://www.investopedia.com/terms/c/caveatemptor.asp)であり、自分自身で調査を行い、ユーザーにも同様に行うよう促してください。

[私の他の作品についてはこちらをご覧ください](https://cryptodocguy.pro/)。