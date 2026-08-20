---
title: Technologie de validateur distribué
description: La technologie de validateur distribué permet l'exploitation distribuée d'un validateur Ethereum par plusieurs parties.
lang: fr
template: staking
sidebarDepth: 2
summaryPoints:
  - Divise la clé de signature d'un validateur entre plusieurs machines et opérateurs, éliminant ainsi les points de défaillance uniques
  - Maintient les validateurs en ligne malgré les pannes matérielles, logicielles ou les défaillances individuelles des opérateurs
  - Infrastructure de production utilisée aujourd'hui par les stakers en solo, les services de staking et les pools de staking
---

## Qu'est-ce que la technologie de validateur distribué ? {#what-is-dvt}

La technologie de validateur distribué (DVT) est une approche de la sécurité des validateurs qui répartit la gestion des clés et les responsabilités de signature entre plusieurs parties, afin de réduire les points de défaillance uniques et d'augmenter la résilience des validateurs.

La DVT distribue la gestion des clés et la signature en **divisant la clé privée** utilisée pour sécuriser un validateur **entre plusieurs ordinateurs** organisés en un « cluster » (grappe). Cela permet à certains nœuds du cluster de se déconnecter tout en gardant le nœud validateur actif, car le travail de validation nécessaire peut être effectué par un sous-ensemble des machines de chaque cluster. Cette distribution réduit les points de défaillance uniques, rendant le validateur plus robuste. Un avantage supplémentaire de la distribution de signature de la DVT est qu'elle rend très difficile pour les attaquants d'accéder à la clé, car elle n'est stockée dans son intégralité sur aucune machine individuelle.

![A Diagram showing how a single validator key is split into key shares and distributed to multiple nodes with varying components.](./dvt-cluster.png)

La DVT n'est pas une méthode de staking distincte. C'est une couche logicielle que toute configuration de staking peut utiliser :
- Les [stakers en solo](/staking/solo/) peuvent faire équipe pour exécuter un validateur ensemble, ou un staker en solo individuel peut utiliser la DVT pour ajouter de la résilience à sa configuration de staking en solo.
- Les [services de staking](/staking/saas/) et les [pools de staking](/staking/pools/) peuvent utiliser la DVT pour ajouter de la résilience et renforcer leur infrastructure de staking, ou pour distribuer les opérations des validateurs entre de nombreux opérateurs indépendants.

## Pourquoi avons-nous besoin de la DVT ? {#why-do-we-need-dvt}

### Sécurité {#security}

Les validateurs génèrent deux paires de clés publique-privée : des clés de validateur pour participer au consensus et des clés de retrait pour accéder aux fonds. Bien que les validateurs puissent sécuriser les clés de retrait dans un stockage à froid, les clés privées de validateur doivent être en ligne 24h/24 et 7j/7 pour signer les tâches assignées au validateur en permanence, telles que les attestations et les propositions de blocs. Garder une clé en ligne l'expose au vol, et la DVT limite cette exposition : seules des parts de clé sont en ligne, jamais la clé complète.

Si une clé privée de validateur est compromise, un attaquant peut contrôler le validateur, ce qui peut entraîner une réduction (slashing) ou la perte des ETH du staker. La DVT atténue ce risque. Avec la DVT, la clé de validateur complète d'origine est chiffrée et divisée en parts de clé. Les parts de clé vivent en ligne, distribuées sur plusieurs nœuds qui exploitent le validateur ensemble, tandis que la clé « maîtresse » complète reste hors ligne en toute sécurité. La distribution est possible car les validateurs [Ethereum](/) utilisent des signatures BLS qui sont additives, ce qui signifie que la clé complète peut être reconstruite en additionnant ses composants. Les signatures partielles effectuées avec les parts de clé se combinent en une signature valide pour la clé complète, de sorte que la clé complète elle-même n'est jamais nécessaire pour la signature quotidienne. Lorsqu'un cluster génère une nouvelle clé de validateur à l'aide de la génération de clé distribuée, la clé privée complète n'existe jamais sur une seule machine.

### Aucun point de défaillance unique {#no-single-point-of-failure}

Lorsqu'un validateur est divisé entre plusieurs opérateurs et plusieurs machines, il peut résister aux pannes matérielles et logicielles individuelles sans se déconnecter. Le risque de pannes peut également être réduit en utilisant diverses configurations matérielles et logicielles sur les nœuds d'un cluster. La distribution multi-opérateurs n'est pas disponible nativement pour les configurations de validateur à nœud unique ; elle provient de la couche middleware DVT.

Si l'un des composants d'une machine d'un cluster tombe en panne (par exemple, s'il y a quatre opérateurs dans un cluster de validateurs et que l'un d'eux utilise un client spécifique qui a un bug), les autres peuvent s'assurer que le validateur continue de fonctionner.

### Décentralisation {#decentralization}

Le scénario idéal pour Ethereum est d'avoir autant de validateurs exploités indépendamment que possible. Cependant, quelques fournisseurs de staking sont devenus très populaires et représentent une part substantielle du total des ETH stakés sur le réseau. La DVT peut permettre à ces opérateurs d'exister tout en préservant la décentralisation de la mise. Cela s'explique par le fait que les clés de chaque validateur sont distribuées sur de nombreuses machines et qu'il faudrait une collusion beaucoup plus importante pour qu'un validateur devienne malveillant.

Sans la DVT, il est plus facile pour les fournisseurs de staking de ne prendre en charge qu'une ou deux configurations de clients pour tous leurs validateurs, ce qui augmente l'impact d'un bug client. La DVT peut être utilisée pour répartir le risque sur plusieurs configurations de clients et différents matériels, créant ainsi une résilience grâce à la diversité.

**La DVT offre les avantages suivants à Ethereum :**

1. **Décentralisation** du consensus de preuve d'enjeu (PoS) d'Ethereum
2. Assure la **vivacité** du réseau
3. Crée une **tolérance aux pannes** des validateurs
4. Fonctionnement des validateurs à **confiance minimisée**
5. Risques de **réduction (slashing)** et de temps d'arrêt minimisés
6. **Améliore la diversité** (client, centre de données, emplacement, réglementation, etc.)
7. **Sécurité renforcée** de la gestion des clés de validateur

## Comment fonctionne la DVT ? {#how-does-dvt-work}

Les implémentations de la DVT s'exécutent généralement comme un logiciel supplémentaire sur chaque machine d'un cluster. Ce logiciel agit comme un middleware, se situant entre le client validateur d'un nœud et son client de consensus, où il se coordonne avec les autres nœuds du cluster afin que les tâches du validateur soient signées collectivement.

Une solution DVT contient les composants suivants :

- **[Partage de secret de Shamir](https://medium.com/@keylesstech/a-beginners-guide-to-shamir-s-secret-sharing-e864efbf3648)** - Les validateurs utilisent des [clés BLS](https://en.wikipedia.org/wiki/BLS_digital_signature). Une clé privée de validateur peut être divisée en plusieurs « parts de clé », et comme les signatures BLS sont additives, les signatures partielles effectuées avec ces parts de clé peuvent être combinées en une seule signature valide pour la clé de validateur complète.
- **[Schéma de signature à seuil](https://medium.com/nethermind-eth/threshold-signature-schemes-36f40bc42aca)** - Détermine le nombre de parts de clé individuelles requises pour les tâches de signature, par exemple, 3 sur 4.
- **[Génération de clé distribuée (DKG)](https://medium.com/toruslabs/what-distributed-key-generation-is-866adc79620)** - Processus cryptographique qui génère les parts de clé et est utilisé pour distribuer les parts d'une clé de validateur existante ou nouvelle aux nœuds d'un cluster.
- **[Calcul multiparti (MPC)](https://messari.io/report/applying-multiparty-computation-to-the-world-of-blockchains)** - La clé de validateur complète est générée en secret à l'aide du calcul multiparti. La clé complète n'est jamais connue d'un opérateur individuel — ils ne connaissent que leur propre partie (leur « part »).
- **Protocole de consensus** - Le protocole de consensus sélectionne un nœud pour être le proposeur de bloc. Il partage le bloc avec les autres nœuds du cluster, qui ajoutent leurs parts de clé à la signature agrégée. Lorsque suffisamment de parts de clé ont été agrégées, le bloc est proposé sur Ethereum.

Les validateurs distribués ont une tolérance aux pannes intégrée et peuvent continuer à fonctionner même si certains des nœuds individuels se déconnectent. Le cluster du nœud validateur est résilient même si certains des nœuds qui le composent s'avèrent malveillants ou inactifs.

## La DVT en production {#dvt-in-production}

Les validateurs distribués fonctionnent aujourd'hui sur le Réseau principal à travers le staking en solo, les services de staking et le staking mutualisé. Deux réseaux concentrent la majeure partie de cette activité :

<ProductDisclaimer />

- **Obol** développe Charon, un client middleware DVT open-source qui permet à un cluster de machines d'exploiter un validateur ensemble (« squad staking »). Les groupes effectuent la génération de clé distribuée et configurent leur cluster via le [DV Launchpad](https://docs.obol.org/learn/readme/launchpad) d'Obol. Les clusters Obol sont utilisés en production par des [protocoles de staking](/staking/pools/) et des [services de staking](/staking/saas/), y compris le module Simple DVT de Lido et le programme Operation Solo Staker d'EtherFi, qui intègre des opérateurs à domicile dans des clusters tolérants aux pannes.
- **SSV Network** est un réseau sans permission d'opérateurs de nœuds indépendants. Une clé de validateur est divisée en parts de clé et distribuée à un ensemble choisi d'opérateurs, qui effectuent collectivement les tâches du validateur ; aucun opérateur individuel ne détient jamais la clé complète. Les services et pools de staking exécutent de grands ensembles de validateurs sur SSV, et tout comme Obol, il est utilisé par le module Simple DVT de Lido.

## Cas d'utilisation de la DVT {#dvt-use-cases}

La DVT a des implications importantes pour l'industrie du staking dans son ensemble :

### Stakers en solo {#solo-stakers}

La DVT permet le **squad staking** (staking en équipe) : un petit groupe de personnes, comme des amis, des membres de la communauté ou des inconnus coordonnés via un launchpad, exécutant collectivement un seul validateur sur leurs propres machines. Un seuil du groupe (par exemple, 3 sur 4) doit être en ligne pour que le validateur accomplisse ses tâches, de sorte qu'aucun temps d'arrêt, panne matérielle ou erreur d'un seul membre ne mette le validateur hors ligne. Lorsque la clé est créée avec la génération de clé distribuée, aucun membre ne détient jamais la clé de signature complète.

La DVT permet également le staking non dépositaire en vous permettant de distribuer votre clé de validateur sur des nœuds distants tout en gardant la clé complète complètement hors ligne. Cela signifie que les stakers n'ont pas nécessairement besoin d'exécuter leur propre matériel, et la distribution des parts de clé aide à se protéger contre les piratages potentiels.

### Staking en tant que service (SaaS) {#saas}

Les opérateurs (tels que les pools de staking et les stakers institutionnels) gérant de nombreux validateurs peuvent utiliser la DVT pour réduire leurs risques. En distribuant leur infrastructure, ils peuvent ajouter de la redondance à leurs opérations et diversifier les types de matériel qu'ils utilisent.

La DVT partage la responsabilité de la gestion des clés entre plusieurs nœuds, ce qui signifie que certains coûts opérationnels peuvent également être partagés. La DVT peut également réduire le risque opérationnel et les coûts d'assurance pour les fournisseurs de staking.

### Pools de staking {#staking-pools}

En raison des configurations standard des validateurs, les pools de staking et les fournisseurs de staking liquide devaient historiquement accorder une confiance importante à chaque opérateur individuel, car les gains et les pertes sont socialisés dans l'ensemble du pool. Ils dépendaient également des opérateurs pour protéger les clés de signature car, jusqu'à la DVT, il n'y avait pas d'autre option pour eux.

Même si traditionnellement des efforts sont faits pour répartir les risques en distribuant les mises entre plusieurs opérateurs, chaque opérateur gère toujours une mise importante de manière indépendante. S'appuyer sur un seul opérateur pose d'immenses risques s'il sous-performe, rencontre des temps d'arrêt, est compromis ou agit de manière malveillante.

En tirant parti de la DVT, la confiance requise de chaque opérateur individuel peut être réduite. **Les pools peuvent permettre aux opérateurs de détenir des mises sans avoir besoin de la garde des clés de validateur** (car seules des parts de clé sont utilisées). Cela permet également de distribuer les mises gérées entre un plus grand nombre d'opérateurs (par exemple, au lieu d'avoir un seul opérateur gérant 1 000 validateurs, la DVT permet à ces validateurs d'être exécutés collectivement par plusieurs opérateurs). Les diverses configurations d'opérateurs contribuent à garantir que si un opérateur tombe en panne, les autres seront toujours en mesure d'attester. La redondance et la diversification qui en résultent peuvent conduire à de meilleures performances et à une plus grande résilience, tout en maximisant les récompenses.

Un autre avantage de la minimisation de la confiance envers un seul opérateur est que les pools de staking peuvent permettre une participation des opérateurs plus ouverte et sans permission. Certains pools de staking le font en production aujourd'hui. Les clusters DVT multi-opérateurs permettent aux protocoles d'associer des stakers à domicile et de petits opérateurs à de plus grands professionnels, combinant des ensembles d'opérateurs sélectionnés et sans permission.

## Inconvénients potentiels de l'utilisation de la DVT {#potential-drawbacks-of-using-dvt}

- **Composant supplémentaire** - l'introduction d'un nœud DVT ajoute une autre partie qui peut potentiellement être défectueuse ou vulnérable. Cela est atténué par le fait d'avoir plusieurs implémentations de logiciels DVT, tout comme il existe plusieurs clients pour les couches de consensus et d'exécution.
- **Coûts opérationnels** - comme la DVT distribue le validateur entre plusieurs parties, il faut plus de nœuds pour le fonctionnement au lieu d'un seul nœud, ce qui entraîne une augmentation des coûts d'exploitation.
- **Latence potentiellement accrue** - étant donné que la DVT utilise un protocole de consensus pour parvenir à un consensus entre les multiples nœuds exploitant un validateur, elle peut potentiellement introduire une latence accrue.

## Foire aux questions {#faq}

<ExpandableCard title="Ai-je besoin de la DVT pour staker ?" eventCategory="DVT" eventName="clicked do I need DVT to stake">
Non. Une seule machine exécutant un client validateur fonctionne sans aucun logiciel DVT, et cela reste une configuration de staking à domicile courante. La DVT est une couche facultative qui ajoute une tolérance aux pannes et élimine les points de défaillance uniques. C'est utile si vous souhaitez que votre validateur survive aux pannes de machines individuelles, ou si vous souhaitez partager la responsabilité de l'exécution d'un validateur avec d'autres.
</ExpandableCard>

<ExpandableCard title="La DVT divise-t-elle mes ETH ou mes clés de retrait ?" eventCategory="DVT" eventName="clicked does DVT split my ETH">
Non. La DVT ne divise que la clé de _signature_ du validateur, qui est utilisée pour les tâches de consensus telles que les attestations et les propositions de blocs. Votre mise est toujours contrôlée par l'adresse de retrait définie pour le validateur, qui n'est pas affectée par la DVT. Depuis la mise à jour Pectra, le détenteur de l'adresse de retrait peut également déclencher une sortie de validateur directement depuis la couche d'exécution, sans avoir besoin de la clé de signature.
</ExpandableCard>

<ExpandableCard title="Que se passe-t-il si des nœuds d'un cluster sont hors ligne ?" eventCategory="DVT" eventName="clicked what happens if nodes go offline">
Tant qu'un seuil de nœuds reste en ligne (par exemple, 3 sur 4), le validateur continue d'accomplir ses tâches. Si trop de nœuds se déconnectent en même temps, le validateur se déconnecte simplement et manque des récompenses jusqu'à ce que suffisamment de nœuds reviennent, comme n'importe quel validateur hors ligne. Se déconnecter n'est pas une infraction passible de réduction (slashing).
</ExpandableCard>

<ExpandableCard title="Un cluster doit-il être de 3 sur 4 ?" eventCategory="DVT" eventName="clicked does a cluster have to be 3 of 4">
Non. « 3 sur 4 » n'est que la plus petite configuration courante, et elle est utilisée comme exemple tout au long de cette page. La taille du cluster et le seuil de signature sont choisis lors de la création du cluster.

Les clusters sont généralement dimensionnés de sorte que le seuil soit une supermajorité des deux tiers des nœuds, ce qui permet au cluster de continuer à signer tout en tolérant les membres défectueux ou hors ligne. Un cluster de 4 nœuds signe avec 3 et tolère 1 panne ; 7 nœuds signent avec 5 et tolèrent 2 pannes ; 10 nœuds signent avec 7 et tolèrent 3 pannes. Des clusters plus grands offrent une plus grande tolérance aux pannes au prix de plus de machines à exécuter et de plus de coordination entre elles.

[En savoir plus sur la taille et la résilience des clusters](https://docs.obol.org/next/learn/charon/cluster-configuration#cluster-size-and-resilience)
</ExpandableCard>

<ExpandableCard title="La DVT est-elle la même chose que le staking mutualisé ?" eventCategory="DVT" eventName="clicked is DVT the same as pooled staking">
Non. Le staking mutualisé combine les ETH de nombreuses personnes pour financer des validateurs, et c'est l'une des nombreuses [façons de staker](/staking/). La DVT est une infrastructure pour _exploiter_ un validateur. Elle distribue la signature d'un validateur sur plusieurs machines et opérateurs. Les deux sont complémentaires ; de nombreux pools utilisent la DVT pour distribuer leurs ensembles d'opérateurs, mais la DVT elle-même ne mutualise les ETH de personne.
</ExpandableCard>

## Complément d'information {#further-reading}

- [Technologie de validateur distribué (DVT) Ethereum - Introduction complète](https://www.cyfrin.io/blog/full-introduction-to-ethereum-distributed-validator-technology-dvt) - Cyfrin
- [Qu'est-ce que la DVT et comment améliore-t-elle le staking sur Ethereum ?](https://blog.obol.org/what-is-dvt-and-how-does-it-improve-staking-on-ethereum/) - Obol
- [Spécifications des validateurs distribués Ethereum (haut niveau)](https://github.com/ethereum/distributed-validator-specs)
- [Spécifications techniques des validateurs distribués Ethereum](https://github.com/ethereum/distributed-validator-specs/tree/dev/src/dvspec)
- [Documentation d'Obol](https://docs.obol.org/)
- [Documentation de SSV Network](https://docs.ssv.network/)
- [Module Simple DVT de Lido](https://operatorportal.lido.fi/modules/simple-dvt-module)
- [Application de démonstration du partage de secret de Shamir](https://iancoleman.io/shamir/)