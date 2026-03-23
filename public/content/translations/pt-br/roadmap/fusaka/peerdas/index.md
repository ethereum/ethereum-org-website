---
title: PeerDAS
description: Saiba mais sobre o PeerDAS como parte da melhoria do protocolo Fusaka do Ethereum
lang: pt-br
---

# PeerDAS {#peer-das}

O protocolo Ethereum está passando pela sua melhoria de escalabilidade mais significativa desde a [introdução de transações de blob com a EIP-4844](/roadmap/danksharding/). Como parte da [atualização Fusaka](/roadmap/fusaka/), o PeerDAS introduz uma nova maneira de lidar com dados de blob, proporcionando um aumento de aproximadamente uma ordem de magnitude na capacidade de **[disponibilidade de dados (DA)](/developers/docs/data-availability/)** para as L2s.

[Mais sobre o planejamento de escalabilidade de blobs](https://blog.ethereum.org/2025/08/22/protocol-update-002)

## Escalabilidade {#scalability}

A visão do Ethereum é ser uma plataforma neutra, segura e descentralizada, disponível para todos no mundo. À medida que o uso da rede cresce, isso exige equilibrar o trilema de escalabilidade, segurança e descentralização da rede. Se o Ethereum simplesmente aumentasse os dados processados pela rede em seu design atual, correria o risco de sobrecarregar os [nós dos quais o Ethereum depende para sua descentralização](/developers/docs/nodes-and-clients/). A escalabilidade requer um design de mecanismo rigoroso que minimize as concessões.

Uma das estratégias para atingir esse objetivo é permitir um ecossistema diversificado de soluções de escalabilidade de camada 2 em vez de processar todas as transações na Rede Principal da [camada 1 (L1)](/glossary/#layer-1). As [Camadas 2 (L2s)](/glossary/#layer-2) ou [rollups](/glossary#rollups) processam transações em suas próprias cadeias separadas e usam o Ethereum para verificação e segurança. A publicação apenas de compromissos críticos de segurança e a compressão de cargas úteis permitem que as L2s usem a capacidade de DA do Ethereum com mais eficiência. Por sua vez, a L1 transporta menos dados sem comprometer as garantias de segurança, enquanto as L2s integram mais usuários a custos de gás mais baixos. Inicialmente, as L2s publicavam dados como `calldata` em transações comuns, que competiam com as transações da L1 por gás e não eram práticas para a disponibilidade de dados em massa.

## Proto-Danksharding {#proto-danksharding}

O primeiro grande passo para a escalabilidade da L2 foi a atualização Dencun, que introduziu o [Proto-Danksharding](/roadmap/danksharding/) (EIP-4844). Essa atualização criou um novo tipo de dados especializado para rollups chamado blobs. [Blobs](/developers/docs/data-availability/blockchain-data-storage-strategies/#eip-4844-blobs), ou objetos binários grandes, são partes efêmeras de dados arbitrários que não precisam de execução da EVM e que os nós armazenam apenas por um tempo limitado. Esse processamento mais eficiente permitiu que as L2s publicassem mais dados no Ethereum e escalassem ainda mais.

Apesar de já ter grandes benefícios para a escalabilidade, o uso de blobs é apenas parte do objetivo final. No protocolo atual, cada nó na rede ainda precisa baixar cada blob. O gargalo se torna a largura de banda exigida dos nós individuais, com a quantidade de dados que precisa ser baixada aumentando diretamente com contagens de blob mais altas.

O Ethereum não compromete a descentralização, e a largura de banda é um dos parâmetros mais sensíveis. Mesmo com computação poderosa amplamente disponível para qualquer pessoa que possa pagar, as [limitações de largura de banda de upload](https://www.speedtest.net/global-index) mesmo em cidades altamente urbanizadas em nações desenvolvidas (como [Alemanha](https://www.speedtest.net/global-index/germany), [Bélgica](https://www.speedtest.net/global-index/belgium), [Austrália](https://www.speedtest.net/global-index/australia) ou [Estados Unidos](https://www.speedtest.net/global-index/united-states)) poderiam restringir os nós a serem capazes de operar apenas a partir de centros de dados se os requisitos de largura de banda não forem cuidadosamente ajustados.

Os operadores de nós têm requisitos cada vez mais altos de largura de banda e espaço em disco à medida que os blobs aumentam. O tamanho e a quantidade de blobs são limitados por essas restrições. Cada blob pode carregar até 128kb de dados com uma média de 6 blobs por bloco. Este foi apenas o primeiro passo em direção a um design futuro que usa blobs de uma maneira ainda mais eficiente.

## Amostragem de disponibilidade de dados {#das}

A [disponibilidade de dados](/developers/docs/data-availability/) é a garantia de que todos os dados necessários para validar independentemente a cadeia estão acessíveis a todos os participantes da rede. Isso garante que os dados foram totalmente publicados e podem ser usados para verificar sem necessidade de confiança o novo estado da cadeia ou as transações recebidas.

Os blobs do Ethereum fornecem uma forte garantia de disponibilidade de dados que garante a segurança das L2s. Para fazer isso, os nós do Ethereum precisam baixar e armazenar os blobs em sua totalidade. Mas e se pudéssemos distribuir blobs na rede de forma mais eficiente e evitar essa limitação?

Uma abordagem diferente para armazenar os dados e garantir sua disponibilidade é a **amostragem de disponibilidade de dados (DAS)**. Em vez de cada computador que executa o Ethereum armazenar completamente cada blob, o DAS introduz uma divisão de trabalho descentralizada. Ele divide o fardo de processar os dados distribuindo tarefas menores e gerenciáveis por toda a rede de nós. Os blobs são divididos em pedaços e cada nó baixa apenas alguns pedaços usando um mecanismo de distribuição aleatória uniforme entre todos os nós.

Isso introduz um novo problema — provar a disponibilidade e a integridade dos dados. Como a rede pode garantir que os dados estão disponíveis e que estão todos corretos quando os nós individuais mantêm apenas pequenos pedaços? Um nó malicioso poderia servir dados falsos e quebrar facilmente as fortes garantias de disponibilidade de dados! É aqui que a criptografia vem para ajudar.

Para garantir a integridade dos dados, a EIP-4844 já foi implementada com compromissos KZG. Estas são provas criptográficas criadas quando um novo blob é adicionado à rede. Uma pequena prova é incluída em cada bloco, e os nós podem verificar se os blobs recebidos correspondem ao compromisso KZG do bloco.

O DAS é um mecanismo que se baseia nisso e garante que os dados estejam corretos e disponíveis. A amostragem é um processo em que um nó consulta apenas uma pequena parte dos dados e os verifica em relação ao compromisso. KZG é um esquema de compromisso polinomial, o que significa que qualquer ponto único na curva polinomial pode ser verificado. Ao verificar apenas alguns pontos no polinômio, o cliente que faz a amostragem pode ter uma forte garantia probabilística de que os dados estão disponíveis.

## PeerDAS {#peer-das}

[PeerDAS (EIP-7594)](https://eips.ethereum.org/EIPS/eip-7594) é uma proposta específica que implementa o mecanismo DAS no Ethereum, marcando provavelmente a maior atualização desde A Fusão. O PeerDAS foi projetado para estender os dados de blob, dividindo-os em colunas e distribuindo um subconjunto para os nós.

O Ethereum pega emprestada uma matemática inteligente para alcançar isso: ele aplica a codificação de eliminação de erros do tipo Reed-Solomon aos dados de blob. Os dados de blob são representados como um polinômio cujos coeficientes codificam os dados, em seguida, avalia-se esse polinômio em pontos adicionais para criar um blob estendido, dobrando o número de avaliações. Essa redundância adicionada permite a recuperação de eliminação de erros: mesmo que algumas avaliações estejam faltando, o blob original pode ser reconstruído desde que pelo menos metade dos dados totais, incluindo as partes estendidas, estejam disponíveis.

![Polinômio estendido](./polynomial.png)

Na realidade, este polinômio tem milhares de coeficientes. Os compromissos KZG são valores de poucos bytes, algo como um hash, conhecidos por todos os nós. Cada nó que detém pontos de dados suficientes pode [reconstruir eficientemente um conjunto completo de dados de blob](https://arxiv.org/abs/2207.11079).

> Curiosidade: a mesma técnica de codificação era usada pelos DVDs. Se você arranhasse um DVD, o leitor ainda conseguia lê-lo graças à codificação Reed-Solomon que adiciona as partes faltantes do polinômio.

Historicamente, os dados nas blockchains, sejam blocos ou blobs, eram transmitidos para todos os nós. Com a abordagem de dividir e amostrar do PeerDAS, transmitir tudo para todos não é mais necessário. Pós-Fusaka, a rede da camada de consenso é organizada em tópicos/sub-redes de gossip: as colunas de blob são atribuídas a sub-redes específicas, e cada nó se inscreve em um subconjunto predeterminado e custodia apenas essas partes.

Com o PeerDAS, os dados de blob estendidos são divididos em 128 partes chamadas colunas. Os dados são distribuídos para esses nós por meio de um protocolo de gossip dedicado em sub-redes específicas às quais eles se inscrevem. Cada nó regular na rede participa de pelo menos 8 sub-redes de coluna escolhidas aleatoriamente. Receber dados de apenas 8 das 128 sub-redes significa que este nó padrão recebe apenas 1/16 de todos os dados, mas como os dados foram estendidos, isso corresponde a 1/8 dos dados originais.

Isso permite um novo limite de escalabilidade teórico de 8x o esquema atual de 'todos baixam tudo'. Com nós se inscrevendo em diferentes sub-redes aleatórias que servem colunas de blob, a probabilidade é muito alta de que eles estejam distribuídos uniformemente e, portanto, cada parte dos dados exista em algum lugar na rede. Os nós que executam validadores são obrigados a se inscrever em mais sub-redes para cada validador que executam.

> Cada nó possui um ID exclusivo gerado aleatoriamente, que normalmente serve como sua identidade pública para conexões. No PeerDAS, este número é usado para determinar o conjunto aleatório de sub-redes às quais ele deve se inscrever, resultando em uma distribuição aleatória uniforme de todos os dados de blob.

Depois que um nó reconstrói com sucesso os dados originais, ele redistribui as colunas recuperadas de volta para a rede, curando ativamente quaisquer lacunas de dados e aumentando a resiliência geral do sistema. Nós conectados a validadores com um saldo combinado ≥4096 ETH devem ser um supernó e, portanto, devem se inscrever em todas as sub-redes de coluna de dados e custodiar todas as colunas. Esses supernós curarão continuamente as lacunas de dados. A natureza probabilisticamente autorreparadora do protocolo permite fortes garantias de disponibilidade, sem limitar os operadores domésticos que detêm apenas partes dos dados.

![Nós se inscrevendo em colunas distribuídas por sub-redes](./subnets.png)

A disponibilidade de dados pode ser confirmada por qualquer nó que detenha apenas um pequeno subconjunto dos dados de blob, graças ao mecanismo de amostragem descrito acima. Essa disponibilidade é imposta: os validadores devem seguir novas regras de escolha de bifurcação, o que significa que eles só aceitarão e votarão em blocos depois de terem verificado a disponibilidade dos dados.

O impacto direto nos usuários (particularmente nos usuários de L2) são taxas mais baixas. Com 8x mais espaço para dados de rollup, as operações do usuário em sua cadeia se tornam ainda mais baratas com o tempo. Mas as taxas mais baixas pós-Fusaka levarão tempo e dependerão dos BPOs.

## Apenas de Parâmetros de Blob (BPOs) {#bpo}

A rede será teoricamente capaz de processar 8x mais blobs, mas os aumentos de blobs são uma mudança que precisa ser devidamente testada e executada com segurança de forma gradual. As redes de teste fornecem confiança suficiente para implantar os recursos na Rede Principal, mas precisamos garantir a estabilidade da rede p2p antes de habilitar um número significativamente maior de blobs.

Para aumentar gradualmente o número alvo de blobs por bloco sem sobrecarregar a rede, a Fusaka introduz as bifurcações **[Apenas de Parâmetros de Blob (BPO)](https://ethereum-magicians.org/t/blob-parameter-only-bpo-forks/22623)**. Ao contrário das bifurcações regulares que necessitam de ampla coordenação do ecossistema, acordo e atualizações de software, os [BPOs (EIP-7892)](https://eips.ethereum.org/EIPS/eip-7892) são atualizações pré-programadas que aumentam o número máximo de blobs ao longo do tempo sem intervenção.

Isso significa que, imediatamente após a ativação da Fusaka e a entrada em vigor do PeerDAS, o número de blobs permanecerá inalterado. O número de blobs começará a dobrar a cada poucas semanas até atingir um máximo de 48, enquanto os desenvolvedores monitoram para garantir que o mecanismo esteja funcionando como esperado e não esteja tendo efeitos adversos nos nós que executam a rede.

## Direções futuras {#future-directions}

O PeerDAS é apenas um passo [em direção a uma visão maior de escalabilidade do FullDAS](https://ethresear.ch/t/fulldas-towards-massive-scalability-with-32mb-blocks-and-beyond/19529), ou Danksharding. Enquanto o PeerDAS usa codificação de eliminação de erros 1D para cada blob individualmente, o Danksharding completo usará um esquema de codificação de eliminação de erros 2D mais completo em toda a matriz de dados de blob. A extensão de dados em duas dimensões cria propriedades de redundância ainda mais fortes e uma reconstrução e verificação mais eficientes. A realização do FullDAS exigirá otimizações substanciais de rede e protocolo, além de pesquisas adicionais.

## Leitura adicional {#further-reading}

- [PeerDAS: Amostragem de Disponibilidade de Dados Peer por Francesco D'Amato](https://www.youtube.com/watch?v=WOdpO1tH_Us)
- [Uma Documentação do PeerDAS do Ethereum](https://eprint.iacr.org/2024/1362.pdf)
- [Provando a Segurança do PeerDAS sem o AGM](https://eprint.iacr.org/2025/1683)
- [Vitalik sobre o PeerDAS, seu impacto e o teste da Fusaka](https://x.com/VitalikButerin/status/1970983281090085200)