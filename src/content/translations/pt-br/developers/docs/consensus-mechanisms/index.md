---
title: Mecanismos de consenso
description: Uma explicação dos protocolos de consenso em sistemas distribuídos e o papel que desempenham no Ethereum.
lang: pt-br
incomplete: true
---

Quando se trata de blockchains como Ethereum, que são, na essência, bancos de dados distribuídos, os nós da rede devem ser capazes de chegar a um acordo sobre o estado atual do sistema. Isso é obtido por meio de mecanismos de consenso.

Embora os mecanismos de consenso não estejam diretamente relacionados à construção de um dapp, entendê-los irá esclarecer conceitos relevantes para você e para a experiência dos seus usuários, como preços de gás e tempos de transação.

## Pré-requisitos {#prerequisites}

Para melhor entender esta página, recomendamos que você leia primeiro a nossa [introdução ao Ethereum](/developers/docs/intro-to-ethereum/).

## O que é consenso? {#what-is-consensus}

Por consenso, queremos dizer que se chegou a um acordo geral. Considere um grupo de pessoas indo ao cinema. Se não houver desacordo quanto a uma proposta de escolha do filme, então haverá consenso. No caso extremo, o grupo eventualmente se separará.

Em relação à blockchain, chegar a consenso significa que pelo menos 51% dos nós da rede concordam no próximo estado global da rede.

## O que é um mecanismo de consenso? {#what-is-a-consensus-mechanism}

Mecanismos de consenso (também conhecidos como protocolos de consenso ou algoritmos de consenso) permitem que sistemas distribuídos (redes de computadores) trabalhem juntos e permaneçam seguros.

Por décadas, esses mecanismos foram usados ​​para estabelecer consenso entre nós de banco de dados, servidores de aplicativos e outras infraestruturas corporativas. Nos últimos anos, novos protocolos de consenso foram inventados para permitir que sistemas criptoeconômicos, como o Ethereum, concordem com o estado da rede.

Um mecanismo de consenso em um sistema de criptomoedas também ajuda a prevenir certos tipos de ataques econômicos. Em teoria, um invasor pode comprometer o consenso, controlando 51% da rede. Os mecanismos de consenso são projetados para tornar este "ataque de 51%" inviável. Diferentes mecanismos são projetados para resolver esse problema de segurança de diferentes formas.

<YouTube id="dylgwcPH4EA" />

## Tipos de mecanismos de consenso {#types-of-consensus-mechanisms}

### Prova de trabalho {#proof-of-work}

Ethereum, como Bitcoin, atualmente usa um protocolo de consenso denominado ** prova de trabalho (PoW) **.

#### Criação de blocos {#pow-block-creation}

Prova de trabalho é feita por [mineradores](/developers/docs/consensus-mechanisms/pow/mining/), que competem para criar novos blocos cheios de transações processadas. O ganhador compartilha o novo bloco com o restante da rede e ganha alguns ETH recentemente nomeados. A corrida é vencida pelo computador que puder resolver de forma mais rápida um quebra-cabeça matemático, e isso produz a ligação criptografada entre o bloco atual e o bloco que venceu anteriormente. Resolver o quebra-cabeça é o trabalho na "prova de trabalho".

#### Segurança {#pow-security}

A rede é mantida segura pelo fato de que você precisaria de 51% da capacidade dos computadores da rede para defraudar a corrente. Isso exigiria investimentos tão grandes em equipamentos e energia que bastante provável que você teria mais prejuízos do que lucros.

Mais sobre [ prova de trabalho (PoW)](/developers/docs/consensus-mechanisms/pow/)

### Prova de participação {#proof-of-stake}

Ethereum, como Bitcoin, atualmente usa um protocolo de consenso denominado ** prova de trabalho (PoW) **.

#### Criação de blocos {#pos-block-creation}

A prova de participação (PoS) é feita por validadores que tiverem comprometido ETH para participar do sistema. Um validador é escolhido aleatoriamente para criar novos blocos, compartilhá-los com a rede e ganhar recompensas. Em vez de precisar fazer um intenso trabalho computacional, você simplesmente precisa ter apostado seus ETH na rede. É isto que incentiva o comportamento saudável da rede.

#### Segurança {#pos-security}

O sistema de prova de participação é mantido seguro pelo falo de que seriam necessários 51% do total de ETH acumulados (staked) para defraudar a corrente. Além disso, seus ETH apostados poderiam se ver comprometidos por comportamentos maliciosos.

Mais sobre [ prova de participação (PoS)](/developers/docs/consensus-mechanisms/pos/)

### Um guia visual {#types-of-consensus-video}

Saiba mais sobre os diferentes tipos de mecanismos de consenso utilizados no Ethereum:

<YouTube id="ojxfbN78WFQ" />

### Resistência a ataques Sybil e seleção de cadeia {#sybil-chain}

Agora, tecnicamente falando, a prova de trabalho e a prova de participação não são protocolos de consenso por si só, mas são frequentemente referidos como tal para simplificar o entendimento. Na verdade, são mecanismos de resistência a ataques Sybil e bloqueiam os seletores de autores; são uma maneira de decidir quem é o autor do bloco mais recente. É este mecanismo de resistência a ataques Sybil combinado com uma regra de seleção de cadeia que constitui um verdadeiro mecanismo de consenso.

**A resistência a ataques Sybil** mede como um protocolo varia contra um [ataque Sybil](https://wikipedia.org/wiki/Sybil_attack). Ataques Sybil são quando um usuário ou grupo finge ser muitos usuários. A resistência a esse tipo de ataque é essencial para uma blockchain descentralizada e permite que os mineradores e validadores sejam recompensados igualmente com base nos recursos colocados. A prova de trabalho e a prova de participação protegem contra isso fazendo os usuários gastarem muita energia ou colocarem muitas garantias. Estas protecções são um elemento econômico dissuasor dos ataques Sybil.

Uma regra de seleção de cadeia de \*\*\*\* é usada para decidir qual é a cadeia "correta". Ethereum e Bitcoin usam atualmente a regra "cadeia mais longa", o que quer dizer que qualquer que seja a blockchain mais longa vai ser aquela a qual o resto dos nós aceitem como válida e trabalhem com ela. Para as cadeias de prova de trabalho, a cadeia mais longa é determinada pela dificuldade cumulativa total da prova de trabalho.

A combinação da prova de trabalho e da regra da cadeia mais longa é conhecida como "Consenso de Nakamoto"

A [Beacon Chain](/upgrades/beacon-chain/) usa um mecanismo de consenso chamado [Casper the Friendly Finality Gadget](https://arxiv.org/abs/1710.09437), baseado na prova de participação.

## Leitura adicional {#further-reading}

- [O que é um algoritmo de consenso de blockchain?](https://academy.binance.com/en/articles/what-is-a-blockchain-consensus-algorithm)
- [O que é Consenso de Nakamoto? Guia completo do principiante](https://blockonomi.com/nakamoto-consensus/)
- [Como o Casper funciona?](https://medium.com/unitychain/intro-to-casper-ffg-9ed944d98b2d)
- [Sobre a segurança e o desempenho das blockchains de prova de trabalho](https://eprint.iacr.org/2016/555.pdf)

_Conhece algum recurso da comunidade que o ajudou? Edite essa página e adicione!_

## Tópicos relacionados {#related-topics}

- [Prova de trabalho](/developers/docs/consensus-mechanisms/pow/)
- [Mineração](/developers/docs/consensus-mechanisms/pow/mining/)
- [Prova de participação](/developers/docs/consensus-mechanisms/pos/)
