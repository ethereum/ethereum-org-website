---
title: "Atestações"
description: "Uma descrição das atestações no Ethereum de prova de participação (proof-of-stake)."
lang: pt-br
---

Espera-se que um validador crie, assine e transmita uma atestação durante cada época. Esta página descreve como são essas atestações e como elas são processadas e comunicadas entre os clientes de consenso.

## O que é uma atestação? {#what-is-an-attestation}

A cada [época](/glossary/#epoch) (6,4 minutos), um validador transmite uma atestação para a rede. A atestação é para um slot específico na época. O objetivo da atestação é votar a favor da visão do validador sobre a cadeia, em particular a cabeça (head) da cadeia, o ponto de verificação justificado mais recente e o ponto de verificação no início da época atual (conhecidos como pontos de verificação `source` e `target`). Essas informações são combinadas para todos os validadores participantes, permitindo que a rede chegue a um consenso sobre o estado da blockchain.

Desde a [atualização Pectra](/roadmap/pectra/) ([EIP-7549](https://eips.ethereum.org/EIPS/eip-7549)), uma atestação de um único validador e uma atestação agregada têm formatos diferentes. A atestação de um único validador contém:

- `committee_index`: o comitê ao qual o validador pertence no slot fornecido
- `attester_index`: o índice do validador
- `data`: detalhes relacionados à atestação, conforme definido abaixo
- `signature`: a assinatura BLS do validador sobre o `data`

A primeira tarefa para um validador que está atestando é construir o `data`. O `data` contém as seguintes informações:

- `slot`: O número do slot ao qual a atestação se refere
- `index`: Definido como `0` desde a Pectra. O comitê é identificado fora do `data` (por `committee_index`, ou por `committee_bits` em um agregado) para que os votos de diferentes comitês tenham o mesmo `data` e possam ser agregados juntos. Antes da Pectra, este campo identificava o comitê
- `beacon_block_root`: O hash raiz do bloco que o validador vê na cabeça da cadeia (o resultado da aplicação do algoritmo de escolha de bifurcação)
- `source`: Parte do voto de finalidade indicando o que os validadores veem como o ponto de verificação justificado mais recente
- `target`: Parte do voto de finalidade indicando o que os validadores veem como o ponto de verificação no início da época atual (o bloco em seu primeiro slot, ou o bloco mais recente antes dele se esse slot estiver vazio)

Uma vez que o `data` é construído, o validador o assina e transmite a atestação para a [sub-rede](#aggregated-attestation) do seu comitê.

### Atestação agregada {#aggregated-attestation}

Há uma sobrecarga substancial associada à passagem desses dados pela rede para cada validador. Portanto, as atestações de validadores individuais são agregadas dentro de sub-redes antes de serem transmitidas de forma mais ampla. Isso inclui agregar assinaturas juntas para que uma atestação que é transmitida inclua o `data` de consenso e uma única assinatura formada pela combinação das assinaturas de todos os validadores que concordam com esse `data`. Uma atestação agregada contém:

- `aggregation_bits`: uma lista de bits (bitlist) com um bit por membro de cada comitê incluído, onde a posição mapeia para a posição do validador em seu comitê; o valor (0/1) indica se a assinatura desse validador está incluída
- `data`: os dados da atestação que cada validador incluído assinou
- `signature`: uma assinatura BLS que agrega as assinaturas dos validadores incluídos
- `committee_bits`: quais membros dos comitês são cobertos pela `aggregation_bits`

Qualquer pessoa pode verificar a assinatura agregada em relação às chaves públicas combinadas dos validadores cujos bits estão definidos.

Em cada slot, cerca de 16 membros de cada comitê são selecionados para serem seus `aggregators` (`TARGET_AGGREGATORS_PER_COMMITTEE`). Um validador descobre se foi selecionado a partir de sua própria assinatura sobre o número do slot. Os agregadores coletam todas as atestações que ouvem na sub-rede de seu comitê que têm o mesmo `data` que o seu, e as combinam, registrando o remetente de cada uma na `aggregation_bits`. Os agregadores então transmitem o agregado para a rede mais ampla.

Quando um validador é selecionado para ser um propositor de bloco, ele inclui atestações agregadas de slots recentes no novo bloco. Desde a Pectra, o proponente pode mesclar agregados de diferentes comitês que compartilham o mesmo `data` em uma única atestação, e um bloco pode conter até 8 delas.

### Ciclo de vida de inclusão da atestação {#attestation-inclusion-lifecycle}

1. Geração
2. Propagação
3. Agregação
4. Propagação
5. Inclusão

O ciclo de vida da atestação é descrito no esquema abaixo:

<AttestationsDiagram />

## Recompensas {#rewards}

Os validadores recebem uma recompensa por enviar atestações. A recompensa da atestação depende das flags de participação (origem, destino e cabeça), da recompensa base e da taxa de participação.

Cada uma das flags de participação pode ser verdadeira ou falsa, dependendo da atestação enviada e do seu atraso de inclusão.

O melhor cenário ocorre quando todas as três flags são verdadeiras, caso em que um validador ganharia (por flag correta):

`reward += base reward * flag weight * flag attesting rate / 64`

A taxa de atestação da flag é medida usando a soma dos saldos efetivos de todos os validadores que estão atestando para a flag fornecida em comparação com o saldo efetivo ativo total.

### Recompensa base {#base-reward}

A recompensa base é calculada de acordo com o número de validadores que estão atestando e seus saldos efetivos de ether em stake:

`base reward = validator effective balance x 2^6 / SQRT(Effective balance of all active validators)`

#### Atraso de inclusão {#inclusion-delay}

No momento em que os validadores votaram na cabeça da cadeia (`block n`), o `block n+1` ainda não havia sido proposto. Portanto, as atestações naturalmente são incluídas **um bloco depois**, de modo que todas as atestações que votaram no `block n` como a cabeça da cadeia foram incluídas no `block n+1` e, o **atraso de inclusão** é 1. O atraso de inclusão decide quais flags de participação uma atestação ganha:

- `head`: apenas se o atraso de inclusão for exatamente de 1 slot
- `source`: se o atraso de inclusão for de no máximo 5 slots (a raiz quadrada inteira dos 32 slots em uma época)
- `target`: sempre que a atestação for incluída (desde a atualização Deneb, [EIP-7045](https://eips.ethereum.org/EIPS/eip-7045))

Portanto, uma atestação incluída com dois slots de atraso perde sua recompensa de cabeça (head), mas ainda ganha as recompensas de origem (source) e destino (target).

### Cenários de atestação {#attestation-scenarios}

#### Validador votante ausente {#missing-voting-validator}

Uma atestação pode ser incluída em qualquer bloco a partir do slot seguinte ao qual foi feita até o final da época seguinte. Se uma atestação da época 0 não for incluída em um bloco durante a época 0, ela ainda poderá ser incluída na época 1, com um atraso de inclusão maior.

#### Agregador ausente {#missing-aggregator}

Cada comitê visa ter cerca de 16 agregadores em cada slot, de modo que a ausência de um agregador raramente impede que as atestações de um comitê sejam agregadas. Separadamente, cada nó do Beacon permanece inscrito em **duas sub-redes por 256 épocas** de cada vez, escolhidas a partir do seu ID de nó, o que mantém todas as sub-redes bem conectadas.

#### Propositor de bloco ausente {#missing-block-proposer}

Note que, em alguns casos, um agregador sortudo também pode se tornar o propositor de bloco. Se a atestação não foi incluída porque o propositor de bloco estava ausente, o próximo propositor de bloco pegaria a atestação agregada e a incluiria no próximo bloco. No entanto, o **atraso de inclusão** aumentará em um.

## Leitura adicional {#further-reading}

- [Atestações na especificação de consenso anotada por Vitalik](https://github.com/ethereum/annotated-spec/blob/master/phase0/beacon-chain.md#attestationdata)
- [Atestações no eth2book.info](https://eth2book.info/capella/part3/containers/dependencies/#attestationdata)
- [Atestações na especificação de consenso Electra](https://github.com/ethereum/consensus-specs/blob/master/specs/electra/beacon-chain.md#attestation)

_Conhece um recurso da comunidade que o ajudou? Edite esta página e adicione-o!_
