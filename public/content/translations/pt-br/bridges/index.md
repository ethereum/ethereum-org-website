---
title: Pontes de blockchain
metaTitle: Introdução às pontes de blockchain
description: As pontes permitem que os usuários movam seus fundos entre diferentes blockchains
lang: pt-br
---

_A Web3 evoluiu para um ecossistema de blockchains de camada 1 (l1) e soluções de escalabilidade de camada 2 (l2), cada uma projetada com capacidades e compensações únicas. À medida que o número de protocolos de blockchain aumenta, também aumenta a demanda para mover ativos entre cadeias. Para atender a essa demanda, precisamos de pontes._

<Divider />

## O que são pontes? {#what-are-bridges}

As pontes de blockchain funcionam exatamente como as pontes que conhecemos no mundo físico. Assim como uma ponte física conecta dois locais físicos, uma ponte de blockchain conecta dois ecossistemas de blockchain. **As pontes facilitam a comunicação entre blockchains por meio da transferência de informações e ativos**.

Vamos considerar um exemplo:

Você é dos EUA e está planejando uma viagem para a Europa. Você tem USD, mas precisa de EUR para gastar. Para trocar seus USD por EUR, você pode usar uma casa de câmbio por uma pequena taxa.

Mas, o que você faz se quiser fazer uma troca semelhante para usar uma [blockchain](/glossary/#blockchain) diferente? Digamos que você queira trocar [ETH](/glossary/#ether) na Rede Principal do [Ethereum](/) por ETH na [Arbitrum](https://arbitrum.io/). Assim como o câmbio que fizemos para EUR, precisamos de um mecanismo para mover nosso ETH do Ethereum para a Arbitrum. As pontes tornam essa transação possível. Neste caso, a [Arbitrum tem uma ponte nativa](https://portal.arbitrum.io/bridge) que pode fazer a transferência de ETH da Mainnet para a Arbitrum.

## Por que precisamos de pontes? {#why-do-we-need-bridges}

Todas as blockchains têm suas limitações. Para que o Ethereum escale e acompanhe a demanda, ele exigiu [rollups](/glossary/#rollups). Alternativamente, l1s como Solana e Avalanche são projetadas de forma diferente para permitir maior vazão, mas ao custo da descentralização.

No entanto, todas as blockchains são desenvolvidas em ambientes isolados e têm regras e mecanismos de [consenso](/glossary/#consensus) diferentes. Isso significa que elas não podem se comunicar nativamente, e os tokens não podem se mover livremente entre as blockchains.

As pontes existem para conectar blockchains, permitindo a transferência de informações e tokens entre elas.

**As pontes permitem**:

- a transferência cross-chain de ativos e informações.
- que [aplicativos descentralizados (dapps)](/glossary/#dapp) acessem os pontos fortes de várias blockchains – aprimorando assim suas capacidades (já que os protocolos agora têm mais espaço de design para inovação).
- que os usuários acessem novas plataformas e aproveitem os benefícios de diferentes cadeias.
- que desenvolvedores de diferentes ecossistemas de blockchain colaborem e construam novas plataformas para os usuários.

[Como transferir tokens via ponte para a camada 2 (l2)](/guides/how-to-use-a-bridge/)

<Divider />

## Casos de uso de pontes {#bridge-use-cases}

A seguir estão alguns cenários onde você pode usar uma ponte:

### Taxas de transação mais baixas {#transaction-fees}

Digamos que você tenha ETH na Rede Principal do Ethereum, mas queira taxas de transação mais baratas para explorar diferentes dapps. Ao transferir via ponte seu ETH da Mainnet para um rollup de l2 do Ethereum, você pode desfrutar de taxas de transação mais baixas.

### Dapps em outras blockchains {#dapps-other-chains}

Se você tem usado a Aave na Rede Principal do Ethereum para fornecer USDT, mas a taxa de juros que você pode receber por fornecer USDT usando a Aave na Polygon é maior.

### Explorar ecossistemas de blockchain {#explore-ecosystems}

Se você tem ETH na Rede Principal do Ethereum e deseja explorar uma l1 alternativa para experimentar seus dapps nativos. Você pode usar uma ponte para fazer a transferência do seu ETH da Rede Principal do Ethereum para a l1 alternativa.

### Possuir ativos cripto nativos {#own-native}

Digamos que você queira possuir Bitcoin (BTC) nativo, mas só tem fundos na Rede Principal do Ethereum. Para obter exposição ao BTC no Ethereum, você pode comprar Wrapped Bitcoin (WBTC). No entanto, o WBTC é um token [ERC-20](/glossary/#erc-20) nativo da rede Ethereum, o que significa que é uma versão Ethereum do Bitcoin e não o ativo original na blockchain do Bitcoin. Para possuir BTC nativo, você teria que transferir via ponte seus ativos do Ethereum para o Bitcoin usando uma ponte. Isso fará a ponte do seu WBTC e o converterá em BTC nativo. Alternativamente, você pode possuir BTC e querer usá-lo em protocolos de [finanças descentralizadas (DeFi)](/glossary/#defi) do Ethereum. Isso exigiria fazer a ponte no sentido inverso, de BTC para WBTC, que pode então ser usado como um ativo no Ethereum.

<Alert variant="update">
<AlertEmoji text=":bulb:"/>
<AlertContent>
<AlertDescription>
  Você também pode fazer tudo isso usando uma [corretora centralizada](/get-eth). No entanto, a menos que seus fundos já estejam em uma corretora, isso envolveria várias etapas, e você provavelmente estaria melhor usando uma ponte.
</AlertDescription>
</AlertContent>
</Alert>

<Divider />

## Tipos de pontes {#types-of-bridge}

As pontes têm muitos tipos de designs e complexidades. Geralmente, as pontes se enquadram em duas categorias: pontes confiáveis e pontes sem necessidade de confiança.

| Pontes Confiáveis                                                                                                                                         | Pontes Sem Necessidade de Confiança                                                                                      |
| ------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| Pontes confiáveis dependem de uma entidade ou sistema central para suas operações.                                                                            | Pontes sem necessidade de confiança operam usando contratos inteligentes e algoritmos.                                        |
| Elas têm premissas de confiança em relação à custódia de fundos e à segurança da ponte. Os usuários dependem principalmente da reputação do operador da ponte. | Elas são sem necessidade de confiança, ou seja, a segurança da ponte é a mesma da blockchain subjacente. |
| Os usuários precisam abrir mão do controle de seus ativos cripto.                                                                                                   | Por meio de [contratos inteligentes](/glossary/#smart-contract), as pontes sem necessidade de confiança permitem que os usuários permaneçam no controle de seus fundos.           |

Em resumo, podemos dizer que as pontes confiáveis têm premissas de confiança, enquanto as pontes sem necessidade de confiança são minimizadas em confiança e não criam novas premissas de confiança além daquelas dos domínios subjacentes. Veja como esses termos podem ser descritos:

- **Sem necessidade de confiança**: ter segurança equivalente aos domínios subjacentes. Conforme descrito por [Arjun Bhuptani neste artigo.](https://medium.com/connext/the-interoperability-trilemma-657c2cf69f17)
- **Premissas de confiança:** afastar-se da segurança dos domínios subjacentes adicionando verificadores externos no sistema, tornando-o assim menos seguro do ponto de vista criptoeconômico.

Para desenvolver uma melhor compreensão das principais diferenças entre as duas abordagens, vamos dar um exemplo:

Imagine que você está no ponto de verificação de segurança do aeroporto. Existem dois tipos de pontos de verificação:

1. Pontos de Verificação Manuais — operados por funcionários que verificam manualmente todos os detalhes da sua passagem e identidade antes de entregar o cartão de embarque.
2. Auto Check-In — operado por uma máquina onde você insere os detalhes do seu voo e recebe o cartão de embarque se tudo estiver correto.

Um ponto de verificação manual é semelhante a um modelo confiável, pois depende de terceiros, ou seja, os funcionários, para suas operações. Como usuário, você confia nos funcionários para tomar as decisões certas e usar suas informações privadas corretamente.

O auto check-in é semelhante a um modelo sem necessidade de confiança, pois remove o papel do operador e usa a tecnologia para suas operações. Os usuários sempre permanecem no controle de seus dados e não precisam confiar em terceiros com suas informações privadas.

Muitas soluções de ponte adotam modelos entre esses dois extremos com graus variados de desnecessidade de confiança.

<Divider />

## Usar pontes {#use-bridge}

Usar pontes permite que você mova seus ativos entre diferentes blockchains. Aqui estão alguns recursos que podem ajudá-lo a encontrar e usar pontes:

- **[Resumo de Pontes do L2BEAT](https://l2beat.com/bridges/summary) e [Análise de Risco de Pontes do L2BEAT](https://l2beat.com/bridges/summary)**: Um resumo abrangente de várias pontes, incluindo detalhes sobre participação de mercado, tipo de ponte e cadeias de destino. O L2BEAT também possui uma análise de risco para pontes, ajudando os usuários a tomar decisões informadas ao selecionar uma ponte.
- **[Resumo de Pontes do DefiLlama](https://defillama.com/bridges/Ethereum)**: Um resumo dos volumes de pontes nas redes Ethereum.

<Divider />

## Risco de usar pontes {#bridge-risk}

As pontes estão nos estágios iniciais de desenvolvimento. É provável que o design ideal de ponte ainda não tenha sido descoberto. Interagir com qualquer tipo de ponte traz riscos:

- **Risco de Contrato Inteligente —** o risco de um bug no código que pode causar a perda de fundos do usuário
- **Risco de Tecnologia —** falha de software, código com bugs, erro humano, spam e ataques maliciosos podem possivelmente interromper as operações do usuário

Além disso, como as pontes confiáveis adicionam premissas de confiança, elas trazem riscos adicionais, como:

- **Risco de Censura —** os operadores da ponte podem teoricamente impedir os usuários de transferir seus ativos usando a ponte
- **Risco de Custódia —** os operadores da ponte podem conspirar para roubar os fundos dos usuários

Os fundos do usuário estão em risco se:

- houver um bug no contrato inteligente
- o usuário cometer um erro
- a blockchain subjacente for hackeada
- os operadores da ponte tiverem intenções maliciosas em uma ponte confiável
- a ponte for hackeada

Um hack recente foi na ponte Wormhole da Solana, [onde 120 mil wETH (US$ 325 milhões) foram roubados durante o hack](https://rekt.news/wormhole-rekt/). Muitos dos [principais hacks em blockchains envolveram pontes](https://rekt.news/leaderboard/).

As pontes são cruciais para a integração de usuários nas l2s do Ethereum, e até mesmo para usuários que desejam explorar diferentes ecossistemas. No entanto, dados os riscos envolvidos na interação com pontes, os usuários devem entender as compensações que as pontes estão fazendo. Estas são algumas [estratégias para segurança cross-chain](https://debridge.com/learn/blog/10-strategies-for-cross-chain-security/).

<Divider />

## Leitura adicional {#further-reading}
- [EIP-5164: Execução Cross-Chain](https://ethereum-magicians.org/t/eip-5164-cross-chain-execution/9658) - _18 de junho de 2022 - Brendan Asselstine_
- [Estrutura de Risco de L2Bridge](https://gov.l2beat.com/t/l2bridge-risk-framework/31) - _5 de julho de 2022 - Bartek Kiepuszewski_
- ["Por que o futuro será multi-chain, mas não será cross-chain."](https://old.reddit.com/r/ethereum/comments/rwojtk/ama_we_are_the_efs_research_team_pt_7_07_january/hrngyk8/) - _8 de janeiro de 2022 - Vitalik Buterin_
- [Aproveitando a Segurança Compartilhada para Interoperabilidade Cross-Chain Segura: Comitês de Estado Lagrange e Além](https://web.archive.org/web/20250125035123/https://research.2077.xyz/harnessing-shared-security-for-secure-blockchain-interoperability) - _12 de junho de 2024 - Emmanuel Awosika_
- [O Estado das Soluções de Interoperabilidade de Rollup](https://web.archive.org/web/20250428015516/https://research.2077.xyz/the-state-of-rollup-interoperability) - _20 de junho de 2024 - Alex Hook_