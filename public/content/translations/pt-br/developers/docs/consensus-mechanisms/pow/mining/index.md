---
title: Mineração
description: Uma explicação de como a mineração funcionava no Ethereum.
lang: pt-br
---

<Alert variant="update">
<AlertEmoji text=":wave:"/>
<AlertContent>
<AlertDescription>
A prova de trabalho não está mais subjacente ao mecanismo de consenso do Ethereum, o que significa que a mineração foi desativada. Em vez disso, o Ethereum é garantido por validadores que apostam em ETH. Você pode começar a participar com o seu ETH hoje. Leia mais sobre <a href='/roadmap/merge/'>A Fusão</a> (The MErge), <a href='/developers/docs/consensus-mechanisms/pos/'>prova de participação</a> e <a href='/staking/'>participação (stake)</a>. Esta página é apenas de interesse histórico.
</AlertDescription>
</AlertContent>
</Alert>

## Pré-requisitos {#prerequisites}

Para entender melhor esta página, recomendamos que você leia primeiro sobre [transações](/developers/docs/transactions/), [blocos](/developers/docs/blocks/) e [prova de trabalho](/developers/docs/consensus-mechanisms/pow/).

## O que é mineração de Ethereum? {#what-is-ethereum-mining}

A mineração é o processo de criação de um bloco de transações a ser adicionado à cadeia de blocos do Ethereum na arquitetura de prova de trabalho agora obsoleta do Ethereum.

A palavra mineração se origina no contexto da analogia do ouro para criptomoedas. Ouro ou metais preciosos são escassos, assim como tokens digitais, e a única maneira de aumentar o volume total em um sistema de prova de trabalho é por meio da mineração. Na prova de trabalho do Ethereum, o único modo de emissão foi por meio da mineração. Ao contrário de ouro ou metais preciosos, no entanto, a mineração Ethereum também foi a maneira de proteger a rede criando, verificando, publicando e propagando blocos na cadeia de blocos.

Ether de mineração = Protegendo a rede

A mineração é a força vital de qualquer cadeia de blocos de prova de trabalho. Os mineradores do Ethereum — computadores executando software — usaram seu tempo e poder de computação para processar transações e produzir blocos antes da transição para a prova de participação.

## Por que existem mineradores? {#why-do-miners-exist}

Em sistemas descentralizados como o Ethereum, precisamos garantir que todos concordem com a ordem das transações. Os mineradores ajudaram isso a acontecer resolvendo quebra-cabeças computacionalmente difíceis para produzir blocos, protegendo a rede contra-ataques.

[Mais sobre prova de trabalho](/developers/docs/consensus-mechanisms/pow/)

Anteriormente, qualquer era capaz de minerar na rede Ethereum usando seu computador. No entanto, nem todos podem minerar ether (ETH) de forma lucrativa. Na maioria dos casos, os mineradores tiveram que comprar hardware de computador dedicado e ter acesso a fontes de energia barata. Um computador médio provavelmente não ganhava recompensas de bloco suficientes para cobrir os custos associados à mineração.

### Custo da mineração {#cost-of-mining}

- Custos potenciais do hardware necessário para construir e manter uma plataforma de mineração
- Custo elétrico para alimentar a plataforma de mineração
- Se você estivesse minerando em um pool, esses pools normalmente cobravam uma taxa percentual fixa de cada bloco gerado pelo pool
- Custo potencial do equipamento para apoiar a plataforma de mineração (ventilação, monitoramento de energia, fiação elétrica, etc.)

Para explorar ainda mais a rentabilidade da mineração, use uma calculadora de mineração, como a que o [Etherscan](https://etherscan.io/ether-mining-calculator) oferece.

## Como as transações do Ethereum eram mineradas {#how-ethereum-transactions-were-mined}

O seguinte fornece uma visão geral de como as transações foram mineradas na prova de trabalho Ethereum. Uma descrição análoga deste processo para a prova de participação do Ethereum pode ser encontrada [aqui](/developers/docs/consensus-mechanisms/pos/#transaction-execution-ethereum-pos).

1. Um usuário escreve e assina uma solicitação de [transação](/developers/docs/transactions/) com a chave privada de alguma [conta](/developers/docs/accounts/).
2. O usuário transmite a solicitação de transação para toda a rede Ethereum a partir de algum [nó](/developers/docs/nodes-and-clients/).
3. Ao ouvir tomar conhecimento da nova solicitação de transação, cada nó na rede Ethereum adiciona a solicitação ao seu mempool local, uma lista de todas as solicitações de transação sobre as quais eles têm conhecimento que ainda não foram confirmadas na blockchain em um bloco.
4. Em algum momento, um nó de mineração agrega várias dezenas ou centenas de solicitações de transação em um [bloco](/developers/docs/blocks/) potencial, de uma forma que maximize as [taxas de transação](/developers/docs/gas/) que ele ganha, enquanto ainda permanece abaixo do limite de gás do bloco. Então, o nó de mineração:
   1. Verifica a validade de cada solicitação de transação (ou seja, ninguém está tentando transferir ether de uma conta para a qual não produziu uma assinatura, a solicitação não está malformada, etc.), e, em seguida, executa o código da solicitação, alterando o estado de sua cópia local da EVM. O minerador atribui a taxa de transação para cada um desses pedidos de transação à sua própria conta.
   2. Começa o processo de produção do "certificado de legitimidade" da Prova de participação para o bloco em potencial, uma vez que todas as solicitações de transação no bloco tenham sido verificadas e executadas na cópia local do EVM.
5. Eventualmente, um minerador terminará de produzir um certificado para um bloco que inclui nossa solicitação específica de transação. O minerador, em seguida, transmite o bloco completo, que inclui o certificado e uma soma de verificação do novo estado EVM requerido.
6. Outros nós obtêm informação sobre o novo bloco. Eles verificam o certificado, executam todas as transações no próprio bloco (incluindo a transação originalmente transmitida pelo nosso usuário) e verifique se a soma de verificação de seu novo estado EVM após a execução de todas as transações corresponde à soma de verificação do estado reivindicada pelo bloco do minerador. Só então esses nós adicionam este bloco à cauda do blockchain e aceitam o novo estado EVM como o estado canônico.
7. Cada nó remove todas as transações do novo bloco de suas memórias locais de pedidos de transações não atendidos.
8. Novos nós que se juntam à rede baixam todos os blocos em sequência, incluindo o bloco que contém nossa transação de interesse. Eles inicializam uma cópia local de EVM (que começa como uma EVM em branco) e, em seguida, passa pelo processo de execução de cada transação em cada bloco em cima de sua cópia de EVM local, verificando as somas de verificação de estado em cada bloco ao longo do caminho.

Cada transação é extraída (incluída em um novo bloco e propagada pela primeira vez) uma vez, mas executada e verificada por cada participante no processo de avanço do estado EVM padrão. Isso destaca um dos mantras centrais da cadeia de blocos: **Não confie, verifique**.

## Blocos Ommer (tio) {#ommer-blocks}

Mineração de blocos na prova de trabalho era probabilística, o que significa que às vezes dois blocos válidos eram publicados simultaneamente devido à latência da rede. Nesse caso, o protocolo tinha que determinar a cadeia mais longa (e, portanto, mais “válida”), enquanto garante justiça para os mineradores, recompensando parcialmente o bloco válido proposto não incluído. Isso incentivou uma maior descentralização da rede, pois mineradores menores, que podem enfrentar maior latência, ainda poderiam gerar retornos por meio de recompensas de bloco [ommer](/glossary/#ommer).

O termo "ommer" é o termo neutro de gênero preferido para o irmão de um bloco pai, mas às vezes também é chamado de "tio". **Desde a mudança do Ethereum para a prova de participação, os blocos ommer não são mais minerados**, pois apenas um proponente é eleito em cada espaço. Você pode ver essa mudança visualizando o [gráfico histórico](https://ycharts.com/indicators/ethereum_uncle_rate) dos blocos ommer minerados.

## Uma demonstração visual {#a-visual-demo}

Acompanhe o Austin enquanto ele explica como funciona o processo de mineração e o conceito de prova de trabalho da cadeia de blocos.

<YouTube id="zcX7OJ-L8XQ" />

## O algoritmo de mineração {#mining-algorithm}

A rede principal do Ethereum sempre usou apenas um algoritmo de mineração - ['Ethash'](/developers/docs/consensus-mechanisms/pow/mining/mining-algorithms/ethash/). O Ethash foi o sucessor de um algoritmo de P&D original conhecido como ['Dagger-Hashimoto'](/developers/docs/consensus-mechanisms/pow/mining/mining-algorithms/dagger-hashimoto/).

[Mais sobre algoritmos de mineração](/developers/docs/consensus-mechanisms/pow/mining/mining-algorithms/).

## Tópicos relacionados {#related-topics}

- [Gás](/developers/docs/gas/)
- [EVM](/developers/docs/evm/)
- [Prova de trabalho](/developers/docs/consensus-mechanisms/pow/)
