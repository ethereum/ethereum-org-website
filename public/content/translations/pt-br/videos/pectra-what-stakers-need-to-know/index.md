---
title: "Atualização Pectra do Ethereum: o que os stakers precisam saber"
description: "Explicando a atualização Pectra da perspectiva de um staker, cobrindo os impactos práticos nos validadores, operações de staking e as principais EIPs que afetam o staking no protocolo Ethereum."
lang: pt-br
youtubeId: "_UpAFpC7X6Y"
uploadDate: 2025-01-22
duration: "0:09:14"
educationLevel: intermediate
topic:
  - "roteiro"
  - "pectra"
  - "staking"
format: explainer
author: Blockdaemon
breadcrumb: "Pectra para Stakers"
---

Um webinar apresentado pela **Blockdaemon** com a engenheira de blockchain Julia Schmidt (Alluvial) e Freddy Tänzer (Blockdaemon) discutindo como a atualização Pectra impacta o staking de ETH. O webinar aborda saques acionáveis pela camada de execução, aumentos do saldo efetivo máximo, consolidação de validadores e implicações do staking líquido.

*Esta transcrição é uma cópia acessível da [transcrição original do vídeo](https://www.youtube.com/watch?v=_UpAFpC7X6Y) publicada pela Blockdaemon. Ela foi levemente editada para facilitar a leitura.*

#### Introdução (0:00) {#introduction-000}

**Apresentador:** Olá e bem-vindos a este webinar apresentado pela Blockdaemon com foco na próxima atualização Pectra do Ethereum. Conosco hoje estão Julia Schmidt, engenheira de blockchain na Alluvial, e Freddy Tänzer, líder do ecossistema Ethereum na Blockdaemon, para discutir como as mudanças da Pectra impactarão o staking de ETH, a rede como um todo, os serviços de staking líquido e muito mais. Para começar, Freddy — você poderia nos dar uma breve visão geral da atualização Pectra e qual será o seu impacto nos stakers?

#### O que é a Pectra (1:28) {#what-is-pectra-128}

**Freddy Tänzer:** Então, a Pectra é uma atualização do Ethereum que está programada para o final do primeiro trimestre de 2025 — por volta de março, podendo atrasar um pouco, talvez para abril ou algo assim. Na verdade, era para ser uma pequena bifurcação no início, e então mais e mais coisas foram adicionadas, então eles a dividiram em duas agora.

A primeira parte contém muitas coisas — por exemplo, em relação a contas inteligentes, abstração de conta e coisas do tipo — mas eu quero focar realmente nas coisas que são relevantes para o nosso público em termos das mudanças no staking. Existem principalmente duas grandes mudanças.

A primeira é o fato de que você pode acionar saques e saídas do seu validador por meio da camada de execução — as credenciais de saque — basicamente eliminando a dependência do operador do nó. A segunda, indiscutivelmente ainda maior em seu efeito, é que o saldo efetivo máximo de um validador agora pode mudar. Costumava ser apenas 32 ETH como um valor fixo, e agora pode ser qualquer valor entre 32 e 2.048 ETH.

Há também uma menor que basicamente leva ao fato de que os depósitos são muito mais rápidos — registrados onchain de cerca de 14 horas para menos de uma hora —, mas essas duas eu acho que são as mais relevantes para a nossa discussão aqui.

#### EIP-7002: saídas acionáveis pela camada de execução (2:58) {#eip-7002-execution-layer-triggerable-exits-258}

**Apresentador:** Para a primeira grande mudança, Julia, você poderia explicar como o processo pós-Pectra mudará em comparação com as formas atuais em que os saques são iniciados no ecossistema de staking do Ethereum?

**Julia Schmidt:** Para propor e atestar blocos, o validador precisa estar constantemente online e ter um saldo em stake de 32 ETH. Quando você configura um validador para participar do mecanismo de consenso, você configura duas chaves. Uma é a chave do validador, que é usada para realizar as funções do validador — assinando atestações de bloco. A segunda é a chave de saque, que representa a propriedade do ETH em stake.

Você tem duas formas de fazer staking: staking solo, ou configurações multicustodiais como com a Blockdaemon e como estamos fazendo na Liquid Collective, onde você pode escolher o seu operador de nó para realizar todas as funções e operações do validador em seu nome. Isso dá a eles a chave do validador, e você só tem acesso à chave de saque.

A mensagem real para a saída de um validador só pode ser enviada a partir da chave do validador que é controlada pelo operador do nó. Isso exige que você confie no seu operador de nó — que dependa dele para realizar a saída do seu validador por você. Se eles fizerem isso, ótimo, mas você sempre tem que depender desse terceiro.

O que vinha acontecendo anteriormente era que você concordava em pré-assinar mensagens de saída quando configurava essa estrutura de staking multicustodial. Você recebia uma mensagem que poderia usar mais tarde para realizar a saída do seu validador, mas não sabia se a mensagem de saída realmente funcionaria. Toda vez que havia uma atualização no Ethereum que mudava o número da versão, sua mensagem de saída poderia não funcionar mais.

Na última atualização Dencun, uma nova EIP mudou o tempo de expiração dessas mensagens de saída — mas isso estava apenas tratando o sintoma, não resolvendo o problema. O problema real é que o proprietário do ETH em stake não pode acionar o saque. Os fundos podem essencialmente ser mantidos como reféns pelo operador do nó.

Isso agora é resolvido com a EIP-7002, que permite que tanto a chave do validador quanto a chave de saque acionem a saída a partir da camada de execução — simplesmente enviando uma transação para um contrato de saque especial onde você envia uma solicitação de saque e especifica uma saída total do validador ou um saque parcial do saldo em stake.

#### EIP-7251: saldo efetivo máximo (4:15) {#eip-7251-max-effective-balance-415}

**Apresentador:** Freddy, você poderia nos dar uma visão geral do saldo efetivo máximo daqui para frente a partir da Pectra, e como isso impactará as pessoas que atualmente fazem stake?

**Freddy Tänzer:** Só para acrescentar — para nossos clientes institucionais, essa dependência do operador do nó geralmente era resolvida com mensagens de saída pré-assinadas, principalmente para lidar com preocupações de reguladores ou preocupações de continuidade de negócios. Eles também tinham que manter essas mensagens de saída seguras. Portanto, há uma clara simplificação do processo, eliminando essa dependência.

Agora, sobre o saldo efetivo máximo: muitas coisas não mudam, e tudo isso é opcional. Você não precisa mudar nada. O objetivo dos desenvolvedores principais do Ethereum e do ecossistema em geral é reduzir o número de validadores na rede. Já passamos de um milhão de validadores agora, e cada um tem que se comunicar com os outros sobre atestações e consenso. Isso é muito tráfego de rede — testes mostraram que chegar a dois milhões de validadores poderia ser um problema.

O objetivo é reduzir o número de validadores sem impactar a segurança da rede — já que a quantidade total de ETH em stake permaneceria constante, apenas mais ETH por validador em média.

Para o cliente, isso significa principalmente que ele precisa decidir se usará o novo tipo de validador ou o antigo. Isso depende de suas necessidades de liquidez. Na configuração atual com validadores de 32 ETH, as recompensas do seu protocolo serão enviadas para a sua credencial de saque a cada nove ou dez dias, dando a você liquidez regular.

Mas muitas configurações assumem que as recompensas são usadas para compor o stake. No passado, ao compor, você precisaria esperar até ter 32 ETH em recompensas para iniciar manualmente um novo validador. Com o novo tipo de validador, você compõe automaticamente suas recompensas — isso significa mais recompensas e menos trabalho.

A desvantagem é que você não recebe recompensas regularmente e precisa configurar um processo para recuperá-las. Os acionadores de saque agora são transações regulares que incorrem em uma taxa de gas, em vez de receber recompensas de graça no modelo antigo.

Há boas notícias sobre a penalização também: a penalidade inicial de penalização cairá drasticamente — em cerca de 128 vezes. Com um validador de 32 ETH, a penalidade inicial era de um ETH. Após a Pectra, será uma fração de um ETH — talvez US$ 20 ou US$ 25. Isso tem efeitos colaterais positivos no staking solo, o que é obviamente importante para a neutralidade crível do Ethereum.

O benefício da composição automática beneficia principalmente quantias menores de stake. Se você tiver mil validadores, poderia iniciar manualmente um novo mensalmente. Mas se você tiver apenas um validador, praticamente precisaria esperar 32 anos para compor.

#### Implicações do staking líquido (11:25) {#liquid-staking-implications-1125}

**Apresentador:** Julia, como a consolidação de validadores maiores se compara aos benefícios do staking líquido? Como essas decisões pesarão na mente de um staker pós-Pectra?

**Julia Schmidt:** Na Alluvial, temos acompanhado de perto essas mudanças e queremos oferecer ambas as soluções. As solicitações de consolidação na Pectra são uma solução provisória que não deve afetar o tempo de ganho do seu saldo efetivo — ele não terá que passar por uma fila de ativação novamente ao consolidar vários validadores. O processo é bastante tranquilo.

O fato de que a penalidade inicial de penalização foi reduzida diminui o risco de executar validadores de alto saldo. O incentivo da Fundação Ethereum é realmente consolidar o máximo que pudermos para reduzir a carga da rede. Há uma pequena desvantagem: no caso muito raro de um validador de saldo efetivo máximo de 2.048 ETH ser penalizado, ele iria para a fila de saída e seus fundos ficariam bloqueados por mais tempo — seria como se 64 validadores fossem penalizados de uma só vez. Portanto, tentaríamos oferecer tetos flexíveis de validadores de acordo com o apetite de risco do cliente.

Do lado da utilidade, um token de staking líquido (LST) obviamente adiciona liquidez — mesmo com saques parciais da camada de execução, não será instantâneo. Você envia a transação, ela entra na fila, depois há a época de saída e a época de saque. Os tokens de staking líquido ainda oferecem liquidez instantânea que os saques parciais não podem oferecer.

#### Próximos passos para os stakers (16:20) {#next-steps-for-stakers-1620}

**Freddy Tänzer:** O que vemos é que as instituições financeiras normalmente fariam stake de 65% a 85% do seu ETH sob custódia, porque precisam do restante como um buffer de liquidez para resgates. Com o staking líquido, você pode potencialmente aumentar a quantidade de ETH em stake, o que gera recompensas maiores.

Ambos os lados se beneficiam da Pectra — o staking líquido ganha a opção de saques pela camada de execução, e o staking tradicional ganha a eliminação do problema de incremento de 32 ETH, particularmente para stakes menores.

**Julia Schmidt:** Com o protocolo Liquid Collective, não oferecemos staking apenas para um operador de nó — temos um consórcio de diferentes operadores de nó aos quais alocamos stakes em uma abordagem round-robin. Isso aumenta a descentralização do ETH em stake. E esses operadores de nó seguem o NORS (Padrão de Risco do Operador de Nó), então também garantimos cobertura em caso de penalização.

Uma vantagem fundamental que ainda não mencionei são os saques parciais — agora que você pode sacar o ETH em stake a partir da camada de execução, isso abre novos caminhos para protocolos como o EigenLayer acionarem saques e saídas. Há um enorme aumento na funcionalidade e interoperabilidade que as finanças descentralizadas (DeFi) agora podem incorporar melhor em todo o ciclo de vida do validador, do depósito à saída. Como engenheira de blockchain, é empolgante poder automatizar todo o fluxo de trabalho.

#### Encerramento (19:50) {#closing-1950}

**Apresentador:** Julia, onde as pessoas podem ir para aprender mais sobre a Liquid Collective e a Alluvial?

**Julia Schmidt:** Você pode seguir a Alluvial e a Liquid Collective no Twitter, no X, no LinkedIn ou no site da Alluvial. Estaremos compartilhando um artigo detalhando as mudanças em relação à atualização Pectra e como elas afetarão o cenário do Ethereum.

**Apresentador:** Freddy, alguma novidade a ser compartilhada sobre a Pectra?

**Freddy Tänzer:** Temos muito por vir. Teremos uma página dedicada em nosso site, blockdaemon.com — será o hub central de todos os recursos. Teremos uma postagem no blog, um FAQ e algumas orientações e recomendações de modelagem em relação a qual tipo de validador escolher e qual tamanho. Se você quer um validador de 2.000 ETH, ou dois com 1.000, ou quatro com 500 — tudo isso é geralmente possível, e há decisões de trade-off a serem tomadas. Ajudaremos nossos clientes a navegar por isso.

**Apresentador:** Fantástico. Freddy, Julia, muito obrigado pelo tempo de vocês hoje — uma discussão fascinante e uma ótima introdução à Pectra.