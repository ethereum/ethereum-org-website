---
title: Fulu-Osaka (Fusaka)
description: "En savoir plus sur la mise à niveau du protocole Fusaka"
lang: fr
---

# Fusaka <Emoji text="🦓" /> {#fusaka}

**La mise à niveau très attendue Fusaka d'Ethereum a été mise en service le 3 décembre 2025**

La mise à niveau du réseau Fusaka suit [Pectra](/roadmap/pectra/) et apporte plus de nouvelles fonctionnalités et améliore l'expérience de chaque utilisateur et développeur Ethereum. Le nom se compose de la mise à niveau de la couche d'exécution Osaka et de la version de la couche de consensus nommée d'après l'étoile Fulu. Les deux parties d'Ethereum reçoivent une mise à niveau qui repousse la mise à l'échelle, la sécurité et l'expérience utilisateur d'Ethereum vers le futur.

<Alert variant="update">
<AlertContent>
<AlertDescription>
La mise à niveau de Fusaka n'est qu'une seule étape dans les objectifs de développement à long terme d'Ethereum. Apprenez-en plus sur [la feuille de route du protocole](/roadmap/) et les [mises à niveau précédentes](/ethereum-forks/).
</AlertDescription>
</AlertContent>
</Alert>

## Améliorations dans Fusaka {#improvements-in-fusaka}

### Mise à l'échelle des blobs {#scale-blobs}

#### PeerDAS {#peerdas}

Il s'agit de la _tête d'affiche_ de la fourche Fusaka, la principale fonctionnalité ajoutée dans cette mise à niveau. Les couches 2 publient actuellement leurs données sur Ethereum sous forme de blobs, le type de données éphémères créé spécifiquement pour les couches 2. Avant Fusaka, chaque nœud complet devait stocker chaque blob pour garantir l'existence des données. À mesure que le débit des blobs augmente, le téléchargement de toutes ces données devient extrêmement gourmand en ressources.

Avec [l'échantillonnage de disponibilité des données](https://notes.ethereum.org/@fradamt/das-fork-choice), au lieu de devoir stocker toutes les données blob, chaque nœud sera responsable d'un sous-ensemble des données blob. Les blobs sont répartis uniformément de manière aléatoire sur les nœuds du réseau, chaque nœud complet ne contenant que 1/8 des données, permettant ainsi une mise à l'échelle théorique jusqu'à 8x. Pour garantir la disponibilité des données, n'importe quelle partie des données peut être reconstruite à partir de 50 % existants de l'ensemble avec des méthodes qui réduisent la probabilité de données erronées ou manquantes à un niveau cryptographiquement négligeable (~ un sur 10<sup>20</sup> à un sur 10<sup>24</sup>).

Cela permet de maintenir les exigences matérielles et de bande passante des nœuds à un niveau tenable tout en permettant la mise à l'échelle des blobs, ce qui se traduit par une plus grande évolutivité avec des frais moins élevés pour les couches 2.

[En savoir plus sur PeerDAS](/roadmap/fusaka/peerdas/)

**Ressources** :

- [Spécification technique de l'EIP-7594](https://eips.ethereum.org/EIPS/eip-7594)
- [DappLion sur PeerDAS : Mise à l'échelle d'Ethereum aujourd'hui | ETHSofia 2024](https://youtu.be/bONWd1x2TjQ?t=328)
- [Article universitaire : une documentation sur PeerDAS d'Ethereum (PDF)](https://eprint.iacr.org/2024/1362.pdf)

#### Forks à paramètre blob uniquement {#blob-parameter-only-forks}

Les couches 2 font évoluer Ethereum : à mesure que leurs réseaux se développent, ils doivent publier davantage de données sur Ethereum. Cela signifie qu'Ethereum devra augmenter le nombre de blobs à sa disposition au fil du temps. Bien que PeerDAS permette la mise à l'échelle des données blob, cette opération doit être effectuée progressivement et en toute sécurité.

Étant donné qu’Ethereum est un code exécuté sur des milliers de nœuds indépendants qui nécessitent un accord sur les mêmes règles, nous ne pouvons pas simplement introduire des changements comme l’augmentation du nombre de blobs de la même manière que vous déployez une mise à jour de site Web. Tout changement de règle doit être une mise à niveau coordonnée où chaque nœud, client et logiciel de validation est mis à niveau avant le même bloc prédéterminé.

Ces mises à niveau coordonnées incluent généralement de nombreux changements, nécessitent de nombreux tests et prennent du temps. Afin de s'adapter plus rapidement aux besoins changeants des blobs de couche 2, les forks blob parameter only introduisent un mécanisme permettant d'augmenter les blobs sans avoir à attendre ce calendrier de mise à niveau.

Les forks blob parameter only peuvent être définis par les clients, de la même manière que d'autres configurations telles que la limite de gaz. Entre les mises à niveau majeures d'Ethereum, les clients peuvent convenir d'augmenter les blobs « target » et « max » à par exemple 9 et 12, puis les opérateurs de nœuds se mettront à jour pour participer à cette petite fourche. Ces forks blob parameter only peuvent être configurés à tout moment.

Lorsque les blobs ont été ajoutés pour la première fois au réseau dans la mise à niveau Dencun, l'objectif était de 3. Ce chiffre est passé à 6 dans Pectra et, après Fusaka, il peut maintenant être augmenté à un rythme durable, indépendamment de ces mises à niveau majeures du réseau.

![Graphique montrant le nombre moyen de blobs par bloc et l'augmentation des cibles avec les mises à niveau](./average-blob-count-per-block.webp)

Source du graphique : [Ethereum Blobs - @hildobby, Dune Analytics](https://dune.com/hildobby/blobs)

**Ressources** : [Spécification technique de l'EIP-7892](https://eips.ethereum.org/EIPS/eip-7892)

#### Frais de base du blob limités par les coûts d'exécution {#blob-base-fee-bounded-by-execution-costs}

Les couches 2 paient deux factures lorsqu'elles publient des données : les frais de blob et le gaz d'exécution nécessaire pour vérifier ces blobs. Si le gaz d'exécution domine, les frais d'enchères de blob peuvent chuter jusqu'à 1 wei et cesser d'être un signal de prix.

L'EIP-7918 fixe un prix de réserve proportionnel sous chaque blob. Lorsque la réserve est supérieure aux frais de base nominaux du blob, l'algorithme d'ajustement des frais traite le bloc comme dépassant l'objectif, arrête de faire baisser les frais et leur permet d'augmenter normalement. De ce fait :

- le marché des frais de blob réagit toujours à la congestion
- les couches 2 paient au moins une part significative du calcul qu'elles imposent aux nœuds
- les pics de frais de base sur l'EL ne peuvent plus bloquer les frais de blob à 1 wei

**Ressources** :

- [Spécification technique de l'EIP-7918](https://eips.ethereum.org/EIPS/eip-7918)
- [Explication du Storybook](https://notes.ethereum.org/@anderselowsson/AIG)

### Mise à l'échelle de la L1 {#scale-l1}

#### Expiration de l'historique et reçus simplifiés {#history-expiry}

En juillet 2025, les clients d'exécution d'Ethereum [ont commencé à prendre en charge l'expiration partielle de l'historique](https://blog.ethereum.org/2025/07/08/partial-history-exp). Cela a permis de supprimer l'historique antérieur à [La Fusion](https://ethereum.org/roadmap/merge/) afin de réduire l'espace disque requis par les opérateurs de nœuds à mesure qu'Ethereum continue de se développer.

Cet EIP se trouve dans une section distincte des « Core EIPs » car la fourche n'implémente en fait aucun changement — c'est un avis que les équipes clientes doivent prendre en charge l'expiration de l'historique avant la mise à niveau Fusaka. En pratique, les clients peuvent implémenter cela à tout moment, mais l'ajouter à la mise à niveau l'a concrètement inscrit sur leur liste de tâches et leur a permis de tester les changements de Fusaka en conjonction avec cette fonctionnalité.

**Ressources** : [Spécification technique de l'EIP-7642](https://eips.ethereum.org/EIPS/eip-7642)

#### Définir des limites supérieures pour MODEXP {#set-upper-bounds-for-modexp}

Jusqu'à présent, la précompilation MODEXP acceptait des nombres de pratiquement toutes les tailles. Cela rendait les tests difficiles, les abus faciles et risqués pour la stabilité du client. L'EIP-7823 impose une limite claire : chaque numéro d'entrée peut avoir une longueur maximale de 8192 bits (1024 octets). Tout ce qui est plus grand est rejeté, le gaz de la transaction est brûlé et aucun changement d’état ne se produit. Il couvre très confortablement les besoins du monde réel tout en supprimant les cas extrêmes qui compliquent la planification des limites de gaz et les examens de sécurité. Ce changement offre davantage de sécurité et de protection DoS sans affecter l’expérience de l’utilisateur ou du développeur.

**Ressources** : [Spécification technique de l'EIP-7823](https://eips.ethereum.org/EIPS/eip-7823)

#### Plafond de limite de gaz de transaction {#transaction-gas-limit-cap}

EIP-[7825](https://eips.ethereum.org/EIPS/eip-7825) ajoute un plafond de 16 777 216 (2^24) gaz par transaction. Il s’agit d’un renforcement proactif du DoS en limitant le coût du pire des cas de chaque transaction unique à mesure que nous augmentons la limite de gaz du bloc. Cela facilite la validation et la propagation à modéliser pour nous permettre d'aborder la mise à l'échelle en augmentant la limite de gaz.

Pourquoi exactement 2^24 gaz ? Il est confortablement plus petit que la limite de gaz actuelle, est suffisamment grand pour les déploiements de contrats réels et les précompilations lourdes, et une puissance de 2 le rend facile à mettre en œuvre sur tous les clients. Cette nouvelle taille maximale de transaction est similaire à la taille moyenne des blocs avant Pectra, ce qui en fait une limite raisonnable pour toute opération sur Ethereum.

**Ressources** : [Spécification technique de l'EIP-7825](https://eips.ethereum.org/EIPS/eip-7825)

#### Augmentation du coût en gaz de `MODEXP` {#modexp-gas-cost-increase}

MODEXP est une fonction intégrée de précompilation qui calcule l'exponentiation modulaire, un type de calcul mathématique à grands nombres utilisé dans les systèmes de vérification et de preuve de signature RSA. Il permet aux contrats d’exécuter ces calculs directement sans avoir à les mettre en œuvre eux-mêmes.

Les développeurs et les équipes clientes ont identifié MODEXP comme un obstacle majeur à l’augmentation de la limite de gaz du bloc, car le prix actuel du gaz sous-estime souvent la puissance de calcul requise par certaines entrées. Cela signifie qu'une transaction utilisant MODEXP pourrait prendre la majeure partie du temps nécessaire au traitement d'un bloc entier, ce qui ralentit le réseau.

Cet EIP modifie la tarification pour correspondre aux coûts de calcul réels en :

- augmentant le tarif minimum de 200 à 500 gaz et en supprimant la réduction d'un tiers de l'EIP-2565 sur le calcul des coûts généraux
- augmentant le coût plus fortement lorsque l'exposant d'entrée est très long. si l'exposant (le nombre « puissance » que vous passez comme deuxième argument) est plus long que 32 octets / 256 bits, la charge de gaz augmente beaucoup plus rapidement pour chaque octet supplémentaire
- charge de base large ou de module supplémentaire également. Les deux autres nombres (la base et le module) sont supposés avoir au moins 32 octets - si l'un d'eux est plus grand, le coût augmente proportionnellement à sa taille

En faisant mieux correspondre les coûts au temps de traitement réel, MODEXP ne peut plus faire en sorte qu'un bloc prenne trop de temps à valider. Ce changement est l’un des nombreux changements visant à garantir l’augmentation en toute sécurité de la limite de gaz des blocs d’Ethereum à l’avenir.

**Ressources** : [Spécification technique de l'EIP-7883](https://eips.ethereum.org/EIPS/eip-7883)

#### Limite de taille des blocs d'exécution RLP {#rlp-execution-block-size-limit}

Cela crée un plafond sur la taille maximale autorisée d'un bloc. Il s'agit d'une limite sur ce qui est _envoyé_ sur le réseau et est distincte de la limite de gaz, qui limite le _travail_ à l'intérieur d'un bloc. La taille maximale d'un bloc est de 10 Mio, avec une petite marge (2 Mio) réservée aux données de consensus pour que tout s'intègre et se propage correctement. Si un bloc est plus gros que cela, les clients le rejettent.
Ceci est nécessaire car les blocs très volumineux prennent plus de temps à se propager et à être vérifiés sur le réseau, et peuvent créer des problèmes de consensus ou être utilisés comme un vecteur d'attaque DoS. De plus, le gossip de la couche de consensus ne transmet déjà pas les blocs de plus de ~10 Mio, donc l'alignement de la couche d'exécution sur cette limite évite les situations étranges où ils sont « vus par certains, ignorés par d'autres ».

Les détails techniques : il s'agit d'un plafond sur la taille de bloc d'exécution encodée en [RLP](/developers/docs/data-structures-and-encoding/rlp/). 10 Mio au total, avec une marge de sécurité de 2 Mio réservée pour l'encadrement du bloc de balise. En pratique, les clients définissent

`MAX_BLOCK_SIZE = 10,485,760` octets et

`SAFETY_MARGIN = 2,097,152` octets,

et rejettent tout bloc d'exécution dont la charge utile RLP dépasse

`MAX_RLP_BLOCK_SIZE = MAX_BLOCK_SIZE − SAFETY_MARGIN`

L'objectif est de limiter le temps de propagation/validation dans le pire des cas et de s'aligner sur le comportement du gossip de la couche de consensus, réduisant ainsi le risque de réorganisation/DoS sans modifier la comptabilité du gaz.

**Ressources** : [Spécification technique de l'EIP-7934](https://eips.ethereum.org/EIPS/eip-7934)

#### Définir la limite de gaz par défaut à 60 millions {#set-default-gas-limit-to-60-million}

Avant d’augmenter la limite de gaz de 30 M à 36 M en février 2025 (puis à 45 M), cette valeur n’avait pas changé depuis la Fusion (septembre 2022). Ce EIP vise à faire de la mise à l’échelle cohérente une priorité.

L'EIP-7935 coordonne les équipes clientes d'EL pour augmenter la limite de gaz par défaut au-dessus des 45 M actuels pour Fusaka. Il s’agit d’un EIP informatif, mais il demande explicitement aux clients de tester des limites plus élevées sur les devnets, de converger vers une valeur sûre et d’envoyer ce nombre dans leurs versions Fusaka.

La planification Devnet cible environ 60 M de stress (blocs complets avec charge synthétique) et des structures itératives ; la recherche indique que les pathologies de taille de bloc du pire des cas ne devraient pas se lier en dessous d'environ 150 M. Le déploiement doit être associé au plafond de limite de gaz de transaction (EIP-7825) afin qu'aucune transaction unique ne puisse dominer lorsque les limites augmentent.

**Ressources** : [Spécification technique de l'EIP-7935](https://eips.ethereum.org/EIPS/eip-7935)

### Améliorer l'UX {#improve-ux}

#### Anticipation de proposant déterministe {#deterministic-proposer-lookahead}

Avec EIP-7917, la chaine Beacon sera informée des prochains proposants de blocs pour la prochaine période. Avoir une vision déterministe sur les validateurs qui proposeront les futurs blocs peut permettre des [préconfirmations](https://ethresear.ch/t/based-preconfirmations/17353) - un engagement avec le futur proposant qui garantit que la transaction de l'utilisateur sera incluse dans son bloc sans attendre le bloc réel.

Cette fonctionnalité profite aux implémentations client et à la sécurité du réseau car elle empêche les cas extrêmes dans lesquels les validateurs pourraient manipuler le calendrier du proposant. L'anticipation permet également une mise en œuvre moins complexe.

**Ressources** : [Spécification technique de l'EIP-7917](https://eips.ethereum.org/EIPS/eip-7917)

#### Code d'opération de comptage des zéros non significatifs (CLZ) {#count-leading-zeros-opcode}

Cette fonctionnalité ajoute une petite instruction EVM, **compter les zéros non significatifs (CLZ)**. Presque tout dans l'EVM est représenté par une valeur de 256 bits — ce nouvel opcode renvoie le nombre de bits nuls au début. Il s’agit d’une fonctionnalité commune à de nombreuses architectures de jeux d’instructions car elle permet des opérations arithmétiques plus efficaces. En pratique, cela réduit les analyses de bits manuelles actuelles en une seule étape, de sorte que la recherche du premier bit défini, l'analyse des octets ou l'analyse des champs de bits deviennent plus simples et moins coûteuses. L'opcode est faible, à coût fixe et a été évalué comme étant comparable à un ajout de base, qui réduit le bytecode et économise du gaz pour le même travail.

**Ressources** : [Spécification technique de l'EIP-7939](https://eips.ethereum.org/EIPS/eip-7939)

#### Précompilation pour la prise en charge de la courbe secp256r1 {#secp256r1-precompile}

Introduit un vérificateur de signature secp256r1 (P-256) de type passkey intégré à l'adresse fixe `0x100` en utilisant le même format d'appel déjà adopté par de nombreuses L2 et en corrigeant les cas limites, de sorte que les contrats écrits pour ces environnements fonctionnent sur L1 sans modifications.

Mise à niveau de l'UX ! Pour les utilisateurs, cela débloque la signature native de l'appareil et les passkeys. Les portefeuilles peuvent exploiter directement Apple Secure Enclave, Android Keystore, les modules de sécurité matériels (HSM) et FIDO2/WebAuthn - pas de phrase de récupération, une intégration plus fluide et des flux multi-facteurs qui ressemblent aux applications modernes. Cela se traduit par une meilleure UX, une récupération plus facile et des modèles d'abstraction de compte qui correspondent à ce que des milliards d'appareils font déjà.

Pour les développeurs, il prend une entrée de 160 octets et renvoie une sortie de 32 octets, ce qui facilite le portage des bibliothèques existantes et des contrats L2. Sous le capot, il inclut des vérifications de point à l'infini et de comparaison modulaire pour éliminer les cas limites délicats sans casser les appelants valides.

**Ressources** :

- [Spécification technique de l'EIP-7951](https://eips.ethereum.org/EIPS/eip-7951)
- [En savoir plus sur le RIP-7212](https://www.alchemy.com/blog/what-is-rip-7212) _(Notez que l'EIP-7951 a remplacé le RIP-7212)_

### Méta {#meta}

#### Méthode JSON-RPC `eth_config` {#eth-config}

Il s'agit d'un appel JSON-RPC qui vous permet de demander à votre nœud quels paramètres de fourche vous utilisez. Il renvoie trois instantanés : `current`, `next` et `last` afin que les validateurs et les outils de surveillance puissent vérifier que les clients sont alignés pour une fourche à venir.

En pratique, il s'agit de remédier à une lacune découverte lorsque la fourche Pectra a été mise en service sur le testnet Holesky au début de 2025 avec des erreurs de configuration mineures qui ont entraîné un état de non-finalisation. Cela aide les équipes de test et les développeurs à s'assurer que les fourches majeures se comporteront comme prévu lors du passage des devnets aux testnets, et des testnets au Mainnet.

Les instantanés incluent : `chainId`, `forkId`, l'heure d'activation de la fourche prévue, les précompilations actives, les adresses de précompilation, les dépendances des contrats système et le calendrier des blobs de la fourche.

Cet EIP se trouve dans une section distincte des « Core EIPs » car la fourche n'implémente en fait aucun changement — c'est un avis que les équipes clientes doivent implémenter cette méthode JSON-RPC avant la mise à niveau Fusaka.

**Ressources** : [Spécification technique de l'EIP-7910](https://eips.ethereum.org/EIPS/eip-7910)

## FAQ {#faq}

### Cette mise à niveau affecte-t-elle tous les nœuds et validateurs Ethereum ? {#does-this-upgrade-affect-all-ethereum-nodes-and-validators}

Oui, la mise à niveau de Fusaka nécessite des mises à jour des [clients d'exécution et des clients de consensus](/developers/docs/nodes-and-clients/). Tous les principaux clients Ethereum publieront des versions prenant en charge la hard fork, marquées comme hautement prioritaires. Vous pouvez vous tenir au courant de la date de disponibilité de ces versions dans les dépôts Github des clients, leurs [canaux Discord](https://ethstaker.org/support), le [Discord EthStaker](https://dsc.gg/ethstaker), ou en vous abonnant au blog Ethereum pour les mises à jour du protocole. Pour maintenir la synchronisation avec le réseau Ethereum après la mise à jour, les opérateurs de nœuds doivent s'assurer qu'ils utilisent une version de client prise en charge. Notez que les informations concernant les versions des clients sont tributaires du temps, et les utilisateurs doivent se référer aux dernières mises à jour pour obtenir les derniers détails.

### Comment ETH peut-il être converti après la fourche majeure ? {#how-can-eth-be-converted-after-the-hardfork}

- **Aucune action requise pour votre ETH** : Suite à la mise à niveau d'Ethereum Fusaka, il n'est pas nécessaire de convertir ou de mettre à niveau votre ETH. Vos soldes de compte resteront inchangés, et les ETH que vous détenez actuellement resteront accessibles sous leur forme actuelle après la fourche majeure.
- **Attention aux arnaques !** <Emoji text="⚠️" />**quiconque vous demandant de "mettre à niveau" vos ETH essaie de vous arnaquer.** Vous n'avez rien à faire en relation avec cette mise à niveau. Vos actifs resteront totalement inchangés. N'oubliez pas, rester informé est la meilleure défense contre les arnaques.

[En savoir plus sur comment reconnaitre et éviter les arnaques](/security/)

### Pourquoi des zèbres ? <Emoji text="🦓" /> {#whats-with-the-zebras}

Le zèbre est la mascotte choisie par les développeurs de Fusaka car ses rayures reflètent l'échantillonnage de disponibilité des données basé sur les colonnes de PeerDAS, où les nœuds conservent certains sous-réseaux de colonnes et échantillonnent quelques autres colonnes de chaque slot des pairs pour vérifier que les données de blob sont disponibles.

La Fusion en 2022 [a utilisé un panda](https://x.com/hwwonx/status/1431970802040127498) comme mascotte pour signaler l'union des couches d'exécution et de consensus. Depuis lors, des mascottes ont été choisies de manière informelle pour chaque fourche et apparaissent sous forme d'art ASCII dans les journaux du client au moment de la mise à niveau. C'est juste une façon amusante de célébrer.

### Quelles sont les améliorations incluses pour la mise à l'échelle L2 ? {#what-improvements-are-included-for-l2-scaling}

[PeerDAS](/roadmap/fusaka/peerdas) est la fonctionnalité principale de la fourche. Il met en œuvre l'échantillonnage de la disponibilité des données (DAS) qui débloque plus d'évolutivité pour les rollups, augmentant théoriquement l'espace des blobs jusqu'à 8 fois la taille actuelle. Le marché des frais de blob sera également amélioré pour réagir efficacement à la congestion et garantir que les L2 paient des frais significatifs pour le calcul et l'espace que les blobs imposent aux nœuds.

### En quoi les fourches BPO sont-elles différentes ? {#how-are-bpo-forks-different}

Les fourches à paramètre blob uniquement fournissent un mécanisme pour augmenter continuellement le nombre de blobs (cible et max) après l'activation de PeerDAS, sans avoir à attendre une mise à niveau complète coordonnée. Chaque augmentation est pré-configurée en dur dans les versions client supportant Fusaka.

En tant qu'utilisateur ou validateur, vous n'avez pas besoin de mettre à jour vos clients pour chaque BPO et devez seulement vous assurer de suivre les hardforks majeurs comme Fusaka. C'est la même pratique qu'auparavant, aucune action spéciale n'est nécessaire. Il est toujours recommandé de surveiller vos clients lors des mises à niveau et des BPO et de les maintenir à jour même entre les versions majeures, car des correctifs ou des optimisations peuvent suivre le hardfork.

### Quel est le calendrier des BPO ? {#what-is-the-bpo-schedule}

Le calendrier exact des mises à jour BPO sera déterminé avec les versions de Fusaka. Suivez les [annonces de protocole](https://blog.ethereum.org/category/protocol) et les notes de version de vos clients.

Exemple de ce à quoi cela pourrait ressembler :

- Avant Fusaka : cible 6, max 9
- À l'activation de Fusaka : cible 6, max 9
- BPO1, quelques semaines après l'activation de Fusaka : cible 10, max 15, augmentant de deux tiers
- BPO2, quelques semaines après BPO1 : cible 14, max 21

### Cela réduira-t-il les frais sur Ethereum (couche 1) {#will-this-lower-gas}

Cette mise à niveau ne réduit pas les frais de gaz sur la L1, du moins pas directement. L'accent principal est mis sur plus d'espace de blob pour les données de rollup, réduisant ainsi les frais sur la couche 2. Cela pourrait avoir des effets secondaires sur le marché des frais L1, mais aucun changement significatif n'est attendu.

### En tant que validateur, que dois-je faire pour la mise à niveau ? {#as-a-staker-what-do-i-need-to-do-for-the-upgrade}

Comme pour chaque mise à niveau du réseau, assurez-vous de mettre à jour vos clients vers les dernières versions marquées comme compatibles avec Fusaka. Suivez les mises à jour dans la liste de diffusion et les [annonces de protocole sur le blog de l'EF](https://blog.ethereum.org/category/protocol) pour être informé des nouvelles versions.
Pour valider votre configuration avant l'activation de Fusaka sur le Mainnet, vous pouvez exécuter un validateur sur les testnets. Fusaka est [activé plus tôt sur les testnets](https://blog.ethereum.org/2025/09/26/fusaka-testnet-announcement), ce qui vous donne plus de temps pour vous assurer que tout fonctionne et signaler les bogues. Les fourches de testnet sont également annoncées dans la liste de diffusion et sur le blog.

### La "Prospection Déterministe du Proposeur" (EIP-7917) affecte-t-elle les validateurs ? {#does-7917-affect-validators}

Ce changement ne modifie pas le fonctionnement de votre client validateur, cependant, il fournira plus d'informations sur l'avenir de vos tâches de validateur. Assurez-vous de mettre à jour vos outils de surveillance pour suivre les nouvelles fonctionnalités.

### Comment Fusaka affecte-t-il les exigences de bande passante pour les nœuds et les validateurs ? {#how-does-fusaka-affect-bandwidth-requirements-for-nodes-and-validators}

PeerDAS apporte un changement significatif à la manière dont les nœuds transmettent les données de blob. Toutes les données sont divisées en morceaux appelés colonnes sur 128 sous-réseaux, les nœuds ne s'abonnant qu'à certains d'entre eux. Le nombre de colonnes de sous-réseau que les nœuds doivent conserver dépend de leur configuration et du nombre de validateurs connectés. Les exigences réelles en matière de bande passante dépendront de la quantité de blobs autorisée sur le réseau et du type de nœud. Au moment de l'activation de Fusaka, l'objectif de blob reste le même qu'auparavant, mais avec PeerDAS, les opérateurs de nœuds peuvent constater une diminution de leur utilisation de disque pour les blobs et du trafic réseau. À mesure que les BPO configureront un plus grand nombre de blobs dans le réseau, la bande passante nécessaire augmentera avec chaque BPO.

Les exigences des nœuds restent dans les [marges recommandées](https://eips.ethereum.org/EIPS/eip-7870) même après les BPO de Fusaka.

#### Nœuds complets {#full-nodes}

Les nœuds réguliers sans validateurs ne s'abonneront qu'à 4 sous-réseaux, assurant la conservation de 1/8 des données d'origine. Cela signifie qu'avec la même quantité de données de blob, la bande passante du nœud pour les télécharger serait plus faible d'un facteur huit (8). L'utilisation du disque et la bande passante de téléchargement des blobs pour un nœud complet normal pourraient diminuer d'environ 80 %, à seulement quelques Mo.

#### Validateurs en solo {#solo-stakers}

Si le nœud est utilisé pour un client validateur, il doit conserver plus de colonnes et donc traiter plus de données. Avec un validateur ajouté, le nœud s'abonne à au moins 8 sous-réseaux de colonnes et traite donc deux fois plus de données qu'un nœud ordinaire, mais toujours moins qu'avant Fusaka. Si le solde du validateur est supérieur à 287 ETH, de plus en plus de sous-réseaux seront souscrits.

Pour un validateur solo, cela signifie que son utilisation de disque et sa bande passante de téléchargement diminueront d'environ 50 %. Cependant, pour construire des blocs localement et téléverser tous les blobs sur le réseau, il faut plus de bande passante de téléversement. Les constructeurs locaux auront besoin d'une bande passante de téléversement 2 à 3 fois plus élevée qu'auparavant au moment de Fusaka, et avec l'objectif BPO2 de 15/21 blobs, la bande passante de téléversement finale nécessaire devra être environ 5 fois plus élevée, à 100 Mpbs.

#### Grands validateurs {#large-validators}

Le nombre de sous-réseaux auxquels on est abonné augmente avec l'augmentation du solde et des validateurs ajoutés au nœud. Par exemple, avec un solde d'environ 800 ETH, le nœud conserve 25 colonnes et aura besoin d'environ 30 % de bande passante de téléchargement en plus qu'auparavant. La téléversement nécessaire augmente de manière similaire aux nœuds réguliers et au moins 100 Mbps sont nécessaires.

À 4096 ETH, soit 2 validateurs à solde maximal, le nœud devient un « super-nœud » qui conserve toutes les colonnes, télécharge et stocke donc tout. Ces nœuds réparent activement le réseau en y réinjectant les données manquantes, mais nécessitent également beaucoup plus de bande passante et de stockage. L'objectif final de blob étant 6 fois plus élevé qu'auparavant, les super-nœuds devront stocker environ 600 Go de données de blob supplémentaires et disposer d'une bande passante de téléchargement soutenue plus rapide, d'environ 20 Mbps.

[Lire plus de détails sur les exigences attendues.](https://ethpandaops.io/posts/fusaka-bandwidth-estimation/#theoretical-requirements)

### Quels changements sont apportés à l'EVM ? {#what-evm-changes-are-implemented}

Fusaka solidifie l'EVM avec de nouveaux changements et fonctionnalités mineurs.

- Pour la sécurité lors de la mise à l'échelle, la taille maximale d'une seule transaction sera [limitée à 16,7 millions](https://eips.ethereum.org/EIPS/eip-7825) d'unités de gaz.
- [Le nouvel opcode de comptage des zéros non significatifs (CLZ)](https://eips.ethereum.org/EIPS/eip-7939) est ajouté à l'EVM et permettra aux langages de contrats intelligents d'effectuer certaines opérations plus efficacement.
- [Le coût de la précompilation `ModExp` sera augmenté](https://eips.ethereum.org/EIPS/eip-7883) — les contrats qui l'utilisent factureront plus de gaz pour l'exécution.

### Comment la nouvelle limite de gaz de 16M affecte-t-elle les développeurs de contrats ? {#how-does-new-16m-gas-limit-affects-contract-developers}

Fusaka introduit une limite à la [taille maximale d'une seule transaction à 16,7 millions](https://eips.ethereum.org/EIPS/eip-7825) (2^24) d'unités de gaz. Cela correspond à peu près à la taille précédente d'un bloc moyen, ce qui le rend suffisamment grand pour accueillir des transactions complexes qui consommeraient un bloc entier. Cette limite crée une protection pour les clients, empêchant les attaques DoS potentielles à l'avenir avec une limite de gaz de bloc plus élevée. L'objectif de la mise à l'échelle est de permettre à plus de transactions d'entrer dans la blockchain sans qu'une seule ne consomme tout le bloc.

Les transactions d'utilisateurs réguliers sont loin d'atteindre cette limite. Certains cas limites comme les opérations DeFi importantes et complexes, les déploiements de grands contrats intelligents ou les transactions par lots ciblant plusieurs contrats pourraient être affectés par ce changement. Ces transactions devront être divisées en plus petites ou optimisées d'une autre manière. Utilisez la simulation avant de soumettre des transactions qui pourraient atteindre la limite.

La méthode RPC `eth_call` n'est pas limitée et permettra de simuler des transactions plus volumineuses que la limite réelle de la blockchain. La limite réelle pour les méthodes RPC peut être configurée par l'opérateur du client pour empêcher les abus.

### Que signifie CLZ pour les développeurs ? {#what-clz-means-for-developers}

Les compilateurs EVM comme Solidity implémenteront et utiliseront la nouvelle fonction de comptage des zéros en arrière-plan. Les nouveaux contrats pourraient bénéficier d'économies de gaz s'ils dépendent de ce type d'opération. Suivez les versions et les annonces de fonctionnalités du langage de contrat intelligent pour obtenir de la documentation sur les économies potentielles.

### Y a-t-il des changements pour mes contrats intelligents existants ? {#what-clz-means-for-developers}

Fusaka n'a aucun effet direct qui pourrait casser des contrats existants ou changer leur comportement. Les changements introduits dans la couche d'exécution sont faits avec une compatibilité ascendante, cependant, gardez toujours un œil sur les cas limites et l'impact potentiel.

[Avec l'augmentation du coût de la précompilation `ModExp`](https://eips.ethereum.org/EIPS/eip-7883), les contrats qui en dépendent consommeront plus de gaz pour l'exécution. Si votre contrat dépend fortement de cela et devient plus cher pour les utilisateurs, reconsidérez la manière dont il est utilisé.

Considérez la [nouvelle limite de 16,7 millions](https://eips.ethereum.org/EIPS/eip-7825) si les transactions exécutant vos contrats pourraient atteindre une taille similaire.

## En savoir plus {#further-reading}

- [Feuille de route d'Ethereum](/roadmap/)
- [Forkcast : Fusaka](https://forkcast.org/upgrade/fusaka)
- [Fusaka Meta EIP](https://eips.ethereum.org/EIPS/eip-7607)
- [Annonce du testnet Fusaka sur le blog](https://blog.ethereum.org/2025/09/26/fusaka-testnet-announcement)
- [Sans banque : ce que Fusaka et Pectra apporteront à Ethereum](https://www.bankless.com/read/what-fusaka-pectra-will-bring-ethereum)
- [Bankless : les prochaines mises à niveau d'Ethereum : Fusaka, Glamsterdam et au-delà avec Preston Van Loon](https://x.com/BanklessHQ/status/1956017743289020633?t=502)
- [Les Dossiers Fusaka](https://www.youtube.com/playlist?list=PL4cwHXAawZxpz-erUbKKUnnGoQNdF8s7Z)
- [PEEPanEIPs Expliqués](https://www.youtube.com/playlist?list=PL4cwHXAawZxoIenfk7OJry4rxcqX-eqBt)
