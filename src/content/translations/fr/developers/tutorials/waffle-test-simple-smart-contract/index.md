---
title: Test d'un contrat intelligent simple avec la bibliothèque Waffle
description: Tutoriel pour débutants
author: Ewa Kowalska
tags:
  - "contrats intelligents"
  - "solidity"
  - "Waffle"
  - "test"
skill: beginner
lang: fr
published: 2021-02-26
---

## Dans ce tutoriel, vous apprendrez à {#in-this-tutorial-youll-learn-how-to}

- Tester les modifications du solde du portefeuille
- Tester l'émission d'événements avec les arguments spécifiés
- Confirmer qu'une transaction a été annulée

## Hypothèses {#assumptions}

- Vous pouvez créer un nouveau projet JavaScript ou TypeScript
- Vous avez une expérience de base en matière de tests JavaScript
- Vous avez utilisé des gestionnaires de paquets comme yarn ou npm
- Vous possédez des connaissances de base en matière de contrats intelligents et de Solidity

# Premiers pas {#getting-started}

Le tutoriel décrit l'installation et l'exécution du test en utilisant yarn, mais il n'y a pas de problème si vous préférez npm - je fournirai les références appropriées à la [documentation officielle de Waffle](https://ethereum-waffle.readthedocs.io/en/latest/index.html).

## Installer les dépendances {#install-dependencies}

[Ajoutez](https://ethereum-waffle.readthedocs.io/en/latest/getting-started.html#installation) dépendances ethereum-waffle et typescript aux dépendances de développement de votre projet.

```bash
yarn add --dev ethereum-waffle ts-node typescript @types/jest
```

## Exemple de contrat intelligent {#example-smart-contract}

Au cours du tutoriel, nous allons travailler sur un exemple de contrat intelligent simple - EtherSplitter. Il ne fait pas grand-chose à part permettre à quelqu'un d'envoyer des wei et de les répartir équitablement entre deux destinataires prédéfinis. La fonction de séparation nécessite que le nombre de wei soit pair, sinon elle s'inverse. Pour les deux destinataires, il effectue un transfert wei suivi de l'émission de l'événement Transfert.

Placez le fragment de code EtherSplitter dans `src/EtherSplitter.sol`.

```solidity
pragma solidity ^0.6.0;

contract EtherSplitter {
    address payable receiver1;
    address payable receiver2;

    event Transfer(address from, address to, uint256 amount);

    constructor(address payable _address1, address payable _address2) public {
        receiver1 = _address1;
        receiver2 = _address2;
    }

    function split() public payable {
        require(msg.value % 2 == 0, 'Uneven wei amount not allowed');
        receiver1.transfer(msg.value / 2);
        emit Transfer(msg.sender, receiver1, msg.value / 2);
        receiver2.transfer(msg.value / 2);
        emit Transfer(msg.sender, receiver2, msg.value / 2);
    }
}
```

## Compiler le contrat {#compile-the-contract}

Pour [compiler](https://ethereum-waffle.readthedocs.io/en/latest/getting-started.html#compiling-the-contract) le contrat, ajoutez l'entrée suivante au fichier package.json :

```json
"scripts": {
    "build": "waffle"
  }
```

Ensuite, créez un fichier de configuration avec Waffle, dans le répertoire principal des projets, - `waffle.json` - puis collez-y la configuration suivante :

```json
{
  "compilerType": "solcjs",
  "compilerVersion": "0.6.2",
  "sourceDirectory": "./src",
  "outputDirectory": "./build"
}
```

Exécutez `yarn build`. Cela fera apparaître le dossier `build` avec le contrat compilé EtherSplitter au format JSON.

## Configuration du test {#test-setup}

Tester avec Waffle nécessite d'utiliser des correspondances Chai et Mocha, vous devez donc [les ajouter](https://ethereum-waffle.readthedocs.io/en/latest/getting-started.html#writing-tests) à votre projet. Lancez la mise à jour de votre paquet package.json, et ajoutez le `texte`d'entrée, dans la partie modèle :

```json
"scripts": {
    "build": "waffle",
    "test": "export NODE_ENV=test && mocha -r ts-node/register 'test/**/*.test.ts'"
  }
```

Si vous voulez [faire](https://ethereum-waffle.readthedocs.io/en/latest/getting-started.html#running-tests) vos propres tests, exécutez juste le `yarn test` .

# Tests {#testing}

Maintenant, créez le dossier `test` et créez le nouveau fichier `test\EtherSplitter.test.ts`. Copiez le fragment ci-dessous et collez-le dans notre fichier de test.

```ts
import { expect, use } from "chai"
import { Contract } from "ethers"
import { deployContract, MockProvider, solidity } from "ethereum-waffle"
import EtherSplitter from "../build/EtherSplitter.json"

use(solidity)

describe("Ether Splitter", () => {
  const [sender, receiver1, receiver2] = new MockProvider().getWallets()
  let splitter: Contract

  beforeEach(async () => {
    splitter = await deployContract(sender, EtherSplitter, [
      receiver1.address,
      receiver2.address,
    ])
  })

  // add the tests here
})
```

Quelques mots avant de commencer. Le fournisseur de services, `MockProvider`, propose une version fictive de la blockchain. Il fournit également des portefeuilles fictifs, qui serviront de base pour tester le contrat intelligent EtherSplitter. Nous pouvons obtenir jusqu'à dix portefeuilles en appelant la méthode `getWallets()` sur le fournisseur. Dans l'exemple, nous avons trois portefeuilles - pour l'expéditeur et pour deux destinataires.

Ensuite, nous déclarons une variable appelée « splitter » - c'est notre contrat fictif EtherSpliter. Il est créé avant chaque exécution d'un test unique par la méthode `deployContract`. Cette méthode simule le déploiement d'un contrat à partir du portefeuille transmis en tant que premier paramètre (le portefeuille de l'expéditeur dans notre cas). Le deuxième paramètre est l'ABI et le bytecode du contrat testé - nous transmettons le fichier json du contrat EtherSplitter compilé à partir du répertoire `build`. Le troisième paramètre est un tableau contenant les arguments du constructeur du contrat qui, dans notre cas, sont les deux adresses des destinataires.

## changeBalances {#changebalances}

Tout d'abord, nous vérifierons si la méthode fractionnée modifie réellement les soldes des portefeuilles des destinataires. Si nous divisons 50 wei du compte des expéditeurs, nous nous attendons à ce que les soldes des deux destinataires augmentent de 25 wei. Nous utiliserons la correspondance `changeBalances` de Waffle:

```ts
it("Changes accounts balances", async () => {
  await expect(() => splitter.split({ value: 50 })).to.changeBalances(
    [receiver1, receiver2],
    [25, 25]
  )
})
```

Comme premier paramètre de la correspondance, nous transmettons un tableau de portefeuilles de destinataires, et comme deuxième, un tableau d'augmentations attendues sur les comptes correspondants. Si nous voulions vérifier le solde d'un portefeuille spécifique, nous pourrions également utiliser la correspondance `changeBalance` , qui ne nécessite pas de transmettre des tableaux, comme dans l'exemple ci-dessous:

```ts
it("Changes account balance", async () => {
  await expect(() => splitter.split({ value: 50 })).to.changeBalance(
    receiver1,
    25
  )
})
```

Notez que dans les deux cas de `changeBalance` et `changeBalances`, nous transmettons la fonction de séparation comme callback car le correspondant a besoin d'accéder à l'état des balances avant et après l'appel.

Nous allons ensuite déterminer si l'événement Transfert a été émis après chaque transfert de wei. Nous allons passer à une autre correspondance de Waffle :

## Emit {#emit}

```ts
it("Emits event on the transfer to the first receiver", async () => {
  await expect(splitter.split({ value: 50 }))
    .to.emit(splitter, "Transfer")
    .withArgs(sender.address, receiver1.address, 25)
})

it("Emits event on the transfer to the second receiver", async () => {
  await expect(splitter.split({ value: 50 }))
    .to.emit(splitter, "Transfer")
    .withArgs(sender.address, receiver2.address, 25)
})
```

La correspondance `emit` nous permet de vérifier si un contrat a émis un événement en appelant une méthode. En tant que paramètres pour le `emit` correspondant, nous fournissons le contrat fictif que nous prévoyons pour émettre l'événement, ainsi que le nom de cet événement. Dans notre cas, le contrat fictif est `splitter` et le nom de l'événement `Transfer`. Nous pouvons également vérifier les valeurs précises des arguments avec lesquels l'événement a été émis - nous transmettons autant d'arguments au `withArgs` correspondant, comme le prévoit notre déclaration d'événement. Dans le cas du contrat EtherSpliter, nous passons les adresses de l'expéditeur et du destinataire avec le montant en wei transféré.

## revertedWith {#revertedwith}

Comme dernier exemple, nous allons vérifier si la transaction a été annulée en cas de nombre impair de wei. Nous allons utiliser la correspondance `revertedWith` :

```ts
it("Reverts when Vei amount uneven", async () => {
  await expect(splitter.split({ value: 51 })).to.be.revertedWith(
    "Uneven wei amount not allowed"
  )
})
```

Le test, s'il est accepté, nous assurera que la transaction a bien été annulée. Cependant, il doit également y avoir une correspondance exacte entre les messages que nous avons passés dans la déclaration `require` et le message attendu dans `revertedWith`. Si nous revenons au code du contrat EtherSpliter, dans la déclaration `require` pour le montant wei, nous fournissons le message: "Uneven wei amount not allowed". Cela correspond au message que nous attendons dans notre test. Si elles n'étaient pas égales, le test échouerait.

# Félicitations ! {#congratulations}

Vous avez fait votre premier (grand) pas vers les tests des contrats intelligents avec Waffle ! Vous pourriez être intéressé par d'autres tutoriels Waffle :

- [Tester ERC20 avec Waffle](/developers/tutorials/testing-erc-20-tokens-with-waffle/)
- [Waffle : Bouchonnage dynamique et tests de contrats](/developers/tutorials/waffle-dynamic-mocking-and-testing-calls/#gatsby-focus-wrapper)
- [Tutoriel pour "dire bonjour au monde" avec hardhat et ethers](/developers/tutorials/waffle-hello-world-with-buidler-tutorial/)
