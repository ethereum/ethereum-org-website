---
title: "Introdução técnica ao ether"
description: "Introdução de um desenvolvedor à criptomoeda ETHER."
lang: pt-br
---

## Pré-requisitos {#prerequisites}

Para ajudá-lo a entender melhor esta página, recomendamos que você leia primeiro [Introdução ao Ethereum](/developers/docs/intro-to-ethereum/).

## O que é criptomoeda? {#what-is-a-cryptocurrency}

Uma criptomoeda é um meio de troca garantido por um livro-razão baseado em blockchain.

Um meio de troca é qualquer coisa amplamente aceita como pagamento de bens e serviços, e um livro-razão é um armazenamento de dados que mantém o controle das transações. A tecnologia Blockchain permite que os usuários façam transações no livro-razão sem depender de terceiros de confiança para manter o livro-razão.

A primeira criptomoeda foi o Bitcoin, criado por Satoshi Nakamoto. Desde o lançamento do Bitcoin em 2009, as pessoas fizeram milhares de criptomoedas em muitos blockchains diferentes.

## O que é ether? {#what-is-ether}

**Ether (ETH)** é a criptomoeda usada para muitas coisas na rede Ethereum. Fundamentalmente, é a única forma de pagamento aceitável para taxas de transação e, após [A Fusão](/roadmap/merge), o ether é necessário para validar e propor blocos na Mainnet. O Ether também é usado como forma principal de garantia nos mercados de empréstimo de [DeFi](/defi), como uma unidade de conta nos mercados de NFT, como pagamento recebido por prestação de serviços ou venda de bens do mundo real, e muito mais.

O Ethereum permite que os desenvolvedores criem [**aplicativos descentralizados (dapps)**](/developers/docs/dapps), que compartilham um pool de poder computacional. Este pool compartilhado é finito, portanto Ethereum precisa de um mecanismo para determinar quem vai usá-lo. Caso contrário, um dapp poderia acidental ou maliciosamente consumir todos os recursos de rede, o que bloquearia o acesso de outros.

A criptomoeda oferece suporte a um mecanismo de preços para o poder de computação do Ethereum. Quando os usuários querem fazer uma transação, devem pagar uma certa quantia em Ether para que sua transação seja reconhecida na blockchain. Esses custos de uso são conhecidos como [taxas de gás](/developers/docs/gas/), e a taxa de gás depende da quantidade de poder computacional necessário para executar a transação e da demanda de toda a rede por poder computacional no momento.

Portanto, mesmo que um aplicativo malicioso tenha enviado um ciclo infinito, a transação acabaria sem ether e terminaria, permitindo que a rede voltasse ao normal.

É [comum confundir](https://abcnews.go.com/Business/bitcoin-slumps-week-low-amid-renewed-worries-chinese/story?id=78399845) Ethereum e ether — quando as pessoas se referem ao "preço do Ethereum", elas estão descrevendo o preço do ether.

## Mintagem de ether {#minting-ether}

A cunhagem é o processo no qual o novo ether é criado no livro-razão do Ethereum. O protocolo Ethereum subjacente cria o novo ether. Não é possível que um usuário crie ether.

O Ether é cunhado como recompensa para cada bloco proposto e em cada ponto de verificação da época para outras atividades de validação relacionadas à obtenção de consenso. O valor total emitido depende do número de validadores e do quanto de ether eles têm colocado. Essa emissão total é dividida igualmente entre os validadores no caso ideal de que todos os validadores são honestos e estão online, mas, na realidade, ele varia com base no desempenho do validador. Cerca de 1/8 da emissão total vai para o proponente do bloco; o restante é distribuído entre os outros validadores. Os proponentes do bloco também recebem gorjetas das taxas de transação e receitas relacionadas ao MEV, mas estas vêm de ether reciclado, não de novas emissões.

## Queima de ether {#burning-ether}

Além de criar ether por meio de recompensas de bloco, o ether pode ser destruído por um processo chamado "burning". Quando o ether é queimado, ele é removido de circulação permanentemente.

A queima de ether ocorre em todas as transações no Ethereum. Quando os usuários pagam por suas transações, uma taxa base de gás, definida pela rede de acordo com a demanda transacional, é destruída. Isso, juntamente com tamanhos de blocos variáveis e uma taxa máxima de gás, simplifica a estimativa da taxa de transação no Ethereum. Quando a demanda da rede é alta, os [blocos](https://eth.blockscout.com/block/22580057) podem queimar mais ether do que cunham, compensando efetivamente a emissão de ether.

A queima da taxa base dificulta a capacidade de um produtor de bloco de manipular transações. Por exemplo, se os produtores de blocos recebessem a taxa base, eles poderiam incluir suas próprias transações gratuitamente e aumentar a taxa base para todos os demais. Como alternativa, eles poderiam reembolsar a taxa básica para alguns usuários off-chain, levando a um mercado de taxas de transação mais opaco e complexo.

## Denominações do ether {#denominations}

Uma vez que muitas transações no Ethereum são pequenas, o ether tem várias denominações que podem ser referenciadas por unidades menores de conta. Dessas denominações, Wei e gwei são particularmente importantes.

Wei é a menor quantidade possível de ether e, como resultado, muitas implementações técnicas, como o [Ethereum Yellowpaper](https://ethereum.github.io/yellowpaper/paper.pdf), basearão todos os cálculos em Wei.

Gwei, abreviado de giga-wei, é frequentemente usado para descrever os custos de gás no Ethereum.

| Denominação | Valor em ether   | Uso comum                         |
| ----------- | ---------------- | --------------------------------- |
| Wei         | 10<sup>-18</sup> | Implementações técnicas           |
| Gwei        | 10<sup>-9</sup>  | Taxas de gás legíveis por humanos |

## Transferência de ether {#transferring-ether}

Cada transação no Ethereum contém um campo `value`, que especifica a quantidade de ether a ser transferida, denominada em wei, para ser enviada do endereço do remetente para o endereço do destinatário.

Quando o endereço do destinatário é um [contrato inteligente](/developers/docs/smart-contracts/), esse ether transferido pode ser usado para pagar pelo gás quando o contrato inteligente executa seu código.

[Mais sobre transações](/developers/docs/transactions/)

## Consulta de ether {#querying-ether}

Os usuários podem consultar o saldo de ether de qualquer [conta](/developers/docs/accounts/) inspecionando o campo `balance` da conta, que mostra as posses de ether denominadas em wei.

[Etherscan](https://etherscan.io) e [Blockscout](https://eth.blockscout.com) são ferramentas populares para inspecionar saldos de endereços por meio de aplicativos baseados na web. Por exemplo, [esta página do Blockscout](https://eth.blockscout.com/address/0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe) mostra o saldo da Ethereum Foundation. Os saldos das contas também podem ser consultados usando carteiras ou diretamente fazendo solicitações aos nós.

## Leitura adicional {#further-reading}

- [Definindo ether e Ethereum](https://www.cmegroup.com/education/courses/introduction-to-ether/defining-ether-and-ethereum.html) – _CME Group_
- [Whitepaper do Ethereum](/whitepaper/): A proposta original para o Ethereum. Este documento inclui uma descrição do ether e os motivos subjacentes à sua criação.
- [Calculadora de Gwei](https://www.alchemy.com/gwei-calculator): Use esta calculadora de gwei para converter facilmente wei, gwei e ether. Basta conectar qualquer quantidade de wei, gwei ou ETH e calcular automaticamente a conversão.

_Conhece um recurso da comunidade que o ajudou? Edite esta página e adicione-a!_
