---
title: "A próxima atualização do Ethereum: espaço de blob 101"
description: "Domothy explica o espaço de blob, a nova camada de disponibilidade de dados introduzida pela atualização Dencun do Ethereum, cobrindo como as transações de blob funcionam, por que elas são importantes para a escalabilidade do Ethereum e o que vem a seguir para a disponibilidade de dados."
lang: pt-br
youtubeId: "dFjyUY3e53Q"
uploadDate: 2024-02-27
duration: "1:02:31"
educationLevel: intermediate
topic:
  - "escalabilidade"
  - "blobs"
  - "dencun"
  - "atualizações"
format: interview
author: Bankless
breadcrumb: "Espaço de blob 101"
---

Esta entrevista aborda o recurso de espaço de blob do Ethereum, introduzido com a [EIP-4844 (Proto-Danksharding)](https://www.eip4844.com/). O pesquisador do Ethereum, Domothy, junta-se a David Hoffman e Ryan Sean Adams no podcast Bankless para explicar a história do roteiro centrado em rollups, a mecânica técnica dos blobs e as implicações econômicas de separar o espaço de bloco do espaço de blob.

*Esta transcrição é uma cópia acessível da [transcrição original do vídeo](https://www.youtube.com/watch?v=dFjyUY3e53Q) publicada pelo Bankless. Ela foi levemente editada para facilitar a leitura.*

#### Introdução ao espaço de blob (0:00) {#introduction-to-blob-space-000}

**Ryan Sean Adams:** Bem-vindo ao Bankless, onde exploramos a fronteira do dinheiro e das finanças da internet. É aqui que você aprende como começar, como melhorar e como se antecipar às oportunidades. Estou aqui com David Hoffman, e estamos aqui para ajudá-lo a se tornar mais *bankless*. Sabe como dizemos que as blockchains vendem blocos? Bem, em breve o Ethereum venderá mais do que apenas blocos — ele também venderá blobs.

**David Hoffman:** Isso mesmo, blobs. Estamos a apenas alguns meses do maior lançamento do Ethereum desde The Merge, e acho que ninguém mapeou totalmente as implicações disso, mas será enorme. O Ethereum está ganhando um novo produto para vender. Chama-se espaço de blob, e isso é um acréscimo ao espaço de bloco. O custo das transações nas camadas 2 (l2) está prestes a cair para quase zero. A economia do gás de ETH e a queima estão prestes a mudar para sempre. Estamos chamando essa atualização de atualização do espaço de blob, EIP-4844, Proto-Danksharding. Queremos cobrir tudo o que você precisa saber sobre o espaço de blob.

**Ryan Sean Adams:** Algumas conclusões aqui. Número um, nós analisamos o que é o espaço de blob. Número dois, nós analisamos a história de como realmente chegamos aqui — este roteiro centrado em rollups. Número três, nós analisamos a economia. O que isso significa para a economia do Ethereum, para o acúmulo de valor do ETH, para o ETH como ativo? David, por que este episódio foi significativo para você?

**David Hoffman:** Acho que se há algum setor de conversa que você e eu realmente amamos, é a interseção da criptografia e da economia — como números e manifestações econômicas. Eu adoro interagir com esses protocolos.

**Ryan Sean Adams:** Sim, essa é a nossa linguagem do amor.

**David Hoffman:** Nós já falamos sobre a EIP-4844, já falamos sobre o Proto-Danksharding. São a mesma coisa. Nós o definimos várias vezes em diferentes capacidades. Mas nunca fizemos um mergulho profundo e agressivo na toca do coelho para sair do outro lado respondendo ao lado econômico. Então, nós escalamos tecnicamente a disponibilidade de dados em um nível técnico — isso é uma melhoria de protocolo. Mas como isso se conecta ao lado de mercado do Ethereum? O mercado único agora está sendo fraturado em dois: o espaço de bloco e o espaço de blob agora são dois mercados independentes e diferentes que estão contidos dentro de um bloco do Ethereum.

O que isso significa para o ether? O que isso significa para os mercados que surgem em torno dessas coisas? Como o equilíbrio da oferta e da demanda de cada um interage e influencia o outro? O que isso faz pela escalabilidade da camada 2 (l2)? O que isso faz pelos casos de uso econômico em cima das camadas 2 (l2)? Vamos começar com o básico, mas depois vamos sair do outro lado da toca do coelho para o lado econômico desta conversa.

Vamos trazer nosso convidado, Dom, também conhecido como Domothy. Ele é um pesquisador da Fundação Ethereum trabalhando na pesquisa e desenvolvimento das principais atualizações do Ethereum que estão por vir, incluindo a EIP-4844 (o assunto de hoje), o danksharding completo e a queima de MEV.

#### A história do roteiro centrado em rollups (10:00) {#the-history-of-the-rollup-centric-roadmap-1000}

**Ryan Sean Adams:** Então, Dom, para entender completamente como chegamos ao espaço de blob, acho que vale a pena voltar no tempo para entender a totalidade do roteiro do Ethereum, porque ele chegou a uma conclusão muito lógica de blobs e espaço de blob. Você pode nos levar de volta? Porque em um determinado momento, o roteiro centrado em rollups do Ethereum não existia. Tínhamos essa coisa chamada fragmentação de execução, que na verdade nunca tivemos. Onde na história do roteiro do Ethereum é apropriado para realmente entender o contexto completo do espaço de blob?

**Domothy:** Claro. Mesmo antes do lançamento do Ethereum, já havia ideias sobre como escalá-lo, porque todos sabiam, mesmo naquela época, que uma única blockchain com cada nó executando tudo não seria suficiente. Então, inicialmente, havia um monte de ideias diferentes para fragmentação. A primeira tentativa de realmente especificar isso foi a fragmentação com execução, onde você basicamente tem, digamos, 64 cadeias independentes diferentes e elas tentam se comunicar entre si. Acontece que isso é difícil de fazer — há muita complexidade envolvida.

Isso foi dividido em diferentes fases. Primeiro, vamos lançar uma Beacon Chain, depois descobrir como realmente fundi-la com a camada de execução atual. Em seguida, faremos a Fase Um, que é apenas a fragmentação de dados — ou seja, sem execução, apenas blockchains menores contendo dados. E então descobrir como fazer a fragmentação de execução. Foi muito de descobrir as coisas à medida que avançávamos, mas com segurança para não fazermos algo de que nos arrependeríamos mais tarde e quebraríamos toda a blockchain, porque há muita atividade econômica nela.

**David Hoffman:** Para fornecer detalhes sobre a fragmentação de execução — é o embaralhamento de validadores aleatoriamente em fragmentos distintos da blockchain, com cada fragmento sendo essencialmente sua própria mini-blockchain rodando em paralelo à Beacon Chain. Parece um pouco com o que temos hoje com os rollups, mas a diferença aqui é que os fragmentos do Ethereum são, na verdade, parte do protocolo da camada 1 (l1). O protocolo da camada 1 (l1) determina o que são os fragmentos, enquanto os rollups são separados. Originalmente, seriam 64 desses fragmentos operados, gerenciados e produzidos pelo protocolo da camada 1 (l1) do Ethereum. Estou articulando isso corretamente?

**Domothy:** Exatamente. Obter escalabilidade de execução dessa forma é mais indireto com rollups e fragmentação de dados, mas é como um código de trapaça de uma perspectiva de pesquisa, porque a camada 1 (l1) do Ethereum tem muito menos coisas para fazer e se preocupar. O resto é descarregado para os rollups, o que, na minha opinião, é melhor do que o plano original. No plano original de fragmentos patrocinados pelo estado, tudo é igual — mesma blockchain, mesma EVM, mesmos trade-offs. Agora, em vez disso, você pode ter rollups competindo entre si para obter o melhor ambiente e trade-offs. Se você prefere super velocidade em vez de super segurança, você pode ir para um rollup diferente. Você tem escolhas, inovação e competição na camada 2 (l2).

**Ryan Sean Adams:** Vamos abordar o mundo modular em que o Ethereum está. Existe a camada de consenso, a camada de disponibilidade de dados e a camada de execução. A camada de consenso define o que é verdade — a ordem dos blocos. A camada de disponibilidade de dados é o que aconteceu — a camada de dados. A camada externa é a execução, onde a atividade está acontecendo agora. Originalmente, o Ethereum combinava todas essas três na cadeia principal.

Agora, o que estamos fazendo com o roteiro centrado em rollups é fragmentar a execução da cadeia principal para esses rollups. Mas para que os rollups sejam totalmente protegidos com garantias semelhantes às da Rede Principal do Ethereum, eles precisam postar seus dados de volta na Rede Principal do Ethereum. Quando eles fazem isso, atualmente custa espaço de bloco e custa muito dinheiro. O motivo do Proto-Danksharding (EIP-4844) é que a economia muda de uma forma muito favorável aos rollups. Dom, algo a acrescentar aí?

**Domothy:** Eu apenas acrescentaria que, no momento, a disponibilidade de dados é mais implícita e se resume a uma verificação sem necessidade de confiança. Queremos que todos sejam capazes de verificar a cadeia por si mesmos e não precisem ter um terceiro do tipo "confia em mim, cara" no meio. Esse é o gargalo. Você precisa ser capaz de verificar tudo, o que implicitamente significa que você precisa ter os dados disponíveis para verificar as transições de estado.

No final de 2020, as pessoas perceberam que os rollups estavam começando a se tornar incrivelmente bons e populares, e eles resolveram nosso problema de escalabilidade de execução sem a necessidade de fragmentação de execução. Ao optar por um ecossistema de rollups em vez de tentar ser algum maximalista da camada 1 (l1), os rollups podem fazer seus próprios trade-offs, criar suas próprias blockchains e experimentar coisas novas. O Ethereum lida com a verificação — esse é o núcleo do que é uma blockchain.

#### O que é o espaço de blob? (30:00) {#what-is-blob-space-3000}

**Ryan Sean Adams:** Agora nos leve ao estado atual, Dom. Temos muitos rollups usando o espaço de bloco da camada 1 (l1) do Ethereum, pagando altas taxas de gás para postar seus dados de estado para que qualquer um possa verificá-los. Então, Dom, o que é um blob?

**Domothy:** Um blob é apenas um pedaço de dados — especificamente uma grande matriz bruta de números, essencialmente. Um blob no Ethereum agora tem um tamanho fixo de cerca de 128 kilobytes. São apenas dados brutos anexados a uma transação, conhecida como transação portadora de blob, que você envia para a camada 1 (l1).

A restrição de design crucial aqui é que a EVM (Ethereum Virtual Machine) da camada 1 (l1) do Ethereum — o motor de execução — não tem acesso aos dados dentro do blob. Em blocos padrão, dados como dados de chamada envolvem o sistema observando quais funções estão sendo chamadas, qual dinheiro está sendo movido e verificando as mudanças de estado. A EVM acessa tudo isso. Mas se a escalabilidade da camada 2 (l2) envolve postar os dados dos rollups precisamente para que um verificador *offchain* possa fazer a computação, então a *camada 1 (l1)* do Ethereum funcionalmente não precisa realmente olhar para isso e executá-lo.

É essencialmente um pacote selado. A camada 1 (l1) o pega, garante que todos tenham acesso para olhar dentro se quiserem baixá-lo fisicamente, mas a própria camada de execução de processamento principal do Ethereum não lê e computa ativamente os dados. Como não está lendo e computando os dados na EVM, requer radicalmente menos recursos de processamento dos nós. É por isso que é muito mais barato.

**David Hoffman:** Então, para resumir: O espaço de bloco se preocupa com a computação, a execução de estado e o armazenamento de lógica. O espaço de blob se preocupa exclusivamente com a disponibilidade de dados. A camada 1 (l1) não se importa com quem posta o que nesses blobs; tudo o que importa é receber esses blobs e mantê-los pela janela de disponibilidade designada para que as partes interessadas (como sequenciadores de rollup e usuários) possam extraí-los, verificar se os dados não foram retidos maliciosamente e seguir em frente.

**Domothy:** Exatamente. E outra propriedade crítica dos blobs é que eles são podados automaticamente após um período de tempo — atualmente em torno de 18 dias. A razão pela qual eles são podados é que, para garantir uma verificação sem necessidade de confiança, os indivíduos só precisam desses dados disponíveis para provar a finalidade e o consenso sobre o estado do rollup dentro de uma janela específica de desafio. Você não precisa de mil nós mantendo blobs de dois anos atrás para verificar sua transação hoje. Quando a janela expira, você não os obterá mais de um nó do Ethereum; você os obtém de provedores de histórico, indexadores ou dos exploradores de blocos nativos do rollup. O armazenamento no Ethereum é insanamente caro para sempre. Eliminar o requisito de armazenamento nos permite escalar a vazão de blobs sem destruir os discos rígidos dos operadores de nós.

#### Economia e danksharding completo (55:00) {#economics-and-full-danksharding-5500}

**Ryan Sean Adams:** Sabemos que a 4844 é o primeiro passo — o que chamamos de Proto-Danksharding. Ela estabelece o formato do blob e o mercado de taxas isolado, mas o número alvo real de blobs por bloco é restrito inicialmente para ser bastante seguro. Como isso se parece escalando em direção ao danksharding completo?

**Domothy:** No momento, sob a EIP-4844, estamos visando essencialmente 3 blobs por bloco, com um máximo rígido de 6. Isso limita a vazão máxima absoluta de dados na camada 1 (l1) imediatamente após a atualização para evitar qualquer estresse na rede enquanto vemos como o recurso funciona em produção contínua.

O danksharding completo escala isso dramaticamente. Ele avança em direção à amostragem de disponibilidade de dados (DAS). Com a DAS, os nós completos não precisam mais baixar individualmente cada blob para verificar se os dados foram disponibilizados. Eles podem amostrar estatisticamente pequenos pedaços dos dados do blob. Se a amostra estatística se provar disponível, a probabilidade matemática de que um invasor esteja ocultando dados se aproxima efetivamente de zero (como uma chance em um bilhão). Uma vez que você não exige o download completo de todo o blob, você pode escalar a capacidade do blob para dois dígitos ou mais por bloco.

**David Hoffman:** Isso cria um mercado de taxas fraturado dentro de um bloco do Ethereum. No momento, um rollup da camada 2 (l2) precisa competir com os traders do Uniswap e do OpenSea pelos mesmos recursos de espaço de bloco em um bloco do Ethereum. Mas esses são padrões de uso fundamentalmente diferentes. Se houver uma cunhagem de NFT enlouquecendo na L1 do Ethereum, o gás dispara, e os rollups da camada 2 (l2) tentando postar seu estado de dados de repente enfrentam despesas comerciais disparadas apenas para cumprir seus deveres de segurança necessários.

Com um mercado de taxas bidimensional — essencialmente uma estrada isolada separada para os blobs trafegarem — essa cunhagem de NFT na L1 do Ethereum faz o gás de execução disparar da mesma forma, mas não usa espaço de blob. Os blobs permanecem totalmente descongestionados e efetivamente custam centavos. Uma cunhagem de NFT multimilionária na cadeia principal tem impacto zero no custo econômico de finalizar transações na Arbitrum ou na Optimism.

**Domothy:** Sim, eles estão totalmente desconectados. E o inverso é verdadeiro. Se a vazão da camada 2 (l2) disparar imensamente e milhares de rollups operarem e congestionarem o espaço de blob, o pico resultante nas taxas básicas de blob não afetará o custo de fazer uma transação simples na Rede Principal do Ethereum. A taxa básica de blob opera exatamente como a taxa básica da EIP-1559, mas em sua própria dimensão. E sobre a sua pergunta anterior sobre a queima — sim, a taxa de blob gera ETH queimado para pagar pela inclusão de dados no espaço de blob, totalmente separado da queima da taxa básica do espaço de bloco.

#### O futuro da escalabilidade do Ethereum (75:00) {#the-future-of-ethereum-scalability-7500}

**Ryan Sean Adams:** Quero chegar ao que acontece especificamente no lançamento da 4844. Inicialmente, há obviamente uma expectativa muito alta de que, quando a capacidade do blob for desbloqueada de repente, não haverá demanda de rollup suficiente naquele exato microssegundo para preenchê-la completamente. O espaço de blob será quase comicamente barato no lançamento. Mas não existe a lei da demanda induzida? Se você tem recursos incrivelmente baratos, os aplicativos que consomem esses recursos explodem em volume.

**Domothy:** A transição inicial fará com que as taxas da camada 2 (l2) caiam essencialmente para quase zero, porque todos os rollups existentes que atualmente competem por espaço de bloco caro farão uma transição perfeita para um enorme pool quase vazio de espaço de blob. Essa é uma expansão de margem massiva e instantânea para as redes da camada 2 (l2), que será repassada diretamente aos usuários no momento em que integrarem sua nova lógica de prova com a 4844.

Mas você está correto — o espaço de bloco barato impulsiona o design de aplicativos de alta velocidade. Quando de repente você pode construir um jogo onchain que gera milhões e milhões de transações de microestado por frações de centavo porque a sobrecarga de persistência de dados desapareceu, classificações inteiramente novas de aplicativos se tornam economicamente viáveis, o que não acontecia sob restrições padrão.

Isso cria uma dinâmica econômica interessante em como o ETH acumula valor. Se as transações da camada 2 (l2) explodirem 10x ou 100x por causa de novos aplicativos possíveis rodando com disponibilidade de dados quase gratuita, o volume agregado eventualmente começará a competir por espaço de blob. Então, a taxa básica de blob da EIP-1559 sobe naturalmente até que o mercado atinja o equilíbrio, criando um ciclo contínuo e composto de queima de ETH enquanto expande a utilidade da camada 2 (l2).

**David Hoffman:** Isso representa o sucesso e o amadurecimento do roteiro centrado em rollups. O Ethereum, como ambiente de execução monolítico, atingiu um muro onde escalar a vazão linearmente destruía seu mandato de descentralização. Os rollups forneceram uma maneira de contornar o gargalo de execução, mas ainda estavam presos ao gargalo de dados da camada 1 (l1). O espaço de blob desbloqueia o gargalo de dados da mesma forma que os rollups desbloquearam o gargalo de execução. Quando essa atualização for lançada, o Ethereum fará a transição completa do processamento de transações únicas para o processamento de redes de execução verificadas.

**Ryan Sean Adams:** Para resumir o cronograma, a EIP-4844 chega de forma otimista até o final do ano ou no início do ano que vem, e o danksharding completo se segue no ciclo de desenvolvimento subsequente. É realmente a estrutura de infraestrutura necessária para o Ethereum integrar o planeta, e estamos muito perto de vê-la operando no mundo real. Dom, obrigado por nos guiar por esse desbloqueio massivo para a rede.

**Domothy:** Obrigado por me receberem.