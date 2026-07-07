---
title: "Créer une interface utilisateur pour votre contrat"
description: "En utilisant des composants modernes tels que TypeScript, React, Vite et Wagmi, nous allons examiner une interface utilisateur moderne, mais minimale, et apprendre à connecter un portefeuille à l'interface utilisateur, appeler un contrat intelligent pour lire des informations, envoyer une transaction à un contrat intelligent et surveiller les événements d'un contrat intelligent pour identifier les changements."
author: Ori Pomerantz
tags: ["TypeScript", "React", "Vite", "Wagmi", "frontend"]
skill: beginner
breadcrumb: Interface utilisateur avec WAGMI
published: 2023-11-01
lang: fr
sidebarDepth: 3
---

Vous avez trouvé une fonctionnalité dont nous avons besoin dans l'écosystème Ethereum. Vous avez écrit les contrats intelligents pour la mettre en œuvre, et peut-être même du code connexe qui s'exécute hors chaîne. C'est génial ! Malheureusement, sans interface utilisateur, vous n'aurez aucun utilisateur, et la dernière fois que vous avez créé un site web, les gens utilisaient des modems bas débit et JavaScript était nouveau.

Cet article est pour vous. Je suppose que vous connaissez la programmation, et peut-être un peu de JavaScript et de HTML, mais que vos compétences en matière d'interface utilisateur sont rouillées et dépassées. Ensemble, nous allons examiner une application moderne simple pour que vous voyiez comment cela se fait de nos jours.

## Pourquoi est-ce important {#why-important}

En théorie, vous pourriez simplement demander aux gens d'utiliser [Etherscan](https://sepolia.etherscan.io/address/0xC87506C66c7896366b9E988FE0aA5B6dDE77CFfA#readContract) ou [Blockscout](https://eth-sepolia.blockscout.com/address/0xC87506C66c7896366b9E988FE0aA5B6dDE77CFfA?tab=read_write_contract) pour interagir avec vos contrats. C'est très bien pour les Ethereans expérimentés. Mais nous essayons de servir [un milliard de personnes supplémentaires](https://blog.ethereum.org/2021/05/07/ethereum-for-the-next-billion). Cela ne se produira pas sans une excellente expérience utilisateur, et une interface utilisateur conviviale en est une grande partie.

## Application Greeter {#greeter-app}

Il y a beaucoup de théorie derrière le fonctionnement des interfaces utilisateur modernes, et [beaucoup de bons sites](https://react.dev/learn/thinking-in-react) [qui l'expliquent](https://wagmi.sh/core/getting-started). Au lieu de répéter l'excellent travail accompli par ces sites, je vais supposer que vous préférez apprendre par la pratique et commencer par une application avec laquelle vous pouvez jouer. Vous avez toujours besoin de la théorie pour faire les choses, et nous y viendrons - nous allons simplement parcourir les fichiers sources un par un, et discuter des choses au fur et à mesure que nous les rencontrons.

### Installation {#installation}

1. L'application utilise le réseau de test [Sepolia](https://sepolia.dev/). Si nécessaire, [obtenez des ETH de test Sepolia](/developers/docs/networks/#sepolia) et [ajoutez Sepolia à votre portefeuille](https://chainlist.org/chain/11155111).

2. Clonez le dépôt GitHub et installez les paquets nécessaires.

   ```sh
   git clone https://github.com/qbzzt/260301-modern-ui-web3.git
   cd 260301-modern-ui-web3
   npm install
   ```

3. L'application utilise des points d'accès gratuits, qui ont des limites de performance. Si vous souhaitez utiliser un fournisseur de [nœud en tant que service](/developers/docs/nodes-and-clients/nodes-as-a-service/), remplacez les URL dans [`src/wagmi.ts`](#wagmi-ts).

4. Démarrez l'application.

   ```sh
   npm run dev
   ```

5. Naviguez vers l'URL affichée par l'application. Dans la plupart des cas, il s'agit de [http://localhost:5173/](http://localhost:5173/).

6. Vous pouvez voir le code source du contrat, une version modifiée du Greeter de Hardhat, [sur un explorateur de chaîne de blocs](https://eth-sepolia.blockscout.com/address/0xC87506C66c7896366b9E988FE0aA5B6dDE77CFfA?tab=contract_code).

### Parcours des fichiers {#file-walk-through}

#### `index.html` {#index-html}

Ce fichier est un modèle HTML standard, à l'exception de cette ligne, qui importe le fichier de script.

```html
<script type="module" src="/src/main.tsx"></script>
```

#### `src/main.tsx` {#main-tsx}

L'extension de fichier indique qu'il s'agit d'un [composant React](https://www.w3schools.com/react/react_components.asp) écrit en [TypeScript](https://www.typescriptlang.org/), une extension de JavaScript qui prend en charge la [vérification de type](https://en.wikipedia.org/wiki/Type_system#Type_checking). TypeScript est compilé en JavaScript, nous pouvons donc l'utiliser côté client.

Ce fichier est principalement expliqué au cas où vous seriez intéressé. Habituellement, vous ne modifiez pas ce fichier, mais plutôt [`src/App.tsx`](#app-tsx) et les fichiers qu'il importe.

```tsx
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { WagmiProvider } from 'wagmi'
```

Importez le code de la bibliothèque dont nous avons besoin.

```tsx
import App from './App.tsx'
```

Importez le composant React qui implémente l'application (voir ci-dessous).

```tsx
import { config } from './wagmi.ts'
```

Importez la configuration [wagmi](https://wagmi.sh/), qui inclut la configuration de la chaîne de blocs.

```tsx
const queryClient = new QueryClient()
```

Crée une nouvelle instance du gestionnaire de cache de [React Query](https://tanstack.com/query/latest/docs/framework/react/overview). Cet objet stockera :

- Les appels RPC mis en cache
- Les lectures de contrat
- L'état de récupération en arrière-plan

Nous avons besoin du gestionnaire de cache car wagmi v3 utilise React Query en interne.

```tsx
ReactDOM.createRoot(document.getElementById('root')!).render(
```

Créez le composant React racine. Le paramètre de `render` est [JSX](https://www.w3schools.com/react/react_jsx.asp), un langage d'extension qui utilise à la fois HTML et JavaScript/TypeScript. Le point d'exclamation ici indique au composant TypeScript : « tu ne sais pas que `document.getElementById('root')` sera un paramètre valide pour `ReactDOM.createRoot`, mais ne t'inquiète pas - je suis le développeur et je te dis qu'il y en aura un ».

```tsx
  <React.StrictMode>
```

L'application va à l'intérieur d'[un composant `React.StrictMode`](https://react.dev/reference/react/StrictMode). Ce composant indique à la bibliothèque React d'insérer des vérifications de débogage supplémentaires, ce qui est utile pendant le développement.

```tsx
    <WagmiProvider config={config}>
```

L'application est également à l'intérieur d'[un composant `WagmiProvider`](https://wagmi.sh/react/api/WagmiProvider). [La bibliothèque wagmi (que nous allons créer)](https://wagmi.sh/) connecte les définitions de l'interface utilisateur React avec [la bibliothèque viem](https://viem.sh/) pour écrire une application décentralisée Ethereum.

```tsx
      <QueryClientProvider client={queryClient}>
```

Et enfin, ajoutez un fournisseur React Query pour que tout composant de l'application puisse utiliser les requêtes mises en cache.

```tsx
        <App />
```

Maintenant, nous pouvons avoir le composant pour l'application, qui implémente réellement l'interface utilisateur. Le `/>` à la fin du composant indique à React que ce composant n'a aucune définition à l'intérieur, conformément à la norme XML.

```tsx
      </QueryClientProvider>
    </WagmiProvider>
  </React.StrictMode>,
)
```

Bien sûr, nous devons fermer les autres composants.

#### `src/App.tsx` {#app-tsx}

```tsx
import {
  useConnect,
  useConnection,
  useDisconnect,
  useSwitchChain
} from 'wagmi'

import { useEffect } from 'react'
import { Greeter } from './Greeter'
```

Importez les bibliothèques dont nous avons besoin, ainsi que [le composant `Greeter`](#greeter-tsx).

```tsx
const SEPOLIA_CHAIN_ID = 11155111
```

L'ID de la chaîne Sepolia.

```
function App() {
```

C'est la manière standard de créer un composant React : définir une fonction qui est appelée chaque fois qu'elle doit être rendue. Cette fonction contient généralement du code TypeScript ou JavaScript, suivi d'une instruction `return` qui renvoie le code JSX.

```tsx
  const connection = useConnection()
```

Utilisez [`useConnection`](https://wagmi.sh/react/api/hooks/useConnection) pour obtenir des informations relatives à la connexion actuelle, telles que l'adresse et `chainId`.

Par convention, dans React, les fonctions appelées `use...` sont des [hooks](https://www.w3schools.com/react/react_hooks.asp). Ces fonctions ne se contentent pas de renvoyer des données au composant ; elles s'assurent également qu'il est rendu à nouveau (la fonction du composant est exécutée à nouveau, et sa sortie remplace la précédente dans le HTML) lorsque ces données changent.

```tsx
  const { connectors, connect, status, error } = useConnect()
```

Utilisez [`useConnect`](https://wagmi.sh/react/api/hooks/useConnect) pour obtenir des informations sur la connexion du portefeuille.

```tsx
  const { disconnect } = useDisconnect()
```

[Ce hook](https://wagmi.sh/react/api/hooks/useDisconnect) nous donne la fonction pour nous déconnecter du portefeuille.

```tsx
  const { switchChain } = useSwitchChain()
```

[Ce hook](https://wagmi.sh/react/api/hooks/useSwitchChain) nous permet de changer de chaîne.

```tsx
  useEffect(() => {
```

Le hook React [`useEffect`](https://react.dev/reference/react/useEffect) vous permet d'exécuter une fonction chaque fois que la valeur d'une variable change pour synchroniser un système externe.

```tsx
    if (connection.status === 'connected' &&
        connection.chainId !== SEPOLIA_CHAIN_ID
    ) {
      switchChain({ chainId: SEPOLIA_CHAIN_ID })
    }
```

Si nous sommes connectés, mais pas à la chaîne de blocs Sepolia, passez à Sepolia.

```tsx
  }, [connection.status, connection.chainId])
```

Réexécutez la fonction chaque fois que l'état de la connexion ou le chainId de la connexion change.

```tsx
  return (
    <>
```

Le JSX d'un composant React _doit_ renvoyer un seul composant HTML. Lorsque nous avons plusieurs composants et que nous n'avons pas besoin d'un conteneur pour les envelopper tous, nous utilisons un composant vide (`<> ... </>`) pour les combiner en un seul composant.

```tsx
      <h2>Connection</h2>
      <div>
        status: {connection.status}
        <br />
        addresses: {JSON.stringify(connection.addresses)}
        <br />
        chainId: {connection.chainId}
 
</div>
```

Fournissez des informations sur la connexion actuelle. Dans JSX, `{<expression>}` signifie évaluer l'expression en tant que JavaScript.

```tsx
      {connection.status === 'connected' && (
```

La syntaxe `{<condition> && <value>} means "if the condition is `true`, evaluate to the value; if it isn't, evaluate to `false`».

C'est la manière standard de mettre des instructions if à l'intérieur de JSX.

```tsx
        <div>
          <Greeter />
          <hr />
```

JSX suit la norme XML, qui est plus stricte que HTML. Si une balise n'a pas de balise de fin correspondante, elle _doit_ avoir une barre oblique (`/`) à la fin pour la terminer.

Ici, nous avons deux de ces balises, `<Greeter />` (qui contient en fait le code HTML qui communique avec le contrat) et [`<hr />` pour une ligne horizontale](https://www.w3schools.com/tags/tag_hr.asp).

```tsx
          <button type="button" onClick={disconnect}>
            Disconnect
          </button>
 
</div>
      )}
```

Si l'utilisateur clique sur ce bouton, appelez la fonction `disconnect`.

```tsx
      {connection.status !== 'connected' && (
```

Si nous ne sommes _pas_ connectés, affichez les options nécessaires pour se connecter au portefeuille.

```tsx
        <div>
          <h2>Connect</h2>
          {connectors.map((connector) => (
```

Dans `connectors`, nous avons une liste de connecteurs. Nous utilisons [`map`](https://www.w3schools.com/jsref/jsref_map.asp) pour la transformer en une liste de boutons JSX à afficher.

```tsx
            <button
              key={connector.uid}
```

Dans JSX, il est nécessaire que les balises « sœurs » (balises qui descendent du même parent) aient des identifiants différents.

```tsx
              onClick={() => connect({ connector })}
              type="button"
            >
              {connector.name}
            </button>
          ))}
```

Les boutons de connecteur.

```tsx
          <div>{status}</div>
          <div>{error?.message}</div>
 
</div>
      )}
```

Fournissez des informations supplémentaires. La syntaxe d'expression `<variable>?.<field>` indique à JavaScript que si la variable est définie, il faut évaluer ce champ. Si la variable n'est pas définie, alors cette expression est évaluée à `undefined`.

L'expression `error.message`, lorsqu'il n'y a pas d'erreur, lèverait une exception. L'utilisation de `error?.message` nous permet d'éviter ce problème.

#### `src/Greeter.tsx` {#greeter-tsx}

Ce fichier contient la plupart des fonctionnalités de l'interface utilisateur. Il inclut des définitions qui se trouveraient normalement dans plusieurs fichiers, mais comme il s'agit d'un tutoriel, le programme est optimisé pour être facile à comprendre la première fois, plutôt que pour les performances ou la facilité de maintenance.

```tsx
import {
          useState,
          useEffect,
       } from 'react'
import {  useChainId,
          useAccount,
          useReadContract,
          useWriteContract,
          useWatchContractEvent,
          useSimulateContract
       } from 'wagmi'
```

Nous utilisons ces fonctions de bibliothèque. Encore une fois, elles sont expliquées ci-dessous là où elles sont utilisées.

```tsx
import { AddressType } from 'abitype'
```

[La bibliothèque `abitype`](https://abitype.dev/) nous fournit des définitions TypeScript pour divers types de données Ethereum, tels que [`AddressType`](https://abitype.dev/config#addresstype).

```tsx
let greeterABI = [
  { "type": "function", "name": "greet", ... },
  { "type": "function", "name": "setGreeting", ... },
  { "type": "event", "name": "SetGreeting", ... },
] as const   // greeterABI
```

L'ABI pour le contrat `Greeter`.
Si vous développez les contrats et l'interface utilisateur en même temps, vous les mettriez normalement dans le même dépôt et utiliseriez l'ABI générée par le compilateur Solidity comme fichier dans votre application. Cependant, ce n'est pas nécessaire ici car le contrat est déjà développé et ne changera pas.

Nous utilisons [`as const`](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-4.html#const-assertions) pour indiquer à TypeScript qu'il s'agit d'une _vraie_ constante. Normalement, lorsque vous spécifiez en JavaScript `const x = {"a": 1}`, vous pouvez modifier la valeur dans `x`, vous ne pouvez simplement pas lui faire d'affectation.

```tsx
type AddressPerBlockchainType = {
  [key: number]: AddressType
}
```

TypeScript est fortement typé. Nous utilisons cette définition pour spécifier l'adresse où le contrat `Greeter` est déployé sur différentes chaînes. La clé est un nombre (le chainId), et la valeur est une `AddressType` (une adresse).

```tsx
const contractAddrs : AddressPerBlockchainType = {
  // Sepolia
    11155111: '0xC87506C66c7896366b9E988FE0aA5B6dDE77CFfA'
}
```

L'adresse du contrat sur [Sepolia](https://eth-sepolia.blockscout.com/address/0xC87506C66c7896366b9E988FE0aA5B6dDE77CFfA?tab=contract).

##### Composant `Timer` {#timer-component}

Le composant `Timer` affiche le nombre de secondes écoulées depuis un moment donné. C'est important pour des raisons d'utilisabilité. Lorsque les utilisateurs font quelque chose, ils s'attendent à une réaction immédiate. Dans les chaînes de blocs, c'est souvent impossible car rien ne se passe tant qu'une transaction n'est pas placée dans un bloc. Une solution consiste à afficher le temps écoulé depuis que l'utilisateur a effectué l'action, afin que l'utilisateur puisse décider si le temps requis est raisonnable.

```tsx
type TimerProps = {
  lastUpdate: Date
}
```

Le composant `Timer` prend un paramètre, `lastUpdate`, qui est l'heure de la dernière action.

```tsx
const Timer = ({ lastUpdate }: TimerProps) => {
  const [_, setNow] = useState(new Date())
```

Nous devons avoir un état (une variable liée au composant) et le mettre à jour pour que le composant fonctionne correctement. Mais nous n'avons jamais besoin de le lire, alors ne vous embêtez pas à créer une variable.

```tsx
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(id)
  }, [])
```

La fonction [`setInterval`](https://www.w3schools.com/jsref/met_win_setinterval.asp) nous permet de planifier l'exécution périodique d'une fonction. Dans ce cas, chaque seconde. La fonction appelle `setNow` pour mettre à jour l'état, de sorte que le composant `Timer` sera rendu à nouveau. Nous enveloppons cela dans [`useEffect`](https://react.dev/reference/react/useEffect) avec une liste de dépendances vide pour que cela ne se produise qu'une seule fois, plutôt qu'à chaque fois que le composant est rendu.

```tsx
  const secondsSinceUpdate = Math.floor(
    (Date.now() - lastUpdate.getTime()) / 1000
  )

  return (
    <span>{secondsSinceUpdate} seconds ago</span>
  )
}
```

Calculez le nombre de secondes depuis la dernière mise à jour et renvoyez-le.

##### Composant `Greeter` {#greeter-component}

```tsx
const Greeter = () => {
```

Enfin, nous arrivons à la définition du composant.

```tsx
  const chainId = useChainId()
  const account = useAccount()
```

Informations sur la chaîne et le compte que nous utilisons, grâce à [wagmi](https://wagmi.sh/). Comme il s'agit d'un hook (`use...`), le composant est rendu à nouveau chaque fois que ces informations changent.

```tsx
  const greeterAddr = chainId && contractAddrs[chainId] 
```

L'adresse du contrat Greeter, qui est `undefined` si nous n'avons pas d'informations sur la chaîne, ou si nous sommes sur une chaîne sans ce contrat.

```tsx
  const readResults = useReadContract({
    address: greeterAddr,
    abi: greeterABI,
    functionName: "greet", // Aucun argument
  })
```

[Le hook `useReadContract`](https://wagmi.sh/react/api/hooks/useReadContract) appelle la fonction `greet` [du contrat](https://eth-sepolia.blockscout.com/address/0xC87506C66c7896366b9E988FE0aA5B6dDE77CFfA?tab=contract).

```tsx
  const [ currentGreeting, setCurrentGreeting ] = 
    useState("Please wait while we fetch the greeting from the blockchain...")
  const [ newGreeting, setNewGreeting ] = useState("")
```

Le [hook `useState`](https://www.w3schools.com/react/react_usestate.asp) de React nous permet de spécifier une variable d'état, dont la valeur persiste d'un rendu du composant à l'autre. La valeur initiale est le paramètre, dans ce cas la chaîne vide.

Le hook `useState` renvoie une liste avec deux valeurs :

1. La valeur actuelle de la variable d'état.
2. Une fonction pour modifier la variable d'état en cas de besoin. Comme il s'agit d'un hook, chaque fois qu'il est appelé, le composant est rendu à nouveau.

Dans ce cas, nous utilisons une variable d'état pour la nouvelle salutation que l'utilisateur souhaite définir.

```tsx
  const [ lastSetterAddress, setLastSetterAddress ] = useState("")
```

Si plusieurs utilisateurs utilisent le même contrat en même temps, ils pourraient écraser les salutations des uns et des autres. Cela donnerait l'impression aux utilisateurs que l'application fonctionne mal. Si l'application affiche qui a défini la salutation en dernier, l'utilisateur saura que c'était quelqu'un d'autre et que l'application fonctionne correctement.

```tsx
  const [ status, setStatus ] = useState("")
  const [ statusTime, setStatusTime ] = useState(new Date())
```

Les utilisateurs aiment voir que leurs actions ont un effet immédiat. Cependant, sur une chaîne de blocs, ce n'est pas le cas. Ces variables d'état nous permettent au moins d'afficher quelque chose aux utilisateurs pour qu'ils sachent que leur action est en cours.

```tsx
  useEffect(() => {
    if (readResults.data) {
      setCurrentGreeting(readResults.data)
      setStatus("Greeting fetched from blockchain")
    }
  }, [readResults.data])
```

Si `readResults` ci-dessus modifie les données et qu'elles ne sont pas définies sur une valeur fausse (`undefined`, par exemple), mettez à jour la salutation actuelle avec celle lue sur la chaîne de blocs. Mettez également à jour le statut.

```tsx
  useWatchContractEvent({
    address: greeterAddr,
    abi: greeterABI,
    eventName: 'SetGreeting',
    chainId,
```

Écoutez les événements `SetGreeting`.

```tsx
    enabled: !!greeterAddr,
```

`!!<value>` signifie que si la valeur est `false`, ou une valeur qui est évaluée comme fausse, telle que `undefined`, `0`, ou une chaîne vide, l'expression globale est `false`. Pour toute autre valeur, c'est `true`. C'est un moyen de convertir des valeurs en booléens, car s'il n'y a pas de `greeterAddr`, nous ne voulons pas écouter les événements.

```tsx
    onLogs: logs => {
      const greetingFromContract = logs[0].args.greeting
      setCurrentGreeting(greetingFromContract)
      setLastSetterAddress(logs[0].args.sender)
      updateStatus("Greeting updated by event")
    },
  })
```

Lorsque nous voyons des journaux (ce qui arrive lorsque nous voyons un nouvel événement), cela signifie que la salutation a été modifiée. Dans ce cas, nous pouvons mettre à jour `currentGreeting` et `lastSetterAddress` avec les nouvelles valeurs. De plus, nous voulons mettre à jour l'affichage du statut.

```tsx
  const updateStatus = (newStatus: string) => {
    setStatus(newStatus)
    setStatusTime(new Date())
  }
```

Lorsque nous mettons à jour le statut, nous voulons faire deux choses :

1. Mettre à jour la chaîne de statut (`status`)
2. Mettre à jour l'heure de la dernière mise à jour du statut (`statusTime`) à maintenant.

```tsx
  const greetingChange = (evt) =>
    setNewGreeting(evt.target.value)
```

Ceci est le gestionnaire d'événements pour les modifications du champ de saisie de la nouvelle salutation. Nous pourrions spécifier le type du paramètre `evt`, mais TypeScript est un langage à typage optionnel. Comme cette fonction n'est appelée qu'une seule fois, dans un gestionnaire d'événements HTML, je ne pense pas que ce soit nécessaire.

```tsx
  const { writeContractAsync } = useWriteContract()
```

La fonction pour écrire dans un contrat. Elle est similaire à [`writeContracts`](https://wagmi.sh/core/api/actions/writeContracts#writecontracts), mais permet de meilleures mises à jour de statut.

```tsx
  const simulation = useSimulateContract({
    address: greeterAddr,
    abi: greeterABI,
    functionName: 'setGreeting',
    args: [newGreeting],
    account: account.address    
  })
```

Voici le processus pour soumettre une transaction sur la chaîne de blocs du point de vue du client :

1. Envoyer la transaction à un nœud de la chaîne de blocs en utilisant [`eth_estimateGas`](https://docs.alchemy.com/reference/eth-estimategas).
2. Attendre une réponse du nœud.
3. Lorsque la réponse est reçue, demander à l'utilisateur de signer la transaction via le portefeuille. Cette étape _doit_ avoir lieu après la réception de la réponse du nœud car le coût en gaz de la transaction est affiché à l'utilisateur avant qu'il ne la signe.
4. Attendre que l'utilisateur approuve.
5. Envoyer à nouveau la transaction, cette fois en utilisant [`eth_sendRawTransaction`](https://docs.alchemy.com/reference/eth-sendrawtransaction).

L'étape 2 est susceptible de prendre un temps perceptible, pendant lequel les utilisateurs peuvent se demander si leur commande a été reçue par l'interface utilisateur et pourquoi on ne leur demande pas encore de signer la transaction. Cela crée une mauvaise expérience utilisateur (UX).

Une solution consiste à envoyer `eth_estimateGas` chaque fois qu'un paramètre change. Ensuite, lorsque l'utilisateur souhaite réellement envoyer la transaction (dans ce cas en appuyant sur **Update greeting**), le coût en gaz est connu, et l'utilisateur peut voir la page du portefeuille immédiatement.

```tsx
  return (
```

Maintenant, nous pouvons enfin créer le code HTML réel à renvoyer.

```tsx
    <>
      <h2>Greeter</h2>
      {currentGreeting}
```

Afficher la salutation actuelle.

```tsx
      {lastSetterAddress && (
        <p>Last updated by {
          lastSetterAddress === account.address ? "you" : lastSetterAddress
        }</p>
      )}
```

Si nous savons qui a défini la salutation en dernier, affichez cette information. `Greeter` ne garde pas trace de cette information, et nous ne voulons pas chercher en arrière les événements `SetGreeting`, donc nous ne l'obtenons qu'une fois que la salutation est modifiée pendant que nous sommes en cours d'exécution.

```tsx
      <hr />      
      <input type="text"
        value={newGreeting}
        onChange={greetingChange}
      />      
      <br />
```

Ceci est le champ de texte de saisie où l'utilisateur peut définir une nouvelle salutation. Chaque fois que l'utilisateur appuie sur une touche, nous appelons `greetingChange`, qui appelle `setNewGreeting`. Puisque `setNewGreeting` provient de `useState`, cela provoque le rendu à nouveau du composant `Greeter`. Cela signifie que :

- Nous devons spécifier `value` pour conserver la valeur de la nouvelle salutation, car sinon elle reviendrait à la valeur par défaut, la chaîne vide.
- `simulation` est également mis à jour chaque fois que `newGreeting` change, ce qui signifie que nous obtiendrons une simulation avec la salutation correcte. Cela pourrait être pertinent car le coût en gaz dépend de la taille des données d'appel, qui dépend de la longueur de la chaîne.

```tsx
      <button disabled={!simulation.data}
```

N'activez le bouton qu'une fois que nous avons les informations dont nous avons besoin pour envoyer la transaction.

```tsx
        onClick={async () => {
          updateStatus("Please confirm in wallet...")
```

Mettez à jour le statut. À ce stade, l'utilisateur doit confirmer dans le portefeuille.

```tsx
          await writeContractAsync(simulation.data.request)
          updateStatus("Transaction sent, waiting for greeting to change...")
        }}
      >
        Update greeting
      </button>

```

`writeContractAsync` ne revient qu'après l'envoi effectif de la transaction. Cela nous permet de montrer à l'utilisateur depuis combien de temps la transaction attend d'être incluse dans la chaîne de blocs.

```tsx
      <h4>Status: {status}</h4>
      <p>Updated <Timer lastUpdate={statusTime} /> </p>
    </>
  )
}
```

Affichez le statut et le temps écoulé depuis sa mise à jour.

```
export {Greeter}
```

Exportez le composant.

#### `src/wagmi.ts` {#wagmi-ts}

Enfin, diverses définitions liées à wagmi se trouvent dans `src/wagmi.ts`. Je ne vais pas tout expliquer ici, car la plupart de ces éléments sont des modèles que vous n'aurez probablement pas besoin de modifier.

```ts
import { http, webSocket, createConfig, fallback } from 'wagmi'
import { sepolia } from 'wagmi/chains'
import { injected } from 'wagmi/connectors'

export const config = createConfig({
  chains: [sepolia],
```

La configuration wagmi inclut les chaînes prises en charge par cette application. Vous pouvez voir la [liste des chaînes disponibles](https://wagmi.sh/core/api/chains).

```ts
  connectors: [
    injected(),
  ],
```

[Ce connecteur](https://wagmi.sh/core/api/connectors/injected) nous permet de communiquer avec un portefeuille installé dans le navigateur.

```ts
  transports: {
    [sepolia.id]: http()
```

Le point de terminaison HTTP par défaut fourni avec Viem est suffisant. Si nous voulons une URL différente, nous pouvons utiliser `http("https:// hostname ")` ou `webSocket("wss:// hostname ")`.

```ts
  },
  multiInjectedProviderDiscovery: false,
})
```

## Ajouter une autre chaîne de blocs {#add-blockchain}

De nos jours, il existe de nombreuses [solutions de mise à l'échelle L2](https://ethereum.org/layer-2/), et vous pourriez vouloir en prendre en charge certaines que viem ne prend pas encore en charge. Pour ce faire, vous modifiez `src/wagmi.ts`. Ces instructions expliquent comment ajouter [Optimism Sepolia](https://chainlist.org/chain/11155420).

1.  Modifiez `src/wagmi.ts`

    A. Importez le type `defineChain` depuis viem.

          ```ts
          import { defineChain } from 'viem'
          ```

    B. Ajoutez la définition du réseau. Vous n'avez pas vraiment besoin de le faire pour Optimism Sepolia, [il est déjà dans `viem`](https://github.com/wevm/viem/blob/main/src/chains/definitions/optimismSepolia.ts), mais de cette façon, vous apprenez comment ajouter une chaîne de blocs qui n'est pas dans `viem`.

          ```ts
          const optimismSepolia = defineChain({
              id: 11_155_420,
              name: 'OP Sepolia',
              nativeCurrency: { name: 'Sepolia Ether', symbol: 'ETH', decimals: 18 },
              rpcUrls: {
                default: {
                  http: ['https://sepolia.optimism.io'],
                  webSocket: ['wss://optimism-sepolia.drpc.org'],
                },
              },
              blockExplorers: {
                default: {
                  name: 'Blockscout',
                  url: 'https://optimism-sepolia.blockscout.com',
                  apiUrl: 'https://optimism-sepolia.blockscout.com/api',
                }
              },
          })
          ```

    C. Ajoutez la nouvelle chaîne à l'appel `createConfig`.

          ```ts
          export const config = createConfig({
            chains: [sepolia, optimismSepolia],
            connectors: [
              injected(),
            ],
            transports: {
              [optimismSepolia.id]: http(),
              [sepolia.id]: http()
            },
            multiInjectedProviderDiscovery: false,
          })
          ```

2.  Modifiez `src/App.tsx` pour commenter le passage automatique à Sepolia. Sur un système de production, vous afficheriez probablement des boutons avec des liens vers chacune des chaînes de blocs que vous prenez en charge.

    ```ts
    /*
    useEffect(() => {
      if (connection.status === 'connected' &&
          connection.chainId !== SEPOLIA_CHAIN_ID
      ) {
        switchChain({ chainId: SEPOLIA_CHAIN_ID })
      }
    }, [connection.status, connection.chainId])
    */
    ```

3.  Modifiez `src/Greeter.tsx` pour vous assurer que l'application connaît l'adresse de vos contrats sur le nouveau réseau.

    ```ts
    const contractAddrs: AddressPerBlockchainType = {
      // Optimism Sepolia
      11155420: "0x4dd85791923E9294E934271522f63875EAe5806f",

      // Sepolia
      11155111: "0x7143d5c190F048C8d19fe325b748b081903E3BF0",
    }
    ```

4.  Dans votre navigateur.

    A. Naviguez vers [ChainList](https://chainlist.org/chain/11155420?testnets=true) et cliquez sur l'un des boutons sur le côté droit du tableau pour ajouter la chaîne à votre portefeuille.

    B. Dans l'application, **Disconnect** (Déconnecter) puis reconnectez-vous pour changer de chaîne de blocs. Il existe de meilleures façons de gérer cela, mais elles nécessiteraient des modifications de l'application.

## Conclusion {#conclusion}

Bien sûr, vous ne vous souciez pas vraiment de fournir une interface utilisateur pour `Greeter`. Vous voulez créer une interface utilisateur pour vos propres contrats. Pour créer votre propre application, exécutez ces étapes :

1. Spécifiez de créer une application wagmi.

   ```sh copy
   npm create wagmi
   ```

2. Tapez `y` pour continuer.

3. Nommez l'application.

4. Sélectionnez le framework **React**.

5. Sélectionnez la variante **Vite**.

Maintenant, allez-y et rendez vos contrats utilisables pour le monde entier.

[Voir ici pour plus de mon travail](https://cryptodocguy.pro/).