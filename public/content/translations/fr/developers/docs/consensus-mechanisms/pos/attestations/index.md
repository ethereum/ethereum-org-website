---
title: Attestations
description: Une description des attestations sur l'Ethereum en preuve d'enjeu.
lang: fr
---

Il est attendu d'un validateur qu'il crée, signe et diffuse une attestation à chaque époque. Cette page décrit à quoi ressemblent ces attestations et comment elles sont traitées et communiquées entre les clients de consensus.

## Qu'est-ce qu'une attestation ? {#what-is-an-attestation}

À chaque [époque](/glossary/#epoch) (6,4 minutes), un validateur diffuse une attestation sur le réseau. L'attestation concerne un créneau spécifique de l'époque. Le but de l'attestation est de voter en faveur de la vision de la chaîne du validateur, en particulier la tête de la chaîne, le point de contrôle justifié le plus récent et le point de contrôle au début de l'époque actuelle (connus sous le nom de points de contrôle `source` et `target`). Ces informations sont combinées pour tous les validateurs participants, permettant au réseau d'atteindre un consensus sur l'état de la chaîne de blocs.

Depuis la mise à jour [Pectra](/roadmap/pectra/) ([EIP-7549](https://eips.ethereum.org/EIPS/eip-7549)), une attestation provenant d'un seul validateur et une attestation agrégée ont des formats différents. L'attestation d'un seul validateur contient :

- `committee_index` : le comité auquel le validateur appartient dans le créneau donné
- `attester_index` : l'indice du validateur
- `data` : les détails relatifs à l'attestation, tels que définis ci-dessous
- `signature` : la signature BLS du validateur sur les `data`

La première tâche pour un validateur attestant est de construire les `data`. Les `data` contiennent les informations suivantes :

- `slot` : Le numéro du créneau auquel l'attestation fait référence
- `index` : Défini sur `0` depuis Pectra. Le comité est identifié en dehors des `data` (par `committee_index`, ou par `committee_bits` dans un agrégat) afin que les votes de différents comités aient des `data` identiques et puissent être agrégés ensemble. Avant Pectra, ce champ identifiait le comité
- `beacon_block_root` : Le hash racine du bloc que le validateur voit à la tête de la chaîne (le résultat de l'application de l'algorithme de choix de fourche)
- `source` : Une partie du vote de finalité indiquant ce que les validateurs voient comme le point de contrôle justifié le plus récent
- `target` : Une partie du vote de finalité indiquant ce que les validateurs voient comme le point de contrôle au début de l'époque actuelle (le bloc à son premier créneau, ou le dernier bloc avant celui-ci si ce créneau est vide)

Une fois les `data` construits, le validateur les signe et diffuse l'attestation sur le [sous-réseau](#aggregated-attestation) de son comité.

### Attestation agrégée {#aggregated-attestation}

Il y a une surcharge importante associée à la transmission de ces données sur le réseau pour chaque validateur. Par conséquent, les attestations des validateurs individuels sont agrégées au sein des sous-réseaux avant d'être diffusées plus largement. Cela inclut l'agrégation des signatures ensemble afin qu'une attestation diffusée comprenne les `data` de consensus et une signature unique formée en combinant les signatures de tous les validateurs qui sont d'accord avec ces `data`. Une attestation agrégée contient :

- `aggregation_bits` : une liste de bits avec un bit par membre de chaque comité inclus, où la position correspond à la position du validateur dans son comité ; la valeur (0/1) indique si la signature de ce validateur est incluse
- `data` : les données d'attestation que chaque validateur inclus a signées
- `signature` : une signature BLS qui agrège les signatures des validateurs inclus
- `committee_bits` : les membres des comités qui sont couverts par `aggregation_bits`

N'importe qui peut vérifier la signature agrégée par rapport aux clés publiques combinées des validateurs dont les bits sont définis.

Dans chaque créneau, environ 16 membres de chaque comité sont sélectionnés pour être ses `aggregators` (`TARGET_AGGREGATORS_PER_COMMITTEE`). Un validateur apprend s'il a été sélectionné à partir de sa propre signature sur le numéro de créneau. Les agrégateurs collectent toutes les attestations qu'ils entendent sur le sous-réseau de leur comité qui ont les mêmes `data` que les leurs, et les combinent, en enregistrant l'expéditeur de chacune dans la `aggregation_bits`. Les agrégateurs diffusent ensuite l'agrégat sur le réseau plus large.

Lorsqu'un validateur est sélectionné pour être un proposeur de bloc, il inclut les attestations agrégées des créneaux récents dans le nouveau bloc. Depuis Pectra, le proposant peut fusionner des agrégats de différents comités qui partagent les mêmes `data` en une seule attestation, et un bloc peut en contenir jusqu'à 8.

### Cycle de vie de l'inclusion d'une attestation {#attestation-inclusion-lifecycle}

1. Génération
2. Propagation
3. Agrégation
4. Propagation
5. Inclusion

Le cycle de vie de l'attestation est décrit dans le schéma ci-dessous :

<AttestationsDiagram />

## Récompenses {#rewards}

Les validateurs sont récompensés pour la soumission d'attestations. La récompense d'attestation dépend des indicateurs de participation (source, cible et tête), de la récompense de base et du taux de participation.

Chacun des indicateurs de participation peut être vrai ou faux, selon l'attestation soumise et son délai d'inclusion.

Le meilleur scénario se produit lorsque les trois indicateurs sont vrais, auquel cas un validateur gagnerait (par indicateur correct) :

`reward += base reward * flag weight * flag attesting rate / 64`

Le taux d'attestation de l'indicateur est mesuré en utilisant la somme des soldes effectifs de tous les validateurs attestant pour l'indicateur donné par rapport au solde effectif actif total.

### Récompense de base {#base-reward}

La récompense de base est calculée en fonction du nombre de validateurs attestant et de leurs soldes effectifs d'ether mis en jeu :

`base reward = validator effective balance x 2^6 / SQRT(Effective balance of all active validators)`

#### Délai d'inclusion {#inclusion-delay}

Au moment où les validateurs ont voté sur la tête de la chaîne (`block n`), `block n+1` n'avait pas encore été proposé. Par conséquent, les attestations sont naturellement incluses **un bloc plus tard**, de sorte que toutes les attestations qui ont voté pour que `block n` soit la tête de la chaîne ont été incluses dans `block n+1` et le **délai d'inclusion** est de 1. Le délai d'inclusion décide quels indicateurs de participation une attestation gagne :

- `head` : uniquement si le délai d'inclusion est exactement de 1 créneau
- `source` : si le délai d'inclusion est d'au plus 5 créneaux (la racine carrée entière des 32 créneaux d'une époque)
- `target` : chaque fois que l'attestation est incluse (depuis la mise à jour Deneb, [EIP-7045](https://eips.ethereum.org/EIPS/eip-7045))

Ainsi, une attestation incluse avec deux créneaux de retard perd sa récompense de tête mais gagne toujours les récompenses de source et de cible.

### Scénarios d'attestation {#attestation-scenarios}

#### Validateur votant manquant {#missing-voting-validator}

Une attestation peut être incluse dans n'importe quel bloc à partir du créneau suivant sa création jusqu'à la fin de l'époque suivante. Si une attestation de l'époque 0 n'est pas incluse dans un bloc pendant l'époque 0, elle peut toujours être incluse dans l'époque 1, avec un délai d'inclusion plus long.

#### Agrégateur manquant {#missing-aggregator}

Chaque comité vise environ 16 agrégateurs dans chaque créneau, de sorte qu'un agrégateur manquant empêche rarement les attestations d'un comité d'être agrégées. Séparément, chaque nœud balise reste abonné à **deux sous-réseaux pendant 256 époques** à la fois, choisis à partir de son ID de nœud, ce qui maintient chaque sous-réseau bien connecté.

#### Proposeur de bloc manquant {#missing-block-proposer}

Notez que dans certains cas, un agrégateur chanceux peut également devenir le proposeur de bloc. Si l'attestation n'a pas été incluse parce que le proposeur de bloc a disparu, le proposeur de bloc suivant récupérera l'attestation agrégée et l'inclura dans le bloc suivant. Cependant, le **délai d'inclusion** augmentera de un.

## Complément d'information {#further-reading}

- [Les attestations dans les spécifications de consensus annotées par Vitalik](https://github.com/ethereum/annotated-spec/blob/master/phase0/beacon-chain.md#attestationdata)
- [Les attestations dans eth2book.info](https://eth2book.info/capella/part3/containers/dependencies/#attestationdata)
- [Les attestations dans les spécifications de consensus Electra](https://github.com/ethereum/consensus-specs/blob/master/specs/electra/beacon-chain.md#attestation)

_Vous connaissez une ressource communautaire qui vous a aidé ? Modifiez cette page et ajoutez-la !_
