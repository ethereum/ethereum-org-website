---
title: "ERC-20コントラクトの詳細"
description: OpenZeppelinのERC-20コントラクトの内容とそれが存在する理由
author: Ori Pomerantz
lang: ja
tags:
  - "Solidity"
  - "erc-20"
skill: beginner
published: 2021-03-09
---

## はじめに {#introduction}

イーサリアムの最も一般的な用途の1つは、グループが取引可能なトークン、いわば独自の通貨を作ることです。 これらのトークンは通常、[ERC-20](/developers/docs/standards/tokens/erc-20/)という規格に準拠しています。 この規格により、流動性プールやウォレットなど、すべてのERC-20トークンで利用できるツールの作成が可能になります。 今回は、[OpenZeppelin Solidity ERC-20の実装](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol)と、[インターフェース定義](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/IERC20.sol)について分析していきます。

ここではアノテーション付きのソースコードを見ていきます。 ERC-20を実装する場合は、[こちらのチュートリアル](https://docs.openzeppelin.com/contracts/2.x/erc20-supply)をご覧ください。

## インターフェース {#the-interface}

ERC-20のような規格の目的は、ウォレットや分散型取引所のようなアプリケーション間で相互運用可能な多くのトークンの実装を可能にすることです。 しかしその実現には[インターフェース](https://www.geeksforgeeks.org/solidity-basics-of-interface/)が必要です。 トークンコントラクトを使用する必要があるすべてのコードは、インターフェースで同じ定義を使用することができ、その定義を使用するすべてのトークンコントラクトと互換性があります。それらにはMetaMaskなどのウォレット、etherscan.ioなどの分散型アプリケーション(Dapp)、流動性プールなどの異なるコントラクトが含まれます。

![ERC-20インターフェースの図](erc20_interface.png)

経験豊富なプログラマーであれば、[Java](https://www.w3schools.com/java/java_interface.asp)や[C言語のヘッダーファイル](https://gcc.gnu.org/onlinedocs/cpp/Header-Files.html)で同様の構造を見たことがあるのではないでしょうか。

これはOpenZeppelinによる[ERC-20インターフェースの定義](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/IERC20.sol)です。 [人間が読めるように](https://eips.ethereum.org/EIPS/eip-20)Solidityのコードにしています。 もちろん、インターフェースそのものは、_何をするか_を定義していません。 これは後述のコントラクトのソースコードで説明されています。

&nbsp;

```solidity
// SPDX-License-Identifier: MIT
```

Solidityのファイルには、ライセンス識別子が含まれているはずです。 ライセンス一覧は[こちら](https://spdx.org/licenses/)でご覧いただけます。 別のライセンスが必要な場合は、コメントしてください。

&nbsp;

```solidity
pragma solidity >=0.6.0 <0.8.0;
```

Solidity言語は現在も急速に進化しており、新しいバージョンは古いコードと互換性がない場合があります(詳しくは[こちら](https://docs.soliditylang.org/en/v0.7.0/070-breaking-changes.html))。 そのため、この言語の最小バージョンだけでなく、コードをテストした最新バージョンも指定することをお勧めします。

&nbsp;

```solidity
/**
 * EIP で定義された ERC20 規格の @dev インターフェース。
 */
```

コメント中の`@dev`は[NatSpec形式](https://docs.soliditylang.org/en/develop/natspec-format.html)の一部で、ソースコードからドキュメントを作成するために使用されます。

&nbsp;

```solidity
interface IERC20 {
```

慣例では、インターフェース名は「`I`」で始まります。

&nbsp;

```solidity
    /**
     * @dev Returns the amount of tokens in existence.
     */
    function totalSupply() external view returns (uint256);
```

この関数は`external`です。つまり、[コントラクトの外部からのみ呼び出すことができます](https://docs.soliditylang.org/en/v0.7.0/cheatsheet.html#index-2)。 コントラクト内のトークンの総供給量を返します。 この値は、イーサリアムで最も一般的な型である符号なし256ビット(イーサリアム仮想マシン(EVM)のネイティブワードサイズ)で返されます。 この関数も`view`であり、状態を変更しないため、ブロックチェーンのすべてのノードで実行するのではなく、単一のノードで実行できます。 このような関数はトランザクションを発生させず、[ガス代](/developers/docs/)もかかりません。

**注:** 理論的には、コントラクト作成者が、実際の値よりも少ない総供給量を返し、各トークンを実際の価格よりも高価に見せることで、不正を行うことが出来るように思えるかもしれません。 しかし、そのような心配をするということは、ブロックチェーンの本質を忘れているということになります。 ブロックチェーン上で起こるすべてのことは、すべてのノードで検証できます。 検証をするためのすべてのコントラクトの機械語コードとストレージは、全ノードで入手可能です。 コントラクトのSolidityコードを公開する必要はありませんが、ソースコードとコンパイルに使用したSolidityのバージョンを公開しない限り、不正への懸念を真剣に受け止めてもらうことはできません。その場合は、提供した機械語コードで検証することができます。 例えば、[このコントラクト](https://etherscan.io/address/0xa530F85085C6FE2f866E7FdB716849714a89f4CD#code)をご覧ください。

&nbsp;

```solidity
    /**
     * @dev Returns the amount of tokens owned by `account`.
     */
    function balanceOf(address account) external view returns (uint256);
```

その名の通り、`balanceOf`はアカウントの残高を返します。 Solidityでは、イーサリアムアカウントは160ビットを保持する`address`型で識別されます。 また、`external`や`view`もあります。

&nbsp;

```solidity
    /**
     * @dev Moves `amount` tokens from the caller's account to `recipient`.
     *
     * Returns a boolean value indicating whether the operation succeeded.
     *
     * Emits a {Transfer} event.
     */
    function transfer(address recipient, uint256 amount) external returns (bool);
```

`transfer`関数は、呼び出し元から別のアドレスにトークンを転送します。 これは状態の変化を伴うので、`view`ではありません。 ユーザーがこの関数を呼び出すと、トランザクションが作成され、ガス代がかかります。 さらに、`Transfer`というイベントが発行され、ブロックチェーン上の全ノードにそのイベントが通知されます。

この関数には、2つの異なる呼び出し元のタイプに応じて、2つのタイプの出力があります。

- ユーザーがユーザーインターフェースから関数を直接呼び出す場合。 通常、トランザクションを送信したユーザーは、その応答を待ちません。応答にどれくらいの時間がかかるか分からないからです。 ユーザーは、トランザクションレシート(トランザクションハッシュによって識別可能)を探すか、`Transfer`イベントを探すことで状況を把握できます。
- 他のコントラクトがトランザクション全体の一部として関数を呼び出す場合。 これらのコントラクトは、すぐに結果を得ることができます。関数が同じトランザクション内で実行されるため、関数の戻り値を使用できるからです。

同じタイプの出力は、コントラクトの状態を変更する他の関数によって作成されます。

&nbsp;

割当量(allowance)を設定すると、あるアカウントが別の所有者に属しているトークンの一部を使えるようになります。 これは、コントラクトが売り手として機能する場合などに役立ちます。 コントラクトはイベントを監視できないため、買い手が売り手のコントラクトにトークンを直接転送した場合、売り手のコントラクトはその支払いを認識できません。 代わりに、買い手が売り手のコントラクトに一定量の使用を許可し、売り手がその量を転送するようにします。 この処理は売り手のコントラクトが呼び出した関数を通して行われるため、売り手のコントラクトは処理が成功したかどうかを確認できます。

```solidity
    /**
     * @dev Returns the remaining number of tokens that `spender` will be
     * allowed to spend on behalf of `owner` through {transferFrom}. これは
     * デフォルトでゼロです。
     *
     * This value changes when {approve} or {transferFrom} are called.
     */
    function allowance(address owner, address spender) external view returns (uint256);
```

`allowance`関数を使用すると、誰でも、あるアドレス(`owner`)が別のアドレス(`spender`)に使用を許可している割当量(allowance)を照会できます。

&nbsp;

```solidity
    /**
     * @dev Sets `amount` as the allowance of `spender` over the caller's tokens.
     *
     * Returns a boolean value indicating whether the operation succeeded.
     *
     * IMPORTANT: Beware that changing an allowance with this method brings the risk
     * that someone may use both the old and the new allowance by unfortunate
     * transaction ordering. One possible solution to mitigate this race
     * condition is to first reduce the spender's allowance to 0 and set the
     * desired value afterwards:
     * https://github.com/ethereum/EIPs/issues/20#issuecomment-263524729
     *
     * Emits an {Approval} event.
     */
    function approve(address spender, uint256 amount) external returns (bool);
```

`approve`関数は、割当量を作成します。 これがどのように悪用される可能性があるのかについて、該当のメッセージを必ず読んでください。 イーサリアムでは、自分のトランザクションの順序は制御できますが、他のユーザーのトランザクションが発生したことを確認してからトランザクションを送信しない限り、他のユーザーのトランザクションが実行される順序を制御することはできません。

&nbsp;

```solidity
    /**
     * @dev Moves `amount` tokens from `sender` to `recipient` using the
     * allowance mechanism. `amount` is then deducted from the caller's
     * allowance.
     *
     * Returns a boolean value indicating whether the operation succeeded.
     *
     * Emits a {Transfer} event.
     */
    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);
```

最後に、使用者(spender)が`transferFrom`を使用して、割当量 (allowance)を実際に使用します。

&nbsp;

```solidity

    /**
     * @dev Emitted when `value` tokens are moved from one account (`from`) to
     * another (`to`).
     *
     * Note that `value` may be zero.
     */
    event Transfer(address indexed from, address indexed to, uint256 value);

    /**
     * @dev Emitted when the allowance of a `spender` for an `owner` is set by
     * a call to {approve}. `value` is the new allowance.
     */
    event Approval(address indexed owner, address indexed spender, uint256 value);
}
```

これらのイベントは、ERC-20コントラクトの状態が変更されるタイミングで発行されます。

## 実際のコントラクト {#the-actual-contract}

以下は、[こちらから取得した](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol)、ERC-20規格を採用している実際のコントラクトです。 そのまま使うためのものではありませんが、[継承](https://www.tutorialspoint.com/solidity/solidity_inheritance.htm)することで使用可能なコントラクトに拡張することができます。

```solidity
// SPDX-License-Identifier: MIT
pragma solidity >=0.6.0 <0.8.0;
```

&nbsp;

### インポートステートメント {#import-statements}

コントラクト定義では、上記のインターフェース定義に加え、別の2つのファイルをインポートします。

```solidity

import "../../GSN/Context.sol";
import "./IERC20.sol";
import "../../math/SafeMath.sol";
```

- `GSN/Context.sol`は、イーサ(ETH)を持たないユーザーがブロックチェーンを使用できるようにするシステムである、[OpenGSN](https://www.opengsn.org/)を使用するために必要な定義です。 これは古いバージョンであることに注意してください。OpenGSNと統合する場合は、[こちらのチュートリアルをご覧ください](https://docs.opengsn.org/javascript-client/tutorial.html)。
- [ SafeMathライブラリ](https://ethereumdev.io/using-safe-math-library-to-prevent-from-overflows/)は、オーバーフローを起こさずに加算と減算を実行できるようにするために使用されます。 このライブラリが必要な理由は、これがないと、1つのトークンを持っているユーザーが何らかの方法で2つのトークンを使用した場合、2^256-1のトークンを持ってしまう可能性があるためです。

&nbsp;

以下のコメントは、コントラクトの目的を説明しています。

```solidity
/**
 * @dev Implementation of the {IERC20} interface.
 *
 * This implementation is agnostic to the way tokens are created. This means
 * that a supply mechanism has to be added in a derived contract using {_mint}.
 * For a generic mechanism see {ERC20PresetMinterPauser}.
 *
 * TIP: For a detailed writeup see our guide
 * https://forum.zeppelin.solutions/t/how-to-implement-erc20-supply-mechanisms/226[How
 * to implement supply mechanisms].
 *
 * We have followed general OpenZeppelin guidelines: functions revert instead
 * of returning `false` on failure. This behavior is nonetheless conventional
 * and does not conflict with the expectations of ERC20 applications.
 *
 * Additionally, an {Approval} event is emitted on calls to {transferFrom}.
 * This allows applications to reconstruct the allowance for all accounts just
 * by listening to said events. Other implementations of the EIP may not emit
 * these events, as it isn't required by the specification.
 *
 * Finally, the non-standard {decreaseAllowance} and {increaseAllowance}
 * functions have been added to mitigate the well-known issues around setting
 * allowances. See {IERC20-approve}.
 */

```

### コントラクトの定義 {#contract-definition}

```solidity
contract ERC20 is Context, IERC20 {
```

この行では、継承を指定しています。ここでは、`IERC20`とOpenGSNのための`Context`を継承しています。

&nbsp;

```solidity

    using SafeMath for uint256;

```

この行では、`SafeMath`ライブラリを`uint256`型にアタッチしています。 このライブラリの詳細については、[こちら](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/utils/math/SafeMath.sol)をご覧ください。

### 変数の定義 {#variable-definitions}

これらの定義では、コントラクトの状態変数を指定します。 変数には、`private`で宣言しているものがありますが、ブロックチェーン上の他のコントラクトから読み取れないというだけです。 _ブロックチェーンに秘密はありません_。すべてのノードのソフトウェアは、すべてのブロックのすべてのコントラクトの状態を保持します。 状態変数は、慣例として`_<something>`のように命名されます。

最初の2つの変数は、[マッピング](https://www.tutorialspoint.com/solidity/solidity_mappings.htm)であり、キーが数値であることを除いて、[連想配列](https://wikipedia.org/wiki/Associative_array)とほぼ同じような振る舞いをします。 ストレージは、デフォルト(ゼロ)とは異なる値を持つエントリのみに割り当てられます。

```solidity
    mapping (address => uint256) private _balances;
```

最初のマッピングである`_balances`は、トークンを保持しているアドレスとそれぞれの残高です。 残高にアクセスするには、`_balances[<address>]`という構文を使用します。

&nbsp;

```solidity
    mapping (address => mapping (address => uint256)) private _allowances;
```

この変数`_allowances`には、前述の割当量(allowance)が格納されます。 最初のインデックスは、トークンの所有者であり、2番目のインデックスは割当量(allowance)を使用するコントラクトです。 アドレスAが、アドレスBのアカウントから使える量にアクセスするには、`_allowances[B][A]`のようにします。

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

イーサリアムには浮動小数点変数も小数変数もない一方で、 ユーザーはトークンの分割を好みます。 人々が金を通貨にすると決めた理由の一つとして、誰かがアヒル一羽の値段の分だけ牛を買おうとしたときに、お金を崩すのが難しかったことが挙げられます。

これを解決するには整数で追跡すればよいのですが、実際のトークンの代わりに、価値が非常に小さな小数トークンで計算します。 イーサ(ETH)の場合、小数トークンはウェイ(wei)と呼ばれており、10^18 weiが 1 ETHと等価です。 執筆時点では、10,000,000,000,000 weiが、約1米ドルまたは約1ユーロセントです。

アプリケーションには、トークンの残高を表示する方法が必要です。 ユーザーが3,14,000,000,000,000,000,000,000weiを持っている場合、それは3.14 ETHでしょうか? それとも、31.41 ETHでしょうか? 3,141 ETHでしょうか? イーサ (ETH) の場合、1 ETHが10^18 weiと定義されていますが、トークンでは別の値を選択可能です。 トークンを分割する必要がなければ、値がゼロの`_decimals`を使用できます。 ETHと同じ基準を使用したい場合は、**18**の値を指定してください。

### コンストラクタ {#the-constructor}

```solidity
    /**
     * @dev Sets the values for {name} and {symbol}, initializes {decimals} with
     * a default value of 18.
     *
     * To select a different value for {decimals}, use {_setupDecimals}.
     *
     * All three of these values are immutable: they can only be set once during
     * construction.
     */
    constructor (string memory name_, string memory symbol_) public {
        _name = name_;
        _symbol = symbol_;
        _decimals = 18;
    }
```

コンストラクタは、コントラクトが最初に作成されたときに呼び出されます。 慣例として関数パラメータは、 `<something>_`のように命名されます。

### ユーザーインターフェース関数 {#user-interface-functions}

```solidity
    /**
     * @dev Returns the name of the token.
     */
    function name() public view returns (string memory) {
        return _name;
    }

    /**
     * @dev Returns the symbol of the token, usually a shorter version of the
     * name.
     */
    function symbol() public view returns (string memory) {
        return _symbol;
    }

    /**
     * @dev Returns the number of decimals used to get its user representation.
     * For example, if `decimals` equals `2`, a balance of `505` tokens should
     * be displayed to a user as `5,05` (`505 / 10 ** 2`).
     *
     * Tokens usually opt for a value of 18, imitating the relationship between
     * ether and wei. This is the value {ERC20} uses, unless {_setupDecimals} is
     * called.
     *
     * NOTE: This information is only used for _display_ purposes: it in
     * no way affects any of the arithmetic of the contract, including
     * {IERC20-balanceOf} and {IERC20-transfer}.
     */
    function decimals() public view returns (uint8) {
        return _decimals;
    }
```

これらの関数(`name`、`symbol`、`decimals`)は、ユーザーインターフェースがコントラクトの情報を入手できるようするため、ユーザーインターフェースにコントラクトの情報が正しく表示されるようになります。

戻り値の型は、 `string memory`です。メモリに格納されている文字列が返されることを意味します。 文字列などの変数は、以下の3つの場所に格納できます。

|        | 存続期間     | コントラクトアドレス | ガス代                      |
| ------ | -------- | ---------- | ------------------------ |
| メモリ    | 関数呼び出しの間 | 読み取り/書き込み  | 数十または数百(上位のロケーションほど高い)   |
| コールデータ | 関数呼び出しの間 | 読み取り専用     | 戻り値型としては使用できず、関数パラメータ型のみ |
| ストレージ  | 変更されるまで  | 読み取り/書き込み  | 高額(読み取りに800、書き込みに20 k)   |

このケースでは、`memory`の使用が最善の選択肢です。

### トークン情報の読み取り {#read-token-information}

以下の関数は、トークンの情報(総供給量またはアカウントの残高のいずれか)を提供します。

```solidity
    /**
     * @dev See {IERC20-totalSupply}.
     */
    function totalSupply() public view override returns (uint256) {
        return _totalSupply;
    }
```

`totalSupply`関数は、トークンの総供給量を返します。

&nbsp;

```solidity
    /**
     * @dev See {IERC20-balanceOf}.
     */
    function balanceOf(address account) public view override returns (uint256) {
        return _balances[account];
    }
```

アカウントの残高を読み取ります。 誰でも他のユーザーのアカウント残高を取得できることに注意してください。 どのノードでも取得可能な情報であるため、隠そうとしても無駄です。 _ブロックチェーンに秘密はありません_。

### トークンの転送 {#transfer-tokens}

```solidity
    /**
     * @dev See {IERC20-transfer}.
     *
     * Requirements:
     *
     * - `recipient` cannot be the zero address.
     * - the caller must have a balance of at least `amount`.
     */
    function transfer(address recipient, uint256 amount) public virtual override returns (bool) {
```

`transfer`関数は、送信者のアカウントから別のアカウントにトークンを転送するために呼び出します。 戻り値がブール値になっていますが、この値は常に**true**を返すことに注意してください。 転送が失敗した場合、コントラクトは、呼び出しを取り消します。

&nbsp;

```solidity
        _transfer(_msgSender(), recipient, amount);
        return true;
    }
```

`_transfer`関数は、実際の作業を行います。 これはprivate関数であり、他のコントラクト関数からのみ呼び出せます。 慣例として、private関数は状態変数と同様に、`_<something>`のように命名されます。

通常、Solidityでは、メッセージ送信者に`msg.sender`を使用します。 しかし、[OpenGSN](http://opengsn.org/)では使えません。 イーサ(ETH)無しのトークンのトランザクションを許可したい場合は、`_msgSender()`を使用しなければなりません。 通常のトランザクションでは、`msg.sender`を返しますが、イーサ(ETH)無しのトランザクションの場合は、メッセージを中継したコントラクトではなく、元の署名者を返します。

### 割当量(allowance)関連の関数 {#allowance-functions}

割当量機能を実装した関数には、`allowance`、`approve`、 `transferFrom`、`_approve`があります。 さらに、OpenZeppelin実装には、基本的な標準に加えてセキュリティを向上させる `increaseAllowance`や`decreaseAllowance`などの複数の機能が含まれます。

#### allowance関数 {#allowance}

```solidity
    /**
     * @dev See {IERC20-allowance}.
     */
    function allowance(address owner, address spender) public view virtual override returns (uint256) {
        return _allowances[owner][spender];
    }
```

`allowance`関数を使用すると、誰でも割当量を確認することができます。

#### approve関数 {#approve}

```solidity
    /**
     * @dev See {IERC20-approve}.
     *
     * Requirements:
     *
     * - `spender` cannot be the zero address.
     */
    function approve(address spender, uint256 amount) public virtual override returns (bool) {
```

この関数は、割当量を作成するときに呼び出します。 上述の`transfer`関数と似ています。

- この関数は、単に実際に作業を行うinternal関数(この場合は`_approve`)を呼び出します。
- この関数は、成功した場合は`true`を返し、失敗した場合は取り消します。

&nbsp;

```solidity
        _approve(_msgSender(), spender, amount);
        return true;
    }
```

internal関数を使用して、状態変更が起こる場所の数を最小限にしています。 状態を変更する_すべての_関数には、潜在的なセキュリティリスクがあり、セキュリティ監査が必要です。 このような方法で、間違いを犯す可能性を下げています。

#### transferFrom関数 {#transferFrom}

これは、使用者(spender)が割当量(allowance)を使用するために呼び出す関数です。 これには、使う量の転送操作と、その量を割当量(allowance)から減らす操作の、2つの操作が必要になります。

```solidity
    /**
     * @dev See {IERC20-transferFrom}.
     *
     * Emits an {Approval} event indicating the updated allowance. これは
     * EIPでは必要ありません。 {ERC20}の最初にある注意事項を参照してください。
     *
     * Requirements:
     *
     * - `sender` and `recipient` cannot be the zero address.
     * - `sender` must have a balance of at least `amount`.
     * - the caller must have allowance for ``sender``'s tokens of at least
     * `amount`.
     */
    function transferFrom(address sender, address recipient, uint256 amount) public virtual
                                                override returns (bool) {
        _transfer(sender, recipient, amount);
```

&nbsp;

`a.sub(b, "message")`関数の呼び出しでは、次の2つのことを行います。 まず、`a-b`を計算します。これが新しい割当量になります。 次に、この結果が負の数になっていないかをチェックします。 負になっている場合、提供されているメッセージを表示して、呼び出しが取り消されます。 呼び出しが取り消されると、呼び出し中に実行されたすべての処理が無効になるため、`_transfer`を元に戻す必要がないことに注意してください。

```solidity
        _approve(sender, _msgSender(), _allowances[sender][_msgSender()].sub(amount,
             "ERC20: transfer amount exceeds allowance"));
        return true;
    }
```

#### OpenZeppelinによる安全性の向上 {#openzeppelin-safety-additions}

ゼロ以外の割当量を別のゼロ以外の値に設定することには、リスクが伴います。自分が制御できるのは自分のトランザクションの順序のみであり、他のユーザーのトランザクションの順序を制御することはできないからです。 アリスという初心者ユーザーと、ビルという誠実さに欠けるユーザーがいるとします。 アリスは、ビルが提供しているサービスを購入することにしました。購入には5トークンの費用がかかるため、アリスは5トークンの割当量(allowance)をビルに付与しました。

その後、ビルの設定した価格が何らかの理由で10トークンに上がりました。 アリスは依然としてそのサービスの購入を希望しており、ビルへの割当量を10に設定したトランザクションを送信しました。 ビルは、トランザクションプールでこの新しいトランザクションを確認した瞬間に、より早くマイニングされるようにかなり高いガス代を設定した、アリスの5トークンを使うトランザクションを送信します。 この方法で、ビルは5トークンを使います。その後、アリスが送信した新しい割当量がマイニングされたら、さらに10トークンを使います。こうして、アリスが承認するつもりだった量を超える、合計15トークンを使えることになります。 この手法は、[フロントランニング](https://consensys.github.io/smart-contract-best-practices/attacks/#front-running)と呼ばれます。

| アリスのトランザクション      | アリスのノンス | ビルのトランザクション                   | ビルのノンス | ビルの割当量 | ビルのアリスからの総収入 |
| ----------------- | ------- | ----------------------------- | ------ | ------ | ------------ |
| approve(Bill, 5)  | 10      |                               |        | 5      | 0            |
|                   |         | transferFrom(Alice, Bill, 5)  | 10,123 | 0      | 5            |
| approve(Bill, 10) | 11      |                               |        | 10     | 5            |
|                   |         | transferFrom(Alice, Bill, 10) | 10,124 | 0      | 15           |

この問題を回避するには、割当量を特定の量に変更できる2つの関数(`increaseAllowance`と`decreaseAllowance`)を使用します。 これらの関数を使用すれば、ビルがすでに5トークンを使用していた場合、その後に使用できるのは残りの5トークンのみとなります。 タイミングに応じて、次のような2つの動作が考えられますが、いずれの場合でもビルが取得するのは10トークンのみです。

A:

| アリスのトランザクション               | アリスのノンス | ビルのトランザクション                  | ビルのノンス |  ビルの割当量 | ビルのアリスからの総収入 |
| -------------------------- | -------:| ---------------------------- | ------:| -------:| ------------ |
| approve(Bill, 5)           |      10 |                              |        |       5 | 0            |
|                            |         | transferFrom(Alice, Bill, 5) | 10,123 |       0 | 5            |
| increaseAllowance(Bill, 5) |      11 |                              |        | 0+5 = 5 | 5            |
|                            |         | transferFrom(Alice, Bill, 5) | 10,124 |       0 | 10           |

B:

| アリスのトランザクション               | アリスのノンス | ビルのトランザクション                   | ビルのノンス |   ビルの割当量 | ビルのアリスからの総収入 |
| -------------------------- | -------:| ----------------------------- | ------:| --------:| ------------:|
| approve(Bill, 5)           |      10 |                               |        |        5 |            0 |
| increaseAllowance(Bill, 5) |      11 |                               |        | 5+5 = 10 |            0 |
|                            |         | transferFrom(Alice, Bill, 10) | 10,124 |        0 |           10 |

```solidity
    /**
     * @dev Atomically increases the allowance granted to `spender` by the caller.
     *
     * This is an alternative to {approve} that can be used as a mitigation for
     * problems described in {IERC20-approve}.
     *
     * Emits an {Approval} event indicating the updated allowance.
     *
     * Requirements:
     *
     * - `spender` cannot be the zero address.
     */
    function increaseAllowance(address spender, uint256 addedValue) public virtual returns (bool) {
        _approve(_msgSender(), spender, _allowances[_msgSender()][spender].add(addedValue));
        return true;
    }
```

`a.add(b)`関数は、安全な加算です。 万が一、`a`+`b`>=`2^256`のような計算が行われても、通常の加算で発生してしまうオーバー(アンダー)フローが発生しません。

```solidity

    /**
     * @dev Atomically decreases the allowance granted to `spender` by the caller.
     *
     * This is an alternative to {approve} that can be used as a mitigation for
     * problems described in {IERC20-approve}.
     *
     * Emits an {Approval} event indicating the updated allowance.
     *
     * Requirements:
     *
     * - `spender` cannot be the zero address.
     * - `spender` must have allowance for the caller of at least
     * `subtractedValue`.
     */
    function decreaseAllowance(address spender, uint256 subtractedValue) public virtual returns (bool) {
        _approve(_msgSender(), spender, _allowances[_msgSender()][spender].sub(subtractedValue,
                "ERC20: decreased allowance below zero"));
        return true;
    }
```

### トークン情報を変更する関数 {#functions-that-modify-token-information}

次の4つの関数(`_transfer`、`_mint`、`_burn`、`_approve`)は、実際の処理を行います。

#### \_transfer関数 {#\_transfer}

```solidity
    /**
     * @dev Moves tokens `amount` from `sender` to `recipient`.
     *
     * This is internal function is equivalent to {transfer}, and can be used to
     * e.g. implement automatic token fees, slashing mechanisms, etc.
     *
     * Emits a {Transfer} event.
     *
     * Requirements:
     *
     * - `sender` cannot be the zero address.
     * - `recipient` cannot be the zero address.
     * - `sender` must have a balance of at least `amount`.
     */
    function _transfer(address sender, address recipient, uint256 amount) internal virtual {
```

`_transfer`関数は、トークンをあるアカウントから別のアカウントへ転送します。 この関数は、(送信者自身のアカウントから転送する)`transfer`と、(割当量を使用するために他のユーザーのアカウントから転送する)`transferFrom`の両方から呼び出されます。

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
1. [このコントラクトを継承](https://www.bitdegree.org/learn/solidity-inheritance)し、変更する必要がある関数のみをオーバーライドする

OpenZeppelin ERC-20のコードはすでに監査を受けており、安全であることが知られているため、2つ目の方法をお勧めします。 継承を使用すると、変更した関数が明らかになります。他のユーザーは、変更された特定の関数を監査するだけで、そのコントラクトを信頼することができます。

多くの場合、トークンの所有者が変わるたびに関数を実行すると便利です。 ただし、`_transfer`は非常に重要な関数ですが、安全でない書き込みをしてしまう可能性があるため(下記参照)、オーバーライドしないことをお勧めします。 この解決策として、`_beforeTokenTransfer`という[フック関数](https://wikipedia.org/wiki/Hooking)があります。 この関数をオーバライドすれば、転送のたびに呼び出されるようになります。

&nbsp;

```solidity
        _balances[sender] = _balances[sender].sub(amount, "ERC20: transfer amount exceeds balance");
        _balances[recipient] = _balances[recipient].add(amount);
```

この2行で、実際に転送を行っています。 この2行の間に**何もない**ことと、転送する量を送信者から減算してから、その量を受取人に加算していることに注意してください。 この2行の間に別のコントラクトへの呼び出しがある場合、このコントラクトで不正を行うために使用される可能性があるため、このことは非常に重要になります。 こうすることで、転送がアトミックになる(他の操作に割り込まれないようになる)ため、転送の途中で何かが発生することはなくなります。

&nbsp;

```solidity
        emit Transfer(sender, recipient, amount);
    }
```

最後に、`Transfer`イベントを発行します。 イベントは、スマートコントラクトからアクセスできません。しかし、ブロックチェーンの外で実行されているコードは、イベントをリッスンして対応することができます。 例えば、ウォレットで所有者がより多くのトークンを得た時期を追跡できます。

#### \_mint関数と\_burn関数 {#\_mint-and-\_burn}

この2つの関数(`_mint`と`_burn`)は、トークンの総供給量を変更します。 これらはinternalであり、このコントラクト内にこれらを呼び出す関数はありません。そのため、コントラクトを継承し、新しいトークンのミントや既存のトークンのバーンを実行する条件を決定する独自のロジックを追加する場合にのみ役立ちます。

**注:** すべてのERC-20トークンには、トークン管理を規定している独自のビジネスロジックがあります。 例えば、固定した供給量のコントラクトでは、コンストラクタ内で `_mint`のみを呼び出す可能性があり、`_burn`を呼び出すことはありません。 トークンを販売するコントラクトは、支払いが行われたタイミングで`_mint`を呼び出し、天井知らずのインフレを避けるために、ある時点で`_burn`を呼び出すことが考えられます。

```solidity
    /** @dev Creates `amount` tokens and assigns them to `account`, increasing
     * the total supply.
     *
     * Emits a {Transfer} event with `from` set to the zero address.
     *
     * Requirements:
     *
     * - `to` cannot be the zero address.
     */
    function _mint(address account, uint256 amount) internal virtual {
        require(account != address(0), "ERC20: mint to the zero address");
        _beforeTokenTransfer(address(0), account, amount);
        _totalSupply = _totalSupply.add(amount);
        _balances[account] = _balances[account].add(amount);
        emit Transfer(address(0), account, amount);
    }
```

トークンの総額が変更された場合は、`_totalSupply`を必ずアップデートしてください。

&nbsp;

```
    /**
     * @dev Destroys `amount` tokens from `account`, reducing the
     * total supply.
     *
     * Emits a {Transfer} event with `to` set to the zero address.
     *
     * Requirements:
     *
     * - `account` cannot be the zero address.
     * - `account` must have at least `amount` tokens.
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

#### \_approve関数 {#\_approve}

これは、実際の割当量(allowance)を指定する関数です。 所有者は自身の現在の残高よりも高い割当量を指定できることに注意してください。 残高は転送時にチェックされるため、割当量の作成時の残高と異なっていても問題ありません。

```solidity
    /**
     * @dev Sets `amount` as the allowance of `spender` over the `owner` s tokens.
     *
     * This internal function is equivalent to `approve`, and can be used to
     * e.g. set automatic allowances for certain subsystems, etc.
     *
     * Emits an {Approval} event.
     *
     * Requirements:
     *
     * - `owner` cannot be the zero address.
     * - `spender` cannot be the zero address.
     */
    function _approve(address owner, address spender, uint256 amount) internal virtual {
        require(owner != address(0), "ERC20: approve from the zero address");
        require(spender != address(0), "ERC20: approve to the zero address");

        _allowances[owner][spender] = amount;
```

&nbsp;

`Approval`イベントを発行します。 アプリケーションがどのように書かれているかによって異なりますが、使用者(spender)のコントラクトには、所有者またはこれらのイベントをリッスンしているサーバーのいずれかによって承認(Approval)が通知されます。

```solidity
        emit Approval(owner, spender, amount);
    }

```

### 小数変数の変更 {#modify-the-decimals-variable}

```solidity


    /**
     * @dev Sets {decimals} to a value other than the default one of 18.
     *
     * WARNING: This function should only be called from the constructor. Most
     * applications that interact with token contracts will not expect
     * {decimals} to ever change, and may work incorrectly if it does.
     */
    function _setupDecimals(uint8 decimals_) internal {
        _decimals = decimals_;
    }
```

この関数は、`_decimals`変数を変更します。`_decimals`変数は、量(金額)の解釈方法をユーザーインターフェースに伝えるのに使用されます。 コンストラクタから呼び出される必要があります。 その後のどの時点においても、この関数を呼び出すと不正になります。アプリケーションは、このような処理をするようには設計されていません。

### フック {#hooks}

```solidity

    /**
     * @dev Hook that is called before any transfer of tokens. これには
     * ミントとバーンが含まれます。
     *
     * Calling conditions:
     *
     * - when `from` and `to` are both non-zero, `amount` of ``from``'s tokens
     * will be to transferred to `to`.
     * - when `from` is zero, `amount` tokens will be minted for `to`.
     * - when `to` is zero, `amount` of ``from``'s tokens will be burned.
     * - `from` and `to` are never both zero.
     *
     * To learn more about hooks, head to xref:ROOT:extending-contracts.adoc#using-hooks[Using Hooks].
     */
    function _beforeTokenTransfer(address from, address to, uint256 amount) internal virtual { }
}
```

このフック関数は、転送中に呼び出されます。 空になっていますが、何かを実行するのにこの関数が必要な場合は、オーバーライドしてください。

# まとめ {#conclusion}

確認のため、このコントラクトの最も重要な点を以下にまとめています(個人的な意見のため、他者にとって重要な点とは異なる場合があります) 。

- _ブロックチェーンに秘密はありません_。 スマートコントラクトがアクセスできる情報は、世界中で利用可能であることを意味します。
- 自分のトランザクションの順序は自分で制御できますが、他のユーザーのトランザクションが発生するタイミングは制御できません。 これが、割当量(allowance)の変更に伴うリスクになります。変更により、使用者(spender)が変更前と変更後の両方の割当量を使用できてしまうためです。
- `uint256`型の値がオーバー(アンダー)フローします。 つまり、例えば_0-1=2^256-1_です。 これが望ましい動作ではない場合、プログラムで確認する必要があります(または、それを行うSafeMathライブラリを使用します)。 この仕様は、[Solidity 0.8.0](https://docs.soliditylang.org/en/breaking/080-breaking-changes.html)で変更されていることに注意してください。
- 監査を容易にするため、特定の場所で特定の型のすべての状態変更を行います。 例えば、`_approve`が、`approve`、`transferFrom`、`increaseAllowance`、`decreaseAllowance`などによって呼び出されるのは、この理由です。
- (`_transfer`で見られるように)状態変更は、処理の途中で他の操作に割り込まれることがないアトミックである必要があります。 これは状態変更中に、一貫性のない状態が存在するためです。 例えば、送信者の残高からトークンを差し引いた時点から、受取人の残高にそのトークンを加えるまでの間は、存在すべき数よりも少ない数のトークンが存在することになります。 この2つの処理の間に別の操作(特に、異なるコントラクトの呼び出しなど)がある場合、このトークンの状態が悪用される可能性があります。

ここまで、OpenZeppelin ERC-20コントラクトがどのように書かれているかについて見てきました。特に、より安全に記述する方法を学びました。是非自分でも安全なコントラクトとアプリケーションを作成してみてください。
