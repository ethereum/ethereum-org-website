---
title: "Waffle : Bouchonnage dynamique et tests d'appels de contrat"
description: "Tutoriel Waffle avancé pour utiliser le bouchonnage dynamique et tester les appels de contrat"
author: "Daniel Izdebski"
tags:
  [
    "waffle",
    "contrats intelligents",
    "solidité",
    "test",
    "simulation"
  ]
skill: intermediate
lang: fr
published: 2020-11-14
---

## À quoi sert ce tutoriel ? {#what-is-this-tutorial-about}

Dans ce tutoriel, vous apprendrez comment :

- utiliser le bouchonnage dynamique
- tester les interactions entre contrats intelligents

Hypothèses :

- vous savez déjà écrire un simple contrat intelligent en `Solidity`
- vous vous débrouillez en `JavaScript` et `TypeScript`
- vous avez suivi d'autres tutoriels `Waffle` ou vous en savez déjà un peu plus à ce sujet

## Bouchonnage dynamique {#dynamic-mocking}

Pourquoi le bouchonnage dynamique est-il utile ? Eh bien, il nous permet de rédiger des tests unitaires plutôt que des tests d'intégration. Qu'est-ce que cela signifie ? Cela signifie que nous n'avons pas à nous soucier des dépendances des contrats intelligents, nous pouvons donc tous les tester de manière complètement isolée. Laissez-moi vous montrer comment procéder.

### **1. Projet** {#1-project}

Avant de commencer, nous devons préparer un simple projet node.js :

```bash
mkdir dynamic-mocking
cd dynamic-mocking
mkdir contracts src

yarn init
# ou si vous utilisez npm
npm init
```

Commençons par ajouter TypeScript et les dépendances de test, soit mocha et chai :

```bash
yarn add --dev @types/chai @types/mocha chai mocha ts-node typescript
# ou si vous utilisez npm
npm install @types/chai @types/mocha chai mocha ts-node typescript --save-dev
```

Maintenant, ajoutons `Waffle` et `ethers` :

```bash
yarn add --dev ethereum-waffle ethers
# ou si vous utilisez npm
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

Pour commencer le bouchonnage dynamique, nous avons besoin d'un contrat intelligent avec des dépendances. Ne vous inquiétez pas, j'ai ce qu'il vous faut !

Voici un contrat intelligent simple écrit en `Solidity` dont le seul but est de vérifier si nous sommes riches. Il utilise un jeton ERC20 pour vérifier si nous avons suffisamment de jetons. Placez-le dans `./contracts/AmIRichAlready.sol`.

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

Comme nous voulons utiliser le bouchonnage dynamique, nous n'avons pas besoin de l'intégralité de l'ERC20. C'est pourquoi nous utilisons l'interface IERC20 avec une seule fonction.

Il est temps de compiler ce contrat ! Pour cela, nous utiliserons `Waffle`. Tout d'abord, nous allons créer un simple fichier de configuration `waffle.json` qui spécifie les options de compilation.

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

Facile, n'est-ce pas ? Dans le dossier `build/`, deux fichiers correspondant au contrat et à l'interface sont apparus. Nous les utiliserons plus tard pour les tests.

### **3. Tests** {#3-testing}

Créons un fichier nommé `AmIRichAlready.test.ts` pour y mettre nos tests. Tout d'abord, nous devons gérer les importations. Nous en aurons besoin pour plus tard :

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

Outre les dépendances JS, nous devons importer notre contrat compilé et son interface :

```typescript
import IERC20 from "../build/IERC20.json"
import AmIRichAlready from "../build/AmIRichAlready.json"
```

Waffle utilise `chai` pour les tests. Cependant, avant de pouvoir l'utiliser, nous devons injecter les matchers de Waffle dans chai lui-même :

```typescript
use(solidity)
```

Nous devons implémenter la fonction `beforeEach()` qui réinitialisera l'état du contrat avant chaque test. Réfléchissons d'abord à ce dont nous avons besoin. Pour déployer un contrat, nous avons besoin de deux choses : un portefeuille et un contrat ERC20 déployé pour le passer en argument au contrat `AmIRichAlready`.

Premièrement, créons un portefeuille :

```typescript
const [wallet] = new MockProvider().getWallets()
```

Ensuite, nous devons déployer un contrat ERC20. Voici la partie délicate : nous n'avons qu'une interface. C'est là que Waffle vient à notre rescousse. Waffle dispose d'une fonction magique `deployMockContract()` qui crée un contrat en utilisant uniquement l'_abi_ de l'interface :

```typescript
const mockERC20 = await deployMockContract(wallet, IERC20.abi)
```

Maintenant qu'on a le portefeuille et le contrat ERC20 déployé, nous pouvons déployer le contrat `AmIRichAlready` :

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

Écrivons le premier test pour le contrat `AmIRichAlready`. Selon vous, sur quoi notre test devrait-il porter ? Oui, vous avez raison ! Nous devrions vérifier si nous sommes déjà riches :)

Mais attendez une seconde. Comment notre contrat bouchonné saura-t-il quelles valeurs retourner ? Nous n'avons implémenté aucune logique pour la fonction `balanceOf()`. Là encore, Waffle peut nous aider. Notre contrat bouchonné dispose maintenant de nouvelles fonctionnalités intéressantes :

```typescript
await mockERC20.mock.<nameOfMethod>.returns(<value>)
await mockERC20.mock.<nameOfMethod>.withArgs(<arguments>).returns(<value>)
```

Grâce à ces connaissances, nous pouvons enfin écrire notre premier test :

```typescript
it("retourne « faux » si le portefeuille a moins de 1 000 000 de jetons", async () => {
  await mockERC20.mock.balanceOf.returns(utils.parseEther("999999"))
  expect(await contract.check()).to.be.equal(false)
})
```

Décomposons ce test en plusieurs parties :

1. Nous configurons notre contrat ERC20 bouchonné pour qu'il retourne toujours un solde de 999 999 jetons.
2. Vérifier si la méthode `contract.check()` retourne `false`.

Nous sommes prêts à lancer le test :

![Un test réussi](./test-one.png)

Le test fonctionne donc, mais... il y a encore une marge d'amélioration. La fonction `balanceOf()` retournera toujours 99999. Nous pouvons l'améliorer en spécifiant un portefeuille pour lequel la fonction doit retourner quelque chose, tout comme un vrai contrat :

```typescript
it("retourne « faux » si le portefeuille a moins de 1 000 001 jetons", async () => {
  await mockERC20.mock.balanceOf
    .withArgs(wallet.address)
    .returns(utils.parseEther("999999"))
  expect(await contract.check()).to.be.equal(false)
})
```

Jusqu'à présent, nous n'avons testé que le cas où nous ne sommes pas assez riches. Testons le cas contraire :

```typescript
it("retourne « vrai » si le portefeuille a au moins 1 000 001 jetons", async () => {
  await mockERC20.mock.balanceOf
    .withArgs(wallet.address)
    .returns(utils.parseEther("1000001"))
  expect(await contract.check()).to.be.equal(true)
})
```

Vous lancez les tests...

![Deux tests réussis](test-two.png)

... et voilà ! Notre contrat semble fonctionner comme prévu :)

## Test des appels de contrat {#testing-contract-calls}

Résumons ce que nous avons fait jusqu'à présent. Nous avons testé la fonctionnalité de notre contrat `AmIRichAlready` et il semble fonctionner correctement. Cela signifie que nous avons terminé, n'est-ce pas ? Pas tout à fait ! Waffle nous permet de tester notre contrat de manière encore plus approfondie. Mais comment exactement ? Eh bien, dans l'arsenal de Waffle, il y a les matchers `calledOnContract()` et `calledOnContractWith()`. Ils nous permettront de vérifier si notre contrat a bien appelé le contrat ERC20 bouchonné. Voici un test de base avec l'un de ces matchers :

```typescript
it("vérifie si le contrat a appelé balanceOf sur le jeton ERC20", async () => {
  await mockERC20.mock.balanceOf.returns(utils.parseEther("999999"))
  await contract.check()
  expect("balanceOf").to.be.calledOnContract(mockERC20)
})
```

Nous pouvons aller encore plus loin et améliorer ce test avec l'autre matcher dont je vous ai parlé :

```typescript
it("vérifie si le contrat a appelé balanceOf avec un certain portefeuille sur le jeton ERC20", async () => {
  await mockERC20.mock.balanceOf
    .withArgs(wallet.address)
    .returns(utils.parseEther("999999"))
  await contract.check()
  expect("balanceOf").to.be.calledOnContractWith(mockERC20, [wallet.address])
})
```

Vérifions si les tests sont corrects :

![Trois tests réussis](test-three.png)

Super, tous les tests sont au vert.

Tester les appels de contrat avec Waffle est super facile. Et voici le meilleur. Ces matchers fonctionnent aussi bien avec des contrats normaux qu'avec des contrats bouchonnés ! C'est parce que Waffle enregistre et filtre les appels EVM plutôt que d'injecter du code, comme c'est le cas des bibliothèques de test populaires pour d'autres technologies.

## La ligne d'arrivée {#the-finish-line}

Félicitations ! Vous savez maintenant comment utiliser Waffle pour tester les appels de contrat et pour bouchonner dynamiquement les contrats. Il y a bien d'autres fonctionnalités intéressantes à découvrir. Je vous recommande de vous plonger dans la documentation de Waffle.

La documentation de Waffle est disponible [ici](https://ethereum-waffle.readthedocs.io/).

Le code source de ce tutoriel se trouve [ici](https://github.com/EthWorks/Waffle/tree/master/examples/dynamic-mocking-and-testing-calls).

Tutoriels qui pourraient également vous intéresser :

- [Tester des contrats intelligents avec Waffle](/developers/tutorials/waffle-test-simple-smart-contract/)
