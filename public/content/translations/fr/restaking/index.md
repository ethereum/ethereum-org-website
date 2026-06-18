---
title: Restaking
metaTitle: Qu'est-ce que le restaking ? | Avantages et utilisation du restaking
description: "Utilisez des ETH stakés pour sécuriser d'autres services décentralisés et gagner des récompenses supplémentaires."
lang: fr
template: use-cases
image: /images/use-cases/restaking.png
alt: "Une représentation visuelle du restaking sur Ethereum."
sidebarDepth: 2
summaryPoints:
  - "Utilisez des ETH stakés pour sécuriser d'autres services décentralisés et gagner des récompenses supplémentaires."
buttons:
  - content: Qu'est-ce que le restaking ?
    toId: what-is-restaking
  - content: Comment ça marche ?
    toId: how-does-restaking-work
    isSecondary: false
---

Le réseau Ethereum sécurise des milliards de dollars de valeur 24h/24 et 7j/7, 365 jours par an. Comment ?

Partout dans le monde, des personnes verrouillent (ou « stakent ») de l'[ether (ETH)](/what-is-ether/) dans des contrats intelligents pour exécuter le logiciel qui traite les transactions Ethereum et sécurise le réseau Ethereum. En retour, ils sont récompensés avec plus d'ETH.

Le restaking est une technologie conçue pour permettre aux [stakers](/staking/) d'étendre cette sécurité à d'autres services, applications ou réseaux. En retour, ils gagnent des récompenses de restaking supplémentaires. Cependant, ils exposent également leurs ETH stakés à plus de risques.

**Le restaking expliqué en 18 minutes**

<VideoWatch slug="restaking-explained" />

## Qu'est-ce que le restaking ? {#what-is-restaking}

Le restaking, c'est lorsque les stakers utilisent leurs ETH déjà stakés pour sécuriser d'autres services décentralisés. En retour, les restakers peuvent obtenir des récompenses supplémentaires de ces autres services en plus de leurs récompenses de staking d'ETH habituelles.

Les services décentralisés sécurisés par le restaking sont connus sous le nom de « Services Validés Activement » (AVS - Actively Validated Services).
De la même manière que de nombreux stakers d'ETH exécutent un logiciel de validation Ethereum, de nombreux restakers exécutent un logiciel AVS spécialisé.

<br/>
<Alert className="justify-between">
<AlertEmoji text=":bulb:"/>
<AlertContent>
<AlertDescription>
 <p className="mt-0"><strong>Bon à savoir</strong>
  <p className="mt-2">Bien que « Services Validés Activement » (AVS) soit le terme le plus courant, différentes plateformes de restaking peuvent utiliser d'autres noms pour les services décentralisés qu'elles contribuent à sécuriser, comme « Services Validés de Manière Autonome », « Services Sécurisés Distribués » ou « Réseaux ».</p>
</AlertDescription>
</AlertContent>
</Alert>

## Staking vs restaking {#staking-vs-restaking}

| Staking                        | Restaking                                         |
| ------------------------------ | ------------------------------------------------- |
| Gagner des récompenses en ETH  | Gagner des récompenses en ETH + récompenses AVS   |
| Sécurise le réseau Ethereum    | Sécurise le réseau Ethereum + les AVS             |
| Aucun minimum d'ETH            | Aucun minimum d'ETH                               |
| Niveau de risque faible        | Niveau de risque faible à élevé                   |
| Le délai de retrait dépend de la file d'attente | Le délai de retrait dépend de la file d'attente + période de déliaison |

## Pourquoi avons-nous besoin du restaking ? {#why-do-we-need-restaking}

Imaginez deux mondes : l'un avec le restaking et l'autre sans.

 <TabbedSection />

Dans ce monde avec le restaking, l'AVS et le staker bénéficient tous deux de pouvoir se trouver et d'échanger de la sécurité contre des récompenses supplémentaires.

<br/>

<Alert className="justify-between">
<AlertEmoji text=":bulb:"/>
<AlertContent>
<AlertDescription>
 <p className="mt-0"><strong>Avantage supplémentaire du restaking</strong>
  <p className="mt-2">Les AVS peuvent consacrer toutes leurs ressources à la création et à la commercialisation de leurs services, au lieu de se laisser distraire par la décentralisation et la sécurité.</p>
</AlertDescription>
</AlertContent>
</Alert>

## Comment fonctionne le restaking ? {#how-does-restaking-work}

Plusieurs entités sont impliquées dans le restaking — chacune d'entre elles joue un rôle important.

| **Terme**               | **Description**                                                                                                                                                                                                                                                                                                                                   |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Plateformes de restaking** | Une plateforme de restaking est un service qui connecte les AVS, les stakers d'ETH et les opérateurs. Elles créent des applications décentralisées pour que les stakers puissent restaker leurs ETH, et des places de marché où les stakers, les AVS et les opérateurs peuvent se trouver.                                                                                                                |
| **Restakers natifs**    | Les personnes qui stakent leurs ETH en exécutant leurs propres validateurs Ethereum peuvent connecter leurs ETH stakés à une plateforme de restaking, y compris EigenLayer et d'autres, pour gagner des récompenses de restaking en plus des récompenses de validateur ETH.                                                                                                                             |
| **Restakers liquides**  | Les personnes qui stakent leurs ETH via un fournisseur de staking liquide tiers, comme Lido ou Rocket Pool, obtiennent des jetons de staking liquide (LST) qui représentent leurs ETH stakés. Ils peuvent restaker ces LST pour gagner des récompenses de restaking tout en gardant leurs ETH d'origine stakés.                                                                                  |
| **Opérateurs**          | Les opérateurs exécutent le logiciel de restaking des AVS, effectuant les tâches de validation requises par chaque AVS. Les opérateurs sont généralement des fournisseurs de services professionnels qui garantissent des éléments tels que la disponibilité et les performances. Comme les restakers non-opérateurs, les opérateurs utilisent des ETH stakés pour sécuriser les AVS, mais les opérateurs reçoivent également des récompenses supplémentaires en échange de leur travail. |
| **AVS**                 | Ce sont les services décentralisés — comme les oracles de prix, les ponts de jetons et les systèmes de données — qui reçoivent la sécurité des restakers et offrent des récompenses en jetons en retour.                                                                                                                                                                              |

<br/>

<Alert className="justify-between">
<AlertEmoji text=":bulb:"/>
<AlertContent>
<AlertDescription>
 <p className="mt-0"><strong>Bon à savoir</strong>
  <p className="mt-2">Les restakers natifs et liquides délèguent souvent leurs ETH stakés à un opérateur, au lieu d'exécuter eux-mêmes le logiciel pour sécuriser les AVS.</p>
  <p className="mt-2">De cette façon, ils n'ont pas à se soucier des exigences techniques complexes des AVS, bien qu'ils reçoivent un taux de récompense inférieur à celui des opérateurs.</p>
</AlertDescription>
</AlertContent>
</Alert>

## Quels sont quelques exemples de restaking ? {#what-are-some-examples-of-restaking}

Bien qu'il s'agisse d'une idée nouvelle, quelques projets ont vu le jour pour explorer les possibilités du restaking.

<RestakingList/>

<br/>

<Alert variant="warning" className="justify-between">
<AlertEmoji text=":bulb:"/>
<AlertContent>
<AlertDescription>
 <p className="mt-0"><strong>Attention aux abus de langage</strong>
  <p className="mt-2">Certaines personnes confondent le « restaking » avec le prêt et l'emprunt de LST dans la finance décentralisée (DeFi). Les deux font travailler les ETH stakés, mais le restaking signifie sécuriser les AVS, et non pas seulement gagner un rendement sur les LST.</p>
</AlertDescription>
</AlertContent>
</Alert>

## Combien puis-je gagner avec le restaking ? {#how-much-can-i-make-from-restaking}

Bien que les AVS offrent des taux différents, les jetons de restaking liquide (LRT - Liquid Restaking Tokens) comme l'eETH vous donnent une idée de ce que vous pouvez gagner. De la même manière que vous obtenez des LST comme le stETH pour le staking de vos ETH, vous pouvez obtenir des LRT comme l'eETH pour le restaking de stETH. Ces jetons génèrent des récompenses de staking d'ETH et de restaking.

**Il est important de reconnaître les risques liés au restaking. Les récompenses potentielles peuvent être attrayantes, mais elles ne sont pas sans risque.**

## Quels sont les risques du restaking ? {#what-are-the-risks-of-restaking}

| **Risques**                   | **Description**                                                                                                                                                |
| ----------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Pénalités (ou « réduction »)** | Comme pour le staking d'ETH, si les restakers/opérateurs se déconnectent, censurent des messages ou tentent de corrompre le réseau, leur mise peut subir une réduction (être brûlée) partiellement ou entièrement. |
| **Centralisation**            | Si quelques opérateurs dominent la majeure partie du restaking, ils pourraient avoir une grande influence sur les restakers, les AVS et même les plateformes de restaking.                             |
| **Réactions en chaîne**       | Si un restaker subit une réduction tout en sécurisant plusieurs AVS, cela pourrait réduire la sécurité des autres AVS, les rendant vulnérables.                             |
| **Accès immédiat aux fonds**  | Il y a un temps d'attente (ou « période de déliaison ») pour retirer les ETH restakés, vous n'y aurez donc peut-être pas toujours accès immédiatement.                                       |

<br/>

<Alert className="justify-between">
<AlertEmoji text=":bulb:"/>
<AlertContent>
<AlertDescription>
 <p className="mt-0"><strong>Le cofondateur d'Ethereum est en train d'écrire…</strong>
  <p className="mt-2">
    Vitalik, le cofondateur d'Ethereum, a mis en garde contre les risques potentiels du restaking dans un article de blog de 2021 intitulé <a href="https://vitalik.eth.limo/general/2023/05/21/dont_overload.html">Don't Overload Consensus.</a>

</AlertDescription>
</AlertContent>
</Alert>

## Comment démarrer avec le restaking ? {#how-to-get-started-with-restaking}

| 🫡 Débutants                                                    | 🤓 Utilisateurs avancés                                                               |
| --------------------------------------------------------------- | ------------------------------------------------------------------------------------- |
| 1. Staker des ETH sur des plateformes comme Lido ou Rocket Pool pour obtenir des LST. | 1. Staker vos ETH en tant que validateur sur Ethereum.                                |
| 2. Utiliser ces LST pour commencer le restaking sur un service de restaking.    | 2. Comparer les services de restaking comme EigenLayer, Symbiotic et d'autres.        |
|                                                                 | 3. Suivre les instructions pour connecter votre validateur au contrat intelligent de restaking. |

<br/>

<Alert className="justify-between">
<AlertEmoji text=":eyes:"/>
<AlertContent>
<AlertDescription>
 <p className="mt-0"><strong>Staking Ethereum :</strong> Comment ça marche ?
  <ButtonLink href="/staking/">
    En savoir plus
  </ButtonLink>
</AlertDescription>
</AlertContent>
</Alert>

## Avancé {#advanced}

<VideoWatch slug="eigenlayer-permissionless-features" />

## Lectures complémentaires {#further-reading}

1. [ethereum.org - Guide du staking d'ETH](/staking/)
2. [Ledger Academy - Qu'est-ce que le restaking Ethereum ?](https://www.ledger.com/academy/what-is-ethereum-restaking)
3. [ConsenSys - EigenLayer : Explication du protocole de restaking Ethereum décentralisé](https://consensys.io/blog/eigenlayer-decentralized-ethereum-restaking-protocol-explained)
4. [Vitalik Buterin - Ne surchargez pas le consensus d'Ethereum](https://vitalik.eth.limo/general/2023/05/21/dont_overload.html)
5. [Cointelegraph - Qu'est-ce qu'EigenLayer ? Explication du protocole de restaking d'Ethereum](https://cointelegraph.com/explained/what-is-eigenlayer-ethereums-restaking-protocol-explained)
6. [a16z crypto research - EigenLayer : Ajout de fonctionnalités sans permission à Ethereum avec Sreeram Kannan](https://www.youtube.com/watch?v=-V-fG4J1N_M)
7. [Junion - EigenLayer expliqué : Qu'est-ce que le restaking ?](https://www.youtube.com/watch?v=5r0SooSQFJg)
8. [The Block - Tableau de bord des données de restaking](https://www.theblock.co/data/decentralized-finance/restaking)