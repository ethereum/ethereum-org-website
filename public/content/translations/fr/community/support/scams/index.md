---
title: Aide et signalement des arnaques
description: Que faire si vous avez été victime d'une arnaque, comment sécuriser vos actifs restants et où signaler la fraude.
lang: fr
---

# J'ai été victime d'une arnaque ou j'ai perdu des fonds {#scam-help}

Les arnaques aux cryptomonnaies ciblent des personnes de tous niveaux d'expérience, y compris des professionnels de la finance et de la technologie. Vous n'êtes pas seul, et être ici est un premier pas dans la bonne direction.

<Alert variant="error">
<AlertEmoji text=":rotating_light:"/>
<AlertContent>
<AlertDescription>

**Personne ne peut annuler les transactions sur la blockchain.** Si quelqu'un vous contacte en prétendant pouvoir récupérer vos fonds moyennant des frais, il s'agit presque certainement d'une deuxième arnaque. Voir les [arnaques à la récupération](#recovery-scams) ci-dessous.

</AlertDescription>
</AlertContent>
</Alert>

## Sécurisez vos actifs restants {#secure-assets}

Si vous avez interagi avec un arnaqueur ou si vous soupçonnez que votre portefeuille est compromis, prenez immédiatement les mesures suivantes :

1. **Transférez les fonds restants** vers un nouveau portefeuille sécurisé auquel l'arnaqueur n'a pas accès
2. **Révoquez les approbations de jetons.** Les arnaqueurs vous piègent souvent pour que vous approuviez des dépenses illimitées de jetons. La révocation de ces autorisations empêche que votre portefeuille ne soit vidé davantage
3. **Changez les mots de passe** de tous les comptes d'échange qui pourraient être liés
4. **Activez l'authentification à deux facteurs (2FA)** sur tous les comptes liés aux cryptomonnaies

### Comment révoquer les approbations de jetons {#revoke-approvals}

Lorsque vous interagissez avec une dapp ou un contrat intelligent, vous lui avez peut-être accordé la permission de dépenser vos jetons. Si un arnaqueur vous a piégé en vous faisant approuver un contrat malveillant, il peut continuer à vider vos jetons même après l'arnaque initiale.

Utilisez ces outils pour vérifier et révoquer les approbations :

- [Revoke.cash](https://revoke.cash/) : connectez votre portefeuille pour voir toutes les approbations actives et les révoquer
- [Revokescout](https://revoke.blockscout.com/) : vérifiez et révoquez les approbations via Blockscout
- [Etherscan Token Approval Checker](https://etherscan.io/tokenapprovalchecker) : vérifiez et révoquez les approbations via Etherscan

<DocLink href="/guides/how-to-revoke-token-access/">
  Guide étape par étape : Comment révoquer l'accès aux jetons
</DocLink>

## Signaler les adresses et les sites Web frauduleux {#report}

Le signalement permet d'avertir les autres utilisateurs et peut aider les forces de l'ordre dans leurs enquêtes. Documentez tout : les hachages de transaction, les adresses de portefeuille, les captures d'écran et toute communication avec l'arnaqueur.

### Signaler une adresse frauduleuse {#report-address}

- [Chainabuse](https://www.chainabuse.com/) : base de données communautaire de signalement des arnaques et des fraudes. Soumettez des rapports et recherchez des adresses frauduleuses connues
- [Rapport Etherscan](https://info.etherscan.com/report-address/) : signalez une adresse sur l'explorateur de blocs Ethereum le plus utilisé
- [CryptoScamDB](https://cryptoscamdb.org/) : base de données open-source qui suit les arnaques aux cryptomonnaies

### Signaler un site Web ou un compte de réseau social frauduleux {#report-website}

- [PhishTank](https://phishtank.org/) : soumettez et vérifiez les URL d'hameçonnage
- [Google Safe Browsing](https://safebrowsing.google.com/safebrowsing/report_phish/) : signalez les sites d'hameçonnage à Google afin qu'ils soient bloqués dans Chrome et d'autres navigateurs
- [Netcraft](https://report.netcraft.com/report/mistake) : signalez les sites Web malveillants et frauduleux
- Signalez directement sur la plateforme de réseau social où l'arnaque a eu lieu (Twitter/X, Discord, Telegram ont tous des fonctionnalités de signalement)

### Signaler aux forces de l'ordre {#report-law-enforcement}

- **États-Unis :** [FBI Internet Crime Complaint Center (IC3)](https://www.ic3.gov/)
- **Royaume-Uni :** [Action Fraud](https://www.actionfraud.police.uk/)
- **Union européenne :** [Europol](https://www.europol.europa.eu/report-a-crime)
- **Autres pays :** déposez une plainte auprès de votre police locale. La fraude à la cryptomonnaie est un crime dans la plupart des juridictions

## Analysez ce qui s'est passé {#analyze}

Comprendre où sont allés vos fonds peut aider à la rédaction des rapports et peut soutenir les efforts de récupération si les fonds atterrissent sur un échange centralisé.

- [Blockscout](https://eth.blockscout.com/) : explorateur de blocs open-source pour rechercher n'importe quel hachage de transaction ou adresse de portefeuille pour voir où les fonds ont été envoyés
- [Etherscan](https://etherscan.io/) : recherchez n'importe quel hachage de transaction ou adresse de portefeuille pour voir où les fonds ont été envoyés
- [Recherche sur Chainabuse](https://www.chainabuse.com/) : vérifiez si une adresse a déjà été signalée par d'autres victimes
- [MetaSleuth](https://metasleuth.io/) par BlockSec : outil visuel de suivi des transactions qui cartographie les flux de fonds

**Si des fonds ont été envoyés à un échange centralisé** (comme Coinbase, Binance, Kraken), contactez immédiatement leur équipe de support avec les détails de la transaction. Les échanges peuvent parfois geler les comptes signalés pour fraude.

## La dure vérité {#hard-truth}

Parce qu'Ethereum est décentralisé, aucune autorité centrale ne peut annuler des transactions ou récupérer des fonds volés. Une fois qu'une transaction est confirmée sur la blockchain, elle est définitive.

Le signalement reste utile. Les rapports aident les forces de l'ordre à suivre les réseaux de fraude organisée, et le signalement d'adresses sur Chainabuse et Etherscan avertit les futures victimes potentielles.

## Types d'arnaques à surveiller {#scam-types}

<ExpandableCard
title="Arnaques aux cadeaux et aux airdrops"
contentPreview="Personne ne donne d'ETH gratuits. Ces offres sont toujours des arnaques."
eventCategory="SupportScamPage"
eventName="clicked giveaway scam"

>

Les arnaqueurs créent de faux cadeaux promettant de multiplier vos ETH ou de vous donner des jetons gratuits. Ils se font souvent passer pour des personnalités connues comme Vitalik Buterin. Si vous envoyez des ETH à une adresse de "cadeau", vous ne recevrez rien en retour.

**Rappelez-vous :** Vitalik et d'autres personnalités ne vous demanderont jamais de leur envoyer des ETH.

[En savoir plus sur les arnaques courantes](/security/#common-scams)

</ExpandableCard>

<ExpandableCard
title="Usurpation d'identité et faux support"
contentPreview="Personne d'Ethereum ou d'ethereum.org ne vous contactera jamais en premier."
eventCategory="SupportScamPage"
eventName="clicked impersonation scam"

>

Les arnaqueurs se font passer pour des membres de l'équipe Ethereum, des modérateurs ou des agents de support sur Discord, Telegram et les réseaux sociaux. Ils peuvent vous envoyer des messages directs pour vous offrir de l'aide ou prétendre qu'il y a un problème avec votre compte.

**Rappelez-vous :**

- Il n'y a pas d'"équipe de support Ethereum"
- Les vrais modérateurs ne vous enverront jamais de message privé en premier
- Ne partagez jamais votre phrase de récupération ou vos clés privées avec qui que ce soit, pour quelque raison que ce soit.
- Ne cliquez jamais sur les liens envoyés dans des messages non sollicités.

</ExpandableCard>

<ExpandableCard
title="Arnaques à la récupération"
contentPreview="Après avoir été victime d'une arnaque, méfiez-vous des faux 'experts en récupération de cryptomonnaies.'"
eventCategory="SupportScamPage"
eventName="clicked recovery scam"

>

Les arnaques à la récupération ciblent spécifiquement les personnes qui ont déjà perdu des fonds. Les arnaqueurs surveillent les réseaux sociaux à la recherche de personnes parlant d'avoir été arnaquées, puis les contactent en se faisant passer pour des "enquêteurs blockchain" ou des "experts en récupération de cryptomonnaies".

Ils promettent de tracer et de récupérer vos cryptomonnaies volées contre des frais initiaux. Après que vous ayez payé, ils disparaissent.

**Aucun service légitime ne peut annuler les transactions de la blockchain.** Quiconque promet cela ment. C'est l'une des arnaques de suivi les plus courantes.

</ExpandableCard>

<ExpandableCard
title="Sites web d'hameçonnage et fausses applications"
contentPreview="Les sites frauduleux imitent de vrais portefeuilles et échanges pour voler vos identifiants."
eventCategory="SupportScamPage"
eventName="clicked phishing scam"

>

Les sites d'hameçonnage ressemblent à de vraies applications de portefeuille, à des échanges ou à des plateformes DeFi. Ils vous piègent pour que vous saisissiez votre phrase de récupération ou que vous connectiez votre portefeuille, puis ils vident vos fonds.

**Protégez-vous :**

- Vérifiez toujours l'URL avant de connecter votre portefeuille
- Mettez en favoris les sites officiels que vous utilisez régulièrement
- Ne saisissez jamais votre phrase de récupération sur un site Web. Les applications légitimes ne la demandent jamais
- Utilisez [PhishTank](https://phishtank.org/) pour vérifier les URL suspectes

<DocLink href="/guides/how-to-id-scam-tokens/">
  Comment identifier les jetons frauduleux
</DocLink>

</ExpandableCard>

<DocLink href="/security/">
  Guide complet sur la sécurité d'Ethereum et la prévention des arnaques
</DocLink>
