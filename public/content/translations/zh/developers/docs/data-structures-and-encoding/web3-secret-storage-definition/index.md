---
title: Web3 密钥存储定义
description: Web3 密钥存储的正式定义
lang: zh
sidebarDepth: 2
---

为了让应用程序在以太坊上运行，你可以使用 web3.js 程序库提供的 web3 对象。 它在底层通过远程过程调用与本地节点通信。 [web3](https://github.com/ethereum/web3.js/) 可以与任何公开远程过程调用层的以太坊节点互动。

`web3` 包含 `eth` 对象 web3.eth。

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

本文介绍 Web3 密钥存储定义的**第 3 版**。

## 定义 {#definition}

文件的实际编码和解码与第 1 版相比基本没有变化，只是加密算法不再固定为 AES-128-CBC（AES-128-CTR 目前是最低要求）。 大部分的含义/算法与第 1 版相似，除了 `mac`，它由派生密钥的最左边第二组 16 个字节与完整 `ciphertext` 拼接后的 SHA3(Keccak-256) 给出。

密钥文件直接存储在 `~/.web3/keystore`（类似 Unix 的系统）和 `~/AppData/Web3/keystore`（Windows 系统）中。 它们可被任意命名，但 `<uuid>.json` 可作为适当的命名约定，其中 `<uuid>` 是提供给密钥（密钥地址的隐私保护代理）的 128 位 UUID。

所有这些文件都有一个关联的密码。 为了派生给定 `.json` 文件的密钥，首先派生该文件的加密密钥；可通过获取该文件的密码并传送给 `kdf` 密钥描述的密钥派生函数来实现。 KDF 函数中依赖于 KDF 的静态和动态参数在 `kdfparams` 密钥中描述。

PBKDF2 必须得到所有符合最低标准的实现的支持，表示为：

- `kdf`：`pbkdf2`

对于 PBKDF2，kdfparams 包括：

- `prf`：必须是 `hmac-sha256`（将来可能会扩展）；
- `c`：迭代次数；
- `salt`：传递给 PBKDF 的盐；
- `dklen`：派生密钥的长度。 必须 >= 32。

派生出文件的密钥后，应该通过派生 MAC 来验证它。 MAC 应该通过派生密钥的最左边第二组 16 字节与 `ciphertext` 密钥内容拼接而成的字节数组的 SHA3 (keccak-256) 的哈希值计算得出，即：

```js
KECCAK(DK[16..31] ++ <ciphertext>)
```

（其中，`++` 代表拼接运算符）

该值需要与 `mac` 密钥的内容进行比较；如果不同，则需要请求另外一个密码（否则操作被取消）。

在文件的密钥得到验证后，密文（文件中的 `ciphertext` 密钥）可通过 `cipher` 密钥指定的对称加密算法进行解密，并通过 `cipherparams` 密钥参数化。 如果派生密钥的大小和算法密钥的大小不匹配，则用零来填充。派生密钥的最右边字节应该作为算法的密钥。

所有符合最低标准的实现必须支持 AES-128-CTR 算法，表示为：

- `cipher: aes-128-ctr`

该密码需要以下参数，作为 cipherparams 密钥的密钥：

- `iv`：密码的 128 位初始化向量。

密码的密钥是派生密钥的最左边 16 个字节，即 `DK[0..15]`

密钥的创建/加密本质上应是这些指令的逆向操作。 确保 `uuid`、`salt` 和 `iv` 实际上是随机的。

除了作为版本“硬”标识符的 `version` 字段外，实现还可能会使用 `minorversion` 跟踪格式的较小、不重要的变更。

## 测试向量 {#test-vectors}

详细信息：

- `Address`: `008aeeda4d805471df9b2a5b0f38a0c3bcba786b`
- `ICAP`: `XE542A5PZHH8PYIZUBEJEO0MFWRAPPIL67`
- `UUID`: `3198bc9c-6672-5ab3-d9954942343ae5b6`
- `Password`: `测试密码`
- `Secret`: `7a28b5ba57c53603b0b07b56bba752f7784bf506fa95edc395f5cf6c7514fe9d`

### PBKDF2-SHA-256 {#PBKDF2-SHA-256}

使用 `AES-128-CTR` 和 `PBKDF2-SHA-256` 的测试向量：

`~/.web3/keystore/3198bc9c-6672-5ab3-d9954942343ae5b6.json` 文件的内容：

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

**中间计算结果**：

`Derived key`: `f06d69cdc7da0faffb1008270bca38f5e31891a3a773950e6d0fea48a7188551` `MAC Body`: `e31891a3a773950e6d0fea48a71885515318b4d5bcd28de64ee5559e671353e16f075ecae9f99c7a79a38af5f869aa46` `MAC`: `517ead924a9d0dc3124507e3393d175ce3ff7c1e96529c6c555ce9e51205e9b2` `Cipher key`: `f06d69cdc7da0faffb1008270bca38f5`

### Scrypt {#scrypt}

使用 AES-128-CTR 和 Scrypt 的测试向量：

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

**中间计算结果**：

`Derived key`: `fac192ceb5fd772906bea3e118a69e8bbb5cc24229e20d8766fd298291bba6bd` `MAC Body`: `bb5cc24229e20d8766fd298291bba6bdd172bf743a674da9cdad04534d56926ef8358534d458fffccd4e6ad2fbde479c` `MAC`: `2103ac29920d71da29f15d75b4a16dbe95cfd7ff8faea1056c33131d846e3097` `Cipher key`: `fac192ceb5fd772906bea3e118a69e8b`

## 第 1 版的改动 {#alterations-from-v2}

本版本修复了与[此处](https://github.com/ethereum/homestead-guide/blob/master/old-docs-for-reference/go-ethereum-wiki.rst/Passphrase-protected-key-store-spec.rst)发布的第 1 版不一致的几个地方。 简短来说，它们是：

- 大小写不合理和不一致（scrypt 小写，Kdf 大小写混合，MAC 大写）。
- 地址不必要并损害了隐私。
- `Salt` 本质上是一个密钥派生函数的参数，一般来说应该与该函数而不是加密关联。
- _SaltLen_ 不必要（从 Salt 派生即可）。
- 给出了密钥派生函数，但加密算法是硬性指定的。
- `Version` 本质上是一个数字，然而却是一个字符串（结构化版本管理可以用一个字符串来实现，但对于一个很少变化的配置文件格式来说，可以认为是超出了范围）。
- `KDF` 和 `cipher` 在名义上是同级别的概念，但组织方式却有所不同。
- `MAC` 是通过一段与空格无关的数据计算的 (!)

我们对格式进行了修改，得到了以下文件，其功能和之前链接页面上的示例一样：

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

## 第 2 版的改动 {#alterations-from-v2}

第 2 版是早期 C++ 实现的版本，有很多漏洞。 所有重要内容保持不变。
