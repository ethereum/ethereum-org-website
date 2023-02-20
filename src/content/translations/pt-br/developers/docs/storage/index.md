---
title: Armazenamento Descentralizado
description: Visão geral do que é o armazenamento descentralizado e as ferramentas disponíveis para integrar a um dapp.
lang: pt-br
---

Ao contrário de um servidor localizado centralmente operado por uma única empresa ou organização, os sistemas de armazenamento descentralizado consistem em uma rede ponto a ponto de usuários operadores que mantêm uma parte dos dados gerais, criando um sistema resiliente de armazenamento e compartilhamento de arquivos. Elas podem ser em um aplicativo baseado em cadeia de blocos ou qualquer rede baseada em peer-to-peer.

O Ethereum em si pode ser usado como um sistema de armazenamento descentralizado, e é quando se trata de codificar o armazenamento em todos os contratos inteligentes. No entanto, quando se trata de grandes quantidades de dados, para as quais a Ethereum não foi projetada. A corrente está crescendo constantemente, mas no momento da escrita, a cadeia Ethereum é de cerca de 500GB - 1TB ([dependendo do cliente](https://etherscan.io/chartsync/chaindefault)), e cada nó da rede precisa ser capaz de armazenar todos os dados. Se a cadeia fosse expandir para grandes quantidades de dados (diga 5TBs) não seria viável que todos os nós continuassem a rodar. Além disso, o custo de implantar essa quantidade de dados para a rede principal seria proibitivamente caro devido às taxas de [gás](/developers/docs/gas).

Devido a essas restrições, precisamos de uma cadeia ou metodologia diferente para armazenar grandes quantidades de dados de forma descentralizada.

Ao olhar para opções de armazenamento descentralizado (dStorage), existem algumas coisas que o usuário deve ter em mente.

- Mecanismo de persistência / estrutura de incentivo
- Execução de retenção de dados
- Descentralizada
- Consenso

## Mecanismo de persistência / estrutura de incentivo {#persistence-mechanism}

### Baseado em cadeia de blocos {#blockchain-based}

Para que uma peça de dados se mantenha para sempre, precisamos utilizar um mecanismo de persistência. Por exemplo, no Ethereum, o mecanismo de persistência é que toda a cadeia precisa ser contabilizada ao executar um nó. Novos dados são empilhados no final da cadeia, continuando a crescer - exigindo que cada nó replique todos os dados embutidos.

Isto é conhecido como uma persistência **baseada em cadeia de blocos**.

A problema com persistência baseada em cadeia de blocos é que a cadeia pode ficar muito grande para manter e armazenar todos os dados viáveis (por exemplo, [muitas fontes](https://healthit.com.au/how-big-is-the-internet-and-how-do-we-measure-it/) estimam que a Internet precisa de mais de 40 Zetabytes de capacidade de armazenamento).

A cadeia de blocos também deve ter algum tipo de estrutura de incentivo. Para persistência baseada em cadeia de blocos, há um pagamento feito para o minerador. Quando os dados são adicionados à cadeia, os nós são pagos para adicionar os dados.

Plataformas com persistência baseada em cadeia de blocos:

- Ethereum
- [Arweave](https://www.arweave.org/)

### Baseado em contratos {#contract-based}

A persistência **baseada em contrato** tem a intuição de que os dados não podem ser replicados por todos os nós e mantidos para sempre, senão que, ao invés disso, devem ser mantidos com acordos de contrato. Trata-se de acordos celebrados com vários nós que prometeram a conservação de dados por um período de tempo. Devem ser reembolsados ou renovados sempre que se esgotem para manter os dados persistentes.

Na maioria dos casos, em vez de armazenar todos os dados em cadeia, o hash de onde os dados estão localizados em uma cadeia fica armazenado. Dessa forma, a cadeia inteira não precisará escalar para guardar todos os dados.

Plataformas com persistência baseada em cadeia de blocos:

- [Filecoin](https://docs.filecoin.io/about-filecoin/what-is-filecoin/)
- [Skynet](https://siasky.net/)
- [Storj](https://storj.io/)
- [0Chain](https://0chain.net/)

### Considerações finais {#additional-consideration}

IPFS é um sistema distribuído para armazenamento e acesso a arquivos, sites, aplicações e dados. Ele não tem um esquema baseado em incentivos, mas pode ser usado com qualquer uma das soluções acima baseadas em contratos de incentivos para persistências de longo prazo. Outra maneira de persistir dados no IPFS é trabalhar com um serviço fixo, que permita "fixar" seus dados para você. Você pode até mesmo rodar seu próprio nó IPFS e contribuir para a rede para persistir seus dados ou os de outra pessoa de forma gratuita!

- [IPFS](https://docs.ipfs.io/concepts/what-is-ipfs/)
- [Pinata](https://www.pinata.cloud/) _(serviço de fixação IPFS)_
- [web3.storage](https://web3.storage/) _(serviço de fixação IPFS/Filecoin)_
- [Infura](https://infura.io/product/ipfs) _(serviço de fixação IPFS)_

## Retenção de dados {#data-retention}

A fim de conservar dados, os sistemas devem dispor de algum tipo de mecanismo para garantir a conservação dos dados.

### Mecanismo de desafio {#challenge-mechanism}

Uma das maneiras mais populares de garantir que os dados sejam mantidos, é usar algum tipo de desafio criptográfico que é emitido aos nós para ter certeza que eles ainda possuem os dados. Uma pessoa simples é olhar para a prova de acesso da Arweave. Eles lançam um desafio aos nós para ver se eles têm os dados tanto no bloco mais recente quanto em um bloco aleatório no passado. Se o nó não conseguir dar a resposta, ele será penalizado.

Tipos de dStorage com um mecanismo de desafio:

- 0Chain
- Skynet
- Arweave
- Filecoin

### Descentralização {#decentrality}

Não há ótimas ferramentas para medir o nível de descentralização das plataformas, mas, em geral, você vai querer usar ferramentas que não têm nenhuma forma de KYC para fornecer evidências que não estão centralizadas.

Ferramentas descentralizadas sem KYC:

- 0Chain (implementação de uma edição não-KYC)
- Skynet
- Arweave
- Filecoin
- IPFS
- Ethereum

### Consenso {#consensus}

A maioria dessas ferramentas tem sua própria versão de um [mecanismo de consenso](/developers/docs/consensus-mechanisms/) mas, geralmente, elas são baseadas em [**proof-of-work**](/developers/docs/consensus-mechanisms/pow/) ou [**proof-of-stake (PoS)**](/developers/docs/consensus-mechanisms/pos/).

Baseado no PoW:

- Skynet
- Arweave
- Ethereum

Baseado no PoS:

- [A Beacon Chain](/upgrades/beacon-chain/)
- Filecoin
- 0Chain

## Ferramentas relacionadas {#related-tools}

**IPFS - _InterPlanetary File System é um sistema descentralizado de armazenamento e referenciamento de arquivos para a Ethereum._**

- [Ipfs.io](https://ipfs.io/)
- [Documentação](https://docs.ipfs.io/)
- [GitHub](https://github.com/ipfs/ipfs)

**Storj DCS - _Armazenamento descentralizado e compatível com a S3-Cloud para desenvolvedores._**

- [Storj.io](https://storj.io/)
- [Documentação](https://docs.storj.io/)

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

**0chain - _0Chain é uma plataforma de prova de participação dStorage com fragmentação e blobbers._**

- [0Chain.net](https://0chain.net/)
- [Documentação](https://docs.0chain.net/0chain/)
- [GitHub](https://github.com/0chain/)

**Swarm - _Uma plataforma de armazenamento distribuída e serviço de distribuição de conteúdo para a pilha Ethereum web3._**

- [EthSwarm.org](https://www.ethswarm.org/)
- [Documentação](https://docs.ethswarm.org/docs/)
- [GitHub](https://github.com/ethersphere/)

**OrbitDB - _Um banco de dados descentralizado peer-to-peer em cima do IPFS._**

- [OrbitDB.org](https://orbitdb.org/)
- [Documentação](https://github.com/orbitdb/field-manual/)
- [GitHub](https://github.com/orbitdb/orbit-db/)

**Aleph.im - _Projeto na nuvem descentralizado (banco de dados, armazenamento de arquivos, computação e DID). Uma combinação única de tecnologia offchain e peer-to-peer. IPFS e compatibilidade multi-chain._**

- [Aleph.im](https://aleph.im/)
- [Documentação](https://aleph.im/#/developers/)
- [GitHub](https://github.com/aleph-im/)

**Ceramic - _Armazenamento de banco de dados IPFS controlado pelo usuário para aplicativos ricos em dados e envolventes._**

- [Ceramic.network](https://ceramic.network/)
- [Documentação](https://developers.ceramic.network/learn/welcome/)
- [GitHub](https://github.com/ceramicnetwork/js-ceramic/)

**Filebase - _The first S3-compatible object storage platform that allows you to store data across multiple decentralized storage networks including IPFS, Sia, Skynet, and Storj._**

- [Filebase.com](https://filebase.com/)
- [Documentação](https://docs.filebase.com/)
- [GitHub](https://github.com/filebase)

## Leitura adicional {#further-reading}

- [O que é armazenamento descentralizado?](https://coinmarketcap.com/alexandria/article/what-is-decentralized-storage-a-deep-dive-by-filecoin) - _CoinMarketCap_
- [Cinco Mitos Comuns sobre o Armazenamento Descentrado](https://www.storj.io/blog/busting-five-common-myths-about-decentralized-storage) - _Storj_

_Conhece algum recurso da comunidade que o ajudou? Edite essa página e adicione!_

## Tópicos relacionados {#related-topics}

- [Estruturas de desenvolvimento](/developers/docs/frameworks/)
