---
title: Impact de La Fusion sur l'offre d'ETH
description: Analyse de l'impact de La Fusion sur l'offre d'ETH
lang: fr
---

# Impact de La Fusion sur l'offre d'ETH {#how-the-merge-impacts-ETH-supply}

La Fusion a marqué la transition du réseau Ethereum de la preuve de travail à la preuve d'enjeu, qui a eu lieu en septembre 2022. La manière dont l'ETH est émis a subi des changements lors de cette transition. Auparavant, de nouveaux ETH étaient émis à partir de deux sources : la couche d'exécution (c'est-à-dire Réseau principal) et la couche de consensus (c'est-à-dire  la chaîne phare). Depuis La Fusion, l'émission sur la couche d'exécution est désormais nulle. Analysons cela en détail.

## La répartition de l'émission d'ETH {#components-of-eth-issuance}

Nous pouvons diviser l'offre d'ETH en deux composantes principales : l'émission et la destruction en le brulant.

**L'émission** d'ETH est le processus de création d'ETH qui n'existait pas auparavant. Le **brûlage** de l'ETH se produit lorsque l'ETH existant est détruit, le retirant de la circulation. Le taux d'émission et de destruction est calculé par plusieurs paramètres, et l'équilibre entre eux détermine le taux d'inflation/déflation résultant de l'éther.

<Card
emoji=":chart_decreasing:"
title="Résumé de l'émission d'ETH">

- Avant la transition vers la preuve d'enjeu, les mineurs recevaient environ 13 000 ETH/jour
- Les validateurs reçoivent environ 1 700 ETH/jour, basés sur un total d'environ 14 millions d'ETH mis en jeu
- L'émission exacte liée à la preuve d'enjeu fluctue en fonction du montant total d'ETH mis en jeu
- **Depuis La Fusion, seul le ~1 700 ETH/jour subsiste, réduisant l'émission totale d'ETH neuf de ~88 %**
- La destruction en brûlant : celle-ci varie en fonction de la demande du réseau. _Si_ un prix moyen du gaz d'au moins 16 gwei est observé pour une journée donnée, cela compense totalement les ~1 700 ETH émis pour les validateurs et ramène l'inflation nette d'ETH à zéro ou moins pour cette journée.

</Card>

## Avant la fusion (historique) {#pre-merge}

### Émission de la couche d'exécution {#el-issuance-pre-merge}

En preuve de travail, les mineurs n'interagissaient qu'avec la couche d'exécution et étaient récompensés par des récompenses de bloc, si et seulement s'ils étaient les premiers mineurs à résoudre le nouveau bloc. Depuis [la mise à jour Constantinople](/history/#constantinople) en 2019, cette récompense était de 2 ETH par bloc. Les mineurs étaient également récompensés pour la publication de blocs [oncle](/glossary/#ommer), qui étaient des blocs valides mais qui n'avaient pas abouti à la chaîne la plus longue/canonique. Ces récompenses étaient plafonnées à 1,75 ETH par bloc oncle et _s'ajoutaient à_ la récompense émise à partir du bloc canonique. Le processus de minage était une activité économiquement intensive, qui nécessitait historiquement des niveaux élevés d'émission d'ETH pour être soutenu.

### Émission de la couche de consensus {#cl-issuance-pre-merge}

La [Chaîne phare](/history/#beacon-chain-genesis) est entrée en service en 2020. Au lieu de mineurs, elle est sécurisée par des validateurs utilisant la preuve d'enjeu. Cette chaîne a été lancée grâce aux utilisateurs d'Ethereum qui déposaient de l'ETH de manière unidirectionnelle dans un contrat intelligent sur le réseau principal (la couche d'exécution), que la Chaîne phare écoute, en créditant l'utilisateur d'une quantité égale d'ETH sur la nouvelle chaîne. Jusqu'à ce que La Fusion ait lieu, les validateurs de la Chaîne phare ne traitaient pas les transactions et avaient seulement comme mission d'établir un consensus sur l'état du groupe de validateurs lui-même.

Les validateurs de la Chaîne phare sont récompensés en ETH pour attester de l'état de la chaîne et proposer des blocs. Les récompenses (ou les pénalités) sont calculées et distribuées à chaque période (toutes les 6,4 minutes) en fonction des performances des validateurs. Les récompenses des validateurs sont **nettement** moins élevées que les récompenses de minage qui étaient précédemment émises sous la preuve de travail (2 ETH toutes les ~13,5 secondes), car l'exploitation d'un nœud de validation n'est pas aussi économiquement intense et ne nécessite donc ni ne garantit une récompense aussi élevée.

### Répartition de l'émission avant la fusion {#pre-merge-issuance-breakdown}

Offre totale d'ETH : **~120 520 000 ETH** (au moment de La Fusion en septembre 2022)

**Émission de la couche d'exécution :**

- Était estimée à 2,08 ETH par période de 13,3 secondes\* : **~4 930 000** ETH émis en un an
- Entraînant un taux d'inflation **d'environ 4,09 %** (4,93 millions par an / 120,5 millions au total)
- \*Cela comprend les 2 ETH par bloc canonique, ainsi qu'une moyenne de 0,08 ETH sur la durée provenant des blocs oncles. En utilisant également 13,3 secondes, le temps cible de base pour un bloc sans aucune influence de la [bombe de difficulté](/glossary/#difficulty-bomb). ([Voir la source](https://bitinfocharts.com/ethereum/))

**Émission de la couche de consensus :**

- En utilisant un total de 14 000 000 d'ETH en jeu, le taux d'émission d'ETH est d'environ 1 700 ETH par jour ([Voir la source](https://ultrasound.money/))
- Cela résulte en **~620 500** ETH émis en un an
- Cela a entraîné un taux d'inflation **d'environ 0,52 %** (620,5 K par an / 119,3 M au total)

<InfoBanner>
<strong>Taux d'émission annuel totalisé (avant la fusion) : ~4,61 %</strong> (4,09 % + 0,52 %)<br/><br/>
<strong>~88,7 %</strong> de l'émission allaient aux mineurs de la couche d'exécution (4,09 / 4,61 * 100)<br/><br/>
<strong>~11,3 %</strong> étaient émis aux validateurs de la couche de consensus (0,52 / 4,61 * 100)
</InfoBanner>

## Après la fusion (à présent) {#post-merge}

### Émission de la couche d'exécution {#el-issuance-post-merge}

L'émission de la couche d'exécution depuis La Fusion est nulle. La preuve de travail n'est plus un moyen valide de production de blocs selon les nouvelles règles de consensus. Toute l'activité de la couche d'exécution est regroupée dans des « blocs de phare », qui sont publiés et attestés par les validateurs de la preuve d'enjeu. Les récompenses pour l'attestation et la publication des blocs de phare sont comptabilisées séparément sur la couche de consensus.

### Émission de la couche de consensus {#cl-issuance-post-merge}

L'émission de la couche de consensus se poursuit aujourd'hui comme avant La Fusion, avec des récompenses pour les validateurs qui attestent et proposent des blocs. Les récompenses des validateurs continuent de s'accumuler sur _les soldes des validateurs_ qui sont gérés au sein de la couche de consensus. Contrairement aux comptes actuels (« comptes d'exécution »), qui peuvent effectuer des transactions sur le réseau principal, ces comptes Ethereum séparés ne peuvent pas effectuer librement des transactions avec d'autres comptes Ethereum. Les fonds de ces comptes ne peuvent être retirés que vers une seule adresse d'exécution préalablement spécifiée.

Depuis la mise à jour de Shanghai/Capella qui a eu lieu en avril 2023, ces retraits ont été activés pour les validateurs. Les stakers sont incités à retirer leurs _gains/récompenses (solde supérieur à 32 ETH)_ car ces fonds ne contribuent pas plus à leur poids d'enjeu (qui atteint un maximum à 32).

Les validateurs peuvent également choisir de sortir et de retirer l'intégralité de leur solde de validateur. Pour garantir la stabilité d'Ethereum, le nombre de validateurs quittant simultanément est plafonné.

Environ 0,33 % du nombre total de validateurs peuvent sortir en une journée donnée. Par défaut, quatre (4) validateurs peuvent sortir par période (toutes les 6,4 minutes, soit 900 par jour). Un (1) validateur supplémentaire est autorisé à sortir pour chaque 65 536 (2<sup>16</sup>) validateurs supplémentaires au-delà de 262 144 (2<sup>18</sup>). Par exemple, avec plus de 327 680 validateurs, cinq (5) peuvent sortir par période (1 125 par jour). Six (6) seront autorisés avec un nombre total de validateurs actifs supérieur à 393 216, et ainsi de suite.

À mesure que davantage de validateurs se retirent, le nombre maximum de validateurs sortants sera progressivement réduit à un minimum de quatre pour empêcher intentionnellement de grandes quantités d'ETH en jeu d'être retirées simultanément, ce qui pourrait provoquer des perturbations majeures.

### Répartition de l'inflation après la fusion {#post-merge-inflation-breakdown}

- Offre totale d'ETH : **~120 520 000 ETH** (au moment de La Fusion en septembre 2022)
- Émission de la couche d'exécution : **0**
- Émission de la couche de consensus : Identique à ce qui précède, taux d'émission annualisé d'environ **0,52 %** (avec un total de 14 millions d'ETH en jeu)

<InfoBanner>
Taux d'émission annualisé total : <strong>~0,52 %</strong><br/><br/>
Réduction nette de l'émission annuelle d'ETH : <strong>~88,7 %</strong> ((4,61 % - 0,52 %) / 4,61 % * 100)
</InfoBanner>

## <Emoji text=":fire:" size="1" />La destruction par brûlage {#the-burn}

La force opposée à l'émission d'ETH est le taux auquel l'ETH est brûlé. Pour qu'une transaction soit exécutée sur Ethereum, des frais minimum (appelés « frais de base ») doivent être payés, qui fluctuent continuellement (de bloc à bloc) en fonction de l'activité du réseau. Les frais sont payés en ETH et sont _nécessaires_ pour que la transaction soit considérée comme valide. Ces frais sont _brûlés_ pendant le processus de transaction, les retirant ainsi de la circulation.

<InfoBanner>
La combustion des frais a été mise en place avec <a href="/history/#london">la mise à jour London</a> en août 2021 et est restée inchangée depuis la Fusion.
</InfoBanner>

En plus de la combustion des frais mise en œuvre par la mise à niveau London, les validateurs peuvent également subir des pénalités s'ils sont hors ligne, ou pire, ils peuvent être sanctionnés pour avoir enfreint des règles spécifiques qui menacent la sécurité du réseau. Ces pénalités entraînent une réduction d'ETH du solde du validateur, qui n'est alors pas directement donné à un autre compte, ce qui équivaut à le brûler/le retirer de la circulation.

### Calcul de la moyenne du prix du gaz pour être déflationniste {#calculating-average-gas-price-for-deflation}

Comme discuté précédemment, la quantité d'ETH émise en une journée donnée dépend de la totalité des ETH mis en jeu. Au moment de l'écriture de ses lignes, cela représente environ 1 700 ETH/jour.

Pour déterminer le prix moyen du gaz nécessaire pour compenser complètement cette émission au cours d'une période de 24 heures, nous commencerons par calculer le nombre total de blocs en une journée, en supposant un temps de bloc de 12 secondes :

- `(1 bloc / 12 secondes) * (60 secondes/minute) = 5 blocs/minute`
- `(5 blocs/minute) * (60 minutes/heure) = 300 blocs/heure`
- `(300 blocs/heure) * (24 heures/jour) = 7 200 blocs/jour`

Chaque bloc cible `15x10^6 gaz/bloc` ([plus d'informations sur le gaz](/developers/docs/gas/)). En utilisant cela, nous pouvons en déduire le prix moyen du gaz (en unités de gwei/gaz) nécessaire pour compenser l'émission, étant donné une émission quotidienne totale d'ETH de 1 700 :

- `7 200 blocs/jour * 15x10^6 gaz/bloc *`**` Y gwei/gaz`**`* 1 ETH/ 10^9 gwei = 1 700 ETH/jour`

En cherchant `Y` :

- `Y = (1 700(10^9))/(7 200 * 15(10^6)) = (17x10^3)/(72 * 15) = 16 gwei` (arrondi à seulement deux chiffres significatifs)

Une autre façon de réarranger cette dernière étape serait de remplacer `1 700` par une variable `X` qui représente l'émission quotidienne d'ETH, et de simplifier le reste en :

- `Y = (X(10^3)/(7200 * 15)) = X/108`

Nous pouvons simplifier et écrire ceci comme une fonction de `X` :

- `F(X) = X/108` où `X` représente l'émission quotidienne d'ETH et `F(X)` représente le prix en gwei requis pour compenser entièrement la nouvelle émission d'ETH.

Ainsi, par exemple, si `X` (l'émission quotidienne d'ETH) augmente à 1 800 en fonction de la totalité des ETH mis en jeu, `f(X)` (le gwei requis pour compenser toute l'émission) serait alors de `17 gwei` (en utilisant 2 chiffres significatifs)

## Complément d'information {#further-reading}

- [La Fusion](/roadmap/merge/)
- [Ultrasound.money](https://ultrasound.money/) - _Tableaux de bord disponibles pour visualiser l'émission et la destruction d'ETH en temps réel_
- [Graphique de l'émission Ethereum](https://www.attestant.io/posts/charting-ethereum-issuance/) - _Jim McDonald 2020_
