---
title: Guide de traduction d'ethereum.org
metaTitle: Foire aux questions (FAQ) du programme de traduction
lang: fr
description: Foire aux questions concernant le programme de traduction d'ethereum.org
---

Si vous êtes nouveau dans le programme de traduction et que vous hésitez à vous lancer, voici une FAQ qui peut vous aider à démarrer. Utilisez ce guide pour trouver des réponses aux questions les plus courantes.

## Puis-je être rémunéré pour la traduction d'ethereum.org ? {#compensation}

Ethereum.org est un site web open source, ce qui signifie que tout le monde peut s'impliquer et contribuer.

Le programme de traduction d'ethereum.org en est le prolongement et est organisé avec une philosophie similaire.

L'objectif du programme de traduction est de rendre le contenu d'Ethereum accessible à tous, quelles que soient les langues parlées. Il permet également à toute personne bilingue de s'impliquer dans l'écosystème Ethereum et de contribuer de manière accessible.

Pour cette raison, le programme de traduction est ouvert et bénévole, et la participation ne fait l'objet d'aucune rémunération. Si nous devions rémunérer les traducteurs en fonction du nombre de mots qu'ils traduisent, nous ne pourrions inviter que ceux ayant une expérience suffisante en traduction (les traducteurs professionnels) à rejoindre le programme de traduction. Cela rendrait le programme de traduction exclusif et nous empêcherait d'atteindre les objectifs fixés, à savoir : permettre à chacun de participer et de s'impliquer dans l'écosystème.

Nous mettons tout en œuvre pour permettre à nos contributeurs de réussir dans l'écosystème Ethereum ; de nombreuses incitations non monétaires sont en place, telles que : [l'offre de POAP](/contributing/translation-program/acknowledgements/#poap) et d'un [certificat de traducteur](/contributing/translation-program/acknowledgements/#certificate), ainsi que l'organisation de [classements de traduction](/contributing/translation-program/acknowledgements/) et [la liste de tous nos traducteurs sur le site](/contributing/translation-program/contributors/).

## Comment traduire les chaînes de caractères avec `<HTML tags>` ? {#tags}

Toutes les chaînes de caractères ne sont pas écrites sous forme de texte pur. Certaines chaînes sont constituées de scripts mixtes comme des balises HTML (`<0>`, `</0>`). C'est généralement le cas pour les hyperliens ou les styles alternatifs au milieu d'une phrase.

- Traduisez le texte à l'intérieur des balises, mais pas les balises elles-mêmes. Tout ce qui se trouve dans `<` et `>` ne doit pas être traduit ni supprimé.
- Pour conserver la chaîne intacte, nous vous recommandons de cliquer sur le bouton « Copy Source » (Copier la source) en bas à gauche. Cela copiera la chaîne d'origine et la collera dans la zone de texte. Cela vous permet de clarifier l'emplacement des balises et vous aide à éviter les erreurs.

![Crowdin interface with copy source button highlighted](./html-tag-strings.png)

Vous pouvez déplacer la position des balises dans la chaîne pour la rendre plus naturelle dans votre langue – assurez-vous simplement de déplacer la balise entière.

Pour des informations plus approfondies sur la gestion des balises et des extraits de code, veuillez consulter le [Guide de style de traduction d'ethereum.org](/contributing/translation-program/translators-guide/#dealing-with-tags).

## Où se trouvent les chaînes de caractères ? {#strings}

Souvent, les chaînes sources seules peuvent ne pas suffire pour fournir une traduction précise.

- Jetez un œil aux « screenshots » (captures d'écran) et au « context » (contexte) pour plus d'informations. Dans la section de la chaîne source, vous verrez l'image de capture d'écran jointe qui vous montrera comment nous utilisons la chaîne dans son contexte.
- Si vous n'êtes toujours pas sûr, signalez-le dans la « comment section » (section des commentaires). [Vous ne savez pas comment laisser un commentaire ?](#comment)

![Showing how context can be provided for a string with a screenshot](./source-string.png)

![An example screenshot added for context](./source-string-2.png)

## Comment puis-je laisser des commentaires ou poser des questions ? Je voudrais signaler un problème ou des fautes de frappe... {#comment}

Si vous souhaitez signaler une chaîne particulière qui nécessite une attention, n'hésitez pas à soumettre un commentaire.

- Cliquez sur le deuxième bouton de la barre en haut à droite. L'onglet masqué apparaîtra sur votre droite. Laissez un nouveau commentaire et cochez la case « Issue » (Problème) en bas. Vous pouvez spécifier le type de problème en choisissant l'une des options dans le menu déroulant.
- Une fois soumis, il sera signalé à notre équipe. Nous corrigerons le problème et vous en informerons en répondant à votre commentaire et en fermant le problème.
- Si vous signalez une traduction incorrecte, la traduction et l'alternative que vous avez suggérée seront examinées par un locuteur natif lors de la prochaine révision.

![Showing how to make comments and issues](./comment-issue.png)

## Qu'est-ce que la mémoire de traduction (TM) ? {#translation-memory}

La mémoire de traduction (TM) est une fonctionnalité de Crowdin qui stocke toutes les chaînes précédemment traduites sur ethereum.org. Lorsqu'une chaîne est traduite, elle est automatiquement enregistrée dans la TM de notre projet. Cela peut être un outil utile pour vous aider à gagner du temps !

- Regardez la section « TM and MT Suggestions » (Suggestions de TM et MT) et vous verrez comment d'autres traducteurs ont traduit la même chaîne ou une chaîne similaire. Si vous trouvez une suggestion avec un taux de correspondance élevé, n'hésitez pas à vous référer à la traduction en cliquant dessus.
- S'il n'y a rien dans la liste, vous pouvez rechercher dans la TM des traductions précédemment effectuées et les réutiliser par souci de cohérence.

![A screenshot of the translation memory](./translation-memory.png)

## Comment utiliser le glossaire Crowdin ? {#glossary}

La terminologie d'Ethereum est une autre partie cruciale de notre travail de traduction, car souvent les nouveaux termes techniques ne sont pas encore localisés dans de nombreuses langues. De plus, certains termes ont des significations différentes selon les contextes. [En savoir plus sur la traduction de la terminologie d'Ethereum](#terminology)

Le glossaire Crowdin est le meilleur endroit pour clarifier les termes et les définitions. Il y a deux façons de se référer au glossaire.

- Premièrement, lorsque vous trouvez un terme souligné dans la chaîne source, vous pouvez passer la souris dessus et en voir une brève définition.

![An example glossary definition](./glossary-definition.png)

- Deuxièmement, si vous voyez un terme qui ne vous est pas familier mais qui n'est pas souligné, vous pouvez le rechercher dans l'onglet du glossaire (le troisième bouton de la colonne de droite). Vous y trouverez des explications sur des termes spécifiques et ceux fréquemment utilisés dans le projet.

![A screenshot showing where to find the glossary tab in Crowdin](./glossary-tab.png)

- Si vous ne le trouvez toujours pas, c'est l'occasion d'ajouter un nouveau terme ! Nous vous encourageons à le rechercher sur un moteur de recherche et à ajouter la description au glossaire. Cela sera d'une grande aide pour les autres traducteurs afin de mieux comprendre le terme.

![A screenshot showing how to add a glossary term to Crowdin](./add-glossary-term.png)

### Politique de traduction de la terminologie {#terminology}

_Pour les noms (marques, entreprises, personnes) et les nouveaux termes techniques (chaîne balise, chaînes de fragments, etc.)_

Ethereum présente de nombreux nouveaux termes qui ont été inventés récemment. Certains termes varieront d'un traducteur à l'autre car il n'y a pas de traduction officielle dans leur langue respective. De telles incohérences peuvent causer des malentendus et réduire la lisibilité.

En raison de la diversité linguistique et des différentes normalisations dans chaque langue, il a été presque impossible de proposer une politique de traduction de terminologie unifiée qui puisse être adaptée dans toutes les langues prises en charge.

Après mûre réflexion, nous avons pris la décision de vous laisser, à vous les traducteurs, le choix de la terminologie la plus fréquemment utilisée.

Voici ce que nous suggérons lorsque vous trouvez un terme qui ne vous est pas familier :

- Référez-vous au [Glossaire des termes](#glossary), vous y trouverez peut-être comment d'autres traducteurs l'ont traduit précédemment. Si vous pensez que le terme traduit précédemment n'est pas approprié, n'hésitez pas à rétablir votre traduction en ajoutant un nouveau terme au glossaire Crowdin.
- Si une telle traduction antérieure n'existe pas dans le glossaire, nous vous encourageons à la rechercher sur un moteur de recherche ou dans un article de presse qui montre comment le terme est réellement utilisé dans votre communauté.
- Si vous ne trouvez aucune référence, n'hésitez pas à faire confiance à votre intuition et à suggérer une nouvelle traduction dans votre langue !
- Si vous vous sentez moins confiant pour le faire, laissez le terme non traduit. Parfois, les termes anglais sont plus que suffisants pour fournir des définitions précises.

Nous vous recommandons de ne pas traduire les noms de marques, d'entreprises et de personnes, car une traduction pourrait causer une confusion inutile et des difficultés de référencement (SEO).

## Comment fonctionne le processus de révision ? {#review-process}

Pour garantir un certain niveau de qualité et de cohérence dans nos traductions, nous travaillons avec [Acolad](https://www.acolad.com/), l'un des plus grands fournisseurs de services linguistiques au monde. Acolad compte 20 000 linguistes professionnels, ce qui signifie qu'ils peuvent fournir des réviseurs professionnels pour chaque langue et type de contenu dont nous avons besoin.

Le processus de révision est simple ; une fois qu'un ensemble de contenu est traduit à 100 %, nous commandons une révision pour ce lot de contenu. Le processus de révision se déroule directement dans Crowdin. Une fois la révision terminée, nous mettons à jour le site web avec le contenu traduit.

## Comment ajouter du contenu dans ma langue ? {#adding-foreign-language-content}

Actuellement, tout le contenu non anglophone est traduit directement à partir du contenu source en anglais, et tout contenu qui n'existe pas en anglais ne peut pas être ajouté dans d'autres langues.

Pour suggérer du nouveau contenu pour ethereum.org, vous pouvez [créer un ticket (issue)](https://github.com/ethereum/ethereum-org-website/issues) sur GitHub. S'il est ajouté, le contenu sera rédigé en anglais et traduit dans d'autres langues à l'aide de Crowdin.

Nous prévoyons d'ajouter la prise en charge des ajouts de contenu non anglophone dans un avenir proche.

## Nous contacter {#contact}

Merci d'avoir lu tout ceci. Nous espérons que cela vous aidera à intégrer notre programme. N'hésitez pas à rejoindre notre [canal de traduction Discord](https://discord.gg/ethereum-org) pour poser des questions et collaborer avec d'autres traducteurs, ou contactez-nous à translations@ethereum.org !