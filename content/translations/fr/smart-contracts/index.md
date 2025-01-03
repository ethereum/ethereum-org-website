---
title: Contrats intelligents
description: Une introduction non technique aux contrats intelligents
lang: fr
---

# Introduction aux contrats intelligents {#introduction-to-smart-contracts}

Les contrats intelligents sont les éléments fondamentaux de la couche applicative d'Ethereum. Il s'agit de programmes informatiques stockés sur la [blockchain](/glossary/#blockchain) qui suivent la logique « si ceci alors cela » et sont garantis de s'exécuter selon les règles définies par leur code, qui ne peut être modifié une fois créé.

L'expression « contrat intelligent » a été utilisée en premier par Nick Szabo. En 1994, il a écrit [une introduction au concept](https://www.fon.hum.uva.nl/rob/Courses/InformationInSpeech/CDROM/Literature/LOTwinterschool2006/szabo.best.vwh.net/smart.contracts.html), et en 1996 il a écrit [une exploration de ce que les contrats intelligents pourraient faire](https://www.fon.hum.uva.nl/rob/Courses/InformationInSpeech/CDROM/Literature/LOTwinterschool2006/szabo.best.vwh.net/smart_contracts_2.html).

Szabo a imaginé un marché numérique où des processus automatiques et [cryptographiquement sécurisés](/glossary/#cryptography) permettent aux transactions et aux fonctions commerciales de se dérouler sans intermédiaires de confiance. Les contrats intelligents Ethereum concrétisent cette vision.

Regardez Finematics expliquer les contrats intelligents :

<YouTube id="pWGLtjG-F5c" />

## La confiance dans les contrats conventionnels {#trust-and-contracts}

L'un des problèmes majeurs d'un contrat classique est la nécessité que des personnes de confiance assurent le suivi des résultats du contrat.

En voici un exemple :

Alice et Bob font une course de vélo. Imaginons qu'Alice parie 10 € avec Bob qu'elle gagnera la course. Bob est sûr de gagner et accepte le pari. Finalement, Alice devance largement Bob et gagne de façon incontestable la course. Mais Bob refuse de payer le pari, prétendant qu'Alice a dû tricher.

Cet exemple ridicule illustre le problème de tout accord non intelligent. Même si les conditions de l'accord sont remplies (ex. vous avez gagné la course), vous devez toujours faire confiance à une autre personne pour qu'elle respecte l'accord (ex. payer le pari).

## Distributeur automatique numérique {#vending-machine}

Nous pouvons comparer simplement un contrat intelligent à un distributeur automatique, qui fonctionne de manière assez similaire à un contrat intelligent ; des intrants spécifiques qui garantissent des résultats prédéterminés.

- Vous choisissez un produit
- Le distributeur automatique affiche le prix
- Vous payez le prix
- Le distributeur automatique vérifie que vous avez payé le bon montant
- Le distributeur automatique vous remet votre article

Le distributeur automatique ne distribuera le produit choisi que si toutes les conditions sont remplies. Si vous ne sélectionnez pas un produit ou que vous n'insérez pas le montant suffisant, le distributeur automatique ne distribuera pas le produit.

## Exécution automatique {#automation}

Le principal avantage d'un contrat intelligent est qu'il exécute de manière déterministe un code non ambigu lorsque certaines conditions sont remplies. Il n'est pas nécessaire d'attendre qu'un humain interprète ou négocie le résultat. Il n'est donc plus nécessaire de recourir à des intermédiaires de confiance.

Par exemple, vous pouvez rédiger un contrat intelligent qui détient des fonds en fiducie pour un enfant, autorisant celui-ci à retirer des fonds seulement à partir d'une date précise. S'il essaie de se retirer avant cette date, le contrat intelligent ne s'exécutera pas. Vous pouvez également rédiger un contrat qui vous fournit automatiquement une version numérique du titre de propriété d'une voiture lorsque vous payez le concessionnaire.

## Résultats prévisibles {#predictability}

Les contrats traditionnels sont ambigus parce qu'ils dépendent de l'homme pour leur interprétation et leur mise en œuvre. Par exemple, deux juges peuvent interpréter un contrat différemment, ce qui peut conduire à des décisions incohérentes et à des résultats inégaux. Les contrats intelligents éliminent cette possibilité. En effet, les contrats intelligents s'exécutent précisément en fonction des conditions écrites dans le code du contrat. Cette précision signifie que, dans les mêmes circonstances, le contrat intelligent produit le même résultat.

## Enregistrement public {#public-record}

Les contrats intelligents sont utiles pour les audits et le suivi. Comme les contrats intelligents Ethereum sont sur une blockchain publique, tout le monde peut suivre instantanément les transferts d'actifs ainsi que toute autre information connexe. Vous pouvez par exemple vérifier si quelqu'un a envoyé de l'argent à votre adresse.

## Protection de la vie privée {#privacy-protection}

Les contrats intelligents protègent également votre vie privée. Ethereum étant un réseau pseudonyme (vos transactions sont liées publiquement à une adresse cryptographique unique, et non à votre identité), vous pouvez protéger votre vie privée.

## Transparence des conditions {#visible-terms}

Enfin, comme pour les contrats traditionnels, vous pouvez vérifier le contenu d'un contrat intelligent avant de le signer (ou d'interagir avec). La transparence d'un contrat intelligent garantit que tout le monde peut l'examiner.

## Cas d'utilisation des contrats intelligents {#use-cases}

Les contrats intelligents peuvent faire essentiellement tout ce que les programmes informatiques peuvent faire.

Ils peuvent effectuer des calculs, produire de la monnaie, stocker des données, générer des [NFT](/glossary/#nft), envoyer des messages et même produire des visuels. Voici quelques exemples courants et concrets :

- [Stablecoins](/stablecoins/)
- [Création et distribution d'actifs numériques uniques](/nft/)
- [Plateforme d'échange ouverte et automatisée](/get-eth/#dex)
- [Jeu décentralisé](/dapps/?category=gaming#explore)
- [Police d'assurance qui paie automatiquement](https://etherisc.com/)
- [Norme qui permet aux gens de créer des devises personnalisées et interopérables](/developers/docs/standards/tokens/)

## Complément d'information {#further-reading}

- [Comment les contrats intelligents vont changer le monde](https://www.youtube.com/watch?v=pA6CGuXEKtQ)
- [Contrats intelligents : la technologie de la blockchain qui va remplacer les juristes](https://blockgeeks.com/guides/smart-contracts/)
- [Les contrats intelligents pour les développeurs](/developers/docs/smart-contracts/)
- [Apprenez à rédiger des contrats intelligents](/developers/learning-tools/)
- [Maîtriser Ethereum - Qu'est-ce qu'un contrat intelligent ?](https://github.com/ethereumbook/ethereumbook/blob/develop/07smart-contracts-solidity.asciidoc#what-is-a-smart-contract)
