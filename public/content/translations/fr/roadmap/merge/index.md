---
title: La Fusion
description: Découvrez La Fusion - le moment où le réseau principal Ethereum a adopté la preuve d'enjeu.
lang: fr
template: upgrade
image: /images/upgrades/merge.png
alt: 
summaryPoints:
  - "Le réseau principal Ethereum utilise la preuve d'enjeu, mais cela n'a pas toujours été le cas."
  - "La mise à niveau du mécanisme original de preuve de travail vers la preuve d'enjeu a été appelée La Fusion."
  - "La Fusion fait référence à la fusion du réseau principal Ethereum d'origine avec une chaîne de blocs distincte à preuve d'enjeu appelée la chaîne balise, existant désormais sous la forme d'une seule chaîne."
  - "La Fusion a réduit la consommation d'énergie d'Ethereum d'environ 99,95 %."
---

<UpgradeStatus isShipped dateKey="page-upgrades:page-upgrades-beacon-date">
  La Fusion a été exécutée le 15 septembre 2022. Cela a achevé la transition d'Ethereum vers le consensus de preuve d'enjeu, abandonnant officiellement la preuve de travail et réduisant la consommation d'énergie d'environ 99,95 %.
</UpgradeStatus>

## Qu'était La Fusion ? {#what-is-the-merge}

La Fusion a été la jonction de la couche d'exécution originale d'Ethereum (le réseau principal qui existe depuis la [genèse](/ethereum-forks/#frontier)) avec sa nouvelle couche de consensus à preuve d'enjeu, la chaîne balise. Elle a éliminé le besoin d'un minage gourmand en énergie et a permis à la place de sécuriser le réseau en utilisant des ETH stakés. Ce fut une étape véritablement passionnante dans la réalisation de la vision d'[Ethereum](/) : plus de scalabilité, de sécurité et de durabilité.

<MergeInfographic />

Initialement, la [chaîne balise](/roadmap/beacon-chain/) a été déployée séparément du [réseau principal](/glossary/#mainnet). Le réseau principal Ethereum - avec tous ses comptes, soldes, contrats intelligents et l'état de la chaîne de blocs - a continué d'être sécurisé par la [preuve de travail](/developers/docs/consensus-mechanisms/pow/), même pendant que la chaîne balise fonctionnait en parallèle en utilisant la [preuve d'enjeu](/developers/docs/consensus-mechanisms/pos/). La Fusion a eu lieu lorsque ces deux systèmes se sont finalement rejoints, et que la preuve de travail a été définitivement remplacée par la preuve d'enjeu.

Imaginez qu'Ethereum soit un vaisseau spatial lancé avant d'être tout à fait prêt pour un voyage interstellaire. Avec la chaîne balise, la communauté a construit un nouveau moteur et une coque renforcée. Après des tests approfondis, il est devenu temps de remplacer à chaud l'ancien moteur par le nouveau en plein vol. Cela a fusionné le nouveau moteur, plus efficace, dans le vaisseau existant, lui permettant de parcourir de sérieuses années-lumière et de s'attaquer à l'univers.

## Fusion avec le réseau principal {#merging-with-mainnet}

La preuve de travail a sécurisé le réseau principal Ethereum depuis la genèse jusqu'à La Fusion. Cela a permis à la chaîne de blocs Ethereum à laquelle nous sommes tous habitués de voir le jour en juillet 2015 avec toutes ses fonctionnalités familières : transactions, contrats intelligents, comptes, etc.

Tout au long de l'histoire d'Ethereum, les développeurs se sont préparés à une éventuelle transition de la preuve de travail vers la preuve d'enjeu. Le 1er décembre 2020, la chaîne balise a été créée en tant que chaîne de blocs distincte du réseau principal, fonctionnant en parallèle.

À l'origine, la chaîne balise ne traitait pas les transactions du réseau principal. Au lieu de cela, elle parvenait à un consensus sur son propre état en se mettant d'accord sur les validateurs actifs et les soldes de leurs comptes. Après des tests approfondis, il est devenu temps pour la chaîne balise de parvenir à un consensus sur des données du monde réel. Après La Fusion, la chaîne balise est devenue le moteur de consensus pour toutes les données du réseau, y compris les transactions de la couche d'exécution et les soldes des comptes.

La Fusion a représenté le passage officiel à l'utilisation de la chaîne balise comme moteur de production de blocs. Le minage n'est plus le moyen de produire des blocs valides. Au lieu de cela, les validateurs de la preuve d'enjeu ont adopté ce rôle et sont désormais responsables du traitement de la validité de toutes les transactions et de la proposition de blocs.

Aucun historique n'a été perdu lors de La Fusion. Lorsque le réseau principal a fusionné avec la chaîne balise, il a également fusionné l'intégralité de l'historique transactionnel d'Ethereum.

<Alert variant="update">
<AlertContent>
<AlertDescription>
Cette transition vers la preuve d'enjeu a modifié la façon dont l'ether est émis. Apprenez-en davantage sur [l'émission d'ether avant et après La Fusion](/roadmap/merge/issuance/).
</AlertDescription>
</AlertContent>
</Alert>

### Utilisateurs et détenteurs {#users-holders}

**La Fusion n'a rien changé pour les détenteurs/utilisateurs.**

_Il convient de le répéter_ : en tant qu'utilisateur ou détenteur d'ETH ou de tout autre actif numérique sur Ethereum, ainsi que pour les stakers n'opérant pas de nœud, **vous n'avez rien à faire avec vos fonds ou votre portefeuille pour tenir compte de La Fusion.** L'ETH reste de l'ETH. Il n'y a pas d'« ancien ETH »/« nouvel ETH » ou d'« Eth1 »/« Eth2 » et les portefeuilles fonctionnent exactement de la même manière après La Fusion qu'avant. Les personnes qui vous disent le contraire sont probablement des escrocs.

Malgré l'abandon de la preuve de travail, l'intégralité de l'historique d'Ethereum depuis la genèse est restée intacte et inaltérée par la transition vers la preuve d'enjeu. Tous les fonds détenus dans votre portefeuille avant La Fusion sont toujours accessibles après La Fusion. **Aucune action n'est requise de votre part pour la mise à niveau.**

[En savoir plus sur la sécurité d'Ethereum](/security/#eth2-token-scam)

### Opérateurs de nœuds et développeurs de dapps {#node-operators-dapp-developers}

<ExpandableCard
title="Staking node operators and providers"
contentPreview="If you are a staker running your own node setup or a node infrastructure provider, there are a few things you need to be aware of after The Merge."
id="staking-node-operators">

Les principales actions à entreprendre comprennent :

1. Exécuter _à la fois_ un client de consensus et un client d'exécution ; les points de terminaison tiers pour obtenir des données d'exécution ne fonctionnent plus depuis La Fusion.
2. Authentifier les clients d'exécution et de consensus avec un secret JWT partagé afin qu'ils puissent communiquer en toute sécurité.
3. Définir une adresse `fee recipient` pour recevoir vos pourboires de frais de transaction/MEV gagnés.

Si vous ne complétez pas les deux premiers éléments ci-dessus, votre nœud sera considéré comme « hors ligne » jusqu'à ce que les deux couches soient synchronisées et authentifiées.

Ne pas définir de `fee recipient` permettra toujours à votre validateur de se comporter comme d'habitude, mais vous passerez à côté des pourboires de frais non brûlés et de toute MEV que vous auriez autrement gagnée dans les blocs que votre validateur propose.
</ExpandableCard>

<ExpandableCard
title="Non-validating node operators and infrastructure providers"
contentPreview="If you're operating a non-validating Ethereum node, the most significant change that came with The Merge was the requirement to run clients for BOTH the execution layer AND the consensus layer."
id="node-operators">

Jusqu'à La Fusion, un client d'exécution (tel que Geth, Erigon, Besu ou Nethermind) suffisait pour recevoir, valider correctement et propager les blocs diffusés par le réseau. _Après La Fusion_, la validité des transactions contenues dans une charge utile d'exécution dépend désormais également de la validité du « bloc de consensus » dans lequel elle est contenue.

Par conséquent, un nœud Ethereum complet nécessite désormais à la fois un client d'exécution et un client de consensus. Ces deux clients fonctionnent ensemble à l'aide d'une nouvelle API Engine. L'API Engine nécessite une authentification à l'aide d'un secret JWT, qui est fourni aux deux clients pour permettre une communication sécurisée.

Les principales actions à entreprendre comprennent :

- Installer un client de consensus en plus d'un client d'exécution
- Authentifier les clients d'exécution et de consensus avec un secret JWT partagé afin qu'ils puissent communiquer en toute sécurité entre eux.

Si vous ne complétez pas les éléments ci-dessus, votre nœud apparaîtra comme « hors ligne » jusqu'à ce que les deux couches soient synchronisées et authentifiées.

</ExpandableCard>

<ExpandableCard
title="Dapp and smart contract developers"
contentPreview="The Merge was designed to have minimal impact on smart contract and dapp developers."
id="developers">

La Fusion s'est accompagnée de modifications du consensus, ce qui inclut également des modifications liées à :

<ul>
  <li>la structure des blocs</li>
  <li>la synchronisation des créneaux/blocs</li>
  <li>les changements de codes d'opération</li>
  <li>les sources de caractère aléatoire onchain</li>
  <li>le concept de <em>tête sûre</em> et de <em>blocs finalisés</em></li>
</ul>

Pour plus d'informations, consultez cet article de blog de Tim Beiko sur <a href="https://blog.ethereum.org/2021/11/29/how-the-merge-impacts-app-layer">l'impact de La Fusion sur la couche d'application d'Ethereum</a>.

</ExpandableCard>

## La Fusion et la consommation d'énergie {#merge-and-energy}

La Fusion a marqué la fin de la preuve de travail pour Ethereum et a lancé l'ère d'un Ethereum plus durable et respectueux de l'environnement. La consommation d'énergie d'Ethereum a chuté d'environ 99,95 %, faisant d'Ethereum une chaîne de blocs verte. Apprenez-en davantage sur [la consommation d'énergie d'Ethereum](/energy-consumption/).

## La Fusion et la mise à l'échelle {#merge-and-scaling}

La Fusion a également préparé le terrain pour d'autres mises à niveau de scalabilité impossibles sous la preuve de travail, rapprochant Ethereum un peu plus de la réalisation de la pleine échelle, de la sécurité et de la durabilité vers lesquelles [sa feuille de route](/roadmap/) tend.

## Idées fausses sur La Fusion {#misconceptions}

<ExpandableCard
title="Misconception: &quot;Running a node requires staking 32 ETH.&quot;"
contentPreview="False. Anyone is free to sync their own self-verified copy of Ethereum (i.e., run a node). No ETH is required—not before The Merge, not after The Merge, not ever.">

Il existe deux types de nœuds Ethereum : les nœuds qui peuvent proposer des blocs et les nœuds qui ne le peuvent pas.

Les nœuds qui proposent des blocs ne représentent qu'un petit nombre du total des nœuds sur Ethereum. Cette catégorie comprend les nœuds de minage sous la preuve de travail (PoW) et les nœuds validateurs sous la preuve d'enjeu (PoS). Cette catégorie nécessite d'engager des ressources économiques (telles que la puissance de hachage des GPU dans la preuve de travail ou des ETH stakés dans la preuve d'enjeu) en échange de la possibilité de proposer occasionnellement le bloc suivant et de gagner des récompenses du protocole.

Les autres nœuds du réseau (c'est-à-dire la majorité) ne sont pas tenus d'engager des ressources économiques au-delà d'un ordinateur grand public avec 1 à 2 To de stockage disponible et une connexion Internet. Ces nœuds ne proposent pas de blocs, mais ils jouent tout de même un rôle essentiel dans la sécurisation du réseau en tenant tous les proposeurs de blocs responsables, en écoutant les nouveaux blocs et en vérifiant leur validité à l'arrivée selon les règles de consensus du réseau. Si le bloc est valide, le nœud continue de le propager sur le réseau. Si le bloc est invalide pour quelque raison que ce soit, le logiciel du nœud l'ignorera comme invalide et arrêtera sa propagation.

L'exécution d'un nœud ne produisant pas de blocs est possible pour quiconque sous l'un ou l'autre des mécanismes de consensus (preuve de travail ou preuve d'enjeu) ; cela est <em>fortement encouragé</em> pour tous les utilisateurs s'ils en ont les moyens. L'exécution d'un nœud est extrêmement précieuse pour Ethereum et offre des avantages supplémentaires à toute personne qui en exécute un, tels qu'une sécurité, une confidentialité et une résistance à la censure améliorées.

La possibilité pour quiconque d'exécuter son propre nœud est <em>absolument essentielle</em> pour maintenir la décentralisation du réseau Ethereum.

[En savoir plus sur l'exécution de votre propre nœud](/run-a-node/)

</ExpandableCard>

<ExpandableCard
title="Misconception: &quot;The Merge failed to reduced gas fees.&quot;"
contentPreview="False. The Merge was a change of consensus mechanism, not an expansion of network capacity, and was never intended to lower gas fees.">

Les frais de gaz sont le produit de la demande du réseau par rapport à la capacité du réseau. La Fusion a abandonné l'utilisation de la preuve de travail, passant à la preuve d'enjeu pour le consensus, mais n'a pas modifié de manière significative les paramètres qui influencent directement la capacité ou le débit du réseau.

Avec une <a href="https://ethereum-magicians.org/t/a-rollup-centric-ethereum-roadmap/4698">feuille de route centrée sur les rollups</a>, les efforts se concentrent sur la mise à l'échelle de l'activité des utilisateurs sur la [couche 2 (l2)](/layer-2/), tout en permettant au réseau principal de couche 1 (l1) de servir de couche de règlement décentralisée et sécurisée, optimisée pour le stockage des données des rollups afin de rendre les transactions des rollups exponentiellement moins chères. La transition vers la preuve d'enjeu est un précurseur essentiel pour y parvenir. [En savoir plus sur le gaz et les frais.](/developers/docs/gas/)

</ExpandableCard>

<ExpandableCard
title="Misconception: &quot;Transactions were accelerated substantially by The Merge.&quot;"
contentPreview="False. Though some slight changes exist, transaction speed is mostly the same on layer 1 now as it was before The Merge.">
La « vitesse » d'une transaction peut être mesurée de plusieurs manières, notamment le temps nécessaire pour être incluse dans un bloc et le temps de finalisation. Ces deux éléments changent légèrement, mais pas d'une manière que les utilisateurs remarqueront.

Historiquement, sur la preuve de travail, l'objectif était d'avoir un nouveau bloc toutes les ~13,3 secondes. Sous la preuve d'enjeu, les créneaux se produisent précisément toutes les 12 secondes, chacun d'eux étant une opportunité pour un validateur de publier un bloc. La plupart des créneaux ont des blocs, mais pas nécessairement tous (par exemple, si un validateur est hors ligne). Dans la preuve d'enjeu, les blocs sont produits environ 10 % plus fréquemment que sur la preuve de travail. Il s'agissait d'un changement assez insignifiant et il est peu probable qu'il soit remarqué par les utilisateurs.

La preuve d'enjeu a introduit le concept de finalité des transactions qui n'existait pas auparavant. Dans la preuve de travail, la capacité d'annuler un bloc devient exponentiellement plus difficile avec chaque bloc miné au-dessus d'une transaction, mais elle n'atteint jamais tout à fait zéro. Sous la preuve d'enjeu, les blocs sont regroupés en époques (des périodes de 6,4 minutes contenant 32 chances pour des blocs) sur lesquelles les validateurs votent. Lorsqu'une époque se termine, les validateurs votent pour déterminer s'il faut considérer l'époque comme « justifiée ». Si les validateurs acceptent de justifier l'époque, elle est finalisée lors de l'époque suivante. L'annulation de transactions finalisées est économiquement non viable car cela nécessiterait d'obtenir et de brûler plus d'un tiers du total des ETH stakés.

</ExpandableCard>

<ExpandableCard
title="Misconception: &quot;The Merge enabled staking withdrawals.&quot;"
contentPreview="False, but staking withdrawals have since been enabled via the Shanghai/Capella upgrade.">

Initialement après La Fusion, les stakers ne pouvaient accéder qu'aux pourboires de frais et à la MEV gagnés à la suite de propositions de blocs. Ces récompenses sont créditées sur un compte non lié au staking contrôlé par le validateur (connu sous le nom de <em>bénéficiaire des frais</em>), et sont disponibles immédiatement. Ces récompenses sont distinctes des récompenses du protocole pour l'exécution des tâches de validateur.

Depuis la mise à niveau du réseau Shanghai/Capella, les stakers peuvent désormais désigner une <em>adresse de retrait</em> pour commencer à recevoir des paiements automatiques de tout solde de staking excédentaire (les ETH au-delà de 32 provenant des récompenses du protocole). Cette mise à niveau a également permis à un validateur de débloquer et de récupérer l'intégralité de son solde lors de sa sortie du réseau.

[En savoir plus sur les retraits de staking](/staking/withdrawals/)

</ExpandableCard>

<ExpandableCard
title="Misconception: &quot;Now that The Merge is complete, and withdrawals are enabled, stakers could all exit at once.&quot;"
contentPreview="False. Validator exits are rate limited for security reasons.">
Depuis que la mise à niveau Shanghai/Capella a activé les retraits, les validateurs sont incités à retirer leur solde de staking supérieur à 32 ETH, car ces fonds n'ajoutent pas de rendement et sont autrement verrouillés. En fonction de l'APR (déterminé par le total des ETH stakés), ils peuvent être incités à sortir leur(s) validateur(s) pour récupérer l'intégralité de leur solde ou potentiellement staker encore plus en utilisant leurs récompenses pour gagner plus de rendement.

Une mise en garde importante ici : les sorties complètes de validateurs sont limitées en fréquence par le protocole, et seul un certain nombre de validateurs peuvent sortir par époque (toutes les 6,4 minutes). Cette limite fluctue en fonction du nombre de validateurs actifs, mais revient à environ 0,33 % du total des ETH stakés pouvant être sortis du réseau en une seule journée.

Cela empêche un exode massif des fonds stakés. De plus, cela empêche un attaquant potentiel ayant accès à une grande partie du total des ETH stakés de commettre une infraction passible de réduction et de sortir/retirer tous les soldes des validateurs fautifs dans la même époque avant que le protocole ne puisse appliquer la pénalité de réduction.

L'APR est également intentionnellement dynamique, permettant à un marché de stakers d'équilibrer combien ils sont prêts à être payés pour aider à sécuriser le réseau. Si le taux est trop bas, les validateurs sortiront à un rythme limité par le protocole. Progressivement, cela augmentera l'APR pour tous ceux qui restent, attirant à nouveau de nouveaux stakers ou ceux qui reviennent.
</ExpandableCard>

## Qu'est-il arrivé à « Eth2 » ? {#eth2}

Le terme « Eth2 » a été abandonné. Après avoir fusionné « Eth1 » et « Eth2 » en une seule chaîne, il n'est plus nécessaire de faire la distinction entre deux réseaux Ethereum ; il n'y a plus qu'Ethereum.

Pour limiter la confusion, la communauté a mis à jour ces termes :

- « Eth1 » est désormais la « couche d'exécution », qui gère les transactions et l'exécution.
- « Eth2 » est désormais la « couche de consensus », qui gère le consensus de preuve d'enjeu.

Ces mises à jour terminologiques ne modifient que les conventions de nommage ; cela ne modifie pas les objectifs ou la feuille de route d'Ethereum.

[En savoir plus sur le renommage d'« Eth2 »](https://blog.ethereum.org/2022/01/24/the-great-eth2-renaming)

## Relation entre les mises à niveau {#relationship-between-upgrades}

Les mises à niveau d'Ethereum sont toutes plus ou moins liées. Récapitulons donc comment La Fusion se rapporte aux autres mises à niveau.

### La Fusion et la chaîne balise {#merge-and-beacon-chain}

La Fusion représente l'adoption formelle de la chaîne balise comme nouvelle couche de consensus pour la couche d'exécution originale du réseau principal. Depuis La Fusion, des validateurs sont assignés pour sécuriser le réseau principal Ethereum, et le minage sur la [preuve de travail](/developers/docs/consensus-mechanisms/pow/) n'est plus un moyen valide de production de blocs.

Les blocs sont plutôt proposés par des nœuds de validation qui ont staké des ETH en échange du droit de participer au consensus. Ces mises à niveau préparent le terrain pour de futures mises à niveau de scalabilité, y compris les chaînes de fragments.

<ButtonLink href="/roadmap/beacon-chain/">
  La chaîne balise
</ButtonLink>

### La Fusion et la mise à niveau Shanghai {#merge-and-shanghai}

Afin de simplifier et de maximiser la concentration sur une transition réussie vers la preuve d'enjeu, la mise à niveau de La Fusion n'a pas inclus certaines fonctionnalités attendues telles que la possibilité de retirer les ETH stakés. Cette fonctionnalité a été activée séparément avec la mise à niveau Shanghai/Capella.

Pour les curieux, apprenez-en davantage sur [ce qui se passe après La Fusion](https://youtu.be/7ggwLccuN5s?t=101), présenté par Vitalik lors de l'événement ETHGlobal d'avril 2021.

### La Fusion et les chaînes de fragments {#merge-and-data-sharding}

À l'origine, le plan était de travailler sur les chaînes de fragments avant La Fusion pour aborder la scalabilité. Cependant, avec l'essor des [solutions de mise à l'échelle de couche 2 (l2)](/layer-2/), la priorité est passée au remplacement de la preuve de travail par la preuve d'enjeu en premier.

Les plans pour les chaînes de fragments évoluent rapidement, mais compte tenu de l'essor et du succès des technologies de couche 2 (l2) pour mettre à l'échelle l'exécution des transactions, les plans de chaînes de fragments se sont orientés vers la recherche du moyen le plus optimal de répartir la charge de stockage des données d'appel compressées provenant des contrats de rollups, permettant une croissance exponentielle de la capacité du réseau. Cela ne serait pas possible sans une transition préalable vers la preuve d'enjeu.

<ButtonLink href="/roadmap/danksharding/">
  Chaînes de fragments
</ButtonLink>

## Lectures complémentaires {#further-reading}

<MergeArticleList />

<QuizWidget quizKey="merge" />