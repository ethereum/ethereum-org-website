---
title: Árvore Merkle Patricia
description: Introdução à àrvore Merkle Patricia
lang: pt-br
sidebarDepth: 2
---

O estado do Ethereum (a totalidade de todas as contas, saldos e contratos inteligentes) é codificado em uma versão especial da estrutura de dados conhecida geralmente na ciência da computação como Árvore Merkle. Essa estrutura é útil para muitas aplicações em criptografia porque cria um relacionamento verificável entre todos os dados individuais emaranhados na árvore, resultando em um único valor **raiz** que pode ser usado para provar coisas sobre os dados.

A estrutura de dados do Ethereum é uma 'Merkle-Patricia Trie modificada', assim chamada porque toma emprestados alguns recursos do PATRICIA (o Algoritmo Prático para Recuperar Informações Codificadas em Alfanumérico) e porque foi projetada para ser eficiente na **recuperação de dados** de itens que compõem o estado do Ethereum.

Uma Merkle-Patricia é determinística e criptograficamente verificável: a única maneira de gerar uma raiz de estado é computando-a a partir de cada parte individual do estado, e dois estados que são idênticos podem ser facilmente provados comparando o hash raiz e os hashes que levaram a ele (_uma prova de Merkle_). Por outro lado, não há como criar dois estados diferentes com o mesmo hash raiz, e qualquer tentativa de modificar o estado com valores diferentes resultará em um hash raiz de estado diferente. Teoricamente, essa estrutura fornece o "Santo Graal" da eficiência `O(log(n))` para inserções, pesquisas e exclusões.

Em um futuro próximo, o Ethereum planeja migrar para uma estrutura de [Verkle Tree](https://ethereum.org/en/roadmap/verkle-trees), o que abrirá muitas novas possibilidades para futuras melhorias de protocolo.

## Pré-requisitos {#prerequisites}

Para entender melhor esta página, seria útil ter conhecimento básico sobre [hashes](https://en.wikipedia.org/wiki/Hash_function), [Árvores Merkle](https://en.wikipedia.org/wiki/Merkle_tree), [árvores](https://en.wikipedia.org/wiki/Trie) e [serialização](https://en.wikipedia.org/wiki/Serialization). Este artigo começa com uma descrição de uma [árvore radix](https://en.wikipedia.org/wiki/Radix_tree) básica e, em seguida, introduz gradualmente as modificações necessárias para a estrutura de dados mais otimizada do Ethereum.

## Árvores radix básicas {#basic-radix-tries}

Em uma árvore radix básica, cada nó se parece com o seguinte:

```
    [i_0, i_1 ... i_n, value]
```

Onde `i0 ... in` representa o símbolo do alfabeto (muitas vezes binário ou hex), `value` é o valor terminal no nó, e os valores nos slots `i0 . . in` são ou `NULL` ou ponteiros para (em nosso caso, hashes de) outros nós. Isto forma um armazenamento básico `(key, value)`.

Digamos que você queria usar uma estrutura de dados da árvore radix para persistir em uma ordem em um conjunto de pares de valor-chave. Para encontrar o valor atualmente relacionado com a chave `dog` na árvore, primeiro você converteria `dog` em letras do alfabeto (dando `64 6f 67`), e então desceria pela árvore seguindo o caminho até encontrar o valor. Ou seja, você começa por procurar o hash raiz em uma base de dados texto chave/valor para encontrar o nó raiz da árvore. Ele é representado como uma matriz de chaves apontando para outros nós. Use o valor no índice `6` como uma chave e procure na base chave/valor para obter o nó um nível abaixo. Em seguida, escolha o índice `4` para procurar o próximo valor, depois escolha o índice `6` e assim por diante. Uma vez tendo seguido o caminho: `root-> 6 -> 4 -> 6 -> 15 -> 6 -> 7`, procure o valor do nó e retorne o resultado.

Há uma diferença entre buscar algo na árvore e no banco de dados base subjacente (chave/valor). Ambos definem arranjos chave/valor, mas o DB subjacente pode fazer uma tradicional busca de 1 passo pela chave. Procurar uma chave na árvore requer várias buscas no banco de dados subjacente para obter o valor final descrito acima. Vamos nos referir a este último como um `path` para eliminar ambiguidade.

As operações de atualização e exclusão em árvores radix são simples, e podem ser definidas da seguinte forma:

```
    def update(node,path,value):
        curnode = db.get(node) if node else [ NULL ] * 17
        newnode = curnode.copy()
        if path == '':
            newnode[-1] = value
        else:
            newindex = update(curnode[path[0]],path[1:],value)
            newnode[path[0]] = newindex
        db.put(hash(newnode),newnode)
        return hash(newnode)

    def delete(node,path):
        if node is NULL:
            return NULL
        else:
            curnode = db.get(node)
            newnode = curnode.copy()
            if path == '':
                newnode[-1] = NULL
            else:
                newindex = delete(curnode[path[0]],path[1:])
                newnode[path[0]] = newindex

            if all(x is NULL for x in newnode):
                return NULL
            else:
                db.put(hash(newnode),newnode)
                return hash(newnode)
```

Uma árvore Radix "Merkle" é construída ligando os nós usando digests de hash criptográficos gerados deterministicamente. Este endereçamento de conteúdo (no BD chave/valor `key == keccak256(rlp(value))`) fornece uma integridade criptográfica garantida do dado armazenado. Se o hash raiz de um Trie - teste - determinado for conhecido publicamente, então, qualquer um com acesso aos dados da folha subjacente poderá fornecer uma prova de que o Trie - teste - inclui um determinado valor em um caminho específico, fornecendo os hashes de cada nódulo que se junta a um valor específico para a raiz da árvore.

É impossível para um atacante fornecer uma prova de um par `(path, value)` que não exista, já que o hash raiz é, em última análise, baseado em todos os hashes abaixo dele. Qualquer modificação subjacente alteraria o hash raiz. Você pode pensar no hash como uma representação comprimida de informações estruturais sobre os dados, seguros pela proteção pré-imagem da função de hash.

Vamos nos referir a uma unidade atômica de uma árvore de radix (por exemplo, um único caractere hexadecimal, ou número binário de 4 bits) como um "nibble". Ao percorrerem um caminho um nibble de cada vez, conforme descrito acima, os nós podem fazer referência a 16 filhos, no máximo, mas incluir um elemento `value`. Portanto, nós os representamos como uma faixa de comprimento 17. Chamamos esses arrays de 17 elementos de "branch nodes".

## Árvore Merkle Patricia {#merkle-patricia-trees}

As árvores radix têm uma grande limitação: são ineficientes. Se você quiser armazenar uma vinculação `(path, value)` em que o caminho tem, como no Ethereum, 64 caracteres de comprimento (o número de nibbles em `bytes32`), você vai precisar de mais de um kilobyte de espaço extra para armazenar um nível por caractere, e cada busca ou exclusão precisará das 64 etapas completas. A árvore Patricia apresentada aqui resolve esta questão.

### Otimização {#optimization}

Um nó em uma árvore Merkle Patricia é um dos seguintes:

1.  `NULL` (representado como a string vazia)
2.  `branch` Um nó de 17 itens `[ v0 ... v15, vt ]`
3.  `leaf` Um nó de 2 itens `[ encodedPath, value ]`
4.  `extension` Um nó de 2 itens `[ encodedPath, key ]`

Com caminhos de 64 caracteres, é inevitável que depois de atravessar as primeiras poucas camadas da árvore, você alcançe um nó em que não existe caminho divergente para pelo menos parte do caminho para baixo. Para evitar ter que criar até 15 nós esparsos `NULL` ao longo do caminho, encurtamos a descida configurando um nó de ` extension` do formulário `[ encodedPath, key ]`, em que `encodedPath` contém o "caminho parcial" a ignorar (usando uma codificação compacta descrita abaixo), e a `key` é para a próxima pesquisa no banco de dados.

Para um nó de `leaf`, que pode ser marcado por um flag na primeira nibble do `encodedPath`, o caminho codifica todos os fragmentos de caminho do nó anterior e podemos procurar o `value` diretamente.

Esta otimização acima, porém, introduz ambiguidade.

Quando atravessamos caminhos em nibbles, podemos acabar com um número ímpar de nibbles para percorrer, mas porque todos os dados são armazenados no formato `bytes`. Não é possível diferenciar entre, por exemplo, o nibble `1` e os nibbles`01` (ambos devem ser armazenados como `<01>`). Para especificar comprimento ímpar, o caminho parcial é precedido com um flag.

### Especificação: Codificação compacta de sequência hexadecimal com terminador opcional {#specification}

A sinalização de _largura restante do caminho parcial, par ou ímpar,_ e de _nó leaf vs nó de extensão_ conforme descrito acima reside no primeiro nibble do caminho parcial de qualquer nó de 2 elementos. Eles resultam no seguinte:

    hex char    bits    |    node type partial     path length
    ----------------------------------------------------------
       0        0000    |       extension              even
       1        0001    |       extension              odd
       2        0010    |   terminating (leaf)         even
       3        0011    |   terminating (leaf)         odd

Para um comprimento restante de caminho par (`0` ou `2`), sempre seguirá um outro nibble "padding" `0`.

```
    def compact_encode(hexarray):
        term = 1 if hexarray[-1] == 16 else 0
        if term: hexarray = hexarray[:-1]
        oddlen = len(hexarray) % 2
        flags = 2 * term + oddlen
        if oddlen:
            hexarray = [flags] + hexarray
        else:
            hexarray = [flags] + [0] + hexarray
        // hexarray now has an even length whose first nibble is the flags.
        o = ''
        for i in range(0,len(hexarray),2):
            o += chr(16 * hexarray[i] + hexarray[i+1])
        return o
```

Exemplos:

```
    > [ 1, 2, 3, 4, 5, ...]
    '11 23 45'
    > [ 0, 1, 2, 3, 4, 5, ...]
    '00 01 23 45'
    > [ 0, f, 1, c, b, 8, 10]
    '20 0f 1c b8'
    > [ f, 1, c, b, 8, 10]
    '3f 1c b8'
```

Aqui está o código estendido para obter um nó na árvore Merkle Patricia:

```
    def get_helper(node,path):
        if path == []: return node
        if node = '': return ''
        curnode = rlp.decode(node if len(node) < 32 else db.get(node))
        if len(curnode) == 2:
            (k2, v2) = curnode
            k2 = compact_decode(k2)
            if k2 == path[:len(k2)]:
                return get(v2, path[len(k2):])
            else:
                return ''
        elif len(curnode) == 17:
            return get_helper(curnode[path[0]],path[1:])

    def get(node,path):
        path2 = []
        for i in range(len(path)):
            path2.push(int(ord(path[i]) / 16))
            path2.push(ord(path[i]) % 16)
        path2.push(16)
        return get_helper(node,path2)
```

### Árvore de exemplo {#example-trie}

Suponha que queremos um trie contendo quatro pares de caminho/valor `('do', 'verb')`, `('dog', 'puppy')`, `('doge', 'coins')`, `('horse', 'stallion')`.

Primeiro, convertemos ambos caminhos e valores para `bytes`. Abaixo, representações reais em bytes para _caminhos_ são indicadas por `<>`, embora _valores_ ainda sejam mostrados como strings, denotado por `''`, para melhor compreensão (eles, também, seriam `bytes`):

```
    <64 6f> : 'verb'
    <64 6f 67> : 'puppy'
    <64 6f 67 65> : 'coins'
    <68 6f 72 73 65> : 'stallion'
```

Agora, construímos uma árvore com os seguintes pares chave/valor no banco de dados subjacente:

```
    rootHash: [ <16>, hashA ]
    hashA:    [ <>, <>, <>, <>, hashB, <>, <>, <>, [ <20 6f 72 73 65>, 'stallion' ], <>, <>, <>, <>, <>, <>, <>, <> ]
    hashB:    [ <00 6f>, hashC ]
    hashC:    [ <>, <>, <>, <>, <>, <>, hashD, <>, <>, <>, <>, <>, <>, <>, <>, <>, 'verb' ]
    hashD:    [ <17>, [ <>, <>, <>, <>, <>, <>, [ <35>, 'coins' ], <>, <>, <>, <>, <>, <>, <>, <>, <>, 'puppy' ] ]
```

Quando um nó é referenciado dentro de outro nó, o que é incluído é `H(rlp.encode(node))`, onde `H(x) = keccak256(x) if len(x) >= 32 else x` e `rlp.encode` é a função de codificação [RLP](/developers/docs/data-structures-and-encoding/rlp).

Observe que, ao atualizar uma árvore, é necessário armazenar o par chave/valor `(keccak256(x), x)` em uma tabela de pesquisa persistente _se_ o nó recém-criado tem comprimento >= 32. Entretanto, se o nó é menor do que isso, não é preciso armazenar nada, já que a função f(x) = x é reversível.

## Árvores no Ethereum {#tries-in-ethereum}

Todas as árvores Merkle na camada de execução do Ethereum usam uma árvore Merkle Patricia.

Do cabeçalho do bloco há 3 raízes dessas 3 árvores.

1.  stateRoot
2.  transactionsRoot
3.  receiptsRoot

### Árvore de estado {#state-trie}

Existe um estado global da árvore que é atualizado toda vez que um cliente processa um bloco. Nela, um `path` é sempre: `keccak256(ethereumAddress)` e um `value` é sempre: `rlp(ethereumAccount)`. Mais especificamente uma `conta` Ethereum é uma array de 4 itens `[nonce,balance,storageRoot,codeHash]`. Neste ponto, vale a pena notar que este `storageRoot` é a raiz de outra árvore Patricia:

### Árvore de armazenamento {#storage-trie}

Árvore de armazenamento é onde _todos_ os dados de contrato se encontram. Há uma árvore de armazenamento separada para cada conta. Para recuperar valores em posições específicas de armazenamento em um determinado endereço, o endereço de armazenamento, posição inteira dos dados armazenados no armazenamento, e a ID do bloco, são necessárias. Eles podem então ser passados como argumentos para `eth_getStorageAt` definido na API JSON-RPC, por exemplo, para recuperar os dados no slot de armazenamento 0 para o endereço `0x295a70b2de5e3953354a6a8344e616ed314d7251`:

```
curl -X POST --data '{"jsonrpc":"2.0", "method": "eth_getStorageAt", "params": ["0x295a70b2de5e3953354a6a8344e616ed314d7251", "0x0", "latest"], "id": 1}' localhost:8545

{"jsonrpc":"2.0","id":1,"result":"0x00000000000000000000000000000000000000000000000000000000000004d2"}

```

Recuperar outros elementos no armazenamento é um pouco mais complicado, porque a posição na árvore de armazenamento deve ser calculada primeiro. A posição é calculada como o hash `keccak256` do endereço e da posição de armazenamento, ambos alinhados à esquerda com zeros para um comprimento de 32 bytes. Por exemplo, a posição para os dados no slot 1 de armazenamento para o endereço `0x391694e7e0b0cce554cb130d723a9d27458f9298` é:

```
keccak256(decodeHex("000000000000000000000000391694e7e0b0cce554cb130d723a9d27458f9298" + "0000000000000000000000000000000000000000000000000000000000000001"))
```

Em um console Geth, isso pode ser calculado da seguinte forma:

```
> var key = "000000000000000000000000391694e7e0b0cce554cb130d723a9d27458f9298" + "0000000000000000000000000000000000000000000000000000000000000001"
undefined
> web3.sha3(key, {"encoding": "hex"})
"0x6661e9d6d8b923d5bbaab1b96e1dd51ff6ea2a93520fdc9eb75d059238b8c5e9"
```

O `path` é, portanto, `keccak256(<6661e9d6d8b923d5bbaab1b96e1dd51ff6ea2a93520fdc9eb75d059238b8c5e9>)`. Isso agora pode ser usado para recuperar os dados da árvore de armazenamento como antes:

```
curl -X POST --data '{"jsonrpc":"2.0", "method": "eth_getStorageAt", "params": ["0x295a70b2de5e3953354a6a8344e616ed314d7251", "0x6661e9d6d8b923d5bbaab1b96e1dd51ff6ea2a93520fdc9eb75d059238b8c5e9", "latest"], "id": 1}' localhost:8545

{"jsonrpc":"2.0","id":1,"result":"0x000000000000000000000000000000000000000000000000000000000000162e"}
```

Nota: O `storageRoot` para uma conta Ethereum está vazio pelo padrão se ele não for uma conta de contrato.

### Árvore de transações {#transaction-trie}

Há uma árvore de transações separada para cada bloco, armazenando novamente pares `(key, value)`. Um caminho aqui é: `rlp(transactionIndex)` que representa a chave que corresponde a um valor determinado por:

```
if legacyTx:
  value = rlp(tx)
else:
  value = TxType | encode(tx)
```

Mais informações sobre isso podem ser encontradas na documentação do [EIP 2718](https://eips.ethereum.org/EIPS/eip-2718).

### Árvore de recibos {#receipts-trie}

Cada bloco tem sua própria árvore de recibos. Um `path` aqui é: `rlp(transactionIndex)`. `transactionIndex` é seu índice dentro do bloco em que foi incluído. A árvore de recibos nunca é atualizada. De maneira similar à árvore de Transações, existem recibos atuais e legados. Para consultar um recibo específico na árvore de Recibos, o índice da transação em seu bloco, o payload do recibo e o tipo de transação são necessários. O recibo retornado pode ser do tipo `Receipt`, que é definido como a concentração de `TransactionType` e `ReceiptPayload`, ou pode ser do tipo `LegacyReceipt`, que é definido como `rlp([status, acumulativoGasUsed, logsBloom, logs])`.

Mais informações sobre isso podem ser encontradas na documentação do [EIP 2718](https://eips.ethereum.org/EIPS/eip-2718).

## Leitura Adicional {#further-reading}

- [Árvore Merkle Patricia modificada: como o Ethereum salva um estado](https://medium.com/codechain/modified-merkle-patricia-trie-how-ethereum-saves-a-state-e6d7555078dd)
- [Fazendo Merkle no Ethereum](https://blog.ethereum.org/2015/11/15/merkling-in-ethereum/)
- [Entendendo a árvore Ethereum](https://easythereentropy.wordpress.com/2014/06/04/understanding-the-ethereum-trie/)
