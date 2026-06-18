---
title: Proposition de bloc
description: Explication de la façon dont les blocs sont proposés dans la preuve d'enjeu d'Ethereum.
lang: fr
---

Les blocs sont les unités fondamentales de la chaîne de blocs. Les blocs sont des unités discrètes d'informations qui sont transmises entre les nœuds, convenues et ajoutées à la base de données de chaque nœud. Cette page explique comment ils sont produits.

## Prérequis {#prerequisites}

La proposition de bloc fait partie du protocole de preuve d'enjeu. Pour vous aider à comprendre cette page, nous vous recommandons de lire sur la [preuve d'enjeu](/developers/docs/consensus-mechanisms/pos/) et l'[architecture des blocs](/developers/docs/blocks/).

## Qui produit les blocs ? {#who-produces-blocks}

Les comptes de validateur proposent des blocs. Les comptes de validateur sont gérés par des opérateurs de nœuds qui exécutent un logiciel de validateur dans le cadre de leurs clients d'exécution et de consensus et qui ont déposé au moins 32 ETH dans le contrat de dépôt. Cependant, chaque validateur n'est qu'occasionnellement responsable de la proposition d'un bloc. [Ethereum](/) mesure le temps en créneaux et en époques. Chaque créneau dure douze secondes, et 32 créneaux (6,4 minutes) constituent une époque. Chaque créneau est une opportunité d'ajouter un nouveau bloc sur Ethereum.

### Sélection aléatoire {#random-selection}

Un seul validateur est choisi de manière pseudo-aléatoire pour proposer un bloc dans chaque créneau. Il n'y a pas de véritable caractère aléatoire dans une chaîne de blocs, car si chaque nœud générait des nombres véritablement aléatoires, ils ne pourraient pas parvenir à un consensus. L'objectif est plutôt de rendre le processus de sélection des validateurs imprévisible. Le caractère aléatoire est obtenu sur Ethereum à l'aide d'un algorithme appelé RANDAO qui mélange un hash du proposeur de bloc avec une graine qui est mise à jour à chaque bloc. Cette valeur est utilisée pour sélectionner un validateur spécifique parmi l'ensemble total des validateurs. La sélection des validateurs est fixée deux époques à l'avance afin de se protéger contre certains types de manipulation de la graine.

Bien que les validateurs ajoutent au RANDAO à chaque créneau, la valeur globale du RANDAO n'est mise à jour qu'une fois par époque. Pour calculer l'indice du prochain proposeur de bloc, la valeur du RANDAO est mélangée avec le numéro du créneau pour donner une valeur unique à chaque créneau. La probabilité qu'un validateur individuel soit sélectionné n'est pas simplement `1/N` (où `N` = total des validateurs actifs). Au lieu de cela, elle est pondérée par le solde effectif en ETH de chaque validateur. Le solde effectif maximum est de 32 ETH (cela signifie que `balance < 32 ETH` conduit à un poids inférieur à `balance == 32 ETH`, mais `balance > 32 ETH` ne conduit pas à une pondération supérieure à `balance == 32 ETH`).

Un seul proposeur de bloc est sélectionné dans chaque créneau. Dans des conditions normales, un seul producteur de bloc crée et publie un seul bloc dans son créneau dédié. Créer deux blocs pour le même créneau est une infraction passible de réduction, souvent connue sous le nom d'« équivoque ».

## Comment le bloc est-il créé ? {#how-is-a-block-created}

Le proposeur de bloc est censé diffuser un bloc phare signé qui s'appuie sur la tête la plus récente de la chaîne selon la vue de son propre algorithme de choix de fourche exécuté localement. L'algorithme de choix de fourche applique toutes les attestations en file d'attente restantes du créneau précédent, puis trouve le bloc avec le plus grand poids cumulé d'attestations dans son historique. Ce bloc est le parent du nouveau bloc créé par le proposant.

Le proposeur de bloc crée un bloc en collectant des données à partir de sa propre base de données locale et de sa vue de la chaîne. Le contenu du bloc est présenté dans l'extrait ci-dessous :

```rust
class BeaconBlockBody(Container):
    randao_reveal: BLSSignature
    eth1_data: Eth1Data
    graffiti: Bytes32
    proposer_slashings: List[ProposerSlashing, MAX_PROPOSER_SLASHINGS]
    attester_slashings: List[AttesterSlashing, MAX_ATTESTER_SLASHINGS]
    attestations: List[Attestation, MAX_ATTESTATIONS]
    deposits: List[Deposit, MAX_DEPOSITS]
    voluntary_exits: List[SignedVoluntaryExit, MAX_VOLUNTARY_EXITS]
    sync_aggregate: SyncAggregate
    execution_payload: ExecutionPayload
```

Le champ `randao_reveal` prend une valeur aléatoire vérifiable que le proposeur de bloc crée en signant le numéro de l'époque actuelle. `eth1_data` est un vote pour la vue du proposeur de bloc sur le contrat de dépôt, y compris la racine du trie de Merkle des dépôts et le nombre total de dépôts qui permettent de vérifier les nouveaux dépôts. `graffiti` est un champ facultatif qui peut être utilisé pour ajouter un message au bloc. `proposer_slashings` et `attester_slashings` sont des champs qui contiennent la preuve que certains validateurs ont commis des infractions passibles de réduction selon la vue de la chaîne du proposant. `deposits` est une liste de nouveaux dépôts de validateurs dont le proposeur de bloc a connaissance, et `voluntary_exits` est une liste de validateurs qui souhaitent effectuer une sortie dont le proposeur de bloc a entendu parler sur le réseau de diffusion de la couche de consensus. Le `sync_aggregate` est un vecteur indiquant quels validateurs ont été précédemment assignés à un comité de synchronisation (un sous-ensemble de validateurs qui servent des données de client léger) et ont participé à la signature des données.

Le `execution_payload` permet de transmettre des informations sur les transactions entre les clients d'exécution et de consensus. Le `execution_payload` est un bloc de données d'exécution qui est imbriqué à l'intérieur d'un bloc phare. Les champs à l'intérieur du `execution_payload` reflètent la structure de bloc décrite dans le livre jaune d'Ethereum, à l'exception du fait qu'il n'y a pas d'ommers et que `prev_randao` existe à la place de `difficulty`. Le client d'exécution a accès à un pool local de transactions dont il a entendu parler sur son propre réseau de diffusion. Ces transactions sont exécutées localement pour générer un trie d'état mis à jour connu sous le nom de post-état. Les transactions sont incluses dans le `execution_payload` sous forme de liste appelée `transactions` et le post-état est fourni dans le champ `state-root`.

Toutes ces données sont collectées dans un bloc phare, signées et diffusées aux pairs du proposeur de bloc, qui les propagent à leurs pairs, etc.

En savoir plus sur l'[anatomie des blocs](/developers/docs/blocks).

## Qu'arrive-t-il au bloc ? {#what-happens-to-blocks}

Le bloc est ajouté à la base de données locale du proposeur de bloc et diffusé aux pairs sur le réseau de diffusion de la couche de consensus. Lorsqu'un validateur reçoit le bloc, il vérifie les données qu'il contient, notamment en s'assurant que le bloc a le bon parent, correspond au bon créneau, que l'indice du proposant est celui attendu, que la révélation RANDAO est valide et que le proposant n'a pas subi de réduction. Le `execution_payload` est dégroupé, et le client d'exécution du validateur réexécute les transactions de la liste pour vérifier le changement d'état proposé. En supposant que le bloc passe toutes ces vérifications, chaque validateur ajoute le bloc à sa propre chaîne canonique. Le processus recommence ensuite au créneau suivant.

## Récompenses de bloc {#block-rewards}

Le proposeur de bloc reçoit un paiement pour son travail. Il y a une `base_reward` calculée en fonction du nombre de validateurs actifs et de leurs soldes effectifs. Le proposeur de bloc reçoit ensuite une fraction de la `base_reward` pour chaque attestation valide incluse dans le bloc ; plus il y a de validateurs qui attestent le bloc, plus la récompense du proposeur de bloc est importante. Il y a également une récompense pour le signalement des validateurs qui devraient subir une réduction, égale à `1/512 * effective balance` pour chaque validateur sanctionné.

[En savoir plus sur les récompenses et les pénalités](/developers/docs/consensus-mechanisms/pos/rewards-and-penalties)

## Complément d'information {#further-reading}

- [Introduction aux blocs](/developers/docs/blocks/)
- [Introduction à la preuve d'enjeu](/developers/docs/consensus-mechanisms/pos/)
- [Spécifications du consensus Ethereum](https://github.com/ethereum/consensus-specs)
- [Introduction à Gasper](/developers/docs/consensus-mechanisms/pos/gasper/)
- [Mise à niveau d'Ethereum](https://eth2book.info/)