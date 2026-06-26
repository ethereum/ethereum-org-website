---
title: "Les bases d'Ethereum : introduction"
description: "Une conférence d'introduction sur les fondamentaux d'Ethereum, couvrant ce qu'est Ethereum, en quoi il diffère de Bitcoin, et les concepts de base qui sous-tendent le réseau Ethereum."
lang: fr
youtubeId: "j78ZcIIpi0Q"
uploadDate: 2022-03-01
duration: "0:11:14"
educationLevel: beginner
topic:
  - "ethereum"
  - "intro"
format: presentation
author: Quezar
breadcrumb: "Les bases d'Ethereum"
---

Une conférence d'introduction par **Quezar** couvrant les fondamentaux d'Ethereum, y compris ce que sont les blockchains, comment elles fonctionnent sous le capot, et les composants clés qui constituent le réseau Ethereum.

*Cette transcription est une copie accessible de la [transcription originale de la vidéo](https://www.youtube.com/watch?v=j78ZcIIpi0Q) publiée par Quezar. Elle a été légèrement modifiée pour en faciliter la lecture.*

#### Bienvenue et aperçu de la série (0:03) {#welcome-and-series-overview-003}

Bienvenue dans cette nouvelle partie de la série sur Ethereum. Si vous cherchiez une bonne ressource pour comprendre comment Ethereum fonctionne sous le capot, vous êtes au bon endroit. Dans notre partie précédente, nous avons vu comment lire et écrire des contrats Solidity de base et avons brièvement discuté de quelques éléments concernant les différents composants du réseau Ethereum. Dans cette partie, nous allons explorer plus en détail l'architecture d'Ethereum et discuter de chaque composant de manière beaucoup plus approfondie. Nous avons beaucoup d'autres vidéos à venir, alors si vous aimez ce genre de contenu, cliquez sur le bouton J'aime et abonnez-vous pour être averti de la publication de la nouvelle vidéo.

#### Objectifs et prérequis (0:40) {#goals-and-prerequisites-040}

L'objectif de cette partie de la série est de vous donner une bonne compréhension de l'architecture d'Ethereum en une semaine. Comme pour la partie précédente, je l'ai structurée de manière à ce que d'ici sept jours, vous soyez beaucoup plus à l'aise avec tout ce qui se passe sur le réseau Ethereum chaque fois que quelqu'un y effectue une activité.

En ce qui concerne les prérequis, il n'y a rien de particulier que vous deviez déjà savoir. Si vous regardez cette vidéo, il est fort probable que vous en sachiez assez sur le réseau Ethereum pour ce qui concerne cette partie. Mais je vous recommanderais de terminer la partie précédente de la série — Les bases de Solidity — car cette partie est de nature beaucoup plus pratique. Vous avez l'occasion d'exécuter du code sur l'IDE Remix et de voir comment les choses fonctionnent réellement sur le réseau Ethereum. Cette partie sera principalement théorique, et si vous avez déjà couvert la partie précédente, vous trouverez beaucoup plus facile de la suivre.

#### Ce que nous allons couvrir (1:41) {#what-well-cover-141}

Dans cette partie, nous verrons ce que sont les blockchains et comment elles fonctionnent sous le capot. Nous verrons également quels composants constituent le réseau Ethereum, puis nous irons plus loin et discuterons de chaque composant beaucoup plus en détail.

Pour cette partie, j'ai utilisé la documentation officielle d'Ethereum comme base. Une fois que vous aurez terminé cette partie, vous aurez couvert la plupart des sujets fondamentaux de cette documentation. Vous aurez beaucoup plus de facilité à la parcourir. Évidemment, tout n'est pas dans les vidéos, mais j'ai essayé de couvrir l'ensemble des éléments dans les grandes lignes. Vous pouvez considérer cette partie comme une introduction à la documentation, qui est beaucoup plus approfondie.

#### Outils et approche (2:30) {#tools-and-approach-230}

Nous utiliserons également Etherscan pour voir comment chaque composant fonctionne en temps réel. Ne vous inquiétez pas si vous ne pouvez pas tout comprendre du premier coup — vous pouvez toujours revoir des sujets spécifiques quand vous en avez envie. Je vous recommanderais de faire de courtes pauses après chaque sujet afin de pouvoir mieux les assimiler. Commençons donc par comprendre ce que sont les blockchains.