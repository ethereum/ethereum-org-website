---
title: "Segurança através da obscuridade: usando micropontos para armazenar segredos"
description: "Apresentando uma abordagem não convencional para a custódia de chaves usando tecnologia física de micropontos, ofuscando frases semente em imagens impressas invisíveis a olho nu."
lang: pt-br
youtubeId: "k9Dfg19JPEw"
uploadDate: 2024-11-15
duration: "0:09:55"
educationLevel: intermediate
topic:
  - "privacy-and-security"
  - "privacy"
  - "authentication"
format: presentation
author: Ethereum Foundation
breadcrumb: "Segurança com Micropontos"
---

Uma palestra relâmpago de **jseam** na Devcon SEA explorando uma abordagem não convencional para a custódia de chaves usando tecnologia física de micropontos, historicamente usada em espionagem para ofuscar frases semente em imagens impressas que são virtualmente invisíveis a olho nu.

*Esta transcrição é uma cópia acessível da [transcrição original do vídeo](https://www.youtube.com/watch?v=k9Dfg19JPEw) publicada pela Fundação Ethereum. Ela foi levemente editada para facilitar a leitura.*

#### Por que micropontos? (0:00) {#why-microdots-000}

Olá pessoal, bem-vindos à Tailândia. Na minha palestra, vou falar sobre micropontos — o que exatamente eles são, por que você os desejaria e como você pode realmente fazê-los. Eu tenho algumas amostras, então, após a palestra, vocês podem dar uma olhada.

Há muitas dúvidas sobre Segurança de Operações (OpSec) e como você pode esconder frases semente. Muitos dos processos existentes são todos digitais. Mas e se houver processos físicos? E se você puder ofuscar as coisas? A custódia de chaves continua sendo um problema enorme. Temos o compartilhamento de segredos, a recuperação social — mas eu sei que muitas pessoas de cripto são um pouco antissociais, então a recuperação social pode ser difícil.

Olhe para este gráfico: temos a epidemia de solidão acontecendo agora. Portanto, a custódia de chaves e a recuperação social serão problemas enormes. E se houver abordagens físicas para ofuscar informações?

#### A história da esteganografia de micropontos (2:00) {#the-history-of-microdot-steganography-200}

Esta é uma técnica de esteganografia chamada micropontos. O motivo pelo qual estou mostrando isso hoje é porque isso tem sido historicamente usado em espionagem. O objetivo é essencialmente esconder mensagens à vista de todos.

Toda a documentação sobre isso é muito limitada. Você provavelmente está perguntando ao Claude e ele está dizendo: "Desculpe, sem informações para você". Eu mesmo estava fazendo engenharia reversa dessas informações. Os slides documentam tudo. Não conseguirei cobrir todos os detalhes, mas passarei pelas partes interessantes. Também criei um repositório no GitHub documentando os processos.

#### Fotografia analógica para segurança (3:30) {#analog-photography-for-security-330}

Vamos reviver a fotografia analógica para este caso de uso. Por que analógica? Basicamente, não há chance de alguém hackear uma câmera analógica, a menos que a roubem fisicamente de você.

Um dos principais problemas com a fotografia analógica é o ISO. Em uma câmera digital, isso não é um grande problema — você pode ajustá-lo. Mas com o filme, o ISO é uma função dos grãos do filme. Isso se torna um problema quando você deseja miniaturizar a imagem. Quanto menor o ISO, menores os grãos em geral.

Existem duas fases. Primeiro, você tira uma foto, a revela e a fixa. A segunda fase é onde, em vez de expandir a imagem, fazemos o oposto — nós a encolhemos para uma escala microscópica.

#### O processo britânico (5:00) {#the-british-process-500}

Veja como você faz isso. Você escreve sua frase semente. Normalmente, um tutorial da MetaMask pede que você escreva a frase semente — mas então onde você a coloca? Esta é uma maneira: você tira uma foto da frase semente, enrola o filme, revela o filme. O interessante — todos esses são metais pesados, metais de prata. Você não deve colocá-los no seu vaso sanitário. Eu acidentalmente derramei um pouco no meu vaso sanitário, então posso ter cometido algumas infrações ambientais. Provavelmente vai corroer meus canos no pior dos casos.

Você tira a foto novamente e, tcharã — você tem esse pontinho minúsculo. Isso é chamado de processo britânico.

#### O processo dicromatado (7:00) {#the-dichromated-process-700}

O próximo processo, ainda mais extremo, é o processo dicromatado. É assim que você pode obter ampliações microscópicas como 1000x. O objetivo é encontrar um substrato químico para isso, e é aqui que entra o que chamo de "Suco de Laranja Proibido" — dicromato de amônio. É muito tóxico. Eu derramei um pouco e quase morri quando inalei a poeira. Provavelmente preciso fazer exames de câncer depois disso.

Você projeta a imagem e obtém esses pontinhos minúsculos em um pedaço de papel. Os pontos são tão pequenos que você definitivamente precisa de um microscópio. O que usa o processo britânico você pode ver a olho nu, mas o processo dicromatado produz algo realmente minúsculo — não tenho nem certeza se é uma imagem real sem um microscópio.

#### Perguntas e Respostas (8:00) {#qa-800}

Quão pequenos são os micropontos? Você pode ver o que foi feito usando o processo britânico a olho nu, mas o processo dicromatado produz algo realmente minúsculo — você definitivamente precisa de um microscópio. É difícil dizer se é mesmo uma imagem real sem um.

**Pergunta:** Quanto tempo dura? Existe uma meia-vida?

**jseam:** Não é radioativo. Descobriremos em 20 anos.

**Pergunta:** Você reverteu o processo — codificou e depois decodificou para ver se consegue recuperá-lo?

**jseam:** Eu acho que você conseguiria. Você provavelmente precisaria de algum tipo de configuração de projeção óptica.

Muito obrigado. Se vocês quiserem ver as amostras, estarei por aqui em algum lugar. Obrigado pelo tempo de vocês, pessoal.