---
title: Foire aux questions du programme de traduction (FAQ)
lang: fr
description: Questions fréquentes sur le programme de traduction d'ethereum.org
---

# Guide de traduction du site ethereum.org {#translating-ethereum-guide}

Si vous n'avez jamais utilisé de logiciels de traduction et hésitez à vous lancer, voici quelques questions/réponses pour commencer. Utilisez ce guide pour trouver les réponses aux questions les plus courantes.

## Puis-je obtenir une compensation pour la traduction d'ethereum.org ? {#compensation}

Ethereum.org est un site web open source, ce qui signifie que tout le monde peut y contribuer.

Le programme de traduction d'ethereum.org va dans ce sens et est organisé avec une philosophie similaire.

Le but du programme de traduction est de rendre le contenu Ethereum accessible à tous, quelle que soit la langue qu'ils parlent. Il permet également à toute personne bilingue de s'impliquer dans l'écosystème Ethereum et d'y contribuer de manière accessible.

Par conséquent, le programme de traduction est ouvert et sur la base du volontariat, et la participation n'est pas rémunérée. Si nous devions indemniser les traducteurs pour le nombre de mots qu'ils traduisent, nous ne pourrions inviter que ceux qui ont une expérience de traduction suffisante (traducteurs professionnels) à rejoindre le programme de traduction. Cela rendrait le programme de traduction exclusif et nous empêcherait d'atteindre les objectifs énoncés, en particulier : permettre à chacun de participer et de s'impliquer dans l'écosystème.

Nous faisons tout notre possible pour permettre à nos contributeurs de réussir dans l'écosystème Ethereum. De nombreuses incitations non monétaires sont en place, notamment [l'offre de POAP](/contributing/translation-program/acknowledgements/#poap) et la délivrance d'un certificat de traducteur[](/contributing/translation-program/acknowledgements/#certificate), ainsi que l'organisation de [classements des traducteurs](/contributing/translation-program/acknowledgements/) et [la mention de tous nos traducteurs sur le site](/contributing/translation-program/contributors/).

## Comment traduire des chaînes avec des balises `<HTML tags>` ? {#tags}

Toutes les chaînes ne sont pas écrites sous forme de texte pur. Certaines se composent de scripts mixtes comme des balises HTML (`<0>`, `</0>`), généralement utilisées pour les hyperliens ou les styles de caractère au sein d'une phrase.

- Traduisez le texte à l'intérieur des balises, mais pas les balises elles-mêmes. Tout ce qui se trouve entre les `<` et `>` ne doit pas être traduit ni supprimé.
- Pour éviter tout problème dans la chaîne, nous vous recommandons de cliquer sur le bouton « Copy Source » (Copier la source) situé en bas à gauche. La chaîne d'origine sera copiée et collée dans la zone texte. Cela vous permet de savoir clairement où se trouvent les balises et vous aide à éviter les erreurs.

![Interface Crowdin avec le bouton copy source mis en évidence](./html-tag-strings.png)

Vous pouvez déplacer les balises dans la chaîne pour la rendre plus naturelle dans votre langue. Assurez-vous de bien déplacer la balise entière.

Pour des informations plus détaillées sur le traitement des balises et des extraits de code, veuillez vous référer au [guide de style pour la traduction d'ethereum.org](/contributing/translation-program/translators-guide/#dealing-with-tags).

## Où sont réellement les chaînes ? {#strings}

Souvent, les chaînes sources seules ne sont pas suffisantes pour fournir une traduction précise.

- Jetez un coup d'œil aux captures d'écran et au contexte pour plus d'informations. Dans la section « Source String » (Chaîne source), vous verrez la capture d'écran correspondante qui vous montrera comment la chaîne est utilisée en contexte.
- Si vous avez encore des doutes, signalez-le dans la section « Comments » (Commentaires). [Comment laisser un commentaire ?](#comment)

![Image montrant comment du contexte peut être fourni pour une phrase avec une capture d'écran](./source-string.png)

![Un exemple de capture d'écran ajoutée pour le contexte](./source-string-2.png)

## Comment laisser des commentaires ou poser des questions ? Je voudrais signaler un problème ou une faute de frappe... {#comment}

Si vous voulez signaler une chaîne particulière qui a besoin d'être examinée, n'hésitez pas à soumettre un commentaire.

- Cliquez sur le deuxième bouton de la barre en haut à droite. L'onglet caché apparaîtra sur votre droite. Laissez un nouveau commentaire et cliquez sur la case « Issue » (Problème) en bas de page. Vous pouvez préciser le type de problème en choisissant l'une des options du menu déroulant.
- Une fois le commentaire envoyé, notre équipe en sera informée. Nous résoudrons le problème et vous le ferons savoir en répondant à votre commentaire et en clôturant le problème.
- Si vous signalez une traduction incorrecte, la traduction initiale ainsi que votre proposition seront revues par un locuteur natif lors de la prochaine révision.

![Image montrant comment écrire des commentaires et signaler des problèmes/poser des questions](./comment-issue.png)

## Qu'est-ce que la mémoire de traduction (TM) ? {#translation-memory}

La mémoire de traduction (TM, de l'anglais Translation Memory) est une fonctionnalité de Crowdin qui stocke toutes les chaînes précédemment traduites sur [ethereum.org](http://ethereum.org/). Lorsqu'une chaîne de caractères est traduite, elle est automatiquement enregistrée dans notre TM du projet. Cela peut être un outil utile pour vous aider à gagner du temps !

- Regardez la section « TM and MT Suggestions » (Suggestions de la mémoire de traduction et de traduction automatique) et vous verrez comment les autres traducteurs ont traduit la phrase ou une phrase similaire. Si vous trouvez une suggestion qui correspond, n'hésitez pas à l'utiliser en cliquant dessus.
- S'il n'y a rien dans la liste, vous pouvez rechercher dans la TM des traductions faites précédemment et les réutiliser pour assurer la cohérence.

![Une capture d'écran de la mémoire de traduction](./translation-memory.png)

## Comment utiliser le glossaire Crowdin ? {#glossary}

La terminologie Ethereum est un autre élément crucial de notre travail de traduction, car souvent les nouveaux termes technologiques n'auront pas encore d'équivalents dans de nombreuses langues. Certains termes ont également des significations différentes dans différents contextes. [En savoir plus sur la traduction de la terminologie Ethereum](#terminology)

Le glossaire Crowdin est le meilleur endroit pour clarifier les termes et les définitions. Il y a deux façons de se référer au glossaire.

- Premièrement, lorsque vous voyez un terme souligné dans la chaîne source, vous pouvez le survoler, ce qui affichera une brève définition.

![Un exemple de définition du glossaire](./glossary-definition.png)

- Deuxièmement, si vous voyez un terme qui ne vous est pas familier, mais qui n'est pas souligné, vous pouvez effectuer une recherche dans l'onglet du glossaire (le troisième bouton de la colonne de droite). Vous trouverez des explications sur des termes spécifiques et sur ceux fréquemment utilisés dans le projet.

![Une capture d'écran montrant où trouver l'onglet glossaire dans Crowdin](./glossary-tab.png)

- Si vous ne trouvez toujours pas votre terme, c'est l'occasion d'ajouter un nouveau terme ! Nous vous encourageons à le rechercher sur un moteur de recherche et à ajouter la description au glossaire. Cela sera d'une grande aide aux autres traducteurs pour mieux comprendre le terme.

![Une capture d'écran montrant comment ajouter un terme au glossaire de Crowdin](./add-glossary-term.png)

### Politique de traduction terminologique {#terminology}

_Pour les noms (marques, entreprises, personnes) et les nouveaux termes technologiques (chaîne phare, chaîne de fragments, etc.)_

Ethereum utilise de nombreux nouveaux termes qui ont été créés récemment. Certains termes seront traduits différemment d'un traducteur à l'autre puisqu'ils n'ont pas de traduction officielle. De telles incohérences peuvent entraver la compréhension et diminuer la lisibilité.

En raison de la diversité linguistique et des normalisations différentes dans chaque langue, il a été presque impossible de proposer une politique unifiée de traduction terminologique qui puisse être adaptée dans toutes les langues prises en charge.

Après mûre réflexion, nous avons pris la décision de laisser le choix de la terminologie la plus fréquemment utilisée à vous, les traducteurs.

Voici ce que nous suggérons lorsque vous trouvez un terme qui vous est inconnu :

- Reportez-vous au [glossaire des termes](#glossary), vous pourriez y trouver comment d'autres traducteurs l'ont traduit précédemment. Si vous pensez que le terme précédemment traduit n'est pas approprié, n'hésitez pas à proposer votre traduction en ajoutant un nouveau terme au glossaire Crowdin.
- Si aucune traduction précédente n'existe dans le glossaire, nous vous encourageons à rechercher le terme sur un moteur de recherche ou dans un article de presse pour déterminer comment le terme est réellement utilisé dans votre communauté.
- Si vous ne trouvez aucune référence, n'hésitez pas à faire confiance à votre intuition et à suggérer une nouvelle traduction dans votre langue !
- Si vous n'êtes pas très confiant à cette idée, laissez le terme non traduit. Parfois, les termes anglais sont plus qu'adéquats pour fournir des définitions précises.

Nous vous recommandons de laisser les noms des marques, des entreprises et des personnes non traduits, car une traduction pourrait causer des confusions inutiles et des difficultés en matière de SEO.

## Comment fonctionne le processus de révision ? {#review-process}

Pour assurer un certain niveau de qualité et de cohérence dans nos traductions, nous travaillons avec [Acolad](https://www.acolad.com/), l'un des plus grands fournisseurs de services linguistiques au monde. Acolad compte 20 000 linguistes professionnels, ce qui signifie qu'ils peuvent fournir des réviseurs professionnels pour chaque langue et chaque type de contenu dont nous avons besoin.

Le processus de révision est simple ; une fois qu'un certain [ensemble de contenu](/contributing/translation-program/content-buckets) est traduit à 100 %, nous commandons une révision pour cet ensemble de contenu. Le processus de révision se déroule directement dans Crowdin. Une fois la révision terminée, nous mettons à jour le site web avec le contenu traduit.

## Comment ajouter du contenu dans ma langue ? {#adding-foreign-language-content}

Actuellement, tout le contenu dans d'autres langues que l'anglais a été traduit directement à partir du contenu source anglais, et tout contenu qui n'existe pas en anglais ne peut être ajouté dans les autres langues.

Pour proposer du nouveau contenu pour ethereum.org, vous pouvez [créer un ticket](https://github.com/ethereum/ethereum-org-website/issues) sur GitHub. S'il est ajouté, le contenu sera écrit en anglais et traduit par la suite dans d'autres langues à l'aide de Crowdin.

Nous prévoyons de prendre en charge l'ajout de contenu dans d'autres langues que l'anglais dans un futur proche.

## Nous contacter {#contact}

Je vous remercie d'avoir lu toutes ces informations. Nous espérons que cela vous aidera à participer à notre programme. N'hésitez pas à rejoindre notre [canal de traduction sur Discord](https://discord.gg/ethereum-org) afin de poser des questions et de travailler avec les autres traducteurs, ou à nous contacter à l'adresse translations@ethereum.org !
