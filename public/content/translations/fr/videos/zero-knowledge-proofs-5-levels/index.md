---
title: "Les preuves à divulgation nulle de connaissance expliquées en 5 niveaux de difficulté"
description: "Un informaticien explique les preuves à divulgation nulle de connaissance à cinq niveaux de complexité différents, de l'enfant à l'expert."
lang: fr
youtubeId: "fOGdb1CTu5c"
uploadDate: 2021-12-13
duration: "0:18:19"
educationLevel: beginner
topic:
  - "privacy-and-security"
  - "zero-knowledge-proofs"
  - "cryptography"
format: explainer
author: WIRED
breadcrumb: "Preuves à divulgation nulle de connaissance"
---

L'informaticien **Amit Sahai**, professeur à la Samueli School of Engineering de l'UCLA, explique les preuves à divulgation nulle de connaissance à cinq niveaux de complexité, de l'enfant à l'expert, dans cette production de **WIRED**. Le concept est démontré par des analogies physiques et abordé avec une profondeur technique croissante, rendant l'un des concepts les plus importants de la cryptographie accessible à tous.

*Cette transcription est une copie accessible de la [transcription originale de la vidéo](https://www.youtube.com/watch?v=fOGdb1CTu5c) publiée par WIRED. Elle a été légèrement modifiée pour en faciliter la lecture.*

#### Introduction (0:00) {#introduction-000}

**Amit Sahai :** Bonjour, je m'appelle Amit Sahai et je suis professeur d'informatique à la Samueli School of Engineering de l'UCLA. Aujourd'hui, on m'a demandé d'expliquer les preuves à divulgation nulle de connaissance en cinq niveaux de complexité croissante.

Une preuve à divulgation nulle de connaissance est un moyen pour un prouveur de convaincre un vérificateur qu'une affirmation est vraie, sans pour autant révéler d'informations supplémentaires au-delà du fait que l'affirmation est vraie. Les preuves à divulgation nulle de connaissance sont utilisées dans les chaînes de blocs et les cryptomonnaies. Les experts en cryptographie sont enthousiasmés par la divulgation nulle de connaissance en raison de ses propriétés mathématiques étonnantes, mais aussi de son incroyable applicabilité à de très nombreux scénarios différents.

#### Niveau 1 : enfant (0:41) {#level-1-child-041}

**Amit Sahai :** Quelle est ta matière préférée ?

**Chelsea :** Je dirais les mathématiques. Certains petits problèmes peuvent en fait être très vastes et compliqués. C'est comme un puzzle.

**Amit Sahai :** J'adore les mathématiques pour la même raison. Aujourd'hui, je vais te parler d'une chose qui s'appelle la preuve à divulgation nulle de connaissance. Dans une preuve à divulgation nulle de connaissance, il y a deux personnes : un prouveur et un vérificateur. Je veux te prouver que quelque chose est vrai, mais ce qui est bizarre, c'est que je veux te prouver que c'est vrai sans t'en donner les raisons. Je me souviens que la première fois que j'en ai entendu parler, je me suis dit : attends, quoi ? Comment est-ce possible ?

Alors, que vois-tu sur cette photo ?

**Chelsea :** Beaucoup de pingouins.

**Amit Sahai :** Oui. Caché parmi tous ces pingouins se trouve un macareux. Veux-tu essayer de le chercher ? Vois-tu où il est ? Je sais où il est, mais je ne veux pas te le dire. Tu me crois ?

**Chelsea :** Oui.

**Amit Sahai :** Mais et si je pouvais te prouver que je sais où se trouve le macareux sans te révéler son emplacement ? Laisse-moi te montrer. J'ai pris cette photo et je l'ai mise derrière ce poster ici. Pourquoi n'irais-tu pas jeter un œil par ce trou ?

**Chelsea :** Je vois le macareux.

**Amit Sahai :** Donc, quand tu regardes ce panneau, on ne sait pas où se trouvait la photo, n'est-ce pas ? Est-ce que la photo avait son coin ici, auquel cas le macareux serait tout au bout de ce côté ? Ou est-ce que la photo avait son coin ici, auquel cas le macareux serait de l'autre côté ? C'est donc un exemple très simple d'une preuve à divulgation nulle de connaissance. Je t'ai convaincue que je savais où était le macareux, mais tu n'as rien appris d'autre.

**Chelsea :** Pourquoi étudiez-vous la preuve à divulgation nulle de connaissance ?

**Amit Sahai :** Quand j'en ai entendu parler pour la première fois, j'ai juste trouvé ça génial. Mais il s'avère qu'elles sont aussi très utiles, et pas seulement pour trouver des macareux. Si tu tapes simplement ton mot de passe et que le pirate informatique s'introduit dans l'ordinateur, il peut tout simplement récupérer ton mot de passe. Et si, à la place, nous pouvions utiliser une preuve à divulgation nulle de connaissance pour nous connecter ? Tu pourrais simplement prouver que tu es Chelsea, sans rien leur révéler. Si tu pouvais faire ça, ce serait incroyable, car même si le pirate s'introduisait dans l'ordinateur, il n'apprendrait rien, parce que même l'ordinateur n'apprend rien.

Alors Chelsea, avec tes propres mots, qu'est-ce qu'une preuve à divulgation nulle de connaissance ?

**Chelsea :** La preuve à divulgation nulle de connaissance est la preuve d'une affirmation. Vous ne leur montrez pas pourquoi ni quoi. Vous leur montrez juste un tout petit segment, ou vous faites juste une sorte de tour de magie bizarre qui n'est pas vraiment un tour de magie, et ils seront convaincus. Et vous ne leur avez pas montré pourquoi, ni rien de ce genre.

#### Niveau 2 : adolescent (3:31) {#level-2-teen-331}

**Amit Sahai :** Alors, as-tu déjà entendu l'expression preuve à divulgation nulle de connaissance auparavant ?

**Teen :** Non, jamais.

**Amit Sahai :** C'est un moyen pour un prouveur de convaincre un vérificateur que quelque chose est vrai sans rien révéler sur les raisons pour lesquelles c'est vrai, ce qui semble totalement bizarre. Ce que je veux faire, c'est te prouver que je connais cette combinaison sans te la révéler. Et ce que tu pourrais faire, c'est écrire un petit mot, un secret que je ne connaîtrais absolument pas. Plie-le, mets-le ici. Et ensuite, si je connais la combinaison, je devrais pouvoir l'ouvrir et te dire ce que tu as écrit.

Très bien. « Mon chien s'appelle Doug. »

**Teen :** Avez-vous deviné quelle était la combinaison ?

**Amit Sahai :** Non. Donc, à aucun moment de cette interaction tu n'as vu d'informations que tu ne connaissais pas déjà. Et pourtant, je t'ai convaincu que je connais la combinaison.

**Teen :** Quel est donc le but exact d'une preuve à divulgation nulle de connaissance ? Est-ce comme prouver quelque chose mais sans donner suffisamment d'informations qui pourraient mettre en danger ce que vous prouvez ?

**Amit Sahai :** Les gens ne se font pas confiance. Et si j'étais capable de prouver à quelqu'un que j'ai fait quelque chose correctement sans avoir à révéler mes secrets, alors cette personne me ferait davantage confiance.

**Teen :** Quel est le rapport avec la technologie informatique ? S'agit-il d'une interaction en personne ?

**Amit Sahai :** Supposons que tu veuilles échanger des messages avec quelqu'un que tu connais. Vous vous réuniriez probablement d'abord pour trouver un code secret, n'est-ce pas ? Et ensuite, vous vous écririez des messages dans ce code. Mais que se passe-t-il si tu n'as jamais rencontré la personne auparavant ? Et si tu veux échanger des messages secrets avec moi et que nous ne nous sommes jamais rencontrés auparavant ? Comment pourrions-nous faire cela ?

**Teen :** Je n'en ai aucune idée.

**Amit Sahai :** Ça semble impossible, n'est-ce pas ? Mais ça ne l'est pas. Tu n'utiliserais pas un cadenas physique ou une boîte physique. Nous utiliserions plutôt les mathématiques pour faire ce genre de choses. Tu pourrais prendre un message et le chiffrer en utilisant les mathématiques. Et ensuite, je pourrais te prouver que je connais la clé, l'ouvrir et te le renvoyer. De cette façon, je te prouverais que je connais la clé mathématique de la boîte verrouillée mathématique.

Donc, d'après ce dont nous avons discuté aujourd'hui, avec tes propres mots, qu'est-ce qu'une preuve à divulgation nulle de connaissance ?

**Teen :** C'est comme si vous aviez un secret très important que vous voulez que quelqu'un connaisse, mais que vous ne voulez pas tout lui dire. Vous pouvez utiliser une preuve à divulgation nulle de connaissance pour lui prouver ce secret, mais sans tout dévoiler.

#### Niveau 3 : étudiant d'université (6:13) {#level-3-college-student-613}

**Amit Sahai :** Qu'est-ce que tu étudies ?

**College Student :** Je suis étudiant en première année d'informatique à l'USC Viterbi. Je m'intéresse à tout ce qui touche aux données, à Internet, à la chaîne de blocs et à la cryptomonnaie.

**Amit Sahai :** As-tu déjà entendu parler des preuves à divulgation nulle de connaissance ?

**College Student :** Seulement en passant.

**Amit Sahai :** En fait, l'espace de la chaîne de blocs est l'un des domaines où nous voyons les preuves à divulgation nulle de connaissance être mises en œuvre, et je pense que ce n'est que le début. À la base, une preuve à divulgation nulle de connaissance est une interaction entre deux personnes. Je devrais être capable de te convaincre qu'une affirmation est vraie, mais tu n'auras aucune idée de pourquoi elle est vraie.

La façon dont nous allons aborder cela est à travers ce qu'on appelle la NP-complétude. Un problème NP-complet est un problème qui est très difficile à résoudre. Mais si tu peux le résoudre, tu peux résoudre n'importe quel problème de la classe NP, et cela inclut un grand nombre de problèmes. Nous allons utiliser un problème NP-complet pour prouver une incroyable variété d'affirmations grâce à une preuve à divulgation nulle de connaissance. Le problème NP-complet spécifique que nous allons examiner s'appelle la tricoloration de carte.

Ici, nous avons une carte avec un tas de pays, disposés de sorte qu'aucun pays de la même couleur ne partage une frontière. C'est ce qui fait qu'une carte comme celle-ci est valablement colorée. Il s'avère que le fait qu'une carte puisse ou non être tricolorée de cette manière est un exemple de problème NP-complet.

Peut-être que ce que tu veux vraiment faire, c'est fournir une preuve à divulgation nulle de connaissance que tu possèdes au moins 0,3 Bitcoin, sans révéler l'adresse de ton compte. Il s'avère que je peux prendre cette affirmation et la convertir en une carte de pays. Cette carte de pays ne sera tricolorable que si tu possèdes au moins 0,2 Bitcoin.

**College Student :** Comment pourrions-nous transformer quelque chose comme ça en une preuve à divulgation nulle de connaissance ?

**Amit Sahai :** Bien sûr, la première étape consiste à effacer toutes les couleurs. J'ai mis une couleur à l'intérieur de chacune de ces enveloppes. Maintenant, comment sais-tu qu'il s'agit d'une coloration valide ? Tu ne le sais pas. Tu dois choisir deux pays voisins quelconques ; tu peux les choisir comme tu veux, au hasard.

**College Student :** Puis-je prendre ces deux-là ?

**Amit Sahai :** Ici nous avons du vert, et par ici nous avons du bleu. Comme tu peux le voir, ce sont deux couleurs différentes. Tu as donc un peu confiance dans le fait que j'ai réussi à colorier cela correctement, mais pas tant que ça, car je ne t'ai montré que deux des pays. Une façon d'avoir plus confiance serait d'en ouvrir davantage, mais cela reviendrait à te révéler des informations. Je ne veux pas faire ça.

Donc, à la place, je vais te demander de bien vouloir te retourner. Et maintenant, changeons ces couleurs.

Peux-tu choisir deux pays au hasard, et nous révélerons à nouveau deux des couleurs.

**College Student :** Je vais prendre celui-ci et celui-ci.

**Amit Sahai :** C'est intelligent de ta part de vérifier avec le même que tu avais déjà. Mais comme tu le verras, maintenant ce n'est plus vert, c'est bleu. Et celui-ci, en revanche, est vert. Les couleurs que je t'ai montrées la dernière fois ne fonctionnent pas avec ces nouvelles couleurs. Mais cela fonctionne pour cette coloration que je te montre en ce moment. Donc, ce que nous avons fait, c'est qu'il t'est impossible de recoller les morceaux. Et si tu fais cela mille fois, et que je te montre correctement des couleurs différentes à chaque fois, tu serais vraiment convaincu. Et c'est tout, c'est toute la preuve à divulgation nulle de connaissance.

**College Student :** C'est donc comme une preuve probabiliste ?

**Amit Sahai :** Oui. Dans les implémentations réelles, nous n'utiliserions pas d'enveloppes, tu utiliserais le chiffrement. Mais c'est le protocole.

**College Student :** Quelles sont donc les implications plus larges des preuves à divulgation nulle de connaissance ? Sont-elles censées être plus pratiques à mettre en œuvre, ou sont-elles censées prouver quelque chose de manière structurelle ?

**Amit Sahai :** Il ne s'agit pas de rendre quelque chose plus efficace. Il s'agit de faire des choses que nous ne savions tout simplement pas faire auparavant. Je peux en fait te prouver, sans révéler aucun de mes secrets, que je me comporte honnêtement. Je pourrais te prouver que j'ai signé correctement un document chiffré sans révéler ce qu'était ce document secret. Cette capacité à changer la donne, à vraiment changer ce que nous pouvons faire, c'est ce qu'apporte la divulgation nulle de connaissance.

**College Student :** Où pensez-vous que nous pourrions instaurer plus de confiance en utilisant les preuves à divulgation nulle de connaissance ?

**Amit Sahai :** Les élections en sont un excellent exemple. Si tu pouvais prouver qu'une élection s'est déroulée correctement (que chaque vote a été compté et que le tout a abouti à la victoire d'une personne avec un total particulier) à divulgation nulle de connaissance, alors tu n'as pas à révéler les votes réels de qui que ce soit. Et pourtant, tout le monde pourrait voir que cela a été fait correctement.

#### Niveau 4 : étudiant de troisième cycle (11:59) {#level-4-grad-student-1159}

**Amit Sahai :** C'est tellement génial de t'avoir ici et de discuter avec toi, Eli. Peux-tu m'en dire un peu plus sur tes recherches ?

**Eli :** Mes recherches portent sur la cryptographie. Plus précisément, je travaille sur des protocoles de calcul multiparti. Celui sur lequel je travaille en ce moment est un système de calcul de statistiques agrégées, afin que des fournisseurs de services comme Google Chrome ou Tesla puissent collecter ces statistiques sans rien apprendre sur les données individuelles des utilisateurs. En tant qu'utilisateur, je n'ai pas besoin de faire savoir à Firefox que mon site Web préféré est mylittlepony.com. Mais ils peuvent savoir combien d'utilisateurs vont sur mylittlepony.com chaque jour.

**Amit Sahai :** C'est génial. Le calcul multiparti me tient particulièrement à cœur. Évidemment, les preuves à divulgation nulle de connaissance consistent à prouver des choses à une autre personne sans révéler les détails de ce que l'on prouve. Mais dans mon esprit, la divulgation nulle de connaissance va en fait encore plus loin. C'est ce concept global que l'on retrouve beaucoup dans le calcul multiparti, où l'on veut accomplir une tâche sans rien révéler de plus que ce dont on a exactement besoin pour accomplir cette tâche.

**Eli :** C'est vrai, et cela permet de prouver que l'on s'est comporté honnêtement, sans révéler aucun des secrets impliqués que l'on utilise pour se comporter honnêtement. Nous savons que les preuves à divulgation nulle de connaissance pour les langages NP-complets jouent un rôle énorme en cryptographie. Quelle a été votre première expérience avec la NP-complétude ?

**Amit Sahai :** Ma première rencontre a eu lieu lors de mon tout premier cours d'algorithmique en premier cycle. Un langage NP-complet est ce problème étonnant qui non seulement vous renseigne sur lui-même, mais dont la résolution peut en fait vous renseigner sur toute une classe de problèmes vraiment intéressants.

**Eli :** Lorsque vous avez commencé à considérer les preuves comme un jeu interactif où nous nous parlons, est-ce que cela a rendu possible la divulgation nulle de connaissance ?

**Amit Sahai :** Absolument. Et l'idée que le caractère aléatoire puisse être utile pour prouver quelque chose semble, là encore, tellement contre-intuitive si l'on pense à l'idéal platonique d'une preuve. Il n'y a pas de caractère aléatoire, pas de non-déterminisme présent là-dedans.

**Eli :** Cela a à voir avec toute cette idée de renverser une preuve. Dans une ancienne preuve classique, le caractère aléatoire va spécifiquement à l'encontre du but de ce que vous essayez de faire, parce que vous essayez de rendre tout évident et de révéler le flux d'informations. Mais une fois que vous renversez cela et que vous n'essayez plus de faire cela, soudainement toutes les mauvaises propriétés du caractère aléatoire deviennent bonnes.

**Amit Sahai :** Exactement. L'aléatoire est imprévisible, et c'est ce que nous voulons. Nous voulons que cette imprévisibilité cache réellement les informations que nous voulons cacher. Comment as-tu utilisé la divulgation nulle de connaissance dans les projets sur lesquels tu as travaillé ? Quels sont les défis que tu rencontres ?

**Eli :** Généralement, le plus difficile est de déterminer exactement quel est le meilleur endroit pour l'utiliser. J'ai écrit des articles qui ont utilisé la divulgation nulle de connaissance de manière plus théorique, mais en ce qui concerne les applications, certaines des applications les plus passionnantes que j'ai vues jusqu'à présent se trouvaient dans l'espace de la chaîne de blocs.

**Amit Sahai :** Quels sont certains des goulots d'étranglement en matière d'efficacité ?

**Eli :** L'une des choses les plus cool à propos des preuves à divulgation nulle de connaissance, c'est qu'il y en a tellement de sortes ; j'aime les appeler des saveurs. En général, lorsque vous utilisez des preuves à divulgation nulle de connaissance dans une application, le principal goulot d'étranglement a tendance à se situer au niveau du prouveur.

**Amit Sahai :** Peux-tu prendre le travail du prouveur et le diviser en de nombreux calculs parallèles ?

**Eli :** C'est une question tellement amusante. Je pense que nous ne connaissons toujours pas la réponse à cette question en tant que domaine. L'une des choses les plus cool que j'ai vues au cours des trois ou quatre dernières années est la transition de la théorie à la pratique : voir tous ces systèmes incroyables auxquels les gens ont pensé au cours des 30 dernières années commencer à devenir suffisamment efficaces pour être réalisés.

**Amit Sahai :** Sans aucun doute. Et particulièrement avec l'informatique en nuage : exploiter la puissance du cloud pour permettre des preuves à divulgation nulle de connaissance serait incroyable. De même, dans l'espace de la chaîne de blocs, si l'on veut accélérer la génération de preuves, si cela pouvait être fait de manière distribuée, ce serait formidable. L'un de mes espoirs est que la puissance du calcul multiparti consiste à rassembler des personnes qui se méfient mutuellement. Pouvons-nous prendre cette puissance de la cryptographie et l'utiliser pour aider à résoudre l'énorme niveau de méfiance qui existe dans la société actuelle ?

**Eli :** Je pense que c'est l'une des raisons pour lesquelles j'ai été si attiré par le calcul multiparti. L'un des problèmes les plus importants au monde est le fait que tant de gens ne se font pas confiance. Pouvoir utiliser les mathématiques pour créer une technologie qui permet aux gens de travailler ensemble sans avoir à se faire confiance est une mission vraiment cool et géniale.

#### Niveau 5 : expert (17:10) {#level-5-expert-1710}

**Amit Sahai :** Shang-Hua, c'est tellement génial de te revoir. Je crois que la dernière fois que nous nous sommes rencontrés, c'était en 2017 ou quelque chose comme ça.

**Shang-Hua :** Je crois que nous avons fait un Zoom une fois pendant la pandémie, mais c'est bien de te voir en personne. En fait, en 86, je suivais un cours de crypto avec le professeur Leonard Adleman, le A de RSA. Il m'a assigné l'article de Goldwasser, Micali et Charlie Rackoff sur la preuve à divulgation nulle de connaissance. C'est donc en effet ma toute première présentation, jamais faite dans ce pays, sur la divulgation nulle de connaissance.

**Amit Sahai :** C'est génial. C'est un concept presque hypnotique.

**Shang-Hua :** Il est également intéressant de voir comment formuler mathématiquement ces concepts. Par exemple, nous avons des données. Finalement, à partir des données, grâce à l'exploration de données, on peut obtenir des informations. Et puis il y a ce mot appelé « connaissance ». La connaissance a longtemps été débattue, même en philosophie. Qu'est-ce que la connaissance ? Mais voici une façon très fascinante dont les mathématiciens ou les informaticiens veulent capturer cette connaissance. On n'a pas dit « preuve à information nulle ». Alors, quel est ton avis sur la raison pour laquelle on parle de « connaissance » plutôt que d'« information », ou de « preuve à données nulles » ? Il est clair qu'il y a des données, donc ça ne peut pas être à données nulles.

**Amit Sahai :** Absolument. Je ne pense pas que nous ayons encore une réponse tout à fait satisfaisante à cette question. Ce qui était une si belle intuition, c'est l'idée que la divulgation nulle de connaissance est quelque chose que l'on peut déjà prédire. Si l'on peut déjà prédire la réponse, alors on ne doit acquérir aucune connaissance par cette interaction. Cette intuition (être capable de prédire l'avenir avec précision et que cela soit la preuve d'un manque de nouvelles connaissances) était une intuition tellement belle et incroyable.

**Shang-Hua :** Eh bien, il n'y a pas d'information nulle ici. Fondamentalement, du point de vue de l'informatique et de la sécurité, ce qui compte, c'est la quantité de connaissances que l'on acquiert, plus que la quantité d'informations que l'on a acquises et la quantité de données dont on dispose. Les données n'impliquent pas immédiatement la connaissance. Mais les gens ne font pas toujours la distinction.

**Amit Sahai :** C'est vrai. Par exemple, dans la recherche médicale : à quel point serait-il incroyable d'avoir un médicament et de prouver qu'il fonctionne dans ce modèle, sans avoir à révéler la structure du composé ?

**Shang-Hua :** Quelles seraient selon toi les prochaines directions dans ce domaine ?

**Amit Sahai :** Ce concept de programmes à divulgation nulle de connaissance permettrait d'effectuer des calculs complètement arbitraires de manière à divulgation nulle de connaissance, sans aucune interaction. Je peux simplement prendre le programme, le convertir en un programme à divulgation nulle de connaissance (ou un programme obscurci) et te l'envoyer. Tu peux l'exécuter et tirer parti de ce calcul sans avoir à me parler davantage.

**Shang-Hua :** C'est exact. Il y a une nature non interactive. Mais il y a une vérifiabilité là-dedans. Dans la chaîne de blocs, ils ont également commencé à intégrer une preuve à divulgation nulle de connaissance plus générale dans le registre.

**Amit Sahai :** Nous sommes définitivement à ce moment où la divulgation nulle de connaissance va être de plus en plus utilisée. Il y a tellement de conférences et de réunions dans l'espace de la divulgation nulle de connaissance où toi et moi ne sommes pas invités, parce que c'est pour les gens qui développent, les gens qui programment, pas pour nous les mathématiciens. Et je pense que c'est un signe. C'est le signe que notre bébé a grandi et qu'il est temps qu'il se développe.

**Shang-Hua :** Je pense profondément que les étudiants me demandent souvent quelles sont les orientations futures, à la fois en termes de crypto, de preuve à divulgation nulle de connaissance, dans le monde réel et dans le calcul mathématique.

**Amit Sahai :** C'est une excellente question. J'aimerais pouvoir voir l'avenir. Je ne peux pas, mais laisse-moi essayer. Je pense que nous avons fait tellement de choses en cryptographie au cours des dernières décennies, mais nous comprenons si peu de choses. L'aspect le plus fondamental est de comprendre la difficulté : comment obtenons-nous des problèmes difficiles ? Comment construisons-nous réellement des problèmes mathématiquement difficiles afin de pouvoir ensuite les utiliser pour construire des programmes et des preuves à divulgation nulle de connaissance efficaces ?

**Shang-Hua :** Je suppose aussi qu'en informatique quantique, on a besoin de problèmes encore plus difficiles.

**Amit Sahai :** En effet. Maintenant que le spectre de l'informatique quantique se profile, nous savons tous que les ordinateurs quantiques peuvent briser de nombreux systèmes cryptographiques. C'est un défi profond. Pouvons-nous donc trouver de nouvelles sources de difficulté qui soient résistantes à l'informatique quantique, que même les ordinateurs quantiques ne peuvent pas briser ? C'est une chose sur laquelle je travaille depuis plusieurs années.

**Shang-Hua :** Mais je suis sûr qu'ils motiveront de belles mathématiques.

**Amit Sahai :** Oui, c'est vrai. L'une des grandes choses à propos du monde réel est que les gens dans le monde réel ont des exigences. Et ces exigences semblent souvent impossibles. Et c'est là que nous intervenons : c'est notre travail de rendre l'impossible possible.