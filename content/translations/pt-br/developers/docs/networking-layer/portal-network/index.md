---
title: A Rede Portal
description: Uma visão geral da Rede Portal - uma rede em desenvolvimento para dar suporte a clientes com poucos recursos.
lang: pt-br
---

O Ethereum é uma rede composta de computadores que rodam o software Ethereum. Cada um destes computadores é chamado de um 'nódulo'. O software cliente permite a um nódulo enviar e receber dados na rede Ethereum, e verifica os dados contra as regras do protocolo Ethereum. Nódulos mantém um monte de dados históricos no armazenamento dos seus discos e adicionam a eles quando recebem novos pacotes de informações, conhecidos como blocos, de outros nódulos da rede. Isto é necessário para sempre checar que um nódulo tem informação consistente com o resto da rede. Isto significa que rodar um nódulo pode requerer muito espaço em disco. Algumas operações de nódulos podem requerer muita memória RAM também.

Para resolver este problema de armazenamento, nódulos 'leves' tem sido desenvolvidos para requisitar informações de nódulos completos ao invés de armazenar eles mesmos. Entretanto, isto significa o nódulo leve não verifica as informações independentemente; ao invés disso, confia em outro nódulo. Isto também significa que nós completos são necessários para pegar um trabalho extra para servir estes nós leves.

A Rede Portal é um novo desenho de rede para o Ethereum que visa resolver o problema de disponibilidade de dados para nódulos 'leves' sem ter que confiar ou colocar pressão extra nos nódulos completos, compartilhando os dados necessários em pequenos pedaços através da rede.

Mais sobre [nós e clientes](/developers/docs/nodes-and-clients/)

## Por que nós precisamos da Rede Portal {#why-do-we-need-portal-network}

Os nódulos da Ethereum armazenam sua própria cópia total ou parcial do blockchain Ethereum. Esta cópia local é usada para validar transações e garantir que o nódulo está seguindo a cadeia correta. Este dado armazenado localmente permite aos nódulos verificarem de maneira independente que os dados de chegada são válidos e corretos sem precisar acreditar em nenhuma outra entidade.

Esta cópia local do blockchain, além de seu estado associado e do recebimento de dados tomam muito espaço no disco rígido do nódulo. Por exemplo, um disco rígido de 2TB é recomendado para rodar um nó utilizando [Geth](https://geth.ethereum.org) pareado com um cliente de consenso. Usando sincronização instantânea, que armazena apenas dados da cadeia de um conjunto de blocos relativamente recente, Geth tipicamente ocupa cerca de 650GB de espaço em disco, mas cresce cerca de 14GB/semana (você pode podar o nó de volta a 650GB periodicamente).

Isto significa que rodar nódulos pode ser caro, porque uma grande quantidade de espaço em disco tem de ser dedicada ao Ethereum. Há diversas soluções para este problema no roadmap do Ethereum, incluindo [expiração de histórico](/roadmap/statelessness/#history-expiry), [expiração de estado](/roadmap/statelessness/#state-expiry) e [falta de estado](/roadmap/statelessness/). Entretanto, ainda há muito até que eles sejam implementados. Há também [nódulos leves](/developers/docs/nodes-and-clients/light-clients/) que não gravam suas próprias cópias dos dados da cadeia, eles solicitam os dados que eles precisam dos nódulos completos. Entretanto, isso significa que nódulos leves tem que acreditar em nódulos completos para fornecer dados honestos e também estressa os nódulos completos que tem que servir os dados para as necessidades dos nódulos leves.

A Rede Portal visa fornecer uma maneira alternativa para nós leves terem seus dados que sem requerer confiança ou adicionar significantemente ao trabalho que tem de ser feito pelos nós completos. Isto será feito com a introdução de uma nova maneira dos nós Ethereum compartilharem dados através da rede.

## Como a Rede Portal funciona? {#how-does-portal-network-work}

Nós Ethereum tem protocolos estritos que definem como eles se comunicam com os outros. Clientes de execução se comunicam usando um conjunto de sub-protocolos conhecidos como [DevP2P](/developers/docs/networking-layer/#devp2p), enquanto clientes de consenso usam uma pilha diferente de sub-protocolos chamada [libP2P](/developers/docs/networking-layer/#libp2p). Eles definem os tipos de dados que podem ser passados entre nós.

![devP2P e libP2P](portal-network-devp2p-libp2p.png)

Os nós podem também servir dados específicos através da [API JSON-RPC](/developers/docs/apis/json-rpc/), que é como apps e carteiras trocam informações com os nós Ethereum. Entretanto, nenhum destes são protocolos ideias para servir dados para clientes leves.

Clientes leves não podem atualmente requisitar pedaços específicos da cadeia de dados pelo DevP2P ou libP2P, porque estes protocolos são desenhados somente para habilitar sincronização de cadeias e transmissão de blocos e transações. Clientes leves não querem fazer o download desta informação, porque deixariam de ser 'leves'.

A API JSON-RPC não é a escolha ideal para requisições de dados de clientes leves também, porque ela confia na conexão para um nó completo específico ou fornecedor de RPC centralizado que pode servir os dados. Isto significa que clientes leves tem que confiar em um específico nó/provedor ser honesto, e também o nó completo pode ter que manipular muitas requisições de muitos clientes leves, adicionando aos requisitos da sua largura de banda.

A meta da Rede Portal é repensar todo o desenho, construindo especificamente para leveza, fora das limitações de desenho dos clientes Ethereum existentes.

A ideia central da Rede Portal é pegar os melhores bits da pilha da rede atual habilitando informações necessárias pelos clientes leves, como dados históricos e a identidade da cabeça atual da cadeia para ser servida através de um estilo DevP2P peso leve ponto-a-ponto em uma rede descentralizada, usando um [DHT](https://en.wikipedia.org/wiki/Distributed_hash_table) (similar à Bittorrent).

A ideia é adicionar pequenas partes do histórico de dados total do Ethereum e algumas responsabilidades específicas de nós para cada nó. Então, requisições são servidas procurando os nós que armazenam o dado específico que foi requisitado e recuperando-o deles.

Isto inverte o modelo normal de nós leves encontrando um único nó e requisitando a eles filtrar e servir grandes volumes de dados; ao invés disso, eles rapidamente filtram uma grande rede de nós onde cada um manipula pequenas quantidades de dados.

O objetivo é permitir uma rede descentralizada de clientes Portal peso leve para:

- rastrear a cabeça da cadeia
- sincronizar dados recentes e históricos da cadeia
- recuperar os dados de estado
- transmitir transações
- executar transações usando a [EVM](/developers/docs/evm/)

Os benefícios deste desenho de rede são:

- reduzir a dependência em fornecedores centralizados
- reduzir o uso de banda de internet
- minimizar ou zerar a sincronia
- Acessível a dispositivos com recursos limitados (<1 GB de RAM, <100 MB de espaço em disco, 1 CPU)

O diagrama abaixo mostra as funções dos clientes existentes que podem ser entregues pela Rede Portal, habilitando ao usuários acessar estas funções em dispositivos com muito poucos recursos.

![tabela rede portal](portal-network-table2.png)

## Diversidade de cliente por padrão {#client-diversity-as-default}

Os desenvolvedores da Rede Portal também fizeram com que o design assumido construísse três clientes separados na Rede Portal desde o primeiro dia.

Os clientes da Rede Portal são:

- [Trin](https://github.com/ethereum/trin): escrito em Rust
- [Fluffy](https://nimbus.team/docs/fluffy.html): escrito em Nim
- [Ultralight](https://github.com/ethereumjs/ultralight): escrito em Typescript
- [Shisui](https://github.com/GrapeBaBa/shisui): escrito em Go

Ter várias implementações de clientes independentes melhora a resiliência e descentralização da rede Ethereum.

Se um cliente enfrenta problemas de vulnerabilidades, outros clientes podem continuar a operar tranquilamente, evitando o ponto único de falha. Adicionalmente, diversidade na implementação de clientes fomenta inovação e competição, conduzindo melhorias e reduzindo risco de monocultura dentro do ecossistema.

## Leitura adicional {#futher-reading}

- [A Rede Portal (Piper Merriam na Devcon Bogota)](https://www.youtube.com/watch?v=0stc9jnQLXA).
- [O desacordo da Rede Portal](https://discord.gg/CFFnmE7Hbs)
- [O website da Rede Portal](https://www.ethportal.net/)
