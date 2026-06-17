---
title: Atestações
description: Uma descrição das atestações no Ethereum de prova de participação (proof-of-stake).
lang: pt-br
---

Espera-se que um validador crie, assine e transmita uma atestação durante cada época. Esta página descreve como são essas atestações e como elas são processadas e comunicadas entre os clientes de consenso.

## O que é uma atestação? {#what-is-an-attestation}

A cada [época](/glossary/#epoch) (6,4 minutos), um validador propõe uma atestação para a rede. A atestação é para um slot específico na época. O objetivo da atestação é votar a favor da visão do validador sobre a cadeia, em particular o bloco justificado mais recente e o primeiro bloco na época atual (conhecidos como pontos de verificação (checkpoints) `source` e `target`). Essas informações são combinadas para todos os validadores participantes, permitindo que a rede chegue a um consenso sobre o estado da blockchain.

A atestação contém os seguintes componentes:

- `aggregation_bits`: uma lista de bits (bitlist) de validadores onde a posição mapeia para o índice do validador em seu comitê; o valor (0/1) indica se o validador assinou os `data` (ou seja, se eles estão ativos e concordam com o propositor de bloco)
- `data`: detalhes relacionados à atestação, conforme definido abaixo
- `signature`: uma assinatura BLS que agrega as assinaturas de validadores individuais

A primeira tarefa para um validador que está atestando é construir os `data`. Os `data` contêm as seguintes informações:

- `slot`: O número do slot ao qual a atestação se refere
- `index`: Um número que identifica a qual comitê o validador pertence em um determinado slot
- `beacon_block_root`: O hash raiz do bloco que o validador vê no topo (head) da cadeia (o resultado da aplicação do algoritmo de escolha de bifurcação)
- `source`: Parte do voto de finalidade indicando o que os validadores veem como o bloco justificado mais recente
- `target`: Parte do voto de finalidade indicando o que os validadores veem como o primeiro bloco na época atual

Uma vez que os `data` são construídos, o validador pode alterar o bit em `aggregation_bits` correspondente ao seu próprio índice de validador de 0 para 1 para mostrar que participou.

Por fim, o validador assina a atestação e a transmite para a rede.

### Atestação agregada {#aggregated-attestation}

Há uma sobrecarga substancial associada à passagem desses dados pela rede para cada validador. Portanto, as atestações de validadores individuais são agregadas em sub-redes antes de serem transmitidas de forma mais ampla. Isso inclui agregar assinaturas juntas para que uma atestação que é transmitida inclua os `data` de consenso e uma única assinatura formada pela combinação das assinaturas de todos os validadores que concordam com esses `data`. Isso pode ser verificado usando `aggregation_bits`, pois isso fornece o índice de cada validador em seu comitê (cujo ID é fornecido em `data`), que pode ser usado para consultar assinaturas individuais.

Em cada época, 16 validadores em cada sub-rede são selecionados para serem os `aggregators`. Os agregadores coletam todas as atestações das quais ouvem falar na rede de fofocas (gossip network) que têm `data` equivalentes aos seus. O remetente de cada atestação correspondente é registrado em `aggregation_bits`. Os agregadores então transmitem o agregado de atestações para a rede mais ampla.

Quando um validador é selecionado para ser um propositor de bloco, ele empacota as atestações agregadas das sub-redes até o slot mais recente no novo bloco.

### Ciclo de vida de inclusão da atestação {#attestation-inclusion-lifecycle}

1. Geração
2. Propagação
3. Agregação
4. Propagação
5. Inclusão

O ciclo de vida da atestação é descrito no esquema abaixo:

![attestation lifecycle](./attestation_schematic.png)

## Recompensas {#rewards}

Os validadores recebem recompensas por enviar atestações. A recompensa da atestação depende das flags de participação (origem, destino e topo), da recompensa base e da taxa de participação.

Cada uma das flags de participação pode ser verdadeira ou falsa, dependendo da atestação enviada e do seu atraso de inclusão.

O melhor cenário ocorre quando todas as três flags são verdadeiras, caso em que um validador ganharia (por flag correta):

`reward += base reward * flag weight * flag attesting rate / 64`

A taxa de atestação da flag é medida usando a soma dos saldos efetivos de todos os validadores que atestam para a flag fornecida em comparação com o saldo efetivo ativo total.

### Recompensa base {#base-reward}

A recompensa base é calculada de acordo com o número de validadores que atestam e seus saldos efetivos de ether em stake:

`base reward = validator effective balance x 2^6 / SQRT(Effective balance of all active validators)`

#### Atraso de inclusão {#inclusion-delay}

No momento em que os validadores votaram no topo da cadeia (`block n`), `block n+1` ainda não havia sido proposto. Portanto, as atestações são naturalmente incluídas **um bloco depois**, de modo que todas as atestações que votaram em `block n` como o topo da cadeia foram incluídas em `block n+1` e o **atraso de inclusão** é 1. Se o atraso de inclusão dobrar para dois slots, a recompensa da atestação cai pela metade, porque para calcular a recompensa da atestação, a recompensa base é multiplicada pelo recíproco do atraso de inclusão.

### Cenários de atestação {#attestation-scenarios}

#### Validador votante ausente {#missing-voting-validator}

Os validadores têm no máximo 1 época para enviar sua atestação. Se a atestação foi perdida na época 0, eles podem enviá-la com um atraso de inclusão na época 1.

#### Agregador ausente {#missing-aggregator}

Existem 16 agregadores por época no total. Além disso, validadores aleatórios se inscrevem em **duas sub-redes por 256 épocas** e servem como backup caso os agregadores estejam ausentes.

#### Propositor de bloco ausente {#missing-block-proposer}

Observe que, em alguns casos, um agregador sortudo também pode se tornar o propositor de bloco. Se a atestação não foi incluída porque o propositor de bloco desapareceu, o próximo propositor de bloco pegaria a atestação agregada e a incluiria no próximo bloco. No entanto, o **atraso de inclusão** aumentará em um.

## Leitura adicional {#further-reading}

- [Atestações na especificação de consenso anotada de Vitalik](https://github.com/ethereum/annotated-spec/blob/master/phase0/beacon-chain.md#attestationdata)
- [Atestações no eth2book.info](https://eth2book.info/capella/part3/containers/dependencies/#attestationdata)

_Conhece um recurso da comunidade que o ajudou? Edite esta página e adicione-o!_