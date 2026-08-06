---
title: "EIP-7805: Listas de inclusão impostas pela escolha de bifurcação (FOCIL)"
description: "Os pesquisadores do Ethereum Thomas Thiery e Julian Ma explicam a EIP-7805 (FOCIL), que usa listas de inclusão locais agregadas para garantir que transações válidas não possam ser censuradas por construtores de blocos."
lang: pt-br
youtubeId: "cUGyLx-mf6I"
uploadDate: 2025-02-12
duration: "1:00:30"
educationLevel: advanced
topic:
  - "privacy"
  - "network-upgrades"
  - "roadmap-and-priorities"
format: presentation
author: ECH Institute
breadcrumb: "EIP-7805 (FOCIL)"
---

Episódio 141 do **PEEPanEIP** pelos Ethereum Cat Herders. A apresentadora Pooja Ranjan recebe **Thomas Thiery** e **Julian Ma**, pesquisadores do Grupo de Incentivos Robustos da Fundação Ethereum e coautores da [EIP-7805](https://eips.ethereum.org/EIPS/eip-7805), para explicar as Listas de Inclusão Impostas pela Escolha de Bifurcação (FOCIL): por que o Ethereum precisa de resistência à censura no nível do protocolo, como o mecanismo funciona e em que estágio está a implementação.

*Esta transcrição é uma cópia acessível da [transcrição original do vídeo](https://www.youtube.com/watch?v=cUGyLx-mf6I) publicada pelos Ethereum Cat Herders. Ela foi levemente editada para facilitar a leitura.*

#### Introdução (0:35) {#introduction-035}

**Pooja Ranjan:** Olá e bem-vindos ao PEEPanEIP, o único programa onde nos aprofundamos nas Propostas de Melhoria do Ethereum e exploramos seu impacto no ecossistema. Este é o episódio 141, trazido a você pelos Ethereum Cat Herders. Sou sua anfitriã, Pooja Ranjan, e hoje estamos falando sobre a EIP-7805, Listas de Inclusão Aplicadas por Escolha de Bifurcação (Fork-choice enforced Inclusion Lists).

Documentada em novembro de 2024, a EIP-7805 é uma proposta central da trilha de padrões atualmente em status de rascunho. Esta proposta visa permitir que um comitê de validadores force a inclusão de um conjunto de transações em cada bloco. Co-escrita por Thomas Thiery, Francesco D'Amato, Julian Ma, Barnabé Monnot, Terence Tsao, Jacob Kaufmann e Jihoon Song, a proposta está em discussão ativa para uma atualização futura.

Neste episódio, exploraremos os detalhes da EIP-7805, suas implicações e seu impacto potencial no ecossistema Ethereum. Para falar mais sobre a proposta, estamos acompanhados por Thomas Thiery e Julian Ma. Bem-vindos ao PEEPanEIP.

**Thomas Thiery:** Obrigado por nos receber.

**Julian Ma:** Sim, muito obrigado por nos receber.

**Pooja Ranjan:** Estamos animados para aprender sobre a visão geral da proposta, em que ponto ela está hoje e em quanto tempo poderemos vê-la na Rede Principal do Ethereum. Mas antes de começarmos, nossa comunidade adora conhecer os pesquisadores e desenvolvedores por trás do trabalho. Vocês poderiam compartilhar um pouco sobre vocês, o projeto em que estão envolvidos atualmente e sua jornada dentro do ecossistema Ethereum?

#### Apresentações dos convidados (2:14) {#guest-introductions-214}

**Julian Ma:** Claro, eu posso começar. Sou Julian, pesquisador do Robust Incentives Group, assim como o Thomas, na Fundação Ethereum. O Robust Incentives Group se preocupa com a economia do protocolo de forma bem ampla. Alguns de nós têm analisado mecanismos de taxa de transação, como a EIP-1559, e outros têm analisado ataques à camada de consenso, principalmente aqueles motivados por incentivos econômicos.

No meu caso, comecei com um estágio analisando derivativos de taxa básica e, depois disso, entrei em tempo integral. Tenho trabalhado principalmente na separação propositor-construtor (PBS) e em tópicos relacionados a MEV, e agora estou focando em listas de inclusão via FOCIL com esta EIP, e aguardando ansiosamente a separação atestador-propositor. Eu diria que o que mais me anima é levar a pesquisa para a produção por meio desse fluxo de começar com um trabalho mais teórico e levá-lo a uma EIP que, com sorte, possa ser proposta e implementada no Ethereum.

**Thomas Thiery:** Eu sou o Thomas. Também trabalho na Fundação Ethereum no Robust Incentives Group, fazendo pesquisa. Minha formação é, na verdade, um doutorado em neurociência, o que era bem diferente. Mas fiquei curioso sobre blockchains e sistemas distribuídos, quis tentar algo um pouco diferente e entrei em uma empresa de dados cripto chamada Dune. Fiquei lá por um tempo, mas depois senti falta de fazer pesquisa e tive a sorte de poder entrar na EF e no Robust Incentives Group, o que tem sido ótimo até agora.

Trabalhei em tópicos semelhantes. MEV era um assunto bem grande quando entrei. Curiosamente, minhas primeiras publicações de pesquisa foram bem pequenas, mas eram sobre atrasos de inclusão e resistência à censura. Eu não me aprofundei muito nisso até mais recentemente. Nos últimos seis meses a um ano, tenho estado mais ativo no lado da resistência à censura e inclusão. Tem sido muito bom poder começar com ideias de pesquisa, melhorar ideias anteriores que eram muito interessantes, mas não incluíam alguns dos detalhes sobre os quais vamos falar, criar uma proposta e agora ter implementações e devnets que a maioria das pessoas com quem conversei acha que seriam uma boa adição ao Ethereum.

**Pooja Ranjan:** Obrigada por compartilhar. É sempre inspirador conhecer a trajetória dos desenvolvedores. É interessante ver que eles vêm de diferentes áreas e, no fim das contas, estão contribuindo para o ecossistema do Ethereum. Entendo que temos uma apresentação aqui hoje. Então, sem mais delongas, vamos dar uma olhada.

#### Apresentação: objetivos do FOCIL (5:16) {#presentation-goals-of-focil-516}

**Julian Ma:** Perfeito, muito obrigado. Gostaria de começar com uma pequena apresentação sobre como o EIP-7805, ou FOCIL, funciona e por que exatamente queremos implementá-lo. O objetivo é iniciar a conversa, então não será muito aprofundado, para deixar espaço para discussão depois.

O objetivo principal do FOCIL é aumentar a neutralidade crível do Ethereum. O FOCIL faz isso removendo o monopólio de inclusão que atualmente um único proponente ou construtor de blocos detém dentro de um slot. Em vez disso, o FOCIL permite que múltiplos validadores contribuam para a construção de um bloco, incluindo transações em cada bloco.

O objetivo de nível mais alto é buscar uma propriedade que chamamos de neutralidade da cadeia, o que significa que qualquer transação pendente que pague taxas deve ser incluída se estiver disponível e se houver espaço para incluí-la onchain. Acreditamos que, se essa propriedade for suficientemente satisfeita, aumentaremos a neutralidade crível do Ethereum.

#### Por que precisamos do FOCIL e por que agora? (6:09) {#why-do-we-need-focil-and-why-now-609}

**Julian Ma:** Por que precisamos de algo assim? Atualmente, quase todos os validadores terceirizam a construção de blocos para o MEV-Boost, que é um mercado fora do protocolo onde os construtores dão lances pelos direitos de construção de blocos. Neste mercado, existem apenas duas entidades que realmente dominam, e isso significa que 90% dos blocos são construídos por apenas duas entidades.

Vemos aqui que o Ethereum não pode mais obter sua neutralidade crível a partir da construção local de blocos. Ele já fez isso antes. Começou tendo proponentes localizados em todo o mundo, cada um construindo seus blocos localmente, o que significava que todas as transações eram incluídas. Mas agora que a construção de blocos é terceirizada para essas entidades sofisticadas, isso não é mais suficiente. Portanto, é necessário implementar medidas anticensura mais robustas, e o FOCIL é a maneira mais conhecida de fazer isso.

Por que devemos implementar o FOCIL agora? Você pode pensar que os construtores não estão censurando tanto agora, mas eles podem começar a censurar a qualquer momento, seja por razões regulatórias ou econômicas. E a censura econômica é definitivamente algo que não deve ser mal interpretado. Também é bom introduzir o FOCIL quando há relativamente pouca censura, porque então você o introduz como uma linha de base e como um padrão. Todos os validadores fazem listas de inclusão, independentemente de sua jurisdição ou incentivos econômicos, e isso causa pouca instabilidade no mercado. Considerando que, se você fosse introduzir o FOCIL quando todos os construtores estivessem censurando, talvez fosse mais difícil.

Além disso, os based rollups estão se tornando mais comuns hoje em dia, e eles vão depender fortemente da construção de blocos do Ethereum. Se quisermos fornecer o sequenciamento que o Ethereum tem, é necessário ter neutralidade crível aqui por meio do FOCIL.

E, potencialmente, o FOCIL poderia ajudar com a escalabilidade, dependendo de para quem você pergunta. Hoje, o Ethereum ainda obtém sua resistência à censura a partir da construção local de blocos. Se o Ethereum puder obter resistência à censura de outro lugar, por exemplo, via FOCIL, então talvez possamos aumentar as expectativas que temos dos construtores de blocos e permitir, por exemplo, mais blobs. Mas, potencialmente, isso também poderia ser feito sem o FOCIL. Portanto, foi proposto que o FOCIL seja implementado na Fusaka.

#### Como o FOCIL funciona (8:10) {#how-focil-works-810}

**Julian Ma:** Agora vou explicar como o FOCIL funciona. Começaremos com o básico e iremos passo a passo até termos o mecanismo completo, e então exploraremos como esse mecanismo completo satisfaz as propriedades que queremos.

A ideia básica de uma lista de inclusão, que também já foi proposta por Mike Neuder anteriormente, é que existe uma lista de transações que restringe o bloco de alguma forma. Então, há, por exemplo, uma lista de inclusão que inclui as transações A e B, ela é assinada por alguém que é reconhecido pelo protocolo, e então essas transações devem ser incluídas em algum bloco. O FOCIL não muda isso. Ele se baseia nisso, e trata-se mais de quem cria essa lista e como essa lista é aplicada.

Então, quem cria essa lista? Este é o primeiro passo de como o protocolo FOCIL funciona. A cada slot, 16 validadores são selecionados como membros do comitê da lista de inclusão. Cada um desses membros do comitê observa a mempool e constrói sua própria lista de inclusão. Uma lista de inclusão deve ter cerca de 8 kilobytes, ou cerca de 20 transações médias, o que significa cerca de 320 transações médias no total.

O segundo passo é distribuir essas listas de inclusão. Os membros do comitê da lista de inclusão distribuem suas listas de inclusão no tópico global, e eles mesmos não as incluem em um bloco. Eles devem fazer isso antes do segundo 9 do slot, momento em que os atestadores congelam sua visão das listas de inclusão locais. Como veremos no próximo passo, os atestadores são os que realmente aplicam essas listas de inclusão, como o nome sugere: listas de inclusão aplicadas por escolha de bifurcação (fork-choice enforced inclusion lists). Eles congelam sua visão de quais listas de inclusão aplicarão no segundo 9, e isso evita ataques de visão dividida. O produtor de blocos ainda tem alguns segundos extras para observar as listas de inclusão e garantir que não seja afetado negativamente pela falta de alguma lista de inclusão, portanto, o produtor de blocos não corre riscos nesse cenário.

Em seguida, passamos para o passo final, que é a aplicação. Como eu disse, a aplicação é feita por meio da escolha de bifurcação. Os atestadores só votarão em um bloco se ele satisfizer a condição da lista de inclusão. Eles fazem isso observando as listas de inclusão que foram enviadas no tópico global, fazendo uma lista agregada de transações que viram nessas listas de inclusão e, em seguida, verificando se todas essas transações estão no bloco. Se essa verificação passar, eles votam no bloco. Também pode ser o caso de que nem todas as transações das listas de inclusão estejam no bloco, mas o bloco esteja cheio. Nesse caso, os atestadores também votam no bloco. Portanto, a menos que o bloco não contenha as transações e não esteja cheio, os atestadores votam no bloco.

Para recapitular o mecanismo completo: em cada slot, 16 membros do comitê são selecionados como membros do comitê da lista de inclusão. Eles observam a mempool e constroem objetos de lista de inclusão que distribuem no tópico global antes de um prazo, neste caso, o segundo 9. O construtor observa essas listas de inclusão e inclui todas as transações que viu em seu bloco. Os atestadores então verificam se todas as transações que viram antes do segundo 9 nas listas de inclusão estão de fato no bloco. Se essa verificação passar, eles votam no bloco, e passamos para o próximo slot, onde a mesma configuração acontece novamente.

#### IL Boost e uncrowdability (11:07) {#il-boost-and-uncrowdability-1107}

**Julian Ma:** Uma das grandes preocupações sobre as listas de inclusão, expressa para a EIP anterior do Mike e durante o desenvolvimento subsequente, é o "IL Boost", ou uncrowdability. Isso se refere ao fato de que os proponentes de listas de inclusão podem querer vender seus direitos de construir uma lista de inclusão. É uma preocupação muito lógica, porque vemos isso acontecendo com a construção de blocos: vender esse direito leva a um mercado centralizado de construtores sofisticados.

Argumentamos que o FOCIL é robusto contra esses mercados semelhantes ao MEV-Boost, ou IL Boost como são coloquialmente conhecidos, devido às seguintes propriedades. O FOCIL não garante nenhuma ordenação de transações. Independentemente de onde você colocar sua transação na sua lista de inclusão, ela será ordenada da maneira que o construtor de blocos achar melhor. Se você, por exemplo, incluísse uma transação de arbitragem na lista, é altamente improvável que o construtor coloque sua transação de arbitragem no topo do bloco para que ela realmente execute a arbitragem. Em vez disso, o próprio construtor provavelmente fará isso.

Além disso, o fluxo de ordens privado não é possível. Essas listas de inclusão são distribuídas no tópico global, então suas transações são públicas antes que o construtor construa o bloco. Não é possível que o fluxo de ordens privado entre no bloco por meio de uma lista de inclusão.

Em terceiro lugar, existem vários proponentes de listas de inclusão por slot. Mesmo que houvesse algo valioso para vender, todos os 16 membros do comitê da lista de inclusão têm a mesma possibilidade de construir essa lista de inclusão, então a concorrência entre esses proponentes de listas de inclusão reduziria o valor a zero.

E, finalmente, essas listas de inclusão são criadas 3 segundos antes do produtor de blocos agir. Há 3 segundos de informações extras, que geralmente são extremamente relevantes para tipos de transações de MEV, que chegam depois que a lista de inclusão é confirmada e antes do produtor de blocos agir, o que significa que há muito pouca vantagem informacional. Na verdade, há uma desvantagem informacional para aqueles que tentam usar listas de inclusão como um veículo para MEV.

Por esses motivos, acreditamos que nenhum proponente individual de lista de inclusão tem poder de inclusão, ordenação ou exclusão, o que é a definição fundamental de MEV. Portanto, as listas de inclusão não devem estar sujeitas a MEV.

#### Resumo da apresentação (13:09) {#summary-of-the-presentation-1309}

**Julian Ma:** Para resumir esta rápida apresentação: o FOCIL permite que múltiplos validadores contribuam para a construção de blocos, evitando o monopólio de inclusão de um único proponente e impulsionando a neutralidade crível do Ethereum. Acreditamos que é necessário implementar o FOCIL agora porque atualmente existem apenas dois construtores dominantes que poderiam começar a censurar a qualquer momento, e isso poderia ser por razões econômicas das quais eles podem se beneficiar. A construção de blocos pode se tornar mais crítica porque os based rollups vão querer usar as propriedades de sequenciamento do Ethereum. O FOCIL terá um lançamento muito mais tranquilo quando houver poucas partes censuradoras: primeiro, porque significa que é o padrão para os validadores construírem listas de inclusão e, segundo, porque significa que há menos instabilidade de mercado entre os construtores que estão censurando e os construtores que não estão. E, finalmente, o FOCIL poderia potencialmente ajudar com a escalabilidade, o que talvez seja um assunto que possamos explorar mais a fundo.

Obrigado pelo tempo para fazer esta pequena apresentação. Eu só queria mostrar o código QR, que leva à EIP, para as pessoas que estiverem interessadas.

**Pooja Ranjan:** Muito obrigada por esta rápida apresentação e pela visão geral da proposta.

#### Perguntas e Respostas: como a EIP-7805 difere da EIP-7547? (14:17) {#qa-how-does-eip-7805-differ-from-eip-7547-1417}

**Pooja Ranjan:** Eu gostaria de começar a seção de Perguntas e Respostas com a primeira pergunta, sobre a proposta anterior que também foi mencionada na sua apresentação: a proposta 7547, listas de inclusão, de Mike Neuder. Quero entender a diferença básica entre essa proposta e a FOCIL que temos com a EIP-7805. Você abordou parcialmente na sua apresentação o IL Boost e a não superlotação (uncrowdability). Você gostaria de explicar um pouco mais sobre isso?

**Julian Ma:** Talvez o Thomas seja a pessoa mais indicada para responder como a EIP-7805 difere da EIP-7547, mas posso falar um pouco sobre isso. Em primeiro lugar, a FOCIL é para o mesmo slot, enquanto a 7547 era para o próximo slot. A propriedade de mesmo slot torna algumas coisas mais fáceis, porque significa que a lista de inclusão não precisa ser armazenada onchain.

Com relação à propriedade de não superlotação, esta é muito interessante e sutil. Na 7547, que foi uma ótima proposta na qual a nossa se baseia, a lista de inclusão é anexada incondicionalmente no final do bloco e feita por uma pessoa. Isso tem algumas propriedades diferentes das nossas. Em primeiro lugar, as transações são ordenadas. Pode ser que no futuro seja muito valioso ter arbitragem no final do bloco e, de fato, algumas das pesquisas do Thomas destacaram que este poderia ser um lugar valioso. Ter os direitos de construir a lista de inclusão significa que você é a última pessoa a agir no bloco e, para alguns casos, isso pode ser valioso. Em segundo lugar, é feita por uma única pessoa, então não há esse efeito de competição entre os membros do comitê da lista de inclusão. Um comitê de uma pessoa tem o direito total de incluir transações no final do bloco, o que também pode torná-lo mais valioso. Em terceiro lugar, há essa propriedade incondicional, o que significa que, independentemente do que o produtor do bloco faça, sua transação será incluída onchain de qualquer maneira. Portanto, ela tem algumas garantias extras, além do mínimo necessário para inclusão, que podem torná-la valiosa até certo ponto.

**Thomas Thiery:** Uma grande diferença também é o número de proponentes de listas de inclusão que temos. Na proposta anterior, havia um mecanismo pelo qual o proponente do slot n faz a lista de inclusão que o proponente do slot n+1 precisa aplicar. As duas grandes coisas aqui: primeiro, há um atraso de um slot, então as transações na lista de inclusão só precisam ser incluídas no próximo slot pelo próximo proponente. E há apenas um proponente que realmente faz a lista de inclusão. Com a FOCIL, temos 16. Isso faz uma enorme diferença, porque agora só precisamos que um dos 16 membros do comitê de IL seja honesto para que todo o mecanismo funcione como planejado. Isso multiplica suas chances de realmente ter um bom mecanismo resistente à censura, enquanto antes você dependia de uma única parte.

E então alguns detalhes mais técnicos: havia algumas incompatibilidades com a abstração de conta, e era difícil lidar com a equivocação de IL, ou seja, alguém que envia duas listas de inclusão diferentes. A equivocação de bloco é algo conhecido e é penalizada pelo protocolo, mas como tudo ia onchain na proposta anterior, você também tinha que lidar com casos extremos estranhos, e não era muito fácil acomodá-los. Com a FOCIL, as listas de inclusão não vão onchain. Elas são apenas transmitidas pela rede da camada de consenso P2P. É um pouco técnico, mas faz uma grande diferença ao lidar com esses casos extremos causados pela abstração de conta, ou ataques onde você divide a rede em duas visões com a equivocação de IL.

**Pooja Ranjan:** Muito obrigada. Para as pessoas que gostariam de aprender mais sobre a proposta 7547, temos um episódio gravado com Mike Neuder, o episódio 130 do PEEPanEIP, que fornece uma visão geral de alto nível. Eu sempre adoro ver propostas concorrentes, porque sei que isso é para a melhoria do ecossistema e da cadeia. Vejo no chat que há algumas perguntas. Talvez eu gostaria de convidar a Kataya para compartilhar sua pergunta.

#### O propositor tem que incluir todas as 16 listas? (19:05) {#does-the-proposer-have-to-include-all-16-lists-1905}

**Kataya:** Olá, obrigada. Minha pergunta era: o propositor de bloco recebe 16 listas de inclusão, cada uma de um membro do comitê, e ele tem que incluir todas as transações dessas listas?

**Thomas Thiery:** Sim, está correto. Você faz a união de todas as transações de todas as listas, no nosso caso, 16 listas. Pode haver sobreposição, obviamente, então você faz a união e desduplica, mas sim, todas as transações em todas as listas precisam ser incluídas no bloco para que ele seja considerado válido pelos atestadores.

**Pooja Ranjan:** A próxima pergunta no chat é do Justin. Justin, você gostaria de ler sua pergunta para os convidados?

#### Transações de mempool privada em listas de inclusão (19:55) {#private-mempool-transactions-in-inclusion-lists-1955}

**Justin:** Eu tenho feito tantas perguntas. Eu queria perguntar o que impede de colocar uma transação de uma mempool privada em uma lista de inclusão, e acho que isso foi bem respondido. Parece que não há problema algum, considerando que o construtor essencialmente vai ordená-las como achar melhor de qualquer maneira, e sua transação se torna pública quando vai para a IL também. Então acho que isso faz sentido. Obrigado.

**Thomas Thiery:** Essa foi uma consideração, como o Julian mencionou. Nós realmente não queríamos que o FOCIL e as listas de inclusão fossem usados para incluir transações de MEV, fluxo de ordens privadas ou pré-confirmações, porque, em última análise, o que queremos é resistência à censura, e é muito fácil para um mecanismo se tornar um veículo para incluir transações valiosas se você não tomar cuidado. O fato de que, quando você inclui sua transação em uma lista de inclusão, ela se torna pública automaticamente, todos podem vê-la, não tem garantias de ordenação e pode ser incluída pelo construtor em qualquer lugar no bloco, faz com que não seja muito adequada para transações valiosas.

Então, ou você tem uma transação pública e pode simplesmente enviá-la para a mempool pública para que seja incluída em uma lista de inclusão, ou você tem transações privadas valiosas e, nesse caso, não passaria pelo FOCIL, porque existem maneiras melhores de fazer isso. Você entraria em contato com o construtor diretamente e a enviaria por canais privados.

**Pooja Ranjan:** Obrigada por compartilhar. Vejo que a próxima pergunta é do Ladislaus.

#### FOCIL e escalabilidade (21:41) {#focil-and-scaling-2141}

**Ladislaus:** Olá, pessoal. Isso se refere ao ponto que vocês levantaram em termos de FOCIL e escalabilidade. Tenho visto algumas discussões ultimamente, como todos nós, sobre a escalabilidade do Ethereum e, como vocês mencionaram com razão, há esse gargalo de poucos construtores por aí. Pessoalmente, gosto de pensar no FOCIL como uma forma de reempoderar a construção local, e vejo isso como uma necessidade a ser consagrada no protocolo antes de aumentarmos os requisitos de largura de banda, ou os requisitos de nó em geral. Talvez vocês possam elaborar sobre como pensam a respeito disso, e também sobre outras possíveis formas de escalar, talvez sem o FOCIL, como vocês mencionaram.

**Julian Ma:** Obrigado pela pergunta. Em primeiro lugar, o argumento para escalar via FOCIL. Atualmente, 90% dos validadores terceirizam a construção de blocos via MEV-Boost, e essas entidades sofisticadas obviamente têm mais largura de banda do que os requisitos mínimos de hardware. Elas poderiam, por exemplo, incluir mais blobs em seus blocos sem causar nenhum problema. Uma coisa interessante, no entanto, é que o Ethereum depende da construção local de blocos para ter neutralidade crível, ou resistência à censura, porque essas duas entidades sofisticadas não são aquelas sobre as quais a resistência à censura do Ethereum pode ser construída.

Portanto, o protocolo do Ethereum ainda deve ser projetado de forma que seja possível fazer a construção local de blocos e, de fato, nós o projetamos para que não seja não lucrativo em comparação com o MEV-Boost. Isso está no design do Ethereum, mas na prática, é claro, o MEV-Boost é muito mais lucrativo: primeiro porque esses construtores de blocos sofisticados têm algoritmos mais complexos e, segundo, porque eles têm muito mais fluxo de ordens privado. Houve uma pesquisa recente da Data Always mostrando que os blocos do MEV-Boost contêm muito mais transações. Só isso já leva a mais lucro.

Ainda assim, o protocolo é projetado para que não haja forças dentro das regras do protocolo que tornem um validador menos lucrativo do que outro. Se quisermos manter essa regra, então o FOCIL é necessário, porque assim os construtores de blocos locais podem contribuir para as listas de inclusão e, dessa forma, manter a resistência à censura. Poderíamos, no entanto, também nos livrar dessa regra e basicamente dizer que os construtores de blocos locais podem incluir um certo número de blobs, mas construtores de blocos mais sofisticados poderiam incluir mais blobs, a ponto de os construtores de blocos locais não conseguirem lidar com essa carga ao criar um bloco por conta própria. Portanto, se quisermos manter a regra de que o máximo é definido pelos requisitos de hardware mais baixos, então precisamos do FOCIL. Se estivermos de acordo em flexibilizar essa regra, então potencialmente não precisamos do FOCIL para escalabilidade.

**Thomas Thiery:** É muito parecido, eu acho, mas agora no Ethereum estamos em uma posição estranha, porque dependemos de construtores sofisticados para construir a maioria dos blocos, mas eles não são ótimos para a resistência à censura, porque são apenas duas partes. Se eles decidirem censurar transações ou alguns endereços por algum motivo arbitrário, então basicamente não temos resistência à censura ou acesso sem permissão, o que também é muito importante. Isso significa que eles podem censurar ou impedir que quaisquer atores que eles queiram participem onchain, o que é muito ruim.

E as propriedades de resistência à censura que mantemos não são incríveis, certo? Como a maioria dos blocos é construída por esses dois construtores, você basicamente precisa esperar até que um construtor de blocos local seja eleito e proponha um bloco que inclua todas essas transações que normalmente são censuradas, o que não parece muito bom. Isso significa que esses usuários precisarão esperar 10, 12, não sei, muitos blocos até que suas transações sejam realmente incluídas onchain.

Portanto, nós realmente queremos manter os stakers domésticos e os construtores de blocos locais, porque são eles que preservam a resistência à censura. Ao mesmo tempo, hoje, mesmo usá-los não é o ideal, porque você ainda tem que esperar muito tempo para ter sua transação incluída se ela for censurada pelos dois construtores. Com o FOCIL, você muda para um mundo onde os participantes que garantem a resistência à censura, os membros do comitê da lista de inclusão no nosso caso, podem ser diferentes das pessoas que constroem os blocos. Acho que isso abre um cenário muito interessante, porque agora não precisamos depender exatamente do mesmo participante para construir blocos valiosos e contribuir para a resistência à censura. O FOCIL também pode ser considerado um primeiro passo nessa direção importante, porque você tem duas funções muito diferentes, e hoje pedimos exatamente aos mesmos nós validadores que façam ambas, o que gera muita tensão.

**Pooja Ranjan:** Muito obrigada. Acho que a próxima pergunta é do Luis.

#### Critérios para a seleção de transações (26:46) {#criteria-for-selecting-transactions-2646}

**Luis Pinto:** Entrei alguns minutos após o início, mas me parece que isso está descentralizando a seleção de transações na rede como um todo. Isso é muito bom na minha opinião; combate o MEV e a censura. E eu definitivamente gosto da parte de ter os atestadores fazendo esse trabalho, porque no futuro eles terão requisitos de hardware menores do que os construtores, ainda mais com a ausência de estado e clientes sem estado. Como você poderá executar isso com um hardware muito básico, isso torna as coisas muito descentralizadas. Acho que o principal desafio aqui é definir os critérios para a seleção de transações dessas listas de inclusão, se você vai usar taxas de prioridade ou o número de blobs; há tantas variáveis. Vocês chegaram a um conjunto de critérios que estão pensando em impor?

**Thomas Thiery:** Essa é uma ótima pergunta. Ela se divide em duas partes. A primeira é muito importante, sobre tentar separar os atestadores das pessoas que estão construindo ou propondo o bloco. Essa é toda a linha de pesquisa da separação atestador-propositor (APS); o Julian trabalhou bastante nisso. Nós chamamos isso de desmembramento de funções, para que elas correspondam mais de perto aos deveres do protocolo. Escrevi uma postagem, que acabei de compartilhar, sobre uma possível separação, que está muito em aberto, e eu adoraria receber mais opiniões das pessoas. Nesta postagem, faço uma separação entre atestadores, inclusores, que agora são os membros do comitê de IL, e propositores de execução, ou construtores. Acho que esses são deveres fundamentalmente diferentes e talvez devêssemos ter funções diferentes para eles.

Então, quanto à regra de inclusão, é uma pergunta muito boa. Nós pensamos bastante sobre isso e acho que chegamos a duas coisas. A primeira é que queremos uma diversidade de regras. Não queremos uma única regra, por exemplo, ordenar por taxas de prioridade decrescentes para todos os clientes, porque então você pode realmente fazer manipulações e tentar reordenar a mempool para que apenas as suas transações sejam incluídas nas ILs. Mas se você tiver uma diversidade de regras, incluindo uma regra que também leve em consideração o tempo que uma transação está pendente na mempool, e diferentes clientes implementarem regras diferentes, todas com a mesma essência, principalmente em torno de taxas de prioridade e tempo pendente na mempool, então fica muito, muito difícil de manipular, e isso torna o protocolo ainda mais robusto. Também é uma boa maneira, eu acho, de aproveitar a diversidade de clientes que temos no Ethereum hoje e de permitir que os clientes façam escolhas baseadas em suas próprias opiniões. Temos regras em mente, mas achamos que os clientes também podem escolher as melhores regras para eles. Contanto que nem todos tenham exatamente a mesma regra ordenada por taxas de prioridade, ficaremos bem.

**Luis Pinto:** Certo, então vocês também estão distribuindo esses critérios, deixando que aqueles que constroem as listas de inclusão tenham seus próprios critérios. Ou isso fará parte do protocolo?

**Julian Ma:** A regra de inclusão não fará parte do protocolo. Em primeiro lugar, é muito difícil de impor e, em segundo lugar, na verdade é melhor não impor nada. Se permitirmos que os membros do comitê decidam por si mesmos, ou deixarmos que as equipes de clientes ajam em nome deles, sobre como incluir transações, então criamos alguma robustez na rede. Pessoas com preferências diferentes farão a inclusão de maneiras diferentes, o que significa que é mais difícil atacar o sistema.

**Luis Pinto:** Certo, obrigado.

#### Compatibilidade com EIP-7702, ePBS e PeerDAS (30:43) {#compatibility-with-eip-7702-epbs-and-peerdas-3043}

**Pooja Ranjan:** Muito obrigada. Pelo que entendi, esta proposta já foi sugerida para a atualização após a Pectra, a Fusaka. E dado que a Fusaka pode ou não incluir algumas outras EIPs que estão em andamento, eu me pergunto qual é o status de compatibilidade do FOCIL em relação a propostas como a 7702, que é para abstração de conta, ePBS e PeerDAS.

**Thomas Thiery:** Ótima pergunta. Tivemos um pouco de vantagem aqui por causa do histórico das listas de inclusão. Como mencionamos, a 7547 foi considerada para inclusão e depois rejeitada devido a incompatibilidades. Portanto, fomos muito cuidadosos em resolvê-las antes de fazermos uma nova proposta, porque sabíamos que as pessoas iriam analisá-la com as mesmas perguntas, o que faz sentido.

Estamos muito confiantes, porque também conversamos com as equipes de abstração de conta e conversamos muito com o Potuz e o Terence. O Terence tem nos ajudado ativamente e tem trabalhado tanto no ePBS quanto no FOCIL, então foi muito fácil para nós verificar se isso também é compatível. Eu realmente não acho que existam incompatibilidades com nenhuma das outras EIPs. Com o ePBS, você precisa ter cuidado com o tempo das coisas, porque você separa a carga de execução do bloco de consenso, então todo o tempo do slot muda, e agora você também adiciona a criação de ILs que precisam ser feitas antes que a carga seja proposta. Portanto, você precisa ter cuidado com os tempos, mas se me lembro bem, da última vez que conversamos sobre isso com o Potuz e o Terence, não havia nenhuma incompatibilidade crucial. Acho que estamos bem no que diz respeito à compatibilidade.

**Pooja Ranjan:** É bom saber disso. Notei que o Jihoon também compartilhou um HackMD, que adicionaremos aos recursos, para as pessoas que quiserem aprender mais sobre a compatibilidade com o ePBS especificamente. E sim, eu me lembro da última conversa com o Mike, acho que a proposta não foi incluída por causa da incompatibilidade com a abstração de conta. Então, é bom saber que isso já foi resolvido.

#### FOCIL e MEV de múltiplos slots (33:04) {#focil-and-multi-slot-mev-3304}

**Pooja Ranjan:** Eu estava analisando os documentos e os detalhes adicionados ao site do FOCIL, meetfocil.eth.limo, e aprendi sobre um termo chamado MEV de múltiplos slots. Julian também mencionou que o MEV-Boost em geral é lucrativo, apesar do desejo e dos esforços feitos pelos desenvolvedores para mantê-lo sob controle. Eu me pergunto como o FOCIL vai evitar isso.

**Julian Ma:** Obrigado pela sua pergunta. Primeiro, deixe-me dizer algo sobre o FOCIL e o MEV, e então podemos passar para o MEV de múltiplos slots. O FOCIL não evita necessariamente o MEV, e isso ocorre precisamente porque queremos separar as partes do MEV e as partes de inclusão. Em nossa visão, é importante fazer isso, porque, caso contrário, você teria o surgimento desses tipos de mercados de IL Boost. Por esse raciocínio, se a lista de inclusão pudesse restringir a quantidade de MEV que pode ser extraída, então construir a lista de inclusão se tornaria muito valioso, e as pessoas criariam mercados em torno disso. Nosso design existe realmente para fornecer a garantia mínima de inclusão, o que significa que não é tão valioso ser um membro do comitê da lista de inclusão, e há 16 deles, o que significa que não há um mercado de produtores sofisticados.

Então, passando para o MEV de múltiplos slots: o FOCIL alivia alguns dos problemas, mas não resolve tudo. Isso ocorre novamente devido a essa incompatibilidade entre fornecer resistência à censura e uma solução para o MEV. O que o FOCIL faz é permitir que qualquer transação seja incluída, desde que pague as taxas, o que resolve o MEV de múltiplos slots até certo ponto. O MEV de múltiplos slots aqui é onde uma parte é capaz de extrair mais MEV se controlar dois blocos seguidos.

O FOCIL alivia alguns dos problemas porque permite que você insira sua transação. Por exemplo, se você precisar inserir uma transação liquidando uma dívida inadimplente em alguma posição em algum lugar, você poderá fazê-lo mesmo se o proponente tentar censurá-lo e extrair MEV de você no próximo bloco.

O motivo pelo qual ele não resolve todos os problemas é devido à seleção adversa, uma propriedade econômica onde uma pessoa tem mais informações do que a outra. Um exemplo de MEV de múltiplos slots seria extrair arbitragem ao longo de dois blocos, onde o construtor de blocos não extrai arbitragem no primeiro bloco e o faz no segundo bloco. Existem alguns resultados teóricos mostrando que isso pode ser mais lucrativo para o construtor de blocos do que extrair arbitragem em ambos os slots. Você poderia pensar que o FOCIL ajuda aqui, porque os arbitradores poderiam, em princípio, incluir sua transação na lista de inclusão e, assim, forçar algum tipo de arbitragem a acontecer. Embora esse seja o caso, não é compatível com os incentivos para os arbitradores enviarem sua transação ao FOCIL, porque ainda há 3 segundos entre o envio da transação e a capacidade de ação do construtor de blocos. Se você está tentando fazer arbitragem e o preço está se movendo constantemente em algum mercado externo, você não quer se comprometer com 3 segundos de antecedência, porque você tem muito menos informações do que o construtor de blocos, que age depois de você. A seleção adversa entra em jogo porque o construtor tem mais informações: ele deixará você ganhar se for ruim para você, se o preço no mercado externo tiver se movido contra você naqueles três segundos extras, e ele deixará a si mesmo ganhar se for melhor para ele ganhar.

Portanto, o FOCIL resolve as partes do MEV de múltiplos slots onde as transações não sofrem seleção adversa. Para transações onde há seleção adversa, é um pouco mais complicado, mas alivia o problema até certo ponto. Em princípio, torna as coisas melhores do que são agora, mas ainda há um pouco de trabalho a fazer.

**Pooja Ranjan:** Muito bem, muito obrigada por compartilhar isso. Entendo que há muita pesquisa em andamento para lidar com a questão do MEV, então é bom saber que, pelo menos em princípio, isso vai ajudar mais do que o cenário atual.

#### Trade-offs e desafios (36:44) {#trade-offs-and-challenges-3644}

**Pooja Ranjan:** Tenho uma pergunta relacionada ao que o Thomas mencionou antes sobre a equivocação de IL. Notei que na seção de considerações de segurança da proposta, há vários pontos mencionados, como a vivacidade do consenso, equivocação de IL e construção do payload. O que você consideraria o maior trade-off, ou algo que possa exigir mais pesquisa e que possa impedir que essa proposta entre na próxima atualização do jeito que está?

**Thomas Thiery:** Para ser sincero, acho que a seção sobre considerações de segurança foi mais uma forma de mostrar que pensamos e abordamos as preocupações em relação à segurança. É mais isso do que ter questões em aberto sobre coisas de segurança que não conhecemos. Não acho que existam grandes bloqueios ou problemas em termos de considerações de segurança.

Quanto aos trade-offs: se você tiver uma visão muito restrita, é verdade que o FOCIL adiciona algumas tarefas aos validadores, tanto quando eles têm que propor uma lista de inclusão, quanto para os atestadores, quando eles têm que verificar mais uma condição para garantir que o bloco seja válido de acordo com as listas de inclusão. Ele também adiciona uma pequena tarefa para o proponente, porque agora ele precisa garantir que seu payload realmente inclua as transações nas ILs. Para mim, esse é o único trade-off, e essas tarefas não são pesadas ou sofisticadas. Um membro do comitê de IL apenas monitora a mempool pública e inclui transações em uma lista que eles enviam. Isso não exige nenhum tipo de habilidade ou sofisticação, o que eu acho legal. Por outro lado, como dissemos, isso pode desbloquear algumas grandes melhorias de escalabilidade e uma melhor separação entre os participantes e as funções dentro do protocolo.

Posso ser tendencioso, mas não vejo grandes trade-offs. Eu realmente acho que isso meio que vira tudo de cabeça para baixo quando se trata de resistência à censura. Agora você precisa basicamente de apenas 15% da rede sendo honesta para que todas as transações, incluindo aquelas que podem ser censuradas pelos construtores, sejam incluídas no próximo bloco, o que é uma melhoria muito grande. Sinceramente, não acho que você abra mão de muitas coisas aí.

**Pooja Ranjan:** É bom saber disso. Na maioria das propostas, descobrimos que a seção de considerações de segurança não tem nenhuma ou tem muito pouca informação, então é bom saber que a pesquisa foi feita nessa parte e estamos cientes das possíveis considerações de segurança. Fico feliz em saber que não é um bloqueio ou um desafio potencial para a implementação e adoção no futuro.

#### Mecanismos de taxa de transação para listas de inclusão (39:50) {#transaction-fee-mechanisms-for-inclusion-lists-3950}

**Pooja Ranjan:** Tenho uma dúvida sobre algumas questões em aberto que encontrei no próprio site, sobre o mecanismo de taxa de transação. Gostaria de saber se há alguma novidade, ou se vocês gostariam de compartilhar mais sobre a melhor maneira de cobrar taxas e distribuir essas taxas para inclusão na lista de inclusão.

**Thomas Thiery:** Temos um subsídio em andamento que está analisando especificamente isso e os mecanismos de incentivo para recompensar os membros do comitê de IL (lista de inclusão). Não é fácil. É complicado e, não importa como você aborde, essas também são mudanças muito grandes. Alterar as taxas no Ethereum, seja alterando uma taxa, adicionando uma ou adicionando uma nova emissão, todas essas são grandes mudanças que precisam de muita consideração e cuidado. Mas isso está sendo explorado, e ideias sobre a distribuição de taxas entre, por exemplo, membros do comitê que incluem uma transação parecem ser boas ideias. Isso tem mais ou menos as propriedades que queremos, porque queremos recompensar as pessoas por incluírem transações que outros podem não querer incluir. Portanto, estamos pensando muito profundamente sobre isso e temos um subsídio em andamento.

Há também a questão de se algum dia vamos querer dar taxas aos membros do comitê de IL, porque é notavelmente muito difícil recompensar participantes menores que estão distribuídos pelo mundo. Você não quer ataques Sybil e não quer que grandes participantes com muito stake dominem o conjunto do comitê de IL. Como você evita isso? Isso é muito difícil. Portanto, você tem muitas considerações de design para levar em conta.

Uma das visões que tive ultimamente é: e se adicionarmos alguns recursos interessantes ao FOCIL, como privacidade, para que você não possa realmente saber quem propôs uma determinada lista de transações? Você sabe que foi alguém realmente selecionado como membro do comitê de IL, mas não sabe exatamente quem propôs qual lista, então não pode vincular os membros do comitê de IL ao conjunto de transações em suas ILs. Se pudermos ter isso e deixar que a função do comitê de IL seja uma espécie de adesão voluntária (opt-in), então provavelmente teríamos participantes honestos no protocolo, contando com um comportamento altruísta, e talvez não precisássemos configurar um mecanismo de taxas. Essa é uma opinião muito recente e forte, e está sendo muito explorada no momento. Todas essas são discussões sobre o "futuro do FOCIL"; elas não devem ser incluídas na EIP atual.

**Julian Ma:** Só para complementar, essa última parte também é muito importante: a EIP-7805 não inclui nenhum mecanismo de taxa de transação, para torná-la mais simples de implementar. É basicamente a menor maneira possível de fornecermos as propriedades de resistência à censura, mas é muito extensível. Estamos analisando isso. O Thomas fez um trabalho considerável analisando taxas de transação separadas para inclusores e proponentes. Então, como o Thomas mencionou, temos um subsídio em andamento com um pesquisador incrível do Nethermind que está estudando a criação de um mecanismo de taxa de transação para o FOCIL, e isso é muito promissor. E, por fim, houve um trabalho em um mecanismo de taxa de transação para uma variante do FOCIL chamada AUCIL, um design de lista de inclusão baseado em leilão proposto por Sarisht Wadhwa, Fan Zhang e Kartik Nayak, juntamente com vários dos autores do FOCIL, que analisa maneiras de incentivar os membros do comitê da lista de inclusão.

Em relação ao ponto que o Luis levantou antes, o incentivo tem muito a ver com a forma como as listas de inclusão são criadas. Isso significa que o protocolo quer dar uma certa visão de como os membros do comitê da lista de inclusão devem se comportar. Geralmente, o que isso significa é que ele quer que certos participantes façam coisas diferentes. Por exemplo, ele pode ordenar os membros do comitê e atribuir-lhes certas transações por meio de um equilíbrio correlacionado, a fim de ainda ter algum comportamento diferente entre os membros do comitê. Portanto, não faz parte da proposta atual, mas definitivamente estamos analisando isso, e se encaixa na linha de extensibilidade do FOCIL.

**Pooja Ranjan:** Ah, isso é interessante. Então, devemos aguardar algumas propostas suplementares no futuro para aprimorar os recursos atuais do FOCIL.

#### Tamanho da lista de inclusão (44:16) {#inclusion-list-size-4416}

**Pooja Ranjan:** Eu tenho outra pergunta. Não tenho certeza se deveria fazer parte da proposta atual, mas estou curiosa para entender se há alguma atualização sobre o tamanho da IL. As listas de inclusão provavelmente devem ter um tamanho limitado para evitar o uso excessivo de largura de banda. Temos mais pesquisas ou atualizações sobre como o tamanho ideal da lista de inclusão pode ser determinado?

**Thomas Thiery:** Temos um tamanho fixo agora na especificação, e já está lá há algum tempo: 8 kilobytes. Colocamos em kilobytes porque o que o FOCIL e as ILs realmente consomem é largura de banda, e é basicamente isso. Se você pegar o tamanho mediano da transação, chegamos a cerca de 40 transações por IL, e se todas as transações forem únicas, são cerca de 640 transações que poderiam ser combinadas entre todos os 16 membros do comitê.

Não sei se há muita pesquisa a ser feita sobre o tamanho ideal exato. O que escolhemos: 16 vezes 8 kilobytes é basicamente o tamanho de um blob, então não é uma quantidade enorme de largura de banda combinada. E como a combinação de transações nas ILs é maior que um bloco, não acho que teremos problemas com isso.

Para o futuro, você poderia aumentar o tamanho da IL, mas também poderia considerar aumentar o número de membros do comitê da IL. Isso permite que você tenha ainda mais chances de conseguir um membro honesto no comitê da IL se a maior parte da rede decidir começar a censurar. Então isso também é algo que poderíamos fazer. Por enquanto, parece que 16 seria perfeitamente adequado e suficiente, mas você definitivamente pode ajustar esses parâmetros no futuro se a censura sair do controle, ou se precisarmos tomar mais medidas.

#### Métricas para acompanhar a adoção (46:39) {#metrics-to-track-adoption-4639}

**Pooja Ranjan:** Só para dar continuidade aqui: vocês têm alguma métrica em mente que possamos acompanhar para entender a adoção ou o sucesso desta proposta?

**Julian Ma:** Essa é uma ótima pergunta. Deixe-me responder rapidamente e depois passar a bola para o Thomas. Algumas métricas fáceis são apenas quantas listas de inclusão propostas não estão vazias. E você poderia pensar em painéis (dashboards), como a série ".pics" do Toni Wahrstätter, onde talvez haja mais detalhes, atribuindo alguma medida de qualidade a essas listas de inclusão. Em princípio, no entanto, apenas uma pessoa por slot precisa fazer uma lista de inclusão adequada para fornecer resistência à censura.

Acho que é um ponto tão importante que é fundamental implementar o FOCIL em breve, porque agora estamos neste regime mágico onde os construtores de blocos não estão censurando muito e os validadores não estão censurando muito. Eu diria que isso é muito frágil. Até agora, os construtores de blocos vêm censurando há muito tempo, e se introduzirmos o FOCIL agora, temos a possibilidade de torná-lo um padrão para que todos esses validadores o adotem e criem listas de inclusão que sejam significativas. Como os construtores de blocos não estão censurando, não há instabilidade de mercado criada aqui. Se esperarmos até que haja censura entre os construtores, será muito mais difícil introduzir o FOCIL, e eu imagino que todas as métricas que seriam usadas para medir a adoção seriam muito piores.

**Thomas Thiery:** Uma métrica fundamental para se observar também é literalmente o atraso de inclusão para transações da mempool pública. Você pega todas as transações que estão pendentes na mempool pública e vê o quão rápido elas são incluídas. Se o FOCIL funcionar, todas elas serão incluídas no próximo bloco. Se não forem, isso significa que uma grande proporção de validadores está censurando. Então, a outra métrica que podemos observar é quem está censurando e qual proporção da rede está censurando. Teremos painéis e métricas muito transparentes para acompanhar isso, porque é basicamente o que o FOCIL deve fazer. Se as transações públicas não forem incluídas no próximo bloco, isso significa que uma parte muito grande da rede está, de fato, censurando essas transações.

**Pooja Ranjan:** Muito interessante. Então, talvez seja algo para os pesquisadores: uma possível lista de desejos para atualizações, que painéis e rastreadores de métricas devem ser compartilhados pelos desenvolvedores para uma proposta sempre que ela for incluída em uma atualização da rede.

#### Status da implementação dos clientes (49:11) {#client-implementation-status-4911}

**Pooja Ranjan:** Como o Julian mencionou, esta proposta pode precisar ser implementada o mais rápido possível. Estou curiosa para entender onde estamos na implementação dos clientes, porque me lembro que na última chamada da rede de teste o Paritosh mencionou adicionar algum suporte com devnets. Então, em que pé estamos com isso?

**Thomas Thiery:** Estamos indo muito bem. Antes de mais nada, tem sido muito legal ver como as pessoas assumiram a parte de implementação do FOCIL, porque eu não sou desenvolvedor, sou pesquisador. Tenho trabalhado com desenvolvedores desde o início, mas não sou eu quem implementa as coisas nos clientes.

Os que lideraram isso, os três: temos o Terence do Prysm, e o Jihoon, que tem ajudado muito o Terence no Prysm, mas também trabalhou no Geth. Então agora temos uma devnet funcionando para o Prysm e o Geth, o que é ótimo, e há muitos testes acontecendo. Agora também estamos tentando fazer com que o FOCIL seja exibido e fique visível no explorador Dora. Depois temos o Jacob, que trabalhou no Lighthouse e no Reth, e sei que alguns esforços ainda estão em andamento por lá. O Lodestar tem estado muito ativo ultimamente; acho que eles estão muito perto de ter uma devnet funcionando. Tivemos algumas notícias do Nethermind hoje de que eles têm um protótipo, o que é muito legal. Sinto que estou esquecendo de alguns deles... O Nimbus também está se juntando, diz o Jihoon. Isso é muito bom.

No geral, estamos deixando cada vez mais devnets prontas e ativas, devnets locais, e cada vez mais combinações entre clientes da camada de execução e da camada de consenso. Houve um progresso muito bom, e é legal ver isso, porque todos sabemos que os desenvolvedores estão bastante ocupados agora com a chegada da Pectra, e já trabalhando no PeerDAS e em outras coisas. Tem sido muito bom ver como as pessoas no Ethereum em geral se importam bastante com a resistência à censura. A maioria das equipes que eu não havia contatado especificamente simplesmente se juntou ao esforço e agora está trabalhando em devnets e testes.

**Pooja Ranjan:** Obrigada por compartilhar isso. Estou ansiosa para acompanhar as atualizações nas devnets. Não tenho certeza de quantas iterações desta devnet haverá, mas estou animada para ver isso acontecer. Vejo que o Justin tem uma pergunta aqui. Justin, por favor, vá em frente.

#### FOCIL em Fusaka ou Glamsterdam? (52:07) {#focil-in-fusaka-or-glamsterdam-5207}

**Justin:** Ok, aperte os cintos para essa. Você fez um ponto muito bom de que o melhor momento para lidar com a censura é antes que a censura aconteça, certo? Então: FOCIL em Fusaka, ou pode esperar por Glamsterdam? E qual eu devo defender como desenvolvedor?

**Thomas Thiery:** Nós abrimos o PR, e ele foi mesclado, com o FOCIL sendo proposto para Fusaka. Achamos que ele deve entrar em Fusaka. Parte do raciocínio é que alguns clientes já começaram a trabalhar nisso e não encontraram muitos obstáculos. Não é como outras propostas que são muito mais difíceis de implementar e envolvem muito mais trabalho. E também não é muito controverso. Não acho que alguém esteja se opondo à resistência à censura, e meio que todos concordam que precisa ser incluído o mais rápido possível. Então eu iria de Fusaka.

Não sei se pode esperar ou não. Propostas e atualizações sempre podem esperar. Eu só quero evitar um mundo no qual não seja tão fácil implementar essas mudanças. As coisas podem mudar muito rapidamente. Como vimos, aconteceu o inverso: alguns meses atrás, um dos principais construtores simplesmente parou de censurar do nada. Nós perguntamos o porquê, e a resposta foi tipo, "é, nós apenas decidimos não fazer mais isso". Foi bom nesse caso, porque foi para o lado positivo, mas pode reverter completamente, e então poderíamos ter os dois construtores censurando algumas transações, e voltaríamos a uma situação muito ruim.

A outra coisa que quero mencionar, porque acho que é importante: se avançarmos em direção a algumas das coisas sobre as quais conversamos, como o APS, onde você pode realmente separar o atestador e o proponente com alguns dos designs nos quais trabalhamos, precisamos ter o FOCIL antes disso, e precisamos saber que o FOCIL está funcionando. Precisamos do FOCIL na Mainnet por seis meses, um ano, para realmente ter certeza de que está cumprindo seu propósito, que é manter e melhorar as propriedades de resistência à censura do Ethereum. Portanto, outra urgência, pelo menos para mim, é que se quisermos proteger os atestadores de jogos de tempo e algumas outras preocupações que queremos resolver com o APS, precisamos do FOCIL o mais rápido possível.

**Pooja Ranjan:** Às vezes é triste ver quando as propostas não são selecionadas para a próxima atualização ou a mais próxima, mas apenas um número limitado de propostas pode ser incluído em uma atualização. Eu realmente aprecio todo o trabalho duro que está sendo feito por trás da proposição da proposta, da preparação da proposta, bem como dos testes envolvidos nela. Então, muito obrigada por todo o trabalho que vocês estão fazendo pelo ecossistema Ethereum.

#### Perguntas rápidas (55:18) {#rapid-fire-5518}

**Pooja Ranjan:** Antes de encerrarmos, temos uma rodada de perguntas rápidas. A única condição é que a resposta deve ser uma palavra ou uma frase, e tentaremos fazer isso com um cronômetro, talvez 30 segundos cada. Se estiverem prontos, vamos em frente e começar com o Julian. Qual é o problema mais difícil na pesquisa de blockchain no momento?

**Julian Ma:** Não vou ser muito focado em memes, então vou responder seriamente. Eu diria que o problema mais difícil é o futuro do staking: o que o futuro do staking significa, quais papéis os provedores de serviços desempenham, como eles são compensados por isso e como eles se relacionam entre si.

**Pooja Ranjan:** Qual é um caso de uso de blockchain que não foi explorado o suficiente?

**Julian Ma:** Eu diria FOCIL.

**Pooja Ranjan:** Qual é o maior risco de segurança para o Ethereum hoje?

**Julian Ma:** Eu diria honestamente que a resistência à censura é muito crítica aqui, por causa de coisas como MEV de múltiplos blocos que podem representar enormes riscos de segurança, por exemplo, para as L2s.

**Pooja Ranjan:** O MEV deve ser minimizado, adotado ou algo no meio-termo?

**Julian Ma:** Eu concordo em grande parte com a visão da Flashbots aqui, de que ele deve ser democratizado, o que significa que deve ser maximizado onde for necessário e minimizado na camada de aplicação.

**Pooja Ranjan:** A descentralização sempre vale as concessões?

**Julian Ma:** Geralmente vale as concessões.

**Pooja Ranjan:** Qual é a maior inovação que o Ethereum trouxe para o mundo?

**Julian Ma:** Aqui eu gostaria de citar a palestra do Mike Neuder na Devcon sobre direitos de propriedade digital. Eu diria que são os direitos de propriedade digital resistentes à censura que estão realmente mudando o mundo.

**Pooja Ranjan:** Muito obrigada, muito bem respondido. Meu próximo conjunto de perguntas é para o Thomas. Então, se o Ethereum não existisse, em qual blockchain você estaria trabalhando?

**Thomas Thiery:** Acho que vou ser muito focado em memes, e o Julian puxou meu tapete um pouco porque achei que ele faria o mesmo. A blockchain seria FOCIL.

**Pooja Ranjan:** Qual é o caso de uso mais superestimado para blockchain?

**Thomas Thiery:** Nenhum caso de uso vale o hype sem FOCIL.

**Pooja Ranjan:** Qual é a única coisa que o Ethereum precisa melhorar o mais rápido possível?

**Thomas Thiery:** Resistência à censura, com FOCIL.

**Pooja Ranjan:** Uma palavra para descrever a descentralização?

**Thomas Thiery:** FOCIL.

**Pooja Ranjan:** Você acha que o Ethereum resolverá totalmente a escalabilidade?

**Thomas Thiery:** O Ethereum com FOCIL, sim.

**Pooja Ranjan:** Escalabilidade da camada 1 ou escalabilidade da camada 2, qual vence?

**Thomas Thiery:** Camadas infinitas, todas com FOCIL.

**Pooja Ranjan:** Muito bem, muito obrigada, Thomas. Obrigada por responder a todas essas perguntas. Como estamos encerrando, gostaria de dar esta oportunidade a vocês: se tiverem alguma mensagem para a comunidade sobre a proposta, ou para a comunidade do Ethereum em geral.

#### Mensagens para a comunidade (58:08) {#messages-to-the-community-5808}

**Thomas Thiery:** Na verdade, esse é um ponto muito importante, porque temos discussões ativas o tempo todo, e é tudo público no Discord. Houve um esforço no início para tornar tudo público, e as pessoas estão realmente fazendo isso, então estou muito feliz. Você pode acompanhar as discussões e o progresso no Discord público de P&D da Eth (Eth R&D), no canal inclusion-list. É basicamente lá que tudo está acontecendo agora. Além disso, você pode entrar em contato conosco no Twitter, Telegram, em qualquer lugar. Fique à vontade.

Quanto mais pessoas conversarmos e envolvermos, melhor será o design e melhor será a implementação. Então, se você puder ajudar de alguma forma, entre em contato e ficaremos felizes em ajudar em todos os aspectos, até mesmo na parte de pesquisa. Acho que é ainda mais adequado trabalharmos com pessoas que querem trabalhar no futuro do FOCIL. Mencionamos privacidade, mencionamos mecanismos de taxa de transação e também vamos focar muito no FOCIL para blobs. Todas essas coisas precisam de pessoas e esforço de pesquisa. Se você estiver interessado, entre em contato. Muito obrigado por nos receber, e obrigado por todo o trabalho que vocês fazem pelo Ethereum também.

**Julian Ma:** Só para complementar, espero que tenhamos deixado algumas pessoas entusiasmadas com o FOCIL. Se você está entusiasmado, por favor, nos avise. E se ainda tiverem algumas dúvidas, ficaremos felizes em respondê-las e, com sorte, poderemos convencê-los de que o FOCIL é realmente o caminho a seguir. Muito obrigado. Foi realmente um prazer estar aqui, e obrigado por sediar a sessão. E também obrigado a todos por participarem, é claro.

#### Encerramento (59:52) {#closing-words-5952}

**Pooja Ranjan:** Obrigada. Terminamos por aqui. Um enorme agradecimento ao Thomas e ao Julian por se juntarem a nós hoje e compartilharem suas percepções sobre a EIP-7805. Obrigada a todos os participantes; suas perguntas são animadoras e informativas. Obrigada por acompanharem. Se você gostou desta conversa, não se esqueça de curtir, se inscrever e compartilhar este episódio com seus colegas entusiastas do Ethereum. Traremos mais EIPs e progressos de pesquisa no PEEPanEIP. Até a próxima, continuem ronronando com o conhecimento e rondando pelo Ethereum com os Ethereum Cat Herders. Tenham um ótimo resto de dia.