---
title: Validium
description: Uma introdução ao Validium como uma solução de dimensionamento atualmente utilizada pela comunidade Ethereum.
lang: pt-br
sidebarDepth: 3
---

Validium é uma [solução de dimensionamento](/developers/docs/scaling/) que reforça a integridade de transações usando provas de validade como [ZK-rollups](/developers/docs/scaling/zk-rollups/), mas não armazena dados de transação na rede principal do Ethereum. Embora a disponibilidade de dados off-chain introduz compromissos, ela pode levar a enormes melhorias de dimensionamento (validiums podem processar [cerca de 9.000 transações ou mais, por segundo](https://blog.matter-labs.io/zkrollup-vs-validium-starkex-5614e38bc263)).

## Pré-requisitos {#prerequisites}

Você deve ler e entender mais sobre em nossa página [Dimensionamento Ethereum](/developers/docs/scaling/) e [camada 2](/layer-2).

## O que é validium? {#what-is-validium}

Validiums são soluções de dimensionamento que usam a disponibilidade de dados off-chain e computação projetadas para melhorar a taxa de transferência processando transações fora da rede principal do Ethereum. Como rollups de conhecimento zero (ZK-rollups), os validiums publicam [provas de conhecimento zero](/glossary/#zk-proof) para verificar transações off-chain no Ethereum. Isso impede transições de estado inválidas e melhora as garantias de segurança de uma cadeia validium.

Essas "provas de validade" podem vir na forma de ZK-SNARKs (Zero-Knowledge Succinct Non-Interactive Argument of Knowledge) ou ZK-STARKs (Zero-Knowledge Scalable Transparent ARgument of Knowledge). Mais sobre [provas de conhecimento zero](https://consensys.net/blog/blockchain-explained/zero-knowledge-proofs-starks-vs-snarks/).

Fundos pertencentes a usuários validium são controlados por um contrato inteligente no Ethereum. Os validiums oferecem saques quase instantâneos, muito parecidos com ZK-rollups; uma vez que a prova de validade para uma solicitação de retirada tenha sido verificada na rede principal, os usuários podem retirar fundos fornecendo [provas Merkle](/developers/tutorials/merkle-proofs-for-offline-data-integrity/). A prova Merkle valida a inclusão da transação de retirada do usuário em um lote de transação verificado, permitindo o contrato on-chain processar a retirada.

No entanto, usuários validium podem ter seus fundos congelados e retiradas restritas. Isso pode acontecer se os gerentes de disponibilidade de dados na cadeia validium retiverem dados de estado off-chain de usuários. Sem acesso a dados de transação, os usuários não podem calcular a prova de Merkle necessária para provar a propriedade de fundos e executar retiradas.

Esta é a maior diferença entre validiums e ZK-rollups: suas posições sobre o espectro de disponibilidade de dados. Ambas as soluções abordam o armazenamento de dados de forma diferente, o que tem implicações para a segurança e a não necessidade de confiança.

## Como os validiums interagem com o Ethereum? {#how-do-validiums-interact-with-ethereum}

Validiums são protocolos de dimensionamento criados sobre a cadeia Ethereum existente. Embora execute transações off-chain, uma cadeia validium é administrada por uma coleção de contratos inteligentes implantados na rede principal, incluindo:

1. **Contrato verificador**: o contrato verificador verifica a validade das provas submetidas pelo operador validium ao fazer atualizações no estado. Isso inclui provas de validade que atestam a exatidão das transações off-chain e provas de disponibilidade de dados verificando a existência de dados de transações off-chain.

2. **Contrato principal**: o contrato principal armazena os compromissos do estado (Merkle roots) enviados por produtores de blocos e atualiza o estado do validium, uma vez que uma prova do validium é verificada on-chain. Este contrato também processa tanto saques quanto depósitos para a cadeia validium.

Validiums também dependem da principal cadeia de Ethereum para o seguinte:

### Liquidação {#settlement}

Transações executadas em um validium não podem ser totalmente confirmadas até que a cadeia pai verifique sua validade. Todos os negócios realizados em um validium devem eventualmente ser estabelecidos na rede principal. A blockchain Ethereum também fornece "garantias de liquidação" para usuários validium, o que significa que as transações off-chain não podem ser revertidas ou alteradas uma vez gravadas on-chain.

### Segurança {#security}

Ethereum, atuando como uma camada de liquidação, também garante a validade das transições de estado no validium. As transações off-chain executadas na cadeia de validium são verificadas através de um contrato inteligente na camada base do Ethereum.

Se o contrato do verificador on-chain considerar a prova inválida, as transações serão rejeitadas. Isto significa que os operadores devem satisfazer as condições de validade impostas pelo protocolo Ethereum antes de atualizar o estado do validium.

## Como funciona o validium? {#how-does-validium-work}

### Transações {#transactions}

Os usuários enviam transações para o operador, um nó responsável por executar transações na cadeia de validium. Alguns validiums podem usar um único operador para executar a cadeia ou depender de um mecanismo de [prova de participação (PoS)](/developers/docs/consensus-mechanisms/pos/) para rotar os operadores.

O operador agrega as transações em um lote e envia para um circuito de prova para testar. O circuito de prova aceita o lote de transação (e outros dados relevantes) como entradas e produz como saída uma prova de validade verificando que as operações foram executadas corretamente.

### Compromissos com o estado {#state-commitments}

O estado do validium é em hash como uma árvore Merkle, com a raiz armazenada no contrato principal no Ethereum. A raiz de Merkle, também conhecida como a raiz do estado, atua como um compromisso criptográfico com o estado atual das contas e saldos no validium.

Para executar uma atualização de estado, o operador deve calcular uma nova raiz de estado (depois de executar transações) e enviá-la ao contrato on-chain. Se a prova de validade confirmar, o estado proposto é aceito e o validium muda para a nova raiz do estado.

### Depósitos e retiradas {#deposits-and-withdrawals}

Os usuários movem fundos do Ethereum para um validium depositando ETH (ou qualquer token compatível com ERC) no contrato on-chain. O contrato transmite o evento de depósito para o validium off-chain, em que o endereço do usuário é creditado com um valor igual ao seu depósito. O operador também inclui esta transação de depósito em um novo lote.

Para mover os fundos de volta para a Mainnet, um usuário de validium inicia uma transação de retirada e a envia ao operador que valida o pedido de retirada e o inclui em um lote. Os ativos do usuário na cadeia de validium também são destruídos antes que eles possam sair do sistema. Uma vez que a prova de validade associada ao lote é verificada, o usuário pode chamar o contrato principal para retirar o restante do seu depósito inicial.

Como um mecanismo anticensura, o protocolo de validium permite que os usuários retirem diretamente do contrato de validium sem passar pelo operador. Neste caso, os usuários precisam fornecer uma prova Merkle para o contrato verificador mostrando a inclusão de uma conta na raiz do estado. Se a prova for aceita, o usuário poderá chamar a função de retirada principal do contrato para tirar seus fundos do validium.

### Envio em lote {#batch-submission}

Após executar um lote de transações, o operador submete a prova de validade associada ao contrato verificador e propõe uma nova raiz do estado para o contrato principal. Se a prova for válida, o contrato principal atualizará o estado do validium e finalizará os resultados das transações do lote.

Ao contrário de uma ZK-rollup, produtores de blocos em um validium não são obrigados a publicar dados de transações para transação em lotes (apenas cabeçalhos do bloco). Isso faz do validium um protocolo de dimensionamento puramenteoff-chain, ao contrário de protocolos de dimensionamento "híbridos" (ou seja, [camada 2](/layer-2/)) que publicam dados de estado na cadeia principal do Ethereum como `calldata`.

### Disponibilidade de dados {#data-availability}

Como mencionado, os validiums atuais utilizam um modelo de disponibilidade de dados off-chain em que os operadores armazenam todos os dados de transação fora da rede principal do Ethereum. A baixa pegada de dados on-chain do validium melhora o dimensionamento (a transferência não é limitada pela capacidade de processamento de dados do Ethereum) e reduz as taxas de usuário (o custo de publicação de `calldata` é menor).

No entanto, a disponibilidade de dados off-chain apresenta um problema: os dados necessários para a criação ou verificação de provas Merkle podem estar indisponíveis. Isto significa que os utilizadores poderão não conseguir retirar fundos do contrato on-chain se os operadores agirem de forma maliciosa.

Várias soluções validium tentam resolver este problema descentralizando o armazenamento de dados do estado. Isso envolve forçar os produtores de blocos a enviar os dados subjacentes a "gerentes de disponibilidade de dados" responsáveis por armazenar dados off-chain e disponibilizá-los aos usuários a pedido.

Gerentes de disponibilidade de dados em validium atestam a disponibilidade de dados para transações off-chain, assinando todos os lotes de validium. Estas assinaturas constituem uma forma de "prova de disponibilidade" que o contrato verificador on-chain checa antes de aprovar atualizações de estado.

Validiums diferem em sua abordagem da gestão da disponibilidade de dados. Alguns dependem de partes confiáveis para armazenar dados de estado, enquanto outros usam validadores atribuídos aleatoriamente para a tarefa.

#### Comitê de disponibilidade de dados (DAC) {#data-availability-committee}

Para garantir a disponibilidade de dados off-chain, algumas soluções validium nomeiam um grupo de entidades confiáveis, coletivamente conhecido como um comitê de disponibilidade de dados (DAC), para armazenar cópias do estado e fornecer uma prova de disponibilidade de dados. Os DACs são mais fáceis de implementar e exigem menos coordenação, uma vez que a adesão é baixa.

No entanto, os usuários devem confiar no DAC para disponibilizar os dados quando necessário (por exemplo, para a geração de provas de Merkle). Existe a possibilidade de membros dos comitês de disponibilidade de dados [serem comprometidos por um ator malicioso](https://notes.ethereum.org/DD7GyItYQ02d0ax_X-UbWg?view) que pode então reter dados off-chain.

[Mais sobre comissões de disponibilidade de dados em validiums](https://medium.com/starkware/data-availability-e5564c416424).

#### Disponibilidade de dados vinculados {#bonded-data-availability}

Outros validiums exigem que os participantes sejam cobrados com o armazenamento de dados offline para fazer staking (ou seja, bloquear) tokens em um contrato inteligente antes de assumir suas funções. Este stake serve como uma "obrigação" para garantir um comportamento honesto entre os gerentes de disponibilidade de dados e reduzir as suposições de confiança. Se esses participantes não conseguirem provar a disponibilidade de dados, o vínculo será reduzido.

Em um esquema de disponibilidade de dados vinculado, qualquer um pode ser atribuído para armazenar dados off-chain assim que eles fornecem o stake necessário. Isto expande o pool de gestores de disponibilidade de dados elegíveis, reduzindo a centralização que afeta os comitês de disponibilidade de dados (DAC). Mais importante, essa abordagem depende de incentivos criptoeconômicos para evitar atividade maliciosa, que é consideravelmente mais seguro do que a nomeação de partes de confiança para proteger dados offline no validium.

[Mais sobre a disponibilidade de dados vinculados em validiums](https://blog.matter-labs.io/zkporter-a-breakthrough-in-l2-scaling-ed5e48842fbf).

## Volitions e validium {#volitions-and-validium}

Validiums oferecem muitos benefícios, mas também algumas desvantagens, principalmente com respeito à disponibilidade de dados. Mas, como em muitas soluções de dimensionamento, os validiums são adequados a casos de uso específicos. E é por isso que as volitions foram criadas.

Volitions combinam um ZK-rollup e uma cadeia validium e permitem que os usuários alternem entre as duas soluções de dimensionamento. Com volitions, os usuários podem aproveitar a disponibilidade de dados off-chain do validium para certas transações, mantendo a liberdade de mudar para uma solução de disponibilidade de dados on-chain (ZK-rollup), se necessário. Isto essencialmente dá aos usuários a liberdade de escolherem do que abrir mão ou não de acordo com as circunstâncias únicas deles.

Uma exchange descentralizada (DEX) pode preferir usar uma infraestrutura validium dimensionável e particular para negociações de alto valor. Também pode usar uma ZK-rollup para usuários que queiram maiores garantias de segurança e sem necessidade de confiança de um ZK-rollup.

## Validiums e compatibilidade com EVM {#validiums-and-evm-compatibility}

Como os ZK-rollups, os validiums são geralmente adequados a aplicativos simples, como swaps de tokens e pagamentos. É difícil oferecer suporte à computação geral e à execução do contrato inteligente entre validiums, dada a sobrecarga considerável de provar instruções [EVM](/developers/docs/evm/) em um circuito de prova de conhecimento zero.

Alguns projetos de validium tentam contornar este problema compilando linguagens compatíveis com EVM (por exemplo, Solidity, Vyper) para criar bytecode personalizado otimizado para uma prova eficiente. Uma desvantagem desta abordagem é que novas VMs amigáveis a conhecimento zero podem não suportar importantes opcodes EVM, e os desenvolvedores devem escrever diretamente na linguagem geral para uma experiência ideal. Isso cria ainda mais problemas: força os desenvolvedores a desenvolver dapps com uma pilha de desenvolvimento inteiramente nova e quebra a compatibilidade com a atual infraestrutura do Ethereum.

Algumas equipes, no entanto, estão tentando otimizar opcodes de EVM existentes para os circuitos de prova ZK. Isto resultará no desenvolvimento de uma Máquina Virtual Ethereum de conhecimento zero (zkEVM), uma VM compatível com EVM que produz provas para verificar a exatidão da execução do programa. Com um zkEVM, as cadeias de validium podem executar contratos inteligentes off-chain e submeter provas de validade para verificar uma computação off-chain (sem ter que executá-lo novamente) no Ethereum.

[Mais sobre zkEVMs](https://www.alchemy.com/overviews/zkevm).

## Como os validiums dimensionam o Ethereum? {#scaling-ethereum-with-validiums}

### 1. Armazenamento de dados off-chain {#off-chain-data-storage}

Projetos de dimensionamento de camada 2, como optimistic rollups e ZK-rollups, negociam o dimensionamento infinito de protocolos de dimensionamento off-chain puros (por exemplo, [Plasma](/developers/docs/scaling/plasma/)) para fins de segurança, publicando alguns dados de transação na L1. Mas isso significa que as propriedades de dimensionamento dos rollups são limitadas pela largura de banda na Mainnet (Rede principal) do Ethereum (a [fragmentação (sharding) de dados](/roadmap/danksharding/) propõe melhorar a capacidade de armazenamento de dados do Ethereum por este motivo).

Os validiums alcançam o dimensionamento mantendo todos os dados de transação off-chain e apenas publicando compromissos do estado (e provas de validade) ao transmitir atualizações de estado para a cadeia principal do Ethereum. A existência de provas de validade, no entanto, dá aos validiums garantias de segurança mais elevadas do que outras soluções de dimensionamento off-chain puras, incluindo Plasma e [sidechains](/developers/docs/scaling/sidechains/). Ao reduzir a quantidade de dados que o Ethereum precisa processar antes de validar transações off-chain, os desenhos de validiums estendem muito a taxa de transferência na rede principal.

### 2. Provas recursivas {#recursive-proofs}

Uma prova recursiva é uma prova de validade que verifica a validade de outras provas. Essas "prova de provas" são geradas recursivamente agregando várias provas até que uma última prova que verifica todas as provas anteriores seja criada. As provas recursivas aumentam a velocidade de processamento da blockchain aumentando o número de transações que podem ser verificadas por prova de validade.

Normalmente, cada prova de validade que o operador validium submete para o Ethereum para verificação valida a integridade de um único bloco. Uma única prova recursiva pode ser usada para confirmar a validade de vários blocos validium ao mesmo tempo, e isso é possível porque o circuito de prova pode recursivamente agregar várias provas de bloco em uma prova final. Se o contrato do verificador on-chain aceitar a prova recursiva, todos os blocos subjacentes serão finalizados imediatamente.

## Prós e contras do validium {#pros-and-cons-of-validium}

| Prós                                                                                                                                       | Contras                                                                                                                                                                                  |
| ------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Provas de validade reforçam a integridade das transações off-chain e impedem que os operadores finalizem atualizações de estado inválidas. | Produzir provas de validade requer hardware especial, o que representa um risco de centralização.                                                                                        |
| Aumenta a eficiência do capital para os usuários (sem atrasos na retirada dos fundos para o Ethereum)                                      | Suporte limitado para computação geral/contratos inteligentes; linguagens especializadas necessárias para desenvolvimento.                                                               |
| Não vulnerável a certos ataques econômicos enfrentados por sistemas baseados em fraudes em aplicativos de elevado valor.                   | Alto poder computacional necessário para gerar provas ZK; a relação custo-benefício não é vantajosa para aplicativos de baixa taxa de transmissão.                                       |
| Reduz as taxas de gás para os usuários ao não publicar calldata para a rede principal do Ethereum.                                         | Tempo de finalidade subjetiva mais lento (de 10 a 30 minutos para gerar uma prova de ZK), porém mais rápido para a finalidade completa porque não há nenhum atraso no tempo de disputas. |
| Adequado para casos de uso específicos, como trading ou jogos de blockchain que priorizam a privacidade de transações e o dimensionamento. | Os usuários podem ser impedidos de sacar fundos já que a geração de provas de propriedade Merkle requer que dados off-chain estejam disponíveis em todos os momentos.                    |
| A disponibilidade de dados off-chain fornece níveis mais elevados de transferência e aumenta o dimensionamento.                            | O modelo de segurança se baseia em suposições de confiança e incentivos criptoeconômicos, ao contrário dos ZK-rollups, que dependem apenas de mecanismos de segurança criptográficos.    |

### Uso de validium/volitions {#use-validium-and-volitions}

Vários projetos fornecem implementações de validium e volitions que você pode integrar aos seus dapps:

**StarkWare StarkEx**: _StarkEx é uma solução de dimensionamento de camada 2 (L2) do Ethereum que é baseada em provas de validade. Pode operar em modos de disponibilidade de dados ZK-Rollup ou Validium._

- [Documentação](https://docs.starkware.co/starkex-v4/starkex-deep-dive/data-availability-modes#validium)
- [Website](https://starkware.co/starkex/)

**Matter Labs zkPorter**: _zkPorter é um protocolo de dimensionamento de camada 2 que aborda a disponibilidade de dados com uma abordagem híbrida que combina os conceitos de zkRollup e sharding. Pode suportar arbitrariamente muitos shards, cada um com sua própria política de disponibilidade de dados._

- [Blog](https://blog.matter-labs.io/zkporter-a-breakthrough-in-l2-scaling-ed5e48842fbf)
- [Documentação](https://docs.zksync.io/zk-stack/concepts/data-availability)
- [Website](https://zksync.io/)

## Leitura adicional {#further-reading}

- [Validium e a camada 2 juntos – Edição nº 99](https://www.buildblockchain.tech/newsletter/issues/no-99-validium-and-the-layer-2-two-by-two)
- [ZK-rollups vs Validium](https://blog.matter-labs.io/zkrollup-vs-validium-starkex-5614e38bc263)
- [Volition e o espectro emergente de disponibilidade de dados](https://medium.com/starkware/volition-and-the-emerging-data-availability-spectrum-87e8bfa09bb)
- [Rollups, Validiums, e Volitions: aprenda sobre as soluções de dimensionamento mais recentes do Ethereum](https://www.defipulse.com/blog/rollups-validiums-and-volitions-learn-about-the-hottest-ethereum-scaling-solutions)
