---
title: Proposta de bloqueio
description: Explicação de como os blocos são propostos na prova de participação do Ethereum.
lang: pt-br
---

Os blocos são as unidades fundamentais da blockchain. Blocos são unidades discretas de informação passadas entre os nós, acordadas e adicionadas ao banco de dados de cada nó. Esta página explica como elas são produzidas.

## Pré-requisitos {#prerequisites}

A proposta de bloco faz parte do protocolo de prova de participação. Para ajudar a entender esta página, recomendamos que você leia sobre a [prova de participação](src/content/developers/docs/consensus-mechanisms/pos/) e a [arquitetura de bloco](src/content/developers/docs/blocks/).

## Quem produz os blocos? {#who-produces-blocks}

Contas validadoras propõem blocos. Contas validadoras são gerenciadas por operadores de nós que executam um software validador como parte de seus clientes de consenso e execução e que depositaram pelo menos 32 ETH no contrato de depósito. No entanto, cada validador é apenas ocasionalmente responsável por propor um bloco. O Ethereum mede o tempo em slots e épocas. Cada slot é de doze segundos, sendo que 32 slots (6,4 minutos) formam uma época. Cada slot é uma oportunidade de adicionar um novo bloco ao Ethereum.

### Seleção aleatória {#random-selection}

Um único validador é pseudo-aleatoriamente escolhido para propor um bloco em cada slot. Não existe algo realmente aleatório em uma blockchain, porque se cada nó gerou números genuinamente aleatórios, não há como chegar a um consenso. Em vez disso, o objetivo é tornar o processo de seleção do validador imprevisível. A aleatoriedade é alcançada no Ethereum usando um algoritmo chamado RANDAO, que mistura um hash do proponente do bloco com uma semente que é atualizada em todos os blocos. Esse valor é usado para selecionar um validador específico do validador total definido. A seleção do validador é fixa em duas épocas de antecedência como uma forma de proteção contra certos tipos de manipulação de sementes.

Embora os validadores se adicionem ao RANDAO em cada slot, o valor global do RANDAO só é atualizado uma vez por época. Para calcular o índice do próximo proponente de bloco, o valor de RANDAO é misturado com o número do slot para dar um valor único a cada slot. A probabilidade de um validador individual ser selecionado não é simplesmente `1/N` (em que `N` = total de validadores ativos). Em vez disso, ele é ponderado pelo saldo de ETH efetivo de cada validador. O saldo máximo efetivo é de 32 ETH (isso significa que o `saldo < 32 ETH` leva a um peso menor do que o `saldo == 32 ETH`, mas `saldo > 32 ETH` não leva a uma ponderação maior que o saldo de `== 32 ETH`).

Somente um proponente de blocos é selecionado em cada slot. Em condições normais, um único produtor de blocos cria e libera um único bloco no seu slot dedicado. A criação de dois blocos para o mesmo slot é uma ofensiva removível, geralmente conhecida como “ambiguidade”.

## Como o bloco é criado? {#how-is-a-block-created}

Espera-se que o proponente de blocos transmita um bloco beacon assinado que se baseia no cabeçalho mais recente da cadeia, de acordo com a visualização de seu próprio algoritmo de escolha de bifurcação (fork choice) local. O algoritmo de escolha de bifurcação (fork) aplica todas as atestações na fila deixadas no slot anterior e, em seguida, encontra o bloco com o maior peso acumulado de atestações em seu histórico. Esse bloco é o pai do novo bloco criado pelo proponente.

O proponente de blocos cria um bloco coletando dados de seu próprio banco de dados local e visualização da cadeia. O conteúdo do bloco é mostrado no trecho de código abaixo:

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

O campo `randao_reveal` recebe um valor aleatório verificável que o proponente do bloco cria, adicionando um pouco de sua própria entropia ao valor RANDAO acumulado dos blocos anteriores. `eth1_data` é uma votação para a visualização do proponente do bloco no contrato de depósito, incluindo a raiz do depósito da árvore Merkle de depósito e o número total de depósitos que permitem a verificação de novos depósitos. `graffiti` é um campo opcional que pode ser usado para adicionar uma mensagem ao bloco. `proposer_slashings` e `attester_slashings` são campos que contêm provas de que alguns validadores cometeram ofensivas sujeitas a remoção segundo a visualização do proponente da cadeia. `depósitos` é uma lista de novos depósitos do validador dos quais o proponente de bloco está ciente, e `voluntary_exits` é uma lista de validadores que desejam sair, segundo o que o proponente de blocos ouviu falar na rede de fofocas da camada de consenso. O `sync_aggregate` é um vetor que mostra quais validadores foram previamente atribuídos a um comitê de sincronização (um subconjunto de validadores que atendem dados de cliente leve) e participaram da assinatura de dados.

O `execution_payload` permite que informações sobre transações sejam passadas entre clientes de execução e clientes de consenso. O `execution_payload` é um bloco de dados de execução que fica aninhado em um bloco de sinal (beacon). Os campos dentro de `execution_payload` refletem a estrutura do bloco delineada nas especificações formais (Yellow Paper) do Ethereum, exceto pelo fato de não haver ommers e `prev_randao` existe no lugar de `difficulty`. O cliente de execução tem acesso a um conjunto de operações locais de que ouviu falar na sua própria rede de fofocas. Essas transações são executadas localmente para gerar uma árvore de estado atualizada, conhecida como pós-estado. As transações são incluídas no `execution_payload` como uma lista chamada `transactions` e o pós-estado é fornecido no campo `state-root`.

Todos esses dados são coletados em um bloco de sinal, assinado e transmitido para os pares do proponente de blocos, que o propagam para seus pares, etc.

Leia mais sobre a [anatomia dos blocos](/developers/docs/blocks).

## O que acontece com os blocos? {#what-happens-to-blocks}

O bloco é adicionado ao banco de dados local do proponente do bloco e transmitido aos pares pela rede de fofocas da camada de consenso. Quando um validador recebe o bloco, ele verifica os dados dentro dele, inclusive se o bloco tem o pai correto, corresponde ao pacote correto, se o índice do proponente é o esperado, se a revelação RANDAO é válida e se o proponente não foi removido. O `execution_payload` é descompactado e o cliente de execução do validador reexecuta as transações na lista para verificar a proposta de mudança de estado. Supondo que o bloco passe em todas essas verificações, cada validador adiciona o bloco à sua própria cadeia padronizada. O processo recomeça no próximo slot.

## Recompensas do bloco {#block-rewards}

O proponente de blocos recebe pagamento pelo seu trabalho. Há uma `base_reward` calculada como uma função do número de validadores ativos e seus saldos efetivos. O proponente de blocos recebe uma fração de `base_reward` por cada certificado válido incluído no bloco; quanto mais validadores atestarem o bloco, maior será a recompensa do seu proponente. Há também uma recompensa por reportar validadores que devem ser removidos, igual a `1/512 * saldo efetivo` para cada validador removido.

[Recompensas e penalidades da PoS](/developers/docs/consensus-mechanisms/pos/rewards-and-penalties)

## Leitura adicional {#further-reading}

- [Introdução aos blocos](/developers/docs/blocks/)
- [Introdução à prova de participação](/developers/docs/consensus-mechanisms/pos/)
- [Especificações do consenso do Ethereum](www.github.com/ethereum/consensus-specs)
- [Introdução ao Gasper](/developers/docs/consensus-mechanisms/pos/)
- [Atualizando o Ethereum](https://eth2book.info/)
