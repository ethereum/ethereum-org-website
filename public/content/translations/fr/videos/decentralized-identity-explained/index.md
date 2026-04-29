---
title: "L'identité décentralisée expliquée"
description: "Une explication sur la façon dont l'identité décentralisée donne aux utilisateurs plus de contrôle sur leur identité numérique, et garde les informations personnelles sur Internet plus en sécurité en utilisant des identifiants basés sur la blockchain."
lang: fr
youtubeId: "Ew-_F-OtDFI"
uploadDate: 2022-04-12
duration: "0:05:22"
educationLevel: beginner
topic:
  - "identity"
format: explainer
author: Microsoft Security
breadcrumb: "Identité décentralisée"
---

Une explication par **Microsoft Security** sur la façon dont l'identité décentralisée donne aux utilisateurs plus de contrôle sur leurs identifiants numériques, couvrant les problèmes avec les identifiants numériques actuels, le fonctionnement des identifiants vérifiables (Verifiable Credentials) et des identifiants décentralisés (Decentralized Identifiers), et ce que cela signifie pour la confidentialité en ligne.

*Cette transcription est une copie accessible de la [transcription originale de la vidéo](https://www.youtube.com/watch?v=Ew-_F-OtDFI) publiée par Microsoft Security. Elle a été légèrement modifiée pour en faciliter la lecture.*

#### Le problème avec les identifiants numériques (0:02) {#the-problem-with-digital-credentials-002}

Chaque jour, nous transportons des portefeuilles remplis de cartes. Cependant, seules quelques-unes — comme les pièces d'identité gouvernementales et les cartes de crédit — sont largement acceptées. Notre société a établi des normes mondiales sur la façon dont nous présentons et vérifions les identifiants que ces cartes physiques représentent. Mais il n'y a pas de véritable équivalent pour les identifiants numériques.

Pourquoi pas ? Tout d'abord, il n'y a pas de mécanisme standard pour émettre des cartes numériques. Pour émettre des cartes ou des identifiants numériques universellement acceptables, nous avons besoin d'identifiants numériques que les individus peuvent posséder indépendamment de toute entité, organisation ou institution. Actuellement, nous utilisons des adresses e-mail et des numéros de téléphone comme identifiants pour accéder aux sites web et aux applications. Mais notre accès à ces identifiants, et à nos informations personnelles, est à la merci des fournisseurs de services qui peuvent les révoquer à tout moment.

Deuxièmement, il n'existe pas de normes universellement acceptées pour exprimer, échanger et vérifier les identifiants numériques au-delà des frontières organisationnelles.

#### Comment fonctionne l'identité décentralisée (1:03) {#how-decentralized-identity-works-103}

Tout cela est sur le point de changer. Une nouvelle forme d'identité numérique, basée sur des normes émergentes telles que les identifiants vérifiables et les identifiants décentralisés, peut permettre aux identifiants numériques de fonctionner partout, d'être plus dignes de confiance et de respecter la confidentialité.

Voici comment cela fonctionne. Rencontrez Alice. Son nouveau portefeuille numérique lui permet de posséder et de contrôler ses identifiants. Comme il n'est lié à aucune organisation en particulier, des sources faisant autorité peuvent émettre en toute confiance des identifiants basés sur des normes à Alice. Lorsqu'Alice présente ces identifiants, les sites web et les applications peuvent vérifier qu'ils sont valides — par exemple, en confirmant auprès d'une université qu'elle y est étudiante — et lui accorder l'accès en conséquence.

#### Confiance cryptographique (1:51) {#cryptographic-trust-151}

Bien que ce processus puisse être plus facile, comment savons-nous qu'il est digne de confiance ? Les identifiants décentralisés s'appuient sur des systèmes cryptographiques éprouvés. Lorsqu'Alice présente ses identifiants, son portefeuille numérique génère un identifiant unique et le signe à l'aide d'une clé privée sécurisée par une preuve biométrique ou un code PIN qu'elle seule connaît. La clé publique associée de manière unique est publiée sur un registre distribué.

Alice peut présenter sa carte d'étudiant numérique à une librairie, et avant d'accorder une réduction, la librairie peut confirmer que l'université a bien délivré la carte à Alice.

#### Confidentialité et contrôle (2:27) {#privacy-and-control-227}

Cette expérience imite ce qu'Alice fait aujourd'hui. Elle peut présenter et authentifier numériquement un ensemble d'identifiants vérifiables tout comme elle présenterait une carte physique. Et elle peut les révoquer d'un simple clic, tout comme elle remettrait une carte dans son portefeuille.

Mieux encore, ces cartes numériques sont privées. Cela donne à Alice le contrôle exclusif de son identité numérique — c'est elle qui prend les décisions la concernant. Les identifiants vérifiables permettront de garder plus facilement le contrôle et contribueront à débloquer un Internet plus digne de confiance qui respecte la confidentialité pour nous tous.