---
title: Mise à l'échelle d'Ethereum
description: Les rollups regroupent des transactions hors chaîne, ce qui réduit les coûts pour l'utilisateur. Cependant, la manière dont les rollups utilisent les données est pour l'heure trop coûteuse, ce qui limite le coût des transactions. La solution Proto-Danksharding règle ce problème.
lang: fr
image: /images/roadmap/roadmap-transactions.png
alt: "Feuille de route d'Ethereum"
template: roadmap
---

Ethereum est mis à l'échelle à l'aide de [couches 2](/layer-2/#rollups) (également appelées rollups), qui regroupent les transactions et envoient le résultat à Ethereum. Bien que les rollups soient jusqu'à huit fois moins chers que le réseau principal d'Ethereum, il est possible d'optimiser davantage ces derniers, et réduire ainsi les coûts des utilisateurs finaux. Les rollups reposent également sur certains composants centralisés, que les développeurs peuvent supprimer à mesure que les rollups évoluent.

<Alert variant="update" className="mb-8">
<AlertContent>
<AlertTitle className="mb-4">
  Frais de transaction
</AlertTitle>
  <ul style={{ marginBottom: 0 }}>
    <li>Aujourd'hui, les rollups sont <strong> 5 à 20 fois</strong> moins coûteux que la couche 1 d'Ethereum</li>
    <li>Les rollups ZK réduiront bientôt de <strong> 40 à 100 fois moins </strong>ces coûts</li>
    <li>Les changements à venir apportés à Ethereum fourniront une mise à l'échelle <strong>~100-1000x</strong> supplémentaire</li>
    <li style={{ marginBottom: 0 }}>Les utilisateurs bénéficieront de transactions<strong> à moins de 0,001 USD</strong></li>
  </ul>
</AlertContent>
</Alert>

## Rendre les données moins chères {#making-data-cheaper}

Les rollups collectent un grand nombre de transactions, les exécutent et soumettent les résultats à Ethereum. Ceci génère un maximum de données qui doivent être publiquement disponibles, pour que quiconque puisse exécuter les transactions et vérifier que l'opérateur du rollup soit intègre. Si une personne constate une divergence, cette dernière peut être contestée.

### Proto-Danksharding {#proto-danksharding}

Les données rollup sont historiquement stockées en permanence sur Ethereum, ce qui est coûteux. Plus de 90 % des frais de transaction assumés par les utilisateurs sur les rollups sont dus à ce stockage de données. Pour réduire les coûts de transaction, il est possible de déplacer les données vers un nouveau stockage temporaire appelé « blob » - Binary Large Object/Large Objet Binaire. Les blobs sont moins chers car temporaires ; ils sont supprimés d'Ethereum une fois leur nécessité devenue obsolète. Le stockage des données rollup à long terme devient la responsabilité des personnes qui en ont besoin, telles que les opérateurs rollup, les bourses, les services d'indexation, etc. L'ajout de transactions blob à Ethereum fait partie d'une mise à niveau connue sous le terme « Proto-Danksharding ».

Avec le Proto-Danksharding, il est possible d'ajouter de nombreux blobs aux blocs Ethereum. Cela permet une autre augmentation substantielle (>100x) du débit d'Ethereum et une réduction des coûts de transaction.

### Danksharding {#danksharding}

La deuxième étape de l'expansion des données blob est compliquée car elle nécessite de nouvelles méthodes pour vérifier que les données de rollup sont disponibles sur le réseau et repose sur la séparation, par les [validateurs](/glossary/#validator), de leurs responsabilités de construction de [bloc](/glossary/#block) et de proposition de bloc. Cela nécessite également un moyen de prouver cryptographiquement que les validateurs ont vérifié de petits sous-ensembles de données blob.

Cette deuxième étape est connue sous le nom de [« Danksharding »](/roadmap/danksharding/). Les travaux d'implémentation se poursuivent, avec des progrès sur les prérequis comme [la séparation de la construction et de la proposition de blocs](/roadmap/pbs) et de nouvelles conceptions de réseau qui permettent au réseau de confirmer efficacement que les données sont disponibles en échantillonnant de manière aléatoire quelques kilo-octets à la fois, une méthode connue sous le nom [d'échantillonnage de disponibilité des données (DAS)](/developers/docs/data-availability).

<ButtonLink variant="outline-color" href="/roadmap/danksharding/">En savoir plus sur Danksharding</ButtonLink>

## Décentralisation des rollups {#decentralizing-rollups}

[Les rollups](/layer-2) permettent déjà la mise à l'échelle d'Ethereum. Un [riche écosystème de projets de rollup](https://l2beat.com/scaling/tvs) permet aux utilisateurs d'effectuer des transactions rapidement et à moindre coût, avec une gamme de garanties de sécurité. Cependant, les rollups ont été initiés en utilisant des séquenceurs centralisés (ordinateurs qui effectuent l'ensemble du traitement et l'agrégation des transactions avant de les soumettre à Ethereum). Cette approche est vulnérable à la censure car, en d'autres termes, les opérateurs-séquenceurs peuvent être sanctionnés, soudoyés ou corrompus. En même temps, [les rollups varient](https://l2beat.com/scaling/summary) dans la manière dont ils valident les données entrantes. La meilleure façon est que les « provers » soumettent des [preuves de fraude](/glossary/#fraud-proof) ou des preuves de validité, mais les rollups n'en sont pas encore tous là. Même ceux qui utilisent des preuves de validité/fraude font appel à un petit groupe de « provers » réputés. Par conséquent, la prochaine étape cruciale dans la mise à l'échelle d'Ethereum consiste à répartir la responsabilité de l'exécution des séquenceurs et des provers, parmi davantage de personnes.

<ButtonLink variant="outline-color" href="/developers/docs/scaling/">En savoir plus sur les rollups</ButtonLink>

## Progrès actuels {#current-progress}

Le Proto-Danksharding a été mis en œuvre avec succès dans le cadre de la mise à niveau du réseau Cancun-Deneb (« Dencun ») en mars 2024. Depuis sa mise en œuvre, les rollups ont commencé à utiliser le stockage de blobs, entraînant une réduction des frais de transaction pour les utilisateurs et des millions de transactions traitées dans des blobs.

Les travaux sur le Danksharding complet se poursuivent, avec des avancées sur ses prérequis tels que PBS (Proposer-Builder Separation) et DAS (Data Availability Sampling). La décentralisation de l'infrastructure de rollup est un processus progressif : il existe de nombreux rollups différents qui construisent des systèmes légèrement différents et seront entièrement décentralisés à des rythmes différents.

[En savoir plus sur la mise à niveau du réseau Dencun et son impact](/roadmap/dencun/)

<QuizWidget quizKey="scaling" />
