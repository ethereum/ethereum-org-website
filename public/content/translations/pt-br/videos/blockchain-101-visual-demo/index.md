---
title: "Blockchain 101: uma demonstração visual"
description: "Uma demonstração de como a tecnologia blockchain funciona, cobrindo geração de hash, blocos, cadeias, livros-razão distribuídos e tokens para tornar os conceitos de blockchain tangíveis e intuitivos."
lang: pt-br
youtubeId: "_160oMzblY8"
uploadDate: 2016-11-13
duration: "0:17:49"
educationLevel: beginner
topic:
  - "blockchain"
  - "criptografia"
format: presentation
author: Anders Brownworth
breadcrumb: "Blockchain 101"
---

A demonstração visual de Anders Brownworth sobre como a tecnologia blockchain funciona, incluindo um passo a passo cobrindo a geração de hash SHA-256, blocos, mineração, blockchains, livros-razão distribuídos, tokens e muito mais.

*Esta transcrição é uma cópia acessível da [transcrição original do vídeo](https://www.youtube.com/watch?v=_160oMzblY8) publicada por Anders Brownworth. Ela foi levemente editada para facilitar a leitura.*

#### Hash SHA-256 (0:01) {#sha-256-hash-001}

Esta é uma demonstração de blockchain. Vamos fazer isso de uma forma muito visual — vamos tornar muito fácil de entender, passando pelas peças-chave do que é uma blockchain.

Antes de começarmos, precisamos dar uma olhada nessa coisa chamada hash SHA-256. Um hash parece um monte de números aleatórios e, essencialmente, o que ele é, é uma impressão digital de alguns dados digitais. Acontece que é uma impressão digital de qualquer coisa que eu digitar nesta caixa. Se eu digitar meu nome "Anders" nesta caixa, você verá que o hash mudou. Na verdade, ele mudou toda vez que digitei uma letra.

Então este é o hash do nome "Anders", todo em minúsculas — ele começa com `19ea`. Se eu apagar isso e digitar "Anders" novamente, você pode ver que ele começa com `19ea` — exatamente o mesmo hash. Nesse sentido, é uma impressão digital desses dados. Quaisquer que sejam os dados aqui, toda vez que você digitar exatamente os mesmos dados, obterá exatamente o mesmo hash.

Eu posso digitar o que eu quiser. Você pode não ter nada — `e3b0` — esse é o hash do nada. Ou você pode digitar toneladas e toneladas de coisas. Na verdade, você poderia colocar a Biblioteca do Congresso aqui e obteria um hash. O interessante é que, independentemente de haver uma quantidade minúscula de informações, nenhuma informação ou toda a Biblioteca do Congresso, você sempre obterá um hash com esse comprimento. Você não será capaz de adivinhar o que é isso — você meio que tem que inserir os dados para descobrir qual é o hash, mas sempre obterá exatamente o mesmo hash, independentemente de quantas vezes inserir exatamente a mesma informação.

#### Bloco (2:10) {#block-210}

O que vou fazer é estender essa ideia de um hash para algo que chamaremos de bloco. Um bloco é exatamente como o hash, mas a seção de dados foi dividida em três seções: uma chamada "bloco" — apenas um número, este é o bloco número 1 —, um "nonce", que é apenas outro número, e então alguns dados, exatamente como tínhamos antes.

O hash de todas essas informações está aqui embaixo e começa com quatro zeros. Esse é um hash relativamente incomum — a maioria deles não vai começar com quatro zeros assim. Mas este começa e, por causa disso, de forma totalmente arbitrária, vou dizer que este bloco está "assinado".

O que aconteceria se eu mudasse qualquer parte dessa informação? Digamos que eu digite algo aqui — o hash vai mudar, e qual é a chance de começar com quatro zeros? Muito baixa. Vou apenas dizer "oi" — olhe para isso, este hash não começa com quatro zeros e o fundo ficou vermelho. Então agora você sabe que este bloco com esta informação não é um bloco válido ou assinado.

É aí que entra o nonce. O nonce é apenas um número que você pode definir para tentar encontrar um valor que faça o hash começar com quatro zeros novamente. Eu poderia ficar sentado aqui o dia todo digitando números, mas eu tenho este pequeno botão "Minerar" (Mine). O que vai acontecer quando eu pressioná-lo é que ele percorrerá todos os números de 1 em diante para tentar encontrar um em que o hash comece com quatro zeros. Esse processo é chamado de mineração.

Ele parou em 59.396 — e esse, por acaso, gera um hash que começa com quatro zeros. Ele satisfaz a minha definição do que é um bloco assinado.

#### Blockchain (5:16) {#blockchain-516}

Então, você pode me dizer o que é uma blockchain? Provavelmente é apenas uma cadeia desses blocos. Aqui está a minha blockchain — o bloco número um tem um nonce exatamente como antes, uma área de dados, mas depois tem este campo "anterior" (previous) que é um monte de zeros. Seguindo em frente, este é o bloco dois, bloco três, bloco quatro — esta blockchain tem cinco blocos nela.

O campo "anterior" para cada bloco é o hash do bloco anterior a ele. Você pode ver que cada bloco aponta para trás, para o anterior. Aquele primeiro bloco não tem anterior, então é apenas um monte de zeros.

O que acontece se eu mudar alguma informação aqui? Isso vai mudar o hash deste bloco e invalidá-lo. Mas e se eu mudar algo em um bloco anterior? Isso vai mudar aquele hash, mas esse hash é copiado para o campo "anterior" do próximo bloco, então isso quebra ambos os blocos. Podemos voltar o quanto quisermos a algum ponto no passado e quebrar aquele bloco, e isso quebrará todos os blocos desde então. Tudo antes dele ainda está verde, mas tudo depois fica vermelho.

Se eu for e mudar o último bloco, tudo o que tenho a fazer é minerar novamente aquele único bloco. Se eu voltar muito no tempo e fizer uma alteração, terei que minerar este, este, este e este. Quanto mais blocos passam, mais e mais difícil é fazer uma alteração. É assim que uma blockchain resiste à mutação — resiste à mudança.

#### Blockchain distribuída (9:18) {#distributed-blockchain-918}

Então, como eu saberia se minha blockchain foi minerada novamente? Agora temos uma blockchain distribuída. Ela se parece exatamente com a última blockchain, mas este é o Par A. Se você descer aqui, poderá ver o Par B, e ele tem uma cópia exata da blockchain. Há também um Par C — isso poderia continuar para sempre. Existem muitos pares na internet, e todos eles têm uma cópia completa da blockchain.

Se eu olhar para este hash, é `e4b`. Se eu descer para o próximo, ele também tem `e4b`. Eles devem ser idênticos. Agora, se eu for aqui e digitar algo, minerar novamente este bloco e depois minerar os próximos blocos — todas as cadeias estão verdes. No entanto, esta cadeia diz que o último hash é `e4b`, a de baixo diz `e4b` também, e esta do meio diz `4cae`.

Então eu sei, apenas dando uma olhada neste pequeno hash, que algo está errado nesta blockchain. Mesmo que todos os hashes comecem com quatro zeros, este é diferente. É essencialmente dois contra um — somos uma pequena democracia aqui. Então `e4b` vence. É assim que ter uma cópia completamente distribuída em muitos computadores diferentes permite que você veja rapidamente se todos os blocos são idênticos.

Blockchains podem ter 400.000 ou 500.000 blocos muito facilmente. Em vez de verificar todos eles, tudo o que você realmente precisa fazer é olhar para o hash do mais recente, e você pode ver se algo no passado foi alterado.

#### Tokens (12:17) {#tokens-1217}

Isso é tudo — não há nada mais do que isso. Mas meio que não é muito útil porque não temos nada na área de dados que signifique alguma coisa. O que realmente queremos é um token.

Agora eu tenho esses tokens — de forma totalmente arbitrária, estou chamando-os de dólares. Temos vinte e cinco dólares de Darcy para Bingley, quatro dólares e vinte e sete centavos de Elizabeth para Jane — você entendeu a ideia. Há todas essas transações acontecendo, e eu simplesmente substituí os dados por essas transações. Exatamente como antes, se descermos, notaremos que temos todas essas outras cópias da mesma blockchain.

É aqui que a imutabilidade é importante. Se eu mudar algo aqui atrás, o hash será diferente do que está nas outras cópias. É muito importante que, se você voltar no tempo e alterar algum valor, nós perceberíamos. É muito importante com dinheiro que você não perca o controle, e esse é o objetivo principal de usar uma blockchain — resistir a qualquer tipo de modificação em coisas que aconteceram no passado.

Uma coisa que eu gostaria de mencionar: não estamos listando "Darcy tem cem dólares e está dando 25 para Bingley". Estamos apenas lembrando as movimentações de dinheiro, não os saldos das contas bancárias. Isso levanta a questão — Darcy tem US$ 25?

#### Transação Coinbase (14:34) {#coinbase-transaction-1434}

Temos um problema nesta versão da blockchain: na verdade, não sabemos se Darcy tem US$ 25. Então, vamos dar uma olhada em uma transação Coinbase. Adicionamos uma transação Coinbase aos nossos blocos — ela diz que vamos inventar cem dólares do nada e dar para Anders. Não há outras transações neste bloco porque ninguém tinha dinheiro antes disso.

No próximo bloco, outros cem dólares surgem do nada e vão para Anders. Agora temos algumas transações — são todas do Anders porque sou o único que tem algum dinheiro neste momento. Estou enviando dez dos meus dólares para Sophie. Eu tenho dez dólares? Sim — eu olho para trás e vejo que a transação Coinbase me deu cem, então eu tenho pelo menos dez.

Você soma tudo isso e não passa de cem. Isso segue uma regra básica da moeda: você não pode criar dinheiro do nada, e sua dispersão é controlada.

Se avançarmos no tempo, vemos que Jackson está dando dois dólares para Alexa. Jackson realmente tem dois dólares? Voltamos um bloco e vemos que Emily tinha recebido dez dólares de Anders e deu dez para Jackson. Então Jackson tem o dinheiro. Podemos voltar e descobrir isso — esse é um dos benefícios de ter o campo "anterior".

#### Encerramento (16:30) {#closing-1630}

Essa é uma blockchain básica executando uma moeda sobre ela. Como você sabe, as blockchains têm muitas cópias — todo mundo tem uma cópia. Se alterarmos algo e o transformarmos em seis dólares, os blocos se tornam inválidos e não concordam com as outras cópias. Isso resiste à adulteração, que é o que você deseja para uma moeda. Funciona muito bem para coisas que são pequenas e transacionais.

Blockchains são uma maneira muito eficiente de lidar com o consenso sobre o que aconteceu no passado — essa história imutável que se consolida com o tempo. Estamos passando por cima de alguns pontos principais, mas se você se aprofundar na demonstração, clicar nessas coisas e brincar com ela, terá uma ideia cada vez melhor de como isso funciona.