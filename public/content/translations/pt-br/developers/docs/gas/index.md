---
title: Gás e taxas
metaTitle: "Gás e taxas do Ethereum: visão geral técnica"
description: Aprenda sobre as taxas de gas do Ethereum, como elas são calculadas e seu papel na segurança da rede e no processamento de transações.
lang: pt-br
---

O gás é essencial para a rede [Ethereum](/). Ele é o combustível que permite que ela opere, da mesma forma que um carro precisa de gasolina para funcionar.

## Pré-requisitos {#prerequisites}

Para entender melhor esta página, recomendamos que você leia primeiro sobre [transações](/developers/docs/transactions/) e a [EVM](/developers/docs/evm/).

## O que é gás? {#what-is-gas}

Gás refere-se à unidade que mede a quantidade de esforço computacional necessário para executar operações específicas na rede Ethereum.

Como cada transação na Ethereum exige recursos computacionais para ser executada, esses recursos precisam ser pagos para garantir que a Ethereum não seja vulnerável a spam e não fique presa em loops computacionais infinitos. O pagamento pela computação é feito na forma de uma taxa de gas.

A taxa de gas é **a quantidade de gás usada para realizar alguma operação, multiplicada pelo custo por unidade de gás**. A taxa é paga independentemente de uma transação ser bem-sucedida ou falhar.

![A diagram showing where gas is needed in EVM operations](./gas.png)
_Diagrama adaptado de [Ethereum EVM illustrated](https://takenobu-hs.github.io/downloads/ethereum_evm_illustrated.pdf)_

As taxas de gas devem ser pagas na moeda nativa da Ethereum, o ether (ETH). Os preços do gás geralmente são cotados em gwei, que é uma denominação do ETH. Cada gwei é igual a um bilionésimo de um ETH (0,000000001 ETH ou 10<sup>-9</sup> ETH).

Por exemplo, em vez de dizer que seu gás custa 0,000000001 ether, você pode dizer que seu gás custa 1 gwei.

A palavra 'gwei' é uma contração de 'giga-wei', que significa 'bilhão de Wei'. Um gwei é igual a um bilhão de Wei. O próprio Wei (nomeado em homenagem a [Wei Dai](https://wikipedia.org/wiki/Wei_Dai), criador do [b-money](https://www.investopedia.com/terms/b/bmoney.asp)) é a menor unidade de ETH.

## Como as taxas de gas são calculadas? {#how-are-gas-fees-calculated}

Você pode definir a quantidade de gás que está disposto a pagar ao enviar uma transação. Ao oferecer uma certa quantidade de gás, você está dando um lance para que sua transação seja incluída no próximo bloco. Se você oferecer muito pouco, é menos provável que os validadores escolham sua transação para inclusão, o que significa que sua transação pode ser executada com atraso ou nem ser executada. Se você oferecer muito, pode desperdiçar algum ETH. Então, como você pode saber quanto pagar?

O gás total que você paga é dividido em dois componentes: a `base fee` e a `priority fee` (taxa de prioridade).

A `base fee` é definida pelo protocolo — você deve pagar pelo menos esse valor para que sua transação seja considerada válida. A `priority fee` é uma taxa de prioridade que você adiciona à taxa básica para tornar sua transação atraente para os validadores, para que eles a escolham para inclusão no próximo bloco.

Uma transação que paga apenas a `base fee` é tecnicamente válida, mas improvável de ser incluída porque não oferece nenhum incentivo aos validadores para escolhê-la em vez de qualquer outra transação. A taxa de `priority` 'correta' é determinada pelo uso da rede no momento em que você envia sua transação — se houver muita demanda, você pode ter que definir sua taxa de `priority` mais alta, mas quando há menos demanda, você pode pagar menos.

Por exemplo, digamos que Jordan tenha que pagar a Taylor 1 ETH. Uma transferência de ETH exige 21.000 unidades de gás, e a taxa básica é de 10 gwei. Jordan inclui uma taxa de prioridade de 2 gwei.

A taxa total agora seria igual a:

`units of gas used * (base fee + priority fee)`

onde a `base fee` é um valor definido pelo protocolo e a `priority fee` é um valor definido pelo usuário como uma taxa de prioridade para o validador.

ex., `21,000 * (10 + 2) = 252,000 gwei` (0,000252 ETH).

Quando Jordan envia o dinheiro, 1,000252 ETH será deduzido da conta de Jordan. Taylor receberá o crédito de 1,0000 ETH. O validador recebe a taxa de prioridade de 0,000042 ETH. A `base fee` de 0,00021 ETH é queimada.

### Taxa básica {#base-fee}

Todo bloco tem uma taxa básica que atua como um preço de reserva. Para ser elegível para inclusão em um bloco, o preço oferecido por gás deve ser pelo menos igual à taxa básica. A taxa básica é calculada independentemente do bloco atual e, em vez disso, é determinada pelos blocos anteriores a ele, tornando as taxas de transação mais previsíveis para os usuários. Quando o bloco é criado, essa **taxa básica é "queimada"**, removendo-a de circulação.

A taxa básica é calculada por uma fórmula que compara o tamanho do bloco anterior (a quantidade de gás usada para todas as transações) com o tamanho alvo (metade do limite de gas). A taxa básica aumentará ou diminuirá em no máximo 12,5% por bloco se o tamanho do bloco alvo estiver acima ou abaixo do alvo, respectivamente. Esse crescimento exponencial torna economicamente inviável que o tamanho do bloco permaneça alto indefinidamente.

| Número do Bloco | Gás Incluído | Aumento da Taxa | Taxa Básica Atual |
| --------------- | -----------: | --------------: | ----------------: |
| 1               |          18M |              0% |          100 gwei |
| 2               |          36M |              0% |          100 gwei |
| 3               |          36M |           12,5% |        112,5 gwei |
| 4               |          36M |           12,5% |        126,6 gwei |
| 5               |          36M |           12,5% |        142,4 gwei |
| 6               |          36M |           12,5% |        160,2 gwei |
| 7               |          36M |           12,5% |        180,2 gwei |
| 8               |          36M |           12,5% |        202,7 gwei |

Na tabela acima, um exemplo é demonstrado usando 36 milhões como o limite de gas. Seguindo este exemplo, para criar uma transação no bloco número 9, uma carteira informará ao usuário com certeza que a **taxa básica máxima** a ser adicionada ao próximo bloco é `current base fee * 112.5%` ou `202.7 gwei * 112.5% = 228.1 gwei`.

Também é importante notar que é improvável que vejamos picos prolongados de blocos cheios devido à velocidade com que a taxa básica aumenta antes de um bloco cheio.

| Número do Bloco | Gás Incluído | Aumento da Taxa | Taxa Básica Atual |
| --------------- | -----------: | --------------: | ----------------: |
| 30              |          36M |           12,5% |       2705,6 gwei |
| ...             |          ... |           12,5% |               ... |
| 50              |          36M |           12,5% |      28531,3 gwei |
| ...             |          ... |           12,5% |               ... |
| 100             |          36M |           12,5% |   10302608,6 gwei |

### Taxa de prioridade {#priority-fee}

A taxa de prioridade incentiva os validadores a maximizar o número de transações em um bloco, limitados apenas pelo limite de gas do bloco. Sem as taxas de prioridade, um validador racional poderia incluir menos — ou até zero — transações sem nenhuma penalidade direta na camada de execução ou na camada de consenso, já que as recompensas de staking são independentes de quantas transações estão em um bloco. Além disso, as taxas de prioridade permitem que os usuários superem os lances de outros por prioridade dentro do mesmo bloco, sinalizando efetivamente urgência. 

### Taxa máxima {#maxfee}

Para executar uma transação na rede, os usuários podem especificar um limite máximo que estão dispostos a pagar para que sua transação seja executada. Esse parâmetro opcional é conhecido como `maxFeePerGas`. Para que uma transação seja executada, a taxa máxima deve exceder a soma da taxa básica e da taxa de prioridade. O remetente da transação é reembolsado com a diferença entre a taxa máxima e a soma da taxa básica e da taxa de prioridade.

### Tamanho do bloco {#block-size}

Cada bloco tem um tamanho alvo de metade do limite de gas atual, mas o tamanho dos blocos aumentará ou diminuirá de acordo com a demanda da rede, até que o limite do bloco seja atingido (2x o tamanho do bloco alvo). O protocolo atinge um tamanho médio de bloco em equilíbrio no alvo através do processo de _tâtonnement_. Isso significa que se o tamanho do bloco for maior que o tamanho do bloco alvo, o protocolo aumentará a taxa básica para o bloco seguinte. Da mesma forma, o protocolo diminuirá a taxa básica se o tamanho do bloco for menor que o tamanho do bloco alvo.

A quantia pela qual a taxa básica é ajustada é proporcional à distância entre o tamanho do bloco atual e o alvo. Este é um cálculo linear de -12,5% para um bloco vazio, 0% no tamanho alvo, até +12,5% para um bloco que atinge o limite de gas. O limite de gas pode flutuar ao longo do tempo com base na sinalização do validador, bem como por meio de atualizações da rede. Você pode [ver as mudanças no limite de gas ao longo do tempo aqui](https://eth.blockscout.com/stats/averageGasLimit?interval=threeMonths).

[Mais sobre blocos](/developers/docs/blocks/)

### Calculando taxas de gas na prática {#calculating-fees-in-practice}

Você pode declarar explicitamente quanto está disposto a pagar para que sua transação seja executada. No entanto, a maioria dos provedores de carteira definirá automaticamente uma taxa de transação recomendada (taxa básica + taxa de prioridade recomendada) para reduzir a quantidade de complexidade imposta aos seus usuários.

## Por que as taxas de gas existem? {#why-do-gas-fees-exist}

Em suma, as taxas de gas ajudam a manter a rede Ethereum segura. Ao exigir uma taxa para cada computação executada na rede, evitamos que agentes mal-intencionados enviem spam para a rede. Para evitar loops infinitos acidentais ou hostis ou outros desperdícios computacionais no código, cada transação é obrigada a definir um limite de quantas etapas computacionais de execução de código ela pode usar. A unidade fundamental de computação é o "gás".

Embora uma transação inclua um limite, qualquer gás não utilizado em uma transação é devolvido ao usuário (ex., `max fee - (base fee + tip)` é devolvido).

![Diagram showing how unused gas is refunded](../transactions/gas-tx.png)
_Diagrama adaptado de [Ethereum EVM illustrated](https://takenobu-hs.github.io/downloads/ethereum_evm_illustrated.pdf)_

## O que é o limite de gas? {#what-is-gas-limit}

O limite de gas refere-se à quantidade máxima de gás que você está disposto a consumir em uma transação. Transações mais complicadas envolvendo [contratos inteligentes](/developers/docs/smart-contracts/) exigem mais trabalho computacional, portanto, exigem um limite de gas maior do que um simples pagamento. Uma transferência padrão de ETH exige um limite de gas de 21.000 unidades de gás.

Por exemplo, se você colocar um limite de gas de 50.000 para uma transferência simples de ETH, a EVM consumiria 21.000 e você receberia de volta os 29.000 restantes. No entanto, se você especificar muito pouco gás, por exemplo, um limite de gas de 20.000 para uma transferência simples de ETH, a transação falhará durante a fase de validação. Ela será rejeitada antes de ser incluída em um bloco e nenhum gás será consumido. Por outro lado, se uma transação ficar sem gás durante a execução (ex., um contrato inteligente usa todo o gás na metade do caminho), a EVM irá reverter quaisquer alterações, mas todo o gás fornecido ainda será consumido pelo trabalho realizado.

## Por que as taxas de gas podem ficar tão altas? {#why-can-gas-fees-get-so-high}

As altas taxas de gas se devem à popularidade da Ethereum. Se houver muita demanda, os usuários devem oferecer valores de taxa de prioridade mais altos para tentar superar as transações de outros usuários. Uma taxa de prioridade mais alta pode tornar mais provável que sua transação entre no próximo bloco. Além disso, aplicativos de contratos inteligentes mais complexos podem estar realizando muitas operações para dar suporte às suas funções, fazendo com que consumam muito gás.

## Iniciativas para reduzir os custos de gás {#initiatives-to-reduce-gas-costs}

As [atualizações de escalabilidade](/roadmap/) da Ethereum devem, em última análise, resolver alguns dos problemas de taxa de gas, o que, por sua vez, permitirá que a plataforma processe milhares de transações por segundo e escale globalmente.

O dimensionamento da camada 2 é uma iniciativa primária para melhorar muito os custos de gás, a experiência do usuário e a escalabilidade.

[Mais sobre o dimensionamento da camada 2](/developers/docs/scaling/#layer-2-scaling)

## Monitorando as taxas de gas {#monitoring-gas-fees}

Se você quiser monitorar os preços do gás, para poder enviar seu ETH por menos, você pode usar muitas ferramentas diferentes, como:

- [Etherscan](https://etherscan.io/gastracker) _Estimador de preço do gás de transação_
- [Blockscout](https://eth.blockscout.com/gas-tracker) _Estimador de preço do gás de transação de código aberto_
- [ETH Gas Tracker](https://www.ethgastracker.com/) _Monitore e rastreie os preços do gás da Ethereum e da camada 2 para reduzir as taxas de transação e economizar dinheiro_
- [Blocknative ETH Gas Estimator](https://chrome.google.com/webstore/detail/blocknative-eth-gas-estim/ablbagjepecncofimgjmdpnhnfjiecfm) _Extensão do Chrome para estimativa de gás com suporte a transações legadas do Tipo 0 e transações do Tipo 2 EIP-1559._
- [Cryptoneur Gas Fees Calculator](https://www.cryptoneur.xyz/gas-fees-calculator) _Calcule as taxas de gas na sua moeda local para diferentes tipos de transação na Mainnet, Arbitrum e Polygon._

## Ferramentas relacionadas {#related-tools}

- [Blocknative's Gas Platform](https://www.blocknative.com/gas) _API de estimativa de gás alimentada pela plataforma global de dados de mempool da Blocknative_
- [Gas Network](https://gas.network) Oráculos de gás onchain. Suporte para mais de 35 cadeias. 

## Leitura adicional {#further-reading}

- [O gás da Ethereum explicado](https://defiprime.com/gas)
- [Reduzindo o consumo de gás dos seus contratos inteligentes](https://medium.com/coinmonks/8-ways-of-reducing-the-gas-consumption-of-your-smart-contracts-9a506b339c0a)
- [Estratégias de otimização de gas para desenvolvedores](https://www.alchemy.com/overviews/solidity-gas-optimization)
- [Documentação da EIP-1559](https://eips.ethereum.org/EIPS/eip-1559).
- [Recursos da EIP-1559 de Tim Beiko](https://hackmd.io/@timbeiko/1559-resources)
- [EIP-1559: Separando mecanismos de memes](https://web.archive.org/web/20241126205908/https://research.2077.xyz/eip-1559-separating-mechanisms-from-memes)