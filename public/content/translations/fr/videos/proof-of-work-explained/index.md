---
title: "Qu'est-ce que la preuve de travail ?"
description: "Une explication accessible aux débutants du mécanisme de consensus de preuve de travail (PoW), y compris la façon dont les mineurs résolvent des énigmes cryptographiques pour valider les transactions et sécuriser le réseau de la chaîne de blocs."
lang: fr
youtubeId: "3EUAcxhuoU4"
uploadDate: 2019-02-22
duration: "0:05:31"
educationLevel: beginner
topic:
  - "consensus"
  - "pow"
format: explainer
author: Binance Academy
breadcrumb: "Preuve de travail"
---

Une explication par **Binance Academy** couvrant le mécanisme de consensus de preuve de travail (PoW), y compris ses origines, la façon dont les mineurs s'affrontent pour résoudre des énigmes cryptographiques, et comment il sécurise le réseau de la chaîne de blocs.

*Cette transcription est une copie accessible de la [transcription originale de la vidéo](https://www.youtube.com/watch?v=3EUAcxhuoU4) publiée par Binance Academy. Elle a été légèrement modifiée pour en faciliter la lecture.*

#### Origines de la preuve de travail (0:00) {#origins-of-proof-of-work-000}

Remontant à l'origine à 1993, le concept de preuve de travail a été développé pour prévenir les attaques par déni de service et autres abus de service tels que le spam sur un réseau, en exigeant un certain travail de la part de l'utilisateur du service — ce qui signifie généralement du temps de traitement par un ordinateur.

En 2009, Bitcoin a introduit une manière innovante d'utiliser la preuve de travail comme algorithme de consensus pour valider les transactions et diffuser de nouveaux blocs sur la chaîne de blocs. Il s'est depuis répandu pour devenir un algorithme de consensus largement utilisé dans de nombreuses cryptomonnaies.

#### Comment fonctionne la preuve de travail (0:33) {#how-proof-of-work-works-033}

En bref, les mineurs sur un réseau s'affrontent pour résoudre des énigmes informatiques complexes. Ces énigmes sont difficiles à résoudre mais faciles à vérifier une fois que quelqu'un a trouvé la bonne solution.

Une fois qu'un mineur a trouvé la solution à l'énigme, il peut diffuser le bloc sur le réseau, où tous les autres mineurs vérifieront que la solution est correcte.

#### Exemple de minage de Bitcoin (0:56) {#bitcoin-mining-example-056}

Bitcoin est un système basé sur une chaîne de blocs maintenu par le travail collectif de nœuds décentralisés. Certains de ces nœuds sont connus sous le nom de mineurs et sont responsables de l'ajout de nouveaux blocs à la chaîne de blocs.

Pour ce faire, les mineurs doivent essayer de deviner un nombre pseudo-aléatoire connu sous le nom de nonce. Ce nombre, lorsqu'il est combiné avec les données fournies dans le bloc et passé à travers une fonction de hachage, doit produire un résultat qui correspond à des conditions données — par exemple, un hash commençant par quatre zéros.

Lorsqu'un résultat correspondant est trouvé, les autres nœuds vérifient la validité du résultat, et le nœud mineur est récompensé par la récompense de bloc. Par conséquent, il est impossible d'ajouter un nouveau bloc à la chaîne principale sans d'abord trouver un nonce valide, ce qui génère à son tour la solution pour ce bloc spécifique — appelée le hash du bloc.

#### Pourquoi l'appelle-t-on « preuve de travail » (1:46) {#why-its-called-proof-of-work-146}

Chaque bloc validé contient un hash de bloc qui représente le travail effectué par le mineur. C'est pourquoi on l'appelle preuve de travail.

#### Avantages en matière de sécurité (1:54) {#security-benefits-154}

La preuve de travail aide à protéger le réseau contre de nombreuses attaques différentes. Une attaque réussie nécessiterait beaucoup de puissance de calcul et beaucoup de temps pour effectuer les calculs. Par conséquent, elle serait inefficace puisque le coût engagé serait supérieur aux récompenses potentielles pour avoir attaqué le réseau.

#### Limites (2:10) {#limitations-210}

L'un des problèmes de la preuve de travail est que le minage nécessite du matériel informatique coûteux qui consomme une grande quantité d'énergie. Bien que les calculs algorithmiques complexes garantissent la sécurité du réseau, ces calculs ne peuvent pas être utilisés au-delà de cela.

#### Perspectives d'avenir (2:25) {#looking-ahead-225}

Bien que la preuve de travail ne soit peut-être pas la solution la plus efficace, elle reste l'une des méthodes les plus populaires pour atteindre un consensus dans les chaînes de blocs. Il existe déjà des méthodes et des approches alternatives qui tentent de résoudre ces problèmes, mais seul le temps nous dira quelle méthode sera le successeur de la preuve de travail.