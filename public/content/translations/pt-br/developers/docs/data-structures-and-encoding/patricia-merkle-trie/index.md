---
title: Trie de Merkle Patricia
description: Introdução à trie de Merkle Patricia.
lang: pt-br
sidebarDepth: 2
---

O estado do [Ethereum](/) (a totalidade de todas as contas, saldos e contratos inteligentes) é codificado em uma versão especial da estrutura de dados conhecida geralmente na ciência da computação como uma árvore de Merkle. Essa estrutura é útil para muitas aplicações em criptografia porque cria uma relação verificável entre todas as partes individuais de dados entrelaçadas na árvore, resultando em um único valor **raiz** que pode ser usado para provar coisas sobre os dados.

A estrutura de dados do Ethereum é uma 'trie de Merkle Patricia modificada', nomeada assim porque empresta alguns recursos do PATRICIA (o Algoritmo Prático para Recuperar Informações Codificadas em Alfanumérico - Practical Algorithm To Retrieve Information Coded in Alphanumeric), e porque é projetada para a recuperação (re**trie**val) eficiente de dados dos itens que compõem o estado do Ethereum.

Uma trie de Merkle Patricia é determinística e verificável criptograficamente: a única maneira de gerar uma raiz de estado é calculando-a a partir de cada parte individual do estado, e dois estados que são idênticos podem ser facilmente provados como tal comparando o hash raiz e os hashes que levaram a ele (_uma prova de Merkle_). Por outro lado, não há como criar dois estados diferentes com o mesmo hash raiz, e qualquer tentativa de modificar o estado com valores diferentes resultará em um hash raiz de estado diferente. Teoricamente, essa estrutura fornece o 'santo graal' da eficiência `O(log(n))` para inserções, pesquisas e exclusões.

Em um futuro próximo, o Ethereum planeja migrar para uma estrutura de [árvore de Verkle](/roadmap/verkle-trees), o que abrirá muitas novas possibilidades para futuras melhorias no protocolo.

## Pré-requisitos {#prerequisites}

Para entender melhor esta página, seria útil ter conhecimento básico sobre [hashes](https://en.wikipedia.org/wiki/Hash_function), [árvores de Merkle](https://en.wikipedia.org/wiki/Merkle_tree), [tries](https://en.wikipedia.org/wiki/Trie) e [serialização](https://en.wikipedia.org/wiki/Serialization). Este artigo começa com uma descrição de uma [árvore radix](https://en.wikipedia.org/wiki/Radix_tree) básica e, em seguida, introduz gradualmente as modificações necessárias para a estrutura de dados mais otimizada do Ethereum.

## Tries radix básicas {#basic-radix-tries}

Em uma trie radix básica, cada nó se parece com o seguinte:

```
[i_0, i_1 ... i_n, value]
```

Onde `i_0 ... i_n` representam os símbolos do alfabeto (frequentemente binário ou hexadecimal), `value` é o valor terminal no nó, e os valores nos slots `i_0, i_1 ... i_n` são `NULL` ou ponteiros para (no nosso caso, hashes de) outros nós. Isso forma um armazenamento básico de `(key, value)`.

Digamos que você queira usar uma estrutura de dados de árvore radix para persistir uma ordem sobre um conjunto de pares de chave-valor. Para encontrar o valor atualmente mapeado para a chave `dog` na trie, você primeiro converteria `dog` em letras do alfabeto (dando `64 6f 67`) e, em seguida, desceria a trie seguindo esse caminho até encontrar o valor. Ou seja, você começa procurando o hash raiz em um banco de dados (DB) simples de chave/valor para encontrar o nó raiz da trie. Ele é representado como um array de chaves apontando para outros nós. Você usaria o valor no índice `6` como uma chave e o procuraria no banco de dados simples de chave/valor para obter o nó um nível abaixo. Em seguida, escolha o índice `4` para procurar o próximo valor, depois escolha o índice `6` e assim por diante, até que, uma vez que você seguiu o caminho: `root -> 6 -> 4 -> 6 -> 15 -> 6 -> 7`, você procuraria o valor do nó e retornaria o resultado.

Há uma diferença entre procurar algo na 'trie' e no 'DB' simples de chave/valor subjacente. Ambos definem arranjos de chave/valor, mas o banco de dados subjacente pode fazer uma pesquisa tradicional de 1 etapa de uma chave. Procurar uma chave na trie requer várias pesquisas no banco de dados subjacente para chegar ao valor final descrito acima. Vamos nos referir a este último como um `path` para eliminar a ambiguidade.

As operações de atualização e exclusão para tries radix podem ser definidas da seguinte forma:

```python
    def update(node_hash, path, value):
        curnode = db.get(node_hash) if node_hash else [NULL] * 17
        newnode = curnode.copy()
        if path == "":
            newnode[-1] = value
        else:
            newindex = update(curnode[path[0]], path[1:], value)
            newnode[path[0]] = newindex
        db.put(hash(newnode), newnode)
        return hash(newnode)

    def delete(node_hash, path):
        if node_hash is NULL:
            return NULL
        else:
            curnode = db.get(node_hash)
            newnode = curnode.copy()
            if path == "":
                newnode[-1] = NULL
            else:
                newindex = delete(curnode[path[0]], path[1:])
                newnode[path[0]] = newindex

            if all(x is NULL for x in newnode):
                return NULL
            else:
                db.put(hash(newnode), newnode)
                return hash(newnode)
```

Uma árvore Radix "Merkle" é construída vinculando nós usando resumos de hash criptográficos gerados deterministicamente. Esse endereçamento de conteúdo (no banco de dados de chave/valor `key == keccak256(rlp(value))`) fornece uma garantia de integridade criptográfica dos dados armazenados. Se o hash raiz de uma determinada trie for conhecido publicamente, qualquer pessoa com acesso aos dados folha subjacentes poderá construir uma prova de que a trie inclui um determinado valor em um caminho específico, fornecendo os hashes de cada nó que une um valor específico à raiz da árvore.

É impossível para um invasor fornecer uma prova de um par `(path, value)` que não existe, pois o hash raiz é, em última análise, baseado em todos os hashes abaixo dele. Qualquer modificação subjacente alteraria o hash raiz. Você pode pensar no hash como uma representação compactada de informações estruturais sobre os dados, protegida pela proteção de pré-imagem da função de geração de hash.

Vamos nos referir a uma unidade atômica de uma árvore radix (por exemplo, um único caractere hexadecimal ou número binário de 4 bits) como um "nibble". Ao percorrer um caminho um nibble de cada vez, conforme descrito acima, os nós podem se referir no máximo a 16 filhos, mas incluem um elemento `value`. Nós, portanto, os representamos como um array de comprimento 17. Chamamos esses arrays de 17 elementos de "nós de ramificação" (branch nodes).

## Trie de Merkle Patricia {#merkle-patricia-trees}

As tries radix têm uma grande limitação: elas são ineficientes. Se você quiser armazenar uma ligação `(path, value)` onde o caminho, como no Ethereum, tem 64 caracteres (o número de nibbles em `bytes32`), precisaremos de mais de um kilobyte de espaço extra para armazenar um nível por caractere, e cada pesquisa ou exclusão levará os 64 passos completos. A trie Patricia introduzida a seguir resolve esse problema.

### Otimização {#optimization}

Um nó em uma trie de Merkle Patricia é um dos seguintes:

1.  `NULL` (representado como a string vazia)
2.  `branch` Um nó de 17 itens `[ v0 ... v15, vt ]`
3.  `leaf` Um nó de 2 itens `[ encodedPath, value ]`
4.  `extension` Um nó de 2 itens `[ encodedPath, key ]`

Com caminhos de 64 caracteres, é inevitável que, após percorrer as primeiras camadas da trie, você chegue a um nó onde não existe nenhum caminho divergente por pelo menos parte do caminho para baixo. Para evitar ter que criar até 15 nós `NULL` esparsos ao longo do caminho, nós encurtamos a descida configurando um nó `extension` da forma `[ encodedPath, key ]`, onde `encodedPath` contém o "caminho parcial" para pular adiante (usando uma codificação compacta descrita abaixo), e a `key` é para a próxima pesquisa no banco de dados.

Para um nó `leaf`, que pode ser marcado por um sinalizador (flag) no primeiro nibble do `encodedPath`, o caminho codifica todos os fragmentos de caminho do nó anterior e podemos procurar o `value` diretamente.

Essa otimização acima, no entanto, introduz ambiguidade.

Ao percorrer caminhos em nibbles, podemos acabar com um número ímpar de nibbles para percorrer, mas porque todos os dados são armazenados no formato `bytes`. Não é possível diferenciar entre, por exemplo, o nibble `1` e os nibbles `01` (ambos devem ser armazenados como `<01>`). Para especificar o comprimento ímpar, o caminho parcial é prefixado com um sinalizador.

### Especificação: Codificação compacta de sequência hexadecimal com terminador opcional {#specification}

A sinalização de _comprimento de caminho parcial restante ímpar vs. par_ e _nó folha vs. extensão_, conforme descrito acima, reside no primeiro nibble do caminho parcial de qualquer nó de 2 itens. Eles resultam no seguinte:

| caractere hex | bits | tipo de nó parcial | comprimento do caminho |
| -------- | ---- | ------------------ | ----------- |
| 0        | 0000 | extensão          | par        |
| 1        | 0001 | extensão          | ímpar         |
| 2        | 0010 | terminação (folha) | par        |
| 3        | 0011 | terminação (folha) | ímpar         |

Para comprimento de caminho restante par (`0` ou `2`), outro nibble de "preenchimento" `0` sempre se seguirá.

```python
    def compact_encode(hexarray):
        term = 1 if hexarray[-1] == 16 else 0
        if term:
            hexarray = hexarray[:-1]
        oddlen = len(hexarray) % 2
        flags = 2 * term + oddlen
        if oddlen:
            hexarray = [flags] + hexarray
        else:
            hexarray = [flags] + [0] + hexarray
        # hexarray agora possui um comprimento par cujo primeiro nibble são as flags.
        o = ""
        for i in range(0, len(hexarray), 2):
            o += chr(16 * hexarray[i] + hexarray[i + 1])
        return o
```

Exemplos:

```python
    > [1, 2, 3, 4, 5, ...]
    '11 23 45'
    > [0, 1, 2, 3, 4, 5, ...]
    '00 01 23 45'
    > [0, f, 1, c, b, 8, 10]
    '20 0f 1c b8'
    > [f, 1, c, b, 8, 10]
    '3f 1c b8'
```

Aqui está o código estendido para obter um nó na trie de Merkle Patricia:

```python
    def get_helper(node_hash, path):
        if path == []:
            return node_hash
        if node_hash == "":
            return ""
        curnode = rlp.decode(node_hash if len(node_hash) < 32 else db.get(node_hash))
        if len(curnode) == 2:
            (k2, v2) = curnode
            k2 = compact_decode(k2)
            if k2 == path[: len(k2)]:
                return get(v2, path[len(k2) :])
            else:
                return ""
        elif len(curnode) == 17:
            return get_helper(curnode[path[0]], path[1:])

    def get(node_hash, path):
        path2 = []
        for i in range(len(path)):
            path2.push(int(ord(path[i]) / 16))
            path2.push(ord(path[i]) % 16)
        path2.push(16)
        return get_helper(node_hash, path2)
```

### Exemplo de Trie {#example-trie}

Suponha que queremos uma trie contendo quatro pares de caminho/valor `('do', 'verb')`, `('dog', 'puppy')`, `('doge', 'coins')`, `('horse', 'stallion')`.

Primeiro, convertemos caminhos e valores para `bytes`. Abaixo, as representações reais de bytes para _caminhos_ são denotadas por `<>`, embora os _valores_ ainda sejam mostrados como strings, denotados por `''`, para facilitar a compreensão (eles também seriam, na verdade, `bytes`):

```
<64 6f> : 'verb'
    <64 6f 67> : 'puppy'
    <64 6f 67 65> : 'coins'
    <68 6f 72 73 65> : 'stallion'
```

Agora, construímos essa trie com os seguintes pares de chave/valor no banco de dados subjacente:

```
rootHash: [ <16>, hashA ]
    hashA:    [ <>, <>, <>, <>, hashB, <>, <>, <>, [ <20 6f 72 73 65>, 'stallion' ], <>, <>, <>, <>, <>, <>, <>, <> ]
    hashB:    [ <00 6f>, hashC ]
    hashC:    [ <>, <>, <>, <>, <>, <>, hashD, <>, <>, <>, <>, <>, <>, <>, <>, <>, 'verb' ]
    hashD:    [ <17>, [ <>, <>, <>, <>, <>, <>, [ <35>, 'coins' ], <>, <>, <>, <>, <>, <>, <>, <>, <>, 'puppy' ] ]
```

Quando um nó é referenciado dentro de outro nó, o que é incluído é `keccak256(rlp.encode(node))`, se `len(rlp.encode(node)) >= 32` senão `node` onde `rlp.encode` é a função de codificação [RLP](/developers/docs/data-structures-and-encoding/rlp).

Observe que, ao atualizar uma trie, é necessário armazenar o par chave/valor `(keccak256(x), x)` em uma tabela de pesquisa persistente _se_ o nó recém-criado tiver comprimento >= 32. No entanto, se o nó for menor que isso, não é necessário armazenar nada, pois a função f(x) = x é reversível.

## Tries no Ethereum {#tries-in-ethereum}

Todas as tries de Merkle na camada de execução do Ethereum usam uma trie de Merkle Patricia.

A partir de um cabeçalho do bloco, existem 3 raízes de 3 dessas tries.

1.  stateRoot
2.  transactionsRoot
3.  receiptsRoot

### Trie de estado {#state-trie}

Existe uma trie de estado global, e ela é atualizada toda vez que um cliente processa um bloco. Nela, um `path` é sempre: `keccak256(ethereumAddress)` e um `value` é sempre: `rlp(ethereumAccount)`. Mais especificamente, uma `account` do Ethereum é um array de 4 itens de `[nonce,balance,storageRoot,codeHash]`. Neste ponto, vale a pena notar que este `storageRoot` é a raiz de outra trie patricia:

### Trie de armazenamento {#storage-trie}

A trie de armazenamento é onde _todos_ os dados do contrato residem. Existe uma trie de armazenamento separada para cada conta. Para recuperar valores em posições de armazenamento específicas em um determinado endereço, o endereço de armazenamento, a posição inteira dos dados armazenados no armazenamento e o ID do bloco são necessários. Eles podem então ser passados como argumentos para o `eth_getStorageAt` definido na API JSON-RPC, por exemplo, para recuperar os dados no slot de armazenamento 0 para o endereço `0x295a70b2de5e3953354a6a8344e616ed314d7251`:

```bash
curl -X POST --data '{"jsonrpc":"2.0", "method": "eth_getStorageAt", "params": ["0x295a70b2de5e3953354a6a8344e616ed314d7251", "0x0", "latest"], "id": 1}' localhost:8545

{"jsonrpc":"2.0","id":1,"result":"0x00000000000000000000000000000000000000000000000000000000000004d2"}

```

Recuperar outros elementos no armazenamento é um pouco mais complexo porque a posição na trie de armazenamento deve primeiro ser calculada. A posição é calculada como o hash `keccak256` do endereço e a posição de armazenamento, ambos preenchidos à esquerda com zeros até um comprimento de 32 bytes. Por exemplo, a posição para os dados no slot de armazenamento 1 para o endereço `0x391694e7e0b0cce554cb130d723a9d27458f9298` é:

```python
keccak256(decodeHex("000000000000000000000000391694e7e0b0cce554cb130d723a9d27458f9298" + "0000000000000000000000000000000000000000000000000000000000000001"))
```

Em um console do Geth, isso pode ser calculado da seguinte forma:

```
> var key = "000000000000000000000000391694e7e0b0cce554cb130d723a9d27458f9298" + "0000000000000000000000000000000000000000000000000000000000000001"
undefined
> web3.sha3(key, {"encoding": "hex"})
"0x6661e9d6d8b923d5bbaab1b96e1dd51ff6ea2a93520fdc9eb75d059238b8c5e9"
```

O `path` é, portanto, `keccak256(<6661e9d6d8b923d5bbaab1b96e1dd51ff6ea2a93520fdc9eb75d059238b8c5e9>)`. Isso agora pode ser usado para recuperar os dados da trie de armazenamento como antes:

```bash
curl -X POST --data '{"jsonrpc":"2.0", "method": "eth_getStorageAt", "params": ["0x295a70b2de5e3953354a6a8344e616ed314d7251", "0x6661e9d6d8b923d5bbaab1b96e1dd51ff6ea2a93520fdc9eb75d059238b8c5e9", "latest"], "id": 1}' localhost:8545

{"jsonrpc":"2.0","id":1,"result":"0x000000000000000000000000000000000000000000000000000000000000162e"}
```

Nota: O `storageRoot` para uma conta do Ethereum fica vazio por padrão se não for uma conta de contrato.

### Trie de transações {#transaction-trie}

Existe uma trie de transações separada para cada bloco, novamente armazenando pares `(key, value)`. Um caminho aqui é: `rlp(transactionIndex)` que representa a chave que corresponde a um valor determinado por:

```python
if legacyTx:
  value = rlp(tx)
else:
  value = TxType | encode(tx)
```

Mais informações sobre isso podem ser encontradas na documentação da [EIP-2718](https://eips.ethereum.org/EIPS/eip-2718).

### Trie de recibos {#receipts-trie}

Cada bloco tem sua própria trie de recibos. Um `path` aqui é: `rlp(transactionIndex)`. `transactionIndex` é o seu índice dentro do bloco em que foi incluído. A trie de recibos nunca é atualizada. Semelhante à trie de transações, existem recibos atuais e legados. Para consultar um recibo específico na trie de recibos, o índice da transação em seu bloco, a carga útil (payload) do recibo e o tipo de transação são necessários. O recibo retornado pode ser do tipo `Receipt` que é definido como a concatenação de `TransactionType` e `ReceiptPayload` ou pode ser do tipo `LegacyReceipt` que é definido como `rlp([status, cumulativeGasUsed, logsBloom, logs])`.

Mais informações sobre isso podem ser encontradas na documentação da [EIP-2718](https://eips.ethereum.org/EIPS/eip-2718).

## Leitura adicional {#further-reading}

- [Trie de Merkle Patricia modificada — Como o Ethereum salva um estado](https://medium.com/codechain/modified-merkle-patricia-trie-how-ethereum-saves-a-state-e6d7555078dd)
- [Merkling no Ethereum](https://blog.ethereum.org/2015/11/15/merkling-in-ethereum)
- [Entendendo a trie do Ethereum](https://easythereentropy.wordpress.com/2014/06/04/understanding-the-ethereum-trie/)