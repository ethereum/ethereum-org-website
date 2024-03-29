---
title: Comment identifier les jetons frauduleux
description: Comprendre les jetons frauduleux, comment ils se présentent comme légitimes et comment les éviter.
lang: fr
---

# Comment identifier les jetons frauduleux {#identify-scam-tokens}

Ethereum est couramment utilisé par des groupes pour créer des jetons échangeables ou, dans un certain sens, leur propre monnaie. Ces jetons suivent généralement une norme, [ERC-20](/developers/docs/standards/tokens/erc-20/). Cependant, partout où il existe des cas d'utilisation légitimes qui apportent de la valeur, il y a aussi des criminels qui essaient de voler cette valeur à leur profit.

Ils peuvent vous tromper de deux façons :

- **Vente d'un jeton frauduleux**, qui peut ressembler au jeton légitime que vous souhaitez acheter, mais qui est émis par les escrocs et ne vaut rien.
- **Incitation à signer des transactions frauduleuses**, généralement en vous dirigeant vers leur propre interface utilisateur. Ils pourraient essayer de vous inciter à accorder à leurs contrats une allocation de vos jetons ERC-20, à divulguer des informations sensibles qui leur donneraient accès à vos actifs, etc. Ces interfaces utilisateurs peuvent être des clones presque parfaits de sites honnêtes, mais avec des astuces cachées.

Pour illustrer ce que sont les jetons frauduleux et comment les identifier, nous allons examiner un exemple de jeton frauduleux : [`wARB`](https://etherscan.io/token/0xb047c8032b99841713b8e3872f06cf32beb27b82). Ce jeton tente de ressembler au jeton [`ARB`](https://etherscan.io/address/0xb50721bcf8d664c30412cfbc6cf7a15145234ad1) légitime.

<ExpandableCard
title="Qu'est-ce que ARB?"
contentPreview=''>

Arbitrum est une organisation qui développe et gère des <a href="/developers/docs/scaling/optimistic-rollups/">rollups optimistiques</a>. Au départ, Arbitrum était organisée comme une entreprise à but lucratif, mais elle a ensuite pris des mesures pour se décentraliser. Dans le cadre de ce processus, un <a href="/dao/#token-based-membership">jeton de gouvernance</a> échangeable a été créé.

</ExpandableCard>

<ExpandableCard
title="Pourquoi le token malveillant s'appelle-t-il wARB?"
contentPreview=''>

Il existe une convention dans Ethereum selon laquelle lorsqu'un actif n'est pas conforme à la norme ERC-20, nous créons une version "enveloppée" de cet actif dont le nom commence par "w". Ainsi, par exemple, nous avons wBTC pour le bitcoin et <a href="https://cointelegraph.com/news/what-is-wrapped-ethereum-weth-and-how-does-it-work">wETH pour l'éther</a>.

Il n'est pas logique de créer une version enveloppée d'un jeton ERC-20 déjà présent sur Ethereum, mais les escrocs s'appuient sur l'apparence de légitimité plutôt que sur la réalité sous-jacente.

</ExpandableCard>

## Comment fonctionnent les jetons frauduleux ? {#how-do-scam-tokens-work}

L'objectif d'Ethereum est la décentralisation. Cela signifie qu'il n'y a pas d'autorité centrale qui puisse confisquer vos actifs ou vous empêcher de déployer un contrat intelligent. Mais cela signifie également que les escrocs peuvent déployer n'importe quel contrat intelligent.

<ExpandableCard
title="Qu'est-ce qu'un contrat intelligent ?"
contentPreview=''>

<a href="/developers/docs/smart-contracts/">Les contrats intelligents</a> sont les programmes qui s'exécutent sur la blockchain Ethereum. Chaque jeton ERC-20, par exemple, est implémenté comme contrat intelligent.

</ExpandableCard>

Plus précisément, Arbitrum a déployé un contrat qui utilise le symbole `ARB`. Mais cela n'empêche pas d'autres personnes de déployer un contrat qui utilise exactement le même symbole, ou un symbole similaire. Quiconque rédige le contrat définit son contenu.

## Paraître légitime {#appearing-legitimate}

Les créateurs de jetons frauduleux ont recours à plusieurs astuces pour paraître légitimes.

- **Nom et symbole légitimes**. Comme indiqué précédemment, les contrats ERC-20 peuvent avoir le même symbole et le même nom que d'autres contrats ERC-20. Vous ne pouvez pas compter sur ces champs pour assurer votre sécurité.

- **Propriétaires légitimes**. Les jetons frauduleux créditent souvent des soldes importants à des adresses qui pourraient vraisemblablement détenir des jetons authentiques.

  Par exemple, regardons à nouveau `wARB`. [Environ 16 % des jetons](https://etherscan.io/token/0xb047c8032b99841713b8e3872f06cf32beb27b82?a=0x1c8db745abe3c8162119b9ef2c13864cd1fdd72f) sont détenus par une adresse dont la balise publique est [Arbitrum Foundation: Deployer](https://etherscan.io/address/0x1c8db745abe3c8162119b9ef2c13864cd1fdd72f). Il ne s'agit _pas_ d'une fausse adresse, c'est vraiment l'adresse qui a [déployé le vrai contrat ARB sur Ethereum mainnet](https://etherscan.io/tx/0x242b50ab4fe9896cb0439cfe6e2321d23feede7eeceb31aa2dbb46fc06ed2670).

  Étant donné que le solde ERC-20 d'une adresse fait partie du stockage du contrat ERC-20, il peut être spécifié par le contrat comme étant ce que souhaite le développeur du contrat. Il est également possible qu'un contrat interdise les transferts afin que les utilisateurs légitimes ne puissent pas se débarrasser de ces jetons frauduleux.

- **Transferts légitimes**. _Les propriétaires légitimes ne paieraient pas pour transférer un jeton frauduleux à d'autres, donc s'il y a des transferts, ils doivent être légitimes, n'est-ce pas ? _ **Faux**. Les événements `Transfert` sont produits par le contrat ERC-20. Un escroc peut facilement rédiger le contrat de manière à ce qu'il produise ces actions.

## Sites web frauduleux {#websites}

Les escrocs peuvent également produire des sites web très convaincants, parfois même des clones précis de sites authentiques avec des interfaces utilisateur identiques, mais avec des astuces subtiles. Il peut s'agir, par exemple, de liens externes qui semblent légitimes mais qui renvoient l'utilisateur vers un site frauduleux, ou d'instructions incorrectes qui amènent l'utilisateur à exposer ses clés ou à envoyer des fonds à l'adresse d'un pirate.

Une bonne pratique pour éviter cela est de vérifier soigneusement l'URL des sites que vous visitez et d'enregistrer les adresses de sites authentiques connus dans vos signets. Ensuite, vous pouvez accéder au site réel par le biais de vos signets sans faire accidentellement de fautes d'orthographe ou dépendre de liens externes.

## Comment se protéger ? {#protect-yourself}

1. **Vérifier l'adresse du contrat**. Les jetons légitimes proviennent d'organisations légitimes, et vous pouvez consulter les adresses des contrats sur le site web de l'organisation. Par exemple, [pour `ARB`, vous pouvez consulter les adresses légitimes ici](https://docs.arbitrum.foundation/deployment-addresses#token).

2. **Les jetons réels ont de la liquidité**. Une autre option consiste à examiner la quantité de liquidités disponibles sur [Uniswap](https://uniswap.org/), l'un des protocoles d'échange de jetons les plus courants. Ce protocole utilise des pools de liquidité, dans lesquels les investisseurs déposent leurs jetons dans l'espoir d'un retour sur les frais de transaction.

Les jetons frauduleux ont généralement de minuscules réserves de liquidités, voire aucune, parce que les fraudeurs ne veulent pas risquer des actifs réels. Par exemple, le pool `ARB`/`ETH` Uniswap contient environ un million de dollars ([voir ici pour la valeur à jour](https://info.uniswap.org/#/pools/0x755e5a186f0469583bd2e80d1216e02ab88ec6ca)) et acheter ou vendre une petite quantité ne changera pas le prix :

![Acheter des jetons authentiques](./uniswap-real.png)

Mais lorsque vous essayez d'acheter le jeton frauduleux `wARB`, même un achat minime modifierait le prix de plus de 90 % :

![Acheter des jetons frauduleux](./uniswap-scam.png)

Il s'agit d'un autre élément qui montre que `wARB` n'est probablement pas un jeton légitime.

3. **Regarder sur Etherscan**. De nombreux jetons frauduleux ont déjà été identifiés et signalés par la communauté. Ces jetons sont [marqués sur Etherscan](https://info.etherscan.com/etherscan-token-reputation/). Bien qu'Etherscan ne soit pas une source de vérité faisant autorité (la nature des réseaux décentralisés fait qu'il ne peut y avoir de source de légitimité faisant autorité), les jetons identifiés par Etherscan comme étant frauduleux sont susceptibles de l'être.

   ![Les tokens frauduleux sur Etherscan](./etherscan-scam.png)

## Conclusion {#conclusion}

Tant qu'il y aura de la valeur dans le monde, il y aura des malfaiteurs qui tenteront de s'en emparer, et dans un monde décentralisé, il n'y a personne d'autre que vous-même pour vous protéger. Suivez ces indications pour vous aider à distinguer les jetons légitimes des arnaques :

- Les jetons malveillants imitent des jetons légitimes en utilisant le même nom, symbole, etc.
- Les jetons malveillants _ne peuvent pas_ utiliser la même adresse de contrat.
- La meilleure source pour l'adresse légitime du jeton est l'organisation émettrice dudit jeton.
- À défaut, vous pouvez utiliser des applications populaires et fiables comme [Uniswap](https://app.uniswap.org/#/swap) et [Etherscan](https://etherscan.io/).
