---
title: Introduction aux contrats intelligents
metaTitle: "Contrats intelligents : Que sont-ils et quels sont leurs avantages"
description: Une introduction non technique aux contrats intelligents
lang: fr
---

Les contrats intelligents sont les éléments fondamentaux de la couche applicative d'[Ethereum](/). Ce sont des programmes informatiques stockés sur la [chaîne de blocs](/glossary/#blockchain) qui suivent une logique « si ceci, alors cela », et dont l'exécution est garantie selon les règles définies par leur code, qui ne peut être modifié une fois créé.

Nick Szabo a inventé le terme « contrat intelligent ». En 1994, il a écrit [une introduction au concept](https://www.fon.hum.uva.nl/rob/Courses/InformationInSpeech/CDROM/Literature/LOTwinterschool2006/szabo.best.vwh.net/smart.contracts.html), et en 1996, il a rédigé [une exploration de ce que les contrats intelligents pourraient accomplir](https://www.fon.hum.uva.nl/rob/Courses/InformationInSpeech/CDROM/Literature/LOTwinterschool2006/szabo.best.vwh.net/smart_contracts_2.html).

Szabo a imaginé une place de marché numérique où des processus automatiques et [sécurisés par la cryptographie](/glossary/#cryptography) permettent aux transactions et aux fonctions commerciales de se dérouler sans intermédiaires de confiance. Les contrats intelligents sur Ethereum mettent cette vision en pratique.

Regardez Finematics expliquer les contrats intelligents :

<VideoWatch slug="smart-contracts-code-is-law" />

## La confiance dans les contrats conventionnels {#trust-and-contracts}

L'un des plus grands problèmes d'un contrat traditionnel est la nécessité de faire confiance à des individus pour respecter les résultats du contrat.

Voici un exemple :

Alice et Bob font une course de vélo. Disons qu'Alice parie 10 $ avec Bob qu'elle gagnera la course. Bob est convaincu qu'il sera le vainqueur et accepte le pari. À la fin, Alice termine la course bien avant Bob et est la gagnante incontestée. Mais Bob refuse de payer le pari, affirmant qu'Alice a dû tricher.

Cet exemple absurde illustre le problème de tout accord non intelligent. Même si les conditions de l'accord sont remplies (c'est-à-dire que vous êtes le vainqueur de la course), vous devez toujours faire confiance à une autre personne pour honorer l'accord (c'est-à-dire payer le pari).

## Un distributeur automatique numérique {#vending-machine}

Une métaphore simple pour un contrat intelligent est un distributeur automatique, qui fonctionne de manière assez similaire à un contrat intelligent : des entrées spécifiques garantissent des sorties prédéterminées.

- Vous sélectionnez un produit
- Le distributeur automatique affiche le prix
- Vous payez le prix
- Le distributeur automatique vérifie que vous avez payé le bon montant
- Le distributeur automatique vous donne votre article

Le distributeur automatique ne distribuera le produit souhaité qu'une fois toutes les exigences remplies. Si vous ne sélectionnez pas de produit ou n'insérez pas assez d'argent, le distributeur automatique ne vous donnera pas votre produit.

## Exécution automatique {#automation}

Le principal avantage d'un contrat intelligent est qu'il exécute de manière déterministe un code sans ambiguïté lorsque certaines conditions sont remplies. Il n'est pas nécessaire d'attendre qu'un humain interprète ou négocie le résultat. Cela supprime le besoin d'intermédiaires de confiance.

Par exemple, vous pourriez écrire un contrat intelligent qui conserve des fonds sous séquestre pour un enfant, lui permettant de retirer les fonds après une date précise. S'il essaie de retirer avant cette date, le contrat intelligent ne s'exécutera pas. Ou vous pourriez écrire un contrat qui vous donne automatiquement une version numérique du titre de propriété d'une voiture lorsque vous payez le concessionnaire.

## Résultats prévisibles {#predictability}

Les contrats traditionnels sont ambigus car ils dépendent des humains pour les interpréter et les appliquer. Par exemple, deux juges pourraient interpréter un contrat différemment, ce qui pourrait conduire à des décisions incohérentes et à des résultats inégaux. Les contrats intelligents éliminent cette possibilité. Au lieu de cela, les contrats intelligents s'exécutent précisément en fonction des conditions écrites dans le code du contrat. Cette précision signifie que, dans les mêmes circonstances, le contrat intelligent produira le même résultat.

## Registre public {#public-record}

Les contrats intelligents sont utiles pour les audits et le suivi. Étant donné que les contrats intelligents Ethereum sont sur une chaîne de blocs publique, n'importe qui peut suivre instantanément les transferts d'actifs et d'autres informations connexes. Par exemple, vous pouvez vérifier que quelqu'un a envoyé de l'argent à votre adresse.

## Protection de la confidentialité {#privacy-protection}

Les contrats intelligents protègent également votre confidentialité. Puisqu'Ethereum est un réseau pseudonyme (vos transactions sont liées publiquement à une adresse cryptographique unique, et non à votre identité), vous pouvez protéger votre confidentialité des observateurs.

## Conditions visibles {#visible-terms}

Enfin, comme pour les contrats traditionnels, vous pouvez vérifier ce que contient un contrat intelligent avant de le signer. Contrairement à un contrat traditionnel, la transparence onchain d'un contrat intelligent permet à quiconque de l'examiner et de le réviser avant d'interagir avec lui. 

Cependant, bien que n'importe qui puisse consulter les conditions d'un contrat intelligent, les données brutes de transaction sont conçues pour être interprétées par des applications et des portefeuilles, et non par des humains. Parce que ces données sont si difficiles à lire, les utilisateurs sont souvent confrontés à un risque de sécurité majeur appelé « signature aveugle », c'est-à-dire l'approbation d'une transaction qui interagit avec un contrat intelligent sans vraiment comprendre ce qu'elle fera. 

L'écosystème Ethereum est en train de faire la transition vers des normes de **[signature en clair](https://clearsigning.org/)** (spécifiquement l'[ERC-7730](https://eips.ethereum.org/EIPS/eip-7730)). La signature en clair traduit les données opaques des contrats intelligents en descriptions de transaction simples et lisibles par l'homme, garantissant que quiconque puisse comprendre la véritable intention d'un contrat avant de signer.

## Cas d'utilisation des contrats intelligents {#use-cases}

Les contrats intelligents peuvent faire essentiellement tout ce que les programmes informatiques peuvent faire.

Ils peuvent effectuer des calculs, créer de la monnaie, stocker des données, frapper des [NFT](/glossary/#nft), envoyer des communications et même générer des graphiques. Voici quelques exemples populaires du monde réel :

- [Les stablecoins](/stablecoins/)
- [La création et la distribution d'actifs numériques uniques](/nft/)
- [Un bureau de change automatique et ouvert](/get-eth/#dex)
- [Les jeux décentralisés](/apps/categories/gaming)
- [Une police d'assurance qui paie automatiquement](https://etherisc.com/)
- [Une norme qui permet aux gens de créer des monnaies personnalisées et interopérables](/developers/docs/standards/tokens/)

## Complément d'information {#further-reading}

- [Comment les contrats intelligents vont changer le monde](https://www.youtube.com/watch?v=pA6CGuXEKtQ)
- [Les contrats intelligents pour les développeurs](/developers/docs/smart-contracts/)
- [Apprendre à écrire des contrats intelligents](/developers/learning-tools/)
- [Mastering Ethereum - Qu'est-ce qu'un contrat intelligent ?](https://github.com/ethereumbook/ethereumbook/blob/openedition/07smart-contracts-solidity.asciidoc#what-is-a-smart-contract)

<Divider />

<QuizWidget quizKey="smart-contracts" />