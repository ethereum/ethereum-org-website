---
title: Empresas na Rede principal Ethereum
description: Guias, artigos e ferramentas sobre aplicativos empresariais na blockchain pública do Ethereum
lang: pt-br
---

# Rede principal Ethereum para empresas {#ethereum-for-enterprise}

Os aplicativos de blockchain ajudam empresas a:

- Aumentar a confiança e reduzir o custo de coordenação entre os parceiros de negócios
- Melhorar a responsabilidade da rede de negócios e a eficiência operacional
- Criar novos modelos de negócios e oportunidades de criação de valor
- Preparar a organização para o futuro de maneira competitiva

Aplicativos da cadeia de blocos empresarial podem ser construídos na [Rede Principal](/glossary/#mainnet) Ethereum ou em cadeias de blocos privadas baseadas na tecnologia Ethereum. Encontre mais informações em [cadeias privadas do Ethereum](/enterprise/private-ethereum/).

## Ethereum público x privado {#private-vs-public}

Existe apenas uma Rede principal Ethereum pública. Os aplicativos construídos na Rede principal são capazes de interoperar, da mesma forma que os aplicativos construídos na Internet podem se conectar entre si, aproveitando todo o potencial da cadeia de blocos descentralizada.

Muitas empresas e consórcios implantaram cadeias de blocos privadas e autorizadas para aplicações específicas baseadas na tecnologia Ethereum.

### Principais diferenças {#key-differences}

- Segurança/Imutabilidade da cadeia de blocos – A resistência de uma cadeia de blocos à manipulação é determinada pelo seu algoritmo de consenso. A Rede principal Ethereum é protegida pela interação de milhares de nós independentes executados por indivíduos e mineradores em todo o mundo. As cadeias privadas normalmente têm um pequeno número de nós controlados por uma ou algumas organizações; esses nós podem ser fortemente controlados, mas apenas alguns devem ser comprometidos para reescrever a cadeia ou cometer transações fraudulentas.
- Desempenho – Como as cadeias privadas do Ethereum empresarial podem usar nós de alto desempenho com requisitos especiais de hardware e diferentes algoritmos de consenso, como a prova de autoridade, elas podem alcançar uma taxa de transferência mais alta na camada de base (Camada 1). Na Rede principal Ethereum, é possível alcançar altas taxa de transferência com o uso de [soluções de escalonamento de Camada 2](/developers/docs/scaling/#layer-2-scaling).
- Custo – O custo para operar uma cadeia privada é refletido principalmente no trabalho para configurar e gerenciar a cadeia, e os servidores para executá-la. Embora não haja custos para se conectar à Rede principal Ethereum, existe um custo de gás para todas as transações, que devem ser pagas em Ether. Os retransmissores de transações (mais conhecidas como Postos de Combustível) estão sendo desenvolvidos para eliminar a necessidade de os usuários finais e até as empresas usarem Ether diretamente em suas transações. Algumas [análises](https://github.com/EYBlockchain/fundamental-cost-of-ownership/blob/master/EY%20Total%20Cost%20of%20Ownership%20for%20Blockchain%20Solutions.pdf) mostraram que o custo total para operar uma aplicação pode ser menor na Rede principal do que executar uma cadeia privada.
- Autorização de nós – Somente nós autorizados podem se juntar a cadeias privadas. Qualquer um pode definir um nó na Rede principal Ethereum.
- Privacidade – O acesso aos dados gravados em cadeias privadas pode ser controlado restringindo o acesso à rede e, de maneira mais precisa, com controles de acesso e transações privadas. Todos os dados gravados na Camada 1 da Rede principal podem ser visualizados por qualquer pessoa, portanto, as informações confidenciais devem ser armazenadas e transmitidas fora da cadeia, ou então criptografadas. Padrões de design que facilitam isso estão emergindo (por exemplo, Baseline, Aztec), bem como soluções de Camada 2 que podem manter os dados compartimentados e fora da Camada 1.

### Por que construir na Rede principal Ethereum? {#why-build-on-ethereum-mainnet}

Empresas têm experimentado a tecnologia de blockchain desde 2016, quando os projetos Hyperledger, Quorum e Corda foram lançados. O foco incidia principalmente sobre empresas privadas com autorização, mas a partir de 2019, houve uma mudança na maneira de ver as cadeias de blocos públicas em relação às privadas para aplicações de negócios. Uma [pesquisa](https://assets.ey.com/content/dam/ey-sites/ey-com/en_gl/topics/blockchain/ey-public-blockchain-opportunity-snapshot.pdf) conduzida pela Forrester revelou que “Os entrevistados da pesquisa ... veem esse potencial, com 75% afirmando que provavelmente usarão cadeias de blocos públicas no futuro e quase um terço afirmando ser muito provável”. O Paul Brody da EY [falou](https://www.youtube.com/watch?v=-ycu5vGDdZw&feature=youtu.be&t=3668) sobre os benefícios de construir sobre uma cadeia de blocos pública, que (dependendo da aplicação) pode oferecer maior segurança/imutabilidade, transparência, menor custo total de propriedade e capacidade de interagir com todas as outras aplicações que também estão na Rede principal (efeitos de rede). O compartilhamento de um quadro de referência comum entre as empresas evita a criação desnecessária de numerosos silos isolados que não conseguem comunicar e compartilhar ou sincronizar informações entre si.

Outro desenvolvimento que está deslocando o foco em direção a cadeias de blocos públicas é [Camada 2](/developers/docs/scaling/#layer-2-scaling). Primeiramente, a Camada 2 é uma categoria de tecnologia de escalabilidade que possibilita o uso de aplicativos com alta taxa de transferência em cadeias públicas. Além disso, as soluções da Camada 2 também podem[resolver alguns dos outros desafios que levaram os desenvolvedores empresariais a escolher cadeias privadas no passado](https://entethalliance.org/how-ethereum-layer-2-scaling-solutions-address-barriers-to-enterprises-building-on-mainnet/).

## Recursos para desenvolvedores corporativos {#enterprise-developer-resources}

### Organizações {#organizations}

Diversas organizações trabalharam juntas para tornar o Ethereum amigável para empresas:

- [Enterprise Ethereum Alliance (EEA)](https://entethalliance.org/) A EEA permite que as organizações adotem e usem a tecnologia Ethereum em suas operações diárias de negócios. Ela capacita o ecossistema Ethereum para desenvolver novas oportunidades de negócios, impulsionar a adoção do setor e aprender e colaborar entre si. O grupo de trabalho da Rede principal da EEA é um ponto focal para os representantes de empresas interessadas em desenvolver na Rede pública Ethereum, assim como para membros da comunidade Ethereum que gostariam de apoiá-los.
- [Ethereum OASIS Open Project](https://github.com/ethereum-oasis/oasis-open-project) O objetivo do Ethereum OASIS Open Project é fornecer um fórum neutro destinado aos diversos participantes para criar especificações de alta qualidade que facilitem a longevidade, interoperabilidade e facilidade de integração do Ethereum. O projeto pretende desenvolver normas claras e abertas, documentação de alta qualidade e conjuntos de testes que facilitem novos recursos e aprimoramentos para o protocolo Ethereum.
- [Baseline Project](https://www.baseline-protocol.org/) O Baseline Project é uma iniciativa de código aberto que combina avanços em criptografia, troca de mensagens e cadeia de blocos para fornecer processos de negócios seguros e privados a baixo custo por meio da Rede principal Ethereum. O protocolo permite uma colaboração confidencial e complexa entre empresas, sem deixar nenhum dado sensível na cadeia. O Baseline Project é um subprojeto do Projeto Aberto Ethereum OASIS, coordenado pelo Comitê de Direção Técnica do Baseline.

### Produtos e serviços {#products-and-services}

- O [Alchemy](https://www.alchemy.com/) _fornece serviços e ferramentas de API para construir e monitorar aplicativos no Ethereum_
- O [Blast](https://blastapi.io/) _é uma plataforma de API que fornece APIs RPC/WSS para a Rede principal e as Redes de teste para o arquivo do Ethereum._
- [Blockapps](https://blockapps.net/) _é uma implementação do protocolo Ethereum para empresas, com ferramentas e APIs que formam a plataforma STRATO_
- O [Chainstack](https://chainstack.com/) _é a infraestrutura da rede principal e da rede de testes do Ethereum hospedada em nuvens de clientes isolados e públicos_
- O [ConsenSys](https://consensys.net/) _fornece uma variedade de produtos e ferramentas para construção no Ethereum, bem como serviços de consultoria e desenvolvimento personalizado_
- O [Envision Blockchain](https://envisionblockchain.com/) _fornece serviços de consultoria e desenvolvimento com foco empresarial especializados na Rede principal Ethereum_
- O [EY OpsChain](https://blockchain.ey.com/products/contract-manager) _fornece um fluxo de trabalho de aquisição, emitindo contratos da RFQ, ordens de compra e faturas em sua rede de parceiros de negócios confiáveis_
- O [Hyperledger Besu](https://www.hyperledger.org/use/besu) _é um cliente Ethereum de código aberto desenvolvido sob licença Apache 2.0 e escrito em Java_
- O [Infura](https://infura.io/) _é uma API escalável de acesso às redes Ethereum e IPFS_
- O [Kaleido](https://kaleido.io/) _é uma plataforma de desenvolvimento focada em empresas que oferece uma cadeia de blocos simplificada e aplicativos de ativos digitais_
- O [Provide](https://provide.services/) _fornece infraestrutura e APIs para aplicativos Web3 para empresas_
- O [QuickNode](https://www.quicknode.com/) _fornece nós confiáveis e rápidos com APIs de alto nível como NFT API, Token API, entre outras, enquanto entrega um pacote unificado de produtos e soluções de nível empresarial_
- [Tenderly](https://tenderly.co) _é uma plataforma de desenvolvimento Web3 que fornece blocos de depuração de infraestrutura, observação e construção para desenvolvimento, teste, monitoramento e operação de contratos inteligentes_
- A [Unibright](https://unibright.io/) _é uma equipe de especialistas, arquitetos, desenvolvedores e consultores da blockchain, com mais de 20 anos de experiência em processos de negócios e integração_
- [Zero Services GmbH](https://www.zeroservices.eu/) _é um provedor de serviços gerenciados espalhado por locais compartilhados na Europa e na Ásia. Opera e monitora seus nós de forma segura e confiável_

### Ferramentas e bibliotecas {#tooling-and-libraries}

- [Alethio](https://explorer.aleth.io/) _Plataforma de Análise de Dados do Ethereum_
- [Sirato](https://www.web3labs.com/sirato) _uma plataforma de dados e análises para redes públicas e privadas Ethereum compatíveis da Web3 Labs_
- [Ernst & Young ‘Nightfall’](https://github.com/EYBlockchain/nightfall) _é um conjunto de ferramentas para transações privadas_
- [EthSigner](https://github.com/ConsenSys/ethsigner) _é um aplicativo de assinatura de transações para ser usado com um provedor web3_
- [Tenderly](https://tenderly.co/) _é uma plataforma de dados que fornece análise em tempo real, alertando e monitorando com suporte a redes privadas_
- [Truffle Suite](https://trufflesuite.com) _pacote de desenvolvimento da blockchain (Truffle, Ganache, Drizzle)_

### Soluções de escalabilidade {#scalability-solutions}

[Camada 2](/layer-2) é um conjunto de tecnologias ou sistemas executados sobre o Ethereum (Camada 1), que herdam propriedades de segurança da Camada 1 e fornecem maior capacidade de processamento de transações (transferências), taxas de transação mais baixas (custo operacional) e confirmações de transações mais rápidas do que a Camada 1. As soluções de escala de Camada 2 são protegidas pela Camada 1, mas permitem que os aplicativos da blockchain manipulem muitos mais usuários, ações ou dados do que a Camada 1 poderia acomodar. Muitos deles aproveitam os avanços recentes em criptografia e conhecimento zero (ZK - zero-knowledge) para maximizar o desempenho e a segurança.

Construir seu aplicativo sobre uma solução de escalabilidade de Camada 2 pode ajudar [a lidar com muitos dos problemas que anteriormente levaram empresas a construir em blockchains privadas](https://entethalliance.org/how-ethereum-layer-2-scaling-solutions-address-barriers-to-enterprises-building-on-mainnet/), mas ainda assim manter os benefícios de construir na Rede principal.

## Aplicações empresariais ativas no Rede principal {#enterprise-live-on-mainnet}

Aqui estão alguns dos aplicativos corporativos que foram construídos em cima da Mainnet pública Ethereum

### Pagamentos {#payments}

- [Brave Browser](https://basicattentiontoken.org/) _paga aos usuários para visualizar anúncios e os usuários podem pagar aos editores para apoiá-los por meio do Basic Attention Token._
- [hCaptcha](https://www.hcaptcha.com/) _Sistema CAPTCHA de prevenção de bots que paga aos operadores do site o trabalho realizado pelos usuários para rotular dados para aprendizagem de máquina. Agora implantado pela Cloudflare_
- [EthereumAds](https://ethereumads.com/) _permite que os operadores do site vendam espaço de publicidade e sejam pagos via Ethereum_

### Finanças {#finance}

- [Banco Santander](https://www.coindesk.com/santander-settles-both-sides-of-a-20-million-bond-trade-on-ethereum)_ – emissão e liquidação de títulos_
- [Societé Générale](https://www.generali-investments.com/it/en/institutional/article/generali-investments-and-generali-iard-carry-out-first-market-transaction-based-on-blockchain-infrastructure) _ – emissão de obrigações_
- [Cadência](https://www.forbes.com/sites/benjaminpirus/2019/10/09/fatburger-and-others-feed-30-million-into-ethereum-for-new-bond-offering/#513870be115b) _ – oferta de obrigações e geração de tokens para a FAT Brands_
- [Sila](https://silamoney.com/) _infraestrutura de pagamentos bancários e ACH como serviço, usando uma stablecoin_
- [Taurus](https://www.taurushq.com/) _ – emite títulos gerados por token_

### Geração de token do ativo {#tokenization}

- [Tinlake](https://tinlake.centrifuge.io/) _ – financiamento de recebíveis por meio de ativos reais gerados por token, como faturas, hipotecas ou royalties de streaming_
- [RealT](https://realt.co/) _ – investidores em todo o mundo podem comprar no mercado imobiliário dos EUA por meio de uma propriedade totalmente compatível, fracionada e gerada por token._
- [AgroToken](https://agrotoken.io/en/) _ – gerando tokens e negociando commodities agrícolas_
- [Fasset](https://www.fasset.com/) _ – uma plataforma para apoiar a infraestrutura sustentável_

### Autenticação de dados {#notarization-of-data}

- [BBVA](https://www.ledgerinsights.com/bbva-blockchain-loan-banking-tech-award/) _ – detalhes dos empréstimos finalizados com hash e registrados na Mainnet_
- [Splunk](https://www.splunk.com/en_us/blog/security/the-newest-data-attack.html) _ – a integridade dos dados pode ser garantida escrevendo periodicamente hashes de dados indexados para a Mainnet_
- [ANSA](https://cointelegraph.com/news/italys-top-news-agency-uses-blockchain-to-fight-fake-coronavirus-news) _ – a maior agência de notícias da Itália luta contra notícias falsas e permite que os leitores verifiquem a origem das notícias gravando-as na Mainnet_
- [Verizon](https://decrypt.co/46745/verizon-news-press-releases-ethereum-full-transparency) _ – logs da imprensa comunicados na Ethereum para garantir a responsabilidade e a confiança corporativas_
- [Breitling](https://www.coindesk.com/breitling-arianee-all-new-watches-ethereum) _ – registra a proveniência dos registros e o histórico de reparos dos relógios no Ethereum_
- [EthSign](https://ethsign.xyz/) _ – registra documentos eletrônicos assinados na blockchain do Ethereum_

### Cadeia de abastecimento {#supply-chain}

- [CargoX](https://cargox.io/press-releases/full/cargox-becomes-first-public-blockchain-ethereum-bill-lading-provider-approved-international-group-pi-clubs) _ – provedor de conhecimento de embarque marítimo e transferência de documentos_
- [Morpheus.network](https://morpheus.network/) _ – plataforma de automação de cadeia de suprimentos que implementa um sistema híbrido de cadeias privadas com dados autenticados na Ethereum Mainnet, sendo usada por empresas como a Federated Co-op Ltd., distribuidora canadense de alimentos, petróleo e gás, e a Vitalcan, fornecedora argentina de alimentos para animais._
- [Minespider](https://www.minespider.com/) _ – rastreamento da cadeia de suprimentos_
- [EY OpsChain Contract Manager](https://blockchain.ey.com/products/contract-manager) _ – permite que as empresas participem de um fluxo de processo de aquisição, emitindo pedidos de cotação (RFQ), contratos, ordens de compra e faturas para toda a sua rede de parceiros de negócios confiáveis_
- [Treum](https://treum.io/) _ – traz transparência, capacidade de rastreio e negociação para cadeias de abastecimento, usando a tecnologia de blockchain_
- [TradeTrust](https://www.tradetrust.io/) _ – verifica conhecimentos de embarque marítimo eletrônicos (eBLs) para envio internacional_
- [Birra Peroni](https://www.ey.com/en_gl/news/2021/05/birra-peroni-is-the-first-industrial-organization-to-mint-unique-non-fungible-tokens-using-ey-opschain-traceability) _ – cunha NFTs para cada lote de cerveja, permitindo maior visibilidade e eficiência ao longo de sua cadeia de suprimentos_

### Seguros {#insurance}

- [Arbol](https://www.arbolmarket.com/) _ – seguro paramétrico para cobrir riscos meteorológicos_
- [Etherisc](https://etherisc.com/) _ – seguro descentralizado para uma variedade de riscos_

### Credenciais e certificações {#credentials}

- [Duas escolas de ensino médio italianas](https://cointelegraph.com/news/two-italian-high-schools-to-issue-digital-diplomas-with-blockchain) _ – diplomas digitais emitidos na Ethereum Mainnet_
- [Universidade de St. Gallen](https://cointelegraph.com/news/swiss-university-fights-fake-diplomas-with-blockchain-technology) _ – projeto-piloto de uma universidade suíça para verificar diplomas_
- [Credenciais da Hyland](https://www.hylandcredentials.com) _ – diplomas digitais e outras credenciais, licenciamentos e certificados de educação_
- [OpenCerts](https://opencerts.io/faq) _ – emite diplomas e certificados pela blockchain em Singapura_
- [BlockCerts](https://www.blockcerts.org/) _ – desenvolveu uma norma aberta para diplomas e certificados da blockchain_

### Serviços {#utilities}

- [GridPlus](https://blog.gridplus.io/gridplus-is-live-in-texas-efc83c814601) _ – pagamentos de eletricidade_

Se quiser adicionar elementos a esta lista, consulte as [instruções para contribuir](/contributing/).
