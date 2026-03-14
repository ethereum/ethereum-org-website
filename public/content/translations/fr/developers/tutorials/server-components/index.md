---
title: "Composants de serveur et agents pour les applications web3"
description: "Après avoir lu ce tutoriel, vous serez en mesure d'écrire des serveurs TypeScript qui écoutent les événements sur une blockchain et y répondent en conséquence avec leurs propres transactions. Cela vous permettra d'écrire des applications centralisées (car le serveur est un point de défaillance unique), mais qui peuvent interagir avec des entités web3. Les mêmes techniques peuvent également être utilisées pour écrire un agent qui répond aux événements en chaîne sans intervention humaine."

author: Ori Pomerantz
lang: fr
tags: [ "agent", "serveur", "hors-chaîne" ]
skill: beginner
published: 2024-07-15
---

## Introduction {#introduction}

Dans la plupart des cas, une application décentralisée (dapp) utilise un serveur pour distribuer le logiciel, mais toute l'interaction réelle se produit entre le client (généralement un navigateur Web) et la blockchain.

![Interaction normale entre le serveur Web, le client et la blockchain](./fig-1.svg)

Cependant, il existe des cas où une application bénéficierait d'un composant serveur qui s'exécute de manière indépendante. Un tel serveur serait capable de répondre à des événements et à des requêtes provenant d'autres sources, comme une API, en émettant des transactions.

![L'interaction avec l'ajout d'un serveur](./fig-2.svg)

Il y a plusieurs tâches possibles qu'un tel serveur pourrait accomplir.

- Détenteur d'état secret. Dans les jeux, il est souvent utile de ne pas mettre à la disposition des joueurs toutes les informations que le jeu connaît. Cependant, _il n'y a pas de secrets sur la blockchain_, toute information qui s'y trouve est facile à découvrir pour n'importe qui. Par conséquent, si une partie de l'état du jeu doit rester secrète, elle doit être stockée ailleurs (et éventuellement faire vérifier les effets de cet état à l'aide de [preuves à divulgation nulle de connaissance](/zero-knowledge-proofs)).

- Oracle centralisé. Si les enjeux sont suffisamment faibles, un serveur externe qui lit des informations en ligne puis les publie sur la chaîne peut être suffisant pour être utilisé comme un [oracle](/developers/docs/oracles/).

- Agent. Rien ne se passe sur la blockchain sans une transaction pour l'activer. Un serveur peut agir au nom d'un utilisateur pour effectuer des actions telles que l'[arbitrage](/developers/docs/mev/#mev-examples-dex-arbitrage) lorsque l'occasion se présente.

## Exemple de programme {#sample-program}

Vous pouvez voir un exemple de serveur [sur github](https://github.com/qbzzt/20240715-server-component). Ce serveur écoute les événements provenant de [ce contrat](https://eth-holesky.blockscout.com/address/0xB8f6460Dc30c44401Be26B0d6eD250873d8a50A6?tab=contract_code), une version modifiée du Greeter de Hardhat. Lorsque le message de bienvenue est modifié, il le rétablit.

Pour l'exécuter :

1. Cloner le dépôt.

   ```sh copy
   git clone https://github.com/qbzzt/20240715-server-component.git
   cd 20240715-server-component
   ```

2. Installez les paquets nécessaires. Si vous ne l'avez pas déjà, [installez d'abord Node](https://nodejs.org/en/download/package-manager).

   ```sh copy
   npm install
   ```

3. Modifiez `.env` pour spécifier la clé privée d'un compte qui possède des ETH sur le réseau de test Holesky. Si vous n'avez pas d'ETH sur Holesky, vous pouvez [utiliser ce faucet](https://holesky-faucet.pk910.de/).

   ```sh filename=".env" copy
   PRIVATE_KEY=0x <la clé privée va ici>
   ```

4. Démarrer le serveur.

   ```sh copy
   npm start
   ```

5. Allez sur [un explorateur de blocs](https://eth-holesky.blockscout.com/address/0xB8f6460Dc30c44401Be26B0d6eD250873d8a50A6?tab=write_contract), et en utilisant une adresse différente de celle qui a la clé privée, modifiez le message de bienvenue. Voyez que le message de bienvenue est automatiquement rétabli.

### Comment ça marche ? {#how-it-works}

La manière la plus simple de comprendre comment écrire un composant serveur est de parcourir l'exemple ligne par ligne.

#### `src/app.ts` {#src-app-ts}

La grande majorité du programme est contenue dans [`src/app.ts`](https://github.com/qbzzt/20240715-server-component/blob/main/src/app.ts).

##### Création des objets prérequis

```typescript
import {
  createPublicClient,
  createWalletClient,
  getContract,
  http,
  Address,
} from "viem"
```

Ce sont les entités [Viem](https://viem.sh/) dont nous avons besoin, les fonctions et [le type `Address`](https://viem.sh/docs/glossary/types#address). Ce serveur est écrit en [TypeScript](https://www.typescriptlang.org/), qui est une extension de JavaScript qui le rend [fortement typé](https://en.wikipedia.org/wiki/Strong_and_weak_typing).

```typescript
import { privateKeyToAccount } from "viem/accounts"
```

[Cette fonction](https://viem.sh/docs/accounts/privateKey) nous permet de générer les informations du portefeuille, y compris l'adresse, correspondant à une clé privée.

```typescript
import { holesky } from "viem/chains"
```

Pour utiliser une blockchain dans Viem, vous devez importer sa définition. Dans ce cas, nous voulons nous connecter à la blockchain de test [Holesky](https://github.com/eth-clients/holesky).

```typescript
// C'est ainsi que nous ajoutons les définitions dans .env à process.env.
import * as dotenv from "dotenv"
dotenv.config()
```

C'est ainsi que nous lisons `.env` dans l'environnement. Nous en avons besoin pour la clé privée (voir plus loin).

```typescript
const greeterAddress : Address = "0xB8f6460Dc30c44401Be26B0d6eD250873d8a50A6"
const greeterABI = [
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "_greeting",
                "type": "string"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
         .
         .
         .
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "_greeting",
                "type": "string"
            }
        ],
        "name": "setGreeting",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }
] as const
```

Pour utiliser un contrat, nous avons besoin de son adresse et de son [ABI](/glossary/#abi). Nous fournissons les deux ici.

En JavaScript (et donc en TypeScript), vous ne pouvez pas attribuer une nouvelle valeur à une constante, mais vous _pouvez_ modifier l'objet qui y est stocké. En utilisant le suffixe `as const`, nous indiquons à TypeScript que la liste elle-même est constante et ne peut pas être modifiée.

```typescript
const publicClient = createPublicClient({
  chain: holesky,
  transport: http(),
})
```

Créer un [client public](https://viem.sh/docs/clients/public.html) Viem. Les clients publics n'ont pas de clé privée attachée et ne peuvent donc pas envoyer de transactions. Ils peuvent appeler des [fonctions `view`](https://www.tutorialspoint.com/solidity/solidity_view_functions.htm), lire les soldes des comptes, etc.

```typescript
const account = privateKeyToAccount(process.env.PRIVATE_KEY as `0x${string}`)
```

Les variables d'environnement sont disponibles dans [`process.env`](https://www.totaltypescript.com/how-to-strongly-type-process-env). Cependant, TypeScript est fortement typé. Une variable d'environnement peut être n'importe quelle chaîne de caractères, ou vide, donc le type d'une variable d'environnement est `string | undefined`. Cependant, une clé est définie dans Viem comme `0x${string}` (`0x` suivi d'une chaîne de caractères). Ici, nous indiquons à TypeScript que la variable d'environnement `PRIVATE_KEY` sera de ce type. Si ce n'est pas le cas, nous obtiendrons une erreur d'exécution.

La fonction [`privateKeyToAccount`](https://viem.sh/docs/accounts/privateKey) utilise ensuite cette clé privée pour créer un objet de compte complet.

```typescript
const walletClient = createWalletClient({
  account,
  chain: holesky,
  transport: http(),
})
```

Ensuite, nous utilisons l'objet de compte pour créer un [client de portefeuille](https://viem.sh/docs/clients/wallet). Ce client a une clé privée et une adresse, il peut donc être utilisé pour envoyer des transactions.

```typescript
const greeter = getContract({
  address: greeterAddress,
  abi: greeterABI,
  client: { public: publicClient, wallet: walletClient },
})
```

Maintenant que nous avons tous les prérequis, nous pouvons enfin créer une [instance de contrat](https://viem.sh/docs/contract/getContract). Nous utiliserons cette instance de contrat pour communiquer avec le contrat en chaîne.

##### Lecture depuis la blockchain

```typescript
console.log(`Message de bienvenue actuel :`, await greeter.read.greet())
```

Les fonctions de contrat qui sont en lecture seule ([`view`](https://www.tutorialspoint.com/solidity/solidity_view_functions.htm) et [`pure`](https://www.tutorialspoint.com/solidity/solidity_pure_functions.htm)) sont disponibles sous `read`. Dans ce cas, nous l'utilisons pour accéder à la fonction [`greet`](https://eth-holesky.blockscout.com/address/0xB8f6460Dc30c44401Be26B0d6eD250873d8a50A6?tab=read_contract#cfae3217), qui renvoie le message de bienvenue.

JavaScript est monothread, donc lorsque nous lançons un processus de longue durée, nous devons [spécifier que nous le faisons de manière asynchrone](https://eloquentjavascript.net/11_async.html#h-XvLsfAhtsE). L'appel à la blockchain, même pour une opération en lecture seule, nécessite un aller-retour entre l'ordinateur et un nœud de la blockchain. C'est la raison pour laquelle nous spécifions ici que le code doit `await` le résultat.

Si vous êtes intéressé par son fonctionnement, vous pouvez [en lire plus ici](https://www.w3schools.com/js/js_promise.asp), mais en pratique, tout ce que vous devez savoir, c'est que vous devez `await` les résultats si vous lancez une opération qui prend beaucoup de temps, et que toute fonction qui le fait doit être déclarée `async`.

##### Émission de transactions

```typescript
const setGreeting = async (greeting: string): Promise<any> => {
```

C'est la fonction que vous appelez pour émettre une transaction qui modifie le message de bienvenue. Comme il s'agit d'une opération longue, la fonction est déclarée comme `async`. En raison de l'implémentation interne, toute fonction `async` doit retourner un objet `Promise`. Dans ce cas, `Promise<any>` signifie que nous ne spécifions pas ce qui sera exactement retourné dans la `Promise`.

```typescript
const txHash = await greeter.write.setGreeting([greeting])
```

Le champ `write` de l'instance du contrat contient toutes les fonctions qui écrivent dans l'état de la blockchain (celles qui nécessitent l'envoi d'une transaction), telles que [`setGreeting`](https://eth-holesky.blockscout.com/address/0xB8f6460Dc30c44401Be26B0d6eD250873d8a50A6?tab=write_contract#a4136862). Les paramètres, s'il y en a, sont fournis sous forme de liste, et la fonction renvoie le hachage de la transaction.

```typescript
    console.log(`Correction en cours, voir https://eth-holesky.blockscout.com/tx/${txHash}`)

    return txHash
}
```

Signaler le hachage de la transaction (dans le cadre d'une URL vers l'explorateur de blocs pour la visualiser) et le renvoyer.

##### Répondre aux événements

```typescript
greeter.watchEvent.SetGreeting({
```

[La fonction `watchEvent`](https://viem.sh/docs/actions/public/watchEvent) vous permet de spécifier qu'une fonction doit s'exécuter lorsqu'un événement est émis. Si vous ne vous souciez que d'un seul type d'événement (dans ce cas, `SetGreeting`), vous pouvez utiliser cette syntaxe pour vous limiter à ce type d'événement.

```typescript
    onLogs: logs => {
```

La fonction `onLogs` est appelée lorsqu'il y a des entrées de journal. Dans Ethereum, « log » et « événement » sont généralement interchangeables.

```typescript
console.log(
  `L'adresse ${logs[0].args.sender} a changé le message de bienvenue en ${logs[0].args.greeting}`
)
```

Il pourrait y avoir plusieurs événements, mais par souci de simplicité, nous ne nous intéressons qu'au premier. `logs[0].args` sont les arguments de l'événement, dans ce cas `sender` et `greeting`.

```typescript
        if (logs[0].args.sender != account.address)
            setGreeting(`${account.address} insiste pour que ce soit Hello!`)
    }
})
```

Si l'expéditeur n'est _pas_ ce serveur, utilisez `setGreeting` pour changer le message de bienvenue.

#### `package.json` {#package-json}

[Ce fichier](https://github.com/qbzzt/20240715-server-component/blob/main/package.json) contrôle la configuration de [Node.js](https://nodejs.org/en). Cet article n'explique que les définitions importantes.

```json
{
  "main": "dist/index.js",
```

Cette définition spécifie quel fichier JavaScript exécuter.

```json
  "scripts": {
    "start": "tsc && node dist/app.js",
  },
```

Les scripts sont diverses actions de l'application. Dans ce cas, le seul que nous ayons est `start`, qui compile puis exécute le serveur. La commande `tsc` fait partie du package `typescript` et compile TypeScript en JavaScript. Si vous voulez l'exécuter manuellement, il se trouve dans `node_modules/.bin`. La deuxième commande exécute le serveur.

```json
  "type": "module",
```

Il existe plusieurs types d'applications Node JavaScript. Le type `module` nous permet d'avoir `await` dans le code de premier niveau, ce qui est important lorsque vous effectuez des opérations lentes (et donc asynchrones).

```json
  "devDependencies": {
    "@types/node": "^20.14.2",
    "typescript": "^5.4.5"
  },
```

Ce sont des packages qui ne sont requis que pour le développement. Ici, nous avons besoin de `typescript` et comme nous l'utilisons avec Node.js, nous obtenons également les types pour les variables et les objets de Node, tels que `process`. [La notation `^<version>`](https://github.com/npm/node-semver?tab=readme-ov-file#caret-ranges-123-025-004) signifie cette version ou une version supérieure qui n'apporte pas de changements cassants. Voir [ici](https://semver.org) pour plus d'informations sur la signification des numéros de version.

```json
  "dependencies": {
    "dotenv": "^16.4.5",
    "viem": "2.14.1"
  }
}
```

Ce sont des packages qui sont requis à l'exécution, lors de l'exécution de `dist/app.js`.

## Conclusion {#conclusion}

Le serveur centralisé que nous avons créé ici fait son travail, qui est d'agir en tant qu'agent pour un utilisateur. Toute autre personne qui souhaite que la dapp continue de fonctionner et qui est prête à dépenser le gaz peut exécuter une nouvelle instance du serveur avec sa propre adresse.

Cependant, cela ne fonctionne que lorsque les actions du serveur centralisé peuvent être facilement vérifiées. Si le serveur centralisé possède des informations d'état secrètes ou exécute des calculs difficiles, c'est une entité centralisée à laquelle vous devez faire confiance pour utiliser l'application, ce qui est exactement ce que les blockchains essaient d'éviter. Dans un futur article, je prévois de montrer comment utiliser les [preuves à divulgation nulle de connaissance](/zero-knowledge-proofs) pour contourner ce problème.

[Voir ici pour plus de mon travail](https://cryptodocguy.pro/).
