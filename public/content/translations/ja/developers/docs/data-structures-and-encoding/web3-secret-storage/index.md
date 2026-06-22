---
title: "Web3シークレットストレージの定義"
description: "Web3シークレットストレージの正式な定義"
lang: ja
sidebarDepth: 2
---

アプリをイーサリアム上で動作させるには、Web3.jsライブラリが提供するweb3オブジェクトを使用できます。内部的には、RPC呼び出しを通じてローカルノードと通信します。[web3](https://github.com/ethereum/web3.js/)は、RPCレイヤーを公開している任意のイーサリアムノードで機能します。

`web3`には、`eth`オブジェクト（web3.eth）が含まれています。

```js
var fs = require("fs")
var recognizer = require("ethereum-keyfile-recognizer")

fs.readFile("keyfile.json", (err, data) => {
  var json = JSON.parse(data)
  var result = recognizer(json)
})

/** 結果
 *               [ 'web3', 3 ]   Web3 (v3) 鍵ファイル
 *  [ 'ethersale', undefined ]   Ethersale 鍵ファイル
 *                        null     無効な鍵ファイル
 */
```

このドキュメントは、Web3シークレットストレージ定義の**バージョン3**について説明しています。

## 定義 {#definition}

ファイルの実際のエンコードとデコードは、暗号化アルゴリズムがAES-128-CBCに固定されなくなったこと（現在はAES-128-CTRが最小要件）を除き、バージョン1からほとんど変更されていません。意味やアルゴリズムの大部分はバージョン1と同様ですが、`mac`は例外であり、派生鍵の左から2番目の16バイトと完全な`ciphertext`を連結したもののSHA3（ケチャック・256）として与えられます。

シークレット鍵ファイルは、`~/.web3/keystore`（Unix系システムの場合）および`~/AppData/Web3/keystore`（Windowsの場合）に直接保存されます。ファイル名は何でも構いませんが、`<uuid>.json`とするのが良い慣例です。ここで、`<uuid>`はシークレット鍵に与えられた128ビットのUUID（シークレット鍵のアドレスに対するプライバシー保護のプロキシ）です。

このようなファイルにはすべて、関連付けられたパスワードがあります。特定の`.json`ファイルのシークレット鍵を派生させるには、まずファイルの暗号化鍵を派生させます。これは、ファイルのパスワードを取得し、`kdf`キーで説明されている鍵導出関数（KDF）に渡すことで行われます。KDF関数に対するKDF依存の静的および動的パラメータは、`kdfparams`キーで説明されています。

PBKDF2は、最小限の要件を満たす実装すべてでサポートされている必要があり、以下のように示されます。

- `kdf`: `pbkdf2`

PBKDF2の場合、kdfparamsには以下が含まれます。

- `prf`: `hmac-sha256`である必要があります（将来的に拡張される可能性があります）。
- `c`: 反復回数。
- `salt`: PBKDFに渡されるソルト。
- `dklen`: 派生鍵の長さ。32以上である必要があります。

ファイルの鍵が派生したら、MACの派生を通じて検証する必要があります。MACは、派生鍵の左から2番目の16バイトと`ciphertext`キーの内容を連結して形成されたバイト配列のSHA3（ケチャック・256）ハッシュとして計算する必要があります。すなわち、以下のようになります。

```js
KECCAK(DK[16..31] ++ <ciphertext>)
```

（ここで、`++`は連結演算子です）

この値は、`mac`キーの内容と比較する必要があります。異なる場合は、別のパスワードを要求する（または操作をキャンセルする）必要があります。

ファイルの鍵が検証された後、暗号文（ファイル内の`ciphertext`キー）は、`cipher`キーで指定され、`cipherparams`キーを通じてパラメータ化された対称暗号化アルゴリズムを使用して復号できます。派生鍵のサイズとアルゴリズムの鍵サイズが一致しない場合は、ゼロパディングされた派生鍵の右端のバイトをアルゴリズムの鍵として使用する必要があります。

最小限の要件を満たす実装はすべて、AES-128-CTRアルゴリズムをサポートする必要があり、以下のように示されます。

- `cipher: aes-128-ctr`

この暗号は、cipherparamsキーのキーとして与えられる以下のパラメータを取ります。

- `iv`: 暗号用の128ビット初期化ベクトル。

暗号用の鍵は、派生鍵の左端の16バイトです。すなわち、`DK[0..15]`となります。

シークレット鍵の作成および暗号化は、基本的にこれらの手順の逆になります。`uuid`、`salt`、および`iv`が実際にランダムであることを確認してください。

バージョンの「ハード」な識別子として機能する`version`フィールドに加えて、実装では`minorversion`を使用して、フォーマットに対する小規模で互換性を損なわない変更を追跡することもできます。

## テストベクター {#test-vectors}

詳細:

- `Address`: `008aeeda4d805471df9b2a5b0f38a0c3bcba786b`
- `ICAP`: `XE542A5PZHH8PYIZUBEJEO0MFWRAPPIL67`
- `UUID`: `3198bc9c-6672-5ab3-d9954942343ae5b6`
- `Password`: `testpassword`
- `Secret`: `7a28b5ba57c53603b0b07b56bba752f7784bf506fa95edc395f5cf6c7514fe9d`

### PBKDF2-SHA-256 {#pbkdf2-sha-256}

`AES-128-CTR`および`PBKDF2-SHA-256`を使用したテストベクター:

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

**中間値**:

`Derived key`: `f06d69cdc7da0faffb1008270bca38f5e31891a3a773950e6d0fea48a7188551`
`MAC Body`: `e31891a3a773950e6d0fea48a71885515318b4d5bcd28de64ee5559e671353e16f075ecae9f99c7a79a38af5f869aa46`
`MAC`: `517ead924a9d0dc3124507e3393d175ce3ff7c1e96529c6c555ce9e51205e9b2`
`Cipher key`: `f06d69cdc7da0faffb1008270bca38f5`

### Scrypt {#scrypt}

AES-128-CTRおよびScryptを使用したテストベクター:

```json
{
  "crypto": {
    "cipher": "aes-128-ctr",
    "cipherparams": {
      "iv": "740770fce12ce862af21264dab25f1da"
    },
    "ciphertext": "dd8a1132cf57db67c038c6763afe2cbe6ea1949a86abc5843f8ca656ebbb1ea2",
    "kdf": "scrypt",
    "kdfparams": {
      "dklen": 32,
      "n": 262144,
      "p": 1,
      "r": 8,
      "salt": "25710c2ccd7c610b24d068af83b959b7a0e5f40641f0c82daeb1345766191034"
    },
    "mac": "337aeb86505d2d0bb620effe57f18381377d67d76dac1090626aa5cd20886a7c"
  },
  "id": "3198bc9c-6672-5ab3-d995-4942343ae5b6",
  "version": 3
}
```

**中間値**:

`Derived key`: `7446f59ecc301d2d79bc3302650d8a5cedc185ccbb4bf3ca1ebd2c163eaa6c2d`
`MAC Body`: `edc185ccbb4bf3ca1ebd2c163eaa6c2ddd8a1132cf57db67c038c6763afe2cbe6ea1949a86abc5843f8ca656ebbb1ea2`
`MAC`: `337aeb86505d2d0bb620effe57f18381377d67d76dac1090626aa5cd20886a7c`
`Cipher key`: `7446f59ecc301d2d79bc3302650d8a5c`

## バージョン1からの変更点 {#alterations-from-v2}

このバージョンでは、[こちら](https://github.com/ethereum/homestead-guide/blob/master/old-docs-for-reference/go-ethereum-wiki.rst/Passphrase-protected-key-store-spec.rst)で公開されているバージョン1とのいくつかの不整合が修正されています。簡単に言うと以下の通りです。

- 大文字と小文字の使い分けに正当性がなく、一貫性がありません（scryptは小文字、Kdfは大文字と小文字の混在、MACは大文字）。
- アドレスは不要であり、プライバシーを損ないます。
- `Salt`は本質的に鍵導出関数のパラメータであり、暗号全般ではなく、鍵導出関数に関連付けられるべきです。
- _SaltLen_ は不要です（Saltから派生させるだけで十分です）。
- 鍵導出関数が与えられているにもかかわらず、暗号化アルゴリズムがハードコードで指定されています。
- `Version`は本質的に数値ですが、文字列になっています（文字列を使用すれば構造化されたバージョニングが可能ですが、めったに変更されない設定ファイルフォーマットの範囲外と見なすことができます）。
- `KDF`と`cipher`は概念的には兄弟関係にありますが、構成が異なります。
- `MAC`は、空白を無視するデータを通じて計算されています（！）。

フォーマットに変更が加えられ、前述のリンク先ページで示された例と機能的に同等な以下のファイルが生成されるようになりました。

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

## バージョン2からの変更点 {#alterations-from-v2-2}

バージョン2は初期のC++実装であり、多数のバグがありました。すべての重要な要素はバージョン2から変更されていません。