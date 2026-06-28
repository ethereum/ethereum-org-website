---
title: Comment La Fusion a impacté l'offre d'ETH
description: Analyse de l'impact de La Fusion sur l'offre d'ETH
lang: fr
---

La Fusion a représenté la transition du réseau [Ethereum](/) de la preuve de travail (PoW) à la preuve d'enjeu (PoS), qui a eu lieu en septembre 2022. La façon dont l'ETH était émis a subi des changements au moment de cette transition. Auparavant, les nouveaux ETH étaient émis à partir de deux sources : la couche d'exécution (c.-à-d. le Réseau principal) et la couche de consensus (c.-à-d. la chaîne balise). Depuis La Fusion, l'émission sur la couche d'exécution est désormais nulle. Analysons cela en détail.

## Composantes de l'émission d'ETH {#components-of-eth-issuance}

Nous pouvons diviser l'offre d'ETH en deux forces principales : l'émission et le burn.

L'**émission** d'ETH est le processus de création d'ETH qui n'existaient pas auparavant. Le **burn** d'ETH se produit lorsque des ETH existants sont détruits, les retirant ainsi de la circulation. Le taux d'émission et de burn est calculé en fonction de plusieurs paramètres, et l'équilibre entre les deux détermine le taux d'inflation/déflation de l'ether qui en résulte.

<Card
emoji=":chart_decreasing:"
title="ETH issuance tldr">

- Avant la transition vers la preuve d'enjeu, les mineurs recevaient une émission d'environ 13 000 ETH/jour
- Les stakers reçoivent une émission d'environ 1 700 ETH/jour, sur la base d'un total d'environ 14 millions d'ETH mis en jeu
- L'émission exacte liée au staking fluctue en fonction du montant total d'ETH mis en jeu
- **Depuis La Fusion, seuls les ~1 700 ETH/jour subsistent, ce qui réduit l'émission totale de nouveaux ETH d'environ 88 %**
- Le burn : Il fluctue en fonction de la demande du réseau. _Si_ un prix du gaz moyen d'au moins 16 gwei est observé pour un jour donné, cela compense effectivement les ~1 700 ETH qui sont émis pour les validateurs et ramène l'inflation nette d'ETH à zéro ou moins pour ce jour-là.

</Card>

## Avant La Fusion (historique) {#pre-merge}

### Émission sur la couche d'exécution {#el-issuance-pre-merge}

Sous la preuve de travail, les mineurs n'interagissaient qu'avec la couche d'exécution et recevaient des récompenses de bloc s'ils étaient les premiers mineurs à résoudre le bloc suivant. Depuis la [mise à jour Constantinople](/ethereum-forks/#constantinople) en 2019, cette récompense était de 2 ETH par bloc. Les mineurs étaient également récompensés pour la publication de blocs [oncles (ommer)](/glossary/#ommer), qui étaient des blocs valides ne se retrouvant pas dans la chaîne la plus longue/canonique. Ces récompenses plafonnaient à 1,75 ETH par bloc oncle, et s'ajoutaient _en plus_ de la récompense émise par le bloc canonique. Le processus de minage était une activité économiquement intensive, qui nécessitait historiquement des niveaux élevés d'émission d'ETH pour se maintenir.

### Émission sur la couche de consensus {#cl-issuance-pre-merge}

La [chaîne balise](/ethereum-forks/#beacon-chain-genesis) a été lancée en 2020. Au lieu de mineurs, elle est sécurisée par des validateurs utilisant la preuve d'enjeu. Cette chaîne a été amorcée par des utilisateurs d'Ethereum déposant des ETH de manière unidirectionnelle dans un contrat intelligent sur le Réseau principal (la couche d'exécution), que la chaîne balise écoute, créditant l'utilisateur d'un montant égal d'ETH sur la nouvelle chaîne. Jusqu'à ce que La Fusion ait lieu, les validateurs de la chaîne balise ne traitaient pas de transactions et parvenaient essentiellement à un consensus sur l'état du groupe de validateurs lui-même.

Les validateurs sur la chaîne balise sont récompensés en ETH pour avoir attesté de l'état de la chaîne et proposé des blocs. Les récompenses (ou pénalités) sont calculées et distribuées à chaque époque (toutes les 6,4 minutes) en fonction des performances du validateur. Les récompenses des validateurs sont **considérablement** inférieures aux récompenses de minage qui étaient auparavant émises sous la preuve de travail (2 ETH toutes les ~13,5 secondes), car l'exploitation d'un nœud de validation n'est pas aussi intense sur le plan économique et ne nécessite ni ne justifie donc une récompense aussi élevée.

### Répartition de l'émission avant La Fusion {#pre-merge-issuance-breakdown}

Offre totale d'ETH : **~120 520 000 ETH** (au moment de La Fusion en septembre 2022)

**Émission sur la couche d'exécution :**

- Était estimée à 2,08 ETH toutes les 13,3 secondes\* : **~4 930 000** ETH émis en un an
- Entraînait un taux d'inflation d'**environ 4,09 %** (4,93 M par an / 120,5 M au total)
- \*Cela inclut les 2 ETH par bloc canonique, plus une moyenne de 0,08 ETH au fil du temps provenant des blocs oncles. Utilise également 13,3 secondes, la cible de temps de bloc de base sans aucune influence d'une [bombe de difficulté](/glossary/#difficulty-bomb). ([Voir la source](https://bitinfocharts.com/ethereum/))

**Émission sur la couche de consensus :**

- En utilisant un total de 14 000 000 d'ETH mis en jeu, le taux d'émission d'ETH est d'environ 1 700 ETH/jour ([Voir la source](https://ultrasound.money/))
- Entraîne **~620 500** ETH émis en un an
- Entraînait un taux d'inflation d'**environ 0,52 %** (620,5 k par an / 119,3 M au total)

<Alert variant="update">
<AlertContent>
<AlertDescription>
**Taux d'émission annualisé total (avant La Fusion) : ~4,61 %** (4,09 % + 0,52 %)

**~88,7 %** de l'émission allait aux mineurs sur la couche d'exécution (4,09 / 4,61 * 100)

**~11,3 %** était émis pour les stakers sur la couche de consensus (0,52 / 4,61 * 100)
</AlertDescription>
</AlertContent>
</Alert>

## Après La Fusion (aujourd'hui) {#post-merge}

### Émission sur la couche d'exécution {#el-issuance-post-merge}

L'émission sur la couche d'exécution depuis La Fusion est nulle. La preuve de travail n'est plus un moyen valide de production de blocs selon les règles de consensus mises à jour. Toute l'activité de la couche d'exécution est regroupée dans des « blocs balises », qui sont publiés et attestés par des validateurs en preuve d'enjeu. Les récompenses pour l'attestation et la publication des blocs balises sont comptabilisées séparément sur la couche de consensus.

### Émission sur la couche de consensus {#cl-issuance-post-merge}

L'émission sur la couche de consensus se poursuit aujourd'hui comme avant La Fusion, avec de petites récompenses pour les validateurs qui attestent et proposent des blocs. Les récompenses des validateurs continuent de s'accumuler sur les _soldes des validateurs_ qui sont gérés au sein de la couche de consensus. Contrairement aux comptes actuels (comptes « d'exécution »), qui peuvent effectuer des transactions sur le Réseau principal, ce sont des comptes Ethereum distincts qui ne peuvent pas effectuer de transactions librement avec d'autres comptes Ethereum. Les fonds de ces comptes ne peuvent être retirés que vers une seule adresse d'exécution spécifiée.

Depuis la mise à jour Shanghai/Capella qui a eu lieu en avril 2023, ces retraits ont été activés pour les stakers. Les stakers sont incités à retirer leurs _gains/récompenses (solde supérieur à 32 ETH)_ car ces fonds ne contribuent pas autrement à leur poids de mise (qui plafonne à 32).

Les stakers peuvent également choisir de faire une sortie et de retirer l'intégralité du solde de leur validateur. Pour garantir la stabilité d'Ethereum, le nombre de validateurs sortant simultanément est plafonné.

Environ 0,33 % du nombre total de validateurs peut sortir un jour donné. Par défaut, quatre (4) validateurs peuvent sortir par époque (toutes les 6,4 minutes, soit 900 par jour). Un (1) validateur supplémentaire est autorisé à sortir pour chaque tranche de 65 536 (2<sup>16</sup>) validateurs supplémentaires au-delà de 262 144 (2<sup>18</sup>). Par exemple, avec plus de 327 680 validateurs, cinq (5) peuvent sortir par époque (1 125 par jour). Six (6) seront autorisés avec un nombre total de validateurs actifs supérieur à 393 216, et ainsi de suite.

À mesure que davantage de validateurs se retirent, le nombre maximum de validateurs sortants sera progressivement réduit à un minimum de quatre pour empêcher intentionnellement le retrait simultané de grandes quantités déstabilisantes d'ETH mis en jeu.

### Répartition de l'inflation après La Fusion {#post-merge-inflation-breakdown}

- [Offre totale d'ETH](/eth/supply/) : **~120 520 000 ETH** (au moment de La Fusion en septembre 2022)
- Émission sur la couche d'exécution : **0**
- Émission sur la couche de consensus : Identique à ci-dessus, taux d'émission annualisé d'**~0,52 %** (avec 14 millions d'ETH mis en jeu au total)

<Alert variant="update">
<AlertContent>
<AlertDescription>
Taux d'émission annualisé total : **~0,52 %**

Réduction nette de l'émission annuelle d'ETH : **~88,7 %** ((4,61 % - 0,52 %) / 4,61 % * 100)
</AlertDescription>
</AlertContent>
</Alert>

## <Emoji text=":fire:" size="1" /> Le burn {#the-burn}

La force opposée à l'émission d'ETH est le taux auquel l'ETH est brûlé. Pour qu'une transaction s'exécute sur Ethereum, des frais minimums (connus sous le nom de « frais de base ») doivent être payés, qui fluctuent continuellement (de bloc en bloc) en fonction de l'activité du réseau. Les frais sont payés en ETH et sont _requis_ pour que la transaction soit considérée comme valide. Ces frais sont _brûlés_ pendant le processus de transaction, les retirant ainsi de la circulation.

<Alert variant="update">
<AlertContent>
<AlertDescription>

Le burn des frais a été mis en ligne avec [la mise à jour London](/ethereum-forks/#london) en août 2021, et reste inchangé depuis La Fusion.
</AlertDescription>
</AlertContent>
</Alert>

En plus du burn des frais mis en œuvre par la mise à jour London, les validateurs peuvent également encourir des pénalités s'ils sont hors ligne, ou pire, ils peuvent subir une réduction pour avoir enfreint des règles spécifiques qui menacent la sécurité du réseau. Ces pénalités entraînent une réduction d'ETH du solde de ce validateur, qui n'est pas directement récompensée à un autre compte, le brûlant/retirant ainsi effectivement de la circulation.

### Calcul du prix du gaz moyen pour la déflation {#calculating-average-gas-price-for-deflation}

Comme discuté ci-dessus, la quantité d'ETH émise un jour donné dépend du total d'ETH mis en jeu. Au moment de la rédaction, cela représente environ 1 700 ETH/jour.

Pour déterminer le prix du gaz moyen requis pour compenser complètement cette émission sur une période donnée de 24 heures, nous commencerons par calculer le nombre total de blocs par jour, compte tenu d'un temps de bloc de 12 secondes :

- `(1 block / 12 seconds) * (60 seconds/minute) = 5 blocks/minute`
- `(5 blocks/minute) * (60 minutes/hour) = 300 blocks/hour`
- `(300 blocks/hour) * (24 hours/day) = 7200 blocks/day`

Chaque bloc cible `15x10^6 gas/block` ([en savoir plus sur le gaz](/developers/docs/gas/)). En utilisant cela, nous pouvons résoudre le prix du gaz moyen (en unités de gwei/gaz) requis pour compenser l'émission, compte tenu d'une émission quotidienne totale d'ETH de 1 700 ETH :

- `7200 blocks/day * 15x10^6 gas/block * `**`Y gwei/gas`**` * 1 ETH/ 10^9 gwei = 1700 ETH/day`

En résolvant pour `Y` :

- `Y = (1700(10^9))/(7200 * 15(10^6)) = (17x10^3)/(72 * 15) = 16 gwei` (en arrondissant à seulement deux chiffres significatifs)

Une autre façon de réorganiser cette dernière étape serait de remplacer `1700` par une variable `X` qui représente l'émission quotidienne d'ETH, et de simplifier le reste en :

- `Y = (X(10^3)/(7200 * 15)) = X/108`

Nous pouvons simplifier et écrire cela en fonction de `X` :

- `f(X) = X/108` où `X` est l'émission quotidienne d'ETH, et `f(X)` représente le prix en gwei/gaz requis pour compenser tous les ETH nouvellement émis.

Ainsi, par exemple, si `X` (émission quotidienne d'ETH) passe à 1 800 en fonction du total d'ETH mis en jeu, `f(X)` (gwei requis pour compenser toute l'émission) serait alors de `17 gwei` (en utilisant 2 chiffres significatifs)

## Complément d'information {#further-reading}

- [La Fusion](/roadmap/merge/)
- [Ultrasound.money](https://ultrasound.money/) - _Tableaux de bord disponibles pour visualiser l'émission et le burn d'ETH en temps réel_
- [Graphique de l'émission d'Ethereum](https://www.attestant.io/posts/charting-ethereum-issuance/) - _Jim McDonald 2020_