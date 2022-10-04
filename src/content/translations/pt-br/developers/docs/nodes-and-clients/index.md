---
title: Nós e clientes
description: Uma visão geral dos nós do Ethereum e do software do cliente, além de como configurar um nó e por que você deve fazer isso.
lang: pt-br
sidebarDepth: 2
---

O Ethereum é uma rede distribuída de computadores executando software (conhecidos como nós) que pode verificar blocos e dados de transação. Você precisa de um aplicativo, conhecido como cliente, no seu dispositivo para "executar" um nó.

## Pré-requisitos {#prerequisites}

Você deve entender o conceito de uma rede peer-to-peer e os conceitos básicos [do EVM](/developers/docs/evm/) antes de mergulhar mais fundo e executar a sua própria instância de um cliente Ethereum. Veja nossa [introdução ao Ethereum](/developers/docs/intro-to-ethereum/).

If you're new to the topic of nodes, we recommend first checking out our user-friendly introduction on [running an Ethereum node](/run-a-node).

## O que são nós e clientes? {#what-are-nodes-and-clients}

"Nó" refere-se a um software conhecido como cliente. Um cliente é uma implementação do Ethereum que verifica todas as transações em cada bloco, mantendo a rede segura e os dados precisos.

Você pode ter uma visão em tempo real da rede Ethereum olhando este [mapa dos nós](https://etherscan.io/nodetracker).

Existem muitos [clientes de Ethereum](/developers/docs/nodes-and-clients/#execution-clients) em uma variedade de linguagens de programação, como Go, Rust, JavaScript, Python, C# .NET e Java. O que essas implementações têm em comum é que todas elas seguem uma especificação formal (originalmente o [Ethereum Yellowpaper](https://ethereum.github.io/yellowpaper/paper.pdf)). Esta especificação determina como funciona a rede Ethereum e a blockchain.

![Cliente de execução](./client-diagram.png) Diagrama simplificado sobre as características do cliente Ethereum.

## Tipos de nó {#node-types}

Se você quer [executar o seu próprio nó](/developers/docs/nodes-and-clients/run-a-node/), você deve entender que existem diferentes tipos de nós que consomem dados diferentemente. Na verdade, os clientes podem executar 3 tipos diferentes de nó: light, full e archive. Existem também opções de diferentes estratégias de sincronização que permitem uma sincronização mais rápida. A sincronização se refere ao quão rápido ele pode obter as informações mais atualizadas sobre o estado do Ethereum.

### Nó Full {#full-node}

- Armazena dados completos da blockchain.
- Participa na validação de bloco, verifica todos os blocos e estados.
- Todos os estados podem ser derivados de um nó completo.
- Serve a rede e fornece dados mediante solicitação.

### Nó Light {#light-node}

- Armazena a cadeia do cabeçalho e solicita todo o resto.
- Pode verificar a validade dos dados contra os state roots nos cabeçalhos do bloco.
- Útil para dispositivos de baixa capacidade, como dispositivos integrados ou celulares, que não possuem recursos para armazenar gigabytes de dados blockchain.

### Nó Archive {#archive-node}

- Armazena tudo no nó inteiro e cria um arquivo de estados históricos. Necessário se você quiser consultar algo como um saldo de conta no bloco #4.000.000 ou simplesmente [testar de maneira simples e confiável suas próprias transações definidas sem minerá-las usando OpenEthereum](https://openethereum.github.io/Jsonrpc-trace-module#trace_callmany).
- Esses dados representam unidades de terabytes que tornam os nós de arquivo menos atrativos para usuários médios, mas podem ser úteis para serviços como exploradores de blocos, fornecedores de carteiras e análises de cadeia.

Sincronizar clientes em qualquer modo que não seja o de arquivo resultará na remoção de dados da blockchain. Isso significa que não há arquivo de todo o estado histórico, mas o nó completo é capaz de criá-lo sob demanda.

## Por que devo executar um nó Ethereum? {#why-should-i-run-an-ethereum-node}

A execução de um nó permite que você use o Ethereum de forma confiável e privada, ao mesmo tempo que apoia o ecossistema.

### Vantagens para você {#benefits-to-you}

A execução do seu próprio nó permite que você use o Ethereum de forma verdadeiramente privada, autossuficiente e confiável. Você não precisa confiar na rede porque você pode verificar os dados por conta própria com seu cliente. "Não confie, verifique" é um mantra popular da blockchain.

- Seu nó verifica todas as transações e blocos contra as regras de consenso por si só. Isso significa que você não precisa confiar em nenhum outro nó da rede nem confiar totalmente neles.
- Você não terá que transmitir seus endereços e saldos para nós aleatórios. Tudo pode ser verificado com seu próprio cliente.
- Seu dapp pode ser mais seguro e privado se você usar seu próprio nó. [MetaMask](https://metamask.io), [MyEtherWallet](https://myetherwallet.com) and some other wallets can be easily pointed to your own local node.
- Você pode programar seus próprios endpoints de RPC personalizados.
- Você pode se conectar ao seu nó usando **Inter-process Communications (IPC)** ou reescrever o nó para carregar seu programa como um plugin. Isto concede baixa latência, que é necessária para substituir suas transações o mais rápido possível (por exemplo, frontrunning).

![Como você acessr Ethereum através do seu aplicativo e nós](./nodes.png)

### Benefícios da rede {#network-benefits}

Um conjunto diversificado de nós é importante para a integridade, segurança e resiliência operacional do Ethereum.

- Eles fornecem acesso a dados blockchain para clientes leves que dependem disso. Em picos altos de uso, é necessário que haja nós cheios suficientes para ajudar na sincronização dos nós. Os nós leves não armazenam toda a blockchain. Em vez disso, eles verificam dados através das [raízes do estado nos cabeçalhos de blocos](/developers/docs/blocks/#block-anatomy). Eles podem solicitar mais informações a partir dos blocos, se precisarem.
- Nós completos impõem regras de consenso de prova de trabalho para que não possam ser enganados a aceitar blocos que não os seguem. Isto fornece segurança extra na rede porque se todos os nós fossem nós leves, que não fazem verificação completa, os minderadores poderiam atacar a rede e, por exemplo, criar blocos com recompensas maiores.

Se você executa um nó completo, toda a rede Ethereum se beneficia disso.

## Executando seu próprio nó {#running-your-own-node}

Interessado em executar o seu próprio cliente Ethereum?

For a beginner-friendly introduction visit our [run a node](/run-a-node) page to learn more.

If you're more of a technical user, learn how to [spin up your own node](/developers/docs/nodes-and-clients/run-a-node/) with the command line!

### Projetos {#projects}

[**Selecione um cliente e siga suas instruções**](#clients)

**ethnode -** **_Execute um nó Ethereum (Geth ou Parity) para desenvolvimento local._**

- [GitHub](https://github.com/vrde/ethnode)

**DAppNode -** **_Um sistema operacional para executar nós Web3, incluindo Ethereum, em uma máquina dedicada._**

- [dappnode.io](https://dappnode.io)

### Recursos {#resources}

- [Executando nós completos do Ethereum: um guia completo](https://medium.com/coinmonks/running-ethereum-full-nodes-a-guide-for-the-barely-motivated-a8a13e7a0d31) _ - Justin Leroux, 7 de novembro de 2019_
- [Resumo sobre configuração de nós](https://dev.to/5chdn/ethereum-node-configuration-modes-cheat-sheet-25l8) _ - Afri Schoeden, 5 de janeiro de 2019_
- [Como instalar e executar um nó Geth](https://www.quiknode.io/guides/infrastructure/how-to-install-and-run-a-geth-node) _ - Sahil Sen, 4 de outubro de 2020_
- [Como instalar e executar um nó OpenEthereum (também conhecido com. Parity)](https://www.quiknode.io/guides/infrastructure/how-to-run-a-openethereum-ex-parity-client-node) _ - Sahil Sen, 22 de setembro de 2020_

## Alternativas {#alternatives}

Executar seu próprio nó pode ser difícil e você não precisa sempre executar sua própria instância. Neste caso, você pode usar um provedor de API de terceiros como [Infura](https://infura.io), [Alquemy](https://alchemyapi.io) ou [QuikNode](https://www.quiknode.io). Alternativamente [ArchiveNode](https://archivenode.io/) é um nó de arquivo financiado pela comunidade que espera trazer dados de arquivos na blockchain Ethereum para desenvolvedores independentes que, de outro modo, não poderiam pagar por isso. For an overview of using these services, check out [nodes as a service](/developers/docs/nodes-and-clients/nodes-as-a-service/).

Se alguém executa um nó Ethereum com uma API pública em sua comunidade, você pode apontar suas carteiras ligeiras (como MetaMask) para um nó da comunidade [via RPC personalizado](https://metamask.zendesk.com/hc/en-us/articles/360015290012-Using-a-Local-Node) e ganhar mais privacidade do que com alguns terceiros aleatórios de confiança.

Por outro lado, se você executar um cliente, você pode compartilhá-lo com quem precisar.

## Clientes de execução (antigos clientes 'Eth1') {#execution-clients}

A comunidade de Ethereum mantém vários clientes de execução (previamente conhecidos como clientes 'Eth1', ou apenas 'clientes de Ethereum') de código aberto, desenvolvidos por diferentes equipes usando diferentes linguagens de programação. Isto torna a rede mais forte e mais diversificada. O objectivo ideal é alcançar a diversidade sem que qualquer cliente domine para reduzir quaisquer pontos de fracasso.

Esta tabela resume os diferentes clientes. Todos eles passam em [testes de cliente](https://github.com/ethereum/tests) e são ativamente mantidos para ficarem atualizados com as atualizações da rede.

| Client                                                                    | Linguagem de programação | Sistemas operacionais | Redes                                            | Estratégias de sincronização | Limpeza de estado |
| ------------------------------------------------------------------------- | ------------------------ | --------------------- | ------------------------------------------------ | ---------------------------- | ----------------- |
| [Geth](https://geth.ethereum.org/)                                        | Go                       | Linux, Windows, macOS | Rede principal, Görli, Rinkeby, Ropsten          | Snap, Full                   | Archive, Pruned   |
| [Nethermind](http://nethermind.io/)                                       | C#, .NET                 | Linux, Windows, macOS | Rede principal, Görli, Ropsten, Rinkeby e outras | Fast, Beam, Archive          | Archive, Pruned   |
| [Besu](https://besu.hyperledger.org/en/stable/)                           | Java                     | Linux, Windows, macOS | Mainnet, Rinkeby, Ropsten, Görli, and more       | Fast, Full                   | Archive, Pruned   |
| [Erigon](https://github.com/ledgerwatch/erigon)                           | Go                       | Linux, Windows, macOS | Rede principal, Görli, Rinkeby, Ropsten          | Full                         | Archive, Pruned   |
| [OpenEthereum (Deprecated)](https://github.com/openethereum/openethereum) | Rust                     | Linux, Windows, macOS | Rede principal, Kovan, Ropsten e outros          | Warp, completo               | Archive, Pruned   |

**Note que o OpenEthereum [foi descontinuado](https://medium.com/openethereum/gnosis-joins-erigon-formerly-turbo-geth-to-release-next-gen-ethereum-client-c6708dd06dd) e não está mais sendo mantido.** Use-o com cuidado e de preferência mude para outra implementação do cliente.

Para mais informações sobre as redes suportadas, leia[redes Ethereum](/developers/docs/networks/).

### Vantagens de diferentes implementações {#advantages-of-different-implementations}

Cada cliente tem casos de uso únicos e vantagens exclusivas, o que permite você escolher um com base nas suas próprias preferências. A diversidade permite que as implementações sejam focadas em diferentes recursos e públicos de usuários. Você pode escolher um cliente baseado em recursos, suporte, linguagem de programação ou licenças.

#### Go Ethereum {#geth}

Go Ethereum (Geth for short) é uma das implementações originais do protocolo Ethereum. Atualmente, é o cliente mais difundido com a maior base de usuários e a maior variedade de ferramentas para usuários e desenvolvedores. É escrito em Go, totalmente aberto e licenciado sob a GNU LGPL v3.

#### OpenEthereum {#openethereum}

O OpenEthereum é um cliente de Ethereum rápido, rico em recursos e avançado. Criado para fornecer a infraestrutura essencial para serviços rápidos e confiáveis, que requerem sincronização rápida e tempo máximo. O objetivo do OpenEthereum é ser o cliente Ethereum mais rápido, mais leve e mais seguro. Ele fornece uma base de código limpa e modular para:

- fácil personalização.
- integração leve a serviços ou produtos.
- suporte mínimo de memória e armazenamento.

O OpenEthereum é desenvolvido utilizando a linguagem de programação Rust de ponta e licenciado sob a GPLv3.

**Note que o OpenEthereum [foi descontinuado](https://medium.com/openethereum/gnosis-joins-erigon-formerly-turbo-geth-to-release-next-gen-ethereum-client-c6708dd06dd) e não está mais sendo mantido.** Use-o com cuidado e de preferência mude para outra implementação do cliente.

#### Nethermind {#nethermind}

Nethermind é uma implementação Ethereum criada com a pilha tecnológica C# .NET, em execução em todas as principais plataformas, incluindo a ARM. Ele oferece grande desempenho com:

- uma máquina virtual otimizada
- acesso ao estado
- rede e recursos ricos como painéis Prometheus/Graphana, suporte ao registro empresarial seq, rastreamento JSON RPC e plugins de análise.

Nethermind também tem [documentação detalhada](https://docs.nethermind.io), forte suporte a desenvolvedores, uma comunidade online e suporte 24/7 disponível para usuários premium.

#### Besu {#besu}

Hyperledger Besu é um cliente Ethereum de nível empresarial para redes públicas e autorizadas. Ele executa todos os recursos do mainnet da Ethereum, do rastreamento ao GraphQL, tem um extenso monitoramento e é suportado pelo ConsenSys, tanto em canais comunitários abertos como através de SLAs comerciais para as empresas. Ele é escrito em Java e é licenciado pelo Apache 2.0.

#### Erigon {#erigon}

Erigon, outrora conhecida como Turbo├Geth, é uma bifurcação da Go Ethereum orientada para velocidade e eficiência de espaço em disco. A Erigon é uma implementação completamente re-arquitetada da Ethereum, atualmente escrita em Go mas com implementações de outras línguas planejadas. O objetivo da Erigon é fornecer um mais rápido, mais módulo e uma implementação mais otimizada do Ethereum. Ele pode executar uma sincronização completa do nó de arquivo usando menos de 2TB de espaço em disco, em menos de 3 dias

### Modos de sincronização {#sync-modes}

Para acompanhar e verificar os dados atuais na rede, o cliente Ethereum precisa sincronizar com o estado da rede mais recente. Isso é feito baixando dados de pares, verificando criptograficamente sua integridade e construindo um banco de dados de blockchain local.

Os modos de sincronização representam diferentes abordagens para este processo com vários trade-offs. Os clientes também variam na implementação dos algoritmos de sincronização. Sempre consulte a documentação oficial do cliente escolhido para obter detalhes sobre a implementação.

#### Visão geral das estratégias {#overview-of-strategies}

Visão geral das abordagens de sincronização usadas nos clientes preparados para o Mainnet:

##### Sincronização completa {#full-sync}

A sincronização completa baixa todos os blocos (incluindo cabeçalhos, transações e recibos) e gera o estado da blockchain de maneira incremental ao executar todos os blocos a partir da gênesis.

- Minimiza a confiança e oferece a maior segurança, verificando todas as transações.
- Com um número crescente de transações, pode levar dias a semanas para processar todas as transações.

##### Sincronização rápida

Rápido (Padrão) - baixa todos os blocos (incluindo cabeçalhos, transações e recibos), verifica todos os cabeçalhos e baixa o estado e verifica-os contra os cabeçalhos.

- Se baseia na segurança do mecanismo de consenso.
- A sincronização demora apenas algumas horas.

##### Sincronização leve

Modo cliente leve baixa todos os cabeçalhos de bloco, bloqueia dados e verifica alguns aleatoriamente. Somente sincroniza a ponta da cadeia no ponto de verificação confiável.

- Obtém apenas o estado mais recente enquanto confia em desenvolvedores e no mecanismo de consenso.
- Cliente pronto para usar com o estado atual da rede em alguns minutos.

[Mais sobre clientes Light](https://www.parity.io/blog/what-is-a-light-client/)

##### Sincronização instantânea

Implementado por Geth. Usar snapshots dinâmicos servidos por pares, recupera toda a conta e dados de armazenamento sem baixar nós de trie intermediários e depois reconstrui o Trie Merkle localmente.

- Estratégia de sincronização mais rápida desenvolvida pela Geth, atualmente o padrão dela
- Economiza muito uso de disco e largura de banda de rede sem sacrificar a segurança.

[Mais no Snap](https://github.com/ethereum/devp2p/blob/master/caps/snap.md)

##### Sincronização Warp

Implementado por OpenEthereum. Os nós geram regularmente um instantâneo de estado crítico do consenso e qualquer ponto pode buscar essas capturas instantâneas pela rede, permitindo uma sincronização rápida a partir deste ponto.

- O modo de sincronização mais rápido e padrão do OpenEthereum depende de snapshots estáticos disponibilizados por pares.
- Estratégia similar à sincronização instantânea, mas sem certas vantagens de segurança.

[Beam sync](https://openethereum.github.io/Beginner-Introduction#warping---no-warp)

##### Sincronização Beam

Implementado por Nethermind e Trinity. Funciona como sincronização rápida, mas também baixa os dados necessários para executar os blocos mais recentes, o que te permite consultar a cadeia dentro dos primeiros minutos desde o início.

- Sincroniza o estado primeiro e permite que você consulte RPC em alguns minutos.
- Ainda em desenvolvimento e não totalmente confiável, a sincronização em segundo plano é desacelerada e as respostas do RPC podem falhar.

[Mais em Beam](https://medium.com/@jason.carver/intro-to-beam-sync-a0fd168be14a)

#### Configuração no cliente {#client-setup}

Os clientes oferecem opções de configuração ricas para atender às suas necessidades. Escolha o que melhor lhe convier com base no nível de segurança, dados disponíveis e custo. Além do algoritmo de sincronização, você pode também definir a limpeza de diferentes tipos de dados antigos. A limpeza habilita a exclusão de dados desatualizados, por exemplo, remover nós de trie do estado que são inacessíveis de blocos recentes.

Preste atenção à documentação do cliente ou página de ajuda para descobrir qual modo de sincronização é o padrão. Você define o tipo de sincronização quando você está configurado, assim:

**Configurando sincronização de luz em [GETH](https://geth.ethereum.org/) ou [ERIGON](https://github.com/ledgerwatch/erigon)**

`geth --syncmode "light"`

Para mais detalhes, confira o tutorial em [rodando Geth light node](/developers/tutorials/run-light-node-geth/).

**Configuração de sincronização completa com arquivo no [Besu](https://besu.hyperledger.org/)**

`besu --sync-mode=FULL`

Como qualquer outra configuração, pode ser definida com a bandeira de inicialização ou no arquivo de configuração. Outro exemplo é o [Nethermind](https://docs.nethermind.io/nethermind/) que pede que você escolha uma configuração durante a primeira inicialização e cria um arquivo de configuração.

## Clientes de consenso (antigos clientes 'Eth2') {#consensus-clients}

Existem vários clientes de consenso (anteriormente conhecidos como clientes 'Eth2') para dar suporte às [implementações de consenso](/upgrades/beacon-chain/). They are running the Beacon Chain and will provide proof-of-stake consensus mechanism to execution clients after [The Merge](/upgrades/merge/).

[Ver os clientes de consenso](/upgrades/get-involved/#clients).

| Cliente                                                     | Linguagem de programação | Sistemas operacionais | Redes                                 |
| ----------------------------------------------------------- | ------------------------ | --------------------- | ------------------------------------- |
| [Teku](https://pegasys.tech/teku)                           | Java                     | Linux, Windows, macOS | Beacon Chain, Prater                  |
| [Nimbus](https://nimbus.team/)                              | Nim                      | Linux, Windows, macOS | Beacon Chain, Prater                  |
| [Lighthouse](https://lighthouse-book.sigmaprime.io/)        | Rust                     | Linux, Windows, macOS | Beacon Chain, Prater, Pyrmont         |
| [Lodestar](https://lodestar.chainsafe.io/)                  | TypeScript               | Linux, Windows, macOS | Beacon Chain, Prater                  |
| [Prysm](https://docs.prylabs.network/docs/getting-started/) | Vamos                    | Linux, Windows, macOS | Beacon Chain, Gnosis, Prater, Pyrmont |

## Hardware {#hardware}

Requisitos de hardware diferem pelo cliente mas geralmente não são tão altos, já que o nó só precisa ser sincronizado. Não confunda isso com mineração, o que requer muito mais poder de computação. Sincronize tempo e desempenho no entanto melhore com hardware mais poderoso. Dependendo das suas necessidades e desejos, a Ethereum pode ser executada em seu computador, servidor doméstico, computadores de placa única ou servidores virtuais privados na nuvem.

Uma maneira fácil de executar o seu próprio nó é usando caixas 'plug and play' como [DAppNode](https://dappnode.io/). Ele fornece hardware para rodar clientes e aplicativos que dependem deles com uma interface simples de usuário.

### Requisitos {#requirements}

Antes de instalar qualquer cliente, por favor certifique-se de que seu computador tem recursos suficientes para executá-lo. Requisitos mínimos e recomendados podem ser encontrados abaixo, no entanto a parte chave é o espaço em disco. Sincronizar a blockchain Ethereum é muito de entrada/saída intensiva. É melhor ter um drive de estado sólido (SSD). Para executar um cliente Ethereum no HDD, você precisará de pelo menos 8GB de RAM para usar como cache.

#### Requisitos mínimos {#recommended-specifications}

- CPU com mais de 2 núcleos
- Mínimo de 4 GB de RAM com SSD, 8 GB ou mais se você tiver um HDD
- 8+ MBit/s de largura de banda

#### Especificações recomendadas {#recommended-specifications}

- CPU rápida com mais de 4 núcleos
- - de 16 GB de RAM
- SSD rápido com pelo menos 500 GB de espaço livre
- - de 25 MBit/s de largura de banda

O modo de sincronização que você escolher afetará os requisitos de espaço, mas estimamos o espaço em disco que você precisará para cada cliente abaixo.

| Cliente      | Tamanho do disco (sincronização rápida) | Tamanho do disco (arquivo completo) |
| ------------ | --------------------------------------- | ----------------------------------- |
| Geth         | 400GB+                                  | 6TB+                                |
| OpenEthereum | 280GB+                                  | 6TB+                                |
| Nethermind   | 200GB+                                  | 5TB+                                |
| Besu         | 750GB+                                  | 5TB+                                |
| Erigon       | N/A                                     | 1TB+                                |

- Observação: Erigon não faz sincronização rápida, mas a limpeza completa é possível (~500GB)

![Um gráfico que mostra que o GB necessário para uma sincronização completa está em alta](./full-sync.png)

![Um gráfico que mostra que o GB necessário para uma sincronização completa está em alta](./archive-sync.png)

Estes gráficos mostram como os requisitos de armazenamento estão sempre mudando. Para os dados mais atualizados para Geth e Parity, consulte [a sincronização completa dos dados](https://etherscan.io/chartsync/chaindefault) e [arquivos sincronizados](https://etherscan.io/chartsync/chainarchive).

### Ethereum em um computador de placa única {#ethereum-on-a-single-board-computer}

A maneira mais conveniente e barata de executar o nó Ethereum é usar um único computador de mesa com arquitetura ARM como o Raspberry Pi. [Ethereum em ARM](https://twitter.com/EthereumOnARM) fornece imagens de clientes Geth, Parity, Nethermind e Besu. Aqui está um tutorial simples sobre [como criar e configurar um cliente ARM](/developers/tutorials/run-node-raspberry-pi/).

Dispositivos pequenos, acessíveis e eficientes como estes são ideais para executar um nó em casa.

## Leitura adicional {#further-reading}

Há muitas informações sobre os clientes Ethereum na Internet. Aqui estão alguns recursos que podem ser úteis.

- [Fundamentos do Ethereum - Parte 2: Entendendo os nós](https://kauri.io/ethereum-101-part-2-understanding-nodes/48d5098292fd4f11b251d1b1814f0bba/a) _– Wil Barnes, 13 de fevereiro de 2019_
- [Executando nós completos do Ethereum: um guia completo](https://medium.com/@JustinMLeroux/running-ethereum-full-nodes-a-guide-for-the-barely-motivated-a8a13e7a0d31) _ - Justin Leroux, 7 de novembro de 2019_
- [Executando um nó Ethereum](https://docs.ethhub.io/using-ethereum/running-an-ethereum-node/) _– ETHHub, atualizado frequentemente_
- [Analisando os requisitos de hardware para um nó validado completo do Ethereum](https://medium.com/coinmonks/analyzing-the-hardware-requirements-to-be-an-ethereum-full-validated-node-dc064f167902) _– Albert Palau, 24 de setembro de 2018_
- [Executando um nó Hyperledger Besu na rede principal de Ethereum: benefícios, requisitos e configuração](https://pegasys.tech/running-a-hyperledger-besu-node-on-the-ethereum-mainnet-benefits-requirements-and-setup/) _– Felipe Faraggi, 7 de maio de 2020_

## Tópicos relacionados {#related-topics}

- [Blocos](/developers/docs/blocks/)
- [Redes](/developers/docs/networks/)

## Tutoriais relacionados {#related-tutorials}

- [Executando um nó com Geth](/developers/tutorials/run-light-node-geth/) _: como baixar, instalar e executar o Geth. Covering syncmodes, the JavaScript console, and more._
- [Transforme sua Raspberry Pi em um nó de validação apenas instalando a configuração em um cartão MicroSD: guia de instalação](/developers/tutorials/run-node-raspberry-pi/) _- Formate sua Raspberry Pi 4, conecte o disco SSD e ligue o dispositivo para transformar sua Raspberry Pi 4 em um full node de Ethereum para executar a camada de execução (rede principal) e/ou a camada de consenso (Beacon Chain/validador)._
