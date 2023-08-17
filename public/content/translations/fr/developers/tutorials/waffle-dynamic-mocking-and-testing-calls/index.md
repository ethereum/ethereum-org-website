---
title: "Waffle: Bouchonnage dynamique et tests de contrats"
description: Tutoriel Waffle avancé pour utiliser le bouchonnage dynamique et tester les appels de contrat
author: "Daniel Izdebski"
tags:
  - "waffle"
  - "contrats intelligents"
  - "solidity"
  - "test"
  - "bouchonnage"
skill: intermediate
lang: fr
published: 2020-11-14
---

## À quoi sert ce tutoriel ? {#what-is-this-tutorial-about}

Dans ce tutoriel, vous apprendrez comment :

- utiliser le bouchonnage dynamique
- tester les interactions entre contrats intelligents

Prérequis :

- vous savez déjà écrire un simple contrat intelligent en `Solidity`
- vous vous débrouillez en `JavaScript` et en `TypeScript`
- vous avez fait d'autres tutoriels `Waffle` ou vous connaissez deux ou trois choses à ce sujet

## Bouchonnage dynamique {#dynamic-mocking}

Pourquoi le bouchonnage dynamique est-il utile ? Eh bien, il nous permet de rédiger des tests unitaires plutôt que des tests d'intégration. Qu'est-ce que cela signifie ? Cela signifie que nous n'avons pas à nous soucier des dépendances des contrats intelligents, donc que nous pouvons tous les tester de façon isolée. Laissez-moi vous montrer comment procéder.

### **1. Projet** {#1-project}

Avant de commencer, nous avons besoin de préparer un simple projet node.js :

```bash
mkdir dynamic-mocking
cd dynamic-mocking
mkdir contracts src

yarn init
# or if you're using npm
npm init
```

Commençons par ajouter typescript et les dépendances de test - mocha & chai :

```bash
yarn add --dev @types/chai @types/mocha chai mocha ts-node typescript
# or if you're using npm
npm install @types/chai @types/mocha chai mocha ts-node typescript --save-dev
```

Maintenant, ajoutons `Waffle` et `ethers`:

```bash
yarn add --dev ethereum-waffle ethers
# or if you're using npm
npm install ethereum-waffle ethers --save-dev
```

La structure de votre projet devrait ressembler à ceci :

```
.
├── contracts
├── package.json
└── test
```

### **2. Contrat intelligent** {#2-smart-contract}

Pour démarrer un bouchonnage dynamique, nous avons besoin d'un contrat intelligent avec des dépendances. Ne t'inquiètes pas, nous assurons tes arrières !

Voici un contrat intelligent simple écrit en `Solidity` dont le seul but est de vérifier si nous sommes riches. Il utilise un jeton ERC20 pour vérifier si nous avons suffisamment de jetons. Mettez-le dans `./contracts/AmIRichAlready.sol`.

```solidity
pragma solidity ^0.6.2;

interface IERC20 {
    function balanceOf(address account) external view returns (uint256);
}

contract AmIRichAlready {
    IERC20 private tokenContract;
    uint public richness = 1000000 * 10 ** 18;

    constructor (IERC20 _tokenContract) public {
        tokenContract = _tokenContract;
    }

    function check() public view returns (bool) {
        uint balance = tokenContract.balanceOf(msg.sender);
        return balance > richness;
    }
}
```

Comme nous voulons utiliser le bouchonnage dynamique, nous n'avons pas besoin de tout l'ERC20, c'est pourquoi nous utilisons l'interface IERC20 avec une seule fonction.

Il est temps de créer ce contrat ! Pour cela, nous utiliserons le `Waffle`. Tout d'abord, nous allons créer un simple fichier de configuration `waffle.json` qui spécifie les options de compilation.

```json
{
  "compilerType": "solcjs",
  "compilerVersion": "0.6.2",
  "sourceDirectory": "./contracts",
  "outputDirectory": "./build"
}
```

Nous sommes désormais prêts à construire le contrat avec Waffle :

```bash
npx waffle
```

Facile, n'est-ce pas? Dans le dossier `build/`, deux fichiers correspondant au contrat et à l'interface apparaissent. Nous les utiliserons plus tard pour les tests.

### **3. Tests** {#3-testing}

Nous allons créer un fichier appelé `AmIRichAlready.test.ts` pour le test actuel. Tout d'abord, nous devons gérer les importations. Nous en aurons besoin pour plus tard:

```typescript
import { expect, use } from "chai"
import { Contract, utils, Wallet } from "ethers"
import {
  deployContract,
  deployMockContract,
  MockProvider,
  solidity,
} from "ethereum-waffle"
```

Sauf pour les dépendances JS, nous devons importer le contrat et l'interface précédemment créés :

```typescript
import IERC20 from "../build/IERC20.json"
import AmIRichAlready from "../build/AmIRichAlready.json"
```

Waffle utilise `chai` pour le test. Cependant, avant de pouvoir l'utiliser, nous devons injecter les matchers de Waffle dans le chai lui-même :

```typescript
use(solidity)
```

Nous devons implémenter la fonction `beforeEach()` qui réinitialisera l'état du contrat avant chaque test. Réfléchissons d'abord à ce dont nous avons besoin. Pour déployer un contrat, nous avons besoin de deux choses: un wallet et un contrat ERC20 déployé pour le passer comme argument pour le contrat `AmIRichAlready`.

Premièrement, créons nous un portefeuille:

```typescript
const [wallet] = new MockProvider().getWallets()
```

Ensuite, nous devons déployer un contrat ERC20. Voici la partie délicate - nous n'avons qu'une seule interface. C'est la partie où Waffle vient nous sauver. Waffle a une fonction magique `deployMockContract()` qui crée un contrat en utilisant uniquement le _abi_ de l'interface :

```typescript
const mockERC20 = await deployMockContract(wallet, IERC20.abi)
```

Maintenant, avec le wallet et l'ERC20 déployé, nous pouvons continuer et déployer le contrat `AmIRichAlready`:

```typescript
const contract = await deployContract(wallet, AmIRichAlready, [
  mockERC20.address,
])
```

Avec tout cela, notre fonction `beforeEach()` est terminée. Pour l'instant, votre fichier `AmIRichAlready.test.ts` devrait ressembler à ceci :

```typescript
import { expect, use } from "chai"
import { Contract, utils, Wallet } from "ethers"
import {
  deployContract,
  deployMockContract,
  MockProvider,
  solidity,
} from "ethereum-waffle"

import IERC20 from "../build/IERC20.json"
import AmIRichAlready from "../build/AmIRichAlready.json"

use(solidity)

describe("Am I Rich Already", () => {
  let mockERC20: Contract
  let contract: Contract
  let wallet: Wallet

  beforeEach(async () => {
    ;[wallet] = new MockProvider().getWallets()
    mockERC20 = await deployMockContract(wallet, IERC20.abi)
    contract = await deployContract(wallet, AmIRichAlready, [mockERC20.address])
  })
})
```

Écrivons le premier test pour le contrat `AmIRichalready`. De quoi pensez-vous que notre test devrait traiter? Ouais, vous avez raison! Nous devrions vérifier si nous sommes déjà riches :)

Mais attendez une seconde. Comment notre contrat fictif saura-t-il quelles valeurs retourner? Nous n'avons implémenté aucune logique pour la fonction `balanceOf()`. Là encore, Waffle peut nous aider. Notre contrat fictif a de nouveaux trucs fantaisistes maintenant :

```typescript
await mockERC20.mock.<nameOfMethod>.returns(<value>)
await mockERC20.mock.<nameOfMethod>.withArgs(<arguments>).returns(<value>)
```

Avec cette connaissance, nous pouvons enfin écrire notre premier test :

```typescript
it("returns false if the wallet has less than 1000000 tokens", async () => {
  await mockERC20.mock.balanceOf.returns(utils.parseEther("999999"))
  expect(await contract.check()).to.be.equal(false)
})
```

Décomposons ce test en parties :

1. Nous avons fixé notre contrat fictif ERC20 pour toujours retourner le solde de 999999 jetons.
2. Vérifiez si la méthode `contract.check()` retourne `false`.

Nous sommes prêts à allumer la bête :

![Un test réussi](test-one.png)

Alors le test fonctionne, mais... il y a encore des choses à améliorer. La fonction `balanceOf()` retournera toujours 99999. Nous pouvons l'améliorer en spécifiant un portefeuille pour lequel la fonction devrait retourner quelque chose - tout comme un contrat réel :

```typescript
it("returns false if the wallet has less than 1000001 tokens", async () => {
  await mockERC20.mock.balanceOf
    .withArgs(wallet.address)
    .returns(utils.parseEther("999999"))
  expect(await contract.check()).to.be.equal(false)
})
```

Jusqu'à présent, nous avons testé seulement le cas où nous ne sommes pas assez riche. Essayons l'inverse:

```typescript
it("returns true if the wallet has at least 1000001 tokens", async () => {
  await mockERC20.mock.balanceOf
    .withArgs(wallet.address)
    .returns(utils.parseEther("1000001"))
  expect(await contract.check()).to.be.equal(true)
})
```

Vous exécutez les tests...

![Deux tests réussis](test-two.png)

Et voici où tu en es! Notre contrat semble fonctionner comme prévu :)

## Test des appels de contrat {#testing-contract-calls}

Résumons ce qui a été fait jusqu'à présent. Nous avons testé la fonctionnalité de notre contrat `AmIRichalready` et il semble qu'il fonctionne correctement. Cela signifie que nous avons terminé, n'est-ce pas? Pas exactement ! Waffle nous permet de tester encore plus notre contrat. Mais comment exactement ? Eh bien, dans l'arsenal de Waffle, il y a une correspondance entre `calledOnContract()` et `calledOnContractWith()`. Cela va nous permettre de vérifier si notre contrat a appelé le contrat fictif ERC20. Voici un test de base avec l'une de ces correspondance:

```typescript
it("checks if contract called balanceOf on the ERC20 token", async () => {
  await mockERC20.mock.balanceOf.returns(utils.parseEther("999999"))
  await contract.check()
  expect("balanceOf").to.be.calledOnContract(mockERC20)
})
```

Nous pouvons aller encore plus loin et améliorer ce test avec l'autre matcher dont nous vous avons parlé:

```typescript
it("checks if contract called balanceOf with certain wallet on the ERC20 token", async () => {
  await mockERC20.mock.balanceOf
    .withArgs(wallet.address)
    .returns(utils.parseEther("999999"))
  await contract.check()
  expect("balanceOf").to.be.calledOnContractWith(mockERC20, [wallet.address])
})
```

Vérifions si les tests sont corrects :

![Trois tests réussis](test-three.png)

Super, tous les tests sont verts.

Tester des appels de contrats avec Waffle est super facile. Et voici la meilleure partie. Ces matchers fonctionnent à la fois avec des contrats normaux et fictifs ! C'est parce que Waffle enregistre et filtre les appels EVM plutôt que d'injecter du code, comme c'est le cas des bibliothèques de test populaires pour d'autres technologies.

## La fin {#the-finish-line}

Félicitations ! Maintenant vous savez comment utiliser Waffle pour tester dynamiquement les appels de contrats et les contrats fictifs. Il y a beaucoup plus de fonctionnalités intéressantes à découvrir. Je recommande de plonger dans la documentation de Waffle.

La documentation Waffle est disponible [here](https://ethereum-waffle.readthedocs.io/).

Le code source de ce tutoriel est disponible [ici](https://github.com/EthWorks/Waffle/tree/master/examples/dynamic-mocking-and-testing-calls).

Voici d'autres tutoriels qui pourraient vous intéresser :

- [Tester des contrats intelligents avec Waffle](/developers/tutorials/testing-smart-contract-with-waffle/)
