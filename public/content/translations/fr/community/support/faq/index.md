---
title: Questions fréquemment posées
description: Questions fréquentes sur Ethereum concernant les portefeuilles, les transactions, la mise en jeu et plus encore.
lang: fr
---

# Foire aux questions {#faq}

## J'ai envoyé de la crypto à la mauvaise adresse {#wrong-wallet}

Les transactions effectuées sur Ethereum sont irréversibles. Malheureusement, si vous avez envoyé des ETH ou des jetons au mauvais portefeuille, il n'y a aucun moyen d'annuler la transaction.

**Ce que vous pouvez faire :**

- **Si vous connaissez le propriétaire de l'adresse**, contactez-le directement et demandez-lui de vous retourner les fonds
- **Si l'adresse appartient à un échange ou à un service connu**, contactez leur équipe d'assistance, car ils pourraient être en mesure de vous aider
- **Si vous avez envoyé des jetons à une adresse de contrat**, vérifiez si le contrat dispose d'une fonction de retrait ou de récupération (ce qui est rare)

Dans la plupart des cas, il n'y a aucun moyen de récupérer les fonds. Aucune organisation centrale, entité ou personne n'est propriétaire d'Ethereum, ce qui signifie que personne ne peut annuler les transactions. Vérifiez toujours deux fois l'adresse du destinataire avant de confirmer.

## J'ai perdu l'accès à mon portefeuille {#lost-wallet-access}

Vos options de récupération dépendent du type de portefeuille que vous utilisez.

### Si vous avez votre phrase de récupération

Vous pouvez restaurer votre portefeuille dans n'importe quelle application de portefeuille compatible à l'aide de votre phrase de récupération. C'est pourquoi il est essentiel de conserver votre phrase de récupération en toute sécurité hors ligne. Consultez la documentation de votre fournisseur de portefeuille pour obtenir les instructions de restauration.

### Si vous avez perdu votre phrase de récupération

Sans votre phrase de récupération ou vos clés privées, vos fonds ne peuvent pas être récupérés. Personne, y compris ethereum.org, ne peut réinitialiser votre mot de passe ou restaurer l'accès à un portefeuille non-dépositaire.

### Si votre compte se trouve sur un échange

Si votre compte se trouve sur un échange centralisé comme Coinbase, Binance ou Kraken, contactez directement l'équipe d'assistance de l'échange. Ils contrôlent les comptes sur leur plateforme et peuvent être en mesure de vous aider à réinitialiser votre mot de passe ou à récupérer votre compte.

<Alert variant="warning">
<AlertEmoji text=":shield:"/>
<AlertContent>
<AlertDescription>

**Ne partagez jamais votre phrase de récupération avec quiconque** prétendant vous aider à récupérer votre portefeuille. C'est l'une des tactiques d'escroquerie les plus courantes. Aucun service légitime ne vous demandera jamais votre phrase de récupération.

</AlertDescription>
</AlertContent>
</Alert>

<DocLink href="/guides/how-to-use-a-wallet/">
  Comment utiliser un portefeuille
</DocLink>

## Ma transaction est bloquée ou en attente {#stuck-transaction}

Les transactions sur Ethereum peuvent être bloquées lorsque les frais de gaz que vous avez définis sont inférieurs à ce que le réseau exige actuellement. La plupart des portefeuilles vous permettent de résoudre ce problème :

- **Accélérer :** Soumettre à nouveau la même transaction avec des frais de gaz plus élevés
- **Annuler :** Envoyer une transaction de 0 ETH à votre propre adresse en utilisant le même nonce que la transaction en attente

### Guides utiles

- [Comment accélérer ou annuler une transaction en attente sur MetaMask](https://support.metamask.io/transactions-and-gas/transactions/how-to-speed-up-or-cancel-a-pending-transaction/)
- [Comment annuler les transactions Ethereum en attente](https://info.etherscan.com/how-to-cancel-ethereum-pending-transactions/)

## Comment puis-je réclamer mon cadeau Ethereum ? {#giveaway-scam}

Les concours Ethereum sont des arnaques conçues pour récupérer vos ETH. Ne vous laissez pas tenter par des offres qui semblent trop belles pour être vraies. Si vous envoyez des ETH à une adresse de concours, vous ne recevrez pas de cadeau et vous ne pourrez pas récupérer vos fonds.

[En savoir plus sur la prévention des arnaques](/security/#common-scams)

## Comment puis-je mettre en jeu des ETH ? {#how-to-stake}

Pour devenir un validateur, vous devez miser 32 ETH dans le contrat de dépôt Ethereum et mettre en place un nœud de validateur. Vous pouvez également participer avec moins d'ETH via des pools de staking.

Plus d'informations sont disponibles sur nos [pages de staking](/staking/) et sur [la plateforme de lancement du staking](https://launchpad.ethereum.org/).

## Comment miner de l'Ethereum ? {#mining-ethereum}

Le minage d'Ethereum n'est plus possible. Le minage a été désactivé lorsque Ethereum est passé de la [preuve de travail](/glossary/#pow) à la [preuve d'enjeu](/glossary/#pos) lors de [La Fusion](/roadmap/merge/) en septembre 2022. Désormais, en place des mineurs, Ethereum dispose de validateurs. Tout le monde peut [mettre en jeu](/glossary/#staking) des ETH et recevoir des récompenses de mise en jeu en exécutant un logiciel de validateur pour sécuriser le réseau.
