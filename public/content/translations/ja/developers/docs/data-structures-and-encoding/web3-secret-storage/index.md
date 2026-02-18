---
title: "Web3シークレットストレージの定義"
description: "Web3シークレットストレージの正式な定義"
lang: ja
sidebarDepth: 2
---

アプリをイーサリアムで動作させるために、web3.jsライブラリが提供するWeb3オブジェクトを使用できます。 これは、内部でRPC呼び出しを介してローカルノードと通信します。 [web3](https://github.com/ethereum/web3.js/)は、RPCレイヤーを公開しているイーサリアムノードと連携します。

`web3`には、`eth`オブジェクト - web3.ethが含まれています。

```js
var fs = require("fs")
var recognizer = require("ethereum-keyfile-recognizer")

fs.readFile("keyfile.json", (err, data) => {
  var json = JSON.parse(data)
  var result = recognizer(json)
})

/** 結果
 *               [ 'web3', 3 ]   web3 (v3) キーファイル
 *  [ 'ethersale', undefined ]   Ethersale キーファイル
 *                        null     無効なキーファイル
 */
```

この文書は、Web3 Secret Storage Definitionの**バージョン3**を記述したものです。

## 定義 {#definition}

ファイルのエンコードとデコードは、暗号化アルゴリズムがAES-128-CBCに固定されなくなったことを除いて(AES-128-CTR が最小要件になりました)、実際にはバージョン1からほとんど変更されていません  。 ほとんどの意味/アルゴリズムはバージョン1と似ていますが、`mac`は例外です。`mac`は、導出鍵の左から2番目の16バイトと完全な`ciphertext`を連結したもののSHA3 (keccak-256)として与えられます。

秘密鍵ファイルは、`~/.web3/keystore`（Unix系システムの場合）と`~/AppData/Web3/keystore`（Windowsの場合）に直接保存されます。 ファイル名は任意に設定できますが、`<uuid>.json`という命名規則が推奨されます。ここで`<uuid>`は、秘密鍵に付与された128ビットのUUID（秘密鍵のアドレスのプライバシーを保護するプロキシ）です。

これらのファイルはすべて、関連付けられたパスワードを持っています。 所定の`.json`ファイルの秘密鍵を導出するには、まずファイルの暗号化鍵を導出します。これは、ファイルのパスワードを取得し、それを`kdf`鍵で記述されている鍵導出関数に渡すことによって行われます。 KDF関数へのKDF依存の静的パラメータおよび動的パラメータは、`kdfparams`鍵に記述されています。

次に示されるPBKDF2は、最小限に準拠したすべての実装でサポートされている必要があります。

- `kdf`: `pbkdf2`

PBKDF2の場合、kdfparamsは次を含みます。

- `prf`: `hmac-sha256`でなければなりません（将来的に拡張される可能性があります）；
- `c`: 反復回数;
- `salt`: PBKDFに渡されるソルト;
- `dklen`: 導出鍵の長さ。 32以上である必要があります。

ファイルの鍵が導出されたら、MACの導出によってそれを検証する必要があります。 MACは、導出鍵の左から2番目の16バイトと`ciphertext`鍵の内容を連結して形成されるバイト配列のSHA3 (keccak-256) ハッシュとして計算される必要があります。すなわち、次のようになります：

```js
KECCAK(DK[16..31] ++ <ciphertext>)
```

（`++`は連結演算子）

この値は`mac`鍵の内容と比較する必要があります。もし値が異なる場合は、別のパスワードを要求する（あるいは操作をキャンセルする）必要があります。

ファイルの鍵が検証された後、暗号文（ファイル内の`ciphertext`鍵）は、`cipher`鍵で指定され、`cipherparams`鍵を通じてパラメータ化された対称暗号アルゴリズムを使用して復号できます。 導出鍵のサイズとアルゴリズムの鍵のサイズが一致しない場合、ゼロが付け足され、導出鍵の右端のバイトをアルゴリズムのキーとして使用する必要があります。

最小限の準拠をしたすべての実装は、次に示されるAES-128-CTRアルゴリズムをサポートする必要があります。

- `cipher: aes-128-ctr`

この暗号は、cipherparams鍵への鍵として与えられる次のパラメーターを取ります。

- `iv`: 暗号の128ビット初期化ベクトル。

暗号の鍵は、導出鍵の左端16バイト、すなわち`DK[0..15]`です。

秘密鍵の作成/暗号化は、本質的にはこれらの命令の逆であるべきです。 `uuid`、`salt`、`iv`が実際にランダムであることを確認してください。

バージョンの「ハードな」識別子として機能する`version`フィールドに加えて、実装では`minorversion`を使用して、フォーマットへのより小さな、破壊的変更を伴わない変更を追跡することもできます。

## テストベクトル {#test-vectors}

詳細:

- `アドレス`: `008aeeda4d805471df9b2a5b0f38a0c3bcba786b`
- `ICAP`: `XE542A5PZHH8PYIZUBEJEO0MFWRAPPIL67`
- `UUID`: `3198bc9c-6672-5ab3-d9954942343ae5b6`
- `パスワード`: `testpassword`
- `シークレット`: `7a28b5ba57c53603b0b07b56bba752f7784bf506fa95edc395f5cf6c7514fe9d`

### PBKDF2-SHA-256 {#PBKDF2-SHA-256}

`AES-128-CTR`と`PBKDF2-SHA-256`を使用したテストベクトル：

`~/.web3/keystore/3198bc9c-6672-5ab3-d9954942343ae5b6.json`のファイル内容：

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

`導出鍵`: `f06d69cdc7da0faffb1008270bca38f5e31891a3a773950e6d0fea48a7188551`
`MACボディ`: `e31891a3a773950e6d0fea48a71885515318b4d5bcd28de64ee5559e671353e16f075ecae9f99c7a79a38af5f869aa46`
`MAC`: `517ead924a9d0dc3124507e3393d175ce3ff7c1e96529c6c555ce9e51205e9b2`
`暗号鍵`: `f06d69cdc7da0faffb1008270bca38f5`

### Scrypt {#scrypt}

AES-128-CTRとスクリプトを使用したテストベクトル

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

`導出鍵`: `7446f59ecc301d2d79bc3302650d8a5cedc185ccbb4bf3ca1ebd2c163eaa6c2d`
`MACボディ`: `edc185ccbb4bf3ca1ebd2c163eaa6c2ddd8a1132cf57db67c038c6763afe2cbe6ea1949a86abc5843f8ca656ebbb1ea2`
`MAC`: `337aeb86505d2d0bb620effe57f18381377d67d76dac1090626aa5cd20886a7c`
`暗号鍵`: `7446f59ecc301d2d79bc3302650d8a5c`

## バージョン1からの変更点 {#alterations-from-v2}

このバージョンでは、[こちら](https://github.com/ethereum/homestead-guide/blob/master/old-docs-for-reference/go-ethereum-wiki.rst/Passphrase-protected-key-store-spec.rst)で公開されたバージョン1との間のいくつかの矛盾点を修正しています。 簡単には次のとおりです。

- 大文字の使用が正当化されていなく、一貫性がない(scryptの小文字、Kdfの大文字と小文字の混合、MACの大文字) 。
- 不必要な対処とプライバシーの侵害。
- `Salt`は本質的に鍵導出関数のパラメータであり、暗号全般ではなく、鍵導出関数に関連付けられるべきです。
- _SaltLen_は不要です（Saltから導出するだけです）。
- 鍵導出関数が与えられているが、暗号アルゴリズムは厳密に指定されている。
- `Version`は本質的には数値ですが、文字列です（文字列でも構造化されたバージョン管理は可能ですが、めったに変更されない設定ファイル形式の範囲外とみなすことができます）。
- `KDF`と`cipher`は概念的には兄弟関係にある概念ですが、異なる構成になっています。
- `MAC`は、空白を無視するデータ（!）から計算されます。

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

## バージョン2からの変更点 {#alterations-from-v2}

バージョン2は、初期のC++実装で多くのバグがありました。 すべての必須機能は、バージョン2から変更ありません。
