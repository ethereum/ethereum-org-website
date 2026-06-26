---
title: "Átomos, instituições, blockchains"
description: "Josh Stark propõe uma nova estrutura para entender o que são blockchains, introduzindo o conceito de 'dureza' como a propriedade compartilhada que conecta átomos, instituições e blockchains como materiais de construção da civilização."
lang: pt-br
youtubeId: "zI07mqNdxzA"
uploadDate: 2024-04-06
duration: "0:29:13"
educationLevel: beginner
topic:
  - "how-ethereum-works"
  - "blockchain"
  - "ethereum"
format: presentation
author: ETHGlobal
breadcrumb: "Átomos, Instituições, Blockchains"
---

Uma palestra filosófica de **Josh Stark** da Fundação Ethereum na Pragma Denver 2024, propondo uma nova estrutura para entender as blockchains. A palestra introduz o conceito de "dureza" (hardness) como a propriedade compartilhada que conecta átomos, instituições e blockchains como os materiais de construção da civilização.

*Esta transcrição é uma cópia acessível da [transcrição original do vídeo](https://www.youtube.com/watch?v=zI07mqNdxzA) publicada pela ETHGlobal. Ela foi levemente editada para facilitar a leitura.*

#### Por que não conseguimos explicar as blockchains? (0:00) {#why-cant-we-explain-blockchains-000}

Olá a todos, obrigado por estarem aqui na Pragma em Denver. Meu nome é Josh. Eu trabalho na Fundação Ethereum — estou na EF há cerca de cinco anos. Gosto de brincar que meu trabalho é descobrir qual deve ser o meu trabalho, e isso muda a cada seis meses.

Fiz muitas coisas diferentes na minha carreira em cripto. Trabalhei em uma das primeiras carteiras de Bitcoin. Eu construí — bem, eu comprei — um caixa eletrônico de Bitcoin em Toronto e o operei por cerca de um ano em 2015. Em 2017, cofundei a ETHGlobal, bem como uma empresa chamada L4, trabalhando em soluções iniciais de escalabilidade de camada 2 (l2). E ao longo dos anos, escrevi vários posts de blog.

Apesar de tudo isso, eu ainda não conseguia explicar muito bem o que estávamos fazendo ou o porquê. Eu tinha a sensação de que isso era muito importante, que iria mudar o mundo. Não me entenda mal — eu consigo falar sobre aplicativos individuais. Podemos explicar o Bitcoin, NFTs, Uniswap, ENS. Todas essas coisas em seus pequenos silos não são tão difíceis de explicar. Mas quando tentamos falar sobre o panorama geral — o que significa haver uma tecnologia que possibilita todas essas coisas — começamos a tropeçar. Fazemos ginástica mental, jogamos palavras da moda nas pessoas, tentando explicar as coisas.

Precisamos realmente chegar ao cerne da questão, e não acho que estejamos tão perto. É um problema! Se podemos falar sobre esses aplicativos individuais, mas não conseguimos articular o que eles compartilham — há algo que estamos perdendo. Existe um nível de explicação que ainda não foi encontrado, e acho que é importante. Minha sensação é que, uma vez que o encontrarmos, parecerá óbvio.

Então, isso começou como uma pergunta muito específica que eu tinha: qual é a tecnologia de uso geral? Qual é essa capacidade fundamental? E se transformou em algo que acho muito mais interessante.

#### Claude Shannon e a ideia de informação (4:00) {#claude-shannon-and-the-idea-of-information-400}

Deixe-me contar uma história. Nas décadas de 1930 e 40, Claude Shannon estava cercado pelos primórdios de uma nova era. No Bell Labs, ele trabalhou em sistemas de controle de tiro e criptografia durante a guerra, e começou a pensar em uma abordagem mais geral para a informação. Ele não a chamou de informação no início — em 1939, ele escreveu a um colega que estava pensando na "transmissão de inteligência". A palavra informação tinha um significado diferente na época.

Ele publicou em 1948 "A Teoria Matemática da Comunicação" — um artigo fundamental que abriu caminho para a era da informação. O mais importante para nós é que ele introduziu pela primeira vez uma ideia abstrata de informação — uma definição não ligada à música, fala, literatura ou códigos. Este é o artigo que introduziu o bit — a unidade irredutível de informação que você poderia medir em qualquer contexto.

Antes desse momento, ninguém realmente tinha esse conceito de informação como uma coisa universal e geral. Isso pode parecer loucura agora — usamos a tecnologia da informação há milhares de anos. Ela está intrinsecamente ligada ao que significa ser humano, usar a fala e a linguagem. Mas não nomeamos a propriedade subjacente comum a todas essas coisas até muito recentemente.

O que quero que você tire disso: houve um tempo antes de termos a ideia de informação e um tempo depois. E se estivermos, de forma semelhante, perdendo algo tão fundamental? Essa é a minha hipótese.

#### Três pistas (7:00) {#three-clues-700}

Enquanto luto para explicar as blockchains, continuo me deparando com essas coisas estranhas que acho que são pistas para algo maior.

**Pista número um** — descrevemos as blockchains como sendo, ao mesmo tempo, sem necessidade de confiança (trustless) e confiáveis (trustworthy). Isso é estranho. No white paper de Satoshi, falamos sobre eliminar a necessidade de confiança. Mas no white paper do Ethereum, falamos sobre usar o Ethereum para tornar os aplicativos mais confiáveis. A The Economist chamou as blockchains de "máquina de confiança". Queremos dizer algo real quando dizemos que as blockchains são sem necessidade de confiança, e queremos dizer algo real quando dizemos que são confiáveis. Nossa linguagem ainda não acompanhou. Sempre vale a pena prestar atenção a essas aparentes contradições — às vezes, elas revelam uma lacuna em nossas abstrações.

**Pista número dois** — falamos muito sobre como as blockchains são diferentes das instituições centralizadas — Bitcoin versus bancos centrais, ENS versus DNS. Mas raramente falamos sobre o que elas têm em comum. Elas podem ser substitutas umas das outras. Se você já trocou dinheiro fiduciário por Bitcoin, você os substituiu um pelo outro. Eles devem ter algo em comum para que essa substituição ocorra com tanta regularidade.

Com os carros, falávamos de "carruagens sem cavalos", mas pelo menos podíamos nomear o que eram — veículos. Com os registros digitais, falávamos de meios "sem papel", mas conhecíamos a categoria — informação. Parece que inventamos uma tecnologia antes de inventarmos a categoria à qual ela pertence.

**Pista número três** — o artigo de Satoshi começa com estas palavras: "o comércio na internet passou a depender quase exclusivamente de instituições financeiras servindo como terceiros de confiança". Satoshi estava comparando o Bitcoin a instituições, não a outros softwares. Há algo aí.

#### Introduzindo a dureza (11:00) {#introducing-hardness-1100}

Aqui está a minha resposta para o que vai nessa caixa. Eu chamo isso de **dureza** (hardness). Aqui está a história em cinco passos simples, e depois nos aprofundaremos mais.

Primeiro — nossa civilização depende de infraestrutura social como dinheiro e leis e tantas outras coisas, e elas precisam ser confiáveis. Elas precisam se comportar como esperamos que se comportem, pelo menos na maior parte do tempo, para que sejam úteis para nós. Caso contrário, não confiaríamos nelas — elas não se tornariam um dinheiro.

Segundo — é muito difícil alcançar esse nível necessário de confiabilidade. Até agora, existem realmente apenas três maneiras pelas quais já fizemos isso: usando átomos, usando instituições e, agora, usando blockchains.

Terceiro — há uma propriedade não reconhecida comum a todos os três, que chamo de dureza. A dureza é a capacidade, o poder, de nos permitir tornar o futuro mais previsível nas maneiras muito específicas que exigimos para jogos de coordenação complexos.

Quarto — que essas três fontes de dureza têm, cada uma, propriedades diferentes que as tornam úteis em contextos diferentes.

E quinto — podemos usá-las juntas e substituí-las umas pelas outras.

A taxa de inflação do ouro é confiável devido às propriedades físicas do nosso planeta — é dura como um átomo (atom-hard). Um contrato é confiável porque as instituições virão e tomarão suas coisas se você não cumprir seus compromissos. Um contrato inteligente operará porque é garantido por um protocolo criptoeconômico com bilhões de dólares em jogo.

Você pode pensar em átomos, instituições e blockchains como materiais de construção — como madeira, concreto e aço. Eles são diferentes, mas fazem parte de uma categoria compartilhada. E usamos essas coisas não para construir edifícios, mas para construir uma civilização. Talvez com materiais melhores, possamos construir uma civilização maior, melhor e mais forte do que a que temos agora.

#### O que é dureza? (14:00) {#what-is-hardness-1400}

Deixe-me dar mais precisão ao que quero dizer com dureza. Esta não é apenas qualquer confiabilidade que qualquer coisa possa ter. A dureza é um tipo específico. A primeira coisa a notar é que é um tipo de confiabilidade que importa para a coordenação social. Não apenas, você sabe, que esta mesa é confiavelmente uma mesa — mas que você pode pagar seu aluguel, que um contrato será cumprido, que uma economia é forte. É para isso que serve a dureza.

E qual é exatamente o resultado? Infelizmente, estou introduzindo outra palavra nova aqui, que chamo de **molde** (cast). Um molde é qualquer estado futuro possível do mundo que é tornado certo ou seguro usando a dureza. Peço desculpas pelo jargão, mas a razão para ter uma palavra aqui é que não acho que tenhamos uma que seja generalizável em todas as fontes de dureza. Talvez seja como o bit — precisamos de um conceito sobre o qual possamos falar em muitos contextos diferentes e alternar entre as fontes sem estarmos presos a uma delas.

Um molde relacionado a um empréstimo seria: se Alice não pagar Bob, as instituições legais usarão ameaças e ações cada vez mais severas para forçá-la a fazê-lo. Esse molde é endurecido usando a dureza institucional. Um molde sobre o ouro pode ser que uma certa quantidade de ouro entrará no mercado a cada ano pelos próximos 20 anos — tornado confiável pelas propriedades físicas da nossa Terra. E um molde sobre o Ethereum pode ser uma reivindicação de que os ativos só podem ser transferidos se você possuir a chave privada correspondente a uma certa chave pública — endurecido pela dureza da blockchain.

Na prática, geralmente estamos interagindo com pacotes dessas coisas, todas entrelaçadas. Se você possui ouro e o guarda em um banco, muitas coisas importam para você: moldes sobre a oferta de ouro no futuro, moldes sobre a resistência do cofre do banco, moldes sobre a força do acordo legal entre você e seu banco, moldes sobre a confiabilidade do sistema legal do seu país que aplicaria essas regras se algo desse errado.

Em segundo lugar, a dureza pode ser discutida como uma medida de segurança. Ela é sempre mensurável na teoria, mesmo que seja difícil de fazer na prática. Quão duro é esse molde de que uma certa quantidade de ouro entrará no mercado a cada ano pelos próximos 20 anos? Uma maneira de ver isso é através da probabilidade — olhar para todos os dados e tentar prever a probabilidade. Ou você pode olhar para isso de uma perspectiva de custo: quanto custaria para alguém quebrar esse molde? Se você é um estado-nação, poderia usar os poderes da guerra e da regulamentação internacional. Ou você poderia ir para o outro lado e buscar um asteroide do espaço com muito ouro nele, contornando as limitações físicas da Terra. Há um preço para quebrar quase qualquer molde.

E, por último, a dureza vem de certas fontes — átomos, instituições e blockchains. Cada uma tem propriedades diferentes que as tornam úteis em contextos diferentes.

O que eu gosto nessa estrutura é que ela nos permite fazer perguntas mais profundas — não apenas falar sobre propriedades específicas das blockchains, mas comparar todas essas coisas diferentes e pensar sobre onde elas são apropriadas, como as usamos e em qual combinação.

#### Dureza atômica (19:00) {#atom-hardness-1900}

A dureza atômica é sobre quando encontramos confiabilidade na natureza ao nosso redor — átomos físicos literais, mas também outras propriedades que ocorrem naturalmente. Fazemos isso quando usamos contas de ouro como dinheiro, quando usamos estruturas físicas para definir direitos de propriedade ou registramos direitos de propriedade em um objeto físico como uma escritura.

Ela tem muitas vantagens: aplicação automática, estado compartilhado, um conjunto de regras universal. É muito conveniente para a civilização humana que as regras da física se apliquem igualmente em todos os lugares, pelo menos nas escalas macroscópicas que mais importam para nós.

Mas tem fraquezas. Estamos limitados ao que podemos encontrar no mundo. A dureza atômica é como um arquiteto que quer construir uma parede de rocha em sua casa — você tem que encontrar uma que funcione. Você não pode simplesmente fazer uma parede de rocha. Você pode alterá-la um pouco, mas está dependendo de encontrar uma característica natural que atenda à sua necessidade específica.

Não podemos dar a ela novas regras. Temos ouro, mas não podemos pedir ao universo que nos dê um novo tipo de ouro com inflação mais baixa, distribuição geográfica mais justa ou talvez consertar o problema do peso. Não podemos fazer isso. E tem uma programabilidade muito limitada — existem apenas certos tipos de coisas endurecidas que você pode fazer a partir da dureza atômica, principalmente dinheiros. Você não pode fazer um acordo de casamento a partir de átomos. Você precisa de algo mais complexo, como uma instituição, para fazer isso.

E os moldes são frequentemente prejudicados pelo nosso crescente controle humano sobre a natureza. Usar conchas como dinheiro é bom até você fazer parte de uma economia global que pode alterar radicalmente suas expectativas sobre a inflação das conchas e, de repente, sua economia é aniquilada. Usar o ouro como meio de troca pode enfrentar o mesmo problema algum dia, se e quando pudermos obter ouro de asteroides e mudar nossas suposições sobre a oferta.

Mas é mais sutil do que isso. Às vezes, temos moldes que nem percebemos que existem, mas então eles desaparecem porque algo mudou. Houve um molde duro sobre a velocidade de negociação nos mercados financeiros por muito tempo — só podia ser feito em um certo ritmo, talvez o ritmo em que alguém pode gritar um para o outro no pregão. Esse molde era duro como um átomo — simplesmente não conseguíamos nos comunicar mais rápido do que isso. Mas a nova tecnologia minou completamente essas suposições. Percebemos que, na verdade, gostávamos de uma versão daquele antigo molde e o refizemos a partir de instituições — introduzindo regulamentações que limitam a velocidade de negociação e impõem *circuit breakers*.

#### Dureza institucional (22:00) {#institutional-hardness-2200}

A dureza institucional é uma categoria muito ampla — abrange a maioria das coisas em que podemos pensar quando pensamos em civilização. Nossos sistemas legais, legislaturas, forças policiais, corporações, tudo. Todas as instituições que fornecem dureza de algum tipo. Criamos moldes que deram ordem às nossas sociedades, punindo o comportamento antissocial. Criamos a dureza como uma plataforma, permitindo que qualquer um crie seus próprios moldes endurecidos por instituições, desde que siga certas regras. Criamos moldes que geraram novos ativos e forneceram fontes de crédito para economias em crescimento.

A dureza institucional tem muitas vantagens. É muito programável — seres humanos agrupados em organizações podem receber instruções realmente complexas ou sutis. Este é um espaço de design muito grande de moldes possíveis. E elas são feitas de pessoas, e as pessoas são boas. Talvez seja bom que às vezes alguém possa intervir e dizer: "Não vou aplicar isso porque acho que está errado". É bom que talvez às vezes haja uma pausa no sistema para que alguém seja um denunciante ou um rebelde.

Mas também tem muitas fraquezas. É limitada por fronteiras — apenas em certos países você realmente tem acesso a instituições que aplicam o estado de direito. Está exposta a falhas políticas ou estatais — se o seu governo simplesmente não consegue concordar com as coisas, ou se você for invadido por uma nação beligerante, certas instituições nas quais você confia para dinheiro ou contratos podem simplesmente desmoronar. Elas são frequentemente opacas — é difícil dizer se uma instituição é realmente dura ou não até que algo dê errado. Elas têm um alto custo inicial — não podemos simplesmente criar novas instituições na escala do Fed ou do sistema legal para iterar sobre elas. Estamos meio que presos às que temos.

E elas são feitas de pessoas, e as pessoas são más. A realidade neste país e em muitos outros é que muitas pessoas não tiveram realmente acesso à dureza fornecida pelas instituições. Elas não conseguiram obter uma hipoteca. Elas não conseguiram abrir uma conta bancária. Porque quando você preenche uma instituição com pessoas, ela fica sujeita aos seus males, seus preconceitos, suas ideologias. E nossa dependência da dureza institucional só está aumentando. O problema com o software engolindo o mundo é que a maioria dos softwares é, na verdade, apenas feita de uma instituição por trás da tela, e estamos dando a eles cada vez mais poder como resultado.

#### Dureza da blockchain (24:20) {#blockchain-hardness-2420}

A invenção de Satoshi foi, obviamente, mais do que apenas o Bitcoin — foi o núcleo de uma técnica de uso geral para criar dureza digital em um ambiente digital. Ela tem muitos pontos fortes: acesso global universal, é feita de software e qualquer um pode escrever software, o grau de dureza pode ser transparente e auditável, baixo custo inicial, fácil de iterar e garantida por incentivos de mercado — e os mercados são racionais.

Mas também tem fraquezas. Requer uma civilização tecnológica — não poderíamos ter tido blockchains antes de agora por causa dos requisitos, e uma civilização no futuro que não tenha o que temos também não será capaz de usá-las. É feita de software, e o software pode ser mal escrito. O escopo dos moldes é limitado a ambientes onchain. E é garantida por incentivos de mercado — e os mercados são irracionais.

#### Por que isso importa (25:10) {#why-this-matters-2510}

Então, o que isso significa? O que isso nos dá? Por que isso é mais do que apenas um interesse acadêmico?

Muitas coisas começam a fazer muito mais sentido quando vistas através dessa lente. Uma delas é a pergunta com a qual começamos: por que dizemos que as blockchains são, ao mesmo tempo, sem necessidade de confiança e confiáveis? A explicação é esta — quando dizemos que as blockchains são sem necessidade de confiança, o que realmente queremos dizer é que sua dureza não depende de uma pessoa ou instituição. E quando dizemos que são confiáveis, queremos apenas dizer que elas têm dureza — apenas de um tipo diferente. Nossa incapacidade de fazer essa distinção é o que causa essa linguagem confusa.

Isso explica por que blockchains privadas ou centralizadas não são interessantes. Uma blockchain que não é descentralizada simplesmente colapsa de volta a ser uma instituição. Se for controlada por três bancos ou um punhado de validadores, todos financiados pela mesma organização, então é apenas uma EVM garantida pela dureza institucional. A coisa mais interessante sobre as blockchains não é a EVM — é que existe uma fonte diferente de dureza que não está correlacionada ou sujeita às mesmas falhas e limitações que as instituições. É por isso que é diferente. É por isso que importa.

Também ajuda a entender o espectro de possibilidades e as ideologias padrão nas quais as pessoas caem no espaço blockchain. Muitas pessoas estão muito focadas em usar a dureza da blockchain para competir ou substituir a dureza institucional — é sobre isso que grande parte da comunidade Bitcoin trata, sobre o que grande parte das finanças descentralizadas (DeFi) trata. Até mesmo o ENS está tentando substituir ou competir com o DNS de alguma forma. Mas também há pessoas que veem que a dureza da blockchain pode fazer coisas que a dureza institucional não pode — ideias que ninguém nunca tentou antes porque nunca tivemos essa capacidade, esse certo sabor de dureza. E agora podemos explorar essas coisas. Talvez os NFTs estejam lá, ou jogos como Dark Forest, ou o movimento em torno de mundos autônomos.

#### Elevando nossas ambições (27:00) {#raising-our-ambitions-2700}

Mais importante ainda, acho que essa estrutura eleva nossas ambições. Pessoalmente, é isso que importa para mim, e talvez ressoe com você — não estou aqui apenas por esses aplicativos individuais. Não sou alguém que se importa apenas com o Bitcoin, ou apenas com finanças descentralizadas (DeFi), ou apenas com NFTs. Talvez esse seja você também. Há algo maior acontecendo aqui.

Podemos honestamente mirar mais alto do que o dinheiro. Podemos mirar mais alto do que as finanças. Há um panorama muito maior. Acho que isso realmente ajuda a definir uma visão que parece adequada em escala aos desafios que enfrentamos e às oportunidades que as blockchains oferecem.

A missão não é apenas substituir o Fed. A missão é melhorar e expandir os próprios materiais que usamos para construir nossa civilização — reduzir o custo dessas ferramentas para que todos na Terra tenham acesso a elas, para permitir que mais mudanças aconteçam. E, a propósito, esse custo ficará menor em breve.

Ajudar a humanidade a continuar jogando esse jogo infinito, permitindo que mais pessoas mudem as regras. Muito poucas pessoas podem promulgar uma lei, mas qualquer um pode escrever um contrato inteligente. Estamos expandindo essa capacidade.

Acho que muitas pessoas em muitos países diferentes e de muitas ideologias sentem que estamos presos — que as regras do jogo não são mais o que deveriam ser, mas somos impotentes para mudá-las. Estamos presos de tantas maneiras neste máximo local, e intuímos que isso está errado. As blockchains não consertam isso, mas acho que podem ajudar. Elas abrem um novo espaço para experimentação. Elas permitem que mais pessoas mudem as regras, escrevam novas regras, contribuam para esse jogo infinito. Não podemos escrever leis, mas podemos escrever um contrato inteligente.

Quero terminar com esta nota: se você já viu palestras de pessoas da EF antes, sabe que gostamos do livro *Jogos Finitos e Infinitos* (*Finite and Infinite Games*). Uma das máximas deste livro é que apenas aquilo que pode mudar pode continuar. Não podemos ficar presos neste máximo local. Temos que mudar as coisas. E acho que as blockchains nos ajudam a fazer isso. Muito obrigado.