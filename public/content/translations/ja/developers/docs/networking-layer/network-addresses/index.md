---
title: ネットワークアドレス
description: ネットワークアドレス入門
lang: ja
sidebarDepth: 2
---

イーサリアムノードがピアに接続するには、いくつかの基本情報で自分自身を識別する必要があります。 潜在的なピアがこの情報を解釈できるようにするため、イーサリアムノードが理解できる 3 つの標準化されたフォーマット(multiaddr、enode、イーサリアム・ノード・レコード(ENR))のいずれかで伝えられます。 なお、イーサリアム・ノード・レコード(ENR)はイーサリアム・ネットワークアドレスの現在の標準です。

## 前提知識 {#prerequisites}

このページを理解するためには、イーサリアムの [ネットワークレイヤー](/developers/docs/networking-layer/) についてある程度理解している必要があります。

## マルチアドレス(Multiaddr) {#multiaddr}

元々、イーサリアムノードのアドレス形式は「multiaddr」(マルチアドレスの略)でした。 Multiaddr は、ピアツーピアネットワーク用に設計された汎用フォーマットです。 アドレスは、キーと値をスラッシュで区切った key-value のペアで表現されます。 例えば、IPv4 アドレス`192.168.22.27`で TCP ポート`33000`をリッスンしているノードの multiaddr は、次のようになります。

`/ip4/192.168.22.27/tcp/33000`

イーサリアムノードの場合、multiaddr にノード ID(公開鍵のハッシュ値)が含まれます。

`/ip4/192.168.22.27/tcp/33000/p2p/5t7Nv7dG2d6ffbvAiewVsEwWweU3LdebSqX2y1bPrW8br`

## enode {#enode}

enode とは、URL アドレス形式を用いたイーサリアムノードの識別方法です。 16 進数のノード ID は、URL のユーザーネーム部分がエンコードされ、@記号を用いてホストと区切られます。 ホスト名には IP アドレスのみを指定することができ、DNS 名は指定できません。 ホスト名セクションのポートは、TCP リスニングポートです。 TCP ポートと UDP(ディスカバリー)ポートが異なる場合は、UDP ポートをクエリパラメータ 「discport 」で指定します。

次の例では、ノード URL は IP アドレス`10.3.58.6`、TCP ポート`30303`、UDP ディスカバリーポート `30301`のノードを記述しています。

`enode://6f8a80d14311c39f35f516fa664deaaaa13e85b2f7493f37f6144d86991ec012937307647bd3b9a82abe2974e1407241d54947bbb39763a4cac9f77166ad92a0@10.3.58.6:30303?discport=30301`

## イーサリアム・ノード・レコード(ENR) {#enr}

イーサリアム・ノード・レコード(ENR) は、イーサリアム 上のネットワークアドレス用に標準化されたフォーマットです。 ENR は、multiaddr と enode に取って代わるものです。 ENR はノード間でより大きな情報交換を可能にするため、特に有用です。 ENR には署名、シーケンス番号、および署名の生成と検証に使用される ID スキームの詳細を示すフィールドが含まれます。 ENR には、key-value ペアとして編成された任意のデータを入力することも可能です。 これらの key-value ペアには、ノードの IP アドレスと、ノードが使用できるサブプロトコルの情報が含まれています。 コンセンサスクライアントは、ブートノードを特定するために [固有の ENR 構造](https://github.com/ethereum/consensus-specs/blob/dev/specs/phase0/p2p-interface.md#enr-structure)を使用し、現在のイーサリアムフォークとアテステーション(認証)ゴシップサブネットに関する情報を含む`eth2`フィールドを含みます(これにより、アテステーションが集約されている特定のピアセットにノードを接続します)。

## 参考文献 {#further-reading}

[EIP-778: イーサリアム・ノード・レコード(ENR)](https://eips.ethereum.org/EIPS/eip-778) [イーサリアムにおけるネットワークアドレス](https://dean.eigenmann.me/blog/2020/01/21/network-addresses-in-ethereum/) [LibP2P: Multiaddr-Enode-ENR?!](https://consensys.net/diligence/blog/2020/09/libp2p-multiaddr-enode-enr/)
