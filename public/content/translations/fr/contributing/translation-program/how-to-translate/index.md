---
title: Comment traduire
lang: fr
description: Instructions d'utilisation de Crowdin pour traduire ethereum.org
---

# Comment traduire {#how-to-translate}

## Guide visuel {#visual-guide}

Pour les apprenants plus visuels, regardez la vidéo de Luka qui présente le paramétrage de Crowdin. Vous pouvez également trouver les mêmes étapes sous forme écrite dans la section suivante.

<YouTube id="Ii7bYhanLs4" />

## Guide écrit {#written-guide}

### Rejoignez notre projet sur Crowdin {#join-project}

Vous devrez vous connecter à votre compte Crowdin ou vous inscrire si vous n'avez pas encore de compte. Tout ce qui est nécessaire pour vous inscrire est un compte de messagerie et un mot de passe.

<ButtonLink href="https://crowdin.com/project/ethereum-org/">
  Rejoindre le projet
</ButtonLink>

### Accédez à votre langue {#open-language}

Après vous être connecté à Crowdin, vous verrez une description du projet et une liste de toutes les langues disponibles. Chaque langue contient également des informations sur le nombre total de mots traduisibles et une vue d'ensemble de la quantité de contenu qui a été traduite et approuvée dans une langue spécifique.

Ouvrez la langue dans laquelle vous souhaitez traduire pour voir la liste des fichiers disponibles pour la traduction.

![Liste des langues sur Crowdin](./list-of-languages.png)

### Trouvez un document sur lequel travailler {#find-document}

Le contenu du site web est divisé en un certain nombre de documents et d'ensembles de contenus. Vous pouvez vérifier la progression de chaque document sur la droite. Si la progression de la traduction est inférieure à 100 %, n'hésitez pas à y contribuer !

Votre langage n'est pas répertorié ici ? [Créez un ticket](https://github.com/ethereum/ethereum-org-website/issues/new/choose) ou demandez de l'aide sur notre [Discord](/discord/)

![Fichiers traduits et non traduits sur Crowdin](./crowdin-files.png)

Une remarque sur les ensembles de contenu : nous utilisons des « ensembles de contenu » dans Crowdin pour que le contenu le plus prioritaire soit publié en premier. Lorsque vous parcourez une langue, comme le [philippin](https://crowdin.com/project/ethereum-org/fil#) par exemple, vous verrez des dossiers pour chaque ensemble de contenu (« 1. Homepage », « 2. Essentials », « 3. Exploring », etc.).

Nous vous encourageons à traduire dans cet ordre numérique (1 → 2 → 3 → ⋯) afin de garantir que les pages ayant le plus fort impact soient traduites en premier.

[En savoir plus sur les compartiments de contenu ethereum.org](/contributing/translation-program/content-buckets/)

### Traduire {#translate}

Après avoir sélectionné le dossier que vous souhaitez traduire, il s'ouvrira dans l'éditeur en ligne. Si vous n'avez jamais utilisé Crowdin auparavant, vous pouvez utiliser ce guide rapide pour passer en revue les bases.

![Éditeur en ligne de Crowdin](./online-editor.png)

**_1 – Barre latérale gauche_**

- Non traduit (rouge) : texte qui n'a pas encore été travaillé. Ce sont les phrases (ou chaînes) que vous devez traduire.
- Traduit (vert) : texte qui a déjà été traduit, mais pas encore vérifié. Vous pouvez suggérer des traductions alternatives ou voter pour/contre les traductions existantes en utilisant les boutons « + » et « - » dans l'éditeur.
- Approuvé (coche) : texte qui a déjà été vérifié et qui est actuellement sur le site web.

Vous pouvez également utiliser les boutons situés en haut pour rechercher des phrases précises, les filtrer par statut ou changer la vue.

**_2 – Zone éditeur_**

Il s'agit de la zone de traduction principale. Le texte source est affiché en haut, avec du contexte et des captures d'écran supplémentaires, si disponibles. Pour proposer une nouvelle traduction, tapez votre traduction dans le champ « Enter translation here » (Entrez la traduction ici), puis cliquez sur « Save » (Enregistrer).

Dans cette section, vous pouvez également trouver des traductions existantes de la phrase dans d'autres langues, ainsi que des correspondances issues de la mémoire de traduction et des suggestions de traduction automatique.

**_3 – Barre latérale droite_**

C'est ici que vous pouvez trouver des commentaires, des entrées de mémoire de traduction et le glossaire. La vue par défaut affiche les commentaires et permet aux traducteurs de communiquer, de soulever des problèmes ou de signaler des traductions incorrectes.

En utilisant les boutons situés en haut, vous pouvez également accéder à la mémoire de traduction, où vous pouvez rechercher des traductions existantes, ou au glossaire, qui contient des descriptions et traductions de termes clés.

Vous voulez en savoir plus ? N'hésitez pas à consulter la [documentation sur l'utilisation de l'éditeur en ligne Crowdin](https://support.crowdin.com/online-editor/)

### Processus de révision {#review-process}

Une fois que vous avez terminé la traduction (c'est-à-dire que tous les fichiers pour un ensemble de contenu affichent une progression à 100 %), notre service de traduction professionnel examinera (et, éventuellement, modifiera) le contenu. Une fois la révision terminée (c'est-à-dire que la progression de la révision est de 100 %), nous ajouterons le contenu sur le site web.

<InfoBanner shouldCenter emoji=":warning:">
  Veuillez ne pas utiliser de traduction automatique pour traduire le projet. Toutes les traductions seront examinées avant d'être ajoutées au site web. S'il apparaît que les traductions que vous proposez sont traduites automatiquement, elles seront rejetées et les contributeurs qui utilisent souvent la traduction automatique seront retirés du projet.
</InfoBanner>

### Nous contacter {#get-in-touch}

Vous avez d'autres questions ? Ou souhaitez-vous collaborer avec notre équipe et d'autres traducteurs ? Envoyez un message dans le canal #translations sur notre [serveur Discord ethereum.org](/discord/)

Vous pouvez également nous contacter à l'adresse translations@ethereum.org

Merci de votre participation au programme de traduction ethereum.org !
