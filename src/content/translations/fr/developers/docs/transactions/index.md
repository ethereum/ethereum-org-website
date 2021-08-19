---
title: Transactions
description: "Présentation des transactions Ethereum : leur fonctionnement, leur structure de données et comment les envoyer via une application."
lang: fr
sidebar: true
---

Les transactions sont des instructions signées cryptographiquement depuis des comptes. Un compte va initier une transaction pour mettre à jour l'état du réseau Ethereum. La transaction la plus simple consiste à transférer de l'ETH d'un compte à un autre.

<!-- TODO explain these 2 types of transactions -->
<!-- There are two types of transactions: those which result in message calls and those which result in contract creation. -->
<!-- Contract creation results in the creation of a new contract account containing compiled smart contract bytecode. Whenever another account makes a message call to that contract, it executes its bytecode. -->

## Prérequis {#prerequisites}

Pour vous aider à mieux comprendre cet article, nous vous recommandons de commencer par lire les pages [Comptes](/en/developers/docs/accounts/) et [Introduction à Ethereum](/en/developers/docs/intro-to-ethereum/).

## Qu'est-ce qu'une transaction ? {#whats-a-transaction}

Une transaction Ethereum est une action initiée par un compte externe, c'est-à-dire un compte géré par un être humain et non par un contrat. Par exemple, si Marc envoie 1 ETH à Alice, le compte de Marc doit être débité et celui d'Alice doit être crédité. Cette action, qui modifie l'état, se produit dans le cadre d'une transaction.

![Diagramme montrant un changement d'état de cause de la transaction](./tx.png) _Schéma adapté à partir du document [Ethereum EVM illustrated](https://takenobu-hs.github.io/downloads/ethereum_evm_illustrated.pdf)_

Les transactions, qui modifient l'état de l'EVM, doivent être diffusées sur l'ensemble du réseau. N'importe quel nœud peut diffuser une demande pour qu'une transaction soit exécutée sur l'EVM. Un mineur exécutera ensuite la transaction et propagera au reste du réseau le changement d'état qui en résultera.

Les transactions génèrent des frais et doivent être minées pour devenir valides. Pour simplifier cette présentation, nous couvrirons les frais de carburant et le minage dans un autre article.

Une transaction soumise comprend les informations suivantes :

- `recipient` : Adresse de réception (S'il s'agit d'un compte externe, la transaction va transférer la valeur. S'il s'agit d'un compte de contrat, la transaction exécutera le code du contrat.)
- `signature` : Identifiant de l'expéditeur. Cette signature est générée lorsque la clé privée de l'expéditeur signe la transaction, et confirme que l'expéditeur a autorisé cette transaction.
- `value` : Quantité d'ETH à transférer de l'expéditeur au destinataire (en WEI, une dénomination de l'ETH).
- `data` : Champ facultatif pour inclure des données arbitraires.
- `gasLimit` : Quantité maximum d’unités de carburant pouvant être consommée par la transaction. Les unités de carburant représentent les étapes de calcul.
- `gasPrice` : Les frais que l’expéditeur paye par unité de carburant

Le carburant est une référence au calcul nécessaire au traitement de la transaction par un mineur. Les utilisateurs doivent payer des frais pour ce calcul. Les paramètres `gasLimit` et `gasPrice` déterminent les frais de transaction maximum payés au mineur. [Plus d'infos sur le carburant](/en/developers/docs/gas/)

L'objet de transaction ressemblera un peu à ceci :

```js
{
  from: "0xEA674fdDe714fd979de3EdF0F56AA9716B898ec8",
  to: "0xac03bb73b6a9e108530aff4df5077c2b3d481e5a",
  gasLimit: "21000",
  gasPrice: "200",
  nonce: "0",
  value: "10000000000",
}
```

Un objet de transaction doit être signé avec la clé privée de l'expéditeur. Cela prouve que la transaction ne pouvait venir que de l'expéditeur et n'a pas été envoyée de façon frauduleuse.

Un client Ethereum comme Geth gérera ce processus de signature.

Exemple d'appel [JSON-RPC](https://eth.wiki/json-rpc/API) :

```json
{
  "id": 2,
  "jsonrpc": "2.0",
  "method": "account_signTransaction",
  "params": [
    {
      "from": "0x1923f626bb8dc025849e00f99c25fe2b2f7fb0db",
      "gas": "0x55555",
      "gasPrice": "0x1234",
      "input": "0xabcd",
      "nonce": "0x0",
      "to": "0x07a565b7ed7d7a678680a4c162885bedbb695fe0",
      "value": "0x1234"
    }
  ]
}
```

Exemple de réponse :

```json
{
  "jsonrpc": "2.0",
  "id": 2,
  "result": {
    "raw": "0xf88380018203339407a565b7ed7d7a678680a4c162885bedbb695fe080a44401a6e4000000000000000000000000000000000000000000000000000000000000001226a0223a7c9bcf5531c99be5ea7082183816eb20cfe0bbc322e97cc5c7f71ab8b20ea02aadee6b34b45bb15bc42d9c09de4a6754e7000908da72d48cc7704971491663",
    "tx": {
      "nonce": "0x0",
      "gasPrice": "0x1234",
      "gas": "0x55555",
      "to": "0x07a565b7ed7d7a678680a4c162885bedbb695fe0",
      "value": "0x1234",
      "input": "0xabcd",
      "v": "0x26",
      "r": "0x223a7c9bcf5531c99be5ea7082183816eb20cfe0bbc322e97cc5c7f71ab8b20e",
      "s": "0x2aadee6b34b45bb15bc42d9c09de4a6754e7000908da72d48cc7704971491663",
      "hash": "0xeba2df809e7a612a0a0d444ccfa5c839624bdc00dd29e3340d46df3870f8a30e"
    }
  }
}
```

- `raw` est la transaction signée sous forme de préfixe de longueur récursive (RLP)
- `tx` est la transaction signée sous la forme JSON

Grâce au hachage de la signature, il est possible de prouver de façon cryptographique que la transaction provient de l'expéditeur et qu'elle a été soumise au réseau.

### À propos du carburant {#on-gas}

Comme mentionné, les transactions ont un coût en [carburant](/developers/docs/gas/) pour être exécutées. Les transactions de transfert simples requièrent 21 000 unités de carburant.

Pour que Marc envoie 1 ETH à Alice à un `gasPrice` de 200 GWEI, il devra payer les frais suivants :

```
200*21 000 = 4 200 000 GWEI
--ou--
0,0042 ETH
```

Le compte de Marc sera débité de **-1,0042 ETH**.

Celui d'Alice sera crédité de **+1,0 ETH**.

Le mineur traitant la transaction recevra **+0,0042 ETH**.

Du carburant est également requis pour toute interaction avec un contrat intelligent.

![Diagramme montrant comment le carburant inutilisé est remboursé](./gas-tx.png) _Schéma adapté à partir du document [Ethereum EVM illustrated](https://takenobu-hs.github.io/downloads/ethereum_evm_illustrated.pdf)_

Tout carburant non utilisé dans une transaction est remboursé sur le compte de l'utilisateur.

## Cycle de vie des transactions {#transaction-lifecycle}

Voici ce qui se passe une fois qu'une transaction a été soumise :

1. Quand vous envoyez une transaction, la cryptographie génère un hash de transaction : `0x97d99bc77292111a21b12c933c949d4f31684f1d6954ff477d0477538ff017`
2. La transaction est ensuite diffusée sur le réseau et incluse dans un groupe comportant de nombreuses autres transactions.
3. Un mineur doit sélectionner votre transaction et l'inclure dans un bloc pour la vérifier et la considérer comme "réussie".
   - Il peut exister un délai d'attente à ce stade quand le réseau est occupé et que les mineurs ne sont pas en mesure de suivre. Les mineurs donnent toujours la priorité aux transactions dont le `GASPRICE` est élevé, car ils gardent le montant des frais.
4. Votre transaction recevra également un numéro de confirmation de bloc. Il s'agit du nombre de blocs créés depuis le bloc dans lequel votre transaction a été incluse. Plus le nombre est élevé, plus la certitude que la transaction a été traitée et reconnue par le réseau est grande. En effet, il arrive que le bloc dans lequel votre transaction était incluse n'ait pas été intégré à la chaîne.
   - Plus le numéro de confirmation de bloc est grand, plus la transaction est immuable. Ainsi, pour les transactions de grande valeur, un plus grand nombre de confirmations de blocs peut être souhaité.

<!-- **State change**

FROM THE WHITEPAPER:

1. Check if the transaction is well-formed (ie. has the right number of values), the signature is valid, and the nonce matches the nonce in the sender's account. If not, return an error.
2. Calculate the transaction fee as `STARTGAS * GASPRICE`, and determine the sending address from the signature. Subtract the fee from the sender's account balance and increment the sender's nonce. If there is not enough balance to spend, return an error.
3. Initialize `GAS = STARTGAS`, and take off a certain quantity of gas per byte to pay for the bytes in the transaction.
4. Transfer the transaction value from the sender's account to the receiving account. If the receiving account does not yet exist, create it. If the receiving account is a contract, run the contract's code either to completion or until the execution runs out of gas.
5. If the value transfer failed because the sender did not have enough money, or the code execution ran out of gas, revert all state changes except the payment of the fees, and add the fees to the miner's account.
6. Otherwise, refund the fees for all remaining gas to the sender, and send the fees paid for gas consumed to the miner.
 -->
<!-- ## Failed transactions

A transaction can fail for a number of reasons:

- Not enough gas
  - The gas limit is too low
- Reverted -->

<!-- ## Messages

Messages are like transactions between contract accounts but they're not added to the blockchain. They allow smart contracts to call other contracts and trigger their execution.

FROM WHITEPAPER:

A message is produced when a contract currently executing code executes the `CALL` opcode, which produces and executes a message. Like a transaction, a message leads to the recipient account running its code. Thus, contracts can have relationships with other contracts in exactly the same way that external actors can.

@Sam Richards help me understand messages please :D

```
// FROM SOLIDITY DOCS
Contracts can call other contracts or send ether to non-contract accounts by the means of message calls. Message calls are similar to transactions, in that they have a source, a target, data payload, Ether, gas and return data. In fact, every transaction consists of a top-level message call which in turn can create further message calls.

A contract can decide how much of its remaining gas should be sent with the inner message call and how much it wants to retain. If an out-of-gas exception happens in the inner call (or any other exception), this will be signalled by an error value put onto the stack. In this case, only the gas sent together with the call is used up. In Solidity, the calling contract causes a manual exception by default in such situations, so that exceptions “bubble up” the call stack.

As already said, the called contract (which can be the same as the caller) will receive a freshly cleared instance of memory and has access to the call payload - which will be provided in a separate area called the calldata. After it has finished execution, it can return data which will be stored at a location in the caller’s memory preallocated by the caller.

Calls are limited to a depth of 1024, which means that for more complex operations, loops should be preferred over recursive calls.
```

<!-- Feels like this should maybe form a more advanced/complex doc that sits under transactions. Stuff like Ethers and providers need some sort of intro--><!-- ## How to send a transaction -->

<!-- `web3.eth.sendTransaction(transactionObject [, callback])` -->

<!-- Using Ethers and a provider... -->

<!-- ```js
// We require a provider to send transactions
let provider = ethers.getDefaultProvider()

let privateKey =
  "0x3141592653589793238462643383279502884197169399375105820974944592"
let wallet = new ethers.Wallet(privateKey, provider)

let amount = ethers.utils.parseEther("1.0")

let tx = {
  to: "0x88a5c2d9919e46f883eb62f7b8dd9d0cc45bc290",
  // ... or supports ENS names
  // to: "ricmoo.firefly.eth",

  // We must pass in the amount as wei (1 ether = 1e18 wei), so we
  // use this convenience function to convert ether to wei.
  value: ethers.utils.parseEther("1.0"),
}

let sendPromise = wallet.sendTransaction(tx)

sendPromise.then((tx) => {
  console.log(tx)
  // {
  //    // All transaction fields will be present
  //    "nonce", "gasLimit", "pasPrice", "to", "value", "data",
  //    "from", "hash", "r", "s", "v"
  // }
})
``` -->

<!-- **Transaction requests**

Ethers

```js
{
    // Required unless deploying a contract (in which case omit)
    to: addressOrName,  // the target address or ENS name

    // These are optional/meaningless for call and estimateGas
    nonce: 0,           // the transaction nonce
    gasLimit: 0,        // the maximum gas this transaction may spend
    gasPrice: 0,        // the price (in wei) per unit of gas

    // These are always optional (but for call, data is usually specified)
    data: "0x",         // extra data for the transaction, or input for call
    value: 0,           // the amount (in wei) this transaction is sending
    chainId: 3          // the network ID; usually added by a signer
}
``` -->
<!-- **Transaction response**

```js
{
    // Only available for mined transactions
    blockHash: "0x7f20ef60e9f91896b7ebb0962a18b8defb5e9074e62e1b6cde992648fe78794b",
    blockNumber: 3346463,
    timestamp: 1489440489,

    // Exactly one of these will be present (send vs. deploy contract)
    // They will always be a properly formatted checksum address
    creates: null,
    to: "0xc149Be1bcDFa69a94384b46A1F91350E5f81c1AB",

    // The transaction hash
    hash: "0xf517872f3c466c2e1520e35ad943d833fdca5a6739cfea9e686c4c1b3ab1022e",

    // See above "Transaction Requests" for details
    data: "0x",
    from: "0xEA674fdDe714fd979de3EdF0F56AA9716B898ec8",
    gasLimit: utils.bigNumberify("90000"),
    gasPrice: utils.bigNumberify("21488430592"),
    nonce: 0,
    value: utils.parseEther(1.0017071732629267),

    // The chain ID; 0 indicates replay-attack vulnerable
    // (eg. 1 = Homestead mainnet, 3 = Ropsten testnet)
    chainId: 1,

    // The signature of the transaction (TestRPC may fail to include these)
    r: "0x5b13ef45ce3faf69d1f40f9d15b0070cc9e2c92f3df79ad46d5b3226d7f3d1e8",
    s: "0x535236e497c59e3fba93b78e124305c7c9b20db0f8531b015066725e4bb31de6",
    v: 37,

    // The raw transaction (TestRPC may be missing this)
    raw: "0xf87083154262850500cf6e0083015f9094c149be1bcdfa69a94384b46a1f913" +
           "50e5f81c1ab880de6c75de74c236c8025a05b13ef45ce3faf69d1f40f9d15b0" +
           "070cc9e2c92f3df79ad46d5b3226d7f3d1e8a0535236e497c59e3fba93b78e1" +
           "24305c7c9b20db0f8531b015066725e4bb31de6"
}
``` --><!-- ## How are transactions protected/safe? -->

## Démonstration visuelle {#a-visual-demo}

Regardez Austin vous guider à travers les transactions, le carburant et le minage. <iframe width="100%" height="315" src="https://www.youtube.com/embed/er-0ihqFQB0" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen mark="crwd-mark"></iframe>

## Complément d'information {#further-reading}

_Une ressource communautaire vous a aidé ? Modifiez cette page et ajoutez-la !_

## Sujets connexes {#related-topics}

- [Comptes](/en/developers/docs/accounts/)
- [Machine virtuelle Ethereum (EVM)](/en/developers/docs/evm/)
- [Carburant](/en/developers/docs/gas/)
- [Minage](/en/developers/docs/consensus-mechanisms/pow/mining/)
