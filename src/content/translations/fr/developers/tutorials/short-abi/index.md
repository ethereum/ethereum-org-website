---
title: "Minimiser les ABIs pour l'optimisation des données d'appel"
description: Optimisation des contrats intelligents pour les Rollups optimistes
author: Ori Pomerantz
lang: fr
tags:
  - "Couche 2"
skill: intermediate
published: 2022-04-01
---

## Introduction {#introduction}

Dans cet article, vous en apprendrez plus sur les [Rollups optimistes](/developers/docs/scaling/optimistic-rollups), le coût des transactions qui leur est appliqué, et comment la structure de coûts distincte nous oblige à optimiser différents éléments sur le réseau principal Ethereum. Vous apprendrez également à implémenter cette optimisation.

### Devoir de transparence {#full-disclosure}

Je suis un employé à temps plein chez [Optimism](https://www.optimism.io/), les exemples illustrant cet article seront donc exécutés sur Optimism. Cependant, la technique expliquée ici devrait aussi bien fonctionner pour d'autres rollups.

### Terminologie {#terminology}

Lorsque l'on parle des rollups, le terme 'Couche 1' (L1) est généralement utilisé pour le réseau principal, le réseau Ethereum de production. Le terme 'Couche 2' (L2) est utilisé pour les rollups ou tout autre système qui se base sur L1 pour la sécurité, mais qui réalise son traitement hors chaîne.

## Comment pouvons-nous encore réduire le coût des transactions L2 ? {#how-can-we-further-reduce-the-cost-of-L2-transactions}

[Les Rollups optimistes](/developers/docs/scaling/optimistic-rollups) doivent conserver un registre de chaque historique de transaction afin que toute personne qui le souhaite puisse le passer en revue et vérifier que l'état actuel est correct. La façon la plus économique de récupérer des données sur le réseau principal Ethereum est de les écrire en tant que données d'appel. Cette solution a été choisie à la fois par [Optimism](https://help.optimism.io/hc/en-us/articles/4413163242779-What-is-a-rollup-) et [Arbitrum](https://developer.offchainlabs.com/docs/rollup_basics#intro-to-rollups).

### Coût des transactions L2 {#cost-of-l2-transactions}

Le coût des transactions L2 est composé de deux éléments :

1. Le traitement L2, qui est généralement extrêmement bon marché
2. Le stockage L1, lié aux coûts de gaz du réseau principal

Au moment d'écrire cet article, le coût de gaz L2 sur Optimism est de 0,001 [Gwei](https://ethereum.org/en/developers/docs/gas/#pre-london) Le coût de gaz L1, en revanche, est d'environ 40 gwei. [Vous pouvez voir les prix actuels ici](https://public-grafana.optimism.io/d/9hkhMxn7z/public-dashboard?orgId=1&refresh=5m).

Un octet de données d'appel coûte soit 4 gaz (s'il est nul) soit 16 gaz (s'il s'agit d'une autre valeur). L'une des opérations les plus coûteuses de l'EVM est d'écrire sur le stockage. Le coût maximum d'écriture d'un mot de 32 octets pour un stockage sur L2 est de 22 100 gaz. Soit actuellement 22,1 gwei. Si nous parvenons à sauvegarder un seul octet zéro de données d'appel, nous pourrons écrire environ 200 octets de stockage et sortir gagnants de l'opération.

### L'ABI {#the-abi}

La grande majorité des transactions accèdent à un contrat provenant d'un compte externe. La plupart des contrats sont écrits en Solidity et interprètent leur champ de données conformément à l'[interface binaire d'application (ABI)](https://docs.soliditylang.org/en/latest/abi-spec.html#formal-specification-of-the-encoding).

Cependant, l'ABI a été conçu pour L1, où un octet de données d'appels coûte approximativement la même chose que quatre opérations arithmétiques, et non pas pour L2 où un octet de données d'appel coûte plus de mille opérations arithmétiques. Par exemple, [voici une transaction de transfert ERC-20](https://kovan-optimistic.etherscan.io/tx/0x7ce4c144ebfce157b4de99d8ad53a352ae91b57b3fa06d8a1c79439df6bfa998). Les données d'appel sont divisées ainsi :

| Section                | Longueur | Bytes | Octets gaspillés | Gaz gaspillé | Octets nécessaires | Gaz nécessaire |
| ---------------------- | -------: | ----: | ---------------: | -----------: | -----------------: | -------------: |
| Sélecteur de fonction  |        4 |   0-3 |                3 |           48 |                  1 |             16 |
| Zéros                  |       12 |  4-15 |               12 |           48 |                  0 |              0 |
| Adresse de destination |       20 | 16-35 |                0 |            0 |                 20 |            320 |
| Montant                |       32 | 36-67 |               17 |           64 |                 15 |            240 |
| Total                  |       68 |       |                  |          160 |                    |            576 |

Explication :

- **Sélecteur de fonction** : Le contrat a moins de 256 fonctions, nous pouvons donc les caractériser avec un seul octet. Ces octets sont typiquement non nuls et [coûtent donc seize gaz](https://eips.ethereum.org/EIPS/eip-2028).
- **Zéros** : Ces octets sont toujours nuls car une adresse de vingt-quatre octets ne nécessite pas un mot de trente-deux octets pour la contenir. Les octets qui contiennent la valeur zéro ont un coût de quatre gaz ([voir le Livre Jaune](https://ethereum.github.io/yellowpaper/paper.pdf), Annexe G, p. 27, la valeur de `G`<sub>`txdatazero`</sub>).
- **Montant** : Si nous supposons que dans ce contrat `les décimales` sont de dix-huit (la valeur normale) et que le nombre maximum de jetons que nous transférons sera de 10<sup>18</sup>, nous obtenons un montant maximum de 10<sup>36</sup>. 256<sup>15</sup> &gt; 10<sup>36</sup>, donc 15 octets suffisent.

Le gaspillage de 160 gaz sur L1 est normalement négligeable. Une transaction coûte un minimum de [21 000 gaz](https://yakkomajuri.medium.com/blockchain-definition-of-the-week-ethereum-gas-2f976af774ed), ainsi, un supplément de 0,8 % n'a pas grande importance. Cependant, sur L2, les choses sont différentes. La quasi-totalité du coût de la transaction consiste à l'écrire sur L1. En plus des données d'appel de la transaction, il y a 109 octets d'en-tête de la transaction (adresse de destination, signature, etc.). Le coût total est donc `109*16+576+160=2480`, et nous en gaspillons environ 6,5%.

## Réduire les coûts lorsque vous ne contrôlez pas la destination {#reducing-costs-when-you-dont-control-the-destination}

En supposant que vous n'ayez pas de contrôle sur le contrat de destination, vous pouvez toujours utiliser une solution similaire à [celle-ci](https://github.com/qbzzt/ethereum.org-20220330-shortABI). Passons en revue les fichiers pertinents.

### Token.sol {#token-sol}

[Ceci est le contrat de destination](https://github.com/qbzzt/ethereum.org-20220330-shortABI/blob/master/contracts/Token.sol). Il s'agit d'un contrat standard ERC-20, avec une fonction supplémentaire. Cette fonction `faucet` permet à n'importe quel utilisateur d'obtenir un jeton à utiliser. Elle rendrait inutile la création d'un contrat ERC-20, mais elle facilite la vie quand un ERC-20 existe uniquement pour faciliter les tests.

```solidity
    /**
     * @dev Gives the caller 1000 tokens to play with
     */
    function faucet() external {
        _mint(msg.sender, 1000);
    }   // function faucet
```

[Vous pouvez voir un exemple de ce contrat en cours de déploiement ici](https://kovan-optimistic.etherscan.io/address/0x950c753c0edbde44a74d3793db738a318e9c8ce8).

### CalldataInterpreter.sol {#calldatainterpreter-sol}

[Ceci est le contrat que les transactions sont censées appeler au moyen de données d'appel plus courtes](https://github.com/qbzzt/ethereum.org-20220330-shortABI/blob/master/contracts/CalldataInterpreter.sol). Revenons dessus ligne par ligne.

```solidity
//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;


import { OrisUselessToken } from "./Token.sol";
```

Nous avons besoin de savoir comment appeler la fonction token.

```solidity
contract CalldataInterpreter {

    OrisUselessToken public immutable token;
```

L'adresse du jeton pour lequel nous sommes un proxy.

```solidity

    /**
     * @dev Specify the token address
     * @param tokenAddr_ ERC-20 contract address
     */
    constructor(
        address tokenAddr_
    )  {
        token = OrisUselessToken(tokenAddr_);
    }   // constructor
```

L'adresse du jeton est le seul paramètre que nous devons spécifier.

```solidity
    function calldataVal(uint startByte, uint length)
        private pure returns (uint) {
```

Lire une valeur dans les données d'appel.

```solidity
        uint _retVal;

        require(length < 0x21,
            "calldataVal length limit is 32 bytes");

        require(length + startByte <= msg.data.length,
            "calldataVal trying to read beyond calldatasize");
```

Nous allons charger en mémoire un unique mot de 32 octets (256 bits) et supprimer les octets qui ne font pas partie du champ souhaité. Cet algorithme ne fonctionne pas pour des valeurs de plus de 32 octets, et bien sûr nous ne pouvons lire au-delà de la fin des données d'appel. Sur L1, il serait pertinent de ne pas réaliser ces tests pour économiser du gaz, mais sur L2, le gaz est extrêmement bon marché, ce qui permet de réaliser toutes les vérifications possibles.

```solidity
        assembly {
            _retVal := calldataload(startByte)
        }
```

Nous aurions pu copier les données de l'appel à `fallback()` (voir ci-dessous), mais il est plus facile d'utiliser [Yul](https://docs.soliditylang.org/en/v0.8.12/yul.html), le langage d'assemblage de l'EVM.

Nous utilisons ici [l'opcode CALLDATALOAD](https://www.evm.codes/#35) pour lire les octets `startByte` à `startByte+31` dans la pile. En général, la syntaxe d'un opcode dans Yul est `<opcode name>(<first stack value, if any>,<second stack value, if any>...)`.

```solidity

        _retVal = _retVal >> (256-length*8);
```

Seuls les octets de `longueur` les plus significatives font partie du champ, donc nous [décalons vers la droite](https://en.wikipedia.org/wiki/Logical_shift) pour nous débarrasser des autres valeurs. Ceci présente l'avantage supplémentaire de déplacer la valeur à droite du champ, il s'agit donc de la valeur elle-même plutôt que la valeur multipliée par 256<sup>quelque chose</sup>.

```solidity

        return _retVal;
    }


    fallback() external {
```

Lorsqu'un appel à un contrat Solidity ne correspond à aucune des signatures de fonction, il appelle [la fonction `fallback()`](https://docs.soliditylang.org/en/v0.8.12/contracts.html#fallback-function) (en supposant qu'il y en ait une). Dans le cas de `CalldataInterpreter`, _tous les appels_ arrivent ici car il n'y a pas d'autres fonctions `external` ou `public`.

```solidity
        uint _func;

        _func = calldataVal(0, 1);
```

Lit le premier octet des données d'appel, qui nous indique la fonction. Il y a deux raisons pour lesquelles une fonction ne serait pas disponible ici :

1. Les fonctions `pure` ou `view` ne changent pas l'état et ne coûtent pas de gaz (lorsqu'elles sont appelées hors chaîne). Essayer de réduire leur coût en gaz n'a aucun sens.
2. Les fonctions reposent sur [`msg.sender`](https://docs.soliditylang.org/en/v0.8.12/units-and-global-variables.html#block-and-transaction-properties). La valeur de `msg.sender` va être l'adresse du `CalldataInterpreter`, pas celle de l'appelant.

Malheureusement, [au regard des spécifications ERC-20](https://eips.ethereum.org/EIPS/eip-20), cela ne laisse qu'une seule fonction, `transfer`. Cela nous laisse avec uniquement deux fonctions : `transfer` (parce que nous pouvons appeler `transferFrom`) et `faucet` (parce que nous pouvons retourner les jetons à celui qui nous a appelés).

```solidity

        // Call the state changing methods of token using
        // information from the calldata

        // faucet
        if (_func == 1) {
```

Un appel à la fonction `faucet()`, qui n'a pas de paramètres.

```solidity
            token.faucet();
            token.transfer(msg.sender,
                token.balanceOf(address(this)));
        }
```

Après avoir appelé `token.faucet()`, nous obtenons des jetons. Cependant, comme pour le contrat proxy, nous n'avons pas **besoin** des jetons. L'EOA (compte détenu en externe) ou le contrat qui nous appelait en a besoin. Nous transférons donc tous nos jetons à ceux qui nous ont appelés.

```solidity
        // transfer (assume we have an allowance for it)
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

L'adresse de destination commence à l'octet #1 (l'octet #0 est la fonction). En tant qu'adresse, elle fait 20 octets de long.

```solidity
                calldataVal(21, 2)
```

Pour ce contrat particulier, nous supposons que le nombre maximum de jetons que n'importe qui voudra transférer tiendra dans deux octets (moins de 65536).

```solidity
            );
        }
```

Dans l'ensemble, un transfert prend 35 octets de données d'appel :

| Section                | Longueur | Bytes |
| ---------------------- | -------: | ----: |
| Sélecteur de fonction  |        1 |     0 |
| Adresse de destination |       32 |  1-32 |
| Montant                |        2 | 33-34 |

```solidity
    }   // fallback

}       // contract CalldataInterpreter
```

### test.js {#test-js}

[Ce test unitaire JavaScript](https://github.com/qbzzt/ethereum.org-20220330-shortABI/blob/master/test/test.js) nous montre comment utiliser ce mécanisme (et comment vérifier qu'il fonctionne correctement). Je vais supposer que vous comprenez [chai](https://www.chaijs.com/) et [ethers](https://docs.ethers.io/v5/) et uniquement vous expliquer les parties applicables spécifiquement au contrat.

```js
const { expect } = require("chai");

describe("CalldataInterpreter", function () {
  it("Should let us use tokens", async function () {
    const Token = await ethers.getContractFactory("OrisUselessToken")
    const token = await Token.deploy()
    await token.deployed()
    console.log("Token addr:", token.address)

    const Cdi = await ethers.getContractFactory("CalldataInterpreter")
    const cdi = await Cdi.deploy(token.address)
    await cdi.deployed()
    console.log("CalldataInterpreter addr:", cdi.address)

    const signer = await ethers.getSigner()
```

Nous commençons par déployer les deux contrats.

```javascript
    // Get tokens to play with
    const faucetTx = {
```

Nous ne pouvons pas utiliser les fonctions de haut niveau que nous utiliserions normalement (comme `token.faucet()`) pour créer des transactions, car nous ne suivons pas l'ABI. Au lieu de cela, nous devons construire nous-mêmes la transaction et ensuite l'envoyer.

```javascript
      to: cdi.address,
      data: "0x01"
```

Nous devons fournir deux paramètres pour la transaction :

1. `to`, l'adresse de destination. Il s'agit de l'interpréteur des données d'appel du contrat.
2. `data`, les données d'appel à envoyer. Dans le cas d'un appel faucet, les données sont un octet unique, `0x01`.

```javascript

    }
    await (await signer.sendTransaction(faucetTx)).wait()
```

Nous appelons la [méthode du signataire `sendTransaction`](https://docs.ethers.io/v5/api/signer/#Signer-sendTransaction) car nous avons déjà spécifié la destination (`faucetTx.to`) et nous avons besoin que la transaction soit signée.

```javascript
// Check the faucet provides the tokens correctly
expect(await token.balanceOf(signer.address)).to.equal(1000)
```

Ici, nous vérifions le solde. Il n'est pas nécessaire d'économiser du gaz pour les fonctions `view`, nous les exécutons donc normalement.

```javascript
// Give the CDI an allowance (approvals cannot be proxied)
const approveTX = await token.approve(cdi.address, 10000)
await approveTX.wait()
expect(await token.allowance(signer.address, cdi.address)).to.equal(10000)
```

Donner à l'interprète des données d'appel une allocation pour pouvoir effectuer des transferts.

```javascript
// Transfer tokens
const destAddr = "0xf5a6ead936fb47f342bb63e676479bddf26ebe1d"
const transferTx = {
  to: cdi.address,
  data: "0x02" + destAddr.slice(2, 42) + "0100",
}
```

Créer une transaction de transfert. Le premier octet est "0x02", suivi de l'adresse de destination, et enfin du montant (0x0100, qui est de 256 décimal).

```javascript
    await (await signer.sendTransaction(transferTx)).wait()

    // Check that we have 256 tokens less
    expect (await token.balanceOf(signer.address)).to.equal(1000-256)

    // And that our destination got them
    expect (await token.balanceOf(destAddr)).to.equal(256)
  })    // it
})      // describe
```

### Exemple {#example}

Si vous souhiatez voir ces fichiers en action sans les exécuter vous-même, suivez ces liens :

1. [Déploiement de `OrisUselessToken`](https://kovan-optimistic.etherscan.io/tx/1410744) sur l'[adresse `0x950c753c0edbde44a74d3793db738a318e9c8ce8`](https://kovan-optimistic.etherscan.io/address/0x950c753c0edbde44a74d3793db738a318e9c8ce8).
2. [Déploiement de `CalldataInterpreter`](https://kovan-optimistic.etherscan.io/tx/1410745) sur l'[adresse `0x16617fea670aefe3b9051096c0eb4aeb4b3a5f55`](https://kovan-optimistic.etherscan.io/address/0x16617fea670aefe3b9051096c0eb4aeb4b3a5f55).
3. [Appel de `faucet()`](https://kovan-optimistic.etherscan.io/tx/1410746).
4. [Appel de `OrisUselessToken.approve()`](https://kovan-optimistic.etherscan.io/tx/1410747). Cet appel doit aller directement au contrat de jeton car le traitement repose sur `msg.sender`.
5. [Appel de `transfer()`](https://kovan-optimistic.etherscan.io/tx/1410748).

## Réduire les coûts lorsque vous contrôlez le contrat de destination {#reducing-the-cost-when-you-do-control-the-destination-contract}

Si vous avez le contrôle sur le contrat de destination, vous pouvez créer des fonctions qui contournent la vérification `msg.sender` dans la mesure où elles font confiance à l'interpréteur des données d'appel. [Vous pouvez voir un exemple de comment cela fonctionne ici, dans la branche `control-contract`](https://github.com/qbzzt/ethereum.org-20220330-shortABI/tree/control-contract).

Si le contrat ne répondait qu'à des transactions externes, nous pourrions nous contenter d'un seul contrat. Cependant, cela casserait [la composabilité](/developers/docs/smart-contracts/composability/). Il est préférable d'avoir un contrat capable de répondre aux appels traditionnels ERC-20 et un autre contrat destiné aux transactions avec de courts appels de données.

### Token.sol {#token-sol-2}

Dans cet exemple, nous pouvons modifier `Token.sol`. Cela nous permet d'avoir un certain nombre de fonctions que seul le proxy peut appeler. Voici les nouveaux éléments :

```solidity
    // The only address allowed to specify the CalldataInterpreter address
    address owner;

    // The CalldataInterpreter address
    address proxy = address(0);
```

Le contrat ERC-20 doit connaître l'identité du proxy autorisé. Cependant, nous ne pouvons pas définir cette variable dans le constructeur, car nous n'en connaissons pas encore la valeur. Ce contrat est instauré en premier car le proxy attend l'adresse du jeton dans son constructeur.

```solidity
    /**
     * @dev Calls the ERC20 constructor.
     */
    constructor(
    ) ERC20("Oris useless token-2", "OUT-2") {
        owner = msg.sender;
    }
```

L'adresse du créateur (appelé `owner`) est stockée ici car c'est la seule adresse autorisée à définir le proxy.

```solidity
    /**
     * @dev set the address for the proxy (the CalldataInterpreter).
     * Can only be called once by the owner
     */
    function setProxy(address _proxy) external {
        require(msg.sender == owner, "Can only be called by owner");
        require(proxy == address(0), "Proxy is already set");

        proxy = _proxy;
    }    // function setProxy
```

Le proxy dispose d'un accès privilégié, car il peut contourner les contrôles de sécurité. Pour être sûr de pouvoir faire confiance au proxy, nous ne laissons que `le propriétaire` appeler cette fonction, et qu'une seule fois. Une fois que le `proxy` dispose d'une valeur réelle (pas zéro), cette valeur ne peut pas changer, donc même si le propriétaire décide de jouer au voyou, ou si l'élément mnémonique est révélé, nous restons en sécurité.

```solidity
    /**
     * @dev Some functions may only be called by the proxy.
     */
    modifier onlyProxy {
```

Ceci est une [fonction `modifier`](https://www.tutorialspoint.com/solidity/solidity_function_modifiers.htm), qui modifie la façon dont les autres fonctions marchent.

```solidity
      require(msg.sender == proxy);
```

Tout d'abord, vérifier que nous avons été appelés par le proxy et personne d'autre. Dans le cas contraire, `annuler`.

```solidity
      _;
    }
```

Si c'est le cas, exécuter la fonction que nous modifions.

```solidity
   /* Functions that allow the proxy to actually proxy for accounts */

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

Il s'agit de trois opérations pour lesquelles le message doit normalement provenir directement de l'entité qui transfère les jetons ou approuve une allocation. Nous avons ici une version proxy de ces opérations qui :

1. Est modifiée par `onlyProxy()` afin que personne d'autre ne soit autorisé à les contrôler.
2. Récupère l'adresse qui serait normalement `msg.sender` en tant que paramètre supplémentaire.

### CalldataInterpreter.sol {#calldatainterpreter-sol-2}

L'interpréteur de données d'appel est presque identique à celui ci-dessus, à la différence que les fonctions proxy reçoivent un paramètre `msg.sender` et qu'il n'est pas nécessaire d'effectuer d'allocation pour le `transfert`.

```solidity
        // transfer (no need for allowance)
        if (_func == 2) {
            token.transferProxy(
                msg.sender,
                address(uint160(calldataVal(1, 20))),
                calldataVal(21, 2)
            );
        }

        // approve
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

Nous devons indiquer au contrat ERC-20 à quel proxy faire confiance

```js
console.log("CalldataInterpreter addr:", cdi.address)

// Need two signers to verify allowances
const signers = await ethers.getSigners()
const signer = signers[0]
const poorSigner = signers[1]
```

Pour vérifier `approve()` et `transferFrom()`, nous avons besoin d'un second signataire. Nous l'appelons `poorSigner` car il ne récupère aucun de nos jetons (il a bien entendu besoin d'ETH).

```js
// Transfer tokens
const destAddr = "0xf5a6ead936fb47f342bb63e676479bddf26ebe1d"
const transferTx = {
  to: cdi.address,
  data: "0x02" + destAddr.slice(2, 42) + "0100",
}
await (await signer.sendTransaction(transferTx)).wait()
```

Dans la mesure où le contrat ERC-20 fait confiance au proxy (`cdi`), nous n'avons pas besoin d'une allocation pour relayer les transferts.

```js
// approval and transferFrom
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

// Check the approve / transferFrom combo was done correctly
expect(await token.balanceOf(destAddr2)).to.equal(255)
```

Tester les deux nouvelles fonctions. Notez que `transferFromTx` nécessite deux paramètres d'adresse : le donneur de l'allocation et le destinataire.

### Exemple {#example-2}

Si vous souhiatez voir ces fichiers en action sans les exécuter vous-même, suivez ces liens :

1. [Déploiement de `OrisUselessToken-2`](https://kovan-optimistic.etherscan.io/tx/1475397) à l'adresse [`0xb47c1f550d8af70b339970c673bbdb2594011696`](https://kovan-optimistic.etherscan.io/address/0xb47c1f550d8af70b339970c673bbdb2594011696).
2. [Déploiement de `CalldataInterpreter`](https://kovan-optimistic.etherscan.io/tx/1475400) à l'adresse [`0x0dccfd03e3aaba2f8c4ea4008487fd0380815892`](https://kovan-optimistic.etherscan.io/address/0x0dccfd03e3aaba2f8c4ea4008487fd0380815892).
3. [Appel de `setProxy()`](https://kovan-optimistic.etherscan.io/tx/1475402).
4. [Appel de `faucet()`](https://kovan-optimistic.etherscan.io/tx/1475409).
5. [Appel de `transferProxy()`](https://kovan-optimistic.etherscan.io/tx/1475416).
6. [Appel de `approveProxy()`](https://kovan-optimistic.etherscan.io/tx/1475419).
7. [Appel de `transferProxy()`](https://kovan-optimistic.etherscan.io/tx/1475421). Notez que cet appel provient d'une adresse différente des autres, `poorSigner` au lieu du `signer`.

## Conclusion {#conclusion}

[Optimism](https://medium.com/ethereum-optimism/the-road-to-sub-dollar-transactions-part-2-compression-edition-6bb2890e3e92) et [Arbitrum](https://developer.offchainlabs.com/docs/special_features) recherchent des moyens de réduire la taille des données d'appel écrites en L1 et donc le coût des transactions. Cependant, en tant que fournisseurs d'infrastructures pour des solutions génériques, nos capacités sont limitées. En tant que développeur dApp, vous avez des connaissances spécifiques concernant l'application, ce qui vous permet d'optimiser vos données d'appel bien mieux que nous ne pourrions le faire avec une solution générique. J'espère que cet article vous aidera à trouver la solution idéale pour vos besoins.
