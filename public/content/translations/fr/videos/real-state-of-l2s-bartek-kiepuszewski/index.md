---
title: "Keynote : le VRAI état des l2"
description: "Une présentation sur l'état actuel des solutions de couche 2 (l2), examinant l'écart entre les promesses de sécurité des rollups et la réalité, et proposant une voie vers une véritable décentralisation."
lang: fr
youtubeId: "ik2JxmHDmyw"
uploadDate: 2024-11-13
duration: "0:26:15"
educationLevel: advanced
topic:
  - "mise-a-l-echelle-et-couche-2"
  - "rollups"
  - "couche-2"
format: presentation
author: Ethereum Foundation
breadcrumb: "État des l2"
---

Une keynote de **Bartek Kiepuszewski**, fondateur de L2BEAT, à la Devcon SEA, examinant l'état actuel des solutions de couche 2 (l2), l'écart entre les promesses de sécurité des rollups et la réalité, les nouvelles catégories d'évaluation, et l'engagement de L2BEAT à consacrer des ressources importantes à la vérification des systèmes de preuve au cours de l'année à venir.

*Cette transcription est une copie accessible de la [transcription originale de la vidéo](https://www.youtube.com/watch?v=ik2JxmHDmyw) publiée par la Fondation Ethereum. Elle a été légèrement modifiée pour en faciliter la lecture.*

#### Introduction (0:00) {#introduction-000}

En tant que fondateur de L2BEAT, j'ai l'opportunité unique de travailler avec pratiquement toutes les équipes de l2 existantes, et nous travaillons avec elles depuis les tout débuts de cet écosystème — c'est-à-dire il y a environ quatre ans. C'est incroyable. Le temps passe très vite. Nous avons travaillé avec les premiers pionniers de la technologie à divulgation nulle de connaissance (ZK), nous avons travaillé avec le Plasma Group qui a été rebaptisé Optimism, nous avons travaillé avec Arbitrum. Et depuis cette scène, je tiens à saluer toutes ces équipes, car sans votre soutien, nous ne serions certainement pas là. Chez L2BEAT, nous sommes extrêmement reconnaissants pour tout le soutien que la communauté nous apporte.

Jetons donc un coup d'œil à ce que nous avons réussi à accomplir. Tout d'abord, nous avons réussi à lancer près de 50 rollups et plus de 50 autres l2. C'est une réalisation incroyable — cela représente beaucoup de systèmes, et nous en avons presque autant à lancer dans les mois à venir. Nous avons également placé beaucoup de valeur, une importante valeur totale bloquée (TVL), sur ces systèmes, et si vous regardez les graphiques, ils ne font que monter.

Le fait est qu'avec toute cette croissance vient aussi beaucoup de responsabilités. Nous devons comprendre que les utilisateurs finaux qui utilisent ces systèmes placent de l'argent dans ces rollups parce qu'ils croient que les rollups héritent de la sécurité d'Ethereum. Avec cette prise de conscience, à mon avis, nous devons commencer à prendre la sécurité au sérieux.

#### Mettre Ethereum à l'échelle (2:10) {#scaling-ethereum-210}

Nous avons également réussi à mettre Ethereum à l'échelle. Ethereum fonctionnait plutôt bien, mais il a commencé à devenir vraiment lent face à la demande et les frais devenaient très élevés. Donc, nous sommes assurément en train de passer à l'échelle — ces chiffres augmentent également. C'est incroyable.

Cependant, il y a un « mais ». Vous savez, les amis, il y a toujours un « mais », n'est-ce pas ? Et je suis juste ici pour être honnête avec vous tous. Je veux vraiment que cet écosystème devienne sérieux, et c'est l'occasion pour moi de solliciter votre soutien pour nous assurer de ne pas échouer — de ne pas décevoir les attentes de la communauté. Nous devons commencer à être vraiment sérieux quant à la sécurité de ce que nous construisons.

Parce que vous savez, nous utilisons des petites roues depuis trop longtemps. Si vous êtes un adulte et que vous utilisez des petites roues — et je le répète, cela fait quatre ans — alors vous êtes vraiment immature. C'est normal d'utiliser des petites roues quand on est un enfant. Ce n'est pas normal d'utiliser des petites roues quand on est un adulte. Et je pense qu'il est temps pour nous tous d'arrêter d'être timides à ce sujet. Nous devrions tous nous exprimer, et nous ne devrions pas souffrir du syndrome des habits neufs de l'empereur.

#### Le grand « mais » : l'absence de systèmes de preuve (4:30) {#the-big-but-missing-proof-systems-430}

Alors, quel est ce grand « mais » ? Eh bien, tout d'abord, la plupart des l2 d'aujourd'hui n'ont pas de système de preuve, ce qui est assez surprenant car les premiers pionniers comme StarkNet, comme zkSync, comme Aztec — il y a quatre ans, lorsqu'ils lançaient leurs premiers rollups spécifiques à des applications, ils avaient des systèmes de preuve. Donc oui, vous pouvez lancer aujourd'hui un l2 en un clic. Cependant, est-ce vraiment un l2 ? Est-ce vraiment un rollup ? Ce que vous faites, c'est lancer quelque chose qui est sécurisé par un multisig. Je ne pense pas que ce soit suffisant.

L'état de l'écosystème aujourd'hui ressemble un peu à ce diagramme. À gauche, vous pouvez voir les l2 actuels avec un système de preuve. À droite, vous pouvez voir les l2 actuels sans système de preuve. Et je parierais que la grande majorité des l2 à venir n'auront pas de système de preuve. Cela inclurait pratiquement toutes les chaînes OP Stack à l'exception d'OP Mainnet et de Base — et bravo à eux, d'ailleurs, ce sont des champions. Cependant, toutes les autres chaînes OP Stack n'ont tout simplement pas de système de preuve.

Ce graphique à droite inclura également toutes les piles Orbit, qui ont un système de preuve, mais qui se trouvent en réalité derrière une liste blanche à permission souvent très courte. Parfois, cette liste blanche ne compte qu'un seul acteur — c'est le même que le proposant d'état. C'est essentiellement le proposant d'état et il n'y a que lui qui puisse se contester lui-même. Genre, pardon ? Sérieusement.

#### Conseils de sécurité (6:00) {#security-councils-600}

Aujourd'hui, la plupart des l2 n'utilisent pas de conseils de sécurité. Qu'entendons-nous par conseil de sécurité ? Un conseil de sécurité est essentiellement un multisig composé d'au moins huit participants et nécessitant un seuil de consensus de 75 %. Vous pouvez donc le voir comme un grand multisig, mais ce n'est pas seulement une question de taille — c'est le fait que nous voulons que les participants soient géographiquement décentralisés. Vous avez peut-être entendu hier une présentation incroyable sur la nécessité de la géo-diversification. C'est ce que nous attendons de ces structures. Et fondamentalement, nous voulons surtout que les participants viennent d'entreprises différentes et de juridictions différentes. C'est super important, et je vais vous montrer quelques exemples du pourquoi.

Considérez les conseils de sécurité comme des multisigs surpuissants. Il y a une couche sociale très importante derrière eux. Voici donc l'état actuel des choses, et encore une fois, c'est très mauvais. Nous n'avons des conseils de sécurité que chez Arbitrum, Optimism, Polygon, zkSync — et je sais que StarkNet, Scroll, et de manière intéressante Fuel, se lancent avec un conseil de sécurité. Tous les autres sont essentiellement de très petits multisigs internes, souvent privés, et franchement, il est extrêmement difficile de faire la différence entre ces multisigs et de simples EOA.

#### Hypothèses de confiance sur la disponibilité des données (7:25) {#data-availability-trust-assumptions-725}

Le troisième grand point sur lequel nous nous sommes trompés est que la plupart des l2 qui ne sont pas des rollups sont configurés avec des hypothèses de confiance sur la disponibilité des données (DA) épouvantables. Et j'utilise le mot « épouvantable » — A, parce que je l'aime bien, et B, parce que c'est vraiment, vraiment mauvais.

Regardez ces exemples à gauche — Arbitrum, StarkEx, Immutable X. Cependant, presque tous les autres publient littéralement la DA sur leur serveur dans la cave ou autre. Nous n'en avons aucune idée. Nous n'en avons littéralement aucune idée. Le fait est qu'ils sont vraiment mauvais et qu'ils n'ont pas l'air de s'en soucier. Alors peut-être que les utilisateurs s'en fichent — nous ne savons pas. Mais nous devons vraiment examiner ces données et dire à tout le monde : hé, ce n'est pas un comité de disponibilité des données (DAC).

Un comité de disponibilité des données (DAC) a été initialement créé et défendu par StarkWare pour les implémentations StarkEx et par Arbitrum. Mais ce n'était pas le but — que vous puissiez dire « J'ai un serveur dans ma cave, je peux l'appeler un comité de disponibilité des données ». Ce n'était pas le but de cet exercice.

Donc, dans l'ensemble, je suis désolé de le dire, mais pour le moment dans la plupart des l2, des opérateurs à permission peuvent voler ou geler vos fonds. Nous sommes ici pour vous en faire prendre conscience. Désolé de le dire, mais nous devons changer d'attitude.

#### Pourquoi les systèmes de preuve sont importants (8:40) {#why-proof-systems-matter-840}

Pourquoi devrions-nous nous soucier des systèmes de preuve ? Il y a au moins trois bonnes raisons, à notre avis, pour lesquelles nous devrions tous avoir un système de preuve fonctionnel.

La première est que cela permet en fait une sortie sans permission au cas où tous les opérateurs seraient hors ligne — et ils peuvent l'être pour n'importe quelle raison. Nous avons eu très récemment le cas de dYdX qui est tombé en panne. Ils ont prévenu les utilisateurs, beaucoup d'utilisateurs ne sont pas sortis. Cependant, si vous avez un système de preuve, vous pouvez concevoir le système de manière à ce que, sans permission, quelqu'un prenne le relais, ou vous pouvez construire un mécanisme de retrait d'urgence pour que les utilisateurs puissent récupérer leurs fonds. C'est super important. Sans système de preuve, vous ne pouvez tout simplement pas faire cela — c'est impossible.

La deuxième raison est que vous pouvez réellement améliorer les hypothèses de confiance du conseil de sécurité — en supposant bien sûr que vous en ayez un. Et la raison en est assez nuancée. Ce que vous pouvez faire maintenant, c'est ceci : au lieu de la situation où un proposant malveillant — et c'est le diagramme montrant le rollup optimiste classique sans système de preuve, que vous pouvez voir dans beaucoup d'OP Stacks aujourd'hui — il y a un multisig très fort qui peut outrepasser la racine d'état, et il y a un proposant qui soumet des propositions de racines d'état. Si cette proposition est malveillante, tout ce qu'ils ont à faire est de soudoyer une minorité des membres du conseil de sécurité pour qu'ils détournent le regard — non pas pour faire quelque chose de malveillant, mais simplement pour ne rien faire, auquel cas la proposition malveillante passera effectivement et ils voleront les fonds.

Une fois que vous introduisez un système de preuve, la situation est beaucoup plus difficile pour le proposant malveillant, car il doit maintenant soudoyer la **majorité** du conseil de sécurité. Non seulement ils doivent soudoyer la majorité, mais ils doivent en fait les obliger à faire quelque chose de malveillant — pas simplement détourner le regard. C'est une proposition très différente. Faire détourner le regard à quelqu'un, c'est dire : « Hé, si je te donne 10 millions de dollars, tu perds juste tes clés ou tu pars pour un long vol international. » Si vous voulez obliger quelqu'un à faire quelque chose de malveillant, c'est une proposition entièrement différente. Nous pensons que cela modifie fondamentalement les hypothèses de confiance, en particulier avec un conseil de sécurité public.

Enfin, les systèmes de preuve — si vous êtes au Stade 2 — vous permettent de supprimer tout intermédiaire quel qu'il soit. Vous n'avez pas besoin d'un conseil de sécurité, ou si vous en avez un, c'est uniquement pour les situations d'urgence. Cela peut donc avoir de profondes implications réglementaires. Vous pourriez vouloir lancer votre l2 en tant que système de Stade 2 dès le départ. C'est possible, mais bien sûr, vous devez avoir un système de preuve — idéalement, vous pourriez vouloir en avoir plus d'un. Il y a déjà des annonces de systèmes qui font cela, comme la récente annonce de l'équipe Nethermind construisant un rollup prévu pour être au Stade 2 dès son lancement.

#### Pourquoi des conseils de sécurité, et non des multisigs (11:29) {#why-security-councils-not-multisigs-1129}

C'était pour les systèmes de preuve. Maintenant, pourquoi des conseils de sécurité et pas de simples multisigs ? La raison est la suivante : ne croyez pas que les multisigs sont des multisigs. C'est la raison — à moins qu'il n'y ait une couche sociale qui puisse réellement vous convaincre qu'ils sont fondamentalement diversifiés.

Nous avons eu plusieurs grands événements dans notre histoire. Nous avons eu Multichain qui prétendait être très décentralisé, et il s'est avéré que non, ils ne l'étaient pas — et c'est une affirmation que vous ne pouvez pas vraiment vérifier de manière indépendante. Énorme attaque, ou coup monté de l'intérieur, ou arnaque (rug pull) — nous n'en sommes pas sûrs.

Ensuite, nous avons eu une situation avec Oasis, où ils ont été approchés par un tribunal britannique et ont dû utiliser le multisig pour extraire des fonds du protocole. Il aurait été impossible de faire cela si vous aviez un conseil de sécurité géopolitiquement diversifié, car il n'y a aucune ordonnance de tribunal qui puisse réellement atteindre tout le monde.

Enfin, très récemment, nous avons subi une attaque sur un multisig. Ne pensez pas une seconde que les multisigs ne peuvent pas être attaqués. À terme, nous devons nous débarrasser de tous.

Donc pour résumer : si vous avez un rollup de Stade 0 sans conseil de sécurité, un opérateur malveillant peut essentiellement faire ce qu'il veut de vos fonds. Si vous êtes un rollup de Stade 0 avec un conseil de sécurité, alors un attaquant doit soudoyer une minorité du conseil de sécurité — peut-être une chose difficile à faire, mais beaucoup plus facile que de soudoyer la majorité du conseil de sécurité, ce que vous devriez faire si votre rollup a un système de preuve. Et enfin, personne ne peut voler vos fonds si vous êtes au Stade 2. C'est la promesse d'atteindre le Stade 2.

#### Reclassification proposée (13:10) {#proposed-reclassification-1310}

La question est : avons-nous les bonnes incitations pour que les projets s'en soucient réellement ? Le problème est que la seule chose que nous puissions faire — nous en tant que L2BEAT et nous en tant que communauté Ethereum — c'est d'exercer une pression sociale. Vitalik a déclaré qu'à partir de l'année prochaine, il prévoyait de ne mentionner publiquement que les l2 qui sont au Stade 1. Il avait même dit auparavant qu'il n'appellerait pas les systèmes des rollups s'ils ne sont pas au Stade 1.

Nous nous demandions donc ce que nous pouvions faire. Pour le moment, nous avons des stades pour les rollups. Nous n'avons pas de stades pour les validiums et les optimiums. Nous nous sommes longtemps demandé — peut-être pourrions-nous introduire un « Stade 0+ » pour les systèmes qui ont des systèmes de preuve mais qui ne sont pas encore au Stade 1. Mais après des mois de discussion, nous avons décidé : non, il est temps de grandir.

Ce que nous proposons à la communauté — et cela va être publié sur le forum pour recueillir les avis de la communauté — c'est ceci. Tout d'abord, nous voulons créer une catégorie distincte pour les systèmes. La principale différence est que vous devrez avoir un système de preuve pour être au Stade 0. Ainsi, par exemple, StarkNet aujourd'hui sera au Stade 0 selon cette classification. Toutes les chaînes OP Stack qui n'ont pas de système de preuve — à l'exception de Base et Optimism — n'entreront pas dans cette catégorie. Et bien sûr, nous laisserons le temps aux systèmes de s'adapter. C'est la catégorie principale, et cela devrait être comme une super ligue de systèmes.

Ensuite, vous avez une autre catégorie de systèmes qui n'utilisent pas la DA d'Ethereum. Ils utilisent des hypothèses de confiance supplémentaires qui accompagnent une DA externe. Nous les appelons « alt-DA » mais ils incluraient les validiums, les optimiums, et toute construction hybride que vous pourriez créer. Cependant, ils doivent vous donner des garanties de DA raisonnables — cela ne peut pas être votre cave. Cela doit être un comité de disponibilité des données (DAC) de taille raisonnable, ou si vous utilisez Celestia ou Avail, vous devez utiliser le pont.

#### La catégorie « autres » et l'engagement de L2BEAT (16:05) {#the-others-category-and-l2beats-pledge-1605}

Qu'en est-il des autres ? Nous les placerons dans une troisième catégorie, que nous appelons — et j'attends maintenant les retours de la communauté sur la façon de nommer ces systèmes — notre nom de travail est « autres ». Le fait est qu'ils sont sécurisés par des multisigs, et nous exposerons ces multisigs pour ce qu'ils sont. C'est ce que nous voulons faire dans notre interface utilisateur.

L'interface utilisateur ressemblera à peu près à ceci : vous verrez cette répartition — rollups, validiums et optimiums, et autres. Et le tri par défaut se fera par sécurité, et non par valeur totale bloquée (TVL). Ne courons pas après la TVL avec une mauvaise sécurité — cela va très mal se terminer.

Nous ferons la promotion des projets de Stade 1 et de Stade 2. Nous considérerons les projets de Stade 0 comme des prétendants. Pour les « autres », nous sommes heureux de les lister — nous serons extrêmement libéraux. Il vous suffit d'être essentiellement aligné avec Ethereum et d'avoir évidemment un pont qui vous permet de déplacer des fonds. Cependant, nous examinerons les hypothèses de confiance et les multisigs, et nous espérons que lentement mais sûrement, les systèmes passeront de la catégorie « autres » à validium/optimium ou à rollups.

Voici à quoi nous pensons que la catégorie « autres » ressemblerait — ce sont les vraies données en ce moment, les vrais systèmes qui pourraient tomber dans cette catégorie s'ils n'introduisent pas de système de preuve. Vous verrez exactement qui est le proposant, qui est le contestataire, et qui est le responsable des mises à jour. Ce qui est amusant, c'est que vous pouvez voir cela aujourd'hui sur L2BEAT — c'est juste que cette information est tellement cachée au fond de la page des détails que je parie que seuls les chercheurs et les passionnés la consultent. Tout est disponible aujourd'hui. Cependant, nous voulons exposer les données aux utilisateurs finaux. Nous voulons que les utilisateurs finaux soient vraiment conscients de ce qui se passe, afin que nous soyons tous responsables des systèmes que nous construisons.

Suffit-il de dire « J'ai un système de preuve » ? Non. Notre engagement envers la communauté en tant que L2BEAT est que l'année prochaine, nous allons consacrer des ressources importantes pour examiner de très près et en profondeur ces systèmes de preuve afin de nous assurer qu'ils sont solides et complets. Nous analyserons à la fois les systèmes ZK et optimistes. Nous irons dans le code source, nous regarderons comment vous avez créé votre configuration de confiance, nous examinerons vos circuits et verrons ce qui est exactement vérifié onchain. Nous voulons rendre tout super transparent afin que les hypothèses de confiance soient clairement communiquées — et plus important encore, votre système de preuve ne peut pas être caché derrière une liste blanche déraisonnablement petite.

Nous embauchons des chercheurs. Nous ferons tout ce travail. C'est notre engagement pour l'année prochaine. J'espère que l'année prochaine sera l'année des l2 et des rollups — cependant, il ne s'agit pas de lancer un rollup en un clic. Le but est de pouvoir lancer un système avec une bonne sécurité. Idéalement, vous voulez hériter d'autant de sécurité que possible d'Ethereum. Il y a beaucoup de travail à faire pour nous tous afin d'y parvenir. Mais si nous ne le faisons pas, alors tout ce que nous faisons, c'est essentiellement créer des milliers de chaînes latérales non sécurisées. Je pense que nous ne voulons pas de cela en tant que communauté.

#### Questions-Réponses (18:45) {#qa-1845}

**Animateur :** Passons aux questions-réponses. Est-il important que les rollups aient un séquenceur décentralisé, ou d'autres mécanismes de sécurité sont-ils suffisants ?

**Bartek Kiepuszewski :** C'est une très bonne et importante question. Je pense qu'il y a différentes conceptions que nous verrons. Je ne pense pas que la décentralisation du séquenceur soit super importante pour la sécurité des fonds des utilisateurs, mais cela peut être important pour la résistance à la censure en temps réel dans certaines situations. Vitalik a déclaré lors de sa keynote d'ouverture que l'avenir pourrait être de voir des rollups devenir « based » — tirant parti de l'infrastructure d'Ethereum pour lutter contre la censure en temps réel — tandis que d'autres, comme par exemple MegaETH, pourraient en fait avoir un séquenceur très centralisé et ne s'appuyer que sur le mécanisme de retrait d'urgence. Nous pourrions voir des constructions hybrides. Je pense que l'espace de conception est immense, et en ce moment chez L2BEAT, nous voulons vraiment voir ce qui va se passer et comment cela va se dérouler.

**Animateur :** Les systèmes de preuve basés sur un TEE seront-ils considérés comme de Stade 2 même s'ils impliquent de faire confiance au fabricant du matériel ?

**Bartek Kiepuszewski :** La réponse courte est non, car avec les constructions que nous voyons aujourd'hui, si vous utilisez SGX, Intel pourrait soumettre une preuve et ils pourraient potentiellement bloquer, voler ou geler ce qu'ils veulent sans que personne ne s'en aperçoive vraiment — et sans qu'Ethereum ne s'en aperçoive. Cependant, avec tout le travail mis en avant pour créer des TEE sans tiers de confiance et sans permission — on me dit que c'est en fait un travail extrêmement passionnant. Mais réponse courte : aujourd'hui, non.

**Animateur :** Pourquoi Optimism est-il classé au Stade 1 ? D'après l'évaluation, ils ne le sont pas — la Fondation contrôle entièrement le processus de proposition.

**Bartek Kiepuszewski :** Ils répondent essentiellement à tous les critères. Il ne s'agit pas vraiment du processus de proposition — il s'agit de savoir qui contrôle les fonds. Vous pouvez avoir un proposant centralisé, cependant il y a une solution de repli. S'ils tombent en panne, alors l'ensemble du système devient davantage sans permission. Je pense qu'il est important de reconnaître quel est le rôle du conseil de sécurité. Nous voulons que les systèmes de Stade 1 vous permettent de sortir si le proposant centralisé s'arrête. Par exemple, avec dYdX, la proposition était super centralisée, cependant lorsqu'ils se sont arrêtés, les gens ont pu sortir. Il ne s'agit donc pas de savoir si vous êtes centralisé ou décentralisé — il s'agit de savoir si vous pouvez réellement sortir sans permission.

Ils ont rempli tous les critères. Nous étions en train d'affiner, d'ailleurs — les critères ne sont pas gravés dans le marbre car tous ces systèmes évoluent, nous devons donc évoluer avec ces systèmes. Les critères pourraient changer un peu, et nous regardons de très près à la fois Optimism et Arbitrum car ce sont clairement les deux leaders. Il y a beaucoup de nuances dans lesquelles je n'ai pas le temps d'entrer. Mais ce n'est pas comme si vous aviez une désignation de stade pour toujours — s'il y a de nouvelles informations ou quelque chose que nous aurions pu ignorer ou manquer, il est tout à fait possible que vous perdiez cette désignation.

**Animateur :** Quelles sont les principales raisons pour lesquelles les projets ne construisent pas vers le Stade 1 ?

**Bartek Kiepuszewski :** La complexité, le temps, le coût, le talent. C'est étonnamment coûteux. Comme je l'ai dit, les pionniers d'il y a quatre ans construisaient essentiellement — dYdX était littéralement l'un des premiers, sinon le premier, rollup ZK. Il était spécifique à une application, mais c'était quand même le premier. Et sans de petites nuances, il serait au Stade 2 — en réalité, c'est le processus de gouvernance que nous exigeons pour le Stade 2 qui fait défaut. Mais à toutes fins utiles, c'est un système de Stade 2. Il a été construit il y a quatre ans, donc ce n'est pas comme si c'était impossible.

Je pense que ce qui rend la tâche super difficile aujourd'hui pour tous les rollups, franchement, c'est que la majorité des rollups ne sont pas construits par les équipes — ils sont lancés par des fournisseurs de rollups en tant que service (rollup-as-a-service), et nous devons les inciter à faire mieux. Et c'est difficile. Personne n'a dit que ce serait facile.