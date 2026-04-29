---
title: "Função de hash — ETH.BUILD"
description: "Uma demonstração de funções de hash criptográficas usando a ferramenta educacional ETH.BUILD. Aprenda como as funções de hash funcionam e por que elas são fundamentais para o modelo de integridade de dados e contas do Ethereum."
lang: pt-br
youtubeId: "QJ010l-pBpE"
uploadDate: 2021-01-14
duration: "0:04:39"
educationLevel: beginner
topic:
  - "contas"
  - "criptografia"
format: tutorial
author: Austin Griffith
breadcrumb: "Funções de hash (ETH.BUILD)"
---

Um tutorial de **Austin Griffith** demonstrando como as funções de hash criptográficas funcionam usando a ferramenta de programação visual ETH.BUILD, cobrindo determinismo, saída de comprimento fixo, propriedades unidirecionais e árvores de Merkle.

*Esta transcrição é uma cópia acessível da [transcrição original do vídeo](https://www.youtube.com/watch?v=QJ010l-pBpE) publicada por Austin Griffith. Ela foi levemente editada para facilitar a leitura.*

### Introdução às funções de hash (0:00) {#introduction-to-hash-functions-000}

Este é o primeiro vídeo de uma série chamada ETH.BUILD. Você pode acessar eth.build para usar essa ferramenta, mas é apenas para brincar e ter uma ideia de como as coisas funcionam ao construir no Ethereum.

O primeiro módulo que vamos analisar é uma função de hash. O que diabos é uma função de hash? Bem, é como se fosse uma impressão digital. Você tem uma entrada — pode ser qualquer coisa — mas por enquanto vamos usar apenas o texto "hello world". Do outro lado, você terá uma saída, e essa saída é uma string hexadecimal de 64 caracteres. Ela diz 66 caracteres por causa do prefixo "0x", mas na verdade é uma string hexadecimal de 64 caracteres.

### Visualizando hashes como cores (0:50) {#visualizing-hashes-as-colors-050}

Se você olhar para o hexadecimal, ele se parece um pouco com uma cor, e pode ser mais fácil descrever o que estamos vendo aqui se simplesmente o transformarmos na cor. Então, o que vamos fazer é pegar os primeiros seis caracteres de qualquer que seja a string e exibi-la como uma cor. Se olharmos para isso, veremos que é uma bela cor roxa.

Vamos ver qual é a cor do meu nome — aí está, um belo verde floresta. Agora vamos voltar para "hello world" — é aquele roxo de novo.

### Determinismo e saída de comprimento fixo (1:38) {#determinism-and-fixed-length-output-138}

O que acabamos de descobrir é que ela é determinística. Basicamente, não importa o que coloquemos como nossa entrada, sempre obteremos a mesma coisa do outro lado.

A segunda propriedade é que você pode inserir qualquer coisa de qualquer tamanho arbitrário. Eu posso bater no teclado e ver a cor mudar, mas essa string permanece com aquele comprimento de 66 caracteres. Não importa o que você coloque aqui — até mesmo um arquivo — eu poderia soltar este arquivo do Leo, meu garoto, e colocá-lo como um hash e obter uma bela cor laranja. Então eu poderia soltar um documento de texto de lista de palavras BIP e é este belo azul claro. Se eu trouxer o Leo de volta, adivinhe que cor vai ser? Sabemos que será aquele laranja. Você obtém essa impressão digital determinística da coisa que você inseriu.

### Propriedade unidirecional (2:37) {#one-directional-property-237}

A próxima propriedade mais importante é que ela é unidirecional. Se eu colocar "hello world" novamente, obteremos este hash "4717". Se pegarmos esse hash e o enviarmos a alguém e dissermos "aqui está o hash do meu segredo — se você conseguir adivinhar meu segredo, eu te dou cem dólares", eles não conseguirão chegar perto.

Digamos que o hash comece com "4717" e eles comecem a fuçar tentando encontrar uma correspondência. Você não pode simplesmente mudar pequenos caracteres e chegar perto — ou você acerta ou não. Você basicamente tem que adivinhar por força bruta. Se por acaso eles adivinharem "hello world", eles obterão a resposta, mas se não adivinharem, nunca a obterão. Não há como saber se você está chegando mais perto.

Você descobrirá com a criptografia que às vezes é frustrante como desenvolvedor porque ou funciona ou não funciona — você não recebe nenhuma dica sobre se está chegando perto. Mas isso é uma coisa boa. Essa é a propriedade que queremos de uma função de hash.

### Resumo das propriedades da função de hash (3:43) {#summary-of-hash-function-properties-343}

Então nós temos: qualquer coisa de qualquer tamanho pode ser alimentada em uma função de hash, e ela vai cuspir uma impressão digital hexadecimal exata de 64 caracteres do que são esses dados. É determinística. É unidirecional — você não pode voltar para o outro lado. É muito fácil fazer um hash, mas muito difícil adivinhar o segredo do hash.

### Árvores de Merkle e combinação de hashes (4:06) {#merkle-trees-and-combining-hashes-406}

O que podemos fazer com isso são algumas coisas muito legais, como uma árvore de Merkle. Temos nossas três entradas e poderíamos juntá-las. Podemos combinar todos esses hashes e, em seguida, fazer o hash da combinação.

Esta cor bem aqui — aquele roxo — representa o hash de todos esses hashes. Se eu mudar "hello world" para "hello world one", aquele roxo vai mudar. Qualquer pequena alteração em qualquer uma dessas entradas fará com que o hash final mude. Você pode trazer todos os tipos de dados de todas as maneiras diferentes — até mesmo ter uma árvore de hashes, uma árvore de Merkle — ou ter um monte de blocos em sequência, e esse hash final será baseado em todas essas coisas. Se qualquer pequena coisa mudar em qualquer lugar ao longo do caminho, o hash final vai mudar.

### Principal lição (5:53) {#key-takeaway-553}

A principal lição é que uma função de hash é basicamente como uma impressão digital. Se eu digitar algo, ela me dará deterministicamente a saída que espero. Isso é uma função de hash — bem-vindo ao ETH.BUILD. Vamos fazer algumas coisas legais e aprender muito ao longo do caminho.