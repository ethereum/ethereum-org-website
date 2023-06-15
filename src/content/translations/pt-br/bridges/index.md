---
title: Introdução às pontes de blockchain
description: Pontes permitem que os usuários movam seus fundos entre blockchains diferentes
lang: pt-br
---

# Pontes de blockchains {#prerequisites}

_Web3 evoluiu para um ecossistema de soluções de escala L1 e L2, cada uma projetada com capacidades e escolhas únicas. À medida que o número de protocolos blockchain aumenta, também aumenta [a demanda para mover ativos entre as cadeias](<https://dune.xyz/eliasimos/Bridge-Away-(from-Ethereum)>). Para atender a essa demanda, precisamos de pontes._

<Divider />

## O que são pontes? {#what-are-bridges}

As pontes de blockchain funcionam como as pontes que conhecemos no mundo físico. Assim como uma ponte física conecta dois locais físicos, uma ponte blockchain conecta dois ecossistemas do blockchain. As pontes facilitam a comunicação entre blockchains por meio da transferência de informações e ativos.

Vejamos um exemplo:

Você é dos EUA e está planejando uma viagem à Europa. Você tem Dólar, mas precisa de Euro para gastar. Para trocar seus Dólares por Euros, você pode usar uma corretora de câmbio por uma pequena taxa.

Mas, o que você faz se quiser fazer uma troca parecida para usar um blockchain diferente? Digamos que você queira trocar ETH na rede principal Ethereum por ETH no [Arbitrum](https://arbitrum.io/). Como o câmbio de moedas que fizemos por Euro, precisamos de um mecanismo para mover nosso ETH do Ethereum para o Arbitrum. As pontes tornam essa transação possível. Neste caso,a [Arbitrum tem uma ponte nativa](https://bridge.arbitrum.io/) que pode transferir o ETH da rede principal para o Arbitrum.

## Por que precisamos de pontes? {#why-do-we-need-bridges}

Todos os blockchains têm suas limitações. Para o Ethereum crescer e acompanhar a demanda, ela precisou de rollups. Em alternativa, L1s como Javier Solana e Avalanche são concebidos de forma diferente para permitir uma taxa de transferência mais elevada, mas à custa de descentralização.

Entretanto, todos os blockchains se desenvolvem em ambientes isolados e têm diferentes regras e mecanismos de consenso. Isso significa que eles não podem se comunicar nativamente e os tokens não podem se mover livremente entre os blockchains.

Pontes existem para conectar os blockchains, permitindo a transferência de informações e tokens entre elas.

Pontes possibilitam:

- a transferência entre cadeias de ativos e informações
- dapps para acessar as forças de vários blockchains — aprimorando suas capacidades (ja que agora os protocolos têm mais espaço para a inovação).
- Usuários para acessar novas plataformas e alavancar os benefícios de cadeias diferentes.
- Desenvolvedores de diferentes ecossistemas do blockchain para colaborar e construir novas plataformas para os usuários.

[Como fazer bridge de tokens para a camada 2](/guides/how-to-use-a-bridge/)

<Divider />

## Casos de utilização de pontes {#bridge-use-cases}

Seguem alguns cenários onde você pode usar uma ponte:

### Diminuir as taxas de transação {#transaction-fees}

Digamos que você tenha ETH na mainet (rede principal) Ethereum, mas queira taxas de transação mais baratas para explorar diferentes dapps. Ao fazer uma ponte do seu ETH da Mainnet para uma rollup Ethereum L2, você poderá usufruir de taxas de transação mais baixas.

### Dapps em outros blockchains {#dapps-other-chains}

Se você usa o Aave na rede principal Ethereum para emprestar Dólar Herete, mas a taxa de juros para empréstimos Dólar Herete usando Aave no Polygon é maior.

### Explorar os ecossistemas de blockchain {#explore-ecosystems}

Se você tiver o ETH na Ethereum Mainnet e quiser explorar um alt L1 para experimentar seus dapps nativos. Você pode usar uma ponte para transferir o seu ETH da rede principal Ethereum para o alt L1.

### Possuir ativos nativos de cripto {#own-native}

Digamos que você queira possuir Bitcoin nativo (BTC), mas você só tem fundos na rede principal Ethereum. Para ganhar exposição à BTC na Ethereum, você pode comprar Bitcoin Envolvido (WBTC). Entretanto, o WBTC é um token ERC-20 nativo da rede Ethereum, o que significa que é uma versão Ethereum do Bitcoin e não o ativo original do blockchain do Bitcoin. Para possuir BTC nativa, você teria que ligar os seus ativos do Ethereum para Bitcoin usando uma ponte. Isso converter suas WBTC em BTC nativa, por meio da ponte. Como alternativa, você pode possuir BTC e querer usá-la em protocolos de DeFi no Ethereum. Isso exigiria fazer uma ponte no caminho inverso, de BTC para WBTC, que podem ser usados como ativos no Ethereum.

<InfoBanner shouldCenter emoji=":bulb:">
  Você também pode fazer tudo acima usando uma <a href="/get-eth/">exchange centralizada</a>. No entanto, a menos que seus fundos já estejam em uma exchange (corretora), isso envolveria vários passos, e você provavelmente estaria melhor usando uma ponte.
</InfoBanner>

<Divider />

## Tipos de pontes {#types-of-bridge}

As pontes têm muitos tipos de desenhos e complexidades. Em geral, as pontes caem em duas categorias: pontes confiáveis e não confiáveis.

| Pontes confiáveis                                                                                                                                        | Pontes não confiáveis                                                                                               |
| -------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| Pontes confiáveis dependem de uma entidade ou sistema central para suas operações.                                                                       | As pontes não confiáveis operam usando contratos e algoritmos inteligentes.                                         |
| Elas pressupõem confiança relativa à custódia de fundos e à segurança da ponte. Os usuários dependem, principalmente, da reputação do operador da ponte. | Elas não são confiáveis, ou seja, a segurança da ponte é a mesma que a do blockchain subjacente.                    |
| Os usuários precisam abrir mão do controle de seus ativos criptos.                                                                                       | Por meio de contratos inteligentes, pontes não confiáveis permitem aos usuários manterem o controle de seus fundos. |

Em poucas palavras, podemos dizer que pontes confiáveis têm pressupostos de confiança, enquanto pontes não confiáveis tem confiança mínima e não fazem novas suposições de confiança além das dos domínios subjacentes. Veja como esses termos podem ser descritos:

- **Necessidade mínima de confiança**: com segurança equivalente aos domínios subjacentes. Conforme descrito por [Arjun Bhuptani neste artigo.](https://medium.com/connext/the-interoperability-trilemma-657c2cf69f17)
- **Suposições de confiança:** afastando-se da segurança dos domínios subjacentes, adicionando verificadores externos no sistema, tornando-o menos seguro em termos criptoeconômicos.

Para desenvolver uma melhor compreensão das principais diferenças entre as duas abordagens, vamos dar um exemplo:

Imagine que esteja no checkpoint de segurança do aeroporto. Existem dois tipos de checkpoint:

1. Checkpoint manual – operado por funcionários que verificam manualmente todos os detalhes da sua passagem e identidade antes de entregar o bilhete de embarque.
2. Check-in automático — operado por uma máquina onde você coloca os detalhes do voo e recebe o bilhete de embarque se tudo estiver correto.

Os checkpoints manuais são semelhantes a um modelo confiável que depende de terceiros, ou seja, dos funcionários, para suas operações. Como usuário, você confia nos funcionários para tomar as decisões certas e usar suas informações privadas corretamente.

O check-in automático é semelhante a um modelo sem confiança, pois remove o papel do operador e usa tecnologia para operar. Os usuários sempre permanecem no controle de seus dados e não precisam confiar suas informações privadas a terceiros.

Muitas soluções de ponte adotam modelos entre esses dois extremos, com graus variados de necessidade mínima de confiança.

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

- [EIP-5164: Execução entre cadeias](https://ethereum-magicians.org/t/eip-5164-cross-chain-execution/9658) _18 de junho de 2022 - Brendan Asselstine_
- [L2Bridge Risk Framework](https://gov.l2beat.com/t/l2bridge-risk-framework/31) _5 de julho de 2022 - Bartek Kiepuszewski_
- ["Por que o futuro será multi-chain, mas não será cross-chain."](https://old.reddit.com/r/ethereum/comments/rwojtk/ama_we_are_the_efs_research_team_pt_7_07_january/hrngyk8/) _8 de janeiro de 2022 - Vitalik Buterin_
- [O que são pontes Blockchain e como podemos classificá-las?](https://blog.li.finance/what-are-blockchain-bridges-and-how-can-we-classify-them-560dc6ec05fa) _18 de fevereiro de 2021 - Arjun Chand_
- [O que são pontes de cadeias cruzadas?](https://www.alchemy.com/overviews/cross-chain-bridges) _10 de maio de 2022 - Alchemy_
- [Pontos Blockchain: construindo redes de criptoredes](https://medium.com/1kxnetwork/blockchain-bridges-5db6afac44f8) _8 de setembro de 2021 - Dmitriy Berenzon_
- [Pontes no espaço cripto](https://medium.com/chainsafe-systems/bridges-in-crypto-space-12e158f5fd1e) _23 de agosto, 2021 - Ben Adar Hyman_
- [O Trilema da Interoperabilidade](https://medium.com/connext/the-interoperability-trilemma-657c2cf69f17) _1º de outubro de 2021 - Arjun Bhuptani_
- [Proteja a ponte: Comunicação eficiente entre cadeias cruzadas](https://medium.com/dragonfly-research/secure-the-bridge-cross-chain-communication-done-right-part-i-993f76ffed5d) _23 de agosto de 2021 - Celia Wan_
