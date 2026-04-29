---
title: "EigenLayer : ajout de fonctionnalités sans permission à Ethereum"
description: "Sreeram Kannan présente l'approche d'EigenLayer pour l'ajout de fonctionnalités sans permission sur Ethereum."
lang: fr
youtubeId: "-V-fG4J1N_M"
uploadDate: 2023-02-10
duration: "0:24:11"
educationLevel: advanced
topic:
  - "restaking"
  - "eigenlayer"
  - "security"
format: presentation
author: a16z crypto
breadcrumb: "EigenLayer"
---

Une conférence de recherche de **Sreeram Kannan** (Université de Washington / EigenLayer) lors d'un événement de recherche crypto a16z, expliquant comment EigenLayer vise à permettre l'innovation sans permission sur Ethereum en autorisant les stakers à engager le même capital mis en jeu à des conditions de réduction supplémentaires en échange de la fourniture de nouveaux services tels que des oracles, des ponts, des couches de disponibilité des données et des environnements d'exécution alternatifs.

*Cette transcription est une copie accessible de la [transcription vidéo originale](https://www.youtube.com/watch?v=-V-fG4J1N_M) publiée par a16z crypto. Elle a été légèrement modifiée pour en faciliter la lecture.*

#### Introduction (0:00) {#introduction-000}

Aujourd'hui, je vais vous parler de l'un des produits que nous construisons, qui est également une idée appelée EigenLayer. Nous appelons EigenLayer le collectif de restaking, mais ce qu'il fait, c'est permettre à quiconque d'ajouter de nouvelles fonctionnalités à Ethereum.

Comme Tim l'a présenté, je suis professeur associé à l'Université de Washington à Seattle, où nous travaillons sur les chaînes de blocs, le consensus et d'autres domaines depuis quatre ans et demi. Au cours de la dernière année, j'ai fondé la startup EigenLayer Labs. Nous avons beaucoup travaillé sur les protocoles de consensus — nous avons publié un article intitulé « Everything is a Race » qui analyse les conditions dans lesquelles les protocoles de type chaîne la plus longue de preuve de travail (PoW), de preuve d'enjeu (PoS) et de preuve d'espace sont sécurisés. Nous nous sommes appuyés sur une partie de cette compréhension — par exemple, un article appelé Prism, qui est un protocole de preuve de travail avec une très faible latence. Nous avons également réalisé des travaux appelés PoSAT sur la façon de créer un protocole de preuve d'enjeu dynamiquement disponible, où votre protocole continue de fonctionner avec une participation variable.

#### Quand les chaînes de blocs sont-elles responsables (1:31) {#when-are-blockchains-accountable-131}

Nous avons également exploré quand les chaînes de blocs sont responsables. Une heuristique est que lorsque vous avez des quorums et des signatures, si un groupe de stakers signe deux fois un bloc, ces chaînes de blocs sont responsables. Mais il y a des subtilités — par exemple, un protocole comme Algorand, qui utilise également des quorums, n'est pas responsable car il repose sur des hypothèses de synchronisation où vous pouvez créer des violations de sécurité en ne disant rien.

#### Consensus multi-ressources (2:11) {#multi-resource-consensus-211}

Les deux travaux les plus récents portent sur le consensus multi-ressources — supposons que vous souhaitiez construire un protocole qui utilise la preuve d'enjeu, la preuve d'espace et la preuve de travail, le tout combiné en un seul protocole. Vous voulez qu'il fonctionne même si une majorité de mineurs de preuve de travail sont malveillants, tant qu'une très petite fraction des mineurs de preuve d'enjeu est honnête. Nous avons caractérisé les zones de compromis à travers de multiples ressources.

Nous avons également travaillé sur la conception de la topologie pair à pair — comment s'assurer que dans le réseau pair à pair d'une chaîne de blocs, le protocole de consensus respecte l'ordre des messages ? L'une des choses qui se produit de manière endémique dans les chaînes de blocs est le front-running. Pour empêcher le front-running non ciblé — où vous voulez simplement passer devant tout le monde parce que vous avez un avantage de prix — nous avons un article appelé Themis qui donne à la chaîne de blocs une propriété native de premier entré, premier sorti.

En plus du consensus, il existe des solutions de mise à l'échelle comme la fragmentation. Nous avons publié quelques articles — Coded Merkle Tree et Free2Shard — à ce sujet.

Une chose que nous avons identifiée comme une friction majeure dans la chaîne de blocs est que le rythme d'innovation au niveau des couches centrales — au niveau du consensus, de la fragmentation ou du pair à pair — est bien inférieur au rythme d'innovation au niveau de la couche applicative. Les applications sont déployables sans permission — n'importe qui peut déployer une application sur une chaîne de blocs existante comme Ethereum. Alors que les mises à jour du protocole central sont à permission dans un sens très profond. Cela a considérablement freiné notre secteur.

#### Découpler la confiance et l'innovation (8:30) {#decoupling-trust-and-innovation-830}

Pour en revenir à 2008-2009 : Bitcoin a été le pionnier de la confiance décentralisée grâce au minage par preuve de travail. Au-dessus du minage, il y a un protocole de consensus — la chaîne la plus longue ou la chaîne la plus lourde — qui décide de la chaîne valide. Par-dessus cela, Bitcoin Script définit la sémantique d'exécution. Nous avons donc une couche de confiance à la base, une couche de consensus au-dessus, et une couche d'exécution tout en haut.

Mais Bitcoin était également une chaîne de blocs spécifique à une application — conçue pour une seule application : l'échange de Bitcoin entre clients. En remontant à 2011, toute nouvelle application devant être construite sur une chaîne de blocs nécessitait son propre réseau de confiance. Par exemple, quelqu'un voulait construire un système de noms de domaine décentralisé appelé Namecoin. La couche de script de Bitcoin ne vous donnait pas assez de programmabilité, vous deviez donc créer une nouvelle couche de script et un nouveau réseau de confiance. Il n'y avait aucun moyen de partager la confiance entre Namecoin et Bitcoin.

L'idée centrale construite par Ethereum était le découplage de la confiance et de l'innovation. Ils ont pris la couche de script de Bitcoin et l'ont remplacée par une couche de programmation polyvalente Turing-complete — la Machine Virtuelle Ethereum (EVM). Il s'agissait d'une petite mise à niveau technique dans un sens fondamental, mais ce qu'elle a créé, c'est la modularité de la confiance. Désormais, n'importe qui peut venir et construire des applications décentralisées (dapps) sur le système. La personne qui a construit ENS n'avait rien à voir avec le réseau de confiance. La confiance du réseau Ethereum est devenue un module qui peut être fourni à n'importe quelle application distribuée.

#### Innovation ouverte (10:23) {#open-innovation-1023}

Cela a conduit à une accélération massive de l'économie pseudonyme. Quiconque crée ces applications — ils ne sont pas eux-mêmes dignes de confiance, ils apportent simplement de l'innovation. Vous avez une idée, vous pouvez être un inconnu, vous n'avez pas besoin qu'on vous fasse confiance, vous écrivez simplement votre code, vous le mettez sur Ethereum, et tout le monde a confiance dans le fait qu'Ethereum continuera d'exécuter les conditions telles qu'énoncées.

Une façon de modéliser cela : les couches de base — le réseau de confiance, le consensus et la machine virtuelle — sont regroupées dans un réseau de confiance produisant de la confiance. La chaîne de blocs Ethereum est un producteur de confiance. Les applications distribuées sont des consommateurs de confiance. L'échange de valeur est le suivant : les dapps obtiennent la confiance d'Ethereum et paient des frais en retour. Tout comme le capital-risque a été le découplage du capital et de l'innovation, Ethereum a découplé la confiance et l'innovation.

Mais les obstacles à l'innovation ouverte persistent. Si j'ai une idée sur la façon de mettre à niveau le protocole de consensus d'Ethereum — disons que nous sommes en 2019 et que j'ai inventé le protocole de consensus Avalanche — il n'y a aucun moyen de le déployer sur Ethereum. Alors, que dois-je faire ? Je pars et je crée mon propre monde. C'est l'ère des chaînes de blocs alternatives de couche 1 (l1) — chacune avec des protocoles de consensus différents, des machines virtuelles différentes, mais chacune devant construire ses propres réseaux de confiance.

Cette image ressemble exactement à celle de Bitcoin et Namecoin en 2011. Les innovations au niveau des dapps peuvent simplement s'appuyer sur Ethereum, mais les innovations qui vont plus loin et touchent le cœur de la pile doivent créer des écosystèmes de confiance fragmentés.

De plus, Ethereum ne fournit de la confiance aux dapps que pour la création de blocs — l'ordonnancement des transactions et l'exécution des transactions. C'est tout. Si les dapps voulaient de la confiance pour autre chose — lire des données sur Internet, lire des données d'une autre chaîne de blocs, exécuter un moteur d'exécution différent, exécuter un moteur de jeu, exécuter un système d'authentification — elles doivent créer leur propre réseau de confiance. Chainlink est un excellent exemple : c'est un protocole d'oracle qui aide à récupérer des données d'Internet vers la chaîne de blocs, mais Chainlink a son propre réseau de confiance. Sa confiance n'est pas empruntée aux stakers d'Ethereum.

#### Problème microéconomique (16:28) {#microeconomic-problem-1628}

Le problème microéconomique : si vous exécutez un middleware — disons, un système de stockage de données — vous devez créer votre propre mécanisme de staking. Vous avez besoin d'une sécurité économique élevée, ce qui signifie beaucoup de capital mis en jeu, et vous avez ensuite le coût d'opportunité du capital. Par exemple, vous voulez 10 milliards de dollars mis en jeu dans votre couche de stockage de données. Vous devez payer un taux annuel de 5 % ou 10 % sur ce capital dans un monde non spéculatif. Le coût dominant n'est pas le coût opérationnel du stockage des données — cest le coût d'alimentation d'une base de capital économique massive.

Regardez n'importe quel écosystème de preuve d'enjeu : 94 % des récompenses vont à la personne qui détient le capital, et seulement 6 % vont à la personne qui effectue réellement les opérations. Donc, même si vous trouvez une idée révolutionnaire pour réduire les coûts opérationnels par 10×, les 94 % restent inchangés. Votre structure de coûts est plafonnée par le coût du capital.

Si vous êtes une dapp, le problème microéconomique est que vous payez des frais très élevés à un grand réseau de confiance comme Ethereum, mais vous êtes limité par la confiance la plus faible dont vous dépendez. Si vous aviez un oracle ou un pont qui n'est pas aussi digne de confiance, vous pourriez y être exploité. Votre sécurité est toujours le plus petit dénominateur commun.

#### Problème économique (19:52) {#economic-problem-1952}

Pour la chaîne de blocs centrale, si la proposition de valeur fondamentale est de fournir une confiance décentralisée et d'en tirer des revenus, Ethereum n'est capable de fournir une confiance décentralisée que sur la création de blocs — pas sur toutes les autres choses nécessaires pour exécuter un service décentralisé. Des îlots de confiance décentralisée sont créés par d'autres middlewares, et au lieu que les revenus s'alignent et créent un réseau de confiance massif, les revenus se fragmentent en îlots plus petits.

#### EigenLayer (20:44) {#eigenlayer-2044}

C'est en fait une idée ridiculement simple qui résout tous ces problèmes à la fois.

EigenLayer est un mécanisme permettant de tirer parti d'un réseau de confiance existant pour faire d'autres choses pour lesquelles il n'était pas prévu. Ethereum fournit de la confiance sur l'ordonnancement et l'exécution. EigenLayer est une série de contrats intelligents sur Ethereum, et le mot clé opérationnel est le restaking.

Qu'est-ce que le restaking ? Dans l'Ethereum à preuve d'enjeu, plusieurs dizaines de milliards de dollars sont déjà mis en jeu dans la chaîne balise. EigenLayer est un mécanisme par lequel les stakers font du restaking — ils exposent le même capital à des risques supplémentaires. Ils verrouillent leur mise dans Ethereum, et la même mise est engagée à des conditions de réduction supplémentaires. La réduction est un mécanisme par lequel votre mise peut vous être retirée, mais maintenant vous ajoutez des raisons supplémentaires pour lesquelles vous pouvez être pénalisé, en plus des contrats intelligents d'EigenLayer.

La propriété que nous voulons : la même mise assume un risque supplémentaire. Un risque supplémentaire sur quoi ? Sur la fourniture de tout nouveau service construit sur EigenLayer — quelqu'un veut construire un oracle, un pont, une couche de disponibilité des données, un nouveau protocole de consensus. N'importe lequel de ces éléments peut être construit sur EigenLayer. Si vous êtes un staker qui s'inscrit, vous spécifiez également à quel sous-ensemble de services vous participez — et gagnez ainsi des revenus tout en assumant un risque de réduction supplémentaire.

#### Comment EigenLayer aligne l'écosystème (23:50) {#how-eigenlayer-aligns-the-ecosystem-2350}

Pour les middlewares : si un staker qui a déjà mis en jeu sur Ethereum choisit de fournir également des services sur un oracle, il n'a pas de coût de capital supplémentaire. Il a déjà mis en jeu sur Ethereum et gagne un APR. En optant pour EigenLayer, le coût marginal du capital est soit très faible, soit théoriquement nul. Si vous savez qu'en tant que nœud honnête vous ne subirez jamais de réduction, le risque est minimisé. L'équation devient : le coût opérationnel est-il justifié par les revenus ? La structure de coûts des middlewares passe soudainement d'une limitation par le capital à une limitation par les coûts opérationnels.

Pour les dapps : les services particulièrement populaires auxquels de nombreux stakers participent offrent la même confiance qu'Ethereum lui-même. Si tous les stakers participent potentiellement, vous pourriez obtenir la confiance fondamentale d'Ethereum sur des services qui n'étaient pas nativement intégrés à Ethereum.

C'est également aligné sur la valeur de l'écosystème central. Les stakers qui ont mis en jeu sur Ethereum obtiennent des récompenses de bloc et des frais de transaction, mais ils peuvent également obtenir des frais d'oracle, des frais de disponibilité des données, des frais d'ordonnancement — toutes choses qui n'étaient pas disponibles auparavant. Le fait qu'il y ait des sources de revenus supplémentaires pour le staking d'ETH augmente la valeur du jeton lui-même.

EigenLayer est un marché bilatéral. D'un côté, il y a les stakers qui s'inscrivent. De l'autre côté, il y a les middlewares et les services construits sur EigenLayer qui choisissent d'utiliser ces stakers.

#### Surendettement et gestion des risques (33:00) {#over-leveraging-and-risk-management-3300}

**Question du public :** Que se passe-t-il si la mise est surendettée ?

Disons qu'il y a dix dapps différentes exécutant leurs propres chaînes, chacune avec 1 million de dollars de valeur reposant sur le même quorum de stakers de 2 millions de dollars — cette mise devient surendettée. EigenLayer est également la couche de gestion des risques. Nous modélisons cela comme un problème de graphe : chaque staker est un nœud, chaque service dépend d'un groupe de stakers, et il y a un profit tiré de la corruption pour chaque service. Ensuite, vous calculez des coupes sur ce graphe pour vous assurer que le système n'est jamais surendetté.

Si le système devient surendetté, les frais augmentent, plus de personnes s'inscrivent, et le système redevient sous-endetté. À mesure que de nouveaux services démarrent, les opportunités de rendement augmentent et plus de capital est verrouillé — au lieu que 5 % des ETH soient mis en jeu, vous pourriez en avoir 50 %.

#### Économie de l'espace de bloc (43:58) {#block-space-economics-4358}

L'espace de bloc est déterminé par la limite de bloc — la taille maximale qu'un bloc peut accueillir. Tous les systèmes de chaîne de blocs ont une économie auto-ajustable où, à mesure que la taille de votre bloc approche de la limite de bloc, les prix commencent à exploser.

La limite de bloc est fixée par l'infrastructure du nœud le plus faible. La philosophie d'Ethereum est d'admettre un validateur à domicile au Venezuela — peut-être 1 mégaoctet par seconde. C'est donc ainsi que la limite de bloc est fixée. Mais tous les stakers fonctionnant sur Amazon Web Services ont des connexions de 10 gigabits — une différence de 10 000× par rapport au nœud le plus faible.

EigenLayer résout automatiquement ce problème en créant un marché libre où ces stakers peuvent prêter leur espace de bloc supplémentaire pour d'autres services. Quelqu'un pourrait construire une autre chaîne avec 15 giga-gaz par bloc au lieu de 15 millions de gaz. Vous obtenez quelque chose comme 60 % de la sécurité d'Ethereum — et c'est déjà suffisant.

#### Hétérogénéité des stakers (48:57) {#staker-heterogeneity-4857}

L'hétérogénéité des stakers s'étend au-delà des capacités de calcul. Les stakers sont très hétérogènes dans leurs préférences en matière de risque et de récompense. Vous et moi pouvons convenir que nous subirons une réduction si nous différons d'une sortie d'API Coinbase, mais pour quelqu'un d'autre, c'est totalement inacceptable. Cela ne peut jamais être normalisé dans un protocole central, mais peut être externalisé dans une couche optionnelle.

Les stakers sont également hétérogènes dans leurs préférences de récompense. Dans Ethereum, l'espace de bloc est une quantité incolore — toutes les transactions sont égales, et le seul signal pour les distinguer est le prix. Il est très difficile de construire un réseau social sur Ethereum car chaque transaction de réseau social est en concurrence avec une transaction de finance décentralisée (DeFi) qui est beaucoup plus rentable sur une base transaction par transaction. Notre solution : les stakers s'inscrivent à différentes sous-chaînes dans lesquelles ils ont des préférences de récompense différentes.

#### Innovation démocratique et agile (51:01) {#democratic-and-agile-innovation-5101}

EigenLayer résout le problème de la conception d'une chaîne de blocs qui est à la fois démocratique et agile dans l'innovation. Ethereum est gouverné de manière très démocratique mais aussi très lent à réagir. Tous les protocoles font aujourd'hui un compromis entre l'agilité et la gouvernance démocratique. Ethereum plus EigenLayer obtient le meilleur des deux mondes : une couche de base qui est démocratique et mise à jour lentement, sur laquelle EigenLayer permet aux gens de construire des innovations qui répondent rapidement aux demandes du marché d'une manière totalement sans permission.

#### EigenDA et conclusion (52:56) {#eigenda-and-closing-5256}

Nous explorons la construction de ponts, l'automatisation pilotée par les événements, les services d'ordonnancement équitable, les chaînes latérales et l'intégration de la MEV — le tout sur EigenLayer. EigenLayer est déjà en ligne sur des réseaux de test internes. Nous avons déjà construit le premier cas d'utilisation : une couche de disponibilité des données à très grande échelle pour Ethereum appelée EigenDA. C'est une couche de disponibilité des données qui intègre les meilleures idées en matière de codage d'effacement et d'engagements polynomiaux. Sur notre réseau de test, la vitesse à laquelle vous pouvez écrire des données est de 12,4 mégaoctets par seconde — 10× plus importante que ce qu'Ethereum 2.0 est censé livrer.

L'idée clé est qu'avec le codage d'effacement, le coût total de stockage d'un fichier ne dépend pas du nombre de nœuds qui se sont inscrits. Mais le prix que vous pouvez facturer dépend du nombre de nœuds car vous offrez plus de sécurité économique. Il y a une économie auto-évolutive où de plus en plus de nœuds s'inscriront parce qu'ils peuvent facturer une prime de sécurité sans augmenter les coûts opérationnels. Le codage d'effacement brise le compromis entre la mise à l'échelle et la décentralisation — vous obtenez une décentralisation complète et une mise à l'échelle complète simultanément.

#### Points forts des questions-réponses (58:00) {#qa-highlights-5800}

**Sur les audits de middleware :** Tout comme il existe un écosystème d'audit de contrats intelligents, nous avons besoin d'écosystèmes d'audit de middleware. L'audit de contrats intelligents sert les utilisateurs qui sont censés ne rien savoir. L'audit de middleware sert les stakers qui sont censés savoir quelque chose. Si nous ne parvenons pas à faire fonctionner les audits de middleware, nous ne devrions pas non plus vraiment faire confiance aux audits de contrats intelligents.

**Sur le risque :** L'exemple extrême — toute la mise a été engagée dans un système EigenLayer où vous pourriez subir une réduction même sans rien faire de mal, et ensuite vous avez subi une réduction et l'ensemble du protocole est en danger. C'est possible. Mais ce sont les stakers qui perdent leur argent, ils devraient donc être plus prudents en s'inscrivant. Faciliter leur prudence est ce sur quoi nous nous concentrons.

**Sur l'espace de bloc l1 par rapport aux chaînes latérales :** Vous pouvez exécuter un système très différent — comme une VM Solana — sur le réseau de confiance d'Ethereum. La condition de réduction est simple : si vous signez deux fois un bloc à la même profondeur, c'est une condition vérifiable onchain et vous subissez une réduction. La structure de coûts fonctionne car les restakers n'ont pas de coût de capital supplémentaire, et la différence entre une chaîne latérale EigenLayer et le fait d'avoir votre propre chaîne est que vous n'avez pas besoin d'un nouveau jeton de valeur et que vous n'avez pas besoin de payer pour maintenir le coût du capital de ce jeton.