---
title: Sécurité d'Ethereum et prévention des arnaques
description: Rester en toute sécurité sur Ethereum
lang: fr
---

# Sécurité d'Ethereum et prévention des arnaques {#introduction}

Face à l'intérêt grandissant pour les cryptomonnaies, il est essentiel d'apprendre les bonnes pratiques lors de leur utilisation. Les cryptomonnaies peuvent être excitantes, mais elles impliquent aussi des risques importants. Si vous effectuez ces petits efforts en amont, vous pouvez diminuer ces risques.

<Divider />

## Le b.a.-ba de la sécurité sur le Web {#web-security}

### Utilisez des mots de passe forts {#use-strong-passwords}

[Plus de 80 % des piratages de comptes sont le résultat de mots de passe faibles ou volés](https://cloudnine.com/ediscoverydaily/electronic-discovery/80-percent-hacking-related-breaches-related-password-issues-cybersecurity-trends/). Pour sécuriser vos comptes, privilégiez une longue suite de caractères, de chiffres et de signes de ponctuation.

Une erreur fréquente consiste à utiliser une combinaison de mots communs du dictionnaire, parfois proches. Les mots de passe de ce type sont peu sécurisés, car ils sont vulnérables à une technique de piratage relativement simple connue sous le nom d'[attaque par dictionnaire](https://wikipedia.org/wiki/Dictionary_attack).

```md
Exemple de mot de passe faible : CuteFluffyKittens!

Exemple de mot de passe fort : ymv\*azu.EAC8eyp8umf
```

Une autre erreur courante est d'utiliser des mots de passe qui peuvent être facilement devinés par le biais de l'[ingénierie sociale](https://wikipedia.org/wiki/Social_engineering_(security)). Par exemple, le fait d'inclure le nom de jeune fille de votre mère, le nom de vos enfants ou de votre animal de compagnie, ou encore des dates d'anniversaire dans votre mot de passe n'est pas sécurisé et augmente le risque que votre mot de passe soit compromis.

#### Bonnes pratiques pour des mots de passe forts : {#good-password-practices}

- Rendre les mots de passe aussi long que autorisé par votre générateur de mot de passe ou par le formulaire que vous remplissez
- Utiliser un mélange de majuscules, minuscules, chiffres et symboles
- Ne pas inclure d'informations personnelles, telles que les noms de famille, dans votre mot de passe
- Éviter les mots courants du dictionnaire

[Plus d'informations sur la création de mots de passe forts](https://terranovasecurity.com/how-to-create-a-strong-password-in-7-easy-steps/)

### Utiliser un mot de passe unique pour chaque compte {#use-unique-passwords}

Un mot de passe fort ne fournit pas autant de protection si le mot de passe est révélé dans une violation de données. Le site web [Ai-je été Pwned](https://haveibeenpwned.com) vous permet de vérifier si vos comptes ont été impliqués dans des violations de données stockées dans leur base de données. Si c'est le cas,** vous devriez changer immédiatement les mots de passe pwned**. L'utilisation de mots de passe uniques pour chaque compte réduit le risque que les pirates informatiques aient accès à tous vos comptes lorsque l'un de vos mots de passe est compromis.

### Utiliser un gestionnaire de mots de passe {#use-password-manager}

<InfoBanner emoji=":bulb:">
  <div>
    Un gestionnaire de mots de passe prend soin de créer des mots de passe forts et uniques et de les retenir ! Nous <strong>recommandons fortement</strong> d'en utiliser un, et la plupart d'entre eux sont gratuits !
  </div>
</InfoBanner>

Se souvenir de mots de passe forts et uniques pour chaque compte que vous avez n'est pas idéal. Un gestionnaire de mots de passe offre un stockage sécurisé et chiffré pour tous vos mots de passe auxquels vous pouvez accéder par un seul mot de passe maître fort. Ils suggèrent également des mots de passe forts lors de l'inscription à un nouveau service, de sorte que vous n'ayez pas à créer le vôtre. De nombreux gestionnaires de mots de passe vous diront également si vous avez été impliqué dans une violation de données, vous permettant de modifier les mots de passe avant toute attaque malveillante.

![Exemple d'utilisation d'un gestionnaire de mots de passe](./passwordManager.png)

#### Essayez un gestionnaire de mots de passe : {#try-password-manager}

- [Bitwarden](https://bitwarden.com/)
- [KeePass](https://keepass.info/)
- [1Password](https://1password.com/)
- Ou consultez les autres [gestionnaires de mots de passe recommandés](https://www.privacytools.io/secure-password-manager)

### Utiliser l'authentification à deux facteurs {#two-factor-authentication}

Pour prouver que vous etes réellement vous , il existe différentes preuves uniques qui peuvent être utilisées pour l'authentification. Ces preuves ou ** facteurs** sont de trois sortes :

- Quelque chose que vous connaissez (comme un mot de passe ou une question de sécurité)
- Quelque chose que vous êtes (comme une empreinte digitale ou un scanner iris/facial)
- Quelque chose que vous possédez (une clé de sécurité ou une application d'authentification sur votre téléphone)

L'utilisation de l'**authentification à deux facteurs (2FA)** fournit un* facteur de sécurité supplémentaire *pour vos comptes en ligne, afin que la connaissance de votre mot de passe seul (quelque chose que vous savez) ne soit pas suffisante pour accéder à un compte. Le plus souvent, le second facteur est un code temporaire aléatoire à 6 chiffres, appelé **mot de passe à usage unique basé sur le temps (TOTP ou time-based one-time password)**, auquel vous accédez par une application d'authentification comme Google Authentifactor ou Authy. Cette méthode est un facteur « Que vous possédez », car la clé racine qui génére les code temporaires est stocké sur votre appareil.

<InfoBanner emoji=":lock:">
  <div>
    Note : Utiliser l'envoi d'un code SMS comme 2FA n'est pas une méthode sûre 
à cause des possibilités de <a href="https://www.vice.com/en/article/3kx4ej/sim-jacking-mobile-phone-fraud">piratage de la SIM </a>. Pour une sécurité maximale, utilisez un service comme  <a href="https://mashable.com/article/how-to-set-up-google-authenticator"> Google Authentificator</a> ou <a href="https://authy.com/">Authy</a>.
  </div>
</InfoBanner>

#### Clés de sécurité {#security-keys}

Pour ceux qui veulent une 2FA encore plus securisée, pensez à utiliser une clé de sécurité. Les clés de sécurité sont des systèmes d'authentification matériels, qui fonctionnent de la même manière que les solutions d'authentification logicielles. Utiliser une clé de sécurité est la solution 2FA la plus sécurisée. Beaucoup de ces clés utilisent la norme universelle d'authentification à deux facteurs (U2F), FIDO. [ A propos de FIDO U2F](https://www.yubico.com/authentication-standards/fido-u2f/).

En savoir plus sur la 2FA :

<YouTube id="m8jlnZuV1i4" start="3479" />

### Désinstaller les extensions du navigateur {#uninstall-browser-extensions}

Les extensions de navigateur comme les extensions Chrome ou les modules complémentaires pour Firefox peuvent agrémenter les fonctionnalités et l'expérience utilisateur, mais elles comportent des risques. Par défaut, la plupart des extensions des navigateurs demandent un accès avec des droits de « lecture et écriture », leur permettant de faire presque tout de vos données. Les extensions Chrome se mettent à jours automatiquement, ainsi les mises à jours peuvent introduire un code malicieux sur une extension auparavant sûre. La plupart des extensions des navigateurs ne cherchent pas à voler vos données, mais c'est un risque à prendre en compte.

#### Bonnes pratiques : {#browser-extension-safety}

- N'installer que des extensions d'éditeurs de confiance
- Désinstaller les extensions de navigateur non-utilisées
- Installez les extensions Chrome localement pour arrêter la mise à jour automatique (Avancé)

[En savoir plus sur les risques liés aux extensions des navigateurs](https://www.kaspersky.co.uk/blog/browser-extensions-security/12750/)

<Divider />

## Le b.a.-ba de la sécurité de votre cryptomonnaie {#crypto-security}

### Approfondir vos connaissances {#level-up-your-knowledge}

L'une des principales raisons pour lesquelles les gens se font arnaquer dans l'univers des cryptomonnaies est souvent le manque de compréhension. Par exemple, si vous ne comprenez pas que le réseau Ethereum est décentralisé et n'appartient à personne, il est facile de devenir la cible de quelqu'un qui prétend faire partie de l'équipe de support et qui vous promet de vous rendre vos ETH perdus en échange de vos clés privées. S'informer sur le fonctionnement d'Ethereum est un investissement qui en vaut la peine.

<DocLink to="/what-is-ethereum/">
  Qu'est-ce qu'Ethereum?
</DocLink>

<DocLink to="/eth/">
  Qu'est-ce-que l'ether ?
</DocLink>
<Divider />

## Sécurité du portefeuille {#wallet-security}

### Ne divulguez pas vos clés privées {#protect-private-keys}

**Ne partagez jamais vos clés privées, pour quelque raison que ce soit !**

La clé privée de votre portefeuille fait office de mot de passe pour votre portefeuille Ethereum. Il s'agit de la seule chose qui empêche quelqu'un qui connaît l'adresse de votre portefeuille de vider votre compte de ses actifs !

<DocLink to="/wallets/">
  Qu'est-ce qu'un portefeuille Ethereum ?
</DocLink>

#### Ne faites pas de captures d'écran de vos phrases secrètes/clés privées {#screenshot-private-keys}

En faisant une capture d'écran de vos phrases secrètes ou de vos clés privées, vous risquez de les synchroniser sur le cloud et donc de les rendre potentiellement accessibles aux pirates informatiques. Récupérer les clés privées du cloud est un vecteur d'attaque prisé des pirates.

### Utiliser un portefeuille matériel {#use-hardware-wallet}

Les portefeuilles matériels permettent le stockage hors-ligne de vos clés privées. Ils sont considérés comme l'option de portefeuille la plus sûre pour le stockage de vos clés privées : votre clé privée n'entre jamais en contact avec l'internet et reste entièrement locale sur votre appareil.

Garder vos clés privées hors-ligne réduit significativement le risque qu'elles soient compromises, même si un pirate venait à prendre le contrôle de votre ordinateur.

#### Essayez un portefeuille matériel : {#try-hardware-wallet}

- [Ledger](https://www.ledger.com/)
- [Trezor](https://trezor.io/)

### Vérifier deux fois vos transactions avant l'envoi {#double-check-transactions}

Envoyer de la cryptomonnaie par accident à la mauvaise adresse de portefeuille est une erreur courante. **Une transaction envoyée sur Ethereum est irréversible.** À moins que vous ne connaissiez le propriétaire de l'adresse bénéficiaire et que vous puissiez la convaincre de vous renvoyer votre argent, il n'y aura aucun moyen pour vous de récupérer vos fonds.

Assurez-vous toujours que l'adresse spécifiée correspond exactement à l'adresse destinataire souhaitée avant d'envoyer une transaction. Il est également recommandé lorsque vous interagissez avec un contrat intelligent de lire le message de transaction avant de signer.

### Fixer des limites de dépenses pour les contrats intelligents {#spend-limits}

Lorsque vous interagissez avec des contrats intelligents, n'autorisez pas des plafonds de dépenses illimités. Une autorisation de dépenses illimitées peut permettre au contrat intelligent de vider votre portefeuille. Au lieu de cela, fixez plutôt des limites de dépenses correspondant uniquement au montant nécessaire à la transaction.

De nombreux portefeuilles Ethereum offrent des limites de sécurité pour éviter que vos comptes ne soient vidés.

[Comment révoquer l'accès des contrats intelligents à vos fonds crypto](/guides/how-to-revoke-token-access/)

<Divider />

## Escroqueries courantes {#common-scams}

Les escrocs chercheront toujours des moyens de vous soutirer de l'argent. Il est impossible de les stopper complètement, mais nous pouvons les rendre moins efficaces en étant conscients des techniques les plus utilisées. Il existe de nombreuses variantes de ces escroqueries, mais elles suivent généralement les mêmes schémas de base. Quoi qu'il en soit, n'oubliez pas :

- Soyez toujours sur vos gardes
- Personne ne vous offrira des ETH gratuits ou en "promotion"
- Personne n'a besoin d'accéder à vos clés privées ni à vos informations personnelles

### Arnaques à la distribution de cadeaux {#giveaway}

L'une des escroqueries les plus répandues dans les cryptomonnaies est celle de la distribution de cadeaux. Cette escroquerie peut prendre de nombreuses formes, mais le principe général est qu'en envoyant des ETH à l'adresse fournie, vous recevez le double des ETH envoyés en retour. *Pour cette raison, cette escroquerie est aussi connue sous le nom d'arnaque du 2 pour 1.*

En général, ces arnaques prévoient un délai limité pour recevoir les cadeaux afin de créer un faux sentiment d'urgence et d'encourager les mauvaises décisions.

#### Piratage sur les réseaux sociaux {#social-media-hacks}

C'est ce qu'il s'est passé en juillet 2020, lorsque les comptes Twitter de célébrités et d'importantes sociétés ont été piratés. Le pirate a simultanément posté une offre de distribution de Bitcoin sur les comptes piratés. Bien que les tweets trompeurs aient été rapidement signalés et supprimés, les pirates ont quand même réussi à disparaître avec 11 bitcoins (soit 500 000 $ en septembre 2021).

![Une arnaque sur Twitter](./appleTwitterScam.png)

#### Distribution de cadeaux par une célébrité {#celebrity-giveaway}

La distribution de cadeaux par une célébrité est une variante courante de l'arnaque à la distribution de cadeaux. Les escrocs récupèrent une interview vidéo ou une conférence donnée par une célébrité et la diffusent en direct sur YouTube - en faisant croire que la célébrité en question donnait une interview vidéo en direct pour faire la promotion d'une offre de distribution de cryptomonnaies.

Vitalik Buterin est la personnalité la plus souvent utilisée dans cette arnaque, mais de nombreuses autres personnes impliquées dans l'univers des cryptomonnaies le sont aussi (ex : Elon Musk et Charles Hoskinson). Le fait de montrer une personne connue donne à la diffusion en direct un semblant de légitimité (c'est un peu louche, mais Vitalik est de la partie, alors ça doit être bon !).

**Les distributions de cadeaux sont toujours des arnaques. Si vous envoyez des fonds sur ces comptes, vous les perdrez pour toujours.**

![Une arnaque sur YouTube](./youtubeScam.png)

### Arnaques à l'assistance {#support-scams}

Les cryptomonnaies sont une technologie relativement jeune et mal comprise. Une escroquerie courante qui tire parti de cette situation est l'arnaque à la fausse assistance, dans laquelle les escrocs vont se faire passer pour un agent d'assistance de portefeuilles, de plateformes d'échange ou de blockchains.

La majorité des discussions autour d'Ethereum ont lieu sur Discord. Les escrocs à la fausse assistance trouveront généralement leur cible en cherchant des demandes d'assistance dans les canaux Discord publics, pour ensuite envoyer une proposition d'assistance à leur proie par message privé. En instaurant un climat de confiance, les escrocs vont tenter de vous pousser à divulguer vos clés privées ou à envoyer votre argent vers leurs portefeuilles.

![Une arnaque à la fausse assistance sur Discord](./discordScam.png)

En principe, l'équipe d'Ethereum ne communiquera jamais avec vous par le biais de canaux privés non officiels. Quelques éléments simples à garder en tête lorsque vous obtenez de l'aide :

- Ne partagez jamais vos clés privées, vos phrases secrètes ou vos mots de passe
- Ne donnez à personne un accès à distance à votre ordinateur
- Ne communiquez jamais en dehors des canaux prévus par l'organisation

<InfoBanner emoji=":lock:">
  <div>
    Attention : bien que les arnaques à l'assistance se produisent généralement sur Discord, elles peuvent aussi vous arriver sur toutes les plateformes où des discussions autour de la cryptomonnaie ont lieu, y compris par e-mail.
  </div>
</InfoBanner>

### Arnaque au jeton « Eth2 » {#eth2-token-scam}

Dans la période précédant [La Fusion](/roadmap/merge/), les fraudeurs ont profité de la confusion autour du terme « Eth2 » pour essayer d'obtenir que les utilisateurs rachètent leur ETH pour un jeton « ETH2 ». Il n'existe pas d'« ETH2 » et aucun autre jeton légitime n'a été introduit avec La Fusion. L'ETH que vous possédiez avant La Fusion est le même ETH aujourd'hui. Il est **inutile de prendre des mesures liées à votre ETH pour tenir compte du passage de la preuve de travail à la preuve d'enjeu**.

Les escrocs peuvent apparaître sous la forme d'un agent d'« assistance » vous indiquant que si vous déposez votre ETH, vous recevrez en retour « ETH2 ». Il n'existe pas de [support Ethereum officiel](/community/support/), et il n'y a pas de nouveau jeton. Ne partagez jamais la phrase de récupération de votre portefeuille avec qui que ce soit.

_Remarque : il existe des jetons/téléscripteurs dérivés qui peuvent représenter une mise en jeu ETH (ex. rETH de Rocket Pool, stETH de Lido, ETH2 de Coinbase), mais ce ne sont pas des éléments vers lesquels vous devriez « migrer. »_

### Arnaques par hameçonnage {#phishing-scams}

Les arnaques par hameçonnage représentent un autre vecteur d'attaque de plus en plus fréquemment utilisé par les escrocs pour essayer de vider votre portefeuille.

Certains e-mails d'hameçonnage demandent aux utilisateurs de cliquer sur des liens qui les redirigeront vers des sites web factices, leur demandant ensuite de saisir leur phrase de récupération, de réinitialiser leur mot de passe ou encore d'envoyer des ETH. D'autres peuvent vous demander d'installer un logiciel malveillant à votre insu, qui infectera votre ordinateur et donnera accès à vos fichiers aux escrocs.

Si vous recevez un e-mail de la part d'un expéditeur inconnu, rappelez-vous :

- N'ouvrez jamais un lien ou une pièce jointe venant d'une adresse e-mail que vous ne connaissez pas
- Ne partagez vos informations personnelles ou vos mots de passe avec personne
- Supprimez les e-mails qui viennent d'expéditeurs inconnus

[En savoir plus sur les moyens d'éviter les arnaques par hameçonnage](https://support.mycrypto.com/staying-safe/mycrypto-protips-how-not-to-get-scammed-during-ico)

### Arnaques au faux courtier en cryptomonnaie {#broker-scams}

Les faux courtiers d'échange de cryptomonnaie prétendent être des courtiers spécialisés en cryptomonnaie : ils vous proposent de prendre en charge votre argent et de l'investir en votre nom. Des garanties de rendement irréalistes accompagnent généralement leur offre. Une fois que l'escroc aura reçu vos fonds, il pourra vous inciter à en envoyer d'autres, afin que vous ne manquiez pas d'autres gains d'investissement, ou il pourra disparaître complètement.

Ces courtiers frauduleux trouvent leur cible en utilisant de faux comptes sur YouTube afin d'engager une discussion d'apparence normale sur leur activité. Ces discussions reçoivent souvent un nombre important de votes positifs pour en accroître la légitimité, mais ces votes proviennent tous de robots.

**Ne faites pas confiance à des inconnus sur Internet pour investir en votre nom. Sans quoi vous perdrez vos cryptomonnaies.**

![Une arnaque au faux courtier sur YouTube](./brokerScam.png)

### Arnaques au pool de minage de cryptomonnaies {#mining-pool-scams}

Depuis septembre 2022, le minage sur Ethereum n'est plus possible. Cependant, on trouve toujours des escroqueries dans les pools de minage. Dans le cas des arnaques liées aux pools de minage, des personnes vous contactent sans que vous les ayez sollicitées et vous disent que vous pouvez gagner beaucoup d'argent en faisant partie d'un pool de minage Ethereum. L'escroc vous fera des promesses et restera en contact avec vous le temps qu'il faudra. Concrètement, l'escroc va essayer de vous faire croire qu'en rejoignant un pool de minage Ethereum, votre cryptomonnaie sera utilisée pour créer de l'ETH et que vous recevrez des dividendes sous la forme d'ETH. En fin de compte, vous remarquerez que votre cryptomonnaie génère de petits rendements. Il s'agit simplement d'un piège pour vous inciter à investir davantage. Au bout du compte, tous vos fonds investis seront envoyés à une adresse inconnue et l'escroc disparaîtra ou, dans certains cas, restera en contact avec vous, comme cela s'est produit dans une affaire récente.

Pour résumer, méfiez-vous des personnes qui vous contactent sur les réseaux sociaux pour vous proposer de rejoindre un pool de minage. Une fois que vous avez perdu votre cryptomonnaie, il est trop tard.

Quelques points à retenir :

- Méfiez-vous de toute personne qui vous contacte pour vous proposer des moyens de gagner de l'argent avec votre cryptomonnaie
- Faites des recherches sur la mise en jeu, les pools de liquidités et autres moyens d'investir votre cryptomonnaie
- De telles démarches sont rarement, voire jamais légitimes. Si elles l'étaient, elles seraient probablement grand public et vous en auriez entendu parler.

[Une personne perd 200 000 dollars dans une arnaque au groupe de minage](https://www.reddit.com/r/CoinBase/comments/r0qe0e/scam_or_possible_incredible_payout/)

### Arnaques par Airdrop {#airdrop-scams}

Les arnaques au airdrop : il s'agit d'un projet factice de distribution d'actif (NFT, jeton) dans votre portefeuille (wallet). Ce type d'escroquerie vous renvoie vers un faux site pour réclamer l'actif. Vous serez invité à vous connecter avec votre portefeuille Ethereum et à « autoriser » une transaction lors d'une tentative de réclamation. Cette transaction compromet votre compte en envoyant vos clés publiques et privées à l'escroc. Une forme alternative de cette arnaque peut consister à vous demander de confirmer une transaction qui envoie des fonds sur le compte de l'escroc.

[En savoir plus sur les arnaques par Airdrop](https://www.youtube.com/watch?v=LLL_nQp1lGk)

<Divider />

## Complément d'information {#further-reading}

### Sécurité sur le Web {#reading-web-security}

- [Up to 3 million devices infected by malware-laced Chrome and Edge add-ons](https://arstechnica.com/information-technology/2020/12/up-to-3-million-devices-infected-by-malware-laced-chrome-and-edge-add-ons/) - _Dan Goodin_
- [How to Create a Strong Password — That You Won’t Forget](https://www.avg.com/en/signal/how-to-create-a-strong-password-that-you-wont-forget) - _AVG_
- [What is a security key?](https://help.coinbase.com/en/coinbase/getting-started/verify-my-account/security-keys-faq) - _Coinbase_

### Sécurité des cryptomonnaies {#reading-crypto-security}

- [Protecting Yourself and Your Funds](https://support.mycrypto.com/staying-safe/protecting-yourself-and-your-funds) - _MyCrypto_
- [Security issues in common crypto communication software](https://docs.salusec.io/untitled/web3-penetration-test/risks-in-social-media) - _Salus_
- [Security Guide For Dummies And Smart People Too](https://medium.com/mycrypto/mycryptos-security-guide-for-dummies-and-smart-people-too-ab178299c82e) - _MyCrypto_
- [Crypto Security: Passwords and Authentication](https://www.youtube.com/watch?v=m8jlnZuV1i4) - _Andreas M. Antonopoulos_

### Prévention des arnaques {#reading-scam-education}

- [Guide : Comment identifier les jetons frauduleux](/guides/how-to-id-scam-tokens/)
- [Staying Safe: Common Scams](https://support.mycrypto.com/staying-safe/common-scams) - _MyCrypto_
- [Avoiding Scams](https://bitcoin.org/en/scams) - _Bitcoin.org_
- [Fil Twitter sur les courriels et messages communs de phishing en cryptomonnaies](https://twitter.com/tayvano_/status/1516225457640787969) - _Taylor Monahan_

<QuizWidget quizKey="security" />
