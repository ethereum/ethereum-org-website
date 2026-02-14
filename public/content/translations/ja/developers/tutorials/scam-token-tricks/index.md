---
title: "詐欺トークンで使われる手口と、その見分け方"
description: "このチュートリアルでは、詐欺トークンを分析し、詐欺師が使う手口、その実装方法、そしてそれを検出する方法を解説します。"
author: Ori Pomerantz
tags:
  [
    "詐欺",
    "Solidity",
    "ERC-20",
    "JavaScript",
    "typescript"
  ]
skill: intermediate
published: 2023-09-15
lang: ja
---

このチュートリアルでは、[ある詐欺トークン](https://etherscan.io/token/0xb047c8032b99841713b8e3872f06cf32beb27b82#code)を分析し、詐欺師が使う手口やその実装方法について見ていきます。 このチュートリアルを終える頃には、ERC-20トークンコントラクト、その機能、そしてなぜ懐疑的な見方が必要なのかについて、より包括的な見解を得られるでしょう。 次に、その詐欺トークンが発行するイベントを見て、それが正当なものでないことを自動的に特定する方法を見ていきます。

## 詐欺トークン - それは何であり、なぜ人々はそれを行い、どうすればそれを回避できるか {#scam-tokens}

イーサリアムの最も一般的な用途の1つは、グループが取引可能なトークン、いわば独自の通貨を作ることです。 価値をもたらす正当なユースケースを提供するトークンがある一方、その価値をトークン発行元が独占するようなトークンも存在します。

この件については、[ethereum.org の別の場所で](/guides/how-to-id-scam-tokens/)、ユーザーの視点から詳しく読むことができます。 このチュートリアルでは、詐欺トークンを分析し、それがどのように行われ、どのように検出できるかを見ていくことに焦点を当てます。

### wARBが詐欺だとどうしてわかるのか？ {#warb-scam}

私たちが分析するトークンは[wARB](https://etherscan.io/token/0xb047c8032b99841713b8e3872f06cf32beb27b82#code)で、正当な[ARBトークン](https://etherscan.io/token/0xb50721bcf8d664c30412cfbc6cf7a15145234ad1)と同等であるかのように装っています。

どちらが正当なトークンであるかを知る最も簡単な方法は、発行元の組織である[Arbitrum](https://arbitrum.foundation/)を見ることです。 正当なアドレスは、[彼らのドキュメント](https://docs.arbitrum.foundation/deployment-addresses#token)に明記されています。

### なぜソースコードは利用できるのですか？ {#why-source}

通常、他人を騙そうとする人々は秘密主義であると予想され、実際に多くの詐欺トークンはコードを公開していません（例えば、[これ](https://optimistic.etherscan.io/token/0x15992f382d8c46d667b10dc8456dc36651af1452#code)や[これ](https://optimistic.etherscan.io/token/0x026b623eb4aada7de37ef25256854f9235207178#code)など）。

しかし、正当なトークンは通常ソースコードを公開するため、詐欺トークンの作者も正当に見せかけるために、同じことをすることがあります。 [wARB](https://etherscan.io/token/0xb047c8032b99841713b8e3872f06cf32beb27b82#code)は、ソースコードが公開されているトークンの一つであり、そのため理解しやすくなっています。

コントラクトのデプロイ者はソースコードを公開するかどうかを選択できますが、間違ったソースコードを公開することは_できません_。 ブロックエクスプローラーは提供されたソースコードを独自にコンパイルし、全く同じバイトコードが得られなければ、そのソースコードを拒否します。 [これについてはEtherscanのサイトで詳しく読むことができます](https://etherscan.io/verifyContract)。

## 正当なERC-20トークンとの比較 {#compare-legit-erc20}

このトークンを正当なERC-20トークンと比較します。 正当なERC-20トークンが通常どのように書かれているかについて詳しくない場合は、[このチュートリアル](/developers/tutorials/erc20-annotated-code/)をご覧ください。

### 特権アドレスの定数 {#constants-for-privileged-addresses}

コントラクトには、特権アドレスが必要な場合があります。 長期的な使用を目的として設計されたコントラクトでは、一部の特権アドレスがそれらのアドレスを変更することを許可します。例えば、新しいマルチシグコントラクトの使用を可能にするためです。 これにはいくつかの方法があります。

[`HOP`トークンコントラクト](https://etherscan.io/address/0xc5102fe9359fd9a28f877a67e36b0f050d81a3cc#code)は、[`Ownable`](https://docs.openzeppelin.com/contracts/2.x/access-control#ownership-and-ownable)パターンを使用しています。 特権アドレスは、`_owner`と呼ばれるフィールドのストレージに保持されます（3番目のファイル`Ownable.sol`を参照）。

```solidity
abstract contract Ownable is Context {
    address private _owner;
    .
    .
    .
}
```

[`ARB`トークンコントラクト](https://etherscan.io/address/0xad0c361ef902a7d9851ca7dcc85535da2d3c6fc7#code)には、直接的な特権アドレスはありません。 しかし、それは必要ありません。 それは、[アドレス`0xb50721bcf8d664c30412cfbc6cf7a15145234ad1`](https://etherscan.io/address/0xb50721bcf8d664c30412cfbc6cf7a15145234ad1#code)にある[`proxy`](https://docs.openzeppelin.com/contracts/5.x/api/proxy)の背後にあります。 そのコントラクトには、アップグレードに使用できる特権アドレスがあります（4番目のファイル、`ERC1967Upgrade.sol`を参照）。

```solidity
    /**
     * @dev EIP1967の管理者スロットに新しいアドレスを格納します。
     */
    function _setAdmin(address newAdmin) private {
        require(newAdmin != address(0), "ERC1967: 新しい管理者はゼロアドレスです");
        StorageSlot.getAddressSlot(_ADMIN_SLOT).value = newAdmin;
    }
```

対照的に、`wARB`コントラクトにはハードコーディングされた`contract_owner`があります。

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

このコントラクトオーナーは、異なる時点で異なるアカウントによって制御されうるコントラクトではなく、[外部所有アカウント](/developers/docs/accounts/#externally-owned-accounts-and-key-pairs)です。 これは、価値を維持し続けるERC-20を管理するための長期的なソリューションとしてではなく、個人による短期的な使用のために設計されている可能性が高いことを意味します。

そして実際にEtherscanを見ると、詐欺師がこのコントラクトを使用したのは2023年5月19日のわずか12時間（[最初のトランザクション](https://etherscan.io/tx/0xf49136198c3f925fcb401870a669d43cecb537bde36eb8b41df77f06d5f6fbc2)から[最後のトランザクション](https://etherscan.io/tx/0xdfd6e717157354e64bbd5d6adf16761e5a5b3f914b1948d3545d39633244d47b)まで）だけであったことがわかります。

### 偽の`_transfer`関数 {#the-fake-transfer-function}

実際の送金は、[内部`_transfer`関数](/developers/tutorials/erc20-annotated-code/#the-_transfer-function-_transfer)を使用して行われるのが標準です。

`wARB`では、この関数はほとんど正当に見えます：

```solidity
    function _transfer(address sender, address recipient, uint256 amount)  internal virtual{
        require(sender != address(0), "ERC20: ゼロアドレスからの送金");
        require(recipient != address(0), "ERC20: ゼロアドレスへの送金");

        _beforeTokenTransfer(sender, recipient, amount);

        _balances[sender] = _balances[sender].sub(amount, "ERC20: 送金額が残高を超えています");
        _balances[recipient] = _balances[recipient].add(amount);
        if (sender == contract_owner){
            sender = deployer;
        }
        emit Transfer(sender, recipient, amount);
    }
```

疑わしい部分は次のとおりです：

```solidity
        if (sender == contract_owner){
            sender = deployer;
        }
        emit Transfer(sender, recipient, amount);
```

コントラクトオーナーがトークンを送金した場合、なぜ`Transfer`イベントでは`deployer`から送金されたと表示されるのでしょうか？

しかし、もっと重要な問題があります。 誰がこの`_transfer`関数を呼び出すのでしょうか？ これは外部からは呼び出せず、`internal`とマークされています。 そして、私たちが持っているコードには`_transfer`への呼び出しは含まれていません。 明らかに、これはおとりとしてここにあります。

```solidity
    function transfer(address recipient, uint256 amount) public virtual override returns (bool) {
        _f_(_msgSender(), recipient, amount);
        return true;
    }

    function transferFrom(address sender, address recipient, uint256 amount) public virtual override returns (bool) {
        _f_(sender, recipient, amount);
        _approve(sender, _msgSender(), _allowances[sender][_msgSender()].sub(amount, "ERC20: 送金額が許容量を超えています"));
        return true;
    }
```

トークンを転送するために呼び出される関数`transfer`と`transferFrom`を見ると、それらが全く異なる関数`_f_`を呼び出していることがわかります。

### 本当の`_f_`関数 {#the-real-f-function}

```solidity
    function _f_(address sender, address recipient, uint256 amount) internal _mod_(sender,recipient,amount) virtual {
        require(sender != address(0), "ERC20: ゼロアドレスからの送金");
        require(recipient != address(0), "ERC20: ゼロアドレスへの送金");

        _beforeTokenTransfer(sender, recipient, amount);

        _balances[sender] = _balances[sender].sub(amount, "ERC20: 送金額が残高を超えています");
        _balances[recipient] = _balances[recipient].add(amount);
        if (sender == contract_owner){

            sender = deployer;
        }
        emit Transfer(sender, recipient, amount);
    }
```

この関数には2つの潜在的な危険信号があります。

- [関数修飾子](https://www.tutorialspoint.com/solidity/solidity_function_modifiers.htm) `_mod_`の使用。 しかし、ソースコードを調べてみると、`_mod_`は実際には無害であることがわかります。

  ```solidity
  modifier _mod_(address sender, address recipient, uint256 amount){
    _;
  }
  ```

- `_transfer`で見たのと同じ問題で、`contract_owner`がトークンを送金すると、それらが`deployer`から来たように見えることです。

### 偽のイベント関数 `dropNewTokens` {#the-fake-events-function-dropNewTokens}

ここで、実際の詐欺のように見えるものにたどり着きます。 読みやすくするために少し関数を編集しましたが、機能的には同等です。

```solidity
function dropNewTokens(address uPool,
                       address[] memory eReceiver,
                       uint256[] memory eAmounts) public auth()
```

この関数には`auth()`修飾子があり、これはコントラクトオーナーによってのみ呼び出されることを意味します。

```solidity
modifier auth() {
    require(msg.sender == contract_owner, "対話は許可されていません");
    _;
}
```

この制限は完全に理にかなっています。なぜなら、私たちはランダムなアカウントがトークンを配布することを望まないからです。 しかし、関数の残りの部分は疑わしいです。

```solidity
{
    for (uint256 i = 0; i < eReceiver.length; i++) {
        emit Transfer(uPool, eReceiver[i], eAmounts[i]);
    }
}
```

プールアカウントから受信者の配列へ金額の配列を送金する関数は、完全に理にかなっています。 給与支払い、エアドロップなど、単一のソースから複数の宛先にトークンを配布したいユースケースはたくさんあります。 複数のトランザクションを発行したり、同じトランザクションの一部として別のコントラクトからERC-20を複数回呼び出したりする代わりに、単一のトランザクションで行う方が（ガス代が）安くなります。

しかし、`dropNewTokens`はそれをしません。 これは[`Transfer`イベント](https://eips.ethereum.org/EIPS/eip-20#transfer-1)を発行しますが、実際にはトークンを転送しません。 実際には起こらなかった送金をオフチェーンアプリケーションに伝えることで混乱させる正当な理由はありません。

### `Approve`関数を燃やす {#the-burning-approve-function}

ERC-20コントラクトは、許容量のために[an `approve` function](/developers/tutorials/erc20-annotated-code/#approve)を持つことになっており、実際、私たちの詐欺トークンにはそのような関数があり、しかも正しいものです。 しかし、SolidityはC言語から派生しているため、大文字と小文字が区別されます。 「Approve」と「approve」は異なる文字列です。

また、その機能は`approve`とは関係ありません。

```solidity
    function Approve(
        address[] memory holders)
```

この関数は、トークン保有者のアドレスの配列で呼び出されます。

```solidity
    public approver() {
```

`approver()` 修飾子は、`contract_owner` だけがこの関数を呼び出すことを許可するようにします（下記参照）。

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

ホルダーアドレスごとに、この関数はホルダーの残高全体を`0x00...01`アドレスに移動させ、事実上それをバーン（焼却）します（標準の実際の`burn`は総供給量も変更し、トークンを`0x00...00`に送金します）。 これは、`contract_owner`がどのユーザーの資産でも削除できることを意味します。 これは、ガバナンストークンに求める機能とは思えません。

### コード品質の問題 {#code-quality-issues}

これらのコード品質の問題は、このコードが詐欺であると_証明する_ものではありませんが、疑わしいものに見せます。 Arbitrumのような組織化された企業は、通常このような質の悪いコードをリリースしません。

#### `mount`関数 {#the-mount-function}

[標準](https://eips.ethereum.org/EIPS/eip-20)には明記されていませんが、一般的に新しいトークンを作成する関数は[`mint`](https://ethereum.org/el/developers/tutorials/erc20-annotated-code/#the-_mint-and-_burn-functions-_mint-and-_burn)と呼ばれます。

`wARB`のコンストラクタを見ると、ミント関数が何らかの理由で`mount`に改名されており、効率化のために全額を一度にではなく、初期供給の5分の1で5回呼び出されていることがわかります。

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

`require`を見ると、コントラクトオーナーだけがミントすることを許可されていることがわかります。 これは正当です。 しかし、エラーメッセージは_only owner is allowed to mint_（オーナーのみミント可能）などであるべきです。 代わりに、それは無関係な_ERC20: mint to the zero address_です。 ゼロアドレスへのミントを正しくテストするには `require(account != address(0), "<エラーメッセージ>")` としますが、コントラクトはこれをチェックする手間をかけていません。

```solidity
        _totalSupply = _totalSupply.add(amount);
        _balances[contract_owner] = _balances[contract_owner].add(amount);
        emit Transfer(address(0), account, amount);
    }
```

さらに2つ、直接ミントに関連する疑わしい事実があります。

- `account`パラメータがあり、これはミントされた量を受け取るべきアカウントであると推測されます。 しかし、実際に増加する残高は`contract_owner`のものです。

- 増加した残高は`contract_owner`のものですが、発行されたイベントは`account`への送金を示しています。

### なぜ `auth` と `approver` の両方があるのか？ なぜ何もしない`mod`があるのか？ {#why-both-autho-and-approver-why-the-mod-that-does-nothing}

このコントラクトには `_mod_`、`auth`、`approver` の3つの修飾子が含まれています。

```solidity
    modifier _mod_(address sender, address recipient, uint256 amount){
        _;
    }
```

`_mod_`は3つのパラメータを取り、それらで何もしません。 なぜそれがあるのでしょうか？

```solidity
    modifier auth() {
        require(msg.sender == contract_owner, "対話は許可されていません");
        _;
    }

    modifier approver() {
        require(msg.sender == contract_owner, "対話は許可されていません");
        _;
    }
```

`auth` と `approver` は、コントラクトが `contract_owner` によって呼び出されたことを確認するため、より理にかなっています。 ミントなどの特定の特権的なアクションは、そのアカウントに限定されることを期待します。 しかし、_全く同じこと_をする2つの別々の関数を持つことに何の意味があるのでしょうか？

## 何を自動的に検出できるか？ {#what-can-we-detect-automatically}

Etherscanを見ることで、`wARB`が詐欺トークンであることがわかります。 しかし、それは中央集権的な解決策です。 理論的には、Etherscanは転覆されたりハッキングされたりする可能性があります。 トークンが正当なものかどうかを独自に判断できる方が良いです。

発行するイベントを見ることで、ERC-20トークンが疑わしい（詐欺か、非常に плохоく書かれているか）ことを特定するためのいくつかのトリックがあります。

## 疑わしい`Approval`イベント {#suspicious-approval-events}

[`Approval`イベント](https://eips.ethereum.org/EIPS/eip-20#approval)は、直接のリクエストによってのみ発生すべきです（許容量の結果として発生する可能性のある[`Transfer`イベント](https://eips.ethereum.org/EIPS/eip-20#transfer-1)とは対照的です）。 この問題の詳細な説明と、なぜリクエストがコントラクトによって仲介されるのではなく直接である必要があるのかについては、[Solidityのドキュメント](https://docs.soliditylang.org/en/v0.8.20/security-considerations.html#tx-origin)を参照してください。

これは、[外部所有アカウント](/developers/docs/accounts/#types-of-account)からの支出を承認する`Approval`イベントは、そのアカウントから発生し、宛先がERC-20コントラクトであるトランザクションからでなければならないことを意味します。 外部所有アカウントからのその他の種類の承認は疑わしいです。

[viem](https://viem.sh/)と、型安全性を備えたJavaScriptの派生言語である[TypeScript](https://www.typescriptlang.org/docs/)を使用して、[この種のイベントを特定するプログラム](https://github.com/qbzzt/20230915-scam-token-detection)がここにあります。 実行方法：

1. `.env.example` を `.env` にコピーします。
2. `.env` を編集して、イーサリアムメインネットノードへのURLを提供します。
3. `pnpm install` を実行して、必要なパッケージをインストールします。
4. `pnpm susApproval` を実行して、疑わしい承認を検索します。

以下に一行ずつの説明を示します：

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

`viem`から型定義、関数、チェーン定義をインポートします。

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

Viemクライアントを作成します。 ブロックチェーンから読み取るだけなので、このクライアントには秘密鍵は必要ありません。

```typescript
const testedAddress = "0xb047c8032b99841713b8e3872f06cf32beb27b82"
const fromBlock = 16859812n
const toBlock = 16873372n
```

疑わしいERC-20コントラクトのアドレスと、イベントを検索するブロックの範囲です。 ノードプロバイダーは通常、帯域幅が高価になる可能性があるため、イベントを読み取る能力を制限します。 幸いなことに、`wARB`は18時間使用されていなかったので、すべてのイベント（合計でわずか13件）を調べることができます。

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

これはViemにイベント情報を要求する方法です。 フィールド名を含む正確なイベントシグネチャを提供すると、イベントが解析されます。

```typescript
const isContract = async (addr: Address): boolean =>
  await client.getBytecode({ address: addr })
```

私たちのアルゴリズムは、外部所有アカウントにのみ適用されます。 `client.getBytecode`によってバイトコードが返された場合、それはこれがコントラクトであることを意味し、スキップすべきです。

これまでにTypeScriptを使用したことがない場合、関数定義は少し奇妙に見えるかもしれません。 最初の（そして唯一の）パラメータが`addr`と呼ばれるだけでなく、それが`Address`型であることも伝えます。 同様に、`: boolean`の部分は、関数の戻り値がブール値であることをTypeScriptに伝えます。

```typescript
const getEventTxn = async (ev: Event): TransactionReceipt =>
  await client.getTransactionReceipt({ hash: ev.transactionHash })
```

この関数は、イベントからトランザクションレシートを取得します。 トランザクションの宛先が何であったかを確認するために、レシートが必要です。

```typescript
const suspiciousApprovalEvent = async (ev : Event) : (Event | null) => {
```

これは最も重要な関数で、イベントが疑わしいかどうかを実際に判断するものです。 戻り値の型 `(Event | null)` は、この関数が `Event` または `null` のいずれかを返すことができることを TypeScript に伝えます。 イベントが疑わしくない場合は`null`を返します。

```typescript
const owner = ev.args._owner
```

Viemはフィールド名を持っているので、イベントを解析してくれました。 `_owner`は、使用されるトークンの所有者です。

```typescript
// コントラクトによる承認は疑わしくない
if (await isContract(owner)) return null
```

所有者がコントラクトである場合、この承認は疑わしくないと仮定します。 コントラクトの承認が疑わしいかどうかを確認するには、トランザクションの完全な実行を追跡して、それが所有者コントラクトに到達したかどうか、そしてそのコントラクトがERC-20コントラクトを直接呼び出したかどうかを確認する必要があります。 それは、私たちが望むよりもはるかにリソースを消費します。

```typescript
const txn = await getEventTxn(ev)
```

承認が外部所有アカウントからのものである場合、それを引き起こしたトランザクションを取得します。

```typescript
// 承認は、トランザクションの`from`ではないEOA所有者からのものである場合、疑わしい
if (owner.toLowerCase() != txn.from.toLowerCase()) return ev
```

アドレスは16進数なので文字が含まれているため、単純に文字列の等価性をチェックすることはできません。 例えば、`txn.from`では、それらの文字はすべて小文字です。 `ev.args._owner`のような他のケースでは、アドレスは[エラー識別のために大文字と小文字が混在しています](https://eips.ethereum.org/EIPS/eip-55)。

しかし、トランザクションが所有者からのものではなく、その所有者が外部所有である場合、それは疑わしいトランザクションです。

```typescript
// トランザクションの宛先が調査中のERC-20コントラクトでない場合も
// 疑わしいです
if (txn.to.toLowerCase() != testedAddress) return ev
```

同様に、トランザクションの`to`アドレス、つまり最初に呼び出されたコントラクトが、調査対象のERC-20コントラクトでない場合も疑わしいです。

```typescript
    // 疑わしい理由がない場合は、nullを返します。
    return null
}
```

どちらの条件も真でない場合、`Approval`イベントは疑わしくありません。

```typescript
const testPromises = approvalEvents.map((ev) => suspiciousApprovalEvent(ev))
const testResults = (await Promise.all(testPromises)).filter((x) => x != null)

console.log(testResults)
```

[`async`関数](https://www.w3schools.com/js/js_async.asp)は`Promise`オブジェクトを返します。 一般的な構文 `await x()` を使用すると、その `Promise` が満たされるまで待ってから処理を続行します。 これはプログラムしやすく、追いやすいですが、非効率的でもあります。 特定のイベントの`Promise`が満たされるのを待っている間に、次のイベントの作業にすでに取りかかることができます。

ここでは[`map`](https://www.w3schools.com/jsref/jsref_map.asp)を使用して`Promise`オブジェクトの配列を作成します。 次に、[`Promise.all`](https://www.javascripttutorial.net/es6/javascript-promise-all/)を使用して、それらのすべてのプロミスが解決されるのを待ちます。 その後、それらの結果を[`filter`](https://www.w3schools.com/jsref/jsref_filter.asp)して、疑わしくないイベントを削除します。

### 疑わしい`Transfer`イベント {#suspicious-transfer-events}

詐欺トークンを特定するもう一つの可能性のある方法は、疑わしい送金があるかどうかを確認することです。 例えば、それほど多くのトークンを持っていないアカウントからの送金などです。 [このテストの実装方法](https://github.com/qbzzt/20230915-scam-token-detection/blob/main/susTransfer.ts)を見ることができますが、`wARB`にはこの問題はありません。

## 結論 {#conclusion}

詐欺が完全に正常なERC-20トークンコントラクトを使用し、それが何も実体を表していないだけの場合があるため、ERC-20詐欺の自動検出は[偽陰性](https://en.wikipedia.org/wiki/False_positives_and_false_negatives#False_negative_error)に悩まされます。 したがって、常に_信頼できる情報源からトークンアドレスを取得する_ように努めるべきです。

自動検出は、DeFiピースのような、多くのトークンがあり、それらを自動的に処理する必要がある特定のケースで役立ちます。 しかし、いつものように[caveat emptor](https://www.investopedia.com/terms/c/caveatemptor.asp)（買い手注意）、自分で調査し、ユーザーにも同様に行うよう奨励してください。

[私の他の作品はこちらでご覧いただけます](https://cryptodocguy.pro/).
