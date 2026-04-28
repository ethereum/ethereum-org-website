---
title: "Chaîne de blocs 101 : une démo visuelle"
description: "Une démonstration du fonctionnement de la technologie de la chaîne de blocs, couvrant le hachage, les blocs, les chaînes, les registres distribués et les jetons pour rendre les concepts de la chaîne de blocs tangibles et intuitifs."
lang: fr
youtubeId: "_160oMzblY8"
uploadDate: 2016-11-13
duration: "0:17:49"
educationLevel: beginner
topic:
  - "chaîne de blocs"
  - "cryptographie"
format: presentation
author: Anders Brownworth
breadcrumb: "Chaîne de blocs 101"
---

Démonstration visuelle d'Anders Brownworth sur le fonctionnement de la technologie de la chaîne de blocs, incluant une présentation couvrant le hachage SHA-256, les blocs, le minage, les chaînes de blocs, les registres distribués, les jetons, et plus encore.

*Cette transcription est une copie accessible de la [transcription originale de la vidéo](https://www.youtube.com/watch?v=_160oMzblY8) publiée par Anders Brownworth. Elle a été légèrement modifiée pour en faciliter la lecture.*

#### Hash SHA-256 (0:01) {#sha-256-hash-001}

Ceci est une démo de la chaîne de blocs. Nous allons procéder de manière très visuelle — nous allons rendre cela très facile à comprendre en passant en revue les éléments clés de ce qu'est une chaîne de blocs.

Avant de commencer, nous devons examiner cette chose appelée un hash SHA-256. Un hash ressemble à une suite de nombres aléatoires, et c'est essentiellement une empreinte numérique de données. Il se trouve que c'est l'empreinte de tout ce que je tape dans cette case. Si je tape mon nom « Anders » dans cette case, vous voyez que le hash a changé. En fait, il a changé à chaque fois que j'ai tapé une lettre.

Voici donc le hash du nom « Anders », tout en minuscules — il commence par `19ea`. Si j'efface cela et que je tape à nouveau « Anders », vous pouvez voir qu'il commence par `19ea` — exactement le même hash. En ce sens, c'est une empreinte numérique de ces données. Quelles que soient les données présentes ici, chaque fois que vous tapez exactement les mêmes données, vous obtenez exactement le même hash.

Je peux taper tout ce que je veux. Vous pouvez n'avoir rien — `e3b0` — c'est le hash de rien. Ou vous pourriez taper des tonnes et des tonnes de choses. En fait, vous pourriez y mettre la Bibliothèque du Congrès et vous obtiendriez un hash. Ce qui est intéressant, c'est que, qu'il y ait une infime quantité d'informations, aucune information ou toute la Bibliothèque du Congrès, vous obtiendrez toujours un hash de cette longueur. Vous ne pourrez pas deviner à l'avance ce que c'est — vous devez en quelque sorte entrer les données pour découvrir quel est le hash, mais vous obtiendrez toujours exactement le même hash, quel que soit le nombre de fois où vous entrez exactement les mêmes informations.

#### Bloc (2:10) {#block-210}

Ce que je vais faire, c'est étendre cette idée de hash à quelque chose que nous allons appeler un bloc. Un bloc est exactement comme le hash, mais la section des données a été divisée en trois parties : l'une appelée « bloc » — juste un numéro, c'est le bloc numéro 1 —, un « nonce », qui est juste un autre numéro, et ensuite des données, tout comme nous l'avions auparavant.

Le hash de toutes ces informations se trouve ici en bas, et il commence par quatre zéros. C'est un hash relativement inhabituel — la plupart d'entre eux ne commenceront pas par quatre zéros comme ça. Mais celui-ci le fait, et parce qu'il le fait, de manière totalement arbitraire, je vais dire que ce bloc est « signé ».

Que se passerait-il si je modifiais une partie de ces informations ? Disons que je tape quelque chose ici — le hash va changer, et quelle est la probabilité qu'il commence par quatre zéros ? Assez faible. Je vais juste dire « salut » — regardez ça, ce hash ne commence pas par quatre zéros, et l'arrière-plan est devenu rouge. Vous savez donc maintenant que ce bloc contenant ces informations n'est pas un bloc valide ou signé.

C'est là qu'intervient le nonce. Le nonce est juste un nombre que vous pouvez définir pour essayer de trouver une valeur qui fait que le hash commence à nouveau par quatre zéros. Je pourrais rester assis ici toute la journée à taper des nombres, mais j'ai ce petit bouton « Miner ». Ce qui va se passer quand j'appuierai dessus, c'est qu'il va parcourir tous les nombres à partir de 1 pour essayer d'en trouver un où le hash commence par quatre zéros. Ce processus s'appelle le minage.

Il s'est arrêté à 59 396 — et il se trouve que celui-ci produit un hash qui commence par quatre zéros. Il satisfait ma définition de ce qu'est un bloc signé.

#### Chaîne de blocs (5:16) {#blockchain-516}

Alors, pouvez-vous me dire ce qu'est une chaîne de blocs ? C'est probablement juste une chaîne de ces blocs. Voici ma chaîne de blocs — le bloc numéro un a un nonce comme avant, une zone de données, mais il a ensuite ce champ « précédent » qui est une série de zéros. En avançant, voici le bloc deux, le bloc trois, le bloc quatre — cette chaîne de blocs compte cinq blocs.

Le champ « précédent » de chaque bloc est le hash du bloc qui le précède. Vous pouvez voir que chaque bloc pointe vers l'arrière vers celui qui le précède. Ce premier bloc n'a pas de précédent, c'est donc juste une série de zéros.

Que se passe-t-il si je modifie certaines informations ici ? Cela va changer le hash de ce bloc et l'invalider. Mais que se passe-t-il si je modifie quelque chose dans un bloc antérieur ? Cela va changer ce hash, mais ce hash est copié dans le champ « précédent » du bloc suivant, ce qui casse les deux blocs. Nous pouvons remonter aussi loin que nous le voulons à un moment donné dans le passé et casser ce bloc, et cela cassera tous les blocs depuis lors. Tout ce qui le précède est toujours vert, mais tout ce qui suit devient rouge.

Si je vais modifier le dernier bloc, tout ce que j'ai à faire est de miner à nouveau ce seul bloc. Si je remonte loin dans le temps et que je fais un changement, je dois miner celui-ci, celui-ci, celui-ci et celui-ci. Plus il y a de blocs qui passent, plus il est difficile d'apporter une modification. C'est ainsi qu'une chaîne de blocs résiste à la mutation — résiste au changement.

#### Chaîne de blocs distribuée (9:18) {#distributed-blockchain-918}

Alors, comment saurais-je si ma chaîne de blocs a été minée à nouveau ? Maintenant, nous avons une chaîne de blocs distribuée. Elle ressemble exactement à la dernière chaîne de blocs, mais voici le Pair A. Si vous descendez ici, vous pouvez voir le Pair B, et il possède une copie exacte de la chaîne de blocs. Il y a aussi un Pair C — cela pourrait continuer indéfiniment. Il y a de nombreux pairs sur Internet, et ils ont tous une copie complète de la chaîne de blocs.

Si je regarde ce hash, c'est `e4b`. Si je descends au suivant, il a aussi `e4b`. Ils doivent être identiques. Maintenant, si je vais ici et que je tape quelque chose, que je mine à nouveau ce bloc, puis que je mine les blocs suivants — toutes les chaînes sont vertes. Cependant, cette chaîne indique que le dernier hash est `e4b`, celle du bas indique également `e4b`, et celle du milieu indique `4cae`.

Je sais donc, rien qu'en jetant un coup d'œil à ce petit hash, que quelque chose ne va pas dans cette chaîne de blocs. Même si tous les hashs commencent par quatre zéros, celui-ci est différent. C'est essentiellement deux contre un — nous sommes une petite démocratie ici. Donc `e4b` gagne. C'est ainsi que le fait d'avoir une copie complètement distribuée sur de nombreux ordinateurs différents vous permet de voir rapidement si tous les blocs sont identiques.

Les chaînes de blocs peuvent très facilement avoir 400 000 ou 500 000 blocs. Plutôt que de tous les vérifier, tout ce que vous avez vraiment à faire est de regarder le hash du plus récent, et vous pouvez voir si quelque chose dans le passé a été altéré.

#### Jetons (12:17) {#tokens-1217}

C'est tout — il n'y a rien de plus que cela. Mais ce n'est pas vraiment utile car nous n'avons rien dans la zone de données qui signifie quoi que ce soit. Ce que nous voulons vraiment, c'est un jeton.

Maintenant, j'ai ces jetons — de manière totalement arbitraire, je les appelle des dollars. Nous avons vingt-cinq dollars de Darcy à Bingley, quatre dollars et vingt-sept cents d'Elizabeth à Jane — vous voyez l'idée. Il y a toutes ces transactions qui se produisent, et j'ai simplement remplacé les données par ces transactions. Tout comme avant, si nous descendons, nous remarquons que nous avons toutes ces autres copies de la même chaîne de blocs.

C'est ici que l'immuabilité est importante. Si je modifie quelque chose ici, le hash sera différent de ce qui se trouve sur les autres copies. Il est très important que si vous remontez dans le temps et modifiez une valeur, nous le remarquions. Il est très important avec l'argent de ne pas en perdre la trace, et c'est tout l'intérêt d'utiliser une chaîne de blocs — résister à toute sorte de modifications des choses qui se sont produites dans le passé.

Une chose que je voudrais mentionner : nous ne listons pas « Darcy a cent dollars et il en donne 25 à Bingley ». Nous ne nous souvenons que des mouvements d'argent, pas des soldes des comptes bancaires. Cela soulève la question : Darcy a-t-il 25 $ ?

#### Transaction Coinbase (14:34) {#coinbase-transaction-1434}

Nous avons un problème dans cette version de la chaîne de blocs : nous ne savons pas vraiment si Darcy a 25 $. Regardons donc une transaction Coinbase. Nous ajoutons une transaction Coinbase à nos blocs — elle dit que nous allons inventer cent dollars à partir de rien et les donner à Anders. Il n'y a pas d'autres transactions dans ce bloc car personne n'avait d'argent avant cela.

Dans le bloc suivant, cent autres dollars sortent de nulle part et vont à Anders. Maintenant, nous avons quelques transactions — elles viennent toutes d'Anders car je suis le seul à avoir de l'argent à ce stade. J'envoie dix de mes dollars à Sophie. Ai-je dix dollars ? Oui — je regarde en arrière et je vois que la transaction Coinbase m'en a donné cent, j'en ai donc au moins dix.

Vous additionnez tout cela et ça ne dépasse pas cent. Cela suit une règle de base de la monnaie : vous ne pouvez pas créer de l'argent à partir de rien, et sa dispersion est contrôlée.

Si nous avançons dans le temps, nous voyons que Jackson donne deux dollars à Alexa. Jackson a-t-il vraiment deux dollars ? Nous reculons d'un bloc et voyons qu'Emily avait reçu dix dollars d'Anders et en a donné dix à Jackson. Jackson a donc bien l'argent. Nous pouvons revenir en arrière et le découvrir — c'est l'un des avantages d'avoir le champ « précédent ».

#### Conclusion (16:30) {#closing-1630}

C'est une chaîne de blocs de base sur laquelle fonctionne une monnaie. Comme vous le savez, les chaînes de blocs ont de nombreuses copies — tout le monde en a une copie. Si nous mutons quelque chose et que nous le passons à six dollars, les blocs deviennent invalides et ne correspondent plus aux autres copies. Cela résiste à la falsification, ce qui est ce que vous voulez pour une monnaie. Cela fonctionne très bien pour les choses qui sont petites et transactionnelles.

Les chaînes de blocs sont un moyen très efficace de gérer l'accord sur ce qui s'est passé dans le passé — cette histoire immuable qui s'inscrit dans le temps. Nous passons rapidement sur certains points principaux, mais si vous creusez dans la démo, que vous cliquez sur ces éléments et que vous jouez avec, vous aurez une idée de plus en plus précise de la façon dont cela fonctionne.