---
title: Comment transférer des jetons vers une couche 2 via un pont
description: Un guide expliquant comment transférer des jetons d'Ethereum vers une couche 2 à l'aide d'un pont.
lang: fr
---

S'il y a beaucoup de trafic sur Ethereum, cela peut devenir coûteux. Une solution à ce problème consiste à créer de nouvelles « couches » : c'est-à-dire différents réseaux qui fonctionnent de manière similaire à Ethereum lui-même. Ces fameuses couches 2 (l2) aident à réduire la congestion et les coûts sur Ethereum en traitant beaucoup plus de transactions à des frais moindres, et en ne stockant le résultat de celles-ci sur Ethereum que de temps en temps. Ainsi, ces couches 2 nous permettent d'effectuer des transactions avec une vitesse accrue et des coûts réduits. De nombreux projets crypto populaires migrent vers les couches 2 en raison de ces avantages. Le moyen le plus simple de transférer des jetons d'Ethereum vers une couche 2 est d'utiliser un pont.

**Prérequis :** 

- avoir un portefeuille crypto — si vous n'en avez pas, suivez ce guide pour [créer un compte Ethereum](/guides/how-to-create-an-ethereum-account/)
- ajouter des fonds à votre portefeuille

## 1. Déterminer quel réseau de couche 2 vous souhaitez utiliser {#1-determine-which-layer-2-network-you-want-to-use}

Vous pouvez en apprendre davantage sur les différents projets et trouver des liens importants sur notre [page sur les couches 2](/layer-2/).

## 2. Aller sur le pont sélectionné {#2-go-to-the-selected-bridge}

Quelques couches 2 populaires :

- [Pont Arbitrum](https://portal.arbitrum.io/bridge?l2ChainId=42161)
- [Pont Optimism](https://app.optimism.io/bridge/deposit)
- [Pont du réseau Boba](https://hub.boba.network/)

## 3. Se connecter au pont avec votre portefeuille {#3-connect-to-the-bridge-with-your-wallet}

Assurez-vous que votre portefeuille est connecté au réseau principal Ethereum. Si ce n'est pas le cas, le site Web vous invitera automatiquement à changer de réseau.

![Common interface for bridging tokens](./bridge1.png)

## 4. Spécifier le montant et transférer les fonds {#4-specify-the-amount-and-move-the-funds}

Vérifiez le montant que vous obtiendrez en retour sur le réseau de couche 2 ainsi que les frais pour éviter les mauvaises surprises.

![Common interface for bridging tokens](./bridge2.png)

## 5. Confirmer la transaction dans votre portefeuille {#5-confirm-the-transaction-in-your-wallet}

Vous devrez payer des frais (appelés [gaz](/glossary/#gas)) sous forme d'ETH pour le traitement de la transaction.

![Common interface for bridging tokens](./bridge3.png)

## 6. Attendre que vos fonds soient transférés {#6-wait-for-your-funds-to-be-moved}

Ce processus ne devrait pas prendre plus de 10 minutes.

## 7. Ajouter le réseau de couche 2 sélectionné à votre portefeuille (facultatif) {#7-add-the-selected-layer-2-network-to-your-wallet-optional}

Vous pouvez utiliser [chainlist.org](https://chainlist.org) pour trouver les détails RPC du réseau. Une fois le réseau ajouté et la transaction terminée, vous devriez voir les jetons dans votre portefeuille.
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

### Que faire si j'ai des fonds sur une plateforme d'échange ? {#what-if-i-have-funds-on-an-exchange}

Vous pourriez être en mesure de retirer des fonds vers certaines couches 2 directement depuis une plateforme d'échange. Consultez la section « Passer à une couche 2 » de notre [page sur les couches 2](/layer-2/) pour plus d'informations.

### Puis-je retourner sur le réseau principal Ethereum après avoir transféré mes jetons vers une L2 via un pont ? {#can-i-go-back-to-ethereum-mainnet-after-i-bridge-my-tokens-to-l2}

Oui, vous pouvez toujours retransférer vos fonds vers le réseau principal en utilisant le même pont.
