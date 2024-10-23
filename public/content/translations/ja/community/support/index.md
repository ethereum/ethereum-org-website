---
title: イーサリアムサポート
description: イーサリアムエコシステムにおけるサポート
lang: ja
---

# イーサリアムサポート {#support}

## イーサリアムの公式サポート {#official-support}

イーサリアムの公式サポートをお探しの場合は、まず始めに、 イーサリアムは非集中的な分散型であるということをご理解ください。 イーサリアムは、中央組織、団体、または個人により所有されていないため、公式のサポートチャンネルはありません。

「イーサリアムの公式サポート」を称する人物は、詐欺であるおそれがあります。このため、イーサリアムの分散型の性質をご理解ください。 詐欺師から身を守るには、自分自身で学び、セキュリティを真剣に受け止めることが何よりも大切です。

<DocLink href="/security/">
  イーサリアムのセキュリティと詐欺対策
</DocLink>

<DocLink href="/learn/">
  イーサリアムの基礎知識を学ぶ
</DocLink>

公式サポートはありませんが、イーサリアムエコシステム全体で多くのグループ、コミュニティ、およびプロジェクトからサポートを受けることができます。このページに有用な情報やリソースを記載していますので、ご確認ください。 ご質問やご不明点がある場合は、 [ethereum.org Discord](/discord/)に参加すると、サポートできることがあると思います。

## よくある質問 {#faq}

### 間違ったウォレットにETHを誤送信してしまいましたが、どうすれば良いですか？ {#wrong-wallet}

イーサリアムで送信されたトランザクションはもとに戻すことはできません。 間違ったウォレットにETHを送信してしまった場合、残念ながら、これらの資金を回収する方法はありません。 イーサリアムは、中央組織、団体、個人により所有されていないため、誰もトランザクションを取り消すことができません。 そのため、必ず送信前に細心の注意を払って、ダブルチェックを行ってください。

### イーサリアムのプレゼントはどのように請求すれば良いですか？ {#giveaway-scam}

イーサリアムをプレゼントするというものは、ETHを盗もうと企てる詐欺です。 うま過ぎる話しには騙されないでください。プレゼントを受け取ろうと、相手先のアドレスにETHを送金してしまった場合、プレゼントはもらえず、自分の資金を回収することもできません。

[詐欺防止に関する詳細](/security/#common-scams)

### トランザクションが処理されず、止まってしまっていますがどうすれば良いですか？ {#stuck-transaction}

イーサリアムのトランザクションは、必要とされるよりも低いトランザクションフィーを提示した場合、ネットワークの需要により、トランザクションが保留になってしまうことがあります。 多くのウォレットは、トランザクションが処理されるよう、トランザクションフィーの金額を上げて、同一トランザクションを再送信するオプションがあります。 もしくは、自分のアドレスにトランザクションを送信し、保留中のトランザクションと同じノンス (nonce)を使用することで、保留中のトランザクションをキャンセルすることができます。

[MetaMaskのトランザクションを高速化またはキャンセルする方法](https://metamask.zendesk.com/hc/en-us/articles/360015489251-How-to-speed-up-or-cancel-a-pending-transaction)

[保留中のイーサリアムのトランザクションをキャンセルする方法](https://info.etherscan.com/how-to-cancel-ethereum-pending-transactions/)

### イーサリアムのマイニング方法を教えてください {#mining-ethereum}

イーサリアムのマイニングはできなくなりました。 イーサリアムの[プルーフ・オブ・ワーク](/glossary/#pow)から[プルーフ・オブ・ステーク](/glossary/#pos)への移行に伴い、マイニングは停止されました。 現在は、マイナーの代わりとなるバリデータが活躍しており、 誰でもETHを[ステーキング](/glossary/#staking)することができ、ステーキング報酬はバリデータソフトウェアを立ち上げて、ネットワークのセキュリティを確保することで受け取れます。

### ステーカーになる/バリデータを立ち上げる方法は？ {#how-to-stake}

バリデータになるには、イーサリアムのデポジットコントラクトに32ETHをステーキングし、バリデータノードを設定する必要があります。 詳細については、[ステーキングのページ](/staking)と[ステーキングランチパッド](https://launchpad.ethereum.org/)をご覧ください。

## 分散型アプリ(Dapp)の開発 {#building-support}

開発では問題にぶち当たることもあります。 下記は、経験豊富なイーサリアムデベロッパーがいる、開発に特化したスペースです。

- [Alchemy University](https://university.alchemy.com/#starter_code)
- [CryptoDevs discord](https://discord.com/invite/5W5tVb3)
- [Ethereum StackExchange](https://ethereum.stackexchange.com/)
- [StackOverflow](https://stackoverflow.com/questions/tagged/web3)
- [Web3 University](https://www.web3.university/)
- [LearnWeb3](https://discord.com/invite/learnweb3)

また、[イーサリアムデベロッパー向けリソース](/developers/)セクションには、ドキュメントや開発ガイドが掲載されています。

### ツール {#dapp-tooling}

ご質問が特定のツール、プロジェクト、ライブラリに関するものの場合は、 ほとんどのプロジェクトで、サポート専用のチャットサーバやフォーラムが用意されています。

下記は人気があるものの例です。

- [Solidity](https://gitter.im/ethereum/solidity)
- [ethers.js](https://discord.gg/6jyGVDK6Jx)
- [web3.js](https://discord.gg/GsABYQu4sC)
- [Hardhat](https://discord.gg/xtrMGhmbfZ)
- [Alchemy](http://alchemy.com/discord)
- [Tenderly](https://discord.gg/fBvDJYR)

## ノードの運用 {#node-support}

ノードを実行している場合やバリデータの方は、下記のコミュニティでサポートを受けることができます。

- [EthStaker discord](https://discord.gg/ethstaker)
- [EthStaker reddit](https://www.reddit.com/r/ethstaker)

イーサリアムクライアントを構築しているチームの大半は、サポートを受けたり質問したりできる専用のパブリックスペースを持っています。

### 実行クライアント {#execution-clients}

- [Geth](https://discord.gg/FqDzupGyYf)
- [Nethermind](https://discord.gg/YJx3pm8z5C)
- [Besu](https://discord.gg/p8djYngzKN)
- [Erigon](https://github.com/ledgerwatch/erigon/issues)
- [Reth](https://github.com/paradigmxyz/reth/discussions)

### コンセンサスクライアント {#consensus-clients}

- [Prysm](https://discord.gg/prysmaticlabs)
- [Nimbus](https://discord.gg/nSmEH3qgFv)
- [Lighthouse](https://discord.gg/cyAszAh)
- [Teku](https://discord.gg/7hPv2T6)
- [Lodestar](https://discord.gg/aMxzVcr)

また、[ノードの運用方法についてはこちら](/developers/docs/nodes-and-clients/run-a-node/)をご覧ください。
