---
title: Créer et déployer une application DeFi
description: Déposez des jetons ERC20 dans le contrat intelligent et générez des jetons Farm
author: "strykerin"
tags:
  - "solidity"
  - "DeFi"
  - "web3.js"
  - "truffle"
  - "ganache"
  - "contrats intelligents"
skill: intermediate
lang: fr
published: 2020-12-31
source: github.com
sourceUrl: https://github.com/strykerin/DeFi-Token-Farm
---

Dans ce tutoriel, nous allons créer une application DeFi avec Solidity dans laquelle les utilisateurs peuvent déposer un jeton ERC20 dans le contrat intelligent et ce jeton va générer et leur transférer des jetons Farm. Par la suite, les utilisateurs pourront retirer leurs jetons ERC20 en brûlant leur jeton Farm sur un contrat intelligent et les jetons ERC20 leur seront transférés en retour.

## Installer Truffle et Ganache {#install-truffle-and-ganache}

Si c'est votre première création de contrat intelligent, il vous faudra configurer votre environnement. Nous allons utiliser deux outils : [Truffle](https://www.trufflesuite.com/) et [Ganache](https://www.trufflesuite.com/ganache).

Truffle est un environnement de développement et un framework de test pour l'établissement de contrats intelligents pour Ethereum. Avec Truffle, il est facile de créer et de déployer des contrats intelligents sur la blockchain. Ganache permet de créer une blockchain Ethereum locale afin de tester les contrats intelligents. Il simule les fonctionnalités du réseau réel et les 10 premiers comptes sont financés avec 100 éther de test, rendant ainsi le déploiement et le test du contrat intelligent gratuit et facile. Ganache est disponible en tant qu'application de bureau et outil de ligne de commande. Pour cet article nous allons utiliser l'application UI Desktop.

![Application de bureau pour utilisateur Ganache (Ganache UI)](https://cdn-images-1.medium.com/max/2360/1*V1iQ5onbLbT5Ib2QaiOSyg.png)_Application de bureau pour utilisateur Ganache_

Pour créer notre projet, exécutez les commandes suivantes :

```bash
mkdir your-project-name
cd your-project-name
truffle init
```

Cela créera un projet vide pour l'établissement et le déploiement de nos contrats intelligents. La structure du projet créée est la suivante :

- `test` : Dossier des contrats intelligents Solidity

- `migrations` : Dossier des scripts de déploiement

- `test` : Dossier pour tester nos contrats intelligents

- `truffle-config.js` : Fichier de configuration Truffle

## Créer un jeton ERC20 {#create-the-erc20-token}

Nous devons premièrement créer notre jeton ERC20 que nous miserons dans le contrat intelligent. Pour créer notre jeton fongible, nous devrons commencer par installer la bibliothèque OpenZeppelin. Cette bibliothèque contient les implémentations de normes telles qu'ERC20 et ERC721. Pour l'installer, exécutez la commande :

```bash
npm install @openzeppelin/contracts
```

En utilisant la bibliothèque OpenZeppelin nous pouvons créer notre jeton ERC20 en écrivant sur `contracts/MyToken.sol` avec le code de Solidity suivant :

```solidity
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MyToken is ERC20 {
    constructor() public ERC20("MyToken", "MTKN"){
        _mint(msg.sender, 1000000000000000000000000);
    }
}
```

Dans le code ci-dessus à la :

- Ligne 3 : Nous importons le contrat ERC20.sol depuis openzeppelin qui contient l'implémentation de la norme de ce jeton.

- Ligne 5 : Nous héritons du contrat ERC20.sol.

- Ligne 6 : Nous appelons le constructeur ERC20.sol et passons le nom et les paramètres du symbole respectivement en tant que `"MyToken"` et `"MTKN"`.

- Ligne 7 : Nous générons et transférons 1 million de jetons pour le compte qui déploie le contrat intelligent (nous utilisons les 18 décimales par défaut pour le jeton ERC20, ce qui signifie que si nous voulons générer 1 jeton, il se présentera sous la forme 1000000000000000000, 1 avec 18 zéros).

Nous pouvons voir ci-dessous l'implémentation du constructeur ERC20.sol où le champ `_decimals` est défini à 18 :

```solidity
string private _name;
string private _symbol;
uint8 private _decimals;

constructor (string memory name_, string memory symbol_) public {
    _name = name_;
    _symbol = symbol_;
    _decimals = 18;
}
```

## Compiler le jeton ERC20 {#compile-the-erc20-token}

Pour compiler notre contrat intelligent, nous devons d'abord vérifier notre version du compilateur de Solidity. Vous pouvez la vérifier en exécutant la commande :

```bash
truffle version
```

La version par défaut est la version `Solidity v0.5.16`. Puisque notre jeton est écrit en utilisant la version Solidity `0.6.2`, si nous exécutons la commande pour compiler nos contrats, nous allons générer une erreur de compilation. Afin de spécifier quelle version de compilateur Solidity utiliser, allez dans le fichier `truffle-config.js` et définissez la version désirée du compilateur comme ci-dessous :

```javascript
// Configure your compilers
compilers: {
  solc: {
    version: "^0.8.0",    // Fetch exact version from solc-bin (default: truffle's version)
    // docker: true,        // Use "0.5.1" you've installed locally with docker (default: false)
    // settings: {          // See the solidity docs for advice about optimization and evmVersion
    //  optimizer: {
    //    enabled: false,
    //    runs: 200
    //  },
    //  evmVersion: "byzantium"
    // }
  }
}
```

Maintenant, nous pouvons compiler notre contrat intelligent en exécutant la commande suivante :

```bash
truffle compile
```

## Déployer le jeton ERC20 {#deploy-erc20-token}

Après la compilation, nous pouvons maintenant déployer notre jeton.

Dans le dossier `migrations`, créez un fichier appelé `2_deploy_Tokens.js`. Ce fichier est l'endroit où nous allons déployer à la fois notre jeton ERC20 et notre contrat intelligent FarmToken. Le code ci-dessous est utilisé pour déployer notre contrat MyToken.sol :

```javascript
const MyToken = artifacts.require("MyToken")

module.exports = async function (deployer, network, accounts) {
  // Deploy MyToken
  await deployer.deploy(MyToken)
  const myToken = await MyToken.deployed()
}
```

Ouvrez Ganache et sélectionnez l'option "Quickstart" pour démarrer une blockchain Ethereum en local. Pour déployer notre contrat, lancez :

```bash
truffle migrate
```

L'adresse utilisée pour déployer nos contrats est la première de la liste d'adresses que Ganache nous indique. Pour vérifier, nous pouvons ouvrir l'application de bureau Ganache et ainsi vérifier que le solde d'ether pour le premier compte a été réduit en raison du coût d'ether pour déployer nos contrats intelligents :

![Application de bureau Ganache](https://cdn-images-1.medium.com/max/2346/1*1iJ9VRlyLuza58HL3DLfpg.png)_Application de bureau Ganache_

Pour vérifier que 1 million de jetons MyToken ont été envoyés à l'adresse de déploiement, nous pouvons utiliser la console Truffle pour interagir avec notre contrat intelligent déployé.

> [Truffle Console est une console interactive de base qui se connecte à n'importe quel client Ethereum.](https://www.trufflesuite.com/docs/truffle/getting-started/using-truffle-develop-and-the-console)

Afin d'interagir avec notre contrat intelligent, exécutez la commande suivante :

```bash
truffle console
```

Nous pouvons maintenant écrire les commandes suivantes dans le terminal :

- Récupère le contrat intelligent : `myToken = await MyToken.deployed()`

- Récupère le tableau de comptes depuis Ganache : `accounts = await web3.eth.getAccounts()`

- Récupère le solde pour le premier compte : `balance = await myToken.balanceOf(accounts[0])`

- Formate le solde à partir de 18 décimales : `web3.utils.fromWei(balance.toString())`

En exécutant les commandes ci-dessus, nous constatons que la première adresse a en fait 1 million de MyTokens :

![Première adresse à 1 000 000 MyTokens](https://cdn-images-1.medium.com/max/2000/1*AQlj9A7dw-qtY4QAD3Bpxw.png)

_La première adresse dispose de 1 000 000 de MyTokens_

## Créer un Contrat Intelligent FarmToken {#create-farmtoken-smart-contract}

Le contrat intelligent FarmToken aura 3 fonctions :

- `balance()` : Transférer le solde de MyToken sur le contrat intelligent FarmToken.

- `deposit(uint256 _amount)` : Transférer MyToken pour le compte de l'utilisateur sur le Contrat Intelligent FarmToken puis frapper et transférer FarmToken à l'utilisateur.

- `withdraw(uint256 _amount)` : Brûler les FarmTokens de l'utilisateur et transférer MyTokens à l'adresse de l'utilisateur.

Jetons un œil au constructeur FarmToken :

```solidity
pragma solidity ^0.6.2;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/Address.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract FarmToken is ERC20 {
    using Address for address;
    using SafeMath for uint256; // As of Solidity v0.8.0, mathematical operations can be done safely without the need for SafeMath
    using SafeERC20 for IERC20;

    IERC20 public token;

    constructor(address _token)
        public
        ERC20("FarmToken", "FRM")
    {
        token = IERC20(_token);
    }
```

- Lignes 3-6 : Nous importons depuis openzeppelin les contrats suivants : IERC20.sol, Address.sol, SafeERC20.sol et ERC20.sol.

- Ligne 8 : Le FarmToken héritera du contrat ERC20.

- Lignes 14-19 : Le constructeur FarmToken recevra comme paramètre l'adresse du contrat MyToken et nous attribuerons son contrat à notre variable publique appelée `token`.

Implémentons la fonction `balance()`. Elle ne recevra aucun paramètre et retournera le solde de MyToken sur ce contrat intelligent. Il s'implémente comme indiqué ci-dessous :

```solidity
function balance() public view returns (uint256) {
    return token.balanceOf(address(this));
}
```

Pour la fonction `deposit(uint256 _amount)`, il recevra comme paramètre le montant que l'utilisateur veut déposer et il frappera et transférera FarmTokens à l'utilisateur :

```solidity
function deposit(uint256 _amount) public {
    // Amount must be greater than zero
    require(_amount > 0, "amount cannot be 0");

    // Transfer MyToken to smart contract
    token.safeTransferFrom(msg.sender, address(this), _amount);

    // Mint FarmToken to msg sender
    _mint(msg.sender, _amount);
}
```

Pour la fonction `withdraw(uint256 _amount)`, nous recevrons comme paramètre la quantité de FarmTokens que l'utilisateur veut brûler, puis transférerons la même quantité de MyTokens à l'utilisateur :

```solidity
function withdraw(uint256 _amount) public {
    // Burn FarmTokens from msg sender
    _burn(msg.sender, _amount);

    // Transfer MyTokens from this smart contract to msg sender
    token.safeTransfer(msg.sender, _amount);
}
```

Nous allons maintenant déployer notre contrat intelligent. Pour ce faire, nous retournerons au fichier `2_deploy_Tokens.js` et ajouterons le nouveau contrat à déployer :

```javascript
const MyToken = artifacts.require("MyToken")
const FarmToken = artifacts.require("FarmToken")

module.exports = async function (deployer, network, accounts) {
  // Deploy MyToken
  await deployer.deploy(MyToken)
  const myToken = await MyToken.deployed()

  // Deploy Farm Token
  await deployer.deploy(FarmToken, myToken.address)
  const farmToken = await FarmToken.deployed()
}
```

Notez que lors du déploiement du FarmToken, nous passons comme paramètre l'adresse du contrat MyToken déployé.

Exécutez maintenant `truffle compile` et `truffle migrate` pour déployer nos contrats.

Testons notre contrat intelligent. Au lieu d'utiliser la `console truffle` pour interagir avec notre contrat intelligent, nous allons créer un script pour automatiser ce processus. Créez un dossier appelé `scripts` et ajoutez le fichier suivant `getMyTokenBalance.js`. Il vérifiera le solde de MyTokens sur le contrat intelligent FarmToken :

```javascript
const MyToken = artifacts.require("MyToken")
const FarmToken = artifacts.require("FarmToken")

module.exports = async function (callback) {
  myToken = await MyToken.deployed()
  farmToken = await FarmToken.deployed()
  balance = await myToken.balanceOf(farmToken.address)
  console.log(web3.utils.fromWei(balance.toString()))
  callback()
}
```

Pour exécuter ce script, exécutez la commande suivante :

```bash
truffle exec .\scripts\getMyTokenBalance.js
```

Nous obtiendrons le résultat attendu qui est 0. Si vous avez comme message d'erreur que FarmToken n'est pas encore déployé, cela signifie que le réseau truffle n'a pas reçu la dernière version du code du contrat. Fermez tout simplement ganache, démarrez-le à nouveau et veillez à exécuter `truffle migrate`.

Maintenant, misons MyToken sur le contrat intelligent. Dès lors que la fonction `deposit(uint256 _amount)` appelle la fonction `safeTransferFrom` de l'ERC20, l'utilisateur doit d'abord approuver le contrat intelligent pour transférer MyToken en nom et place de l'utilisateur. Donc, sur le script ci-dessous, nous allons d'abord approuver cette étape puis nous appellerons la fonction :

```javascript
const MyToken = artifacts.require("MyToken")
const FarmToken = artifacts.require("FarmToken")

module.exports = async function (callback) {
  const accounts = await new web3.eth.getAccounts()
  const myToken = await MyToken.deployed()
  const farmToken = await FarmToken.deployed()

  // Returns the remaining number of tokens that spender will be allowed to spend on behalf of owner through transferFrom.
  // This is zero by default.
  const allowanceBefore = await myToken.allowance(
    accounts[0],
    farmToken.address
  )
  console.log(
    "Amount of MyToken FarmToken is allowed to transfer on our behalf Before: " +
      allowanceBefore.toString()
  )

  // In order to allow the Smart Contract to transfer to MyToken (ERC-20) on the accounts[0] behalf,
  // we must explicitly allow it.
  // We allow farmToken to transfer x amount of MyToken on our behalf
  await myToken.approve(farmToken.address, web3.utils.toWei("100", "ether"))

  // Validate that the farmToken can now move x amount of MyToken on our behalf
  const allowanceAfter = await myToken.allowance(accounts[0], farmToken.address)
  console.log(
    "Amount of MyToken FarmToken is allowed to transfer on our behalf After: " +
      allowanceAfter.toString()
  )

  // Verify accounts[0] and farmToken balance of MyToken before and after the transfer
  balanceMyTokenBeforeAccounts0 = await myToken.balanceOf(accounts[0])
  balanceMyTokenBeforeFarmToken = await myToken.balanceOf(farmToken.address)
  console.log("*** My Token ***")
  console.log(
    "Balance MyToken Before accounts[0] " +
      web3.utils.fromWei(balanceMyTokenBeforeAccounts0.toString())
  )
  console.log(
    "Balance MyToken Before TokenFarm " +
      web3.utils.fromWei(balanceMyTokenBeforeFarmToken.toString())
  )

  console.log("*** Farm Token ***")
  balanceFarmTokenBeforeAccounts0 = await farmToken.balanceOf(accounts[0])
  balanceFarmTokenBeforeFarmToken = await farmToken.balanceOf(farmToken.address)
  console.log(
    "Balance FarmToken Before accounts[0] " +
      web3.utils.fromWei(balanceFarmTokenBeforeAccounts0.toString())
  )
  console.log(
    "Balance FarmToken Before TokenFarm " +
      web3.utils.fromWei(balanceFarmTokenBeforeFarmToken.toString())
  )
  // Call Deposit function from FarmToken
  console.log("Call Deposit Function")
  await farmToken.deposit(web3.utils.toWei("100", "ether"))
  console.log("*** My Token ***")
  balanceMyTokenAfterAccounts0 = await myToken.balanceOf(accounts[0])
  balanceMyTokenAfterFarmToken = await myToken.balanceOf(farmToken.address)
  console.log(
    "Balance MyToken After accounts[0] " +
      web3.utils.fromWei(balanceMyTokenAfterAccounts0.toString())
  )
  console.log(
    "Balance MyToken After TokenFarm " +
      web3.utils.fromWei(balanceMyTokenAfterFarmToken.toString())
  )

  console.log("*** Farm Token ***")
  balanceFarmTokenAfterAccounts0 = await farmToken.balanceOf(accounts[0])
  balanceFarmTokenAfterFarmToken = await farmToken.balanceOf(farmToken.address)
  console.log(
    "Balance FarmToken After accounts[0] " +
      web3.utils.fromWei(balanceFarmTokenAfterAccounts0.toString())
  )
  console.log(
    "Balance FarmToken After TokenFarm " +
      web3.utils.fromWei(balanceFarmTokenAfterFarmToken.toString())
  )

  // End function
  callback()
}
```

Pour exécuter ce script : `truffle exec .\scripts\transferMyTokenToFarmToken.js`. Vous devriez voir sur votre console :

![sortie de transferMyTokenToFarmToken.js](https://cdn-images-1.medium.com/max/2000/1*MoekE2QCw7vB98u5dl7ang.png)

_sortie de transferMyTokenToFarmToken.js_

Comme nous pouvons le voir, nous avons déposé avec succès MyTokens sur le contrat intelligent car le premier compte est maintenant associé à FarmTokens.

Afin de retirer :

```javascript
const MyToken = artifacts.require("MyToken")
const FarmToken = artifacts.require("FarmToken")

module.exports = async function (callback) {
  const accounts = await new web3.eth.getAccounts()
  const myToken = await MyToken.deployed()
  const farmToken = await FarmToken.deployed()

  // Verify accounts[0] and farmToken balance of MyToken before and after the transfer
  balanceMyTokenBeforeAccounts0 = await myToken.balanceOf(accounts[0])
  balanceMyTokenBeforeFarmToken = await myToken.balanceOf(farmToken.address)
  console.log("*** My Token ***")
  console.log(
    "Balance MyToken Before accounts[0] " +
      web3.utils.fromWei(balanceMyTokenBeforeAccounts0.toString())
  )
  console.log(
    "Balance MyToken Before TokenFarm " +
      web3.utils.fromWei(balanceMyTokenBeforeFarmToken.toString())
  )

  console.log("*** Farm Token ***")
  balanceFarmTokenBeforeAccounts0 = await farmToken.balanceOf(accounts[0])
  balanceFarmTokenBeforeFarmToken = await farmToken.balanceOf(farmToken.address)
  console.log(
    "Balance FarmToken Before accounts[0] " +
      web3.utils.fromWei(balanceFarmTokenBeforeAccounts0.toString())
  )
  console.log(
    "Balance FarmToken Before TokenFarm " +
      web3.utils.fromWei(balanceFarmTokenBeforeFarmToken.toString())
  )

  // Call Deposit function from FarmToken
  console.log("Call Withdraw Function")
  await farmToken.withdraw(web3.utils.toWei("100", "ether"))

  console.log("*** My Token ***")
  balanceMyTokenAfterAccounts0 = await myToken.balanceOf(accounts[0])
  balanceMyTokenAfterFarmToken = await myToken.balanceOf(farmToken.address)
  console.log(
    "Balance MyToken After accounts[0] " +
      web3.utils.fromWei(balanceMyTokenAfterAccounts0.toString())
  )
  console.log(
    "Balance MyToken After TokenFarm " +
      web3.utils.fromWei(balanceMyTokenAfterFarmToken.toString())
  )

  console.log("*** Farm Token ***")
  balanceFarmTokenAfterAccounts0 = await farmToken.balanceOf(accounts[0])
  balanceFarmTokenAfterFarmToken = await farmToken.balanceOf(farmToken.address)
  console.log(
    "Balance FarmToken After accounts[0] " +
      web3.utils.fromWei(balanceFarmTokenAfterAccounts0.toString())
  )
  console.log(
    "Balance FarmToken After TokenFarm " +
      web3.utils.fromWei(balanceFarmTokenAfterFarmToken.toString())
  )

  // End function
  callback()
}
```

Pour exécuter ce script : `truffle exec .\scripts\transferMyTokenToFarmToken.js`. Comme nous pouvons le constater avec l'exemple ci-dessous, nous avons réussi à récupérer les MyTokens et nous avons supprimé les FarmTokens :

![sortie de withdrawMyTokenFromTokenFarm.js](https://cdn-images-1.medium.com/max/2000/1*jHYlTFg0NgGbhASpsRvc0w.png)

_sortie de withdrawMyTokenFromTokenFarm.js_

## Références {#references}

[Contrats - Documentation OpenZeppelin](https://docs.openzeppelin.com/contracts/3.x/)

[Outils Sympas pour contrats intelligents | Suite Truffle](https://www.trufflesuite.com/)

[Ganache | Suite Truffle](https://www.trufflesuite.com/ganache)

[Qu'est-ce que DeFi ? Guide du débutant (mise à jour 2021) (99bitcoins.com)](https://99bitcoins.com/what-is-defi/)

[DeFi - Le classement de la finance décentralisée sur DeFi Llama](https://defillama.com/)
