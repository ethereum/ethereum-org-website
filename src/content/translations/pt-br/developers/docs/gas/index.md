---
title: Gás e taxas
description:
lang: pt-br
---

O gás é essencial para a rede Ethereum. É o combustível que permite que ele funcione, da mesma forma que um carro precisa de gasolina para funcionar.

## Pré-requisitos {#prerequisites}

Para entender melhor esta página, recomendamos que você leia primeiro sobre [transações](/developers/docs/transactions/) e [EVM](/developers/docs/evm/).

## O que é gás? {#what-is-gas}

Gás refere-se à unidade que mede a quantidade de esforço computacional necessário para executar operações específicas na rede Ethereum.

Dado que as transações Ethereum requer recursos computacionais para ser executada, cada uma delas requer uma taxa. Gas refere-se à taxa requerida para realizar com sucesso uma transação na Ethereum.

![Diagrama mostrando onde o consumo de gás é utilizado para as operações da EVM](./gas.png) _Diagrama adaptado de [Ethereum EVM ilustrado](https://takenobu-hs.github.io/downloads/ethereum_evm_illustrated.pdf)_

Essencialmente, as taxas de gas são pagas na moeda nativa do Ethereum (ETH). Os preços do gás são indicados em Gwei, uma denominação propria do ETH na qual cada Gwei é igual a 0,00000001 ETH (10<sup>-9</sup> OTH). Por exemplo, em vez de dizer que seu gás custa 0.000000001 Ether, pode-se dizer que ele custa 1 Gwei. A própria palavra "gwei" quer dizer "giga-wei", e equivale a 1.000.000.000 "wei". O próprio Wei (nomeado em homenagem a [Wei Dai](https://wikipedia.org/wiki/Wei_Dai), criador do [B-Money](https://www.investopedia.com/terms/b/bmoney.asp)) é a menor unidade de ETH.

## Antes da atualização de Londres {#pre-london}

A forma como as taxas de transação na rede Ethereum são calculadas foram alteradas com a [atualização de Londres](/history/#london) de agosto de 2021. Aqui está uma recapitulação de como as coisas funcionavam:

Digamos que Alice tenha que pagar a Roberto 1 ETH. Na transação, o limite de gás é de 21.000 unidades e o preço do gás é de 200 gwei.

A taxa total fica sendo:: `Gas units (limit) * Gas price per unit`, ou seja, `21,000 * 200 = 4,200,000 gwei` ou 0,0042 ETH

Quando Alice enviasse o dinheiro, 1,0042 ETH seriam deduzidos da conta dela. Roberto receberia um crédito de 1.0000 ETH. O minerador receberia 0,0042 ETH.

Este vídeo oferece uma visão concisa do gás e por que ele existe:

<YouTube id="AJvzNICwcwc" />

## Depois da atualização de Londres {#post-london}

[A atualização de Londres](/history/#london) foi implementada em 5 de agosto de 2021 para tornar as transações no Ethereum mais previsíveis para os usuários por meio de uma revisão no mecanismo de taxas de transação do Ethereum. Os benefícios introduzidos por meio dessa alteração incluem uma melhor estimativa na taxa de transação, geralmente fazendo uma inclusão mais rápida da transação e a compensação na emissão de ETH através da queima de um percentual das taxas de transação.

Começando com a atualização de Londres da rede, cada bloco tem uma taxa base, o preço mínimo por unidade de gás para inclusão neste bloco, calculado pela rede com base na demanda por espaço em bloco. Como a taxa base da taxa da transação é queimada, espera-se que os usuários também definam uma gorjeta (taxa de prioridade) nas suas transações. A gorjeta compensa os mineradores por executar e propagar as transações de usuário em blocos e espera-se que seja definida automaticamente pela maioria das carteiras.

O cálculo da taxa total de transação funciona da seguinte forma: `Gas units (limit) * (Base fee + Tip)`

Digamos que João tenha que pagar a Tomé 1 ETH. Na transação, o limite de gás é de 21.000 unidades e a taxa base é de 100 gwei. João inclui uma gorjeta de 10 gwei.

Usando a fórmula acima podemos calcular isso como `21,000 * (100 + 10) = 2,310,000 gwei` ou 0,00231 ETH.

Quando João enviar o dinheiro, serão deduzidos 1,00231 ETH da sua conta. Tomé receberá 1,0000 ETH. O minerador recebe a gorjeta de 0,00021 ETH. A taxa base de 0,0021 ETH é queimada.

Além disso, João também pode definir uma taxa máxima (`maxFeePerGas`) para a transação. A diferença entre a taxa máxima e a taxa real é reembolsada a João, isto é, `refund = max fee - (base fee + priority fee)`. João pode definir um valor máximo a pagar para a transação ser executada e não se preocupar em pagar "além" da taxa base quando a transação for executada.

### Tamanho do bloco {#block-size}

Antes da atualização de Londres, o Ethereum tinha blocos de tamanho fixo. Em tempos de alta demanda de rede, esses blocos operavam com capacidade total. Como resultado, os usuários muitas vezes tinham que esperar pela redução dessa alta demanda para serem incluídos em um bloco, o que levava a uma experiência de usuário ruim.

A atualização de Londres introduziu blocos de tamanho variável no Ethereum. Cada bloco tem um tamanho alvo de 15 milhões de gás, mas o tamanho dos blocos vai aumentar ou diminuir de acordo com a demanda da rede, até o limite de bloco de 30 milhões de gás (2 vezes o tamanho do bloco-alvo). O protocolo alcança um tamanho de bloco de equilíbrio de 15 milhões em média através do processo de _tâtonnement_. Isso significa que se o tamanho do bloco for maior que o tamanho do bloco-alvo, o protocolo aumentará a taxa base para o bloco seguinte. Da mesma forma, o protocolo irá diminuir a taxa base se o tamanho do bloco for menor que o tamanho do bloco de destino. A quantidade pela qual a taxa base é ajustada é proporcional à distância do tamanho do bloco atual do alvo. [Mais sobre blocos](/developers/docs/blocks/).

### Taxa de base {#base-fee}

Cada bloco tem uma taxa base que atua como um preço de reserva. Para ser elegível para inclusão em um bloco, o preço oferecido por gás tem que ser, pelo menos, igual à taxa base. A taxa base é calculada independentemente do bloco atual e, em vez disso, é determinada pelos blocos anteriores – tornando as taxas de transação mais previsíveis para os usuários. Quando o bloco é minerado essa taxa base é "queimada", removendo-a de circulação.

A taxa base é calculada por uma fórmula que compara o tamanho do bloco anterior (a quantidade de gas usado para todas as transações) com o tamanho do alvo. A taxa base aumentará em um máximo de 12,5% por bloco se o tamanho do bloco de destino for excedido. Este crescimento exponencial torna economicamente inviável que o tamanho do bloco permaneça elevado indefinidamente.

| Número do bloco | Gás incluído | Aumento de taxa | Taxa base atual |
| --------------- | -----------: | --------------: | --------------: |
| 1               |          15M |              0% |        100 gwei |
| 2               |          30M |              0% |        100 gwei |
| 3               |          30M |           12,5% |      112,5 gwei |
| 4               |          30M |           12,5% |      126,6 gwei |
| 5               |          30M |           12,5% |      142,4 gwei |
| 6               |          30M |           12,5% |      160,2 gwei |
| 7               |          30M |           12,5% |      180,2 gwei |
| 8               |          30M |           12,5% |      202,7 gwei |

Relativo ao mercado de leilão de gás antes da atualização de Londres, esta mudança no mecanismo de taxa de transação faz com que a previsão de taxas seja mais confiável. De acordo com a tabela acima, para criar uma transação no bloco número 9, uma carteira informará o usuário que a **maximum base fee** a ser adicionada ao próximo bloco é `current base fee * 112.5%` ou `202.8 gwei * 112.5% = 228.1 gwei`.

Também é importante notar que não é provável que vejamos picos prolongados de blocos completos devido à velocidade com que a taxa base aumenta precedendo um bloco completo.

| Número do bloco | Gás incluído | Aumento da taxa | Taxa base atual |
| --------------- | -----------: | --------------: | --------------: |
| 30              |          30M |           12,5% |     2705,6 gwei |
| ...             |          ... |           12,5% |             ... |
| 50              |          30M |           12,5% |    28531,3 gwei |
| ...             |          ... |           12,5% |             ... |
| 100             |          30M |           12,5% | 10302608,6 gwei |

### Taxa de prioridade (gorjetas) {#priority-fee}

Antes da atualização de Londres, os mineradores receberiam a taxa total de gás de qualquer transação incluída em um bloco.

Com a nova taxa base sendo queimada, a atualização de Londres introduziu uma taxa de prioridade (gorjeta) para incentivar os mineradores a incluírem uma transação no bloco. Sem gorjetas, os mineradores considerariam economicamente viável minerar blocos vazios, uma vez que receberiam a mesma recompensa por bloco. Em condições normais, uma pequena gorjeta fornece um incentivo mínimo para incluir uma transação. Para transações que precisam ser executadas preferencialmente antes de outras transações no mesmo bloco, será necessária uma gorjeta mais alta para tentar superar as transações concorrentes.

### Taxa máxima {#maxfee}

Para executar uma transação na rede, os usuários podem especificar um limite que eles estão dispostos a pagar para que sua transação seja executada. Este parâmetro opcional é conhecido como `maxFeePerGas`. Para que uma transação seja executada, a taxa máxima deve exceder a soma da taxa base e a gorjeta. O remetente da transação é reembolsado com a diferença entre a taxa máxima e a soma da taxa base com a gorjeta.

### Calculando as taxas {#calculating-fees}

Um dos principais benefícios alcançados com a atualização de Londres é a melhora na experiência do usuário ao definir taxas de transação. Para carteiras que suportam a atualização, em vez de explicitamente dizer quanto você está disposto a pagar para fazer passar sua transação, os provedores de carteira definirão automaticamente uma taxa de transação recomendada (taxa base + taxa de prioridade recomendada) para reduzir a quantidade de complexidade que pesa sobre os usuários.

## EIP-1559 {#eip-1559}

A implementação de [EIP-1559](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-1559.md) na atualização de Londres tornou o mecanismo de taxa de transação mais complexo do que o anterior leilão de preço de gás, mas tem a vantagem de tornar as taxas de gás mais previsíveis, resultando em um mercado de taxas de transação mais eficiente. Os usuários podem enviar transações com um `maxFeePerGas` que corresponde a quanto estão dispostos a pagar para que a transação seja executada, sabendo que não vão pagar mais do que o preço de mercado do gás (`baseFeePerGas`), e receber um reembolso do adicional menos a gorjeta.

Este vídeo explica o EIP-1559 e os benefícios que ele traz:

<YouTube id="MGemhK9t44Q" />

Se estiver interessado, leia as [especificações exatas da EIP-1559](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-1559.md).

Continue se aprofundizando com estes [recursos da EIP-1559](https://hackmd.io/@timbeiko/1559-resources).

## Porque as taxas de gás existem? {#why-do-gas-fees-exist}

Em resumo, as taxas de gás ajudam a manter a rede Ethereum segura. Ao exigir uma taxa para cada cálculo executado na rede, evitamos que os agentes mal-intencionados façam spam na rede. Para prevenir a geração de laços infinitos acidentais ou hostis ou outro desperdício computacional no código, cada transação deve definir um limite do número de etapas computacionais de execução de código que ela pode usar. A unidade fundamental do cálculo é "gás".

Embora uma transação inclua um limite, qualquer gás não usado em uma transação é retornado ao usuário (por exemplo: `max fee - (base fee + tip)` é devolvida).

![Diagrama que mostra como o gás não utilizado é reembolsado](../transactions/gas-tx.png) _Diagrama adaptado do [Ethereum EVM ilustrado](https://takenobu-hs.github.io/downloads/ethereum_evm_illustrated.pdf)_

## Qual é o limite de gás? {#what-is-gas-limit}

Limite de gás refere-se à quantidade máxima de gás que você está disposto a consumir em uma transação. Transações mais complicadas envolvendo [contratos inteligentes](/developers/docs/smart-contracts/) requerem mais trabalho computacional e, portanto, precisam de um limite de gás maior do que um simples pagamento. Uma transferência padrão de ETH requer um limite de gás de 21.000 unidades de gás.

Por exemplo, se você colocasse um limite de gás de 50.000 para uma transferência simples de ETH, a EVM consumiria 21.000 e você recuperaria os restantes 29.000. No entanto, se muito pouco gás for especificado, por exemplo, um limite de gás de 20.000 para uma simples transferência de ETH, a EVM consumirá esses 20.000 de gás, tentando completar a transação, mas esta não será completada. Nesse caso, a EVM reverte qualquer alteração, mas devido a que o minerador já gastou essas 20 mil unidades de gás nesse trabalho, esse gás é consumido.

## Por que as taxas de gás são tão altas? {#why-can-gas-fees-get-so-high}

Se as taxas de gás são elevadas é porque a rede de Ethereum é popular. É importante entender que para realizar qualquer operação no Ethereum é necessário consumir gás, e o espaço onde se encaixam essas transações é limitado em cada bloco. Essas taxas incluem cálculos, armazenamento ou manipulação de dados, ou ainda transferência de tokens, consumindo assim diferentes quantidades de unidades de gás. À medida que a funcionalidade dos dapps se torna mais complexa, o número de operações que um contrato inteligente executa também cresce. Isso quer dizer que cada transação ocupa mais espaço dentro de cada bloco de tamanho limitado. Se há muita demanda, os usuários devem oferecer uma gorjeta maior para tentar superar as transações de outros usuários. Uma taxa maior aumenta as chances de sua transação ser confirmada no próximo bloco.

O preço do gás por si só não determina realmente quanto temos de pagar por uma determinada transação. Para calcular a taxa de transação, temos que multiplicar o gás usado pela taxa do gás, que é medida em Gwei.

## Iniciativas para reduzir os custos do gás {#initiatives-to-reduce-gas-costs}

As [melhorias de dimensionamento](/upgrades/) do Ethereum deverão finalmente abordar algumas dos problemas relacionados ao custo do gás, o que, por sua vez, irá habilitar a plataforma para processar milhares de transações por segundo e assim dimensionar globalmente.

A ampliação da rede Ethereum para sua segunda camada é uma iniciativa fundamental para melhorar consideravelmente os custos do gás, a experiência do usuário e o dimensionamento. [Mais sobre o dimensionamento da camada 2.](/developers/docs/scaling/#layer-2-scaling).

O novo modelo de prova de participação, introduzido pela Beacon Chain, deve reduzir o alto consumo de energia e a dependência de hardware especializado. Essa cadeia permitirá que a rede descentralizada de Ethereum atinja consensos e mantenha a rede segura, enquanto limita o consumo de energia, exigindo, no seu lugar, um compromisso financeiro.

Qualquer usuário com pelo menos 32 ETH pode depositá-los e tornar-se um validador responsável pelo processamento de transações, validando blocos e propondo que novos blocos se adicionem à blockchain. O resto dos usuários com menos de 32 ETH também podem investir em pools de depósito.

## Estratégias para pagar menos gás {#strategies-for-you-to-reduce-gas-costs}

Para reduzir os custos de gás, você pode ajustar a gorjeta dependendo do nível de prioridade de sua transação. De fato, os mineradores "trabalharão" e executarão transações que ofereçam uma gorjeta superior por gás. Desta maneira, aceitarão sua proposta e estarão menos inclinados a executar transações com gorjetas menores.

Se quiser monitorar os preços do gás para poder enviar o seu ETH a um menor custo, você pode usar muitas ferramentas diferentes, tais como:

- [Etherscan Gas Tracker](https://etherscan.io/gastracker): _calculadora do preço do gas de uma transação_
- [Blocknative ETH Gas Estimator](https://chrome.google.com/webstore/detail/blocknative-eth-gas-estim/ablbagjepecncofimgjmdpnhnfjiecfm): _uma extensão do Chrome para estimar o preço do gás e que suporta transações do tipo 0 e do tipo 2 EIP-1559._

- [ ETH Gas StationH](https://ethgasstation.info/): _métricas orientadas ao consumidor no mercado de gás de Ethereum_
- [Cryptoneur Gas Fees Calculator](https://www.cryptoneur.xyz/gas-fees-calculator) _Calculate gas fees in your local currency for different transaction types on Mainnet, Arbitrum, and Polygon._

## Ferramentas relacionadas {#related-tools}

- [Bloxy Gas Analytics](https://stat.bloxy.info/superset/dashboard/gas/?standalone=true): _estatísticas da gás na rede Ethereum_
- [Gas Platform da Blocknative](https://www.blocknative.com/gas): _API para estimativas do gás desenvolvida pela plataforma global de dados de mempool da Blocknative_

## Leitura adicional {#further-reading}

- [Explicação sobre o gás de Ethereum](https://defiprime.com/gas)
- [O Ethereum fica mais caro com o aumento de preços?](https://docs.ethhub.io/questions-about-ethereum/is-ethereum-more-expensive-to-use-as-price-rises/)
- [Reduzindo o consumo de gás de seus contratos inteligentes](https://medium.com/coinmonks/8-ways-of-reducing-the-gas-consumption-of-your-smart-contracts-9a506b339c0a)
- [Prova de participação versus Prova de trabalho](https://blockgeeks.com/guides/proof-of-work-vs-proof-of-stake/)

## Tópicos relacionados {#related-topics}

- [Mineração](/developers/docs/consensus-mechanisms/pow/mining/)
