---
title: Rollups Otimistas
description: Uma introdução aos rollups otimistas — uma solução de escalabilidade usada pela comunidade Ethereum.
lang: pt-br
---

Os rollups otimistas são protocolos de camada 2 (l2) projetados para estender a vazão da camada base do Ethereum. Eles reduzem a computação na cadeia principal do [Ethereum](/) processando transações offchain, oferecendo melhorias significativas nas velocidades de processamento. Diferente de outras soluções de escalabilidade, como [sidechains](/developers/docs/scaling/sidechains/), os rollups otimistas derivam a segurança da Mainnet publicando os resultados das transações onchain, ou cadeias [Plasma](/developers/docs/scaling/plasma/), que também verificam transações no Ethereum com provas de fraude, mas armazenam dados de transações em outro lugar.

Como a computação é a parte lenta e cara do uso do Ethereum, os rollups otimistas podem oferecer melhorias de 10 a 100 vezes na escalabilidade. Os rollups otimistas também gravam transações no Ethereum como `calldata` ou em [blobs](/roadmap/danksharding/), reduzindo os custos de gas para os usuários.

## Pré-requisitos {#prerequisites}

Você deve ter lido e compreendido nossas páginas sobre [escalabilidade do Ethereum](/developers/docs/scaling/) e [camada 2](/layer-2/).

## O que é um rollup otimista? {#what-is-an-optimistic-rollup}

Um rollup otimista é uma abordagem para escalar o Ethereum que envolve mover a computação e o armazenamento de estado offchain. Os rollups otimistas executam transações fora do Ethereum, mas publicam dados de transações na Mainnet como `calldata` ou em [blobs](/roadmap/danksharding/).

Os operadores de rollups otimistas agrupam várias transações offchain em grandes lotes antes de enviá-las ao Ethereum. Essa abordagem permite distribuir custos fixos entre várias transações em cada lote, reduzindo as taxas para os usuários finais. Os rollups otimistas também usam técnicas de compressão para reduzir a quantidade de dados publicados no Ethereum.

Os rollups otimistas são considerados “otimistas” porque assumem que as transações offchain são válidas e não publicam provas de validade para lotes de transações publicados onchain. Isso separa os rollups otimistas dos [rollups de conhecimento zero](/developers/docs/scaling/zk-rollups) que publicam [provas de validade](/glossary/#validity-proof) criptográficas para transações offchain.

Em vez disso, os rollups otimistas dependem de um esquema de prova de fraude para detectar casos em que as transações não são calculadas corretamente. Após um lote de rollup ser enviado no Ethereum, há uma janela de tempo (chamada de período de desafio) durante a qual qualquer pessoa pode contestar os resultados de uma transação de rollup calculando uma [prova de fraude](/glossary/#fraud-proof).

Se a prova de fraude for bem-sucedida, o protocolo de rollup reexecuta a(s) transação(ões) e atualiza o estado do rollup de acordo. O outro efeito de uma prova de fraude bem-sucedida é que o sequenciador responsável por incluir a transação executada incorretamente em um bloco recebe uma penalização.

Se o lote de rollup permanecer incontestado (ou seja, todas as transações forem executadas corretamente) após o término do período de desafio, ele será considerado válido e aceito no Ethereum. Outros podem continuar a construir sobre um bloco de rollup não confirmado, mas com uma ressalva: os resultados da transação serão revertidos se baseados em uma transação executada incorretamente publicada anteriormente.

## Como os rollups otimistas interagem com o Ethereum? {#optimistic-rollups-and-ethereum}

Os rollups otimistas são [soluções de escalabilidade offchain](/developers/docs/scaling/#offchain-scaling) construídas para operar sobre o Ethereum. Cada rollup otimista é gerenciado por um conjunto de contratos inteligentes implantados na rede Ethereum. Os rollups otimistas processam transações fora da cadeia principal do Ethereum, mas publicam transações offchain (em lotes) em um contrato de rollup onchain. Assim como a blockchain do Ethereum, esse registro de transações é imutável e forma a "cadeia de rollup otimista".

A arquitetura de um rollup otimista compreende as seguintes partes:

**Contratos onchain**: A operação do rollup otimista é controlada por contratos inteligentes executados no Ethereum. Isso inclui contratos que armazenam blocos de rollup, monitoram atualizações de estado no rollup e rastreiam depósitos de usuários. Nesse sentido, o Ethereum serve como a camada base ou "camada 1" para rollups otimistas.

**Máquina virtual (VM) offchain**: Embora os contratos que gerenciam o protocolo de rollup otimista sejam executados no Ethereum, o protocolo de rollup realiza a computação e o armazenamento de estado em outra máquina virtual separada da [Ethereum Virtual Machine](/developers/docs/evm/). A VM offchain é onde os aplicativos residem e as mudanças de estado são executadas; ela serve como a camada superior ou "camada 2" para um rollup otimista.

Como os rollups otimistas são projetados para executar programas escritos ou compilados para a EVM, a VM offchain incorpora muitas especificações de design da EVM. Além disso, as provas de fraude calculadas onchain permitem que a rede Ethereum imponha a validade das mudanças de estado calculadas na VM offchain.

Os rollups otimistas são descritos como 'soluções de escalabilidade híbridas' porque, embora existam como protocolos separados, suas propriedades de segurança são derivadas do Ethereum. Entre outras coisas, o Ethereum garante a correção da computação offchain de um rollup e a disponibilidade de dados por trás da computação. Isso torna os rollups otimistas mais seguros do que os protocolos de escalabilidade puramente offchain (por exemplo, [sidechains](/developers/docs/scaling/sidechains/)) que não dependem do Ethereum para segurança.

Os rollups otimistas dependem do protocolo principal do Ethereum para o seguinte:

### Disponibilidade de dados {#data-availability}

Como mencionado, os rollups otimistas publicam dados de transações no Ethereum como `calldata` ou [blobs](/roadmap/danksharding/). Como a execução da cadeia de rollup é baseada em transações enviadas, qualquer pessoa pode usar essas informações — ancoradas na camada base do Ethereum — para executar o estado do rollup e verificar a correção das transições de estado.

A [disponibilidade de dados](/developers/docs/data-availability/) é crítica porque, sem acesso aos dados de estado, os desafiantes não podem construir provas de fraude para contestar operações de rollup inválidas. Com o Ethereum fornecendo disponibilidade de dados, o risco de operadores de rollup saírem impunes de atos maliciosos (por exemplo, enviar blocos inválidos) é reduzido.

### Resistência à censura {#censorship-resistance}

Os rollups otimistas também dependem do Ethereum para resistência à censura. Em um rollup otimista, uma entidade centralizada (o operador) é responsável por processar transações e enviar blocos de rollup ao Ethereum. Isso tem algumas implicações:

- Os operadores de rollup podem censurar usuários ficando totalmente offline ou recusando-se a produzir blocos que incluam certas transações neles.

- Os operadores de rollup podem impedir que os usuários saquem fundos depositados no contrato de rollup retendo dados de estado necessários para provas de Merkle de propriedade. A retenção de dados de estado também pode ocultar o estado do rollup dos usuários e impedi-los de interagir com o rollup.

Os rollups otimistas resolvem esse problema forçando os operadores a publicar dados associados a atualizações de estado no Ethereum. A publicação de dados de rollup onchain tem os seguintes benefícios:

- Se um operador de rollup otimista ficar offline ou parar de produzir lotes de transações, outro nó pode usar os dados disponíveis para reproduzir o último estado do rollup e continuar a produção de blocos.

- Os usuários podem usar dados de transações para criar provas de Merkle comprovando a propriedade de fundos e sacar seus ativos do rollup.

- Os usuários também podem enviar suas transações na l1 em vez de para o sequenciador, caso em que o sequenciador deve incluir a transação dentro de um determinado limite de tempo para continuar a produzir blocos válidos.

### Liquidação {#settlement}

Outro papel que o Ethereum desempenha no contexto de rollups otimistas é o de uma camada de liquidação. Uma camada de liquidação ancora todo o ecossistema blockchain, estabelece segurança e fornece finalidade objetiva se ocorrer uma disputa em outra cadeia (rollups otimistas, neste caso) que exija arbitragem.

A Rede Principal do Ethereum fornece um hub para rollups otimistas verificarem provas de fraude e resolverem disputas. Além disso, as transações conduzidas no rollup só têm finalidade _após_ o bloco de rollup ser aceito no Ethereum. Uma vez que uma transação de rollup é confirmada na camada base do Ethereum, ela não pode ser revertida (exceto no caso altamente improvável de uma reorg da cadeia).

## Como funcionam os rollups otimistas? {#how-optimistic-rollups-work}

### Execução e agregação de transações {#transaction-execution-and-aggregation}

Os usuários enviam transações para “operadores”, que são nós responsáveis por processar transações no rollup otimista. Também conhecido como “validador” ou “agregador”, o operador agrega transações, comprime os dados subjacentes e publica o bloco no Ethereum.

Embora qualquer pessoa possa se tornar um validador, os validadores de rollup otimista devem fornecer uma garantia antes de produzir blocos, muito parecido com um [sistema de Prova de Participação (PoS)](/developers/docs/consensus-mechanisms/pos/). Essa garantia pode sofrer penalização se o validador publicar um bloco inválido ou construir sobre um bloco antigo, mas inválido (mesmo que seu bloco seja válido). Dessa forma, os rollups otimistas utilizam incentivos criptoeconômicos para garantir que os validadores ajam honestamente.

Espera-se que outros validadores na cadeia de rollup otimista executem as transações enviadas usando sua cópia do estado do rollup. Se o estado final de um validador for diferente do estado proposto pelo operador, ele pode iniciar um desafio e calcular uma prova de fraude.

Alguns rollups otimistas podem abrir mão de um sistema de validador não permissionado e usar um único “sequenciador” para executar a cadeia. Como um validador, o sequenciador processa transações, produz blocos de rollup e envia transações de rollup para a cadeia l1 (Ethereum).

O sequenciador é diferente de um operador de rollup regular porque tem maior controle sobre a ordenação das transações. Além disso, o sequenciador tem acesso prioritário à cadeia de rollup e é a única entidade autorizada a enviar transações para o contrato onchain. Transações de nós não sequenciadores ou usuários regulares são simplesmente enfileiradas em uma caixa de entrada separada até que o sequenciador as inclua em um novo lote.

#### Enviando blocos de rollup ao Ethereum {#submitting-blocks-to-ethereum}

Como mencionado, o operador de um rollup otimista agrupa transações offchain em um lote e o envia ao Ethereum para notarização. Esse processo envolve a compressão de dados relacionados a transações e sua publicação no Ethereum como `calldata` ou em blobs.

`calldata` é uma área não modificável e não persistente em um contrato inteligente que se comporta principalmente como [memória](/developers/docs/smart-contracts/anatomy/#memory). Embora `calldata` persista onchain como parte dos [logs de histórico](https://docs.soliditylang.org/en/latest/introduction-to-smart-contracts.html?highlight=memory#logs) da blockchain, ele não é armazenado como parte do estado do Ethereum. Como `calldata` não toca em nenhuma parte do estado do Ethereum, é mais barato do que o estado para armazenar dados onchain.

A palavra-chave `calldata` também é usada em Solidity para passar argumentos para uma função de contrato inteligente no momento da execução. `calldata` identifica a função sendo chamada durante uma transação e mantém as entradas para a função na forma de uma sequência arbitrária de bytes.

No contexto de rollups otimistas, `calldata` é usado para enviar dados de transação comprimidos para o contrato onchain. O operador de rollup adiciona um novo lote chamando a função necessária no contrato de rollup e passando os dados comprimidos como argumentos da função. O uso de `calldata` reduz as taxas do usuário, pois a maioria dos custos que os rollups incorrem vem do armazenamento de dados onchain.

Aqui está [um exemplo](https://eth.blockscout.com/tx/0x9102bfce17c58b5fc1c974c24b6bb7a924fb5fbd7c4cd2f675911c27422a5591) de um envio de lote de rollup para mostrar como esse conceito funciona. O sequenciador invocou o método `appendSequencerBatch()` e passou os dados de transação comprimidos como entradas usando `calldata`.

Alguns rollups agora usam blobs para publicar lotes de transações no Ethereum.

Blobs são não modificáveis e não persistentes (assim como `calldata`), mas são podados do histórico após ~18 dias. Para mais informações sobre blobs, consulte [danksharding](/roadmap/danksharding).

### Compromissos de estado {#state-commitments}

A qualquer momento, o estado do rollup otimista (contas, saldos, código de contrato, etc.) é organizado como uma [árvore de Merkle](/whitepaper/#merkle-trees) chamada de “árvore de estado”. A raiz dessa árvore de Merkle (raiz de estado), que faz referência ao estado mais recente do rollup, é submetida a hash e armazenada no contrato de rollup. Cada transição de estado na cadeia produz um novo estado de rollup, com o qual um operador se compromete calculando uma nova raiz de estado.

O operador é obrigado a enviar tanto as raízes de estado antigas quanto as novas raízes de estado ao publicar lotes. Se a raiz de estado antiga corresponder à raiz de estado existente no contrato onchain, esta última é descartada e substituída pela nova raiz de estado.

O operador de rollup também é obrigado a confirmar uma raiz de Merkle para o próprio lote de transações. Isso permite que qualquer pessoa prove a inclusão de uma transação no lote (na l1) apresentando uma [prova de Merkle](/developers/tutorials/merkle-proofs-for-offline-data-integrity/).

Os compromissos de estado, especialmente as raízes de estado, são necessários para provar a correção das mudanças de estado em um rollup otimista. O contrato de rollup aceita novas raízes de estado dos operadores imediatamente após serem publicadas, mas pode posteriormente excluir raízes de estado inválidas para restaurar o rollup ao seu estado correto.

### Prova de fraude {#fraud-proving}

Como explicado, os rollups otimistas permitem que qualquer pessoa publique blocos sem fornecer provas de validade. No entanto, para garantir que a cadeia permaneça segura, os rollups otimistas especificam uma janela de tempo durante a qual qualquer pessoa pode contestar uma transição de estado. Portanto, os blocos de rollup são chamados de “afirmações”, pois qualquer pessoa pode contestar sua validade.

Se alguém contestar uma afirmação, o protocolo de rollup iniciará o cálculo da prova de fraude. Todo tipo de prova de fraude é interativo — alguém deve publicar uma afirmação antes que outra pessoa possa contestá-la. A diferença reside em quantas rodadas de interação são necessárias para calcular a prova de fraude.

Esquemas de prova interativa de rodada única reproduzem transações contestadas na l1 para detectar afirmações inválidas. O protocolo de rollup emula a reexecução da transação contestada na l1 (Ethereum) usando um contrato verificador, com a raiz de estado calculada determinando quem vence o desafio. Se a reivindicação do desafiante sobre o estado correto do rollup estiver correta, o operador é penalizado tendo sua garantia penalizada.

No entanto, reexecutar transações na l1 para detectar fraudes exige a publicação de compromissos de estado para transações individuais e aumenta os dados que os rollups devem publicar onchain. A reprodução de transações também incorre em custos significativos de gas. Por essas razões, os rollups otimistas estão mudando para a prova interativa de várias rodadas, que atinge o mesmo objetivo (ou seja, detectar operações de rollup inválidas) com mais eficiência.

#### Prova interativa de várias rodadas {#multi-round-interactive-proving}

A prova interativa de várias rodadas envolve um protocolo de idas e vindas entre o afirmador e o desafiante supervisionado por um contrato verificador da l1, que em última análise decide a parte mentirosa. Após um nó da l2 contestar uma afirmação, o afirmador é obrigado a dividir a afirmação contestada em duas metades iguais. Cada afirmação individual neste caso conterá tantos passos de computação quanto a outra.

O desafiante então escolherá qual afirmação deseja contestar. O processo de divisão (chamado de “protocolo de bissecção”) continua até que ambas as partes estejam contestando uma afirmação sobre um _único_ passo de execução. Neste ponto, o contrato da l1 resolverá a disputa avaliando a instrução (e seu resultado) para pegar a parte fraudulenta.

O afirmador é obrigado a fornecer uma “prova de um passo” verificando a validade da computação de passo único contestada. Se o afirmador não fornecer a prova de um passo, ou o verificador da l1 considerar a prova inválida, ele perde o desafio.

Algumas notas sobre este tipo de prova de fraude:

1. A prova de fraude interativa de várias rodadas é considerada eficiente porque minimiza o trabalho que a cadeia l1 deve fazer na arbitragem de disputas. Em vez de reproduzir a transação inteira, a cadeia l1 só precisa reexecutar um passo na execução do rollup.

2. Os protocolos de bissecção reduzem a quantidade de dados publicados onchain (não há necessidade de publicar compromissos de estado para cada transação). Além disso, as transações de rollup otimista não são restritas pelo limite de gas do Ethereum. Por outro lado, os rollups otimistas que reexecutam transações devem garantir que uma transação da l2 tenha um limite de gas menor para emular sua execução dentro de uma única transação do Ethereum.

3. Parte da garantia do afirmador malicioso é concedida ao desafiante, enquanto a outra parte é queimada. A queima evita o conluio entre validadores; se dois validadores entrarem em conluio para iniciar desafios falsos, eles ainda perderão uma parte considerável de todo o stake.

4. A prova interativa de várias rodadas exige que ambas as partes (o afirmador e o desafiante) façam movimentos dentro da janela de tempo especificada. A falha em agir antes que o prazo expire faz com que a parte inadimplente perca o desafio.

#### Por que as provas de fraude são importantes para os rollups otimistas {#fraud-proof-benefits}

As provas de fraude são importantes porque facilitam a _finalidade sem necessidade de confiança_ em rollups otimistas. A finalidade sem necessidade de confiança é uma qualidade dos rollups otimistas que garante que uma transação — desde que seja válida — será eventualmente confirmada.

Nós maliciosos podem tentar atrasar a confirmação de um bloco de rollup válido iniciando desafios falsos. No entanto, as provas de fraude eventualmente provarão a validade do bloco de rollup e farão com que ele seja confirmado.

Isso também se relaciona a outra propriedade de segurança dos rollups otimistas: a validade da cadeia depende da existência de _um_ nó honesto. O nó honesto pode avançar a cadeia corretamente publicando afirmações válidas ou contestando afirmações inválidas. Seja qual for o caso, nós maliciosos que entrarem em disputas com o nó honesto perderão seus stakes durante o processo de prova de fraude.

### Interoperabilidade l1/l2 {#l1-l2-interoperability}

Os rollups otimistas são projetados para interoperabilidade com a Rede Principal do Ethereum e permitem que os usuários passem mensagens e dados arbitrários entre a l1 e a l2. Eles também são compatíveis com a EVM, então você pode portar [dapps](/developers/docs/dapps/) existentes para rollups otimistas ou criar novos dapps usando ferramentas de desenvolvimento do Ethereum.

#### 1. Movimentação de ativos {#asset-movement}

##### Entrando no rollup {#evm-compatibility}

Para usar um rollup otimista, os usuários depositam ETH, tokens ERC-20 e outros ativos aceitos no contrato de [ponte](/developers/docs/bridges/) do rollup na l1. O contrato de ponte retransmitirá a transação para a l2, onde uma quantidade equivalente de ativos é cunhada e enviada para o endereço escolhido pelo usuário no rollup otimista.

Transações geradas pelo usuário (como um depósito l1 > l2) geralmente são enfileiradas até que o sequenciador as reenvie para o contrato de rollup. No entanto, para preservar a resistência à censura, os rollups otimistas permitem que os usuários enviem uma transação diretamente para o contrato de rollup onchain se ela tiver sido atrasada além do tempo máximo permitido.

Alguns rollups otimistas adotam uma abordagem mais direta para evitar que os sequenciadores censurem os usuários. Aqui, um bloco é definido por todas as transações enviadas ao contrato da l1 desde o bloco anterior (por exemplo, depósitos), além das transações processadas na cadeia de rollup. Se um sequenciador ignorar uma transação da l1, ele publicará a raiz de estado (comprovadamente) errada; portanto, os sequenciadores não podem atrasar mensagens geradas pelo usuário uma vez publicadas na l1.

##### Saindo do rollup {#cross-chain-contract-calls}

Sacar de um rollup otimista para o Ethereum é mais difícil devido ao esquema de prova de fraude. Se um usuário iniciar uma transação l2 > l1 para sacar fundos mantidos em garantia na l1, ele deve esperar até que o período de desafio — que dura cerca de sete dias — termine. No entanto, o processo de saque em si é bastante direto.

Após a solicitação de saque ser iniciada no rollup da l2, a transação é incluída no próximo lote, enquanto os ativos do usuário no rollup são queimados. Uma vez que o lote é publicado no Ethereum, o usuário pode calcular uma prova de Merkle verificando a inclusão de sua transação de saída no bloco. Então, é uma questão de esperar pelo período de atraso para finalizar a transação na l1 e sacar os fundos para a Mainnet.

Para evitar esperar uma semana antes de sacar fundos para o Ethereum, os usuários de rollup otimista podem empregar um **provedor de liquidez** (LP). Um provedor de liquidez assume a propriedade de um saque pendente da l2 e paga o usuário na l1 (em troca de uma taxa).

Os provedores de liquidez podem verificar a validade da solicitação de saque do usuário (executando a cadeia eles mesmos) antes de liberar os fundos. Dessa forma, eles têm garantias de que a transação será confirmada eventualmente (ou seja, finalidade sem necessidade de confiança).

#### 2. Compatibilidade com a EVM {#how-do-optimistic-rollup-fees-work}

Para os desenvolvedores, a vantagem dos rollups otimistas é sua compatibilidade — ou, melhor ainda, equivalência — com a [Ethereum Virtual Machine (EVM)](/developers/docs/evm/). Rollups compatíveis com a EVM cumprem as especificações no [yellow paper do Ethereum](https://ethereum.github.io/yellowpaper/paper.pdf) e suportam a EVM no nível do bytecode.

A compatibilidade com a EVM em rollups otimistas tem os seguintes benefícios:

i. Os desenvolvedores podem migrar contratos inteligentes existentes no Ethereum para cadeias de rollup otimista sem precisar modificar extensivamente as bases de código. Isso pode economizar tempo das equipes de desenvolvimento ao implantar contratos inteligentes do Ethereum na l2.

ii. Desenvolvedores e equipes de projeto que usam rollups otimistas podem aproveitar a infraestrutura do Ethereum. Isso inclui linguagens de programação, bibliotecas de código, ferramentas de teste, software de cliente, infraestrutura de implantação e assim por diante.

O uso de ferramentas existentes é importante porque essas ferramentas foram extensivamente auditadas, depuradas e aprimoradas ao longo dos anos. Isso também remove a necessidade de os desenvolvedores do Ethereum aprenderem a construir com uma pilha de desenvolvimento totalmente nova.

#### 3. Chamadas de contrato cross-chain {#scaling-ethereum-with-optimistic-rollups}

Usuários (contas de propriedade externa) interagem com contratos da l2 enviando uma transação para o contrato de rollup ou fazendo com que um sequenciador ou validador faça isso por eles. Os rollups otimistas também permitem que contas de contrato no Ethereum interajam com contratos da l2 usando contratos de ponte para retransmitir mensagens e passar dados entre a l1 e a l2. Isso significa que você pode programar um contrato da l1 na Rede Principal do Ethereum para invocar funções pertencentes a contratos em um rollup otimista da l2.

As chamadas de contrato cross-chain acontecem de forma assíncrona — o que significa que a chamada é iniciada primeiro e depois executada em um momento posterior. Isso é diferente das chamadas entre os dois contratos no Ethereum, onde a chamada produz resultados imediatamente.

Um exemplo de uma chamada de contrato cross-chain é o depósito de token descrito anteriormente. Um contrato na l1 mantém os tokens do usuário em garantia e envia uma mensagem para um contrato emparelhado da l2 para cunhar uma quantidade igual de tokens no rollup.

Como as chamadas de mensagem cross-chain resultam na execução do contrato, o remetente geralmente é obrigado a cobrir os [custos de gas](/developers/docs/gas/) para a computação. É aconselhável definir um limite de gas alto para evitar que a transação falhe na cadeia de destino. O cenário de ponte de tokens é um bom exemplo; se o lado l1 da transação (depositar os tokens) funcionar, mas o lado l2 (cunhar novos tokens) falhar devido a pouco gas, o depósito se torna irrecuperável.

Finalmente, devemos notar que as chamadas de mensagem l2 > l1 entre contratos precisam levar em conta os atrasos (as chamadas l1 > l2 são normalmente executadas após alguns minutos). Isso ocorre porque as mensagens enviadas para a Mainnet a partir do rollup otimista não podem ser executadas até que a janela de desafio expire.

## Como funcionam as taxas de rollup otimista? {#optimistic-rollups-pros-and-cons}

Os rollups otimistas usam um esquema de taxa de gas, muito parecido com o Ethereum, para denotar quanto os usuários pagam por transação. As taxas cobradas em rollups otimistas dependem dos seguintes componentes:

1. **Gravação de estado**: Os rollups otimistas publicam dados de transações e cabeçalhos de bloco (consistindo no hash do cabeçalho do bloco anterior, raiz de estado, raiz do lote) no Ethereum como um `blob`, ou "objeto binário grande". A [EIP-4844](https://eips.ethereum.org/EIPS/eip-4844) introduziu uma solução econômica para incluir dados onchain. Um `blob` é um novo campo de transação que permite que os rollups publiquem dados de transição de estado comprimidos na l1 do Ethereum. Diferente do `calldata`, que permanece permanentemente onchain, os blobs têm vida curta e podem ser podados dos clientes após [4096 épocas](https://github.com/ethereum/consensus-specs/blob/81f3ea8322aff6b9fb15132d050f8f98b16bdba4/configs/mainnet.yaml#L147) (aproximadamente 18 dias). Ao usar blobs para publicar lotes de transações comprimidas, os rollups otimistas podem reduzir significativamente o custo de gravar transações na l1.

2. **Gas de blob usado**: Transações que carregam blobs empregam um mecanismo de taxa dinâmica semelhante ao introduzido pela [EIP-1559](https://eips.ethereum.org/EIPS/eip-1559). A taxa de gas para transações do tipo 3 leva em consideração a taxa básica para blobs, que é determinada pela rede com base na demanda de espaço de blob e no uso de espaço de blob da transação sendo enviada.

3. **Taxas do operador da l2**: Este é o valor pago aos nós de rollup como compensação pelos custos computacionais incorridos no processamento de transações, muito parecido com as taxas de gas no Ethereum. Os nós de rollup cobram taxas de transação mais baixas, pois as l2s têm maiores capacidades de processamento e não enfrentam os congestionamentos de rede que forçam os validadores no Ethereum a priorizar transações com taxas mais altas.

Os rollups otimistas aplicam vários mecanismos para reduzir as taxas para os usuários, incluindo o processamento em lote de transações e a compressão de `calldata` para reduzir os custos de publicação de dados. Você pode verificar o [rastreador de taxas da l2](https://l2fees.info/) para uma visão geral em tempo real de quanto custa usar rollups otimistas baseados no Ethereum.

## Como os rollups otimistas escalam o Ethereum? {#optimistic-video}

Como explicado, os rollups otimistas publicam dados de transações comprimidos no Ethereum para garantir a disponibilidade de dados. A capacidade de comprimir dados publicados onchain é crucial para escalar a vazão no Ethereum com rollups otimistas.

A cadeia principal do Ethereum impõe limites sobre a quantidade de dados que os blocos podem conter, denominados em unidades de gas (o [tamanho médio do bloco](/developers/docs/blocks/#block-size) é de 15 milhões de gas). Embora isso restrinja a quantidade de gas que cada transação pode usar, também significa que podemos aumentar as transações processadas por bloco reduzindo os dados relacionados à transação — melhorando diretamente a escalabilidade.

Os rollups otimistas usam várias técnicas para alcançar a compressão de dados de transações e melhorar as taxas de TPS. Por exemplo, este [artigo](https://vitalik.eth.limo/general/2021/01/05/rollup.html) compara os dados que uma transação básica de usuário (enviar ether) gera na Mainnet versus a quantidade de dados que a mesma transação gera em um rollup:

| Parâmetro | Ethereum (l1) | Rollup (l2) |
| --------- | ---------------------- | ------------- |
| Nonce | ~3 | 0 |
| Preço do gas | ~8 | 0-0.5 |
| Gas | 3 | 0-0.5 |
| Para | 21 | 4 |
| Valor | 9 | ~3 |
| Assinatura | ~68 (2 + 33 + 33) | ~0.5 |
| De | 0 (recuperado da assinatura) | 4 |
| **Total** | **~112 bytes** | **~12 bytes** |

Fazer alguns cálculos aproximados sobre esses números pode ajudar a mostrar as melhorias de escalabilidade proporcionadas por um rollup otimista:

1. O tamanho alvo para cada bloco é de 15 milhões de gas e custa 16 gas para verificar um byte de dados. Dividir o tamanho médio do bloco por 16 gas (15.000.000/16) mostra que o bloco médio pode conter **937.500 bytes de dados**.
2. Se uma transação básica de rollup usa 12 bytes, então o bloco médio do Ethereum pode processar **78.125 transações de rollup** (937.500/12) ou **39 lotes de rollup** (se cada lote contiver uma média de 2.000 transações).
3. Se um novo bloco for produzido no Ethereum a cada 15 segundos, as velocidades de processamento do rollup chegariam a cerca de **5.208 transações por segundo**. Isso é feito dividindo o número de transações básicas de rollup que um bloco do Ethereum pode conter (**78.125**) pelo tempo de bloco médio (**15 segundos**).

Esta é uma estimativa bastante otimista, dado que as transações de rollup otimista não podem possivelmente compreender um bloco inteiro no Ethereum. No entanto, pode dar uma ideia aproximada de quantos ganhos de escalabilidade os rollups otimistas podem proporcionar aos usuários do Ethereum (as implementações atuais oferecem até 2.000 TPS).

Espera-se que a introdução do [fragmentação de dados](/roadmap/danksharding/) no Ethereum melhore a escalabilidade em rollups otimistas. Como as transações de rollup devem compartilhar espaço de bloco com outras transações não rollup, sua capacidade de processamento é limitada pela vazão de dados na cadeia principal do Ethereum. O danksharding aumentará o espaço disponível para as cadeias l2 publicarem dados por bloco, usando armazenamento de "blob" mais barato e impermanente em vez de `CALLDATA` caro e permanente.

### Prós e contras dos rollups otimistas {#further-reading-on-optimistic-rollups}

| Prós | Contras |
| ----------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| Oferece melhorias massivas na escalabilidade sem sacrificar a segurança ou a desnecessidade de confiança. | Atrasos na finalidade da transação devido a potenciais desafios de fraude. |
| Os dados da transação são armazenados na cadeia de camada 1, melhorando a transparência, segurança, resistência à censura e descentralização. | Operadores de rollup centralizados (sequenciadores) podem influenciar a ordenação de transações. |
| A prova de fraude garante a finalidade sem necessidade de confiança e permite que minorias honestas protejam a cadeia. | Se não houver nós honestos, um operador malicioso pode roubar fundos publicando blocos inválidos e compromissos de estado. |
| O cálculo de provas de fraude é aberto a nós regulares da l2, diferente das provas de validade (usadas em ZK-rollups) que exigem hardware especial. | O modelo de segurança depende de pelo menos um nó honesto executando transações de rollup e enviando provas de fraude para contestar transições de estado inválidas. |
| Os rollups se beneficiam da "vivacidade sem necessidade de confiança" (qualquer pessoa pode forçar a cadeia a avançar executando transações e publicando afirmações). | Os usuários devem esperar que o período de desafio de uma semana expire antes de sacar fundos de volta para o Ethereum. |
| Os rollups otimistas dependem de incentivos criptoeconômicos bem projetados para aumentar a segurança na cadeia. | Os rollups devem publicar todos os dados de transações onchain, o que pode aumentar os custos. |
| A compatibilidade com a EVM e Solidity permite que os desenvolvedores portem contratos inteligentes nativos do Ethereum para rollups ou usem ferramentas existentes para criar novos dapps. |

### Uma explicação visual dos rollups otimistas {#tutorials}

Aprende melhor visualmente? Assista ao Finematics explicar os rollups otimistas:

<VideoWatch slug="rollups-scaling-strategy" startTime="263" />

## Leitura adicional sobre rollups otimistas

- [Como funcionam os rollups otimistas (O guia completo)](https://www.alchemy.com/overviews/optimistic-rollups)
- [O que é um Rollup de Blockchain? Uma Introdução Técnica](https://www.ethereum-ecosystem.com/blog/what-is-a-blockchain-rollup-a-technical-introduction)
- [O Guia Essencial para o Arbitrum](https://www.bankless.com/the-essential-guide-to-arbitrum)
- [O Guia Prático para Rollups do Ethereum](https://web.archive.org/web/20241108192208/https://research.2077.xyz/the-practical-guide-to-ethereum-rollups)
- [O Estado das Provas de Fraude nas L2s do Ethereum](https://web.archive.org/web/20241124154627/https://research.2077.xyz/the-state-of-fraud-proofs-in-ethereum-l2s)
- [Como o Rollup do Optimism realmente funciona?](https://www.paradigm.xyz/2021/01/how-does-optimism-s-rollup-really-work)
- [Mergulho Profundo na OVM](https://medium.com/ethereum-optimism/ovm-deep-dive-a300d1085f52)
- [O que é a Optimistic Virtual Machine?](https://www.alchemy.com/overviews/optimistic-virtual-machine)

## Tutoriais: Rollups otimistas e pontes no Ethereum

- [Passo a passo do contrato de ponte padrão do Optimism](/developers/tutorials/optimism-std-bridge-annotated-code/) _– Um passo a passo de código anotado da ponte padrão do Optimism para mover ativos entre a l1 e a l2._