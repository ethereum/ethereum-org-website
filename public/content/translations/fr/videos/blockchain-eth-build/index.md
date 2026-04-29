---
title: "Chaîne de blocs — ETH.BUILD"
description: "Une démonstration du fonctionnement du minage de chaîne de blocs, incluant la façon dont les blocs sont enchaînés, comment la preuve de travail sécurise les chaînes de blocs, et ce qui se passe lorsque quelqu'un essaie de falsifier des données."
lang: fr
youtubeId: "zcX7OJ-L8XQ"
uploadDate: 2021-01-14
duration: "0:22:44"
educationLevel: beginner
topic:
  - "minage"
  - "chaîne de blocs"
format: tutorial
author: Austin Griffith
breadcrumb: "Chaîne de blocs (ETH.BUILD)"
---

Un tutoriel d'**Austin Griffith** démontrant comment fonctionne le minage de chaîne de blocs à l'aide de l'outil de programmation visuelle ETH.BUILD. Austin aborde le consensus par preuve de travail (PoW), l'enchaînement des blocs, la difficulté de minage, les récompenses de bloc et l'immuabilité de la chaîne.

*Cette transcription est une copie accessible de la [transcription originale de la vidéo](https://www.youtube.com/watch?v=zcX7OJ-L8XQ) publiée par Austin Griffith. Elle a été légèrement modifiée pour en faciliter la lecture.*

#### Le problème de coordination (0:00) {#the-problem-of-coordination-000}

Bonjour, joyeux vendredi nœud papillon ! Cet épisode d'ETH.BUILD se concentre sur la chaîne de blocs — un concept vraiment génial. Nous sommes dans ce bateau de clowns, avec notre nœud papillon Bitcoin pour l'occasion. C'est parti.

Jusqu'à présent dans le programme, nous avons parcouru les paires de clés, les hashs et les registres. Ce que nous avons découvert, c'est que si nous voulons échanger de la valeur sur un réseau distribué — et non centralisé — nous finissons par avoir des problèmes de coordination. Nous nous retrouvons avec ce problème où nous ne pouvons pas trouver de consensus entre des parties disparates car elles reçoivent toutes des transactions différentes à des moments différents. Il existe de nombreuses façons de résoudre ce problème, mais aucune n'était vraiment efficace jusqu'à l'arrivée de la preuve de travail (PoW).

Nous avons abordé le problème des généraux byzantins lors d'une quête annexe, et ce que nous y avons appris, c'est que les généraux devaient prouver qu'ils avaient une armée lorsqu'ils envoyaient des messages sur un réseau non sécurisé. Ainsi, la partie réceptrice pouvait s'assurer que cette personne était bien un général avec une armée prête à attaquer, et ils pouvaient se coordonner.

#### Les blocs et le nonce (1:04) {#blocks-and-the-nonce-104}

Donc, avec ce registre, nous intégrons les transactions provenant du réseau. Plutôt que de demander à chaque utilisateur individuel de prouver son travail, nous allons abstraire la preuve de travail dans un bloc de transactions et laisser un mineur travailler dessus.

Nous introduisons un bloc qui contient des transactions — tout ce qui transite sur le réseau, nous le chargeons dans ce bloc. Si nous regardons la structure de ce bloc, il possède également un nonce. Ce nonce nous permet d'ajuster le hash. Si nous prenons ce bloc entier, que nous le convertissons en chaîne de caractères et que nous le hachons, nous obtenons un hash. À mesure que les transactions changent, ce hash change, mais aussi lorsque nous modifions le nonce, le hash change également.

Nous effectuons un certain travail ici — nous avons un ensemble aléatoire de transactions, et nous modifions le nonce jusqu'à ce que le hash ait un zéro au début. Si vous avez regardé la quête annexe sur les généraux byzantins, nous avons choisi ce zéro initial comme une quantité arbitraire de travail à prouver. Donc, le nonce passe simplement par chaque nombre — un, deux, trois, quatre — et lorsque nous obtenons un zéro au début, nous disons : c'est un bloc valide.

#### La preuve de travail en action (3:00) {#proof-of-work-in-action-300}

Si nous prenons un bloc miné, que nous en extrayons le hash et que nous le passons dans une fonction de hachage, nous pouvons prouver qu'il commence par un zéro — nous pouvons prouver que ce bloc a fait l'objet d'un travail.

La fonction de hachage consomme du processeur (CPU), qui est une ressource limitée. Nous déployons toute notre puissance de calcul pour essayer de trouver un hash avec des zéros au début. Une fois que c'est fait, nous avons un bloc valide — le bloc est essentiellement figé. Quelles que soient les transactions qui s'y trouvaient à ce moment-là, elles sont maintenant dans ce bloc, tout le monde le respecte, et nous pouvons passer au bloc suivant.

#### Enchaîner les blocs ensemble (3:56) {#chaining-blocks-together-356}

Voici l'astuce : nous prenons l'ancien bloc et le relions au nouveau bloc. Si nous regardons la structure, le nouveau bloc n'a aucune transaction et un nonce vide, mais il a un parent avec des transactions. Le bloc précédent va faire partie du bloc suivant, nous aurons donc toute une chaîne.

Nous y ajoutons les dernières transactions du pool de transactions et travaillons à trouver un nonce. Le bloc numéro deux est miné — nous avions besoin d'un nonce de dix pour rendre ces transactions valides. Ensuite, nous faisons la même chose : nous relions l'ancien bloc, apportons le nouveau, y ajoutons les toutes dernières transactions, et travaillons à nouveau dessus. Après suffisamment d'essais, nous avons trouvé un nonce pour le bloc trois. Bloc quatre — même processus, et nous continuons d'avancer.

#### Difficulté de minage (5:02) {#mining-difficulty-502}

C'est trop facile — nous sommes capables de trouver un bloc valide très rapidement, et nous voulons que ce soit plus difficile. Je vais augmenter la difficulté à deux. Nous relions le bloc cinq, apportons les dernières transactions, et laissons un compteur tourner à plein régime. Maintenant, nous faisons du minage — en utilisant notre puissance de calcul limitée pour générer arbitrairement des hashs aléatoires jusqu'à ce que nous trouvions un hash avec deux zéros au début, car la difficulté a été augmentée. Cela va prendre un peu de temps.

Maintenant, nous avons cette chaîne de blocs de cinq blocs. Ces blocs contiennent des transactions et chacun fait référence au précédent. Chaque bloc a nécessité une quantité arbitraire de travail pour être produit, et la quantité de travail est contrôlée par la difficulté.

#### Le mineur (6:46) {#the-miner-646}

Regardons ce qu'est un mineur. Dans le problème des généraux byzantins, le général qui voulait « attaquer à l'aube » avait besoin de soldats. Ce qui se passe à l'intérieur de chaque soldat est exactement ce que nous faisons ici avec notre mineur — nous prenons un message et un nonce et les passons dans une fonction de hachage aussi vite que possible, en essayant d'obtenir ces zéros initiaux. Les zéros initiaux sont une chose arbitraire sur laquelle nous nous sommes tous mis d'accord — c'est suffisamment de travail pour prouver que vous êtes un soldat, ou que vous pouvez faire la guerre.

Laissez-moi amener un mineur et faire cela un peu plus vite. Le mineur va faire la même chose pour nos blocs — il prend les transactions provenant du pool de transactions, les injecte dans le bloc, et travaille simplement dessus jusqu'à ce qu'il trouve un hash valide.

Le mineur est un peu plus efficace. Il est plus concentré sur le minage. Il génère des hashs de manière aléatoire — c'est exactement ce que faisait notre mineur auparavant, mais de manière abstraite. Nous pouvons le voir s'activer en arrière-plan, enchaînant les hashs à toute vitesse. Il l'a trouvé — le bloc six est miné.

#### Doubles dépenses et propagation sur le réseau (10:00) {#double-spends-and-network-propagation-1000}

Nous avons déjà parlé de ce problème de double dépense, et même de ce problème de propagation sur le réseau. Lorsque nous avons un registre et un réseau distribué et que quelqu'un envoie une transaction, elle parvient à différentes personnes à des moments différents. Par conséquent, nous pourrions avoir deux mineurs sur le réseau qui minent tous les deux un bloc exactement au même moment, et qui contiennent des transactions différentes.

Chacun est valide à ce moment-là — ils ont tous les deux effectué la preuve de travail, ils ont tous les deux des zéros initiaux. Mais ils ne peuvent pas être tous les deux canoniques. Ils ne peuvent pas être tous les deux la vérité. Nous avons donc besoin d'un moyen pour que le réseau parvienne à un consensus sur la véritable chaîne.

#### Multiples mineurs et consensus (12:27) {#multiple-miners-and-consensus-1227}

Laissez-moi prendre ce bloc et le déplacer ici. Ce que je veux, c'est deux mineurs différents travaillant sur le même problème, écoutant en quelque sorte le même pool de transactions et créant des blocs indépendamment. Nous avons deux mineurs : Mallory et Mike. J'ai réglé la difficulté sur trois, et tous deux travaillent à trouver un hash avec trois zéros au début.

Donc Mallory a trouvé un bloc en premier ! Super. Maintenant, que se passe-t-il — parce que nous sommes sur un réseau distribué, Mike pourrait ne même pas encore être au courant du bloc de Mallory. Il pourrait encore travailler sur sa propre version. Et maintenant, Mike en a trouvé un aussi. Nous avons donc deux chemins valides.

Si vous êtes un pair sur le réseau et que vous voyez le bloc de Mallory en premier, vous pensez que c'est le bloc principal. Puis, plus tard, le bloc de Mike arrive. Vous conservez les deux au cas où l'un d'eux deviendrait la chaîne la plus longue. Et la règle est la suivante : suivez la chaîne valide la plus longue.

#### Coinbase et récompenses de bloc (15:33) {#coinbase-and-block-rewards-1533}

Lorsqu'un mineur mine un bloc, nous disons : voici toutes les transactions que nous voulons, voici le nonce, voici le parent — mais nous allons aussi dire voici la personne qui a miné ce bloc. Cela s'appelle une coinbase — je crois qu'il y a une entreprise qui s'appelle comme ça maintenant, mais c'est différent. Nous allons simplement l'appeler « mineur ». Donc, nos blocs nécessitent maintenant un champ mineur.

Donc Mike vient de trouver le bloc, et Mike va également en tirer une valeur de dix. Nous devons inciter les mineurs à faire tout ce travail, n'est-ce pas ? Ils dépensent de l'argent pour acheter ces équipements afin de sécuriser le réseau. Ces mineurs dépensent de l'argent pour sécuriser le réseau avec toute leur puissance de hachage — avec tous les mineurs combinés, peut-être des dizaines de milliers. Ils paient cher pour construire des machines qui travaillent sur ces hashs, et pour les inciter, nous leur donnons une part appelée la récompense de bloc pour chaque bloc qu'ils minent.

#### Récompenses de bloc et incitations (16:52) {#block-rewards-and-incentives-1652}

Donc, dans cette version du bloc, Mallory a dix dollars, mais dans cette version, Mike a dix dollars. Chacun de ces deux acteurs est incité à continuer sur sa propre chaîne, et le reste du réseau doit trouver un consensus. En gros, tout se résume à savoir qui a la chaîne valide la plus longue.

Mike va définir son bloc comme parent et commencer à travailler sur le bloc suivant. Mallory va faire la même chose. Et tout dépend de qui d'autre sur le réseau choisit quel camp. Comme nous ne voulons pas punir les personnes ayant de mauvaises connexions réseau, je suis presque sûr que sur Ethereum, nous rémunérons les blocs oncles (uncle blocks) — des blocs valides qui n'ont pas été intégrés à la chaîne la plus longue — car ils contribuent tout de même à sécuriser le réseau.

Nous avions ce problème de coordination et de consensus, et nous l'avons résolu en imposant cette quantité arbitraire de travail qui doit être fournie pour rendre les transactions valides. Mallory a fait tout ce travail de hachage, encore et encore, pour trouver trois zéros au début d'un hash de toutes ces transactions et du bloc précédent.

#### Interroger la chaîne de blocs (18:30) {#querying-the-blockchain-1830}

Nous pouvons communiquer avec la chaîne la plus longue, quelle qu'elle soit. Mike n'a pas encore atteint sept, donc nous pouvons voir que la hauteur est toujours de six par ici. Et nous pouvons faire des choses comme interroger les soldes des utilisateurs. Donc nous cliquons sur solde — qu'obtenons-nous ? Cinq cent vingt-quatre. Donc Heidi possède 524 jetons natifs, quel que soit le jeton de cette chaîne. Nous pouvons voir son nonce, nous pouvons faire tout ce que nous pouvions faire avec le registre, mais maintenant nous empilons des blocs et ces blocs contiennent des transactions.

Nous avons abstrait le travail des utilisateurs, qui se contentent d'envoyer de l'argent, vers les mineurs, et nous les avons incités en leur donnant cette récompense de bloc. Il y aura également un petit montant que chaque personne paie par transaction, mais nous y reviendrons dans un prochain épisode. Nous ne voulons pas parler de gaz pour le moment, mais il est utile de savoir qu'il y a une incitation non seulement à miner un bloc, mais à miner un bloc plein avec beaucoup de transactions. Mais c'est une incitation moindre — nous y viendrons plus tard.

#### Immuabilité de la chaîne (19:51) {#chain-immutability-1951}

À mesure que les blocs sont minés, ils deviennent de plus en plus sécurisés. Laissez-moi vous montrer ce que je veux dire. Donc Mike a miné un bloc, Mallory était par ici en train de faire une démonstration et n'a pas pu miner de bloc. Donc maintenant, la chaîne de Mike va être la plus longue, et elle va se propager sur le réseau. Tout le monde la verra et dira : d'accord, cette chaîne a sept blocs, ils sont tous valides — c'est celle que nous allons suivre. Vous pouvez avoir des hard forks, des forks litigieux, où les règles du jeu vont changer et différents groupes d'humains veulent suivre des chaînes différentes. C'est fascinant.

D'accord, pour finir, si nous retournons au bloc trois et modifions quelque chose — n'importe quel petit détail — je vais entrer ici. Il y a une transaction vers Frank. Disons qu'au lieu de Frank, nous la changeons pour Eve. Maintenant, regardez ce qui se passe quand je clique sur OK : regardez ça. J'ai modifié une toute petite partie du bloc trois et tout d'un coup, la chaîne entière s'effondre. Elle n'est plus valide. Si je devais diffuser cela sur le réseau, les gens me riraient au nez.

Vous ne pouvez rien changer une fois qu'un bloc est miné, à moins de revenir en arrière et de re-miner les éléments au fur et à mesure qu'ils changent. Je devrais essentiellement rebrancher le mineur ici et essayer d'avoir assez de puissance pour rattraper Mike tout là-bas avec sept blocs. Ce serait très, très difficile. Plus un bloc est profond, plus il est difficile de revenir en arrière. Le fait que ce bloc trois ici, où Carlos a envoyé 84 à Bob — Bob peut être assez rassuré de savoir que, plusieurs blocs plus bas, cet argent est là à coup sûr. Il n'y a aucune chance qu'il y ait un fork litigieux ici — je suis tranquille. C'est ce que nous appelons la finalité.

#### Résumé (22:00) {#summary-2200}

Au lieu d'avoir un registre et ce problème de consensus, nous utilisons la preuve de travail pour calculer intensivement un hash afin de valider un bloc — et « valide » signifie un nombre arbitraire de zéros au début. Nous allons toujours rencontrer des problèmes lors de la construction de la chaîne de blocs, où les blocs minés peuvent en fait arriver à différents endroits à différents moments. Nous avons donc un algorithme de consensus supplémentaire qui dit : suivez la chaîne la plus longue qui est valide et qui respecte l'ensemble de règles auquel vous souhaitez participer.

Très bien, joyeux vendredi nœud papillon ! C'était la chaîne de blocs sur ETH.BUILD. Je vais sauvegarder ceci et le mettre en ligne pour que vous puissiez simplement cliquer sur « charger » et avoir une chaîne avec laquelle jouer. Bon vendredi !