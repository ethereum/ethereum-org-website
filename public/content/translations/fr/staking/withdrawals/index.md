---
title: Retraits de staking
description: "Page résumant ce que sont les retraits de staking, comment ils fonctionnent et ce que les stakers doivent faire pour obtenir leurs récompenses"
lang: fr
template: staking
image: /images/staking/leslie-withdrawal.png
alt: "Leslie le rhinocéros avec ses récompenses de staking"
sidebarDepth: 2
summaryPoints:
  - Les opérateurs de validateurs doivent fournir une adresse de retrait pour activer les retraits
  - Les validateurs historiques voient leur solde excédentaire au-delà de 32 ETH automatiquement retiré tous les quelques jours
  - Les validateurs à composition gagnent des récompenses sur l'intégralité de leur solde jusqu'à 2048 ETH
  - Les validateurs qui effectuent une sortie complète du staking recevront leur solde restant
---

Les **retraits de staking** font référence aux transferts d'ETH depuis un compte de validateur sur la couche de consensus d'Ethereum (la chaîne balise), vers la couche d'exécution où ils peuvent faire l'objet de transactions.

> Si vous faites partie d'un [pool de staking](/staking/pools/) ou si vous détenez des jetons de staking, vous devriez vérifier auprès de votre fournisseur pour plus de détails sur la façon dont les retraits de staking sont gérés, car chaque service fonctionne différemment.

Le fonctionnement des retraits dépend du type d'identifiants de retrait de votre validateur :

- **Validateurs historiques (Type 1)** : Le solde excédentaire au-delà de 32 ETH est automatiquement et régulièrement envoyé à l'adresse de retrait liée au validateur. Les récompenses supérieures à 32 ETH ne contribuent pas au poids du validateur sur le réseau.
- **Validateurs à composition (Type 2)** : Les récompenses s'ajoutent au solde effectif du validateur jusqu'à 2048 ETH, augmentant le poids du validateur et générant plus de récompenses. Seul le solde dépassant 2048 ETH est automatiquement balayé.

Les utilisateurs peuvent également **effectuer une sortie complète du staking**, en soumettant une transaction de retrait, en attendant le délai de la file d'attente de retrait (en fonction de la demande du réseau), et en débloquant l'intégralité du solde de leur validateur.

## Récompenses de staking {#staking-rewards}

La gestion des récompenses dépend du type d'identifiants du validateur :

Les **validateurs historiques (Type 1)** ont un solde effectif plafonné à 32 ETH. Tout solde supérieur à 32 ETH reçu sous forme de récompenses du réseau ne contribue pas au solde effectif ni n'augmente le poids de ce validateur sur le réseau, et ces récompenses sont automatiquement retirées vers l'adresse de retrait dédiée du validateur tous les quelques jours. Mis à part fournir une adresse de retrait une seule fois, réclamer ces récompenses ne nécessite aucune action de la part de l'opérateur du validateur. Tout cela est initié sur la couche de consensus, donc aucun gaz (frais de transaction) n'est requis à aucune étape.

Les **validateurs à composition (Type 2)** peuvent avoir un solde effectif compris entre 32 et 2048 ETH. Les récompenses du réseau reçues par ces validateurs s'ajoutent à leur solde effectif, augmentant le poids du validateur et son potentiel à recevoir de futures récompenses. Les balayages automatiques ne se produisent que pour les soldes dépassant 2048 ETH. Pour retirer des récompenses en dessous du seuil de 2048 ETH, les validateurs à composition doivent déclencher un retrait partiel manuellement depuis la couche d'exécution, ce qui nécessite du gaz.

### Comment en sommes-nous arrivés là ? {#how-did-we-get-here}

Au cours des dernières années, [Ethereum](/) a subi plusieurs mises à jour du réseau pour passer à un réseau sécurisé par l'ETH lui-même, au lieu du minage très gourmand en énergie comme c'était le cas auparavant. La participation au consensus sur Ethereum est désormais connue sous le nom de « staking », car les participants ont volontairement verrouillé des ETH, les mettant « en jeu » (at stake) pour avoir la possibilité de participer au réseau. Les utilisateurs qui respectent les règles seront récompensés, tandis que les tentatives de triche peuvent être pénalisées.

Depuis le lancement du contrat de dépôt de staking en novembre 2020, de courageux pionniers d'Ethereum ont volontairement verrouillé des fonds pour activer des « validateurs », des comptes spéciaux qui ont le droit d'attester formellement et de proposer des blocs, en suivant les règles du réseau.

Avant la mise à jour Shanghai/Capella, vous ne pouviez ni utiliser ni accéder à vos ETH stakés. Mais maintenant, vous pouvez choisir de recevoir automatiquement vos récompenses sur un compte choisi, et vous pouvez également retirer vos ETH stakés quand vous le souhaitez.

### Comment me préparer ? {#how-do-i-prepare}

<WithdrawalsTabComparison />

### Avis importants {#important-notices}

Les comptes de validateurs sont tenus de fournir une adresse de retrait avant de pouvoir accéder et retirer les récompenses du réseau accumulées, ou traiter un retrait complet lors d'une sortie du staking.

<Alert variant="warning">
<AlertEmoji text="⚠️"/>
<AlertContent>
<AlertDescription>
**Chaque compte de validateur ne peut se voir attribuer qu'une seule adresse de retrait, une seule fois.** Une fois qu'une adresse est choisie et soumise à la couche de consensus, cela ne peut pas être annulé ou modifié à nouveau. Vérifiez bien la propriété et l'exactitude de l'adresse fournie avant de la soumettre.
</AlertDescription>
</AlertContent>
</Alert>

Si vous n'avez pas encore fourni d'adresse de retrait pour votre compte de validateur, il n'y a **aucune menace pour vos fonds entre-temps**, en supposant que votre phrase secrète (mnémonique) est restée en sécurité hors ligne et n'a été compromise d'aucune façon. Le fait de ne pas ajouter d'identifiants de retrait laissera simplement les ETH verrouillés dans le compte du validateur jusqu'à ce qu'une adresse de retrait soit fournie.

## Validateurs à composition {#compounding-validators}

Les validateurs peuvent opter pour la **composition** en convertissant leurs identifiants de retrait du Type 1 au Type 2. Cela augmente le solde effectif maximum de 32 ETH à **2048 ETH**, permettant aux récompenses de s'ajouter au solde effectif du validateur au lieu d'être automatiquement balayées.

Avec la composition activée :

- Les récompenses augmentent le solde effectif du validateur par incréments de 1 ETH (sous réserve d'un petit [tampon d'hystérésis](https://www.attestant.io/posts/understanding-validator-effective-balance/)), générant plus de récompenses au fil du temps
- Les balayages automatiques ne se produisent que pour les soldes dépassant 2048 ETH
- Les retraits partiels en dessous du seuil de 2048 ETH doivent être déclenchés manuellement depuis la couche d'exécution (cela coûte du gaz)
- Plusieurs validateurs peuvent être **consolidés** en un seul validateur à composition, réduisant ainsi la charge opérationnelle

<Alert variant="warning">
<AlertEmoji text="⚠️"/>
<AlertContent>
<AlertDescription>
**La conversion des identifiants de retrait de Type 1 à Type 2 est irréversible.** Utilisez le [Staking Launchpad](https://launchpad.ethereum.org/validator-actions) comme outil officiel pour cette conversion. Pour plus de détails sur le processus de conversion, les risques et la consolidation, consultez [l'exploration détaillée de MaxEB](/roadmap/pectra/maxeb/).
</AlertDescription>
</AlertContent>
</Alert>

## Sortie complète du staking {#exiting-staking-entirely}

Fournir une adresse de retrait est requis avant que _tout_ fonds ne puisse être transféré hors du solde d'un compte de validateur.

Les utilisateurs cherchant à effectuer une sortie complète du staking et à récupérer l'intégralité de leur solde doivent initier une « sortie volontaire ». Cela peut se faire de deux manières :

- **En utilisant les clés du validateur** : Signez et diffusez un message de sortie volontaire avec votre client validateur, soumis à votre nœud de consensus. Cela ne nécessite pas de gaz.
- **En utilisant les identifiants de retrait** : Déclenchez une sortie depuis la couche d'exécution en utilisant votre adresse de retrait, sans avoir besoin d'accéder à la clé de signature du validateur. Cela nécessite une transaction et coûte du gaz.

Le processus de sortie d'un validateur du staking prend un temps variable, en fonction du nombre d'autres validateurs qui sortent en même temps. Une fois terminé, ce compte ne sera plus responsable de l'exécution des tâches du réseau de validateurs, ne sera plus éligible aux récompenses et n'aura plus ses ETH « en jeu ». À ce moment-là, le compte sera marqué comme entièrement « retirable » (withdrawable).

Une fois qu'un compte est signalé comme « retirable » et que les identifiants de retrait ont été fournis, l'utilisateur n'a plus rien à faire à part attendre. Les comptes sont automatiquement et continuellement balayés par les proposants de blocs pour les fonds sortis éligibles, et le solde de votre compte sera transféré en totalité (également appelé « retrait complet ») lors du prochain <a href="#validator-sweeping" customEventOptions={{ eventCategory: "Anchor link", eventAction: "Exiting staking entirely (sweep)", eventName: "click" }}>balayage</a>.

## Comment fonctionnent les récompenses automatiques (validateur de Type 1) ? {#how-do-withdrawals-work}

L'éligibilité d'un validateur donné à un retrait est déterminée par l'état du compte du validateur lui-même. Aucune intervention de l'utilisateur n'est nécessaire à un moment donné pour déterminer si un compte doit voir un retrait initié ou non — l'ensemble du processus est effectué automatiquement par la couche de consensus en boucle continue.

### Vous avez une mémoire plutôt visuelle ? {#visual-learner}

Découvrez cette explication des retraits de staking Ethereum par Finematics :

<VideoWatch slug="ethereum-staking-withdrawals" />

### « Balayage » des validateurs {#validator-sweeping}

Lorsqu'un validateur est programmé pour proposer le bloc suivant, il est tenu de construire une file d'attente de retrait, pouvant aller jusqu'à 16 retraits éligibles. Cela se fait en commençant initialement par l'indice de validateur 0, en déterminant s'il y a un retrait éligible pour ce compte selon les règles du protocole, et en l'ajoutant à la file d'attente si c'est le cas. Le validateur défini pour proposer le bloc suivant reprendra là où le dernier s'est arrêté, progressant dans l'ordre indéfiniment.

<Alert variant="update">
<AlertEmoji text="🕛"/>
<AlertContent>
<AlertDescription>
Pensez à une horloge analogique. L'aiguille de l'horloge pointe vers l'heure, progresse dans une direction, ne saute aucune heure et finit par revenir au début une fois le dernier chiffre atteint.

Maintenant, au lieu de 1 à 12, imaginez que l'horloge a de 0 à N _(N étant le nombre total de comptes de validateurs qui ont été enregistrés sur la couche de consensus, plus de 1,2 million en avril 2026)._

L'aiguille de l'horloge pointe vers le prochain validateur qui doit être vérifié pour les retraits éligibles. Elle commence à 0 et fait tout le tour sans sauter aucun compte. Lorsque le dernier validateur est atteint, le cycle reprend au début.
</AlertDescription>
</AlertContent>
</Alert>

#### Vérification d'un compte pour les retraits {#checking-an-account-for-withdrawals}

Pendant qu'un proposant balaie les validateurs pour d'éventuels retraits, chaque validateur vérifié est évalué par rapport à une courte série de questions pour déterminer si un retrait doit être déclenché, et si oui, combien d'ETH doivent être retirés.

1. **Une adresse de retrait a-t-elle été fournie ?** Si aucune adresse de retrait n'a été fournie, le compte est ignoré et aucun retrait n'est initié.
2. **Le validateur est-il sorti et retirable ?** Si le validateur a effectué une sortie complète, et que nous avons atteint l'époque où son compte est considéré comme « retirable », alors un retrait complet sera traité. Cela transférera l'intégralité du solde restant à l'adresse de retrait.
3. **Le solde dépasse-il son solde effectif maximum ?** Pour les validateurs historiques (Type 1), ce seuil est de 32 ETH. Pour les validateurs à composition (Type 2), ce seuil est de 2048 ETH. Si le compte a des identifiants de retrait, n'est pas complètement sorti, a un solde effectif au maximum et a un solde supérieur à ce seuil, alors un retrait partiel sera traité qui ne transférera que l'excédent à l'adresse de retrait de l'utilisateur.

Il n'y a que deux actions entreprises par les opérateurs de validateurs au cours du cycle de vie d'un validateur qui influencent directement ce flux :

- Fournir des identifiants de retrait pour activer toute forme de retrait
- Sortir du réseau, ce qui déclenchera un retrait complet

### Sans gaz {#gas-free}

Les balayages de retrait automatiques ne nécessitent pas que les stakers soumettent manuellement une transaction. Cela signifie qu'**aucun gaz (frais de transaction) n'est requis** pour les balayages automatiques, et ils ne sont pas en concurrence pour l'espace de bloc existant de la couche d'exécution.

Notez que les [validateurs à composition](#compounding-validators) qui souhaitent déclencher un retrait partiel en dessous du seuil de 2048 ETH doivent le faire manuellement depuis la couche d'exécution, ce qui nécessite du gaz.

### À quelle fréquence mes récompenses de staking seront-elles débloquées et disponibles dans mon portefeuille ? {#how-soon}

Un maximum de 16 retraits peut être traité dans un seul bloc. À ce rythme, 115 200 retraits de validateurs peuvent être traités par jour (en supposant qu'aucun créneau ne soit manqué). Comme indiqué ci-dessus, les validateurs sans retraits éligibles seront ignorés, ce qui réduira le temps nécessaire pour terminer le balayage.

En développant ce calcul, nous pouvons estimer le temps qu'il faudra pour traiter un nombre donné de retraits :

<TableContainer>

| Nombre de retraits | Temps de réalisation |
| :-------------------: | :--------------: |
|        400 000        |     3,5 jours     |
|        500 000        |     4,3 jours     |
|        600 000        |     5,2 jours     |
|        700 000        |     6,1 jours     |
|        800 000        |     7,0 jours     |

</TableContainer>

Comme vous pouvez le voir, cela ralentit à mesure qu'il y a plus de validateurs sur le réseau. Une augmentation des créneaux manqués pourrait ralentir cela proportionnellement, mais cela représentera généralement le côté le plus lent des résultats possibles.

## Foire aux questions {#faq}

<ExpandableCard
title="Once I have provided a withdrawal address, can I change it to an alternative withdrawal address?"
eventCategory="FAQ"
eventAction="Once I have provided a withdrawal address, can I change it to an alternative withdrawal address?"
eventName="read more">
Non, le processus pour fournir des identifiants de retrait est un processus unique, et ne peut pas être modifié une fois soumis.
</ExpandableCard>

<ExpandableCard
title="Why can a validator's withdrawal address only be set once?"
eventCategory="FAQ"
eventAction="Why can a validator's withdrawal address only be set once?"
eventName="read more">
La configuration de l'adresse de retrait de la couche d'exécution d'un validateur est une modification permanente des identifiants du validateur sur la couche de consensus. Il n'y a aucun moyen de mettre à jour les identifiants de la couche de consensus une fois qu'ils sont enregistrés.

Les identifiants de l'adresse de retrait d'un validateur peuvent être configurés pour pointer soit vers un contrat intelligent (contrôlé par son code), soit vers un compte détenu par un tiers (EOA, contrôlé par sa clé privée). Actuellement, ces comptes n'ont aucun moyen de communiquer un message en retour à la couche de consensus qui signalerait un changement des identifiants du validateur, et l'ajout de cette fonctionnalité ajouterait une complexité inutile au protocole.

Les utilisateurs recherchant une gestion flexible des retraits peuvent configurer un portefeuille de contrat intelligent capable de rotation de clés (comme un [Safe](https://safe.global/)) comme adresse de retrait du validateur, permettant ainsi de mettre à jour l'EOA destinataire final. Si un utilisateur a déjà défini un EOA comme identifiant de retrait, il doit initier une sortie complète pour récupérer ses ETH stakés, puis utiliser ces fonds pour activer un nouveau validateur avec des identifiants différents.
</ExpandableCard>

<ExpandableCard
title="How do I withdraw from staking if I stake through a provider, staking pool, or participate with liquid staking tokens?"
eventCategory="FAQ"
eventAction="How do I withdraw from staking if I stake through a provider, staking pool, or participate with liquid staking tokens?"
eventName="read more">
Si vous utilisez un pool de staking ou détenez des jetons de staking, contactez votre fournisseur pour savoir comment il gère les retraits, car les processus varient selon le service. 

En général, lorsque vous stakez via un fournisseur ou un pool, vous devriez être libre de récupérer vos ETH stakés sous-jacents, ou de retirer et de changer de fournisseur de staking. Si un pool particulier devient trop grand, les ETH stakés peuvent être sortis, rachetés et stakés à nouveau avec un [fournisseur plus petit](https://rated.network/). Ou, si vous avez accumulé suffisamment d'ETH, vous pourriez [staker depuis chez vous](/staking/solo/).

</ExpandableCard>

<ExpandableCard
title="Does claiming network rewards (partial withdrawals) happen automatically?"
eventCategory="FAQ"
eventAction="Does claiming network rewards (partial withdrawals) happen automatically?"
eventName="read more">
Pour les **validateurs historiques (Type 1)**, oui — tant que votre validateur a fourni une adresse de retrait. Celle-ci doit être fournie une fois pour activer tout retrait, puis la distribution des récompenses du réseau à l'adresse de retrait sera automatiquement déclenchée tous les quelques jours à chaque balayage de validateur.

Pour les **validateurs à composition (Type 2)**, les récompenses s'ajoutent au solde effectif du validateur (jusqu'à 2048 ETH) plutôt que d'être balayées vers l'adresse de retrait. Les balayages automatiques ne se produisent que pour les soldes dépassant 2048 ETH. Pour retirer des récompenses en dessous de ce seuil, vous devez déclencher manuellement un retrait partiel depuis la couche d'exécution.
</ExpandableCard>

<ExpandableCard title="Can I withdraw a custom amount?"
eventCategory="FAQ"
eventAction="Can I withdraw a custom amount?"
eventName="read more">
Pour les **validateurs historiques (Type 1)**, toutes les récompenses du réseau en ETH qui se sont accumulées au-delà du solde effectif de 32 ETH du validateur sont automatiquement poussées vers l'adresse de retrait. Les validateurs de Type 1 qui ont soumis une transaction de retrait complet et terminé le processus de sortie du staking voient l'intégralité de leur solde en ETH retiré vers leur adresse de retrait. Il n'est pas possible pour un validateur de Type 1 de demander manuellement le retrait de montants spécifiques d'ETH.

Les **validateurs à composition (Type 2)** peuvent déclencher des retraits partiels d'un montant spécifique depuis la couche d'exécution, tant que le solde restant du validateur reste égal ou supérieur à 32 ETH. Cela nécessite de soumettre une transaction de retrait partiel et coûte du gaz.
</ExpandableCard>

<ExpandableCard
title="I operate a validator. Where can I find more information about managing the withdrawal process?"
eventCategory="FAQ"
eventAction="I operate a validator. Where can I find more information about managing the withdrawal process?"
eventName="read more">

Il est recommandé aux opérateurs de validateurs de visiter la page [Retraits du Staking Launchpad](https://launchpad.ethereum.org/withdrawals/) où vous trouverez plus de détails sur la façon de préparer votre validateur pour les retraits, le calendrier des événements et plus de détails sur le fonctionnement des retraits.

Pour tester d'abord votre configuration sur un réseau de test, visitez le [Staking Launchpad du réseau de test Hoodi](https://hoodi.launchpad.ethereum.org) pour commencer.

</ExpandableCard>

<ExpandableCard
title="Can I re-activate my validator after exiting by depositing more ETH?"
eventCategory="FAQ"
eventAction="Can I re-activate my validator after exiting by depositing more ETH?"
eventName="read more">
Non. Une fois qu'un validateur est sorti et que l'intégralité de son solde a été retirée, tout ETH supplémentaire déposé sur ce validateur sera automatiquement transféré à l'adresse de retrait lors du prochain balayage de validateur. Pour recommencer le staking en utilisant ces ETH, vous devez activer un nouveau validateur.
</ExpandableCard>

<ExpandableCard
title="What is the difference between legacy and compounding validators?"
eventCategory="FAQ"
eventAction="What is the difference between legacy and compounding validators?"
eventName="read more">
Les validateurs historiques utilisent des identifiants de retrait de **Type 1** (l'adresse des identifiants de retrait commence par 0x01) et ont un solde effectif plafonné à 32 ETH. Tout ETH excédentaire reçu sous forme de récompenses du réseau est automatiquement balayé vers l'adresse de retrait tous les quelques jours.

Les validateurs à composition utilisent des identifiants de retrait de **Type 2** (l'adresse des identifiants de retrait commence par 0x02) et peuvent avoir un solde effectif allant jusqu'à 2048 ETH. Les récompenses s'ajoutent au solde effectif du validateur, augmentant le poids du validateur sur le réseau et son potentiel à recevoir de futures récompenses. Les balayages automatiques ne se produisent que pour les soldes dépassant 2048 ETH. Pour retirer des ETH en dessous de ce seuil, un retrait partiel manuel doit être déclenché depuis la couche d'exécution.

Pour plus de détails, consultez [l'exploration détaillée de MaxEB](/roadmap/pectra/maxeb/).
</ExpandableCard>

<ExpandableCard
title="How do I convert to a compounding validator?"
eventCategory="FAQ"
eventAction="How do I convert to a compounding validator?"
eventName="read more">
Vous pouvez convertir les identifiants de retrait de Type 1 en Type 2 en utilisant le [Staking Launchpad](https://launchpad.ethereum.org/validator-actions). Cette opération est **irréversible** — une fois que vous avez converti, vous ne pouvez pas revenir aux identifiants de Type 1.

Après la conversion, vous pouvez également **consolider** plusieurs validateurs en un seul, en combinant leurs soldes en un seul validateur à composition. Pour une présentation complète du processus de conversion, des risques et des outils de consolidation, consultez [l'exploration détaillée de MaxEB](/roadmap/pectra/maxeb/).
</ExpandableCard>

<ExpandableCard
title="When were staking withdrawals enabled?"
eventCategory="FAQ"
eventAction="When were staking withdrawals enabled?"
eventName="read more">
La fonctionnalité de retrait a été initialement activée dans le cadre de la mise à jour Shanghai/Capella le **12 avril 2023**. La [mise à jour Pectra](/roadmap/pectra/) (mai 2025) a ensuite introduit les validateurs à composition avec un solde effectif maximum plus élevé de 2048 ETH, ainsi que les sorties et les retraits partiels déclenchés par la couche d'exécution.

La mise à jour Shanghai/Capella a permis de récupérer les ETH précédemment stakés sur des comptes Ethereum classiques. Cela a bouclé la boucle de la liquidité du staking et a rapproché Ethereum d'une étape supplémentaire dans son parcours vers la construction d'un écosystème décentralisé durable, évolutif et sécurisé.

- [En savoir plus sur l'histoire d'Ethereum](/ethereum-forks/)
- [En savoir plus sur la feuille de route d'Ethereum](/roadmap/)
</ExpandableCard>

## Complément d'information {#further-reading}

- [Retraits du Staking Launchpad](https://launchpad.ethereum.org/withdrawals)
- [Actions des validateurs du Staking Launchpad](https://launchpad.ethereum.org/validator-actions)
- [Exploration détaillée de MaxEB : composition et consolidation](/roadmap/pectra/maxeb/)
- [EIP-4895 : Retraits poussés de la chaîne balise en tant qu'opérations](https://eips.ethereum.org/EIPS/eip-4895)
- [PEEPanEIP #94 : Retrait d'ETH stakés (Tests) avec Potuz & Hsiao-Wei Wang](https://www.youtube.com/watch?v=G8UstwmGtyE)
- [PEEPanEIP#68 : EIP-4895 : Retraits poussés de la chaîne balise en tant qu'opérations avec Alex Stokes](https://www.youtube.com/watch?v=CcL9RJBljUs)
- [Comprendre le solde effectif du validateur](https://www.attestant.io/posts/understanding-validator-effective-balance/)