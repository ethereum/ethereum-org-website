---
title: Validium
description: Uma introdução ao Validium como uma solução de escalabilidade atualmente utilizada pela comunidade Ethereum.
lang: pt-br
sidebarDepth: 3
---

Validium é uma [solução de escalabilidade](/developers/docs/scaling/) que impõe a integridade das transações usando provas de validade como os [ZK-rollups](/developers/docs/scaling/zk-rollups/), mas não armazena dados de transação na [Rede Principal do Ethereum](/). Embora a disponibilidade de dados offchain introduza concessões, ela pode levar a melhorias massivas na escalabilidade (validiums podem processar [~9.000 transações, ou mais, por segundo](https://blog.matter-labs.io/zkrollup-vs-validium-starkex-5614e38bc263)).

## Pré-requisitos {#prerequisites}

Você deve ter lido e compreendido nossa página sobre [escalabilidade do Ethereum](/developers/docs/scaling/) e [camada 2 (l2)](/layer-2).

## O que é validium? {#what-is-validium}

Validiums são soluções de escalabilidade que usam disponibilidade de dados e computação offchain projetadas para melhorar a vazão processando transações fora da Rede Principal do Ethereum. Assim como os rollups de conhecimento zero (ZK-rollups), os validiums publicam [provas de conhecimento zero](/glossary/#zk-proof) para verificar transações offchain no Ethereum. Isso evita transições de estado inválidas e aprimora as garantias de segurança de uma cadeia validium.

Essas "provas de validade" podem vir na forma de ZK-SNARKs (Zero-Knowledge Succinct Non-Interactive Argument of Knowledge) ou ZK-STARKs (Zero-Knowledge Scalable Transparent ARgument of Knowledge). Mais sobre [provas de conhecimento zero](https://consensys.net/blog/blockchain-explained/zero-knowledge-proofs-starks-vs-snarks/).

Os fundos pertencentes aos usuários de validium são controlados por um contrato inteligente no Ethereum. Os validiums oferecem saques quase instantâneos, muito parecido com o que os ZK-rollups fazem; uma vez que a prova de validade para uma solicitação de saque tenha sido verificada na Mainnet, os usuários podem sacar fundos fornecendo [provas de Merkle](/developers/tutorials/merkle-proofs-for-offline-data-integrity/). A prova de Merkle valida a inclusão da transação de saque do usuário em um lote de transações verificado, permitindo que o contrato onchain processe o saque.

No entanto, os usuários de validium podem ter seus fundos congelados e saques restritos. Isso pode acontecer se os gerenciadores de disponibilidade de dados na cadeia validium reterem dados de estado offchain dos usuários. Sem acesso aos dados de transação, os usuários não podem computar a prova de Merkle exigida para provar a propriedade dos fundos e executar saques.

Esta é a principal diferença entre validiums e ZK-rollups — suas posições no espectro de disponibilidade de dados. Ambas as soluções abordam o armazenamento de dados de forma diferente, o que tem implicações para a segurança e a desnecessidade de confiança.

## Como os validiums interagem com o Ethereum? {#how-do-validiums-interact-with-ethereum}

Validiums são protocolos de escalabilidade construídos sobre a cadeia existente do Ethereum. Embora execute transações offchain, uma cadeia validium é administrada por uma coleção de contratos inteligentes implantados na Mainnet, incluindo:

1. **Contrato verificador**: O contrato verificador verifica a validade das provas enviadas pelo operador do validium ao fazer atualizações de estado. Isso inclui provas de validade atestando a correção das transações offchain e provas de disponibilidade de dados verificando a existência de dados de transação offchain.

2. **Contrato principal**: O contrato principal armazena compromissos de estado (raízes de Merkle) enviados pelos produtores de blocos e atualiza o estado do validium assim que uma prova de validade é verificada onchain. Este contrato também processa depósitos e saques da cadeia validium.

Os validiums também dependem da cadeia principal do Ethereum para o seguinte:

### Liquidação {#settlement}

As transações executadas em um validium não podem ser totalmente confirmadas até que a cadeia pai verifique sua validade. Todos os negócios conduzidos em um validium devem eventualmente ser liquidados na Mainnet. A blockchain do Ethereum também fornece "garantias de liquidação" para usuários de validium, o que significa que as transações offchain não podem ser revertidas ou alteradas uma vez comprometidas onchain.

### Segurança {#security}

O Ethereum, atuando como uma camada de liquidação, também garante a validade das transições de estado no validium. As transações offchain executadas na cadeia validium são verificadas por meio de um contrato inteligente na camada base do Ethereum.

Se o contrato verificador onchain considerar a prova inválida, as transações são rejeitadas. Isso significa que os operadores devem satisfazer as condições de validade impostas pelo protocolo Ethereum antes de atualizar o estado do validium.

## Como o validium funciona? {#how-does-validium-work}

### Transações {#transactions}

Os usuários enviam transações para o operador, um nó responsável por executar transações na cadeia validium. Alguns validiums podem usar um único operador para executar a cadeia ou depender de um mecanismo de [Prova de Participação (PoS)](/developers/docs/consensus-mechanisms/pos/) para alternar os operadores.

O operador agrega as transações em um lote e o envia a um circuito de prova para ser provado. O circuito de prova aceita o lote de transações (e outros dados relevantes) como entradas e produz uma prova de validade verificando se as operações foram realizadas corretamente.

### Compromissos de estado {#state-commitments}

O estado do validium é transformado em hash como uma árvore de Merkle com a raiz armazenada no contrato principal no Ethereum. A raiz de Merkle, também conhecida como raiz de estado, atua como um compromisso criptográfico com o estado atual das contas e saldos no validium.

Para realizar uma atualização de estado, o operador deve computar uma nova raiz de estado (após executar as transações) e enviá-la ao contrato onchain. Se a prova de validade for confirmada, o estado proposto é aceito e o validium muda para a nova raiz de estado.

### Depósitos e saques {#deposits-and-withdrawals}

Os usuários movem fundos do Ethereum para um validium depositando ETH (ou qualquer token compatível com ERC) no contrato onchain. O contrato retransmite o evento de depósito para o validium offchain, onde o endereço do usuário é creditado com um valor igual ao seu depósito. O operador também inclui essa transação de depósito em um novo lote.

Para mover fundos de volta para a Mainnet, um usuário de validium inicia uma transação de saque e a envia ao operador, que valida a solicitação de saque e a inclui em um lote. Os ativos do usuário na cadeia validium também são destruídos antes que eles possam sair do sistema. Uma vez que a prova de validade associada ao lote é verificada, o usuário pode chamar o contrato principal para sacar o restante de seu depósito inicial.

Como um mecanismo anticensura, o protocolo validium permite que os usuários saquem diretamente do contrato validium sem passar pelo operador. Neste caso, os usuários precisam fornecer uma prova de Merkle ao contrato verificador mostrando a inclusão de uma conta na raiz de estado. Se a prova for aceita, o usuário pode chamar a função de saque do contrato principal para retirar seus fundos do validium.

### Envio de lote {#batch-submission}

Após executar um lote de transações, o operador envia a prova de validade associada ao contrato verificador e propõe uma nova raiz de estado ao contrato principal. Se a prova for válida, o contrato principal atualiza o estado do validium e finaliza os resultados das transações no lote.

Diferente de um ZK-rollup, os produtores de blocos em um validium não são obrigados a publicar dados de transação para lotes de transações (apenas cabeçalhos de bloco). Isso torna o validium um protocolo de escalabilidade puramente offchain, em oposição aos protocolos de escalabilidade "híbridos" (ou seja, [camada 2 (l2)](/layer-2/)) que publicam dados de estado na cadeia principal do Ethereum usando dados de blob, `calldata`, ou uma combinação de ambos.

### Disponibilidade de dados {#data-availability}

Como mencionado, os validiums utilizam um modelo de disponibilidade de dados offchain, onde os operadores armazenam todos os dados de transação fora da Rede Principal do Ethereum. A baixa pegada de dados onchain do validium melhora a escalabilidade (a vazão não é limitada pela capacidade de processamento de dados do Ethereum) e reduz as taxas do usuário (o custo de publicar dados onchain é menor).

A disponibilidade de dados offchain, no entanto, apresenta um problema: os dados necessários para criar ou verificar provas de Merkle podem estar indisponíveis. Isso significa que os usuários podem ser incapazes de sacar fundos do contrato onchain se os operadores agirem de forma maliciosa.

Várias soluções de validium tentam resolver esse problema descentralizando o armazenamento de dados de estado. Isso envolve forçar os produtores de blocos a enviar os dados subjacentes para "gerenciadores de disponibilidade de dados" responsáveis por armazenar dados offchain e disponibilizá-los aos usuários mediante solicitação.

Os gerenciadores de disponibilidade de dados no validium atestam a disponibilidade de dados para transações offchain assinando cada lote do validium. Essas assinaturas constituem uma forma de "prova de disponibilidade" que o contrato verificador onchain verifica antes de aprovar atualizações de estado.

Os validiums diferem em sua abordagem para o gerenciamento de disponibilidade de dados. Alguns dependem de partes confiáveis para armazenar dados de estado, enquanto outros usam validadores atribuídos aleatoriamente para a tarefa.

#### Comitê de disponibilidade de dados (DAC) {#data-availability-committee}

Para garantir a disponibilidade de dados offchain, algumas soluções de validium nomeiam um grupo de entidades confiáveis, conhecidas coletivamente como um comitê de disponibilidade de dados (DAC), para armazenar cópias do estado e fornecer prova de disponibilidade de dados. Os DACs são mais fáceis de implementar e exigem menos coordenação, já que o número de membros é baixo.

No entanto, os usuários devem confiar no DAC para disponibilizar os dados quando necessário (por exemplo, para gerar provas de Merkle). Existe a possibilidade de membros de comitês de disponibilidade de dados [serem comprometidos por um ator malicioso](https://notes.ethereum.org/DD7GyItYQ02d0ax_X-UbWg?view) que pode então reter dados offchain.

[Mais sobre comitês de disponibilidade de dados em validiums](https://medium.com/starkware/data-availability-e5564c416424).

#### Disponibilidade de dados vinculada {#bonded-data-availability}

Outros validiums exigem que os participantes encarregados de armazenar dados offline façam stake (ou seja, bloqueiem) de tokens em um contrato inteligente antes de assumir suas funções. Esse stake serve como uma "garantia" para garantir um comportamento honesto entre os gerenciadores de disponibilidade de dados e reduz as premissas de confiança. Se esses participantes não conseguirem provar a disponibilidade de dados, a garantia sofre penalização.

Em um esquema de disponibilidade de dados vinculada, qualquer pessoa pode ser designada para manter dados offchain, desde que forneça o stake exigido. Isso expande o grupo de gerenciadores de disponibilidade de dados elegíveis, reduzindo a centralização que afeta os comitês de disponibilidade de dados (DACs). Mais importante ainda, essa abordagem depende de incentivos criptoeconômicos para evitar atividades maliciosas, o que é consideravelmente mais seguro do que nomear partes confiáveis para proteger dados offline no validium.

[Mais sobre disponibilidade de dados vinculada em validiums](https://blog.matter-labs.io/zkporter-a-breakthrough-in-l2-scaling-ed5e48842fbf).

## Volitions e validium {#volitions-and-validium}

Os validiums oferecem muitos benefícios, mas vêm com concessões (mais notavelmente, a disponibilidade de dados). Mas, como acontece com muitas soluções de escalabilidade, os validiums são adequados para casos de uso específicos — e é por isso que as volitions foram criadas.

As volitions combinam um ZK-rollup e uma cadeia validium e permitem que os usuários alternem entre as duas soluções de escalabilidade. Com as volitions, os usuários podem aproveitar a disponibilidade de dados offchain do validium para certas transações, mantendo a liberdade de mudar para uma solução de disponibilidade de dados onchain (ZK-rollup) se necessário. Isso essencialmente dá aos usuários a liberdade de escolher as concessões conforme ditado por suas circunstâncias únicas.

Uma exchange descentralizada (DEX) pode preferir usar a infraestrutura escalável e privada de um validium para negociações de alto valor. Ela também pode usar um ZK-rollup para usuários que desejam as maiores garantias de segurança e a desnecessidade de confiança de um ZK-rollup.

## Validiums e compatibilidade com a EVM {#validiums-and-evm-compatibility}

Assim como os ZK-rollups, os validiums são mais adequados para aplicativos simples, como trocas de tokens e pagamentos. Suportar computação geral e execução de contratos inteligentes entre validiums é difícil de implementar, dado o considerável custo adicional de provar instruções da [EVM](/developers/docs/evm/) em um circuito de prova de conhecimento zero.

Alguns projetos de validium tentam contornar esse problema compilando linguagens compatíveis com a EVM (por exemplo, Solidity, Vyper) para criar um bytecode personalizado otimizado para provas eficientes. Uma desvantagem dessa abordagem é que novas VMs amigáveis a provas de conhecimento zero podem não suportar opcodes importantes da EVM, e os desenvolvedores precisam escrever diretamente na linguagem de alto nível para uma experiência ideal. Isso cria ainda mais problemas: força os desenvolvedores a construir dapps com uma pilha de desenvolvimento totalmente nova e quebra a compatibilidade com a infraestrutura atual do Ethereum.

Algumas equipes, no entanto, estão tentando otimizar os opcodes existentes da EVM para circuitos de prova ZK. Isso resultará no desenvolvimento de uma Máquina Virtual Ethereum de conhecimento zero (zkEVM), uma VM compatível com a EVM que produz provas para verificar a correção da execução do programa. Com uma zkEVM, as cadeias validium podem executar contratos inteligentes offchain e enviar provas de validade para verificar uma computação offchain (sem ter que reexecutá-la) no Ethereum.

[Mais sobre zkEVMs](https://www.alchemy.com/overviews/zkevm).

## Como os validiums escalam o Ethereum? {#scaling-ethereum-with-validiums}

### 1. Armazenamento de dados offchain {#offchain-data-storage}

Projetos de escalabilidade de camada 2 (l2), como rollups otimistas e ZK-rollups, trocam a escalabilidade infinita de protocolos de escalabilidade puramente offchain (por exemplo, [Plasma](/developers/docs/scaling/plasma/)) por segurança ao publicar alguns dados de transação na L1. Mas isso significa que as propriedades de escalabilidade dos rollups são limitadas pela largura de banda de dados na Rede Principal do Ethereum (o [sharding de dados](/roadmap/danksharding/) propõe melhorar a capacidade de armazenamento de dados do Ethereum por esse motivo).

Os validiums alcançam escalabilidade mantendo todos os dados de transação offchain e apenas publicam compromissos de estado (e provas de validade) ao retransmitir atualizações de estado para a cadeia principal do Ethereum. A existência de provas de validade, no entanto, dá aos validiums maiores garantias de segurança do que outras soluções de escalabilidade puramente offchain, incluindo Plasma e [sidechains](/developers/docs/scaling/sidechains/). Ao reduzir a quantidade de dados que o Ethereum precisa processar antes de validar transações offchain, os designs de validium estendem muito a vazão na Mainnet.

### 2. Provas recursivas {#recursive-proofs}

Uma prova recursiva é uma prova de validade que verifica a validade de outras provas. Essas "provas de provas" são geradas agregando recursivamente várias provas até que uma prova final verificando todas as provas anteriores seja criada. As provas recursivas escalam as velocidades de processamento da blockchain aumentando o número de transações que podem ser verificadas por prova de validade.

Normalmente, cada prova de validade que o operador do validium envia ao Ethereum para verificação valida a integridade de um único bloco. Considerando que uma única prova recursiva pode ser usada para confirmar a validade de vários blocos de validium ao mesmo tempo — isso é possível já que o circuito de prova pode agregar recursivamente várias provas de bloco em uma prova final. Se o contrato verificador onchain aceitar a prova recursiva, todos os blocos subjacentes são finalizados imediatamente.

## Prós e contras do validium {#pros-and-cons-of-validium}

| Prós | Contras |
| --- | --- |
| As provas de validade impõem a integridade das transações offchain e impedem que os operadores finalizem atualizações de estado inválidas. | A produção de provas de validade requer hardware especial, o que representa um risco de centralização. |
| Aumenta a eficiência de capital para os usuários (sem atrasos na retirada de fundos de volta para o Ethereum). | Suporte limitado para computação geral/contratos inteligentes; linguagens especializadas necessárias para o desenvolvimento. |
| Não é vulnerável a certos ataques econômicos enfrentados por sistemas baseados em provas de fraude em aplicativos de alto valor. | Alto poder computacional necessário para gerar provas ZK; não é rentável para aplicativos de baixa vazão. |
| Reduz as taxas de gás para os usuários por não publicar dados de chamada na Rede Principal do Ethereum. | Tempo de finalidade subjetiva mais lento (10-30 min para gerar uma prova ZK), mas mais rápido para a finalidade completa porque não há atraso de tempo de disputa. |
| Adequado para casos de uso específicos, como negociação ou jogos em blockchain que priorizam a privacidade e a escalabilidade das transações. | Os usuários podem ser impedidos de sacar fundos, já que a geração de provas de Merkle de propriedade exige que os dados offchain estejam disponíveis o tempo todo. |
| A disponibilidade de dados offchain fornece níveis mais altos de vazão e aumenta a escalabilidade. | O modelo de segurança depende de premissas de confiança e incentivos criptoeconômicos, ao contrário dos ZK-rollups, que dependem puramente de mecanismos de segurança criptográfica. |

### Use Validium/Volitions {#use-validium-and-volitions}

Vários projetos fornecem implementações de Validium e volitions que você pode integrar em seus dapps:

**StarkWare StarkEx** - _StarkEx é uma solução de escalabilidade de camada 2 (l2) do Ethereum baseada em provas de validade. Ela pode operar nos modos de disponibilidade de dados ZK-Rollup ou Validium._

- [Documentação](https://docs.starkware.co/starkex-v4/starkex-deep-dive/data-availability-modes#validium)
- [Site](https://starkware.co/starkex/)

**Matter Labs zkPorter** - _zkPorter é um protocolo de escalabilidade de camada 2 (l2) que aborda a disponibilidade de dados com uma abordagem híbrida que combina as ideias de zkRollup e sharding. Ele pode suportar arbitrariamente muitos fragmentos, cada um com sua própria política de disponibilidade de dados._

- [Blog](https://blog.matter-labs.io/zkporter-a-breakthrough-in-l2-scaling-ed5e48842fbf)
- [Documentação](https://docs.zksync.io/zksync-protocol/rollup/data-availability)
- [Site](https://zksync.io/)

## Leitura adicional {#further-reading}

- [Validium e a Camada 2 Dois-Por-Dois — Edição Nº 99](https://www.buildblockchain.tech/newsletter/issues/no-99-validium-and-the-layer-2-two-by-two)
- [ZK-rollups vs Validium](https://blog.matter-labs.io/zkrollup-vs-validium-starkex-5614e38bc263)
- [Volition e o Espectro Emergente de Disponibilidade de Dados](https://medium.com/starkware/volition-and-the-emerging-data-availability-spectrum-87e8bfa09bb)
- [O Guia Prático para Rollups do Ethereum](https://web.archive.org/web/20241108192208/https://research.2077.xyz/the-practical-guide-to-ethereum-rollups)