---
title: MaxEB Pectra
description: En savoir plus sur MaxEB dans la publication de Pectra
lang: fr
---

# MaxEB {#maxeb}

_tl;dr:_ Le hard fork de Pectra permet aux validateurs d'Ethereum d'opter pour un solde effectif maximal et une composition plus élevés en convertissant les informations de retrait de **Type 1** en **Type 2**. L’outil officiel pour effectuer cette conversion est la plateforme de lancement. Cette opération ne peut pas être annulée.

## Vue d'ensemble {#overview}

### Qui est concerné ? {#who-is-affected}

Toute personne qui exploite un validateur - il s'agit probablement de quelqu’un qui connaît l’index (par exemple [Validateur n°12345](https://beaconcha.in/validator/12345)) d’un validateur qu’il contrôle. Si vous utilisez un protocole pour faire fonctionner un validateur (par exemple Lido CSM ou Rocket Pool), vous devrez vérifier auprès d’eux s’ils prennent en charge maxEB, et à quel moment.

Si vous effectuez du staking via un jeton de staking liquide (par exemple rETH ou stETH), aucune action n’est requise ni recommandée.

### Qu’est-ce que « maxEB » ? {#what-is-maxeb}

maxEB = le solde effectif MAXimal d’un validateur. Jusqu’à la fourche majeure Pectra, chaque validateur gagne des récompenses sur un maximum de 32 ETH. Après Pectra, les validateurs ont la possibilité de gagner des récompenses sur n’importe quel solde compris entre 32 et 2048 ETH, par incréments de 1 ETH, en choisissant d’adopter ce changement.

### Comment un validateur peut-il choisir d’adopter cette modification ? {#how-does-a-validator-opt-in}

Un validateur choisit d’adopter le changement maxEB en convertissant ses identifiants de retrait de **Type 1** vers **Type 2**. Cela peut être fait sur la [Plateforme de lancement](https://launchpad.ethereum.org/) après la mise en ligne du hard fork Pectra. Comme pour la conversion de **Type 0** → **Type 1**, passer de **Type 1** → **Type 2** est un processus irréversible.

### Qu’est-ce qu’un identifiant de retrait ? {#whats-a-withdrawal-credential}

Lorsque vous exploitez un validateur, vous disposez d’un ensemble d’identifiants de retrait. Ils peuvent être trouvés dans votre fichier json de données de dépôt ou consultés dans l’onglet [deposit](https://beaconcha.in/validator/12345#deposits) de votre validateur sur beaconcha.in.

1. **Identifiants de retrait de Type 0** : Si les identifiants de retrait de votre validateur commencent par `0x00...`, vous avez effectué le dépôt avant le hard fork Shapella et vous n’avez pas encore d’adresse de retrait définie.

![Identifiant de retrait de Type 0](./0x00-wd.png)

2. **Identifiants de retrait de Type 1** : Si les identifiants de retrait de votre validateur commencent par `0x01...`, vous avez effectué le dépôt après la mise à jour Shapella ou vous avez déjà converti vos identifiants de **Type 0** en identifiants de **Type 1**.

![Identifiant de retrait de Type 1](./0x01-wd.png)

3. **Identifiants de retrait de Type 2** : Ce nouveau type d’identifiant de retrait commencera par `0x02...` et sera activé après la mise à jour Pectra. Les validateurs avec des identifiants de retrait **Type 2** sont parfois appelés « **validateurs à capitalisation** »

| **Autorisé**      | **Non autorisé**  |
| ----------------- | ----------------- |
| ✅ Type 0 → Type 1 | ❌ Type 0 → Type 2 |
| ✅ Type 1 → Type 2 | ❌ Type 1 → Type 0 |
|                   | ❌ Type 2 → Type 1 |
|                   | ❌ Type 2 → Type 0 |

### Risques {#risks}

MaxEB permet à un validateur d’envoyer la totalité de son solde à un autre validateur. Les utilisateurs soumettant une demande de consolidation doivent vérifier la source et le contenu de la transaction qu’ils signent. L’outil officiel pour profiter des fonctionnalités de maxEB est la plateforme de lancement. Si vous décidez d’utiliser un outil tiers, vous devez vérifier que :

- La clé publique du validateur source et son adresse de retrait correspondent bien au validateur qu’ils contrôlent
- La clé publique du validateur cible est correcte et lui appartient
- La demande est une conversion, et non une consolidation, s’ils n’ont pas l’intention d’envoyer des fonds à un autre validateur
- La transaction est signée par la bonne adresse de retrait

Nous **recommandons fortement** de discuter de tout outil tiers que vous envisagez d’utiliser avec la [communauté EthStaker](https://ethstaker.org/about). C’est un endroit utile pour vérifier la pertinence de votre démarche et éviter les erreurs. Si vous utilisez un outil malveillant ou mal configuré, **l’intégralité du solde de votre validateur pourrait être envoyée à un validateur que vous ne contrôlez pas** — sans aucun moyen de le récupérer.

## Détails techniques {#technical-details}

### Le processus {#the-flow}

Il y aura deux utilisations de l’opération `ConsolidationRequest` :

1. Convertir un validateur existant de **Type 1** en validateur **Type 2**
2. Consolider d’autres validateurs dans un validateur **Type 2** existant

Lors de la conversion d’un validateur **Type 1** en **Type 2**, la _source_ et la _cible_ seront tous deux le validateur que vous êtes en train de convertir. L’opération coûtera du gaz et sera mise en file d’attente derrière les autres demandes de consolidation. Cette file d’attente est **distincte** de la file d’attente des dépôts, n’est pas affectée par les nouveaux dépôts de validateurs, et peut être consultée sur [pectrified.com](https://pectrified.com/).

Pour consolider des validateurs, vous devez disposer d’un _validateur cible_ possédant un identifiant de retrait **Type 2**. C’est la destination des soldes de validateurs en cours de consolidation, ainsi que l’index qui sera conservé.

### Exigences pour la conversion en Type 2 {#requirements-for-converting-to-type-2}

Cela sera requis pour le premier validateur que vous convertirez en **Type 2**. L’index de ce validateur est conservé et reste actif. Pour une conversion, le _validateur source_ == le _validateur cible._

Le validateur doit...

- être actif
- avoir des identifiants de retrait **Type 1**
- ne pas être en cours de sortie (ni avoir été sanctionné)
- ne pas avoir de retraits déclenchés manuellement en attente (cela ne s’applique pas aux retraits automatiques)

![illustration de la conversion](./conversion.png)

### Exigences pour la consolidation {#requirements-for-consolidating}

Il s’agit de la _même opération_ que la conversion, mais dans ce cas, le _validateur source_ est différent du _validateur cible_. L’index du validateur cible est conservé et il reçoit le solde du validateur source. L’index du validateur source est placé dans l’état `EXITED`.

Dans ce cas, le validateur source doit remplir toutes les exigences mentionnées ci-dessus, plus les suivantes :

- a été actif pendant au moins ~27,3 heures (soit une `SHARD_COMMITTEE_PERIOD`)

Le validateur cible doit

- avoir des identifiants de retrait **Type 2**
- ne pas être en cours de sortie.

![illustration de la consolidation](./consolidation.png)

### La demande de consolidation {#the-consolidation-request}

La demande de consolidation sera signée par l’adresse de retrait associée au validateur source et contiendra :

1. L’adresse du validateur source (par exemple `0x15F4B914A0cCd14333D850ff311d6DafbFbAa32b`)
2. La clé publique du validateur source (par exemple `0xa1d1ad0714035353258038e964ae9675dc0252ee22cea896825c01458e1807bfad2f9969338798548d9858a571f7425c`)
3. La clé publique du validateur cible

Dans une conversion, les éléments 2 et 3 seront identiques. Cette opération peut être effectuée sur [la plateforme de lancement](https://launchpad.ethereum.org/).

### Exigences de signature {#signing-requirements}

Pour soumettre une `ConsolidationRequest`, **l’adresse de retrait du validateur source** doit signer la demande. Cela prouve le contrôle sur les fonds du validateur.

### Que doit-on signer ? {#what-is-signed}

Une [racine de signature](https://github.com/ethereum/consensus-specs/blob/dev/specs/phase0/beacon-chain.md#compute_signing_root) avec séparation de domaine de l’objet `ConsolidationRequest` est utilisée.

- **Domaine :** `DOMAIN_CONSOLIDATION_REQUEST`
- **Champs de la racine de signature :**
  - `source_pubkey`: `BLSPubkey`
  - `target_pubkey`: `BLSPubkey`
  - `source_address`: `ExecutionAddress`

La **signature BLS** résultante est soumise avec la demande.

Remarque : la signature est effectuée par l’adresse de retrait, et non par la clé du validateur.

### Retraits partiels {#partial-withdrawals}

Les validateurs avec des identifiants **Type 1** reçoivent automatiquement, sans frais de gas, le transfert de leur solde excédentaire (tout ce qui dépasse 32 ETH) vers leur adresse de retrait. Comme le **Type 2** permet à un validateur de faire croître son solde par incréments de 1 ETH, aucun retrait automatique ne sera effectué tant que le solde n’atteint pas 2048 ETH. Les retraits partiels sur les validateurs **Type 2** doivent être déclenchés manuellement et entraîneront des frais de gaz.

## Outils de consolidation {#consolidation-tooling}

Plusieurs outils sont disponibles pour gérer les consolidations. L’outil officiel, créé par la Fondation Ethereum, est la [plateforme de lancement](https://launchpad.ethereum.org/en/validator-actions). Il existe également des outils tiers créés par des acteurs de la communauté du staking, qui peuvent offrir des fonctionnalités non proposées par la plateforme de lancement. Bien que les outils présentés ici ne soient ni audités ni approuvés par la Fondation Ethereum, ce sont des outils open source développés par des membres reconnus de la communauté.

| Outil                          | Site Web                                                     | Open Source                     | Créateur                                       | Audité                                                                                                                                              | Interface                                                                      | Signes particuliers                                                              |
| ------------------------------ | ------------------------------------------------------------ | ------------------------------- | ---------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------ | -------------------------------------------------------------------------------- |
| Gestionnaire de staking Pectra | pectrastaking.com                            | Oui, Apache 2.0 | [Pier Two](https://piertwo.com/)               | Non                                                                                                                                                 | Interface Web                                                                  | Wallet Connect, fonctionne avec SAFE                                             |
| Outil CLI Pectra Validator Ops | [GitHub](https://github.com/Luganodes/Pectra-Batch-Contract) | Oui, MIT                        | [Luganodes](https://www.luganodes.com/)        | Oui, Quantstamp [Mai 2025](https://certificate.quantstamp.com/full/luganodes-pectra-batch-contract/23f0765f-969a-4798-9edd-188d276c4a2b/index.html) | Ligne de commande                                                              | Traitement par lots, pour plusieurs validateurs en une seule fois                |
| Ethereal                       | [GitHub](https://github.com/wealdtech/ethereal)              | Oui, Apache 2.0 | [Jim McDonald](https://www.attestant.io/team/) | Non                                                                                                                                                 | Ligne de commande                                                              | Ensemble complet de fonctionnalités pour la gestion des validateurs et des nœuds |
| Siren                          | [GitHub](https://github.com/sigp/siren)                      | Oui, Apache 2.0 | [Sigma Prime](https://sigmaprime.io/)          | Non                                                                                                                                                 | Quelques lignes de commande, mais principalement une interface utilisateur web | Fonctionne uniquement si vous utilisez le client de consensus Lighthouse         |

## FAQ {#faq}

### Le fait d’opter pour ce changement modifie-t-il mes chances de proposer des blocs ou mes récompenses ? {#change-luck-or-rewards}

Non. Faire ce changement ne diminue pas vos chances de proposer des blocs - vos tâches et la sélection des propositions restent inchangées. Par exemple, si vous avez deux validateurs de 32 ETH contre un seul validateur de 64 ETH, vous aurez exactement les mêmes chances totales d’être sélectionné pour proposer un bloc et gagner des récompenses.

### Le fait d’opter pour ce changement modifie-t-il mon risque d'être sanctionné ? {#change-slashing-risk}

Pour les petits opérateurs ou les opérateurs non professionnels, la réponse est non. La réponse plus détaillée est que, pour les opérateurs professionnels faisant tourner de nombreux validateurs par nœud avec un système d’alerte rapide, consolider en un plus petit nombre de validateurs peut réduire leur capacité à réagir rapidement à une sanction et à éviter les événements en cascade. La _pénalité_ initiale de sanction pour tous les validateurs a été fortement réduite, passant de 1 ETH (par tranche de 32 ETH) à 0,0078125 ETH (par tranche de 32 ETH), afin de compenser ce risque.

### Dois-je faire sortir mon validateur pour effectuer la conversion ? {#exit-validator}

Non. Vous pouvez effectuer la conversion directement, sans faire sortir votre validateur.

### Combien de temps faut-il pour convertir ou consolider ? {#how-long}

Un minimum de 27,3 heures, mais les consolidations sont également soumises à une file d’attente. Cette file d’attente est indépendante des files de dépôt et de retrait, et n’est pas affectée par celles-ci.

### Puis-je conserver l’index de mon validateur ? {#keep-validator-index}

Oui. La conversion conserve le même index de validateur. Si vous consolidez plusieurs validateurs, vous ne pourrez conserver que l’index du _validateur cible_.

### Vais-je manquer des attestations ? {#miss-attestations}

Lors d’une consolidation vers un autre validateur, le validateur source est sorti, et il y a une période d’attente d’environ 27 heures avant que le solde ne soit actif sur le validateur cible. Cette période **n’affecte pas les indicateurs de performance**.

### Vais-je subir des pénalités ? {#incur-penalties}

Non. Tant que votre validateur est en ligne, vous ne subirez pas de pénalités.

### Les adresses de retrait des validateurs à consolider doivent-elles correspondre ? {#withdrawal-addresses-match}

Non. Mais le _validateur source_ doit autoriser la demande depuis sa propre adresse.

### Mes récompenses seront-elles capitalisées après la conversion ? {#rewards-compound}

Oui. Avec des identifiants **Type 2**, les récompenses au-delà de 32 ETH sont automatiquement réinvesties — mais pas instantanément. En raison d’une petite marge (appelée [_hystérésis_](https://eth2book.info/capella/part2/incentives/balances/#hysteresis)), votre solde doit atteindre **environ 1,25 ETH de plus** avant que l’excédent ne soit réinvesti. Ainsi, au lieu d’être capitalisées à 33,0 ETH, les récompenses le sont à 33,25 ETH (solde effectif = 33 ETH), puis à 34,25 ETH (solde effectif = 34 ETH), et ainsi de suite.

### Puis-je encore bénéficier des retraits automatiques après la conversion ? {#automatic-sweep}

Les retraits automatiques n’auront lieu que pour les soldes excédentaires dépassant 2048 ETH. Pour tous les autres retraits partiels, vous devrez les déclencher manuellement.

### Puis-je changer d’avis et repasser de Type 2 à Type 1 ? {#go-back-to-type1}

Non. La conversion en **Type 2** est irréversible.

### Si je veux consolider plusieurs validateurs, dois-je d’abord convertir chacun d’eux en Type 2 ? {#consolidate-multiple-validators}

Non ! Convertissez un validateur en Type 2, puis utilisez-le comme validateur cible. Tous les autres validateurs consolidés dans ce validateur cible de Type 2 peuvent être de Type 1 ou de Type 2

### Mon validateur est hors ligne ou possède moins de 32 ETH - puis-je quand même le convertir ? {#offline-or-below-32eth}

Oui. Tant qu’il est actif (non sorti) et que vous pouvez signer avec son adresse de retrait, vous pouvez le convertir.

## Ressources {#resources}

- [Spécifications du consensus Electra](https://github.com/ethereum/consensus-specs/blob/dev/specs/electra/beacon-chain.md) : Il s’agit de la version la plus fiable sur laquelle vous devriez vous appuyer. En cas de doute, lisez les spécifications
- Tout le monde n’est pas à l’aise avec la lecture du code, donc [ce maxEB-GPT](https://chatgpt.com/g/g-67f1650fb48081918f555e0c8d1c2ae9-maxeb-gpt) peut aider à interpréter les spécifications. _Avertissement : ce sont les spécifications, et non l’IA, qui doivent être considérées comme source de vérité, car l’IA peut mal interpréter certaines informations ou produire des réponses erronées_
- [pectrified.com](https://pectrified.com/) : Permet de consulter l’état des consolidations, des dépôts et des temps d’attente dans les files d’attente
- [Ethereal](https://github.com/wealdtech/ethereal) : Outil en ligne de commande créé par la communauté pour gérer les tâches courantes des validateurs
- [batch-validator-depositor](https://github.com/attestantio/batch-validator-depositor) : Contrat créé par la communauté permettant de déposer plusieurs validateurs Ethereum en une seule transaction
