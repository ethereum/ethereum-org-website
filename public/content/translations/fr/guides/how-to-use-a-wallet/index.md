---
title: Comment utiliser un portefeuille
metaTitle: Comment utiliser les portefeuilles Ethereum | Étape par étape
description: Un guide expliquant comment envoyer et recevoir des jetons, et se connecter à des projets Web3.
lang: fr
---

Apprenez à utiliser toutes les fonctions de base d'un portefeuille. Si vous n'en avez pas encore, consultez notre guide [Comment créer un compte Ethereum](/guides/how-to-create-an-ethereum-account/).

## Ouvrir votre portefeuille {#open-your-wallet}

Vous devriez voir un tableau de bord qui affichera probablement votre solde et contiendra des boutons pour envoyer et recevoir des jetons.

## Recevoir de la cryptomonnaie {#receive-cryptocurrency}

Voulez-vous recevoir de la crypto sur votre portefeuille ?

Chaque compte Ethereum possède sa propre adresse de réception, qui est une séquence unique de chiffres et de lettres. L'adresse fonctionne comme un numéro de compte bancaire. Les adresses Ethereum commenceront toujours par « 0x ». Vous pouvez partager cette adresse avec n'importe qui : c'est sans danger.

Votre adresse est comme votre adresse postale : vous devez la communiquer aux gens pour qu'ils puissent vous trouver. C'est sans danger, car vous pouvez toujours verrouiller votre porte d'entrée avec une autre clé que vous seul contrôlez, de sorte que personne ne puisse entrer, même s'ils savent où vous habitez.

Vous devez fournir votre adresse publique à quiconque souhaite vous envoyer de l'argent. De nombreuses applications de portefeuille vous permettent de copier votre adresse ou d'afficher un code QR à scanner pour faciliter son utilisation. Évitez de saisir manuellement une adresse Ethereum. Cela peut facilement entraîner des erreurs de saisie et la perte de fonds.

Les différentes applications peuvent varier ou utiliser un vocabulaire différent, mais elles devraient vous guider à travers un processus similaire si vous essayez de transférer des fonds.

1. Ouvrez votre application de portefeuille.
2. Cliquez sur « Recevoir » (ou une option formulée de manière similaire).
3. Copiez votre adresse Ethereum dans le presse-papiers.
4. Fournissez à l'expéditeur votre adresse de réception Ethereum.

## Envoyer de la cryptomonnaie {#send-cryptocurrency}

Souhaitez-vous envoyer des ETH vers un autre portefeuille ?

1. Ouvrez votre application de portefeuille.
2. Obtenez l'adresse de réception et assurez-vous d'être connecté au même réseau que le destinataire.
3. Saisissez l'adresse de réception ou scannez un code QR avec votre appareil photo pour ne pas avoir à écrire l'adresse manuellement.
4. Cliquez sur un bouton « Envoyer » dans votre portefeuille (ou une alternative formulée de manière similaire).

![Send field for crypto address](./send.png)
<br/>

5. De nombreux actifs, comme le DAI ou l'USDC, existent sur plusieurs réseaux. Lors du transfert de jetons crypto, assurez-vous que le destinataire utilise le même réseau que vous, car ceux-ci ne sont pas interchangeables.
6. Assurez-vous que votre portefeuille dispose de suffisamment d'ETH pour couvrir les frais de transaction, qui varient en fonction des conditions du réseau. La plupart des portefeuilles ajouteront automatiquement les frais suggérés à la transaction que vous pourrez ensuite confirmer.
7. Une fois votre transaction traitée, le montant en crypto correspondant apparaîtra sur le compte du destinataire. Cela peut prendre de quelques secondes à quelques minutes selon l'utilisation actuelle du réseau.

## Se connecter à des projets {#connecting-to-projects}

Votre adresse sera la même dans tous les projets Ethereum. Vous n'avez pas besoin de vous inscrire individuellement sur chaque projet. Une fois que vous avez un portefeuille, vous pouvez vous connecter à n'importe quel projet Ethereum sans aucune information supplémentaire. Aucun e-mail ni aucune autre information personnelle ne sont nécessaires.

1. Visitez le site Web de n'importe quel projet.
2. Si la page d'accueil du projet n'est qu'une description statique du projet, vous devriez pouvoir cliquer sur un bouton « Ouvrir l'application » dans le menu qui vous dirigera vers l'application Web proprement dite.
3. Une fois dans l'application, cliquez sur « Se connecter ».

![Button allowing user to connect to the website with a wallet](./connect1.png)

4. Sélectionnez votre portefeuille dans la liste d'options fournie. Si vous ne voyez pas votre portefeuille, il se peut qu'il soit caché sous l'option « WalletConnect ».

![Selecting from a list of wallets to connect with](./connect2.png)

5. Confirmez la demande de signature dans votre portefeuille pour établir la connexion. **Signer ce message ne devrait nécessiter aucune dépense en ETH**.
6. C'est tout ! Commencez à utiliser l'application. Vous pouvez trouver des projets intéressants sur notre [page des dapps](/apps/#explore).
   <br />

<Alert variant="update">
<AlertEmoji text=":eyes:"/>
<AlertContent className="justify-between flex-row items-center">
  <div>Envie d'en savoir plus ?</div>
  <ButtonLink href="/guides/">
    Voir nos autres guides
  </ButtonLink>
</AlertContent>
</Alert>

## Foire aux questions {#frequently-asked-questions}

### Si je possède une adresse ETH, est-ce que je possède la même adresse sur d'autres chaînes de blocs ? {#if-i-own-an-eth-address-do-i-own-the-same-address-on-other-blockchains}

Vous pouvez utiliser la même adresse sur toutes les chaînes de blocs compatibles EVM (si vous avez le type de portefeuille avec une phrase de récupération). Cette [liste](https://chainlist.org/) vous montrera quelles chaînes de blocs vous pouvez utiliser avec la même adresse. Certaines chaînes de blocs, comme Bitcoin, mettent en œuvre un ensemble de règles de réseau complètement distinct et vous aurez besoin d'une adresse différente avec un format différent. Si vous avez un portefeuille de contrat intelligent, vous devriez consulter le site Web de son produit pour plus d'informations sur les chaînes de blocs prises en charge.

### Puis-je utiliser la même adresse sur plusieurs appareils ? {#can-i-use-the-same-address-on-multiple-devices}

Oui, vous pouvez utiliser la même adresse sur plusieurs appareils. Les portefeuilles ne sont techniquement qu'une interface pour vous montrer votre solde et effectuer des transactions, votre compte n'est pas stocké à l'intérieur du portefeuille, mais sur la chaîne de blocs.

### Je n'ai pas reçu la crypto, où puis-je vérifier le statut d'une transaction ? {#i-have-not-received-the-crypto-where-can-i-check-the-status-of-a-transaction}

Vous pouvez utiliser des [explorateurs de blocs](/developers/docs/data-and-analytics/block-explorers/) pour voir le statut de n'importe quelle transaction en temps réel. Il vous suffit de rechercher l'adresse de votre portefeuille ou l'ID de la transaction.

### Puis-je annuler ou retourner des transactions ? {#can-i-cancel-or-return-transactions}

Non, une fois qu'une transaction est confirmée, vous ne pouvez pas l'annuler.
