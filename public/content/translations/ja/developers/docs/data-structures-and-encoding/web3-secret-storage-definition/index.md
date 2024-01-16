---
title: Web3シークレットストレージの定義
description: Web3シークレットストレージの正式な定義
lang: ja
sidebarDepth: 2
---

アプリをイーサリアムで動作させるために、web3.js ライブラリが提供する Web3 オブジェクトを使用できます。 これは、内部で RPC 呼び出しを介してローカルノードと通信します。 [Web3](https://github.com/ethereum/web3.js/)は、RPC レイヤーを公開しているイーサリアムノードと連携します。

`web3`には、`eth`オブジェクト「web3.eth」が含まれています。

```js
var fs = require("fs")
var recognizer = require("ethereum-keyfile-recognizer")

fs.readFile("keyfile.json", (err, data) => {
  var json = JSON.parse(data)
  var result = recognizer(json)
})

/** result
 *               [ 'web3', 3 ]   web3 (v3) keyfile
 *  [ 'ethersale', undefined ]   Ethersale keyfile
 *                        null     invalid keyfile
 */
```

このドキュメントは、**バージョン 3**の Web3 シークレットストレージの定義です。

## 定義 {#definition}

ファイルのエンコードとデコードは、暗号化アルゴリズムが AES-128-CBC に固定されなくなったことを除いて(AES-128-CTR が最小要件になりました)、実際にはバージョン 1 からほとんど変更されていません 。 ほとんどの意味またはアルゴリズムは、バージョン 1 と似ていますが、`mac`を除きます。これは、完全な`ciphertext`と共に導出鍵の左から 2 番目の 16 バイトを連結した SHA3 (keccak-256) として指定されます。

秘密鍵ファイルは、`~/.web3/keystore` (Unix のようなシステム環境)と `~/AppData/Web3/keystore` (Windows 環境)に直接保存されます。 任意の名前を付けることができますが、適切な規則としては`<uuid>.json`とすることが望ましいです。ここで、`<uuid>`は、秘密鍵(秘密鍵のアドレスのプライバシーを保護するプロキシ)に付与された 128 ビットの UUID です。

これらのファイルはすべて、関連付けられたパスワードを持っています。 ある`.json`ファイルの秘密鍵を導出するには、まずファイルの暗号化鍵を導出します。これはファイルのパスワードを取得し、それを`kdf`鍵で記述された鍵導出関数に渡すことによって行われます。 KDF 関数への KDF 依存の静的パラメータおよび動的パラメータは、`kdfparams`鍵に記述されています。

次に示される PBKDF2 は、最小限に準拠したすべての実装でサポートされている必要があります。

- `kdf`: `pbkdf2`

PBKDF2 の場合、kdfparams は次を含みます。

- `prf`: `hmac-sha256`でなければならない(将来的には拡張される場合ががある)
- `c`: 反復回数
- `salt`: PBKDF に渡されるソルト
- `dklen`: 導出鍵の長さ (32 以上でなければならない)

ファイルの鍵が導出されたら、MAC の導出によってそれを検証する必要があります。 MAC は、`ciphertext`鍵の内容を持つ導出鍵の左から 2 番目の 16 バイトの連結として形成されたバイト配列の SHA3 (keccak-256) ハッシュとして計算されるべきです。 すなわち次のようになります。

```js
KECCAK(DK[16..31] ++ <ciphertext>)
```

(「`++`」は、連結演算子)

この値は、`mac`鍵の内容と比較する必要があります。異なる場合は、別のパスワードを要求する必要があります(または、操作をキャンセルする必要があります) 。

ファイルの鍵が検証された後、暗号テキスト(ファイル内の `ciphertext`鍵)は、`cipher`キーで指定された対称暗号アルゴリズムを使用して復号化され、`cipherparams`鍵によってパラメータ化されます。 導出鍵のサイズとアルゴリズムの鍵のサイズが一致しない場合、ゼロが付け足され、導出鍵の右端のバイトをアルゴリズムのキーとして使用する必要があります。

最小限の準拠をしたすべての実装は、次に示される AES-128-CTR アルゴリズムをサポートする必要があります。

- `cipher: aes-128-ctr`

この暗号は、cipherparams 鍵への鍵として与えられる次のパラメーターを取ります。

- `iv`: 暗号の 128 ビット初期化ベクトル。

暗号鍵は、導出鍵の左端の 16 バイト、つまり`DK[0..15]`です。

秘密鍵の作成/暗号化は、本質的にはこれらの命令の逆であるべきです。 `uuid`、`salt`、`iv`が実際にランダムであることを確認してください。

バージョンの「ハード」識別子として機能する `version`フィールドに加えて、実装では`minorversion`を使用してフォーマットへのより小さな非破壊的な変更を追跡することもできます。

## テストベクトル {#test-vectors}

詳細:

- `Address`: `008aeeda4d805471df9b2a5b0f38a0c3bcba786b`
- `ICAP`: `XE542A5PZHH8PYIZUBEJEO0MFWRAPPIL67`
- `UUID`: `3198bc9c-6672-5ab3-d9954942343ae5b6`
- `Password`: `testpassword`
- `Secret`: `7a28b5ba57c53603b0b07b56bba752f7784bf506fa95edc395f5cf6c7514fe9d`

### PBKDF2-SHA-256 {#PBKDF2-SHA-256}

`AES-128-CTR`および`PBKDF2-SHA-256`を使用したテストベクトル

`~/.web3/keystore/3198bc9c-6672-5ab3-d9954942343ae5b6.json`のファイル内容:

```json
{
  "crypto": {
    "cipher": "aes-128-ctr",
    "cipherparams": {
      "iv": "6087dab2f9fdbbfaddc31a909735c1e6"
    },
    "ciphertext": "5318b4d5bcd28de64ee5559e671353e16f075ecae9f99c7a79a38af5f869aa46",
    "kdf": "pbkdf2",
    "kdfparams": {
      "c": 262144,
      "dklen": 32,
      "prf": "hmac-sha256",
      "salt": "ae3cd4e7013836a3df6bd7241b12db061dbe2c6785853cce422d148a624ce0bd"
    },
    "mac": "517ead924a9d0dc3124507e3393d175ce3ff7c1e96529c6c555ce9e51205e9b2"
  },
  "id": "3198bc9c-6672-5ab3-d995-4942343ae5b6",
  "version": 3
}
```

**中間体**:

`Derived key`: `f06d69cdc7da0faffb1008270bca38f5e31891a3a773950e6d0fea48a7188551` `MAC Body`: `e31891a3a773950e6d0fea48a71885515318b4d5bcd28de64ee5559e671353e16f075ecae9f99c7a79a38af5f869aa46` `MAC`: `517ead924a9d0dc3124507e3393d175ce3ff7c1e96529c6c555ce9e51205e9b2` `Cipher key`: `f06d69cdc7da0faffb1008270bca38f5`

### スクリプト {#scrypt}

AES-128-CTR とスクリプトを使用したテストベクトル

```json
{
  "crypto": {
    "cipher": "aes-128-ctr",
    "cipherparams": {
      "iv": "83dbcc02d8ccb40e466191a123791e0e"
    },
    "ciphertext": "d172bf743a674da9cdad04534d56926ef8358534d458fffccd4e6ad2fbde479c",
    "kdf": "scrypt",
    "kdfparams": {
      "dklen": 32,
      "n": 262144,
      "p": 8,
      "r": 1,
      "salt": "ab0c7876052600dd703518d6fc3fe8984592145b591fc8fb5c6d43190334ba19"
    },
    "mac": "2103ac29920d71da29f15d75b4a16dbe95cfd7ff8faea1056c33131d846e3097"
  },
  "id": "3198bc9c-6672-5ab3-d995-4942343ae5b6",
  "version": 3
}
```

**中間体**:

`Derived key`: `fac192ceb5fd772906bea3e118a69e8bbb5cc24229e20d8766fd298291bba6bd` `MAC Body`: `bb5cc24229e20d8766fd298291bba6bdd172bf743a674da9cdad04534d56926ef8358534d458fffccd4e6ad2fbde479c` `MAC`: `2103ac29920d71da29f15d75b4a16dbe95cfd7ff8faea1056c33131d846e3097` `Cipher key`: `fac192ceb5fd772906bea3e118a69e8b`

## バージョン 1 からの変更点 {#alterations-from-v2}

このバージョンでは、[こちら](https://github.com/ethereum/homestead-guide/blob/master/old-docs-for-reference/go-ethereum-wiki.rst/Passphrase-protected-key-store-spec.rst)に公開されているバージョン 1 のいくつかの矛盾点が解消されています。 簡単には次のとおりです。

- 大文字の使用が正当化されていなく、一貫性がない(scrypt の小文字、Kdf の大文字と小文字の混合、MAC の大文字) 。
- 不必要な対処とプライバシーの侵害。
- `Salt`は、本質的に鍵導出関数のパラメーターであり、一般的な暗号ではなく、鍵導出関数のパラメーターに関連付ける方がふさわしい。
- *SaltLen*が不要(Salt から導出) 。
- 鍵導出関数が与えられているが、暗号アルゴリズムは厳密に指定されている。
- `Version`は、本質的には数値であるものの文字列(構造化されたバージョン管理は、文字列でできるが、ほとんど変更されない構成ファイル形式の範囲外と考えられる) 。
- `KDF`と `cipher`は、概念的には兄弟であるが、構造は異なる。
- `MAC`は、空白に無関係なデータ (!) によって計算される。

次のフォーマットのファイルを提供するように変更。以前リンクされいたページに示されている例と機能的に同等。

```json
{
  "crypto": {
    "cipher": "aes-128-cbc",
    "ciphertext": "07533e172414bfa50e99dba4a0ce603f654ebfa1ff46277c3e0c577fdc87f6bb4e4fe16c5a94ce6ce14cfa069821ef9b",
    "cipherparams": {
      "iv": "16d67ba0ce5a339ff2f07951253e6ba8"
    },
    "kdf": "scrypt",
    "kdfparams": {
      "dklen": 32,
      "n": 262144,
      "p": 1,
      "r": 8,
      "salt": "06870e5e6a24e183a5c807bd1c43afd86d573f7db303ff4853d135cd0fd3fe91"
    },
    "mac": "8ccded24da2e99a11d48cda146f9cc8213eb423e2ea0d8427f41c3be414424dd",
    "version": 1
  },
  "id": "0498f19a-59db-4d54-ac95-33901b4f1870",
  "version": 2
}
```

## バージョン 2 からの変更点 {#alterations-from-v2}

バージョン 2 は、初期の C++実装で多くのバグがありました。 すべての必須機能は、バージョン 2 から変更ありません。
