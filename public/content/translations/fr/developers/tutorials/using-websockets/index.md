---
title: Utiliser les WebSockets
description: "Guide d'utilisation des WebSockets pour effectuer des requêtes JSON-RPC et s'abonner à des événements, avec n'importe quel fournisseur de nœuds Ethereum."
author: "Elan Halpern"
lang: fr
tags: ["Alchemy", "websockets", "requêtes", "JavaScript"]
skill: beginner
breadcrumb: WebSockets
source: Alchemy docs
sourceUrl: https://www.alchemy.com/docs/reference/best-practices-for-using-websockets-in-web3
published: 2020-12-01
---

Ceci est un guide de niveau débutant sur l'utilisation des WebSockets pour effectuer des requêtes sur la chaîne de blocs Ethereum. Les exemples utilisent des méthodes JSON-RPC standard, ils fonctionnent donc avec n'importe quel nœud ou fournisseur de nœuds offrant un point de terminaison WebSocket, y compris Alchemy.

## WebSockets vs HTTP {#websockets-vs-http}

Contrairement à HTTP, avec les WebSockets, vous n'avez pas besoin d'effectuer continuellement des requêtes lorsque vous souhaitez obtenir des informations spécifiques. Les WebSockets maintiennent une connexion réseau pour vous (si cela est fait correctement) et écoutent les changements.

Comme pour toute connexion réseau, vous ne devez pas supposer qu'un WebSocket restera ouvert indéfiniment sans interruption, mais gérer correctement les pertes de connexion et la reconnexion manuellement peut s'avérer difficile à réaliser correctement. Un autre inconvénient des WebSockets est que vous n'obtenez pas de codes d'état HTTP dans la réponse, mais uniquement le message d'erreur.

Les bibliothèques clientes peuvent gérer cela pour vous. Par exemple, le [transport WebSocket de Viem](https://viem.sh/docs/clients/transports/websocket) se reconnecte en cas d'échec du socket et envoie des pings de maintien de connexion (keep-alive) par défaut.

## Essayez-le {#try-it-out}

Vous avez besoin d'une URL WebSocket pour un nœud Ethereum. Les fournisseurs de nœuds vous en donnent une lorsque vous créez une clé d'interface de programmation d'application (API), généralement sous la forme `wss://<provider-host>/<your-api-key>`. Par exemple, une URL Alchemy pour le réseau principal Ethereum ressemble à `wss://eth-mainnet.g.alchemy.com/v2/<your-api-key>` ([inscrivez-vous pour un compte Alchemy gratuit](https://auth.alchemy.com/signup)). Consultez les [nœuds en tant que service](/developers/docs/nodes-and-clients/nodes-as-a-service/) pour d'autres fournisseurs, ou utilisez le point de terminaison WebSocket de [votre propre nœud](/developers/docs/nodes-and-clients/run-a-node/). Les points de terminaison publics tels que `wss://ethereum-rpc.publicnode.com` fonctionnent également pour des expériences rapides, mais ils sont limités en débit et peuvent ne pas prendre en charge tous les types d'abonnement.

La façon la plus simple de tester les WebSockets est d'installer un outil en ligne de commande pour effectuer des requêtes WebSocket tel que [wscat](https://github.com/websockets/wscat). En utilisant wscat, vous pouvez envoyer des requêtes comme suit :

```sh
npx wscat -c wss://<provider-host>/<your-api-key>

> {"jsonrpc": "2.0", "id": 0, "method": "eth_gasPrice"}

< {"jsonrpc": "2.0", "result": "0x41f9de2", "id": 0}
```

Les lignes commençant par `>` correspondent à ce que vous tapez, et les lignes commençant par `<` correspondent à ce que le nœud renvoie.

## Comment utiliser les WebSockets {#how-to-use-websockets}

Pour commencer, ouvrez un WebSocket en utilisant l'URL WebSocket de votre fournisseur. Avec Alchemy, vous pouvez la trouver en ouvrant votre application dans [le tableau de bord](https://dashboard.alchemy.com/) et en consultant sa clé API. Notez que l'URL pour les WebSockets (`wss://`) est différente de l'URL pour les requêtes HTTP (`https://`), bien que la plupart des fournisseurs utilisent la même clé API pour les deux.

![Où trouver votre URL WebSocket dans votre tableau de bord Alchemy](./use-websockets.mp4#602x280)

N'importe laquelle des [méthodes JSON-RPC](/developers/docs/apis/json-rpc/) prises en charge par votre fournisseur peut être utilisée via WebSocket. Pour ce faire, utilisez la même charge utile qui serait envoyée comme corps d'une requête HTTP POST, mais envoyez plutôt cette charge utile via le WebSocket.

## Avec Web3 {#with-web3}

Passer aux WebSockets tout en utilisant une bibliothèque cliente comme [Viem](https://viem.sh/) est simple. Utilisez le transport `webSocket` avec votre URL WebSocket au lieu du transport `http`. Par exemple, après `npm install viem`, enregistrez ceci sous `index.mjs` et exécutez `node index.mjs` :

```js
import { createPublicClient, webSocket } from "viem"
import { mainnet } from "viem/chains"

const client = createPublicClient({
  chain: mainnet,
  transport: webSocket("wss://<provider-host>/<your-api-key>"),
})

console.log(await client.getBlockNumber()) // -> 26243602n

// S'abonner aux nouveaux blocs via le même WebSocket
const unwatch = client.watchBlocks({
  onBlock: (block) => {
    console.log(block.number, block.hash)
    unwatch()
    process.exit(0)
  },
})
```

## API d'abonnement {#subscription-api}

Lors d'une connexion via un WebSocket, vous pouvez utiliser deux méthodes supplémentaires : `eth_subscribe` et `eth_unsubscribe`. Ces méthodes vous permettront d'écouter des événements particuliers et d'être notifié immédiatement.

### `eth_subscribe` {#eth-subscribe}

Crée un nouvel abonnement pour des événements spécifiés. [En savoir plus sur `eth_subscribe`](https://geth.ethereum.org/docs/interacting-with-geth/rpc/pubsub).

#### Paramètres {#parameters}

1. Types d'abonnement
2. Paramètres optionnels

Le premier argument spécifie le type d'événement à écouter. Le deuxième argument contient des options supplémentaires qui dépendent du premier argument. Les différents types de description, leurs options et les charges utiles de leurs événements sont décrits ci-dessous.

#### Retours {#returns}

L'ID d'abonnement : Cet ID sera attaché à tous les événements reçus, et peut également être utilisé pour annuler l'abonnement à l'aide de `eth_unsubscribe`.

#### Événements d'abonnement {#subscription-events}

Tant que l'abonnement est actif, vous recevrez des événements qui sont des objets avec les champs suivants :

- `jsonrpc` : Toujours « 2.0 »
- `method` : Toujours « eth_subscription »
- `params` : Un objet avec les champs suivants :
  - `subscription` : L'ID d'abonnement retourné par l'appel `eth_subscribe` qui a créé cet abonnement.
  - `result` : Un objet dont le contenu varie en fonction du type d'abonnement.

#### Types d'abonnement {#subscription-types}

1. `newHeads`

Émet un événement chaque fois qu'un nouvel en-tête est ajouté à la chaîne, y compris lors d'une réorg de la chaîne.

Lorsqu'une réorg de la chaîne se produit, cet abonnement émettra un événement contenant tous les nouveaux en-têtes pour la nouvelle chaîne. En particulier, cela signifie que vous pouvez voir plusieurs en-têtes émis avec la même hauteur, et lorsque cela se produit, le dernier en-tête doit être considéré comme le bon après une réorg.

Exemple :

```json
> {"jsonrpc": "2.0", "id": 1, "method": "eth_subscribe", "params": ["newHeads"]}

< {"jsonrpc":"2.0","result":"0xe0d4abf5caf333fbf94c5f02182e6469","id":1}
< {
  "jsonrpc": "2.0",
  "method": "eth_subscription",
  "params": {
    "result": {
      "baseFeePerGas": "0x41f9de2",
      "blobGasUsed": "0xc0000",
      "difficulty": "0x0",
      "excessBlobGas": "0xa88af38",
      "extraData": "0xe29ca82051756173617220287175617361722e77696e2920e29ca8",
      "gasLimit": "0x3938700",
      "gasUsed": "0x1a17224",
      "hash": "0xedc43a71b7ff13880bdbe7b748a225b91a11a91e79173fe28011363c10acaea5",
      "logsBloom": "0x4beaef4e7dbb1bfdb3df673fab6cdf1cf9fc0e7f743d672c761551767b7dad953d79cf86e56e6195ae1b57dff20a0fd46e57c545af166ff49394df3839e269a6ff877b6baf9d899fd9666c58b7dfa7add4febf78b466e7f71af2dcbad53fdcfa3f7277d2fbfffcff953f9ef37b3af8fffb296a3adb94dc463ff0d6d5173f1beda0fd662d77eaedb34ff99f3eeed38a77e7d0cd63e917d4efbdfcb7d0d19437f98ff60773d0effbfbdfdbef9ebbf6a2c35efedd677a795d3ccd777e127eeb657f6a8dffaf64f3b8d998b516c78e661ef77fded57fb66d687fab17739b3ef5aa2765777d8cce0ef59a9ceebeceabbb7f76ed7fc65df7e8bccf7938eb3fb7de57f7",
      "miner": "0x396343362be2a4da1ce0c1c210945346fb82aa49",
      "mixHash": "0xa72c9201f502df607d0d7551ccc171ce37a5146747f04c6c495b0aebecb045c7",
      "nonce": "0x0000000000000000",
      "number": "0x1907212",
      "parentBeaconBlockRoot": "0x34f3f289459913dd80ec9c20aa535866cd2bd310ac26e47570601e263d593735",
      "parentHash": "0xe62c150ffbbd04e95343f945b70fa53756aba6c0bf96c0440d1ae354fa007a7c",
      "receiptsRoot": "0x94951d882544da76e30b145b26a39b126e8acfba9db929351b84b2f4c847e3ed",
      "requestsHash": "0xe3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
      "sha3Uncles": "0x1dcc4de8dec75d7aab85b567b6ccd41ad312451b948a7413f0a142fd40d49347",
      "size": "0x1f4bc",
      "stateRoot": "0x12771ea73858277034cf6604aee0abbf889c15091ab8ef9be81bf7258458a036",
      "timestamp": "0x6ad92b47",
      "transactionsRoot": "0xbd58ebe5c8c5519e458266a7db3ad049a7bffa106dc9a14f2fe6edb3f8ad5d70",
      "withdrawalsRoot": "0x56a083b6140663c9e98c30167ee90a1ffb157505ba89cb584583b71cba100d2a"
    },
    "subscription": "0xe0d4abf5caf333fbf94c5f02182e6469"
  }
}
```

2. `logs`

Émet des journaux qui font partie des blocs nouvellement ajoutés et qui correspondent aux critères de filtre spécifiés.

Lorsqu'une réorg de la chaîne se produit, les journaux qui font partie des blocs de l'ancienne chaîne seront émis à nouveau avec la propriété `removed` définie sur `true`. De plus, les journaux qui font partie des blocs de la nouvelle chaîne sont émis, ce qui signifie qu'il est possible de voir les journaux pour la même transaction plusieurs fois en cas de réorg.

Paramètres

1. Un objet avec les champs suivants :
   - `address` (optionnel) : soit une chaîne de caractères représentant une adresse, soit un tableau de telles chaînes.
     - Seuls les journaux créés à partir de l'une de ces adresses seront émis.
   - `topics` : un tableau de spécificateurs de sujets.
     - Chaque spécificateur de sujet est soit `null`, soit une chaîne de caractères représentant un sujet, soit un tableau de chaînes de caractères.
     - Chaque position dans le tableau qui n'est pas `null` restreint les journaux émis à ceux qui ont l'un des sujets donnés à cette position.

Quelques exemples de spécifications de sujets :

- `[]` : Tous les sujets sont autorisés.
- `[A]` : A en première position (et n'importe quoi après).
- `[null, B]` : N'importe quoi en première position et B en deuxième position (et n'importe quoi après).
- `[A, B]` : A en première position et B en deuxième position (et n'importe quoi après).
- `[[A, B], [A, B]]` : (A ou B) en première position et (A ou B) en deuxième position (et n'importe quoi après).

Exemple :

Cet exemple écoute les événements `Deposit` du [contrat d'ether enveloppé (WETH)](https://etherscan.io/address/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2) sur le réseau principal Ethereum :

```json
> {"jsonrpc": "2.0", "id": 1, "method": "eth_subscribe", "params": ["logs", {"address": "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2", "topics": ["0xe1fffcc4923d04b559f4d29a8bfc6cda04eb5b0d3c460751c2402c5c5cc9109c"]}]}

< {"jsonrpc":"2.0","result":"0x69a0e61ae8e3d61a93479858e8f1b43a","id":1}
< {
  "jsonrpc": "2.0",
  "method": "eth_subscription",
  "params": {
    "result": {
      "address": "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
      "blockHash": "0x168e06e5733df993078bb635cb9925f80ff39d12a36bd301052c44d7bf6b6068",
      "blockNumber": "0x190720e",
      "blockTimestamp": "0x6ad92b17",
      "data": "0x000000000000000000000000000000000000000000000000039ed0c3d7848a1c",
      "logIndex": "0x11",
      "removed": false,
      "topics": [
        "0xe1fffcc4923d04b559f4d29a8bfc6cda04eb5b0d3c460751c2402c5c5cc9109c",
        "0x00000000000000000000000023617e59a5925b2a4bf75d73ff6711cd0b29de85"
      ],
      "transactionHash": "0xc956e7012c2af8ff87db88e059336842ee872bfc93de1eac9760510d0bd801be",
      "transactionIndex": "0xb"
    },
    "subscription": "0x69a0e61ae8e3d61a93479858e8f1b43a"
  }
}
```

3. `newPendingTransactions`

Émet le hash de chaque transaction qui est ajoutée à l'état en attente du nœud (sa mempool).

Exemple :

```json
> {"jsonrpc": "2.0", "id": 1, "method": "eth_subscribe", "params": ["newPendingTransactions"]}

< {"jsonrpc":"2.0","result":"0x1c2365b029179adf1e84b9e327315249","id":1}
< {"jsonrpc":"2.0","method":"eth_subscription","params":{"result":"0x4a62d0ad7c8868fbbfa10604e68638e637c6fc6f64fd1fb4ca042dcd0158c992","subscription":"0x1c2365b029179adf1e84b9e327315249"}}
```

Certains fournisseurs proposent également leurs propres types d'abonnement. Par exemple, [`alchemy_pendingTransactions`](https://www.alchemy.com/docs/reference/alchemy-pendingtransactions) d'Alchemy émet des _objets de transaction complets_ au lieu de simples hashs, et accepte les filtres optionnels `fromAddress`, `toAddress` et `hashesOnly`. Ceux-ci ne font pas partie de l'API JSON-RPC standard, ils ne fonctionnent donc qu'avec ce fournisseur.

### `eth_unsubscribe` {#eth-unsubscribe}

Annule un abonnement existant afin qu'aucun autre événement ne soit envoyé.

Paramètres

1. L'ID d'abonnement, tel que retourné précédemment par un appel `eth_subscribe`.

Retours

`true` si un abonnement a été annulé avec succès, ou `false` si aucun abonnement n'existait avec l'ID donné.

Un abonnement n'existe que sur la connexion WebSocket qui l'a créé, donc `eth_unsubscribe` doit être envoyé sur cette même connexion. Il ne peut pas être envoyé en tant que requête HTTP distincte. La fermeture de la connexion annule également tous ses abonnements.

Exemple :

```json
> {"jsonrpc": "2.0", "id": 2, "method": "eth_unsubscribe", "params": ["0xe0d4abf5caf333fbf94c5f02182e6469"]}

< {"jsonrpc":"2.0","result":true,"id":2}
```

---

[Inscrivez-vous gratuitement sur Alchemy](https://auth.alchemy.com), consultez la [documentation d'Alchemy](https://www.alchemy.com/docs/), et pour les dernières nouvelles, suivez Alchemy sur [Twitter](https://x.com/Alchemy).
