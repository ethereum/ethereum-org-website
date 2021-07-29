---
title: Preuve d'enjeu (PoS)
description: Explication du protocole de consensus "Preuve d'enjeu" et de son rôle dans Ethereum.
lang: fr
sidebar: true
incomplete: true
---

Ethereum passe de [la preuve de travail (PoW)](/developers/docs/consensus-mechanisms/pow/) à un mécanisme de consensus appelé "preuve d'enjeu" (PoS) . Cela a toujours été prévu, car il s'agit d'un élément clé de la stratégie de la communauté pour faire évoluer Ethereum via [les mises à niveau Eth2](/eth2/). Toutefois, instituer la preuve d'enjeu constitue un grand défi technique et ce procédé n'est pas aussi simple que l'utilisation de la preuve de travail pour parvenir à un consensus sur l'ensemble du réseau.

## Prérequis {#prerequisites}

Pour mieux comprendre cette page, nous vous recommandons d'abord de lire la page [Mécanismes de consensus](/developers/docs/consensus-mechanisms/).

## Qu'est-ce que la preuve d'enjeu (PoS) ? {#what-is-pos}

La preuve d'enjeu est un type de [mécanisme de consensus](/developers/docs/consensus-mechanisms/) utilisé par les réseaux blockchain pour obtenir un consensus distribué.

Cela requiert que les utilisateurs misent leurs ETH pour devenir validateurs sur le réseau. Les validateurs sont responsables de la même chose que les mineurs dans le cadre de la [preuve de travail](/developers/docs/consensus-mechanisms/pow/) : ordonner les transactions et créer de nouveaux blocs afin que tous les nœuds puissent s'accorder sur l'état du réseau.

La preuve d'enjeu apporte un certain nombre d'améliorations au système de preuve de travail :

- Meilleure efficacité énergétique : vous n'avez pas besoin d'utiliser beaucoup d'énergie en minant des blocs.
- Réduction des barrières à l'entrée et des exigences matérielles : vous n'avez pas besoin de matériel haut de gamme pour avoir une chance de créer de nouveaux blocs.
- Plus grande immunité à la centralisation : la preuve d'enjeu devrait conduire à plus de nœuds sur le réseau.
- Prise en charge renforcée des chaînes de fragments : un progrès décisif dans la mise à niveau du réseau Ethereum.

## Preuve d'enjeu, mise et validateurs {#pos-staking-validators}

La preuve d'enjeu est le mécanisme sous-jacent qui désigne les validateurs à la réception de suffisamment de mises. Pour Ethereum, les utilisateurs devront miser 32 ETH pour devenir validateur. Les validateurs sont choisis au hasard pour créer des blocs et sont responsables de la vérification et de la validation des blocs qu'ils ne créent pas. La mise des utilisateurs est également utilisée pour encourager un bon comportement des validateurs. Par exemple, un utilisateur peut perdre une partie de sa mise s'il se déconnecte (échoue dans la validation), ou la totalité en cas de collusion.

## Comment fonctionne la preuve d'enjeu Ethereum ? {#how-does-pos-work}

Contrairement à la preuve de travail, les validateurs n'ont pas besoin d'utiliser une importante puissance de calcul car ils sont sélectionnés au hasard et ne sont pas en concurrence. Il n'est pas nécessaire qu'ils minent des blocs, ils doivent juste en créer lorsqu'ils sont choisis, et valider les blocs proposés dans le cas contraire. Cette validation est connue sous le nom d'attestation. Vous pouvez considérer qu'attester revient à dire "ce bloc me paraît correct". Les validateurs obtiennent des récompenses en proposant de nouveaux blocs et en attestant la conformité de ceux qu'ils ont vus.

Si vous attestez la conformité de blocs malveillants, vous perdez votre mise.

### La chaîne phare {#the-beacon-chain}

Lorsque Ethereum remplace la preuve de travail par une preuve d'enjeu, cela entraîne une complexité supplémentaire : les [chaînes de fragments](/eth2/shard-chains/). Ce sont des blockchains séparées qui nécessitent des validateurs pour traiter les transactions et créer de nouveaux blocs. Le projet est de disposer de 64 chaînes de fragments, qui exigent toutes une compréhension partagée de l'état du réseau. Une coordination supplémentaire est donc nécessaire, qui est prise en charge par [la chaîne phare](/eth2/beacon-chain/).

La chaîne phare reçoit des informations d'état provenant de fragments et les met à la disposition d'autres fragments afin que le réseau puisse rester synchronisé. La chaîne phare gère également les validateurs, de l'enregistrement de leur mise jusqu'à l'émission de leurs récompenses et pénalités.

Voici comment ce processus fonctionne.

### Fonctionnement de la validation {#how-does-validation-work}

Lorsque vous soumettez une transaction sur un fragment, un validateur est responsable de l'ajout de votre transaction à un bloc de fragments. Les validateurs sont choisis algorithmiquement par la chaîne phare dans le but de proposer de nouveaux blocs.

#### Attestation {#attestation}

Si un validateur n'est pas choisi pour proposer un nouveau bloc de fragments, il doit attester de la conformité de la proposition d'un autre validateur, confirmant que tout semble correct. C'est cette attestation qui est enregistrée dans la chaîne phare plutôt que la transaction elle-même.

Au moins 128 validateurs sont requis pour attester de la conformité de chaque bloc de fragments. Ce groupe de validateurs est connu sous le nom de "comité".

La comité dispose d'un délai pour proposer et valider un bloc de fragments. Ceci est connu sous le nom de "créneau (ou "slot"). Un seul bloc valide est créé par créneau. Il y a 32 créneaux dans une période (ou "epoch"). Après chaque période, le comité est dissous et reformé avec des participants différents et aléatoirement choisis. Cela permet de protéger les fragments des comités indésirables.

#### Liens croisés {#rewards-and-penalties}

Dès qu'une nouvelle proposition de bloc de fragments a suffisamment d'attestations, un "lien croisé" est créé et confirme l'inclusion du bloc, et de votre transaction, dans la chaîne phare.

Une fois le lien croisé créé, le validateur qui a proposé le bloc obtient sa récompense.

#### Finalisation {#finality}

Dans les réseaux distribués, une transaction est "finalisée" quand elle fait partie d'un bloc qui ne peut pas changer.

Pour ce faire, en preuve d'enjeu, le protocole de finalisation Casper amène les validateurs à s'accorder sur l'état d'un bloc à certains points de contrôle. Dès que 2/3 des validateurs sont d'accord, le bloc est finalisé. Les validateurs perdront la totalité de leur mise s'ils tentent de revenir en arrière par la suite via une attaque de 51 %.

Comme l'a dit Vlad Zamfir, c'est comme si un mineur participait à une attaque de 51 %, causant la combustion immédiate de son matériel minier.

## Preuve d'enjeu et sécurité {#pos-and-security}

La menace d'une [attaque de 51 %](https://www.investopedia.com/terms/1/51-attack.asp) est toujours présente en preuve d'enjeu, mais elle est encore plus risquée pour les attaquants. Pour ce faire, vous devez contrôler 51% de l'ETH mis en jeu. C'est non seulement beaucoup d'argent, mais cela provoquerait probablement aussi une baisse de la valeur de l'ETH. Il existe très peu d'intérêt à détruire la valeur d'une monnaie dans laquelle vous avez une participation majoritaire. Il existe beaucoup plus d'intérêt à maintenir la sécurité et la bonne marche du réseau.

Des minorations de mise, des éjections et d'autres sanctions coordonnées par la chaîne phare seront appliquées pour prévenir d'autres actes de comportement indésirable. Les validateurs sont également responsables du signalement de ces incidents.

## Avantages et inconvénients {#pros-and-cons}

| Avantages                                                                                                                                                                                                                                                                                                                               | Inconvénients                                                                                              |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| Miser vous permet d'exécuter plus facilement un nœud. Cela ne nécessite pas d'investissements énormes en matériel ni en énergie. Et si vous n'avez pas assez d'ETH pour miser, vous pouvez rejoindre des groupes d'enjeux (staking pools).                                                                                              | La preuve d'enjeu en est encore à ses balbutiements, et à moins fait ses preuves que la preuve de travail. |
| Le système de mise est plus décentralisé. Cela permet une participation accrue, et plus de nœuds ne signifie pas une augmentation du % de retours comme dans le minage.                                                                                                                                                                 |                                                                                                            |
| Le système de mise permet une fragmentation sécurisée. Les chaînes de fragments permettent à Ethereum de créer plusieurs blocs en même temps, ce qui augmente le débit des transactions. Fragmenter le réseau dans un système de preuve de travail réduirait simplement la puissance nécessaire pour compromettre une partie du réseau. |                                                                                                            |

## Complément d'information {#further-reading}

- [What is Proof of Stake](https://consensys.net/blog/blockchain-explained/what-is-proof-of-stake/) _ConsenSys_
- [The Beacon Chain Ethereum 2.0 explainer you need to read first](https://ethos.dev/beacon-chain/) _Ethos.dev_

## Sujets connexes {#related-topics}

- [Preuve de travail](/developers/docs/consensus-mechanisms/pow/)
