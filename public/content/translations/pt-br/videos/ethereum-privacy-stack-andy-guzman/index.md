---
title: "A pilha de privacidade do Ethereum: leituras privadas, redes e o vazamento oculto"
description: "Andy Guzman explica como os metadados vazam quando as carteiras leem dados do Ethereum, e como a pesquisa de leituras privadas e redes do roteiro de privacidade fecha o vazamento da camada de acesso."
lang: pt-br
youtubeId: "tvAqDJXCBaA"
uploadDate: 2026-02-16
duration: "0:27:00"
educationLevel: intermediate
topic:
  - "privacy"
  - "roadmap-and-priorities"
format: presentation
author: EthBoulder
breadcrumb: "Pilha de Privacidade do Ethereum"
---

Uma palestra de **Andy Guzman**, líder da equipe Privacy Stewards of Ethereum (PSE) na Fundação Ethereum, na EthBoulder 2026. Ele expõe um grande ponto cego na privacidade do Ethereum: até mesmo usuários que nunca assinam uma transação vazam dados comportamentais detalhados por meio de consultas diárias. Ele apresenta a pilha de privacidade do Ethereum, cobrindo leituras privadas (PIR), privacidade de tráfego (roteamento onion e mixnets) e trabalho de desempenho, como árvores binárias unificadas e estado verificável por ZK.

*Esta transcrição é uma cópia acessível da [transcrição original do vídeo](https://www.youtube.com/watch?v=tvAqDJXCBaA) publicada pela EthBoulder. Ela foi levemente editada para facilitar a leitura.*

#### A carta fictícia do provedor de RPC (0:12) {#the-fictional-rpc-provider-letter-012}

Olá a todos, sou o Andy, e gostaria de apresentar um tópico que não é frequentemente discutido no ecossistema Ethereum e é extremamente importante. Como vocês devem ter notado pelo slide e pela introdução, está relacionado à privacidade e a como estamos desprotegidos sem sequer percebermos.

Deixe-me começar com uma carta que alguém escreveu para você.

"Caro usuário valioso, obrigado pelas 847 consultas que você fez este mês. Nós realmente gostamos de conhecê-lo. Sabemos que você possui ETH em três carteiras diferentes. Sabemos que você verificou o preço do ETH 94 vezes na última terça-feira. Foi um dia muito difícil para todos, então não o julgamos. Você também verificou o preço do BTC, o que é interessante, porque você não possui nenhum Bitcoin. Você está pensando em diversificar? Isso ficará entre nós e, claro, nossos parceiros de análise. Você também está observando dois pools do Uniswap muito de perto e verificou seu fator de saúde no Aave 14 vezes na semana passada. Talvez você queira relaxar ou apenas adicionar algum colateral. Na quinta-feira, você o verificou três vezes em 12 minutos e estava muito preocupado. Você olhou para quatro nomes ENS diferentes, então ou você está começando um novo projeto ou está tendo uma crise de identidade. E você sempre fica quieto entre 23h e 7h, horário das Montanhas."

#### Como você vaza dados sem assinar transações (1:34) {#how-you-leak-data-without-signing-transactions-134}

"Portanto, estamos bastante confiantes de que você mora em Boulder, ou perto. Você nunca assinou uma única transação através de nós. Você nunca precisou. Sua curiosidade nos disse tudo. Com carinho, seu provedor de RPC."

Claro que esta é uma carta fictícia, mas descreve algo que realmente vazamos todos os dias. Mesmo que você não esteja fazendo uma única transação ou qualquer ação onchain, você está basicamente contando tudo para qualquer empresa de análise que adoraria colocar as mãos nesses dados e em seus comportamentos.

#### Gravações privadas vs leituras privadas (2:07) {#private-writes-vs-private-reads-207}

Então, o que realmente está acontecendo agora no mundo da privacidade? Vejo que colocamos muita ênfase na privacidade onchain, ou o que nós da PSE chamamos de gravações privadas: todas as ações que você faz onchain. E faz sentido, certo? Essas ações são registradas para sempre e transmitidas ao redor do mundo, então faz sentido não vazar seu endereço com uma ação específica. Também colocamos muita ênfase em ferramentas: fontes de dados, provas, DSLs e linguagens que podemos usar para dar aos desenvolvedores mais ferramentas para expressar e construir aplicativos mais fortes que tenham mais privacidade onchain.

Mas quero argumentar nesta apresentação que não colocamos atenção e esforço suficientes nestes outros domínios: o que chamamos de leituras privadas, porque sempre que você consulta dados de uma blockchain você está vazando muitas informações, e redes privadas, porque mesmo antes de qualquer coisa chegar onchain, todo o seu tráfego está vazando.

Para ser um pouco mais técnico: todas as chamadas de RPC, como eth_getBalance, eth_call e eth_getLogs, são solicitações em texto simples que vão para provedores de RPC e são correlacionadas com o seu IP.

#### Por que mais atividade aumenta o risco de criação de perfil (3:20) {#why-more-activity-increases-profiling-risk-320}

Com essas informações, torna-se muito fácil criar perfis de pessoas, segmentá-las e modelar comportamentos. E isso pode ser usado contra você. Como você deve imaginar, informação é poder, e quanto mais informações as pessoas tiverem sobre você e seu comportamento, mais poder elas terão sobre você.

A maioria das pessoas não percebe isso. A maioria das pessoas dirá: ok, bem, isso não importa muito porque não são informações críticas. Ou elas podem pensar: quanto mais atividade houver, mais protegido estarei. Isso é totalmente falso e contraintuitivo. Para ações onchain, onde quer que existam conjuntos de anonimato, isso ajuda: quanto mais usuários, mais privacidade e mais fácil é se misturar. Mas com as leituras é o oposto, porque as consultas não são intercambiáveis. Quanto mais atividade você transmite, mais ações você toma, mais rica é a superfície de correlação e mais fácil é construir um perfil de suas ações.

Portanto, sempre que há uma mania de finanças descentralizadas (DeFi) ou loucura de NFTs, as pessoas se tornam mais desleixadas. A segurança operacional (OpSec), é claro, é jogada pela janela, e torna-se muito, muito mais fácil desanonimizar as pessoas com base nos padrões de atividade em que a maioria das pessoas se enquadra.

#### Apresentando a pilha de privacidade do Ethereum (4:43) {#introducing-the-ethereum-privacy-stack-443}

Quero começar com o panorama: onde devemos atacar, o que é necessário e quem está trabalhando no quê. Esta palestra abordará alguns tópicos mais técnicos e alguns conceituais de nível mais alto, para que todos possam tirar algum proveito dela.

Quero apresentar o que chamo de pilha de privacidade do Ethereum, ou as camadas da pilha de privacidade do Ethereum, e acho que isso é útil para raciocinar. Se realmente queremos privacidade, não precisamos apenas de privacidade onchain; também precisamos de privacidade em todas essas camadas da pilha, semelhante ao ciclo de vida de uma transação, ou ao modelo OSI e suas camadas de tecnologia. Eu argumentaria que poderíamos criar um padrão, ou algum tipo de reconhecimento em todo o ecossistema, de que essas camadas existem. Talvez esta não seja a forma final, mas acho que já é indiscutivelmente útil.

#### Camada por camada: onde você vaza (5:41) {#layer-by-layer-where-you-leak-541}

O topo é a camada de aplicativo. Sempre que você visita um site, é claro, você está vazando o que está visitando, e as pessoas podem começar a criar perfis: conjuntos de anonimato, credenciais, vinculando seu IP ao que você está visitando, mesmo que você não faça nada.

A próxima é a camada de carteira. Sempre que você realiza uma ação, você não vaza informações apenas para a camada do aplicativo, mas também para os gateways. As carteiras agora são muito complexas, elas se integram a muitos outros sistemas e serviços, e você vaza muito mais informações do que imagina. Mesmo que você apenas abra sua carteira e ela consulte o preço do ETH ou seu saldo, você está vazando tudo.

Depois, você tem os gateways: os RPCs, os proxies, os retransmissores (relayers). Você vaza mais metadados novamente. Em seguida, o que as pessoas imaginariam como o elemento onchain, que é sempre que as coisas são consultadas na EVM, como o estado ou os padrões de execução. Por exemplo, consultar o saldo de algo ou o estado de um contrato inteligente. E, finalmente, o consenso, onde estão todos os validadores. Dependendo se você está gravando onchain ou lendo onchain, você também pode tocar na mempool.

E há outra vertical, que é o que chamamos de rede, que é transversal, cortando todas essas camadas. Por exemplo: agora mesmo você visita um site e o servidor sabe o seu IP. Mas e se você visitasse esse site através do Tor ou de outra rede anônima? Você saberia o endereço IP do site, mas eles não saberiam o seu. E se esse site estiver hospedado em um país que recentemente começou a censurar todas as coisas cripto? Esse site e essa empresa também gostariam de ocultar seu IP e gostariam de ocultar seu domínio atrás de um domínio onion.

Esses são os tipos de coisas que fazem sentido: precisamos ir camada por camada, fortalecendo tudo, analisando através das lentes de um invasor muito disruptivo que quer censurar tudo. Mesmo que não façamos isso e digamos que vivemos em um estado bom o suficiente, essas informações são registradas agora e serão hospedadas para sempre por muitas pessoas que você nem conhece, empresas que começam a vender seus dados. Eventualmente, em cinco anos, alguém pode proibir cripto e dizer: "qualquer um que usou o Uniswap nos últimos cinco anos, eu sou a Receita Federal, vou começar a bater na sua porta e colocá-lo na cadeia", ou algo assim. Esses cenários distópicos acontecem em diferentes países ao redor do mundo agora mesmo.

#### Leituras privadas e redes privadas (8:24) {#private-reads-and-private-networking-824}

Ok, então temos a pilha de privacidade do Ethereum. Onde devemos focar? Nesta apresentação, quero falar sobre essas duas áreas. Leituras privadas: sempre que você acessa o estado onchain, você toca em todas essas camadas, desde o aplicativo, digamos que eu queira consultar o preço do ETH, até a carteira, os gateways, um nó que está executando o Ethereum e a EVM, e depois de volta. Basicamente, um provedor de RPC ou um indexador. E redes privadas, que são todas as ações que acontecem na camada de rede. É isso que queremos fortalecer.

#### Três pilares: dados, tráfego, desempenho (9:05) {#three-pillars-data-traffic-performance-905}

Existem três pilares que considero críticos para alcançarmos isso. Queremos ocultar e tornar privados os próprios dados. Queremos ocultar e tornar privado o próprio tráfego. E então queremos torná-lo de alto desempenho, útil, prático e barato. Isso resume muitas informações sobre as coisas que acontecem no ecossistema, mas acho que é útil para pintar o panorama e identificar os pontos de alavancagem onde podemos acelerar.

#### Ocultando dados: de proxies a PIR (9:39) {#hiding-data-from-proxies-to-pir-939}

Então, dados. O que é que queremos proteger? Queremos ocultar quais informações você está pedindo a esses servidores e queremos ocultar os padrões de como você acessa esses dados. Não apenas o conteúdo, mas também os padrões.

Existem diferentes níveis de técnica. O primeiro é nada: você simplesmente vaza tudo. Sempre que você conecta sua carteira, você vincula seu endereço IP ao contrato que está consultando, a um eth_getBalance específico para um endereço específico, e é isso. Mesmo se você estiver usando um protocolo de privacidade, digamos o Tornado Cash, e quiser consultar o estado da árvore de Merkle, você tem que baixar a árvore inteira, o que não tem muito desempenho, ou você vaza qual caminho e folhas está consultando, reduzindo seu conjunto de anonimato. Portanto, mesmo usar um protocolo de privacidade forte como o Tornado Cash não é suficiente se você não proteger sua rede e seus padrões de acesso a dados.

O próximo nível é algum tipo de proxies ou retransmissores: muitas máquinas que não sabem de onde vem a solicitação e, eventualmente, recuperam os dados. Isso não é muito prático e não é muito sem necessidade de confiança.

Depois, você tem os TEEs (Trusted Execution Environments), que são um passo à frente, e é aqui que algumas equipes e empresas estão oferecendo serviços. Acho que este é um bom passo à frente, mas não o suficiente, novamente porque o custo de atacar e corromper TEEs está caindo muito. Para certos casos de uso críticos, isso não é suficiente; para muitos do dia a dia, pode ser.

Existem outras equipes trabalhando em OMAPs (padrões de acesso a mapas alheios) e ORAM (RAM alheia). Estas são técnicas semelhantes que tentam ofuscar quais partes do conjunto de dados você está tentando acessar. Em vez de dizer "Eu quero o saldo deste endereço ETH", você está acessando coisas diferentes aleatoriamente, para que o servidor não saiba.

E eu argumentaria que o objetivo final destes será a PIR, recuperação de informações privadas (private information retrieval), o que significa que o servidor não sabe o que você está consultando e não aprende nada sobre isso.

#### Recuperação de Informações Privadas explicada (12:03) {#private-information-retrieval-explained-1203}

A recuperação de informações privadas é uma técnica superpoderosa em criptografia e será muito usada. Existem duas variantes: PIR de índice, que você pode usar se tiver dados estruturados sob um índice, e PIR de palavra-chave, onde, como o nome diz, você consulta por palavra-chave. É muito difícil ter um esquema que funcione para tudo.

O estado do Ethereum é enorme e muito variado. Os logs, como eu estava aprendendo ontem, são apenas de acréscimo (append-only), mas o modelo de conta é diferente: algum estado é atualizado com muita frequência, outro não. Dependendo de como você o divide e analisa, você pode ter megabytes, gigabytes ou terabytes de dados, com padrões de acesso muito diferentes.

#### Uma arquitetura PIR multiagente (12:48) {#a-multi-agent-pir-architecture-1248}

A proposta em que estamos trabalhando dentro da PSE, e aqui vou falar conceitualmente e depois sobre projetos específicos que estamos fazendo na PSE e outras coisas que estou vendo no ecossistema, é uma arquitetura multiagente. Não existe um esquema único que seja perfeito para todo o estado do Ethereum. Mas se pudermos fatiar o estado do Ethereum por tipo ou por padrão de acesso, podemos encontrar esquemas muito bons para cada um deles.

E se tivermos um serviço que execute essa arquitetura multiagente e, dependendo do tipo de consultas e de onde elas possam estar localizadas no estado do Ethereum, ele execute um esquema ou outro? Isso já nos deixa muito perto de algo que é viável, capaz de produção e que pode ser oferecido ao ecossistema. Isso exigirá algo como uma API unificada, para que carteiras, indexadores, usuários e desenvolvedores de aplicativos descentralizados (dapps) não precisem se preocupar com qual esquema é usado e como chamá-lo. Você apenas tem a API padrão e outra pessoa se preocupa com os detalhes de implementação.

Já estamos fazendo isso e implementando dois esquemas diferentes. Abriremos subsídios (grants) e estamos tentando coordenar mais pessoas no ecossistema para lidar com alguns deles e ver quais são os mais necessários para o Ethereum.

Aqui estão alguns números sobre diferentes esquemas PIR: taxas de transferência (throughputs), sobrecarga de comunicação e assim por diante. É difícil, porque aplicativos diferentes têm padrões de acesso diferentes. Alguns acessam muitos recibos, alguns querem acessar mais do estado, como o Rotki, e alguns acessam mais transações, como o Helios. Não há bala de prata e, muito provavelmente, uma arquitetura mista será útil. Também estamos fazendo uma sistematização do conhecimento, então, se isso for interessante para você, podemos compartilhar. E aqui estão apenas algumas das equipes trabalhando nessas áreas. Perdoe-me se você faz parte de uma equipe e eu não o incluí; se alguém vir a gravação e estiver faltando, por favor me avise e eu posso começar a adicioná-lo.

#### Ocultando o tráfego: roteamento onion e Tor (15:22) {#hiding-traffic-onion-routing-and-tor-1522}

Cobrimos os dados. O outro grande balde é o tráfego. Como ocultamos o tráfego e o que queremos ocultar? Em termos muito simples, queremos ocultar os IPs do cliente e do servidor um do outro e do resto do mundo que possa estar bisbilhotando o tráfego. Temos diferentes técnicas: serviços onion, mixnets, VPNs, DC-nets e pode haver outras classificações. Vou falar apenas sobre as duas primeiras.

As técnicas de roteamento onion criptografam em camadas, e o tráfego também é descriptografado em camadas. As pessoas no meio nunca podem saber a origem, algumas nunca podem saber o destino e algumas nunca aprendem nada; elas apenas agem como roteadores.

O resumo (TL;DR) é: e se todo o tráfego do ecossistema Ethereum pudesse ser roteado através da rede Tor, por assim dizer? Existem outras opções também. Ajudaríamos a proteger o IP do remetente: seu telefone ou laptop não vazaria quando você estivesse enviando transações ou solicitando informações. E, claro, também protegeríamos o receptor, o servidor. Imagine que no Irã, China, Coreia do Norte ou Venezuela, alguém está tentando hospedar um protocolo de finanças descentralizadas (DeFi) ou um serviço e é censurado por seu país. Esta é uma opção que poderia proteger suas vidas. Ela contorna a censura e também oculta o tráfego dos ISPs, provedores de serviços de internet, que todos sabemos que são grampeados por agências de inteligência que bisbilhotam tudo.

O objetivo é ter um substituto direto (drop-in replacement): um SDK, para que carteiras, desenvolvedores de aplicativos descentralizados (dapps) e provedores de infraestrutura não precisem se preocupar com os detalhes de implementação. Eles apenas sabem que, se usarem este SDK, o tráfego será "onionizado", criptografado e fortalecido.

Há uma equipe que quero destacar, a equipe da Brume Wallet, que iniciou o Echalote, uma implementação de código aberto do Tor para a web. Isso existe agora: existem clientes Tor, mas eles são escritos em C e precisam ser executados em um navegador especial. E se eu quiser adicionar isso à MetaMask, ou à carteira Kohaku, ou à Ambire, Rabby e todas as outras? Precisamos de SDKs em JavaScript, e foi isso que o Echalote começou.

Em seguida, o Projeto Tor tem uma nova implementação sendo desenvolvida chamada Arti, a próxima geração de seu cliente. Mas precisamos de um Arti incorporado. O Arti é baseado em Rust e precisa ser compilado para WASM para poder ser executado no seu navegador, para que você possa importá-lo com muita facilidade. Basicamente, temos uma colaboração com a equipe do Tor: ligações todas as semanas e alguns projetos e parcerias juntos.

#### Mixnets para o Ethereum (18:16) {#mixnets-for-ethereum-1816}

Do lado das mixnets, quero dar um alô para várias equipes que estão abordando isso: a equipe Nym; HOPR, também uma das primeiras; VPNs como a Gnosis VPN; e algumas outras que eram novas para mim, como o Anyone Protocol, e acho que alguém dessa equipe deve estar aqui em Denver, além de algumas outras novas. Existem muitas equipes trabalhando em mixnets, VPNs e outras abordagens.

Queremos ver: e se criarmos uma mixnet construída especificamente para o Ethereum, onde possamos rotear o tráfego RPC? As mixnets têm fortes garantias, mas adicionam muita latência. Para alguns casos de uso, tudo bem: não importa se demorar um pouco mais, desde que você tenha privacidade. Mas para coisas como finanças descentralizadas (DeFi) e negociação (trading), é extremamente improvável que elas sejam adotadas se adicionarem latência. Então, qual é o mais rápido que podemos executar com as maiores garantias de privacidade? Novamente, um alô para algumas dessas equipes, e se alguém estiver trabalhando nessas áreas e eu não o adicionei, adoraria conversar.

#### Desempenho: árvores binárias unificadas e aceleração de GPU (19:28) {#performance-unified-binary-trees-and-gpu-acceleration-1928}

A última coisa sobre a qual quero falar, o terceiro pilar para tornar isso uma realidade, é o desempenho. Queremos que essas coisas funcionem de forma rápida e barata. Tenho um princípio: essas coisas não serão adotadas se o custo for maior que o benefício. Custo significa experiência do usuário, tempo e esforço para o usuário, mas também custo para os desenvolvedores e a infraestrutura: é muito caro executar isso? Precisamos reduzir o custo o máximo que pudermos, e há duas iniciativas de alto nível sobre as quais posso falar.

Uma é a UBT (Unified Binary Tree). Dependendo do quanto você está envolvido nas EIPs do protocolo, você pode ter ouvido falar disso. No momento, temos a trie de Merkle Patricia, que é útil, mas não muito útil para ZK e outros tipos de criptografia. Há uma proposta, a EIP-7864, mudando não para árvores Verkle, mas para árvores binárias unificadas. Isso é muito mais eficiente para consultar o estado e, em seguida, fazer operações criptográficas como ZK por cima.

Temos um projeto fazendo uma UBT verificável: você adiciona um sidecar a qualquer cliente Ethereum, que, em vez de executar um banco de dados MPT, tem um banco de dados de estado UBT e, em seguida, você prova que essa transformação de MPT para UBT é válida usando uma zkVM. Isso já é muito poderoso. Assim que conseguirmos fazer isso, os clientes leves (light clients) poderão usá-lo para aumentar seu desempenho, e coisas como PIR poderão ser executadas muito mais rapidamente.

O outro aspecto é a aceleração de GPU. Podemos executar essas coisas muito mais rápido se otimizarmos os níveis mais baixos da pilha: a GPU é um deles, ou a aceleração de CPU também. Essas coisas provavelmente serão executadas em servidores, não em telefones, por isso também é muito valioso começar a explorar como podemos criar essas bibliotecas de nível inferior para serem executadas muito mais rapidamente.

Fazendo uma recapitulação até agora: temos essas cinco camadas e queremos cobrir esses casos de uso. Existem três pilares: dados, tráfego e desempenho. Para dados, temos proxies, TEEs, ORAMs, OMAPs e PIR. Para tráfego, temos mixnets, roteamento onion e outros. Para desempenho, temos UBT e aceleração de GPU. Se você quiser ler mais, pelo menos sobre as contribuições que a PSE está fazendo, você pode acessar pse.dev/research.

#### Medindo o sucesso (22:15) {#measuring-success-2215}

Então, o que é o sucesso e como podemos medi-lo? Voltando a essas camadas: se eu quiser ser capaz de reivindicar que o Ethereum é a cadeia mais privada, qual é o objetivo final? Eu precisaria me sentir confortável de que todas essas camadas estão extremamente fortalecidas. Como eu mediria isso? Eu esperaria que mais sites e frontends de aplicativos descentralizados (dapps) fossem hospedados atrás de domínios onion. Eu adoraria que as carteiras usassem nativamente o roteamento anônimo, e gateways, provedores de RPC e indexadores também. E eu mediria uma porcentagem.

A questão é: dos atuais frontends do ecossistema Ethereum, quantos estão hospedados atrás de um domínio onion? Eu diria que extremamente poucos, 1%, se houver. Para eu me sentir bem e dizer que conseguimos, provavelmente precisaríamos de mais de 80% em todas essas camadas. Quantas carteiras agora estão roteando o tráfego por meio de técnicas de roteamento anônimo? Muito, muito poucas. O mesmo com os provedores de RPC: esses provedores oferecem PIR? Não. Portanto, para mim, reivindicar o sucesso significa que os atores em todas essas camadas adotem esses tipos de tecnologias, pelo menos 80% das equipes, do tráfego ou das consultas.

#### Comparação de nós onion do Bitcoin (23:39) {#bitcoins-onion-node-comparison-2339}

Esta é uma coisa da qual podemos ter inveja do Bitcoin. Por todas as críticas que eles recebem, esta é uma imagem de novembro do ano passado: 64% de seus nós completos (full nodes) acessíveis estão ocultos atrás de domínios onion.

Podemos fazer isso nós mesmos? Esta é uma privacidade de nível inferior, no nível do consenso, mas poderíamos dizer que nossos nós completos e nós validadores estão atrás de uma rede onion ou mixnets? Eu definitivamente acho que deveríamos, e provavelmente estamos em menos de 1%. Temos outros desafios que eles não têm: executamos muito mais rápido e nosso consenso é diferente. Mas eu adoraria ter painéis como este e dizer que mais de 80% das carteiras adotaram esses tipos de tecnologias, e provedores de RPC, exploradores, frontends, balanceadores de carga e SDKs também. Eu adoraria que essa lista crescesse.

#### Comparando o Ethereum com Monero e Zcash (24:55) {#comparing-ethereum-to-monero-and-zcash-2455}

Tomei a liberdade, ontem à noite e na noite anterior, de começar a ver como, através dessa lente de camadas, o ecossistema Ethereum se compara a coisas como Solana, Bitcoin, Zcash e Monero. As coisas em amarelo são técnicas opcionais (opt-in), e acho que somos muito bons nisso. As coisas em azul são propostas, algumas delas propostas de protocolo. As coisas em verde são aplicadas na camada do protocolo.

Devido à nossa história de 10 anos sendo uma cadeia pública, acho que será difícil alcançar o Monero e o Zcash em tornar a privacidade nativa. Mas acho que podemos fazer um trabalho muito bom em obter adoção opcional (opt-in) e influenciar cultural e socialmente as equipes e os usuários a adotarem mais dessas técnicas. O Bitcoin e a Solana têm seus próprios desafios, e acho que eles ficarão mais para trás, pelo menos nessas questões de privacidade.

#### O desafio: o ecossistema programável mais privado (25:50) {#the-challenge-the-most-private-programmable-ecosystem-2550}

Meu objetivo, e o objetivo que quero colocar em suas mentes, é que o Ethereum se torne o ecossistema mais privado, não permissionado, sem necessidade de confiança e programável do mundo. Temos outras cadeias de pagamento privadas, e isso é ótimo, elas são muito boas, mas acho que elas terão um trabalho muito mais difícil para se tornarem programáveis e criarem o ecossistema que nós criamos.

Meu desafio para vocês, e claro para mim e minha equipe, é nos tornarmos, dos ecossistemas programáveis, o mais não permissionado, sem necessidade de confiança e privado. Não podemos focar apenas nos elementos onchain. Precisamos focar em todas essas camadas.

Portanto, se você estiver trabalhando em leituras privadas, redes, implementações de PIR, aceleração de GPU, estruturas de dados, UBT, infraestrutura ou validadores, eu adoraria conversar com você depois. Muito obrigado. O Ethereum é para a privacidade.