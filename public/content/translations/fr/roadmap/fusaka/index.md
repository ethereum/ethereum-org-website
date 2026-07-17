---
title: "Fusaka 🦓"
metaTitle: Fulu-Osaka (Fusaka)
description: Découvrez la mise à jour du protocole Fusaka
lang: fr
authors: ["Nixo", "Mario Havel"]
---

**La mise à jour très attendue Fusaka d'Ethereum a été déployée le 3 décembre 2025**

La mise à jour du réseau Fusaka fait suite à [Pectra](/roadmap/pectra/) et apporte de nouvelles fonctionnalités tout en améliorant l'expérience de chaque utilisateur et développeur d'[Ethereum](/). Le nom est composé de la mise à jour de la couche d'exécution Osaka et de la version de la couche de consensus nommée d'après l'étoile Fulu. Les deux parties d'Ethereum reçoivent une mise à jour qui propulse la mise à l'échelle, la sécurité et l'expérience utilisateur d'Ethereum vers l'avenir.

<Alert variant="update">
<AlertContent>
<AlertDescription>
La mise à jour Fusaka n'est qu'une étape parmi les objectifs de développement à long terme d'Ethereum. Apprenez-en plus sur [la feuille de route du protocole](/roadmap/) et [les mises à jour précédentes](/ethereum-forks/).
</AlertDescription>
</AlertContent>
</Alert>

<VideoWatch slug="fusaka-upgrade-explained" />

## Améliorations dans Fusaka {#improvements-in-fusaka}

### Mise à l'échelle des blobs {#scale-blobs}

#### PeerDAS {#peerdas}

C'est la _tête d'affiche_ du fork Fusaka, la fonctionnalité principale ajoutée dans cette mise à jour. Les couches 2 (l2) publient actuellement leurs données sur Ethereum sous forme de blobs, le type de données éphémère créé spécifiquement pour les couches 2. Avant Fusaka, chaque nœud complet devait stocker chaque blob pour s'assurer que les données existaient. À mesure que le débit des blobs augmente, devoir télécharger toutes ces données devient insoutenable en termes de ressources.

Avec l'[échantillonnage de la disponibilité des données](https://notes.ethereum.org/@fradamt/das-fork-choice), au lieu de devoir stocker toutes les données des blobs, chaque nœud sera responsable d'un sous-ensemble des données de blob. Les blobs sont distribués de manière uniformément aléatoire sur les nœuds du réseau, chaque nœud complet ne détenant qu'un huitième (1/8) des données, ce qui permet une mise à l'échelle théorique jusqu'à 8x. Pour garantir la disponibilité des données, n'importe quelle portion des données peut être reconstruite à partir de n'importe quel 50 % existant de l'ensemble, avec des méthodes qui réduisent la probabilité de données erronées ou manquantes à un niveau cryptographiquement négligeable (~une sur 10<sup>20</sup> à une sur 10<sup>24</sup>).

Cela permet de maintenir les exigences matérielles et de bande passante des nœuds à un niveau acceptable tout en permettant la mise à l'échelle des blobs, ce qui se traduit par une plus grande capacité de mise à l'échelle avec des frais réduits pour les couches 2.

[En savoir plus sur PeerDAS](/roadmap/fusaka/peerdas/)

**Ressources** :

- [Spécification technique de l'EIP-7594](https://eips.ethereum.org/EIPS/eip-7594)
- [DappLion sur PeerDAS : Mettre Ethereum à l'échelle aujourd'hui | ETHSofia 2024](https://youtu.be/bONWd1x2TjQ?t=328)
- [Académique : Une documentation sur le PeerDAS d'Ethereum (PDF)](https://eprint.iacr.org/2024/1362.pdf)

#### Forks de paramètres de blob uniquement (Blob-Parameter-Only) {#blob-parameter-only-forks}

Les couches 2 mettent Ethereum à l'échelle - à mesure que leurs réseaux se développent, elles doivent publier plus de données sur Ethereum. Cela signifie qu'Ethereum devra augmenter le nombre de blobs qui leur sont disponibles au fil du temps. Bien que PeerDAS permette de mettre à l'échelle les données de blob, cela doit être fait de manière progressive et sécurisée.

Parce qu'Ethereum est un code s'exécutant sur des milliers de nœuds indépendants qui nécessitent un accord sur les mêmes règles, nous ne pouvons pas simplement introduire des changements comme l'augmentation du nombre de blobs de la même manière que l'on déploie une mise à jour de site web. Tout changement de règle doit être une mise à jour coordonnée où chaque nœud, client et logiciel de validateur se met à jour avant le même bloc prédéterminé.

Ces mises à jour coordonnées incluent généralement beaucoup de changements, nécessitent beaucoup de tests, et cela prend du temps. Afin de s'adapter plus rapidement aux besoins changeants en blobs des couches 2, les forks de paramètres de blob uniquement introduisent un mécanisme pour augmenter les blobs sans avoir à attendre ce calendrier de mise à jour.

Les forks de paramètres de blob uniquement peuvent être définis par les clients, de la même manière que d'autres configurations comme la limite de gaz. Entre les mises à jour majeures d'Ethereum, les clients peuvent convenir d'augmenter les blobs `target` et `max` à, par exemple, 9 et 12, puis les opérateurs de nœuds se mettront à jour pour participer à ce petit fork. Ces forks de paramètres de blob uniquement peuvent être configurés à tout moment.

Lorsque les blobs ont été ajoutés pour la première fois au réseau lors de la mise à jour Dencun, la cible était de 3. Cela a été augmenté à 6 dans Pectra et, après Fusaka, cela peut maintenant être augmenté à un rythme soutenable indépendamment de ces mises à jour majeures du réseau.

![Chart showing average blob count per block and increasing targets with upgrades](./average-blob-count-per-block.webp)

Source du graphique : [Ethereum Blobs - @hildobby, Dune Analytics](https://dune.com/hildobby/blobs)

**Ressources** : [Spécification technique de l'EIP-7892](https://eips.ethereum.org/EIPS/eip-7892)

#### Frais de base de blob limités par les coûts d'exécution {#blob-base-fee-bounded-by-execution-costs}

Les couches 2 paient deux factures lorsqu'elles publient des données : les frais de blob et le gaz d'exécution nécessaire pour vérifier ces blobs. Si le gaz d'exécution domine, l'enchère des frais de blob peut chuter en spirale jusqu'à 1 Wei et cesser d'être un signal de prix.

L'EIP-7918 fixe un prix de réserve proportionnel sous chaque blob. Lorsque la réserve est supérieure aux frais de base nominaux du blob, l'algorithme d'ajustement des frais considère que le bloc dépasse la cible, arrête de faire baisser les frais et leur permet d'augmenter normalement. En conséquence :

- le marché des frais de blob réagit toujours à la congestion
- les couches 2 paient au moins une part significative du calcul qu'elles imposent aux nœuds
- les pics de frais de base sur la couche d'exécution ne peuvent plus bloquer les frais de blob à 1 Wei

**Ressources** :

- [Spécification technique de l'EIP-7918](https://eips.ethereum.org/EIPS/eip-7918)
- [Explication Storybook](https://notes.ethereum.org/@anderselowsson/AIG)

### Mise à l'échelle de la couche 1 (l1) {#scale-l1}

#### Expiration de l'historique et reçus simplifiés {#history-expiry}

En juillet 2025, les clients d'exécution d'Ethereum [ont commencé à prendre en charge l'expiration partielle de l'historique](https://blog.ethereum.org/2025/07/08/partial-history-exp). Cela a supprimé l'historique antérieur à [La Fusion](https://ethereum.org/roadmap/merge/) afin de réduire l'espace disque requis par les opérateurs de nœuds à mesure qu'Ethereum continue de croître.

Cet EIP se trouve dans une section distincte des « EIP principaux » car le fork n'implémente en réalité aucun changement - c'est un avis indiquant que les équipes clientes doivent prendre en charge l'expiration de l'historique d'ici la mise à jour Fusaka. Dans la pratique, les clients peuvent l'implémenter à tout moment, mais l'ajouter à la mise à jour l'a concrètement placé sur leur liste de tâches et leur a permis de tester les changements de Fusaka conjointement avec cette fonctionnalité.

**Ressources** : [Spécification technique de l'EIP-7642](https://eips.ethereum.org/EIPS/eip-7642)

#### Définir des limites supérieures pour MODEXP {#set-upper-bounds-for-modexp}

Jusqu'à présent, le précompilé MODEXP acceptait des nombres de pratiquement n'importe quelle taille. Cela le rendait difficile à tester, facile à abuser et risqué pour la stabilité du client. L'EIP-7823 met en place une limite claire : chaque nombre en entrée peut avoir une longueur maximale de 8192 bits (1024 octets). Tout ce qui est plus grand est rejeté, le gaz de la transaction est brûlé et aucun changement d'état ne se produit. Cela couvre très confortablement les besoins du monde réel tout en supprimant les cas extrêmes qui compliquaient la planification de la limite de gaz et les examens de sécurité. Ce changement offre plus de sécurité et de protection contre les attaques DoS sans affecter l'expérience des utilisateurs ou des développeurs.

**Ressources** : [Spécification technique de l'EIP-7823](https://eips.ethereum.org/EIPS/eip-7823)

#### Plafond de la limite de gaz par transaction {#transaction-gas-limit-cap}

L'EIP-[7825](https://eips.ethereum.org/EIPS/eip-7825) ajoute un plafond de 16 777 216 (2^24) gaz par transaction. Il s'agit d'un renforcement proactif contre les attaques DoS en limitant le coût dans le pire des cas de toute transaction unique à mesure que nous augmentons la limite de gaz du bloc. Cela rend la validation et la propagation plus faciles à modéliser pour nous permettre d'aborder la mise à l'échelle via l'augmentation de la limite de gaz.

Pourquoi exactement 2^24 gaz ? C'est confortablement inférieur à la limite de gaz actuelle, c'est suffisamment grand pour les déploiements de contrats réels et les précompilés lourds, et une puissance de 2 le rend facile à implémenter sur tous les clients. Cette nouvelle taille maximale de transaction est similaire à la taille moyenne des blocs avant Pectra, ce qui en fait une limite raisonnable pour toute opération sur Ethereum.

**Ressources** : [Spécification technique de l'EIP-7825](https://eips.ethereum.org/EIPS/eip-7825)

#### Augmentation du coût en gaz de `MODEXP` {#modexp-gas-cost-increase}

MODEXP est une fonction intégrée de précompilé qui calcule l'exponentiation modulaire, un type de mathématiques sur les grands nombres utilisé dans la vérification de signature RSA et les systèmes de preuve. Elle permet aux contrats d'exécuter ces calculs directement sans avoir à les implémenter eux-mêmes.

Les développeurs et les équipes clientes ont identifié MODEXP comme un obstacle majeur à l'augmentation de la limite de gaz du bloc car la tarification actuelle du gaz sous-estime souvent la puissance de calcul requise par certaines entrées. Cela signifie qu'une transaction utilisant MODEXP pourrait prendre la majeure partie du temps nécessaire pour traiter un bloc entier, ralentissant ainsi le réseau.

Cet EIP modifie la tarification pour correspondre aux coûts de calcul réels en :

- augmentant la charge minimale de 200 à 500 gaz et en supprimant la remise d'un tiers de l'EIP-2565 sur le calcul du coût général
- augmentant le coût plus fortement lorsque l'entrée de l'exposant est très longue. Si l'exposant (le nombre « puissance » que vous passez comme deuxième argument) est plus long que 32 octets / 256 bits, la charge en gaz grimpe beaucoup plus vite pour chaque octet supplémentaire
- facturant également un supplément pour une base ou un modulo de grande taille. Les deux autres nombres (la base et le modulo) sont supposés faire au moins 32 octets - si l'un d'eux est plus grand, le coût augmente proportionnellement à sa taille

En faisant mieux correspondre les coûts au temps de traitement réel, MODEXP ne peut plus faire en sorte qu'un bloc prenne trop de temps à être validé. Ce changement fait partie de plusieurs mesures visant à rendre sûre l'augmentation de la limite de gaz du bloc d'Ethereum à l'avenir.

**Ressources** : [Spécification technique de l'EIP-7883](https://eips.ethereum.org/EIPS/eip-7883)

#### Limite de taille du bloc d'exécution RLP {#rlp-execution-block-size-limit}

Cela crée un plafond sur la taille autorisée d'un bloc - il s'agit d'une limite sur ce qui est _envoyé_ sur le réseau et elle est distincte de la limite de gaz, qui limite le _travail_ à l'intérieur d'un bloc. Le plafond de la taille du bloc est de 10 Mio, avec une petite allocation (2 Mio) réservée aux données de consensus afin que tout s'intègre et se propage proprement. Si un bloc se présente plus grand que cela, les clients le rejettent.
Ceci est nécessaire car les très gros blocs mettent plus de temps à se propager et à être vérifiés sur le réseau et peuvent créer des problèmes de consensus ou être utilisés comme vecteur d'attaque DoS. De plus, le protocole de diffusion (gossip) de la couche de consensus ne transfère déjà pas les blocs de plus de ~10 Mio, donc aligner la couche d'exécution sur cette limite évite les situations étranges du type « vu par certains, abandonné par d'autres ».

Dans les détails : il s'agit d'un plafond sur la taille du bloc d'exécution encodé en [RLP](/developers/docs/data-structures-and-encoding/rlp/). 10 Mio au total, avec une marge de sécurité de 2 Mio réservée au cadrage du bloc de la chaîne balise. Dans la pratique, les clients définissent

`MAX_BLOCK_SIZE = 10,485,760` octets et

`SAFETY_MARGIN = 2,097,152` octets,

et rejettent tout bloc d'exécution dont la charge utile RLP dépasse

`MAX_RLP_BLOCK_SIZE = MAX_BLOCK_SIZE − SAFETY_MARGIN`

L'objectif est de limiter le temps de propagation/validation dans le pire des cas et de s'aligner sur le comportement de diffusion de la couche de consensus, réduisant ainsi le risque de réorganisation/DoS sans modifier la comptabilité du gaz.

**Ressources** : [Spécification technique de l'EIP-7934](https://eips.ethereum.org/EIPS/eip-7934)

#### Définir la limite de gaz par défaut à 60 millions {#set-default-gas-limit-to-60-million}

Avant d'augmenter la limite de gaz de 30M à 36M en février 2025 (puis à 45M), cette valeur n'avait pas changé depuis La Fusion (septembre 2022). Cet EIP vise à faire de la mise à l'échelle cohérente une priorité.

L'EIP-7935 coordonne les équipes clientes de la couche d'exécution pour augmenter la limite de gaz par défaut au-dessus des 45M actuels pour Fusaka. Il s'agit d'un EIP informatif, mais il demande explicitement aux clients de tester des limites plus élevées sur les devnets, de converger vers une valeur sûre et d'intégrer ce nombre dans leurs versions Fusaka.

La planification sur devnet vise un stress d'environ 60M (blocs pleins avec charge synthétique) et des augmentations itératives ; la recherche indique que les pathologies de taille de bloc dans le pire des cas ne devraient pas être contraignantes en dessous d'environ 150M. Le déploiement doit être associé au plafond de la limite de gaz par transaction (EIP-7825) afin qu'aucune transaction unique ne puisse dominer à mesure que les limites augmentent.

**Ressources** : [Spécification technique de l'EIP-7935](https://eips.ethereum.org/EIPS/eip-7935)

### Améliorer l'expérience utilisateur (UX) {#improve-ux}

#### Anticipation déterministe du proposant {#deterministic-proposer-lookahead}

Avec l'EIP-7917, la chaîne balise sera informée des futurs proposants de blocs pour la prochaine époque. Avoir une vue déterministe sur les validateurs qui proposeront les futurs blocs peut permettre des [préconfirmations](https://ethresear.ch/t/based-preconfirmations/17353) - un engagement avec le futur proposant qui garantit que la transaction de l'utilisateur sera incluse dans son bloc sans attendre le bloc réel.

Cette fonctionnalité profite aux implémentations clientes et à la sécurité du réseau car elle empêche les cas extrêmes où les validateurs pourraient manipuler le calendrier des proposants. L'anticipation permet également de réduire la complexité de l'implémentation.

**Ressources** : [Spécification technique de l'EIP-7917](https://eips.ethereum.org/EIPS/eip-7917)

#### Code d'opération de comptage des zéros de tête (CLZ) {#count-leading-zeros-opcode}

Cette fonctionnalité ajoute une petite instruction EVM, le **comptage des zéros de tête (CLZ)**. Presque tout dans l'EVM est représenté sous forme de valeur de 256 bits — ce nouveau code d'opération renvoie le nombre de bits à zéro situés à l'avant. Il s'agit d'une fonctionnalité courante dans de nombreuses architectures de jeux d'instructions car elle permet des opérations arithmétiques plus efficaces. Dans la pratique, cela réduit les analyses de bits manuelles actuelles en une seule étape, de sorte que trouver le premier bit défini, analyser des octets ou analyser des champs de bits devient plus simple et moins cher. Le code d'opération a un coût fixe et faible, et a été évalué comme étant équivalent à une addition de base, ce qui réduit le bytecode et économise du gaz pour le même travail.

**Ressources** : [Spécification technique de l'EIP-7939](https://eips.ethereum.org/EIPS/eip-7939)

#### Précompilé pour la prise en charge de la courbe secp256r1 {#secp256r1-precompile}

Introduit un vérificateur de signature secp256r1 (P-256) intégré, de type clé d'accès, à l'adresse fixe `0x100` en utilisant le même format d'appel déjà adopté par de nombreuses couches 2 et en corrigeant les cas extrêmes, de sorte que les contrats écrits pour ces environnements fonctionnent sur la couche 1 (l1) sans modification.

Mise à niveau de l'expérience utilisateur ! Pour les utilisateurs, cela débloque la signature native sur l'appareil et les clés d'accès. Les portefeuilles peuvent exploiter directement Apple Secure Enclave, le magasin de clés Android, les modules de sécurité matériels (HSM) et FIDO2/WebAuthn - pas de phrase secrète, une intégration plus fluide et des flux d'authentification multifacteur qui ressemblent aux applications modernes. Cela se traduit par une meilleure expérience utilisateur, une récupération plus facile et des modèles d'abstraction de compte qui correspondent à ce que font déjà des milliards d'appareils.

Pour les développeurs, il prend une entrée de 160 octets et renvoie une sortie de 32 octets, ce qui facilite le portage des bibliothèques existantes et des contrats de couche 2. En interne, il inclut des vérifications de point à l'infini et de comparaison modulaire pour éliminer les cas extrêmes délicats sans interrompre les appelants valides.

**Ressources** :

- [Spécification technique de l'EIP-7951](https://eips.ethereum.org/EIPS/eip-7951)
- [En savoir plus sur le RIP-7212](https://www.alchemy.com/blog/what-is-rip-7212) _(Notez que l'EIP-7951 a remplacé le RIP-7212)_

### Méta {#meta}

#### Méthode JSON-RPC `eth_config` {#eth-config}

Il s'agit d'un appel JSON-RPC qui vous permet de demander à votre nœud quels paramètres de fork vous exécutez. Il renvoie trois instantanés : `current`, `next` et `last` afin que les validateurs et les outils de surveillance puissent vérifier que les clients sont alignés pour un fork à venir.

Concrètement, cela vise à combler une lacune découverte lorsque le fork Pectra a été déployé sur le réseau de test Holesky début 2025 avec des erreurs de configuration mineures qui ont entraîné un état de non-finalisation. Cela aide les équipes de test et les développeurs à s'assurer que les forks majeurs se comporteront comme prévu lors du passage des devnets aux réseaux de test, et des réseaux de test au Réseau principal.

Les instantanés incluent : `chainId`, `forkId`, l'heure d'activation prévue du fork, les précompilés actifs, les adresses des précompilés, les dépendances des contrats système et le calendrier des blobs du fork.

Cet EIP se trouve dans une section distincte des « EIP principaux » car le fork n'implémente en réalité aucun changement - c'est un avis indiquant que les équipes clientes doivent implémenter cette méthode JSON-RPC d'ici la mise à jour Fusaka.

**Ressources** : [Spécification technique de l'EIP-7910](https://eips.ethereum.org/EIPS/eip-7910)

## FAQ {#faq}

### Cette mise à jour affecte-t-elle tous les nœuds et validateurs d'Ethereum ? {#does-this-upgrade-affect-all-ethereum-nodes-and-validators}

Oui, la mise à jour Fusaka nécessite des mises à jour à la fois des [clients d'exécution et des clients de consensus](/developers/docs/nodes-and-clients/). Tous les principaux clients Ethereum publieront des versions prenant en charge le hard fork, marquées comme hautement prioritaires. Vous pouvez vous tenir au courant de la disponibilité de ces versions dans les dépôts GitHub des clients, sur leurs [canaux Discord](https://ethstaker.org/support), sur le [Discord d'EthStaker](https://dsc.gg/ethstaker), ou en vous abonnant au blog d'Ethereum pour les mises à jour du protocole. Pour maintenir la synchronisation avec le réseau Ethereum après la mise à jour, les opérateurs de nœuds doivent s'assurer qu'ils exécutent une version de client prise en charge. Notez que les informations sur les versions des clients sont sensibles au temps, et les utilisateurs doivent se référer aux dernières mises à jour pour obtenir les détails les plus récents.

### Comment l'ETH peut-il être converti après le hard fork ? {#how-can-eth-be-converted-after-the-hardfork}

- **Aucune action requise pour votre ETH** : Suite à la mise à jour Fusaka d'Ethereum, il n'est pas nécessaire de convertir ou de mettre à niveau votre ETH. Les soldes de vos comptes resteront les mêmes, et l'ETH que vous détenez actuellement restera accessible dans sa forme existante après le hard fork.
- **Méfiez-vous des arnaques !** <Emoji text="⚠️" /> **Toute personne vous demandant de « mettre à niveau » votre ETH essaie de vous arnaquer.** Vous n'avez rien à faire en rapport avec cette mise à jour. Vos actifs resteront totalement intacts. N'oubliez pas que rester informé est la meilleure défense contre les arnaques.

[En savoir plus sur la reconnaissance et l'évitement des arnaques](/security/)

### Pourquoi des zèbres ? <Emoji text="🦓" /> {#whats-with-the-zebras}

Le zèbre est la « mascotte » choisie par les développeurs pour Fusaka car ses rayures reflètent l'échantillonnage de la disponibilité des données basé sur des colonnes de PeerDAS, où les nœuds conservent certains sous-réseaux de colonnes et échantillonnent quelques autres colonnes à partir du créneau de chaque pair pour vérifier que les données de blob sont disponibles.

La Fusion en 2022 [a utilisé un panda](https://x.com/hwwonx/status/1431970802040127498) comme mascotte pour signaler la jonction des couches d'exécution et de consensus. Depuis lors, des mascottes ont été choisies de manière informelle pour chaque fork et apparaissent sous forme d'art ASCII dans les journaux des clients au moment de la mise à jour. C'est juste une façon amusante de célébrer.

### Quelles améliorations sont incluses pour la mise à l'échelle des couches 2 (L2) ? {#what-improvements-are-included-for-l2-scaling}

[PeerDAS](/roadmap/fusaka/peerdas) est la fonctionnalité principale du fork. Il implémente l'échantillonnage de la disponibilité des données (DAS) qui débloque plus d'évolutivité pour les rollups, mettant théoriquement à l'échelle l'espace des blobs jusqu'à 8 fois sa taille actuelle. Le marché des frais de blob sera également amélioré pour réagir efficacement à la congestion et garantir que les couches 2 paient des frais significatifs pour le calcul et l'espace que les blobs imposent aux nœuds.

### En quoi les forks BPO sont-ils différents ? {#how-are-bpo-forks-different}

Les forks de paramètres de blob uniquement (BPO) fournissent un mécanisme pour augmenter continuellement le nombre de blobs (à la fois cible et maximum) après l'activation de PeerDAS, sans avoir à attendre une mise à jour coordonnée complète. Chaque augmentation est codée en dur pour être préconfigurée dans les versions des clients prenant en charge Fusaka.

En tant qu'utilisateur ou validateur, vous n'avez pas besoin de mettre à jour vos clients pour chaque BPO et devez seulement vous assurer de suivre les hard forks majeurs comme Fusaka. C'est la même pratique qu'auparavant, aucune action spéciale n'est nécessaire. Il est toujours recommandé de surveiller vos clients autour des mises à jour et des BPO et de les maintenir à jour même entre les versions majeures, car des correctifs ou des optimisations peuvent suivre le hard fork.

### Quel est le calendrier des BPO ? {#what-is-the-bpo-schedule}

Le calendrier exact des mises à jour BPO sera déterminé avec les versions de Fusaka. Suivez les [annonces du protocole](https://blog.ethereum.org/category/protocol) et les notes de version de vos clients.

Exemple de ce à quoi cela pourrait ressembler :

- Avant Fusaka : cible 6, max 9
- À l'activation de Fusaka : cible 6, max 9
- BPO1, quelques semaines après l'activation de Fusaka : cible 10, max 15, augmentation de deux tiers
- BPO2, quelques semaines après BPO1 : cible 14, max 21

### Cela réduira-t-il les frais sur Ethereum (couche 1) {#will-this-lower-gas}

Cette mise à jour ne réduit pas les frais de gaz sur la couche 1 (l1), du moins pas directement. L'objectif principal est d'offrir plus d'espace de blob pour les données de rollup, réduisant ainsi les frais sur la couche 2. Cela pourrait avoir quelques effets secondaires sur le marché des frais de la couche 1, mais aucun changement significatif n'est attendu.

### En tant que staker, que dois-je faire pour la mise à jour ? {#as-a-staker-what-do-i-need-to-do-for-the-upgrade}

Comme pour chaque mise à jour du réseau, assurez-vous de mettre à jour vos clients vers les dernières versions marquées avec la prise en charge de Fusaka. Suivez les mises à jour dans la liste de diffusion et les [annonces du protocole sur le blog de l'EF](https://blog.ethereum.org/category/protocol) pour être informé des versions.
Pour valider votre configuration avant que Fusaka ne soit activé sur le Réseau principal, vous pouvez exécuter un validateur sur les réseaux de test. Fusaka est [activé plus tôt sur les réseaux de test](https://blog.ethereum.org/2025/09/26/fusaka-testnet-announcement), ce qui vous donne plus de temps pour vous assurer que tout fonctionne et signaler les bugs. Les forks de réseau de test sont également annoncés dans la liste de diffusion et sur le blog.

### L'« Anticipation déterministe du proposant » (EIP-7917) affecte-t-elle les validateurs ? {#does-7917-affect-validators}

Ce changement ne modifie pas le fonctionnement de votre client validateur, cependant, il fournira plus de visibilité sur l'avenir de vos tâches de validateur. Assurez-vous de mettre à jour vos outils de surveillance pour suivre les nouvelles fonctionnalités.

### Comment Fusaka affecte-t-il les exigences de bande passante pour les nœuds et les validateurs ? {#how-does-fusaka-affect-bandwidth-requirements-for-nodes-and-validators}

PeerDAS apporte un changement significatif dans la façon dont les nœuds transmettent les données de blob. Toutes les données sont divisées en morceaux appelés colonnes sur 128 sous-réseaux, les nœuds ne s'abonnant qu'à certains d'entre eux. La quantité de colonnes de sous-réseau que les nœuds doivent conserver dépend de leur configuration et du nombre de validateurs connectés. Les exigences réelles en matière de bande passante dépendront de la quantité de blobs autorisés sur le réseau et du type de nœud. Au moment de l'activation de Fusaka, la cible de blobs reste la même qu'auparavant, mais avec PeerDAS, les opérateurs de nœuds peuvent constater une diminution de leur utilisation du disque pour les blobs et du trafic réseau. À mesure que les BPO configurent un plus grand nombre de blobs sur le réseau, la bande passante nécessaire augmentera avec chaque BPO.

Les exigences des nœuds restent dans les [marges recommandées](https://eips.ethereum.org/EIPS/eip-7870) même après les BPO de Fusaka.

#### Nœuds complets {#full-nodes}

Les nœuds réguliers sans aucun validateur ne s'abonneront qu'à 4 sous-réseaux, assurant la conservation d'un huitième (1/8) des données d'origine. Cela signifie qu'avec la même quantité de données de blob, la bande passante du nœud pour les télécharger serait réduite d'un facteur huit (8). L'utilisation du disque et la bande passante de téléchargement des blobs pour un nœud complet normal pourraient diminuer d'environ 80 %, pour n'atteindre que quelques Mo.

#### Stakers en solo {#solo-stakers}

Si le nœud est utilisé pour un client validateur, il doit conserver plus de colonnes et donc traiter plus de données. Avec un validateur ajouté, le nœud s'abonne à au moins 8 sous-réseaux de colonnes et traite donc deux fois plus de données qu'un nœud régulier, mais toujours moins qu'avant Fusaka. Si le solde du validateur est supérieur à 287 ETH, il s'abonnera à de plus en plus de sous-réseaux.

Pour un staker en solo, cela signifie que son utilisation du disque et sa bande passante de téléchargement diminueront d'environ 50 %. Cependant, pour construire des blocs localement et télécharger tous les blobs sur le réseau, une plus grande bande passante d'envoi (upload) est nécessaire. Les constructeurs locaux auront besoin d'une bande passante d'envoi 2 à 3 fois plus élevée qu'auparavant au moment de Fusaka et avec la cible BPO2 de 15/21 blobs, la bande passante d'envoi finale nécessaire devra être environ 5 fois plus élevée, à 100 Mbps.

#### Grands validateurs {#large-validators}

Le nombre de sous-réseaux abonnés augmente avec l'ajout de solde et de validateurs au nœud. Par exemple, autour de 800 ETH de solde, le nœud conserve 25 colonnes et aura besoin d'environ 30 % de bande passante de téléchargement en plus qu'auparavant. L'envoi nécessaire augmente de la même manière que pour les nœuds réguliers et au moins 100 Mbps sont nécessaires.

À 4096 ETH, soit 2 validateurs au solde maximum, le nœud devient un « supernœud » qui conserve toutes les colonnes, et donc télécharge et stocke tout. Ces nœuds guérissent activement le réseau en restituant les données manquantes, mais nécessitent également beaucoup plus de bande passante et de stockage. La cible finale de blobs étant 6 fois plus élevée qu'auparavant, les supernœuds devront stocker environ 600 Go de données de blob supplémentaires et disposer d'une bande passante de téléchargement soutenue plus rapide, d'environ 20 Mbps.

[Lisez plus de détails sur les exigences attendues.](https://ethpandaops.io/posts/fusaka-bandwidth-estimation/#theoretical-requirements)

### Quels changements de l'EVM sont implémentés ? {#what-evm-changes-are-implemented}

Fusaka consolide l'EVM avec de nouveaux changements et fonctionnalités mineurs.

- Pour des raisons de sécurité lors de la mise à l'échelle, la taille maximale d'une transaction unique sera [limitée à 16,7 millions](https://eips.ethereum.org/EIPS/eip-7825) d'unités de gaz.
- [Le nouveau code d'opération de comptage des zéros de tête (CLZ)](https://eips.ethereum.org/EIPS/eip-7939) est ajouté à l'EVM et permettra aux langages de contrats intelligents d'effectuer certaines opérations plus efficacement.
- [Le coût du précompilé `ModExp` sera augmenté](https://eips.ethereum.org/EIPS/eip-7883) — les contrats l'utilisant factureront plus de gaz pour l'exécution.

### Comment la nouvelle limite de gaz de 16M affecte-t-elle les développeurs de contrats ? {#how-does-new-16m-gas-limit-affects-contract-developers}

Fusaka introduit une limite à la [taille maximale d'une transaction unique à 16,7 millions](https://eips.ethereum.org/EIPS/eip-7825) (2^24) d'unités de gaz. C'est à peu près la taille précédente d'un bloc moyen, ce qui la rend suffisamment grande pour accueillir des transactions complexes qui consommeraient un bloc entier. Cette limite crée une protection pour les clients, empêchant d'éventuelles attaques DoS à l'avenir avec une limite de gaz de bloc plus élevée. L'objectif de la mise à l'échelle est de permettre à plus de transactions d'entrer dans la chaîne de blocs sans qu'une seule ne consomme tout le bloc.

Les transactions des utilisateurs réguliers sont loin d'atteindre cette limite. Certains cas extrêmes comme les opérations DeFi importantes et complexes, les déploiements de gros contrats intelligents ou les transactions par lots ciblant plusieurs contrats pourraient être affectés par ce changement. Ces transactions devront être divisées en transactions plus petites ou optimisées d'une autre manière. Utilisez la simulation avant de soumettre des transactions qui atteignent potentiellement la limite.

La méthode RPC `eth_call` n'est pas limitée et permettra la simulation de transactions plus importantes que la limite réelle de la chaîne de blocs. La limite réelle pour les méthodes RPC peut être configurée par l'opérateur du client pour s'assurer de prévenir les abus.

### Que signifie CLZ pour les développeurs ? {#what-clz-means-for-developers}

Les compilateurs EVM comme Solidity implémenteront et utiliseront la nouvelle fonction pour compter les zéros en interne. Les nouveaux contrats pourraient bénéficier d'économies de gaz s'ils s'appuient sur ce type d'opération. Suivez les versions et les annonces de fonctionnalités du langage de contrat intelligent pour obtenir de la documentation sur les économies potentielles.

### Y a-t-il des changements pour mes contrats intelligents existants ? {#what-clz-means-for-developers-2}

Fusaka n'a aucun effet direct qui casserait des contrats existants ou modifierait leur comportement. Les changements introduits dans la couche d'exécution sont effectués avec une rétrocompatibilité, cependant, gardez toujours un œil sur les cas extrêmes et l'impact potentiel.

[Avec l'augmentation du coût du précompilé `ModExp`](https://eips.ethereum.org/EIPS/eip-7883), les contrats qui en dépendent consommeront plus de gaz pour l'exécution. Si votre contrat s'appuie fortement sur cela et devient plus cher pour les utilisateurs, reconsidérez la façon dont il est utilisé.

Prenez en compte la [nouvelle limite de 16,7 millions](https://eips.ethereum.org/EIPS/eip-7825) si les transactions exécutant vos contrats pourraient atteindre une taille similaire.

## Complément d'information {#further-reading}

- [Feuille de route d'Ethereum](/roadmap/)
- [Forkcast : Fusaka](https://forkcast.org/upgrade/fusaka)
- [Méta EIP de Fusaka](https://eips.ethereum.org/EIPS/eip-7607)
- [Annonce sur le blog du réseau de test Fusaka](https://blog.ethereum.org/2025/09/26/fusaka-testnet-announcement)
- [Bankless : Ce que Fusaka et Pectra apporteront à Ethereum](https://www.bankless.com/read/what-fusaka-pectra-will-bring-ethereum)
- [Bankless : Les prochaines mises à jour d'Ethereum : Fusaka, Glamsterdam et au-delà avec Preston Van Loon](https://x.com/BanklessHQ/status/1956017743289020633?t=502)
- [Les dossiers Fusaka](https://www.youtube.com/playlist?list=PL4cwHXAawZxpz-erUbKKUnnGoQNdF8s7Z)
- [Explication de PEEPanEIPs](https://www.youtube.com/playlist?list=PL4cwHXAawZxoIenfk7OJry4rxcqX-eqBt)