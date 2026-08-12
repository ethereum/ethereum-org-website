---
title: "Le prochain grand portefeuille sera privé"
description: "Votre portefeuille voit chaque adresse que vous détenez, chaque dapp à laquelle vous vous connectez et chaque requête que vous effectuez. Cette même position lui permet de tout protéger. Un regard pratique sur les outils de confidentialité, les paramètres par défaut et les idées non publiées qui définiront la prochaine génération de portefeuilles Ethereum."
author: "Elliott Alexander"
team: ""
tags:
  - "confidentialité"
  - "portefeuilles"
  - "preuves à divulgation nulle de connaissance"
published: 2026-07-02
image: /images/developers/blog/latest-post-header-1.png
breadcrumb: "Prochain grand portefeuille"
lang: fr
---

Prenez un instantané de deux minutes que vous passez sur votre portefeuille. Vous ouvrez l'application, jetez un œil à votre solde, vous connectez à une application décentralisée (dapp) que vous vouliez essayer, approuvez la transaction qu'elle vous présente, et envoyez à un ami les ETH que vous lui devez pour le déjeuner.

Rien de tout cela ne donne l'impression d'être observé. Personne n'a demandé votre nom. Vous fermez l'application et reprenez le cours de votre journée.

Maintenant, comptons ce qui a réellement fuité. Au lancement, avant même que vous n'ayez fait quoi que ce soit, une pile de services d'analyse a appris votre adresse IP et le fait que vous utilisez ce portefeuille. Le serveur par lequel votre portefeuille lit la chaîne a vu chaque adresse que vous détenez, interrogée depuis une seule IP — votre portefeuille complet, soigneusement regroupé pour quiconque conserve les journaux. La dapp a obtenu votre adresse active, ce qui est tout ce dont on a besoin pour consulter l'intégralité de son historique. Et le paiement à votre ami est un enregistrement public permanent reliant votre portefeuille au sien.

Chacune de ces fuites est passée par le même logiciel. Le portefeuille a chargé les analyses, choisi ce serveur, transmis l'adresse, construit la transaction. Mais cette même position est à double tranchant : la couche qui voit tout est aussi celle qui peut tout protéger.

De nombreux portefeuilles ont des modèles économiques fondés sur la collecte de ces informations, mais il existe des moyens de le faire sans mettre les utilisateurs en danger. Une partie de ce qu'il faut est déjà disponible, fonctionnelle et ignorée. Une autre partie n'a encore été résolue par personne. Ces deux moitiés représentent une opportunité, et quiconque s'en empare construit le prochain grand portefeuille.

## Ce que votre portefeuille révèle onchain {#what-your-wallet-gives-away-onchain}

Commençons onchain, avec ce qui est public quel que soit le portefeuille que vous utilisez. Une adresse ne porte aucun nom, et ce simple fait est très rassurant. Mais chaque paiement que vous avez reçu, chaque contrat que vous avez touché, le montant de votre solde à cet instant, et la liste complète de toutes les personnes avec lesquelles vous avez effectué une transaction sont exposés au grand jour, libres d'être consultés par n'importe qui. Le pseudonymat signifie simplement que c'est classé sous un identifiant au lieu de votre nom.

La défense standard consiste à répartir votre activité sur plusieurs adresses, ce que font la plupart des utilisateurs expérimentés. Cela aide moins qu'il n'y paraît. Financez deux adresses à partir de la même source, ou laissez-les se payer mutuellement une fois, et pour quiconque effectue une analyse de regroupement (cluster analysis), elles fusionnent en une seule entité.

En 2020, [une étude](https://fc20.ifca.ai/preproceedings/31.pdf) sur les quatre premières années d'Ethereum parvenait déjà à regrouper 17,9 % de tous les comptes détenus par des tiers actifs, révélant plus de 340 000 entités contrôlant plusieurs adresses. C'était il y a six ans et un boom de l'IA. Votre séparation minutieuse est à quelques pas d'être réduite à néant.

Tôt ou tard, le groupe d'adresses est lié à une personne réelle. Enregistrez un nom ENS qui fait écho à votre pseudo sur les réseaux sociaux, effectuez un retrait depuis une plateforme d'échange qui détient une copie de votre passeport, ou soyez payé par quelqu'un qui conserve des adresses étiquetées dans un tableur, et le groupe cesse d'être abstrait.

Les fuites de données jouent également leur rôle : un e-mail fuité aux côtés d'une adresse personnelle, associé à un nom ENS qui ressemble à l'e-mail. Rien de tout cela ne nécessite plus d'assignation à comparaître ou de spécialiste. L'IA a transformé le tri de millions d'enregistrements pour trouver une bonne correspondance en une tâche qui s'exécute en une nuit, et le coût est en baisse constante.

## Ce que votre portefeuille révèle avant que vous ne fassiez une transaction {#what-your-wallet-gives-away-before-you-transact}

La trace onchain nécessitait au moins que vous effectuiez une transaction. Celle hors chaîne commence plus tôt. Début 2026, un chercheur [a fait passer treize portefeuilles populaires au crible d'un analyseur de paquets](https://www.theopensourcepress.com/crypto-wallet-ip-exposure-scorecard-2026/) sur un appareil propre et a enregistré ce que chacun faisait au premier lancement, avant même qu'un compte n'existe. Le portefeuille moyen a contacté environ quatorze domaines. Le pire a contacté 26 domaines sur 41 adresses IP, y compris des appels d'infrastructure de solde à trois fournisseurs distincts, pour un utilisateur qui n'avait pas encore créé de portefeuille. Un autre portefeuille du test intégrait un service de prise d'empreinte de l'appareil (device-fingerprinting) aux côtés de huit sous-domaines d'attribution marketing.

Tout cela constitue les piliers ordinaires des applications grand public — analyses, rapports de plantage, attribution marketing — mais ce n'est pas Candy Crush, c'est une application dont l'argumentaire est l'auto-souveraineté. Le même test a révélé [un portefeuille](https://cakewallet.com/) qui n'a absolument rien envoyé au premier lancement : zéro paquet, zéro requête DNS. Rien dans un portefeuille ne nécessite ce bavardage.

Ensuite, il y a la fuite qui ne se referme jamais. Votre portefeuille ne détient pas de copie de la chaîne ; chaque fois qu'il lit un solde ou envoie une transaction, il interroge un serveur appelé fournisseur RPC (Remote Procedure Call). À moins que vous ne fassiez tourner votre propre nœud, chaque requête passe par l'un d'eux, et le fournisseur par défaut voit votre liste complète d'adresses, votre IP et le moment de tout ce que vous faites. Associer cette IP au nom d'un abonné est une demande de dossiers de routine pour un gouvernement.

Lorsque le fournisseur par défaut de MetaMask [a reconnu en 2022](https://www.coindesk.com/business/2022/12/06/consensys-to-update-metamask-crypto-wallet-in-response-to-privacy-backlash) qu'il enregistrait les adresses IP aux côtés des adresses de portefeuille, les réactions négatives l'ont poussé à [réduire la conservation à sept jours](https://consensys.io/blog/consensys-data-retention-update). Rendons à César ce qui est à César, mais ce remède est une politique, et l'architecture sous-jacente reste inchangée : un seul serveur reçoit toujours chaque requête que vous effectuez. Et un tel journal n'a pas besoin d'être réclamé pour faire des dégâts ; il lui suffit d'exister. Les bases de données sont piratées, vendues et discrètement fusionnées avec d'autres, et un journal qui ne signifiait rien en soi peut vous être associé des années après avoir été écrit.

Ce qu'il faut remarquer à propos de toute cette couche, c'est que l'utilisateur n'en voit jamais rien. Envoyer de l'argent place au moins un écran de confirmation devant vous ; les métadonnées n'ont pas d'écran. Personne n'approuve que sa liste d'adresses voyage avec son IP, et aucune invite de signature ne couvre les analyses.

Ces paramètres par défaut sont issus du manuel standard des applications grand public — infrastructure solide, rapports de plantage utiles, métriques de croissance — appliqués sans trop y penser à une application qui détient l'argent des gens. Ce qui est la partie encourageante : chaque fuite mentionnée dans cette section remonte à une décision qu'un constructeur de portefeuille a le pouvoir de prendre.

## Qui regarde {#whos-looking}

Commençons par les spectateurs que vous souhaiteriez le moins avoir. Les criminels ont compris qu'un registre public fait également office de catalogue de personnes dont les économies peuvent être prises de force. Les attaques à la clé anglaise (wrench attacks) — des vols où la clé est extraite par la violence ou la menace — [ont bondi de 75 % en 2025](https://www.coindesk.com/markets/2026/02/02/crypto-crime-is-getting-violent-wrench-attacks-jumped-75-in-2026), et les victimes ont perdu environ [101 millions de dollars au cours des quatre premiers mois de 2026](https://cointelegraph.com/news/europe-crypto-wrench-attacks-losses-101m-certik-report) seulement. Et la tendance s'est déplacée vers ce que les enquêteurs appellent le ciblage basé sur les données, où les attaquants profilent les avoirs onchain d'une victime avant même de frapper à sa porte. Dans plus de la moitié des incidents récents, ils ont atteint un conjoint, un enfant ou un parent comme moyen de pression. Un solde de portefeuille qui remonte jusqu'à votre porte d'entrée est une invitation permanente pour les criminels.

Ensuite, il y a les spectateurs avec des insignes. Un registre transparent est un système de surveillance qu'aucun gouvernement n'a besoin de construire : un enregistrement complet de qui a payé qui, quand et combien, exposé publiquement, accessible par une simple requête sans assignation à comparaître. À quel point cela devrait vous inquiéter dépend de qui vous gouverne, et pour des millions de personnes, la réponse est un gouvernement qui punit un don au parti d'opposition, un abonnement VPN ou des économies détenues dans une monnaie que l'État ne peut pas imprimer.

Pour ces utilisateurs, l'exposition financière est le modèle de menace, et les paramètres par défaut du portefeuille décident de leur niveau d'exposition.

Les deux types de spectateurs bénéficient de la même mise à niveau. L'IA rend la surveillance moins chère chaque année, et tout ce qui a été écrit sur la chaîne reste écrit, disponible pour toute nouvelle technique d'analyse à venir. Rien de tout cela n'est une condamnation du registre public ; la transparence est ce qui permet à quiconque de vérifier la chaîne. L'exposition réside dans la piste qui relie l'enregistrement à vous — les modèles de financement, les adresses réutilisées, les journaux de serveur.

Les portefeuilles ont laissé cette piste en place jusqu'à présent car la laisser est la voie de la moindre résistance, pour le logiciel tout autant que pour l'utilisateur. C'est aussi exactement la chose qu'un portefeuille est en position de dissoudre.

## Pourquoi le portefeuille est l'endroit où la confidentialité se règle {#why-the-wallet-is-where-privacy-gets-fixed}

Il est légitime de se demander pourquoi tout cela est le travail du portefeuille. Il y a des [explorations actives vers la confidentialité](https://ethresear.ch/t/ethereum-privacy-the-road-to-self-sovereignty/22115) au niveau de la couche de base d'Ethereum, et le protocole pourrait éventuellement porter une partie de ce poids. Mais la chaîne se met à jour via des hard forks, deux par an au mieux, et les changements liés à la confidentialité s'étaleront sur plusieurs d'entre eux. C'est un calendrier qui se mesure en années et qui est décidé par un processus qui ne devrait pas être précipité.

Pendant ce temps, des individus décident en ce moment même s'il est sûr d'être payé onchain, de faire des dons, d'y conserver des économies. Ils ont besoin d'une confidentialité qui arrive plus vite que ce que le processus de consensus social d'Ethereum et le calendrier des forks peuvent fournir.

La couche applicative n'a pas la bonne forme pour ce problème. Même si chaque dapp intégrait sa propre fonctionnalité de confidentialité, chacune ne pourrait protéger que l'activité à l'intérieur de ses propres murs, à sa manière, avec ses propres particularités et secrets que l'utilisateur devrait gérer. Ce qui vous expose, ce sont les connexions qui les traversent toutes — les adresses partagées, les pistes de financement, les liens qui remontent jusqu'à vous — et ces connexions vivent dans l'espace entre les applications. Résoudre la confidentialité application par application signifie la résoudre partout sauf là où se trouve réellement le problème. Les dapps ne sont pas l'endroit où la véritable solution peut résider.

Il reste donc le portefeuille. C'est le seul logiciel qui voit chaque dapp à laquelle vous vous connectez, chaque adresse que vous contrôlez et chaque requête que vous effectuez. La même visibilité qui rend un portefeuille perméable si coûteux est ce qui permet à un portefeuille prudent de coordonner la confidentialité à travers tout ce que vous faites : choisir quelle adresse fait face à quelle application, router les lectures pour qu'aucun serveur n'ait une vue d'ensemble, et assurer la comptabilité qu'exigent les protocoles de confidentialité.

Et ces protocoles sont plus avancés que ne le supposent la plupart des constructeurs. [Railgun](https://railgun.org/) a traité plus de [5 milliards de dollars en volume cumulé](https://dune.com/railgun_project/railgun) et détient environ [80 millions de dollars aujourd'hui](https://defillama.com/protocol/railgun), les outils d'adresses furtives (stealth addresses) comme [Umbra](https://www.techflowpost.com/en-US/article/30477) ont généré des dizaines de milliers d'adresses à usage unique, et selon [un décompte](https://wublock.substack.com/p/ethereum-privacys-https-moment-from), plus de 35 équipes poursuivent plus d'une douzaine d'approches distinctes pour les transferts privés.

Rien de tout cela n'est encore grand public, et il manque véritablement des pièces. Mais les protocoles fonctionnent, de l'argent réel y circule, et ce qui leur manque, c'est une place dans le flux principal de l'utilisateur. C'est là qu'intervient un portefeuille avant-gardiste.

## Ce que fait réellement un portefeuille préservant la confidentialité {#what-a-privacy-preserving-wallet-actually-does}

Enlevez le jargon et la majeure partie du travail de confidentialité relève de la comptabilité. Utilisez une nouvelle adresse ici, acheminez le dépôt par là, gardez cette note, attendez avant de faire un retrait, ne laissez jamais ces deux comptes se toucher. C'est une discipline pour laquelle les humains sont mauvais et pour laquelle les logiciels sont conçus, et aujourd'hui, elle repose presque entièrement sur l'utilisateur.

Un portefeuille préservant la confidentialité est un portefeuille qui fait la comptabilité lui-même au lieu de la confier à l'utilisateur. L'utilisateur décide quoi faire ; le portefeuille s'assure que le faire ne laisse aucune trace remontant jusqu'à lui.

Commençons par ce qui est en ligne. Les pools protégés (shielded pools) fonctionnent aujourd'hui : Railgun conserve un solde privé à côté de votre solde public, et une fois les fonds à l'intérieur, un paiement sortant ne révèle rien sur vos autres avoirs. Les coûts sont réels — des frais plus élevés qu'un simple transfert, une génération de preuve mesurée en secondes, une certaine dépendance aux relayeurs — mais le protocole a transporté des milliards en volume même avec ces compromis.

Associez cela à une habitude pour laquelle aucun protocole n'est nécessaire : une nouvelle adresse pour chaque contrepartie. Lorsque l'utilisateur se connecte à une nouvelle dapp, le portefeuille peut proposer une adresse dédiée pour celle-ci, financée à partir du solde protégé, de sorte que l'application voit un compte sans historique et sans comptes frères. Les adresses furtives ([ERC-5564](https://eips.ethereum.org/EIPS/eip-5564)) étendent la même démarche à la réception de paiements. Les mixeurs comme [Tornado Cash](https://tornadocash.eth.limo/) et [Privacy Pools](https://privacypools.com/) font un travail plus simple et plus ciblé : les fonds entrent par une adresse et sortent par une autre, le lien entre les deux étant rompu. C'est l'outil pour financer une nouvelle adresse que personne ne peut retracer jusqu'à vous — et la pièce manquante est le portefeuille produisant une telle adresse à la demande au lieu de laisser le rituel à l'utilisateur. Rien de tout cela n'attend un hard fork ou une subvention de recherche. Cela attend un portefeuille prêt à tenir la comptabilité au nom des utilisateurs.

Le côté réseau est principalement une question de décisions. Livrer un produit avec zéro analyse tierce est un choix, et au moins un portefeuille sur le marché l'a déjà fait. Concernant l'exposition RPC, la plupart des portefeuilles vous permettent déjà de changer de fournisseur, l'optionnalité existe donc, cachée dans une page de paramètres que les utilisateurs avancés visitent et que tous les autres ne trouvent jamais.

L'étape non encore franchie est la séparation : attribuer différents fournisseurs à différentes adresses afin qu'aucun serveur ne voie jamais la liste complète, et placer un proxy entre le portefeuille et le fournisseur pour que l'IP et les adresses ne voyagent jamais ensemble. Un client léger comme [Helios](https://github.com/a16z/helios) ou [Colibri](https://github.com/corpus-core/colibri-stateless) permet au portefeuille de vérifier les réponses qu'il obtient au lieu de les accepter aveuglément. Chacune de ces solutions a un coût en termes d'infrastructure, de latence ou de temps d'ingénierie, mais aucune ne nécessite de nouvelle cryptographie.

Ensuite, il y a la frontière. Lire vos soldes aujourd'hui signifie révéler votre ensemble d'adresses à quiconque traite la requête, et le travail pour corriger cela est en cours en ce moment même : environnements d'exécution de confiance (Trusted Execution Environments) associés à la RAM inconsciente (Oblivious RAM), récupération d'informations privées (private information retrieval), et clients légers tendant vers des lectures entièrement privées. Rien de tout cela n'est encore assez établi pour être copié à partir d'une implémentation de référence, ce qui en fait précisément un terrain qui vaut la peine d'être conquis.

Le côté écriture a la même forme : la diffusion pair à pair et les réseaux de mixage (mixnets) empêcheraient une transaction de transporter votre IP vers un serveur. Les portefeuilles qui déploieront ces éléments en premier seront ceux à l'aune desquels le reste du secteur sera mesuré.

Voici la barre à atteindre, et remarquez qu'il s'agit d'une barre d'expérience utilisateur plutôt que de cryptographie novatrice. Prenez la section par laquelle cet article a commencé — lancer, se connecter, approuver, payer — et faites en sorte que cette session reste reconnaissable. Il y aura des compromis ; une preuve prend des secondes à générer, un transfert protégé coûte plus cher, et un ou deux nouveaux concepts pourraient avoir besoin d'un nom dans l'interface.

La façon dont ces différences semblent minimes relève de l'art de l'intégration, et cela séparera les portefeuilles qui réussissent cela de ceux qui l'offrent techniquement mais d'une manière qui complique la vie des utilisateurs. Ce qui doit changer complètement : aucune analyse ne se déclenche au lancement, chaque nouvelle dapp rencontre une adresse sans historique, et le paiement à un ami ne révèle rien sur les comptes qui se trouvent derrière.

Une confidentialité qui demande à l'utilisateur de devenir une personne différente ne se propage jamais. Lorsqu'elle arrive au sein d'une expérience que les utilisateurs comprennent déjà, c'est simplement un meilleur portefeuille.

## Des idées qui valent la peine d'être volées {#ideas-worth-stealing}

Au-delà des fondamentaux se trouve une couche de fonctionnalités que, pour autant que je sache, personne n'a encore publiées. Juste quelques idées, mais chacune est le genre de chose qui pourrait faire d'un portefeuille le choix évident.

Commençons par le timing. Les ensembles d'anonymat (anonymity sets) ont besoin de temps pour croître entre les étapes, et vos horodatages révèlent discrètement plus que vous ne le pensez — quand vous êtes éveillé, quel fuseau horaire vous suivez, quels jours vous effectuez des transactions. Un portefeuille pourrait mettre en file d'attente tout ce qui n'est pas urgent et le déclencher à des heures inhabituelles : le dépôt de protection se règle pendant la nuit, les fonds sont prêts au matin, et aucun rythme de votre vie ne se forme jamais onchain.

Ensuite, le bouton de facilité. Un utilisateur qui se présente aujourd'hui est totalement exposé — une phrase secrète très utilisée, des années d'historique derrière elle. Laissez-le la saisir, et le portefeuille rédige un plan de migration qu'il devra approuver — tant dans Railgun, tant dans Privacy Pools, ajustez la répartition comme vous le souhaitez. Plus tard, chaque fois que des fonds sont nécessaires au grand jour, ils font surface prêts et non exposés : une nouvelle adresse, une heure inhabituelle, un montant qui ne fait pas écho à ce qui est entré. Et souvent, aucune sortie n'est nécessaire. À l'intérieur de l'écosystème de Railgun, un utilisateur peut transférer et échanger sans jamais faire surface, économisant en outre les frais de sortie. Un utilisateur qui était un livre ouvert le lundi est illisible le vendredi, et tout ce qu'il a fait, c'est approuver un plan.

Un portefeuille pourrait également analyser le code (lint) pour la confidentialité. Les heuristiques de regroupement de la première moitié de cet article sont publiques, alors pointez-les vers la transaction en attente de l'utilisateur et avertissez-le avant la signature : ce paiement liera ces deux comptes, ce retrait correspond à votre dépôt au centime près. Les portefeuilles simulent déjà les transactions pour détecter les siphonnages de fonds. Simuler ce qu'un spectateur apprend est la même démarche visant un risque différent.

Et montrez aux gens ce que l'observateur voit déjà. Un tableau de bord qui exécute une analyse de regroupement sur les propres comptes de l'utilisateur transforme une menace abstraite en quelque chose sur lequel les utilisateurs ressentent le besoin d'agir : ces cinq adresses sont une seule entité pour un observateur, ce compte est propre, ce nom ENS relie les deux. Cela donne également à la fonctionnalité du bouton de facilité mentionnée ci-dessus son avant-après.

## Mesures à prendre {#action-steps}

### Pour les constructeurs {#for-builders}

Chaque section de cet article se termine au même endroit : un choix que le portefeuille a le pouvoir de faire.

La façon de faire ces choix est d'avoir des paramètres par défaut sensés que l'utilisateur peut remplacer, chacun d'entre eux. Optez par défaut pour la voie privée, car le paramètre par défaut est ce avec quoi la plupart des utilisateurs vivront. Mais laissez la porte ouverte à l'optionnalité dirigée par l'utilisateur, car un utilisateur qui ne peut pas pointer son portefeuille vers un serveur RPC différent, ou vers son propre nœud, n'a pas vraiment reçu la souveraineté.

Vous n'avez pas besoin de partir de zéro. Le [SDK Kohaku](https://github.com/ethereum/kohaku) regroupe plusieurs des primitives de cet article — soldes protégés, mixeurs, clients légers — afin qu'un portefeuille puisse les adopter sans reconstruire chaque protocole à partir de zéro. Les pièces sont disponibles. Certaines choses ont de l'importance bien avant que quiconque ne les demande. Personne n'a vu les masses faire des pétitions pour le chiffrement de bout en bout non plus ; il a été livré par défaut, des milliards de personnes l'ont obtenu sans s'en rendre compte ou s'en soucier, et maintenant une application de messagerie qui en est dépourvue semble cassée et intrusive.

L'argent qui ne peut pas être utilisé pour vous trouver, vous profiler ou vous cibler appartient à la même catégorie. Le portefeuille qui le traite de cette façon sera le prochain grand portefeuille.

### Pour les utilisateurs {#for-users}

Le portefeuille que vous utilisez est celui que vous promouvez comme norme. Choisissez des portefeuilles qui prennent votre confidentialité et votre sécurité au sérieux. Cela peut signifier sacrifier l'interface la plus fluide pour la plus sûre et la plus privée. À l'heure actuelle, cela signifie probablement se tenir au courant des dernières nouveautés sur [Walletbeat](https://www.walletbeat.fyi/), voir quels portefeuilles opèrent un changement vers l'activation de la confidentialité des utilisateurs, et prendre le temps de les essayer.

## Pour aller plus loin {#for-further-exploration}

- [Tableau de bord de la confidentialité des portefeuilles](https://www.theopensourcepress.com/crypto-wallet-ip-exposure-scorecard-2026/) - Exposition réseau au premier lancement de 13 portefeuilles
- [ERC-5564 : Adresses furtives (Stealth Addresses)](https://eips.ethereum.org/EIPS/eip-5564)
- [Railgun](https://railgun.org/), [Privacy Pools](https://privacypools.com/) et [Tornado Cash](https://tornadocash.eth.limo/)
- Clients légers [Helios](https://github.com/a16z/helios) et [Colibri](https://github.com/corpus-core/colibri-stateless)
- [Kohaku](https://github.com/ethereum/kohaku) - SDK de confidentialité pour les constructeurs de portefeuilles
- [Walletbeat](https://www.walletbeat.fyi/) - Comment les portefeuilles existants se mesurent