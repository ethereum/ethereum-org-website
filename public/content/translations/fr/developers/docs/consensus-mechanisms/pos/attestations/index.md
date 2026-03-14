---
title: Attestations
description: Une description des attestations sur la preuve d'enjeu Ethereum.
lang: fr
---

Un validateur doit créer, signer et diffuser une attestation à chaque période. Cette page décrit à quoi ressemblent ces attestations et comment elles sont traitées et communiquées entre les clients du consensus.

## Qu'est-ce qu'une attestation ? {#what-is-an-attestation}

À chaque [période](/glossary/#epoch) (6,4 minutes), un validateur propose une attestation au réseau. L'attestation est destinée à un créneau spécifique dans la période. L'objectif de l'attestation est de voter en faveur de la vision qu'a le validateur de la chaîne, en particulier le bloc justifié le plus récent et le premier bloc de la période actuelle (connus sous le nom de points de contrôle `source` et `target`). Cette information est combinée pour tous les validateurs participants, permettant au réseau de parvenir à un consensus sur l'état de la blockchain.

L'attestation contient les composants suivants :

- `aggregation_bits` : une liste de bits de validateurs où la position correspond à l'index du validateur dans son comité ; la valeur (0/1) indique si le validateur a signé les `data` (c'est-à-dire, s'il est actif et d'accord avec le proposeur de bloc).
- `data` : détails relatifs à l'attestation, tels que définis ci-dessous
- `signature` : une signature BLS qui regroupe les signatures des validateurs individuels

La première tâche d'un validateur attestant est de construire les `data`. Les `data` contiennent les informations suivantes :

- `slot` : Le numéro de créneau auquel l'attestation fait référence
- `index` : Un nombre qui identifie à quel comité appartient le validateur dans un créneau donné
- `beacon_block_root` : hachage racine du bloc que le validateur voit en tête de chaîne (le résultat de l'application de l'algorithme de choix de fourche)
- `source` : partie du vote de finalité indiquant ce que les validateurs voient comme le bloc justifié le plus récent
- `target` : partie du vote de finalité indiquant ce que les validateurs voient comme le premier bloc de la période actuelle

Une fois les `data` construites, le validateur peut faire passer le bit de 0 à 1 dans `aggregation_bits`, correspondant à son propre index de validateur, pour montrer qu'il a participé.

Enfin, le validateur signe l'attestation et la diffuse sur le réseau.

### Attestation agrégée {#aggregated-attestation}

Les frais additionnels associés au transfert de données pour chaque validateur sur le réseau sont très élevés. Ainsi, les attestations des validateurs individuels sont regroupées au sein de sous-réseaux avant d’être diffusées plus largement. Cela inclut l'agrégation des signatures afin qu'une attestation diffusée comprenne les `data` de consensus et une signature unique formée en combinant les signatures de tous les validateurs qui sont d'accord avec ces `data`. Cela peut être vérifié à l'aide d'`aggregation_bits`, car ce champ fournit l'index de chaque validateur dans son comité (dont l'ID est fourni dans les `data`), qui peut être utilisé pour interroger les signatures individuelles.

À chaque période, 16 validateurs de chaque sous-réseau sont sélectionnés pour être les `agrégateurs`. Les agrégateurs collectent toutes les attestations dont ils entendent parler sur le réseau gossip qui ont des `data` équivalentes aux leurs. L'expéditeur de chaque attestation correspondante est enregistré dans les `aggregation_bits`. Les agrégateurs diffusent ensuite l'agrégat d'attestation sur le réseau plus large.

Lorsqu'un validateur est sélectionné pour proposer un bloc, il regroupe les attestations globales des sous-réseaux jusqu'au dernier emplacement du nouveau bloc.

### Cycle de vie de l'inclusion d'attestation {#attestation-inclusion-lifecycle}

1. Génération
2. Propagation
3. Agrégation
4. Propagation
5. Inclusion

Le cycle de vie de l'attestation est décrit dans le schéma ci-dessous :

![Cycle de vie de l'attestation](./attestation_schematic.png)

## Récompenses {#rewards}

Les validateurs sont récompensés pour avoir soumis des attestations. La récompense d'attestation dépend des indicateurs de participation (source, cible et chef), de la récompense de base et du taux de participation.

Chacun des indicateurs de participation peut être vrai ou faux, en fonction de l'attestation soumise et de son retard d'inscription.

Le meilleur scénario est celui où les trois drapeaux sont vrais, auquel cas un validateur gagnerait (par drapeau correct) :

`récompense += récompense de base * pondération de l'indicateur * niveau d'attestation de l'indicateur / 64`

Le taux d'attestation de l'indicateur est mesuré en utilisant la somme des soldes effectifs de tous les validateurs attestant pour l'indicateur donné par rapport au solde effectif actif total.

### Récompense de base {#base-reward}

La récompense de base est calculée en fonction du nombre de validateurs présentant une attestation et de leurs soldes d'éther effectivement misés :

`récompense de base = solde effectif du validateur x 2^6 / SQRT(solde effectif de tous les validateurs actifs)`

#### Délai d'inclusion {#inclusion-delay}

Au moment où les validateurs ont voté pour la tête de la chaîne (`bloc n`), le `bloc n+1` n'avait pas encore été proposé. Par conséquent, les attestations sont naturellement incluses **un bloc plus tard**. Ainsi, toutes les attestations qui ont voté pour que le `bloc n` soit la tête de la chaîne sont incluses dans le `bloc n+1`, et le **délai d'inclusion** est de 1. Si le délai d'inclusion double et atteint deux créneaux, la récompense de l'attestation sera réduite de moitié, parce que pour calculer la récompense de l'attestation, la récompense de base est multipliée par la réciproque du délai d'inclusion.

### Scénarios d'attestation {#attestation-scenarios}

#### Validateur votant manquant {#missing-voting-validator}

Les validateurs ont un maximum de 1 période pour soumettre leur attestation. Si l'attestation a été manquée à la période 0, ils peuvent la soumettre avec un délai d'inclusion à la période 1.

#### Agrégateur manquant {#missing-aggregator}

Il y a 16 agrégateurs par période au total. De plus, des validateurs aléatoires s'abonnent à **deux sous-réseaux pendant 256 périodes** et servent de sauvegarde au cas où des agrégateurs seraient manquants.

#### Proposeur de bloc manquant {#missing-block-proposer}

Notez que, dans certains cas, un agrégateur chanceux peut aussi devenir le proposeur de blocs. Si l'attestation n'a pas été incluse parce que le proposant du bloc a disparu, le proposant du bloc suivant récupérerait l'attestation agrégée et l'inclurait dans le bloc suivant. Cependant, le **délai d'inclusion** augmentera de un.

## En savoir plus {#further-reading}

- [Attestations dans la spécification du consensus annotée de Vitalik](https://github.com/ethereum/annotated-spec/blob/master/phase0/beacon-chain.md#attestationdata)
- [Attestations dans eth2book.info](https://eth2book.info/capella/part3/containers/dependencies/#attestationdata)

_Une ressource communautaire vous a aidé ? Modifiez cette page et ajoutez-la !_
