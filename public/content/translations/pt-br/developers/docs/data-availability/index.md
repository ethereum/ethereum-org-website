---
title: Disponibilidade de dados
description: Uma visão geral dos problemas e soluções relacionados à disponibilidade de dados no Ethereum
lang: pt-br
---

“Não confie, verifique” é uma máxima comum no Ethereum. A ideia é que seu nó possa verificar de modo independente se a informação que recebe está correta, executando todas as transações nos blocos que recebem dos pares, a fim de garantir que as mudanças propostas correspondam precisamente àquelas calculadas de forma independente pelo nó. Isso significa que os nós não precisam confiar na honestidade dos remetentes do bloco. Isso não é possível se estiverem faltando dados.

**Disponibilidade de dados** se refere à confiança que um usuário pode ter de que os dados necessários para verificar um bloco estão realmente disponíveis para todos os participantes da rede. Para nós completos na camada 1 do Ethereum, isso é relativamente simples; o nó completo baixa uma cópia de todos os dados em cada bloco — os dados _devem_ estar disponíveis para que o download seja possível. Um bloco com dados faltando seria descartado em vez de ser adicionado à blockchain. Isso é “disponibilidade de dados on-chain” e é um recurso de blockchains monolíticas. Os nós completos não podem ser enganados em aceitar transações inválidas porque eles baixam e executam todas as transações para si mesmos. No entanto, para blockchains modulares, rollups de camada 2 e clientes leves, o cenário de disponibilidade de dados é mais complexo, exigindo alguns procedimentos de verificação mais sofisticados.

## Pré-requisitos {#prerequisites}

Você deve ter uma boa compreensão dos [fundamentos da blockchain](/developers/docs/intro-to-ethereum/), especialmente sobre [mecanismos de consenso](/developers/docs/consensus-mechanisms/). Esta página também pressupõe que o leitor esteja familiarizado com [blocos](/developers/docs/blocks/), [transações](/developers/docs/transactions/), [nós](/developers/docs/nodes-and-clients/), [soluções de dimensionamento](/developers/docs/scaling/) e outros tópicos relevantes.

## O problema da disponibilidade de dados {#the-data-availability-problem}

O problema da disponibilidade de dados é a necessidade de provar para toda a rede que a forma resumida de alguns dados de transação que estão sendo adicionados à blockchain realmente representa um conjunto de transações válidas, mas fazendo isso sem exigir que todos os nós baixem todos os dados. Os dados completos da transação são necessários para verificar os blocos de forma independente, mas exigir que todos os nós baixem todos os dados da transação é uma barreira para a escalabilidade. As soluções para o problema da disponibilidade de dados visam fornecer garantias suficientes de que os dados completos da transação foram disponibilizados para verificação aos participantes da rede que não baixam e armazenam os dados por conta própria.

[Nós leves](/developers/docs/nodes-and-clients/light-clients) e [rollups da camada 2](/developers/docs/scaling) são importantes exemplos de participantes da rede que exigem fortes garantias de disponibilidade de dados, mas não podem baixar e processar dados de transações por conta própria. Evitar baixar dados de transações é o que torna os nós leves e permite que os rollups sejam soluções de escalabilidade eficazes.

A disponibilidade de dados é também uma preocupação crítica para futuros clientes do Ethereum [“sem estado”](/roadmap/statelessness) que não precisam baixar e armazenar dados de estado para verificar os blocos. Os clientes sem estado ainda precisam ter certeza de que os dados estão disponíveis _em algum lugar_ e que foram processados corretamente.

## Soluções de disponibilidade de dados {#data-availability-solutions}

### Amostragem de disponibilidade de dados (DAS) {#data-availability-sampling}

Amostragem de Disponibilidade de Dados (DAS, do inglês Data Availability Sampling) é uma forma de a rede verificar se os dados estão disponíveis sem sobrecarregar um nó excessivamente. Cada nó (incluindo os nós que não foram nomeados para o staking) baixa um subconjunto pequeno e selecionado aleatoriamente do total de dados. Baixar com sucesso as amostras confirma com alta confiança que todos os dados estão disponíveis. Isso se baseia na codificação de eliminação de dados, que expande um determinado conjunto de dados com informações redundantes (a maneira como isso é feito é encaixando uma função conhecida como _polinomial_ sobre os dados e avaliando esse polinômio em pontos adicionais). Isso permite que os dados originais sejam recuperados a partir dos dados redundantes quando necessário. Consequentemente, se _qualquer_ dado original estiver indisponível, a criação dos dados causaria a perda de _metade_ dos dados expandidos! A quantidade de amostras de dados baixadas por cada nó pode ser ajustada de modo que seja _extremamente_ provável que pelo menos um dos fragmentos de dados amostrados por cada cliente esteja faltando _se_ menos da metade dos dados estiver realmente disponível.

O DAS será usado para garantir que os operadores de rollup tornem seus dados de transação disponíveis após o [EIP-4844](/roadmap/danksharding) ser implementado. Os nós do Ethereum usarão como amostras os dados da transação fornecidos nos blobs aleatoriamente usando o esquema de redundância explicado acima para garantir que todos os dados existam. A mesma técnica também poderá ser utilizada para garantir que os produtores de blocos estejam disponibilizando todos os seus dados para proteger clientes leves. Da mesma forma, na [separação entre proponentes e construtores](/roadmap/pbs), apenas o construtor do bloco seria necessário para processar um bloco inteiro, enquanto outros validadores verificariam usando uma amostragem da disponibilidade de dados.

### Comitês de disponibilidade de dados {#data-availability-committees}

Os Comitês de Disponibilidade de Dados (DACs, do inglês Data Availability Committees) são partes confiáveis que fornecem ou atestam a disponibilidade de dados. DACs podem ser usados em vez de, [ou em combinação com](https://hackmd.io/@vbuterin/sharding_proposal#Why-not-use-just-committees-and-not-DAS) DAS. As garantias de segurança que chegam aos comitês dependem de configuração específica. O Ethereum usa amostras de subconjuntos de validadores escolhidos aleatoriamente para atestar a disponibilidade de dados para nós leves, por exemplo.

DACs também são usados por alguns validiums. O DAC é um conjunto confiável de nós que armazena cópias de dados offline. O DAC é necessário para disponibilizar os dados em caso de litígio. Os membros do DAC também publicam certificados na cadeia para provar que os referidos dados estão efetivamente disponíveis. Alguns validiums substituem os DACs por um sistema validador de prova de participação (proof-of-stake ou PoS). Aqui, qualquer pessoa pode se tornar um validador e armazenar dados off-chain. No entanto, eles devem fornecer uma “caução”, que é depositada em um contrato inteligente. No caso de comportamento malicioso, por exemplo, o validador retendo dados, a caução pode ser interrompida. Os comitês de disponibilidade de dados da prova de participação são consideravelmente mais seguros do que os DACs regulares, porque incentivam diretamente um comportamento honesto.

## Disponibilidade de dados e nós leves {#data-availability-and-light-nodes}

Os [Nós leves](/developers/docs/nodes-and-clients/light-clients) precisam validar a exatidão dos cabeçalhos do bloco que recebem sem baixar os dados do bloco. O custo dessa leveza é a incapacidade de verificar de forma independente os cabeçalhos do bloco reexecutando as transações localmente da maneira que os nós completos fazem.

Os nós leves do Ethereum confiam em conjuntos aleatórios de 512 validadores que foram atribuídos a um _comitê de sincronização_. O comitê de sincronização atua como um DAC que sinaliza aos clientes leves que os dados no cabeçalho estão corretos usando uma assinatura criptográfica. O comitê de sincronização é atualizado diariamente. Cada cabeçalho do bloco alerta os nós leves, indicando quais validadores serão destinados a assinar o _próximo_ bloco, para não serem enganados confiando em um grupo malicioso fingindo ser o verdadeiro comitê de sincronização.

No entanto, o que acontece se um invasor _conseguir_ de alguma forma passar um cabeçalho de bloco malicioso para clientes leves e convencê-los de que foi assinado por um comitê de sincronização honesto? Nesse caso, o invasor poderia incluir transações inválidas e o cliente leve as aceitaria cegamente, pois não verifica de forma independente todas as alterações de estado resumidas no cabeçalho do bloco. Para se proteger contra isso, o cliente leve pode usar provas de fraude.

Essas provas de fraude funcionam da seguinte maneira: um nó completo observa uma transição de estado inválido sendo espalhada pela rede, que poderia rapidamente gerar uma pequena parte de dados demonstrando que uma transição de estado proposta não poderia surgir de um determinado conjunto de transações e transmitir esses dados aos seus pares. Os nós leves poderiam pegar essas provas de fraude e usá-las para descartar cabeçalhos de bloco ruins, garantindo que permaneçam na mesma cadeia honesta que os nós completos.

Isso depende de nós completos com acesso a dados completos da transação. Um invasor que transmite um cabeçalho de bloco inválido e também falha em disponibilizar os dados da transação seria capaz de impedir que os nós completos gerassem provas de fraude. Os nós completos poderiam conseguir sinalizar um aviso sobre um bloco ruim, mas não poderiam fazer validar seu aviso com uma prova, pois os dados não foram disponibilizados para gerar a prova!

A solução para esse problema de disponibilidade de dados é o DAS. Nós leves baixam partes aleatórias muito pequenas dos dados de estado completos e usam as amostras para verificar se o conjunto completo de dados está disponível. A probabilidade real de assumir incorretamente a disponibilidade total dos dados após baixar N blocos aleatórios pode ser calculada ([para 100 partes, a chance é de 10^-30](https://dankradfeist.de/ethereum/2019/12/20/data-availability-checks.html), ou seja, incrivelmente improvável).

Mesmo nesse cenário, os ataques que retêm apenas alguns bytes poderiam passar despercebidos pelos clientes que fazem solicitações de dados aleatórios. A codificação de eliminação (remoção segura e permanente de dados de contratos) corrige isso reconstruindo pequenas partes de dados ausentes que podem ser usadas para verificar as alterações de estado propostas. Uma prova de fraude poderia então ser construída usando os dados reconstruídos, evitando que clientes leves aceitem cabeçalhos ruins.

**Nota:** DAS e provas de fraude ainda não foram implementados para clientes leves da prova de participação do Ethereum, mas estão no roteiro, muito provavelmente assumindo a forma de provas baseadas em ZK-SNARK. Os clientes leves de hoje dependem de uma forma de DAC: eles verificam as identidades do comitê de sincronização e, em seguida, confiam nos cabeçalhos de bloco assinados que recebem.

## Disponibilidade de dados e rollups de camada 2 {#data-availability-and-layer-2-rollups}

[As soluções de escalabilidade de Camada 2](/layer-2/), como [rollups](/glossary/#rollups), reduzem os custos de transação e aumentam o rendimento do Ethereum processando transações off-chain. As transações de rollup são compactadas e postadas no Ethereum em lotes. Os lotes representam milhares de transações individuais off-chain em uma única transação no Ethereum. Isso reduz o congestionamento na camada base e reduz as taxas para os usuários.

No entanto, só é possível confiar nas transações “resumidas” publicadas no Ethereum se a mudança de estado proposta puder ser verificada de forma independente e confirmada como resultado da aplicação de todas as transações individuais off-chain. Se os operadores de rollup não disponibilizarem os dados da transação para essa verificação, eles poderão enviar dados incorretos para o Ethereum.

[Rollups otimistas](/developers/docs/scaling/optimistic-rollups/) publicam dados de transação compactados no Ethereum e esperam algum tempo (normalmente 7 dias) para permitir que verificadores independentes confiram os dados. Se alguém identificar um problema, poderá gerar uma prova de fraude e usá-la para contestar o rollup. Isso faria com que a cadeia fosse revertida e omitisse o bloco inválido. Isso só é possível se houver dados disponíveis. Atualmente, os dados são disponibilizados de forma permanente como `CALLDATA`, que reside permanentemente on-chain. No entanto, o EIP-4844 em breve permitirá que os rollups publiquem seus dados de transação em um armazenamento de blob mais barato. Esse armazenamento não é permanente. Os verificadores independentes terão que consultar os blobs e reportar seus desafios entre 1 e 3 meses antes de os dados serem excluídos da camada 1 do Ethereum. A disponibilidade dos dados só é garantida pelo protocolo Ethereum para esse curto espaço de tempo fixo. Depois disso, ela é de responsabilidade de outras entidades do ecossistema Ethereum. Qualquer nó pode verificar a disponibilidade de dados usando DAS, ou seja, baixando pequenas amostras aleatórias dos dados do blob.

[ZK-rollups (rollups de conhecimento zero)](/developers/docs/scaling/zk-rollups) não precisam publicar dados de transação, já que as [provas de validação de conhecimento zero](/glossary/#zk-proof) garantem a exatidão das transições de estado. No entanto, a disponibilidade dos dados ainda é um problema, pois não podemos garantir a funcionalidade do ZK-rollup (ou interagir com ele) sem acesso aos seus dados de estado. Por exemplo, os usuários não podem saber os saldos deles se um operador retiver detalhes sobre o estado do rollup. Eles tampouco podem realizar atualizações de estado utilizando informações contidas em um bloco recém-adicionado.

## Disponibilidade de dados vs. recuperabilidade de dados {#data-availability-vs-data-retrievability}

Disponibilidade de dados é diferente de recuperabilidade de dados. A disponibilidade de dados é a garantia de que nós completos conseguiram acessar e verificar o conjunto completo de transações associadas a um bloco específico. Isso não significa necessariamente que os dados ficarão acessíveis para sempre.

Recuperabilidade de dados é a capacidade de os nós recuperarem _informações históricas_ da blockchain. Esses dados históricos não são necessários para verificar novos blocos, apenas para sincronizar nós completos do bloco de origem ou servir solicitações históricas específicas.

A preocupação do protocolo principal Ethereum é a disponibilidade de dados, e não a recuperação de dados. A capacidade de recuperar dados pode ser fornecida por uma pequena população de nós de arquivos executados por terceiros ou pode ser distribuída pela rede usando um armazenamento de arquivos descentralizado, como o [Portal Network](https://www.ethportal.net/).

## Leitura adicional {#further-reading}

- [O que é disponibilidade de dados?](https://medium.com/blockchain-capital-blog/wtf-is-data-availability-80c2c95ded0f)
- [O que é a disponibilidade de dados?](https://coinmarketcap.com/alexandria/article/what-is-data-availability)
- [O cenário da disponibilidade de dados off-chain do Ethereum](https://blog.celestia.org/ethereum-off-chain-data-availability-landscape/)
- [Uma cartilha sobre verificações de disponibilidade de dados](https://dankradfeist.de/ethereum/2019/12/20/data-availability-checks.html)
- [Uma explicação da proposta de particionamento + DAS](https://hackmd.io/@vbuterin/sharding_proposal#ELI5-data-availability-sampling)
- [Uma nota sobre disponibilidade de dados e codificação de exclusão](https://github.com/ethereum/research/wiki/A-note-on-data-availability-and-erasure-coding#can-an-attacker-not-circumvent-this-scheme-by-releasing-a-full-unavailable-block-but-then-only-releasing-individual-bits-of-data-as-clients-query-for-them)
- [Comitês de disponibilidade de dados.](https://medium.com/starkware/data-availability-e5564c416424)
- [Comitês de disponibilidade de dados da prova de participação.](https://blog.matter-labs.io/zkporter-a-breakthrough-in-l2-scaling-ed5e48842fbf)
- [Soluções para o problema de recuperação de dados](https://notes.ethereum.org/@vbuterin/data_sharding_roadmap#Who-would-store-historical-data-under-sharding)
