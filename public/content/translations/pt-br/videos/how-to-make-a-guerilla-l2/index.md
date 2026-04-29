---
title: "Como criar uma l2 de guerrilha"
description: "Fatemeh Fannizadeh e Melanie Premsyl falam sobre a construção de redes de camada 2 (l2) como ferramentas para privacidade, liberdade e resistência, reimaginando a infraestrutura da blockchain através de uma lente cypherpunk e ativista."
lang: pt-br
youtubeId: "WlsICV2OPAE"
uploadDate: 2025-11-23
duration: "0:15:55"
educationLevel: intermediate
topic:
  - "privacidade-e-seguranca"
  - "escalabilidade-e-camada-2"
  - "privacidade"
  - "camada-2"
format: interview
author: Web3Privacy Now
breadcrumb: "L2 de guerrilha"
---

**Fatemeh Fannizadeh** e **Melanie Premsyl** apresentam no Ethereum Cypherpunk Congress (ECC#2) em Buenos Aires sobre a construção de redes de camada 2 (l2) como ferramentas para privacidade, liberdade e resistência, reimaginando a infraestrutura da blockchain através de uma lente cypherpunk e ativista, com uma exploração detalhada da interseção entre a filosofia anarquista e a arquitetura da blockchain.

*Esta transcrição é uma cópia acessível da [transcrição original do vídeo](https://www.youtube.com/watch?v=WlsICV2OPAE) publicada pela Web3Privacy Now. Ela foi levemente editada para facilitar a leitura.*

#### Introdução e filosofia anarquista (0:05) {#introduction-and-anarchist-philosophy-005}

**Fatemeh Fannizadeh:** [Aplausos] Bem, obrigada por estarem aqui. Eu sei que o Vitalik está falando agora. É realmente uma honra ter alguns de vocês aqui e não na fila do matcha ali. Vamos ter uma conversa hoje sobre l2s de guerrilha, e acho que vamos chegar lá, mas apresento a vocês Melanie Premsyl, filósofa francesa e anarquista, que nos dá a honra de se juntar a nós aqui. Você quer fazer uma pequena introdução sobre si mesma?

**Melanie Premsyl:** Sim. Olá a todos. Então, sou uma filósofa francesa. Estou estudando anarquia e tecnologia, e no começo eu estava mais do lado do território. Como no centro da França, por exemplo, não sei se vocês conhecem Tarnac, ou todo esse tipo de grupo que é mais violento. O principal problema que encontrei foi que precisamos estar conectados com outras pessoas no mundo, e muitos grupos anarquistas são muito limitados. Precisamos de uma maneira de nos comunicar com mais pessoas da América ou da América do Sul. E é por isso que agora estamos tentando criar uma ponte com cripto e com todos que estão tentando encontrar novas maneiras de lutar contra a falta de privacidade, a falta de liberdade e a violência do estado.

#### O julgamento dos irmãos MEV (1:52) {#the-mev-brothers-trial-152}

**Fatemeh Fannizadeh:** Incrível. Então, basicamente, nos conhecemos há algumas semanas em Nova York. Nós duas estávamos participando de um julgamento que estava acontecendo em Manhattan, onde esses dois irmãos, conhecidos como os irmãos MEV, estavam sendo processados porque fizeram um ataque sanduíche em alguns bots de sanduíche. Fui ao tribunal para assistir ao julgamento e vi essa pessoa aqui lendo Spinoza em francês, e fiquei muito curiosa sobre o que estava acontecendo. Não havia ninguém na plateia além de nós duas! Então fiquei muito curiosa sobre o que levou você, antes de tudo uma anarquista e filósofa em vez de uma tecnóloga, a basicamente vir assistir a este julgamento específico, mas também a pensar sobre a governança do Ethereum e todo o sistema de validação e o julgamento que estava acontecendo em Nova York. 

**Melanie Premsyl:** Acho que eu estava apenas tentando entender se há alguma maneira de os Estados Unidos estarem tentando controlar o Ethereum. Porque na Europa, estamos muito fora do jogo com cripto no sentido de que não temos uma legislação, e eu estava apenas verificando. 

**Fatemeh Fannizadeh:** Então você acha que os Estados Unidos estão tentando controlar o Ethereum? 

**Melanie Premsyl:** Acho que é uma grande questão. Acho que os Estados Unidos estão tentando controlar todo mundo. 

**Fatemeh Fannizadeh:** Certo. Sim, é justo. Então, para aqueles que não acompanharam o julgamento, depois de umas três ou quatro semanas, foi anulado. O júri não conseguiu chegar a um veredicto unânime e decidir se esses dois irmãos eram culpados ou não de violar as regras da blockchain — o que é um resultado meio positivo, eu acho, para cripto, que um tribunal ou um júri não decida o que é certo e o que é errado onchain. 

#### Criando pontes entre a blockchain e outras comunidades (4:06) {#bridging-blockchain-with-other-communities-406}

**Fatemeh Fannizadeh:** Mas tudo bem, se dermos um passo atrás sobre o que você disse dos anarquistas analisando essa tecnologia para basicamente criar uma ponte entre diferentes grupos. 

**Melanie Premsyl:** Sim. Então, acho que estou aqui apenas com um propósito. Não sou uma garota da tecnologia, ou não faço parte do jogo de cripto, mas o que eu estava observando com outro ponto de vista é que a blockchain tem um poder realmente disruptivo, mas não é capaz de alcançar outras comunidades que são mais territorializadas. Acho que um dos propósitos é criar uma blockchain colorida, como o motivo pelo qual queremos falar sobre l2s, como criar novas comunidades com outras origens, com outra imaginação e imaginários.

**Fatemeh Fannizadeh:** Quero dizer, é realmente incrível para mim ter você aqui na Devconnect, para ser honesta, porque você traz esse tipo de perspectiva nova sobre esta comunidade e o que estamos fazendo e nossos eventos. Ontem passamos muito tempo pulando de evento em evento, e eu recebi seu feedback — algo que não estou mais equipada para ver, porque estamos lidando com esse teatro basicamente há muitos anos. Somos todos amigos, então somos todos muito gentis uns com os outros. Mas essa perspectiva crítica é incrível. Acho que podemos nos beneficiar disso, especialmente porque fiquei muito animada ao ver que anarquistas ou talvez pessoas mais de esquerda ainda estão realmente interessadas em nossa tecnologia. Embora, apesar de quaisquer brigas que existam no Twitter de cripto, talvez seja melhor você não estar ciente de todo esse lado da comunidade. Mas brigas sobre o Ethereum ser uma tecnologia comunista — isso soa verdadeiro para você? Você acha que não há problema em dizer que o Ethereum é uma tecnologia comunista? 

**Melanie Premsyl:** Sim, eu gostaria de dizer isso, mas não tenho certeza, porque você sabe que há muitas pessoas que precisam ganhar dinheiro, então esse é o propósito principal também. Mas acho que poderíamos apenas usá-lo como uma rede comunista, que apenas uma parte poderia ser esse tipo de sonho. Acho que é um bolo dos sonhos que pode ser feito, mas precisamos ter ferramentas e design que ajudem as pessoas a sair do pensamento técnico, muito voltado para a engenharia, para entender como é.

#### Descentralização e camadas 2 (6:55) {#decentralization-and-layer-2s-655}

**Fatemeh Fannizadeh:** Isso me lembra muito as DAOs alguns anos atrás. Não sei quanto a vocês, mas eu estava muito animada, achava que as DAOs estavam revolucionando a maneira como nos organizamos como grupos e comunidades onchain e a liberdade que temos. E no final, tudo isso simplesmente não deu em nada. Não acho que se manifestou de forma alguma. Tornou-se mais sobre o sistema de votação, não é realmente democrático, é tudo sobre obter lucro. Toda essa ideia que tínhamos das DAOs como uma ferramenta social não se manifestou de verdade. 

**Fatemeh Fannizadeh:** Mas acho que conversamos muito recentemente sobre essas ferramentas que a blockchain nos dá e como podemos imaginar a blockchain evoluindo em cinco a dez anos, e muitas conversas estão acontecendo sobre o Ethereum se tornar privado. Acho que este é definitivamente o caminho a seguir: a camada 1 (l1) ser uma l1 centrada na privacidade. E também há o roteiro centrado em rollups. Então, como as l2s e os rollups se tornarão os principais usuários do Ethereum em vez dos usuários finais. Os usuários finais então passarão a, em vez de fazer parte de DAOs na l1, fazer parte de vários rollups ou l2s. Então, como podemos essencialmente projetar nossa imaginação nesse tipo de futuro do Ethereum para construir o que você disse, esse espaço anarquista subcomunista de liberdade? 

**Melanie Premsyl:** Então, eu sou francesa. Isso é um grande problema. Sendo franceses, somos uma nação muito voltada para o estado. Então, estou sempre pensando de uma maneira pedagógica e muito de cima para baixo. E acho que a l2 cria uma maneira de que todos possam criar mini blockchains, e elas são protegidas pela camada 1 (l1). Eu gostaria de ver se as pessoas podem criar ajuda pedagógica para todos para algo que é gratuito. Acho que muitos grupos, como associações, poderiam criar sua própria blockchain, e seria uma maneira — como você sabe, o federalismo é o grande assunto principal do anarquismo. Como as pessoas podem conseguir se odiar, talvez, mas falar umas com as outras. Então precisamos ter esse tipo de federalismo na blockchain. Todo mundo tem uma camada 2 (l2) com seu próprio valor, e assim falamos com a mesma infraestrutura. 

#### Anarquia, liberdade e construção de ferramentas (9:53) {#anarchy-freedom-and-building-tooling-953}

**Fatemeh Fannizadeh:** Sim, eu realmente gosto do que você disse sobre basicamente nos odiarmos, mas ainda assim nos comunicarmos, como não sermos tóxicos apesar de nossas diferenças. E o fato de haver apenas uma l1 neste cenário, que seria o Ethereum, também é frequentemente dito como fascista porque todos nós precisamos concordar com este único conjunto de regras. Então é este sistema único que é igual para todos, e você tem que basicamente se submeter a esta l1 ou pode se afastar, essa é uma outra questão. Mas se pudermos descentralizar isso em um ecossistema variado de pequenos rollups e l2s, então podemos trazer de volta a dissonância e a discordância dentro dessa infraestrutura comum. 

**Melanie Premsyl:** Sim, claro. Acho que vocês são ótimos. Acho que há uma grande responsabilidade para as pessoas de tecnologia que têm uma maneira verdadeira de pensar. Vocês são os únicos hoje em dia que estão tentando fazer algo bom, e por isso não podem ficar apenas na sua própria imaginação. E como você diz, talvez o problema do fascismo — como somos apenas um, vocês têm uma grande responsabilidade. Não é apenas usar o Ethereum ou apenas a privacidade, é como se estivéssemos criando o novo mundo tecnológico e temos que escolher se haverá apenas pessoas de tecnologia, ou se as pessoas de tecnologia estarão conectadas com todos que querem mais liberdade.

**Fatemeh Fannizadeh:** Então mencionamos muito comunismo e anarquismo, e esses são quase como palavrões em cripto, eu sinto. Sabe, é tão manchado e você recebe críticas instantâneas se mencionar esse conceito. E não sei, talvez eu esteja errada, mas quando entrei em cripto, havia mais hackers e a estética anarquista estava mais presente. A vibe era mais — era legal ser assim, então muitas pessoas se identificavam com isso. Hoje em dia sinto que ainda há muitos por aí, mas talvez mais enrustidos. Tipo, tem algum anarquista enrustido na sala? Não sei! Acho que sim. Então eu diria que talvez devêssemos dar um passo atrás, se você puder definir o que é realmente comunismo ou anarquismo.

**Melanie Premsyl:** Sim. Não, acho que o anarquismo não é bem conhecido no sentido de que é muito simples. É apenas quando chegamos a ter uma auto-organização. Então, quando há bolsões de liberdade, bolsões de anarquia, como quando as pessoas estão apenas conversando com amigos, com uma associação, no trabalho também, e não precisam de alguém para ser o chefe, o líder para entender e decidir. Porque no final, o problema humano é que as pessoas querem ter um chefe. O anarquismo está apenas tentando lutar contra esse desejo profundo de ser controlado pelo outro. Nós realmente queremos ser livres? Essa é a questão, e como podemos conseguir fazer isso juntos? 

**Fatemeh Fannizadeh:** Algo que você disse ontem também que foi muito relevante, eu acho, é que todo mundo vive a anarquia em suas vidas. Algumas pessoas dizem: "Ah, anarquia, estamos tão longe disso. Você é apenas reacionário, anti-establishment, anti-estado." Mas, na verdade, todo mundo, seja em sua família, em suas amizades, em alguma forma de relacionamento, está navegando em um reino de certa forma sem leis, de anarquia, onde as regras são criadas através da dinâmica interpessoal. Então todo mundo tem algum nível de anarquia em sua vida, e acho que começando por aí, talvez se torne mais tangível também falar sobre isso.

**Melanie Premsyl:** Sim. Sim. É por isso que acho que a blockchain é verdadeiramente anarquista, nessa maneira de pensar. 

**Fatemeh Fannizadeh:** Certo. Incrível. Acho que esta é a frase perfeita talvez para terminar. A blockchain é anarquista. E também para encerrar isso, acho que o que é realmente importante ou o que eu realmente adoraria ver na blockchain seria mais ferramentas. Porque é difícil para mim imaginar grupos anarquistas ou grupos soberanos mais autônomos vindo e sendo apenas usuários de um produto. Não há necessariamente uma adequação ao mercado nesse sentido. É muito improvável que eles simplesmente adotem um produto totalmente pronto. Em vez disso, se você der a eles a matéria-prima para construir o seu próprio. Então é mais como faça você mesmo (DIY), construa suas próprias ferramentas, seu próprio rollup de l2, como quer que você queira chamar. Acho que isso tornaria cripto ainda mais alinhada conosco. Merci beaucoup. [Aplausos]