---
title: "Introdução técnica ao ether"
description: "Uma introdução para desenvolvedores à criptomoeda ether."
lang: pt-br
---

## Pré-requisitos {#prerequisites}

Para ajudar você a entender melhor esta página, recomendamos que leia primeiro a [Introdução ao Ethereum](/developers/docs/intro-to-ethereum/).

## O que é uma criptomoeda? {#what-is-a-cryptocurrency}

Uma criptomoeda é um meio de troca garantido por um livro-razão baseado em blockchain.

Um meio de troca é qualquer coisa amplamente aceita como pagamento por bens e serviços, e um livro-razão é um armazenamento de dados que rastreia transações. A tecnologia blockchain permite que os usuários façam transações no livro-razão sem depender de terceiros confiáveis para mantê-lo.

A primeira criptomoeda foi o Bitcoin, criado por Satoshi Nakamoto. Desde o lançamento do Bitcoin em 2009, as pessoas criaram milhares de criptomoedas em muitas blockchains diferentes.

## O que é ether? {#what-is-ether}

O **ether (ETH)** é a criptomoeda usada para muitas coisas na rede Ethereum. Fundamentalmente, é a única forma aceitável de pagamento para taxas de transação e, após o [The Merge](/roadmap/merge), o ether é necessário para validar e propor blocos na Mainnet. O ether também é usado como uma forma primária de colateral nos mercados de empréstimo de [finanças descentralizadas (DeFi)](/defi), como uma unidade de conta em mercados de NFT, como pagamento ganho pela prestação de serviços ou venda de bens do mundo real, e muito mais.

O Ethereum permite que os desenvolvedores criem [**aplicativos descentralizados (dapps)**](/developers/docs/dapps), que compartilham um pool de poder de computação. Esse pool compartilhado é finito, então o Ethereum precisa de um mecanismo para determinar quem pode usá-lo. Caso contrário, um dapp poderia acidental ou maliciosamente consumir todos os recursos da rede, o que bloquearia o acesso de outros.

A criptomoeda ether suporta um mecanismo de precificação para o poder de computação do Ethereum. Quando os usuários querem fazer uma transação, eles devem pagar ether para que sua transação seja reconhecida na blockchain. Esses custos de uso são conhecidos como [taxas de gas](/developers/docs/gas/), e a taxa de gas depende da quantidade de poder de computação necessária para executar a transação e da demanda de toda a rede por poder de computação no momento.

Portanto, mesmo que um dapp malicioso enviasse um loop infinito, a transação eventualmente ficaria sem ether e terminaria, permitindo que a rede voltasse ao normal.

É [comum confundir](https://abcnews.go.com/Business/bitcoin-slumps-week-low-amid-renewed-worries-chinese/story?id=78399845) Ethereum e ether — quando as pessoas se referem ao "preço do Ethereum", elas estão descrevendo o preço do ether.

## Cunhagem de ether {#minting-ether}

A cunhagem é o processo no qual um novo ether é criado no livro-razão do Ethereum. O protocolo Ethereum subjacente cria o novo ether, e não é possível para um usuário criar ether.

O ether é cunhado como uma recompensa para cada bloco proposto e em cada ponto de verificação de época para outras atividades do validador relacionadas a alcançar o consenso. A quantidade total emitida depende do número de validadores e de quanto ether eles fizeram stake. Essa emissão total é dividida igualmente entre os validadores no caso ideal de que todos os validadores sejam honestos e estejam online, mas, na realidade, varia com base no desempenho do validador. Cerca de 1/8 da emissão total vai para o propositor de bloco; o restante é distribuído entre os outros validadores. Os propositores de bloco também recebem gorjetas de taxas de transação e renda relacionada a MEV, mas estas vêm de ether reciclado, não de nova emissão.

## Queima de ether {#burning-ether}

Assim como a criação de ether por meio de recompensas de bloco, o ether pode ser destruído por meio de um processo chamado 'queima'. Quando o ether é queimado, ele é removido de circulação permanentemente.

A queima de ether ocorre em todas as transações no Ethereum. Quando os usuários pagam por suas transações, uma taxa básica de gas, definida pela rede de acordo com a demanda transacional, é destruída. Isso, juntamente com tamanhos de bloco variáveis e uma taxa de gas máxima, simplifica a estimativa da taxa de transação no Ethereum. Quando a demanda da rede é alta, os [blocos](https://eth.blockscout.com/block/22580057) podem queimar mais ether do que cunham, compensando efetivamente a emissão de ether.

Queimar a taxa básica dificulta a capacidade de um produtor de blocos de manipular transações. Por exemplo, se os produtores de blocos recebessem a taxa básica, eles poderiam incluir suas próprias transações gratuitamente e aumentar a taxa básica para todos os outros. Alternativamente, eles poderiam reembolsar a taxa básica para alguns usuários offchain, levando a um mercado de taxas de transação mais opaco e complexo.

## Denominações de ether {#denominations}

Como o valor de muitas transações no Ethereum é pequeno, o ether tem várias denominações que podem ser referenciadas como unidades de conta menores. Dessas denominações, Wei e gwei são particularmente importantes.

Wei é a menor quantidade possível de ether e, como resultado, muitas implementações técnicas, como o [Ethereum Yellowpaper](https://ethereum.github.io/yellowpaper/paper.pdf), basearão todos os cálculos em Wei.

Gwei, abreviação de giga-wei, é frequentemente usado para descrever os custos de gas no Ethereum.

| Denominação | Valor em ether   | Uso comum                         |
| ----------- | ---------------- | --------------------------------- |
| Wei         | 10<sup>-18</sup> | Implementações técnicas           |
| Gwei        | 10<sup>-9</sup>  | Taxas de gas legíveis por humanos |

## Transferência de ether {#transferring-ether}

Cada transação no Ethereum contém um campo `value`, que especifica a quantidade de ether a ser transferida, denominada em Wei, para enviar do endereço do remetente para o endereço do destinatário.

Quando o endereço do destinatário é um [contrato inteligente](/developers/docs/smart-contracts/), esse ether transferido pode ser usado para pagar pelo gas quando o contrato inteligente executa seu código.

[Mais sobre transações](/developers/docs/transactions/)

## Consulta de ether {#querying-ether}

Os usuários podem consultar o saldo de ether de qualquer [conta](/developers/docs/accounts/) inspecionando o campo `balance` da conta, que mostra as participações de ether denominadas em Wei.

O [Etherscan](https://etherscan.io) e o [Blockscout](https://eth.blockscout.com) são ferramentas populares para inspecionar saldos de endereços por meio de aplicativos baseados na web. Por exemplo, [esta página do Blockscout](https://eth.blockscout.com/address/0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe) mostra o saldo da Fundação Ethereum. Os saldos das contas também podem ser consultados usando carteiras ou diretamente fazendo solicitações aos nós.

## Leitura adicional {#further-reading}

- [Definindo ether e Ethereum](https://www.cmegroup.com/education/courses/introduction-to-ether/defining-ether-and-ethereum.html) – _CME Group_
- [Whitepaper do Ethereum](/whitepaper/): A proposta original para o Ethereum. Este documento inclui uma descrição do ether e as motivações por trás de sua criação.
- [Calculadora de Gwei](https://www.alchemy.com/gwei-calculator): Use esta calculadora de gwei para converter facilmente Wei, gwei e ether. Basta inserir qualquer quantidade de Wei, gwei ou ETH e calcular automaticamente a conversão.

_Conhece um recurso da comunidade que ajudou você? Edite esta página e adicione-o!_