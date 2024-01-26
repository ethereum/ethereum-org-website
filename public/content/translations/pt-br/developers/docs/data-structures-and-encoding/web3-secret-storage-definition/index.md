---
title: Definição de armazenamento secreto Web3
description: Definição formal para armazenamento secreto web3
lang: pt-br
sidebarDepth: 2
---

Para fazer seu aplicativo funcionar no Ethereum, você pode usar o objeto web3 fornecido pela biblioteca web3.js. Internamente, ele se comunica com um nó local por meio de chamadas RPC. [Web3](https://github.com/ethereum/web3.js/) funciona com qualquer nó Ethereum que expõe uma camada RPC.

`web3` contém o objeto `eth` - web3.eth.

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

Isso documenta a **versão 3** da Definição de Armazenamento Secreto da Web3.

## Definição {#definition}

A codificação e decodificação atuais do arquivo permanece em grande medida inalteradas da versão 1, exceto que o algoritmo cripto já não é fixo no AES-128-CBC (AES-128-CTR agora é o requisito mínimo). A maioria dos significados/algoritmos é semelhante à versão 1, exceto `mac`, que é dado como o SHA3 (keccak-256) das concatenações do segundo 16 bytes mais à esquerda da chave derivada, juntamente com o `ciphertext` completo.

Arquivos de chave secretos são armazenados diretamente em `~/.web3/keystore` (para sistemas similares a Unix) e `~/AppData/Web3/keystore` (para Windows). Eles podem ter qualquer nome, mas uma boa convenção é `<uuid>.json`, em que `<uuid>` é o UUID de 128 bits dado à chave secreta (um proxy de preservação de privacidade para o endereço da chave secreta).

Todos esses arquivos possuem uma senha associada. Para derivar uma dada chave secreta de arquivo `.json`, primeiro derive a chave de criptografia do arquivo; isso é feito usando a senha do arquivo e passando-a através de uma função de derivação de chaves descrita pela chave `kdf`. Parâmetros estáticos e dinâmicos dependentes do KDF para a função KDF são descritos na chave `kdfparams`.

PBKDF2 deve ser apoiado por todas as implementações minimamente compatíveis, denotadas assim:

- `kdf`: `pbkdf2`

Para PBKDF2, os kdfparams incluem:

- `prf`: Deve ser `hmac-sha256` (pode ser estendido no futuro);
- `c`: número de iterações;
- `salt`: salt (sequência de bits aleatórios) passado para PBKDF;
- `dklen`: comprimento da chave derivada. Deve ser >= 32.

Uma vez que a chave do arquivo tenha sido derivada, ela deveria ser verificada através da derivação do MAC. O MAC deve ser calculado como o hash SHA3 (keccak-256) do array de bytes formado, como as concatenações dos 16 bytes segundos mais à esquerda da chave derivada, com o conteúdo da chave `ciphertext`, ou seja.:

```js
KECCAK(DK[16..31] ++ <ciphertext>)
```

(em que `++` é o operador de concatenação)

Este valor deve ser comparado ao conteúdo da chave `mac`; se eles forem diferentes, uma senha alternativa deverá ser solicitada (ou a operação cancelada).

Após a verificação da chave do arquivo, o texto cifrado (a chave `ciphertext` no arquivo) pode ser descriptografado usando o algoritmo de criptografia simétrica, especificado pela chave `cipher` e parametrizado por meio da chave `cipherparams`. Se o tamanho da chave derivada e o tamanho da chave do algoritmo forem incompatíveis, os zeros à esquerda, os bytes à direita da chave derivada deverão ser usados como a chave para o algoritmo.

Todas as implementações minimamente compatíveis devem suportar o algoritmo AES-128-CTR, indicado através de:

- `cipher: aes-128-ctr`

Esta cifra toma os seguintes parâmetros, dados como chaves para a chave dos parâmetros de decifração:

- `iv`: vetor de inicialização de 128 bits para a cifra.

A chave para a cifra é os 16 bytes da chave derivada mais à esquerda, ou seja, `DK[0..15]`

A criação/criptografia de uma chave secreta deve ser essencialmente o inverso dessas instruções. Certifique-se de que `uuid`, `salt` e `iv` sejam realmente aleatórios.

Além do campo `version`, que deve atuar como um identificador "hard" da versão, as implementações também podem usar `minorversion` para rastrear mudanças menores, sem a quebra do formato.

## Vetores de teste {#test-vectors}

Detalhes:

- `Address`: `008aeeda4d805471df9b2a5b0f38a0c3bcba786b`
- `ICAP`: `XE542A5PZHH8PYIZUBEJEO0MFWRAPPIL67`
- `UUID`: `3198bc9c-6672-5ab3-d9954942343ae5b6`
- `Password`: `testpassword`
- `Secret`: `7a28b5ba57c53603b0b07b56bba752f7784bf506fa95edc395f5cf6c7514fe9d`

### PBKDF2-SHA-256 {#PBKDF2-SHA-256}

Teste o vetor usando `AES-128-CTR` e `PBKDF2-SHA-256`:

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

**Intermédios**:

`Derived key`: `f06d69cdc7da0faffb1008270bca38f5e31891a3a773950e6d0fea48a7188551` `MAC Body`: `e31891a3a773950e6d0fea48a71885515318b4d5bcd28de64ee5559e671353e16f075ecae9f99c7a79a38af5f869aa46` `MAC`: `517ead924a9d0dc3124507e3393d175ce3ff7c1e96529c6c555ce9e51205e9b2` `Cipher key`: `f06d69cdc7da0faffb1008270bca38f5`

### Scrypt {#scrypt}

Vetor de teste usando AES-128-CTR e Scrypt:

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

**Intermédios**:

`Derived key`: `fac192ceb5fd772906bea3e118a69e8bbb5cc24229e20d8766fd298291bba6bd` `MAC Body`: `bb5cc24229e20d8766fd298291bba6bdd172bf743a674da9cdad04534d56926ef8358534d458fffccd4e6ad2fbde479c` `MAC`: `2103ac29920d71da29f15d75b4a16dbe95cfd7ff8faea1056c33131d846e3097` `Cipher key`: `fac192ceb5fd772906bea3e118a69e8b`

## Alterações da versão 1 {#alterations-from-v2}

Esta versão corrige várias inconsistências com a versão 1 publicada [aqui](https://github.com/ethereum/homestead-guide/blob/master/old-docs-for-reference/go-ethereum-wiki.rst/Passphrase-protected-key-store-spec.rst). Em resumo, estas são:

- A capitalização é injustificada e inconsistente (scrypt minúsculas, Kdf caso misto, MAC maiúsculas).
- Endereço desnecessário e compromete a privacidade.
- `Salt` é intrinsecamente um parâmetro da função de derivação de chave e merece ser associado a ela, não com a cripto em geral.
- _SaltLen_ desnecessário (apenas deriva do Salt).
- A função chave de derivação é dada, no entanto, o algoritmo de criptografia é difícil de especificar.
- `Version` é intrinsecamente numérica, ainda é uma string (controle de versões estruturado seria possível com uma string, mas pode ser considerado fora do escopo para um formato de arquivo de configuração que raramente muda).
- `KDF` e `cipher` são conceitos notavelmente parecidos, mas estão organizados de forma diferente.
- `MAC` é calculado por meio de um espaço em branco agnóstico de dados(!)

Foram feitas alterações no formato para dar o seguinte arquivo, funcionalmente equivalente ao exemplo dado na página anteriormente vinculada:

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

## Alterações da versão 2 {#alterations-from-v2}

A versão 2 foi uma implementação inicial de C++ com um número de bugs. Todos os elementos essenciais permanecem inalterados.
