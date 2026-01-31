---
title: API JSON-RPC
description: "Un protocole allégé de procédure à distance (RPC) pour les clients Ethereum."
lang: fr
---

Afin qu'une application logicielle interagisse avec la blockchain Ethereum (en lisant les données de la blockchain ou en envoyant des transactions au réseau), elle doit se connecter à un nœud Ethereum.

À cette fin, chaque [client Ethereum](/developers/docs/nodes-and-clients/#execution-clients) met en œuvre une [spécification JSON-RPC](https://github.com/ethereum/execution-apis), de sorte qu'il existe un ensemble uniforme de méthodes sur lesquelles les applications peuvent s'appuyer, quelle que soit l'implémentation spécifique du nœud ou du client.

[JSON-RPC](https://www.jsonrpc.org/specification) est un protocole d'appel de procédure à distance (RPC) léger et sans état. Il définit plusieurs structures de données et les règles entourant leur traitement. C'est un système de transport agnostique en ce sens que les concepts peuvent être utilisés dans le même processus, via les sockets et HTTP, ou dans de nombreux environnements de passage de messages. Il utilise JSON (RFC 4627) comme format de données.

## Implémentations du client {#client-implementations}

Les clients Ethereum peuvent chacun utiliser différents langages de programmation lors de l'implémentation de la spécification JSON-RPC. Consultez la [documentation de chaque client](/developers/docs/nodes-and-clients/#execution-clients) pour plus de détails sur les langages de programmation spécifiques. Nous vous recommandons de consulter la documentation de chaque client pour connaître les dernières informations de support de l'API.

## Bibliothèques de commodité {#convenience-libraries}

Bien que vous puissiez choisir d'interagir directement avec les clients Ethereum via l'API JSON-RPC, il y a souvent des options plus faciles pour les développeurs de dapp. Il existe de nombreuses bibliothèques [JavaScript](/developers/docs/apis/javascript/#available-libraries) et [API backend](/developers/docs/apis/backend/#available-libraries) qui fournissent des wrappers en plus de l'API JSON-RPC. Avec ces bibliothèques, les développeurs peuvent écrire de manières intuitives des méthodes d'une seule ligne pour initialiser les requêtes JSON-RPC (sans avoir besoin d'en voir les détails) qui interagissent avec Ethereum.

## API du client de consensus {#consensus-clients}

Cette page traite principalement de l'API JSON-RPC utilisée par les clients d'exécution Ethereum. Cependant, les clients de consensus ont également une API RPC qui permet aux utilisateurs de interroger des informations sur le nœud, demander des blocs de balises, l'état de la balise et d'autres informations liées au consensus directement depuis un nœud. Cette API est documentée sur la [page Web de l'API Beacon](https://ethereum.github.io/beacon-APIs/#/).

Une API interne est également utilisée pour la communication entre les clients dans un noeud - c'est-à-dire permet au client de consensus et au client d'exécution d'échanger des données. C'est ce qu'on appelle l'« API Engine » et les spécifications sont disponibles sur [GitHub](https://github.com/ethereum/execution-apis/blob/main/src/engine/common.md).

## Spécification du client d'exécution {#spec}

[Lisez la spécification complète de l'API JSON-RPC sur GitHub](https://github.com/ethereum/execution-apis). Cette API est documentée sur la [page Web de l'API d'exécution](https://ethereum.github.io/execution-apis/) et comprend un inspecteur pour essayer toutes les méthodes disponibles.

## Conventions {#conventions}

### Encodage des valeurs hexadécimales {#hex-encoding}

Deux types de données clés sont passés par JSON : des tableaux d'octets non formatés et des quantités. Les deux sont passés avec un encodage hexadécimal mais avec des formatages différents.

#### Quantités {#quantities-encoding}

Lors de l'encodage des quantités (entiers, chiffres) : encoder en hexadécimal, préfixer avec « 0x », la représentation la plus compacte (légère exception : zéro doit être représenté par « 0x0 »).

Voici quelques exemples :

- 0x41 (65 en décimal)
- 0x400 (1024 en décimal)
- FAUX : 0x (devrait toujours avoir au moins un chiffre - zéro est « 0x0 »)
- FAUX : 0x0400 (pas de zéros autorisés en premier)
- FAUX : ff (doit être préfixé par 0x)

### Données non formatées {#unformatted-data-encoding}

Lors de l'encodage de données non formatées (tableaux d'octets, adresses de compte, hachages, tableaux de bytecode) : encoder en hex, préfixer avec « 0x », deux chiffres hexadécimaux par octet.

Voici quelques exemples :

- 0x41 (taille 1, « A »)
- 0x004200 (taille 3, "0B0")
- 0x (taille 0, "")
- FAUX : 0xf0f0f (doit avoir un nombre pair de chiffres)
- FAUX : 004200 (doit être préfixé par 0x)

### Le paramètre de bloc {#block-parameter}

Les méthodes suivantes possèdent un paramètre de bloc :

- [eth_getBalance](#eth_getbalance)
- [eth_getCode](#eth_getcode)
- [eth_getTransactionCount](#eth_gettransactioncount)
- [eth_getStorageAt](#eth_getstorageat)
- [eth_call](#eth_call)

Lorsqu’une requête interroge l’état d’Ethereum, le paramètre de bloc fourni détermine la hauteur du bloc.

Les options suivantes sont possibles pour le paramètre de bloc :

- `Chaîne HEX` - un numéro de bloc entier
- `Chaîne \"earliest\"` pour le bloc le plus ancien/d'origine
- `Chaîne \"latest\"` - pour le dernier bloc proposé
- `Chaîne \"safe\"` - pour le dernier bloc de tête sûr
- `Chaîne \"finalized\"` - pour le dernier bloc finalisé
- `Chaîne \"pending\"` - pour l'état ou les transactions en attente

## Exemples

Sur cette page, nous fournissons des exemples sur la façon d'utiliser des points de terminaison individuels de l'API JSON-RPC en utilisant l'outil de ligne de commande, [curl](https://curl.se). Ces exemples de points de terminaison individuels se trouvent ci-dessous dans la section [Exemples de Curl](#curl-examples). Plus bas sur la page, nous fournissons également un [exemple de bout en bout](#usage-example) pour compiler et déployer un contrat intelligent en utilisant un nœud Geth, l'API JSON-RPC et curl.

## Exemples de Curl {#curl-examples}

Des exemples d'utilisation de l'API JSON-RPC en faisant des requêtes [curl](https://curl.se) à un nœud Ethereum sont fournis ci-dessous. Chaque exemple
comprend une description du point de terminaison spécifique, de ses paramètres, du type de retour et un exemple concret de son utilisation.

Les requêtes curl peuvent retourner un message d'erreur relatif au type de contenu. C'est parce que l'option `--data` définit le type de contenu à `application/x-www-form-urlencoded`. Si votre nœud se plaint de cela, définissez manuellement l'en-tête en plaçant `-H \"Content-Type: application/json\"` au début de l'appel. Les exemples n'incluent pas non plus la combinaison URL/IP et port qui doit être le dernier argument donné à curl (par exemple, `127.0.0.1:8545`). Une requête curl complète incluant ces données supplémentaires prend la forme suivante :

```shell
curl -H "Content-Type: application/json" -X POST --data '{"jsonrpc":"2.0","method":"web3_clientVersion","params":[],"id":67}' 127.0.0.1:8545
```

## Gossip, État, Historique {#gossip-state-history}

Une poignée de méthodes JSON-RPC de base nécessitent des données du réseau Ethereum et se classent nettement dans trois catégories principales : _Gossip, État et Historique_. Utilisez les liens dans ces sections pour passer à chaque méthode, ou utilisez la table des matières pour explorer la liste complète des méthodes.

### Méthodes Gossip {#gossip-methods}

> Ces méthodes permettent de suivre la tête de la chaîne. C'est ainsi que les transactions font leur chemin à travers le réseau, qu'elles se retrouvent dans des blocs et que les clients découvrent les nouveaux blocs.

- [eth_blockNumber](#eth_blocknumber)
- [eth_sendRawTransaction](#eth_sendrawtransaction)

### Méthodes d'état {#state_methods}

> Méthodes qui rapportent l'état actuel de toutes les données stockées. L' « état » est comme un grand morceau partagé de RAM, et comprend les soldes des comptes, les données des contrats et les estimations de gaz.

- [eth_getBalance](#eth_getbalance)
- [eth_getStorageAt](#eth_getstorageat)
- [eth_getTransactionCount](#eth_gettransactioncount)
- [eth_getCode](#eth_getcode)
- [eth_call](#eth_call)
- [eth_estimateGas](#eth_estimategas)

### Méthodes d'historique {#history_methods}

> Récupère les enregistrements historiques de chaque bloc depuis la genèse. Il s'agit d'un grand fichier à usage unique, qui comprend l'ensemble des en-têtes de bloc, des corps de blocs, des blocs d'oncle et les reçus de transaction.

- [eth_getBlockTransactionCountByHash](#eth_getblocktransactioncountbyhash)
- [eth_getBlockTransactionCountByNumber](#eth_getblocktransactioncountbynumber)
- [eth_getUncleCountByBlockHash](#eth_getunclecountbyblockhash)
- [eth_getUncleCountByBlockNumber](#eth_getunclecountbyblocknumber)
- [eth_getBlockByHash](#eth_getblockbyhash)
- [eth_getBlockByNumber](#eth_getblockbynumber)
- [eth_getTransactionByHash](#eth_gettransactionbyhash)
- [eth_getTransactionByBlockHashAndIndex](#eth_gettransactionbyblockhashandindex)
- [eth_getTransactionByBlockNumberAndIndex](#eth_gettransactionbyblocknumberandindex)
- [eth_getTransactionReceipt](#eth_gettransactionreceipt)
- [eth_getUncleByBlockHashAndIndex](#eth_getunclebyblockhashandindex)
- [eth_getUncleByBlockNumberAndIndex](#eth_getunclebyblocknumberandindex)

## Terrain de jeu pour l'API JSON-RPC

Vous pouvez utiliser l'[outil de terrain de jeu](https://ethereum-json-rpc.com) pour découvrir et essayer les méthodes de l'API. Cela vous montre également quelles méthodes et réseaux sont pris en charge par les différents fournisseurs de nœud.

## Méthodes de l'API JSON-RPC {#json-rpc-methods}

### web3_clientVersion {#web3_clientversion}

Retourne la version courante du client.

**Paramètres**

Aucun

**Retours**

`Chaîne` - La version actuelle du client

\*\*Exemple \*\*

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"web3_clientVersion","params":[],"id":67}'
// Result
{
  "id":67,
  "jsonrpc":"2.0",
  "result": "Geth/v1.12.1-stable/linux-amd64/go1.19.1"
}
```

### web3_sha3 {#web3_sha3}

Renvoie le Keccak-256 (_pas_ le SHA3-256 normalisé) des données fournies.

**Paramètres**

1. `DONNÉES` - Les données à convertir en hachage SHA3

```js
params: ["0x68656c6c6f20776f726c64"]
```

**Retours**

`DONNÉES` - Le résultat SHA3 de la chaîne donnée.

\*\*Exemple \*\*

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

### net_version {#net_version}

Retourne l'identifiant du réseau actuel.

**Paramètres**

Aucun

**Retours**

`Chaîne` - L'ID de réseau actuel.

La liste complète des ID de réseau actuels est disponible sur [chainlist.org](https://chainlist.org). Quelques spécifications habituelles sont :

- `1` : Réseau principal Ethereum
- `11155111` : Réseau de test Sepolia
- `560048` : Réseau de test Hoodi

\*\*Exemple \*\*

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

### net_listening {#net_listening}

Retourne `true` si le client écoute activement les connexions réseau.

**Paramètres**

Aucun

**Retours**

`Booléen` - `true` lors de l'écoute, sinon `false`.

\*\*Exemple \*\*

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

### net_peerCount {#net_peercount}

Retourne le nombre de pairs actuellement connectés au client.

**Paramètres**

Aucun

**Retours**

`QUANTITÉ` - nombre entier de pairs connectés.

\*\*Exemple \*\*

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

### eth_protocolVersion {#eth_protocolversion}

Retourne la version actuelle du protocole Ethereum. Notez que cette méthode n'est [pas disponible dans Geth](https://github.com/ethereum/go-ethereum/pull/22064#issuecomment-788682924).

**Paramètres**

Aucun

**Retours**

`Chaîne` - La version actuelle du protocole Ethereum

\*\*Exemple \*\*

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

### eth_syncing {#eth_syncing}

Renvoie un objet avec des données sur l'état de synchronisation ou `false`.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_syncing">
  Essayer le point de terminaison dans le terrain de jeu
</ButtonLink>

**Paramètres**

Aucun

**Retours**

Les données précises renvoyées varient entre les différentes implémentations de clients. Tous les clients retournent `False` lorsque le nœud n'est pas en cours de synchronisation, et tous les clients retournent les champs suivants.

`Objet|Booléen`, un objet avec des données d'état de synchronisation ou `FALSE` lorsque la synchronisation n'a pas lieu :

- `startingBlock` : `QUANTITÉ` - le bloc où l'importation a commencé (ne sera réinitialisé qu'une fois que la synchronisation aura atteint sa tête)
- `currentBlock` : `QUANTITÉ` - le bloc actuel, identique à eth_blockNumber
- `highestBlock` : `QUANTITÉ` - le plus haut bloc estimé

Cependant, chaque client peut également fournir des données supplémentaires. Par exemple, Geth renvoie les informations suivantes :

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

Alors que Besu renvoie :

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

Reportez-vous à la documentation de votre client spécifique pour plus de détails.

\*\*Exemple \*\*

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_syncing","params":[],"id":1}'
// Result
{
  "id":1,
  "jsonrpc": "2.0",
  "result": {
    startingBlock: '0x384',
    currentBlock: '0x386',
    highestBlock: '0x454'
  }
}
// Or when not syncing
{
  "id":1,
  "jsonrpc": "2.0",
  "result": false
}
```

### eth_coinbase {#eth_coinbase}

Renvoie l'adresse coinbase du client.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_coinbase">
  Essayer le point de terminaison dans le terrain de jeu
</ButtonLink>

> **Remarque :** Cette méthode est obsolète depuis la **v1.14.0** et n'est plus prise en charge. Essayer d’utiliser cette méthode entraînera une erreur « Méthode non prise en charge ».

**Paramètres**

Aucun

**Retours**

`DONNÉES`, 20 octets - l'adresse coinbase actuelle.

\*\*Exemple \*\*

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_coinbase","params":[],"id":64}'
// Result
{
  "id":64,
  "jsonrpc": "2.0",
  "result": "0x407d73d8a49eeb85d32cf465507dd71d507100c1"
}
```

### eth_chainId {#eth_chainId}

Retourne la chaîne ID utilisée pour la signature d'opérations protégées par la rediffusion.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_chainId">
  Essayer le point de terminaison dans le terrain de jeu
</ButtonLink>

**Paramètres**

Aucun

**Retours**

`chainId`, valeur hexadécimale sous forme de chaîne représentant l'entier de l'ID de la chaîne actuelle.

\*\*Exemple \*\*

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_chainId","params":[],"id":67}'
// Result
{
  "id":67,
  "jsonrpc": "2.0",
  "result": "0x1"
}
```

### eth_mining {#eth_mining}

Retourne `true` si le client mine activement de nouveaux blocs. Cela ne peut renvoyer `true` que pour les réseaux à preuve de travail et peut ne pas être disponible dans certains clients depuis [La Fusion](/roadmap/merge/).

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_mining">
  Essayer le point de terminaison dans le terrain de jeu
</ButtonLink>

**Paramètres**

Aucun

**Retours**

`Booléen` - renvoie `true` si le client mine, sinon `false`.

\*\*Exemple \*\*

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_mining","params":[],"id":71}'
//
{
  "id":71,
  "jsonrpc": "2.0",
  "result": true
}
```

### eth_hashrate {#eth_hashrate}

Retourne le nombre de hachages par seconde avec lesquels le nœud est miné. Cela ne peut renvoyer `true` que pour les réseaux à preuve de travail et peut ne pas être disponible dans certains clients depuis [La Fusion](/roadmap/merge/).

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_hashrate">
  Essayer le point de terminaison dans le terrain de jeu
</ButtonLink>

**Paramètres**

Aucun

**Retours**

`QUANTITÉ` - nombre de hachages par seconde.

\*\*Exemple \*\*

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_hashrate","params":[],"id":71}'
// Result
{
  "id":71,
  "jsonrpc": "2.0",
  "result": "0x38a"
}
```

### eth_gasPrice {#eth_gasprice}

Retourne une estimation du prix actuel de gaz en wei. Par exemple, le client Besu examine les 100 derniers blocs et renvoie le prix médian du gaz en unité par défaut.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_gasPrice">
  Essayer le point de terminaison dans le terrain de jeu
</ButtonLink>

**Paramètres**

Aucun

**Retours**

`QUANTITÉ` - entier du prix actuel du gaz en wei.

\*\*Exemple \*\*

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_gasPrice","params":[],"id":73}'
// Result
{
  "id":73,
  "jsonrpc": "2.0",
  "result": "0x1dfd14000" // 8049999872 Wei
}
```

### eth_accounts {#eth_accounts}

Renvoie une liste d'adresses appartenant au client.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_accounts">
  Essayer le point de terminaison dans le terrain de jeu
</ButtonLink>

**Paramètres**

Aucun

**Retours**

`Tableau de DONNÉES`, 20 Octets - adresses appartenant au client.

\*\*Exemple \*\*

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_accounts","params":[],"id":1}'
// Result
{
  "id":1,
  "jsonrpc": "2.0",
  "result": ["0x407d73d8a49eeb85d32cf465507dd71d507100c1"]
}
```

### eth_blockNumber {#eth_blocknumber}

Renvoie le numéro du bloc le plus récent.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_blockNumber">
  Essayer le point de terminaison dans le terrain de jeu
</ButtonLink>

**Paramètres**

Aucun

**Retours**

`QUANTITÉ` - entier du numéro de bloc actuel sur lequel se trouve le client.

\*\*Exemple \*\*

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_blockNumber","params":[],"id":83}'
// Result
{
  "id":83,
  "jsonrpc": "2.0",
  "result": "0x4b7" // 1207
}
```

### eth_getBalance {#eth_getbalance}

Renvoie le solde du compte à une adresse donnée.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getBalance">
  Essayer le point de terminaison dans le terrain de jeu
</ButtonLink>

**Paramètres**

1. `DONNÉES`, 20 octets - adresse pour vérifier le solde.
2. `QUANTITÉ|TAG` - numéro de bloc entier, ou la chaîne `\"latest\"`, `\"earliest\"`, `\"pending\"`, `\"safe\"`, ou `\"finalized\"`, voir le [paramètre de bloc](/developers/docs/apis/json-rpc/#block-parameter)

```js
params: ["0x407d73d8a49eeb85d32cf465507dd71d507100c1", "latest"]
```

**Retours**

`QUANTITÉ` - entier du solde actuel en wei.

\*\*Exemple \*\*

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getBalance","params":["0x407d73d8a49eeb85d32cf465507dd71d507100c1", "latest"],"id":1}'
// Result
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x0234c8a3397aab58" // 158972490234375000
}
```

### eth_getStorageAt {#eth_getstorageat}

Renvoie la valeur d'une position de stockage à une adresse donnée.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getStorageAt">
  Essayer le point de terminaison dans le terrain de jeu
</ButtonLink>

**Paramètres**

1. `DONNÉES`, 20 octets - adresse du stockage.
2. `QUANTITÉ` - entier de la position dans le stockage.
3. `QUANTITÉ|TAG` - numéro de bloc entier, ou la chaîne `\"latest\"`, `\"earliest\"`, `\"pending\"`, `\"safe\"`, `\"finalized\"`, voir le [paramètre de bloc](/developers/docs/apis/json-rpc/#block-parameter)

**Retours**

`DONNÉES` - la valeur à cette position de stockage.

**Exemple**
Le calcul de la position correcte dépend du stockage à récupérer. Considérez le contrat suivant déployé à l'adresse `0x295a70b2de5e3953354a6a8344e616ed314d7251` par l'adresse `0x391694e7e0b0cce554cb130d723a9d27458f9298`.

```
contract Storage {
    uint pos0;
    mapping(adresse => uint) pos1;
    constructor() {
        pos0 = 1234;
        pos1[msg.sender] = 5678;
    }
}
```

Récupérer la valeur de pos0 est simple :

```js
curl -X POST --data '{"jsonrpc":"2.0", "method": "eth_getStorageAt", "params": ["0x295a70b2de5e3953354a6a8344e616ed314d7251", "0x0", "latest"], "id": 1}' localhost:8545
{"jsonrpc":"2.0","id":1,"result":"0x00000000000000000000000000000000000000000000000000000000000004d2"}
```

La récupération d'un élément de la carte est plus difficile. La position d'un élément dans la carte est calculée avec :

```js
keccak(LeftPad32(key, 0), LeftPad32(map position, 0))
```

Cela signifie que pour récupérer le stockage sur pos1["0x391694e7e0b0cce554cb130d723a9d27458f9298"] nous devons calculer la position avec :

```js
keccak(
  decodeHex(
    "000000000000000000000000391694e7e0b0cce554cb130d723a9d27458f9298" +
      "0000000000000000000000000000000000000000000000000000000000000001"
  )
)
```

La console geth qui est fournie avec la bibliothèque web3 peut être utilisée pour effectuer le calcul :

```js
> var key = "000000000000000000000000391694e7e0b0cce554cb130d723a9d27458f9298" + "0000000000000000000000000000000000000000000000000000000000000001"
undefined
> web3.sha3(key, {"encoding": "hex"})
"0x6661e9d6d8b923d5bbaab1b96e1dd51ff6ea2a93520fdc9eb75d059238b8c5e9"
```

Maintenant, il faut aller chercher le stockage :

```js
curl -X POST --data '{"jsonrpc":"2.0", "method": "eth_getStorageAt", "params": ["0x295a70b2de5e3953354a6a8344e616ed314d7251", "0x6661e9d6d8b923d5bbaab1b96e1dd51ff6ea2a93520fdc9eb75d059238b8c5e9", "latest"], "id": 1}' localhost:8545
{"jsonrpc":"2.0","id":1,"result":"0x000000000000000000000000000000000000000000000000000000000000162e"}
```

### eth_getTransactionCount {#eth_gettransactioncount}

Renvoie le nombre de transactions _envoyées_ depuis une adresse.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getTransactionCount">
  Essayer le point de terminaison dans le terrain de jeu
</ButtonLink>

**Paramètres**

1. `DONNÉES`, 20 octets - adresse.
2. `QUANTITÉ|TAG` - numéro de bloc entier, ou la chaîne `\"latest\"`, `\"earliest\"`, `\"pending\"`, `\"safe\"` ou `\"finalized\"`, voir le [paramètre de bloc](/developers/docs/apis/json-rpc/#block-parameter)

```js
params: [
  "0x407d73d8a49eeb85d32cf465507dd71d507100c1",
  "latest", // state at the latest block
]
```

**Retours**

`QUANTITÉ` - entier du nombre de transactions envoyées depuis cette adresse.

\*\*Exemple \*\*

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getTransactionCount","params":["0x407d73d8a49eeb85d32cf465507dd71d507100c1","latest"],"id":1}'
// Result
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x1" // 1
}
```

### eth_getBlockTransactionCountByHash {#eth_getblocktransactioncountbyhash}

Renvoie le nombre de transactions dans un bloc à partir d'un bloc correspondant au hachage de bloc donné.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getBlockTransactionCountByHash">
  Essayer le point de terminaison dans le terrain de jeu
</ButtonLink>

**Paramètres**

1. `DONNÉES`, 32 octets - hachage d'un bloc

```js
params: ["0xd03ededb7415d22ae8bac30f96b2d1de83119632693b963642318d87d1bece5b"]
```

**Retours**

`QUANTITÉ` - entier du nombre de transactions dans ce bloc.

\*\*Exemple \*\*

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getBlockTransactionCountByHash","params":["0xd03ededb7415d22ae8bac30f96b2d1de83119632693b963642318d87d1bece5b"],"id":1}'
// Result
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x8b" // 139
}
```

### eth_getBlockTransactionCountByNumber {#eth_getblocktransactioncountbynumber}

Renvoie le nombre de transactions dans un bloc correspondant au numéro de bloc donné.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getBlockTransactionCountByNumber">
  Essayer le point de terminaison dans le terrain de jeu
</ButtonLink>

**Paramètres**

1. `QUANTITÉ|TAG` - entier d'un numéro de bloc, ou la chaîne `\"earliest\"`, `\"latest\"`, `\"pending\"`, `\"safe\"` ou `\"finalized\"`, comme dans le [paramètre de bloc](/developers/docs/apis/json-rpc/#block-parameter).

```js
params: [
  "0x13738ca", // 20396234
]
```

**Retours**

`QUANTITÉ` - entier du nombre de transactions dans ce bloc.

\*\*Exemple \*\*

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getBlockTransactionCountByNumber","params":["0x13738ca"],"id":1}'
// Result
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x8b" // 139
}
```

### eth_getUncleCountByBlockHash {#eth_getunclecountbyblockhash}

Renvoie le nombre d'oncles dans un bloc à partir d'un bloc correspondant au hachage de bloc donné.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getUncleCountByBlockHash">
  Essayer le point de terminaison dans le terrain de jeu
</ButtonLink>

**Paramètres**

1. `DONNÉES`, 32 octets - hachage d'un bloc

```js
params: ["0x1d59ff54b1eb26b013ce3cb5fc9dab3705b415a67127a003c3e61eb445bb8df2"]
```

**Retours**

`QUANTITÉ` - entier du nombre d'oncles dans ce bloc.

\*\*Exemple \*\*

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getUncleCountByBlockHash","params":["0x1d59ff54b1eb26b013ce3cb5fc9dab3705b415a67127a003c3e61eb445bb8df2"],"id":1}'
// Result
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x1" // 1
}
```

### eth_getUncleCountByBlockNumber {#eth_getunclecountbyblocknumber}

Renvoie le nombre d'oncles dans un bloc à partir d'un bloc correspondant au numéro de bloc donné.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getUncleCountByBlockNumber">
  Essayer le point de terminaison dans le terrain de jeu
</ButtonLink>

**Paramètres**

1. `QUANTITÉ|TAG` - entier d'un numéro de bloc, ou la chaîne `\"latest\"`, `\"earliest\"`, `\"pending\"`, `\"safe\"` ou `\"finalized\"`, voir le [paramètre de bloc](/developers/docs/apis/json-rpc/#block-parameter)

```js
params: [
  "0xe8", // 232
]
```

**Retours**

`QUANTITÉ` - entier du nombre d'oncles dans ce bloc.

\*\*Exemple \*\*

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getUncleCountByBlockNumber","params":["0xe8"],"id":1}'
// Result
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x0" // 0
}
```

### eth_getCode {#eth_getcode}

Renvoie le code à une adresse donnée.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getCode">
  Essayer le point de terminaison dans le terrain de jeu
</ButtonLink>

**Paramètres**

1. `DONNÉES`, 20 octets - adresse
2. `QUANTITÉ|TAG` - numéro de bloc entier, ou la chaîne `\"latest\"`, `\"earliest\"`, `\"pending\"`, `\"safe\"` ou `\"finalized\"`, voir le [paramètre de bloc](/developers/docs/apis/json-rpc/#block-parameter)

```js
params: [
  "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
  "0x5daf3b", // 6139707
]
```

**Retours**

`DONNÉES` - le code de l'adresse donnée.

\*\*Exemple \*\*

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getCode","params":["0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2", "0x5daf3b"],"id":1}'
// Result
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x6060604052600436106100af576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806306fdde03146100b9578063095ea7b31461014757806318160ddd146101a157806323b872dd146101ca5780632e1a7d4d14610243578063313ce5671461026657806370a082311461029557806395d89b41146102e2578063a9059cbb14610370578063d0e30db0146103ca578063dd62ed3e146103d4575b6100b7610440565b005b34156100c457600080fd5b6100cc6104dd565b6040518080602001828103825283818151815260200191508051906020019080838360005b8381101561010c5780820151818401526020810190506100f1565b50505050905090810190601f1680156101395780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b341561015257600080fd5b610187600480803573ffffffffffffffffffffffffffffffffffffffff1690602001909190803590602001909190505061057b565b604051808215151515815260200191505060405180910390f35b34156101ac57600080fd5b6101b461066d565b6040518082815260200191505060405180910390f35b34156101d557600080fd5b610229600480803573ffffffffffffffffffffffffffffffffffffffff1690602001909190803573ffffffffffffffffffffffffffffffffffffffff1690602001909190803590602001909190505061068c565b604051808215151515815260200191505060405180910390f35b341561024e57600080fd5b61026460048080359060200190919050506109d9565b005b341561027157600080fd5b610279610b05565b604051808260ff1660ff16815260200191505060405180910390f35b34156102a057600080fd5b6102cc600480803573ffffffffffffffffffffffffffffffffffffffff16906020019091905050610b18565b6040518082815260200191505060405180910390f35b34156102ed57600080fd5b6102f5610b30565b6040518080602001828103825283818151815260200191508051906020019080838360005b8381101561033557808201518184015260208101905061031a565b50505050905090810190601f1680156103625780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b341561037b57600080fd5b6103b0600480803573ffffffffffffffffffffffffffffffffffffffff16906020019091908035906020019091905050610bce565b604051808215151515815260200191505060405180910390f35b6103d2610440565b005b34156103df57600080fd5b61042a600480803573ffffffffffffffffffffffffffffffffffffffff1690602001909190803573ffffffffffffffffffffffffffffffffffffffff16906020019091905050610be3565b6040518082815260200191505060405180910390f35b34600360003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825401925050819055503373ffffffffffffffffffffffffffffffffffffffff167fe1fffcc4923d04b559f4d29a8bfc6cda04eb5b0d3c460751c2402c5c5cc9109c346040518082815260200191505060405180910390a2565b60008054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156105735780601f1061054857610100808354040283529160200191610573565b820191906000526020600020905b81548152906001019060200180831161055657829003601f168201915b505050505081565b600081600460003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508273ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925846040518082815260200191505060405180910390a36001905092915050565b60003073ffffffffffffffffffffffffffffffffffffffff1631905090565b600081600360008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054101515156106dc57600080fd5b3373ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff16141580156107b457507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff600460008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205414155b156108cf5781600460008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020541015151561084457600080fd5b81600460008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825403925050819055505b81600360008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000828254039250508190555081600360008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825401925050819055508273ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef846040518082815260200191505060405180910390a3600190509392505050565b80600360003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205410151515610a2757600080fd5b80600360003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825403925050819055503373ffffffffffffffffffffffffffffffffffffffff166108fc829081150290604051600060405180830381858888f193505050501515610ab457600080fd5b3373ffffffffffffffffffffffffffffffffffffffff167f7fcf532c15f0a6db0bd6d0e038bea71d30d808c7d98cb3bf7268a95bf5081b65826040518082815260200191505060405180910390a250565b600260009054906101000a900460ff1681565b60036020528060005260406000206000915090505481565b60018054600181600116156101000203166002900480601f016020809104026020016040519081016040528092919081815260200182805460018160011615610100020316600290048015610bc65780601f10610b9b57610100808354040283529160200191610bc6565b820191906000526020600020905b815481529060010190602001808311610ba957829003601f168201915b505050505081565b6000610bdb33848461068c565b905092915050565b60046020528160005260406000206020528060005260406000206000915091505054815600a165627a7a72305820deb4c2ccab3c2fdca32ab3f46728389c2fe2c165d5fafa07661e4e004f6c344a0029"
}
```

### eth_sign {#eth_sign}

La méthode de signature calcule une signature spécifique à Ethereum avec : `sign(keccak256("\x19Ethereum Signed Message:\n" + len(message) + message)))`.

En ajoutant un préfixe au message, la signature calculée peut être reconnue comme une signature spécifique à Ethereum. Cela empêche une utilisation abusive où une dapp malveillante peut signer des données arbitraires (par exemple, une transaction) et utiliser la signature pour usurper l'identité de la victime.

Remarque : l'adresse avec laquelle signer doit être déverrouillée.

**Paramètres**

1. `DONNÉES`, 20 octets - adresse
2. `DONNÉES`, N octets - message à signer

**Retours**

`DONNÉES` : Signature

\*\*Exemple \*\*

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_sign","params":["0x9b2055d370f73ec7d8a03e965129118dc8f5bf83", "0xdeadbeaf"],"id":1}'
// Result
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0xa3f20717a250c2b0b729b7e5becbff67fdaef7e0699da4de7ca5895b02a170a12d887fd3b17bfdce3481f10bea41f45ba9f709d39ce8325427b57afcfc994cee1b"
}
```

### eth_signTransaction {#eth_signtransaction}

Signe une transaction qui pourra être soumise ultérieurement au réseau en utilisant [eth_sendRawTransaction](#eth_sendrawtransaction).

**Paramètres**

1. `Objet` - L'objet de la transaction

- `type` :
- `from` : `DONNÉES`, 20 octets - L'adresse depuis laquelle la transaction est envoyée.
- `to` : `DONNÉES`, 20 octets - (facultatif lors de la création d'un nouveau contrat) L'adresse à laquelle la transaction est destinée.
- `gas` : `QUANTITÉ` - (facultatif, par défaut : 90000) Entier du gaz fourni pour l'exécution de la transaction. Il retournera du gaz inutilisé.
- `gasPrice` : `QUANTITÉ` - (facultatif, par défaut : à déterminer) Entier du gasPrice utilisé pour chaque gaz payé, en Wei.
- `value` : `QUANTITÉ` - (facultatif) Entier de la valeur envoyée avec cette transaction, en Wei.
- `data` : `DONNÉES` - Le code compilé d'un contrat OU le hachage de la signature de la méthode invoquée et des paramètres encodés.
- `nonce` : `QUANTITÉ` - (facultatif) Entier d'un nonce. Cela permet d'écraser vos propres transactions en attente qui utilisent le même nonce.

**Retours**

`DONNÉES`, l'objet de transaction encodé en RLP signé par le compte spécifié.

\*\*Exemple \*\*

```js
// Request
curl -X POST --data '{"id": 1,"jsonrpc": "2.0","method": "eth_signTransaction","params": [{"data":"0xd46e8dd67c5d32be8d46e8dd67c5d32be8058bb8eb970870f072445675058bb8eb970870f072445675","from": "0xb60e8dd61c5d32be8058bb8eb970870f07233155","gas": "0x76c0","gasPrice": "0x9184e72a000","to": "0xd46e8dd67c5d32be8058bb8eb970870f07244567","value": "0x9184e72a"}]}'
// Result
{
    "id": 1,
    "jsonrpc": "2.0",
    "result": "0xa3f20717a250c2b0b729b7e5becbff67fdaef7e0699da4de7ca5895b02a170a12d887fd3b17bfdce3481f10bea41f45ba9f709d39ce8325427b57afcfc994cee1b"
}
```

### eth_sendTransaction {#eth_sendtransaction}

Crée une nouvelle transaction d'appel de message ou une création de contrat, si le champ de données contient du code, et la signe en utilisant le compte spécifié dans `from`.

**Paramètres**

1. `Objet` - L'objet de la transaction

- `from` : `DONNÉES`, 20 octets - L'adresse depuis laquelle la transaction est envoyée.
- `to` : `DONNÉES`, 20 octets - (facultatif lors de la création d'un nouveau contrat) L'adresse à laquelle la transaction est destinée.
- `gas` : `QUANTITÉ` - (facultatif, par défaut : 90000) Entier du gaz fourni pour l'exécution de la transaction. Il retournera du gaz inutilisé.
- `gasPrice` : `QUANTITÉ` - (facultatif, par défaut : à déterminer) Entier du gasPrice utilisé pour chaque gaz payé.
- `value` : `QUANTITÉ` - (facultatif) Entier de la valeur envoyée avec cette transaction.
- `input` : `DONNÉES` - Le code compilé d'un contrat OU le hachage de la signature de la méthode invoquée et des paramètres encodés.
- `nonce` : `QUANTITÉ` - (facultatif) Entier d'un nonce. Cela permet d'écraser vos propres transactions en attente qui utilisent le même nonce.

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

`DONNÉES`, 32 octets - le hachage de la transaction, ou le hachage zéro si la transaction n'est pas encore disponible.

Utilisez [eth_getTransactionReceipt](#eth_gettransactionreceipt) pour obtenir l'adresse du contrat, une fois que la transaction a été proposée dans un bloc, lorsque vous avez créé un contrat.

\*\*Exemple \*\*

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_sendTransaction","params":[{see above}],"id":1}'
// Result
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0xe670ec64341771606e55d6b4ca35a1a6b75ee3d5145a99d05921026d1527331"
}
```

### eth_sendRawTransaction {#eth_sendrawtransaction}

Crée une nouvelle transaction d'appel de message ou une création de contrat pour les transactions signées.

**Paramètres**

1. `DONNÉES`, les données de transaction signées.

```js
params: [
  "0xd46e8dd67c5d32be8d46e8dd67c5d32be8058bb8eb970870f072445675058bb8eb970870f072445675",
]
```

**Retours**

`DONNÉES`, 32 octets - le hachage de la transaction, ou le hachage zéro si la transaction n'est pas encore disponible.

Utilisez [eth_getTransactionReceipt](#eth_gettransactionreceipt) pour obtenir l'adresse du contrat, une fois que la transaction a été proposée dans un bloc, lorsque vous avez créé un contrat.

\*\*Exemple \*\*

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_sendRawTransaction","params":[{see above}],"id":1}'
// Result
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0xe670ec64341771606e55d6b4ca35a1a6b75ee3d5145a99d05921026d1527331"
}
```

### eth_call {#eth_call}

Exécute un nouvel appel de message immédiatement sans créer de transaction sur la chaîne de blocs. Souvent utilisé pour exécuter des fonctions de contrat intelligent en lecture seule, par exemple `balanceOf` pour un contrat ERC-20.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_call">
  Essayer le point de terminaison dans le terrain de jeu
</ButtonLink>

**Paramètres**

1. `Objet` - L'objet d'appel de transaction

- `from` : `DONNÉES`, 20 octets - (facultatif) L'adresse depuis laquelle la transaction est envoyée.
- `to` : `DONNÉES`, 20 octets - L'adresse à laquelle la transaction est destinée.
- `gas` : `QUANTITÉ` - (facultatif) Entier du gaz fourni pour l'exécution de la transaction. eth_call consomme zéro gaz, mais ce paramètre peut être nécessaire pour certaines exécutions.
- `gasPrice` : `QUANTITÉ` - (facultatif) Entier du gasPrice utilisé pour chaque gaz payé
- `value` : `QUANTITÉ` - (facultatif) Entier de la valeur envoyée avec cette transaction
- `input` : `DONNÉES` - (facultatif) Hachage de la signature de la méthode et des paramètres encodés. Pour plus de détails, voir l'[ABI du contrat Ethereum dans la documentation de Solidity](https://docs.soliditylang.org/en/latest/abi-spec.html).

2. `QUANTITÉ|TAG` - numéro de bloc entier, ou la chaîne `\"latest\"`, `\"earliest\"`, `\"pending\"`, `\"safe\"` ou `\"finalized\"`, voir le [paramètre de bloc](/developers/docs/apis/json-rpc/#block-parameter)

**Retours**

`DONNÉES` - la valeur de retour du contrat exécuté.

\*\*Exemple \*\*

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_call","params":[{see above}],"id":1}'
// Result
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x"
}
```

### eth_estimateGas {#eth_estimategas}

Génère et retourne une estimation de la quantité de gaz nécessaire à la réalisation de la transaction. La transaction ne sera pas ajoutée à la blockchain. Notez que l'estimation peut être beaucoup plus grande que la quantité de gaz réellement utilisée par la transaction, pour diverses raisons, y compris la mécanique EVM et la performance des nœuds.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_estimateGas">
  Essayer le point de terminaison dans le terrain de jeu
</ButtonLink>

**Paramètres**

Voir les paramètres de [eth_call](#eth_call), sauf que toutes les propriétés sont facultatives. Si aucune limite de gaz n'est spécifiée, geth utilise la limite de gaz du bloc en attente comme une limite supérieure. Par conséquent, l'estimation retournée peut ne pas être suffisante pour exécuter l'appel/la transaction lorsque la quantité de gaz est supérieure à la limite de gaz du bloc en attente.

**Retours**

`QUANTITÉ` - la quantité de gaz utilisée.

\*\*Exemple \*\*

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_estimateGas","params":[{see above}],"id":1}'
// Result
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x5208" // 21000
}
```

### eth_getBlockByHash {#eth_getblockbyhash}

Retourne des informations à propos d'un bloc par hachage.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getBlockByHash">
  Essayer le point de terminaison dans le terrain de jeu
</ButtonLink>

**Paramètres**

1. `DONNÉES`, 32 octets - Hachage d'un bloc.
2. `Booléen` - Si `true`, il renvoie les objets de transaction complets, si `false`, seulement les hachages des transactions.

```js
params: [
  "0xdc0818cf78f21a8e70579cb46a43643f78291264dda342ae31049421c82d21ae",
  false,
]
```

**Retours**

`Objet` - un objet de bloc, ou `null` si aucun bloc n'a été trouvé :

- `number` : `QUANTITÉ` - le numéro du bloc. `null` quand il s'agit d'un bloc en attente.
- `hash` : `DONNÉES`, 32 octets - hachage du bloc. `null` quand il s'agit d'un bloc en attente.
- `parentHash` : `DONNÉES`, 32 octets - hachage du bloc parent.
- `nonce` : `DONNÉES`, 8 octets - hachage de la preuve de travail générée. `null` lorsqu'il s'agit d'un bloc en attente, `0x0` pour les blocs à preuve d'enjeu (depuis La Fusion)
- `sha3Uncles` : `DONNÉES`, 32 octets - SHA3 des données des oncles dans le bloc.
- `logsBloom` : `DONNÉES`, 256 octets - le filtre de bloom pour les journaux du bloc. `null` quand il s'agit d'un bloc en attente.
- `transactionsRoot` : `DONNÉES`, 32 octets - la racine du trie de transactions du bloc.
- `stateRoot` : `DONNÉES`, 32 octets - la racine du trie d'état final du bloc.
- `receiptsRoot` : `DONNÉES`, 32 octets - la racine du trie de reçus du bloc.
- `miner` : `DONNÉES`, 20 octets - l'adresse du bénéficiaire à qui les récompenses de bloc ont été données.
- `difficulty` : `QUANTITÉ` - entier de la difficulté pour ce bloc.
- `totalDifficulty` : `QUANTITÉ` - entier de la difficulté totale de la chaîne jusqu'à ce bloc.
- `extraData` : `DONNÉES` - le champ « données supplémentaires » de ce bloc.
- `size` : `QUANTITÉ` - entier de la taille de ce bloc en octets.
- `gasLimit` : `QUANTITÉ` - le gaz maximum autorisé dans ce bloc.
- `gasUsed` : `QUANTITÉ` - le gaz total utilisé par toutes les transactions dans ce bloc.
- `timestamp` : `QUANTITÉ` - l'horodatage unix du moment où le bloc a été assemblé.
- `transactions` : `Tableau` - Tableau d'objets de transaction, ou hachages de transaction de 32 octets en fonction du dernier paramètre donné.
- `uncles` : `Tableau` - Tableau de hachages d'oncles.

\*\*Exemple \*\*

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

### eth_getBlockByNumber {#eth_getblockbynumber}

Renvoie des informations sur un bloc par numéro de bloc.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getBlockByNumber">
  Essayer le point de terminaison dans le terrain de jeu
</ButtonLink>

**Paramètres**

1. `QUANTITÉ|TAG` - entier d'un numéro de bloc, ou la chaîne `\"earliest\"`, `\"latest\"`, `\"pending\"`, `\"safe\"` ou `\"finalized\"`, comme dans le [paramètre de bloc](/developers/docs/apis/json-rpc/#block-parameter).
2. `Booléen` - Si `true`, il renvoie les objets de transaction complets, si `false`, seulement les hachages des transactions.

```js
params: [
  "0x1b4", // 436
  true,
]
```

**Retours**
Voir [eth_getBlockByHash](#eth_getblockbyhash)

\*\*Exemple \*\*

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getBlockByNumber","params":["0x1b4", true],"id":1}'
```

Résultat voir [eth_getBlockByHash](#eth_getblockbyhash)

### eth_getTransactionByHash {#eth_gettransactionbyhash}

Retourne les informations sur une transaction demandée par le hachage de la transaction.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getTransactionByHash">
  Essayer le point de terminaison dans le terrain de jeu
</ButtonLink>

**Paramètres**

1. `DONNÉES`, 32 octets - hachage d'une transaction

```js
params: ["0x88df016429689c079f3b2f6ad39fa052532c56795b733da78a91ebe6a713944b"]
```

**Retours**

`Objet` - un objet de transaction, ou `null` si aucune transaction n'a été trouvée :

- `blockHash` : `DONNÉES`, 32 octets - hachage du bloc dans lequel se trouvait cette transaction. `null` lorsqu'elle est en attente.
- `blockNumber` : `QUANTITÉ` - numéro de bloc où se trouvait cette transaction. `null` lorsqu'elle est en attente.
- `from` : `DONNÉES`, 20 octets - adresse de l'expéditeur.
- `gas` : `QUANTITÉ` - gaz fourni par l'expéditeur.
- `gasPrice` : `QUANTITÉ` - prix du gaz fourni par l'expéditeur en Wei.
- `hash` : `DONNÉES`, 32 octets - hachage de la transaction.
- `input` : `DONNÉES` - les données envoyées avec la transaction.
- `nonce` : `QUANTITÉ` - le nombre de transactions effectuées par l'expéditeur avant celle-ci.
- `to` : `DONNÉES`, 20 octets - adresse du destinataire. `null` lorsqu'il s'agit d'une transaction de création de contrat.
- `transactionIndex` : `QUANTITÉ` - entier de la position de l'index des transactions dans le bloc. `null` lorsqu'elle est en attente.
- `value` : `QUANTITÉ` - valeur transférée en Wei.
- `v` : `QUANTITÉ` - ID de récupération ECDSA
- `r` : `QUANTITÉ` - signature ECDSA r
- `s` : `QUANTITÉ` - signature ECDSA s

\*\*Exemple \*\*

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getTransactionByHash","params":["0x88df016429689c079f3b2f6ad39fa052532c56795b733da78a91ebe6a713944b"],"id":1}'
// Result
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

### eth_getTransactionByBlockHashAndIndex {#eth_gettransactionbyblockhashandindex}

Retourne des informations sur une transaction par hachage de bloc et la position de l'indice de transaction.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getTransactionByBlockHashAndIndex">
  Essayer le point de terminaison dans le terrain de jeu
</ButtonLink>

**Paramètres**

1. `DONNÉES`, 32 octets - hachage d'un bloc.
2. `QUANTITÉ` - entier de la position de l'index de transaction.

```js
params: [
  "0x1d59ff54b1eb26b013ce3cb5fc9dab3705b415a67127a003c3e61eb445bb8df2",
  "0x0", // 0
]
```

**Retours**
Voir [eth_getTransactionByHash](#eth_gettransactionbyhash)

\*\*Exemple \*\*

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getTransactionByBlockHashAndIndex","params":["0x1d59ff54b1eb26b013ce3cb5fc9dab3705b415a67127a003c3e61eb445bb8df2", "0x0"],"id":1}'
```

Résultat voir [eth_getTransactionByHash](#eth_gettransactionbyhash)

### eth_getTransactionByBlockNumberAndIndex {#eth_gettransactionbyblocknumberandindex}

Retourne des informations sur une transaction par numéro de bloc et la position de l'indice de transaction.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getTransactionByBlockNumberAndIndex">
  Essayer le point de terminaison dans le terrain de jeu
</ButtonLink>

**Paramètres**

1. `QUANTITÉ|TAG` - un numéro de bloc, ou la chaîne `\"earliest\"`, `\"latest\"`, `\"pending\"`, `\"safe\"` ou `\"finalized\"`, comme dans le [paramètre de bloc](/developers/docs/apis/json-rpc/#block-parameter).
2. `QUANTITÉ` - position de l'indice de transaction.

```js
params: [
  "0x9c47cf", // 10241999
  "0x24", // 36
]
```

**Retours**
Voir [eth_getTransactionByHash](#eth_gettransactionbyhash)

\*\*Exemple \*\*

```js
// Requête
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getTransactionByBlockNumberAndIndex","params":["0x9c47cf", "0x24"],"id":1}'
```

Résultat voir [eth_getTransactionByHash](#eth_gettransactionbyhash)

### eth_getTransactionReceipt {#eth_gettransactionreceipt}

Retourne la réception d'une transaction par hachage de la transaction.

**Remarque** Ce reçu n'est pas disponible pour les transactions en attente.

**Paramètres**

1. `DONNÉES`, 32 octets - hachage d'une transaction

```js
params: ["0x85d995eba9763907fdf35cd2034144dd9d53ce32cbec21349d4b12823c6860c5"]
```

**Retours**
`Objet` - Un objet de reçu de transaction, ou `null` si aucun reçu n'a été trouvé :

- `transactionHash ` : `DONNÉES`, 32 octets - hachage de la transaction.
- `transactionIndex` : `QUANTITÉ` - entier de la position de l'index des transactions dans le bloc.
- `blockHash` : `DONNÉES`, 32 octets - hachage du bloc dans lequel se trouvait cette transaction.
- `blockNumber` : `QUANTITÉ` - numéro de bloc où se trouvait cette transaction.
- `from` : `DONNÉES`, 20 octets - adresse de l'expéditeur.
- `to` : `DONNÉES`, 20 octets - adresse du destinataire. null lors d'une transaction de création de contrat.
- `cumulativeGasUsed` : `QUANTITÉ ` - Le montant total de gaz utilisé lorsque cette transaction a été exécutée dans le bloc.
- `effectiveGasPrice` : `QUANTITÉ` - La somme des frais de base et du pourboire payés par unité de gaz.
- `gasUsed ` : `QUANTITÉ ` - La quantité de gaz utilisée par cette transaction spécifique seule.
- `contractAddress ` : `DONNÉES`, 20 octets - L'adresse du contrat créée, si la transaction était une création de contrat, sinon `null`.
- `logs` : `Tableau` - Tableau d'objets de journal que cette transaction a générés.
- `logsBloom` : `DONNÉES`, 256 octets - Filtre de Bloom pour que les clients légers puissent récupérer rapidement les journaux associés.
- `type` : `QUANTITÉ` - entier du type de transaction, `0x0` pour les transactions héritées, `0x1` pour les types de listes d'accès, `0x2` pour les frais dynamiques.

Il renvoie également _soit_ :

- `root` : `DONNÉES` 32 octets de la racine de l'état post-transaction (avant Byzance)
- `status` : `QUANTITÉ` soit `1` (succès), soit `0` (échec)

\*\*Exemple \*\*

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getTransactionReceipt","params":["0x85d995eba9763907fdf35cd2034144dd9d53ce32cbec21349d4b12823c6860c5"],"id":1}'
// Result
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "blockHash":
      "0xa957d47df264a31badc3ae823e10ac1d444b098d9b73d204c40426e57f47e8c3",
    "blockNumber": "0xeff35f",
    "contractAddress": null, // string of the address if it was created
    "cumulativeGasUsed": "0xa12515",
    "effectiveGasPrice": "0x5a9c688d4",
    "from": "0x6221a9c005f6e47eb398fd867784cacfdcfff4e7",
    "gasUsed": "0xb4c8",
    "logs": [{
      // logs as returned by getFilterLogs, etc.
    }],
    "logsBloom": "0x00...0", // 256 byte bloom filter
    "status": "0x1",
    "to": "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
    "transactionHash":
      "0x85d995eba9763907fdf35cd2034144dd9d53ce32cbec21349d4b12823c6860c5",
    "transactionIndex": "0x66",
    "type": "0x2"
  }
}
```

### eth_getUncleByBlockHashAndIndex {#eth_getunclebyblockhashandindex}

Renvoie des informations sur un oncle d'un bloc par hachage et position de l'index de l'oncle.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getUncleByBlockHashAndIndex">
  Essayer le point de terminaison dans le terrain de jeu
</ButtonLink>

**Paramètres**

1. `DONNÉES`, 32 octets - Le hachage d'un bloc.
2. `QUANTITÉ` - La position de l'indice de l'oncle.

```js
params: [
  "0x1d59ff54b1eb26b013ce3cb5fc9dab3705b415a67127a003c3e61eb445bb8df2",
  "0x0", // 0
]
```

**Retours**
Voir [eth_getBlockByHash](#eth_getblockbyhash)

\*\*Exemple \*\*

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getUncleByBlockHashAndIndex","params":["0x1d59ff54b1eb26b013ce3cb5fc9dab3705b415a67127a003c3e61eb445bb8df2", "0x0"],"id":1}'
```

Résultat voir [eth_getBlockByHash](#eth_getblockbyhash)

**Remarque** : un oncle ne contient pas de transactions individuelles.

### eth_getUncleByBlockNumberAndIndex {#eth_getunclebyblocknumberandindex}

Renvoie des informations sur un oncle d'un bloc par numéro et position de l'index de l'oncle.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getUncleByBlockNumberAndIndex">
  Essayer le point de terminaison dans le terrain de jeu
</ButtonLink>

**Paramètres**

1. `QUANTITÉ|TAG` - un numéro de bloc, ou la chaîne `\"earliest\"`, `\"latest\"`, `\"pending\"`, `\"safe\"`, `\"finalized\"`, comme dans le [paramètre de bloc](/developers/docs/apis/json-rpc/#block-parameter).
2. `QUANTITÉ` - la position de l'indice de l'oncle.

```js
params: [
  "0x29c", // 668
  "0x0", // 0
]
```

**Retours**
Voir [eth_getBlockByHash](#eth_getblockbyhash)

**Remarque** : un oncle ne contient pas de transactions individuelles.

\*\*Exemple \*\*

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getUncleByBlockNumberAndIndex","params":["0x29c", "0x0"],"id":1}'
```

Résultat voir [eth_getBlockByHash](#eth_getblockbyhash)

### eth_newFilter {#eth_newfilter}

Crée un objet filtre, basé sur les options de filtre, pour avertir lorsque l'état change (logs).
Pour vérifier si l'état a changé, appelez [eth_getFilterChanges](#eth_getfilterchanges).

**Remarque sur la spécification des filtres de sujets :**
Les sujets dépendent de l'ordre. Une transaction avec un journal avec des sujets [A, B] sera mise en correspondance par les filtres de discussion suivants :

- `[]` « n'importe quoi »
- `[A]` « A en première position (et n'importe quoi après) »
- `[null, B]` « n'importe quoi en première position ET B en deuxième position (et n'importe quoi après) »
- `[A, B]` « A en première position ET B en deuxième position (et n'importe quoi après) »
- `[[A, B], [A, B]]` « (A OU B) en première position ET (A OU B) en deuxième position (et n'importe quoi après) »
- **Paramètres**

1. `Objet` - Les options de filtre :

- `fromBlock` : `QUANTITÉ|TAG` - (facultatif, par défaut : `\"latest\"`) Numéro de bloc entier, ou `\"latest\"` pour le dernier bloc proposé, `\"safe\"` pour le dernier bloc sûr, `\"finalized\"` pour le dernier bloc finalisé, ou `\"pending\"`, `\"earliest\"` pour les transactions qui ne sont pas encore dans un bloc.
- `toBlock` : `QUANTITÉ|TAG` - (facultatif, par défaut : `\"latest\"`) Numéro de bloc entier, ou `\"latest\"` pour le dernier bloc proposé, `\"safe\"` pour le dernier bloc sûr, `\"finalized\"` pour le dernier bloc finalisé, ou `\"pending\"`, `\"earliest\"` pour les transactions qui ne sont pas encore dans un bloc.
- `address` : `DONNÉES|Tableau`, 20 octets - (facultatif) Adresse de contrat ou liste d'adresses d'où les journaux doivent provenir.
- `topics` : `Tableau de DONNÉES`, - (facultatif) Tableau de sujets `DONNÉES` de 32 octets. Les sujets dépendent de l'ordre. Chaque sujet peut également être un tableau de DATA avec des options « ou ».

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
`QUANTITÉ` - Un ID de filtre.

\*\*Exemple \*\*

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_newFilter","params":[{"topics":["0x12341234"]}],"id":73}'
// Result
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x1" // 1
}
```

### eth_newBlockFilter {#eth_newblockfilter}

Crée un filtre dans le nœud, pour avertir lorsqu'un nouveau bloc arrive.
Pour vérifier si l'état a changé, appelez [eth_getFilterChanges](#eth_getfilterchanges).

**Paramètres**
Aucun

**Retours**
`QUANTITÉ` - Un ID de filtre.

\*\*Exemple \*\*

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_newBlockFilter","params":[],"id":73}'
// Result
{
  "id":1,
  "jsonrpc":  "2.0",
  "result": "0x1" // 1
}
```

### eth_newPendingTransactionFilter {#eth_newpendingtransactionfilter}

Crée un filtre dans le nœud, pour notifier quand de nouvelles transactions en attente arrivent.
Pour vérifier si l'état a changé, appelez [eth_getFilterChanges](#eth_getfilterchanges).

**Paramètres**
Aucun

**Retours**
`QUANTITÉ` - Un ID de filtre.

\*\*Exemple \*\*

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_newPendingTransactionFilter","params":[],"id":73}'
// Result
{
  "id":1,
  "jsonrpc":  "2.0",
  "result": "0x1" // 1
}
```

### eth_uninstallFilter {#eth_uninstallfilter}

Désinstalle un filtre avec un identifiant donné. Doit toujours être appelé lorsque la montre n'est plus nécessaire.
De plus, les filtres expirent lorsqu'ils ne sont pas demandés avec [eth_getFilterChanges](#eth_getfilterchanges) pendant un certain temps.

**Paramètres**

1. `QUANTITÉ` - L'ID du filtre.

```js
params: [
  "0xb", // 11
]
```

**Retours**
`Booléen` - `true` si le filtre a été désinstallé avec succès, sinon `false`.

\*\*Exemple \*\*

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_uninstallFilter","params":["0xb"],"id":73}'
// Result
{
  "id":1,
  "jsonrpc": "2.0",
  "result": true
}
```

### eth_getFilterChanges {#eth_getfilterchanges}

Méthode de vote pour un filtre, qui retourne un tableau de logs qui s'est produit depuis le dernier sondage.

**Paramètres**

1. `QUANTITÉ` - l'ID du filtre.

```js
params: [
  "0x16", // 22
]
```

**Retours**
`Tableau` - Tableau d'objets de journal, ou un tableau vide si rien n'a changé depuis le dernier sondage.

- Pour les filtres créés avec `eth_newBlockFilter`, le retour est un hachage de bloc (`DONNÉES`, 32 octets), par exemple, `[\"0x3454645634534...\"]`.

- Pour les filtres créés avec `eth_newPendingTransactionFilter`, le retour est un hachage de transaction (`DONNÉES`, 32 octets), par exemple `[\"0x6345343454645...\"]`.

- Pour les filtres créés avec `eth_newFilter`, les journaux sont des objets avec les paramètres suivants :
  - `removed` : `TAG` - `true` lorsque le journal a été supprimé, en raison d'une réorganisation de la chaîne. `false` s'il s'agit d'un journal valide.
  - `logIndex` : `QUANTITÉ` - entier de la position de l'index du journal dans le bloc. `null` lorsqu'il s'agit d'un journal en attente.
  - `transactionIndex` : `QUANTITÉ` - entier de la position de l'index des transactions à partir de laquelle le journal a été créé. `null` lorsqu'il s'agit d'un journal en attente.
  - `transactionHash` : `DONNÉES`, 32 octets - hachage des transactions à partir desquelles ce journal a été créé. `null` lorsqu'il s'agit d'un journal en attente.
  - `blockHash` : `DONNÉES`, 32 octets - hachage du bloc dans lequel se trouvait ce journal. `null` lorsqu'elle est en attente. `null` lorsqu'il s'agit d'un journal en attente.
  - `blockNumber` : `QUANTITÉ` - le numéro de bloc où se trouvait ce journal. `null` lorsqu'elle est en attente. `null` lorsqu'il s'agit d'un journal en attente.
  - `address` : `DONNÉES`, 20 octets - adresse d'où provient ce journal.
  - `data` : `DONNÉES` - données de journal non indexées de longueur variable. (En _Solidity_ : zéro ou plusieurs arguments de journal non indexés de 32 octets.)
  - `topics` : `Tableau de DONNÉES` - Tableau de 0 à 4 `DONNÉES` de 32 octets d'arguments de journal indexés. (En _Solidity_ : le premier sujet est le _hachage_ de la signature de l'événement (par ex., `Deposit(address,bytes32,uint256)`), sauf si vous avez déclaré l'événement avec le spécificateur `anonymous`.)

- \*\*Exemple \*\*

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

### eth_getFilterLogs {#eth_getfilterlogs}

Retourne un tableau de tous les logs correspondant au filtre avec l'identifiant donné.

**Paramètres**

1. `QUANTITÉ` - L'ID du filtre.

```js
params: [
  "0x16", // 22
]
```

**Retours**
Voir [eth_getFilterChanges](#eth_getfilterchanges)

\*\*Exemple \*\*

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getFilterLogs","params":["0x16"],"id":74}'
```

Résultat voir [eth_getFilterChanges](#eth_getfilterchanges)

### eth_getLogs {#eth_getlogs}

Retourne un tableau de tous les logs correspondant à un objet filtre donné.

**Paramètres**

1. `Objet` - Les options de filtre :

- `fromBlock` : `QUANTITÉ|TAG` - (facultatif, par défaut : `\"latest\"`) Numéro de bloc entier, ou `\"latest\"` pour le dernier bloc proposé, `\"safe\"` pour le dernier bloc sûr, `\"finalized\"` pour le dernier bloc finalisé, ou `\"pending\"`, `\"earliest\"` pour les transactions qui ne sont pas encore dans un bloc.
- `toBlock` : `QUANTITÉ|TAG` - (facultatif, par défaut : `\"latest\"`) Numéro de bloc entier, ou `\"latest\"` pour le dernier bloc proposé, `\"safe\"` pour le dernier bloc sûr, `\"finalized\"` pour le dernier bloc finalisé, ou `\"pending\"`, `\"earliest\"` pour les transactions qui ne sont pas encore dans un bloc.
- `address` : `DONNÉES|Tableau`, 20 octets - (facultatif) Adresse de contrat ou liste d'adresses d'où les journaux doivent provenir.
- `topics` : `Tableau de DONNÉES`, - (facultatif) Tableau de sujets `DONNÉES` de 32 octets. Les sujets dépendent de l'ordre. Chaque sujet peut également être un tableau de DATA avec des options « ou ».
- `blockHash` : `DONNÉES`, 32 octets - (facultatif, **futur**) Avec l'ajout de l'EIP-234, `blockHash` sera une nouvelle option de filtre qui restreint les journaux retournés au seul bloc avec le hachage de 32 octets `blockHash`. L'utilisation de `blockHash` est équivalente à `fromBlock` = `toBlock` = le numéro de bloc avec le hachage `blockHash`. Si `blockHash` est présent dans les critères de filtre, ni `fromBlock` ni `toBlock` ne sont autorisés.

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
Voir [eth_getFilterChanges](#eth_getfilterchanges)

\*\*Exemple \*\*

```js
// Request
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getLogs","params":[{"topics":["0x000000000000000000000000a94f5374fce5edbc8e2a8697c15331677e6ebf0b"]}],"id":74}'
```

Résultat voir [eth_getFilterChanges](#eth_getfilterchanges)

## Exemple d'utilisation {#usage-example}

### Déploiement d'un contrat à l'aide de JSON-RPC {#deploying-contract}

Cette section comprend une démonstration de la façon de déployer un contrat en utilisant uniquement l'interface RPC. Il existe d'autres moyens de déployer des contrats où cette complexité est abstraite, par exemple, en utilisant des bibliothèques construites sur l'interface RPC telles que [web3.js](https://web3js.readthedocs.io/) et [web3.py](https://github.com/ethereum/web3.py). Ces abstractions sont généralement plus faciles à comprendre et moins sujettes aux erreurs, mais il est toujours utile de comprendre ce qui se passe sous le capot.

Ce qui suit est un contrat intelligent simple appelé `Multiply7` qui sera déployé à l'aide de l'interface JSON-RPC sur un nœud Ethereum. Ce tutoriel suppose que le lecteur exécute déjà un nœud Geth. Plus d'informations sur les nœuds et les clients sont disponibles [ici](/developers/docs/nodes-and-clients/run-a-node). Veuillez vous référer à la documentation de chaque [client](/developers/docs/nodes-and-clients/) pour voir comment démarrer le JSON-RPC HTTP pour les clients non-Geth. La plupart des clients servent par défaut sur `localhost:8545`.

```javascript
contract Multiply7 {
    event Print(uint);
    function multiply(uint input) returns (uint) {
        Print(input * 7);
        return input * 7;
    }
}
```

La première chose à faire est de s'assurer que l'interface HTTP RPC est activée. Cela signifie que nous fournissons à Geth le drapeau `--http` au démarrage. Dans cet exemple, nous utilisons le nœud Geth dans une chaîne de développement privé. En utilisant cette approche, nous n'avons pas besoin d'éther sur le réseau réel.

```bash
geth --http --dev console 2>>geth.log
```

Cela démarrera l'interface RPC HTTP sur `http://localhost:8545`.

Nous pouvons vérifier que l'interface est en cours d'exécution en récupérant l'adresse coinbase (en obtenant la première adresse dans le tableau des comptes) et le solde en utilisant [curl](https://curl.se). Veuillez noter que les données contenues dans ces exemples seront différentes sur votre noeud local. Si vous voulez essayer ces commandes, remplacez les paramètres de la requête dans la deuxième requête avec le résultat retourné par la première.

```bash
curl --data '{"jsonrpc":"2.0","method":"eth_accounts","params":[], "id":1}' -H "Content-Type: application/json" localhost:8545
{"id":1,"jsonrpc":"2.0","result":["0x9b1d35635cc34752ca54713bb99d38614f63c955"]}

curl --data '{"jsonrpc":"2.0","method":"eth_getBalance", "params": ["0x9b1d35635cc34752ca54713bb99d38614f63c955", "latest"], "id":2}' -H "Content-Type: application/json" localhost:8545
{"id":2,"jsonrpc":"2.0","result":"0x1639e49bba16280000"}
```

Comme les nombres sont encodés en hexa, la balance est retournée en wei sous la forme d'une chaîne hexadécimale. Si nous voulons avoir le solde en éther en tant que numéro, nous pouvons utiliser web3 de la console Geth .

```javascript
web3.fromWei("0x1639e49bba16280000", "ether")
// "410"
```

Maintenant que notre chaîne de développement privé a un certain poids, nous pouvons déployer le contrat. La première étape est de compiler le contrat Multiply7 en byte code qui peut être envoyé à l'EVM. Pour installer solc, le compilateur Solidity, suivez la [documentation Solidity](https://docs.soliditylang.org/en/latest/installing-solidity.html). (Vous voudrez peut-être utiliser une ancienne version de `solc` pour correspondre à [la version du compilateur utilisée pour notre exemple](https://github.com/ethereum/solidity/releases/tag/v0.4.20).)

L'étape suivante consiste à compiler le contrat Multiply7 en code d'octet qui peut être envoyé à l'EVM.

```bash
echo 'pragma solidity ^0.4.16; contract Multiply7 { event Print(uint); function multiply(uint input) public returns (uint) { Print(input * 7); return input * 7; } }' | solc --bin

======= <stdin>:Multiply7 =======
Binary:
6060604052341561000f57600080fd5b60eb8061001d6000396000f300606060405260043610603f576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff168063c6888fa1146044575b600080fd5b3415604e57600080fd5b606260048080359060200190919050506078565b6040518082815260200191505060405180910390f35b60007f24abdb5865df5079dcc5ac590ff6f01d5c16edbc5fab4e195d9febd1114503da600783026040518082815260200191505060405180910390a16007820290509190505600a165627a7a7230582040383f19d9f65246752244189b02f56e8d0980ed44e7a56c0b200458caad20bb0029
```

Maintenant que nous avons le code compilé, nous devons déterminer combien de gaz il coûte pour le déployer. L'interface RPC a une méthode `eth_estimateGas` qui nous donnera une estimation.

```bash
curl --data '{"jsonrpc":"2.0","method": "eth_estimateGas", "params": [{"from": "0x9b1d35635cc34752ca54713bb99d38614f63c955", "data": "0x6060604052341561000f57600080fd5b60eb8061001d6000396000f300606060405260043610603f576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff168063c6888fa1146044575b600080fd5b3415604e57600080fd5b606260048080359060200190919050506078565b6040518082815260200191505060405180910390f35b60007f24abdb5865df5079dcc5ac590ff6f01d5c16edbc5fab4e195d9febd1114503da600783026040518082815260200191505060405180910390a16007820290509190505600a165627a7a7230582040383f19d9f65246752244189b02f56e8d0980ed44e7a56c0b200458caad20bb0029"}], "id": 5}' -H "Content-Type: application/json" localhost:8545
{"jsonrpc":"2.0","id":5,"result":"0x1c31e"}
```

Et enfin déployez le contrat.

```bash
curl --data '{"jsonrpc":"2.0","method": "eth_sendTransaction", "params": [{"from": "0x9b1d35635cc34752ca54713bb99d38614f63c955", "gas": "0x1c31e", "data": "0x6060604052341561000f57600080fd5b60eb8061001d6000396000f300606060405260043610603f576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff168063c6888fa1146044575b600080fd5b3415604e57600080fd5b606260048080359060200190919050506078565b6040518082815260200191505060405180910390f35b60007f24abdb5865df5079dcc5ac590ff6f01d5c16edbc5fab4e195d9febd1114503da600783026040518082815260200191505060405180910390a16007820290509190505600a165627a7a7230582040383f19d9f65246752244189b02f56e8d0980ed44e7a56c0b200458caad20bb0029"}], "id": 6}' -H "Content-Type: application/json" localhost:8545
{"id":6,"jsonrpc":"2.0","result":"0xe1f3095770633ab2b18081658bad475439f6a08c902d0915903bafff06e6febf"}
```

La transaction est acceptée par le noeud et un hachage de la transaction est retourné. Ce hachage peut être utilisé pour suivre la transaction. La prochaine étape consiste à déterminer l'adresse où notre contrat est déployé. Chaque transaction exécutée créera un reçu. Ce reçu contient diverses informations sur la transaction telle que le bloc dans lequel la transaction a été incluse et la quantité de gaz utilisée par l'EVM. Si une transaction crée un contrat, elle contiendra également l'adresse du contrat. Nous pouvons récupérer le reçu avec la méthode RPC `eth_getTransactionReceipt`.

```bash
curl --data '{"jsonrpc":"2.0","method": "eth_getTransactionReceipt", "params": ["0xe1f3095770633ab2b18081658bad475439f6a08c902d0915903bafff06e6febf"], "id": 7}' -H "Content-Type: application/json" localhost:8545
{"jsonrpc":"2.0","id":7,"result":{"blockHash":"0x77b1a4f6872b9066312de3744f60020cbd8102af68b1f6512a05b7619d527a4f","blockNumber":"0x1","contractAddress":"0x4d03d617d700cf81935d7f797f4e2ae719648262","cumulativeGasUsed":"0x1c31e","from":"0x9b1d35635cc34752ca54713bb99d38614f63c955","gasUsed":"0x1c31e","logs":[],"logsBloom":"0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000","status":"0x1","to":null,"transactionHash":"0xe1f3095770633ab2b18081658bad475439f6a08c902d0915903bafff06e6febf","transactionIndex":"0x0"}}
```

Notre contrat a été créé sur `0x4d03d617d700cf81935d7f797f4e2ae719648262`. Un résultat nul au lieu d'un reçu signifie que la transaction n'a pas encore été intégrée dans un bloc. Attendez un instant et vérifiez si votre client de consensus est en cours d'exécution et réessayez.

#### Interagir avec les contrats intelligents {#interacting-with-smart-contract}

Dans cet exemple, nous allons envoyer une transaction en utilisant `eth_sendTransaction` à la méthode `multiply` du contrat.

`eth_sendTransaction` nécessite plusieurs arguments, en particulier `from`, `to` et `data`. `From` est l'adresse publique de notre compte et `to` est l'adresse du contrat. L'argument `data` contient une charge utile qui définit quelle méthode doit être appelée et avec quels arguments. C'est là que l'[ABI (interface binaire d'application)](https://docs.soliditylang.org/en/latest/abi-spec.html) entre en jeu. L'ABI est un fichier JSON qui définit comment définir et encoder les données pour l'EVM.

Les octets de la charge utile définissent quelle méthode dans le contrat est appelée. Il s'agit des 4 premiers octets du hachage de Keccak sur le nom de la fonction et ses types d'arguments, encodés en hexa. La fonction multiplier accepte un uint qui est un alias pour uint256. Cela nous laisse avec :

```javascript
web3.sha3("multiply(uint256)").substring(0, 10)
// "0xc6888fa1"
```

L'étape suivante est d'encoder les arguments. Il n'y a qu'un seul uint256, par exemple, la valeur 6. L'ABI a une section qui spécifie comment encoder les types uint256.

`int<M>: enc(X)` est l'encodage en complément à deux gros-boutiste de X, complété sur le côté d'ordre supérieur (gauche) avec 0xff pour X négatif et avec des octets nuls pour X positif de sorte que la longueur soit un multiple de 32 octets.

Ceci encode en `0000000000000000000000000000000000000000000000000000000000000006`.

En combinant le sélecteur de fonction et l'argument encodé, nos données seront `0xc6888fa10000000000000000000000000000000000000000000000000000000000000006`.

Cela peut maintenant être envoyé au nœud :

```bash
curl --data '{"jsonrpc":"2.0","method": "eth_sendTransaction", "params": [{"from": "0xeb85a5557e5bdc18ee1934a89d8bb402398ee26a", "to": "0x6ff93b4b46b41c0c3c9baee01c255d3b4675963d", "data": "0xc6888fa10000000000000000000000000000000000000000000000000000000000000006"}], "id": 8}' -H "Content-Type: application/json" localhost:8545
{"id":8,"jsonrpc":"2.0","result":"0x759cf065cbc22e9d779748dc53763854e5376eea07409e590c990eafc0869d74"}
```

Puisqu'une transaction a été envoyée, un hachage de transaction a été retourné. La récupération du reçu :

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

Le reçu contient un journal d'activités. Ce journal a été généré par l'EVM lors de l'exécution de la transaction et est inclus dans le reçu. La fonction `multiply` montre que l'événement `Print` a été déclenché avec l'entrée fois 7. Puisque l'argument pour l'événement `Print` était un uint256, nous pouvons le décoder selon les règles de l'ABI, ce qui nous donnera la décimale attendue 42. Mis à part les données, il est intéressant de noter que les sujets peuvent être utilisés pour déterminer quel événement a créé le journal :

```javascript
web3.sha3("Print(uint256)")
// "24abdb5865df5079dcc5ac590ff6f01d5c16edbc5fab4e195d9febd1114503da"
```

Il ne s'agissait que d'une brève introduction à certaines des tâches les plus courantes, démontrant l'utilisation directe du JSON-RPC.

## Sujets connexes {#related-topics}

- [Spécification JSON-RPC](http://www.jsonrpc.org/specification)
- [Nœuds et clients](/developers/docs/nodes-and-clients/)
- [API JavaScript](/developers/docs/apis/javascript/)
- [API backend](/developers/docs/apis/backend/)
- [Clients d'exécution](/developers/docs/nodes-and-clients/#execution-clients)
