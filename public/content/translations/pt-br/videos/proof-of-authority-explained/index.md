---
title: "Criptoeconomia: prova de autoridade"
description: "Uma aula de criptoeconomia explicando o mecanismo de consenso de prova de autoridade (PoA), cobrindo como funciona, suas vantagens e desvantagens em comparação com a Prova de Trabalho e a prova de participação, e onde é usado na prática."
lang: pt-br
youtubeId: "Mj10HSEM5_8"
uploadDate: 2018-10-19
duration: "0:09:18"
educationLevel: intermediate
topic:
  - "consensus"
  - "proof-of-authority"
format: presentation
author: Cryptoeconomics Study
breadcrumb: "Prova de Autoridade"
---

Uma aula de criptoeconomia da **Cryptoeconomics Study** explicando o mecanismo de consenso de prova de autoridade (PoA), incluindo como uma autoridade central determina a ordenação de transações, os problemas de gasto duplo e censura que isso introduz, e a abordagem de mitigação por multissinatura.

*Esta transcrição é uma cópia acessível da [transcrição original do vídeo](https://www.youtube.com/watch?v=Mj10HSEM5_8) publicada pela Cryptoeconomics Study. Ela foi levemente editada para facilitar a leitura.*

#### Como a prova de autoridade funciona (0:00) {#how-proof-of-authority-works-000}

Bem-vindo à seção 2.4 — prova de autoridade — onde restabelecemos essa autoridade central para determinar a ordenação de transações e resolver aquele pequeno e irritante problema de gasto duplo.

Era uma vez uma autoridade central de quem todos meio que gostavam. Todos aprovaram essa grande autoridade e disseram: "Por que não a ouvimos? Estávamos tendo esses problemas e não concordamos sobre o estado correto, então vamos apenas deixar que ela nos diga qual é o estado."

Nossa autoridade central executa seu grande nó, e agora as pessoas assinam transações e, em vez de enviá-las diretamente umas às outras, elas as enviam para a autoridade central. A autoridade central aplica cada transação e a assina ela mesma, dizendo: "Sim, eu aprovo — esta é a transação zero." A autoridade central então a envia para todos, e todos recebem a transação e a aceitam como verdade absoluta.

#### O problema do gasto duplo (1:05) {#the-double-spend-problem-105}

Agora vamos tentar o gasto duplo. O que vai acontecer? Mallory vai enviar duas transações conflitantes para a autoridade central. A autoridade central recebe a primeira e assina que esta é a segunda transação que ela viu, depois assina que esta é a terceira transação que ela viu, e então propaga essas mensagens.

O que acontece? Todos recebem as mesmas mensagens e todos observam a ordenação da autoridade central. Isso significa que todos acabam com os mesmos históricos. Se olharmos para os estados, estamos indo bem — Alice envia para Jing, depois Mallory envia para Alice, depois Mallory tenta enviar para Jing, mas essa não passa porque Mallory não tem dinheiro suficiente. Seus saldos serão todos iguais. Estão todos em consenso. A autoridade central — ótimo, conseguimos.

#### Quando a autoridade é comprometida (2:09) {#when-the-authority-is-compromised-209}

Mas o problema é que temos que confiar na autoridade central para fornecer essa ordenação de transações. Então, o que acontece se a autoridade central for expulsa e descobrirmos que ela era a Mallory o tempo todo?

Voltamos aos mesmos problemas que tínhamos antes. Primeiro, gastos duplos — Mallory simplesmente assina ambas as transações conflitantes dizendo que ambas estão ocorrendo ao mesmo tempo. Não sabemos qual vem primeiro. Mallory as propaga seletivamente e bagunça os nós, e eles perdem o acordo.

O outro problema é a censura. Este é um problema novo com a nossa cadeia de prova de autoridade. E se a Mallory não gostar da Alice? Alice está tentando enviar uma transação e a autoridade central simplesmente olha para ela, percebe que é a Alice e a joga fora. Alice tenta enviá-la novamente, e ela é jogada fora de novo. Alice não sabe o que está acontecendo — suas transações não estão passando. Censura bem-sucedida, e voltamos a sofrer.

#### Mitigando com multissinatura (3:21) {#mitigating-with-multi-signature-321}

Não se preocupe muito — há uma mitigação potencial. Podemos descentralizar politicamente a autoridade. Isso teoricamente tornará mais difícil para Mallory assumir o controle. Então, em vez de uma autoridade central, temos quatro autoridades diferentes. Talvez todas elas representem interesses diferentes de partes diferentes, e todas elas têm que se reunir para aprovar as transações.

Isso é chamado de multi-sig — uma multissinatura. Elas recebem uma transação de Alice para Jing, e a primeira assina dizendo: "Eu vi esta mensagem e eu aprovo." Então a segunda assina, e a terceira. Podemos dizer que aceitamos uma multissinatura de dois de quatro, ou três de quatro, ou talvez possamos exigir todas as partes — quatro de quatro. Depende de você ao projetar sua multissinatura.

Isso significa que a transação é concluída e foi aprovada pelas autoridades.

#### Limitações da prova de autoridade (4:32) {#limitations-of-proof-of-authority-432}

Mas o que acontece se todas essas autoridades se tornarem Mallorys? Temos exatamente os mesmos problemas — gastos duplos e censura. Portanto, não é perfeito. No entanto, é melhor de certa forma do que um processador de pagamentos centralizado porque pelo menos os usuários estão executando todas as transações eles mesmos. Eles podem eventualmente detectar um gasto duplo, mas ainda temos nossos problemas. Tecnicamente, ainda podemos fazer gasto duplo e tecnicamente ainda podemos censurar.

Não há acesso aberto — pode ser difícil se tornar uma dessas autoridades. E não há penalidades no protocolo se ocorrerem gastos duplos ou censura. Não há nada no protocolo que penalize essas figuras de autoridade.

#### O que vem a seguir (5:19) {#what-comes-next-519}

Então nossa sábia Alice decide que há outra maneira — livrar-se da autoridade. Quem precisa dela? Em vez disso, permitimos que qualquer um se torne um minerador e participe do protocolo de consenso. Isso dá acesso aberto para participar, fornece recompensas econômicas por bom comportamento — formando consenso de uma maneira que funciona — e fornece penalidades econômicas por mau comportamento, onde o detectamos e decidimos queimar as moedas das pessoas.

Mas isso vem a seguir na Prova de Trabalho (PoW) — design de mecanismo para o capítulo 3.