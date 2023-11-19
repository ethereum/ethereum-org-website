---
title: Organisation autonome décentralisée (DAO)
description: Un aperçu des DAO sur Ethereum
lang: fr
template: use-cases
emoji: ":handshake:"
sidebarDepth: 2
image: /use-cases/dao-2.png
alt: Une représentation d'une DAO qui vote une proposition.
summaryPoint1: Des communautés appartenant à leurs membres sans pouvoir centralisé.
summaryPoint2: Un moyen sûr de collaborer avec des étrangers sur Internet.
summaryPoint3: Un endroit sûr pour engager des fonds pour une cause précise.
---

## Que sont les DAO ? {#what-are-daos}

Une DAO est une organisation collectivement gérée par la blockchain et qui travaille à une mission partagée.

Les DAO nous permettent de travailler avec des personnes partageant le même état d'esprit et dans le monde entier, sans pour autant faire confiance à un dirigeant bienveillant pour gérer les fonds ou les opérations. Il n'y a pas de Directeur Général qui puisse dépenser des fonds sur un caprice ou un Chef de la direction financière capable de manipuler les registres. Au lieu de cela, les règles basées sur la blockchain ont été intégrées dans le code et définissent comment fonctionne l'organisation et comment les fonds sont dépensés.

Elles possèdent une trésorerie intégrée à laquelle personne ne peut accéder sans l'accord du groupe. Les décisions sont régies par des propositions et des votes pour s'assurer que tout le monde au sein de l'organisation a une voix et que tout se passe de manière transparente sur la chaîne.

## Pourquoi avons-nous besoin des DAO ? {#why-dao}

Créer une organisation avec quelqu'un qui injecte des fonds et de l'argent exige une grande confiance dans les personnes avec lesquelles vous travaillez. Mais il est difficile de faire confiance à une personne avec laquelle vous n’avez interagi que sur Internet. Avec les DAO, vous n'avez pas besoin de faire confiance à quelqu'un dans le groupe, juste au code de la DAO, qui est 100 % transparent et vérifiable par n'importe qui.

Cela ouvre énormément de nouvelles possibilités de collaboration et de coordination au niveau mondial.

### Une comparaison {#dao-comparison}

| DAO                                                                                                                               | Organisation traditionnelle                                                                                            |
| --------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| Habituellement fixe, et pleinement démocratisée.                                                                                  | Généralement hiérarchique.                                                                                             |
| Vote requis par les membres pour que tout changement soit mis en œuvre.                                                           | Selon la structure, des changements peuvent être demandés par une seule personne et le vote peut être biaisé.          |
| Votes comptabilisés et résultats mis en œuvre automatiquement sans intermédiaire de confiance.                                    | Si les votes sont proposés, ils sont calculés en interne et les résultats des votes doivent être traités manuellement. |
| Les services offerts sont gérés automatiquement de manière décentralisée (par exemple la distribution de fonds philanthropiques). | Nécessite une manipulation humaine ou une automatisation centralisée sujette à la manipulation.                        |
| Toutes les activités sont transparentes et entièrement publiques.                                                                 | L'activité est généralement privée et limitée au public.                                                               |

### Exemples de DAO {#dao-examples}

Pour aider votre compréhension, voici quelques exemples de la façon dont vous pourriez utiliser une DAO :

- Un organisme caritatif – vous pouvez accepter les dons de n'importe qui dans le monde entier et voter pour les causes à financer.
- Propriété collective – vous pouvez acheter des actifs physiques ou numériques et les membres peuvent voter sur la façon de les utiliser.
- Ventures et subventions – vous pourriez créer un fonds de risque qui regroupe le capital d’investissement et qui votera pour savoir quelles les entreprises garder. L'argent perçu pourra plus tard être redistribué entre les membres de la DAO.

## Comment fonctionnent les DAO ? {#how-daos-work}

La colonne vertébrale d'une DAO est son contrat intelligent, qui définit les règles de l'organisation et détient la trésorerie du groupe. Une fois que le contrat est en vigueur sur Ethereum, personne ne peut modifier les règles autrement que par un vote. Si quelqu'un essaie de faire quelque chose qui n'est pas couvert par les règles et la logique dans le code, il échouera. Et, comme la trésorerie est également définie par le contrat intelligent, personne ne peut dépenser l'argent sans l'approbation du groupe. Cela signifie que les DAO n'ont pas besoin d'une autorité centrale. Au lieu de cela, le groupe prend des décisions collectives et les paiements sont autorisés automatiquement lorsque les votes sont passés.

Ceci est possible parce que les contrats intelligents sont étanches à toute intrusion dès qu'ils sont mis en service sur Ethereum. Vous ne pouvez pas simplement modifier le code (les règles DAO) sans que les gens le remarquent puisque tout est public.

<DocLink to="/smart-contracts/">
  En savoir plus sur les contrats intelligents
</DocLink>

## Ethereum et DAO {#ethereum-and-daos}

Ethereum est une base parfaite pour les DAOs pour plusieurs raisons :

- Le consensus propre à Ethereum est suffisamment distribué et établi pour que les organisations fassent confiance au réseau.
- Le code du contrat intelligent ne peut pas être modifié une fois en direct, même par ses propriétaires. Cela permet à la DAO de fonctionner selon les règles avec lesquelles elle a été programmée.
- Les contrats intelligents peuvent envoyer/recevoir des fonds. Sans cela, vous aurez besoin d'un intermédiaire de confiance pour gérer les fonds de groupe.
- La communauté Ethereum s'est révélée plus coopérative que compétitive, permettant ainsi l'émergence de pratiques exemplaires dotés d'une grande vitesse de développement.

## Gouvernance de DAO {#dao-governance}

Il existe de nombreuses considérations à prendre en compte au moment de gouverner une DAO, comme le fonctionnement du vote et des propositions.

### Délégation {#governance-delegation}

La délégation est la version DAO de la démocratie représentative. Les détenteurs de jetons délèguent des votes aux utilisateurs qui se désignent et s'engagent à gérer le protocole et à rester informés.

#### Un exemple célèbre {#governance-example}

[ENS](https://claim.ens.domains/delegate-ranking) – Les détenteurs d'ENS peuvent déléguer leurs votes à des membres de la communauté engagés pour les représenter.

### Gouvernance automatique des transactions {#governance-example}

Dans de nombreuse DAO, les transactions seront automatiquement exécutées si le quorum des membres vote par l'affirmative.

#### Un exemple célèbre {#governance-example}

[Nouns](https://nouns.wtf) – Dans Nouns DAO, une transaction est automatiquement exécutée si un quorum de votes est atteint et qu'une majorité vote par l'affirmative, tant qu'elle ne fait pas l'objet d'un véto de la part des fondateurs.

### Gouvernance Multisig {#governance-example}

Tandis que les DAO peuvent avoir des milliers de membres votants, les fonds peuvent se trouver dans un portefeuille partagé par 5 à 20 membres actifs de la communauté qui sont dignes de confiance et généralement doxxés (identités publiques connues de la communauté). Après un vote, les signataires multisig exécutent la volonté de la communauté.

## Les lois des DAO {#dao-laws}

En 1977, le Wyoming a créé la LLC, qui protège les entrepreneurs et limite leur responsabilité. Plus récemment, ils ont été les pionniers de la loi pour les DAO qui établit un statut juridique pour les DAO. Actuellement, le Wyoming, le Vermont et les Iles Vierges ont des lois portant sur les DAO sous une forme ou une autre.

### Un exemple célèbre {#law-example}

[CityDAO](https://citydao.io) - CityDAO s'est servi de la loi DAO du Wyoming pour acheter 40 acres de terrain près du parc national de Yellowstone.

## Adhésion à la DAO {#dao-membership}

Il existe différents modèles pour adhérer à une DAO. L'adhésion peut déterminer comment fonctionne le vote et d'autres éléments clés de la DAO.

### Adhésion basée sur des jetons {#token-based-membership}

Habituellement cela se fait totalement sans permission, seulement en fonction du jeton utilisé. La plupart de ces jetons de gouvernance peuvent être échangés sans permission sur un échange décentralisé. D’autres doivent être gagnés en fournissant des liquidités ou une autre « preuve de travail ». Quoi qu’il en soit, il suffit de détenir le jeton pour donner accès au vote.

_Généralement, cela est utilisé pour régir des protocoles décentralisés et/ou des jetons eux-mêmes._

#### Un exemple célèbre {#token-example}

[MakerDAO](https://makerdao.com) – Le jeton MKR de MakerDAO est largement disponible sur les échanges décentralisés et tout le monde peut acheter un droit de vote sur le futur du protocole Maker.

### Adhésion basée sur les actions {#share-based-membership}

Les DAO basées sur les actions sont davantage soumises à l'autorisation, mais demeurent très ouvertes. Tous les membres potentiels peuvent soumettre une proposition pour rejoindre la DAO, offrant habituellement une contribution d'une certaine valeur sous la forme de jetons ou de travail. Les actions représentent le droit de vote direct et la propriété. Les membres peuvent sortir à tout moment avec leur part proportionnelle de la trésorerie.

_Habituellement utilisé pour des organisations plus proches et axées sur l’humanité telles que les organismes de bienfaisance, les collectifs de travailleurs et les clubs d’investissement. Cela peut également concerner la gouvernance des protocoles et des jetons._

#### Un exemple célèbre {#share-example}

[MolochDAO](http://molochdao.com/) – MolochDAO se concentre sur le financement de projets Ethereum. Ils requièrent une proposition d’adhésion afin que le groupe puisse évaluer si vous avez l’expertise et le capital nécessaires pour émettre des jugements éclairés sur les bénéficiaires potentiels. Vous ne pouvez pas vous contenter d'acheter l'accès à la DAO sur le marché ouvert.

### Adhésion basée sur la réputation {#reputation-based-membership}

Ici, la réputation représente une preuve de participation et accorde le droit de vote dans la DAO. Contrairement à une adhésion basée sur des jetons ou sur les actions, les DAO basées sur la réputation ne transfèrent pas la propriété aux contributeurs. En effet, la réputation ne peut pas être achetée, transférée ou déléguée  ; les membres de la DAO doivent mériter leur réputation par la participation. Le vote sur la chaîne est sans permission, les membres potentiels peuvent librement soumettre des propositions pour rejoindre la DAO et demander à recevoir de la réputation et des jetons en guise de récompense en échange de leurs contributions.

_Habituellement utilisée pour le développement décentralisé et la gouvernance de protocoles et de DApps, cette méthode est également adaptée à divers autres types d'organisations, comme les organismes caritatifs, les collectifs de travailleurs, les clubs d'investissement, etc._

#### Un exemple célèbre {#reputation-example}

[DXdao](https://DXdao.eth.link) – DXdao est une construction collective mondiale souveraine et régit les protocoles et applications décentralisés depuis 2019. Il tire parti de la gouvernance basée sur la réputation et du consensus holographique pour coordonner et gérer les fonds, ce qui signifie que personne ne peut acheter son entrée pour influencer son avenir.

## Rejoindre/démarrer une DAO {#join-start-a-dao}

### Rejoindre une organisation autonome décentralisée (DAO) {#join-a-dao}

- [DAO de la communauté Ethereum](/community/get-involved/#decentralized-autonomous-organizations-daos)
- [Liste des DAO de DAOHauss](https://app.daohaus.club/explore)
- [Liste des DAO Tally.xyz](https://www.tally.xyz)

### Démarrer une DAO {#start-a-dao}

- [Invoquer une DAO avec DAOHaus](https://app.daohaus.club/summon)
- [Lancer une Governor DAO avec Tally](https://www.tally.xyz/add-a-dao)
- [Créer une DAO propulsée par Aragon](https://aragon.org/product)
- [Lancer une colonie](https://colony.io/)
- [Créer une DAO avec le consensus holographique de DAOstack](https://alchemy.daostack.io/daos/create)

## Complément d'information {#further-reading}

### Articles DAO {#dao-articles}

- [Qu'est-ce qu'une DAO ?](https://aragon.org/dao) – [Aragon](https://aragon.org/)
- [Le Manuel DAO](https://daohandbook.xyz)
- [La maison des DAOs](https://wiki.metagame.wtf/docs/great-houses/house-of-daos) – [Metagame](https://wiki.metagame.wtf/)
- [Qu'est-ce qu'une DAO et à quoi sert-elle ?](https://daohaus.substack.com/p/-what-is-a-dao-and-what-is-it-for) – [DAOhaus](https://daohaus.club/)
- [Comment démarrer une communauté numérique DAO](https://daohaus.substack.com/p/four-and-a-half-steps-to-start-a) – [DAOhaus](https://daohaus.club/)
- [Qu'est-ce qu'une DAO ?](https://coinmarketcap.com/alexandria/article/what-is-a-dao) – [Coinmarketcap](https://coinmarketcap.com)
- [Qu'est-ce que le Consensus holographique ?](https://medium.com/daostack/holographic-consensus-part-1-116a73ba1e1c) - [DAOstack](https://daostack.io/)
- [Les DAO ne sont pas des entreprises : là où la décentralisation dans les organisations autonomes compte, par Vitalik](https://vitalik.ca/general/2022/09/20/daos.html)
- [DAO, DAC, DA et plus : un guide terminologique incomplet](https://blog.ethereum.org/2014/05/06/daos-dacs-das-and-more-an-incomplete-terminology-guide) - [Blog Ethereum](https://blog.ethereum.org)

### Vidéos {#videos}

- [Qu'est-ce qu'une DAO en cryptomonnaie ?](https://youtu.be/KHm0uUPqmVE)
- [Une DAO peut-elle bâtir une ville ?](https://www.ted.com/talks/scott_fitsimones_could_a_dao_build_the_next_great_city) – [TED](https://www.ted.com/)
