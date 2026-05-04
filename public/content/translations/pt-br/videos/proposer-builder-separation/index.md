---
title: "Além do protocolo Ethereum: separação propositor-construtor"
description: "Uma apresentação sobre a separação propositor-construtor (PBS), um padrão de design que separa as funções de construção de blocos e proposição de blocos no Ethereum."
lang: pt-br
youtubeId: "u8XvkTrjITs"
uploadDate: 2024-02-05
duration: "0:22:47"
educationLevel: advanced
topic:
  - "roadmap"
  - "pbs"
  - "mev"
format: presentation
author: CBER Forum
breadcrumb: "PBS Explicado"
---

Esta apresentação explica como a produção de blocos do Ethereum evoluiu de um modelo simples para uma cadeia de suprimentos sofisticada envolvendo validadores, construtores, buscadores e relays. Barnabé Monnot da Fundação Ethereum explica por que a separação propositor-construtor existe, como os relays do MEV-Boost mediam o relacionamento entre proponentes e construtores, e quais soluções no protocolo estão sendo exploradas para reduzir as dependências de confiança e melhorar a resistência à censura, a distribuição de MEV e a descentralização dos validadores.

*Esta transcrição é uma cópia acessível da [transcrição original do vídeo](https://www.youtube.com/watch?v=u8XvkTrjITs) publicada pelo CBER Forum. Ela foi levemente editada para facilitar a leitura.*

#### Introdução (0:00) {#introduction-000}

Meu nome é Barnabé Monnot. Vou falar um pouco sobre o que está acontecendo fora do protocolo e, em particular, sobre o conceito de separação propositor-construtor e como ele é operado com relays e muita infraestrutura offchain.

Gosto de pensar no protocolo como um objeto abstrato que tem certos poderes. Um dos poderes que o protocolo tem é a capacidade de conceder direitos a certos participantes. Vimos na palestra anterior que o protocolo capacita os validadores a realizar tarefas de consenso, mas não é a única coisa que eles fazem — também temos que preencher os blocos com transações. Chamamos isso de tarefas de execução, e é nisso que quero focar nesta palestra.

#### Por que os validadores usam construtores (0:46) {#why-validators-use-builders-046}

O que é interessante é que, embora o protocolo seja o que origina esses direitos e os conceda aos validadores, o que observamos na prática é que muitos validadores optam por não exercer o direito por si mesmos. Eles escolhem dar o direito a outra pessoa para executá-lo em seu nome. E por "outra pessoa", nós os conhecemos no Ethereum como construtores.

Então, o que observamos é que, embora os validadores continuem a realizar essas tarefas de consenso por si mesmos, eles decidem repassar as tarefas de execução para os construtores. Na verdade, é um mercado bastante significativo. Hoje, cerca de 90% dos blocos são construídos por construtores externos, e esse tem sido o caso desde cerca de dezembro de 2022 — três meses após o The Merge. O pagamento mediano do construtor para o validador é de cerca de US$ 120 por bloco. Há um milhão de dólares pagos diariamente e, a cada 12 segundos, existe a possibilidade de esse mercado chegar a algum tipo de acordo entre um proponente e um construtor.

Hoje quero discutir por que os validadores usam construtores, de onde vem esse relacionamento — vou introduzir um pouco sobre MEV e buscadores ao longo do caminho — então direi como esse relacionamento é mediado e falarei sobre os relays que existem hoje e as soluções no protocolo nas quais estamos pensando. Também quero ter uma visão mais ampla, porque é fácil ver essas imagens e pensar "oh, isso é muito assustador, e quanto à descentralização?". Quero dar a vocês a sensação de que essas são compensações que estão sendo feitas, mas, na minha opinião, estão sendo feitas na direção certa.

#### O modelo ingênuo e o MEV (3:04) {#the-naive-model-and-mev-304}

Você pode pensar em um modelo ingênuo de produção de blocos onde o validador é selecionado de acordo com um processo de seleção de líder, e ele tem que fazer um bloco contendo uma lista de transações da mempool. No modelo mais ingênuo, você realmente só tem duas partes — um validador ouvindo a mempool e, quando chega a sua vez de fazer um bloco, ele retira as transações que pagam as maiores taxas e as adiciona, geralmente usando algoritmos de empacotamento não muito sofisticados.

O que foi observado de forma bastante dramática nos últimos cinco anos é que isso dá muito poder ao produtor — em particular, o poder da última olhada. Eles veem o que os usuários querem fazer, por exemplo, veem que o usuário quer fazer uma troca de algo, e podem usar essa informação para extrair lucro para si mesmos.

No melhor dos casos, esse lucro vem da função natural do mercado, como a arbitragem. No pior dos casos, pode sair diretamente do bolso do usuário, como no caso de ataques sanduíche. Por exemplo, um usuário faz uma ordem de troca para o token A pelo token B em algum mercado como o Uniswap. Essa transação criará um desequilíbrio de preço com outro mercado implantado na mesma cadeia. O produtor pode ver a transação pendente e inserir sua própria transação que faz uma troca na outra direção em um mercado diferente, embolsando a arbitragem ao longo do caminho.

Isso realmente dá muito poder ao produtor e torna a posição de ser o produtor de blocos extremamente valiosa. Esse privilégio do produtor é algo que agora chamamos de **valor máximo extraível (MEV)**.

#### O papel dos buscadores (5:43) {#the-role-of-searchers-543}

Na prática, os produtores podem não saber onde está o valor. Você pode ter produtores de blocos um tanto inexperientes — como mencionado, qualquer um pode se tornar um validador, desde que tenha capital suficiente e seja capaz de executar um nó. Na prática, eu posso não saber como fazer arbitragem ou qualquer coisa sobre mercados financeiros. O que eu gostaria é que alguém me dissesse onde estão essas oportunidades — um mercado de pessoas competindo para me dizer qual é a melhor coisa a fazer como produtor de blocos.

Essas entidades que são muito boas em encontrar oportunidades, nós as chamamos de **buscadores**. Eles trazem oportunidades à tona para o produtor de blocos. O buscador pode observar um usuário fazendo uma troca, seja através da mempool pública ou através de dark pools ou canais privados, e então comunicar ao validador: "Há uma troca acontecendo — se você empacotar essa troca junto com essa arbitragem em um pacote de transações atômicas e incluir esse pacote, então você pode ganhar dinheiro com a arbitragem." Você terá muitos buscadores competindo para convencer o produtor de blocos.

Esse modelo funciona bem na prática se o buscador confiar no produtor para manter o pacote atômico. Você pode ter ouvido falar recentemente de um ataque no Ethereum que custou US$ 25 milhões a um grupo de atacantes sanduíche — a causa raiz foi que o invasor conseguiu quebrar a atomicidade dos pacotes, recebendo o conteúdo e tentando reorganizá-los e modificá-los. Essa é uma propriedade muito importante que realmente só se mantém enquanto se puder confiar que o produtor não quebrará essa atomicidade.

#### Por que precisamos de construtores (8:16) {#why-we-need-builders-816}

O que você faz se um produtor não for confiável? Pós-The Merge no Ethereum, temos stakers individuais — cerca de 6% da rede — que não conhecemos. Os buscadores não vão querer enviar pacotes para esses proponentes de blocos porque é um pouco perigoso demais.

Então, o design a que se chegou é: em vez de ter buscadores comunicando pacotes que o produtor inclui em seu bloco, nós simplesmente faremos o bloco inteiro para você. Dessa forma, você pode simplesmente assinar o bloco às cegas — você não precisa saber o que há lá dentro, você confia que o construtor está lhe dando um bom bloco.

Agora você tem essa cadeia ainda mais profunda: o validador em uma ponta, o usuário na outra, e no meio toda essa cadeia de intermediários que continua a ficar mais densa com o tempo. O construtor faz a parte de execução enquanto o validador faz o consenso.

#### Como funcionam os relays do MEV-Boost (13:01) {#how-mev-boost-relays-work-1301}

Digamos que você seja um proponente e queira entrar neste mercado. Esse serviço de produção de blocos é um problema clássico de troca justa — duas partes tentando chegar a um acordo, mas não confiam uma na outra. A literatura clássica diz que você não pode fazer uma troca justa sem um terceiro confiável.

O que usamos hoje como o terceiro confiável é o que chamamos de **relay** — o relay do MEV-Boost. MEV-Boost é o nome do protocolo que media as interações entre construtores e validadores. O relay fica no meio para garantir que o acordo seja cumprido por ambos os lados.

O relay tem algumas funções. Primeiro, ele precisa validar o payload de um construtor — o relay vê claramente o bloco que o construtor está fazendo e pode verificar se é válido e se pode ser proposto à rede. Há uma variação chamada relay otimista, onde o relay não verifica imediatamente a validade, mas pede ao construtor um colateral caso o bloco seja eventualmente inválido.

Segundo, os construtores estão fazendo lances tentando competir para se tornarem o construtor selecionado pelo validador. O relay atua como um encaminhador de lances, enviando os lances para o validador. Então, na última etapa, uma vez que o validador escolhe um dos lances do relay — e o validador pode se conectar a quantos relays quiser —, ele o assina, ainda sem saber qual é o conteúdo do bloco, e envia o lance assinado de volta ao relay. Dado esse lance assinado, o relay pode liberar o bloco para a rede.

A economia dos relays é complicada. Alguns são gratuitos, como bens públicos. Outros desenvolveram modelos de receita — o relay Ultrasound, por exemplo, tem um "ajuste de lance" onde eles pegam a diferença entre o melhor lance e o segundo melhor como receita.

#### Confiança e o relay (17:01) {#trust-and-the-relay-1701}

O relay é o terceiro confiável no sistema. Digamos que um relay sirva um bloco inválido — as pessoas verão imediatamente porque ele está assinado, e elas se desconectarão muito rapidamente desse relay. Você pode até propagar algum tipo de prova de falha. Dentro de cinco blocos, se o relay não tiver um bom desempenho, as pessoas deixarão de confiar nele e simplesmente se desconectarão.

Portanto, é baseado na confiança, mas com a suposição de que pode ser substituído de forma um tanto rápida. Os relays não são validadores — eles não têm necessariamente stake e não precisam ter nada a ver com o Ethereum. Podem ser pessoas que conhecemos e amamos hoje, mas amanhã pode ser qualquer um.

#### Consagrando a PBS no protocolo (20:01) {#enshrining-pbs-in-the-protocol-2001}

Estamos tentando eliminar o status de terceiro confiável do relay. Temos um terceiro confiável de que gostamos no Ethereum — e é o próprio Ethereum. Você pode projetar soluções no protocolo que tentam essencialmente consagrar o papel do relay e tornar a dependência dele opcional.

No momento, o protocolo Ethereum vê parte do que os validadores estão fazendo, mas é completamente cego para a rede de construtores. Estamos tentando impulsioná-lo para que o protocolo Ethereum se torne o terceiro confiável na interação entre proponente e construtor — nesse sentido, não precisamos mais depender do relay.

#### Restringindo construtores, ampliando a descentralização (22:05) {#constraining-builders-amplifying-decentralization-2205}

A visão geral é importante. Em cada camada, parece haver jogos diferentes acontecendo e jogadores diferentes tirando dinheiro uns dos outros — isso é a finança tradicional tudo de novo? Quero argumentar que essas compensações não vêm de um lugar ruim. Elas tentam se apoiar em propriedades desses sistemas que achamos úteis para escalá-los e torná-los mais úteis.

Vitalik falou sobre uma assimetria fundamental de serviços que uma blockchain pode oferecer. O consenso exige um conjunto descentralizado muito grande de pessoas mantendo o controle. Mas alguns serviços realmente exigem que uma pessoa faça o trabalho bem feito e que todos os outros verifiquem se o trabalho foi bem feito. Precisamos de apenas um construtor para fazer um bloco, e então todos podem verificar se ele é válido.

Hoje existem claramente três construtores dominantes: Beaver Build, Titan e rsync Builder. Esse é um bom estado das coisas? Na verdade não — podemos fazer melhor. Mas é realista imaginar que teremos tantos construtores quanto validadores? Provavelmente não.

O que realmente queremos é essa fina camada de validadores restringindo e aproveitando o fato de que existem partes de alto poder no meio que podem realizar tarefas que não exigem suposições de maioria honesta.

Algumas ideias para restringir construtores:

- **Listas de inclusão** — onde o validador diz ao construtor "você tem que incluir essas transações no seu bloco"
- **Construção parcial de blocos** — dividir o bloco completo para que o construtor não tenha monopólio sobre todo o espaço
- **Reduzir dependências de terceiros** — consagrar o papel do relay no protocolo

Para ampliar a descentralização dos validadores:

- **Separação atestador-proponente** — em vez de tornar o validador o produtor de blocos por padrão, escolher um conjunto diferente de pessoas para se tornarem produtores de blocos e desmembrar as funções
- **Mecanismos de staking aprimorados** — o staking no Ethereum é um pouco rudimentar hoje e pode ser melhorado

#### Perguntas e encerramento (27:03) {#questions-and-closing-2703}

Uma pergunta do público: no mundo das finanças tradicionais, o tempo de liquidação está sendo reduzido de dois dias para um dia. Reduzir o tempo de liquidação de 12 segundos para um intervalo mais curto lidaria com alguns dos problemas de front-running?

As pessoas estão falando sobre isso — elas chamam de **pré-confirmações**. A ideia é que você envia sua transação e alguém lhe diz "você está dentro, a este preço, naquele estado". A questão é que você não pode liquidar mais rápido do que o protocolo está rodando. Você não pode obter uma liquidação de finalidade mais rápida do que 12 minutos. Você não pode se mover mais rápido do que o tempo de bloco.

Encurtar o tempo de bloco é difícil porque queremos manter a camada de validadores o mais descentralizada possível, e encurtá-lo apenas aumenta os requisitos de hardware.