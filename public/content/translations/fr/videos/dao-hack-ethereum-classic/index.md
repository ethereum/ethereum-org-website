---
title: "Le piratage de la DAO : l'histoire d'Ethereum Classic"
description: "L'histoire du piratage de la DAO en 2016, et comment la réponse de la communauté a conduit à la création d'Ethereum Classic en tant que chaîne distincte."
lang: fr
youtubeId: "rNeLuBOVe8A"
uploadDate: 2021-12-15
duration: "0:09:48"
educationLevel: beginner
topic:
  - "gouvernance"
  - "histoire"
  - "dao"
format: explainer
author: Junion
breadcrumb: "Le piratage de la DAO"
---

Une vidéo explicative de **Junion** racontant l'histoire du piratage de la DAO en 2016, l'un des plus grands braquages numériques de l'histoire de la crypto, et comment la décision controversée de la communauté Ethereum de faire un fork de la chaîne de blocs a conduit à la création d'Ethereum Classic.

*Cette transcription est une copie accessible de la [transcription originale de la vidéo](https://www.youtube.com/watch?v=rNeLuBOVe8A) publiée par Junion. Elle a été légèrement modifiée pour en faciliter la lecture.*

#### La découverte (0:00) {#the-discovery-000}

Nous sommes le lundi 13 juin 2016. Un professeur d'informatique de Cornell examine le code de la DAO, l'un des projets les plus ambitieux de l'espace crypto. Depuis des mois, il plaidait pour que le projet soit suspendu, car il pensait qu'il y avait certaines failles qui pourraient mettre l'ensemble en péril. Mais aujourd'hui, il découvre une grave vulnérabilité : un bug à la ligne 666.

Il craint que ce bug ne permette à un pirate d'effectuer des retraits potentiellement illimités, comme à un distributeur automatique. Même si l'attaquant n'avait que 10 $ sur son compte, il pourrait les retirer encore et encore jusqu'à ce qu'il n'y ait plus d'argent. Un quart de milliard de dollars était investi dans la DAO, et chaque centime était en danger.

Slock.it, l'entreprise derrière la DAO, reconnaît la faille potentielle mais déclare que toute attaque serait irréalisable, de sorte que tous les fonds sont toujours en sécurité. Ils font un commit sur GitHub en inversant deux lignes de code — un correctif qui sera inclus dans la version 1.1 du framework de la DAO.

Mais alors que l'équipe criait victoire, un pirate suivait secrètement leurs traces, développant un exploit qui tire parti de ce bug précis. Nous sommes maintenant vendredi, quatre jours plus tard, et la DAO vient d'être piratée pour une somme de 55 millions de dollars.

Tout comme le piratage de SWIFT de 81 millions de dollars a rendu publiques les failles du secteur bancaire centralisé, et que l'attaque du ransomware WannaCry a révélé des vulnérabilités critiques dans les systèmes d'exploitation informatiques, le piratage de la DAO a exposé la fragilité précoce de la sécurité des contrats intelligents dans un monde où le code dicte tout. Il a laissé la communauté Ethereum dévastée alors qu'elle se démenait pour tenter de reprendre le contrôle de la chaîne de blocs.

C'est l'histoire de l'un des plus grands braquages numériques de tous les temps et de la tentative audacieuse de réécrire l'histoire pour qu'il n'ait jamais eu lieu.

#### Qu'était la DAO ? (2:00) {#what-was-the-dao-200}

Voici la DAO — l'abréviation d'organisation autonome décentralisée (decentralized autonomous organization). L'idée a été inspirée par le financement participatif. Au lieu de multiples fonds pour différents projets, il y aurait un seul fonds pour les gouverner tous, et il n'y avait pas de meilleure façon de le faire qu'avec une DAO.

Au lancement, les investisseurs recevaient 100 jetons DAO pour chaque ether déposé. Ces jetons leur donnaient la gouvernance sur le protocole et représentaient leur part de la DAO. Les détenteurs de jetons pouvaient soumettre des propositions — par exemple, vous pouviez proposer d'investir un million de dollars en échange d'une participation de 10 % dans l'entreprise XYZ.

Une fois qu'une proposition passait la vérification initiale, elle était soumise au vote de tous les autres investisseurs. Pendant cette période, les détenteurs de jetons pouvaient voter oui s'ils pensaient que l'investissement offrait une valeur attendue positive, ou non s'ils pensaient qu'il offrait une valeur attendue négative. Ils pouvaient également utiliser le forum pour exprimer leurs opinions et lire celles des autres.

Lorsque la période de vote était terminée et qu'un quorum de 20 % de tous les jetons était atteint, la DAO transférait automatiquement l'ether spécifié au contrat intelligent qui représentait la proposition. Tout ether généré par ces propositions serait ensuite retourné à la trésorerie. C'était comme un grand fonds spéculatif décentralisé, conçu pour faire du profit. L'idée était que la sagesse de la foule aiderait à créer les meilleures opportunités d'investissement.

Cependant, il fallait tout de même un moyen de protéger la minorité contre l'oppression de la majorité. Si un groupe minoritaire était fortement en désaccord avec une proposition qu'il ne pouvait pas rejeter par le vote, au lieu de voter non, il pouvait appeler une fonction de séparation (split) et déplacer son ether de la DAO principale vers une DAO enfant, divisant essentiellement la DAO en deux. Cette fonction de séparation sera très importante par la suite.

#### Le financement participatif (4:01) {#the-crowdfund-401}

La DAO a été le plus grand projet de financement participatif de tous les temps, récoltant 12,7 millions d'ether — d'une valeur de 150 millions de dollars à l'époque. Cela s'est déroulé au début de l'ère d'Ethereum, où le projet faisait l'objet d'un énorme engouement et du FOMO des investisseurs.

Avant cela, les projets Ethereum étaient principalement des preuves de concept arbitraires, mais il s'agissait là d'un projet entièrement fonctionnel avec un énorme potentiel. Il était totalement à l'abri de tout piratage, sécurisé par les millions de mineurs à travers le monde, et il était décentralisé — l'ensemble du projet était constitué d'une série de contrats intelligents sur Ethereum.

Il s'agissait d'un code immuable hébergé sur l'ordinateur le plus sécurisé au monde, ce qui garantissait les propriétés clés d'une DAO : une organisation totalement décentralisée et autonome. Une fois les contrats déployés le 30 avril, aucune entité unique — pas même Slock.it — ne pouvait apporter de modifications au protocole ou mettre fin à son existence. Son code avait été audité d'innombrables fois par divers développeurs Ethereum et était consultable par tous pour examen.

#### Le piratage (5:02) {#the-hack-502}

« Lonely, so lonely » — le nom de la proposition DAO n° 59. Il s'agit juste d'une proposition de séparation normale, mais c'est en fait là que le piratage commence. Après que le pirate a soumis la proposition, il y a une période de débat standard de sept jours où n'importe qui est libre de se joindre. Cependant, personne ne rejoint cette séparation.

Il est de procédure courante pour quelqu'un d'appeler une séparation par lui-même, de créer une DAO enfant, puis de créer une proposition qui renvoie tout l'ether vers son portefeuille. Cela permet à un utilisateur de récupérer son argent adossé à ses jetons DAO. Sept jours se sont maintenant écoulés, et le pirate est désormais autorisé à appeler la fonction de séparation. Personne ne se doute de rien.

Cependant, lorsque la fonction de séparation est appelée, la communauté se rend compte de quelque chose d'alarmant. L'ether est drainé de la DAO au rythme de huit millions de dollars par heure. La communauté se démène pour comprendre ce qui se passe. Il semble que l'attaquant appelle de manière récursive la fonction de séparation — encore et encore, des centaines de fois.

Vous vous souvenez de ce correctif de bug qui a eu lieu il y a quatre jours ? Il est dommage qu'il n'y ait aucun moyen de modifier le code d'un contrat intelligent après son déploiement, ce correctif n'existait donc que sur GitHub dans le cadre de The DAO 1.1, une DAO entièrement différente qui était en cours de création. Ce petit correctif aurait pu tout empêcher — tout ce qu'il faisait était d'inverser deux lignes de code pour que le solde soit mis à jour avant le paiement effectif.

Mais sans ce correctif, n'importe qui pouvait appeler la fonction à plusieurs reprises pour retirer de l'ether avant que le contrat ne mette à jour son solde. C'est comme un distributeur automatique qui ne modifie pas votre solde tant qu'il ne vous a pas donné l'argent. « Puis-je retirer dix dollars ? Attendez, avant ça, puis-je retirer dix dollars ? Attendez, avant ça… »

#### Le groupe Robin des Bois (6:55) {#the-robin-hood-group-655}

Les détenteurs de jetons DAO ont regardé leurs investissements être lentement siphonnés de la DAO principale vers la DAO enfant, également connue sous le nom de dark DAO. De plus, le prix d'Ethereum a subi un krach éclair, passant de 20 $ à 15 $ suite à la nouvelle. Il fallait faire quelque chose, et le seul moyen était de vider le reste avant que le pirate ne le fasse. Et c'est ainsi qu'a commencé la course pour vider les fonds.

À l'autre bout du monde, dans son appartement du quartier de Copacabana à Rio de Janeiro, Alex Van de Sande se réveille avec son téléphone inondé de messages Skype. Il se tourne vers sa femme et lui dit : « Tu te souviens quand je te parlais de cet énorme tas d'argent impossible à pirater ? Il a été piraté. »

Alex a contacté d'autres développeurs non divulgués et ils ont formé un groupe qu'ils ont surnommé Robin des Bois (Robin Hood) — des hackers éthiques (white-hat) qui videraient les fonds restants et les rendraient à leurs propriétaires légitimes. Cependant, ils n'avaient pas le temps de proposer une nouvelle séparation, car cela nécessiterait une période de vote de sept jours.

Au lieu de cela, ils ont jeté leur dévolu sur la proposition n° 71, qui était sur le point de se terminer dans quelques heures. Ils rejoindraient cette séparation et utiliseraient le même piratage pour siphonner tous les fonds restants dans cette DAO enfant. Six heures s'étaient écoulées depuis le début de l'attaque, et le voleur avait réussi à dérober 30 % de l'ether de la DAO. Mais pour une raison inconnue, l'attaque a cessé de fonctionner. Les transactions ont échoué et tout a pris fin.

Pendant ce temps, Alex se préparait tout juste à lancer l'attaque éthique pour sécuriser les 70 % des fonds restants. Mais soudain, il a perdu sa connexion Internet. À seulement 30 minutes de la fin, il a frénétiquement appelé NET, son fournisseur d'accès Internet brésilien, mais n'a obtenu qu'une réponse d'une voix robotique : « Nous constatons qu'il y a un problème Internet dans votre quartier. » La proposition de séparation s'est terminée et il venait de rater la fenêtre pour exécuter l'attaque de Robin des Bois.

Le lendemain matin, Alex a essayé de réunir à nouveau le groupe pour infiltrer une autre proposition de séparation, mais les autres étaient occupés. « Nous nous sentions comme les pires pirates de l'histoire. Nous avons été déjoués par une mauvaise connexion Internet et des obligations familiales. »

#### La course pour vider les fonds (9:10) {#the-race-to-empty-910}

Quatre jours après l'attaque initiale, la DAO était à nouveau attaquée. Elle se vidait lentement — quelques ethers par tour — mais elle avait déjà amassé quelques milliers de dollars. Il semblait s'agir d'un attaquant tâtant le terrain. À ce stade, Robin des Bois devait faire quelque chose.

Ils ont choisi d'infiltrer la séparation n° 78 car ils avaient identifié le curateur de la proposition et elle se terminait bientôt. Ils ont contacté quelques baleines (whales) qui étaient heureuses de faire don de leurs jetons DAO, permettant à l'équipe de sécuriser six millions de jetons. Plus le contrat Robin avait de jetons, plus il pouvait siphonner d'ether rapidement. L'attaquant a accéléré le rythme et d'autres attaquants se sont joints à lui. Mais grâce aux dons, Robin des Bois a pu les devancer. Cela leur a permis de sécuriser 7,2 millions d'ether — 55 % de la DAO.

#### Le fork (10:08) {#the-fork-1008}

La DAO principale avait maintenant été vidée et tous les fonds étaient répartis entre plusieurs DAO enfants — les deux principales étant la DAO éthique (white-hat) et la dark DAO. Mais tout l'argent était verrouillé dans le temps. Aucune proposition ne pouvait être présentée dans le cadre d'une DAO enfant avant la fin d'une période d'attente de 27 jours. Et même après cela, l'envoi de fonds à une adresse externe nécessitait de soumettre une proposition et d'attendre deux semaines. Essentiellement, il restait encore 41 jours avant que le pirate ne puisse encaisser ce qui équivalait à 5 % de l'offre totale d'Ethereum.

Mais le pirate ne pourrait jamais toucher à son Ethereum. Ce qui s'est passé ensuite est l'un des épisodes les plus audacieux et les plus controversés de l'histoire de la chaîne de blocs. La communauté a décidé qu'elle n'allait pas laisser le pirate gagner. Ils voulaient réécrire l'histoire pour que chaque transaction impliquée dans le piratage soit annulée, et que tout le monde récupère son argent. Ils ont choisi de faire un fork d'Ethereum.

Une chaîne de blocs est comme une liste de transactions qui ne cesse de s'allonger avec chaque bloc miné. Chaque transaction est enracinée dans la chaîne de blocs pour toujours. Mais si plus de 50 % des mineurs s'entendent, ils peuvent faussement altérer la chaîne de blocs, réécrivant l'histoire comme ils le souhaitent. Habituellement, cela s'appelle une attaque des 51 %. Mais il n'y avait rien de malveillant dans ce fork — la communauté ne faisait que récupérer l'argent qui lui avait été volé.

#### Le code fait loi (11:48) {#code-is-law-1148}

Pourtant, tout le monde n'était pas d'accord avec le fork proposé. Ils soutenaient que le code fait loi (code is law). Dans cette optique, l'attaquant était moins un pirate qu'un avocat intelligent qui a lu attentivement les termes d'un contrat. Par conséquent, aucun fonds n'a été réellement volé et il devrait avoir légitimement droit à l'ether de la dark DAO.

Il est important de noter qu'Ethereum lui-même n'a jamais été réellement piraté — c'est juste un contrat intelligent mal écrit qui a été exploité. Deux choses différentes. De plus, ils pensaient que les choses qui se produisent sur la chaîne de blocs sont immuables et ne devraient jamais être altérées, quelle que soit la situation.

Un jour après l'attaque initiale, l'attaquant a envoyé une lettre ouverte dans le groupe de discussion Slack de la DAO, signée avec sa clé privée :

> « À la DAO et à la communauté Ethereum : J'ai soigneusement examiné le code de The DAO et j'ai légitimement réclamé 3 millions d'ether, et je tiens à remercier la DAO pour cette récompense. Je suis déçu par ceux qui qualifient l'utilisation de cette fonctionnalité intentionnelle de 'vol'. Je fais usage de cette fonctionnalité explicitement codée conformément aux termes du contrat intelligent. Un soft ou hard fork équivaudrait à la saisie de mon ether légitime et de plein droit. Un tel fork ruinerait de manière permanente et irrévocable toute confiance non seulement dans Ethereum, mais aussi dans le domaine des contrats intelligents et de la technologie de la chaîne de blocs. Ne vous y trompez pas : tout fork, soft ou hard, endommagera davantage Ethereum et détruira sa réputation et son attrait. »

Après une inspection plus approfondie, les gens se sont rendu compte que la signature était invalide, cette lettre n'a donc été écrite que par quelqu'un prétendant être l'attaquant.

D'un autre côté, les partisans ont fait valoir que « le code fait loi » est une déclaration trop radicale et que les humains devraient avoir le dernier mot par le biais d'un consensus social. Le pirate ne devrait pas être autorisé à profiter de l'exploit car c'est éthiquement répréhensible et très probablement illégal. Mais plus important encore, la DAO était tout simplement trop grosse pour faire faillite (too big to fail). Elle détenait environ 15 % de l'offre totale d'ether.

#### Ethereum Classic (14:34) {#ethereum-classic-1434}

Dans un événement qui a fait écho à la crise financière de 2008, les développeurs d'Ethereum ont renfloué la DAO. Vitalik Buterin, le créateur et développeur principal d'Ethereum, n'a pas hésité à faire pression pour un fork. Dans une interview, il a déclaré plus tard : « Certains utilisateurs de Bitcoin considèrent que le hard fork viole d'une certaine manière leurs valeurs les plus fondamentales. Je pense personnellement que ces valeurs fondamentales, poussées à de tels extrêmes, sont stupides. »

Ces opinions ont dominé la majorité de la communauté Ethereum. Un vote communautaire controversé — où un ether équivaut à un vote — a montré un soutien de 87 % pour le fork. Ainsi, au bloc 1 920 000, les nœuds informatiques du monde entier ont mis à jour leurs logiciels et ont accepté le fork. Tout l'ether de la DAO et des DAO enfants a été déplacé vers un contrat de remboursement.

Mais cela ne s'arrête pas là. La chaîne de blocs Ethereum d'origine — celle avec le piratage de la DAO — a continué à fonctionner. En fait, elle se développait. Les mineurs qui s'opposaient au fork ont continué à miner des blocs et des transactions étaient toujours effectuées. Le lendemain, Poloniex a listé la pièce et elle a commencé à s'échanger à 2 $ l'unité. Cette chaîne est devenue connue sous le nom d'Ethereum Classic — la chaîne de blocs originale et inaltérée.

Si vous déteniez de l'ether avant le fork, vous auriez maintenant un Ethereum et un Ethereum Classic. Si vous déteniez un ether dans la DAO, vous pourriez retirer un Ethereum du contrat de remboursement. Et si vous veniez de pirater la DAO, vous auriez fait une belle fortune en Ethereum Classic — environ sept millions de dollars.

#### L'héritage de la DAO (16:14) {#legacy-of-the-dao-1614}

Initialement, Ethereum Classic a pris de l'ampleur en tant qu'alternative, avec une forte communauté de fondamentalistes de la chaîne de blocs qui n'étaient pas d'accord avec le renflouement. Mais depuis lors, Ethereum Classic n'a pas réussi à s'imposer et n'existe vraiment qu'en tant qu'idée avec peu d'utilité. Alors qu'Ethereum abrite des milliers de protocoles, Ethereum Classic n'en compte que quelques-uns de base. Il est clair que le fork a gagné.

Deux mois plus tard, Robin des Bois a transféré 2,9 millions de ses Ethereum Classic vers Poloniex et a tout vendu contre de l'Ethereum dans le but de faire chuter le prix. 14 % ont été convertis avec succès, mais 86 % ont été gelés par Poloniex et rendus au groupe. Robin des Bois a mis en place un contrat de remboursement sur le réseau Ethereum Classic pour les utilisateurs touchés par le piratage de la DAO.

Quant au pirate, il est reparti avec 3,6 millions d'Ethereum Classic — d'une valeur de 150 millions de dollars aujourd'hui. Mais s'il n'y avait pas eu de fork, ces 3,6 millions d'Ethereum vaudraient plus de sept milliards de dollars aujourd'hui.

#### L'impact durable de la DAO (17:26) {#the-daos-lasting-impact-1726}

Il est important de noter que la DAO est maintenant communément appelée la Genesis DAO pour éviter toute confusion, car c'était la première DAO mais certainement pas la dernière. Malgré les revers initiaux, les DAO n'ont fait que gagner en popularité. MakerDAO gouverne le stablecoin DAI, et les protocoles de finance décentralisée (DeFi) tels qu'Uniswap avec son jeton UNI ont généralement une DAO de gouvernance. Ces DAO se sont toutes construites à partir des expériences de projets antérieurs pour créer des organisations encore plus polyvalentes et performantes.

Mais la Genesis DAO a été la première du genre, créée comme une expérience — une expérience coûteuse — contrôlant 250 millions de dollars à son apogée, soit 15 % de l'offre totale d'Ethereum. Christoph Jentzsch, le développeur principal, ne s'attendait qu'à ce qu'elle lève cinq millions de dollars et a déclaré plus tard qu'il regrettait de ne pas l'avoir plafonnée. Pour une si grande expérience, c'était beaucoup trop tôt et certainement trop gros pour faire faillite.

Créer un contrat intelligent, c'est comme développer une voiture autonome — c'est une grande responsabilité qui nécessite des tests approfondis pour éviter les accidents. Même avec cette nouvelle prudence, les protocoles DeFi se font toujours pirater pour plus de 50 millions de dollars, certains même après avoir été audités par des cabinets d'audit professionnels. Mais depuis le piratage de la DAO, il n'y a plus eu de renflouements. La communauté Ethereum est plus forte maintenant et prête à passer à des projets encore plus grands et plus ambitieux, en construisant la prochaine génération d'applications numériques.