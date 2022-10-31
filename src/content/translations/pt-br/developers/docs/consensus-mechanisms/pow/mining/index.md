---
title: Mineração
description: Uma explicação de como a mineração funciona no Ethereum e como ajuda a manter o Ethereum seguro e descentralizado.
lang: pt-br
incomplete: true
---

## Pré-requisitos {#prerequisites}

Para melhor entender esta página, recomendamos que você leia primeiro [transações](/developers/docs/transactions/), [blocos](/developers/docs/blocks/) e [prova de trabalho](/developers/docs/consensus-mechanisms/pow/).

## O que é mineração de Ethereum? {#what-is-ethereum-mining}

Mineração é o processo de criação de um bloco de transações a ser adicionado à blockchain do Ethereum.

Ethereum, como Bitcoin, atualmente usa um mecanismo de consenso denominada [prova de trabalho (PoW)](/developers/docs/consensus-mechanisms/pow/). A mineração é a força vital da prova de trabalho. Minerador de Ethereum – computadores rodando software – usando o tempo e o poder de computação deles para processar transações e produzir blocos.

<InfoBanner emoji=":wave:">
   A prova de participação substituirá a mineração e a prova de trabalho ao longo do próximo ano. Você pode começar a fazer o staking do seu ETH hoje. <a href="/staking/">Mais sobre staking</a>    
</InfoBanner>

## Por que existem mineradores? {#why-do-miners-exist}

Em sistemas descentralizados como o Ethereum, precisamos garantir que todos concordem com a ordem das transações. Os mineradores ajudam a resolver isso, solucionando quebra-cabeças computacionalmente difíceis para produzir blocos, que servem como uma forma de proteger a rede contra ataques.

[Mais sobre proof of work](/developers/docs/consensus-mechanisms/pow/)

## Quem pode se tornar um minerador no Ethereum? {#who-can-become-a-miner}

Tecnicamente, qualquer um pode minerar na rede Ethereum usando seu computador. No entanto, nem todos podem minerar ether (ETH) de forma rentável. Na maioria dos casos, os mineradores devem comprar hardware de computador dedicado para minerar de forma rentável. Embora seja verdade que qualquer pessoa pode executar o software de mineração em seu computador, é improvável que o computador médio ganhe recompensas de bloco suficientes para cobrir os custos associados à mineração.

### Custo da mineração {#cost-of-mining}

- Custos potenciais do hardware necessário para construir e manter uma plataforma de mineração
- Custo elétrico para alimentar a plataforma de mineração
- Se você estiver minerando em uma pool, as pools de mineração normalmente cobram uma taxa fixa de % de cada bloco gerado pela pool
- Custo potencial do equipamento para apoiar a plataforma de mineração (ventilação, monitoramento de energia, fiação elétrica, etc.)

Para conhecer ainda mais a rentabilidade da mineração, use uma calculadora de mineração, como a fornecida pela [Etherscan](https://etherscan.io/ether-mining-calculator).

## Como as transações Ethereum são mineradas {#how-ethereum-transactions-are-mined}

1. Um usuário escreve e assina uma solicitação de [transação](/developers/docs/transactions/) com a chave privada de alguma [conta](/developers/docs/accounts/).
2. O usuário transmite a solicitação de transação para toda a rede Ethereum de algum [nó](/developers/docs/nodes-and-clients/).
3. Ao ouvir tomar conhecimento da nova solicitação de transação, cada nó na rede Ethereum adiciona a solicitação ao seu mempool local, uma lista de todas as solicitações de transação sobre as quais eles têm conhecimento que ainda não foram confirmadas na blockchain em um bloco.
4. Em algum ponto, um nó de mineração agrega várias dezenas ou centenas de solicitações de transação a um [bloco](/developers/docs/blocks/) potencial, de uma forma que maximiza as [taxas de transação](/developers/docs/gas/) que eles ganham enquanto ainda estão abaixo do limite de gás de bloco. Então, o nó de mineração:
   1. Verifica a validade de cada pedido de transação (por exemplo, ninguém está tentando transferir o ether de uma conta para a qual não produziu uma assinatura, a solicitação não está malformada, etc.), e em seguida executa o código da solicitação, alterando o estado de sua cópia local do EVM. O minerador atribui a taxa de transação para cada um desses pedidos de transação à sua própria conta.
   2. Começa o processo de produção do "certificado de legitimidade" da Prova de participação para o bloco em potencial, uma vez que todas as solicitações de transação no bloco tenham sido verificadas e executadas na cópia local do EVM.
5. Eventualmente, um minerador terminará de produzir um certificado para um bloco que inclui nossa solicitação específica de transação. O minerador, em seguida, transmite o bloco completo, que inclui o certificado e uma soma de verificação do novo estado EVM requerido.
6. Outros nós obtêm informação sobre o novo bloco. Eles verificam o certificado, executam todas as transações no próprio bloco (incluindo a transação originalmente transmitida pelo nosso usuário) e verifique se a soma de verificação de seu novo estado EVM após a execução de todas as transações corresponde à soma de verificação do estado reivindicada pelo bloco do minerador. Só então esses nós adicionam este bloco à cauda do blockchain e aceitam o novo estado EVM como o estado canônico.
7. Cada nó remove todas as transações do novo bloco de suas memórias locais de pedidos de transações não atendidos.
8. Novos nós que se juntam à rede baixam todos os blocos em sequência, incluindo o bloco que contém nossa transação de interesse. Eles inicializam uma cópia local de EVM (que começa como uma EVM em branco) e, em seguida, passa pelo processo de execução de cada transação em cada bloco em cima de sua cópia de EVM local, verificando as somas de verificação de estado em cada bloco ao longo do caminho.

Cada transação é extraída (incluída em um novo bloco e propagada pela primeira vez) uma vez, mas executada e verificada por cada participante no processo de avanço do estado EVM canônico. Isso destaca um dos mantras centrais do blockchain: ** Não confie, verifique **.

## Uma demonstração visual {#a-visual-demo}

Acompanhe o Austin enquanto ele explica como funciona o processo de mineração e o conceito de prova de trabalho da blockchain.

<YouTube id="zcX7OJ-L8XQ" />

## Leitura adicional {#further-reading}

- [O que significa minerar Ethereum?](https://docs.ethhub.io/using-ethereum/mining/) _EthHub_

## Ferramentas relacionadas {#related-tools}

- [Principais mineradores de Ethereum](https://etherscan.io/stat/miner?range=7&blocktype=blocks)
- [Calculadora de mineração da Etherscan](https://etherscan.io/ether-mining-calculator)
- [Calculadora de mineração do Minerstat](https://minerstat.com/coin/ETH)

## Tópicos relacionados {#related-topics}

- [Gás](/developers/docs/gas/)
- [EVM](/developers/docs/evm/)
- [Prova de trabalho](/developers/docs/consensus-mechanisms/pow/)
