---
title: Como a Fusão afetou o fornecimento de ETH
description: Detalhamento de como a Fusão afetou o fornecimento de ETH
lang: pt-br
---

# Como A Fusão impactou a oferta de ETH {#how-the-merge-impacts-ETH-supply}

A Fusão representou a transição da rede Ethereum de prova de trabalho para prova de participação, que ocorreu em setembro de 2022. A forma como o ETH foi emitido passou por mudanças no momento dessa transição. Anteriormente, o novo ETH era emitido de duas fontes: a camada de execução (ou seja, a Mainnet) e a camada de consenso (ou seja, a Beacon Chain). Desde o The Merge, a emissão na camada de execução não acontece mais. Vamos explicar isso melhor.

## Componentes da emissão de ETH {#components-of-eth-issuance}

Podemos dividir o fornecimento de ETH em duas forças principais: emissão e queima.

A **emissão** de ETH é o processo de criação de ETH que não existia anteriormente. A **queima** de ETH é quando o ETH existente é destruído, removendo-o de circulação. A taxa de emissão e de queima é calculada com base em vários parâmetros, e o saldo entre eles determina a taxa de inflação / deflação resultante de ether.

<Card
emoji=":chart_decreasing:"
title="Emissão de ETH resumida">

- Antes da transição para a prova de participação, eram emitidos para os mineradores aproximadamente 13.000 ETH/dia
- São emitidos para os stakers aproximadamente 1.700 ETH/dia, com base em cerca de 14 milhões de ETH totais em stake
- A emissão exata por participação flutua com base na quantidade total de ETH em stake
- **Desde A Fusão, restam apenas os ~1.700 ETH/dia, reduzindo a emissão total de novos ETH em ~88%**
- A queima: esta flutua de acordo com a demanda da rede. _Se_ um preço médio do gás de pelo menos 16 gwei for observado para um determinado dia, isso compensa efetivamente os ~1.700 ETH que são emitidos para os validadores e leva a inflação líquida do ETH para zero ou menos para esse dia.

</Card>

## Pré-fusão (histórico) {#pre-merge}

### Emissão da camada de execução {#el-issuance-pre-merge}

Na prova de trabalho, os mineradores só interagiam com a camada de execução e recebiam recompensas de bloco se fossem os primeiros mineradores a resolver o bloco seguinte. Desde a [melhoria Constantinople](/ethereum-forks/#constantinople) em 2019, essa recompensa era de 2 ETH por bloco. Os mineradores também foram recompensados por publicar blocos [ommer](/glossary/#ommer), que eram blocos válidos que não terminavam na cadeia mais longa/canônica. Essas recompensas atingiram o máximo de 1,75 ETH por ommer e foram _além da_ recompensa emitida pelo bloco canônico. O processo de mineração era uma atividade economicamente intensiva, que historicamente exigia altos níveis de emissão de ETH para sustentar.

### Emissão da camada de consenso {#cl-issuance-pre-merge}

A [Beacon Chain](/ethereum-forks/#beacon-chain-genesis) foi lançada em 2020. Em vez de mineradores, ela é protegida por validadores usando a prova de participação. Essa cadeia foi iniciada por usuários do Ethereum depositando ETH, de uma forma em um contrato inteligente na Mainnet (a camada de execução), que a Beacon Chain escuta, creditando ao usuário com uma quantidade igual de ETH na nova cadeia. Até a Fusão ter acontecido, os validadores da Beacon Chain não estavam processando transações e essencialmente estavam chegando a um consenso sobre o estado do próprio pool de validadores.

Os validadores da Beacon Chain são recompensados com ETH, por atestar o estado da cadeia e propor blocos. As recompensas (ou penalidades) são calculadas e distribuídas a cada época (a cada 6,4 minutos) com base no desempenho do validador. As recompensas do validador são **significativamente** menores do que as recompensas de mineração que foram emitidas anteriormente sob a prova de trabalho (2 ETH a cada ~13,5 segundos), pois operar um nó de validação não é economicamente tão intenso e, portanto, não requer nem garante uma recompensa tão alta.

### Detalhamento da emissão pré-fusão {#pre-merge-issuance-breakdown}

Fornecimento total de ETH: **~120.520.000 ETH** (no momento da Fusão em setembro de 2022)

**Emissão da camada de execução:**

- Estimava-se em 2,08 ETH por 13,3 segundos\*: **~4.930.000** ETH emitidos em um ano
- Resultou em uma taxa de inflação de **aproximadamente 4,09%** (4,93 milhões por ano / 120,5 milhões no total)
- \*Isso inclui os 2 ETH por bloco canônico, mais uma média de 0,08 ETH ao longo do tempo dos blocos ommer. Também usa 13,3 segundos, o tempo de bloco base alvo sem qualquer influência de uma [bomba de dificuldade](/glossary/#difficulty-bomb). ([Ver fonte](https://bitinfocharts.com/ethereum/))

**Emissão da camada de consenso:**

- Usando um total de 14.000.000 de ETH em stake, a taxa de emissão de ETH é de aproximadamente 1.700 ETH/dia ([Ver fonte](https://ultrasound.money/))
- Resulta em **~620.500** ETH emitidos em um ano
- Resultou em uma taxa de inflação de **aproximadamente 0,52%** (620,5 mil por ano / 119,3 milhões no total)

<Alert variant="update">
<AlertContent>
<AlertDescription>
**Taxa de emissão anualizada total (pré-fusão): ~4,61%** (4,09% + 0,52%)

**~88,7%** da emissão ia para os mineradores na camada de execução (4,09 / 4,61 \* 100)

**~11,3%** era emitido para os stakers na camada de consenso (0,52 / 4,61 \* 100) </AlertDescription> </AlertContent> </Alert>

## Pós-fusão (atualmente) {#post-merge}

### Emissão da camada de execução {#el-issuance-post-merge}

A emissão da camada de execução desde A Fusão é zero. A prova de trabalho não é mais um meio válido de produção de blocos sob as regras de consenso atualizadas. Toda a atividade da camada de execução é empacotada em "blocos beacon", que são publicados e atestados por validadores de prova de participação. As recompensas por atestar e publicar blocos beacon são contabilizadas separadamente na camada de consenso.

### Emissão da camada de consenso {#cl-issuance-post-merge}

A emissão da camada de consenso continua hoje como antes d'A Fusão, com pequenas recompensas para validadores que atestam e propõem blocos. As recompensas do validador continuam a se acumular em _saldos de validador_ que são gerenciados na camada de consenso. Diferentemente das contas atuais (contas de "execução"), que podem transacionar na Mainnet, essas contas Ethereum separadas não podem transacionar livremente com outras contas Ethereum. Os fundos nessas contas só podem ser sacados para um único endereço de execução especificado.

Desde a melhoria Shanghai/Capella, que ocorreu em abril de 2023, esses saques foram habilitados para os stakers. Os stakers são incentivados a remover seus _ganhos/recompensas (saldo acima de 32 ETH)_, pois esses fundos não contribuem para o peso de seu stake (que tem um máximo de 32).

Os stakers também podem optar por sair e sacar todo o saldo do validador. Para garantir que o Ethereum esteja estável, o número de validadores que saem simultaneamente é limitado.

Aproximadamente 0,33% do número total de validadores pode sair em um determinado dia. Por padrão, quatro (4) validadores podem sair por época (a cada 6,4 minutos, ou 900 por dia). Um (1) validador adicional pode sair para cada 65.536 (2<sup>16</sup>) validadores adicionais acima de 262.144 (2<sup>18</sup>). Por exemplo, com mais de 327.680 validadores, cinco (5) podem sair por época (1.125 por dia). Seis (6) serão permitidos com um número total de validadores ativos acima de 393.216, e assim por diante.

À medida que mais validadores sacam, o número máximo de validadores que podem sair será gradualmente reduzido para um mínimo de quatro para impedir intencionalmente que grandes quantidades desestabilizadoras de ETH em stake sejam sacadas simultaneamente.

### Detalhamento da inflação pós-fusão {#post-merge-inflation-breakdown}

- Fornecimento total de ETH: **~120.520.000 ETH** (no momento da Fusão em setembro de 2022)
- Emissão da camada de execução: **0**
- Emissão da camada de consenso: o mesmo que acima, taxa de emissão anualizada de **~0,52%** (com 14 milhões de ETH totais em stake)

<Alert variant="update">
<AlertContent>
<AlertDescription>
Taxa de emissão anualizada total: **~0,52%**

Redução líquida na emissão anual de ETH: **~88,7%** ((4,61% - 0,52%) / 4,61% \* 100) </AlertDescription> </AlertContent> </Alert>

## <Emoji text=":fire:" size="1" /> A queima {#the-burn}

A força oposta à emissão de ETH é a taxa em que o ETH é queimado. Para uma transação executar no Ethereum, a taxa mínima (conhecida como “taxa base”) deve ser paga, a qual flutua continuamente (bloco a bloco) dependendo da atividade da rede. A taxa é paga em ETH e é _necessária_ para que a transação seja considerada válida. Essa taxa é _queimada_ durante o processo de transação, removendo-a de circulação.

<Alert variant="update">
<AlertContent>
<AlertDescription>

A queima de taxas entrou no ar com a [melhoria London](/ethereum-forks/#london) em agosto de 2021 e permanece inalterada desde A Fusão. </AlertDescription> </AlertContent> </Alert>

Além da queima de taxas implementada pela atualização London, os validadores também podem incorrer em penalidades por estarem offline ou, pior ainda, eles podem ser removidos por quebrar regras específicas que ameaçam a segurança da rede. Essas penalidades resultam na redução de ETH do saldo do validador, que não é recompensado diretamente para nenhuma outra conta, efetivamente queimando/retirando-o de circulação.

### Cálculo do preço médio do gás para deflação {#calculating-average-gas-price-for-deflation}

Conforme discutido acima, a quantidade de ETH emitido em um determinado dia depende do total de ETH em stake. No momento da produção deste texto, isso equivale a aproximadamente 1.700 ETH/dia.

Para determinar o preço médio do gás necessário para compensar completamente essa emissão, em um determinado período de 24 horas, começaremos calculando o número total de blocos em um dia, dado um tempo de bloco de 12 segundos:

- `(1 bloco/12 segundos) * (60 segundos/minuto) = 5 blocos/minuto`
- `(5 blocos/minuto) * (60 minutos/hora) = 300 blocos/hora`
- `(300 blocos/hora) * (24 horas/dia) = 7.200 blocos/dia`

Cada bloco tem como alvo `15x10^6 gas/bloco` ([mais sobre gás](/developers/docs/gas/)). Usando isso, podemos calcular o preço médio do gás (em unidades de gwei/gás), necessário para compensar a emissão, dada uma emissão diária total de ETH de 1.700 ETH:

- `7.200 blocos/dia * 15x10^6 gás/bloco * `**`Y gwei/gás`**` * 1 ETH/ 10^9 gwei = 1.700 ETH/dia`

Resolvendo para `Y`:

- `Y = (1.700(10^9))/(7.200 * 15(10^6)) = (17x10^3)/(72 * 15) = 16 gwei` (arredondando para apenas dois dígitos significativos)

Outra maneira de reorganizar esta última etapa seria substituir `1700` por uma variável `X` que represente a emissão diária de ETH e simplificar o restante para:

- `Y = (X(10^3)/(7.200 * 15)) = X/108`

Podemos simplificar e escrever isso como uma função de `X`:

- `f(X) = X/108`, em que `X` é a emissão diária de ETH e `f(X)` representa o preço gwei/gás necessário para compensar todo o ETH recém-emitido.

Assim, por exemplo, se `X` (emissão diária de ETH) subir para 1.800 com base no ETH total em stake, `f(X)` (gwei necessário para compensar toda a emissão) seria então `17 gwei` (usando 2 dígitos significativos)

## Leitura adicional {#further-reading}

- [A Fusão](/roadmap/merge/)
- [Ultrasound.money](https://ultrasound.money/) - _Painéis disponíveis para visualizar a emissão e queima de ETH em tempo real_
- [Mapeando a Emissão do Ethereum](https://www.attestant.io/posts/charting-ethereum-issuance/) - _Jim McDonald 2020_
