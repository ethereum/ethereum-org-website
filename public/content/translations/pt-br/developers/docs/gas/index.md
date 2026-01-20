---
title: "Gás e taxas"
metaTitle: "Ethereum despesas: visão geral tecnológica"
description: "Saiba mais sobre a taxa de gás Ethereum, como eles são calculados e seu papel na segurança da rede e processamento de transações."
lang: pt-br
---

O gás é essencial para a rede Ethereum. É o combustível que permite que ele funcione, da mesma forma que um carro precisa de gasolina para funcionar.

## Pré-requisitos {#prerequisites}

Para entender melhor esta página, recomendamos que você leia primeiro sobre [transações](/developers/docs/transactions/) e a [EVM](/developers/docs/evm/).

## O que é gás? {#what-is-gas}

Gás refere-se à unidade que mede a quantidade de esforço computacional necessário para executar operações específicas na rede Ethereum.

Como cada transação Ethereum requer recursos computacionais para executar, estes recursos têm de ser pagos para garantir que o Ethereum não seja vulnerável a spam e não possa ficar preso em loops computacionais infinitos. Pagamentos por computação são feitos na forma de uma taxa de gas.

A taxa de gás é **a quantidade de gás usada para fazer alguma operação, multiplicada pelo custo por unidade de gás**. A taxa é paga independentemente da transação ter sucesso ou falhar.

![Um diagrama mostrando onde o gás é necessário nas operações da EVM](./gas.png)
_Diagrama adaptado de [Ethereum EVM illustrated](https://takenobu-hs.github.io/downloads/ethereum_evm_illustrated.pdf)_

Taxas de gas tem que ser pagas na moeda nativa do Ethereum, ether (ETH). Preços de gas são geralmente cotados em gwei, que é uma denominação do ETH. Cada gwei é igual a um bilionésimo de um ETH (0,000000001 ETH ou 10<sup>-9</sup> ETH).

Por exemplo, em vez de dizer que seu gás custa 0.000000001 Ether, pode-se dizer que ele custa 1 Gwei.

A palavra 'gwei' é uma contração de 'giga-wei', significando 'bilhão de wei'. Um gwei é igual a um bilhão de wei. O próprio Wei (nomeado em homenagem a [Wei Dai](https://wikipedia.org/wiki/Wei_Dai), criador do [b-money](https://www.investopedia.com/terms/b/bmoney.asp)) é a menor unidade de ETH.

## Como são calculadas as taxas de gás? {#how-are-gas-fees-calculated}

Você pode definir a quantidade de gás que está disposto a pagar ao enviar uma transação. Ao oferecer uma certa quantidade de gás, você está fazendo um lance para que sua transação seja incluída no próximo bloco. Se você oferecer muito pouco, é menos provável que os validadores escolham sua transação para inclusão, o que significa que sua transação pode ser executada com atraso ou simplesmente não. Se você oferecer muito, pode desperdiçar algum ETH. Então, como você pode saber quanto deve pagar?

O gás total que você paga é dividido em dois componentes: a `taxa base` e a `taxa de prioridade` (gorjeta).

A `taxa base` é definida pelo protocolo — você precisa pagar pelo menos esse valor para que sua transação seja considerada válida. A `taxa de prioridade` é uma gorjeta que você adiciona à `taxa base` para tornar sua transação atrativa para os validadores, para que eles a escolham para inclusão no próximo bloco.

Uma transação que paga apenas a `taxa base` é tecnicamente válida, mas é improvável que seja incluída, pois não oferece incentivo aos validadores para escolhê-la em vez de qualquer outra transação. A taxa de `prioridade` 'correta' é determinada pelo uso da rede no momento do envio da sua transação — se houver muita demanda, talvez você precise definir sua taxa de `prioridade` mais alta, mas quando houver menos demanda, você poderá pagar menos.

Por exemplo, digamos que Jordan tem que pagar a Taylor 1 ETH. Uma transferência de ETH requer 21.000 unidades de gás e a taxa básica é de 10 gwei. João inclui uma gorjeta de 2 gwei.

A taxa total agora seria igual a:

`unidades de gás usadas * (taxa de base + taxa de prioridade)`

onde a `taxa base` é um valor definido pelo protocolo e a `taxa de prioridade` é um valor definido pelo usuário como uma gorjeta para o validador.

p. ex., `21.000 * (10 + 2) = 252.000 gwei` (0,000252 ETH).

Quando João enviar o dinheiro, 1,000252 ETH serão deduzidos da conta de João. Tomé receberá 1,0000 ETH. O validador recebe a gorjeta de 0,000042 ETH. A `taxa base` de 0,00021 ETH é queimada.

### Taxa base {#base-fee}

Cada bloco tem uma taxa base que funciona como um preço de reserva. Para ser elegível para inclusão em um bloco, o preço oferecido por gás deve ser pelo menos igual à taxa base. A taxa base é calculada independentemente do bloco atual e, em vez disso, é determinada pelos blocos anteriores, tornando as taxas de transação mais previsíveis para os usuários. Quando o bloco é criado, esta **taxa base é "queimada"**, sendo removida de circulação.

A taxa base é calculada por uma fórmula que compara o tamanho do bloco anterior (a quantidade de gás usada para todas as transações) com o tamanho alvo (metade do limite de gás). A taxa base aumentará ou diminuirá em no máximo 12,5% por bloco se o tamanho do bloco alvo estiver acima ou abaixo do alvo, respectivamente. Esse crescimento exponencial torna economicamente inviável que o tamanho do bloco permaneça elevado indefinidamente.

| Número do bloco | Gás incluído | Aumento da taxa | Taxa base atual |
| --------------- | -----------: | --------------: | --------------: |
| 1               |          18M |              0% |        100 gwei |
| 2               |          36M |              0% |        100 gwei |
| 3               |          36M |           12,5% |      112,5 gwei |
| 4               |          36M |           12,5% |      126,6 gwei |
| 5               |          36M |           12,5% |      142,4 gwei |
| 6               |          36M |           12,5% |      160,2 gwei |
| 7               |          36M |           12,5% |      180,2 gwei |
| 8               |          36M |           12,5% |      202,7 gwei |

Na tabela acima, um exemplo é demonstrado usando 36 milhões como o limite de gás. Seguindo este exemplo, para criar uma transação no bloco de número 9, uma carteira informará ao usuário com certeza que a **taxa base máxima** a ser adicionada ao próximo bloco é `taxa base atual * 112,5%` ou `202,7 gwei * 112,5% = 228,1 gwei`.

Também é importante notar que, é improvável que veremos picos prolongados de blocos completos, devido à velocidade com que a taxa base aumenta antes de um bloco completo.

| Número do bloco                                     |                                        Gás incluído | Aumento da taxa |                                     Taxa base atual |
| --------------------------------------------------- | --------------------------------------------------: | --------------: | --------------------------------------------------: |
| 30                                                  |                                                 36M |           12,5% |                                         2705,6 gwei |
| ... | ... |           12,5% | ... |
| 50                                                  |                                                 36M |           12,5% |                                        28531,3 gwei |
| ... | ... |           12,5% | ... |
| 100                                                 |                                                 36M |           12,5% |                                     10302608,6 gwei |

### Taxa de prioridade (gorjetas) {#priority-fee}

A taxa de prioridade (gorjeta) incentiva os validadores a maximizar o número de transações em um bloco, limitado apenas pelo limite de gás do bloco. Sem gorjetas, um validador racional poderia incluir menos — ou até mesmo zero — transações sem qualquer penalidade direta da camada de execução ou da camada de consenso, já que as recompensas de staking são independentes de quantas transações estão em um bloco. Além disso, as gorjetas permitem que os usuários superem as ofertas de outros por prioridade dentro do mesmo bloco, sinalizando efetivamente a urgência.

### Taxa máxima {#maxfee}

Para executar uma transação na rede, os usuários podem especificar um limite máximo que estão dispostos a pagar para que a sua transação seja executada. Este parâmetro opcional é conhecido como `maxFeePerGas`. Para que uma transação seja executada, a taxa máxima deve exceder a soma da taxa base e da gorjeta. O remetente da transação é reembolsado pela diferença entre a taxa máxima e a soma da taxa base e da gorjeta.

### Tamanho do bloco {#block-size}

Cada bloco tem um tamanho alvo de metade do limite de gás atual, mas o tamanho dos blocos aumentará ou diminuirá de acordo com a demanda da rede, até que o limite do bloco seja atingido (2x o tamanho do bloco alvo). O protocolo atinge um tamanho médio de bloco de equilíbrio no alvo através do processo de _tâtonnement_. Isso significa que se o tamanho do bloco for maior que o tamanho do bloco alvo, o protocolo aumentará a taxa base para o bloco a seguir. Da mesma forma, o protocolo diminuirá a taxa base se o tamanho do bloco for menor que o tamanho do bloco de destino.

A quantidade pela qual a taxa base é ajustada é proporcional ao quão longe o tamanho do bloco atual está do alvo. Este é um cálculo linear de -12,5% para um bloco vazio, 0% no tamanho alvo, até +12,5% para um bloco que atinge o limite de gás. O limite de gás pode flutuar ao longo do tempo com base na sinalização do validador, bem como por meio de atualizações de rede. Você pode [ver as alterações no limite de gás ao longo do tempo aqui](https://eth.blockscout.com/stats/averageGasLimit?interval=threeMonths).

[Mais sobre blocos](/developers/docs/blocks/)

### Calculando as taxas de gás na prática {#calculating-fees-in-practice}

Você pode explicitamente declarar o quanto está disposto a pagar para que sua transação seja executada. No entanto, a maioria dos provedores de carteira definirá automaticamente uma taxa de transação recomendada (taxa base + taxa prioritária recomendada) para reduzir a quantidade de complexidade que pesa sobre seus usuários.

## Porque as taxas de gás existem? {#why-do-gas-fees-exist}

Em resumo, as taxas de gás ajudam a manter a rede Ethereum segura. Ao exigir uma taxa para cada cálculo executado na rede, evitamos que os maus atores enviem spam para a rede. Para evitar loops infinitos acidentais ou hostis ou outro desperdício de cálculo no código, cada transação deve definir um limite para quantas etapas de cálculo de execução de código ela pode usar. A unidade fundamental de cálculo é "gás".

Embora uma transação inclua um limite, qualquer gás não utilizado em uma transação é devolvido ao usuário (p. ex., `taxa máxima - (taxa base + gorjeta)` é devolvido).

![Diagrama mostrando como o gás não utilizado é reembolsado](../transactions/gas-tx.png)
_Diagrama adaptado de [Ethereum EVM illustrated](https://takenobu-hs.github.io/downloads/ethereum_evm_illustrated.pdf)_

## Qual é o limite de gás? {#what-is-gas-limit}

O limite de gás se refere à quantidade máxima de gás que você está disposto a consumir em uma transação. Transações mais complicadas que envolvem [contratos inteligentes](/developers/docs/smart-contracts/) exigem mais trabalho computacional, portanto, exigem um limite de gás mais alto do que um simples pagamento. Uma transferência ETH padrão requer um limite de gás de 21.000 unidades de gás.

Por exemplo, se você colocar um limite de gás de 50.000 para uma simples transferência de ETH, a EVM consumirá 21.000 e você receberá de volta os 29.000 restantes. No entanto, se você especificar muito pouco gás, por exemplo, menor do limite mínimo de gás de 20.000 para uma transferência do ETH, a transação falhará. Será rejeitado antes de ser em bloco. Por outro lado, se uma transação estava sem gás durante a execução (por exemplo, um contrato inteligente usa todo o gás em processo), o EVM cancelará alterações, mas todo o gás ainda será consumido.

## Por que as taxas de gás são tão altas? {#why-can-gas-fees-get-so-high}

As altas taxas de gás são devidas à popularidade do Ethereum. Se houver muita demanda, os usuários devem oferecer valores mais altos de gorjeta e tentar superar as transações de outros usuários. Uma gorjeta mais alta pode aumentar a probabilidade de sua transação entrar no próximo bloco. Além disso, aplicativos de contratos inteligentes mais complexos podem estar realizando muitas operações para dar suporte a suas funções, fazendo com que consumam muito combustível.

## Iniciativas para reduzir os custos de gás {#initiatives-to-reduce-gas-costs}

As [atualizações de escalabilidade](/roadmap/) do Ethereum devem, em última análise, resolver alguns dos problemas da taxa de gás, o que, por sua vez, permitirá que a plataforma processe milhares de transações por segundo e escale globalmente.

A escalabilidade da camada 2 é uma iniciativa primária para melhorar significativamente os custos do gás, a experiência do usuário e a escalabilidade.

[Mais sobre escalabilidade de camada 2](/developers/docs/scaling/#layer-2-scaling)

## Monitoramento de taxas de gás {#monitoring-gas-fees}

Se você deseja monitorar os preços do gás, para poder enviar seu ETH por menos, pode usar muitas ferramentas diferentes, como:

- [Etherscan](https://etherscan.io/gastracker) _Estimador de preço do gás da transação_
- [Blockscout](https://eth.blockscout.com/gas-tracker) _Estimador de preço do gás de transação de código aberto_
- [ETH Gas Tracker](https://www.ethgastracker.com/) _Monitore e acompanhe os preços do gás do Ethereum e da L2 para reduzir as taxas de transação e economizar dinheiro_
- [Blocknative ETH Gas Estimator](https://chrome.google.com/webstore/detail/blocknative-eth-gas-estim/ablbagjepecncofimgjmdpnhnfjiecfm) _Extensão do Chrome para estimativa de gás que suporta tanto transações legadas do Tipo 0 quanto transações do Tipo 2 EIP-1559._
- [Cryptoneur Gas Fees Calculator](https://www.cryptoneur.xyz/gas-fees-calculator) _Calcule as taxas de gás em sua moeda local para diferentes tipos de transação na Rede Principal, Arbitrum e Polygon._

## Ferramentas relacionadas {#related-tools}

- [Plataforma de Gás da Blocknative](https://www.blocknative.com/gas) _API de estimativa de gás alimentada pela plataforma global de dados do mempool da Blocknative_
- [Gas Network](https://gas.network) Oráculos de Gás na Cadeia. Suporte para mais de 35 redes.

## Leitura adicional {#further-reading}

- [O Gás do Ethereum Explicado](https://defiprime.com/gas)
- [Reduzindo o consumo de gás dos seus Contratos Inteligentes](https://medium.com/coinmonks/8-ways-of-reducing-the-gas-consumption-of-your-smart-contracts-9a506b339c0a)
- [Estratégias de Otimização de Gás para Desenvolvedores](https://www.alchemy.com/overviews/solidity-gas-optimization)
- [Documentação do EIP-1559](https://eips.ethereum.org/EIPS/eip-1559).
- [Recursos sobre o EIP-1559 de Tim Beiko](https://hackmd.io/@timbeiko/1559-resources)
- [EIP-1559: Separando Mecanismos de Memes](https://web.archive.org/web/20241126205908/https://research.2077.xyz/eip-1559-separating-mechanisms-from-memes)
