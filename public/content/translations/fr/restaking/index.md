---
title: Re-mise en jeu
metaTitle: Qu'est-ce que la re-mise en jeu ? | Avantages et utilisation de la re-mise en jeu
description: "Utilisez l'ETH mis en jeu pour sécuriser d'autres services décentralisés et gagner des récompenses supplémentaires."
lang: fr
template: use-cases
emoji: ":recycle:"
image: /images/use-cases/restaking.png
alt: "Une représentation visuelle de la re-mise en jeu sur Ethereum."
sidebarDepth: 2
summaryPoint1: "Utilisez l'ETH mis en jeu pour sécuriser d'autres services décentralisés et gagner des récompenses supplémentaires."
buttons:
  - content: Qu'est-ce que la re-mise en jeu ?
    toId: qu-est-ce-que-la-re-mise-en-jeu
  - content: Comment ça marche ?
    toId: comment-fonctionne-la-re-mise-en-jeu
    isSecondary: false
---

Le réseau Ethereum sécurise des milliards de dollars 24h/24, 7j/7 et 365 jours par an. Comment ?

Partout dans le monde, des gens bloquent (ou « mettent en jeu ») de l'[ether (ETH)](/eth/) dans des contrats intelligents pour exécuter le logiciel qui traite les transactions Ethereum et sécurise le réseau Ethereum. En retour, ils sont récompensés par davantage d'ETH.

La re-mise en jeu est une technologie conçue pour les [validateurs](/staking/) afin d'étendre cette sécurité à d'autres services, applications ou réseaux. En retour, ils gagnent des récompenses de re-mise en jeu supplémentaires. Cependant, ils exposent également leur ETH mis en jeu à plus de risques.

**La re-mise en jeu expliquée en 18 minutes**

<YouTube id="rOJo7VwPh7I" />

## Qu'est-ce que la re-mise en jeu ? {#what-is-restaking}

La re-mise en jeu consiste à ce que les validateurs utilisent leurs ETH déjà mis en jeu pour sécuriser d'autres services décentralisés. En retour, les participants à la re-mise en jeu peuvent obtenir des récompenses supplémentaires de ces autres services, en plus de leurs récompenses de mise en jeu d'ETH habituelles.

Les services décentralisés sécurisés par la re-mise en jeu sont connus sous le nom de « Services validés activement » (AVS).
De la même manière que de nombreux validateurs d'ETH exécutent un logiciel de validation Ethereum, de nombreux participants à la re-mise en jeu exécutent un logiciel AVS spécialisé.

<br/>
<Alert className="justify-between">
<AlertEmoji text=":bulb:"/>
<AlertContent>
<AlertDescription>
  <p className="mt-0"><strong>Bon à savoir\</strong></p>
  <p className="mt-2">Bien que « Services validés activement » (AVS) soit le terme le plus courant, différentes plateformes de re-mise en jeu peuvent utiliser d'autres noms pour les services décentralisés qu'elles aident à sécuriser, comme « Services validés de manière autonome », « Services sécurisés distribués » ou « Réseaux ».</p>
</AlertDescription>
</AlertContent>
</Alert>

## Mise en jeu contre re-mise en jeu {#staking-vs-restaking}

| Mise en jeu                                     | Re-mise en jeu                                                            |
| ----------------------------------------------- | ------------------------------------------------------------------------- |
| Gagnez des récompenses en ETH                   | Gagnez des récompenses en ETH + des récompenses AVS                       |
| Sécurise le réseau Ethereum                     | Sécurise le réseau Ethereum + les AVS                                     |
| Pas de minimum d'ETH                            | Pas de minimum d'ETH                                                      |
| Faible niveau de risque                         | Niveau de risque de faible à élevé                                        |
| Le délai de retrait dépend de la file d'attente | Le délai de retrait dépend de la file d'attente + la période de déblocage |

## Pourquoi avons-nous besoin de la re-mise en jeu ? {#why-do-we-need-restaking}

Imaginez deux mondes : l'un avec la re-mise en jeu et l'autre sans.

 <TabbedSection />

Dans ce monde avec la re-mise en jeu, l'AVS et le validateur bénéficient tous deux de la possibilité de se trouver et d'échanger de la sécurité contre des récompenses supplémentaires.

<br/>

<Alert className="justify-between">
<AlertEmoji text=":bulb:"/>
<AlertContent>
<AlertDescription>
  <p className="mt-0"><strong>Avantage supplémentaire de la re-mise en jeu</strong></p>
  <p className="mt-2">Les AVS peuvent consacrer toutes leurs ressources à la création et à la commercialisation de leurs services, au lieu de se laisser distraire par la décentralisation et la sécurité.</p>
</AlertDescription>
</AlertContent>
</Alert>

## Comment fonctionne la re-mise en jeu ? {#how-does-restaking-work}

Plusieurs entités sont impliquées dans la re-mise en jeu — chacune d'entre elles joue un rôle important.

| **Terme**                                    | **Description**                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| -------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Plateformes de re-mise en jeu**            | Une plateforme de re-mise en jeu est un service qui met en relation les AVS, les validateurs d'ETH et les opérateurs. Elles créent des applications décentralisées pour que les validateurs puissent remettre en jeu leur ETH et des places de marché où les validateurs, les AVS et les opérateurs peuvent se trouver.                                                                                                                                                                                                                 |
| **Participants natifs à la re-mise en jeu**  | Les personnes qui mettent en jeu leur ETH en exécutant leurs propres validateurs Ethereum peuvent connecter leur ETH mis en jeu à une plateforme de re-mise en jeu, y compris EigenLayer et d'autres, pour gagner des récompenses de re-mise en jeu en plus des récompenses de validateur ETH.                                                                                                                                                                                                                                                          |
|                                              |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| **Participants à la re-mise en jeu liquide** | Les personnes qui mettent leur ETH en jeu via un fournisseur tiers de mise en jeu liquide, comme Lido ou Rocket Pool, obtiennent des jetons de mise en jeu liquide (LST) qui représentent leur ETH mis en jeu. Ils peuvent remettre ces LST en jeu pour gagner des récompenses de re-mise en jeu tout en gardant leur ETH d'origine mis en jeu.                                                                                                                                                                      |
|                                              |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| **Opérateurs**                               | Les opérateurs exécutent le logiciel de re-mise en jeu des AVS, effectuant les tâches de validation requises par chaque AVS. Les opérateurs sont généralement des fournisseurs de services professionnels qui garantissent des éléments tels que la disponibilité et les performances. Comme les participants à la re-mise en jeu non-opérateurs, les opérateurs utilisent l'ETH mis en jeu pour sécuriser les AVS, mais les opérateurs reçoivent également des récompenses supplémentaires en échange de leur travail. |
|                                              |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| **AVS**                                      | Ce sont les services décentralisés — comme les oracles de prix, les ponts de jetons et les systèmes de données — qui reçoivent la sécurité des participants à la re-mise en jeu et offrent des récompenses en jetons en retour.                                                                                                                                                                                                                                                                                                                         |

<br/>

<Alert className="justify-between">
<AlertEmoji text=":bulb:"/>
<AlertContent>
<AlertDescription>
  <p className="mt-0"><strong>Bon à savoir\</strong></p>
  <p className="mt-2">Les participants natifs et liquides à la re-mise en jeu délèguent souvent leur ETH mis en jeu à un opérateur, au lieu d'exécuter eux-mêmes le logiciel pour sécuriser les AVS.</p>
  <p className="mt-2">De cette façon, ils n'ont pas à se soucier des exigences techniques compliquées des AVS, bien qu'ils reçoivent un taux de récompense inférieur à celui des opérateurs.</p>
</AlertDescription>
</AlertContent>
</Alert>

## Quels sont les exemples de re-mise en jeu ? {#what-are-some-examples-of-restaking}

Bien qu'il s'agisse d'une idée nouvelle, quelques projets ont vu le jour pour explorer les possibilités de la re-mise en jeu.

<RestakingList/>

<br/>

<Alert variant="warning" className="justify-between">
<AlertEmoji text=":bulb:"/>
<AlertContent>
<AlertDescription>
  <p className="mt-0"><strong>Alerte à l'appellation impropre</strong></p>
  <p className="mt-2">Certaines personnes confondent la « re-mise en jeu » avec le prêt et l'emprunt de LST dans la DeFi. Les deux mettent au travail l'ETH mis en jeu, mais la re-mise en jeu signifie sécuriser des AVS, et non pas seulement gagner un rendement sur les LST.</p>
</AlertDescription>
</AlertContent>
</Alert>

## Combien puis-je gagner avec la re-mise en jeu ? {#how-much-can-i-make-from-restaking}

Alors que les AVS offrent des taux différents, les jetons de re-mise en jeu liquide (LRT) comme eETH vous donnent une idée de combien vous pouvez gagner. De la même manière que vous obtenez des LST comme stETH pour la mise en jeu de votre ETH, vous pouvez obtenir des LRT comme eETH pour la re-mise en jeu de stETH. Ces jetons rapportent des récompenses de mise en jeu d'ETH et de re-mise en jeu.

**Il est important de reconnaître les risques liés à la re-mise en jeu. Les récompenses potentielles peuvent être attrayantes, mais elles ne sont pas sans risque.**

## Quels sont les risques de la re-mise en jeu ? {#what-are-the-risks-of-restaking}

| **Risques**                                         | **Description**                                                                                                                                                                                                                                                       |
| --------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Pénalités (ou « délestage »)** | Comme pour la mise en jeu d'ETH, si les participants à la re-mise en jeu/opérateurs se déconnectent, censurent des messages ou tentent de corrompre le réseau, leur mise peut être délestée (brûlée) partiellement ou entièrement. |
| **Centralisation**                                  | Si quelques opérateurs dominent la majeure partie de la re-mise en jeu, ils pourraient avoir une grande influence sur les participants à la re-mise en jeu, les AVS et même les plateformes de re-mise en jeu.                                        |
| **Réactions en chaîne**                             | Si un participant à la re-mise en jeu est délesté tout en sécurisant plusieurs AVS, cela pourrait réduire la sécurité des autres AVS, les rendant vulnérables.                                                                                        |
| **Accès immédiat aux fonds**                        | Il y a un temps d'attente (ou « période de déblocage ») pour retirer l'ETH remis en jeu, donc vous n'aurez peut-être pas toujours un accès immédiat.                                                                               |

<br/>

<Alert className="justify-between">
<AlertEmoji text=":bulb:"/>
<AlertContent>
<AlertDescription>
  <p className="mt-0"><strong>Le cofondateur d'Ethereum est en train d'écrire…</strong></p>
  <p className="mt-2">
    Vitalik, le cofondateur d'Ethereum, a mis en garde contre les risques potentiels de la re-mise en jeu dans un article de blog de 2021 intitulé <a href = "https://vitalik.eth.limo/general/2023/05/21/dont_overload.html"> Don't Overload Consensus.</a> </a>  
</p>
</AlertDescription>
</AlertContent>
</Alert>

## Comment démarrer avec la re-mise en jeu ? {#how-to-get-started-with-restaking}

| 🫡 Débutants                                                                                                                        | 🤓 Utilisateurs avancés                                                                                                                     |
| ----------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| 1. Mettez en jeu des ETH sur des plateformes comme Lido ou Rocket Pool pour obtenir des LST. | 1. Mettez votre ETH en jeu en tant que validateur sur Ethereum.                                      |
| 2. Utilisez ces LST pour commencer la re-mise en jeu sur un service de re-mise en jeu.       | 2. Comparez les services de re-mise en jeu comme EigenLayer, Symbiotic et d'autres.                  |
|                                                                                                                                     | 3. Suivez les instructions pour connecter votre validateur au contrat intelligent de re-mise en jeu. |

<br/>

<Alert className="justify-between">
<AlertEmoji text=":eyes:"/>
<AlertContent>
<AlertDescription>
  <p className="mt-0"><strong>Mise en jeu sur Ethereum :</strong> comment ça marche ?</p>
  <ButtonLink href="/staking/">
    En savoir plus
  </ButtonLink>
</AlertDescription>
</AlertContent>
</Alert>

## Avancé {#advanced}

<YouTube id="-V-fG4J1N_M" />

## En savoir plus {#further-reading}

1. [ethereum.org - Guide de la mise en jeu d'ETH](https://ethereum.org/en/staking/)
2. [Ledger Academy - Qu'est-ce que la re-mise en jeu sur Ethereum ?](https://www.ledger.com/academy/what-is-ethereum-restaking)
3. [Consensys - EigenLayer : explication du protocole de re-mise en jeu décentralisé d'Ethereum](https://consensys.io/blog/eigenlayer-decentralized-ethereum-restaking-protocol-explained)
4. [Vitalik Buterin - Ne surchargez pas le consensus d'Ethereum](https://vitalik.eth.limo/general/2023/05/21/dont_overload.html)
5. [Cointelegraph - Qu'est-ce qu'EigenLayer ? Explication du protocole de re-mise en jeu d'Ethereum](https://cointelegraph.com/explained/what-is-eigenlayer-ethereums-restaking-protocol-explained)
6. [a16z crypto research - EigenLayer : Ajout de fonctionnalités sans permission à Ethereum avec Sreeram Kannan](https://www.youtube.com/watch?v=-V-fG4J1N_M)
7. [Junion - Explication d'EigenLayer : qu'est-ce que la re-mise en jeu ?](https://www.youtube.com/watch?v=5r0SooSQFJg)
8. [The Block - Tableau de bord des données de re-mise en jeu](https://www.theblock.co/data/decentralized-finance/restaking)
