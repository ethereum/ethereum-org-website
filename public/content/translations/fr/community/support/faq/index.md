---
title: Foire aux questions
description: Questions courantes sur Ethereum concernant les portefeuilles, les transactions, le staking, et plus encore.
lang: fr
---

## J'ai envoyé de la crypto à la mauvaise adresse {#wrong-wallet}

Une transaction envoyée sur Ethereum est irréversible. Malheureusement, si vous avez envoyé des ETH ou des jetons au mauvais portefeuille, il n'y a aucun moyen d'annuler la transaction.

**Ce que vous pouvez faire :**

- **Si vous connaissez le propriétaire de l'adresse**, contactez-le directement et demandez-lui de vous renvoyer les fonds
- **Si l'adresse appartient à une plateforme d'échange ou à un service connu**, contactez leur équipe d'assistance, car ils pourraient être en mesure de vous aider
- **Si vous avez envoyé des jetons à une adresse de contrat**, vérifiez si le contrat dispose d'une fonction de retrait ou de récupération (ce qui est rare)

Dans la plupart des cas, il n'y a aucun moyen de récupérer les fonds. Aucune organisation centrale, entité ou personne ne possède Ethereum, ce qui signifie que personne ne peut annuler les transactions. Vérifiez toujours l'adresse du destinataire avant de confirmer.

## J'ai perdu l'accès à mon portefeuille {#lost-wallet-access}

Vos options de récupération dépendent du type de portefeuille que vous utilisez.

### Si vous avez votre phrase secrète (phrase de récupération) {#if-you-have-your-seed-phrase-recovery-phrase}

Vous pouvez restaurer votre portefeuille dans n'importe quelle application de portefeuille compatible en utilisant votre phrase secrète. C'est pourquoi il est essentiel de conserver votre phrase secrète en toute sécurité hors ligne. Consultez la documentation de votre fournisseur de portefeuille pour obtenir les instructions de restauration.

### Si vous avez perdu votre phrase secrète {#if-you-have-lost-your-seed-phrase}

Sans votre phrase secrète ou vos clés privées, vos fonds ne peuvent pas être récupérés. Personne, y compris ethereum.org, ne peut réinitialiser votre mot de passe ou restaurer l'accès à un portefeuille en auto-garde.

### Si votre compte est sur une plateforme d'échange {#if-your-account-is-on-an-exchange}

Si votre compte se trouve sur une plateforme d'échange centralisée comme Coinbase, Binance ou Kraken, contactez directement l'équipe d'assistance de la plateforme. Ils contrôlent les comptes sur leur plateforme et pourraient être en mesure de vous aider à réinitialiser votre mot de passe ou à récupérer votre compte.

<Alert variant="warning">
<AlertEmoji text=":shield:"/>
<AlertContent>
<AlertDescription>

**Ne partagez jamais votre phrase secrète avec quiconque** prétendant vous aider à récupérer votre portefeuille. C'est l'une des tactiques d'escroquerie les plus courantes. Aucun service légitime ne vous demandera jamais votre phrase secrète.

</AlertDescription>
</AlertContent>
</Alert>

<DocLink href="/guides/how-to-use-a-wallet/">
  Comment utiliser un portefeuille
</DocLink>

## Ma transaction est bloquée ou en attente {#stuck-transaction}

Les transactions sur Ethereum peuvent rester bloquées lorsque les frais de gaz que vous avez définis étaient inférieurs à ce que le réseau exige actuellement. La plupart des portefeuilles vous permettent de résoudre ce problème :

- **Accélérer :** Soumettez à nouveau la même transaction avec des frais de gaz plus élevés
- **Annuler :** Envoyez une transaction de 0 ETH à votre propre adresse en utilisant le même nonce que la transaction en attente

### Guides utiles {#helpful-guides}

- [Comment accélérer ou annuler une transaction en attente sur MetaMask](https://support.metamask.io/transactions-and-gas/transactions/how-to-speed-up-or-cancel-a-pending-transaction/)
- [Comment annuler des transactions Ethereum en attente](https://info.etherscan.com/how-to-cancel-ethereum-pending-transactions/)

## Comment puis-je réclamer ma distribution gratuite d'Ethereum ? {#giveaway-scam}

Les distributions gratuites (giveaways) d'Ethereum sont des escroqueries conçues pour voler vos ETH. Ne vous laissez pas tenter par des offres qui semblent trop belles pour être vraies. Si vous envoyez des ETH à une adresse de distribution gratuite, vous ne recevrez aucune distribution gratuite et vous ne pourrez pas récupérer vos fonds.

[En savoir plus sur la prévention des escroqueries](/security/#common-scams)

## Comment staker des ETH ? {#how-to-stake}

Pour devenir un validateur, vous devez staker 32 ETH dans le contrat de dépôt Ethereum et configurer un nœud de validateur. Vous pouvez également participer avec moins d'ETH grâce aux pools de staking.

Plus d'informations sont disponibles sur nos [pages dédiées au staking](/staking/) et sur [la plateforme de lancement du staking](https://launchpad.ethereum.org/).

## Comment miner de l'Ethereum ? {#mining-ethereum}

Le minage d'Ethereum n'est plus possible. Le minage a été désactivé lorsqu'Ethereum est passé de la [preuve de travail (PoW)](/glossary/#pow) à la [preuve d'enjeu (PoS)](/glossary/#pos) lors de [La Fusion](/roadmap/merge/) en septembre 2022. Désormais, au lieu de mineurs, Ethereum a des validateurs. N'importe qui peut [staker](/glossary/#staking) des ETH et recevoir des récompenses de staking pour l'exécution d'un logiciel de validateur afin de sécuriser le réseau.