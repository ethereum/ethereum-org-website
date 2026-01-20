---
title: "Construire une interface utilisateur pour votre contrat"
description: "En utilisant des composants modernes tels que TypeScript, React, Vite et Wagmi, nous allons passer en revue une interface utilisateur moderne, mais minimale, et apprendre à connecter un portefeuille à l'interface utilisateur, à appeler un contrat intelligent pour lire des informations, à envoyer une transaction à un contrat intelligent et à surveiller les événements d'un contrat intelligent pour identifier les changements."
author: Ori Pomerantz
tags: [ "typescript", "react", "vite", "wagmi", "frontend" ]
skill: beginner
published: 2023-11-01
lang: fr
sidebarDepth: 3
---

Vous avez trouvé une fonctionnalité dont nous avons besoin dans l'écosystème Ethereum. Vous avez écrit les contrats intelligents pour la mettre en œuvre, et peut-être même du code connexe qui s'exécute hors chaîne. C'est génial ! Malheureusement, sans interface utilisateur, vous n'aurez aucun utilisateur, et la dernière fois que vous avez écrit un site web, les gens utilisaient des modems commutés et JavaScript était nouveau.

Cet article est pour vous. Je suppose que vous connaissez la programmation, et peut-être un peu de JavaScript et de HTML, mais que vos compétences en matière d'interface utilisateur sont rouillées et obsolètes. Ensemble, nous allons passer en revue une application moderne simple pour que vous puissiez voir comment on fait de nos jours.

## Pourquoi est-ce important {#why-important}

En théorie, vous pourriez simplement demander aux gens d'utiliser [Etherscan](https://holesky.etherscan.io/address/0x432d810484add7454ddb3b5311f0ac2e95cecea8#writeContract) ou [Blockscout](https://eth-holesky.blockscout.com/address/0x432d810484AdD7454ddb3b5311f0Ac2E95CeceA8?tab=write_contract) pour interagir avec vos contrats. Ce sera formidable pour les Éthériens expérimentés. Mais nous essayons de servir [un autre milliard de personnes](https://blog.ethereum.org/2021/05/07/ethereum-for-the-next-billion). Cela ne se produira pas sans une excellente expérience utilisateur, et une interface utilisateur conviviale en est une grande partie.

## Application Greeter {#greeter-app}

Il y a beaucoup de théorie derrière le fonctionnement d'une interface utilisateur moderne, et [beaucoup de bons sites](https://react.dev/learn/thinking-in-react) [qui l'expliquent](https://wagmi.sh/core/getting-started). Au lieu de répéter l'excellent travail effectué par ces sites, je vais supposer que vous préférez apprendre par la pratique et commencer par une application avec laquelle vous pouvez jouer. Vous avez encore besoin de la théorie pour faire avancer les choses, et nous y viendrons - nous allons simplement parcourir les fichiers sources un par un, et discuter des choses au fur et à mesure que nous les abordons.

### Installation {#installation}

1. Si nécessaire, ajoutez [la blockchain Holesky](https://chainlist.org/?search=holesky&testnets=true) à votre portefeuille et [obtenez des ETH de test](https://www.holeskyfaucet.io/).

2. Clonez le dépôt GitHub.

   ```sh
   git clone https://github.com/qbzzt/20230801-modern-ui.git
   ```

3. Installez les paquets nécessaires.

   ```sh
   cd 20230801-modern-ui
   pnpm install
   ```

4. Démarrez l'application.

   ```sh
   pnpm dev
   ```

5. Naviguez vers l'URL affichée par l'application. Dans la plupart des cas, c'est [http://localhost:5173/](http://localhost:5173/).

6. Vous pouvez voir le code source du contrat, une version légèrement modifiée du Greeter de Hardhat, [sur un explorateur de blockchain](https://eth-holesky.blockscout.com/address/0x432d810484AdD7454ddb3b5311f0Ac2E95CeceA8?tab=contract).

### Présentation des fichiers {#file-walk-through}

#### `index.html` {#index-html}

Ce fichier est un modèle HTML standard, à l'exception de cette ligne, qui importe le fichier de script.

```html
<script type="module" src="/src/main.tsx"></script>
```

#### `src/main.tsx` {#main-tsx}

L'extension du fichier nous indique que ce fichier est un [composant React](https://www.w3schools.com/react/react_components.asp) écrit en [TypeScript](https://www.typescriptlang.org/), une extension de JavaScript qui prend en charge la [vérification de type](https://en.wikipedia.org/wiki/Type_system#Type_checking). TypeScript est compilé en JavaScript, nous pouvons donc l'utiliser pour l'exécution côté client.

```tsx
import '@rainbow-me/rainbowkit/styles.css'
import { RainbowKitProvider } from '@rainbow-me/rainbowkit'
import * as React from 'react'
import * as ReactDOM from 'react-dom/client'
import { WagmiConfig } from 'wagmi'
import { chains, config } from './wagmi'
```

Importez le code de la bibliothèque dont nous avons besoin.

```tsx
import { App } from './App'
```

Importez le composant React qui met en œuvre l'application (voir ci-dessous).

```tsx
ReactDOM.createRoot(document.getElementById('root')!).render(
```

Créez le composant React racine. Le paramètre de `render` est [JSX](https://www.w3schools.com/react/react_jsx.asp), un langage d'extension qui utilise à la fois HTML et JavaScript/TypeScript. Le point d'exclamation ici indique au composant TypeScript : « vous ne savez pas que `document.getElementById('root')` sera un paramètre valide pour `ReactDOM.createRoot`, mais ne vous inquiétez pas - je suis le développeur et je vous dis qu'il y en aura un ».

```tsx
  <React.StrictMode>
```

L'application se trouve à l'intérieur d'un [composant `React.StrictMode`](https://react.dev/reference/react/StrictMode). Ce composant indique à la bibliothèque React d'insérer des vérifications de débogage supplémentaires, ce qui est utile pendant le développement.

```tsx
    <WagmiConfig config={config}>
```

L'application se trouve également à l'intérieur d'un [composant `WagmiConfig`](https://wagmi.sh/react/api/WagmiProvider). [La bibliothèque wagmi (we are going to make it)](https://wagmi.sh/) connecte les définitions de l'interface utilisateur React avec [la bibliothèque viem](https://viem.sh/) pour l'écriture d'une application décentralisée Ethereum.

```tsx
      <RainbowKitProvider chains={chains}>
```

Et enfin, [un composant `RainbowKitProvider`](https://www.rainbowkit.com/). Ce composant gère la connexion et la communication entre le portefeuille et l'application.

```tsx
        <App />
```

Nous pouvons maintenant avoir le composant pour l'application, qui met réellement en œuvre l'interface utilisateur. Le `/>` à la fin du composant indique à React que ce composant n'a pas de définitions à l'intérieur, conformément à la norme XML.

```tsx
      </RainbowKitProvider>
    </WagmiConfig>
  </React.StrictMode>,
)
```

Bien sûr, nous devons fermer les autres composants.

#### `src/App.tsx` {#app-tsx}

```tsx
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { useAccount } from 'wagmi'
import { Greeter } from './components/Greeter'

export function App() {
```

C'est la manière standard de créer un composant React - définir une fonction qui est appelée chaque fois qu'elle doit être rendue. Cette fonction a généralement du code TypeScript ou JavaScript en haut, suivi d'une instruction `return` qui renvoie le code JSX.

```tsx
  const { isConnected } = useAccount()
```

Ici, nous utilisons [`useAccount`](https://wagmi.sh/react/api/hooks/useAccount) pour vérifier si nous sommes connectés à une blockchain via un portefeuille ou non.

Par convention, dans React, les fonctions appelées `use...` sont des [hooks](https://www.w3schools.com/react/react_hooks.asp) qui renvoient un certain type de données. Lorsque vous utilisez de tels hooks, non seulement votre composant obtient les données, mais lorsque ces données changent, le composant est re-rendu avec les informations mises à jour.

```tsx
  return (
    <>
```

Le JSX d'un composant React _doit_ renvoyer un seul composant. Lorsque nous avons plusieurs composants et que nous n'avons rien qui les englobe « naturellement », nous utilisons un composant vide (`<> ...` </>`) pour en faire un seul composant.

```tsx
      <h1>Greeter</h1>
      <ConnectButton />
```

Nous obtenons [le composant `ConnectButton`](https://www.rainbowkit.com/docs/connect-button) de RainbowKit. Lorsque nous ne sommes pas connectés, il nous donne un bouton `Connect Wallet` qui ouvre une fenêtre modale qui explique les portefeuilles et vous permet de choisir celui que vous utilisez. Lorsque nous sommes connectés, il affiche la blockchain que nous utilisons, l'adresse de notre compte et notre solde d'ETH. Nous pouvons utiliser ces affichages pour changer de réseau ou pour nous déconnecter.

```tsx
      {isConnected && (
```

Lorsque nous devons insérer du JavaScript réel (ou du TypeScript qui sera compilé en JavaScript) dans un JSX, nous utilisons des accolades (`{}`).

La syntaxe `a && b` est un raccourci pour [`a ?` b : a`](https://www.w3schools.com/react/react_es6_ternary.asp). C'est-à-dire que si `a`est vrai, il est évalué à`b`et sinon, il est évalué à`a`(qui peut être`false`, `0`, etc.). C'est un moyen facile d'indiquer à React qu'un composant ne doit être affiché que si une certaine condition est remplie.

Dans ce cas, nous ne voulons montrer à l'utilisateur `Greeter` que si l'utilisateur est connecté à une blockchain.

```tsx
          <Greeter />
      )}
    </>
  )
}
```

#### `src/components/Greeter.tsx` {#greeter-tsx}

Ce fichier contient la plupart des fonctionnalités de l'interface utilisateur. Il inclut des définitions qui seraient normalement dans plusieurs fichiers, mais comme il s'agit d'un tutoriel, le programme est optimisé pour être facile à comprendre la première fois, plutôt que pour la performance ou la facilité de maintenance.

```tsx
import { useState, ChangeEventHandler } from 'react'
import {  useNetwork,
          useReadContract,
          usePrepareContractWrite,
          useContractWrite,
          useContractEvent
        } from 'wagmi'
```

Nous utilisons ces fonctions de bibliothèque. Encore une fois, elles sont expliquées ci-dessous là où elles sont utilisées.

```tsx
import { AddressType } from 'abitype'
```

[La bibliothèque `abitype`](https://abitype.dev/) nous fournit des définitions TypeScript pour divers types de données Ethereum, tels que [`AddressType`](https://abitype.dev/config#addresstype).

```tsx
let greeterABI = [
  .
  .
  .
] as const   // greeterABI
```

L'ABI pour le contrat `Greeter`.
Si vous développez les contrats et l'interface utilisateur en même temps, vous les placez normalement dans le même dépôt et utilisez l'ABI généré par le compilateur Solidity comme fichier dans votre application. Cependant, ce n'est pas nécessaire ici car le contrat est déjà développé et ne va pas changer.

```tsx
type AddressPerBlockchainType = {
  [key: number]: AddressType
}
```

TypeScript est fortement typé. Nous utilisons cette définition pour spécifier l'adresse à laquelle le contrat `Greeter` est déployé sur différentes chaînes. La clé est un nombre (le chainId), et la valeur est un `AddressType` (une adresse).

```tsx
const contractAddrs: AddressPerBlockchainType = {
  // Holesky
  17000: '0x432d810484AdD7454ddb3b5311f0Ac2E95CeceA8',

  // Sepolia
  11155111: '0x7143d5c190F048C8d19fe325b748b081903E3BF0'
}
```

L'adresse du contrat sur les deux réseaux pris en charge : [Holesky](https://eth-holesky.blockscout.com/address/0x432d810484AdD7454ddb3b5311f0Ac2E95CeceA8?tab=contact_code) et [Sepolia](https://eth-sepolia.blockscout.com/address/0x7143d5c190F048C8d19fe325b748b081903E3BF0?tab=contact_code).

Note : Il y a en fait une troisième définition, pour Redstone Holesky, elle sera expliquée ci-dessous.

```tsx
type ShowObjectAttrsType = {
  name: string,
  object: any
}
```

Ce type est utilisé comme paramètre pour le composant `ShowObject` (expliqué plus tard). Il inclut le nom de l'objet et sa valeur, qui sont affichés à des fins de débogage.

```tsx
type ShowGreetingAttrsType = {
  greeting: string | undefined
}
```

À tout moment, nous pouvons soit savoir quel est le message d'accueil (parce que nous l'avons lu sur la blockchain), soit ne pas le savoir (parce que nous ne l'avons pas encore reçu). Il est donc utile d'avoir un type qui peut être soit une chaîne de caractères, soit rien.

##### Composant `Greeter` {#greeter-component}

```tsx
const Greeter = () => {
```

Enfin, nous arrivons à la définition du composant.

```tsx
  const { chain } = useNetwork()
```

Informations sur la chaîne que nous utilisons, gracieuseté de [wagmi](https://wagmi.sh/react/hooks/useNetwork).
Comme il s'agit d'un hook (`use...`), chaque fois que cette information change, le composant est redessiné.

```tsx
  const greeterAddr = chain && contractAddrs[chain.id]
```

L'adresse du contrat Greeter, qui varie selon la chaîne (et qui est `undefined` si nous n'avons pas d'informations sur la chaîne ou si nous sommes sur une chaîne sans ce contrat).

```tsx
  const readResults = useReadContract({
    address: greeterAddr,
    abi: greeterABI,
    functionName: "greet" , // Pas d'arguments
    watch: true
  })
```

[Le hook `useReadContract`](https://wagmi.sh/react/api/hooks/useReadContract) lit les informations d'un contrat. Vous pouvez voir exactement quelles informations il renvoie en développant `readResults` dans l'interface utilisateur. Dans ce cas, nous voulons qu'il continue à chercher afin d'être informés lorsque le message d'accueil change.

**Note :** Nous pourrions écouter les [événements `setGreeting`](https://eth-holesky.blockscout.com/address/0x432d810484AdD7454ddb3b5311f0Ac2E95CeceA8?tab=logs) pour savoir quand le message d'accueil change et le mettre à jour de cette manière. Cependant, bien que cela puisse être plus efficace, cela ne s'appliquera pas dans tous les cas. Lorsque l'utilisateur passe à une chaîne différente, le message d'accueil change également, mais ce changement n'est pas accompagné d'un événement. Nous pourrions avoir une partie du code qui écoute les événements et une autre qui identifie les changements de chaîne, mais ce serait plus compliqué que de simplement définir [le paramètre `watch`](https://wagmi.sh/react/api/hooks/useReadContract#watch-optional).

```tsx
  const [ newGreeting, setNewGreeting ] = useState("")
```

Le [`hook useState` de React](https://www.w3schools.com/react/react_usestate.asp) nous permet de spécifier une variable d'état, dont la valeur persiste d'un rendu du composant à un autre. La valeur initiale est le paramètre, dans ce cas la chaîne vide.

Le hook `useState` renvoie une liste avec deux valeurs :

1. La valeur actuelle de la variable d'état.
2. Une fonction pour modifier la variable d'état si nécessaire. Comme il s'agit d'un hook, chaque fois qu'il est appelé, le composant est à nouveau rendu.

Dans ce cas, nous utilisons une variable d'état pour le nouveau message d'accueil que l'utilisateur veut définir.

```tsx
  const greetingChange : ChangeEventHandler<HTMLInputElement> = (evt) =>
    setNewGreeting(evt.target.value)
```

C'est le gestionnaire d'événements pour le changement du champ de saisie du nouveau message d'accueil. Le type, [`ChangeEventHandler<HTMLInputElement>`](https://react-typescript-cheatsheet.netlify.app/docs/basic/getting-started/forms_and_events/), spécifie qu'il s'agit d'un gestionnaire pour un changement de valeur d'un élément d'entrée HTML. La partie `<HTMLInputElement>` est utilisée car il s'agit d'un [type générique](https://www.w3schools.com/typescript/typescript_basic_generics.php).

```tsx
  const preparedTx = usePrepareContractWrite({
    address: greeterAddr,
    abi: greeterABI,
    functionName: 'setGreeting',
    args: [ newGreeting ]
  })
  const workingTx = useContractWrite(preparedTx.config)
```

Voici le processus pour soumettre une transaction blockchain du point de vue du client :

1. Envoyez la transaction à un nœud de la blockchain en utilisant [`eth_estimateGas`](https://docs.alchemy.com/reference/eth-estimategas).
2. Attendez une réponse du nœud.
3. Lorsque la réponse est reçue, demandez à l'utilisateur de signer la transaction via le portefeuille. Cette étape _doit_ avoir lieu après la réception de la réponse du nœud, car le coût en gaz de la transaction est montré à l'utilisateur avant qu'il ne la signe.
4. Attendez l'approbation de l'utilisateur.
5. Envoyez à nouveau la transaction, cette fois en utilisant [`eth_sendRawTransaction`](https://docs.alchemy.com/reference/eth-sendrawtransaction).

L'étape 2 est susceptible de prendre un temps perceptible, pendant lequel les utilisateurs se demanderaient si leur commande a bien été reçue par l'interface utilisateur et pourquoi on ne leur demande pas déjà de signer la transaction. Cela crée une mauvaise expérience utilisateur (UX).

La solution est d'utiliser des [hooks de préparation](https://wagmi.sh/react/prepare-hooks). Chaque fois qu'un paramètre change, envoyez immédiatement au nœud la requête `eth_estimateGas`. Ensuite, lorsque l'utilisateur veut réellement envoyer la transaction (dans ce cas en appuyant sur **Mettre à jour le message d'accueil**), le coût en gaz est connu et l'utilisateur peut voir la page du portefeuille immédiatement.

```tsx
  return (
```

Nous pouvons maintenant enfin créer le HTML réel à renvoyer.

```tsx
    <>
      <h2>Greeter</h2>
      {
        !readResults.isError && !readResults.isLoading &&
          <ShowGreeting greeting={readResults.data} />
      }
      <hr />
```

Créez le composant `ShowGreeting` (expliqué ci-dessous), mais uniquement si le message d'accueil a été lu avec succès à partir de la blockchain.

```tsx
      <input type="text"
        value={newGreeting}
        onChange={greetingChange}
      />
```

C'est le champ de saisie de texte où l'utilisateur peut définir un nouveau message d'accueil. Chaque fois que l'utilisateur appuie sur une touche, nous appelons `greetingChange` qui appelle `setNewGreeting`. Comme `setNewGreeting` provient du hook `useState`, il provoque un nouveau rendu du composant `Greeter`. Cela signifie que :

- Nous devons spécifier `value` pour conserver la valeur du nouveau message d'accueil, sinon il reviendrait à la valeur par défaut, la chaîne vide.
- `usePrepareContractWrite` est appelé chaque fois que `newGreeting` change, ce qui signifie qu'il aura toujours le dernier `newGreeting` dans la transaction préparée.

```tsx
      <button disabled={!workingTx.write}
              onClick={workingTx.write}
      >
        Mettre à jour le message d'accueil
      </button>
```

S'il n'y a pas de `workingTx.write`, nous attendons toujours les informations nécessaires pour envoyer la mise à jour du message d'accueil, donc le bouton est désactivé. S'il y a une valeur `workingTx.write`, alors c'est la fonction à appeler pour envoyer la transaction.

```tsx
      <hr />
      <ShowObject name="readResults" object={readResults} />
      <ShowObject name="preparedTx" object={preparedTx} />
      <ShowObject name="workingTx" object={workingTx} />
    </>
  )
}
```

Enfin, pour vous aider à voir ce que nous faisons, montrez les trois objets que nous utilisons :

- `readResults`
- `preparedTx`
- `workingTx`

##### Composant `ShowGreeting` {#showgreeting-component}

Ce composant montre

```tsx
const ShowGreeting = (attrs : ShowGreetingAttrsType) => {
```

Une fonction de composant reçoit un paramètre avec tous les attributs du composant.

```tsx
  return <b>{attrs.greeting}</b>
}
```

##### Composant `ShowObject` {#showobject-component}

À titre d'information, nous utilisons le composant `ShowObject` pour montrer les objets importants (`readResults` pour la lecture du message d'accueil et `preparedTx` et `workingTx` pour les transactions que nous créons).

```tsx
const ShowObject = (attrs: ShowObjectAttrsType ) => {
  const keys = Object.keys(attrs.object)
  const funs = keys.filter(k => typeof attrs.object[k] == "function")
  return <>
    <details>
```

Nous ne voulons pas encombrer l'interface utilisateur avec toutes les informations, donc pour permettre de les voir ou de les fermer, nous utilisons une balise [`details`](https://www.w3schools.com/tags/tag_details.asp).

```tsx
      <summary>{attrs.name}</summary>
      <pre>
        {JSON.stringify(attrs.object, null, 2)}
```

La plupart des champs sont affichés en utilisant [`JSON.stringify`](https://www.w3schools.com/js/js_json_stringify.asp).

```tsx
      </pre>
      { funs.length > 0 &&
        <>
          Fonctions :
          <ul>
```

L'exception concerne les fonctions, qui ne font pas partie de [la norme JSON](https://www.json.org/json-en.html), elles doivent donc être affichées séparément.

```tsx
          {funs.map((f, i) =>
```

Dans JSX, le code à l'intérieur des accolades `{` `}` est interprété comme du JavaScript. Ensuite, le code à l'intérieur des parenthèses `( )` est interprété à nouveau comme du JSX.

```tsx
           (<li key={i}>{f}</li>)
                )}
```

React exige que les balises dans [l'arbre DOM](https://www.w3schools.com/js/js_htmldom.asp) aient des identifiants distincts. Cela signifie que les enfants de la même balise (dans ce cas, [la liste non ordonnée](https://www.w3schools.com/tags/tag_ul.asp)), ont besoin d'attributs `key` différents.

```tsx
          </ul>
        </>
      }
    </details>
  </>
}
```

Terminez les différentes balises HTML.

##### L'exportation finale {#the-final-export}

```tsx
export { Greeter }
```

Le composant `Greeter` est celui que nous devons exporter pour l'application.

#### `src/wagmi.ts` {#wagmi-ts}

Enfin, diverses définitions liées à WAGMI se trouvent dans `src/wagmi.ts`. Je ne vais pas tout expliquer ici, car la plupart est du code passe-partout que vous n'aurez probablement pas besoin de changer.

Le code ici n'est pas exactement le même que [sur GitHub](https://github.com/qbzzt/20230801-modern-ui/blob/main/src/wagmi.ts) car plus tard dans l'article, nous ajoutons une autre chaîne ([Redstone Holesky](https://redstone.xyz/docs/network-info)).

```ts
import { getDefaultWallets } from '@rainbow-me/rainbowkit'
import { configureChains, createConfig } from 'wagmi'
import { holesky, sepolia } from 'wagmi/chains'
```

Importez les blockchains que l'application prend en charge. Vous pouvez voir la liste des chaînes prises en charge [dans le GitHub de viem](https://github.com/wagmi-dev/viem/tree/main/src/chains/definitions).

```ts
import { publicProvider } from 'wagmi/providers/public'

const walletConnectProjectId = 'c96e690bb92b6311e8e9b2a6a22df575'
```

Pour pouvoir utiliser [WalletConnect](https://walletconnect.com/), vous avez besoin d'un ID de projet pour votre application. Vous pouvez l'obtenir sur [cloud.walletconnect.com](https://cloud.walletconnect.com/sign-in).

```ts
const { chains, publicClient, webSocketPublicClient } = configureChains(
  [ holesky, sepolia ],
  [
    publicProvider(),
  ],
)

const { connectors } = getDefaultWallets({
  appName: 'My wagmi + RainbowKit App',
  chains,
  projectId: walletConnectProjectId,
})

export const config = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
  webSocketPublicClient,
})

export { chains }
```

### Ajouter une autre blockchain {#add-blockchain}

De nos jours, il existe de nombreuses [solutions de mise à l'échelle de couche 2](/layer-2/), et vous pourriez vouloir en prendre en charge certaines que viem ne prend pas encore en charge. Pour ce faire, vous devez modifier `src/wagmi.ts`. Ces instructions expliquent comment ajouter [Redstone Holesky](https://redstone.xyz/docs/network-info).

1. Importez le type `defineChain` depuis viem.

   ```ts
   import { defineChain } from 'viem'
   ```

2. Ajoutez la définition du réseau.

   ```ts
   const redstoneHolesky = defineChain({
      id: 17_001,
      name: 'Redstone Holesky',
      network: 'redstone-holesky',
      nativeCurrency: {
        decimals: 18,
        name: 'Ether',
        symbol: 'ETH',
      },
      rpcUrls: {
        default: {
          http: ['https://rpc.holesky.redstone.xyz'],
          webSocket: ['wss://rpc.holesky.redstone.xyz/ws'],
      },
      public: {
          http: ['https://rpc.holesky.redstone.xyz'],
          webSocket: ['wss://rpc.holesky.redstone.xyz/ws'],
        },
      },
      blockExplorers: {
        default: { name: 'Explorer', url: 'https://explorer.holesky.redstone.xyz' },
      },
   })
   ```

3. Ajoutez la nouvelle chaîne à l'appel `configureChains`.

   ```ts
    const { chains, publicClient, webSocketPublicClient } = configureChains(
      [ holesky, sepolia, redstoneHolesky ],
      [ publicProvider(), ],
    )
   ```

4. Assurez-vous que l'application connaît l'adresse de vos contrats sur le nouveau réseau. Dans ce cas, nous modifions `src/components/Greeter.tsx` :

    ```ts
    const contractAddrs : AddressPerBlockchainType = {
      // Holesky
      17000: '0x432d810484AdD7454ddb3b5311f0Ac2E95CeceA8',
    
      // Redstone Holesky
      17001: '0x4919517f82a1B89a32392E1BF72ec827ba9986D3',
    
      // Sepolia
      11155111: '0x7143d5c190F048C8d19fe325b748b081903E3BF0'
    }
    ```

## Conclusion {#conclusion}

Bien sûr, vous ne vous souciez pas vraiment de fournir une interface utilisateur pour `Greeter`. Vous voulez créer une interface utilisateur pour vos propres contrats. Pour créer votre propre application, suivez ces étapes :

1. Spécifiez la création d'une application wagmi.

   ```sh copy
   pnpm create wagmi
   ```

2. Nommez l'application.

3. Sélectionnez le framework **React**.

4. Sélectionnez la variante **Vite**.

5. Vous pouvez [ajouter le kit Rainbow](https://www.rainbowkit.com/docs/installation#manual-setup).

Maintenant, allez rendre vos contrats utilisables pour le monde entier.

[Voir ici pour plus de mon travail](https://cryptodocguy.pro/).

