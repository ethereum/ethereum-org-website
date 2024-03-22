---
title: Appeler un contrat intelligent depuis JavaScript
description: Comment appeler une fonction de contrat intelligent à partir de JavaScript en utilisant un exemple de jeton Dai
author: jdourlens
tags:
  - "transactions"
  - "frontend"
  - "JavaScript"
  - "web3.js"
skill: beginner
lang: fr
published: 2020-04-19
source: EthereumDev
sourceUrl: https://ethereumdev.io/calling-a-smart-contract-from-javascript/
address: "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
---

Dans ce tutoriel, nous allons voir comment appeler une fonction de [contrat intelligent](/developers/docs/smart-contracts/) à partir de JavaScript. La première consiste à lire l'état d'un contrat intelligent (par exemple, le solde d'un détenteur d'ERC20), puis nous modifierons l'état de la blockchain en effectuant un transfert de jeton. Vous devriez déjà être familiarisé avec [la configuration d'un environnement JS pour interagir avec la blockchain](/developers/tutorials/set-up-web3js-to-use-ethereum-in-javascript/).

Pour cet exemple, nous allons jouer avec le jeton DAI, à des fins de test, nous allons créer une fourche de la blockchain en utilisant ganache-cli et débloquer une adresse qui a déjà beaucoup de DAI :

```bash
ganache-cli -f https://mainnet.infura.io/v3/[YOUR INFURA KEY] -d -i 66 1 --unlock 0x4d10ae710Bd8D1C31bd7465c8CBC3add6F279E81
```

Pour interagir avec un contrat intelligent, nous avons besoin de son adresse et de son ABI :

```js
const ERC20TransferABI = [
  {
    constant: false,
    inputs: [
      {
        name: "_to",
        type: "address",
      },
      {
        name: "_value",
        type: "uint256",
      },
    ],
    name: "transfer",
    outputs: [
      {
        name: "",
        type: "bool",
      },
    ],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: true,
    inputs: [
      {
        name: "_owner",
        type: "address",
      },
    ],
    name: "balanceOf",
    outputs: [
      {
        name: "balance",
        type: "uint256",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
]

const DAI_ADDRESS = "0x6b175474e89094c44da98b954eedeac495271d0f"
```

Pour ce projet, nous avons dépouillé l'ABI ERC20 complet pour ne garder que les fonctions `balanceOf` et `transfer` mais vous pouvez trouver [l'ABI ERC20 complète ici](https://ethereumdev.io/abi-for-erc20-contract-on-ethereum/).

Nous devons ensuite instancier notre contrat intelligent :

```js
const web3 = new Web3("http://localhost:8545")

const daiToken = new web3.eth.Contract(ERC20TransferABI, DAI_ADDRESS)
```

Nous allons également mettre en place deux adresses :

- celle qui recevra le transfert et
- celle déjà débloquée qui l'enverra :

```js
const senderAddress = "0x4d10ae710Bd8D1C31bd7465c8CBC3add6F279E81"
const receiverAddress = "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
```

Dans la partie suivante, nous allons appeler la fonction `balanceOf` pour récupérer la quantité actuelle de jetons que les deux adresses détiennent.

## Appel : Lire la valeur d'un contrat intelligent {#call-reading-value-from-a-smart-contract}

Le premier exemple appelle une méthode « constante » et exécute sa méthode de contrat intelligent dans l'EVM sans envoyer de transaction. Pour cela, nous allons lire le solde ERC20 d'une adresse. [Lisez notre article sur les jetons ERC20](/developers/tutorials/understand-the-erc-20-token-smart-contract/).

Vous pouvez accéder aux méthodes d'un contrat intelligent instancié pour lequel vous avez fourni l'ABI comme suit : `yourContract.methods.methodname`. En utilisant la fonction `call`, vous recevrez le résultat de l'exécution de la fonction.

```js
daiToken.methods.balanceOf(senderAddress).call(function (err, res) {
  if (err) {
    console.log("Une erreur s'est produite", err)
    return
  }
  console.log("Le solde est : ", res)
})
```

N'oubliez pas que le DAI ERC20 comporte 18 décimales, ce qui signifie que vous devez supprimer 18 zéros pour obtenir le montant correct. Les uint256 sont retournés sous forme de chaînes de caractères, car JavaScript ne gère pas les grandes valeurs numériques. Si vous ne savez pas [comment traiter les grands nombres dans JS, consultez notre tutoriel sur bignumber.js](https://ethereumdev.io/how-to-deal-with-big-numbers-in-javascript/).

## Envoyer : Envoi d'une transaction à une fonction de contrat intelligent {#send-sending-a-transaction-to-a-smart-contract-function}

Pour le deuxième exemple, nous allons appeler la fonction de transfert du contrat intelligent DAI pour envoyer 10 DAI à notre deuxième adresse. La fonction de transfert accepte deux paramètres : l'adresse du destinataire et le montant du jeton à transférer.

```js
daiToken.methods
  .transfer(receiverAddress, "100000000000000000000")
  .send({ from: senderAddress }, function (err, res) {
    if (err) {
      console.log("Une erreur s'est produite", err)
      return
    }
    console.log("Hash de la transaction : " + res)
  })
```

La fonction d'appel renvoie le hachage de la transaction qui sera miné dans la blockchain. Sur Ethereum, les hachages de transaction sont prévisibles - c'est ainsi que nous pouvons obtenir le hachage de la transaction avant qu'elle ne soit exécutée ([apprenez comment les hachages sont calculés ici](https://ethereum.stackexchange.com/questions/45648/how-to-calculate-the-assigned-txhash-of-a-transaction)).

Comme la fonction ne fait que soumettre la transaction à la blockchain, nous ne pouvons pas voir le résultat avant de savoir quand elle est minée et incluse dans la blockchain. Dans le prochain tutoriel, nous apprendrons[comment attendre pour qu'une transaction soit exécutée sur la blockchain en connaissant son hachage](https://ethereumdev.io/waiting-for-a-transaction-to-be-mined-on-ethereum-with-js/).
