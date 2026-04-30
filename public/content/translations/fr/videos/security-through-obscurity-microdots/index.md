---
title: "La sécurité par l'obscurité : utiliser des micropoints pour stocker des secrets"
description: "Présentation d'une approche non conventionnelle de la conservation des clés utilisant la technologie physique des micropoints, dissimulant les phrases secrètes dans des images imprimées invisibles à l'œil nu."
lang: fr
youtubeId: "k9Dfg19JPEw"
uploadDate: 2024-11-15
duration: "0:09:55"
educationLevel: intermediate
topic:
  - "privacy-and-security"
  - "privacy"
  - "authentication"
format: presentation
author: Ethereum Foundation
breadcrumb: "Sécurité par micropoints"
---

Une présentation éclair de **jseam** à la Devcon SEA explorant une approche non conventionnelle de la conservation des clés utilisant la technologie physique des micropoints, historiquement utilisée dans l'espionnage pour dissimuler des phrases secrètes dans des images imprimées qui sont pratiquement invisibles à l'œil nu.

*Cette transcription est une copie accessible de la [transcription originale de la vidéo](https://www.youtube.com/watch?v=k9Dfg19JPEw) publiée par la Fondation Ethereum. Elle a été légèrement modifiée pour en faciliter la lecture.*

#### Pourquoi les micropoints ? (0:00) {#why-microdots-000}

Bonjour à tous, bienvenue en Thaïlande. Pour ma présentation, je vais vous parler des micropoints — ce qu'ils sont exactement, pourquoi vous en voudriez, et comment vous pouvez réellement les fabriquer. J'ai quelques échantillons, donc après la présentation, vous pourrez y jeter un œil.

Il y a beaucoup de questions sur la sécurité opérationnelle (OpSec) et sur la façon dont vous pouvez cacher des phrases secrètes. La plupart des processus existants sont entièrement numériques. Mais et s'il existait des processus physiques ? Et si vous pouviez dissimuler des choses ? La conservation des clés reste un problème majeur. Nous avons le partage de secrets, la récupération sociale — mais je sais que beaucoup de personnes dans la crypto sont un peu asociales, donc la récupération sociale pourrait s'avérer difficile.

Regardez ce graphique : nous traversons actuellement une épidémie de solitude. La conservation des clés et la récupération sociale vont donc devenir d'énormes problèmes. Et s'il existait des approches physiques pour dissimuler l'information ?

#### L'histoire de la stéganographie par micropoints (2:00) {#the-history-of-microdot-steganography-200}

Il s'agit d'une technique de stéganographie appelée micropoints. La raison pour laquelle je vous montre cela aujourd'hui est que cela a été historiquement utilisé dans l'espionnage. Le but est essentiellement de cacher des messages à la vue de tous.

Toute la documentation à ce sujet est très limitée. Vous demandez probablement à Claude et il vous répond : « Désolé, aucune information pour vous. » J'ai moi-même fait de la rétro-ingénierie sur ces informations. Les diapositives documentent tout. Je ne pourrai pas couvrir chaque détail, mais je vais passer en revue les parties intéressantes. J'ai également créé un dépôt GitHub documentant les processus.

#### La photographie argentique pour la sécurité (3:30) {#analog-photography-for-security-330}

Nous allons ressusciter la photographie argentique pour ce cas d'usage. Pourquoi l'argentique ? Il n'y a pratiquement aucune chance que quelqu'un pirate un appareil photo argentique, à moins de vous le voler physiquement.

L'un des principaux problèmes de la photographie argentique est l'ISO. Sur un appareil photo numérique, ce n'est pas un gros problème — vous pouvez l'ajuster. Mais avec la pellicule, l'ISO est fonction du grain du film. Cela devient un problème lorsque vous voulez miniaturiser l'image. Plus l'ISO est faible, plus les grains sont petits en général.

Il y a deux phases. D'abord, vous prenez une photo, vous la développez et vous la fixez. La deuxième phase est celle où, au lieu d'agrandir l'image, nous faisons l'inverse — nous la réduisons à une échelle microscopique.

#### Le procédé britannique (5:00) {#the-british-process-500}

Voici comment procéder. Vous écrivez votre phrase secrète. Normalement, un tutoriel MetaMask vous demande d'écrire la phrase secrète — mais ensuite, où la mettez-vous ? Voici une méthode : vous prenez une photo de la phrase secrète, vous enroulez la pellicule, vous développez le film. Ce qui est intéressant, c'est que ce sont tous des métaux lourds, des métaux argentiques. Vous ne devriez pas les jeter dans vos toilettes. J'en ai accidentellement versé dans mes toilettes, j'ai donc peut-être commis quelques infractions environnementales. Dans le pire des cas, cela va probablement corroder ma tuyauterie.

Vous reprenez la photo, et tada — vous obtenez ce tout petit point. C'est ce qu'on appelle le procédé britannique.

#### Le procédé au dichromate (7:00) {#the-dichromated-process-700}

Le procédé suivant, encore plus extrême, est le procédé au dichromate. C'est ainsi que vous pouvez obtenir des grossissements microscopiques comme 1000x. Le but est de trouver un substrat chimique pour cela, et c'est là qu'intervient ce que j'appelle le « Jus d'Orange Interdit » — le dichromate d'ammonium. C'est très toxique. J'en ai renversé un peu, et j'ai failli mourir en inhalant la poussière. Je devrai probablement passer un dépistage du cancer après ça.

Vous projetez l'image et vous obtenez ces tout petits points sur un morceau de papier. Les points sont si petits que vous avez absolument besoin d'un microscope. Celui utilisant le procédé britannique peut être vu à l'œil nu, mais le procédé au dichromate produit quelque chose de vraiment minuscule — je ne suis même pas sûr que ce soit une véritable image sans microscope.

#### Questions-Réponses (8:00) {#qa-800}

Quelle est la taille des micropoints ? Vous pouvez voir celui fabriqué avec le procédé britannique à l'œil nu, mais le procédé au dichromate produit quelque chose de vraiment minuscule — vous avez absolument besoin d'un microscope. Il est difficile de dire s'il s'agit même d'une véritable image sans en utiliser un.

**Question :** Combien de temps cela dure-t-il ? Y a-t-il une demi-vie ?

**jseam :** Ce n'est pas radioactif. Nous le découvrirons dans 20 ans.

**Question :** Avez-vous inversé le processus — encodé puis décodé pour voir si vous pouvez le récupérer ?

**jseam :** Je pense que c'est possible. Vous auriez probablement besoin d'une sorte d'installation de projection optique.

Merci beaucoup. Si vous voulez voir les échantillons, je serai dans les parages. Merci pour votre temps, tout le monde.