---
title: Camada de rede
description: "Uma introdução à camada de rede do Ethereum."
lang: pt-br
sidebarDepth: 2
---

O [Ethereum](/) é uma rede ponto a ponto com milhares de nós que devem ser capazes de se comunicar uns com os outros usando protocolos padronizados. A "camada de rede" é a pilha de protocolos que permite que esses nós se encontrem e troquem informações. Isso inclui a "fofoca" (gossiping) de informações (comunicação de um para muitos) pela rede, bem como a troca de solicitações e respostas entre nós específicos (comunicação de um para um). Cada nó deve aderir a regras de rede específicas para garantir que está enviando e recebendo as informações corretas.

Existem duas partes no software do cliente (clientes de execução e clientes de consenso), cada uma com sua própria pilha de rede distinta. Além de se comunicar com outros nós do Ethereum, os clientes de execução e de consenso precisam se comunicar entre si. Esta página fornece uma explicação introdutória dos protocolos que permitem essa comunicação.

Os clientes de execução fofocam transações pela rede ponto a ponto da camada de execução. Isso requer comunicação criptografada entre pares autenticados. Quando um validador é selecionado para propor um bloco, as transações do pool de transações local do nó serão passadas para os clientes de consenso por meio de uma conexão RPC local, que serão empacotadas em blocos beacon. Os clientes de consenso então fofocarão os blocos beacon por toda a sua rede p2p. Isso requer duas redes p2p separadas: uma conectando clientes de execução para fofoca de transações e uma conectando clientes de consenso para fofoca de blocos.

## Pré-requisitos {#prerequisites}

Algum conhecimento sobre [nós e clientes](/developers/docs/nodes-and-clients/) do Ethereum será útil para entender esta página.

## A camada de execução {#execution-layer}

Os protocolos de rede da camada de execução são divididos em duas pilhas:

- a pilha de descoberta: construída sobre UDP e permite que um novo nó encontre pares para se conectar

- a pilha devp2p: fica sobre TCP e permite que os nós troquem informações

Ambas as pilhas funcionam em paralelo. A pilha de descoberta alimenta novos participantes na rede, e a pilha devp2p permite suas interações.

### Descoberta {#discovery}

A descoberta é o processo de encontrar outros nós na rede. Isso é inicializado usando um pequeno conjunto de bootnodes (nós cujos endereços são [codificados (hardcoded)](https://github.com/ethereum/go-ethereum/blob/master/params/bootnodes.go) no cliente para que possam ser encontrados imediatamente e conectar o cliente aos pares). Esses bootnodes existem apenas para apresentar um novo nó a um conjunto de pares - esse é o seu único propósito, eles não participam de tarefas normais do cliente, como a sincronização da cadeia, e são usados apenas na primeira vez que um cliente é iniciado.

O protocolo usado para as interações nó-bootnode é uma forma modificada do [Kademlia](https://medium.com/coinmonks/a-brief-overview-of-kademlia-and-its-use-in-various-decentralized-platforms-da08a7f72b8f) que usa uma [tabela de hash distribuída](https://en.wikipedia.org/wiki/Distributed_hash_table) para compartilhar listas de nós. Cada nó tem uma versão desta tabela contendo as informações necessárias para se conectar aos seus pares mais próximos. Essa 'proximidade' não é geográfica - a distância é definida pela similaridade do ID do nó. A tabela de cada nó é atualizada regularmente como um recurso de segurança. Por exemplo, no [discv5](https://github.com/ethereum/devp2p/tree/master/discv5), os nós do protocolo de descoberta também são capazes de enviar 'anúncios' que exibem os subprotocolos que o cliente suporta, permitindo que os pares negociem sobre os protocolos que ambos podem usar para se comunicar.

A descoberta começa com um jogo de PING-PONG. Um PING-PONG bem-sucedido "vincula" o novo nó a um bootnode. A mensagem inicial que alerta um bootnode sobre a existência de um novo nó entrando na rede é um `PING`. Este `PING` inclui informações em hash sobre o novo nó, o bootnode e um carimbo de data/hora de expiração. O bootnode recebe o `PING` e retorna um `PONG` contendo o hash do `PING`. Se os hashes do `PING` e do `PONG` corresponderem, a conexão entre o novo nó e o bootnode é verificada e diz-se que eles estão "vinculados" (bonded).

Uma vez vinculado, o novo nó pode enviar uma solicitação `FIND-NEIGHBOURS` ao bootnode. Os dados retornados pelo bootnode incluem uma lista de pares aos quais o novo nó pode se conectar. Se os nós não estiverem vinculados, a solicitação `FIND-NEIGHBOURS` falhará, de modo que o novo nó não poderá entrar na rede.

Assim que o novo nó recebe uma lista de vizinhos do bootnode, ele inicia uma troca de PING-PONG com cada um deles. PING-PONGs bem-sucedidos vinculam o novo nó aos seus vizinhos, permitindo a troca de mensagens.

```
iniciar cliente --> conectar ao bootnode --> vincular ao bootnode --> encontrar vizinhos --> vincular aos vizinhos
```

Os clientes de execução estão usando atualmente o protocolo de descoberta [Discv4](https://github.com/ethereum/devp2p/blob/master/discv4.md) e há um esforço ativo para migrar para o protocolo [discv5](https://github.com/ethereum/devp2p/tree/master/discv5).

#### ENR: Registros de Nó do Ethereum {#enr}

O [Registro de Nó do Ethereum (ENR)](/developers/docs/networking-layer/network-addresses/) é um objeto que contém três elementos básicos: uma assinatura (hash do conteúdo do registro feito de acordo com algum esquema de identidade acordado), um número de sequência que rastreia as alterações no registro e uma lista arbitrária de pares chave:valor. Este é um formato à prova de futuro que permite uma troca mais fácil de informações de identificação entre novos pares e é o formato de [endereço de rede](/developers/docs/networking-layer/network-addresses) preferido para nós do Ethereum.

#### Por que a descoberta é construída sobre UDP? {#why-udp}

O UDP não suporta nenhuma verificação de erros, reenvio de pacotes com falha ou abertura e fechamento dinâmico de conexões - em vez disso, ele apenas dispara um fluxo contínuo de informações em um alvo, independentemente de ser recebido com sucesso. Essa funcionalidade mínima também se traduz em sobrecarga mínima, tornando esse tipo de conexão muito rápido. Para a descoberta, onde um nó simplesmente deseja tornar sua presença conhecida para então estabelecer uma conexão formal com um par, o UDP é suficiente. No entanto, para o resto da pilha de rede, o UDP não é adequado para o propósito. A troca de informações entre os nós é bastante complexa e, portanto, precisa de um protocolo com mais recursos que possa suportar reenvio, verificação de erros, etc. A sobrecarga adicional associada ao TCP vale a funcionalidade adicional. Portanto, a maior parte da pilha P2P opera sobre TCP.

### DevP2P {#devp2p}

O devp2p é em si uma pilha inteira de protocolos que o Ethereum implementa para estabelecer e manter a rede ponto a ponto. Depois que novos nós entram na rede, suas interações são governadas por protocolos na pilha [devp2p](https://github.com/ethereum/devp2p). Todos eles ficam sobre o TCP e incluem o protocolo de transporte RLPx, o protocolo de fio (wire protocol) e vários subprotocolos. O [RLPx](https://github.com/ethereum/devp2p/blob/master/rlpx.md) é o protocolo que governa a iniciação, autenticação e manutenção de sessões entre os nós. O RLPx codifica mensagens usando RLP (Recursive Length Prefix), que é um método muito eficiente em termos de espaço para codificar dados em uma estrutura mínima para envio entre nós.

Uma sessão RLPx entre dois nós começa com um aperto de mão (handshake) criptográfico inicial. Isso envolve o nó enviando uma mensagem de autenticação que é então verificada pelo par. Após a verificação bem-sucedida, o par gera uma mensagem de reconhecimento de autenticação para retornar ao nó iniciador. Este é um processo de troca de chaves que permite que os nós se comuniquem de forma privada e segura. Um aperto de mão criptográfico bem-sucedido então aciona ambos os nós para enviar uma mensagem de "olá" (hello) um ao outro "no fio" (on the wire). O protocolo de fio é iniciado por uma troca bem-sucedida de mensagens de olá.

As mensagens de olá contêm:

- versão do protocolo
- ID do cliente
- porta
- ID do nó
- lista de subprotocolos suportados

Estas são as informações necessárias para uma interação bem-sucedida porque definem quais capacidades são compartilhadas entre ambos os nós e configuram a comunicação. Há um processo de negociação de subprotocolo onde as listas de subprotocolos suportados por cada nó são comparadas e aqueles que são comuns a ambos os nós podem ser usados na sessão.

Junto com as mensagens de olá, o protocolo de fio também pode enviar uma mensagem de "desconexão" (disconnect) que avisa a um par que a conexão será fechada. O protocolo de fio também inclui mensagens PING e PONG que são enviadas periodicamente para manter uma sessão aberta. As trocas de RLPx e do protocolo de fio, portanto, estabelecem as bases da comunicação entre os nós, fornecendo a estrutura para que informações úteis sejam trocadas de acordo com um subprotocolo específico.

### Subprotocolos {#sub-protocols}

#### Protocolo de fio (Wire protocol) {#wire-protocol}

Uma vez que os pares estão conectados e uma sessão RLPx foi iniciada, o protocolo de fio define como os pares se comunicam. Inicialmente, o protocolo de fio definia três tarefas principais: sincronização da cadeia, propagação de bloco e troca de transações. No entanto, uma vez que o Ethereum mudou para a Prova de Participação (PoS), a propagação de bloco e a sincronização da cadeia tornaram-se parte da camada de consenso. A troca de transações ainda é da competência dos clientes de execução. A troca de transações refere-se à troca de transações pendentes entre os nós para que os construtores de blocos possam selecionar algumas delas para inclusão no próximo bloco. Informações detalhadas sobre essas tarefas estão disponíveis [aqui](https://github.com/ethereum/devp2p/blob/master/caps/eth.md). Os clientes que suportam esses subprotocolos os expõem por meio da [JSON-RPC](/developers/docs/apis/json-rpc/).

#### les (subprotocolo leve do Ethereum) {#les}

Este é um protocolo mínimo para a sincronização de clientes leves. Tradicionalmente, este protocolo raramente tem sido usado porque os nós completos são obrigados a servir dados para clientes leves sem serem incentivados. O comportamento padrão dos clientes de execução é não servir dados de clientes leves via les. Mais informações estão disponíveis na [especificação](https://github.com/ethereum/devp2p/blob/master/caps/les.md) do les.

#### Snap {#snap}

O [protocolo snap](https://github.com/ethereum/devp2p/blob/master/caps/snap.md#ethereum-snapshot-protocol-snap) é uma extensão opcional que permite que os pares troquem instantâneos (snapshots) de estados recentes, permitindo que os pares verifiquem dados de conta e armazenamento sem ter que baixar nós intermediários da árvore de Merkle.

#### Wit (protocolo de testemunha) {#wit}

O [protocolo de testemunha](https://github.com/ethereum/devp2p/blob/master/caps/wit.md#ethereum-witness-protocol-wit) é uma extensão opcional que permite a troca de testemunhas de estado entre pares, ajudando a sincronizar os clientes com a ponta da cadeia.

#### Whisper {#whisper}

O Whisper era um protocolo que visava fornecer mensagens seguras entre pares sem gravar nenhuma informação na blockchain. Ele fazia parte do protocolo de fio devp2p, mas agora está obsoleto. Existem outros [projetos relacionados](https://wakunetwork.com/) com objetivos semelhantes.

## A camada de consenso {#consensus-layer}

Os clientes de consenso participam de uma rede ponto a ponto separada com uma especificação diferente. Os clientes de consenso precisam participar da fofoca de blocos para que possam receber novos blocos de pares e transmiti-los quando for a vez deles de serem o propositor de bloco. Semelhante à camada de execução, isso primeiro requer um protocolo de descoberta para que um nó possa encontrar pares e estabelecer sessões seguras para a troca de blocos, atestações, etc.

### Descoberta {#consensus-discovery}

Semelhante aos clientes de execução, os clientes de consenso usam o [discv5](https://github.com/ethereum/consensus-specs/blob/master/specs/phase0/p2p-interface.md#the-discovery-domain-discv5) sobre UDP para encontrar pares. A implementação da camada de consenso do discv5 difere da dos clientes de execução apenas por incluir um adaptador conectando o discv5 a uma pilha [libp2p](https://libp2p.io/), tornando o devp2p obsoleto. As sessões RLPx da camada de execução estão obsoletas em favor do aperto de mão de canal seguro noise da libp2p.

### ENRs {#consensus-enr}

O ENR para nós de consenso inclui a chave pública do nó, endereço IP, portas UDP e TCP e dois campos específicos de consenso: o campo de bits da sub-rede de atestação e a chave `eth2`. O primeiro torna mais fácil para os nós encontrarem pares participando de sub-redes de fofoca de atestação específicas. A chave `eth2` contém informações sobre qual versão de bifurcação do Ethereum o nó está usando, garantindo que os pares estejam se conectando ao Ethereum correto.

### libp2p {#libp2p}

A pilha libp2p suporta todas as comunicações após a descoberta. Os clientes podem discar e ouvir em IPv4 e/ou IPv6 conforme definido em seu ENR. Os protocolos na camada libp2p podem ser subdivididos nos domínios de fofoca (gossip) e req/resp (solicitação/resposta).

### Fofoca (Gossip) {#gossip}

O domínio de fofoca inclui todas as informações que devem se espalhar rapidamente por toda a rede. Isso inclui blocos beacon, provas, atestações, saídas e cortes (slashings). Isso é transmitido usando o gossipsub v1 da libp2p e depende de vários metadados sendo armazenados localmente em cada nó, incluindo o tamanho máximo das cargas de fofoca para receber e transmitir. Informações detalhadas sobre o domínio de fofoca estão disponíveis [aqui](https://github.com/ethereum/consensus-specs/blob/master/specs/phase0/p2p-interface.md#the-gossip-domain-gossipsub).

### Solicitação-resposta {#request-response}

O domínio de solicitação-resposta contém protocolos para clientes que solicitam informações específicas de seus pares. Exemplos incluem a solicitação de blocos beacon específicos que correspondem a certos hashes raiz ou dentro de um intervalo de slots. As respostas são sempre retornadas como bytes codificados em SSZ compactados com snappy.

## Por que o cliente de consenso prefere SSZ a RLP? {#ssz-vs-rlp}

SSZ significa serialização simples (simple serialization). Ele usa deslocamentos fixos que facilitam a decodificação de partes individuais de uma mensagem codificada sem ter que decodificar toda a estrutura, o que é muito útil para o cliente de consenso, pois ele pode capturar com eficiência partes específicas de informações de mensagens codificadas. Ele também é projetado especificamente para se integrar com protocolos Merkle, com ganhos de eficiência relacionados para a Merkleização. Como todos os hashes na camada de consenso são raízes de Merkle, isso resulta em uma melhoria significativa. O SSZ também garante representações exclusivas de valores.

## Conectando os clientes de execução e de consenso {#connecting-clients}

Tanto os clientes de consenso quanto os de execução são executados em paralelo. Eles precisam estar conectados para que o cliente de consenso possa fornecer instruções ao cliente de execução, e o cliente de execução possa passar pacotes de transações para o cliente de consenso incluir em blocos beacon. A comunicação entre os dois clientes pode ser alcançada usando uma conexão RPC local. Uma API conhecida como ['Engine-API'](https://github.com/ethereum/execution-apis/blob/main/src/engine/common.md) define as instruções enviadas entre os dois clientes. Como ambos os clientes ficam atrás de uma única identidade de rede, eles compartilham um ENR (Registro de Nó do Ethereum) que contém uma chave separada para cada cliente (chave Eth1 e chave Eth2).

Um resumo do fluxo de controle é mostrado abaixo, com a pilha de rede relevante entre parênteses.

### Quando o cliente de consenso não é o produtor de bloco: {#when-consensus-client-is-not-block-producer}

- O cliente de consenso recebe um bloco por meio do protocolo de fofoca de bloco (p2p de consenso)
- O cliente de consenso pré-valida o bloco, ou seja, garante que ele chegou de um remetente válido com os metadados corretos
- As transações no bloco são enviadas para a camada de execução como uma carga de execução (conexão RPC local)
- A camada de execução executa as transações e valida o estado no cabeçalho do bloco (ou seja, verifica se os hashes correspondem)
- A camada de execução passa os dados de validação de volta para a camada de consenso, o bloco agora é considerado validado (conexão RPC local)
- A camada de consenso adiciona o bloco ao topo de sua própria blockchain e o atesta, transmitindo a atestação pela rede (p2p de consenso)

### Quando o cliente de consenso é o produtor de bloco: {#when-consensus-client-is-block-producer}

- O cliente de consenso recebe um aviso de que é o próximo produtor de bloco (p2p de consenso)
- A camada de consenso chama o método `create block` no cliente de execução (RPC local)
- A camada de execução acessa a mempool de transações que foi preenchida pelo protocolo de fofoca de transações (p2p de execução)
- O cliente de execução agrupa as transações em um bloco, executa as transações e gera um hash de bloco
- O cliente de consenso pega as transações e o hash do bloco do cliente de execução e os adiciona ao bloco beacon (RPC local)
- O cliente de consenso transmite o bloco pelo protocolo de fofoca de bloco (p2p de consenso)
- Outros clientes recebem o bloco proposto por meio do protocolo de fofoca de bloco e o validam conforme descrito acima (p2p de consenso)

Uma vez que o bloco tenha sido atestado por validadores suficientes, ele é adicionado ao topo da cadeia, justificado e, eventualmente, finalizado.

![Diagram of the Ethereum consensus client networking layer](cons_client_net_layer.png)
![Diagram of the Ethereum execution client networking layer](exe_client_net_layer.png)

Esquema da camada de rede para clientes de consenso e execução, de [ethresear.ch](https://ethresear.ch/t/eth1-eth2-client-relationship/7248)

## Leitura adicional {#further-reading}

[devp2p](https://github.com/ethereum/devp2p)
[libp2p](https://github.com/libp2p/specs)
[Especificações de rede da camada de consenso](https://github.com/ethereum/consensus-specs/blob/master/specs/phase0/p2p-interface.md#enr-structure)
[kademlia para discv5](https://vac.dev/kademlia-to-discv5)
[artigo sobre kademlia](https://pdos.csail.mit.edu/~petar/papers/maymounkov-kademlia-lncs.pdf)
[introdução ao p2p do Ethereum](https://p2p.paris/en/talks/intro-ethereum-networking/)
[relação Eth1/Eth2](https://ethresear.ch/t/eth1-eth2-client-relationship/7248)
[vídeo sobre detalhes do cliente Eth2 e a Fusão (The Merge)](https://www.youtube.com/watch?v=zNIrIninMgg)