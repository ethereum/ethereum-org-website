---
title: Disponibilidade de dados
description: Uma visão geral dos problemas e soluções relacionados à disponibilidade de dados no Ethereum
lang: pt-br
---

A falta de confiança é uma premissa importante das blockchains públicas ("não confie, verifique"). Uma das maneiras pelas quais o Ethereum reduz as suposições de confiança é aplicando regras sobre a disponibilidade de dados. Os produtores de blocos são obrigados a publicar os dados para cada bloco, cujos nós participantes do consenso do Ethereum armazenam localmente.

Todos os nós da rede Ethereum executam as transações em blocos que recebem dos pares para garantir que as mudanças propostas por um produtor de bloco correspondam com precisão àquelas computadas independentemente pelo nó. É assim que os nós verificam que as novas informações são válidas, ao invés de ter que confiar que os produtores de blocos são honestos. Isso não é possível se algum dado estiver faltando.

A disponibilidade de dados é importante porque se não pudemos reproduzir algo com os dados que temos disponíveis, do ponto de vista da blockchain, isso não existe. O acesso aos dados do bloco permite que os nós de validação reproduzam transações sem confiança, usando sua versão do estado geral do Ethereum e verifiquem independentemente a exatidão de cada bloco.

## Pré-requisitos {#prerequisites}

Você deve ter uma boa compreensão dos [fundamentos da blockchain](/developers/docs/intro-to-ethereum/), especialmente sobre [mecanismos de consenso](/developers/docs/consensus-mechanisms/). Esta página também pressupõe que o leitor esteja familiarizado com [blocos](/developers/docs/blocks/), [transações](/developers/docs/transactions/), [nós](/developers/docs/nodes-and-clients/), [soluções de dimensionamento](/developers/docs/scaling/) e outros tópicos relevantes.

## O que é a disponibilidade de dados? {#what-is-data-availability}

A disponibilidade de dados é a garantia de que o proponente do bloco publicou todos os dados de transação de um bloco e que os dados de transação estão disponíveis para outros participantes da rede. Transações Ethereum são processadas em [blocos](/developers/docs/blocks/). Esses blocos são encadeados juntos para formar a "blockchain".

Cada bloco tem duas partes principais:

- O **cabeçalho do bloco**: contém informações gerais (metadados) sobre o bloco, como timestamp, hash do bloco, número do bloco etc.
- O **corpo do bloco**: contém as transações reais processadas como parte do bloco.

Ao propor novos blocos, os produtores de blocos devem publicar todo o bloco, incluindo os dados da transação (contidos no corpo do bloco). Nós que participam no consenso podem então baixar os dados do bloco e reexecutar as transações para confirmar a sua validade. Sem nós verificando as transações, proponentes de blocos poderiam inserir transações maliciosas em blocos.

### O problema da disponibilidade de dados {#the-data-availability-problem}

Podemos resumir o problema da disponibilidade de dados na pergunta: "Como verificamos se os dados de um bloco recém-produzido estão disponíveis?". Esses dados disponíveis são cruciais, pois a segurança do Ethereum pressupõe que nós completos têm acesso aos dados de bloqueio.

Se um produtor de bloco propõe um bloco sem que todos os dados estejam disponíveis, ele poderia alcançar a finalidade enquanto contém transações inválidas. Mesmo que o bloco seja válido, o fato de os dados do bloco não estarem totalmente disponíveis para validar causa implicações negativas para os usuários e a funcionalidade da rede.

O problema de disponibilidade de dados também é relevante quando se trata de [soluções de dimensionamento](/developers/docs/scaling/), como rollups. Esses protocolos aumentam a taxa de transferência executando transações fora da rede principal do Ethereum. No entanto, para que eles possam derivar segurança do Ethereum, eles devem publicar dados de transação na rede principal, permitindo que qualquer pessoa verifique a exatidão dos cálculos realizados na cadeia principal.

#### Disponibilidade de dados e clientes leves

Embora a noção clássica de disponibilidade de dados tivesse a ver com a visibilidade dos dados das transações para validar nós, pesquisas mais recentes focaram em verificar a disponibilidade de dados com clientes leves. Para clientes leves, o problema da disponibilidade de dados diz respeito à validação da disponibilidade de um bloco sem ter que baixar o bloco inteiro.

Um cliente leve é um nó Ethereum que se sincroniza apenas com o cabeçalho do bloco mais recente e solicita outras informações de nós completos. Como eles não baixam blocos, clientes leves não podem validar transações ou ajudar a proteger o Ethereum.

No entanto, o trabalho está em curso para garantir que os clientes leves possam provar a disponibilidade de dados sem a necessidade de baixar blocos. Se os clientes leves puderem verificar a disponibilidade de um bloco, eles poderão contribuir para a segurança do Ethereum, alertando outros nós para a indisponibilidade de um bloco.

Uma área de pesquisa relacionada é focada em mecanismos para disponibilizar dados prováveis em um Ethereum sem estado. O [conceito de cliente sem estado](https://ethresear.ch/t/the-stateless-client-concept/172) é uma versão proposta do Ethereum, em que a validação de nós não precisa armazenar os dados do estado antes de verificar os blocos.

Espera-se que a falta de estado melhore a segurança, o dimensionamento e a sustentabilidade a longo prazo do Ethereum. Com requisitos de hardware mais baixos para validação de nós, mais validadores podem participar da rede e protegê-la contra atores maliciosos.

### Disponibilidade de dados vs. recuperabilidade de dados {#data-availability-vs-data-retrievability}

Disponibilidade de dados é diferente de recuperabilidade de dados. A disponibilidade de dados é a capacidade dos nós de baixar dados de transações para um bloco enquanto está sendo proposto para adição à cadeia. Em outras palavras, a disponibilidade de dados é relevante quando um bloco ainda está para passar pelo consenso.

Recuperabilidade de dados é a capacidade de os nós recuperarem _informações históricas_ da blockchain. A história de uma blockchain é composta de blocos antigos e recibos que armazenam informações sobre eventos passados. Embora dados históricos da blockchain possam ser necessários para fins de arquivamento, os nós podem validar a cadeia e processar transações sem eles.

A preocupação do protocolo principal Ethereum é a disponibilidade de dados, e não a recuperação de dados. O Ethereum não armazenará dados para cada transação que tenha processado para sempre, já que isso aumenta os requisitos de armazenamento para nós completos, impactando negativamente a descentralização do Ethereum.

Felizmente, a recuperabilidade de dados é um problema muito mais fácil de resolver do que a disponibilidade de dados. A capacidade de recuperar dados históricos da blockchain só precisa de um nó honesto para armazená-lo para que ele seja recuperável. Além disso, algumas entidades, como exploradores de blockchain, têm incentivos para armazenar dados de arquivamento e torná-los disponíveis, sob demanda, para outras pessoas.

[Mais sobre soluções para o problema de recuperabilidade de dados](https://notes.ethereum.org/@vbuterin/data_sharding_roadmap#Who-would-store-historical-data-under-sharding).

## Por que a disponibilidade de dados é importante? {#why-is-data-availability-important}

### Segurança da blockchain {#blockchain-security}

A disponibilidade de dados é crucial para a segurança da blockchain, caso contrário "ataques de retenção de dados" se tornariam muito comuns. Um ataque de retenção de dados ocorre quando um produtor de bloco publica um bloco, mas não compartilha os dados de transação usados para construir o bloco.

Se um ataque de retenção de dados acontecer, nós completos não poderão verificar a exatidão das atualizações em comparação ao estado geral do Ethereum. Isto dá aos proponentes de blocos maliciosos margem para subverter regras de protocolo e antecipar transições de estado inválidas na rede Ethereum.

A visibilidade dos dados do bloco para nós completos é essencial porque outros participantes da rede, tais como clientes leves, confiam nos nós completos para verificar o estado da rede. Ao contrário de nós completos, os clientes leves apenas verificam os cabeçalhos dos blocos, sem baixar os blocos. Portanto, as regras em torno da disponibilidade de dados garantem que os nós completos possam validar blocos e impedir que a cadeia seja corrompida.

### Dimensionamento descentralizado {#decentralized-scalability}

[O objetivo do Ethereum é dimensionar a computação sem comprometer a descentralização e segurança](/roadmap/vision/). Devido às restrições da arquitetura monolítica da blockchain, a disponibilidade de dados é fundamental para que o dimensionamento seja descentralizado.

#### Disponibilidade de dados e dimensionamento da camada 2 {#data-availability-and-layer-2-scaling}

[Soluções de dimensionamento da camada 2](/layer-2/), como [rollups](/glossary/#rollups), dimensionam a taxa de transferência da rede e latência, processando transações fora da principal camada de execução do Ethereum. Transações off-chain são compactadas e publicadas no Ethereum em lotes. Milhares de transações poderiam acontecer off-chain, mas o Ethereum precisa processar _uma_ transação on-chain associada a cada envio em lote. Isto reduz o congestionamento na camada de base e as taxas para os usuários, ao mesmo tempo que garante transações mais rápidas.

No entanto, para que o Ethereum garanta a segurança dos rollups, ele precisa de um mecanismo para verificar a validade das transações off-chain. É aqui que a disponibilidade de dados entra em cena.

[Optimistic rollups](/developers/docs/scaling/optimistic-rollups/) publicam dados de transações compactados no Ethereum como `calldata`. Isso permite que qualquer pessoa verifique o estado do rollup e também forneça garantias de validade da transação. Se uma transação for inválida, um verificador poderá usar os dados de transação disponíveis para criar uma [prova de fraude](/glossary/#fraud-proof) para desafiá-la.

[ZK-rollups (rollups de conhecimento zero)](/developers/docs/scaling/zk-rollups) não precisam publicar dados de transação, já que as [provas de validação de conhecimento zero](/glossary/#zk-proof) garantem a exatidão das transições de estado. No entanto, não podemos garantir a funcionalidade do ZK-rollup (ou interagir com ele) sem ter acesso aos dados do seu estado.

Por exemplo, os usuários não podem saber os saldos deles se um operador retiver detalhes sobre o estado do rollup. Eles tampouco podem realizar atualizações de estado utilizando informações contidas em um bloco recém-adicionado.

## Tipos de sistemas de disponibilidade de dados em blockchains {#types-of-data-availability-systems-in-blockchains}

### Disponibilidade de dados on-chain {#on-chain-data-availability}

A solução padrão para resolver a disponibilidade de dados é forçar os produtores de bloco a publicar todos os dados de transação on-chain e ter nós validadores baixando-os. A disponibilidade de dados on-chain é uma característica das "blockchain monolíticas" que gerenciam disponibilidade de dados, execução de transações e consenso, em uma única camada. Armazenando dados de estado de forma redundante em toda a rede, o protocolo Ethereum garante que os nós tenham acesso aos dados necessários para reproduzir transações, verificar atualizações de estado e sinalizar transições de estado inválidas.

No entanto, a disponibilidade de dados on-chain coloca um gargalo no dimensionamento. As blockchains monolíticas geralmente têm velocidades de processamento lentas, pois os nós devem baixar todos os blocos e reproduzir as mesmas transações. Elas também requerem nós completos para armazenar quantidades crescentes de estado, uma tendência que poderia afetar a descentralização. Se o estado do Ethereum aumentar vertiginosamente, os validadores deverão investir em máquinas maiores, o que provavelmente reduziria o número de pessoas que desejam executar um nó de validação.

### Disponibilidade de dados off-chain {#off-chain-data-availability}

Sistemas de disponibilidade de dados off-chain movem o armazenamento de dados para fora da blockchain: produtores de blocos não publicam dados da transação on-chain, mas providenciam um compromisso criptográfico para provar a disponibilidade dos dados. Este é um método usado por [blockchains modulares](https://celestia.org/learn/basics-of-modular-blockchains/), em que a cadeia gerencia algumas tarefas, como a execução e o consenso das transações e descarrega outros (por exemplo, disponibilidade de dados) para outra camada.

Muitas soluções de dimensionamento adotam uma abordagem modular separando a disponibilidade de dados do consenso e execução, já que isso é considerado o caminho ideal para dimensioar blockchains sem aumentar os requisitos do nó. Por exemplo, [validiums](/developers/docs/scaling/validium/) e [plasma](/developers/docs/scaling/plasma/) usam armazenamento off-chain para reduzir a quantidade de dados publicados on-chain.

Embora a disponibilidade de dados off-chain melhora a eficiência, ela tem implicações negativas na descentralização, segurança e confiança. Por exemplo, os participantes em validiums e cadeias plasma devem confiar que os produtores de blocos não incluam transações inválidas nos blocos propostos. Os produtores de blocos podem agir maliciosamente (ou seja, antecipando transições de estado inválidas) e tentar desafiar transações maliciosas retendo dados do estado.

Devido aos problemas associados ao armazenamento off-chain, algumas soluções de dimensionamento armazenam os dados de transações na blockchain principal, como o Ethereum. Optimistic rollups e ZK-rollups, por exemplo, não armazenam dados de transação, mas usam a rede principal do Ethereum como uma camada de disponibilidade de dados.

## Quais são algumas soluções para o problema da disponibilidade de dados? {#solutions-to-data-availability-problem}

Como mencionado, o problema da disponibilidade de dados diz respeito à capacidade de verificar a disponibilidade dos dados de transação para um bloco recentemente proposto. As soluções para este problema usam alguns mecanismos para garantir a disponibilidade de dados.

### Amostragem da disponibilidade de dados {#data-availability-sampling}

A amostragem da disponibilidade de dados é um mecanismo criptográfico para garantir a disponibilidade de dados. A amostragem da disponibilidade de dados permite que os nós de blockchain verifiquem se os dados de um bloco proposto estão disponíveis sem ter que baixar todo o bloco.

Em um sistema DAS, um nó pega de amostra pequenos pedaços aleatórios de um bloco em várias rodadas para verificar a disponibilidade de dados. Com muitos nós amostrando diferentes partes de um bloco simultaneamente, sua disponibilidade pode ser verificada com alta certeza estatística.

Quando aplicado a blockchains, como i Ethereum, a amostragem da disponibilidade de dados garante que os clientes leves também participem na garantia da segurança e funcionalidade da cadeia. Clientes leves podem rodar sem hardware caro, tornando mais fácil para qualquer um validar na rede Ethereum.

[Mais sobre amostragem da disponibilidade de dados.](https://hackmd.io/@vbuterin/sharding_proposal#ELI5-data-availability-sampling)

#### Provas de disponibilidade de dados {#data-availability-proofs}

Embora a amostragem da disponibilidade de dados dá garantias estatísticas da disponibilidade de um bloco, um nó malicioso ainda pode ocultar alguns dados. As técnicas de DAS só provam que a maioria dos dados do bloco está disponível, não que todo o bloco esteja disponível. E muitos danos podem advir dos produtores de blocos escondendo até uma pequena quantidade de dados de transações.

Para resolver esse problema, combinamos a amostragem da disponibilidade de dados com [codificação de eliminação](https://en.wikipedia.org/wiki/Erasure_code) para criar "provas da disponibilidade de dados". A codificação por eliminação (erasure coding) é uma técnica que nos permite duplicar um conjunto de dados adicionando peças redundantes (chamado códigos de eliminação). Se os dados originais forem perdidos, os códigos eliminados poderão ser usados para reconstruir a parte original dos dados.

Quando implementado em blockchains, os códigos eliminados melhoram a disponibilidade de dados porque uma pequena fração dos dados é suficiente para reconstruir toda a transação definida em um bloco. Neste sistema, um produtor de bloco malicioso precisaria reter mais de 50% do bloco para executar um ataque de retração. Anteriormente, um produtor de blocos só precisaria pegar 1% dos dados do bloco para agir maliciosamente.

Com blocos codificados por eliminação, os clientes leves têm certeza estatística de que todos os dados do bloco foram publicados na rede. Isso também significa que clientes leves não precisam confiar em nós completos para alertá-los da indisponibilidade de um bloco.

[Mais sobre provas de disponibilidade de dados.](https://github.com/ethereum/research/wiki/A-note-on-data-availability-and-erasure-coding)

### Comitês de disponibilidade de dados {#data-availability-committees}

Validações validiums armazenam dados de transações off-chain com um produtor de blocos, tornando-os centralizados em certa medida. Isto reduz a descentralização e a segurança, uma vez que o produtor do bloco pode publicar transações inválidas e ocultar o verdadeiro estado do rollup ao esconder dados de transação.

Alguns validiums tentam resolver este problema solicitando aos produtores de blocos que armazenem dados de transações com terceiros confiáveis, que formam o Comitê de Disponibilidade de Dados (DAC). As histórias do DAC são cópias de dados off-chain offline, mas são necessárias para torná-los disponíveis em caso de disputa. Os membros do DAC também publicam certificados na cadeia para provar que os referidos dados estão efetivamente disponíveis.

[Mais sobre comitês de disponibilidade de dados.](https://medium.com/starkware/data-availability-e5564c416424)

### Comitês de disponibilidade de dados da prova de participação {#proof-of-stake-data-availability-committees}

Embora os comitês de disponibilidade de dados sejam melhores que o estado atual em um validium, as suposições de confiança ainda persistem. E se o DAC conspirar com o produtor do bloco para reter os dados da transação? Os DACs geralmente são pequenos, aumentando o risco de conflito e a possibilidade de um ator externo comprometer o grupo.

Alguns validiums substituem os DACs por um sistema validador de prova de participação (proof-of-stake ou PoS). Aqui, qualquer pessoa pode se tornar um validador e armazenar dados off-chain. No entanto, eles devem fornecer uma “caução”, que é depositada em um contrato inteligente. No caso de comportamento malicioso, por exemplo, o validador retendo dados, a caução pode ser interrompida.

Os comitês de disponibilidade de dados da prova de participação são consideravelmente mais seguros do que os DACs comuns. Eles não são apenas sem permissão e sem confiança, mas também têm incentivos bem elaborados para encorajar um comportamento honesto.

[Mais informações sobre os comitês de disponibilidade de dados da prova de participação.](https://blog.matter-labs.io/zkporter-a-breakthrough-in-l2-scaling-ed5e48842fbf)

## Ethereum e o futuro da disponibilidade de dados {#ethereum-and-the-future-of-data-availability}

Embora os rollups possam aumentar a taxa de transferência com computação off-chain, sua capacidade é limitada pela vazão dos dados na blockchain subjacente. Se os rollups usarem o Ethereum como uma camada de disponibilidade de dados, eles deverão aumentar seus recursos de armazenamento e processamento de dados.

[Particionamento](/roadmap/danksharding/) (sharding) é um método proposto para aumentar a taxa de transferência de dados na camada de execução do Ethereum. Com o particionamento, a rede é dividida em um número selecionado de subcadeias, cada uma com um conjunto dedicado de validadores.

Os validadores só precisarão executar nós completos para seus shards e executar em capacidade de cliente leve para outros shards. O particionamento aumenta o espaço de dados disponível para rollups, pois o trabalho de armazenamento de dados é dividido em diferentes fragmentos.

Mas o particionamento de dados apresenta um novo problema: “E se os validadores em um fragmento se tornarem maliciosos e começarem a processar transições de estado inválido?”. Isso é possível porque os nós completos não têm mais acesso aos mesmos dados da transação, como é o caso atualmente. A implementação do particionamento de dados requer a criação de um sistema para nós para verificar a disponibilidade de dados em outros fragmentos sem baixar blocos, caso contrário, o objetivo do particionamento é anulado.

Para resolver esse problema, novas propostas de dimensionamento para Ethereum, como [Danksharding](https://notes.ethereum.org/@vbuterin/proto_danksharding_faq), dependem da amostragem de disponibilidade de dados para verificar se todo o o conteúdo de um blob foi visto pela rede. Este sistema alivia os nós individuais do ônus de baixar e validar tudo diretamente.

## Leitura adicional {#further-reading}

- [O que é disponibilidade de dados?](https://medium.com/blockchain-capital-blog/wtf-is-data-availability-80c2c95ded0f)
- [O que é a disponibilidade de dados?](https://coinmarketcap.com/alexandria/article/what-is-data-availability)
- [O problema da disponibilidade de dados](https://blog.polygon.technology/the-data-availability-problem-6b74b619ffcc/)
- [O cenário da disponibilidade de dados off-chain do Ethereum](https://blog.celestia.org/ethereum-off-chain-data-availability-landscape/)
- [Uma cartilha sobre verificações de disponibilidade de dados](https://dankradfeist.de/ethereum/2019/12/20/data-availability-checks.html)
- [Uma explicação da proposta de particionamento + DAS](https://hackmd.io/@vbuterin/sharding_proposal#ELI5-data-availability-sampling)
