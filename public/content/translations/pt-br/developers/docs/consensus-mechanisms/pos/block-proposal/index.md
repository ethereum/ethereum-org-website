---
title: Proposta de bloco
description: "Explicação de como os blocos são propostos na Prova de Participação (PoS) do Ethereum."
lang: pt-br
---

Os blocos são as unidades fundamentais da blockchain. Blocos são unidades discretas de informação que são passadas entre os nós, acordadas e adicionadas ao banco de dados de cada nó. Esta página explica como eles são produzidos.

## Pré-requisitos {#prerequisites}

A proposta de bloco faz parte do protocolo de Prova de Participação (PoS). Para ajudar a entender esta página, recomendamos que você leia sobre a [Prova de Participação (PoS)](/developers/docs/consensus-mechanisms/pos/) e a [arquitetura de blocos](/developers/docs/blocks/).

## Quem produz os blocos? {#who-produces-blocks}

Contas de validador propõem blocos. As contas de validador são gerenciadas por operadores de nó que executam o software do validador como parte de seus clientes de execução e consenso e depositaram pelo menos 32 ETH no contrato de depósito. No entanto, cada validador é apenas ocasionalmente responsável por propor um bloco. O [Ethereum](/) mede o tempo em slots e épocas. Cada slot tem doze segundos, e 32 slots (6,4 minutos) compõem uma época. Cada slot é uma oportunidade para adicionar um novo bloco no Ethereum.

### Seleção aleatória {#random-selection}

Um único validador é escolhido de forma pseudoaleatória para propor um bloco em cada slot. Não existe aleatoriedade verdadeira em uma blockchain porque, se cada nó gerasse números genuinamente aleatórios, eles não conseguiriam chegar a um consenso. Em vez disso, o objetivo é tornar o processo de seleção de validadores imprevisível. A aleatoriedade é alcançada no Ethereum usando um algoritmo chamado RANDAO que mistura um hash do propositor de bloco com uma semente que é atualizada a cada bloco. Esse valor é usado para selecionar um validador específico do conjunto total de validadores. A seleção do validador é fixada com duas épocas de antecedência como uma forma de proteção contra certos tipos de manipulação de sementes.

Embora os validadores adicionem ao RANDAO em cada slot, o valor global do RANDAO é atualizado apenas uma vez por época. Para calcular o índice do próximo propositor de bloco, o valor do RANDAO é misturado com o número do slot para fornecer um valor único em cada slot. A probabilidade de um validador individual ser selecionado não é simplesmente `1/N` (onde `N` = total de validadores ativos). Em vez disso, é ponderada pelo saldo efetivo de ETH de cada validador. O saldo efetivo máximo é de 32 ETH (isso significa que `balance < 32 ETH` leva a um peso menor do que `balance == 32 ETH`, mas `balance > 32 ETH` não leva a um peso maior do que `balance == 32 ETH`).

Apenas um propositor de bloco é selecionado em cada slot. Em condições normais, um único produtor de bloco cria e lança um único bloco em seu slot dedicado. Criar dois blocos para o mesmo slot é uma ofensa passível de penalização, frequentemente conhecida como "equivocação".

## Como o bloco é criado? {#how-is-a-block-created}

Espera-se que o propositor de bloco transmita um bloco beacon assinado que se baseia no topo mais recente da cadeia, de acordo com a visão de seu próprio algoritmo de escolha de fork executado localmente. O algoritmo de escolha de fork aplica quaisquer atestações na fila que sobraram do slot anterior e, em seguida, encontra o bloco com o maior peso acumulado de atestações em sua história. Esse bloco é o pai do novo bloco criado pelo proponente.

O propositor de bloco cria um bloco coletando dados de seu próprio banco de dados local e visão da cadeia. O conteúdo do bloco é mostrado no trecho abaixo:

```rust
class BeaconBlockBody(Container):
    randao_reveal: BLSSignature
    eth1_data: Eth1Data
    graffiti: Bytes32
    proposer_slashings: List[ProposerSlashing, MAX_PROPOSER_SLASHINGS]
    attester_slashings: List[AttesterSlashing, MAX_ATTESTER_SLASHINGS]
    attestations: List[Attestation, MAX_ATTESTATIONS]
    deposits: List[Deposit, MAX_DEPOSITS]
    voluntary_exits: List[SignedVoluntaryExit, MAX_VOLUNTARY_EXITS]
    sync_aggregate: SyncAggregate
    execution_payload: ExecutionPayload
```

O campo `randao_reveal` recebe um valor aleatório verificável que o propositor de bloco cria assinando o número da época atual. `eth1_data` é um voto para a visão do propositor de bloco sobre o contrato de depósito, incluindo a raiz da trie de Merkle de depósito e o número total de depósitos que permitem que novos depósitos sejam verificados. `graffiti` é um campo opcional que pode ser usado para adicionar uma mensagem ao bloco. `proposer_slashings` e `attester_slashings` são campos que contêm provas de que certos validadores cometeram ofensas passíveis de penalização de acordo com a visão do proponente sobre a cadeia. `deposits` é uma lista de novos depósitos de validadores dos quais o propositor de bloco tem conhecimento, e `voluntary_exits` é uma lista de validadores que desejam a saída e dos quais o propositor de bloco ouviu falar na rede de fofocas da camada de consenso. O `sync_aggregate` é um vetor que mostra quais validadores foram previamente designados a um comitê de sincronização (um subconjunto de validadores que servem dados de cliente leve) e participaram da assinatura de dados.

O `execution_payload` permite que informações sobre transações sejam passadas entre os clientes de execução e consenso. O `execution_payload` é um bloco de dados de execução que fica aninhado dentro de um bloco beacon. Os campos dentro do `execution_payload` refletem a estrutura do bloco descrita no yellow paper do Ethereum, exceto que não há ommers e `prev_randao` existe no lugar de `difficulty`. O cliente de execução tem acesso a um pool local de transações das quais ouviu falar em sua própria rede de fofocas. Essas transações são executadas localmente para gerar uma trie de estado atualizada conhecida como pós-estado. As transações são incluídas no `execution_payload` como uma lista chamada `transactions` e o pós-estado é fornecido no campo `state-root`.

Todos esses dados são coletados em um bloco beacon, assinados e transmitidos aos pares do propositor de bloco, que os propagam para seus pares, etc.

Leia mais sobre a [anatomia dos blocos](/developers/docs/blocks).

## O que acontece com o bloco? {#what-happens-to-blocks}

O bloco é adicionado ao banco de dados local do propositor de bloco e transmitido aos pares pela rede de fofocas da camada de consenso. Quando um validador recebe o bloco, ele verifica os dados dentro dele, incluindo a verificação de que o bloco tem o pai correto, corresponde ao slot correto, que o índice do proponente é o esperado, que a revelação do RANDAO é válida e que o proponente não sofreu penalização. O `execution_payload` é desempacotado, e o cliente de execução do validador reexecuta as transações na lista para verificar a mudança de estado proposta. Supondo que o bloco passe em todas essas verificações, cada validador adiciona o bloco à sua própria cadeia canônica. O processo então começa novamente no próximo slot.

## Recompensas de bloco {#block-rewards}

O propositor de bloco recebe pagamento por seu trabalho. Existe uma `base_reward` calculada em função do número de validadores ativos e seus saldos efetivos. O propositor de bloco então recebe uma fração da `base_reward` para cada atestação válida incluída no bloco; quanto mais validadores atestarem o bloco, maior será a recompensa do propositor de bloco. Há também uma recompensa por relatar validadores que devem sofrer penalização, igual a `1/512 * effective balance` para cada validador penalizado.

[Mais sobre recompensas e penalidades](/developers/docs/consensus-mechanisms/pos/rewards-and-penalties)

## Leitura adicional {#further-reading}

- [Introdução aos blocos](/developers/docs/blocks/)
- [Introdução à Prova de Participação (PoS)](/developers/docs/consensus-mechanisms/pos/)
- [Especificações de consenso do Ethereum](https://github.com/ethereum/consensus-specs)
- [Introdução ao Gasper](/developers/docs/consensus-mechanisms/pos/gasper/)
- [Atualizando o Ethereum](https://eth2book.info/)