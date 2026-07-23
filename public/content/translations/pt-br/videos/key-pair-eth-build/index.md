---
title: "Par de chaves — ETH.BUILD"
description: "Uma demonstração de pares de chaves públicas e privadas usando a ferramenta educacional ETH.BUILD. Entenda como os pares de chaves criptográficas protegem as contas Ethereum e permitem a assinatura de transações."
lang: pt-br
youtubeId: "9LtBDy67Tho"
uploadDate: 2021-01-14
duration: "0:04:05"
educationLevel: beginner
topic:
  - "accounts"
  - "cryptography"
format: tutorial
author: Austin Griffith
breadcrumb: "Pares de chaves (ETH.BUILD)"
---

Um tutorial de **Austin Griffith** demonstrando como os pares de chaves públicas e privadas funcionam usando a ferramenta de programação visual ETH.BUILD, cobrindo a geração de chave privada, derivação de chave pública, assinatura de mensagem e recuperação de assinatura.

*Esta transcrição é uma cópia acessível da [transcrição original do vídeo](https://www.youtube.com/watch?v=9LtBDy67Tho) publicada por Austin Griffith. Ela foi levemente editada para facilitar a leitura.*

### A chave privada (0:00) {#the-private-key-000}

No primeiro vídeo, usamos um hash, e os hashes serão importantes daqui para frente. Mas a próxima peça mais importante é um par de chaves. A peça mais importante de um par de chaves é a chave privada. Vamos em frente e gerar uma — é basicamente uma string hexadecimal aleatória de 64 caracteres, do mesmo tamanho do hash com o qual estávamos trabalhando.

Você começa com isso como sua chave privada e, em seguida, usando a criptografia de curva elíptica — confira na Wikipedia como uma missão secundária — derivamos uma chave pública. Então agora temos uma chave privada e uma chave pública. Acabamos de gerar uma chave privada do nada, e a chave pública nos dá um endereço. É para cá que as pessoas poderiam realmente enviar dinheiro. Quando alguém diz "envie para o meu endereço Ethereum", é isso que é.

Se eu quisesse criar uma conta no Wells Fargo, teria que ir até o banco e dar a eles um monte de informações. Demoraria um pouco. Mas para gerar uma conta dentro de um sistema criptográfico como este, onde posso enviar e receber dinheiro, eu apenas gero essa chave privada. Essa chave privada hexadecimal de 64 caracteres deriva todo o resto.

### Assinando e recuperando mensagens (1:54) {#signing-and-recovering-messages-154}

Há uma propriedade muito legal sobre esse par de chaves que devemos explorar, que é a assinatura e a recuperação de mensagens. Basicamente, você pega sua chave privada e a usa para assinar algum tipo de mensagem. Vamos digitar uma mensagem — "o urso está pegajoso de mel".

Nós inserimos isso como nossa mensagem e, com a assinatura automática ativada, ela nos devolve uma assinatura. Mais ou menos como o hash, nossa assinatura é basicamente pegar a mensagem e nossa chave privada e assinar algo. O que obtemos disso é uma assinatura.

Eu posso enviar isso para o mundo — eu poderia enviar isso publicamente para todos — essa string de assinatura junto com a mensagem. O que qualquer um pode fazer com a matemática é verificar que fui especificamente eu quem a assinou.

### Recuperando o endereço do signatário (3:17) {#recovering-the-signers-address-317}

Deixe-me mostrar como isso funciona. Usamos um método "recover". Precisamos de duas entradas: a mensagem — "o urso está pegajoso de mel" — e a assinatura. O que sai disso é o endereço que foi usado para assiná-la. Podemos ver visualmente que a conta assinou essa mensagem usando os identicons Blockie.

Não há como adulterar isso. Se alguém mudar até mesmo uma única palavra — como trocar "urso" por "texugo" — tudo muda. Mesmo com a mesma assinatura, uma mensagem diferente retorna um endereço diferente, não o correto.

Esta mensagem não pode ser adulterada. Poderíamos colocar um carimbo de data/hora (timestamp) lá — poderíamos dizer "neste dia eu prevejo que algo vai acontecer", assiná-la, divulgar a assinatura e a mensagem, e qualquer pessoa pelo resto do tempo pode provar matematicamente que você assinou essa mensagem naquele momento.

### A propriedade principal de um par de chaves (4:58) {#the-key-property-of-a-key-pair-458}

Esta é a propriedade principal de um par de chaves. Um par de chaves gerado a partir de nada mais do que uma string aleatória hexadecimal de 64 caracteres pode ser usado para assinar uma mensagem e, em seguida, essa mensagem pode ser recuperada.

- Chave privada + mensagem = assinatura
- Assinatura + mensagem = endereço público

Podemos assinar dados com nossa chave privada, e as pessoas podem provar que fomos nós que os assinamos. Essa será uma peça importante para o próximo passo.