---
title: スマート・コントラクトのライブラリ
description: イーサリアムの開発プロジェクトを加速させる、再利用可能なスマート・コントラクトのライブラリとビルディング・ブロックについて学びます。
lang: ja
---

プロジェクト内のすべてのスマート・コントラクトをゼロから記述する必要はありません。プロジェクトで再利用可能なビルディング・ブロックを提供するオープンソースのスマート・コントラクトのライブラリが多数公開されており、車輪の再発明を避けることができます。

## 前提条件 {#prerequisites}

スマート・コントラクトのライブラリについて詳しく見る前に、スマート・コントラクトの構造をよく理解しておくことをお勧めします。まだ読んでいない場合は、[スマート・コントラクトの構造](/developers/docs/smart-contracts/anatomy/)をご覧ください。

## ライブラリの内容 {#whats-in-a-library}

スマート・コントラクトのライブラリには、通常、コントラクトに追加できる再利用可能な動作と、さまざまな標準規格の実装という2種類のビルディング・ブロックが含まれています。

### 動作 {#behaviors}

スマート・コントラクトを記述する際、コントラクト内で保護された操作を実行するための_管理者_アドレスを割り当てたり、予期しない問題が発生した場合に備えて緊急の_一時停止_ボタンを追加したりするなど、同じようなパターンを何度も記述することになる可能性が高くなります。

スマート・コントラクトのライブラリは通常、これらの動作の再利用可能な実装を、Solidityの[ライブラリ](https://solidity.readthedocs.io/en/v0.7.2/contracts.html#libraries)として、または[継承](https://solidity.readthedocs.io/en/v0.7.2/contracts.html#inheritance)を通じて提供します。

例として、以下は[オープンツェッペリンのContractsライブラリ](https://github.com/OpenZeppelin/openzeppelin-contracts)にある[`Ownable`コントラクト](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v3.2.0/contracts/access/Ownable.sol)の簡易版です。これは、あるアドレスをコントラクトの所有者として指定し、メソッドへのアクセスをその所有者のみに制限するための修飾子(modifier)を提供します。

```solidity
contract Ownable {
    address public owner;

    constructor() internal {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(owner == msg.sender, "Ownable: caller is not the owner");
        _;
    }
}
```

このようなビルディング・ブロックをコントラクトで使用するには、まずそれをインポートし、独自のコントラクトで拡張(継承)する必要があります。これにより、ベースとなる`Ownable`コントラクトによって提供される修飾子を使用して、独自の関数を保護できるようになります。

```solidity
import ".../Ownable.sol"; // インポートされたライブラリへのパス

contract MyContract is Ownable {
    // 以下の関数はオーナーのみが呼び出すことができます
    function secured() onlyOwner public {
        msg.sender.transfer(1 ether);
    }
}
```

もう1つの有名な例は、[SafeMath](https://docs.openzeppelin.com/contracts/3.x/utilities#math)や[DsMath](https://dappsys.readthedocs.io/en/latest/ds_math.html)です。これらは(ベースとなるコントラクトとは対照的に)言語自体では提供されていない、オーバーフロー・チェック付きの算術関数を提供するライブラリです。壊滅的な結果をもたらす可能性のあるオーバーフローからコントラクトを保護するために、ネイティブの算術演算の代わりにこれらのライブラリのいずれかを使用することをお勧めします。

### 標準規格 {#standards}

[コンポーザビリティとインターオペラビリティ](/developers/docs/smart-contracts/composability/)を促進するために、イーサリアムコミュニティは**ERC**という形でいくつかの標準規格を定義しています。詳細については、[標準規格](/developers/docs/standards/)のセクションをご覧ください。

コントラクトの一部としてERCを含める場合、独自の実装を作成しようとするよりも、標準的な実装を探すことをお勧めします。多くのスマート・コントラクトのライブラリには、最も人気のあるERCの実装が含まれています。たとえば、広く普及している[ERC-20代替可能トークン標準](/developers/tutorials/understand-the-erc-20-token-smart-contract/)は、[HQ20](https://github.com/HQ20/contracts/blob/master/contracts/token/README.md)、[DappSys](https://github.com/dapphub/ds-token/)、および[オープンツェッペリン](https://docs.openzeppelin.com/contracts/3.x/erc20)にあります。さらに、一部のERCは、ERC自体の一部として標準的な実装を提供しています。

一部のERCは独立したものではなく、他のERCへの追加機能であることにも言及しておく価値があります。たとえば、[ERC-2612](https://eips.ethereum.org/EIPS/eip-2612)は、使いやすさを向上させるための拡張機能をERC-20に追加します。

## ライブラリの追加方法 {#how-to}

プロジェクトにライブラリを含めるための具体的な手順については、常にそのライブラリのドキュメントを参照してください。いくつかのSolidityコントラクトのライブラリは`npm`を使用してパッケージ化されているため、単に`npm install`するだけで済みます。コントラクトを[コンパイル](/developers/docs/smart-contracts/compiling/)するためのほとんどのツールは、スマート・コントラクトのライブラリを探すために`node_modules`を参照するため、次のように記述できます。

```solidity
// これにより、node_modules から @openzeppelin/contracts ライブラリが読み込まれます
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract MyNFT is ERC721 {
    constructor() ERC721("MyNFT", "MNFT") public { }
}
```

どの方法を使用する場合でも、ライブラリを含める際は常に[言語](/developers/docs/smart-contracts/languages/)のバージョンに注意してください。たとえば、Solidity 0.5でコントラクトを記述している場合、Solidity 0.6用のライブラリを使用することはできません。

## 使用するタイミング {#when-to-use}

プロジェクトでスマート・コントラクトのライブラリを使用することには、いくつかの利点があります。何よりもまず、自分でコーディングする代わりに、システムに組み込むことができるすぐに使えるビルディング・ブロックが提供されるため、時間を節約できます。

セキュリティも大きな利点です。オープンソースのスマート・コントラクトのライブラリは、多くの場合、厳密に精査されています。多くのプロジェクトがそれらに依存しているため、コミュニティには常にレビューを続ける強い動機があります。再利用可能なコントラクトのライブラリよりも、アプリケーションのコードでエラーが見つかることの方がはるかに一般的です。一部のライブラリは、セキュリティをさらに高めるために[外部監査](https://github.com/OpenZeppelin/openzeppelin-contracts/tree/master/audits)も受けています。

ただし、スマート・コントラクトのライブラリを使用すると、使い慣れていないコードをプロジェクトに含めるリスクが伴います。コントラクトをインポートしてプロジェクトに直接組み込みたくなりますが、そのコントラクトが何を行うかを十分に理解していないと、予期しない動作によってシステムに意図せず問題を発生させる可能性があります。インポートするコードのドキュメントを必ず読み、コード自体をレビューしてからプロジェクトの一部にしてください。

最後に、ライブラリを含めるかどうかを決定する際は、その全体的な使用状況を考慮してください。広く採用されているライブラリには、より大きなコミュニティがあり、問題がないかチェックする目が多くなるという利点があります。スマート・コントラクトを構築する際は、セキュリティを最優先事項とする必要があります。

## 関連ツール {#related-tools}

**オープンツェッペリン Contracts -** **_安全なスマート・コントラクト開発のための最も人気のあるライブラリです。_**

- [ドキュメント](https://docs.openzeppelin.com/contracts/)
- [GitHub](https://github.com/OpenZeppelin/openzeppelin-contracts)
- [コミュニティフォーラム](https://forum.openzeppelin.com/c/general/16)

**DappSys -** **_スマート・コントラクトのための安全でシンプル、かつ柔軟なビルディング・ブロックです。_**

- [ドキュメント](https://dappsys.readthedocs.io/)
- [GitHub](https://github.com/dapphub/dappsys)

**HQ20 -** **_現実世界向けのフル機能の分散型アプリケーションを構築するのに役立つコントラクト、ライブラリ、および例を備えたSolidityプロジェクトです。_**

- [GitHub](https://github.com/HQ20/contracts)

**thirdweb Solidity SDK -** **_カスタムのスマート・コントラクトを効率的に構築するために必要なツールを提供します。_**

- [ドキュメント](https://portal.thirdweb.com/contracts/build/overview)
- [GitHub](https://github.com/thirdweb-dev/contracts)

## 関連チュートリアル {#related-tutorials}

- [イーサリアム開発者のためのセキュリティの考慮事項](/developers/docs/smart-contracts/security/) _– ライブラリの使用を含む、スマート・コントラクトを構築する際のセキュリティの考慮事項に関するチュートリアルです。_
- [ERC-20トークンのスマート・コントラクトを理解する](/developers/tutorials/understand-the-erc-20-token-smart-contract/) _- 複数のライブラリによって提供されるERC-20標準に関するチュートリアルです。_

## 参考文献 {#further-reading}

_役に立つコミュニティリソースをご存知ですか? このページを編集して追加してください!_