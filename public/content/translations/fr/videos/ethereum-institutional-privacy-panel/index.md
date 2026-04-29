---
title: "La confidentialité institutionnelle sur Ethereum aujourd'hui"
description: "Un panel lors de l'événement Web3Privacy Now pendant Devconnect 2025, réunissant des experts pour discuter des besoins réels en matière de confidentialité institutionnelle sur Ethereum, de la conformité aux preuves à divulgation nulle de connaissance."
lang: fr
youtubeId: "cZqlg4W1Els"
uploadDate: 2025-11-22
duration: "0:30:50"
educationLevel: advanced
topic:
  - "privacy-and-security"
  - "privacy"
format: panel
author: Web3Privacy Now
breadcrumb: "Confidentialité institutionnelle"
---

Un panel lors de l'événement Web3Privacy Now pendant Devconnect 2025, animé par **Oskar Thorin** (IPTF/EF), avec **Zach Obront** (Etherealize), **Amzah** (ABN Amro), **Eugenio** (European Blockchain Association) et **François** (Polygon Miden), discutant des besoins réels en matière de confidentialité institutionnelle sur Ethereum, de la conformité réglementaire aux preuves à divulgation nulle de connaissance pour la finance décentralisée (DeFi) institutionnelle.

*Cette transcription est une copie accessible de la [transcription originale de la vidéo](https://www.youtube.com/watch?v=cZqlg4W1Els) publiée par Web3Privacy Now. Elle a été légèrement modifiée pour en faciliter la lecture.*

#### Introduction à l'Institutional Privacy Task Force (0:03) {#introduction-to-institutional-privacy-task-force-003}

**Oskar Thorin :** Bonjour. Vous m'entendez ? Très bien. Super. Nous allons d'abord faire une très courte présentation d'introduction — environ 3 à 5 minutes — qui nous mènera ensuite au panel. Il s'agit d'une présentation abrégée. Le panel précédent a beaucoup parlé de conformité, de confidentialité, etc. J'ai donné une présentation précédente au Cyban Congress qui a également abordé ce sujet, et il y aura une version plus longue de cette présentation lors du DeFi Day plus tard dans la journée. Mais ce dont je veux parler, c'est de la confidentialité institutionnelle sur Ethereum.

Je m'appelle Oskar et je suis le responsable de l'IPTF à la Fondation Ethereum. Cela signifie Institutional Privacy Task Force. Et pourquoi la confidentialité institutionnelle est-elle importante ? Elle l'est pour plusieurs raisons. Je pense qu'une des raisons principales est que si vous regardez ces énormes institutions financières qui existent, nous parlons de milliers de milliards de dollars de flux monétaires. Autrefois, la réglementation était le plus grand obstacle à leur passage onchain. Mais ce qui s'est passé ces dernières années, c'est qu'en réalité, la confidentialité est devenue leur plus grand obstacle.

Alors, quels sont le levier et l'impact ici ? Je pense que le simple fait de déplacer 1 % des fonds de la finance traditionnelle vers Ethereum aurait un impact massif en termes d'impact qu'Ethereum peut avoir sur la confidentialité. Et le simple fait d'avoir une seule institution intégrée ici touche également des millions d'utilisateurs, n'est-ce pas ? Ce n'est pas hypothétique. Il y a des institutions qui sont déjà onchain, et il y a de multiples choses qui vont se passer au cours de l'année prochaine environ. C'est le moment idéal pour que les institutions passent onchain avec une confidentialité intégrée.

Une seule grande institution ici peut avoir un impact massif sur l'écosystème qui finira par l'emporter — que ce soit Ethereum ou des versions plus privées. Pourquoi veulent-elles Ethereum ? Il y a plusieurs raisons. Des éléments comme la liquidité, la résistance à la censure, 10 ans de disponibilité, et le fait que ce soit un argument de vente en termes de règlement. Il existe également d'autres alternatives, mais elles présentent des limites différentes. 

Pour qu'Ethereum puisse intégrer ces institutions, il faut répondre à ces préoccupations en matière de confidentialité. Ce que nous essayons de faire à l'Institutional Privacy Task Force, c'est d'intégrer les institutions sur Ethereum et de nous assurer que leurs objectifs de confidentialité sont atteints. Nous organisons des ateliers, en essayant de démystifier le secteur et de nous assurer que nous pouvons répondre aux besoins institutionnels en matière de confidentialité spécifiquement. Le premier artefact que nous avons est cette carte de la confidentialité institutionnelle — nous parlons à des institutions massives, comprenons leurs cas d'utilisation commerciaux et leurs exigences, rendons open source autant que possible, puis nous parlons aux fournisseurs du secteur pour connecter les institutions à l'espace des solutions. 

#### Présentations du panel et problèmes institutionnels (5:00) {#panel-introductions-and-institutional-problems-500}

**Oskar Thorin :** Désolé, c'était un peu rapide, mais j'espère que c'était compréhensible. Ce panel réunit donc de nombreux experts en recherche, en politique et en ingénierie, et nous allons parler de la confidentialité institutionnelle. 

Juste une brève présentation : Nous avons Eugenio, qui est le responsable de la croissance à la European Blockchain Association. Nous avons Zach Obront, PDG d'Etherealize, où il crée des produits institutionnels et des primitives de confidentialité sous-jacentes. Nous avons Amzah, qui a passé la majeure partie de sa carrière dans la gestion des risques financiers avant de s'impliquer profondément dans Ethereum, et qui fait maintenant le pont entre les contrôles traditionnels et les marchés natifs d'Ethereum. Et enfin, nous avons François, ingénieur protocole principal chez Polygon Miden, spécialisé dans les systèmes de preuve à divulgation nulle de connaissance.

Pour commencer, en une phrase ou peut-être quelques phrases, sur quels problèmes institutionnels travaillez-vous qui nécessitent réellement une confidentialité sur des infrastructures publiques plutôt que sur une simple base de données traditionnelle ou une chaîne privée ? Nous pouvons peut-être commencer par François.

**François :** Oui, bien sûr, vous pouvez toujours construire sur une chaîne de blocs privée, mais aujourd'hui, nous pensons que les institutions veulent accéder à la liquidité mondiale offerte par Ethereum tout en conservant ce qu'elles ont du monde de la finance traditionnelle, c'est-à-dire un degré de confidentialité qui leur permet de négocier avec la liquidité mondiale sans rendre l'intégralité de leurs transactions publiques. Pour nous, c'est pourquoi il est important à la fois d'intégrer la confidentialité, mais aussi de construire sur Ethereum.

**Eugenio :** Eh bien, je peux peut-être aborder cela sous un angle différent — du point de vue des normes. Dans le processus de normalisation, il y a un concept très important pour les institutions, qui est l'ancre de confiance. Essentiellement, chaque institution dispose d'un vaste environnement hors chaîne, vers lequel elle ancre sa responsabilité dans la société pour tous ceux qui utilisent ses services. Une partie du grand problème dans la création de services basés sur la chaîne de blocs pour les institutions est de savoir comment créer un système efficace pour faire le pont entre l'ancre de confiance et le monde onchain, puis comment intégrer des techniques cryptographiques pour s'assurer que les données sont traitées de manière minimale, mais auditable et vérifiable.

**Zach Obront :** Super. Chez Etherealize, nous nous concentrons sur la mise à niveau de certains des rouages profonds des marchés financiers, en particulier les marchés du crédit. Je vais donc aborder la question sous deux angles. Le premier est : *pourquoi la confidentialité ?* Actuellement, tous ces marchés fonctionnent sur des accords bilatéraux. Il y a deux parties. Elles sont très habituées à l'idée que seules les informations exactes qui doivent fuiter, fuitent, et rien d'autre. Et donc, la seule façon pour elles d'envisager les chaînes de blocs publiques est que ce niveau de confidentialité soit respecté. 

Dans l'autre sens, *pourquoi être sur une chaîne de blocs publique ?* Ce sont des marchés complexes avec des parties qui ne se font pas nécessairement confiance et qui doivent s'appuyer sur la réglementation de différents pays. Avoir une source de vérité au centre de ces marchés est un avantage énorme dont on ne peut se passer sans une chaîne de blocs publique. En ce moment, ils sont un peu au point mort et se disent : « Il y a ce potentiel de mise à niveau, mais nous ne pouvons pas le faire sans la confidentialité dont nous avons besoin. » Nous essayons de réunir ces deux aspects.

**Amzah :** Oui. Je travaille pour ABN Amro, qui est une grande banque néerlandaise. Nous avons 5 millions de clients de détail. Nous ne construisons donc rien de spécifique à la confidentialité pour le moment, mais ce qui arrive maintenant, c'est par exemple un portefeuille d'identité numérique. Habituellement, cela fonctionne de la manière suivante : les données sont stockées dans une base de données centralisée, puis vous vous connectez à un fournisseur externe ou à un tiers, mais ce n'est bien sûr pas vraiment sûr. Nous commençons donc déjà à réfléchir à la manière dont nous pouvons utiliser les preuves à divulgation nulle de connaissance (ZK), par exemple, afin d'avoir une divulgation sélective avec des parties externes. Dans ce sens, nous pouvons protéger les informations de nos clients et également leur permettre de se connecter à l'environnement Web3 plus large.

#### Flux de travail concrets et stockage (10:07) {#concrete-workflows-and-storage-1007}

**Oskar Thorin :** D'accord, super. Si vous choisissez un flux concret qui pourrait vous intéresser — comme peut-être des émissions d'obligations, des transactions ou un paiement de trésorerie — qui peut voir quoi exactement à quelle étape, et qu'est-ce qui est stocké onchain par rapport à hors chaîne ? Nous pouvons peut-être commencer par François.

**François :** Une excellente façon d'aborder cela est de le faire du point de vue de la volonté de négocier avec un DEX sur Uniswap. Ce qui est bien, c'est que nous pouvons proposer sur Miden quelque chose qui offre un anonymat complet. Nous avons des comptes anonymes qui négocient entre eux par le biais de billets (notes). C'est un mélange du modèle de compte et du modèle UTXO. 

Si vous négociez avec une plateforme, cette plateforme voudra être publique. En tant que DEX, vous voulez republier les prix chaque fois que vous avez interagi avec quelqu'un. Vous émettez donc des billets dans un lot. En tant qu'utilisateur, il n'y a rien onchain à l'exception de ce que la plateforme pourrait être en mesure de déchiffrer. La plateforme exécute votre transaction et émet des billets à la sortie. Ces billets peuvent ensuite être réclamés par des comptes qui peuvent être entièrement privés. Vous conservez donc un anonymat complet en ce qui concerne les utilisateurs — à l'exception de la plateforme qui a décidé de révéler certaines informations publiquement. En plus de cela, nous construisons des flux de conformité, qui incluent des flux de travail d'auditabilité et des politiques de clés de visualisation (view-key) qui permettent l'ingénierie de marché au niveau local.

**Eugenio :** Eh bien, je peux peut-être l'aborder davantage d'un point de vue fonctionnel. En général, chaque flux d'émission ou de distribution pour les services institutionnels repose sur trois piliers clés. Le premier est l'identité et la confiance, qui est lié au flux d'intégration pour les investisseurs, aux processus KYC/KYB, etc.

Le deuxième est l'application des politiques. Le compte collecte toutes les informations de cet environnement hors chaîne et génère un déclencheur vers un relevé d'exécutions sur la chaîne de blocs. Dans ce contexte, les techniques de préservation de la confidentialité peuvent permettre une distribution efficace. Par exemple, une offre qui ne peut être distribuée qu'à certains types d'investisseurs associés à certains types de comptes.

Le troisième pilier est le reporting. Il est associé à l'intégration et aux opérations de négociation onchain. Le ciment de tous ces services est la façon dont nous extrayons des attestations de données onchain les points de données dont nous avons réellement besoin hors chaîne pour fournir un reporting traditionnel à nos clients à la fin.

**Zach Obront :** La réponse à cette question est très différente selon le flux, n'est-ce pas ? C'est l'un des défis dans ce domaine — il est difficile d'avoir des principes généraux. Un exemple de flux est un gros prêt où un paiement d'intérêts est effectué, et une tonne de prêteurs sont répartis. L'attente est que personne ne devrait être au courant de cela. Il n'y a pas de réglementation à ce sujet. Il est permis que ce soit totalement privé, et nous voulons être en mesure de prendre en charge cette extrémité du spectre. 

À l'autre extrémité, il y a peut-être un échange de positions entre les prêteurs, et on s'attend à ce que certaines parties administratives puissent voir que la transaction a eu lieu, mais pas le prix. Peut-être que d'autres peuvent voir tous les détails. Nous avons tout construit autour de ce modèle flexible où nous ne voulons pas coder en dur les règles de conformité. Nous voulons dire qu'un utilisateur ou une application peut le déterminer par lui-même. Nous avons la capacité d'appliquer des règles permettant aux régulateurs ou aux organes administratifs de voir des choses, ou même de fournir des données agrégées à des associations.

**Amzah :** Oui. Je suis globalement d'accord avec ce que Zach a dit. Dans le passé, lorsque les institutions pensaient à la confidentialité, elles lançaient simplement une chaîne privée à laquelle participaient peut-être 20 banques et seules elles étaient capables de voir ce qui s'y trouvait. Mais en réalité, c'est beaucoup plus nuancé. Cela dépend du cas d'utilisation, du type de flux et de ce que le régulateur a besoin de savoir. Vous pouvez mettre des informations de solde onchain sous une forme plus agrégée en utilisant la preuve de réserves, par exemple.

#### Exigences non négociables (15:26) {#non-negotiable-requirements-1526}

**Oskar Thorin :** Eugenio et Amzah, de la part des banques, des plateformes et des régulateurs, quelles sont les exigences non négociables que vous entendez sans cesse ? Comme les pistes d'audit, les règles KYC ou les exigences de reporting ?

**Eugenio :** Je dirais la responsabilité en ce qui concerne le processus d'intégration, et la conformité associée au reporting. Pour moi, il s'agit de traduire des exigences commerciales concrètes en structures techniques. Le diable se cache dans les détails — que votre utilisateur soit une application ou un investisseur crée un flux de processus différent pour votre écosystème. L'objectif devrait être de construire ce système efficacement, sinon nous serons bloqués dans l'adoption. C'est pourquoi l'infrastructure de compte sur Ethereum évolue d'une manière très intéressante.

**Amzah :** Oui, rien à ajouter à cela. 

**François :** Notre cofondateur passe des semaines avec des clients dans l'espace institutionnel, et la demande principale qui revient est le « contrôle ». Qui voit quoi, quand, et pour quelle raison. Et puis vous déclinez ces conversations dans les détails et elles deviennent incroyablement personnalisées. Pour nous, c'est génial car le monde de la finance traditionnelle a passé des décennies à construire ses pratiques comptables et ses flux de lutte contre le blanchiment d'argent et le financement du terrorisme (AML/CTF). Ils sont très précis sur ce contrôle. Nous construisons donc ces capacités au niveau du protocole et accompagnons les clients dans leur parcours.

#### Compromis et liquidité mondiale (18:10) {#trade-offs-and-global-liquidity-1810}

**Oskar Thorin :** Quels sont les principaux compromis avec lesquels vous vivez actuellement ? Performance contre confidentialité, ou liquidité mondiale contre contrôles stricts, ou transparence onchain contre registres hors chaîne ? En commençant par Zach.

**Zach Obront :** Heureusement, nous sommes sur un marché où la vitesse n'est pas la plus grande priorité. De nombreux marchés du crédit se règlent en plusieurs semaines, donc les secondes ne sont pas leur préoccupation principale. Mais l'expérience utilisateur (UX) de la confidentialité est très difficile. Les chaînes de blocs sont très douées pour maintenir ce concept d'état en file d'attente, gérer si les choses changent et s'assurer que les transactions sont ordonnées correctement. À mesure que nous commençons à mettre en file d'attente des transactions privées, les choses se compliquent. Nous devons trouver la meilleure expérience utilisateur qui s'accorde avec la confidentialité, d'autant plus que les gens s'attendent à ce que les systèmes soient à la fois privés et faciles à utiliser.

**François :** Je voulais souligner les compromis que nous *n'avons pas*, grâce à Ethereum. Les institutions ne veulent vraiment entrer sur les marchés que si cela en vaut la peine, ce qui signifie qu'elles veulent un marché mondial avec des effets de réseau, une liquidité profonde et de nombreuses contreparties. Être un rollup sur Ethereum, plutôt qu'une chaîne privée ou une énième couche 1 (l1), nous donne accès à ce marché profond.

Bien sûr, il y a des complexités. Nous accordons beaucoup d'importance à cette expérience sur mesure pour une institution qui entre sur ce marché, afin qu'elle puisse avoir ses propres conditions. L'un des défis est l'équilibre entre la confidentialité et la résistance aux menaces. Il existe des acteurs malveillants dans le monde du Web3, et nous voulons mieux gérer cela pour offrir une expérience fantastique. Nous abordons la décentralisation avec prudence — nous savons comment le faire, mais nous le ferons au moment où cela servira le mieux les clients.

#### Confiance dans le système et moteurs d'adoption (20:47) {#system-trust-and-adoption-drivers-2047}

**Oskar Thorin :** Eugenio, comment rendez-vous ces solutions fiables et utilisables par les institutions et les gouvernements ?

**Eugenio :** Tout commence par essayer de considérer les services institutionnels comme des systèmes intégrés, où chaque partie du système a sa propre règle d'accès spécifique. De la création des données à la compression des données sur la couche 2 (l2) et à la décentralisation des données sur la couche 1 (l1). Si nous combinons ce système où l'environnement hors chaîne détient l'hypothèse de confiance de l'institution, nous pouvons allouer différents processus à la couche 2 (l2) et à la couche 1 (l1).

**Oskar Thorin :** Amzah, comment envisagez-vous de rendre les systèmes fiables et utilisables ?

**Amzah :** Pour nous, il est vraiment important que ce soit personnalisable. La chaîne de blocs n'est plus un simple cas d'utilisation où tout est entièrement public ou entièrement privé. Ce n'est pas une solution universelle. Ce qui est également le plus important pour nous, c'est d'être conforme à la réglementation. Le secteur bancaire en Europe est fortement réglementé, et si quelque chose n'est pas correct en matière de confidentialité, cela ne passe tout simplement pas auprès des régulateurs.

#### Perspectives pour 2026 (23:15) {#looking-ahead-to-2026-2315}

**Oskar Thorin :** Très bien, nous sommes presque à la fin. Quel est l'élément fondamental — technique, opérationnel ou politique — qui, selon vous, accélérerait de manière significative l'adoption institutionnelle ? Et si nous nous revoyons en 2026, que pensez-vous qu'il soit réaliste de voir se réaliser cette année ?

**Zach Obront :** Je pense qu'« institutionnel » et « confidentialité » sont actuellement des termes très larges, et ils se croisent différemment selon les cas d'utilisation. Certains se soucient de se connecter à des marchés liquides, tandis que d'autres veulent simplement une meilleure infrastructure interne. Cela nous ferait avancer d'obtenir de la clarté sur les situations spécifiques que nous essayons de résoudre. Il n'y a pas eu de catégorisation approfondie des exigences de conformité. Pousser à cartographier ces exigences et à les transformer en un protocole qui les prend en charge améliorerait notre capacité à construire, plutôt que de nous appuyer sur un monde fragmenté dirigé par des avocats.

**Amzah :** La technologie a parcouru un long chemin avec les preuves à divulgation nulle de connaissance et le chiffrement entièrement homomorphe. Je pense que l'une des choses les plus importantes à améliorer est l'éducation des régulateurs et des institutions. Ils ont peut-être entendu parler des preuves à divulgation nulle de connaissance, mais ils ne savent pas vraiment comment elles fonctionnent. La majorité des régulateurs pensent encore d'un point de vue juridique — si quelque chose casse, qui pouvons-nous appeler ? Et s'il n'y a personne à appeler, c'est une perception difficile pour eux.

**Eugenio :** Sur le plan technologique, la preuve en temps réel ZK et l'agrégation nous permettront vraiment de construire des cas d'utilisation complexes combinant des applications, des clients institutionnels et la couche 1 (l1). Je soutiens également ce qu'Amzah a dit sur l'éducation. Pour 2026, j'aimerais voir un engagement plus collaboratif entre les projets afin que les applications puissent vraiment commencer à avoir accès à la liquidité mondiale et aux réseaux mondiaux.

**François :** Si nous nous revoyons dans un an, j'aimerais avoir lancé le Réseau principal de Miden au printemps, afin que nous puissions célébrer cela. Au-delà de cela, j'aimerais que nous soyons en route vers une décentralisation complète. Il faudra tout un village. La chose principale que je veux voir se produire est plus d'engagement. L'idée que la confidentialité est en contradiction avec la conformité n'est pas vraiment vraie, mais marier les deux demande du travail. Nous voulons que les institutions aident à façonner le type de marchés qu'elles veulent voir, car nous savons que cela va être complexe et spécifique à leurs besoins.

#### Réflexions finales (28:05) {#closing-thoughts-2805}

**Oskar Thorin :** Je veux juste donner à chacun de vous 10 à 20 secondes pour mentionner quelque chose qui s'est passé cette semaine ou faire une petite annonce avant de terminer.

**Amzah :** Il y a trois ans, j'étais bénévole pour aider lors de l'un des premiers Devconnects. Voir comment les gens perçoivent les institutions aujourd'hui par rapport à l'époque est une amélioration massive.

**Zach Obront :** C'est tout simplement incroyable à quel point la confidentialité est dans l'air du temps cette année. Mon parcours est dans la sécurité, et il y a un manque de chercheurs en sécurité qui comprennent ces choses. À tous ceux qui se trouvent à cette intersection, je vous encourage à vous y investir à fond.

**Eugenio :** Je choisirais l'organisation de la réglementation des données — je pense qu'il y a beaucoup d'espoir pour les ZKP dans un domaine de données conforme, et la couche d'interopérabilité d'Ethereum aidera à amener les institutions onchain.

**François :** C'est très difficile en tant qu'ingénieur ; généralement, vous entendez parler d'un sujet de niche. Nous avons récemment intégré des précompilations sur Miden, ce qui ouvre la vérification des flux impliquant l'apprentissage automatique. Si vous êtes un nerd de l'extrême comme moi, vous voulez vraiment faire de l'apprentissage automatique et des preuves d'apprentissage automatique, et c'est maintenant une chose que nous pouvons faire.

**Oskar Thorin :** Je tiens à remercier tous les panélistes. Nous avons entendu des perspectives très intéressantes sur la technologie, la politique et l'ingénierie. Nous n'avons fait qu'effleurer la surface, mais je vous recommande d'en discuter davantage si ce sujet vous intéresse. Merci.