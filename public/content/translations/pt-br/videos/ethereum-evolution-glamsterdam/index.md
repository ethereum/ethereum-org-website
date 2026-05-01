---
title: "A evolução do Ethereum: Fusaka, Glamsterdam e além"
description: "Preston Van Loon sobre as próximas atualizações de protocolo do Ethereum, cobrindo os marcos do roteiro Fusaka e Glamsterdam e a evolução de longo prazo do protocolo."
lang: pt-br
youtubeId: "GgKveVMLnoo"
uploadDate: 2025-03-01
duration: "0:21:34"
educationLevel: intermediate
topic:
  - "roadmap-and-priorities"
  - "roadmap"
  - "upgrades"
format: presentation
author: ETHDenver
breadcrumb: "Evolução do Ethereum"
---

Uma apresentação de **Preston Van Loon** da Offchain Labs e Prysm, realizada na ETHDenver. Preston aborda a recente velocidade de atualização do Ethereum e o que vem por aí para a rede, incluindo Pectra, Fusaka, PeerDAS, Glamsterdam, FOCIL, tempos de slot mais curtos e finalidade mais rápida.

*Esta transcrição é uma cópia acessível da [transcrição original do vídeo](https://www.youtube.com/watch?v=GgKveVMLnoo) publicada pela ETHDenver. Ela foi levemente editada para facilitar a leitura.*

#### Introdução (0:07) {#introduction-007}

**Apresentador:** Certo, pessoal. Dando continuidade. Vamos falar sobre a evolução do Ethereum com Preston Van Loon. É com você.

**Preston Van Loon:** Certo. Obrigado. GM — vocês sabem que é GM a qualquer hora, dia ou noite, seja de manhã ou não. Então eu vejo GM o dia e a noite toda. Quero falar sobre a evolução do Ethereum, então vamos começar.

Há uma narrativa que você provavelmente já ouviu antes: o Ethereum é muito lento para lançar atualizações. Eu sei que você já ouviu isso. Eu já ouvi. Você já ouviu muitas vezes. As pessoas diziam: "Quando sai o The Merge? Os desenvolvedores não podem fazer algo? Outras redes estão avançando rápido. Por que o Ethereum está tão lento?" Estou aqui para dizer que essa narrativa está morta.

Eu trabalho no cliente de consenso Prysm. É um dos principais componentes da Beacon Chain do Ethereum. E eu estive nas trincheiras das atualizações mais recentes — para Pectra, Fusaka. Pelo que vi de dentro, não se tratava daquela burocracia lenta que as pessoas alegam existir no Ethereum há muitos anos. Na verdade, era uma máquina de alta velocidade e bem executada, entregando algumas das maiores atualizações que já vimos na história do Ethereum.

#### Lançando três atualizações em um ano (1:18) {#shipping-three-upgrades-in-one-year-118}

O que lançamos em 2025 foram três grandes atualizações em um ano. Primeiro, Pectra em maio de 2025. Isso introduziu a abstração de conta nativa, um aumento no saldo efetivo máximo do validador permitindo consolidações e mais dez EIPs. Em maio, essa foi a maior atualização em termos de EIPs que o Ethereum já tinha visto.

Mas então, apenas sete meses depois, lançamos Fusaka — uma atualização ainda maior em termos de EIPs. Esta teve treze, com uma inovação chamada PeerDAS, o que é muito empolgante. Mas apenas seis dias depois, atualizamos novamente com uma bifurcação BPO1, e a BPO2 veio logo em seguida, aumentando a capacidade de blob do Ethereum.

Isso é uma prova da capacidade de entrega do Ethereum. É uma colaboração entre cinco ou seis clientes de consenso, cinco clientes de execução, muitos pesquisadores — mais de cem pessoas envolvidas no desenvolvimento principal do Ethereum — e todos estão lançando atualizações de forma coordenada ao mesmo tempo.

#### Escalabilidade com PeerDAS (2:22) {#peerdas-scaling-222}

Vamos dar uma olhada na atração principal da Fusaka: PeerDAS. PeerDAS é uma solução de escalabilidade muito incrível. Antes do PeerDAS, tínhamos a Pectra, e com a Pectra você tinha que — como operador de nó ou validador — baixar cada blob que vinha com um bloco. O alvo era de seis blobs por bloco. Todos tinham que baixar isso, e isso é realmente um gargalo de escalabilidade. Se você quiser aumentar isso, estará pedindo aos operadores de nó que aumentem proporcionalmente o uso de largura de banda para blobs.

Agora com a Fusaka, temos blobs que são codificados por apagamento (erasure-coded) e pedimos aos validadores que guardem apenas uma parte disso. Você só precisa guardar um oitavo dos blobs. E com quaisquer 50% dos blobs, você pode reconstruir a coisa toda. Então, com isso espalhado pela rede, garante-se a disponibilidade de dados e que haja menos carga sobre os stakers individuais. Isso nos dá uma redução imediata de quase 90% na largura de banda da rede no uso de blobs.

Olhando para os números: para a Pectra, tínhamos um alvo de seis e um máximo de nove blobs com um limite de gas de 36 milhões. Consideramos isso a linha de base para o uso de blobs — isso era 768 kilobytes por bloco. Agora, entre a Pectra e a Fusaka, tivemos uma atualização fora de banda onde o limite de gas foi aumentado. Este foi um processo de governança onchain onde os validadores simplesmente votaram no que achavam que o limite do bloco deveria ser — passou de 36 para 45 milhões. E então, mais tarde no ano, chegamos à Fusaka, que não alterou o alvo ou o máximo de blobs, mas aumentou novamente o limite de gas.

E então tivemos aquela grande diminuição na largura de banda, onde cada bloco com um alvo de seis blobs agora tem apenas 96 kilobytes de dados de blob que um validador precisava armazenar. Depois, novamente com a BPO1, a bifurcação apenas de parâmetros de blob (blob-parameter-only), aumentamos o alvo para 10 e o máximo para 15. A BPO2, que aconteceu apenas um mês depois, foi para 14 e 21 — o que é o dobro do que tínhamos na Pectra, mas ainda com 71% menos uso de largura de banda em blobs para stakers individuais.

#### O que vem por aí em Glamsterdam (4:30) {#whats-coming-in-glamsterdam-430}

O que vem a seguir em Glamsterdam? Há três coisas realmente fundamentais e uma que ainda está em pesquisa ativa.

A primeira é a ePBS — separação propositor-construtor (PBS) consagrada (enshrined). A forma como a produção de blocos é feita hoje, muitas pessoas estão terceirizando sua oportunidade de construir um bloco através do MEV-Boost para construtores muito sofisticados. Essa é a maioria da rede. O problema é que você tem que confiar em um retransmissor (relay), e há muita confiança de que o construtor realmente apresentará o bloco no qual ele deu o lance. A ePBS introduz um mecanismo no protocolo para que haja muito menos confiança necessária, e é uma implementação muito limpa da mesma ideia.

A próxima coisa que temos são listas de acesso em nível de bloco. Esta é uma inovação legal onde cada bloco virá com uma lista que diz onde no estado ele estava lendo ou gravando dados. O que isso significa é que você pode processar blocos em paralelo. Hoje você tem que processar blocos sequencialmente. Se você quiser processar o bloco 10, você tem que primeiro processar o 9 e o 8 e assim por diante. Agora, se você tem uma coleção de blocos e nenhum deles está em conflito com as informações de acesso ao estado, você pode processar todos os oito em paralelo. Talvez você tenha oito núcleos — isso torna o Ethereum mais eficiente e mais rápido para processar blocos.

A terceira coisa é a reprecificação do gás. Houve benchmarks através desta EIP que mostraram que alguns códigos de operação estavam superfaturados, alguns estavam subfaturados. Agora vamos atualizar as taxas que você paga por cada código de operação para refletir a realidade, tornando o Ethereum mais seguro e mais eficiente.

#### O papel em evolução das L2s (6:14) {#the-evolving-role-of-l2s-614}

Há uma coisa sobre a qual quero falar que o Vitalik mencionou recentemente. Ele disse em um tweet algumas semanas atrás que a visão original das L2s e seu papel no Ethereum não faz mais sentido. Isso gerou muitas manchetes, e acho que muitas pessoas tiraram a conclusão errada disso.

Deixe-me dizer o que isso significa vindo de alguém de dentro. O Ethereum está escalando mais rápido do que o esperado. As taxas estão mais baixas do que nunca. Eu nunca pensei que estaria pagando taxas de gás de menos de um gwei na Mainnet, mas aqui estamos. Os blobs são abundantes — temos muitos. Estamos escalando blobs mais rápido do que o esperado. E até mesmo as taxas das L2s estão muito baixas.

Então a ideia de que precisamos de L2s de propósito geral — isto é, L2s que são simplesmente a mesma EVM que temos na camada 1 (l1), apenas copiadas e coladas várias vezes e tudo o que fazem é ir mais rápido — essa não é mais a visão. Essas L2s prosperarão com a especialização. Algumas delas terão como alvo coisas como privacidade, jogos, especificidades em finanças descentralizadas (DeFi) ou extensões da EVM. Mas se elas forem simplesmente uma cópia clone da camada 1 (l1), elas não fazem parte do roteiro onde inicialmente imaginamos esse tipo de paradigma fragmentado (sharded) através de L2s.

#### FOCIL: resistência à censura no nível do protocolo (7:25) {#focil-protocol-level-censorship-resistance-725}

Além de Glamsterdam, há três coisas muito legais em desenvolvimento e pesquisa ativos. A primeira é a FOCIL — Listas de Inclusão Aplicadas por Escolha de Bifurcação (Fork-Choice Enforced Inclusion Lists).

O problema que ela visa resolver é que os construtores de blocos têm uma escolha. Eles podem decidir quais transações são incluídas no bloco. Eles podem preferir algumas ou não preferir outras — talvez seja por uma vantagem de MEV, talvez seja pressão regulatória. Mas, em qualquer caso, eles são capazes de censurar transações como desejarem, e não há nada que alguém possa fazer a respeito.

A FOCIL muda a dinâmica de poder. Em vez de dizer que os construtores de blocos podem escolher todas as transações em um bloco, há um comitê aleatório que seleciona — com base em suas heurísticas locais — algumas transações que eles acreditam que devem ser incluídas no próximo bloco. Não são todas as transações no próximo bloco. Os construtores ainda têm muita liberdade, mas há um subconjunto que eles devem incluir. O propositor de bloco pegará esta lista curta — talvez umas oito transações — e a colocará no final do bloco, e elas serão executadas com o bloco.

Isso é aplicado através da escolha de bifurcação. Os validadores que virem um bloco não farão a atestação dele a menos que tenha uma lista de inclusão anexada na parte inferior. Se eles virem um sem a lista, considerarão esse bloco inválido e simplesmente o ignorarão — eles não o propagarão, não darão seu voto nele. Isso ainda é uma pesquisa ativa com alguns parâmetros ainda sendo decididos, mas a direção é clara: o Ethereum vai incluir resistência à censura no nível do protocolo.

#### Tempos de slot mais curtos (9:24) {#shorter-slot-times-924}

A próxima coisa realmente empolgante são os tempos de slot mais curtos. Com a Hegata — a bifurcação depois de Glamsterdam — estamos considerando se podemos incluir tempos de slot mais curtos ou slots rápidos. Isso não quer dizer que vamos pular direto para slots de seis segundos ou até mais rápidos, mas sim construir a infraestrutura para tornar isso possível.

Parece muito simples — tipo, "vamos apenas ir mais rápido". Mas você tem que pensar na propagação da rede, nos deveres de atestação do validador, onde eles têm uma quantidade limitada de tempo para atuar, e então há a economia. Quando experimentei isso pela primeira vez, apenas mudei o 12 para um 6 e de repente todo mundo estava ganhando o dobro de emissão — o dobro de dinheiro — o que não é realmente a intenção por trás de tempos de slot mais curtos. Trata-se de ir mais rápido, mas mantendo todas as coisas iguais. Portanto, é uma coisa muito complexa, mas tem a possibilidade de chegar lá no estágio final de forma incremental.

#### Finalidade mais rápida (10:20) {#faster-finality-1020}

A terceira coisa é a finalidade mais rápida. Isso é muito importante porque o Ethereum é finalizado a cada duas épocas — a cada 13 minutos — e há aplicativos que realmente dependem de fazer a pergunta: minha transação é permanente? Se a transação não esteve em uma época finalizada, então a resposta é não — há uma pequena chance de que ela possa ser reorganizada e a transação precise ser enviada novamente.

Agora, se tivermos uma finalidade rápida, coisas como corretoras, pontes ou qualquer aplicativo podem ter a certeza de que uma transação é final. Primeiro, em vez de duas épocas para a finalidade, vamos fazer em uma. Então podemos dizer que, em vez de épocas com 32 slots de duração, vamos encurtá-las para quatro slots. Agora, se você combinar isso com tempos de slot de seis segundos, estamos falando de finalidade em menos de 30 segundos. Esse é um objetivo final muito legal.

#### A estrela-guia (11:15) {#the-north-star-1115}

Tudo isso está embutido na estrela-guia, onde dizemos que a camada 1 (l1) é rápida com finalização em segundos. Como chegamos lá? Primeiro, começamos com o PeerDAS — que já foi lançado. Isso nos deu uma camada escalável para a disponibilidade de dados. Em seguida, temos Glamsterdam, incluindo principalmente a ePBS, que é uma implementação limpa para a separação propositor-construtor (PBS) e torna coisas como a FOCIL mais impactantes. A FOCIL entra com resistência à censura, o que é muito harmonioso com a ePBS. Com slots mais rápidos, tempos de slot mais rápidos tornam a finalidade mais rápida ainda mais impactante. Então chegamos a esse objetivo final onde realmente temos transações rápidas que são finalizadas em segundos.

#### Encerramento (12:02) {#closing-1202}

Quero que você imagine como será a vida daqui a dois anos. É um pouco difícil de pensar porque o mundo cripto se move muito rápido. Isso pode ser uma realidade em apenas dois anos: tempos de confirmação de transação de quatro ou seis segundos; finalidade medida em segundos, não em minutos; aplicação no nível do protocolo para resistência à censura; proteções contra criptografia pós-quântica; e L2s competindo em recursos e novas inovações, não apenas indo mais rápido. Tudo isso enquanto ainda mantém a virtude de que você pode usar um laptop ou hardware de nível de consumidor para executar um nó completo em casa. O Ethereum é acessível e permanece acessível para todos no futuro.

A conclusão que quero que você tenha é: a narrativa que apresentei a você no início — não há verdadeiramente nenhuma evidência para apoiá-la. O Ethereum está lançando atualizações rápido. Em apenas um ano, houve três atualizações. E nos próximos 24 meses, há ainda mais coisas por vir, e elas virão ainda mais rápido.

Estes não são apenas cronogramas de fantasia de cinco anos. Estas são coisas reais com propostas concretas sendo desenvolvidas agora mesmo. Há coisas na devnet agora mesmo. Há pessoas trabalhando enquanto conversamos nessas implementações. Se você está construindo no Ethereum hoje, você está construindo na blockchain mais ativamente desenvolvida do mundo.

Eu sou Preston Van Loon, desenvolvedor principal do Ethereum. Eu trabalho na equipe do Prysm na Offchain Labs. Se você quiser se envolver, a melhor maneira de ficar em sintonia com o que está acontecendo no Ethereum é ajudar a construí-lo você mesmo. Venha falar comigo depois. Venha dar uma olhada no repositório do Prysm ou em qualquer um dos repositórios de especificações de consenso ou de execução — adoraríamos muito suas contribuições. Obrigado.