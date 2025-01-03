---
title: Proposition de bloc
description: Comment les blocs sont proposés en preuve d'enjeu sur Ethereum.
lang: fr
---

Les blocs sont les unités de base de la blockchain. Ce sont des paquets d'informations distincts qui sont transmis entre les nœuds, acceptés puis ajoutée à la base de données de chaque nœud. Cette page explique comment ils sont construits.

## Prérequis {#prerequisites}

La proposition de blocs fait partie du protocole de preuve d'enjeu. Pour mieux comprendre cette page, nous vous recommandons de lire celle sur la [preuve d'enjeu](/developers/docs/consensus-mechanisms/pos/) et [l'architecture des blocs](/developers/docs/blocks/).

## Qui produit les blocs ? {#who-produces-blocks}

Les comptes de validateurs proposent les blocs. Les validateurs sont gérés par des opérateurs de nœuds qui exécutent un logiciel de validation avec leurs clients d'exécution et de consensus, et qui ont déposé au moins 32 ETH dans le contrat de dépôt. Cependant, chaque validateur est occasionnellement responsable de la proposition d'un bloc. Ethereum mesure le temps en créneaux et en périodes. Chaque créneau dure douze secondes, et 32 créneaux (6,4 minutes) forment une période. Chaque créneau est une occasion d'ajouter un nouveau bloc sur Ethereum.

### Sélection aléatoire {#random-selection}

Un seul validateur est choisi de manière pseudo-aléatoire pour proposer un bloc à chaque créneau. Il n'existe pas de véritable aléa dans une blockchain, car si chaque nœud générait des nombres véritablement aléatoires, ils ne pourraient pas parvenir à atteindre un consensus. Au lieu de cela, l'objectif est de rendre le processus de sélection des validateurs imprévisible. Le pseudo-aléa est réalisé sur Ethereum à l'aide d'un algorithme appelé RANDAO, qui mélange un hachage du validateur qui propose le bloc avec une graine qui est mise à jour à chaque bloc. Cette valeur est utilisée pour sélectionner un validateur spécifique parmi l'ensemble des validateurs. La sélection des validateurs est fixée deux périodes à l'avance afin de se protéger contre certains types de manipulation de la graine utilisée.

Bien que les validateurs ajoutent des données à RANDAO à chaque créneau, la valeur globale de RANDAO est mise à jour une seule fois par période. Pour calculer l'indice du prochain validateur choisi, la valeur de RANDAO est mélangée avec le numéro du créneau pour donner une valeur unique à chaque créneau. La probabilité qu'un validateur individuel soit sélectionné n'est pas simplement de `1/N` (où `N` = total des validateurs actifs). Elle est plutôt pondérée par le solde effectif d'ETH de chaque validateur. Le solde ETH effectif maximal est de 32 ETH (cela signifie que le `solde < 32 ETH` conduit à un poids inférieur par rapport à un `solde == 32 ETH`, mais un `solde > 32 ETH` ne conduit pas à un poids supérieur au `solde == 32 ETH`).

Un seul validateur est sélectionné à chaque créneau pour proposer un bloc. Dans des conditions normales, un seul producteur de bloc crée et publie un unique bloc dans son créneau dédié. Créer deux blocs pour le même créneau est une infraction passible de sanction, souvent appelée « équivoque ».

## Comment le bloc est-il créé ? {#how-is-a-block-created}

Le proposeur de bloc est censé diffuser un bloc phare signé qui s'appuie sur la tête de la chaîne la plus récente selon son propre algorithme de choix de fourche exécuté localement. L'algorithme de choix entre les possibles fourches regroupe toutes les attestations restantes du créneau précédent en une file d'attente, puis trouve le bloc avec le plus grand poids cumulé d'attestations dans son historique. Ce bloc est le parent du nouveau bloc créé par le proposeur.

Le proposeur du bloc crée un bloc en collectant des données de sa base de données locale et de son point de vue de la chaîne. Le contenu du bloc est présenté dans l'extrait ci-dessous :

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

Le champ `randao_reveal` prend une valeur aléatoire vérifiable que le validateur de bloc crée en signant le numéro de la période actuelle. `eth1_data` est un vote du point de vue du proposeur du bloc sur l'état du contrat de dépôt, incluant la racine de l'arbre Merkle des dépôts et le nombre total de dépôts, permettant ainsi de vérifier de nouveaux dépôts. `graffiti` est un champ facultatif qui peut être utilisé pour ajouter un message au bloc. `proposer_slashings` et `attester_slashings` sont des champs qui contiennent la preuve que certains validateurs ont commis des infractions pouvant être sanctionnées selon la vue du proposeur sur l'état de la chaîne. `deposits` est une liste de nouveaux dépôts de validateurs dont le proposeur de ce bloc a connaissance, et `voluntary_exits` est une liste de validateurs souhaitant quitter le réseau, dont le proposeur de bloc a reçu le message via le réseau de diffusion de la couche de consensus. Le `sync_aggregate` est un vecteur montrant quels validateurs ont été précédemment affectés à un comité de synchronisation (un sous-ensemble de validateurs servant à fournir des données aux clients légers) et ont participé à la signature de données.

L'`exécution_payload` permet aux informations des transactions d'être transmises entre les clients d'exécution et de consensus. L'`execution_payload` est un bloc de données d'exécution qui est imbriqué à l'intérieur d'un bloc phare. Les champs à l'intérieur de l'`execution_payload` reflètent la structure du bloc telle qu'indiquée dans le Livre jaune d'Ethereum, à l'exception qu'il n'y a pas de blocs oncles et que `prev_randao` remplace `difficulty`. Le client d'exécution a accès à un pool local de transactions qu'il a reçues sur son propre réseau de diffusion d'informations. Ces transactions sont exécutées localement pour générer un état mis à jour connu sous le nom d'état final. Les transactions sont incluses dans l'`execution_payload` en tant que liste appelée `transactions` et l'état final est inscrit dans le champ `state-root`.

Toutes ces données sont collectées dans un bloc phare, signées, puis diffusées aux pairs du proposeur de bloc, qui les propagent à leurs propres pairs, et ainsi de suite.

En savoir plus sur [l'anatomie des blocs](/developers/docs/blocks).

## Qu'arrive-t-il au block ? {#what-happens-to-blocks}

Le bloc est ajouté à la base de données locale du proposeur de bloc puis diffusé aux pairs via le réseau de communication de la couche de consensus. Lorsqu'un validateur reçoit le bloc, il vérifie les données qu'il contient, notamment en vérifiant que le bloc a le bon bloc parent, correspond au créneau actuel, que l'index du proposeur est bien celui attendu, que RANDAO est valide et enfin que le proposeur n'a pas été sanctionné. L'`exécution_payload` est décompressé, et le client d'exécution du validateur exécute à nouveau toutes les transactions de la liste pour vérifier le changement d'état proposé. Si le bloc passe toutes ces vérifications, chaque validateur ajoute le bloc à sa propre chaîne canonique. Le processus recommence ensuite lors du créneau suivant.

## Récompenses du bloc {#block-rewards}

Le proposeur de bloc reçoit une rémunération pour son travail. Il y a `base_reward`, une récompense de base calculée en fonction du nombre de validateurs actifs et de leurs soldes effectifs. Ensuite, le validateur reçoit une fraction de la récompense de base (`base_reward`) pour chaque attestation valide incluse dans le bloc ; plus il y a de validateurs qui attestent le bloc, plus grande est la récompense pour le proposeur de bloc. Il y a également une récompense pour les validateurs signalant des infractions passibles de sanction, égale à `1/512 * effective balance` pour chaque validateur sanctionné.

[Plus d'informations sur les récompenses et sanctions](/developers/docs/consensus-mechanisms/pos/rewards-and-penalties)

## Complément d'information {#further-reading}

- [Introduction aux blocs](/developers/docs/blocks/)
- [Introduction à la preuve d'enjeu](/developers/docs/consensus-mechanisms/pos/)
- [Spécifications de consensus Ethereum](https://github.com/ethereum/consensus-specs)
- [Introduction à Gasper](/developers/docs/consensus-mechanisms/pos/)
- [Mise à jour d'Ethereum](https://eth2book.info/)
