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

**Ether (ETH)** é a criptomoeda usada para muitas coisas na rede Ethereum. Fundamentalmente, essa é a única forma de pagamento aceitável para taxas de transação e, após [A Fusão](/roadmap/merge) (The Merge), é necessário ether para validar e propor blocos na Rede principal (Mainnet). O ether também é usado como uma forma primária de garantia nos mercados de crédito de [DeFi](/defi) como unidade de conta nos mercados NFT, como o pagamento ganho pela realização de serviços ou a venda de produtos do mundo real, entre outros.

Ethereum permite que os desenvolvedores criem [**aplicativos descentralizados (dapps)**](/developers/docs/dapps), que compartilham um conjunto de capacidades de computação. Este pool compartilhado é finito, portanto Ethereum precisa de um mecanismo para determinar quem vai usá-lo. Caso contrário, um dapp poderia acidental ou maliciosamente consumir todos os recursos de rede, o que bloquearia o acesso de outros.

A criptomoeda oferece suporte a um mecanismo de preços para o poder de computação do Ethereum. Quando os usuários querem fazer uma transação, devem pagar uma certa quantia em Ether para que sua transação seja reconhecida na blockchain. Estes custos de uso são conhecidos como [taxas de gás](/developers/docs/gas/), e a taxa de gás depende da quantidade de poder de computação necessária para executar a transação e a demanda em toda a rede por poder de computação no momento.

Portanto, mesmo que um aplicativo malicioso tenha enviado um ciclo infinito, a transação acabaria sem ether e terminaria, permitindo que a rede voltasse ao normal.

É [comum confundir](https://abcnews.go.com/Business/bitcoin-slumps-week-low-amid-renewed-worries-chinese/story?id=78399845) Ethereum e ether — quando as pessoas se referem ao "preço do Ethereum", estão descrevendo o preço do ether.

## Como cunhar ether {#minting-ether}

A cunhagem é o processo no qual o novo ether é criado no livro-razão do Ethereum. O protocolo Ethereum subjacente cria o novo ether. Não é possível que um usuário crie ether.

O Ether é cunhado como recompensa para cada bloco proposto e em cada ponto de verificação da época para outras atividades de validação relacionadas à obtenção de consenso. O valor total emitido depende do número de validadores e do quanto de ether eles têm colocado. Essa emissão total é dividida igualmente entre os validadores no caso ideal de que todos os validadores são honestos e estão online, mas, na realidade, ele varia com base no desempenho do validador. Cerca de 1/8 da emissão total vai para o proponente do bloco; o restante é distribuído entre os outros validadores. Os proponentes do bloco também recebem gorjetas das taxas de transação e receitas relacionadas ao MEV, mas estas vêm de ether reciclado, não de novas emissões.

## Como "queimar" ether {#burning-ether}

Além de criar ether por meio de recompensas de bloco, o ether pode ser destruído por um processo chamado "burning". Quando o ether é queimado, ele é removido de circulação permanentemente.

A queima de ether ocorre em todas as transações no Ethereum. Quando os usuários pagam por suas transações, uma taxa base de gás, definida pela rede de acordo com a demanda transacional, é destruída. Isso, juntamente com tamanhos de blocos variáveis e uma taxa máxima de gás, simplifica a estimativa da taxa de transação no Ethereum. Quando a demanda da rede é alta, os [blocos](https://etherscan.io/block/12965263) podem queimar mais ether do que gerar, compensando efetivamente a emissão de ether.

Queimar a taxa base dificulta a capacidade de os produtores de blocos de manipular transações. Por exemplo, se os produtores de blocos recebessem a taxa base, eles poderiam incluir suas próprias transações gratuitamente e aumentar a taxa base para todos os demais. Como alternativa, eles poderiam reembolsar a taxa base para alguns usuários fora da cadeia, gerando um mercado de taxas de transação mais opaco e complexo.

## Denominações do ether {#denominations}

Uma vez que muitas transações no Ethereum são pequenas, o ether tem várias denominações que podem ser referenciadas por unidades menores de conta. Dessas denominações, Wei e gwei são particularmente importantes.

Wei é a menor quantidade possível de ether, e, como resultado, muitas implementações técnicas, como o [Ethereum Yellowpaper](https://ethereum.github.io/yellowpaper/paper.pdf), irão basear todos os cálculos em Wei.

Gwei, abreviado de giga-wei, é frequentemente usado para descrever os custos de gás no Ethereum.

| Denominação | Valor em ether   | Uso comum                         |
| ----------- | ---------------- | --------------------------------- |
| Wei         | 10<sup>-18</sup> | Implementações técnicas           |
| Gwei        | 10<sup>-9</sup>  | Taxas de gás legíveis por humanos |

## Como transferir ether {#transferring-ether}

Cada transação no Ethereum contém um campo `valor` que especifica a quantidade de ether a ser transferido, denominado em wei, para enviar do endereço do remetente para o endereço do destinatário.

Quando o endereço do destinatário é um [contrato inteligente](/developers/docs/smart-contracts/), o ether transferido pode ser usado para pagar gás quando o contrato inteligente executa seu código.

[Mais sobre transações](/developers/docs/transactions/)

## Como consultar saldos de ether {#querying-ether}

Os usuários podem consultar o saldo de ether de qualquer [conta](/developers/docs/accounts/) inspecionando o campo `saldo` da conta que mostra participações de ether denominadas em wei.

[Etherscan](https://etherscan.io) é uma ferramenta popular para consultar saldos de endereços através de um aplicativo baseado na Web. Por exemplo, [esta página Etherscan](https://etherscan.io/address/0xde0b295669a9fd93d5f28d9ec85e40f4cb697bae) mostra o saldo da Fundação Ethereum. Os saldos das contas também podem ser consultados usando carteiras ou diretamente fazendo solicitações aos nós.

## Leitura adicional {#further-reading}

- [Definindo Ether e Ethereum](https://www.cmegroup.com/education/courses/introduction-to-ether/defining-ether-and-ethereum.html): _CME Group_
- [Ethereum Whitepaper](/whitepaper/): a proposta original para o Ethereum. Este documento inclui uma descrição do ether e os motivos subjacentes à sua criação.
- [Calculadora Gwei](https://www.alchemy.com/gwei-calculator): use esta calculadora gwei para converter facilmente wei, gwei e ether. Basta conectar qualquer quantidade de wei, gwei ou ETH e calcular automaticamente a conversão.

_Conhece algum recurso da comunidade que o ajudou? Edite esta página e adicione-o!_
