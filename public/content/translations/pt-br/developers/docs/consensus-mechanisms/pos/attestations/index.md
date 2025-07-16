---
title: Atestações
description: Uma descrição de atestações em prova de participação Ethereum.
lang: pt-br
---

Espera-se que um validador crie, assine e transmita uma atestação durante cada época. Esta página descreve como são esses certificados e como eles são processados e comunicados entre clientes de consenso.

## O que é uma atestação? {#what-is-an-attestation}

A cada [época](/glossary/#epoch) (6,4 minutos) um validador propõe uma atestação para a rede. A atestação é para um espaço específico na época. O objetivo da atestação é votar a favor da visão do validador da cadeia, em particular, o bloco justificado mais recente e o primeiro bloco na época atual (conhecidos como pontos de verificação `source` e `target`). Essas informações são combinadas por todos os validadores participantes, permitindo que a rede chegue a consenso sobre o estado da blockchain.

A atestação contém os seguintes componentes:

- `aggregation_bits`: uma lista de bits de validadores onde a posição mapeia para o índice do validador em seu comitê; o valor (0/1) indica se o validador assinou os `data` (ou seja, se eles estão ativos e concordam com o proponente de blocos)
- `data`: detalhes relacionados à atestação, conforme definido abaixo
- `signature`: uma assinatura BLS que agrega as assinaturas de validadores individuais

A primeira tarefa para um validador de atestação é construir os `data`. Os `data` contém as seguintes informações:

- `slot`: O número do slot ao qual a atestação se refere
- `index`: Um número que identifica a qual comitê o validador pertence em um determinado slot
- `beacon_block_root`: Hash raiz do bloco que o validador vê à cabeça da cadeia (o resultado da aplicação do algoritmo de escolha de fork)
- `source`: Parte do voto de finalidade indicando o que os validadores veem como o bloco justificado mais recente
- `source`: Parte do voto de finalidade indicando o que os validadores veem como o primeiro bloco na época atual

Quando o `data` for construído, o validador pode virar o bit em `agregation_bits` correspondente a seu próprio índice validador de 0 a 1 para mostrar que eles participaram.

Finalmente, o validador assina a atestação e o transmite para a rede.

### Atestação agregada {#aggregated-attestation}

Há uma sobrecarga substancial associada ao envio desses dados em torno da rede para cada validador. Portanto, as atestações de validadores individuais são agregados dentro das sub-redes antes de serem transmitidas de forma mais ampla. Isso inclui agregar assinaturas juntas para que uma atestação que é transmitida inclua `data` de consenso e uma única assinatura formada por combinar as assinaturas de todos os validadores que concordam com `data`. Isso pode ser verificado usando `aggregation_bits` porque fornece o índice de cada validador em seu comitê (cuja ID é fornecida em `data`) que podem ser usados para consultar assinaturas individuais.

Em cada período, 16 validadores em cada sub-rede são selecionados para serem os `agregadores`. Os agregadores coletam todas as atestações que ouvem na rede gossip que têm `dados` equivalentes aos deles. O remetente de cada atestação correspondente é registrado nos `agregation_bits`. Os agregadores então transmitem a agregação de atestação para a rede mais ampla.

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

`base reward = validator effective balance x 2^6 / SQRT(Effective balance of all active validators)`

#### Atraso de inclusão {#inclusion-delay}

No momento em que os validadores votaram no topo da cadeia (`bloco n`), `bloco n+1` ainda não foi proposto. Portanto, as atestações naturalmente são incluídas **um bloco mais tarde** de modo que todas as atestações que votaram no `block n` sendo a cabeça da cadeia foram incluídos no `block n+1` e o **atraso de inclusão** é 1. Se o atraso de inclusão dobrar para dois slots, a recompensa da atestação cai pela metade, porque para calcular a recompensa da atestação, a recompensa base é multiplicada pelo recíproco do atraso de inclusão.

### Cenários de atestação {#attestation-scenarios}

#### Validador votante faltante {#missing-voting-validator}

Validadores têm um máximo de 1 época para enviar sua atestação. Se a atestação foi perdido na época 0, eles podem enviá-lo com um atraso na inclusão na época 1.

#### Agregador faltante {#missing-aggregator}

Existem 16 Agregadores por época no total. Além disso, os validadores aleatórios inscrevem-se para **duas sub-redes por 256 épocas** e servem como um backup caso agregadores estejam faltando.

#### Proponente de bloco faltante {#missing-block-proposer}

Observe que, em alguns casos, um agregador de sorte também pode se tornar o proponente de blocos. Se a atestação não foi incluída porque o proponente de bloco foi perdido, o proponente do próximo bloco pega a atestação agregada e a inclui no próximo bloco. No entanto, o **atraso de inclusão** aumentará em um.

## Leitura adicional {#further-reading}

- [Atestações na especificação anotada de consenso de Vitalik](https://github.com/ethereum/annotated-spec/blob/master/phase0/beacon-chain.md#attestationdata)
- [Atestações em eth2book.info](https://eth2book.info/capella/part3/containers/dependencies/#attestationdata)

_Conhece um recurso da comunidade que ajudou você? Edite essa página e adicione!_
