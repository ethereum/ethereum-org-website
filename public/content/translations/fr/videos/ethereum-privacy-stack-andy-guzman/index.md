---
title: "La pile de confidentialité d'Ethereum : lectures privées, réseau et fuite cachée"
description: "Andy Guzman explique comment les métadonnées fuient lorsque les portefeuilles lisent des données sur Ethereum, et comment la recherche sur les lectures privées et le réseau de la feuille de route sur la confidentialité colmate la fuite de la couche d'accès."
lang: fr
youtubeId: "tvAqDJXCBaA"
uploadDate: 2026-02-16
duration: "0:27:00"
educationLevel: intermediate
topic:
  - "privacy"
  - "roadmap-and-priorities"
format: presentation
author: EthBoulder
breadcrumb: "Pile de confidentialité d'Ethereum"
---

Une présentation d'**Andy Guzman**, responsable de l'équipe Privacy Stewards of Ethereum (PSE) à la Fondation Ethereum, lors de l'EthBoulder 2026. Il expose un angle mort majeur de la confidentialité sur Ethereum : même les utilisateurs qui ne signent jamais de transaction divulguent des données comportementales détaillées via des requêtes quotidiennes. Il présente la pile de confidentialité d'Ethereum, couvrant les lectures privées (PIR), la confidentialité du trafic (routage en oignon et mixnets), et les travaux sur les performances tels que les arbres binaires unifiés et l'état vérifiable par ZK.

*Cette transcription est une copie accessible de la [transcription vidéo originale](https://www.youtube.com/watch?v=tvAqDJXCBaA) publiée par EthBoulder. Elle a été légèrement modifiée pour en faciliter la lecture.*

#### La lettre fictive du fournisseur RPC (0:12) {#the-fictional-rpc-provider-letter-012}

Bonjour à tous, je suis Andy, et je voulais aborder un sujet qui n'est pas souvent discuté dans l'écosystème Ethereum et qui est extrêmement important. Comme vous l'avez peut-être remarqué sur la diapositive et dans l'introduction, cela concerne la confidentialité, et la façon dont nous sommes sous-protégés sans même nous en rendre compte.

Laissez-moi commencer par une lettre que quelqu'un vous a écrite.

« Cher utilisateur précieux, merci pour les 847 requêtes que vous avez effectuées ce mois-ci. Nous avons vraiment apprécié apprendre à vous connaître. Nous savons que vous détenez des ETH sur trois portefeuilles différents. Nous savons que vous avez vérifié le prix de l'ETH 94 fois mardi dernier. Ce fut une journée très difficile pour tout le monde, donc nous ne jugeons pas. Vous avez également vérifié le prix du BTC, ce qui est intéressant, car vous ne détenez aucun Bitcoin. Pensez-vous à vous diversifier ? Cela restera entre nous, et bien sûr nos partenaires d'analyse. Vous surveillez également de très près deux pools Uniswap, et vous avez vérifié votre facteur de santé Aave 14 fois la semaine dernière. Vous devriez peut-être vous détendre, ou simplement ajouter du collatéral. Jeudi, vous l'avez vérifié trois fois en 12 minutes, et vous étiez très inquiet. Vous avez consulté quatre noms ENS différents, donc soit vous lancez un nouveau projet, soit vous traversez une crise d'identité. Et vous êtes toujours inactif entre 23 h et 7 h, heure des Rocheuses. »

#### Comment vous divulguez des données sans signer de transactions (1:34) {#how-you-leak-data-without-signing-transactions-134}

« Nous sommes donc assez convaincus que vous êtes basé à Boulder, ou à proximité. Vous n'avez jamais signé une seule transaction par notre intermédiaire. Vous n'en avez jamais eu besoin. Votre curiosité nous a tout dit. Chaleureusement, votre fournisseur RPC. »

Bien sûr, il s'agit d'une lettre fictive, mais elle décrit quelque chose que nous divulguons réellement tous les jours. Même si vous n'effectuez aucune transaction ou action onchain, vous dites essentiellement tout à n'importe quelle entreprise d'analyse qui adorerait mettre la main sur ces données et vos comportements.

#### Écritures privées contre lectures privées (2:07) {#private-writes-vs-private-reads-207}

Alors, que se passe-t-il vraiment en ce moment dans le monde de la confidentialité ? Je constate que nous mettons beaucoup l'accent sur la confidentialité onchain, ou ce que nous appelons chez PSE les écritures privées : toutes les actions que vous effectuez onchain. Et c'est logique, n'est-ce pas ? Ces actions sont enregistrées pour toujours et transmises dans le monde entier, il est donc logique de ne pas divulguer votre adresse lors d'une action spécifique. Nous mettons également beaucoup l'accent sur les outils : sources de données, preuves, DSL et langages que nous pouvons utiliser pour donner aux développeurs plus d'outils afin d'exprimer et de créer des applications plus robustes offrant davantage de confidentialité onchain.

Mais je veux démontrer dans cette présentation que nous n'accordons pas du tout assez d'attention et d'efforts à ces autres domaines : ce que nous appelons les lectures privées, car chaque fois que vous interrogez des données sur une chaîne de blocs, vous divulguez beaucoup d'informations, et le réseau privé, car avant même que quoi que ce soit n'arrive onchain, tout votre trafic fuite.

Pour être un peu plus technique : tous les appels RPC, comme eth_getBalance, eth_call et eth_getLogs, sont des requêtes en texte clair qui vont vers les fournisseurs RPC et sont corrélées avec votre adresse IP.

#### Pourquoi plus d'activité augmente le risque de profilage (3:20) {#why-more-activity-increases-profiling-risk-320}

Avec ces informations, il devient très facile de profiler les gens, de les segmenter et de modéliser les comportements. Et cela peut être utilisé contre vous. Comme vous pouvez l'imaginer, l'information, c'est le pouvoir, et plus les gens ont d'informations sur vous et votre comportement, plus ils ont de pouvoir sur vous.

La plupart des gens ne s'en rendent pas compte. La plupart des gens diront, d'accord, eh bien, ce n'est pas vraiment grave car ce ne sont pas des informations critiques. Ou ils pourraient penser : plus il y a d'activité, plus je serai protégé. C'est totalement faux, et contre-intuitif. Pour les actions onchain, partout où il y a des ensembles d'anonymat, cela aide : plus il y a d'utilisateurs, plus il y a de confidentialité, et plus il est facile de se fondre dans la masse. Mais avec les lectures, c'est l'inverse, car les requêtes ne sont pas interchangeables. Plus vous transmettez d'activité, plus vous entreprenez d'actions, plus la surface de corrélation est riche et plus il est facile de dresser un profil de vos actions.

Ainsi, chaque fois qu'il y a une folie autour de la finance décentralisée (DeFi) ou des NFT, les gens deviennent plus négligents. La sécurité opérationnelle (OpSec), bien sûr, passe à la trappe, et il devient beaucoup, beaucoup plus facile de désanonymiser les gens en fonction des modèles d'activité dans lesquels la plupart des gens tombent.

#### Présentation de la pile de confidentialité d'Ethereum (4:43) {#introducing-the-ethereum-privacy-stack-443}

Je veux commencer par le paysage : où devons-nous attaquer, de quoi avons-nous besoin, et qui travaille sur quoi. Cette présentation abordera des sujets un peu plus techniques et d'autres plus conceptuels de haut niveau, afin que chacun puisse en tirer profit.

Je souhaite présenter ce que j'appelle la pile de confidentialité d'Ethereum, ou les couches de la pile de confidentialité d'Ethereum, et je pense qu'il est utile d'y réfléchir. Si nous voulons vraiment la confidentialité, nous n'avons pas seulement besoin de confidentialité onchain ; nous avons également besoin de confidentialité dans toutes ces couches de la pile, de manière similaire au cycle de vie d'une transaction, ou au modèle OSI et ses couches technologiques. Je dirais que nous pourrions créer un standard, ou une sorte de reconnaissance à l'échelle de l'écosystème, que ces couches existent. Ce n'est peut-être pas la forme finale, mais je pense que c'est sans doute déjà utile.

#### Couche par couche : où vous fuyez (5:41) {#layer-by-layer-where-you-leak-541}

Le sommet est la couche application. Chaque fois que vous visitez un site web, bien sûr, vous divulguez ce que vous visitez, et les gens peuvent commencer à profiler : ensembles d'anonymat, identifiants, lier votre adresse IP à ce que vous visitez, même si vous ne faites rien.

La suivante est la couche du portefeuille. Chaque fois que vous entreprenez une action, vous ne divulguez pas seulement des informations à la couche application, mais aussi aux passerelles. Les portefeuilles sont actuellement très complexes, ils s'intègrent à de nombreux autres systèmes et services, et vous divulguez beaucoup plus d'informations que vous ne l'imaginez. Même si vous ouvrez simplement votre portefeuille et qu'il interroge le prix de l'ETH ou votre solde, vous divulguez tout.

Ensuite, vous avez les passerelles : les RPC, les proxys, les relayeurs. Vous divulguez encore plus de métadonnées. Puis ce que les gens imagineraient comme l'élément onchain, c'est-à-dire chaque fois que des éléments sont interrogés sur l'EVM, comme l'état ou les modèles d'exécution. Par exemple, interroger le solde de quelque chose, ou l'état d'un contrat intelligent. Et enfin le consensus, où se trouvent tous les validateurs. Selon que vous écrivez onchain ou lisez onchain, vous pourriez également toucher la mempool.

Et il y a une autre verticale, qui est ce que nous appelons le réseau, qui est transversale, traversant toutes ces couches. Par exemple : en ce moment, vous visitez un site web et le serveur connaît votre adresse IP. Mais que se passerait-il si vous visitiez ce site web via Tor ou un autre réseau anonyme ? Vous connaîtriez l'adresse IP du site web, mais ils ne connaîtraient pas la vôtre. Et que se passerait-il si ce site web était hébergé dans un pays qui a récemment commencé à censurer tout ce qui touche à la crypto ? Ce site web et cette entreprise voudraient également cacher leur adresse IP, et voudraient cacher leur domaine derrière un domaine onion.

Ce sont les types de choses qui ont du sens : nous devons y aller couche par couche, tout renforcer, en analysant à travers le prisme d'un attaquant très perturbateur qui veut tout censurer. Même si nous ne le faisons pas, et que nous disons que nous vivons dans un état suffisamment bon, ces informations sont enregistrées maintenant et seront hébergées pour toujours par de nombreuses personnes que vous ne connaissez même pas, des entreprises qui commencent à vendre vos données. Finalement, dans cinq ans, quelqu'un pourrait interdire la crypto et dire : « quiconque a utilisé Uniswap au cours des cinq dernières années, je suis le fisc, je vais commencer à frapper à votre porte et vous mettre en prison », ou autre. Ces scénarios dystopiques se produisent dans différents pays du monde en ce moment.

#### Lectures privées et réseau privé (8:24) {#private-reads-and-private-networking-824}

D'accord, nous avons donc la pile de confidentialité d'Ethereum. Sur quoi devrions-nous nous concentrer ? Dans cette présentation, je veux parler de ces deux domaines. Les lectures privées : chaque fois que vous accédez à l'état depuis onchain, vous touchez toutes ces couches, de l'application, disons que je veux interroger le prix de l'ETH, au portefeuille, aux passerelles, à un nœud qui exécute Ethereum et l'EVM, puis retour. Essentiellement un fournisseur RPC ou un indexeur. Et le réseau privé, qui correspond à toutes les actions qui se produisent sur la couche réseau. C'est ce que nous voulons renforcer.

#### Trois piliers : données, trafic, performances (9:05) {#three-pillars-data-traffic-performance-905}

Il y a trois piliers qui, je pense, sont essentiels pour que nous y parvenions. Nous voulons cacher et rendre privées les données elles-mêmes. Nous voulons cacher et rendre privé le trafic lui-même. Et puis nous voulons rendre cela performant, utile, pratique et bon marché. Cela résume beaucoup d'informations sur ce qui se passe dans l'écosystème, mais je pense qu'il est utile de dresser un état des lieux et d'identifier les points de levier où nous pouvons accélérer.

#### Cacher les données : des proxys au PIR (9:39) {#hiding-data-from-proxies-to-pir-939}

Donc, les données. Qu'est-ce que nous voulons protéger ? Nous voulons cacher les informations que vous demandez à ces serveurs, et nous voulons cacher les modèles de la façon dont vous accédez à ces données. Non seulement le contenu, mais aussi les modèles.

Il existe différents niveaux de technique. Le premier n'est rien : vous divulguez simplement tout. Chaque fois que vous connectez votre portefeuille, vous liez votre adresse IP au contrat que vous interrogez, à un eth_getBalance spécifique pour une adresse spécifique, et c'est tout. Même si vous utilisez un protocole de confidentialité, disons Tornado Cash, et que vous souhaitez interroger l'état de l'arbre de Merkle, vous devez soit télécharger l'arbre entier, ce qui n'est pas très performant, soit vous divulguez le chemin et les feuilles que vous interrogez, réduisant ainsi votre ensemble d'anonymat. Donc, même l'utilisation d'un protocole de confidentialité robuste comme Tornado Cash ne suffit pas si vous ne protégez pas votre réseau et vos modèles d'accès aux données.

Le niveau suivant est une sorte de proxys ou de relais : beaucoup de machines qui ne savent pas d'où vient la requête et finissent par récupérer les données. Ce n'est pas très pratique, et ce n'est pas très sans tiers de confiance.

Ensuite, vous avez les TEE, qui constituent une avancée, et c'est là que certaines équipes et entreprises proposent des services. Je pense que c'est un bon pas en avant, mais ce n'est pas suffisant, encore une fois parce que le coût d'attaque et de corruption des TEE baisse considérablement. Pour certains cas d'utilisation critiques, ce n'est pas suffisant ; pour de nombreux cas quotidiens, cela pourrait l'être.

Il y a d'autres équipes qui travaillent sur les OMAP, les modèles d'accès aux cartes inconscients (oblivious map access patterns), et l'ORAM, la RAM inconsciente (Oblivious RAM). Ce sont des techniques similaires qui tentent d'offusquer les parties de l'ensemble de données auxquelles vous essayez d'accéder. Au lieu de dire « Je veux le solde de cette adresse ETH », vous accédez aléatoirement à différentes choses, de sorte que le serveur ne le sait pas.

Et je dirais que l'aboutissement de tout cela sera le PIR, la récupération d'informations privées (private information retrieval), ce qui signifie que le serveur ne sait pas ce que vous interrogez et n'apprend rien à ce sujet.

#### Explication de la récupération d'informations privées (12:03) {#private-information-retrieval-explained-1203}

La récupération d'informations privées est une technique super puissante en cryptographie, et elle va être beaucoup utilisée. Il existe deux variantes : le PIR par indice, que vous pouvez utiliser si vous avez des données structurées sous un indice, et le PIR par mot-clé, où, comme son nom l'indique, vous interrogez par mot-clé. Il est très difficile d'avoir un seul schéma qui fonctionne pour tout.

L'état d'Ethereum est immense et très varié. Les journaux, comme je l'ai appris hier, sont en ajout seul, mais le modèle de compte est différent : certains états sont mis à jour très fréquemment, d'autres non. Selon la façon dont vous le découpez et l'analysez, vous pouvez avoir des mégaoctets, des gigaoctets ou des téraoctets de données, avec des modèles d'accès très différents.

#### Une architecture PIR multi-agents (12:48) {#a-multi-agent-pir-architecture-1248}

La proposition sur laquelle nous travaillons au sein de PSE, et ici je vais parler de manière conceptuelle, puis des projets spécifiques que nous menons chez PSE et d'autres choses que je vois dans l'écosystème, est une architecture multi-agents. Il n'y a pas de schéma unique qui soit parfait pour tout l'état d'Ethereum. Mais si nous pouvons découper l'état d'Ethereum par type ou par modèle d'accès, nous pouvons trouver de très bons schémas pour chacun d'eux.

Et si nous avions un service qui exécute cette architecture multi-agents, et selon le type de requêtes et où elles pourraient se trouver dans l'état d'Ethereum, il exécute un schéma ou un autre ? Cela nous rapproche déjà beaucoup de quelque chose de réalisable, capable d'être mis en production et proposable à l'écosystème. Cela nécessitera quelque chose comme une API unifiée, afin que les portefeuilles, les indexeurs, les utilisateurs et les développeurs d'applications décentralisées (dapp) n'aient pas à se soucier du schéma utilisé et de la façon de l'appeler. Vous avez juste l'API standard, et quelqu'un d'autre se soucie des détails d'implémentation.

Nous le faisons déjà et mettons en œuvre deux schémas différents. Nous allons ouvrir des subventions, et nous essayons de coordonner plus de personnes dans l'écosystème pour s'attaquer à certains d'entre eux et voir lesquels sont les plus nécessaires pour Ethereum.

Voici quelques chiffres sur différents schémas PIR : débits, surcharge de communication, etc. C'est difficile, car différentes applications ont des modèles d'accès différents. Certaines accèdent à beaucoup de reçus, d'autres veulent accéder à une plus grande partie de l'état, comme Rotki, et d'autres accèdent à plus de transactions, comme Helios. Il n'y a pas de solution miracle, et il est très probable qu'une architecture mixte sera utile. Nous faisons également une systématisation des connaissances, donc si cela vous intéresse, nous pouvons la partager. Et voici juste quelques-unes des équipes travaillant dans ces domaines. Pardonnez-moi si vous faites partie d'une équipe et que je ne vous ai pas inclus ; si quelqu'un voit l'enregistrement et qu'il manque, n'hésitez pas à me le faire savoir et je pourrai commencer à vous ajouter.

#### Cacher le trafic : routage en oignon et Tor (15:22) {#hiding-traffic-onion-routing-and-tor-1522}

Nous avons couvert les données. L'autre grand volet est le trafic. Comment cachons-nous le trafic, et que voulons-nous cacher ? En termes très simples, nous voulons cacher les adresses IP du client et du serveur l'une de l'autre, et du reste du monde qui pourrait espionner le trafic. Nous avons différentes techniques : services onion, mixnets, VPN, DC-nets, et il pourrait y avoir d'autres classifications. Je vais juste parler des deux premières.

Les techniques de routage en oignon chiffrent par couches, et le trafic est également déchiffré par couches. Les personnes intermédiaires ne peuvent jamais connaître l'origine, certaines ne peuvent jamais connaître la destination, et certaines n'apprennent jamais rien ; elles agissent simplement comme des routeurs.

En résumé : et si tout le trafic de l'écosystème Ethereum pouvait être acheminé via le réseau Tor, pour ainsi dire ? Il y a aussi d'autres options. Nous aiderions à protéger l'adresse IP de l'expéditeur : votre téléphone ou votre ordinateur portable ne fuiterait pas lorsque vous envoyez des transactions ou demandez des informations. Et bien sûr, nous protégerions également le récepteur, le serveur. Imaginez qu'en Iran, en Chine, en Corée du Nord ou au Venezuela, quelqu'un essaie d'héberger un protocole de finance décentralisée (DeFi) ou un service et qu'il soit censuré par son pays. C'est une option qui pourrait protéger leur vie. Elle contourne la censure et cache également le trafic aux FAI, les fournisseurs d'accès à Internet, qui, nous le savons tous, sont sur écoute par les agences de renseignement qui espionnent tout.

L'objectif est d'avoir une solution de remplacement prête à l'emploi : un SDK, afin que les portefeuilles, les développeurs d'applications décentralisées (dapp) et les fournisseurs d'infrastructure n'aient pas à se soucier des détails d'implémentation. Ils savent juste que s'ils utilisent ce SDK, le trafic est « oignonisé », chiffré et renforcé.

Il y a une équipe que je tiens à saluer, l'équipe de Brume Wallet, qui a lancé Echalote, une implémentation open source de Tor pour le web. Cela existe en ce moment : il y a des clients Tor, mais ils sont écrits en C, et ils doivent s'exécuter dans un navigateur spécial. Et si je veux ajouter cela à MetaMask, ou au portefeuille Kohaku, ou à Ambire, Rabby, et tous les autres ? Nous avons besoin de SDK JavaScript, et c'est ce qu'Echalote a commencé.

Ensuite, le Projet Tor a une nouvelle implémentation en cours de développement appelée Arti, la prochaine génération de leur client. Mais nous avons besoin d'un Arti embarqué. Arti est basé sur Rust, et il doit être compilé en WASM pour pouvoir s'exécuter dans votre navigateur, afin que vous puissiez l'importer très facilement. Nous avons essentiellement une collaboration avec l'équipe Tor : des appels chaque semaine, et quelques projets et partenariats ensemble.

#### Mixnets pour Ethereum (18:16) {#mixnets-for-ethereum-1816}

Du côté des mixnets, je tiens à saluer plusieurs équipes qui abordent ce sujet : l'équipe Nym ; HOPR, également l'une des premières ; des VPN comme Gnosis VPN ; et quelques autres qui étaient nouveaux pour moi, comme Anyone Protocol, et je pense que quelqu'un de cette équipe devrait être ici à Denver, plus quelques autres nouveaux. Il y a de nombreuses équipes qui travaillent sur les mixnets, les VPN et d'autres approches.

Nous voulons voir : et si nous créions un mixnet spécialement conçu pour Ethereum, où nous pourrions acheminer le trafic RPC ? Les mixnets offrent de solides garanties, mais ils ajoutent beaucoup de latence. Pour certains cas d'utilisation, c'est très bien : peu importe si cela prend un peu plus de temps, tant que vous avez la confidentialité. Mais pour des choses comme la finance décentralisée (DeFi) et le trading, il est extrêmement peu probable qu'ils soient adoptés s'ils ajoutent de la latence. Alors, quelle est la vitesse maximale que nous pouvons atteindre avec les garanties de confidentialité les plus élevées ? Encore une fois, un grand bravo à certaines de ces équipes, et si quelqu'un travaille dans ces domaines et que je ne vous ai pas ajouté, j'adorerais discuter.

#### Performances : arbres binaires unifiés et accélération GPU (19:28) {#performance-unified-binary-trees-and-gpu-acceleration-1928}

La dernière chose dont je veux parler, le troisième pilier pour faire de cela une réalité, ce sont les performances. Nous voulons que ces choses s'exécutent rapidement et à moindre coût. J'ai un principe : ces choses ne seront pas adoptées si le coût est supérieur aux avantages. Le coût signifie l'expérience utilisateur, le temps et les efforts pour l'utilisateur, mais aussi le coût pour les développeurs et l'infrastructure : est-ce très coûteux à exécuter ? Nous devons réduire les coûts autant que possible, et il y a deux initiatives de haut niveau dont je peux parler.

L'une d'elles est l'UBT. Selon votre implication dans les EIP du protocole, vous en avez peut-être entendu parler. En ce moment, nous avons le trie de Merkle Patricia, qui est utile, mais pas très utile pour les ZK et d'autres types de cryptographie. Il y a une proposition, l'EIP-7864, qui passe non pas aux arbres Verkle mais aux arbres binaires unifiés. C'est beaucoup plus efficace pour interroger l'état et ensuite effectuer des opérations cryptographiques comme les ZK par-dessus.

Nous avons un projet réalisant un UBT vérifiable : vous ajoutez un sidecar à n'importe quel client Ethereum, qui, au lieu d'exécuter une base de données MPT, possède une base de données d'état UBT, et ensuite vous prouvez que cette transformation de MPT à UBT est valide en utilisant une zkVM. C'est déjà très puissant. Une fois que nous aurons réussi à faire cela, les clients légers pourraient l'utiliser pour augmenter leurs performances, et des choses comme le PIR pourraient s'exécuter beaucoup plus rapidement.

L'autre aspect est l'accélération GPU. Nous pouvons exécuter ces choses beaucoup plus rapidement si nous optimisons les niveaux inférieurs de la pile : le GPU en est un, ou l'accélération CPU également. Ces choses s'exécuteront probablement sur des serveurs, pas sur des téléphones, il est donc également très précieux de commencer à explorer comment nous pouvons créer ces bibliothèques de bas niveau pour qu'elles s'exécutent beaucoup plus rapidement.

Pour résumer jusqu'à présent : nous avons ces cinq couches, et nous voulons couvrir ces cas d'utilisation. Il y a trois piliers : les données, le trafic et les performances. Pour les données, nous avons les proxys, les TEE, les ORAM, les OMAP et le PIR. Pour le trafic, nous avons les mixnets, le routage en oignon et d'autres. Pour les performances, nous avons l'UBT et l'accélération GPU. Si vous souhaitez en savoir plus, du moins sur les contributions de PSE, vous pouvez vous rendre sur pse.dev/research.

#### Mesurer le succès (22:15) {#measuring-success-2215}

Alors, qu'est-ce que le succès, et comment pouvons-nous le mesurer ? Pour en revenir à ces couches : si je veux pouvoir affirmer qu'Ethereum est la chaîne la plus privée, quel est l'objectif final ? J'aurais besoin de me sentir à l'aise avec le fait que toutes ces couches sont extrêmement renforcées. Comment le mesurerais-je ? Je m'attendrais à ce que davantage de sites web et de frontends d'applications décentralisées (dapp) soient hébergés derrière des domaines onion. J'adorerais que les portefeuilles utilisent nativement le routage anonyme, ainsi que les passerelles, les fournisseurs RPC et les indexeurs. Et je mesurerais un pourcentage.

La question est : parmi les frontends actuels de l'écosystème Ethereum, combien sont hébergés derrière un domaine onion ? Je dirais extrêmement peu, 1 % tout au plus. Pour que je me sente bien et que je dise que nous avons réussi, il nous faudrait probablement plus de 80 % à toutes ces couches. Combien de portefeuilles acheminent actuellement le trafic via des techniques de routage anonyme ? Très, très peu. Même chose avec les fournisseurs RPC : ces fournisseurs proposent-ils le PIR ? Non. Donc pour moi, revendiquer le succès signifie que les acteurs à toutes ces couches adoptent ces types de technologies, au moins 80 % des équipes, du trafic ou des requêtes.

#### Comparaison avec les nœuds onion de Bitcoin (23:39) {#bitcoins-onion-node-comparison-2339}

C'est une chose pour laquelle nous pouvons être jaloux de Bitcoin. Malgré toutes les critiques qu'ils reçoivent, voici une image de novembre de l'année dernière : 64 % de leurs nœuds complets accessibles sont cachés derrière des domaines onion.

Pouvons-nous le faire nous-mêmes ? Il s'agit d'une confidentialité de niveau inférieur, au niveau du consensus, mais pourrions-nous dire que nos nœuds complets et nos nœuds validateurs sont derrière un réseau onion ou des mixnets ? Je pense vraiment que nous devrions le faire, et nous sommes probablement à moins de 1 %. Nous avons d'autres défis qu'ils n'ont pas : nous fonctionnons beaucoup plus rapidement, et notre consensus est différent. Mais j'adorerais avoir des tableaux de bord comme celui-ci et dire que plus de 80 % des portefeuilles ont adopté ces types de technologies, ainsi que les fournisseurs RPC, les explorateurs, les frontends, les équilibreurs de charge et les SDK. J'adorerais que cette liste s'allonge.

#### Comparaison d'Ethereum avec Monero et Zcash (24:55) {#comparing-ethereum-to-monero-and-zcash-2455}

J'ai pris la liberté, hier soir et la nuit précédente, de commencer à voir comment, à travers ce prisme de couches, l'écosystème Ethereum se compare à des choses comme Solana, Bitcoin, Zcash et Monero. Les éléments en jaune sont des techniques optionnelles (opt-in), et je pense que nous sommes très bons là-dessus. Les éléments en bleu sont des propositions, certaines d'entre elles étant des propositions de protocole. Les éléments en vert sont appliqués au niveau de la couche du protocole.

En raison de notre histoire de 10 ans en tant que chaîne publique, je pense qu'il sera difficile de rattraper Monero et Zcash pour rendre la confidentialité native. Mais je pense que nous pouvons faire un très bon travail pour obtenir une adoption optionnelle, et influencer culturellement et socialement les équipes et les utilisateurs pour qu'ils adoptent davantage de ces techniques. Bitcoin et Solana ont leurs propres défis, et je pense qu'ils seront plus en retard, du moins sur ces questions de confidentialité.

#### Le défi : l'écosystème programmable le plus privé (25:50) {#the-challenge-the-most-private-programmable-ecosystem-2550}

Mon objectif, et l'objectif que je veux vous mettre en tête, est qu'Ethereum devienne l'écosystème le plus privé, sans permission, sans tiers de confiance et programmable au monde. Nous avons d'autres chaînes de paiement privées, et c'est super, elles sont très bonnes, mais je pense qu'elles auront beaucoup plus de mal à devenir programmables et à créer l'écosystème que nous avons créé.

Mon défi pour vous, et bien sûr pour moi et mon équipe, est de devenir, parmi les écosystèmes programmables, le plus sans permission, sans tiers de confiance et privé. Nous ne pouvons pas nous concentrer uniquement sur les éléments onchain. Nous devons nous concentrer sur toutes ces couches.

Donc, si vous travaillez sur les lectures privées, le réseau, les implémentations PIR, l'accélération GPU, les structures de données, l'UBT, l'infrastructure ou les validateurs, j'adorerais discuter avec vous par la suite. Merci beaucoup. Ethereum est pour la confidentialité.