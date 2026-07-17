---
title: Comment traduire
lang: fr
description: Instructions pour utiliser Crowdin afin de traduire ethereum.org
---

## Guide visuel {#visual-guide}

Pour ceux qui préfèrent un support visuel, regardez Luka vous guider dans la configuration de Crowdin. Autrement, vous pouvez retrouver les mêmes étapes au format écrit dans la section suivante.

<VideoWatch slug="crowdin-translation-guide" />

## Guide écrit {#written-guide}

### Rejoindre notre projet sur Crowdin {#join-project}

Vous devrez vous connecter à votre compte Crowdin ou vous inscrire si vous n'en avez pas déjà un. Tout ce qui est requis pour s'inscrire est une adresse e-mail et un mot de passe.

<ButtonLink href="https://crowdin.com/project/ethereum-org/">
  Rejoindre le projet
</ButtonLink>

### Ouvrir votre langue {#open-language}

Après vous être connecté à Crowdin, vous verrez une description du projet et la liste de toutes les langues disponibles.
Chaque langue contient également des informations sur le nombre total de mots traduisibles et un aperçu de la quantité de contenu qui a été traduite et approuvée dans une langue spécifique.

Ouvrez la langue vers laquelle vous souhaitez traduire pour voir la liste des fichiers disponibles pour la traduction.

![List of languages in Crowdin](./list-of-languages.png)

### Trouver un document sur lequel travailler {#find-document}

Le contenu du site Web est divisé en un certain nombre de documents et de groupes de contenu. Vous pouvez vérifier la progression de chaque document sur la droite – si la progression de la traduction est inférieure à 100 %, n'hésitez pas à contribuer !

Vous ne voyez pas votre langue dans la liste ? [Ouvrez un ticket (issue)](https://github.com/ethereum/ethereum-org-website/issues/new/choose) ou demandez sur notre [Discord](https://discord.gg/ethereum-org)

![Translated and untranslated files in Crowdin](./crowdin-files.png)

Une remarque sur les groupes de contenu : nous utilisons des « groupes de contenu » (content buckets) dans Crowdin pour publier en premier le contenu le plus prioritaire. Lorsque vous consultez une langue, par exemple le [philippin](https://crowdin.com/project/ethereum-org/fil#), vous verrez des dossiers pour chaque groupe de contenu (« 1. Homepage », « 2. Essentials », « 3. Exploring », etc.).

Nous vous encourageons à traduire dans cet ordre numérique (1 → 2 → 3 → ⋯) pour vous assurer que les pages ayant le plus d'impact soient traduites en premier.

### Traduire {#translate}

Après avoir sélectionné le fichier que vous souhaitez traduire, il s'ouvrira dans l'éditeur en ligne. Si vous n'avez jamais utilisé Crowdin auparavant, vous pouvez utiliser ce guide rapide pour revoir les bases.

![Crowdin online editor](./online-editor.png)

**_1 – Barre latérale gauche_**

- Non traduit (rouge) – texte qui n'a pas encore été traité. Ce sont les chaînes de caractères que vous devriez traduire.
- Traduit (vert) – texte qui a déjà été traduit, mais pas encore révisé. Vous êtes invité à suggérer des traductions alternatives, ou à voter pour celles existantes en utilisant les boutons « + » et « - » dans l'éditeur.
- Approuvé (coche) – texte qui a déjà été révisé et qui est actuellement en ligne sur le site Web.

Vous pouvez également utiliser les boutons en haut pour rechercher des chaînes spécifiques, les filtrer par statut ou modifier l'affichage.

**_2 – Zone de l'éditeur_**

La zone de traduction principale – le texte source est affiché en haut, avec du contexte supplémentaire et des captures d'écran, si disponibles.
Pour suggérer une nouvelle traduction, saisissez votre traduction dans le champ « Enter translation here » (Saisir la traduction ici) et cliquez sur Save (Enregistrer).

Vous pouvez également trouver des traductions existantes de la chaîne et des traductions dans d'autres langues dans cette section, ainsi que des correspondances de mémoire de traduction et des suggestions de traduction automatique.

**_3 – Barre latérale droite_**

C'est ici que vous pouvez trouver les commentaires, les entrées de la mémoire de traduction et les entrées du glossaire. La vue par défaut affiche les commentaires et permet aux traducteurs de communiquer, de soulever des problèmes ou de signaler des traductions incorrectes.

En utilisant les boutons en haut, vous pouvez également passer à la mémoire de traduction (Translation Memory), où vous pouvez rechercher des traductions existantes, ou au glossaire (Glossary), qui contient des descriptions et des traductions standard des termes clés.

Vous voulez en savoir plus ? N'hésitez pas à consulter la [documentation sur l'utilisation de l'éditeur en ligne Crowdin](https://support.crowdin.com/online-editor/)

### Processus de révision {#review-process}

Une fois que vous avez terminé la traduction (c'est-à-dire que tous les fichiers d'un groupe de contenu affichent 100 %), notre service de traduction professionnel révisera (et potentiellement modifiera) le contenu. Une fois la révision terminée (c'est-à-dire que la progression de la révision est de 100 %), nous l'ajouterons au site Web.

<Alert variant="update">
<AlertEmoji text=":warning:"/>
<AlertContent>
  Veuillez ne pas utiliser la traduction automatique pour traduire le projet. Toutes les traductions seront révisées avant d'être ajoutées au site Web. Si vos suggestions de traduction s'avèrent être traduites automatiquement, elles seront rejetées et les contributeurs qui utilisent souvent la traduction automatique seront retirés du projet.
</AlertContent>
</Alert>

### Nous contacter {#get-in-touch}

Avez-vous des questions ? Ou souhaitez-vous collaborer avec notre équipe et d'autres traducteurs ? Veuillez publier un message dans le canal #translations de notre [serveur Discord ethereum.org](https://discord.gg/ethereum-org)

Vous pouvez également nous contacter à l'adresse translations@ethereum.org

Merci pour votre participation au programme de traduction d'ethereum.org !