---
title: Recompensas e penalidades na prova de participação
description: Saiba mais sobre os incentivos no protocolo da prova de participação Ethereum.
lang: pt-br
---

Ethereum é protegido usando sua criptomoeda nativa, ether (ETH). Os operadores de nós que desejam participar da validação de blocos e da identificação do cabeçalho da cadeia depositam ether no [contrato de depósito](/staking/deposit-contract/) do Ethereum. Eles são então pagos em ether para executar um software validador que verifica a validade de novos blocos recebidos pela rede ponto a ponto e aplicam o algoritmo de escolha de bifurcação para identificar o cabeçalho da cadeia.

Existem duas funções principais para um validador: 1) verificar novos blocos e “atestar” se eles são válidos para eles, 2) propor novos blocos quando selecionados aleatoriamente a partir do pool total de validadores. Se o validador falhar em realizar qualquer uma dessas tarefas quando solicitado, eles perdem um pagamento em ether. Às vezes, os validadores também são encarregados de agregar assinaturas e participar dos comitês de sincronização.

Existem também algumas ações que são muito difíceis de fazer acidentalmente e são indício de alguma intenção maliciosa, como propor múltiplos blocos para o mesmo slot ou atestar vários blocos para o mesmo slot. Esses são comportamentos “passíveis de remoção” fazem com que uma certa quantidade de ether (até 1 ETH) do validador seja queimada antes de ele ser removido da rede, o que leva 36 dias. O ether do validador removido drena lentamente ao longo do período de saída, mas no dia 18 eles recebem uma “penalidade de correlação” que é maior quando mais validadores são removidos ao mesmo tempo. Portanto, a estrutura de incentivos da Beacon Chain paga pela honestidade e pune os infrat

Todas as recompensas e penalidades são aplicadas uma vez por época.

Leia para obter mais detalhes...

## Recompensas e penalidades {#rewards}

### Recompensas {#rewards}

Os validadores recebem recompensas quando votam de modo consistente com a maioria dos outros validadores, quando propõem blocos e quando participam de comitês de sincronização. O valor das recompensas em cada época são calculadas a partir de um `base_reward`. Essa é a unidade base a partir da qual outras recompensas são calculadas. O `base_reward` representa a recompensa média recebida por um validador em condições ideais por época. Isso é calculado a partir do saldo efetivo do validador e do número total de validadores ativos da seguinte forma:

```
base_reward = effective_balance * (base_reward_factor / (base_rewards_per_epoch * sqrt(sum(active_balance))))
```

quando `base_reward_factor` é 64, `base_rewards_per_epoch` é 4 e `sum(active balance)` é o total de ether colocado por todos os validadores ativos.

Isso significa que a recompensa base é proporcional ao saldo efetivo do validador e inversamente proporcional ao número de validadores na rede. Quanto mais validadores, maior a emissão geral (como `sqrt(N)`, mas menor a `base_reward` por validador (como `1/sqrt(N)`). Esses fatores influenciam o APR para um nó de staking. Leia a justificativa para isso nas [notas de Vitalik](https://notes.ethereum.org/@vbuterin/rkhCgQteN?type=view#Base-rewards).

A recompensa total é então calculada como a soma de cinco componentes, sendo que cada um tem uma ponderação que determina quanto cada componente adiciona à recompensa total. Os componentes são:

```
1. voto de origem: o validador fez um voto oportuno para o ponto de verificação de origem correta
2. voto de destino: o validador fez um voto oportuno para o ponto de verificação de destino correto
3. voto de cabeçalho: o validador fez um voto oportuno para o bloco de cabeçalho correto
4. recompensa do comitê de sincronização: o validador participou de um comitê de sincronização
5. recompensa do proponente: o validador propôs um bloco no slot correto
```

As ponderações para cada componente são as seguintes:

```
TIMELY_SOURCE_WEIGHT    uint64(14)
TIMELY_TARGET_WEIGHT    uint64(26)
TIMELY_HEAD_WEIGHT  uint64(14)
SYNC_REWARD_WEIGHT  uint64(2)
PROPOSER_WEIGHT uint64(8)
```

Esses pesos somam 64. A recompensa é calculada como a soma dos pesos aplicáveis dividido por 64. Um validador que tenha feito votos oportunos de origem, destino e cabeçalho propôs um bloco e participou de um comitê de sincronização poderá receber `64/64 * base_reward == base_reward`. No entanto, um validador geralmente não é um proponente de bloco, então sua recompensa máxima é `64-8 /64 * base_reward == 7/8 * base_reward`. Os validadores que não são proponentes de bloco nem estão em um comitê de sincronização podem receber `64-8-2 / 64 * base_reward == 6,75/8 * base_reward`.

Uma recompensa adicional é incluída para incentivar atestações rápidas. Esse é o `inclusion_delay_reward`. Isso tem um valor igual a `base_reward` multiplicado por `1/delay`, no qual o `delay` é o número de slots que separam a proposta do bloco e o atestado. Por exemplo, se o atestado for enviado dentro de um slot da proposta do bloco, o atestante receberá `base_reward * 1/1 == base_reward`. Se o atestado chegar no próximo slot, o atestador receberá `base_reward * 1/2` e assim por diante.

Os proponentes de bloco recebem `8 / 64 * base_reward` para **cada atestado válido** incluída no bloco, logo, o valor real da recompensa varia com o número de validadores atestantes. Os proponentes de bloco também podem aumentar sua recompensa incluindo evidências de mau comportamento de outros validadores em seu bloco proposto. Essas recompensas são as “cenouras” que encorajam a honestidade do validador. Um proponente de bloco que inclui uma punição será recompensado com o `slashed_validators_effective_balance / 512`.

### Penalidades {#penalties}

Até agora, temos considerado validadores perfeitamente bem comportados, mas o que acontece quando os validadores não fazem votos de cabeçalho, origem e destino em tempo hábil ou o fazem lentamente?

As penalidades por perda de votos de destino e de origem são iguais às recompensas que o atestador teria recebido se as tivesse enviado. Isso significa que, em vez de ter a recompensa adicionada ao seu saldo, eles têm um valor igual retirado do seu saldo. Não há penalidade por perder o voto de cabeçalho (ou seja, os votos de cabeçalhos são apenas recompensados, nunca penalizados). Não há penalidade associada ao `inclusion_delay` – a recompensa simplesmente não será adicionada ao saldo do validador. Também não existe nenhuma penalidade por falhar em propor um bloco.

Leia mais sobre recompensas e penalidades nas [especificações de consenso](https://github.com/ethereum/consensus-specs/blob/dev/specs/altair/beacon-chain.md). Recompensas e penalidades foram ajustadas na atualização Bellatrix – assista a Danny Ryan e Vitalik falando sobre isso neste vídeo: [Peep an EIP](https://www.youtube.com/watch?v=iaAEGs1DMgQ).

## Remoção {#slashing}

Remoção é uma ação mais severa que resulta na remoção forçada de um validador da rede e na perda associada de seu ether em participação. Há três maneiras que um validador pode ser removido: pela proposta ou atestação desonestas de blocos:

- Ao propor e assinar dois blocos diferentes para o mesmo espaço
- Ao confirmar um bloco “em volta” de outro (mudando efetivamente o histórico)
- Por “votação dupla”, atestando dois candidatos para o mesmo bloco

Se essas ações forem detectadas, o validador é removido. Isso significa que 1/32 do seu ether em risco (até um máximo de 1 ether) é imediatamente queimado, então um período de remoção de 36 dias é iniciado. Durante esse período de remoção, a participação dos validadores vai diminuir gradualmente. No meio do período (dia 18) é aplicada uma penalidade adicional cuja magnitude é escalada com o total de ether em stake de todos os validadores cortados nos 36 dias anteriores ao evento de corte. Isso significa que quanto mais validadores são removidos, a magnitude da remoção aumenta. A remoção máxima é o saldo total efetivo de todos os validadores removidos (ou seja, se houver muitos validadores sendo removidos, eles poderiam perder toda a sua participação). Por outro lado, um evento único e isolado de remoção apenas queima uma pequena parte da participação do validador. Esta penalidade de ponto médio que escala com o número de validadores removidos é chamada de “penalidade de correlação”.

## Vazamento de inatividade {#inactivity-leak}

Se a camada de consenso tiver passado mais de quatro épocas sem finalizar, um protocolo de emergência chamado "vazamento de inatividade" é ativado. O objetivo final do vazamento de inatividade é criar as condições necessárias para a cadeia recuperar a finalidade. Como explicado acima, a finalidade requer uma maioria 2/3 do ether total em participação para concordar sobre os pontos de verificação de origem e destino. Se os validadores representando mais de 1/3 do total dos validadores ficarem offline ou falharem em enviar os atestados corretos, então não é possível que uma supermaioria de 2/3 finalize os pontos de verificação. O vazamento de inatividade deixa o stake pertencente aos validadores inativos esvaziar gradualmente até que eles controlem menos de 1/3 do stake total, permitindo que os validadores ativos restantes finalizem a cadeia. Por maior que seja o pool de validadores inativos, os validadores ativos restantes acabarão controlando >2/3 do stake. A perda de stake é um forte incentivo para os validadores inativos reativarem o mais rápido possível! Um cenário de vazamento de inatividade foi encontrado na rede de testes Medalla quando < 66% dos validadores ativos conseguiram chegar a um consenso sobre a cabeça atual da blockchain. O vazamento de inatividade foi ativado e a finalidade acabou sendo recuperada!

O design de recompensa, penalidade e corte do mecanismo de consenso incentiva os validadores individuais a se comportarem corretamente. No entanto, dessas escolhas de design surge um sistema que incentiva fortemente a distribuição igualitária de validadores entre vários clientes e deve desincentivar fortemente o domínio de cliente único.

## Leitura adicional {#further-reading}

- [Atualizando o Ethereum: a camada de incentivo](https://eth2book.info/altair/part2/incentives)
- [Incentivos no protocolo Casper híbrido do Ethereum](https://arxiv.org/pdf/1903.04205.pdf)
- [Especificação anotada de Vitalik](https://github.com/ethereum/annotated-spec/blob/master/phase0/beacon-chain.md#rewards-and-penalties-1)
- [Dicas para evitar remoções no Eth2](https://medium.com/prysmatic-labs/eth2-slashing-prevention-tips-f6faa5025f50)

_Fontes_

- _[https://benjaminion.xyz/eth2-annotated-spec/phase0/beacon-chain/](https://benjaminion.xyz/eth2-annotated-spec/phase0/beacon-chain/)_
