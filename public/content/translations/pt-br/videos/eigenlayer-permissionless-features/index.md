---
title: "EigenLayer: adição de recursos não permissionados ao Ethereum"
description: "Sreeram Kannan apresenta a abordagem da EigenLayer para a adição de recursos não permissionados no Ethereum."
lang: pt-br
youtubeId: "-V-fG4J1N_M"
uploadDate: 2023-02-10
duration: "0:24:11"
educationLevel: advanced
topic:
  - "restaking"
  - "eigenlayer"
  - "segurança"
format: presentation
author: a16z crypto
breadcrumb: "EigenLayer"
---

Uma palestra de pesquisa de **Sreeram Kannan** (Universidade de Washington / EigenLayer) em um evento de pesquisa cripto da a16z, explicando como a EigenLayer visa permitir a inovação não permissionada no Ethereum, permitindo que os stakers comprometam o mesmo capital em stake a condições adicionais de penalização em troca do fornecimento de novos serviços, como oráculos, pontes, camadas de disponibilidade de dados e ambientes de execução alternativos.

*Esta transcrição é uma cópia acessível da [transcrição original do vídeo](https://www.youtube.com/watch?v=-V-fG4J1N_M) publicada pela a16z crypto. Ela foi levemente editada para facilitar a leitura.*

#### Introdução (0:00) {#introduction-000}

Hoje vou falar sobre um dos produtos que estamos construindo, que também é uma ideia chamada EigenLayer. Chamamos a EigenLayer de coletivo de restaking, mas o que ela faz é permitir que qualquer pessoa adicione novos recursos ao Ethereum.

Como o Tim apresentou, sou professor associado na Universidade de Washington em Seattle, onde temos trabalhado em blockchains, consenso e outras áreas nos últimos quatro anos e meio. No último ano, fundei a startup EigenLayer Labs. Fizemos muito trabalho em protocolos de consenso — tivemos um artigo chamado "Everything is a Race" que analisa as condições sob as quais os protocolos do tipo cadeia mais longa de Prova de Trabalho (PoW), Prova de Participação (PoS) e prova de espaço são seguros. Construímos com base em parte desse entendimento — por exemplo, um artigo chamado Prism, que é um protocolo de Prova de Trabalho (PoW) com latência muito baixa. Também fizemos um trabalho chamado PoSAT sobre como criar um protocolo de Prova de Participação (PoS) dinamicamente disponível, onde seu protocolo continua a funcionar sob participação variável.

#### Quando as blockchains são responsabilizáveis (1:31) {#when-are-blockchains-accountable-131}

Também exploramos quando as blockchains são responsabilizáveis. Uma heurística é que, quando você tem quóruns e assinaturas, se um grupo de stakers assinar duplamente um bloco, essas blockchains são responsabilizáveis. Mas há sutilezas — por exemplo, um protocolo como a Algorand, que também usa quóruns, não é responsabilizável porque depende de suposições de tempo onde você pode criar violações de segurança simplesmente não dizendo nada.

#### Consenso de múltiplos recursos (2:11) {#multi-resource-consensus-211}

Os dois trabalhos mais recentes são sobre consenso de múltiplos recursos — suponha que você queira construir um protocolo que use Prova de Participação (PoS), prova de espaço e Prova de Trabalho (PoW), todos combinados em um único protocolo. Você quer que ele funcione mesmo se a maioria dos mineradores de Prova de Trabalho (PoW) for maliciosa, desde que uma fração muito pequena dos mineradores de Prova de Participação (PoS) seja honesta. Nós caracterizamos as regiões de trade-off entre múltiplos recursos.

Também trabalhamos no design de topologia ponto a ponto — como você garante que, na rede ponto a ponto de uma blockchain, o protocolo de consenso respeite a ordenação das mensagens? Uma das coisas que acontecem de forma desenfreada nas blockchains é o front-running. Para evitar o front-running não direcionado — onde você apenas quer passar na frente de todos os outros porque tem uma vantagem de preço — temos um artigo chamado Themis que dá à blockchain uma propriedade nativa de primeiro a entrar, primeiro a sair (FIFO).

Além do consenso, existem soluções de escalabilidade como fragmentação. Tivemos alguns artigos — Coded Merkle Tree e Free2Shard — sobre isso.

Uma coisa que descobrimos como um grande atrito na blockchain é que a taxa de inovação nas camadas principais — no consenso, na fragmentação ou no ponto a ponto — é muito menor do que a taxa de inovação na camada de aplicação. Os aplicativos podem ser implantados de forma não permissionada — qualquer pessoa pode implantar um aplicativo sobre uma blockchain existente como o Ethereum. Enquanto as atualizações do protocolo principal são permissionadas em um sentido muito profundo. Isso estagnou bastante o nosso espaço.

#### Desacoplando confiança e inovação (8:30) {#decoupling-trust-and-innovation-830}

Voltando a história para 2008–2009: o Bitcoin foi pioneiro na confiança descentralizada por meio da mineração de Prova de Trabalho (PoW). Acima da mineração, há um protocolo de consenso — cadeia mais longa ou cadeia mais pesada — que decide a cadeia válida. Acima disso, o Bitcoin Script define a semântica de execução. Portanto, temos uma camada de confiança na base, uma camada de consenso acima e uma camada de execução no topo.

Mas o Bitcoin também era uma blockchain específica para aplicativos — projetada para um aplicativo: a troca de Bitcoin entre clientes. Voltando a 2011, qualquer novo aplicativo que precisasse ser construído em uma blockchain precisava de sua própria rede de confiança. Por exemplo, alguém queria construir um sistema de nomes de domínio descentralizado chamado Namecoin. A camada de scripts do Bitcoin não oferecia programabilidade suficiente, então você tinha que criar uma nova camada de scripts e uma nova rede de confiança. Não havia como compartilhar a confiança entre a Namecoin e o Bitcoin.

A ideia central construída pelo Ethereum foi o desacoplamento entre confiança e inovação. Eles pegaram a camada de scripts do Bitcoin e a substituíram por uma camada de programação de propósito geral Turing completa — a Máquina Virtual Ethereum (EVM). Esta foi uma pequena atualização técnica em um sentido básico, mas o que ela criou foi a modularidade da confiança. Agora qualquer pessoa pode vir e construir aplicativos descentralizados (dapps) sobre o sistema. A pessoa que construiu o ENS não teve nada a ver com a rede de confiança. A confiança da rede Ethereum tornou-se um módulo que pode ser fornecido a qualquer aplicativo distribuído.

#### Inovação aberta (10:23) {#open-innovation-1023}

Isso levou a uma aceleração massiva da economia pseudônima. Qualquer pessoa que crie esses aplicativos — eles não são confiáveis por si mesmos, estão apenas trazendo inovação. Você tem uma ideia, pode ser um zé-ninguém, não precisa ser confiável, você apenas escreve seu código, o coloca no Ethereum, e todos confiam que o Ethereum continuará a executar as condições conforme declaradas.

Uma maneira de modelar isso: as camadas base — a rede de confiança, o consenso e a máquina virtual — são agrupadas em uma rede de confiança que produz confiança. A blockchain Ethereum é uma produtora de confiança. Os aplicativos distribuídos são consumidores de confiança. A troca de valor é: os dapps obtêm confiança do Ethereum e, em troca, pagam taxas. Assim como o capital de risco foi o desacoplamento entre capital e inovação, o Ethereum desacoplou a confiança e a inovação.

Mas as barreiras à inovação aberta continuam a persistir. Se eu tiver uma ideia de como atualizar o protocolo de consenso do Ethereum — digamos que seja 2019 e eu tenha criado o protocolo de consenso da Avalanche — não há como implantá-lo no Ethereum. Então, o que eu faço? Eu vou e crio meu próprio mundo inteiro. Esta é a era das blockchains alternativas de camada 1 (l1) — cada uma com diferentes protocolos de consenso, diferentes máquinas virtuais, mas cada uma tendo que construir suas próprias redes de confiança.

Esse cenário se parece exatamente com o cenário de 2011 do Bitcoin e da Namecoin. As inovações no nível do dapp podem simplesmente ser construídas no Ethereum, mas as inovações que vão mais fundo e tocam o coração da pilha de tecnologia precisam criar ecossistemas de confiança fragmentados.

Além disso, o Ethereum fornece confiança aos dapps apenas para a criação de blocos — ordenação de transações e execução de transações. Isso é tudo. Se os dapps quisessem confiança em qualquer outra coisa — ler dados da internet, ler dados de outra blockchain, executar um mecanismo de execução diferente, executar um mecanismo de jogos, executar um sistema de autenticação — eles teriam que criar sua própria rede de confiança. A Chainlink é um ótimo exemplo: é um protocolo de oráculo que ajuda a buscar dados da internet para a blockchain, mas a Chainlink tem sua própria rede de confiança. Sua confiança não é emprestada dos stakers do Ethereum.

#### Problema microeconômico (16:28) {#microeconomic-problem-1628}

O problema microeconômico: se você estiver executando um middleware — digamos, um sistema de armazenamento de dados — você precisa criar seu próprio mecanismo de staking. Você precisa de alta segurança econômica, o que significa muito capital em stake, e então você tem o custo de oportunidade do capital. Por exemplo, você quer US$ 10 bilhões em stake na sua camada de armazenamento de dados. Você tem que pagar uma taxa anual de 5% ou 10% sobre esse capital em um mundo não especulativo. O custo dominante não é o custo operacional de armazenar dados — é o custo de alimentar uma base de capital econômico massiva.

Você olha para qualquer ecossistema de Prova de Participação (PoS): 94% das recompensas vão para a pessoa que detém o capital, e apenas 6% vão para a pessoa que realmente faz as operações. Portanto, mesmo que você tenha uma ideia inovadora para reduzir os custos operacionais em 10 vezes, os 94% permanecem inalterados. Sua estrutura de custos é limitada pelo custo de capital.

Se você é um dapp, o problema microeconômico é que você está pagando uma taxa muito alta para uma grande rede de confiança como o Ethereum, mas você está limitado pela confiança mais fraca da qual depende. Se você tivesse um oráculo ou uma ponte que não fosse tão confiável, você poderia ser explorado lá. Sua segurança é sempre o menor denominador comum.

#### Problema econômico (19:52) {#economic-problem-1952}

Para a blockchain principal, se a proposta de valor central é fornecer confiança descentralizada e obter receita com isso, o Ethereum só é capaz de fornecer confiança descentralizada na criação de blocos — não em todas as outras coisas necessárias para executar um serviço descentralizado. Ilhas de confiança descentralizada estão sendo criadas por outros middlewares e, em vez de a receita se alinhar e criar uma rede de confiança massiva, a receita fica fragmentada em ilhas menores.

#### EigenLayer (20:44) {#eigenlayer-2044}

Na verdade, é uma ideia ridiculamente simples que resolve todos esses problemas de uma só vez.

A EigenLayer é um mecanismo para alavancar uma rede de confiança existente para fazer outras coisas que ela não foi projetada para fazer. O Ethereum fornece confiança na ordenação e execução. A EigenLayer é uma série de contratos inteligentes no Ethereum, e a palavra operativa central é restaking.

O que é restaking? No Ethereum de Prova de Participação (PoS), várias dezenas de bilhões de dólares já estão em stake na Beacon Chain. A EigenLayer é um mecanismo pelo qual os stakers fazem restaking — eles colocam o mesmo capital em risco adicional. Eles bloqueiam seu stake no Ethereum, e o mesmo stake é comprometido com condições adicionais de penalização. A penalização é um mecanismo pelo qual seu stake pode ser retirado, mas agora você adiciona motivos adicionais pelos quais pode ser penalizado, além dos contratos inteligentes da EigenLayer.

A propriedade que queremos: o mesmo stake assume um risco adicional. Risco adicional em quê? No fornecimento de quaisquer novos serviços que tenham sido construídos sobre a EigenLayer — alguém quer construir um oráculo, uma ponte, uma camada de disponibilidade de dados, um novo protocolo de consenso. Qualquer um desses pode ser construído sobre a EigenLayer. Se você é um staker optando por participar, você também especifica em qual subconjunto de serviços está optando por entrar — e, assim, ganhando receita enquanto também assume um risco adicional de penalização.

#### Como a EigenLayer alinha o ecossistema (23:50) {#how-eigenlayer-aligns-the-ecosystem-2350}

Para middleware: se um staker que já fez stake no Ethereum optar por também fornecer serviços em um oráculo, ele não terá um custo de capital adicional. Ele já fez stake no Ethereum e está ganhando APR. Ao optar pela EigenLayer, o custo marginal de capital é muito pequeno ou teoricamente zero. Se você sabe que, como um nó honesto, nunca será penalizado, o risco é minimizado. A equação se torna: o custo operacional é justificado pela receita? A estrutura de custos do middleware de repente se transforma de limitada pelo capital para limitada pelo custo operacional.

Para dapps: especialmente serviços populares nos quais muitos stakers optam por participar fornecem a mesma confiança que o próprio Ethereum. Se todos os stakers potencialmente optarem por participar, você poderá obter a confiança central do Ethereum em serviços que não foram construídos nativamente no Ethereum.

Também está alinhado em valor com o ecossistema principal. Os stakers que fizeram stake no Ethereum recebem recompensas de bloco e taxas de transação, mas também podem receber taxas de oráculo, taxas de disponibilidade de dados, taxas de ordenação — todas as coisas que antes não estavam disponíveis. O fato de haver fontes adicionais de receita para fazer staking de ETH aumenta o valor do próprio token.

A EigenLayer é um mercado de dois lados. Um lado são os stakers optando por participar. O outro lado são os middlewares e serviços construídos sobre a EigenLayer optando por usar esses stakers.

#### Superalavancagem e gerenciamento de risco (33:00) {#over-leveraging-and-risk-management-3300}

**Pergunta do público:** E se o stake estiver sendo superalavancado?

Digamos que existam dez dapps diferentes executando suas próprias cadeias, cada um com US$ 1 milhão em valor dependendo do mesmo quórum de stakers de US$ 2 milhões — esse stake se torna superalavancado. A EigenLayer também é a camada de gerenciamento de risco. Modelamos isso como um problema de grafos: cada staker é um nó, cada serviço depende de um grupo de stakers e há um lucro com a corrupção para cada serviço. Em seguida, você calcula os cortes neste grafo para garantir que o sistema nunca fique superalavancado.

Se o sistema ficar superalavancado, as taxas sobem, mais pessoas optam por participar e o sistema se torna subalavancado novamente. À medida que mais serviços são iniciados, as oportunidades de rendimento aumentam e mais capital fica bloqueado — em vez de 5% do ETH em stake, você pode ter 50%.

#### Economia do espaço de bloco (43:58) {#block-space-economics-4358}

O espaço de bloco é determinado pelo limite do bloco — o tamanho máximo que um bloco pode acomodar. Todos os sistemas de blockchain têm uma economia de autoajuste onde, à medida que o tamanho do bloco se aproxima do limite do bloco, os preços começam a explodir.

O limite do bloco é definido pela infraestrutura do nó mais fraco. A filosofia do Ethereum é admitir um validador doméstico na Venezuela — talvez 1 megabyte por segundo. Então é assim que o limite do bloco é definido. Mas todos os stakers executando na Amazon Web Services têm conexões de 10 gigabits — uma diferença de 10.000 vezes em relação ao nó mais fraco.

A EigenLayer resolve isso automaticamente criando um mercado livre onde esses stakers podem emprestar seu espaço de bloco adicional para outros serviços. Alguém poderia construir outra cadeia com 15 giga-gás por bloco em vez de 15 milhões de gás. Você obtém algo como 60% da segurança do Ethereum — e isso já é bom o suficiente.

#### Heterogeneidade dos stakers (48:57) {#staker-heterogeneity-4857}

A heterogeneidade dos stakers vai além das habilidades computacionais. Os stakers são altamente heterogêneos em suas preferências de risco e recompensa. Você e eu podemos concordar que seremos penalizados se divergirmos de uma saída da API da Coinbase, mas para outra pessoa isso é completamente inaceitável. Isso nunca pode ser normalizado em um protocolo principal, mas pode ser externalizado em uma camada de adesão (opt-in).

Os stakers também são heterogêneos nas preferências de recompensa. No Ethereum, o espaço de bloco é uma quantidade incolor — todas as transações são iguais, e o único sinal para distingui-las é o preço. É muito difícil construir uma rede social sobre o Ethereum porque cada transação de rede social compete com uma transação de finanças descentralizadas (DeFi) que é muito mais lucrativa em uma base de transação por transação. Nossa solução: os stakers optam por diferentes subcadeias nas quais têm diferentes preferências de recompensa.

#### Inovação democrática e ágil (51:01) {#democratic-and-agile-innovation-5101}

A EigenLayer resolve o problema de como projetar uma blockchain que seja democrática e ágil na inovação. O Ethereum é governado de forma muito democrática, mas também é muito lento para responder. Todos os protocolos hoje fazem um trade-off entre agilidade e governança democrática. O Ethereum mais a EigenLayer obtém o melhor dos dois mundos: uma camada base que é democrática e atualizada lentamente, sobre a qual a EigenLayer permite que as pessoas construam inovações que respondem rapidamente às demandas do mercado de uma forma completamente não permissionada.

#### EigenDA e encerramento (52:56) {#eigenda-and-closing-5256}

Estamos explorando a construção de pontes, automação orientada a eventos, serviços de ordenação justa, sidechains e integração de MEV — tudo na EigenLayer. A EigenLayer já está ativa em redes de teste (testnets) internas. Já construímos o primeiro caso de uso: uma camada de disponibilidade de dados em hiperescala para o Ethereum chamada EigenDA. É uma camada de disponibilidade de dados que incorpora as melhores ideias em codificação de apagamento e compromissos polinomiais. Em nossa rede de teste, a taxa na qual você pode gravar dados é de 12,4 megabytes por segundo — 10 vezes maior do que o Ethereum 2.0 está programado para entregar.

O principal insight é que, com a codificação de apagamento, o custo total de armazenamento de um arquivo não depende do número de nós que optaram por participar. Mas o preço que você pode cobrar depende do número de nós porque você está dando mais segurança econômica. Há uma economia de autoescalabilidade onde mais e mais nós optarão por participar porque podem cobrar um prêmio de segurança sem aumentar o custo operacional. A codificação de apagamento quebra o trade-off entre escalabilidade e descentralização — você obtém descentralização total e escalabilidade total simultaneamente.

#### Destaques de perguntas e respostas (58:00) {#qa-highlights-5800}

**Sobre auditorias de middleware:** Assim como existe um ecossistema de auditoria de contratos inteligentes, precisamos de ecossistemas de auditoria de middleware. A auditoria de contratos inteligentes atende a usuários que supostamente não sabem nada. A auditoria de middleware atende a stakers que supostamente sabem alguma coisa. Se não conseguirmos fazer as auditorias de middleware funcionarem, também não deveríamos confiar nas auditorias de contratos inteligentes.

**Sobre risco:** O exemplo extremo — todo o stake optou por um sistema EigenLayer onde você poderia ser penalizado mesmo sem fazer nada de errado, e então você foi penalizado e todo o protocolo está em risco. É possível. Mas os stakers são os que estão perdendo seu dinheiro, então eles devem ser mais cuidadosos ao optar por participar. Facilitar para que eles sejam cuidadosos é no que estamos focando.

**Sobre espaço de bloco da L1 vs. sidechains:** Você pode executar um sistema muito diferente — como uma Solana VM — sobre a rede de confiança do Ethereum. A condição de penalização é simples: se você assinar duplamente um bloco na mesma profundidade, essa é uma condição verificável onchain e você é penalizado. A estrutura de custos funciona porque os restakers não têm custo de capital adicional, e a diferença entre uma sidechain da EigenLayer e ter sua própria cadeia é que você não precisa de um novo token de valor e não precisa pagar para manter o custo de capital desse token.