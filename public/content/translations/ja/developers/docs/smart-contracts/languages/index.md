---
title: "スマート・コントラクト言語"
description: "2つの主要なスマート・コントラクト言語であるSolidityとVyperの概要と機能比較。"
lang: ja
---

[イーサリアム](/)の素晴らしい点は、比較的開発者に優しい言語を使用してスマート・コントラクトをプログラミングできることです。Pythonや[波括弧を使用する言語](https://wikipedia.org/wiki/List_of_programming_languages_by_type#Curly-bracket_languages)の経験があれば、馴染みのある構文を持つ言語を見つけることができます。

最も活発に開発および保守されている2つの言語は以下の通りです。

- Solidity
- Vyper

Remix統合開発環境 (IDE)は、SolidityとVyperの両方でコントラクトを作成およびテストするための包括的な開発環境を提供します。コーディングを始めるには、[ブラウザベースのRemix IDEをお試しください](https://remix.ethereum.org)。

より経験豊富な開発者は、[イーサリアム仮想マシン (EVM)](/developers/docs/evm/)の中間言語であるYul、またはYulの拡張であるYul+を使用することもできます。

好奇心旺盛で、現在も活発に開発されている新しい言語のテストに協力したい場合は、まだ初期段階にある新興のスマート・コントラクト言語であるFeを試すことができます。

## 前提知識 {#prerequisites}

プログラミング言語、特にJavaScriptやPythonの予備知識があると、スマート・コントラクト言語の違いを理解するのに役立ちます。また、言語の比較を深く掘り下げる前に、概念としてのスマート・コントラクトを理解しておくことをお勧めします。[スマート・コントラクトの紹介](/developers/docs/smart-contracts/)

## Solidity {#solidity}

- スマート・コントラクトを実装するためのオブジェクト指向の高水準言語。
- C++から最も強い影響を受けた波括弧を使用する言語。
- 静的型付け (変数の型がコンパイル時に決定される)。
- 以下の機能をサポート:
  - 継承 (他のコントラクトを拡張できる)。
  - ライブラリ (他のオブジェクト指向プログラミング言語における静的クラスの静的関数のように、異なるコントラクトから呼び出せる再利用可能なコードを作成できる)。
  - 複雑なユーザー定義型。

### 重要なリンク {#important-links}

- [ドキュメント](https://docs.soliditylang.org/en/latest/)
- [Solidity言語ポータル](https://soliditylang.org/)
- [Solidity by Example](https://docs.soliditylang.org/en/latest/solidity-by-example.html)
- [GitHub](https://github.com/ethereum/solidity/)
- [Solidity Matrixチャットルーム](https://matrix.to/#/#ethereum_solidity:gitter.im)にブリッジされた[Solidity Gitterチャットルーム](https://gitter.im/ethereum/solidity)
- [チートシート](https://reference.auditless.com/cheatsheet)
- [Solidityブログ](https://blog.soliditylang.org/)
- [Solidityのツイッター](https://twitter.com/solidity_lang)

### コントラクトの例 {#example-contract}

```solidity
// SPDX-License-Identifier: GPL-3.0
pragma solidity >= 0.7.0;

contract Coin {
    // 「public」キーワードは変数を
    // 他のコントラクトからアクセス可能にします
    address public minter;
    mapping (address => uint) public balances;

    // イベントにより、クライアントは宣言した特定の
    // コントラクトの変更に反応できるようになります
    event Sent(address from, address to, uint amount);

    // コンストラクタのコードは、コントラクトが
    // 作成されたときにのみ実行されます
    constructor() {
        minter = msg.sender;
    }

    // 新しく作成されたコインを指定した量だけアドレスに送信します
    // コントラクトの作成者のみが呼び出すことができます
    function mint(address receiver, uint amount) public {
        require(msg.sender == minter);
        require(amount < 1e60);
        balances[receiver] += amount;
    }

    // 既存のコインを指定した量だけ
    // 任意の呼び出し元からアドレスに送信します
    function send(address receiver, uint amount) public {
        require(amount <= balances[msg.sender], "Insufficient balance.");
        balances[msg.sender] -= amount;
        balances[receiver] += amount;
        emit Sent(msg.sender, receiver, amount);
    }
}
```

この例から、Solidityのコントラクト構文がどのようなものかを感じ取れるはずです。関数や変数の詳細については、[ドキュメントを参照してください](https://docs.soliditylang.org/en/latest/contracts.html)。

## Vyper {#vyper}

- Python風のプログラミング言語
- 強い型付け
- 小規模で理解しやすいコンパイラコード
- 効率的なバイトコード生成
- コントラクトをより安全で監査しやすくすることを目的として、意図的にSolidityよりも機能を少なくしています。Vyperは以下をサポートしていません:
  - 修飾子 (Modifiers)
  - 継承
  - インラインアセンブリ
  - 関数のオーバーロード
  - 演算子のオーバーロード
  - 再帰呼び出し
  - 無限ループ
  - 2進固定小数点

v0.4.0以降、Vyperは[モジュールシステム](https://docs.vyperlang.org/en/stable/using-modules.html)をサポートしています。コードの再利用は、クラスの継承ではなくコンポジションを通じて実現されます。

詳細については、[Vyperの基本理念をお読みください](https://vyper.readthedocs.io/en/latest/index.html)。

### 重要なリンク {#important-links-1}

- [ドキュメント](https://vyper.readthedocs.io)
- [Vyper by Example](https://vyper.readthedocs.io/en/latest/vyper-by-example.html)
- [More Vyper by Example](https://vyper-by-example.org/)
- [GitHub](https://github.com/vyperlang/vyper)
- [Vyperコミュニティのディスコードチャット](https://discord.gg/SdvKC79cJk)
- [チートシート](https://reference.auditless.com/cheatsheet)
- [Vyper向けのスマート・コントラクト開発フレームワークとツール](/developers/docs/programming-languages/python/)
- [VyperPunk - Vyperスマート・コントラクトの保護とハッキングを学ぶ](https://github.com/SupremacyTeam/VyperPunk)
- [開発用Vyper Hub](https://github.com/zcor/vyper-dev)
- [Vyperの代表的なスマート・コントラクト例](https://github.com/pynchmeister/vyper-greatest-hits/tree/main/contracts)
- [Awesome Vyper (厳選されたリソース)](https://github.com/spadebuilders/awesome-vyper)

### 例 {#example}

```python
# オープンオークション

# オークションのパラメータ
# 受益者は最高額入札者からお金を受け取ります
beneficiary: public(address)
auctionStart: public(uint256)
auctionEnd: public(uint256)

# オークションの現在の状態
highestBidder: public(address)
highestBid: public(uint256)

# 最後にtrueに設定され、いかなる変更も許可しません
ended: public(bool)

# 引き出しパターンに従うことができるように、返金された入札を追跡します
pendingReturns: public(HashMap[address, uint256])

# `_bidding_time`
# 秒の入札期間を持つシンプルなオークションを、
# 受益者アドレス `_beneficiary` のために作成します。
@deploy
def __init__(_beneficiary: address, _bidding_time: uint256):
    self.beneficiary = _beneficiary
    self.auctionStart = block.timestamp
    self.auctionEnd = self.auctionStart + _bidding_time

# このトランザクションと一緒に送信された
# 値でオークションに入札します。
# この値は、オークションに勝てなかった
# 場合にのみ返金されます。
@external
@payable
def bid():
    # 入札期間が終了しているか確認します。
    assert block.timestamp < self.auctionEnd
    # 入札額が十分に高いか確認します
    assert msg.value > self.highestBid
    # 以前の最高額入札者への返金を追跡します
    self.pendingReturns[self.highestBidder] += self.highestBid
    # 新しい最高入札額を追跡します
    self.highestBidder = msg.sender
    self.highestBid = msg.value

# 以前に返金された入札を引き出します。ここではセキュリティ上の問題を
# 回避するために引き出しパターンが使用されています。もし返金が bid() の
# 一部として直接送信された場合、悪意のある入札コントラクトがそれらの返金を
# ブロックし、新しいより高い入札が入るのをブロックする可能性があります。
@external
def withdraw():
    pending_amount: uint256 = self.pendingReturns[msg.sender]
    self.pendingReturns[msg.sender] = 0
    send(msg.sender, pending_amount)

# オークションを終了し、最高入札額を
# 受益者に送信します。
@external
def endAuction():
    # 他のコントラクトと相互作用する（つまり、関数を呼び出したりEtherを送信したりする）
    # 関数を以下の3つのフェーズに構成することが
    # 良いガイドラインです：
    # 1. 条件の確認
    # 2. アクションの実行（条件を変更する可能性があります）
    # 3. 他のコントラクトとの相互作用
    # これらのフェーズが混ざっていると、他のコントラクトが現在のコントラクトに
    # コールバックして状態を変更したり、効果（Etherの支払い）を
    # 複数回実行させたりする可能性があります。
    # 内部で呼び出される関数に外部コントラクトとの相互作用が含まれる場合、
    # それらも外部コントラクトとの相互作用と
    # 見なす必要があります。

    # 1. 条件
    # オークションの終了時間に達しているか確認します
    assert block.timestamp >= self.auctionEnd
    # この関数がすでに呼び出されているか確認します
    assert not self.ended

    # 2. 効果
    self.ended = True

    # 3. 相互作用
    send(self.beneficiary, self.highestBid)
```

この例から、Vyperのコントラクト構文がどのようなものかを感じ取れるはずです。関数や変数の詳細については、[ドキュメントを参照してください](https://vyper.readthedocs.io/en/latest/vyper-by-example.html#simple-open-auction)。

## YulとYul+ {#yul}

イーサリアムが初めてで、スマート・コントラクト言語でのコーディング経験がない場合は、SolidityまたはVyperから始めることをお勧めします。スマート・コントラクトのセキュリティのベストプラクティスや、イーサリアム仮想マシン (EVM)の仕様に精通してから、YulやYul+を検討してください。

**Yul**

- イーサリアムの中間言語。
- [EVM](/developers/docs/evm)およびイーサリアム仕様のWebAssemblyである[Ewasm](https://github.com/ewasm)をサポートしており、両プラットフォームで利用可能な共通基盤となるように設計されています。
- EVMとEwasmの両プラットフォームに等しく恩恵をもたらす、高度な最適化フェーズの優れたターゲットです。

**Yul+**

- Yulの低水準かつ高効率な拡張。
- 当初は[オプティミスティック・ロールアップ](/developers/docs/scaling/optimistic-rollups/)のコントラクト用に設計されました。
- Yul+は、Yulに新機能を追加する実験的なアップグレード提案と見なすことができます。

### 重要なリンク {#important-links-2}

- [Yulドキュメント](https://docs.soliditylang.org/en/latest/yul.html)
- [Yul+ドキュメント](https://github.com/fuellabs/yulp)
- [Yul+の紹介記事](https://medium.com/@fuellabs/introducing-yul-a-new-low-level-language-for-ethereum-aa64ce89512f)

### コントラクトの例 {#example-contract-2}

以下のシンプルな例は、累乗関数を実装しています。これは`solc --strict-assembly --bin input.yul`を使用してコンパイルできます。この例はinput.yulファイルに保存する必要があります。

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

すでにスマート・コントラクトの経験が豊富な場合、Yulでの完全なERC-20実装を[こちら](https://solidity.readthedocs.io/en/latest/yul.html#complete-erc20-example)で確認できます。

## Fe {#fe}

- イーサリアム仮想マシン (EVM)向けの静的型付け言語。
- PythonとRustに影響を受けています。
- イーサリアムエコシステムが初めての開発者にとっても、学習しやすいことを目指しています。
- Feの開発はまだ初期段階にあり、2021年1月にアルファ版がリリースされました。

### 重要なリンク {#important-links-3}

- [GitHub](https://github.com/ethereum/fe)
- [Feのアナウンス](https://blog.fe-lang.org/posts/fe-a-new-language-for-the-ethereum-ecosystem/)
- [Fe 2021年ロードマップ](https://notes.ethereum.org/LVhaTF30SJOpkbG1iVw1jg)
- [Feのディスコードチャット](https://discord.com/invite/ywpkAXFjZH)
- [Feのツイッター](https://twitter.com/official_fe)

### コントラクトの例 {#example-contract-3}

以下は、Feで実装されたシンプルなコントラクトです。

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

他のプログラミング言語と同様に、基本的には適材適所で適切なツールを選ぶことと、個人の好みの問題です。

まだどの言語も試したことがない場合は、以下の点を考慮してみてください:

### Solidityの優れた点 {#solidity-advantages}

- 初心者向けに、多くのチュートリアルや学習ツールが提供されています。詳細については、[コーディングによる学習](/developers/learning-tools/)のセクションを参照してください。
- 優れた開発者向けツールが利用可能です。
- Solidityには大規模な開発者コミュニティがあるため、疑問に対する答えをすぐに見つけられる可能性が高いです。

### Vyperの優れた点 {#vyper-advatages}

- スマート・コントラクトを書きたいPython開発者にとって、素晴らしい入門言語です。
- Vyperは機能数が絞られているため、アイデアの迅速なプロトタイピングに最適です。
- Vyperは、監査が容易で、人間にとって最大限読みやすいことを目指しています。

### YulとYul+の優れた点 {#yul-advantages}

- シンプルで機能的な低水準言語です。
- 生のEVMに非常に近いレベルで操作できるため、コントラクトのガス使用量を最適化するのに役立ちます。

## 言語の比較 {#language-comparisons}

基本構文、コントラクトのライフサイクル、インターフェース、演算子、データ構造、関数、制御フローなどの比較については、[Auditlessによるチートシート](https://reference.auditless.com/cheatsheet/)を確認してください。

## 参考文献 {#further-reading}

- [オープンツェッペリンによるSolidityコントラクトライブラリ](https://docs.openzeppelin.com/contracts/5.x/)
- [Solidity by Example](https://solidity-by-example.org)