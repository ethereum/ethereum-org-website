---
title: Attestations
description: Une description des attestations sur la preuve d'enjeu Ethereum.
lang: fr
---

Un validateur doit créer, signer et diffuser une attestation à chaque période. Cette page décrit à quoi ressemblent ces attestations et comment elles sont traitées et communiquées entre les clients du consensus.

## Qu'est-ce qu'une attestation ? {#what-is-an-attestation}

Chaque [période](/glossary/#epoch) (6,4 minutes) au cours de laquelle un validateur propose une attestation au réseau. L'attestation est destinée à un créneau spécifique dans la période. Le but de l'attestation est de voter en faveur de l'approche du validateur sur la chaîne, en particulier le bloc justifié le plus récent et le premier bloc de la période actuelle (connu sous le nom de points de contrôle `source` et `cible`). Cette information est combinée pour tous les validateurs participants, permettant au réseau de parvenir à un consensus sur l'état de la blockchain.

L'attestation contient les composants suivants :

- `aggregation_bits` : une liste de validateurs bits, où la position est mappée à l'index du validateur dans leur comité ; la valeur (0/1) indique si le validateur a signé la `data` (c'est-à-dire - s’ils sont actifs et sont d’accord avec l’auteur du bloc)
- `data` : détails relatifs à l'attestation, tels que définis ci-dessous
- `signature` : une signature BLS qui regroupe les signatures des validateurs individuels

La première tâche pour un validateur attestant est de construire les `data`. Les `data` contiennent les informations suivantes :

- `slot` : Le numéro de créneau auquel l'attestation fait référence
- `index` : Un nombre qui identifie à quel comité appartient le validateur dans un créneau donné
- `beacon_block_root` : Hachage racine du bloc que le validateur voit à la tête de la chaîne (le résultat de l'application de l'algorithme de choix de fourche)
- `source` : Partie du vote de finalité indiquant ce que les validateurs voient comme le bloc justifié le plus récent
- `target` : partie du vote de finalité indiquant ce que les validateurs voient comme le premier bloc de la période actuelle

Une fois que les `data` sont construites, le validateur peut retourner le bit en `aggregation_bits` correspondant à leur propre index de validateur de 0 à 1 pour montrer qu'ils ont participé.

Enfin, le validateur signe l'attestation et la diffuse sur le réseau.

### Attestation agrégée {#aggregated-attestation}

Les frais additionnels associés au transfert de données pour chaque validateur sur le réseau sont très élevés. Ainsi, les attestations des validateurs individuels sont regroupées au sein de sous-réseaux avant d’être diffusées plus largement. Cela inclut l'agrégation des signatures afin qu'une attestation diffusée comprenne les `data` de consensus et une signature unique formée en combinant les signatures de tous les validateurs qui sont d'accord avec ces `data`. Ceci peut être vérifié en utilisant `aggregation_bits` parce que ce champ fournit l'index de chaque validateur dans leur comité (dont l'ID est fournit dans `data`) qui peut être utilisé pour faire une requête sur les signatures individuelles.

À chaque période, 16 validateurs de chaque sous-réseau sont sélectionnés pour être les `agrégateurs`. Les agrégateurs collectent toutes les attestations dont ils entendent parler sur le réseau gossip disposant de `données` équivalentes aux leurs. L'expéditeur de chaque attestation correspondante est enregistré dans les `aggregation_bits`. Les agrégateurs diffusent ensuite l'agrégat d'attestation sur le réseau plus large.

Lorsqu'un validateur est sélectionné pour proposer un bloc, il regroupe les attestations globales des sous-réseaux jusqu'au dernier emplacement du nouveau bloc.

### Cycle de vie de l'inclusion de l'attestation {#attestation-inclusion-lifecycle}

1. Génération
2. Propagation
3. Agrégation
4. Propagation
5. Inclusion

Le cycle de vie de l'attestation est décrit dans le schéma ci-dessous :

![cycle de vie des transactions](./attestation_schematic.png)

## Récompenses {#rewards}

Les validateurs sont récompensés pour avoir soumis des attestations. La récompense d'attestation dépend des indicateurs de participation (source, cible et chef), de la récompense de base et du taux de participation.

Chacun des indicateurs de participation peut être vrai ou faux, en fonction de l'attestation soumise et de son retard d'inscription.

Le meilleur scénario est celui où les trois drapeaux sont vrais, auquel cas un validateur gagnerait (par drapeau correct) :

`récompense += récompense de base * pondération de l'indicateur * niveau d'attestation de l'indicateur / 64`

Le taux d'attestation de l'indicateur est mesuré en utilisant la somme des soldes effectifs de tous les validateurs attestant pour l'indicateur donné par rapport au solde effectif actif total.

### Récompense de base {#base-reward}

La récompense de base est calculée en fonction du nombre de validateurs présentant une attestation et de leurs soldes d'éther effectivement misés :

`base reward = validator effective balance x 2^6 / SQRT(Effective balance of all active validators)`

#### Délai d'inclusion {#inclusion-delay}

Au moment où les validateurs votaient pour la tête de chaîne (`block n`), le `block n+1` n'était pas encore proposé. Par conséquent, les attestations naturellement incluses **un bloc plus tard** donc toutes les attestations qui ont voté sur `block n` étant la tête de chaîne ont été incluses dans `block n+1` et, le **délai d'inclusion** est 1. Si le délai d'inclusion double et atteint deux créneaux, la récompense de l'attestation sera réduite de moitié, parce que pour calculer la récompense de l'attestation, la récompense de base est multipliée par la réciproque du délai d'inclusion.

### Scénarios d'attestation {#attestation-scenarios}

#### Validateur de vote manquant {#missing-voting-validator}

Les validateurs ont un maximum de 1 période pour soumettre leur attestation. Si l'attestation a été manquée à la période 0, ils peuvent la soumettre avec un délai d'inclusion à la période 1.

#### Agrégateur manquant {#missing-aggregator}

Il y a 16 agrégateurs par période au total. De plus, les validateurs aléatoires s'abonnent à **deux sous-réseaux pour 256 périodes** et servent de sauvegarde au cas où des agrégateurs seraient manquants.

#### Proposant de bloc manquant {#missing-block-proposer}

Notez que, dans certains cas, un agrégateur chanceux peut aussi devenir le proposeur de blocs. Si l'attestation n'a pas été incluse parce que le proposant du bloc a disparu, le proposant du bloc suivant récupérerait l'attestation agrégée et l'inclurait dans le bloc suivant. Cependant, le **délai d'inclusion** augmentera de un.

## Complément d'information {#further-reading}

- [Attestations dans la spécification du consensus annoté de Vitalik](https://github.com/ethereum/annotated-spec/blob/master/phase0/beacon-chain.md#attestationdata)
- [Attestations dans eth2book.info](https://eth2book.info/capella/part3/containers/dependencies/#attestationdata)

_Une ressource communautaire vous a aidé ? Modifiez cette page et ajoutez-la !_
