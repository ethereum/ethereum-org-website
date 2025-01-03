---
title: Codificação e estruturas de dados
description: Visão geral das estruturas de dados fundamentais do Ethereum
lang: pt-br
sidebarDepth: 2
---

O Ethereum cria, armazena e transfere grandes volumes de dados. Esses dados precisam ser formatados de maneiras padronizadas e eficientes em memória para permitir que qualquer pessoa [execute um nó](/run-a-node/) em um hardware de nível de consumo relativamente modesto. Para isso, várias estruturas de dados específicas são usadas na pilha do Ethereum.

## Pré-Requisitos {#prerequisites}

Você deve entender os fundamentos sobre o Ethereum e o [software cliente](/developers/docs/nodes-and-clients/). Recomenda-se familiaridade com a camada de rede e [o whitepaper sobre o Ethereum](/whitepaper/).

## Estruturas de dados {#data-structures}

### Árvores Merkle Patricia {#patricia-merkle-tries}

Árvores Merkle Patricia são estruturas que codificam pares de valor-chave em uma árvore determinística e criptograficamente autenticada. Estas são amplamente usadas em toda a camada de execução do Ethereum.

[Mais sobre Árvores Merkle Patricia](/developers/docs/data-structures-and-encoding/patricia-merkle-trie)

### Prefixo de comprimento recursivo (RLP) {#recursive-length-prefix}

Prefixo de comprimento recursivo (RLP) é um método de serialização usado extensivamente em toda a camada de execução do Ethereum.

[Mais sobre RLP](/developers/docs/data-structures-and-encoding/rlp)

### Serialização simples {#simple-serialize}

Serialização simples (SSZ) é o formato de serialização dominante na camada de consenso do Ethereum devido à sua compatibilidade com a "merklelização".

[Mais sobre SSZ](/developers/docs/data-structures-and-encoding/ssz)
