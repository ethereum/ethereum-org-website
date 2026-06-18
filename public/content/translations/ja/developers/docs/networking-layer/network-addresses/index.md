---
title: ネットワークアドレス
description: ネットワークアドレスの概要。
lang: ja
sidebarDepth: 2
---

[イーサリアム](/)のノードは、ピアに接続するために、いくつかの基本情報を使用して自身を識別する必要があります。潜在的なピアがこの情報を確実に解釈できるように、情報はイーサリアムのノードが理解できる3つの標準化されたフォーマット（multiaddr、enode、またはEthereum Node Records (ENR)）のいずれかで中継されます。ENRは、イーサリアムのネットワークアドレスの現在の標準です。

## 前提条件 {#prerequisites}

このページを理解するには、イーサリアムの[ネットワーキングレイヤー](/developers/docs/networking-layer/)についてある程度理解している必要があります。

## Multiaddr {#multiaddr}

イーサリアムのノードアドレスの元のフォーマットは、「multiaddr」（「multi-addresses」の略）でした。Multiaddrは、ピア・ツー・ピアネットワーク用に設計されたユニバーサルフォーマットです。アドレスはキーと値のペアとして表され、キーと値はスラッシュで区切られます。たとえば、IPv4アドレスが`192.168.22.27`でTCPポート`33000`をリッスンしているノードのmultiaddrは次のようになります。

`/ip4/192.168.22.27/tcp/33000`

イーサリアムのノードの場合、multiaddrにはノードID（公開鍵のハッシュ）が含まれます。

`/ip4/192.168.22.27/tcp/33000/p2p/5t7Nv7dG2d6ffbvAiewVsEwWweU3LdebSqX2y1bPrW8br`

## Enode {#enode}

enodeは、URLアドレスフォーマットを使用してイーサリアムのノードを識別する方法です。16進数のノードIDは、URLのユーザー名部分にエンコードされ、@記号を使用してホストから区切られます。ホスト名はIPアドレスとしてのみ指定でき、DNS名は許可されていません。ホスト名セクションのポートは、TCPリスニングポートです。TCPポートとUDP（ディスカバリー）ポートが異なる場合、UDPポートはクエリパラメータ「discport」として指定されます。

次の例では、ノードURLは、IPアドレスが`10.3.58.6`、TCPポートが`30303`、UDPディスカバリーポートが`30301`のノードを記述しています。

`enode://6f8a80d14311c39f35f516fa664deaaaa13e85b2f7493f37f6144d86991ec012937307647bd3b9a82abe2974e1407241d54947bbb39763a4cac9f77166ad92a0@10.3.58.6:30303?discport=30301`

## Ethereum Node Records (ENR) {#enr}

Ethereum Node Records (ENR)は、イーサリアム上のネットワークアドレスの標準化されたフォーマットです。これらはmultiaddrやenodeに代わるものです。ノード間でより多くの情報交換を可能にするため、特に有用です。ENRには、署名、シーケンス番号、および署名の生成と検証に使用されるIDスキームを詳述するフィールドが含まれています。また、ENRには、キーと値のペアとして編成された任意のデータを入力することもできます。これらのキーと値のペアには、ノードのIPアドレスと、ノードが使用できるサブプロトコルに関する情報が含まれます。コンセンサスクライアントは、[特定のENR構造](https://github.com/ethereum/consensus-specs/blob/master/specs/phase0/p2p-interface.md#enr-structure)を使用してブートノードを識別し、現在のイーサリアムのフォークとアテステーションゴシップサブネット（これにより、アテステーションが一緒に集約される特定のピアのセットにノードが接続されます）に関する情報を含む`eth2`フィールドも含みます。

## 参考文献 {#further-reading}

- [EIP-778: Ethereum Node Records (ENR)](https://eips.ethereum.org/EIPS/eip-778)
- [libp2p: Multiaddr-Enode-ENR?!](https://consensys.net/diligence/blog/2020/09/libp2p-multiaddr-enode-enr/)