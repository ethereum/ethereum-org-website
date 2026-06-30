---
title: Qu'est-ce qu'une DAO ?
metaTitle: "Qu'est-ce qu'une DAO ? | Organisation Autonome Décentralisée"
description: "Un aperçu des DAO sur Ethereum"
lang: fr
template: use-cases
sidebarDepth: 2
image: /images/use-cases/dao-2.png
alt: "Une représentation d'une DAO votant sur une proposition."
summaryPoints:
  - "Des communautés appartenant à leurs membres, sans direction centralisée."
  - "Un moyen sûr de collaborer avec des inconnus sur Internet."
  - "Un endroit sûr pour engager des fonds pour une cause spécifique."
---

## Que sont les DAO ? {#what-are-daos}

Une DAO est une organisation détenue collectivement qui travaille à la réalisation d'une mission commune.

Les DAO nous permettent de travailler avec des personnes partageant les mêmes idées à travers le monde sans avoir à faire confiance à un leader bienveillant pour gérer les fonds ou les opérations. Il n'y a pas de PDG qui puisse dépenser des fonds sur un coup de tête, ni de directeur financier qui puisse manipuler les comptes. Au lieu de cela, des règles basées sur la chaîne de blocs et intégrées dans le code définissent le fonctionnement de l'organisation et la manière dont les fonds sont dépensés.

Elles disposent de trésoreries intégrées auxquelles personne n'a l'autorité d'accéder sans l'approbation du groupe. Les décisions sont régies par des propositions et des votes pour s'assurer que chacun dans l'organisation a son mot à dire, et tout se passe de manière transparente [onchain](/glossary/#onchain).

## Pourquoi avons-nous besoin des DAO ? {#why-dao}

Créer une organisation avec quelqu'un, impliquant des financements et de l'argent, nécessite une grande confiance envers les personnes avec lesquelles vous travaillez. Mais il est difficile de faire confiance à quelqu'un avec qui vous n'avez interagi que sur Internet. Avec les DAO, vous n'avez besoin de faire confiance à personne d'autre dans le groupe, seulement au code de la DAO, qui est 100 % transparent et vérifiable par tous.

Cela ouvre de nombreuses nouvelles opportunités de collaboration et de coordination à l'échelle mondiale.

### Une comparaison {#dao-comparison}

| DAO                                                                                                                     | Une organisation traditionnelle                                                                       |
| ----------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------ |
| Généralement horizontale et entièrement démocratisée.                                                                                   | Généralement hiérarchique.                                                                            |
| Un vote des membres est requis pour que toute modification soit mise en œuvre.                                                           | Selon la structure, les changements peuvent être exigés par une seule partie, ou un vote peut être proposé.     |
| Les votes sont comptabilisés et le résultat est mis en œuvre automatiquement sans intermédiaire de confiance.                                      | Si le vote est autorisé, les votes sont comptabilisés en interne et le résultat du vote doit être traité manuellement. |
| Les services offerts sont gérés automatiquement de manière décentralisée (par exemple, la distribution de fonds philanthropiques). | Nécessite une intervention humaine ou une automatisation contrôlée de manière centralisée, sujette à la manipulation.              |
| Toute l'activité est transparente et entièrement publique.                                                                           | L'activité est généralement privée et son accès au public est limité.                                        |

### Exemples de DAO {#dao-examples}

Pour que cela soit plus clair, voici quelques exemples de la façon dont vous pourriez utiliser une DAO :

- **Une organisation caritative** – vous pourriez accepter des dons de n'importe qui dans le monde et voter sur les causes à financer.
- **Propriété collective** – vous pourriez acheter des actifs physiques ou numériques et les membres peuvent voter sur la façon de les utiliser.
- **Capital-risque et subventions** – vous pourriez créer un fonds de capital-risque qui regroupe des capitaux d'investissement et vote sur les projets à soutenir. L'argent remboursé pourrait ensuite être redistribué entre les membres de la DAO.

<VideoWatch slug="dao-build-next-great-city" />

## Comment fonctionnent les DAO ? {#how-daos-work}

L'épine dorsale d'une DAO est son [contrat intelligent](/glossary/#smart-contract), qui définit les règles de l'organisation et détient la trésorerie du groupe. Une fois le contrat déployé sur [Ethereum](/), personne ne peut modifier les règles, sauf par un vote. Si quelqu'un essaie de faire quelque chose qui n'est pas couvert par les règles et la logique du code, cela échouera. Et comme la trésorerie est également définie par le contrat intelligent, cela signifie que personne ne peut dépenser l'argent sans l'approbation du groupe non plus. Cela signifie que les DAO n'ont pas besoin d'une autorité centrale. Au lieu de cela, le groupe prend des décisions collectivement, et les paiements sont automatiquement autorisés lorsque les votes sont adoptés.

Cela est possible car les contrats intelligents sont infalsifiables une fois qu'ils sont déployés sur Ethereum. Vous ne pouvez pas simplement modifier le code (les règles de la DAO) sans que les gens s'en aperçoivent, car tout est public.

## Ethereum et les DAO {#ethereum-and-daos}

Ethereum est la fondation parfaite pour les DAO pour plusieurs raisons :

- Le propre consensus d'Ethereum est décentralisé et suffisamment établi pour que les organisations fassent confiance au réseau.
- Le code du contrat intelligent ne peut pas être modifié une fois déployé, même par ses propriétaires. Cela permet à la DAO de fonctionner selon les règles avec lesquelles elle a été programmée.
- Les contrats intelligents peuvent envoyer/recevoir des fonds. Sans cela, vous auriez besoin d'un intermédiaire de confiance pour gérer les fonds du groupe.
- La communauté Ethereum s'est avérée plus collaborative que compétitive, permettant aux meilleures pratiques et aux systèmes de soutien d'émerger rapidement.

## Gouvernance des DAO {#dao-governance}

Il y a de nombreuses considérations lors de la gouvernance d'une DAO, comme le fonctionnement des votes et des propositions.

### Délégation {#governance-delegation}

La délégation est comme la version DAO de la démocratie représentative. Les détenteurs de jetons délèguent leurs votes à des utilisateurs qui se portent candidats et s'engagent à gérer le protocole et à rester informés.

#### Un exemple célèbre {#governance-example}

[ENS](https://claim.ens.domains/delegate-ranking) – Les détenteurs d'ENS peuvent déléguer leurs votes à des membres engagés de la communauté pour les représenter.

### Gouvernance automatique des transactions {#governance-example-2}

Dans de nombreuses DAO, les transactions seront automatiquement exécutées si un quorum de membres vote pour.

#### Un exemple célèbre {#governance-example-3}

[Nouns](https://nouns.wtf) – Dans la Nouns DAO, une transaction est automatiquement exécutée si un quorum de votes est atteint et qu'une majorité vote pour, tant qu'elle n'est pas bloquée par un veto des fondateurs.

### Gouvernance multisig {#governance-example-4}

Bien que les DAO puissent avoir des milliers de membres votants, les fonds peuvent résider dans un [portefeuille](/glossary/#wallet) partagé par 5 à 20 membres actifs de la communauté qui sont de confiance et généralement « doxxés » (identités publiques connues de la communauté). Après un vote, les signataires du [multisig](/glossary/#multisig) exécutent la volonté de la communauté.

## Lois sur les DAO {#dao-laws}

En 1977, le Wyoming a inventé la LLC (société à responsabilité limitée), qui protège les entrepreneurs et limite leur responsabilité. Plus récemment, ils ont été les pionniers de la loi sur les DAO qui établit un statut juridique pour les DAO. Actuellement, le Wyoming, le Vermont et les îles Vierges ont des lois sur les DAO sous une forme ou une autre.

### Un exemple célèbre {#law-example}

[CityDAO](https://citizen.citydao.io/) – CityDAO a utilisé la loi sur les DAO du Wyoming pour acheter 40 acres de terrain près du parc national de Yellowstone.

## Adhésion à une DAO {#dao-membership}

Il existe différents modèles d'adhésion à une DAO. L'adhésion peut déterminer le fonctionnement du vote et d'autres éléments clés de la DAO.

### Adhésion basée sur les jetons {#token-based-membership}

Généralement entièrement [sans permission](/glossary/#permissionless), selon le jeton utilisé. La plupart du temps, ces jetons de gouvernance peuvent être échangés sans permission sur une [plateforme d'échange décentralisée](/glossary/#dex). D'autres doivent être gagnés en fournissant de la liquidité ou une autre forme de « preuve de travail (PoW) ». Dans tous les cas, le simple fait de détenir le jeton donne accès au vote.

_Généralement utilisé pour gouverner de vastes protocoles décentralisés et/ou les jetons eux-mêmes._

#### Un exemple célèbre {#token-example}

[MakerDAO](https://makerdao.com) – Le jeton MKR de MakerDAO est largement disponible sur les plateformes d'échange décentralisées et n'importe qui peut en acheter pour avoir un pouvoir de vote sur l'avenir du protocole Maker.

### Adhésion basée sur des parts {#share-based-membership}

Les DAO basées sur des parts sont davantage à permission, mais restent assez ouvertes. Tout membre potentiel peut soumettre une proposition pour rejoindre la DAO, offrant généralement un tribut d'une certaine valeur sous forme de jetons ou de travail. Les parts représentent un pouvoir de vote direct et une propriété. Les membres peuvent faire une sortie à tout moment avec leur part proportionnelle de la trésorerie.

_Généralement utilisé pour des organisations plus soudées et centrées sur l'humain, comme les organisations caritatives, les collectifs de travailleurs et les clubs d'investissement. Peut également gouverner des protocoles et des jetons._

### Adhésion basée sur la réputation {#reputation-based-membership}

La réputation représente une preuve de participation et accorde un pouvoir de vote dans la DAO. Contrairement à l'adhésion basée sur des jetons ou des parts, les DAO basées sur la réputation ne transfèrent pas la propriété aux contributeurs. La réputation ne peut être achetée, transférée ou déléguée ; les membres de la DAO doivent gagner leur réputation par leur participation. Le vote onchain est sans permission et les membres potentiels peuvent soumettre librement des propositions pour rejoindre la DAO et demander à recevoir de la réputation et des jetons en récompense en échange de leurs contributions.

_Généralement utilisé pour le développement décentralisé et la gouvernance de protocoles et d'[applications décentralisées (dapps)](/glossary/#dapp), mais convient également très bien à un ensemble diversifié d'organisations telles que les organisations caritatives, les collectifs de travailleurs, les clubs d'investissement, etc._

#### Un exemple célèbre {#reputation-example}

[DXdao](https://DXdao.eth.limo) – DXdao était un collectif souverain mondial construisant et gouvernant des protocoles et des applications décentralisés depuis 2019. Il s'appuyait sur une gouvernance basée sur la réputation et un [consensus holographique](/glossary/#holographic-consensus) pour coordonner et gérer les fonds, ce qui signifie que personne ne pouvait acheter sa place pour influencer son avenir ou sa gouvernance.

## Rejoindre / créer une DAO {#join-start-a-dao}

### Rejoindre une DAO {#join-a-dao}

- [DAO de la communauté Ethereum](/community/get-involved/#decentralized-autonomous-organizations-daos)
- [Liste de DAO de DAOHaus](https://app.daohaus.club/explore)
- [Liste de DAO de Tally.xyz](https://www.tally.xyz/explore)
- [Liste de DAO de DeGov.AI](https://apps.degov.ai/)

### Créer une DAO
- [Créer une DAO avec DAOHaus](https://app.daohaus.club/summon)
- [Créer une DAO Governor avec Tally](https://www.tally.xyz/get-started)
- [Créer une DAO propulsée par Aragon](https://aragon.org/product)
- [Créer une colonie](https://colony.io/)
- [Lancer une DAO avec le DeGov Launcher](https://docs.degov.ai/integration/deploy)
## Complément d'information {#further-reading}

### Articles sur les DAO {#dao-articles}

- [Qu'est-ce qu'une DAO ?](https://blog.aragon.org/what-is-a-dao/) – [Aragon](https://aragon.org/)
- [La maison des DAO](https://wiki.metagame.wtf/docs/great-houses/house-of-daos) – [Metagame](https://wiki.metagame.wtf/)
- [Qu'est-ce qu'une DAO et à quoi ça sert ?](https://daohaus.substack.com/p/-what-is-a-dao-and-what-is-it-for) – [DAOhaus](https://daohaus.club/)
- [Comment créer une communauté numérique propulsée par une DAO](https://daohaus.substack.com/p/four-and-a-half-steps-to-start-a) – [DAOhaus](https://daohaus.club/)
- [Qu'est-ce qu'une DAO ?](https://coinmarketcap.com/alexandria/article/what-is-a-dao) – [Coinmarketcap](https://coinmarketcap.com)
- [Qu'est-ce que le consensus holographique ?](https://medium.com/daostack/holographic-consensus-part-1-116a73ba1e1c) - [DAOstack](https://daostack.io/)
- [Les DAO ne sont pas des entreprises : là où la décentralisation dans les organisations autonomes compte, par Vitalik](https://vitalik.eth.limo/general/2022/09/20/daos.html)
- [DAO, DAC, DA et plus : un guide terminologique incomplet](https://blog.ethereum.org/2014/05/06/daos-dacs-das-and-more-an-incomplete-terminology-guide) - [Blog d'Ethereum](https://blog.ethereum.org)

### Vidéos {#videos}

- [Qu'est-ce qu'une DAO dans la crypto ?](https://youtu.be/KHm0uUPqmVE)
- [Une DAO peut-elle construire une ville ?](https://www.ted.com/talks/scott_fitsimones_could_a_dao_build_the_next_great_city) – [TED](https://www.ted.com/)

<Divider />

<QuizWidget quizKey="daos" />
