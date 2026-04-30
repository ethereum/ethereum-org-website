---
title: "Paire de clés — ETH.BUILD"
description: "Une démonstration des paires de clés publique-privée à l'aide de l'outil éducatif ETH.BUILD. Comprenez comment les paires de clés cryptographiques sécurisent les comptes Ethereum et permettent la signature de transactions."
lang: fr
youtubeId: "9LtBDy67Tho"
uploadDate: 2021-01-14
duration: "0:04:05"
educationLevel: beginner
topic:
  - "accounts"
  - "cryptography"
format: tutorial
author: Austin Griffith
breadcrumb: "Paires de clés (ETH.BUILD)"
---

Un tutoriel d'**Austin Griffith** démontrant le fonctionnement des paires de clés publique-privée à l'aide de l'outil de programmation visuelle ETH.BUILD, couvrant la génération de clé privée, la dérivation de clé publique, la signature de message et la récupération de signature.

*Cette transcription est une copie accessible de la [transcription originale de la vidéo](https://www.youtube.com/watch?v=9LtBDy67Tho) publiée par Austin Griffith. Elle a été légèrement modifiée pour en faciliter la lecture.*

### La clé privée (0:00) {#the-private-key-000}

Dans la première vidéo, nous avons utilisé un hash, et les hashs seront importants pour la suite. Mais l'élément suivant le plus important est une paire de clés. L'élément le plus important d'une paire de clés est la clé privée. Allons-y et générons-en une — il s'agit essentiellement d'une chaîne hexadécimale aléatoire de 64 caractères, de la même taille que le hash avec lequel nous venions de travailler.

Vous commencez avec cela comme clé privée, puis en utilisant la cryptographie sur les courbes elliptiques — allez voir sur Wikipedia en guise de quête secondaire — nous dérivons une clé publique. Nous avons donc maintenant une clé privée et une clé publique. Nous venons de générer une clé privée à partir de rien, et la clé publique nous donne une adresse. C'est là que les gens pourraient réellement envoyer de l'argent. Quand quelqu'un dit « envoyez à mon adresse Ethereum », c'est de cela qu'il s'agit.

Si je voulais créer un compte chez Wells Fargo, je devrais me rendre à la banque et leur donner un tas d'informations. Cela prendrait un certain temps. Mais pour générer un compte dans un système cryptographique comme celui-ci, où je peux envoyer et recevoir de l'argent, je génère simplement cette clé privée. Cette clé privée hexadécimale de 64 caractères dérive tout le reste.

### Signer et récupérer des messages (1:54) {#signing-and-recovering-messages-154}

Il y a une propriété vraiment intéressante concernant cette paire de clés que nous devrions explorer, et c'est la signature et la récupération de messages. En gros, vous prenez votre clé privée et vous l'utilisez pour signer un message quelconque. Tapons un message — « l'ours est collant de miel ».

Nous insérons cela comme notre message, et avec la signature automatique activée, cela nous renvoie une signature. Un peu comme le hash, notre signature consiste essentiellement à prendre le message et notre clé privée et à signer quelque chose. Ce que nous en retirons est une signature.

Je peux envoyer cela au monde entier — je pourrais l'envoyer publiquement à tout le monde — cette chaîne de signature avec le message. Ce que n'importe qui peut faire avec des mathématiques, c'est vérifier que c'est bien moi qui l'ai signé.

### Récupérer l'adresse du signataire (3:17) {#recovering-the-signers-address-317}

Laissez-moi vous montrer comment cela fonctionne. Nous utilisons une méthode de « récupération » (recover). Nous avons besoin de deux entrées : le message — « l'ours est collant de miel » — et la signature. Ce qui en ressort est l'adresse qui a été utilisée pour le signer. Nous pouvons voir visuellement que le compte a signé ce message en utilisant les identicons Blockie.

Il n'y a aucun moyen de falsifier cela. Si quelqu'un change ne serait-ce qu'un seul mot — comme remplacer « ours » par « blaireau » — tout change. Même avec la même signature, un message différent recrache une adresse différente, et non la bonne.

Ce message ne peut pas être falsifié. Nous pourrions y ajouter un horodatage — nous pourrions dire « ce jour-là, je prédis que quelque chose va se passer », le signer, publier la signature et le message, et n'importe qui pour le reste des temps pourra prouver mathématiquement que vous avez signé ce message à ce moment-là.

### La propriété clé d'une paire de clés (4:58) {#the-key-property-of-a-key-pair-458}

C'est la propriété clé d'une paire de clés. Une paire de clés générée à partir de rien de plus qu'une chaîne aléatoire hexadécimale de 64 caractères peut être utilisée pour signer un message, et ensuite ce message peut être récupéré.

- Clé privée + message = signature
- Signature + message = adresse publique

Nous pouvons signer des données avec notre clé privée, et les gens peuvent prouver que c'est nous qui les avons signées. Ce sera un élément important pour la prochaine étape.