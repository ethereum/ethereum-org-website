---
title: "O que é Prova de Trabalho?"
description: "Uma explicação amigável para iniciantes sobre o mecanismo de consenso de Prova de Trabalho (PoW), incluindo como os mineradores resolvem quebra-cabeças criptográficos para validar transações e proteger a rede blockchain."
lang: pt-br
youtubeId: "3EUAcxhuoU4"
uploadDate: 2019-02-22
duration: "0:05:31"
educationLevel: beginner
topic:
  - "consenso"
  - "pow"
format: explainer
author: Binance Academy
breadcrumb: "Prova de Trabalho"
---

Uma explicação da **Binance Academy** cobrindo o mecanismo de consenso de Prova de Trabalho (PoW), incluindo suas origens, como os mineradores competem para resolver quebra-cabeças criptográficos e como isso protege a rede blockchain.

*Esta transcrição é uma cópia acessível da [transcrição original do vídeo](https://www.youtube.com/watch?v=3EUAcxhuoU4) publicada pela Binance Academy. Ela foi levemente editada para facilitar a leitura.*

#### Origens da Prova de Trabalho (0:00) {#origins-of-proof-of-work-000}

Originalmente datado de 1993, o conceito de Prova de Trabalho foi desenvolvido para evitar ataques de negação de serviço e outros abusos de serviço, como spam em uma rede, ao exigir algum trabalho do usuário do serviço — geralmente significando tempo de processamento por um computador.

Em 2009, o Bitcoin introduziu uma maneira inovadora de usar a Prova de Trabalho como um algoritmo de consenso para validar transações e transmitir novos blocos para a blockchain. Desde então, espalhou-se para se tornar um algoritmo de consenso amplamente utilizado em muitas criptomoedas.

#### Como a Prova de Trabalho funciona (0:33) {#how-proof-of-work-works-033}

Em resumo, os mineradores em uma rede competem entre si para resolver quebra-cabeças computacionais complexos. Esses quebra-cabeças são difíceis de resolver, mas fáceis de verificar assim que alguém encontra a solução correta.

Assim que um minerador encontra a solução para o quebra-cabeça, ele pode transmitir o bloco para a rede, onde todos os outros mineradores verificarão se a solução está correta.

#### Exemplo de mineração de Bitcoin (0:56) {#bitcoin-mining-example-056}

O Bitcoin é um sistema baseado em blockchain mantido pelo trabalho coletivo de nós descentralizados. Alguns desses nós são conhecidos como mineradores e são responsáveis por adicionar novos blocos à blockchain.

Para fazer isso, os mineradores precisam tentar adivinhar um número pseudoaleatório conhecido como nonce. Esse número, quando combinado com os dados fornecidos no bloco e passado por uma função de hash, deve produzir um resultado que corresponda a determinadas condições — por exemplo, um hash começando com quatro zeros.

Quando um resultado correspondente é encontrado, os outros nós verificam a validade do resultado, e o nó minerador é recompensado com a recompensa de bloco. Portanto, é impossível adicionar um novo bloco à cadeia principal sem primeiro encontrar um nonce válido, que por sua vez gera a solução para aquele bloco específico — chamado de hash do bloco.

#### Por que é chamado de "Prova de Trabalho" (1:46) {#why-its-called-proof-of-work-146}

Cada bloco validado contém um hash de bloco que representa o trabalho feito pelo minerador. É por isso que é chamado de Prova de Trabalho.

#### Benefícios de segurança (1:54) {#security-benefits-154}

A Prova de Trabalho ajuda a proteger a rede contra vários ataques diferentes. Um ataque bem-sucedido exigiria muito poder computacional e muito tempo para fazer os cálculos. Portanto, seria ineficiente, já que o custo incorrido seria maior do que as recompensas potenciais por atacar a rede.

#### Limitações (2:10) {#limitations-210}

Um problema com a Prova de Trabalho é que a mineração exige hardware de computador caro que consome uma grande quantidade de energia. Embora os cálculos complicados do algoritmo garantam a segurança da rede, esses cálculos não podem ser utilizados além disso.

#### Olhando para o futuro (2:25) {#looking-ahead-225}

Embora a Prova de Trabalho possa não ser a solução mais eficiente, ainda é um dos métodos mais populares de alcançar consenso em blockchains. Já existem métodos e abordagens alternativas tentando resolver esses problemas, mas só o tempo dirá qual método será o sucessor da Prova de Trabalho.