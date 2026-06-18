---
title: Canais de estado
description: "Uma introdução aos canais de estado e canais de pagamento como uma solução de escalabilidade atualmente utilizada pela comunidade Ethereum."
lang: pt-br
sidebarDepth: 3
---

Os canais de estado permitem que os participantes transacionem com segurança offchain, mantendo a interação com a Mainnet do [Ethereum](/) no mínimo. Os pares do canal podem conduzir um número arbitrário de transações offchain enquanto enviam apenas duas transações onchain para abrir e fechar o canal. Isso permite uma vazão de transações extremamente alta e resulta em custos mais baixos para os usuários.

## Pré-requisitos {#prerequisites}

Você deve ter lido e compreendido nossas páginas sobre [escalabilidade do Ethereum](/developers/docs/scaling/) e [camada 2 (l2)](/layer-2/).

## O que são canais? {#what-are-channels}

Blockchains públicas, como o Ethereum, enfrentam desafios de escalabilidade devido à sua arquitetura distribuída: as transações onchain devem ser executadas por todos os nós. Os nós precisam ser capazes de lidar com o volume de transações em um bloco usando hardware modesto, impondo um limite na vazão de transações para manter a rede descentralizada. Os canais de blockchain resolvem esse problema permitindo que os usuários interajam offchain enquanto ainda dependem da segurança da cadeia principal para a liquidação final.

Canais são protocolos ponto a ponto simples que permitem que duas partes façam muitas transações entre si e, em seguida, publiquem apenas os resultados finais na blockchain. O canal usa criptografia para demonstrar que os dados de resumo que eles geram são verdadeiramente o resultado de um conjunto válido de transações intermediárias. Um contrato inteligente ["multisig"](/developers/docs/smart-contracts/#multisig) garante que as transações sejam assinadas pelas partes corretas.

Com os canais, as mudanças de estado são executadas e validadas pelas partes interessadas, minimizando a computação na camada de execução do Ethereum. Isso diminui o congestionamento no Ethereum e também aumenta a velocidade de processamento de transações para os usuários.

Cada canal é gerenciado por um [contrato inteligente multisig](/developers/docs/smart-contracts/#multisig) rodando no Ethereum. Para abrir um canal, os participantes implantam o contrato do canal onchain e depositam fundos nele. Ambas as partes assinam coletivamente uma atualização de estado para inicializar o estado do canal, após o qual podem transacionar de forma rápida e livre offchain.

Para fechar o canal, os participantes enviam o último estado acordado do canal onchain. Depois disso, o contrato inteligente distribui os fundos bloqueados de acordo com o saldo de cada participante no estado final do canal.

Canais ponto a ponto são particularmente úteis para situações em que alguns participantes predefinidos desejam transacionar com alta frequência sem incorrer em sobrecarga visível. Os canais de blockchain se enquadram em duas categorias: **canais de pagamento** e **canais de estado**.

## Canais de pagamento {#payment-channels}

Um canal de pagamento é melhor descrito como um "livro-razão de mão dupla" mantido coletivamente por dois usuários. O saldo inicial do livro-razão é a soma dos depósitos bloqueados no contrato onchain durante a fase de abertura do canal. As transferências do canal de pagamento podem ser realizadas instantaneamente e sem o envolvimento da própria blockchain, exceto por uma criação onchain inicial única e um eventual fechamento do canal.

Atualizações no saldo do livro-razão (ou seja, o estado do canal de pagamento) exigem a aprovação de todas as partes no canal. Uma atualização de canal, assinada por todos os participantes do canal, é considerada finalizada, muito semelhante a uma transação no Ethereum.

Os canais de pagamento estavam entre as primeiras soluções de escalabilidade projetadas para minimizar a cara atividade onchain de interações simples de usuários (por exemplo, transferências de ETH, trocas atômicas, micropagamentos). Os participantes do canal podem conduzir uma quantidade ilimitada de transações instantâneas e sem taxas entre si, desde que a soma líquida de suas transferências não exceda os tokens depositados.

## Canais de estado {#state-channels}

Além de suportar pagamentos offchain, os canais de pagamento não se mostraram úteis para lidar com a lógica geral de transição de estado. Os canais de estado foram criados para resolver esse problema e tornar os canais úteis para escalar a computação de propósito geral.

Os canais de estado ainda têm muito em comum com os canais de pagamento. Por exemplo, os usuários interagem trocando mensagens assinadas criptograficamente (transações), que os outros participantes do canal também devem assinar. Se uma atualização de estado proposta não for assinada por todos os participantes, ela é considerada inválida.

No entanto, além de manter os saldos do usuário, o canal também rastreia o estado atual do armazenamento do contrato (ou seja, valores das variáveis do contrato).

Isso torna possível executar um contrato inteligente offchain entre dois usuários. Neste cenário, as atualizações no estado interno do contrato inteligente exigem apenas a aprovação dos pares que criaram o canal.

Embora isso resolva o problema de escalabilidade descrito anteriormente, tem implicações para a segurança. No Ethereum, a validade das transições de estado é aplicada pelo protocolo de consenso da rede. Isso torna impossível propor uma atualização inválida para o estado de um contrato inteligente ou alterar a execução do contrato inteligente.

Os canais de estado não têm as mesmas garantias de segurança. Até certo ponto, um canal de estado é uma versão em miniatura da Mainnet. Com um conjunto limitado de participantes aplicando regras, a possibilidade de comportamento malicioso (por exemplo, propor atualizações de estado inválidas) aumenta. Os canais de estado derivam sua segurança de um sistema de arbitragem de disputas baseado em [provas de fraude](/glossary/#fraud-proof).

## Como os canais de estado funcionam {#how-state-channels-work}

Basicamente, a atividade em um canal de estado é uma sessão de interações envolvendo usuários e um sistema blockchain. Os usuários se comunicam principalmente entre si offchain e interagem com a blockchain subjacente apenas para abrir o canal, fechar o canal ou liquidar possíveis disputas entre os participantes.

A seção a seguir descreve o fluxo de trabalho básico de um canal de estado:

### Abrindo o canal {#opening-the-channel}

Abrir um canal exige que os participantes comprometam fundos em um contrato inteligente na Mainnet. O depósito também funciona como uma conta virtual, para que os atores participantes possam transacionar livremente sem precisar liquidar os pagamentos imediatamente. Somente quando o canal é finalizado onchain as partes liquidam entre si e retiram o que sobrou de sua conta.

Este depósito também serve como uma fiança para garantir o comportamento honesto de cada participante. Se os depositantes forem considerados culpados de ações maliciosas durante a fase de resolução de disputas, o contrato corta seu depósito.

Os pares do canal devem assinar um estado inicial, com o qual todos concordam. Isso serve como a gênese do canal de estado, após o qual os usuários podem começar a transacionar.

### Usando o canal {#using-the-channel}

Após inicializar o estado do canal, os pares interagem assinando transações e enviando-as uns aos outros para aprovação. Os participantes iniciam atualizações de estado com essas transações e assinam atualizações de estado de outros. Cada transação compreende o seguinte:

- Um **nonce**, que atua como um ID exclusivo para transações e evita ataques de repetição. Ele também identifica a ordem em que as atualizações de estado ocorreram (o que é importante para a resolução de disputas)

- O estado antigo do canal

- O novo estado do canal

- A transação que aciona a transição de estado (por exemplo, Alice envia 5 ETH para Bob)

As atualizações de estado no canal não são transmitidas onchain como normalmente é o caso quando os usuários interagem na Mainnet, o que se alinha com o objetivo dos canais de estado de minimizar a pegada onchain. Desde que os participantes concordem com as atualizações de estado, elas são tão finais quanto uma transação no Ethereum. Os participantes só precisam depender do consenso da Mainnet se surgir uma disputa.

### Fechando o canal {#closing-the-channel}

Fechar um canal de estado exige o envio do estado final e acordado do canal para o contrato inteligente onchain. Os detalhes referenciados na atualização de estado incluem o número de movimentos de cada participante e uma lista de transações aprovadas.

Após verificar se a atualização de estado é válida (ou seja, é assinada por todas as partes), o contrato inteligente finaliza o canal e distribui os fundos bloqueados de acordo com o resultado do canal. Os pagamentos feitos offchain são aplicados ao estado do Ethereum e cada participante recebe sua parte restante dos fundos bloqueados.

O cenário descrito acima representa o que acontece no caso ideal. Às vezes, os usuários podem não conseguir chegar a um acordo e finalizar o canal (o caso problemático). Qualquer uma das seguintes opções pode ser verdadeira para a situação:

- Os participantes ficam offline e não conseguem propor transições de estado

- Os participantes se recusam a coassinar atualizações de estado válidas

- Os participantes tentam finalizar o canal propondo uma atualização de estado antiga para o contrato onchain

- Os participantes propõem transições de estado inválidas para outros assinarem

Sempre que o consenso é quebrado entre os atores participantes em um canal, a última opção é depender do consenso da Mainnet para impor o estado final e válido do canal. Neste caso, fechar o canal de estado exige a liquidação de disputas onchain.

### Liquidando disputas {#settling-disputes}

Normalmente, as partes em um canal concordam em fechar o canal com antecedência e coassinam a última transição de estado, que enviam ao contrato inteligente. Uma vez que a atualização é aprovada onchain, a execução do contrato inteligente offchain termina e os participantes saem do canal com seu dinheiro.

No entanto, uma parte pode enviar uma solicitação onchain para encerrar a execução do contrato inteligente e finalizar o canal — sem esperar pela aprovação de sua contraparte. Se ocorrer alguma das situações de quebra de consenso descritas anteriormente, qualquer uma das partes pode acionar o contrato onchain para fechar o canal e distribuir os fundos. Isso fornece **desnecessidade de confiança**, garantindo que partes honestas possam retirar seus depósitos a qualquer momento, independentemente das ações da outra parte.

Para processar a saída do canal, o usuário deve enviar a última atualização de estado válida do aplicativo para o contrato onchain. Se isso for verificado (ou seja, tiver a assinatura de todas as partes), os fundos serão redistribuídos a seu favor.

Há, no entanto, um atraso na execução de solicitações de saída de usuário único. Se a solicitação para concluir o canal foi aprovada por unanimidade, a transação de saída onchain é executada imediatamente.

O atraso entra em jogo em saídas de usuário único devido à possibilidade de ações fraudulentas. Por exemplo, um participante do canal pode tentar finalizar o canal no Ethereum enviando uma atualização de estado mais antiga onchain.

Como contramedida, os canais de estado permitem que usuários honestos contestem atualizações de estado inválidas enviando o estado mais recente e válido do canal onchain. Os canais de estado são projetados de forma que atualizações de estado mais recentes e acordadas superem as atualizações de estado mais antigas.

Uma vez que um par aciona o sistema de resolução de disputas onchain, a outra parte é obrigada a responder dentro de um limite de tempo (chamado de janela de contestação). Isso permite que os usuários contestem a transação de saída, especialmente se a outra parte estiver aplicando uma atualização obsoleta.

Seja qual for o caso, os usuários do canal sempre têm fortes garantias de finalidade: se a transição de estado em sua posse foi assinada por todos os membros e é a atualização mais recente, então ela tem a mesma finalidade de uma transação onchain regular. Eles ainda precisam contestar a outra parte onchain, mas o único resultado possível é finalizar o último estado válido, que eles mantêm.

### Como os canais de estado interagem com o Ethereum? {#how-do-state-channels-interact-with-ethereum}

Embora existam como protocolos offchain, os canais de estado têm um componente onchain: o contrato inteligente implantado no Ethereum ao abrir o canal. Este contrato controla os ativos depositados no canal, verifica as atualizações de estado e arbitra disputas entre os participantes.

Os canais de estado não publicam dados de transação ou compromissos de estado na Mainnet, ao contrário das soluções de escalabilidade de [camada 2 (l2)](/layer-2/). No entanto, eles estão mais conectados à Mainnet do que, digamos, [sidechains](/developers/docs/scaling/sidechains/), tornando-os um pouco mais seguros.

Os canais de estado dependem do protocolo principal do Ethereum para o seguinte:

#### 1. Vivacidade {#liveness}

O contrato onchain implantado ao abrir o canal é responsável pela funcionalidade do canal. Se o contrato estiver rodando no Ethereum, o canal estará sempre disponível para uso. Por outro lado, uma sidechain sempre pode falhar, mesmo que a Mainnet esteja operacional, colocando os fundos dos usuários em risco.

#### 2. Segurança {#security}

Até certo ponto, os canais de estado dependem do Ethereum para fornecer segurança e proteger os usuários de pares maliciosos. Como discutido em seções posteriores, os canais usam um mecanismo de prova de fraude que permite aos usuários contestar tentativas de finalizar o canal com uma atualização inválida ou obsoleta.

Neste caso, a parte honesta fornece o estado válido mais recente do canal como uma prova de fraude ao contrato onchain para verificação. As provas de fraude permitem que partes mutuamente desconfiadas conduzam transações offchain sem arriscar seus fundos no processo.

#### 3. Finalidade {#finality}

As atualizações de estado assinadas coletivamente pelos usuários do canal são consideradas tão boas quanto as transações onchain. Ainda assim, toda a atividade no canal só atinge a verdadeira finalidade quando o canal é fechado no Ethereum.

No caso otimista, ambas as partes podem cooperar e assinar a atualização de estado final e enviar onchain para fechar o canal, após o qual os fundos são distribuídos de acordo com o estado final do canal. No caso pessimista, onde alguém tenta trapacear publicando uma atualização de estado incorreta onchain, sua transação não é finalizada até que a janela de contestação termine.

## Canais de estado virtuais {#virtual-state-channels}

A implementação ingênua de um canal de estado seria implantar um novo contrato quando dois usuários desejassem executar um aplicativo offchain. Isso não é apenas inviável, mas também anula a relação custo-benefício dos canais de estado (os custos de transação onchain podem se acumular rapidamente).

Para resolver esse problema, foram criados os "canais virtuais". Ao contrário dos canais regulares que exigem transações onchain para abrir e terminar, um canal virtual pode ser aberto, executado e finalizado sem interagir com a cadeia principal. É até possível liquidar disputas offchain usando este método.

Este sistema depende da existência dos chamados "canais de livro-razão" (ledger channels), que foram financiados onchain. Canais virtuais entre duas partes podem ser construídos sobre um canal de livro-razão existente, com o(s) proprietário(s) do canal de livro-razão servindo como intermediário.

Os usuários em cada canal virtual interagem por meio de uma nova instância de contrato, com o canal de livro-razão capaz de suportar várias instâncias de contrato. O estado do canal de livro-razão também contém mais de um estado de armazenamento de contrato, permitindo a execução paralela de aplicativos offchain entre diferentes usuários.

Assim como nos canais regulares, os usuários trocam atualizações de estado para progredir a máquina de estado. A menos que surja uma disputa, o intermediário só precisa ser contatado ao abrir ou terminar o canal.

### Canais de pagamento virtuais {#virtual-payment-channels}

Os canais de pagamento virtuais funcionam com a mesma ideia dos canais de estado virtuais: os participantes conectados à mesma rede podem passar mensagens sem precisar abrir um novo canal onchain. Em canais de pagamento virtuais, as transferências de valor são roteadas por meio de um ou mais intermediários, com garantias de que apenas o destinatário pretendido pode receber os fundos transferidos.

## Aplicações de canais de estado {#applications-of-state-channels}

### Pagamentos {#payments}

Os primeiros canais de blockchain eram protocolos simples que permitiam que dois participantes conduzissem transferências rápidas e de baixa taxa offchain sem ter que pagar altas taxas de transação na Mainnet. Hoje, os canais de pagamento ainda são úteis para aplicativos projetados para a troca e depósitos de ether e tokens.

Os pagamentos baseados em canais têm as seguintes vantagens:

1. **Vazão**: A quantidade de transações offchain por canal não está conectada à vazão do Ethereum, que é influenciada por vários fatores, especialmente o tamanho do bloco e o tempo de bloco. Ao executar transações offchain, os canais de blockchain podem atingir uma vazão maior.

2. **Privacidade**: Como os canais existem offchain, os detalhes das interações entre os participantes não são registrados na blockchain pública do Ethereum. Os usuários do canal só precisam interagir onchain ao financiar e fechar canais ou liquidar disputas. Assim, os canais são úteis para indivíduos que desejam transações mais privadas.

3. **Latência**: As transações offchain conduzidas entre os participantes do canal podem ser liquidadas instantaneamente, se ambas as partes cooperarem, reduzindo atrasos. Em contraste, enviar uma transação na Mainnet exige esperar que os nós processem a transação, produzam um novo bloco com a transação e cheguem a um consenso. Os usuários também podem precisar esperar por mais confirmações de bloco antes de considerar uma transação finalizada.

4. **Custo**: Os canais de estado são particularmente úteis em situações em que um conjunto de participantes trocará muitas atualizações de estado por um longo período. Os únicos custos incorridos são a abertura e o fechamento do contrato inteligente do canal de estado; cada mudança de estado entre a abertura e o fechamento do canal será mais barata que a anterior, pois o custo de liquidação é distribuído de acordo.

A implementação de canais de estado em soluções de camada 2 (l2), como [rollups](/developers/docs/scaling/#rollups), pode torná-los ainda mais atraentes para pagamentos. Embora os canais ofereçam pagamentos baratos, os custos de configuração do contrato onchain na Mainnet durante a fase de abertura podem ficar caros — especialmente quando as taxas de gás disparam. Os rollups baseados no Ethereum oferecem [taxas de transação mais baixas](https://l2fees.info/) e podem reduzir a sobrecarga para os participantes do canal, diminuindo as taxas de configuração.

### Microtransações {#microtransactions}

Microtransações são pagamentos de baixo valor (por exemplo, menores que uma fração de dólar) que as empresas não podem processar sem incorrer em perdas. Essas entidades devem pagar aos provedores de serviços de pagamento, o que não podem fazer se a margem nos pagamentos dos clientes for muito baixa para obter lucro.

Os canais de pagamento resolvem esse problema reduzindo a sobrecarga associada às microtransações. Por exemplo, um Provedor de Serviços de Internet (ISP) pode abrir um canal de pagamento com um cliente, permitindo que ele transmita pequenos pagamentos cada vez que usar o serviço.

Além do custo de abrir e fechar o canal, os participantes não incorrem em custos adicionais em microtransações (sem taxas de gás). Esta é uma situação em que todos ganham, pois os clientes têm mais flexibilidade em quanto pagam pelos serviços e as empresas não perdem microtransações lucrativas.

### Aplicativos descentralizados {#decentralized-applications}

Como os canais de pagamento, os canais de estado podem fazer pagamentos condicionais de acordo com os estados finais da máquina de estado. Os canais de estado também podem suportar lógica de transição de estado arbitrária, tornando-os úteis para executar aplicativos genéricos offchain.

Os canais de estado são frequentemente limitados a aplicativos simples baseados em turnos, pois isso facilita o gerenciamento de fundos comprometidos com o contrato onchain. Além disso, com um número limitado de partes atualizando o estado do aplicativo offchain em intervalos, punir o comportamento desonesto é relativamente simples.

A eficiência de um aplicativo de canal de estado também depende de seu design. Por exemplo, um desenvolvedor pode implantar o contrato do canal do aplicativo onchain uma vez e permitir que outros jogadores reutilizem o aplicativo sem precisar ir onchain. Neste caso, o canal do aplicativo inicial serve como um canal de livro-razão suportando vários canais virtuais, cada um executando uma nova instância do contrato inteligente do aplicativo offchain.

Um caso de uso potencial para aplicativos de canal de estado são jogos simples para dois jogadores, onde os fundos são distribuídos com base no resultado do jogo. O benefício aqui é que os jogadores não precisam confiar uns nos outros (desnecessidade de confiança) e o contrato onchain, não os jogadores, controla a alocação de fundos e a liquidação de disputas (descentralização).

Outros possíveis casos de uso para aplicativos de canal de estado incluem propriedade de nomes ENS, livros-razão de NFT e muitos mais.

### Transferências atômicas {#atomic-transfers}

Os primeiros canais de pagamento eram restritos a transferências entre duas partes, limitando sua usabilidade. No entanto, a introdução de canais virtuais permitiu que os indivíduos roteassem transferências por meio de intermediários (ou seja, vários canais p2p) sem precisar abrir um novo canal onchain.

Comumente descritos como "transferências de múltiplos saltos", os pagamentos roteados são atômicos (ou seja, ou todas as partes da transação são bem-sucedidas ou ela falha completamente). As transferências atômicas usam [Contratos de Bloqueio de Tempo com Hash (HTLCs)](https://en.bitcoin.it/wiki/Hash_Time_Locked_Contracts) para garantir que o pagamento seja liberado apenas se certas condições forem atendidas, reduzindo assim o risco de contraparte.

## Desvantagens de usar canais de estado {#drawbacks-of-state-channels}

### Suposições de vivacidade {#liveness-assumptions}

Para garantir a eficiência, os canais de estado impõem limites de tempo à capacidade dos participantes do canal de responder a disputas. Esta regra pressupõe que os pares estarão sempre online para monitorar a atividade do canal e contestar desafios quando necessário.

Na realidade, os usuários podem ficar offline por motivos fora de seu controle (por exemplo, conexão de internet ruim, falha mecânica, etc.). Se um usuário honesto ficar offline, um par malicioso pode explorar a situação apresentando estados intermediários antigos ao contrato adjudicador e roubando os fundos comprometidos.

Alguns canais usam "torres de vigia" (watchtowers) — entidades responsáveis por observar eventos de disputa onchain em nome de outros e tomar as medidas necessárias, como alertar as partes interessadas. No entanto, isso pode aumentar os custos de uso de um canal de estado.

### Indisponibilidade de dados {#data-unavailability}

Como explicado anteriormente, contestar uma disputa inválida exige apresentar o estado válido mais recente do canal de estado. Esta é outra regra baseada em uma suposição — de que os usuários têm acesso ao estado mais recente do canal.

Embora esperar que os usuários do canal armazenem cópias do estado do aplicativo offchain seja razoável, esses dados podem ser perdidos devido a erro ou falha mecânica. Se o usuário não tiver o backup dos dados, ele só pode esperar que a outra parte não finalize uma solicitação de saída inválida usando transições de estado antigas em sua posse.

Os usuários do Ethereum não precisam lidar com esse problema, pois a rede impõe regras sobre a disponibilidade de dados. Os dados da transação são armazenados e propagados por todos os nós e estão disponíveis para os usuários baixarem se e quando necessário.

### Problemas de liquidez {#liquidity-issues}

Para estabelecer um canal de blockchain, os participantes precisam bloquear fundos em um contrato inteligente onchain durante o ciclo de vida do canal. Isso reduz a liquidez dos usuários do canal e também limita os canais àqueles que podem se dar ao luxo de manter fundos bloqueados na Mainnet.

No entanto, os canais de livro-razão — operados por um provedor de serviços offchain (OSP) — podem reduzir os problemas de liquidez para os usuários. Dois pares conectados a um canal de livro-razão podem criar um canal virtual, que podem abrir e finalizar completamente offchain, a qualquer momento que desejarem.

Provedores de serviços offchain também podem abrir canais com vários pares, tornando-os úteis para rotear pagamentos. É claro que os usuários devem pagar taxas aos OSPs por seus serviços, o que pode ser indesejável para alguns.

### Ataques de griefing {#griefing-attacks}

Ataques de griefing (assédio/prejuízo) são uma característica comum de sistemas baseados em provas de fraude. Um ataque de griefing não beneficia diretamente o invasor, mas causa dor (ou seja, dano) à vítima, daí o nome.

A prova de fraude é suscetível a ataques de griefing porque a parte honesta deve responder a todas as disputas, mesmo as inválidas, ou corre o risco de perder seus fundos. Um participante malicioso pode decidir publicar repetidamente transações de estado obsoletas onchain, forçando a parte honesta a responder com o estado válido. O custo dessas transações onchain pode se acumular rapidamente, fazendo com que as partes honestas percam no processo.

### Conjuntos de participantes predefinidos {#predefined-participant-sets}

Por design, o número de participantes que compõem um canal de estado permanece fixo ao longo de sua vida útil. Isso ocorre porque a atualização do conjunto de participantes complicaria a operação do canal, especialmente ao financiar o canal ou liquidar disputas. Adicionar ou remover participantes também exigiria atividade onchain adicional, o que aumenta a sobrecarga para os usuários.

Embora isso torne os canais de estado mais fáceis de raciocinar, limita a utilidade dos designs de canal para desenvolvedores de aplicativos. Isso explica em parte por que os canais de estado foram abandonados em favor de outras soluções de escalabilidade, como rollups.

### Processamento paralelo de transações {#parallel-transaction-processing}

Os participantes no canal de estado enviam atualizações de estado em turnos, e é por isso que funcionam melhor para "aplicativos baseados em turnos" (por exemplo, um jogo de xadrez para dois jogadores). Isso elimina a necessidade de lidar com atualizações de estado simultâneas e reduz o trabalho que o contrato onchain deve fazer para punir os publicadores de atualizações obsoletas. No entanto, um efeito colateral desse design é que as transações são dependentes umas das outras, aumentando a latência e diminuindo a experiência geral do usuário.

Alguns canais de estado resolvem esse problema usando um design "full-duplex" que separa o estado offchain em dois estados "simplex" unidirecionais, permitindo atualizações de estado simultâneas. Tais designs melhoram a vazão offchain e diminuem os atrasos nas transações.

## Use canais de estado {#use-state-channels}

Vários projetos fornecem implementações de canais de estado que você pode integrar em seus dapps:

- [Connext](https://connext.network/)
- [Perun](https://perun.network/)
- [Raiden](https://raiden.network/)
- [Statechannels.org](https://statechannels.org/)

## Leitura adicional {#further-reading}

**Canais de estado**

- [Entendendo as soluções de escalabilidade de camada 2 do Ethereum: Canais de estado, Plasma e Truebit](https://medium.com/l4-media/making-sense-of-ethereums-layer-2-scaling-solutions-state-channels-plasma-and-truebit-22cb40dcc2f4) _– Josh Stark, 12 de fev. de 2018_
- [Canais de estado - uma explicação](https://www.jeffcoleman.ca/state-channels/) _6 de nov. de 2015 - Jeff Coleman_
- [Noções básicas de canais de estado](https://unlock-protocol.github.io/ethhub/ethereum-roadmap/layer-2-scaling/state-channels/) _District0x_
- [Canais de estado de blockchain: O estado da arte](https://ieeexplore.ieee.org/document/9627997)

_Conhece um recurso comunitário que o ajudou? Edite esta página e adicione-o!_