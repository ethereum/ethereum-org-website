---
title: Web3 秘密存储定义
description: Web3 秘密存储的正式定义
lang: zh
sidebarDepth: 2
---

为了让你的应用在以太坊上运行，你可以使用 web3.js 库提供的 web3 对象。在底层，它通过 RPC 调用与本地节点进行通信。[web3](https://github.com/ethereum/web3.js/) 可以与任何暴露了 RPC 层的以太坊节点配合使用。

`web3` 包含 `eth` 对象 - web3.eth。

```js
var fs = require("fs")
var recognizer = require("ethereum-keyfile-recognizer")

fs.readFile("keyfile.json", (err, data) => {
  var json = JSON.parse(data)
  var result = recognizer(json)
})

/** 结果
 *               [ 'web3', 3 ]   Web3 (v3) 密钥文件
 *  [ 'ethersale', undefined ]   Ethersale 密钥文件
 *                        null     无效的密钥文件
 */
```

本文档介绍了 Web3 秘密存储定义的**第 3 版**。

## 定义 {#definition}

文件的实际编码和解码与第 1 版相比基本保持不变，只是加密算法不再固定为 AES-128-CBC（现在最低要求是 AES-128-CTR）。大多数含义/算法与第 1 版相似，除了 `mac`，它是派生密钥左起第二组 16 字节与完整 `ciphertext` 拼接后的 SHA3 (Keccak-256) 哈希值。

密钥文件直接存储在 `~/.web3/keystore`（对于类 Unix 系统）和 `~/AppData/Web3/keystore`（对于 Windows 系统）中。它们可以命名为任何名称，但一个好的约定是 `<uuid>.json`，其中 `<uuid>` 是分配给密钥的 128 位 UUID（作为密钥地址的保护隐私的代理）。

所有此类文件都有一个关联的密码。要派生给定 `.json` 文件的密钥，首先要派生该文件的加密密钥；这是通过获取文件密码并将其传递给 `kdf` 键所描述的密钥派生函数（KDF）来完成的。KDF 函数中依赖于 KDF 的静态和动态参数在 `kdfparams` 键中描述。

所有满足最低合规要求的实现都必须支持 PBKDF2，表示为：

- `kdf`: `pbkdf2`

对于 PBKDF2，kdfparams 包括：

- `prf`：必须是 `hmac-sha256`（未来可能会扩展）；
- `c`：迭代次数；
- `salt`：传递给 PBKDF 的盐值；
- `dklen`：派生密钥的长度。必须 >= 32。

一旦派生出文件的密钥，就应该通过派生 MAC 来验证它。MAC 的计算方式应为：将派生密钥左起第二组 16 字节与 `ciphertext` 键的内容拼接成字节数组，然后计算该字节数组的 SHA3 (Keccak-256) 哈希值，即：

```js
KECCAK(DK[16..31] ++ <ciphertext>)
```

（其中 `++` 是拼接运算符）

应将此值与 `mac` 键的内容进行比较；如果它们不同，则应要求提供其他密码（或取消操作）。

在验证了文件的密钥之后，可以使用由 `cipher` 键指定并通过 `cipherparams` 键进行参数化的对称加密算法，来解密密文（文件中的 `ciphertext` 键）。如果派生密钥的大小与算法的密钥大小不匹配，则应使用补零后派生密钥最右侧的字节作为该算法的密钥。

所有满足最低合规要求的实现都必须支持 AES-128-CTR 算法，表示为：

- `cipher: aes-128-ctr`

该密码算法接受以下参数，作为 cipherparams 键的子键提供：

- `iv`：密码算法的 128 位初始化向量。

密码算法的密钥是派生密钥最左侧的 16 字节，即 `DK[0..15]`

密钥的创建/加密基本上应该是这些说明的逆过程。请确保 `uuid`、`salt` 和 `iv` 是真正的随机数。

除了应作为版本“硬”标识符的 `version` 字段外，实现还可以使用 `minorversion` 来跟踪对格式进行的较小的、非破坏性的更改。

## 测试向量 {#test-vectors}

详情：

- `Address`: `008aeeda4d805471df9b2a5b0f38a0c3bcba786b`
- `ICAP`: `XE542A5PZHH8PYIZUBEJEO0MFWRAPPIL67`
- `UUID`: `3198bc9c-6672-5ab3-d9954942343ae5b6`
- `Password`: `testpassword`
- `Secret`: `7a28b5ba57c53603b0b07b56bba752f7784bf506fa95edc395f5cf6c7514fe9d`

### PBKDF2-SHA-256 {#pbkdf2-sha-256}

使用 `AES-128-CTR` 和 `PBKDF2-SHA-256` 的测试向量：

`~/.web3/keystore/3198bc9c-6672-5ab3-d9954942343ae5b6.json` 的文件内容：

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

**中间值**：

`Derived key`: `f06d69cdc7da0faffb1008270bca38f5e31891a3a773950e6d0fea48a7188551`
`MAC Body`: `e31891a3a773950e6d0fea48a71885515318b4d5bcd28de64ee5559e671353e16f075ecae9f99c7a79a38af5f869aa46`
`MAC`: `517ead924a9d0dc3124507e3393d175ce3ff7c1e96529c6c555ce9e51205e9b2`
`Cipher key`: `f06d69cdc7da0faffb1008270bca38f5`

### Scrypt {#scrypt}

使用 AES-128-CTR 和 Scrypt 的测试向量：

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

**中间值**：

`Derived key`: `7446f59ecc301d2d79bc3302650d8a5cedc185ccbb4bf3ca1ebd2c163eaa6c2d`
`MAC Body`: `edc185ccbb4bf3ca1ebd2c163eaa6c2ddd8a1132cf57db67c038c6763afe2cbe6ea1949a86abc5843f8ca656ebbb1ea2`
`MAC`: `337aeb86505d2d0bb620effe57f18381377d67d76dac1090626aa5cd20886a7c`
`Cipher key`: `7446f59ecc301d2d79bc3302650d8a5c`

## 与第 1 版的变更 {#alterations-from-v2}

此版本修复了与[此处](https://github.com/ethereum/homestead-guide/blob/master/old-docs-for-reference/go-ethereum-wiki.rst/Passphrase-protected-key-store-spec.rst)发布的第 1 版的几个不一致之处。简而言之，这些变更是：

- 大小写不合理且不一致（scrypt 小写，Kdf 混合大小写，MAC 大写）。
- 地址是不必要的，并且会损害隐私。
- `Salt` 本质上是密钥派生函数的参数，应该与它关联，而不是与一般的加密技术关联。
- _SaltLen_ 是不必要的（只需从 Salt 派生即可）。
- 给出了密钥派生函数，但加密算法却是硬性指定的。
- `Version` 本质上是数字，却是一个字符串（使用字符串可以实现结构化版本控制，但对于很少更改的配置文件格式来说，这可以被视为超出了范围）。
- `KDF` 和 `cipher` 在概念上是同级概念，但组织方式却不同。
- `MAC` 是通过一段与空格无关的数据计算出来的（！）

对格式进行了更改，以提供以下文件，其功能等同于前面链接页面上给出的示例：

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

## 与第 2 版的变更 {#alterations-from-v2-2}

第 2 版是一个早期的 C++ 实现，存在一些错误。所有基本要素与该版本相比保持不变。