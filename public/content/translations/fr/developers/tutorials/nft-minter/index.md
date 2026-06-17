---
title: Tutoriel de frappe de NFT
description: Dans ce tutoriel, vous allez construire une application de frappe de NFT et apprendre à créer une dapp full stack en connectant votre contrat intelligent à une interface React à l'aide de MetaMask et d'outils Web3.
author: "smudgil"
tags: ["solidity", "NFT", "alchemy", "contrats intelligents", "frontend", "Pinata", "erc-721"]
skill: intermediate
breadcrumb: Dapp de frappe de NFT
lang: fr
published: 2021-10-06
---

L'un des plus grands défis pour les développeurs venant d'un environnement Web2 est de comprendre comment connecter votre contrat intelligent à un projet frontend et interagir avec lui.

En construisant une application de frappe de NFT — une interface utilisateur simple où vous pouvez saisir un lien vers votre actif numérique, un titre et une description — vous apprendrez à :

- Vous connecter à MetaMask via votre projet frontend
- Appeler des méthodes de contrat intelligent depuis votre frontend
- Signer des transactions à l'aide de MetaMask

Dans ce tutoriel, nous utiliserons [React](https://react.dev/) comme framework frontend. Étant donné que ce tutoriel est principalement axé sur le développement Web3, nous ne passerons pas beaucoup de temps à détailler les principes fondamentaux de React. Nous nous concentrerons plutôt sur l'ajout de fonctionnalités à notre projet.

Comme prérequis, vous devez avoir une compréhension de niveau débutant de React — savoir comment fonctionnent les composants, les props, useState/useEffect et l'appel de fonctions de base. Si vous n'avez jamais entendu parler de ces termes auparavant, vous devriez consulter ce [tutoriel d'introduction à React](https://react.dev/learn/tutorial-tic-tac-toe). Pour ceux qui ont une mémoire plus visuelle, nous recommandons vivement cette excellente série de vidéos [Full Modern React Tutorial](https://www.youtube.com/playlist?list=PL4cUxeGkcC9gZD-Tvwfod2gaISzfRiP9d) par Net Ninja.

Et si ce n'est pas déjà fait, vous aurez absolument besoin d'un compte Alchemy pour suivre ce tutoriel ainsi que pour construire quoi que ce soit sur la chaîne de blocs. Créez un compte gratuit [ici](https://alchemy.com/).

Sans plus attendre, commençons !

## Création de NFT 101 {#making-nfts-101}

Avant même de commencer à regarder le code, il est important de comprendre comment fonctionne la création d'un NFT. Cela implique deux étapes :

### Publier un contrat intelligent de NFT sur la chaîne de blocs Ethereum {#publish-nft}

La plus grande différence entre les deux normes de contrats intelligents de NFT est que l'ERC-1155 est une norme multi-jetons et inclut une fonctionnalité de traitement par lots, tandis que l'ERC-721 est une norme à jeton unique et ne prend donc en charge que le transfert d'un seul jeton à la fois.

### Appeler la fonction de frappe {#minting-function}

Habituellement, cette fonction de frappe nécessite que vous passiez deux variables en paramètres : premièrement le `recipient`, qui spécifie l'adresse qui recevra votre NFT fraîchement frappé, et deuxièmement le `tokenURI` du NFT, une chaîne de caractères qui renvoie à un document JSON décrivant les métadonnées du NFT.

Les métadonnées d'un NFT sont vraiment ce qui lui donne vie, lui permettant d'avoir des propriétés, telles qu'un nom, une description, une image (ou un actif numérique différent) et d'autres attributs. Voici [un exemple de tokenURI](https://gateway.pinata.cloud/ipfs/QmSvBcb4tjdFpajGJhbFAWeK3JAxCdNQLQtr6ZdiSi42V2), qui contient les métadonnées d'un NFT.

Dans ce tutoriel, nous allons nous concentrer sur la partie 2, l'appel de la fonction de frappe d'un contrat intelligent de NFT existant à l'aide de notre interface utilisateur React.

[Voici un lien](https://ropsten.etherscan.io/address/0x4C4a07F737Bf57F6632B6CAB089B78f62385aCaE) vers le contrat intelligent de NFT ERC-721 que nous appellerons dans ce tutoriel. Si vous souhaitez apprendre comment nous l'avons créé, nous vous recommandons vivement de consulter notre autre tutoriel, [« Comment créer un NFT »](https://www.alchemy.com/docs/how-to-create-an-nft).

Super, maintenant que nous comprenons comment fonctionne la création d'un NFT, clonons nos fichiers de départ !

## Cloner les fichiers de départ {#clone-the-starter-files}

Tout d'abord, rendez-vous sur le [dépôt GitHub nft-minter-tutorial](https://github.com/alchemyplatform/nft-minter-tutorial) pour obtenir les fichiers de départ de ce projet. Clonez ce dépôt dans votre environnement local.

Lorsque vous ouvrez ce dépôt `nft-minter-tutorial` cloné, vous remarquerez qu'il contient deux dossiers : `minter-starter-files` et `nft-minter`.

- `minter-starter-files` contient les fichiers de départ (essentiellement l'interface utilisateur React) pour ce projet. Dans ce tutoriel, **nous travaillerons dans ce répertoire**, car vous apprendrez à donner vie à cette interface utilisateur en la connectant à votre portefeuille Ethereum et à un contrat intelligent de NFT.
- `nft-minter` contient l'intégralité du tutoriel terminé et est là pour vous servir de **référence** **si vous êtes bloqué.**

Ensuite, ouvrez votre copie de `minter-starter-files` dans votre éditeur de code, puis naviguez dans votre dossier `src`.

Tout le code que nous écrirons se trouvera dans le dossier `src`. Nous modifierons le composant `Minter.js` et écrirons des fichiers JavaScript supplémentaires pour donner à notre projet des fonctionnalités Web3.

## Étape 2 : Examiner nos fichiers de départ {#step-2-check-out-our-starter-files}

Avant de commencer à coder, il est important d'examiner ce qui nous est déjà fourni dans les fichiers de départ.

### Lancer votre projet React {#get-your-react-project-running}

Commençons par lancer le projet React dans notre navigateur. La beauté de React est qu'une fois que notre projet est en cours d'exécution dans notre navigateur, toutes les modifications que nous enregistrons seront mises à jour en direct dans notre navigateur.

Pour lancer le projet, naviguez jusqu'au répertoire racine du dossier `minter-starter-files`, et exécutez `npm install` dans votre terminal pour installer les dépendances du projet :

```bash
cd minter-starter-files
npm install
```

Une fois l'installation terminée, exécutez `npm start` dans votre terminal :

```bash
npm start
```

Cela devrait ouvrir http://localhost:3000/ dans votre navigateur, où vous verrez le frontend de notre projet. Il devrait se composer de 3 champs : un endroit pour saisir un lien vers l'actif de votre NFT, entrer le nom de votre NFT et fournir une description.

Si vous essayez de cliquer sur les boutons « Connect Wallet » ou « Mint NFT », vous remarquerez qu'ils ne fonctionnent pas — c'est parce que nous devons encore programmer leurs fonctionnalités ! :\)

### Le composant Minter.js {#minter-js}

**REMARQUE :** Assurez-vous d'être dans le dossier `minter-starter-files` et non dans le dossier `nft-minter` !

Retournons dans le dossier `src` de notre éditeur et ouvrons le fichier `Minter.js`. Il est très important que nous comprenions tout ce qui se trouve dans ce fichier, car c'est le composant React principal sur lequel nous allons travailler.

En haut de ce fichier, nous avons nos variables d'état que nous mettrons à jour après des événements spécifiques.

```javascript
//Variables d'état
const [walletAddress, setWallet] = useState("")
const [status, setStatus] = useState("")
const [name, setName] = useState("")
const [description, setDescription] = useState("")
const [url, setURL] = useState("")
```

Vous n'avez jamais entendu parler des variables d'état ou des hooks d'état de React ? Consultez [cette](https://legacy.reactjs.org/docs/hooks-state.html) documentation.

Voici ce que représente chacune des variables :

- `walletAddress` - une chaîne de caractères qui stocke l'adresse du portefeuille de l'utilisateur
- `status` - une chaîne de caractères qui contient un message à afficher en bas de l'interface utilisateur
- `name` - une chaîne de caractères qui stocke le nom du NFT
- `description` - une chaîne de caractères qui stocke la description du NFT
- `url` - une chaîne de caractères qui est un lien vers l'actif numérique du NFT

Après les variables d'état, vous verrez trois fonctions non implémentées : `useEffect`, `connectWalletPressed` et `onMintPressed`. Vous remarquerez que toutes ces fonctions sont `async`, c'est parce que nous y ferons des appels d'API asynchrones ! Leurs noms sont éponymes de leurs fonctionnalités :

```javascript
useEffect(async () => {
  //TODO : implémenter
}, [])

const connectWalletPressed = async () => {
  //TODO : implémenter
}

const onMintPressed = async () => {
  //TODO : implémenter
}
```

- [`useEffect`](https://legacy.reactjs.org/docs/hooks-effect.html) - il s'agit d'un hook React qui est appelé après le rendu de votre composant. Parce qu'il a une prop de tableau vide `[]` qui lui est passée (voir ligne 3), il ne sera appelé que lors du _premier_ rendu du composant. Ici, nous appellerons notre écouteur de portefeuille et une autre fonction de portefeuille pour mettre à jour notre interface utilisateur afin de refléter si un portefeuille est déjà connecté.
- `connectWalletPressed` - cette fonction sera appelée pour connecter le portefeuille MetaMask de l'utilisateur à notre dapp.
- `onMintPressed` - cette fonction sera appelée pour frapper le NFT de l'utilisateur.

Vers la fin de ce fichier, nous avons l'interface utilisateur de notre composant. Si vous parcourez attentivement ce code, vous remarquerez que nous mettons à jour nos variables d'état `url`, `name` et `description` lorsque la saisie dans leurs champs de texte correspondants change.

Vous verrez également que `connectWalletPressed` et `onMintPressed` sont appelées lorsque les boutons avec les ID `mintButton` et `walletButton` sont cliqués respectivement.

```javascript
//l'interface utilisateur de notre composant
return (
  <div className="Minter">
    <button id="walletButton" onClick={connectWalletPressed}>
      {walletAddress.length > 0 ? (
        "Connected: " +
        String(walletAddress).substring(0, 6) +
        "..." +
        String(walletAddress).substring(38)
      ) : (
        <span>Connect Wallet</span>
      )}
    </button>

    <br></br>
    <h1 id="title">🧙‍♂️ Alchemy NFT Minter</h1>
    <p>
      Simply add your asset's link, name, and description, then press "Mint."
    </p>
    <form>
      <h2>🖼 Link to asset: </h2>
      <input
        type="text"
        placeholder="e.g., https://gateway.pinata.cloud/ipfs/<hash>"
        onChange={(event) => setURL(event.target.value)}
      />
      <h2>🤔 Name: </h2>
      <input
        type="text"
        placeholder="e.g., My first NFT!"
        onChange={(event) => setName(event.target.value)}
      />
      <h2>✍️ Description: </h2>
      <input
        type="text"
        placeholder="e.g., Even cooler than cryptokitties ;)"
        onChange={(event) => setDescription(event.target.value)}
      />
    </form>
    <button id="mintButton" onClick={onMintPressed}>
      Mint NFT
    </button>
    <p id="status">{status}</p>
  </div>
)
```

Enfin, voyons où ce composant Minter est ajouté.

Si vous allez dans le fichier `App.js`, qui est le composant principal de React agissant comme un conteneur pour tous les autres composants, vous verrez que notre composant Minter est injecté à la ligne 7.

**Dans ce tutoriel, nous ne modifierons que le `Minter.js file` et ajouterons des fichiers dans notre dossier `src`.**

Maintenant que nous comprenons avec quoi nous travaillons, configurons notre portefeuille Ethereum !

## Configurer votre portefeuille Ethereum {#set-up-your-ethereum-wallet}

Pour que les utilisateurs puissent interagir avec votre contrat intelligent, ils devront connecter leur portefeuille Ethereum à votre dapp.

### Télécharger MetaMask {#download-metamask}

Pour ce tutoriel, nous utiliserons MetaMask, un portefeuille virtuel dans le navigateur utilisé pour gérer l'adresse de votre compte Ethereum. Si vous souhaitez en savoir plus sur le fonctionnement des transactions sur Ethereum, consultez [cette page](/developers/docs/transactions/).

Vous pouvez télécharger et créer un compte MetaMask gratuitement [ici](https://metamask.io/download). Lors de la création d'un compte, ou si vous en avez déjà un, assurez-vous de passer au « Ropsten Test Network » en haut à droite \(afin de ne pas manipuler d'argent réel\).

### Ajouter de l'ether depuis un faucet {#add-ether-from-faucet}

Afin de frapper nos NFT (ou de signer des transactions sur la chaîne de blocs Ethereum), nous aurons besoin de faux ETH. Pour obtenir des ETH, vous pouvez vous rendre sur le [faucet Ropsten](https://faucet.ropsten.be/) et entrer l'adresse de votre compte Ropsten, puis cliquer sur « Send Ropsten Eth ». Vous devriez voir des ETH dans votre compte MetaMask peu de temps après !

### Vérifier votre solde {#check-your-balance}

Pour vérifier que notre solde est bien là, faisons une requête [eth_getBalance](https://docs.alchemyapi.io/alchemy/documentation/alchemy-api-reference/json-rpc#eth_getbalance) en utilisant [l'outil composer d'Alchemy](https://composer.alchemyapi.io/?composer_state=%7B%22network%22%3A0%2C%22methodName%22%3A%22eth_getBalance%22%2C%22paramValues%22%3A%5B%22%22%2C%22latest%22%5D%7D). Cela renverra le montant d'ETH dans notre portefeuille. Après avoir saisi l'adresse de votre compte MetaMask et cliqué sur « Send Request », vous devriez voir une réponse comme celle-ci :

```text
{"jsonrpc": "2.0", "id": 0, "result": "0xde0b6b3a7640000"}
```

**REMARQUE :** Ce résultat est en Wei et non en ether. Le Wei est utilisé comme la plus petite dénomination de l'ether. La conversion de Wei en ether est : 1 ether = 10¹⁸ Wei. Donc, si nous convertissons 0xde0b6b3a7640000 en décimal, nous obtenons 1\*10¹⁸, ce qui équivaut à 1 ether.

Ouf ! Notre faux argent est bien là ! <Emoji text=":money_mouth_face:" size={1} />

## Connecter MetaMask à votre interface utilisateur {#connect-metamask-to-your-ui}

Maintenant que notre portefeuille MetaMask est configuré, connectons notre dapp à celui-ci !

Parce que nous voulons suivre le paradigme [MVC](https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93controller), nous allons créer un fichier séparé qui contient nos fonctions pour gérer la logique, les données et les règles de notre dapp, puis passer ces fonctions à notre frontend (notre composant Minter.js).

### La fonction `connectWallet` {#connect-wallet-function}

Pour ce faire, créons un nouveau dossier appelé `utils` dans votre répertoire `src` et ajoutons-y un fichier appelé `interact.js`, qui contiendra toutes nos fonctions d'interaction avec le portefeuille et le contrat intelligent.

Dans notre fichier `interact.js`, nous écrirons une fonction `connectWallet`, que nous importerons et appellerons ensuite dans notre composant `Minter.js`.

Dans votre fichier `interact.js`, ajoutez ce qui suit :

```javascript
export const connectWallet = async () => {
  if (window.ethereum) {
    try {
      const addressArray = await window.ethereum.request({
        method: "eth_requestAccounts",
      })
      const obj = {
        status: "👆🏽 Write a message in the text-field above.",
        address: addressArray[0],
      }
      return obj
    } catch (err) {
      return {
        address: "",
        status: "😥 " + err.message,
      }
    }
  } else {
    return {
      address: "",
      status: (
        <span>
          <p>
            {" "}
            🦊 <a target="_blank" href={`https://metamask.io/download`}>
              You must install MetaMask, a virtual Ethereum wallet, in your
              browser.
            </a>
          </p>
        </span>
      ),
    }
  }
}
```

Détaillons ce que fait ce code :

Tout d'abord, notre fonction vérifie si `window.ethereum` est activé dans votre navigateur.

`window.ethereum` est une API globale injectée par MetaMask et d'autres fournisseurs de portefeuilles qui permet aux sites Web de demander les comptes Ethereum des utilisateurs. Si elle est approuvée, elle peut lire les données des chaînes de blocs auxquelles l'utilisateur est connecté, et suggérer à l'utilisateur de signer des messages et des transactions. Consultez la [documentation de MetaMask](https://docs.metamask.io/guide/ethereum-provider.html#table-of-contents) pour plus d'informations !

Si `window.ethereum` _n'est pas_ présent, cela signifie que MetaMask n'est pas installé. Cela entraîne le renvoi d'un objet JSON, où `address` renvoyé est une chaîne vide, et l'objet JSX `status` indique que l'utilisateur doit installer MetaMask.

**La plupart des fonctions que nous écrivons renverront des objets JSON que nous pourrons utiliser pour mettre à jour nos variables d'état et notre interface utilisateur.**

Maintenant, si `window.ethereum` _est_ présent, c'est là que les choses deviennent intéressantes.

À l'aide d'une boucle try/catch, nous essaierons de nous connecter à MetaMask en appelant [`window.ethereum.request({ method: "eth_requestAccounts" });`](https://docs.metamask.io/guide/rpc-api.html#eth-requestaccounts). L'appel de cette fonction ouvrira MetaMask dans le navigateur, où l'utilisateur sera invité à connecter son portefeuille à votre dapp.

- Si l'utilisateur choisit de se connecter, `method: "eth_requestAccounts"` renverra un tableau contenant toutes les adresses de compte de l'utilisateur qui sont connectées à la dapp. Dans l'ensemble, notre fonction `connectWallet` renverra un objet JSON qui contient la _première_ `address` de ce tableau \(voir ligne 9\) et un message `status` qui invite l'utilisateur à écrire un message au contrat intelligent.
- Si l'utilisateur rejette la connexion, alors l'objet JSON contiendra une chaîne vide pour la `address` renvoyée et un message `status` qui reflète que l'utilisateur a rejeté la connexion.

### Ajouter la fonction connectWallet à votre composant d'interface utilisateur Minter.js {#add-connect-wallet}

Maintenant que nous avons écrit cette fonction `connectWallet`, connectons-la à notre composant `Minter.js.`.

Tout d'abord, nous devrons importer notre fonction dans notre fichier `Minter.js` en ajoutant `import { connectWallet } from "./utils/interact.js";` en haut du fichier `Minter.js`. Vos 11 premières lignes de `Minter.js` devraient maintenant ressembler à ceci :

```javascript
import { useEffect, useState } from "react";
import { connectWallet } from "./utils/interact.js";

const Minter = (props) => {

  //Variables d'état
  const [walletAddress, setWallet] = useState("");
  const [status, setStatus] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [url, setURL] = useState("");
```

Ensuite, à l'intérieur de notre fonction `connectWalletPressed`, nous appellerons notre fonction `connectWallet` importée, comme ceci :

```javascript
const connectWalletPressed = async () => {
  const walletResponse = await connectWallet()
  setStatus(walletResponse.status)
  setWallet(walletResponse.address)
}
```

Remarquez comment la plupart de nos fonctionnalités sont abstraites de notre composant `Minter.js` à partir du fichier `interact.js` ? C'est pour que nous respections le paradigme M-V-C !

Dans `connectWalletPressed`, nous faisons simplement un appel await à notre fonction `connectWallet` importée, et en utilisant sa réponse, nous mettons à jour nos variables `status` et `walletAddress` via leurs hooks d'état.

Maintenant, enregistrons les deux fichiers `Minter.js` et `interact.js` et testons notre interface utilisateur jusqu'à présent.

Ouvrez votre navigateur sur localhost:3000, et appuyez sur le bouton « Connect Wallet » en haut à droite de la page.

Si MetaMask est installé, vous devriez être invité à connecter votre portefeuille à votre dapp. Acceptez l'invitation à vous connecter.

Vous devriez voir que le bouton du portefeuille reflète maintenant que votre adresse est connectée.

Ensuite, essayez de rafraîchir la page... c'est étrange. Le bouton de notre portefeuille nous invite à connecter MetaMask, même s'il est déjà connecté...

Ne vous inquiétez pas cependant ! Nous pouvons facilement corriger cela en implémentant une fonction appelée `getCurrentWalletConnected`, qui vérifiera si une adresse est déjà connectée à notre dapp et mettra à jour notre interface utilisateur en conséquence !

### La fonction getCurrentWalletConnected {#get-current-wallet}

Dans votre fichier `interact.js`, ajoutez la fonction `getCurrentWalletConnected` suivante :

```javascript
export const getCurrentWalletConnected = async () => {
  if (window.ethereum) {
    try {
      const addressArray = await window.ethereum.request({
        method: "eth_accounts",
      })
      if (addressArray.length > 0) {
        return {
          address: addressArray[0],
          status: "👆🏽 Write a message in the text-field above.",
        }
      } else {
        return {
          address: "",
          status: "🦊 Connect to MetaMask using the top right button.",
        }
      }
    } catch (err) {
      return {
        address: "",
        status: "😥 " + err.message,
      }
    }
  } else {
    return {
      address: "",
      status: (
        <span>
          <p>
            {" "}
            🦊 <a target="_blank" href={`https://metamask.io/download`}>
              You must install MetaMask, a virtual Ethereum wallet, in your
              browser.
            </a>
          </p>
        </span>
      ),
    }
  }
}
```

Ce code est _très_ similaire à la fonction `connectWallet` que nous venons d'écrire plus tôt.

La principale différence est qu'au lieu d'appeler la méthode `eth_requestAccounts`, qui ouvre MetaMask pour que l'utilisateur connecte son portefeuille, nous appelons ici la méthode `eth_accounts`, qui renvoie simplement un tableau contenant les adresses MetaMask actuellement connectées à notre dapp.

Pour voir cette fonction en action, appelons-la dans la fonction `useEffect` de notre composant `Minter.js`.

Comme nous l'avons fait pour `connectWallet`, nous devons importer cette fonction de notre fichier `interact.js` dans notre fichier `Minter.js` comme ceci :

```javascript
import { useEffect, useState } from "react"
import {
  connectWallet,
  getCurrentWalletConnected, //importer ici
} from "./utils/interact.js"
```

Maintenant, nous l'appelons simplement dans notre fonction `useEffect` :

```javascript
useEffect(async () => {
  const { address, status } = await getCurrentWalletConnected()
  setWallet(address)
  setStatus(status)
}, [])
```

Remarquez que nous utilisons la réponse de notre appel à `getCurrentWalletConnected` pour mettre à jour nos variables d'état `walletAddress` et `status`.

Une fois que vous avez ajouté ce code, essayez de rafraîchir la fenêtre de notre navigateur. Le bouton devrait indiquer que vous êtes connecté et afficher un aperçu de l'adresse de votre portefeuille connecté - même après avoir rafraîchi !

### Implémenter addWalletListener {#implement-add-wallet-listener}

La dernière étape de la configuration du portefeuille de notre dapp consiste à implémenter l'écouteur de portefeuille afin que notre interface utilisateur se mette à jour lorsque l'état de notre portefeuille change, par exemple lorsque l'utilisateur se déconnecte ou change de compte.

Dans votre fichier `Minter.js`, ajoutez une fonction `addWalletListener` qui ressemble à ce qui suit :

```javascript
function addWalletListener() {
  if (window.ethereum) {
    window.ethereum.on("accountsChanged", (accounts) => {
      if (accounts.length > 0) {
        setWallet(accounts[0])
        setStatus("👆🏽 Write a message in the text-field above.")
      } else {
        setWallet("")
        setStatus("🦊 Connect to MetaMask using the top right button.")
      }
    })
  } else {
    setStatus(
      <p>
        {" "}
        🦊 <a target="_blank" href={`https://metamask.io/download`}>
          You must install MetaMask, a virtual Ethereum wallet, in your browser.
        </a>
      </p>
    )
  }
}
```

Détaillons rapidement ce qui se passe ici :

- Tout d'abord, notre fonction vérifie si `window.ethereum` est activé \(c'est-à-dire si MetaMask est installé\).
  - Si ce n'est pas le cas, nous définissons simplement notre variable d'état `status` sur une chaîne JSX qui invite l'utilisateur à installer MetaMask.
  - S'il est activé, nous configurons l'écouteur `window.ethereum.on("accountsChanged")` à la ligne 3 qui écoute les changements d'état dans le portefeuille MetaMask, ce qui inclut le moment où l'utilisateur connecte un compte supplémentaire à la dapp, change de compte ou déconnecte un compte. S'il y a au moins un compte connecté, la variable d'état `walletAddress` est mise à jour comme le premier compte dans le tableau `accounts` renvoyé par l'écouteur. Sinon, `walletAddress` est défini comme une chaîne vide.

Enfin, nous devons l'appeler dans notre fonction `useEffect` :

```javascript
useEffect(async () => {
  const { address, status } = await getCurrentWalletConnected()
  setWallet(address)
  setStatus(status)

  addWalletListener()
}, [])
```

Et voilà ! Nous avons terminé la programmation de toutes les fonctionnalités de notre portefeuille ! Maintenant que notre portefeuille est configuré, voyons comment frapper notre NFT !

## Métadonnées de NFT 101 {#nft-metadata-101}

Rappelez-vous donc des métadonnées de NFT dont nous venons de parler à l'étape 0 de ce tutoriel — elles donnent vie à un NFT, lui permettant d'avoir des propriétés, telles qu'un actif numérique, un nom, une description et d'autres attributs.

Nous allons devoir configurer ces métadonnées en tant qu'objet JSON et les stocker, afin de pouvoir les passer en tant que paramètre `tokenURI` lors de l'appel de la fonction `mintNFT` de notre contrat intelligent.

Le texte dans les champs « Link to Asset », « Name », « Description » comprendra les différentes propriétés des métadonnées de notre NFT. Nous formaterons ces métadonnées en tant qu'objet JSON, mais il existe plusieurs options pour stocker cet objet JSON :

- Nous pourrions le stocker sur la chaîne de blocs Ethereum ; cependant, cela serait très coûteux.
- Nous pourrions le stocker sur un serveur centralisé, comme AWS ou Firebase. Mais cela irait à l'encontre de notre philosophie de décentralisation.
- Nous pourrions utiliser IPFS, un protocole décentralisé et un réseau pair à pair pour stocker et partager des données dans un système de fichiers distribué. Comme ce protocole est décentralisé et gratuit, c'est notre meilleure option !

Pour stocker nos métadonnées sur IPFS, nous utiliserons [Pinata](https://pinata.cloud/), une API et une boîte à outils IPFS pratiques. Dans la prochaine étape, nous expliquerons exactement comment faire cela !

## Utiliser Pinata pour épingler vos métadonnées sur IPFS {#use-pinata-to-pin-your-metadata-to-ipfs}

Si vous n'avez pas de compte [Pinata](https://pinata.cloud/), créez un compte gratuit [ici](https://app.pinata.cloud/auth/signup) et suivez les étapes pour vérifier votre adresse e-mail et votre compte.

### Créer votre clé API Pinata {#create-pinata-api-key}

Accédez à la page [https://pinata.cloud/keys](https://pinata.cloud/keys), puis sélectionnez le bouton « New Key » en haut, activez le widget Admin et nommez votre clé.

Une fenêtre contextuelle s'affichera alors avec vos informations d'API. Assurez-vous de les conserver en lieu sûr.

Maintenant que notre clé est configurée, ajoutons-la à notre projet afin de pouvoir l'utiliser.

### Créer un fichier .env {#create-a-env}

Nous pouvons stocker en toute sécurité notre clé et notre secret Pinata dans un fichier d'environnement. Installons le [paquet dotenv](https://www.npmjs.com/package/dotenv) dans le répertoire de votre projet.

Ouvrez un nouvel onglet dans votre terminal \(séparé de celui qui exécute l'hôte local\) et assurez-vous d'être dans le dossier `minter-starter-files`, puis exécutez la commande suivante dans votre terminal :

```text
npm install dotenv --save
```

Ensuite, créez un fichier `.env` dans le répertoire racine de votre `minter-starter-files` en saisissant ce qui suit sur votre ligne de commande :

```javascript
vim.env
```

Cela ouvrira votre fichier `.env` dans vim \(un éditeur de texte\). Pour l'enregistrer, appuyez sur « esc » + « : » + « q » sur votre clavier dans cet ordre.

Ensuite, dans VSCode, naviguez jusqu'à votre fichier `.env` et ajoutez-y votre clé API et votre secret API Pinata, comme ceci :

```text
REACT_APP_PINATA_KEY = <pinata-api-key>
REACT_APP_PINATA_SECRET = <pinata-api-secret>
```

Enregistrez le fichier, et vous êtes alors prêt à commencer à écrire la fonction pour télécharger vos métadonnées JSON sur IPFS !

### Implémenter pinJSONToIPFS {#pin-json-to-ipfs}

Heureusement pour nous, Pinata dispose d'une [API spécifiquement conçue pour télécharger des données JSON sur IPFS](https://docs.pinata.cloud/api-reference/endpoint/ipfs/pin-json-to-ipfs#pin-json) et d'un exemple JavaScript pratique avec axios que nous pouvons utiliser, avec quelques légères modifications.

Dans votre dossier `utils`, créons un autre fichier appelé `pinata.js` puis importons notre secret et notre clé Pinata depuis le fichier .env comme ceci :

```javascript
require("dotenv").config()
const key = process.env.REACT_APP_PINATA_KEY
const secret = process.env.REACT_APP_PINATA_SECRET
```

Ensuite, collez le code supplémentaire ci-dessous dans votre fichier `pinata.js`. Ne vous inquiétez pas, nous allons détailler ce que tout cela signifie !

```javascript
require("dotenv").config()
const key = process.env.REACT_APP_PINATA_KEY
const secret = process.env.REACT_APP_PINATA_SECRET

const axios = require("axios")

export const pinJSONToIPFS = async (JSONBody) => {
  const url = `https://api.pinata.cloud/pinning/pinJSONToIPFS`
  //faire une requête POST axios vers Pinata ⬇️
  return axios
    .post(url, JSONBody, {
      headers: {
        pinata_api_key: key,
        pinata_secret_api_key: secret,
      },
    })
    .then(function (response) {
      return {
        success: true,
        pinataUrl:
          "https://gateway.pinata.cloud/ipfs/" + response.data.IpfsHash,
      }
    })
    .catch(function (error) {
      console.log(error)
      return {
        success: false,
        message: error.message,
      }
    })
}
```

Alors, que fait ce code exactement ?

Tout d'abord, il importe [axios](https://www.npmjs.com/package/axios), un client HTTP basé sur des promesses pour le navigateur et Node.js, que nous utiliserons pour faire une requête à Pinata.

Ensuite, nous avons notre fonction asynchrone `pinJSONToIPFS`, qui prend un `JSONBody` en entrée et la clé et le secret de l'API Pinata dans son en-tête, le tout pour faire une requête POST à leur API `pinJSONToIPFS`.

- Si cette requête POST réussit, alors notre fonction renvoie un objet JSON avec le booléen `success` à true et le `pinataUrl` où nos métadonnées ont été épinglées. Nous utiliserons ce `pinataUrl` renvoyé comme entrée `tokenURI` pour la fonction de frappe de notre contrat intelligent.
- Si cette requête POST échoue, alors notre fonction renvoie un objet JSON avec le booléen `success` à false et une chaîne `message` qui relaie notre erreur.

Comme pour les types de retour de notre fonction `connectWallet`, nous renvoyons des objets JSON afin de pouvoir utiliser leurs paramètres pour mettre à jour nos variables d'état et notre interface utilisateur.

## Charger votre contrat intelligent {#load-your-smart-contract}

Maintenant que nous avons un moyen de télécharger les métadonnées de notre NFT sur IPFS via notre fonction `pinJSONToIPFS`, nous allons avoir besoin d'un moyen de charger une instance de notre contrat intelligent afin de pouvoir appeler sa fonction `mintNFT`.

Comme nous l'avons mentionné plus tôt, dans ce tutoriel, nous utiliserons [ce contrat intelligent de NFT existant](https://ropsten.etherscan.io/address/0x4C4a07F737Bf57F6632B6CAB089B78f62385aCaE) ; cependant, si vous souhaitez apprendre comment nous l'avons créé, ou en créer un vous-même, nous vous recommandons vivement de consulter notre autre tutoriel, [« Comment créer un NFT »](https://www.alchemy.com/docs/how-to-create-an-nft).

### L'ABI du contrat {#contract-abi}

Si vous avez examiné nos fichiers de près, vous aurez remarqué que dans notre répertoire `src`, il y a un fichier `contract-abi.json`. Une ABI est nécessaire pour spécifier quelle fonction un contrat invoquera ainsi que pour s'assurer que la fonction renverra les données dans le format que vous attendez.

Nous allons également avoir besoin d'une clé API Alchemy et de l'API Alchemy Web3 pour nous connecter à la chaîne de blocs Ethereum et charger notre contrat intelligent.

### Créer votre clé API Alchemy {#create-alchemy-api}

Si vous n'avez pas encore de compte Alchemy, [inscrivez-vous gratuitement ici.](https://alchemy.com/?a=eth-org-nft-minter)

Une fois que vous avez créé un compte Alchemy, vous pouvez générer une clé API en créant une application. Cela nous permettra de faire des requêtes au réseau de test Ropsten.

Accédez à la page « Create App » dans votre tableau de bord Alchemy en survolant « Apps » dans la barre de navigation et en cliquant sur « Create App ».

Nommez votre application (nous avons choisi « My First NFT! »), proposez une courte description, sélectionnez « Staging » pour l'environnement utilisé pour la comptabilité de votre application, et choisissez « Ropsten » pour votre réseau.

Cliquez sur « Create app » et c'est tout ! Votre application devrait apparaître dans le tableau ci-dessous.

Génial, maintenant que nous avons créé notre URL d'API HTTP Alchemy, copiez-la dans votre presse-papiers...

…et ajoutons-la ensuite à notre fichier `.env`. Dans l'ensemble, votre fichier .env devrait ressembler à ceci :

```text
REACT_APP_PINATA_KEY = <pinata-key>
REACT_APP_PINATA_SECRET = <pinata-secret>
REACT_APP_ALCHEMY_KEY = https://eth-ropsten.alchemyapi.io/v2/<alchemy-key>
```

Maintenant que nous avons l'ABI de notre contrat et notre clé API Alchemy, nous sommes prêts à charger notre contrat intelligent en utilisant [Alchemy Web3](https://github.com/alchemyplatform/alchemy-web3).

### Configurer votre point de terminaison Alchemy Web3 et votre contrat {#setup-alchemy-endpoint}

Tout d'abord, si vous ne l'avez pas déjà fait, vous devrez installer [Alchemy Web3](https://github.com/alchemyplatform/alchemy-web3) en naviguant vers le répertoire de base : `nft-minter-tutorial` dans le terminal :

```text
cd ..
npm install @alch/alchemy-web3
```

Ensuite, retournons à notre fichier `interact.js`. En haut du fichier, ajoutez le code suivant pour importer votre clé Alchemy depuis votre fichier .env et configurer votre point de terminaison Alchemy Web3 :

```javascript
require("dotenv").config()
const alchemyKey = process.env.REACT_APP_ALCHEMY_KEY
const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(alchemyKey)
```

[Alchemy Web3](https://github.com/alchemyplatform/alchemy-web3) est un wrapper autour de [Web3.js](https://docs.web3js.org/), fournissant des méthodes d'API améliorées et d'autres avantages cruciaux pour vous faciliter la vie en tant que développeur Web3. Il est conçu pour nécessiter une configuration minimale afin que vous puissiez commencer à l'utiliser dans votre application immédiatement !

Ensuite, ajoutons l'ABI de notre contrat et l'adresse du contrat à notre fichier.

```javascript
require("dotenv").config()
const alchemyKey = process.env.REACT_APP_ALCHEMY_KEY
const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(alchemyKey)

const contractABI = require("../contract-abi.json")
const contractAddress = "0x4C4a07F737Bf57F6632B6CAB089B78f62385aCaE"
```

Une fois que nous avons ces deux éléments, nous sommes prêts à commencer à coder notre fonction de frappe !

## Implémenter la fonction mintNFT {#implement-the-mintnft-function}

À l'intérieur de votre fichier `interact.js`, définissons notre fonction, `mintNFT`, qui, de manière éponyme, frappera notre NFT.

Parce que nous ferons de nombreux appels asynchrones \(à Pinata pour épingler nos métadonnées sur IPFS, à Alchemy Web3 pour charger notre contrat intelligent, et à MetaMask pour signer nos transactions\), notre fonction sera également asynchrone.

Les trois entrées de notre fonction seront le `url` de notre actif numérique, `name` et `description`. Ajoutez la signature de fonction suivante sous la fonction `connectWallet` :

```javascript
export const mintNFT = async (url, name, description) => {}
```

### Gestion des erreurs de saisie {#input-error-handling}

Naturellement, il est logique d'avoir une sorte de gestion des erreurs de saisie au début de la fonction, afin de quitter cette fonction si nos paramètres d'entrée ne sont pas corrects. À l'intérieur de notre fonction, ajoutons le code suivant :

```javascript
export const mintNFT = async (url, name, description) => {
  //gestion des erreurs
  if (url.trim() == "" || name.trim() == "" || description.trim() == "") {
    return {
      success: false,
      status: "❗Please make sure all fields are completed before minting.",
    }
  }
}
```

Essentiellement, si l'un des paramètres d'entrée est une chaîne vide, alors nous renvoyons un objet JSON où le booléen `success` est false, et la chaîne `status` indique que tous les champs de notre interface utilisateur doivent être remplis.

### Télécharger les métadonnées sur IPFS {#upload-metadata-to-ipfs}

Une fois que nous savons que nos métadonnées sont correctement formatées, l'étape suivante consiste à les envelopper dans un objet JSON et à les télécharger sur IPFS via la fonction `pinJSONToIPFS` que nous avons écrite !

Pour ce faire, nous devons d'abord importer la fonction `pinJSONToIPFS` dans notre fichier `interact.js`. Tout en haut de `interact.js`, ajoutons :

```javascript
import { pinJSONToIPFS } from "./pinata.js"
```

Rappelez-vous que `pinJSONToIPFS` prend un corps JSON. Donc, avant de l'appeler, nous allons devoir formater nos paramètres `url`, `name` et `description` en un objet JSON.

Mettons à jour notre code pour créer un objet JSON appelé `metadata` puis faisons un appel à `pinJSONToIPFS` avec ce paramètre `metadata` :

```javascript
export const mintNFT = async (url, name, description) => {
  //gestion des erreurs
  if (url.trim() == "" || name.trim() == "" || description.trim() == "") {
    return {
      success: false,
      status: "❗Please make sure all fields are completed before minting.",
    }
  }

  //créer les métadonnées
  const metadata = new Object()
  metadata.name = name
  metadata.image = url
  metadata.description = description

  //faire l'appel à Pinata
  const pinataResponse = await pinJSONToIPFS(metadata)
  if (!pinataResponse.success) {
    return {
      success: false,
      status: "😢 Something went wrong while uploading your tokenURI.",
    }
  }
  const tokenURI = pinataResponse.pinataUrl
}
```

Remarquez que nous stockons la réponse de notre appel à `pinJSONToIPFS(metadata)` dans l'objet `pinataResponse`. Ensuite, nous analysons cet objet pour détecter d'éventuelles erreurs.

S'il y a une erreur, nous renvoyons un objet JSON où le booléen `success` est false et notre chaîne `status` indique que notre appel a échoué. Sinon, nous extrayons le `pinataURL` de `pinataResponse` et le stockons comme notre variable `tokenURI`.

Il est maintenant temps de charger notre contrat intelligent en utilisant l'API Alchemy Web3 que nous avons initialisée en haut de notre fichier. Ajoutez la ligne de code suivante au bas de la fonction `mintNFT` pour définir le contrat sur la variable globale `window.contract` :

```javascript
window.contract = await new web3.eth.Contract(contractABI, contractAddress)
```

La dernière chose à ajouter dans notre fonction `mintNFT` est notre transaction Ethereum :

```javascript
//configurer votre transaction Ethereum
const transactionParameters = {
  to: contractAddress, // Requis sauf lors des publications de contrat.
  from: window.ethereum.selectedAddress, // doit correspondre à l'adresse active de l'utilisateur.
  data: window.contract.methods
    .mintNFT(window.ethereum.selectedAddress, tokenURI)
    .encodeABI(), //faire un appel au contrat intelligent NFT
}

//signer la transaction via MetaMask
try {
  const txHash = await window.ethereum.request({
    method: "eth_sendTransaction",
    params: [transactionParameters],
  })
  return {
    success: true,
    status:
      "✅ Check out your transaction on Etherscan: https://ropsten.etherscan.io/tx/" +
      txHash,
  }
} catch (error) {
  return {
    success: false,
    status: "😥 Something went wrong: " + error.message,
  }
}
```

Si vous êtes déjà familier avec les transactions Ethereum, vous remarquerez que la structure est assez similaire à ce que vous avez vu.

- Tout d'abord, nous configurons les paramètres de nos transactions.
  - `to` spécifie l'adresse du destinataire \(notre contrat intelligent\)
  - `from` spécifie le signataire de la transaction \(l'adresse de l'utilisateur connectée à MetaMask : `window.ethereum.selectedAddress`\)
  - `data` contient l'appel à la méthode `mintNFT` de notre contrat intelligent, qui reçoit notre `tokenURI` et l'adresse du portefeuille de l'utilisateur, `window.ethereum.selectedAddress`, en tant qu'entrées
- Ensuite, nous faisons un appel await, `window.ethereum.request,` où nous demandons à MetaMask de signer la transaction. Remarquez que dans cette requête, nous spécifions notre méthode eth \(eth_SentTransaction\) et passons notre `transactionParameters`. À ce stade, MetaMask s'ouvrira dans le navigateur et invitera l'utilisateur à signer ou à rejeter la transaction.
  - Si la transaction réussit, la fonction renverra un objet JSON où le booléen `success` est défini sur true et la chaîne `status` invite l'utilisateur à consulter Etherscan pour plus d'informations sur sa transaction.
  - Si la transaction échoue, la fonction renverra un objet JSON où le booléen `success` est défini sur false, et la chaîne `status` relaie le message d'erreur.

Dans l'ensemble, notre fonction `mintNFT` devrait ressembler à ceci :

```javascript
export const mintNFT = async (url, name, description) => {
  //gestion des erreurs
  if (url.trim() == "" || name.trim() == "" || description.trim() == "") {
    return {
      success: false,
      status: "❗Please make sure all fields are completed before minting.",
    }
  }

  //créer les métadonnées
  const metadata = new Object()
  metadata.name = name
  metadata.image = url
  metadata.description = description

  //requête d'épinglage Pinata
  const pinataResponse = await pinJSONToIPFS(metadata)
  if (!pinataResponse.success) {
    return {
      success: false,
      status: "😢 Something went wrong while uploading your tokenURI.",
    }
  }
  const tokenURI = pinataResponse.pinataUrl

  //charger le contrat intelligent
  window.contract = await new web3.eth.Contract(contractABI, contractAddress) //loadContract();

  //configurer votre transaction Ethereum
  const transactionParameters = {
    to: contractAddress, // Requis sauf lors des publications de contrat.
    from: window.ethereum.selectedAddress, // doit correspondre à l'adresse active de l'utilisateur.
    data: window.contract.methods
      .mintNFT(window.ethereum.selectedAddress, tokenURI)
      .encodeABI(), //faire un appel au contrat intelligent NFT
  }

  //signer la transaction via MetaMask
  try {
    const txHash = await window.ethereum.request({
      method: "eth_sendTransaction",
      params: [transactionParameters],
    })
    return {
      success: true,
      status:
        "✅ Check out your transaction on Etherscan: https://ropsten.etherscan.io/tx/" +
        txHash,
    }
  } catch (error) {
    return {
      success: false,
      status: "😥 Something went wrong: " + error.message,
    }
  }
}
```

C'est une fonction géante ! Maintenant, il nous suffit de connecter notre fonction `mintNFT` à notre composant `Minter.js`...

## Connecter mintNFT à notre frontend Minter.js {#connect-our-frontend}

Ouvrez votre fichier `Minter.js` et mettez à jour la ligne `import { connectWallet, getCurrentWalletConnected } from "./utils/interact.js";` en haut pour qu'elle soit :

```javascript
import {
  connectWallet,
  getCurrentWalletConnected,
  mintNFT,
} from "./utils/interact.js"
```

Enfin, implémentez la fonction `onMintPressed` pour faire un appel await à votre fonction `mintNFT` importée et mettez à jour la variable d'état `status` pour refléter si notre transaction a réussi ou échoué :

```javascript
const onMintPressed = async () => {
  const { status } = await mintNFT(url, name, description)
  setStatus(status)
}
```

## Déployer votre NFT sur un site Web en direct {#deploy-your-nft}

Prêt à mettre votre projet en ligne pour que les utilisateurs puissent interagir avec ? Consultez [ce tutoriel](https://docs.alchemy.com/alchemy/tutorials/nft-minter/how-do-i-deploy-nfts-online) pour déployer votre Minter sur un site Web en direct.

Une dernière étape...

## Prendre le monde de la chaîne de blocs d'assaut {#take-the-blockchain-world-by-storm}

Je plaisante, vous êtes arrivé à la fin du tutoriel !

Pour résumer, en construisant une application de frappe de NFT, vous avez appris avec succès à :

- Vous connecter à MetaMask via votre projet frontend
- Appeler des méthodes de contrat intelligent depuis votre frontend
- Signer des transactions à l'aide de MetaMask

Vraisemblablement, vous aimeriez pouvoir montrer les NFT frappés via votre dapp dans votre portefeuille — alors assurez-vous de consulter notre tutoriel rapide [Comment voir votre NFT dans votre portefeuille](https://www.alchemy.com/docs/how-to-view-your-nft-in-your-mobile-wallet) !

Et, comme toujours, si vous avez des questions, nous sommes là pour vous aider sur le [Discord d'Alchemy](https://discord.gg/gWuC7zB). Nous avons hâte de voir comment vous appliquerez les concepts de ce tutoriel à vos futurs projets !