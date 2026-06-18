---
title: API JSON-RPC
description: Un protocole d'appel de procédure à distance (RPC) léger et sans état pour les clients Ethereum.
lang: fr
---

Pour qu'une application logicielle puisse interagir avec la chaîne de blocs [Ethereum](/) - que ce soit pour lire les données de la chaîne de blocs ou envoyer des transactions au réseau - elle doit se connecter à un nœud Ethereum.

À cette fin, chaque [client Ethereum](/developers/docs/nodes-and-clients/#execution-clients) implémente une [spécification JSON-RPC](https://github.com/ethereum/execution-apis), de sorte qu'il existe un ensemble uniforme de méthodes sur lesquelles les applications peuvent s'appuyer, indépendamment du nœud spécifique ou de l'implémentation du client.

[JSON-RPC](https://www.jsonrpc.org/specification) est un protocole d'appel de procédure à distance (RPC) léger et sans état. Il définit plusieurs structures de données et les règles relatives à leur traitement. Il est indépendant du transport dans la mesure où les concepts peuvent être utilisés au sein du même processus, sur des sockets, sur HTTP ou dans de nombreux environnements de transmission de messages divers. Il utilise JSON (RFC 4627) comme format de données.

## Implémentations des clients {#client-implementations}

Les clients Ethereum peuvent chacun utiliser différents langages de programmation lors de l'implémentation de la spécification JSON-RPC. Consultez la [documentation de chaque client](/developers/docs/nodes-and-clients/#execution-clients) pour plus de détails concernant les langages de programmation spécifiques. Nous recommandons de vérifier la documentation de chaque client pour obtenir les dernières informations sur la prise en charge de l'API.

## Bibliothèques pratiques {#convenience-libraries}

Bien que vous puissiez choisir d'interagir directement avec les clients Ethereum via l'API JSON-RPC, il existe souvent des options plus simples pour les développeurs d'applications décentralisées (dapps). De nombreuses bibliothèques [JavaScript](/developers/docs/apis/javascript/#available-libraries) et d'[API backend](/developers/docs/apis/backend/#available-libraries) existent pour fournir des surcouches à l'API JSON-RPC. Avec ces bibliothèques, les développeurs peuvent écrire des méthodes intuitives en une seule ligne dans le langage de programmation de leur choix pour initialiser des requêtes JSON-RPC (en interne) qui interagissent avec Ethereum.

## API des clients de consensus {#consensus-clients}

Cette page traite principalement de l'API JSON-RPC utilisée par les clients d'exécution Ethereum. Cependant, les clients de consensus disposent également d'une API RPC qui permet aux utilisateurs de demander des informations sur le nœud, de requérir des blocs Beacon, l'état Beacon et d'autres informations liées au consensus directement depuis un nœud. Cette API est documentée sur la [page web de l'API Beacon](https://ethereum.github.io/beacon-APIs/#/).

Une API interne est également utilisée pour la communication inter-clients au sein d'un nœud - c'est-à-dire qu'elle permet au client de consensus et au client d'exécution d'échanger des données. Celle-ci est appelée l'« Engine API » et les spécifications sont disponibles sur [GitHub](https://github.com/ethereum/execution-apis/blob/main/src/engine/common.md).

## Spécification du client d'exécution {#spec}

[Lisez la spécification complète de l'API JSON-RPC sur GitHub](https://github.com/ethereum/execution-apis). Cette API est documentée sur la [page web de l'API d'exécution](https://ethereum.github.io/execution-apis/) et inclut un inspecteur pour essayer toutes les méthodes disponibles.

## Conventions {#conventions}

### Encodage des valeurs hexadécimales {#hex-encoding}

Deux types de données clés sont transmis via JSON : les tableaux d'octets non formatés et les quantités. Les deux sont transmis avec un encodage hexadécimal mais avec des exigences de formatage différentes.

#### Quantités {#quantities-encoding}

Lors de l'encodage de quantités (entiers, nombres) : encodez en hexadécimal, préfixez avec "0x", la représentation la plus compacte (légère exception : zéro doit être représenté par "0x0").

Voici quelques exemples :

- 0x41 (65 en décimal)
- 0x400 (1024 en décimal)
- FAUX : 0x (doit toujours avoir au moins un chiffre - zéro est "0x0")
- FAUX : 0x0400 (aucun zéro non significatif autorisé)
- FAUX : ff (doit être préfixé par 0x)

### Données non formatées {#unformatted-data-encoding}

Lors de l'encodage de données non formatées (tableaux d'octets, adresses de compte, hashs, tableaux de bytecode) : encodez en hexadécimal, préfixez avec "0x", deux chiffres hexadécimaux par octet.

Voici quelques exemples :

- 0x41 (taille 1, "A")
- 0x004200 (taille 3, "0B0")
- 0x (taille 0, "")
- FAUX : 0xf0f0f (doit être un nombre pair de chiffres)
- FAUX : 004200 (doit être préfixé par 0x)

### Le paramètre de bloc {#block-parameter}

Les méthodes suivantes ont un paramètre de bloc :

- [eth_getBalance](#eth-getbalance)
- [eth_getCode](#eth-getcode)
- [eth_getTransactionCount](#eth-gettransactioncount)
- [eth_getStorageAt](#eth-getstorageat)
- [eth_call](#eth-call)

Lorsque des requêtes sont effectuées pour interroger l'état d'Ethereum, le paramètre de bloc fourni détermine la hauteur du bloc.

Les options suivantes sont possibles pour le paramètre de bloc :

- `HEX String` - un numéro de bloc entier
- `String "earliest"` pour le premier bloc / bloc genèse
- `String "latest"` - pour le dernier bloc proposé
- `String "safe"` - pour le dernier bloc de tête sûr
- `String "finalized"` - pour le dernier bloc finalisé
- `String "pending"` - pour l'état / les transactions en attente

## Exemples {#examples}

Sur cette page, nous fournissons des exemples d'utilisation des points de terminaison individuels de l'API JSON_RPC à l'aide de l'outil de ligne de commande [curl](https://curl.se). Ces exemples de points de terminaison individuels se trouvent ci-dessous dans la section [Exemples Curl](#curl-examples). Plus bas sur la page, nous fournissons également un [exemple de bout en bout](#usage-example) pour compiler et déployer un contrat intelligent en utilisant un nœud Geth, l'API JSON_RPC et curl.

## Exemples curl {#curl-examples}

Des exemples d'utilisation de l'API JSON_RPC en effectuant des requêtes [curl](https://curl.se) vers un nœud Ethereum sont fournis ci-dessous. Chaque exemple comprend une description du point de terminaison spécifique, de ses paramètres, de son type de retour et un exemple pratique de la façon dont il doit être utilisé.

Les requêtes curl peuvent renvoyer un message d'erreur relatif au type de contenu. Cela est dû au fait que l'option `--data` définit le type de contenu sur `application/x-www-form-urlencoded`. Si votre nœud s'en plaint, définissez manuellement l'en-tête en plaçant `-H "Content-Type: application/json"` au début de l'appel. Les exemples n'incluent pas non plus la combinaison URL/IP et port qui doit être le dernier argument donné à curl (par ex., `127.0.0.1:8545`). Une requête curl complète incluant ces données supplémentaires prend la forme suivante :

```shell
curl -H "Content-Type: application/json" -X POST --data '{"jsonrpc":"2.0","method":"web3_clientVersion","params":[],"id":67}' 127.0.0.1:8545
```

## Gossip, État, Historique {#gossip-state-history}

Une poignée de méthodes JSON-RPC de base nécessitent des données du réseau Ethereum et se divisent clairement en trois catégories principales : _Gossip, État et Historique_. Utilisez les liens dans ces sections pour accéder à chaque méthode, ou utilisez la table des matières pour explorer la liste complète des méthodes.

### Méthodes Gossip {#gossip-methods}

> Ces méthodes suivent la tête de la chaîne. C'est ainsi que les transactions circulent sur le réseau, trouvent leur place dans les blocs, et comment les clients découvrent les nouveaux blocs.

- [eth_blockNumber](#eth-blocknumber)
- [eth_sendRawTransaction](#eth-sendrawtransaction)

### Méthodes d'état {#state-methods}

> Méthodes qui signalent l'état actuel de toutes les données stockées. L'« état » est comme une grande mémoire vive (RAM) partagée, et inclut les soldes des comptes, les données des contrats et les estimations de gaz.

- [eth_getBalance](#eth-getbalance)
- [eth_getStorageAt](#eth-getstorageat)
- [eth_getTransactionCount](#eth-gettransactioncount)
- [eth_getCode](#eth-getcode)
- [eth_call](#eth-call)
- [eth_estimateGas](#eth-estimategas)

### Méthodes d'historique {#history-methods}

> Récupère les enregistrements historiques de chaque bloc jusqu'au bloc genèse. C'est comme un grand fichier en ajout seul, et cela inclut tous les en-têtes de blocs, les corps de blocs, les blocs oncles et les reçus de transaction.

- [eth_getBlockTransactionCountByHash](#eth-getblocktransactioncountbyhash)
- [eth_getBlockTransactionCountByNumber](#eth-getblocktransactioncountbynumber)
- [eth_getUncleCountByBlockHash](#eth-getunclecountbyblockhash)
- [eth_getUncleCountByBlockNumber](#eth-getunclecountbyblocknumber)
- [eth_getBlockByHash](#eth-getblockbyhash)
- [eth_getBlockByNumber](#eth-getblockbynumber)
- [eth_getTransactionByHash](#eth-gettransactionbyhash)
- [eth_getTransactionByBlockHashAndIndex](#eth-gettransactionbyblockhashandindex)
- [eth_getTransactionByBlockNumberAndIndex](#eth-gettransactionbyblocknumberandindex)
- [eth_getTransactionReceipt](#eth-gettransactionreceipt)
- [eth_getUncleByBlockHashAndIndex](#eth-getunclebyblockhashandindex)
- [eth_getUncleByBlockNumberAndIndex](#eth-getunclebyblocknumberandindex)

## Terrain de jeu de l'API JSON-RPC {#json-rpc-api-playground}

Vous pouvez utiliser [l'outil de terrain de jeu](https://ethereum-json-rpc.com) pour découvrir et essayer les méthodes de l'API. Il vous montre également quelles méthodes et quels réseaux sont pris en charge par divers fournisseurs de nœuds.

## Méthodes de l'API JSON-RPC {#json-rpc-methods}

### web3_clientVersion {#web3-clientversion}

Renvoie la version actuelle du client.

**Paramètres**

Aucun

**Retours**

`String` - La version actuelle du client

**Exemple**

```js
// Requête
curl -X POST --data '{"jsonrpc":"2.0","method":"web3_clientVersion","params":[],"id":67}'
// Résultat
{
  "id":67,
  "jsonrpc":"2.0",
  "result": "Geth/v1.12.1-stable/linux-amd64/go1.19.1"
}
```

### web3_sha3 {#web3-sha3}

Renvoie le Keccak-256 (_et non_ le SHA3-256 standardisé) des données fournies.

**Paramètres**

1. `DATA` - Les données à convertir en un hash SHA3

```js
params: ["0x68656c6c6f20776f726c64"]
```

**Retours**

`DATA` - Le résultat SHA3 de la chaîne fournie.

**Exemple**

```js
// Requête
curl -X POST --data '{"jsonrpc":"2.0","method":"web3_sha3","params":["0x68656c6c6f20776f726c64"],"id":64}'
// Résultat
{
  "id":64,
  "jsonrpc": "2.0",
  "result": "0x47173285a8d7341e5e972fc677286384f802f8ef42a5ec5f03bbfa254cb01fad"
}
```

### net_version {#net-version}

Renvoie l'ID du réseau actuel.

**Paramètres**

Aucun

**Retours**

`String` - L'ID du réseau actuel.

La liste complète des ID de réseau actuels est disponible sur [chainlist.org](https://chainlist.org). En voici quelques-uns parmi les plus courants :

- `1` : réseau principal Ethereum
- `11155111` : réseau de test Sepolia
- `560048` : réseau de test Hoodi

**Exemple**

```js
// Requête
curl -X POST --data '{"jsonrpc":"2.0","method":"net_version","params":[],"id":67}'
// Résultat
{
  "id":67,
  "jsonrpc": "2.0",
  "result": "3"
}
```

### net_listening {#net-listening}

Renvoie `true` si le client écoute activement les connexions réseau.

**Paramètres**

Aucun

**Retours**

`Boolean` - `true` lorsqu'il écoute, sinon `false`.

**Exemple**

```js
// Requête
curl -X POST --data '{"jsonrpc":"2.0","method":"net_listening","params":[],"id":67}'
// Résultat
{
  "id":67,
  "jsonrpc":"2.0",
  "result":true
}
```

### net_peerCount {#net-peercount}

Retourne le nombre de pairs actuellement connectés au client.

**Paramètres**

Aucun

**Retourne**

`QUANTITY` - entier représentant le nombre de pairs connectés.

**Exemple**

```js
// Requête
curl -X POST --data '{"jsonrpc":"2.0","method":"net_peerCount","params":[],"id":74}'
// Résultat
{
  "id":74,
  "jsonrpc": "2.0",
  "result": "0x2" // 2
}
```

### eth_protocolVersion {#eth-protocolversion}

Renvoie la version actuelle du protocole Ethereum. Notez que cette méthode n'est [pas disponible dans Geth](https://github.com/ethereum/go-ethereum/pull/22064#issuecomment-788682924).

**Paramètres**

Aucun

**Retours**

`String` - La version actuelle du protocole Ethereum

**Exemple**

```js
// Requête
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_protocolVersion","params":[],"id":67}'
// Résultat
{
  "id":67,
  "jsonrpc": "2.0",
  "result": "54"
}
```

### eth_syncing {#eth-syncing}

Renvoie un objet contenant des données sur l'état de la synchronisation ou `false`.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_syncing">
  Essayer le point de terminaison dans le bac à sable
</ButtonLink>

**Paramètres**

Aucun

**Retours**

Les données de retour précises varient selon les implémentations des clients. Tous les clients renvoient `False` lorsque le nœud n'est pas en cours de synchronisation, et tous les clients renvoient les champs suivants.

`Object|Boolean`, Un objet contenant des données sur l'état de la synchronisation ou `FALSE`, lorsqu'il n'y a pas de synchronisation :

- `startingBlock` : `QUANTITY` - Le bloc auquel l'importation a commencé (ne sera réinitialisé qu'une fois que la synchronisation aura atteint sa tête)
- `currentBlock` : `QUANTITY` - Le bloc actuel, identique à eth_blockNumber
- `highestBlock` : `QUANTITY` - Le bloc le plus élevé estimé

Cependant, les clients individuels peuvent également fournir des données supplémentaires. Par exemple, Geth renvoie ce qui suit :

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "currentBlock": "0x3cf522",
    "healedBytecodeBytes": "0x0",
    "healedBytecodes": "0x0",
    "healedTrienodes": "0x0",
    "healingBytecode": "0x0",
    "healingTrienodes": "0x0",
    "highestBlock": "0x3e0e41",
    "startingBlock": "0x3cbed5",
    "syncedAccountBytes": "0x0",
    "syncedAccounts": "0x0",
    "syncedBytecodeBytes": "0x0",
    "syncedBytecodes": "0x0",
    "syncedStorage": "0x0",
    "syncedStorageBytes": "0x0"
  }
}
```

Tandis que Besu renvoie :

```json
{
  "jsonrpc": "2.0",
  "id": 51,
  "result": {
    "startingBlock": "0x0",
    "currentBlock": "0x1518",
    "highestBlock": "0x9567a3",
    "pulledStates": "0x203ca",
    "knownStates": "0x200636"
  }
}
```

Consultez la documentation de votre client spécifique pour plus de détails.

**Exemple**

```js
// Requête
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_syncing","params":[],"id":1}'
// Résultat
{
  "id":1,
  "jsonrpc": "2.0",
  "result": {
    startingBlock: '0x384',
    currentBlock: '0x386',
    highestBlock: '0x454'
  }
}
// Ou lorsqu'il n'y a pas de synchronisation
{
  "id":1,
  "jsonrpc": "2.0",
  "result": false
}
```

### eth_coinbase {#eth-coinbase}

Renvoie l'adresse Coinbase du client.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_coinbase">
  Essayer le point de terminaison dans le bac à sable
</ButtonLink>

> **Remarque :** Cette méthode est dépréciée depuis la version **v1.14.0** et n'est plus prise en charge. Toute tentative d'utilisation de cette méthode entraînera une erreur « Method not supported ».

**Paramètres**

Aucun

**Retours**

`DATA`, 20 octets - l'adresse Coinbase actuelle.

**Exemple**

```js
// Requête
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_coinbase","params":[],"id":64}'
// Résultat
{
  "id":64,
  "jsonrpc": "2.0",
  "result": "0x407d73d8a49eeb85d32cf465507dd71d507100c1"
}
```

### eth_chainId {#eth-chainid}

Renvoie l'ID de la chaîne utilisé pour signer les transactions protégées contre le rejeu.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_chainId">
  Essayer le point de terminaison dans le terrain de jeu
</ButtonLink>

**Paramètres**

Aucun

**Retours**

`chainId`, valeur hexadécimale sous forme de chaîne de caractères représentant l'entier de l'ID de la chaîne actuelle.

**Exemple**

```js
// Requête
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_chainId","params":[],"id":67}'
// Résultat
{
  "id":67,
  "jsonrpc": "2.0",
  "result": "0x1"
}
```

### eth_mining {#eth-mining}

Renvoie `true` si le client mine activement de nouveaux blocs. Cela ne peut renvoyer `true` que pour les réseaux à preuve de travail et peut ne pas être disponible dans certains clients depuis [La Fusion](/roadmap/merge/).

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_mining">
  Essayer le point de terminaison dans le bac à sable
</ButtonLink>

**Paramètres**

Aucun

**Retours**

`Boolean` - renvoie `true` si le client mine, sinon `false`.

**Exemple**

```js
// Requête
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_mining","params":[],"id":71}'
//
{
  "id":71,
  "jsonrpc": "2.0",
  "result": true
}
```

### eth_hashrate {#eth-hashrate}

Renvoie le nombre de hashs par seconde avec lesquels le nœud mine. Cela ne peut renvoyer `true` que pour les réseaux à preuve de travail et peut ne pas être disponible dans certains clients depuis [La Fusion](/roadmap/merge/).

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_hashrate">
  Tester le point de terminaison dans le bac à sable
</ButtonLink>

**Paramètres**

Aucun

**Retours**

`QUANTITY` - nombre de hashs par seconde.

**Exemple**

```js
// Requête
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_hashrate","params":[],"id":71}'
// Résultat
{
  "id":71,
  "jsonrpc": "2.0",
  "result": "0x38a"
}
```

### eth_gasPrice {#eth-gasprice}

Renvoie une estimation du prix actuel par gaz en Wei. Par exemple, le client Besu examine les 100 derniers blocs et renvoie le prix unitaire médian du gaz par défaut.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_gasPrice">
  Essayer le point de terminaison dans le bac à sable
</ButtonLink>

**Paramètres**

Aucun

**Retours**

`QUANTITY` - entier du prix actuel du gaz en Wei.

**Exemple**

```js
// Requête
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_gasPrice","params":[],"id":73}'
// Résultat
{
  "id":73,
  "jsonrpc": "2.0",
  "result": "0x1dfd14000" // 8049999872 Wei
}
```

### eth_accounts {#eth-accounts}

Renvoie une liste d'adresses détenues par le client.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_accounts">
  Essayer le point de terminaison dans le terrain de jeu
</ButtonLink>

**Paramètres**

Aucun

**Retours**

`Array of DATA`, 20 octets - adresses détenues par le client.

**Exemple**

```js
// Requête
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_accounts","params":[],"id":1}'
// Résultat
{
  "id":1,
  "jsonrpc": "2.0",
  "result": ["0x407d73d8a49eeb85d32cf465507dd71d507100c1"]
}
```

### eth_blockNumber {#eth-blocknumber}

Renvoie le numéro du bloc le plus récent.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_blockNumber">
  Essayer le point de terminaison dans le bac à sable
</ButtonLink>

**Paramètres**

Aucun

**Retours**

`QUANTITY` - entier du numéro du bloc actuel sur lequel se trouve le client.

**Exemple**

```js
// Requête
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_blockNumber","params":[],"id":83}'
// Résultat
{
  "id":83,
  "jsonrpc": "2.0",
  "result": "0x4b7" // 1207
}
```

### eth_getBalance {#eth-getbalance}

Renvoie le solde du compte à une adresse donnée.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getBalance">
  Essayer le point de terminaison dans le terrain de jeu
</ButtonLink>

**Paramètres**

1. `DATA`, 20 octets - adresse dont on veut vérifier le solde.
2. `QUANTITY|TAG` - numéro de bloc entier, ou la chaîne de caractères `"latest"`, `"earliest"`, `"pending"`, `"safe"` ou `"finalized"`, voir le [paramètre de bloc](/developers/docs/apis/json-rpc/#block-parameter)

```js
params: ["0x407d73d8a49eeb85d32cf465507dd71d507100c1", "latest"]
```

**Retours**

`QUANTITY` - entier représentant le solde actuel en Wei.

**Exemple**

```js
// Requête
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getBalance","params":["0x407d73d8a49eeb85d32cf465507dd71d507100c1", "latest"],"id":1}'
// Résultat
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x0234c8a3397aab58" // 158972490234375000
}
```

### eth_getStorageAt {#eth-getstorageat}

Renvoie la valeur d'une position de stockage à une adresse donnée.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getStorageAt">
  Essayer le point de terminaison dans le terrain de jeu
</ButtonLink>

**Paramètres**

1. `DATA`, 20 octets - adresse du stockage.
2. `QUANTITY` - entier de la position dans le stockage.
3. `QUANTITY|TAG` - numéro de bloc entier, ou la chaîne de caractères `"latest"`, `"earliest"`, `"pending"`, `"safe"`, `"finalized"`, voir le [paramètre de bloc](/developers/docs/apis/json-rpc/#block-parameter)

**Retours**

`DATA` - la valeur à cette position de stockage.

**Exemple**
Le calcul de la position correcte dépend du stockage à récupérer. Considérez le contrat suivant déployé à `0x295a70b2de5e3953354a6a8344e616ed314d7251` par l'adresse `0x391694e7e0b0cce554cb130d723a9d27458f9298`.

```
contract Storage {
    uint pos0;
    mapping(address => uint) pos1;
    constructor() {
        pos0 = 1234;
        pos1[msg.sender] = 5678;
    }
}
```

La récupération de la valeur de pos0 est simple :

```js
curl -X POST --data '{"jsonrpc":"2.0", "method": "eth_getStorageAt", "params": ["0x295a70b2de5e3953354a6a8344e616ed314d7251", "0x0", "latest"], "id": 1}' localhost:8545
{"jsonrpc":"2.0","id":1,"result":"0x00000000000000000000000000000000000000000000000000000000000004d2"}
```

La récupération d'un élément de la map est plus difficile. La position d'un élément dans la map est calculée avec :

```js
keccak(LeftPad32(key, 0), LeftPad32(map position, 0))
```

Cela signifie que pour récupérer le stockage sur pos1["0x391694e7e0b0cce554cb130d723a9d27458f9298"], nous devons calculer la position avec :

```js
keccak(
  decodeHex(
    "000000000000000000000000391694e7e0b0cce554cb130d723a9d27458f9298" +
      "0000000000000000000000000000000000000000000000000000000000000001"
  )
)
```

La console geth qui est fournie avec la bibliothèque Web3 peut être utilisée pour faire le calcul :

```js
> var key = "000000000000000000000000391694e7e0b0cce554cb130d723a9d27458f9298" + "0000000000000000000000000000000000000000000000000000000000000001"
undefined
> web3.sha3(key, {"encoding": "hex"})
"0x6661e9d6d8b923d5bbaab1b96e1dd51ff6ea2a93520fdc9eb75d059238b8c5e9"
```

Maintenant, pour récupérer le stockage :

```js
curl -X POST --data '{"jsonrpc":"2.0", "method": "eth_getStorageAt", "params": ["0x295a70b2de5e3953354a6a8344e616ed314d7251", "0x6661e9d6d8b923d5bbaab1b96e1dd51ff6ea2a93520fdc9eb75d059238b8c5e9", "latest"], "id": 1}' localhost:8545
{"jsonrpc":"2.0","id":1,"result":"0x000000000000000000000000000000000000000000000000000000000000162e"}
```

### eth_getTransactionCount {#eth-gettransactioncount}

Renvoie le nombre de transactions _envoyées_ depuis une adresse.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getTransactionCount">
  Essayer le point de terminaison dans le bac à sable
</ButtonLink>

**Paramètres**

1. `DATA`, 20 octets - adresse.
2. `QUANTITY|TAG` - numéro de bloc entier, ou la chaîne de caractères `"latest"`, `"earliest"`, `"pending"`, `"safe"` ou `"finalized"`, voir le [paramètre de bloc](/developers/docs/apis/json-rpc/#block-parameter)

```js
params: [
  "0x407d73d8a49eeb85d32cf465507dd71d507100c1",
  "latest", // état au dernier bloc
]
```

**Retours**

`QUANTITY` - entier représentant le nombre de transactions envoyées depuis cette adresse.

**Exemple**

```js
// Requête
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getTransactionCount","params":["0x407d73d8a49eeb85d32cf465507dd71d507100c1","latest"],"id":1}'
// Résultat
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x1" // 1
}
```

### eth_getBlockTransactionCountByHash {#eth-getblocktransactioncountbyhash}

Renvoie le nombre de transactions dans un bloc à partir d'un bloc correspondant au hash de bloc donné.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getBlockTransactionCountByHash">
  Essayer le point de terminaison dans le bac à sable
</ButtonLink>

**Paramètres**

1. `DATA`, 32 octets - hash d'un bloc

```js
params: ["0xd03ededb7415d22ae8bac30f96b2d1de83119632693b963642318d87d1bece5b"]
```

**Retours**

`QUANTITY` - entier représentant le nombre de transactions dans ce bloc.

**Exemple**

```js
// Requête
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getBlockTransactionCountByHash","params":["0xd03ededb7415d22ae8bac30f96b2d1de83119632693b963642318d87d1bece5b"],"id":1}'
// Résultat
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x8b" // 139
}
```

### eth_getBlockTransactionCountByNumber {#eth-getblocktransactioncountbynumber}

Renvoie le nombre de transactions dans un bloc correspondant au numéro de bloc donné.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getBlockTransactionCountByNumber">
  Essayer le point de terminaison dans le bac à sable
</ButtonLink>

**Paramètres**

1. `QUANTITY|TAG` - entier d'un numéro de bloc, ou la chaîne de caractères `"earliest"`, `"latest"`, `"pending"`, `"safe"` ou `"finalized"`, comme dans le [paramètre de bloc](/developers/docs/apis/json-rpc/#block-parameter).

```js
params: [
  "0x13738ca", // 20396234
]
```

**Retours**

`QUANTITY` - entier représentant le nombre de transactions dans ce bloc.

**Exemple**

```js
// Requête
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getBlockTransactionCountByNumber","params":["0x13738ca"],"id":1}'
// Résultat
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x8b" // 139
}
```

### eth_getUncleCountByBlockHash {#eth-getunclecountbyblockhash}

Renvoie le nombre d'oncles dans un bloc à partir d'un bloc correspondant au hash de bloc donné.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getUncleCountByBlockHash">
  Essayer le point de terminaison dans le bac à sable
</ButtonLink>

**Paramètres**

1. `DATA`, 32 octets - hash d'un bloc

```js
params: ["0x1d59ff54b1eb26b013ce3cb5fc9dab3705b415a67127a003c3e61eb445bb8df2"]
```

**Retours**

`QUANTITY` - entier représentant le nombre d'oncles dans ce bloc.

**Exemple**

```js
// Requête
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getUncleCountByBlockHash","params":["0x1d59ff54b1eb26b013ce3cb5fc9dab3705b415a67127a003c3e61eb445bb8df2"],"id":1}'
// Résultat
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x1" // 1
}
```

### eth_getUncleCountByBlockNumber {#eth-getunclecountbyblocknumber}

Renvoie le nombre d'oncles d'un bloc correspondant au numéro de bloc donné.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getUncleCountByBlockNumber">
  Essayer le point de terminaison dans le bac à sable
</ButtonLink>

**Paramètres**

1. `QUANTITY|TAG` - entier d'un numéro de bloc, ou la chaîne de caractères `"latest"`, `"earliest"`, `"pending"`, `"safe"` ou `"finalized"`, voir le [paramètre de bloc](/developers/docs/apis/json-rpc/#block-parameter)

```js
params: [
  "0xe8", // 232
]
```

**Retours**

`QUANTITY` - entier du nombre d'oncles dans ce bloc.

**Exemple**

```js
// Requête
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getUncleCountByBlockNumber","params":["0xe8"],"id":1}'
// Résultat
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x0" // 0
}
```

### eth_getCode {#eth-getcode}

Retourne le code à une adresse donnée.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getCode">
  Essayer le point de terminaison dans le bac à sable
</ButtonLink>

**Paramètres**

1. `DATA`, 20 octets - adresse
2. `QUANTITY|TAG` - numéro de bloc entier, ou la chaîne de caractères `"latest"`, `"earliest"`, `"pending"`, `"safe"` ou `"finalized"`, voir le [paramètre de bloc](/developers/docs/apis/json-rpc/#block-parameter)

```js
params: [
  "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
  "0x5daf3b", // 6139707
]
```

**Retour**

`DATA` - le code de l'adresse donnée.

**Exemple**

```js
// Requête
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getCode","params":["0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2", "0x5daf3b"],"id":1}'
// Résultat
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x6060604052600436106100af576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806306fdde03146100b9578063095ea7b31461014757806318160ddd146101a157806323b872dd146101ca5780632e1a7d4d14610243578063313ce5671461026657806370a082311461029557806395d89b41146102e2578063a9059cbb14610370578063d0e30db0146103ca578063dd62ed3e146103d4575b6100b7610440565b005b34156100c457600080fd5b6100cc6104dd565b6040518080602001828103825283818151815260200191508051906020019080838360005b8381101561010c5780820151818401526020810190506100f1565b50505050905090810190601f1680156101395780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b341561015257600080fd5b610187600480803573ffffffffffffffffffffffffffffffffffffffff1690602001909190803590602001909190505061057b565b604051808215151515815260200191505060405180910390f35b34156101ac57600080fd5b6101b461066d565b6040518082815260200191505060405180910390f35b34156101d557600080fd5b610229600480803573ffffffffffffffffffffffffffffffffffffffff1690602001909190803573ffffffffffffffffffffffffffffffffffffffff1690602001909190803590602001909190505061068c565b604051808215151515815260200191505060405180910390f35b341561024e57600080fd5b61026460048080359060200190919050506109d9565b005b341561027157600080fd5b610279610b05565b604051808260ff1660ff16815260200191505060405180910390f35b34156102a057600080fd5b6102cc600480803573ffffffffffffffffffffffffffffffffffffffff16906020019091905050610b18565b6040518082815260200191505060405180910390f35b34156102ed57600080fd5b6102f5610b30565b6040518080602001828103825283818151815260200191508051906020019080838360005b8381101561033557808201518184015260208101905061031a565b50505050905090810190601f1680156103625780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b341561037b57600080fd5b6103b0600480803573ffffffffffffffffffffffffffffffffffffffff16906020019091908035906020019091905050610bce565b604051808215151515815260200191505060405180910390f35b6103d2610440565b005b34156103df57600080fd5b61042a600480803573ffffffffffffffffffffffffffffffffffffffff1690602001909190803573ffffffffffffffffffffffffffffffffffffffff16906020019091905050610be3565b6040518082815260200191505060405180910390f35b34600360003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825401925050819055503373ffffffffffffffffffffffffffffffffffffffff167fe1fffcc4923d04b559f4d29a8bfc6cda04eb5b0d3c460751c2402c5c5cc9109c346040518082815260200191505060405180910390a2565b60008054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156105735780601f1061054857610100808354040283529160200191610573565b820191906000526020600020905b81548152906001019060200180831161055657829003601f168201915b505050505081565b600081600460003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508273ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925846040518082815260200191505060405180910390a36001905092915050565b60003073ffffffffffffffffffffffffffffffffffffffff1631905090565b600081600360008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054101515156106dc57600080fd5b3373ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff16141580156107b457507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff600460008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205414155b156108cf5781600460008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020541015151561084457600080fd5b81600460008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825403925050819055505b81600360008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000828254039250508190555081600360008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825401925050819055508273ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef846040518082815260200191505060405180910390a3600190509392505050565b80600360003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205410151515610a2757600080fd5b80600360003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825403925050819055503373ffffffffffffffffffffffffffffffffffffffff166108fc829081150290604051600060405180830381858888f193505050501515610ab457600080fd5b3373ffffffffffffffffffffffffffffffffffffffff167f7fcf532c15f0a6db0bd6d0e038bea71d30d808c7d98cb3bf7268a95bf5081b65826040518082815260200191505060405180910390a250565b600260009054906101000a900460ff1681565b60036020528060005260406000206000915090505481565b60018054600181600116156101000203166002900480601f016020809104026020016040519081016040528092919081815260200182805460018160011615610100020316600290048015610bc65780601f10610b9b57610100808354040283529160200191610bc6565b820191906000526020600020905b815481529060010190602001808311610ba957829003601f168201915b505050505081565b6000610bdb33848461068c565b905092915050565b60046020528160005260406000206020528060005260406000206000915091505054815600a165627a7a72305820deb4c2ccab3c2fdca32ab3f46728389c2fe2c165d5fafa07661e4e004f6c344a0029"
}
```

### eth_sign {#eth-sign}

La méthode sign calcule une signature spécifique à Ethereum avec : `sign(keccak256("\x19Ethereum Signed Message:\n" + len(message) + message)))`.

L'ajout d'un préfixe au message rend la signature calculée reconnaissable en tant que signature spécifique à Ethereum. Cela empêche les abus où une application décentralisée (dapp) malveillante peut signer des données arbitraires (par ex., une transaction) et utiliser la signature pour usurper l'identité de la victime.

Remarque : l'adresse avec laquelle signer doit être déverrouillée.

**Paramètres**

1. `DATA`, 20 octets - adresse
2. `DATA`, N octets - message à signer

**Retours**

`DATA` : Signature

**Exemple**

```js
// Requête
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_sign","params":["0x9b2055d370f73ec7d8a03e965129118dc8f5bf83", "0xdeadbeaf"],"id":1}'
// Résultat
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0xa3f20717a250c2b0b729b7e5becbff67fdaef7e0699da4de7ca5895b02a170a12d887fd3b17bfdce3481f10bea41f45ba9f709d39ce8325427b57afcfc994cee1b"
}
```

### eth_signTransaction {#eth-signtransaction}

Signe une transaction qui peut être soumise au réseau ultérieurement en utilisant [eth_sendRawTransaction](#eth-sendrawtransaction).

**Paramètres**

1. `Object` - L'objet de la transaction

- `type` :
- `from` : `DATA`, 20 octets - L'adresse depuis laquelle la transaction est envoyée.
- `to` : `DATA`, 20 octets - (optionnel lors de la création d'un nouveau contrat) L'adresse vers laquelle la transaction est dirigée.
- `gas` : `QUANTITY` - (optionnel, par défaut : 90000) Entier représentant le gaz fourni pour l'exécution de la transaction. Le gaz non utilisé sera renvoyé.
- `gasPrice` : `QUANTITY` - (optionnel, par défaut : à déterminer) Entier représentant le prix du gaz (gasPrice) utilisé pour chaque gaz payé, en Wei.
- `value` : `QUANTITY` - (optionnel) Entier représentant la valeur envoyée avec cette transaction, en Wei.
- `data` : `DATA` - Le code compilé d'un contrat OU le hash de la signature de la méthode invoquée et des paramètres encodés.
- `nonce` : `QUANTITY` - (optionnel) Entier représentant un nonce. Cela permet d'écraser vos propres transactions en attente qui utilisent le même nonce.

**Retours**

`DATA`, L'objet de la transaction encodé en RLP et signé par le compte spécifié.

**Exemple**

```js
// Requête
curl -X POST --data '{"id": 1,"jsonrpc": "2.0","method": "eth_signTransaction","params": [{"data":"0xd46e8dd67c5d32be8d46e8dd67c5d32be8058bb8eb970870f072445675058bb8eb970870f072445675","from": "0xb60e8dd61c5d32be8058bb8eb970870f07233155","gas": "0x76c0","gasPrice": "0x9184e72a000","to": "0xd46e8dd67c5d32be8058bb8eb970870f07244567","value": "0x9184e72a"}]}'
// Résultat
{
    "id": 1,
    "jsonrpc": "2.0",
    "result": "0xa3f20717a250c2b0b729b7e5becbff67fdaef7e0699da4de7ca5895b02a170a12d887fd3b17bfdce3481f10bea41f45ba9f709d39ce8325427b57afcfc994cee1b"
}
```

### eth_sendTransaction {#eth-sendtransaction}

Crée une nouvelle transaction d'appel de message ou une création de contrat, si le champ de données contient du code, et la signe en utilisant le compte spécifié dans `from`.

**Paramètres**

1. `Object` - L'objet de la transaction

- `from` : `DATA`, 20 octets - L'adresse depuis laquelle la transaction est envoyée.
- `to` : `DATA`, 20 octets - (facultatif lors de la création d'un nouveau contrat) L'adresse vers laquelle la transaction est dirigée.
- `gas` : `QUANTITY` - (facultatif, par défaut : 90000) Entier représentant le gaz fourni pour l'exécution de la transaction. Le gaz non utilisé sera renvoyé.
- `gasPrice` : `QUANTITY` - (facultatif, par défaut : à déterminer) Entier représentant le prix du gaz utilisé pour chaque gaz payé.
- `value` : `QUANTITY` - (facultatif) Entier représentant la valeur envoyée avec cette transaction.
- `input` : `DATA` - Le code compilé d'un contrat OU le hash de la signature de la méthode invoquée et des paramètres encodés.
- `nonce` : `QUANTITY` - (facultatif) Entier représentant un nonce. Cela permet d'écraser vos propres transactions en attente qui utilisent le même nonce.

```js
params: [
  {
    from: "0xb60e8dd61c5d32be8058bb8eb970870f07233155",
    to: "0xd46e8dd67c5d32be8058bb8eb970870f07244567",
    gas: "0x76c0", // 30400
    gasPrice: "0x9184e72a000", // 10000000000000
    value: "0x9184e72a", // 2441406250
    input:
      "0xd46e8dd67c5d32be8d46e8dd67c5d32be8058bb8eb970870f072445675058bb8eb970870f072445675",
  },
]
```

**Retours**

`DATA`, 32 octets - le hachage de transaction, ou le hash zéro si la transaction n'est pas encore disponible.

Utilisez [eth_getTransactionReceipt](#eth-gettransactionreceipt) pour obtenir l'adresse du contrat, une fois que la transaction a été proposée dans un bloc, lorsque vous avez créé un contrat.

**Exemple**

```js
// Requête
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_sendTransaction","params":[{see above}],"id":1}'
// Résultat
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0xe670ec64341771606e55d6b4ca35a1a6b75ee3d5145a99d05921026d1527331"
}
```

### eth_sendRawTransaction {#eth-sendrawtransaction}

Crée une nouvelle transaction d'appel de message ou une création de contrat pour les transactions signées.

**Paramètres**

1. `DATA`, Les données de la transaction signée.

```js
params: [
  "0xd46e8dd67c5d32be8d46e8dd67c5d32be8058bb8eb970870f072445675058bb8eb970870f072445675",
]
```

**Retours**

`DATA`, 32 octets - le hachage de transaction, ou le hachage nul si la transaction n'est pas encore disponible.

Utilisez [eth_getTransactionReceipt](#eth-gettransactionreceipt) pour obtenir l'adresse du contrat, une fois que la transaction a été proposée dans un bloc, lorsque vous avez créé un contrat.

**Exemple**

```js
// Requête
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_sendRawTransaction","params":[{see above}],"id":1}'
// Résultat
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0xe670ec64341771606e55d6b4ca35a1a6b75ee3d5145a99d05921026d1527331"
}
```

### eth_call {#eth-call}

Exécute un nouvel appel de message immédiatement sans créer de transaction sur la chaîne de blocs. Souvent utilisé pour exécuter des fonctions de contrat intelligent en lecture seule, par exemple le `balanceOf` pour un contrat ERC-20.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_call">
  Essayer le point de terminaison dans le bac à sable
</ButtonLink>

**Paramètres**

1. `Object` - L'objet d'appel de transaction

- `from` : `DATA`, 20 octets - (facultatif) L'adresse depuis laquelle la transaction est envoyée.
- `to` : `DATA`, 20 octets - L'adresse vers laquelle la transaction est dirigée.
- `gas` : `QUANTITY` - (facultatif) Entier représentant le gaz fourni pour l'exécution de la transaction. eth_call ne consomme aucun gaz, mais ce paramètre peut être requis par certaines exécutions.
- `gasPrice` : `QUANTITY` - (facultatif) Entier représentant le prix du gaz utilisé pour chaque gaz payé.
- `value` : `QUANTITY` - (facultatif) Entier représentant la valeur envoyée avec cette transaction.
- `input` : `DATA` - (facultatif) Hash de la signature de la méthode et des paramètres encodés. Pour plus de détails, voir [l'ABI de contrat Ethereum dans la documentation Solidity](https://docs.soliditylang.org/en/latest/abi-spec.html).

2. `QUANTITY|TAG` - numéro de bloc entier, ou la chaîne de caractères `"latest"`, `"earliest"`, `"pending"`, `"safe"` ou `"finalized"`, voir le [paramètre de bloc](/developers/docs/apis/json-rpc/#block-parameter)

**Retours**

`DATA` - la valeur de retour du contrat exécuté.

**Exemple**

```js
// Requête
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_call","params":[{see above}],"id":1}'
// Résultat
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x"
}
```

### eth_estimateGas {#eth-estimategas}

Génère et retourne une estimation de la quantité de gaz nécessaire pour permettre à la transaction d'aboutir. La transaction ne sera pas ajoutée à la chaîne de blocs. Notez que l'estimation peut être considérablement supérieure à la quantité de gaz réellement utilisée par la transaction, pour diverses raisons, notamment la mécanique de l'EVM et les performances du nœud.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_estimateGas">
  Essayer le point de terminaison dans le bac à sable
</ButtonLink>

**Paramètres**

Voir les paramètres de [eth_call](#eth-call), à l'exception du fait que toutes les propriétés sont facultatives. Si aucune limite de gaz n'est spécifiée, Geth utilise la limite de gaz du bloc en attente comme limite supérieure. Par conséquent, l'estimation retournée pourrait ne pas être suffisante pour exécuter l'appel/la transaction lorsque la quantité de gaz est supérieure à la limite de gaz du bloc en attente.

**Retours**

`QUANTITY` - la quantité de gaz utilisée.

**Exemple**

```js
// Requête
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_estimateGas","params":[{see above}],"id":1}'
// Résultat
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x5208" // 21000
}
```

### eth_getBlockByHash {#eth-getblockbyhash}

Renvoie des informations sur un bloc à partir de son hash.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getBlockByHash">
  Essayer l'endpoint dans le playground
</ButtonLink>

**Paramètres**

1. `DATA`, 32 octets - Hash d'un bloc.
2. `Boolean` - Si `true`, renvoie les objets de transaction complets ; si `false`, renvoie uniquement les hashs des transactions.

```js
params: [
  "0xdc0818cf78f21a8e70579cb46a43643f78291264dda342ae31049421c82d21ae",
  false,
]
```

**Retours**

`Object` - Un objet bloc, ou `null` lorsqu'aucun bloc n'a été trouvé :

- `number` : `QUANTITY` - le numéro du bloc. `null` s'il s'agit d'un bloc en attente.
- `hash` : `DATA`, 32 octets - hash du bloc. `null` s'il s'agit d'un bloc en attente.
- `parentHash` : `DATA`, 32 octets - hash du bloc parent.
- `nonce` : `DATA`, 8 octets - hash de la preuve de travail (PoW) générée. `null` s'il s'agit d'un bloc en attente, `0x0` pour les blocs en preuve d'enjeu (PoS) (depuis La Fusion).
- `sha3Uncles` : `DATA`, 32 octets - SHA3 des données des oncles dans le bloc.
- `logsBloom` : `DATA`, 256 octets - le filtre de Bloom pour les journaux du bloc. `null` s'il s'agit d'un bloc en attente.
- `transactionsRoot` : `DATA`, 32 octets - la racine du trie des transactions du bloc.
- `stateRoot` : `DATA`, 32 octets - la racine du trie d'état final du bloc.
- `receiptsRoot` : `DATA`, 32 octets - la racine du trie des reçus du bloc.
- `miner` : `DATA`, 20 octets - l'adresse du bénéficiaire à qui les récompenses du bloc ont été attribuées.
- `difficulty` : `QUANTITY` - entier représentant la difficulté pour ce bloc.
- `totalDifficulty` : `QUANTITY` - entier représentant la difficulté totale de la chaîne jusqu'à ce bloc.
- `extraData` : `DATA` - le champ « extra data » de ce bloc.
- `size` : `QUANTITY` - entier représentant la taille de ce bloc en octets.
- `gasLimit` : `QUANTITY` - le gaz maximum autorisé dans ce bloc.
- `gasUsed` : `QUANTITY` - le gaz total utilisé par toutes les transactions dans ce bloc.
- `timestamp` : `QUANTITY` - l'horodatage Unix du moment où le bloc a été assemblé.
- `transactions` : `Array` - Tableau d'objets de transaction, ou hashs de transaction de 32 octets selon le dernier paramètre fourni.
- `uncles` : `Array` - Tableau des hashs d'oncles.

**Exemple**

```js
// Requête
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getBlockByHash","params":["0xdc0818cf78f21a8e70579cb46a43643f78291264dda342ae31049421c82d21ae", false],"id":1}'
// Résultat
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "difficulty": "0x4ea3f27bc",
    "extraData": "0x476574682f4c5649562f76312e302e302f6c696e75782f676f312e342e32",
    "gasLimit": "0x1388",
    "gasUsed": "0x0",
    "hash": "0xdc0818cf78f21a8e70579cb46a43643f78291264dda342ae31049421c82d21ae",
    "logsBloom": "0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
    "miner": "0xbb7b8287f3f0a933474a79eae42cbca977791171",
    "mixHash": "0x4fffe9ae21f1c9e15207b1f472d5bbdd68c9595d461666602f2be20daf5e7843",
    "nonce": "0x689056015818adbe",
    "number": "0x1b4",
    "parentHash": "0xe99e022112df268087ea7eafaf4790497fd21dbeeb6bd7a1721df161a6657a54",
    "receiptsRoot": "0x56e81f171bcc55a6ff8345e692c0f86e5b48e01b996cadc001622fb5e363b421",
    "sha3Uncles": "0x1dcc4de8dec75d7aab85b567b6ccd41ad312451b948a7413f0a142fd40d49347",
    "size": "0x220",
    "stateRoot": "0xddc8b0234c2e0cad087c8b389aa7ef01f7d79b2570bccb77ce48648aa61c904d",
    "timestamp": "0x55ba467c",
    "totalDifficulty": "0x78ed983323d",
    "transactions": [
    ],
    "transactionsRoot": "0x56e81f171bcc55a6ff8345e692c0f86e5b48e01b996cadc001622fb5e363b421",
    "uncles": [
    ]
  }
}
```

### eth_getBlockByNumber {#eth-getblockbynumber}

Renvoie des informations sur un bloc à partir de son numéro.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getBlockByNumber">
  Essayer le point de terminaison dans le bac à sable
</ButtonLink>

**Paramètres**

1. `QUANTITY|TAG` - l'entier d'un numéro de bloc, ou la chaîne de caractères `"earliest"`, `"latest"`, `"pending"`, `"safe"` ou `"finalized"`, comme dans le [paramètre de bloc](/developers/docs/apis/json-rpc/#block-parameter).
2. `Boolean` - Si `true`, renvoie les objets de transaction complets, si `false`, uniquement les hashs des transactions.

```js
params: [
  "0x1b4", // 436
  true,
]
```

**Retours**
Voir [eth_getBlockByHash](#eth-getblockbyhash)

**Exemple**

```js
// Requête
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getBlockByNumber","params":["0x1b4", true],"id":1}'
```

Pour le résultat, voir [eth_getBlockByHash](#eth-getblockbyhash)

### eth_getTransactionByHash {#eth-gettransactionbyhash}

Renvoie les informations concernant une transaction demandée par son hachage de transaction.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getTransactionByHash">
  Essayer le point de terminaison dans le bac à sable
</ButtonLink>

**Paramètres**

1. `DATA`, 32 octets - hash d'une transaction

```js
params: ["0x88df016429689c079f3b2f6ad39fa052532c56795b733da78a91ebe6a713944b"]
```

**Retours**

`Object` - Un objet de transaction, ou `null` lorsqu'aucune transaction n'a été trouvée :

- `blockHash` : `DATA`, 32 octets - hash du bloc dans lequel se trouvait cette transaction. `null` lorsqu'elle est en attente.
- `blockNumber` : `QUANTITY` - numéro du bloc dans lequel se trouvait cette transaction. `null` lorsqu'elle est en attente.
- `from` : `DATA`, 20 octets - adresse de l'expéditeur.
- `gas` : `QUANTITY` - gaz fourni par l'expéditeur.
- `gasPrice` : `QUANTITY` - prix du gaz fourni par l'expéditeur en Wei.
- `hash` : `DATA`, 32 octets - hash de la transaction.
- `input` : `DATA` - les données envoyées avec la transaction.
- `nonce` : `QUANTITY` - le nombre de transactions effectuées par l'expéditeur avant celle-ci.
- `to` : `DATA`, 20 octets - adresse du destinataire. `null` lorsqu'il s'agit d'une transaction de création de contrat.
- `transactionIndex` : `QUANTITY` - entier de la position de l'indice de la transaction dans le bloc. `null` lorsqu'elle est en attente.
- `value` : `QUANTITY` - valeur transférée en Wei.
- `v` : `QUANTITY` - identifiant de récupération ECDSA
- `r` : `QUANTITY` - signature ECDSA r
- `s` : `QUANTITY` - signature ECDSA s

**Exemple**

```js
// Requête
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getTransactionByHash","params":["0x88df016429689c079f3b2f6ad39fa052532c56795b733da78a91ebe6a713944b"],"id":1}'
// Résultat
{
  "jsonrpc":"2.0",
  "id":1,
  "result":{
    "blockHash":"0x1d59ff54b1eb26b013ce3cb5fc9dab3705b415a67127a003c3e61eb445bb8df2",
    "blockNumber":"0x5daf3b", // 6139707
    "from":"0xa7d9ddbe1f17865597fbd27ec712455208b6b76d",
    "gas":"0xc350", // 50000
    "gasPrice":"0x4a817c800", // 20000000000
    "hash":"0x88df016429689c079f3b2f6ad39fa052532c56795b733da78a91ebe6a713944b",
    "input":"0x68656c6c6f21",
    "nonce":"0x15", // 21
    "to":"0xf02c1c8e6114b1dbe8937a39260b5b0a374432bb",
    "transactionIndex":"0x41", // 65
    "value":"0xf3dbb76162000", // 4290000000000000
    "v":"0x25", // 37
    "r":"0x1b5e176d927f8e9ab405058b2d2457392da3e20f328b16ddabcebc33eaac5fea",
    "s":"0x4ba69724e8f69de52f0125ad8b3c5c2cef33019bac3249e2c0a2192766d1721c"
  }
}
```

### eth_getTransactionByBlockHashAndIndex {#eth-gettransactionbyblockhashandindex}

Renvoie des informations sur une transaction à partir du hash du bloc et de la position de l'indice de la transaction.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getTransactionByBlockHashAndIndex">
  Essayer le point de terminaison dans le bac à sable
</ButtonLink>

**Paramètres**

1. `DATA`, 32 octets - hash d'un bloc.
2. `QUANTITY` - entier de la position de l'indice de la transaction.

```js
params: [
  "0x1d59ff54b1eb26b013ce3cb5fc9dab3705b415a67127a003c3e61eb445bb8df2",
  "0x0", // 0
]
```

**Retours**
Voir [eth_getTransactionByHash](#eth-gettransactionbyhash)

**Exemple**

```js
// Requête
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getTransactionByBlockHashAndIndex","params":["0x1d59ff54b1eb26b013ce3cb5fc9dab3705b415a67127a003c3e61eb445bb8df2", "0x0"],"id":1}'
```

Pour le résultat, voir [eth_getTransactionByHash](#eth-gettransactionbyhash)

### eth_getTransactionByBlockNumberAndIndex {#eth-gettransactionbyblocknumberandindex}

Renvoie des informations sur une transaction en fonction du numéro de bloc et de la position de l'indice de la transaction.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getTransactionByBlockNumberAndIndex">
  Essayer le point de terminaison dans le bac à sable
</ButtonLink>

**Paramètres**

1. `QUANTITY|TAG` - un numéro de bloc, ou la chaîne de caractères `"earliest"`, `"latest"`, `"pending"`, `"safe"` ou `"finalized"`, comme dans le [paramètre de bloc](/developers/docs/apis/json-rpc/#block-parameter).
2. `QUANTITY` - la position de l'indice de la transaction.

```js
params: [
  "0x9c47cf", // 10241999
  "0x24", // 36
]
```

**Retours**
Voir [eth_getTransactionByHash](#eth-gettransactionbyhash)

**Exemple**

```js
// Requête
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getTransactionByBlockNumberAndIndex","params":["0x9c47cf", "0x24"],"id":1}'
```

Pour le résultat, voir [eth_getTransactionByHash](#eth-gettransactionbyhash)

### eth_getTransactionReceipt {#eth-gettransactionreceipt}

Retourne le reçu d'une transaction par son hachage de transaction.

**Remarque** Le reçu n'est pas disponible pour les transactions en attente.

**Paramètres**

1. `DATA`, 32 octets - hash d'une transaction

```js
params: ["0x85d995eba9763907fdf35cd2034144dd9d53ce32cbec21349d4b12823c6860c5"]
```

**Retours**
`Object` - Un objet de reçu de transaction, ou `null` lorsqu'aucun reçu n'a été trouvé :

- `transactionHash ` : `DATA`, 32 octets - hash de la transaction.
- `transactionIndex` : `QUANTITY` - entier de la position de l'indice de la transaction dans le bloc.
- `blockHash` : `DATA`, 32 octets - hash du bloc dans lequel se trouvait cette transaction.
- `blockNumber` : `QUANTITY` - numéro du bloc dans lequel se trouvait cette transaction.
- `from` : `DATA`, 20 octets - adresse de l'expéditeur.
- `to` : `DATA`, 20 octets - adresse du destinataire. null lorsqu'il s'agit d'une transaction de création de contrat.
- `cumulativeGasUsed` : `QUANTITY ` - La quantité totale de gaz utilisée lors de l'exécution de cette transaction dans le bloc.
- `effectiveGasPrice` : `QUANTITY` - La somme des frais de base et des frais de priorité payés par unité de gaz.
- `gasUsed ` : `QUANTITY ` - La quantité de gaz utilisée par cette transaction spécifique uniquement.
- `contractAddress ` : `DATA`, 20 octets - L'adresse du contrat créé, si la transaction était une création de contrat, sinon `null`.
- `logs` : `Array` - Tableau d'objets de journaux générés par cette transaction.
- `logsBloom` : `DATA`, 256 octets - Filtre de Bloom pour que les clients légers puissent récupérer rapidement les journaux associés.
- `type` : `QUANTITY` - entier du type de transaction, `0x0` pour les transactions héritées (legacy), `0x1` pour les types de listes d'accès, `0x2` pour les frais dynamiques.

Il retourne également _soit_ :

- `root` : `DATA` 32 octets de la racine d'état post-transaction (pré-Byzantium)
- `status` : `QUANTITY` soit `1` (succès) ou `0` (échec)

**Exemple**

```js
// Requête
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getTransactionReceipt","params":["0x85d995eba9763907fdf35cd2034144dd9d53ce32cbec21349d4b12823c6860c5"],"id":1}'
// Résultat
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "blockHash":
      "0xa957d47df264a31badc3ae823e10ac1d444b098d9b73d204c40426e57f47e8c3",
    "blockNumber": "0xeff35f",
    "contractAddress": null, // chaîne de caractères de l'adresse si elle a été créée
    "cumulativeGasUsed": "0xa12515",
    "effectiveGasPrice": "0x5a9c688d4",
    "from": "0x6221a9c005f6e47eb398fd867784cacfdcfff4e7",
    "gasUsed": "0xb4c8",
    "logs": [{
      // journaux tels que retournés par getFilterLogs, etc.
    }],
    "logsBloom": "0x00...0", // filtre de Bloom de 256 octets
    "status": "0x1",
    "to": "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
    "transactionHash":
      "0x85d995eba9763907fdf35cd2034144dd9d53ce32cbec21349d4b12823c6860c5",
    "transactionIndex": "0x66",
    "type": "0x2"
  }
}
```

### eth_getUncleByBlockHashAndIndex {#eth-getunclebyblockhashandindex}

Renvoie des informations sur un oncle d'un bloc par son hash et la position de l'indice de l'oncle.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getUncleByBlockHashAndIndex">
  Essayer le point de terminaison dans le terrain de jeu
</ButtonLink>

**Paramètres**

1. `DATA`, 32 octets - Le hash d'un bloc.
2. `QUANTITY` - La position de l'indice de l'oncle.

```js
params: [
  "0x1d59ff54b1eb26b013ce3cb5fc9dab3705b415a67127a003c3e61eb445bb8df2",
  "0x0", // 0
]
```

**Retours**
Voir [eth_getBlockByHash](#eth-getblockbyhash)

**Exemple**

```js
// Requête
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getUncleByBlockHashAndIndex","params":["0x1d59ff54b1eb26b013ce3cb5fc9dab3705b415a67127a003c3e61eb445bb8df2", "0x0"],"id":1}'
```

Résultat, voir [eth_getBlockByHash](#eth-getblockbyhash)

**Remarque** : Un oncle ne contient pas de transactions individuelles.

### eth_getUncleByBlockNumberAndIndex {#eth-getunclebyblocknumberandindex}

Renvoie des informations sur un oncle d'un bloc à partir de son numéro et de la position de l'indice de l'oncle.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getUncleByBlockNumberAndIndex">
  Essayer le point de terminaison dans le playground
</ButtonLink>

**Paramètres**

1. `QUANTITY|TAG` - un numéro de bloc, ou la chaîne de caractères `"earliest"`, `"latest"`, `"pending"`, `"safe"`, `"finalized"`, comme dans le [paramètre de bloc](/developers/docs/apis/json-rpc/#block-parameter).
2. `QUANTITY` - la position de l'indice de l'oncle.

```js
params: [
  "0x29c", // 668
  "0x0", // 0
]
```

**Retours**
Voir [eth_getBlockByHash](#eth-getblockbyhash)

**Remarque** : Un oncle ne contient pas de transactions individuelles.

**Exemple**

```js
// Requête
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getUncleByBlockNumberAndIndex","params":["0x29c", "0x0"],"id":1}'
```

Pour le résultat, voir [eth_getBlockByHash](#eth-getblockbyhash)

### eth_newFilter {#eth-newfilter}

Crée un objet de filtre, basé sur des options de filtre, pour notifier lorsque l'état change (journaux).
Pour vérifier si l'état a changé, appelez [eth_getFilterChanges](#eth-getfilterchanges).

**Une note sur la spécification des filtres de topics :**
Les topics dépendent de l'ordre. Une transaction avec un journal contenant les topics [A, B] correspondra aux filtres de topics suivants :

- `[]` "n'importe quoi"
- `[A]` "A en première position (et n'importe quoi après)"
- `[null, B]` "n'importe quoi en première position ET B en deuxième position (et n'importe quoi après)"
- `[A, B]` "A en première position ET B en deuxième position (et n'importe quoi après)"
- `[[A, B], [A, B]]` "(A OU B) en première position ET (A OU B) en deuxième position (et n'importe quoi après)"
- **Paramètres**

1. `Object` - Les options du filtre :

- `fromBlock` : `QUANTITY|TAG` - (optionnel, par défaut : `"latest"`) Numéro de bloc entier, ou `"latest"` pour le dernier bloc proposé, `"safe"` pour le dernier bloc sûr, `"finalized"` pour le dernier bloc finalisé, ou `"pending"`, `"earliest"` pour les transactions qui ne sont pas encore dans un bloc.
- `toBlock` : `QUANTITY|TAG` - (optionnel, par défaut : `"latest"`) Numéro de bloc entier, ou `"latest"` pour le dernier bloc proposé, `"safe"` pour le dernier bloc sûr, `"finalized"` pour le dernier bloc finalisé, ou `"pending"`, `"earliest"` pour les transactions qui ne sont pas encore dans un bloc.
- `address` : `DATA|Array`, 20 octets - (optionnel) Adresse de contrat ou une liste d'adresses d'où les journaux doivent provenir.
- `topics` : `Array of DATA`, - (optionnel) Tableau de topics `DATA` de 32 octets. Les topics dépendent de l'ordre. Chaque topic peut également être un tableau de DONNÉES avec des options « ou ».

```js
params: [
  {
    fromBlock: "0x1",
    toBlock: "0x2",
    address: "0x8888f1f195afa192cfee860698584c030f4c9db1",
    topics: [
      "0x000000000000000000000000a94f5374fce5edbc8e2a8697c15331677e6ebf0b",
      null,
      [
        "0x000000000000000000000000a94f5374fce5edbc8e2a8697c15331677e6ebf0b",
        "0x0000000000000000000000000aff3454fce5edbc8cca8697c15331677e6ebccc",
      ],
    ],
  },
]
```

**Retours**
`QUANTITY` - Un identifiant de filtre.

**Exemple**

```js
// Requête
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_newFilter","params":[{"topics":["0x12341234"]}],"id":73}'
// Résultat
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x1" // 1
}
```

### eth_newBlockFilter {#eth-newblockfilter}

Crée un filtre dans le nœud, pour notifier l'arrivée d'un nouveau bloc.
Pour vérifier si l'état a changé, appelez [eth_getFilterChanges](#eth-getfilterchanges).

**Paramètres**
Aucun

**Retours**
`QUANTITY` - Un identifiant de filtre.

**Exemple**

```js
// Requête
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_newBlockFilter","params":[],"id":73}'
// Résultat
{
  "id":1,
  "jsonrpc":  "2.0",
  "result": "0x1" // 1
}
```

### eth_newPendingTransactionFilter {#eth-newpendingtransactionfilter}

Crée un filtre dans le nœud, pour notifier l'arrivée de nouvelles transactions en attente.
Pour vérifier si l'état a changé, appelez [eth_getFilterChanges](#eth-getfilterchanges).

**Paramètres**
Aucun

**Retours**
`QUANTITY` - Un identifiant de filtre.

**Exemple**

```js
// Requête
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_newPendingTransactionFilter","params":[],"id":73}'
// Résultat
{
  "id":1,
  "jsonrpc":  "2.0",
  "result": "0x1" // 1
}
```

### eth_uninstallFilter {#eth-uninstallfilter}

Désinstalle un filtre avec l'ID donné. Devrait toujours être appelé lorsque l'observation n'est plus nécessaire.
De plus, les filtres expirent lorsqu'ils ne sont pas interrogés avec [eth_getFilterChanges](#eth-getfilterchanges) pendant un certain temps.

**Paramètres**

1. `QUANTITY` - L'ID du filtre.

```js
params: [
  "0xb", // 11
]
```

**Retours**
`Boolean` - `true` si le filtre a été désinstallé avec succès, sinon `false`.

**Exemple**

```js
// Requête
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_uninstallFilter","params":["0xb"],"id":73}'
// Résultat
{
  "id":1,
  "jsonrpc": "2.0",
  "result": true
}
```

### eth_getFilterChanges {#eth-getfilterchanges}

Méthode d'interrogation (polling) pour un filtre, qui renvoie un tableau de journaux survenus depuis la dernière interrogation.

**Paramètres**

1. `QUANTITY` - l'identifiant du filtre.

```js
params: [
  "0x16", // 22
]
```

**Retours**
`Array` - Tableau d'objets de journal, ou un tableau vide si rien n'a changé depuis la dernière interrogation.

- Pour les filtres créés avec `eth_newBlockFilter`, les retours sont des hashs de bloc (`DATA`, 32 octets), par ex., `["0x3454645634534..."]`.
- Pour les filtres créés avec `eth_newPendingTransactionFilter `, les retours sont des hashs de transaction (`DATA`, 32 octets), par ex., `["0x6345343454645..."]`.
- Pour les filtres créés avec `eth_newFilter`, les journaux sont des objets avec les paramètres suivants :
  - `removed` : `TAG` - `true` lorsque le journal a été supprimé, en raison d'une réorganisation de la chaîne. `false` s'il s'agit d'un journal valide.
  - `logIndex` : `QUANTITY` - entier de la position de l'indice du journal dans le bloc. `null` lorsqu'il s'agit d'un journal en attente.
  - `transactionIndex` : `QUANTITY` - entier de la position de l'indice de la transaction à partir de laquelle le journal a été créé. `null` lorsqu'il s'agit d'un journal en attente.
  - `transactionHash` : `DATA`, 32 octets - hash de la transaction à partir de laquelle ce journal a été créé. `null` lorsqu'il s'agit d'un journal en attente.
  - `blockHash` : `DATA`, 32 octets - hash du bloc dans lequel se trouvait ce journal. `null` lorsqu'il est en attente. `null` lorsqu'il s'agit d'un journal en attente.
  - `blockNumber` : `QUANTITY` - le numéro du bloc dans lequel se trouvait ce journal. `null` lorsqu'il est en attente. `null` lorsqu'il s'agit d'un journal en attente.
  - `address` : `DATA`, 20 octets - adresse dont provient ce journal.
  - `data` : `DATA` - données de journal non indexées de longueur variable. (Dans _Solidity_ : zéro ou plusieurs arguments de journal non indexés de 32 octets.)
  - `topics` : `Array of DATA` - Tableau de 0 à 4 `DATA` de 32 octets d'arguments de journal indexés. (Dans _Solidity_ : Le premier sujet est le _hash_ de la signature de l'événement (par ex., `Deposit(address,bytes32,uint256)`), sauf si vous avez déclaré l'événement avec le spécificateur `anonymous`.)

- **Exemple**

```js
// Requête
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getFilterChanges","params":["0x16"],"id":73}'
// Résultat
{
  "id":1,
  "jsonrpc":"2.0",
  "result": [{
    "logIndex": "0x1", // 1
    "blockNumber":"0x1b4", // 436
    "blockHash": "0x8216c5785ac562ff41e2dcfdf5785ac562ff41e2dcfdf829c5a142f1fccd7d",
    "transactionHash":  "0xdf829c5a142f1fccd7d8216c5785ac562ff41e2dcfdf5785ac562ff41e2dcf",
    "transactionIndex": "0x0", // 0
    "address": "0x16c5785ac562ff41e2dcfdf829c5a142f1fccd7d",
    "data":"0x0000000000000000000000000000000000000000000000000000000000000000",
    "topics": ["0x59ebeb90bc63057b6515673c3ecf9438e5058bca0f92585014eced636878c9a5"]
    },{
      ...
    }]
}
```

### eth_getFilterLogs {#eth-getfilterlogs}

Retourne un tableau de tous les journaux correspondant au filtre avec l'identifiant donné.

**Paramètres**

1. `QUANTITY` - L'identifiant du filtre.

```js
params: [
  "0x16", // 22
]
```

**Retours**
Voir [eth_getFilterChanges](#eth-getfilterchanges)

**Exemple**

```js
// Requête
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getFilterLogs","params":["0x16"],"id":74}'
```

Résultat, voir [eth_getFilterChanges](#eth-getfilterchanges)

### eth_getLogs {#eth-getlogs}

Retourne un tableau de tous les journaux correspondant à un objet de filtre donné.

**Paramètres**

1. `Object` - Les options de filtre :

- `fromBlock` : `QUANTITY|TAG` - (facultatif, par défaut : `"latest"`) Numéro de bloc entier, ou `"latest"` pour le dernier bloc proposé, `"safe"` pour le dernier bloc sûr, `"finalized"` pour le dernier bloc finalisé, ou `"pending"`, `"earliest"` pour les transactions qui ne sont pas encore dans un bloc.
- `toBlock` : `QUANTITY|TAG` - (facultatif, par défaut : `"latest"`) Numéro de bloc entier, ou `"latest"` pour le dernier bloc proposé, `"safe"` pour le dernier bloc sûr, `"finalized"` pour le dernier bloc finalisé, ou `"pending"`, `"earliest"` pour les transactions qui ne sont pas encore dans un bloc.
- `address` : `DATA|Array`, 20 octets - (facultatif) Adresse de contrat ou une liste d'adresses dont les journaux doivent provenir.
- `topics` : `Array of DATA`, - (facultatif) Tableau de sujets `DATA` de 32 octets. Les sujets dépendent de l'ordre. Chaque sujet peut également être un tableau de DATA avec des options « ou ».
- `blockHash` : `DATA`, 32 octets - (facultatif, **futur**) Avec l'ajout de l'EIP-234, `blockHash` sera une nouvelle option de filtre qui restreint les journaux retournés au seul bloc avec le hash de 32 octets `blockHash`. L'utilisation de `blockHash` est équivalente à `fromBlock` = `toBlock` = le numéro de bloc avec le hash `blockHash`. Si `blockHash` est présent dans les critères de filtre, alors ni `fromBlock` ni `toBlock` ne sont autorisés.

```js
params: [
  {
    topics: [
      "0x000000000000000000000000a94f5374fce5edbc8e2a8697c15331677e6ebf0b",
    ],
  },
]
```

**Retours**
Voir [eth_getFilterChanges](#eth-getfilterchanges)

**Exemple**

```js
// Requête
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getLogs","params":[{"topics":["0x000000000000000000000000a94f5374fce5edbc8e2a8697c15331677e6ebf0b"]}],"id":74}'
```

Pour le résultat, voir [eth_getFilterChanges](#eth-getfilterchanges)

## Exemple d'utilisation {#usage-example}

### Déployer un contrat en utilisant JSON_RPC {#deploying-contract}

Cette section comprend une démonstration de la façon de déployer un contrat en utilisant uniquement l'interface RPC. Il existe d'autres moyens de déployer des contrats où cette complexité est abstraite, par exemple en utilisant des bibliothèques construites par-dessus l'interface RPC telles que [web3.js](https://web3js.readthedocs.io/) et [web3.py](https://github.com/ethereum/web3.py). Ces abstractions sont généralement plus faciles à comprendre et moins sujettes aux erreurs, mais il est toujours utile de comprendre ce qui se passe en interne.

Ce qui suit est un contrat intelligent simple appelé `Multiply7` qui sera déployé en utilisant l'interface JSON-RPC sur un nœud Ethereum. Ce tutoriel suppose que le lecteur exécute déjà un nœud Geth. Plus d'informations sur les nœuds et les clients sont disponibles [ici](/developers/docs/nodes-and-clients/run-a-node). Veuillez vous référer à la documentation individuelle de chaque [client](/developers/docs/nodes-and-clients/) pour voir comment démarrer le JSON-RPC HTTP pour les clients autres que Geth. La plupart des clients servent par défaut sur `localhost:8545`.

```javascript
contract Multiply7 {
    event Print(uint);
    function multiply(uint input) returns (uint) {
        Print(input * 7);
        return input * 7;
    }
}
```

La première chose à faire est de s'assurer que l'interface RPC HTTP est activée. Cela signifie que nous fournissons à Geth l'indicateur `--http` au démarrage. Dans cet exemple, nous utilisons le nœud Geth sur une chaîne de développement privée. En utilisant cette approche, nous n'avons pas besoin d'ether sur le vrai réseau.

```bash
geth --http --dev console 2>>geth.log
```

Cela démarrera l'interface RPC HTTP sur `http://localhost:8545`.

Nous pouvons vérifier que l'interface est en cours d'exécution en récupérant l'adresse Coinbase (en obtenant la première adresse du tableau des comptes) et le solde en utilisant [curl](https://curl.se). Veuillez noter que les données dans ces exemples différeront sur votre nœud local. Si vous souhaitez essayer ces commandes, remplacez les paramètres de requête dans la deuxième requête curl par le résultat renvoyé par la première.

```bash
curl --data '{"jsonrpc":"2.0","method":"eth_accounts","params":[], "id":1}' -H "Content-Type: application/json" localhost:8545
{"id":1,"jsonrpc":"2.0","result":["0x9b1d35635cc34752ca54713bb99d38614f63c955"]}

curl --data '{"jsonrpc":"2.0","method":"eth_getBalance", "params": ["0x9b1d35635cc34752ca54713bb99d38614f63c955", "latest"], "id":2}' -H "Content-Type: application/json" localhost:8545
{"id":2,"jsonrpc":"2.0","result":"0x1639e49bba16280000"}
```

Parce que les nombres sont encodés en hexadécimal, le solde est renvoyé en Wei sous forme de chaîne hexadécimale. Si nous voulons avoir le solde en ether sous forme de nombre, nous pouvons utiliser web3 depuis la console Geth.

```javascript
web3.fromWei("0x1639e49bba16280000", "ether")
// "410"
```

Maintenant qu'il y a de l'ether sur notre chaîne de développement privée, nous pouvons déployer le contrat. La première étape consiste à compiler le contrat Multiply7 en bytecode qui peut être envoyé à l'EVM. Pour installer solc, le compilateur Solidity, suivez la [documentation Solidity](https://docs.soliditylang.org/en/latest/installing-solidity.html). (Vous voudrez peut-être utiliser une ancienne version de `solc` pour correspondre à [la version du compilateur utilisée pour notre exemple](https://github.com/ethereum/solidity/releases/tag/v0.4.20).)

L'étape suivante consiste à compiler le contrat Multiply7 en bytecode qui peut être envoyé à l'EVM.

```bash
echo 'pragma solidity ^0.4.16; contract Multiply7 { event Print(uint); function multiply(uint input) public returns (uint) { Print(input * 7); return input * 7; } }' | solc --bin

======= <stdin>:Multiply7 =======
Binary:
6060604052341561000f57600080fd5b60eb8061001d6000396000f300606060405260043610603f576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff168063c6888fa1146044575b600080fd5b3415604e57600080fd5b606260048080359060200190919050506078565b6040518082815260200191505060405180910390f35b60007f24abdb5865df5079dcc5ac590ff6f01d5c16edbc5fab4e195d9febd1114503da600783026040518082815260200191505060405180910390a16007820290509190505600a165627a7a7230582040383f19d9f65246752244189b02f56e8d0980ed44e7a56c0b200458caad20bb0029
```

Maintenant que nous avons le code compilé, nous devons déterminer combien de gaz il en coûte pour le déployer. L'interface RPC a une méthode `eth_estimateGas` qui nous donnera une estimation.

```bash
curl --data '{"jsonrpc":"2.0","method": "eth_estimateGas", "params": [{"from": "0x9b1d35635cc34752ca54713bb99d38614f63c955", "data": "0x6060604052341561000f57600080fd5b60eb8061001d6000396000f300606060405260043610603f576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff168063c6888fa1146044575b600080fd5b3415604e57600080fd5b606260048080359060200190919050506078565b6040518082815260200191505060405180910390f35b60007f24abdb5865df5079dcc5ac590ff6f01d5c16edbc5fab4e195d9febd1114503da600783026040518082815260200191505060405180910390a16007820290509190505600a165627a7a7230582040383f19d9f65246752244189b02f56e8d0980ed44e7a56c0b200458caad20bb0029"}], "id": 5}' -H "Content-Type: application/json" localhost:8545
{"jsonrpc":"2.0","id":5,"result":"0x1c31e"}
```

Et enfin déployer le contrat.

```bash
curl --data '{"jsonrpc":"2.0","method": "eth_sendTransaction", "params": [{"from": "0x9b1d35635cc34752ca54713bb99d38614f63c955", "gas": "0x1c31e", "data": "0x6060604052341561000f57600080fd5b60eb8061001d6000396000f300606060405260043610603f576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff168063c6888fa1146044575b600080fd5b3415604e57600080fd5b606260048080359060200190919050506078565b6040518082815260200191505060405180910390f35b60007f24abdb5865df5079dcc5ac590ff6f01d5c16edbc5fab4e195d9febd1114503da600783026040518082815260200191505060405180910390a16007820290509190505600a165627a7a7230582040383f19d9f65246752244189b02f56e8d0980ed44e7a56c0b200458caad20bb0029"}], "id": 6}' -H "Content-Type: application/json" localhost:8545
{"id":6,"jsonrpc":"2.0","result":"0xe1f3095770633ab2b18081658bad475439f6a08c902d0915903bafff06e6febf"}
```

La transaction est acceptée par le nœud et un hachage de transaction est renvoyé. Ce hash peut être utilisé pour suivre la transaction. L'étape suivante consiste à déterminer l'adresse où notre contrat est déployé. Chaque transaction exécutée créera un reçu. Ce reçu contient diverses informations sur la transaction, telles que le bloc dans lequel la transaction a été incluse et la quantité de gaz utilisée par l'EVM. Si une transaction
crée un contrat, il contiendra également l'adresse du contrat. Nous pouvons récupérer le reçu avec la méthode RPC `eth_getTransactionReceipt`.

```bash
curl --data '{"jsonrpc":"2.0","method": "eth_getTransactionReceipt", "params": ["0xe1f3095770633ab2b18081658bad475439f6a08c902d0915903bafff06e6febf"], "id": 7}' -H "Content-Type: application/json" localhost:8545
{"jsonrpc":"2.0","id":7,"result":{"blockHash":"0x77b1a4f6872b9066312de3744f60020cbd8102af68b1f6512a05b7619d527a4f","blockNumber":"0x1","contractAddress":"0x4d03d617d700cf81935d7f797f4e2ae719648262","cumulativeGasUsed":"0x1c31e","from":"0x9b1d35635cc34752ca54713bb99d38614f63c955","gasUsed":"0x1c31e","logs":[],"logsBloom":"0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000","status":"0x1","to":null,"transactionHash":"0xe1f3095770633ab2b18081658bad475439f6a08c902d0915903bafff06e6febf","transactionIndex":"0x0"}}
```

Notre contrat a été créé sur `0x4d03d617d700cf81935d7f797f4e2ae719648262`. Un résultat nul au lieu d'un reçu signifie que la transaction n'a pas encore été incluse dans un bloc. Attendez un moment, vérifiez si votre client de consensus est en cours d'exécution et réessayez.

#### Interagir avec les contrats intelligents {#interacting-with-smart-contract}

Dans cet exemple, nous enverrons une transaction en utilisant `eth_sendTransaction` à la méthode `multiply` du contrat.

`eth_sendTransaction` nécessite plusieurs arguments, en particulier `from`, `to` et `data`. `From` est l'adresse publique de notre compte, et `to` est l'adresse du contrat. L'argument `data` contient une charge utile qui définit quelle méthode doit être appelée et avec quels arguments. C'est là que l'[ABI (interface binaire d'application)](https://docs.soliditylang.org/en/latest/abi-spec.html) entre en jeu. L'ABI est un fichier JSON qui définit comment définir et encoder les données pour l'EVM.

Les octets de la charge utile définissent quelle méthode du contrat est appelée. Il s'agit des 4 premiers octets du hash Keccak du nom de la fonction et des types de ses arguments, encodés en hexadécimal. La fonction multiply accepte un uint qui est un alias pour uint256. Cela nous laisse avec :

```javascript
web3.sha3("multiply(uint256)").substring(0, 10)
// "0xc6888fa1"
```

L'étape suivante consiste à encoder les arguments. Il n'y a qu'un seul uint256, disons, la valeur 6. L'ABI a une section qui spécifie comment encoder les types uint256.

`int<M>: enc(X)` est l'encodage en complément à deux grand-boutiste de X, complété du côté de l'ordre supérieur (à gauche) avec 0xff pour un X négatif et avec des octets zéro pour un X positif de sorte que la longueur soit un multiple de 32 octets.

Cela s'encode en `0000000000000000000000000000000000000000000000000000000000000006`.

En combinant le sélecteur de fonction et l'argument encodé, nos données seront `0xc6888fa10000000000000000000000000000000000000000000000000000000000000006`.

Cela peut maintenant être envoyé au nœud :

```bash
curl --data '{"jsonrpc":"2.0","method": "eth_sendTransaction", "params": [{"from": "0xeb85a5557e5bdc18ee1934a89d8bb402398ee26a", "to": "0x6ff93b4b46b41c0c3c9baee01c255d3b4675963d", "data": "0xc6888fa10000000000000000000000000000000000000000000000000000000000000006"}], "id": 8}' -H "Content-Type: application/json" localhost:8545
{"id":8,"jsonrpc":"2.0","result":"0x759cf065cbc22e9d779748dc53763854e5376eea07409e590c990eafc0869d74"}
```

Puisqu'une transaction a été envoyée, un hachage de transaction a été renvoyé. La récupération du reçu donne :

```javascript
{
   blockHash: "0xbf0a347307b8c63dd8c1d3d7cbdc0b463e6e7c9bf0a35be40393588242f01d55",
   blockNumber: 268,
   contractAddress: null,
   cumulativeGasUsed: 22631,
   gasUsed: 22631,
   logs: [{
      address: "0x6ff93b4b46b41c0c3c9baee01c255d3b4675963d",
      blockHash: "0xbf0a347307b8c63dd8c1d3d7cbdc0b463e6e7c9bf0a35be40393588242f01d55",
      blockNumber: 268,
      data: "0x000000000000000000000000000000000000000000000000000000000000002a",
      logIndex: 0,
      topics: ["0x24abdb5865df5079dcc5ac590ff6f01d5c16edbc5fab4e195d9febd1114503da"],
      transactionHash: "0x759cf065cbc22e9d779748dc53763854e5376eea07409e590c990eafc0869d74",
      transactionIndex: 0
  }],
  transactionHash: "0x759cf065cbc22e9d779748dc53763854e5376eea07409e590c990eafc0869d74",
  transactionIndex: 0
}
```

Le reçu contient un journal. Ce journal a été généré par l'EVM lors de l'exécution de la transaction et inclus dans le reçu. La fonction `multiply` montre que l'événement `Print` a été déclenché avec l'entrée multipliée par 7. Puisque l'argument pour l'événement `Print` était un uint256, nous pouvons le décoder selon les règles de l'ABI, ce qui nous laissera avec la valeur décimale attendue de 42. Outre les données, il convient de noter que les topics peuvent être utilisés pour déterminer quel événement a créé le journal :

```javascript
web3.sha3("Print(uint256)")
// "24abdb5865df5079dcc5ac590ff6f01d5c16edbc5fab4e195d9febd1114503da"
```

Il s'agissait juste d'une brève introduction à certaines des tâches les plus courantes, démontrant l'utilisation directe du JSON-RPC.

## Sujets connexes {#related-topics}

- [Spécification JSON-RPC](http://www.jsonrpc.org/specification)
- [Nœuds et clients](/developers/docs/nodes-and-clients/)
- [API JavaScript](/developers/docs/apis/javascript/)
- [API backend](/developers/docs/apis/backend/)
- [Clients d'exécution](/developers/docs/nodes-and-clients/#execution-clients)