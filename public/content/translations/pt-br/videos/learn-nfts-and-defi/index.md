---
title: "O que são NFTs e como eles podem ser usados em finanças descentralizadas?"
description: "Entenda a mecânica dos tokens não fungíveis (NFTs) no Ethereum e como eles são usados em aplicativos de finanças descentralizadas (DeFi)."
lang: pt-br
youtubeId: "Xdkkux6OxfM"
uploadDate: 2020-09-29
duration: "0:11:13"
educationLevel: beginner
topic:
  - "nfts"
  - "defi"
  - "erc-721"
  - "erc-1155"
  - "lending"
format: explainer
author: Finematics
breadcrumb: "NFTs e DeFi"
---

Uma explicação da **Finematics** cobrindo a mecânica dos tokens não fungíveis (NFTs) no Ethereum e como eles se cruzam com as finanças descentralizadas (DeFi), incluindo padrões de token, casos de uso e empréstimos com colateral em NFT.

*Esta transcrição é uma cópia acessível da [transcrição original do vídeo](https://www.youtube.com/watch?v=Xdkkux6OxfM) publicada pela Finematics. Ela foi levemente editada para facilitar a leitura.*

#### Fungível vs. não fungível (0:00) {#fungible-vs-non-fungible-000}

Vamos começar com a palavra "fungível". Fungível significa que unidades individuais de um ativo são intercambiáveis e indistinguíveis umas das outras. Um bom exemplo de um ativo fungível é uma moeda. Uma nota de cinco dólares tem sempre o mesmo valor que qualquer outra nota de cinco dólares. Você não se importa realmente com qual nota de cinco dólares específica você recebe, porque todas valem a mesma quantia.

Quando se trata de ativos não fungíveis, no entanto, cada unidade é única e não pode ser substituída diretamente por outra. Um bom exemplo é uma passagem de avião. Mesmo que as passagens de avião pareçam semelhantes, cada uma carrega um nome de passageiro, destino, horário de partida e número de assento diferentes. Tentar trocar uma passagem de avião por outra pode levar a alguns problemas sérios.

Outro exemplo são os cartões colecionáveis. Mesmo que pareçam semelhantes, cada cartão tem atributos diferentes. Fatores como o ano de produção ou como o cartão é preservado podem fazer a diferença. Um exemplo extremo de algo não fungível é uma obra de arte — uma pintura, por exemplo, geralmente é criada como apenas uma cópia original.

#### Propriedades dos NFTs (2:13) {#properties-of-nfts-213}

Agora que sabemos o que significa "não fungível", vamos dar uma olhada nas propriedades mais comuns dos NFTs.

- **Único** — cada NFT tem propriedades diferentes que geralmente são armazenadas nos metadados do token
- **Comprovadamente escasso** — geralmente há um número limitado de NFTs, com um exemplo extremo de ter apenas uma cópia; o número de tokens pode ser verificado na blockchain
- **Indivisível** — a maioria dos NFTs não pode ser dividida em denominações menores, então você não pode comprar ou transferir uma fração do seu NFT

De forma semelhante aos tokens padrão, os NFTs também garantem a propriedade do ativo, são facilmente transferíveis e à prova de fraudes.

#### Padrões de token: ERC-20, ERC-721 e ERC-1155 (3:17) {#token-standards-erc-20-erc-721-and-erc-1155-317}

Embora os NFTs possam ser implementados em qualquer blockchain que suporte a programação de contratos inteligentes, os padrões mais notáveis são ERC-721 e ERC-1155 no Ethereum. Antes de mergulharmos nos padrões de NFT, vamos recapitular rapidamente o ERC-20, pois será útil para comparação.

**ERC-20** é um padrão bem conhecido para a criação de tokens na blockchain Ethereum. Exemplos incluem stablecoins como USDT ou DAI, e tokens de finanças descentralizadas (DeFi) como LEND, YFI, SNX e UNI. O ERC-20 permite a criação de tokens fungíveis — todos os tokens criados sob este padrão são completamente indistinguíveis. Não importa se você recebe USDT de um amigo ou de uma corretora; o valor de cada token é o mesmo.

**ERC-721** é o padrão para a criação de tokens não fungíveis. Ele permite a criação de contratos que produzem tokens distinguíveis com propriedades diferentes. Um exemplo comum é o famoso CryptoKitties — um jogo que permite colecionar e criar gatinhos virtuais.

**ERC-1155** é o próximo passo na criação de tokens não fungíveis. Este padrão permite a criação de contratos que suportam tanto tokens fungíveis quanto não fungíveis. Ele foi criado pela Enjin, um projeto focado em jogos baseados em blockchain. Em muitos jogos como World of Warcraft, um jogador pode possuir tanto itens não fungíveis — espadas, escudos, armaduras — quanto itens fungíveis, como ouro ou flechas. O ERC-1155 permite que os desenvolvedores definam tokens fungíveis e não fungíveis e decidam quantos de cada devem existir.

#### Casos de uso de NFT (5:28) {#nft-use-cases-528}

Além do CryptoKitties, existem vários outros jogos populares que aproveitam os NFTs, como Gods Unchained e Decentraland. O Decentraland é um exemplo interessante porque os jogadores podem comprar lotes de terrenos digitais que podem ser revendidos posteriormente ou até mesmo usados como espaço publicitário dentro do jogo.

Outros exemplos incluem mercados de arte digital, como Rarible e SuperRare, e até mesmo agregadores de mercados como o OpenSea. Outro exemplo de algo escasso que pode ser representado como NFTs são os nomes de domínio — por exemplo, o Ethereum Name Service com a extensão .eth e a Unstoppable Domains com a extensão .crypto.

Alguns NFTs podem ser extremamente caros. O CryptoKitty mais caro, Dragon, foi vendido por 600 ETH no final de 2017 — valendo cerca de cento e setenta mil dólares na época. Nomes de domínio escassos como exchange.eth podem valer mais de quinhentos mil dólares.

#### NFTs como colateral em DeFi (6:48) {#nfts-as-collateral-in-defi-648}

Quando se trata de DeFi, os NFTs podem desbloquear ainda mais potencial para as finanças descentralizadas. Atualmente, a grande maioria dos protocolos de empréstimo DeFi é colateralizada. Uma das ideias mais interessantes é usar NFTs como colateral. Isso significa que você seria capaz de fornecer um NFT representando uma obra de arte, um terreno digital ou até mesmo imóveis tokenizados como colateral, e tomar dinheiro emprestado usando-o como garantia.

Isso soa promissor, mas há um problema. Em plataformas padrão de empréstimo DeFi, como Compound ou Aave, o valor do colateral fornecido pode ser facilmente medido integrando oráculos de preços. Eles agregam preços de várias fontes líquidas, como corretoras centralizadas e descentralizadas. Quando se trata de NFTs, os mercados para tokens específicos são frequentemente ilíquidos, o que torna o processo de descoberta de preços complicado.

Para entender melhor esse problema, imagine que alguém compre um CryptoKitty raro por 10 ETH. Este NFT é posteriormente usado como colateral, e o mutuário retira 1.700 DAI — assumindo que 10 ETH valem 3.500 dólares e este NFT em particular tem uma relação empréstimo-valor (loan-to-value) de 50%. Depois disso, se ninguém mais estiver disposto a comprar este CryptoKitty em particular, o mercado para este NFT é ilíquido ou até mesmo inexistente. A única suposição é que o NFT ainda vale a mesma quantia pela qual foi vendido pela última vez — o que não é uma suposição segura, já que o valor dos NFTs pode mudar de forma bastante dramática.

É por isso que alguns projetos que oferecem empréstimos com colateral em NFT usam um modelo ligeiramente diferente: empréstimos ponto a ponto. Neste modelo de mercado, os mutuários podem oferecer seus NFTs como colateral, e os credores podem escolher qual NFT estão dispostos a aceitar antes de iniciar um empréstimo. O NFT usado como colateral é mantido em um contrato de garantia (escrow), e se o mutuário não pagar o valor do empréstimo mais os juros no prazo, o NFT é transferido para o credor. Este espaço é novo, mas uma das empresas que usa este modelo é a NFTfi.

#### NFTs como produtos financeiros (9:32) {#nfts-as-financial-products-932}

Além de serem usados como colateral, os NFTs também podem representar produtos financeiros mais complexos, como seguros, títulos ou opções. O Yinsure da Yearn Finance é um bom exemplo do uso de NFT no espaço de seguros. No Yinsure, cada contrato de seguro é representado como um NFT que também pode ser negociado em um mercado secundário, como o Rarible.

Também começamos a ver recentemente conceitos nativos de DeFi, como mineração de liquidez, sendo usados por projetos de NFT. O Rarible, por exemplo, começou a recompensar seus usuários com tokens de governança RARI por criar, comprar e vender NFTs em sua plataforma.

#### O crescente mercado de NFT (10:30) {#the-growing-nft-market-1030}

Com mais de 100 milhões de dólares em NFTs negociados e 6 milhões de dólares apenas no mês mais recente, o espaço de NFT é um dos nichos de crescimento mais rápido em cripto. Ele tem um enorme potencial, variando de gatinhos digitais a produtos financeiros complexos.