---
title: "Como funcionam os saques no Ethereum?"
description: "Como funcionam os saques de staking no Ethereum após a atualização Shanghai/Capella, cobrindo o processo técnico, a fila de saques e o que os stakers precisam saber sobre como acessar seu ETH em staking."
lang: pt-br
youtubeId: "RwwU3P9n3uo"
uploadDate: 2023-03-30
duration: "0:11:39"
educationLevel: intermediate
topic:
  - "how-ethereum-works"
  - "staking"
  - "withdrawals"
format: explainer
author: Finematics
breadcrumb: "Saques de Staking"
---

Uma explicação da **Finematics** cobrindo como os saques de staking funcionam no Ethereum após a atualização Shanghai/Capella, incluindo a mecânica de saques parciais e totais, equívocos comuns e as implicações para o ecossistema de staking.

*Esta transcrição é uma cópia acessível da [transcrição original do vídeo](https://www.youtube.com/watch?v=RwwU3P9n3uo) publicada pela Finematics. Ela foi levemente editada para facilitar a leitura.*

#### A Beacon Chain (0:31) {#the-beacon-chain-031}

Com a atualização Shanghai/Capella se aproximando rapidamente, há muita discussão sobre os saques de staking no Ethereum e o que isso significa para o ecossistema do Ethereum como um todo.

Vamos começar entendendo como chegamos aqui e por que os saques de staking não foram ativados quando o Ethereum mudou da Prova de Trabalho (PoW) para a Prova de Participação (PoS).

A transição para a Prova de Participação (PoS) aconteceu em várias etapas para minimizar o número de grandes mudanças ocorrendo ao mesmo tempo. Essa abordagem foi essencial, especialmente para uma rede estabelecida que liquida trilhões de dólares em valor por ano. As etapas mais significativas foram: o lançamento da Beacon Chain e o The Merge.

O lançamento da Beacon Chain em 2020 criou a base para a transição ao criar uma camada de consenso de Prova de Participação separada, rodando paralelamente à cadeia de Prova de Trabalho do Ethereum. O lançamento antecipado da Beacon Chain permitiu o acúmulo de ETH suficiente para proteger a rede antes de liquidar transações de valor real. Isso também permitiu o teste do novo modelo de consenso de Prova de Participação por um período prolongado com fundos reais em stake.

Os primeiros participantes da rede comprometeram milhões de ETH para proteger a rede de Prova de Participação do Ethereum, apesar de saberem que não poderiam sacar seu ETH até muito mais tarde.

O próximo grande passo, o The Merge, uniu a camada de consenso de Prova de Participação com a camada de execução. Isso permitiu finalmente abandonar a Prova de Trabalho e manter apenas uma cadeia canônica — o Ethereum — agora protegida por milhões de ETH em staking. O The Merge foi, de longe, a maior mudança já feita no Ethereum. Devido à natureza da atualização, ela teve que acontecer sem nenhum tempo de inatividade.

Para minimizar os riscos, o escopo do The Merge foi reduzido, e nenhum outro recurso — fora a mudança da Prova de Trabalho para a Prova de Participação — foi incluído como parte da atualização. O maior "corte" que teve que ser feito impactou os saques, que se tornaram o foco da próxima atualização Shanghai/Capella.

#### Saques (2:09) {#withdrawals-209}

Os saques de staking, como o nome sugere, permitirão que os stakers saquem seu ETH bloqueado. Existem dois tipos de saques: "parcial" e "total".

Um **saque parcial** acontece quando o validador saca suas recompensas acumuladas — o saldo extra além do saldo efetivo máximo de 32 ETH. Um saque parcial também pode ser chamado de "pagamento de recompensa" ou "pagamento de saldo excedente".

Um **saque total** acontece quando o validador conclui o processo de saída e todo o saldo é sacado. Isso ocorre apenas quando o validador sai do sistema voluntariamente ou ao ser removido à força em um processo chamado "penalização".

Uma vez ativados, os saques de staking serão distribuídos automaticamente a cada poucos dias. Além disso, o processo de saque é iniciado na camada de consenso, portanto, nenhuma taxa de transação é necessária em nenhuma das etapas.

Para começar a sacar suas recompensas de staking, um validador terá que fornecer seu endereço de saque apenas uma vez. Como os saques afetam tanto a camada de consenso quanto a camada de execução do Ethereum, ambas as partes da rede devem ser atualizadas. "Shanghai" é o nome da atualização da camada de execução que contém os saques, que são especificados na EIP-4895. "Capella" é o nome da atualização correspondente da camada de consenso, ativada ao mesmo tempo. Essas duas atualizações às vezes também são chamadas de "Shapella".

#### Mecânica (3:40) {#mechanics-340}

No ecossistema do Ethereum, cada validador tem um número de índice correspondente. Além disso, eles também têm dois tipos de credenciais de saque, definidas como `0x00` ou `0x01`.

`0x00` indica que um validador específico não tem um endereço de saque associado. Essas credenciais são derivadas como o hash da chave pública BLS com seu primeiro byte trocado por um byte zero — daí o nome.

`0x01` significa que um validador forneceu seu endereço de saque. Essas credenciais de saque são representadas como `0x01` seguidas por 11 bytes de zeros e, em seguida, um endereço Ethereum escolhido.

Para ativar os saques, os validadores com credenciais `0x00` precisarão assinar uma mensagem "BLSToExecutionChange". Isso será possível após a atualização Capella.

Uma vez que os saques sejam ativados, um validador propondo um bloco fará uma varredura linear pelos índices de validadores para encontrar os primeiros 16 validadores com credenciais `0x01` que:

- Tenham um saldo que exceda 32 ETH (recompensas de validador acumuladas)
- Sejam "sacáveis" (tenham saído totalmente do conjunto de validadores)

A busca linear para após encontrar 16 validadores que correspondam a esses critérios ou após 16.384 iterações. O algoritmo lembra o índice no qual a busca parou, para que o próximo validador propondo um bloco possa retomar a partir desse índice. Depois de chegar ao último índice, o algoritmo começa do início — índice 0.

Uma boa analogia seria um relógio analógico onde o ponteiro aponta para a hora, avança em uma direção, não pula nenhuma hora e, eventualmente, volta ao início novamente depois que o último número é alcançado.

Após a conclusão da varredura, o validador cria uma lista de saques a serem incluídos em sua carga de execução. Cada item da lista contém:

- **WithdrawalIndex** — um índice monotonicamente crescente, começando do 0, que aumenta em 1 por saque para identificar exclusivamente cada saque
- **ValidatorIndex** — o índice do validador cujo saldo está sendo sacado
- **ExecutionAddress** — o endereço de ETH na camada de execução para onde o saque deve ser enviado
- **Amount** — o valor, em gwei, a ser enviado para o endereço de execução

Ao construir ou processar um bloco, os clientes da camada de execução aplicam esses saques no final de um bloco. O processamento de saques não compete com as transações dos usuários por espaço no bloco. Com um máximo de 16 saques processados por bloco, deve haver um máximo de 115.200 saques processados por dia, assumindo que nenhum slot seja perdido.

O design dos saques é simples, mas extremamente robusto.

#### Equívocos (6:30) {#misconceptions-630}

O primeiro equívoco afirma que, ao processar saques, há uma diferença entre um saque "total" e um "parcial" em termos de prioridade ou ordenação. Tanto os saques totais quanto os parciais acontecem quando a varredura linear sobre o conjunto de validadores atinge o índice de um validador. A única diferença é que, no caso de saques totais, um validador deve deixar a fila de saída e atingir a "época sacável" antes que a varredura linear possa capturá-lo.

Outro equívoco é que os usuários perderão suas recompensas se não fornecerem um endereço de saque. Isso não é verdade — caso um validador esqueça de fornecer um endereço de saque, suas recompensas em ETH não serão enviadas para o vazio assim que os saques forem ativados. Em vez disso, a varredura pulará os validadores que não forneceram seus endereços de saque.

É importante lembrar que o endereço de saque não pode ser alterado e é definido apenas uma vez. Os stakers devem ser extremamente cuidadosos ao configurar o endereço de saque, garantindo que tenham total propriedade do endereço fornecido.

Há também especulações de que os stakers sacarão muito ETH do ecossistema do Ethereum assim que os saques forem ativados, com a versão mais forte desse argumento assumindo que isso desestabilizará o mecanismo de consenso de Prova de Participação. Embora não possamos prever totalmente quanto ETH será sacado ao longo do tempo, existem alguns contra-argumentos importantes:

Primeiro, a maioria dos stakers são os primeiros adotantes do Ethereum que foram corajosos o suficiente para fazer stake quando ainda era incerto quando os saques seriam ativados. Muitos stakers expressaram seu desejo de continuar fazendo stake para apoiar a rede e continuar ganhando recompensas denominadas em ETH.

Segundo, para garantir que o mecanismo de consenso de Prova de Participação e o conjunto ativo de validadores permaneçam estáveis, o Ethereum implementou uma fila de saques para todos os validadores que desejam sair. Essa fila limita o número de validadores que podem deixar o ecossistema simultaneamente.

A primeira varredura de saques sacará muitas recompensas acumuladas — basicamente desde o início da Beacon Chain. No entanto, as subsequentes processarão uma quantidade muito menor de ETH.

#### Implicações (8:39) {#implications-839}

A ativação dos saques criará um fluxo de staking aberto e bilateral. Atualmente, o fluxo de staking é unilateral — o ETH só pode entrar na rede e nunca sair dela. Curiosamente, a ativação dos saques pode incentivar ainda mais pessoas a fazer stake, pois elas saberão que sempre podem sacar seu ETH se precisarem para outra coisa.

Os stakers que não executam seus próprios validadores e fazem stake com um provedor de staking centralizado poderão mudar seu provedor para um diferente. Eles podem sacar fundos de um provedor que oferece uma taxa de staking mais baixa para um que oferece uma taxa melhor, mudar de um provedor centralizado para um descentralizado, ou até mesmo executar seu próprio validador.

Os saques também impactarão os derivativos de staking líquido, como Lido, Rocket Pool e outros. Os tokens de staking líquido (LST), como stETH ou rETH, tiveram um histórico de perder temporariamente sua paridade com o preço do ETH durante turbulências no mercado. No entanto, com o fluxo de staking bilateral, qualquer discrepância significativa em sua paridade seria rapidamente eliminada por arbitragem.

Os primeiros adotantes no staking líquido e no staking centralizado capturaram a grande maioria do mercado, pois não tinham muita concorrência. No entanto, a participação de mercado desses players estabelecidos pode ver uma grande mudança assim que os saques forem ativados, especialmente se eles não oferecerem uma taxa competitiva. A capacidade de mudar livremente entre provedores de staking beneficiará o mercado de staking de ETH.

#### Resumo (10:01) {#summary-1001}

A ativação dos saques de staking é uma das atualizações mais esperadas do Ethereum. Será extremamente importante garantir que essa mudança seja executada sem problemas. Para ajudar nos testes, os validadores terão várias devnets e testnets disponíveis para executar o processo e resolver quaisquer problemas em potencial antes de entrar em operação na Mainnet.

Os saques são mais uma melhoria que leva o Ethereum um passo adiante na construção de um futuro sustentável, seguro e descentralizado. Espera-se que a atualização Shapella ocorra no primeiro semestre de 2023.

No momento deste vídeo, a Beacon Chain acumulou mais de 17 milhões de ETH em mais de 530.000 validadores. O saldo médio de um validador é pouco mais de 34 ETH, o que significa mais de 1 milhão de ETH em recompensas acumuladas. Será interessante ver como os saques afetarão esses números.