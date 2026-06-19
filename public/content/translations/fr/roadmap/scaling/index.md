---
title: Mise à l'échelle d'Ethereum
description: Les rollups regroupent les transactions hors chaîne, réduisant ainsi les coûts pour l'utilisateur. Cependant, la façon dont les rollups utilisent actuellement les données est trop coûteuse, ce qui limite la réduction du coût des transactions. Le proto-danksharding résout ce problème.
lang: fr
image: /images/roadmap/roadmap-transactions.png
alt: Feuille de route d'Ethereum
template: roadmap
---

La mise à l'échelle d'Ethereum s'effectue à l'aide de [couches 2](/layer-2/#rollups) (également appelées rollups), qui regroupent les transactions et envoient le résultat à Ethereum. Même si les rollups sont jusqu'à huit fois moins chers que le réseau principal Ethereum, il est possible de les optimiser davantage pour réduire les coûts pour les utilisateurs finaux. Les rollups s'appuient également sur certains composants centralisés que les développeurs peuvent supprimer à mesure que les rollups gagnent en maturité.

<Alert variant="update">
<AlertContent>
<AlertTitle className="mb-4">
  Coûts de transaction
</AlertTitle>
  <ul style={{ marginBottom: 0 }}>
    <li>Les rollups actuels sont <strong>~5 à 20 fois</strong> moins chers que la couche 1 (l1) d'Ethereum</li>
    <li>Les ZK-rollups réduiront bientôt les frais de <strong>~40 à 100 fois</strong></li>
    <li>Les prochaines modifications apportées à Ethereum offriront une mise à l'échelle supplémentaire de <strong>~100 à 1000 fois</strong></li>
    <li style={{ marginBottom: 0 }}>Les utilisateurs devraient bénéficier de transactions <strong>coûtant moins de 0,001 $</strong></strong>
  </strong>
</AlertContent>
</Alert>

## Rendre les données moins chères {#making-data-cheaper}

Les rollups collectent un grand nombre de transactions, les exécutent et soumettent les résultats à Ethereum. Cela génère beaucoup de données qui doivent être librement accessibles afin que quiconque puisse exécuter les transactions par lui-même et vérifier que l'opérateur du rollup a été honnête. Si quelqu'un trouve une anomalie, il peut soulever une contestation.

### Proto-danksharding {#proto-danksharding}

Historiquement, les données des rollups étaient stockées de manière permanente sur Ethereum, ce qui est coûteux. Plus de 90 % du coût de transaction que les utilisateurs paient sur les rollups est dû à ce stockage de données. Pour réduire les coûts de transaction, nous pouvons déplacer les données vers un nouveau stockage temporaire de « blobs ». Les blobs sont moins chers car ils ne sont pas permanents ; ils sont supprimés d'Ethereum une fois qu'ils ne sont plus nécessaires. Le stockage à long terme des données des rollups devient la responsabilité des personnes qui en ont besoin, telles que les opérateurs de rollups, les plateformes d'échange, les services d'indexation, etc. L'ajout de transactions de blobs à Ethereum fait partie d'une mise à jour connue sous le nom de « proto-danksharding ».

Avec le proto-danksharding, il est possible d'ajouter de nombreux blobs aux blocs Ethereum. Cela permet une autre augmentation substantielle (>100x) du débit d'Ethereum et une réduction des coûts de transaction.

### Danksharding {#danksharding}

La deuxième étape de l'expansion des données de blobs est compliquée car elle nécessite de nouvelles méthodes pour vérifier que les données des rollups sont disponibles sur le réseau et repose sur le fait que les [validateurs](/glossary/#validator) séparent leurs responsabilités de construction de [blocs](/glossary/#block) et de proposition de blocs. Elle nécessite également un moyen de prouver cryptographiquement que les validateurs ont vérifié de petits sous-ensembles des données de blobs.

Cette deuxième étape est connue sous le nom de [« danksharding »](/roadmap/danksharding/). Le travail de mise en œuvre se poursuit, avec des progrès réalisés sur des prérequis tels que la [séparation de la construction et de la proposition de blocs](/roadmap/pbs) et de nouvelles conceptions de réseau qui permettent au réseau de confirmer efficacement que les données sont disponibles en échantillonnant aléatoirement quelques kilo-octets à la fois, ce que l'on appelle l'[échantillonnage de la disponibilité des données (DAS)](/developers/docs/data-availability).

<ButtonLink variant="outline-color" href="/roadmap/danksharding/">En savoir plus sur le danksharding</ButtonLink>

## Décentralisation des rollups {#decentralizing-rollups}

Les [rollups](/layer-2) mettent déjà Ethereum à l'échelle. Un [riche écosystème de projets de rollups](https://l2beat.com/scaling/tvs) permet aux utilisateurs d'effectuer des transactions rapidement et à moindre coût, avec diverses garanties de sécurité. Cependant, les rollups ont été amorcés à l'aide de séquenceurs centralisés (des ordinateurs qui effectuent tout le traitement et l'agrégation des transactions avant de les soumettre à Ethereum). Cela les rend vulnérables à la censure, car les opérateurs de séquenceurs peuvent être sanctionnés, soudoyés ou autrement compromis. Dans le même temps, les [rollups varient](https://l2beat.com/scaling/summary) dans la façon dont ils valident les données entrantes. La meilleure méthode consiste pour les « prouveurs » à soumettre des [preuves de fraude](/glossary/#fraud-proof) ou des preuves de validité, mais tous les rollups n'en sont pas encore là. Même les rollups qui utilisent des preuves de validité/fraude font appel à un petit groupe de prouveurs connus. Par conséquent, la prochaine étape critique dans la mise à l'échelle d'Ethereum consiste à répartir la responsabilité de l'exécution des séquenceurs et des prouveurs entre un plus grand nombre de personnes.

<ButtonLink variant="outline-color" href="/developers/docs/scaling/">En savoir plus sur les rollups</ButtonLink>

## Progrès actuels {#current-progress}

Le proto-danksharding a été mis en œuvre avec succès dans le cadre de la mise à jour du réseau Cancun-Deneb (« Dencun ») en mars 2024. Depuis sa mise en œuvre, les rollups ont commencé à utiliser le stockage de blobs, ce qui a entraîné une réduction des coûts de transaction pour les utilisateurs et le traitement de millions de transactions dans des blobs.

Le travail sur le danksharding complet se poursuit, avec des progrès réalisés sur ses prérequis tels que la séparation proposant-constructeur (PBS) et l'échantillonnage de la disponibilité des données (DAS). La décentralisation de l'infrastructure des rollups est un processus graduel : il existe de nombreux rollups différents qui construisent des systèmes légèrement différents et se décentraliseront complètement à des rythmes différents.

[En savoir plus sur la mise à jour du réseau Dencun et son impact](/roadmap/dencun/)

<QuizWidget quizKey="scaling" />