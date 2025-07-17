---
title: Canais de estado
description: Uma introdução aos canais de estado e canais de pagamento como uma solução de dimensionamento atualmente utilizada pela comunidade Ethereum.
lang: pt-br
sidebarDepth: 3
---

Os canais de estado permitem que os participantes transacionem com segurança off-chain, com o mínimo de interação com a rede principal do Ethereum. Os peers do canal podem conduzir um número arbitrário de transações off-chain enquanto enviam apenas duas transações on-chain para abrir e fechar o canal. Isso permite uma taxa de transferência de transação extremamente alta e resulta em custos mais baixos para os usuários.

## Pré-Requisitos {#prerequisites}

Você deve ter lido e compreendido nossas páginas sobre [escalando o Ethereum](/developers/docs/scaling/) e [segunda camada](/layer-2/).

## O que são canais? {#what-are-channels}

Blockchains públicas, como Ethereum, enfrentam desafios de dimensionamento devido à sua arquitetura distribuída: onde as transações on-chain devem ser executadas por todos os nós. Os nós devem ser capazes de lidar com o volume de transações em um bloco usando hardware modesto, impondo um limite na taxa de transferência da transação para manter a rede descentralizada. Os canais de blockchain resolvem esse problema permitindo que os usuários interajam off-chain enquanto ainda confiam na segurança da cadeia principal para a liquidação final.

Os canais são simples protocolos ponto a ponto que permitem que duas partes façam muitas transações entre si e depois publiquem apenas os resultados finais na blockchain. O canal usa criptografia para demonstrar que os dados de resumo gerados são realmente o resultado de um conjunto válido de transações intermediárias. Um contrato inteligente ["multisig"](/developers/docs/smart-contracts/#multisig) garante que as transações sejam assinadas pelas partes corretas.

Com os canais, as mudanças de estado são executadas e validadas pelas partes interessadas, minimizando a computação na camada de execução do Ethereum. Isso diminui o congestionamento no Ethereum e também aumenta a velocidade de processamento de transações para os usuários.

Cada canal é gerenciado por um [contrato inteligente multisig](/developers/docs/smart-contracts/#multisig) em execução no Ethereum. Para abrir um canal, os participantes implantam o contrato de canal on-chain e depositam fundos nele. Ambas as partes assinam coletivamente uma atualização de estado para inicializar o estado do canal, após o qual podem realizar transações rápidas e livres off-chain.

Para fechar o canal, os participantes submetem o último estado acordado do canal on-chain. Em seguida, o contrato inteligente distribui os fundos bloqueados de acordo com o saldo de cada participante no estado final do canal.

Os canais ponto a ponto são particularmente úteis para situações em que alguns participantes predefinidos desejam realizar transações com alta frequência sem incorrer em sobrecarga visível. Os canais da blockchain se enquadram em duas categorias: **canais de pagamento** e **canais de estado**.

## Canais de pagamento {#payment-channels}

Um canal de pagamento é melhor descrito como um "livro de duas vias" mantido coletivamente por dois usuários. O saldo inicial do livro é a soma dos depósitos bloqueados no contrato on-chain durante a fase de abertura do canal. Transferências do canal de pagamento podem ser realizadas instantaneamente e sem o envolvimento da própria blockchain, exceto a criação inicial de uma única vez on-chain e um eventual fechamento do canal.

As atualizações no saldo do livro (ou seja, o estado do canal de pagamento) requerem a aprovação de todas as partes do canal. Uma atualização de canal, assinada por todos os participantes do canal, é considerada finalizada, assim como uma transação no Ethereum.

Os canais de pagamento estavam entre as primeiras soluções de dimensionamento projetadas para minimizar atividades caras on-chain, em interações simples do usuário (por exemplo, transferências ETH, atomic swaps, micropagamentos). Os participantes do canal podem conduzir uma quantidade ilimitada de instâncias, transações sem valor entre si, desde que a soma líquida de suas transferências não exceda os tokens depositados.

## Canais de Estado {#state-channels}

Além de oferecer suporte a pagamentos off-chain, os canais de pagamento não têm se mostrado úteis para lidar com a lógica geral de transição de estado. Os canais de estado foram criados para resolver esse problema e torná-los úteis para dimensionar a computação de propósito geral.

Os canais de estado ainda têm muito em comum com os canais de pagamento. Por exemplo, os usuários interagem através da troca de mensagens (transações) assinadas criptograficamente, que os outros participantes do canal também devem assinar. Se uma proposta de atualização de estado não for assinada por todos os participantes, ela não será válida.

No entanto, além de manter os saldos do usuário, o canal também rastreia o estado atual do armazenamento do contrato (ou seja, valores das variáveis do contrato).

Isso torna possível a execução de um contrato inteligente off-chain entre dois usuários. Nesse cenário, as atualizações para o estado interno do contrato inteligente exigem apenas a aprovação dos pares que criaram o canal.

Embora isso resolva o problema de dimensionamento descrito anteriormente, tem implicações para a segurança. Na Ethereum, a validade das transições de estado no Ethereum é imposta pelo protocolo de consenso da rede. Isso torna impossível propor uma atualização inválida para o estado de um contrato inteligente ou alterar a execução do contrato inteligente.

Os canais de estado não têm as mesmas garantias de segurança. Até certo ponto, um canal de estado é uma versão miniatura da rede principal. Com um conjunto limitado de participantes aplicando regras, a possibilidade de comportamento malicioso (por exemplo, propondo atualizações de estado inválidas) aumenta. Canais de estado derivam sua segurança de um sistema de arbitragem de disputas baseado em [provas de fraude](/glossary/#fraud-proof).

## Como os canais de estado funcionam {#how-state-channels-work}

Basicamente, a atividade em um canal de estado é uma sessão de interações envolvendo usuários e um sistema blockchain. Os usuários se comunicam principalmente off-chain e interagem apenas com a blockchain subjacente para abrir o canal, fechar o canal ou resolver possíveis disputas entre os participantes.

A seção a seguir descreve o fluxo de trabalho básico de um canal de estado:

### Abrir o canal {#opening-the-channel}

Abrir um canal exige que os participantes comprometam fundos a um contrato inteligente na rede principal. O depósito também funciona como uma tabulação virtual, de modo que os atores participantes podem transacionar livremente sem necessidade de liquidar os pagamentos imediatamente. Somente quando o canal estiver finalizado on-chain, as partes fazem o acerto e retiram o que corresponde a cada uma delas.

Este depósito também serve como um vínculo para garantir um comportamento honesto de cada participante. Se os depositantes forem considerados culpados de ações maliciosas durante a fase de resolução de litígios, o contrato reduzirá o depósito deles.

Os pares de canal devem assinar um acordo inicial, com o qual todos concordam. Isto serve como origem do canal de estado, após a qual os usuários poderão começar a realizar transações.

### Usar o canal {#using-the-channel}

Depois de inicializar o estado do canal, os pares interagem assinando transações e enviando uns aos outros para aprovação. Os participantes iniciam atualizações de estado com essas transações e assinam atualizações de estados de outros. Cada transação é composta do seguinte:

- Um **nonce**, que atua como um ID único para transações e impede ataques de replay. Ele também identifica a ordem pela qual ocorreram as atualizações de estado (o que é importante para a resolução de litígios)

- O estado antigo do canal

- O novo estado do canal

- A transação que aciona a transição de estado (por exemplo, Alice envia 5 ETH para Bob)

As atualizações de estado no canal não são transmitidas on-chain, como normalmente acontece quando os usuários interagem na rede principal, o que se alinha com o objetivo dos canais de estado de minimizar a pegada on-chain. Desde que os participantes concordem em atualizações de estado, elas são tão finais como uma transação Ethereum. Os participantes só têm de depender do consenso da rede principal se surgir uma disputa.

### Fechar o canal {#closing-the-channel}

Fechar um canal de estado requer o envio do estado final e acordado do canal para o contrato inteligente on-chain. Os detalhes referenciados na atualização do estado incluem o número de movimentos de cada participante e uma lista de transações aprovadas.

Após verificar que a atualização de estado é válida (ou seja, está assinada por todas as partes), o contrato inteligente finaliza o canal e distribui os fundos bloqueados de acordo com o resultado do canal. Pagamentos feitos off-chain são aplicados ao estado do Ethereum e cada participante recebe sua porção restante dos fundos bloqueados.

O cenário descrito acima representa o que acontece caso tudo dê certo. Às vezes, os usuários podem não conseguir chegar a um acordo e finalizar o canal. Uma das seguintes poderia ser a verdadeira situação:

- Os participantes ficam offline e não conseguem propor transições de estado

- Os participantes se recusam-se a coassinar atualizações de estado válidas

- Os participantes tentam finalizar o canal propondo uma antiga atualização de estado para o contrato on-chain

- Os participantes propõem transições de estado inválidas para que outros assinem

Sempre que o consenso se divide entre os participantes em um canal, a última opção é contar com o consenso da rede principal para impor o estado final e válido do canal. Neste caso, o encerramento do canal de estado exige a resolução de litígios on-chain.

### Resolução de disputas {#settling-disputes}

Normalmente, as partes em um canal concordam em fechar o canal antecipadamente e coassinam a última transição de estado, que eles submetem ao contrato inteligente. Uma vez que a atualização é aprovada on-chain, a execução do contrato inteligente off-chain termina e os participantes saem do canal com o dinheiro deles.

No entanto, uma das partes pode submeter uma solicitação on-chain para terminar a execução do contrato inteligente e finalizar o canal, sem esperar a aprovação da contraparte. Se alguma das situações de ruptura de consenso descritas anteriormente ocorrer, qualquer das partes poderá acionar o contrato on-chain para fechar o canal e distribuir fundos. Isso fornece a **não necessidade de confiança**, garantindo que partes honestas possam sair com seus depósitos a qualquer momento, independentemente das ações da outra parte.

Para processar a saída do canal, o usuário deve submeter a última atualização válida do estado do aplicativo para o contrato on-chain. Se esta verificação ocorrer (ou seja, ele tem a assinatura de todas as partes), então os fundos serão redistribuídos a seu favor.

No entanto, há um atraso na execução de pedidos de saída de um único usuário. Se o pedido para concluir o canal foi aprovado unanimemente, então a transação de saída on-chain é executada imediatamente.

O atraso entra em vigor na saída de um único usuário devido à possibilidade de ações fraudulentas. Por exemplo, um usuário do canal pode tentar finalizar o canal no Ethereum, submetendo uma atualização mais antiga do estado on-chain.

Como contramedida, canais de estado permitem que usuários honestos desafiem atualizações de estado inválidas submetendo o mais recente estado válido do canal on-chain. Canais de estado são projetados para que as mais recentes, e acordadas, atualizações de estado vençam atualizações de estado mais antigas.

Uma vez que uma parte aciona o sistema de resolução de disputas on-chain, a outra parte precisa responder dentro de um limite de tempo (chamado de janela do desafio). Isso permite que os usuários desafiem a transação de saída, especialmente se a outra pessoa estiver aplicando uma atualização obsoleta.

Seja qual for o caso, usuários de canais sempre têm fortes garantias de finalidade: se a transição de estado em sua posse foi assinada por todos os membros e é a atualização mais recente, então tem a mesma finalidade de uma transação regular on-chain. Continuam a ter de desafiar a outra parte on-chain, mas o único resultado possível é a conclusão do último estado válido, que eles detêm.

### Como os canais de estado interagem com o Ethereum? {#how-do-state-channels-interact-with-ethereum}

Embora eles existam como protocolos off-chain, os canais de estado têm um componente on-chain: o contrato inteligente implantado no Ethereum ao abrir o canal. Este contrato controla os ativos depositados no canal, verifica atualizações de estado e arbitra disputas entre os participantes.

Canais de estado não publicam dados de transação ou compromissos de estado na rede principal, ao contrário das soluções de dimensionamento da [camada 2](/layer-2/). No entanto, eles estão mais conectados à rede principal do que, digamos, as [sidechains](/developers/docs/scaling/sidechains/), tornando-os um pouco mais seguros.

As canais de estado dependem do protocolo principal do Ethereum para o seguinte:

#### 1. Vivacidade {#liveness}

O contrato on-chain implantado ao abrir o canal é responsável pela funcionalidade do canal. Se o contrato estiver em execução no Ethereum, então o canal estará sempre disponível para uso. Inversamente, uma sidechain sempre pode falhar, mesmo que a rede principal esteja operacional, colocando o dinheiro dos usuários em risco.

#### 2. Segurança {#security}

Até certo ponto, os canais de estado dependem do Ethereum para fornecer segurança e proteger usuários de pares maliciosos. Conforme discutido em outras seções, os canais usam um mecanismo de prova de fraude que permite aos usuários desafiarem tentativas de finalizar o canal com uma atualização inválida ou obsoleta.

Neste caso, a parte honesta fornece o mais recente estado válido do canal como uma prova de fraude do contrato on-chain para verificação. As provas de fraude permitem que partes mutuamente desconfiadas realizem transações off-chain sem arriscar os seus fundos no processo.

#### 3. Finalidade {#finality}

Atualizações de estado assinadas coletivamente pelos usuários do canal são consideradas como boas transações on-chain. Ainda assim, toda a atividade dentro do canal só atinge a verdadeira finalidade quando o canal é fechado no Ethereum.

No caso otimista, ambas as partes podem cooperar e assinar a atualização final do estado e enviar on-chain para fechar o canal, após o qual os fundos são distribuídos de acordo com o estado final do canal. No caso pessimista, onde alguém tenta trapacear publicando uma atualização incorreta do estado on-chain, sua transação não é finalizada até que a janela do desafio termine.

## Canais de estado virtual {#virtual-state-channels}

A implementação ingênua de um canal de estado seria implantar um novo contrato quando dois usuários desejam executar um aplicativo off-chain. Isso não é apenas inviável, mas também anula a relação custo-benefício dos canais de estado (os custos de transação on-chain podem aumentar rapidamente).

Para resolver este problema, foram criados "canais virtuais". Ao contrário dos canais regulares que exigem transações on-chain para abrir e encerrar, um canal virtual pode ser aberto, executado e finalizado sem interagir com a cadeia principal. É até possível resolver conflitos off-chain usando esse método.

Este sistema se baseia na existência dos chamados "canais ledgers" (canais de livro razão distribuídos), que foram financiados on-chain. Canais virtuais entre duas partes podem ser construídos sobre um canal ledger existente, com o(s) proprietário(s) do canal ledger servindo como intermediário.

Os usuários em cada canal virtual interagem por meio de uma nova instância de contrato, com o canal ledger capaz de suportar várias instâncias de contrato. O estado do canal ledger também contém mais de um estado de armazenamento de contrato, permitindo a execução paralela de aplicativos off-chain entre diferentes usuários.

Assim como os canais regulares, os usuários trocam atualizações de estado para progredir na máquina de estado. Exceto quando surge uma disputa, o intermediário só precisa ser contatado ao abrir ou encerrar o canal.

### Canais de pagamento virtual {#virtual-payment-channels}

Os canais virtuais de pagamento funcionam com a mesma ideia dos canais virtuais de estado: os participantes conectados à mesma rede podem passar mensagens sem a necessidade de abrir um novo canal on-chain. Nos canais virtuais de pagamento, as transferências de valores são roteadas por um ou mais intermediários, com a garantia de que somente o destinatário pretendido poderá receber os recursos transferidos.

## Aplicações de canais de estado {#applications-of-state-channels}

### Pagamentos {#payments}

Os canais de blockchain iniciais eram simples protocolos que permitiam a dois participantes realizarem transferências rápidas e de baixas taxas off-chain sem terem que pagar elevadas taxas de transação na rede principal. Hoje, os canais de pagamento ainda são úteis para os aplicativos projetados para a troca e depósitos de ether e tokens.

Pagamentos baseados em canais possuem as seguintes vantagens:

1. **Taxa de transferência**: a quantidade de transações off-chain por canal não está conectada à taxa de transferência do Ethereum, que é influenciada por vários fatores, especialmente o tamanho dos blocos e tempo de bloco. Ao executar transações off-chain, os canais da blockchain podem alcançar uma taxa de transferência mais alta.

2. **Privacidade**: devido à existência de canais off-chain, os detalhes das interações entre participantes não são gravados na blockchain pública do Ethereum. Os usuários do canal só têm que interagir na on-chain quando financiam e fecham canais ou resolvem disputas. Assim, os canais são úteis para as pessoas que desejam transações mais particulares.

3. **Latência**: as transações off-chain conduzidas entre os participantes do canal podem ser resolvidas instantaneamente, se ambas as partes cooperarem, reduzindo atrasos. Em contraste, enviar uma transação para a rede principal requer esperar que os nós processem a transação, produzam um novo bloco com a transação e alcançem consenso. Os usuários podem também precisar esperar por mais confirmações de blocos antes de considerar uma transação finalizada.

4. **Custo**: canais de estados são particularmente úteis em situações em que um conjunto de participantes intercambiará muitas atualizações de estado por um longo período. Os únicos custos incorridos são a abertura e o encerramento do canal de estado do contrato inteligente; cada mudança de estado entre a abertura e o encerramento do canal será mais barata do que a última, uma vez que o custo da liquidação é distribuído em conformidade.

Implementar canais de estado nas soluções de camada 2, como [rollups](/developers/docs/scaling/#rollups), poderia torná-las ainda mais atraentes para pagamentos. Embora os canais ofereçam pagamentos baratos, os custos de estabelecer o contrato on-chain na rede principal durante a fase de abertura podem ser caros, especialmente quando as taxas de gás aumentam. Os rollups baseados no Ethereum oferecem [taxas de transação mais baixas](https://l2fees.info/) e podem reduzir a sobrecarga para os participantes do canal reduzindo as taxas de configuração.

### Microtransações {#microtransactions}

As microtransações são pagamentos de baixo valor (por exemplo, menores que uma fração de dólar) que as empresas não podem processar sem incorrer em perdas. Estas entidades têm de pagar aos prestadores de serviços de pagamento, o que não podem fazer se a margem sobre os pagamentos aos clientes for demasiado baixa para obter lucros.

Os canais de pagamento resolvem este problema reduzindo a sobrecarga associada com microtransações. Por exemplo, um provedor de Internet (ISP) pode abrir um canal de pagamento com um cliente, permitindo que façam pequenos pagamentos cada vez que usarem o serviço.

Além do custo de abrir e fechar o canal, os participantes não incorrem em custos adicionais nas microtransações (sem taxas de gás). Esta é uma situação vantajosa para todos, uma vez que os clientes têm mais flexibilidade na forma como pagam os serviços, e as empresas não perdem em microtransações rentáveis.

### Aplicativos descentralizados {#decentralized-applications}

Tal como os canais de pagamento, os canais de estado podem fazer pagamentos condicionais, de acordo com os estados finais da máquina de estado. Canais de estado também podem suportar lógica arbitrária de transição de estado, tornando-os úteis para executar aplicativos genéricos off-chain.

Os canais de estado são muitas vezes limitados a simples aplicativos baseados em turnos, já que isso facilita a gestão dos fundos comprometidos com o contrato on-chain. Além disso, com um número limitado de partes atualizando o estado do aplicativo off-chain em intervalos, punir comportamentos desonestos é relativamente simples.

A eficiência de um aplicativo do canal de estado depende também do seu desenho. Por exemplo, um desenvolvedor pode implantar o contrato de canal do aplicativo on-chain uma vez e permitir que outras partes reutilizem o app sem ter que estar on-chain. Neste caso, o canal inicial do aplicativo serve como um canal do ledger que oferece suporte a vários canais virtuais, cada um executando uma nova instância do contrato inteligente off-chain.

Um caso de uso potencial para aplicativos de canal de estado sao os jogos de dois jogadores, em que os fundos são distribuídos com base no resultado do jogo. O benefício aqui é que os jogadores não têm que confiar uns nos outros (trustlessness), e o contrato on-chain, não os jogadores, controla a alocação de fundos e a resolução de litígios (descentralização).

Outros possíveis casos de uso para aplicativos de canais de estado incluem propriedade de nome ENS, registros NFT e muito mais.

### Transferências atômicas {#atomic-transfers}

Os canais de pagamento iniciais eram restritos a transferências entre duas partes, limitando a sua usabilidade. No entanto, a introdução de canais virtuais permitiu que indivíduos encaminhassem transferências através de intermediários (ou seja, vários canais p2p) sem ter que abrir um novo canal on-chain.

Comumente descrito como transferências "multi-hop", os pagamentos roteados são atômicos (ou seja, ou todas as partes da transação são realizadas de forma bem-sucedida ou ela falha completamente). As transferências atômicas usam [Hashed Timelock Contracts (HTLCs)](https://en.bitcoin.it/wiki/Hash_Time_Locked_Contracts) para garantir que o pagamento seja liberado apenas se certas condições forem atendidas, reduzindo assim o risco de contraparte.

## Desvantagens de se usar canais de estado {#drawbacks-of-state-channels}

### Suposições de vivacidade {#liveness-assumptions}

Para garantir a eficiência, os canais de estado colocam limites de tempo na capacidade de os participantes do canal responderem a disputas. Essa regra assume que os pares estarão sempre online para monitorar a atividade do canal e contestar os desafios quando necessário.

Na realidade, os usuários podem ficar offline por razões fora do seu controle (por exemplo, má conexão de internet, falha mecânica, etc.). Se um usuário honesto fica offline, um par malicioso pode explorar a situação apresentando os antigos estados intermediários ao contrato do adjudicador e roubar os fundos comprometidos.

Alguns canais usam "watchtowers" – entidades responsáveis por acompanhar eventos de disputas on-chain em nome de outros e tomar as ações necessárias, como alertar as partes interessadas. No entanto, isso pode aumentar os custos de utilização de um canal de estado.

### Indisponibilidade de dados {#data-unavailability}

Como explicado anteriormente, desafiar uma disputa inválida requer apresentar o mais recente e válido estado do canal de estado. Esta é outra regra baseada em uma suposição: que os usuários têm acesso ao estado mais recente do canal.

Embora seja razoável esperar que os usuários do canal armazenem cópias do estado do aplicativo off-chain, esses dados podem ser perdidos devido a erros ou falhas mecânicas. Se o usuário não tiver os dados de backup, ele só poderá esperar que a outra parte não finalize uma solicitação de saída inválida usando transições de estado antigas na posse dele.

Os usuários do Ethereum não precisam lidar com esse problema, uma vez que a rede impõe regras de disponibilidade de dados. Os dados da transação são armazenados e propagados por todos os nós e disponíveis para que os usuários baixem se e quando necessário.

### Problemas de liquidez {#liquidity-issues}

Para estabelecer um canal blockchain, os participantes precisam bloquear fundos em um contrato inteligente on-chain para o ciclo de vida do canal. Isto reduz a liquidez dos usuários do canal e também limita os canais para aqueles que podem arcar com os fundos bloqueados na rede principal.

No entanto, canais do ledger, operados por um provedor de serviços off-chain (OSP), podem reduzir problemas de liquidez para os usuários. Dois pares conectados a um canal de ledger podem criar um canal virtual, que eles podem abrir e finalizar completamente off-chain, quando quiserem.

Provedores de serviço off-chain também podem abrir canais com vários pares, tornando-os úteis para encaminhar pagamentos. É claro que os utilizadores têm de pagar taxas aos OSPs pelos seus serviços, o que pode ser indesejável para alguns.

### Ataques de griefing {#griefing-attacks}

Os ataques de griefing são uma característica comum dos sistemas baseados em provas de fraude. Um ataque de griefing não beneficia diretamente o atacante, mas causa dor (ou seja, dano) à vítima, daí o nome.

A prova de fraude é suscetível a ataques de griefing porque a parte honesta deve responder a todas as disputas, até mesmo as inválidas, ou corre o risco de perder os seus fundos. Um participante malicioso pode decidir repetidamente publicar o estado de transições on-chain, forçando a parte honesta a responder com o estado válido. O custo dessas transações on-chain pode aumentar rapidamente, fazendo com que partes honestas se percam no processo.

### Conjuntos de participantes predefinidos {#predefined-participant-sets}

Por desenho, o número de participantes que compõem um canal do estado permanece fixo ao longo de sua vida. Isso porque atualizar o conjunto dos participantes iria complicar a operação do canal, especialmente ao financiar o canal ou resolver conflitos. Adicionar ou remover os participantes também exigiria atividade adicional on-chain, o que aumenta a sobrecarga para os usuários.

Embora isso torne os canais de estado mais fáceis de justificar, ele limita a utilidade dos desenhos de canais aos desenvolvedores de aplicativos. Isso explica parcialmente porque os canais de estado foram preteridos a favor de outras soluções de dimensionamento, como rollups.

### Processamento paralelo de transações {#parallel-transaction-processing}

Os participantes do canal de estado enviam atualizações de estado em turnos, e é por isso que eles funcionam melhor para aplicativos baseados em turnos (por exemplo, um jogo de xadrez com dois jogadores). Isso elimina a necessidade de lidar com atualizações de estado simultâneas e reduz o trabalho que o contrato on-chain deve fazer para punir quem publica atualizações de estado obsoletas. No entanto, um efeito colateral desse desenho é que as transações são dependentes uma das outras, aumentando a latência e diminuindo a experiência geral do usuário.

Alguns canais de estado resolvem esse problema usando um design "full-duplex" que separa o estado off-chain em dois estados unidirecionais de estados "simplex", permitindo atualizações de estado simultâneas. Tais desenhos melhoram a taxa de transferência off-chain e diminuem os atrasos nas transações.

## Usar canais de estado {#use-state-channels}

Vários projetos fornecem implementações da cadeia Plasma que você pode integrar aos seus dapps:

- [Connext](https://connext.network/)
- [Kchannels](https://www.kchannels.io/)
- [Perun](https://perun.network/)
- [Raiden](https://raiden.network/)
- [Statechannels.org](https://statechannels.org/)

## Leitura adicional {#further-reading}

**Canais de Estado**

- [Entendendo a camada 2](https://medium.com/l4-media/making-sense-of-ethereums-layer-2-scaling-solutions-state-channels-plasma-and-truebit-22cb40dcc2f4) _12 de fev., 2018 - Josh Stark_
- [Canais de estado: uma explicação](https://www.jeffcoleman.ca/state-channels/) _6 de nov., 2015 - Jeff Coleman_
- [Fundamentos dos canais de estado](https://education.district0x.io/general-topics/understanding-ethereum/basics-state-channels/) _District0x_
- [Canais de estado da blockchain: um componente de última geração](https://ieeexplore.ieee.org/document/9627997)

_Conhece um recurso da comunidade que ajudou você? Edite essa página e adicione-o!_