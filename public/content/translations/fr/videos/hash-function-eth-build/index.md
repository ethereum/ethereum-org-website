---
title: "Fonction de hachage — ETH.BUILD"
description: "Une démonstration des fonctions de hachage cryptographiques à l'aide de l'outil éducatif ETH.BUILD. Découvrez comment fonctionnent les fonctions de hachage et pourquoi elles sont fondamentales pour le modèle d'intégrité des comptes et des données d'Ethereum."
lang: fr
youtubeId: "QJ010l-pBpE"
uploadDate: 2021-01-14
duration: "0:04:39"
educationLevel: beginner
topic:
  - "accounts"
  - "cryptography"
format: tutorial
author: Austin Griffith
breadcrumb: "Fonctions de hachage (ETH.BUILD)"
---

Un tutoriel d'**Austin Griffith** démontrant le fonctionnement des fonctions de hachage cryptographiques à l'aide de l'outil de programmation visuelle ETH.BUILD, couvrant le déterminisme, la sortie de longueur fixe, les propriétés unidirectionnelles et les arbres de Merkle.

*Cette transcription est une copie accessible de la [transcription originale de la vidéo](https://www.youtube.com/watch?v=QJ010l-pBpE) publiée par Austin Griffith. Elle a été légèrement modifiée pour en faciliter la lecture.*

### Introduction aux fonctions de hachage (0:00) {#introduction-to-hash-functions-000}

Ceci est la première vidéo d'une série intitulée ETH.BUILD. Vous pouvez vous rendre sur eth.build pour utiliser cet outil, mais c'est juste pour vous amuser et avoir une idée de la façon dont les choses fonctionnent lors du développement sur Ethereum.

Le premier module que nous allons examiner est une fonction de hachage. Qu'est-ce qu'une fonction de hachage ? Eh bien, c'est un peu comme une empreinte digitale. Vous avez une entrée — cela peut être n'importe quoi — mais pour l'instant, nous allons simplement utiliser le texte « hello world ». De l'autre côté, vous allez avoir une sortie, et cette sortie est une chaîne hexadécimale de 64 caractères. Elle indique 66 caractères en raison du préfixe « 0x », mais il s'agit en réalité d'une chaîne hexadécimale de 64 caractères.

### Visualiser les hashs sous forme de couleurs (0:50) {#visualizing-hashes-as-colors-050}

Si vous regardez de l'hexadécimal, cela ressemble un peu à une couleur, et il pourrait être plus facile de décrire ce que nous voyons ici si nous en faisions simplement une couleur. Ce que nous allons donc faire, c'est prendre les six premiers caractères de la chaîne, quelle qu'elle soit, et l'afficher sous forme de couleur. Si nous regardons cela, nous voyons que c'est une belle couleur violette.

Voyons de quelle couleur est mon nom — voilà, un beau vert forêt. Revenons maintenant à « hello world » — c'est à nouveau ce violet.

### Déterminisme et sortie de longueur fixe (1:38) {#determinism-and-fixed-length-output-138}

Ce que nous venons de découvrir, c'est que c'est déterministe. En gros, peu importe ce que nous mettons en entrée, nous obtiendrons toujours la même chose de l'autre côté.

La deuxième propriété est que vous pouvez y mettre n'importe quoi, de n'importe quelle taille arbitraire. Je peux taper n'importe comment sur le clavier et voir la couleur changer, mais cette chaîne reste à cette longueur de 66 caractères. Peu importe ce que vous mettez ici — même un fichier — je pourrais déposer ce fichier de Leo, mon garçon, le mettre comme hash et obtenir une belle couleur orange. Ensuite, je pourrais déposer un document texte de liste de mots BIP et c'est ce beau bleu clair. Si je ramène Leo, devinez de quelle couleur il sera ? Nous savons que ce sera cet orange. Vous obtenez cette empreinte digitale déterministe de la chose que vous avez insérée.

### Propriété unidirectionnelle (2:37) {#one-directional-property-237}

La propriété suivante la plus importante est qu'elle est unidirectionnelle. Si je remets « hello world », nous allons obtenir ce hash « 4717 ». Si nous prenons ce hash et l'envoyons à quelqu'un en disant « voici le hash de mon secret — si tu peux deviner mon secret, je te donne cent balles », il ne pourra même pas s'en approcher.

Disons que le hash commence par « 4717 » et qu'ils commencent à fouiller pour essayer de trouver une correspondance. Vous ne pouvez pas simplement changer de petits caractères et vous en approcher — soit vous l'avez, soit vous ne l'avez pas. Vous devez essentiellement le deviner par force brute. S'ils devinent par hasard « hello world », ils obtiendront la réponse, mais s'ils ne le devinent pas, ils ne l'auront jamais. Il n'y a aucun moyen de savoir si vous vous rapprochez.

Vous découvrirez avec la cryptographie que c'est parfois frustrant en tant que développeur, car soit ça marche, soit ça ne marche pas — vous n'obtenez aucun indice pour savoir si vous vous rapprochez. Mais c'est une bonne chose. C'est la propriété que nous voulons d'une fonction de hachage.

### Résumé des propriétés de la fonction de hachage (3:43) {#summary-of-hash-function-properties-343}

Nous avons donc : n'importe quoi de n'importe quelle taille peut être introduit dans une fonction de hachage, et elle va recracher une empreinte hexadécimale exacte de 64 caractères de ce que sont ces données. C'est déterministe. C'est unidirectionnel — vous ne pouvez pas faire le chemin inverse. Il est très facile de créer un hash, mais très difficile de deviner le secret du hash.

### Arbres de Merkle et combinaison de hashs (4:06) {#merkle-trees-and-combining-hashes-406}

Ce que nous pouvons faire avec cela, ce sont des choses vraiment géniales, comme un arbre de Merkle. Nous avons nos trois entrées, et nous pourrions les joindre ensemble. Nous pouvons combiner tous ces hashs, puis hacher la combinaison.

Cette couleur juste ici — ce violet — représente le hash de tous ces hashs. Si je change « hello world » en « hello world one », ce violet va changer. Le moindre petit changement apporté à l'une de ces entrées entraînera la modification du hash final. Vous pouvez apporter toutes sortes de données de toutes sortes de manières différentes — même avoir un arbre de hashs, un arbre de Merkle — ou avoir un tas de blocs à la suite, et ce hash final sera basé sur toutes ces choses. Si la moindre petite chose change en cours de route, le hash final changera.

### Point clé à retenir (5:53) {#key-takeaway-553}

Le point clé à retenir est qu'une fonction de hachage est fondamentalement comme une empreinte digitale. Si je tape quelque chose, cela va me donner de manière déterministe la sortie que j'attends. C'est ça, une fonction de hachage — bienvenue sur ETH.BUILD. Créons des trucs sympas et apprenons beaucoup de choses en cours de route.