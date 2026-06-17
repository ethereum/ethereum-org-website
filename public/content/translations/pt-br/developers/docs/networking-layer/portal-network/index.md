---
title: A Portal Network
description: Uma visão geral da Portal Network - uma rede em desenvolvimento projetada para suportar clientes com poucos recursos.
lang: pt-br
---

[Ethereum](/) é uma rede composta por computadores que executam o software de cliente Ethereum. Cada um desses computadores é chamado de 'nó'. O software cliente permite que um nó envie e receba dados na rede Ethereum, e verifica os dados em relação às regras do protocolo Ethereum. Os nós mantêm muitos dados históricos em seu armazenamento de disco e os adicionam quando recebem novos pacotes de informações, conhecidos como blocos, de outros nós na rede. Isso é necessário para verificar sempre se um nó tem informações consistentes com o resto da rede. Isso significa que executar um nó pode exigir muito espaço em disco. Algumas operações de nó também podem exigir muita memória RAM.

Para contornar esse problema de armazenamento em disco, foram desenvolvidos nós 'leves' que solicitam informações de nós completos em vez de armazenar tudo por conta própria. No entanto, isso significa que o nó leve não está verificando as informações de forma independente e, em vez disso, está confiando em outro nó. Isso também significa que os nós completos são obrigados a assumir um trabalho extra para atender a esses nós leves.

A Portal Network é um novo design de rede para o Ethereum que visa resolver o problema de disponibilidade de dados para nós "leves" sem ter que confiar ou colocar pressão extra sobre os nós completos, compartilhando os dados necessários em pequenos pedaços através da rede.

Mais sobre [nós e clientes](/developers/docs/nodes-and-clients/)

## Por que precisamos da Portal Network {#why-do-we-need-portal-network}

Os nós Ethereum armazenam sua própria cópia completa ou parcial da blockchain do Ethereum. Essa cópia local é usada para validar transações e garantir que o nó esteja seguindo a cadeia correta. Esses dados armazenados localmente permitem que os nós verifiquem de forma independente se os dados recebidos são válidos e corretos, sem precisar confiar em nenhuma outra entidade.

Essa cópia local da blockchain e os dados associados de estado e recibo ocupam muito espaço no disco rígido do nó. Por exemplo, um disco rígido de 2 TB é recomendado para executar um nó usando o [Geth](https://geth.ethereum.org) emparelhado a um cliente de consenso. Usando a sincronização rápida (snap sync), que armazena apenas dados da cadeia de um conjunto relativamente recente de blocos, o Geth normalmente ocupa cerca de 650 GB de espaço em disco, mas cresce a cerca de 14 GB/semana (você pode podar o nó de volta para 650 GB periodicamente).

Isso significa que executar nós pode ser caro, porque uma grande quantidade de espaço em disco deve ser dedicada ao Ethereum. Existem várias soluções para esse problema no roteiro do Ethereum, incluindo [expiração de histórico](/roadmap/statelessness/#history-expiry), [expiração de estado](/roadmap/statelessness/#state-expiry) e [ausência de estado](/roadmap/statelessness/). No entanto, é provável que faltem vários anos para que sejam implementadas. Também existem [nós leves](/developers/docs/nodes-and-clients/light-clients/) que não salvam sua própria cópia dos dados da cadeia, eles solicitam os dados de que precisam de nós completos. No entanto, isso significa que os nós leves precisam confiar nos nós completos para fornecer dados honestos e também sobrecarrega os nós completos que precisam fornecer os dados de que os nós leves precisam.

A Portal Network visa fornecer uma maneira alternativa para os nós leves obterem seus dados que não exija confiar ou adicionar significativamente ao trabalho que deve ser feito pelos nós completos. A maneira como isso será feito é introduzir uma nova maneira para os nós Ethereum compartilharem dados através da rede.

## Como a Portal Network funciona? {#how-does-portal-network-work}

Os nós Ethereum têm protocolos rígidos que definem como eles se comunicam entre si. Os clientes de execução se comunicam usando um conjunto de subprotocolos conhecidos como [devp2p](/developers/docs/networking-layer/#devp2p), enquanto os clientes de consenso usam uma pilha diferente de subprotocolos chamada [libp2p](/developers/docs/networking-layer/#libp2p). Eles definem os tipos de dados que podem ser passados entre os nós.

![devP2P and libP2P](portal-network-devp2p-libp2p.png)

Os nós também podem fornecer dados específicos por meio da [API JSON-RPC](/developers/docs/apis/json-rpc/), que é como os aplicativos e as carteiras trocam informações com os nós Ethereum. No entanto, nenhum desses são protocolos ideais para fornecer dados a clientes leves.

Atualmente, os clientes leves não podem solicitar partes específicas de dados da cadeia via devp2p ou libp2p porque esses protocolos são projetados apenas para permitir a sincronização da cadeia e a propagação (gossiping) de blocos e transações. Os clientes leves não querem baixar essas informações porque isso os impediria de serem "leves".

A API JSON-RPC também não é uma escolha ideal para solicitações de dados de clientes leves, porque depende de uma conexão com um nó completo específico ou provedor de RPC centralizado que pode fornecer os dados. Isso significa que o cliente leve precisa confiar que esse nó/provedor específico seja honesto e, além disso, o nó completo pode ter que lidar com muitas solicitações de muitos clientes leves, aumentando seus requisitos de largura de banda.

O objetivo da Portal Network é repensar todo o design, construindo especificamente para a leveza, fora das restrições de design dos clientes Ethereum existentes.

A ideia central da Portal Network é pegar as melhores partes da pilha de rede atual, permitindo que as informações necessárias aos clientes leves, como dados históricos e a identidade do cabeçalho atual da cadeia, sejam fornecidas por meio de uma rede descentralizada ponto a ponto leve no estilo devp2p usando uma [DHT](https://en.wikipedia.org/wiki/Distributed_hash_table) (semelhante ao BitTorrent).

A ideia é adicionar pequenas partes do total de dados históricos do Ethereum e algumas responsabilidades específicas de nó a cada nó. Em seguida, as solicitações são atendidas buscando os nós que armazenam os dados específicos que foram solicitados e recuperando-os deles.

Isso inverte o modelo normal de nós leves que encontram um único nó e solicitam que ele filtre e forneça grandes volumes de dados; em vez disso, eles filtram rapidamente uma grande rede de nós que lidam com pequenas quantidades de dados cada.

O objetivo é permitir que uma rede descentralizada de clientes leves da Portal Network possa:

- rastrear o cabeçalho da cadeia
- sincronizar dados recentes e históricos da cadeia
- recuperar dados de estado
- transmitir transações
- executar transações usando a [EVM](/developers/docs/evm/)

Os benefícios desse design de rede são:

- Reduzir a dependência de provedores centralizados
- Reduzir o uso de largura de banda da Internet
- Sincronização minimizada ou zero
- Acessível a dispositivos com recursos limitados (\<1 GB de RAM, \<100 MB de espaço em disco, 1 CPU)

A tabela abaixo mostra as funções dos clientes existentes que podem ser entregues pela Portal Network, permitindo que os usuários acessem essas funções em dispositivos com recursos muito baixos.

### As redes da Portal Network {#the-portal-networks}

| Cliente leve de Beacon | Rede de estado               | Propagação de transações | Rede de histórico | Índice canônico de Txn |
| ---------------------- | ---------------------------- | ------------------------ | ----------------- | ---------------------- |
| Cliente leve da Beacon Chain | Armazenamento de contas e contratos | Mempool leve             | Cabeçalhos        | TxHash > Hash, Índice  |
| Dados do protocolo     |                              |                          | Corpos de blocos  |                        |
|                        |                              |                          | Recibos           |                        |

## Diversidade de clientes por padrão {#client-diversity-as-default}

Os desenvolvedores da Portal Network também fizeram a escolha de design de construir quatro clientes separados da Portal Network desde o primeiro dia.

Os clientes da Portal Network são:

- [Trin](https://github.com/ethereum/trin): escrito em Rust
- [Fluffy](https://fluffy.guide): escrito em Nim
- [Ultralight](https://github.com/ethereumjs/ultralight): escrito em TypeScript
- [Shisui](https://github.com/zen-eth/shisui): escrito em Go

Ter várias implementações de clientes independentes aumenta a resiliência e a descentralização da rede Ethereum.

Se um cliente apresentar problemas ou vulnerabilidades, outros clientes poderão continuar operando sem problemas, evitando um ponto único de falha. Além disso, diversas implementações de clientes promovem a inovação e a concorrência, impulsionando melhorias e reduzindo o risco de monocultura dentro do ecossistema.

## Leitura adicional {#further-reading}

- [A Portal Network (Piper Merriam na Devcon Bogotá)](https://www.youtube.com/watch?v=0stc9jnQLXA).
- [Discord da Portal Network](https://discord.gg/CFFnmE7Hbs)
- [Site da Portal Network](https://www.ethportal.net/)