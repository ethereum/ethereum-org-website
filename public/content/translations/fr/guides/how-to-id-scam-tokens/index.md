---
title: Comment identifier les jetons frauduleux
description: Comprendre les jetons frauduleux, comment ils se font passer pour légitimes et comment les éviter.
lang: fr
---

L'une des utilisations les plus courantes d'Ethereum est la création par un groupe d'un jeton échangeable, en quelque sorte leur propre monnaie. Ces jetons suivent généralement un standard, [ERC-20](/developers/docs/standards/tokens/erc-20/). Cependant, partout où il y a des cas d'utilisation légitimes qui apportent de la valeur, il y a aussi des criminels qui tentent de voler cette valeur pour eux-mêmes.

Il y a deux façons dont ils sont susceptibles de vous tromper :

- **En vous vendant un jeton frauduleux**, qui peut ressembler au jeton légitime que vous souhaitez acheter, mais qui est émis par les escrocs et ne vaut rien.
- **En vous incitant à signer de mauvaises transactions**, généralement en vous dirigeant vers leur propre interface utilisateur. Ils pourraient essayer de vous amener à accorder à leurs contrats une allocation sur vos jetons ERC-20, exposant ainsi des informations sensibles qui leur donnent accès à vos actifs, etc. Ces interfaces utilisateur peuvent être des clones presque parfaits de sites honnêtes, mais avec des pièges cachés.

Pour illustrer ce que sont les jetons frauduleux et comment les identifier, nous allons en examiner un exemple : [`wARB`](https://eth.blockscout.com/token/0xB047c8032b99841713b8E3872F06cF32beb27b82). Ce jeton tente de ressembler au jeton légitime [`ARB`](https://eth.blockscout.com/address/0xb50721bcf8d664c30412cfbc6cf7a15145234ad1).

<ExpandableCard
title="Qu'est-ce que l'ARB ?"
contentPreview=''>

Arbitrum est une organisation qui développe et gère des [rollups optimistes](/developers/docs/scaling/optimistic-rollups/). Initialement, Arbitrum était organisée comme une entreprise à but lucratif, mais a ensuite pris des mesures pour se décentraliser. Dans le cadre de ce processus, ils ont émis un [jeton de gouvernance](/dao/#token-based-membership) échangeable.

</ExpandableCard>

<ExpandableCard
title="Pourquoi le jeton frauduleux s'appelle-t-il wARB ?"
contentPreview=''>

Il existe une convention sur Ethereum selon laquelle, lorsqu'un actif n'est pas conforme à la norme ERC-20, nous en créons une version « enveloppée » dont le nom commence par « w ». Ainsi, par exemple, nous avons le wBTC pour le bitcoin et le <a href="https://cointelegraph.com/news/what-is-wrapped-ethereum-weth-and-how-does-it-work">wETH pour l'ether</a>.

Il n'est pas logique de créer une version enveloppée d'un jeton ERC-20 qui est déjà sur Ethereum, mais les escrocs s'appuient sur l'apparence de légitimité plutôt que sur la réalité sous-jacente.

</ExpandableCard>

## Comment fonctionnent les jetons frauduleux ? {#how-do-scam-tokens-work}

L'intérêt principal d'Ethereum est la décentralisation. Cela signifie qu'il n'y a pas d'autorité centrale qui puisse confisquer vos actifs ou vous empêcher de déployer un contrat intelligent. Mais cela signifie également que les escrocs peuvent déployer n'importe quel contrat intelligent qu'ils souhaitent.

<ExpandableCard
title="Que sont les contrats intelligents ?"
contentPreview=''>

Les [contrats intelligents](/developers/docs/smart-contracts/) sont les programmes qui s'exécutent sur la chaîne de blocs Ethereum. Chaque jeton ERC-20, par exemple, est implémenté sous la forme d'un contrat intelligent.

</ExpandableCard>

Plus précisément, Arbitrum a déployé un contrat qui utilise le symbole `ARB`. Mais cela n'empêche pas d'autres personnes de déployer également un contrat qui utilise exactement le même symbole, ou un symbole similaire. Quiconque écrit le contrat peut définir ce que le contrat fera.

## Paraître légitime {#appearing-legitimate}

Les créateurs de jetons frauduleux utilisent plusieurs astuces pour paraître légitimes.

- **Nom et symbole légitimes**. Comme mentionné précédemment, les contrats ERC-20 peuvent avoir le même symbole et le même nom que d'autres contrats ERC-20. Vous ne pouvez pas compter sur ces champs pour votre sécurité.

- **Propriétaires légitimes**. Les jetons frauduleux font souvent des airdrops de soldes importants vers des adresses dont on peut s'attendre à ce qu'elles soient des détenteurs légitimes du vrai jeton.

  Par exemple, regardons à nouveau `wARB`. [Environ 16 % des jetons](https://eth.blockscout.com/token/0xb047c8032b99841713b8e3872f06cf32beb27b82?tab=holders) sont détenus par une adresse dont l'étiquette publique est [Arbitrum Foundation: Deployer](https://eth.blockscout.com/address/0x1C8db745ABe3C8162119b9Ef2c13864Cd1FDD72F). Ce n'est _pas_ une fausse adresse, c'est bel et bien l'adresse qui a [déployé le vrai contrat ARB sur le réseau principal Ethereum](https://eth.blockscout.com/tx/0x242b50ab4fe9896cb0439cfe6e2321d23feede7eeceb31aa2dbb46fc06ed2670).

  Étant donné que le solde ERC-20 d'une adresse fait partie du stockage du contrat ERC-20, il peut être défini par le contrat selon les souhaits du développeur du contrat. Il est également possible pour un contrat d'interdire les transferts afin que les utilisateurs légitimes ne puissent pas se débarrasser de ces jetons frauduleux.

- **Transferts légitimes**. _Les propriétaires légitimes ne paieraient pas pour transférer un jeton frauduleux à d'autres, donc s'il y a des transferts, cela doit être légitime, n'est-ce pas ?_ **Faux**. Les événements `Transfer` sont produits par le contrat ERC-20. Un escroc peut facilement écrire le contrat de manière à ce qu'il produise ces actions.

## Sites web frauduleux {#websites}

Les escrocs peuvent également produire des sites web très convaincants, parfois même des clones précis de sites authentiques avec des interfaces utilisateur identiques, mais avec des pièges subtils. Il peut s'agir, par exemple, de liens externes qui semblent légitimes mais qui envoient en réalité l'utilisateur vers un site frauduleux externe, ou d'instructions incorrectes qui guident l'utilisateur pour qu'il expose ses clés ou envoie des fonds à l'adresse d'un attaquant.

La meilleure pratique pour éviter cela est de vérifier attentivement l'URL des sites que vous visitez et d'enregistrer les adresses des sites authentiques connus dans vos favoris. Ensuite, vous pouvez accéder au vrai site via vos favoris sans faire accidentellement de fautes d'orthographe ou vous fier à des liens externes.

## Comment pouvez-vous vous protéger ? {#protect-yourself}

1. **Vérifiez l'adresse du contrat**. Les jetons légitimes proviennent d'organisations légitimes, et vous pouvez voir les adresses des contrats sur le site web de l'organisation. Par exemple, [pour `ARB`, vous pouvez voir les adresses légitimes ici](https://docs.arbitrum.foundation/deployment-addresses#token).

2. **Les vrais jetons ont de la liquidité**. Une autre option consiste à examiner la taille de la réserve de liquidité sur [Uniswap](https://uniswap.org/), l'un des protocoles d'échange de jetons les plus courants. Ce protocole fonctionne à l'aide de réserves de liquidité, dans lesquelles les investisseurs déposent leurs jetons dans l'espoir d'obtenir un rendement grâce aux frais de transaction.

Les jetons frauduleux ont généralement de minuscules réserves de liquidité, voire aucune, car les escrocs ne veulent pas risquer de vrais actifs. Par exemple, la réserve Uniswap `ARB`/`ETH` détient environ un million de dollars ([voir ici pour la valeur actualisée](https://app.uniswap.org/explore#/pools/0x755e5a186f0469583bd2e80d1216e02ab88ec6ca)) et l'achat ou la vente d'une petite quantité ne va pas modifier le prix :

![Buying a legitimate token](./uniswap-real.png)

Mais lorsque vous essayez d'acheter le jeton frauduleux `wARB`, même un achat infime modifierait le prix de plus de 90 % :

![Buying a scam token](./uniswap-scam.png)

C'est une autre preuve qui nous montre que `wARB` n'est probablement pas un jeton légitime.

3. **Regardez sur Etherscan**. De nombreux jetons frauduleux ont déjà été identifiés et signalés par la communauté. Ces jetons sont [marqués dans Etherscan](https://info.etherscan.com/etherscan-token-reputation/). Bien qu'Etherscan ne soit pas une source de vérité absolue (c'est la nature des réseaux décentralisés qu'il ne puisse y avoir de source faisant autorité en matière de légitimité), les jetons identifiés par Etherscan comme des arnaques sont très probablement des arnaques.

   ![Scam token in Etherscan](./etherscan-scam.png)

## Conclusion {#conclusion}

Tant qu'il y aura de la valeur dans le monde, il y aura des escrocs qui tenteront de la voler pour eux-mêmes, et dans un monde décentralisé, il n'y a personne pour vous protéger à part vous-même. Espérons que vous vous souviendrez de ces points pour vous aider à distinguer les jetons légitimes des arnaques :

- Les jetons frauduleux se font passer pour des jetons légitimes, ils peuvent utiliser le même nom, le même symbole, etc.
- Les jetons frauduleux _ne peuvent pas_ utiliser la même adresse de contrat.
- La meilleure source pour l'adresse du jeton légitime est l'organisation à qui appartient le jeton.
- À défaut, vous pouvez utiliser des applications populaires et de confiance telles que [Uniswap](https://app.uniswap.org/#/swap) et [Blockscout](https://eth.blockscout.com/).
