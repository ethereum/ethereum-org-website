---
title: J'ai été victime d'une arnaque ou j'ai perdu des fonds
metaTitle: Aide et signalement d'arnaques
description: Que faire si vous avez été victime d'une arnaque, comment sécuriser vos actifs restants et où signaler la fraude.
lang: fr
---

Les arnaques aux cryptomonnaies ciblent des personnes de tous niveaux d'expérience, y compris des professionnels de la finance et de la technologie. Vous n'êtes pas seul, et être ici est la bonne première étape.

<Alert variant="error">
<AlertEmoji text=":rotating_light:"/>
<AlertContent>
<AlertDescription>

**Personne ne peut annuler les transactions sur la chaîne de blocs.** Si quelqu'un vous contacte en prétendant pouvoir récupérer vos fonds moyennant des frais, il s'agit presque certainement d'une deuxième arnaque. Voir les [arnaques à la récupération](#scam-types) ci-dessous.

</AlertDescription>
</AlertContent>
</Alert>

## Sécuriser vos actifs restants {#secure-assets}

Si vous avez interagi avec un arnaqueur ou si vous soupçonnez que votre portefeuille est compromis, prenez immédiatement ces mesures :

1. **Déplacez les fonds restants** vers un nouveau portefeuille sécurisé auquel l'arnaqueur n'a pas accès
2. **Révoquez les approbations de jetons.** Les arnaqueurs vous incitent souvent à approuver des dépenses de jetons illimitées. La révocation de ces autorisations empêche que votre portefeuille ne soit davantage vidé
3. **Changez les mots de passe** de tous les comptes de plateformes d'échange qui pourraient y être liés
4. **Activez l'authentification à deux facteurs (2FA)** sur tous les comptes liés aux cryptos

### Comment révoquer les approbations de jetons {#revoke-approvals}

Lorsque vous interagissez avec une application décentralisée (dapp) ou un contrat intelligent, vous lui avez peut-être accordé l'autorisation de dépenser vos jetons. Si un arnaqueur vous a incité à approuver un contrat malveillant, il peut continuer à vider vos jetons même après l'arnaque initiale.

Utilisez ces outils pour vérifier et révoquer les approbations :

- [Revoke.cash](https://revoke.cash/) : connectez votre portefeuille pour voir toutes les approbations actives et les révoquer
- [Revokescout](https://revoke.blockscout.com/) : vérifiez et révoquez les approbations via Blockscout
- [Vérificateur d'approbation de jetons Etherscan](https://etherscan.io/tokenapprovalchecker) : vérifiez et révoquez les approbations via Etherscan

<DocLink href="/guides/how-to-revoke-token-access/">
  Guide étape par étape : Comment révoquer l'accès aux jetons
</DocLink>

## Signaler les adresses et sites web frauduleux {#report}

Le signalement permet d'avertir d'autres utilisateurs et peut aider les enquêtes des forces de l'ordre. Documentez tout : hachages de transaction, adresses de portefeuille, captures d'écran et toute communication avec l'arnaqueur.

### Signaler une adresse frauduleuse {#report-address}

- [Chainabuse](https://www.chainabuse.com/) : base de données communautaire de signalement d'arnaques et de fraudes. Soumettez des signalements et recherchez des adresses frauduleuses connues
- [Signalement Etherscan](https://info.etherscan.com/report-address/) : signalez une adresse sur l'explorateur de blocs Ethereum le plus utilisé
- [CryptoScamDB](https://cryptoscamdb.org/) : base de données open-source de suivi des arnaques aux cryptomonnaies

### Signaler un site web ou un compte de réseau social frauduleux {#report-website}

- [PhishTank](https://phishtank.org/) : soumettez et vérifiez les URL d'hameçonnage
- [Navigation sécurisée Google](https://safebrowsing.google.com/safebrowsing/report_phish/) : signalez les sites d'hameçonnage à Google afin qu'ils soient bloqués dans Chrome et d'autres navigateurs
- [Netcraft](https://report.netcraft.com/report/mistake) : signalez les sites web malveillants et frauduleux
- Signalez directement sur la plateforme de réseau social où l'arnaque s'est produite (Twitter/X, Discord, Telegram ont tous des fonctionnalités de signalement)

### Signaler aux forces de l'ordre {#report-law-enforcement}

- **États-Unis :** [FBI Internet Crime Complaint Center (IC3)](https://www.ic3.gov/)
- **Royaume-Uni :** [Action Fraud](https://www.actionfraud.police.uk/)
- **Union européenne :** [Europol](https://www.europol.europa.eu/report-a-crime)
- **Autres pays :** déposez une plainte auprès de votre police locale. La fraude aux cryptomonnaies est un crime dans la plupart des juridictions

## Analyser ce qui s'est passé {#analyze}

Comprendre où sont allés vos fonds peut aider pour les signalements et peut soutenir les efforts de récupération si les fonds atterrissent sur une plateforme d'échange centralisée.

- [Blockscout](https://eth.blockscout.com/) : explorateur de blocs open-source pour rechercher n'importe quel hachage de transaction ou adresse de portefeuille afin de voir où les fonds ont été envoyés
- [Etherscan](https://etherscan.io/) : recherchez n'importe quel hachage de transaction ou adresse de portefeuille pour voir où les fonds ont été envoyés
- [Recherche Chainabuse](https://www.chainabuse.com/) : vérifiez si une adresse a déjà été signalée par d'autres victimes
- [MetaSleuth](https://metasleuth.io/) par BlockSec : outil visuel de traçage de transactions qui cartographie les flux de fonds

**Si les fonds ont été envoyés vers une plateforme d'échange centralisée** (comme Coinbase, Binance, Kraken), contactez immédiatement leur équipe d'assistance avec les détails de la transaction. Les plateformes d'échange peuvent parfois geler les comptes signalés pour fraude.

## La dure réalité {#hard-truth}

Parce qu'Ethereum est décentralisé, aucune autorité centrale ne peut annuler les transactions ou récupérer les fonds volés. Une fois qu'une transaction est confirmée sur la chaîne de blocs, elle est définitive.

Le signalement reste utile. Les signalements aident les forces de l'ordre à traquer les réseaux de fraude organisés, et le signalement des adresses sur Chainabuse et Etherscan avertit les futures victimes potentielles.

## Types d'arnaques à surveiller {#scam-types}

<ExpandableCard
title="Giveaway and airdrop scams"
contentPreview="No one is giving away free ETH. These offers are always scams."
eventCategory="SupportScamPage"
eventName="clicked giveaway scam"
>

Les arnaqueurs créent de faux cadeaux promettant de multiplier vos ETH ou de vous donner des jetons gratuits. Ils se font souvent passer pour des personnalités connues comme Vitalik Buterin. Si vous envoyez des ETH à une adresse de « cadeau », vous ne recevrez rien en retour.

**N'oubliez pas :** Vitalik et d'autres personnalités de premier plan ne vous demanderont jamais de leur envoyer des ETH.

[En savoir plus sur les arnaques courantes](/security/#common-scams)

</ExpandableCard>

<ExpandableCard
title="Impersonation and fake support"
contentPreview="No one from Ethereum or ethereum.org will ever contact you first."
eventCategory="SupportScamPage"
eventName="clicked impersonation scam"
>

Les arnaqueurs se font passer pour des membres de l'équipe Ethereum, des modérateurs ou des agents d'assistance sur Discord, Telegram et les réseaux sociaux. Ils peuvent vous envoyer des messages directs vous proposant de l'aide ou prétendant qu'il y a un problème avec votre compte.

**N'oubliez pas :**

- Il n'y a pas d'« équipe d'assistance Ethereum »
- Les vrais modérateurs ne vous enverront jamais de message privé en premier
- Ne partagez jamais votre phrase secrète ou vos clés privées avec qui que ce soit, pour quelque raison que ce soit
- Ne cliquez jamais sur les liens envoyés dans des messages non sollicités

</ExpandableCard>

<ExpandableCard
title="Recovery scams"
contentPreview="After being scammed, watch out for fake 'crypto recovery experts.'"
eventCategory="SupportScamPage"
eventName="clicked recovery scam"
>

Les arnaques à la récupération ciblent spécifiquement les personnes qui ont déjà perdu des fonds. Les arnaqueurs surveillent les réseaux sociaux à la recherche de personnes parlant d'avoir été arnaquées, puis les contactent en se faisant passer pour des « enquêteurs de la chaîne de blocs » ou des « experts en récupération de crypto ».

Ils promettent de retracer et de récupérer votre crypto volée moyennant des frais initiaux. Après avoir payé, ils disparaissent.

**Aucun service légitime ne peut annuler les transactions sur la chaîne de blocs.** Quiconque promet cela ment. C'est l'une des arnaques de suivi les plus courantes.

</ExpandableCard>

<ExpandableCard
title="Phishing websites and fake apps"
contentPreview="Scam sites mimic real wallets and exchanges to steal your credentials."
eventCategory="SupportScamPage"
eventName="clicked phishing scam"
>

Les sites d'hameçonnage semblent identiques aux vraies applications de portefeuille, aux plateformes d'échange ou aux plateformes de finance décentralisée (DeFi). Ils vous incitent à saisir votre phrase secrète ou à connecter votre portefeuille, puis vident vos fonds.

**Protégez-vous :**

- Vérifiez toujours l'URL avant de connecter votre portefeuille
- Ajoutez aux favoris les sites officiels que vous utilisez régulièrement
- Ne saisissez jamais votre phrase secrète sur un site web. Les applications légitimes ne la demandent jamais
- Utilisez [PhishTank](https://phishtank.org/) pour vérifier les URL suspectes

<DocLink href="/guides/how-to-id-scam-tokens/">
  Comment identifier les jetons frauduleux
</DocLink>

</DocLink>

<DocLink href="/security/">
  Guide complet sur la sécurité d'Ethereum et la prévention des arnaques
</DocLink>