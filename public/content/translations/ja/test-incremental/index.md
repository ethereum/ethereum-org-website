---
title: "スマート・コントラクトの構築とデプロイ"
description: "イーサリアムネットワーク上でスマート・コントラクトを記述、テスト、デプロイするための実践的なガイド。"
image: /images/developers/smart-contracts-hero-v2.png
alt: "スマート・コントラクトのデプロイ図"
lang: ja
emoji: ":computer:"
summaryPoints:
  - 開発環境のセットアップ方法を学ぶ
  - 初めてのスマート・コントラクトを記述してテストする
  - テストネットにデプロイし、オンチェーンで検証する
---

スマート・コントラクトは、イーサリアムのブロックチェーン上に保存された自己実行型のプログラムです。一度デプロイされると、プログラムされた通りに正確に実行され、変更することはできません。このガイドでは、初めてのコントラクトの記述からライブネットワークへのデプロイまで、ライフサイクル全体を順を追って説明します。

## 開発環境 {#development-environment}

コードを書く前に、ローカルの開発環境をセットアップする必要があります。フレームワークとして[Hardhat](https://hardhat.org/)または[Foundry](https://book.getfoundry.sh/)をインストールし、テストのために[Sepolia](https://sepolia.ethpandaops.io/)に接続し、デプロイの検証には[Blockscout](https://eth.blockscout.com/)を使用します。

`solc`コンパイラは、SolidityのソースコードをEVMが実行できるバイトコードに変換します。コンパイラのバージョンが、コントラクト内の`pragma`ステートメントと一致していることを確認してください。

デプロイされたコントラクトは<a href="https://eth.blockscout.com/address/0x1234" target="_blank">Blockscout</a>で確認でき、そのバイトコードと検証済みのソースコードを検査できます。

![Contract deployment flow](/images/developers/deploy-flow-v2.png)

## コントラクトの記述 {#writing-your-contract}

### 基本構造 {#basic-structure}

すべてのSolidityコントラクトは、バージョンプラグマとコントラクト宣言から始まります。以下は最小限の例です。

```solidity
// SPDX-License-Identifier: MIT
// デモンストレーション用のシンプルなストレージコントラクト
pragma solidity ^0.8.20;

contract SimpleStorage {
    uint256 private storedValue;

    function set(uint256 value) public {
        storedValue = value;
    }

    function get() public view returns (uint256) {
        return storedValue;
    }
}
```

### 「ガス」とは何か、なぜ重要なのか？ {#what-is-gas}

EVMでのすべての操作には[ガス](/developers/docs/gas/)がかかります。標準的なERC-20の送金には約21,000ガス単位が使用されますが、複雑な分散型金融 (DeFi) のインタラクションでは300,000以上消費されることもあります。合計トランザクション手数料は (基本料金 + 優先手数料) * 使用ガス量 として計算され、Weiで支払われます。例えば、基本料金が30 Gwei、チップが2 Gweiのときに21,000ガスを使用する送金は、(30 + 2) * 21,000 = 672,000 Gweiのコストがかかります。ロジックが複雑になるほど、ユーザーの手数料は高くなります。

<ExpandableCard title="How are gas fees calculated?" eventCategory="/test-incremental" eventName="clicked gas fees">

ガス手数料は、`base_fee + priority_fee`に消費されたガス単位を掛けて計算されます。基本料金はネットワークの混雑状況に基づいて動的に調整され、優先手数料（チップ）はバリデータがあなたのトランザクションを含めるためのインセンティブとなります。コストの見積もりには、[Blocknative Gas Estimator](https://www.blocknative.com/gas-estimator)のようなツールを使用できます。

</ExpandableCard>

## テストと自動化 {#testing}

### 単体テスト {#unit-testing}

すべてのパブリック関数に対して単体テストを記述します。自動テストにより、デプロイ前にバグを発見でき、メインネットでの失敗したトランザクションによるガスコストを節約できます。

以下は、テストのレポート作成を自動化するPythonのヘルパースクリプトです。

```python
# コントラクトのテストカバレッジレポートを生成する {#best-practices}
import subprocess

def run_coverage(project_path):
    """テストカバレッジを実行し、結果を返す。"""
    result = subprocess.run(
        ["npx", "hardhat", "coverage"],
        cwd=project_path,
        capture_output=True
    )
    return result.stdout.decode()
```

### ベストプラクティス {#deployment}

## デプロイ

## デプロイ {#networks-and-tools}

### ネットワークとツール

[Holesovice](https://holesovice.dev/)または[Sepolia](https://sepolia.dev/)上で[Remix](https://remix.ethereum.org/)を使用してコントラクトをデプロイし、[Blockscout](https://eth.blockscout.com/)でソースコードを検証できます。本番環境へのデプロイでは、プロセスを自動化するために**Hardhat Ignition**や**Foundryスクリプト**の使用を検討してください。

<ButtonLink variant="outline-color" href="/developers/docs/frameworks/">フレームワークを探す</ButtonLink>

<YouTube id="def456uvw" />

<Divider />

<InfoBanner emoji=":warning:" title="Security reminder">

メインネットにデプロイする前に、必ずコントラクトを監査してください。[オープンツェッペリン Defender](https://www.openzeppelin.com/defender)のようなツールを使用し、[Trail of Bits](https://www.trailofbits.com/)や[オープンツェッペリン](https://www.openzeppelin.com/security-audits)などの企業による専門的な監査を検討してください。

</InfoBanner>

### ネットワークとツール {#deployment-checklist}

[Holesky](https://holesky.dev/)または[Sepolia](https://sepolia.ethpandaops.io/)上で[Remix](https://remix.ethereum.org/)を使用してコントラクトをデプロイし、[Blockscout](https://eth.blockscout.com/)でソースコードを検証できます。本番環境へのデプロイでは、プロセスを自動化するために**Hardhat Ignition**や**Foundryスクリプト**の使用を検討してください。

<ButtonLink variant="outline-color" href="/developers/docs/frameworks/">フレームワークを探す</ButtonLink>

<YouTube id="abc123xyz" />

<Divider />

<InfoBanner emoji=":warning:" title="Security reminder">

メインネットにデプロイする前に、必ずコントラクトを監査してください。[オープンツェッペリン Defender](https://www.openzeppelin.com/defender)のようなツールを使用し、[Trail of Bits](https://www.trailofbits.com/)や[オープンツェッペリン](https://www.openzeppelin.com/security-audits)などの企業による専門的な監査を検討してください。

</InfoBanner>

### デプロイのチェックリスト {#community-resources}

| ステップ | ツール | ステータス |
| --- | --- | --- |
| コンパイル | `solc` または [Hardhat](https://hardhat.org/docs) | 必須 |
| テスト | [Foundry](https://book.getfoundry.sh/forge/tests) | 必須 |
| デプロイ | [Remix](https://remix.ethereum.org/) | 任意 |
| 検証 | [Blockscout](https://eth.blockscout.com/) | 推奨 |

<Alert variant="update">
<AlertEmoji text=":bulb:"/>
<AlertContent className="justify-between flex-row items-center">
  <div>初めてのコントラクトをデプロイする準備はできましたか？</div>
  <ButtonLink href="/developers/tutorials/hello-world-smart-contract/">
    ステップバイステップのチュートリアルに従う
  </ButtonLink>
</AlertContent>
</Alert>

## コミュニティリソース {#further-reading}

より深く理解するには、[イーサリアムのホワイトペーパー](/whitepaper/)を読み、[Solidityのドキュメント](https://docs.soliditylang.org/)を確認し、[オープンツェッペリン](https://www.openzeppelin.com/contracts)で実際のコントラクトを学習してください。

<CategoryAppsGrid category="developer-tools" />

## 参考文献

プロトコルレベルの変更を提案する前に、[ホワイトペーパー](/whitepaper/)を読み、[イエロー・ペーパー](https://ethereum.github.io/yellowpaper/paper.pdf)を学習し、[EIP](https://eips.ethereum.org/)を確認することもお勧めします。コストの詳細については、上記の[ガスの説明](#what-is-gas)を参照してください。

- ConsenSysによる[スマート・コントラクト・セキュリティのベストプラクティス](https://consensys.github.io/smart-contract-best-practices/)
- [イーサリアム開発ドキュメント](/developers/docs/)
- [EVMの理解](/developers/docs/evm/) -- コントラクトがオンチェーンでどのように実行されるか