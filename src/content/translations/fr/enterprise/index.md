---
title: Réseau principal Ethereum pour les entreprises
description: Guides, articles et outils concernant les applications d'entreprise sur la blockchain publique Ethereum
lang: fr
---

# Réseau principal Ethereum pour les entreprises {#ethereum-for-enterprise}

Les applications blockchain aident les entreprises à :

- augmenter la confiance et à réduire le coût de la coordination entre les services ;
- améliorer la responsabilité et l'efficacité opérationnelle des réseaux d'entreprise ;
- concevoir de nouveaux modèles économiques et favoriser la création d'opportunités ;
- préparer l'avenir de leur organisation de manière compétitive.

Les applications de blockchain d'entreprise peuvent être construites sur le [réseau principal](/glossary/#mainnet) public Ethereum sans autorisation, ou sur des blockchains privés basés sur la technologie Ethereum. Plus d'informations sur les [blockchains Ethereum privées](/enterprise/private-ethereum/).

## Ethereum public et privé {#private-vs-public}

Il n'existe qu'un seul réseau principal public Ethereum. Les applications construites sur le réseau principal sont en mesure d'interopérer, tout comme les applications construites sur Internet peuvent se connecter entre elles, en tirant parti du plein potentiel de la blockchain décentralisée.

De nombreuses entreprises et consortiums ont déployé des blockchains privées avec autorisations pour des applications spécifiques basées sur la technologie Ethereum.

### Différences principales {#key-differences}

- Sécurité/Immuabilité de la blockchain - La résistance d'une blockchain à la falsification est déterminée par son algorithme de consensus. Le réseau principal Ethereum est sécurisé par l’interaction de milliers de nœuds indépendants gérés par des individus et des mineurs du monde entier. Les chaînes privées possèdent généralement un petit nombre de nœuds, contrôlés par une ou quelques organisations. Ces nœuds peuvent être étroitement contrôlés, mais il suffit d'en compromettre quelques-uns pour réécrire la chaîne ou effectuer des transactions frauduleuses.
- Performances - Les chaînes d'entreprise privées Ethereum ayant la possibilité d'utiliser des nœuds hautes performances avec des exigences matérielles spéciales ainsi que différents algorithmes de consensus comme la preuve d'autorité, elles peuvent atteindre un débit de transaction plus élevé sur la couche de base (couche 1). Sur le réseau principal Ethereum, un débit élevé peut être atteint en utilisant des [solutions d'évolutivité de couche 2](/developers/docs/scaling/#layer-2-scaling).
- Coût - Le coût d'exploitation d'une chaîne privée se reflète principalement dans le travail nécessaire pour la configurer et la gérer, et les serveurs pour l'exécuter. Si se connecter au réseau principal d'Ethereum ne coûte rien, il faut payer pour chaque transaction des frais de gaz en ETH, ce qui représente un coût. Des relais de transactions (c'est-à-dire des stations de gaz) sont en cours de développement afin d'éliminer la nécessité, pour les utilisateurs finaux et les entreprises, d'utiliser directement l'ether dans leurs transactions. Certaines [analyses](https://github.com/EYBlockchain/fundamental-cost-of-ownership/blob/master/EY%20Total%20Cost%20of%20Ownership%20for%20Blockchain%20Solutions.pdf) ont montré que le coût total d'exploitation d'une application peut être inférieur sur le réseau principal par rapport à une chaîne privée.
- Autorisation des nœuds - Seuls les nœuds autorisés peuvent rejoindre les chaînes privées. N'importe qui peut configurer un nœud sur le réseau principal Ethereum.
- Confidentialité - L'accès aux données écrites sur les chaînes privées peut être contrôlé en limitant l'accès au réseau, et de façon plus précise avec des contrôles d'accès et des transactions privées. L'ensemble des données écrites sur la couche 1 du réseau principal sont visibles par tous, de sorte que les informations sensibles doivent être stockées et transmises hors chaîne, ou chiffrées. Des modèles de conception facilitant ceci émergent (par ex., Baseline, Aztec), ainsi que des solutions de couche 2, qui permettent de garder les données compartimentées et hors de la couche 1.

### Pourquoi construire sur le réseau principal Ethereum {#why-build-on-ethereum-mainnet}

Les entreprises expérimentent la technologie blockchain depuis 2016, lorsque les projets Hyperledger, Quorum et Corda ont été lancés. L'accent était principalement mis sur les blockchains d'entreprise privées avec autorisations, mais à partir de 2019, un changement s'est opéré dans la réflexion sur les blockchains publiques par rapport aux privées pour les applications métiers. Une [enquête](https://assets.ey.com/content/dam/ey-sites/ey-com/en_gl/topics/blockchain/ey-public-blockchain-opportunity-snapshot.pdf) menée par Forrester a révélé que "Les participants à l'enquête ... voient ce potentiel, 75 % d'entre eux déclarant qu’ils sont susceptibles de tirer parti des blockchains publiques à l’avenir, et près d’un tiers assurant qu'ils y sont très favorables”. Chez EY, [Paul Brody explique](https://www.youtube.com/watch?v=-ycu5vGDdZw&feature=youtu.be&t=3668) les avantages de construire sur la blockchain publique, qui (en fonction de l'application) peut offrir une meilleure sécurité/immuabilité, plus de transparence, une réduction du coût total de propriété et la possibilité d'interagir avec toutes les autres applications du réseau principal (effets réseau). Le partage d'un cadre de référence commun entre les entreprises évite la création inutile de nombreux silos isolés qui ne peuvent pas communiquer, partager ni synchroniser les informations.

Une autre avancée qui renforce l'intérêt pour les blockchains publiques est la [couche 2](/developers/docs/scaling/layer-2). La couche 2 est avant tout une catégorie de technologie d’évolutivité qui rend possible les applications à haut débit sur les chaînes publiques. Mais les solutions de la couche 2 peuvent aussi [résoudre certains problèmes qui ont poussé les développeurs en entreprise à choisir des chaînes privées dans le passé](https://entethalliance.org/how-ethereum-layer-2-scaling-solutions-address-barriers-to-enterprises-building-on-mainnet/).

Le Baseline Protocol est un projet clé qui définit un protocole permettant une collaboration confidentielle et complexe entre les entreprises sans laisser de données sensibles sur la chaîne. Il a pris une [ampleur importante](https://www.oasis-open.org/2020/08/26/baseline-protocol-achieves-key-milestone-with-release-of-v0-1-implementation-for-enterprise/) en 2020.

## Ressources pour les développeurs en entreprise {#enterprise-developer-resources}

### Organisations {#organizations}

Différentes organisations sont à l'origine d'initiatives collaboratives afin de rendre Ethereum plus convivial pour les entreprises :

- [Entreprise Ethereum Alliance (EEA)](https://entethalliance.org/) - L'EEA permet aux organisations d'adopter et d'utiliser la technologie Ethereum dans leurs opérations commerciales quotidiennes. Elle donne à l'écosystème Ethereum les moyens de développer de nouvelles opportunités commerciales, de favoriser son adoption par l'industrie, d'apprendre et de collaborer les uns avec les autres. Le groupe de l'EAA travaillant sur le réseau principal est un point de convergence pour les représentants des entreprises qui souhaitent construire sur le réseau principal public Ethereum, ainsi que pour les membres de la communauté Ethereum qui souhaitent les soutenir.
- [Projet Ethereum OASIS Open](https://github.com/ethereum-oasis/oasis-open-project) Il s'agit d'un projet OASIS Open destiné à offrir un forum neutre à diverses parties prenantes afin de créer des spécifications hautes qualités qui favorisent la longévité, l'interopérabilité et la facilité d'intégration d'Ethereum. Le projet vise à développer des normes claires et ouvertes, une documentation haut de gamme et des suites de tests partagées qui facilitent l'introduction de nouvelles fonctionnalités et d'améliorations dans le protocole Ethereum.
- [Projet Baseline](https://www.baseline-protocol.org/) - Le projet Baseline Protocol est une initiative open source qui combine les avancées en matière de cryptographie, de messagerie et de blockchain pour offrir des processus métiers sécurisés et privés à faible coût via le réseau public Ethereum. Le protocole permet une collaboration confidentielle et complexe entre entreprises sans laisser de données sensibles sur la chaîne. Le projet Baseline est un sous-projet du projet Ethereum OASIS Open et est coordonné par le comité de pilotage technique Baseline.

### Produits et services {#products-and-services}

- [Alchemy](https://www.alchemy.com/) _- Fournit des outils et des services d'API pour construire et surveiller les applications sur Ethereum_
- [Blockapps](https://blockapps.net/)_ - Implémentation du protocole Ethereum pour les entreprises, outils et API constituant la plateforme STRATO_
- [Chainstack](https://chainstack.com/) _- Infrastructure du réseau principal et de test d'Ethereum hébergée dans des clouds clients isolés et publics_
- [ConsenSys](https://consensys.net/) _- Fournit une gamme de produits et d'outils pour construire sur Ethereum, ainsi que des services de conseil et de développement personnalisé_
- [Envision Blockchain](https://envisionblockchain.com/) _- Fournit des services de conseil et de développement axés sur les entreprises, et spécialisés dans le réseau principal Ethereum_
- [EY OpsChain](https://blockchain.ey.com/products/contract-manager) _- Fournit un workflow d'approvisionnement en émettant des demandes de devis (RFQ), des contrats, des bons de commande et des factures à travers votre réseau de partenaires commerciaux de confiance_
- [Hyperledger Besu](https://www.hyperledger.org/use/besu) _- Client Ethereum en open source axé sur les entreprises, développé sous la licence Apache 2.0 et rédigé en Java_
- [Infura](https://infura.io/) _- Accès évolutif aux API des réseaux Ethereum et IPFS_
- [Provide](https://provide.services/) _- Infrastructure et API pour les applications d'entreprise Web3_
- [Unibright](https://unibright.io/) _- Équipe de spécialistes de la blockchain, d'architectes, de développeurs et de consultants ayant plus de 20 ans d'expérience dans les processus métiers et l'intégration_

### Outils et bibliothèques {#tooling-and-libraries}

- [Alethio](https://explorer.aleth.io/) _- Plateforme d'analyse des données Ethereum_
- [Epirus](https://www.web3labs.com/epirus) _- Plateforme Web3 Labs pour développer, déployer et surveiller les applications blockchain_
- [Ernst & Young Nightfall](https://github.com/EYBlockchain/nightfall) _- Boîte à outils pour les transactions privées_
- [EthSigner](https://github.com/ConsenSys/ethsigner) _- Application de signature de transactions à utiliser avec un prestataire Web3_
- [Tenderly](https://tenderly.co/) _- Plateforme de données fournissant des analyses en temps réel, des alertes et une surveillance avec assistance pour les réseaux privés_
- [Truffle Suite](https://trufflesuite.com) _- Suite de développement de blockchain (Truffle, Ganache, Drizzle)_

### Solutions d'évolutivité {#scalability-solutions}

[La couche 2](/developers/docs/scaling/#layer-2-scaling) est un ensemble de technologies ou de systèmes qui fonctionnent sur Ethereum (couche 1), héritent des propriétés de sécurité de la couche 1, et offrent une plus grande capacité de traitement des transactions (débit), des frais de transaction plus bas (coût d'exploitation) et des confirmations de transaction plus rapides que la couche 1. Les solutions de passage à l'échelle de la couche 2 sont sécurisées par la couche 1, mais elles permettent aux applications blockchain de gérer beaucoup plus d'utilisateurs, d'actions ou de données que la couche 1. La plupart d'entre elles tirent parti des avancées récentes en matière de cryptographie et de preuves de connaissance zéro (ZK) pour maximiser les performances et la sécurité.

Construire votre application sur une solution de couche 2 peut aider à [répondre à bon nombre de préoccupations qui ont précédemment poussé les entreprises à construire sur des blockchains privées](https://entethalliance.org/how-ethereum-layer-2-scaling-solutions-address-barriers-to-enterprises-building-on-mainnet/), tout en conservant les avantages du réseau principal.

Voici quelques exemples de solutions L2 prêtes pour la production ou qui le seront bientôt :

- Rollups optimisés (données sur la chaîne, preuves de fraude)
  - [Optimism](https://optimism.io/)
  - [Offchain Labs Arbitrum Rollup](https://offchainlabs.com/)
  - [Fuel Network](https://fuel.sh)
- Rollups ZK (données sur la chaîne, preuves de validité ZK)
  - [Loopring](https://loopring.org)
  - [Starkware](https://starkware.co)
  - [Matter Labs zkSync](https://matter-labs.io/)
  - [Aztec 2.0](https://aztec.network/)
- Validium (données hors chaîne, preuves de validité ZK)
  - [Starkware](https://starkware.co)
  - [Matter Labs zkPorter](https://matter-labs.io/)
- Plasma (données hors chaîne, preuves de fraude)
  - [OMG Network](https://omg.network/)
  - [Gazelle](https://gzle.io)
  - [Matic Network](https://matic.network/)
  - [LeapDAO](https://ipfs.leapdao.org/)
- Canaux d'état
  - [Connext](https://connext.network/)
  - [Kchannels](https://www.kchannels.io/)
  - [Perun](https://perun.network)
  - [Raiden](https://raiden.network/)
- Chaînes latérales
  - [Skale](https://skale.network)
  - [POA Network](https://www.poa.network/)
- Solutions hybrides qui combinent les propriétés de plusieurs catégories
  - [Celer](https://celer.network)

## Applications d'entreprise live sur le réseau principal {#enterprise-live-on-mainnet}

Voici quelques-unes des applications d'entreprise déployées sur le réseau principal public Ethereum.

### Paiements {#payments}

- [Brave Browser](https://basicattentiontoken.org/) _ - Rémunère les utilisateurs pour l'attention qu'ils portent aux publicités et les utilisateurs peuvent payer les éditeurs pour les soutenir, via le jeton Basic Attention._
- [hCaptcha](https://www.hcaptcha.com/) _ - Système CAPTCHA de prévention des robots qui rémunère les opérateurs de sites web pour le travail effectué par les utilisateurs afin de libeller les données pour l'apprentissage automatique. Désormais déployé par Cloudflare._
- [Audius](https://audius.co/) _ - Service de streaming qui connecte les fans de musique directement avec les artistes, et permet aux artistes d'être payés en totalité par leurs fans, directement et instantanément pour chaque diffusion._
- [EthereumAds](https://ethereumads.com/) _- Permet aux opérateurs de sites web de vendre de l'espace publicitaire et d'être payés via Ethereum_

### Finance {#finance}

- [Santander Bank](https://www.coindesk.com/santander-settles-both-sides-of-a-20-million-bond-trade-on-ethereum) _ - Émission d'obligations et règlement_
- [Société Générale](https://www.societegenerale.com/en/news/newsroom/societe-generale-performs-first-financial-transaction-settled-central-bank-digital) _- Émission d'obligations_
- [Cadence](https://www.forbes.com/sites/benjaminpirus/2019/10/09/fatburger-and-others-feed-30-million-into-ethereum-for-new-bond-offering/#513870be115b) _ - Offre d'obligations et de jetons pour les marques FAT_
- [Sila](https://silamoney.com/) _ - Infrastructure bancaire et de paiement ACH en tant que services_
- [Tinlake](https://tinlake.centrifuge.io/) _ - Financement de créances via des actifs réels sous forme de jetons comme des factures, des hypothèques ou des redevances de streaming_
- [Kratos](https://triterras.com/kratos) _- Plateforme de négociation et de financement de produits de base qui connecte les négociants et leur permettent de faire du commerce et de trouver des capitaux auprès de prêteurs directement en ligne_
- [Fasset](https://www.fasset.com/) _ - Plateforme pour soutenir l'infrastructure durable_
- [Taurus](https://www.taurushq.com/) _- Émet des titres tokenisés_

### Authentification des données {#notarization-of-data}

- [BBVA](https://www.ledgerinsights.com/bbva-blockchain-loan-banking-tech-award/) _ - Les détails des prêts finalisés sont hachés et enregistrés sur le réseau principal._
- [Splunk](https://www.splunk.com/en_us/blog/security/the-newest-data-attack.html) _ - L'intégrité des données peut être garantie en écrivant périodiquement des hachages de données indexées sur le réseau principal._
- [ANSA](https://cointelegraph.com/news/italys-top-news-agency-uses-blockchain-to-fight-fake-coronavirus-news) _- La plus grande agence de presse d'Italie lutte contre les fausses nouvelles et permet aux lecteurs de vérifier l'origine des nouvelles en les enregistrant sur le réseau principal._
- [Verizon](https://decrypt.co/46745/verizon-news-press-releases-ethereum-full-transparency) _ - Enregistre les communiqués de presse sur Ethereum pour garantir la responsabilité et la confiance des entreprises._
- [Breitling](https://www.coindesk.com/breitling-arianee-all-new-watches-ethereum) _- Enregistre la provenance et l'historique de réparation des montres sur Ethereum._
- [EthSign](https://ethsign.xyz/) _- Enregistre les documents électroniques signés sur la blockchain Ethereum_

### Chaîne logistique {#supply-chain}

- [CargoX](https://cargox.io/press-releases/full/cargox-becomes-first-public-blockchain-ethereum-bill-lading-provider-approved-international-group-pi-clubs) _- Prestataire de services de connaissement et de transfert de documents_
- [Morpheus.network](https://morpheus.network/) _- Plateforme d'automatisation de la chaîne logistique qui implémente un hybride de chaînes privées avec des données authentifiées sur le réseau principal Ethereum. Utilisée par des entreprises comme le distributeur canadien de produits alimentaires, de pétrole et de gaz Federated Co-op Ltd. et le fournisseur argentin d'aliments pour animaux Vitalcan._
- [Minespion](https://www.minespider.com/) _- Suivi de la chaîne logistique_
- [Follow Our Fibre](https://www.followourfibre.com)_ - Traçabilité de la chaîne logistique de la viscose_
- [EY OpsChain Network Procurement](https://blockchain.ey.com/products/contract-manager) _- Permet aux entreprises de lancer un workflow d'approvisionnement en émettant des demandes de devis (RFQ), des contrats, des bons de commande et des factures à travers leur réseau de partenaires commerciaux de confiance_
- [Treum](https://treum.io/) _- Apporte transparence, traçabilité et négociabilité aux chaînes logistiques, en utilisant la technologie blockchain_
- [TradeTrust](https://www.tradetrust.io/) _- Vérifie les connaissements électroniques (eBL) pour l'expédition à l'international_
- [Birra Peroni](https://www.ey.com/en_gl/news/2021/05/birra-peroni-is-the-first-industrial-organization-to-mint-unique-non-fungible-tokens-using-ey-opschain-traceability) _- Frappe des jetons non fongibles (NFT) pour chaque nouveau lot de bière, permettant une plus grande visibilité et efficacité à travers sa chaîne logistique_

### Identifications et certifications {#credentials}

- [Comtés de l'Utah](http://www.utahcounty.gov/Dept/ClerkAud/DigitalCertCopy.html) _ - Délivrance de certificats de mariage numériques sur Ethereum_
- [Deux lycées italiens](https://cointelegraph.com/news/two-italian-high-schools-to-issue-digital-diplomas-with-blockchain) _ - Délivrance de diplômes numériques sur le réseau principal Ethereum_
- [Université de St. Gallen](https://cointelegraph.com/news/swiss-university-fights-fake-diplomas-with-blockchain-technology) _- Projet pilote d'une université suisse pour vérifier les diplômes_
- [Malte](https://cointelegraph.com/news/malta-to-store-education-certificates-on-a-blockchain) _- Totalité des certificats d'enseignement enregistrés sur le réseau principal par [Hyland](https://www.learningmachine.com/)_
- [Université Pohang des sciences et de la technologie](https://www.theblockcrypto.com/linked/55176/south-korean-university-issues-blockchain-stored-diplomas-amid-the-spread-of-the-coronavirus) _Université sud-coréenne délivrant des diplômes stockés dans la blockchain à ses nouveaux diplômés_
- [OpenCerts](https://opencerts.io/) _- Délivre diplômes et certificats d'enseignement via la blockchain à Singapour_
- [BlockCerts](https://www.blockcerts.org/) _ - A développé une norme ouverte pour les diplômes et certifications sur la blockchain_
- [SkillTree](http://skilltree.org/) _- Formations et certifications de compétences en ligne qui peuvent être configurées avec des déclencheurs d'expiration ou des dépendances à d'autres compétences._

### Utilitaires {#utilities}

- [GridPlus](https://blog.gridplus.io/gridplus-is-live-in-texas-efc83c814601) _- Paiements de factures d'électricité_

Si vous souhaitez ajouter des éléments à cette liste, veuillez consulter [les instructions pour contribuer](/contributing/).
