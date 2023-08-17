---
title: Utiliser WebSockets
description: Guide d'utilisation des WebSockets et d'Alchemy pour réaliser des requêtes JSON-RPC et s'abonner à des événements.
author: "Elan Halpern"
lang: fr
tags:
  - "alchemy"
  - "websockets"
  - "requêtes"
  - "javascript"
skill: beginner
source: Documentation Alchemy
sourceUrl: https://docs.alchemyapi.io/guides/using-websockets
published: 2020-12-01
---

Il s'agit d'un guide pour débuter avec l'utilisation de WebSockets et d'Alchemy pour effectuer des requêtes sur la blockchain Ethereum.

## WebSockets vs. HTTP {#websockets-vs-http}

Contrairement à HTTP, avec les WebSockets, il n'est pas nécessaire d'émettre continuellement des demandes lorsque vous souhaitez obtenir des informations spécifiques. WebSockets maintient une connexion réseau pour vous (si cela est fait correctement) et écoute les modifications.

Comme pour toute connexion réseau, vous ne devez pas supposer qu'un WebSocket restera ouvert pour toujours sans interruption, mais gérer correctement les connexions interompues et la reconnexion manuelle peut être un défi à réaliser. Un autre inconvénient de WebSockets est que vous n'obtenez pas de codes d'état HTTP dans la réponse, mais seulement le message d'erreur.

[Alchemy Web3](https://docs.alchemy.com/reference/api-overview) ajoute automatiquement la gestion des erreurs WebSocket et les retente sans configuration nécessaire.

## Essayez le {#try-it-out}

Le moyen le plus simple de tester WebSockets est d'installer un outil de lignes de commandes pour créer des requêtes WebSocket telles que [wscat](https://github.com/websockets/wscat). En utilisant wscat, vous pouvez envoyer des requêtes comme suit :

_Note : Si vous disposez d'un compte Alchemy, vous pouvez remplacer `demo` par votre propre clé API. [ Créez votre compte Alchemy gratuitement ici !](https://auth.alchemyapi.io/signup)_

```
wscat -c wss://eth-mainnet.ws.alchemyapi.io/ws/demo

>  {"jsonrpc":  "2.0", "id": 0, "method":  "eth_gasPrice"}

<  {"jsonrpc":  "2.0", "result":  "0xb2d05e00", "id": 0}

```

## Comment utiliser WebSockets {#how-to-use-websockets}

Pour commencer, ouvrez un WebSocket en utilisant le lien Websocket pour votre app. Vous pouvez trouver l'URL WebSocket de votre application en ouvrant la page de l'application dans [votre tableau de bord](https://dashboard.alchemyapi.io/) et en cliquant sur « Afficher la clé ». Notez que l'URL de votre application pour WebSockets est différente de son URL pour les demandes HTTP, mais les deux peuvent être trouvées en cliquant sur « Voir la clé ».

![Où trouver votre URL WebSocket dans votre tableau de bord Alchemy](./use-websockets.gif)

Chacune des API listées dans la [Référence de l'API Alchemy](https://docs.alchemyapi.io/documentation/alchemy-api-reference/) peut être utilisée via WebSocket. Pour ce faire, utilisez le même bloc que le corps d'une requête HTTP POST, mais envoyez ce payload à travers le WebSocket.

## Avec Web3 {#with-web3}

Faire la transition vers WebSockets tout en utilisant une bibliothèque client comme Web3 est simple. Il suffit de passer l'URL WebSocket au lieu de l'URL HTTP lors de l'instanciation de votre client Web3. Par exemple :

```js
const web3 = new Web3("wss://eth-mainnet.ws.alchemyapi.io/ws/your-api-key")

web3.eth.getBlockNumber().then(console.log) // -> 7946893
```

## API d'abonnement {#subscription-api}

Lorsque vous êtes connecté avec WebSocket, vous avez accès à deux méthodes supplémentaires : `eth_subscribe` et `eth_unsubscribe`. Ces méthodes vous permettront d'écouter des événements spécifiques et d'être immédiatement averti lorsqu'ils se produisent.

### `eth_subscribe` {#eth-subscribe}

Crée un nouvel abonnement pour les événements spécifiés. [En savoir plus sur `eth_subscribe`](https://docs.alchemy.com/reference/eth-subscribe).

#### Paramètres {#parameters}

1. Types d'abonnement
2. Paramètres facultatifs

Le premier argument spécifie le type d'événement à écouter. Le deuxième argument contient des options supplémentaires qui dépendent du premier argument. Les différents types de description, leurs options et leurs blocs d'événement sont décrits ci-dessous.

#### Valeur de retour {#returns}

L'identifiant de l'abonnement : cet identifiant sera attaché à chaque événements reçu, et peut également être utilisé pour résilier l'abonnement associé en utilisant `eth_unsubscribe`.

#### Événements d'abonnement {#subscription-events}

Tant que l'abonnement est actif, vous recevrez des événements sous la forme d'objets avec les propriétés suivantes :

- `jsonrpc` : Toujours « 2.0 »
- `method` : Toujours « eth_subscription »
- `params` : Un objet comportant les propriétés suivantes :
  - `subscription` : L'identifiant de l'abonnement retourné par l'appel de la méthode `eth_subscription` qui a créé cet abonnement.
  - `result` : Un objet dont le contenu varie en fonction du type d'abonnement.

#### Types d'abonnement {#subscription-types}

1. `alchemy_newFullPendingTransactions`

Retourne les informations de transaction pour toutes les transactions qui sont ajoutées à l'état en attente. Ce type d'abonnement concerne les transactions en attente, de manière similaire à l'appel Web3 standard `web3.eth.subscribe(« pendingTransactions »)`, mais à la différence qu'il émet _des informations complètes sur les transactions_ plutôt que simplement les empreintes numériques.

Exemple :

```json
>  {"jsonrpc":  "2.0",  "id":  1,  "method":  "eth_subscribe",  "params":  ["alchemy_newFullPendingTransactions"]}

<  {"id":1,"result":"0x9a52eeddc2b289f985c0e23a7d8427c8","jsonrpc":"2.0"}
<  {
      "jsonrpc":"2.0",
      "method":"eth_subscription",
      "params":{
          "result":{
          "blockHash":null,
          "blockNumber":null,
          "from":"0xa36452fc31f6f482ad823cd1cf5515177d57667f",
          "gas":"0x1adb0",
          "gasPrice":"0x7735c4d40",
          "hash":"0x50bff0736c713458c92dd1848d12f3354149be1363123dae35e94e0f2a9d56bf",
"input":"0xa9059cbb0000000000000000000000000d0707963952f2fba59dd06f2b425ace40b492fe0000000000000000000000000000000000000000000015b1111266cfca100000",
          "nonce":"0x0",
          "to":"0xea38eaa3c86c8f9b751533ba2e562deb9acded40",
          "transactionIndex":null,
          "value":"0x0",
          "v":"0x26",
          "r":"0x195c2c1ed126088e12d290aa93541677d3e3b1d10f137e11f86b1b9227f01e3b",
          "s":"0x60fc4edbf1527832a2a36dbc1e63ed6193a6eee654472fbebbf88ef1750b5344"},
          "subscription":"0x9a52eeddc2b289f985c0e23a7d8427c8"
      }
  }

```

2. `newHeads`

Émet un événement à chaque fois qu'un nouvel en-tête est ajouté à la chaîne, y compris pendant la réorganisation de celle-ci.

Lorsqu'une réorganisation de chaîne se produit, cet abonnement émet un événement contenant tous les nouveaux en-têtes de la nouvelle chaîne. Plus particulièrement, cela signifie que vous pouvez voir plusieurs en-têtes émis avec la même hauteur, et lorsque cela se produit, le dernier en-tête de cette hauteur doit être considéré comme le bon après une réorganisation.

Exemple :

```json
>  {"jsonrpc":  "2.0",  "id":  1,  "method":  "eth_subscribe",  "params":  ["newHeads"]}

<  {"jsonrpc":"2.0","id":2,"result":"0x9ce59a13059e417087c02d3236a0b1cc"}
<  {
  "jsonrpc":  "2.0",
  "method":  "eth_subscription",
  "params":  {
      "result":  {
          "extraData":  "0xd983010305844765746887676f312e342e328777696e646f7773",
          "gasLimit":  "0x47e7c4",
          "gasUsed":  "0x38658",
          "logsBloom":
"0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
          "nonce":  "0x084149998194cc5f",
          "number":  "0x1348c9",
          "parentHash":  "0x7736fab79e05dc611604d22470dadad26f56fe494421b5b333de816ce1f25701",
          "receiptRoot":  "0x2fab35823ad00c7bb388595cb46652fe7886e00660a01e867824d3dceb1c8d36",
          "sha3Uncles":  "0x1dcc4de8dec75d7aab85b567b6ccd41ad312451b948a7413f0a142fd40d49347",
          "stateRoot":  "0xb3346685172db67de536d8765c43c31009d0eb3bd9c501c9be3229203f15f378",
          "timestamp":  "0x56ffeff8",
          "transactionsRoot":  "0x0167ffa60e3ebc0b080cdb95f7c0087dd6c0e61413140e39d94d3468d7c9689f"
      },
  "subscription":  "0x9ce59a13059e417087c02d3236a0b1cc"
  }
}

```

3. `logs`

Émet des journaux concernant les blocs récemment ajoutés qui correspondent aux critères de filtre spécifiés.

Lorsqu'une réorganisation de la chaîne se produit, les logs qui font partie des blocs de l'ancienne chaîne seront à nouveau émis avec la propriété `removed` réglée sur `true`. De plus, les logs qui font partie des blocs de la nouvelle chaîne sont émis, ce qui signifie qu'il est possible de voir les journaux pour la même transaction plusieurs fois dans le cas d'une réorganisation.

Paramètres

1. Un objet avec les propriétés suivantes :
   - `address` (optionnelle) : soit une chaîne de caractères représentant une adresse soit un tableau de ces chaînes de caractères.
     - Seuls les journaux créés par une de ces adresses seront émis.
   - `topics` : un tableau de spécificateurs de sujet.
     - Chaque spécificateur de sujet est soit `null`, soit une chaîne de caractères représentant un sujet, soit un tableau de chaînes de caractères.
     - Chaque position dans le tableau qui n'est pas `null` limite les logs émis à ceux qui ont un des sujets donnés dans cette position.

Quelques exemples de spécifications du sujet :

- `[]` : Tous les sujets sont autorisés.
- `[A]`: A en première position (et n'importe quoi après).
- `[null, B]` : N'importe quoi en première position et B en deuxième position (et n'importe quoi après).
- `[A, B]` : A en première position et B en deuxième position (et n'importe quoi après).
- `[[A, B], [A, B]]` : (A ou B) en première position et (A ou B) en deuxième position (et n'importe quoi après).

Exemple :

```json
>  {"jsonrpc":  "2.0",  "id":  1,  "method":  "eth_subscribe",  "params":  ["logs",  {"address":  "0x8320fe7702b96808f7bbc0d4a888ed1468216cfd",  "topics":  ["0xd78a0cb8bb633d06981248b816e7bd33c2a35a6089241d099fa519e361cab902"]}]}

<  {"jsonrpc":"2.0","id":2,"result":"0x4a8a4c0517381924f9838102c5a4dcb7"}
<  {
  "jsonrpc":  "2.0",
  "method":  "eth_subscription",
  "params":  {
      "subscription":  "0x4a8a4c0517381924f9838102c5a4dcb7",
      "result":  {
          "address":  "0x8320fe7702b96808f7bbc0d4a888ed1468216cfd",
          "blockHash":  "0x61cdb2a09ab99abf791d474f20c2ea89bf8de2923a2d42bb49944c8c993cbf04",
          "blockNumber":  "0x29e87",
          "data": "0x00000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000003",
          "logIndex":"0x0",
          "topics":["0xd78a0cb8bb633d06981248b816e7bd33c2a35a6089241d099fa519e361cab902"],
          "transactionHash":  "0xe044554a0a55067caafd07f8020ab9f2af60bdfe337e395ecd84b4877a3d1ab4",
          "transactionIndex":  "0x0"
      }
  }
}

```

### `eth_unsubscribe` {#eth-unsubscribe}

Annule un abonnement existant afin qu'aucun événement supplémentaire ne soit envoyé.

Paramètres

1. ID de l'abonnement, comme précédemment retourné de l'appel `eth_subscribe`.

Retours

`true` si un abonnement a été annulé avec succès, ou `false` si aucun abonnement n'existait avec l'ID donné.

Exemple :

**Requête**

```
curl https://eth-mainnet.alchemyapi.io/v2/your-api-key
-X POST
-H "Content-Type: application/json"
-d '{"id": 1, "method": "eth_unsubscribe", "params": ["0x9cef478923ff08bf67fde6c64013158d"]}'


```

**Résultat**

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": true
}
```

---

[Inscrivez-vous gratuitement sur Alchemy](https://auth.alchemyapi.io/signup), consultez [notre documentation](https://docs.alchemyapi.io/), et pour les dernières nouvelles, suivez-nous sur [Twitter](https://twitter.com/AlchemyPlatform).
