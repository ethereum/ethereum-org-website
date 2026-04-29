---
title: "Privacidade institucional no Ethereum agora"
description: "Um painel no evento Web3Privacy Now durante a Devconnect 2025, com especialistas discutindo as necessidades reais de privacidade institucional no Ethereum, desde conformidade até provas de conhecimento zero (ZK)."
lang: pt-br
youtubeId: "cZqlg4W1Els"
uploadDate: 2025-11-22
duration: "0:30:50"
educationLevel: advanced
topic:
  - "privacy-and-security"
  - "privacy"
format: panel
author: Web3Privacy Now
breadcrumb: "Privacidade Institucional"
---

Um painel no evento Web3Privacy Now durante a Devconnect 2025, moderado por **Oskar Thorin** (IPTF/EF), com a participação de **Zach Obront** (Etherealize), **Amzah** (ABN Amro), **Eugenio** (European Blockchain Association) e **François** (Polygon Miden) discutindo as necessidades reais de privacidade institucional no Ethereum, desde a conformidade regulatória até provas de conhecimento zero para finanças descentralizadas (DeFi) institucionais.

*Esta transcrição é uma cópia acessível da [transcrição original do vídeo](https://www.youtube.com/watch?v=cZqlg4W1Els) publicada pela Web3Privacy Now. Ela foi levemente editada para facilitar a leitura.*

#### Introdução à Força-Tarefa de Privacidade Institucional (0:03) {#introduction-to-institutional-privacy-task-force-003}

**Oskar Thorin:** Olá. Vocês conseguem me ouvir? Certo. Legal. Então, primeiro faremos uma palestra introdutória bem curta — de uns 3 a 5 minutos — e depois isso nos levará ao painel. Esta é uma palestra resumida. O painel anterior falou muito sobre conformidade, privacidade e assim por diante. Eu dei uma palestra anterior no Cyban Congress que também abordou isso, e haverá uma versão mais longa desta palestra no DeFi Day mais tarde hoje. Mas o que eu quero falar é sobre privacidade institucional no Ethereum.

Meu nome é Oskar e sou o líder da IPTF na Fundação Ethereum. A sigla significa Força-Tarefa de Privacidade Institucional (Institutional Privacy Task Force). E por que a privacidade institucional é importante? Ela é importante por alguns motivos. Acho que um grande motivo é que, se você olhar para essas enormes instituições financeiras que existem, estamos falando de trilhões de dólares em fluxo monetário. Antigamente, a regulamentação era o maior obstáculo para que elas se movessem onchain. Mas o que aconteceu nos últimos anos é que, na verdade, a privacidade é o maior obstáculo para elas.

Então, qual é a alavancagem e o impacto aqui? Acho que apenas mover 1% dos fundos das finanças tradicionais para o Ethereum teria um impacto enorme em termos do impacto que o Ethereum pode ter na privacidade. E apenas ter uma única instituição integrada aqui também atinge milhões de usuários, certo? Isso não é hipotético. Existem instituições que já estão onchain, e há várias coisas acontecendo ao longo do próximo ano ou mais por aqui. A hora para isso é agora, em termos de instituições se movendo onchain com privacidade integrada.

Uma única grande instituição aqui pode ter um impacto enorme sobre qual ecossistema acabará vencendo — seja o Ethereum ou versões mais privadas. Por que elas querem o Ethereum? Há alguns motivos. Coisas como liquidez, resistência à censura, 10 anos de tempo de atividade (uptime) e o fato de ser um diferencial em termos de liquidação. Existem outras alternativas também, mas elas têm limitações diferentes. 

Para que o Ethereum possa fazer a integração dessas instituições, é preciso resolver essas preocupações com a privacidade. O que estamos tentando fazer na Força-Tarefa de Privacidade Institucional é integrar instituições ao Ethereum e garantir que seus objetivos de privacidade sejam alcançados. Fazemos coisas como workshops, tentando desmistificar o espaço e garantir que possamos atender às necessidades institucionais quando se trata especificamente de privacidade. O primeiro artefato que temos é este mapa de privacidade institucional — conversamos com instituições enormes, entendemos seus casos de uso de negócios e requisitos, abrimos o código (open source) o máximo possível e, em seguida, conversamos com fornecedores do espaço para conectar as instituições ao espaço de soluções. 

#### Introduções do Painel e Problemas Institucionais (5:00) {#panel-introductions-and-institutional-problems-500}

**Oskar Thorin:** Desculpe se foi um pouco rápido, mas espero que tenha sido compreensível. Então, este painel tem muitos especialistas em pesquisa, políticas e engenharia, e falaremos sobre privacidade institucional. 

Apenas uma breve introdução: Temos Eugenio, que é o Chefe de Crescimento (Head of Growth) na European Blockchain Association. Temos Zach Obront, CEO da Etherealize, onde ele está construindo produtos institucionais e primitivas de privacidade subjacentes. Temos Amzah, que passou a maior parte de sua carreira em gestão de risco financeiro antes de se envolver profundamente com o Ethereum, e agora está fazendo a ponte entre os controles tradicionais e os mercados nativos do Ethereum. E, finalmente, temos François, um engenheiro de protocolo sênior na Polygon Miden, focado em sistemas de prova de conhecimento zero.

Para começar, em uma frase ou talvez algumas frases, em quais problemas institucionais vocês estão trabalhando que realmente exigem privacidade em infraestruturas públicas em vez de apenas um banco de dados tradicional ou uma cadeia privada? Talvez possamos começar com o François.

**François:** Sim, claro que você sempre pode construir em uma cadeia privada, mas hoje acreditamos que as instituições querem acessar a liquidez global que é oferecida pelo Ethereum e, ao mesmo tempo, manter o que elas têm do mundo das finanças tradicionais, que é um grau de privacidade que lhes permite negociar com liquidez global sem tornar a totalidade de suas negociações pública. Para nós, é por isso que é importante tanto integrar a privacidade quanto construir no Ethereum.

**Eugenio:** Bem, talvez eu possa abordar isso de uma perspectiva diferente — de uma perspectiva de padrões. No processo de padronização, há um conceito muito importante para as instituições, que é a âncora de confiança (trust anchor). Essencialmente, toda instituição tem um grande ambiente offchain, no qual elas ancoram a responsabilidade perante a sociedade para todos que usam seus serviços. Uma parte do grande problema na criação de serviços baseados em blockchain para instituições é como criar um sistema eficiente para transferir via ponte a âncora de confiança para o mundo onchain e, em seguida, como incorporar técnicas criptográficas para garantir que os dados sejam processados de maneira mínima, mas auditável e verificável.

**Zach Obront:** Legal. Então, na Etherealize, estamos focados em atualizar alguns dos funcionamentos internos profundos dos mercados financeiros, especificamente os mercados de crédito. Então, vou abordar isso de duas direções. Uma é: *por que privacidade?* No momento, todos esses mercados funcionam com base em acordos bilaterais. Existem duas partes. Elas estão muito acostumadas com a ideia de que a informação exata que precisa vazar, vaza, e nada mais. E, portanto, a única maneira de considerarem blockchains públicas é se esse nível de privacidade for atendido. 

Da outra direção: *por que estar em uma blockchain pública?* Estes são mercados complexos com partes que não necessariamente confiam umas nas outras e precisam depender de regulamentações em vários países. Ter uma fonte de verdade no centro desses mercados é uma enorme vantagem que você não consegue ter sem uma blockchain pública. No momento, eles estão meio que em um impasse, dizendo: "Existe esse potencial de atualização, mas não podemos fazer isso sem a privacidade de que precisamos." Estamos tentando unir essas coisas.

**Amzah:** Sim. Eu trabalho para o ABN Amro, que é um grande banco holandês. Temos 5 milhões de clientes de varejo. Então, não estamos construindo nada especificamente em privacidade no momento, mas o que está surgindo agora é, por exemplo, uma carteira de identidade digital. Geralmente, como isso funciona é que os dados são armazenados em um banco de dados centralizado e, em seguida, você se conecta com um provedor externo ou um terceiro, mas isso, claro, não é realmente seguro. Então, já estamos começando a pensar em como podemos usar provas de conhecimento zero, por exemplo, para que possamos ter divulgação seletiva com partes externas. Nesse sentido, podemos proteger as informações de nossos clientes e também permitir que eles se conectem com o ambiente mais amplo da Web3.

#### Fluxos de Trabalho Concretos e Armazenamento (10:07) {#concrete-workflows-and-storage-1007}

**Oskar Thorin:** Ok, ótimo. Se você escolher um fluxo concreto com o qual possa se importar — como talvez algumas emissões de títulos, negociações ou pagamentos de tesouraria — quem pode ver o que exatamente em qual etapa, e o que é armazenado onchain versus offchain? Talvez começando com o François.

**François:** Uma ótima maneira de abordar isso é a partir do ponto de vista de querer negociar com uma DEX no Uniswap. O legal é que podemos oferecer na Miden algo que proporciona anonimato total. Temos contas anônimas que negociam entre si por meio de notas. É uma mistura do modelo de conta e do modelo UTXO. 

Se você estiver negociando com uma plataforma (venue), essa plataforma vai querer ser pública. Como uma DEX, você quer republicar os preços toda vez que interagir com alguém. Então você está emitindo notas em um lote (batch). Como usuário, não há nada onchain, exceto o que a plataforma pode ser capaz de descriptografar. A plataforma executa sua negociação e emite notas na saída. Essas notas podem então ser reivindicadas por contas que podem ser totalmente privadas. Assim, você mantém o anonimato total no que diz respeito aos usuários — com exceção da plataforma que decidiu revelar algumas informações publicamente. Além disso, construímos fluxos de conformidade, que incluem fluxos de trabalho de auditoria e políticas de chaves de visualização (view-keys) que permitem a engenharia de mercado em nível local.

**Eugenio:** Bem, talvez eu possa abordar isso mais de uma perspectiva funcional. Geralmente, todo fluxo de emissão ou distribuição para serviços institucionais tem três pilares principais. O primeiro é identidade e confiança, que está conectado ao fluxo de integração para investidores, processos de KYC/KYB e assim por diante.

O segundo é a aplicação de políticas. A conta coleta todas as informações desse ambiente offchain e gera um gatilho para uma declaração de execuções na blockchain. Nesse contexto, técnicas de preservação de privacidade podem tornar a distribuição eficiente. Por exemplo, uma oferta que só pode ser distribuída para determinados tipos de investidores associados a determinados tipos de contas.

O terceiro pilar é a emissão de relatórios (reporting). Isso está associado à integração e às operações de negociação onchain. A cola de todos esses serviços é como extraímos das atestações de dados onchain os pontos de dados de que realmente precisamos offchain para fornecer relatórios tradicionais para nossos clientes no final.

**Zach Obront:** A resposta para isso é muito diferente dependendo de qual fluxo, certo? Este é um dos desafios neste espaço — é difícil ter princípios gerais. Um exemplo de fluxo é um grande empréstimo onde um pagamento de juros é feito, e uma tonelada de credores é dividida. A expectativa é que ninguém deva saber sobre isso. Não há regulamentação em torno disso. É permitido ser totalmente privado, e queremos ser capazes de apoiar esse extremo do espectro. 

No outro extremo, talvez haja uma negociação de posições entre credores, e há expectativas de que certas partes administrativas possam ver que a negociação aconteceu, mas não o preço. Talvez outros possam ver todos os detalhes. Construímos tudo em torno desse modelo flexível onde não queremos codificar rigidamente (hardcoding) regras de conformidade. Queremos dizer que um usuário ou aplicativo pode determinar isso por si mesmo. Temos a capacidade de impor regras para que reguladores ou órgãos administrativos possam ver as coisas, ou até mesmo fornecer dados agregados para associações.

**Amzah:** Sim. Eu concordo em grande parte com o que o Zach disse. No passado, quando as instituições pensavam em privacidade, elas simplesmente iniciavam uma cadeia privada onde talvez 20 bancos participassem e apenas eles pudessem ver o que estava lá. Mas, na verdade, é muito mais sutil. Depende do caso de uso, de que tipo de fluxos e do que o regulador precisa saber. Você pode colocar informações de saldo onchain de uma forma mais agregada usando prova de reservas, por exemplo.

#### Requisitos Inegociáveis (15:26) {#non-negotiable-requirements-1526}

**Oskar Thorin:** Eugenio e Amzah, da parte de bancos, plataformas e reguladores, quais são alguns requisitos inegociáveis que vocês continuam ouvindo repetidamente? Como trilhas de auditoria, regras de KYC ou requisitos de relatórios?

**Eugenio:** Eu diria responsabilidade (accountability) quando se trata do processo de integração, e conformidade associada a relatórios. Para mim, trata-se de enquadrar requisitos de negócios concretos em estruturas técnicas. O diabo está nos detalhes — se o seu usuário é um aplicativo ou um investidor, isso cria um fluxo de processo diferente para o seu ecossistema. O objetivo deve ser construir esse sistema de forma eficiente, caso contrário, seremos bloqueados na adoção. É por isso que a infraestrutura de contas no Ethereum está evoluindo de uma maneira muito legal.

**Amzah:** Sim, não tenho nada a acrescentar a isso. 

**François:** Nosso cofundador passa semanas com clientes no espaço institucional, e a demanda de mais alto nível que surge é "controle". Quem vê o quê, quando e por qual motivo. E então você desdobra essas conversas em detalhes e elas se tornam insanamente personalizadas. Para nós, isso é ótimo porque o mundo das finanças tradicionais passou décadas construindo suas práticas contábeis e fluxos de AML/CTF (Prevenção à Lavagem de Dinheiro/Combate ao Financiamento do Terrorismo). Eles são muito específicos sobre esse controle. Então, estamos construindo essas capacidades na camada do protocolo e apoiando os clientes em sua jornada.

#### Trade-offs e Liquidez Global (18:10) {#trade-offs-and-global-liquidity-1810}

**Oskar Thorin:** Quais são os principais trade-offs com os quais vocês estão lidando atualmente? Desempenho versus privacidade, ou liquidez global versus controles rígidos, ou transparência onchain versus registros offchain? Começando com o Zach.

**Zach Obront:** Felizmente, estamos em um mercado onde a velocidade não é a maior prioridade. Muitos mercados de crédito fazem a liquidação em semanas, então segundos não são a maior preocupação deles. Mas a experiência do usuário (UX) da privacidade é muito difícil. Blockchains são muito boas em manter esse conceito de estado em fila, lidando com mudanças e garantindo que as transações sejam ordenadas corretamente. À medida que começamos a enfileirar transações privadas, as coisas ficam complicadas. Temos que descobrir a melhor experiência do usuário que se integre com a privacidade, especialmente porque as pessoas esperam que os sistemas sejam privados e fáceis de usar ao mesmo tempo.

**François:** Eu queria destacar os trade-offs que nós *não* temos, graças ao Ethereum. As instituições realmente só querem entrar em mercados se valer a pena o tempo delas, o que significa que elas querem um mercado global com efeitos de rede, liquidez profunda e muitas contrapartes. Ser um rollup no Ethereum, em vez de uma cadeia privada ou mais uma camada 1 (l1), nos dá acesso a esse mercado profundo.

Claro, existem complexidades. Nos importamos muito com essa experiência de alto nível (white-glove) para uma instituição que entra nesse mercado, para que elas possam ter suas próprias condições. Um dos desafios é o equilíbrio entre privacidade e resistência a ameaças. Existem agentes de ameaças que existem no mundo da Web3, e queremos lidar melhor com isso para oferecer uma experiência fantástica. Estamos abordando a descentralização com cuidado — sabemos como fazer isso, mas faremos no momento em que melhor atender aos clientes.

#### Confiança no Sistema e Impulsionadores de Adoção (20:47) {#system-trust-and-adoption-drivers-2047}

**Oskar Thorin:** Eugenio, como você torna essas soluções confiáveis e utilizáveis por instituições e governos?

**Eugenio:** Tudo começa por tentar considerar os serviços institucionais como sistemas integrados, onde cada parte do sistema tem sua própria regra de acesso específica. Desde a originação de dados até a compressão de dados na camada 2 (l2) e a descentralização de dados na camada 1 (l1). Se combinarmos esse sistema onde o ambiente offchain mantém a premissa de confiança da instituição, podemos alocar diferentes processos para a camada 2 (l2) e a camada 1 (l1).

**Oskar Thorin:** Amzah, como você vê a questão de tornar os sistemas confiáveis e utilizáveis?

**Amzah:** Para nós, é muito importante que seja personalizável. A blockchain não é mais apenas um caso de uso onde tudo é totalmente público ou totalmente privado. Não existe um tamanho único para todos. O que também é mais importante para nós é estar em conformidade regulatória. O setor bancário na Europa é fortemente regulamentado e, se algo não estiver correto em relação à privacidade, simplesmente não passa pelos reguladores.

#### Olhando para 2026 (23:15) {#looking-ahead-to-2026-2315}

**Oskar Thorin:** Certo, estamos quase no fim. Qual é um bloco de construção — técnico, operacional ou em termos de políticas — que você acha que aceleraria significativamente a adoção institucional? E se nos encontrarmos novamente em 2026, o que você acha realista que teria acontecido este ano?

**Zach Obront:** Acho que "institucional" e "privacidade" são atualmente termos muito amplos, e eles se cruzam de forma diferente em vários casos de uso. Alguns se importam em se conectar a mercados líquidos, enquanto outros apenas querem uma infraestrutura interna melhor. Nos faria avançar obter clareza sobre as situações específicas que estamos tentando resolver. Não houve uma categorização profunda dos requisitos de conformidade. Fazer um esforço para mapear esses requisitos e transformá-los em um protocolo que os suporte elevaria nossa capacidade de construir, em vez de depender de um mundo fragmentado administrado por advogados.

**Amzah:** A tecnologia avançou muito com provas de conhecimento zero e criptografia totalmente homomórfica. Acho que uma das coisas mais importantes a melhorar é a educação para reguladores e instituições. Eles podem ter ouvido falar sobre provas de conhecimento zero, mas não sabem realmente como funcionam. A maioria dos reguladores ainda pensa do ponto de vista legal — se algo quebrar, para quem podemos ligar? E se não houver ninguém para ligar, essa é uma percepção difícil para eles.

**Eugenio:** Do lado tecnológico, a prova e agregação ZK em tempo real realmente nos permitirão construir casos de uso complexos combinando aplicativos, clientes institucionais e a camada 1 (l1). Também apoio o que o Amzah disse sobre educação. Para 2026, eu gostaria de ver um engajamento mais colaborativo entre os projetos para que os aplicativos possam realmente começar a ter acesso à liquidez global e às redes globais.

**François:** Se nos encontrarmos em um ano, eu gostaria de ter lançado a Mainnet da Miden na primavera, para podermos comemorar isso. Além disso, eu gostaria que estivéssemos a caminho da descentralização total. Será necessário um esforço conjunto. A principal coisa que quero ver acontecer é mais engajamento. A ideia de que a privacidade está em conflito com a conformidade não é realmente verdadeira, mas unir as duas dá trabalho. Queremos que as instituições ajudem a moldar o tipo de mercados que desejam ver, porque sabemos que isso será confuso e peculiar às suas necessidades.

#### Considerações Finais (28:05) {#closing-thoughts-2805}

**Oskar Thorin:** Só quero dar a cada um de vocês 10 a 20 segundos para mencionar algo que aconteceu esta semana ou fazer uma rápida divulgação antes de terminarmos.

**Amzah:** Três anos atrás, eu era um voluntário ajudando em uma das primeiras Devconnects. Ver como as pessoas olham para as instituições agora em comparação com aquela época é uma melhoria enorme.

**Zach Obront:** É simplesmente incrível quanta privacidade está no ar este ano. Minha formação é em segurança, e há uma falta de pesquisadores de segurança que entendam essas coisas. Qualquer pessoa nessa interseção, eu encorajo você a mergulhar de cabeça.

**Eugenio:** Vou escolher a organização regulatória de dados — acho que há muita esperança para ZKP em um domínio de dados em conformidade, e a camada de interoperabilidade do Ethereum ajudará a trazer as instituições onchain.

**François:** É muito difícil como engenheiro; geralmente você ouve falar sobre um assunto de nicho. Lançamos pré-compilados (precompiles) na Miden recentemente, o que abre a verificação de fluxos que envolvem aprendizado de máquina (machine learning). Se você é um nerd extremo como eu, você realmente quer fazer aprendizado de máquina e provas de aprendizado de máquina, e isso agora é algo que podemos fazer.

**Oskar Thorin:** Quero agradecer a todos os painelistas. Ouvimos algumas perspectivas muito interessantes sobre tecnologia, políticas e engenharia. Apenas arranhamos a superfície, mas recomendo que conversem mais se estiverem interessados neste tópico. Obrigado.