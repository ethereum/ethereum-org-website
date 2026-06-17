---
title: "Explication détaillée du contrat Uniswap-v2"
description: Comment fonctionne le contrat Uniswap-v2 ? Pourquoi est-il écrit de cette façon ?
author: Ori Pomerantz
tags: ["solidity", "dapps"]
skill: intermediate
breadcrumb: Explication détaillée d'Uniswap v2
published: 2021-05-01
lang: fr
---
## Introduction {#introduction}

[Uniswap v2](https://app.uniswap.org/whitepaper.pdf) peut créer un marché d'échange entre n'importe quels deux jetons ERC-20. Dans cet article, nous allons examiner le code source des contrats qui implémentent ce protocole et voir pourquoi ils sont écrits de cette façon.

### Que fait Uniswap ? {#what-does-uniswap-do}

Fondamentalement, il y a deux types d'utilisateurs : les fournisseurs de liquidité et les traders.

Les _fournisseurs de liquidité_ fournissent à la réserve les deux jetons qui peuvent être échangés (nous les appellerons **Token0** et **Token1**). En retour, ils reçoivent un troisième jeton qui représente la propriété partielle de la réserve, appelé _jeton de liquidité_.

Les _traders_ envoient un type de jeton à la réserve et reçoivent l'autre (par exemple, ils envoient **Token0** et reçoivent **Token1**) à partir de la réserve fournie par les fournisseurs de liquidité. Le taux de change est déterminé par le nombre relatif de **Token0** et de **Token1** que possède la réserve. De plus, la réserve prélève un petit pourcentage en guise de récompense pour la réserve de liquidité.

Lorsque les fournisseurs de liquidité veulent récupérer leurs actifs, ils peuvent brûler les jetons de la réserve et récupérer leurs jetons, y compris leur part des récompenses.

[Cliquez ici pour une description plus complète](https://docs.uniswap.org/contracts/v2/concepts/core-concepts/swaps/).

### Pourquoi la v2 ? Pourquoi pas la v3 ? {#why-v2}

[Uniswap v3](https://app.uniswap.org/whitepaper-v3.pdf) est une mise à jour beaucoup plus complexe que la v2. Il est plus facile d'apprendre d'abord la v2 avant de passer à la v3.

### Contrats principaux vs contrats périphériques {#contract-types}

Uniswap v2 est divisé en deux composants, un cœur et une périphérie. Cette division permet aux contrats principaux, qui détiennent les actifs et _doivent_ donc être sécurisés, d'être plus simples et plus faciles à auditer. Toutes les fonctionnalités supplémentaires requises par les traders peuvent ensuite être fournies par les contrats périphériques.

## Flux de données et de contrôle {#flows}

Voici le flux de données et de contrôle qui se produit lorsque vous effectuez les trois actions principales d'Uniswap :

1. Échanger entre différents jetons
2. Ajouter de la liquidité au marché et être récompensé par des jetons de liquidité ERC-20 de la paire d'échange
3. Brûler des jetons de liquidité ERC-20 et récupérer les jetons ERC-20 que la paire d'échange permet aux traders d'échanger

### Échange {#swap-flow}

C'est le flux le plus courant, utilisé par les traders :

#### Appelant {#caller}

1. Fournir au compte périphérique une allocation du montant à échanger.
2. Appeler l'une des nombreuses fonctions d'échange du contrat périphérique (laquelle dépend de l'implication ou non d'ETH, si le trader spécifie le montant de jetons à déposer ou le montant de jetons à récupérer, etc.).
   Chaque fonction d'échange accepte un `path`, un tableau d'échanges à parcourir.

#### Dans le contrat périphérique (UniswapV2Router02.sol) {#in-the-periphery-contract-uniswapv2router02-sol}

3. Identifier les montants qui doivent être échangés sur chaque échange le long du chemin.
4. Itère sur le chemin. Pour chaque échange en cours de route, il envoie le jeton d'entrée puis appelle la fonction `swap` de l'échange.
   Dans la plupart des cas, l'adresse de destination des jetons est la paire d'échange suivante sur le chemin. Dans l'échange final, c'est l'adresse fournie par le trader.

#### Dans le contrat principal (UniswapV2Pair.sol) {#in-the-core-contract-uniswapv2pairsol-2}

5. Vérifier que le contrat principal n'est pas trompé et peut maintenir une liquidité suffisante après l'échange.
6. Voir combien de jetons supplémentaires nous avons en plus des réserves connues. Ce montant correspond au nombre de jetons d'entrée que nous avons reçus pour l'échange.
7. Envoyer les jetons de sortie à la destination.
8. Appeler `_update` pour mettre à jour les montants des réserves

#### De retour dans le contrat périphérique (UniswapV2Router02.sol) {#back-in-the-periphery-contract-uniswapv2router02-sol}

9. Effectuer tout nettoyage nécessaire (par exemple, brûler des jetons WETH pour récupérer de l'ETH à envoyer au trader)

### Ajouter de la liquidité {#add-liquidity-flow}

#### Appelant {#caller-2}

1. Fournir au compte périphérique une allocation des montants à ajouter à la réserve de liquidité.
2. Appeler l'une des fonctions `addLiquidity` du contrat périphérique.

#### Dans le contrat périphérique (UniswapV2Router02.sol) {#in-the-periphery-contract-uniswapv2router02sol-2}

3. Créer une nouvelle paire d'échange si nécessaire
4. S'il existe une paire d'échange, calculer le montant de jetons à ajouter. Cela est censé être une valeur identique pour les deux jetons, donc le même ratio de nouveaux jetons par rapport aux jetons existants.
5. Vérifier si les montants sont acceptables (les appelants peuvent spécifier un montant minimum en dessous duquel ils préfèrent ne pas ajouter de liquidité)
6. Appeler le contrat principal.

#### Dans le contrat principal (UniswapV2Pair.sol) {#in-the-core-contract-uniswapv2pairsol-2-2}

7. Frapper des jetons de liquidité et les envoyer à l'appelant
8. Appeler `_update` pour mettre à jour les montants des réserves

### Retirer de la liquidité {#remove-liquidity-flow}

#### Appelant {#caller-3}

1. Fournir au compte périphérique une allocation de jetons de liquidité à brûler en échange des jetons sous-jacents.
2. Appeler l'une des fonctions `removeLiquidity` du contrat périphérique.

#### Dans le contrat périphérique (UniswapV2Router02.sol) {#in-the-periphery-contract-uniswapv2router02sol-3}

3. Envoyer les jetons de liquidité à la paire d'échange

#### Dans le contrat principal (UniswapV2Pair.sol) {#in-the-core-contract-uniswapv2pairsol-3}

4. Envoyer à l'adresse de destination les jetons sous-jacents proportionnellement aux jetons brûlés. Par exemple, s'il y a 1000 jetons A dans la réserve, 500 jetons B et 90 jetons de liquidité, et que nous recevons 9 jetons à brûler, nous brûlons 10 % des jetons de liquidité, nous renvoyons donc à l'utilisateur 100 jetons A et 50 jetons B.
5. Brûler les jetons de liquidité
6. Appeler `_update` pour mettre à jour les montants des réserves

## Les contrats principaux {#core-contracts}

Ce sont les contrats sécurisés qui détiennent la liquidité.

### UniswapV2Pair.sol {#uniswapv2pair}

[Ce contrat](https://github.com/Uniswap/uniswap-v2-core/blob/master/contracts/UniswapV2Pair.sol) implémente la réserve réelle qui échange les jetons. C'est la fonctionnalité principale d'Uniswap.

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

Ce contrat hérite de `UniswapV2ERC20`, qui fournit les fonctions ERC-20 pour les jetons de liquidité.

```solidity
    using SafeMath  for uint;
```

La [bibliothèque SafeMath](https://docs.openzeppelin.com/contracts/2.x/api/math) est utilisée pour éviter les dépassements de capacité par le haut (overflows) et par le bas (underflows). C'est important car sinon nous pourrions nous retrouver dans une situation où une valeur devrait être `-1`, mais est à la place `2^256-1`.

```solidity
    using UQ112x112 for uint224;
```

Beaucoup de calculs dans le contrat de la réserve nécessitent des fractions. Cependant, les fractions ne sont pas prises en charge par l'EVM.
La solution trouvée par Uniswap est d'utiliser des valeurs de 224 bits, avec 112 bits pour la partie entière et 112 bits pour la fraction. Ainsi, `1.0` est représenté par `2^112`, `1.5` est représenté par `2^112 + 2^111`, etc.

Plus de détails sur cette bibliothèque sont disponibles [plus loin dans le document](#fixedpoint).

#### Variables {#pair-vars}

```solidity
    uint public constant MINIMUM_LIQUIDITY = 10**3;
```

Pour éviter les cas de division par zéro, il y a un nombre minimum de jetons de liquidité qui existent toujours (mais qui appartiennent au compte zéro). Ce nombre est **MINIMUM_LIQUIDITY**, soit mille.

```solidity
    bytes4 private constant SELECTOR = bytes4(keccak256(bytes('transfer(address,uint256)')));
```

C'est le sélecteur d'ABI pour la fonction de transfert ERC-20. Il est utilisé pour transférer des jetons ERC-20 dans les deux comptes de jetons.

```solidity
    address public factory;
```

C'est le contrat d'usine (factory) qui a créé cette réserve. Chaque réserve est un échange entre deux jetons ERC-20, l'usine est un point central qui connecte toutes ces réserves.

```solidity
    address public token0;
    address public token1;
```

Il y a les adresses des contrats pour les deux types de jetons ERC-20 qui peuvent être échangés par cette réserve.

```solidity
    uint112 private reserve0;           // utilise un seul emplacement de stockage, accessible via getReserves
    uint112 private reserve1;           // utilise un seul emplacement de stockage, accessible via getReserves
```

Les réserves que la réserve de liquidité possède pour chaque type de jeton. Nous supposons que les deux représentent la même quantité de valeur, et par conséquent chaque token0 vaut reserve1/reserve0 token1.

```solidity
    uint32  private blockTimestampLast; // utilise un seul emplacement de stockage, accessible via getReserves
```

L'horodatage du dernier bloc dans lequel un échange a eu lieu, utilisé pour suivre les taux de change au fil du temps.

L'une des plus grandes dépenses en gaz des contrats Ethereum est le stockage, qui persiste d'un appel du contrat au suivant. Chaque cellule de stockage a une longueur de 256 bits. Ainsi, trois variables, `reserve0`, `reserve1` et `blockTimestampLast`, sont allouées de telle manière qu'une seule valeur de stockage peut les inclure toutes les trois (112+112+32=256).

```solidity
    uint public price0CumulativeLast;
    uint public price1CumulativeLast;
```

Ces variables contiennent les coûts cumulés pour chaque jeton (chacun en fonction de l'autre). Elles peuvent être utilisées pour calculer le taux de change moyen sur une période donnée.

```solidity
    uint public kLast; // reserve0 * reserve1, immédiatement après le plus récent événement de liquidité
```

La façon dont l'échange de paires décide du taux de change entre token0 et token1 est de maintenir le multiple des deux réserves constant pendant les transactions. `kLast` est cette valeur. Elle change lorsqu'un fournisseur de liquidité dépose ou retire des jetons, et elle augmente légèrement en raison des frais de marché de 0,3 %.

Voici un exemple simple. Notez que par souci de simplicité, le tableau ne comporte que trois chiffres après la virgule, et nous ignorons les frais de transaction de 0,3 %, de sorte que les chiffres ne sont pas exacts.

| Événement                                             |  reserve0 |  reserve1 | reserve0 \* reserve1 | Taux de change moyen (token1 / token0) |
| ----------------------------------------------------- | --------: | --------: | -------------------: | -------------------------------------- |
| Configuration initiale                                | 1,000.000 | 1,000.000 |            1,000,000 |                                        |
| Le trader A échange 50 token0 contre 47.619 token1    | 1,050.000 |   952.381 |            1,000,000 | 0.952                                  |
| Le trader B échange 10 token0 contre 8.984 token1     | 1,060.000 |   943.396 |            1,000,000 | 0.898                                  |
| Le trader C échange 40 token0 contre 34.305 token1    | 1,100.000 |   909.090 |            1,000,000 | 0.858                                  |
| Le trader D échange 100 token1 contre 109.01 token0   |   990.990 | 1,009.090 |            1,000,000 | 0.917                                  |
| Le trader E échange 10 token0 contre 10.079 token1    | 1,000.990 |   999.010 |            1,000,000 | 1.008                                  |

À mesure que les traders fournissent plus de token0, la valeur relative de token1 augmente, et vice versa, en fonction de l'offre et de la demande.

#### Verrou (Lock) {#pair-lock}

```solidity
    uint private unlocked = 1;
```

Il existe une classe de vulnérabilités de sécurité qui sont basées sur [l'abus de réentrance](https://medium.com/coinmonks/ethernaut-lvl-10-re-entrancy-walkthrough-how-to-abuse-execution-ordering-and-reproduce-the-dao-7ec88b912c14). Uniswap doit transférer des jetons ERC-20 arbitraires, ce qui signifie appeler des contrats ERC-20 qui peuvent tenter d'abuser du marché Uniswap qui les appelle.
En ayant une variable `unlocked` dans le contrat, nous pouvons empêcher les fonctions d'être appelées pendant qu'elles sont en cours d'exécution (au sein de la même transaction).

```solidity
    modifier lock() {
```

Cette fonction est un [modificateur (modifier)](https://docs.soliditylang.org/en/v0.8.3/contracts.html#function-modifiers), une fonction qui enveloppe une fonction normale pour modifier son comportement d'une manière ou d'une autre.

```solidity
        require(unlocked == 1, 'UniswapV2: LOCKED');
        unlocked = 0;
```

Si `unlocked` est égal à un, le définir à zéro. S'il est déjà à zéro, annuler l'appel, le faire échouer.

```solidity
        _;
```

Dans un modificateur, `_;` est l'appel de la fonction d'origine (avec tous les paramètres). Ici, cela signifie que l'appel de la fonction ne se produit que si `unlocked` valait un lorsqu'elle a été appelée, et pendant son exécution, la valeur de `unlocked` est zéro.

```solidity
        unlocked = 1;
    }
```

Une fois que la fonction principale a retourné son résultat, relâcher le verrou.

#### Fonctions diverses {#pair-misc}

```solidity
    function getReserves() public view returns (uint112 _reserve0, uint112 _reserve1, uint32 _blockTimestampLast) {
        _reserve0 = reserve0;
        _reserve1 = reserve1;
        _blockTimestampLast = blockTimestampLast;
    }
```

Cette fonction fournit aux appelants l'état actuel de l'échange. Remarquez que les fonctions Solidity [peuvent retourner plusieurs valeurs](https://docs.soliditylang.org/en/v0.8.3/contracts.html#returning-multiple-values).

```solidity
    function _safeTransfer(address token, address to, uint value) private {
        (bool success, bytes memory data) = token.call(abi.encodeWithSelector(SELECTOR, to, value));
```

Cette fonction interne transfère une quantité de jetons ERC-20 de l'échange vers quelqu'un d'autre. `SELECTOR` spécifie que la fonction que nous appelons est `transfer(address,uint)` (voir la définition ci-dessus).

Pour éviter d'avoir à importer une interface pour la fonction du jeton, nous créons « manuellement » l'appel en utilisant l'une des [fonctions de l'ABI](https://docs.soliditylang.org/en/v0.8.3/units-and-global-variables.html#abi-encoding-and-decoding-functions).

```solidity
        require(success && (data.length == 0 || abi.decode(data, (bool))), 'UniswapV2: TRANSFER_FAILED');
    }
```

Il y a deux façons pour un appel de transfert ERC-20 de signaler un échec :

1. Annuler. Si un appel à un contrat externe est annulé, alors la valeur de retour booléenne est `false`
2. Se terminer normalement mais signaler un échec. Dans ce cas, le tampon de la valeur de retour a une longueur non nulle, et lorsqu'il est décodé en tant que valeur booléenne, il est `false`

Si l'une de ces conditions se produit, annuler.

#### Événements {#pair-events}

```solidity
    event Mint(address indexed sender, uint amount0, uint amount1);
    event Burn(address indexed sender, uint amount0, uint amount1, address indexed to);
```

Ces deux événements sont émis lorsqu'un fournisseur de liquidité dépose de la liquidité (`Mint`) ou la retire (`Burn`). Dans les deux cas, les montants de token0 et token1 qui sont déposés ou retirés font partie de l'événement, ainsi que l'identité du compte qui nous a appelés (`sender`). Dans le cas d'un retrait, l'événement inclut également la cible qui a reçu les jetons (`to`), qui peut ne pas être la même que l'expéditeur.

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

Cet événement est émis lorsqu'un trader échange un jeton contre l'autre. Encore une fois, l'expéditeur et la destination peuvent ne pas être les mêmes.
Chaque jeton peut être soit envoyé à l'échange, soit reçu de celui-ci.

```solidity
    event Sync(uint112 reserve0, uint112 reserve1);
```

Enfin, `Sync` est émis chaque fois que des jetons sont ajoutés ou retirés, quelle qu'en soit la raison, pour fournir les dernières informations sur les réserves (et donc le taux de change).

#### Fonctions de configuration {#pair-setup}

Ces fonctions sont censées être appelées une fois lors de la configuration du nouvel échange de paires.

```solidity
    constructor() public {
        factory = msg.sender;
    }
```

Le constructeur s'assure que nous garderons une trace de l'adresse de l'usine qui a créé la paire. Cette information est requise pour `initialize` et pour les frais de l'usine (s'il y en a).

```solidity
    // appelé une fois par la fabrique au moment du déploiement
    function initialize(address _token0, address _token1) external {
        require(msg.sender == factory, 'UniswapV2: FORBIDDEN'); // vérification suffisante
        token0 = _token0;
        token1 = _token1;
    }
```

Cette fonction permet à l'usine (et uniquement à l'usine) de spécifier les deux jetons ERC-20 que cette paire échangera.

#### Fonctions de mise à jour internes {#pair-update-internal}

##### \_update {#pair-external}

```solidity
    // mettre à jour les réserves et, lors du premier appel par bloc, les accumulateurs de prix
    function _update(uint balance0, uint balance1, uint112 _reserve0, uint112 _reserve1) private {
```

Cette fonction est appelée chaque fois que des jetons sont déposés ou retirés.

```solidity
        require(balance0 <= uint112(-1) && balance1 <= uint112(-1), 'UniswapV2: OVERFLOW');
```

Si balance0 ou balance1 (uint256) est supérieur à uint112(-1) (=2^112-1) (donc il y a un dépassement de capacité et il revient à 0 lors de la conversion en uint112), refuser de continuer la fonction \_update pour éviter les dépassements de capacité. Avec un jeton normal qui peut être subdivisé en 10^18 unités, cela signifie que chaque échange est limité à environ 5,1\*10^15 de chaque jeton. Jusqu'à présent, cela n'a pas posé de problème.

```solidity
        uint32 blockTimestamp = uint32(block.timestamp % 2**32);
        uint32 timeElapsed = blockTimestamp - blockTimestampLast; // le débordement est souhaité
        if (timeElapsed > 0 && _reserve0 != 0 && _reserve1 != 0) {
```

Si le temps écoulé n'est pas nul, cela signifie que nous sommes la première transaction d'échange sur ce bloc. Dans ce cas, nous devons mettre à jour les accumulateurs de coûts.

```solidity
            // * ne déborde jamais, et le débordement de + est souhaité
            price0CumulativeLast += uint(UQ112x112.encode(_reserve1).uqdiv(_reserve0)) * timeElapsed;
            price1CumulativeLast += uint(UQ112x112.encode(_reserve0).uqdiv(_reserve1)) * timeElapsed;
        }
```

Chaque accumulateur de coût est mis à jour avec le dernier coût (réserve de l'autre jeton/réserve de ce jeton) multiplié par le temps écoulé en secondes. Pour obtenir un prix moyen, vous lisez le prix cumulé à deux moments différents et vous divisez par la différence de temps entre eux. Par exemple, supposons cette séquence d'événements :

| Événement                                                |  reserve0 |  reserve1 | horodatage | Taux de change marginal (reserve1 / reserve0) |       price0CumulativeLast |
| -------------------------------------------------------- | --------: | --------: | ---------- | --------------------------------------------: | -------------------------: |
| Configuration initiale                                   | 1,000.000 | 1,000.000 | 5,000      |                                         1.000 |                          0 |
| Le trader A dépose 50 token0 et récupère 47.619 token1   | 1,050.000 |   952.381 | 5,020      |                                         0.907 |                         20 |
| Le trader B dépose 10 token0 et récupère 8.984 token1    | 1,060.000 |   943.396 | 5,030      |                                         0.890 |       20+10\*0.907 = 29.07 |
| Le trader C dépose 40 token0 et récupère 34.305 token1   | 1,100.000 |   909.090 | 5,100      |                                         0.826 |    29.07+70\*0.890 = 91.37 |
| Le trader D dépose 100 token1 et récupère 109.01 token0  |   990.990 | 1,009.090 | 5,110      |                                         1.018 |    91.37+10\*0.826 = 99.63 |
| Le trader E dépose 10 token0 et récupère 10.079 token1   | 1,000.990 |   999.010 | 5,150      |                                         0.998 | 99.63+40\*1.1018 = 143.702 |

Disons que nous voulons calculer le prix moyen de **Token0** entre les horodatages 5,030 et 5,150. La différence de la valeur de `price0Cumulative` est 143.702-29.07=114.632. C'est la moyenne sur deux minutes (120 secondes). Le prix moyen est donc de 114.632/120 = 0.955.

Ce calcul de prix est la raison pour laquelle nous devons connaître les anciennes tailles des réserves.

```solidity
        reserve0 = uint112(balance0);
        reserve1 = uint112(balance1);
        blockTimestampLast = blockTimestamp;
        emit Sync(reserve0, reserve1);
    }
```

Enfin, mettre à jour les variables globales et émettre un événement `Sync`.

##### \_mintFee {#uniswapv2factory}

```solidity
    // si les frais sont activés, frapper une liquidité équivalente à 1/6 de la croissance de sqrt(k)
    function _mintFee(uint112 _reserve0, uint112 _reserve1) private returns (bool feeOn) {
```

Dans Uniswap 2.0, les traders paient des frais de 0,30 % pour utiliser le marché. La majeure partie de ces frais (0,25 % de la transaction) revient toujours aux fournisseurs de liquidité. Les 0,05 % restants peuvent aller soit aux fournisseurs de liquidité, soit à une adresse spécifiée par l'usine en tant que frais de protocole, ce qui rémunère Uniswap pour ses efforts de développement.

Pour réduire les calculs (et donc les coûts en gaz), ces frais ne sont calculés que lorsque de la liquidité est ajoutée ou retirée de la réserve de liquidité, plutôt qu'à chaque transaction.

```solidity
        address feeTo = IUniswapV2Factory(factory).feeTo();
        feeOn = feeTo != address(0);
```

Lire la destination des frais de l'usine. Si elle est de zéro, alors il n'y a pas de frais de protocole et il n'est pas nécessaire de calculer ces frais.

```solidity
        uint _kLast = kLast; // économies de gaz
```

La variable d'état `kLast` est située dans le stockage, elle aura donc une valeur entre les différents appels au contrat.
L'accès au stockage est beaucoup plus coûteux que l'accès à la mémoire volatile qui est libérée lorsque l'appel de la fonction au contrat se termine, nous utilisons donc une variable interne pour économiser du gaz.

```solidity
        if (feeOn) {
            if (_kLast != 0) {
```

Les fournisseurs de liquidité obtiennent leur part simplement par l'appréciation de leurs jetons de liquidité. Mais les frais de protocole nécessitent que de nouveaux jetons de liquidité soient frappés et fournis à l'adresse `feeTo`.

```solidity
                uint rootK = Math.sqrt(uint(_reserve0).mul(_reserve1));
                uint rootKLast = Math.sqrt(_kLast);
                if (rootK > rootKLast) {
```

S'il y a une nouvelle liquidité sur laquelle percevoir des frais de protocole. Vous pouvez voir la fonction de racine carrée [plus loin dans cet article](#math)

```solidity
                    uint numerator = totalSupply.mul(rootK.sub(rootKLast));
                    uint denominator = rootK.mul(5).add(rootKLast);
                    uint liquidity = numerator / denominator;
```

Ce calcul compliqué des frais est expliqué dans [le livre blanc](https://app.uniswap.org/whitepaper.pdf) à la page 5. Nous savons qu'entre le moment où `kLast` a été calculé et le présent, aucune liquidité n'a été ajoutée ou retirée (car nous exécutons ce calcul chaque fois que de la liquidité est ajoutée ou retirée, avant qu'elle ne change réellement), donc tout changement dans `reserve0 * reserve1` doit provenir des frais de transaction (sans eux, nous garderions `reserve0 * reserve1` constant).

```solidity
                    if (liquidity > 0) _mint(feeTo, liquidity);
                }
            }
```

Utiliser la fonction `UniswapV2ERC20._mint` pour créer réellement les jetons de liquidité supplémentaires et les attribuer à `feeTo`.

```solidity
        } else if (_kLast != 0) {
            kLast = 0;
        }
    }
```

S'il n'y a pas de frais, définir `kLast` à zéro (si ce n'est pas déjà le cas). Lorsque ce contrat a été écrit, il y avait une [fonctionnalité de remboursement de gaz](https://eips.ethereum.org/EIPS/eip-3298) qui encourageait les contrats à réduire la taille globale de l'état d'Ethereum en remettant à zéro le stockage dont ils n'avaient pas besoin.
Ce code obtient ce remboursement lorsque cela est possible.

#### Fonctions accessibles de l'extérieur {#uniswapv2erc20}

Notez que bien que n'importe quelle transaction ou contrat _puisse_ appeler ces fonctions, elles sont conçues pour être appelées depuis le contrat périphérique. Si vous les appelez directement, vous ne pourrez pas tromper l'échange de paires, mais vous pourriez perdre de la valeur à cause d'une erreur.

##### mint {#periphery-contracts}

```solidity
    // cette fonction de bas niveau doit être appelée depuis un contrat qui effectue des vérifications de sécurité importantes
    function mint(address to) external lock returns (uint liquidity) {
```

Cette fonction est appelée lorsqu'un fournisseur de liquidité ajoute de la liquidité à la réserve de liquidité. Elle frappe des jetons de liquidité supplémentaires en guise de récompense. Elle doit être appelée depuis [un contrat périphérique](#uniswapv2router02) qui l'appelle après avoir ajouté la liquidité dans la même transaction (afin que personne d'autre ne puisse soumettre une transaction qui réclame la nouvelle liquidité avant le propriétaire légitime).

```solidity
        (uint112 _reserve0, uint112 _reserve1,) = getReserves(); // économies de gaz
```

C'est la façon de lire les résultats d'une fonction Solidity qui retourne plusieurs valeurs. Nous ignorons la dernière valeur retournée, l'horodatage du bloc, car nous n'en avons pas besoin.

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

Calculer les frais de protocole à percevoir, le cas échéant, et frapper les jetons de liquidité en conséquence. Étant donné que les paramètres de `_mintFee` sont les anciennes valeurs de réserve, les frais sont calculés avec précision en se basant uniquement sur les changements de la réserve dus aux frais.

```solidity
        uint _totalSupply = totalSupply; // économies de gaz, doit être défini ici car totalSupply peut se mettre à jour dans _mintFee
        if (_totalSupply == 0) {
            liquidity = Math.sqrt(amount0.mul(amount1)).sub(MINIMUM_LIQUIDITY);
           _mint(address(0), MINIMUM_LIQUIDITY); // verrouiller de façon permanente les premiers jetons MINIMUM_LIQUIDITY
```

S'il s'agit du premier dépôt, créer `MINIMUM_LIQUIDITY` jetons et les envoyer à l'adresse zéro pour les verrouiller. Ils ne pourront jamais être rachetés, ce qui signifie que la réserve ne sera jamais complètement vidée (cela nous évite des divisions par zéro à certains endroits). La valeur de `MINIMUM_LIQUIDITY` est de mille, ce qui, considérant que la plupart des ERC-20 sont subdivisés en unités de 10^-18 d'un jeton, tout comme l'ETH est divisé en Wei, représente 10^-15 de la valeur d'un seul jeton. Ce n'est pas un coût élevé.

Au moment du premier dépôt, nous ne connaissons pas la valeur relative des deux jetons, nous multiplions donc simplement les montants et prenons une racine carrée, en supposant que le dépôt nous fournit une valeur égale dans les deux jetons.

Nous pouvons nous y fier car il est dans l'intérêt du déposant de fournir une valeur égale, pour éviter de perdre de la valeur à cause de l'arbitrage.
Disons que la valeur des deux jetons est identique, mais que notre déposant a déposé quatre fois plus de **Token1** que de **Token0**. Un trader peut utiliser le fait que l'échange de paires pense que **Token0** a plus de valeur pour en extraire de la valeur.

| Événement                                                    | reserve0 | reserve1 | reserve0 \* reserve1 | Valeur de la réserve (reserve0 + reserve1) |
| ------------------------------------------------------------ | -------: | -------: | -------------------: | -----------------------------------------: |
| Configuration initiale                                       |        8 |       32 |                  256 |                                         40 |
| Le trader dépose 8 jetons **Token0**, récupère 16 **Token1** |       16 |       16 |                  256 |                                         32 |

Comme vous pouvez le voir, le trader a gagné 8 jetons supplémentaires, qui proviennent d'une réduction de la valeur de la réserve, ce qui nuit au déposant qui la possède.

```solidity
        } else {
            liquidity = Math.min(amount0.mul(_totalSupply) / _reserve0, amount1.mul(_totalSupply) / _reserve1);
```

Avec chaque dépôt ultérieur, nous connaissons déjà le taux de change entre les deux actifs, et nous nous attendons à ce que les fournisseurs de liquidité fournissent une valeur égale dans les deux. S'ils ne le font pas, nous leur donnons des jetons de liquidité basés sur la valeur la plus faible qu'ils ont fournie, en guise de punition.

Qu'il s'agisse du dépôt initial ou d'un dépôt ultérieur, le nombre de jetons de liquidité que nous fournissons est égal à la racine carrée du changement de `reserve0*reserve1` et la valeur du jeton de liquidité ne change pas (à moins que nous ne recevions un dépôt qui n'a pas des valeurs égales des deux types, auquel cas l'« amende » est distribuée). Voici un autre exemple avec deux jetons qui ont la même valeur, avec trois bons dépôts et un mauvais (dépôt d'un seul type de jeton, donc il ne produit aucun jeton de liquidité).

| Événement                      | reserve0 | reserve1 | reserve0 \* reserve1 | Valeur de la réserve (reserve0 + reserve1) | Jetons de liquidité frappés pour ce dépôt | Total des jetons de liquidité | Valeur de chaque jeton de liquidité |
| ------------------------------ | -------: | -------: | -------------------: | -----------------------------------------: | ----------------------------------------: | ----------------------------: | ----------------------------------: |
| Configuration initiale         |    8.000 |    8.000 |                   64 |                                     16.000 |                                         8 |                             8 |                               2.000 |
| Dépôt de quatre de chaque type |   12.000 |   12.000 |                  144 |                                     24.000 |                                         4 |                            12 |                               2.000 |
| Dépôt de deux de chaque type   |   14.000 |   14.000 |                  196 |                                     28.000 |                                         2 |                            14 |                               2.000 |
| Dépôt de valeur inégale        |   18.000 |   14.000 |                  252 |                                     32.000 |                                         0 |                            14 |                              ~2.286 |
| Après arbitrage                |  ~15.874 |  ~15.874 |                  252 |                                    ~31.748 |                                         0 |                            14 |                              ~2.267 |

```solidity
        }
        require(liquidity > 0, 'UniswapV2: INSUFFICIENT_LIQUIDITY_MINTED');
        _mint(to, liquidity);
```

Utiliser la fonction `UniswapV2ERC20._mint` pour créer réellement les jetons de liquidité supplémentaires et les donner au bon compte.

```solidity

        _update(balance0, balance1, _reserve0, _reserve1);
        if (feeOn) kLast = uint(reserve0).mul(reserve1); // reserve0 et reserve1 sont à jour
        emit Mint(msg.sender, amount0, amount1);
    }
```

Mettre à jour les variables d'état (`reserve0`, `reserve1`, et si nécessaire `kLast`) et émettre l'événement approprié.

##### burn {#uniswapv2router01}

```solidity
    // cette fonction de bas niveau doit être appelée depuis un contrat qui effectue des vérifications de sécurité importantes
    function burn(address to) external lock returns (uint amount0, uint amount1) {
```

Cette fonction est appelée lorsque de la liquidité est retirée et que les jetons de liquidité appropriés doivent être brûlés.
Elle doit également être appelée [depuis un compte périphérique](#uniswapv2router02).

```solidity
        (uint112 _reserve0, uint112 _reserve1,) = getReserves(); // économies de gaz
        address _token0 = token0;                                // économies de gaz
        address _token1 = token1;                                // économies de gaz
        uint balance0 = IERC20(_token0).balanceOf(address(this));
        uint balance1 = IERC20(_token1).balanceOf(address(this));
        uint liquidity = balanceOf[address(this)];
```

Le contrat périphérique a transféré la liquidité à brûler à ce contrat avant l'appel. De cette façon, nous savons quelle quantité de liquidité brûler, et nous pouvons nous assurer qu'elle est bien brûlée.

```solidity
        bool feeOn = _mintFee(_reserve0, _reserve1);
        uint _totalSupply = totalSupply; // économies de gaz, doit être défini ici car totalSupply peut se mettre à jour dans _mintFee
        amount0 = liquidity.mul(balance0) / _totalSupply; // l'utilisation des soldes garantit une distribution au prorata
        amount1 = liquidity.mul(balance1) / _totalSupply; // l'utilisation des soldes garantit une distribution au prorata
        require(amount0 > 0 && amount1 > 0, 'UniswapV2: INSUFFICIENT_LIQUIDITY_BURNED');
```

Le fournisseur de liquidité reçoit une valeur égale des deux jetons. De cette façon, nous ne modifions pas le taux de change.

```solidity
        _burn(address(this), liquidity);
        _safeTransfer(_token0, to, amount0);
        _safeTransfer(_token1, to, amount1);
        balance0 = IERC20(_token0).balanceOf(address(this));
        balance1 = IERC20(_token1).balanceOf(address(this));

        _update(balance0, balance1, _reserve0, _reserve1);
        if (feeOn) kLast = uint(reserve0).mul(reserve1); // reserve0 et reserve1 sont à jour
        emit Burn(msg.sender, amount0, amount1, to);
    }

```

Le reste de la fonction `burn` est l'image miroir de la fonction `mint` ci-dessus.

##### swap {#uniswapv2router02}

```solidity
    // cette fonction de bas niveau doit être appelée depuis un contrat qui effectue des vérifications de sécurité importantes
    function swap(uint amount0Out, uint amount1Out, address to, bytes calldata data) external lock {
```

Cette fonction est également censée être appelée depuis [un contrat périphérique](#uniswapv2router02).

```solidity
        require(amount0Out > 0 || amount1Out > 0, 'UniswapV2: INSUFFICIENT_OUTPUT_AMOUNT');
        (uint112 _reserve0, uint112 _reserve1,) = getReserves(); // économies de gaz
        require(amount0Out < _reserve0 && amount1Out < _reserve1, 'UniswapV2: INSUFFICIENT_LIQUIDITY');

        uint balance0;
        uint balance1;
        { // portée pour _token{0,1}, évite les erreurs de pile trop profonde
```

Les variables locales peuvent être stockées soit en mémoire, soit, s'il n'y en a pas trop, directement sur la pile.
Si nous pouvons limiter le nombre pour utiliser la pile, nous utilisons moins de gaz. Pour plus de détails, voir [le livre jaune, les spécifications formelles d'Ethereum](https://ethereum.github.io/yellowpaper/paper.pdf), p. 26, équation 298.

```solidity
            address _token0 = token0;
            address _token1 = token1;
            require(to != _token0 && to != _token1, 'UniswapV2: INVALID_TO');
            if (amount0Out > 0) _safeTransfer(_token0, to, amount0Out); // transférer les jetons de manière optimiste
            if (amount1Out > 0) _safeTransfer(_token1, to, amount1Out); // transférer les jetons de manière optimiste
```

Ce transfert est optimiste, car nous transférons avant d'être sûrs que toutes les conditions sont remplies. C'est acceptable dans Ethereum car si les conditions ne sont pas remplies plus tard dans l'appel, nous l'annulons ainsi que toutes les modifications qu'il a créées.

```solidity
            if (data.length > 0) IUniswapV2Callee(to).uniswapV2Call(msg.sender, amount0Out, amount1Out, data);
```

Informer le destinataire de l'échange si demandé.

```solidity
            balance0 = IERC20(_token0).balanceOf(address(this));
            balance1 = IERC20(_token1).balanceOf(address(this));
        }
```

Obtenir les soldes actuels. Le contrat périphérique nous envoie les jetons avant de nous appeler pour l'échange. Cela permet au contrat de vérifier facilement qu'il n'est pas trompé, une vérification qui _doit_ avoir lieu dans le contrat principal (car nous pouvons être appelés par d'autres entités que notre contrat périphérique).

```solidity
        uint amount0In = balance0 > _reserve0 - amount0Out ? balance0 - (_reserve0 - amount0Out) : 0;
        uint amount1In = balance1 > _reserve1 - amount1Out ? balance1 - (_reserve1 - amount1Out) : 0;
        require(amount0In > 0 || amount1In > 0, 'UniswapV2: INSUFFICIENT_INPUT_AMOUNT');
        { // portée pour reserve{0,1}Adjusted, évite les erreurs de pile trop profonde
            uint balance0Adjusted = balance0.mul(1000).sub(amount0In.mul(3));
            uint balance1Adjusted = balance1.mul(1000).sub(amount1In.mul(3));
            require(balance0Adjusted.mul(balance1Adjusted) >= uint(_reserve0).mul(_reserve1).mul(1000**2), 'UniswapV2: K');
```

C'est une vérification de cohérence pour s'assurer que nous ne perdons pas lors de l'échange. Il n'y a aucune circonstance dans laquelle un échange devrait réduire `reserve0*reserve1`. C'est également ici que nous nous assurons qu'une commission de 0,3 % est envoyée sur l'échange ; avant de vérifier la cohérence de la valeur de K, nous multiplions les deux soldes par 1000 soustrait des montants multipliés par 3, cela signifie que 0,3 % (3/1000 = 0,003 = 0,3 %) est déduit du solde avant de comparer sa valeur K avec la valeur K des réserves actuelles.

```solidity
        }

        _update(balance0, balance1, _reserve0, _reserve1);
        emit Swap(msg.sender, amount0In, amount1In, amount0Out, amount1Out, to);
    }
```

Mettre à jour `reserve0` et `reserve1`, et si nécessaire les accumulateurs de prix et l'horodatage, et émettre un événement.

##### Sync ou Skim {#add-liquidity}

Il est possible que les soldes réels se désynchronisent des réserves que l'échange de paires pense avoir.
Il n'y a aucun moyen de retirer des jetons sans le consentement du contrat, mais les dépôts sont une autre affaire. Un compte peut transférer des jetons à l'échange sans appeler ni `mint` ni `swap`.

Dans ce cas, il y a deux solutions :

- `sync`, mettre à jour les réserves avec les soldes actuels
- `skim`, retirer le montant supplémentaire. Notez que n'importe quel compte est autorisé à appeler `skim` car nous ne savons pas qui a déposé les jetons. Cette information est émise dans un événement, mais les événements ne sont pas accessibles depuis la chaîne de blocs.

```solidity
    // forcer les soldes à correspondre aux réserves
    function skim(address to) external lock {
        address _token0 = token0; // économies de gaz
        address _token1 = token1; // économies de gaz
        _safeTransfer(_token0, to, IERC20(_token0).balanceOf(address(this)).sub(reserve0));
        _safeTransfer(_token1, to, IERC20(_token1).balanceOf(address(this)).sub(reserve1));
    }



    // forcer les réserves à correspondre aux soldes
    function sync() external lock {
        _update(IERC20(token0).balanceOf(address(this)), IERC20(token1).balanceOf(address(this)), reserve0, reserve1);
    }
}
```

### UniswapV2Factory.sol {#remove-liquidity}

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
L'adresse `feeTo` accumule les jetons de liquidité pour les frais de protocole, et `feeToSetter` est l'adresse autorisée à changer `feeTo` pour une adresse différente.

```solidity
    mapping(address => mapping(address => address)) public getPair;
    address[] public allPairs;
```

Ces variables gardent une trace des paires, les échanges entre deux types de jetons.

La première, `getPair`, est un mapping qui identifie un contrat d'échange de paires en fonction des deux jetons ERC-20 qu'il échange. Les jetons ERC-20 sont identifiés par les adresses des contrats qui les implémentent, donc les clés et la valeur sont toutes des adresses. Pour obtenir l'adresse de l'échange de paires qui vous permet de convertir de `tokenA` à `tokenB`, vous utilisez `getPair[<tokenA address>][<tokenB address>]` (ou l'inverse).

La deuxième variable, `allPairs`, est un tableau qui inclut toutes les adresses des échanges de paires créés par cette usine. Dans Ethereum, vous ne pouvez pas itérer sur le contenu d'un mapping, ni obtenir une liste de toutes les clés, donc cette variable est le seul moyen de savoir quels échanges cette usine gère.

Remarque : La raison pour laquelle vous ne pouvez pas itérer sur toutes les clés d'un mapping est que le stockage des données du contrat est _coûteux_, donc moins nous en utilisons, mieux c'est, et moins souvent nous le modifions,
mieux c'est. Vous pouvez créer des [mappings qui prennent en charge l'itération](https://github.com/ethereum/dapp-bin/blob/master/library/iterable_mapping.sol), mais ils nécessitent un stockage supplémentaire pour une liste de clés. Dans la plupart des applications, vous n'en avez pas besoin.

```solidity
    event PairCreated(address indexed token0, address indexed token1, address pair, uint);
```

Cet événement est émis lorsqu'un nouvel échange de paires est créé. Il inclut les adresses des jetons, l'adresse de l'échange de paires et le nombre total d'échanges gérés par l'usine.

```solidity
    constructor(address _feeToSetter) public {
        feeToSetter = _feeToSetter;
    }
```

La seule chose que fait le constructeur est de spécifier le `feeToSetter`. Les usines démarrent sans frais, et seul `feeSetter` peut changer cela.

```solidity
    function allPairsLength() external view returns (uint) {
        return allPairs.length;
    }
```

Cette fonction retourne le nombre de paires d'échange.

```solidity
    function createPair(address tokenA, address tokenB) external returns (address pair) {
```

C'est la fonction principale de l'usine, pour créer un échange de paires entre deux jetons ERC-20. Notez que n'importe qui peut appeler cette fonction. Vous n'avez pas besoin de la permission d'Uniswap pour créer un nouvel échange de paires.

```solidity
        require(tokenA != tokenB, 'UniswapV2: IDENTICAL_ADDRESSES');
        (address token0, address token1) = tokenA < tokenB ? (tokenA, tokenB) : (tokenB, tokenA);
```

Nous voulons que l'adresse du nouvel échange soit déterministe, afin qu'elle puisse être calculée à l'avance hors chaîne (cela peut être utile pour les [transactions de couche 2 (l2)](/developers/docs/scaling/)).
Pour ce faire, nous devons avoir un ordre cohérent des adresses de jetons, quel que soit l'ordre dans lequel nous les avons reçues, nous les trions donc ici.

```solidity
        require(token0 != address(0), 'UniswapV2: ZERO_ADDRESS');
        require(getPair[token0][token1] == address(0), 'UniswapV2: PAIR_EXISTS'); // une seule vérification est suffisante
```

Les grandes réserves de liquidité sont meilleures que les petites, car elles ont des prix plus stables. Nous ne voulons pas avoir plus d'une seule réserve de liquidité par paire de jetons. S'il y a déjà un échange, il n'est pas nécessaire d'en créer un autre pour la même paire.

```solidity
        bytes memory bytecode = type(UniswapV2Pair).creationCode;
```

Pour créer un nouveau contrat, nous avons besoin du code qui le crée (à la fois la fonction constructeur et le code qui écrit en mémoire le bytecode EVM du contrat réel). Normalement, dans Solidity, nous utilisons simplement `addr = new <name of contract>(<constructor parameters>)` et le compilateur s'occupe de tout pour nous, mais pour avoir une adresse de contrat déterministe, nous devons utiliser [le code d'opération CREATE2](https://eips.ethereum.org/EIPS/eip-1014).
Lorsque ce code a été écrit, ce code d'opération n'était pas encore pris en charge par Solidity, il était donc nécessaire d'obtenir manuellement le code. Ce n'est plus un problème, car [Solidity prend désormais en charge CREATE2](https://docs.soliditylang.org/en/v0.8.3/control-structures.html#salted-contract-creations-create2).

```solidity
        bytes32 salt = keccak256(abi.encodePacked(token0, token1));
        assembly {
            pair := create2(0, add(bytecode, 32), mload(bytecode), salt)
        }
```

Lorsqu'un code d'opération n'est pas encore pris en charge par Solidity, nous pouvons l'appeler en utilisant [l'assembleur en ligne (inline assembly)](https://docs.soliditylang.org/en/v0.8.3/assembly.html).

```solidity
        IUniswapV2Pair(pair).initialize(token0, token1);
```

Appeler la fonction `initialize` pour indiquer au nouvel échange quels sont les deux jetons qu'il échange.

```solidity
        getPair[token0][token1] = pair;
        getPair[token1][token0] = pair; // remplir le mapping dans le sens inverse
        allPairs.push(pair);
        emit PairCreated(token0, token1, pair, allPairs.length);
    }
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

Ces deux fonctions permettent à `feeSetter` de contrôler le destinataire des frais (le cas échéant), et de changer `feeSetter` pour une nouvelle adresse.

### UniswapV2ERC20.sol {#trade}

[Ce contrat](https://github.com/Uniswap/uniswap-v2-core/blob/master/contracts/UniswapV2ERC20.sol) implémente le jeton de liquidité ERC-20. Il est similaire au [contrat ERC-20 d'OpenZeppelin](/developers/tutorials/erc20-annotated-code), je n'expliquerai donc que la partie qui est différente, la fonctionnalité `permit`.

Les transactions sur Ethereum coûtent de l'ether (ETH), ce qui équivaut à de l'argent réel. Si vous avez des jetons ERC-20 mais pas d'ETH, vous ne pouvez pas envoyer de transactions, vous ne pouvez donc rien faire avec. Une solution pour éviter ce problème est les [méta-transactions](https://docs.uniswap.org/contracts/v2/guides/smart-contract-integration/supporting-meta-transactions).
Le propriétaire des jetons signe une transaction qui permet à quelqu'un d'autre de retirer des jetons hors chaîne et l'envoie via Internet au destinataire. Le destinataire, qui possède de l'ETH, soumet ensuite le permis au nom du propriétaire.

```solidity
    bytes32 public DOMAIN_SEPARATOR;
    // keccak256("Permit(address owner,address spender,uint256 value,uint256 nonce,uint256 deadline)");
    bytes32 public constant PERMIT_TYPEHASH = 0x6e71edae12b1b97f4d1f60370fef10105fa2faae0126114a169c64845d6126c9;
```

Ce hash est [l'identifiant du type de transaction](https://eips.ethereum.org/EIPS/eip-712#rationale-for-typehash). Le seul que nous prenons en charge ici est `Permit` avec ces paramètres.

```solidity
    mapping(address => uint) public nonces;
```

Il n'est pas possible pour un destinataire de falsifier une signature numérique. Cependant, il est trivial d'envoyer la même transaction deux fois (c'est une forme [d'attaque par rejeu](https://wikipedia.org/wiki/Replay_attack)). Pour éviter cela, nous utilisons un [nonce](https://wikipedia.org/wiki/Cryptographic_nonce). Si le nonce d'un nouveau `Permit` n'est pas supérieur de un au dernier utilisé, nous supposons qu'il est invalide.

```solidity
    constructor() public {
        uint chainId;
        assembly {
            chainId := chainid
        }
```

C'est le code pour récupérer [l'identifiant de la chaîne](https://chainid.network/). Il utilise un dialecte d'assembleur EVM appelé [Yul](https://docs.soliditylang.org/en/v0.8.4/yul.html). Notez que dans la version actuelle de Yul, vous devez utiliser `chainid()`, et non `chainid`.

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

Calculer le [séparateur de domaine](https://eips.ethereum.org/EIPS/eip-712#rationale-for-domainseparator) pour l'EIP-712.

```solidity
    function permit(address owner, address spender, uint value, uint deadline, uint8 v, bytes32 r, bytes32 s) external {
```

C'est la fonction qui implémente les permissions. Elle reçoit en paramètres les champs pertinents, et les trois valeurs scalaires pour [la signature](https://yos.io/2018/11/16/ethereum-signatures/) (v, r et s).

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

`abi.encodePacked(...)` est le message que nous nous attendons à recevoir. Nous savons quel devrait être le nonce, il n'est donc pas nécessaire de l'obtenir en tant que paramètre.

L'algorithme de signature d'Ethereum s'attend à recevoir 256 bits à signer, nous utilisons donc la fonction de hachage `keccak256`.

```solidity
        address recoveredAddress = ecrecover(digest, v, r, s);
```

À partir du condensé (digest) et de la signature, nous pouvons obtenir l'adresse qui l'a signé en utilisant [ecrecover](https://coders-errand.com/ecrecover-signature-verification-ethereum/).

```solidity
        require(recoveredAddress != address(0) && recoveredAddress == owner, 'UniswapV2: INVALID_SIGNATURE');
        _approve(owner, spender, value);
    }

```

Si tout est correct, traiter cela comme [un approuver (approve) ERC-20](https://eips.ethereum.org/EIPS/eip-20#approve).

## Les contrats périphériques {#uniswapv2migrator}

Les contrats périphériques constituent l'API (interface de programmation d'application) d'Uniswap. Ils sont disponibles pour des appels externes, que ce soit depuis d'autres contrats ou des applications décentralisées. Vous pourriez appeler les contrats principaux directement, mais c'est plus compliqué et vous pourriez perdre de la valeur si vous faites une erreur. Les contrats principaux ne contiennent que des tests pour s'assurer qu'ils ne sont pas trompés, et non des vérifications de cohérence pour qui que ce soit d'autre. Celles-ci se trouvent dans la périphérie afin de pouvoir être mises à jour selon les besoins.

### UniswapV2Router01.sol {#libraries}

[Ce contrat](https://github.com/Uniswap/uniswap-v2-periphery/blob/master/contracts/UniswapV2Router01.sol) présente des problèmes et [ne devrait plus être utilisé](https://docs.uniswap.org/contracts/v2/reference/smart-contracts/router-01). Heureusement, les contrats périphériques sont sans état et ne détiennent aucun actif, il est donc facile de le déprécier et de suggérer aux gens d'utiliser son remplaçant, `UniswapV2Router02`, à la place.

### UniswapV2Router02.sol {#math}

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

La plupart d'entre eux ont déjà été rencontrés ou sont assez évidents. La seule exception est `IWETH.sol`. Uniswap v2 permet des échanges pour n'importe quelle paire de jetons ERC-20, mais l'ether (ETH) lui-même n'est pas un jeton ERC-20. Il est antérieur à la norme et est transféré par des mécanismes uniques. Pour permettre l'utilisation de l'ETH dans les contrats qui s'appliquent aux jetons ERC-20, on a créé le contrat d'[ether enveloppé (WETH)](https://weth.tkn.eth.limo/). Vous envoyez de l'ETH à ce contrat, et il vous frappe un montant équivalent de WETH. Ou vous pouvez brûler du WETH et récupérer de l'ETH.

```solidity
contract UniswapV2Router02 is IUniswapV2Router02 {
    using SafeMath for uint;

    address public immutable override factory;
    address public immutable override WETH;
```

Le routeur a besoin de savoir quelle usine utiliser, et pour les transactions qui nécessitent du WETH, quel contrat WETH utiliser. Ces valeurs sont [immuables](https://docs.soliditylang.org/en/v0.8.3/contracts.html#constant-and-immutable-state-variables), ce qui signifie qu'elles ne peuvent être définies que dans le constructeur. Cela donne aux utilisateurs l'assurance que personne ne pourra les modifier pour pointer vers des contrats moins honnêtes.

```solidity
    modifier ensure(uint deadline) {
        require(deadline >= block.timestamp, 'UniswapV2Router: EXPIRED');
        _;
    }
```

Ce modificateur s'assure que les transactions limitées dans le temps (« faire X avant le temps Y si possible ») ne se produisent pas après leur limite de temps.

```solidity
    constructor(address _factory, address _WETH) public {
        factory = _factory;
        WETH = _WETH;
    }
```

Le constructeur se contente de définir les variables d'état immuables.

```solidity
    receive() external payable {
        assert(msg.sender == WETH); // n'accepter de l'ETH via fallback que depuis le contrat WETH
    }
```

Cette fonction est appelée lorsque nous rachetons des jetons du contrat WETH pour les reconvertir en ETH. Seul le contrat WETH que nous utilisons est autorisé à le faire.

#### Ajouter de la liquidité {#fixedpoint}

Ces fonctions ajoutent des jetons à l'échange de paires, ce qui augmente la réserve de liquidité.

```solidity

    // **** AJOUTER DE LA LIQUIDITÉ ****
    function _addLiquidity(
```

Cette fonction est utilisée pour calculer le montant de jetons A et B qui doit être déposé dans l'échange de paires.

```solidity
        address tokenA,
        address tokenB,
```

Ce sont les adresses des contrats de jetons ERC-20.

```solidity
        uint amountADesired,
        uint amountBDesired,
```

Ce sont les montants que le fournisseur de liquidité souhaite déposer. Ce sont également les montants maximums de A et B à déposer.

```solidity
        uint amountAMin,
        uint amountBMin
```

Ce sont les montants minimums acceptables à déposer. Si la transaction ne peut pas avoir lieu avec ces montants ou plus, il faut l'annuler. Si vous ne voulez pas de cette fonctionnalité, spécifiez simplement zéro.

Les fournisseurs de liquidité spécifient généralement un minimum, car ils veulent limiter la transaction à un taux de change proche du taux actuel. Si le taux de change fluctue trop, cela pourrait signifier que des nouvelles modifient les valeurs sous-jacentes, et ils veulent décider manuellement de ce qu'il faut faire.

Par exemple, imaginez un cas où le taux de change est de un pour un et où le fournisseur de liquidité spécifie ces valeurs :

| Paramètre      | Valeur |
| -------------- | ----: |
| amountADesired |  1000 |
| amountBDesired |  1000 |
| amountAMin     |   900 |
| amountBMin     |   800 |

Tant que le taux de change reste entre 0,9 et 1,25, la transaction a lieu. Si le taux de change sort de cette fourchette, la transaction est annulée.

La raison de cette précaution est que les transactions ne sont pas immédiates, vous les soumettez et finalement un validateur va les inclure dans un bloc (à moins que votre prix du gaz ne soit très bas, auquel cas vous devrez soumettre une autre transaction avec le même nonce et un prix du gaz plus élevé pour l'écraser). Vous ne pouvez pas contrôler ce qui se passe pendant l'intervalle entre la soumission et l'inclusion.

```solidity
    ) internal virtual returns (uint amountA, uint amountB) {
```

La fonction renvoie les montants que le fournisseur de liquidité devrait déposer pour avoir un ratio égal au ratio actuel entre les réserves.

```solidity
        // créer la paire si elle n'existe pas encore
        if (IUniswapV2Factory(factory).getPair(tokenA, tokenB) == address(0)) {
            IUniswapV2Factory(factory).createPair(tokenA, tokenB);
        }
```

S'il n'y a pas encore d'échange pour cette paire de jetons, créez-le.

```solidity
        (uint reserveA, uint reserveB) = UniswapV2Library.getReserves(factory, tokenA, tokenB);
```

Obtenir les réserves actuelles dans la paire.

```solidity
        if (reserveA == 0 && reserveB == 0) {
            (amountA, amountB) = (amountADesired, amountBDesired);
```

Si les réserves actuelles sont vides, il s'agit d'un nouvel échange de paires. Les montants à déposer doivent être exactement les mêmes que ceux que le fournisseur de liquidité souhaite fournir.

```solidity
        } else {
            uint amountBOptimal = UniswapV2Library.quote(amountADesired, reserveA, reserveB);
```

Si nous avons besoin de voir quels seront les montants, nous obtenons le montant optimal en utilisant [cette fonction](https://github.com/Uniswap/uniswap-v2-periphery/blob/master/contracts/libraries/UniswapV2Library.sol#L35). Nous voulons le même ratio que les réserves actuelles.

```solidity
            if (amountBOptimal <= amountBDesired) {
                require(amountBOptimal >= amountBMin, 'UniswapV2Router: INSUFFICIENT_B_AMOUNT');
                (amountA, amountB) = (amountADesired, amountBOptimal);
```

Si `amountBOptimal` est inférieur au montant que le fournisseur de liquidité souhaite déposer, cela signifie que le jeton B a actuellement plus de valeur que ne le pense le déposant de liquidité, un montant inférieur est donc requis.

```solidity
            } else {
                uint amountAOptimal = UniswapV2Library.quote(amountBDesired, reserveB, reserveA);
                assert(amountAOptimal <= amountADesired);
                require(amountAOptimal >= amountAMin, 'UniswapV2Router: INSUFFICIENT_A_AMOUNT');
                (amountA, amountB) = (amountAOptimal, amountBDesired);
```

Si le montant optimal de B est supérieur au montant souhaité de B, cela signifie que les jetons B ont actuellement moins de valeur que ne le pense le déposant de liquidité, un montant plus élevé est donc requis. Cependant, le montant souhaité est un maximum, nous ne pouvons donc pas faire cela. À la place, nous calculons le nombre optimal de jetons A pour le montant souhaité de jetons B.

En rassemblant tout cela, nous obtenons ce graphique. Supposons que vous essayiez de déposer mille jetons A (ligne bleue) et mille jetons B (ligne rouge). L'axe des x est le taux de change, A/B. Si x=1, ils ont une valeur égale et vous déposez mille de chaque. Si x=2, A vaut le double de B (vous obtenez deux jetons B pour chaque jeton A), vous déposez donc mille jetons B, mais seulement 500 jetons A. Si x=0,5, la situation est inversée, mille jetons A et cinq cents jetons B.

![Graph](liquidityProviderDeposit.png)

Vous pourriez déposer de la liquidité directement dans le contrat principal (en utilisant [UniswapV2Pair::mint](https://github.com/Uniswap/uniswap-v2-core/blob/master/contracts/UniswapV2Pair.sol#L110)), mais le contrat principal vérifie seulement qu'il n'est pas lui-même trompé, vous courez donc le risque de perdre de la valeur si le taux de change change entre le moment où vous soumettez votre transaction et le moment où elle est exécutée. Si vous utilisez le contrat périphérique, il calcule le montant que vous devriez déposer et le dépose immédiatement, de sorte que le taux de change ne change pas et que vous ne perdez rien.

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

Cette fonction peut être appelée par une transaction pour déposer de la liquidité. La plupart des paramètres sont les mêmes que dans `_addLiquidity` ci-dessus, à deux exceptions près :

. `to` est l'adresse qui reçoit les nouveaux jetons de liquidité frappés pour montrer la part du fournisseur de liquidité dans la réserve
. `deadline` est une limite de temps pour la transaction

```solidity
    ) external virtual override ensure(deadline) returns (uint amountA, uint amountB, uint liquidity) {
        (amountA, amountB) = _addLiquidity(tokenA, tokenB, amountADesired, amountBDesired, amountAMin, amountBMin);
        address pair = UniswapV2Library.pairFor(factory, tokenA, tokenB);
```

Nous calculons les montants à déposer réellement, puis nous trouvons l'adresse de la réserve de liquidité. Pour économiser du gaz, nous ne le faisons pas en demandant à l'usine, mais en utilisant la fonction de bibliothèque `pairFor` (voir ci-dessous dans les bibliothèques)

```solidity
        TransferHelper.safeTransferFrom(tokenA, msg.sender, pair, amountA);
        TransferHelper.safeTransferFrom(tokenB, msg.sender, pair, amountB);
```

Transférer les montants corrects de jetons de l'utilisateur vers l'échange de paires.

```solidity
        liquidity = IUniswapV2Pair(pair).mint(to);
    }
```

En retour, donner à l'adresse `to` des jetons de liquidité pour la propriété partielle de la réserve. La fonction `mint` du contrat principal voit combien de jetons supplémentaires il possède (par rapport à ce qu'il avait la dernière fois que la liquidité a changé) et frappe de la liquidité en conséquence.

```solidity
    function addLiquidityETH(
        address token,
        uint amountTokenDesired,
```

Lorsqu'un fournisseur de liquidité souhaite fournir de la liquidité à un échange de paires Jeton/ETH, il y a quelques différences. Le contrat se charge d'envelopper l'ETH pour le fournisseur de liquidité. Il n'est pas nécessaire de spécifier combien d'ETH l'utilisateur souhaite déposer, car l'utilisateur les envoie simplement avec la transaction (le montant est disponible dans `msg.value`).

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

Pour déposer l'ETH, le contrat l'enveloppe d'abord en WETH, puis transfère le WETH dans la paire. Remarquez que le transfert est enveloppé dans un `assert`. Cela signifie que si le transfert échoue, cet appel de contrat échoue également, et par conséquent l'enveloppement ne se produit pas vraiment.

```solidity
        liquidity = IUniswapV2Pair(pair).mint(to);
        // rembourser la poussière d'ether, le cas échéant
        if (msg.value > amountETH) TransferHelper.safeTransferETH(msg.sender, msg.value - amountETH);
    }
```

L'utilisateur nous a déjà envoyé l'ETH, donc s'il en reste un excédent (parce que l'autre jeton a moins de valeur que ce que l'utilisateur pensait), nous devons émettre un remboursement.

#### Retirer de la liquidité {#uniswapv2library}

Ces fonctions retireront de la liquidité et rembourseront le fournisseur de liquidité.

```solidity
    // **** RETIRER DE LA LIQUIDITÉ ****
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

Le cas le plus simple de retrait de liquidité. Il y a un montant minimum de chaque jeton que le fournisseur de liquidité accepte de recevoir, et cela doit se produire avant la date limite.

```solidity
        address pair = UniswapV2Library.pairFor(factory, tokenA, tokenB);
        IUniswapV2Pair(pair).transferFrom(msg.sender, pair, liquidity); // envoyer la liquidité à la paire
        (uint amount0, uint amount1) = IUniswapV2Pair(pair).burn(to);
```

La fonction `burn` du contrat principal se charge de rembourser les jetons à l'utilisateur.

```solidity
        (address token0,) = UniswapV2Library.sortTokens(tokenA, tokenB);
```

Lorsqu'une fonction renvoie plusieurs valeurs, mais que nous ne sommes intéressés que par certaines d'entre elles, c'est ainsi que nous n'obtenons que ces valeurs. C'est un peu moins cher en termes de gaz que de lire une valeur et de ne jamais l'utiliser.

```solidity
        (amountA, amountB) = tokenA == token0 ? (amount0, amount1) : (amount1, amount0);
```

Traduire les montants de la façon dont le contrat principal les renvoie (le jeton avec l'adresse la plus basse en premier) à la façon dont l'utilisateur les attend (correspondant à `tokenA` et `tokenB`).

```solidity
        require(amountA >= amountAMin, 'UniswapV2Router: INSUFFICIENT_A_AMOUNT');
        require(amountB >= amountBMin, 'UniswapV2Router: INSUFFICIENT_B_AMOUNT');
    }
```

Il est acceptable de faire le transfert d'abord, puis de vérifier s'il est légitime, car s'il ne l'est pas, nous annulerons tous les changements d'état.

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

Le retrait de liquidité pour l'ETH est presque le même, sauf que nous recevons les jetons WETH puis les rachetons contre de l'ETH pour les rendre au fournisseur de liquidité.

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

Ces fonctions relaient des méta-transactions pour permettre aux utilisateurs sans ether de se retirer de la réserve, en utilisant [le mécanisme de permis (permit)](#uniswapv2erc20).

```solidity

    // **** RETIRER DE LA LIQUIDITÉ (prenant en charge les jetons avec frais lors du transfert) ****
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

Cette fonction peut être utilisée pour les jetons qui ont des frais de transfert ou de stockage. Lorsqu'un jeton a de tels frais, nous ne pouvons pas compter sur la fonction `removeLiquidity` pour nous dire quelle quantité du jeton nous récupérons, nous devons donc d'abord retirer puis obtenir le solde.

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

#### Échanger {#transfer-helper}

```solidity
    // **** ÉCHANGE ****
    // exige que le montant initial ait déjà été envoyé à la première paire
    function _swap(uint[] memory amounts, address[] memory path, address _to) internal virtual {
```

Cette fonction effectue le traitement interne requis pour les fonctions qui sont exposées aux traders.

```solidity
        for (uint i; i < path.length - 1; i++) {
```

Au moment où j'écris ces lignes, il y a [388 160 jetons ERC-20](https://eth.blockscout.com/tokens). S'il y avait un échange de paires pour chaque paire de jetons, cela représenterait plus de 150 milliards d'échanges de paires. La chaîne entière, pour le moment, [ne compte que 0,1 % de ce nombre de comptes](https://eth.blockscout.com/stats/accountsGrowth). Au lieu de cela, les fonctions d'échange prennent en charge le concept de chemin (path). Un trader peut échanger A contre B, B contre C, et C contre D, il n'y a donc pas besoin d'un échange direct de la paire A-D.

Les prix sur ces marchés ont tendance à être synchronisés, car lorsqu'ils sont désynchronisés, cela crée une opportunité d'arbitrage. Imaginez, par exemple, trois jetons, A, B et C. Il y a trois échanges de paires, un pour chaque paire.

1. La situation initiale
2. Un trader vend 24,695 jetons A et obtient 25,305 jetons B.
3. Le trader vend 24,695 jetons B pour 25,305 jetons C, conservant environ 0,61 jeton B comme profit.
4. Ensuite, le trader vend 24,695 jetons C pour 25,305 jetons A, conservant environ 0,61 jeton C comme profit. Le trader a également 0,61 jeton A supplémentaire (les 25,305 avec lesquels le trader se retrouve, moins l'investissement initial de 24,695).

| Étape | Échange A-B                | Échange B-C                | Échange A-C                |
| ---- | --------------------------- | --------------------------- | --------------------------- |
| 1    | A:1000 B:1050 A/B=1.05      | B:1000 C:1050 B/C=1.05      | A:1050 C:1000 C/A=1.05      |
| 2    | A:1024.695 B:1024.695 A/B=1 | B:1000 C:1050 B/C=1.05      | A:1050 C:1000 C/A=1.05      |
| 3    | A:1024.695 B:1024.695 A/B=1 | B:1024.695 C:1024.695 B/C=1 | A:1050 C:1000 C/A=1.05      |
| 4    | A:1024.695 B:1024.695 A/B=1 | B:1024.695 C:1024.695 B/C=1 | A:1024.695 C:1024.695 C/A=1 |

```solidity
            (address input, address output) = (path[i], path[i + 1]);
            (address token0,) = UniswapV2Library.sortTokens(input, output);
            uint amountOut = amounts[i + 1];
```

Obtenir la paire que nous traitons actuellement, la trier (pour l'utiliser avec la paire) et obtenir le montant de sortie attendu.

```solidity
            (uint amount0Out, uint amount1Out) = input == token0 ? (uint(0), amountOut) : (amountOut, uint(0));
```

Obtenir les montants de sortie attendus, triés de la façon dont l'échange de paires s'attend à ce qu'ils soient.

```solidity
            address to = i < path.length - 2 ? UniswapV2Library.pairFor(factory, output, path[i + 2]) : _to;
```

Est-ce le dernier échange ? Si oui, envoyer les jetons reçus pour la transaction à la destination. Sinon, les envoyer au prochain échange de paires.

```solidity

            IUniswapV2Pair(UniswapV2Library.pairFor(factory, input, output)).swap(
                amount0Out, amount1Out, to, new bytes(0)
            );
        }
    }
```

Appeler réellement l'échange de paires pour échanger les jetons. Nous n'avons pas besoin d'un rappel (callback) pour être informés de l'échange, nous n'envoyons donc aucun octet dans ce champ.

```solidity
    function swapExactTokensForTokens(
```

Cette fonction est utilisée directement par les traders pour échanger un jeton contre un autre.

```solidity
        uint amountIn,
        uint amountOutMin,
        address[] calldata path,
```

Ce paramètre contient les adresses des contrats ERC-20. Comme expliqué ci-dessus, il s'agit d'un tableau car vous pourriez avoir besoin de passer par plusieurs échanges de paires pour passer de l'actif que vous avez à l'actif que vous voulez.

Un paramètre de fonction dans Solidity peut être stocké soit dans `memory` soit dans les `calldata`. Si la fonction est un point d'entrée du contrat, appelée directement par un utilisateur (à l'aide d'une transaction) ou par un contrat différent, alors la valeur du paramètre peut être prise directement à partir des données d'appel. Si la fonction est appelée en interne, comme `_swap` ci-dessus, alors les paramètres doivent être stockés dans `memory`. Du point de vue du contrat appelé, les `calldata` sont en lecture seule.

Avec des types scalaires tels que `uint` ou `address`, le compilateur gère le choix du stockage pour nous, mais avec les tableaux, qui sont plus longs et plus coûteux, nous spécifions le type de stockage à utiliser.

```solidity
        address to,
        uint deadline
    ) external virtual override ensure(deadline) returns (uint[] memory amounts) {
```

Les valeurs de retour sont toujours renvoyées en mémoire.

```solidity
        amounts = UniswapV2Library.getAmountsOut(factory, amountIn, path);
        require(amounts[amounts.length - 1] >= amountOutMin, 'UniswapV2Router: INSUFFICIENT_OUTPUT_AMOUNT');
```

Calculer le montant à acheter dans chaque échange. Si le résultat est inférieur au minimum que le trader est prêt à accepter, annuler la transaction.

```solidity
        TransferHelper.safeTransferFrom(
            path[0], msg.sender, UniswapV2Library.pairFor(factory, path[0], path[1]), amounts[0]
        );
        _swap(amounts, path, to);
    }
```

Enfin, transférer le jeton ERC-20 initial vers le compte pour le premier échange de paires et appeler `_swap`. Tout cela se passe dans la même transaction, de sorte que l'échange de paires sait que tout jeton inattendu fait partie de ce transfert.

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

La fonction précédente, `swapTokensForTokens`, permet à un trader de spécifier un nombre exact de jetons d'entrée qu'il est prêt à donner et le nombre minimum de jetons de sortie qu'il est prêt à recevoir en retour. Cette fonction effectue l'échange inverse, elle permet à un trader de spécifier le nombre de jetons de sortie qu'il souhaite, et le nombre maximum de jetons d'entrée qu'il est prêt à payer pour les obtenir.

Dans les deux cas, le trader doit d'abord donner à ce contrat périphérique une allocation pour lui permettre de les transférer.

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
        // rembourser la poussière d'ether, le cas échéant
        if (msg.value > amounts[0]) TransferHelper.safeTransferETH(msg.sender, msg.value - amounts[0]);
    }
```

Ces quatre variantes impliquent toutes des échanges entre l'ETH et des jetons. La seule différence est que soit nous recevons de l'ETH du trader et l'utilisons pour frapper du WETH, soit nous recevons du WETH du dernier échange dans le chemin et le brûlons, en renvoyant au trader l'ETH résultant.

```solidity
    // **** ÉCHANGE (prenant en charge les jetons avec frais lors du transfert) ****
    // exige que le montant initial ait déjà été envoyé à la première paire
    function _swapSupportingFeeOnTransferTokens(address[] memory path, address _to) internal virtual {
```

Il s'agit de la fonction interne pour échanger des jetons qui ont des frais de transfert ou de stockage afin de résoudre ([ce problème](https://github.com/Uniswap/uniswap-interface/issues/835)).

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

En raison des frais de transfert, nous ne pouvons pas compter sur la fonction `getAmountsOut` pour nous dire combien nous obtenons de chaque transfert (comme nous le faisons avant d'appeler la fonction originale `_swap`). À la place, nous devons d'abord transférer, puis voir combien de jetons nous avons récupérés.

Remarque : En théorie, nous pourrions simplement utiliser cette fonction au lieu de `_swap`, mais dans certains cas (par exemple, si le transfert finit par être annulé parce qu'il n'y a pas assez à la fin pour atteindre le minimum requis), cela finirait par coûter plus de gaz. Les jetons avec frais de transfert sont assez rares, donc bien que nous devions les prendre en compte, il n'est pas nécessaire que tous les échanges supposent qu'ils passent par au moins l'un d'entre eux.

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

Ces fonctions ne sont que des proxys qui appellent les [fonctions UniswapV2Library](#uniswapv2library).

### UniswapV2Migrator.sol {#conclusion}

Ce contrat a été utilisé pour migrer les échanges de l'ancienne v1 vers la v2. Maintenant qu'ils ont été migrés, il n'est plus pertinent.

## Les bibliothèques

La [bibliothèque SafeMath](https://docs.openzeppelin.com/contracts/2.x/api/math) est bien documentée, il n'est donc pas nécessaire de la documenter ici.

### Math

Cette bibliothèque contient des fonctions mathématiques qui ne sont normalement pas nécessaires dans le code Solidity, elles ne font donc pas partie du langage.

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

Commencez avec x comme une estimation supérieure à la racine carrée (c'est la raison pour laquelle nous devons traiter 1 à 3 comme des cas particuliers).

```solidity
            while (x < z) {
                z = x;
                x = (y / x + x) / 2;
```

Obtenez une estimation plus précise, la moyenne de l'estimation précédente et du nombre dont nous essayons de trouver la racine carrée divisé par l'estimation précédente. Répétez jusqu'à ce que la nouvelle estimation ne soit pas inférieure à l'existante. Pour plus de détails, [voir ici](https://wikipedia.org/wiki/Methods_of_computing_square_roots#Babylonian_method).

```solidity
            }
        } else if (y != 0) {
            z = 1;
```

Nous ne devrions jamais avoir besoin de la racine carrée de zéro. Les racines carrées de un, deux et trois valent environ un (nous utilisons des entiers, nous ignorons donc la fraction).

```solidity
        }
    }
}
```

### Fractions à virgule fixe (UQ112x112)

Cette bibliothèque gère les fractions, qui ne font normalement pas partie de l'arithmétique d'Ethereum. Elle le fait en encodant le nombre _x_ sous la forme _x\*2^112_. Cela nous permet d'utiliser les codes d'opération d'addition et de soustraction d'origine sans modification.

```solidity
pragma solidity =0.5.16;

// une bibliothèque pour manipuler les nombres binaires à virgule fixe (https://wikipedia.org/wiki/Q_(number_format))

// plage : [0, 2**112 - 1]
// résolution : 1 / 2**112

library UQ112x112 {
    uint224 constant Q112 = 2**112;
```

`Q112` est l'encodage pour un.

```solidity
    // encoder un uint112 en UQ112x112
    function encode(uint112 y) internal pure returns (uint224 z) {
        z = uint224(y) * Q112; // ne déborde jamais
    }
```

Puisque y est `uint112`, sa valeur maximale est 2^112-1. Ce nombre peut toujours être encodé comme un `UQ112x112`.

```solidity
    // diviser un UQ112x112 par un uint112, renvoyant un UQ112x112
    function uqdiv(uint224 x, uint112 y) internal pure returns (uint224 z) {
        z = x / uint224(y);
    }
}
```

Si nous divisons deux valeurs `UQ112x112`, le résultat n'est plus multiplié par 2^112. À la place, nous prenons donc un entier pour le dénominateur. Nous aurions dû utiliser une astuce similaire pour faire une multiplication, mais nous n'avons pas besoin de multiplier des valeurs `UQ112x112`.

### UniswapV2Library

Cette bibliothèque est utilisée uniquement par les contrats périphériques

```solidity
pragma solidity >=0.5.0;

import '@uniswap/v2-core/contracts/interfaces/IUniswapV2Pair.sol';

import "./SafeMath.sol";

library UniswapV2Library {
    using SafeMath for uint;

    // renvoie les adresses de jetons triées, utilisé pour gérer les valeurs de retour des paires triées dans cet ordre
    function sortTokens(address tokenA, address tokenB) internal pure returns (address token0, address token1) {
        require(tokenA != tokenB, 'UniswapV2Library: IDENTICAL_ADDRESSES');
        (token0, token1) = tokenA < tokenB ? (tokenA, tokenB) : (tokenB, tokenA);
        require(token0 != address(0), 'UniswapV2Library: ZERO_ADDRESS');
    }
```

Triez les deux jetons par adresse, afin que nous puissions obtenir l'adresse de l'échange de la paire pour eux. C'est nécessaire car sinon nous aurions deux possibilités, une pour les paramètres A,B et une autre pour les paramètres B,A, ce qui conduirait à deux échanges au lieu d'un.

```solidity
    // calcule l'adresse CREATE2 pour une paire sans faire d'appels externes
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

Cette fonction calcule l'adresse de l'échange de la paire pour les deux jetons. Ce contrat est créé en utilisant [le code d'opération CREATE2](https://eips.ethereum.org/EIPS/eip-1014), nous pouvons donc calculer l'adresse en utilisant le même algorithme si nous connaissons les paramètres qu'il utilise. C'est beaucoup moins cher que de demander à la factory, et

```solidity
    // récupère et trie les réserves pour une paire
    function getReserves(address factory, address tokenA, address tokenB) internal view returns (uint reserveA, uint reserveB) {
        (address token0,) = sortTokens(tokenA, tokenB);
        (uint reserve0, uint reserve1,) = IUniswapV2Pair(pairFor(factory, tokenA, tokenB)).getReserves();
        (reserveA, reserveB) = tokenA == token0 ? (reserve0, reserve1) : (reserve1, reserve0);
    }
```

Cette fonction renvoie les réserves des deux jetons que possède l'échange de la paire. Notez qu'elle peut recevoir les jetons dans n'importe quel ordre et les trie pour un usage interne.

```solidity
    // étant donné un certain montant d'un actif et les réserves de la paire, renvoie un montant équivalent de l'autre actif
    function quote(uint amountA, uint reserveA, uint reserveB) internal pure returns (uint amountB) {
        require(amountA > 0, 'UniswapV2Library: INSUFFICIENT_AMOUNT');
        require(reserveA > 0 && reserveB > 0, 'UniswapV2Library: INSUFFICIENT_LIQUIDITY');
        amountB = amountA.mul(reserveB) / reserveA;
    }
```

Cette fonction vous donne la quantité de jeton B que vous obtiendrez en échange du jeton A s'il n'y a pas de frais impliqués. Ce calcul prend en compte le fait que le transfert modifie le taux de change.

```solidity
    // étant donné un montant d'entrée d'un actif et les réserves de la paire, renvoie le montant de sortie maximum de l'autre actif
    function getAmountOut(uint amountIn, uint reserveIn, uint reserveOut) internal pure returns (uint amountOut) {
```

La fonction `quote` ci-dessus fonctionne très bien s'il n'y a pas de frais pour utiliser l'échange de la paire. Cependant, s'il y a des frais d'échange de 0,3 %, le montant que vous obtenez réellement est inférieur. Cette fonction calcule le montant après les frais d'échange.

```solidity

        require(amountIn > 0, 'UniswapV2Library: INSUFFICIENT_INPUT_AMOUNT');
        require(reserveIn > 0 && reserveOut > 0, 'UniswapV2Library: INSUFFICIENT_LIQUIDITY');
        uint amountInWithFee = amountIn.mul(997);
        uint numerator = amountInWithFee.mul(reserveOut);
        uint denominator = reserveIn.mul(1000).add(amountInWithFee);
        amountOut = numerator / denominator;
    }
```

Solidity ne gère pas les fractions nativement, nous ne pouvons donc pas simplement multiplier le montant par 0,997. À la place, nous multiplions le numérateur par 997 et le dénominateur par 1000, obtenant ainsi le même effet.

```solidity
    // étant donné un montant de sortie d'un actif et les réserves de la paire, renvoie un montant d'entrée requis de l'autre actif
    function getAmountIn(uint amountOut, uint reserveIn, uint reserveOut) internal pure returns (uint amountIn) {
        require(amountOut > 0, 'UniswapV2Library: INSUFFICIENT_OUTPUT_AMOUNT');
        require(reserveIn > 0 && reserveOut > 0, 'UniswapV2Library: INSUFFICIENT_LIQUIDITY');
        uint numerator = reserveIn.mul(amountOut).mul(1000);
        uint denominator = reserveOut.sub(amountOut).mul(997);
        amountIn = (numerator / denominator).add(1);
    }
```

Cette fonction fait à peu près la même chose, mais elle obtient le montant de sortie et fournit l'entrée.

```solidity

    // effectue des calculs getAmountOut enchaînés sur n'importe quel nombre de paires
    function getAmountsOut(address factory, uint amountIn, address[] memory path) internal view returns (uint[] memory amounts) {
        require(path.length >= 2, 'UniswapV2Library: INVALID_PATH');
        amounts = new uint[](path.length);
        amounts[0] = amountIn;
        for (uint i; i < path.length - 1; i++) {
            (uint reserveIn, uint reserveOut) = getReserves(factory, path[i], path[i + 1]);
            amounts[i + 1] = getAmountOut(amounts[i], reserveIn, reserveOut);
        }
    }

    // effectue des calculs getAmountIn enchaînés sur n'importe quel nombre de paires
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

Ces deux fonctions gèrent l'identification des valeurs lorsqu'il est nécessaire de passer par plusieurs échanges de paires.

### Transfer Helper

[Cette bibliothèque](https://github.com/Uniswap/uniswap-lib/blob/master/contracts/libraries/TransferHelper.sol) ajoute des vérifications de succès autour des transferts ERC-20 et Ethereum pour traiter une annulation et un retour de valeur `false` de la même manière.

```solidity
// SPDX-License-Identifier: GPL-3.0-or-later

pragma solidity >=0.6.0;

// méthodes d'aide pour interagir avec les jetons ERC-20 et envoyer de l'ETH qui ne renvoient pas systématiquement true/false
library TransferHelper {
    function safeApprove(
        address token,
        address to,
        uint256 value
    ) internal {
        // bytes4(keccak256(bytes('approve(address,uint256)')));
        (bool success, bytes memory data) = token.call(abi.encodeWithSelector(0x095ea7b3, to, value));

```

Nous pouvons appeler un contrat différent de deux manières :

- Utiliser une définition d'interface pour créer un appel de fonction
- Utiliser l'[interface binaire de l'application (ABI)](https://docs.soliditylang.org/en/v0.8.3/abi-spec.html) « manuellement » pour créer l'appel. C'est ce que l'auteur du code a décidé de faire.

```solidity
        require(
            success && (data.length == 0 || abi.decode(data, (bool))),
            'TransferHelper::safeApprove: approve failed'
        );
    }
```

Par souci de rétrocompatibilité avec les jetons créés avant la norme ERC-20, un appel ERC-20 peut échouer soit en étant annulé (auquel cas `success` est `false`), soit en réussissant et en renvoyant une valeur `false` (auquel cas il y a des données de sortie, et si vous les décodez comme un booléen, vous obtenez `false`).

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

Cette fonction implémente [la fonctionnalité de transfert d'ERC-20](https://eips.ethereum.org/EIPS/eip-20#transfer), qui permet à un compte de dépenser l'allocation fournie par un autre compte.

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

Cette fonction implémente [la fonctionnalité transferFrom d'ERC-20](https://eips.ethereum.org/EIPS/eip-20#transferfrom), qui permet à un compte de dépenser l'allocation fournie par un autre compte.

```solidity

    function safeTransferETH(address to, uint256 value) internal {
        (bool success, ) = to.call{value: value}(new bytes(0));
        require(success, 'TransferHelper::safeTransferETH: ETH transfer failed');
    }
}
```

Cette fonction transfère de l'ether vers un compte. Tout appel à un contrat différent peut tenter d'envoyer de l'ether. Comme nous n'avons pas besoin d'appeler réellement une fonction, nous n'envoyons aucune donnée avec l'appel.

## Conclusion

Il s'agit d'un long article d'environ 50 pages. Si vous êtes arrivé jusqu'ici, félicitations ! J'espère que vous avez maintenant compris les enjeux liés à la création d'une application concrète (par opposition aux courts programmes d'exemple) et que vous êtes mieux préparé pour écrire des contrats pour vos propres cas d'utilisation.

Maintenant, allez créer quelque chose d'utile et impressionnez-nous.

[Consultez mes autres travaux ici](https://cryptodocguy.pro/).