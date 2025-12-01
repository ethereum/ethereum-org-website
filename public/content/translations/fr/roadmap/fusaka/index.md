---
title: Fulu-Osaka (Fusaka)
description: En savoir plus sur la mise à niveau du protocole Fusaka
lang: fr
---

# Fusaka {#fusaka}

La mise à niveau du réseau Fusaka suit [Pectra](/roadmap/pectra/) et apporte plus de nouvelles fonctionnalités et améliore l'expérience de chaque utilisateur et développeur Ethereum. Le nom se compose de la mise à niveau de la couche d'exécution Osaka et de la version de la couche de consensus nommée d'après l'étoile Fulu. Les deux parties d'Ethereum reçoivent une mise à niveau qui repousse la mise à l'échelle, la sécurité et l'expérience utilisateur d'Ethereum vers le futur.

Cette mise à niveau est prévue pour le quatrième trimestre 2025.

<InfoBanner>
La mise à niveau de Fusaka n'est qu'une seule étape dans les objectifs de développement à long terme d'Ethereum. Apprenez-en plus sur [la feuille de route du protocole](/roadmap/) et les [mises à niveau précédentes](/history/).
</InfoBanner>

## Améliorations dans Fusaka {#improvements-in-fusaka}

### Disponibilité des données et mise à l'échelle L2 {#data-availability-and-l2-scaling}

#### PeerDAS {#peerdas}

Spécification : https://eips.ethereum.org/EIPS/eip-7594

Ressources : https://youtu.be/bONWd1x2TjQ?t=328 (dapplion sur PeerDAS)

Il s'agit de la _tête d'affiche_ de la fourche Fusaka, la principale fonctionnalité ajoutée dans cette mise à niveau. Les couches 2 publient actuellement leurs données sur Ethereum sous forme de blobs, le type de données éphémères créé spécifiquement pour les couches 2. Avant Fusaka, chaque nœud complet devait stocker chaque blob pour garantir l'existence des données. À mesure que le débit des blobs augmente, le téléchargement de toutes ces données devient extrêmement gourmand en ressources.

Avec [l'échantillonnage de disponibilité des données](https://notes.ethereum.org/@fradamt/das-fork-choice), au lieu de devoir stocker toutes les données blob, chaque nœud sera responsable d'un sous-ensemble des données blob. Les blobs sont répartis uniformément de manière aléatoire sur les nœuds du réseau, chaque nœud complet ne contenant que 1/8 des données, permettant ainsi une mise à l'échelle théorique jusqu'à 8x. Pour garantir la disponibilité des données, n'importe quelle partie des données peut être reconstruite à partir de 50 % existants de l'ensemble avec des méthodes qui réduisent la probabilité de données erronées ou manquantes à un niveau cryptographiquement négligeable (~ un sur 10²⁰ à un sur 10²⁴).

Cela permet de maintenir les exigences matérielles et de bande passante des nœuds à un niveau tenable tout en permettant la mise à l'échelle des blobs, ce qui se traduit par une plus grande évolutivité avec des frais moins élevés pour les couches 2.

In-depth : https://eprint.iacr.org/2024/1362.pdf

#### Les fourches à paramètres Blob uniquement {#blob-parameter-only-forks}

Spécification : https://eips.ethereum.org/EIPS/eip-7892

Les couches 2 font évoluer Ethereum : à mesure que leurs réseaux se développent, ils doivent publier davantage de données sur Ethereum. Cela signifie qu'Ethereum devra augmenter le nombre de blobs à sa disposition au fil du temps. Bien que PeerDAS permette la mise à l'échelle des données blob, cette opération doit être effectuée progressivement et en toute sécurité.

Étant donné qu’Ethereum est un code exécuté sur des milliers de nœuds indépendants qui nécessitent un accord sur les mêmes règles, nous ne pouvons pas simplement introduire des changements comme l’augmentation du nombre de blobs de la même manière que vous déployez une mise à jour de site Web. Tout changement de règle doit être une mise à niveau coordonnée où chaque nœud, client et logiciel de validation est mis à niveau avant le même bloc prédéterminé.

Ces mises à niveau coordonnées incluent généralement de nombreux changements, nécessitent de nombreux tests et prennent du temps. Afin de s'adapter plus rapidement aux besoins changeants des blobs de couche 2, les forks blob parameter only introduisent un mécanisme permettant d'augmenter les blobs sans avoir à attendre ce calendrier de mise à niveau.

Les forks blob parameter only peuvent être définis par les clients, de la même manière que d'autres configurations telles que la limite de gaz. Entre les mises à niveau majeures d'Ethereum, les clients peuvent convenir d'augmenter les blobs « target » et « max » à par exemple 9 et 12, puis les opérateurs de nœuds se mettront à jour pour participer à cette petite fourche. Ces forks blob parameter only peuvent être configurés à tout moment.

#### Frais de base du blob limités par les coûts d'exécution {#blob-base-fee-bounded-by-execution-costs}

Spécification : https://eips.ethereum.org/EIPS/eip-7918

Explication du storybook : https://notes.ethereum.org/@anderselowsson/AIG

Les couches 2 paient deux factures lorsqu'elles publient des données : les frais de blob et le gaz d'exécution nécessaire pour vérifier ces blobs. Si le gaz d'exécution domine, les frais d'enchères de blob peuvent chuter jusqu'à 1 wei et cesser d'être un signal de prix.

L'EIP-7918 fixe un prix de réserve proportionnel sous chaque blob. Lorsque la réserve est supérieure aux frais de base nominaux du blob, l'algorithme d'ajustement des frais traite le bloc comme dépassant l'objectif et arrête de faire baisser les frais et leur permet d'augmenter normalement. De ce fait :

- le marché des frais de blob réagit toujours à la congestion
- les couches 2 paient au moins une part significative du calcul qu'elles imposent aux nœuds
- les pics de frais de base sur l'EL ne peuvent plus bloquer les frais de blob à 1 wei

### Limites de gaz, frais et renforcement des attaques DoS {#gas-limits-fees-and-dos-hardening}

#### Définir des limites supérieures pour MODEXP {#set-upper-bounds-for-modexp}

Spécification : https://eips.ethereum.org/EIPS/eip-7823

Jusqu'à présent, la précompilation MODEXP acceptait des nombres de pratiquement toutes les tailles. Cela rendait les tests difficiles, les abus faciles et risqués pour la stabilité du client. L'EIP-7823 impose une limite claire : chaque numéro d'entrée peut avoir une longueur maximale de 8192 bits (1024 octets). Tout ce qui est plus grand est rejeté, le gaz de la transaction est brûlé et aucun changement d’état ne se produit. Il couvre très confortablement les besoins du monde réel tout en supprimant les cas extrêmes qui compliquent la planification des limites de gaz et les examens de sécurité. Ce changement offre davantage de sécurité et de protection DoS sans affecter l’expérience de l’utilisateur ou du développeur.

#### Plafond de limite de gaz de transaction {#transaction-gas-limit-cap}

Spécification : https://eips.ethereum.org/EIPS/eip-7825

EIP-[7825](https://eips.ethereum.org/EIPS/eip-7825) ajoute un plafond de 16 777 216 (2^24) gaz par transaction. Il s’agit d’un renforcement proactif du DoS en limitant le coût du pire des cas de chaque transaction unique à mesure que nous augmentons la limite de gaz du bloc. Cela facilite la validation et la propagation à modéliser pour nous permettre d'aborder la mise à l'échelle en augmentant la limite de gaz.

Pourquoi exactement 2^24 gaz ? Il est confortablement plus petit que la limite de gaz actuelle, est suffisamment grand pour les déploiements de contrats réels et les précompilations lourdes, et une puissance de 2 le rend facile à mettre en œuvre sur tous les clients. Cette nouvelle taille de transaction maximale est similaire à la taille moyenne des blocs d'avant Pectra, ce qui en fait une limite raisonnable pour toute opération sur Ethereum.

#### Augmentation du coût du gaz MODEXP {#modexp-gas-cost-increase}

Spécification : https://eips.ethereum.org/EIPS/eip-7883

MODEXP est une fonction intégrée de précompilation qui calcule l'exponentiation modulaire, un type de calcul mathématique à grands nombres utilisé dans les systèmes de vérification et de preuve de signature RSA. Il permet aux contrats d’exécuter ces calculs directement sans avoir à les mettre en œuvre eux-mêmes.

Les développeurs et les équipes clientes ont identifié MODEXP comme un obstacle majeur à l’augmentation de la limite de gaz du bloc, car le prix actuel du gaz sous-estime souvent la puissance de calcul requise par certaines entrées. Cela signifie qu'une transaction utilisant MODEXP pourrait prendre la majeure partie du temps nécessaire au traitement d'un bloc entier, ce qui ralentit le réseau.

EIP-7883 modifie la tarification pour correspondre aux coûts de calcul réels en :

- augmentant le tarif minimum de 200 à 500 gaz et en supprimant la réduction d'un tiers de l'EIP-2565 sur le calcul des coûts généraux
- augmentant le coût plus fortement lorsque l'exposant d'entrée est très long. si l'exposant (le nombre « puissance » que vous passez comme deuxième argument) est plus long que 32 octets / 256 bits, la charge de gaz augmente beaucoup plus rapidement pour chaque octet supplémentaire
- charge de base large ou de module supplémentaire également. Les deux autres nombres (la base et le module) sont supposés avoir au moins 32 octets - si l'un d'eux est plus grand, le coût augmente proportionnellement à sa taille

En faisant mieux correspondre les coûts au temps de traitement réel, MODEXP ne peut plus faire en sorte qu'un bloc prenne trop de temps à valider. Ce changement est l’un des nombreux changements visant à garantir l’augmentation en toute sécurité de la limite de gaz des blocs d’Ethereum à l’avenir.

#### Limite de taille des blocs d'exécution RLP {#rlp-execution-block-size-limit}

Spécification : https://eips.ethereum.org/EIPS/eip-7934

Ethereum ajoute une limite stricte à la taille du bloc d'exécution codé [RLP](/developers/docs/data-structures-and-encoding/rlp/) : 10 Mio au total, avec une marge de sécurité de 2 Mio réservée au cadrage du bloc balise. En pratique, les clients définissent `MAX_BLOCK_SIZE = 10 485 760` octets et `SAFETY_MARGIN = 2 097 152` octets, et rejettent tout bloc d'exécution dont la charge utile RLP dépasse `MAX_RLP_BLOCK_SIZE = MAX_BLOCK_SIZE − SAFETY_MARGIN`. L’objectif est de limiter le temps de propagation/validation du pire des cas et de s’aligner sur le comportement gossip CL (les blocs de plus de ~10 Mio ne sont pas propagés), réduisant ainsi le risque de réorganisation/DoS sans modifier la comptabilité du gaz.

#### Définir la limite de gaz par défaut à XX millions {#set-default-gas-limit-to-xx-million}

Spécification : https://eips.ethereum.org/EIPS/eip-7935

Avant d’augmenter la limite de gaz de 30 M à 36 M en février 2025 (puis à 45 M), cette valeur n’avait pas changé depuis la Fusion (septembre 2022). Ce EIP vise à faire de la mise à l’échelle cohérente une priorité.

L'EIP-7935 coordonne les équipes clientes d'EL pour augmenter la limite de gaz par défaut au-dessus des 45 M actuels pour Fusaka. Il s’agit d’un EIP informatif, mais il demande explicitement aux clients de tester des limites plus élevées sur les devnets, de converger vers une valeur sûre et d’envoyer ce nombre dans leurs versions Fusaka.

La planification Devnet cible environ 60 M de stress (blocs complets avec charge synthétique) et des structures itératives ; la recherche indique que les pathologies de taille de bloc du pire des cas ne devraient pas se lier en dessous d'environ 150 M. Le déploiement doit être associé au plafond de limite de gaz de transaction (EIP-7825) afin qu'aucune transaction unique ne puisse dominer lorsque les limites augmentent.

### Prise en charge de la pré-confirmation {#preconfirmation-support}

#### Anticipation de proposant déterministe {#deterministic-proposer-lookahead}

Spécification : https://eips.ethereum.org/EIPS/eip-7917

Avec EIP-7917, la chaine Beacon sera informée des prochains proposants de blocs pour la prochaine période. Avoir une vision déterministe sur les validateurs qui proposeront les futurs blocs peut permettre des [préconfirmations](https://ethresear.ch/t/based-preconfirmations/17353) - un engagement avec le futur proposant qui garantit que la transaction de l'utilisateur sera incluse dans son bloc sans attendre le bloc réel.

Cette fonctionnalité profite aux implémentations client et à la sécurité du réseau car elle empêche les cas extrêmes dans lesquels les validateurs pourraient manipuler le calendrier du proposant. L'anticipation permet également une mise en œuvre moins complexe.

### Opcodes et précompilations (avantages pour les développeurs) {#opcodes-and-precomliles}

#### Code d'opération de comptage des zéros non significatifs (CLZ) {#count-leading-zeros-opcode}

Spécification : https://eips.ethereum.org/EIPS/eip-7939

EIP-7939 ajoute une petite instruction EVM, CLZ (« compter les zéros non significatifs »). Étant donné une valeur de 256 bits, il renvoie le nombre de bits zéro situés à l'avant — et renvoie 256 si la valeur est entièrement nulle. Il s’agit d’une fonctionnalité commune à de nombreuses architectures de jeux d’instructions car elle permet des opérations arithmétiques plus efficaces. En pratique, cela réduit les analyses de bits manuelles actuelles en une seule étape, de sorte que la recherche du premier bit défini, l'analyse des octets ou l'analyse des champs de bits deviennent plus simples et moins coûteuses. L'opcode est faible, à coût fixe et a été évalué comme étant comparable à un ajout de base, qui réduit le bytecode et économise du gaz pour le même travail.

## Cette mise à niveau affecte-t-elle tous les nœuds et validateurs Ethereum ? {#does-this-upgrade-affect-all-ethereum-nodes-and-validators}

Oui, la mise à niveau de Fusaka nécessite des mises à jour des [clients d'exécution et des clients de consensus](/developers/docs/nodes-and-clients/). Tous les principaux clients Ethereum publieront des versions prenant en charge la hard fork, marquées comme hautement prioritaires. Vous pouvez vous tenir au courant de la date de disponibilité de ces versions dans les dépôts Github des clients, leurs [canaux Discord](https://ethstaker.org/support), le [Discord EthStaker](https://dsc.gg/ethstaker), ou en vous abonnant au blog Ethereum pour les mises à jour du protocole. Pour maintenir la synchronisation avec le réseau Ethereum après la mise à jour, les opérateurs de nœuds doivent s'assurer qu'ils utilisent une version de client prise en charge. Notez que les informations concernant les versions des clients sont tributaires du temps, et les utilisateurs doivent se référer aux dernières mises à jour pour obtenir les derniers détails.

## Comment ETH peut-il être converti après la fourche majeure ? {#how-can-eth-be-converted-after-the-hardfork}

- **Aucune action requise pour votre ETH** : Suite à la mise à niveau d'Ethereum Fusaka, il n'est pas nécessaire de convertir ou de mettre à niveau votre ETH. Vos soldes de compte resteront inchangés, et les ETH que vous détenez actuellement resteront accessibles sous leur forme actuelle après la fourche majeure.
- **Attention aux arnaques !** <Emoji text="⚠️" />**quiconque vous demandant de "mettre àniveau" vos ETH essaie de vous arnaquer.** Vous n'avez rien à faire en relation avec cette mise à niveau. Vos actifs resteront totalement inchangés. N'oubliez pas, rester informé est la meilleure défense contre les arnaques.

[En savoir plus sur comment reconnaitre et éviter les arnaques](/security/)

## En savoir plus {#further-reading}

- [Feuille de route d'Ethereum](/roadmap/)
- [Forkcast : Fusaka](https://forkcast.org/upgrade/fusaka)
- [Fusaka Meta EIP](https://eips.ethereum.org/EIPS/eip-7607)
- [Sans banque : ce que Fusaka et Pectra apporteront à Ethereum](https://www.bankless.com/read/what-fusaka-pectra-will-bring-ethereum)
- [Bankless : les prochaines mises à niveau d'Ethereum : Fusaka, Glamsterdam et au-delà avec Preston Van Loon](https://x.com/BanklessHQ/status/1956017743289020633?t=502)
