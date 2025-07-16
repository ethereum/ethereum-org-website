---
title: Rollups de conhecimento zero
description: 'Uma introdução aos rollups de zero conhecimento: uma solução de dimensionamento usada pela comunidade Ethereum.'
lang: pt-br
---

Rollups de conhecimento zero (ZK-rollups) são [soluções de dimensionamento](/developers/docs/scaling/) de camada 2 que aumentam a vazão na rede principal do Ethereum movendo off-chain a computação e o armazenamento do estado. ZK-rollups podem processar milhares de transações em um lote e logo publicar apenas alguns dados mínimos resumidos para a rede principal. Este resumo de dados define as alterações que devem ser feitas ao estado do Ethereum e algumas provas criptográficas de que essas alterações estão corretas.

## Pré-Requisitos {#prerequisites}

Você deve ler e entender mais sobre em nossa página [Ethereum scaling](/developers/docs/scaling/) e [camada 2](/layer-2).

## O que são rollups de conhecimento zero? {#what-are-zk-rollups}

**Rollups de conhecimento zero (ZK-rollups)** agrupam (ou acumulam) transações em lotes que são executados off-chain. A computação off-chain reduz a quantidade de dados que devem ser publicados na blockchain. Operadores de ZK-rollups submetem um resumo das mudanças necessárias para representar todas as transações em um lote, ao invés de enviar cada transação individualmente. Eles também produzem [provas de validade](/glossary/#validity-proof) para provar a exatidão de suas mudanças.

O estado dos ZK-rollups é mantido por um contrato inteligente implantado na rede Ethereum. Para atualizar este estado, os nós ZK-rollup devem enviar uma prova de validade para verificação. Como mencionado, a prova de validade é uma garantia criptográfica de que a mudança de estado proposta pelo rollup é realmente o resultado da execução de um determinado lote de transações. Isso significa que os ZK-rollups só precisam fornecer provas de validade para finalizar as transações no Ethereum, em vez de publicar todos os dados da transação on-chain, como [optimistic rollups](/developers/docs/scaling/optimistic-rollups/).

Não há atrasos ao mover fundos de um ZK-rollup para o Ethereum porque as transações de saída são executadas assim que o contrato de ZK-rollup verifica a prova de validade. Inversamente, sacar fundos dos optimistic rollups está sujeito a um atraso para permitir que qualquer pessoa desafie a transação de saída com uma [prova de fraude](/glossary/#fraud-proof).

ZK-rollups escrevem transações para o Ethereum como `calldata`. `calldata` é onde os dados incluídos em chamadas externas para funções de contrato inteligente ficam armazenados. As informações em `calldata` são publicadas na blockchain, permitindo que qualquer pessoa reconstrua o estado do rollup de forma independente. ZK-rollups utilizam técnicas de compactação para reduzir os dados de transação – por exemplo, as contas são representadas por um índice ao invés de um endereço, o que economiza 28 bytes de dados. A publicação de dados on-chain é um custo significativo para os rollups, de modo que a compressão de dados pode reduzir as tarifas para os usuários.

## Como os ZK-rollups interagem com o Ethereum? {#zk-rollups-and-ethereum}

Uma cadeia ZK-rollup é um protocolo off-chain que opera no topo da blockchain Ethereum e é gerenciado por contratos inteligentes on-chain no Ethereum. ZK-rollups executam transações fora da rede principal, mas periodicamente comprometem lotes de transações off-chain para um contrato de rollup on-chain. Este registro de transação é imutável, muito parecido com a blockchain Ethereum e forma a cadeia ZK-rollup.

A arquitetura principal do ZK-rollup é composta dos seguintes componentes:

1. **Contratos on-chain**: conforme mencionado, o protocolo ZK-rollup é controlado por contratos inteligentes em execução no Ethereum. Isto inclui o contrato principal que armazena os blocos de rollup, rastreia os depósitos e monitora as atualizações de estado. Outro contrato on-chain (o contrato verificador) verifica as provas de conhecimento zero submetidas pelos produtores de blocos. Assim, o Ethereum serve como camada base ou "camada 1" para o ZK-rollup.

2. **Máquina virtual (VM) off-chain**: embora o protocolo ZK-rollup resida no Ethereum, a execução da transação e o armazenamento de estado ocorrem em uma máquina virtual separada, independente da [EVM](/developers/docs/evm/). Essa VM off-chain é o ambiente de execução para transações no ZK-rollup e serve como camada secundária ou "camada 2" para o protocolo ZK-rollup. As provas de validade verificadas na rede principal do Ethereum garantem a exatidão das transições de estado na VM off-chain.

ZK-rollups são "soluções de dimensionemento híbrido", protocolos off-chain que operam de forma independente, mas obtêm segurança do Ethereum. Especificamente, a rede Ethereum impõe a validade das atualizações de estado no rollup ZK e garante a disponibilidade de dados por trás de cada atualização do estado do rollup. Como resultado, os ZK-rollups são consideravelmente mais seguros do que as soluções de dimensionamento fora da cadeia puras, tais como [sidechains](/developers/docs/scaling/sidechains/), que são responsáveis por suas propriedades de segurança, ou [validiums](/developers/docs/scaling/validium/), que também verificam transações no Ethereum com provas de validade, mas armazenam dados de transações em outro lugar.

ZK-rollups dependem do protocolo Ethereum principal para o seguinte:

### Disponibilidade de dados {#data-availability}

Os ZK-rollups publicam dados de estado para cada transação processada off-chain para o Ethereum. Com esses dados, é possível que indivíduos ou empresas reproduzam o estado do rollup e validem a cadeia por conta própria. O Ethereum disponibiliza esses dados para todos os participantes da rede como `calldata`.

Os ZK-rollups não precisam publicar muitos dados de transação on-chain porque as provas de validade já verificam a autenticidade das transições de estado. No entanto, o armazenamento de dados on-chain ainda é importante porque permite a verificação independente e sem permissão do estado da cadeia L2 que, por sua vez, permite que qualquer pessoa envie lotes de transações, evitando que operadores maliciosos censurem ou congelem a cadeia.

A cadeia on-chain é necessária para que os usuários interajam com o rollup. Sem acesso aos dados do estado, os usuários não podem consultar o saldo de sua conta ou iniciar transações (por exemplo, retiradas) que dependem de informações do estado.

### Finalidade da transação {#transaction-finality}

O Ethereum atua como uma camada de liquidação para ZK-rollups: as transações L2 são finalizadas somente se o contrato L1 aceitar a prova de validade. Isso elimina o risco de operadores maliciosos corromperem a cadeia (por exemplo, roubando fundos de rollup), uma vez que cada transação deve ser aprovada na rede principal. Além disso, o Ethereum garante que as operações do usuário não podem ser revertidas depois de finalizadas na L1.

### Resistência à censura {#censorship-resistance}

A maioria dos ZK-rollups usam um "super-nó" (o operador) para executar transações, produzir lotes e enviar blocos para a L1. Embora isso garanta eficiência, aumenta o risco de censura: operadores mal-intencionados de ZK-rollup podem censurar usuários recusando-se a incluir suas transações em lotes.

Como medida de segurança, os ZK-rollups permitem que os usuários enviem transações diretamente para o contrato rollup na rede principal, se acharem que estão sendo censurados pelo operador. Isso permite que os usuários forcem uma saída do ZK-rollup para o Ethereum sem depender da permissão do operador.

## Como funcionam os ZK-rollups? {#how-do-zk-rollups-work}

### Transações {#transactions}

Os usuários do ZK-rollup assinam as transações e submetem aos operadores L2 para processamento e inclusão no próximo lote. Em alguns casos, o operador é uma entidade centralizada, chamada de sequenciador, que executa as transações, as agrega em lotes e envia ao L1. O sequenciador neste sistema é a única entidade autorizada a produzir blocos L2 e adicionar transações rollup ao contrato ZK-rollup.

Outros ZK-rollups podem alternar a função do operador usando um conjunto de validadores de [prova de participação](/developers/docs/consensus-mechanisms/pos/). Os operadores potenciais depositam fundos no contrato de rollup, com o tamanho de cada participação influenciando as chances do participante ser selecionado para produzir o próximo lote de rollup. A participação do operador pode ser reduzida se ele agir maliciosamente, o que o incentiva a publicar blocos válidos.

#### Como os ZK-rollups publica dados de transações no Ethereum {#how-zk-rollups-publish-transaction-data-on-ethereum}

Como explicado, os dados de transações são publicados no Ethereum como `calldata`. `calldata` é uma área de dados em um contrato inteligente usado para passar argumentos para uma função e se comporta de forma semelhante à [memória](/developers/docs/smart-contracts/anatomy/#memory). Embora `calldata` não seja armazenado como parte do estado do Ethereum, ele persiste on-chain como parte do [histórico de logs](https://docs.soliditylang.org/en/latest/introduction-to-smart-contracts.html?highlight=memory#logs) da cadeia Ethereum. `calldata` não afeta o estado do Ethereum, o que a torna uma maneira barata de armazenar dados on-chain.

A palavra-chave `calldata` muitas vezes identifica o método do contrato inteligente sendo chamado por uma transação e contém entradas para o método na forma de uma sequência arbitrária de bytes. ZK-rollups usam `calldata` para publicar dados de transação compactados on-chain; o operador de rollup simplesmente adiciona um novo lote chamando a função requerida no contrato de rollup e passa os dados compactados como argumentos de função. Isto ajuda a reduzir os custos para os usuários, uma vez que uma grande parte das taxas de rollup vai para o armazenamento de dados de transações on-chain.

### Compromissos com o estado {#state-commitments}

O estado do ZK-rollup, que inclui contas e saldos L2, é representado como uma [árvore Merkle](/whitepaper/#merkle-trees). Um hash criptográfico da raiz da árvore Merkle (raiz Merkle) é armazenado no contrato on-chain, permitindo que o protocolo de rollup rastreie alterações no estado do ZK-rollup.

O rollup passa para um novo estado após a execução de um novo conjunto de transações. O operador que iniciou a transição de estado é obrigado a calcular uma nova raiz de estado e se submeter ao contrato on-chain. Se a prova de validade associada ao lote for autenticada pelo contrato do verificador, a nova raiz Merkle se tornará a raiz do estado canônico do ZK-rollup.

Além de calcular as raízes de estado, o operador ZK-rollup também cria uma raiz de lote, a raiz de uma árvore Merkle que compreende todas as transações em um lote. Quando um novo lote é enviado, o contrato de rollup armazena a raiz do lote, permitindo que os usuários comprovem que uma transação (por exemplo, uma solicitação de saque) foi incluída no lote. Os usuários terão que fornecer detalhes da transação, a raiz do lote e uma [prova de Merkle](/developers/tutorials/merkle-proofs-for-offline-data-integrity/) mostrando o caminho de inclusão.

### Prova de validação {#validity-proofs}

A nova raiz de estado que o operador ZK-rollup submete ao contrato L1 é o resultado de atualizações no estado do rollup. Digamos que Alice envie 10 tokens para Bob, o operador simplesmente diminui o saldo de Alice em 10 e incrementa o saldo de Bob em 10. O operador então calcula o hash dos dados atualizados da conta, reconstrói a árvore Merkle do rollup e envia a nova raiz Merkle para o contrato on-chain.

Mas o contrato de rollup não aceitará automaticamente o compromisso de estado proposto até que o operador prove que a nova raiz Merkle resultou de atualizações corretas no estado do rollup. O operador ZK-rollup faz isso produzindo uma prova de validade, um compromisso criptográfico sucinto que verifica a exatidão das transações em lote.

As provas de validade permitem que as partes provem a exatidão de uma declaração sem revelar a declaração em si – portanto, também são chamadas de provas de conhecimento zero. ZK-rollups usam provas de validade para confirmar a exatidão das transições de estado off-chain sem ter que executar novamente transações no Ethereum. Essas provas podem vir na forma de um [ZK-SNARK](https://arxiv.org/abs/2202.06877) (Argumento de Conhecimento Suncinto e Não Interativo de Conhecimento Zero) ou [ZK-STARK](https://eprint.iacr.org/2018/046) (Argumento de Conhecimento Transparente e Dimensionável de Conhecimento Zero).

Ambos SNARKs e STARKs ajudam a atestar a integridade da computação off-chain em ZK-rollups, embora cada tipo de prova tenha características distintas.

**ZK-SNARKs**

Para que o protocolo ZK-SNARK funcione, é necessário criar um Texto de Referência Comum (CRS, pela sigla em inglês): o CRS fornece parâmetros públicos para provar e verificar as provas de validade. A segurança do sistema de provas depende da configuração do CRS; se as informações usadas para criar parâmetros públicos caírem na posse de atores mal-intencionados, eles poderão gerar falsas provas de validade.

Alguns ZK-rollups tentam resolver esse problema usando uma [cerimônia de computação multipartidária (MPC)](https://zkproof.org/2021/06/30/setup-ceremonies/amp/), envolvendo pessoas de confiança, para gerar parâmetros públicos para o circuito ZK-SNARK. Cada parte contribui com alguma aleatoriedade (chamada de "lixo tóxico") para a construção do CRS, que deve ser destruída imediatamente.

As configurações confiáveis são usadas porque aumentam a segurança da configuração do CRS. Desde que um participante honesto destrua sua entrada, a segurança do sistema ZK-SNARK é garantida. Ainda assim, esta abordagem requer a confiança dos envolvidos para eliminar suas amostras aleatórias e não prejudicar as garantias de segurança do sistema.

Suposições de confiança à parte, ZK-SNARKs são populares por seus tamanhos de prova pequenos e verificação em tempo constante. Como a verificação de provas na L1 constitui o maior custo operacional de um ZK-rollup, os L2s usam ZK-SNARKs para gerar provas que podem ser verificadas de forma rápida e barata na rede principal.

**ZK-STARKs**

Como os ZK-SNARKs, os ZK-STARKs provam a validade da computação off-chain sem revelar as entradas. No entanto, os ZK-STARKs são considerados uma melhoria nos ZK-SNARKs devido a seu dimensionamento e transparência.

Os ZK-STARKs são "transparentes", pois podem funcionar sem a configuração confiável de um CRS. Em vez disso, os ZK-STARKs dependem da aleatoriedade verificável publicamente para estabelecer parâmetros de geração e verificação de provas.

Os ZK-STARKs também fornecem mais dimensionamento porque o tempo necessário para provar e verificar as provas de validade aumenta _quase linearmente_ em relação à complexidade da computação subjacente. Com ZK-SNARKs, os tempos de prova e verificação dimensionam _linearmente_ em relação ao tamanho da computação subjacente. Isso significa que os ZK-STARKs requerem menos tempo do que os ZK-SNARKs para provar e verificar quando grandes conjuntos de dados estão envolvidos, tornando-os úteis para aplicativos de alto volume.

Os ZK-STARKs também são seguros contra computadores quânticos, enquanto a Criptografia de Curva Elíptica (ECC, pela sigla em inglês) usada em ZK-SNARKs é amplamente considerada suscetível a ataques de computação quântica. A desvantagem dos ZK-STARKs é que eles produzem tamanhos de prova maiores, que são mais caros de verificar no Ethereum.

#### Como funcionam as provas de validade nos ZK-rollups? {#validity-proofs-in-zk-rollups}

##### Geração de prova

Antes de aceitar transações, o operador realizará as verificações habituais. Isso inclui confirmar que:

- As contas de remetente e destinatário são parte da árvore de estado.
- O remetente tem fundos suficientes para processar a transação.
- A transação está correta e corresponde à chave pública do remetente no rollup.
- O nonce do remetente está correto etc.

Uma vez que o nó ZK-rollup tenha transações suficientes, ele as agrega em um lote e compila entradas para o circuito de prova para reunir em uma prova ZK sucinta. Isso pode incluir:

- Uma raiz de árvore Merkle que engloba todas as transações no lote.
- Provas de Merkle de transações para provar a inclusão no lote.
- Provas de Merkle para cada par de destinatário-remetente em transações para provar que essas contas são parte da árvore de estado do rollup.
- Um conjunto de raízes de estado intermediárias, derivadas da atualização da raiz de estado após a aplicação de atualizações de estado para cada transação (ou seja, diminuindo as contas do remetente e aumentando as contas do destinatário).

O circuito de prova calcula a prova de validade "fazendo um loop" sobre cada transação e realizando as mesmas verificações que o operador completou antes de processar a transação. Primeiro, ele verifica se a conta do remetente faz parte da raiz de estado existente, utilizando a prova Merkle fornecida. Em seguida, reduz o saldo do remetente, aumenta seu nonce, faz hash dos dados atualizados da conta e os combina com a prova Merkle para gerar uma nova raiz Merkle.

Esta raiz Merkle reflete a única mudança no estado do ZK-rollup: uma mudança no saldo e nonce do remetente. Isso é possível porque a prova de Merkle usada para provar a existência da conta é usada para derivar a nova raiz do estado.

O circuito de prova executa o mesmo processo na conta do receptor. Ele verifica se a conta do destinatário existe na raiz do estado intermediário (usando a prova de Merkle), aumenta seu saldo, refaz os dados da conta e os combina com a prova de Merkle para gerar uma nova raiz de estado.

O processo se repete para cada transação; cada "loop" cria uma nova raiz de estado ao atualizar a conta do remetente e uma nova raiz subsequente ao atualizar a conta do destinatário. Conforme explicado, cada atualização na raiz do estado representa uma parte da alteração da árvore de estado do rollup.

O circuito de comprovação do ZK itera sobre todo o lote de transações, verificando a sequência de atualizações que resultam em uma raiz de estado final depois que a última transação é executada. A última raiz Merkle computada se torna a mais nova raiz de estado canônico do ZK-rollup.

##### Prova de verificação

Após o circuito de prova verificar a correção das atualizações do estado, o operador L2 apresenta a prova de validade computada ao contrato do verificador em L1. O circuito de verificação do contrato verifica a validade das provas e também confere as entradas públicas que fazem parte da prova:

- **Raiz pré-estado**: o antigo estado raiz do ZK-rollup (ou seja, antes das transações em lote serem executadas), refletindo o último estado válido conhecido da cadeia L2.

- **Raiz pós-estado**: o novo estado raiz do ZK-rollup (ou seja, após a execução de transações em lote), refletindo o estado mais recente da cadeia L2. A raiz pós-estado é a raiz final derivada após a aplicação de atualizações de estado no circuito de prova.

- **Raiz do lote**: a raiz Merkle do lote, derivada pela _aplicação da raiz de Merkle_ em transações no lote e pelo hash da raiz da árvore.

- **Entradas de transação**: dados associados com as transações executadas como parte do lote enviado.

Se a prova satisfaz o circuito (ou seja, é válida), significa que existe uma sequência de transações válidas que fazem a transição do rollup do estado anterior (impressões digitais criptográficas na raiz do pré-estado) para um novo estado (impressões digitais criptográficas na raiz do pós-estado). Se a raiz pré-estado corresponder à raiz armazenada no contrato de rollup e a prova for válida, o contrato de rollup obterá a raiz pós-estado da prova e atualizará sua árvore de estado para refletir o estado alterado do rollup.

### Entradas e saídas {#entries-and-exits}

Os usuários entram no ZK-rollup depositando tokens no contrato de rollup implantado na cadeia L1. Esta transação é enfileirada, já que somente os operadores podem enviar transações para o contrato de rollup.

Se a fila de depósitos pendentes começar a encher, o operador do ZK-rollup receberá as transações de depósito e as enviará ao contrato de rollup. Uma vez que os fundos do usuário estejam no rollup, eles podem começar a fazer transações enviando-as para o operador para processamento. Os usuários podem verificar saldos no rollup fazendo o hash de seus dados de conta, enviando o hash para o contrato de rollup e fornecendo uma prova Merkle para verificar a raiz do estado atual.

A retirada de um ZK-rollup para L1 é simples. O usuário inicia a transação de saída enviando seus ativos no rollup para uma conta específica para gravação. Se o operador incluir a transação no próximo lote, o usuário poderá enviar uma solicitação de retirada para o contrato on-chain. Este pedido de retirada incluirá o seguinte:

- Prova de Merkle provando a inclusão da transação do usuário na conta burn em um lote de transação

- Dados da transação

- Número de lotes

- Endereço L1 para receber fundos depositados

O contrato de rollup faz o hash dos dados da transação, verifica se a raiz do lote existe e usa a prova de Merkle para verificar se o hash da transação faz parte da raiz do lote. Em seguida, o contrato executa a transação de saída e envia os fundos para o endereço escolhido pelo usuário na L1.

## Compatibilidade de ZK-rollups e EVM {#zk-rollups-and-evm-compatibility}

Ao contrário dos optimistic rollups, os ZK-rollups não são prontamente compatíveis com a [Máquina Virtual Ethereum (EVM)](/developers/docs/evm/). Provar o cálculo EVM de propósito geral em circuitos é mais difícil e intensivo em recursos do que provar cálculos simples (como a transferência simbólica descrita anteriormente).

No entanto, [avanços na tecnologia de conhecimento zero](https://hackmd.io/@yezhang/S1_KMMbGt#Why-possible-now) estão despertando um interesse renovado em envolver a computação EVM em provas de conhecimento zero. Esses esforços são voltados para a criação de uma implementação EVM de conhecimento zero (zkEVM) que pode verificar com eficiência a exatidão da execução do programa. Um zkEVM recria opcodes EVM existentes para prova/verificação em circuitos, permitindo a execução de contratos inteligentes.

Como a EVM, um zkEVM transita entre os estados depois que a computação é executada em algumas entradas. A diferença é que o zkEVM também cria provas de conhecimento zero para verificar a exatidão de cada etapa da execução do programa. As provas de validade podem verificar a exatidão das operações que afetam o estado da VM (memória, pilha, armazenamento) e a própria computação (ou seja, a operação chamou os opcodes corretos e os executou corretamente?).

A introdução de ZK-rollups compatíveis é esperado para ajudar os desenvolvedores a aproveitar o dimensionamento e as garantias de segurança de provas de conhecimento zero. Mais importante, a compatibilidade com a infraestrutura nativa do Ethereum significa que os desenvolvedores podem construir dapps compatíveis com ZK usando ferramentas e linguagens familiares (e testadas na prática).

## Como funcionam as taxas do ZK-rollup? {#how-do-zk-rollup-fees-work}

O valor que os usuários pagam pelas transações em ZK-rollups depende da taxa de gás, assim como na rede principal do Ethereum. No entanto, as taxas de gás funcionam de maneira diferente na L2 e são influenciadas pelos seguintes custos:

1. **Gravação de estado**: há um custo fixo para gravar no estado do Ethereum (ou seja, enviar uma transação na blockchain Ethereum). Os ZK-rollups reduzem esse custo agrupando as transações e distribuindo os custos fixos entre vários usuários.

2. **Publicação de dados**: os ZK-rollups publicam dados de estado para cada transação no Ethereum como `calldata`. Os custos de `calldata` são atualmente regidos por [EIP-1559](https://eips.ethereum.org/EIPS/eip-1559), que estipula um custo de 16 gás para bytes diferentes de zero e 4 gás para zero bytes de `calldata`, respectivamente. O custo pago em cada transação é influenciado pela quantidade de `calldata` que precisa ser publicada na cadeia para isso.

3. **Taxas do operador L2**: este é o valor pago ao operador de rollup como compensação pelos custos computacionais incorridos no processamento de transações, muito parecido com ["taxas de prioridade (gorjetas)" de transação](/developers/docs/gas/#how-are-gas-fees-calculated) na rede principal do Ethereum.

4. **Geração e verificação de provas**: os operadores de ZK-rollup devem produzir provas de validade para lotes de transações, que consomem muitos recursos. A verificação de provas de conhecimento zero na rede principal também custa gás (cerca de 500.000 gás).

Além de transações em lote, os ZK-rollups reduzem as taxas para os usuários compactando os dados da transação. Veja um [panorama geral e em tempo real](https://l2fees.info/) de quanto custa usar ZK-rollups Ethereum.

## De que maneira os ZK-rollups ajudam no dimensionamento do Ethereum? {#scaling-ethereum-with-zk-rollups}

### Compactação de dados da transação {#transaction-data-compression}

Os ZK-rollups estendem a taxa de transferência na camada base do Ethereum, movendo a computação off-chain, mas o verdadeiro impulso para o dimensionamento vem da compactação dos dados da transação. O [tamanho do bloco](/developers/docs/blocks/#block-size) do Ethereum limita os dados que cada bloco pode conter e, por extensão, o número de transações processadas por bloco. Ao compactar os dados relacionados às transações, os ZK-rollups aumentam significativamente o número de transações processadas por bloco.

Os ZK-rollups podem compactar melhor os dados das transações do que osoptimistic rollups, uma vez que não têm que publicar todos os dados necessários para validar cada transação. Eles só têm que publicar os dados mínimos necessários para reconstruir o estado mais recente das contas e saldos no rollup.

### Provas recursivas {#recursive-proofs}

Uma vantagem das provas de conhecimento zero é que as provas podem verificar outras provas. Por exemplo, um único ZK-SNARK pode verificar outros ZK-SNARKs. Tais "provas de prova" são chamadas provas recursivas e aumentam drasticamente a produção de ZK-rollups.

Atualmente, as provas de validade são geradas bloco a bloco e submetidas ao contrato L1 para verificação. No entanto, a verificação de provas de bloco único limita o rendimento que os ZK-rollups podem alcançar, pois apenas um bloco pode ser finalizado quando o operador envia uma prova.

As provas recursivas, no entanto, permitem finalizar vários blocos com uma prova de validade. Isto porque o circuito de prova agrega recursivamente várias provas de blocos até que uma prova final seja criada. O operador L2 envia esta prova recursiva, e se o contrato aceitar, todos os blocos relevantes serão finalizados instantaneamente. Com provas recursivas, aumenta o número de transações de ZK-rollup que podem ser finalizadas no Ethereum em intervalos.

### Prós e contras de ZK-rollups {#zk-rollups-pros-and-cons}

| Prós                                                                                                                                                                                                                              | Contras                                                                                                                                                                                                      |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| As provas de validade garantem a exatidão das transações off-chain e impedem que os operadores executem transições de estado inválido.                                                                                            | O custo associado à computação e verificação de provas de validade é substancial e pode aumentar as taxas para usuários de rollup.                                                                           |
| Oferece uma conclusão mais rápida da transação, como as atualizações de estado são aprovadas assim que as provas de validade são verificadas em L1.                                                                               | Construir ZK-rollups compatíveis com EVM é difícil devido à complexidade da tecnologia de conhecimento zero.                                                                                                 |
| Baseia-se em mecanismos criptográficos não confiáveis para segurança, não na honestidade de atores incentivados como acontece com os [optimistic rollups](/developers/docs/scaling/optimistic-rollups/#optimistic-pros-and-cons). | Produzir provas de validade requer hardware especializado, o que pode encorajar o controle centralizado da cadeia por algumas partes.                                                                        |
| Armazena os dados necessários para recuperar o estado off-chain na L1, o que garante segurança, resistência à censura e descentralização.                                                                                         | Operadores centralizados (sequenciadores) podem influenciar a ordem das transações.                                                                                                                          |
| Os usuários se beneficiam de uma maior eficiência de capital e podem retirar fundos da L2 sem atrasos.                                                                                                                            | Os requisitos de hardware podem reduzir o número de participantes que podem forçar a cadeia a progredir, aumentando o risco de operadores maliciosos congelarem o estado do rollup e censurarem os usuários. |
| Não depende de suposições de vivacidade, e os usuários não têm que validar a cadeia para proteger seus fundos.                                                                                                                    | Alguns sistemas de prova (por exemplo, ZK-SNARK) requerem uma configuração confiável, o que, se mal conduzida, pode comprometer o modelo de segurança de um ZK-rollup.                                       |
| Uma melhor compactação de dados pode ajudar a reduzir os custos de publicação de `calldata` no Ethereum e minimizar as taxas de rollup para os usuários.                                                                          |                                                                                                                                                                                                              |

### Uma explicação visual de ZK-rollups {#zk-video}

Assista ao Finematics explicando ZK-rollups:

<YouTube id="7pWxCklcNsU" start="406" />

## Quem está trabalhando em zkEVMs? {#zkevm-projects}

Os projetos que trabalham em zkEVMs incluem:

- **[zkEVM](https://github.com/privacy-scaling-explorations/zkevm-specs)** - _zkEVM é um projeto financiado pela Ethereum Foundation para desenvolver um ZK-rollup compatível com EVM e um mecanismo para gerar provas de validação para blocos Ethereum._

- **[Polygon zkEVM](https://polygon.technology/solutions/polygon-zkevm)** — _é um ZK-Rollup descentralizado na rede principal do Ethereum que trabalha em uma Máquina Virtual Ethereum de conhecimento zero (zkEVM) e executa transações do Ethereum de maneira transparente, incluindo contratos inteligentes com validações de prova de conhecimento._

- **[Scroll](https://scroll.io/blog/zkEVM)** - _Scroll é uma empresa impulsionada pela tecnologia que trabalha no desenvolvimento de uma solução nativa zkEVM de camada 2 para Ethereum._

- **[Taiko](https://taiko.xyz)** - _Taiko é um ZK-rollup descentralizado, equivalente ao Ethereum (um [ZK-EVM do Tipo 1](https://vitalik.eth.limo/general/2022/08/04/zkevm.html))._

- **[ZKsync](https://docs.zksync.io/)** - _ZKsync Era é um ZK Rollup compatível com EVM criado pela Matter Labs, com tecnologia do zkEVM da própria empresa._

- **[Starknet](https://starkware.co/starknet/)** - _StarkNet é uma solução de dimensionamento de camada 2 compatível com EVM desenvolvida pela StarkWare._

- **[Morph](https://www.morphl2.io/)** - _Morph é uma solução de dimensionamento de rollup híbrida que utiliza zk-proof para resolver o problema do desafio de estado da Camada 2._

## Leitura adicional sobre leitura de ZK-rollups {#further-reading-on-zk-rollups}

- [O que são os rollups de conhecimento zero?](https://coinmarketcap.com/alexandria/glossary/zero-knowledge-rollups)
- [O que são rollups de conhecimento zero?](https://alchemy.com/blog/zero-knowledge-rollups)
- [STARKs vs SNARKs](https://consensys.net/blog/blockchain-explained/zero-knowledge-proofs-starks-vs-snarks/)
- [O que é um zkEVM?](https://www.alchemy.com/overviews/zkevm)
- [Tipos de ZK-EVM: equivalente a Ethereum, equivalente a EVM, Tipo 1, Tipo 4 e outros termos do momento](https://taiko.mirror.xyz/j6KgY8zbGTlTnHRFGW6ZLVPuT0IV0_KmgowgStpA0K4)
- [Introdução a zkEVMs](https://hackmd.io/@yezhang/S1_KMMbGt)
- [Recursos incríveis para zkEVM](https://github.com/LuozhuZhang/awesome-zkevm)
- [ZK-SNARKS nos bastidores](https://vitalik.eth.limo/general/2017/02/01/zk_snarks.html)
- [SNARKs: como são possíveis?](https://vitalik.eth.limo/general/2021/01/26/snarks.html)
