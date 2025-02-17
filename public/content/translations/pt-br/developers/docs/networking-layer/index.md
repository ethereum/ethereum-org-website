---
title: Camada da Rede
description: Introdução à camada de rede Ethereum
lang: pt-br
sidebarDepth: 2
---

Ethereum é uma rede ponto a ponto com milhares de nós que devem ser capazes de se comunicar uns com os outros usando protocolos padronizados. A "camada de rede" é a pilha de protocolos que permite que esses nós se encontrem e troquem informações. Isso inclui "propagar" informações (comunicação um-para-muitos) na rede, bem como trocar solicitações e respostas entre nós específicos (comunicação um-para-um). Cada nó deve aderir a regras de rede específicas para garantir que eles estejam enviando e recebendo as informações corretas.

Existem duas partes no software cliente (clientes de execução e clientes de consenso), cada uma com sua própria pilha de rede distinta. Além de se comunicar com outros nós Ethereum, a execução e o consenso de clientes têm de se comunicar entre si. Esta página fornece uma explicação introdutória dos protocolos que permitem essa comunicação.

Clientes de execução transmitem transações na rede ponto a ponto na camada de execução. Isso requer comunicação criptografada entre pares autenticados. Quando um validador é selecionado para propor um bloco, as transações do pool de transações locais do nó são passadas para clientes de consenso através de uma conexão RPC local, que será empacotada em blocos Beacon. Os clientes de consenso irão, então, propagar blocos Beacon em sua rede p2p. Isso requer duas redes p2p separadas: uma conectando clientes de execução para propagação de transação e outra conectando clientes de consenso para propagação de bloco.

## Pré-requisitos {#prerequisites}

Alguns conhecimentos dos [nós e clientes](/developers/docs/nodes-and-clients/) do Ethereum serão úteis para entender esta página.

## A camada de execução {#execution-layer}

Os protocolos de rede da camada de execução são divididos em duas pilhas:

- a pilha de descoberta: criada em cima do UDP e que permite que um novo nó encontre pares para se conectar

- a pilha DevP2P: fica no topo do TCP e permite que os nós troquem informações

Ambas as pilhas funcionam em paralelo. A pilha de descoberta alimenta novos participantes da rede e a pilha DevP2P permite suas interações.

### Descoberta {#discovery}

Descoberta é o processo de encontrar outros nós na rede. Isso é inicializado usando um pequeno conjunto de bootnodes (nós cujos endereços são [hardcoded](https://github.com/ethereum/go-ethereum/blob/master/params/bootnodes.go) dentro do cliente para que possam ser encontrados imediatamente e conectar o cliente aos pares). Estes bootnodes (nós de inicialização) existem apenas para introduzir um novo nó a um conjunto de pares. Esse é o único objetivo deles; eles não participam de tarefas normais do cliente como sincronizar a cadeia e são usados somente na primeira vez que um cliente é ativado.

O protocolo usado para as interações de node-bootnode (nós de inicialização) é uma forma modificada de [Kademlia](https://medium.com/coinmonks/a-brief-overview-of-kademlia-and-its-use-in-various-decentralized-platforms-da08a7f72b8f) que usa uma [tabela de hash distribuída](https://en.wikipedia.org/wiki/Distributed_hash_table) para compartilhar listas de nós. Cada nó tem uma versão desta tabela contendo as informações necessárias para se conectar aos seus pares mais próximos. Essa 'proximidade' não é geográfica. A distância é definida pela semelhança do ID de nós. A tabela de cada nó é atualizada regularmente como um recurso de segurança. Por exemplo, no [Discv5](https://github.com/ethereum/devp2p/tree/master/discv5), os nós do protocolo de descoberta também podem enviar 'anúncios' que exibem os subprotocolos que o cliente suporta, permitindo que os pares negociem sobre os protocolos que ambos podem usar para se comunicar.

A descoberta começa com um jogo de PING-PONG. Um PING-PONG bem-sucedido "liga" o novo nó a um bootnode (nó de inicialização). A mensagem inicial que alerta um bootnode sobre a existência de um novo nó entrando na rede é um `PING`. Este `PING` inclui informações em hash sobre o novo nó, o bootnode e um carimbo de data/hora de expiração. O bootnode recebe o `PING` e retorna um `PONG` contendo o hash `PING`. Se os hashes `PING` e `PONG` corresponderem, então a conexão entre o novo nó e o bootnode será verificada e diz-se que eles têm "vínculo".

Uma vez vinculado, o novo nó pode enviar uma solicitação `FIND-NEIGHBOURS` para o bootnode. Os dados retornados pelo bootnode incluem uma lista de peers aos quais o novo nó pode se conectar. Se os nós não estiverem vinculados, a solicitação `FIND-NEIGHBOURS` falhará, então o novo nó não poderá entrar na rede.

Uma vez que o novo nó recebe uma lista de vizinhos do bootnode, ele inicia uma troca de PING-PONG com cada um deles. PING-PONGs bem-sucedidos unem o novo nó com seus vizinhos, permitindo a troca de mensagens.

```
start client --> connect to bootnode --> bond to bootnode --> find neighbours --> bond to neighbours
```

Os clientes de execução estão usando atualmente o protocolo de descoberta [Discv4](https://github.com/ethereum/devp2p/blob/master/discv4.md) e há um esforço ativo para migrar para o protocolo [Discv5](https://github.com/ethereum/devp2p/tree/master/discv5).

#### ENR: Registros de Nó Ethereum {#enr}

O [Registro de Nó Ethereum (ENR)](/developers/docs/networking-layer/network-addresses/) é um objeto que contém três elementos básicos: uma assinatura (hash do conteúdo do registro feito de acordo com algum esquema de identidade acordado), um número de sequência que rastreia as alterações no registro e uma lista arbitrária de pares chave:valor. Este é um formato moderno que permite uma troca mais fácil de informações de identificação entre novos pares e é o formato de [endereço de rede](/developers/docs/networking-layer/network-addresses) preferido dos nós Ethereum.

#### Por que a descoberta é construída no UDP? {#why-udp}

O UDP não suporta nenhuma verificação de erros, reenvio de pacotes com falha ou abertura e fechamento de conexões dinamicamente. Em vez disso, ele apenas dispara um fluxo contínuo de informações em um destino, independentemente de ter sido recebido com sucesso. Essa funcionalidade mínima também se traduz em sobrecarga mínima, tornando esse tipo de conexão muito rápida. Para descoberta, onde um nó simplesmente quer tornar sua presença conhecida, para depois estabelecer uma conexão formal com um par, o UDP é suficiente. No entanto, para o restante da pilha de rede, o UDP não é adequado. A troca de informações entre nós é bastante complexa e, portanto, precisa de um protocolo mais completo que possa suportar reenvio, verificação de erros etc. A sobrecarga adicional associada ao TCP vale a funcionalidade adicional. Portanto, a maioria da pilha P2P opera sobre TCP.

### DevP2P {#devp2p}

O DevP2P é em si uma pilha inteira de protocolos que o Ethereum implementa para estabelecer e manter a rede ponto a ponto. Depois que novos nós entram na rede, suas interações são regidas por protocolos na pilha [DevP2P](https://github.com/ethereum/devp2p). Todos eles ficam em cima do TCP e incluem o protocolo de transporte RLPx, o protocolo de fio e vários subprotocolos. [RLPx](https://github.com/ethereum/devp2p/blob/master/rlpx.md) é o protocolo que controla o início, a autenticação e a manutenção de sessões entre nós. O RLPx codifica mensagens usando RLP (Prefixo de Comprimento Recursivo), que é um método muito eficiente de codificação de dados em uma estrutura mínima para envio entre nós.

Uma sessão RLPx entre dois nós começa com um acerto criptográfico inicial. Isso envolve o nó enviando uma mensagem de autenticação que é então verificada pelo par. Na verificação bem-sucedida, o para gera uma mensagem de confirmação de autenticação para retornar ao nó inicializador. Este é um processo de troca de chaves que permite que os nós se comuniquem de forma privada e segura. Um aperto de mão criptográfico bem-sucedido aciona ambos os nós para enviar uma mensagem "hello" um ao outro "na rede". O protocolo de transmissão é iniciado por uma troca bem-sucedida de mensagens de saudação.

A mensagem "hello" contém:

- versão do protocolo
- ID do cliente
- porta
- ID do nó
- lista de subprotocolos suportados

Essa é a informação necessária para uma interação bem-sucedida, pois define quais recursos são compartilhados entre ambos os nós e configura a comunicação. Existe um processo de negociação de subprotocolos em que as listas de subprotocolos suportados por cada nó são comparadas e aqueles que são comuns a ambos os nós podem ser utilizados na sessão.

Junto com as mensagens de saudação, o protocolo de transmissão também pode enviar uma mensagem de "desconexão" que avisa a um par que a conexão será fechada. O protocolo de transmissão também inclui mensagens PING e PONG que são enviadas periodicamente para manter uma sessão aberta. As trocas de protocolo RLPx e de transmissão, portanto, estabelecem as bases da comunicação entre os nós, fornecendo o scaffolding para que informações úteis sejam trocadas de acordo com um subprotocolo específico.

### Subprotocolos {#sub-protocols}

#### Protocolo de transmissão {#wire-protocol}

Uma vez que os pares estão conectados e uma sessão RLPx foi iniciada, o protocolo de transmissão define como os pares se comunicam. Inicialmente, o protocolo de transmissão definiu três tarefas principais: sincronização de cadeia, propagação de bloco e troca de transação. No entanto, uma vez que o Ethereum mudou para a prova de participação, a propagação do bloco e a sincronização da cadeia tornaram-se parte da camada de consenso. A troca de transações ainda é da responsabilidade dos clientes de execução. A troca de transações refere-se à troca de transações pendentes entre nós para que os construtores de blocos possam selecionar algumas delas para inclusão no próximo bloco. Informações detalhadas sobre essas tarefas estão disponíveis [aqui](https://github.com/ethereum/devp2p/blob/master/caps/eth.md). Os clientes que oferecem suporte a esses subprotocolos os expõem por meio do [JSON-RPC](/developers/docs/apis/json-rpc/).

#### les (subprotocolo ethereum leve) {#les}

Este é um protocolo mínimo para sincronizar clientes leves. Esse protocolo raramente é usado porque são necessários nós completos para fornecer dados a clientes leves sem serem incentivados. O comportamento padrão dos clientes de execução é não transmitir dados de clientes leves sobre subprotocolos ethereum leve (les). Mais informações estão disponíveis nas [especificações](https://github.com/ethereum/devp2p/blob/master/caps/les.md).

#### Captura {#snap}

O [protocolo de captura](https://github.com/ethereum/devp2p/blob/master/caps/snap.md#ethereum-snapshot-protocol-snap) é uma extensão opcional que permite que pares troquem instantâneos de estados recentes, permitindo que os pares verifiquem dados de conta e armazenamento sem precisar baixar nós intermediários da árvore Merkle.

#### Wit (protocolo de testemunha) {#wit}

O [protocolo de testemunha](https://github.com/ethereum/devp2p/blob/master/caps/wit.md#ethereum-witness-protocol-wit) é uma extensão opcional que permite a troca de testemunhas de estado entre os pares, ajudando a sincronizar os clientes com a ponta da cadeia.

#### Whisper {#whisper}

Whisper era um protocolo que visava entregar mensagens seguras entre pares sem escrever qualquer informação na blockchain. Fazia parte do protocolo de transmissão DevP2P, mas agora está obsoleto. Existem outros [projetos relacionados](https://wakunetwork.com/) com objetivos semelhantes.

## A camada de consenso {#consensus-layer}

Os clientes de consenso participam de uma rede ponto a ponto separada com uma especificação diferente. Os clientes de consenso precisam participar de gossip (comunicação de um para muitos) do bloco para que possam receber novos blocos de pares e transmiti-los quando for sua vez de propor blocos. Semelhante à camada de execução, isto requer primeiro um protocolo de descoberta para que um nó possa encontrar pares e estabelecer sessões seguras para a troca de blocos, atestados etc.

### Descoberta {#consensus-discovery}

Semelhante aos clientes de execução, os clientes de consenso usam [discv5](https://github.com/ethereum/consensus-specs/blob/dev/specs/phase0/p2p-interface.md#the-discovery-domain-discv5) sobre UDP para encontrar pares. A implementação da camada de consenso do discv5 difere daquela dos clientes de execução apenas porque inclui um adaptador conectando o discv5 em uma pilha [libP2P](https://libp2p.io/), descontinuando o DevP2P. As sessões RLPx da camada de execução foram descontinuadas a favor do handshake (acerto) de canal seguro de ruído da libP2P.

### ENRs {#consensus-enr}

O ENR para nós de consenso inclui a chave pública do nó, endereço IP, portas UDP e TCP e dois campos específicos de consenso: o campo de bits (bitfield) da sub-rede de atestado e a chave `eth2`. O primeiro torna mais fácil para os nós encontrarem pares que participam de sub-redes de gossip de atestado específicas. A chave `eth2` contém informações sobre qual versão do fork Ethereum o nó está usando, garantindo que os pares estejam se conectando ao Ethereum correto.

### libP2P {#libp2p}

A pilha libP2P suporta todas as comunicações após a descoberta. Os clientes podem discar e escutar em IPv4 e/ou IPv6 conforme definido em seu ENR. Os protocolos na camada libP2P podem ser subdivididos nos domínios gossip e req/resp (envio/resposta).

### Gossip {#gossip}

O domínio gossip inclui todas as informações que precisam se espalhar rapidamente pela rede. Isso inclui blocos de sinalização, provas, atestados, saídas e cortes. Isso é transmitido usando libP2P gossipsub v1 e depende de vários metadados armazenados localmente em cada nó, incluindo o tamanho máximo de cargas de gossip para receber e transmitir. Informações detalhadas sobre o domínio gossip estão disponíveis [aqui](https://github.com/ethereum/consensus-specs/blob/dev/specs/phase0/p2p-interface.md#the-gossip-domain-gossipsub).

### Pedido-Resposta {#request-response}

O domínio de pedido-resposta contém protocolos para clientes que solicitam informações específicas de seus pares. Os exemplos incluem pedidos de blocos Beacon específicos que correspondam a determinados hashes raiz ou dentro de um intervalo de slots. As respostas são sempre retornadas como bytes codificados em SSZ compactados rapidamente.

## Por que o cliente de consenso prefere SSZ a RLP? {#ssz-vs-rlp}

SSZ significa serialização simples. Ela usa deslocamentos fixos que facilitam a decodificação de partes individuais de uma mensagem codificada sem ter que decodificar toda a estrutura, o que é muito útil para o cliente de consenso, pois pode capturar com eficiência informações específicas de mensagens codificadas. Ele também é projetado especificamente para integração com protocolos Merkle, com ganhos de eficiência relacionados para Merkleization (transformação resultante de árvores de Merkle). Como todos os hashes na camada de consenso são raízes de Merkle, isso resulta em uma melhoria significativa. A SSZ também garante representações únicas de valores.

## Conexão a execução e consensos de clientes {#connecting-clients}

Ambos os clientes de consenso e execução executam em paralelo. Eles precisam estar conectados para que o cliente de consenso possa fornecer instruções ao cliente de execução, e o cliente de execução possa passar pacotes de transações para o cliente de consenso para incluir nos blocos Beacon. A comunicação entre os dois clientes pode ser realizada usando uma conexão RPC local. Uma API conhecida como ['Engine-API'](https://github.com/ethereum/execution-apis/blob/main/src/engine/common.md) define as instruções enviadas entre os dois clientes. Como ambos os clientes estão atrás de uma única identidade de rede, eles compartilham um ENR (registro de nó Ethereum) que contém uma chave separada para cada cliente (chave eth1 e chave eth2).

Um resumo do fluxo de controle é mostrado abaixo, com a pilha de rede relevante entre colchetes.

### Quando o cliente de consenso não é produtor de bloco: {#when-consensus-client-is-not-block-producer}

- O cliente de consenso recebe um bloco através do protocolo gossip do bloco (consenso p2p)
- O cliente de consenso pré-valida o bloco, ou seja, garante que chegou de um remetente válido com metadados corretos
- As transações no bloco são enviadas para a camada de execução como um payload (carga de dados) de execução (conexão RPC local)
- A camada de execução executa as transações e valida o estado no cabeçalho do bloco (ou seja, verifica a correspondência de hashes)
- A camada de execução passa os dados de validação de volta para a camada de consenso, bloco agora considerado validado (conexão RPC local)
- A camada de consenso adiciona bloco no nício de sua própria blockchain e o atesta, transmitindo o atestado pela rede (consenso p2p)

### Quando o cliente de consenso é produtor de blocos: {#when-consensus-client-is-block-producer}

- O cliente de consenso recebe o aviso de que é o próximo produtor de bloco (consenso p2p)
- A camada de consenso chama o método `create block` no cliente de execução (RPC local)
- A camada de execução acessa o mempool da transação que foi preenchido pelo protocolo gossip de transação (execução p2p)
- O cliente de execução agrupa as transações em um bloco, executa as transações e gera um hash de bloco
- O cliente de consenso pega as transações e bloqueia o hash do cliente de execução e o adiciona ao bloco beacon (RPC local)
- O cliente de consenso transmite o bloco pelo protocolo gossip do bloco (consenso p2p)
- Outros clientes recebem o bloco proposto através do bloco do protocolo gossip e validam conforme descrito acima (consenso p2p)

Uma vez que o bloco tenha sido atestado por validadores suficientes, ele é adicionado ao cabeçalho da cadeia, justificado e finalmente finalizado.

![](cons_client_net_layer.png) ![](exe_client_net_layer.png)

Esquema da camada de rede para clientes de consenso e execução, de [ethresear.ch](https://ethresear.ch/t/eth1-eth2-client-relationship/7248)

## Leitura Adicional {#further-reading}

[DevP2P](https://github.com/ethereum/devp2p) [LibP2p](https://github.com/libp2p/specs) [Especificações de rede da camada de consenso](https://github.com/ethereum/consensus-specs/blob/dev/specs/phase0/p2p-interface.md#enr-structure) [Kademlia para Discv5](https://vac.dev/kademlia-to-discv5) [Paper Kademlia](https://pdos.csail.mit.edu/~petar/papers/maymounkov-kademlia-lncs.pdf) [Introdução ao Ethereum p2p](https://p2p.paris/en/talks/intro-ethereum-networking/) [Relacionamento eth1/eth2](http://ethresear.ch/t/eth1-eth2-client-relationship/7248) [Fusão e vídeo com detalhes do cliente eth2](https://www.youtube.com/watch?v=zNIrIninMgg)
