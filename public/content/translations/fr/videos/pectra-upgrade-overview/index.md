---
title: "Qu'est-ce qui est inclus dans la mise à jour Pectra ?"
description: "Christine Kim parle de la mise à jour Pectra d'Ethereum, couvrant les EIP inclus dans la mise à jour, ce qu'ils changent au protocole, et pourquoi ils sont importants pour les utilisateurs, les développeurs et les validateurs."
lang: fr
youtubeId: "ufIDBCgdGwY"
uploadDate: 2024-11-14
duration: "0:20:46"
educationLevel: intermediate
topic:
  - "feuille de route"
  - "pectra"
  - "mises à jour"
format: presentation
author: Ethereum Foundation
breadcrumb: "Aperçu de Pectra"
---

Une présentation de **Christine Kim** à la Devcon SEA couvrant les EIP inclus dans la mise à jour Pectra d'Ethereum, ce qu'ils changent au protocole, quand l'activation sur le Réseau principal est attendue, et quels EIP ont été retirés de la portée.

*Cette transcription est une copie accessible de la [transcription originale de la vidéo](https://www.youtube.com/watch?v=ufIDBCgdGwY) publiée par la Fondation Ethereum. Elle a été légèrement modifiée pour en faciliter la lecture.*

#### Introduction (0:00) {#introduction-000}

Nous allons parler de tous les EIP qui seront inclus dans la mise à jour Pectra. Un petit avertissement avant de commencer : tout ce que je vais dire est purement informatif — à des fins d'information — et ne doit pas être interprété comme un conseil financier ou d'investissement.

#### Quand Pectra sera-t-elle sur le Réseau principal (0:23) {#when-is-pectra-mainnet-023}

Avant d'aborder ce qui est inclus dans Pectra, la question que l'on me pose le plus souvent est « quand Pectra sera-t-elle déployée sur le Réseau principal ? ». Je vais donc répondre à cette question tout de suite pour que nous puissions passer aux aspects techniques.

Il s'agit d'une analyse de calendrier très provisoire. Quand on me demande quand Pectra aura lieu, je réponds qu'il est trop tôt pour le dire — parce que c'est vrai. Pectra en est encore aux tout premiers stades de son développement. Les spécifications changent, et la portée de Pectra n'a pas encore été véritablement finalisée.

À travers ce processus, l'une des choses que vous pouvez apprendre est comment les mises à jour sont développées, comment elles sont testées, et finalement comment elles arrivent sur le Réseau principal. Initialement, les développeurs décident de quelques EIP à inclure dans une mise à jour, puis ils implémentent ces EIP sur des réseaux de test privés axés sur les développeurs, appelés devnets. Les développeurs ont déjà lancé quelques devnets pour Pectra, donc ces EIP ont déjà subi quelques cycles d'implémentation. Les développeurs ont remarqué des cas limites et des bugs qu'ils souhaitent corriger, et ils itèrent sur ces EIP en lançant de nouveaux devnets. Le devnet 4 a été lancé le mois dernier, en octobre.

Cela n'arrive pas d'habitude, mais les développeurs — tout spécialement pour cette conférence et pour tout le monde dans le public — ont lancé le premier réseau de test public de Pectra ce mois-ci. Il s'appelle Mekong, vous pouvez donc aller interagir avec certains des EIP qui seront dans Pectra dès maintenant. Il est basé sur les spécifications du devnet 4, mais veuillez noter que ces spécifications changent.

Il y a une liste de modifications de spécifications pour les EIP que les développeurs veulent déjà inclure dans le devnet 5 de Pectra — des choses comme la réévaluation du prix du précompilé BLS, et un nouvel EIP qui n'a pas été implémenté dans le devnet 4 mais que les développeurs visent à implémenter pour le devnet 5 ou une future mise à jour. Les spécifications de Pectra changent donc. Je prévois encore plusieurs autres devnets avant que les spécifications ne puissent vraiment être gelées.

L'autre partie qui est vraiment importante pour la mise à jour Pectra dans sa progression vers le Réseau principal est que la portée soit finalisée — que tous les EIP inclus dans Pectra soient décidés. Il y a un EIP — ce n'est pas encore vraiment un EIP — mais c'est l'augmentation de la capacité des blobs que les développeurs n'ont pas encore formellement incluse dans Pectra, mais il semble probable qu'ils incluent une sorte d'augmentation de la capacité des blobs car ils ont récemment inclus un EIP qui introduit un mécanisme pour mettre à jour la cible de gaz des blobs et le maximum de gaz des blobs de manière dynamique via la couche de consensus, plutôt que d'avoir ces paramètres codés en dur dans la couche d'exécution et la couche de consensus.

Une fois la portée finalisée, vous commencez à tester tous les nouveaux EIP que vous avez implémentés — la portée complète de la mise à jour Pectra — et vous les mettez à l'épreuve sur quelques devnets supplémentaires. J'envisage peut-être jusqu'au devnet 6 ou 7. Et puis, une fois que les spécifications de Pectra sont gelées et prêtes à l'emploi — que tous les cas limites que les développeurs peuvent trouver sur les devnets ont été trouvés — ils déploieront alors la mise à jour Pectra sur les réseaux de test publics d'Ethereum. Il y en a deux actuellement : Sepolia et Holesky.

Historiquement, les développeurs ont prévu environ deux semaines entre les mises à jour des réseaux de test publics. Dans de rares occasions, les développeurs ont réduit ce délai à une seule semaine entre les réseaux de test, mais en raison de la taille de Pectra, j'imagine que les développeurs voudront prendre tout le temps nécessaire. Je prévois environ un mois pour Sepolia et Holesky, et c'est après cela que vous pourrez enfin avoir l'activation sur le Réseau principal.

Compte tenu de toutes les informations que je connais actuellement et des progrès réalisés par les développeurs jusqu'à présent sur Pectra, ma meilleure analyse et estimation est que le déploiement de Pectra sur le Réseau principal aura lieu de manière réaliste en avril 2025. Encore une fois, c'est très provisoire car beaucoup de choses peuvent changer. Le développement se fait de semaine en semaine — les développeurs participent à ces appels ACD pour parler de ce bug inattendu dans tel EIP ou de ce nouvel EIP qu'ils veulent ajouter à Pectra.

#### EIP de la couche d'exécution (6:23) {#execution-layer-eips-623}

Passons au cœur de cette présentation — ce qui est inclus dans la mise à jour Pectra. Il y a dix EIP inclus dans Pectra, et quatre d'entre eux se concentrent sur la couche d'exécution.

**EIP-2537** est un nouveau précompilé dans l'EVM — les opérations sur la courbe BLS12-381. Il s'agit d'un nouveau schéma de signature cryptographique que les développeurs de contrats intelligents demandent depuis très longtemps. Cet EIP a été créé en 2020, et à l'époque, les développeurs d'applications décentralisées (dapp) disaient qu'ils le voulaient vraiment car il donnerait à certaines dapps qui s'appuient sur la cryptographie à divulgation nulle de connaissance des garanties de confidentialité plus fortes, et potentiellement une sécurité et une évolutivité accrues. Les signatures BLS sont également l'agrégation qui se produit sur la couche de consensus pour les attestations des validateurs. Cet EIP est attendu depuis longtemps. L'une des préoccupations est la suivante : y a-t-il encore des applications qui attendent le précompilé BLS, et vont-elles l'utiliser lorsqu'il sera mis en ligne ? Mais si vous êtes dans le public et que vous ne saviez pas que le précompilé BLS arrive enfin — il arrive.

**EIP-2935** — servir les hachages de blocs historiques à partir de l'état. Celui-ci introduit un changement dans la couche d'exécution tel que les preuves de blocs historiques peuvent être générées à partir de l'état. Il présente des avantages à court terme pour la synchronisation des clients légers et pour les contrats intelligents qui pourraient vouloir utiliser des données sur l'état d'un bloc antérieur directement via l'EVM — vous ne pouvez pas vraiment faire cela actuellement. Mais ces avantages à court terme ne sont pas la raison principale pour laquelle cet EIP a été inclus dans Pectra. La raison principale est qu'il s'agit d'un prérequis pour Verkle — la refonte majeure de la structure de données de l'état d'Ethereum. Les développeurs pensaient que cette transition allait se produire juste après Pectra, mais Verkle ne sera pas inclus dans Fusaka. Ils l'ont repoussé à une autre mise à jour, mais cette étape a déjà été cochée sur la liste.

**EIP-7685** — requêtes de la couche d'exécution à usage général. Cet EIP n'introduit pas vraiment de nouvelles fonctionnalités dans Ethereum — c'est un EIP pour soutenir d'autres EIP dans Pectra. Dans Pectra, il y a quelques EIP où la couche d'exécution sera capable de transmettre beaucoup plus de messages — différents types de messages — à la couche de consensus qu'elle ne le pouvait auparavant. Les contrats intelligents sur la couche d'exécution pourront déclencher des retraits, des consolidations et des dépôts de validateurs. Plutôt que d'implémenter ces nouveaux canaux de communication de manière séparée et unique, cet EIP crée une structure généralisée — un bus généralisé — pour héberger ces requêtes. Ce sera plus facile à tester, plus facile à implémenter sur les différents clients, et plus facile à standardiser, surtout si les développeurs veulent introduire de nouveaux types de requêtes déclenchables par la couche d'exécution.

**EIP-7702** — définir le code pour les comptes détenus par des entités externes (EOA). Un nouveau type de transaction arrive sur Ethereum. Ce type de transaction permettra temporairement à un EOA d'avoir une plus grande flexibilité, permettant des fonctionnalités telles que le traitement par lots de transactions, les transactions sponsorisées, les transactions conditionnelles et la sécurité déléguée. Vous vous demandez peut-être : « est-ce la vision de l'abstraction de compte qui prend vie sur Ethereum ? » Non, ce n'est pas le cas — c'est un petit pas. C'est une première étape pour voir à quoi pourrait ressembler la véritable feuille de route vers une véritable abstraction de compte native sur Ethereum. Il y a eu pas mal de débats sur la façon dont les développeurs devraient franchir cette première étape, et beaucoup de controverses autour de son intégration et de sa conception — mais il est inclus.

#### EIP de la couche de consensus (12:00) {#consensus-layer-eips-1200}

Il y en a six autres — ce sont des EIP de la couche de consensus.

**EIP-7742** — découpler le nombre de blobs entre la couche de consensus et la couche d'exécution. C'est l'EIP le plus récent à être inclus dans Pectra. Actuellement, la capacité des blobs est codée en dur dans la couche d'exécution et la couche de consensus dans tous les différents clients. Mettre à jour ce codage en dur n'est pas aussi facile que certains pourraient le penser. Créer un mécanisme pour définir dynamiquement la capacité des blobs via la couche de consensus garantira qu'à l'avenir, les développeurs pourront facilement modifier la capacité des blobs d'Ethereum, et qu'une telle mise à jour ne nécessitera que des modifications de la couche de consensus — et non des modifications des deux couches.

**EIP-6110** — fournir les dépôts des validateurs onchain. La Fusion a eu lieu et Ethereum est plus mature en tant que chaîne de blocs à preuve d'enjeu (PoS). Certaines hypothèses de sécurité peuvent désormais être assouplies. Cet EIP supprime un cycle de vote supplémentaire qui se produit du côté de la couche de consensus chaque fois que vous déposez 32 ETH sur le contrat de dépôt, garantissant que toute la validation des dépôts se fait sur la couche d'exécution. Cela présente des avantages pour l'expérience utilisateur des validateurs — cela réduira le temps entre le moment où vous déposez vos 32 ETH et le moment où vous voyez le validateur réellement activé sur la chaîne balise.

**EIP-7002** — retraits déclenchables par la couche d'exécution. C'est une très bonne chose pour les pools de staking. Actuellement, si vous souhaitez retirer complètement un validateur, l'opérateur de nœud qui gère ce validateur doit utiliser sa clé de retrait pour effectuer une sortie complète du validateur. Grâce à cet EIP, les contrats intelligents pourront initier ces retraits complets. C'est une hypothèse de confiance que vous pouvez désormais retirer des pools de staking — des entités comme Lido, Rocket Pool et d'autres pools de staking basés sur des contrats intelligents peuvent désormais déclencher des retraits complets de validateurs s'ils le souhaitent.

**EIP-7251** — augmenter le solde effectif maximum. C'est vraiment un problème. Lorsque les développeurs réfléchissaient à la chaîne balise, ils ne s'attendaient pas à ce que l'ensemble des validateurs se développe si rapidement — nous en sommes à environ 1,2 ou 1,3 million de validateurs. Il y a beaucoup de validateurs actifs, beaucoup de messages qui circulent sur la couche réseau, et c'est trop. Cela met les nœuds à rude épreuve, et si rien n'est fait, ce serait un problème majeur pour la santé d'Ethereum. L'EIP-7251 est conçu pour encourager les validateurs à consolider leurs ETH et à avoir un solde effectif maximum (MaxEB) supérieur à 32 ETH, réduisant ainsi le nombre de validateurs actifs sur Ethereum.

**EIP-7549** — déplacer l'indice du comité en dehors de l'attestation. Il s'agit d'une restructuration et d'une refonte de la façon dont les attestations sont agrégées pour réduire la charge réseau sur Ethereum et économiser la bande passante des nœuds. Lorsque les développeurs ont inclus cela dans Pectra, ils pensaient que c'était un excellent changement avec de merveilleux avantages et qu'il serait facile à réaliser — mais en pratique, il s'est avéré beaucoup plus difficile à implémenter que prévu.

#### Résumé (17:19) {#summary-1719}

Pectra est un ensemble hétéroclite de mises à jour. Elle va faire trois choses : premièrement, corriger les lacunes critiques d'Ethereum en tant que chaîne de blocs à preuve d'enjeu — pensez au MaxEB, c'est une correction critique car la taille de l'ensemble des validateurs peut continuer à croître de manière incontrôlée. Deuxièmement, améliorer l'expérience utilisateur — le nouveau type de transaction, des conceptions plus flexibles, quelques améliorations pour des conceptions plus sans tiers de confiance pour les pools de staking. Et troisièmement, augmenter la capacité de disponibilité des données d'Ethereum — cela n'a pas été formellement inclus dans Pectra mais semble probable.

#### EIP retirés de Pectra (18:02) {#eips-removed-from-pectra-1802}

Voici tous les EIP qui ont été retirés de Pectra. C'est un peu une première pour une mise à jour d'avoir autant d'EIP retirés.

**PeerDAS** — il devait y avoir une augmentation beaucoup plus importante de la capacité de disponibilité des données dans Pectra initialement. PeerDAS permettrait aux développeurs d'augmenter la cible de blobs d'Ethereum de plusieurs multiples sans impacter grandement la consommation de bande passante et les exigences de calcul pour faire fonctionner un nœud Ethereum. Mais il est encore en phase de recherche et développement.

**EOF** — le format d'objet EVM (EVM Object Format). Ces onze modifications de code regroupées constituent une mise à jour majeure de l'EVM d'Ethereum. PeerDAS et EOF étaient vraiment initialement inclus dans Pectra mais étaient testés sur des devnets séparés. Les développeurs ont pensé qu'ils nécessiteraient beaucoup plus de temps pour être prêts pour l'activation sur le Réseau principal, et ils ne voulaient pas retarder les autres EIP de Pectra. Ils ont donc dit que PeerDAS et EOF avaient clairement besoin de plus de temps — ils les repousseront à une autre mise à jour et ne retiendront pas les autres EIP de Pectra du Réseau principal.

Ceux-ci sont maintenant déplacés vers Fusaka. Verkle était initialement prévu pour Fusaka mais a depuis été encore retardé. EOF et PeerDAS sont dans Fusaka pour le moment. Il y a d'autres EIP que les développeurs reconsidéreront pour inclusion dans Fusaka — la transition SSZ, les listes d'inclusion, les changements liés à l'émission, l'expiration de l'historique, l'ePBS, et la direction de l'abstraction de compte.

#### Questions et réponses (22:02) {#qa-2202}

**Animateur :** À quand EOF ?

**Christine Kim :** Je viens littéralement de dire que les développeurs vont essayer de l'intégrer dans Fusaka. Est-ce que je pense que c'est probable ? Probablement pas. Est-ce que je pense que Fusaka aura lieu en 2025 ? Absolument pas. Vu le temps qu'il a fallu pour préparer Pectra — Fusaka prendra un temps similaire, voire plus long.

**Animateur :** Y a-t-il une voie d'urgence pour augmenter la cible de blobs d'ici l'activation de Pectra ?

**Christine Kim :** Non. La cible de blobs est un paramètre codé en dur dans la couche d'exécution et la couche de consensus. Pour que la capacité des blobs change, les développeurs doivent faire un hard fork. Je ne pense pas qu'il y ait un moyen pour que la capacité des blobs augmente d'ici Pectra sans un hard fork.

**Animateur :** La proposition vise-t-elle à modifier uniquement la limite de blobs ou également la cible de blobs ?

**Christine Kim :** Excellente question. L'augmentation la plus prudente est de trois à quatre — en changeant juste la cible, sans changer le maximum du tout. Mais ce n'est pas ce que les développeurs de couche 2 (l2) ont demandé. Il y a un représentant de l'équipe Base — l'équipe Base de Coinbase — et il a fait pression pour des augmentations plus agressives. Il a montré des données suggérant que l'augmentation n'aurait pas d'impact négatif sur la décentralisation d'Ethereum. Il y a une proposition prudente pour changer juste la cible, et puis il y a une proposition plus ambitieuse pour changer à la fois le maximum et la cible — comme huit et quatre, ou six et douze. Il y a différents niveaux.

**Animateur :** Vous avez exhorté les gens à s'impliquer davantage dans la gouvernance. Comment la communauté peut-elle s'impliquer davantage ?

**Christine Kim :** ETH Research et ETH Magicians sont deux très bons forums de discussion pour voter pour certains EIP et montrer votre soutien. Les appels ACD sont probablement l'endroit avec le signal le plus fort — tout ce que vous avez à faire est de laisser un commentaire sur l'ordre du jour de l'appel ACD sur GitHub et de dire que c'est un EIP dont vous aimeriez parler ou que vous aimeriez présenter. Le modérateur de l'appel est généralement très disposé à vous accorder du temps. Ne prenez pas trop de temps cependant — peut-être cinq minutes pour dire ce que vous avez à dire.