---
title: Comment révoquer l'accès des contrats intelligents à vos fonds crypto
description: Un guide pratique sur la révocation de l'accès aux jetons de contrat intelligents exploiteurs
lang: fr
---

# Comment révoquer l'accès des contrats intelligents à vos fonds crypto

Ce guide va vous enseigner comment visualiser une liste de tous les [contrats intelligents](/glossary/#smart-contract) auxquels vous avez autorisé l'accès à vos fonds et comment les révoquer.

Parfois, des développeurs malveillants installent des portes dérobées dans les contrats intelligents, leur permettant d'accéder aux fonds des utilisateurs à leur insu. Souvent, il s'agit de plateformes demandant la permission à l'utilisateur de dépenser un **nombre illimité de jetons** en vue d'économiser de petites quantités de [gaz](/glossary/#gas) à l'avenir, mais cela s'accompagne d'un risque accru.

Une fois qu'une plateforme a un droit d'accès illimité à un jeton sur votre [portefeuille](/glossary/#wallet), ils peuvent dépenser tous ces jetons, même si vous avez retiré vos fonds de leur plateforme vers votre portefeuille. Une personne mal intentionnée peut accéder à vos fonds et les retirer, vous laissant sans possibilité de les récupérer.

Vos options pour vous protéger sont de ne pas utiliser de ne pas utiliser de nouveaux projets non testés, de n'approuver que ce dont vous avez besoin et de régulièrement contrôler et révoquer les accès qui présentent un risque. Alors, comment fait-on ?

## Étape 1 : Utiliser les outils de révocation d'accès

Plusieurs sites Web vous permettent de visualiser et de révoquer les contrats intelligents connectés à votre adresse. Chacun de ces sites nécessite une connexion à votre portefeuille :

- [Ethallowance](https://ethallowance.com/) (Ethereum)
- [Etherscan](https://etherscan.io/tokenapprovalchecker) (Ethereum)
- [Cointool](https://cointool.app/approve/eth) (plusieurs réseaux)
- [Revoke](https://revoke.cash/) (plusieurs réseaux)
- [Unrekt](https://app.unrekt.net/) (plusieurs réseaux)
- [EverRevoke](https://everrise.com/everrevoke/) (plusieurs réseaux)

## Étape 2 : Connectez votre portefeuille

Une fois que vous êtes sur le site Web, cliquez sur « Connecter le portefeuille ». Le site Web devrait vous inviter à connecter votre portefeuille.

Assurez-vous d'utiliser le même réseau pour votre portefeuille et pour le site Web. Vous ne verrez que les contrats intelligents liés au réseau sélectionné. Par exemple, si vous vous connectez au réseau principal Ethereum, vous ne verrez que les contrats Ethereum et non les contrats d'autres chaînes comme Polygon.

## Étape 3 : Sélectionnez un contrat intelligent que vous souhaitez révoquer

Vous devriez voir tous les contrats qui sont autorisés à accéder à vos jetons ainsi que leurs limites de dépenses respectives. Identifiez les contrats que vous souhaitez révoquer.

Si vous ne savez pas quel contrat choisir, vous pouvez tous les révoquer. Cela ne créera aucun problème de votre côte, mais lorsque vous aurez à interagir avec un contrat révoqué, vous devrez à nouveau lui accorder des droits d'accès.

## Étape 4 : Révoquer l'accès à vos fonds

Lorsque vous cliquez sur révoquer, vous devriez voir une nouvelle proposition de transaction dans votre portefeuille. C'est tout à fait normal. Vous devrez payer ces frais pour que la révocation soit validée. Selon le réseau, le délai de traitement de la requête peut varier d'une à plusieurs minutes.

Nous vous conseillons de rafraîchir l'outil de révocation après quelques minutes et de reconnecter votre portefeuille pour vérifier à nouveau si le contrat révoqué a disparu de la liste.

<mark>Nous vous recommandons de ne jamais autoriser de projets ayant un accès illimité à vos fonds et de révoquer régulièrement l'intégralité des droits de vos contrats intelligents. La révocation de l'accès aux jetons ne devrait jamais entraîner une perte de fonds, surtout si vous utilisez les outils mentionnés ci-dessus.</mark>

 <br />

<InfoBanner shouldSpaceBetween emoji=":eyes:">
  <div>Vous voulez en savoir plus ?</div>
  <ButtonLink href="/guides/">
    Consultez nos autres guides
  </ButtonLink>
</InfoBanner>

## Questions fréquemment posées

### Est-ce que la révocation de l'accès aux jetons met également fin au staking, aux pools de liquidités, aux prêts, etc. ?

Non, cela n'affectera aucune de vos stratégies [DeFi](/glossary/#defi). Vos positions et vos gains seront préservés.

### Est-ce que déconnecter un portefeuille d'un projet équivaut à supprimer les permissions d'utilisation de mes fonds ?

Non, si vous déconnectez votre portefeuille du projet, mais que vous avez accordé des droits d'accès avec un jeton, les droits d'accès accordés par le jeton restent valides. Vous devez révoquer cet accès.

### Quelle est la date d'expiration du contrat ?

Il n'y a pas de date d'expiration pour les permissions accordées par un contrat. Lorsque vous accordez des droits avec un contrat, ils restent valides même plusieurs années après leur octroi.

### Pourquoi certains projets définissent-ils une allocation de jetons illimitée ?

Les projets le font souvent pour minimiser le nombre de demandes requises, ce qui signifie que l'utilisateur n'a qu'à approuver une seule fois et qu'il ne paye les frais de transaction qu'une seule fois. Bien que pratique, cette solution peut s'avérer dangereuse pour les utilisateurs qui approuvent sans précaution les contrats sur des sites dont la fiabilité reste à prouver par le temps ou par des audits. Certains portefeuilles permettent d'établir une limite de transaction afin de limiter les risques. Consultez votre fournisseur de portefeuille pour plus d'informations.
