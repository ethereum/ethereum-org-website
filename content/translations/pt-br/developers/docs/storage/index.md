---
title: Armazenamento Descentralizado
description: Visão geral do que é o armazenamento descentralizado e as ferramentas disponíveis para integrar a um dapp.
lang: pt-br
---

Ao contrário de um servidor localizado centralmente operado por uma única empresa ou organização, os sistemas de armazenamento descentralizado consistem em uma rede ponto a ponto de usuários operadores que mantêm uma parte dos dados gerais, criando um sistema resiliente de armazenamento e compartilhamento de arquivos. Elas podem estar em um aplicativo baseado em blockchain ou qualquer rede baseada em peer-to-peer.

A Ethereum em si pode ser usada como um sistema de armazenamento descentralizado, e é quando se trata de codificar o armazenamento em todos os contratos inteligentes. No entanto, quando se trata de grandes quantidades de dados, para as quais a Ethereum não foi concebida. A corrente está crescendo constantemente, mas no momento da escrita, a cadeia Ethereum é de cerca de 500GB - 1TB ([dependendo do cliente](https://etherscan.io/chartsync/chaindefault)), e cada nó da rede precisa ser capaz de armazenar todos os dados. Se a cadeia fosse expandir para grandes quantidades de dados (diga 5TBs) não seria viável que todos os nós continuassem a rodar. Além disso, o custo de implantar essa quantidade de dados para a rede principal seria proibitivamente caro devido às taxas de [gás](/developers/docs/gas).

Devido a essas restrições, precisamos de uma cadeia ou metodologia diferente para armazenar grandes quantidades de dados de forma descentralizada.

Ao analisar as opções de armazenamento descentralizado (dStorage), existem algumas coisas que o usuário deve ter em mente.

- Mecanismo de persistência/estrutura de incentivo
- Execução de retenção de dados
- Descentralizada
- Consenso

## Mecanismo de persistência / estrutura de incentivo {#persistence-mechanism}

### Baseado em blockchain {#blockchain-based}

Para que uma peça de dados se mantenha para sempre, precisamos utilizar um mecanismo de persistência. Por exemplo, na Ethereum, o mecanismo de persistência é que toda a cadeia precisa ser contabilizada ao executar um nó. Novos dados são empilhados no final da cadeia, continuando a crescer - exigindo que cada nó replique todos os dados embutidos.

Conhecemos isto como persistência **baseada em blockchain**.

O problema com persistência baseada em blockchain é que a cadeia pode ficar muito grande para manter e armazenar todos os dados viáveis (por exemplo, [muitas fontes](https://healthit.com.au/how-big-is-the-internet-and-how-do-we-measure-it/) estimam que a Internet precisa de mais de 40 Zetabytes de capacidade de armazenamento).

A blockchain (cadeia de blocos) também deve ter algum tipo de estrutura de incentivo. Para persistência baseada em blockchain, há um pagamento feito ao validador. Quando os dados são adicionados à cadeia, os validadores são pagos para adicionar os dados.

Plataformas com persistência baseada em blockchain (cadeia de blocos):

- Ethereum
- [Arweave](https://www.arweave.org/)

### Baseado em contratos {#contract-based}

A persistência **baseada em contrato** tem a intuição de que os dados não podem ser replicados por todos os nós e mantidos para sempre, senão que, ao invés disso, devem ser mantidos com acordos de contrato. Trata-se de acordos celebrados com vários nós que prometeram a conservação de dados por um período de tempo. Devem ser reembolsados ou renovados sempre que se esgotem para manter os dados persistentes.

Na maioria dos casos, em vez de armazenar todos os dados on-chain, o hash de onde os dados estão localizados em uma cadeia é armazenado. Dessa forma, a cadeia inteira não precisará escalar para guardar todos os dados.

Plataformas com persistência baseada em blockchain (cadeia de blocos):

- [Filecoin](https://docs.filecoin.io/about-filecoin/what-is-filecoin/)
- [Skynet](https://siasky.net/)
- [Storj](https://storj.io/)
- [Züs](https://zus.network/)
- [Rede Crust](https://crust.network)
- [Swarm](https://www.ethswarm.org/)
- [4EVERLAND](https://www.4everland.org/)

### Considerações finais {#additional-consideration}

IPFS é um sistema distribuído para armazenamento e acesso a arquivos, sites, aplicações e dados. Ele não tem um esquema baseado em incentivos, mas pode ser usado com qualquer uma das soluções acima baseadas em contratos de incentivos para persistências de longo prazo. Outra maneira de persistir dados no IPFS é trabalhar com um serviço fixo, que permita "fixar" seus dados para você. Você pode até mesmo rodar seu próprio nó IPFS e contribuir para a rede para persistir seus dados ou os de outra pessoa de forma gratuita!

- [IPFS](https://docs.ipfs.io/concepts/what-is-ipfs/)
- [Pinata](https://www.pinata.cloud/) _(serviço de fixação IPFS)_
- [web3.storage](https://web3.storage/) _(serviço de fixação IPFS/Filecoin)_
- [Infura](https://infura.io/product/ipfs) _(serviço de fixação IPFS)_
- [Verificação IPFS](https://ipfs-scan.io) _(explorador de fixação de IPFS)_
- [4EVERLAND](https://www.4everland.org/)_ (Serviço de fixação IPFS) _
- [Filebase](https://filebase.com) _(Serviço de Fixação IPFS)_

SWARM é uma tecnologia descentralizada de armazenamento e distribuição de dados com um sistema de incentivo ao armazenamento e um oráculo de preços de aluguel de armazenamento.

## Retenção de dados {#data-retention}

A fim de conservar dados, os sistemas devem dispor de algum tipo de mecanismo para garantir a conservação dos dados.

### Mecanismo de desafio {#challenge-mechanism}

Uma das maneiras mais populares de garantir que os dados sejam mantidos, é usar algum tipo de desafio criptográfico emitido aos nós para ter certeza que eles ainda possuem os dados. Uma pessoa simples é olhar para a comprovação de acesso da Arweave. Eles lançam um desafio aos nós para ver se eles têm os dados tanto no bloco mais recente quanto em um bloco aleatório no passado. Se o nó não conseguir dar a resposta, ele será penalizado.

Tipos de dStorage com um mecanismo de desafio:

- Züs
- Skynet
- Arweave
- Filecoin
- Rede Crust
- 4EVERLAND

### Descentralização {#decentrality}

Não há ótimas ferramentas para medir o nível de descentralização das plataformas, mas, em geral, você vai querer usar ferramentas que não têm nenhuma forma de KYC para fornecer evidências que não estão centralizadas.

Ferramentas descentralizadas sem KYC:

- Züs (implementação de uma edição não-KYC)
- Skynet
- Arweave
- Filecoin
- IPFS
- Ethereum
- Rede Crust
- 4EVERLAND

### Consenso {#consensus}

A maioria dessas ferramentas tem sua própria versão de um [mecanismo de consenso](/developers/docs/consensus-mechanisms/) mas, geralmente, elas são baseadas em [**proof-of-work (prova de trabalho)**](/developers/docs/consensus-mechanisms/pow/) ou [**proof-of-stake (prova de participação, PoS)**](/developers/docs/consensus-mechanisms/pos/).

Baseado em prova de trabalho (proof-of-work):

- Skynet
- Arweave

Baseado em prova de participação (proof-of-stake):

- Ethereum
- Filecoin
- Züs
- Rede Crust

## Ferramentas relacionadas {#related-tools}

**IPFS - _InterPlanetary File System é um sistema descentralizado de armazenamento e referenciamento de arquivos para a Ethereum._**

- [Ipfs.io](https://ipfs.io/)
- [Documentação](https://docs.ipfs.io/)
- [GitHub](https://github.com/ipfs/ipfs)

**Storj DCS - _Armazenamento descentralizado e compatível com a S3-Cloud para desenvolvedores._**

- [Storj.io](https://storj.io/)
- [Documentação](https://docs.storj.io/)
- [GitHub](https://github.com/storj/storj)

**Skynet - _O Skynet é uma cadeia descentralizada de PoW dedicada a uma web descentralizada._**

- [Skynet.net](https://siasky.net/)
- [Documentação](https://siasky.net/docs/)
- [GitHub](https://github.com/SkynetLabs/)

**Filecoin - _Filecoin foi criado pela mesma equipe por trás do IPFS. É uma camada de incentivo no topo dos ideais IPFS._**

- [Filecoin.io](https://filecoin.io/)
- [Documentação](https://docs.filecoin.io/)
- [GitHub](https://github.com/filecoin-project/)

**Arweave - _Arweave é uma plataforma de dStorage para armazenar dados._**

- [Arweave.org](https://www.arweave.org/)
- [Documentação](https://docs.arweave.org/info/)
- [Arweave](https://github.com/ArweaveTeam/arweave/)

**Züs - _Züs é uma plataforma de prova de participação dStorage com fragmentação e blobbers._**

- [zus.network](https://zus.network/)
- [Documentação](https://0chaindocs.gitbook.io/zus-docs)
- [GitHub](https://github.com/0chain/)

**Rede Croust - _Crust é uma plataforma de dStorage no topo do IPFS._**

- [Crust.network](https://crust.network)
- [Documentação](https://wiki.crust.network)
- [GitHub](https://github.com/crustio)

**Swarm - _Uma plataforma de armazenamento distribuída e serviço de distribuição de conteúdo para a pilha Ethereum web3._**

- [EthSwarm.org](https://www.ethswarm.org/)
- [Documentação](https://docs.ethswarm.org/docs/)
- [GitHub](https://github.com/ethersphere/)

**OrbitDB - _Um banco de dados descentralizado peer-to-peer no topo do IPFS._**

- [OrbitDB.org](https://orbitdb.org/)
- [Documentação](https://github.com/orbitdb/field-manual/)
- [GitHub](https://github.com/orbitdb/orbit-db/)

**Aleph.im - _Projeto na nuvem descentralizado (banco de dados, armazenamento de arquivos, computação e DID). Uma combinação única de tecnologia off-chain e peer-to-peer. IPFS e compatibilidade multicadeia._**

- [Aleph.im](https://aleph.im/)
- [Documentação](https://aleph.im/#/developers/)
- [GitHub](https://github.com/aleph-im/)

**Ceramic - _Armazenamento de banco de dados IPFS controlado pelo usuário para aplicativos ricos em dados e envolventes._**

- [Ceramic.network](https://ceramic.network/)
- [Documentação](https://developers.ceramic.network/learn/welcome/)
- [GitHub](https://github.com/ceramicnetwork/js-ceramic/)

**Filebase - _Armazenamento descentralizado compatível com S3 e serviço de fixação IPFS com redundância geográfica. Todos os arquivos carregados para o IPFS através do Filebase são automaticamente fixados na infraestrutura do Filebase com replicação 3x em todo o mundo._**

- [Filebase.com](https://filebase.com/)
- [Documentação](https://docs.filebase.com/)
- [GitHub](https://github.com/filebase)

**4EVERLAND - _Plataforma web 3.0 de computação em nuvem que integra armazenamento, computação e capacidades de núcleo em rede, é compatível com o S3 e fornece armazenamento de dados síncrono em redes de armazenamento descentralizadas, como IPFS e Arweave. s_**

- [4everland.org](https://www.4everland.org/)
- [Documentação](https://docs.4everland.org/)
- [GitHub](https://github.com/4everland)

**Kaleido - _Uma plataforma blockchain como serviço com nós IPFS ao clique de um botão_**

- [Kaleido](https://kaleido.io/)
- [Documentação](https://docs.kaleido.io/kaleido-services/ipfs/)
- [GitHub](https://github.com/kaleido-io)

## Leitura adicional {#further-reading}

- [O que é armazenamento descentralizado?](https://coinmarketcap.com/alexandria/article/what-is-decentralized-storage-a-deep-dive-by-filecoin) - _CoinMarketCap_
- [Cinco Mitos Comuns sobre o Armazenamento Descentralizado](https://www.storj.io/blog/busting-five-common-myths-about-decentralized-storage) - _Storj_

_Conhece um recurso da comunidade que ajudou você? Edite essa página e adicione-o!_

## Tópicos relacionados {#related-topics}

- [Estruturas de desenvolvimento](/developers/docs/frameworks/)
