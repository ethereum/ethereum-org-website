---
title: "Provas de conhecimento zero explicadas em 5 níveis de dificuldade"
description: "Um cientista da computação explica as provas de conhecimento zero em cinco níveis diferentes de complexidade, de uma criança a um especialista."
lang: pt-br
youtubeId: "fOGdb1CTu5c"
uploadDate: 2021-12-13
duration: "0:18:19"
educationLevel: beginner
topic:
  - "privacidade-e-seguranca"
  - "provas-de-conhecimento-zero"
  - "criptografia"
format: explainer
author: WIRED
breadcrumb: "Provas de conhecimento zero"
---

O cientista da computação **Amit Sahai**, professor da UCLA Samueli School of Engineering, explica as provas de conhecimento zero em cinco níveis de complexidade, de uma criança a um especialista, nesta produção da **WIRED**. O conceito é demonstrado por meio de analogias físicas e discutido com profundidade técnica crescente, tornando um dos conceitos mais importantes da criptografia acessível a todos.

*Esta transcrição é uma cópia acessível da [transcrição original do vídeo](https://www.youtube.com/watch?v=fOGdb1CTu5c) publicada pela WIRED. Ela foi levemente editada para facilitar a leitura.*

#### Introdução (0:00) {#introduction-000}

**Amit Sahai:** Olá, meu nome é Amit Sahai e sou professor de ciência da computação na UCLA Samueli School of Engineering. Hoje, me pediram para explicar as provas de conhecimento zero em cinco níveis de complexidade crescente.

Uma prova de conhecimento zero é uma maneira de um provador convencer um verificador de que alguma afirmação é verdadeira e, ainda assim, não revelar nenhuma informação adicional além do fato de que a afirmação é verdadeira. As provas de conhecimento zero estão sendo usadas em blockchains e criptomoedas. Os criptógrafos estão entusiasmados com o conhecimento zero por causa de suas incríveis propriedades matemáticas, mas também por causa de sua incrível aplicabilidade a tantos cenários diferentes.

#### Nível 1: criança (0:41) {#level-1-child-041}

**Amit Sahai:** Qual é a sua matéria favorita?

**Chelsea:** Eu diria matemática. Alguns dos problemas pequenos podem, na verdade, ser bem grandes e complicados. É como um quebra-cabeça.

**Amit Sahai:** Eu amo matemática pelo mesmo motivo. Hoje, vou te falar sobre uma coisa chamada prova de conhecimento zero. Em uma prova de conhecimento zero, há duas pessoas — há um provador e um verificador. Eu quero provar que algo é verdade para você, mas o estranho é que eu quero provar para você que é verdade sem te dizer nenhum motivo. Lembro que quando ouvi falar disso pela primeira vez, fiquei tipo: espera, o quê? Como isso é possível?

Então, o que você vê nesta foto?

**Chelsea:** Muitos pinguins.

**Amit Sahai:** Sim. Escondido entre todos esses pinguins há um papagaio-do-mar. Você quer tentar procurá-lo? Você vê onde ele está? Eu sei onde ele está, mas não quero te contar. Você acredita em mim?

**Chelsea:** Sim.

**Amit Sahai:** Mas e se eu pudesse provar para você que sei onde o papagaio-do-mar está sem revelar a você onde ele está? Deixe-me te mostrar. Eu peguei aquela foto e a coloquei atrás deste pôster aqui. Por que você não dá uma olhada por aquele buraco?

**Chelsea:** Eu vejo o papagaio-do-mar.

**Amit Sahai:** Então, quando você olha para este quadro, nós não sabemos onde a foto estava, certo? A foto estava com o canto aqui, e nesse caso o papagaio-do-mar estaria todo deste lado? Ou a foto estava com o canto aqui, e nesse caso o papagaio-do-mar estaria do outro lado? Então, este é um exemplo muito simples de uma prova de conhecimento zero. Eu te convenci de que sabia onde o papagaio-do-mar estava, mas você não aprendeu mais nada.

**Chelsea:** Por que você estuda a prova de conhecimento zero?

**Amit Sahai:** Quando aprendi sobre elas pela primeira vez, achei que eram muito legais. Mas acontece que elas também são muito úteis — não apenas para encontrar papagaios-do-mar. Se você simplesmente digitar sua senha e o hacker invadir o computador, ele pode simplesmente pegar sua senha. E se, em vez disso, pudéssemos de alguma forma usar uma prova de conhecimento zero para fazer o login? Você seria capaz de provar que é a Chelsea, sem revelar nada a eles. Se você pudesse fazer isso, seria incrível, porque mesmo se o hacker invadisse o computador, ele não aprenderia nada — porque nem mesmo o computador aprende nada.

Então, Chelsea, em suas próprias palavras, o que é uma prova de conhecimento zero?

**Chelsea:** A prova de conhecimento zero é a prova de uma afirmação. Você não mostra a eles o porquê ou o quê. Você apenas mostra a eles um pequeno segmento, ou apenas faz algum tipo de truque de mágica estranho que não é realmente um truque de mágica, e eles ficarão convencidos. E você não mostrou a eles o porquê, nem nada do tipo.

#### Nível 2: adolescente (3:31) {#level-2-teen-331}

**Amit Sahai:** Então, você já ouviu o termo prova de conhecimento zero antes?

**Adolescente:** Não, nunca ouvi.

**Amit Sahai:** É uma maneira de um provador convencer um verificador de que algo é verdade sem revelar nada sobre o porquê de ser verdade, o que soa totalmente bizarro. O que eu quero fazer é provar para você que eu sei esta combinação sem revelar a combinação para você. E o que você poderia fazer é escrever um pequeno bilhete, um segredo que eu definitivamente não saberia. Dobre-o, coloque-o aqui dentro. E então, se eu souber a combinação, eu deveria ser capaz de abri-lo e te dizer o que você escreveu.

Certo. "Meu cachorro se chama Doug."

**Adolescente:** Você descobriu qual era a combinação?

**Amit Sahai:** Não. Então, em nenhum momento desta interação você viu qualquer informação que já não soubesse. E, no entanto, eu te convenci de que sei a combinação.

**Adolescente:** Então, qual é o propósito exato de uma prova de conhecimento zero? É como provar algo, mas sem dar informações suficientes que possam colocar em risco o que quer que você esteja provando?

**Amit Sahai:** As pessoas não confiam umas nas outras. E se eu fosse capaz de provar que fiz algo corretamente para alguém sem ter que revelar meus segredos, então essa pessoa confiaria mais em mim.

**Adolescente:** Como isso se relaciona com a tecnologia da computação? É uma interação pessoal?

**Amit Sahai:** Suponha que você quisesse trocar mensagens com alguém que você conhecesse. Vocês provavelmente se reuniriam primeiro e descobririam algum código secreto, certo? E então escreveriam mensagens um para o outro nesse código. Mas e se você nunca tivesse conhecido a pessoa antes? E se você quiser trocar mensagens secretas comigo e nós nunca nos conhecemos antes? Como poderíamos fazer isso?

**Adolescente:** Não faço ideia.

**Amit Sahai:** Parece impossível, certo? Mas não é. Você não usaria um cadeado físico ou uma caixa física. Em vez disso, usaríamos a matemática para fazer esse tipo de coisa. Você poderia pegar uma mensagem e usar criptografia nela usando a matemática. E então eu poderia provar para você que eu sei a chave, abri-la e enviá-la de volta para você. Dessa forma, eu estaria provando para você que conheço a chave matemática para o cofre matemático.

Então, com base no que discutimos hoje, em suas próprias palavras, o que é uma prova de conhecimento zero?

**Adolescente:** É como se você tivesse um segredo muito importante que você quer que alguém saiba, mas você não quer contar tudo a eles. Você pode usar uma prova de conhecimento zero para provar a eles esse segredo, mas sem revelar tudo.

#### Nível 3: estudante universitário (6:13) {#level-3-college-student-613}

**Amit Sahai:** O que você está estudando?

**Estudante Universitário:** Sou estudante do primeiro ano de ciência da computação na USC Viterbi. Tenho interesse em tudo relacionado a dados, internet, blockchain e criptomoeda.

**Amit Sahai:** Você já ouviu falar de provas de conhecimento zero?

**Estudante Universitário:** Só de passagem.

**Amit Sahai:** Na verdade, o espaço da blockchain é um dos espaços onde estamos vendo as provas de conhecimento zero sendo implementadas — e acho que é apenas o começo. Em sua essência, uma prova de conhecimento zero é uma interação entre duas pessoas. Eu deveria ser capaz de te convencer de que alguma afirmação é verdadeira, mas você não terá ideia do porquê ela é verdadeira.

A maneira como vamos abordar isso é por meio de algo chamado completude NP. Um problema NP-completo é um problema muito difícil de resolver. Mas se você conseguir resolvê-lo, poderá resolver qualquer problema que esteja na classe NP — e isso inclui um vasto número de problemas. Vamos usar um problema NP-completo para realmente provar uma incrível variedade de afirmações por meio de uma prova de conhecimento zero. O problema NP-completo específico que vamos analisar é chamado de coloração de mapas com três cores.

Aqui temos um mapa com vários países, organizados de forma que nenhum país que tenha a mesma cor compartilhe uma fronteira. É isso que torna um mapa como este validamente colorido. Acontece que se um mapa pode ou não ser colorido com três cores dessa maneira é um exemplo de um problema NP-completo.

Talvez o que você realmente queira fazer seja dar uma prova de conhecimento zero de que você tem pelo menos 0.3 Bitcoin, sem revelar o endereço da sua conta. Acontece que eu posso pegar essa afirmação e convertê-la em um mapa de países. Esse mapa de países só poderá ser colorido com três cores se você tiver pelo menos 0.2 Bitcoin.

**Estudante Universitário:** Como transformaríamos algo assim em uma prova de conhecimento zero?

**Amit Sahai:** Claro, o primeiro passo é que temos que apagar todas as cores. Eu coloquei uma cor dentro de cada um desses envelopes. Agora, como você sabe que é uma coloração válida? Você não sabe. Você tem que escolher quaisquer dois países vizinhos — você pode escolhê-los como quiser, de forma aleatória.

**Estudante Universitário:** Posso pegar estes dois?

**Amit Sahai:** Aqui temos verde, e aqui temos azul. Como você pode ver, são duas cores diferentes. Então você tem um pouco de confiança de que eu consegui colorir isso corretamente — mas não tanta confiança, porque eu só te mostrei dois dos países. Uma maneira de obter mais confiança é abrir mais deles, mas isso seria revelar informações a você. Eu não quero fazer isso.

Então, em vez disso, vou pedir que você, por favor, se vire. E agora, vamos mudar essas cores.

Você pode escolher dois países aleatoriamente, e nós revelaremos duas das cores novamente.

**Estudante Universitário:** Vou pegar este e este.

**Amit Sahai:** É inteligente da sua parte verificar com o mesmo que você já tinha. Mas como você verá, agora não é verde — é azul. E este, por outro lado, é verde. As cores que te mostrei da última vez não funcionam com essas novas cores. Mas funciona para esta coloração que estou te mostrando agora. Então, o que fizemos foi tornar impossível para você juntar as peças. E se você fizer isso mil vezes, e eu te mostrar corretamente cores diferentes a cada vez, você ficaria realmente convencido. E é isso — essa é toda a prova de conhecimento zero.

**Estudante Universitário:** Então é como uma prova probabilística?

**Amit Sahai:** Sim. Em implementações reais, não usaríamos envelopes — você usaria criptografia. Mas este é o protocolo.

**Estudante Universitário:** Então, quais são as implicações mais amplas das provas de conhecimento zero? Elas devem ser mais práticas para implementação ou devem provar algo estruturalmente?

**Amit Sahai:** Não se trata de tornar algo mais eficiente. Trata-se de fazer coisas que simplesmente não sabíamos como fazer antes. Eu posso realmente provar para você, sem revelar nenhum dos meus segredos, que estou me comportando honestamente. Eu poderia provar para você que assinei algum documento criptografado corretamente sem revelar qual era esse documento secreto. Essa capacidade de mudar o jogo — de realmente mudar o que podemos fazer — é o que o conhecimento zero traz para a mesa.

**Estudante Universitário:** Onde você acha que poderíamos construir mais confiança usando provas de conhecimento zero?

**Amit Sahai:** Um ótimo exemplo são as eleições. Se você pudesse provar que uma eleição foi conduzida corretamente — que cada voto foi contado e tudo somou para uma pessoa ganhando com um total específico — em conhecimento zero, então você não precisa revelar os votos reais de nenhuma pessoa. E, no entanto, todos poderiam ver que foi feito corretamente.

#### Nível 4: estudante de pós-graduação (11:59) {#level-4-grad-student-1159}

**Amit Sahai:** É muito bom ter você aqui e conversar com você, Eli. Você pode me contar um pouco sobre sua pesquisa?

**Eli:** Minha pesquisa é em criptografia. Especificamente, estou trabalhando em alguns protocolos de computação multipartidária. O que estou trabalhando agora é um sistema para computar estatísticas agregadas, para que provedores de serviços como o Google Chrome ou a Tesla possam coletar essas estatísticas sem aprender nada sobre os dados individuais dos usuários. Eu, como usuário, não preciso deixar o Firefox saber que meu site favorito é mylittlepony.com. Mas eles podem saber quantos usuários acessam mylittlepony.com todos os dias.

**Amit Sahai:** Isso é incrível. A computação multipartidária é algo muito próximo e querido ao meu coração. Obviamente, as provas de conhecimento zero são sobre provar coisas para outra pessoa sem revelar os detalhes do que é que você está provando. Mas, na minha opinião, o conhecimento zero na verdade vai ainda mais além disso. É esse conceito abrangente que você pode ver muito na computação multipartidária, onde você quer realizar alguma tarefa sem revelar nada além do que exatamente você precisa para realizar essa tarefa.

**Eli:** Certo, e isso permite que você prove que tem se comportado honestamente, sem revelar nenhum dos segredos envolvidos que você usa para realmente se comportar honestamente. Sabemos que as provas de conhecimento zero para linguagens NP-completas desempenham um papel enorme na criptografia. Como foi sua primeira experiência com a completude NP?

**Amit Sahai:** Meu primeiro encontro foi na minha primeira aula de algoritmos como estudante de graduação. Uma linguagem NP-completa é esse problema incrível que não apenas te diz sobre si mesmo, mas resolver esse problema pode realmente te dizer sobre toda uma classe de problemas muito interessantes.

**Eli:** Quando você começou a pensar em provas como um jogo interativo onde estamos conversando um com o outro, isso tornou o conhecimento zero possível?

**Amit Sahai:** Com certeza. E a ideia de que a aleatoriedade poderia ser útil para provar algo — novamente, parece tão contra-intuitivo se pensarmos no ideal platônico de uma prova. Não há aleatoriedade, nenhum não-determinismo presente lá.

**Eli:** Tem a ver com toda essa ideia de virar uma prova de cabeça para baixo. Em uma prova clássica antiga, a aleatoriedade vai especificamente contra o objetivo do que você está tentando fazer, porque você está tentando tornar tudo óbvio e revelar o fluxo de informações. Mas uma vez que você vira isso de cabeça para baixo e não está mais tentando fazer isso, de repente todas as propriedades ruins da aleatoriedade se tornam boas.

**Amit Sahai:** Exatamente. O aleatório é imprevisível, e é isso que queremos. Queremos que essa imprevisibilidade realmente esconda as informações que queremos esconder. Como você tem usado o conhecimento zero nos projetos em que trabalhou? Quais são os desafios que você encontra?

**Eli:** Geralmente, a parte mais difícil é descobrir exatamente qual é o melhor lugar para usá-lo. Escrevi alguns artigos que usaram o conhecimento zero de uma forma mais teórica, mas quando se trata de aplicações, algumas das aplicações mais empolgantes que vi até agora foram no espaço da blockchain.

**Amit Sahai:** Quais são alguns dos gargalos de eficiência?

**Eli:** Uma das coisas mais legais sobre as provas de conhecimento zero é que existem tantos tipos — eu gosto de chamá-los de sabores. Em geral, quando você está usando provas de conhecimento zero em aplicações, o principal gargalo tende a estar no provador.

**Amit Sahai:** Você pode pegar o trabalho do provador e dividi-lo em muitas computações paralelas?

**Eli:** Essa é uma pergunta muito divertida. Acho que ainda não sabemos a resposta para isso como um campo de estudo. Uma das coisas mais legais que vi nos últimos três ou quatro anos é a transição do teórico para o aplicado — ver todos esses sistemas incríveis que as pessoas pensaram nos últimos 30 anos começarem a se tornar eficientes o suficiente para serem feitos.

**Amit Sahai:** Sem dúvida. E especialmente com a computação em nuvem — explorar o poder da nuvem para viabilizar as provas de conhecimento zero seria incrível. Também no espaço da blockchain, se você quiser acelerar a geração de provas, se isso pudesse ser feito de forma distribuída, seria ótimo. Uma das esperanças que tenho é que o poder da computação multipartidária seja sobre reunir pessoas que desconfiam mutuamente umas das outras. Podemos pegar esse poder na criptografia e usá-lo para ajudar com o tremendo nível de desconfiança que existe na sociedade agora?

**Eli:** Acho que essa é uma das razões pelas quais fui tão atraído pela computação multipartidária. Um dos problemas mais importantes do mundo é o fato de que tantas pessoas não confiam umas nas outras. Ser capaz de usar a matemática para criar tecnologia que permita que as pessoas trabalhem juntas sem ter que confiar umas nas outras é uma missão muito legal e incrível.

#### Nível 5: especialista (17:10) {#level-5-expert-1710}

**Amit Sahai:** Shang-Hua, é muito bom ver você de novo. Acho que a última vez que nos encontramos foi em 2017 ou algo assim.

**Shang-Hua:** Acho que fizemos um Zoom uma vez durante a pandemia, mas é bom ver você pessoalmente. Na verdade, em 86 eu estava fazendo uma aula de criptografia com o Professor Leonard Adleman, o A do RSA. Ele me designou o artigo de Goldwasser, Micali e Charlie Rackoff sobre a prova de conhecimento zero. Então essa foi de fato a minha primeira apresentação, de todas, neste país — sobre conhecimento zero.

**Amit Sahai:** Isso é incrível. É um conceito quase hipnótico.

**Shang-Hua:** Também é interessante como formular matematicamente esses conceitos. Por exemplo, temos dados. Eventualmente, a partir dos dados, por meio da mineração de dados, você pode obter informações. E então você tem essa palavra chamada "conhecimento". O conhecimento tem sido debatido há muito tempo, até mesmo na filosofia. O que é conhecimento? Mas aqui está uma maneira muito fascinante pela qual matemáticos ou cientistas da computação querem capturar esse conhecimento. Não dizia "prova de informação zero". Então, qual é a sua opinião sobre o porquê de "conhecimento" em vez de "informação", ou "prova de dados zero"? Claramente há dados lá, então não pode ser dados zero.

**Amit Sahai:** Com certeza. Não acho que ainda tenhamos uma resposta completamente satisfatória para essa pergunta. O que foi uma percepção tão bela é a ideia de que o conhecimento zero é algo que você já pode prever. Se você já pode prever a resposta, então você não deve estar ganhando nenhum conhecimento com essa interação. Essa percepção — de ser capaz de prever o futuro com precisão e isso ser evidência de uma falta de novo conhecimento — foi uma percepção tão bela e incrível.

**Shang-Hua:** Bem, não há informação zero aqui. Fundamentalmente, de uma perspectiva de computação e segurança, o que importa é quanto conhecimento você está ganhando, mais do que quanta informação você ganhou e quantos dados você tem. Dados não implicam imediatamente em conhecimento. Mas as pessoas nem sempre conseguem distinguir.

**Amit Sahai:** Certo. Por exemplo, na pesquisa médica — quão incrível seria ter um medicamento e provar que ele funciona neste modelo, sem ter que revelar a estrutura do composto?

**Shang-Hua:** Quais você diria que são as próximas direções neste espaço?

**Amit Sahai:** Esse conceito de programas de conhecimento zero permitiria que você realizasse computações completamente arbitrárias de uma maneira de conhecimento zero, sem nenhuma interação. Eu posso simplesmente pegar o programa, convertê-lo em um programa de conhecimento zero — ou um programa ofuscado — e então simplesmente enviá-lo para você. Você pode executá-lo e obter o benefício dessa computação sem ter que falar mais comigo.

**Shang-Hua:** Isso mesmo. Há uma natureza não interativa. Mas há verificabilidade nisso. Na blockchain, eles também começaram a incorporar uma prova de conhecimento zero mais geral no livro-razão.

**Amit Sahai:** Definitivamente estamos neste momento agora em que o conhecimento zero será usado cada vez mais. Há tantas conferências e reuniões no espaço de conhecimento zero para as quais você e eu não somos convidados — porque é para as pessoas que estão desenvolvendo, as pessoas que estão programando, não nós, matemáticos. E acho que isso é um sinal. É um sinal de que nosso bebê cresceu e é hora de ele ser desenvolvido.

**Shang-Hua:** Acho que, profundamente, os alunos costumam me perguntar quais são as direções futuras — tanto em termos de cripto, prova de conhecimento zero, no mundo real e na computação matemática.

**Amit Sahai:** É uma ótima pergunta. Eu gostaria de poder ver o futuro. Não posso, mas deixe-me tentar. Acho que fizemos muito na criptografia nas últimas décadas, mas entendemos muito pouco. O aspecto mais fundamental é entender a dificuldade — como obtemos problemas difíceis? Como realmente construímos problemas matematicamente difíceis para que possamos usá-los para construir programas e provas de conhecimento zero eficientes?

**Shang-Hua:** Eu acho que também, na computação quântica, você precisa de problemas ainda mais difíceis.

**Amit Sahai:** De fato. Agora que temos o espectro da computação quântica vindo em nossa direção, todos sabemos que os computadores quânticos podem quebrar muitos sistemas criptográficos. É um desafio profundo. Então, podemos encontrar novas fontes de dificuldade que sejam resistentes à computação quântica — que nem mesmo os computadores quânticos possam quebrar? Isso é algo em que venho trabalhando nos últimos anos.

**Shang-Hua:** Mas tenho certeza de que eles motivarão uma matemática bela.

**Amit Sahai:** Sim, isso mesmo. Uma das grandes coisas sobre o mundo real é que as pessoas no mundo real têm demandas. E essas demandas muitas vezes parecem impossíveis. E é aí que nós entramos — é nosso trabalho tornar o impossível possível.