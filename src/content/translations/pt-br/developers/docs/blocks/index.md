---
title: Blocos
description: Uma visão geral dos blocos na blockchain do Ethereum — sua estrutura de dados, por que são necessários e como são feitos.
lang: pt-br
---

Blocos são lotes de transações com um hash do bloco anterior na cadeia. Isso une os blocos (em uma cadeia) porque os hashes são criptograficamente derivados dos dados do bloco. Isso previne fraudes, porque uma mudança em qualquer bloco no histórico invalidaria todos os blocos subsequentes, alteraria todos os hashes subsequentes e todos que estivessem executando o blockchain notariam.

## Pré-requisitos {#prerequisites}

Os blocos são um tópico muito amigável para iniciantes. Mas para ajudá-lo a entender melhor esta página, recomendamos que você primeiro leia [Contas](/developers/docs/accounts/), [Transações](/developers/docs/transactions/)e nossa [introdução ao Ethereum](/developers/docs/intro-to-ethereum/).

## Por que blocos? {#why-blocks}

Para garantir que todos os participantes da rede Ethereum mantenham um estado sincronizado e concordem com o histórico preciso de transações, nós processamos lotes de transações em blocos. Isso significa que dezenas (ou centenas) de transações são confirmadas, aceitas e sincronizadas de uma só vez.

![Um diagrama mostrando transações em um bloco causando mudanças de estado](./tx-block.png) _Diagrama adaptado de [Ethereum EVM ilustrado](https://takenobu-hs.github.io/downloads/ethereum_evm_illustrated.pdf)_

Ao espaçar os conjuntos de alterações, damos a todos os participantes da rede tempo suficiente para chegar a um consenso: mesmo que os pedidos de transação ocorram dezenas de vezes por segundo, os blocos no Ethereum são confirmados, aproximadamente, uma vez a cada quinze segundos.

## Como os blocos funcionam {#how-blocks-work}

Para preservar o histórico de transação, os blocos são estritamente ordenados (cada novo bloco criado contém uma referência ao seu bloco de origem), e as transações dentro dos blocos também são ordenadas estritamente. Exceto em casos raros, a qualquer momento, todos os participantes da rede concordam com o número exato e o histórico de blocos, e estão trabalhando para processar em lote as solicitações atuais de transações para o bloco seguinte.

Uma vez que um bloco é montado (minerado) por algum minerador na rede, ele é propagado para o resto da rede; todos os nós adicionam este bloco ao final de suas blockchain e a mineração continua. O processo exato de montagem de blocos (mineração) e o processo de compromisso/consenso são, atualmente, especificados pelo protocolo de prova de trabalho do Ethereum.

### Uma demonstração visual {#a-visual-demo}

<YouTube id="_160oMzblY8" />

## Protocolo de prova de trabalho {#proof-of-work-protocol}

Prova de trabalho significa o seguinte:

- Os nós de mineração (Mining nodes) precisam gastar uma quantidade variável, mas substancial de energia, tempo e poder computacional para produzir um "certificado de legitimidade" para um bloco que eles propõem à rede. Isso ajuda a proteger a rede de ataques de spam/DoS, entre outros, já que os certificados são caros de produzir.
- Outros mineradores que ficarem sabendo sobre um novo bloco, com um certificado de legitimidade válido, devem aceitar o novo bloco como o próximo bloco canônico na blockchain.
- A quantidade exata de tempo necessário para qualquer minerador produzir este certificado é uma variável aleatória com alta variação. Isso garante que é improvável que dois mineradores produzam validações, simultaneamente, para um próximo bloco proposto; quando um minerador produz e propaga um novo bloco certificado, eles podem ter quase certeza de que o bloco será aceito pela rede como o próximo bloco canônico na blockchain, sem conflito (embora exista um protocolo para lidar com conflitos, assim como, o caso de duas cadeias de blocos certificados serem produzidas quase simultaneamente).

[Mais sobre mineração](/developers/docs/consensus-mechanisms/pow/mining/)

## O que há em um bloco? {#block-anatomy}

- `timestamp`: o horário em que o bloco foi minerado.
- `blockNumber`: o comprimento da blockchain em blocos.
- `baseFeePerGas`: a taxa mínima por gás necessária para que uma transação seja incluída no bloco.
- `difficulty`: o esforço necessário para minerar o bloco.
- `mixHash`: um identificador exclusivo para esse bloco.
- `parentHash`: o identificador exclusivo do bloco que veio antes (é assim que os blocos são vinculados em uma cadeia).
- `transactions`: as transações incluídas no bloco.
- `stateRoot`: todo o estado do sistema — saldo da conta, armazenamento do contrato, código de contrato e nonces da conta.
- `nonce`: um hash que, quando combinado com o mixHash, prova que o bloco passou por [prova de trabalho](/developers/docs/consensus-mechanisms/pow/).

## Tempo de bloco {#block-time}

Tempo de bloco se refere ao tempo que se leva para minerar um novo bloco. No Ethereum, o tempo médio do bloco está entre 12 a 14 segundos e é avaliado após cada bloco. O tempo esperado de bloco é definido como uma constante no nível do protocolo e é usado para proteger a segurança da rede quando os mineradores adicionam mais poder computacional. O tempo médio do bloco é comparado com o tempo esperado do bloco, e se a média do tempo de bloco for maior, então a dificuldade será diminuída no cabeçalho do bloco. Se o tempo médio de bloco for menor, então a dificuldade no cabeçalho do bloco será aumentada.

## Tamanho do bloco {#block-size}

Uma nota final importante é que os blocos em si são delimitados em tamanho. Cada bloco tem um tamanho alvo de 15 milhões de gás, mas o tamanho dos blocos vai aumentar ou diminuir de acordo com as demandas da rede, até o limite do bloco de 30 milhões de gás (2 vezes o tamanho do bloco de destino). A quantidade total de gás gasto por todas as transações no bloco deve ser inferior ao limite de gás do bloco. Isso é importante porque garante que os blocos não podem ser, arbitrariamente, grandes. Se os blocos pudessem ser arbitrariamente grandes, os full nodes (nós completos) com menos desempenho iriam gradualmente deixar de ser capazes de acompanhar a rede devido aos requisitos de espaço e velocidade.

## Leitura adicional {#further-reading}

_Conhece algum recurso da comunidade que o ajudou? Edite essa página e adicione!_

## Tópicos relacionados {#related-topics}

- [Mineração](/developers/docs/consensus-mechanisms/pow/mining/)
- [Transações](/developers/docs/transactions/)
- [Gás](/developers/docs/gas/)
