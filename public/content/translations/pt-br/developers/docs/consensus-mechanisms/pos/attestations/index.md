---
title: "Atestações"
description: "Uma descrição de atestações em prova de participação Ethereum."
lang: pt-br
---

Espera-se que um validador crie, assine e transmita uma atestação durante cada época. Esta página descreve como são esses certificados e como eles são processados e comunicados entre clientes de consenso.

## O que é uma atestação? {#what-is-an-attestation}

A cada [época](/glossary/#epoch) (6,4 minutos), um validador propõe uma atestação para a rede. A atestação é para um espaço específico na época. O objetivo da atestação é votar a favor da visão do validador da cadeia, em particular, o bloco justificado mais recente e o primeiro bloco na época atual (conhecidos como pontos de verificação `source` e `target`). Essas informações são combinadas por todos os validadores participantes, permitindo que a rede chegue a consenso sobre o estado da blockchain.

A atestação contém os seguintes componentes:

- `aggregation_bits`: uma bitlist de validadores onde a posição mapeia para o índice do validador em seu comitê; o valor (0/1) indica se o validador assinou o `data` (ou seja, se ele está ativo e concorda com o proponente de bloco)
- `data`: detalhes relacionados à atestação, conforme definido abaixo
- `signature`: uma assinatura BLS que agrega as assinaturas de validadores individuais

A primeira tarefa de um validador de atestação é construir o `data`. O `data` contém as seguintes informações:

- `slot`: o número do slot ao qual a atestação se refere
- `index`: um número que identifica a qual comitê o validador pertence em um determinado slot
- `beacon_block_root`: hash raiz do bloco que o validador vê no cabeçalho da cadeia (o resultado da aplicação do algoritmo de escolha de bifurcação)
- `source`: parte do voto de finalidade que indica o que os validadores veem como o bloco justificado mais recente
- `target`: parte do voto de finalidade que indica o que os validadores veem como o primeiro bloco na época atual

Depois que o `data` for construído, o validador pode inverter o bit no `aggregation_bits` correspondente ao seu próprio índice de validador de 0 para 1 para mostrar que participou.

Finalmente, o validador assina a atestação e o transmite para a rede.

### Atestação agregada {#aggregated-attestation}

Há uma sobrecarga substancial associada ao envio desses dados em torno da rede para cada validador. Portanto, as atestações de validadores individuais são agregados dentro das sub-redes antes de serem transmitidas de forma mais ampla. Isso inclui agregar assinaturas para que uma atestação transmitida inclua o `data` de consenso e uma única assinatura formada pela combinação das assinaturas de todos os validadores que concordam com esse `data`. Isso pode ser verificado usando `aggregation_bits`, pois isso fornece o índice de cada validador em seu comitê (cujo ID é fornecido em `data`), que pode ser usado para consultar assinaturas individuais.

Em cada época, 16 validadores em cada sub-rede são selecionados para serem os `agregadores`. Os agregadores coletam todas as atestações que recebem pela rede gossip que têm `data` equivalente aos seus. O remetente de cada atestação correspondente é registrado no `aggregation_bits`. Os agregadores então transmitem a agregação de atestação para a rede mais ampla.

Quando um validador é selecionado para ser um proponente de blocos, eles empacotam as atestações das sub-redes até o último slot do novo bloco.

### Ciclo de vida de inclusão da atestação {#attestation-inclusion-lifecycle}

1. Geração
2. Propagação
3. Agregação
4. Propagação
5. Inclusão

O ciclo de vida da atestação está delineado no esquema abaixo:

![ciclo de vida da atestação](./attestation_schematic.png)

## Recompensas {#rewards}

Validadores são recompensados por enviar os atestações. A recompensa da atestação depende dos sinalizadores de participação (fonte, destino e cabeçalho), da recompensa básica e da taxa de participação.

Cada um dos sinalizadores de participação pode ser verdadeiro ou falso, dependendo da atestação enviada e do atraso de inclusão dela.

O melhor cenário ocorre quando todos os três sinalizadores são verdadeiros, caso em que um validador ganharia (por sinalizador correto):

`recompensa += recompensa base * peso do sinalizador * taxa de atestação do sinalizador / 64`

A taxa de atestação do sinalizador é medida usando a soma dos saldos efetivos de todos os validadores de atestação do sinalizador em questão em comparação com o saldo real do ativo total.

### Recompensa base {#base-reward}

A recompensa base é calculada de acordo com o número de validadores atestadores e seus saldos efetivos de ether em stake:

`recompensa base = saldo efetivo do validador x 2^6 / SQRT(saldo efetivo de todos os validadores ativos)`

#### Atraso na inclusão {#inclusion-delay}

No momento em que os validadores votaram no cabeçalho da cadeia (`bloco n`), o `bloco n+1` ainda não havia sido proposto. Portanto, as atestações são naturalmente incluídas **um bloco depois**, de modo que todas as atestações que votaram no `bloco n` como cabeçalho da cadeia foram incluídas no `bloco n+1`, e o **atraso na inclusão** é de 1. Se o atraso de inclusão dobrar para dois slots, a recompensa da atestação cai pela metade, porque para calcular a recompensa da atestação, a recompensa base é multiplicada pelo recíproco do atraso de inclusão.

### Cenários de atestação {#attestation-scenarios}

#### Validador de votação ausente {#missing-voting-validator}

Validadores têm um máximo de 1 época para enviar sua atestação. Se a atestação foi perdido na época 0, eles podem enviá-lo com um atraso na inclusão na época 1.

#### Agregador ausente {#missing-aggregator}

Existem 16 Agregadores por época no total. Além disso, validadores aleatórios se inscrevem em **duas sub-redes por 256 épocas** e servem como backup caso os agregadores estejam ausentes.

#### Proponente de bloco ausente {#missing-block-proposer}

Observe que, em alguns casos, um agregador de sorte também pode se tornar o proponente de blocos. Se a atestação não foi incluída porque o proponente de bloco foi perdido, o proponente do próximo bloco pega a atestação agregada e a inclui no próximo bloco. No entanto, o **atraso na inclusão** aumentará em um.

## Leitura adicional {#further-reading}

- [Atestações na especificação de consenso anotada do Vitalik](https://github.com/ethereum/annotated-spec/blob/master/phase0/beacon-chain.md#attestationdata)
- [Atestações em eth2book.info](https://eth2book.info/capella/part3/containers/dependencies/#attestationdata)

_Conhece um recurso da comunidade que o ajudou? Edite esta página e adicione-a!_
