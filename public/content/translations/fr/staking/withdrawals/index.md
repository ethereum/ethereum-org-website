---
title: Retraits de la mise en jeu
description: Page résumant ce que sont les retraits de staking, comment ils fonctionnent et ce que les stakers doivent faire pour obtenir leurs récompenses
lang: fr
template: staking
image: ../../../../../assets/staking/leslie-withdrawal.png
alt: Leslie le rhinocéros avec ses récompenses de stacking
sidebarDepth: 2
summaryPoints:
  - La mise à niveau de Shanghai permet d'activer les retraits sur Ethereum
  - Les opérateurs validateurs doivent fournir une adresse de retrait pour l'activer
  - Les récompenses sont automatiquement distribuées tous les deux ou trois jours
  - Les validateurs qui quittent complètements le staking recevront leur solde restant
---

<UpgradeStatus dateKey="page-staking-withdrawals-when">
  Les retraits de staking seront autorisés grâce à la mise à niveau de Shanghai/Capella. Cette mise à niveau du réseau Ethereum devrait avoir lieu au premier semestre de 2023. <a href="#when" customEventOptions={{ eventCategory: "Anchor link", eventAction: "When's it shipping?", eventName: "click" }}>Plus de détails ci-dessous</a>
</UpgradeStatus>

La mise à niveau Shanghai/Capella permet **des retraits de staking** sur Ethereum, autorisant les gens à débloquer des récompenses de staking ETH. Les paiements des récompenses seront automatiquement et régulièrement envoyés à une adresse de retrait fournie et liée à chaque validateur. Les utilisateurs peuvent également quitter le staking entièrement en débloquant la totalité de leur solde de validateur.

## Récompenses de staking {#staking-rewards}

Les paiements de récompenses sont traités automatiquement pour les comptes des validateurs actifs avec un solde effectif de 32 ETH maximum.

Tout solde supérieur à 32 ETH gagné grâce aux récompenses ne contribue pas réellement au principal, ou à augmenter la pondération de ce validateur sur le réseau, et est donc automatiquement retiré comme paiement des récompenses tous les deux ou trois jours. En sus de fournir une adresse de retrait ponctuellement, ces récompenses ne nécessitent aucune action de la part de l'opérateur de validateur. Tout cela est initié à la couche de consensus, donc aucun gaz (frais de transaction) n'est requis à aucune étape.

### Comment sommes-nous arrivés là ? {#how-did-we-get-here}

Au cours des dernières années, Ethereum a subi plusieurs mises à niveau de réseau en passant à un réseau sécurisé par ETH lui-même, au lieu de miner à haute intensité énergétique comme par le passé. Participer au consensus sur Ethereum est maintenant connu sous le nom de « mise en jeu », les participants ayant volontairement bloqué l'ETH, le plaçant « en stacking » pour pouvoir participer au réseau. Les utilisateurs qui suivent les règles seront récompensés, tandis que les tentatives de triche peuvent être pénalisées.

Depuis le lancement du contrat de dépôt de staking en novembre 2020, certains courageux pionniers d'Ethereum ont volontairement bloqué des fonds pour activer les « validateurs », les comptes qui ont le droit de présenter une attestation officielle et de proposer des blocs, en suivant les règles du réseau.

Avant la mise à jour de Shanghai, vous ne pouviez pas utiliser ou accéder à vos ETH mis en jeu. Mais désormais vous pouvez choisir de recevoir automatiquement vos récompenses dans un compte fourni, et vous pouvez également retirer votre ETH misé quand vous le souhaitez.

### Comment puis-je me préparer ? {#how-do-i-prepare}

<WithdrawalsTabComparison />

### Informations importantes {#important-notices}

Fournir une adresse de retrait est une étape requise pour tout compte de validateur avant d'être admissible à un retrait d'ETH sur son solde.

<InfoBanner emoji="⚠️" isWarning>
  <strong>Chaque compte de validateur ne peut se voir attribué qu'une seule adresse de retrait.</strong> Une fois qu'une adresse est choisie et soumise à la chaîne phare (Beacon Chain), elle ne peut pas être annulée ou modifiée à nouveau. Vérifiez la propriété et l'exactitude de l'adresse fournie avant de la soumettre.
</InfoBanner>

Il n'y a <strong>aucune menace concernant vos fonds dans l'intervalle</strong> pour ne pas fournir celle-ci. Ne pas ajouter d’identifiants de retrait laissera simplement l’ETH verrouillé sur le compte du validateur tel qu'il était jusqu'à jusqu’à ce qu’une adresse de retrait soit fournie.

## Quitter entièrement le staking {#exiting-staking-entirely}

Fournir une adresse de retrait est nécessaire pour que _les fonds_ puissent être transférés sur un solde de compte de validateur.

Les utilisateurs qui cherchent à quitter entièrement le staking et à retirer leur solde complet doivent également signer et diffuser un message de « sortie volontaire » avec des clés de validateur qui lanceront le processus de sortie de la mise en jeu. Ceci est exécuté avec votre client de validateur et soumis à votre nœud de balise, et ne nécessite pas de gaz.

Le processus d'un validateur sortant du staking prend un temps variable, en fonction du nombre d'autres individus sortant en même temps. Une fois terminé, ce compte ne sera plus responsable de l'exécution des tâches du réseau de validateur, ne sera plus admissible aux récompenses, et n'aura plus d'ETH « en jeu ». À ce moment, le compte doit être marqué comme entièrement « retirable ».

Une fois qu'un compte est marqué comme « retirable » et que les identifiants de retrait ont été fournis, un utilisateur n'a plus rien à faire d'autre qu'attendre. Les comptes sont automatiquement et continuellement balayés par les proposeurs de blocs pour les fonds sortis qui sont admissibles, et le solde de votre compte sera transféré en entier (également connu sous le nom de « retrait complet ») au cours du prochain <a href="#validator-sweeping" customEventOptions={{ eventCategory: "Anchor link", eventAction: "Exiting staking entirely (sweep)", eventName: "click" }}>balayage</a>.

## Quand les retraits de staking sont-ils activés ? {#when}

Les fonctionnalités de retrait seront activées grâce à une mise à niveau simultanée du réseau en deux parties, **Shanghai + Capella**.

<ShanghaiCapella />

## Comment fonctionnent les paiements de retraits ? {#how-do-withdrawals-work}

Le fait qu'un validateur donné soit éligible ou non pour un retrait est déterminé par l'état du compte du validateur lui-même. Aucune intervention de l'utilisateur n'est nécessaire à un moment donné pour déterminer si un compte doit faire l'objet d'un retrait ou non - l'ensemble du processus est effectué automatiquement par la couche de consensus en boucle continue.

### Davantage qu'un apprenant visuel ? {#visual-learner}

Consultez cette explication de Finematics sur les retraits de staking d'Ethereum :

<YouTube id="RwwU3P9n3uo" />

### « Balayage » du validateur {#validator-sweeping}

Lorsqu'un validateur doit proposer le bloc suivant, il est tenu de constituer une file d'attente de retraits, pouvant aller jusqu'à 16 retraits éligibles. Pour ce faire, on commence par l'index 0 du validateur, on détermine s'il existe un retrait éligible pour ce compte selon les règles du protocole et on l'ajoute à la file d'attente si tel est le cas. Le validateur configuré pour proposer le bloc suivant reprendra là où le précédent s'est arrêté, progressant dans l'ordre indéfiniment.

<InfoBanner emoji="🕛">
Pensez à une horloge analogique. L'aiguille sur l’horloge pointe vers l’heure, progresse dans une direction, ne saute pas d’heures, et finit par se déplacer vers le début à nouveau après que le dernier nombre est atteint.<br/><br/>
Maintenant au lieu de 1 à 12, imaginez que l'horloge a 0 à N <em>(le nombre total de comptes de validateur qui ont déjà été enregistrés sur la chaîne phare, plus de 500 000 ans à compter de janvier 2023).</em><br/><br/>
L'aiguille sur l’horlog pointe vers le validateur suivant qui doit être vérifié pour les retraits éligibles. Il commence à 0 et progresse tout autour sans sauter de compte. Lorsque le dernier validateur est atteint, le cycle reprend au début.
</InfoBanner>

#### Vérification des retraits sur un compte {#checking-an-account-for-withdrawals}

Lorsqu'un proposant passe en revue les validateurs pour d'éventuels retraits, chaque validateur vérifié est évalué en fonction d'une courte série de questions afin de déterminer si un retrait doit être déclenché et, le cas échéant, quel montant d'ETH doit être retiré.

1. **Une adresse de retrait a-t-elle été fournie ? ** Si aucune adresse de retrait n'a été fournie, le compte est ignoré et aucun retrait n'est effectué.
2. **Le validateur est-il sorti et peut-il être retiré ? ** Si le validateur est complètement sorti et que nous avons atteint l'époque où son compte est considéré comme « pouvant être retiré », alors un retrait complet sera effectué. Le solde total restant sera alors transféré à l'adresse de retrait.
3. **Le solde effectif est-il plafonné à 32 ? ** Si le compte dispose d'identifiants de retrait, qu'il n'est pas entièrement clôturé et que des récompenses supérieures à 32 sont en attente, un retrait partiel sera effectué et ne transférera que les récompenses supérieures à 32 à l'adresse de retrait de l'utilisateur.

Seules deux actions entreprises par les opérateurs de validateurs au cours du cycle de vie d'un validateur influencent directement ce flux :

- Fournir des justificatifs de retrait pour permettre toute forme de retrait
- Sortir du réseau déclenchera un retrait complet

### Sans gaz {#gas-free}

Cette approche des retraits de staking évite d'obliger les stakers à soumettre manuellement une transaction demandant le retrait d'une quantité particulière d'ETH. Cela signifie également qu'il n'y a **pas de gaz (frais de transaction) requis**, et que les retraits ne sont pas en concurrence avec l'espace de bloc de la couche d'exécution existante.

### À quelle fréquence recevrai-je mes récompenses de mise en jeu ? {#how-soon}

Un maximum de 16 retraits peut être traité en un seul bloc. À ce rythme, 115 200 retraits de validateurs peuvent être traités par jour (en supposant qu'il n'y ait pas de créneaux manqués). Comme indiqué ci-dessus, les validateurs n'ayant pas effectué de retraits éligibles seront ignorés, ce qui réduira le temps nécessaire pour terminer le balayage.

En élargissant ce calcul, nous pouvons estimer le temps nécessaire pour traiter un nombre donné de retraits :

<TableContainer>

| Nombre de retraits | Délai d'exécution |
| :----------------: | :---------------: |
|      400 000       |     3,5 jours     |
|      500 000       |     4,3 jours     |
|      600 000       |     5,2 jours     |
|      700 000       |     6,1 jours     |
|      800 000       |     7,0 jours     |

</TableContainer>

Comme vous pouvez le constater, ce processus ralentit au fur et à mesure que le nombre de validateurs augmente sur le réseau. Une augmentation des blocs manqués pourrait ralentir proportionnellement ce phénomène, mais cela représente généralement le côté le plus lent des résultats possibles.

## Questions fréquemment posées {#faq}

<ExpandableCard
title="Une fois que j'ai fourni une adresse de retrait, puis-je la changer pour une autre adresse de retrait ?"
eventCategory="FAQ"
eventAction="Once I have provided a withdrawal address, can I change it to an alternative withdrawal address?"
eventName="read more">
Non, la procédure de fourniture des identifiants de retrait est une procédure unique, qui ne peut être modifiée une fois qu'elle a été soumise.
</ExpandableCard>

<ExpandableCard
title="Pourquoi une adresse de retrait ne peut être définie qu'une seule fois ?"
eventCategory="FAQ"
eventAction="Why can a withdrawal address only be set once?"
eventName="read more">
En définissant l'adresse de retrait d'une couche d'exécution, les identifiants de retrait de ce validateur ont été modifiés de manière permanente. Cela signifie que les anciens identifiants ne fonctionneront plus et que les nouveaux identifiants renvoient à un compte de la couche d'exécution.

Les adresses de retrait peuvent être soit un contrat intelligent (contrôlé par son code), soit un compte détenu en externe (EOA, contrôlé par sa clé privée). Actuellement, ces comptes n'ont aucun moyen de communiquer un message à la couche de consensus qui signalerait un changement d'identifiant du validateur, et l'ajout de cette fonctionnalité compliquerait inutilement le protocole.

En guise d'alternative au changement d'adresse de retrait pour un validateur particulier, les utilisateurs peuvent choisir de définir un contrat intelligent comme adresse de retrait, qui pourrait gérer la rotation des clés, comme un coffre-fort. Les utilisateurs qui ont placé leurs fonds sur leur propre EOA peuvent effectuer une sortie complète pour retirer tous leurs fonds misés, puis effectuer une nouvelle mise en utilisant de nouveaux identifiants.
</ExpandableCard>

<ExpandableCard
title="Que se passe-t-il si je participe à des dérivés de staking liquides ou au staking regroupé"
eventCategory="FAQ"
eventAction="What if I participate in liquid staking derivatives or pooled staking"
eventName="read more">

<p>Si vous faites partie d'un <a href="/staking/pools/">groupe d'enjeux</a> ou si vous détenez des produits dérivés de staking liquides, vous devez vous renseigner auprès de votre fournisseur pour savoir comment les retraits de staking affecteront votre contrat, car chaque service fonctionne différemment.</p>
<p>En général, les utilisateurs n'auront probablement rien à faire, et ces services ne seront plus limités par l'impossibilité de retirer des récompenses ou de sortir des fonds du validateur après cette mise à niveau.</p>
<p>Cela signifie que les utilisateurs peuvent désormais décider de racheter leurs ETH sous-jacents mis en jeu, ou de changer le fournisseur de mise en jeu qu'ils utilisent. Si un groupe particulier devient trop important, les fonds peuvent être retirés et rachetés, et remisés auprès d'un <a href="https://pools.invis.cloud">fournisseur plus petit</a>. Ou, si vous avez accumulé suffisamment d'ETH, vous pouvez <a href="/staking/solo/">mise depuis chez vous</a>.</p>
</ExpandableCard>

<ExpandableCard
title="Est-ce que les paiements de récompense (retraits partiels) se font automatiquement ?"
eventCategory="FAQ"
eventAction="Do reward payments (partial withdrawals) happen automatically?"
eventName="read more">

<p>Oui, à condition que votre validateur ait fourni une adresse de retrait. Il doit être fourni une fois pour permettre tout retrait, puis les paiements de récompenses seront automatiquement déclenchés tous les deux ou trois jours avec chaque balayage de validateur.</p>
</ExpandableCard>

<ExpandableCard
title="Les retraits complets sont-ils effectués automatiquement ?"
eventCategory="FAQ"
eventAction="Do full withdrawals happen automatically?"
eventName="read more">

<p>Non, si votre validateur est toujours actif sur le réseau, un retrait total ne se fera pas automatiquement. Pour cela, il faut déclencher manuellement une sortie volontaire.</p>
<p>Une fois qu'un validateur a terminé le processus de sortie, et en supposant que le compte possède des identifiants de retrait, le solde restant sera <em>alors</em> retiré lors du prochain balayage du validateur.</p>
</ExpandableCard>

<ExpandableCard title="Puis-je retirer un montant personnalisé ?"
eventCategory="FAQ"
eventAction="Can I withdraw a custom amount?"
eventName="read more">

<p>Les retraits sont conçus pour être effectués automatiquement, en transférant tous les ETH qui ne contribuent pas activement à la mise. Il s'agit notamment des soldes complets des comptes </p>
<p>Il n'est pas possible de demander manuellement le retrait de quantités spécifiques d'ETH.</p>
</ExpandableCard>

<ExpandableCard
title="J'exploite un validateur, où puis-je trouver plus d'informations sur la préparation ?"
eventCategory="FAQ"
eventAction="I operate a validator, where can I find more information on preparing?"
eventName="read more">

<p>Il est recommandé aux opérateurs de validateurs de consulter la page <a href="https://launchpad.ethereum.org/withdrawals/">Staking Launchpad Withdrawals</a> où vous trouverez plus de détails sur la façon de se préparer, le calendrier des événements, et davantage d'informations sur le fonctionnement des retraits.</p>
</ExpandableCard>

<ExpandableCard
title="Puis-je réactiver mon validateur après la sortie en déposant plus d'ETH ?"
eventCategory="FAQ"
eventAction="Can I re-activate my validator after exiting by depositing more ETH?"
eventName="read more">

<p>Non. Une fois qu'un validateur est sorti et que son solde total a été retiré, tous les fonds supplémentaires déposés sur ce validateur seront automatiquement transférés à l'adresse de retrait lors du prochain balayage du validateur. Pour remettre en jeu l'ETH, un nouveau validateur doit être activé.</p>
</ExpandableCard>

## Complément d'information {#further-reading}

- [Retraits de la plateforme de lancement de la mise en jeu](https://launchpad.ethereum.org/withdrawals)
- [EIP-4895 : la chaîne phare signale les retraits comme des opérations](https://eips.ethereum.org/EIPS/eip-4895)
- [Ethereum Cat Herders - Shanghai](https://www.ethereumcatherders.com/shanghai_upgrade/index.html)
- [PEEPanEIP #94 : Retrait de l'ETH misé (Testing) avec Potuz & Hsiao-Wei Wang](https://www.youtube.com/watch?v=G8UstwmGtyE)
- [PEEPanEIP#68 : EIP-4895 : Retraits de la chaîne de balises en tant qu'opérations avec des prises Alex](https://www.youtube.com/watch?v=CcL9RJBljUs)
- [Comprendre le solde effectif du validateur](https://www.attestant.io/posts/understanding-validator-effective-balance/)
