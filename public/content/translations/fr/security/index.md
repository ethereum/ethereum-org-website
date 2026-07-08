---
title: Sécurité sur Ethereum et prévention des arnaques
description: Rester en sécurité sur Ethereum
lang: fr
---

L'intérêt croissant pour la cryptomonnaie s'accompagne d'un risque grandissant lié aux arnaqueurs et aux pirates informatiques. Cet article présente quelques bonnes pratiques pour atténuer ces risques.

**N'oubliez pas : personne d'ethereum.org ne vous contactera jamais. Ne répondez pas aux e-mails prétendant provenir de l'assistance officielle d'Ethereum.**

<Divider />

## Les bases de la sécurité crypto {#crypto-security}

### Améliorez vos connaissances {#level-up-your-knowledge}

Les malentendus sur le fonctionnement de la crypto peuvent entraîner des erreurs coûteuses. Par exemple, si quelqu'un prétend être un agent du service client capable de restituer des ETH perdus en échange de vos clés privées, il s'attaque aux personnes qui ne comprennent pas qu'[Ethereum](/) est un réseau décentralisé dépourvu de ce type de fonctionnalité. Vous informer sur le fonctionnement d'Ethereum est un investissement rentable.

<DocLink href="/what-is-ethereum/">
  Qu'est-ce qu'Ethereum ?
</DocLink>

<DocLink href="/what-is-ether/">
  Qu'est-ce que l'ether ?
</DocLink>
<Divider />

## Sécurité du portefeuille {#wallet-security}

### Ne partagez jamais votre phrase de récupération {#protect-private-keys}

**Ne partagez jamais, sous aucun prétexte, votre phrase de récupération ou vos clés privées !**

Votre phrase de récupération (également appelée phrase de récupération secrète ou phrase secrète) est la clé maîtresse de votre portefeuille. Quiconque la possède peut accéder à tous vos comptes et vider chaque actif. Les clés privées fonctionnent de la même manière pour les comptes individuels. Aucun service légitime, agent d'assistance ou site web ne vous les demandera jamais.

<DocLink href="/wallets/">
  Qu'est-ce qu'un portefeuille Ethereum ?
</DocLink>

#### Ne prenez pas de captures d'écran de vos phrases secrètes/clés privées {#screenshot-private-keys}

Prendre des captures d'écran de vos phrases secrètes ou de vos clés privées pourrait les synchroniser avec un fournisseur de données cloud, ce qui pourrait les rendre accessibles aux pirates informatiques. L'obtention de clés privées à partir du cloud est un vecteur d'attaque courant pour les pirates.

### Utilisez un portefeuille matériel {#use-hardware-wallet}

Un portefeuille matériel offre un stockage hors ligne pour les clés privées. Ils sont considérés comme l'option de portefeuille la plus sécurisée pour stocker vos clés privées : votre clé privée n'est jamais en contact avec Internet et reste entièrement locale sur votre appareil.

Conserver les clés privées hors ligne réduit considérablement le risque de piratage, même si un pirate prend le contrôle de votre ordinateur.

#### Essayez un portefeuille matériel : {#try-hardware-wallet}

- [Ledger](https://www.ledger.com/)
- [Trezor](https://trezor.io/)

### Vérifiez deux fois les transactions avant de les envoyer {#double-check-transactions}

Envoyer accidentellement de la crypto à la mauvaise adresse de portefeuille est une erreur courante. **Une transaction envoyée sur Ethereum est irréversible.** À moins que vous ne connaissiez le propriétaire de l'adresse et que vous puissiez le convaincre de vous renvoyer vos fonds, vous ne pourrez pas les récupérer.

Assurez-vous toujours que l'adresse à laquelle vous envoyez correspond exactement à l'adresse du destinataire souhaité avant d'envoyer une transaction.
Il est de bonne pratique, lors de l'interaction avec un contrat intelligent, de lire le message de la transaction avant de signer.

### Définissez des limites de dépenses pour les contrats intelligents {#spend-limits}

Lors de l'interaction avec des contrats intelligents, n'autorisez pas de limites de dépenses illimitées. Une dépense illimitée pourrait permettre au contrat intelligent de vider votre portefeuille. Au lieu de cela, définissez des limites de dépenses uniquement au montant nécessaire pour la transaction.

De nombreux portefeuilles Ethereum offrent une protection par limites pour éviter que les comptes ne soient vidés.

[Comment révoquer l'accès d'un contrat intelligent à vos fonds crypto](/guides/how-to-revoke-token-access/)

<Divider />

## Arnaques courantes {#common-scams}

Il est impossible d'arrêter complètement les arnaqueurs, mais nous pouvons les rendre moins efficaces en connaissant leurs techniques les plus utilisées. Il existe de nombreuses variantes de ces arnaques, mais elles suivent généralement les mêmes schémas globaux. Si vous ne devez retenir qu'une chose :

- soyez toujours sceptique
- personne ne vous donnera d'ETH gratuitement ou à prix réduit
- personne n'a besoin d'accéder à vos clés privées ou à vos informations personnelles

### Hameçonnage via les publicités Twitter {#ad-phishing}

![Twitter link phishing](./twitterPhishingScam.png)

Il existe une méthode pour usurper la fonctionnalité d'aperçu de lien de Twitter (également connu sous le nom de X) afin de tromper potentiellement les utilisateurs en leur faisant croire qu'ils visitent un site web légitime. Cette technique exploite le mécanisme de Twitter pour générer des aperçus des URL partagées dans les tweets, et affiche _from ethereum.org_ par exemple (illustré ci-dessus), alors qu'en réalité ils sont redirigés vers un site malveillant.

Vérifiez toujours que vous êtes sur le bon domaine, en particulier après avoir cliqué sur un lien.

[Plus d'informations ici](https://harrydenley.com/faking-twitter-unfurling).

### Arnaque aux cadeaux (Giveaway) {#giveaway}

L'une des arnaques les plus courantes dans la cryptomonnaie est l'arnaque aux cadeaux. L'arnaque aux cadeaux peut prendre de nombreuses formes, mais l'idée générale est que si vous envoyez des ETH à l'adresse de portefeuille fournie, vous recevrez vos ETH en retour mais doublés. *Pour cette raison, elle est également connue sous le nom d'arnaque 2 pour 1.*

Ces arnaques stipulent généralement un temps limité pour réclamer le cadeau afin de créer un faux sentiment d'urgence.

### Piratages de réseaux sociaux {#social-media-hacks}

Une version très médiatisée de ce phénomène s'est produite en juillet 2020, lorsque les comptes Twitter de célébrités et d'organisations de premier plan ont été piratés. Le pirate a simultanément publié un cadeau en Bitcoin sur les comptes piratés. Bien que les tweets trompeurs aient été rapidement remarqués et supprimés, les pirates ont tout de même réussi à s'enfuir avec 11 bitcoins (soit 500 000 $ en septembre 2021).

![A scam on Twitter](./appleTwitterScam.png)

### Cadeaux de célébrités {#celebrity-giveaway}

Le cadeau de célébrité est une autre forme courante que prend l'arnaque aux cadeaux. Les arnaqueurs prennent une interview vidéo enregistrée ou une conférence donnée par une célébrité et la diffusent en direct sur YouTube - donnant l'impression que la célébrité donne une interview vidéo en direct approuvant un cadeau en cryptomonnaie.

Vitalik Buterin est le plus souvent utilisé dans cette arnaque, mais de nombreuses autres personnalités de premier plan impliquées dans la crypto sont également utilisées (par exemple, Elon Musk ou Charles Hoskinson). L'inclusion d'une personne bien connue donne au flux en direct des arnaqueurs un sentiment de légitimité (cela a l'air louche, mais Vitalik est impliqué, donc ça doit être bon !).

**Les cadeaux sont toujours des arnaques. Si vous envoyez vos fonds sur ces comptes, vous les perdrez pour toujours.**

![A scam on YouTube](./youtubeScam.png)

### Arnaques à l'assistance {#support-scams}

La cryptomonnaie est une technologie relativement jeune et mal comprise. Une arnaque courante qui en tire parti est l'arnaque à l'assistance, où les arnaqueurs se font passer pour le personnel d'assistance de portefeuilles, d'échanges ou de blockchains populaires.

Une grande partie des discussions sur Ethereum a lieu sur Discord. Les arnaqueurs à l'assistance trouvent généralement leur cible en recherchant des questions d'assistance dans les canaux Discord publics, puis en envoyant à la personne qui pose la question un message privé proposant de l'aide. En instaurant la confiance, les arnaqueurs à l'assistance essaient de vous inciter à révéler vos clés privées ou à envoyer vos fonds vers leurs portefeuilles.

![A support scam on Discord](./discordScam.png)

En règle générale, le personnel ne communiquera jamais avec vous par des canaux privés et non officiels. Quelques éléments simples à garder à l'esprit lorsque vous traitez avec l'assistance :

- Ne partagez jamais vos clés privées, phrases secrètes ou mots de passe
- N'autorisez jamais personne à accéder à distance à votre ordinateur
- Ne communiquez jamais en dehors des canaux désignés d'une organisation

<Alert variant="update">
<AlertEmoji text=":lock:"/>
<AlertContent>
<AlertDescription>
    Attention : bien que les arnaques de type assistance se produisent couramment sur Discord, elles peuvent également être répandues sur toutes les applications de chat où des discussions sur la crypto ont lieu, y compris par e-mail.
</AlertDescription>
</AlertContent>
</Alert>

### Arnaque au jeton « Eth2 » {#eth2-token-scam}

À l'approche de [La Fusion](/roadmap/merge/), les arnaqueurs ont profité de la confusion autour du terme « Eth2 » pour essayer d'amener les utilisateurs à échanger leurs ETH contre un jeton « ETH2 ». Il n'y a pas d'« ETH2 », et aucun autre jeton légitime n'a été introduit avec La Fusion. L'ETH que vous possédiez avant La Fusion est le même ETH maintenant. Il n'y a **aucune action à entreprendre concernant vos ETH pour tenir compte du passage de la preuve de travail (PoW) à la preuve d'enjeu (PoS)**.

Les arnaqueurs peuvent se présenter comme une « assistance », vous disant que si vous déposez vos ETH, vous recevrez en retour des « ETH2 ». Il n'y a pas d'[assistance officielle d'Ethereum](/community/support/), et il n'y a pas de nouveau jeton. Ne partagez jamais la phrase secrète de votre portefeuille avec qui que ce soit.

_Remarque : Il existe des jetons/symboles dérivés qui peuvent représenter des ETH stakés (c'est-à-dire rETH de Rocket Pool, stETH de Lido, ETH2 de Coinbase), mais ce ne sont pas des éléments vers lesquels vous devez « migrer »._

### Arnaques par hameçonnage {#phishing-scams}

Les arnaques par hameçonnage sont un autre angle de plus en plus courant que les arnaqueurs utiliseront pour tenter de voler les fonds de votre portefeuille.

Certains e-mails d'hameçonnage demandent aux utilisateurs de cliquer sur des liens qui les redirigeront vers des sites web d'imitation, leur demandant d'entrer leur phrase secrète, de réinitialiser leur mot de passe ou d'envoyer des ETH. D'autres peuvent vous demander d'installer à votre insu des logiciels malveillants pour infecter votre ordinateur et donner aux arnaqueurs accès aux fichiers de votre ordinateur.

Si vous recevez un e-mail d'un expéditeur inconnu, n'oubliez pas :

- N'ouvrez jamais un lien ou une pièce jointe provenant d'adresses e-mail que vous ne reconnaissez pas
- Ne divulguez jamais vos informations personnelles ou vos mots de passe à qui que ce soit
- Supprimez les e-mails d'expéditeurs inconnus

[En savoir plus sur la façon d'éviter les arnaques par hameçonnage](https://support.mycrypto.com/staying-safe/mycrypto-protips-how-not-to-get-scammed-during-ico)

### Arnaques aux courtiers en trading crypto {#broker-scams}

Les faux courtiers en trading crypto prétendent être des courtiers spécialisés en cryptomonnaie qui vous proposeront de prendre votre argent et d'investir en votre nom. Une fois que l'arnaqueur a reçu vos fonds, il peut vous mener en bateau, vous demandant d'envoyer plus de fonds, afin que vous ne manquiez pas d'autres gains d'investissement, ou il peut disparaître complètement.

Ces fraudeurs trouvent souvent des cibles en utilisant de faux comptes sur YouTube pour entamer des conversations apparemment naturelles sur le « courtier ». Ces conversations sont souvent très votées pour accroître leur légitimité, mais les votes positifs proviennent tous de comptes de robots.

**Ne faites pas confiance à des inconnus sur Internet pour investir en votre nom. Vous perdrez votre crypto.**

![A trading broker scam on YouTube](./brokerScam.png)

### Arnaques aux pools de minage crypto {#mining-pool-scams}

Depuis septembre 2022, le minage sur Ethereum n'est plus possible. Cependant, les arnaques aux pools de minage existent toujours. Les arnaques aux pools de minage impliquent des personnes qui vous contactent sans que vous l'ayez sollicité et prétendent que vous pouvez obtenir des rendements importants en rejoignant un pool de minage Ethereum. L'arnaqueur fera des promesses et restera en contact avec vous aussi longtemps qu'il le faudra. Essentiellement, l'arnaqueur essaiera de vous convaincre que lorsque vous rejoignez un pool de minage Ethereum, votre cryptomonnaie sera utilisée pour créer des ETH et que vous recevrez des dividendes en ETH. Vous verrez alors que votre cryptomonnaie génère de petits rendements. C'est simplement pour vous appâter et vous inciter à investir davantage. Finalement, tous vos fonds seront envoyés à une adresse inconnue, et l'arnaqueur disparaîtra ou, dans certains cas, continuera à rester en contact comme cela s'est produit dans une affaire récente.

En résumé : méfiez-vous des personnes qui vous contactent sur les réseaux sociaux pour vous demander de faire partie d'un pool de minage. Une fois que vous perdez votre crypto, elle est perdue à jamais.

Quelques points à retenir :

- Méfiez-vous de quiconque vous contacte au sujet de moyens de gagner de l'argent avec votre crypto
- Faites vos recherches sur le staking, les pools de liquidité ou d'autres moyens d'investir votre crypto
- Ces stratagèmes sont rarement, voire jamais, légitimes. S'ils l'étaient, ils seraient probablement grand public et vous en auriez entendu parler.

[Un homme perd 200 000 $ dans une arnaque au pool de minage](https://www.reddit.com/r/CoinBase/comments/r0qe0e/scam_or_possible_incredible_payout/)

### Arnaques aux airdrops {#airdrop-scams}

Les arnaques aux airdrops impliquent un projet frauduleux qui effectue un airdrop d'un actif (NFT, jeton) dans votre portefeuille et vous envoie vers un site web frauduleux pour réclamer l'actif de l'airdrop. Vous serez invité à vous connecter avec votre portefeuille Ethereum et à « approuver » une transaction lors de votre tentative de réclamation. Cette transaction compromet votre compte en envoyant vos clés publiques et privées à l'arnaqueur. Une forme alternative de cette arnaque peut vous amener à confirmer une transaction qui envoie des fonds sur le compte de l'arnaqueur.

[En savoir plus sur les arnaques aux airdrops](https://www.youtube.com/watch?v=LLL_nQp1lGk)

<Divider />

## Les bases de la sécurité web {#web-security}

### Utilisez des mots de passe forts {#use-strong-passwords}

[Plus de 80 % des piratages de comptes sont le résultat de mots de passe faibles ou volés](https://cloudnine.com/ediscoverydaily/electronic-discovery/80-percent-hacking-related-breaches-related-password-issues-cybersecurity-trends/). Une longue combinaison de caractères, de chiffres et de symboles aidera à sécuriser vos comptes.

Une erreur courante consiste à utiliser une combinaison de quelques mots courants et liés. Les mots de passe de ce type ne sont pas sécurisés car ils sont vulnérables à une technique de piratage appelée attaque par dictionnaire.

```md
Exemple de mot de passe faible : MignonsChatonsPeluches!

Exemple de mot de passe fort : ymv\*azu.EAC8eyp8umf
```

Une autre erreur courante consiste à utiliser des mots de passe qui peuvent être facilement devinés ou découverts par [ingénierie sociale](<https://wikipedia.org/wiki/Social_engineering_(security)>). Inclure le nom de jeune fille de votre mère, le nom de vos enfants ou de vos animaux de compagnie, ou des dates de naissance dans votre mot de passe augmentera le risque de vous faire pirater.

#### Bonnes pratiques en matière de mots de passe : {#good-password-practices}

- Rendez les mots de passe aussi longs que le permettent votre générateur de mots de passe ou le formulaire que vous remplissez
- Utilisez un mélange de majuscules, de minuscules, de chiffres et de symboles
- N'utilisez pas de détails personnels, tels que des noms de famille, dans votre mot de passe
- Évitez les mots courants

[En savoir plus sur la création de mots de passe forts](https://terranovasecurity.com/how-to-create-a-strong-password-in-7-easy-steps/)

### Utilisez des mots de passe uniques pour tout {#use-unique-passwords}

Un mot de passe fort qui a été révélé lors d'une violation de données n'est plus un mot de passe fort. Le site web [Have I Been Pwned](https://haveibeenpwned.com) vous permet de vérifier si vos comptes ont été impliqués dans des violations de données publiques. Si c'est le cas, **changez ces mots de passe immédiatement**. L'utilisation de mots de passe uniques pour chaque compte réduit le risque que des pirates accèdent à tous vos comptes si l'un de vos mots de passe est compromis.

### Utilisez un gestionnaire de mots de passe {#use-password-manager}

<Alert variant="update">
<AlertEmoji text=":bulb:"/>
<AlertContent>
<AlertDescription>
    L'utilisation d'un gestionnaire de mots de passe se charge de créer des mots de passe forts et uniques et de s'en souvenir ! Nous vous recommandons <strong>fortement</strong> d'en utiliser un, et la plupart d'entre eux sont gratuits !
</AlertDescription>
</AlertContent>
</Alert>

Se souvenir de mots de passe forts et uniques pour chaque compte que vous possédez n'est pas idéal. Un gestionnaire de mots de passe offre un stockage sécurisé et crypté pour tous vos mots de passe auquel vous pouvez accéder via un mot de passe maître fort. Ils suggèrent également des mots de passe forts lors de l'inscription à un nouveau service, vous n'avez donc pas à créer le vôtre. De nombreux gestionnaires de mots de passe vous diront également si vous avez été impliqué dans une violation de données, vous permettant de modifier les mots de passe avant toute attaque malveillante.

![Example of using a password manager](./passwordManager.png)

#### Essayez un gestionnaire de mots de passe : {#try-password-manager}

- [Bitwarden](https://bitwarden.com/)
- [KeePass](https://keepass.info/)
- [1Password](https://1password.com/)
- Ou consultez d'autres [gestionnaires de mots de passe recommandés](https://www.privacytools.io/secure-password-manager)

### Utilisez l'authentification à deux facteurs {#two-factor-authentication}

Il peut parfois vous être demandé d'authentifier votre identité au moyen de preuves uniques. Celles-ci sont connues sous le nom de **facteurs**. Les trois principaux facteurs sont :

- Quelque chose que vous connaissez (comme un mot de passe ou une question de sécurité)
- Quelque chose que vous êtes (comme une empreinte digitale ou un scanner de l'iris/facial)
- Quelque chose que vous possédez (une clé de sécurité ou une application d'authentification sur votre téléphone)

L'utilisation de l'**authentification à deux facteurs (2FA)** fournit un *facteur de sécurité* supplémentaire pour vos comptes en ligne. La 2FA garantit que le simple fait d'avoir votre mot de passe ne suffit pas pour accéder à un compte. Le plus souvent, le deuxième facteur est un code aléatoire à 6 chiffres, connu sous le nom de **mot de passe à usage unique basé sur le temps (TOTP)**, auquel vous pouvez accéder via une application d'authentification telle que Google Authenticator ou Authy. Ceux-ci fonctionnent comme un facteur « quelque chose que vous possédez » car la graine qui génère le code chronométré est stockée sur votre appareil.

<Alert variant="update">
<AlertEmoji text=":lock:"/>
<AlertContent>
<AlertDescription>
    Remarque : L'utilisation de la 2FA par SMS est vulnérable au <a href="https://www.vice.com/en/article/3kx4ej/sim-jacking-mobile-phone-fraud">SIM jacking</a> et n'est pas sécurisée. Pour une sécurité optimale, utilisez un service comme <a href="https://mashable.com/article/how-to-set-up-google-authenticator">Google Authenticator</a> ou <a href="https://authy.com/">Authy</a>.
</AlertDescription>
</AlertContent>
</Alert>

#### Clés de sécurité {#security-keys}

Une clé de sécurité est un type de 2FA plus avancé et plus sécurisé. Les clés de sécurité sont des dispositifs d'authentification matériels physiques qui fonctionnent comme des applications d'authentification. L'utilisation d'une clé de sécurité est le moyen le plus sûr d'utiliser la 2FA. Beaucoup de ces clés utilisent la norme FIDO Universal 2nd Factor (U2F). [En savoir plus sur FIDO U2F](https://www.yubico.com/resources/glossary/fido-u2f/).

En savoir plus sur la 2FA :

<VideoWatch slug="crypto-security-passwords" startTime="3479" />

### Désinstallez les extensions de navigateur {#uninstall-browser-extensions}

Les extensions de navigateur, comme les extensions Chrome ou les modules complémentaires pour Firefox, peuvent améliorer les fonctionnalités du navigateur mais comportent également des risques. Par défaut, la plupart des extensions de navigateur demandent l'accès pour « lire et modifier les données du site », ce qui leur permet de faire presque n'importe quoi avec vos données. Les extensions Chrome sont toujours mises à jour automatiquement, de sorte qu'une extension auparavant sûre peut se mettre à jour ultérieurement pour inclure du code malveillant. La plupart des extensions de navigateur n'essaient pas de voler vos données, mais vous devez être conscient qu'elles le peuvent.

#### Restez en sécurité en : {#browser-extension-safety}

- N'installant que des extensions de navigateur provenant de sources fiables
- Supprimant les extensions de navigateur inutilisées
- Installant les extensions Chrome localement pour arrêter la mise à jour automatique (Avancé)

[En savoir plus sur les risques liés aux extensions de navigateur](https://www.kaspersky.co.uk/blog/browser-extensions-security/12750/)

<Divider />

## Lectures complémentaires {#further-reading}

### Sécurité web {#reading-web-security}

- [Jusqu'à 3 millions d'appareils infectés par des modules complémentaires Chrome et Edge contenant des logiciels malveillants](https://arstechnica.com/information-technology/2020/12/up-to-3-million-devices-infected-by-malware-laced-chrome-and-edge-add-ons/) - _Dan Goodin_
- [Comment créer un mot de passe fort — que vous n'oublierez pas](https://www.avg.com/en/signal/how-to-create-a-strong-password-that-you-wont-forget) - _AVG_
- [Qu'est-ce qu'une clé de sécurité ?](https://help.coinbase.com/en/coinbase/getting-started/verify-my-account/security-keys-faq) - _Coinbase_

### Sécurité crypto {#reading-crypto-security}

- [Vous protéger, vous et vos fonds](https://support.mycrypto.com/staying-safe/protecting-yourself-and-your-funds) - _MyCrypto_
- [Problèmes de sécurité dans les logiciels de communication crypto courants](https://docs.salusec.io/untitled/web3-penetration-test/risks-in-social-media) - _Salus_
- [Guide de sécurité pour les nuls et les personnes intelligentes aussi](https://medium.com/mycrypto/mycryptos-security-guide-for-dummies-and-smart-people-too-ab178299c82e) - _MyCrypto_
- [Sécurité crypto : mots de passe et authentification](https://www.youtube.com/watch?v=m8jlnZuV1i4) - _Andreas M. Antonopoulos_

### Éducation sur les arnaques {#reading-scam-education}

- [Guide : Comment identifier les jetons frauduleux](/guides/how-to-id-scam-tokens/)
- [Rester en sécurité : arnaques courantes](https://support.mycrypto.com/staying-safe/common-scams) - _MyCrypto_
- [Éviter les arnaques](https://bitcoin.org/en/scams) - _Bitcoin.org_
- [Fil Twitter sur les e-mails et messages d'hameçonnage crypto courants](https://twitter.com/tayvano_/status/1516225457640787969) - _Taylor Monahan_

<QuizWidget quizKey="security" />