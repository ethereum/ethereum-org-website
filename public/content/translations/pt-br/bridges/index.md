---
title: Introdução às pontes de blockchain
description: Pontes permitem que os usuários movam seus fundos entre blockchains diferentes
lang: pt-br
---

# Pontes de blockchains {#prerequisites}

_Web3 evoluiu para um ecossistema de soluções de escala L1 e L2, cada uma projetada com capacidades e escolhas únicas. À medida que o número de protocolos da blockchain aumenta, consequentemente aumenta a necessidade de mover ativos entre cadeias. Para atender a essa demanda, precisamos de pontes._

<Divider />

## O que são pontes? {#what-are-bridges}

As pontes de blockchain funcionam como as pontes que conhecemos no mundo físico. Assim como uma ponte física conecta dois locais físicos, uma ponte blockchain conecta dois ecossistemas do blockchain. **Pontes facilitam a comunicação entre a blockchain através da transferência de informações e de ativos**.

Vejamos um exemplo:

Você é dos EUA e está planejando uma viagem à Europa. Você tem Dólar, mas precisa de Euro para gastar. Para trocar seus Dólares por Euros, você pode usar uma corretora de câmbio por uma pequena taxa.

Mas o que fazer se você quiser fazer uma troca semelhante para usar uma [blockchain](/glossary/#blockchain) diferente? Digamos que você queira trocar [ETH](/glossary/#ether) na rede principal do Ethereum por ETH na [Arbitrum](https://arbitrum.io/). Como o câmbio de moedas que fizemos por Euro, precisamos de um mecanismo para mover nosso ETH do Ethereum para o Arbitrum. As pontes tornam essa transação possível. Neste caso, a [Arbitrum tem uma ponte nativa](https://bridge.arbitrum.io/) que pode transferir o ETH da rede principal para o Arbitrum.

## Por que precisamos de pontes? {#why-do-we-need-bridges}

Todos os blockchains têm suas limitações. Para que o Ethereum seja dimensionado e acompanhe a demanda, foram necessários [rollups](/glossary/#rollups). Em alternativa, L1s como Javier Solana e Avalanche são concebidos de forma diferente para permitir uma taxa de transferência mais elevada, mas à custa de descentralização.

No entanto, todas as blockchains são desenvolvidas em ambientes isolados e têm regras e mecanismos de [consenso](/glossary/#consensus) diferentes. Isso significa que eles não podem se comunicar nativamente e os tokens não podem se mover livremente entre os blockchains.

Pontes existem para conectar os blockchains, permitindo a transferência de informações e tokens entre elas.

**Pontes possibilitam**:

- a transferência de ativos e informações entre cadeias.
- [dapps](/glossary/#dapp) para acessar os pontos fortes de várias blockchains, fortalecendo assim seus recursos (já que os protocolos agora têm mais espaço para a inovação).
- Usuários para acessar novas plataformas e alavancar os benefícios de cadeias diferentes.
- Desenvolvedores de diferentes ecossistemas do blockchain para colaborar e construir novas plataformas para os usuários.

[Como fazer bridge de tokens para a camada 2](/guides/how-to-use-a-bridge/)

<Divider />

## Casos de utilização de pontes {#bridge-use-cases}

Seguem alguns cenários onde você pode usar uma ponte:

### Diminuir as taxas de transação {#transaction-fees}

Digamos que você tenha ETH na mainnet (rede principal) Ethereum, mas queira taxas de transação mais baratas para explorar diferentes dapps. Ao fazer uma ponte do seu ETH da Mainnet para uma rollup Ethereum L2, você poderá usufruir de taxas de transação mais baixas.

### Dapps em outros blockchains {#dapps-other-chains}

Se você usa o Aave na rede principal Ethereum para emprestar Dólar Herete, mas a taxa de juros para empréstimos Dólar Herete usando Aave no Polygon é maior.

### Explorar os ecossistemas de blockchain {#explore-ecosystems}

Se você tiver o ETH na Ethereum Mainnet e quiser explorar um alt L1 para experimentar seus dapps nativos. Você pode usar uma ponte para transferir o seu ETH da rede principal Ethereum para o alt L1.

### Possuir ativos nativos de cripto {#own-native}

Digamos que você queira possuir Bitcoin nativo (BTC), mas você só tem fundos na rede principal Ethereum. Para ganhar exposição à BTC na Ethereum, você pode comprar Bitcoin Envolvido (WBTC). No entanto, o WBTC é um token [ERC-20](/glossary/#erc-20) nativo da rede Ethereum, o que significa que é uma versão Ethereum do Bitcoin e não o ativo original na blockchain do Bitcoin. Para possuir BTC nativa, você teria que ligar os seus ativos do Ethereum para Bitcoin usando uma ponte. Isso converter suas WBTC em BTC nativa, por meio da ponte. Como alternativa, você pode possuir BTC e querer usá-lo nos protocolos[DeFi](/glossary/#defi) do Ethereum. Isso exigiria fazer uma ponte no caminho inverso, de BTC para WBTC, que logo poderia ser usada como um ativo no Ethereum.

<InfoBanner shouldCenter emoji=":bulb:">
  Você também pode fazer tudo acima usando uma <a href="/get-eth/">exchange centralizada</a>. No entanto, a menos que seus fundos já estejam em uma exchange (corretora), isso envolveria vários passos, e você provavelmente estaria melhor usando uma ponte.
</InfoBanner>

<Divider />

## Tipos de pontes {#types-of-bridge}

As pontes têm muitos tipos de desenhos e complexidades. Em geral, as pontes caem em duas categorias: pontes confiáveis e não confiáveis.

| Pontes confiáveis                                                                                                                                        | Pontes não confiáveis                                                                                                                                                |
| -------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Pontes confiáveis dependem de uma entidade ou sistema central para suas operações.                                                                       | As pontes não confiáveis operam usando contratos e algoritmos inteligentes.                                                                                          |
| Elas pressupõem confiança relativa à custódia de fundos e à segurança da ponte. Os usuários dependem, principalmente, da reputação do operador da ponte. | Elas não são confiáveis, ou seja, a segurança da ponte é a mesma que a do blockchain subjacente.                                                                     |
| Os usuários precisam abrir mão do controle de seus ativos criptos.                                                                                       | Graças aos [contratos inteligentes](/glossary/#smart-contract), as pontes independentes de confiança permitem que os usuários permaneçam no controle de seus fundos. |

Em poucas palavras, podemos dizer que pontes confiáveis têm pressupostos de confiança, enquanto pontes não confiáveis tem confiança mínima e não fazem novas suposições de confiança além das dos domínios subjacentes. Veja como esses termos podem ser descritos:

- **Necessidade mínima de confiança**: com segurança equivalente aos domínios subjacentes. Conforme descrito por [Arjun Bhuptani neste artigo.](https://medium.com/connext/the-interoperability-trilemma-657c2cf69f17)
- **Suposições de confiança:** afastando-se da segurança dos domínios subjacentes, adicionando verificadores externos no sistema, tornando-o menos seguro em termos criptoeconômicos.

Para desenvolver uma melhor compreensão das principais diferenças entre as duas abordagens, vamos dar um exemplo:

Imagine que esteja no checkpoint de segurança do aeroporto. Existem dois tipos de checkpoint:

1. Checkpoint manual – operado por funcionários que verificam manualmente todos os detalhes da sua passagem e identidade antes de entregar o bilhete de embarque.
2. Check-in automático — operado por uma máquina onde você coloca os detalhes do voo e recebe o bilhete de embarque se tudo estiver correto.

Um ponto de verificação manual é semelhante a um modelo confiável, pois depende de um terceiro, por exemplo, os funcionários, para suas operações. Como usuário, você confia nos funcionários para tomar as decisões certas e usar suas informações privadas corretamente.

O check-in automático é semelhante a um modelo sem confiança, pois remove o papel do operador e usa tecnologia para operar. Os usuários sempre permanecem no controle de seus dados e não precisam confiar suas informações privadas a terceiros.

Muitas soluções de ponte adotam modelos entre esses dois extremos, com graus variados de necessidade mínima de confiança.

<Divider />

## Usando pontes {#use-bridge}

O uso de pontes permite que você mova seus ativos entre diferentes blockchains. Aqui estão alguns recursos que podem ajudar você a encontrar e usar pontes:

- **[Resumo de pontes L2BEAT](https://l2beat.com/bridges/summary) & [Análise de riscos de pontes do L2BEAT](https://l2beat.com/bridges/risk)**: Uma lista completa de diversas pontes, incluindo detalhes sobre participação de mercado, tipo de ponte e blockchains de destino. O L2BEAT também oferece uma análise de riscos para pontes, ajudando os usuários a tomar decisões informadas ao escolher uma ponte.
- **[Resumo de Pontes da DefiLlama](https://defillama.com/bridges/Ethereum)**: Um resumo dos volumes de pontes nas redes Ethereum.

<Divider />

## Riscos ao usar pontes {#bridge-risk}

As pontes estão nos estágios iniciais de desenvolvimento. É provável que o projeto ideal de ponte ainda não tenha sido descoberto. Interagir com qualquer tipo de ponte traz riscos:

- **Risco de contrato inteligente —** o risco de uma falha no código que pode causar a perda de fundos do usuário
- **Risco de tecnologia —** falha de software, código com erros, erro humano, spam e ataques maliciosos podem interromper as operações do usuário

Além disso, como as pontes confiáveis adicionam suposições de confiança, elas carregam riscos adicionais, como:

- **Risco de censura —** os operadores da ponte teoricamente podem impedir que os usuários transfiram seus ativos usando a ponte
- **Risco de custódia —** os operadores da ponte podem conspirar para roubar os fundos dos usuários

Os fundos do usuário estão em risco se:

- houver uma falha no contrato inteligente
- o usuário cometer um erro
- o blockchain subjacente for hackeado
- os operadores da ponte tiverem intenção maliciosa em uma ponte confiável
- a ponte for hackeada

Um ataque hacker recente foi a ponte Wormhole da Solana, [onde 120k wETH (US$ 325 milhões) foram roubados durante o ataque hacker](https://rekt.news/wormhole-rekt/). Muitos dos [principais hacks em blockchains envolveram pontes](https://rekt.news/leaderboard/).

As pontes são cruciais para integrar usuários às camadas 2 do Ethereum e até mesmo para usuários que desejam explorar diferentes ecossistemas. Entretanto, dados os riscos envolvidos na interação com as pontes, os usuários devem entender as trocas que as pontes estão fazendo. Estas são algumas [estratégias para segurança entre cadeias](https://blog.debridge.finance/10-strategies-for-cross-chain-security-8ed5f5879946).

<Divider />

## Leitura adicional {#further-reading}

- [EIP-5164: Execução entre cadeias](https://ethereum-magicians.org/t/eip-5164-cross-chain-execution/9658) *18 de junho de 2022 - Brendan Asselstine*
- [L2Bridge Risk Framework](https://gov.l2beat.com/t/l2bridge-risk-framework/31) _5 de julho de 2022 - Bartek Kiepuszewski_
- ["Por que o futuro será multi-chain, mas não será cross-chain."](https://old.reddit.com/r/ethereum/comments/rwojtk/ama_we_are_the_efs_research_team_pt_7_07_january/hrngyk8/)_8 de janeiro de 2022 - Vitalik Buterin_
