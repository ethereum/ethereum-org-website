---
title: "Cryptoéconomie : preuve d'autorité"
description: "Une conférence sur la cryptoéconomie expliquant le mécanisme de consensus de preuve d'autorité (PoA), couvrant son fonctionnement, ses compromis par rapport à la preuve de travail et à la preuve d'enjeu, et où il est utilisé en pratique."
lang: fr
youtubeId: "Mj10HSEM5_8"
uploadDate: 2018-10-19
duration: "0:09:18"
educationLevel: intermediate
topic:
  - "consensus"
  - "proof-of-authority"
format: presentation
author: Cryptoeconomics Study
breadcrumb: "Preuve d'autorité"
---

Une conférence sur la cryptoéconomie par **Cryptoeconomics Study** expliquant le mécanisme de consensus de preuve d'autorité (PoA), y compris la façon dont une autorité centrale détermine l'ordre des transactions, les problèmes de double dépense et de censure que cela introduit, et l'approche d'atténuation par multi-signature.

*Cette transcription est une copie accessible de la [transcription originale de la vidéo](https://www.youtube.com/watch?v=Mj10HSEM5_8) publiée par Cryptoeconomics Study. Elle a été légèrement modifiée pour en faciliter la lecture.*

#### Comment fonctionne la preuve d'autorité (0:00) {#how-proof-of-authority-works-000}

Bienvenue dans la section 2.4 — la preuve d'autorité (PoA) — où nous rétablissons cette autorité centrale pour déterminer l'ordre des transactions et résoudre ce petit problème agaçant de double dépense.

Il était une fois une autorité centrale que tout le monde appréciait plus ou moins. Ils approuvaient tous cette grande autorité et disaient : « Pourquoi ne pas simplement l'écouter ? Nous avions ces problèmes et nous ne sommes pas d'accord sur le bon état, alors laissons-la simplement nous dire quel est l'état. »

Notre autorité centrale exécute son gros nœud, et maintenant les gens signent des transactions et au lieu de se les envoyer directement, ils les envoient à l'autorité centrale. L'autorité centrale applique chaque transaction et la signe elle-même, en disant : « Oui, j'approuve — c'est la transaction zéro. » L'autorité centrale l'envoie ensuite à tout le monde, et tout le monde reçoit la transaction et l'accepte comme parole d'évangile.

#### Le problème de la double dépense (1:05) {#the-double-spend-problem-105}

Maintenant, essayons la double dépense. Que va-t-il se passer ? Mallory va envoyer deux transactions conflictuelles à l'autorité centrale. L'autorité centrale reçoit la première et signe que c'est la deuxième transaction qu'elle a vue, puis signe que c'est la troisième transaction qu'elle a vue, et propage ensuite ces messages.

Que se passe-t-il ? Tout le monde reçoit les mêmes messages, et ils observent tous l'ordre de l'autorité centrale. Cela signifie qu'ils se retrouvent tous avec les mêmes historiques. Si nous regardons les états, nous nous en sortons bien — Alice envoie à Jing, puis Mallory envoie à Alice, puis Mallory essaie d'envoyer à Jing, mais celle-ci ne passe pas car Mallory n'a pas assez d'argent. Leurs soldes vont tous être les mêmes. Ils sont tous en consensus. L'autorité centrale — super, nous avons réussi.

#### Lorsque l'autorité est compromise (2:09) {#when-the-authority-is-compromised-209}

Mais le problème est que nous devons faire confiance à l'autorité centrale pour fournir cet ordre des transactions. Alors que se passe-t-il si l'autorité centrale est évincée et qu'il s'avère qu'elle était Mallory depuis le début ?

Nous retombons dans les mêmes problèmes que nous avions auparavant. Premièrement, les doubles dépenses — Mallory signe simplement les deux transactions conflictuelles en disant qu'elles se produisent toutes les deux en même temps. Nous ne savons pas laquelle vient en premier. Mallory les propage de manière sélective et perturbe les nœuds, et ils perdent leur accord.

L'autre problème est la censure. C'est un nouveau problème avec notre chaîne de preuve d'autorité (PoA). Et si Mallory n'aime pas Alice ? Alice essaie d'envoyer une transaction et l'autorité centrale la regarde simplement, remarque que c'est Alice, et la jette. Alice essaie de l'envoyer à nouveau, et elle est encore jetée. Alice ne sait pas ce qui se passe — ses transactions ne passent pas. Censure réussie, et nous revoilà dans la douleur.

#### Atténuation avec la multi-signature (3:21) {#mitigating-with-multi-signature-321}

Ne vous inquiétez pas trop — il existe une atténuation potentielle. Nous pouvons décentraliser politiquement l'autorité. Cela rendra théoriquement plus difficile pour Mallory d'en prendre le contrôle. Donc, au lieu d'une seule autorité centrale, nous avons quatre autorités différentes. Elles représentent peut-être toutes des intérêts différents de différentes parties, et elles doivent toutes se réunir pour approuver les transactions.

C'est ce qu'on appelle un multi-sig — une multi-signature. Elles reçoivent une transaction d'Alice à Jing, et la première signe en disant : « J'ai vu ce message et j'approuve. » Puis la deuxième signe, et la troisième. Nous pouvons dire que nous acceptons un multi-sig de deux sur quatre, ou trois sur quatre, ou peut-être que nous exigeons toutes les parties — quatre sur quatre. C'est à vous de décider lors de la conception de votre multi-sig.

Cela signifie que la transaction passe et qu'elle a été approuvée par les autorités.

#### Limites de la preuve d'autorité (4:32) {#limitations-of-proof-of-authority-432}

Mais que se passe-t-il si toutes ces autorités deviennent des Mallory ? Nous avons exactement les mêmes problèmes — doubles dépenses et censure. Ce n'est donc pas parfait. Cependant, c'est mieux à certains égards qu'un processeur de paiement centralisé car au moins les utilisateurs exécutent eux-mêmes toutes les transactions. Ils peuvent éventuellement détecter une double dépense, mais nous avons toujours nos problèmes. Nous pouvons techniquement toujours faire une double dépense et nous pouvons techniquement toujours censurer.

Il n'y a pas d'accès ouvert — il peut être difficile de devenir l'une de ces autorités. Et il n'y a pas de pénalités dans le protocole si des doubles dépenses ou de la censure se produisent. Il n'y a rien dans le protocole qui pénalisera ces figures d'autorité.

#### Ce qui vient ensuite (5:19) {#what-comes-next-519}

Notre sage Alice décide donc qu'il y a un autre moyen — se débarrasser de l'autorité. Qui en a besoin ? Au lieu de cela, nous permettons à quiconque de devenir un mineur et de participer au protocole de consensus. Cela donne un accès ouvert pour participer, fournit des récompenses économiques pour un bon comportement — former un consensus d'une manière qui fonctionne — et fournit des pénalités économiques pour un mauvais comportement, où nous le détectons et brûlons les pièces des gens.

Mais c'est ce qui vient ensuite dans la preuve de travail (PoW) — la conception de mécanismes pour le chapitre 3.