---
title: "Sponsoriser les frais de gaz : Comment couvrir les coûts de transaction pour vos utilisateurs"
description: "Il est facile de créer une clé privée et une adresse ; il suffit d'exécuter le bon logiciel. Mais il y a de nombreux endroits dans le monde où obtenir de l'ETH pour envoyer des transactions est beaucoup plus difficile. Dans ce tutoriel, vous apprendrez comment couvrir les coûts de gaz onchain pour l'exécution de données structurées offchain signées par l'utilisateur dans votre contrat intelligent. Vous demandez à l'utilisateur de signer une structure contenant les informations de la transaction, que votre code offchain soumet ensuite à la chaîne de blocs en tant que transaction."
author: Ori Pomerantz
tags: ["sans gaz", "Solidity", "eip-712", "méta-transactions"]
skill: intermediate
breadcrumb: Sponsorisation du gaz
lang: fr
published: 2026-02-27
---

## Introduction {#introduction}

Si nous voulons qu'Ethereum serve [un milliard de personnes supplémentaires](https://blog.ethereum.org/category/next-billion), nous devons éliminer les frictions et le rendre aussi facile à utiliser que possible. L'une des sources de cette friction est la nécessité d'avoir de l'ETH pour payer les frais de gaz.

Si vous avez une application décentralisée (dapp) qui génère des revenus grâce aux utilisateurs, il pourrait être judicieux de laisser les utilisateurs soumettre des transactions via votre serveur et de payer vous-même les frais de transaction. Étant donné que les utilisateurs signent toujours un [message d'autorisation EIP-712](https://eips.ethereum.org/EIPS/eip-712) dans leurs portefeuilles, ils conservent les garanties d'intégrité d'Ethereum. La disponibilité dépend du serveur qui relaie les transactions, elle est donc plus limitée. Cependant, vous pouvez configurer les choses de manière à ce que les utilisateurs puissent également accéder directement au contrat intelligent (s'ils obtiennent de l'ETH), et laisser d'autres personnes configurer leurs propres serveurs s'ils souhaitent sponsoriser des transactions.

La technique présentée dans ce tutoriel ne fonctionne que lorsque vous contrôlez le contrat intelligent. Il existe d'autres techniques, notamment l'[abstraction de compte](https://eips.ethereum.org/EIPS/eip-4337), qui vous permettent de sponsoriser des transactions vers d'autres contrats intelligents, que j'espère aborder dans un futur tutoriel.

Remarque : Il ne s'agit _pas_ d'un code de niveau production. Il est vulnérable à des attaques importantes et manque de fonctionnalités majeures. Apprenez-en davantage dans la [section sur les vulnérabilités de ce guide](#vulnerabilities).

### Prérequis {#prerequisites}

Pour comprendre ce tutoriel, vous devez déjà être familier avec :

- Solidity
- JavaScript
- React et WAGMI. Si vous n'êtes pas familier avec ces outils d'interface utilisateur, [nous avons un tutoriel pour cela](/developers/tutorials/creating-a-wagmi-ui-for-your-contract/).

## L'application d'exemple {#sample-app}

L'application d'exemple ici est une variante du contrat `Greeter` de Hardhat. Vous pouvez la voir [sur GitHub](https://github.com/qbzzt/260301-gasless). Le contrat intelligent est déjà déployé sur [Sepolia](https://sepolia.dev/), à l'adresse [`0xC87506C66c7896366b9E988FE0aA5B6dDE77CFfA`](https://eth-sepolia.blockscout.com/address/0xC87506C66c7896366b9E988FE0aA5B6dDE77CFfA).

Pour la voir en action, suivez ces étapes.

1. Clonez le dépôt et installez les logiciels nécessaires.

   ```sh
   git clone https://github.com/qbzzt/260301-gasless.git
   cd 260301-gasless/server
   npm install
   ```

2. Modifiez `.env` pour définir `PRIVATE_KEY` sur un portefeuille qui possède de l'ETH sur Sepolia. Si vous avez besoin d'ETH Sepolia, [utilisez un faucet](/developers/docs/networks/#sepolia). Idéalement, cette clé privée devrait être différente de celle que vous avez dans le portefeuille de votre navigateur.

3. Démarrez le serveur.

   ```sh
   npm run dev
   ```

4. Accédez à l'application à l'URL [`http://localhost:5173`](http://localhost:5173).

5. Cliquez sur **Connect with Injected** pour vous connecter à un portefeuille. Approuvez dans le portefeuille, et approuvez le changement vers Sepolia si nécessaire.

6. Écrivez un nouveau message d'accueil et cliquez sur **Update greeting via sponsor**.

7. Signez le message.

8. Attendez environ 12 secondes (le temps de bloc sur Sepolia). En attendant, vous pouvez regarder l'URL dans la console du serveur pour voir la transaction.

9. Constatez que le message d'accueil a changé, et que la valeur de l'adresse de la dernière mise à jour est maintenant l'adresse du portefeuille de votre navigateur.

Pour comprendre comment cela fonctionne, nous devons examiner comment le message est créé dans l'interface utilisateur, comment il est relayé par le serveur, et comment le contrat intelligent le traite.

### L'interface utilisateur {#ui-changes}

L'interface utilisateur est basée sur [WAGMI](https://wagmi.sh/) ; vous pouvez en apprendre davantage à ce sujet [dans ce tutoriel](/developers/tutorials/creating-a-wagmi-ui-for-your-contract/).

Voici comment nous signons le message :

```js
const signGreeting = useCallback(
```

Le hook React [`useCallback`](https://react.dev/reference/react/useCallback) nous permet d'améliorer les performances en réutilisant la même fonction lorsque le composant est redessiné.

```js
    async (greeting) => {
        if (!account) throw new Error("Wallet not connected")
```

S'il n'y a pas de compte, déclenchez une erreur. Cela ne devrait jamais se produire car le bouton de l'interface utilisateur qui lance le processus appelant `signGreeting` est désactivé dans ce cas. Cependant, de futurs programmeurs pourraient supprimer cette sécurité, il est donc judicieux de vérifier cette condition ici également.

```js
        const domain = {
            name: "Greeter",
            version: "1",
            chainId,
            verifyingContract: contractAddr,
        }
```

Paramètres pour le [séparateur de domaine](https://eips.ethereum.org/EIPS/eip-712#definition-of-domainseparator). Cette valeur est constante, donc dans une implémentation mieux optimisée, nous pourrions la calculer une seule fois plutôt que de la recalculer à chaque appel de la fonction.

- `name` est un nom lisible par l'utilisateur, tel que le nom de la dapp pour laquelle nous produisons des signatures.
- `version` est la version. Les différentes versions ne sont pas compatibles.
- `chainId` est la chaîne que nous utilisons, telle que fournie [par WAGMI](https://wagmi.sh/react/api/hooks/useChainId).
- `verifyingContract` est l'adresse du contrat qui vérifiera cette signature. Nous ne voulons pas que la même signature s'applique à plusieurs contrats, au cas où il y aurait plusieurs contrats `Greeter` et que nous voudrions qu'ils aient des messages d'accueil différents.

```js

        const types = {
            GreetingRequest: [
                { name: "greeting", type: "string" },
            ],
        }
```

Le type de données que nous signons. Ici, nous avons un seul paramètre, `greeting`, mais les systèmes réels en ont généralement davantage.

```js
        const message = { greeting }
```

Le message réel que nous voulons signer et envoyer. `greeting` est à la fois le nom du champ et le nom de la variable qui le remplit.

```js
        const signature = await signTypedDataAsync({
            domain,
            types,
            primaryType: "GreetingRequest",
            message,
        })
```

Obtenir réellement la signature. Cette fonction est asynchrone car les utilisateurs mettent beaucoup de temps (du point de vue d'un ordinateur) à signer des données.

```js
        const r = `0x${signature.slice(2, 66)}`
        const s = `0x${signature.slice(66, 130)}`
        const v = parseInt(signature.slice(130, 132), 16)

        return {
            req: { greeting },
            v,
            r,
            s,
        }
    },
```

La fonction renvoie une seule valeur hexadécimale. Ici, nous la divisons en champs.

```js
    [account, chainId, contractAddr, signTypedDataAsync],
)
```

Si l'une de ces variables change, créez une nouvelle instance de la fonction. Les paramètres `account` et `chainId` peuvent être modifiés par l'utilisateur dans le portefeuille. `contractAddr` est une fonction de l'ID de la chaîne. `signTypedDataAsync` ne devrait pas changer, mais nous l'importons depuis [un hook](https://wagmi.sh/react/api/hooks/useSignTypedData), nous ne pouvons donc pas en être sûrs, et il est préférable de l'ajouter ici.

Maintenant que le nouveau message d'accueil est signé, nous devons l'envoyer au serveur.

```js
  const sponsoredGreeting = async () => {
    try {
```

Cette fonction prend une signature et l'envoie au serveur.

```js
      const signedMessage = await signGreeting(newGreeting)
      const response = await fetch("/server/sponsor", {
```

Envoyer au chemin `/server/sponsor` sur le serveur d'où nous venons.

```js
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(signedMessage),
      })
```

Utilisez `POST` pour envoyer les informations encodées en JSON.

```js
      const data = await response.json()
      console.log("Server response:", data)
    } catch (err) {
      console.error("Error:", err)
    }
  }
```

Affichez la réponse. Sur un système en production, nous montrerions également la réponse à l'utilisateur.

### Le serveur {#server}

J'aime utiliser [Vite](https://vite.dev/) pour mon front-end. Il sert automatiquement les bibliothèques React et met à jour le navigateur lorsque le code front-end change. Cependant, Vite n'inclut pas d'outils back-end.

La solution se trouve dans [`index.js`](https://github.com/qbzzt/260301-gasless/blob/main/server/index.js).

```js
  app.post("/server/sponsor", async (req, res) => {
    ...
  })

  // Laisser Vite gérer tout le reste
  const vite = await createViteServer({
    server: { middlewareMode: true }
  })

  app.use(vite.middlewares)
```

D'abord, nous enregistrons un gestionnaire pour les requêtes que nous traitons nous-mêmes (`POST` vers `/server/sponsor`). Ensuite, nous créons et utilisons un serveur Vite pour gérer toutes les autres URL.

```js
  app.post("/server/sponsor", async (req, res) => {
    try {
      const signed = req.body

      const txHash = await sepoliaClient.writeContract({
        address: greeterAddr,
        abi: greeterABI,
        functionName: 'sponsoredSetGreeting',
        args: [signed.req, signed.v, signed.r, signed.s],
      })
    } ...
  })
```

Il s'agit simplement d'un appel standard à la chaîne de blocs avec [viem](https://viem.sh/).

### Le contrat intelligent {#smart-contract}

Enfin, [`Greeter.sol`](https://github.com/qbzzt/260301-gasless/blob/main/contracts/src/Greeter.sol) doit vérifier la signature.

```solidity
    constructor(string memory _greeting) {
        greeting = _greeting;

        DOMAIN_SEPARATOR = keccak256(
            abi.encode(
                keccak256(
                    "EIP712Domain(string name,string version,uint256 chainId,address verifyingContract)"
                ),
                keccak256(bytes("Greeter")),
                keccak256(bytes("1")),
                block.chainid,
                address(this)
            )
        );
    }
```

Le constructeur crée le [séparateur de domaine](https://eips.ethereum.org/EIPS/eip-712#definition-of-domainseparator), de manière similaire au code de l'interface utilisateur ci-dessus. L'exécution sur la chaîne de blocs est beaucoup plus coûteuse, nous ne le calculons donc qu'une seule fois.

```solidity
    struct GreetingRequest {
        string greeting;
    }
```

C'est la structure qui est signée. Ici, nous n'avons qu'un seul champ.

```solidity
    bytes32 private constant GREETING_TYPEHASH =
        keccak256("GreetingRequest(string greeting)");
```

Il s'agit de l'[identifiant de structure](https://eips.ethereum.org/EIPS/eip-712#definition-of-hashstruct). Il est calculé à chaque fois dans l'interface utilisateur.

```solidity
    function sponsoredSetGreeting(
        GreetingRequest calldata req,
        uint8 v,
        bytes32 r,
        bytes32 s
    ) external {
```

Cette fonction reçoit une requête signée et met à jour le message d'accueil.

```solidity
        // Calculer le condensé EIP-712
        bytes32 digest = keccak256(
            abi.encodePacked(
                "\x19\x01",
                DOMAIN_SEPARATOR,
                keccak256(
                    abi.encode(
                        GREETING_TYPEHASH,
                        keccak256(bytes(req.greeting))
                    )
                )
            )
        );
```

Créez le condensat (digest) conformément à l'[EIP 712](https://eips.ethereum.org/EIPS/eip-712).

```solidity
        // Récupérer le signataire
        address signer = ecrecover(digest, v, r, s);
        require(signer != address(0), "Invalid signature");
```

Utilisez [`ecrecover`](https://www.evm.codes/precompiled?fork=osaka#0x01) pour obtenir l'adresse du signataire. Notez qu'une mauvaise signature peut tout de même aboutir à une adresse valide, mais simplement aléatoire.

```solidity
        // Appliquer la salutation comme si le signataire l'avait appelée
        greeting = req.greeting;
        emit SetGreeting(signer, req.greeting);
    }
```

Mettez à jour le message d'accueil.

## Vulnérabilités {#vulnerabilities}

Il ne s'agit _pas_ d'un code de niveau production. Il est vulnérable à des attaques importantes et manque de fonctionnalités majeures. En voici quelques-unes, ainsi que la manière de les résoudre.

Pour voir certaines de ces attaques, cliquez sur les boutons sous l'en-tête _Attacks_ et observez ce qui se passe. Pour le bouton **Invalid signature**, vérifiez la console du serveur pour voir la réponse de la transaction.

### Déni de service sur le serveur {#dos-on-server}

L'attaque la plus simple est une attaque par [déni de service](https://en.wikipedia.org/wiki/Denial-of-service_attack) sur le serveur. Le serveur reçoit des requêtes de n'importe où sur Internet et, sur la base de ces requêtes, envoie des transactions. Il n'y a absolument rien qui empêche un attaquant d'émettre un tas de signatures, valides ou invalides. Chacune provoquera une transaction. Finalement, le serveur manquera d'ETH pour payer le gaz.

Une solution à ce problème est de limiter le taux à une transaction par bloc. Si le but est de montrer des messages d'accueil à des [comptes détenus par des entités externes](/developers/docs/accounts/#key-differences), peu importe quel est le message d'accueil au milieu du bloc de toute façon.

Une autre solution consiste à garder une trace des adresses et à n'autoriser que les signatures de clients valides.

### Signatures de message d'accueil erronées {#wrong-greeting-sigs}

Lorsque vous cliquez sur **Signature for wrong greeting**, vous soumettez une signature valide pour une adresse spécifique (`0xaA92c5d426430D4769c9E878C1333BDe3d689b3e`) et un message d'accueil (`Hello`). Mais il la soumet avec un message d'accueil différent. Cela perturbe `ecrecover`, qui modifie le message d'accueil mais avec la mauvaise adresse.

Pour résoudre ce problème, ajoutez l'adresse à la [structure signée](https://github.com/qbzzt/260301-gasless/blob/main/server/src/Greeter.jsx#L122-L124). De cette façon, l'adresse aléatoire de `ecrecover` ne correspondra pas à l'adresse dans la signature, et le contrat intelligent rejettera le message.

### Attaques par rejeu {#replay-attack}

Lorsque vous cliquez sur **Replay attack**, vous soumettez la même signature « Je suis 0xaA92c5d426430D4769c9E878C1333BDe3d689b3e, et j'aimerais que le message d'accueil soit `Hello` », mais avec le bon message d'accueil. En conséquence, le contrat intelligent croit que l'adresse (qui n'est pas la vôtre) a rétabli le message d'accueil à `Hello`. Les informations pour ce faire sont publiquement disponibles dans les [informations de la transaction](https://eth-sepolia.blockscout.com/tx/0xa66afe4bbf886f59533e677a798c802ceab1ac0f9db6e83a4d4b59a45cf7c1b1).

Si cela pose problème, une solution consiste à ajouter un [nonce](https://en.wikipedia.org/wiki/Cryptographic_nonce). Ayez un [mapping](https://docs.soliditylang.org/en/latest/types.html#mapping-types) entre les adresses et les nombres, et ajoutez un champ nonce à la signature. Si le champ nonce correspond au mapping pour l'adresse, acceptez la signature et incrémentez le mapping pour la prochaine fois. Si ce n'est pas le cas, rejetez la transaction.

Une autre solution consiste à ajouter un horodatage aux données signées et à n'accepter la signature comme valide que pendant quelques secondes après cet horodatage. C'est plus simple et moins cher, mais nous risquons des attaques par rejeu dans la fenêtre de temps, et l'échec de transactions légitimes si la fenêtre de temps est dépassée.

## Autres fonctionnalités manquantes {#other-missing-features}

Il y a des fonctionnalités supplémentaires que nous ajouterions dans un environnement de production.

### Accès depuis d'autres serveurs {#other-servers}

Actuellement, nous permettons à n'importe quelle adresse de soumettre un `sponsorSetGreeting`. C'est peut-être exactement ce que nous voulons, dans l'intérêt de la décentralisation. Ou peut-être voulons-nous nous assurer que les transactions sponsorisées passent par _notre_ serveur, auquel cas nous vérifierions `msg.sender` dans le contrat intelligent.

Quoi qu'il en soit, cela devrait être une décision de conception consciente, et non le simple résultat de ne pas avoir réfléchi à la question.

### Gestion des erreurs {#error-handling}

Un utilisateur soumet un message d'accueil. Peut-être qu'il sera mis à jour au prochain bloc. Peut-être pas. Les erreurs sont invisibles. Sur un système en production, l'utilisateur devrait pouvoir distinguer ces cas :

- Le nouveau message d'accueil n'a pas encore été soumis
- Le nouveau message d'accueil a été soumis, et il est en cours de traitement
- Le nouveau message d'accueil a été rejeté

## Conclusion {#conclusion}

À ce stade, vous devriez être en mesure de créer une expérience sans gaz pour les utilisateurs de votre dapp, au prix d'une certaine centralisation.

Cependant, cela ne fonctionne qu'avec les contrats intelligents qui prennent en charge l'ERC-712. Pour transférer un jeton ERC-20, par exemple, il est nécessaire que la transaction soit signée par le propriétaire plutôt que par un simple message. La solution est l'[abstraction de compte (ERC-4337)](https://docs.erc4337.io/index.html). J'espère écrire un futur tutoriel à ce sujet.

[Voir ici pour plus de mes travaux](https://cryptodocguy.pro/).