---
title: トランザクション
description: イーサリアムトランザクションの概要 - 仕組み、データ構造、およびアプリケーションを介したトランザクションの送信方法
lang: ja
---

トランザクションは、アカウントから暗号的に署名された命令のことを意味します。 アカウントはトランザクションを開始し、イーサリアムネットワークの状態を更新します。 最も単純なトランザクションは、あるアカウントから別のアカウントにETHを転送することです。

## 前提知識 {#prerequisites}

このページの理解を深めるために、事前に[アカウント](/developers/docs/accounts/)と[イーサリアム入門](/developers/docs/intro-to-ethereum/)を読むことをお勧めします。

## トランザクションとは {#whats-a-transaction}

イーサリアムトランザクションとは、コントラクトではなく人間によって管理されたアカウントである外部所有アカウント(EOA)によって開始されたアクションを指します。 例えば、BobがAliceに1 ETHを送信するとしましょう。Bobのアカウントから1 ETH引き落とされ、Aliceのアカウントに振り込みされなければなりません。 この状態の変更はトランザクション内で実行されます。

![状態の変化を起こすトランザクション図](./tx.png) _ [イーサリアムEVM](https://takenobu-hs.github.io/downloads/ethereum_evm_illustrated.pdf)からの図解_

EVMの状態を変更するトランザクションは、ネットワーク全体にブロードキャストされる必要があります。 すべてのノードは、EVMで実行されるトランザクションのリクエストをブロードキャストできます。 この後、バリデータがトランザクションを実行し、結果の状態の変更をネットワークに伝播します。

トランザクションにはフィー(手数料)が必要で、検証されたブロックに含まれる必要があります。 この概要を簡単にするために、ガス代と検証については別のページで取り上げます。

送信されたトランザクションには次の情報が含まれます。

- `from` – 送信者のアドレス。送信者はトランザクションに署名します。 コントラクトアカウントは、トランザクションを送信できません。そのため、外部所有のアカウントとなります。
- `to` – 受信アドレス(外部所有アカウントの場合、トランザクションは値を転送します。 コントラクトアカウントの場合、トランザクションはコントラクトコードを実行します。)
- `signature` – 送信者の識別子。 送信者の秘密鍵がトランザクションに署名し、送信者がこのトランザクションを承認したときに生成されます。
- `nonce` - 連続的に増加するカウンターで、アカウントから送信されるトランザクション番号を示します。
- `value` – 送信者から受信者に送金するETHの量(WEI単位: 1ETHは1e+18weiと等価)。
- `input data` – 任意のデータを含むオプションのフィールド。
- `gasLimit` – トランザクションで消費できるガスユニットの最大量。 [EVM](/developers/docs/evm/opcodes)が各計算ステップで必要なガス単位を指定します。
- `maxPriorityFeePerGas` - バリデータへのチップとして含める際に消費されるガス代の上限。
- `maxFeePerGas` - トランザクションに対して支払う用意があるガス単位あたりの最大手数料(`baseFeePerGas`と`maxPriorityFeePerGas`を含む)

ガスとは、バリデータのトランザクションに必要な計算を意味します。 ユーザーはこの計算に手数料を支払う必要があります。 `gasLimit`と`maxPriorityFeePerGas` はバリデータに支払われるトランザクションフィーの上限を決定します。 [ガスの詳細](/developers/docs/gas/)

トランザクションオブジェクトは次のようになります。

```js
{
  from: "0xEA674fdDe714fd979de3EdF0F56AA9716B898ec8",
  to: "0xac03bb73b6a9e108530aff4df5077c2b3d481e5a",
  gasLimit: "21000",
  maxFeePerGas: "300",
  maxPriorityFeePerGas: "10",
  nonce: "0",
  value: "10000000000"
}
```

しかし、トランザクションオブジェクトは送信者の秘密鍵を使って署名する必要があります。 これは、トランザクションが送信者からのみ行われ、不正に送信されなかったことを証明するものです。

Gethのようなイーサリアムクライアントは、この署名プロセスを処理します。

[JSON-RPC](/developers/docs/apis/json-rpc)呼び出しの例:

```json
{
  "id": 2,
  "jsonrpc": "2.0",
  "method": "account_signTransaction",
  "params": [
    {
      "from": "0x1923f626bb8dc025849e00f99c25fe2b2f7fb0db",
      "gas": "0x55555",
      "maxFeePerGas": "0x1234",
      "maxPriorityFeePerGas": "0x1234",
      "input": "0xabcd",
      "nonce": "0x0",
      "to": "0x07a565b7ed7d7a678680a4c162885bedbb695fe0",
      "value": "0x1234"
    }
  ]
}
```

応答例:

```json
{
  "jsonrpc": "2.0",
  "id": 2,
  "result": {
    "raw": "0xf88380018203339407a565b7ed7d7a678680a4c162885bedbb695fe080a44401a6e4000000000000000000000000000000000000000000000000000000000000001226a0223a7c9bcf5531c99be5ea7082183816eb20cfe0bbc322e97cc5c7f71ab8b20ea02aadee6b34b45bb15bc42d9c09de4a6754e7000908da72d48cc7704971491663",
    "tx": {
      "nonce": "0x0",
      "maxFeePerGas": "0x1234",
      "maxPriorityFeePerGas": "0x1234",
      "gas": "0x55555",
      "to": "0x07a565b7ed7d7a678680a4c162885bedbb695fe0",
      "value": "0x1234",
      "input": "0xabcd",
      "v": "0x26",
      "r": "0x223a7c9bcf5531c99be5ea7082183816eb20cfe0bbc322e97cc5c7f71ab8b20e",
      "s": "0x2aadee6b34b45bb15bc42d9c09de4a6754e7000908da72d48cc7704971491663",
      "hash": "0xeba2df809e7a612a0a0d444ccfa5c839624bdc00dd29e3340d46df3870f8a30e"
    }
  }
}
```

- `raw`は、[再帰長プレフィックス(RLP)](/developers/docs/data-structures-and-encoding/rlp)エンコード形式の署名されたトランザクション
- `tx`はJSON形式の署名されたトランザクション

署名ハッシュでトランザクションが送信者から送信され、ネットワークに送信されたことを暗号的に証明することができます。

### データ(data)フィールド {#the-data-field}

大多数のトランザクションは、外部所有アカウント(EOA)からコントラクトにアクセスします。 コントラクトの多くはSolidityで書かれ、 [アプリケーションバイナリインターフェイス (ABI)](/glossary/#abi)に従ってデータフィールドを解釈します。

最初の4バイトは、関数の名前と引数のハッシュを使用して、どの関数を呼び出すかを指定します。 [このデータベース](https://www.4byte.directory/signatures/)を使用して、セレクターから関数を識別することができます。

残りのコールデータ(calldata)は [ABI仕様でエンコードされた](https://docs.soliditylang.org/en/latest/abi-spec.html#formal-specification-of-the-encoding)引数です。

例えば、[このトランザクション](https://etherscan.io/tx/0xd0dcbe007569fcfa1902dae0ab8b4e078efe42e231786312289b1eee5590f6a1)を見てみましょう。 **詳細をクリック**して、コールデータ (calldata)を表示します。

関数セレクタは`0xa9059cbb`です。 [この署名を持つ既知の関数](https://www.4byte.directory/signatures/?bytes4_signature=0xa9059cbb)がいくつかあります。 この場合は、[コントラクトのソース コード](https://etherscan.io/address/0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48#code)がイーサリアムにアップロードされているため、`transfer(address,uint256)`関数であることがわかります。

残りのデータは以下の通りです。

```
0000000000000000000000004f6742badb049791cd9a37ea913f2bac38d01279
000000000000000000000000000000000000000000000000000000003b0559f4
```

ABIの仕様により、整数値(20バイトの整数であるアドレスなど)が、ABIに32バイトのワードとして表示され、先頭はゼロで埋めらます。 これから、`to`のアドレスが [`4f6742badb049791cd9a37ea913f2bac38d01279`](https://etherscan.io/address/0x4f6742badb049791cd9a37ea913f2bac38d01279)であることが解ります。 `value`は、0x3b0559f4 = 990206452です。

## トランザクションの形式 {#types-of-transactions}

イーサリアムでは、いくつかの異なる形式のトランザクションがあります。

- 通常のトランザクション: あるアカウントから別のアカウントへのトランザクション。
- コントラクト・デプロイ・トランザクション: 「to」のないトランザクションで、データフィールドがコントラクトコードに使用されているもの。
- コントラクトの実行: デプロイされたスマートコントラクトと相互作用するトランザクション。 この場合、「to」アドレスはスマートコントラクトアドレス。

### ガス {#on-gas}

前述のように、トランザクションを実行するのに[ガス](/developers/docs/gas/)が必要です。 単純な送金トランザクションには、21,000ユニットのガスが必要です。

つまり、BobがAliceに1 ETHを`baseFeePerGas`が190 gwei、`maxPriorityFeePerGas`が10 gweiで送るためには、Bobは次のフィー(手数料)を支払う必要があります。

```
(190 + 10) * 21000 = 4,200,000 gwei
--or--
0.0042 ETH
```

Bobのアカウントから、**-1.0042 ETH** (Aliceへの送金 1 ETH + ガス代 0.0042 ETH)引き落とされます。

Aliceのアカウントに **+1.0 ETH**振り込み

ベースフィーは**-0.00399 ETH**を消費

バリデータは **+0.000210 ETH** のチップを獲得

スマートコントラクトとの対話にもガスが必要です。

![未使用ガスの返金図](./gas-tx.png) _ [イーサリアムEVM](https://takenobu-hs.github.io/downloads/ethereum_evm_illustrated.pdf)からの図解_

トランザクションで使用されなかったガス代は、ユーザーアカウントに返金されます。

## トランザクションのライフサイクル {#transaction-lifecycle}

トランザクションが送信されると、次のことが実行されます。

1. トランザクションハッシュが暗号化によって生成される: `0x97d99bc7729211111a21b12c933c949d4f31684f1d6954ff477d0477538ff017`
2. 次に、トランザクションはネットワークにブロードキャストされ、保留している他のすべてのネットワークトランザクションで構成されるトランザクションプールに追加される。
3. バリデータはトランザクションを検証し、それを「成功」とみなすには、トランザクションをブロックに追加する必要がある。
4. 時間と経過とともに、トランザクションを含むブロックは「正当 (justified)」にアップグレードされ、その後「ファイナライズ (finalized) 」になる。 これらのアップグレードにより、トランザクションの成功と非改ざん性がかなり確実になる。 一度ファイナライズされたブロックは、数十億ドルの費用がかかるネットワークレベルの攻撃によってのみでしか変更できない。

## ビジュアルデモ {#a-visual-demo}

トランザクション、ガス、マイニングに関するAustinの説明動画をご覧ください。

<YouTube id="er-0ihqFQB0" />

## 型付トランザクションエンベロープ(Typed Transaction Envelope) {#typed-transaction-envelope}

イーサリアムは当初、トランザクション形式は1つのみでした。 各トランザクションには、ノンス (nonce)、ガス代、ガスリミット、toアドレス、値、データ、v、r、sがあります。 これらのフィールドは、以下のように[RLPエンコード](/developers/docs/data-structures-and-encoding/rlp/)されています。

`RLP([nonce, gasPrice, gasLimit, to, value, data, v, r, s])`

イーサリアムは、アクセスリストや[EIP-1559](https://eips.ethereum.org/EIPS/eip-1559)などの新機能を、レガシーなトランザクション形式に影響を与えずに実装できるよう、複数の種類のトランザクションをサポートするように進化してきました。

[EIP-2718](https://eips.ethereum.org/EIPS/eip-2718)では、このトランザクション様式をサポートしています。 これらのトランザクションは、次のように解釈されます。

`TransactionType || TransactionPayload`

フィールドは次のように定義されます。

- `TransactionType`は、0～0x7fの数字で、合計128種類のトランザクションタイプが可能
- `TransactionPayload` - トランザクション型式で定義された任意のバイト配列

## 参考文献 {#further-reading}

- [EIP-2718: 型付トランザクションエンベロープ(Typed Transaction Envelope)](https://eips.ethereum.org/EIPS/eip-2718)

_イーサリアムを学ぶために利用したコミュニティリソースはありますか？ もしあればページを編集して追加してください！_

## 関連トピック {#related-topics}

- [アカウント](/developers/docs/accounts/)
- [イーサリアム仮想マシン(EVM)](/developers/docs/evm/)
- [ガス](/developers/docs/gas/)
