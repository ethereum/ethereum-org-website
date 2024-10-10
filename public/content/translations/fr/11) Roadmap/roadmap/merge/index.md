---
title: La Fusion
description: En savoir plus sur La Fusion - quand le réseau principal Ethereum adopte la preuve d'enjeu.
lang: fr
template: upgrade
image: /images/upgrades/merge.png
alt:
summaryPoint1: Le réseau principal Ethereum utilise la preuve d'enjeu, mais cela n'a pas toujours été le cas.
summaryPoint2: La mise à niveau du mécanisme original de preuve de travail à celui de la preuve d'enjeu a été appelé La Fusion.
summaryPoint3: La Fusion fait référence à la fusion du réseau principal original Ethereum avec une blockchain distincte de preuve d'enjeu appelée la Chaîne phare, qui existe maintenant sous la forme d'une chaîne unique.
summaryPoint4: La Fusion a réduit la consommation d'énergie d'Ethereum de ~99,95 %.
---

<UpgradeStatus isShipped dateKey="page-upgrades:page-upgrades-beacon-date">
  La Fusion a été réalisée le 15 septembre 2022. Cette étape a permis à Ethereum de passer à un consensus de preuve d'enjeu, de rendre officiellement obsolète la preuve de travail et de réduire sa consommation d'énergie d'environ 99,95 %.
</UpgradeStatus>

## Qu'est-ce que La Fusion ? {#what-is-the-merge}

La Fusion est la réunion de la couche d'exécution originale d'Ethereum (le réseau principal qui existe depuis [genesis](/history/#frontier)) avec sa nouvelle couche de consensus de preuve d'enjeu ; la Chaîne phare. Elle a également permis d'éliminer la nécessité d'un minage gourmand en énergie et de sécuriser le réseau via la mise en jeu d'ETH. Ce fut une étape vraiment passionnante dans la réalisation de la vision Ethereum - plus d'évolutivité, de sécurité et de durabilité.

<MergeInfographic />

Initialement, la [Chaîne phare](/roadmap/beacon-chain/) était envoyée séparément du [réseau principal](/glossary/#mainnet). Le réseau principal Ethereum - avec tous ses comptes, ses soldes, ses contrats intelligents et l'état de la blockchain - continuait d'être sécurisé par [la preuve de travail](/developers/docs/consensus-mechanisms/pow/), même si la Chaîne Phare fonctionnait en parallèle en utilisant [la preuve d'enjeu](/developers/docs/consensus-mechanisms/pos/). La Fusion a été le moment où ces deux systèmes se sont finalement combinés, et la preuve de travail a été remplacée de façon permanente par la preuve d'enjeu.

Imaginez qu'Ethereum est un vaisseau spatial qui a été lancé avant qu'il ne soit prêt pour un voyage interstellaire. Avec la Chaîne phare, la communauté a construit un nouveau moteur et un fuselage renforcé. Après de nombreux tests, il a été temps de remplacer à chaud le nouveau moteur par l'ancien en plein vol. Cela a permis de fusionner le nouveau moteur, plus efficace, avec le vaisseau existant, prêt à franchir plusieurs années-lumière et à conquérir l'univers.

## La fusion avec le réseau principal {#merging-with-mainnet}

La preuve de travail a sécurisé le réseau principal Ethereum de la genèse jusqu'à La Fusion. Cela a permis à la blockchain Ethereum que nous utilisons tous de voir le jour en juillet 2015 avec toutes ses fonctionnalités familières — transactions, contrats intelligents, comptes, etc.

Tout au long de l'histoire d'Ethereum, les développeurs se sont préparés à une éventuelle transition de la preuve de travail à la preuve d'enjeu. Le 1er décembre 2020, la Chaîne phare a été créée comme une blockchain distincte du réseau principal et fonctionnant en parallèle.

La Chaîne phare ne traitait pas à l'origine les transactions du réseau principal. Au lieu de cela, elle atteignait le consensus sur son propre état en reconnaissant les validateurs actifs et leurs soldes de compte. Après des tests approfondis, il était temps pour la Chaîne phare de parvenir à un consensus sur les données du monde réel. Après La Fusion, la Chaîne phare est devenue le moteur de consensus pour toutes les données du réseau, y compris les transactions de la couche d'exécution et les soldes des comptes.

La Fusion représente le passage officiel à l'utilisation de la Chaîne phare comme moteur de production de blocs. Le minage n'est plus le moyen de produire des blocs valides. À la place, les validateurs de la preuve d'enjeu assurent ce rôle et sont chargés de traiter la validité de toutes les transactions et de proposer des blocs.

Aucun historique n'a été perdu dans la Fusion. Au fur et à mesure que le réseau principal a fusionné avec la Chaîne phare, il a également fusionné la totalité de l'historique transactionnel d'Ethereum.

<InfoBanner>
Cette transition vers la preuve d'enjeu a modifié la façon dont l'éther est émis. En savoir plus sur l'émission d'<a href="/roadmap/merge/issuance/">éthers avant et après la Fusion</a>.
</InfoBanner>

### Utilisateurs et détenteurs {#users-holders}

**La Fusion n'a rien changé pour les détenteurs/utilisateurs.**

_Ceci nécessite d'être répété _: en tant qu'utilisateur ou détenteur d'ETH ou de tout autre actif numérique sur Ethereum, ainsi que pour les stakers qui n'opèrent pas sur les nœuds, **vous n'avez pas besoin de faire quoi que ce soit avec vos fonds ou votre portefeuille pour vous rendre compte de La Fusion.**. L'ETH n'est que l'ETH. Il n'existe rien de tel que « les anciens ETH »/« les nouveaux ETH » ou « ETH1 »/« ETH2 » et les portefeuilles fonctionnent exactement de la même manière après La Fusion qu'auparavant — les personnes vous disant l'inverse sont probablement des escrocs.

Malgré le passage de la preuve de travail vers la preuve d'enjeu, tout l'historique d'Ethereum depuis sa genèse reste intact et inaltéré depuis ladite transition. Tous les fonds détenus dans votre portefeuille avant La Fusion restent accessibles après La Fusion. **Aucune action n'est requise pour mettre à jour de votre côté.**

[En savoir plus sur la sécurité et Ethereum](/security/#eth2-token-scam)

### Opérateurs de nœuds et développeurs de dApps {#node-operators-dapp-developers}

<ExpandableCard
title="Opérateurs et fournisseurs de nœuds de mise en jeu"
contentPreview="If you are a staker running your own node setup or a node infrastructure provider, there are a few things you need to be aware of after The Merge."
id="staking-node-operators">

Les principaux éléments d'action incluent :

1. Exécutez _à la fois_ un client de consensus et un client d'exécution  ; les points de terminaison tiers pour obtenir des données d'exécution ne fonctionnent plus depuis La Fusion.
2. Authentifier à la fois les clients d'exécution et de consensus avec un secret JWT partagé pour qu'ils puissent communiquer en toute sécurité.
3. Définissez une adresse 'destinataire des frais' pour recevoir vos frais de transaction ou MEV gagnés.

Si vous ne remplissez pas les deux premiers éléments ci-dessus, votre nœud sera considéré comme « hors ligne » jusqu'à ce que les deux couches soient synchronisées et authentifiées.

Ne pas définir un « destinataire de frais » permettra toujours à votre validateur de se comporter comme d'habitude, mais vous n'allez pas recevoir les frais non brûlés et autres MEV que vous auriez autrement gagnés avec les blocs que votre validateur propose.
</ExpandableCard>

<ExpandableCard
title="Opérateurs de nœuds non validés et fournisseurs d'infrastructure"
contentPreview="If you're operating a non-validating Ethereum node, the most significant change that came with The Merge was the requirement to run clients for BOTH the execution layer AND the consensus layer."
id="node-operators">

Jusqu'au moment de La Fusion, un client d'exécution (comme Geth, Erigon, Besu ou Nethermind) suffisait pour recevoir, valider correctement et diffuser les blocs créés par le réseau. Après La Fusion, la validité des transactions contenues dans un bloc d'exécution dépend désormais également de la validité du « bloc de consensus » qu'il contient.

Par conséquent, un nœud Ethereum complet nécessite maintenant à la fois un client d'exécution et un client de consensus. Ces deux clients travaillent ensemble en utilisant une nouvelle API Moteur. L'API Moteur nécessite une authentification à l'aide d'un secret JWT, qui est fourni aux deux clients permettant ainsi une communication sécurisée.

Les éléments clés d'action incluent le fait :

- D'installer un client de consensus en plus d'un client d'exécution
- D'authentifier les clients d'exécution et de consensus avec un secret JWT partagé pour qu'ils puissent communiquer en toute sécurité entre eux.

Si vous ne répondez pas aux exigences ci-dessus, votre nœud apparaîtra comme « hors ligne » jusqu'à ce que les deux couches soient synchronisées et authentifiées.

</ExpandableCard>

<ExpandableCard
title="Développeurs de dApps et de contrats intelligents"
contentPreview="The Merge was designed to have minimal impact on smart contract and dapp developers."
id="developers">

La Fusion s'est accompagnée de changements apportés au consensus, qui incluent également des changements liés à :<

<ul>
  <li>la structure d'un bloc</li>
  <li>synchronisation des créneaux/blocs</li>
  <li>changements de codes opératoires</li>
  <li>sources d'erreurs aléatoires en chaîne</li>
  <li>concept de <em>safe head</em> et de <em>blocs finalisés</em></li>
</ul>

Pour plus d'informations, consultez ce billet de blog de Tim Beiko sur <a href="https://blog.ethereum.org/2021/11/29/how-the-merge-impacts-app-layer/">Comment La Fusion a un impact sur la couche d'application d'Ethereum</a>.

</ExpandableCard>

## La Fusion et la consommation énergétique {#merge-and-energy}

La Fusion marque la fin de la preuve de travail pour Ethereum, et le début d'un Ethereum plus durable et plus écologique. La consommation énergétique d'Ethereum a chuté d'environ 99,95 %, faisant de l'Ethereum une blockchain verte. Apprenez-en plus à propos de [la consommation énergétique d'Ethereum](/energy-consumption/).

## La Fusion et la fragmentation {#merge-and-scaling}

La Fusion permet également de préparer le terrain pour d'autres améliorations des mises à niveau non envisageables avec la preuve de travail, en rapprochant Ethereum d'une étape de la réalisation d'évolutivité, de sécurité et de durabilité décrite dans la [vision d'Ethereum](/roadmap/vision/).

## Les idées fausses sur La Fusion {#misconceptions}

<ExpandableCard
title="Idée reçue : &quot;L'exécution d'un nœud nécessite la mise en jeu de 32 ETH.&quot;"
contentPreview="False. Anyone is free to sync their own self-verified copy of Ethereum (i.e. run a node). No ETH is required—not before The Merge, not after The Merge, not ever.">

Il existe deux types de nœuds sur Ethereum : ceux qui peuvent proposer de nouveaux blocs, et ceux qui ne le peuvent pas.

Les nœuds qui peuvent proposer des blocs représentent une petite fraction du nombre total de nœuds existants. Cette catégorie inclut les nœuds de minage sous preuve de travail (PoW) et les nœuds des validateurs sous preuve d'enjeu (PoS). Cette catégorie nécessite d'engager des ressources économiques (que ce soient le pouvoir d'hachage des GPU pour la preuve de travail ou des ETH mis en jeu par les validateurs en preuve d'enjeu) afin de pouvoir, occasionnellement, proposer un nouveau bloc et gagner les récompenses offertes par le protocole.

Les autres nœuds sur le réseau (la majorité en fait) ne nécessitent pas d'engager des ressources économiques, exception faite d'un ordinateur grand public bénéficiant d'un ou deux TO de stockage disponible et d'une connexion internet. Ces nœuds ne proposent pas de blocs mais ils jouent quand même un rôle critique dans la sécurité du réseau, en tenant tous les promoteurs responsables de l'énumération des blocs déjà existants et de la vérification de la validité des nouveaux blocs, conformément aux règles de consensus du réseau. Si le bloc est valide, le noeud permettra sa diffusion sur le réseau. Si le bloc n'est pas valable pour une raison quelconque, le logiciel ne le considérera pas valable et empêchera sa propagation.

L’exécution d’un nœud non producteur de blocs est possible pour toute personne sous l’un ou l’autre mécanisme de consensus (preuve de travail ou preuve d'enjeu) ; c'est <em>fortement encouragé</em> pour tous les utilisateurs s'ils en ont les moyens. L'exécution d'un noeud est extrêmement précieuse pour Ethereum et permet à chaque personne qui opère son propre noeud de bénéficier d'avantages supplémentaires en matière de sécurité, de vie privée, et de résistance à la censure améliorées.

La possibilité pour quiconque de pouvoir exécuter son propre noeud est <em>absolument essentielle</em> afin de maintenir la décentralisation du réseau Ethereum.

<a href="/run-a-node/">En savoir plus sur l'exécution de son propre nœud</a>

</ExpandableCard>

<ExpandableCard
title="Idée reçue : &quot;La Fusion n'a pas réussi à réduire les frais de gaz.&quot;"
contentPreview="False. The Merge was a change of consensus mechanism, not an expansion of network capacity, and was never intended to lower gas fees.">

Les frais de gaz sont le produit des demandes envoyées au réseau par rapport à sa capacité. La Fusion a rendu obsolète l'utilisation de la preuve de travail pour une transition vers le consensus par la preuve d'enjeu, mais elle n'a pas modifié de manière significative les paramètres qui influencent directement la capacité ou le débit du réseau.

Avec une <a href="https://ethereum-magicians.org/t/a-rollup-centric-ethereum-roadmap/4698">feuille de route axée sur les rollups</a>, les efforts sont concentrés sur la mise à l'échelle de l'activité des utilisateurs sur la <a href="/layer-2/">couche 2</a>, tout en activant le réseau principal de couche 1 en tant que couche de règlement décentralisée, sécurisée et optimisée pour le stockage de données cumulatives afin de rendre les transactions rollups exponentiellement moins chères. La transition vers la preuve d'enjeu est une étape préalable essentielle afin de réaliser cela. <a href="/developers/docs/gas/">Plus d'infos sur le gaz et les frais</a>

</ExpandableCard>

<ExpandableCard
title="Idée reçue : &quot;Les transactions ont été considérablement accélérées par La Fusion.&quot;"
contentPreview="False. Though some slight changes exist, transaction speed is mostly the same on layer 1 now as it was before The Merge.">
La « vitesse » d'une transaction peut être mesurée de différentes façons, y compris le délai à inclure dans un bloc et le temps pour la finalisation. Ces deux facteurs sont légèrement modifiés, mais pas dans des proportions suffisantes pour que les utilisateurs le remarquent.

Historiquement, concernant la preuve de travail, l'objectif était de permettre la création d'un nouveau bloc toutes les 13,3 secondes. Avec la preuve d'enjeu, cette production sera effective toutes les 12 secondes, ce qui constituera à chaque fois une opportunité pour un validateur de publier un nouveau bloc. La plupart des slots ont des blocs, mais pas nécessairement tous (lorsqu'un validateur est hors ligne). Avec la preuve d'enjeu, les blocs sont produits ~10 % plus fréquemment qu'avec la preuve de travail. Il s'agit d'un changement trop insignifiant pour qu'il soit réellement perçu par les utilisateurs.

La preuve d’enjeu a introduit le concept de finalité des transactions qui n’existait pas auparavant. Avec la de preuve de travail, la possibilité d'inverser un bloc devient exponentiellement plus difficile avec chaque nouveau bloc créé, mais elle n'atteindra jamais zéro. Avec la preuve d'enjeu, les blocs sont regroupés dans des périodes (6,4 minutes de temps contenant 32 chances pour les blocs) sur lesquelles les validateurs votent. Lorsqu'une période se termine, les validateurs se prononcent sur la question de savoir s'il faut considérer la période comme « justifiée ». Si les validateurs acceptent de justifier la période, elle sera finalisée lors de la prochaine période. L'annulation des transactions finalisées n'est pas viable économiquement, car cela nécessiterait l'obtention et la combustion de plus d'un tiers du total de l'ETH misé.

</ExpandableCard>

<ExpandableCard
title="Idée reçue : &quot;La Fusion a permis la mise en jeu des retraits.&quot;"
contentPreview="False, but staking withdrawals have since been enabled via the Shanghai/Capella upgrade.">

Initialement après La Fusion, les stakers ne pouvaient accéder qu'à des frais de priorité et MEV qui ont été gagnés à la suite de propositions de blocs. Ces récompenses sont créditées sur un compte non-staking contrôlé par le validateur (connu sous le nom de <em>bénéficiaire de frais</em>) et sont disponibles immédiatement. Ces récompenses sont séparées des récompenses de protocole pour l'exercice de fonctions de validateur.

Depuis la mise à niveau du réseau Shanghai/Capella, les validateurs peuvent maintenant désigner <em>une adresse de retrait</em> pour commencer à recevoir des paiements automatiques de tout solde excédentaire de mise en jeu (plus de 32 ETH à partir de récompenses de protocole). Cette mise à jour a également permis à un validateur de déverrouiller et de récupérer tout son solde en quittant le réseau.

<a href="/staking/withdrawals/">En savoir plus sur les retraits de mise en jeu</a>

</ExpandableCard>

<ExpandableCard
title="Mauvaise conception : &quot;Maintenant que La Fusion est terminée, et que les retraits sont activés, les stakers pourraient tous sortir en même temps.&quot;"
contentPreview="False. Validator exits are rate limited for security reasons.">
Depuis que les retraits ont été activés à la suite de la mise à jour Shanghai/Capella, tous les validateurs seront incités à retirer leur solde d'ETH si celui-ci est supérieur à 32 car ces fonds n'augmentent pas le rendement et sont par ailleurs bloqués. En fonction de l'APR (déterminé par l'ETH total mis en jeu), ils peuvent être encouragés à quitter leur(s) validateur(s) pour récupérer leur solde en entier ou potentiellement en miser encore plus en utilisant leurs récompenses pour obtenir plus de rendement.

Une mise en garde importante ici : les sorties complètes des validateurs sont limitées par le protocole, et seul un nombre limité de validateurs peuvent sortir par période (toutes les 6,4 minutes). Cette limite fluctue en fonction du nombre de validateurs actifs, mais passe à environ 0,33 % du total des ETH stakés qui peuvent être sortis du réseau en une seule journée.

Cela empêche un exode massif de fonds misés. En outre, cela empêche un attaquant potentiel ayant accès à une grande partie du total d'ETH mis en jeu de commettre une infraction « slashable » et de quitter/retirer tous les soldes de validateur incriminés au cours de la même époque avant que le protocole puisse appliquer la pénalité de réduction.

L'APR a été rendue dynamique intentionnellement, afin de permettre aux stakers de trouver un équilibre concernant le montant de la rémunération qu'ils souhaitent percevoir pour aider à sécuriser le réseau. Si le taux est trop bas, alors les validateurs pourront se retirer en suivant un taux limité par le protocole. Peu à peu, cela permettra d'élever l'APR pour tous ceux qui restent, attirant encore une fois de nouveaux stakers ou en permettant le retour d'anciens validateurs.
</ExpandableCard>

## Que devient « Eth2 » ? {#eth2}

Le terme « Eth2 » est obsolète. Après avoir fusionné « Eth1 » et « Eth2 » dans une seule chaîne, il n'est plus nécessaire de faire la distinction entre deux réseaux Ethereum ; il n'existe plus qu'Ethereum.

Pour limiter la confusion, la communauté a mis à jour ces termes :

- « Eth1 » est maintenant « la couche d'exécution », qui gère les transactions et les exécutions.
- « Eth2 » est maintenant la « couche de consensus », qui gère le consensus de la preuve d'enjeu.

Ces mises à jour d'ordre terminologique ne concernent que les conventions de nommage ; les objectifs et la feuille de route d'Ethereum restent inchangés.

[En savoir plus sur le changement de nom « Eth2 »](https://blog.ethereum.org/2022/01/24/the-great-eth2-renaming/)

## Relation entre les mises à niveau {#relationship-between-upgrades}

Les mises à niveau Ethereum sont plus ou moins interdépendantes. Alors résumons comment la fusion est liée aux autres mises à niveau.

### La Fusion et la chaîne phare {#merge-and-beacon-chain}

La Fusion représente l'adoption formelle de la Chaîne phare comme nouvelle couche de consensus pour la couche d'exécution sur le réseau principal d'origine. Depuis La Fusion, les validateurs sont affectés au réseau principal sécurisé d'Ethereum et le minage par [preuve de travail](/developers/docs/consensus-mechanisms/pow/) n'est plus un moyen valide de production de blocs.

Les blocs sont dès lors proposés par validation des nœuds qui ont misé l'ETH en échange du droit de participer au consensus. Ces mises à niveau permettent de préparer le terrain pour de futures améliorations d'évolutivité, y compris la fragmentation.

<ButtonLink href="/roadmap/beacon-chain/">
  La Chaîne phare
</ButtonLink>

### La Fusion et la mise à niveau de Shanghai {#merge-and-shanghai}

Afin de simplifier et de permettre une transition aussi rapide et réussie que possible vers le système de preuve d'enjeu, la mise à jour vers La Fusion n'intègre pas certaines fonctionnalités anticipées telles que, par exemple, la possibilité de retirer les ETH bloqués sur la chaîne phare. Cette fonctionnalité a été activée séparément avec la mise à niveau Shanghai/Capella.

Pour ceux qui sont curieux, apprenez-en plus sur [Ce qui se passe après la fusion](https://youtu.be/7ggwLccuN5s?t=101), une présentation par Vitalik lors de l'événement ETHGlobal d'avril 2021.

### La Fusion et la fragmentation {#merge-and-data-sharding}

Initialement, l'objectif était de travailler sur la fragmentation avant la Fusion afin d'optimiser l'évolutivité d'Ethereum. Cela dit, avec l'expansion des [solutions d'évolutivité de la couche 2](/layer-2/), la priorité a été de passer de la preuve de travail à la preuve d'enjeu.

Les plans liés à la fragmentation évoluent rapidement, mais compte tenu du développement et du succès rencontré par les technologies de couche 2 visant à augmenter l'évolutivité de l'exécution des transactions, ces plans de fragmentation ont été modifiés afin de trouver la meilleure manière de répartir le poids lié au stockage des données d'appel comprimées émanant des contrats roll-up et de permettre la croissance exponentielle du réseau. Cela ne serait pas possible sans opérer d'abord une transition vers le système de preuve d'enjeu.

<ButtonLink href="/roadmap/danksharding/">
  Fragmentation
</ButtonLink>

## Complément d'information {#further-reading}

<MergeArticleList />

<QuizWidget quizKey="merge" />
