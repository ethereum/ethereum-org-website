---
title: "ERC-20コントラクトのウォークスルー"
description: "オープンツェッペリンのERC-20コントラクトには何が含まれており、なぜそれが存在するのでしょうか？"
author: "オリ・ポメランツ"
lang: ja
tags: ["Solidity", "erc-20"]
skill: beginner
breadcrumb: "ERC-20ウォークスルー"
published: 2021-03-09
---

## はじめに {#introduction}

イーサリアムの最も一般的な用途の1つは、グループが取引可能なトークン、ある意味で独自の通貨を作成することです。これらのトークンは通常、[ERC-20](/developers/docs/standards/tokens/erc-20/)という標準に従っています。この標準により、流動性プールやウォレットなど、すべてのERC-20トークンで機能するツールを作成できるようになります。この記事では、[オープンツェッペリンのSolidityによるERC20実装](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol)と、[インターフェース定義](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/IERC20.sol)を分析します。

これは注釈付きのソースコードです。ERC-20を実装したい場合は、[こちらのチュートリアルをお読みください](https://docs.openzeppelin.com/contracts/2.x/erc20-supply)。

## インターフェース {#the-interface}

ERC-20のような標準の目的は、ウォレットや分散型取引所などのアプリケーション間で相互運用可能な多くのトークン実装を可能にすることです。これを実現するために、[インターフェース](https://www.geeksforgeeks.org/solidity/solidity-basics-of-interface/)を作成します。トークン・コントラクトを使用する必要があるコードは、メタマスクのようなウォレットであれ、etherscan.ioのような分散型アプリケーション (dapp) であれ、流動性プールのような別のコントラクトであれ、インターフェース内の同じ定義を使用することで、それを使用するすべてのトークン・コントラクトと互換性を持つことができます。

![Illustration of the ERC-20 interface](erc20_interface.png)

経験豊富なプログラマーであれば、[Java](https://www.w3schools.com/java/java_interface.asp)や[C言語のヘッダーファイル](https://gcc.gnu.org/onlinedocs/cpp/Header-Files.html)で同様の構造を見たことがあるでしょう。

これはオープンツェッペリンによる[ERC-20インターフェース](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/IERC20.sol)の定義です。これは、[人間が読める標準](https://eips.ethereum.org/EIPS/eip-20)をSolidityコードに翻訳したものです。もちろん、インターフェース自体は_どのように_処理を行うかを定義するものではありません。それについては、以下のコントラクトのソースコードで説明されています。

&nbsp;

```solidity
// SPDX-License-Identifier: MIT
```

Solidityファイルにはライセンス識別子を含めることになっています。[ライセンスのリストはこちらで確認できます](https://spdx.org/licenses/)。異なるライセンスが必要な場合は、コメントで説明してください。

&nbsp;

```solidity
pragma solidity >=0.6.0 <0.8.0;
```

Solidity言語は現在も急速に進化しており、新しいバージョンは古いコードと互換性がない場合があります（[詳細はこちら](https://docs.soliditylang.org/en/v0.7.0/070-breaking-changes.html)）。そのため、言語の最小バージョンだけでなく、コードをテストした最新のバージョンである最大バージョンも指定することをお勧めします。

&nbsp;

```solidity
/**
 * @dev EIPで定義されているERC-20標準のインターフェース。
 */
```

コメント内の`@dev`は、ソースコードからドキュメントを生成するために使用される[NatSpecフォーマット](https://docs.soliditylang.org/en/develop/natspec-format.html)の一部です。

&nbsp;

```solidity
interface IERC20 {
```

慣例として、インターフェース名は`I`で始まります。

&nbsp;

```solidity
    /**
     * @dev 存在するトークンの量を返します。
     */
    function totalSupply() external view returns (uint256);
```

この関数は`external`であり、[コントラクトの外部からのみ呼び出すことができる](https://docs.soliditylang.org/en/v0.7.0/cheatsheet.html#index-2)ことを意味します。コントラクト内のトークンの総供給量を返します。この値は、イーサリアムで最も一般的な型である符号なし256ビット（256ビットはEVMのネイティブなワードサイズです）を使用して返されます。また、この関数は`view`でもあります。つまり、状態を変更しないため、ブロックチェーン内のすべてのノードで実行するのではなく、単一のノードで実行できます。この種の関数はトランザクションを生成せず、[ガス](/developers/docs/gas/)も消費しません。

**注:** 理論上は、コントラクトの作成者が実際の値よりも少ない総供給量を返すことで不正を行い、各トークンを実際よりも価値があるように見せかけることができるように思えるかもしれません。しかし、その懸念はブロックチェーンの真の性質を無視しています。ブロックチェーン上で起こるすべてのことは、すべてのノードによって検証可能です。これを実現するために、すべてのコントラクトの機械語コードとストレージはすべてのノードで利用可能になっています。コントラクトのSolidityコードを公開する義務はありませんが、ソースコードとコンパイルに使用したSolidityのバージョンを公開し、提供した機械語コードと照合して検証できるようにしない限り、誰もあなたを真剣に受け止めないでしょう。例えば、[こちらのコントラクト](https://eth.blockscout.com/address/0xa530F85085C6FE2f866E7FdB716849714a89f4CD?tab=contract)をご覧ください。

&nbsp;

```solidity
    /**
     * @dev `account` が所有するトークンの量を返します。
     */
    function balanceOf(address account) external view returns (uint256);
```

名前が示す通り、`balanceOf`はアカウントの残高を返します。イーサリアムのアカウントは、Solidityでは160ビットを保持する`address`型を使用して識別されます。これも`external`および`view`です。

&nbsp;

```solidity
    /**
     * @dev 呼び出し元のアカウントから `recipient` へ `amount` 分のトークンを送金します。
     *
     * 操作が成功したかどうかを示すブール値を返します。
     *
     * {Transfer} イベントを発行します。
     */
    function transfer(address recipient, uint256 amount) external returns (bool);
```

`transfer`関数は、呼び出し元から別のアドレスへトークンを送金します。これには状態の変更が伴うため、`view`ではありません。ユーザーがこの関数を呼び出すと、トランザクションが作成され、ガスが消費されます。また、ブロックチェーン上の全員にイベントを知らせるために、`Transfer`イベントを発行します。

この関数には、2つの異なるタイプの呼び出し元に対して2種類の出力があります。

- ユーザーインターフェースから直接関数を呼び出すユーザー。通常、ユーザーはトランザクションを送信し、無期限に時間がかかる可能性のある応答を待ちません。ユーザーは、トランザクション・レシート（トランザクション・ハッシュによって識別されます）を探すか、`Transfer`イベントを探すことで、何が起こったかを確認できます。
- 全体的なトランザクションの一部として関数を呼び出す他のコントラクト。これらのコントラクトは同じトランザクション内で実行されるため、結果をすぐに取得でき、関数の戻り値を使用できます。

コントラクトの状態を変更する他の関数でも、同じタイプの出力が作成されます。

&nbsp;

アローワンスは、あるアカウントが別の所有者に属するトークンの一部を消費することを許可します。これは、例えば販売者として機能するコントラクトにとって有用です。コントラクトはイベントを監視できないため、購入者が販売者コントラクトに直接トークンを送金した場合、そのコントラクトは支払いが行われたことを知ることができません。代わりに、購入者は販売者コントラクトに一定額の消費を許可し、販売者がその額を送金します。これは販売者コントラクトが呼び出す関数を通じて行われるため、販売者コントラクトはそれが成功したかどうかを知ることができます。

```solidity
    /**
     * @dev `spender` が {transferFrom} を通じて `owner` の代わりに消費できるトークンの残りの数を返します。デフォルトではゼロです。
     *
     * この値は {approve} または {transferFrom} が呼び出されたときに変化します。
     */
    function allowance(address owner, address spender) external view returns (uint256);
```

`allowance`関数を使用すると、あるアドレス（`owner`）が別のアドレス（`spender`）に消費を許可しているアローワンスがいくらであるかを誰でも照会できます。

&nbsp;

```solidity
    /**
     * @dev 呼び出し元のトークンに対する `spender` のアローワンスとして `amount` を設定します。
     *
     * 操作が成功したかどうかを示すブール値を返します。
     *
     * 重要: このメソッドでアローワンスを変更すると、不運なトランザクションの順序付けにより、誰かが古いアローワンスと新しいアローワンスの両方を使用するリスクがあることに注意してください。この競合状態を軽減する1つの可能な解決策は、最初にspenderのアローワンスを0に減らし、その後で目的の値を設定することです:
     * https://github.com/ethereum/EIPs/issues/20#issuecomment-263524729
     *
     * {Approval} イベントを発行します。
     */
    function approve(address spender, uint256 amount) external returns (bool);
```

`approve`関数はアローワンスを作成します。これがどのように悪用される可能性があるかについてのメッセージを必ず読んでください。イーサリアムでは、自分自身のトランザクションの順序は制御できますが、相手のトランザクションが発生したのを確認するまで自分のトランザクションを送信しない限り、他人のトランザクションが実行される順序を制御することはできません。

&nbsp;

```solidity
    /**
     * @dev アローワンスのメカニズムを使用して、`sender` から `recipient` へ `amount` 分のトークンを送金します。その後、`amount` は呼び出し元のアローワンスから差し引かれます。
     *
     * 操作が成功したかどうかを示すブール値を返します。
     *
     * {Transfer} イベントを発行します。
     */
    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);
```

最後に、`transferFrom`は、消費者が実際にアローワンスを消費するために使用されます。

&nbsp;

```solidity

    /**
     * @dev `value` 分のトークンがあるアカウント (`from`) から別のアカウント (`to`) へ送金されたときに発行されます。
     *
     * `value` はゼロになる可能性があることに注意してください。
     */
    event Transfer(address indexed from, address indexed to, uint256 value);

    /**
     * @dev {approve} の呼び出しによって `owner` に対する `spender` のアローワンスが設定されたときに発行されます。`value` は新しいアローワンスです。
     */
    event Approval(address indexed owner, address indexed spender, uint256 value);
}
```

これらのイベントは、ERC-20コントラクトの状態が変化したときに発行されます。

## 実際のコントラクト {#the-actual-contract}

これはERC-20標準を実装する実際のコントラクトであり、[こちらから引用](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol)したものです。そのまま使用することを意図したものではありませんが、これを[継承](https://www.tutorialspoint.com/solidity/solidity_inheritance.htm)して拡張することで、実用的なものにすることができます。

```solidity
// SPDX-License-Identifier: MIT
pragma solidity >=0.6.0 <0.8.0;
```

&nbsp;

### インポート文 {#import-statements}

上記のインターフェース定義に加えて、コントラクト定義は他の2つのファイルをインポートします。

```solidity

import "../../GSN/Context.sol";
import "./IERC20.sol";
import "../../math/SafeMath.sol";
```

- `GSN/Context.sol`は、イーサを持たないユーザーがブロックチェーンを使用できるようにするシステムである[OpenGSN](https://opengsn.org/)を使用するために必要な定義です。これは古いバージョンであることに注意してください。OpenGSNと統合したい場合は、[こちらのチュートリアルを使用してください](https://docs.opengsn.org/javascript-client/tutorial.html)。
- [SafeMathライブラリ](https://ethereumdev.io/using-safe-math-library-to-prevent-from-overflows/)は、Solidityバージョン**&lt;0.8.0**での算術オーバーフロー/アンダーフローを防ぎます。Solidity ≥0.8.0では、算術演算はオーバーフロー/アンダーフロー時に自動的にリバートされるため、SafeMathは不要です。このコントラクトは、古いコンパイラバージョンとの下位互換性のためにSafeMathを使用しています。

&nbsp;

このコメントはコントラクトの目的を説明しています。

```solidity
/**
 * @dev {IERC20} インターフェースの実装。
 *
 * この実装はトークンの作成方法に依存しません。つまり、派生コントラクトで {_mint} を使用して供給メカニズムを追加する必要があります。
 * 一般的なメカニズムについては {ERC20PresetMinterPauser} を参照してください。
 *
 * ヒント: 詳細な解説については、私たちのガイドを参照してください
 * https://forum.zeppelin.solutions/t/how-to-implement-erc20-supply-mechanisms/226[How
 * to implement supply mechanisms]。
 *
 * 一般的なオープンツェッペリンのガイドラインに従っています: 関数は失敗時に `false` を返すのではなく、リバート（revert）します。この動作は依然として慣例的であり、ERC-20アプリケーションの期待と矛盾しません。
 *
 * さらに、{transferFrom} の呼び出し時に {Approval} イベントが発行されます。
 * これにより、アプリケーションは当該イベントをリッスンするだけで、すべてのアカウントのアローワンスを再構築できます。仕様では要求されていないため、EIPの他の実装ではこれらのイベントが発行されない場合があります。
 *
 * 最後に、アローワンスの設定に関するよく知られた問題を軽減するために、非標準の {decreaseAllowance} および {increaseAllowance}
 * 関数が追加されました。{IERC20-approve} を参照してください。
 */

```

### コントラクト定義 {#contract-definition}

```solidity
contract ERC20 is Context, IERC20 {
```

この行は継承を指定しています。この場合は、上記の`IERC20`と、OpenGSN用の`Context`からの継承です。

&nbsp;

```solidity

    using SafeMath for uint256;

```

この行は、`SafeMath`ライブラリを`uint256`型にアタッチします。このライブラリは[こちら](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/utils/math/SafeMath.sol)で確認できます。

### 変数定義 {#variable-definitions}

これらの定義は、コントラクトの状態変数を指定します。これらの変数は`private`として宣言されていますが、これはブロックチェーン上の他のコントラクトがそれらを読み取れないことを意味するだけです。_ブロックチェーン上に秘密はありません_。すべてのノードのソフトウェアは、すべてのブロックにおけるすべてのコントラクトの状態を保持しています。慣例として、状態変数の名前は`_<something>`のようになります。

最初の2つの変数は[マッピング](https://www.tutorialspoint.com/solidity/solidity_mappings.htm)です。つまり、キーが数値であることを除けば、[連想配列](https://wikipedia.org/wiki/Associative_array)とほぼ同じように動作します。ストレージは、デフォルト（ゼロ）とは異なる値を持つエントリに対してのみ割り当てられます。

```solidity
    mapping (address => uint256) private _balances;
```

最初のマッピングである`_balances`は、アドレスとそれぞれのこのトークンの残高です。残高にアクセスするには、`_balances[<address>]`という構文を使用します。

&nbsp;

```solidity
    mapping (address => mapping (address => uint256)) private _allowances;
```

この変数`_allowances`は、先ほど説明したアローワンスを保存します。最初のインデックスはトークンの所有者であり、2番目はアローワンスを持つコントラクトです。アドレスAがアドレスBのアカウントから消費できる金額にアクセスするには、`_allowances[B][A]`を使用します。

&nbsp;

```solidity
    uint256 private _totalSupply;
```

名前が示す通り、この変数はトークンの総供給量を追跡します。

&nbsp;

```solidity
    string private _name;
    string private _symbol;
    uint8 private _decimals;
```

これら3つの変数は可読性を向上させるために使用されます。最初の2つは説明不要ですが、`_decimals`はそうではありません。

一方で、イーサリアムには浮動小数点や小数の変数がありません。他方で、人間はトークンを分割できることを好みます。人々が通貨として金に落ち着いた理由の1つは、誰かがアヒル1羽分の牛を買いたいと思ったときに、お釣りを作るのが難しかったからです。

解決策は、整数を追跡しつつ、実際のトークンの代わりに、ほとんど価値のない分割されたトークンを数えることです。イーサの場合、分割されたトークンはWeiと呼ばれ、10^18 Weiが1 ETHに等しくなります。執筆時点では、10,000,000,000,000 Weiが約1米セントまたは1ユーロセントに相当します。

アプリケーションは、トークン残高をどのように表示するかを知る必要があります。ユーザーが3,141,000,000,000,000,000 Weiを持っている場合、それは3.14 ETHでしょうか？ 31.41 ETHでしょうか？ それとも3,141 ETHでしょうか？ イーサの場合は1 ETHあたり10^18 Weiと定義されていますが、独自のトークンでは異なる値を選択できます。トークンを分割することに意味がない場合は、`_decimals`の値をゼロにすることができます。ETHと同じ標準を使用したい場合は、値として**18**を使用します。

### コンストラクタ {#the-constructor}

```solidity
    /**
     * @dev {name} と {symbol} の値を設定し、{decimals} をデフォルト値の18で初期化します。
     *
     * {decimals} に別の値を選択するには、{_setupDecimals} を使用します。
     *
     * これら3つの値はすべて不変です: コンストラクタの実行中に1回だけ設定できます。
     */
    constructor (string memory name_, string memory symbol_) public {
        // Solidity ≥0.7.0では、'public' は暗黙的であり、省略できます。

        _name = name_;
        _symbol = symbol_;
        _decimals = 18;
    }
```

コンストラクタは、コントラクトが最初に作成されたときに呼び出されます。慣例として、関数のパラメータ名は`<something>_`のようになります。

### ユーザーインターフェース関数 {#user-interface-functions}

```solidity
    /**
     * @dev トークンの名前を返します。
     */
    function name() public view returns (string memory) {
        return _name;
    }

    /**
     * @dev トークンのシンボルを返します。通常は名前の短いバージョンです。
     */
    function symbol() public view returns (string memory) {
        return _symbol;
    }

    /**
     * @dev ユーザー表現を取得するために使用される小数点以下の桁数を返します。
     * 例えば、`decimals` が `2` に等しい場合、`505` トークンの残高はユーザーに `5,05` (`505 / 10 ** 2`) として表示されるべきです。
     *
     * トークンは通常、イーサとWeiの関係を模倣して、18の値を選択します。これは、{_setupDecimals} が呼び出されない限り、{ERC20} が使用する値です。
     *
     * 注: この情報は _表示_ 目的でのみ使用されます: {IERC20-balanceOf} や {IERC20-transfer} を含む、コントラクトのいかなる算術演算にも影響を与えません。
     */
    function decimals() public view returns (uint8) {
        return _decimals;
    }
```

これらの関数（`name`、`symbol`、および`decimals`）は、ユーザーインターフェースがコントラクトについて認識し、適切に表示できるようにするのに役立ちます。

戻り値の型は`string memory`であり、メモリに保存された文字列を返すことを意味します。文字列などの変数は、次の3つの場所に保存できます。

|          | ライフタイム | コントラクトのアクセス | ガス・コスト |
| -------- | ------------- | --------------- | -------------------------------------------------------------- |
| Memory   | 関数呼び出し | 読み取り/書き込み | 数十から数百（上位の場所ほど高くなる） |
| Calldata | 関数呼び出し | 読み取り専用 | 戻り値の型としては使用できず、関数のパラメータ型としてのみ使用可能 |
| Storage  | 変更されるまで | 読み取り/書き込み | 高い（読み取りに800、書き込みに20k） |

この場合、`memory`が最良の選択です。

### トークン情報の読み取り {#read-token-information}

これらは、トークンに関する情報（総供給量またはアカウントの残高）を提供する関数です。

```solidity
    /**
     * @dev {IERC20-totalSupply} を参照してください。
     */
    function totalSupply() public view override returns (uint256) {
        return _totalSupply;
    }
```

`totalSupply`関数は、トークンの総供給量を返します。

&nbsp;

```solidity
    /**
     * @dev {IERC20-balanceOf} を参照してください。
     */
    function balanceOf(address account) public view override returns (uint256) {
        return _balances[account];
    }
```

アカウントの残高を読み取ります。誰でも他人のアカウント残高を取得できることに注意してください。この情報はどのみちすべてのノードで利用可能であるため、隠そうとしても意味がありません。_ブロックチェーン上に秘密はありません。_

### トークンの送金 {#transfer-tokens}

```solidity
    /**
     * @dev {IERC20-transfer} を参照してください。
     *
     * 要件:
     *
     * - `recipient` はゼロ・アドレスであってはなりません。
     * - 呼び出し元は少なくとも `amount` の残高を持っていなければなりません。
     */
    function transfer(address recipient, uint256 amount) public virtual override returns (bool) {
```

`transfer`関数は、送信者のアカウントから別のアカウントへトークンを送金するために呼び出されます。ブール値を返しますが、その値は常に**true**であることに注意してください。送金が失敗した場合、コントラクトは呼び出しをリバートします。

&nbsp;

```solidity
        _transfer(_msgSender(), recipient, amount);
        return true;
    }
```

`_transfer`関数が実際の作業を行います。これは、他のコントラクト関数からのみ呼び出すことができるプライベート関数です。慣例として、プライベート関数は状態変数と同様に`_<something>`のように名付けられます。

通常、Solidityではメッセージの送信者に`msg.sender`を使用します。しかし、それでは[OpenGSN](https://opengsn.org/)が機能しなくなります。トークンでイーサ不要のトランザクションを許可したい場合は、`_msgSender()`を使用する必要があります。これは通常のトランザクションでは`msg.sender`を返しますが、イーサ不要のトランザクションでは、メッセージを中継したコントラクトではなく、元の署名者を返します。

### アローワンス関数 {#allowance-functions}

これらはアローワンス機能を実装する関数です：`allowance`、`approve`、`transferFrom`、および`_approve`。さらに、オープンツェッペリンの実装は基本標準を超えて、セキュリティを向上させるいくつかの機能（`increaseAllowance`および`decreaseAllowance`）を含んでいます。

#### allowance関数 {#allowance}

```solidity
    /**
     * @dev {IERC20-allowance} を参照してください。
     */
    function allowance(address owner, address spender) public view virtual override returns (uint256) {
        return _allowances[owner][spender];
    }
```

`allowance`関数を使用すると、誰でも任意のアローワンスを確認できます。

#### approve関数 {#approve}

```solidity
    /**
     * @dev {IERC20-approve} を参照してください。
     *
     * 要件:
     *
     * - `spender` はゼロ・アドレスであってはなりません。
     */
    function approve(address spender, uint256 amount) public virtual override returns (bool) {
```

この関数はアローワンスを作成するために呼び出されます。上記の`transfer`関数に似ています。

- この関数は、実際の作業を行う内部関数（この場合は`_approve`）を呼び出すだけです。
- この関数は、`true`を返すか（成功した場合）、リバートします（失敗した場合）。

&nbsp;

```solidity
        _approve(_msgSender(), spender, amount);
        return true;
    }
```

状態の変更が発生する場所の数を最小限に抑えるために、内部関数を使用します。状態を変更する_あらゆる_関数は、セキュリティ監査が必要な潜在的なセキュリティリスクとなります。この方法により、間違いを犯す可能性を減らすことができます。

#### transferFrom関数 {#transferfrom}

これは、消費者がアローワンスを消費するために呼び出す関数です。これには2つの操作が必要です。消費される金額を送金することと、その金額分だけアローワンスを減らすことです。

```solidity
    /**
     * @dev {IERC20-transferFrom} を参照してください。
     *
     * 更新されたアローワンスを示す {Approval} イベントを発行します。これはEIPでは要求されていません。{ERC20} の冒頭の注記を参照してください。
     *
     * 要件:
     *
     * - `sender` と `recipient` はゼロ・アドレスであってはなりません。
     * - `sender` は少なくとも `amount` の残高を持っていなければなりません。
     * - 呼び出し元は ``sender`` のトークンに対して少なくとも `amount` のアローワンスを持っていなければなりません。
     */
    function transferFrom(address sender, address recipient, uint256 amount) public virtual
                                                override returns (bool) {
        _transfer(sender, recipient, amount);
```

&nbsp;

`a.sub(b, "message")`関数の呼び出しは2つのことを行います。まず、新しいアローワンスである`a-b`を計算します。次に、この結果が負でないことを確認します。負の場合、呼び出しは提供されたメッセージとともにリバートされます。呼び出しがリバートされると、その呼び出し中に以前に行われた処理はすべて無視されるため、`_transfer`を元に戻す必要はないことに注意してください。

```solidity
        _approve(sender, _msgSender(), _allowances[sender][_msgSender()].sub(amount,
             "ERC20: transfer amount exceeds allowance"));
        return true;
    }
```

#### オープンツェッペリンの安全性追加機能 {#openzeppelin-safety-additions}

ゼロでないアローワンスを別のゼロでない値に設定することは危険です。なぜなら、制御できるのは自分自身のトランザクションの順序だけであり、他人のトランザクションの順序は制御できないからです。純真なアリスと不誠実なビルという2人のユーザーがいると想像してください。アリスはビルから何らかのサービスを受けたいと考えており、その費用が5トークンだと思っているため、ビルに5トークンのアローワンスを与えます。

その後、状況が変わり、ビルの価格が10トークンに上がります。依然としてサービスを望んでいるアリスは、ビルのアローワンスを10に設定するトランザクションを送信します。ビルはトランザクション・プールでこの新しいトランザクションを見た瞬間に、アリスの5トークンを消費するトランザクションを送信します。このとき、より早くマイニングされるようにガス価格をはるかに高く設定します。そうすることで、ビルは最初に5トークンを消費し、アリスの新しいアローワンスがマイニングされた後、さらに10トークンを消費して、アリスが承認するつもりだった以上の合計15トークンを得ることができます。この手法は[フロントランニング](https://consensysdiligence.github.io/smart-contract-best-practices/attacks/#front-running)と呼ばれます。

| アリスのトランザクション | アリスのナンス | ビルのトランザクション | ビルのナンス | ビルのアローワンス | アリスからのビルの総収入 |
| ----------------- | ----------- | ----------------------------- | ---------- | ---------------- | ---------------------------- |
| approve(Bill, 5)  | 10          |                               |            | 5                | 0                            |
|                   |             | transferFrom(Alice, Bill, 5)  | 10,123     | 0                | 5                            |
| approve(Bill, 10) | 11          |                               |            | 10               | 5                            |
|                   |             | transferFrom(Alice, Bill, 10) | 10,124     | 0                | 15                           |

この問題を回避するために、これら2つの関数（`increaseAllowance`および`decreaseAllowance`）を使用すると、特定の金額だけアローワンスを変更できます。したがって、ビルがすでに5トークンを消費していた場合、彼はさらに5トークンしか消費できなくなります。タイミングに応じて、これが機能する2つの方法がありますが、どちらもビルが10トークンしか得られないという結果に終わります。

A:

| アリスのトランザクション | アリスのナンス | ビルのトランザクション | ビルのナンス | ビルのアローワンス | アリスからのビルの総収入 |
| -------------------------- | ----------: | ---------------------------- | ---------: | ---------------: | ---------------------------- |
| approve(Bill, 5)           |          10 |                              |            |                5 | 0                            |
|                            |             | transferFrom(Alice, Bill, 5) |     10,123 |                0 | 5                            |
| increaseAllowance(Bill, 5) |          11 |                              |            |          0+5 = 5 | 5                            |
|                            |             | transferFrom(Alice, Bill, 5) |     10,124 |                0 | 10                           |

B:

| アリスのトランザクション | アリスのナンス | ビルのトランザクション | ビルのナンス | ビルのアローワンス | アリスからのビルの総収入 |
| -------------------------- | ----------: | ----------------------------- | ---------: | ---------------: | ---------------------------: |
| approve(Bill, 5)           |          10 |                               |            |                5 |                            0 |
| increaseAllowance(Bill, 5) |          11 |                               |            |         5+5 = 10 |                            0 |
|                            |             | transferFrom(Alice, Bill, 10) |     10,124 |                0 |                           10 |

```solidity
    /**
     * @dev 呼び出し元によって `spender` に付与されたアローワンスをアトミックに増加させます。
     *
     * これは {approve} の代替であり、{IERC20-approve} で説明されている問題の軽減策として使用できます。
     *
     * 更新されたアローワンスを示す {Approval} イベントを発行します。
     *
     * 要件:
     *
     * - `spender` はゼロ・アドレスであってはなりません。
     */
    function increaseAllowance(address spender, uint256 addedValue) public virtual returns (bool) {
        _approve(_msgSender(), spender, _allowances[_msgSender()][spender].add(addedValue));
        return true;
    }
```

`a.add(b)`関数は安全な加算です。万が一`a`+`b`>=`2^256`となった場合でも、通常の加算のようにラップアラウンド（オーバーフローしてゼロに戻る）することはありません。

```solidity

    /**
     * @dev 呼び出し元によって `spender` に付与されたアローワンスをアトミックに減少させます。
     *
     * これは {approve} の代替であり、{IERC20-approve} で説明されている問題の軽減策として使用できます。
     *
     * 更新されたアローワンスを示す {Approval} イベントを発行します。
     *
     * 要件:
     *
     * - `spender` はゼロ・アドレスであってはなりません。
     * - `spender` は呼び出し元に対して少なくとも `subtractedValue` のアローワンスを持っていなければなりません。
     */
    function decreaseAllowance(address spender, uint256 subtractedValue) public virtual returns (bool) {
        _approve(_msgSender(), spender, _allowances[_msgSender()][spender].sub(subtractedValue,
                "ERC20: decreased allowance below zero"));
        return true;
    }
```

### トークン情報を変更する関数 {#functions-that-modify-token-information}

これらは実際の作業を行う4つの関数です：`_transfer`、`_mint`、`_burn`、および`_approve`。

#### _transfer関数 {#transfer}

```solidity
    /**
     * @dev `sender` から `recipient` へ `amount` 分のトークンを送金します。
     *
     * この内部関数は {transfer} と同等であり、例えば自動トークン手数料やスラッシングメカニズムなどの実装に使用できます。
     *
     * {Transfer} イベントを発行します。
     *
     * 要件:
     *
     * - `sender` はゼロ・アドレスであってはなりません。
     * - `recipient` はゼロ・アドレスであってはなりません。
     * - `sender` は少なくとも `amount` の残高を持っていなければなりません。
     */
    function _transfer(address sender, address recipient, uint256 amount) internal virtual {
```

この関数`_transfer`は、あるアカウントから別のアカウントへトークンを送金します。これは、`transfer`（送信者自身のアカウントからの送金用）と`transferFrom`（アローワンスを使用して他人のアカウントから送金するため）の両方から呼び出されます。

&nbsp;

```solidity
        require(sender != address(0), "ERC20: transfer from the zero address");
        require(recipient != address(0), "ERC20: transfer to the zero address");
```

イーサリアムにおいて、ゼロ・アドレスを実際に所有している人は誰もいません（つまり、対応する公開鍵がゼロ・アドレスに変換されるような秘密鍵を知っている人は誰もいません）。人々がそのアドレスを使用する場合、通常はソフトウェアのバグです。そのため、ゼロ・アドレスが送信者または受信者として使用された場合は失敗するようにしています。

&nbsp;

```solidity
        _beforeTokenTransfer(sender, recipient, amount);

```

このコントラクトを使用するには2つの方法があります。

1. 独自のコードのテンプレートとして使用する
1. [それを継承し](https://www.bitdegree.org/learn/solidity-inheritance)、変更する必要がある関数のみをオーバーライドする

オープンツェッペリンのERC-20コードはすでに監査されており、安全であることが示されているため、2番目の方法の方がはるかに優れています。継承を使用すると、変更した関数が明確になり、コントラクトを信頼してもらうために、人々はその特定の関数のみを監査すれば済みます。

トークンの所有者が変わるたびに関数を実行すると便利なことがよくあります。しかし、`_transfer`は非常に重要な関数であり、安全でない書き方をしてしまう可能性があるため（下記参照）、オーバーライドしないのが最善です。解決策は、[フック関数](https://wikipedia.org/wiki/Hooking)である`_beforeTokenTransfer`です。この関数をオーバーライドすることができ、送金のたびに呼び出されます。

&nbsp;

```solidity
        _balances[sender] = _balances[sender].sub(amount, "ERC20: transfer amount exceeds balance");
        _balances[recipient] = _balances[recipient].add(amount);
```

これらが実際に送金を行う行です。これらの間には**何も**なく、受信者に追加する前に送信者から送金額を差し引いていることに注意してください。これは重要です。なぜなら、途中で別のコントラクトへの呼び出しがあった場合、このコントラクトを騙すために使用される可能性があるからです。この方法により、送金はアトミックになり、その途中で何も起こることはありません。

&nbsp;

```solidity
        emit Transfer(sender, recipient, amount);
    }
```

最後に、`Transfer`イベントを発行します。スマート・コントラクトはイベントにアクセスできませんが、ブロックチェーンの外部で実行されているコードはイベントをリッスンし、それらに反応することができます。例えば、ウォレットは所有者がより多くのトークンを取得したタイミングを追跡できます。

#### _mint関数と_burn関数 {#mint-and-burn}

これら2つの関数（`_mint`および`_burn`）は、トークンの総供給量を変更します。これらは内部関数であり、このコントラクト内でそれらを呼び出す関数はないため、コントラクトを継承し、どのような条件下で新しいトークンをミントするか、または既存のトークンをバーンするかを決定する独自のロジックを追加する場合にのみ役立ちます。

**注:** すべてのERC-20トークンには、トークン管理を規定する独自のビジネスロジックがあります。例えば、固定供給量のコントラクトはコンストラクタで`_mint`を呼び出すだけで、`_burn`を呼び出すことはないかもしれません。トークンを販売するコントラクトは、支払いを受けたときに`_mint`を呼び出し、暴走するインフレを避けるためにある時点で`_burn`を呼び出すと考えられます。

```solidity
    /** @dev `amount` 分のトークンを作成し、それらを `account` に割り当て、総供給量を増加させます。
     *
     * `from` をゼロ・アドレスに設定して {Transfer} イベントを発行します。
     *
     * 要件:
     *
     * - `to` はゼロ・アドレスであってはなりません。
     */
    function _mint(address account, uint256 amount) internal virtual {
        require(account != address(0), "ERC20: mint to the zero address");
        _beforeTokenTransfer(address(0), account, amount);
        _totalSupply = _totalSupply.add(amount);
        _balances[account] = _balances[account].add(amount);
        emit Transfer(address(0), account, amount);
    }
```

トークンの総数が変更された場合は、必ず`_totalSupply`を更新してください。

&nbsp;

```solidity
    /**
     * @dev `account` から `amount` 分のトークンを破棄し、総供給量を減少させます。
     *
     * `to` をゼロ・アドレスに設定して {Transfer} イベントを発行します。
     *
     * 要件:
     *
     * - `account` はゼロ・アドレスであってはなりません。
     * - `account` は少なくとも `amount` 分のトークンを持っていなければなりません。
     */
    function _burn(address account, uint256 amount) internal virtual {
        require(account != address(0), "ERC20: burn from the zero address");

        _beforeTokenTransfer(account, address(0), amount);

        _balances[account] = _balances[account].sub(amount, "ERC20: burn amount exceeds balance");
        _totalSupply = _totalSupply.sub(amount);
        emit Transfer(account, address(0), amount);
    }
```

`_burn`関数は、逆方向の処理を行うことを除けば、`_mint`とほぼ同じです。

#### _approve関数 {#approve-2}

これは実際にアローワンスを指定する関数です。所有者が現在の残高よりも高いアローワンスを指定できることに注意してください。送金時に残高がチェックされ、その時点ではアローワンス作成時の残高とは異なっている可能性があるため、これは問題ありません。

```solidity
    /**
     * @dev `owner` のトークンに対する `spender` のアローワンスとして `amount` を設定します。
     *
     * この内部関数は `approve` と同等であり、例えば特定のサブシステムに対する自動アローワンスの設定などに使用できます。
     *
     * {Approval} イベントを発行します。
     *
     * 要件:
     *
     * - `owner` はゼロ・アドレスであってはなりません。
     * - `spender` はゼロ・アドレスであってはなりません。
     */
    function _approve(address owner, address spender, uint256 amount) internal virtual {
        require(owner != address(0), "ERC20: approve from the zero address");
        require(spender != address(0), "ERC20: approve to the zero address");

        _allowances[owner][spender] = amount;
```

&nbsp;

`Approval`イベントを発行します。アプリケーションの記述方法に応じて、消費者コントラクトは、所有者から、またはこれらのイベントをリッスンするサーバーから承認について通知を受けることができます。

```solidity
        emit Approval(owner, spender, amount);
    }

```

### decimals変数の変更 {#modify-the-decimals-variable}

```solidity


    /**
     * @dev {decimals} をデフォルトの18以外の値に設定します。
     *
     * 警告: この関数はコンストラクタからのみ呼び出されるべきです。トークンのコントラクトと対話するほとんどのアプリケーションは、{decimals} が変更されることを想定しておらず、変更された場合は正しく動作しない可能性があります。
     */
    function _setupDecimals(uint8 decimals_) internal {
        _decimals = decimals_;
    }
```

この関数は、ユーザーインターフェースに金額の解釈方法を伝えるために使用される`_decimals`変数を変更します。これはコンストラクタから呼び出す必要があります。それ以降の任意の時点で呼び出すことは不誠実であり、アプリケーションはそれを処理するように設計されていません。

### フック {#hooks}

```solidity

    /**
     * @dev トークンの送金前に呼び出されるフック。これには鋳造（minting）と焼却（burning）が含まれます。
     *
     * 呼び出し条件:
     *
     * - `from` と `to` が両方ともゼロでない場合、``from`` のトークンの `amount` 分が `to` へ送金されます。
     * - `from` がゼロの場合、`to` のために `amount` 分のトークンが鋳造されます。
     * - `to` がゼロの場合、``from`` のトークンの `amount` 分が焼却されます。
     * - `from` と `to` が両方ともゼロになることはありません。
     *
     * フックの詳細については、xref:ROOT:extending-contracts.adoc#using-hooks[Using Hooks] を参照してください。
     */
    function _beforeTokenTransfer(address from, address to, uint256 amount) internal virtual { }
}
```

これは送金中に呼び出されるフック関数です。ここでは空ですが、何かを実行する必要がある場合はオーバーライドするだけです。

## おわりに {#conclusion}

復習として、このコントラクトにおける最も重要なアイデアのいくつかを以下に示します（私の意見であり、あなたの意見は異なるかもしれません）。

- _ブロックチェーン上に秘密はありません_。スマート・コントラクトがアクセスできる情報はすべて、全世界に公開されています。
- 自分自身のトランザクションの順序は制御できますが、他人のトランザクションがいつ発生するかは制御できません。これが、アローワンスの変更が危険になり得る理由です。なぜなら、消費者が両方のアローワンスの合計を消費できるようになるからです。
- `uint256`型の値はラップアラウンドします。言い換えれば、_0-1=2^256-1_となります。それが望ましくない動作である場合は、それをチェックする必要があります（または、代わりに行ってくれるSafeMathライブラリを使用します）。これは[Solidity 0.8.0](https://docs.soliditylang.org/en/breaking/080-breaking-changes.html)で変更されたことに注意してください。
- 特定のタイプの状態変更はすべて特定の場所で行います。これにより監査が容易になるからです。これが、例えば`approve`、`transferFrom`、`increaseAllowance`、および`decreaseAllowance`から呼び出される`_approve`が存在する理由です。
- 状態の変更はアトミックであるべきであり、その途中に他のアクションを含めるべきではありません（`_transfer`で見られるように）。これは、状態の変更中は状態が不整合になるためです。例えば、送信者の残高から差し引いてから受信者の残高に追加するまでの間、存在するトークンは本来あるべき数よりも少なくなります。その間に操作、特に別のコントラクトへの呼び出しがある場合、これが悪用される可能性があります。

オープンツェッペリンのERC-20コントラクトがどのように書かれているか、そして特にどのように安全性が高められているかを確認したところで、あなた自身の安全なコントラクトやアプリケーションを書いてみましょう。

[私の他の作品はこちらをご覧ください](https://cryptodocguy.pro/)。
