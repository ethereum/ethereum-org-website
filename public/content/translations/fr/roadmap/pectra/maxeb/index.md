---
title: MaxEB
metaTitle: Pectra MaxEB
description: En savoir plus sur MaxEB dans la mise à jour Pectra
lang: fr
authors: ["Nixo"]
---

*En bref :* Le hard fork Pectra permet aux validateurs Ethereum d'opter pour un solde effectif maximum plus élevé et une composition des intérêts en convertissant leurs identifiants de retrait de **Type 1** en **Type 2**. L'outil officiel pour ce faire est le Launchpad. Cette opération est irréversible.

## Vue d'ensemble {#overview}

### Qui est concerné ? {#who-is-affected}

Quiconque gère un validateur - il s'agit probablement de quelqu'un qui connaît l'indice (par ex., [Validateur #12345](https://beaconcha.in/validator/12345)) d'un validateur qu'il contrôle. Si vous utilisez un protocole pour gérer un validateur (par ex., Lido CSM ou Rocket Pool), vous devrez vérifier auprès d'eux s'ils prennent en charge maxEB et à partir de quand.

Si vous stakez en utilisant un jeton de staking liquide (LST) (par ex., rETH ou stETH), aucune action n'est requise ni recommandée.

### Qu'est-ce que « maxEB » ? {#what-is-maxeb}

maxEB = le solde effectif maximum (MAXimum Effective Balance) d'un validateur. Jusqu'au hard fork Pectra, chaque validateur génère des rendements sur un maximum de 32 ETH. Après Pectra, les validateurs ont la possibilité de générer des rendements sur n'importe quel solde compris entre 32 et 2048 ETH, par tranches de 1 ETH, en optant pour ce changement.

### Comment un validateur peut-il y souscrire ? {#how-does-a-validator-opt-in}

Un validateur opte pour le changement maxEB en convertissant ses identifiants de retrait de **Type 1** en **Type 2**. Cela peut être fait sur le [Launchpad (Actions du validateur)](https://launchpad.ethereum.org/validator-actions) une fois le hard fork Pectra déployé. Tout comme pour le passage du **Type 0** au **Type 1**, la conversion du **Type 1** au **Type 2** est un processus irréversible.

### Qu'est-ce qu'un identifiant de retrait ? {#whats-a-withdrawal-credential}

Lorsque vous gérez un validateur, vous disposez d'un ensemble d'identifiants de retrait. Ceux-ci se trouvent dans votre fichier json de données de dépôt, ou vous pouvez les consulter sur l'onglet de dépôt ([deposit tab](https://beaconcha.in/validator/12345#deposits)) de votre validateur sur beaconcha.in.

1. Identifiants de retrait de **Type 0** : Si les identifiants de retrait de votre validateur commencent par `0x00...`, vous avez effectué votre dépôt avant le hard fork Shapella et vous n'avez pas encore configuré d'adresse de retrait.

![Type 0 withdrawal credential](./0x00-wd.png)

2. Identifiants de retrait de **Type 1** : Si les identifiants de retrait de votre validateur commencent par `0x01...`, vous avez effectué votre dépôt après le hard fork Shapella ou vous avez déjà converti vos identifiants de **Type 0** en identifiants de **Type 1**.

 ![Type 1 withdrawal credential](./0x01-wd.png)

3. Identifiants de retrait de **Type 2** : Ce nouveau type d'identifiant de retrait commencera par `0x02...` et sera activé après Pectra. Les validateurs disposant d'identifiants de retrait de **Type 2** sont parfois appelés « **validateurs à composition** » (compounding validators).

| **Autorisé** | **Non autorisé** |
| --- | --- |
| ✅ Type 0 → Type 1 | ❌ Type 0 → Type 2 |
| ✅ Type 1 → Type 2 | ❌ Type 1 → Type 0 |
|  | ❌ Type 2 → Type 1 |
|  | ❌ Type 2 → Type 0 |

### Risques {#risks}

MaxEB permet à un validateur d'envoyer l'intégralité de son solde à un autre validateur. Les utilisateurs soumettant une demande de consolidation doivent vérifier la source et le contenu de la transaction qu'ils signent. L'outil officiel pour profiter des fonctionnalités de maxEB est le Launchpad. Si vous décidez d'utiliser un outil tiers, vous devez vérifier que :

- La clé publique et l'adresse de retrait du validateur source correspondent au validateur qu'ils contrôlent
- La clé publique du validateur cible est correcte et leur appartient
- La demande est une conversion, et non une consolidation, s'ils n'ont pas l'intention d'envoyer des fonds à un autre validateur
- La transaction est signée par la bonne adresse de retrait

Nous **recommandons fortement** de discuter de tout outil tiers que vous prévoyez d'utiliser avec la [communauté EthStaker](https://ethstaker.org/about). C'est un endroit utile pour vérifier la pertinence de votre approche et éviter les erreurs. Si vous utilisez un outil malveillant ou mal configuré, **l'intégralité du solde de votre validateur pourrait être envoyée à un validateur que vous ne contrôlez pas** — sans aucun moyen de le récupérer.

## Détails techniques {#technical-details}

### Le processus {#the-flow}

Il y aura deux utilisations de l'opération `ConsolidationRequest` :

1. Convertir un validateur existant de **Type 1** en un validateur de **Type 2**
2. Consolider d'autres validateurs vers un validateur de **Type 2** existant

Lors de la conversion d'un validateur de **Type 1** en **Type 2**, la *source* et la *cible* seront toutes deux le validateur que vous convertissez. L'opération coûtera du gaz et sera placée en file d'attente derrière d'autres demandes de consolidation. Cette file d'attente est **distincte** de la file d'attente des dépôts, n'est pas affectée par les nouveaux dépôts de validateurs et peut être consultée sur [pectrified.com](https://pectrified.com/).

Pour consolider des validateurs, vous devez avoir un *validateur cible* qui possède un identifiant de retrait de **Type 2**. Il s'agit de la destination de tous les soldes de validateurs en cours de consolidation, et l'indice qui sera conservé.

### Prérequis pour la conversion vers le Type 2 {#requirements-for-converting-to-type-2}

Cela sera requis pour le premier validateur que vous convertissez en **Type 2**. L'indice de ce validateur est conservé et actif. Pour une conversion, le *validateur source* == le *validateur cible*.

Le validateur doit...

- être actif
- avoir des identifiants de retrait de **Type 1**
- ne pas être dans un état de sortie (ou avoir subi une réduction)
- ne pas avoir de retraits déclenchés manuellement en attente (ne s'applique pas aux balayages automatiques)

![conversion illustration](./conversion.png)

### Prérequis pour la consolidation {#requirements-for-consolidating}

Il s'agit de la *même opération* que la conversion, mais lorsque le *validateur source* est différent du *validateur cible*. L'indice du validateur cible est conservé et accepte le solde du validateur source. L'indice du validateur source est placé dans un état `EXITED`.

Dans ce cas, le validateur source a les mêmes prérequis que ci-dessus, plus :

- avoir été actif pendant au moins ~27,3 heures (une `SHARD_COMMITTEE_PERIOD`)

Le validateur cible doit

- avoir des identifiants de retrait de **Type 2**
- ne pas être dans un état de sortie.

![consolidation illustration](./consolidation.png)

### La demande de consolidation {#the-consolidation-request}

La demande de consolidation sera signée par l'adresse de retrait associée au validateur source et contiendra :

1. L'adresse du validateur source (par ex., `0x15F4B914A0cCd14333D850ff311d6DafbFbAa32b`)
2. La clé publique du validateur source (par ex., `0xa1d1ad0714035353258038e964ae9675dc0252ee22cea896825c01458e1807bfad2f9969338798548d9858a571f7425c`)
3. La clé publique de ce validateur cible

Lors d'une conversion, 2 et 3 seront identiques. Cette opération peut être effectuée sur [le Launchpad](https://launchpad.ethereum.org/).

### Prérequis de signature {#signing-requirements}

Pour soumettre une `ConsolidationRequest`, l'**adresse de retrait du validateur source** doit signer la demande. Cela prouve le contrôle sur les fonds du validateur.

### Qu'est-ce qui est signé ? {#what-is-signed}

Une racine de signature ([signing root](https://github.com/ethereum/consensus-specs/blob/master/specs/phase0/beacon-chain.md#compute_signing_root)) séparée par domaine de l'objet `ConsolidationRequest` est utilisée.

- **Domaine :** `DOMAIN_CONSOLIDATION_REQUEST`
- **Champs de la racine de signature :**
  - `source_pubkey` : `BLSPubkey`
  - `target_pubkey` : `BLSPubkey`
  - `source_address` : `ExecutionAddress`

La **signature BLS** résultante est soumise avec la demande.

Remarque : La signature est effectuée par l'adresse de retrait, et non par la clé du validateur.

### Retraits partiels {#partial-withdrawals}

Les validateurs avec des identifiants de **Type 1** bénéficient de balayages automatiques et sans frais de gaz de leur solde excédentaire (tout ce qui dépasse 32 ETH) vers leur adresse de retrait. Étant donné que le **Type 2** permet à un validateur de composer les soldes par tranches de 1 ETH, il ne balayera pas automatiquement les soldes avant d'atteindre 2048 ETH. Les retraits partiels sur les validateurs de **Type 2** doivent être déclenchés manuellement et coûteront du gaz.

## Outils de consolidation {#consolidation-tooling}

Plusieurs outils sont disponibles pour gérer les consolidations. L'outil officiel, créé par la Fondation Ethereum, est le [Launchpad](https://launchpad.ethereum.org/en/validator-actions). Il existe également des outils tiers créés par des entités de la communauté du staking qui peuvent offrir des fonctionnalités non fournies par le Launchpad. Bien que les outils présentés ici ne soient ni audités ni approuvés par la Fondation Ethereum, les suivants sont des outils open source développés par des membres connus de la communauté.

| Outil | Site web | Open source | Créateur | Audité | Interface | Fonctionnalités notables |
| --- | --- | --- | --- | --- | --- | --- |
| Pectra Staking Manager | pectrastaking.com | Oui, Apache 2.0 | [Pier Two](https://piertwo.com/) | Non | Interface web | WalletConnect, fonctionne avec SAFE |
| Pectra Validator Ops CLI Tool | [GitHub](https://github.com/Luganodes/Pectra-Batch-Contract) | Oui, MIT | [Luganodes](https://www.luganodes.com/) | Oui, Quantstamp [Mai 2025](https://certificate.quantstamp.com/full/luganodes-pectra-batch-contract/23f0765f-969a-4798-9edd-188d276c4a2b/index.html) | Ligne de commande | Traitement par lots, pour de nombreux validateurs à la fois |
| Ethereal | [GitHub](https://github.com/wealdtech/ethereal) | Oui, Apache 2.0 | [Jim McDonald](https://www.attestant.io/team/) | Non | Ligne de commande | Ensemble complet de fonctionnalités pour la gestion des validateurs et des nœuds |
| Siren | [GitHub](https://github.com/sigp/siren) | Oui, Apache 2.0 | [Sigma Prime](https://sigmaprime.io/) | Non | Un peu de ligne de commande, mais principalement interface web | Fonctionne uniquement si vous utilisez le client de consensus Lighthouse |
| Consolideth.app | https://consolideth.app/ [GitHub](https://github.com/Stakely/consolideth) | Oui, licences MIT | [Stakely](https://stakely.io/) | Non | Interface web, hébergée par stakely et prête à être auto-hébergée librement | Prend en charge les principales connexions de portefeuilles, y compris safe avec WalletConnect |

## FAQ {#faq}

### Le fait d'y souscrire modifie-t-il ma chance de proposition ou mes récompenses ? {#change-luck-or-rewards}

Non. Le fait d'y souscrire ne diminue pas vos chances de proposition - vos tâches et la sélection des propositions restent les mêmes. Par exemple, si vous avez deux validateurs de 32 ETH contre un validateur de 64 ETH, vous aurez au total les mêmes chances d'être sélectionné pour proposer un bloc et gagner des récompenses.

### Le fait d'y souscrire modifie-t-il mon risque de réduction ? {#change-slashing-risk}

Pour les opérateurs plus petits ou non professionnels, la réponse courte est non. La réponse plus longue est que, pour les opérateurs professionnels gérant de nombreux validateurs par nœud avec des alertes rapides, la consolidation en un nombre réduit de validateurs peut réduire leur capacité à réagir à une réduction et à prévenir les événements en cascade. La *pénalité* de réduction initiale pour tous les validateurs a été considérablement diminuée, passant de 1 ETH (par 32 ETH) à 0,0078125 ETH (par 32 ETH) pour compenser ce risque.

### Dois-je sortir mon validateur pour le convertir ? {#exit-validator}

Non. Vous pouvez le convertir sur place sans effectuer de sortie.

### Combien de temps faudra-t-il pour convertir / consolider ? {#how-long}

Un minimum de 27,3 heures, mais les consolidations sont également soumises à une file d'attente. Cette file d'attente est indépendante des files d'attente de dépôt et de retrait et n'est pas affectée par celles-ci.

### Puis-je conserver l'indice de mon validateur ? {#keep-validator-index}

Oui. La conversion sur place conserve le même indice de validateur. Si vous consolidez plusieurs validateurs, vous ne pourrez conserver que l'indice du *validateur cible*.

### Vais-je manquer des attestations ? {#miss-attestations}

Lors d'une consolidation vers un autre validateur, le validateur source est sorti et il y a une période d'attente d'environ 27 heures avant que le solde ne soit actif sur le validateur cible. Cette période **n'affecte pas les mesures de performance**.

### Vais-je subir des pénalités ? {#incur-penalties}

Non. Tant que votre validateur est en ligne, vous ne subirez aucune pénalité.

### Les adresses de retrait des validateurs en cours de consolidation doivent-elles correspondre ? {#withdrawal-addresses-match}

Non. Mais la *source* doit autoriser la demande depuis sa propre adresse.

### Mes récompenses seront-elles composées après la conversion ? {#rewards-compound}

Oui. Avec des identifiants de **Type 2**, les récompenses supérieures à 32 ETH sont automatiquement restakées — mais pas instantanément. En raison d'un petit tampon (appelé [*hystérésis*](https://eth2book.info/capella/part2/incentives/balances/#hysteresis)), votre solde doit atteindre **environ 1,25 ETH de plus** avant que l'excédent ne soit restaké. Ainsi, au lieu de se composer à 33,0 ETH, cela se produit à 33,25 (solde effectif = 33 ETH), puis à 34,25 (solde effectif = 34 ETH), et ainsi de suite.

### Puis-je toujours bénéficier de balayages automatiques après la conversion ? {#automatic-sweep}

Les balayages automatiques ne se produiront qu'avec des soldes excédentaires supérieurs à 2048. Pour tous les autres retraits partiels, vous devrez les déclencher manuellement.

### Puis-je changer d'avis et repasser du Type 2 au Type 1 ? {#go-back-to-type1}

Non. La conversion vers le **Type 2** est irréversible.

### Si je veux consolider plusieurs validateurs, dois-je d'abord convertir chacun d'eux en Type 2 ? {#consolidate-multiple-validators}

Non ! Convertissez un validateur en Type 2, puis utilisez-le comme cible. Tous les autres validateurs consolidés vers cette cible de Type 2 peuvent être de Type 1 ou de Type 2.

### Mon validateur est hors ligne ou en dessous de 32 ETH - puis-je quand même le convertir ? {#offline-or-below-32eth}

Oui. Tant qu'il est actif (non sorti) et que vous pouvez signer avec son adresse de retrait, vous pouvez le convertir.

## Ressources {#resources}

- [Spécifications de consensus Electra](https://github.com/ethereum/consensus-specs/blob/master/specs/electra/beacon-chain.md) : C'est la version la plus « vraie » sur laquelle vous devriez vous appuyer. En cas de doute, lisez les spécifications.
- Tout le monde n'est pas à l'aise pour parcourir du code, donc [ce maxEB-GPT](https://chatgpt.com/g/g-67f1650fb48081918f555e0c8d1c2ae9-maxeb-gpt) peut aider à interpréter les spécifications. *Avertissement : Ce sont les spécifications, et non l'IA, qui doivent être considérées comme la vérité, car l'IA peut mal interpréter les informations ou halluciner des réponses.*
- [pectrified.com](https://pectrified.com/) : Consultez l'état des consolidations, des dépôts et des temps d'attente dans la file.
- [Ethereal](https://github.com/wealdtech/ethereal) : Outil en ligne de commande (CLI) créé par la communauté pour gérer les tâches courantes des validateurs.
- [batch-validator-depositor](https://github.com/attestantio/batch-validator-depositor) : Contrat créé par la communauté qui permet de déposer pour plusieurs validateurs Ethereum en une seule transaction.