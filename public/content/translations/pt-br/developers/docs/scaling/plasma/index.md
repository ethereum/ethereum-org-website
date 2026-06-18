---
title: Cadeias Plasma
description: Uma introdução às cadeias Plasma como uma solução de escalabilidade atualmente utilizada pela comunidade Ethereum.
lang: pt-br
incomplete: true
sidebarDepth: 3
---

Uma cadeia Plasma é uma blockchain separada ancorada à [Ethereum](/) Mainnet, mas que executa transações offchain com seu próprio mecanismo para validação de bloco. As cadeias Plasma às vezes são chamadas de cadeias "filhas", essencialmente cópias menores da Rede Principal do Ethereum (Mainnet). As cadeias Plasma usam [provas de fraude](/glossary/#fraud-proof) (como os [optimistic rollups](/developers/docs/scaling/optimistic-rollups/)) para arbitrar disputas.

As árvores de Merkle permitem a criação de uma pilha infinita dessas cadeias que podem trabalhar para descarregar a largura de banda das cadeias pai (incluindo a Ethereum Mainnet). No entanto, embora essas cadeias derivem alguma segurança do Ethereum (por meio de provas de fraude), sua segurança e eficiência são afetadas por várias limitações de design.

## Pré-requisitos {#prerequisites}

Você deve ter um bom entendimento de todos os tópicos fundamentais e uma compreensão de alto nível sobre a [escalabilidade do Ethereum](/developers/docs/scaling/).

## O que é o Plasma? {#what-is-plasma}

O Plasma é um framework para melhorar a escalabilidade em blockchains públicas como o Ethereum. Conforme descrito no [whitepaper do Plasma](https://plasma.io/plasma.pdf) original, as cadeias Plasma são construídas sobre outra blockchain (chamada de "cadeia raiz"). Cada "cadeia filha" se estende da cadeia raiz e geralmente é gerenciada por um contrato inteligente implantado na cadeia pai.

O contrato Plasma funciona, entre outras coisas, como uma [ponte](/developers/docs/bridges/) permitindo que os usuários movam ativos entre a Ethereum Mainnet e a cadeia Plasma. Embora isso as torne semelhantes às [sidechains](/developers/docs/scaling/sidechains/), as cadeias Plasma se beneficiam — pelo menos até certo ponto — da segurança da Ethereum Mainnet. Isso é diferente das sidechains, que são as únicas responsáveis por sua própria segurança.

## Como o Plasma funciona? {#how-does-plasma-work}

Os componentes básicos do framework Plasma são:

### Computação offchain {#offchain-computation}

A velocidade de processamento atual do Ethereum é limitada a ~ 15-20 transações por segundo, reduzindo a possibilidade de curto prazo de escalar para lidar com mais usuários. Esse problema existe principalmente porque o [mecanismo de consenso](/developers/docs/consensus-mechanisms/) do Ethereum exige que muitos nós ponto a ponto verifiquem cada atualização no estado da blockchain.

Embora o mecanismo de consenso do Ethereum seja necessário para a segurança, ele pode não se aplicar a todos os casos de uso. Por exemplo, Alice pode não precisar que seus pagamentos diários a Bob por uma xícara de café sejam verificados por toda a rede Ethereum, já que existe alguma confiança entre ambas as partes.

O Plasma supõe que a Ethereum Mainnet não precisa verificar todas as transações. Em vez disso, podemos processar transações fora da Mainnet, liberando os nós de terem que validar cada transação.

A computação offchain é necessária, pois as cadeias Plasma podem otimizar a velocidade e o custo. Por exemplo, uma cadeia Plasma pode — e na maioria das vezes o faz — usar um único "operador" para gerenciar a ordenação e a execução de transações. Com apenas uma entidade verificando as transações, os tempos de processamento em uma cadeia Plasma são mais rápidos do que na Ethereum Mainnet.

### Compromissos de estado {#state-commitments}

Embora o Plasma execute transações offchain, elas são liquidadas na camada de execução principal do Ethereum — caso contrário, as cadeias Plasma não poderiam se beneficiar das garantias de segurança do Ethereum. Mas finalizar transações offchain sem conhecer o estado da cadeia Plasma quebraria o modelo de segurança e permitiria a proliferação de transações inválidas. É por isso que o operador, a entidade responsável por produzir blocos na cadeia Plasma, é obrigado a publicar "compromissos de estado" no Ethereum periodicamente.

Um [esquema de compromisso](https://en.wikipedia.org/wiki/Commitment_scheme) é uma técnica criptográfica para se comprometer com um valor ou declaração sem revelá-lo a outra parte. Os compromissos são "vinculativos" no sentido de que você não pode alterar o valor ou a declaração depois de se comprometer com ele. Os compromissos de estado no Plasma assumem a forma de "raízes de Merkle" (derivadas de uma [árvore de Merkle](/whitepaper/#merkle-trees)) que o operador envia em intervalos para o contrato Plasma na cadeia Ethereum.

As raízes de Merkle são primitivas criptográficas que permitem a compactação de grandes quantidades de informações. Uma raiz de Merkle (também chamada de "raiz de bloco" neste caso) pode representar todas as transações em um bloco. As raízes de Merkle também facilitam a verificação de que um pequeno pedaço de dados faz parte do conjunto de dados maior. Por exemplo, um usuário pode produzir uma [prova de Merkle](/developers/tutorials/merkle-proofs-for-offline-data-integrity/#main-content) para provar a inclusão de uma transação em um bloco específico.

As raízes de Merkle são importantes para fornecer informações sobre o estado offchain para o Ethereum. Você pode pensar nas raízes de Merkle como "pontos de salvamento": o operador está dizendo: "Este é o estado da cadeia Plasma no momento x, e esta é a raiz de Merkle como prova". O operador está se comprometendo com o _estado atual_ da cadeia Plasma com uma raiz de Merkle, e é por isso que é chamado de "compromisso de estado".

### Entradas e saídas {#entries-and-exits}

Para que os usuários do Ethereum aproveitem o Plasma, precisa haver um mecanismo para mover fundos entre a Mainnet e as cadeias Plasma. No entanto, não podemos enviar ether arbitrariamente para um endereço na cadeia Plasma — essas cadeias são incompatíveis, então a transação falharia ou levaria à perda de fundos.

O Plasma usa um contrato mestre em execução no Ethereum para processar as entradas e saídas dos usuários. Este contrato mestre também é responsável por rastrear os compromissos de estado (explicados anteriormente) e punir o comportamento desonesto por meio de provas de fraude (mais sobre isso adiante).

#### Entrando na cadeia Plasma {#entering-the-plasma-chain}

Para entrar na cadeia Plasma, Alice (a usuária) terá que depositar ETH ou qualquer token ERC-20 no contrato Plasma. O operador do Plasma, que observa os depósitos do contrato, recria um valor igual ao depósito inicial de Alice e o libera para o endereço dela na cadeia Plasma. Alice é obrigada a atestar o recebimento dos fundos na cadeia filha e pode então usar esses fundos para transações.

#### Saindo da cadeia Plasma {#exiting-the-plasma-chain}

Sair da cadeia Plasma é mais complexo do que entrar nela por vários motivos. O maior deles é que, embora o Ethereum tenha informações sobre o estado da cadeia Plasma, ele não pode verificar se a informação é verdadeira ou não. Um usuário mal-intencionado poderia fazer uma afirmação incorreta ("Eu tenho 1000 ETH") e se safar fornecendo provas falsas para apoiar a reivindicação.

Para evitar saques maliciosos, um "período de desafio" é introduzido. Durante o período de desafio (geralmente uma semana), qualquer pessoa pode contestar uma solicitação de saque usando uma prova de fraude. Se o desafio for bem-sucedido, a solicitação de saque será negada.

No entanto, geralmente os usuários são honestos e fazem reivindicações corretas sobre os fundos que possuem. Neste cenário, Alice iniciará uma solicitação de saque na cadeia raiz (Ethereum) enviando uma transação para o contrato Plasma.

Ela também deve fornecer uma prova de Merkle verificando que uma transação que criou seus fundos na cadeia Plasma foi incluída em um bloco. Isso é necessário para iterações do Plasma, como o [Plasma MVP](https://www.learnplasma.org/en/learn/mvp.html), que usam um modelo de [Saída de Transação Não Gasta (UTXO)](https://en.wikipedia.org/wiki/Unspent_transaction_output).

Outros, como o [Plasma Cash](https://www.learnplasma.org/en/learn/cash.html), representam fundos como [tokens não fungíveis](/developers/docs/standards/tokens/erc-721/) em vez de UTXOs. O saque, neste caso, exige prova de propriedade dos tokens na cadeia Plasma. Isso é feito enviando as duas transações mais recentes envolvendo o token e fornecendo uma prova de Merkle verificando a inclusão dessas transações em um bloco.

O usuário também deve adicionar um título (bond) à solicitação de saque como garantia de comportamento honesto. Se um desafiante provar que a solicitação de saque de Alice é inválida, seu título será penalizado, e parte dele irá para o desafiante como recompensa.

Se o período de desafio terminar sem que ninguém forneça uma prova de fraude, a solicitação de saque de Alice será considerada válida, permitindo que ela recupere os depósitos do contrato Plasma no Ethereum.

### Arbitragem de disputas {#dispute-arbitration}

Como qualquer blockchain, as cadeias Plasma precisam de um mecanismo para impor a integridade das transações caso os participantes ajam de forma maliciosa (por exemplo, gasto duplo de fundos). Para esse fim, as cadeias Plasma usam provas de fraude para arbitrar disputas relativas à validade das transições de estado e penalizar o mau comportamento. As provas de fraude são usadas como um mecanismo por meio do qual uma cadeia filha Plasma apresenta uma reclamação à sua cadeia pai ou à cadeia raiz.

Uma prova de fraude é simplesmente uma reivindicação de que uma transação de estado específica é inválida. Um exemplo é se um usuário (Alice) tentar gastar os mesmos fundos duas vezes. Talvez ela tenha gasto o UTXO em uma transação com Bob e queira gastar o mesmo UTXO (que agora é de Bob) em outra transação.

Para evitar o saque, Bob construirá uma prova de fraude fornecendo evidências de que Alice gastou o referido UTXO em uma transação anterior e uma prova de Merkle da inclusão da transação em um bloco. O mesmo processo funciona no Plasma Cash — Bob precisaria fornecer provas de que Alice transferiu anteriormente os tokens que ela está tentando sacar.

Se o desafio de Bob for bem-sucedido, a solicitação de saque de Alice será cancelada. No entanto, essa abordagem depende da capacidade de Bob de observar a cadeia em busca de solicitações de saque. Se Bob estiver offline, Alice poderá processar o saque malicioso assim que o período de desafio terminar.

## O problema de saída em massa no Plasma {#the-mass-exit-problem-in-plasma}

O problema de saída em massa ocorre quando um grande número de usuários tenta sacar de uma cadeia Plasma ao mesmo tempo. O motivo pelo qual esse problema existe tem a ver com um dos maiores problemas do Plasma: **indisponibilidade de dados**.

A disponibilidade de dados é a capacidade de verificar se as informações de um bloco proposto foram realmente publicadas na rede blockchain. Um bloco fica "indisponível" se o produtor publicar o próprio bloco, mas reter os dados usados para criar o bloco.

Os blocos devem estar disponíveis para que os nós possam baixar o bloco e verificar a validade das transações. As blockchains garantem a disponibilidade de dados forçando os produtores de blocos a postar todos os dados de transação onchain.

A disponibilidade de dados também ajuda a proteger os protocolos de escalabilidade offchain que se baseiam na camada base do Ethereum. Ao forçar os operadores dessas cadeias a publicar dados de transação no Ethereum, qualquer pessoa pode contestar blocos inválidos construindo provas de fraude que referenciam o estado correto da cadeia.

As cadeias Plasma armazenam principalmente dados de transação com o operador e **não publicam nenhum dado na Mainnet** (ou seja, além dos compromissos de estado periódicos). Isso significa que os usuários devem confiar no operador para fornecer dados de bloco se precisarem criar provas de fraude contestando transações inválidas. Se esse sistema funcionar, os usuários sempre poderão usar provas de fraude para proteger os fundos.

O problema começa quando o operador, e não apenas qualquer usuário, é a parte que age de forma maliciosa. Como o operador tem controle exclusivo da blockchain, ele tem mais incentivo para avançar transações de estado inválidas em uma escala maior, como roubar fundos pertencentes a usuários na cadeia Plasma.

Neste caso, usar o sistema clássico de prova de fraude não funciona. O operador poderia facilmente fazer uma transação inválida transferindo os fundos de Alice e Bob para sua carteira e ocultar os dados necessários para criar a prova de fraude. Isso é possível porque o operador não é obrigado a disponibilizar dados para os usuários ou para a Mainnet.

Portanto, a solução mais otimista é tentar uma "saída em massa" de usuários da cadeia Plasma. A saída em massa retarda o plano do operador malicioso de roubar fundos e fornece alguma medida de proteção para os usuários. As solicitações de saque são ordenadas com base em quando cada UTXO (ou token) foi criado, impedindo que operadores maliciosos façam front-running contra usuários honestos.

No entanto, ainda precisamos de uma maneira de verificar a validade das solicitações de saque durante uma saída em massa — para evitar que indivíduos oportunistas lucrem com o caos processando saídas inválidas. A solução é simples: exigir que os usuários publiquem o último **estado válido da cadeia** para sacar seu dinheiro.

Mas essa abordagem ainda tem problemas. Por exemplo, se todos os usuários em uma cadeia Plasma precisarem sair (o que é possível no caso de um operador malicioso), então todo o estado válido da cadeia Plasma deve ser despejado na camada base do Ethereum de uma só vez. Com o tamanho arbitrário das cadeias Plasma (alta vazão = mais dados) e as restrições nas velocidades de processamento do Ethereum, esta não é uma solução ideal.

Embora os jogos de saída pareçam bons na teoria, as saídas em massa na vida real provavelmente desencadearão congestionamento em toda a rede no próprio Ethereum. Além de prejudicar a funcionalidade do Ethereum, uma saída em massa mal coordenada significa que os usuários podem não conseguir sacar fundos antes que o operador drene todas as contas na cadeia Plasma.

## Prós e contras do Plasma {#pros-and-cons-of-plasma}

| Prós                                                                                                                                                                                                                             | Contras                                                                                                                                                                         |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Oferece alta vazão e baixo custo por transação.                                                                                                                                                                             | Não suporta computação geral (não pode executar contratos inteligentes). Apenas transferências básicas de tokens, trocas (swaps) e alguns outros tipos de transação são suportados por meio de lógica de predicado.    |
| Bom para transações entre usuários arbitrários (sem sobrecarga por par de usuários se ambos estiverem estabelecidos na cadeia Plasma)                                                                                                            | Necessidade de observar periodicamente a rede (requisito de vivacidade) ou delegar essa responsabilidade a outra pessoa para garantir a segurança de seus fundos.                          |
| As cadeias Plasma podem ser adaptadas a casos de uso específicos que não estão relacionados à cadeia principal. Qualquer pessoa, incluindo empresas, pode personalizar contratos inteligentes Plasma para fornecer infraestrutura escalável que funcione em diferentes contextos. | Depende de um ou mais operadores para armazenar dados e servi-los mediante solicitação.                                                                                                     |
| Reduz a carga na Ethereum Mainnet movendo a computação e o armazenamento offchain.                                                                                                                                                    | Os saques são atrasados em vários dias para permitir desafios. Para ativos fungíveis, isso pode ser mitigado por provedores de liquidez, mas há um custo de capital associado. |
|                                                                                                                                                                                                                                  | Se muitos usuários tentarem sair simultaneamente, a Ethereum Mainnet pode ficar congestionada.                                                                                          |

## Plasma vs protocolos de escalabilidade de camada 2 {#plasma-vs-layer-2}

Embora o Plasma já tenha sido considerado uma solução de escalabilidade útil para o Ethereum, desde então foi abandonado em favor dos [protocolos de escalabilidade de camada 2 (l2)](/layer-2/). As soluções de escalabilidade de l2 remediam vários dos problemas do Plasma:

### Eficiência {#efficiency}

Os [rollups de conhecimento zero](/developers/docs/scaling/zk-rollups) geram provas criptográficas da validade de cada lote de transações processadas offchain. Isso impede que os usuários (e operadores) avancem transições de estado inválidas, eliminando a necessidade de períodos de desafio e jogos de saída. Isso também significa que os usuários não precisam observar a cadeia periodicamente para proteger seus fundos.

### Suporte para contratos inteligentes {#support-for-smart-contracts}

Outro problema com o framework Plasma era [a incapacidade de suportar a execução de contratos inteligentes do Ethereum](https://ethresear.ch/t/why-smart-contracts-are-not-feasible-on-plasma/2598/4). Como resultado, a maioria das implementações do Plasma foi construída principalmente para pagamentos simples ou troca de tokens ERC-20.

Por outro lado, os optimistic rollups são compatíveis com a [Máquina Virtual Ethereum (EVM)](/developers/docs/evm/) e podem executar [contratos inteligentes](/developers/docs/smart-contracts/) nativos do Ethereum, tornando-os uma solução útil e _segura_ para escalar [aplicativos descentralizados (dapps)](/developers/docs/dapps/). Da mesma forma, há planos em andamento para [criar uma implementação de conhecimento zero da EVM (zkEVM)](https://ethresear.ch/t/a-zk-evm-specification/11549) que permitiria que os ZK-rollups processassem lógica arbitrária e executassem contratos inteligentes.

### Indisponibilidade de dados {#data-unavailability}

Conforme explicado anteriormente, o Plasma sofre de um problema de disponibilidade de dados. Se um operador malicioso avançasse uma transição inválida na cadeia Plasma, os usuários não conseguiriam contestá-la, pois o operador pode reter os dados necessários para criar a prova de fraude. Os rollups resolvem esse problema forçando os operadores a postar dados de transação no Ethereum, permitindo que qualquer pessoa verifique o estado da cadeia e crie provas de fraude, se necessário.

### Problema de saída em massa {#mass-exit-problem}

Tanto os ZK-rollups quanto os optimistic rollups resolvem o problema de saída em massa do Plasma de várias maneiras. Por exemplo, um ZK-rollup depende de mecanismos criptográficos que garantem que os operadores não possam roubar fundos de usuários em nenhum cenário.

Da mesma forma, os optimistic rollups impõem um período de atraso nos saques durante o qual qualquer pessoa pode iniciar um desafio e evitar solicitações de saque maliciosas. Embora isso seja semelhante ao Plasma, a diferença é que os verificadores têm acesso aos dados necessários para criar provas de fraude. Assim, não há necessidade de os usuários de rollup se envolverem em uma migração frenética de "o primeiro a sair" para a Ethereum Mainnet.

## Como o Plasma difere de sidechains e sharding? {#plasma-sidechains-sharding}

Plasma, sidechains e sharding (fragmentação) são bastante semelhantes porque todos se conectam à Ethereum Mainnet de alguma forma. No entanto, o nível e a força dessas conexões variam, o que afeta as propriedades de segurança de cada solução de escalabilidade.

### Plasma vs sidechains {#plasma-vs-sidechains}

Uma [sidechain](/developers/docs/scaling/sidechains/) é uma blockchain operada de forma independente conectada à Ethereum Mainnet por meio de uma ponte bidirecional. As [pontes](/bridges/) permitem que os usuários troquem tokens entre as duas blockchains para transacionar na sidechain, reduzindo o congestionamento na Ethereum Mainnet e melhorando a escalabilidade.
As sidechains usam um mecanismo de consenso separado e geralmente são muito menores que a Ethereum Mainnet. Como resultado, transferir ativos via ponte para essas cadeias envolve maior risco; dada a falta de garantias de segurança herdadas da Ethereum Mainnet no modelo de sidechain, os usuários correm o risco de perda de fundos em um ataque à sidechain.

Por outro lado, as cadeias Plasma derivam sua segurança da Mainnet. Isso as torna consideravelmente mais seguras do que as sidechains. Tanto as sidechains quanto as cadeias Plasma podem ter protocolos de consenso diferentes, mas a diferença é que as cadeias Plasma publicam raízes de Merkle para cada bloco na Ethereum Mainnet. As raízes de bloco são pequenos pedaços de informação que podemos usar para verificar informações sobre transações que acontecem em uma cadeia Plasma. Se ocorrer um ataque em uma cadeia Plasma, os usuários podem sacar seus fundos com segurança de volta para a Mainnet usando as provas apropriadas.

### Plasma vs sharding {#plasma-vs-sharding}

Tanto as cadeias Plasma quanto as cadeias de fragmentos publicam periodicamente provas criptográficas na Ethereum Mainnet. No entanto, ambas têm propriedades de segurança diferentes.

As cadeias de fragmentos enviam "cabeçalhos de agrupamento" (collation headers) para a Mainnet contendo informações detalhadas sobre cada fragmento de dados. Os nós na Mainnet verificam e impõem a validade dos fragmentos de dados, reduzindo a possibilidade de transições de fragmentos inválidas e protegendo a rede contra atividades maliciosas.

O Plasma é diferente porque a Mainnet recebe apenas informações mínimas sobre o estado das cadeias filhas. Isso significa que a Mainnet não pode verificar efetivamente as transações conduzidas em cadeias filhas, tornando-as menos seguras.

**Nota:** a fragmentação (sharding) da blockchain do Ethereum não está mais no roteiro. Ela foi substituída pela escalabilidade via rollups e [danksharding](/roadmap/danksharding).

### Use o Plasma {#use-plasma}

Vários projetos fornecem implementações de Plasma que você pode integrar aos seus dapps:

- [Polygon](https://polygon.technology/) (anteriormente Matic Network)

## Leitura adicional {#further-reading}

- [Aprenda sobre o Plasma](https://www.learnplasma.org/en/)
- [Um lembrete rápido do que significa "segurança compartilhada" e por que ela é tão importante](https://old.reddit.com/r/ethereum/comments/sgd3zt/a_quick_reminder_of_what_shared_security_means/)
- [Sidechains vs Plasma vs Sharding](https://vitalik.eth.limo/general/2019/06/12/plasma_vs_sharding.html)
- [Entendendo o Plasma, Parte 1: O Básico](https://www.theblockcrypto.com/amp/post/10793/understanding-plasma-part-1-the-basics)
- [A Vida e a Morte do Plasma](https://medium.com/dragonfly-research/the-life-and-death-of-plasma-b72c6a59c5ad#)

_Conhece um recurso da comunidade que o ajudou? Edite esta página e adicione-o!_

## Tutoriais: Cadeias Plasma no Ethereum {#tutorials}

- [Escreva um plasma específico para aplicativo que preserve a privacidade](/developers/tutorials/app-plasma/) _– Construa um aplicativo Plasma que preserve a privacidade usando provas de conhecimento zero e componentes offchain._