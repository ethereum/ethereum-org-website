---
title: スマートコントラクト言語
description: 2つの主要なスマートコントラクト言語であるSolidityとVyperの概要と比較
lang: ja
---

イーサリアムの長所は、比較的デベロッパーフレンドリーな言語を使ってスマートコントラクトを記述できることです。 Python や[中括弧を使ってブロックを表現する言語](https://wikipedia.org/wiki/List_of_programming_languages_by_type#Curly-bracket_languages)を使用している方は、見慣れたような構文を持つ言語を使うことができます。

最も活発にメンテナンスされている言語は、以下の 2 つです。

- Solidity
- Vyper

また、経験豊富なデベロッパーであれば、[イーサリアム仮想マシン](/developers/docs/evm/)用の中間言語である Yul や、Yul を拡張した Yul+を使うのもよいでしょう。

開発中の新しい言語に興味があり、テストに協力したいとお考えの場合は、Fe というまだ登場したばかりのスマートコントラクト言語を試してみることができます。

## 前提知識 {#prerequisites}

プログラミング言語、特に JavaScript や Python の知識は、スマートコントラクト言語の違いを理解するのに役立ちます。 また、スマートコントラクトをコンセプトとして理解し、言語比較を深く掘り下げることをお勧めします。 [スマートコントラクトの紹介](/developers/docs/smart-contracts/)

## Solidity {#solidity}

- スマートコントラクトを実装するためのオブジェクト指向の高級言語
- C++に強い影響を受けた中括弧を使ってブロックを表現する言語
- 静的型付け(変数型はコンパイル時に決定される)
- 以下の言語機能をサポートしている
  - 継承(他のコントラクトを拡張できる)
  - ライブラリ(他のオブジェクト指向言語における静的クラスで定義された静的関数のように、さまざまなコントラクトから呼び出すことができる再利用可能なコードを作成できる)
  - 複雑なユーザー定義型

### 参照すべきリンク {#important-links}

- [ドキュメント](https://docs.soliditylang.org/en/latest/)
- [Solidity 言語ポータル](https://soliditylang.org/)
- [Solidity by Example](https://docs.soliditylang.org/en/latest/solidity-by-example.html)
- [GitHub](https://github.com/ethereum/solidity/)
- [Solidity Matrix チャットルーム](https://matrix.to/#/#ethereum_solidity:gitter.im)にブリッジされた[Solidity Gitter チャットルーム](https://gitter.im/ethereum/solidity/)
- [チートシート](https://reference.auditless.com/cheatsheet)
- [Solidity ブログ](https://blog.soliditylang.org/)
- [Solidity Twitter](https://twitter.com/solidity_lang)

### コントラクトのコード例 {#example-contract}

```solidity
// SPDX-License-Identifier: GPL-3.0
pragma solidity >= 0.7.0;

contract Coin {
    // The keyword "public" makes variables
    // accessible from other contracts
    address public minter;
    mapping (address => uint) public balances;

    // Events allow clients to react to specific
    // contract changes you declare
    event Sent(address from, address to, uint amount);

    // Constructor code is only run when the contract
    // is created
    constructor() {
        minter = msg.sender;
    }

    // Sends an amount of newly created coins to an address
    // Can only be called by the contract creator
    function mint(address receiver, uint amount) public {
        require(msg.sender == minter);
        require(amount < 1e60);
        balances[receiver] += amount;
    }

    // Sends an amount of existing coins
    // from any caller to an address
    function send(address receiver, uint amount) public {
        require(amount <= balances[msg.sender], "Insufficient balance.");
        balances[msg.sender] -= amount;
        balances[receiver] += amount;
        emit Sent(msg.sender, receiver, amount);
    }
}
```

この例は、Solidity のコントラクト構文がどのようなものか理解するのに役立つでしょう。 関数と変数のより詳細な説明については、[ドキュメント](https://docs.soliditylang.org/en/latest/contracts.html)を参照してください。

## Vyper {#vyper}

- Python 的なプログラミング言語
- 強い型付け
- コンパクトでわかりやすいコンパイラコード
- 効率的なバイトコード生成
- コントラクトの安全性を確保し、監査が容易になることを目的として、意図的に Solidity よりも機能を絞っている。 Vyper は以下をサポートしていない
  - modifier 修飾子
  - 継承
  - インラインアセンブリ
  - 関数のオーバーロード
  - オペレータのオーバーロード
  - 再帰呼び出し
  - 無限ループ
  - 2 進固定小数点

詳細については、[Vyper のドキュメント](https://vyper.readthedocs.io/en/latest/index.html)を参照してください。

### 参照すべきリンク {#important-links-1}

- [ドキュメント](https://vyper.readthedocs.io)
- [Vyper by Example](https://vyper.readthedocs.io/en/latest/vyper-by-example.html)
- [More Vyper by Example](https://vyper-by-example.org/)
- [GitHub](https://github.com/vyperlang/vyper)
- [Vyper コミュニティの Discord チャット](https://discord.gg/SdvKC79cJk)
- [チートシート](https://reference.auditless.com/cheatsheet)
- [スマートコントラクト開発フレームワークと Vyper 用ツール](/developers/docs/programming-languages/python/)
- [VyperPunk - Vyper スマートコントラクトのセキュリティとハッキングを学ぶ](https://github.com/SupremacyTeam/VyperPunk)
- [VyperExamples - Vyper の脆弱性の例](https://www.vyperexamples.com/reentrancy)
- [開発用 Vyper Hub](https://github.com/zcor/vyper-dev)
- [人気を博している Vyper のスマートコントラクトの例](https://github.com/pynchmeister/vyper-greatest-hits/tree/main/contracts)
- [素晴らしい Vyper の厳選されたリソース](https://github.com/spadebuilders/awesome-vyper)

### 例 {#example}

```python
# Open Auction

# Auction params
# Beneficiary receives money from the highest bidder
beneficiary: public(address)
auctionStart: public(uint256)
auctionEnd: public(uint256)

# Current state of auction
highestBidder: public(address)
highestBid: public(uint256)

# Set to true at the end, disallows any change
ended: public(bool)

# Keep track of refunded bids so we can follow the withdraw pattern
pendingReturns: public(HashMap[address, uint256])

# Create a simple auction with `_bidding_time`
# seconds bidding time on behalf of the
# beneficiary address `_beneficiary`.
@external
def __init__(_beneficiary: address, _bidding_time: uint256):
    self.beneficiary = _beneficiary
    self.auctionStart = block.timestamp
    self.auctionEnd = self.auctionStart + _bidding_time

# Bid on the auction with the value sent
# together with this transaction.
# The value will only be refunded if the
# auction is not won.
@external
@payable
def bid():
    # Check if bidding period is over.
    assert block.timestamp < self.auctionEnd
    # Check if bid is high enough
    assert msg.value > self.highestBid
    # Track the refund for the previous high bidder
    self.pendingReturns[self.highestBidder] += self.highestBid
    # Track new high bid
    self.highestBidder = msg.sender
    self.highestBid = msg.value

# Withdraw a previously refunded bid. The withdraw pattern is
# used here to avoid a security issue. If refunds were directly
# sent as part of bid(), a malicious bidding contract could block
# those refunds and thus block new higher bids from coming in.
@external
def withdraw():
    pending_amount: uint256 = self.pendingReturns[msg.sender]
    self.pendingReturns[msg.sender] = 0
    send(msg.sender, pending_amount)

# End the auction and send the highest bid
# to the beneficiary.
@external
def endAuction():
    # It is a good guideline to structure functions that interact
    # with other contracts (i.e. they call functions or send ether)
    # into three phases:
    # 1. checking conditions
    # 2. performing actions (potentially changing conditions)
    # 3. interacting with other contracts
    # If these phases are mixed up, the other contract could call
    # back into the current contract and modify the state or cause
    # effects (ether payout) to be performed multiple times.
    # If functions called internally include interaction with external
    # contracts, they also have to be considered interaction with
    # external contracts.

    # 1. Conditions
    # Check if auction endtime has been reached
    assert block.timestamp >= self.auctionEnd
    # Check if this function has already been called
    assert not self.ended

    # 2. Effects
    self.ended = True

    # 3. Interaction
    send(self.beneficiary, self.highestBid)
```

この例は、Vyper のコントラクト構文がどのようなものか理解するのに役立つでしょう。 関数と変数のより詳細な説明については、[ドキュメント](https://vyper.readthedocs.io/en/latest/vyper-by-example.html#simple-open-auction)を参照してください。

## Yul と Yul+ {#yul}

イーサリアムを使い始めたばかりで、スマートコントラクト言語を使ってコードを書いたことがない場合は、Solidity や Vyper を利用することをお勧めします。 Yul や Yul+を検討するのは、スマートコントラクトのセキュリティの最善の方法や、EVM との連携の具体的な内容に精通してからにしてください。

**Yul**

- イーサリアムのための中間言語
- [EVM](/developers/docs/evm)および[Ewasm](https://github.com/ewasm)というイーサリアム向けの WebAssembly をサポートしており、両方のプラットフォームで使用可能な共通部分として設計されている
- EVM と eWASM の両方のプラットフォームに同程度のメリットをもたらす、高度な最適化段階を経る対象となる

**Yul+**

- Yul に高効率な拡張機能を施した低レベル言語
- コントラクトの[オプティミスティック・ロールアップ](/developers/docs/scaling/optimistic-rollups/)のために設計された
- Yul に新しい機能を追加した実験的なアップグレード案として捉えることができる

### 参照すべきリンク {#important-links-2}

- [Yul のドキュメント](https://docs.soliditylang.org/en/latest/yul.html)
- [Yul+のドキュメント](https://github.com/fuellabs/yulp)
- [Yul+ Playground](https://yulp.fuel.sh/)
- [Yul+の紹介記事](https://medium.com/@fuellabs/introducing-yul-a-new-low-level-language-for-ethereum-aa64ce89512f)

### コントラクトのコード例 {#example-contract-2}

以下の簡単な例では、べき乗関数を実装しています。 `solc --strict-assembly --bin input.yul`を使用してコンパイルすることができます。 この例は、input.yul に記述されます。

```
{
    function power(base, exponent) -> result
    {
        switch exponent
        case 0 { result := 1 }
        case 1 { result := base }
        default
        {
            result := power(mul(base, base), div(exponent, 2))
            if mod(exponent, 2) { result := mul(base, result) }
        }
    }
    let res := power(calldataload(0), calldataload(32))
    mstore(0, res)
    return(0, 32)
}
```

スマートコントラクトの経験が豊富な場合は、Yul による[ERC20 の完全な実装](https://solidity.readthedocs.io/en/latest/yul.html#complete-erc20-example)をご覧ください。

## Fe {#fe}

- イーサリアム仮想マシン(EVM)向けの静的型付け言語
- Python と Rust の影響を受けている
- イーサリアムのエコシステムに不慣れなデベロッパーでも簡単に学習できる言語であることを目標としている
- Fe の開発は未だ初期段階にあり、2021 年 1 月にアルファ版がリリースされた

### 参照すべきリンク {#important-links-3}

- [GitHub](https://github.com/ethereum/fe)
- [Fe に関するアナウンス](https://snakecharmers.ethereum.org/fe-a-new-language-for-the-ethereum-ecosystem/)
- [2021 年の Fe のロードマップ](https://notes.ethereum.org/LVhaTF30SJOpkbG1iVw1jg)
- [Fe の Discord チャット](https://discord.com/invite/ywpkAXFjZH)
- [Twitter](https://twitter.com/official_fe)

### コントラクトのコード例 {#example-contract-3}

Fe で実装されたシンプルなコントラクトのコード例を以下に示します。

```
type BookMsg = bytes[100]

contract GuestBook:
    pub guest_book: map<address, BookMsg>

    event Signed:
        book_msg: BookMsg

    pub def sign(book_msg: BookMsg):
        self.guest_book[msg.sender] = book_msg

        emit Signed(book_msg=book_msg)

    pub def get_msg(addr: address) -> BookMsg:
        return self.guest_book[addr].to_mem()

```

## 選択方法 {#how-to-choose}

他のプログラミング言語と同様に、個人的な好みだけでなく、行いたいことに最適なツールを選択することが重要です。

まだどの言語も試していない場合に考慮すべき事項をいくつか紹介します。

### Solidity の長所 {#solidity-advantages}

- 初心者向けに、多くのチュートリアルや学習ツールが用意されている。 詳細については、[コーディングで学ぶ](/developers/learning-tools/)セクションを参照
- 優れた開発ツールが利用可能
- Solidity には大きなデベロッパーコミュニティがあり、質問に対する答えをすぐに見つけることができる

### Vyper の長所 {#vyper-advatages}

- Python デベロッパーが、スマートコントラクトの記述を始めるのに最適な方法である
- Vyper の機能の数は絞られているため、アイデアから素早くプロトタイプを構築可能
- Vyper は監査が容易で、最大限に人間が読めるようにすることを目指している

### Yul と Yul+の長所 {#yul-advantages}

- シンプルで機能的な低レベル言語
- 生の EVM に近づくことができ、コントラクトのガス使用量を最適化するのに役立つ

## 言語比較 {#language-comparisons}

コントラクトのライフサイクル、インターフェイス、演算子、データ構造、関数、制御フローなどの基本的な構文の比較については、 [Auditless によるチートシート](https://reference.auditless.com/cheatsheet/)を参照してください。

## 参考文献 {#further-reading}

- [OpenZeppelin による Solidity コントラクトライブラリ](https://docs.openzeppelin.com/contracts)
- [Solidity by Example](https://solidity-by-example.org)
