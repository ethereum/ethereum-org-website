---
title: Attestations
description: Une description des attestations sur la preuve d'enjeu d'Ethereum.
lang: fr
---

Un validateur est censé créer, signer et diffuser une attestation à chaque époque. Cette page décrit à quoi ressemblent ces attestations et comment elles sont traitées et communiquées entre les clients de consensus.

## Qu'est-ce qu'une attestation ? {#what-is-an-attestation}

À chaque [époque](/glossary/#epoch) (6,4 minutes), un validateur propose une attestation au réseau. L'attestation concerne un créneau spécifique de l'époque. Le but de l'attestation est de voter en faveur de la vision de la chaîne du validateur, en particulier le bloc justifié le plus récent et le premier bloc de l'époque actuelle (connus sous le nom de points de contrôle `source` et `target`). Ces informations sont combinées pour tous les validateurs participants, permettant au réseau d'atteindre un consensus sur l'état de la chaîne de blocs.

L'attestation contient les composants suivants :

- `aggregation_bits` : une liste de bits de validateurs où la position correspond à l'indice du validateur dans son comité ; la valeur (0/1) indique si le validateur a signé les `data` (c'est-à-dire s'il est actif et d'accord avec le proposeur de bloc)
- `data` : les détails relatifs à l'attestation, tels que définis ci-dessous
- `signature` : une signature BLS qui agrège les signatures des validateurs individuels

La première tâche d'un validateur attestant est de construire les `data`. Les `data` contiennent les informations suivantes :

- `slot` : Le numéro du créneau auquel l'attestation fait référence
- `index` : Un nombre qui identifie à quel comité le validateur appartient dans un créneau donné
- `beacon_block_root` : Le hash racine du bloc que le validateur voit en tête de la chaîne (le résultat de l'application de l'algorithme de choix de fork)
- `source` : Une partie du vote de finalité indiquant ce que les validateurs considèrent comme le bloc justifié le plus récent
- `target` : Une partie du vote de finalité indiquant ce que les validateurs considèrent comme le premier bloc de l'époque actuelle

Une fois les `data` construits, le validateur peut basculer le bit dans `aggregation_bits` correspondant à son propre indice de validateur de 0 à 1 pour montrer qu'il a participé.

Enfin, le validateur signe l'attestation et la diffuse sur le réseau.

### Attestation agrégée {#aggregated-attestation}

Il y a une surcharge importante associée à la transmission de ces données sur le réseau pour chaque validateur. Par conséquent, les attestations des validateurs individuels sont agrégées au sein de sous-réseaux avant d'être diffusées plus largement. Cela inclut l'agrégation des signatures ensemble afin qu'une attestation diffusée comprenne les `data` de consensus et une signature unique formée en combinant les signatures de tous les validateurs qui sont d'accord avec ces `data`. Cela peut être vérifié en utilisant `aggregation_bits` car cela fournit l'indice de chaque validateur dans son comité (dont l'ID est fourni dans `data`), ce qui peut être utilisé pour interroger les signatures individuelles.

À chaque époque, 16 validateurs dans chaque sous-réseau sont sélectionnés pour être les `aggregators`. Les agrégateurs collectent toutes les attestations dont ils entendent parler sur le réseau de diffusion (gossip network) qui ont des `data` équivalents aux leurs. L'expéditeur de chaque attestation correspondante est enregistré dans `aggregation_bits`. Les agrégateurs diffusent ensuite l'agrégat d'attestations au réseau plus large.

Lorsqu'un validateur est sélectionné pour être un proposeur de bloc, il regroupe les attestations agrégées des sous-réseaux jusqu'au dernier créneau dans le nouveau bloc.

### Cycle de vie de l'inclusion d'une attestation {#attestation-inclusion-lifecycle}

1. Génération
2. Propagation
3. Agrégation
4. Propagation
5. Inclusion

Le cycle de vie de l'attestation est décrit dans le schéma ci-dessous :

![attestation lifecycle](./attestation_schematic.png)

## Récompenses {#rewards}

Les validateurs reçoivent une récompense pour la soumission d'attestations. La récompense d'attestation dépend des indicateurs de participation (source, cible et tête), de la récompense de base et du taux de participation.

Chacun des indicateurs de participation peut être vrai ou faux, selon l'attestation soumise et son délai d'inclusion.

Le meilleur scénario se produit lorsque les trois indicateurs sont vrais, auquel cas un validateur gagnerait (par indicateur correct) :

`reward += base reward * flag weight * flag attesting rate / 64`

Le taux d'attestation de l'indicateur est mesuré en utilisant la somme des soldes effectifs de tous les validateurs attestant pour l'indicateur donné par rapport au solde effectif actif total.

### Récompense de base {#base-reward}

La récompense de base est calculée en fonction du nombre de validateurs attestant et de leurs soldes effectifs d'ether mis en jeu :

`base reward = validator effective balance x 2^6 / SQRT(Effective balance of all active validators)`

#### Délai d'inclusion {#inclusion-delay}

Au moment où les validateurs ont voté sur la tête de la chaîne (`block n`), `block n+1` n'avait pas encore été proposé. Par conséquent, les attestations sont naturellement incluses **un bloc plus tard**, de sorte que toutes les attestations qui ont voté pour que `block n` soit la tête de la chaîne ont été incluses dans `block n+1` et le **délai d'inclusion** est de 1. Si le délai d'inclusion double pour atteindre deux créneaux, la récompense d'attestation est réduite de moitié, car pour calculer la récompense d'attestation, la récompense de base est multipliée par l'inverse du délai d'inclusion.

### Scénarios d'attestation {#attestation-scenarios}

#### Validateur votant manquant {#missing-voting-validator}

Les validateurs ont un maximum de 1 époque pour soumettre leur attestation. Si l'attestation a été manquée à l'époque 0, ils peuvent la soumettre avec un délai d'inclusion à l'époque 1.

#### Agrégateur manquant {#missing-aggregator}

Il y a 16 agrégateurs par époque au total. De plus, des validateurs aléatoires s'abonnent à **deux sous-réseaux pendant 256 époques** et servent de secours au cas où des agrégateurs viendraient à manquer.

#### Proposeur de bloc manquant {#missing-block-proposer}

Notez que dans certains cas, un agrégateur chanceux peut également devenir le proposeur de bloc. Si l'attestation n'a pas été incluse parce que le proposeur de bloc a disparu, le proposeur de bloc suivant récupérera l'attestation agrégée et l'inclura dans le bloc suivant. Cependant, le **délai d'inclusion** augmentera de un.

## Complément d'information {#further-reading}

- [Les attestations dans les spécifications de consensus annotées de Vitalik](https://github.com/ethereum/annotated-spec/blob/master/phase0/beacon-chain.md#attestationdata)
- [Les attestations dans eth2book.info](https://eth2book.info/capella/part3/containers/dependencies/#attestationdata)

_Vous connaissez une ressource communautaire qui vous a aidé ? Modifiez cette page et ajoutez-la !_