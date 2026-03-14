---
title: Impact de La Fusion sur l'offre d'ETH
description: Analyse de l'impact de La Fusion sur l'offre d'ETH
lang: fr
---

# Comment La Fusion a affecté l'offre d'ETH {#how-the-merge-impacts-ETH-supply}

La Fusion a représenté la transition du réseau Ethereum de la preuve de travail à la preuve d'enjeu, qui a eu lieu en septembre 2022. La manière dont l'ETH est émis a subi des changements lors de cette transition. Auparavant, les nouveaux ETH étaient émis à partir de deux sources : la couche d'exécution (c.-à-d. le réseau principal) et la couche de consensus (c.-à-d. la chaîne phare). Depuis La Fusion, l'émission sur la couche d'exécution est désormais nulle. Analysons cela en détail.

## Composants de l'émission d'ETH {#components-of-eth-issuance}

Nous pouvons diviser l'offre d'ETH en deux composantes principales : l'émission et la destruction en le brulant.

L'**émission** d'ETH est le processus de création d'ETH qui n'existait pas auparavant. Le **brûlage** de l'ETH a lieu lorsque de l'ETH existant est détruit, le retirant de la circulation. Le taux d'émission et de destruction est calculé par plusieurs paramètres, et l'équilibre entre eux détermine le taux d'inflation/déflation résultant de l'éther.

<Card
emoji=":chart_decreasing:"
title="Émission d'ETH en bref">

- Avant la transition vers la preuve d'enjeu, les mineurs recevaient environ 13 000 ETH/jour
- Les validateurs reçoivent environ 1 700 ETH/jour, sur la base d'environ 14 millions d'ETH au total mis en jeu
- L'émission exacte de la mise en jeu fluctue en fonction du montant total d'ETH mis en jeu
- **Depuis La Fusion, seuls les ~1 700 ETH/jour subsistent, ce qui fait chuter l'émission totale de nouveaux ETH de ~88 %**
- Le brûlage : Il fluctue en fonction de la demande du réseau. _Si_ un prix moyen du gaz d'au moins 16 gwei est observé pour une journée donnée, cela compense totalement les ~1 700 ETH émis pour les validateurs et ramène l'inflation nette d'ETH à zéro ou moins pour cette journée.
</Card>

## Avant La Fusion (historique) {#pre-merge}

### Émission de la couche d'exécution {#el-issuance-pre-merge}

En preuve de travail, les mineurs n'interagissaient qu'avec la couche d'exécution et étaient récompensés par des récompenses de bloc, si et seulement s'ils étaient les premiers mineurs à résoudre le nouveau bloc. Depuis la [mise à niveau Constantinople](/ethereum-forks/#constantinople) en 2019, cette récompense était de 2 ETH par bloc. Les mineurs étaient également récompensés pour la publication de blocs [ommer](/glossary/#ommer), qui étaient des blocs valides n'ayant pas abouti à la chaîne la plus longue/canonique. Ces récompenses étaient plafonnées à 1,75 ETH par ommer et s'ajoutaient _en plus de_ la récompense émise par le bloc canonique. Le processus de minage était une activité économiquement intensive, qui nécessitait historiquement des niveaux élevés d'émission d'ETH pour être soutenu.

### Émission de la couche de consensus {#cl-issuance-pre-merge}

La [chaîne phare](/ethereum-forks/#beacon-chain-genesis) a été mise en service en 2020. Au lieu de mineurs, elle est sécurisée par des validateurs utilisant la preuve d'enjeu. Cette chaîne a été lancée grâce aux utilisateurs d'Ethereum qui déposaient de l'ETH de manière unidirectionnelle dans un contrat intelligent sur le réseau principal (la couche d'exécution), que la Chaîne phare écoute, en créditant l'utilisateur d'une quantité égale d'ETH sur la nouvelle chaîne. Jusqu'à ce que La Fusion ait lieu, les validateurs de la Chaîne phare ne traitaient pas les transactions et avaient seulement comme mission d'établir un consensus sur l'état du groupe de validateurs lui-même.

Les validateurs de la Chaîne phare sont récompensés en ETH pour attester de l'état de la chaîne et proposer des blocs. Les récompenses (ou les pénalités) sont calculées et distribuées à chaque période (toutes les 6,4 minutes) en fonction des performances des validateurs. Les récompenses des validateurs sont **nettement** moins élevées que les récompenses de minage qui étaient précédemment émises sous la preuve de travail (2 ETH toutes les ~13,5 secondes), car l'exploitation d'un nœud de validation n'est pas aussi intense sur le plan économique et ne nécessite donc ni ne garantit une récompense aussi élevée.

### Répartition des émissions avant La Fusion {#pre-merge-issuance-breakdown}

Offre totale d'ETH : **~120 520 000 ETH** (au moment de La Fusion en septembre 2022)

**Émission de la couche d'exécution:**

- A été estimée à 2,08 ETH par 13,3 secondes\* : **~4 930 000** ETH émis en un an
- A entraîné un taux d'inflation d'**environ 4,09 %** (4,93 M par an / 120,5 M au total)
- \*Cela comprend les 2 ETH par bloc canonique, ainsi qu'une moyenne de 0,08 ETH sur la durée provenant des blocs oncles. Utilise également 13,3 secondes, le temps de bloc cible de référence sans aucune influence d'une [bombe de difficulté](/glossary/#difficulty-bomb). ([Voir la source](https://bitinfocharts.com/ethereum/))

**Émission de la couche de consensus:**

- Avec un total de 14 000 000 d'ETH mis en jeu, le taux d'émission d'ETH est d'environ 1 700 ETH/jour ([Voir la source](https://ultrasound.money/))
- Résultat : **~620 500** ETH émis en un an
- A entraîné un taux d'inflation d'**environ 0,52 %** (620,5 k par an / 119,3 M au total)

<Alert variant="update">
<AlertContent>
<AlertDescription>
**Taux d'émission annualisé total (avant La Fusion) : ~4,61 %** (4,09 % + 0,52 %)

**~88,7 %** de l'émission était destinée aux mineurs sur la couche d'exécution (4,09 / 4,61 \* 100)

**~11,3 %** étaient émis aux validateurs sur la couche de consensus (0,52 / 4,61 \* 100)
</AlertDescription>

</AlertContent>

</Alert>

## Après La Fusion (actuellement) {#post-merge}

### Émission de la couche d'exécution {#el-issuance-post-merge}

L'émission de la couche d'exécution depuis La Fusion est nulle. La preuve de travail n'est plus un moyen valide de production de blocs selon les règles de consensus mises à niveau. Toute l'activité de la couche d'exécution est regroupée en « blocs-phare », qui sont publiés et attestés par des validateurs de preuve d'enjeu. Les récompenses pour l'attestation et la publication des blocs-phare sont comptabilisées séparément sur la couche de consensus.

### Émission de la couche de consensus {#cl-issuance-post-merge}

L'émission sur la couche de consensus se poursuit aujourd'hui comme avant La Fusion, avec de petites récompenses pour les validateurs qui attestent et proposent des blocs. Les récompenses des validateurs continuent de s'accumuler sur les _soldes des validateurs_ qui sont gérés au sein de la couche de consensus. Contrairement aux comptes actuels (comptes d'« exécution »), qui peuvent effectuer des transactions sur le réseau principal, ces comptes Ethereum séparés ne peuvent pas effectuer librement des transactions avec d'autres comptes Ethereum. Les fonds de ces comptes ne peuvent être retirés que vers une seule adresse d'exécution spécifiée.

Depuis la mise à niveau Shanghai/Capella qui a eu lieu en avril 2023, ces retraits ont été activés pour les validateurs. Les validateurs sont incités à retirer leurs _gains/récompenses (solde supérieur à 32 ETH)_ car ces fonds ne contribuent pas autrement à leur poids de mise (qui est plafonné à 32).

Les validateurs peuvent également choisir de sortir et de retirer l'intégralité de leur solde de validateur. Pour garantir la stabilité d'Ethereum, le nombre de validateurs quittant simultanément est plafonné.

Environ 0,33 % du nombre total de validateurs peuvent sortir en une journée donnée. Par défaut, quatre (4) validateurs peuvent sortir par période (toutes les 6,4 minutes, soit 900 par jour). Un (1) validateur supplémentaire est autorisé à sortir pour chaque 65 536 (2<sup>16</sup>) validateurs supplémentaires au-delà de 262 144 (2<sup>18</sup>). Par exemple, avec plus de 327 680 validateurs, cinq (5) peuvent sortir par période (1 125 par jour). Six (6) seront autorisés avec un nombre total de validateurs actifs supérieur à 393 216, et ainsi de suite.

À mesure que de plus en plus de validateurs se retirent, le nombre maximal de validateurs sortants sera progressivement réduit à un minimum de quatre afin d'empêcher intentionnellement le retrait simultané de montants importants et déstabilisateurs d'ETH mis en jeu.

### Répartition de l'inflation après La Fusion {#post-merge-inflation-breakdown}

- Offre totale d'ETH : **~120 520 000 ETH** (au moment de La Fusion en septembre 2022)
- Émission de la couche d'exécution : **0**
- Émission de la couche de consensus : Identique à ce qui précède, taux d'émission annualisé de **~0,52 %** (avec un total de 14 millions d'ETH mis en jeu)

<Alert variant="update">
<AlertContent>
<AlertDescription>
Taux d'émission annualisé total : **~0,52 %**

Réduction nette de l'émission annuelle d'ETH : **~88,7 %** ((4,61 % - 0,52 %) / 4,61 % \* 100)
</AlertDescription>

</AlertContent>

</Alert>

## <Emoji text=":fire:" size="1" /> La combustion {#the-burn}

La force opposée à l'émission d'ETH est le taux auquel l'ETH est brûlé. Pour qu'une transaction soit exécutée sur Ethereum, des frais minimum (appelés « frais de base ») doivent être payés, qui fluctuent continuellement (de bloc à bloc) en fonction de l'activité du réseau. Les frais sont payés en ETH et sont _requis_ pour que la transaction soit considérée comme valide. Ces frais sont _brûlés_ pendant le processus de transaction, les retirant de la circulation.

<Alert variant="update">
<AlertContent>
<AlertDescription>

La combustion des frais a été mise en service avec [la mise à niveau de Londres](/ethereum-forks/#london) en août 2021 et reste inchangée depuis La Fusion.
</AlertDescription>

</AlertContent>

</Alert>

En plus de la combustion des frais mise en œuvre par la mise à niveau London, les validateurs peuvent également subir des pénalités s'ils sont hors ligne, ou pire, ils peuvent être sanctionnés pour avoir enfreint des règles spécifiques qui menacent la sécurité du réseau. Ces pénalités entraînent une réduction d'ETH du solde du validateur, qui n'est alors pas directement donné à un autre compte, ce qui équivaut à le brûler/le retirer de la circulation.

### Calcul du prix moyen du gaz pour la déflation {#calculating-average-gas-price-for-deflation}

Comme discuté précédemment, la quantité d'ETH émise en une journée donnée dépend de la totalité des ETH mis en jeu. Au moment de l'écriture de ses lignes, cela représente environ 1 700 ETH/jour.

Pour déterminer le prix moyen du gaz nécessaire pour compenser complètement cette émission au cours d'une période de 24 heures, nous commencerons par calculer le nombre total de blocs en une journée, en supposant un temps de bloc de 12 secondes :

- `(1 bloc / 12 secondes) * (60 secondes/minute) = 5 blocs/minute`
- `(5 blocs/minute) * (60 minutes/heure) = 300 blocs/heure`
- `(300 blocs/heure) * (24 heures/jour) = 7 200 blocs/jour`

Chaque bloc cible `15x10^6 gaz/bloc` ([en savoir plus sur le gaz](/developers/docs/gas/)). En utilisant cela, nous pouvons en déduire le prix moyen du gaz (en unités de gwei/gaz) nécessaire pour compenser l'émission, étant donné une émission quotidienne totale d'ETH de 1 700 :

- `7200 blocs/jour * 15x10^6 gaz/bloc * `**`Y gwei/gaz`**` * 1 ETH/ 10^9 gwei = 1700 ETH/jour`

Résolution pour `Y` :

- `Y = (1700(10^9))/(7200 * 15(10^6)) = (17x10^3)/(72 * 15) = 16 gwei` (arrondi à deux chiffres significatifs)

Une autre façon de réarranger cette dernière étape serait de remplacer `1700` par une variable `X` qui représente l'émission quotidienne d'ETH, et de simplifier le reste en :

- `Y = (X(10^3)/(7200 * 15)) = X/108`

Nous pouvons simplifier et écrire ceci comme une fonction de `X` :

- `f(X) = X/108` où `X` est l'émission quotidienne d'ETH, et `f(X)` représente le prix en gwei/gaz requis pour compenser tous les nouveaux ETH émis.

Ainsi, par exemple, si `X` (émission quotidienne d'ETH) passe à 1 800 en fonction du total des ETH mis en jeu, `f(X)` (gwei requis pour compenser toute l'émission) serait alors de `17 gwei` (en utilisant 2 chiffres significatifs)

## En savoir plus {#further-reading}

- [La Fusion](/roadmap/merge/)
- [Ultrasound.money](https://ultrasound.money/) - _Tableaux de bord disponibles pour visualiser l'émission et le brûlage d'ETH en temps réel_
- [Cartographie de l'émission d'Ethereum](https://www.attestant.io/posts/charting-ethereum-issuance/) - _Jim McDonald 2020_
