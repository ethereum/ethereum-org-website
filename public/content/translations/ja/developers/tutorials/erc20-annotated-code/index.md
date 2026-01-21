---
title: "ERC-20コントラクトのウォークスルー"
description: OpenZeppelinのERC-20コントラクトには何が含まれており、それはなぜ存在するのでしょうか?
author: Ori Pomerantz
lang: ja
tags: [ "Solidity", "ERC-20" ]
skill: beginner
published: 2021-03-09
---

## はじめに {#introduction}

イーサリアムの最も一般的な用途の1つは、グループが取引可能なトークン、いわば独自の通貨を作ることです。 これらのトークンは、通常[ERC-20](/developers/docs/standards/tokens/erc-20/)という規格に従います。 この規格により、流動性プールやウォレットなど、すべてのERC-20トークンで利用できるツールの作成が可能になります。 この記事では、[OpenZeppelinのSolidityによるERC20実装](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol)と、[インターフェース定義](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/IERC20.sol)を分析します。

ここではアノテーション付きのソースコードを見ていきます。 ERC-20を実装したい場合は、[このチュートリアル](https://docs.openzeppelin.com/contracts/2.x/erc20-supply)をお読みください。

## インターフェース {#the-interface}

ERC-20のような規格の目的は、ウォレットや分散型取引所のようなアプリケーション間で相互運用可能な多くのトークンの実装を可能にすることです。 それを実現するために、[インターフェース](https://www.geeksforgeeks.org/solidity/solidity-basics-of-interface/)を作成します。 トークンコントラクトを使用する必要があるコードは、それがMetaMaskのようなウォレット、etherscan.ioのようなdapp、または流動性プールのような別のコントラクトであっても、インターフェースで同じ定義を使用でき、そのインターフェースを使用するすべてのトークンコントラクトと互換性があります。

![ERC-20インターフェースの図](erc20_interface.png)

経験豊富なプログラマーであれば、[Java](https://www.w3schools.com/java/java_interface.asp)や[Cのヘッダーファイル](https://gcc.gnu.org/onlinedocs/cpp/Header-Files.html)で同様の構造を見たことがあるかもしれません。

これはOpenZeppelinによる[ERC-20インターフェース](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/IERC20.sol)の定義です。 これは、[人間が読める標準規格](https://eips.ethereum.org/EIPS/eip-20)をSolidityコードに変換したものです。 もちろん、インターフェース自体は、何かを行う_方法_を定義するものではありません。 これは後述のコントラクトのソースコードで説明されています。

&nbsp;

```solidity
// SPDX-License-Identifier: MIT
```

Solidityのファイルには、ライセンス識別子が含まれているはずです。 [ライセンスのリストはこちら](https://spdx.org/licenses/)で確認できます。 別のライセンスが必要な場合は、コメントでその旨を説明してください。

&nbsp;

```solidity
pragma solidity >=0.6.0 <0.8.0;
```

Solidity言語は現在も急速に進化しており、新しいバージョンは古いコードと互換性がない場合があります([詳しくはこちら](https://docs.soliditylang.org/en/v0.7.0/070-breaking-changes.html))。 そのため、言語の最小バージョンだけでなく、最大バージョン、つまりコードをテストした最新のバージョンも指定することをお勧めします。

&nbsp;

```solidity
/**
 * @dev EIPで定義されているERC20標準のインターフェース。
 */
```

コメント中の`@dev`は[NatSpec形式](https://docs.soliditylang.org/en/develop/natspec-format.html)の一部で、ソースコードからドキュメントを作成するために使用されます。

&nbsp;

```solidity
interface IERC20 {
```

慣例では、インターフェース名は`I`で始まります。

&nbsp;

```solidity
    /**
     * @dev 存在するトークンの総量を返します。
     */
    function totalSupply() external view returns (uint256);
```

この関数は`external`であり、[コントラクトの外部からのみ呼び出すことができる](https://docs.soliditylang.org/en/v0.7.0/cheatsheet.html#index-2)ことを意味します。
コントラクト内のトークンの総供給量を返します。 この値は、イーサリアムで最も一般的な型である符号なし256ビット(256ビットはEVMのネイティブワードサイズ)で返されます。 この関数も`view`であり、状態を変更しないため、ブロックチェーンのすべてのノードで実行するのではなく、単一のノードで実行できます。 このような関数はトランザクションを生成せず、[ガス](/developers/docs/gas/)代もかかりません。

**注:** 理論的には、コントラクト作成者が、実際の値よりも少ない総供給量を返し、各トークンを実際の価格よりも高価に見せることで、不正を行うことが出来るように思えるかもしれません。 しかし、そのような心配をするということは、ブロックチェーンの本質を忘れているということになります。 ブロックチェーン上で起こるすべてのことは、すべてのノードで検証できます。 これを実現するため、すべてのコントラクトの機械語コードとストレージは、全ノードで入手可能です。 コントラクトのSolidityコードを公開する必要はありませんが、提供した機械語コードと照合して検証できるように、ソースコードとそれをコンパイルしたSolidityのバージョンを公開しない限り、誰もあなたのコントラクトを本気で相手にしないでしょう。
例えば、[このコントラクト](https://eth.blockscout.com/address/0xa530F85085C6FE2f866E7FdB716849714a89f4CD?tab=contract)をご覧ください。

&nbsp;

```solidity
    /**
     * @dev `account`が所有するトークンの量を返します。
     */
    function balanceOf(address account) external view returns (uint256);
```

その名の通り、`balanceOf`はアカウントの残高を返します。 Solidityでは、イーサリアムアカウントは160ビットを保持する`address`型で識別されます。
この関数も`external`かつ`view`です。

&nbsp;

```solidity
    /**
     * @dev `amount`のトークンを呼び出し元のアカウントから`recipient`に移動させます。
     *
     * 操作が成功したかどうかを示すブール値を返します。
     *
     * {Transfer}イベントを発行します。
     */
    function transfer(address recipient, uint256 amount) external returns (bool);
```

`transfer`関数は、呼び出し元から別のアドレスにトークンを転送します。 これは状態の変化を伴うので、`view`ではありません。
ユーザーがこの関数を呼び出すと、トランザクションが作成され、ガス代がかかります。 さらに、`Transfer`というイベントが発行され、ブロックチェーン上の全員にそのイベントが通知されます。

この関数には、2つの異なる呼び出し元のタイプに応じて、2つのタイプの出力があります。

- ユーザーがユーザーインターフェースから関数を直接呼び出す場合。 通常、ユーザーはトランザクションを送信すると、応答を待ちません。応答には不確定な時間がかかる可能性があるためです。 ユーザーは、トランザクションレシート(トランザクションハッシュによって識別される)を探すか、`Transfer`イベントを探すことで状況を把握できます。
- 他のコントラクトが、全体的なトランザクションの一部として関数を呼び出す場合。 これらのコントラクトは、同じトランザクション内で実行されるため、関数の戻り値を使用でき、すぐに結果を得ることができます。

同じタイプの出力は、コントラクトの状態を変更する他の関数によって作成されます。

&nbsp;

割当量(`allowance`)により、あるアカウントが別の所有者に属しているトークンの一部を使えるようになります。
これは、例えば、コントラクトが売り手として機能する場合などに役立ちます。 コントラクトはイベントを監視できないため、買い手が売り手のコントラクトにトークンを直接転送した場合、売り手のコントラクトはその支払いを認識できません。 代わりに、買い手が売り手のコントラクトに一定量の使用を許可し、売り手がその量を転送します。
この処理は売り手のコントラクトが呼び出す関数を通して行われるため、売り手のコントラクトは処理が成功したかどうかを確認できます。

```solidity
    /**
     * @dev {transferFrom}を通じて`spender`が`owner`に代わって使用できる、残りのトークン数を返します。これは
     * デフォルトではゼロです。
     *
     * この値は、{approve}または{transferFrom}が呼び出されると変化します。
     */
    function allowance(address owner, address spender) external view returns (uint256);
```

`allowance`関数により、誰でも、あるアドレス(`owner`)が別のアドレス(`spender`)に使用を許可している割当量を照会できます。

&nbsp;

```solidity
    /**
     * @dev `spender`が呼び出し元のトークンに対して持つ割当量を`amount`に設定します。
     *
     * 操作が成功したかを示すブール値を返します。
     *
     * 重要: このメソッドで割当量を変更すると、不運なトランザクションの順序によって、誰かが古い割当量と新しい割当量の両方を使用するリスクがあります。
     * この競合状態を緩和するための一つの解決策は、まずspenderの割当量を0に減らしてから、目的の値を設定することです。
     * https://github.com/ethereum/EIPs/issues/20#issuecomment-263524729
     *
     * {Approval}イベントを発行します。
     */
    function approve(address spender, uint256 amount) external returns (bool);
```

`approve`関数は、割当量を作成します。 これがどのように悪用される可能性があるのかについて、該当のメッセージを必ず読んでください。 イーサリアムでは、自分のトランザクションの順序は制御できますが、相手方のトランザクションが発生したことを確認してから自分のトランザクションを送信しない限り、他のユーザーのトランザクションが実行される順序を制御することはできません。

&nbsp;

```solidity
    /**
     * @dev 割当メカニズムを使用して、`amount`のトークンを`sender`から`recipient`に移動させます。`amount`は呼び出し元の割当量から差し引かれます。
     *
     * 操作が成功したかを示すブール値を返します。
     *
     * {Transfer}イベントを発行します。
     */
    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);
```

最後に、使用者(`spender`)が`transferFrom`を使用して、割当量(`allowance`)を実際に使用します。

&nbsp;

```solidity

    /**
     * @dev `value`のトークンがあるアカウント(`from`)から
     * 別のアカウント(`to`)に移動したときに発行されます。
     *
     * `value`はゼロになる場合があることに注意してください。
     */
    event Transfer(address indexed from, address indexed to, uint256 value);

    /**
     * @dev {approve}の呼び出しによって`owner`に対する`spender`の割当量が設定されたときに発行されます。`value`は新しい割当量です。
     */
    event Approval(address indexed owner, address indexed spender, uint256 value);
}
```

これらのイベントは、ERC-20コントラクトの状態が変更されると発行されます。

## 実際のコントラクト {#the-actual-contract}

これはERC-20規格を実装した実際のコントラクトで、[こちら](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol)から引用しました。
これはそのまま使用するためのものではありませんが、それから[継承](https://www.tutorialspoint.com/solidity/solidity_inheritance.htm)して、使えるものに拡張することができます。

```solidity
// SPDX-License-Identifier: MIT
pragma solidity >=0.6.0 <0.8.0;
```

&nbsp;

### インポート文 {#import-statements}

コントラクト定義では、上記のインターフェース定義に加え、別の2つのファイルをインポートします。

```solidity

import "../../GSN/Context.sol";
import "./IERC20.sol";
import "../../math/SafeMath.sol";
```

- `GSN/Context.sol`は、etherを持たないユーザーがブロックチェーンを使用できるようにするシステムである[OpenGSN](https://www.opengsn.org/)を使用するために必要な定義です。 これは古いバージョンであることに注意してください。OpenGSNと統合する場合は、[このチュートリアル](https://docs.opengsn.org/javascript-client/tutorial.html)を使用してください。
- [SafeMathライブラリ](https://ethereumdev.io/using-safe-math-library-to-prevent-from-overflows/)は、Solidityバージョン\*\*<0.8.0\*\*の算術オーバーフロー/アンダーフローを防ぎます。 Solidity ≥0.8.0では、算術演算はオーバーフロー/アンダーフローで自動的にリバートするため、SafeMathは不要です。 このコントラクトは、古いコンパイラバージョンとの後方互換性のためにSafeMathを使用しています。

&nbsp;

このコメントは、コントラクトの目的を説明しています。

```solidity
/**
 * @dev {IERC20}インターフェースの実装。
 *
 * この実装は、トークンが作成される方法には依存しません。これは
 * 供給メカニズムを、{_mint}を使用して派生コントラクトに追加する必要があることを意味します。
 * 一般的なメカニズムについては、{ERC20PresetMinterPauser}を参照してください。
 *
 * ヒント: 詳細な解説については、ガイド
 * https://forum.zeppelin.solutions/t/how-to-implement-erc20-supply-mechanisms/226[供給メカニズムの実装方法]を参照してください。
 *
 * OpenZeppelinの一般的なガイドラインに従っています。関数は失敗時に`false`を返すのではなく、リバートします。この動作は慣例的であり、ERC20アプリケーションの期待と矛盾しません。
 *
 * さらに、{transferFrom}の呼び出し時に{Approval}イベントが発行されます。
 * これにより、アプリケーションは、これらのイベントをリッスンするだけで、すべてのアカウントの割当量を再構築できます。EIPの他の実装では、
 * 仕様で要求されていないため、これらのイベントを発行しない場合があります。
 *
 * 最後に、割当量設定に関する既知の問題を緩和するために、非標準の{decreaseAllowance}および{increaseAllowance}関数が追加されています。
 * {IERC20-approve}を参照してください。
 */

```

### コントラクト定義 {#contract-definition}

```solidity
contract ERC20 is Context, IERC20 {
```

この行では、継承を指定しています。ここでは、上記の`IERC20`と、OpenGSNのための`Context`を継承しています。

&nbsp;

```solidity

    using SafeMath for uint256;

```

この行では、`SafeMath`ライブラリを`uint256`型にアタッチしています。 このライブラリは[こちら](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/utils/math/SafeMath.sol)で確認できます。

### 変数定義 {#variable-definitions}

これらの定義では、コントラクトの状態変数を指定します。 これらの変数は`private`で宣言されていますが、これはブロックチェーン上の他のコントラクトから読み取れないというだけです。 _ブロックチェーンに秘密はありません_。すべてのノードのソフトウェアは、すべてのブロックですべてのコントラクトの状態を保持します。 慣例として、状態変数は`_<something>`と命名されます。

最初の2つの変数は[マッピング](https://www.tutorialspoint.com/solidity/solidity_mappings.htm)であり、キーが数値である点を除けば、おおよそ[連想配列](https://wikipedia.org/wiki/Associative_array)と同じように動作します。 ストレージは、デフォルト(ゼロ)とは異なる値を持つエントリにのみ割り当てられます。

```solidity
    mapping (address => uint256) private _balances;
```

最初のマッピングである`_balances`は、アドレスとそれぞれのこのトークンの残高です。 残高にアクセスするには、`_balances[<address>]`という構文を使用します。

&nbsp;

```solidity
    mapping (address => mapping (address => uint256)) private _allowances;
```

この変数`_allowances`には、前述の割当量が格納されます。 最初のインデックスはトークンの所有者であり、2番目のインデックスは割当量を持つコントラクトです。 アドレスAがアドレスBのアカウントから使える量にアクセスするには、`_allowances[B][A]`を使用します。

&nbsp;

```solidity
    uint256 private _totalSupply;
```

名前が示すように、この変数はトークンの総供給量を追跡します。

&nbsp;

```solidity
    string private _name;
    string private _symbol;
    uint8 private _decimals;
```

この3つの変数は、可読性を向上させるために使用されます。 最初の2つの変数は自明ですが、`_decimals`はそうではありません。

一方で、イーサリアムには浮動小数点変数も小数変数もありません。 他方で、人間はトークンを分割できることを好みます。 人々が金を通貨に決めた理由の一つは、誰かが牛の価値のアヒル分を買おうとしたときに、お釣りを作るのが難しかったからです。

解決策は、整数で追跡し、実際のトークンの代わりに、ほとんど価値のない小数トークンを数えることです。 etherの場合、小数トークンはweiと呼ばれ、10^18 weiが1 ETHと等価です。 執筆時点で、10,000,000,000,000 weiは、約1米ドルまたは1ユーロセントです。

アプリケーションは、トークンの残高を表示する方法を知る必要があります。 ユーザーが3,141,000,000,000,000,000 weiを持っている場合、それは3.14 ETHでしょうか? 31.41 ETHでしょうか? 3,141 ETHでしょうか? etherの場合、10^18 weiが1 ETHと定義されていますが、あなたのトークンでは別の値を選択できます。 トークンを分割する必要がなければ、値がゼロの`_decimals`を使用できます。 ETHと同じ基準を使用したい場合は、値**18**を使用してください。

### コンストラクタ {#the-constructor}

```solidity
    /**
     * @dev {name}と{symbol}の値を設定し、{decimals}を
     * デフォルト値の18で初期化します。
     *
     * {decimals}に別の値を選択するには、{_setupDecimals}を使用します。
     *
     * これら3つの値はすべて不変です。構築時に一度しか設定できません。
     */
    constructor (string memory name_, string memory symbol_) public {
        // Solidity ≥0.7.0では、'public'は暗黙的であり、省略できます。

        _name = name_;
        _symbol = symbol_;
        _decimals = 18;
    }
```

コンストラクタは、コントラクトが最初に作成されたときに呼び出されます。 慣例として関数パラメータは、`<something>_`のように命名されます。

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
     * 名前です。
     */
    function symbol() public view returns (string memory) {
        return _symbol;
    }

    /**
     * @dev ユーザー表現を取得するために使用される小数点以下の桁数を返します。
     * 例えば、`decimals`が`2`の場合、`505`トークンの残高は
     * `5,05` (`505 / 10 ** 2`)としてユーザーに表示されるべきです。
     *
     * トークンは通常、etherとweiの関係を模倣して、値18を選択します。これは、{_setupDecimals}が呼び出されない限り、{ERC20}が使用する値です。
     *
     * 注: この情報は_表示_目的でのみ使用されます。これは
     * {IERC20-balanceOf}や{IERC20-transfer}を含む、コントラクトのどの算術にも
     * 影響を与えません。
     */
    function decimals() public view returns (uint8) {
        return _decimals;
    }
```

これらの関数`name`、`symbol`、`decimals`は、ユーザーインターフェースがあなたのコントラクトについて知り、正しく表示できるようにするのに役立ちます。

戻り値の型は`string memory`で、メモリに格納されている文字列を返すことを意味します。 文字列などの変数は、3つの場所に格納できます。

|        | 存続期間    | コントラクトアクセス | ガス代                                       |
| ------ | ------- | ---------- | ----------------------------------------- |
| Memory | 関数呼び出し中 | 読み取り/書き込み  | 数十または数百(上位のロケーションほど高い) |
| コールデータ | 関数呼び出し中 | 読み取り専用     | 戻り値型としては使用できず、関数パラメータ型のみ                  |
| ストレージ  | 変更されるまで | 読み取り/書き込み  | 高額(読み取りに800、書き込みに20k)  |

このケースでは、`memory`の使用が最善の選択肢です。

### トークン情報の読み取り {#read-token-information}

以下の関数は、トークンの情報(総供給量またはアカウントの残高のいずれか)を提供します。

```solidity
    /**
     * @dev {IERC20-totalSupply}を参照してください。
     */
    function totalSupply() public view override returns (uint256) {
        return _totalSupply;
    }
```

`totalSupply`関数は、トークンの総供給量を返します。

&nbsp;

```solidity
    /**
     * @dev {IERC20-balanceOf}を参照してください。
     */
    function balanceOf(address account) public view override returns (uint256) {
        return _balances[account];
    }
```

アカウントの残高を読み取ります。 誰でも他の人のアカウント残高を取得できることに注意してください。 この情報はどのノードでも入手可能であるため、隠そうとしても無駄です。 _ブロックチェーンに秘密はありません。_

### トークンの転送 {#transfer-tokens}

```solidity
    /**
     * @dev {IERC20-transfer}を参照してください。
     *
     * 要件:
     *
     * - `recipient`はゼロアドレスであってはなりません。
     * - 呼び出し元は少なくとも`amount`の残高を持っている必要があります。
     */
    function transfer(address recipient, uint256 amount) public virtual override returns (bool) {
```

`transfer`関数は、送信者のアカウントから別のアカウントにトークンを転送するために呼び出します。 戻り値がブール値ですが、その値は常に**true**であることに注意してください。 転送が失敗した場合、コントラクトは呼び出しをリバートします。

&nbsp;

```solidity
        _transfer(_msgSender(), recipient, amount);
        return true;
    }
```

`_transfer`関数が実際の作業を行います。 これはprivate関数であり、他のコントラクト関数からのみ呼び出せます。 慣例として、private関数は状態変数と同様に`_<something>`と命名されます。

通常、Solidityでは、メッセージ送信者に`msg.sender`を使用します。 しかし、それでは[OpenGSN](http://opengsn.org/)が機能しません。 トークンでetherレスのトランザクションを許可したい場合は、`_msgSender()`を使用する必要があります。 通常のトランザクションでは`msg.sender`を返しますが、etherレスのトランザクションの場合は、メッセージを中継したコントラクトではなく、元の署名者を返します。

### 割当量関数 {#allowance-functions}

これらは割当量機能を実装する関数です: `allowance`、`approve`、`transferFrom`、`_approve`。 さらに、OpenZeppelin実装は、セキュリティを向上させる機能である`increaseAllowance`と`decreaseAllowance`を含むように、基本的な標準を超えています。

#### allowance関数 {#allowance}

```solidity
    /**
     * @dev {IERC20-allowance}を参照してください。
     */
    function allowance(address owner, address spender) public view virtual override returns (uint256) {
        return _allowances[owner][spender];
    }
```

`allowance`関数を使用すると、誰でも任意の割当量を確認することができます。

#### approve関数 {#approve}

```solidity
    /**
     * @dev {IERC20-approve}を参照してください。
     *
     * 要件:
     *
     * - `spender`はゼロアドレスであってはなりません。
     */
    function approve(address spender, uint256 amount) public virtual override returns (bool) {
```

この関数は、割当量を作成するときに呼び出します。 上記の`transfer`関数と似ています。

- この関数は、単に実際に作業を行う内部関数(この場合は`_approve`)を呼び出します。
- この関数は、成功した場合は`true`を返し、失敗した場合はリバートします。

&nbsp;

```solidity
        _approve(_msgSender(), spender, amount);
        return true;
    }
```

内部関数を使用して、状態変更が起こる場所の数を最小限にしています。 状態を変更する_すべての_関数には潜在的なセキュリティリスクがあり、セキュリティ監査が必要です。 この方法で、間違いを犯す可能性を下げています。

#### transferFrom関数 {#transferFrom}

これは、使用者(`spender`)が割当量を使用するために呼び出す関数です。 これには、使用される量を転送し、その量だけ割当量を減らすという2つの操作が必要です。

```solidity
    /**
     * @dev {IERC20-transferFrom}を参照してください。
     *
     * 更新された割当量を示す{Approval}イベントを発行します。これは
     * EIPでは要求されていません。{ERC20}の冒頭の注記を参照してください。
     *
     * 要件:
     *
     * - `sender`と`recipient`はゼロアドレスであってはなりません。
     * - `sender`は少なくとも`amount`の残高を持っている必要があります。
     * - 呼び出し元は、`sender`のトークンに対して少なくとも
     * `amount`の割当量を持っている必要があります。
     */
    function transferFrom(address sender, address recipient, uint256 amount) public virtual
                                                override returns (bool) {
        _transfer(sender, recipient, amount);
```

&nbsp;

`a.sub(b, "message")`関数の呼び出しでは、次の2つのことを行います。 まず、`a-b`を計算します。これが新しい割当量になります。
次に、この結果が負の数になっていないかをチェックします。 負になっている場合、提供されているメッセージを表示して呼び出しがリバートされます。 呼び出しがリバートされると、その呼び出し中に以前に実行されたすべての処理は無視されるため、`_transfer`を元に戻す必要はありません。

```solidity
        _approve(sender, _msgSender(), _allowances[sender][_msgSender()].sub(amount,
             "ERC20: transfer amount exceeds allowance"));
        return true;
    }
```

#### OpenZeppelinの安全追加機能 {#openzeppelin-safety-additions}

ゼロ以外の割当量を別のゼロ以外の値に設定することにはリスクが伴います。なぜなら、自分が制御できるのは自分のトランザクションの順序のみであり、他のユーザーのトランザクションの順序は制御できないからです。 経験の浅いアリスと、不誠実なビルという2人のユーザーがいるとします。 アリスはビルからサービスを受けたいと考えており、その費用は5トークンだと思っています。そこで、彼女はビルに5トークンの割当量を与えます。

その後、何かが変わり、ビルの価格は10トークンに上がりました。 まだサービスを受けたいアリスは、ビルの割当量を10に設定するトランザクションを送信します。 ビルはこの新しいトランザクションをトランザクションプールで確認した瞬間に、アリスの5トークンを使うトランザクションを送信し、より早くマイニングされるように非常に高いガス価格を設定します。 この方法で、ビルは最初に5トークンを使い、アリスの新しい割当量がマイニングされたら、さらに10トークンを使って合計15トークンを得ることができます。これはアリスが承認するつもりだった額よりも多いです。 このテクニックは[フロントランニング](https://consensysdiligence.github.io/smart-contract-best-practices/attacks/#front-running)と呼ばれます。

| アリスのトランザクション                         | アリスのノンス | ビルのトランザクション                                      | ビルのノンス | ビルの割当量 | ビルのアリスからの総収入 |
| ------------------------------------ | ------- | ------------------------------------------------ | ------ | ------ | ------------ |
| approve(Bill, 5)  | 10      |                                                  |        | 5      | 0            |
|                                      |         | transferFrom(Alice, Bill, 5)  | 10,123 | 0      | 5            |
| approve(Bill, 10) | 11      |                                                  |        | 10     | 5            |
|                                      |         | transferFrom(Alice, Bill, 10) | 10,124 | 0      | 15           |

この問題を回避するには、2つの関数(`increaseAllowance`と`decreaseAllowance`)を使用して、割当量を特定の量だけ変更します。 これにより、ビルがすでに5トークンを使用していた場合でも、その後に使用できるのは追加の5トークンのみとなります。 タイミングに応じて、次のような2つの動作が考えられますが、いずれの場合でもビルが取得するのは10トークンのみです。

A:

| アリスのトランザクション                                  | アリスのノンス | ビルのトランザクション                                     | ビルのノンス |  ビルの割当量 | ビルのアリスからの総収入 |
| --------------------------------------------- | ------: | ----------------------------------------------- | -----: | ------: | ------------ |
| approve(Bill, 5)           |      10 |                                                 |        |       5 | 0            |
|                                               |         | transferFrom(Alice, Bill, 5) | 10,123 |       0 | 5            |
| increaseAllowance(Bill, 5) |      11 |                                                 |        | 0+5 = 5 | 5            |
|                                               |         | transferFrom(Alice, Bill, 5) | 10,124 |       0 | 10           |

B:

| アリスのトランザクション                                  | アリスのノンス | ビルのトランザクション                                      | ビルのノンス |   ビルの割当量 | ビルのアリスからの総収入 |
| --------------------------------------------- | ------: | ------------------------------------------------ | -----: | -------: | -----------: |
| approve(Bill, 5)           |      10 |                                                  |        |        5 |            0 |
| increaseAllowance(Bill, 5) |      11 |                                                  |        | 5+5 = 10 |            0 |
|                                               |         | transferFrom(Alice, Bill, 10) | 10,124 |        0 |           10 |

```solidity
    /**
     * @dev 呼び出し元によって付与された`spender`への割当量をアトミックに増加させます。
     *
     * これは{approve}の代替手段であり、{IERC20-approve}で説明されている問題を緩和するために使用できます。
     *
     * 更新された割当量を示す{Approval}イベントを発行します。
     *
     * 要件:
     *
     * - `spender`はゼロアドレスであってはなりません。
     */
    function increaseAllowance(address spender, uint256 addedValue) public virtual returns (bool) {
        _approve(_msgSender(), spender, _allowances[_msgSender()][spender].add(addedValue));
        return true;
    }
```

`a.add(b)`関数は、安全な加算です。 万が一`a`+`b`>=`2^256`となっても、通常の加算のようにラップアラウンドしません。

```solidity

    /**
     * @dev 呼び出し元によって付与された`spender`への割当量をアトミックに減少させます。
     *
     * これは{approve}の代替手段であり、{IERC20-approve}で説明されている問題を緩和するために使用できます。
     *
     * 更新された割当量を示す{Approval}イベントを発行します。
     *
     * 要件:
     *
     * - `spender`はゼロアドレスであってはなりません。
     * - `spender`は呼び出し元に対して、少なくとも
     * `subtractedValue`の割当量を持っている必要があります。
     */
    function decreaseAllowance(address spender, uint256 subtractedValue) public virtual returns (bool) {
        _approve(_msgSender(), spender, _allowances[_msgSender()][spender].sub(subtractedValue,
                "ERC20: decreased allowance below zero"));
        return true;
    }
```

### トークン情報を変更する関数 {#functions-that-modify-token-information}

次の4つの関数(`_transfer`、`_mint`、`_burn`、`_approve`)は、実際の処理を行います。

#### _transfer関数 {#_transfer}

```solidity
    /**
     * @dev トークン`amount`を`sender`から`recipient`に移動させます。
     *
     * この内部関数は{transfer}と同等であり、
     * 例えば、自動的なトークン手数料やスラッシングメカニズムなどを実装するために使用できます。
     *
     * {Transfer}イベントを発行します。
     *
     * 要件:
     *
     * - `sender`はゼロアドレスであってはなりません。
     * - `recipient`はゼロアドレスであってはなりません。
     * - `sender`は少なくとも`amount`の残高を持っている必要があります。
     */
    function _transfer(address sender, address recipient, uint256 amount) internal virtual {
```

この`_transfer`関数は、トークンをあるアカウントから別のアカウントへ転送します。 この関数は、`transfer`(送信者自身のアカウントからの転送)と`transferFrom`(割当量を使用して他のユーザーのアカウントから転送)の両方から呼び出されます。

&nbsp;

```solidity
        require(sender != address(0), "ERC20: transfer from the zero address");
        require(recipient != address(0), "ERC20: transfer to the zero address");
```

イーサリアムでは、実際にアドレス0を所有しているユーザーはいません(つまり、対応する公開鍵がゼロアドレスに変換される秘密鍵を知っているユーザーはいないということです)。 誰かがこのアドレスを使っている場合、通常それはソフトウェアのバグです。そのため、送信者または受取人にゼロアドレスが指定されている場合は失敗します。

&nbsp;

```solidity
        _beforeTokenTransfer(sender, recipient, amount);

```

このコントラクトを使用するには2つの方法があります。

1. 自分のコードのテンプレートとして使う
2. [コントラクトから継承](https://www.bitdegree.org/learn/solidity-inheritance)し、修正が必要な関数のみをオーバーライドする

OpenZeppelinのERC-20コードはすでに監査を受けており、安全であることが示されているため、2つ目の方法がはるかに優れています。 継承を使用すると、変更した関数が明らかになり、人々はコントラクトを信頼するためにそれらの特定の関数のみを監査すればよくなります。

多くの場合、トークンの所有者が変わるたびに関数を実行すると便利です。 しかし、`_transfer`は非常に重要な関数であり、安全でない書き方をしてしまう可能性があるため(下記参照)、オーバーライドしないことをお勧めします。 解決策は、[フック関数](https://wikipedia.org/wiki/Hooking)である`_beforeTokenTransfer`です。 この関数をオーバーライドすれば、転送のたびに呼び出されるようになります。

&nbsp;

```solidity
        _balances[sender] = _balances[sender].sub(amount, "ERC20: transfer amount exceeds balance");
        _balances[recipient] = _balances[recipient].add(amount);
```

この2行で、実際に転送を行っています。 この2行の間には**何も**なく、受取人に加算する前に送信者から転送額を減算していることに注意してください。 この2行の間に別のコントラクトへの呼び出しがある場合、このコントラクトで不正を行うために使用される可能性があるため、このことは非常に重要になります。 こうすることで、転送がアトミックになり、その途中で何も起こらなくなります。

&nbsp;

```solidity
        emit Transfer(sender, recipient, amount);
    }
```

最後に、`Transfer`イベントを発行します。 イベントはスマートコントラクトからアクセスできませんが、ブロックチェーンの外で実行されているコードは、イベントをリッスンして対応することができます。 例えば、ウォレットは所有者がより多くのトークンを得た時期を追跡できます。

#### _mint関数と_burn関数 {#_mint-and-_burn}

この2つの関数(`_mint`と`_burn`)は、トークンの総供給量を変更します。
これらは内部関数であり、このコントラクト内にこれらを呼び出す関数はありません。そのため、コントラクトを継承し、どのような条件下で新しいトークンをミントし、既存のトークンをバーンするかを決定する独自のロジックを追加する場合にのみ役立ちます。

**注:** すべてのERC-20トークンには、トークン管理を規定する独自のビジネスロジックがあります。
例えば、固定供給量のコントラクトでは、コンストラクタ内で`_mint`のみを呼び出し、`_burn`を呼び出すことはありません。 トークンを販売するコントラクトは、支払いが行われたタイミングで`_mint`を呼び出し、おそらく、天井知らずのインフレを避けるためにある時点で`_burn`を呼び出します。

```solidity
    /** @dev `amount`のトークンを作成して`account`に割り当て、
     * 総供給量を増やします。
     *
     * `from`がゼロアドレスに設定された{Transfer}イベントを発行します。
     *
     * 要件:
     *
     * - `to`はゼロアドレスであってはなりません。
     */
    function _mint(address account, uint256 amount) internal virtual {
        require(account != address(0), "ERC20: mint to the zero address");
        _beforeTokenTransfer(address(0), account, amount);
        _totalSupply = _totalSupply.add(amount);
        _balances[account] = _balances[account].add(amount);
        emit Transfer(address(0), account, amount);
    }
```

トークンの総数が変更された場合は、`_totalSupply`を必ずアップデートしてください。

&nbsp;

```solidity
    /**
     * @dev `account`から`amount`のトークンを破棄し、
     * 総供給量を減らします。
     *
     * `to`がゼロアドレスに設定された{Transfer}イベントを発行します。
     *
     * 要件:
     *
     * - `account`はゼロアドレスであってはなりません。
     * - `account`は少なくとも`amount`のトークンを持っている必要があります。
     */
    function _burn(address account, uint256 amount) internal virtual {
        require(account != address(0), "ERC20: burn from the zero address");

        _beforeTokenTransfer(account, address(0), amount);

        _balances[account] = _balances[account].sub(amount, "ERC20: burn amount exceeds balance");
        _totalSupply = _totalSupply.sub(amount);
        emit Transfer(account, address(0), amount);
    }
```

`_burn`関数は、方向が逆であることを除き`_mint`とほぼ同じです。

#### _approve関数 {#_approve}

これは、実際に割当量を指定する関数です。 所有者は自身の現在の残高よりも高い割当量を指定できることに注意してください。 残高は転送時にチェックされ、割当量の作成時の残高と異なる可能性があるため、これは問題ありません。

```solidity
    /**
     * @dev `owner`のトークンに対する`spender`の割当量を`amount`に設定します。
     *
     * この内部関数は`approve`と同等であり、
     * 例えば、特定のサブシステムに対する自動的な割当量などを設定するために使用できます。
     *
     * {Approval}イベントを発行します。
     *
     * 要件:
     *
     * - `owner`はゼロアドレスであってはなりません。
     * - `spender`はゼロアドレスであってはなりません。
     */
    function _approve(address owner, address spender, uint256 amount) internal virtual {
        require(owner != address(0), "ERC20: approve from the zero address");
        require(spender != address(0), "ERC20: approve to the zero address");

        _allowances[owner][spender] = amount;
```

&nbsp;

`Approval`イベントを発行します。 アプリケーションがどのように書かれているかによって異なりますが、使用者(`spender`)のコントラクトには、所有者またはこれらのイベントをリッスンしているサーバーのいずれかによって承認が通知されます。

```solidity
        emit Approval(owner, spender, amount);
    }

```

### decimals変数の変更 {#modify-the-decimals-variable}

```solidity


    /**
     * @dev {decimals}をデフォルト値の18以外の値に設定します。
     *
     * 警告: この関数はコンストラクタからのみ呼び出すべきです。ほとんどの
     * トークンコントラクトと対話するアプリケーションは、
     * {decimals}が変更されることを想定しておらず、変更されると誤動作する可能性があります。
     */
    function _setupDecimals(uint8 decimals_) internal {
        _decimals = decimals_;
    }
```

この関数は`_decimals`変数を変更します。この変数は、量の解釈方法をユーザーインターフェースに伝えるのに使用されます。
コンストラクタから呼び出すべきです。 その後のどの時点においてもこの関数を呼び出すと不正になり、アプリケーションはこのような処理をするようには設計されていません。

### フック {#hooks}

```solidity

    /**
     * @dev トークンのあらゆる転送の前に呼び出されるフック。これには
     * ミントとバーンが含まれます。
     *
     * 呼び出し条件:
     *
     * - `from`と`to`が両方ともゼロでない場合、`from`のトークンの`amount`が
     * `to`に転送されます。
     * - `from`がゼロの場合、`amount`のトークンが`to`のためにミントされます。
     * - `to`がゼロの場合、`from`のトークンの`amount`がバーンされます。
     * - `from`と`to`が両方ともゼロになることはありません。
     *
     * フックについてさらに学ぶには、xref:ROOT:extending-contracts.adoc#using-hooks[フックの使用]を参照してください。
     */
    function _beforeTokenTransfer(address from, address to, uint256 amount) internal virtual { }
}
```

このフック関数は、転送中に呼び出されます。 ここでは空になっていますが、何かを実行するのにこの関数が必要な場合は、オーバーライドしてください。

## 結論 {#conclusion}

確認のため、このコントラクトの最も重要な点を以下にまとめています(個人的な意見のため、他者にとって重要な点とは異なる場合があります) 。

- ブロックチェーンには秘密はありません。 スマートコントラクトがアクセスできる情報は、全世界で利用可能です。
- 自分のトランザクションの順序は自分で制御できますが、他のユーザーのトランザクションが発生するタイミングは制御できません。 これが、割当量の変更が危険となりうる理由です。変更により、使用者(`spender`)が両方の割当量の合計を使用できてしまうためです。
- `uint256`型の値はラップアラウンドします。 言い換えると、_0-1=2^256-1_となります。 これが望ましい動作ではない場合、プログラムで確認する必要があります(または、それを行うSafeMathライブラリを使用します)。 これは[Solidity 0.8.0](https://docs.soliditylang.org/en/breaking/080-breaking-changes.html)で変更されたことに注意してください。
- 監査を容易にするため、特定の場所で特定の型のすべての状態変更を行います。
  これが、例えば`approve`、`transferFrom`、`increaseAllowance`、`decreaseAllowance`によって呼び出される`_approve`が存在する理由です。
- 状態変更は、(`_transfer`で見られるように)処理の途中で他のアクションに割り込まれることがないアトミックである必要があります。 これは状態変更中に、一貫性のない状態が存在するためです。 例えば、送信者の残高から差し引いた時点から、受取人の残高に加えるまでの間は、存在するべき数よりも少ないトークンが存在することになります。 この2つの処理の間に別の操作(特に、異なるコントラクトの呼び出しなど)がある場合、このトークンの状態が悪用される可能性があります。

ここまで、OpenZeppelin ERC-20コントラクトがどのように書かれているか、特に、より安全に記述する方法を学びました。是非自分でも安全なコントラクトとアプリケーションを作成してみてください。

[私の他の作品はこちらでご覧いただけます](https://cryptodocguy.pro/).
