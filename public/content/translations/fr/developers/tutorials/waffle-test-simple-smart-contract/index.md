---
title: Test d'un contrat intelligent simple avec la bibliothèque Waffle
description: Tutoriel pour débutants
author: Ewa Kowalska
tags: [ "contrats intelligents", "solidité", "Waffle", "test" ]
skill: beginner
lang: fr
published: 26/02/2021
---

## Dans ce tutoriel, vous apprendrez à {#in-this-tutorial-youll-learn-how-to}

- Tester les modifications du solde du portefeuille
- Tester l'émission d'événements avec des arguments spécifiés
- Affirmer qu'une transaction a été annulée

## Prérequis {#assumptions}

- Vous pouvez créer un nouveau projet JavaScript ou TypeScript
- Vous avez une certaine expérience de base des tests en JavaScript
- Vous avez déjà utilisé des gestionnaires de paquets comme yarn ou npm
- Vous possédez des connaissances très élémentaires sur les contrats intelligents et Solidity

## Mise en route {#getting-started}

Le tutoriel présente la configuration et l'exécution du test à l'aide de yarn, mais il n'y a aucun problème si vous préférez utiliser npm. Je vous fournirai les références appropriées dans la [documentation](https://ethereum-waffle.readthedocs.io/en/latest/index.html) officielle de Waffle.

## Installer les dépendances {#install-dependencies}

[Ajoutez](https://ethereum-waffle.readthedocs.io/en/latest/getting-started.html#installation) les dépendances ethereum-waffle et typescript aux dépendances de développement de votre projet.

```bash
yarn add --dev ethereum-waffle ts-node typescript @types/jest
```

## Exemple de contrat intelligent {#example-smart-contract}

Pendant le tutoriel, nous travaillerons sur un exemple de contrat intelligent simple : EtherSplitter. Il ne fait pas grand-chose, à part permettre à n'importe qui d'envoyer des wei et de les répartir équitablement entre deux destinataires prédéfinis.
La fonction de répartition exige que le nombre de wei soit pair, sinon la transaction sera annulée. Pour les deux destinataires, il effectue un transfert de wei suivi de l'émission de l'événement Transfert.

Placez l'extrait de code d'EtherSplitter dans `src/EtherSplitter.sol`.

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
        require(msg.value % 2 == 0, 'Montant de wei impair non autorisé');
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

Ensuite, créez le fichier de configuration Waffle dans le répertoire racine du projet, `waffle.json`, puis collez-y la configuration suivante :

```json
{
  "compilerType": "solcjs",
  "compilerVersion": "0.6.2",
  "sourceDirectory": "./src",
  "outputDirectory": "./build"
}
```

Exécutez `yarn build`. En conséquence, le répertoire `build` apparaîtra avec le contrat EtherSplitter compilé au format JSON.

## Configuration du test {#test-setup}

Les tests avec Waffle nécessitent l'utilisation des matchers Chai et de Mocha. Vous devez donc les [ajouter](https://ethereum-waffle.readthedocs.io/en/latest/getting-started.html#writing-tests) à votre projet. Mettez à jour votre fichier package.json et ajoutez l'entrée `test` dans la partie scripts :

```json
"scripts": {
    "build": "waffle",
    "test": "export NODE_ENV=test && mocha -r ts-node/register 'test/**/*.test.ts'"
  }
```

Si vous voulez [exécuter](https://ethereum-waffle.readthedocs.io/en/latest/getting-started.html#running-tests) vos tests, il suffit de lancer `yarn test`.

## Tester {#testing}

Créez maintenant le répertoire `test` et le nouveau fichier `test\EtherSplitter.test.ts`.
Copiez l'extrait de code ci-dessous et collez-le dans notre fichier de test.

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

  // ajoutez les tests ici
})
```

Quelques mots avant de commencer.
Le `MockProvider` propose une version simulée de la blockchain. Il fournit également des portefeuilles simulés qui nous serviront pour tester le contrat EtherSplitter. Nous pouvons obtenir jusqu'à dix portefeuilles en appelant la méthode `getWallets()` sur le fournisseur. Dans l'exemple, nous obtenons trois portefeuilles : un pour l'expéditeur et deux pour les destinataires.

Ensuite, nous déclarons une variable appelée « splitter ». C'est notre contrat EtherSplitter simulé. Il est créé avant chaque exécution d'un test unique par la méthode `deployContract`. Cette méthode simule le déploiement d'un contrat à partir du portefeuille passé comme premier paramètre (le portefeuille de l'expéditeur dans notre cas). Le deuxième paramètre est l'ABI et le bytecode du contrat testé. Nous y passons le fichier JSON du contrat EtherSplitter compilé à partir du répertoire `build`. Le troisième paramètre est un tableau avec les arguments du constructeur du contrat qui, dans notre cas, sont les deux adresses des destinataires.

## changeBalances {#changebalances}

Tout d'abord, nous vérifierons si la méthode de répartition modifie réellement les soldes des portefeuilles des destinataires. Si nous divisons 50 wei du compte de l'expéditeur, nous nous attendons à ce que les soldes des deux destinataires augmentent de 25 wei. Nous utiliserons le matcher `changeBalances` de Waffle :

```ts
it("Changes accounts balances", async () => {
  await expect(() => splitter.split({ value: 50 })).to.changeBalances(
    [receiver1, receiver2],
    [25, 25]
  )
})
```

Comme premier paramètre du matcher, nous passons un tableau des portefeuilles des destinataires, et comme second, un tableau des augmentations attendues sur les comptes correspondants.
Si nous voulions vérifier le solde d'un portefeuille spécifique, nous pourrions également utiliser le matcher `changeBalance`, qui ne nécessite pas de passer des tableaux, comme dans l'exemple ci-dessous :

```ts
it("Changes account balance", async () => {
  await expect(() => splitter.split({ value: 50 })).to.changeBalance(
    receiver1,
    25
  )
})
```

Notez que dans les deux cas de `changeBalance` et `changeBalances`, nous passons la fonction de répartition en tant que rappel, car le matcher doit accéder à l'état des soldes avant et après l'appel.

Ensuite, nous allons tester si l'événement Transfer a été émis après chaque transfert de wei. Nous allons nous tourner vers un autre matcher de Waffle :

## Émission {#emit}

```ts
it("Émet un événement lors du transfert vers le premier destinataire", async () => {
  await expect(splitter.split({ value: 50 }))
    .to.emit(splitter, "Transfer")
    .withArgs(sender.address, receiver1.address, 25)
})

it("Émet un événement lors du transfert vers le second destinataire", async () => {
  await expect(splitter.split({ value: 50 }))
    .to.emit(splitter, "Transfer")
    .withArgs(sender.address, receiver2.address, 25)
})
```

Le matcher `emit` nous permet de vérifier si un contrat a émis un événement en appelant une méthode. En tant que paramètres du matcher `emit`, nous fournissons le contrat simulé qui, selon nos prévisions, émettra l'événement, ainsi que le nom de cet événement. Dans notre cas, le contrat simulé est `splitter` et le nom de l'événement est `Transfer`. Nous pouvons également vérifier les valeurs précises des arguments avec lesquels l'événement a été émis. Nous passons autant d'arguments au matcher `withArgs` que notre déclaration d'événement en attend. Dans le cas du contrat EtherSplitter, nous passons les adresses de l'expéditeur et du destinataire ainsi que le montant en wei transféré.

## revertedWith {#revertedwith}

Comme dernier exemple, nous vérifierons si la transaction a été annulée en cas de nombre impair de wei. Nous utiliserons le matcher `revertedWith` :

```ts
it("Reverts when Vei amount uneven", async () => {
  await expect(splitter.split({ value: 51 })).to.be.revertedWith(
    "Montant de wei impair non autorisé"
  )
})
```

Le test, s'il est concluant, nous assurera que la transaction a bien été annulée. Cependant, il doit également y avoir une correspondance exacte entre les messages que nous avons passés dans l'instruction `require` et le message que nous attendons dans `revertedWith`. Si nous retournons au code du contrat EtherSplitter, dans l'instruction `require` pour le montant en wei, nous fournissons le message : « Montant de wei impair non autorisé ». Cela correspond au message que nous attendons dans notre test. S'ils n'étaient pas égaux, le test échouerait.

## Félicitations ! {#congratulations}

Vous avez fait votre premier grand pas vers le test de contrats intelligents avec Waffle !
