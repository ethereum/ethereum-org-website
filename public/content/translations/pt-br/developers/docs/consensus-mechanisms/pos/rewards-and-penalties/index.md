---
title: Recompensas e penalizações da prova de participação
description: Aprenda sobre os incentivos no protocolo no Ethereum de prova de participação.
lang: pt-br
---

[Ethereum](/) é protegido usando sua criptomoeda nativa, o ether (ETH). Os operadores de nó que desejam participar da validação de blocos e da identificação do topo da cadeia depositam ether no [contrato de depósito](/staking/deposit-contract/) no Ethereum. Eles são então pagos em ether para executar o software do validador que verifica a validade de novos blocos recebidos pela rede ponto a ponto e aplicam o algoritmo de escolha de bifurcação para identificar o topo da cadeia.

Existem duas funções principais para um validador: 1) verificar novos blocos e "atestar" a eles se forem válidos, 2) propor novos blocos quando selecionado aleatoriamente do conjunto total de validadores. Se o validador falhar em realizar qualquer uma dessas tarefas quando solicitado, ele perde o pagamento em ether. Os validadores também são, às vezes, encarregados da agregação de assinaturas e da participação em comitês de sincronização.

Existem também algumas ações que são muito difíceis de fazer acidentalmente e significam alguma intenção maliciosa, como propor vários blocos para o mesmo slot ou atestar vários blocos para o mesmo slot. Esses são comportamentos passíveis de "penalização" que resultam no validador tendo alguma quantidade de ether (até 1 ETH) queimada antes que o validador seja removido da rede, o que leva 36 dias. O ether do validador penalizado é drenado lentamente ao longo do período de saída, mas no 18º dia ele recebe uma "penalidade de correlação" que é maior quando mais validadores são penalizados na mesma época. A estrutura de incentivos do mecanismo de consenso, portanto, paga pela honestidade e pune os maus atores.

Todas as recompensas e penalizações são aplicadas uma vez por época.

Continue lendo para mais detalhes...

## Recompensas e penalizações {#rewards}

### Recompensas {#rewards-2}

Os validadores recebem recompensas quando fazem votos que são consistentes com a maioria dos outros validadores, quando propõem blocos e quando participam de comitês de sincronização. O valor das recompensas em cada época é calculado a partir de uma `base_reward`. Esta é a unidade base a partir da qual outras recompensas são calculadas. A `base_reward` representa a recompensa média recebida por um validador em condições ideais por época. Isso é calculado a partir do saldo efetivo do validador e do número total de validadores ativos da seguinte forma:

```
base_reward = effective_balance * (base_reward_factor / (base_rewards_per_epoch * sqrt(sum(active_balance))))
```

onde `base_reward_factor` é 64, `base_rewards_per_epoch` é 4 e `sum(active balance)` é o total de ether em stake em todos os validadores ativos.

Isso significa que a recompensa base é proporcional ao saldo efetivo do validador e inversamente proporcional ao número de validadores na rede. Quanto mais validadores, maior a emissão geral (como `sqrt(N)`), mas menor a `base_reward` por validador (como `1/sqrt(N)`). Esses fatores influenciam a APR para um nó de staking. Leia a justificativa para isso nas [notas de Vitalik](https://notes.ethereum.org/@vbuterin/serenity_design_rationale?type=view#Base-rewards).

A recompensa total é então calculada como a soma de cinco componentes que têm, cada um, um peso que determina o quanto cada componente adiciona à recompensa total. Os componentes são:

```
1. voto de origem: o validador fez um voto oportuno para o ponto de verificação de origem correto
2. voto de destino: o validador fez um voto oportuno para o ponto de verificação de destino correto
3. voto de topo: o validador fez um voto oportuno para o bloco de topo correto
4. recompensa do comitê de sincronização: o validador participou de um comitê de sincronização
5. recompensa do propositor: o validador propôs um bloco no slot correto
```

Os pesos para cada componente são os seguintes:

```
TIMELY_SOURCE_WEIGHT	uint64(14)
TIMELY_TARGET_WEIGHT	uint64(26)
TIMELY_HEAD_WEIGHT	uint64(14)
SYNC_REWARD_WEIGHT	uint64(2)
PROPOSER_WEIGHT	uint64(8)
```

Esses pesos somam 64. A recompensa é calculada como a soma dos pesos aplicáveis dividida por 64. Um validador que fez votos oportunos de origem, destino e topo, propôs um bloco e participou de um comitê de sincronização poderia receber `64/64 * base_reward == base_reward`. No entanto, um validador geralmente não é um propositor de bloco, então sua recompensa máxima é `64-8 /64 * base_reward == 7/8 * base_reward`. Validadores que não são propositores de bloco nem estão em um comitê de sincronização podem receber `64-8-2 / 64 * base_reward == 6.75/8 * base_reward`.

Uma recompensa adicional é adicionada para incentivar atestações rápidas. Esta é a `inclusion_delay_reward`. Isso tem um valor igual à `base_reward` multiplicada por `1/delay` onde `delay` é o número de slots que separam a proposta de bloco e a atestação. Por exemplo, se a atestação for enviada dentro de um slot da proposta de bloco, o atestador recebe `base_reward * 1/1 == base_reward`. Se a atestação chegar no próximo slot, o atestador recebe `base_reward * 1/2` e assim por diante.

Os propositores de bloco recebem `8 / 64 * base_reward` para **cada atestação válida** incluída no bloco, de modo que o valor real da recompensa aumenta com o número de validadores atestadores. Os propositores de bloco também podem aumentar sua recompensa incluindo evidências de mau comportamento de outros validadores em seu bloco proposto. Essas recompensas são as "cenouras" que incentivam a honestidade do validador. Um propositor de bloco que inclui uma penalização será recompensado com a `slashed_validators_effective_balance / 512`.

### Penalizações {#penalties}

Até agora, consideramos validadores perfeitamente bem comportados, mas e os validadores que não fazem votos oportunos de topo, origem e destino ou o fazem lentamente?

As penalizações por perder os votos de destino e origem são iguais às recompensas que o atestador teria recebido se os tivesse enviado. Isso significa que, em vez de ter a recompensa adicionada ao seu saldo, eles têm um valor igual removido de seu saldo. Não há penalização por perder o voto de topo (ou seja, os votos de topo são apenas recompensados, nunca penalizados). Não há penalização associada à `inclusion_delay` - a recompensa simplesmente não será adicionada ao saldo do validador. Também não há penalização por não propor um bloco.

Leia mais sobre recompensas e penalizações nas [especificações de consenso](https://github.com/ethereum/consensus-specs/blob/master/specs/altair/beacon-chain.md). As recompensas e penalizações foram ajustadas na atualização Bellatrix - assista Danny Ryan e Vitalik discutirem isso neste [vídeo Peep an EIP](https://www.youtube.com/watch?v=iaAEGs1DMgQ).

## Penalização {#slashing}

A penalização é uma ação mais severa que resulta na remoção forçada de um validador da rede e em uma perda associada de seu ether em stake. Existem três maneiras pelas quais um validador pode ser penalizado, todas as quais equivalem à proposta ou atestação desonesta de blocos:

- Ao propor e assinar dois blocos diferentes para o mesmo slot
- Ao atestar um bloco que "envolve" outro (efetivamente mudando a história)
- Por "voto duplo" ao atestar dois candidatos para o mesmo bloco

Se essas ações forem detectadas, o validador é penalizado. Isso significa que 0,0078125 é imediatamente queimado para um validador de 32 ETH (dimensionado linearmente com o saldo ativo), então um período de remoção de 36 dias começa. Durante esse período de remoção, o stake do validador sangra gradualmente. No ponto médio (Dia 18), uma penalidade adicional é aplicada, cuja magnitude aumenta com o total de ether em stake de todos os validadores penalizados nos 36 dias anteriores ao evento de penalização. Isso significa que quando mais validadores são penalizados, a magnitude da penalização aumenta. A penalização máxima é o saldo efetivo total de todos os validadores penalizados (ou seja, se houver muitos validadores sendo penalizados, eles podem perder todo o seu stake). Por outro lado, um evento de penalização único e isolado queima apenas uma pequena parte do stake do validador. Essa penalidade de ponto médio que aumenta com o número de validadores penalizados é chamada de "penalidade de correlação".

## Vazamento por inatividade {#inactivity-leak}

Se a camada de consenso passar mais de quatro épocas sem finalizar, um protocolo de emergência chamado "vazamento por inatividade" é ativado. O objetivo final do vazamento por inatividade é criar as condições necessárias para que a cadeia recupere a finalidade. Como explicado acima, a finalidade requer uma maioria de 2/3 do total de ether em stake para concordar com os pontos de verificação de origem e destino. Se validadores representando mais de 1/3 do total de validadores ficarem offline ou falharem em enviar atestações corretas, então não é possível para uma supermaioria de 2/3 finalizar os pontos de verificação. O vazamento por inatividade permite que o stake pertencente aos validadores inativos sangre gradualmente até que eles controlem menos de 1/3 do stake total, permitindo que os validadores ativos restantes finalizem a cadeia. Por maior que seja o conjunto de validadores inativos, os validadores ativos restantes eventualmente controlarão >2/3 do stake. A perda de stake é um forte incentivo para que os validadores inativos se reativem o mais rápido possível! Um cenário de vazamento por inatividade foi encontrado na rede de teste Medalla quando < 66% dos validadores ativos conseguiram chegar a um consenso sobre o topo atual da blockchain. O vazamento por inatividade foi ativado e a finalidade foi eventualmente recuperada!

O design de recompensa, penalidade e penalização do mecanismo de consenso incentiva os validadores individuais a se comportarem corretamente. No entanto, a partir dessas escolhas de design, surge um sistema que incentiva fortemente a distribuição igualitária de validadores em vários clientes e deve desincentivar fortemente o domínio de um único cliente.

## Leitura adicional {#further-reading}

- [Atualizando o Ethereum: A camada de incentivo](https://eth2book.info/altair/part2/incentives)
- [Incentivos no protocolo híbrido Casper do Ethereum](https://arxiv.org/pdf/1903.04205.pdf)
- [Especificação anotada de Vitalik](https://github.com/ethereum/annotated-spec/blob/master/phase0/beacon-chain.md#rewards-and-penalties-1)
- [Dicas de prevenção de penalização no Eth2](https://medium.com/prysmatic-labs/eth2-slashing-prevention-tips-f6faa5025f50)
- [Análise das penalizações sob a EIP-7251](https://ethresear.ch/t/slashing-penalty-analysis-eip-7251/16509)

_Fontes_

- _[https://benjaminion.xyz/eth2-annotated-spec/phase0/beacon-chain/](https://benjaminion.xyz/eth2-annotated-spec/phase0/beacon-chain/)_