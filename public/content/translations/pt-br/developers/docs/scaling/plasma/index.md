---
title: As cadeias Plasma
description: "Uma introdução às cadeias plasma como uma solução de dimensionamento atualmente utilizada pela comunidade Ethereum."
lang: pt-br
incomplete: true
sidebarDepth: 3
---

A rede Plasma é uma blockchain separada ancorada à rede principal do Ethereum, mas executando transações off-chain com seu próprio mecanismo para validação de bloco. Cadeias Plasma são algumas vezes referenciadas como cadeias "filhas", essencialmente cópias menores da rede principal do Ethereum. As cadeias Plasma usam [provas de fraude](/glossary/#fraud-proof) (como os [optimistic rollups](/developers/docs/scaling/optimistic-rollups/)) para arbitrar disputas.

As árvores Merkle permitem a criação de uma pilha sem fim dessas cadeias, que podem funcionar para descarregar a largura de banda das cadeias pai (incluindo a rede principal do Ethereum). No entanto, embora essas cadeias obtenham alguma segurança do Ethereum (por meio de provas de fraude), a segurança e eficiência que oferecem são afetadas por várias limitações de projeto.

## Pré-requisitos {#prerequisites}

Você deve ter um bom entendimento de todos os tópicos fundamentais e um entendimento de alto nível da [escalabilidade do Ethereum](/developers/docs/scaling/).

## O que é Plasma?

Plasma é uma estrutura para melhorar o dimensionamento em blockchains públicas como o Ethereum. Conforme descrito no [whitepaper original do Plasma](http://plasma.io/plasma.pdf), as cadeias Plasma são construídas sobre outra blockchain (chamada de "cadeia raiz"). Cada "cadeia filha" estende da cadeia raiz e geralmente é gerenciada por um contrato inteligente implantado na cadeia pai.

O contrato Plasma funciona, entre outras coisas, como uma [ponte](/developers/docs/bridges/) que permite aos usuários mover ativos entre a Rede Principal do Ethereum e a cadeia plasma. Embora isso as torne semelhantes às [sidechains](/developers/docs/scaling/sidechains/), as cadeias plasma se beneficiam — pelo menos, até certo ponto — da segurança da rede principal do Ethereum. Isso é diferente das sidechains que são as únicas responsáveis pela segurança delas.

## Como as cadeias Plasma funcionam?

Os componentes básicos do framework Plasma são:

### Computação fora da cadeia {#offchain-computation}

A velocidade de processamento atual do Ethereum é limitada a ~ 15-20 transações por segundo, reduzindo a possibilidade de dimensionamento de curto prazo para lidar com mais usuários. Este problema existe principalmente porque o [mecanismo de consenso](/developers/docs/consensus-mechanisms/) do Ethereum exige que muitos nós ponto a ponto verifiquem cada atualização do estado da blockchain.

Embora o mecanismo de consenso de Ethereum seja necessário para segurança, ele pode não se aplicar a todos os casos de uso. Por exemplo, Alice pode não precisar de seus pagamentos diários a Bob, por uma xícara de café verificada por toda a rede Ethereum, pois existe alguma confiança entre ambas as partes.

A cadeia Plasma supõe que a rede principal do Ethereum não precisa verificar todas as transações. Em vez disso, podemos processar transações fora da rede principal, liberando os nós da necessidade de validar cada transação.

A computação off-chain é necessária, pois as redes Plasma podem otimizar a velocidade e o custo. Por exemplo, uma cadeia plasma pode, na maioria das vezes, usar um único "operador" para gerenciar a ordenação e execução das transações. Com apenas uma entidade verificando transações, os tempos de processamento em uma cadeia plasma são mais rápidos que na rede principal do Ethereum.

### Compromissos de estado {#state-commitments}

Enquanto Plasma executa transações off-chain, eles são estabelecidas na camada de execução principal do Ethereum, caso contrário as redes Plasma não podem se beneficiar das garantias de segurança do Ethereum. Mas finalizar transações off-chain sem saber o estado da cadeia de plasma quebraria o modelo de segurança e permitiria a proliferação de transações inválidas. É por isso que o operador, entidade responsável pela produção de blocos na cadeia plasma, é obrigado a publicar periodicamente "compromissos de estado" no Ethereum.

Um [esquema de compromisso](https://en.wikipedia.org/wiki/Commitment_scheme) é uma técnica criptográfica para se comprometer com um valor ou declaração sem revelá-lo a outra parte. Os compromissos são "vinculativos" no sentido de que você não pode alterar o valor ou a declaração depois de se comprometer com ele. Os compromissos de estado no Plasma assumem a forma de "raízes Merkle" (derivadas de uma [árvore Merkle](/whitepaper/#merkle-trees)), que o operador envia em intervalos para o contrato Plasma na cadeia Ethereum.

As raízes Merkle são primitivas criptográficas que permitem a compactação de grandes quantidades de informações. Uma raiz Merkle (também chamada de "raiz de bloco" neste caso) poderia representar todas as transações em um bloco. As raízes Merkle também tornam mais fácil verificar se uma pequena parte de dados faz parte do conjunto de dados maior. Por exemplo, um usuário pode produzir uma [prova Merkle](/developers/tutorials/merkle-proofs-for-offline-data-integrity/#main-content) para provar a inclusão de uma transação em um bloco específico.

As raízes de Merkle são importantes para fornecer informações sobre o estado offchain para o Ethereum. Você pode pensar nas raízes de Merkle como "pontos salvos": o operador está dizendo, "Este é o estado da cadeia Plasma no ponto x no tempo, e esta é a raiz de Merkle como prova". O operador está se comprometendo com o _estado atual_ da cadeia plasma com uma raiz Merkle, e é por isso que é chamado de "compromisso de estado".

### Entradas e saídas {#entries-and-exits}

Para que os usuários do Ethereum aproveitem a cadeia Plasma, é necessário um mecanismo para movimentar fundos entre a rede principal e a cadeia Plasma. Não podemos arbitrariamente enviar ether para um endereço na cadeia plasma – essas cadeias são incompatíveis; portanto, a transação falharia ou levaria à perda de fundos.

Plasma usa um contrato principal em execução no Ethereum para processar entradas e saídas de usuários. Este contrato principal também é responsável por rastrear os compromissos do estado (explicado anteriormente) e punir o comportamento desonesto por meio de provas de fraude (mais sobre isso adiante).

#### Entrando na cadeia plasma {#entering-the-plasma-chain}

Para entrar na cadeia plasma, Alice (a usuária) terá que depositar ETH ou qualquer token ERC-20 no contrato plasma. A operadora de plasma, que observa os depósitos do contrato, recria uma quantia igual ao depósito inicial de Alice e o libera em seu endereço na cadeia plasma. Alice é obrigada a atestar o recebimento dos fundos na cadeia filha e pode então usar esses fundos para transações.

#### Saindo da cadeia plasma {#exiting-the-plasma-chain}

Sair da cadeia plasma é mais complexo do que entrar nela por várias razões. O maior delas é que, embora o Ethereum tenha informações sobre o estado da cadeia plasma, ele não pode verificar se as informações são verdadeiras ou não. Um usuário malicioso poderia fazer uma afirmação incorreta ("Eu tenho 1000 ETH") e fugir fornecendo provas falsas para sustentar a afirmação.

Para evitar retiradas maliciosas, é introduzido um "período de desafio". Durante o período de desafio (normalmente uma semana), qualquer um pode contestar uma solicitação de retirada usando uma prova de fraude. Se o desafio for bem-sucedido, a solicitação de retirada será negada.

No entanto, normalmente os usuários são honestos e fazem reivindicações corretas sobre os fundos que possuem. Nesse cenário, Alice iniciará uma solicitação de retirada na cadeia raiz (Ethereum) enviando uma transação para o contrato de plasma.

Ela também deve fornecer uma prova Merkle verificando que, uma transação que criou seus fundos na cadeia Plasma foi incluída em um bloco. Isso é necessário para iterações do Plasma, como o [Plasma MVP](https://www.learnplasma.org/en/learn/mvp.html), que usam um modelo de [Saída de Transação Não Gasta (UTXO)](https://en.wikipedia.org/wiki/Unspent_transaction_output).

Outros, como o [Plasma Cash](https://www.learnplasma.org/en/learn/cash.html), representam fundos como [tokens não fungíveis](/developers/docs/standards/tokens/erc-721/) em vez de UTXOs. A retirada, neste caso, requer a prova de propriedade de tokens na cadeia Plasma. Isso é feito submetendo as duas últimas transações envolvendo o token e fornecendo uma prova Merkle verificando a inclusão dessas transações em um bloco.

O usuário também deve adicionar um vínculo ao pedido de retirada como garantia de comportamento honesto. Se um desafiante provar que o pedido de retirada de Alice é inválido, seu vínculo é reduzido e parte dele vai para o desafiante como recompensa.

Se o período de desafio decorrer sem que ninguém forneça uma prova de fraude, o pedido de retirada de Alice é considerado válido, permitindo que ela recupere os depósitos do contrato Plasma no Ethereum.

### Arbitragem de disputas {#dispute-arbitration}

Como qualquer blockchain, as cadeias plasma precisam de um mecanismo para impor a integridade das transações, caso os participantes ajam maliciosamente (por exemplo, gasto duplo de fundos). Para isso, as cadeias plasma usam provas de fraude para arbitrar disputas sobre a validade das transições de estado e penalizar o mau comportamento. As provas de fraude são utilizadas como um mecanismo através do qual uma cadeia-filho do Plasma apresenta uma queixa à sua cadeia pai ou à cadeia raiz.

Uma prova de fraude é simplesmente uma alegação de que uma determinada transição de estado é inválida. Um exemplo é se um usuário (Alice) tentar gastar os mesmos fundos duas vezes. Talvez ela tenha gasto o UTXO em uma transação com Bob e quer gastar o mesmo UTXO (que agora é de Bob) em outra transação.

Para evitar a retirada, Bob construirá uma prova de fraude fornecendo evidência de que Alice gastou a referida UTXO em uma transação anterior e uma prova de Merkle da inclusão da transação em um bloco. O mesmo processo funciona no Plasma Cash: Bob precisaria fornecer provas de que Alice transferiu anteriormente os tokens que ela está tentando retirar.

Se o desafio de Bob é bem-sucedido, o pedido de retirada de Alice é cancelado. No entanto, essa abordagem depende da capacidade de Bob de observar a cadeia em busca de pedidos de retirada. Se Bob estiver offline, então a Alice poderá processar a retirada maliciosa, assim que o período de desafio terminar.

## O problema de saída em massa no plasma {#the-mass-exit-problem-in-plasma}

O problema da saída em massa ocorre quando um grande número de usuários tenta retirar de uma cadeia de plasma ao mesmo tempo. A existência deste problema está relacionada a um dos maiores problemas do Plasma: a **indisponibilidade de dados**.

A disponibilidade de dados é a capacidade de verificar se as informações de um bloco proposto foram de fato publicadas na rede blockchain. Um bloco está "indisponível" se o produtor publicar o bloco em si, mas retiver os dados usados para criar o bloco.

Blocos devem estar disponíveis se os nós estão aptos a baixar o bloco e verificar a validade das transações. As blockchains garantem a disponibilidade dos dados forçando os produtores do bloco a publicar todos os dados de transações onchain.

A disponibilidade de dados também ajuda a proteger protocolos de dimensionamento off-chain que se baseiam na camada base do Ethereum. Ao forçar os operadores nessas cadeias a publicar dados de transação no Ethereum, qualquer um pode desafiar blocos inválidos construindo provas de fraude que referenciam o estado correto da cadeia.

As cadeias Plasma armazenam principalmente dados de transação com o operador e **não publicam dados na Rede Principal** (ou seja, além dos compromissos de estado periódicos). Isso significa que os usuários devem confiar no operador para fornecer dados de bloqueio, se precisarem criar provas de fraude que desafiem transações inválidas. Se esse sistema funcionar, então os usuários poderão sempre usar provas de fraude para proteger os fundos.

O problema começa quando o operador, e não apenas qualquer usuário, é a parte que age maliciosamente. Como o operador está no controle exclusivo da blockchain, ele tem mais incentivo para avançar as transições de estado inválido em uma escala maior, como o roubo de fundos pertencentes a usuários na cadeia plasma.

Neste caso, a utilização do sistema clássico de prova de fraude não funciona. O operador poderia facilmente fazer uma transação inválida transferindo os fundos de Alice e Bob para sua carteira e ocultar os dados necessários para criar a prova de fraude. Isso é possível porque o operador não é obrigado a disponibilizar dados para os usuários ou a rede principal.

Portanto, a solução mais otimista é tentar uma "saída em massa" dos usuários da cadeia Plasma. A saída em massa torna mais lento o plano do operador malicioso de roubar fundos e fornece alguma medida de proteção para os usuários. Os pedidos de retirada são ordenados com base em quando cada UTXO (ou token) foi criado, impedindo que operadores mal-intencionados se antecipem (front-running) aos usuários honestos.

No entanto, os nós ainda precisamos de uma maneira para verificar a validade dos pedidos de retirada durante uma saída em massa, para evitar que indivíduos oportunistas lucrem com o caos processando saídas inválidas. A solução é simples: exigir que os usuários postem o último **estado válido da cadeia** para retirar seu dinheiro.

Mas essa abordagem ainda tem problemas. Por exemplo, se todos os usuários em uma cadeia Plasma precisarem sair (o que é possível no caso de um operador malicioso), então todo o estado válido da cadeia Plasma deverá ser despejado na camada base do Ethereum de uma só vez. Com o tamanho arbitrário de cadeias Plasma (alto rendimento = mais dados) e as restrições nas velocidades de processamento do Ethereum, esta não é uma solução ideal.

Embora os jogos de saída pareçam OK em teoria, as saídas em massa da vida real provavelmente desencadearão um congestionamento de rede no próprio Ethereum. Além de prejudicar a funcionalidade do Ethereum, uma saída em massa mal coordenada significa que, os usuários podem não conseguir retirar fundos antes que o operador drene todas as contas da cadeia Plasma.

## Prós e contras do plasma {#pros-and-cons-of-plasma}

| Prós                                                                                                                                                                                                                                                                                                                         | Contras                                                                                                                                                                                                                                                   |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Oferece alta taxa de transferência e baixo custo por transação.                                                                                                                                                                                                                                              | Não suporta computação geral (não pode executar contratos inteligentes). Apenas transferências básicas de tokens, swaps e alguns outros tipos de transação são suportados através da lógica preditiva. |
| Bom para transações entre usuários arbitrários (sem sobrecarga por par de usuário, se ambos estiverem estabelecidos na cadeia Pasma).                                                                                                                                                     | É necessário monitorar periodicamente a rede (exigência de vitalidade) ou delegar essa responsabilidade a outra pessoa para garantir a segurança de seus fundos.                                                       |
| As cadeias Plasma podem ser adaptadas a casos de uso específicos que não estão relacionados com a cadeia principal. Qualquer pessoa, incluindo empresas, pode personalizar contratos inteligentes de Plasma para fornecer infraestrutura dimensionável que funciona em diferentes contextos. | Refere-se a um ou mais operadores para armazenar dados e atender a pedido.                                                                                                                                                                |
| Reduz a carga na rede principal do Ethereum movendo a computação e o armazenamento para offchain.                                                                                                                                                                                                            | As retiradas são adiadas por vários dias para permitir desafios. Para ativos fungíveis isso pode ser mitigado por provedores de liquidez, mas existe um custo de capital associado.                                       |
|                                                                                                                                                                                                                                                                                                                              | Se muitos usuários tentarem sair simultaneamente, a rede principal do Ethereum poderá ficar congestionada.                                                                                                                                |

## Plasma vs. protocolos de escalabilidade de camada 2 {#plasma-vs-layer-2}

Embora o Plasma já tenha sido considerado uma solução de escalabilidade útil para o Ethereum, desde então foi abandonado em favor dos [protocolos de escalabilidade da camada 2 (L2)](/layer-2/). Soluções dimensionáveis L2 resolvem vários problemas da cadeia Plasma:

### Eficiência {#efficiency}

[Rollups de conhecimento zero](/developers/docs/scaling/zk-rollups) geram provas criptográficas da validade de cada lote de transações processadas off-chain. Isso evita que usuários (e operadores) avancem em transições de estado inválido, eliminando a necessidade de períodos de desafio e jogos de saída. Isto também significa que os usuários não precisam monitorar a cadeia periodicamente para garantir seus fundos.

### Suporte para contratos inteligentes {#support-for-smart-contracts}

Outro problema com o framework do plasma foi [a incapacidade de suportar a execução de contratos inteligentes do Ethereum](https://ethresear.ch/t/why-smart-contracts-are-not-feasible-on-plasma/2598/4). Como resultado, a maioria das implementações da cadeia Plasma foram desenvolvidas principalmente para pagamentos simples ou o intercâmbio de tokens ERC-20.

Por outro lado, os optimistic rollups são compatíveis com a [Máquina Virtual Ethereum](/developers/docs/evm/) e podem executar [contratos inteligentes](/developers/docs/smart-contracts/) nativos do Ethereum, tornando-os uma solução útil e _segura_ para a escalabilidade de [aplicativos descentralizados](/developers/docs/dapps/). Da mesma forma, existem planos em andamento para [criar uma implementação de conhecimento zero da EVM (zkEVM)](https://ethresear.ch/t/a-zk-evm-specification/11549) que permitiria que os ZK-rollups processassem lógica arbitrária e executassem contratos inteligentes.

### Indisponibilidade de dados {#data-unavailability}

Tal como foi explicado anteriormente, a cadeia Plasma sofre de um problema de disponibilidade de dados. Se um operador malicioso avançou uma transição inválida na cadeia Plasma, os usuários não poderiam desafiá-lo, uma vez que o operador pode reter os dados necessários para criar a prova da fraude. Os rollups resolvem este problema forçando os operadores a publicar dados de transações no Ethereum, permitindo que qualquer pessoa verifique o estado da cadeia e crie provas de fraude, se necessário.

### Problema de saída em massa {#mass-exit-problem}

Tanto ZK-rollups quanto optimistic rollups resolvem o problema de saída em massa da cadeia Plasma de várias maneiras. Por exemplo, um ZK-rollup depende de mecanismos criptográficos que garantam que os operadores não possam roubar fundos de usuário em nenhum cenário.

De maneira similar, os optimistic rollups impõem um período de atraso em retiradas durante o qual qualquer pessoa pode iniciar um desafio e impedir pedidos maliciosos de retirada. Embora isto seja semelhante à cadeia Plasma, a diferença é que os verificadores têm acesso a dados necessários para criar provas de fraude. Assim, não há necessidade de os usuários do rollup se envolverem em uma migração frenética para a rede principal do Ethereum.

## Plasma, sidechains e fragmentação (sharding): diferenças {#plasma-sidechains-sharding}

Plasma, sidechains e sharding são bastante semelhantes porque todos estão ligados à rede principal do Ethereum de alguma forma. No entanto, o nível e a força dessas ligações variam, o que afeta as propriedades de segurança de cada solução de dimensionamento.

### Plasma vs. sidechains {#plasma-vs-sidechains}

Uma [sidechain](/developers/docs/scaling/sidechains/) é uma blockchain operada de forma independente e conectada à Rede Principal do Ethereum por meio de uma ponte bidirecional. [Pontes](/bridges/) permitem que os usuários troquem tokens entre as duas blockchains para realizar transações na sidechain, reduzindo o congestionamento na Rede Principal do Ethereum e melhorando a escalabilidade.
As sidechains usam um mecanismo separado de consenso e são normalmente muito menores do que a rede principal do Ethereum. Como resultado, fazer bridge de ativos para essas cadeias implica um maior risco. Dada a falta de garantias de segurança herdadas da rede principal do Ethereum no modelo sidechain, os usuários arriscam a perder fundos em um ataque à sidechain.

Inversamente, as cadeias Plasma derivam sua segurança da rede principal. Isto as torna amplamente mais seguras do que as sidechains. Tanto as cadeias de sidechains como as de Plasma podem ter diferentes protocolos de consenso, mas a diferença é que as cadeias Plasma publicam raízes Merkle para cada bloco na rede principal do Ethereum. As raízes dos blocos são pequenos pedaços de informação que podemos utilizar para verificar informações sobre as transações que acontecem em uma cadeia Plasma. Se um ataque acontecer em uma cadeia Plasma, os usuários podem retirar com segurança seus fundos de volta à rede principal usando as provas adequadas.

### Plasma vs. fragmentação {#plasma-vs-sharding}

Tanto as cadeias plasma quanto as cadeias de fragmentos periodicamente publicam provas criptográficas na Mainnet (Rede principal) do Ethereum. No entanto, ambas têm propriedades de segurança diferentes.

As cadeias de shard gravam "cabeçalhos de agrupamento" na rede principal contendo informações detalhadas sobre cada shard de dados. Os nós na rede principal verificam e garantem a validade de shards de dados, reduzindo a possibilidade de transições de shards inválidos e protegendo a rede contra atividades maliciosas.

A cadeia Plasma é diferente porque a rede principal só recebe informação mínima sobre o estado das cadeias filhas. Isto significa que rede principal não pode verificar eficazmente as transações realizadas em cadeias filhas, tornando-as menos seguras.

**Observação**: a fragmentação da blockchain do Ethereum não está mais no planejamento. Ela foi substituída pela escalabilidade via rollups e pelo [Danksharding](/roadmap/danksharding).

### Usar Plasma {#use-plasma}

Vários projetos fornecem implementações da cadeia Plasma que você pode integrar aos seus dapps:

- [Polygon](https://polygon.technology/) (anteriormente Rede Matic)

## Leitura adicional {#further-reading}

- [Aprenda sobre Plasma](https://www.learnplasma.org/en/)
- [Um rápido lembrete do que significa "segurança compartilhada" e por que ela é tão importante](https://old.reddit.com/r/ethereum/comments/sgd3zt/a_quick_reminder_of_what_shared_security_means/)
- [Sidechains vs. Plasma vs. Sharding](https://vitalik.eth.limo/general/2019/06/12/plasma_vs_sharding.html)
- [Entendendo o Plasma, Parte 1: O Básico](https://www.theblockcrypto.com/amp/post/10793/understanding-plasma-part-1-the-basics)
- [A Vida e a Morte do Plasma](https://medium.com/dragonfly-research/the-life-and-death-of-plasma-b72c6a59c5ad#)

_Conhece um recurso da comunidade que o ajudou? Edite esta página e adicione-a!_
