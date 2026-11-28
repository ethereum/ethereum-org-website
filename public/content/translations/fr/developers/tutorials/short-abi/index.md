---
title: "ABI courtes pour l'optimisation des calldata"
description: Optimisation des contrats intelligents pour les rollups optimistes
author: Ori Pomerantz
lang: fr
tags: ["couche 2 (L2)"]
skill: intermediate
breadcrumb: ABI courtes
published: 2022-04-01
---

## Introduction {#introduction}

Dans cet article, vous en apprendrez davantage sur les [rollups optimistes](/developers/docs/scaling/optimistic-rollups), le coût des transactions sur ceux-ci, et comment cette structure de coûts différente nous oblige à optimiser d'autres éléments que sur le réseau principal Ethereum.
Vous apprendrez également comment implémenter cette optimisation.

### Divulgation complète {#full-disclosure}

Je suis un employé à temps plein d'[Optimism](https://www.optimism.io/), les exemples de cet article s'exécuteront donc sur Optimism.
Cependant, la technique expliquée ici devrait fonctionner tout aussi bien pour d'autres rollups.

### Terminologie {#terminology}

Lorsqu'on parle de rollups, le terme « couche 1 (L1) » est utilisé pour le Réseau principal, le réseau Ethereum de production.
Le terme « couche 2 (L2) » est utilisé pour le rollup ou tout autre système qui s'appuie sur la L1 pour la sécurité mais effectue la majeure partie de son traitement hors chaîne.

## Comment pouvons-nous réduire davantage le coût des transactions sur L2 ? {#how-can-we-further-reduce-the-cost-of-l2-transactions}

Les [rollups optimistes](/developers/docs/scaling/optimistic-rollups) doivent conserver un enregistrement de chaque transaction historique afin que quiconque puisse les parcourir et vérifier que l'état actuel est correct.
Lorsque cet article a été rédigé, le moyen le moins cher d'introduire des données dans le réseau principal Ethereum était de les écrire sous forme de données d'appel.
Cette solution a été choisie à la fois par [Optimism](https://docs.optimism.io/op-stack/protocol/overview) et [Arbitrum](https://docs.arbitrum.io/welcome/arbitrum-gentle-introduction).
Depuis la mise à jour Dencun (mars 2024), les rollups peuvent publier ces données dans des [blobs](/roadmap/danksharding/) à la place, qui sont beaucoup moins chers.

### Coût des transactions sur L2 {#cost-of-l2-transactions}

Le coût des transactions sur L2 est composé de deux éléments :

1. Le traitement sur L2, qui est généralement extrêmement bon marché
2. Le stockage sur L1, qui est lié aux coûts en gaz du Réseau principal

Lorsque j'ai écrit cet article en 2022, sur Optimism, le coût du gaz sur L2 était de 0,001 [gwei](/developers/docs/gas/#what-is-gas).
Le coût du gaz sur L1, en revanche, était d'environ 40 gwei.

Un octet de données d'appel coûte soit 4 gaz (s'il est nul), soit 16 gaz (s'il a une autre valeur).
L'une des opérations les plus coûteuses sur l'EVM est l'écriture dans le stockage.
Le coût maximum de l'écriture d'un mot de 32 octets dans le stockage sur L2 est de 22 100 gaz. À l'époque, cela représentait 22,1 gwei.
Donc, si nous pouvions économiser un seul octet nul de données d'appel, nous serions en mesure d'écrire environ 200 octets dans le stockage tout en restant gagnants.

#### Comment les coûts sur L2 ont changé en 2024 {#how-l2-costs-changed-in-2024}

La formule des [frais de données sur L1](https://docs.optimism.io/op-stack/transactions/fees#l1-data-fee) de l'OP Stack a changé deux fois depuis la rédaction de cet article :

- Avec la [mise à jour Ecotone](https://docs.optimism.io/op-stack/transactions/fees#ecotone) (mars 2024), les chaînes OP Stack ont commencé à publier les données de transaction dans des blobs, qui sont tarifés par des frais de base de blob distincts (et généralement beaucoup plus bas).
- Avec la [mise à jour Fjord](https://docs.optimism.io/op-stack/transactions/fees#fjord) (juillet 2024), les frais de données sur L1 sont basés sur une estimation de la taille de la transaction après la compression [FastLZ](https://github.com/ariya/FastLZ), avec un minimum de 100 octets par transaction ([voir la spécification](https://specs.optimism.io/protocol/fjord/exec-engine.html)).

Cela modifie l'analyse dans le reste de cet article de trois manières :

1. Les octets nuls se compressent bien, ils sont donc presque gratuits.
   Les chiffres de 4 et 16 gaz par octet ci-dessous correspondent au coût des données d'appel sur L1, et non à ce que vous payez pour les données de transaction sur une chaîne OP Stack aujourd'hui.
2. En dessous du minimum de 100 octets, des données d'appel plus courtes ne permettent aucune économie.
   Par exemple, en octobre 2026 sur OP Mainnet, un `transfer` ERC-20 standard (68 octets de données d'appel) et la version courte de 23 octets de cet article auraient payé exactement les mêmes frais de données sur L1, le minimum, soit environ 1 gwei (10<sup>-9</sup> ETH).
3. L'espace des blobs étant bon marché, les frais d'exécution sur L2 sont désormais souvent plus élevés que les frais de données sur L1.
   À un prix du gaz sur L2 de 0,001 gwei, 1 000 gaz coûtent 1 gwei, soit le même montant que la totalité de ces frais de données sur L1, de sorte que le gaz d'exécution supplémentaire nécessaire pour passer par un contrat proxy peut coûter plus cher que les octets qu'il permet d'économiser.

Le principe reste valable : moins d'octets compressés signifie des frais de données sur L1 plus faibles.
Les ABI courtes sont particulièrement judicieuses pour les transactions contenant beaucoup de données qui se compressent mal, et sur les chaînes ou aux moments où les données sur L1 sont chères.
Pour voir ce qu'une transaction spécifique paierait, appelez `getL1Fee` sur le [pré-déploiement `GasPriceOracle`](https://specs.optimism.io/protocol/predeploys.html#gaspriceoracle) avec la transaction non signée.
Par exemple, en utilisant `cast` de [Foundry](https://getfoundry.sh/introduction/installation/) :

```sh
TX=$(cast mktx --raw-unsigned --from <your address> --chain 10 --nonce 0 --gas-limit 100000 \
  --priority-gas-price 1000000 --gas-price 1000000 <destination address> <calldata>)
cast call 0x420000000000000000000000000000000000000F "getL1Fee(bytes)(uint256)" $TX --rpc-url https://mainnet.optimism.io
```

Le résultat est en Wei.

### L'ABI {#the-abi}

La grande majorité des transactions accèdent à un contrat à partir d'un compte détenu en externe.
La plupart des contrats sont écrits en Solidity et interprètent leur champ de données selon [l'interface binaire d'application (ABI)](https://docs.soliditylang.org/en/latest/abi-spec.html#formal-specification-of-the-encoding).

Cependant, l'ABI a été conçue pour L1, où un octet de données d'appel coûte environ la même chose que quatre opérations arithmétiques, et non pour L2 où (aux prix de 2022) un octet de données d'appel coûte plus de mille opérations arithmétiques.
Les données d'appel sont divisées comme suit :

| Section             | Longueur | Octets | Octets gaspillés | Gaz gaspillé | Octets nécessaires | Gaz nécessaire |
| ------------------- | -------: | -----: | ---------------: | -----------: | -----------------: | -------------: |
| Sélecteur de fonction |      4 |   0-3 |                3 |           48 |                  1 |             16 |
| Zéros               |       12 |  4-15 |               12 |           48 |                  0 |              0 |
| Adresse de destination |    20 | 16-35 |                0 |            0 |                 20 |            320 |
| Montant             |       32 | 36-67 |               17 |           68 |                 15 |            240 |
| Total               |       68 |        |                  |          164 |                    |            576 |

Explication :

- **Sélecteur de fonction** : Le contrat a moins de 256 fonctions, nous pouvons donc les distinguer avec un seul octet.
  Ces octets sont généralement non nuls et par conséquent [coûtent seize gaz](https://eips.ethereum.org/EIPS/eip-2028).
- **Zéros** : Ces octets sont toujours nuls car une adresse de vingt octets ne nécessite pas un mot de trente-deux octets pour la contenir.
  Les octets qui contiennent zéro coûtent quatre gaz ([voir le livre jaune](https://ethereum.github.io/yellowpaper/paper.pdf), Annexe G,
  p. 27, la valeur pour `G`<sub>`txdatazero`</sub>).
- **Montant** : Si nous supposons que dans ce contrat `decimals` est de dix-huit (la valeur normale) et que le montant maximum de jetons que nous transférons sera de 10<sup>18</sup>, nous obtenons un montant maximum de 10<sup>36</sup>.
  256<sup>15</sup> &gt; 10<sup>36</sup>, donc quinze octets suffisent.

Un gaspillage de 164 gaz sur L1 est normalement négligeable. Une transaction coûte au moins [21 000 gaz](https://yakkomajuri.medium.com/blockchain-definition-of-the-week-ethereum-gas-2f976af774ed), donc 0,8 % supplémentaire n'a pas d'importance.
Cependant, sur L2 en 2022, les choses étaient différentes. Presque tout le coût de la transaction consistait à l'écrire sur L1.
En plus des données d'appel de la transaction, il y a 109 octets d'en-tête de transaction (adresse de destination, signature, etc.).
Le coût total est donc de `109*16+576+164=2484`, et nous en gaspillons environ 6,6 %.

## Réduire les coûts lorsque vous ne contrôlez pas la destination {#reducing-costs-when-you-dont-control-the-destination}

En supposant que vous n'ayez pas le contrôle sur le contrat de destination, vous pouvez toujours utiliser une solution similaire à [celle-ci](https://github.com/qbzzt/ethereum.org-20220330-shortABI).

Pour l'exécuter, vous avez besoin de [Node.js](https://nodejs.org/) et de git :

```sh
git clone https://github.com/qbzzt/ethereum.org-20220330-shortABI.git
cd ethereum.org-20220330-shortABI
npm install
npx hardhat test
```

Le test déploie les contrats sur le réseau local intégré de Hardhat, vous n'avez donc pas besoin d'ETH.
Le dépôt utilise Hardhat 2.9, donc sur les versions actuelles de Node.js, il avertit que votre version de Node.js n'est pas prise en charge, mais le test réussit quand même.

Passons en revue les fichiers pertinents.

### Token.sol {#token-sol}

[Il s'agit du contrat de destination](https://github.com/qbzzt/ethereum.org-20220330-shortABI/blob/master/contracts/Token.sol).
C'est un contrat ERC-20 standard, avec une fonctionnalité supplémentaire.
Cette fonction `faucet` permet à tout utilisateur d'obtenir des jetons à utiliser.
Cela rendrait un contrat ERC-20 de production inutile, mais cela facilite la vie lorsqu'un ERC-20 n'existe que pour faciliter les tests.

```solidity
    /**
     * @dev Donne à l'appelant 1000 jetons pour jouer
     */
    function faucet() external {
        _mint(msg.sender, 1000);
    }   // function faucet
```

### CalldataInterpreter.sol {#calldatainterpreter-sol}

[Il s'agit du contrat que les transactions sont censées appeler avec des données d'appel plus courtes](https://github.com/qbzzt/ethereum.org-20220330-shortABI/blob/master/contracts/CalldataInterpreter.sol).
Passons-le en revue ligne par ligne.

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

L'adresse du jeton pour lequel nous sommes un proxy.

```solidity

    /**
     * @dev Spécifie l'adresse du jeton
     * @param tokenAddr_ adresse du contrat ERC-20
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
            "calldataVal length limit is 32 bytes");

        require(length + startByte <= msg.data.length,
            "calldataVal trying to read beyond calldatasize");
```

Nous allons charger un seul mot de 32 octets (256 bits) en mémoire et supprimer les octets qui ne font pas partie du champ que nous voulons.
Cet algorithme ne fonctionne pas pour les valeurs de plus de 32 octets, et bien sûr, nous ne pouvons pas lire au-delà de la fin des données d'appel.
Sur L1, il pourrait être nécessaire d'ignorer ces tests pour économiser du gaz, mais sur L2, le gaz est extrêmement bon marché, ce qui permet d'effectuer toutes les vérifications de cohérence imaginables.

```solidity
        assembly {
            _retVal := calldataload(startByte)
        }
```

Nous aurions pu copier les données de l'appel vers `fallback()` (voir ci-dessous), mais il est plus facile d'utiliser [Yul](https://docs.soliditylang.org/en/v0.8.12/yul.html), le langage d'assemblage de l'EVM.

Ici, nous utilisons [le code d'opération CALLDATALOAD](https://www.evm.codes/#35) pour lire les octets `startByte` à `startByte+31` dans la pile.
En général, la syntaxe d'un code d'opération dans Yul est `<opcode name>(<first stack value, if any>,<second stack value, if any>...)`.

```solidity

        _retVal = _retVal >> (256-length*8);
```

Seuls les `length` octets les plus significatifs font partie du champ, nous effectuons donc un [décalage vers la droite](https://en.wikipedia.org/wiki/Logical_shift) pour nous débarrasser des autres valeurs.
Cela a l'avantage supplémentaire de déplacer la valeur vers la droite du champ, de sorte qu'il s'agit de la valeur elle-même plutôt que de la valeur multipliée par 256<sup>quelque chose</sup>.

```solidity

        return _retVal;
    }


    fallback() external {
```

Lorsqu'un appel à un contrat Solidity ne correspond à aucune des signatures de fonction, il appelle [la fonction `fallback()`](https://docs.soliditylang.org/en/v0.8.12/contracts.html#fallback-function) (en supposant qu'il y en ait une).
Dans le cas de `CalldataInterpreter`, _n'importe quel_ appel arrive ici car il n'y a pas d'autres fonctions `external` ou `public`.

```solidity
        uint _func;

        _func = calldataVal(0, 1);
```

Lire le premier octet des données d'appel, qui nous indique la fonction.
Il y a deux raisons pour lesquelles une fonction ne serait pas disponible ici :

1. Les fonctions qui sont `pure` ou `view` ne modifient pas l'état et ne coûtent pas de gaz (lorsqu'elles sont appelées hors chaîne).
   Il n'est pas logique d'essayer de réduire leur coût en gaz.
2. Les fonctions qui s'appuient sur [`msg.sender`](https://docs.soliditylang.org/en/v0.8.12/units-and-global-variables.html#block-and-transaction-properties).
   La valeur de `msg.sender` sera l'adresse de `CalldataInterpreter`, et non l'appelant.

Malheureusement, [en regardant les spécifications ERC-20](https://eips.ethereum.org/EIPS/eip-20), cela ne laisse qu'une seule fonction standard, `transfer` (car nous pouvons appeler `transferFrom`).
Notre jeton de test possède également `faucet`, que nous pouvons prendre en charge car nous pouvons transférer les jetons à la personne qui nous a appelés.

```solidity

        // Appelle les méthodes de changement d'état du jeton en utilisant
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

Après avoir appelé `token.faucet()`, nous obtenons des jetons. Cependant, en tant que contrat proxy, nous n'avons pas **besoin** de jetons.
L'EOA (compte détenu en externe) ou le contrat qui nous a appelés en a besoin.
Nous transférons donc tous nos jetons à la personne qui nous a appelés.

```solidity
        // transfert (en supposant que nous avons une allocation pour cela)
        if (_func == 2) {
```

Le transfert de jetons nécessite deux paramètres : l'adresse de destination et le montant.

```solidity
            token.transferFrom(
                msg.sender,
```

Nous n'autorisons les appelants à transférer que les jetons qu'ils possèdent

```solidity
                address(uint160(calldataVal(1, 20))),
```

L'adresse de destination commence à l'octet n° 1 (l'octet n° 0 est la fonction).
En tant qu'adresse, elle fait 20 octets de long.

```solidity
                calldataVal(21, 2)
```

Pour ce contrat particulier, nous supposons que le nombre maximum de jetons que quiconque voudrait transférer tient sur deux octets (moins de 65536).

```solidity
            );
        }
```

Dans l'ensemble, un transfert prend 23 octets de données d'appel :

| Section             | Longueur | Octets |
| ------------------- | -------: | -----: |
| Sélecteur de fonction |      1 |     0 |
| Adresse de destination |    20 |  1-20 |
| Montant             |      2 | 21-22 |

```solidity
    }   // fallback

}       // contract CalldataInterpreter
```

### test.js {#test-js}

[Ce test unitaire JavaScript](https://github.com/qbzzt/ethereum.org-20220330-shortABI/blob/master/test/test.js) nous montre comment utiliser ce mécanisme (et comment vérifier qu'il fonctionne correctement).
Je vais supposer que vous comprenez [chai](https://www.chaijs.com/) et [ethers](https://docs.ethers.org/v5/) et n'expliquer que les parties qui s'appliquent spécifiquement au contrat.

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
    // Obtenir des jetons pour jouer
    const faucetTx = {
```

Nous ne pouvons pas utiliser les fonctions de haut niveau que nous utiliserions normalement (telles que `token.faucet()`) pour créer des transactions, car nous ne suivons pas l'ABI.
Au lieu de cela, nous devons construire la transaction nous-mêmes, puis l'envoyer.

```javascript
      to: cdi.address,
      data: "0x01"
```

Il y a deux paramètres que nous devons fournir pour la transaction :

1. `to`, l'adresse de destination.
   Il s'agit du contrat interpréteur de calldata.
2. `data`, les calldata à envoyer.
   Dans le cas d'un appel au faucet, la donnée est un seul octet, `0x01`.

```javascript

    }
    await (await signer.sendTransaction(faucetTx)).wait()
```

Nous appelons [la méthode `sendTransaction` du signataire](https://docs.ethers.org/v5/api/signer/#Signer-sendTransaction) car nous avons déjà spécifié la destination (`faucetTx.to`) et nous avons besoin que la transaction soit signée.

```javascript
// Vérifier que le faucet fournit les jetons correctement
expect(await token.balanceOf(signer.address)).to.equal(1000)
```

Ici, nous vérifions le solde.
Il n'est pas nécessaire d'économiser du gaz sur les fonctions `view`, nous les exécutons donc normalement.

```javascript
// Donner au CDI une allocation (les approbations ne peuvent pas être mandatées)
const approveTX = await token.approve(cdi.address, 10000)
await approveTX.wait()
expect(await token.allowance(signer.address, cdi.address)).to.equal(10000)
```

Donner à l'interpréteur de calldata une allocation pour pouvoir effectuer des transferts.

```javascript
// Transfert de jetons
const destAddr = "0xf5a6ead936fb47f342bb63e676479bddf26ebe1d"
const transferTx = {
  to: cdi.address,
  data: "0x02" + destAddr.slice(2, 42) + "0100",
}
```

Créer une transaction de transfert. Le premier octet est « 0x02 », suivi de l'adresse de destination, et enfin du montant (0x0100, qui correspond à 256 en décimal).

```javascript
    await (await signer.sendTransaction(transferTx)).wait()

    // Vérifier que nous avons 256 jetons de moins
    expect (await token.balanceOf(signer.address)).to.equal(1000-256)

    // Et que notre destination les a reçus
    expect (await token.balanceOf(destAddr)).to.equal(256)
  })    // it
})      // describe
```

## Réduire le coût lorsque vous contrôlez le contrat de destination {#reducing-the-cost-when-you-do-control-the-destination-contract}

Si vous avez le contrôle sur le contrat de destination, vous pouvez créer des fonctions qui contournent les vérifications `msg.sender` car elles font confiance à l'interpréteur de données d'appel.
[Vous pouvez voir un exemple de la façon dont cela fonctionne ici, dans la branche `control-contract`](https://github.com/qbzzt/ethereum.org-20220330-shortABI/tree/control-contract).
Pour l'exécuter, passez à cette branche dans le dépôt que vous avez cloné précédemment et exécutez à nouveau le test :

```sh
git checkout control-contract
npx hardhat test
```

Si le contrat ne répondait qu'aux transactions externes, nous pourrions nous contenter d'un seul contrat.
Cependant, cela briserait la [composabilité](/developers/docs/smart-contracts/composability/).
Il est bien préférable d'avoir un contrat qui répond aux appels ERC-20 normaux, et un autre contrat qui répond aux transactions avec des données d'appel courtes.

### Token.sol {#token-sol-2}

Dans cet exemple, nous pouvons modifier `Token.sol`.
Cela nous permet d'avoir un certain nombre de fonctions que seul le proxy peut appeler.
Voici les nouvelles parties :

```solidity
    // La seule adresse autorisée à spécifier l'adresse du CalldataInterpreter
    address owner;

    // L'adresse du CalldataInterpreter
    address proxy = address(0);
```

Le contrat ERC-20 doit connaître l'identité du proxy autorisé.
Cependant, nous ne pouvons pas définir cette variable dans le constructeur, car nous n'en connaissons pas encore la valeur.
Ce contrat est instancié en premier car le proxy attend l'adresse du jeton dans son constructeur.

```solidity
    /**
     * @dev Appelle le constructeur ERC-20.
     */
    constructor(
    ) ERC20("Oris useless token-2", "OUT-2") {
        owner = msg.sender;
    }
```

L'adresse du créateur (appelée `owner`) est stockée ici car c'est la seule adresse autorisée à définir le proxy.

```solidity
    /**
     * @dev définit l'adresse pour le proxy (le CalldataInterpreter).
     * Ne peut être appelé qu'une seule fois par le propriétaire
     */
    function setProxy(address _proxy) external {
        require(msg.sender == owner, "Can only be called by owner");
        require(proxy == address(0), "Proxy is already set");

        proxy = _proxy;
    }    // function setProxy
```

Le proxy a un accès privilégié, car il peut contourner les contrôles de sécurité.
Pour nous assurer que nous pouvons faire confiance au proxy, nous ne laissons que `owner` appeler cette fonction, et une seule fois.
Une fois que `proxy` a une valeur réelle (non nulle), cette valeur ne peut pas changer, donc même si le propriétaire décide de devenir malveillant, ou si sa phrase mnémonique est révélée, nous sommes toujours en sécurité.

```solidity
    /**
     * @dev Certaines fonctions ne peuvent être appelées que par le proxy.
     */
    modifier onlyProxy {
```

Il s'agit d'une [fonction `modifier`](https://www.tutorialspoint.com/solidity/solidity_function_modifiers.htm), elle modifie le fonctionnement des autres fonctions.

```solidity
      require(msg.sender == proxy);
```

Tout d'abord, vérifier que nous avons été appelés par le proxy et par personne d'autre.
Sinon, `revert`.

```solidity
      _;
    }
```

Si c'est le cas, exécuter la fonction que nous modifions.

```solidity
   /* Fonctions qui permettent au proxy de servir réellement de proxy pour les comptes */

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

Ce sont trois opérations qui nécessitent normalement que le message provienne directement de l'entité transférant des jetons ou approuvant une allocation.
Ici, nous avons une version proxy de ces opérations qui :

1. Est modifiée par `onlyProxy()` afin que personne d'autre ne soit autorisé à les contrôler.
2. Obtient l'adresse qui serait normalement `msg.sender` comme paramètre supplémentaire.

### CalldataInterpreter.sol {#calldatainterpreter-sol-2}

L'interpréteur de calldata est presque identique à celui ci-dessus, à l'exception que les fonctions mandatées reçoivent un paramètre `msg.sender` et qu'il n'y a pas besoin d'allocation pour `transfer`.

```solidity
        // transfert (pas besoin d'allocation)
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

Il y a quelques changements entre le code de test précédent et celui-ci.

```js
const Cdi = await ethers.getContractFactory("CalldataInterpreter")
const cdi = await Cdi.deploy(token.address)
await cdi.deployed()
await token.setProxy(cdi.address)
```

Nous devons indiquer au contrat ERC-20 à quel proxy faire confiance

```js
console.log("CalldataInterpreter addr:", cdi.address)

// Besoin de deux signataires pour vérifier les allocations
const signers = await ethers.getSigners()
const signer = signers[0]
const poorSigner = signers[1]
```

Pour vérifier `approve()` et `transferFrom()`, nous avons besoin d'un deuxième signataire.
Nous l'appelons `poorSigner` car il ne reçoit aucun de nos jetons (il doit cependant avoir de l'ETH, bien sûr).

```js
// Transfert de jetons
const destAddr = "0xf5a6ead936fb47f342bb63e676479bddf26ebe1d"
const transferTx = {
  to: cdi.address,
  data: "0x02" + destAddr.slice(2, 42) + "0100",
}
await (await signer.sendTransaction(transferTx)).wait()
```

Parce que le contrat ERC-20 fait confiance au proxy (`cdi`), nous n'avons pas besoin d'une allocation pour relayer les transferts.

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

// Vérifier que la combinaison approve / transferFrom a été effectuée correctement
expect(await token.balanceOf(destAddr2)).to.equal(255)
```

Tester les deux nouvelles fonctions.
Notez que `transferFromTx` nécessite deux paramètres d'adresse : le donneur de l'allocation et le receveur.

## Conclusion {#conclusion}

[Optimism](https://docs.optimism.io/op-stack/transactions/fees#fjord) et [Arbitrum](https://docs.arbitrum.io/how-arbitrum-works/deep-dives/gas-and-fees) compressent désormais tous deux les données qu'ils écrivent sur L1, et facturent chaque transaction en fonction de sa taille compressée, afin de réduire le coût des transactions.
Cependant, en tant que fournisseurs d'infrastructure à la recherche de solutions génériques, nos capacités sont limitées.
En tant que développeur de dapp, vous avez des connaissances spécifiques à l'application, ce qui vous permet d'optimiser vos données d'appel bien mieux que nous ne pourrions le faire dans une solution générique.
Nous espérons que cet article vous aidera à trouver la solution idéale pour vos besoins.

[Voir ici pour plus de mon travail](https://cryptodocguy.pro/).

