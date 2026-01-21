---
title: "スマートコントラクトライブラリ"
description: "再利用可能なスマートコントラクトのライブラリやビルディングブロックを見つけて、あなたのイーサリアム開発プロジェクトを加速させましょう。"
lang: ja
---

プロジェクト内のすべてのスマートコントラクトを一から書く必要はありません。 利用可能なオープンソースのスマートコントラクトライブラリが多数あり、プロジェクトに再利用可能なビルディングブロックが提供されています。これにより、一からやり直す必要がなくなります。

## 前提条件{#prerequisites}

スマートコントラクトライブラリを使用する前に、スマートコントラクトの構造をよく理解しておくことをお勧めします。 [スマートコントラクトの構造](/developers/docs/smart-contracts/anatomy/)をまだご覧になっていない方は、そちらへお進みください。

## ライブラリの内容 {#whats-in-a-library}

スマートコントラクトライブラリには、通常、2種類のビルディングブロックがあります。コントラクトに追加できる再利用可能な振る舞いと、さまざまな標準の実装です。

### 動作 {#behaviors}

スマートコントラクトを記述していると、コントラクト内の保護された操作を行うために_admin_アドレスを割り当てたり、予期せぬ問題が発生した場合に緊急用の_pause_ボタンを追加したりと、似たようなパターンを何度も書いていることに気づくことが多いでしょう。

スマートコントラクトライブラリは通常、これらの動作の再利用可能な実装を、Solidityの[ライブラリ](https://solidity.readthedocs.io/en/v0.7.2/contracts.html#libraries)として、または[継承](https://solidity.readthedocs.io/en/v0.7.2/contracts.html#inheritance)を介して提供します。

例として、以下に[OpenZeppelin Contractsライブラリ](https://github.com/OpenZeppelin/openzeppelin-contracts)の[`Ownable`コントラクト](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v3.2.0/contracts/access/Ownable.sol)の簡易版を示します。これは、アドレスをコントラクトの所有者として指定し、その所有者のみにメソッドへのアクセスを制限するための修飾子を提供するものです。

```solidity
contract Ownable {
    address public owner;

    constructor() internal {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(owner == msg.sender, "Ownable: 呼び出し元は所有者ではありません");
        _;
    }
}
```

コントラクトでこのようなビルディングブロックを使用するには、最初にインポートしてから自身のコントラクトの中で拡張します。 これにより、元になったOwnableコントラクトによって提供される修飾子を使用して、独自の関数を保護することができます。

```solidity
import ".../Ownable.sol"; // インポートされたライブラリへのパス

contract MyContract is Ownable {
    // 次の関数は所有者のみが呼び出せます
    function secured() onlyOwner public {
        msg.sender.transfer(1 ether);
    }
}
```

もう一つの一般的な例は、[SafeMath](https://docs.openzeppelin.com/contracts/3.x/utilities#math)や[DsMath](https://dappsys.readthedocs.io/en/latest/ds_math.html)です。 これらは (ベースコントラクトとは対照的に) 言語で提供されていないオーバーフローチェック付きの算術関数を提供するライブラリです。 ネイティブの算術演算の代わりに、これらのライブラリのいずれかを使用することで、悲惨な結果をもたらすオーバーフローからコントラクトを守ることをお勧めします。

### 標準 {#standards}

[構成可能性と相互運用性](/developers/docs/smart-contracts/composability/)を促進するために、イーサリアムコミュニティは**ERCs**の形式でいくつかの標準を定義しています。 それらについての詳細は、[標準](/developers/docs/standards/)セクションで読むことができます。

ERCをコントラクトの一部として組み込む場合、独自のERCをロールアウトするよりも、標準の実装を探すことをお勧めします。 最も一般的なERCの実装は、多くのスマートコントラクトライブラリに含まれています。 例えば、広く普及している[ERC20代替可能トークン標準](/developers/tutorials/understand-the-erc-20-token-smart-contract/)は、[HQ20](https://github.com/HQ20/contracts/blob/master/contracts/token/README.md)、[DappSys](https://github.com/dapphub/ds-token/)、[OpenZeppelin](https://docs.openzeppelin.com/contracts/3.x/erc20)にあります。 さらに、ERCによってはERC自体の一部として標準実装を提供することもあります。

特筆すべきは、一部のERCはスタンドアロンではなく、他のERCに機能を追加するものであるということです。 例えば、[ERC2612](https://eips.ethereum.org/EIPS/eip-2612)は、そのユーザビリティを向上させるためにERC20に拡張機能を追加するものです。

## ライブラリの追加方法 {#how-to}

プロジェクトにライブラリを含める具体的な手順については、必ずそのライブラリのドキュメントを参照してください。 いくつかのSolidityコントラクトライブラリは`npm`を使用してパッケージ化されているため、`npm install`でインストールするだけです。 コントラクトを[コンパイル](/developers/docs/smart-contracts/compiling/)するためのほとんどのツールは、`node_modules`でスマートコントラクトライブラリを検索しますので、次のようにできます:

```solidity
// これにより、node_modulesから@openzeppelin/contractsライブラリが読み込まれます
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract MyNFT is ERC721 {
    constructor() ERC721("MyNFT", "MNFT") public { }
}
```

使用するメソッドに関わらず、ライブラリを含める際には、常に[言語](/developers/docs/smart-contracts/languages/)のバージョンに注意してください。 たとえば、Solidity 0.5でコントラクトを書いている場合は、Solidity 0.6のライブラリを使用することはできません。

## 使用する場面 {#when-to-use}

プロジェクトにスマートコントラクトライブラリを使用すると、いくつかの利点があります。 まず第一に、自分でコーディングしなくても、すぐに利用可能でシステムに含めることができるビルディングブロックが提供されるため、作業時間を短縮できます。

セキュリティも大きなプラスです。 また、オープンソースのスマートコントラクトライブラリは、頻繁かつ詳細に調査されます。 多くのプロジェクトがそれらのライブラリに依存していることを考えると、コミュニティには継続的な見直しを行おうとする強い動機があります。 再利用可能なコントラクトライブラリ内よりも、アプリケーションコード内の方が、はるかに高い確率でエラーが見つかります。 ライブラリの中には、セキュリティをさらに強化するために[外部監査](https://github.com/OpenZeppelin/openzeppelin-contracts/tree/master/audits)を受けているものもあります。

ただし、スマートコントラクトライブラリを使用すると、馴染みのないコードをプロジェクトに組み込むリスクが生じます。 コントラクトをインポートして直接プロジェクトに組み込みたいと思うかもしれませんが、そのコントラクトが何をするものなのかをよく理解していないと、気付かないうちにシステム内で予期せぬ動作による問題を生じさせてしまう恐れがあります。 必ずインポートするコードのドキュメントを読んで、そのコード自体を確認してからプロジェクトの一部にするようにしてください。

最後に、ライブラリを含めるかどうかを決定する際には、その全体的な使用法を考慮してください。 広く採用されているものには、より大きなコミュニティとより多くの目で問題が調査されているという利点があります。 スマートコントラクトを使用して構築する場合、セキュリティが最も重視されるべきです。

## 関連ツール {#related-tools}

**OpenZeppelin Contracts -** **_安全なスマートコントラクト開発のための最も人気のあるライブラリ。_**

- [ドキュメント](https://docs.openzeppelin.com/contracts/)
- [GitHub](https://github.com/OpenZeppelin/openzeppelin-contracts)
- [コミュニティフォーラム](https://forum.openzeppelin.com/c/general/16)

**DappSys -** **_スマートコントラクトのための、安全、シンプル、柔軟なビルディングブロック。_**

- [ドキュメント](https://dappsys.readthedocs.io/)
- [GitHub](https://github.com/dapphub/dappsys)

**HQ20 -** **_実世界向けの完全な機能を備えた分散アプリケーションの構築を支援する、コントラクト、ライブラリ、サンプルを含むSolidityプロジェクト。_**

- [GitHub](https://github.com/HQ20/contracts)

**thirdweb Solidity SDK -** **_カスタムスマートコントラクトを効率的に構築するために必要なツールを提供します_**

- [ドキュメント](https://portal.thirdweb.com/contracts/build/overview)
- [GitHub](https://github.com/thirdweb-dev/contracts)

## 関連チュートリアル {#related-tutorials}

- [イーサリアム開発者のためのセキュリティに関する考慮事項](/developers/docs/smart-contracts/security/) _– ライブラリの使用を含め、スマートコントラクトを構築する際のセキュリティに関する考慮事項についてのチュートリアル。_
- [ERC-20トークンスマートコントラクトを理解する](/developers/tutorials/understand-the-erc-20-token-smart-contract/) _-複数のライブラリで提供されている、ERC20標準に関するチュートリアル。_

## 参考リンク{#further-reading}

_役に立つコミュニティリソースを知っていますか? Edit this page and add it!_
