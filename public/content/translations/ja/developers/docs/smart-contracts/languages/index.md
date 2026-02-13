---
title: "スマートコントラクト言語"
description: "2つの主要なスマートコントラクト言語であるSolidityとVyperの概要と比較"
lang: ja
---

イーサリアムの長所は、比較的デベロッパーフレンドリーな言語を使ってスマートコントラクトを記述できることです。 Pythonまたは[波括弧言語](https://wikipedia.org/wiki/List_of_programming_languages_by_type#Curly-bracket_languages)の経験がある場合は、使い慣れた構文の言語を見つけることができます。

最も活発にメンテナンスされている言語は、以下の2つです。

- Solidity
- Vyper

Remix IDEは、SolidityとVyperの両方でコントラクトを作成およびテストするための包括的な開発環境を提供します。 [ブラウザ内で動作するRemix IDE](https://remix.ethereum.org)を試して、コーディングを始めましょう。

また、経験豊富なデベロッパーであれば、[イーサリアム仮想マシン](/developers/docs/evm/)用の中間言語であるYulや、Yulを拡張したYul+を使うのもよいでしょう。

開発中の新しい言語に興味があり、テストに協力したいとお考えの場合は、Feというまだ登場したばかりのスマートコントラクト言語を試してみることができます。

## 前提条件 {#prerequisites}

プログラミング言語、特にJavaScriptやPythonの知識は、スマートコントラクト言語の違いを理解するのに役立ちます。 また、スマートコントラクトをコンセプトとして理解し、言語比較を深く掘り下げることをお勧めします。 [スマートコントラクト入門](/developers/docs/smart-contracts/)

## Solidity {#solidity}

- スマートコントラクトを実装するためのオブジェクト指向の高級言語
- C++に強い影響を受けた中括弧を使ってブロックを表現する言語
- 静的型付け(変数型はコンパイル時に決定される)
- 以下の言語機能をサポートしている
  - 継承(他のコントラクトを拡張できる)
  - ライブラリ(他のオブジェクト指向言語における静的クラスで定義された静的関数のように、さまざまなコントラクトから呼び出すことができる再利用可能なコードを作成できる)
  - 複雑なユーザー定義型

### 重要なリンク {#important-links}

- [ドキュメント](https://docs.soliditylang.org/en/latest/)
- [Solidity言語ポータル](https://soliditylang.org/)
- [Solidity by Example](https://docs.soliditylang.org/en/latest/solidity-by-example.html)
- [GitHub](https://github.com/ethereum/solidity/)
- [Solidity Gitterチャットルーム](https://gitter.im/ethereum/solidity) ([Solidity Matrixチャットルーム](https://matrix.to/#/#ethereum_solidity:gitter.im)にブリッジ接続)
- [チートシート](https://reference.auditless.com/cheatsheet)
- [Solidityブログ](https://blog.soliditylang.org/)
- [SolidityのTwitter](https://twitter.com/solidity_lang)

### コントラクトの例 {#example-contract}

```solidity
// SPDX-License-Identifier: GPL-3.0
pragma solidity >= 0.7.0;

contract Coin {
    // 「public」というキーワードにより、変数は
    // 他のコントラクトからアクセス可能になります
    address public minter;
    mapping (address => uint) public balances;

    // イベントにより、クライアントは
    // 宣言された特定のコントラクトの変更に対応できます
    event Sent(address from, address to, uint amount);

    // コンストラクタのコードは、コントラクトが
    // 作成されたときにのみ実行されます
    constructor() {
        minter = msg.sender;
    }

    // 新たに作成されたコインをアドレスに送金します
    // コントラクトの作成者のみが呼び出すことができます
    function mint(address receiver, uint amount) public {
        require(msg.sender == minter);
        require(amount < 1e60);
        balances[receiver] += amount;
    }

    // 既存のコインを
    // 任意の呼び出し元からアドレスに送金します
    function send(address receiver, uint amount) public {
        require(amount <= balances[msg.sender], "残高が不足しています。");
        balances[msg.sender] -= amount;
        balances[receiver] += amount;
        emit Sent(msg.sender, receiver, amount);
    }
}
```

この例は、Solidityのコントラクト構文がどのようなものか理解するのに役立つでしょう。 関数と変数の詳細な説明については、[ドキュメントをご覧ください](https://docs.soliditylang.org/en/latest/contracts.html)。

## Vyper {#vyper}

- Python的なプログラミング言語
- 強い型付け
- コンパクトでわかりやすいコンパイラコード
- 効率的なバイトコード生成
- コントラクトの安全性を確保し、監査が容易になることを目的として、意図的にSolidityよりも機能を絞っている。 Vyperは以下をサポートしていない
  - modifier修飾子
  - 継承
  - インラインアセンブリ
  - 関数のオーバーロード
  - オペレータのオーバーロード
  - 再帰呼び出し
  - 無限ループ
  - 2進固定小数点

詳細については、[Vyperの理論的根拠をお読みください](https://vyper.readthedocs.io/en/latest/index.html)。

### 重要なリンク {#important-links-1}

- [ドキュメント](https://vyper.readthedocs.io)
- [Vyper by Example](https://vyper.readthedocs.io/en/latest/vyper-by-example.html)
- [More Vyper by Example](https://vyper-by-example.org/)
- [GitHub](https://github.com/vyperlang/vyper)
- [VyperコミュニティのDiscordチャット](https://discord.gg/SdvKC79cJk)
- [チートシート](https://reference.auditless.com/cheatsheet)
- [Vyper用スマートコントラクト開発フレームワークおよびツール](/developers/docs/programming-languages/python/)
- [VyperPunk - Vyperスマートコントラクトを保護しハッキングする方法を学ぶ](https://github.com/SupremacyTeam/VyperPunk)
- [開発用Vyperハブ](https://github.com/zcor/vyper-dev)
- [Vyperの優れたスマートコントラクトの例](https://github.com/pynchmeister/vyper-greatest-hits/tree/main/contracts)
- [Awesome Vyper厳選リソース](https://github.com/spadebuilders/awesome-vyper)

### 例 {#example}

```python
# オープンオークション

# オークションのパラメータ

# 受取人は最高額入札者から資金を受け取ります

beneficiary: public(address)
auctionStart: public(uint256)
auctionEnd: public(uint256)

# オークションの現在の状態

highestBidder: public(address)
highestBid: public(uint256)

# 終了時にtrueに設定され、いかなる変更も許可しません

ended: public(bool)

# 払い戻された入札を追跡し、引き出しパターンに従うことができるようにします

pendingReturns: public(HashMap[address, uint256])

# 受取人アドレス `_beneficiary` のために、 `_bidding_time` 秒の

# 入札時間を持つ簡単なオークションを作成します。

@external
def __init__(_beneficiary: address, _bidding_time: uint256):
    self.beneficiary = _beneficiary
    self.auctionStart = block.timestamp
    self.auctionEnd = self.auctionStart + _bidding_time

# このトランザクションと一緒に送信された

# 金額でオークションに入札します。

# この金額は、オークションで落札

# できなかった場合にのみ返金されます。

@external
@payable
def bid():
    # 入札期間が終了したかどうかを確認します。
    assert block.timestamp < self.auctionEnd
    # 入札額が十分に高いかを確認します
    assert msg.value > self.highestBid
    # 前の最高額入札者の払い戻しを追跡します
    self.pendingReturns[self.highestBidder] += self.highestBid
    # 新しい最高額入札を追跡します
    self.highestBidder = msg.sender
    self.highestBid = msg.value

# 以前に払い戻された入札を引き出します。ここではセキュリティ上の

# 問題を避けるために、引き出しパターンが使用されています。

# bid()の一部として払い戻しが直接送信された場合、

# 悪意のある入札コントラクトがそれらの払い戻しをブロックし、

# それによって新しい高額の入札を妨げる可能性があります。

@external
def withdraw():
    pending_amount: uint256 = self.pendingReturns[msg.sender]
    self.pendingReturns[msg.sender] = 0
    send(msg.sender, pending_amount)

# オークションを終了し、最高入札額を

# 受取人に送信します。

@external
def endAuction():
    # 他のコントラクトとやり取りする関数（つまり、関数を呼び出したりetherを送信したりする関数）は、
    # 次の3つのフェーズに構造化するのが良いガイドラインです：
    # 1. 条件の確認
    # 2. アクションの実行（条件が変更される可能性あり）
    # 3. 他のコントラクトとのやり取り
    # これらのフェーズが混在していると、他のコントラクトが現在の
    # コントラクトをコールバックして状態を変更したり、
    # （etherの支払いなどの）効果を複数回実行させたりする可能性があります。
    # 内部で呼び出される関数に外部コントラクトとの
    # やり取りが含まれる場合、それらも外部コントラクトとの
    # やり取りと見なされなければなりません。

    # 1. 条件
    # オークション終了時刻に達したか確認
    assert block.timestamp >= self.auctionEnd
    # この関数が既に呼ばれたか確認
    assert not self.ended

    # 2. 効果
    self.ended = True

    # 3. やり取り
    send(self.beneficiary, self.highestBid)
```

この例は、Vyperのコントラクト構文がどのようなものか理解するのに役立つでしょう。 関数と変数の詳細な説明については、[ドキュメントをご覧ください](https://vyper.readthedocs.io/en/latest/vyper-by-example.html#simple-open-auction)。

## YulとYul+ {#yul}

イーサリアムを使い始めたばかりで、スマートコントラクト言語を使ってコードを書いたことがない場合は、SolidityやVyperを利用することをお勧めします。 YulやYul+を検討するのは、スマートコントラクトのセキュリティの最善の方法や、EVMとの連携の具体的な内容に精通してからにしてください。

**Yul**

- イーサリアムのための中間言語
- [EVM](/developers/docs/evm)および[Ewasm](https://github.com/ewasm)というイーサリアム向けのWebAssemblyをサポートしており、両方のプラットフォームで使用可能な共通部分として設計されています。
- EVMとeWASMの両方のプラットフォームに同程度のメリットをもたらす、高度な最適化段階を経る対象となる

**Yul+**

- Yulに高効率な拡張機能を施した低レベル言語
- 当初は[オプティミスティック・ロールアップ](/developers/docs/scaling/optimistic-rollups/)のコントラクト向けに設計されました。
- Yulに新しい機能を追加した実験的なアップグレード案として捉えることができる

### 重要なリンク {#important-links-2}

- [Yulドキュメント](https://docs.soliditylang.org/en/latest/yul.html)
- [Yul+ドキュメント](https://github.com/fuellabs/yulp)
- [Yul+紹介記事](https://medium.com/@fuellabs/introducing-yul-a-new-low-level-language-for-ethereum-aa64ce89512f)

### コントラクトの例 {#example-contract-2}

以下の簡単な例では、べき乗関数を実装しています。 `solc --strict-assembly --bin input.yul`を使用してコンパイルできます。 この例は、input.yulに記述されます。

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

スマートコントラクトに精通している場合、Yulでの完全なERC20実装は[こちら](https://solidity.readthedocs.io/en/latest/yul.html#complete-erc20-example)でご覧いただけます。

## Fe {#fe}

- イーサリアム仮想マシン(EVM)向けの静的型付け言語
- PythonとRustの影響を受けている
- イーサリアムのエコシステムに不慣れなデベロッパーでも簡単に学習できる言語であることを目標としている
- Feの開発は未だ初期段階にあり、2021年1月にアルファ版がリリースされた

### 重要なリンク {#important-links-3}

- [GitHub](https://github.com/ethereum/fe)
- [Feの発表](https://snakecharmers.ethereum.org/fe-a-new-language-for-the-ethereum-ecosystem/)
- [Fe 2021ロードマップ](https://notes.ethereum.org/LVhaTF30SJOpkbG1iVw1jg)
- [FeのDiscordチャット](https://discord.com/invite/ywpkAXFjZH)
- [FeのTwitter](https://twitter.com/official_fe)

### コントラクトの例 {#example-contract-3}

Feで実装されたシンプルなコントラクトのコード例を以下に示します。

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

## 選び方 {#how-to-choose}

他のプログラミング言語と同様に、個人的な好みだけでなく、行いたいことに最適なツールを選択することが重要です。

まだどの言語も試していない場合に考慮すべき事項をいくつか紹介します。

### Solidityの長所 {#solidity-advantages}

- 初心者向けに、多くのチュートリアルや学習ツールが用意されている。 詳細については、[コーディングによる学習](/developers/learning-tools/)のセクションをご覧ください。
- 優れた開発ツールが利用可能
- Solidityには大きなデベロッパーコミュニティがあり、質問に対する答えをすぐに見つけることができる

### Vyperの長所 {#vyper-advatages}

- Pythonデベロッパーが、スマートコントラクトの記述を始めるのに最適な方法である
- Vyperの機能の数は絞られているため、アイデアから素早くプロトタイプを構築可能
- Vyperは監査が容易で、最大限に人間が読めるようにすることを目指している

### YulとYul+の長所 {#yul-advantages}

- シンプルで機能的な低レベル言語
- 生のEVMに近づくことができ、コントラクトのガス使用量を最適化するのに役立つ

## 言語の比較 {#language-comparisons}

基本的な構文、コントラクトのライフサイクル、インターフェース、演算子、データ構造、関数、制御フローなどの比較については、この[Auditlessによるチートシート](https://reference.auditless.com/cheatsheet/)をご覧ください。

## 参考リンク {#further-reading}

- [OpenZeppelinによるSolidityコントラクトライブラリ](https://docs.openzeppelin.com/contracts/5.x/)
- [Solidity by Example](https://solidity-by-example.org)
