---
title: A Portal Network
description: "Uma visão geral da Portal Network, uma rede ponto a ponto que mantém o histórico do Ethereum disponível à medida que os clientes deixam de armazenar tudo."
lang: pt-br
---

[Ethereum](/) é uma rede composta por computadores que executam o software de cliente Ethereum. Cada um desses computadores é chamado de 'nó'. O software cliente permite que um nó envie e receba dados na rede Ethereum e verifica os dados em relação às regras do protocolo Ethereum. Os nós mantêm muitos dados históricos em seu armazenamento em disco e os adicionam quando recebem novos pacotes de informações, conhecidos como blocos, de outros nós na rede. Isso é necessário para verificar sempre se um nó tem informações consistentes com o resto da rede. Isso significa que executar um nó pode exigir muito espaço em disco. Algumas operações de nó também podem exigir muita memória RAM.

Os clientes de execução não precisam mais manter todos esses dados. Desde julho de 2025, eles podem descartar os corpos e recibos de blocos anteriores ao [The Merge](/roadmap/merge/), e o roteiro do Ethereum inclui descartar mais do histórico da cadeia ao longo do tempo. Esse histórico ainda precisa permanecer disponível para quem precisar, como exploradores de blocos, indexadores ou uma carteira procurando uma transação antiga.

A Portal Network mantém esse histórico disponível compartilhando-o em pequenos pedaços por muitos nós. Nenhum nó precisa armazenar tudo, e um nó pode buscar qualquer pedaço e verificá-lo em relação aos dados que já possui, sem confiar no nó que o enviou.

Mais sobre [nós e clientes](/developers/docs/nodes-and-clients/)

## Por que precisamos da Portal Network {#why-do-we-need-portal-network}

Os nós Ethereum armazenam sua própria cópia completa ou parcial da blockchain do Ethereum. Essa cópia local é usada para validar transações e garantir que o nó esteja seguindo a cadeia correta. Esses dados armazenados localmente permitem que os nós verifiquem de forma independente se os dados recebidos são válidos e corretos, sem precisar confiar em nenhuma outra entidade.

Essa cópia local da blockchain e os dados de estado e recibo associados ocupam muito espaço no disco rígido do nó. Por exemplo, um SSD de 4 TB é recomendado para executar um nó usando [Geth](https://geth.ethereum.org) emparelhado a um cliente de consenso. Com o histórico completo da cadeia, o Geth ocupa mais de 1,8 TB de espaço em disco (em setembro de 2026), e isso continua crescendo com a cadeia.

Isso significa que executar nós pode ser caro, porque uma grande quantidade de espaço em disco deve ser dedicada ao Ethereum. A [expiração de histórico](/roadmap/statelessness/#history-expiry) reduz isso permitindo que os clientes excluam dados de blocos antigos que não precisam para seguir a cadeia: desde a [expiração de histórico parcial](https://blog.ethereum.org/2025/07/08/partial-history-exp) em julho de 2025, os clientes de execução podem descartar os corpos e recibos de todos os blocos antes do The Merge. A [expiração de estado](/roadmap/statelessness/#state-expiry) e a [ausência de estado](/roadmap/statelessness/) são outras soluções que ainda estão sendo pesquisadas.

Quando os nós param de armazenar o histórico antigo, eles não podem mais fornecê-lo a outros. Arquivos, torrents e provedores mantêm cópias dele; a Portal Network o espalha por muitos nós, para que permaneça disponível sem depender de nenhum deles.

## Como a Portal Network funciona? {#how-does-portal-network-work}

Os nós Ethereum têm protocolos rígidos que definem como eles se comunicam entre si. Os clientes de execução se comunicam usando um conjunto de subprotocolos conhecidos como [devp2p](/developers/docs/networking-layer/#devp2p), enquanto os clientes de consenso usam uma pilha diferente de subprotocolos chamada [libp2p](/developers/docs/networking-layer/#libp2p). O devp2p permite que um nó solicite corpos de blocos e recibos de seus pares, mas um par que descartou o histórico antigo não pode fornecê-lo. Aplicativos e carteiras também podem obter dados de um nó por meio da [Interface de Programação de Aplicações (API) JSON-RPC](/developers/docs/apis/json-rpc/), mas isso depende de um nó ou provedor armazenar os dados e de confiar que ele seja honesto.

A Portal Network é uma rede ponto a ponto separada, construída para compartilhar o histórico. Ela é executada no [discv5](https://github.com/ethereum/devp2p/blob/master/discv5/discv5.md), o protocolo de descoberta de nós que os clientes de consenso também usam para encontrar pares, e organiza seus nós como uma [tabela de hash distribuída (DHT)](https://en.wikipedia.org/wiki/Distributed_hash_table), semelhante à do BitTorrent. Cada nó tem um ID de nó, e cada pedaço de conteúdo, como os recibos de um bloco, tem um ID de conteúdo no mesmo espaço de ID, derivado do número do seu bloco. Cada nó armazena o conteúdo cujos IDs estão mais próximos do seu próprio ID, até uma distância que ele escolhe, chamada de raio. Para buscar um pedaço de conteúdo, um nó pergunta aos pares que conhece que estão mais próximos do ID do conteúdo. Os pares que não o têm respondem com nós que estão ainda mais próximos, até que a solicitação chegue a um nó que o armazena.

<PortalHistoryDiagram />

Um nó nunca precisa confiar nos dados que recebe. Ele mantém cada cabeçalho do bloco, e cada cabeçalho se compromete com as transações e recibos do seu bloco por meio de raízes como `transactionsRoot` e `receiptsRoot`. O nó verifica o corpo de um bloco ou os recibos de um bloco em relação a essas raízes antes de usá-los.

### As Portal Networks {#the-portal-networks}

A Portal Network foi inicialmente projetada como várias sub-redes que permitiriam que clientes leves seguissem a cadeia sem confiar em um nó completo: uma rede de cliente leve da Beacon Chain, uma rede de estado, uma rede de fofoca (gossip) de transações e uma rede de histórico. Em 2025, as especificações de todas, exceto uma delas, foram movidas para o status de legado, e o desenvolvimento agora se concentra na **rede de Histórico** (History network), que armazena os corpos e recibos de blocos passados para clientes de execução que mantêm cada cabeçalho do bloco, mas descartaram o resto do histórico.

## Clientes da Portal Network {#client-diversity-as-default}

Várias equipes construíram clientes da Portal Network:

- [Cliente Nimbus Portal](https://fluffy.guide) (anteriormente Fluffy): escrito em Nim, e o único ainda em desenvolvimento ativo
- [Trin](https://github.com/ethereum/trin): escrito em Rust, não é mais mantido
- [Ultralight](https://github.com/ethereumjs/ultralight): escrito em TypeScript, sem atualizações desde meados de 2025
- [Shisui](https://github.com/zen-eth/shisui): escrito em Go, sem atualizações desde meados de 2025

## Leitura adicional {#further-reading}

- [Especificações da Portal Network](https://github.com/ethereum/portal-network-specs)
- [Usando o protocolo da Portal Network para expiração de histórico](https://ethresear.ch/t/using-portal-network-protocol-for-history-expiry/22658)
- [Expiração de histórico parcial](https://blog.ethereum.org/2025/07/08/partial-history-exp)
- [A Portal Network (Piper Merriam na Devcon Bogotá)](https://www.youtube.com/watch?v=0stc9jnQLXA)
- [Discord da Portal Network](https://discord.gg/CFFnmE7Hbs)
- [Site da Portal Network](https://www.ethportal.net/)
