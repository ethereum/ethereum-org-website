---
title: Appeler un contrat intelligent depuis JavaScript
description: Comment appeler une fonction de contrat intelligent depuis JavaScript en utilisant l'exemple du jeton DAI
author: jdourlens
tags: ["transactions", "frontend", "JavaScript", "web3.js"]
skill: beginner
breadcrumb: Appeler des contrats depuis JS
lang: fr
published: 2020-04-19
source: EthereumDev
sourceUrl: https://ethereumdev.io/calling-a-smart-contract-from-javascript/
address: "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
---

Dans ce tutoriel, nous verrons comment appeler une fonction de [contrat intelligent](/developers/docs/smart-contracts/) depuis JavaScript. Nous commencerons par lire l'état d'un contrat intelligent (par exemple, le solde d'un détenteur d'ERC-20), puis nous modifierons l'état de la chaîne de blocs en effectuant un transfert de jetons. Vous devriez déjà être familier avec la [configuration d'un environnement JS pour interagir avec la chaîne de blocs](/developers/tutorials/set-up-web3js-to-use-ethereum-in-javascript/).

Pour cet exemple, nous allons jouer avec le jeton DAI. À des fins de test, nous allons faire un fork de la chaîne de blocs en utilisant ganache-cli et déverrouiller une adresse qui possède déjà beaucoup de DAI :

```bash
ganache-cli -f https://mainnet.infura.io/v3/[YOUR INFURA KEY] -d -i 66 1 --unlock 0x4d10ae710Bd8D1C31bd7465c8CBC3add6F279E81
```

Pour interagir avec un contrat intelligent, nous aurons besoin de son adresse et de son ABI :

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

Pour ce projet, nous avons réduit l'ABI ERC-20 complète pour ne conserver que les fonctions `balanceOf` et `transfer`, mais vous pouvez trouver [l'ABI ERC-20 complète ici](https://ethereumdev.io/abi-for-erc20-contract-on-ethereum/).

Nous devons ensuite instancier notre contrat intelligent :

```js
const web3 = new Web3("http://localhost:8545")

const daiToken = new web3.eth.Contract(ERC20TransferABI, DAI_ADDRESS)
```

Nous allons également configurer deux adresses :

- celle qui recevra le transfert et
- celle que nous avons déjà déverrouillée et qui l'enverra :

```js
const senderAddress = "0x4d10ae710Bd8D1C31bd7465c8CBC3add6F279E81"
const receiverAddress = "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
```

Dans la partie suivante, nous appellerons la fonction `balanceOf` pour récupérer la quantité actuelle de jetons que détiennent les deux adresses.

## Call : Lire une valeur depuis un contrat intelligent {#call-reading-value-from-a-smart-contract}

Le premier exemple appellera une méthode « constante » et exécutera sa méthode de contrat intelligent dans l'EVM sans envoyer de transaction. Pour cela, nous lirons le solde ERC-20 d'une adresse. [Lisez notre article sur les jetons ERC-20](/developers/tutorials/understand-the-erc-20-token-smart-contract/).

Vous pouvez accéder aux méthodes d'un contrat intelligent instancié pour lequel vous avez fourni l'ABI de la manière suivante : `yourContract.methods.methodname`. En utilisant la fonction `call`, vous recevrez le résultat de l'exécution de la fonction.

```js
daiToken.methods.balanceOf(senderAddress).call(function (err, res) {
  if (err) {
    console.log("An error occurred", err)
    return
  }
  console.log("The balance is: ", res)
})
```

N'oubliez pas que le DAI ERC-20 possède 18 décimales, ce qui signifie que vous devez retirer 18 zéros pour obtenir le montant correct. Les uint256 sont retournés sous forme de chaînes de caractères car JavaScript ne gère pas les grandes valeurs numériques. Si vous n'êtes pas sûr de [savoir comment gérer les grands nombres en JS, consultez notre tutoriel sur bignumber.js](https://ethereumdev.io/how-to-deal-with-big-numbers-in-javascript/).

## Send : Envoyer une transaction à une fonction de contrat intelligent {#send-sending-a-transaction-to-a-smart-contract-function}

Pour le deuxième exemple, nous appellerons la fonction de transfert du contrat intelligent DAI pour envoyer 10 DAI à notre deuxième adresse. La fonction de transfert accepte deux paramètres : l'adresse du destinataire et la quantité de jetons à transférer :

```js
daiToken.methods
  .transfer(receiverAddress, "100000000000000000000")
  .send({ from: senderAddress }, function (err, res) {
    if (err) {
      console.log("An error occurred", err)
      return
    }
    console.log("Hash of the transaction: " + res)
  })
```

La fonction d'appel retourne le hash de la transaction qui sera minée dans la chaîne de blocs. Sur Ethereum, les hashs de transaction sont prévisibles - c'est ainsi que nous pouvons obtenir le hash de la transaction avant qu'elle ne soit exécutée ([découvrez comment les hashs sont calculés ici](https://ethereum.stackexchange.com/questions/45648/how-to-calculate-the-assigned-txhash-of-a-transaction)).

Comme la fonction ne fait que soumettre la transaction à la chaîne de blocs, nous ne pouvons pas voir le résultat tant que nous ne savons pas quand elle est minée et incluse dans la chaîne de blocs. Dans le prochain tutoriel, nous apprendrons [comment attendre qu'une transaction soit exécutée sur la chaîne de blocs en connaissant son hash](https://ethereumdev.io/waiting-for-a-transaction-to-be-mined-on-ethereum-with-js/).