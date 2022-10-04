---
title: Introdução ao Ether
description: Introdução de um desenvolvedor à criptomoeda ETHER.
lang: pt-br
---

## Pré-requisitos {#prerequisites}

Para ajudá-lo a entender melhor esta página, recomendamos que você leia primeiro [Introdução ao Ethereum](/developers/docs/intro-to-ethereum/).

## O que é criptomoeda? {#what-is-a-cryptocurrency}

Uma criptomoeda é um meio de troca garantido por um livro-razão baseado em blockchain.

Um meio de troca é qualquer coisa amplamente aceita como pagamento de bens e serviços, e um livro-razão é um armazenamento de dados que mantém o controle das transações. A tecnologia Blockchain permite que os usuários façam transações no livro-razão sem depender de terceiros de confiança para manter o livro-razão.

A primeira criptomoeda foi o Bitcoin, criado por Satoshi Nakamoto. Desde o lançamento do Bitcoin em 2009, as pessoas fizeram milhares de criptomoedas em muitos blockchains diferentes.

## O que é ether? {#what-is-ether}

**Ether (ETH)** é a criptomoeda usada para muitas coisas na rede Ethereum. Fundamentally, it is the only acceptable form of payment for transaction fees, and after [The Merge](/upgrades/merge), ether will be required to validate and propose blocks on Mainnet. O ether também é usado como uma forma primária de garantia nos mercados de crédito de [DeFi](/defi) como unidade de conta nos mercados NFT, como o pagamento ganho pela realização de serviços ou a venda de produtos do mundo real, entre outros.

Ethereum permite que os desenvolvedores criem [**aplicativos descentralizados (dapps)**](/developers/docs/dapps), que compartilham um conjunto de capacidades de computação. Este pool compartilhado é finito, portanto Ethereum precisa de um mecanismo para determinar quem vai usá-lo. Caso contrário, um dapp poderia acidental ou maliciosamente consumir todos os recursos de rede, o que bloquearia o acesso de outros.

A criptomoeda oferece suporte a um mecanismo de preços para o poder de computação do Ethereum. Quando os usuários querem fazer uma transação, devem pagar uma certa quantia em Ether para que sua transação seja reconhecida na blockchain. Estes custos de uso são conhecidos como [taxas de gás](/developers/docs/gas/), e a taxa de gás depende da quantidade de poder de computação necessária para executar a transação e a demanda em toda a rede por poder de computação no momento.

Portanto, mesmo que um aplicativo malicioso tenha enviado um ciclo infinito, a transação acabaria sem ether e terminaria, permitindo que a rede voltasse ao normal.

É [comum](https://www.reuters.com/article/us-crypto-currencies-lending-insight-idUSKBN25M0GP#:~:text=price%20of%20ethereum) [confundir](https://abcnews.go.com/Business/bitcoin-slumps-week-low-amid-renewed-worries-chinese/story?id=78399845#:~:text=cryptocurrencies%20including%20ethereum) [](https://www.cnn.com/2021/03/14/tech/nft-art-buying/index.html#:~:text=price%20of%20ethereum) Ethereum e ether — quando as pessoas se referem ao "preço do Ethereum", estão descrevendo o preço do ether.

## Como cunhar ether {#minting-ether}

A cunhagem é o processo no qual o novo ether é criado no livro-razão do Ethereum. O protocolo Ethereum subjacente cria o novo ether. Não é possível que um usuário crie ether.

O ether é cunhado quando um minerador cria um bloco na blockchain Ethereum. Como um incentivo aos mineradores, o protocolo concede uma recompensa em cada bloco, incrementando o equilíbrio de um endereço definido pelo mineiro do bloco. A recompensa por bloco mudou ao longo do tempo, e hoje é de 2 ETH por bloco.

## Como "queimar" ether {#burning-ether}

Além de criar ether através de recompensas de bloco, o ether pode ser destruído por um processo chamado "queima'. Quando o ether é queimado, ele é removido de circulação permanentemente.

A queima de ether ocorre em todas as transações no Ethereum. When users pay for their transactions, a base gas fee, set by the network according to transactional demand, gets destroyed. This, coupled with variable block sizes and a maximum gas fee, simplifies transaction fee estimation on Ethereum. When network demand is high, [blocks](https://etherscan.io/block/12965263) can burn more ether than they mint, effectively offsetting ether issuance.

Burning the base fee prevents various ways the miners could manipulate it otherwise. For example, if miners got the base fee, they could include their own transactions for free and raise the base fee for everyone else. Alternatively, they could refund the base fee to some users off-chain, leading to a more opaque and complex transaction fee market.

## Denominações do ether {#denominations}

Uma vez que muitas transações no Ethereum são pequenas, o ether tem várias denominações que podem ser referenciadas por quantidades menores. Destas denominações, Wei e gwei são particularmente importantes.

Wei é a menor quantidade possível de ether, e, como resultado, muitas implementações técnicas, como o [Ethereum Yellowpaper](https://ethereum.github.io/yellowpaper/paper.pdf), irão basear todos os cálculos em Wei.

Gwei, abreviado de giga-wei, é frequentemente usado para descrever os custos de gás no Ethereum.

| Denominação | Valor em ether   | Uso comum                         |
| ----------- | ---------------- | --------------------------------- |
| Wei         | 10<sup>-18</sup> | Implementações técnicas           |
| Gwei        | 10<sup>-9</sup>  | Taxas de gás legíveis por humanos |

## Como transferir ether {#transferring-ether}

Cada transação no Ethereum contém um campo de `value` que especifica a quantidade de ether a ser transferido, denominado em wei, para enviar do endereço do remetente para o endereço do destinatário.

Quando o endereço do destinatário é um [contrato inteligente](/developers/docs/smart-contracts/), o ether transferido pode ser usado para pagar gás quando o contrato inteligente executa seu código.

[Mais sobre transações](/developers/docs/transactions/)

## Como consultar saldos de ether {#querying-ether}

Os usuários podem consultar o saldo do ether de qualquer conta [](/developers/docs/accounts/) inspecionando o campo `balance` da conta que mostra participações do ether denominadas em wei.

[Etherscan](https://etherscan.io) é uma ferramenta popular para consultar saldos de endereços através de um aplicativo baseado na web. Por exemplo, [esta página Etherscan](https://etherscan.io/address/0xde0b295669a9fd93d5f28d9ec85e40f4cb697bae) mostra o saldo para a Fundação Ethereum.

## Leitura adicional {#further-reading}

- [Definindo Ether e Ethereum](https://www.cmegroup.com/education/courses/introduction-to-ether/defining-ether-and-ethereum.html): _CME Group_
- [Ethereum Whitepaper](/whitepaper/): a proposta original para o Ethereum. Este documento inclui uma descrição do ether e os motivos subjacentes à sua criação.

_Conhece algum recurso da comunidade que o ajudou? Edite esta página e adicione-o!_
