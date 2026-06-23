---
title: Rollups de conhecimento zero
description: "Uma introdução aos rollups de conhecimento zero — uma solução de escalabilidade usada pela comunidade Ethereum."
lang: pt-br
---

Os rollups de conhecimento zero (ZK-rollups) são [soluções de escalabilidade](/developers/docs/scaling/) de camada 2 (l2) que aumentam a vazão na Rede Principal do [Ethereum](/) movendo a computação e o armazenamento de estado para offchain. Os ZK-rollups podem processar milhares de transações em um lote e, em seguida, publicar apenas alguns dados de resumo mínimos na Mainnet. Esses dados de resumo definem as alterações que devem ser feitas no estado do Ethereum e alguma prova criptográfica de que essas alterações estão corretas.

## Pré-requisitos {#prerequisites}

Você deve ter lido e compreendido nossa página sobre [escalabilidade do Ethereum](/developers/docs/scaling/) e [camada 2 (l2)](/layer-2).

## O que são rollups de conhecimento zero? {#what-are-zk-rollups}

Os **rollups de conhecimento zero (ZK-rollups)** agrupam (ou 'fazem o rollup' de) transações em lotes que são executados offchain. A computação offchain reduz a quantidade de dados que precisa ser publicada na blockchain. Os operadores de ZK-rollup enviam um resumo das alterações necessárias para representar todas as transações em um lote, em vez de enviar cada transação individualmente. Eles também produzem [provas de validade](/glossary/#validity-proof) para provar a exatidão de suas alterações.

O estado do ZK-rollup é mantido por um contrato inteligente implantado na rede Ethereum. Para atualizar esse estado, os nós do ZK-rollup devem enviar uma prova de validade para verificação. Como mencionado, a prova de validade é uma garantia criptográfica de que a alteração de estado proposta pelo rollup é realmente o resultado da execução do lote de transações fornecido. Isso significa que os ZK-rollups só precisam fornecer provas de validade para finalizar transações no Ethereum, em vez de publicar todos os dados da transação onchain como os [rollups otimistas](/developers/docs/scaling/optimistic-rollups/).

Não há atrasos ao mover fundos de um ZK-rollup para o Ethereum porque as transações de saída são executadas assim que o contrato do ZK-rollup verifica a prova de validade. Por outro lado, o saque de fundos de rollups otimistas está sujeito a um atraso para permitir que qualquer pessoa conteste a transação de saída com uma [prova de fraude](/glossary/#fraud-proof).

Os ZK-rollups gravam transações no Ethereum como `calldata`. `calldata` é onde os dados incluídos em chamadas externas para funções de contratos inteligentes são armazenados. As informações em `calldata` são publicadas na blockchain, permitindo que qualquer pessoa reconstrua o estado do rollup de forma independente. Os ZK-rollups usam técnicas de compressão para reduzir os dados da transação — por exemplo, as contas são representadas por um índice em vez de um endereço, o que economiza 28 bytes de dados. A publicação de dados onchain é um custo significativo para os rollups, portanto, a compressão de dados pode reduzir as taxas para os usuários.

## Como os ZK-rollups interagem com o Ethereum? {#zk-rollups-and-ethereum}

Uma cadeia de ZK-rollup é um protocolo offchain que opera sobre a blockchain do Ethereum e é gerenciado por contratos inteligentes onchain do Ethereum. Os ZK-rollups executam transações fora da Mainnet, mas periodicamente enviam lotes de transações offchain para um contrato de rollup onchain. Esse registro de transação é imutável, muito parecido com a blockchain do Ethereum, e forma a cadeia do ZK-rollup.

A arquitetura principal do ZK-rollup é composta pelos seguintes componentes:

1. **Contratos onchain**: Como mencionado, o protocolo ZK-rollup é controlado por contratos inteligentes executados no Ethereum. Isso inclui o contrato principal que armazena blocos de rollup, rastreia depósitos e monitora atualizações de estado. Outro contrato onchain (o contrato verificador) verifica as provas de conhecimento zero enviadas pelos produtores de blocos. Assim, o Ethereum serve como a camada base ou "camada 1 (l1)" para o ZK-rollup.

2. **Máquina virtual (VM) offchain**: Embora o protocolo ZK-rollup viva no Ethereum, a execução de transações e o armazenamento de estado acontecem em uma máquina virtual separada, independente da [EVM](/developers/docs/evm/). Essa VM offchain é o ambiente de execução para transações no ZK-rollup e serve como a camada secundária ou "camada 2 (l2)" para o protocolo ZK-rollup. As provas de validade verificadas na Rede Principal do Ethereum garantem a exatidão das transições de estado na VM offchain.

Os ZK-rollups são "soluções de escalabilidade híbridas" — protocolos offchain que operam de forma independente, mas derivam a segurança do Ethereum. Especificamente, a rede Ethereum impõe a validade das atualizações de estado no ZK-rollup e garante a disponibilidade de dados por trás de cada atualização do estado do rollup. Como resultado, os ZK-rollups são consideravelmente mais seguros do que as soluções de escalabilidade puramente offchain, como as [sidechains](/developers/docs/scaling/sidechains/), que são responsáveis por suas propriedades de segurança, ou os [validiums](/developers/docs/scaling/validium/), que também verificam transações no Ethereum com provas de validade, mas armazenam dados de transação em outro lugar.

Os ZK-rollups dependem do protocolo principal do Ethereum para o seguinte:

### Disponibilidade de dados {#data-availability}

Os ZK-rollups publicam dados de estado para cada transação processada offchain no Ethereum. Com esses dados, é possível que indivíduos ou empresas reproduzam o estado do rollup e validem a cadeia por conta própria. O Ethereum disponibiliza esses dados a todos os participantes da rede como `calldata`.

Os ZK-rollups não precisam publicar muitos dados de transação onchain porque as provas de validade já verificam a autenticidade das transições de estado. No entanto, o armazenamento de dados onchain ainda é importante porque permite a verificação independente e não permissionada do estado da cadeia L2, o que, por sua vez, permite que qualquer pessoa envie lotes de transações, impedindo que operadores mal-intencionados censurem ou congelem a cadeia.

O onchain é exigido para que os usuários interajam com o rollup. Sem acesso aos dados de estado, os usuários não podem consultar o saldo de sua conta ou iniciar transações (por exemplo, saques) que dependem de informações de estado.

### Finalidade da transação {#transaction-finality}

O Ethereum atua como uma camada de liquidação para ZK-rollups: as transações L2 são finalizadas apenas se o contrato L1 aceitar a prova de validade. Isso elimina o risco de operadores mal-intencionados corromperem a cadeia (por exemplo, roubando fundos do rollup), já que cada transação deve ser aprovada na Mainnet. Além disso, o Ethereum garante que as operações do usuário não possam ser revertidas depois de finalizadas na L1.

### Resistência à censura {#censorship-resistance}

A maioria dos ZK-rollups usa um "supernó" (o operador) para executar transações, produzir lotes e enviar blocos para a L1. Embora isso garanta eficiência, aumenta o risco de censura: operadores mal-intencionados de ZK-rollup podem censurar usuários recusando-se a incluir suas transações em lotes.

Como medida de segurança, os ZK-rollups permitem que os usuários enviem transações diretamente para o contrato de rollup na Mainnet se acharem que estão sendo censurados pelo operador. Isso permite que os usuários forcem uma saída do ZK-rollup para o Ethereum sem ter que depender da permissão do operador.

## Como funcionam os ZK-rollups? {#how-do-zk-rollups-work}

### Transações {#transactions}

Os usuários no ZK-rollup assinam transações e as enviam aos operadores L2 para processamento e inclusão no próximo lote. Em alguns casos, o operador é uma entidade centralizada, chamada de sequenciador, que executa transações, as agrega em lotes e as envia para a L1. O sequenciador neste sistema é a única entidade com permissão para produzir blocos L2 e adicionar transações de rollup ao contrato do ZK-rollup.

Outros ZK-rollups podem alternar a função de operador usando um conjunto de validadores de [Prova de Participação (PoS)](/developers/docs/consensus-mechanisms/pos/). Os possíveis operadores depositam fundos no contrato de rollup, com o tamanho de cada stake influenciando as chances do staker de ser selecionado para produzir o próximo lote de rollup. O stake do operador pode sofrer penalização se ele agir de forma mal-intencionada, o que o incentiva a publicar blocos válidos.

#### Como os ZK-rollups publicam dados de transação no Ethereum {#how-zk-rollups-publish-transaction-data-on-ethereum}

Como explicado, os dados da transação são publicados no Ethereum como `calldata`. `calldata` é uma área de dados em um contrato inteligente usada para passar argumentos para uma função e se comporta de forma semelhante à [memória](/developers/docs/smart-contracts/anatomy/#memory). Embora `calldata` não seja armazenado como parte do estado do Ethereum, ele persiste onchain como parte dos [logs de histórico](https://docs.soliditylang.org/en/latest/introduction-to-smart-contracts.html?highlight=memory#logs) da cadeia do Ethereum. `calldata` não afeta o estado do Ethereum, tornando-o uma maneira barata de armazenar dados onchain.

A palavra-chave `calldata` frequentemente identifica o método do contrato inteligente sendo chamado por uma transação e mantém as entradas para o método na forma de uma sequência arbitrária de bytes. Os ZK-rollups usam `calldata` para publicar dados de transação compactados onchain; o operador do rollup simplesmente adiciona um novo lote chamando a função necessária no contrato de rollup e passa os dados compactados como argumentos da função. Isso ajuda a reduzir os custos para os usuários, já que grande parte das taxas de rollup vai para o armazenamento de dados de transação onchain.

### Compromissos de estado {#state-commitments}

O estado do ZK-rollup, que inclui contas e saldos L2, é representado como uma [árvore de Merkle](/whitepaper/#merkle-trees). Um hash criptográfico da raiz da árvore de Merkle (raiz de Merkle) é armazenado no contrato onchain, permitindo que o protocolo de rollup rastreie as alterações no estado do ZK-rollup.

O rollup transita para um novo estado após a execução de um novo conjunto de transações. O operador que iniciou a transição de estado é obrigado a calcular uma nova raiz de estado e enviar ao contrato onchain. Se a prova de validade associada ao lote for autenticada pelo contrato verificador, a nova raiz de Merkle se tornará a raiz de estado canônica do ZK-rollup.

Além de calcular as raízes de estado, o operador do ZK-rollup também cria uma raiz de lote — a raiz de uma árvore de Merkle que compreende todas as transações em um lote. Quando um novo lote é enviado, o contrato de rollup armazena a raiz do lote, permitindo que os usuários provem que uma transação (por exemplo, uma solicitação de saque) foi incluída no lote. Os usuários terão que fornecer detalhes da transação, a raiz do lote e uma [prova de Merkle](/developers/tutorials/merkle-proofs-for-offline-data-integrity/) mostrando o caminho de inclusão.

### Provas de validade {#validity-proofs}

A nova raiz de estado que o operador do ZK-rollup envia ao contrato L1 é o resultado de atualizações no estado do rollup. Digamos que Alice envie 10 tokens para Bob, o operador simplesmente diminui o saldo de Alice em 10 e incrementa o saldo de Bob em 10. O operador então faz o hash dos dados da conta atualizados, reconstrói a árvore de Merkle do rollup e envia a nova raiz de Merkle para o contrato onchain.

Mas o contrato de rollup não aceitará automaticamente o compromisso de estado proposto até que o operador prove que a nova raiz de Merkle resultou de atualizações corretas no estado do rollup. O operador do ZK-rollup faz isso produzindo uma prova de validade, um compromisso criptográfico sucinto verificando a exatidão das transações em lote.

As provas de validade permitem que as partes provem a exatidão de uma afirmação sem revelar a própria afirmação — portanto, elas também são chamadas de provas de conhecimento zero. Os ZK-rollups usam provas de validade para confirmar a exatidão das transições de estado offchain sem ter que reexecutar transações no Ethereum. Essas provas podem vir na forma de um [ZK-SNARK](https://arxiv.org/abs/2202.06877) (Argumento de Conhecimento Sucinto Não Interativo de Conhecimento Zero) ou [ZK-STARK](https://eprint.iacr.org/2018/046) (Argumento de Conhecimento Transparente Escalável de Conhecimento Zero).

Tanto os SNARKs quanto os STARKs ajudam a atestar a integridade da computação offchain em ZK-rollups, embora cada tipo de prova tenha características distintas.

**ZK-SNARKs**

Para que o protocolo ZK-SNARK funcione, é necessário criar uma String de Referência Comum (CRS): a CRS fornece parâmetros públicos para provar e verificar provas de validade. A segurança do sistema de prova depende da configuração da CRS; se as informações usadas para criar parâmetros públicos caírem na posse de atores mal-intencionados, eles poderão gerar provas de validade falsas.

Alguns ZK-rollups tentam resolver esse problema usando uma [cerimônia de computação multipartidária (MPC)](https://zkproof.org/2021/06/30/setup-ceremonies/amp/), envolvendo indivíduos confiáveis, para gerar parâmetros públicos para o circuito ZK-SNARK. Cada parte contribui com alguma aleatoriedade (chamada de "lixo tóxico") para construir a CRS, que eles devem destruir imediatamente.

As configurações confiáveis são usadas porque aumentam a segurança da configuração da CRS. Desde que um participante honesto destrua sua entrada, a segurança do sistema ZK-SNARK é garantida. Ainda assim, essa abordagem exige confiar nos envolvidos para excluir sua aleatoriedade amostrada e não comprometer as garantias de segurança do sistema.

Deixando as premissas de confiança de lado, os ZK-SNARKs são populares por seus pequenos tamanhos de prova e verificação em tempo constante. Como a verificação de prova na L1 constitui o maior custo de operação de um ZK-rollup, as L2s usam ZK-SNARKs para gerar provas que podem ser verificadas de forma rápida e barata na Mainnet.

**ZK-STARKs**

Como os ZK-SNARKs, os ZK-STARKs provam a validade da computação offchain sem revelar as entradas. No entanto, os ZK-STARKs são considerados uma melhoria em relação aos ZK-SNARKs devido à sua escalabilidade e transparência.

Os ZK-STARKs são 'transparentes', pois podem funcionar sem a configuração confiável de uma String de Referência Comum (CRS). Em vez disso, os ZK-STARKs dependem de aleatoriedade verificável publicamente para configurar parâmetros para gerar e verificar provas.

Os ZK-STARKs também fornecem mais escalabilidade porque o tempo necessário para provar e verificar as provas de validade aumenta de forma _quase linear_ em relação à complexidade da computação subjacente. Com os ZK-SNARKs, os tempos de prova e verificação escalam _linearmente_ em relação ao tamanho da computação subjacente. Isso significa que os ZK-STARKs exigem menos tempo do que os ZK-SNARKs para provar e verificar quando grandes conjuntos de dados estão envolvidos, tornando-os úteis para aplicativos de alto volume.

Os ZK-STARKs também são seguros contra computadores quânticos, enquanto a Criptografia de Curva Elíptica (ECC) usada em ZK-SNARKs é amplamente considerada suscetível a ataques de computação quântica. A desvantagem dos ZK-STARKs é que eles produzem tamanhos de prova maiores, que são mais caros para verificar no Ethereum.

#### Como as provas de validade funcionam nos ZK-rollups? {#validity-proofs-in-zk-rollups}

##### Geração de prova
Antes de aceitar transações, o operador realizará as verificações usuais. Isso inclui confirmar que:

- As contas do remetente e do destinatário fazem parte da árvore de estado.
- O remetente tem fundos suficientes para processar a transação.
- A transação está correta e corresponde à chave pública do remetente no rollup.
- O nonce do remetente está correto, etc.

Quando o nó do ZK-rollup tem transações suficientes, ele as agrega em um lote e compila as entradas para o circuito de prova compilar em uma prova ZK sucinta. Isso inclui:

- Uma raiz de árvore de Merkle compreendendo todas as transações no lote.
- Provas de Merkle para transações para provar a inclusão no lote.
- Provas de Merkle para cada par remetente-destinatário em transações para provar que essas contas fazem parte da árvore de estado do rollup.
- Um conjunto de raízes de estado intermediárias, derivadas da atualização da raiz de estado após a aplicação de atualizações de estado para cada transação (ou seja, diminuindo as contas do remetente e aumentando as contas do destinatário).

O circuito de prova calcula a prova de validade fazendo um "loop" sobre cada transação e realizando as mesmas verificações que o operador concluiu antes de processar a transação. Primeiro, ele verifica se a conta do remetente faz parte da raiz de estado existente usando a prova de Merkle fornecida. Em seguida, ele reduz o saldo do remetente, aumenta seu nonce, faz o hash dos dados da conta atualizados e os combina com a prova de Merkle para gerar uma nova raiz de Merkle.

Essa raiz de Merkle reflete a única alteração no estado do ZK-rollup: uma alteração no saldo e no nonce do remetente. Isso é possível porque a prova de Merkle usada para provar a existência da conta é usada para derivar a nova raiz de estado.

O circuito de prova realiza o mesmo processo na conta do destinatário. Ele verifica se a conta do destinatário existe sob a raiz de estado intermediária (usando a prova de Merkle), aumenta seu saldo, faz o re-hash dos dados da conta e os combina com a prova de Merkle para gerar uma nova raiz de estado.

O processo se repete para cada transação; cada "loop" cria uma nova raiz de estado a partir da atualização da conta do remetente e uma nova raiz subsequente a partir da atualização da conta do destinatário. Como explicado, cada atualização na raiz de estado representa uma parte da árvore de estado do rollup mudando.

O circuito de prova ZK itera sobre todo o lote de transações, verificando a sequência de atualizações que resultam em uma raiz de estado final após a execução da última transação. A última raiz de Merkle calculada se torna a mais nova raiz de estado canônica do ZK-rollup.

##### Verificação de prova
Depois que o circuito de prova verifica a exatidão das atualizações de estado, o operador L2 envia a prova de validade calculada para o contrato verificador na L1. O circuito de verificação do contrato verifica a validade da prova e também verifica as entradas públicas que fazem parte da prova:

- **Raiz de pré-estado**: A antiga raiz de estado do ZK-rollup (ou seja, antes que as transações em lote fossem executadas), refletindo o último estado válido conhecido da cadeia L2.

- **Raiz de pós-estado**: A nova raiz de estado do ZK-rollup (ou seja, após a execução de transações em lote), refletindo o estado mais recente da cadeia L2. A raiz de pós-estado é a raiz final derivada após a aplicação de atualizações de estado no circuito de prova.

- **Raiz do lote**: A raiz de Merkle do lote, derivada da _merklização_ das transações no lote e do hash da raiz da árvore.

- **Entradas de transação**: Dados associados às transações executadas como parte do lote enviado.

Se a prova satisfizer o circuito (ou seja, for válida), significa que existe uma sequência de transações válidas que fazem a transição do rollup do estado anterior (com impressão digital criptográfica pela raiz de pré-estado) para um novo estado (com impressão digital criptográfica pela raiz de pós-estado). Se a raiz de pré-estado corresponder à raiz armazenada no contrato de rollup e a prova for válida, o contrato de rollup pegará a raiz de pós-estado da prova e atualizará sua árvore de estado para refletir o estado alterado do rollup.

### Entradas e saídas {#entries-and-exits}

Os usuários entram no ZK-rollup depositando tokens no contrato do rollup implantado na cadeia L1. Essa transação é colocada na fila, pois apenas os operadores podem enviar transações para o contrato de rollup.

Se a fila de depósitos pendentes começar a encher, o operador do ZK-rollup pegará as transações de depósito e as enviará para o contrato de rollup. Quando os fundos do usuário estiverem no rollup, eles poderão começar a transacionar enviando transações ao operador para processamento. Os usuários podem verificar os saldos no rollup fazendo o hash dos dados de sua conta, enviando o hash para o contrato de rollup e fornecendo uma prova de Merkle para verificar em relação à raiz de estado atual.

O saque de um ZK-rollup para a L1 é simples. O usuário inicia a transação de saída enviando seus ativos no rollup para uma conta especificada para queimar. Se o operador incluir a transação no próximo lote, o usuário poderá enviar uma solicitação de saque para o contrato onchain. Esta solicitação de saque incluirá o seguinte:

- Prova de Merkle provando a inclusão da transação do usuário na conta de queima em um lote de transações

- Dados da transação

- Raiz do lote

- Endereço L1 para receber os fundos depositados

O contrato de rollup faz o hash dos dados da transação, verifica se a raiz do lote existe e usa a prova de Merkle para verificar se o hash da transação faz parte da raiz do lote. Em seguida, o contrato executa a transação de saída e envia os fundos para o endereço escolhido pelo usuário na L1.

## ZK-rollups e compatibilidade com a EVM {#zk-rollups-and-evm-compatibility}

Ao contrário dos rollups otimistas, os ZK-rollups não são prontamente compatíveis com a [Máquina Virtual Ethereum (EVM)](/developers/docs/evm/). Provar a computação EVM de uso geral em circuitos é mais difícil e consome mais recursos do que provar computações simples (como a transferência de token descrita anteriormente).

No entanto, os [avanços na tecnologia de conhecimento zero](https://hackmd.io/@yezhang/S1_KMMbGt#Why-possible-now) estão despertando um interesse renovado em envolver a computação EVM em provas de conhecimento zero. Esses esforços são voltados para a criação de uma implementação de zkEVM que possa verificar com eficiência a exatidão da execução do programa. Uma zkEVM recria os opcodes EVM existentes para prova/verificação em circuitos, permitindo a execução de contratos inteligentes.

Como a EVM, uma zkEVM transita entre estados após a computação ser realizada em algumas entradas. A diferença é que a zkEVM também cria provas de conhecimento zero para verificar a exatidão de cada etapa na execução do programa. As provas de validade poderiam verificar a exatidão das operações que tocam o estado da VM (memória, pilha, armazenamento) e a própria computação (ou seja, a operação chamou os opcodes corretos e os executou corretamente?).

Espera-se que a introdução de ZK-rollups compatíveis com a EVM ajude os desenvolvedores a aproveitar as garantias de escalabilidade e segurança das provas de conhecimento zero. Mais importante ainda, a compatibilidade com a infraestrutura nativa do Ethereum significa que os desenvolvedores podem criar aplicativos descentralizados (dapps) amigáveis a ZK usando ferramentas e linguagens familiares (e testadas em batalha).

## Como funcionam as taxas de ZK-rollup? {#how-do-zk-rollup-fees-work}

O quanto os usuários pagam por transações em ZK-rollups depende da taxa de gas, assim como na Rede Principal do Ethereum. No entanto, as taxas de gas funcionam de forma diferente na L2 e são influenciadas pelos seguintes custos:

1. **Gravação de estado**: Há um custo fixo para gravar no estado do Ethereum (ou seja, enviar uma transação na blockchain do Ethereum). Os ZK-rollups reduzem esse custo processando transações em lote e distribuindo custos fixos entre vários usuários.

2. **Publicação de dados**: Os ZK-rollups publicam dados de estado para cada transação no Ethereum como `calldata`. Os custos de `calldata` são atualmente regidos pela [EIP-1559](https://eips.ethereum.org/EIPS/eip-1559), que estipula um custo de 16 gas para bytes não nulos e 4 gas para bytes nulos de `calldata`, respectivamente. O custo pago em cada transação é influenciado por quanto `calldata` precisa ser publicado onchain para ela.

3. **Taxas do operador L2**: Este é o valor pago ao operador do rollup como compensação pelos custos computacionais incorridos no processamento de transações, muito parecido com as ["taxas de prioridade (gorjetas)" de transação](/developers/docs/gas/#how-are-gas-fees-calculated) na Rede Principal do Ethereum.

4. **Geração e verificação de prova**: Os operadores de ZK-rollup devem produzir provas de validade para lotes de transações, o que consome muitos recursos. A verificação de provas de conhecimento zero na Mainnet também custa gas (~ 500.000 gas).

Além do processamento em lote de transações, os ZK-rollups reduzem as taxas para os usuários compactando os dados da transação. Você pode [ver uma visão geral em tempo real](https://l2fees.info/) de quanto custa usar os ZK-rollups do Ethereum.

## Como os ZK-rollups escalam o Ethereum? {#scaling-ethereum-with-zk-rollups}

### Compressão de dados de transação {#transaction-data-compression}

Os ZK-rollups estendem a vazão na camada base do Ethereum levando a computação para offchain, mas o verdadeiro impulso para a escalabilidade vem da compressão de dados de transação. O [tamanho do bloco](/developers/docs/blocks/#block-size) do Ethereum limita os dados que cada bloco pode conter e, por extensão, o número de transações processadas por bloco. Ao compactar dados relacionados a transações, os ZK-rollups aumentam significativamente o número de transações processadas por bloco.

Os ZK-rollups podem compactar dados de transação melhor do que os rollups otimistas, pois não precisam publicar todos os dados necessários para validar cada transação. Eles só precisam publicar os dados mínimos necessários para reconstruir o estado mais recente de contas e saldos no rollup.

### Provas recursivas {#recursive-proofs}

Uma vantagem das provas de conhecimento zero é que as provas podem verificar outras provas. Por exemplo, um único ZK-SNARK pode verificar outros ZK-SNARKs. Essas "provas de provas" são chamadas de provas recursivas e aumentam drasticamente a vazão nos ZK-rollups.

Atualmente, as provas de validade são geradas bloco a bloco e enviadas ao contrato L1 para verificação. No entanto, a verificação de provas de bloco único limita a vazão que os ZK-rollups podem alcançar, já que apenas um bloco pode ser finalizado quando o operador envia uma prova.

As provas recursivas, no entanto, tornam possível finalizar vários blocos com uma prova de validade. Isso ocorre porque o circuito de prova agrega recursivamente várias provas de bloco até que uma prova final seja criada. O operador L2 envia essa prova recursiva e, se o contrato a aceitar, todos os blocos relevantes serão finalizados instantaneamente. Com provas recursivas, o número de transações de ZK-rollup que podem ser finalizadas no Ethereum em intervalos aumenta.

### Prós e contras dos ZK-rollups {#zk-rollups-pros-and-cons}

| Prós                                                                                                                                                                                                   | Contras                                                                                                                                                                                               |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| As provas de validade garantem a exatidão das transações offchain e impedem que os operadores executem transações de estado inválidas.                                                                           | O custo associado ao cálculo e à verificação de provas de validade é substancial e pode aumentar as taxas para os usuários do rollup.                                                                            |
| Oferece finalidade de transação mais rápida, pois as atualizações de estado são aprovadas assim que as provas de validade são verificadas na L1.                                                                                              | Construir ZK-rollups compatíveis com a EVM é difícil devido à complexidade da tecnologia de conhecimento zero.                                                                                                    |
| Depende de mecanismos criptográficos sem necessidade de confiança para segurança, não da honestidade de atores incentivados como nos [rollups otimistas](/developers/docs/scaling/optimistic-rollups/#optimistic-pros-and-cons). | A produção de provas de validade requer hardware especializado, o que pode encorajar o controle centralizado da cadeia por algumas partes.                                                                    |
| Armazena os dados necessários para recuperar o estado offchain na L1, o que garante segurança, resistência à censura e descentralização.                                                                       | Operadores centralizados (sequenciadores) podem influenciar a ordenação das transações.                                                                                                                     |
| Os usuários se beneficiam de maior eficiência de capital e podem sacar fundos da L2 sem atrasos.                                                                                                           | Os requisitos de hardware podem reduzir o número de participantes que podem forçar a cadeia a progredir, aumentando o risco de operadores mal-intencionados congelarem o estado do rollup e censurarem os usuários. |
| Não depende de suposições de vivacidade e os usuários não precisam validar a cadeia para proteger seus fundos.                                                                                              | Alguns sistemas de prova (por exemplo, ZK-SNARK) exigem uma configuração confiável que, se mal administrada, pode comprometer o modelo de segurança de um ZK-rollup.                                                     |
| Uma melhor compressão de dados pode ajudar a reduzir os custos de publicação de `calldata` no Ethereum e minimizar as taxas de rollup para os usuários.                                                                             |                                                                                                                                                                                                    |

### Uma explicação visual dos ZK-rollups {#zk-video}

Assista ao Finematics explicar os ZK-rollups:

<VideoWatch slug="rollups-scaling-strategy" startTime="406" />


## Quem está trabalhando em uma zkEVM? {#zkevm-projects}

<Alert variant="info">
<AlertEmoji text="💡" />
<AlertContent>
<AlertTitle>zkEVM para L2 vs L1</AlertTitle>
<AlertDescription>
Os projetos abaixo usam a tecnologia zkEVM para construir rollups de Camada 2. Também há pesquisas sobre o uso de zkEVM para [verificação de bloco L1](/roadmap/zkevm/), o que permitiria que os validadores verificassem os blocos do Ethereum sem reexecutar as transações.
</AlertDescription>
</AlertContent>
</Alert>

Os projetos que trabalham em zkEVMs incluem:

- **[zkEVM](https://github.com/privacy-scaling-explorations/zkevm-specs)** - _zkEVM é um projeto financiado pela Fundação Ethereum para desenvolver um ZK-rollup compatível com a EVM e um mecanismo para gerar provas de validade para blocos do Ethereum._

- **[Polygon zkEVM](https://polygon.technology/solutions/polygon-zkevm)** - _é um ZK Rollup descentralizado na rede principal do Ethereum trabalhando em uma Máquina Virtual Ethereum de conhecimento zero (zkEVM) que executa transações do Ethereum de forma transparente, incluindo contratos inteligentes com validações de prova de conhecimento zero._

- **[Scroll](https://scroll.io/blog/zkEVM)** - _A Scroll é uma empresa voltada para a tecnologia que trabalha na construção de uma solução nativa de Camada 2 zkEVM para o Ethereum._

- **[Taiko](https://taiko.xyz)** - _A Taiko é um ZK-rollup descentralizado e equivalente ao Ethereum (uma [ZK-EVM Tipo 1](https://vitalik.eth.limo/general/2022/08/04/zkevm.html))._

- **[ZKsync](https://docs.zksync.io/)** - _O ZKsync Era é um ZK Rollup compatível com a EVM construído pela Matter Labs, alimentado por sua própria zkEVM._

- **[Starknet](https://starkware.co/starknet/)** - _A Starknet é uma solução de escalabilidade de camada 2 compatível com a EVM construída pela StarkWare._

- **[Morph](https://www.morphl2.io/)** - _O Morph é uma solução de escalabilidade de rollup híbrido que utiliza prova ZK para resolver o problema de desafio de estado da Camada 2._

- **[Linea](https://linea.build)** - _A Linea é uma Camada 2 zkEVM equivalente ao Ethereum construída pela ConsenSys, totalmente alinhada com o ecossistema Ethereum._

## Leitura adicional sobre ZK-rollups {#further-reading-on-zk-rollups}

- [O que são rollups de conhecimento zero?](https://coinmarketcap.com/alexandria/glossary/zero-knowledge-rollups)
- [O que são rollups de conhecimento zero?](https://alchemy.com/blog/zero-knowledge-rollups)
- [O guia prático para rollups do Ethereum](https://web.archive.org/web/20241108192208/https://research.2077.xyz/the-practical-guide-to-ethereum-rollups)
- [STARKs vs SNARKs](https://consensys.net/blog/blockchain-explained/zero-knowledge-proofs-starks-vs-snarks/)
- [O que é uma zkEVM?](https://www.alchemy.com/overviews/zkevm)
- [Tipos de ZK-EVM: equivalente ao Ethereum, equivalente à EVM, Tipo 1, Tipo 4 e outras palavras da moda enigmáticas](https://taiko.mirror.xyz/j6KgY8zbGTlTnHRFGW6ZLVPuT0IV0_KmgowgStpA0K4)
- [Introdução à zkEVM](https://hackmd.io/@yezhang/S1_KMMbGt)
- [O que são L2s ZK-EVM?](https://linea.mirror.xyz/qD18IaQ4BROn_Y40EBMTUTdJHYghUtdECscSWyMvm8M)
- [Recursos Awesome-zkEVM](https://github.com/LuozhuZhang/awesome-zkevm)
- [ZK-SNARKS internamente](https://vitalik.eth.limo/general/2017/02/01/zk_snarks.html)
- [Como os SNARKs são possíveis?](https://vitalik.eth.limo/general/2021/01/26/snarks.html)

## Tutoriais: Privacidade e conhecimento zero no Ethereum {#tutorials}

- [Usando conhecimento zero para um estado secreto](/developers/tutorials/secret-state/) _– Como usar provas ZK e componentes de servidor offchain para manter o estado secreto do jogo onchain._
- [Usando endereços furtivos](/developers/tutorials/stealth-addr/) _– Como os endereços furtivos ERC-5564 permitem transferências anônimas de ETH usando derivação de chave criptográfica._
- [Usando o Ethereum para autenticação Web2](/developers/tutorials/ethereum-for-web2-auth/) _– Como integrar assinaturas de carteira Ethereum com sistemas de autenticação Web2 baseados em SAML._