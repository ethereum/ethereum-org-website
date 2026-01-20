---
title: "ABI courtes pour l'optimisation des données d'appel"
description: Optimisation des contrats intelligents pour les rollups optimistes
author: Ori Pomerantz
lang: fr
tags: [ "couche 2" ]
skill: intermediate
published: 01/04/2022
---

## Introduction {#introduction}

Dans cet article, vous en apprendrez plus sur les [rollups optimistes](/developers/docs/scaling/optimistic-rollups), le coût des transactions qui leur est appliqué et la manière dont cette structure de coûts différente nous oblige à optimiser pour des éléments différents de ceux du réseau principal d'Ethereum.
Vous apprendrez également comment mettre en œuvre cette optimisation.

### Transparence totale {#full-disclosure}

Je suis un employé à temps plein d'[Optimism](https://www.optimism.io/), les exemples de cet article seront donc exécutés sur Optimism.
Cependant, la technique expliquée ici devrait aussi bien fonctionner pour d'autres rollups.

### Terminologie {#terminology}

Lorsque l'on parle des rollups, le terme « couche 1 » (L1) est utilisé pour le réseau principal, le réseau de production Ethereum.
Le terme « couche 2 » (L2) est utilisé pour le rollup ou tout autre système qui s'appuie sur L1 pour la sécurité, mais qui effectue la plupart de son traitement hors chaîne.

## Comment pouvons-nous réduire davantage le coût des transactions L2 ? {#how-can-we-further-reduce-the-cost-of-L2-transactions}

Les [rollups optimistes](/developers/docs/scaling/optimistic-rollups) doivent conserver un enregistrement de chaque transaction historique afin que n'importe qui puisse les parcourir et vérifier que l'état actuel est correct.
Le moyen le plus économique d'inscrire des données sur le réseau principal d'Ethereum est de les écrire en tant que données d'appel.
Cette solution a été choisie à la fois par [Optimism](https://help.optimism.io/hc/en-us/articles/4413163242779-What-is-a-rollup-) et [Arbitrum](https://developer.offchainlabs.com/docs/rollup_basics#intro-to-rollups).

### Coût des transactions L2 {#cost-of-l2-transactions}

Le coût des transactions L2 se compose de deux éléments :

1. Le traitement L2, qui est généralement extrêmement bon marché
2. Le stockage L1, qui est lié aux coûts de gaz du réseau principal

Au moment où j'écris ces lignes, sur Optimism, le coût du gaz L2 est de 0,001 [Gwei](/developers/docs/gas/#pre-london).
Le coût du gaz L1, en revanche, est d'environ 40 gwei.
[Vous pouvez voir les prix actuels ici](https://public-grafana.optimism.io/d/9hkhMxn7z/public-dashboard?orgId=1&refresh=5m).

Un octet de données d'appel coûte soit 4 gaz (s'il est nul), soit 16 gaz (s'il s'agit de n'importe quelle autre valeur).
L'une des opérations les plus coûteuses sur l'EVM est l'écriture sur le stockage.
Le coût maximum de l'écriture d'un mot de 32 octets sur le stockage en L2 est de 22 100 gaz. Actuellement, cela représente 22,1 gwei.
Ainsi, si nous pouvons économiser un seul octet nul de données d'appel, nous pourrons écrire environ 200 octets sur le stockage et être tout de même gagnants.

### L'ABI {#the-abi}

La grande majorité des transactions accèdent à un contrat provenant d'un compte externe.
La plupart des contrats sont écrits en Solidity et interprètent leur champ de données selon [l'interface binaire de l'application (ABI)](https://docs.soliditylang.org/en/latest/abi-spec.html#formal-specification-of-the-encoding).

Cependant, l'ABI a été conçue pour L1, où un octet de données d'appel coûte approximativement la même chose que quatre opérations arithmétiques, et non pour L2 où un octet de données d'appel coûte plus de mille opérations arithmétiques.
Les données d'appel sont divisées comme suit :

| Section                | Longueur | Octets | Octets gaspillés | Gaz gaspillé | Octets nécessaires | Gaz nécessaire |
| ---------------------- | -------: | -----: | ---------------: | -----------: | -----------------: | -------------: |
| Sélecteur de fonction  |        4 |    0-3 |                3 |           48 |                  1 |             16 |
| Zéros                  |       12 |   4-15 |               12 |           48 |                  0 |              0 |
| Adresse de destination |       20 |  16-35 |                0 |            0 |                 20 |            320 |
| Montant                |       32 |  36-67 |               17 |           64 |                 15 |            240 |
| Total                  |       68 |        |                  |          160 |                    |            576 |

Explication :

- **Sélecteur de fonction** : Le contrat a moins de 256 fonctions, nous pouvons donc les distinguer avec un seul octet.
  Ces octets sont généralement non nuls et [coûtent donc seize gaz](https://eips.ethereum.org/EIPS/eip-2028).
- **Zéros** : Ces octets sont toujours nuls car une adresse de vingt octets ne nécessite pas un mot de trente-deux octets pour la contenir.
  Les octets qui contiennent la valeur zéro coûtent quatre gaz ([voir le Livre Jaune](https://ethereum.github.io/yellowpaper/paper.pdf), Annexe G,
  p. 27, la valeur pour `G`<sub>`txdatazero`</sub>).
- **Montant** : Si nous supposons que dans ce contrat `decimals` est de dix-huit (la valeur normale) et que le montant maximum de jetons que nous transférons sera de 10<sup>18</sup>, nous obtenons un montant maximum de 10<sup>36</sup>.
  256<sup>15</sup> &gt; 10<sup>36</sup>, donc quinze octets suffisent.

Un gaspillage de 160 gaz sur L1 est normalement négligeable. Une transaction coûte au moins [21 000 gaz](https://yakkomajuri.medium.com/blockchain-definition-of-the-week-ethereum-gas-2f976af774ed), donc 0,8 % supplémentaires n'ont pas d'importance.
Cependant, sur L2, les choses sont différentes. La quasi-totalité du coût de la transaction consiste à l'écrire sur L1.
En plus des données d'appel de la transaction, il y a 109 octets d'en-tête de transaction (adresse de destination, signature, etc.).
Le coût total est donc `109*16+576+160=2480`, et nous en gaspillons environ 6,5 %.

## Réduire les coûts lorsque vous ne contrôlez pas la destination {#reducing-costs-when-you-dont-control-the-destination}

En supposant que vous n'ayez pas le contrôle sur le contrat de destination, vous pouvez toujours utiliser une solution similaire à [celle-ci](https://github.com/qbzzt/ethereum.org-20220330-shortABI).
Passons en revue les fichiers pertinents.

### Token.sol {#token-sol}

[Ceci est le contrat de destination](https://github.com/qbzzt/ethereum.org-20220330-shortABI/blob/master/contracts/Token.sol).
Il s'agit d'un contrat standard ERC-20, avec une fonction supplémentaire.
Cette fonction `faucet` permet à n'importe quel utilisateur d'obtenir un jeton à utiliser.
Elle rendrait inutile la création d'un contrat ERC-20, mais elle facilite la vie quand un ERC-20 existe uniquement pour faciliter les tests.

```solidity
    /**
     * @dev Donne à l'appelant 1000 jetons avec lesquels jouer
     */
    function faucet() external {
        _mint(msg.sender, 1000);
    }   // function faucet
```

### CalldataInterpreter.sol {#calldatainterpreter-sol}

[Ceci est le contrat que les transactions sont censées appeler avec des données d'appel plus courtes](https://github.com/qbzzt/ethereum.org-20220330-shortABI/blob/master/contracts/CalldataInterpreter.sol).
Revenons dessus ligne par ligne.

```solidity
//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;


import { OrisUselessToken } from "./Token.sol";
```

Nous avons besoin de la fonction du jeton pour savoir comment l'appeler.

```solidity
contract CalldataInterpreter {

    OrisUselessToken public immutable token;
```

L'adresse du jeton pour lequel nous sommes un mandataire (proxy).

```solidity

    /**
     * @dev Spécifier l'adresse du jeton
     * @param tokenAddr_ Adresse du contrat ERC-20
     */
    constructor(
        address tokenAddr_
    )  {
        token = OrisUselessToken(tokenAddr_);
    }   // constructeur
```

L'adresse du jeton est le seul paramètre que nous devons spécifier.

```solidity
    function calldataVal(uint startByte, uint length)
        private pure returns (uint) {
```

Lire une valeur à partir des données d'appel.

```solidity
        uint _retVal;

        require(length < 0x21,
            "La limite de longueur de calldataVal est de 32 octets");

        require(length + startByte <= msg.data.length,
            "calldataVal essaie de lire au-delà de calldatasize");
```

Nous allons charger un unique mot de 32 octets (256 bits) en mémoire et supprimer les octets qui ne font pas partie du champ que nous voulons.
Cet algorithme ne fonctionne pas pour des valeurs de plus de 32 octets, et bien sûr nous ne pouvons pas lire au-delà de la fin des données d'appel.
Sur L1, il peut être nécessaire d'ignorer ces tests pour économiser du gaz, mais sur L2, le gaz est extrêmement bon marché, ce qui permet toutes les vérifications de cohérence auxquelles nous pouvons penser.

```solidity
        assembly {
            _retVal := calldataload(startByte)
        }
```

Nous aurions pu copier les données de l'appel à `fallback()` (voir ci-dessous), mais il est plus facile d'utiliser [Yul](https://docs.soliditylang.org/en/v0.8.12/yul.html), le langage d'assemblage de l'EVM.

Ici, nous utilisons [l'opcode CALLDATALOAD](https://www.evm.codes/#35) pour lire les octets `startByte` à `startByte+31` dans la pile.
En général, la syntaxe d'un opcode dans Yul est `<nom de l'opcode>(<première valeur de la pile, le cas échéant>,<deuxième valeur de la pile, le cas échéant>...)`.

```solidity

        _retVal = _retVal >> (256-length*8);
```

Seuls les octets de `longueur` les plus significatifs font partie du champ, donc nous effectuons un [décalage à droite](https://en.wikipedia.org/wiki/Logical_shift) pour nous débarrasser des autres valeurs.
Ceci présente l'avantage supplémentaire de déplacer la valeur à droite du champ, il s'agit donc de la valeur elle-même plutôt que la valeur multipliée par 256<sup>quelque chose</sup>.

```solidity

        return _retVal;
    }


    fallback() external {
```

Lorsqu'un appel à un contrat Solidity ne correspond à aucune des signatures de fonction, il appelle [la fonction `fallback()`](https://docs.soliditylang.org/en/v0.8.12/contracts.html#fallback-function) (en supposant qu'il y en ait une).
Dans le cas de `CalldataInterpreter`, n'importe quel appel arrive ici car il n'y a pas d'autres fonctions `external` ou `public`.

```solidity
        uint _func;

        _func = calldataVal(0, 1);
```

Lit le premier octet des données d'appel, qui nous indique la fonction.
Il y a deux raisons pour lesquelles une fonction ne serait pas disponible ici :

1. Les fonctions `pure` ou `view` ne modifient pas l'état et ne coûtent pas de gaz (lorsqu'elles sont appelées hors chaîne).
   Essayer de réduire leur coût en gaz n'a aucun sens.
2. Fonctions qui s'appuient sur [`msg.sender`](https://docs.soliditylang.org/en/v0.8.12/units-and-global-variables.html#block-and-transaction-properties).
   La valeur de `msg.sender` sera l'adresse de `CalldataInterpreter`, et non celle de l'appelant.

Malheureusement, [en examinant les spécifications ERC-20](https://eips.ethereum.org/EIPS/eip-20), cela ne laisse qu'une seule fonction, `transfer`.
Cela nous laisse avec uniquement deux fonctions : `transfer` (parce que nous pouvons appeler `transferFrom`) et `faucet` (parce que nous pouvons retourner les jetons à celui qui nous a appelés).

```solidity

        // Appeler les méthodes de changement d'état du jeton en utilisant
        // les informations des données d'appel

        // faucet
        if (_func == 1) {
```

Un appel à `faucet()`, qui n'a pas de paramètres.

```solidity
            token.faucet();
            token.transfer(msg.sender,
                token.balanceOf(address(this)));
        }
```

Après avoir appelé `token.faucet()`, nous obtenons des jetons. Cependant, en tant que contrat mandataire, nous n'avons pas **besoin** de jetons.
L'EOA (compte détenu en externe) ou le contrat qui nous a appelés en a besoin.
Nous transférons donc tous nos jetons à ceux qui nous ont appelés.

```solidity
        // transfer (supposons que nous ayons une allocation pour cela)
        if (_func == 2) {
```

Le transfert de jetons nécessite deux paramètres : l'adresse de destination et le montant.

```solidity
            token.transferFrom(
                msg.sender,
```

Nous autorisons uniquement les appelants à transférer les jetons qu'ils possèdent

```solidity
                address(uint160(calldataVal(1, 20))),
```

L'adresse de destination commence à l'octet n° 1 (l'octet n° 0 est la fonction).
En tant qu'adresse, elle fait 20 octets de long.

```solidity
                calldataVal(21, 2)
```

Pour ce contrat particulier, nous supposons que le nombre maximum de jetons que n'importe qui voudra transférer tiendra dans deux octets (moins de 65 536).

```solidity
            );
        }
```

Dans l'ensemble, un transfert prend 35 octets de données d'appel :

| Section                | Longueur | Octets |
| ---------------------- | -------: | -----: |
| Sélecteur de fonction  |        1 |      0 |
| Adresse de destination |       32 |   1-32 |
| Montant                |        2 |  33-34 |

```solidity
    }   // fallback

}       // contract CalldataInterpreter
```

### test.js {#test-js}

[Ce test unitaire JavaScript](https://github.com/qbzzt/ethereum.org-20220330-shortABI/blob/master/test/test.js) nous montre comment utiliser ce mécanisme (et comment vérifier qu'il fonctionne correctement).
Je vais supposer que vous comprenez [chai](https://www.chaijs.com/) et [ethers](https://docs.ethers.io/v5/) et que je n'expliquerai que les parties qui s'appliquent spécifiquement au contrat.

```js
const { expect } = require("chai");

describe("CalldataInterpreter", function () {
  it("Devrait nous permettre d'utiliser des jetons", async function () {
    const Token = await ethers.getContractFactory("OrisUselessToken")
    const token = await Token.deploy()
    await token.deployed()
    console.log("Adresse du jeton :", token.address)

    const Cdi = await ethers.getContractFactory("CalldataInterpreter")
    const cdi = await Cdi.deploy(token.address)
    await cdi.deployed()
    console.log("Adresse CalldataInterpreter :", cdi.address)

    const signer = await ethers.getSigner()
```

Nous commençons par déployer les deux contrats.

```javascript
    // Obtenir des jetons pour jouer avec
    const faucetTx = {
```

Nous ne pouvons pas utiliser les fonctions de haut niveau que nous utiliserions normalement (telles que `token.faucet()`) pour créer des transactions, car nous ne suivons pas l'ABI.
Au lieu de cela, nous devons construire nous-mêmes la transaction et ensuite l'envoyer.

```javascript
      to: cdi.address,
      data: "0x01"
```

Nous devons fournir deux paramètres pour la transaction :

1. `to`, l'adresse de destination.
   Il s'agit du contrat d'interprétation des données d'appel.
2. `data`, les données d'appel à envoyer.
   Dans le cas d'un appel au faucet, les données sont un octet unique, `0x01`.

```javascript

    }
    await (await signer.sendTransaction(faucetTx)).wait()
```

Nous appelons la méthode `sendTransaction` [du signataire](https://docs.ethers.io/v5/api/signer/#Signer-sendTransaction) car nous avons déjà spécifié la destination (`faucetTx.to`) et nous avons besoin que la transaction soit signée.

```javascript
// Vérifier que le faucet fournit les jetons correctement
expect(await token.balanceOf(signer.address)).to.equal(1000)
```

Ici, nous vérifions le solde.
Il n'est pas nécessaire d'économiser du gaz sur les fonctions de `vue`, nous les exécutons donc normalement.

```javascript
// Donner une allocation au CDI (les approbations ne peuvent pas être mandatées)
const approveTX = await token.approve(cdi.address, 10000)
await approveTX.wait()
expect(await token.allowance(signer.address, cdi.address)).to.equal(10000)
```

Donner à l'interprète de données d'appel une allocation pour pouvoir effectuer des transferts.

```javascript
// Transférer des jetons
const destAddr = "0xf5a6ead936fb47f342bb63e676479bddf26ebe1d"
const transferTx = {
  to: cdi.address,
  data: "0x02" + destAddr.slice(2, 42) + "0100",
}
```

Créer une transaction de transfert. Le premier octet est « 0x02 », suivi de l'adresse de destination, et enfin du montant (0x0100, qui correspond à 256 en décimal).

```javascript
    await (await signer.sendTransaction(transferTx)).wait()

    // Vérifier que nous avons 256 jetons en moins
    expect (await token.balanceOf(signer.address)).to.equal(1000-256)

    // Et que notre destination les a reçus
    expect (await token.balanceOf(destAddr)).to.equal(256)
  })    // it
})      // describe
```

## Réduire le coût lorsque vous contrôlez le contrat de destination {#reducing-the-cost-when-you-do-control-the-destination-contract}

Si vous avez le contrôle sur le contrat de destination, vous pouvez créer des fonctions qui contournent la vérification de `msg.sender` dans la mesure où elles font confiance à l'interpréteur des données d'appel.
[Vous pouvez voir un exemple de la façon dont cela fonctionne ici, dans la branche `control-contract`](https://github.com/qbzzt/ethereum.org-20220330-shortABI/tree/control-contract).

Si le contrat ne répondait qu'à des transactions externes, nous pourrions nous contenter d'un seul contrat.
Cependant, cela briserait [la composabilité](/developers/docs/smart-contracts/composability/).
Il est préférable d'avoir un contrat qui répond aux appels ERC-20 normaux, et un autre contrat qui répond aux transactions avec des données d'appel courtes.

### Token.sol {#token-sol-2}

Dans cet exemple, nous pouvons modifier `Token.sol`.
Cela nous permet d'avoir un certain nombre de fonctions que seul le mandataire peut appeler.
Voici les nouvelles parties :

```solidity
    // La seule adresse autorisée à spécifier l'adresse CalldataInterpreter
    address owner;

    // L'adresse CalldataInterpreter
    address proxy = address(0);
```

Le contrat ERC-20 doit connaître l'identité du mandataire autorisé.
Cependant, nous ne pouvons pas définir cette variable dans le constructeur, car nous n'en connaissons pas encore la valeur.
Ce contrat est instancié en premier car le mandataire attend l'adresse du jeton dans son constructeur.

```solidity
    /**
     * @dev Appelle le constructeur ERC20.
     */
    constructor(
    ) ERC20("Oris useless token-2", "OUT-2") {
        owner = msg.sender;
    }
```

L'adresse du créateur (appelé `propriétaire`) est stockée ici car c'est la seule adresse autorisée à définir le mandataire.

```solidity
    /**
     * @dev définit l'adresse pour le mandataire (le CalldataInterpreter).
     * Ne peut être appelé qu'une seule fois par le propriétaire
     */
    function setProxy(address _proxy) external {
        require(msg.sender == owner, "Ne peut être appelé que par le propriétaire");
        require(proxy == address(0), "Le mandataire est déjà défini");

        proxy = _proxy;
    }    // function setProxy
```

Le mandataire dispose d'un accès privilégié, car il peut contourner les contrôles de sécurité.
Pour être sûr de pouvoir faire confiance au mandataire, nous ne laissons que le `propriétaire` appeler cette fonction, et une seule fois.
Une fois que `proxy` a une valeur réelle (non nulle), cette valeur ne peut pas changer, donc même si le propriétaire décide de devenir malveillant, ou si la mnémonique pour celui-ci est révélée, nous sommes toujours en sécurité.

```solidity
    /**
     * @dev Certaines fonctions ne peuvent être appelées que par le mandataire.
     */
    modifier onlyProxy {
```

Ceci est une [fonction `modificatrice`](https://www.tutorialspoint.com/solidity/solidity_function_modifiers.htm), elle modifie le fonctionnement des autres fonctions.

```solidity
      require(msg.sender == proxy);
```

Tout d'abord, vérifiez que nous avons été appelés par le mandataire et personne d'autre.
Sinon, `revert`.

```solidity
      _;
    }
```

Si c'est le cas, exécutez la fonction que nous modifions.

```solidity
   /* Fonctions qui permettent au mandataire de servir de mandataire pour les comptes */

    function transferProxy(address from, address to, uint256 amount)
        public virtual onlyProxy() returns (bool)
    {
        _transfer(from, to, amount);
        return true;
    }

    function approveProxy(address from, address spender, uint256 amount)
        public virtual onlyProxy() returns (bool)
    {
        _approve(from, spender, amount);
        return true;
    }

    function transferFromProxy(
        address spender,
        address from,
        address to,
        uint256 amount
    ) public virtual onlyProxy() returns (bool)
    {
        _spendAllowance(from, spender, amount);
        _transfer(from, to, amount);
        return true;
    }
```

Il s'agit de trois opérations qui nécessitent normalement que le message provienne directement de l'entité qui transfère les jetons ou qui approuve une allocation.
Nous avons ici une version mandataire de ces opérations qui :

1. est modifiée par `onlyProxy()` afin que personne d'autre ne soit autorisé à les contrôler.
2. Récupère l'adresse qui serait normalement `msg.sender` en tant que paramètre supplémentaire.

### CalldataInterpreter.sol {#calldatainterpreter-sol-2}

L'interpréteur de données d'appel est presque identique à celui ci-dessus, à la différence que les fonctions mandatées reçoivent un paramètre `msg.sender` et qu'il n'est pas nécessaire d'effectuer d'allocation pour le `transfert`.

```solidity
        // transfert (pas besoin d'allocation)
        if (_func == 2) {
            token.transferProxy(
                msg.sender,
                address(uint160(calldataVal(1, 20))),
                calldataVal(21, 2)
            );
        }

        // approbation
        if (_func == 3) {
            token.approveProxy(
                msg.sender,
                address(uint160(calldataVal(1, 20))),
                calldataVal(21, 2)
            );
        }

        // transferFrom
        if (_func == 4) {
            token.transferFromProxy(
                msg.sender,
                address(uint160(calldataVal( 1, 20))),
                address(uint160(calldataVal(21, 20))),
                calldataVal(41, 2)
            );
        }
```

### Test.js {#test-js-2}

Il existe quelques différences entre le code de test précédent et celui-ci.

```js
const Cdi = await ethers.getContractFactory("CalldataInterpreter")
const cdi = await Cdi.deploy(token.address)
await cdi.deployed()
await token.setProxy(cdi.address)
```

Nous devons indiquer au contrat ERC-20 à quel mandataire faire confiance

```js
console.log("Adresse CalldataInterpreter :", cdi.address)

// Besoin de deux signataires pour vérifier les allocations
const signers = await ethers.getSigners()
const signer = signers[0]
const poorSigner = signers[1]
```

Pour vérifier `approve()` et `transferFrom()`, nous avons besoin d'un second signataire.
Nous l'appelons `poorSigner` car il ne reçoit aucun de nos jetons (il doit bien sûr avoir de l'ETH).

```js
// Transférer des jetons
const destAddr = "0xf5a6ead936fb47f342bb63e676479bddf26ebe1d"
const transferTx = {
  to: cdi.address,
  data: "0x02" + destAddr.slice(2, 42) + "0100",
}
await (await signer.sendTransaction(transferTx)).wait()
```

Étant donné que le contrat ERC-20 fait confiance au mandataire (`cdi`), nous n'avons pas besoin d'une allocation pour relayer les transferts.

```js
// approbation et transferFrom
const approveTx = {
  to: cdi.address,
  data: "0x03" + poorSigner.address.slice(2, 42) + "00FF",
}
await (await signer.sendTransaction(approveTx)).wait()

const destAddr2 = "0xE1165C689C0c3e9642cA7606F5287e708d846206"

const transferFromTx = {
  to: cdi.address,
  data: "0x04" + signer.address.slice(2, 42) + destAddr2.slice(2, 42) + "00FF",
}
await (await poorSigner.sendTransaction(transferFromTx)).wait()

// Vérifier que la combinaison approbation / transferFrom a été effectuée correctement
expect(await token.balanceOf(destAddr2)).to.equal(255)
```

Tester les deux nouvelles fonctions.
Notez que `transferFromTx` nécessite deux paramètres d'adresse : le donneur de l'allocation et le destinataire.

## Conclusion {#conclusion}

[Optimism](https://medium.com/ethereum-optimism/the-road-to-sub-dollar-transactions-part-2-compression-edition-6bb2890e3e92) et [Arbitrum](https://developer.offchainlabs.com/docs/special_features) cherchent tous deux des moyens de réduire la taille des données d'appel écrites sur L1 et donc le coût des transactions.
Cependant, en tant que fournisseurs d'infrastructures à la recherche de solutions génériques, nos capacités sont limitées.
En tant que développeur de dapps, vous avez des connaissances spécifiques à l'application, ce qui vous permet d'optimiser vos données d'appel bien mieux que nous ne pourrions le faire avec une solution générique.
Nous espérons que cet article vous aidera à trouver la solution idéale pour vos besoins.

[Voir ici pour plus de mon travail](https://cryptodocguy.pro/).

