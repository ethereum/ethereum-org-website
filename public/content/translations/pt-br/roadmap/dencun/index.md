---
title: Cancun-Deneb (Dencun)
metaTitle: FAQ da Cancun-Deneb (Dencun)
description: Perguntas frequentes sobre a atualização da rede Cancun-Deneb (Dencun)
lang: pt-br
---

Cancun-Deneb (Dencun) é uma atualização da rede Ethereum, que ativa o **Proto-Danksharding (EIP-4844)**, introduzindo **blobs** de dados temporários para um armazenamento mais barato de rollups da [camada 2 (l2)](/glossary/#layer-2).

Um novo tipo de transação permite que os provedores de rollup armazenem dados de forma mais econômica no que é conhecido como "blobs". Os blobs têm a garantia de estarem disponíveis para a rede por cerca de 18 dias (mais precisamente, 4096 [épocas](/glossary/#epoch)). Após esse período, os blobs são removidos da rede, mas os aplicativos ainda podem verificar a validade de seus dados usando provas. 

Isso reduz significativamente o custo dos rollups, limita o crescimento da cadeia e ajuda a suportar mais usuários, mantendo a segurança e um conjunto descentralizado de operadores de nó.

## Quando esperamos que os rollups reflitam taxas mais baixas devido ao Proto-Danksharding? {#when}

- Esta atualização foi ativada na época 269568, em **13 de março de 2024 às 13:55 (UTC)**
- Todos os principais provedores de rollup, como Arbitrum ou Optimism, sinalizaram que os blobs serão suportados imediatamente após a atualização
- O cronograma para o suporte individual de rollup pode variar, pois cada provedor deve atualizar seus sistemas para aproveitar o novo espaço de blob

## Como o ETH pode ser convertido após a bifurcação rígida? {#scam-alert}

- **Nenhuma ação é necessária para o seu ETH**: Após a atualização Dencun da Ethereum, não há necessidade de converter ou atualizar seu ETH. Os saldos da sua conta permanecerão os mesmos, e o ETH que você possui atualmente permanecerá acessível em sua forma existente após a bifurcação rígida.
- **Cuidado com golpes!** <Emoji text="⚠️" /> **qualquer pessoa instruindo você a "atualizar" seu ETH está tentando aplicar um golpe.** Não há nada que você precise fazer em relação a esta atualização. Seus ativos permanecerão completamente inalterados. Lembre-se, manter-se informado é a melhor defesa contra golpes.

[Mais sobre como reconhecer e evitar golpes](/security/)

## Qual problema a atualização da rede Dencun está resolvendo? {#network-impact}

A Dencun aborda principalmente a **escalabilidade** (lidar com mais usuários e mais transações) com **taxas acessíveis**, enquanto **mantém a descentralização** da rede.

A comunidade Ethereum tem adotado uma abordagem "centrada em rollup" para o seu crescimento, o que coloca os rollups da camada 2 (l2) como o principal meio para suportar mais usuários com segurança.

As redes de rollup lidam com o _processamento_ (ou "execução") de transações separadamente da Mainnet e, em seguida, publicam uma prova criptográfica e/ou dados de transação compactados dos resultados de volta na Mainnet para manutenção de registros. O armazenamento dessas provas acarreta uma despesa (na forma de [gás](/glossary/#gas)), que, antes do Proto-Danksharding, tinha que ser armazenada permanentemente por todos os operadores de nó da rede, tornando-se uma tarefa cara.

A introdução do Proto-Danksharding na atualização Dencun adiciona um armazenamento de dados mais barato para essas provas, exigindo apenas que os operadores de nó armazenem esses dados por cerca de 18 dias, após os quais os dados podem ser removidos com segurança para evitar a expansão dos requisitos de hardware. Como os rollups normalmente têm um período de saque de 7 dias, seu modelo de segurança permanece inalterado, desde que os blobs estejam disponíveis na camada 1 (l1) durante essa duração. A janela de remoção de 18 dias fornece uma margem significativa para esse período.

[Mais sobre o dimensionamento da Ethereum](/roadmap/scaling/)

## Como os dados antigos de blob são acessados? {#historical-access}

Embora os nós regulares da Ethereum sempre mantenham o _estado atual_ da rede, os dados históricos de blob podem ser descartados aproximadamente 18 dias após sua introdução. Antes de descartar esses dados, a Ethereum garante que eles tenham sido disponibilizados a todos os participantes da rede, permitindo tempo para:

- Partes interessadas baixarem e armazenarem os dados.
- Conclusão de todos os períodos de desafio do rollup.
- Finalização das transações de rollup.

Dados _históricos_ de blob podem ser desejados por vários motivos e podem ser armazenados e acessados usando vários protocolos descentralizados:

- **Protocolos de indexação de terceiros**, como The Graph, armazenam esses dados por meio de uma rede descentralizada de operadores de nó incentivados por mecanismos criptoeconômicos.
- **BitTorrent** é um protocolo descentralizado onde voluntários podem manter e distribuir esses dados para outras pessoas.
- A **[Portal Network da Ethereum](/developers/docs/networking-layer/portal-network/)** visa fornecer acesso a todos os dados da Ethereum por meio de uma rede descentralizada de operadores de nó, distribuindo dados entre os participantes de forma semelhante ao BitTorrent.
- **Usuários individuais** são sempre livres para armazenar suas próprias cópias de quaisquer dados que desejarem para referência histórica.
- **Provedores de rollup** são incentivados a armazenar esses dados para aprimorar a experiência do usuário de seu rollup.
- **Exploradores de blocos** normalmente executam nós de arquivamento que indexam e armazenam todas essas informações para fácil referência histórica, acessíveis aos usuários por meio de uma interface da web.

É importante notar que a recuperação do estado histórico opera em um **modelo de confiança 1-de-N**. Isso significa que você só precisa de dados de _uma única fonte confiável_ para verificar sua exatidão usando o estado atual da rede.

## Como essa atualização contribui para o roteiro mais amplo da Ethereum? {#roadmap-impact}

O Proto-Danksharding prepara o terreno para a implementação completa do [danksharding](/roadmap/danksharding/). O danksharding foi projetado para distribuir o armazenamento de dados de rollup entre os operadores de nó, de modo que cada operador precise lidar apenas com uma pequena parte do total de dados. Essa distribuição aumentará o número de blobs de dados por bloco, o que é essencial para dimensionar a Ethereum para lidar com mais usuários e transações.

Essa escalabilidade é crucial para [suportar bilhões de usuários na Ethereum](/roadmap/scaling/) com taxas acessíveis e aplicativos mais avançados, mantendo uma rede descentralizada. Sem essas mudanças, as demandas de hardware para os operadores de nó aumentariam, levando à necessidade de equipamentos cada vez mais caros. Isso poderia excluir operadores menores devido ao preço, resultando em uma concentração do controle da rede entre alguns grandes operadores, o que iria contra o princípio da descentralização.

## Esta atualização afeta todos os clientes de consenso e validador da Ethereum? {#client-impact}

Sim, o Proto-Danksharding (EIP-4844) requer atualizações tanto para clientes de execução quanto para clientes de consenso. Todos os principais clientes da Ethereum lançaram versões com suporte à atualização. Para manter a sincronização com a rede Ethereum após a atualização, os operadores de nó devem garantir que estão executando uma versão de cliente suportada. Observe que as informações sobre os lançamentos de clientes são sensíveis ao tempo, e os usuários devem consultar as atualizações mais recentes para obter os detalhes mais atuais. [Veja os detalhes sobre os lançamentos de clientes suportados](https://blog.ethereum.org/2024/02/27/dencun-mainnet-announcement#client-releases).

Os clientes de consenso lidam com o software do _validador_, que foi totalmente atualizado para acomodar a atualização.

## Como a Cancun-Deneb (Dencun) afeta as redes de teste da Ethereum? {#testnet-impact}

- Devnets, Sepolia e Holesky passaram pela atualização Dencun e têm o Proto-Danksharding funcionando totalmente
- Desenvolvedores de rollup podem usar essas redes para testes do EIP-4844
- A maioria dos usuários não será afetada por essa mudança em cada rede de teste

## Todas as transações nas camadas 2 (l2) agora usarão espaço de blob temporário ou você poderá escolher? {#calldata-vs-blobs}

As transações de rollup na camada 2 (l2) da Ethereum têm a opção de usar dois tipos de armazenamento de dados: espaço de blob temporário ou dados de chamada de contrato inteligente permanentes. O espaço de blob é uma escolha econômica, fornecendo armazenamento temporário a um custo menor. Ele garante a disponibilidade de dados para todos os períodos de desafio necessários. Por outro lado, os dados de chamada de contrato inteligente oferecem armazenamento permanente, mas são mais caros.

A decisão entre usar espaço de blob ou dados de chamada é tomada principalmente pelos provedores de rollup. Eles baseiam essa decisão na demanda atual por espaço de blob. Se o espaço de blob estiver em alta demanda, os rollups podem optar por dados de chamada para garantir que os dados sejam publicados em tempo hábil.

Embora seja teoricamente possível para os usuários escolherem seu tipo de armazenamento preferido, os provedores de rollup normalmente gerenciam essa escolha. Oferecer essa opção aos usuários adicionaria complexidade, particularmente em transações de agrupamento econômicas. Para detalhes específicos sobre essa escolha, os usuários devem consultar a documentação fornecida pelos provedores de rollup individuais.

## O 4844 reduzirá o gás da camada 1 (l1)? {#l1-fee-impact}

Não significativamente. Um novo mercado de gás é introduzido exclusivamente para o espaço de blob, para uso por provedores de rollup. _Embora as taxas na camada 1 (l1) possam ser reduzidas ao descarregar dados de rollup para blobs, esta atualização se concentra principalmente na redução das taxas da camada 2 (l2). A redução de taxas na camada 1 (l1) (Mainnet) pode ocorrer como um efeito de segunda ordem em menor grau._

- A redução de gás da camada 1 (l1) será proporcional à adoção/uso de dados de blob por provedores de rollup
- O gás da camada 1 (l1) provavelmente permanecerá competitivo devido a atividades não relacionadas a rollup
- Os rollups que adotarem o uso de espaço de blob exigirão menos gás da camada 1 (l1), ajudando a empurrar as taxas de gás da camada 1 (l1) para baixo no curto prazo
- O espaço de blob ainda é limitado, portanto, se os blobs dentro de um bloco estiverem saturados/cheios, os rollups podem ser obrigados a publicar seus dados como dados permanentes nesse meio tempo, o que aumentaria os preços do gás da camada 1 (l1) e da camada 2 (l2)

## Isso reduzirá as taxas em outras blockchains da camada 1 (l1) da EVM? {#alt-l1-fee-impact}

Não. Os benefícios do Proto-Danksharding são específicos para os rollups da camada 2 (l2) da Ethereum que armazenam suas provas na camada 1 (l1) (Mainnet).

O simples fato de ser compatível com a Máquina Virtual Ethereum (EVM) não significa que uma rede verá qualquer benefício com esta atualização. Redes que operam independentemente da Ethereum (sejam compatíveis com a EVM ou não) não armazenam seus dados na Ethereum e não verão nenhum benefício com esta atualização.

[Mais sobre rollups da camada 2 (l2)](/layer-2/)

## Aprende melhor visualmente? {#visual-learner}

<VideoWatch slug="eip-4844-dencun-explained" />

_Desbloqueando o Dimensionamento da Ethereum, EIP-4844 — Finematics _

<VideoWatch slug="blobspace-101-dencun" />

_Blobspace 101 com Domothy — Bankless_

## Leitura adicional {#further-reading}

- [EIP4844.com](https://www.eip4844.com/)
- [EIP-4844: Transações de blob de fragmento (Proto-Danksharding)](https://eips.ethereum.org/EIPS/eip-4844)
- [Anúncio da Dencun na Mainnet](https://blog.ethereum.org/2024/02/27/dencun-mainnet-announcement) - _Blog da Ethereum Foundation_
- [O Guia do Mochileiro da Ethereum: Proto-Danksharding](https://members.delphidigital.io/reports/the-hitchhikers-guide-to-ethereum/#proto-danksharding-eip-4844) - _Jon Charbonneau_
- [FAQ do Proto-Danksharding](https://notes.ethereum.org/@vbuterin/proto_danksharding_faq) - _Vitalik Buterin_
- [Uma Explicação Aprofundada do EIP-4844: O Núcleo da Atualização Cancun](https://medium.com/@ebunker.io/an-in-depth-explanation-of-eip-4844-the-core-of-the-cancun-upgrade-de7b13761d2c) - _Ebunker_
- [Atualização AllCoreDevs 016](https://tim.mirror.xyz/HzH5MpK1dnw7qhBSmzCfdCIxpwpD6DpwlfxtaAwEFro) - _Tim Beiko_