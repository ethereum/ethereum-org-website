---
title: Como o The Merge impactou a oferta de ETH
description: Análise detalhada de como o The Merge impactou a oferta de ETH
lang: pt-br
---

O The Merge representou a transição da rede [Ethereum](/) da Prova de Trabalho (PoW) para a Prova de Participação (PoS), que ocorreu em setembro de 2022. A forma como o ETH era emitido passou por mudanças no momento dessa transição. Anteriormente, o novo ETH era emitido a partir de duas fontes: a camada de execução (ou seja, a Mainnet) e a camada de consenso (ou seja, a Beacon Chain). Desde o The Merge, a emissão na camada de execução agora é zero. Vamos analisar isso em detalhes.

## Componentes da emissão de ETH {#components-of-eth-issuance}

Podemos dividir a oferta de ETH em duas forças principais: emissão e queima.

A **emissão** de ETH é o processo de criação de ETH que não existia anteriormente. A **queima** de ETH é quando o ETH existente é destruído, removendo-o de circulação. A taxa de emissão e queima é calculada com base em vários parâmetros, e o equilíbrio entre eles determina a taxa de inflação/deflação resultante do ether.

<Card
emoji=":chart_decreasing:"
title="TLDR da emissão de ETH">

- Antes da transição para a Prova de Participação (PoS), os mineradores recebiam uma emissão de aproximadamente 13.000 ETH/dia
- Os stakers recebem uma emissão de aproximadamente 1.700 ETH/dia, com base em cerca de 14 milhões de ETH em stake no total
- A emissão exata de staking flutua com base na quantidade total de ETH em stake
- **Desde o The Merge, restam apenas os ~1.700 ETH/dia, reduzindo a emissão total de novos ETH em ~88%**
- A queima: Isso flutua de acordo com a demanda da rede. _Se_ um preço do gás médio de pelo menos 16 gwei for observado em um determinado dia, isso compensa efetivamente os ~1.700 ETH que são emitidos para os validadores e reduz a inflação líquida de ETH a zero ou menos para aquele dia.

</Card>

## Pré-merge (histórico) {#pre-merge}

### Emissão na camada de execução {#el-issuance-pre-merge}

Sob a Prova de Trabalho (PoW), os mineradores interagiam apenas com a camada de execução e recebiam recompensas de bloco se fossem o primeiro minerador a resolver o próximo bloco. Desde a atualização [Constantinopla](/ethereum-forks/#constantinople) em 2019, essa recompensa era de 2 ETH por bloco. Os mineradores também eram recompensados por publicar blocos [ommer](/glossary/#ommer), que eram blocos válidos que não acabavam na cadeia mais longa/canônica. Essas recompensas chegavam ao máximo de 1,75 ETH por ommer e eram _adicionais_ à recompensa emitida pelo bloco canônico. O processo de mineração era uma atividade economicamente intensiva, que historicamente exigia altos níveis de emissão de ETH para se sustentar.

### Emissão na camada de consenso {#cl-issuance-pre-merge}

A [Beacon Chain](/ethereum-forks/#beacon-chain-genesis) entrou no ar em 2020. Em vez de mineradores, ela é protegida por validadores usando a Prova de Participação (PoS). Essa cadeia foi iniciada por usuários do Ethereum depositando ETH de forma unidirecional em um contrato inteligente na Mainnet (a camada de execução), que a Beacon Chain escuta, creditando ao usuário uma quantidade igual de ETH na nova cadeia. Até que o The Merge acontecesse, os validadores da Beacon Chain não estavam processando transações e estavam essencialmente chegando a um consenso sobre o estado do próprio pool de validadores.

Os validadores na Beacon Chain são recompensados com ETH por atestar o estado da cadeia e propor blocos. As recompensas (ou penalizações) são calculadas e distribuídas a cada época (a cada 6,4 minutos) com base no desempenho do validador. As recompensas do validador são **significativamente** menores do que as recompensas de mineração que eram emitidas anteriormente sob a Prova de Trabalho (2 ETH a cada ~13,5 segundos), pois operar um nó validador não é tão economicamente intenso e, portanto, não exige ou justifica uma recompensa tão alta.

### Detalhamento da emissão pré-merge {#pre-merge-issuance-breakdown}

Oferta total de ETH: **~120.520.000 ETH** (no momento do The Merge em setembro de 2022)

**Emissão na camada de execução:**

- Foi estimada em 2,08 ETH a cada 13,3 segundos\*: **~4.930.000** ETH emitidos em um ano
- Resultou em uma taxa de inflação de **aproximadamente 4,09%** (4,93M por ano / 120,5M no total)
- \*Isso inclui os 2 ETH por bloco canônico, mais uma média de 0,08 ETH ao longo do tempo de blocos ommer. Também usa 13,3 segundos, a meta de tempo de bloco base sem qualquer influência de uma [bomba de dificuldade](/glossary/#difficulty-bomb). ([Ver fonte](https://bitinfocharts.com/ethereum/))

**Emissão na camada de consenso:**

- Usando 14.000.000 de ETH em stake no total, a taxa de emissão de ETH é de aproximadamente 1.700 ETH/dia ([Ver fonte](https://ultrasound.money/))
- Resulta em **~620.500** ETH emitidos em um ano
- Resultou em uma taxa de inflação de **aproximadamente 0,52%** (620,5K por ano / 119,3M no total)

<Alert variant="update">
<AlertContent>
<AlertDescription>
**Taxa de emissão anualizada total (pré-merge): ~4,61%** (4,09% + 0,52%)

**~88,7%** da emissão ia para os mineradores na camada de execução (4,09 / 4,61 * 100)

**~11,3%** estava sendo emitida para os stakers na camada de consenso (0,52 / 4,61 * 100)
</AlertDescription>
</AlertContent>
</Alert>

## Pós-merge (dias atuais) {#post-merge}

### Emissão na camada de execução {#el-issuance-post-merge}

A emissão na camada de execução desde o The Merge é zero. A Prova de Trabalho não é mais um meio válido de produção de blocos sob as regras atualizadas de consenso. Toda a atividade da camada de execução é empacotada em "blocos beacon", que são publicados e atestados por validadores de Prova de Participação. As recompensas por atestar e publicar blocos beacon são contabilizadas separadamente na camada de consenso.

### Emissão na camada de consenso {#cl-issuance-post-merge}

A emissão na camada de consenso continua hoje como antes do The Merge, com pequenas recompensas para os validadores que atestam e propõem blocos. As recompensas do validador continuam a se acumular nos _saldos do validador_ que são gerenciados dentro da camada de consenso. Diferentemente das contas atuais (contas de "execução"), que podem transacionar na Mainnet, essas são contas Ethereum separadas que não podem transacionar livremente com outras contas Ethereum. Os fundos nessas contas só podem ser retirados para um único endereço de execução especificado.

Desde a atualização Shanghai/Capella que ocorreu em abril de 2023, essas retiradas foram habilitadas para os stakers. Os stakers são incentivados a remover seus _ganhos/recompensas (saldo acima de 32 ETH)_, pois esses fundos, de outra forma, não estão contribuindo para o peso do seu stake (que atinge o máximo de 32).

Os stakers também podem optar por fazer a saída e retirar todo o saldo do seu validador. Para garantir que o Ethereum seja estável, o número de validadores saindo simultaneamente é limitado.

Aproximadamente 0,33% da contagem total de validadores pode fazer a saída em um determinado dia. Por padrão, quatro (4) validadores podem fazer a saída por época (a cada 6,4 minutos, ou 900 por dia). Um (1) validador adicional tem permissão para fazer a saída a cada 65.536 (2<sup>16</sup>) validadores adicionais acima de 262.144 (2<sup>18</sup>). Por exemplo, com mais de 327.680 validadores, cinco (5) podem sair por época (1.125 por dia). Seis (6) serão permitidos com uma contagem total de validadores ativos acima de 393.216, e assim por diante.

À medida que mais validadores retiram, o número máximo de validadores saindo será gradualmente reduzido a um mínimo de quatro para evitar intencionalmente que grandes quantidades desestabilizadoras de ETH em stake sejam retiradas simultaneamente.

### Detalhamento da inflação pós-merge {#post-merge-inflation-breakdown}

- [Oferta total de ETH](/eth/supply/): **~120.520.000 ETH** (no momento do The Merge em setembro de 2022)
- Emissão na camada de execução: **0**
- Emissão na camada de consenso: Igual ao acima, taxa de emissão anualizada de **~0,52%** (com 14 milhões de ETH em stake no total)

<Alert variant="update">
<AlertContent>
<AlertDescription>
Taxa de emissão anualizada total: **~0,52%**

Redução líquida na emissão anual de ETH: **~88,7%** ((4,61% - 0,52%) / 4,61% * 100)
</AlertDescription>
</AlertContent>
</Alert>

## <Emoji text=":fire:" size="1" /> A queima {#the-burn}

A força oposta à emissão de ETH é a taxa na qual o ETH é queimado. Para que uma transação seja executada no Ethereum, uma taxa mínima (conhecida como "taxa básica") deve ser paga, a qual flutua continuamente (de bloco a bloco) dependendo da atividade da rede. A taxa é paga em ETH e é _exigida_ para que a transação seja considerada válida. Essa taxa é _queimada_ durante o processo de transação, removendo-a de circulação.

<Alert variant="update">
<AlertContent>
<AlertDescription>

A queima de taxas entrou no ar com a [atualização London](/ethereum-forks/#london) em agosto de 2021 e permanece inalterada desde o The Merge.
</AlertDescription>
</AlertContent>
</Alert>

Além da queima de taxas implementada pela atualização London, os validadores também podem incorrer em penalidades por estarem offline ou, pior, podem sofrer uma penalização por quebrar regras específicas que ameaçam a segurança da rede. Essas penalidades resultam em uma redução de ETH do saldo desse validador, que não é diretamente recompensado a nenhuma outra conta, efetivamente queimando/removendo-o de circulação.

### Calculando o preço médio do gás para deflação {#calculating-average-gas-price-for-deflation}

Conforme discutido acima, a quantidade de ETH emitida em um determinado dia depende do total de ETH em stake. No momento da redação deste artigo, isso é de aproximadamente 1.700 ETH/dia.

Para determinar o preço do gás médio necessário para compensar completamente essa emissão em um determinado período de 24 horas, começaremos calculando o número total de blocos em um dia, dado um tempo de bloco de 12 segundos:

- `(1 block / 12 seconds) * (60 seconds/minute) = 5 blocks/minute`
- `(5 blocks/minute) * (60 minutes/hour) = 300 blocks/hour`
- `(300 blocks/hour) * (24 hours/day) = 7200 blocks/day`

Cada bloco tem como meta `15x10^6 gas/block` ([mais sobre gás](/developers/docs/gas/)). Usando isso, podemos resolver o preço do gás médio (em unidades de gwei/gás) necessário para compensar a emissão, dada uma emissão diária total de ETH de 1.700 ETH:

- `7200 blocks/day * 15x10^6 gas/block * `**`Y gwei/gas`**` * 1 ETH/ 10^9 gwei = 1700 ETH/day`

Resolvendo para `Y`:

- `Y = (1700(10^9))/(7200 * 15(10^6)) = (17x10^3)/(72 * 15) = 16 gwei` (arredondando para apenas dois dígitos significativos)

Outra maneira de reorganizar esta última etapa seria substituir `1700` por uma variável `X` que representa a emissão diária de ETH e simplificar o restante para:

- `Y = (X(10^3)/(7200 * 15)) = X/108`

Podemos simplificar e escrever isso como uma função de `X`:

- `f(X) = X/108` onde `X` é a emissão diária de ETH e `f(X)` representa o preço em gwei/gás necessário para compensar todo o ETH recém-emitido.

Portanto, por exemplo, se `X` (emissão diária de ETH) subir para 1.800 com base no total de ETH em stake, `f(X)` (gwei necessário para compensar toda a emissão) seria então `17 gwei` (usando 2 dígitos significativos)

## Leitura adicional {#further-reading}

- [The Merge](/roadmap/merge/)
- [Ultrasound.money](https://ultrasound.money/) - _Painéis disponíveis para visualizar a emissão e queima de ETH em tempo real_
- [Mapeando a emissão do Ethereum](https://www.attestant.io/posts/charting-ethereum-issuance/) - _Jim McDonald 2020_
