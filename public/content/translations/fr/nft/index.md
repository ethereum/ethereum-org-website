---
title: Jetons non fongibles (NFT)
description: Un aperçu des NFT sur Ethereum
lang: fr
template: use-cases
emoji: ":frame_with_picture:"
sidebarDepth: 2
image: /infrastructure_transparent.png
alt: Un logo Eth affiché par hologramme.
summaryPoint1: Un moyen de représenter toute chose unique en tant qu'actif Ethereum.
summaryPoint2: Les NFT offrent plus de possibilités que jamais aux créateurs de contenus.
summaryPoint3: Propulsés par des contrats intelligents sur la blockchain Ethereum.
---

## Que sont les NFT ? {#what-are-nfts}

Les NFT sont des jetons qui sont individuellement uniques. Chaque NFT a des propriétés différentes (non fongibles) et sa rareté est prouvée. Cela diffère des jetons tels que les ERC-20, pour lesquels chaque jeton d'un ensemble est identique et possède les mêmes propriétés ("fongible"). Vous ne vous souciez pas de savoir quel billet de banque vous avez dans votre portefeuille, parce qu'ils sont tous identiques et valent tous la même chose. Cependant, vous vous souciez de savoir quel NFT spécifique vous possédez, car ils ont tous des propriétés individuelles qui les distinguent des autres ("non fongibles").

Le caractère unique de chaque NFT permet la tokenisation de choses telles que l'art, les objets de collection ou même l'immobilier, où un NFT unique et spécifique représente un objet numérique ou réel unique et spécifique. La propriété d'un actif est sécurisée par la blockchain Ethereum – personne ne peut modifier le dossier de propriété ou copier/coller un nouveau NFT dans l'existence.

<YouTube id="Xdkkux6OxfM" />

## L'internet des ressources {#internet-of-assets}

Les NFT et Ethereum résolvent certains des problèmes qui se posent aujourd'hui sur l'internet. Comme tout se digitalise de plus en plus, il est nécessaire de reproduire les propriétés des objets physiques comme la rareté, l'unicité et la preuve de propriété. Et cela d'une manière qui n'est pas contrôlée par une organisation centrale. Par exemple, avec les NFT, vous pouvez posséder un mp3 musical qui n'est pas spécifique à l'application musicale d'une entreprise, ou vous pouvez posséder un identifiant de média social que vous pouvez vendre ou échanger, mais qui ne peut pas vous être retiré arbitrairement par un fournisseur de plateforme.

Voici à quoi ressemble un internet de NFT par rapport à l'internet que la plupart d'entre nous utilisons aujourd'hui...

### Une comparaison {#nft-comparison}

| Un internet NFT                                                                                                                                                               | Internet aujourd'hui                                                                                                                                                                                      |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Vous êtes propriétaire de vos biens ! Vous seul pouvez les vendre ou les échanger.                                                                                            | Vous louez un bien à une organisation.                                                                                                                                                                    |
| Les NFT sont uniques sur le plan numérique ; il n'y aura jamais deux NFT identiques.                                                                                          | Une copie d'une entité ne peut souvent pas être distinguée de l'original.                                                                                                                                 |
| La propriété d'un NFT est stockée sur la blockchain et peut être vérifiée par n'importe qui.                                                                                  | L'historique de propriété des articles numériques sont stockés sur des serveurs contrôlés par des institutions – vous devez les croire sur parole.                                                        |
| Les NFT sont des contrats intelligents sur Ethereum. Cela signifie qu'ils peuvent facilement être utilisés dans d'autres contrats intelligents et applications sur Ethereum ! | Les entreprises qui possèdent des produits numériques ont généralement besoin de leur propre infrastructure de type "jardin fermé".                                                                       |
| Les créateurs de contenu peuvent vendre leur travail n'importe où et accéder à un marché mondial.                                                                             | Les créateurs dépendent de l'infrastructure et de la distribution des plates-formes qu'ils utilisent. Celles-ci sont souvent soumises à des conditions d'utilisation et à des restrictions géographiques. |
| Les créateurs de NFT peuvent conserver les droits de propriété sur leur propre travail et programmer les redevances directement dans le contrat NFT.                          | Les plateformes, telles que les services de diffusion de musique en streaming, conservent la majorité des bénéfices tirés des ventes.                                                                     |

## Comment fonctionnent les NFT ? {#how-nfts-work}

Comme tout jeton émis sur Ethereum, les NFT sont émis par un contrat intelligent. Le contrat intelligent est conforme à l'une des normes NFT (généralement ERC-721 ou ERC-1155) qui définissent les fonctions du contrat. Le contrat peut créer ("frapper") des NFT et les attribuer à un propriétaire spécifique. La propriété est définie dans le contrat en associant des NFT spécifiques à des adresses spécifiques. Le NFT possède un identifiant et, généralement, des métadonnées qui lui sont associées et qui rendent le jeton spécifique unique.

Quand quelqu'un crée ou frappe un NFT, il exécute en réalité une fonction du contrat intelligent qui attribue un NFT spécifique à son adresse. Cette information est stockée dans la mémoire du contrat, qui fait partie de la blockchain. Le créateur du contrat peut intégrer une logique supplémentaire dans le contrat, par exemple en limitant l'offre totale ou en définissant une redevance à verser au créateur chaque fois qu'un jeton est transféré.

## Comment les NFTs sont-ils utilisés ? {#nft-use-cases}

Les NFT sont utilisés pour de nombreuses choses, notamment :

- prouver que vous avez assisté à un événement
- certifier que vous avez suivi un cours
- objets possédés dans des jeux
- art numérique
- tokenisation d'actifs du monde réel
- prouver votre identité en ligne
- autoriser l'accès au contenu
- billetterie
- noms de domaines Internet décentralisés
- collatéral en DeFi

Vous êtes peut-être un artiste qui souhaite partager ses œuvres à l'aide de NFT, sans en perdre le contrôle et sans sacrifier ses bénéfices à des intermédiaires. Vous pouvez créer un nouveau contrat et spécifier le nombre de NFT, leurs propriétés et un lien vers une œuvre d'art spécifique. En tant qu'artiste, vous pouvez programmer dans le contrat intelligent les redevances qui doivent vous être versées (par exemple, transférer 5 % du prix de vente au propriétaire du contrat à chaque fois qu'un NFT est transféré). Vous pouvez également toujours prouver que vous avez créé les NFT parce que vous possédez le portefeuille qui a déployé le contrat. Vos acheteurs peuvent facilement prouver qu'ils possèdent un authentique NFT de votre collection car leur adresse de portefeuille est associée à un jeton dans votre contrat intelligent. Ils peuvent l'utiliser dans l'écosystème Ethereum en ayant confiance dans leur authenticité.

Par exemple, pensez à un billet pour un événement sportif. Tout comme l'organisateur d'un événement peut décider du nombre de billets à vendre, le créateur d'un NFT peut décider du nombre de répliques existantes. Il s'agit parfois de répliques exactes telles que 5 000 billets d'admission générale. Parfois, plusieurs très similaires sont créés, chacun légèrement différent, comme un billet avec un siège assigné. Ils peuvent être achetés et vendus de pair à pair sans avoir à payer de frais de billetterie et l'acheteur peut toujours s'assurer de l'authenticité du billet en vérifiant l'adresse du contrat.

Sur ethereum.org, les NFT sont utilisés pour montrer que des personnes ont contribué à notre dépôt GitHub ou assisté à des appels, et nous avons même notre propre nom de domaine NFT. Si vous contribuez à ethereum.org, vous pouvez demander un POAP NFT. Certains rassemblements crypto ont utilisé des POAP comme billets. [Plus d'infos sur la contribution](/contributing/#poap).

![POAP ethereum.org](./poap.png)

Ce site web dispose également d'un nom de domaine alternatif NFT, **ethereum.eth**. Notre adresse `.org` est gérée de façon centralisée par un fournisseur de noms de domaine (DNS) alors que ethereum`.eth` est enregistré sur Ethereum par le service Ethereum Name Service (ENS). Nous en sommes les propriétaires et les gestionnaires. [Consulter notre dossier ENS](https://app.ens.domains/name/ethereum.eth)

[Plus d'infos sur le service ENS](https://app.ens.domains)

<Divider />

### Sécurité NFT {#nft-security}

La sécurité d'Ethereum émane de la preuve d'enjeu. Le système est conçu pour décourager économiquement les actions malveillantes, ce qui rend Ethereum infalsifiable. C'est ce qui rend les NFT possibles. Une fois le bloc contenant votre transaction NFT finalisé, un attaquant devrait dépenser des millions d'ETH pour le modifier. Quiconque exécute un logiciel Ethereum serait immédiatement capable de détecter des manipulations malhonnêtes avec un NFT, et la personne malveillante serait économiquement pénalisée et rejetée.

Les questions de sécurité concernant les NFT sont le plus souvent liées aux escroqueries par hameçonnage, aux vulnérabilités des contrats intelligents ou aux erreurs utilisateur (comme exposer par inadvertance des clés privées), rendant la sécurité du portefeuille critique pour les propriétaires de NFT.

<ButtonLink to="/security/">
  En savoir plus sur la sécurité
</ButtonLink>

## Complément d'information {#further-reading}

- [A beginner's guide to NFTs](https://linda.mirror.xyz/df649d61efb92c910464a4e74ae213c4cab150b9cbcc4b7fb6090fc77881a95d) – _Linda Xie, Janvier 2020_
- [Traqueur de NFTs de Etherscan](https://etherscan.io/nft-top-contracts)
- [Norme de jeton ERC-721](/developers/docs/standards/tokens/erc-721/)
- [Norme de jeton ERC-1155](/developers/docs/standards/tokens/erc-1155/)

<Divider />

<QuizWidget quizKey="nfts" />
