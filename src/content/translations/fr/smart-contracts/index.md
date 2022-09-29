---
title: Contrats intelligents
description: Une introduction non technique aux contrats intelligents
lang: fr
---

# Introduction aux contrats intelligents {#introduction-to-smart-contracts}

Les contrats intelligents sont les éléments fondamentaux des [applications Ethereum](/dapps/). Il s'agit de programmes informatiques stockés sur la blockchain qui sont l'équivalent numérique de contrats classiques. Les contrats intelligents suivent strictement une structure dite logique de type « Si » et « alors ». Cela implique qu'ils se comportent exactement tels qu'ils sont programmés et ne peuvent pas être modifiés.

L'expression « contrat intelligent » a été utilisée en premier par Nick Szabo. En 1994, il a rédigé [une présentation du concept](https://www.fon.hum.uva.nl/rob/Courses/InformationInSpeech/CDROM/Literature/LOTwinterschool2006/szabo.best.vwh.net/smart.contracts.html) puis, en 1996, [une étude approfondie sur les possibilités offertes par les contrats intelligents](https://www.fon.hum.uva.nl/rob/Courses/InformationInSpeech/CDROM/Literature/LOTwinterschool2006/szabo.best.vwh.net/smart_contracts_2.html).

Nick Szabo a imaginé un marché numérique basé sur ces processus automatiques et sécurisés par la cryptographie. Un lieu où les transactions et les activités économiques peuvent se dérouler en toute confiance, sans intermédiaire. Les contrats intelligents Ethereum concrétisent cette vision.

## En quoi consistent ces contrats ? {#what-are-contracts}

Vous pensez probablement : _"Je ne suis pas avocat ! Pourquoi devrais-je m'intéresser aux contrats ?"_. Pour la plupart des gens, les contrats évoquent des accords longs basés sur des conditions générales ou des documents juridiques sans intérêt et qui ne servent à rien.

Les contrats ne sont que des accords. Autrement dit, toute forme d'accord peut être englobée dans les conditions d'un contrat. Les accords verbaux ou écrits sont acceptables dans de nombreuses situations, mais ils ne sont pas infaillibles.

### Confiance et contrats {#trust-and-contracts}

L'un des problèmes majeurs d'un contrat classique est la nécessité que des personnes de confiance assurent le suivi des résultats du contrat.

En voici un exemple :

Alice et Bob font une course de vélo. Imaginons qu'Alice parie 10 € avec Bob qu'elle gagnera la course. Bob est sûr de gagner et accepte le pari. Finalement, Alice devance largement Bob et est le vainqueur incontestable. Mais Bob refuse de payer le pari, prétendant qu'Alice a dû tricher.

Cet exemple ridicule illustre le problème de tout accord non intelligent. Même si les conditions de l'accord sont remplies (ex. vous avez gagné la course), vous devez toujours faire confiance à une autre personne pour qu'elle respecte l'accord (ex. payer le pari).

## Contrats intelligents {#smart-contracts}

Les contrats intelligents numérisent les accords en traduisant les conditions générales d'un contrat en code informatique qui s'exécute automatiquement lorsque les conditions du contrat sont respectées.

### Distributeur automatique numérique {#vending-machine}

Nous pouvons comparer simplement un contrat intelligent à un distributeur automatique, qui fonctionne de manière assez similaire à un contrat intelligent ; des intrants spécifiques qui garantissent des résultats prédéterminés.

- Vous choisissez un produit
- Le distributeur automatique renvoie le montant nécessaire à l'achat du produit
- Vous introduisez le montant requis
- Le distributeur automatique vérifie que vous avez introduit le bon montant
- Le distributeur automatique distribue le produit choisi

Le distributeur automatique ne distribuera le produit choisi que si toutes les conditions sont remplies. Si vous ne sélectionnez pas un produit ou que vous n'insérez pas le montant suffisant, le distributeur automatique ne distribuera pas le produit.

### Exécution automatique {#automation}

L'un des avantages les plus importants des contrats intelligents par rapport aux contrats traditionnels est que l'engagement issu d'un contrat est automatiquement exécuté lorsque les conditions de celui-ci sont remplies. Il n'y a pas besoin d'attendre qu'un humain exécute le résultat. En d'autres termes : les contrats intelligents éliminent le besoin de confiance.

Par exemple, vous pouvez rédiger un contrat intelligent qui détient des fonds en fiducie pour un enfant, autorisant celui-ci à retirer des fonds seulement à partir d'une date précise. S'il essaie de retirer de l'argent avant ladite date, le contrat intelligent ne s'exécute pas. Ou encore, vous pouvez rédiger un contrat qui vous donne automatiquement une version numérique de la carte grise de votre nouvelle voiture lorsque vous payez le concessionnaire.

### Résultats prévisibles {#predictability}

Le facteur humain est l'un des principaux points de défaillance des contrats traditionnels. Par exemple, deux juges individuels peuvent interpréter un contrat traditionnel de deux manières différentes. Leur interprétation propre pourrait conduire à une prise de décision différente et ainsi à des résultats inégaux. Les contrats intelligents écartent la possibilité d'interprétations différentes. En effet, les contrats intelligents s'exécutent précisément en fonction des conditions écrites dans le code du contrat. Cette précision signifie que, dans les mêmes circonstances, le contrat intelligent produit le même résultat.

### Enregistrement public {#public-record}

Les contrats intelligents sont aussi utiles pour les audits et le suivi. Comme les contrats intelligents Ethereum sont sur une blockchain publique, tout le monde peut suivre instantanément les transferts d'actifs ainsi que toute autre information connexe. Vous pouvez, par exemple, vérifier que quelqu'un a envoyé de l'argent à votre adresse.

### Protection de la vie privée {#privacy-protection}

Les contrats intelligents peuvent également protéger votre vie privée. Ethereum étant un réseau pseudonyme (vos transactions sont liées publiquement à une adresse cryptographique unique, et non à votre identité), vous pouvez protéger votre vie privée.

### Transparence des conditions {#visible-terms}

Enfin, comme pour les contrats, vous pouvez consulter le contenu d'un contrat intelligent avant de le signer (ou de le traiter d'une façon quelconque). Mieux encore, la transparence publique des conditions du contrat signifie que tout le monde peut l'examiner.

## Cas d'utilisation des contrats intelligents {#use-cases}

Les contrats intelligents sont donc des programmes informatiques qui vivent sur la blockchain. Ils peuvent s'exécuter automatiquement. Vous pouvez suivre leurs transactions, prédire leur fonctionnement et même les utiliser de manière pseudonyme. C'est bien. Mais à quoi peuvent-ils servir ? Les contrats intelligents peuvent faire à peu près tout ce que font les autres programmes informatiques.

Ils peuvent effectuer des calculs, produire de la monnaie, stocker des données, générer des NFT, envoyer des messages et même produire des visuels. Voici quelques exemples courants et concrets :

- [Stablecoins](/stablecoins/)
- [Création et distribution d'actifs numériques uniques](/nft/)
- [Plateforme d'échange ouverte et automatisée](/get-eth/#dex)
- [Jeu décentralisé](/dapps/?category=gaming)
- [Police d'assurance qui paie automatiquement](https://etherisc.com/)
- [Norme qui permet aux gens de créer des devises personnalisées et interopérables](/developers/docs/standards/tokens/)

## Vous comprenez mieux avec des images ? {#visual-learner}

Regardez Finematics expliquer les contrats intelligents :

<YouTube id="pWGLtjG-F5c" />

## Complément d'information {#further-reading}

- [Comment les contrats intelligents vont changer le monde](https://www.youtube.com/watch?v=pA6CGuXEKtQ)
- [Contrats intelligents : la technologie de la blockchain qui va remplacer les juristes](https://blockgeeks.com/guides/smart-contracts/)
- [Les contrats intelligents pour les développeurs](/developers/docs/smart-contracts/)
- [Apprenez à rédiger des contrats intelligents](/developers/learning-tools/)
- [Maîtriser Ethereum - Qu'est-ce qu'un contrat intelligent ?](https://github.com/ethereumbook/ethereumbook/blob/develop/07smart-contracts-solidity.asciidoc#what-is-a-smart-contract)
