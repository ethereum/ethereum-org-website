---
title: "Blockchain — ETH.BUILD"
description: "Uma demonstração de como a mineração de blockchain funciona, incluindo como os blocos são encadeados, como a Prova de Trabalho (PoW) protege as blockchains e o que acontece quando alguém tenta adulterar os dados."
lang: pt-br
youtubeId: "zcX7OJ-L8XQ"
uploadDate: 2021-01-14
duration: "0:22:44"
educationLevel: beginner
topic:
  - "mineração"
  - "blockchain"
format: tutorial
author: Austin Griffith
breadcrumb: "Blockchain (ETH.BUILD)"
---

Um tutorial de **Austin Griffith** demonstrando como a mineração de blockchain funciona usando a ferramenta de programação visual ETH.BUILD. Austin aborda o consenso de Prova de Trabalho (PoW), encadeamento de blocos, dificuldade de mineração, recompensas de bloco e imutabilidade da cadeia.

*Esta transcrição é uma cópia acessível da [transcrição original do vídeo](https://www.youtube.com/watch?v=zcX7OJ-L8XQ) publicada por Austin Griffith. Ela foi levemente editada para facilitar a leitura.*

#### O problema da coordenação (0:00) {#the-problem-of-coordination-000}

Bom dia, feliz Sexta-feira da Gravata Borboleta! Este ETH.BUILD está focado em blockchain — uma coisa muito legal. Estamos neste barco de palhaço, com nossa gravata borboleta do Bitcoin para isso. Aqui vamos nós.

Então, no currículo até agora, passamos por pares de chaves, hashes e livros-razão. O que descobrimos é que, se quisermos transacionar valor de um lado para o outro em uma rede distribuída — não centralizada —, acabamos tendo problemas de coordenação. Acabamos tendo esse problema em que não conseguimos encontrar consenso entre partes distintas porque todas recebem transações diferentes em momentos diferentes. Existem muitas maneiras diferentes de resolver isso, mas nenhuma delas era excelente até o surgimento da Prova de Trabalho (PoW).

Abordamos os generais bizantinos como uma missão secundária, e o que aprendemos lá é que os generais precisavam provar que tinham um exército quando enviavam mensagens por uma rede insegura. Então, a parte receptora poderia dizer que aquela pessoa era de fato um general com um exército que iria atacar, e eles poderiam se coordenar.

#### Blocos e o nonce (1:04) {#blocks-and-the-nonce-104}

Então, com este livro-razão, estamos injetando transações da rede. Em vez de fazer com que cada usuário individual prove seu trabalho, vamos abstrair a Prova de Trabalho (PoW) em um bloco de transações e deixar que um minerador trabalhe nisso.

Trazemos um bloco que contém transações — o que quer que esteja passando pela rede, nós carregamos neste bloco. Se olharmos para a estrutura deste bloco, ele também tem um nonce. Esse nonce nos permite ajustar o hash. Se pegarmos todo esse bloco, o convertermos em string e fizermos o hash, obteremos um hash. À medida que as transações mudam, esse hash muda, mas também à medida que mudamos o nonce, o hash também muda.

Estamos fazendo um trabalho aqui — temos um conjunto aleatório de transações e estamos mudando o nonce até que o hash tenha um zero à esquerda. Se você assistiu à missão secundária sobre os generais bizantinos, escolhemos esse zero à esquerda como uma quantidade arbitrária de trabalho a ser provada. Então, o nonce simplesmente passa por todos os números — um, dois, três, quatro — e quando obtemos um zero à esquerda, dizemos: esse é um bloco válido.

#### Prova de Trabalho em ação (3:00) {#proof-of-work-in-action-300}

Se pegarmos um bloco minerado, extrairmos o hash e o colocarmos em uma função de hash, podemos provar que ele tem um zero à esquerda — podemos provar que este bloco foi trabalhado.

A função de hash custa CPU, que é um recurso limitado. Estamos usando todo o nosso poder de CPU tentando encontrar um hash com zeros à esquerda. Assim que conseguimos, temos um bloco válido — o bloco está basicamente congelado. Quaisquer transações que estivessem lá no momento estão neste bloco agora, e todos o respeitam, e podemos passar para o próximo bloco.

#### Encadeando blocos (3:56) {#chaining-blocks-together-356}

Aqui está o truque: pegamos o bloco antigo e o conectamos ao novo bloco. Se olharmos para a estrutura, o novo bloco não tem transações e tem um nonce vazio, mas tem um pai com transações. O bloco anterior fará parte do próximo bloco, então teremos uma cadeia inteira.

Lançamos as transações mais recentes do pool de transações e trabalhamos para encontrar um nonce. O bloco número dois é minerado — precisávamos de um nonce de dez para tornar essas transações válidas. Então fazemos a mesma coisa: conectamos o bloco antigo, trazemos o novo, lançamos as transações mais recentes e trabalhamos nele novamente. Após tentativas suficientes, encontramos um nonce para o bloco três. Bloco quatro — mesmo processo, e continuamos avançando.

#### Dificuldade de mineração (5:02) {#mining-difficulty-502}

Isso é muito fácil — conseguimos encontrar um bloco válido muito rapidamente, e queremos que seja mais difícil. Vou aumentar a dificuldade para dois. Conectamos o bloco cinco, trazemos as transações mais recentes e deixamos um contador rodando. Agora estamos na mineração — usando nosso poder limitado de CPU para lançar hashes aleatórios arbitrariamente nisso até encontrarmos um hash com dois zeros à esquerda, porque a dificuldade foi aumentada. Isso vai demorar um pouco.

Agora temos esta blockchain de cinco blocos. Esses blocos contêm transações e cada um faz referência ao anterior. Cada bloco exigiu uma quantidade arbitrária de trabalho para ser produzido, e a quantidade de trabalho é controlada pela dificuldade.

#### O minerador (6:46) {#the-miner-646}

Vamos ver o que é um minerador. No problema dos generais bizantinos, o general que queria "atacar ao amanhecer" precisava de soldados. O que está acontecendo dentro de cada soldado é exatamente o que estamos fazendo aqui com nosso minerador — estamos pegando uma mensagem e um nonce e jogando-os em uma função de hash o mais rápido possível, tentando obter esses zeros à esquerda. Os zeros à esquerda são uma coisa arbitrária com a qual todos concordamos — isso é trabalho suficiente para provar que você é um soldado ou que pode travar uma guerra.

Deixe-me trazer um minerador e fazer isso um pouco mais rápido. O minerador fará a mesma coisa para nossos blocos — ele pega as transações que chegam do pool de transações, as injeta no bloco e simplesmente trabalha nele até encontrar um hash válido.

O minerador é um pouco mais eficiente. Ele é mais focado na mineração. Ele está lançando hashes aleatoriamente — isso é exatamente o que nosso minerador estava fazendo antes, apenas abstraído. Podemos vê-lo trabalhando em segundo plano, apenas gerando hashes sem parar. Ele encontrou — o bloco seis está minerado.

#### Gastos duplos e propagação de rede (10:00) {#double-spends-and-network-propagation-1000}

Agora falamos sobre esse problema de gasto duplo e até mesmo sobre esse problema de propagação de rede. Quando temos um livro-razão e uma rede distribuída e alguém envia uma transação, ela chega a pessoas diferentes em momentos diferentes. Portanto, poderíamos ter dois mineradores na rede que mineram um bloco exatamente ao mesmo tempo, e eles têm transações diferentes neles.

Cada um é válido no momento — ambos fizeram a Prova de Trabalho (PoW), ambos têm zeros à esquerda. Mas eles não podem ser ambos canônicos. Eles não podem ser ambos a verdade. Então, precisamos de uma maneira para a rede chegar a um consenso sobre qual é a cadeia real.

#### Múltiplos mineradores e consenso (12:27) {#multiple-miners-and-consensus-1227}

Deixe-me pegar este bloco e movê-lo para cá. O que eu quero são dois mineradores diferentes trabalhando no mesmo problema, meio que ouvindo o mesmo pool de transações e criando blocos de forma independente. Temos dois mineradores: Mallory e Mike. Aumentei a dificuldade para três, e ambos estão trabalhando para encontrar um hash com três zeros à esquerda.

Então Mallory encontrou um bloco primeiro! Ótimo. Agora o que acontece — como estamos em uma rede distribuída, Mike pode nem saber sobre o bloco de Mallory ainda. Ele pode ainda estar trabalhando em sua própria versão. E agora Mike encontrou um também. Então temos dois caminhos válidos.

Se você é um par na rede e vê o bloco de Mallory primeiro, você acha que esse é o bloco principal. Então, mais tarde, o bloco de Mike chega. Você mantém ambos por perto caso um deles se torne a cadeia mais longa. E a regra é: siga a cadeia válida mais longa.

#### Coinbase e recompensas de bloco (15:33) {#coinbase-and-block-rewards-1533}

Quando um minerador minera um bloco, dizemos: aqui estão todas as transações que queremos, aqui está o nonce, aqui está o pai — mas também vamos dizer aqui está a pessoa que minerou esse bloco. Isso é chamado de coinbase — acho que existe uma empresa com esse nome agora, mas é diferente. Vamos apenas chamá-lo de "minerador". Então, nossos blocos agora exigem um campo de minerador.

Então Mike acabou de encontrar o bloco, e Mike também vai receber um valor de dez com isso. Precisamos incentivar os mineradores a fazer todo esse trabalho, certo? Eles estão gastando dinheiro para comprar esses equipamentos para basicamente tornar a rede segura. Esses mineradores estão gastando dinheiro para proteger a rede com todo o seu poder de hash — com todos os mineradores combinados, dezenas de milhares talvez. Eles estão pagando um bom dinheiro para construir equipamentos que trabalham nesses hashes e, para incentivá-los, damos a eles uma parte chamada recompensa de bloco de cada bloco que eles mineram.

#### Recompensas de bloco e incentivos (16:52) {#block-rewards-and-incentives-1652}

Então, nesta versão do bloco, Mallory tem dez dólares, mas nesta versão Mike tem dez dólares. Cada um desses dois jogadores é incentivado a continuar em sua própria cadeia, e o resto da rede precisa encontrar um consenso. Basicamente, tudo se resume a quem tem a cadeia válida mais longa.

Mike vai configurar seu bloco como o pai e começar a trabalhar no próximo bloco. Mallory vai fazer a mesma coisa. E tudo se resume a quem mais na rede escolhe qual lado. Como não queremos punir pessoas com redes ruins, tenho quase certeza de que no Ethereum pagamos blocos uncle (blocos tios) — blocos válidos que não entraram na cadeia mais longa — porque eles ainda estão ajudando a proteger a rede.

Tínhamos esse problema de coordenação e consenso, e o resolvemos colocando essa quantidade arbitrária de trabalho que deve estar envolvida para tornar as transações válidas. Mallory fez todo esse trabalho gerando hash e gerando hash e gerando hash para encontrar três zeros à esquerda de um hash de todas essas transações e do bloco anterior.

#### Consultando a blockchain (18:30) {#querying-the-blockchain-1830}

Podemos conversar com qualquer que seja a cadeia mais longa. Mike ainda não chegou a sete, então podemos ver que a altura ainda é seis por aqui. E podemos fazer coisas como consultar saldos para as pessoas. Então clicamos em saldo — o que obtemos? Quinhentos e vinte e quatro. Então Heidi tem mantido 524 ou qualquer que seja o token nativo para esta cadeia. Podemos ver o nonce dela, podemos fazer tudo o que podíamos fazer com o livro-razão, mas agora estamos empilhando blocos e esses blocos contêm transações.

Abstraímos o trabalho dos usuários, que estão apenas enviando dinheiro, para os mineradores, e os incentivamos dando a eles essa recompensa de bloco. Também haverá uma pequena quantia que cada pessoa paga por transação, mas chegaremos a isso em um episódio posterior. Não queremos falar sobre gás agora, mas ajuda saber que há um incentivo não apenas para minerar um bloco, mas para minerar um bloco completo com muitas transações. Mas esse é um incentivo menor — chegaremos a isso eventualmente.

#### Imutabilidade da cadeia (19:51) {#chain-immutability-1951}

À medida que os blocos são minerados, eles se tornam cada vez mais seguros. Deixe-me mostrar o que quero dizer. Então Mike minerou um bloco, Mallory estava aqui fazendo uma demonstração e não conseguiu minerar um bloco. Então agora a cadeia de Mike será a mais longa e se espalhará pela rede. Todos a verão e dirão: ok, esta cadeia tem sete blocos, todos são válidos — esta é a que vamos seguir. Você pode ter hard forks, bifurcações contenciosas, onde as regras pelas quais estamos jogando vão mudar e diferentes grupos de humanos querem seguir cadeias diferentes. Coisas legais.

Ok, finalmente, se voltarmos ao bloco três e mudarmos algo — mudarmos qualquer pequeno detalhe — vou entrar aqui. Há alguma transação para Frank. Digamos que, em vez de Frank, mudemos para Eve. Agora veja o que acontece quando eu clico em ok: olhe para isso. Mudei um pedacinho minúsculo do bloco três e, de repente, toda a cadeia desmorona. Ela não é mais válida. Se eu fosse transmitir isso pela rede, as pessoas ririam da minha cara.

Você não pode mudar nada depois que um bloco é minerado, a menos que volte e minere novamente as coisas à medida que mudam. Eu basicamente teria que conectar o minerador de volta aqui e tentar ter poder suficiente para alcançar Mike até aqui com sete blocos. Seria muito, muito difícil. Quanto mais profundo for um bloco, mais difícil será reverter. O fato de que este bloco três aqui, onde Carlos enviou 84 para Bob — Bob pode estar bem seguro sabendo que, com vários blocos de profundidade, esse dinheiro está lá com certeza. Não há como haver alguma bifurcação contenciosa aqui — estou seguro. É isso que chamamos de finalidade.

#### Resumo (22:00) {#summary-2200}

Em vez de ter um livro-razão e esse problema de consenso, usamos a Prova de Trabalho (PoW) para trabalhar em um hash para validar um bloco — e "válido" significa um número arbitrário de zeros à esquerda. Ainda teremos problemas à medida que construímos a cadeia de blocos, onde os blocos minerados podem realmente chegar a lugares diferentes em momentos diferentes. Portanto, temos um algoritmo de consenso adicional que diz: siga a cadeia mais longa que seja válida e que siga o conjunto de regras do qual você deseja participar.

Certo, feliz Sexta-feira da Gravata Borboleta! Isso foi blockchain no ETH.BUILD. Vou salvar isso e colocar lá para que você possa simplesmente clicar em "carregar" e ter uma cadeia para brincar. Feliz sexta-feira!