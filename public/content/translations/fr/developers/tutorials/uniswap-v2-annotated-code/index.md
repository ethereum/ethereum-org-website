---
title: "Visite guidée du contrat Uniswap-v2"
description: "Comment fonctionne le contrat Uniswap-v2 ? Pourquoi est-il écrit de cette façon ?"
author: Ori Pomerantz
tags: [ "solidité" ]
skill: intermediate
published: 2021-05-01
lang: fr
---

## Introduction {#introduction}

[Uniswap v2](https://app.uniswap.org/whitepaper.pdf) peut créer un marché d'échange entre deux jetons ERC-20, quels qu'ils soient. Dans cet article, nous allons passer en revue le code source des contrats qui implémentent ce protocole et voir pourquoi ils sont écrits comme ils le sont.

### Que fait Uniswap ? {#what-does-uniswap-do}

Fondamentalement, il existe deux types d'utilisateurs : les fournisseurs de liquidités et les traders.

Les _fournisseurs de liquidités_ fournissent le pool avec les deux jetons qui peuvent être échangés (nous les appellerons **Jeton0** et **Jeton1**). En retour, ils reçoivent un troisième jeton qui représente une propriété partielle du pool, appelé un _jeton de liquidité_.

Les _traders_ envoient un type de jeton au pool et reçoivent l'autre (par exemple, envoient le **Jeton0** et reçoivent le **Jeton1**) hors du pool fourni par les fournisseurs de liquidités. Le taux de change est déterminé par le nombre relatif de **Jeton0** et de **Jeton1** que le pool possède. En outre, le pool prélève un petit pourcentage en guise de récompense pour le pool de liquidités.

Lorsque les fournisseurs de liquidités veulent récupérer leurs actifs, ils peuvent brûler les jetons du pool et recevoir en retour leurs jetons, y compris leur part des récompenses.

[Cliquez ici pour une description plus complète](https://docs.uniswap.org/contracts/v2/concepts/core-concepts/swaps/).

### Pourquoi v2 ? Pourquoi pas v3 ? {#why-v2}

[Uniswap v3](https://app.uniswap.org/whitepaper-v3.pdf) est une mise à niveau bien plus compliquée que la v2. Il est plus facile d'apprendre d'abord la v2, puis de passer à la v3.

### Contrats de base et contrats périphériques {#contract-types}

Uniswap v2 est divisé en deux composants, un noyau et une périphérie. Cette division permet aux contrats de base, qui détiennent les actifs et doivent donc être _sécurisés_, d'être plus simples et plus faciles à auditer. Toutes les fonctionnalités supplémentaires requises par les traders peuvent alors être fournies par des contrats périphériques.

## Flux de données et de contrôle {#flows}

Voici le flux de données et de contrôle qui se produit lorsque vous effectuez les trois actions principales d'Uniswap :

1. Échanger entre différents jetons
2. Ajouter de la liquidité au marché et être récompensé par des jetons de liquidité ERC-20 d'échange de paires
3. Brûler des jetons de liquidité ERC-20 et récupérer les jetons ERC-20 que l'échange de paires permet aux traders d'échanger

### Échange {#swap-flow}

C'est le flux le plus courant, utilisé par les traders :

#### Appelant {#caller}

1. Fournir au compte périphérique une provision pour le montant à échanger.
2. Appeler l'une des nombreuses fonctions d'échange du contrat périphérique (la fonction utilisée dépend de si l'ETH est impliqué ou non, si le trader spécifie le montant de jetons à déposer ou le montant de jetons à récupérer, etc.).
   Chaque fonction d'échange accepte un `path` (chemin), un tableau d'échanges à parcourir.

#### Dans le contrat périphérique (UniswapV2Router02.sol) {#in-the-periphery-contract-uniswapv2router02-sol}

3. Identifier les montants qui doivent être échangés sur chaque échange le long du chemin.
4. Itère sur le chemin. Pour chaque échange le long du chemin, il envoie le jeton d'entrée, puis appelle la fonction `swap` de l'échange.
   Dans la plupart des cas, l'adresse de destination des jetons est le prochain échange de paires sur le chemin. Pour l'échange final, il s'agit de l'adresse fournie par le trader.

#### Dans le contrat de base (UniswapV2Pair.sol) {#in-the-core-contract-uniswapv2pairsol-2}5. Vérifier que le contrat de base ne fait pas l'objet d'une tricherie et peut maintenir une liquidité suffisante après l'échange.

6. Voir combien de jetons supplémentaires ont été reçus en plus des réserves connues. Ce montant correspond au nombre de jetons d'entrée reçus pour l'échange.
7. Envoyer les jetons de sortie à la destination.
8. Appeler `_update` pour mettre à jour les montants de la réserve.

#### Retour dans le contrat périphérique (UniswapV2Router02.sol) {#back-in-the-periphery-contract-uniswapv2router02-sol}

9. Effectuer tout nettoyage nécessaire (par exemple, brûler des jetons WETH pour récupérer des ETH à envoyer au trader).

### Ajout de liquidité {#add-liquidity-flow}

#### Appelant {#caller-2}

1. Fournir au compte périphérique une provision pour les montants à ajouter au pool de liquidités.
2. Appeler l'une des fonctions `addLiquidity` du contrat périphérique.

#### Dans le contrat périphérique (UniswapV2Router02.sol) {#in-the-periphery-contract-uniswapv2router02sol-2}

3. Créer un nouvel échange de paires si nécessaire.
4. S'il existe un échange de paires, calculer le montant des jetons à ajouter. La valeur est censée être identique pour les deux jetons, donc le ratio des nouveaux jetons par rapport aux jetons existants doit être le même.
5. Vérifier si les montants sont acceptables (les appelants peuvent spécifier un montant minimum en dessous duquel ils préfèrent ne pas ajouter de liquidité).
6. Appeler le contrat de base.

#### Dans le contrat de base (UniswapV2Pair.sol) {#in-the-core-contract-uniswapv2pairsol-2}

7. Frapper des jetons de liquidité et les envoyer à l'appelant.
8. Appeler `_update` pour mettre à jour les montants de la réserve.

### Retrait de liquidité {#remove-liquidity-flow}

#### Appelant {#caller-3}

1. Fournir au compte périphérique une provision de jetons de liquidité à brûler en échange des jetons sous-jacents.
2. Appeler l'une des fonctions `removeLiquidity` du contrat périphérique.

#### Dans le contrat périphérique (UniswapV2Router02.sol) {#in-the-periphery-contract-uniswapv2router02sol-3}

3. Envoyer les jetons de liquidité à l'échange de paires.

#### Dans le contrat de base (UniswapV2Pair.sol) {#in-the-core-contract-uniswapv2pairsol-3}

4. Envoyer à l'adresse de destination les jetons sous-jacents en proportion des jetons brûlés. Par exemple, s'il y a 1 000 jetons A dans le pool, 500 jetons B et 90 jetons de liquidité, et que nous recevons 9 jetons à brûler, nous brûlons 10 % des jetons de liquidité, nous renvoyons donc à l'utilisateur 100 jetons A et 50 jetons B.
5. Brûler les jetons de liquidité.
6. Appeler `_update` pour mettre à jour les montants de la réserve.

## Les contrats de base {#core-contracts}

Ce sont les contrats sécurisés qui détiennent la liquidité.

### UniswapV2Pair.sol {#UniswapV2Pair}

[Ce contrat](https://github.com/Uniswap/uniswap-v2-core/blob/master/contracts/UniswapV2Pair.sol) met en œuvre le pool réel qui échange les jetons. C'est la fonctionnalité principale d'Uniswap.

```solidity
pragma solidity =0.5.16;

import './interfaces/IUniswapV2Pair.sol';
import './UniswapV2ERC20.sol';
import './libraries/Math.sol';
import './libraries/UQ112x112.sol';
import './interfaces/IERC20.sol';
import './interfaces/IUniswapV2Factory.sol';
import './interfaces/IUniswapV2Callee.sol';
```

Ce sont toutes les interfaces que le contrat doit connaître, soit parce que le contrat les implémente (`IUniswapV2Pair` et `UniswapV2ERC20`), soit parce qu'il appelle des contrats qui les implémentent.

```solidity
contract UniswapV2Pair is IUniswapV2Pair, UniswapV2ERC20 {
```

Ce contrat hérite d'UniswapV2ERC20, qui fournit les fonctions ERC-20 pour les jetons de liquidité.

```solidity
    using SafeMath  for uint;
```

La [bibliothèque SafeMath](https://docs.openzeppelin.com/contracts/2.x/api/math) est utilisée pour éviter les dépassements de capacité (overflow) et les sous-dépassements (underflow). Ceci est important car sinon, nous pourrions nous retrouver dans une situation où une valeur devrait être `-1`, mais est en fait `2^256-1`.

```solidity
    using UQ112x112 for uint224;
```

De nombreux calculs dans le contrat de pool nécessitent des fractions. Cependant, les fractions ne sont pas prises en charge par l'EVM.
La solution trouvée par Uniswap est d'utiliser des valeurs de 224 bits, avec 112 bits pour la partie entière et 112 bits pour la fraction. Ainsi, `1,0` est représenté par `2^112`, `1,5` est représenté par `2^112 + 2^111`, etc.

Plus de détails sur cette bibliothèque sont disponibles [plus loin dans le document](#FixedPoint).

#### Variables {#pair-vars}

```solidity
    uint public constant MINIMUM_LIQUIDITY = 10**3;
```

Pour éviter les cas de division par zéro, il existe toujours un nombre minimum de jetons de liquidité (mais ils sont détenus par le compte zéro). Ce nombre est **MINIMUM_LIQUIDITY**, soit un millier.

```solidity
    bytes4 private constant SELECTOR = bytes4(keccak256(bytes('transfer(address,uint256)')));
```

C'est le sélecteur ABI pour la fonction de transfert ERC-20. Il est utilisé pour transférer des jetons ERC-20 sur les deux comptes de jetons.

```solidity
    address public factory;
```

C'est le contrat d'usine qui a créé ce pool. Chaque pool est un échange entre deux jetons ERC-20, l'usine est le point central qui relie tous ces pools.

```solidity
    address public token0;
    address public token1;
```

Ce sont les adresses des contrats pour les deux types de jetons ERC-20 qui peuvent être échangés par ce pool.

```solidity
    uint112 private reserve0;           // uses single storage slot, accessible via getReserves
    uint112 private reserve1;           // uses single storage slot, accessible via getReserves
```

La réserve du pool pour chaque type de jeton. Nous supposons que les deux représentent le même montant de valeur, et donc que chaque jeton0 vaut la valeur de jeton1 multipliée par reserve1/reserve0.

```solidity
    uint32  private blockTimestampLast; // uses single storage slot, accessible via getReserves
```

L'horodatage du dernier bloc dans lequel un échange a eu lieu, utilisé pour suivre les taux de change dans le temps.

L'une des plus grandes dépenses de gaz des contrats Ethereum est le stockage, qui persiste d'un appel de contrat à l'autre. Chaque cellule de stockage fait 256 bits de long. Ainsi, trois variables, `reserve0`, `reserve1` et `blockTimestampLast`, sont allouées de manière à ce qu'une seule valeur de stockage puisse inclure les trois (112+112+32=256).

```solidity
    uint public price0CumulativeLast;
    uint public price1CumulativeLast;
```

Ces variables contiennent les coûts cumulatifs pour chaque jeton (chacun en fonction de l'autre). Elles peuvent être utilisées pour calculer le taux de change moyen sur une période de temps.

```solidity
    uint public kLast; // reserve0 * reserve1, as of immediately after the most recent liquidity event
```

Pour décider du taux de change entre jeton0 et jeton1, l'échange de paires maintient le multiple des deux réserves constant pendant les transactions. `kLast` est cette valeur. Elle change lorsqu'un fournisseur de liquidités dépose ou retire des jetons, et elle augmente légèrement en raison des frais de marché de 0,3 %.

Voici un exemple simple. Notez que par souci de simplicité, le tableau ne comporte que trois chiffres après la virgule, et que nous ignorons les frais de transaction de 0,3 %, de sorte que les chiffres ne sont pas exacts.

| Événement                                             |  réserve0 |  réserve1 | réserve0 \* réserve1 | Taux de change moyen (jeton1 / jeton0) |
| ----------------------------------------------------- | --------: | --------: | -------------------: | --------------------------------------------------------- |
| Configuration initiale                                | 1 000,000 | 1 000,000 |            1 000 000 |                                                           |
| Le trader A échange 50 jetons0 contre 47,619 jetons1  | 1 050,000 |   952,381 |            1 000 000 | 0,952                                                     |
| Le trader B échange 10 jetons0 contre 8,984 jetons1   | 1 060,000 |   943,396 |            1 000 000 | 0,898                                                     |
| Le trader C échange 40 jetons0 contre 34,305 jetons1  | 1 100,000 |   909,090 |            1 000 000 | 0,858                                                     |
| Le trader D échange 100 jetons1 contre 109,01 jetons0 |   990,990 | 1 009,090 |            1 000 000 | 0,917                                                     |
| Le trader E échange 10 jetons0 contre 10,079 jetons1  | 1 000,990 |   999,010 |            1 000 000 | 1,008                                                     |

Plus les traders fournissent de jetons0, plus la valeur relative du jeton1 augmente, et vice versa, en fonction de l'offre et de la demande.

#### Verrouillage {#pair-lock}

```solidity
    uint private unlocked = 1;
```

Il existe une catégorie de vulnérabilités de sécurité basées sur [l'abus de réentrance](https://medium.com/coinmonks/ethernaut-lvl-10-re-entrancy-walkthrough-how-to-abuse-execution-ordering-and-reproduce-the-dao-7ec88b912c14). Uniswap doit transférer des jetons ERC-20 arbitraires, ce qui signifie appeler des contrats ERC-20 qui pourraient tenter d'abuser du marché Uniswap qui les appelle.
En intégrant une variable `unlocked` au contrat, nous pouvons empêcher l'appel de fonctions pendant qu'elles sont en cours d'exécution (dans la même transaction).

```solidity
    modifier lock() {
```

Cette fonction est un [modificateur](https://docs.soliditylang.org/en/v0.8.3/contracts.html#function-modifiers), une fonction qui enveloppe une fonction normale pour en modifier le comportement d'une manière ou d'une autre.

```solidity
        require(unlocked == 1, 'UniswapV2: LOCKED');
        unlocked = 0;
```

Si `unlocked` est égal à un, le définir à zéro. S'il est déjà à zéro, annuler l'appel, le faire échouer.

```solidity
        _;
```

Dans un modificateur, `_;` est l'appel de fonction d'origine (avec tous les paramètres). Ici, cela signifie que l'appel de fonction ne se produit que si `unlocked` valait un lorsqu'il a été appelé, et que pendant son exécution, la valeur de `unlocked` est nulle.

```solidity
        unlocked = 1;
    }
```

Une fois que la fonction principale est retournée, libérer le verrou.

#### Divers fonctions {#pair-misc}

```solidity
    function getReserves() public view returns (uint112 _reserve0, uint112 _reserve1, uint32 _blockTimestampLast) {
        _reserve0 = reserve0;
        _reserve1 = reserve1;
        _blockTimestampLast = blockTimestampLast;
    }
```

Cette fonction fournit aux appelants l'état actuel de l'échange. Notez que les fonctions Solidity [peuvent retourner plusieurs valeurs](https://docs.soliditylang.org/en/v0.8.3/contracts.html#returning-multiple-values).

```solidity
    function _safeTransfer(address token, address to, uint value) private {
        (bool success, bytes memory data) = token.call(abi.encodeWithSelector(SELECTOR, to, value));
```

Cette fonction interne transfère un montant de jetons ERC20 de l'échange à une autre personne. `SELECTOR` spécifie que la fonction que nous appelons est `transfer(address,uint)` (voir la définition ci-dessus).

Pour éviter d'avoir à importer une interface pour la fonction de jeton, nous créons « manuellement » l'appel en utilisant l'une des [fonctions ABI](https://docs.soliditylang.org/en/v0.8.3/units-and-global-variables.html#abi-encoding-and-decoding-functions).

```solidity
        require(success && (data.length == 0 || abi.decode(data, (bool))), 'UniswapV2: TRANSFER_FAILED');
    }
```

Un appel de transfert ERC-20 peut signaler un échec de deux manières :

1. Annuler. Si un appel à un contrat externe est annulé, alors la valeur de retour booléenne est `false`.
2. Se terminer normalement mais signaler un échec. Dans ce cas, le tampon de valeur de retour a une longueur non nulle et, lorsqu'il est décodé en tant que valeur booléenne, il est `false`.

Si l'une de ces conditions se produit, annuler.

#### Événements {#pair-events}

```solidity
    event Mint(address indexed sender, uint amount0, uint amount1);
    event Burn(address indexed sender, uint amount0, uint amount1, address indexed to);
```

Ces deux événements sont émis lorsqu'un fournisseur de liquidités dépose des liquidités (`Mint`) ou les retire (`Burn`). Dans les deux cas, les montants des jetons0 et jetons1 déposés ou retirés font partie de l'événement, tout comme l'identité du compte qui nous a appelés (`sender`). Dans le cas d'un retrait, l'événement inclut également la cible qui a reçu les jetons (`to`), qui peut ne pas être la même que l'expéditeur.

```solidity
    event Swap(
        address indexed sender,
        uint amount0In,
        uint amount1In,
        uint amount0Out,
        uint amount1Out,
        address indexed to
    );
```

Cet événement est émis lorsqu'un trader échange un jeton contre un autre. Encore une fois, l'expéditeur et le destinataire peuvent ne pas être les mêmes.
Chaque jeton peut être soit envoyé à l’échange, soit reçu de celui-ci.

```solidity
    event Sync(uint112 reserve0, uint112 reserve1);
```

Enfin, `Sync` est émis chaque fois que des jetons sont ajoutés ou retirés, quelle qu'en soit la raison, pour fournir les dernières informations de réserve (et donc le taux de change).

#### Fonctions de configuration {#pair-setup}

Ces fonctions sont censées être appelées une fois, lors de la mise en place du nouvel échange de paires.

```solidity
    constructor() public {
        factory = msg.sender;
    }
```

Le constructeur s'assure que nous garderons une trace de l'adresse de l'usine qui a créé la paire. Ces informations sont requises pour `initialize` et pour les frais d'usine (s'il y en a).

```solidity
    // called once by the factory at time of deployment
    function initialize(address _token0, address _token1) external {
        require(msg.sender == factory, 'UniswapV2: FORBIDDEN'); // sufficient check
        token0 = _token0;
        token1 = _token1;
    }
```

Cette fonction permet à l'usine (et seulement à l'usine) de spécifier les deux jetons ERC-20 que cette paire échangera.

#### Fonctions de mise à jour interne {#pair-update-internal}

##### \_update

```solidity
    // update reserves and, on the first call per block, price accumulators
    function _update(uint balance0, uint balance1, uint112 _reserve0, uint112 _reserve1) private {
```

Cette fonction est appelée chaque fois que des jetons sont déposés ou retirés.

```solidity
        require(balance0 <= uint112(-1) && balance1 <= uint112(-1), 'UniswapV2: OVERFLOW');
```

Si balance0 ou balance1 (uint256) est supérieur à uint112(-1) (=2^112-1) (donc il déborde et revient à 0 lorsqu'il est converti en uint112), refuser de continuer le \_update pour éviter les débordements. Avec un jeton normal qui peut être subdivisé en 10^18 unités, cela signifie que chaque échange est limité à environ 5,1\*10^15 de chaque jeton. Jusqu'à présent, cela n'a pas posé de problème.

```solidity
        uint32 blockTimestamp = uint32(block.timestamp % 2**32);
        uint32 timeElapsed = blockTimestamp - blockTimestampLast; // overflow is desired
        if (timeElapsed > 0 && _reserve0 != 0 && _reserve1 != 0) {
```

Si le temps écoulé n'est pas nul, cela signifie que nous sommes la première transaction d'échange sur ce bloc. Dans ce cas, nous devons mettre à jour les accumulateurs de coûts.

```solidity
            // * never overflows, and + overflow is desired
            price0CumulativeLast += uint(UQ112x112.encode(_reserve1).uqdiv(_reserve0)) * timeElapsed;
            price1CumulativeLast += uint(UQ112x112.encode(_reserve0).uqdiv(_reserve1)) * timeElapsed;
        }
```

Chaque accumulateur de coûts est mis à jour avec le coût le plus récent (réserve de l'autre jeton/réserve de ce jeton) multiplié par le temps écoulé en secondes. Pour obtenir un prix moyen, vous lisez le prix cumulé à deux moments donnés et vous divisez par la différence de temps entre eux. Par exemple, supposons la séquence d'événements suivante :

| Événement                                                 |  réserve0 |  réserve1 | horodatage | Taux de change marginal (réserve1 / réserve0) |       price0CumulativeLast |
| --------------------------------------------------------- | --------: | --------: | ---------- | ---------------------------------------------------------------: | -------------------------: |
| Configuration initiale                                    | 1 000,000 | 1 000,000 | 5 000      |                                                            1,000 |                          0 |
| Le trader A dépose 50 jetons0 et récupère 47,619 jetons1  | 1 050,000 |   952,381 | 5 020      |                                                            0,907 |                         20 |
| Le trader B dépose 10 jetons0 et récupère 8,984 jetons1   | 1 060,000 |   943,396 | 5 030      |                                                            0,890 |       20+10\*0,907 = 29,07 |
| Le trader C dépose 40 jetons0 et récupère 34,305 jetons1  | 1 100,000 |   909,090 | 5 100      |                                                            0,826 |    29,07+70\*0,890 = 91,37 |
| Le trader D dépose 100 jetons1 et récupère 109,01 jetons0 |   990,990 | 1 009,090 | 5 110      |                                                            1,018 |    91,37+10\*0,826 = 99,63 |
| Le trader E dépose 10 jetons0 et récupère 10,079 jetons1  | 1 000,990 |   999,010 | 5 150      |                                                            0,998 | 99,63+40\*1,1018 = 143,702 |

Disons que nous souhaitons calculer le prix moyen du **Jeton0** entre les horodatages 5 030 et 5 150. La différence de la valeur de `price0Cumulative` est 143,702-29,07=114,632. Il s'agit de la moyenne sur deux minutes (120 secondes). Le prix moyen est donc 114,632/120 = 0,955.

Ce calcul de prix est la raison pour laquelle nous devons connaître les anciennes tailles de réserve.

```solidity
        reserve0 = uint112(balance0);
        reserve1 = uint112(balance1);
        blockTimestampLast = blockTimestamp;
        emit Sync(reserve0, reserve1);
    }
```

Enfin, mettre à jour les variables globales et émettre un événement `Sync`.

##### \_mintFee

```solidity
    // if fee is on, mint liquidity equivalent to 1/6th of the growth in sqrt(k)
    function _mintFee(uint112 _reserve0, uint112 _reserve1) private returns (bool feeOn) {
```

Dans Uniswap 2.0, les traders paient des frais de 0,30 % pour utiliser le marché. La plus grande partie de ces frais (0,25 % de la transaction) va toujours aux fournisseurs de liquidités. Les 0,05 % restants peuvent être versés soit aux fournisseurs de liquidités, soit à une adresse spécifiée par l'usine en tant que frais de protocole, qui rémunère Uniswap pour ses efforts de développement.

Pour réduire les calculs (et donc les frais de gaz), ces frais ne sont calculés que lorsque la liquidité est ajoutée ou retirée du pool, plutôt qu'à chaque transaction.

```solidity
        address feeTo = IUniswapV2Factory(factory).feeTo();
        feeOn = feeTo != address(0);
```

Lire la destination des frais de l'usine. S'ils sont nuls, alors il n'y a pas de frais de protocole et il n'est pas nécessaire de les calculer.

```solidity
        uint _kLast = kLast; // gas savings
```

La variable d'état `kLast` est située dans le stockage, elle aura donc une valeur entre les différents appels au contrat.
L'accès au stockage est beaucoup plus cher que l'accès à la mémoire volatile qui est libérée lorsque l'appel de fonction au contrat se termine. Nous utilisons donc une variable interne pour économiser du gaz.

```solidity
        if (feeOn) {
            if (_kLast != 0) {
```

Les fournisseurs de liquidités obtiennent leur part simplement par l'appréciation de leurs jetons de liquidité. Mais les frais de protocole nécessitent que de nouveaux jetons de liquidité soient frappés et fournis à l'adresse `feeTo`.

```solidity
                uint rootK = Math.sqrt(uint(_reserve0).mul(_reserve1));
                uint rootKLast = Math.sqrt(_kLast);
                if (rootK > rootKLast) {
```

S'il y a de nouvelles liquidités sur lesquelles percevoir des frais de protocole. Vous pouvez voir la fonction de racine carrée [plus loin dans cet article](#Math).

```solidity
                    uint numerator = totalSupply.mul(rootK.sub(rootKLast));
                    uint denominator = rootK.mul(5).add(rootKLast);
                    uint liquidity = numerator / denominator;
```

Ce calcul compliqué des frais est expliqué dans [le livre blanc](https://app.uniswap.org/whitepaper.pdf) à la page 5. Nous savons qu'entre le moment où `kLast` a été calculé et le moment présent, aucune liquidité n'a été ajoutée ou supprimée (car nous exécutons ce calcul à chaque fois que la liquidité est ajoutée ou supprimée, avant qu'elle ne change réellement). Par conséquent, tout changement dans `reserve0 * reserve1` doit provenir des frais de transaction (sans eux, nous conserverions la constante `reserve0 * reserve1`).

```solidity
                    if (liquidity > 0) _mint(feeTo, liquidity);
                }
            }
```

Utiliser la fonction `UniswapV2ERC20._mint` pour créer les jetons de liquidité supplémentaires et les affecter à `feeTo`.

```solidity
        } else if (_kLast != 0) {
            kLast = 0;
        }
    }
```

S'il n'y a pas de frais, régler `kLast` à zéro (si ce n'est pas déjà le cas). Lorsque ce contrat a été rédigé, il existait une [fonctionnalité de remboursement de gaz](https://eips.ethereum.org/EIPS/eip-3298) qui encourageait les contrats à réduire la taille globale de l'état d'Ethereum en mettant à zéro le stockage dont ils n'avaient pas besoin.
Ce code obtient ce remboursement lorsque c'est possible.

#### Fonctions accessibles en externe {#pair-external}

Notez que bien que toute transaction ou tout contrat _puisse_ appeler ces fonctions, elles sont conçues pour être appelées depuis le contrat périphérique. Si vous les appelez directement, vous ne pourrez pas tricher sur l'échange de paires, mais vous pourriez perdre de la valeur par erreur.

##### frapper

```solidity
    // this low-level function should be called from a contract which performs important safety checks
    function mint(address to) external lock returns (uint liquidity) {
```

Cette fonction est appelée lorsqu'un fournisseur de liquidités ajoute de la liquidité au pool. Elle frappe des jetons de liquidité supplémentaires en guise de récompense. Elle devrait être appelée à partir d'[un contrat périphérique](#UniswapV2Router02) qui l'appelle après avoir ajouté la liquidité dans la même transaction (afin que personne d'autre ne puisse soumettre une transaction réclamant la nouvelle liquidité avant le propriétaire légitime).

```solidity
        (uint112 _reserve0, uint112 _reserve1,) = getReserves(); // gas savings
```

C'est ainsi qu'il faut lire les résultats d'une fonction Solidity qui retourne plusieurs valeurs. Nous ignorons la dernière valeur retournée, l'horodatage du bloc, car nous n'en avons pas besoin.

```solidity
        uint balance0 = IERC20(token0).balanceOf(address(this));
        uint balance1 = IERC20(token1).balanceOf(address(this));
        uint amount0 = balance0.sub(_reserve0);
        uint amount1 = balance1.sub(_reserve1);
```

Obtenir les soldes actuels et voir combien a été ajouté pour chaque type de jeton.

```solidity
        bool feeOn = _mintFee(_reserve0, _reserve1);
```

Calculer les frais de protocole à percevoir, le cas échéant, et frapper les jetons de liquidité en conséquence. Étant donné que les paramètres de `_mintFee` sont les anciennes valeurs de réserve, les frais sont calculés avec précision en se basant uniquement sur les changements de pool dus aux frais.

```solidity
        uint _totalSupply = totalSupply; // gas savings, must be defined here since totalSupply can update in _mintFee
        if (_totalSupply == 0) {
            liquidity = Math.sqrt(amount0.mul(amount1)).sub(MINIMUM_LIQUIDITY);
           _mint(address(0), MINIMUM_LIQUIDITY); // permanently lock the first MINIMUM_LIQUIDITY tokens
```

S'il s'agit du premier dépôt, créer des jetons `MINIMUM_LIQUIDITY` et les envoyer à l'adresse zéro pour les verrouiller. Ils ne peuvent jamais être rachetés, ce qui signifie que le pool ne sera jamais complètement vidé (cela nous évite une division par zéro à certains endroits). La valeur de `MINIMUM_LIQUIDITY` est de mille, ce qui, si l'on considère que la plupart des ERC-20 sont subdivisés en unités de 10^-18 d'un jeton, comme l'ETH est divisé en wei, correspond à 10^-15 de la valeur d'un seul jeton. Le coût n'est pas élevé.

Au moment du premier dépôt, nous ne connaissons pas la valeur relative des deux jetons, nous multiplions donc simplement les montants et prenons une racine carrée, en supposant que le dépôt nous fournisse une valeur égale pour les deux jetons.

Nous pouvons nous y fier car il est dans l'intérêt du déposant de fournir une valeur égale pour éviter de perdre de la valeur à cause de l'arbitrage.
Imaginons que la valeur des deux jetons est identique, mais que notre déposant ait déposé quatre fois plus de **Jeton1** que de **Jeton0**. Un trader peut utiliser le fait que l'échange de paires pense que le **Jeton0** a plus de valeur pour en extraire de la valeur.

| Événement                                                    | réserve0 | réserve1 | réserve0 \* réserve1 | Valeur du pool (reserve0 + reserve1) |
| ------------------------------------------------------------ | -------: | -------: | -------------------: | ------------------------------------------------------: |
| Configuration initiale                                       |        8 |       32 |                  256 |                                                      40 |
| Le trader dépose 8 jetons **Jeton0**, récupère 16 **Jeton1** |       16 |       16 |                  256 |                                                      32 |

Comme vous pouvez le voir, le trader a gagné 8 jetons supplémentaires, qui proviennent d'une réduction de la valeur du pool, ce qui pénalise le déposant qui le possède.

```solidity
        } else {
            liquidity = Math.min(amount0.mul(_totalSupply) / _reserve0, amount1.mul(_totalSupply) / _reserve1);
```

À chaque dépôt ultérieur, nous connaissons déjà le taux de change entre les deux actifs et nous attendons des fournisseurs de liquidités qu'ils fournissent une valeur égale pour les deux. S'ils ne le font pas, nous leur donnons des jetons de liquidité basés sur la valeur inférieure qu'ils ont fournie, en guise de pénalité.

Qu'il s'agisse du dépôt initial ou d'un dépôt ultérieur, le nombre de jetons de liquidité que nous fournissons est égal à la racine carrée de la variation de `reserve0*reserve1` et la valeur du jeton de liquidité ne change pas (sauf si nous recevons un dépôt qui n'a pas de valeurs égales pour les deux types, auquel cas l'« amende » est distribuée). Voici un autre exemple avec deux jetons qui ont la même valeur, avec trois bons dépôts et un mauvais (dépôt d'un seul type de jeton, il ne produit donc aucun jeton de liquidité).

| Événement                      |                réserve0 |                réserve1 | réserve0 \* réserve1 | Valeur du pool (réserve0 + réserve1) | Jetons de liquidité frappés pour ce dépôt | Total des jetons de liquidité | valeur de chaque jeton de liquidité |
| ------------------------------ | ----------------------: | ----------------------: | -------------------: | ------------------------------------------------------: | ----------------------------------------: | ----------------------------: | ----------------------------------: |
| Configuration initiale         |                   8,000 |                   8,000 |                   64 |                                                  16,000 |                                         8 |                             8 |                               2,000 |
| Dépôt de quatre de chaque type |                  12,000 |                  12,000 |                  144 |                                                  24,000 |                                         4 |                            12 |                               2,000 |
| Dépôt de deux de chaque type   |                  14,000 |                  14,000 |                  196 |                                                  28,000 |                                         2 |                            14 |                               2,000 |
| Dépôt de valeur inégale        |                  18,000 |                  14,000 |                  252 |                                                  32,000 |                                         0 |                            14 |              ~2,286 |
| Après arbitrage                | ~15,874 | ~15,874 |                  252 |                                 ~31,748 |                                         0 |                            14 |              ~2,267 |

```solidity
        }
        require(liquidity > 0, 'UniswapV2: INSUFFICIENT_LIQUIDITY_MINTED');
        _mint(to, liquidity);
```

Utiliser la fonction `UniswapV2ERC20._mint` pour créer les jetons de liquidité supplémentaires et les donner au bon compte.

```solidity

        _update(balance0, balance1, _reserve0, _reserve1);
        if (feeOn) kLast = uint(reserve0).mul(reserve1); // reserve0 and reserve1 are up-to-date
        emit Mint(msg.sender, amount0, amount1);
    }
```

Mettre à jour les variables d'état (`reserve0`, `reserve1` et si nécessaire `kLast`) et émettre l'événement approprié.

##### brûler

```solidity
    // this low-level function should be called from a contract which performs important safety checks
    function burn(address to) external lock returns (uint amount0, uint amount1) {
```

Cette fonction est appelée lorsque la liquidité est retirée et que les jetons de liquidité appropriés doivent être brûlés.
Elle devrait également être appelée [depuis un compte périphérique](#UniswapV2Router02).

```solidity
        (uint112 _reserve0, uint112 _reserve1,) = getReserves(); // gas savings
        address _token0 = token0;                                // gas savings
        address _token1 = token1;                                // gas savings
        uint balance0 = IERC20(_token0).balanceOf(address(this));
        uint balance1 = IERC20(_token1).balanceOf(address(this));
        uint liquidity = balanceOf[address(this)];
```

Le contrat périphérique a transféré la liquidité à brûler vers ce contrat avant l'appel. De cette façon, nous savons combien de liquidités brûler et nous pouvons nous assurer qu'elles sont bien brûlées.

```solidity
        bool feeOn = _mintFee(_reserve0, _reserve1);
        uint _totalSupply = totalSupply; // gas savings, must be defined here since totalSupply can update in _mintFee
        amount0 = liquidity.mul(balance0) / _totalSupply; // using balances ensures pro-rata distribution
        amount1 = liquidity.mul(balance1) / _totalSupply; // using balances ensures pro-rata distribution
        require(amount0 > 0 && amount1 > 0, 'UniswapV2: INSUFFICIENT_LIQUIDITY_BURNED');
```

Le fournisseur de liquidités reçoit la même valeur pour les deux jetons. De cette façon, nous ne modifions pas le taux de change.

```solidity
        _burn(address(this), liquidity);
        _safeTransfer(_token0, to, amount0);
        _safeTransfer(_token1, to, amount1);
        balance0 = IERC20(_token0).balanceOf(address(this));
        balance1 = IERC20(_token1).balanceOf(address(this));

        _update(balance0, balance1, _reserve0, _reserve1);
        if (feeOn) kLast = uint(reserve0).mul(reserve1); // reserve0 and reserve1 are up-to-date
        emit Burn(msg.sender, amount0, amount1, to);
    }

```

Le reste de la fonction `burn` est l'image miroir de la fonction `mint` ci-dessus.

##### échange

```solidity
    // this low-level function should be called from a contract which performs important safety checks
    function swap(uint amount0Out, uint amount1Out, address to, bytes calldata data) external lock {
```

Cette fonction est également censée être appelée depuis [un contrat périphérique](#UniswapV2Router02).

```solidity
        require(amount0Out > 0 || amount1Out > 0, 'UniswapV2: INSUFFICIENT_OUTPUT_AMOUNT');
        (uint112 _reserve0, uint112 _reserve1,) = getReserves(); // gas savings
        require(amount0Out < _reserve0 && amount1Out < _reserve1, 'UniswapV2: INSUFFICIENT_LIQUIDITY');

        uint balance0;
        uint balance1;
        { // scope for _token{0,1}, avoids stack too deep errors
```

Les variables locales peuvent être stockées soit en mémoire, soit, si elles ne sont pas trop nombreuses, directement sur la pile.
Si nous pouvons limiter le nombre, nous utiliserons la pile pour consommer moins de gaz. Pour plus de détails, voir [le Yellow Paper, les spécifications formelles d'Ethereum](https://ethereum.github.io/yellowpaper/paper.pdf), p. 26, équation 298.

```solidity
            address _token0 = token0;
            address _token1 = token1;
            require(to != _token0 && to != _token1, 'UniswapV2: INVALID_TO');
            if (amount0Out > 0) _safeTransfer(_token0, to, amount0Out); // optimistically transfer tokens
            if (amount1Out > 0) _safeTransfer(_token1, to, amount1Out); // optimistically transfer tokens
```

Ce transfert est optimiste, car nous transférons avant d'être sûrs que toutes les conditions sont remplies. Ceci est acceptable dans Ethereum car si les conditions ne sont pas remplies plus tard lors de l'appel, nous annulons l'opération ainsi que les changements qu'elle a créés.

```solidity
            if (data.length > 0) IUniswapV2Callee(to).uniswapV2Call(msg.sender, amount0Out, amount1Out, data);
```

Informer le destinataire de l'échange si demandé.

```solidity
            balance0 = IERC20(_token0).balanceOf(address(this));
            balance1 = IERC20(_token1).balanceOf(address(this));
        }
```

Obtenir les soldes actuels. Le contrat périphérique nous envoie les jetons avant de nous appeler pour l'échange. Il est ainsi facile pour le contrat de vérifier qu'il n'est pas trompé, une vérification qui _doit_ avoir lieu dans le contrat de base (car nous pouvons être appelés par d'autres entités que notre contrat périphérique).

```solidity
        uint amount0In = balance0 > _reserve0 - amount0Out ? balance0 - (_reserve0 - amount0Out) : 0;
        uint amount1In = balance1 > _reserve1 - amount1Out ? balance1 - (_reserve1 - amount1Out) : 0;
        require(amount0In > 0 || amount1In > 0, 'UniswapV2: INSUFFICIENT_INPUT_AMOUNT');
        { // scope for reserve{0,1}Adjusted, avoids stack too deep errors
            uint balance0Adjusted = balance0.mul(1000).sub(amount0In.mul(3));
            uint balance1Adjusted = balance1.mul(1000).sub(amount1In.mul(3));
            require(balance0Adjusted.mul(balance1Adjusted) >= uint(_reserve0).mul(_reserve1).mul(1000**2), 'UniswapV2: K');
```

Ceci est un contrôle de cohérence pour s'assurer que nous ne perdons rien lors de l'échange. En aucune circonstance un échange ne devrait réduire `reserve0*reserve1`. C'est également là que nous nous assurons qu'une redevance de 0,3 % est envoyée sur l'échange ; avant de vérifier la valeur de K, nous multiplions les deux soldes par 1 000 et soustrayons les montants multipliés par 3, ce qui signifie que 0,3 % (3/1000 = 0,003 = 0,3 %) est déduit du solde avant de comparer sa valeur K à la valeur K des réserves actuelles.

```solidity
        }

        _update(balance0, balance1, _reserve0, _reserve1);
        emit Swap(msg.sender, amount0In, amount1In, amount0Out, amount1Out, to);
    }
```

Mettre à jour `reserve0` et `reserve1`, et si nécessaire les accumulateurs de prix et l'horodatage, et émettre un événement.

##### Sync ou Skim

Il est possible que les soldes réels se désynchronisent des réserves que l'échange de paires pense avoir.
Il n'y a aucun moyen de retirer des jetons sans le consentement du contrat, mais pour les dépôts c'est une autre affaire. Un compte peut transférer des jetons à l'échange sans appeler ni `mint` ni `swap`.

Dans ce cas, il y a deux solutions :

- `sync`, mettre à jour les réserves avec les soldes actuels
- `skim`, retirer le montant supplémentaire. Notez que tout compte est autorisé à appeler `skim` car nous ne savons pas qui a déposé les jetons. Cette information est émise dans un événement, mais les événements ne sont pas accessibles depuis la blockchain.

```solidity
    // force balances to match reserves
    function skim(address to) external lock {
        address _token0 = token0; // gas savings
        address _token1 = token1; // gas savings
        _safeTransfer(_token0, to, IERC20(_token0).balanceOf(address(this)).sub(reserve0));
        _safeTransfer(_token1, to, IERC20(_token1).balanceOf(address(this)).sub(reserve1));
    }



    // force reserves to match balances
    function sync() external lock {
        _update(IERC20(token0).balanceOf(address(this)), IERC20(token1).balanceOf(address(this)), reserve0, reserve1);
    }
}
```

### UniswapV2Factory.sol {#UniswapV2Factory}

[Ce contrat](https://github.com/Uniswap/uniswap-v2-core/blob/master/contracts/UniswapV2Factory.sol) crée les échanges de paires.

```solidity
pragma solidity =0.5.16;

import './interfaces/IUniswapV2Factory.sol';
import './UniswapV2Pair.sol';

contract UniswapV2Factory is IUniswapV2Factory {
    address public feeTo;
    address public feeToSetter;
```

Ces variables d'état sont nécessaires pour implémenter les frais de protocole (voir [le livre blanc](https://app.uniswap.org/whitepaper.pdf), p. 5).
L'adresse `feeTo` accumule les jetons de liquidité pour les frais de protocole, et `feeToSetter` est l'adresse autorisée à changer `feeTo` en une adresse différente.

```solidity
    mapping(address => mapping(address => address)) public getPair;
    address[] public allPairs;
```

Ces variables gardent une trace des paires, des échanges entre deux types de jetons.

La première, `getPair`, est un mappage qui identifie un contrat d'échange de paires basé sur les deux jetons ERC-20 qu'il échange. Les jetons ERC-20 sont identifiés par les adresses des contrats qui les implémentent, de sorte que les clés et la valeur sont toutes des adresses. Pour obtenir l'adresse de l'échange de paires qui vous permet de convertir `tokenA` en `tokenB`, vous utilisez `getPair[<adresse de tokenA>][<adresse de tokenB>]` (ou l'inverse).

La seconde variable, `allPairs`, est un tableau qui inclut toutes les adresses des échanges de paires créés par cette usine. Sur Ethereum, vous ne pouvez pas itérer sur le contenu d'un mapping, ni obtenir une liste de toutes les clés. Cette variable est donc le seul moyen de savoir quels échanges cette usine gère.

Note : La raison pour laquelle vous ne pouvez pas itérer sur toutes les clés d'un mapping est que le stockage des données de contrat est _coûteux_, donc moins nous en utilisons, et moins nous le modifions, mieux c'est. Vous pouvez créer [des mappings qui supportent l'itération](https://github.com/ethereum/dapp-bin/blob/master/library/iterable_mapping.sol), mais ils nécessitent un stockage supplémentaire pour une liste de clés. Dans la plupart des applications, vous n'en avez pas besoin.

```solidity
    event PairCreated(address indexed token0, address indexed token1, address pair, uint);
```

Cet événement est émis lorsqu'un nouvel échange de paires est créé. Il comprend les adresses des jetons, l'adresse de l'échange de paires et le nombre total d'échanges gérés par l'usine.

```solidity
    constructor(address _feeToSetter) public {
        feeToSetter = _feeToSetter;
    }
```

La seule chose que fait le constructeur est de spécifier le `feeToSetter`. Les usines commencent sans frais, et seul `feeSetter` peut changer cela.

```solidity
    function allPairsLength() external view returns (uint) {
        return allPairs.length;
    }
```

Cette fonction retourne le nombre de paires d'échange.

```solidity
    function createPair(address tokenA, address tokenB) external returns (address pair) {
```

C'est la fonction principale de l'usine : créer un échange de paires entre deux jetons ERC-20. Notez que n'importe qui peut appeler cette fonction. Vous n'avez pas besoin d'autorisation d'Uniswap pour créer un nouvel échange de paires.

```solidity
        require(tokenA != tokenB, 'UniswapV2: IDENTICAL_ADDRESSES');
        (address token0, address token1) = tokenA < tokenB ? (tokenA, tokenB) : (tokenB, tokenA);
```

Nous voulons que l'adresse du nouvel échange soit déterministe, afin qu'elle puisse être calculée à l'avance hors chaîne (cela peut être utile pour les [transactions de couche 2](/developers/docs/scaling/)).
Pour ce faire, nous devons avoir un ordre cohérent des adresses de jetons, quel que soit l'ordre dans lequel nous les avons reçues. Nous les trions donc ici.

```solidity
        require(token0 != address(0), 'UniswapV2: ZERO_ADDRESS');
        require(getPair[token0][token1] == address(0), 'UniswapV2: PAIR_EXISTS'); // single check is sufficient
```

Les grands pools de liquidités sont préférables aux petits, car ils ont des prix plus stables. Nous ne voulons pas avoir plus d'un pool de liquidités par paire de jetons. S'il existe déjà un échange, il n'est pas nécessaire d'en créer un autre pour la même paire.

```solidity
        bytes memory bytecode = type(UniswapV2Pair).creationCode;
```

Pour créer un nouveau contrat, nous avons besoin du code qui le crée (à la fois la fonction constructeur et le code qui écrit en mémoire le bytecode EVM du contrat réel). Normalement, dans Solidity, nous utilisons simplement `addr = new <nom du contrat>(<paramètres du constructeur>)` et le compilateur s'occupe de tout pour nous, mais pour avoir une adresse de contrat déterministe, nous devons utiliser [l'opcode CREATE2](https://eips.ethereum.org/EIPS/eip-1014).
Lorsque ce code a été écrit, cet opcode n'était pas encore pris en charge par Solidity, il était donc nécessaire d'obtenir manuellement le code. Ce n'est plus un problème, car [Solidity prend maintenant en charge CREATE2](https://docs.soliditylang.org/en/v0.8.3/control-structures.html#salted-contract-creations-create2).

```solidity
        bytes32 salt = keccak256(abi.encodePacked(token0, token1));
        assembly {
            pair := create2(0, add(bytecode, 32), mload(bytecode), salt)
        }
```

Lorsqu'un opcode n'est pas encore pris en charge par Solidity, nous pouvons l'appeler en utilisant [l'assembly en ligne](https://docs.soliditylang.org/en/v0.8.3/assembly.html).

```solidity
        IUniswapV2Pair(pair).initialize(token0, token1);
```

Appeler la fonction `initialize` pour indiquer au nouvel échange les deux jetons qu'il échange.

```solidity
        getPair[token0][token1] = pair;
        getPair[token1][token0] = pair; // populate mapping in the reverse direction
        allPairs.push(pair);
        emit PairCreated(token0, token1, pair, allPairs.length);
```

Enregistrer les informations de la nouvelle paire dans les variables d'état et émettre un événement pour informer le monde du nouvel échange de paires.

```solidity
    function setFeeTo(address _feeTo) external {
        require(msg.sender == feeToSetter, 'UniswapV2: FORBIDDEN');
        feeTo = _feeTo;
    }

    function setFeeToSetter(address _feeToSetter) external {
        require(msg.sender == feeToSetter, 'UniswapV2: FORBIDDEN');
        feeToSetter = _feeToSetter;
    }
}
```

Ces deux fonctions permettent à `feeSetter` de contrôler le destinataire des frais (le cas échéant) et de changer `feeSetter` en une nouvelle adresse.

### UniswapV2ERC20.sol {#UniswapV2ERC20}

[Ce contrat](https://github.com/Uniswap/uniswap-v2-core/blob/master/contracts/UniswapV2ERC20.sol) met en œuvre le jeton de liquidité ERC-20. Il est similaire au [contrat ERC-20 d'OpenZeppelin](/developers/tutorials/erc20-annotated-code), je n'expliquerai donc que la partie qui est différente, la fonctionnalité `permit`.

Les transactions sur Ethereum coûtent de l'ether (ETH), ce qui équivaut à de l'argent réel. Si vous avez des jetons ERC-20 mais pas d'ETH, vous ne pouvez pas envoyer de transactions, et vous ne pouvez donc rien en faire. Une solution pour éviter ce problème est d'utiliser les [méta-transactions](https://docs.uniswap.org/contracts/v2/guides/smart-contract-integration/supporting-meta-transactions).
Le propriétaire des jetons signe une transaction qui permet à une autre personne de retirer des jetons hors chaîne et l'envoie via Internet au destinataire. Le destinataire, qui possède des ETH, soumet alors le permis au nom du propriétaire.

```solidity
    bytes32 public DOMAIN_SEPARATOR;
    // keccak256("Permit(address owner,address spender,uint256 value,uint256 nonce,uint256 deadline)");
    bytes32 public constant PERMIT_TYPEHASH = 0x6e71edae12b1b97f4d1f60370fef10105fa2faae0126114a169c64845d6126c9;
```

Ce hachage est l'[identifiant du type de transaction](https://eips.ethereum.org/EIPS/eip-712#rationale-for-typehash). Le seul que nous prenons en charge ici est `Permit` avec ces paramètres.

```solidity
    mapping(address => uint) public nonces;
```

Il n'est pas possible pour un destinataire de falsifier une signature numérique. Cependant, il est trivial d'envoyer la même transaction deux fois (c'est une forme d'[attaque par rejeu](https://wikipedia.org/wiki/Replay_attack)). Pour éviter cela, nous utilisons un [nonce](https://wikipedia.org/wiki/Cryptographic_nonce). Si le nonce d'un nouveau `Permit` n'est pas supérieur de un au dernier nonce utilisé, nous le considérons comme invalide.

```solidity
    constructor() public {
        uint chainId;
        assembly {
            chainId := chainid
        }
```

Ceci est le code pour récupérer l'[identifiant de la chaîne](https://chainid.network/). Il utilise un dialecte d'assembly EVM appelé [Yul](https://docs.soliditylang.org/en/v0.8.4/yul.html). Notez que dans la version actuelle de Yul, vous devez utiliser `chainid()`, et non `chainid`.

```solidity
        DOMAIN_SEPARATOR = keccak256(
            abi.encode(
                keccak256('EIP712Domain(string name,string version,uint256 chainId,address verifyingContract)'),
                keccak256(bytes(name)),
                keccak256(bytes('1')),
                chainId,
                address(this)
            )
        );
    }
```

Calculer le [séparateur de domaine](https://eips.ethereum.org/EIPS/eip-712#rationale-for-domainseparator) pour EIP-712.

```solidity
    function permit(address owner, address spender, uint value, uint deadline, uint8 v, bytes32 r, bytes32 s) external {
```

C'est la fonction qui implémente les permissions. Elle reçoit comme paramètres les champs pertinents, et les trois valeurs scalaires pour [la signature](https://yos.io/2018/11/16/ethereum-signatures/) (v, r et s).

```solidity
        require(deadline >= block.timestamp, 'UniswapV2: EXPIRED');
```

Ne pas accepter les transactions après la date limite.

```solidity
        bytes32 digest = keccak256(
            abi.encodePacked(
                '\x19\x01',
                DOMAIN_SEPARATOR,
                keccak256(abi.encode(PERMIT_TYPEHASH, owner, spender, value, nonces[owner]++, deadline))
            )
        );
```

`abi.encodePacked(...)` est le message que nous nous attendons à recevoir. Nous savons ce que le nonce devrait être, il n'est donc pas nécessaire de l'obtenir en tant que paramètre.

L'algorithme de signature d'Ethereum attend 256 bits à signer, nous utilisons donc la fonction de hachage `keccak256`.

```solidity
        address recoveredAddress = ecrecover(digest, v, r, s);
```

À partir du condensé et de la signature, nous pouvons obtenir l'adresse qui l'a signé en utilisant [ecrecover](https://coders-errand.com/ecrecover-signature-verification-ethereum/).

```solidity
        require(recoveredAddress != address(0) && recoveredAddress == owner, 'UniswapV2: INVALID_SIGNATURE');
        _approve(owner, spender, value);
    }

```

Si tout est OK, traiter cela comme [une approbation ERC-20](https://eips.ethereum.org/EIPS/eip-20#approve).

## Les contrats périphériques {#periphery-contracts}

Les contrats périphériques sont l'API (interface de programme d'application) d'Uniswap. Ils sont disponibles pour les appels externes, en provenance d'autres contrats ou d'applications décentralisées. Vous pourriez appeler directement les contrats de base, mais c'est plus compliqué et vous pourriez perdre de la valeur si vous faites une erreur. Les contrats de base ne contiennent que des tests pour s'assurer qu'ils ne sont pas trompés, pas de contrôles de cohérence pour qui que ce soit d'autre. Ceux-ci sont dans la périphérie afin de pouvoir être mis à jour au besoin.

### UniswapV2Router01.sol {#UniswapV2Router01}

[Ce contrat](https://github.com/Uniswap/uniswap-v2-periphery/blob/master/contracts/UniswapV2Router01.sol) a des problèmes et [ne devrait plus être utilisé](https://docs.uniswap.org/contracts/v2/reference/smart-contracts/router-01). Heureusement, les contrats périphériques sont apatrides et ne détiennent aucun actif, il est donc facile de le déprécier et de suggérer aux gens d'utiliser le remplacement, `UniswapV2Router02`, à la place.

### UniswapV2Router02.sol {#UniswapV2Router02}

Dans la plupart des cas, vous utiliseriez Uniswap via [ce contrat](https://github.com/Uniswap/uniswap-v2-periphery/blob/master/contracts/UniswapV2Router02.sol).
Vous pouvez voir comment l'utiliser [ici](https://docs.uniswap.org/contracts/v2/reference/smart-contracts/router-02).

```solidity
pragma solidity =0.6.6;

import '@uniswap/v2-core/contracts/interfaces/IUniswapV2Factory.sol';
import '@uniswap/lib/contracts/libraries/TransferHelper.sol';

import './interfaces/IUniswapV2Router02.sol';
import './libraries/UniswapV2Library.sol';
import './libraries/SafeMath.sol';
import './interfaces/IERC20.sol';
import './interfaces/IWETH.sol';
```

La plupart d'entre eux ont déjà été rencontrés ou sont assez évidents. La seule exception est `IWETH.sol`. Uniswap v2 permet les échanges pour n'importe quelle paire de jetons ERC-20, mais l'ether (ETH) lui-même n'est pas un jeton ERC-20. Il est antérieur à la norme et est transféré par des mécanismes uniques. Pour permettre l'utilisation d'ETH dans les contrats qui s'appliquent aux jetons ERC-20, le contrat [wrapped ether (WETH)](https://weth.tkn.eth.limo/) a été créé. Vous envoyez des ETH à ce contrat, et il frappe un montant équivalent de WETH. Ou vous pouvez brûler du WETH, et récupérer de l'ETH.

```solidity
contract UniswapV2Router02 is IUniswapV2Router02 {
    using SafeMath for uint;

    address public immutable override factory;
    address public immutable override WETH;
```

Le routeur a besoin de savoir quelle usine utiliser et, pour les transactions qui nécessitent des WETH, quel contrat WETH utiliser. Ces valeurs sont [immuables](https://docs.soliditylang.org/en/v0.8.3/contracts.html#constant-and-immutable-state-variables), ce qui signifie qu'elles ne peuvent être définies que dans le constructeur. Cela donne aux utilisateurs l'assurance que personne ne pourra les modifier pour pointer vers des contrats moins honnêtes.

```solidity
    modifier ensure(uint deadline) {
        require(deadline >= block.timestamp, 'UniswapV2Router: EXPIRED');
        _;
    }
```

Ce modificateur garantit que les transactions limitées dans le temps (« faire X avant l'heure Y si possible ») ne se produisent pas après leur délai imparti.

```solidity
    constructor(address _factory, address _WETH) public {
        factory = _factory;
        WETH = _WETH;
    }
```

Le constructeur définit simplement les variables d'état immuables.

```solidity
    receive() external payable {
        assert(msg.sender == WETH); // only accept ETH via fallback from the WETH contract
    }
```

Cette fonction est appelée lorsque nous échangeons des jetons du contrat WETH contre des ETH. Seul le contrat WETH que nous utilisons est autorisé à faire cela.

#### Ajouter de la liquidité {#add-liquidity}

Ces fonctions ajoutent des jetons à l'échange de paires, ce qui augmente le pool de liquidités.

```solidity

    // **** ADD LIQUIDITY ****
    function _addLiquidity(
```

Cette fonction est utilisée pour calculer le montant des jetons A et B qui doivent être déposés dans l'échange de paires.

```solidity
        address tokenA,
        address tokenB,
```

Ce sont les adresses des contrats de jetons ERC-20.

```solidity
        uint amountADesired,
        uint amountBDesired,
```

Ce sont les montants que le fournisseur de liquidités souhaite déposer. Ce sont également les montants maximums de A et de B à déposer.

```solidity
        uint amountAMin,
        uint amountBMin
```

Ce sont les montants minimums acceptables pour le dépôt. Si la transaction ne peut pas avoir lieu avec ces montants ou plus, l'annuler. Si vous ne souhaitez pas cette fonctionnalité, spécifiez simplement zéro.

Les fournisseurs de liquidités spécifient un minimum, généralement parce qu'ils souhaitent limiter la transaction à un taux de change proche de celui en vigueur. Si le taux de change fluctue trop, cela peut signifier que des nouvelles ont modifié les valeurs sous-jacentes, et ils veulent décider manuellement de la marche à suivre.

Par exemple, imaginons un cas où le taux de change est de un pour un et où le fournisseur de liquidités spécifie ces valeurs :

| Paramètre      | Valeur |
| -------------- | -----: |
| amountADesired |   1000 |
| amountBDesired |   1000 |
| amountAMin     |    900 |
| amountBMin     |    800 |

Tant que le taux de change reste compris entre 0,9 et 1,25, la transaction a lieu. Si le taux de change sort de cette fourchette, la transaction est annulée.

Cette précaution s'explique par le fait que les transactions ne sont pas immédiates, vous les soumettez et un validateur finira par les inclure dans un bloc (à moins que le prix du gaz soit très bas, auquel cas vous devrez soumettre une autre transaction avec le même nonce et un prix du gaz plus élevé pour l'écraser). Vous ne pouvez pas contrôler ce qui se passe pendant l'intervalle entre la soumission et l'inclusion.

```solidity
    ) internal virtual returns (uint amountA, uint amountB) {
```

La fonction retourne les montants que le fournisseur de liquidités doit déposer pour avoir un ratio égal au ratio actuel entre les réserves.

```solidity
        // create the pair if it doesn't exist yet
        if (IUniswapV2Factory(factory).getPair(tokenA, tokenB) == address(0)) {
            IUniswapV2Factory(factory).createPair(tokenA, tokenB);
        }
```

S'il n'existe pas encore d'échange pour cette paire de jetons, le créer.

```solidity
        (uint reserveA, uint reserveB) = UniswapV2Library.getReserves(factory, tokenA, tokenB);
```

Obtenir les réserves actuelles de la paire.

```solidity
        if (reserveA == 0 && reserveB == 0) {
            (amountA, amountB) = (amountADesired, amountBDesired);
```

Si les réserves actuelles sont vides, alors il s'agit d'un nouvel échange de paires. Les montants à déposer doivent être exactement les mêmes que ceux que le fournisseur de liquidités souhaite fournir.

```solidity
        } else {
            uint amountBOptimal = UniswapV2Library.quote(amountADesired, reserveA, reserveB);
```

Si nous devons voir quels seront les montants, nous obtenons le montant optimal en utilisant [cette fonction](https://github.com/Uniswap/uniswap-v2-periphery/blob/master/contracts/libraries/UniswapV2Library.sol#L35). Nous voulons le même ratio que les réserves actuelles.

```solidity
            if (amountBOptimal <= amountBDesired) {
                require(amountBOptimal >= amountBMin, 'UniswapV2Router: INSUFFICIENT_B_AMOUNT');
                (amountA, amountB) = (amountADesired, amountBOptimal);
```

Si `amountBOptimal` est inférieur au montant que le fournisseur de liquidités souhaite déposer, cela signifie que le jeton B a actuellement plus de valeur que ne le pense le déposant, un montant inférieur est donc requis.

```solidity
            } else {
                uint amountAOptimal = UniswapV2Library.quote(amountBDesired, reserveB, reserveA);
                assert(amountAOptimal <= amountADesired);
                require(amountAOptimal >= amountAMin, 'UniswapV2Router: INSUFFICIENT_A_AMOUNT');
                (amountA, amountB) = (amountAOptimal, amountBDesired);
```

Si le montant optimal de B est supérieur au montant désiré de B, cela signifie que les jetons B ont actuellement moins de valeur que ne le pense le déposant de liquidités, un montant plus élevé est donc requis. Cependant, le montant souhaité est un maximum, nous ne pouvons donc pas le dépasser. Nous calculons donc le nombre optimal de jetons A pour le montant souhaité de jetons B.

En assemblant tout cela, nous obtenons ce graphique. Supposons que vous essayiez de déposer un millier de jetons A (ligne bleue) et un millier de jetons B (ligne rouge). L'axe des x représente le taux de change, A/B. Si x=1, ils ont la même valeur et vous déposez un millier de chaque. Si x=2, A vaut deux fois la valeur de B (vous obtenez deux jetons B pour chaque jeton A), vous déposez donc un millier de jetons B, mais seulement 500 jetons A. Si x=0,5, la situation est inversée : un millier de jetons A et cinq cents jetons B.

![Graphique](liquidityProviderDeposit.png)

Vous pourriez déposer des liquidités directement dans le contrat de base (en utilisant [UniswapV2Pair::mint](https://github.com/Uniswap/uniswap-v2-core/blob/master/contracts/UniswapV2Pair.sol#L110)), mais le contrat de base vérifie uniquement qu'il ne se trompe pas lui-même. Vous risquez donc de perdre de la valeur si le taux de change évolue entre le moment où vous soumettez votre transaction et le moment où elle est exécutée. Si vous utilisez le contrat périphérique, il calcule le montant que vous devez déposer et le dépose immédiatement, de sorte que le taux de change ne change pas et vous ne perdez rien.

```solidity
    function addLiquidity(
        address tokenA,
        address tokenB,
        uint amountADesired,
        uint amountBDesired,
        uint amountAMin,
        uint amountBMin,
        address to,
        uint deadline
```

Cette fonction peut être appelée par une transaction pour déposer des liquidités. La plupart des paramètres sont les mêmes que dans `_addLiquidity` ci-dessus, à deux exceptions près :

. `to` est l'adresse qui reçoit les nouveaux jetons de liquidité frappés pour montrer la part du pool détenue par le fournisseur de liquidités.
`deadline` est une limite de temps pour la transaction.

```solidity
    ) external virtual override ensure(deadline) returns (uint amountA, uint amountB, uint liquidity) {
        (amountA, amountB) = _addLiquidity(tokenA, tokenB, amountADesired, amountBDesired, amountAMin, amountBMin);
        address pair = UniswapV2Library.pairFor(factory, tokenA, tokenB);
```

Nous calculons les montants à déposer réellement, puis nous trouvons l'adresse du pool de liquidités. Pour économiser du gaz, nous ne le faisons pas en interrogeant l'usine, mais en utilisant la fonction de bibliothèque `pairFor` (voir ci-dessous dans les bibliothèques).

```solidity
        TransferHelper.safeTransferFrom(tokenA, msg.sender, pair, amountA);
        TransferHelper.safeTransferFrom(tokenB, msg.sender, pair, amountB);
```

Transférer les bons montants de jetons de l'utilisateur vers l'échange de paires.

```solidity
        liquidity = IUniswapV2Pair(pair).mint(to);
    }
```

En retour, donner à l'adresse `to` des jetons de liquidité pour une propriété partielle du pool. La fonction `mint` du contrat de base voit combien de jetons supplémentaires elle a (par rapport à ce qu'elle avait la dernière fois que la liquidité a changé) et frappe la liquidité en conséquence.

```solidity
    function addLiquidityETH(
        address token,
        uint amountTokenDesired,
```

Lorsqu'un fournisseur de liquidités souhaite fournir de la liquidité à un échange de paires Jeton/ETH, il y a quelques différences. Le contrat gère l'enveloppement de l'ETH pour le fournisseur de liquidités. Il n'est pas nécessaire de spécifier combien d'ETH l'utilisateur souhaite déposer, car il les envoie simplement avec la transaction (le montant est disponible dans `msg.value`).

```solidity
        uint amountTokenMin,
        uint amountETHMin,
        address to,
        uint deadline
    ) external virtual override payable ensure(deadline) returns (uint amountToken, uint amountETH, uint liquidity) {
        (amountToken, amountETH) = _addLiquidity(
            token,
            WETH,
            amountTokenDesired,
            msg.value,
            amountTokenMin,
            amountETHMin
        );
        address pair = UniswapV2Library.pairFor(factory, token, WETH);
        TransferHelper.safeTransferFrom(token, msg.sender, pair, amountToken);
        IWETH(WETH).deposit{value: amountETH}();
        assert(IWETH(WETH).transfer(pair, amountETH));
```

Pour déposer l'ETH, le contrat l'enveloppe d'abord dans du WETH, puis transfère le WETH dans la paire. Notez que le transfert est enveloppé dans un `assert`. Cela signifie que si le transfert échoue, cet appel de contrat échoue également, et donc l'enveloppement ne se produit pas réellement.

```solidity
        liquidity = IUniswapV2Pair(pair).mint(to);
        // refund dust eth, if any
        if (msg.value > amountETH) TransferHelper.safeTransferETH(msg.sender, msg.value - amountETH);
    }
```

L'utilisateur nous a déjà envoyé les ETH. S'il reste un surplus (parce que l'autre jeton a moins de valeur que ne le pensait l'utilisateur), nous devons émettre un remboursement.

#### Retirer de la liquidité {#remove-liquidity}

Ces fonctions supprimeront la liquidité et rembourseront le fournisseur de liquidités.

```solidity
    // **** REMOVE LIQUIDITY ****
    function removeLiquidity(
        address tokenA,
        address tokenB,
        uint liquidity,
        uint amountAMin,
        uint amountBMin,
        address to,
        uint deadline
    ) public virtual override ensure(deadline) returns (uint amountA, uint amountB) {
```

Le cas le plus simple de retrait de liquidité. Il y a un montant minimum pour chaque jeton que le fournisseur de liquidités accepte de recevoir, et cela doit avoir lieu avant la date limite.

```solidity
        address pair = UniswapV2Library.pairFor(factory, tokenA, tokenB);
        IUniswapV2Pair(pair).transferFrom(msg.sender, pair, liquidity); // send liquidity to pair
        (uint amount0, uint amount1) = IUniswapV2Pair(pair).burn(to);
```

La fonction `burn` du contrat de base gère le remboursement des jetons à l'utilisateur.

```solidity
        (address token0,) = UniswapV2Library.sortTokens(tokenA, tokenB);
```

Lorsqu'une fonction retourne plusieurs valeurs, mais que nous ne sommes intéressés que par certaines d'entre elles, voici comment nous obtenons uniquement ces valeurs. C'est un peu moins cher en termes de gaz que de lire une valeur et de ne jamais l'utiliser.

```solidity
        (amountA, amountB) = tokenA == token0 ? (amount0, amount1) : (amount1, amount0);
```

Traduire les montants de la façon dont le contrat de base les renvoie (jeton d'adresse inférieure en premier) à la manière dont l'utilisateur les attend (correspondant à `tokenA` et `tokenB`).

```solidity
        require(amountA >= amountAMin, 'UniswapV2Router: INSUFFICIENT_A_AMOUNT');
        require(amountB >= amountBMin, 'UniswapV2Router: INSUFFICIENT_B_AMOUNT');
    }
```

Il est acceptable d'effectuer le transfert d'abord, puis de vérifier sa légitimité, car si ce n'est pas le cas, nous annulerons tous les changements d'état.

```solidity
    function removeLiquidityETH(
        address token,
        uint liquidity,
        uint amountTokenMin,
        uint amountETHMin,
        address to,
        uint deadline
    ) public virtual override ensure(deadline) returns (uint amountToken, uint amountETH) {
        (amountToken, amountETH) = removeLiquidity(
            token,
            WETH,
            liquidity,
            amountTokenMin,
            amountETHMin,
            address(this),
            deadline
        );
        TransferHelper.safeTransfer(token, to, amountToken);
        IWETH(WETH).withdraw(amountETH);
        TransferHelper.safeTransferETH(to, amountETH);
    }
```

Le retrait de liquidité pour l'ETH est presque identique, sauf que nous recevons les jetons WETH, puis les échangeons contre de l'ETH pour les restituer au fournisseur de liquidités.

```solidity
    function removeLiquidityWithPermit(
        address tokenA,
        address tokenB,
        uint liquidity,
        uint amountAMin,
        uint amountBMin,
        address to,
        uint deadline,
        bool approveMax, uint8 v, bytes32 r, bytes32 s
    ) external virtual override returns (uint amountA, uint amountB) {
        address pair = UniswapV2Library.pairFor(factory, tokenA, tokenB);
        uint value = approveMax ? uint(-1) : liquidity;
        IUniswapV2Pair(pair).permit(msg.sender, address(this), value, deadline, v, r, s);
        (amountA, amountB) = removeLiquidity(tokenA, tokenB, liquidity, amountAMin, amountBMin, to, deadline);
    }


    function removeLiquidityETHWithPermit(
        address token,
        uint liquidity,
        uint amountTokenMin,
        uint amountETHMin,
        address to,
        uint deadline,
        bool approveMax, uint8 v, bytes32 r, bytes32 s
    ) external virtual override returns (uint amountToken, uint amountETH) {
        address pair = UniswapV2Library.pairFor(factory, token, WETH);
        uint value = approveMax ? uint(-1) : liquidity;
        IUniswapV2Pair(pair).permit(msg.sender, address(this), value, deadline, v, r, s);
        (amountToken, amountETH) = removeLiquidityETH(token, liquidity, amountTokenMin, amountETHMin, to, deadline);
    }
```

Ces fonctions relaient les méta-transactions pour permettre aux utilisateurs sans ether de se retirer du pool, en utilisant [le mécanisme de permis](#UniswapV2ERC20).

```solidity
    // **** REMOVE LIQUIDITY (supporting fee-on-transfer tokens) ****
    function removeLiquidityETHSupportingFeeOnTransferTokens(
        address token,
        uint liquidity,
        uint amountTokenMin,
        uint amountETHMin,
        address to,
        uint deadline
    ) public virtual override ensure(deadline) returns (uint amountETH) {
        (, amountETH) = removeLiquidity(
            token,
            WETH,
            liquidity,
            amountTokenMin,
            amountETHMin,
            address(this),
            deadline
        );
        TransferHelper.safeTransfer(token, to, IERC20(token).balanceOf(address(this)));
        IWETH(WETH).withdraw(amountETH);
        TransferHelper.safeTransferETH(to, amountETH);
    }

```

Cette fonction peut être utilisée pour les jetons qui ont des frais de transfert ou de stockage. Lorsqu'un jeton a de tels frais, nous ne pouvons pas compter sur la fonction `removeLiquidity` pour nous dire combien de jetons nous récupérons. Nous devons donc d'abord retirer, puis obtenir le solde.

```solidity


    function removeLiquidityETHWithPermitSupportingFeeOnTransferTokens(
        address token,
        uint liquidity,
        uint amountTokenMin,
        uint amountETHMin,
        address to,
        uint deadline,
        bool approveMax, uint8 v, bytes32 r, bytes32 s
    ) external virtual override returns (uint amountETH) {
        address pair = UniswapV2Library.pairFor(factory, token, WETH);
        uint value = approveMax ? uint(-1) : liquidity;
        IUniswapV2Pair(pair).permit(msg.sender, address(this), value, deadline, v, r, s);
        amountETH = removeLiquidityETHSupportingFeeOnTransferTokens(
            token, liquidity, amountTokenMin, amountETHMin, to, deadline
        );
    }
```

La fonction finale combine les frais de stockage avec les méta-transactions.

#### Commercer {#trade}

```solidity
    // **** SWAP ****
    // nécessite que le montant initial ait déjà été envoyé à la première paire
    function _swap(uint[] memory amounts, address[] memory path, address _to) internal virtual {
```

Cette fonction réalise un traitement interne requis pour les fonctions qui sont exposées aux traders.

```solidity
        for (uint i; i < path.length - 1; i++) {
```

Au moment où j'écris ces lignes, il existe [388 160 jetons ERC-20](https://eth.blockscout.com/tokens). S'il y avait un échange de paires pour chaque paire de jetons, cela représenterait plus de 150 milliards d'échanges de paires. La chaîne entière, à l'heure actuelle, [ne compte que 0,1 % de ce nombre de comptes](https://eth.blockscout.com/stats/accountsGrowth). Les fonctions d'échange supportent plutôt le concept de chemin. Un trader peut échanger A contre B, B contre C et C contre D. Ainsi, il n'y a pas besoin d'un échange direct de paire A-D.

Les prix sur ces marchés tendent à être synchronisés, car quand ils sont désynchronisés, cela crée une opportunité d'arbitrage. Imaginez, par exemple, trois jetons : A, B et C. Il existe donc trois échanges de paires, un pour chaque paire.

1. La situation initiale
2. Un trader vend 24,695 jetons A et obtient 25,305 jetons B.
3. Le trader vend 24,695 jetons B contre 25,305 jetons C, et garde environ 0,61 jeton B comme bénéfice.
4. Puis le trader vend 24,695 jetons C en échange de 25,305 jetons A, et garde environ 0,61 jeton C comme bénéfice. Le trader a également 0,61 jeton A supplémentaire (les 25,305 dont dispose le trader en fin de transaction moins l'investissement initial de 24,695).

| Étape | Échange A-B                                                     | Échange B-C                                                     | Échange A-C                                                     |
| ----- | --------------------------------------------------------------- | --------------------------------------------------------------- | --------------------------------------------------------------- |
| 1     | A : 1 000 B : 1 050 A/B=1,05    | B : 1 000 C : 1 050 B/C=1,05    | A : 1 050 C : 1 000 C/A=1,05    |
| 2     | A : 1024,695 B : 1024,695 A/B=1 | B : 1 000 C : 1 050 B/C=1,05    | A : 1 050 C : 1 000 C/A=1,05    |
| 3     | A : 1024,695 B : 1024,695 A/B=1 | B : 1024,695 C : 1024,695 B/C=1 | A : 1 050 C : 1 000 C/A=1,05    |
| 4     | A : 1024,695 B : 1024,695 A/B=1 | B : 1024,695 C : 1024,695 B/C=1 | A : 1024,695 C : 1024,695 C/A=1 |

```solidity
            (address input, address output) = (path[i], path[i + 1]);
            (address token0,) = UniswapV2Library.sortTokens(input, output);
            uint amountOut = amounts[i + 1];
```

Obtenez la paire que nous traitons actuellement, triez-la (pour l'utiliser avec la paire) et obtenez le montant de sortie attendu.

```solidity
            (uint amount0Out, uint amount1Out) = input == token0 ? (uint(0), amountOut) : (amountOut, uint(0));
```

Obtenez les montants de sortie attendus, triés de la manière attendue par l'échange de paires.

```solidity
            address to = i < path.length - 2 ? UniswapV2Library.pairFor(factory, output, path[i + 2]) : _to;
```

Est-ce le dernier échange ? Si c'est le cas, envoyez les jetons reçus pour la transaction à sa destination. Si ce n'est pas le cas, envoyez-le à la prochaine paire d'échange.

```solidity

            IUniswapV2Pair(UniswapV2Library.pairFor(factory, input, output)).swap(
                amount0Out, amount1Out, to, new bytes(0)
            );
        }
    }
```

Appelez réellement l'échange de paires pour échanger les jetons. Nous n'avons pas besoin d'un rappel pour être informé de l'échange. De fait, nous n'envoyons pas d'octets dans ce champ.

```solidity
    function swapExactTokensForTokens(
```

Cette fonction est utilisée directement par les traders pour échanger un jeton contre un autre.

```solidity
        uint amountIn,
        uint amountOutMin,
        address[] calldata path,
```

Ce paramètre contient les adresses des contrats ERC-20. Comme expliqué ci-dessus, il s'agit d'un tableau parce que vous pourriez avoir besoin de passer par plusieurs échanges de paires pour passer de l'actif que vous avez à l'actif que vous voulez.

Un paramètre de fonction dans Solidity peut être stocké soit en `memory`, soit en `calldata`. Si la fonction est un point d'entrée du contrat, directement appelée par un utilisateur (en utilisant une transaction) ou à partir d'un contrat différent, la valeur du paramètre peut être directement obtenue à partir des données d'appel. Si la fonction est appelée en interne, comme `_swap` ci-dessus, alors les paramètres doivent être stockés en `memory`. Du point de vue du contrat appelé, `calldata` est en lecture seule.

Avec des types scalaires tels que `uint` ou `address`, le compilateur gère le choix de stockage pour nous, mais avec les tableaux, qui sont plus longs et plus coûteux, nous spécifions le type de stockage à utiliser.

```solidity
        address to,
        uint deadline
    ) external virtual override ensure(deadline) returns (uint[] memory amounts) {
```

Les valeurs de retour sont toujours retournées en mémoire.

```solidity
        amounts = UniswapV2Library.getAmountsOut(factory, amountIn, path);
        require(amounts[amounts.length - 1] >= amountOutMin, 'UniswapV2Router: INSUFFICIENT_OUTPUT_AMOUNT');
```

Calculez le montant à acheter pour chaque échange. Si le résultat est inférieur au minimum que le trader est prêt à accepter, annulez la transaction.

```solidity
        TransferHelper.safeTransferFrom(
            path[0], msg.sender, UniswapV2Library.pairFor(factory, path[0], path[1]), amounts[0]
        );
        _swap(amounts, path, to);
    }
```

Enfin, transférez le jeton ERC-20 initial sur le compte pour l'échange de la première paire et appelez `_swap`. Tout cela se passe dans la même transaction. Ainsi, l'échange de paires sait que tous les jetons inattendus font partie de ce transfert.

```solidity
    function swapTokensForExactTokens(
        uint amountOut,
        uint amountInMax,
        address[] calldata path,
        address to,
        uint deadline
    ) external virtual override ensure(deadline) returns (uint[] memory amounts) {
        amounts = UniswapV2Library.getAmountsIn(factory, amountOut, path);
        require(amounts[0] <= amountInMax, 'UniswapV2Router: EXCESSIVE_INPUT_AMOUNT');
        TransferHelper.safeTransferFrom(
            path[0], msg.sender, UniswapV2Library.pairFor(factory, path[0], path[1]), amounts[0]
        );
        _swap(amounts, path, to);
    }
```

La fonction précédente, `swapTokensForTokens`, permet à un trader de spécifier le nombre exact de jetons d'entrée qu'il est prêt à donner et le nombre minimum de jetons de sortie qu'il est prêt à recevoir en retour. Cette fonction fait l'échange inverse, elle permet à un trader de spécifier le nombre de jetons de sortie qu'il veut, ainsi que le nombre maximum de jetons d'entrée qu'il est prêt à payer.

Dans les deux cas, le trader doit d'abord donner à ce contrat périphérique une autorisation pour lui permettre de les transférer.

```solidity
    function swapExactETHForTokens(uint amountOutMin, address[] calldata path, address to, uint deadline)
        external
        virtual
        override
        payable
        ensure(deadline)
        returns (uint[] memory amounts)
    {
        require(path[0] == WETH, 'UniswapV2Router: INVALID_PATH');
        amounts = UniswapV2Library.getAmountsOut(factory, msg.value, path);
        require(amounts[amounts.length - 1] >= amountOutMin, 'UniswapV2Router: INSUFFICIENT_OUTPUT_AMOUNT');
        IWETH(WETH).deposit{value: amounts[0]}();
        assert(IWETH(WETH).transfer(UniswapV2Library.pairFor(factory, path[0], path[1]), amounts[0]));
        _swap(amounts, path, to);
    }


    function swapTokensForExactETH(uint amountOut, uint amountInMax, address[] calldata path, address to, uint deadline)
        external
        virtual
        override
        ensure(deadline)
        returns (uint[] memory amounts)
    {
        require(path[path.length - 1] == WETH, 'UniswapV2Router: INVALID_PATH');
        amounts = UniswapV2Library.getAmountsIn(factory, amountOut, path);
        require(amounts[0] <= amountInMax, 'UniswapV2Router: EXCESSIVE_INPUT_AMOUNT');
        TransferHelper.safeTransferFrom(
            path[0], msg.sender, UniswapV2Library.pairFor(factory, path[0], path[1]), amounts[0]
        );
        _swap(amounts, path, address(this));
        IWETH(WETH).withdraw(amounts[amounts.length - 1]);
        TransferHelper.safeTransferETH(to, amounts[amounts.length - 1]);
    }



    function swapExactTokensForETH(uint amountIn, uint amountOutMin, address[] calldata path, address to, uint deadline)
        external
        virtual
        override
        ensure(deadline)
        returns (uint[] memory amounts)
    {
        require(path[path.length - 1] == WETH, 'UniswapV2Router: INVALID_PATH');
        amounts = UniswapV2Library.getAmountsOut(factory, amountIn, path);
        require(amounts[amounts.length - 1] >= amountOutMin, 'UniswapV2Router: INSUFFICIENT_OUTPUT_AMOUNT');
        TransferHelper.safeTransferFrom(
            path[0], msg.sender, UniswapV2Library.pairFor(factory, path[0], path[1]), amounts[0]
        );
        _swap(amounts, path, address(this));
        IWETH(WETH).withdraw(amounts[amounts.length - 1]);
        TransferHelper.safeTransferETH(to, amounts[amounts.length - 1]);
    }


    function swapETHForExactTokens(uint amountOut, address[] calldata path, address to, uint deadline)
        external
        virtual
        override
        payable
        ensure(deadline)
        returns (uint[] memory amounts)
    {
        require(path[0] == WETH, 'UniswapV2Router: INVALID_PATH');
        amounts = UniswapV2Library.getAmountsIn(factory, amountOut, path);
        require(amounts[0] <= msg.value, 'UniswapV2Router: EXCESSIVE_INPUT_AMOUNT');
        IWETH(WETH).deposit{value: amounts[0]}();
        assert(IWETH(WETH).transfer(UniswapV2Library.pairFor(factory, path[0], path[1]), amounts[0]));
        _swap(amounts, path, to);
        // refund dust eth, if any
        if (msg.value > amounts[0]) TransferHelper.safeTransferETH(msg.sender, msg.value - amounts[0]);
    }
```

Ces quatre variantes impliquent toutes des échanges entre ETH et des jetons. La seule différence est que nous recevons de l'ETH du trader et que nous l'utilisons pour frapper des WETH, ou nous recevons des WETH du dernier échange et les brûlons, renvoyant au trader l'ETH en résultant.

```solidity
    // **** SWAP (supporting fee-on-transfer tokens) ****
    // requires the initial amount to have already been sent to the first pair
    function _swapSupportingFeeOnTransferTokens(address[] memory path, address _to) internal virtual {
```

C'est la fonction interne pour échanger les jetons qui ont des frais de transfert ou de stockage pour résoudre ([ce problème](https://github.com/Uniswap/uniswap-interface/issues/835)).

```solidity
        for (uint i; i < path.length - 1; i++) {
            (address input, address output) = (path[i], path[i + 1]);
            (address token0,) = UniswapV2Library.sortTokens(input, output);
            IUniswapV2Pair pair = IUniswapV2Pair(UniswapV2Library.pairFor(factory, input, output));
            uint amountInput;
            uint amountOutput;
            { // portée pour éviter les erreurs de pile trop profonde
            (uint reserve0, uint reserve1,) = pair.getReserves();
            (uint reserveInput, uint reserveOutput) = input == token0 ? (reserve0, reserve1) : (reserve1, reserve0);
            amountInput = IERC20(input).balanceOf(address(pair)).sub(reserveInput);
            amountOutput = UniswapV2Library.getAmountOut(amountInput, reserveInput, reserveOutput);
```

En raison des frais de transfert, nous ne pouvons pas nous fier à la fonction `getAmountsOut` pour nous dire combien nous obtenons de chaque transfert (comme nous le faisons avant d'appeler le `_swap` original). Au lieu de cela, nous devons d'abord transférer et ensuite voir combien de jetons nous avons récupérés.

Remarque : En théorie, nous pourrions simplement utiliser cette fonction au lieu de `_swap`, mais dans certains cas (par exemple, si le transfert est annulé parce qu'il n'y a pas assez à la fin pour atteindre le minimum requis), cela finirait par coûter plus de gaz. Les jetons avec frais de transfert sont assez rares. Bien que nous devions les prendre en charge, il n'est pas nécessaire que tous les échanges partent du principe qu'ils en impliquent au moins un.

```solidity
            }
            (uint amount0Out, uint amount1Out) = input == token0 ? (uint(0), amountOutput) : (amountOutput, uint(0));
            address to = i < path.length - 2 ? UniswapV2Library.pairFor(factory, output, path[i + 2]) : _to;
            pair.swap(amount0Out, amount1Out, to, new bytes(0));
        }
    }


    function swapExactTokensForTokensSupportingFeeOnTransferTokens(
        uint amountIn,
        uint amountOutMin,
        address[] calldata path,
        address to,
        uint deadline
    ) external virtual override ensure(deadline) {
        TransferHelper.safeTransferFrom(
            path[0], msg.sender, UniswapV2Library.pairFor(factory, path[0], path[1]), amountIn
        );
        uint balanceBefore = IERC20(path[path.length - 1]).balanceOf(to);
        _swapSupportingFeeOnTransferTokens(path, to);
        require(
            IERC20(path[path.length - 1]).balanceOf(to).sub(balanceBefore) >= amountOutMin,
            'UniswapV2Router: INSUFFICIENT_OUTPUT_AMOUNT'
        );
    }


    function swapExactETHForTokensSupportingFeeOnTransferTokens(
        uint amountOutMin,
        address[] calldata path,
        address to,
        uint deadline
    )
        external
        virtual
        override
        payable
        ensure(deadline)
    {
        require(path[0] == WETH, 'UniswapV2Router: INVALID_PATH');
        uint amountIn = msg.value;
        IWETH(WETH).deposit{value: amountIn}();
        assert(IWETH(WETH).transfer(UniswapV2Library.pairFor(factory, path[0], path[1]), amountIn));
        uint balanceBefore = IERC20(path[path.length - 1]).balanceOf(to);
        _swapSupportingFeeOnTransferTokens(path, to);
        require(
            IERC20(path[path.length - 1]).balanceOf(to).sub(balanceBefore) >= amountOutMin,
            'UniswapV2Router: INSUFFICIENT_OUTPUT_AMOUNT'
        );
    }


    function swapExactTokensForETHSupportingFeeOnTransferTokens(
        uint amountIn,
        uint amountOutMin,
        address[] calldata path,
        address to,
        uint deadline
    )
        external
        virtual
        override
        ensure(deadline)
    {
        require(path[path.length - 1] == WETH, 'UniswapV2Router: INVALID_PATH');
        TransferHelper.safeTransferFrom(
            path[0], msg.sender, UniswapV2Library.pairFor(factory, path[0], path[1]), amountIn
        );
        _swapSupportingFeeOnTransferTokens(path, address(this));
        uint amountOut = IERC20(WETH).balanceOf(address(this));
        require(amountOut >= amountOutMin, 'UniswapV2Router: INSUFFICIENT_OUTPUT_AMOUNT');
        IWETH(WETH).withdraw(amountOut);
        TransferHelper.safeTransferETH(to, amountOut);
    }
```

Ce sont les mêmes variantes utilisées pour les jetons normaux, mais elles appellent `_swapSupportingFeeOnTransferTokens` à la place.

```solidity
    // **** FONCTIONS DE LA BIBLIOTHÈQUE ****
    function quote(uint amountA, uint reserveA, uint reserveB) public pure virtual override returns (uint amountB) {
        return UniswapV2Library.quote(amountA, reserveA, reserveB);
    }

    function getAmountOut(uint amountIn, uint reserveIn, uint reserveOut)
        public
        pure
        virtual
        override
        returns (uint amountOut)
    {
        return UniswapV2Library.getAmountOut(amountIn, reserveIn, reserveOut);
    }

    function getAmountIn(uint amountOut, uint reserveIn, uint reserveOut)
        public
        pure
        virtual
        override
        returns (uint amountIn)
    {
        return UniswapV2Library.getAmountIn(amountOut, reserveIn, reserveOut);
    }

    function getAmountsOut(uint amountIn, address[] memory path)
        public
        view
        virtual
        override
        returns (uint[] memory amounts)
    {
        return UniswapV2Library.getAmountsOut(factory, amountIn, path);
    }

    function getAmountsIn(uint amountOut, address[] memory path)
        public
        view
        virtual
        override
        returns (uint[] memory amounts)
    {
        return UniswapV2Library.getAmountsIn(factory, amountOut, path);
    }
}
```

Ces fonctions sont simplement des proxys qui appellent les [fonctions d'UniswapV2Library](#uniswapV2library).

### UniswapV2Migrator.sol {#UniswapV2Migrator}

Ce contrat a été utilisé pour migrer les échanges de l'ancienne v1 vers la v2. Maintenant qu'ils ont été migrés, il n'est plus pertinent.

## Les bibliothèques {#libraries}

La [bibliothèque SafeMath](https://docs.openzeppelin.com/contracts/2.x/api/math) est bien documentée, il n'est donc pas nécessaire de la documenter ici.

### Math {#Math}

Cette bibliothèque contient des fonctions mathématiques qui ne sont pas habituellement nécessaires dans le code Solidity. Elles ne font donc pas partie du langage.

```solidity
pragma solidity =0.5.16;

// une bibliothèque pour effectuer diverses opérations mathématiques

library Math {
    function min(uint x, uint y) internal pure returns (uint z) {
        z = x < y ? x : y;
    }

    // méthode babylonienne (https://wikipedia.org/wiki/Methods_of_computing_square_roots#Babylonian_method)
    function sqrt(uint y) internal pure returns (uint z) {
        if (y > 3) {
            z = y;
            uint x = y / 2 + 1;
```

Commencez avec x comme une estimation supérieure à la racine carrée (c'est la raison pour laquelle nous devons traiter 1-3 comme des cas particuliers).

```solidity
            while (x < z) {
                z = x;
                x = (y / x + x) / 2;
```

Obtenez une estimation plus précise, la moyenne de l'estimation précédente et le nombre dont nous essayons de trouver la racine carrée divisée par l'estimation précédente. Répétez jusqu'à ce que la nouvelle estimation ne soit pas inférieure à celle existante. Pour plus de détails, [voir ici](https://wikipedia.org/wiki/Methods_of_computing_square_roots#Babylonian_method).

```solidity
            }
        } else if (y != 0) {
            z = 1;
```

Nous ne devrions jamais avoir besoin de la racine carrée de zéro. Les racines carrées de un, deux et trois sont approximativement un (nous utilisons des entiers, donc nous ignorons la fraction).

```solidity
        }
    }
}
```

### Fractions à point fixe (UQ112x112) {#FixedPoint}

Cette bibliothèque gère les fractions qui ne font normalement pas partie de l'arithmétique Ethereum. Elle le fait en encodant le nombre _x_ comme _x\*2^112_. Cela nous permet d'utiliser les codes d'opérations d'addition et de soustraction d'origine sans modification.

```solidity
pragma solidity =0.5.16;

// une bibliothèque pour la gestion des nombres à virgule fixe binaires (https://wikipedia.org/wiki/Q_(number_format))

// plage : [0, 2**112 - 1]
// résolution : 1 / 2**112

library UQ112x112 {
    uint224 constant Q112 = 2**112;
```

`Q112` est l'encodage pour un.

```solidity
    // encode un uint112 en UQ112x112
    function encode(uint112 y) internal pure returns (uint224 z) {
        z = uint224(y) * Q112; // ne provoque jamais de dépassement
    }
```

Puisque y est un `uint112`, sa valeur maximale est 2^112-1. Ce nombre peut toujours être encodé en `UQ112x112`.

```solidity
    // divise un UQ112x112 par un uint112, retournant un UQ112x112
    function uqdiv(uint224 x, uint112 y) internal pure returns (uint224 z) {
        z = x / uint224(y);
    }
}
```

Si nous divisons deux valeurs `UQ112x112`, le résultat n'est plus multiplié par 2^112. Ainsi, nous prenons à la place un entier comme dénominateur. Nous aurions dû utiliser une astuce similaire pour faire la multiplication, mais nous n'avons pas besoin de faire la multiplication de la valeur `UQ112x112`.

### UniswapV2Library {#uniswapV2library}

Cette bibliothèque n'est utilisée que par les contrats périphériques

```solidity
pragma solidity >=0.5.0;

import '@uniswap/v2-core/contracts/interfaces/IUniswapV2Pair.sol';

import "./SafeMath.sol";

library UniswapV2Library {
    using SafeMath for uint;

    // renvoie les adresses des jetons triés, utilisé pour gérer les valeurs de retour des paires triées dans cet ordre
    function sortTokens(address tokenA, address tokenB) internal pure returns (address token0, address token1) {
        require(tokenA != tokenB, 'UniswapV2Library: IDENTICAL_ADDRESSES');
        (token0, token1) = tokenA < tokenB ? (tokenA, tokenB) : (tokenB, tokenA);
        require(token0 != address(0), 'UniswapV2Library: ZERO_ADDRESS');
    }
```

Triez les deux jetons par adresse, afin que nous puissions obtenir l'adresse de l'échange de paires pour eux. Ceci est nécessaire car sinon nous aurions deux possibilités, une pour les paramètres A, B et une autre pour les paramètres B, A, ce qui conduirait à deux échanges au lieu d'un seul.

```solidity
    // calcule l'adresse CREATE2 pour une paire sans effectuer d'appels externes
    function pairFor(address factory, address tokenA, address tokenB) internal pure returns (address pair) {
        (address token0, address token1) = sortTokens(tokenA, tokenB);
        pair = address(uint(keccak256(abi.encodePacked(
                hex'ff',
                factory,
                keccak256(abi.encodePacked(token0, token1)),
                hex'96e8ac4277198ff8b6f785478aa9a39f403cb768dd02cbee326c3e7da348845f' // hachage du code d'initialisation
            ))));
    }
```

Cette fonction calcule l'adresse de l'échange en paire pour les deux jetons. Ce contrat est créé en utilisant [le code d'opération CREATE2](https://eips.ethereum.org/EIPS/eip-1014). Nous pouvons donc calculer l'adresse en utilisant le même algorithme si nous connaissons les paramètres qu'il utilise. C'est beaucoup moins cher que de demander à la factory, et

```solidity
    // récupère et trie les réserves pour une paire
    function getReserves(address factory, address tokenA, address tokenB) internal view returns (uint reserveA, uint reserveB) {
        (address token0,) = sortTokens(tokenA, tokenB);
        (uint reserve0, uint reserve1,) = IUniswapV2Pair(pairFor(factory, tokenA, tokenB)).getReserves();
        (reserveA, reserveB) = tokenA == token0 ? (reserve0, reserve1) : (reserve1, reserve0);
    }
```

Cette fonction retourne les réserves des deux jetons que l'échange en paire possède. Notez qu'il peut recevoir les jetons dans n'importe quel ordre, et les trier pour un usage interne.

```solidity
    // étant donné un certain montant d'un actif et des réserves de paires, renvoie un montant équivalent de l'autre actif
    function quote(uint amountA, uint reserveA, uint reserveB) internal pure returns (uint amountB) {
        require(amountA > 0, 'UniswapV2Library: INSUFFICIENT_AMOUNT');
        require(reserveA > 0 && reserveB > 0, 'UniswapV2Library: INSUFFICIENT_LIQUIDITY');
        amountB = amountA.mul(reserveB) / reserveA;
    }
```

Cette fonction vous donne le montant du jeton B que vous obtiendrez en échange du jeton A s'il n'y a pas de frais engagés. Ce calcul prend en compte le fait que le transfert modifie le taux de change.

```solidity
    // étant donné un montant d'entrée d'un actif et des réserves de paires, renvoie le montant de sortie maximum de l'autre actif
    function getAmountOut(uint amountIn, uint reserveIn, uint reserveOut) internal pure returns (uint amountOut) {
```

La fonction `quote` ci-dessus fonctionne bien s'il n'y a pas de frais pour l'utilisation de l'échange en paire. Cependant, s'il existe des frais de change de 0,3 %, le montant que vous obtenez réellement est inférieur. Cette fonction calcule le montant après les frais de change.

```solidity

        require(amountIn > 0, 'UniswapV2Library: INSUFFICIENT_INPUT_AMOUNT');
        require(reserveIn > 0 && reserveOut > 0, 'UniswapV2Library: INSUFFICIENT_LIQUIDITY');
        uint amountInWithFee = amountIn.mul(997);
        uint numerator = amountInWithFee.mul(reserveOut);
        uint denominator = reserveIn.mul(1000).add(amountInWithFee);
        amountOut = numerator / denominator;
    }
```

Solidity ne gère pas nativement les fractions. Ainsi, nous ne pouvons pas simplement multiplier le montant par 0,997. Au lieu de cela, nous multiplions le numérateur par 997 et le dénominateur par 1 000, ce qui a le même effet.

```solidity
    // étant donné un montant de sortie d'un actif et des réserves de paires, renvoie le montant d'entrée requis de l'autre actif
    function getAmountIn(uint amountOut, uint reserveIn, uint reserveOut) internal pure returns (uint amountIn) {
        require(amountOut > 0, 'UniswapV2Library: INSUFFICIENT_OUTPUT_AMOUNT');
        require(reserveIn > 0 && reserveOut > 0, 'UniswapV2Library: INSUFFICIENT_LIQUIDITY');
        uint numerator = reserveIn.mul(amountOut).mul(1000);
        uint denominator = reserveOut.sub(amountOut).mul(997);
        amountIn = (numerator / denominator).add(1);
    }
```

Cette fonction réalise à peu près la même chose, mais elle récupère le montant en sortie et fournit l'entrée.

```solidity

    // effectue des calculs de getAmountOut en chaîne sur un nombre quelconque de paires
    function getAmountsOut(address factory, uint amountIn, address[] memory path) internal view returns (uint[] memory amounts) {
        require(path.length >= 2, 'UniswapV2Library: INVALID_PATH');
        amounts = new uint[](path.length);
        amounts[0] = amountIn;
        for (uint i; i < path.length - 1; i++) {
            (uint reserveIn, uint reserveOut) = getReserves(factory, path[i], path[i + 1]);
            amounts[i + 1] = getAmountOut(amounts[i], reserveIn, reserveOut);
        }
    }

    // effectue des calculs de getAmountIn en chaîne sur un nombre quelconque de paires
    function getAmountsIn(address factory, uint amountOut, address[] memory path) internal view returns (uint[] memory amounts) {
        require(path.length >= 2, 'UniswapV2Library: INVALID_PATH');
        amounts = new uint[](path.length);
        amounts[amounts.length - 1] = amountOut;
        for (uint i = path.length - 1; i > 0; i--) {
            (uint reserveIn, uint reserveOut) = getReserves(factory, path[i - 1], path[i]);
            amounts[i - 1] = getAmountIn(amounts[i], reserveIn, reserveOut);
        }
    }
}
```

Ces deux fonctions permettent d'identifier les valeurs lorsqu'il est nécessaire de passer par plusieurs échanges de paires.

### Aide au transfert {#transfer-helper}

[Cette bibliothèque](https://github.com/Uniswap/uniswap-lib/blob/master/contracts/libraries/TransferHelper.sol) ajoute des contrôles de réussite autour des transferts ERC-20 et Ethereum pour traiter de la même manière une annulation et un retour de valeur `false`.

```solidity
// SPDX-License-Identifier: GPL-3.0-or-later

pragma solidity >=0.6.0;

// méthodes d'aide pour interagir avec les jetons ERC20 et envoyer des ETH qui ne renvoient pas systématiquement true/false
library TransferHelper {
    function safeApprove(
        address token,
        address to,
        uint256 value
    ) internal {
        // bytes4(keccak256(bytes('approve(address,uint256)')));
        (bool success, bytes memory data) = token.call(abi.encodeWithSelector(0x095ea7b3, to, value));

```

Nous pouvons appeler un autre contrat de deux manières :

- Utiliser une définition d'interface pour créer un appel de fonction
- Utiliser l'[interface binaire de l'application (ABI)](https://docs.soliditylang.org/en/v0.8.3/abi-spec.html) « manuellement » pour créer l'appel. C'est ce que l'auteur du code a décidé de faire.

```solidity
        require(
            success && (data.length == 0 || abi.decode(data, (bool))),
            'TransferHelper::safeApprove: approve failed'
        );
    }
```

Pour des raisons de rétrocompatibilité avec les jetons créés avant la norme ERC-20, un appel ERC-20 peut échouer soit en étant annulé (auquel cas `success` est `false`), soit en réussissant mais en retournant une valeur `false` (auquel cas il y a des données de sortie, et si vous les décodez en tant que booléen, vous obtenez `false`).

```solidity


    function safeTransfer(
        address token,
        address to,
        uint256 value
    ) internal {
        // bytes4(keccak256(bytes('transfer(address,uint256)')));
        (bool success, bytes memory data) = token.call(abi.encodeWithSelector(0xa9059cbb, to, value));
        require(
            success && (data.length == 0 || abi.decode(data, (bool))),
            'TransferHelper::safeTransfer: transfer failed'
        );
    }
```

Cette fonction implémente la [fonctionnalité de transfert d'ERC-20](https://eips.ethereum.org/EIPS/eip-20#transfer), qui permet à un compte de dépenser la provision fournie par un autre compte.

```solidity

    function safeTransferFrom(
        address token,
        address from,
        address to,
        uint256 value
    ) internal {
        // bytes4(keccak256(bytes('transferFrom(address,address,uint256)')));
        (bool success, bytes memory data) = token.call(abi.encodeWithSelector(0x23b872dd, from, to, value));
        require(
            success && (data.length == 0 || abi.decode(data, (bool))),
            'TransferHelper::transferFrom: transferFrom failed'
        );
    }
```

Cette fonction implémente la [fonctionnalité transferFrom d'ERC-20](https://eips.ethereum.org/EIPS/eip-20#transferfrom), qui permet à un compte de dépenser la provision fournie par un autre compte.

```solidity

    function safeTransferETH(address to, uint256 value) internal {
        (bool success, ) = to.call{value: value}(new bytes(0));
        require(success, 'TransferHelper::safeTransferETH: ETH transfer failed');
    }
}
```

Cette fonction transfère de l'éther vers un compte. Tout appel à un autre contrat peut tenter d'envoyer de l'éther. Parce que nous n'avons pas besoin d'appeler une quelconque fonction, nous n'envoyons aucune donnée avec l'appel.

## Conclusion {#conclusion}

Ceci est un long article d'environ 50 pages. Si vous êtes arrivé jusqu'ici, félicitations ! Espérons que maintenant vous avez compris les considérations à prendre en compte pour écrire une application réelle (par opposition aux programmes d'exemple courts) et que vous êtes mieux à même d'écrire des contrats pour vos propres cas d'utilisation.

Et maintenant, à vous d'écrire quelque chose d'utile et de nous étonner.

[Voir ici pour plus de mon travail](https://cryptodocguy.pro/).
