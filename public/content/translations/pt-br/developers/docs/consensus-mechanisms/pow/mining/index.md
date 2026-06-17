---
title: Mineração
description: Uma explicação de como a mineração funcionava no Ethereum.
lang: pt-br
---

<Alert variant="update">
<AlertEmoji text=":wave:"/>
<AlertContent>
<AlertDescription>
A Prova de Trabalho (PoW) não é mais a base do mecanismo de consenso do Ethereum, o que significa que a mineração foi desativada. Em vez disso, o [Ethereum](/) é protegido por validadores que fazem staking de ETH. Você pode começar a fazer staking do seu ETH hoje. Leia mais sobre <a href='/roadmap/merge/'>The Merge</a>, <a href='/developers/docs/consensus-mechanisms/pos/'>Prova de Participação (PoS)</a> e <a href='/staking/'>staking</a>. Esta página é apenas para interesse histórico.
</AlertDescription>
</AlertContent>
</Alert>

## Pré-requisitos {#prerequisites}

Para entender melhor esta página, recomendamos que você leia primeiro sobre [transações](/developers/docs/transactions/), [blocos](/developers/docs/blocks/) e [Prova de Trabalho (PoW)](/developers/docs/consensus-mechanisms/pow/).

## O que é a mineração no Ethereum? {#what-is-ethereum-mining}

A mineração é o processo de criar um bloco de transações a ser adicionado à blockchain do Ethereum na arquitetura agora obsoleta de Prova de Trabalho (PoW) do Ethereum.

A palavra mineração tem origem no contexto da analogia do ouro para criptomoedas. O ouro ou metais preciosos são escassos, assim como os tokens digitais, e a única maneira de aumentar o volume total em um sistema de Prova de Trabalho é por meio da mineração. No Ethereum de Prova de Trabalho, o único modo de emissão era via mineração. No entanto, diferentemente do ouro ou metais preciosos, a mineração no Ethereum também era a maneira de proteger a rede criando, verificando, publicando e propagando blocos na blockchain.

Minerar ether = Proteger a rede

A mineração é a força vital de qualquer blockchain de Prova de Trabalho. Os mineradores do Ethereum - computadores executando software - usavam seu tempo e poder de computação para processar transações e produzir blocos antes da transição para a Prova de Participação (PoS).

## Por que os mineradores existem? {#why-do-miners-exist}

Em sistemas descentralizados como o Ethereum, precisamos garantir que todos concordem com a ordem das transações. Os mineradores ajudavam a fazer isso acontecer resolvendo quebra-cabeças computacionalmente difíceis para produzir blocos, protegendo a rede contra ataques.

[Mais sobre Prova de Trabalho](/developers/docs/consensus-mechanisms/pow/)

Anteriormente, qualquer pessoa podia minerar na rede Ethereum usando seu computador. No entanto, nem todos podiam minerar ether (ETH) de forma lucrativa. Na maioria dos casos, os mineradores precisavam comprar hardware de computador dedicado e ter acesso a fontes de energia baratas. Era improvável que um computador comum ganhasse recompensas de bloco suficientes para cobrir os custos associados à mineração.

### Custo da mineração {#cost-of-mining}

- Custos potenciais do hardware necessário para construir e manter uma plataforma de mineração (mining rig)
- Custo elétrico para alimentar a plataforma de mineração
- Se você estivesse minerando em uma pool, essas pools normalmente cobravam uma taxa percentual fixa de cada bloco gerado pela pool
- Custo potencial de equipamentos para dar suporte à plataforma de mineração (ventilação, monitoramento de energia, fiação elétrica, etc.)

Para explorar ainda mais a lucratividade da mineração, use uma calculadora de mineração, como a fornecida pelo [Etherscan](https://etherscan.io/ether-mining-calculator).

## Como as transações do Ethereum eram mineradas {#how-ethereum-transactions-were-mined}

A seguir, é apresentada uma visão geral de como as transações eram mineradas na Prova de Trabalho do Ethereum. Uma descrição análoga desse processo para a Prova de Participação do Ethereum pode ser encontrada [aqui](/developers/docs/consensus-mechanisms/pos/#transaction-execution-ethereum-pos).

1. Um usuário escreve e assina uma solicitação de [transação](/developers/docs/transactions/) com a chave privada de alguma [conta](/developers/docs/accounts/).
2. O usuário transmite a solicitação de transação para toda a rede Ethereum a partir de algum [nó](/developers/docs/nodes-and-clients/).
3. Ao saber da nova solicitação de transação, cada nó na rede Ethereum adiciona a solicitação à sua mempool local, uma lista de todas as solicitações de transação das quais ouviram falar e que ainda não foram confirmadas na blockchain em um bloco.
4. Em algum momento, um nó minerador agrega várias dezenas ou centenas de solicitações de transação em um [bloco](/developers/docs/blocks/) potencial, de uma forma que maximize as [taxas de transação](/developers/docs/gas/) que eles ganham, mantendo-se abaixo do limite de gas do bloco. O nó minerador então:
   1. Verifica a validade de cada solicitação de transação (ou seja, ninguém está tentando transferir ether de uma conta para a qual não produziu uma assinatura, a solicitação não está malformada, etc.) e, em seguida, executa o código da solicitação, alterando o estado de sua cópia local da EVM. O minerador concede a taxa de transação para cada uma dessas solicitações de transação à sua própria conta.
   2. Inicia o processo de produção do "certificado de legitimidade" de Prova de Trabalho para o bloco potencial, uma vez que todas as solicitações de transação no bloco tenham sido verificadas e executadas na cópia local da EVM.
5. Eventualmente, um minerador terminará de produzir um certificado para um bloco que inclui nossa solicitação de transação específica. O minerador então transmite o bloco concluído, que inclui o certificado e um checksum do novo estado reivindicado da EVM.
6. Outros nós ouvem falar do novo bloco. Eles verificam o certificado, executam todas as transações no bloco por conta própria (incluindo a transação originalmente transmitida pelo nosso usuário) e verificam se o checksum de seu novo estado da EVM após a execução de todas as transações corresponde ao checksum do estado reivindicado pelo bloco do minerador. Só então esses nós anexam esse bloco ao final de sua blockchain e aceitam o novo estado da EVM como o estado canônico.
7. Cada nó remove todas as transações no novo bloco de sua mempool local de solicitações de transação não atendidas.
8. Novos nós que ingressam na rede baixam todos os blocos em sequência, incluindo o bloco que contém nossa transação de interesse. Eles inicializam uma cópia local da EVM (que começa como uma EVM de estado em branco) e, em seguida, passam pelo processo de executar cada transação em cada bloco em cima de sua cópia local da EVM, verificando os checksums de estado em cada bloco ao longo do caminho.

Cada transação é minerada (incluída em um novo bloco e propagada pela primeira vez) uma vez, mas executada e verificada por cada participante no processo de avanço do estado canônico da EVM. Isso destaca um dos mantras centrais da blockchain: **Não confie, verifique**.

## Blocos ommer (uncle) {#ommer-blocks}

A mineração de blocos na Prova de Trabalho era probabilística, o que significa que às vezes dois blocos válidos eram publicados simultaneamente devido à latência da rede. Nesse caso, o protocolo tinha que determinar a cadeia mais longa (e, portanto, mais "válida") enquanto garantia a justiça para com os mineradores, recompensando parcialmente o bloco válido proposto não incluído. Isso encorajou uma maior descentralização da rede, pois mineradores menores, que poderiam enfrentar maior latência, ainda poderiam gerar retornos por meio de recompensas de [bloco ommer](/glossary/#ommer).

O termo "ommer" é o termo de gênero neutro preferido para o irmão de um bloco pai, mas às vezes também é chamado de "uncle" (tio). **Desde a mudança do Ethereum para a Prova de Participação, os blocos ommer não são mais minerados**, pois apenas um proponente é eleito em cada slot. Você pode ver essa mudança visualizando o [gráfico histórico](https://ycharts.com/indicators/ethereum_uncle_rate) dos blocos ommer minerados.

## Uma demonstração visual {#a-visual-demo}

Assista ao Austin guiá-lo pela mineração e pela blockchain de Prova de Trabalho.

<VideoWatch slug="blockchain-eth-build" />

## O algoritmo de mineração {#mining-algorithm}

A Rede Principal do Ethereum usou apenas um algoritmo de mineração - ['Ethash'](/developers/docs/consensus-mechanisms/pow/mining/mining-algorithms/ethash/). O Ethash foi o sucessor de um algoritmo original de P&D conhecido como ['Dagger-Hashimoto'](/developers/docs/consensus-mechanisms/pow/mining/mining-algorithms/dagger-hashimoto/).

[Mais sobre algoritmos de mineração](/developers/docs/consensus-mechanisms/pow/mining/mining-algorithms/).

## Tópicos relacionados {#related-topics}

- [Gas](/developers/docs/gas/)
- [EVM](/developers/docs/evm/)
- [Prova de Trabalho (PoW)](/developers/docs/consensus-mechanisms/pow/)