---
title: Tutoriel pour frapper des NFT
description: "Dans ce tutoriel, vous allez créer un générateur de NFT et apprendre à créer une application décentralisée dApp full-stack en reliant votre contrat intelligent à une interface React, à l'aide de MetaMask et d'autres outils Web3."
author: "smudgil"
tags:
  [
    "solidité",
    "NFT",
    "alchemy",
    "contrats intelligents",
    "frontend",
    "Pinata"
  ]
skill: intermediate
lang: fr
published: 2021-10-06
---

L'un des plus grands défis pour les développeurs venus du Web2 est de comprendre comment connecter son contrat intelligent à un projet d'interface et interagir avec lui.

En construisant un générateur de NFT — une interface simple où vous pouvez saisir un lien vers votre ressource numérique, un titre et une description — vous apprendrez à :

- Vous connecter à MetaMask via votre projet en frontend
- Appeler les méthodes du contrat intelligent depuis votre interface
- Signer des transactions à l'aide de MetaMask

Dans ce tutoriel, nous utiliserons [React](https://react.dev/) comme framework frontend. Puisque ce tutoriel s'intéresse avant tout au développement Web3, nous ne nous attarderons pas à expliquer les bases de React. Au lieu de cela, nous nous concentrerons sur l'ajout de fonctionnalités à notre projet.

En prérequis, il vous faudra un niveau débutant en React — savoir comment fonctionnent les composants, les props, useState/useEffect, et les appels des fonctions de base. Si vous n'avez jamais entendu parler de l'un de ces termes auparavant, vous pouvez consulter ce [tutoriel d'introduction à React](https://react.dev/learn/tutorial-tic-tac-toe). Pour les apprenants plus visuels, nous recommandons vivement cette excellente série de vidéos [Full Modern React Tutorial](https://www.youtube.com/playlist?list=PL4cUxeGkcC9gZD-Tvwfod2gaISzfRiP9d) par Net Ninja.

Et si vous ne l'avez pas déjà fait, vous aurez certainement besoin d'un compte Alchemy pour terminer ce tutoriel ainsi que pour construire quoi que ce soit sur la blockchain. Créez un compte gratuit [ici](https://alchemy.com/).

Sans plus attendre, commençons !

## Création de NFT 101 {#making-nfts-101}

Avant même de commencer à regarder du code, il est important de comprendre comment la fabrication d'un NFT fonctionne. Elle comporte deux étapes :

### Publier un contrat intelligent de NFT sur la blockchain Ethereum {#publish-nft}

La plus grande différence entre les deux normes de contrat intelligent NFT est que l'ERC-1155 est un standard multijeton et inclut la fonctionnalité de lot. Alors que l'ERC-721 est un standard à jeton unique et supporte donc uniquement le transfert d'un jeton à la fois.

### Appeler la fonction de frappe {#minting-function}

Généralement, cette fonction de frappe vous demande de transmettre deux variables en tant que paramètres, premièrement le `destinataire`, qui spécifie l'adresse qui recevra votre NFT fraîchement frappé, et deuxièmement le `tokenURI` du NFT, une chaîne qui renvoie à un document JSON décrivant les métadonnées du NFT.

Les métadonnées d'un NFT sont ce qui lui donne vie, lui permettant d'avoir des propriétés configurables, comme un nom, une description, une image et d'autres attributs. Voici [un exemple de tokenURI](https://gateway.pinata.cloud/ipfs/QmSvBcb4tjdFpajGJhbFAWeK3JAxCdNQLQtr6ZdiSi42V2), qui contient les métadonnées d'un NFT.

Dans ce tutoriel, nous allons nous concentrer sur la deuxième partie, en appelant la fonction existante de frappe d'un contrat intelligent de type NFT avec notre interface React.

[Voici un lien](https://ropsten.etherscan.io/address/0x4C4a07F737Bf57F6632B6CAB089B78f62385aCaE) vers le contrat intelligent de NFT ERC-721 que nous appellerons dans ce tutoriel. Si vous souhaitez apprendre comment nous l'avons créé, nous vous recommandons vivement de consulter notre autre tutoriel, ["Comment créer un NFT"](https://www.alchemy.com/docs/how-to-create-an-nft).

Bien, maintenant que nous comprenons comment la fabrication de NFT fonctionne, clonons nos fichiers et démarrons  !

## Cloner les fichiers de démarrage {#clone-the-starter-files}

Tout d'abord, accédez au [dépôt GitHub nft-minter-tutorial](https://github.com/alchemyplatform/nft-minter-tutorial) pour obtenir les fichiers de démarrage de ce projet. Clonez ce dépôt dans votre environnement local.

Lorsque vous ouvrez ce dépôt `nft-minter-tutorial` cloné, vous remarquerez qu'il contient deux dossiers : `minter-starter-files` et `nft-minter`.

- `minter-starter-files` contient les fichiers de démarrage (essentiellement l'interface utilisateur React) de ce projet. Dans ce tutoriel, **nous travaillerons dans ce répertoire**, où vous apprendrez à donner vie à cette interface utilisateur en la connectant à votre portefeuille Ethereum et à un contrat intelligent de NFT.
- `nft-minter` contient le tutoriel entièrement terminé et est là pour vous servir de **référence** **si vous êtes bloqué.**

Ensuite, ouvrez votre copie de `minter-starter-files` dans votre éditeur de code, puis accédez à votre dossier `src`.

Tout le code que nous allons écrire se trouvera dans le dossier `src`. Nous allons modifier le composant `Minter.js` et écrire des fichiers javascript supplémentaires pour donner à notre projet des fonctionnalités Web3.

## Étape 2 : consultez nos fichiers de démarrage {#step-2-check-out-our-starter-files}

Avant de commencer à coder, il est important de connaître ce qui est déjà fourni dans les fichiers de base.

### Faire fonctionner votre projet React {#get-your-react-project-running}

Commençons par exécuter le projet React dans notre navigateur. La beauté de React est qu'une fois que notre projet est en cours d'exécution dans notre navigateur, toutes les modifications que nous sauvegardons seront mises à jour en direct dans notre navigateur.

Pour faire fonctionner le projet, accédez au répertoire racine du dossier `minter-starter-files` et exécutez `npm install` dans votre terminal pour installer les dépendances du projet :

```bash
cd minter-starter-files
npm install
```

Une fois l'installation terminée, exécutez `npm start` dans votre terminal :

```bash
npm start
```

Cela devrait ouvrir http://localhost:3000/ dans votre navigateur, où vous verrez le frontend pour notre projet. Il devrait se composer de 3 champs : un pour renseigner le lien vers l'actif de votre NFT, un pour le nom de votre NFT, et un pour fournir une description.

Si vous essayez de cliquer sur les boutons « Connect Wallet » (connecter le portefeuille) ou « Mint NFT » (frapper un NFT), vous remarquerez qu'ils ne fonctionnent pas. C'est parce qu'il nous faut encore programmer leur fonctionnalité ! :\)

### Le composant Minter.js {#minter-js}

**REMARQUE :** Assurez-vous d'être dans le dossier `minter-starter-files` et non dans le dossier `nft-minter` !

Retournons dans le dossier `src` de notre éditeur et ouvrons le fichier `Minter.js`. Il est très important de comprendre tout ce qui se trouve dans ce fichier, car c'est le composant principal de React sur lequel nous allons travailler.

En haut de ce fichier, nous avons nos variables d'état que nous mettrons à jour après des événements spécifiques.

```javascript
//Variables d'état
const [walletAddress, setWallet] = useState("")
const [status, setStatus] = useState("")
const [name, setName] = useState("")
const [description, setDescription] = useState("")
const [url, setURL] = useState("")
```

Vous n'avez jamais entendu parler de variables d'état React ou de hooks d'état ? Consultez [cette](https://legacy.reactjs.org/docs/hooks-state.html) documentation.

Voici ce que chacune des variables représente :

- `walletAddress` : une chaîne qui stocke l'adresse du portefeuille de l'utilisateur
- `status` : une chaîne qui contient un message à afficher en bas de l'interface utilisateur
- `name` : une chaîne qui stocke le nom du NFT
- `description` : une chaîne qui stocke la description du NFT
- `url` : une chaîne qui est un lien vers l'actif numérique du NFT

Après les variables d'état, vous verrez trois fonctions non implémentées : `useEffect`, `connectWalletPressed` et `onMintPressed`. Vous remarquerez que toutes ces fonctions sont `async`, c'est parce que nous y effectuerons des appels d'API asynchrones ! Leurs noms correspondent à leurs fonctionnalités :

```javascript
useEffect(async () => {
  //TODO: à implémenter
}, [])

const connectWalletPressed = async () => {
  //TODO: à implémenter
}

const onMintPressed = async () => {
  //TODO: à implémenter
}
```

- [`useEffect`](https://legacy.reactjs.org/docs/hooks-effect.html) : il s'agit d'un hook React qui est appelé après le rendu de votre composant. Comme il reçoit une prop de tableau vide `[]` (voir ligne 3), il ne sera appelé que lors du _premier_ rendu du composant. Ici, nous appellerons notre écouteur de portefeuille et une autre fonction de portefeuille pour mettre à jour notre interface utilisateur afin de déterminer si un portefeuille est déjà connecté.
- `connectWalletPressed` : cette fonction sera appelée pour connecter le portefeuille MetaMask de l'utilisateur à notre dapp.
- `onMintPressed` : cette fonction sera appelée pour frapper le NFT de l'utilisateur.

Vers la fin de ce fichier, nous avons l'interface utilisateur de notre composant. Si vous examinez attentivement ce code, vous remarquerez que nous mettons à jour nos variables d'état `url`, `name` et `description` lorsque l'entrée dans les champs de texte correspondants change.

Vous verrez également que `connectWalletPressed` et `onMintPressed` sont appelées lorsque les boutons avec les ID `mintButton` et `walletButton` sont cliqués respectivement.

```javascript
//L'interface utilisateur de notre composant
return (
  <div className="Minter">
    <button id="walletButton" onClick={connectWalletPressed}>
      {walletAddress.length > 0 ? (
        "Connecté : " +
        String(walletAddress).substring(0, 6) +
        "..." +
        String(walletAddress).substring(38)
      ) : (
        <span>Connecter le portefeuille</span>
      )}
    </button>

    <br></br>
    <h1 id="title">🧙‍♂️ Outil de frappe de NFT Alchemy</h1>
    <p>
      Ajoutez simplement le lien, le nom et la description de votre actif, puis appuyez sur "Frapper le NFT".
    </p>
    <form>
      <h2>🖼 Lien vers l'actif : </h2>
      <input
        type="text"
        placeholder="par ex., https://gateway.pinata.cloud/ipfs/<hash>"
        onChange={(event) => setURL(event.target.value)}
      />
      <h2>🤔 Nom : </h2>
      <input
        type="text"
        placeholder="par ex., Mon premier NFT !"
        onChange={(event) => setName(event.target.value)}
      />
      <h2>✍️ Description : </h2>
      <input
        type="text"
        placeholder="par ex., Encore plus cool que les cryptokitties ;)"
        onChange={(event) => setDescription(event.target.value)}
      />
    </form>
    <button id="mintButton" onClick={onMintPressed}>
      Frapper le NFT
    </button>
    <p id="status">{status}</p>
</div>
)
```

Enfin, occupons-nous de l'endroit où ajouter ce composant Minter.

Si vous allez dans le fichier `App.js`, qui est le composant principal de React et qui sert de conteneur pour tous les autres composants, vous verrez que notre composant Minter est injecté à la ligne 7.

**Dans ce tutoriel, nous ne modifierons que le fichier `Minter.js` et ajouterons des fichiers dans notre dossier `src`.**

Maintenant que nous comprenons ce avec quoi nous travaillons, mettons en place notre portefeuille Ethereum !

## Configurer votre portefeuille Ethereum {#set-up-your-ethereum-wallet}

Pour que les utilisateurs puissent interagir avec votre contrat intelligent, ils devront connecter leur portefeuille Ethereum à votre dApp.

### Télécharger MetaMask {#download-metamask}

Pour ce tutoriel, nous allons utiliser MetaMask, un portefeuille virtuel intégré au navigateur, servant à gérer les adresses de votre compte Ethereum. Si vous voulez en savoir plus sur le fonctionnement des transactions sur Ethereum, consultez [cette page](/developers/docs/transactions/).

Vous pouvez télécharger et créer un compte MetaMask gratuitement [ici](https://metamask.io/download). Lorsque vous créez un compte, ou si vous en avez déjà un, assurez-vous de basculer sur « Réseau de test Ropsten » en haut à droite \(afin de ne pas utiliser d'argent réel\).

### Ajouter de l'ether depuis un robinet {#add-ether-from-faucet}

Afin de frapper nos NFT (ou de signer des transactions sur la blockchain Ethereum), nous aurons besoin de faux Eth. Pour obtenir de l'ETH, vous pouvez vous rendre sur le [robinet Ropsten](https://faucet.ropsten.be/), saisir l'adresse de votre compte Ropsten, puis cliquer sur « Send Ropsten Eth ». Vous devriez voir les ETH dans votre compte MetaMask peu de temps après !

### Vérifier votre solde {#check-your-balance}

Pour vérifier que notre solde est bien là, faisons une requête [eth_getBalance](https://docs.alchemyapi.io/alchemy/documentation/alchemy-api-reference/json-rpc#eth_getbalance) en utilisant l'[outil de composition d'Alchemy](https://composer.alchemyapi.io/?composer_state=%7B%22network%22%3A0%2C%22methodName%22%3A%22eth_getBalance%22%2C%22paramValues%22%3A%5B%22%22%2C%22latest%22%5D%7D). Cela va retourner la quantité d'ETH que contient votre portefeuille. Après avoir entré l'adresse de votre compte MetaMask et cliqué sur « Send Request », vous devriez voir une réponse comme celle-ci :

```text
{"jsonrpc": "2.0", "id": 0, "result": "0xde0b6b3a7640000"}
```

**REMARQUE :** ce résultat est en wei et non en eth. Le wei est utilisé comme la plus petite dénomination d'ether. La conversion de wei vers eth est : 1 eth = 10¹⁸ wei. Donc si on convertit 0xde0b6b3a7640000 en nombre décimal, nous obtenons 1\*10¹⁸ ce qui correspond à 1 eth.

Ouf ! Notre faux argent est bien là ! <Emoji text=":money_mouth_face:" size={1} />

## Connecter MetaMask à votre interface utilisateur {#connect-metamask-to-your-UI}

Maintenant que notre portefeuille MetaMask est configuré, connectons-y notre dApp !

Parce que nous voulons adhérer au paradigme [MVC](https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93controller), nous allons créer un fichier séparé qui contient nos fonctions pour gérer la logique, les données et les règles de notre dapp, puis transmettre ces fonctions à notre frontend (notre composant Minter.js).

### La fonction `connectWallet` {#connect-wallet-function}

Pour ce faire, créons un nouveau dossier appelé `utils` dans votre répertoire `src` et ajoutons-y un fichier appelé `interact.js`, qui contiendra toutes nos fonctions d'interaction avec le portefeuille et le contrat intelligent.

Dans notre fichier `interact.js`, nous allons écrire une fonction `connectWallet`, que nous importerons et appellerons ensuite dans notre composant `Minter.js`.

Dans votre fichier `interact.js`, ajoutez ce qui suit

```javascript
export const connectWallet = async () => {
  if (window.ethereum) {
    try {
      const addressArray = await window.ethereum.request({
        method: "eth_requestAccounts",
      })
      const obj = {
        status: "👆🏽 Écrivez un message dans le champ de texte ci-dessus.",
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
              Vous devez installer MetaMask, un portefeuille Ethereum virtuel, dans votre
              navigateur.
            </a>
          </p>
        </span>
      ),
    }
  }
}
```

Décomposons ce que fait ce code :

Tout d'abord, notre fonction vérifie si `window.ethereum` est activé dans votre navigateur.

`window.ethereum` est une API globale injectée par MetaMask et d'autres fournisseurs de portefeuilles qui permet aux sites Web de demander les comptes Ethereum des utilisateurs. S'il est approuvé, un site peut lire les données des blockchains auxquels l'utilisateur est connecté et proposer à l'utilisateur de signer des messages et des transactions. Consultez la [documentation de MetaMask](https://docs.metamask.io/guide/ethereum-provider.html#table-of-contents) pour plus d'informations !

Si `window.ethereum` n'_est pas_ présent, cela signifie que MetaMask n'est pas installé. Cela se traduit par le renvoi d'un objet JSON, où l'`address` renvoyée est une chaîne vide, et où l'objet `status` JSX relaie que l'utilisateur doit installer MetaMask.

**La plupart des fonctions que nous écrivons renverront des objets JSON que nous pourrons utiliser pour mettre à jour nos variables d'état et notre interface utilisateur.**

Maintenant, si `window.ethereum` _est_ présent, c'est là que les choses deviennent intéressantes.

À l'aide d'une boucle try/catch, nous allons essayer de nous connecter à MetaMask en appelant [`window.ethereum.request({ method: "eth_requestAccounts" });`](https://docs.metamask.io/guide/rpc-api.html#eth-requestaccounts). L'appel de cette fonction ouvrira MetaMask dans le navigateur, où l'utilisateur sera invité à connecter son portefeuille à votre dApp.

- Si l'utilisateur choisit de se connecter, `method: "eth_requestAccounts"` renverra un tableau contenant toutes les adresses de compte de l'utilisateur qui sont connectées à la dapp. Au total, notre fonction `connectWallet` renverra un objet JSON qui contient la _première_ `adresse` de ce tableau (voir ligne 9) et un message `d'état` qui invite l'utilisateur à écrire un message au contrat intelligent.
- Si l'utilisateur rejette la connexion, l'objet JSON contiendra une chaîne vide pour l'`address` renvoyée et un message `d'état` indiquant que l'utilisateur a rejeté la connexion.

### Ajouter la fonction connectWallet à votre composant d'interface utilisateur Minter.js {#add-connect-wallet}

Maintenant que nous avons écrit cette fonction `connectWallet`, connectons-la à notre composant `Minter.js`.

Tout d'abord, nous devrons importer notre fonction dans notre fichier `Minter.js` en ajoutant `import { connectWallet } from "./utils/interact.js";` au début du fichier `Minter.js`. Vos 11 premières lignes de `Minter.js` devraient maintenant ressembler à ceci :

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

Remarquez-vous que la plupart de nos fonctionnalités sont extraites de notre composant `Minter.js` à partir du fichier `interact.js` ? C'est ainsi que nous respectons le paradigme M-V-C !

Dans `connectWalletPressed`, nous effectuons simplement un appel en attente vers notre fonction importée `connectWallet` et, à l'aide de sa réponse, nous mettons à jour nos variables `status` et `walletAddress` via leurs hooks d'état.

Maintenant, enregistrons les deux fichiers `Minter.js` et `interact.js` et testons notre interface utilisateur jusqu'à présent.

Ouvrez votre navigateur sur localhost:3000, et cliquez sur le bouton « Connect Wallet » en haut à droite de la page.

Si MetaMask est installé, vous devriez être invité à connecter votre portefeuille à votre dApp. Accepter l'invitation à se connecter.

Vous devriez voir que le bouton du portefeuille précise maintenant que votre adresse est connectée.

Ensuite, essayez de rafraîchir la page... c'est étrange. Notre bouton de portefeuille nous invite à connecter MetaMask bien qu'il soit déjà connecté...

Mais ne vous inquiétez pas ! Nous pouvons facilement résoudre ce problème en implémentant une fonction appelée `getCurrentWalletConnected`, qui vérifiera si une adresse est déjà connectée à notre dapp et mettra à jour notre interface utilisateur en conséquence !

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
          status: "👆🏽 Écrivez un message dans le champ de texte ci-dessus.",
        }
      } else {
        return {
          address: "",
          status: "🦊 Connectez-vous à MetaMask en utilisant le bouton en haut à droite.",
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
              Vous devez installer MetaMask, un portefeuille Ethereum virtuel, dans votre
              navigateur.
            </a>
          </p>
        </span>
      ),
    }
  }
}
```

Ce code est _très_ similaire à la fonction `connectWallet` que nous venons d'écrire.

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

Notez que nous utilisons la réponse de notre appel à `getCurrentWalletConnected` pour mettre à jour nos variables d'état `walletAddress` et `status`.

Une fois que vous avez ajouté ce code, essayez de rafraîchir votre fenêtre de navigateur. Le bouton devrait indiquer que vous êtes connecté et afficher un aperçu de l'adresse de votre portefeuille connecté, même après avoir été actualisé !

### Implémenter addWalletListener {#implement-add-wallet-listener}

La dernière étape de la configuration de notre dApp de portefeuille consiste à mettre en place le listener de portefeuille afin que notre interface utilisateur soit mise à jour lorsque l'état de notre portefeuille change, par exemple lorsque l'utilisateur se déconnecte ou change de compte.

Dans votre fichier `Minter.js`, ajoutez une fonction `addWalletListener` qui ressemble à ce qui suit :

```javascript
function addWalletListener() {
  if (window.ethereum) {
    window.ethereum.on("accountsChanged", (accounts) => {
      if (accounts.length > 0) {
        setWallet(accounts[0])
        setStatus("👆🏽 Écrivez un message dans le champ de texte ci-dessus.")
      } else {
        setWallet("")
        setStatus("🦊 Connectez-vous à MetaMask en utilisant le bouton en haut à droite.")
      }
    })
  } else {
    setStatus(
      <p>
        {" "}
        🦊 <a target="_blank" href={`https://metamask.io/download`}>
          Vous devez installer MetaMask, un portefeuille Ethereum virtuel, dans votre navigateur.
        </a>
      </p>
    )
  }
}
```

Décomposons rapidement ce qui se passe ici :

- Tout d'abord, notre fonction vérifie si `window.ethereum` est activé (c'est-à-dire si MetaMask est installé).
  - Si ce n'est pas le cas, nous définissons simplement notre variable d'état `status` sur une chaîne JSX qui invite l'utilisateur à installer MetaMask.
  - S'il est activé, nous configurons l'écouteur `window.ethereum.on("accountsChanged")` à la ligne 3 qui écoute les changements d'état dans le portefeuille MetaMask, qui incluent le moment où l'utilisateur connecte un compte supplémentaire à la dapp, change de compte ou déconnecte un compte. S'il y a au moins un compte connecté, la variable d'état `walletAddress` est mise à jour en tant que premier compte dans le tableau `accounts` renvoyé par l'écouteur. Sinon, `walletAddress` est défini comme une chaîne vide.

Enfin, nous devons l'appeler dans notre fonction `useEffect` :

```javascript
useEffect(async () => {
  const { address, status } = await getCurrentWalletConnected()
  setWallet(address)
  setStatus(status)

  addWalletListener()
}, [])
```

Et voilà ! Nous avons terminé la programmation de toutes les fonctionnalités de notre portefeuille ! Maintenant que notre portefeuille est configuré, regardons comment créer notre NFT !

## NFT Metadonnées 101 {#nft-metadata-101}

Rappelez-vous que les métadonnées NFT dont nous venons de parler à l'étape 0 de ce tutoriel, donnent vie à un NFT, lui permettant d'avoir des propriétés, comme un actif numérique, un nom, une description et d'autres attributs.

Nous allons devoir configurer ces métadonnées en tant qu'objet JSON et les stocker, afin de pouvoir les transmettre en tant que paramètre `tokenURI` lors de l'appel de la fonction `mintNFT` de notre contrat intelligent.

Le texte des champs « Lien vers l'actif », « Nom » et « Description » comprendra les différentes propriétés des métadonnées de notre NFT. Nous allons formater ces métadonnées sous la forme d'un objet JSON, mais il existe plusieurs options pour le stockage de cet objet JSON :

- Nous pourrions la stocker sur la blockchain Ethereum, mais cela serait très coûteux.
- Nous pourrions le stocker sur un serveur centralisé, comme AWS ou Firebase. Mais cela irait à l'encontre de notre philosophie de décentralisation.
- Nous pourrions utiliser IPFS, un protocole décentralisé et un réseau peer-to-peer pour stocker et partager des données dans un système de fichiers distribué. Comme ce protocole est décentralisé et gratuit, c'est notre meilleure option !

Pour stocker nos métadonnées sur IPFS, nous utiliserons [Pinata](https://pinata.cloud/), une API et une boîte à outils IPFS pratiques. Dans l'étape suivante, nous vous expliquerons exactement comment faire !

## Utiliser Pinata pour épingler vos métadonnées sur IPFS {#use-pinata-to-pin-your-metadata-to-IPFS}

Si vous n'avez pas de compte [Pinata](https://pinata.cloud/), créez un compte gratuit [ici](https://app.pinata.cloud/auth/signup) et suivez les étapes pour vérifier votre e-mail et votre compte.

### Créez votre clé API Pinata {#create-pinata-api-key}

Accédez à la page [https://pinata.cloud/keys](https://pinata.cloud/keys), puis sélectionnez le bouton « Nouvelle clé » en haut, activez le widget Admin et nommez votre clé.

Vous verrez ensuite une popup avec vos infos d'API. Assurez-vous de mettre cela dans un endroit sûr.

Maintenant que notre clé est configurée, ajoutons-la à notre projet pour que nous puissions l'utiliser.

### Créer un fichier .env {#create-a-env}

Nous pouvons stocker en toute sécurité notre clé et notre secret Pinata dans un fichier d'environnement. Installons le [paquetage dotenv](https://www.npmjs.com/package/dotenv) dans le répertoire de votre projet.

Ouvrez un nouvel onglet dans votre terminal (distinct de celui qui exécute l'hôte local) et assurez-vous que vous êtes dans le dossier `minter-starter-files`, puis exécutez la commande suivante dans votre terminal :

```text
npm install dotenv --save
```

Ensuite, créez un fichier `.env` dans le répertoire racine de votre `minter-starter-files` en saisissant ce qui suit sur votre ligne de commande :

```javascript
vim.env
```

Cela ouvrira votre fichier `.env` dans vim (un éditeur de texte). Pour l'enregistrer, appuyez sur « esc » + « : » + « q » sur votre clavier et dans cet ordre.

Ensuite, dans VSCode, accédez à votre fichier `.env` et ajoutez-y votre clé API et votre secret API Pinata, comme ceci :

```text
REACT_APP_PINATA_KEY = <pinata-api-key>
REACT_APP_PINATA_SECRET = <pinata-api-secret>
```

Enregistrez le fichier et vous êtes prêt à commencer à écrire la fonction pour télécharger vos métadonnées JSON sur IPFS !

### Implémenter pinJSONToIPFS {#pin-json-to-ipfs}

Heureusement pour nous, Pinata dispose d'une [API spécialement conçue pour téléverser des données JSON vers IPFS](https://docs.pinata.cloud/api-reference/endpoint/ipfs/pin-json-to-ipfs#pin-json) et d'un exemple pratique JavaScript avec axios que nous pouvons utiliser, avec quelques légères modifications.

Dans votre dossier `utils`, créons un autre fichier appelé `pinata.js`, puis importons notre secret et notre clé Pinata depuis le fichier .env comme ceci :

```javascript
require("dotenv").config()
const key = process.env.REACT_APP_PINATA_KEY
const secret = process.env.REACT_APP_PINATA_SECRET
```

Ensuite, collez le code supplémentaire ci-dessous dans votre fichier `pinata.js`. Ne vous inquiétez pas, nous allons expliquer ce que tout cela signifie !

```javascript
require("dotenv").config()
const key = process.env.REACT_APP_PINATA_KEY
const secret = process.env.REACT_APP_PINATA_SECRET

const axios = require("axios")

export const pinJSONToIPFS = async (JSONBody) => {
  const url = `https://api.pinata.cloud/pinning/pinJSONToIPFS`
  //faire une requête POST axios à Pinata ⬇️
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

Tout d'abord, il importe [axios](https://www.npmjs.com/package/axios), un client HTTP basé sur les promesses pour le navigateur et node.js, que nous utiliserons pour faire une requête à Pinata.

Ensuite, nous avons notre fonction asynchrone `pinJSONToIPFS`, qui prend un `JSONBody` en entrée et la clé et le secret de l'API Pinata dans son en-tête, le tout pour effectuer une requête POST à leur API `pinJSONToIPFS`.

- Si cette requête POST réussit, notre fonction renvoie un objet JSON avec le booléen `success` à « true » et l'`pinataUrl` où nos métadonnées ont été épinglées. Nous utiliserons cette `pinataUrl` renvoyée comme entrée `tokenURI` pour la fonction de frappe de notre contrat intelligent.
- Si cette requête POST échoue, notre fonction renvoie un objet JSON avec le booléen `success` à « false » et une chaîne `message` qui relaie notre erreur.

Comme pour les types de retour de notre fonction `connectWallet`, nous renvoyons des objets JSON afin de pouvoir utiliser leurs paramètres pour mettre à jour nos variables d'état et notre interface utilisateur.

## Charger votre contrat intelligent {#load-your-smart-contract}

Maintenant que nous avons un moyen de téléverser nos métadonnées NFT sur IPFS via notre fonction `pinJSONToIPFS`, nous allons avoir besoin d'un moyen de charger une instance de notre contrat intelligent afin de pouvoir appeler sa fonction `mintNFT`.

Comme nous l'avons mentionné précédemment, dans ce tutoriel, nous utiliserons [ce contrat intelligent de NFT existant](https://ropsten.etherscan.io/address/0x4C4a07F737Bf57F6632B6CAB089B78f62385aCaE) ; cependant, si vous souhaitez apprendre comment nous l'avons créé, ou en créer un vous-même, nous vous recommandons vivement de consulter notre autre tutoriel, ["Comment créer un NFT."](https://www.alchemy.com/docs/how-to-create-an-nft).

### L'ABI du contrat {#contract-abi}

Si vous avez examiné attentivement nos fichiers, vous aurez remarqué que dans notre répertoire `src`, il y a un fichier `contract-abi.json`. Une ABI est nécessaire pour spécifier quelle fonction un contrat invoquera en s'assurant également que la fonction retournera des données dans le format que vous attendez.

Nous allons également avoir besoin d'une clé API Alchemy et de l'API Alchemy Web3 pour nous connecter à la blockchain Ethereum et charger notre contrat intelligent.

### Créez votre clé API Alchemy {#create-alchemy-api}

Si vous n'avez pas encore de compte Alchemy, [inscrivez-vous gratuitement ici.](https://alchemy.com/?a=eth-org-nft-minter)

Une fois votre compte Alchemy créé, vous pouvez générer une clé API en créant une application. Cela va nous permettre d'émettre des requêtes sur le réseau de test Ropsten.

Accédez à la page "Create App" dans votre Tableau de bord Alchemy, en survolant "Apps" dans la barre de navigation et en cliquant sur "Create App".

Nommez votre application. Ici nous avons choisi "My First NFT!", donnez une brève description, sélectionnez "Staging" pour l'environnement utilisé pour la comptabilité de votre application, et choisissez "Ropsten" pour votre réseau.

Cliquez sur « Create app », et voilà ! Votre application devrait apparaître dans le tableau ci-dessous.

Génial ! Maintenant que nous avons créé notre URL pour l'API HTTP Alchemy, copiez-la dans votre presse-papiers...

…et ensuite ajoutons-la à notre fichier `.env`. Dans l'ensemble, votre fichier <code>.env</code> devrait ressembler à ceci :

```text
REACT_APP_PINATA_KEY = <pinata-key>
REACT_APP_PINATA_SECRET = <pinata-secret>
REACT_APP_ALCHEMY_KEY = https://eth-ropsten.alchemyapi.io/v2/<alchemy-key>
```

Maintenant que nous avons notre ABI de contrat et notre clé d'API Alchemy, nous sommes prêts à charger notre contrat intelligent en utilisant [Alchemy Web3](https://github.com/alchemyplatform/alchemy-web3).

### Configurer votre point de terminaison et votre contrat Alchemy Web3 {#setup-alchemy-endpoint}

Tout d'abord, si vous ne l'avez pas déjà, vous devrez installer [Alchemy Web3](https://github.com/alchemyplatform/alchemy-web3) en naviguant vers le répertoire de base : `nft-minter-tutorial` dans le terminal :

```text
cd ..
npm install @alch/alchemy-web3
```

Revenons maintenant à notre fichier `interact.js`. En haut du fichier, ajoutez le code suivant pour importer votre clé Alchemy à partir de votre fichier <code>.env</code> et configurez votre point de terminaison Alchemy Web3 :

```javascript
require("dotenv").config()
const alchemyKey = process.env.REACT_APP_ALCHEMY_KEY
const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(alchemyKey)
```

[Alchemy Web3](https://github.com/alchemyplatform/alchemy-web3) est un wrapper autour de [Web3.js](https://docs.web3js.org/), qui fournit des méthodes API améliorées et d'autres avantages cruciaux pour vous faciliter la vie en tant que développeur web3. Il est conçu pour nécessiter une configuration minimale afin que vous puissiez commencer à l'utiliser immédiatement dans votre application !

Ensuite, ajoutons notre contrat ABI et l'adresse de notre contrat à notre fichier.

```javascript
require("dotenv").config()
const alchemyKey = process.env.REACT_APP_ALCHEMY_KEY
const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(alchemyKey)

const contractABI = require("../contract-abi.json")
const contractAddress = "0x4C4a07F737Bf57F6632B6CAB089B78f62385aCaE"
```

Une fois que nous avons les deux, nous sommes prêts à commencer à coder notre fonction de frappage !

## Implémenter la fonction mintNFT {#implement-the-mintnft-function}

À l'intérieur de votre fichier `interact.js`, définissons notre fonction, `mintNFT`, qui, comme son nom l'indique, frappera notre NFT.

Parce que nous allons réaliser de nombreux appels asynchrones (à Pinata pour épingler nos métadonnées à IPFS, Alchemy Web3 pour charger notre contrat intelligent, et MetaMask pour signer nos transactions), notre fonction sera également asynchrone.

Les trois entrées de notre fonction seront l'`url` de notre actif numérique, le `name` et la `description`. Ajoutez la signature de fonction suivante sous la fonction `connectWallet` :

```javascript
export const mintNFT = async (url, name, description) => {}
```

### Gestion des erreurs de saisie {#input-error-handling}

Naturellement, il est logique d'avoir une sorte de gestion des erreurs d'entrée au début de la fonction et ainsi, nous quitterons cette fonction si nos paramètres d'entrée ne sont pas corrects. Dans notre fonction, ajoutons le code suivant :

```javascript
export const mintNFT = async (url, name, description) => {
  //gestion des erreurs
  if (url.trim() == "" || name.trim() == "" || description.trim() == "") {
    return {
      success: false,
      status: "❗Veuillez vous assurer que tous les champs sont remplis avant la frappe.",
    }
  }
}
```

Essentiellement, si l'un des paramètres d'entrée est une chaîne vide, nous renvoyons un objet JSON où le booléen `success` est à « false », et la chaîne `status` relaie que tous les champs de notre interface utilisateur doivent être remplis.

### Téléverser les métadonnées sur IPFS {#upload-metadata-to-ipfs}

Une fois que nous savons que nos métadonnées sont formatées correctement, l'étape suivante consiste à les envelopper dans un objet JSON et à les téléverser sur IPFS via le `pinJSONToIPFS` que nous avons écrit !

Pour ce faire, nous devons d'abord importer la fonction `pinJSONToIPFS` dans notre fichier `interact.js`. Tout en haut du fichier `interact.js`, ajoutons :

```javascript
import { pinJSONToIPFS } from "./pinata.js"
```

Rappelez-vous que `pinJSONToIPFS` prend un corps JSON. Ainsi, avant de l'appeler, nous allons devoir formater nos paramètres `url`, `name` et `description` dans un objet JSON.

Mettons à jour notre code pour créer un objet JSON appelé `metadata`, puis appelons `pinJSONToIPFS` avec ce paramètre `metadata` :

```javascript
export const mintNFT = async (url, name, description) => {
  //gestion des erreurs
  if (url.trim() == "" || name.trim() == "" || description.trim() == "") {
    return {
      success: false,
      status: "❗Veuillez vous assurer que tous les champs sont remplis avant la frappe.",
    }
  }

  //créer les métadonnées
  const metadata = new Object()
  metadata.name = name
  metadata.image = url
  metadata.description = description

  //faire un appel pinata
  const pinataResponse = await pinJSONToIPFS(metadata)
  if (!pinataResponse.success) {
    return {
      success: false,
      status: "😢 Une erreur s'est produite lors du téléversement de votre tokenURI.",
    }
  }
  const tokenURI = pinataResponse.pinataUrl
}
```

Notez que nous stockons la réponse de notre appel à `pinJSONToIPFS(metadata)` dans l'objet `pinataResponse`. Ensuite, nous analysons cet objet pour vérifier les erreurs.

En cas d'erreur, nous renvoyons un objet JSON où le booléen `success` est à « false » et notre chaîne `status` relaie que notre appel a échoué. Sinon, nous extrayons la `pinataURL` de la `pinataResponse` et la stockons en tant que notre variable `tokenURI`.

Maintenant, il est temps de charger notre contrat intelligent en utilisant l'API Alchemy Web3 que nous avons initialisée en haut de notre fichier. Ajoutez la ligne de code suivante au bas de la fonction `mintNFT` pour définir le contrat dans la variable globale `window.contract` :

```javascript
window.contract = await new web3.eth.Contract(contractABI, contractAddress)
```

La dernière chose à ajouter dans notre fonction `mintNFT` est notre transaction Ethereum :

```javascript
//configurer votre transaction Ethereum
const transactionParameters = {
  to: contractAddress, // Requis sauf lors des publications de contrats.
  from: window.ethereum.selectedAddress, // doit correspondre à l'adresse active de l'utilisateur.
  data: window.contract.methods
    .mintNFT(window.ethereum.selectedAddress, tokenURI)
    .encodeABI(), //faire appel au contrat intelligent NFT
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
      "✅ Consultez votre transaction sur Etherscan : https://ropsten.etherscan.io/tx/" +
      txHash,
  }
} catch (error) {
  return {
    success: false,
    status: "😥 Quelque chose s'est mal passé : " + error.message,
  }
}
```

Si vous êtes déjà familier avec les transactions Ethereum, vous remarquerez que la structure est assez similaire à ce que vous avez déjà vu.

- Tout d'abord, nous configurons nos paramètres de transactions.
  - `to` spécifie l'adresse du destinataire (notre contrat intelligent)
  - `from` spécifie le signataire de la transaction (l'adresse connectée de l'utilisateur à MetaMask : `window.ethereum.selectedAddress`)
  - `data` contient l'appel à la méthode `mintNFT` de notre contrat intelligent, qui reçoit notre `tokenURI` et l'adresse du portefeuille de l'utilisateur, `window.ethereum.selectedAddress`, comme entrées
- Ensuite, nous effectuons un appel en attente, `window.ethereum.request`, où nous demandons à MetaMask de signer la transaction. Notez que, dans cette requête, nous spécifions notre méthode eth (`eth_SentTransaction`) et nous transmettons nos `transactionParameters`. À ce stade, MetaMask s'ouvrira dans le navigateur, et demandera à l'utilisateur de signer ou rejeter la transaction.
  - Si la transaction réussit, la fonction renverra un objet JSON où le booléen `success` est à « true » et la chaîne `status` invite l'utilisateur à consulter Etherscan pour plus d'informations sur sa transaction.
  - Si la transaction échoue, la fonction renverra un objet JSON où le booléen `success` est à « false », et la chaîne `status` relaie le message d'erreur.

Au total, notre fonction `mintNFT` devrait ressembler à ceci :

```javascript
export const mintNFT = async (url, name, description) => {
  //gestion des erreurs
  if (url.trim() == "" || name.trim() == "" || description.trim() == "") {
    return {
      success: false,
      status: "❗Veuillez vous assurer que tous les champs sont remplis avant la frappe.",
    }
  }

  //créer les métadonnées
  const metadata = new Object()
  metadata.name = name
  metadata.image = url
  metadata.description = description

  //requête d'épinglage pinata
  const pinataResponse = await pinJSONToIPFS(metadata)
  if (!pinataResponse.success) {
    return {
      success: false,
      status: "😢 Une erreur s'est produite lors du téléversement de votre tokenURI.",
    }
  }
  const tokenURI = pinataResponse.pinataUrl

  //charger le contrat intelligent
  window.contract = await new web3.eth.Contract(contractABI, contractAddress) //loadContract();

  //configurer votre transaction Ethereum
  const transactionParameters = {
    to: contractAddress, // Requis sauf lors des publications de contrats.
    from: window.ethereum.selectedAddress, // doit correspondre à l'adresse active de l'utilisateur.
    data: window.contract.methods
      .mintNFT(window.ethereum.selectedAddress, tokenURI)
      .encodeABI(), //faire appel au contrat intelligent NFT
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
        "✅ Consultez votre transaction sur Etherscan : https://ropsten.etherscan.io/tx/" +
        txHash,
    }
  } catch (error) {
    return {
      success: false,
      status: "😥 Quelque chose s'est mal passé : " + error.message,
    }
  }
}
```

C'est une fonction géante ! Maintenant, nous devons simplement connecter notre fonction `mintNFT` à notre composant `Minter.js`...

## Connecter mintNFT à notre frontend Minter.js {#connect-our-frontend}

Ouvrez votre fichier `Minter.js` et mettez à jour la ligne `import { connectWallet, getCurrentWalletConnected } from "./utils/interact.js";` en haut pour :

```javascript
import {
  connectWallet,
  getCurrentWalletConnected,
  mintNFT,
} from "./utils/interact.js"
```

Enfin, implémentez la fonction `onMintPressed` pour faire un appel en attente vers votre fonction `mintNFT` importée et mettre à jour la variable d'état `status` pour refléter si notre transaction a réussi ou a échoué :

```javascript
const onMintPressed = async () => {
  const { status } = await mintNFT(url, name, description)
  setStatus(status)
}
```

## Déployez votre NFT sur un site web en direct {#deploy-your-NFT}

Prêt à mettre en ligne votre projet pour que les utilisateurs puissent interagir avec ? Consultez [ce tutoriel](https://docs.alchemy.com/alchemy/tutorials/nft-minter/how-do-i-deploy-nfts-online) pour déployer votre Minter sur un site web en direct.

Encore une dernière étape...

## Prenez d'assaut le monde de la blockchain {#take-the-blockchain-world-by-storm}

Je plaisante, vous êtes arrivé à la fin du tutoriel !

Pour récapituler, en construisant un Minter de NFT, vous avez appris avec succès à :

- Vous connecter à MetaMask via votre projet en frontend
- Appeler les méthodes du contrat intelligent depuis votre interface
- Signer des transactions à l'aide de MetaMask

Vraisemblablement, vous aimeriez pouvoir montrer les NFT frappés via votre dapp dans votre portefeuille — alors n'oubliez pas de consulter notre tutoriel rapide [Comment voir votre NFT dans votre portefeuille](https://www.alchemy.com/docs/how-to-view-your-nft-in-your-mobile-wallet) !

Et, comme toujours, si vous avez des questions, nous sommes là pour vous aider dans le [Discord d'Alchemy](https://discord.gg/gWuC7zB). Nous avons hâte de voir comment vous appliquez les concepts de ce tutoriel à vos futurs projets !
