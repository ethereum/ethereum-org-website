---
title: "Transações — ETH.BUILD"
description: "Uma demonstração de como as transações do Ethereum funcionam usando a ferramenta educacional ETH.BUILD. Veja como as transações são construídas, assinadas e enviadas na rede Ethereum."
lang: pt-br
youtubeId: "er-0ihqFQB0"
uploadDate: 2021-01-14
duration: "0:06:12"
educationLevel: beginner
topic:
  - "transactions"
format: tutorial
author: Austin Griffith
breadcrumb: "Transações (ETH.BUILD)"
---

Um tutorial de **Austin Griffith** demonstrando como as transações do Ethereum funcionam usando a ferramenta de programação visual ETH.BUILD — cobrindo a estrutura da transação, preços do gás, assinatura, transmissão e o pool de transações.

*Esta transcrição é uma cópia acessível da [transcrição original do vídeo](https://www.youtube.com/watch?v=er-0ihqFQB0) publicada por Austin Griffith. Ela foi levemente editada para facilitar a leitura.*

#### Taxas de transação e incentivos aos mineradores (0:00) {#transaction-fees-and-miner-incentives-000}

No ETH.BUILD hoje, vamos falar sobre transações. Até agora, nós meio que temos essas transações sendo mineradas em blocos, empacotadas em blocos e mineradas em uma cadeia. Queremos falar sobre o que incentiva o minerador — além da recompensa de bloco — a retirar nossa transação do pool e colocá-la em um bloco e minerá-la na cadeia, em comparação com outras pessoas no pool. Pode haver milhares de pessoas no pool que estão meio que dando lances, e esse lance é feito com essa taxa.

Eu poderia ter uma taxa na minha transação que diz "Eu sou a Alice e estou enviando cinco para o Bob, e meu nonce é um para proteção contra repetição." Além disso, quem minerar isso pode ficar com a taxa para si. Basicamente, a Alice está enviando cinco para o Bob, mas também pagando um trocado ao minerador para colocar isso na cadeia.

#### Anatomia de uma transação do Ethereum (1:10) {#anatomy-of-an-ethereum-transaction-110}

Como é uma transação no Ethereum? Não teremos mais "Bob" e "Alice" — teremos endereços. O valor seria em Wei, não em ETH. E a taxa também seria em Wei.

Vamos mergulhar e dar uma olhada nesta transação. Eu tenho uma conta com um mnemônico inserido e estou conectado à Rede Principal do Ethereum. Também estou executando um módulo para obter dados de preços do CoinMarketCap, para que eu possa ver que zero vírgula um e pouco ETH se traduz em cerca de vinte e três dólares.

#### Configurando a transação (2:25) {#setting-up-the-transaction-225}

O que vou fazer é criar uma transação e incentivar o minerador a pegá-la e colocá-la onchain. Eu tenho dois personagens — Alice e Bob. A Alice vai enviar com sua chave privada algum valor para o Bob. Não há um campo de endereço "de" (from) aqui porque — lembre-se — estamos assinando e recuperando com nosso par de chaves. A transação é empacotada, assinada e depois enviada pela rede. Ninguém pode adulterá-la e, do outro lado, alguém pode recuperá-la e descobrir que fomos nós mesmos que a assinamos. O endereço "de" é derivado.

#### Estratégia de preço do gás (4:20) {#gas-price-strategy-420}

O preço do gás é definido para cerca de 4.1 gwei por padrão — isso é 4.1 bilhões de Wei. Mas queremos ser mais estratégicos sobre isso e ver o que está acontecendo onchain agora. Podemos ver que o último bloco teve 78 transações, e o preço do gás variou de cerca de 5 até um valor mínimo. Basicamente, precisaríamos estar acima de 5 para sermos minerados naquele bloco. Então, vamos definir o preço do gás para 5.001 — apenas um pouco mais.

#### Convertendo para Wei (5:20) {#converting-to-wei-520}

Precisamos fazer uma conversão para Wei. No Ethereum, você lida principalmente com duas denominações: ETH, que é a que as pessoas normalmente falam, e depois Wei, que é como uma fração muito pequena de ETH. Um gwei — o que usamos para preços do gás — está no meio. O motivo para isso é semelhante ao motivo pelo qual não andamos por aí falando em frações de centavos.

A Alice tem 0.18 ETH, e vamos enviar 0.05 ETH para o Bob. Colocamos um preço do gás de 5 gwei.

#### Assinatura e transmissão (7:02) {#signing-and-broadcasting-702}

Quando a Alice escolhe assinar a transação, ela é disparada como uma transação assinada que pode atravessar a rede. Ninguém pode mexer nela — do outro lado, alguém pode derivar que foi a Alice quem a assinou, e ela contém todas as informações sobre para quem queremos enviar e o gás que vai para o minerador.

Pegamos essa transação assinada e a conectamos à função de envio do módulo da blockchain. Quando clico em enviar, ele nos dá um hash — o hash da transação. Basicamente, eu a enviei para a rede distribuída e eles me devolveram um hash da transação. Ela sai na rede, e então há esse pool de transações — pessoas todas dando lances para que sua transação passe.

#### Verificando o bloco (8:41) {#checking-the-block-841}

Podemos consultar a blockchain pela nossa transação. Com certeza, ela já foi minerada. Podemos olhar para o bloco, classificar por preço do gás e nos encontrar. Lá está a nossa transação com o preço do gás de 5.001 — Alice enviando para Bob, sem dados extras. Estamos lá, a cerca de quatro ou cinco posições do final.

#### Enviando dados com uma transação (9:54) {#sending-data-with-a-transaction-954}

Somos capazes de enviar valor e dar lances para que nossa transação seja reconhecida onchain. Mas vamos olhar para mais uma coisa — o campo de dados. Podemos enviar coisas junto com a nossa transação. Isso estará em hexadecimal. A Alice vai enviar mais seis dólares para o Bob, e anexaremos uma mensagem: "hey Bob". Podemos ver "hey Bob" convertido em hex.

Nós assinamos essa transação, a enviamos para um minerador, ela vai para a rede e recebemos um hash de volta. Observamos para que ela seja minerada, e ela é. Quando verificamos esse bloco, podemos ver nossa transação com os dados anexados.

#### Pool de transações e aumento de gás (12:43) {#transaction-pool-and-gas-bumping-1243}

Para uma última demonstração, coloquei uma transação no pool com um preço do gás muito baixo — cerca de 1.001 gwei. Ela está lá parada, sem ser minerada, porque não estamos incentivando os mineradores o suficiente. Podemos ver que a transação está pendente no pool de transações. O pool tem entre cem e trezentas transações, mas os últimos blocos sendo minerados mostram que o menor preço do gás é cerca de 5.

Então precisamos reenviar esta transação — vamos aumentá-la para 10. Isso é muito mais do que precisa ser, mas reenviaremos a mesma transação com o mesmo nonce, mas com um preço do gás mais alto. A rede diz "mesma pessoa, mesma transação, disposta a pagar mais". Ela é pega e minerada no próximo bloco.

#### Resumo (14:52) {#summary-1452}

Enviamos uma transação, pagamos um pouco de gás para incentivar o minerador a colocá-la na cadeia de blocos. Também enviamos dados junto com uma transação — há todo tipo de coisas muito legais que podemos fazer agora que temos esses dados de chamada acompanhando, e entraremos em contratos inteligentes e muitas coisas divertidas mais tarde.