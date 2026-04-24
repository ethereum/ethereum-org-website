---
title: Cryptographie post-quantique sur Ethereum
description: Comment Ethereum se prépare à l'ère post-quantique, ce qui est vulnérable et ce qui est construit pour le protéger.
lang: fr
image: /images/roadmap/roadmap-future.png
alt: "Ethereum roadmap"
template: roadmap
summaryPoints:
  - Les ordinateurs quantiques finiront par menacer la cryptographie qu'Ethereum utilise aujourd'hui
  - La Fondation Ethereum dispose d'une équipe de recherche post-quantique dédiée et d'une feuille de route structurée « Lean Ethereum » visant 2029 pour une protection post-quantique complète
  - Vos fonds sont en sécurité aujourd'hui et les logiciels de portefeuille vous guideront lors de la future migration
---

Les ordinateurs quantiques finiront par être capables de casser les méthodes cryptographiques qui sécurisent Ethereum et la plupart des autres systèmes numériques aujourd'hui. Cette page explique ce que cela signifie, comment le réseau développe de manière proactive des améliorations pour atténuer ce risque, et ce que vous devez savoir.

## Pourquoi la cryptographie post-quantique est importante {#why-post-quantum-matters}

Ethereum s'appuie sur plusieurs formes de [cryptographie](/glossary/#cryptography) pour maintenir la sécurité du réseau et protéger les fonds des utilisateurs. Les plus importantes sont :

- **Algorithme de signature numérique à courbe elliptique (ECDSA)** : La cryptographie utilisée pour signer les transactions. La sécurité de votre compte Ethereum en dépend.
- **Signatures BLS** : Utilisées par les [validateurs](/glossary/#validator) pour atteindre un [consensus](/glossary/#consensus) sur l'état du réseau.
- **Engagements polynomiaux KZG** : Utilisés pour la [disponibilité des données](/glossary/#data-availability) dans la feuille de route de mise à l'échelle d'Ethereum.
- **Systèmes de preuve à divulgation nulle de connaissance (ZK)** : Utilisés par les rollup et d'autres applications pour vérifier les calculs hors chaîne.

Tous ces éléments reposent sur des structures mathématiques, telles que les groupes abéliens, qui sont difficiles à résoudre pour les ordinateurs classiques mais qui peuvent l'être efficacement par un ordinateur quantique utilisant l'[algorithme de Shor](https://en.wikipedia.org/wiki/Shor%27s_algorithm).

### Quand les ordinateurs quantiques menaceront-ils Ethereum ? {#when-will-quantum-computers-threaten-ethereum}

En mars 2026, Google Quantum AI a publié une recherche estimant que casser la cryptographie à courbe elliptique de 256 bits (le type qu'Ethereum utilise pour les signatures de compte) pourrait nécessiter environ 1 200 qubits logiques. Les estimations précédentes plaçaient ce nombre beaucoup plus haut. Google a fixé une date limite interne à 2029 pour la migration de ses propres systèmes vers la cryptographie post-quantique.

Le matériel quantique actuel est loin de cette échelle, fonctionnant avec quelques milliers de qubits physiques bruités. Les qubits logiques (qui corrigent les erreurs et effectuent des calculs fiables) nécessitent chacun de nombreux qubits physiques. **L'écart entre le matériel actuel et ce qui est nécessaire pour casser la cryptographie d'Ethereum reste important, mais il se réduit plus rapidement que beaucoup ne l'avaient prévu.** Notamment, le National Institute of Standards and Technology (NIST) des États-Unis prévoit de déprécier l'ECDSA d'ici 2030 et de l'interdire d'ici 2035.

Il ne s'agit pas d'une menace imminente. Mais les transitions cryptographiques prennent des années, et le modèle de sécurité d'Ethereum est conçu pour durer des siècles. La réponse d'Ethereum est la feuille de route **Lean Ethereum**, une mission délibérée sur plusieurs années visant à reconstruire Ethereum autour de primitives qui survivront à toute menace cryptographique.

## Quatre domaines vulnérables aux attaques quantiques {#four-vulnerable-areas}

En février 2026, Vitalik Buterin a [publié une feuille de route](https://x.com/VitalikButerin/status/2027075026378543132) identifiant quatre domaines distincts de la cryptographie d'Ethereum qui nécessitent des mises à niveau post-quantiques. Chacun présente des défis différents et des pistes de solution différentes.

### 1. Signatures BLS de la couche de consensus {#consensus-bls}

**Ce que cela fait** : Le protocole de [preuve d'enjeu (PoS)](/glossary/#pos) d'Ethereum utilise les signatures BLS pour agréger les votes de centaines de milliers de validateurs. BLS permet de combiner de nombreuses signatures en une seule, ce qui maintient l'efficacité du réseau.

**Pourquoi c'est vulnérable** : Les signatures BLS reposent sur des couplages de courbes elliptiques, qu'un ordinateur quantique pourrait casser.

**L'approche** : La feuille de route Lean Consensus comprend le développement de deux outils complémentaires :
- **leanXMSS** : Ethereum remplacera les signatures BLS par leanXMSS, un schéma de signature basé sur le hash pour les validateurs. Les signatures basées sur le hash sont considérées comme résistantes aux ordinateurs quantiques car elles ne reposent que sur la sécurité des fonctions de hash, que les ordinateurs quantiques affaiblissent mais ne cassent pas.
- **leanVM** : Une zkVM (machine virtuelle à divulgation nulle de connaissance) minimale pour l'agrégation de signatures basée sur les SNARK. Étant donné que les signatures basées sur le hash sont considérablement plus volumineuses (environ 3 000 octets contre 96 octets pour BLS), le passage à leanXMSS produirait beaucoup plus de données par créneau. Pour résoudre ce problème, leanVM agit comme un moteur d'agrégation, compressant les données par 250. Cela préserve les avantages en termes d'efficacité de la combinaison de nombreuses signatures en une seule, même après le passage à des schémas résistants aux ordinateurs quantiques.

<ExpandableCard title="Why can't Ethereum just replace BLS with a quantum-safe scheme?" eventCategory="/roadmap/future-proofing/quantum-resistance" eventName="clicked why cant ethereum just replace BLS?">

La propriété d'agrégation qui rend BLS efficace (combiner des centaines de milliers de signatures en une seule) n'a pas d'équivalent évident résistant aux ordinateurs quantiques. Les signatures post-quantiques sont également beaucoup plus volumineuses que les signatures BLS. Le simple fait de remplacer l'une par l'autre rendrait la couche de consensus d'Ethereum considérablement plus lente et plus coûteuse. C'est pourquoi l'équipe construit leanVM, un outil qui utilise des preuves à divulgation nulle de connaissance pour agréger efficacement les signatures résistantes aux ordinateurs quantiques.

</ExpandableCard>

### 2. Disponibilité des données : engagements KZG {#data-availability-kzg}

**Ce que cela fait** : Les engagements polynomiaux KZG garantissent que les données (en particulier les données de [blob](/glossary/#blob) provenant des rollup) sont disponibles sur le réseau sans obliger chaque nœud à les télécharger dans leur intégralité.

**Pourquoi c'est vulnérable** : Les engagements KZG reposent sur des couplages de courbes elliptiques, la même structure mathématique que les ordinateurs quantiques peuvent attaquer.

**Atténuation actuelle** : Les engagements KZG utilisent une « configuration de confiance » où de nombreux participants ont contribué au caractère aléatoire. Tant qu'au moins un participant a été honnête et a détruit son secret, la configuration est sécurisée, même contre les ordinateurs quantiques tentant de faire de la rétro-ingénierie après coup.

**Solution à long terme** : Remplacer KZG par un schéma d'engagement résistant aux ordinateurs quantiques. Les deux principaux candidats sont :
- **Engagements basés sur les STARK** : Reposent sur des fonctions de hash plutôt que sur des courbes elliptiques. Déjà utilisés dans certains ZK-rollup.
- **Engagements basés sur les réseaux euclidiens (lattice)** : Reposent sur la difficulté des problèmes de réseaux euclidiens, qui sont considérés comme résistants aux ordinateurs quantiques.

Les deux approches font toujours l'objet de recherches pour évaluer leur efficacité et leur aspect pratique à l'échelle d'Ethereum.

### 3. Signatures de compte : ECDSA {#eoa-signatures}

**Ce que cela fait** : Chaque compte Ethereum standard (compte détenu par un tiers, ou [EOA](/glossary/#eoa)) utilise l'ECDSA sur la courbe secp256k1 pour signer les transactions. C'est ce qui protège vos fonds.

**Pourquoi c'est vulnérable** : Pour tout compte ayant envoyé une transaction, la clé publique est exposée onchain. Un ordinateur quantique pourrait dériver la clé privée à partir de ces données de clé publique exposées.

**Nuance importante** : Les comptes qui n'ont fait que recevoir de l'ether et n'ont jamais envoyé de transaction n'ont pas exposé leur clé publique. Seule l'adresse (un hash de la clé publique) est visible, ce qui offre une protection supplémentaire.

**L'approche** : Plutôt qu'une migration unique à l'échelle du protocole, Ethereum prévoit d'utiliser l'[abstraction de compte](/roadmap/account-abstraction/) (plus précisément l'EIP-8141, envisagé pour Hegotá au second semestre 2026) pour offrir aux utilisateurs une **agilité de signature**. Les comptes individuels pourraient passer à un schéma de signature post-quantique sans attendre que l'ensemble du protocole ne change.

C'est une approche pragmatique. Les utilisateurs et les portefeuilles qui souhaitent une protection post-quantique de manière anticipée peuvent l'adopter volontairement, tandis que la migration plus large se déroule au fil du temps.

### 4. Preuves ZK de la couche d'application {#zk-proofs}

**Ce que cela fait** : Les systèmes de preuve à divulgation nulle de connaissance sont utilisés par les rollup de couche 2 (l2) et d'autres applications pour vérifier les calculs sans révéler les données sous-jacentes.

**Pourquoi c'est vulnérable** : De nombreux systèmes de preuve ZK populaires (les SNARK utilisant des couplages de courbes elliptiques) reposent sur des hypothèses vulnérables aux ordinateurs quantiques.

**L'approche** : Les STARK, qui reposent sur des fonctions de hash plutôt que sur des courbes elliptiques, sont déjà résistants aux ordinateurs quantiques et sont utilisés par plusieurs rollup. L'adoption naturelle par l'écosystème des systèmes basés sur les STARK fournit déjà une sécurité post-quantique au niveau de la couche d'application.

## Normes du NIST {#nist-standards}

En août 2024, le National Institute of Standards and Technology (NIST) des États-Unis a [finalisé trois normes de cryptographie post-quantique](https://www.nist.gov/news-events/news/2024/08/nist-releases-first-3-finalized-post-quantum-encryption-standards). Celles-ci sont importantes car elles fournissent à l'ensemble de l'industrie technologique, y compris Ethereum, un ensemble partagé d'algorithmes approuvés sur lesquels s'appuyer, plutôt que de laisser chaque projet inventer les siens.

| Norme | Nom | Type | Cas d'utilisation |
|----------|------|------|----------|
| FIPS 203 | ML-KEM | Basé sur les réseaux euclidiens | Encapsulation de clé (échange de clés) |
| FIPS 204 | ML-DSA (Dilithium) | Basé sur les réseaux euclidiens | Signatures numériques |
| FIPS 205 | SLH-DSA (SPHINCS+) | Basé sur le hash | Signatures numériques |

Ces normes constituent une base pour la transition post-quantique de l'industrie au sens large. Les travaux d'Ethereum s'appuient sur celles-ci et les étendent, en mettant particulièrement l'accent sur les défis uniques d'un réseau décentralisé où l'efficacité et l'agrégation sont importantes.

## L'approche de la Fondation Ethereum {#ef-approach}

La Fondation Ethereum a formé une équipe dédiée à la sécurité post-quantique en janvier 2026, dirigée par Thomas Coratger. Les travaux de l'équipe sont suivis publiquement sur [pq.ethereum.org](https://pq.ethereum.org).

### Activité actuelle (en date d'avril 2026) {#current-activity}

- **Devnets d'interopérabilité hebdomadaires** : Plus de 10 équipes de clients participent à des tests réguliers d'interopérabilité post-quantique, notamment Lighthouse, Grandine, Zeam, Ream Labs et PierTwo.
- **Prix Poseidon** : Un prix de recherche d'un million de dollars visant à améliorer les primitives cryptographiques basées sur le hash.
- **Implémentations open source** : leanXMSS, leanVM, leanSpec (Python), leanSig (Rust) et leanMultisig sont tous disponibles sous l'[organisation GitHub leanEthereum](https://github.com/leanEthereum).
- **2e retraite annuelle de recherche PQ** : Prévue du 9 au 12 octobre 2026 à Cambridge, au Royaume-Uni.
- **Alignement avec le NIST** : Les travaux d'Ethereum s'appuient sur les normes de cryptographie post-quantique finalisées par le NIST en août 2024 (telles que ML-KEM, ML-DSA et SLH-DSA).

### Étapes de la migration {#migration-milestones}

L'équipe a défini une série de mises à niveau du protocole pour introduire progressivement la cryptographie post-quantique dans Ethereum. Il s'agit d'étapes de planification, et non d'engagements garantis. Les noms et l'ordre peuvent changer.

| Étape | Ce qu'elle introduit |
|-----------|--------------------|
| I* | Registre de clés PQ. Les validateurs peuvent enregistrer des clés publiques post-quantiques aux côtés des clés BLS existantes. |
| J* | Précompilations de vérification de signature PQ. Les contrats intelligents et les portefeuilles peuvent vérifier les signatures PQ de manière native. |
| L* | Attestations PQ et preuves de la couche de consensus en temps réel via leanVM. Les validateurs commencent à utiliser les signatures PQ pour le consensus. |
| M* | Agrégation complète des signatures PQ et engagements de blob sécurisés contre les attaques quantiques (PQ-safe). |

**Objectif** : Les étapes structurées du fork visent l'achèvement de l'infrastructure post-quantique de base d'ici 2029 environ. La migration complète de la couche d'exécution et de l'écosystème s'étendra au-delà.

## Que doivent faire les utilisateurs ? {#what-users-need-to-do}

**Pour le moment : rien.** Vos fonds sont en sécurité. Aucun ordinateur quantique ne peut aujourd'hui menacer la cryptographie d'Ethereum.

**À l'avenir** : Une fois que les schémas de signature post-quantique seront largement pris en charge sur Ethereum (prévu après le hard fork Hegotá et l'implémentation de l'EIP-8141), vous voudrez migrer votre compte vers des signatures résistantes aux ordinateurs quantiques. Les logiciels de portefeuille vous guideront tout au long de cette transition.

Si votre compte n'a jamais envoyé de transaction (ce qui signifie que votre clé publique n'a pas été exposée onchain), il bénéficie d'une couche de protection supplémentaire. Mais tous les comptes devront finir par migrer.

La question de savoir comment gérer les portefeuilles inactifs (les comptes dont les propriétaires peuvent ne pas être conscients de la nécessité de migrer) est un sujet de gouvernance ouvert. La communauté Ethereum n'a pas encore atteint de consensus à ce sujet.

## Foire aux questions {#faq}

<ExpandableCard title="Can quantum computers steal my ETH today?" eventCategory="/roadmap/future-proofing/quantum-resistance" eventName="clicked can quantum computers steal my ETH today?">

**Non.** Aucun ordinateur quantique ne peut aujourd'hui casser la cryptographie d'Ethereum. Le matériel quantique actuel est loin de l'échelle nécessaire. Le travail décrit sur cette page est une préparation pour l'avenir, et non une réponse à une menace active.

</ExpandableCard>

<ExpandableCard title="When could quantum computers become a threat?" eventCategory="/roadmap/future-proofing/quantum-resistance" eventName="clicked when could quantum computers become a threat?">

Les estimations varient. Les recherches de Google de mars 2026 suggèrent que le matériel nécessaire pour casser la cryptographie à courbe elliptique de 256 bits pourrait arriver au plus tôt vers la fin de cette décennie, mais d'importants défis d'ingénierie subsistent. La plupart des chercheurs considèrent qu'une menace réaliste est à plusieurs années au minimum. La réponse honnête est que personne ne connaît le calendrier exact, c'est précisément pourquoi il est important de s'y préparer dès maintenant.

</ExpandableCard>

<ExpandableCard title="Will I need to do anything to protect my wallet?" eventCategory="/roadmap/future-proofing/quantum-resistance" eventName="clicked will I need to do anything?">

À terme, oui. Une fois que les schémas de signature post-quantique seront disponibles sur Ethereum, les utilisateurs voudront migrer leurs comptes. Les logiciels de portefeuille géreront probablement cette transition pour vous. Pour l'instant, vous n'avez rien à faire. Lorsqu'une action sera nécessaire, la communauté Ethereum et les développeurs de portefeuilles fourniront des conseils et des outils clairs.

</ExpandableCard>

<ExpandableCard title="What about my tokens, NFTs, and DeFi positions?" eventCategory="/roadmap/future-proofing/quantum-resistance" eventName="clicked what about tokens NFTs DeFi?">

Les actifs sur Ethereum sont contrôlés par les signatures de compte. Une fois que votre compte a migré vers un schéma de signature résistant aux ordinateurs quantiques, tout ce qui se trouve dans ce compte est protégé. Vous n'avez pas besoin de migrer chaque actif individuellement. Les contrats intelligents qui détiennent des fonds (comme les protocoles de finance décentralisée (DeFi)) peuvent nécessiter leurs propres mises à niveau en fonction des primitives cryptographiques qu'ils utilisent en interne.

</ExpandableCard>

<ExpandableCard title="Is Ethereum behind other blockchains on this?" eventCategory="/roadmap/future-proofing/quantum-resistance" eventName="clicked is Ethereum behind?">

Non. Ethereum possède l'un des programmes post-quantiques les plus structurés de toutes les chaînes de blocs : une équipe dédiée, des recherches financées, des devnets hebdomadaires et une feuille de route de migration publiée, traitant l'informatique quantique comme une contrainte de conception de premier ordre. Aucune chaîne de blocs n'a encore achevé une transition post-quantique complète. Selon les estimations de la Fondation Ethereum, l'exposition des fonds inactifs vulnérables aux attaques quantiques d'Ethereum est d'environ 0,1 %, ce qui est considérablement inférieur à d'autres réseaux de chaînes de blocs majeurs.

</ExpandableCard>

<ExpandableCard title="What is 'harvest now, decrypt later'?" eventCategory="/roadmap/future-proofing/quantum-resistance" eventName="clicked what is harvest now decrypt later?">

« Récolter maintenant, déchiffrer plus tard » (Harvest now, decrypt later) est une attaque où quelqu'un enregistre des données chiffrées ou des clés publiques exposées aujourd'hui, puis casse le chiffrement plus tard lorsqu'un ordinateur quantique suffisamment puissant existera. Pour Ethereum, cela concerne principalement les comptes dont les clés publiques sont déjà exposées onchain (tout compte ayant envoyé une transaction). C'est l'une des raisons pour lesquelles la communauté considère la migration post-quantique comme urgente, même si la menace quantique n'est pas encore immédiate.

</ExpandableCard>

## Lectures complémentaires {#further-reading}

- [pq.ethereum.org](https://pq.ethereum.org) - _Fondation Ethereum_
- [Projet de cryptographie post-quantique](https://pse.dev/projects/post-quantum-cryptography) - _Privacy Stewards of Ethereum (PSE)_
- [Normes de cryptographie post-quantique du NIST](https://csrc.nist.gov/projects/post-quantum-cryptography) - _NIST_
- [Sauvegarder les cryptomonnaies en divulguant les vulnérabilités quantiques de manière responsable](https://research.google/blog/safeguarding-cryptocurrency-by-disclosing-quantum-vulnerabilities-responsibly/) - _Google Quantum AI_
- [Les frontières quantiques pourraient être plus proches qu'elles n'y paraissent](https://blog.google/innovation-and-ai/technology/safety-security/cryptography-migration-timeline/) - _Google_
- [KZG et configurations de confiance](/roadmap/danksharding/#what-is-kzg)
- [Ressources de l'atelier leanVM + PQ de la Lean Week Cambridge (2025)](https://github.com/leanEthereum/pm/blob/main/workshops-and-interops/2025/lean-week-cambridge/index.md) - _Lean Ethereum_
- [Appels de groupe ACD sur les signatures de transaction PQ](https://youtube.com/playlist?list=PLJqWcTqh_zKEOum3uR0odkH59fmGUYuZB) - _Fondation Ethereum_
- [Appels de groupe ACD sur l'interopérabilité PQ](https://youtube.com/playlist?list=PLJqWcTqh_zKF_Q9HNXBLW_AtktsjToTIu) - _Fondation Ethereum_
- [Liste de lecture YouTube sur Lean Ethereum et la sécurité post-quantique](https://youtube.com/playlist?list=PLJqWcTqh_zKGGuO_q1dgYLsfUoX1sNhWM) - _Fondation Ethereum_
- [Interview de panel sur la résistance post-quantique](https://youtu.be/5DRDjeMmOPw) - _Podcast Bankless_
- [Abstraction de compte sur Ethereum](/roadmap/account-abstraction/)
- [strawmap.org](https://strawmap.org/) - _Architecture de l'EF_
- [Superpositioned : Analyse de l'industrie de l'informatique quantique](https://www.superpositioned.co/) - _Saneel Sreeni_