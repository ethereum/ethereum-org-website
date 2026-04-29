---
title: "Atomes, institutions, chaînes de blocs"
description: "Josh Stark propose un nouveau cadre pour comprendre ce que sont les chaînes de blocs, en introduisant le concept de « dureté » comme propriété commune qui relie les atomes, les institutions et les chaînes de blocs en tant que matériaux de construction de la civilisation."
lang: fr
youtubeId: "zI07mqNdxzA"
uploadDate: 2024-04-06
duration: "0:29:13"
educationLevel: beginner
topic:
  - "comment-fonctionne-ethereum"
  - "chaîne de blocs"
  - "ethereum"
format: presentation
author: ETHGlobal
breadcrumb: "Atomes, institutions, chaînes de blocs"
---

Une présentation philosophique de **Josh Stark** de la Fondation Ethereum lors de Pragma Denver 2024, proposant un nouveau cadre pour comprendre les chaînes de blocs. La conférence introduit le concept de « dureté » comme la propriété commune reliant les atomes, les institutions et les chaînes de blocs en tant que matériaux de construction de la civilisation.

*Cette transcription est une copie accessible de la [transcription originale de la vidéo](https://www.youtube.com/watch?v=zI07mqNdxzA) publiée par ETHGlobal. Elle a été légèrement modifiée pour en faciliter la lecture.*

#### Pourquoi ne pouvons-nous pas expliquer les chaînes de blocs ? (0:00) {#why-cant-we-explain-blockchains-000}

Bonjour à tous, merci d'être ici à Pragma à Denver. Je m'appelle Josh. Je travaille à la Fondation Ethereum — je suis à la FE depuis environ cinq ans maintenant. J'aime plaisanter en disant que mon travail consiste à découvrir quel devrait être mon travail, et cela change tous les six mois.

J'ai fait beaucoup de choses différentes au cours de ma carrière dans la crypto. J'ai travaillé sur un des premiers portefeuilles Bitcoin. J'ai construit — enfin, j'ai acheté — un distributeur automatique de Bitcoin à Toronto et je l'ai géré pendant environ un an en 2015. En 2017, j'ai cofondé ETHGlobal, ainsi qu'une entreprise appelée L4 travaillant sur les premières solutions de mise à l'échelle de couche 2 (l2). Et au fil des ans, j'ai écrit un tas d'articles de blog.

Malgré tout cela, je n'arrivais toujours pas vraiment à expliquer ce que nous faisions ni pourquoi. J'avais le sentiment que c'était très important, que cela allait changer le monde. Ne vous méprenez pas — je peux parler d'applications individuelles. Nous pouvons expliquer Bitcoin, les NFT, Uniswap, ENS. Toutes ces choses dans leurs petits silos ne sont pas si difficiles à expliquer. Mais quand nous essayons de parler de la vue d'ensemble — ce que cela signifie qu'il y a une seule technologie qui permet toutes ces choses — nous commençons à trébucher. Nous faisons de la gymnastique mentale, nous lançons des mots à la mode aux gens, en essayant d'expliquer les choses.

Nous devons vraiment aller au cœur du problème, et je ne pense pas que nous en soyons si proches. C'est un problème ! Si nous pouvons parler de ces applications individuelles mais que nous ne pouvons pas articuler ce qu'elles partagent — il y a quelque chose qui nous échappe. Il y a un niveau d'explication qui n'a pas encore été trouvé, et je pense que c'est important. J'ai le sentiment qu'une fois que nous l'aurons trouvé, cela semblera évident.

Donc, cela a commencé par une question très spécifique que je me posais : quelle est cette technologie à usage général ? Quelle est cette capacité fondamentale ? Et cela s'est transformé en quelque chose que je trouve beaucoup plus intéressant.

#### Claude Shannon et l'idée de l'information (4:00) {#claude-shannon-and-the-idea-of-information-400}

Laissez-moi vous raconter une histoire. Dans les années 1930 et 1940, Claude Shannon était entouré par les prémices d'une nouvelle ère. Aux Bell Labs, il a travaillé sur des systèmes de contrôle de tir et sur la cryptographie pendant la guerre, et il a commencé à réfléchir à une approche plus générale de l'information. Il ne l'appelait pas information au début — en 1939, il a écrit à un collègue qu'il réfléchissait à la « transmission de l'intelligence ». Le mot information avait un sens différent à l'époque.

Il a publié en 1948 « The Mathematical Theory of Communications » — un article fondateur qui a ouvert la voie à l'ère de l'information. Plus important encore pour nous, il a introduit pour la première fois une idée abstraite de l'information — une définition non liée à la musique, à la parole, à la littérature ou aux codes. C'est l'article qui a introduit le bit — l'unité irréductible d'information que l'on pouvait mesurer dans n'importe quel contexte.

Avant ce moment, personne n'avait vraiment ce concept de l'information comme une chose universelle et générale. Cela peut sembler fou aujourd'hui — nous utilisons les technologies de l'information depuis des milliers d'années. C'est inextricablement lié à ce que signifie être humain, utiliser la parole et le langage. Mais nous n'avons nommé la propriété sous-jacente commune à toutes ces choses que très récemment.

Ce que je veux que vous reteniez de ceci : il y a eu une époque avant que nous ayons l'idée de l'information et une époque après. Et si nous passions de la même manière à côté de quelque chose d'aussi fondamental ? C'est mon hypothèse.

#### Trois indices (7:00) {#three-clues-700}

Alors que je m'efforce d'expliquer les chaînes de blocs, je n'arrête pas de tomber sur ces choses étranges qui, je pense, sont des indices vers quelque chose de plus grand.

**Indice numéro un** — nous décrivons les chaînes de blocs comme étant à la fois sans tiers de confiance et dignes de confiance. C'est étrange. Dans le livre blanc de Satoshi, nous parlons d'éliminer le besoin de confiance. Mais dans le livre blanc d'Ethereum, nous parlons d'utiliser Ethereum pour rendre les applications plus dignes de confiance. The Economist a qualifié les chaînes de blocs de « machine à confiance ». Nous voulons dire quelque chose de réel quand nous disons que les chaînes de blocs sont sans tiers de confiance, et nous voulons dire quelque chose de réel quand nous disons qu'elles sont dignes de confiance. Notre langage n'a pas suivi. Ces contradictions apparentes méritent toujours qu'on y prête attention — parfois, elles révèlent une lacune dans nos abstractions.

**Indice numéro deux** — nous parlons beaucoup de la façon dont les chaînes de blocs sont différentes des institutions centralisées — Bitcoin contre les banques centrales, ENS contre DNS. Mais nous parlons rarement de ce qu'elles ont en commun. Elles peuvent se substituer les unes aux autres. Si vous avez déjà échangé de la monnaie fiduciaire contre du Bitcoin, vous les avez substituées l'une à l'autre. Elles doivent avoir quelque chose en commun pour que cette substitution ait lieu si régulièrement.

Avec les voitures, nous parlions de « voitures sans chevaux », mais au moins nous pouvions nommer ce qu'elles étaient — des véhicules. Avec les dossiers numériques, nous parlions de supports « sans papier », mais nous connaissions la catégorie — l'information. Il semble que nous ayons inventé une technologie avant d'avoir inventé la catégorie à laquelle elle appartient.

**Indice numéro trois** — l'article de Satoshi commence par ces mots : « le commerce sur Internet en est venu à s'appuyer presque exclusivement sur les institutions financières servant de tiers de confiance ». Satoshi comparait Bitcoin à des institutions, pas à d'autres logiciels. Il y a quelque chose là-dedans.

#### Introduction à la dureté (11:00) {#introducing-hardness-1100}

Voici ma réponse à ce qui va dans cette case. Je l'appelle la **dureté**. Voici l'histoire en cinq étapes simples, et ensuite nous irons plus en profondeur.

Premièrement — notre civilisation dépend d'infrastructures sociales comme la monnaie et la loi et tant d'autres choses, et elles doivent être fiables. Elles doivent se comporter comme nous nous attendons à ce qu'elles se comportent, du moins la plupart du temps, pour qu'elles nous soient utiles. Sinon, nous ne compterions pas sur elles — elles ne deviendraient pas une monnaie.

Deuxièmement — il est très difficile d'atteindre ce niveau de fiabilité nécessaire. Jusqu'à présent, il n'y a vraiment que trois façons dont nous l'avons jamais fait : en utilisant des atomes, en utilisant des institutions, et maintenant en utilisant des chaînes de blocs.

Troisièmement — il y a une propriété non reconnue commune aux trois, que j'appelle la dureté. La dureté est la capacité, le pouvoir, de nous permettre de rendre l'avenir plus prévisible de la manière très spécifique dont nous avons besoin pour des jeux de coordination complexes.

Quatrièmement — que ces trois sources de dureté ont chacune des propriétés différentes qui les rendent utiles dans des contextes différents.

Et cinquièmement — nous pouvons les utiliser ensemble et les substituer les unes aux autres.

Le taux d'inflation de l'or est fiable en raison des propriétés physiques de notre planète — il a la dureté de l'atome. Un contrat est fiable parce que les institutions viendront prendre vos affaires si vous ne respectez pas vos engagements. Un contrat intelligent fonctionnera parce qu'il est sécurisé par un protocole cryptoéconomique avec des milliards de dollars en jeu.

Vous pouvez considérer les atomes, les institutions et les chaînes de blocs comme des matériaux de construction — comme le bois, le béton et l'acier. Ils sont différents, mais ils font partie d'une catégorie commune. Et nous utilisons ces choses non pas pour construire des bâtiments, mais pour construire une civilisation. Peut-être qu'avec de meilleurs matériaux, nous pourrons construire une civilisation plus grande, meilleure et plus forte que celle que nous avons actuellement.

#### Qu'est-ce que la dureté ? (14:00) {#what-is-hardness-1400}

Laissez-moi donner plus de précision à ce que j'entends par dureté. Ce n'est pas n'importe quelle fiabilité que n'importe quoi pourrait avoir. La dureté est d'un genre spécifique. La première chose à noter est que c'est un type de fiabilité qui compte pour la coordination sociale. Pas seulement, vous savez, que cette table est de manière fiable une table — mais que vous pouvez payer votre loyer, qu'un contrat sera appliqué, qu'une économie est forte. C'est à cela que sert la dureté.

Et quel est exactement le résultat ? J'introduis malheureusement un autre nouveau mot ici, que j'appelle le **moulage**. Un moulage est tout état futur possible du monde qui est rendu certain ou sécurisé en utilisant la dureté. Je m'excuse pour le jargon, mais la raison d'avoir un mot ici est que je ne pense pas que nous en ayons un qui soit généralisable à toutes les sources de dureté. C'est peut-être comme le bit — nous avons besoin d'un concept dont nous pouvons parler dans de nombreux contextes différents et passer d'une source à l'autre sans être liés à l'une d'entre elles.

Un moulage lié à un prêt serait : si Alice ne rembourse pas Bob, alors les institutions légales utiliseront des menaces et des actions de plus en plus sévères pour l'y forcer. Ce moulage est durci en utilisant la dureté institutionnelle. Un moulage concernant l'or pourrait être qu'une certaine quantité d'or entrera sur le marché chaque année pendant les 20 prochaines années — rendu fiable par les propriétés physiques de notre Terre. Et un moulage concernant Ethereum pourrait être une réclamation selon laquelle les actifs ne peuvent être transférés que si vous détenez la clé privée correspondant à une certaine clé publique — durci par la dureté de la chaîne de blocs.

En pratique, nous interagissons généralement avec des ensembles de ces choses toutes tissées ensemble. Si vous possédez de l'or et le conservez dans une banque, beaucoup de choses comptent pour vous : les moulages concernant l'offre d'or à l'avenir, les moulages concernant la solidité du coffre-fort de la banque, les moulages concernant la solidité de l'accord juridique entre vous et votre banque, les moulages concernant la fiabilité du système juridique de votre pays qui appliquerait ces règles si quelque chose tournait mal.

Deuxièmement, la dureté peut être considérée comme une mesure de sécurité. Elle est toujours mesurable en théorie, même si c'est difficile à faire en pratique. À quel point ce moulage selon lequel une certaine quantité d'or entrera sur le marché chaque année pendant les 20 prochaines années est-il dur ? Une façon de l'envisager est par la probabilité — examiner toutes les données et essayer de prédire la vraisemblance. Ou vous pourriez l'envisager du point de vue des coûts : que coûterait-il à quelqu'un de briser ce moulage ? Si vous êtes un État-nation, vous pourriez utiliser les pouvoirs de la guerre et de la réglementation internationale. Ou vous pourriez aller dans l'autre sens et aller chercher un astéroïde dans l'espace contenant beaucoup d'or, contournant ainsi les limites physiques de la Terre. Il y a un prix à payer pour briser presque n'importe quel moulage.

Et enfin, la dureté provient de certaines sources — les atomes, les institutions et les chaînes de blocs. Chacune a des propriétés différentes qui les rendent utiles dans des contextes différents.

Ce que j'aime dans ce cadre, c'est qu'il nous permet de poser des questions plus profondes — pas seulement de parler des propriétés spécifiques des chaînes de blocs, mais de comparer toutes ces différentes choses et de réfléchir à l'endroit où elles sont appropriées, à la façon dont nous les utilisons et dans quelle combinaison.

#### La dureté de l'atome (19:00) {#atom-hardness-1900}

La dureté de l'atome concerne le moment où nous trouvons la fiabilité dans la nature qui nous entoure — des atomes physiques littéraux mais aussi d'autres propriétés naturelles. Nous le faisons lorsque nous utilisons des perles d'or comme monnaie, lorsque nous utilisons des structures physiques pour définir des droits de propriété, ou que nous enregistrons des droits de propriété dans un objet physique comme un acte de propriété.

Elle présente de nombreux avantages : une application automatique, un état partagé, un ensemble de règles universel. Il est très pratique pour la civilisation humaine que les règles de la physique s'appliquent partout de la même manière, du moins aux échelles macroscopiques qui nous importent le plus.

Mais elle a des faiblesses. Nous sommes limités à ce que nous pouvons trouver dans le monde. La dureté de l'atome est un peu comme un architecte qui veut intégrer une paroi rocheuse dans sa maison — vous devez en trouver une qui convient. Vous ne pouvez pas simplement fabriquer une paroi rocheuse. Vous pouvez la modifier un peu, mais vous comptez sur la découverte d'une caractéristique naturelle qui correspond à votre besoin particulier.

Nous ne pouvons pas lui donner de nouvelles règles. Nous avons de l'or, mais nous ne pouvons pas demander à l'univers de nous donner un nouveau type d'or avec une inflation plus faible, une distribution géographique plus équitable, ou peut-être de régler le problème du poids. Nous ne pouvons pas faire cela. Et elle a une programmabilité très limitée — il n'y a que certains types de choses durcies que vous pouvez fabriquer à partir de la dureté de l'atome, principalement des monnaies. Vous ne pouvez pas faire un contrat de mariage à partir d'atomes. Vous avez besoin de quelque chose de plus complexe, comme une institution, pour faire cela.

Et les moulages sont souvent sapés par notre contrôle humain croissant sur la nature. Utiliser des coquillages comme monnaie est très bien jusqu'à ce que vous fassiez partie d'une économie mondiale qui pourrait bouleverser radicalement vos attentes concernant l'inflation des coquillages, et soudainement votre économie est anéantie. Utiliser l'or comme moyen d'échange pourrait être confronté au même problème un jour si et quand nous pourrons obtenir de l'or d'astéroïdes et changer nos hypothèses sur l'offre.

Mais c'est plus subtil que cela. Parfois, nous avons des moulages dont nous ne réalisons même pas l'existence, mais ensuite ils disparaissent parce que quelque chose a changé. Il y a eu un moulage dur concernant la vitesse des transactions sur les marchés financiers pendant longtemps — cela ne pouvait se faire qu'à un certain rythme, peut-être le rythme auquel quelqu'un peut crier à un autre sur le parquet. Ce moulage avait la dureté de l'atome — nous ne pouvions tout simplement pas communiquer plus vite que cela. Mais les nouvelles technologies ont complètement sapé ces hypothèses. Nous avons réalisé que nous aimions en fait une version de cet ancien moulage et nous l'avons refait à partir d'institutions — en introduisant des réglementations qui limitent la vitesse des transactions et imposent des coupe-circuits.

#### La dureté institutionnelle (22:00) {#institutional-hardness-2200}

La dureté institutionnelle est une catégorie très vaste — elle couvre la plupart des choses auxquelles nous pourrions penser lorsque nous pensons à la civilisation. Nos systèmes juridiques, nos assemblées législatives, nos forces de police, nos entreprises, tout. Toutes les institutions qui fournissent une dureté d'une certaine sorte. Nous avons créé des moulages qui ont donné de l'ordre à nos sociétés, en punissant les comportements antisociaux. Nous avons créé la dureté comme une plateforme, permettant à quiconque de créer ses propres moulages rendus durs par les institutions si vous suivez certaines règles. Nous avons créé des moulages qui ont engendré de nouveaux actifs et fourni des sources de crédit aux économies en croissance.

La dureté institutionnelle présente de nombreux avantages. Elle est très programmable — les êtres humains regroupés en organisations peuvent recevoir des instructions vraiment complexes ou subtiles. C'est un très grand espace de conception de moulages possibles. Et elles sont faites de personnes, et les personnes sont bonnes. C'est peut-être une bonne chose que parfois quelqu'un puisse intervenir et dire : « Je ne vais pas appliquer cela parce que je pense que c'est mal. » C'est une bonne chose que parfois il y ait une faille dans le système pour que quelqu'un soit un lanceur d'alerte ou un rebelle.

Mais elle a aussi de nombreuses faiblesses. Elle est limitée par les frontières — ce n'est que dans certains pays que vous avez vraiment accès à des institutions qui font respecter l'état de droit. Elle est exposée à l'échec politique ou étatique — si votre gouvernement n'arrive tout simplement pas à s'entendre sur les choses, ou si vous êtes envahi par une nation belligérante, certaines institutions sur lesquelles vous comptez pour l'argent ou les contrats pourraient tout simplement s'effondrer. Elles sont souvent opaques — il est difficile de dire si une institution est vraiment dure ou non jusqu'à ce que quelque chose tourne mal. Elles ont un coût de démarrage élevé — nous ne pouvons pas facilement créer de nouvelles institutions à l'échelle de la Fed ou du système juridique pour itérer sur elles. Nous sommes en quelque sorte coincés avec celles que nous avons.

Et elles sont faites de personnes, et les personnes sont mauvaises. La réalité dans ce pays et dans beaucoup d'autres est que de nombreuses personnes n'ont pas vraiment eu accès à la dureté fournie par les institutions. Elles n'ont pas pu obtenir de prêt hypothécaire. Elles n'ont pas pu ouvrir de compte bancaire. Parce que lorsque vous dotez une institution de personnes, elle est soumise à leurs maux, à leurs préjugés, à leurs idéologies. Et notre dépendance à la dureté institutionnelle ne fait qu'augmenter. Le problème avec les logiciels qui dévorent le monde, c'est que la plupart des logiciels ne sont en réalité constitués que d'une institution derrière l'écran, et nous leur donnons de plus en plus de pouvoir en conséquence.

#### La dureté de la chaîne de blocs (24:20) {#blockchain-hardness-2420}

L'invention de Satoshi était bien sûr plus que le simple Bitcoin — c'était le noyau d'une technique à usage général pour créer une dureté numérique dans un environnement numérique. Elle a de nombreuses forces : un accès mondial universel, elle est faite de logiciels et n'importe qui peut écrire des logiciels, le degré de dureté peut être transparent et auditable, un faible coût de démarrage, facile à itérer, et sécurisée par les incitations du marché — et les marchés sont rationnels.

Mais elle a aussi des faiblesses. Elle nécessite une civilisation technologique — nous n'aurions pas pu avoir de chaînes de blocs avant aujourd'hui en raison des exigences, et une civilisation future qui n'a pas ce que nous avons ne pourra pas non plus les utiliser. Elle est faite de logiciels, et les logiciels peuvent être mal écrits. La portée des moulages est limitée aux environnements onchain. Et elle est sécurisée par les incitations du marché — et les marchés sont irrationnels.

#### Pourquoi c'est important (25:10) {#why-this-matters-2510}

Alors, qu'est-ce que cela signifie ? Qu'est-ce que cela nous apporte ? Pourquoi est-ce plus qu'un simple intérêt académique ?

Beaucoup de choses commencent à avoir beaucoup plus de sens lorsqu'elles sont vues à travers ce prisme. L'une d'elles est la question par laquelle nous avons commencé : pourquoi disons-nous que les chaînes de blocs sont à la fois sans tiers de confiance et dignes de confiance ? L'explication est la suivante — quand nous disons que les chaînes de blocs sont sans tiers de confiance, ce que nous voulons vraiment dire, c'est que leur dureté ne dépend pas d'une personne ou d'une institution. Et quand nous disons qu'elles sont dignes de confiance, nous voulons simplement dire qu'elles ont une dureté — juste d'un genre différent. Notre incapacité à faire cette distinction est ce qui cause ce langage confus.

Cela explique pourquoi les chaînes de blocs privées ou centralisées ne sont pas intéressantes. Une chaîne de blocs qui n'est pas décentralisée redevient simplement une institution. Si elle est contrôlée par trois banques ou une poignée de validateurs tous financés par la même organisation, alors ce n'est qu'une EVM sécurisée par la dureté institutionnelle. La chose la plus intéressante à propos des chaînes de blocs n'est pas l'EVM — c'est qu'il y a une source différente de dureté qui n'est pas corrélée ou soumise aux mêmes échecs et limitations que les institutions. C'est pourquoi c'est différent. C'est pourquoi c'est important.

Cela aide également à comprendre le spectre des possibilités et les idéologies par défaut dans lesquelles les gens tombent dans l'espace des chaînes de blocs. Beaucoup de gens sont très concentrés sur l'utilisation de la dureté de la chaîne de blocs pour concurrencer ou remplacer la dureté institutionnelle — c'est ce dont il s'agit dans une grande partie de la communauté Bitcoin, ce dont il s'agit dans une grande partie de la finance décentralisée (DeFi). Même ENS essaie de remplacer ou de concurrencer DNS d'une certaine manière. Mais il y a aussi des gens qui voient que la dureté de la chaîne de blocs peut faire des choses que la dureté institutionnelle ne peut pas faire — des idées que personne n'a jamais essayées auparavant parce que nous n'avions jamais eu cette capacité, cette certaine saveur de dureté. Et maintenant, nous pouvons explorer ces choses. Peut-être que les NFT sont là, ou des jeux comme Dark Forest, ou le mouvement autour des mondes autonomes.

#### Élever nos ambitions (27:00) {#raising-our-ambitions-2700}

Plus important encore, je pense que ce cadre élève nos ambitions. Personnellement, c'est ce qui compte pour moi, et peut-être que cela résonne en vous — je ne suis pas seulement ici pour ces applications individuelles. Je ne suis pas quelqu'un qui ne s'intéresse vraiment qu'à Bitcoin ou qu'à la DeFi ou qu'aux NFT. C'est peut-être votre cas aussi. Il se passe quelque chose de plus grand ici.

Nous pouvons honnêtement viser plus haut que l'argent. Nous pouvons viser plus haut que la finance. Il y a une vue d'ensemble beaucoup plus vaste. Je pense que cela aide réellement à définir une vision qui semble adéquate en termes d'échelle par rapport aux défis auxquels nous sommes confrontés et aux opportunités qu'offrent les chaînes de blocs.

La mission n'est pas seulement de remplacer la Fed. La mission est d'améliorer et d'étendre les matériaux mêmes que nous avons utilisés pour construire notre civilisation — de réduire le coût de ces outils afin que tout le monde sur Terre y ait accès, pour permettre à plus de changements de se produire. Et d'ailleurs, ce coût va bientôt baisser.

Pour aider l'humanité à continuer à jouer à ce jeu infini en permettant à plus de personnes de changer les règles. Très peu de gens peuvent promulguer une loi, mais n'importe qui peut écrire un contrat intelligent. Nous élargissons cette capacité.

Je pense que beaucoup de gens dans de nombreux pays différents et de nombreuses idéologies ont l'impression que nous sommes coincés — que les règles du jeu ne sont plus ce qu'elles devraient être, mais que nous sommes impuissants à les changer. Nous sommes coincés de tant de manières dans ce maximum local, et nous pressentons que c'est mal. Les chaînes de blocs ne réparent pas cela, mais je pense qu'elles peuvent aider. Elles ouvrent un nouvel espace d'expérimentation. Elles permettent à plus de personnes de changer les règles, d'écrire de nouvelles règles, de contribuer à ce jeu infini. Nous ne pouvons pas écrire de lois, mais nous pouvons écrire un contrat intelligent.

Je veux terminer sur cette note : si vous avez déjà vu des conférences de personnes de la FE, vous savez que nous aimons beaucoup le livre *Finite and Infinite Games*. L'une des maximes de ce livre est que seul ce qui peut changer peut continuer. Nous ne pouvons pas rester coincés dans ce maximum local. Nous devons changer les choses. Et je pense que les chaînes de blocs nous aident à le faire. Merci beaucoup.