---
title: PeerDAS
description: Aprenda sobre o PeerDAS como parte da atualização Fusaka do protocolo Ethereum
lang: pt-br
authors: ["Nixo", "Mario Havel"]
---

O protocolo [Ethereum](/) está passando por sua atualização de escalabilidade mais significativa desde a [introdução das transações de blob com a EIP-4844](/roadmap/danksharding/). Como parte da [atualização Fusaka](/roadmap/fusaka/), o PeerDAS introduz uma nova maneira de lidar com dados de blob, entregando um aumento de aproximadamente uma ordem de grandeza na capacidade de **[disponibilidade de dados (DA)](/developers/docs/data-availability/)** para as l2s.

[Mais sobre o roteiro de escalabilidade de blobs](https://blog.ethereum.org/2025/08/22/protocol-update-002)

## Escalabilidade {#scalability}

A visão do Ethereum é ser uma plataforma neutra, segura e descentralizada disponível para todos no mundo. À medida que o uso da rede cresce, isso exige equilibrar o trilema de escala, segurança e descentralização da rede. Se o Ethereum simplesmente aumentasse os dados processados pela rede dentro de seu design atual, correria o risco de sobrecarregar os [nós dos quais o Ethereum depende para sua descentralização](/developers/docs/nodes-and-clients/). A escalabilidade exige um design de mecanismo rigoroso que minimize as compensações (trade-offs).

Uma das estratégias para atingir esse objetivo é permitir um ecossistema diversificado de soluções de escalabilidade de camada 2 em vez de processar todas as transações na Mainnet da [camada 1 (l1)](/glossary/#layer-1). As [camadas 2 (l2s)](/glossary/#layer-2) ou [rollups](/glossary#rollups) processam transações em suas próprias cadeias separadas e usam o Ethereum para verificação e segurança. Publicar apenas compromissos críticos para a segurança e comprimir as cargas úteis (payloads) permite que as l2s usem a capacidade de DA do Ethereum de forma mais eficiente. Por sua vez, a l1 carrega menos dados sem comprometer as garantias de segurança, enquanto as l2s integram mais usuários a custos de gás mais baixos. Inicialmente, as l2s publicavam dados como `calldata` em transações comuns, o que competia com as transações da l1 por gás e era impraticável para a disponibilidade de dados em massa.

## Proto-Danksharding {#proto-danksharding}

O primeiro grande passo em direção à escalabilidade da l2 foi a atualização Dencun, que introduziu o [Proto-Danksharding](/roadmap/danksharding/) (EIP-4844). Essa atualização criou um novo tipo de dados especializado para rollups chamado blobs. [Blobs](/developers/docs/data-availability/blockchain-data-storage-strategies/#eip-4844-blobs), ou objetos binários grandes (binary large objects), são pedaços efêmeros de dados arbitrários que não precisam de execução na EVM e que os nós armazenam apenas por um período limitado. Esse processamento mais eficiente permitiu que as l2s publicassem mais dados no Ethereum e escalassem ainda mais. 

Apesar de já ter fortes benefícios para a escalabilidade, o uso de blobs é apenas parte do objetivo final. No protocolo atual, cada nó na rede ainda precisa baixar cada blob. O gargalo se torna a largura de banda exigida dos nós individuais, com a quantidade de dados que precisa ser baixada aumentando diretamente com contagens mais altas de blobs. 

O Ethereum não compromete a descentralização, e a largura de banda é um dos ajustes mais sensíveis. Mesmo com computação poderosa amplamente disponível para qualquer um que possa pagar, as [limitações de largura de banda de upload](https://www.speedtest.net/global-index) até mesmo em cidades altamente urbanas de nações desenvolvidas (como [Alemanha](https://www.speedtest.net/global-index/germany), [Bélgica](https://www.speedtest.net/global-index/belgium), [Austrália](https://www.speedtest.net/global-index/australia) ou os [Estados Unidos](https://www.speedtest.net/global-index/united-states)) poderiam restringir os nós a serem executados apenas em data centers se os requisitos de largura de banda não forem cuidadosamente ajustados.

Os operadores de nós têm requisitos cada vez maiores de largura de banda e espaço em disco à medida que os blobs aumentam. O tamanho e a quantidade de blobs são limitados por essas restrições. Cada blob pode carregar até 128kb de dados com uma média de 6 blobs por bloco. Este foi apenas o primeiro passo em direção a um design futuro que usa blobs de uma maneira ainda mais eficiente.

## Amostragem de disponibilidade de dados {#das}

A [disponibilidade de dados](/developers/docs/data-availability/) é a garantia de que todos os dados necessários para validar a cadeia de forma independente estão acessíveis a todos os participantes da rede. Ela garante que os dados foram totalmente publicados e podem ser usados para verificar de forma confiável o novo estado da cadeia ou as transações recebidas. 

Os blobs do Ethereum fornecem uma forte garantia de disponibilidade de dados que assegura a segurança das l2s. Para fazer isso, os nós do Ethereum precisam baixar e armazenar os blobs em sua totalidade. Mas e se pudermos distribuir os blobs na rede de forma mais eficiente e evitar essa limitação? 

Uma abordagem diferente para armazenar os dados e garantir sua disponibilidade é a **amostragem de disponibilidade de dados (DAS)**. Em vez de cada computador que executa o Ethereum armazenar totalmente cada blob, a DAS introduz uma divisão de trabalho descentralizada. Ela quebra o fardo de processar os dados distribuindo tarefas menores e gerenciáveis por toda a rede de nós. Os blobs são divididos em pedaços e cada nó baixa apenas alguns pedaços usando um mecanismo de distribuição aleatória uniforme entre todos os nós. 

Isso introduz um novo problema: provar a disponibilidade e a integridade dos dados. Como a rede pode garantir que os dados estão disponíveis e que estão todos corretos quando os nós individuais mantêm apenas pequenos pedaços? Um nó malicioso poderia fornecer dados falsos e quebrar facilmente as fortes garantias de disponibilidade de dados! É aqui que a criptografia vem ajudar. 

Para garantir a integridade dos dados, a EIP-4844 já foi implementada com compromissos KZG. Estas são provas criptográficas criadas quando um novo blob é adicionado à rede. Uma pequena prova é incluída em cada bloco, e os nós podem verificar se os blobs recebidos correspondem ao compromisso KZG do bloco.

A DAS é um mecanismo que se baseia nisso e garante que os dados estejam corretos e disponíveis. A amostragem é um processo em que um nó consulta apenas uma pequena parte dos dados e a verifica em relação ao compromisso. O KZG é um esquema de compromisso polinomial, o que significa que qualquer ponto único na curva polinomial pode ser verificado. Ao verificar apenas alguns pontos no polinômio, o cliente que faz a amostragem pode ter uma forte garantia probabilística de que os dados estão disponíveis. 

## PeerDAS {#peer-das-2}

O [PeerDAS (EIP-7594)](https://eips.ethereum.org/EIPS/eip-7594) é uma proposta específica que implementa o mecanismo de DAS no Ethereum, marcando provavelmente a maior atualização desde The Merge. O PeerDAS foi projetado para estender os dados de blob, dividindo-os em colunas e distribuindo um subconjunto para os nós.

O Ethereum empresta um pouco de matemática inteligente para conseguir isso: ele aplica a codificação de apagamento no estilo Reed-Solomon aos dados de blob. Os dados de blob são representados como um polinômio cujos coeficientes codificam os dados, em seguida, avaliam esse polinômio em pontos adicionais para criar um blob estendido, dobrando o número de avaliações. Essa redundância adicionada permite a recuperação de apagamento: mesmo que algumas avaliações estejam faltando, o blob original pode ser reconstruído desde que pelo menos metade do total de dados, incluindo as peças estendidas, esteja disponível.

![Extended polynomial](./polynomial.png)

Na realidade, esse polinômio tem milhares de coeficientes. Os compromissos KZG são valores de poucos bytes, algo como um hash, conhecidos por todos os nós. Todo nó que possui pontos de dados suficientes pode [reconstruir eficientemente um conjunto completo de dados de blob](https://arxiv.org/abs/2207.11079). 

> Curiosidade: a mesma técnica de codificação era usada por DVDs. Se você arranhasse um DVD, o reprodutor ainda conseguia lê-lo graças à codificação Reed-Solomon que adiciona as peças que faltam do polinômio. 

Historicamente, os dados em blockchains, sejam blocos ou blobs, eram transmitidos para todos os nós. Com a abordagem de divisão e amostragem do PeerDAS, transmitir tudo para todos não é mais necessário. Pós-Fusaka, a rede da camada de consenso é organizada em tópicos/sub-redes de protocolo de fofoca: as colunas de blob são atribuídas a sub-redes específicas, e cada nó se inscreve em subconjuntos predeterminados e custodia apenas essas peças.

Com o PeerDAS, os dados de blob estendidos são divididos em 128 pedaços chamados colunas. Os dados são distribuídos para esses nós por meio de um protocolo de fofoca dedicado em sub-redes específicas nas quais eles se inscrevem. Cada nó regular na rede participa de pelo menos 8 sub-redes de colunas escolhidas aleatoriamente. Receber dados de apenas 8 de 128 sub-redes significa que esse nó padrão recebe apenas 1/16 de todos os dados, mas como os dados foram estendidos, isso é 1/8 dos dados originais. 

Isso permite um novo limite teórico de escalabilidade de 8x o esquema atual de "todos baixam tudo". Com os nós se inscrevendo em diferentes sub-redes aleatórias que servem colunas de blob, a probabilidade é muito alta de que eles sejam distribuídos uniformemente e, portanto, cada pedaço de dado exista em algum lugar na rede. Os nós que executam validadores são obrigados a se inscrever em mais sub-redes com cada validador que executam.

> Cada nó tem um ID exclusivo gerado aleatoriamente, que normalmente serve como sua identidade pública para conexões. No PeerDAS, esse número é usado para determinar o conjunto aleatório de sub-redes nas quais ele deve se inscrever, resultando em uma distribuição aleatória uniforme de todos os dados de blob.

Uma vez que um nó reconstrói com sucesso os dados originais, ele redistribui as colunas recuperadas de volta para a rede, curando ativamente quaisquer lacunas de dados e melhorando a resiliência geral do sistema. Os nós conectados a validadores com um saldo combinado ≥4096 ETH devem ser um supernó e, portanto, devem se inscrever em todas as sub-redes de colunas de dados e custodiar todas as colunas. Esses supernós curarão continuamente as lacunas de dados. A natureza probabilisticamente autocurativa do protocolo permite fortes garantias de disponibilidade, ao mesmo tempo em que não limita os operadores domésticos que mantêm apenas partes dos dados. 

![Nodes subscribing to columns distributed via subnets](./subnets.png)

A disponibilidade de dados pode ser confirmada por qualquer nó que mantenha apenas um pequeno subconjunto dos dados de blob, graças ao mecanismo de amostragem descrito acima. Essa disponibilidade é imposta: os validadores devem seguir novas regras de escolha de bifurcação, o que significa que eles só aceitarão e votarão em blocos depois de terem verificado a disponibilidade dos dados.

O impacto direto nos usuários (particularmente usuários de l2) são taxas mais baixas. Com 8x mais espaço para dados de rollup, as operações dos usuários em sua cadeia se tornam ainda mais baratas com o tempo. Mas as taxas mais baixas pós-Fusaka levarão tempo e dependerão de BPOs.

## Blob-Parameter-Only (BPOs) {#bpo}

A rede teoricamente será capaz de processar 8x mais blobs, mas os aumentos de blobs são uma mudança que precisa ser devidamente testada e executada com segurança de maneira gradual. As redes de teste fornecem confiança suficiente para implantar os recursos na Mainnet, mas precisamos garantir a estabilidade da rede p2p antes de habilitar um número significativamente maior de blobs. 

Para aumentar gradualmente o número alvo de blobs por bloco sem sobrecarregar a rede, a Fusaka introduz as bifurcações **[Blob-Parameter-Only (BPO)](https://ethereum-magicians.org/t/blob-parameter-only-bpo-forks/22623)**. Ao contrário das bifurcações regulares que precisam de ampla coordenação do ecossistema, acordo e atualizações de software, as [BPOs (EIP-7892)](https://eips.ethereum.org/EIPS/eip-7892) são atualizações pré-programadas que aumentam o número máximo de blobs ao longo do tempo sem intervenção.

Isso significa que imediatamente após a ativação da Fusaka e o PeerDAS entrar no ar, o número de blobs permanecerá inalterado. O número de blobs começará a dobrar a cada poucas semanas até atingir um máximo de 48, enquanto os desenvolvedores monitoram para garantir que o mecanismo esteja funcionando conforme o esperado e não esteja tendo efeitos adversos nos nós que executam a rede.

## Direções futuras {#future-directions}

O PeerDAS é apenas um passo [em direção a uma visão de escalabilidade maior do FullDAS](https://ethresear.ch/t/fulldas-towards-massive-scalability-with-32mb-blocks-and-beyond/19529), ou danksharding. Enquanto o PeerDAS usa codificação de apagamento 1D para cada blob individualmente, o danksharding completo usará um esquema de codificação de apagamento 2D mais completo em toda a matriz de dados de blob. Estender os dados em duas dimensões cria propriedades de redundância ainda mais fortes e reconstrução e verificação mais eficientes. A realização do FullDAS exigirá otimizações substanciais de rede e protocolo, juntamente com pesquisas adicionais.

## Leitura adicional {#further-reading}

- [PeerDAS: Amostragem de Disponibilidade de Dados de Pares por Francesco D'Amato](https://www.youtube.com/watch?v=WOdpO1tH_Us)
- [Uma Documentação do PeerDAS do Ethereum](https://eprint.iacr.org/2024/1362.pdf)
- [Provando a Segurança do PeerDAS sem o AGM](https://eprint.iacr.org/2025/1683)
- [Vitalik sobre o PeerDAS, seu impacto e testes da Fusaka](https://x.com/VitalikButerin/status/1970983281090085200)