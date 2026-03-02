---
title: Comment identifier les jetons frauduleux
description: "Comprendre les jetons frauduleux, comment ils se présentent comme légitimes et comment les éviter."
lang: fr
---

# Comment identifier les jetons frauduleux {#identify-scam-tokens}

Ethereum est couramment utilisé par des groupes pour créer des jetons échangeables ou, dans un certain sens, leur propre monnaie. Ces jetons suivent généralement une norme, [l'ERC-20](/developers/docs/standards/tokens/erc-20/). Cependant, partout où il existe des cas d'utilisation légitimes qui apportent de la valeur, il y a aussi des criminels qui essaient de voler cette valeur à leur profit.

Ils peuvent vous tromper de deux façons :

- **Vente d'un jeton frauduleux**, qui peut ressembler au jeton légitime que vous souhaitez acheter, mais qui est émis par les escrocs et ne vaut rien.
- **Vous inciter à signer des transactions frauduleuses**, généralement en vous dirigeant vers leur propre interface utilisateur. Ils pourraient essayer de vous inciter à accorder à leurs contrats une allocation de vos jetons ERC-20, à divulguer des informations sensibles qui leur donneraient accès à vos actifs, etc. Ces interfaces utilisateurs peuvent être des clones presque parfaits de sites honnêtes, mais avec des astuces cachées.

Pour illustrer ce que sont les jetons frauduleux et comment les identifier, nous allons examiner un exemple : [`wARB`](https://eth.blockscout.com/token/0xB047c8032b99841713b8E3872F06cF32beb27b82). Ce jeton tente de ressembler au jeton légitime [`ARB`](https://eth.blockscout.com/address/0xb50721bcf8d664c30412cfbc6cf7a15145234ad1).

<ExpandableCard
title="Qu'est-ce que l'ARB ?"
contentPreview=''>

Arbitrum est une organisation qui développe et gère des [optimistic rollups](/developers/docs/scaling/optimistic-rollups/). Au départ, Arbitrum était organisée comme une entreprise à but lucratif, mais elle a ensuite pris des mesures pour se décentraliser. Dans le cadre de ce processus, ils ont émis un [jeton de gouvernance](/dao/#token-based-membership) échangeable.
</ExpandableCard>

<ExpandableCard
title="Pourquoi le jeton frauduleux s'appelle-t-il wARB ?"
contentPreview=''>

Il existe une convention dans Ethereum selon laquelle lorsqu'un actif n'est pas conforme à la norme ERC-20, nous créons une version "enveloppée" de cet actif dont le nom commence par "w". Ainsi, par exemple, nous avons wBTC pour le bitcoin et <a href="https://cointelegraph.com/news/what-is-wrapped-ethereum-weth-and-how-does-it-work">wETH pour l'éther</a>.

Il n'est pas logique de créer une version enveloppée d'un jeton ERC-20 déjà présent sur Ethereum, mais les escrocs s'appuient sur l'apparence de légitimité plutôt que sur la réalité sous-jacente.
</ExpandableCard>

## Comment fonctionnent les jetons frauduleux ? {#how-do-scam-tokens-work}

L'objectif d'Ethereum est la décentralisation. Cela signifie qu'il n'y a pas d'autorité centrale qui puisse confisquer vos actifs ou vous empêcher de déployer un contrat intelligent. Mais cela signifie également que les escrocs peuvent déployer n'importe quel contrat intelligent.

<ExpandableCard
title="Que sont les contrats intelligents ?"
contentPreview=''>

Les [contrats intelligents](/developers/docs/smart-contracts/) sont les programmes qui s'exécutent sur la blockchain Ethereum. Chaque jeton ERC-20, par exemple, est implémenté comme contrat intelligent.
</ExpandableCard>

Plus précisément, Arbitrum a déployé un contrat qui utilise le symbole `ARB`. Mais cela n'empêche pas d'autres personnes de déployer un contrat qui utilise exactement le même symbole, ou un symbole similaire. Quiconque rédige le contrat définit son contenu.

## Apparence de légitimité {#appearing-legitimate}

Les créateurs de jetons frauduleux ont recours à plusieurs astuces pour paraître légitimes.

- **Nom et symbole légitimes**. Comme indiqué précédemment, les contrats ERC-20 peuvent avoir le même symbole et le même nom que d'autres contrats ERC-20. Vous ne pouvez pas compter sur ces champs pour assurer votre sécurité.

- **Propriétaires légitimes**. Les jetons frauduleux créditent souvent des soldes importants à des adresses qui pourraient vraisemblablement détenir des jetons authentiques.

  Par exemple, examinons à nouveau `wARB`. [Environ 16 % des jetons](https://eth.blockscout.com/token/0xb047c8032b99841713b8e3872f06cf32beb27b82?tab=holders) sont détenus par une adresse dont l'étiquette publique est [Arbitrum Foundation: Deployer](https://eth.blockscout.com/address/0x1C8db745ABe3C8162119b9Ef2c13864Cd1FDD72F). Ce n'est _pas_ une fausse adresse, c'est bien l'adresse qui [a déployé le véritable contrat ARB sur le réseau principal d'Ethereum](https://eth.blockscout.com/tx/0x242b50ab4fe9896cb0439cfe6e2321d23feede7eeceb31aa2dbb46fc06ed2670).

  Étant donné que le solde ERC-20 d'une adresse fait partie du stockage du contrat ERC-20, il peut être spécifié par le contrat comme étant ce que souhaite le développeur du contrat. Il est également possible qu'un contrat interdise les transferts afin que les utilisateurs légitimes ne puissent pas se débarrasser de ces jetons frauduleux.

- **Transferts légitimes**. _Les propriétaires légitimes ne paieraient pas pour transférer un jeton frauduleux à d'autres, donc s'il y a des transferts, il doit être légitime, n'est-ce pas ?_ **Faux**. Les événements `Transfer` sont produits par le contrat ERC-20. Un escroc peut facilement rédiger le contrat de manière à ce qu'il produise ces actions.

## Sites web frauduleux {#websites}

Les escrocs peuvent également produire des sites web très convaincants, parfois même des clones précis de sites authentiques avec des interfaces utilisateur identiques, mais avec des astuces subtiles. Il peut s'agir, par exemple, de liens externes qui semblent légitimes mais qui renvoient l'utilisateur vers un site frauduleux, ou d'instructions incorrectes qui amènent l'utilisateur à exposer ses clés ou à envoyer des fonds à l'adresse d'un pirate.

Une bonne pratique pour éviter cela est de vérifier soigneusement l'URL des sites que vous visitez et d'enregistrer les adresses de sites authentiques connus dans vos signets. Ensuite, vous pouvez accéder au site réel par le biais de vos signets sans faire accidentellement de fautes d'orthographe ou dépendre de liens externes.

## Comment se protéger ? {#protect-yourself}

1. **Vérifier l'adresse du contrat**. Les jetons légitimes proviennent d'organisations légitimes, et vous pouvez consulter les adresses des contrats sur le site web de l'organisation. Par exemple, [pour `ARB`, vous pouvez consulter les adresses légitimes ici](https://docs.arbitrum.foundation/deployment-addresses#token).

2. **Les jetons réels ont de la liquidité**. Une autre option consiste à examiner la taille du pool de liquidités sur [Uniswap](https://uniswap.org/), l'un des protocoles d'échange de jetons les plus courants. Ce protocole utilise des pools de liquidité, dans lesquels les investisseurs déposent leurs jetons dans l'espoir d'un retour sur les frais de transaction.

Les jetons frauduleux ont généralement de minuscules réserves de liquidités, voire aucune, parce que les fraudeurs ne veulent pas risquer des actifs réels. Par exemple, le pool Uniswap `ARB`/`ETH` contient environ un million de dollars ([voir ici la valeur à jour](https://app.uniswap.org/explore#/pools/0x755e5a186f0469583bd2e80d1216e02ab88ec6ca)) et l'achat ou la vente d'une petite quantité ne va pas en changer le prix :

![Acheter un jeton légitime](./uniswap-real.png)

Mais lorsque vous essayez d'acheter le jeton frauduleux `wARB`, même un achat minime ferait varier le prix de plus de 90 % :

![Acheter un jeton frauduleux](./uniswap-scam.png)

C'est une preuve supplémentaire qui montre que `wARB` n'est probablement pas un jeton légitime.

3. **Regarder sur Etherscan**. De nombreux jetons frauduleux ont déjà été identifiés et signalés par la communauté. De tels jetons sont [signalés dans Etherscan](https://info.etherscan.com/etherscan-token-reputation/). Bien qu'Etherscan ne soit pas une source de vérité faisant autorité (la nature des réseaux décentralisés fait qu'il ne peut y avoir de source de légitimité faisant autorité), les jetons identifiés par Etherscan comme étant frauduleux sont susceptibles de l'être.

   ![Jeton frauduleux dans Etherscan](./etherscan-scam.png)

## Conclusion {#conclusion}

Tant qu'il y aura de la valeur dans le monde, il y aura des malfaiteurs qui tenteront de s'en emparer, et dans un monde décentralisé, il n'y a personne d'autre que vous-même pour vous protéger. Suivez ces indications pour vous aider à distinguer les jetons légitimes des arnaques :

- Les jetons malveillants imitent des jetons légitimes en utilisant le même nom, symbole, etc.
- Les jetons frauduleux ne _peuvent pas_ utiliser la même adresse de contrat.
- La meilleure source pour l'adresse légitime du jeton est l'organisation émettrice dudit jeton.
- À défaut, vous pouvez utiliser des applications populaires et fiables telles que [Uniswap](https://app.uniswap.org/#/swap) et [Blockscout](https://eth.blockscout.com/).
