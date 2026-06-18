---
title: Identité décentralisée
description: Qu'est-ce que l'identité décentralisée et pourquoi est-ce important ?
lang: fr
template: use-cases
sidebarDepth: 2
image: /images/eth-gif-cat.png
summaryPoints:
  - "Les systèmes d'identité traditionnels ont centralisé l'émission, la maintenance et le contrôle de vos identifiants."
  - "L'identité décentralisée supprime la dépendance aux tiers centralisés."
  - "Grâce à la cryptographie, les utilisateurs disposent désormais des outils nécessaires pour émettre, détenir et contrôler à nouveau leurs propres identifiants et attestations."
---

L'identité sous-tend aujourd'hui presque tous les aspects de votre vie. Utiliser des services en ligne, ouvrir un compte bancaire, voter aux élections, acheter une propriété, trouver un emploi : toutes ces choses nécessitent de prouver votre identité.

Cependant, les systèmes de gestion d'identité traditionnels s'appuient depuis longtemps sur des intermédiaires centralisés qui émettent, détiennent et contrôlent vos identifiants et [attestations](/glossary/#attestation). Cela signifie que vous ne pouvez pas contrôler vos informations liées à l'identité ni décider qui a accès à vos informations personnellement identifiables (PII) et dans quelle mesure ces parties y ont accès.

Pour résoudre ces problèmes, nous disposons de systèmes d'identité décentralisée construits sur des chaînes de blocs publiques comme [Ethereum](/). L'identité décentralisée permet aux individus de gérer leurs informations liées à l'identité. Avec les solutions d'identité décentralisée, _vous_ pouvez créer des identifiants, ainsi que réclamer et détenir vos attestations sans dépendre d'autorités centrales, comme les fournisseurs de services ou les gouvernements.

## Qu'est-ce que l'identité ? {#what-is-identity}

L'identité désigne le sentiment de soi d'un individu, défini par des caractéristiques uniques. L'identité fait référence au fait d'être un _individu_, c'est-à-dire une entité humaine distincte. L'identité peut également faire référence à d'autres entités non humaines, telles qu'une organisation ou une autorité.

<VideoWatch slug="decentralized-identity-explained" />

## Que sont les identifiants ? {#what-are-identifiers}

Un identifiant est une information qui sert de pointeur vers une ou plusieurs identités particulières. Les identifiants courants incluent :

- Le nom
- Le numéro de sécurité sociale / numéro d'identification fiscale
- Le numéro de téléphone mobile
- La date et le lieu de naissance
- Les identifiants numériques, par ex. les adresses e-mail, les noms d'utilisateur, les avatars

Ces exemples traditionnels d'identifiants sont émis, détenus et contrôlés par des entités centrales. Vous avez besoin de l'autorisation de votre gouvernement pour changer de nom ou d'une plateforme de médias sociaux pour changer de pseudonyme.

## Avantages de l'identité décentralisée {#benefits-of-decentralized-identity}

1. L'identité décentralisée augmente le contrôle individuel sur les informations d'identification. Les identifiants décentralisés et les attestations peuvent être vérifiés sans dépendre d'autorités centralisées et de services tiers.

2. Les solutions d'identité décentralisée facilitent une méthode sans tiers de confiance, fluide et protectrice de la confidentialité pour vérifier et gérer l'identité des utilisateurs.

3. L'identité décentralisée exploite la technologie de la chaîne de blocs, qui crée la confiance entre les différentes parties et fournit des garanties cryptographiques pour prouver la validité des attestations.

4. L'identité décentralisée rend les données d'identité portables. Les utilisateurs stockent les attestations et les identifiants dans un portefeuille mobile et peuvent les partager avec la partie de leur choix. Les identifiants décentralisés et les attestations ne sont pas verrouillés dans la base de données de l'organisation émettrice.

5. L'identité décentralisée devrait bien fonctionner avec les technologies émergentes [à divulgation nulle de connaissance](/glossary/#zk-proof) qui permettront aux individus de prouver qu'ils possèdent ou ont fait quelque chose sans révéler de quoi il s'agit. Cela pourrait devenir un moyen puissant de combiner confiance et confidentialité pour des applications telles que le vote.

6. L'identité décentralisée permet aux mécanismes [anti-Sybil](/glossary/#anti-sybil) d'identifier lorsqu'un individu humain prétend être plusieurs humains pour manipuler ou spammer un système.

## Cas d'utilisation de l'identité décentralisée {#decentralized-identity-use-cases}

L'identité décentralisée a de nombreux cas d'utilisation potentiels :

### 1. Connexions universelles {#universal-dapp-logins}

L'identité décentralisée peut aider à remplacer les connexions basées sur des mots de passe par une authentification décentralisée. Les fournisseurs de services peuvent émettre des attestations aux utilisateurs, qui peuvent être stockées dans un portefeuille Ethereum. Un exemple d'attestation serait un [NFT](/glossary/#nft) accordant au détenteur l'accès à une communauté en ligne.

Une fonction [Se connecter avec Ethereum (SIWE)](https://siwe.xyz/) permettrait alors aux serveurs de confirmer le compte Ethereum de l'utilisateur et de récupérer l'attestation requise à partir de l'adresse de son compte. Cela signifie que les utilisateurs peuvent accéder aux plateformes et aux sites Web sans avoir à mémoriser de longs mots de passe, ce qui améliore l'expérience en ligne des utilisateurs.

### 2. Authentification KYC {#kyc-authentication}

L'utilisation de nombreux services en ligne oblige les individus à fournir des attestations et des justificatifs, tels qu'un permis de conduire ou un passeport national. Mais cette approche est problématique car les informations privées des utilisateurs peuvent être compromises et les fournisseurs de services ne peuvent pas vérifier l'authenticité de l'attestation.

L'identité décentralisée permet aux entreprises de se passer des processus conventionnels de [connaissance du client (KYC)](https://en.wikipedia.org/wiki/Know_your_customer) et d'authentifier les identités des utilisateurs via des attestations vérifiables. Cela réduit le coût de la gestion des identités et empêche l'utilisation de faux documents.

### 3. Vote et communautés en ligne {#voting-and-online-communities}

Le vote en ligne et les médias sociaux sont deux nouvelles applications pour l'identité décentralisée. Les systèmes de vote en ligne sont susceptibles d'être manipulés, en particulier si des acteurs malveillants créent de fausses identités pour voter. Demander aux individus de présenter des attestations onchain peut améliorer l'intégrité des processus de vote en ligne.

L'identité décentralisée peut aider à créer des communautés en ligne exemptes de faux comptes. Par exemple, chaque utilisateur pourrait devoir authentifier son identité à l'aide d'un système d'identité onchain, comme l'Ethereum Name Service, réduisant ainsi la possibilité de bots.

### 4. Protection anti-Sybil {#sybil-protection}

Les applications d'octroi de subventions qui utilisent le [vote quadratique](/glossary/#quadratic-voting) sont vulnérables aux [attaques Sybil](/glossary/#sybil-attack) car la valeur d'une subvention augmente lorsque plus d'individus votent pour elle, incitant les utilisateurs à diviser leurs contributions entre de nombreuses identités. Les identités décentralisées aident à prévenir cela en augmentant la charge pour chaque participant de prouver qu'il est réellement humain, bien que souvent sans avoir à révéler d'informations privées spécifiques.

### 5. Pièce d'identité nationale et gouvernementale {#national-and-government-id}

Les gouvernements peuvent utiliser les principes de l'identité décentralisée pour émettre des documents d'identité fondamentaux — tels que des cartes d'identité nationales, des passeports ou des permis de conduire — sous forme d'attestations vérifiables sur Ethereum, offrant de solides garanties cryptographiques d'authenticité pour réduire la fraude et la falsification dans la vérification d'identité en ligne. Les citoyens peuvent stocker ces attestations dans leur [portefeuille](/wallets/) personnel et les utiliser pour prouver leur identité, leur âge ou leur droit de vote.

Ce modèle permet une divulgation sélective, en particulier lorsqu'il est combiné avec la technologie de confidentialité de [preuve à divulgation nulle de connaissance (ZKP)](/zero-knowledge-proofs/). Par exemple, un citoyen pourrait prouver cryptographiquement qu'il a plus de 18 ans pour accéder à un service soumis à une limite d'âge sans révéler sa date de naissance exacte, offrant ainsi une plus grande confidentialité qu'une pièce d'identité traditionnelle.

#### 💡 Étude de cas : Identité numérique nationale (NDI) du Bhoutan sur Ethereum {#case-study-bhutan-ndi}

- Fournit un accès à des attestations vérifiables pour les près de 800 000 citoyens du Bhoutan
- A migré du réseau Polygon [vers le réseau principal Ethereum](https://www.bhutanndi.com/article/bhutan-adopts-ethereum-for-national-identity-a-new-chapter-in-digital-sovereignty_2d0c7ec2-5605-4c42-b258-bd9361ae8878) en octobre 2025
- Plus de [234 000 identités numériques](https://www.blockchain-council.org/blockchain/bhutan-uses-blockchain-in-digital-id-project/) émises en date de mars 2025

Le Royaume du Bhoutan [a migré son système d'identité numérique nationale (NDI)](https://www.bhutanndi.com/article/bhutan-adopts-ethereum-for-national-identity-a-new-chapter-in-digital-sovereignty_2d0c7ec2-5605-4c42-b258-bd9361ae8878) vers Ethereum en octobre 2025. Construit sur les principes de l'identité décentralisée et de l'identité auto-souveraine, le système NDI du Bhoutan utilise des identifiants décentralisés et des attestations vérifiables pour émettre des justificatifs signés numériquement directement dans le portefeuille personnel d'un citoyen. En ancrant les schémas d'émetteur de ces justificatifs sur Ethereum, le système garantit qu'ils sont authentiques, infalsifiables et peuvent être vérifiés par n'importe quelle partie sans interroger une autorité centrale.

## Que sont les attestations ? {#what-are-attestations}

Une attestation est une réclamation faite par une entité au sujet d'une autre entité. Si vous vivez aux États-Unis, le permis de conduire qui vous est délivré par le Department of Motor Vehicles (une entité) atteste que vous (une autre entité) êtes légalement autorisé à conduire une voiture.

Les attestations sont différentes des identifiants. Une attestation _contient_ des identifiants pour faire référence à une identité particulière, et fait une réclamation concernant un attribut lié à cette identité. Ainsi, votre permis de conduire comporte des identifiants (nom, date de naissance, adresse) mais constitue également l'attestation de votre droit légal de conduire.

### Que sont les identifiants décentralisés ? {#what-are-decentralized-identifiers}

Les identifiants traditionnels comme votre nom légal ou votre adresse e-mail dépendent de tiers — les gouvernements et les fournisseurs de messagerie. Les identifiants décentralisés (DID) sont différents : ils ne sont ni émis, ni gérés, ni contrôlés par une entité centrale.

Les identifiants décentralisés sont émis, détenus et contrôlés par des individus. Un [compte Ethereum](/glossary/#account) est un exemple d'identifiant décentralisé. Vous pouvez créer autant de comptes que vous le souhaitez sans l'autorisation de quiconque et sans avoir besoin de les stocker dans un registre central.

Les identifiants décentralisés sont stockés sur des registres distribués ([chaînes de blocs](/glossary/#blockchain)) ou des [réseaux pair à pair](/glossary/#peer-to-peer-network). Cela rend les DID [globalement uniques, résolvables avec une haute disponibilité et vérifiables cryptographiquement](https://w3c-ccg.github.io/did-primer/). Un identifiant décentralisé peut être associé à différentes entités, y compris des personnes, des organisations ou des institutions gouvernementales.

## Qu'est-ce qui rend les identifiants décentralisés possibles ? {#what-makes-decentralized-identifiers-possible}

### 1. Cryptographie à clé publique {#public-key-cryptography}

La cryptographie à clé publique est une mesure de sécurité de l'information qui génère une [clé publique](/glossary/#public-key) et une [clé privée](/glossary/#private-key) pour une entité. La [cryptographie](/glossary/#cryptography) à clé publique est utilisée dans les réseaux de chaînes de blocs pour authentifier les identités des utilisateurs et prouver la propriété des actifs numériques.

Certains identifiants décentralisés, tels qu'un compte Ethereum, possèdent des clés publiques et privées. La clé publique identifie le contrôleur du compte, tandis que les clés privées peuvent signer et déchiffrer des messages pour ce compte. La cryptographie à clé publique fournit les preuves nécessaires pour authentifier les entités et empêcher l'usurpation d'identité et l'utilisation de fausses identités, en utilisant des [signatures cryptographiques](https://andersbrownworth.com/blockchain/public-private-keys/) pour vérifier toutes les réclamations.

### 2. Magasins de données décentralisés {#decentralized-datastores}

Une chaîne de blocs sert de registre de données vérifiable : un référentiel d'informations ouvert, sans tiers de confiance et décentralisé. L'existence de chaînes de blocs publiques élimine le besoin de stocker des identifiants dans des registres centralisés.

Si quelqu'un a besoin de confirmer la validité d'un identifiant décentralisé, il peut rechercher la clé publique associée sur la chaîne de blocs. Cela diffère des identifiants traditionnels qui nécessitent l'authentification de tiers.

## Comment les identifiants décentralisés et les attestations permettent-ils l'identité décentralisée ? {#how-decentralized-identifiers-and-attestations-enable-decentralized-identity}

L'identité décentralisée repose sur l'idée que les informations liées à l'identité doivent être auto-contrôlées, privées et portables, les identifiants décentralisés et les attestations en étant les principaux éléments constitutifs.

Dans le contexte de l'identité décentralisée, les attestations (également connues sous le nom d'[attestations vérifiables](https://www.w3.org/TR/vc-data-model/)) sont des réclamations infalsifiables et vérifiables cryptographiquement faites par l'émetteur. Chaque attestation ou attestation vérifiable qu'une entité (par ex., une organisation) émet est associée à son DID.

Étant donné que les DID sont stockés sur la chaîne de blocs, n'importe qui peut vérifier la validité d'une attestation en recoupant le DID de l'émetteur sur Ethereum. Essentiellement, la chaîne de blocs Ethereum agit comme un annuaire mondial qui permet la vérification des DID associés à certaines entités.

Les identifiants décentralisés sont la raison pour laquelle les attestations sont auto-contrôlées et vérifiables. Même si l'émetteur n'existe plus, le détenteur a toujours la preuve de la provenance et de la validité de l'attestation.

Les identifiants décentralisés sont également cruciaux pour protéger la confidentialité des informations personnelles grâce à l'identité décentralisée. Par exemple, si un individu soumet la preuve d'une attestation (un permis de conduire), la partie vérificatrice n'a pas besoin de vérifier la validité des informations contenues dans la preuve. Au lieu de cela, le vérificateur n'a besoin que de garanties cryptographiques de l'authenticité de l'attestation et de l'identité de l'organisation émettrice pour déterminer si la preuve est valide.

## Types d'attestations dans l'identité décentralisée {#types-of-attestations-in-decentralized-identity}

La façon dont les informations d'attestation sont stockées et récupérées dans un écosystème d'identité basé sur Ethereum est différente de la gestion d'identité traditionnelle. Voici un aperçu des différentes approches pour émettre, stocker et vérifier les attestations dans les systèmes d'identité décentralisée :

### Attestations hors chaîne {#offchain-attestations}

L'une des préoccupations liées au stockage des attestations onchain est qu'elles peuvent contenir des informations que les individus souhaitent garder privées. La nature publique de la chaîne de blocs Ethereum la rend peu attrayante pour stocker de telles attestations.

La solution consiste à émettre des attestations, détenues par les utilisateurs hors chaîne dans des portefeuilles numériques, mais signées avec le DID de l'émetteur stocké onchain. Ces attestations sont encodées sous forme de [JSON Web Tokens](https://en.wikipedia.org/wiki/JSON_Web_Token) et contiennent la signature numérique de l'émetteur — ce qui permet une vérification facile des réclamations hors chaîne.

Voici un scénario hypothétique pour expliquer les attestations hors chaîne :

1. Une université (l'émetteur) génère une attestation (un certificat académique numérique), la signe avec ses clés et l'émet à Bob (le propriétaire de l'identité).

2. Bob postule à un emploi et souhaite prouver ses qualifications académiques à un employeur, il partage donc l'attestation depuis son portefeuille mobile. L'entreprise (le vérificateur) peut alors confirmer la validité de l'attestation en vérifiant le DID de l'émetteur (c'est-à-dire sa clé publique sur Ethereum).

### Attestations hors chaîne avec accès persistant {#offchain-attestations-with-persistent-access}

Dans le cadre de cet arrangement, les attestations sont transformées en fichiers JSON et stockées hors chaîne (idéalement sur une plateforme de [stockage cloud décentralisé](/developers/docs/storage/), telle qu'IPFS ou Swarm). Cependant, un [hash](/glossary/#hash) du fichier JSON est stocké onchain et lié à un DID via un registre onchain. Le DID associé pourrait être celui de l'émetteur de l'attestation ou du destinataire.

Cette approche permet aux attestations d'acquérir une persistance basée sur la chaîne de blocs, tout en gardant les informations de réclamation chiffrées et vérifiables. Elle permet également une divulgation sélective puisque le détenteur de la clé privée peut déchiffrer les informations.

### Attestations onchain {#onchain-attestations}

Les attestations onchain sont conservées dans des [contrats intelligents](/glossary/#smart-contract) sur la chaîne de blocs Ethereum. Le contrat intelligent (agissant comme un registre) mappera une attestation à un identifiant décentralisé onchain correspondant (une clé publique).

Voici un exemple pour montrer comment les attestations onchain pourraient fonctionner en pratique :

1. Une entreprise (XYZ Corp) prévoit de vendre des parts de propriété à l'aide d'un contrat intelligent, mais ne souhaite que des acheteurs ayant passé une vérification des antécédents.

2. XYZ Corp peut demander à l'entreprise effectuant les vérifications des antécédents d'émettre des attestations onchain sur Ethereum. Cette attestation certifie qu'un individu a passé la vérification des antécédents sans exposer d'informations personnelles.

3. Le contrat intelligent vendant des parts peut vérifier le contrat de registre pour les identités des acheteurs sélectionnés, ce qui permet au contrat intelligent de déterminer qui est autorisé à acheter des parts ou non.

### Jetons liés à l'âme (Soulbound tokens) et identité {#soulbound}

Les [jetons Soulbound](https://vitalik.eth.limo/general/2022/01/26/soulbound.html) ([NFT non transférables](/glossary/#nft)) pourraient être utilisés pour collecter des informations uniques à un portefeuille spécifique. Cela crée effectivement une identité onchain unique liée à une adresse Ethereum particulière qui pourrait inclure des jetons représentant des réalisations (par ex., terminer un cours en ligne spécifique ou dépasser un score seuil dans un jeu) ou la participation à la communauté.

## Utiliser l'identité décentralisée {#use-decentralized-identity}

Il existe de nombreux projets ambitieux utilisant Ethereum comme base pour des solutions d'identité décentralisée :

- **[Ethereum Name Service (ENS)](https://ens.domains/)** - _Un système de nommage décentralisé pour les identifiants onchain lisibles par machine, comme les adresses de portefeuille Ethereum, les hashs de contenu et les métadonnées._
- **[Se connecter avec Ethereum (SIWE)](https://siwe.xyz/)** - _Norme ouverte pour l'authentification avec des comptes Ethereum._
- **[SpruceID](https://www.spruceid.com/)** - _Un projet d'identité décentralisée qui permet aux utilisateurs de contrôler leur identité numérique avec des comptes Ethereum et des profils ENS au lieu de s'appuyer sur des services tiers._
- **[Ethereum Attestation Service (EAS)](https://attest.org/)** - _Un registre/protocole décentralisé pour faire des attestations onchain ou hors chaîne sur n'importe quoi._
- **[Proof of Humanity](https://www.proofofhumanity.id)** - _Proof of Humanity (ou PoH) est un système de vérification d'identité sociale construit sur Ethereum._
- **[Veramo](https://veramo.io/)** - _Un framework JavaScript qui permet à quiconque d'utiliser facilement des données vérifiables cryptographiquement dans ses applications._

## Lectures complémentaires {#further-reading}

### Articles {#articles}

- [Cas d'utilisation de la chaîne de blocs : La chaîne de blocs dans l'identité numérique](https://consensys.net/blockchain-use-cases/digital-identity/) — _ConsenSys_
- [Qu'est-ce que l'ERC-725 d'Ethereum ? Gestion de l'identité auto-souveraine sur la chaîne de blocs](https://cryptoslate.com/what-is-erc725-self-sovereign-identity-management-on-the-blockchain/) — _Sam Town_
- [Comment la chaîne de blocs pourrait résoudre le problème de l'identité numérique](https://time.com/6142810/proof-of-humanity/) — _Andrew R. Chow_
- [Qu'est-ce que l'identité décentralisée et pourquoi devriez-vous vous en soucier ?](https://web3.hashnode.com/what-is-decentralized-identity) — _Emmanuel Awosika_
- [Introduction à l'identité décentralisée](https://walt.id/white-paper/digital-identity) — _Dominik Beron_

### Vidéos {#videos}

- [Identité décentralisée (Session Livestream Bonus)](https://www.youtube.com/watch?v=ySHNB1za_SE&t=539s) — _Une excellente vidéo explicative sur l'identité décentralisée par Andreas Antonopoulos_
- [Se connecter avec Ethereum et l'identité décentralisée avec Ceramic, IDX, React et 3ID Connect](https://www.youtube.com/watch?v=t9gWZYJxk7c) — _Tutoriel YouTube sur la création d'un système de gestion d'identité pour créer, lire et mettre à jour le profil d'un utilisateur à l'aide de son portefeuille Ethereum par Nader Dabit_
- [BrightID - Identité décentralisée sur Ethereum](https://www.youtube.com/watch?v=D3DbMFYGRoM) — _Épisode du podcast Bankless discutant de BrightID, une solution d'identité décentralisée pour Ethereum_
- [L'Internet hors chaîne : Identité décentralisée et attestations vérifiables](https://www.youtube.com/watch?v=EZ_Bb6j87mg) — Présentation à l'EthDenver 2022 par Evin McMullen
- [Les attestations vérifiables expliquées](https://www.youtube.com/watch?v=ce1IdSr-Kig) - Vidéo explicative YouTube avec démo par Tamino Baumann

### Communautés {#communities}

- [Alliance ERC-725 sur GitHub](https://github.com/erc725alliance) — _Partisans de la norme ERC-725 pour la gestion de l'identité sur la chaîne de blocs Ethereum_
- [Serveur Discord EthID](https://discord.com/invite/ZUyG3mSXFD) — _Communauté pour les passionnés et les développeurs travaillant sur Se connecter avec Ethereum (SIWE) et le protocole Ethereum Follow_
- [Veramo Labs](https://discord.gg/sYBUXpACh4) — _Une communauté de développeurs contribuant à la création d'un framework pour les données vérifiables pour les applications_
- [walt.id](https://discord.com/invite/AW8AgqJthZ) — _Une communauté de développeurs et de constructeurs travaillant sur des cas d'utilisation de l'identité décentralisée dans divers secteurs_