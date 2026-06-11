---
title: Jogos no Ethereum
description: Aprenda como o Ethereum impulsiona jogos onchain com regras verificáveis, ativos de propriedade dos jogadores e ecossistemas abertos nos quais qualquer um pode construir.
lang: pt-br
template: use-cases
image: /images/robot-help-bar.png
sidebarDepth: 2
summaryPoints:
  - As regras e o estado do jogo podem ser aplicados pela blockchain do Ethereum, e não pelos servidores de um estúdio, representando um benefício fundamental dos jogos onchain
  - Qualquer pessoa pode criar mods, bots ou jogos totalmente novos que se conectam aos mesmos dados onchain abertos
  - As l2s criadas para esse fim permitem uma jogabilidade em tempo real com taxas mais baixas, enquanto os frameworks de desenvolvimento de jogos tornam a criação de jogos onchain mais acessível do que nunca
buttons:
  - content: Saiba mais
    toId: gaming-on-ethereum
  - content: Explorar jogos
    toId: games
    isSecondary: false
---

## Jogos no Ethereum {#gaming-on-ethereum}

Os jogos no Ethereum vêm em várias formas, desde jogos que usam a blockchain para recursos específicos até aqueles em que todo o mundo do jogo vive onchain. A blockchain do Ethereum pode ser usada com jogos em várias capacidades. Os jogos podem armazenar suas moedas como tokens transferíveis ou outros ativos do jogo (personagens, equipamentos, animais de estimação, etc.) na forma de [tokens não fungíveis (NFTs)](/nft/). Os jogos também podem utilizar contratos inteligentes para hospedar sua lógica, regras e estado onchain. Esses jogos são comumente chamados de "jogos totalmente onchain".

O ecossistema do Ethereum também inclui [blockchains de camada 2 (l2s)](/layer-2/learn/) que herdam as garantias de segurança da Rede Principal do Ethereum enquanto expandem a escala do Ethereum e suportam casos de uso especializados. As redes l2 podem fornecer benefícios adicionais para jogos onchain e suas comunidades devido aos seus tempos de confirmação mais rápidos e taxas mais baixas, tornando a jogabilidade mais acessível.

À medida que a [camada 1 (l1) ganha escala](/roadmap/scaling/), os jogos estão começando a retornar à Rede Principal do Ethereum. Um exemplo é o [Asphodel](https://x.com/asph0d37), um jogo totalmente onchain atualmente em fase de testes na l1 do Ethereum. No entanto, a maioria dos jogos ainda utiliza soluções de l2 para se beneficiar de taxas mais baixas.

## A ascensão dos jogos no Ethereum {#rise-of-ethereum-gaming}

MMOs tradicionais como EVE Online, World of Warcraft, MapleStory e RuneScape provaram que as economias virtuais poderiam gerar valor no mundo real. Os jogadores cultivavam ouro para obter renda, a economia do EVE espelhava sistemas financeiros reais e a cultura de mods (Counter-Strike, DotA 2, servidores de Minecraft) mostrou que os jogadores queriam criar em cima de mundos existentes. Até mesmo a [famosa frustração de Vitalik com um nerf no World of Warcraft](https://youtu.be/Letsfuhpobw?t=140) se tornou um símbolo inicial dos problemas com ecossistemas de jogos fechados. Mas os estúdios controlavam tudo; eles podiam banir contas, desligar servidores ou reivindicar a propriedade do conteúdo criado pelos jogadores.

Quando o Ethereum foi lançado, **os designers de jogos viram uma oportunidade de construir mundos que não poderiam ser desligados**. [Como disse Ronan Sandford, criador do Conquest.eth](https://ronan.eth.limo/blog/infinite-games/): "Desde o dia em que me deparei com o Ethereum, fiquei viciado na ideia de criar jogos que rodam e evoluem independentemente de seu criador."

A blockchain do Ethereum permitiu mundos onde as regras não podem ser alteradas arbitrariamente, o estado não pode ser excluído e qualquer pessoa pode construir extensões que vivem enquanto a rede existir. Isso é algo que o Ethereum fornece nativamente.

## Visão geral do ecossistema de jogos do Ethereum {#ethereums-gaming-ecosystem-overview}

- **Camadas 2 (l2s):** Com taxas mais baratas e tempos de transação curtos, as l2s do Ethereum se tornaram um lugar comum para o lançamento de jogos. O cenário das l2s continua a evoluir, com os principais ecossistemas de jogos da Web3, como a Ronin (originalmente uma sidechain para o Axie Infinity), fazendo recentemente a transição para a arquitetura de camada 2 do Ethereum, herdando as garantias de segurança do Ethereum enquanto mantém sua infraestrutura otimizada para jogos. As principais l2s atuais para jogos incluem: [Ronin](https://www.roninchain.com/), [Starknet](https://www.starknet.io/), [Abstract](https://abs.xyz/), [Immutable](https://www.immutable.com/) e [Base](https://www.base.org/).
- **Infraestrutura:** Para facilitar o desenvolvimento de jogos onchain, existem várias pilhas de ferramentas; [Cartridge](https://cartridge.gg/) (oferecendo chaves de sessão, transações sem gas via pagador e autenticação baseada em WebAuthn por meio do Cartridge Controller), [Dojo](https://dojoengine.org/) (um framework de jogos prováveis com suporte nativo à abstração de conta), [MUD](https://mud.dev/) (um motor de jogo onchain baseado na EVM). Outros, como [Proof of Play](https://proofofplay.com/) e [Thirdweb](https://thirdweb.com/), permitem que os desenvolvedores criem jogos com experiências de usuário semelhantes às da Web2.
- **Comunidades de jogos:** O ecossistema de jogos do Ethereum é apoiado por guildas de jogos, incluindo ([YGG](https://x.com/YieldGuild), [MANA Gaming](https://x.com/ManaGamingBR), [WASD](https://x.com/WASD_0x), [LegacyGG](https://x.com/Lgc_GG), [Gaming Grid](https://x.com/GamingGridx) e [OLAGG](https://x.com/OLAGuildGames)) para colaboração de jogadores, plataformas de descoberta como [GAM3S.GG](https://games.gg/) e veículos de mídia como [Gaming Daily](https://x.com/GamingDailyx) para análise de jogos e cobertura do ecossistema. Alguns abrangem todos esses, como [FOCGERS](https://x.com/FOCGERS).
- **Gêneros de jogos:** Certos gêneros de jogos se alinham naturalmente com as propriedades exclusivas da blockchain do Ethereum: **estado persistente**, **lógica verificável** e **economias de propriedade dos jogadores**. Os desenvolvedores abordam a integração de forma diferente. Alguns constroem jogos totalmente onchain, onde toda a lógica e o estado vivem na blockchain, enquanto outros usam a blockchain minimamente para a propriedade de ativos, como cosméticos em NFT. Os desenvolvedores estão descobrindo quais tipos de jogabilidade se beneficiam mais da arquitetura onchain, incluindo:
   1. **Dungeon Crawlers e Roguelikes:** As masmorras de morte permanente (permadeath) totalmente onchain do Loot Survivor com pontuações altas verificáveis, o Maze of Gains do Onchain Heroes, bem como sua versão com tema de Axie chamada Axie: Den of Mysteries, que combinam exploração de labirintos com mecânicas de finanças descentralizadas (DeFi).
   2. **MMOs:** O MMO sazonal de risco para ganhar (risk-to-earn) Gold Rush do Cambria com mecânicas de PvP e extração, onde cada passo fora das zonas seguras carrega riscos reais. O jogo de estratégia MMO totalmente onchain do ForTheKingdom, apresentando guerra de facções em grande escala. Axie Infinity: Atia's Legacy, um MMO onchain na Ronin onde os jogadores lutam em masmorras PvE e batalhas PvP com riscos reais. 
   3. **Estratégia 4X e Grande Estratégia:** Conquest.eth, um jogo não permissionado de conquista espacial e diplomacia onde os jogadores fazem stake de tokens em planetas para produzir frotas e formar alianças, em um jogo que roda para sempre onchain. Realms traz a mecânica 4X do Ethereum para um cenário de fantasia, onde os jogadores controlam Realms (NFTs de terrenos) para minerar recursos, construir exércitos e se envolver em diplomacia complexa dentro de uma economia totalmente impulsionada pelos jogadores. Dark Forest foi pioneiro no gênero com mecânicas de névoa de guerra com prova de conhecimento zero (ZK-proof) e é atualmente mantido como uma bifurcação da comunidade pelo DFArchon.
   4. **Estratégia e Tática:** Realms inclui as intensas partidas de estratégia baseadas em buy-in de 1 hora do Blitz, e o futuro autobattler Asphodel está sendo testado na Rede Principal do Ethereum.
   5. **Jogos de Cartas Colecionáveis:** Showdown combina a estratégia de jogos de cartas colecionáveis com a intensidade do pôquer. Axie Infinity Classic é uma combinação de xadrez, pôquer e Pokémon, e o primeiro jogo da Web3 a atingir milhões de jogadores.
   6. **Arenas Competitivas:** Duel Arena do Cambria, onde os jogadores fazem stake de ETH em duelos 1v1 em ritmo acelerado até a morte. AveForge, uma arena competitiva de batalha de mechs onde os jogadores pilotam mechs personalizáveis.

## Jogos para experimentar {#games}

<CategoryAppsGrid category="gaming" />

## Recursos dos jogos onchain {#features-of-onchain-games}

1. **Maneira segura de trocar bens digitais**

   Ativos negociáveis do jogo podem ser trocados entre jogadores por outros ativos do jogo ou tokens nessa cadeia. No passado, os jogos comumente enfrentavam o desafio de facilitar o comércio justo entre os jogadores, especialmente para itens escassos e valiosos. Mercados de terceiros e negociações ponto a ponto frequentemente levavam os jogadores a serem enganados ou roubados de seus bens valiosos. Como os ativos onchain seguem uma estrutura de dados estabelecida, eles podem ser facilmente integrados aos mercados existentes, dando aos jogadores tranquilidade ao trocá-los. Os avanços nos formadores de mercado automatizados (AMMs) também permitem que os jogadores negociem instantaneamente certos itens sem ter que esperar por uma contraparte (comprador/vendedor) para finalizar sua negociação.

2. **Origem transparente dos ativos**

   Falsificações e cópias de originais podem ser um problema considerável ao avaliar itens, especialmente se a pessoa não estiver muito familiarizada com a forma de distinguir um item real de um falso. Os ativos onchain sempre têm um histórico de registro completo de quem (qual carteira) os possuiu e seu endereço de origem. Mesmo que exista uma cópia perfeita do item onchain, ela é claramente distinguida do original com base em seu contrato inteligente de origem, mitigando o risco de fraude.

3. **Lógica transparente**

   Jogos totalmente onchain usam contratos inteligentes para sua funcionalidade. Isso significa que qualquer pessoa pode revisar e verificar a lógica do jogo, garantindo que ele funcione de acordo com a intenção dos desenvolvedores. Essa transparência lógica também permite que outros desenvolvedores criem novos contratos inteligentes que podem expandir o jogo ou ser integrados a alguns de seus recursos.

4. **Conquistas prováveis**

   Em jogos totalmente onchain, cada ação do jogador é registrada na blockchain. Isso torna muito fácil checar e verificar se um jogador realizou as ações necessárias para um determinado marco/conquista. Devido à natureza imutável das blockchains, esses registros de conquistas permanecerão intactos enquanto a cadeia continuar funcionando e podem ser verificados por qualquer parte (não apenas pelos desenvolvedores, como é comumente visto nos jogos tradicionais).

5. **Jogos para sempre**

   Os jogadores investem muito tempo e esforço na construção de sua reputação e personagens no jogo, mas esse progresso pode ser facilmente perdido se os desenvolvedores decidirem desligar os servidores (especialmente se for um jogo online). Como os jogos totalmente onchain armazenam sua lógica e estado onchain, os jogadores ainda podem interagir com os contratos inteligentes do jogo, mesmo que o desenvolvedor principal do jogo encerre o desenvolvimento. Esses jogos ainda podem ser jogados e continuar a receber atualizações de suas comunidades porque sua lógica ainda roda na blockchain.

## Como os jogos integram blockchains {#how-games-integrate-blockchains}

Os desenvolvedores de jogos podem decidir incorporar diferentes recursos do Ethereum em seus jogos. Só porque os recursos existem não significa que todo jogo construído no Ethereum precise usar todos eles, pois existem soluções alternativas (com seus próprios prós e contras) que os desenvolvedores podem usar em vez disso.

### Entrar com Ethereum {#sign-in-with-ethereum}

Os jogadores podem usar suas contas onchain para entrar no jogo. Isso geralmente é facilitado por meio da assinatura de uma transação com a carteira Web3 de um jogador. Os jogadores podem então manter seus ativos do jogo e carregar suas reputações de jogador em uma conta, em qualquer jogo em que fizerem login usando a mesma carteira. A [EVM](/developers/docs/evm/) do Ethereum é um padrão comumente usado em muitas blockchains, portanto, um jogador pode frequentemente usar a mesma conta para fazer login em jogos em qualquer blockchain compatível com a EVM que a carteira suporte (nota: algumas carteiras Web3 exigem uma importação manual de RPC, especialmente para blockchains mais recentes, antes que possam ser usadas para fazer qualquer coisa nessa cadeia).

### Tokens fungíveis {#fungible-tokens}

Assim como o ether, os recursos e moedas fungíveis do jogo podem ser armazenados onchain como tokens fungíveis. Os tokens podem então ser enviados entre endereços e usados em contratos inteligentes, permitindo que os jogadores negociem ou presenteiem recursos e moedas do jogo em mercados abertos.

### Tokens não fungíveis {#non-fungible-tokens}

Os tokens não fungíveis representam ativos digitais únicos com propriedades distintas e registros de propriedade armazenados onchain. O Ethereum hospeda o maior ecossistema de NFTs, com o [OpenSea](https://opensea.io/) permanecendo como o mercado de uso geral dominante para a negociação de NFTs de jogos em várias cadeias. Desenvolvimentos recentes mostram os NFTs evoluindo além de colecionáveis estáticos, como os Axies do Axie Infinity, para ativos digitais dinâmicos e funcionais que podem ser usados para jogar jogos onchain.

Os NFTs de Feras (Beasts) no Loot Survivor da Starknet armazenam metadados totalmente onchain, incluindo espécie, nível (tier), nível (level), saúde, tipo de combate e histórico de derrotas. Isso torna cada NFT um **registro verificável e permanentemente onchain de eventos de jogo**. Quando um jogador é o primeiro a derrotar uma Fera nomeada, ele cunha o NFT, e essa Fera então continua a aparecer na masmorra de todos os outros jogadores; cada morte subsequente para essa Fera é registrada em seus metadados, criando interações entre jogadores sem exigir servidores centrais. As mortes dos jogadores geram recompensas para o NFT da Fera possuída. 

Os NFTs ROM do Gigaverse funcionam como fábricas, gerando materiais e recursos ao longo do tempo. Em vez de possuir um único item, os jogadores podem possuir infraestrutura de fabricação, introduzindo **mecânicas de cadeia de suprimentos e geração contínua de valor às economias de jogos**. Os NFTs 'Core' do Cambria da Abstract invertem o modelo de microtransações ao permitir que os jogadores cunhem animais de estimação e skins. Os detentores de Core ganham Fragmentos (Shards), os queimam para criar novos cosméticos e os negociam em mercados impulsionados pelos jogadores, enquanto o estúdio ganha com royalties em vez de vendas diretas.  


### Contratos inteligentes {#smart-contracts}

Jogos totalmente onchain usam contratos inteligentes para criar uma lógica de jogo transparente e imutável. Nesses casos, a blockchain serve como o backend do jogo, substituindo a necessidade de hospedar sua lógica e armazenamento de dados em um servidor centralizado. (Nota: nem todos os jogos da Web3 são jogos totalmente onchain. Como mencionado antes, depende de cada caso o quanto dos dados e da lógica do jogo é armazenado onchain, em oposição a outra camada de disponibilidade de dados ou em um servidor clássico.)

## Evolução das melhorias na experiência do usuário (UX) do jogador {#evolution-of-player-ux-improvements}

### Interoperabilidade e jogo cross-chain {#interoperability-and-cross-chain-play}

Os avanços nas interações cross-chain e nas pontes permitem que os jogadores acessem jogos no Ethereum de forma mais fluida do que nunca. Os jogos podem ser implantados em várias blockchains, e os ativos onchain de um jogo podem ser integrados por outro jogo. No passado, os jogadores geralmente precisavam transferir seus fundos via ponte para outra cadeia antes de poderem começar a usá-los no jogo. Hoje em dia, os jogos comumente integram pontes de tokens para outras cadeias para facilitar a integração dos jogadores.

### Melhorias na escalabilidade e nas taxas de gas {#scalability-and-gas-fee-improvements}

Em 2017, a febre em torno do CryptoKitties aumentou drasticamente as taxas de gas para todos os usuários que faziam transações no Ethereum. Desde então, inúmeras Propostas de Melhoria do Ethereum (EIPs) foram implantadas com sucesso em atualizações de rede, aumentando a largura de banda da Rede Principal do Ethereum e reduzindo significativamente as taxas médias de transação. As l2s expandem ainda mais a vazão disponível, reduzindo as taxas de transação para centavos ou até menos. Taxas mais baixas e maior vazão expandiram os casos de uso de jogos que podem ser construídos no Ethereum, suportando ações de alto volume e microtransações no jogo que não excluem os jogadores comuns pelo preço.

### Logins sociais {#social-logins}

Entrar com uma conta onchain do Ethereum, que pode ser usada em todas as blockchains compatíveis com a EVM, é um dos métodos de autenticação mais comuns. Algumas cadeias não EVM também o usam como uma opção para criar uma conta. No entanto, se um novo jogador não tiver uma conta do Ethereum existente e quiser criar facilmente uma conta para entrar em um jogo, a [abstração de conta](/roadmap/account-abstraction/) permite que ele entre com suas contas sociais e crie uma conta do Ethereum em segundo plano.

### Pagador e chaves de sessão {#paymaster-and-session-keys}

Pagar taxas de gas para enviar transações onchain ou interagir com contratos inteligentes pode ser um ponto de atrito significativo para muitos novos jogadores. As contas de pagador podem ser financiadas pelo jogador ou subsidiadas pelo jogo. As chaves de sessão permitem que o jogador permaneça conectado ao jogo durante toda a duração de sua sessão, exigindo que ele assine apenas a primeira mensagem de sua sessão, com as mensagens subsequentes assinadas em segundo plano.

Existem filosofias contrastantes em torno dessas mecânicas. Um exemplo importante é o Kamigotchi da Initia, que trata o gas pago pelo jogador como receita direta. Em contraste, o ecossistema de jogos Realms.World, que inclui mais de 4 jogos totalmente onchain ao vivo na Starknet, adota a abordagem oposta. Todos os jogos no ecossistema usam o pagador da Cartridge, permitindo que os jogadores interajam com os jogos com custo zero de gas. Onde o Kamigotchi adota as taxas de gas como parte do design econômico, os jogos do Realms.World veem os custos de gas principalmente como um obstáculo para a experiência do jogador.

## Comece a jogar no Ethereum {#get-started-with-gaming-on-ethereum}

1. **Encontre um jogo divertido para jogar** - Navegue pelos jogos listados acima ou explore plataformas como [ChainPlay](https://chainplay.gg/chain/ethereum/), [Gam3s.GG](https://gam3s.gg/) e [DappRadar](https://dappradar.com/rankings/protocol/ethereum/category/games).
2. **Configure sua carteira cripto** - Os jogadores precisam de uma carteira para gerenciar ativos digitais do jogo e (em alguns casos) para fazer login nos jogos. [Encontre uma carteira aqui](/wallets/find-wallet/).
3. **Adicione fundos à sua carteira** - Adquira algum ether (ETH) ou tokens relevantes para a rede l2 na qual você planeja jogar. [Saiba onde obter ETH aqui](/get-eth/). 
4. **Jogue** - Comece a jogar e desfrute da verdadeira propriedade do seu progresso no jogo!