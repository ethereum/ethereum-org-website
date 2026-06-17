---
title: Estruturas de dados e codificação
description: Uma visão geral das estruturas de dados fundamentais do Ethereum.
lang: pt-br
sidebarDepth: 2
---

O Ethereum cria, armazena e transfere grandes volumes de dados. Esses dados devem ser formatados de maneiras padronizadas e eficientes em termos de memória para permitir que qualquer pessoa possa [executar um nó](/run-a-node/) em hardware de nível de consumidor relativamente modesto. Para alcançar isso, várias estruturas de dados específicas são usadas na pilha do Ethereum.

## Pré-requisitos {#prerequisites}

Você deve entender os fundamentos do Ethereum e do [software de cliente](/developers/docs/nodes-and-clients/). É recomendada a familiaridade com a camada de rede e com [o whitepaper do Ethereum](/whitepaper/).

## Estruturas de dados {#data-structures}

### Tries de Patricia Merkle {#patricia-merkle-tries}

As Tries de Patricia Merkle são estruturas que codificam pares de chave-valor em uma trie determinística e autenticada criptograficamente. Elas são usadas extensivamente em toda a camada de execução do Ethereum.

[Mais sobre as Tries de Patricia Merkle](/developers/docs/data-structures-and-encoding/patricia-merkle-trie)

### Recursive Length Prefix {#recursive-length-prefix}

O Recursive Length Prefix (RLP) é um método de serialização usado extensivamente em toda a camada de execução do Ethereum.

[Mais sobre RLP](/developers/docs/data-structures-and-encoding/rlp)

### Simple Serialize {#simple-serialize}

O Simple Serialize (SSZ) é o formato de serialização dominante na camada de consenso do Ethereum devido à sua compatibilidade com a merkleização.

[Mais sobre SSZ](/developers/docs/data-structures-and-encoding/ssz)