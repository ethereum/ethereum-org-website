---
title: Jogos no Ethereum
lang: pt-br
template: use-cases
image: /images/robot-help-bar.png
sidebarDepth: 2
summaryPoint1: "As regras do jogo e o estado podem ser aplicados pelo blockchain da Ethereum, e não pelos servidores de um estúdio, representando um benefício fundamental dos jogos onchain"
summaryPoint2: Qualquer pessoa pode criar mods, bots ou jogos totalmente novos que se conectam aos mesmos dados onchain abertos
summaryPoint3: "L2s desenvolvidas para fins específicos permitem jogabilidade em tempo real com taxas mais baixas, enquanto as estruturas de desenvolvimento de jogos tornam a criação de jogos onchain mais acessível do que nunca"
buttons:
  - content: Saiba mais
    toId: gaming-on-ethereum
  - content: Explorar jogos
    toId: games
    isSecondary: false
---

## Jogos no Ethereum {#gaming-on-ethereum}

Os jogos no Ethereum vêm em várias formas, desde jogos que usam o blockchain para recursos específicos até aqueles em que todo o mundo do jogo vive onchain. O blockchain da Ethereum pode ser usado com jogos de várias maneiras. Os jogos podem armazenar suas moedas como tokens transferíveis ou outros ativos do jogo (personagens, equipamentos, animais de estimação, etc.) na forma de [NFTs (tokens não fungíveis)](/nft/). Os jogos também podem utilizar contratos inteligentes para hospedar sua lógica, regras e estado onchain. Esses jogos são comumente chamados de "jogos totalmente onchain".

O ecossistema Ethereum também inclui [blockchains de camada 2 (L2s)](/layer-2/learn/) que herdam as garantias de segurança da rede principal (mainnet) da Ethereum enquanto estendem a escalabilidade da Ethereum e suportam casos de uso especializados. As redes L2 podem fornecer benefícios adicionais para jogos onchain e suas comunidades, porque as L2s podem oferecer tempos de confirmação mais rápidos, maior volume de processamento e taxas mais baixas, tornando a jogabilidade mais rápida e acessível.

## Visão geral do ecossistema de jogos da Ethereum {#ethereums-gaming-ecosystem-overview}

- **Camadas 2:** Com taxas mais baratas e tempos de transação curtos, as L2s tornaram-se um lugar comum para o lançamento de jogos. As principais camadas 2 com jogos incluem: Starknet, Immutable, Base e Abstract.
- **Infraestrutura:** para facilitar o desenvolvimento de jogos onchain, existem várias pilhas de ferramentas que podem ser usadas com seu próprio projeto, incluindo: Cartridge, Dojo, Proof of Play e Thirdweb.
- **Guildas de jogos:** os jogadores que querem fazer parte de uma comunidade de jogos podem se juntar a guildas de jogos para criar estratégias e colaborar com outros jogadores na guilda. Guildas notáveis incluem: YGG, WASD, LegacyGG, Gaming Grid, OLAGG e muito mais.
- **Jogos:** os jogos da Ethereum vêm em diferentes formas e tamanhos, abrangendo tudo, desde a estratégia em tempo real de _Realms: Eternum_, até o MMO de _Axie: Atia's Legacy_, o RPG de ação de _Fableborn_ e até mesmo plataformas DeFi gamificadas como _Ponziland_. Com novos jogos sendo lançados regularmente em diferentes cadeias, sempre há algo novo para explorar.

## Jogos para experimentar {#games}

<CategoryAppsGrid category="gaming" />

## Recursos de jogos onchain {#features-of-onchain-games}

1. **Maneira segura de trocar bens digitais**

   Ativos negociáveis no jogo podem ser trocados entre jogadores por outros ativos no jogo ou tokens nessa cadeia. No passado, os jogos enfrentavam comumente o desafio de facilitar trocas justas entre jogadores, especialmente para itens escassos e valiosos. Mercados de terceiros e negociação ponto a ponto muitas vezes levavam os jogadores a serem enganados ou a perderem seus bens preciosos. Como os ativos onchain seguem uma estrutura de dados estabelecida, eles podem ser facilmente integrados aos mercados existentes, dando aos jogadores tranquilidade ao trocá-los. Os avanços nos AMMs também permitem que os jogadores troquem instantaneamente certos itens sem ter que esperar por uma contraparte (comprador/vendedor) para finalizar sua troca.

2. **Origem transparente do ativo**

   Falsificações e cópias de originais podem ser um problema considerável ao avaliar itens, especialmente se a pessoa não estiver muito familiarizada em como distinguir um item real de um falso. Os ativos onchain sempre têm um histórico completo de quem (qual carteira) os possuía e seu endereço de origem. Mesmo que uma cópia perfeita do item exista onchain, ela é claramente distinguida do original com base em seu contrato inteligente de origem, mitigando o risco de fraude.

3. **Lógica transparente**

   Jogos totalmente onchain usam contratos inteligentes para sua funcionalidade. Isso significa que qualquer pessoa pode revisar e verificar a lógica do jogo, garantindo que ele funcione de acordo com a intenção dos desenvolvedores. Essa transparência da lógica também permite que outros desenvolvedores criem novos contratos inteligentes que podem expandir o jogo ou ser integrados a alguns de seus recursos.

4. **Conquistas comprováveis**

   Em jogos totalmente onchain, cada ação do jogador é registrada no blockchain. Isso torna muito fácil verificar se um jogador realizou as ações necessárias para um determinado marco/conquista. Devido à natureza imutável dos blockchains, esses registros de conquistas permanecerão intactos enquanto a cadeia continuar funcionando e podem ser verificados por qualquer parte (não apenas desenvolvedores, como é comumente visto nos jogos tradicionais).

5. **Jogos para sempre**

   Os jogadores investem muito tempo e esforço na construção de sua reputação e personagens no jogo, mas esse progresso pode ser facilmente perdido se os desenvolvedores decidirem desligar os servidores (especialmente se for um jogo online). Como os jogos totalmente onchain armazenam sua lógica e estado onchain, os jogadores ainda podem interagir com os contratos inteligentes do jogo, mesmo que o desenvolvedor principal do jogo cesse o desenvolvimento. Tais jogos ainda podem ser jogados e continuar a receber atualizações de suas comunidades porque sua lógica ainda é executada no blockchain.

## Como os jogos integram blockchains {#how-games-integrate-blockchains}

Os desenvolvedores de jogos podem decidir incorporar diferentes recursos do Ethereum em seus jogos. Só porque os recursos existem não significa que todo jogo construído no Ethereum precise usar todos eles, pois existem soluções alternativas (com seus próprios prós e contras) que os desenvolvedores podem usar.

### Login com Ethereum {#sign-in-with-ethereum}

Os jogadores podem usar suas contas onchain para fazer login no jogo. Isso geralmente é facilitado pela assinatura de uma transação com a carteira web3 de um jogador. Os jogadores podem então manter seus ativos no jogo e carregar suas reputações de jogador em uma conta, em todos os jogos em que fizerem login usando a mesma carteira. A [EVM](/developers/docs/evm/) da Ethereum é um padrão comumente usado em muitos blockchains, então um jogador pode frequentemente usar a mesma conta para fazer login em jogos em qualquer blockchain compatível com a EVM que a carteira suporte (nota: algumas carteiras web3 requerem uma importação manual de RPC, especialmente para blockchains mais recentes, antes que possam ser usadas para fazer qualquer coisa nessa cadeia).

### Tokens fungíveis {#fungible-tokens}

Assim como o Ether, recursos e moedas fungíveis do jogo podem ser armazenados onchain como tokens fungíveis. Os tokens podem então ser enviados entre endereços e usados em contratos inteligentes, permitindo que os jogadores negociem ou presenteiem recursos e moedas do jogo em mercados abertos.

### Tokens não fungíveis {#non-fungible-tokens}

Tokens não fungíveis (NFTs) podem representar elementos únicos do jogo, como personagens, itens, terrenos ou até mesmo estados de salvamento. Com metadados dinâmicos, os NFTs podem evoluir em resposta a eventos do jogo, permitindo que os ativos carreguem um histórico ao longo do tempo. Por exemplo, os NFTs de Fera (Beast) no Loot Survivor registram permanentemente quando um jogador específico derrota uma criatura única, incorporando esse resultado no próprio ativo NFT. Este tipo de design aponta para jogos onde os ativos são persistentes, com estado e potencialmente utilizáveis em múltiplas experiências onchain, em vez de serem colecionáveis estáticos.

### Contratos inteligentes {#smart-contracts}

Jogos totalmente onchain usam contratos inteligentes para criar uma lógica de jogo transparente e imutável. Nesses casos, o blockchain serve como o backend do jogo, substituindo a necessidade de hospedar sua lógica e armazenamento de dados em um servidor centralizado. (Nota: nem todos os jogos web3 são jogos totalmente onchain. Como mencionado anteriormente, depende de cada caso a quantidade de dados e lógica do jogo que é armazenada onchain, em vez de em outra camada de disponibilidade de dados ou em um servidor clássico.)

## Evolução das melhorias de UX do jogador {#evolution-of-player-ux-improvements}

### Interoperabilidade e jogo entre cadeias {#interoperability-and-cross-chain-play}

Avanços em interações entre cadeias e pontes permitem que os jogadores acessem jogos no Ethereum de forma mais integrada do que nunca. Os jogos podem ser implantados em vários blockchains, e os ativos onchain de um jogo podem ser integrados por outro jogo. No passado, os jogadores geralmente precisavam fazer uma ponte com seus fundos para outra cadeia antes de poderem começar a usá-los no jogo. Hoje em dia, os jogos comumente integram pontes de token para outras cadeias para facilitar a integração do jogador.

### Melhorias de escalabilidade e taxa de gas {#scalability-and-gas-fee-improvements}

Em 2017, a febre em torno dos CryptoKitties aumentou drasticamente as taxas de gas para todos os usuários que realizavam transações no Ethereum. Desde então, várias Propostas de Melhoria do Ethereum foram implantadas com sucesso em atualizações de rede, aumentando a largura de banda da Rede Principal da Ethereum e reduzindo significativamente as taxas médias de transação. As camadas 2 expandem ainda mais a taxa de transferência disponível, reduzindo as taxas de transação para centavos ou até menos. Taxas mais baixas e maior taxa de transferência expandiram os casos de uso de jogos que podem ser construídos no Ethereum, suportando ações de alto volume e microtransações no jogo que não excluem os jogadores comuns.

### Logins sociais {#social-logins}

O login com uma conta onchain da Ethereum, que pode ser usada em todos os blockchains compatíveis com a EVM, é um dos métodos de autenticação mais comuns. Algumas cadeias não-EVM também o usam como uma opção para criar uma conta. No entanto, se um novo jogador não tiver uma conta Ethereum existente e quiser criar facilmente uma conta para entrar em um jogo, a [abstração de conta](/roadmap/account-abstraction/) permite que ele faça login com suas contas sociais e crie uma conta Ethereum em segundo plano.

### Paymaster e chaves de sessão {#paymaster-and-session-keys}

Pagar taxas de gas para enviar transações onchain ou interagir com contratos inteligentes pode ser um ponto de atrito significativo para muitos novos jogadores. As contas Paymaster podem ser financiadas pelo jogador ou subsidiadas pelo jogo. As chaves de sessão permitem que o jogador permaneça logado no jogo durante toda a sessão, exigindo que ele assine apenas a primeira mensagem de sua sessão, com as mensagens subsequentes sendo assinadas em segundo plano.

Existem filosofias contrastantes em torno dessas mecânicas. Um exemplo importante é o Kamigotchi da Initia, que trata o gas pago pelo jogador como receita direta. Em contraste, o ecossistema de jogos Realms.World, que inclui mais de 4 jogos totalmente onchain ao vivo no Starknet, adota a abordagem oposta. Todos os jogos do ecossistema usam o Cartridge Paymaster, permitindo que os jogadores interajam com os jogos a um custo zero de gas. Onde Kamigotchi adota as taxas de gas como parte do design econômico, os jogos do Realms.World veem os custos de gas principalmente como um obstáculo à experiência do jogador.

## Comece a jogar no Ethereum {#get-started-with-gaming-on-ethereum}

1. **Encontre um jogo divertido para jogar** - Navegue pelos jogos listados acima ou explore plataformas como [ChainPlay](https://chainplay.gg/chain/ethereum/), [Gam3s.GG](https://gam3s.gg/) e [DappRadar](https://dappradar.com/rankings/protocol/ethereum/category/games).
2. **Configure sua carteira de criptomoedas** - Você precisará de uma carteira para gerenciar seus ativos digitais do jogo e (em alguns casos) para fazer login nos jogos. [Escolha uma carteira aqui](/wallets/find-wallet/).
3. **Deposite fundos em sua carteira** - Adquira um pouco de Ether (ETH) ou tokens relevantes para a rede de camada 2 que você planeja usar.
4. **Jogue** - Comece a jogar e aproveite a verdadeira propriedade do seu progresso no jogo.
