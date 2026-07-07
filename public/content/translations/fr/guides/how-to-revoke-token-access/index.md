---
title: "Comment révoquer l'accès d'un contrat intelligent à vos fonds crypto"
description: "Un guide pratique sur la révocation de l'accès aux jetons par des contrats intelligents abusifs"
lang: fr
---

Ce guide vous apprendra comment afficher une liste de tous les [contrats intelligents](/glossary/#smart-contract) auxquels vous avez autorisé l'accès à vos fonds et comment les annuler.

Parfois, des développeurs malveillants intègrent des portes dérobées dans les contrats intelligents qui permettent d'accéder aux fonds des utilisateurs non avertis qui interagissent avec le contrat intelligent. Ce qui arrive souvent, c'est que ces plateformes demandent à l'utilisateur la permission de dépenser un **nombre illimité de jetons** dans le but d'économiser de petites quantités de [gaz](/glossary/#gas) à l'avenir, mais cela s'accompagne d'un risque accru.

Une fois qu'une plateforme a des droits d'accès illimités à un jeton sur votre [portefeuille](/glossary/#wallet), elle peut dépenser tous ces jetons même si vous avez retiré vos fonds de sa plateforme vers votre portefeuille. Les acteurs malveillants peuvent toujours accéder à vos fonds et les retirer vers leurs portefeuilles sans aucune option de récupération pour vous.

Les seules protections sont de s'abstenir d'utiliser de nouveaux projets non testés, de n'approuver que ce dont vous avez besoin, ou de révoquer régulièrement l'accès. Alors, comment faire ?

## Étape 1 : Utiliser des outils de révocation d'accès {#step-1-use-revoke-access-tools}

Plusieurs sites web vous permettent de voir et de révoquer les contrats intelligents connectés à votre adresse. Visitez le site web et connectez votre portefeuille :

- [Etherscan](https://etherscan.io/tokenapprovalchecker) (Ethereum)
- [Blockscout](https://eth.blockscout.com/essential-dapps/revoke) (Ethereum)
- [Revoke](https://revoke.cash/) (plusieurs réseaux)
- [Unrekt](https://app.unrekt.net/) (plusieurs réseaux)
- [EverRevoke](https://everrise.com/everrevoke/) (plusieurs réseaux)

## Étape 2 : Connecter votre portefeuille {#step-2-connect-your-wallet}

Une fois sur le site web, cliquez sur « Connect wallet » (Connecter le portefeuille). Le site web devrait vous inviter à connecter votre portefeuille.

Assurez-vous d'utiliser le même réseau dans votre portefeuille et sur le site web. Vous ne verrez que les contrats intelligents liés au réseau sélectionné. Par exemple, si vous vous connectez au réseau principal Ethereum, vous ne verrez que les contrats Ethereum, et non les contrats d'autres chaînes telles que Polygon.

## Étape 3 : Sélectionner un contrat intelligent que vous souhaitez révoquer {#step-3-select-a-smart-contract-you-wish-to-revoke}

Vous devriez voir tous les contrats qui ont accès à vos jetons et leur limite de dépense. Trouvez celui auquel vous souhaitez mettre fin.

Si vous ne savez pas quel contrat choisir, vous pouvez tous les révoquer. Cela ne vous posera aucun problème, mais vous devrez accorder un nouvel ensemble de permissions la prochaine fois que vous interagirez avec l'un de ces contrats.

## Étape 4 : Révoquer l'accès à vos fonds {#step-4-revoke-access-to-your-funds}

Une fois que vous avez cliqué sur révoquer, vous devriez voir une nouvelle suggestion de transaction dans votre portefeuille. C'est tout à fait normal. Vous devrez payer les frais de transaction pour que l'annulation réussisse. Selon le réseau, le traitement peut prendre d'une à plusieurs minutes.

Nous vous conseillons de rafraîchir l'outil de révocation après quelques minutes et de connecter à nouveau votre portefeuille pour vérifier si le contrat révoqué a bien disparu de la liste.

<mark>Nous vous recommandons de ne jamais accorder aux projets un accès illimité à vos jetons et de révoquer régulièrement tous les accès d'allocation de jetons. La révocation de l'accès aux jetons ne devrait jamais entraîner de perte de fonds, surtout si vous utilisez les outils listés ci-dessus.</mark>

 <br />

<Alert variant="update">
<AlertEmoji text=":eyes:"/>
<AlertContent className="justify-between flex-row items-center">
  <div>Envie d'en savoir plus ?</div>
  <ButtonLink href="/guides/">
    Consultez nos autres guides
  </ButtonLink>
</AlertContent>
</Alert>

## Foire aux questions {#frequently-asked-questions}

### La révocation de l'accès aux jetons met-elle également fin au staking, aux pools, aux prêts, etc. ? {#does-revoking-token-access-also-terminate-staking-pooling-lending-etc}

Non, cela n'affectera aucune de vos stratégies de [finance décentralisée (DeFi)](/glossary/#defi). Vous conserverez vos positions et continuerez à recevoir des récompenses, etc.

### Déconnecter un portefeuille d'un projet revient-il au même que de retirer la permission d'utiliser mes fonds ? {#is-disconnecting-a-wallet-from-a-project-the-same-as-removing-permission-to-use-my-funds}

Non, si vous déconnectez votre portefeuille du projet, mais que vous avez accordé des permissions d'allocation de jetons, ils peuvent toujours utiliser ces jetons. Vous devez révoquer cet accès.

### Quand la permission du contrat expirera-t-elle ? {#when-will-the-contract-permission-expire}

Il n'y a pas de date d'expiration sur les permissions de contrat. Si vous accordez des permissions de contrat, elles peuvent être utilisées, même des années après avoir été accordées.

### Pourquoi les projets définissent-ils une allocation de jetons illimitée ? {#why-do-projects-set-unlimited-token-allowance}

Les projets font souvent cela pour minimiser le nombre de requêtes nécessaires, ce qui signifie que l'utilisateur n'a à approuver qu'une seule fois et à payer les frais de transaction qu'une seule fois. Bien que pratique, il peut être dangereux pour les utilisateurs d'approuver de manière imprudente, sur des sites qui n'ont pas fait leurs preuves avec le temps ou qui ne sont pas audités. Certains portefeuilles vous permettent de restreindre manuellement la quantité de jetons approuvés pour limiter vos risques. Vérifiez auprès de votre fournisseur de portefeuille pour plus d'informations.
