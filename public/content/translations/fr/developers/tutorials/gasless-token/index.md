---
title: "Permettre à vos utilisateurs sans gaz de détenir des jetons et d'appeler des contrats"
description: Grâce à l'abstraction de compte, nous pouvons créer des portefeuilles de contrats intelligents qui acceptent les transactions envoyées par un EOA spécifique ou signées par cet EOA. Ces contrats intelligents peuvent ensuite posséder des jetons, qui sont sous le contrôle de l'EOA.
author: Ori Pomerantz
tags: ["sans gaz", "erc-20", "abstraction de compte"]
skill: intermediate
breadcrumb: Jeton sans gaz
lang: fr
published: 2026-04-01
---

## Introduction {#introduction}

Un [article précédent](/developers/tutorials/gasless/) a abordé l'utilisation d'un accès sans gaz à votre propre application à l'aide des signatures EIP-712, mais cela se limite à vos propres contrats intelligents. En utilisant l'[abstraction de compte](/roadmap/account-abstraction/), nous pouvons créer des portefeuilles de contrats intelligents qui acceptent deux types de transactions et les relaient vers une destination demandée :

- Les transactions envoyées par un EOA spécifique (ce qui nécessite que cet EOA possède de l'ETH)
- Les transactions envoyées de n'importe où, mais signées par le même EOA.

De cette façon, nous pouvons fournir un moyen sans gaz pour un compte de détenir des actifs (jetons, etc.) et d'exécuter toutes les fonctions qu'un EOA avec du gaz peut accomplir.

### Pourquoi ne pouvons-nous pas simplement relayer la requête ? {#why-no-tx-origin}

Dans la norme ERC-20 et les normes associées, le propriétaire du compte est [`msg.sender`](https://docs.soliditylang.org/en/latest/cheatsheet.html#block-and-transaction-properties), l'adresse qui a appelé le contrat de jeton, qui n'est pas nécessairement l'initiateur de la transaction, [`tx.origin`](https://docs.soliditylang.org/en/latest/cheatsheet.html#block-and-transaction-properties). Ceci est requis pour des [raisons de sécurité](https://docs.soliditylang.org/en/v0.8.35-pre.1/security-considerations.html#tx-origin). Cela signifie que si nous relayons des requêtes de transfert de jetons, elles tenteront de transférer des jetons depuis l'adresse du relayeur plutôt que depuis une adresse contrôlée par l'utilisateur.

Il existe une solution qui vous permet d'utiliser l'adresse EOA via l'[EIP-7702](https://eip7702.io/), mais elle nécessite de signer une délégation potentiellement dangereuse, vous ne pouvez donc l'utiliser que pour déléguer à un contrat intelligent approuvé par le fournisseur du portefeuille. Pour ce tutoriel, je préfère la méthode beaucoup plus simple consistant à créer un contrat intelligent servant de proxy pour l'utilisateur.

## Le voir en action {#in-action}

1. Assurez-vous d'avoir à la fois [Node](https://nodejs.org/en/download) et [Foundry](https://www.getfoundry.sh/introduction/installation).

2. Clonez l'application et installez les logiciels nécessaires.

   ```sh
   git clone https://github.com/qbzzt/260315-gasless-tokens.git
   cd 260315-gasless-tokens
   forge build
   cd server
   npm install
   ```

3. Modifiez `.env` pour définir `SEPOLIA_PRIVATE_KEY` sur un portefeuille qui possède de l'ETH sur Sepolia. Si vous avez besoin d'ETH Sepolia, [utilisez un faucet](/developers/docs/networks/#sepolia) pour en obtenir. Idéalement, cette clé privée devrait être différente de celle que vous avez dans le portefeuille de votre navigateur.

4. Démarrez le serveur.

   ```sh
   npm run dev
   ```

5. Accédez à l'application à l'URL [`http://localhost:5173`](http://localhost:5173).

6. Cliquez sur **Connect with Injected** pour vous connecter à un portefeuille. Approuvez dans le portefeuille, et approuvez le changement vers Sepolia si nécessaire.

7. Faites défiler vers le bas et cliquez sur **Deploy UserProxy (slow process)**.

8. Vous pouvez voir quand le proxy utilisateur est déployé car il y a une adresse à côté de **UserProxy access**. Si vous avez attendu 24 secondes (2 blocs) et que cela ne s'est toujours pas produit, il se peut qu'il y ait un problème avec la détection des changements.

   Si c'est le cas, allez sur l'[explorateur de blocs Sepolia](https://eth-sepolia.blockscout.com/) et entrez le hachage de transaction de déploiement que vous voyez dans la sortie du serveur à `npm run dev`. Cliquez sur le contrat créé pour voir son adresse, puis copiez-la. Collez l'adresse dans le champ _Or enter existing proxy address_, puis cliquez sur **Set proxy address**.

9. Cliquez sur **Request more tokens for proxy** pour soumettre un appel à la fonction [`faucet`](https://eth-sepolia.blockscout.com/address/0x4cBedDEDA88fDd9e116618a5cD71BB0E440C2A78?tab=read_write_contract#0xde5f72fd) du contrat ERC-20 afin d'obtenir des jetons. **Confirmez** la signature dans le portefeuille. Bien sûr, les jetons arrivent à l'adresse du proxy, et non à celle de l'utilisateur.

10. Faites défiler vers le bas et cliquez sur le lien sous _Last transaction:_. Cela ouvrira le navigateur pour vous montrer la transaction `faucet`.

11. Dans _amount to transfer_, entrez un nombre entre un et mille. Cliquez sur **Transfer** pour transférer les jetons vers votre propre adresse. Avant de cliquer sur **Confirm** pour la requête, remarquez que les données signées sont opaques. Les utilisateurs auraient du mal à comprendre ce qu'ils signent. N'oubliez pas que nous en discuterons [ci-dessous](#vulnerabilities).

12. Une fois la transaction confirmée, attendez de voir le changement à la fois dans _your balance_ et _proxy balance_. Notez que cela prendra également un certain temps, car Sepolia a un temps de bloc de 12 secondes.

## Comment ça marche {#how-work}

Pour une expérience sans gaz, nous avons besoin d'une interface utilisateur pour l'utilisateur, d'un serveur pour acheminer les messages de l'interface utilisateur vers la chaîne, et d'un contrat intelligent pour les recevoir et les vérifier.

### Le contrat intelligent du portefeuille {#wallet-smart-contract}

Voici [le contrat intelligent](https://github.com/qbzzt/260315-gasless-tokens/blob/main/contracts/src/UserProxy.sol). Son but est de faire tout ce que le véritable propriétaire demande, quel que soit le canal utilisé pour le demander, et d'ignorer tout le reste. Pour ce faire, ses fonctions reçoivent une adresse cible à appeler et les données à utiliser pour l'appeler.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.21;

contract UserProxy {
    address immutable OWNER;
    uint public nonce = 0;
```

L'identité du propriétaire et un [nonce](https://en.wikipedia.org/wiki/Cryptographic_nonce) pour empêcher la répétition des messages. Étant donné que le nonce est une variable `public`, le compilateur Solidity crée également une fonction de vue, [`nonce()`](https://eth-sepolia.blockscout.com/address/0x9Ba259C15B46ee4b72dEf7b93D85Ec18f5f6e50E?tab=read_write_contract#0xaffed0e0), qui permet au code hors chaîne de lire sa valeur.

```solidity
    bytes32 private constant SIGNED_ACCESS_TYPEHASH =
        keccak256("SignedAccess(address target,bytes data,uint256 nonce)");

    bytes32 private constant SIGNED_ACCESS_PAYABLE_TYPEHASH =
        keccak256("SignedAccessPayable(address target,bytes data,uint256 nonce,uint256 value)");

    bytes32 immutable DOMAIN_SEPARATOR;
```

Les informations requises pour vérifier les [signatures EIP-712](https://eips.ethereum.org/EIPS/eip-712).

```solidity
    constructor(address owner_) {
        OWNER = owner_;
```

Un `UserProxy` est lié à une seule adresse de propriétaire. C'est nécessaire car il peut posséder des actifs (jetons ERC-20, NFT, etc.). Nous ne voulons pas mélanger les actifs appartenant à différents propriétaires.

```solidity
        DOMAIN_SEPARATOR = keccak256(
            abi.encode(
                keccak256(
                    "EIP712Domain(string name,string version,uint256 chainId,address verifyingContract)"
                ),
                keccak256(bytes("UserProxy")),
                keccak256(bytes("1")),
                block.chainid,
                address(this)
            )
        );
    }
```

Le [séparateur de domaine](https://eips.ethereum.org/EIPS/eip-712#definition-of-domainseparator). Il ne peut pas être calculé au moment de la compilation, car il dépend de l'ID de la chaîne et de l'adresse du contrat. Cela rend impossible pour un UserProxy d'être trompé par un message préparé pour un autre.

```solidity
    event CallResult(address target, bytes returnData);
```

Enregistrer les résultats d'un appel dans le journal.

```solidity
    function directAccess(address target, bytes calldata data)
            external returns (bytes memory) {
```

Cette fonction peut être appelée directement par le propriétaire. Si aucun relais n'est disponible, le propriétaire peut toujours accéder aux actifs directement sur la chaîne de blocs (si l'utilisateur possède de l'ETH).

```solidity
        require(msg.sender == OWNER, "Only owner can call");
        (bool success, bytes memory returnData) = target.call(data);
        require(success, "Call failed");

        emit CallResult(target, returnData);

        return returnData;
    }
```

Si nous sommes appelés _directement_ par le propriétaire, appelez la cible avec les données d'appel fournies.

```solidity
    function signedAccess(
        address target,
        bytes calldata data,
        uint8 v,
        bytes32 r,
        bytes32 s)
```

C'est la fonction principale de `UserProxy`. Elle obtient `target` et `data`, ainsi qu'une signature.

```solidity
    external returns (bytes memory) {
        // Calculer le condensat EIP-712
        bytes32 digest = keccak256(
            abi.encodePacked(
                "\x19\x01",
                DOMAIN_SEPARATOR,
                keccak256(
                    abi.encode(
                        SIGNED_ACCESS_TYPEHASH,
                        target,
                        keccak256(data),
                        nonce
                    )
                )
            )
        );
```

Le condensat inclut également le nonce, mais nous n'avons pas besoin de le recevoir de la transaction ; nous connaissons déjà la bonne valeur. Une signature avec le mauvais nonce sera rejetée.

```solidity

    // Récupérer le signataire
    address signer = ecrecover(digest, v, r, s);
    require(signer == OWNER, "Signature invalid or not by owner");
```

Si la signature est invalide, `ecrecover` renverra généralement une adresse différente, et elle ne sera pas acceptée.

```solidity
    (bool success, bytes memory returnData) = target.call(data);
    require(success, "Call failed");
```

Appeler le contrat que l'utilisateur nous a dit d'appeler, et annuler en cas d'échec.

```solidity
    emit CallResult(target, returnData);

    nonce++; // Incrémenter le nonce pour empêcher le rejeu

    return returnData;
}
```

En cas de succès, émettre un événement de journal et incrémenter le nonce.

```solidity
    function directAccessPayable(address target, uint value, bytes calldata data)
            external payable returns (bytes memory) {
        .
        .
        .
    }

    function signedAccessPayable(
        .
        .
        .
    }
}
```

Ce sont des variantes presque identiques qui vous permettent également de transférer de l'ETH hors du contrat.

### Le relayeur {#relayer}

Le relayeur est un [composant serveur](/developers/tutorials/server-components/). Il est écrit en JavaScript ; vous pouvez voir le code source [ici](https://github.com/qbzzt/260315-gasless-tokens/blob/main/server/index.js).

```js
import express from "express";
import { createServer as createViteServer } from "vite";
import { createWalletClient, createPublicClient, http } from 'viem'
import { privateKeyToAccount } from 'viem/accounts'
import { sepolia } from 'viem/chains'
import dotenv from 'dotenv'
```

Les bibliothèques dont nous avons besoin. Il s'agit d'un serveur [Express](https://expressjs.com/), qui utilise [Vite](https://vite.dev/) pour servir le code de l'interface utilisateur. Nous utilisons [Viem](https://viem.sh/) pour communiquer avec la chaîne de blocs, et [dotenv](https://www.dotenv.org/) pour lire la clé privée de l'adresse qui envoie la transaction.

```js
import { createRequire } from 'module'
const require = createRequire(import.meta.url)
const UserProxy = require('../contracts/out/UserProxy.sol/UserProxy.json')
```

C'est un moyen simple de lire le `UserProxy` compilé. Nous avons besoin de l'ABI pour pouvoir appeler `UserProxy`, et du code compilé pour pouvoir le déployer pour un utilisateur.

```js
dotenv.config()
const sepoliaAccount = privateKeyToAccount(process.env.SEPOLIA_PRIVATE_KEY)
console.log("Using account:", sepoliaAccount.address)
```

Lire le fichier `.env`, extraire l'adresse, et l'afficher dans la console.

```js
const sepoliaClient = createWalletClient({
  account: sepoliaAccount,
  chain: sepolia,
  transport: http("https://rpc.sentio.xyz/sepolia"),
})

const publicClient = createPublicClient({
  chain: sepolia,
  transport: http(),
})
```

Les clients Viem qui communiquent avec la chaîne de blocs.

```js
const start = async () => {
  const app = express()
```

Exécuter un serveur Express.

```js
  app.use(express.json())
```

Indiquer à Express de lire le corps de la requête, et si c'est du JSON, de l'analyser.

```js
  app.post("/server/deploy", async (req, res) => {
```

C'est le code qui gère les requêtes de déploiement du proxy. Notez que nous sommes vulnérables aux attaques par [déni de service](https://en.wikipedia.org/wiki/Denial-of-service_attack) ici car un attaquant peut nous spammer avec des requêtes pour déployer le proxy jusqu'à ce que notre ETH soit épuisé. Sur un système de production, nous exigerions probablement que la requête de déploiement du proxy soit signée et que le signataire soit un client existant.

```js
    try {
      const ownerAddress = req.body.ownerAddress
```

Obtenir l'adresse du propriétaire à partir de la requête.

```js
      const txHash = await sepoliaClient.deployContract({
        abi: UserProxy.abi,
        bytecode: UserProxy.bytecode.object,
        args: [ownerAddress],
        account: sepoliaAccount,
      })

      console.log("Deployment transaction hash:", txHash)

      const receipt = await publicClient.waitForTransactionReceipt({
        hash: txHash,
      })
```

[Déployer le contrat](https://viem.sh/docs/contract/deployContract#deploycontract) et [attendre qu'il soit déployé](https://viem.sh/docs/actions/public/waitForTransactionReceipt).

```js
      res.json({ contractAddress: receipt.contractAddress })
```

Si tout va bien, renvoyer l'adresse du proxy à l'interface utilisateur.

```js
    } catch (err) {
      console.error(err)
      res.status(500).json({ error: err.message })
    }
  })
```

S'il y a un problème, le signaler.

```js
  app.post("/server/message", async (req, res) => {
```

C'est le code qui traite les messages des utilisateurs pour le contrat `UserProxy`. C'est un autre point vulnérable à une attaque par déni de service.

```js
    try {
      const { proxy, target, data, v, r, s } = req.body

      const txHash = await sepoliaClient.writeContract({
        address: proxy,
        abi: UserProxy.abi,
        functionName: 'signedAccess',
        args: [target, data, v, r, s],
        account: sepoliaAccount,
      })
```

Obtenir les données de la requête et les utiliser pour appeler `signedAccess` sur le proxy.

```js
      console.log("Message transaction hash:", txHash)

      res.json({ txHash })
```

Renvoyer le hachage de transaction. Cela permet à l'interface utilisateur d'afficher une URL pour que l'utilisateur puisse vérifier la transaction.

```js
    } catch (err) {
      console.error(err)
      res.status(500).json({ error: err.message })
    }
  })
```

Encore une fois, s'il y a un problème, signalez-le.

```js
  // Laisser Vite gérer tout le reste
  const vite = await createViteServer({
    server: { middlewareMode: true }
  })

  app.use(vite.middlewares)

  app.listen(5173, () => {
    console.log("Dev server running on http://localhost:5173");
  })
}

start()
```

Pour tout le reste, utilisez Vite, qui se charge de servir l'interface utilisateur pour nous.

### Interface utilisateur {#user-interface}

[Voici le code de l'interface utilisateur](https://github.com/qbzzt/260315-gasless-tokens/tree/main/server/src). La majeure partie du code est presque identique à celle documentée dans [cet article](/developers/tutorials/creating-a-wagmi-ui-for-your-contract/#file-walk-through), à l'exception de [`Token.jsx`](https://github.com/qbzzt/260315-gasless-tokens/blob/main/server/src/Token.jsx).

Certaines parties de [`Token.jsx`](https://github.com/qbzzt/260315-gasless-tokens/blob/main/server/src/Token.jsx) sont similaires à [`Greeter.jsx`](https://github.com/qbzzt/260301-gasless/blob/main/server/src/Greeter.jsx) dans [cet article](/developers/tutorials/gasless/#ui-changes). Voici les nouvelles parties.

```js
import {
   encodeFunctionData
       } from 'viem'
```

[Cette fonction](https://viem.sh/docs/contract/encodeFunctionData) crée les données d'appel pour un appel de fonction EVM. C'est nécessaire pour que l'utilisateur puisse signer les données d'appel.

```js
import UserProxy from '../../contracts/out/UserProxy.sol/UserProxy.json'
```

Le `UserProxy`, expliqué ci-dessus.

```js
import Erc20 from '../../contracts/out/Faucet.sol/FaucetToken.json'
```

[Ce contrat](https://eth-sepolia.blockscout.com/address/0x4cBedDEDA88fDd9e116618a5cD71BB0E440C2A78?tab=contract) est principalement un contrat ERC-20 normal, avec l'ajout d'une fonction importante, `faucet()`. Cette fonction accorde des jetons à quiconque les demande à des fins de test.

```js
const erc20Addrs = {
  // Sepolia
    11155111: '0x4cBedDEDA88fDd9e116618a5cD71BB0E440C2A78'
}
```

L'adresse pour `FaucetToken`.

```js
const Address = ({ address }) => {
   if (!address) return null
   return (
      <a href={`https://eth-sepolia.blockscout.com/address/${address}?tab=read_write_contract`} target="_blank">{address}</a>
   )
}
```

Ce composant génère une adresse avec un lien vers le contrat sur un explorateur de blocs.

```js
const Token = () => {
    ...
```

C'est le composant principal qui fait la majeure partie du travail.

```js
  const [ balanceAmount, setBalanceAmount ] = useState("Loading...")
```

Le solde de jetons de l'adresse de l'utilisateur.

```js
  const [ proxyAddr, setProxyAddr ] = useState(null)
```

L'adresse d'un proxy possédé par l'utilisateur.

```js
  const [ proxyBalanceAmount, setProxyBalanceAmount ] = useState("Loading...")
```

Le solde de jetons du proxy.

```js
  const [ newProxyAddr, setNewProxyAddr ] = useState("")
```

Ce champ est utilisé lorsque l'utilisateur définit manuellement l'adresse du proxy. Avoir la possibilité de définir l'adresse du proxy manuellement permet à l'utilisateur d'utiliser un proxy existant au lieu d'en déployer un nouveau à chaque fois (et de perdre tous les jetons possédés par l'ancien proxy).

```js
  const [ txHash, setTxHash ] = useState(null)
```

Le hachage de la dernière transaction, utilisé pour afficher un lien vers l'explorateur afin que l'utilisateur puisse vérifier cette transaction.

```js
  const [ transferToken, setTransferToken ] = useState("")
  const [ transferAmount, setTransferAmount ] = useState("")
  const [ transferTo, setTransferTo ] = useState("")
```

Ces champs sont tous utilisés pour envoyer des commandes de transfert de jetons à un contrat ERC-20. Il peut s'agir de `FaucetToken`, mais ce n'est pas obligatoire. La fonction [`transfer`](/developers/tutorials/erc20-annotated-code/#transfer-tokens) fait partie de la norme ERC-20.

```js
  const balance = useReadContract({
    ...
  })


  const proxyBalance = useReadContract({
    ...
  })
```

Lire les deux soldes de jetons qui nous intéressent, combien l'utilisateur possède, et combien le proxy possède.

```js
  const nonce = useReadContract({
      address: proxyAddr,
      abi: UserProxy.abi,
      functionName: 'nonce',
      args: [],
  })
```

Pour empêcher les attaques par rejeu (par exemple, un vendeur rejouant une transaction qui lui donne de l'argent), nous utilisons un [nonce](https://en.wikipedia.org/wiki/Cryptographic_nonce). Nous devons connaître la valeur actuelle pour l'ajouter aux données que nous signons.

```js
  useEffect(() => {
    if (balance?.status === "success")
      setBalanceAmount(balance.data / 10n**18n)
    else
      setBalanceAmount("Loading...")
  }, [balance])

  useEffect(() => {
    if (proxyBalance?.status === "success")
      setProxyBalanceAmount(proxyBalance.data / 10n**18n)
    else
      setProxyBalanceAmount("Loading...")
  }, [proxyBalance])
```

Utiliser [`useEffect`](https://react.dev/reference/react/useEffect) pour mettre à jour le solde affiché à l'utilisateur lorsque les informations lues depuis la chaîne de blocs changent.

```js
  useEffect(() => {
    setTransferToken(faucetAddr)
  }, [faucetAddr])

  useEffect(() => {
    setTransferTo(account.address)
  }, [account.address])
```

Le comportement par défaut est de transférer des jetons `FaucetToken` vers le propre compte de l'utilisateur. Ici, nous définissons ces valeurs lorsque nous les recevons de Viem.

```js
  const proxyAddressChange = (evt) => setNewProxyAddr(evt.target.value)
  const transferTokenChange = (evt) => setTransferToken(evt.target.value)
  const transferToChange = (evt) => setTransferTo(evt.target.value)
  const transferAmountChange = (evt) => setTransferAmount(evt.target.value)
```

Gestionnaires d'événements pour les changements dans les champs de texte.

```js
  const deployUserProxy = async () => {
    try {
      const response = await fetch("/server/deploy", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ownerAddress: account.address })
      })

      const data = await response.json()
      setProxyAddr(data.contractAddress)
    } catch (err) {
      console.error("Error:", err)
    }
  }
```

Demander au serveur de déployer un proxy pour cet utilisateur.

```js
  const signMessage = async(proxyAddr, target, calldata) => {
```

Signer un message avant de l'envoyer au serveur pour qu'il l'envoie à `UserProxy` onchain. Ceci est expliqué [ici](/developers/tutorials/gasless/#ui-changes). Nous devons signer un message avec à la fois l'adresse cible (l'adresse du jeton que nous appelons) et les données d'appel à envoyer.

```js
    const domain = {
      .
      .
      .
    return {v, r, s}
  }

  const messageUserProxy = async (proxy, target, data, v, r, s) => {
```

Envoyer un message signé à `UserProxy`, qui vérifiera la signature puis l'enverra à la `target`.

```js
    try {
      const response = await fetch("/server/message", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          proxy, target,  // les deux adresses
          data,           // données d'appel à envoyer à la cible
          v, r, s         // signature
        })
      })
      const serverResponse = await response.json()
      setTxHash(serverResponse.txHash)
    } catch (err) {
      console.error("Error:", err)
    }
  }
```

Envoyer une requête au serveur, et lorsque vous recevez la réponse, obtenir le hachage de transaction.

```js
  const faucetSimulation = useSimulateContract({
    address: faucetAddr,
    abi: Erc20.abi,
    functionName: 'faucet',
    account: account.address
  })
```

Simuler l'appel de la fonction `faucet`. Nous n'activons le bouton du faucet que si cela réussit.

```js
  const proxyFaucet = async () => {
    const calldata = encodeFunctionData({
      abi: Erc20.abi,
      functionName: 'faucet',
      args: [],
    })

    const {v, r, s} = await signMessage(proxyAddr, calldata)
    messageUserProxy(proxyAddr, faucetAddr, calldata, v, r, s)
  }

  const proxyTransfer = async () => {
    const calldata = encodeFunctionData({
      abi: Erc20.abi,
      functionName: 'transfer',
      args: [transferTo, BigInt(transferAmount) * 10n**18n],
    })

    const {v, r, s} = await signMessage(proxyAddr, transferToken, calldata)
    messageUserProxy(proxyAddr, transferToken, calldata, v, r, s)
  }
```

Pour appeler une fonction via le serveur et `UserProxy`, nous suivons trois étapes :

1. Créer les données d'appel à signer et à envoyer en utilisant [`encodeFunctionData`](https://viem.sh/docs/contract/encodeFunctionData).

2. Signer le message (adresse cible, données d'appel et nonce).

3. Envoyer le message au serveur.

```js
  return (
    <>
      <div align="left">
         <h2>Token</h2>
         <h4>Token contract address <Address address={faucetAddr} /></h4>
         <hr />
         <h4>Direct access (as <Address address={account?.address} />)</h4>
         Your balance: {balanceAmount}
         <br />
         <button disabled={!faucetSimulation.data}
               onClick={() => writeContract(
                  faucetSimulation.data.request
               )}
         >
         Request more tokens
         </button>
         <hr />
```

Cette partie du composant vous permet d'utiliser `FaucetToken` directement depuis le navigateur. Son but principal est de faciliter le débogage.

```js
         <h4>UserProxy access <Address address={proxyAddr} /></h4>
         <button onClick={deployUserProxy}>
         Deploy UserProxy (slow process)
         </button>
```

Laisser l'utilisateur déployer un nouveau `UserProxy`.

```js
         <br /><br />
         <input type="text" placeholder="Ou entrez une adresse de proxy existante" value={newProxyAddr} onChange={proxyAddressChange} />
         <br /><br />
         <button
            onClick={() => setProxyAddr(newProxyAddr)}
            disabled={newProxyAddr.match(/^0x[a-fA-F0-9]{40}$/) === null}
         >
            Set proxy address
         </button>
```

Ne laisser les utilisateurs cliquer sur **Set proxy address** que lorsqu'ils entrent une adresse légitime. Notez que cela ne garantit pas que l'adresse en question est bien un contrat `UserProxy`. Il est possible d'ajouter une telle vérification, mais ce sera beaucoup plus lent (pire expérience utilisateur) et n'améliorera pas la sécurité (les attaquants peuvent toujours utiliser leur propre code pour l'interface utilisateur).

```js
         <br /><br />
         { proxyAddr && (
```

Afficher le reste _uniquement_ s'il y a une adresse de proxy légitime.

```js
            <>
               Proxy balance: {proxyBalanceAmount}
               <br />
               Proxy nonce: {nonce?.data?.toString() ?? "Loading..."}
```

L'utilisateur n'a pas besoin de connaître le nonce ; c'est juste à des fins de débogage.

```js
               <br />
               <button disabled={!proxyAddr || proxyAddr === "Loading..." || nonce?.status !== 'success'}
                  onClick={proxyFaucet}
               >
                  Request more tokens for proxy
               </button>
```

Nous ne pouvons pas simuler un appel à `faucet()` via le proxy. Cependant, nous pouvons au moins nous assurer que nous avons un proxy et que le proxy nous a signalé un nonce.

```js
               <hr />
               <h4>Transfer tokens from proxy</h4>
               <ul>
                  <li> Token to transfer: <input type="text" placeholder="Token to transfer" value={transferToken} onChange={transferTokenChange} /> </li>
                  <li> Recipient address: <input type="text" placeholder="Recipient address" value={transferTo} onChange={transferToChange} /> </li>
                  <li> Amount to transfer: <input type="number" placeholder="Amount to transfer" value={transferAmount} onChange={transferAmountChange} /> </li>
               </ul>
               <button disabled={!proxyAddr || proxyAddr === "Loading..." || nonce?.status !== 'success'}
                  onClick={proxyTransfer}
               >
                  Transfer
               </button>
            </>
         )}
```

Laisser l'utilisateur émettre des transactions de transfert ERC-20.

```js
         <hr />
         { txHash && (
            <>
               <h4>Last transaction:</h4>
               <a href={`https://eth-sepolia.blockscout.com/tx/${txHash}`} target="_blank">
                 {txHash}
               </a>
            </>
         )}
```

S'il y a un hachage de la dernière transaction, afficher un lien pour que l'utilisateur puisse le voir dans un explorateur de blocs.

```js
      </div>
    </>
  )
}

export {Token}
```

C'est juste du code passe-partout React.

## Vulnérabilités {#vulnerabilities}

Notre serveur est vulnérable aux attaques par déni de service. Cette attaque est expliquée [dans l'article précédent de la série](/developers/tutorials/gasless/#dos-on-server).

De plus, nous encourageons un mauvais comportement de l'utilisateur. Voici ce que nous demandons à l'utilisateur de signer :

![Screen capture with opaque calldata](./fig-1-opaque-calldata.png)

_Nous_ savons qu'il s'agit d'un transfert ERC-20 légitime pour le jeton, le montant et l'adresse de destination que l'utilisateur souhaite transférer. Mais la plupart des utilisateurs ne savent pas comment interpréter les données d'appel, et n'ont aucune idée de ce qu'ils signent. C'est une mauvaise conception, pour deux raisons :

- Certains utilisateurs ne nous utiliseront pas car ils ne font pas confiance aux données que nous leur disons de signer.
- D'autres utilisateurs nous feront confiance et apprendront qu'ils doivent simplement signer les données d'appel sans comprendre ce que c'est. Cela signifie que si Adam l'Attaquant parvient à les rediriger vers son site Web, il peut leur faire signer une transaction qui lui accorde tous les USDC (ou DAI, ou tout autre ERC-20) que l'utilisateur possède.

La solution est d'avoir des fonctions séparées dans `UserProxy` pour les fonctions couramment utilisées, telles que le transfert. Ensuite, les utilisateurs peuvent signer quelque chose qu'ils comprennent.

![Screen capture with transfer details](./fig-2-transparent-signature.png)

**Remarque :** Bien que les utilisateurs puissent utiliser le portefeuille de leur choix, il est fortement recommandé que les applications utilisant l'EIP-712 les encouragent à utiliser un portefeuille qui [affiche l'intégralité des données de signature](https://rabby.io/). Certains portefeuilles tronquent l'adresse, ce qui n'est pas sécurisé. Un attaquant peut créer une adresse qui a les mêmes caractères de début et de fin, mais qui diffère au milieu.

![Screen capture with truncated addresses](./fig-3-truncated-addresses.png)

## Conclusion {#conclusion}

En plus des vulnérabilités ci-dessus, la solution de ce tutoriel présente plusieurs inconvénients qu'Ethereum peut nous aider à résoudre.

- _Résistance à la censure_. Actuellement, les utilisateurs peuvent utiliser votre serveur, un serveur concurrent mis en place par quelqu'un d'autre, ou se connecter directement à Ethereum, ce qui entraîne des frais de gaz. L'utilisation de l'[ERC-4337](https://docs.erc4337.io/#what-is-erc-4337) permet aux utilisateurs de proposer leur transaction à un grand groupe de serveurs, réduisant ainsi la probabilité que leurs transactions soient censurées.
- _Actifs possédés par un EOA_. Comme noté ci-dessus, l'[EIP-7702](https://eip7702.io/) peut être utilisé pour gérer des actifs déjà possédés par une adresse EOA. Cela présente des difficultés, mais c'est parfois nécessaire.

J'espère publier des tutoriels sur l'ajout de ces fonctionnalités dans un avenir proche.

[Voir ici pour plus de mon travail](https://cryptodocguy.pro/).