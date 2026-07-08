---
title: "O jogo das reorgs na Prova de Participação (PoS) do Ethereum"
description: "Caspar Schwarz-Schilling apresenta uma pesquisa sobre ataques de reorganização de blocos na Prova de Participação (PoS) do Ethereum, cobrindo vetores de ataque, mecanismos de defesa e as mitigações em nível de protocolo em vigor."
lang: pt-br
youtubeId: "xcPxwhrg3Ao"
uploadDate: 2022-11-29
duration: "0:18:41"
educationLevel: advanced
topic:
  - "consensus"
  - "pos"
  - "security"
format: presentation
author: LisCon
breadcrumb: "Reorgs em PoS"
---

Esta apresentação explora os tipos de reorganizações de blocos possíveis na Prova de Participação (PoS) do Ethereum e as mitigações projetadas para evitá-las. Caspar Schwarz-Schilling, pesquisador do Robust Incentives Group da Fundação Ethereum, explica a mecânica das reorgs ex-post e ex-ante, comparando o cenário de segurança entre a Prova de Trabalho (PoW) e a Prova de Participação (PoS).

*Esta transcrição é uma cópia acessível da [transcrição original do vídeo](https://www.youtube.com/watch?v=xcPxwhrg3Ao) publicada pela LisCon. Ela foi levemente editada para facilitar a leitura.*

#### Introdução e contexto (0:03) {#introduction-and-background-003}

Sejam bem-vindos. Hoje vou falar sobre as reorgs que são possíveis na Prova de Participação (PoS) do Ethereum.

Recentemente, entrei para a Fundação Ethereum, em particular para o Robust Incentives Group. Basicamente, somos uma equipe de pesquisa focada em tudo relacionado a incentivos. Vou ser breve — esta palestra está cheia de conteúdo e você pode encontrar a maior parte do nosso trabalho no GitHub.

#### Dois tipos de reorgs (0:44) {#two-types-of-reorgs-044}

Hoje quero falar sobre reorgs e, em particular, quero esboçar dois tipos diferentes de reorgs que são possíveis no âmbito da Prova de Participação (PoS) do Ethereum.

Por um lado, temos as **reorgs ex-post** e, por outro, as **reorgs ex-ante**. Perdoem-me a nomenclatura latina um tanto pretensiosa, mas ela dá conta do recado.

As reorgs ex-post são mais ou menos o que geralmente pensamos quando falamos sobre reorgs. O adversário vê um bloco — se for valioso, ele pode querer tentar reorganizá-lo. Então, no diagrama aqui, vemos que o bloco N+1 é o bloco que o invasor deseja remover com a reorg e, ao construir sobre o mesmo bloco pai N, se funcionar, o bloco N+3 é então construído sobre o bloco N+2. Isso é o de sempre.

Agora, as reorgs ex-ante são um pouco diferentes. A ideia é que o invasor precisa iniciar o ataque antes mesmo de saber qual bloco ele vai remover com a reorg. Como isso funciona basicamente? Em um nível muito alto, o bloco N+1 é construído sobre o N, mas não é liberado imediatamente. Os nós honestos nem sabem que o N+1 existe e, portanto, continuarão construindo sobre o N. Então, por meio de algum mecanismo, o N+1 é liberado e o N+3 pode ver que o N+1 está liderando e construir sobre ele, de modo que o N+2 seja efetivamente removido pela reorg.

Você pode se perguntar por que alguém iria querer fazer esse tipo de reorg. Bem, ainda há MEV a ser capturado. Se você tiver sorte, o bloco N+2 tem muito MEV — você pode capturar isso apenas copiando e colando o que quer que seja esse bloco. No pior dos casos, você tem basicamente dois slots de transações para escutar.

#### Reorgs ex-post na Prova de Trabalho (PoW) (2:49) {#ex-post-reorgs-in-proof-of-work-249}

Antes de mergulhar nas reorgs ex-ante, que é o tópico principal desta palestra, deixe-me recapitular brevemente as reorgs ex-post e, especialmente, começar com o contexto da Prova de Trabalho (PoW).

Basicamente, é uma recapitulação da postagem do blog dos suspeitos de sempre — Georgios e Vitalik. Vá em frente e leia, é excelente.

Em resumo, na Prova de Trabalho (PoW) do Ethereum, as reorgs ex-post são difíceis, mas não são inviáveis. Um minerador com 10% tem uma chance relativamente boa de minerar alguns blocos seguidos e, se o incentivo for alto o suficiente — imagine que haja um bloco com 100 ETH em MEV para capturar —, então talvez uma taxa de sucesso de um por cento possa ser suficiente para fazer valer a pena tentar reorganizar.

#### Reorgs ex-post na Prova de Participação (PoS) (3:39) {#ex-post-reorgs-in-proof-of-stake-339}

Na Prova de Participação (PoS), a história é completamente diferente. Estamos falando de uma quantidade absurda de stake necessária. Vou mostrar como alguém poderia fazer isso apenas para enfatizar o quão ridiculamente difícil é.

Talvez alguns conceitos básicos primeiro. O tempo na Prova de Participação (PoS) do Ethereum avança em slots. Cada slot tem 12 segundos de duração. Em cada slot, há dois papéis: você tem um proponente — exatamente um proponente — e um comitê de milhares de atestadores que devem atestar os blocos que ouvem na camada P2P. Eles determinam o topo da cadeia executando a escolha de bifurcação, que é basicamente uma função que recebe a árvore de blocos como entrada e fornece o topo da cadeia.

Você deve atestar os blocos se ouvir um bloco válido, ou quatro segundos após o início de um slot — o que ocorrer primeiro. Portanto, se por algum motivo o proponente do bloco N+1 estiver offline e não houver nenhum bloco quatro segundos após o início do slot, você atesta o bloco N. Se você o ouvir a tempo, atesta o bloco N+1. Simples.

Todas essas atestações dão peso aos blocos, e esse peso é usado pela escolha de bifurcação para determinar qual é o topo mais recente.

Agora vamos analisar uma reorg de um bloco. No início, tudo ocorre normalmente — todos atestam o bloco N, até mesmo o invasor. Então, o N+1 é construído sobre o N e, como o invasor não quer dar peso ao bloco que está tentando remover com a reorg, ele atesta o bloco N. O bloco N está ganhando muito peso porque o invasor tem dois terços do comitê — o que significa que ele precisa controlar, grosso modo, dois terços de todo o stake.

Um terço das pessoas honestas atestou o N+1, dois terços o N. Agora vem o bloco N+2 — obviamente, o invasor o constrói sobre o N e atesta seu próprio bloco. Do ponto de vista dos validadores honestos, o N+1 ainda está liderando em termos de peso porque tanto o N+1 quanto o N+2 herdam todo o peso do bloco N, mas o N+1 também tem esse um terço de atestações que falta ao N+2.

Se somarmos isso — o bloco N+1 tem atestações no valor de um terço mais um terço, totalizando dois terços, e o bloco N+2 também tem dois terços. Por simplicidade, vamos supor que o desempate seja a favor do invasor. Então, o N+3 verá o N+2 como líder e construirá sobre ele.

Para dar uma ideia de quão ridículas são essas suposições — mesmo se você tivesse um staker com 65%, para controlar dois terços do comitê em qualquer slot, você tem uma probabilidade de 0,05%. Isso mostra que o poder das atestações paralelas é real — as reorgs ex-post são incrivelmente difíceis, se não virtualmente impossíveis, na Prova de Participação (PoS) do Ethereum.

#### Mecânica do ataque de reorg ex-ante (7:34) {#ex-ante-reorg-attack-mechanics-734}

Agora vou falar sobre as reorgs ex-ante. Esse ataque é baseado em um artigo de Neuder e outros. Recentemente, melhoramos esse ataque de forma significativa. Também escrevemos um artigo sobre ele e conseguimos enviá-lo para o arXiv bem a tempo.

E já adianto — não se preocupem, existem mitigações. Elas serão integradas antes do The Merge.

Como funciona um ataque de reorg ex-ante? Inicialmente, o bloco N — tudo normal, todos atestam ele. Agora você é o proponente do N+1. Você o propõe e o atesta de forma privada com um único validador. O mais importante é que você o mantém privado — você não o libera e não o propaga na camada P2P.

O que acontece é que as pessoas honestas não veem o bloco N+1, então elas atestarão o bloco N. Esse é o truque — você herda esse peso e não precisa realmente lutar contra ele.

Vamos supor latência zero por enquanto. No slot N+2, o que fazemos como invasores é liberar o bloco N+1 e a atestação privada, tudo ao mesmo tempo. Os validadores honestos no slot N+2 precisam atestar um bloco. Do ponto de vista deles, eles veem o bloco N+2 e o bloco N+1 com essa única atestação privada. Se eles executarem a escolha de bifurcação, descobrirão que o bloco N+1 tem mais peso que o bloco N+2, porque o N+1 tem a atestação privada que o N+2 não tem. Até mesmo todos os validadores honestos atestarão efetivamente o bloco N+1. No N+3, trivialmente, o N+1 será visto como o topo da cadeia.

#### Latência da rede e o ataque (10:25) {#network-latency-and-the-attack-1025}

Eu presumi latência zero, o que obviamente não é como funciona. Existe latência — leva tempo para propagar blocos e mensagens na camada P2P.

A maneira como um invasor ainda pode realizar esse tipo de ataque é tendo muitos nós em diferentes locais na topologia P2P. Quando o proponente honesto no slot N+2 propõe esse bloco, você ouve falar dele muito cedo no processo de propagação. Como resultado, você pode liberar seu bloco privado de todos esses locais diferentes, de modo que a maioria ouvirá sobre o bloco N+1 antes de ouvir sobre o bloco N+2 — o que significa que eles veem que o bloco N+1 está liderando em peso e efetivamente o atestarão.

Para enfatizar novamente o que está acontecendo aqui: temos um proponente com um único atestador conseguindo realizar uma reorg de um bloco. Nada ideal, para dizer o mínimo.

#### Estratégias de balanceamento para reorgs mais longas (11:42) {#balancing-strategies-for-longer-reorgs-1142}

Se você quiser ser sofisticado, pode realizar reorgs mais longas usando uma estratégia de balanceamento. A ideia é dividir o comitê honesto em diferentes visões da cadeia.

Você libera seu bloco privado de tal forma que cerca de metade dos nós honestos ouça sobre seu bloco privado e atestação antes de ouvir sobre o bloco N+2 — então eles atestam seu bloco. A outra metade você quer que não ouça seu bloco antes de atestar o N+2.

Agora você tem metade do comitê honesto atestando o N+1 e a outra metade atestando o N+2. Como isso ajuda? O comitê honesto agora se anula, e você, como invasor, nem precisa lutar contra eles — o que é basicamente o sonho de qualquer invasor se tornando realidade.

Analisando o diagrama: bloco N tudo normal, bloco N+1 — mesma história, você não o libera. Os validadores honestos atestam o bloco N. O bloco N+2 surge, você ouve sobre ele cedo e libera o bloco N+1 com uma atestação — o "voto de desempate" — de tal forma que metade do comitê honesto o veja antes e a outra metade depois. Metade vota no N+1, a outra metade no N+2. Na verdade, você quer uma divisão com diferença de um, de modo que o N+2 tenha uma atestação a mais, para que o N+3 construa sobre o N+2 e mantenha a reorg em andamento.

Para finalizar uma reorg de dois blocos: o bloco N+3 é proposto, você o ouve cedo, libera o bloco N+1 e suas duas atestações restantes, inundando a camada P2P para que a maioria das pessoas honestas vote no bloco N+1 — de modo que ele tenha mais peso que o bloco N+3 e o N+4 seja construído sobre o N+1.

Se você pensar bem, é relativamente barato fazer essas reorgs sob essas suposições. Mesmo que você não tenha divisões perfeitas, como a camada P2P é muito grande, você tem uma distribuição de probabilidade que pode ser direcionada de modo que o custo do ataque cresça na raiz quadrada do tamanho do comitê.

#### Mitigação de impulso do proponente (15:17) {#proposer-boost-mitigation-1517}

Vamos falar sobre a mitigação. Qual é a ideia básica? Vamos dar um pouco mais de poder ao proponente. Se um bloco válido chegar a tempo, vamos impulsionar o peso desse bloco pela duração do slot. Depois que esse slot terminar, retomamos a pontuação LMD-GHOST usual e tudo volta ao normal.

Portanto, se o bloco N+2 for proposto a tempo e for válido, esse bloco terá um impulso — digamos, 80% do tamanho do comitê. Agora, essa pequena e fofa atestação do N+1 do invasor não vai resolver o problema. De jeito nenhum.

A questão do balanceamento também não funciona mais porque você tem uma divisão de 50/50, mas o impulso sempre a joga em uma direção. Não há como manter essa divisão de 50/50.

A ideia é que, com essa mitigação em vigor, as atestações do adversário tenham que competir com o impulso para convencer os validadores honestos a votar de acordo com sua preferência. Isso quebra as estratégias de balanceamento e proíbe basicamente todas as reorgs por completo. Boas notícias — há um PR aberto, então basicamente ele será integrado antes do The Merge.

#### Principais conclusões (16:48) {#key-takeaways-1648}

Algumas conclusões principais. Falei sobre as diferenças entre as reorgs ex-post e ex-ante. Esbocei brevemente os diferentes cenários para reorgs na Prova de Trabalho (PoW) em comparação com a Prova de Participação (PoS). Mostrei como realizar uma reorg ex-ante, mas também, e mais importante, como corrigi-la.

Se você estiver interessado nisso, há um artigo — muito mais detalhado, com mais nuances. Os slides serão enviados. Venha falar comigo se estiver interessado, e você também pode me encontrar no Twitter.

Espero que isso tenha sido interessante para você. Muito obrigado.