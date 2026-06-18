---
title: "Definição de armazenamento de segredos da Web3"
description: "Definição formal para o armazenamento de segredos da Web3"
lang: pt-br
sidebarDepth: 2
---

Para fazer seu aplicativo funcionar no Ethereum, você pode usar o objeto web3 fornecido pela biblioteca Web3.js. Internamente, ele se comunica com um nó local por meio de chamadas RPC. O [web3](https://github.com/ethereum/web3.js/) funciona com qualquer nó Ethereum que exponha uma camada RPC.

`web3` contém o objeto `eth` - web3.eth.

```js
var fs = require("fs")
var recognizer = require("ethereum-keyfile-recognizer")

fs.readFile("keyfile.json", (err, data) => {
  var json = JSON.parse(data)
  var result = recognizer(json)
})

/** resultado
 *               [ 'web3', 3 ]   arquivo de chave Web3 (v3)
 *  [ 'ethersale', undefined ]   arquivo de chave Ethersale
 *                        null     arquivo de chave inválido
 */
```

Este documento descreve a **versão 3** da Definição de Armazenamento de Segredos da Web3.

## Definição {#definition}

A codificação e decodificação reais do arquivo permanecem em grande parte inalteradas em relação à versão 1, exceto que o algoritmo de criptografia não é mais fixado em AES-128-CBC (AES-128-CTR agora é o requisito mínimo). A maioria dos significados/algoritmos é semelhante à versão 1, exceto `mac`, que é dado como o SHA3 (Keccak-256) das concatenações dos 16 bytes da segunda posição mais à esquerda da chave derivada junto com o `ciphertext` completo.

Os arquivos de chave secreta são armazenados diretamente em `~/.web3/keystore` (para sistemas do tipo Unix) e `~/AppData/Web3/keystore` (para Windows). Eles podem ter qualquer nome, mas uma boa convenção é `<uuid>.json`, onde `<uuid>` é o UUID de 128 bits dado à chave secreta (um proxy que preserva a privacidade para o endereço da chave secreta).

Todos esses arquivos têm uma senha associada. Para derivar a chave secreta de um determinado arquivo `.json`, primeiro derive a chave de criptografia do arquivo; isso é feito pegando a senha do arquivo e passando-a por uma função de derivação de chave, conforme descrito pela chave `kdf`. Os parâmetros estáticos e dinâmicos dependentes de KDF para a função KDF são descritos na chave `kdfparams`.

O PBKDF2 deve ser suportado por todas as implementações minimamente compatíveis, denotado por:

- `kdf`: `pbkdf2`

Para PBKDF2, os kdfparams incluem:

- `prf`: Deve ser `hmac-sha256` (pode ser estendido no futuro);
- `c`: número de iterações;
- `salt`: salt passado para o PBKDF;
- `dklen`: comprimento para a chave derivada. Deve ser >= 32.

Uma vez que a chave do arquivo tenha sido derivada, ela deve ser verificada através da derivação do MAC. O MAC deve ser calculado como o hash SHA3 (Keccak-256) da matriz de bytes formada como as concatenações dos 16 bytes da segunda posição mais à esquerda da chave derivada com o conteúdo da chave `ciphertext`, ou seja:

```js
KECCAK(DK[16..31] ++ <ciphertext>)
```

(onde `++` é o operador de concatenação)

Este valor deve ser comparado ao conteúdo da chave `mac`; se forem diferentes, uma senha alternativa deve ser solicitada (ou a operação cancelada).

Após a chave do arquivo ter sido verificada, o texto cifrado (a chave `ciphertext` no arquivo) pode ser descriptografado usando o algoritmo de criptografia simétrica especificado pela chave `cipher` e parametrizado através da chave `cipherparams`. Se o tamanho da chave derivada e o tamanho da chave do algoritmo não corresponderem, os bytes mais à direita da chave derivada, preenchidos com zeros, devem ser usados como a chave para o algoritmo.

Todas as implementações minimamente compatíveis devem suportar o algoritmo AES-128-CTR, denotado por:

- `cipher: aes-128-ctr`

Esta cifra recebe os seguintes parâmetros, dados como chaves para a chave cipherparams:

- `iv`: vetor de inicialização de 128 bits para a cifra.

A chave para a cifra são os 16 bytes mais à esquerda da chave derivada, ou seja, `DK[0..15]`

A criação/criptografia de uma chave secreta deve ser essencialmente o inverso destas instruções. Certifique-se de que `uuid`, `salt` e `iv` sejam realmente aleatórios.

Além do campo `version`, que deve atuar como um identificador "rígido" de versão, as implementações também podem usar `minorversion` para rastrear alterações menores e não interruptivas no formato.

## Vetores de teste {#test-vectors}

Detalhes:

- `Address`: `008aeeda4d805471df9b2a5b0f38a0c3bcba786b`
- `ICAP`: `XE542A5PZHH8PYIZUBEJEO0MFWRAPPIL67`
- `UUID`: `3198bc9c-6672-5ab3-d9954942343ae5b6`
- `Password`: `testpassword`
- `Secret`: `7a28b5ba57c53603b0b07b56bba752f7784bf506fa95edc395f5cf6c7514fe9d`

### PBKDF2-SHA-256 {#pbkdf2-sha-256}

Vetor de teste usando `AES-128-CTR` e `PBKDF2-SHA-256`:

Conteúdo do arquivo de `~/.web3/keystore/3198bc9c-6672-5ab3-d9954942343ae5b6.json`:

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

**Intermediários**:

`Derived key`: `f06d69cdc7da0faffb1008270bca38f5e31891a3a773950e6d0fea48a7188551`
`MAC Body`: `e31891a3a773950e6d0fea48a71885515318b4d5bcd28de64ee5559e671353e16f075ecae9f99c7a79a38af5f869aa46`
`MAC`: `517ead924a9d0dc3124507e3393d175ce3ff7c1e96529c6c555ce9e51205e9b2`
`Cipher key`: `f06d69cdc7da0faffb1008270bca38f5`

### Scrypt {#scrypt}

Vetor de teste usando AES-128-CTR e Scrypt:

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

**Intermediários**:

`Derived key`: `7446f59ecc301d2d79bc3302650d8a5cedc185ccbb4bf3ca1ebd2c163eaa6c2d`
`MAC Body`: `edc185ccbb4bf3ca1ebd2c163eaa6c2ddd8a1132cf57db67c038c6763afe2cbe6ea1949a86abc5843f8ca656ebbb1ea2`
`MAC`: `337aeb86505d2d0bb620effe57f18381377d67d76dac1090626aa5cd20886a7c`
`Cipher key`: `7446f59ecc301d2d79bc3302650d8a5c`

## Alterações em relação à Versão 1 {#alterations-from-v2}

Esta versão corrige várias inconsistências com a versão 1 publicada [aqui](https://github.com/ethereum/homestead-guide/blob/master/old-docs-for-reference/go-ethereum-wiki.rst/Passphrase-protected-key-store-spec.rst). Em resumo, são elas:

- A capitalização é injustificada e inconsistente (scrypt em minúsculas, Kdf em maiúsculas e minúsculas, MAC em maiúsculas).
- O endereço é desnecessário e compromete a privacidade.
- `Salt` é intrinsecamente um parâmetro da função de derivação de chave e merece ser associado a ela, não à criptografia em geral.
- _SaltLen_ é desnecessário (basta derivá-lo do Salt).
- A função de derivação de chave é fornecida, mas o algoritmo de criptografia é rigidamente especificado.
- `Version` é intrinsecamente numérico, mas é uma string (o versionamento estruturado seria possível com uma string, mas pode ser considerado fora do escopo para um formato de arquivo de configuração que raramente muda).
- `KDF` e `cipher` são conceitualmente irmãos, mas são organizados de forma diferente.
- `MAC` é calculado através de um dado agnóstico a espaços em branco(!)

Foram feitas alterações no formato para fornecer o seguinte arquivo, funcionalmente equivalente ao exemplo dado na página vinculada anteriormente:

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

## Alterações em relação à Versão 2 {#alterations-from-v2-2}

A versão 2 foi uma implementação inicial em C++ com vários bugs. Todos os elementos essenciais permanecem inalterados em relação a ela.