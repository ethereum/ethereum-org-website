---
title: "Palestra: o REAL estado das L2s"
description: "Uma palestra sobre o estado atual das soluções de camada 2 (l2), examinando a lacuna entre as promessas de segurança dos rollups e a realidade, e propondo um caminho para a verdadeira descentralização."
lang: pt-br
youtubeId: "ik2JxmHDmyw"
uploadDate: 2024-11-13
duration: "0:26:15"
educationLevel: advanced
topic:
  - "escalabilidade-e-camada-2"
  - "rollups"
  - "camada-2"
format: presentation
author: Ethereum Foundation
breadcrumb: "Estado das L2s"
---

Uma palestra de **Bartek Kiepuszewski**, fundador do L2BEAT, na Devcon SEA, examinando o estado atual das soluções de camada 2 (l2), a lacuna entre as promessas de segurança dos rollups e a realidade, novas categorias de avaliação e o compromisso do L2BEAT de investir recursos significativos na verificação de sistemas de prova ao longo do próximo ano.

*Esta transcrição é uma cópia acessível da [transcrição original do vídeo](https://www.youtube.com/watch?v=ik2JxmHDmyw) publicada pela Fundação Ethereum. Ela foi levemente editada para facilitar a leitura.*

#### Introdução (0:00) {#introduction-000}

Sendo um dos fundadores do L2BEAT, tenho a oportunidade única de trabalhar com praticamente todas as equipes de L2 que existem, e temos trabalhado com elas desde o início deste espaço — o que foi há cerca de quatro anos. Isso é incrível. O tempo voa muito rápido. Trabalhamos com os primeiros pioneiros na tecnologia ZK, trabalhamos com o Plasma Group que foi renomeado para Optimism, trabalhamos com a Arbitrum. E, deste palco, quero reconhecer todas essas equipes, porque sem o apoio de vocês certamente não estaríamos aqui. Como L2BEAT, somos extremamente gratos por todo o apoio que a comunidade nos dá.

Então, vamos dar uma olhada no que conseguimos alcançar. Em primeiro lugar, conseguimos lançar quase 50 rollups e mais de 50 outras L2s. É uma conquista incrível — são muitos sistemas, e temos quase a mesma quantidade para lançar nos próximos meses. Colocamos muito valor, muito valor total bloqueado (TVL), nesses sistemas também, e se você olhar para os gráficos, eles só sobem.

A questão é que, com todo esse crescimento, vem também muita responsabilidade. Precisamos entender que os usuários finais que estão usando esses sistemas estão colocando dinheiro nesses rollups porque acreditam que os rollups herdam a segurança do Ethereum. Com esse tipo de constatação, na minha opinião, precisamos começar a levar a segurança a sério.

#### Escalando o Ethereum (2:10) {#scaling-ethereum-210}

Também conseguimos escalar o Ethereum. O Ethereum estava indo muito bem, mas começou a ficar muito lento para a demanda e as taxas estavam ficando muito altas. Então, certamente estamos escalando — esses números também sobem. Isso é incrível.

No entanto, há um "mas". Vocês sabem, pessoal, sempre há um "mas", certo? E estou aqui apenas para ser honesto com todos vocês. Eu realmente quero que este espaço fique sério, e esta é a minha oportunidade de pedir o apoio de vocês para garantir que não falhemos — que não falhemos com as expectativas da comunidade. Precisamos começar a ser realmente sérios sobre a segurança do que estamos construindo.

Porque, sabem, estamos usando rodinhas de treinamento por muito tempo. Se você é um adulto usando rodinhas de treinamento — e repito, já se passaram quatro anos —, então você é realmente imaturo. Tudo bem usar rodinhas de treinamento se você for uma criança. Não é aceitável usar rodinhas de treinamento se você for um adulto. E acho que é hora de todos nós realmente pararmos de ter vergonha disso. Todos nós deveríamos nos manifestar, e não deveríamos sofrer da síndrome da roupa nova do imperador.

#### O grande "mas": a falta de sistemas de prova (4:30) {#the-big-but-missing-proof-systems-430}

Então, qual é esse grande "mas"? Bem, em primeiro lugar, a maioria das L2s hoje não tem um sistema de prova, o que é um tanto surpreendente porque os primeiros pioneiros como StarkNet, zkSync, Aztec — há quatro anos, quando estavam lançando seus primeiros rollups específicos de aplicativos, eles tinham sistemas de prova. Então, sim, você pode lançar hoje uma L2 com o clique de um botão. No entanto, isso é realmente uma L2? Isso é realmente um rollup? O que você está fazendo é lançar algo que é garantido por uma multisig. Eu não acho que isso seja bom o suficiente.

O estado do ecossistema hoje é mais ou menos como neste diagrama. À esquerda, você pode ver as L2s atuais com um sistema de prova. À direita, você pode ver as L2s atuais sem um sistema de prova. E eu apostaria que a grande maioria das próximas L2s não terá um sistema de prova. Isso incluiria essencialmente todas as cadeias OP Stack, exceto a OP Mainnet e a Base — e parabéns a eles, a propósito, eles são como campeões. No entanto, todas as outras cadeias OP Stack simplesmente não têm um sistema de prova.

Aquele gráfico à direita também incluirá todas as pilhas Orbit, que têm um sistema de prova, no entanto, na verdade, está por trás de uma lista de permissões (whitelist) permissionada muitas vezes muito curta. Às vezes, essa lista de permissões é apenas um ator — é o mesmo que o proponente de estado. É essencialmente o proponente de estado e são apenas eles que podem desafiar a si mesmos. Tipo, o quê? Sério.

#### Conselhos de segurança (6:00) {#security-councils-600}

Agora, a maioria das L2s não usa conselhos de segurança. O que queremos dizer com um conselho de segurança? Um conselho de segurança é essencialmente uma multisig que consiste em pelo menos oito participantes e exige um limite de consenso de 75%. Então você pode pensar nisso como uma grande multisig, mas não se trata apenas do tamanho — trata-se do fato de que queremos que os participantes sejam geograficamente descentralizados. Vocês devem ter ouvido ontem uma apresentação incrível sobre a necessidade de diversificação geográfica. É isso que queremos dessas estruturas. E, essencialmente, queremos que os participantes, o mais importante, venham de empresas diferentes e jurisdições diferentes. Isso é super importante, e vou mostrar alguns exemplos do porquê.

Pense nos conselhos de segurança como essas multisigs turbinadas. Há uma camada social muito importante por trás deles. Então este é o estado atual das coisas, e novamente, é muito ruim. Só temos conselhos de segurança na Arbitrum, Optimism, Polygon, zkSync — e sei que StarkNet, Scroll e, curiosamente, Fuel estão sendo lançados com um conselho de segurança. Todos os outros são essencialmente uma multisig muito pequena, interna, muitas vezes privada, e francamente é extremamente difícil dizer a diferença entre essas multisigs e simples EOAs.

#### Premissas de confiança de disponibilidade de dados (7:25) {#data-availability-trust-assumptions-725}

O terceiro grande item que fizemos de errado é que a maioria das L2s que não são rollups são configuradas com premissas de confiança de disponibilidade de dados (DA) abismais. E eu uso a palavra "abismal" — A, porque eu gosto dela, e B, porque é muito, muito ruim.

Olhe para esses exemplos à esquerda — Arbitrum, StarkEx, Immutable X. No entanto, quase todos os outros estão literalmente postando DA em seus servidores no porão ou algo assim. Não fazemos ideia. Literalmente não fazemos ideia. O ponto é que eles são muito ruins e não parecem se importar. Então talvez os usuários não se importem — não sabemos. Mas precisamos realmente olhar para esses dados e dizer a todos, ei, isso não é um comitê de disponibilidade de dados.

Um comitê de disponibilidade de dados foi originalmente criado e defendido pela StarkWare para as implementações do StarkEx e pela Arbitrum. Mas esse não era o ponto — que você pode dizer "Eu tenho um servidor no meu porão, posso chamá-lo de comitê de disponibilidade de dados". Não era esse o objetivo desse exercício.

Então, no geral, lamento dizer, mas no momento, na maioria das L2s, operadores permissionados podem roubar ou congelar seus fundos. Estamos aqui para conscientizar todos vocês sobre isso. Lamento dizer isso, mas precisamos mudar a atitude.

#### Por que os sistemas de prova são importantes (8:40) {#why-proof-systems-matter-840}

Por que deveríamos nos importar com sistemas de prova? Existem pelo menos três bons motivos, em nossa opinião, pelos quais todos nós deveríamos ter um sistema de prova funcional.

Um deles é que ele realmente permite uma saída não permissionada caso todos os operadores estejam inativos — e eles podem estar inativos por qualquer motivo. Tivemos muito recentemente um caso da dYdX ficando inativa. Eles avisaram os usuários, muitos usuários não saíram. No entanto, se você tiver um sistema de prova, poderá criar o sistema de forma que, de maneira não permissionada, alguém assuma o controle, ou você pode construir um mecanismo de saída para que os usuários possam retirar seus fundos. Isso é super importante. Sem um sistema de prova, você simplesmente não pode fazer isso — é impossível.

O segundo motivo é que você pode realmente melhorar as premissas de confiança do conselho de segurança — presumindo, é claro, que você tenha um. E o motivo para isso é bastante sutil. O que você pode fazer agora é o seguinte: em vez da situação em que um proponente malicioso — e este é o diagrama mostrando o rollup otimista padrão sem um sistema de prova, que você pode ver em muitos OP Stacks hoje — há uma multisig muito forte que pode substituir a raiz de estado, e há um proponente que propõe raízes de estado. Se essa proposta for maliciosa, tudo o que eles precisam fazer é subornar uma minoria dos membros do conselho de segurança para desviar o olhar — não para fazer nada malicioso, mas simplesmente para não fazer nada, caso em que a proposta maliciosa realmente passará e eles roubarão os fundos.

Depois de introduzir um sistema de prova, a situação fica muito mais difícil para o proponente malicioso, porque agora eles precisam subornar a **maioria** do conselho de segurança. Eles não apenas precisam subornar a maioria, mas também precisam fazê-los fazer algo malicioso — não apenas desviar o olhar. Essa é uma proposta muito diferente. Fazer alguém desviar o olhar é dizer: "Ei, se eu te der US$ 10 milhões, você simplesmente perde suas chaves ou faz um longo voo internacional". Se você quiser fazer alguém fazer algo malicioso, essa é uma proposta totalmente diferente. Acreditamos que isso muda fundamentalmente as premissas de confiança, especialmente com um conselho de segurança público.

Por fim, os sistemas de prova — se você estiver no Estágio 2 — permitem remover quaisquer intermediários. Você não precisa de um conselho de segurança ou, se tiver, é apenas para situações de emergência. Portanto, isso pode realmente ter profundas implicações regulatórias. Você pode querer lançar sua L2 como um sistema de Estágio 2 desde o início. Isso é possível, mas é claro que você precisa ter um sistema de prova — idealmente, você pode querer ter mais de um. Já existem alguns anúncios de sistemas fazendo isso, como o recente anúncio da equipe do Nethermind construindo um rollup destinado a ser Estágio 2 no lançamento.

#### Por que conselhos de segurança, não multisigs (11:29) {#why-security-councils-not-multisigs-1129}

Isso foi sobre sistemas de prova. Agora, por que conselhos de segurança e não apenas multisigs simples? O motivo é: não acredite que multisigs são multisigs. Esse é o motivo — a menos que haja uma camada social que possa realmente convencê-lo de que elas são fundamentalmente diversificadas.

Tivemos vários grandes eventos em nossa história. Tivemos a Multichain que alegava ser muito descentralizada, e acabou que não, eles não eram — e esta é uma alegação que você não pode realmente verificar de forma independente. Um ataque enorme, ou um trabalho interno, ou um golpe (rug pull) — não temos certeza.

Então tivemos uma situação com a Oasis, onde eles foram abordados por um tribunal do Reino Unido e tiveram que realmente usar a multisig para extrair alguns fundos do protocolo. Teria sido impossível fazer isso se você tivesse um conselho de segurança geopoliticamente diversificado, porque não há ordem judicial que possa realmente alcançar a todos.

Por fim, muito recentemente tivemos um ataque a uma multisig. Não pense por um segundo que as multisigs não podem ser atacadas. Eventualmente, temos que nos livrar de todas elas.

Então, para resumir: se você tem um rollup de Estágio 0 sem conselho de segurança, essencialmente um operador malicioso pode fazer o que quiser com seus fundos. Se você é um rollup de Estágio 0 com um conselho de segurança, então um invasor precisa subornar uma minoria do conselho de segurança — talvez uma coisa difícil de fazer, mas muito mais fácil do que subornar a maioria do conselho de segurança, o que você precisaria fazer se o seu rollup tivesse um sistema de prova. E, finalmente, ninguém pode roubar seus fundos se você estiver no Estágio 2. Essa é a promessa de chegar ao Estágio 2.

#### Reclassificação proposta (13:10) {#proposed-reclassification-1310}

A questão é: temos os incentivos certos para que os projetos realmente se importem? O problema é que a única coisa que podemos fazer — nós como L2BEAT e nós como a comunidade Ethereum — é aplicar pressão social. Vitalik disse que a partir do ano que vem ele planeja mencionar publicamente apenas as L2s que são Estágio 1. Ele até disse anteriormente que não vai chamar os sistemas de rollups se eles não forem Estágio 1.

Então estávamos nos perguntando o que podemos fazer. No momento, temos estágios para rollups. Não temos estágios para validiums e optimiums. Ficamos nos perguntando por muito tempo — talvez pudéssemos introduzir o "Estágio 0+" para sistemas que têm sistemas de prova, mas ainda não são Estágio 1. Mas depois de meses de discussão, decidimos: não, é hora de crescer.

O que estamos propondo à comunidade — e isso vai para o fórum para feedback da comunidade — é o seguinte. Primeiro, queremos criar uma categoria separada para sistemas. A principal diferença é que você terá que ter um sistema de prova para ser Estágio 0. Então, por exemplo, a StarkNet hoje será Estágio 0 sob esta classificação. Todas as cadeias OP Stack que não têm um sistema de prova — exceto Base e Optimism — não se enquadrarão nesta categoria. E, claro, daremos tempo para os sistemas se ajustarem. Essa é a categoria principal, e isso deve ser como uma superliga de sistemas.

Então você tem outra categoria de sistemas que não estão usando a DA do Ethereum. Eles usam premissas de confiança adicionais que vêm com a DA externa. Nós os chamamos de "alt-DA", mas eles incluiriam validiums, optimiums e qualquer construção híbrida que você possa criar. No entanto, eles precisam fornecer garantias razoáveis de DA — isso não pode ser o seu porão. Tem que ser um comitê de disponibilidade de dados de tamanho razoável, ou se você estiver usando Celestia ou Avail, você precisa usar a ponte.

#### A categoria "outros" e o compromisso do L2BEAT (16:05) {#the-others-category-and-l2beats-pledge-1605}

E os outros? Nós os colocaremos em uma terceira categoria, que chamamos — e agora estou esperando o feedback da comunidade sobre como nomear esses sistemas — nosso nome de trabalho é "outros". O ponto é que eles são garantidos por multisigs, e vamos expor essas multisigs pelo que elas são. É isso que queremos fazer em nossa interface de usuário (UI).

A interface de usuário ficará mais ou menos assim: você verá este detalhamento — rollups, validiums e optimiums, e outros. E a classificação padrão será por segurança, não por TVL. Não vamos correr atrás de TVL com segurança ruim — isso vai acabar muito mal.

Promoveremos projetos de Estágio 1 e Estágio 2. Olharemos para os projetos de Estágio 0 como concorrentes. Para os "outros", ficaremos felizes em listá-los — seremos extremamente liberais. Você só precisa estar essencialmente alinhado com o Ethereum e, obviamente, ter uma ponte que permita mover fundos. No entanto, analisaremos as premissas de confiança e as multisigs, e esperamos que, lenta mas seguramente, os sistemas passem de "outros" para validium/optimium ou para rollups.

É assim que achamos que a categoria "outros" seria — estes são os dados reais agora, os sistemas reais que podem se enquadrar nesta categoria se não introduzirem um sistema de prova. Você verá exatamente quem é o proponente, quem é o desafiante e quem é o atualizador. O engraçado é que você pode ver isso hoje no L2BEAT — é que essa informação está tão escondida na página de detalhes que aposto que apenas pesquisadores e entusiastas a verificam. Está tudo disponível hoje. No entanto, queremos expor os dados aos usuários finais. Queremos que os usuários finais estejam verdadeiramente cientes do que está acontecendo, para que todos sejamos responsáveis pelos sistemas que estamos construindo.

É o suficiente apenas dizer "Eu tenho um sistema de prova"? Não. Nosso compromisso com a comunidade como L2BEAT é que no ano que vem investiremos recursos significativos para realmente olhar com muito cuidado e profundidade para esses sistemas de prova para garantir que eles sejam sólidos e completos. Analisaremos tanto ZK quanto otimista. Entraremos no código-fonte, veremos como você criou sua configuração confiável, olharemos para seus circuitos e veremos o que exatamente está sendo verificado onchain. Queremos tornar tudo super transparente para que as premissas de confiança sejam comunicadas de forma clara — e, mais importante, seu sistema de prova não pode ser escondido atrás de uma lista de permissões (whitelist) excessivamente pequena.

Estamos contratando pesquisadores. Faremos todo esse trabalho. Este é o nosso compromisso para o próximo ano. Espero que o ano que vem seja o ano das L2s e dos rollups — no entanto, não se trata de lançar um rollup com o clique de um botão. O ponto é que você quer ser capaz de lançar um sistema com boa segurança. Idealmente, você quer herdar o máximo de segurança possível do Ethereum. Há muito trabalho a fazer para que todos nós alcancemos isso. Mas se não o fizermos, tudo o que estaremos fazendo é essencialmente criar milhares de sidechains inseguras. Não queremos isso, eu acho, como comunidade.

#### Perguntas e Respostas (18:45) {#qa-1845}

**Apresentador:** Vamos para as perguntas e respostas. É importante que os rollups tenham um sequenciador descentralizado ou outros mecanismos de segurança são suficientes?

**Bartek Kiepuszewski:** Esta é uma pergunta muito boa e importante. Acho que existem designs diferentes que veremos. Não acho que descentralizar o sequenciador seja super importante para a segurança dos fundos dos usuários, mas pode ser importante para a resistência à censura em tempo real em certas situações. Vitalik disse durante sua palestra de abertura que o futuro pode ser que vejamos rollups se tornando baseados (based rollups) — aproveitando a infraestrutura do Ethereum para combater a resistência à censura em tempo real —, enquanto outros, como digamos o MegaETH, podem realmente ter um sequenciador muito centralizado e depender apenas do mecanismo de saída. Podemos ver construções híbridas. Acho que o espaço de design é enorme, e agora no L2BEAT nós realmente queremos ver o que vai acontecer e como isso vai se desenrolar.

**Apresentador:** Os sistemas de prova baseados em TEE serão considerados Estágio 2, mesmo que impliquem confiança no fabricante do hardware?

**Bartek Kiepuszewski:** A resposta curta é não, porque com as construções que vemos hoje, se você estiver usando SGX, a Intel poderia enviar uma prova e eles poderiam potencialmente bloquear, roubar ou congelar o que quisessem sem que ninguém realmente percebesse — e sem que o Ethereum percebesse. No entanto, com todo o trabalho sendo apresentado para criar TEEs sem necessidade de confiança e não permissionados — me disseram que este é um trabalho extremamente empolgante. Mas a resposta curta: hoje, não.

**Apresentador:** Por que a Optimism é classificada como Estágio 1? Com base na avaliação, eles não são — a Fundação controla totalmente o processo de proposta.

**Bartek Kiepuszewski:** Eles essencialmente atendem a todos os critérios. Não se trata realmente do processo de proposta — trata-se de quem está controlando os fundos. Você pode ter um proponente centralizado, no entanto, há um plano de contingência (fallback). Se eles caírem, todo o sistema se tornará mais não permissionado. Acho que é importante reconhecer qual é o papel do conselho de segurança. Queremos que os sistemas de Estágio 1 permitam que você saia se o proponente centralizado parar. Por exemplo, com a dYdX, a proposta era super centralizada, no entanto, quando eles pararam, as pessoas puderam sair. Portanto, não se trata de saber se você é centralizado ou descentralizado — trata-se de saber se você pode realmente sair de uma maneira não permissionada.

Eles atenderam a todos os critérios. Estávamos refinando, a propósito — os critérios não são algo gravado em pedra porque todos esses sistemas estão evoluindo, então precisamos evoluir com esses sistemas. Os critérios podem estar mudando um pouco, e estamos olhando muito de perto tanto para a Optimism quanto para a Arbitrum porque claramente eles são os dois líderes. Há muitas nuances nas quais não tenho tempo de entrar. Mas não é como se você tivesse uma designação de estágio para sempre — se houver novas informações ou algo que possamos ter pulado ou perdido, é bem possível que você perca essa designação.

**Apresentador:** Quais são os principais motivos pelos quais os projetos não constroem em direção ao Estágio 1?

**Bartek Kiepuszewski:** Complexidade, tempo, custo, talento. É surpreendentemente caro. Como eu disse, os pioneiros há quatro anos estavam essencialmente construindo — a dYdX foi literalmente um dos primeiros, se não o primeiro, rollup ZK. Era específico para aplicativos, mas ainda assim foi o primeiro. E se não fosse por pequenas nuances, seria Estágio 2 — na verdade, é o processo de governança que exigimos para o Estágio 2 que está falhando. Mas para todos os efeitos, é um sistema de Estágio 2. Foi construído há quatro anos, então não é como se fosse impossível.

Acho que o que torna super difícil hoje para todos os rollups realmente fazerem isso, francamente, é que a maioria dos rollups não é construída pelas equipes — eles são lançados por provedores de rollup como serviço (rollup-as-a-service), e precisamos incentivá-los a realmente fazer melhor. E é difícil. Ninguém disse que seria fácil.