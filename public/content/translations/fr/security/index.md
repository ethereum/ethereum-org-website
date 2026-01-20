---
title: Sécurité d'Ethereum et prévention des arnaques
description: Rester en toute sécurité sur Ethereum
lang: fr
---

# Sécurité Ethereum et prévention des arnaques {#introduction}

L'intérêt grandissant pour la cryptomonnaie amène avec lui un risque croissant venant des escrocs et des pirates informatiques. Cet article expose de bonnes pratiques pour atténuer ces risques.

**Rappelez-vous : Jamais personne de ethereum.org ne vous contactera. Ne répondez pas aux e-mails prétendant provenir du support officiel d'Ethereum.**

<Divider />

## Les bases de la sécurité des cryptos {#crypto-security}

### Améliorez vos connaissances {#level-up-your-knowledge}

Une mauvaise compréhension de la façon dont fonctionnent les cryptomonnaies peut amener à des erreurs coûteuses. Par exemple, si quelqu'un prétend être un agent d'un service client qui peut vous rendre vos ETH perdus en échange de vos clés privées, ils s'attaquent aux personnes ne comprenant pas qu'Ethereum est un réseau décentralisé manquant de ce genre de fonctionnalité. S'informer sur le fonctionnement d'Ethereum est un investissement qui en vaut la peine.

<DocLink href="/what-is-ethereum/">
  Qu'est-ce qu'Ethereum ?
</DocLink>

<DocLink href="/eth/">
  Qu'est-ce que l'ether ?
</DocLink>
<Divider />

## Sécurité du portefeuille {#wallet-security}

### Ne divulguez pas vos clés privées {#protect-private-keys}

**Ne partagez jamais vos clés privées, pour quelque raison que ce soit !**

La clé privée de votre portefeuille fait office de mot de passe pour votre portefeuille Ethereum. Il s'agit de la seule chose qui empêche quelqu'un qui connaît l'adresse de votre portefeuille de vider votre compte de ses actifs !

<DocLink href="/wallets/">
  Qu'est-ce qu'un portefeuille Ethereum ?
</DocLink>

#### Ne faites pas de captures d'écran de vos phrases de récupération/clés privées {#screenshot-private-keys}

Faire une capture d'écran de vos phrases de récupération ou vos clés privées pourrait les synchroniser sur un fournisseur de données cloud, ce qui pourrait les rendre accessibles aux pirates informatiques. Récupérer les clés privées du cloud est un vecteur d'attaque prisé des pirates.

### Utilisez un portefeuille matériel {#use-hardware-wallet}

Les portefeuilles matériels permettent le stockage hors-ligne de vos clés privées. Ils sont considérés comme l'option de portefeuille la plus sûre pour le stockage de vos clés privées : votre clé privée n'entre jamais en contact avec l'internet et reste entièrement locale sur votre appareil.

Garder vos clés privées hors-ligne réduit significativement le risque qu'elles soient compromises, même si un pirate venait à prendre le contrôle de votre ordinateur.

#### Essayez un portefeuille matériel : {#try-hardware-wallet}

- [Ledger](https://www.ledger.com/)
- [Trezor](https://trezor.io/)

### Vérifiez deux fois les transactions avant de les envoyer {#double-check-transactions}

Envoyer de la cryptomonnaie par accident à la mauvaise adresse de portefeuille est une erreur courante. **Une transaction envoyée sur Ethereum est irréversible.** Sauf si vous connaissez le propriétaire de l'adresse et que vous pouvez le convaincre de vous renvoyer vos fonds, vous ne pourrez pas les récupérer.

Assurez-vous toujours que l'adresse spécifiée correspond exactement à l'adresse destinataire souhaitée avant d'envoyer une transaction.
C'est une bonne pratique, quand on interagit avec un contrat intelligent, de lire le message de transaction avant de signer.

### Définir des limites de dépenses pour les contrats intelligents {#spend-limits}

Lorsque vous interagissez avec des contrats intelligents, n'autorisez pas des plafonds de dépenses illimités. Une autorisation de dépenses illimitées peut permettre au contrat intelligent de vider votre portefeuille. Au lieu de cela, fixez plutôt des limites de dépenses correspondant uniquement au montant nécessaire à la transaction.

De nombreux portefeuilles Ethereum offrent des limites de sécurité pour éviter que vos comptes ne soient vidés.

[Comment révoquer l'accès des contrats intelligents à vos fonds en cryptomonnaies](/guides/how-to-revoke-token-access/)

<Divider />

## Arnaques courantes {#common-scams}

Il est impossible d'arrêter les escrocs complétement, mais nous pouvons les rendre moins efficaces en étant conscient des techniques d'arnaque les plus utilisées. Il existe de nombreuses variantes de ces escroqueries, mais elles suivent généralement les mêmes schémas de base. Quoi qu'il en soit, n'oubliez pas :

- Soyez toujours sur vos gardes
- Personne ne vous offrira des ETH gratuits ou en "promotion"
- Personne n'a besoin d'accéder à vos clés privées ni à vos informations personnelles

### Hameçonnage via les publicités Twitter {#ad-phishing}

![Hameçonnage par lien sur Twitter](./twitterPhishingScam.png)

Il existe une méthode pour usurper la fonctionnalité d'aperçu des liens Twitter (également connu sous le nom de X) pour potentiellement tromper les utilisateurs afin que ceux-ci pensent visiter un site web légitime. Cette technique exploite le mécanisme de Twitter pour générer des aperçus des URL partagées dans les tweets, et affiche _d'ethereum.org_ par exemple (illustré ci-dessus), alors qu'en fait, les utilisateurs sont redirigés vers un site malveillant.

Vérifiez toujours que vous êtes sur le bon domaine, surtout après avoir cliqué sur un lien.

[Plus d'informations ici](https://harrydenley.com/faking-twitter-unfurling).

### Arnaque à la distribution gratuite {#giveaway}

L'une des escroqueries les plus répandues dans les cryptomonnaies est celle de la distribution de cadeaux. L'arnaque à la distribution de cadeaux peut prendre plusieurs formes, mais l'idée générale est que vous envoyez des ETH à l'adresse portefeuille fournie, et vous recevrez vos ETH en retour mais doublés._Pour cette raison, cette escroquerie est aussi connue sous le nom d'arnaque du 2 pour 1._

Ces arnaques prévoient généralement un délai limité pour recevoir les cadeaux afin de créer un faux sentiment d'urgence.

### Piratage de comptes de médias sociaux {#social-media-hacks}

C'est ce qu'il s'est passé en juillet 2020, lorsque les comptes Twitter de célébrités et d'importantes sociétés ont été piratés. Le pirate a simultanément posté une offre de distribution de Bitcoin sur les comptes piratés. Bien que les tweets trompeurs aient été rapidement signalés et supprimés, les pirates ont quand même réussi à disparaître avec 11 bitcoins (soit 500 000 $ en septembre 2021).

![Une arnaque sur Twitter](./appleTwitterScam.png)

### Distribution gratuite par une célébrité {#celebrity-giveaway}

La distribution de cadeaux par une célébrité est une variante courante de l'escroquerie à l'offre cadeaux. Les escrocs prennent une interview vidéo enregistrée ou une conférence donnée par une célébrité et la diffusent en direct sur YouTube, donnant ainsi l'impression que la célébrité donne une interview vidéo en direct pour promouvoir une distribution gratuite de cryptomonnaies.

Vitalik Buterin est le plus souvent utilisé dans cette arnaque, mais de nombreuses autres personnalités du monde des cryptos sont également utilisées (par ex., Elon Musk ou Charles Hoskinson). Le fait de montrer une personne connue donne à la diffusion en direct un semblant de légitimité (c'est un peu louche, mais Vitalik est de la partie, alors ça doit être bon !).

**Les offres cadeaux sont toujours des arnaques. Si vous envoyez des fonds sur ces comptes, vous les perdrez pour toujours.**

![Une arnaque sur YouTube](./youtubeScam.png)

### Arnaques au support technique {#support-scams}

Les cryptomonnaies sont une technologie relativement jeune et mal comprise. Une escroquerie courante qui tire parti de cette situation est l'arnaque à la fausse assistance, dans laquelle les escrocs vont se faire passer pour un agent d'assistance de portefeuilles, de plateformes d'échange ou de blockchains.

La majorité des discussions autour d'Ethereum ont lieu sur Discord. Les escrocs à la fausse assistance trouveront généralement leur cible en cherchant des demandes d'assistance dans les canaux Discord publics, pour ensuite envoyer une proposition d'assistance à leur proie par message privé. En instaurant un climat de confiance, les escrocs vont tenter de vous pousser à divulguer vos clés privées ou à envoyer votre argent vers leurs portefeuilles.

![Une arnaque au support technique sur Discord](./discordScam.png)

En principe, l'équipe d'Ethereum ne communiquera jamais avec vous par le biais de canaux privés non officiels. Quelques éléments simples à garder en tête lorsque vous obtenez de l'aide :

- Ne partagez jamais vos clés privées, vos phrases secrètes ou vos mots de passe
- Ne donnez à personne un accès à distance à votre ordinateur
- Ne communiquez jamais en dehors des canaux prévus par l'organisation

<Alert variant="update">
<AlertEmoji text=":lock:"/>
<AlertContent>
<AlertDescription>
    Attention : bien que les arnaques de type support technique se produisent fréquemment sur Discord, elles peuvent également être répandues sur n'importe quelle application de chat où ont lieu des discussions sur les cryptos, y compris par e-mail.
</AlertDescription>
</AlertContent>
</Alert>

### Arnaque au jeton « Eth2 » {#eth2-token-scam}

À l'approche de [La Fusion](/roadmap/merge/), des escrocs ont profité de la confusion autour du terme « Eth2 » pour tenter d'amener les utilisateurs à échanger leurs ETH contre un jeton « ETH2 ». Il n'existe pas d'« ETH2 » et aucun autre jeton légitime n'a été introduit avec La Fusion. L'ETH que vous possédiez avant La Fusion est le même ETH aujourd'hui. **Il n'est pas nécessaire d'effectuer une action quelconque concernant vos ETH pour tenir compte du passage de la preuve de travail à la preuve d'enjeu.**

Les escrocs peuvent apparaître sous la forme d'un agent d'« assistance » vous indiquant que si vous déposez votre ETH, vous recevrez en retour « ETH2 ». Il n'y a pas de [support officiel pour Ethereum](/community/support/), et il n'y a pas de nouveau jeton. Ne partagez jamais la phrase de récupération de votre portefeuille avec qui que ce soit.

_Remarque : il existe des jetons/tickers dérivés qui peuvent représenter des ETH mis en jeu (c.-à-d. rETH de Rocket Pool, stETH de Lido, ETH2 de Coinbase), mais vous n'avez pas besoin de « migrer » vers eux._

### Arnaques par hameçonnage {#phishing-scams}

Les arnaques par hameçonnage représentent un autre vecteur d'attaque de plus en plus fréquemment utilisé par les escrocs pour essayer de vider votre portefeuille.

Certains e-mails d'hameçonnage demandent aux utilisateurs de cliquer sur des liens qui les redirigeront vers des sites web factices, leur demandant ensuite de saisir leur phrase de récupération, de réinitialiser leur mot de passe ou encore d'envoyer des ETH. D'autres peuvent vous demander d'installer un logiciel malveillant à votre insu, qui infectera votre ordinateur et donnera accès à vos fichiers aux escrocs.

Si vous recevez un e-mail de la part d'un expéditeur inconnu, rappelez-vous :

- N'ouvrez jamais un lien ou une pièce jointe venant d'une adresse e-mail que vous ne connaissez pas
- Ne partagez vos informations personnelles ou vos mots de passe avec personne
- Supprimez les e-mails qui viennent d'expéditeurs inconnus

[En savoir plus sur la façon d'éviter les arnaques par hameçonnage](https://support.mycrypto.com/staying-safe/mycrypto-protips-how-not-to-get-scammed-during-ico)

### Arnaques aux faux courtiers en cryptomonnaies {#broker-scams}

Les faux courtiers d'échange de cryptomonnaies prétendent être des spécialistes en courtage de cryptomonnaies qui vont vous offrir de prendre votre argent et de l'investir en votre nom. Une fois que l'escroc aura reçu vos fonds, il pourra vous inciter à en envoyer d'autres, afin que vous ne manquiez pas d'autres gains d'investissement, ou bien disparaître complètement.

Ces fraudeurs trouvent souvent des cibles en utilisant de faux comptes sur Youtube pour engager une conversation apparemment normale sur le « courtier ». Ces discussions reçoivent souvent un nombre important de votes positifs pour en accroître la légitimité, mais ces votes proviennent tous de robots.

**Ne faites pas confiance à des inconnus sur Internet pour investir en votre nom. Sans quoi vous perdrez vos cryptomonnaies.**

![Une arnaque au faux courtier sur YouTube](./brokerScam.png)

### Arnaques aux pools de minage de cryptomonnaies {#mining-pool-scams}

Depuis septembre 2022, le minage sur Ethereum n'est plus possible. Cependant, on trouve toujours des escroqueries dans les pools de minage. Dans le cas des arnaques liées aux pools de minage, des personnes vous contactent sans que vous les ayez sollicitées et vous disent que vous pouvez gagner beaucoup d'argent en faisant partie d'un pool de minage Ethereum. L'escroc vous fera des promesses et restera en contact avec vous le temps qu'il faudra. Concrètement, l'escroc va essayer de vous convaincre que lorsque vous rejoignez un ensemble de minage Ethereum, vos cryptomonnaies vont être utilisées pour créer de l'ETH et que vous allez être payé avec des dividendes en ETH. Vous allez alors voir que vos cryptomonnaies vous rapportent de petits montants. Il s'agit simplement d'un piège pour vous inciter à investir davantage. Au bout du compte, tous vos fonds investis seront envoyés à une adresse inconnue et l'escroc disparaîtra ou, dans certains cas, restera en contact avec vous, comme cela s'est produit dans une affaire récente.

Pour résumer, méfiez-vous des personnes qui vous contactent sur les réseaux sociaux pour vous proposer de rejoindre un ensemble de minage. Une fois votre cryptomonnai perdue, il est trop tard.

Quelques points à retenir :

- Méfiez-vous de toute personne qui vous contacte pour vous proposer des moyens de gagner de l'argent avec votre cryptomonnaie
- Faites des recherches sur la mise en jeu, les pools de liquidités et autres moyens d'investir votre cryptomonnaie
- De telles démarches sont rarement, voire jamais légitimes. Si elles l'étaient, elles seraient probablement grand public et vous en auriez entendu parler.

[Un homme perd 200 000 $ dans une arnaque au pool de minage](https://www.reddit.com/r/CoinBase/comments/r0qe0e/scam_or_possible_incredible_payout/)

### Arnaques à l'airdrop {#airdrop-scams}

Les arnaques au airdrop : il s'agit d'un projet factice de distribution d'actif (NFT, jeton) dans votre portefeuille (wallet). Ce type d'escroquerie vous renvoie vers un faux site pour réclamer l'actif en question. Vous serez invité à vous connecter avec votre portefeuille Ethereum et à « autoriser » une transaction lors d'une tentative de réclamation. Cette transaction compromet votre compte en envoyant vos clés publiques et privées à l'escroc. Une autre forme de cette escroquerie consiste à vous faire confirmer une transaction qui envoie des fonds sur le compte de l'escroc.

[En savoir plus sur les arnaques à l'airdrop](https://www.youtube.com/watch?v=LLL_nQp1lGk)

<Divider />

## Les bases de la sécurité Web {#web-security}

### Utiliser des mots de passe forts {#use-strong-passwords}

[Plus de 80 % des piratages de comptes sont le résultat de mots de passe faibles ou volés](https://cloudnine.com/ediscoverydaily/electronic-discovery/80-percent-hacking-related-breaches-related-password-issues-cybersecurity-trends/). Une combinaison longue de caractères, de nombres et de symboles va vous aider à garder vos comptes sécurisés.

Une erreur commune est d'utiliser une combinaison de quelques mots communs et liés. Les mots de passe de ce type sont peu sécurisés car ils sont sujets à une attaque de piratage appelée attaque par dictionnaire.

```md
Exemple de mot de passe faible : CuteFluffyKittens!

Exemple de mot de passe fort : ymv\*azu.EAC8eyp8umf
```

Une autre erreur courante consiste à utiliser des mots de passe qui peuvent être facilement devinés ou découverts grâce à [l'ingénierie sociale](https://wikipedia.org/wiki/Social_engineering_\(security\)). Inclure le nom de jeune fille de votre mère, les noms de vos enfants ou de vos animaux de compagnie, ou bien des dates d'anniversaire dans vos mots de passe va augmenter les risques que vos mots de passe soit compromis, et donc le risque de piratage.

#### Bonnes pratiques en matière de mots de passe : {#good-password-practices}

- Rendre les mots de passe aussi long que autorisé par votre générateur de mot de passe ou par le formulaire que vous remplissez
- Utiliser un mélange de majuscules, minuscules, chiffres et symboles
- Ne pas inclure d'informations personnelles, telles que les noms de famille, dans votre mot de passe
- Évitez les mots communs

[En savoir plus sur la création de mots de passe forts](https://terranovasecurity.com/how-to-create-a-strong-password-in-7-easy-steps/)

### Utiliser des mots de passe uniques pour tous vos comptes {#use-unique-passwords}

Un mot de passe qui a été révélé par une faille de sécurité n'est plus un mot de passe fort et sécurisé. Le site web [Have I Been Pwned](https://haveibeenpwned.com) vous permet de vérifier si vos comptes ont été impliqués dans des fuites de données publiques. Si c'est le cas, **changez immédiatement ces mots de passe**. Utiliser des mots de passe uniques pour chaque compte réduit le risque que des pirates informatiques aient accès à tous vos comptes si l'un de vos mots de passe est compromis.

### Utiliser un gestionnaire de mots de passe {#use-password-manager}

<Alert variant="update">
<AlertEmoji text=":bulb:"/>
<AlertContent>
<AlertDescription>
    L'utilisation d'un gestionnaire de mots de passe se charge de créer des mots de passe forts et uniques, et de s'en souvenir pour vous ! Nous vous recommandons <strong>fortement</strong> d'en utiliser un, et la plupart d'entre eux sont gratuits !
</AlertDescription>
</AlertContent>
</Alert>

Se souvenir de mots de passe forts et uniques pour chaque compte que vous avez n'est pas idéal. Un gestionnaire de mots de passe offre un stockage sécurisé et chiffré pour tous vos mots de passe auxquels vous pouvez accéder par un seul mot de passe maître fort. Ils suggèrent également des mots de passe forts lors de l'inscription à un nouveau service, de sorte que vous n'ayez pas à créer le vôtre. De nombreux gestionnaires de mots de passe vous diront également si vous avez été impliqué dans une violation de données, vous permettant de modifier les mots de passe avant toute attaque malveillante.

![Exemple d'utilisation d'un gestionnaire de mots de passe](./passwordManager.png)

#### Essayez un gestionnaire de mots de passe : {#try-password-manager}

- [Bitwarden](https://bitwarden.com/)
- [KeePass](https://keepass.info/)
- [1Password](https://1password.com/)
- Ou consultez d'autres [gestionnaires de mots de passe recommandés](https://www.privacytools.io/secure-password-manager)

### Utiliser l'authentification à deux facteurs {#two-factor-authentication}

Il vous sera peut-être quelques fois demandé d'authentifier votre identité aux moyens de preuves uniques. Ceux-ci sont appelés des **facteurs**. Les trois principaux facteurs sont :

- Quelque chose que vous connaissez (comme un mot de passe ou une question de sécurité)
- Quelque chose que vous êtes (comme une empreinte digitale ou un scanner iris/facial)
- Quelque chose que vous possédez (une clé de sécurité ou une application d'authentification sur votre téléphone)

L'utilisation de l'**authentification à deux facteurs (A2F)** offre un _facteur de sécurité_ supplémentaire pour vos comptes en ligne. Une 2FA assure qu'avoir simplement votre mot de passe n'est pas suffisant pour accéder à un compte. Le plus souvent, le deuxième facteur est un code aléatoire à 6 chiffres, connu sous le nom de **mot de passe à usage unique basé sur le temps (TOTP)**, auquel vous pouvez accéder via une application d'authentification telle que Google Authenticator ou Authy. Cette méthode est un facteur « Que vous possédez », car la clé racine qui génére les code temporaires est stocké sur votre appareil.

<Alert variant="update">
<AlertEmoji text=":lock:"/>
<AlertContent>
<AlertDescription>
    Remarque : l'utilisation de l'A2F par SMS est vulnérable au <a href="https://www.vice.com/en/article/3kx4ej/sim-jacking-mobile-phone-fraud">piratage de la carte SIM (SIM jacking)</a> et n'est pas sécurisée. Pour une sécurité optimale, utilisez un service comme <a href="https://mashable.com/article/how-to-set-up-google-authenticator">Google Authenticator</a> ou <a href="https://authy.com/">Authy</a>.
</AlertDescription>
</AlertContent>
</Alert>

#### Clés de sécurité {#security-keys}

Une clé de sécurité est une 2FA plus avancée et plus sécurisée. Les clés de sécurité sont des systèmes d'authentification matériels physiques, qui fonctionnent comme les solutions d'authentification logicielles. Utiliser une clé de sécurité est la solution 2FA la plus sécurisée. Beaucoup de ces clés utilisent la norme universelle d'authentification à deux facteurs (U2F), FIDO. [En savoir plus sur FIDO U2F](https://www.yubico.com/resources/glossary/fido-u2f/).

En savoir plus sur la 2FA :

<YouTube id="m8jlnZuV1i4" start="3479" />

### Désinstaller les extensions de navigateur {#uninstall-browser-extensions}

Les extensions de navigateur, comme les extensions de Chrome ou les modules complémentaires de Firefox, peuvent améliorer les fonctionnalités du navigateur, mais comportent également certains risques. Par défaut, la plupart des extensions des navigateurs demandent un accès avec des droits de « lecture et écriture », leur permettant de faire presque tout de vos données. Les extensions Chrome se mettent à jours automatiquement, ainsi les mises à jours peuvent introduire un code malicieux sur une extension auparavant sûre. La plupart des extensions des navigateurs ne cherchent pas à voler vos données, mais c'est un risque à prendre en compte.

#### Restez en sécurité en : {#browser-extension-safety}

- N'installer que des extensions d'éditeurs de confiance
- Désinstaller les extensions de navigateur non-utilisées
- Installez les extensions Chrome localement pour arrêter la mise à jour automatique (Avancé)

[En savoir plus sur les risques liés aux extensions de navigateur](https://www.kaspersky.co.uk/blog/browser-extensions-security/12750/)

<Divider />

## En savoir plus {#further-reading}

### Sécurité Web {#reading-web-security}

- [Jusqu'à 3 millions d'appareils infectés par des logiciels malveillants via des modules complémentaires pour Chrome et Edge](https://arstechnica.com/information-technology/2020/12/up-to-3-million-devices-infected-by-malware-laced-chrome-and-edge-add-ons/) - _Dan Goodin_
- [Comment créer un mot de passe fort — que vous n’oublierez pas](https://www.avg.com/en/signal/how-to-create-a-strong-password-that-you-wont-forget) - _AVG_
- [Qu'est-ce qu'une clé de sécurité ?](https://help.coinbase.com/en/coinbase/getting-started/verify-my-account/security-keys-faq) - _Coinbase_

### Sécurité des cryptos {#reading-crypto-security}

- [Se protéger et protéger ses fonds](https://support.mycrypto.com/staying-safe/protecting-yourself-and-your-funds) - _MyCrypto_
- [Problèmes de sécurité dans les logiciels de communication crypto courants](https://docs.salusec.io/untitled/web3-penetration-test/risks-in-social-media) - _Salus_
- [Guide de sécurité pour les nuls et les personnes intelligentes aussi](https://medium.com/mycrypto/mycryptos-security-guide-for-dummies-and-smart-people-too-ab178299c82e) - _MyCrypto_
- [Sécurité crypto : Mots de passe et authentification](https://www.youtube.com/watch?v=m8jlnZuV1i4) - _Andreas M. Antonopoulos_

### Sensibilisation aux arnaques {#reading-scam-education}

- [Guide : Comment identifier les jetons frauduleux](/guides/how-to-id-scam-tokens/)
- [Rester en sécurité : arnaques courantes](https://support.mycrypto.com/staying-safe/common-scams) - _MyCrypto_
- [Éviter les arnaques](https://bitcoin.org/en/scams) - _Bitcoin.org_
- [Fil de discussion Twitter sur les e-mails et messages d'hameçonnage crypto courants](https://twitter.com/tayvano_/status/1516225457640787969) - _Taylor Monahan_

<QuizWidget quizKey="security" />
