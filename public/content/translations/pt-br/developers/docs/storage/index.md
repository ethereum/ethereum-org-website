---
title: Armazenamento descentralizado
description: Visão geral do que é o armazenamento descentralizado e as ferramentas disponíveis para integrá-lo a um dapp.
lang: pt-br
authors: ["Patrick Collins"]
---

Ao contrário de um servidor centralizado operado por uma única empresa ou organização, os sistemas de armazenamento descentralizado consistem em uma rede ponto a ponto de usuários-operadores que mantêm uma parte dos dados gerais, criando um sistema resiliente de compartilhamento de armazenamento de arquivos. Eles podem estar em um aplicativo baseado em blockchain ou em qualquer rede baseada em ponto a ponto.

A própria Ethereum pode ser usada como um sistema de armazenamento descentralizado, e é, quando se trata de armazenamento de código em todos os contratos inteligentes. No entanto, quando se trata de grandes quantidades de dados, não foi para isso que a Ethereum foi projetada. A cadeia está crescendo constantemente, mas no momento da redação deste artigo, a cadeia da Ethereum tem cerca de 500 GB a 1 TB ([dependendo do cliente](https://etherscan.io/chartsync/chaindefault)), e cada nó na rede precisa ser capaz de armazenar todos os dados. Se a cadeia se expandisse para grandes quantidades de dados (digamos, 5 TBs), não seria viável para todos os nós continuarem a funcionar. Além disso, o custo de implantação dessa quantidade de dados na Mainnet seria proibitivamente caro devido às taxas de [gás](/developers/docs/gas).

Devido a essas restrições, precisamos de uma cadeia ou metodologia diferente para armazenar grandes quantidades de dados de forma descentralizada.

Ao analisar as opções de armazenamento descentralizado (dStorage), há algumas coisas que o usuário deve ter em mente.

- Mecanismo de persistência / estrutura de incentivos
- Aplicação de retenção de dados
- Descentralização
- Consenso

## Mecanismo de persistência / estrutura de incentivos {#persistence-mechanism}

### Baseado em blockchain {#blockchain-based}

Para que um dado persista para sempre, precisamos usar um mecanismo de persistência. Por exemplo, na Ethereum, o mecanismo de persistência é que toda a cadeia precisa ser contabilizada ao executar um nó. Novos dados são adicionados ao final da cadeia, e ela continua a crescer - exigindo que cada nó replique todos os dados incorporados.

Isso é conhecido como persistência **baseada em blockchain**.

O problema com a persistência baseada em blockchain é que a cadeia pode ficar grande demais para manter e armazenar todos os dados de forma viável (por exemplo, [muitas fontes](https://healthit.com.au/how-big-is-the-internet-and-how-do-we-measure-it/) estimam que a Internet exija mais de 40 Zettabytes de capacidade de armazenamento).

A blockchain também deve ter algum tipo de estrutura de incentivos. Para a persistência baseada em blockchain, há um pagamento feito ao validador. Quando os dados são adicionados à cadeia, os validadores são pagos para adicionar os dados.

Plataformas com persistência baseada em blockchain:

- Ethereum
- [Arweave](https://www.arweave.org/)

### Baseado em contrato {#contract-based}

A persistência **baseada em contrato** tem a intuição de que os dados não podem ser replicados por todos os nós e armazenados para sempre, e em vez disso devem ser mantidos com acordos de contrato. Estes são acordos feitos com vários nós que prometeram manter um dado por um período de tempo. Eles devem ser reembolsados ou renovados sempre que se esgotarem para manter os dados persistidos.

Na maioria dos casos, em vez de armazenar todos os dados onchain, o hash de onde os dados estão localizados em uma cadeia é armazenado. Dessa forma, a cadeia inteira não precisa escalar para manter todos os dados.

Plataformas com persistência baseada em contrato:

- [Filecoin](https://docs.filecoin.io/basics/what-is-filecoin)
- [Skynet](https://sia.tech/)
- [Storj](https://storj.io/)
- [Züs](https://zus.network/)
- [Crust Network](https://crust.network)
- [Swarm](https://www.ethswarm.org/)
- [4EVERLAND](https://www.4everland.org/)

### Considerações adicionais {#additional-consideration}

O IPFS é um sistema distribuído para armazenar e acessar arquivos, sites, aplicativos e dados. Ele não tem um esquema de incentivos integrado, mas pode ser usado com qualquer uma das soluções de incentivos baseadas em contrato acima para persistência de longo prazo. Outra maneira de persistir dados no IPFS é trabalhar com um serviço de fixação (pinning), que irá "fixar" seus dados para você. Você pode até mesmo executar seu próprio nó IPFS e contribuir com a rede para persistir seus dados e/ou de outros gratuitamente!

- [IPFS](https://docs.ipfs.io/concepts/what-is-ipfs/)
- [Pinata](https://www.pinata.cloud/) _(serviço de fixação IPFS)_
- [web3.storage](https://web3.storage/) _(serviço de fixação IPFS/Filecoin)_
- [Infura](https://infura.io/product/ipfs) _(serviço de fixação IPFS)_
- [IPFS Scan](https://ipfs-scan.io) _(explorador de fixação IPFS)_
- [4EVERLAND](https://www.4everland.org/)_（serviço de fixação IPFS）_
- [Filebase](https://filebase.com) _(serviço de fixação IPFS)_
- [Spheron Network](https://spheron.network/) _(serviço de fixação IPFS/Filecoin)_

O Swarm é uma tecnologia de armazenamento e distribuição de dados descentralizada com um sistema de incentivos de armazenamento e um oráculo de preço de aluguel de armazenamento.

## Retenção de dados {#data-retention}

Para reter dados, os sistemas devem ter algum tipo de mecanismo para garantir que os dados sejam retidos.

### Mecanismo de desafio {#challenge-mechanism}

Uma das maneiras mais populares de garantir que os dados sejam retidos é usar algum tipo de desafio criptográfico que é emitido para os nós para garantir que eles ainda tenham os dados. Um exemplo simples é observar a prova de acesso (proof-of-access) da Arweave. Eles emitem um desafio aos nós para ver se eles têm os dados tanto no bloco mais recente quanto em um bloco aleatório no passado. Se o nó não conseguir apresentar a resposta, ele é penalizado.

Tipos de dStorage com um mecanismo de desafio:

- Züs
- Skynet
- Arweave
- Filecoin
- Crust Network
- 4EVERLAND

### Descentralização {#decentrality}

Não existem ótimas ferramentas para medir o nível de descentralização das plataformas, mas, em geral, você vai querer usar ferramentas que não tenham alguma forma de KYC para fornecer evidências de que não são centralizadas.

Ferramentas descentralizadas sem KYC:

- Skynet
- Arweave
- Filecoin
- IPFS
- Ethereum
- Crust Network
- 4EVERLAND

### Consenso {#consensus}

A maioria dessas ferramentas tem sua própria versão de um [mecanismo de consenso](/developers/docs/consensus-mechanisms/), mas geralmente são baseadas em [**Prova de Trabalho (PoW)**](/developers/docs/consensus-mechanisms/pow/) ou [**Prova de Participação (PoS)**](/developers/docs/consensus-mechanisms/pos/).

Baseado em Prova de Trabalho (PoW):

- Skynet
- Arweave

Baseado em Prova de Participação (PoS):

- Ethereum
- Filecoin
- Züs
- Crust Network

## Ferramentas relacionadas {#related-tools}

**IPFS - _O InterPlanetary File System é um sistema de armazenamento descentralizado e referência de arquivos para a Ethereum._**

- [Ipfs.io](https://ipfs.io/)
- [Documentação](https://docs.ipfs.io/)
- [GitHub](https://github.com/ipfs/ipfs)

**Storj DCS - _Armazenamento de objetos em nuvem descentralizado, seguro, privado e compatível com S3 para desenvolvedores._**

- [Storj.io](https://storj.io/)
- [Documentação](https://docs.storj.io/)
- [GitHub](https://github.com/storj/storj)

**Sia - _Aproveita a criptografia para criar um mercado de armazenamento em nuvem sem necessidade de confiança, permitindo que compradores e vendedores façam transações diretamente._**

- [Skynet.net](https://sia.tech/)
- [Documentação](https://docs.sia.tech/)
- [GitHub](https://github.com/SiaFoundation/)

**Filecoin - _A Filecoin foi criada pela mesma equipe por trás do IPFS. É uma camada de incentivos sobre os ideais do IPFS._**

- [Filecoin.io](https://filecoin.io/)
- [Documentação](https://docs.filecoin.io/)
- [GitHub](https://github.com/filecoin-project/)

**Arweave - _A Arweave é uma plataforma dStorage para armazenar dados._**

- [Arweave.org](https://www.arweave.org/)
- [Documentação](https://docs.arweave.org/info/)
- [Arweave](https://github.com/ArweaveTeam/arweave/)

**Züs - _A Züs é uma plataforma dStorage de Prova de Participação (PoS) com fragmentação (sharding) e blobbers._**

- [zus.network](https://zus.network/)
- [Documentação](https://docs.zus.network/zus-docs/)
- [GitHub](https://github.com/0chain/)

**Crust Network - _A Crust é uma plataforma dStorage construída sobre o IPFS._**

- [Crust.network](https://crust.network)
- [Documentação](https://wiki.crust.network)
- [GitHub](https://github.com/crustio)

**Swarm - _Uma plataforma de armazenamento distribuído e serviço de distribuição de conteúdo para a pilha Web3 da Ethereum._**

- [EthSwarm.org](https://www.ethswarm.org/)
- [Documentação](https://docs.ethswarm.org/)
- [GitHub](https://github.com/ethersphere/)

**OrbitDB - _Um banco de dados ponto a ponto descentralizado construído sobre o IPFS._**

- [OrbitDB.org](https://orbitdb.org/)
- [Documentação](https://github.com/orbitdb/field-manual/)
- [GitHub](https://github.com/orbitdb/orbit-db/)

**Aleph.im - _Projeto de nuvem descentralizada (banco de dados, armazenamento de arquivos, computação e identidade descentralizada - DID). Uma mistura única de tecnologia ponto a ponto offchain e onchain. Compatibilidade com IPFS e múltiplas cadeias._**

- [Aleph.im](https://aleph.cloud/)
- [Documentação](https://docs.aleph.cloud/)
- [GitHub](https://github.com/aleph-im/)

**Ceramic - _Armazenamento de banco de dados IPFS controlado pelo usuário para aplicativos ricos em dados e envolventes._**

- [Ceramic.network](https://ceramic.network/)
- [Documentação](https://developers.ceramic.network/)
- [GitHub](https://github.com/ceramicnetwork/js-ceramic/)

**Filebase - _Armazenamento descentralizado compatível com S3 e serviço de fixação IPFS georredundante. Todos os arquivos enviados para o IPFS por meio da Filebase são fixados automaticamente na infraestrutura da Filebase com replicação 3x em todo o mundo._**

- [Filebase.com](https://filebase.com/)
- [Documentação](https://docs.filebase.com/)
- [GitHub](https://github.com/filebase)

**4EVERLAND - _Uma plataforma de computação em nuvem da Web 3.0 que integra recursos essenciais de armazenamento, computação e rede, é compatível com S3 e fornece armazenamento de dados síncrono em redes de armazenamento descentralizado, como IPFS e Arweave._**

- [4everland.org](https://www.4everland.org/)
- [Documentação](https://docs.4everland.org/)
- [GitHub](https://github.com/4everland)

**Kaleido - _Uma plataforma de blockchain como serviço com nós IPFS de um clique_**

- [Kaleido](https://kaleido.io/)
- [Documentação](https://docs.kaleido.io/kaleido-services/ipfs/)
- [GitHub](https://github.com/kaleido-io)

**Spheron Network - _A Spheron é uma plataforma como serviço (PaaS) projetada para dapps que buscam lançar seus aplicativos em infraestrutura descentralizada com o melhor desempenho. Ela fornece computação, armazenamento descentralizado, CDN e hospedagem na web prontos para uso._**

- [spheron.network](https://spheron.network/)
- [Documentação](https://docs.spheron.network/)
- [GitHub](https://github.com/spheronFdn)

**dweb3 - _Resolvedor para páginas da web descentralizadas, semelhante ao eth.limo, suportando todos os tipos e não se limitando a ENS e IPFS._**

- [dweb3.wtf](https://dweb3.wtf)

**web3compass - _Mecanismo de busca para sites descentralizados apoiados por IPFS + ENS._**

- [web3compass.net](https://www.web3compass.net/)
- [Documentação](https://www.web3compass.net/statistics)

## Leitura adicional {#further-reading}

- [O que é armazenamento descentralizado?](https://coinmarketcap.com/academy/article/what-is-decentralized-storage-a-deep-dive-by-filecoin) - _CoinMarketCap_
- [Desmistificando cinco mitos comuns sobre armazenamento descentralizado](https://www.storj.io/blog/busting-five-common-myths-about-decentralized-storage) - _Storj_

_Conhece um recurso da comunidade que o ajudou? Edite esta página e adicione-o!_

## Tópicos relacionados {#related-topics}

- [Estruturas de desenvolvimento](/developers/docs/frameworks/)