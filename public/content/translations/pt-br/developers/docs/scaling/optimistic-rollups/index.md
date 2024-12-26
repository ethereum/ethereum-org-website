---
title: Optimistic Rollups
description: Uma introdução aos optimistic rollups, uma solução de dimensionamento usada pela comunidade Ethereum.
lang: pt-br
---

Os optimistic rollups são protocolos de camada 2 (L2) projetados para aumentar a taxa de transferência da camada base do Ethereum. Eles reduzem a computação na cadeia principal do Ethereum ao processar transações off-chain, oferecendo uma melhora significativa na velocidade de processamento. Diferentemente de outras soluções de dimensionamento, como [sidechains](/developers/docs/scaling/sidechains/), os optimistic rollups têm a sua segurança derivada da rede principal, pois publicam os resultados de suas transações on-chain. Os optimistic rollups também se diferem de [plasma chains](/developers/docs/scaling/plasma/). Estes também verificam transações no Ethereum com provas de fraude, mas fazem o armazenamento de dados em outro lugar.

Como a computação é a parte lenta e cara de usar o Ethereum, os optimistic rollups podem oferecer uma melhora de dimensionamento de 10 a 100 vezes superior. Os optimistic rollups também gravam transações no Ethereum como `calldata` ou em [blobs](/roadmap/danksharding/), reduzindo os custos de gás para os usuários.

## Pré-Requisitos {#prerequisites}

Você deve ter lido e compreendido nossas páginas sobre [dimensionamento do Ethereum](/developers/docs/scaling/) e [camada 2](/layer-2/).

## O que é um optimistic rollup? {#what-is-an-optimistic-rollup}

Um optimistic rollup é uma maneira de dimensionara o Ethereum que evolve mover a computação e o armazenamento do estado off-chain. Optimistic rollups executam transações fora do Ethereum, mas publicam dados de transações na rede principal, como `calldata` ou em [blobs](/roadmap/danksharding/).

Os operadores de optimistic rollups agrupam várias transações off-chain em grandes lotes antes de as enviarem ao Ethereum. Esta abordagem permite dividir os custos entre várias transações em cada lote, reduzindo as taxas para os usuários finais. Os optimistic rollups também usam técnicas de compactação para reduzir a quantidade de dados publicados no Ethereum.

Estes rollups são considerados "otimistas", pois assumem que as transações feitas off-chain são válidas e não publicam provas de validade para os lotes de transações publicados on-chain. Isso separa os optimistic rollups dos [zero-knowledge rollups](/developers/docs/scaling/zk-rollups) que publicam provas criptográficas [de validade](/glossary/#validity-proof) para transações realizadas off-chain.

Em vez disso, os optimistic rollups dependem de um esquema de comprovação de fraude para detectar casos em que as transações não são calculadas corretamente. Depois que um lote é enviado ao Ethereum, existe uma janela de tempo (chamada de período de disputa) em que qualquer pessoa pode questionar os resultados de uma transação de rollup computando uma [comprovação de fraude](/glossary/#fraud-proof).

Se a comprovação de fraude for bem-sucedida, o protocolo do rollup executa novamente as transações e atualiza o estado do rollup de forma adequada. O outro efeito de uma comprovação de fraude bem-sucedida é que o sequenciador responsável por incluir em um bloco a transação incorreta é penalizado.

Se o lote de rollup permanecer sem desafio (ou seja, se todas as transações foram executadas corretamente) após o período de disputa expirar, ele será considerado válido e aceito no Ethereum. Outros podem continuar a construir sobre um bloco não confirmado do rollup, mas com uma ressalva: as transações serão revertidas se baseadas em uma transação executada incorretamente publicada anteriormente.

## Como os optimistic rollups interagem com o Ethereum? {#optimistic-rollups-and-Ethereum}

Os optimistic rollups são [soluções de dimensionamento off-chain](/developers/docs/scaling/#off-chain-scaling) criadas para operar sobre o Ethereum. Cada optimistic rollup é gerenciado por um conjunto de contratos inteligentes implementados na rede Ethereum. Os optimistic rollups processam transações fora da rede principal do Ethereum, mas publicam transações off-chain (em lotes) em um contrato de rollup on-chain. Como na blockchain do Ethereum, esse registro de transações é imutável e compõe a cadeia do optimistic rollup.

A arquitetura de um optimistic rollup compreende as seguintes partes:

**Contratos on-chain**: a operação do optimistic rollup é controlada por contratos inteligentes em execução no Ethereum. Isso inclui contratos que armazenam blocos de rollup, monitoram atualizações de estado e rastreiam depósitos de usuário. Neste sentido o Ethereum serve como camada de base ou "camada 1" para os optimistic rollups.

**Máquina virtual (VM) off-chain**: embora os contratos gerenciando o protocolo de optimistic rollup executem no Ethereum, o protocolo de rollup executa a computação e o armazenamento de estado em outra máquina virtual separada da [Máquina Virtual do Ethereum (EVM, pela sigla em inglês)](/developers/docs/evm/). A VM off-chain é onde os aplicativos se encontram e as mudanças de estado são executadas; ela serve como a segunda camada ou "camada 2" para um optimistic rollup.

Como os optimistic rollups são projetados para executar programas escritos ou compilados para a EVM, a máquina virtual off-chain acaba incorporando muitas especificações de design da EVM. Além disso, as comprovações de fraude computadas on-chain permitem que o Ethereum imponha a validade das mudanças de estado computadas na máquina virtual off-chain.

Os optimistic rollups são descritos como "soluções de dimesionamento híbrido", pois ao mesmo tempo que existem como protocolos separados, as propriedades de segurança deles são derivadas do Ethereum. Entre outras coisas, o Ethereum garante a exatidão da computação off-chain de um rollup e a disponibilidade de dados por trás desta. Isso torna os optimistic rollups mais seguros do que os protocolos de dimensionamento off-chain puros (por exemplo, [sidechains](/developers/docs/scaling/sidechains/)) que não dependem do Ethereum para sua segurança.

Os optimistic rollups dependem da rede principal do Ethereum para o seguinte:

### Disponibilidade de dados {#data-availability}

Conforme mencionado, os optimistic rollups publicam dados de transações no Ethereum como `calldata` ou [blobs](/roadmap/danksharding/). Como a execução na cadeia do rollup é baseada em transações enviadas, qualquer pessoa pode usar essa informação – ancorada na camada base do Ethereum – para executar o estado do rollup e verificar a exatidão das transições de estado.

A [disponibilidade de dados](/developers/docs/data-availability/) é fundamental porque, sem acesso a dados do estado, os desafiantes não podem criar provas de fraude para disputar operações de rollup inválidas. Com o Ethereum fornecendo disponibilidade de dados, o risco de os operadores de um rollup escaparem impunes de atos maliciosos (por exemplo, enviar blocos inválidos) é reduzido.

### Resistência à censura {#censorship-resistance}

Os optimistic rollups também contam com o Ethereum para resistência à censura. Em um optimistic rollup, uma entidade centralizada (o operador) é responsável por processar transações e enviar blocos de rollup para o Ethereum. Isso tem algumas implicações:

- Os operadores de rollup podem censurar os usuários ficando completamente offline ou se recusando a produzir blocos que incluam certas transações neles.

- Os operadores de rollup podem impedir que os usuários retirem fundos depositados no contrato de rollup, através da retenção dos dados de estado necessários para provas de propriedade da Merkle. A retenção de dados de estado também pode ocultar o estado do rollup dos usuários e impedi-los de interagir com o rollup.

Os optimistic rollup resolvem esse problema forçando os operadores a publicar dados associados a atualizações de estado no Ethereum. A publicação de dados rollup on-chain (na cadeia) tem os seguintes benefícios:

- Se um operador de optimistic rollup ficar offline ou parar de produzir lotes de transações, outro nó poderá usar os dados disponíveis para reproduzir o último estado do rollup e continuar a produção de blocos.

- Os usuários podem usar os dados da transação para criar provas Merkle que comprovem a propriedade dos fundos e retirar seus ativos do rollup.

- Os usuários também podem enviar suas transações em L1 em vez de no sequenciador, neste caso, o sequenciador tem que incluir a transação dentro de um determinado limite de tempo para continuar a produzir blocos válidos.

### Liquidação {#settlement}

Outro papel que o Ethereum desempenha no contexto de optimistic rollup é o de uma camada de liquidação. Uma camada de liquidação ancora todo o ecossistema blockchain, estabelece segurança e proporciona finalidade objetiva caso ocorra uma disputa em outra cadeia (optimistic rollups neste caso) que exija arbitragem.

A rede principal do Ethereum fornece um hub para optimistic rollups, para verificar provas de fraude e resolver disputas. Além disso, as transações realizadas no rollup são apenas finais, _depois_ que o bloco de rollup é aceito no Ethereum. Uma vez que uma transação de rollup é confirmada na camada base do Ethereum, ela não pode ser revertida (exceto no caso altamente improvável de uma reorganização em cadeia).

## Como funcionam os optimistic rollups? {#how-optimistic-rollups-work}

### Execução e agregação das transações {#transaction-execution-and-aggregation}

Os usuários enviam transações para “operadores”, que são nós responsáveis pelo processamento de transações no optimistic rollup. Também conhecido como “validador” ou “agregador”, o operador agrega as transações, compacta os dados subjacentes e publica o bloco no Ethereum.

Embora qualquer pessoa possa se tornar um validador, os validadores do optimistic rollup devem fornecer um vínculo antes de produzir blocos, como um [sistema de prova de participação](/developers/docs/consensus-mechanisms/pos/). Esse vínculo pode ser compido se o validador postar um bloco inválido ou se basear em um bloco antigo, mas inválido (mesmo que seu bloco seja válido). Dessa forma, os optimistic rollups utilizam incentivos criptoeconômicos para garantir que os validadores ajam honestamente.

Espera-se que outros validadores na cadeia de optimistic rollup executem as transações enviadas usando sua cópia do estado do rollup. Se o estado final de um validador for diferente do estado proposto pelo operador, ele poderá iniciar um desafio e computar uma prova de fraude.

Alguns optimistic rollups podem renunciar a um sistema validador sem permissão e usar um único “sequenciador” para executar a cadeia. Como um validador, o sequenciador processa transações, produz blocos de rollup e envia transações de rollup para a cadeia L1 (Ethereum).

O sequenciador é diferente de um operador de rollup normal porque tem maior controle sobre a ordenação das transações. Além disso, o sequenciador tem acesso prioritário à cadeia de rollup e é a única entidade autorizada a submeter transações para o contrato on-chain. As transações de nós não sequenciadores ou usuários regulares são simplesmente enfileiradas em uma caixa de entrada separada até que o sequenciador as inclua em um novo lote.

#### Envio de blocos rollup para o Ethereum {#submitting-blocks-to-ethereum}

Como mencionado, o operador de um optimistic rollup agrupa as transações off-chain em um lote e o envia ao Ethereum para reconhecimento para notarização. Esse processo envolve compactar dados relacionados a transações e publicá-los no Ethereum como `calldata` ou em blobs.

`calldata` é uma área não modificável e não persistente em um contrato inteligente que se comporta principalmente como [memória](/developers/docs/smart-contracts/anatomy/#memory). Enquanto `calldata` persiste na cadeia como parte do [histórico de logs](https://docs.soliditylang.org/en/latest/introduction-to-smart-contracts.html?highlight=memory#logs), ele não é armazenado como parte do estado do Ethereum. Como `calldata` não afeta nenhuma parte do estado do Ethereum, é mais barato do que o estado para armazenar dados na cadeia.

A palavra-chave `calldata` também é usada no Solidity para passar argumentos para uma função de contrato inteligente em tempo de execução. `calldata` identifica a função que está sendo chamada durante uma transação e mantém as entradas para a função na forma de uma sequência arbitrária de bytes.

No contexto de optimistic rollups, `calldata` é usado para enviar dados de transação compactados para o contrato on-chain. O operador de rollup adiciona um novo lote chamando a função necessária no contrato de rollup e passando os dados compactados como argumentos de função. O uso de `calldata` reduz as taxas do usuário, pois a maioria dos custos incorridos pelos rollups vem do armazenamento de dados on-chain.

Aqui está um [um exemplo](https://etherscan.io/tx/0x9102bfce17c58b5fc1c974c24b6bb7a924fb5fbd7c4cd2f675911c27422a5591) de um envio de rollup em lote para mostrar como esse conceito funciona. O sequenciador invocou o método `appendSequencerBatch()` e passou os dados da transação compactados como entradas usando `calldata`.

Alguns rollups agora usam blobs para postar lotes de transações no Ethereum.

Os blobs não são modificáveis ​​nem persistentes (assim como `calldata`), mas são removidos do histórico depois de 18 dias, aproximadamente. Para mais informações sobre blobs, consulte [Danksharding](/roadmap/danksharding).

### Compromissos com o estado {#state-commitments}

A qualquer momento, o estado do optimistic rollup (contas, saldos, código de contrato etc.) é organizado como uma [árvore Merkle](/whitepaper/#merkle-trees), chamada de "árvore de estado". A raiz dessa árvore Merkle (raiz do estado), que faz referência ao estado mais recente do rollup, é criptografada e armazenada no contrato rollup. Cada transição de estado na cadeia produz um novo estado de rollup, ao qual um operador se compromete calculando uma nova raiz de estado.

O operador é obrigado a enviar ambas as raízes de estado, antigas e novas, ao publicar lotes. Se a raiz do estado antigo corresponder à raiz do estado existente no contrato on-chain, o último será descartado e substituído pela nova raiz do estado.

O operador de rollup também precisa confirmar uma raiz Merkle para o próprio lote de transações. Isso permite que qualquer pessoa comprove a inclusão de uma transação no lote (em L1) apresentando uma [prova Merkle](/developers/tutorials/merkle-proofs-for-offline-data-integrity/).

Os compromissos de estado, especialmente raízes de estado, são necessários para provar a correção das mudanças de estado em um optimistic rollup. O contrato de rollup aceita novas raízes de estado de operadores imediatamente após serem publicadas, mas pode posteriormente excluir raízes de estado inválidas para restaurar o rollup ao seu estado correto.

### Prova de fraude {#fraud-proving}

Conforme explicado, os optimistic rollups permitem que qualquer pessoa publique blocos sem fornecer provas de validade. No entanto, para garantir que a cadeia permaneça segura, os optimistic rollups especificam uma janela de tempo durante a qual qualquer pessoa pode contestar uma transição de estado. Portanto, os blocos de rollup são chamados de “asserções”, pois qualquer pessoa pode contestar sua validade.

Se alguém contestar uma asserção, o protocolo de rollup iniciará o cálculo da prova de fraude. Todo tipo de prova de fraude é interativo – alguém deve publicar uma asserção antes que outra pessoa possa contestá-la. A diferença está em quantas rodadas de interação são necessárias para calcular a prova de fraude.

Os esquemas de prova interativa de rodada única refazem as transações disputadas na L1 para detectar asserções inválidas. O protocolo de rollup emula a reexecução da transação contestada na L1 (Ethereum) usando um contrato verificador, com a raiz do estado computada determinando quem vence o desafio. Se a alegação do desafiante sobre o estado correto do rollup estiver correto, o operador será penalizado ao ter seu vínculo cortado.

No entanto, a reexecução de transações na L1 para detectar fraudes requer a publicação de compromissos de estado para transações individuais e aumenta os rollups de dados que devem ser publicados on-chain. Refazer transações também implica custos de gás significativos. Por esses motivos, os optimistic rollups estão mudando para a prova interativa de múltiplas rodadas, que atinge o mesmo objetivo (ou seja, detectar operações de rollup inválidas) com mais eficiência.

#### Prova interativa de múltiplas rodadas {#multi-round-interactive-proving}

A prova interativa de múltiplas rodadas envolve um protocolo de vaivém entre o declarante e o desafiante supervisionado por um contrato de verificador L1, que finalmente decide a parte em questão. Depois que um nó L2 desafia uma asserção, o declarante é obrigado a dividir a asserção contestada em duas metades iguais. Cada asserção individual neste caso conterá tantos passos de computação quanto a outra.

O desafiante escolherá então qual afirmação quer desafiar. O processo de divisão (chamado de “protocolo de bisseção”) continua até que ambas as partes estejam disputando uma asserção sobre uma _única_ etapa de execução. Nesse ponto, o contrato L1 resolverá a disputa avaliando a instrução (e seu resultado) para capturar a parte fraudulenta.

O declarante é obrigado a fornecer uma "prova em uma etapa" verificando a validade do cálculo contestado de uma única etapa. Se o declarante falhar em fornecer a prova de uma etapa, ou o verificador L1 considerar a prova inválida, eles perderão o desafio.

Algumas observações sobre este tipo de prova de fraude:

1. A prova de fraude interativa de múltiplas rodadas é considerada eficiente porque minimiza o trabalho que a cadeia L1 deve fazer na arbitragem de conflitos. Em vez de repetir a transação inteira, a cadeia L1 só precisa reexecutar uma etapa na execução dos rollups.

2. Os protocolos de bisseção reduzem a quantidade de dados postados on-chain (não há necessidade de publicar commits de estado para cada transação). Além disso, as transações de optimistic rollup não são restringidas pelo limite de gás do Ethereum. Por outro lado, os optimistic rollups reexecutando transações devem garantir que uma transação L2 tenha um limite de gás mais baixo para emular sua execução dentro de uma única transação Ethereum.

3. Parte do vínculo malicioso do declarante é atribuída ao desafiante, enquanto a outra parte é queimada. A queima evita a colisão entre validadores; se dois validadores conspirarem para iniciar desafios falsos, eles ainda perderão uma parte considerável de toda a participação (stake).

4. A prova interativa de múltiplas rodadas exige que ambas as partes (o declarante e o desafiante) façam movimentos dentro da janela de tempo especificada. Não agir antes que o prazo expire faz com que a parte inadimplente perca o desafio.

#### Por que as provas de fraude são importantes para os optimistic rollups {#fraud-proof-benefits}

As provas de fraude são importantes porque elas facilitam a _finalidade sem confiança_ em optimistic rollups. A finalidade sem confiança é uma qualidade dos optimistic rollups que garante que uma transação – desde que seja válida – será eventualmente confirmada.

Nós maliciosos podem tentar atrasar a confirmação de um bloco de rollup válido iniciando desafios falsos. No entanto, as provas de fraude eventualmente provarão a validade do bloco de rollup e fazer com que ele seja confirmado.

Isso também está relacionado a outra propriedade de segurança dos optimistic rollups: a validade da cadeia depende da existência de _um_ nó honesto. O nó honesto pode avançar na cadeia corretamente publicando asserções válidas ou disputando asserções inválidas. Seja qual for o caso, os nós maliciosos que entram em conflito com o nó honesto perderão suas participações (stakes) durante o processo de comprovação de fraude.

### Interoperabilidade L1/L2 {#l1-l2-interoperability}

Os optimistic rollups são projetados para interoperabilidade com a rede principal do Ethereum e permitem que os usuários passem mensagens e dados arbitrários entre as camadas L1 e L2. Eles também são compatíveis com o EVM, então você pode portar [dapps](/developers/docs/dapps/) existentes para optimistic rollups ou criar novos dapps usando ferramentas de desenvolvimento Ethereum.

#### 1. Movimento de Ativos {#asset-movement}

##### Entrar no rollup

Para usar um optimistic rollup, os usuários depositam ETH, tokens ERC-20 e outros ativos aceitos no contrato [ponte](/developers/docs/bridges/) do rollup em L1. O contrato-ponte retransmitirá a transação para L2, onde uma quantidade equivalente de ativos é cunhada e enviada para o endereço escolhido pelo usuário no optimistic rollup.

As transações geradas pelo usuário (como um depósito L1 > L2) são geralmente enfileiradas até que o sequenciador as reenvie ao contrato de rollup. No entanto, para preservar a resistência à censura, os optimistic rollups permitem que os usuários enviem uma transação diretamente ao contrato de rollup on-chain, se ela tiver sido atrasada além do tempo máximo permitido.

Alguns optimistic rollups adotam uma abordagem mais direta para evitar que os sequenciadores censurem os usuários. Aqui, um bloco é definido por todas as transações submetidas ao contrato L1 desde o bloco anterior (por exemplo, depósitos) além das transações processadas na cadeia de rollup. Se um sequenciador ignorar uma transação L1, ele publicará a raiz de estado errada (provavelmente); portanto, os sequenciadores não podem atrasar mensagens geradas pelo usuário uma vez publicadas na L1.

##### Sair do rollup

Sair de um optimistic rollup para o Ethereum é mais difícil devido ao esquema de provação de fraude. Se um usuário iniciar uma transação L2 > L1 para sacar fundos depositados em L1, eles deverão esperar até que o período de desafio – com duração de aproximadamente sete dias – termine. No entanto, o processo de retirada em si é bastante simples.

Depois que o pedido de retirada é iniciado no rollup L2, a transação é incluída no próximo lote, enquanto os ativos do usuário no rollup são queimados. Uma vez que o lote é publicado no Ethereum, o usuário pode computar uma prova Merkle verificando a inclusão de sua transação de saída no bloco. Então, trata-se de esperar o período de atraso para finalizar a transação na L1 e retirar fundos para a rede principal.

Para evitar esperar uma semana antes de retirar fundos para o Ethereum, os usuários de optimistic rollups podem empregar um **provedor de liquidez** (LP). Um provedor de liquidez assume a propriedade de uma retirada na L2 pendente e paga ao usuário na L1 (em troca de uma taxa).

Os provedores de liquidez podem verificar a validade do pedido de retirada do usuário (executando a própria cadeia) antes de liberar fundos. Dessa forma, eles têm garantias de que a transação será confirmada eventualmente (ou seja, finalidade sem confiança).

#### 2. Compatibilidade EVM {#evm-compatibility}

Para os desenvolvedores, a vantagem dos optimistic rollups é sua compatibilidade — ou, melhor ainda, equivalência — com a [Máquina Virtual Ethereum (do inglês, Ethereum Virtual Machine, EVM)](/developers/docs/evm/). Os rollups compatíveis com a EVM cumprem as especificações do [Ethereum Yellow Paper](https://ethereum.github.io/yellowpaper/paper.pdf) e suportam a EVM no nível de bytecode.

A compatibilidade com EVM em optimistic rollups tem os seguintes benefícios:

i. Os desenvolvedores podem migrar contratos inteligentes existentes no Ethereum para cadeias de optimistic rollups sem precisar modificar extensivamente as bases de código. Isso pode economizar tempo das equipes de desenvolvimento ao implantar contratos inteligentes Ethereum na L2.

ii. Desenvolvedores e equipes de projeto que usam optimistic rollups podem aproveitar a infraestrutura do Ethereum. Isso inclui linguagens de programação, bibliotecas de código, ferramentas de teste, software cliente, infraestrutura de implantação e assim por diante.

O uso de ferramentas existentes é importante porque essas ferramentas foram amplamente auditadas, depuradas e melhoradas ao longo dos anos. Também elimina a necessidade de desenvolvedores Ethereum aprenderem a construir com uma pilha de desenvolvimento totalmente nova.

#### 3. Chamadas de contrato de cadeia cruzada {#cross-chain-contract-calls}

Usuários (contas de propriedade externa, da sigla EOA) interagem com contratos L2 enviando uma transação ao contrato de rollup ou fazendo com que um sequenciador ou validador faça isso por eles. Os optimistic rollups também permitem que contas de contrato Ethereum interajam com contratos L2 usando contratos de ponte para retransmitir mensagens e passar dados entre L1 e L2. Isso significa que você pode programar um contrato L1 na rede principal do Ethereum para invocar funções pertencentes a contratos em um optimistic rollup de L2.

As chamadas de contrato de cadeia cruzada acontecem de forma assíncrona, o que significa que a chamada é iniciada primeiro, e então executada posteriormente. Isso é diferente das chamadas entre os dois contratos no Ethereum, onde a chamada produz resultados imediatamente.

Um exemplo de uma chamada de contrato de cadeia cruzada é o depósito de token descrito anteriormente. Um contrato em L1 deposita em caução os tokens do usuário e envia uma mensagem para um contrato L2 emparelhado para cunhar uma quantidade igual de tokens no rollup.

Como as chamadas de mensagens de cadeia cruzada resultam na execução do contrato, o remetente geralmente é obrigado a cobrir [custos de gás](/developers/docs/gas/) para computação. É aconselhável definir um limite de gás alto para evitar que a transação falhe na cadeia de destino. O cenário de ponte de token é um bom exemplo; se o lado L1 da transação (depositando os tokens) funcionar, mas o lado L2 (cunhando novos tokens) falhar devido ao baixo gás, o depósito se tornará irrecuperável.

Finalmente, devemos observar que as chamadas de mensagens L2 > L1 entre contratos precisam considerar os atrasos (chamadas L1 > L2 são normalmente executadas após alguns minutos). Isso ocorre porque as mensagens enviadas para a rede principal a partir do optimistic rollup não podem ser executadas até que a janela de desafio expire.

## Como funcionam as taxas de optimistic rollups? {#how-do-optimistic-rollup-fees-work}

Os optimistic rollups usam um esquema de taxa de gás, muito parecido com o Ethereum, para denotar quanto os usuários pagam por transação. As taxas cobradas em optimistic rollups dependem dos seguintes componentes:

1. **Gravação de estado**: os optimistic rollups publicam dados de transações e cabeçalhos de bloco (consistindo no hash do cabeçalho do bloco anterior, raiz de estado, raiz de lote) no Ethereum como um `blob` ou "objeto binário grande". [EIP-4844](https://eips.ethereum.org/EIPS/eip-4844) apresentou uma solução econômica para incluir dados na cadeia. Um `blob` é um novo campo de transação que permite que rollups publiquem dados de transição de estado compactados no Ethereum L1. Ao contrário de `calldata`, que ficam permanentemente na cadeia, os blobs têm vida curta e podem ser removidos dos clientes após [4.096 épocas](https://github.com/ethereum/consensus-specs/blob/81f3ea8322aff6b9fb15132d050f8f98b16bdba4/configs/mainnet.yaml#L147) (aproximadamente 18 dias). Ao usar blobs para postar lotes de transações compactadas, os optimistic rollups podem reduzir significativamente o custo de gravação de transações na L1.

2. **Gás de blob usado**: transações que transportam blob empregam um mecanismo de taxa dinâmico semelhante ao introduzido pelo [EIP-1559](https://eips.ethereum.org/EIPS/eip-1559). A taxa de gás para transações do tipo 3 leva em consideração a taxa base para blobs, que é determinada pela rede com base na demanda de espaço de blobs e no uso de espaço de blobs da transação que está sendo enviada.

3. **Taxas do operador L2**: Este é o valor pago aos nódulos de rollup como compensação pelos custos computacionais decorrentes do processamento de transações, muito parecido com as taxas de Gas no Ethereum. Os nódulos de rollup cobram taxas de transação mais baixas, já que as L2s têm capacidades de processamento mais altas e não enfrentam os congestionamentos de rede, que forçam os validadores no Ethereum a priorizar transações com taxas mais altas.

Os optimistic rollups aplicam vários mecanismos para reduzir as taxas para os usuários, incluindo transações em lote e compactando `calldata` para reduzir os custos de publicação de dados. Você pode verificar o [rastreador de taxas L2](https://l2fees.info/), para ter uma ideia geral real do custo de uso de optimistic rollups baseados em Ethereum.

## Como os optimistic rollups dimensionam o Ethereum? {#scaling-ethereum-with-optimistic-rollups}

Conforme explicado, os optimistic rollups publicam dados de transações compactados no Ethereum para garantir a disponibilidade dos dados. A capacidade de compactar dados publicados on-chain é crucial para dimensionar a taxa de transferência no Ethereum com optimistic rollups.

A cadeia principal da Ethereum coloca limites sobre quantos blocos de dados podem conter, denominados em unidades de gás (o [tamanho médio do bloco](/developers/docs/blocks/#block-size) é de 15 milhões de gás). Embora isso restrinja quanto gás cada transação pode usar, também significa que podemos aumentar as transações processadas por bloco reduzindo os dados relacionados à transação, melhorando diretamenteo dimensionamento.

Os optimistic rollups usam várias técnicas para obter a compressão de dados de transação e melhorar as taxas de TPS. Por exemplo, este [artigo](https://vitalik.eth.limo/general/2021/01/05/rollup.html) compara os dados que uma transação básica do usuário (enviando ether) gera na rede principal com a quantidade de dados que a mesma transação gera em um rollup:

| Parâmetro  | Ethereum (L1)                | Rollup (L2)   |
| ---------- | ---------------------------- | ------------- |
| Nonce      | ~3                           | 0             |
| Gasprice   | ~8                           | 0-0.5         |
| Gás        | 3                            | 0-0.5         |
| Para       | 21                           | 4             |
| Valores    | 9                            | ~3            |
| Assinatura | ~68 (2 + 33 + 33)            | ~0.5          |
| De         | 0 (recuperado da assinatura) | 4             |
| **Total**  | **~112 bytes**               | **~12 bytes** |

Fazer alguns cálculos aproximados sobre esses números pode ajudar a mostrar as melhorias de dimensionamento oferecidas por um optimistic rollup:

1. O tamanho-alvo para cada bloco é de 15 milhões de gás e custa 16 gás para verificar um byte de dados. Dividir o tamanho médio do bloco por 16 gás (15.000.000/16) mostra que o bloco médio pode conter **937.500 bytes de dados**.
2. Se uma transação de rollup básica usa 12 bytes, o bloco Ethereum médio pode processar **78.125 transações de rollup** (937.5000/12) ou **39 lotes de rollup** (se cada lote possuir uma média de 2.000 transações).
3. Se um novo bloco for produzido no Ethereum a cada 15 segundos, as velocidades de processamento do rollup serão de aproximadamente **5.208 transações por segundo**. Isso é feito dividindo o número de transações de rollup básicas que um bloco Ethereum pode manter, (**78.125**) pelo tempo médio de bloqueio (**15 segundos**).

Esta é uma estimativa bastante otimista, uma vez que as transações de optimistic rollups não podem abranger um bloco inteiro no Ethereum. No entanto, pode dar uma ideia aproximada de quantos ganhos de dimensionamento os optimistic rollups podem proporcionar aos usuários do Ethereum (as implementações atuais oferecem até 2.000 TPS).

Espera-se que a introdução de [fragmentação (sharding) de dados](/roadmap/danksharding/) no Ethereum melhore o dimensionamento do rollup otimista. Como as transações de rollup devem compartilhar o espaço de blocos (blockspace) com outras transações não-rollup, sua capacidade de processamento é limitada pela taxa de transferência de dados na cadeia principal do Ethereum. Danksharding aumentará o espaço disponível para que cadeias L2 publiquem dados por bloco, usando armazenamento de “blob” impermanente e mais barato em vez de `CALLDATA`, que é permanente e caro.

### Prós e contras dos optimistic rollups {#optimistic-rollups-pros-and-cons}

| Prós                                                                                                                                                                                   | Contras                                                                                                                                                              |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Oferece grandes melhorias de dimensionamento sem sacrificar a segurança ou a falta de confiança.                                                                                       | Atrasos na finalização da transação devido a potenciais desafios de fraude.                                                                                          |
| Os dados da transação são armazenados na cadeia da camada 1, melhorando a transparência, segurança, resistência à censura e descentralização.                                          | Operadores de rollup centralizados (sequenciadores) podem influenciar a ordenação de transações.                                                                     |
| A comprovação de fraude garante uma finalidade sem confiança e permite que minorias honestas protejam a cadeia.                                                                        | Se não houver nós honestos, um operador malicioso poderá roubar fundos publicando blocos inválidos e compromissos de estado.                                         |
| A computação de provas de fraude está aberta ao nó L2 regular, ao contrário das provas de validade (usadas em ZK-rollups) que requerem hardware especial.                              | O modelo de segurança depende de pelo menos um nó honesto executando transações de rollup e enviando provas de fraude, para desafiar transições de estado inválidas. |
| Os rollups se beneficiam da "vida sem confiança" (qualquer um pode forçar a cadeia a avançar executando transações e publicando declarações)                                           | Os usuários devem esperar que o período de desafio de uma semana expire antes de retirar os fundos de volta para o Ethereum.                                         |
| Os optimistic rollups dependem de incentivos criptoeconômicos bem projetados para aumentar a segurança na cadeia.                                                                      | Os rollups devem publicar todos os dados da transação on-chain, o que pode aumentar os custos.                                                                       |
| A compatibilidade com EVM e Solidity permite aos desenvolvedores portar contratos inteligentes nativos do Ethereum para rollups ou usar ferramentas existentes para criar novos dapps. |                                                                                                                                                                      |

### Uma explicação visual de optimistic rollups {#optimistic-video}

Você é o tipo de pessoa que aprende mais com recursos visuais? Assista aos Finematics explicando os optimistic rollups:

<YouTube id="7pWxCklcNsU" start="263" />

## Leitura adicional sobre optimistic rollups

- [Como funcionam os optimistic rollups (o guia completo)](https://www.alchemy.com/overviews/optimistic-rollups)
- [O que é uma Blockchain Rollup? Uma introdução técnica](https://www.ethereum-ecosystem.com/blog/what-is-a-blockchain-rollup-a-technical-introduction)
- [O guia essencial do Arbitrum](https://newsletter.banklesshq.com/p/the-essential-guide-to-arbitrum)
- [Como o optimistic rollup realmente funciona?](https://www.paradigm.xyz/2021/01/how-does-optimisms-rollup-really-work)
- [OVM: aprofundamento](https://medium.com/ethereum-optimism/ovm-deep-dive-a300d1085f52)
- [O que é a máquina virtual otimista?](https://www.alchemy.com/overviews/optimistic-virtual-machine)
