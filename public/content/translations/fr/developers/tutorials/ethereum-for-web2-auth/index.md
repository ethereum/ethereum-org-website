---
title: Utiliser Ethereum pour l'authentification Web2
description: "Après avoir lu ce tutoriel, un développeur sera capable d'intégrer la connexion Ethereum (web3) avec la connexion SAML, un standard utilisé dans le Web2 pour fournir une authentification unique et d'autres services associés. Cela permet d'authentifier l'accès aux ressources Web2 via des signatures Ethereum, les attributs de l'utilisateur provenant d'attestations."
author: Ori Pomerantz
tags:
  - Web2
  - authentification
  - eas
skill: beginner
breadcrumb: Ethereum pour l'authentification Web2
lang: fr
published: 2025-04-30
---

## Introduction {#introduction}

[SAML](https://www.onelogin.com/learn/saml) est un standard utilisé sur le Web2 pour permettre à un [fournisseur d'identité (IdP)](https://en.wikipedia.org/wiki/Identity_provider#SAML_identity_provider) de fournir des informations utilisateur aux [fournisseurs de services (SP)](https://en.wikipedia.org/wiki/Service_provider_(SAML).

Dans ce tutoriel, vous apprendrez comment intégrer les signatures Ethereum avec SAML pour permettre aux utilisateurs d'utiliser leurs portefeuilles Ethereum afin de s'authentifier auprès de services Web2 qui ne prennent pas encore en charge Ethereum nativement.

Notez que ce tutoriel est rédigé pour deux publics distincts :

- Les habitués d'Ethereum qui comprennent Ethereum et ont besoin d'apprendre SAML
- Les habitués du Web2 qui comprennent SAML et l'authentification Web2 et ont besoin d'apprendre Ethereum

Par conséquent, il contiendra beaucoup de matériel d'introduction que vous connaissez peut-être déjà. N'hésitez pas à l'ignorer.

### SAML pour les habitués d'Ethereum {#saml-for-ethereum-people}

SAML est un protocole centralisé. Un fournisseur de services (SP) n'accepte les assertions (telles que « voici mon utilisateur John, il devrait avoir les permissions de faire A, B et C ») d'un fournisseur d'identité (IdP) que s'il a une relation de confiance préexistante avec lui, ou avec l'[autorité de certification](https://www.ssl.com/article/what-is-a-certificate-authority-ca/) qui a signé le certificat de cet IdP.

Par exemple, le SP peut être une agence de voyages fournissant des services de voyage aux entreprises, et l'IdP peut être le site web interne d'une entreprise. Lorsque les employés doivent réserver un voyage d'affaires, l'agence de voyages les envoie s'authentifier auprès de l'entreprise avant de les laisser réellement réserver le voyage.

![Step by step SAML process](./fig-01-saml.png)

C'est ainsi que les trois entités, le navigateur, le SP et l'IdP, négocient l'accès. Le SP n'a pas besoin de connaître à l'avance quoi que ce soit sur l'utilisateur qui utilise le navigateur, il lui suffit de faire confiance à l'IdP.

### Ethereum pour les habitués de SAML {#ethereum-for-saml-people}

Ethereum est un système décentralisé. 

![Ethereum logon](./fig-02-eth-logon.png)

Les utilisateurs possèdent une clé privée (généralement conservée dans une extension de navigateur). À partir de la clé privée, vous pouvez dériver une clé publique, et à partir de celle-ci une adresse de 20 octets. Lorsque les utilisateurs doivent se connecter à un système, il leur est demandé de signer un message avec un nonce (une valeur à usage unique). Le serveur peut vérifier que la signature a été créée par cette adresse.

![Getting extra data from attestations](./fig-03-eas-data.png)

La signature vérifie uniquement l'adresse Ethereum. Pour obtenir d'autres attributs utilisateur, vous utilisez généralement des [attestations](https://attest.org/). Une attestation comporte généralement ces champs :

- **Attestor** (l'attestateur), l'adresse qui a fait l'attestation
- **Recipient** (le destinataire), l'adresse à laquelle l'attestation s'applique
- **Data** (les données), les données attestées, telles que le nom, les permissions, etc.
- **Schema** (le schéma), l'ID du schéma utilisé pour interpréter les données.

En raison de la nature décentralisée d'Ethereum, n'importe quel utilisateur peut faire des attestations. L'identité de l'attestateur est importante pour identifier quelles attestations nous considérons comme fiables.

## Configuration {#setup}

La première étape consiste à faire communiquer un SP SAML et un IdP SAML entre eux.

1. Téléchargez le logiciel. Le logiciel d'exemple pour cet article est [sur GitHub](https://github.com/qbzzt/250420-saml-ethereum). Les différentes étapes sont stockées dans différentes branches, pour cette étape vous voulez `saml-only`

    ```sh
    git clone https://github.com/qbzzt/250420-saml-ethereum -b saml-only
    cd 250420-saml-ethereum
    pnpm install
    ```

2. Créez des clés avec des certificats auto-signés. Cela signifie que la clé est sa propre autorité de certification, et doit être importée manuellement dans le fournisseur de services. Consultez [la documentation d'OpenSSL](https://docs.openssl.org/master/man1/openssl-req/) pour plus d'informations. 

    ```sh
    mkdir keys
    cd keys
    openssl req -new -x509 -days 365 -nodes -sha256 -out saml-sp.crt -keyout saml-sp.pem -subj /CN=sp/
    openssl req -new -x509 -days 365 -nodes -sha256 -out saml-idp.crt -keyout saml-idp.pem -subj /CN=idp/
    cd ..
    ```

3. Démarrez les serveurs (à la fois le SP et l'IdP)

    ```sh
    pnpm start
    ```

4. Naviguez vers le SP à l'URL [http://localhost:3000/](http://localhost:3000/) et cliquez sur le bouton pour être redirigé vers l'IdP (port 3001).

5. Fournissez à l'IdP votre adresse e-mail et cliquez sur **Login to the service provider** (Se connecter au fournisseur de services). Vous constaterez que vous êtes redirigé vers le fournisseur de services (port 3000) et qu'il vous reconnaît par votre adresse e-mail.

### Explication détaillée {#detailed-explanation}

Voici ce qui se passe, étape par étape :

![Normal SAML logon without Ethereum](./fig-04-saml-no-eth.png)

#### src/config.mts {#srcconfigmts}

Ce fichier contient la configuration à la fois pour le fournisseur d'identité et le fournisseur de services. Normalement, ces deux entités seraient différentes, mais ici nous pouvons partager le code par souci de simplicité.

```typescript
const fs = await import("fs")

const protocol="http"
```

Pour l'instant, nous ne faisons que tester, il est donc acceptable d'utiliser HTTP.

```typescript
export const spCert = fs.readFileSync("keys/saml-sp.crt").toString()
export const idpCert = fs.readFileSync("keys/saml-idp.crt").toString()
```

Lisez les clés publiques, qui sont normalement disponibles pour les deux composants (et soit approuvées directement, soit signées par une autorité de certification de confiance).

```typescript
export const spPort = 3000
export const spHostname = "localhost"
export const spDir = "sp"

export const idpPort = 3001
export const idpHostname = "localhost"
export const idpDir = "idp"

export const spUrl = `${protocol}://${spHostname}:${spPort}/${spDir}`
export const idpUrl = `${protocol}://${idpHostname}:${idpPort}/${idpDir}`
```

Les URL pour les deux composants.

```typescript
export const spPublicData = {
```

Les données publiques pour le fournisseur de services.

```typescript
    entityID: `${spUrl}/metadata`,
```

Par convention, dans SAML, l'`entityID` est l'URL où les métadonnées de l'entité sont disponibles. Ces métadonnées correspondent aux données publiques ici, sauf qu'elles sont au format XML.

```typescript
    wantAssertionsSigned: true,
    authnRequestsSigned: false,
    signingCert: spCert,
    allowCreate: true,
    assertionConsumerService: [{
        Binding: 'urn:oasis:names:tc:SAML:2.0:bindings:HTTP-POST',
        Location: `${spUrl}/assertion`,
    }]
  }
```

La définition la plus importante pour nos besoins est l'`assertionConsumerServer`. Cela signifie que pour affirmer quelque chose (par exemple, « l'utilisateur qui vous envoie ces informations est somebody@example.com ») au fournisseur de services, nous devons utiliser une requête [HTTP POST](https://www.w3schools.com/tags/ref_httpmethods.asp) vers l'URL `http://localhost:3000/sp/assertion`.

```typescript
export const idpPublicData = {
    entityID: `${idpUrl}/metadata`,
    signingCert: idpCert,
    wantAuthnRequestsSigned: false,
    singleSignOnService: [{
      Binding: "urn:oasis:names:tc:SAML:2.0:bindings:HTTP-POST",
      Location: `${idpUrl}/login`
    }],
    singleLogoutService: [{
      Binding: "urn:oasis:names:tc:SAML:2.0:bindings:HTTP-POST",
      Location: `${idpUrl}/logout`
    }],
  }
```

Les données publiques pour le fournisseur d'identité sont similaires. Elles spécifient que pour connecter un utilisateur, vous faites un POST vers `http://localhost:3001/idp/login` et pour déconnecter un utilisateur, vous faites un POST vers `http://localhost:3001/idp/logout`.

#### src/sp.mts {#srcspmts}

Ceci est le code qui implémente un fournisseur de services.

```typescript
import * as config from "./config.mts"
const fs = await import("fs")
const saml = await import("samlify")
```

Nous utilisons la bibliothèque [`samlify`](https://www.npmjs.com/package/samlify) pour implémenter SAML.

```typescript
import * as validator from "@authenio/samlify-node-xmllint"
saml.setSchemaValidator(validator)
```

La bibliothèque `samlify` s'attend à avoir un paquet pour valider que le XML est correct, signé avec la clé publique attendue, etc. Nous utilisons [`@authenio/samlify-node-xmllint`](https://www.npmjs.com/package/@authenio/samlify-node-xmllint) à cet effet.

```typescript
const express = (await import("express")).default
const spRouter = express.Router()
const app = express()
```

Un [`Router`](https://expressjs.com/en/5x/api.html#router) [`express`](https://expressjs.com/) est un « mini site web » qui peut être monté à l'intérieur d'un site web. Dans ce cas, nous l'utilisons pour regrouper toutes les définitions du fournisseur de services.

```typescript
const spPrivateKey = fs.readFileSync("keys/saml-sp.pem").toString()

const sp = saml.ServiceProvider({
  privateKey: spPrivateKey,  
  ...config.spPublicData
})
```

La propre représentation du fournisseur de services de lui-même correspond à toutes les données publiques, et à la clé privée qu'il utilise pour signer les informations.

```typescript
const idp = saml.IdentityProvider(config.idpPublicData);
```

Les données publiques contiennent tout ce que le fournisseur de services a besoin de savoir sur le fournisseur d'identité.

```typescript
spRouter.get(`/metadata`, 
  (req, res) => res.header("Content-Type", "text/xml").send(sp.getMetadata())
)
```

Pour permettre l'interopérabilité avec d'autres composants SAML, les fournisseurs de services et d'identité doivent avoir leurs données publiques (appelées les métadonnées) disponibles au format XML dans `/metadata`.

```typescript
spRouter.post(`/assertion`,
```

C'est la page à laquelle le navigateur accède pour s'identifier. L'assertion inclut l'identifiant de l'utilisateur (ici nous utilisons l'adresse e-mail), et peut inclure des attributs supplémentaires. C'est le gestionnaire pour l'étape 7 dans le diagramme de séquence ci-dessus.

```typescript
  async (req, res) => {
    // console.log(`Réponse SAML :\n${Buffer.from(req.body.SAMLResponse, 'base64').toString('utf-8')}`)
```

Vous pouvez utiliser la commande commentée pour voir les données XML fournies dans l'assertion. Elles sont [encodées en base64](https://en.wikipedia.org/wiki/Base64).

```typescript
    try {
      const loginResponse = await sp.parseLoginResponse(idp, 'post', req);
```

Analysez la requête de connexion provenant du serveur d'identité.

```typescript
      res.send(`
        <html>
          <body>
            <h2>Hello ${loginResponse.extract.nameID}</h2>
          </body>
        </html>
      `)
      res.send();
```

Envoyez une réponse HTML, juste pour montrer à l'utilisateur que nous avons bien reçu la connexion.

```typescript
    } catch (err) {
      console.error('Error processing SAML response:', err);
      res.status(400).send('SAML authentication failed');
    }
  }
)
```

Informez l'utilisateur en cas d'échec.

```typescript
spRouter.get('/login',
```

Créez une requête de connexion lorsque le navigateur tente d'obtenir cette page. C'est le gestionnaire pour l'étape 1 dans le diagramme de séquence ci-dessus.

```typescript
  async (req, res) => {
    const loginRequest = await sp.createLoginRequest(idp, "post")
```

Obtenez les informations pour poster une requête de connexion.

```typescript
    res.send(`
      <html>
        <body>
          <script>
            window.onload = function () { document.forms[0].submit(); }            
          </script>
```

Cette page soumet le formulaire (voir ci-dessous) automatiquement. De cette façon, l'utilisateur n'a rien à faire pour être redirigé. C'est l'étape 2 dans le diagramme de séquence ci-dessus.

```typescript
          <form method="post" action="${loginRequest.entityEndpoint}">
```

Postez vers `loginRequest.entityEndpoint` (l'URL du point de terminaison du fournisseur d'identité).

```typescript
            <input type="hidden" name="${loginRequest.type}" value="${loginRequest.context}" />
```

Le nom de l'entrée est `loginRequest.type` (`SAMLRequest`). Le contenu de ce champ est `loginRequest.context`, qui est à nouveau du XML encodé en base64.

```typescript
          </form>
        </body>
      </html>
    `)    
  }
)

app.use(express.urlencoded({extended: true}))
```

[Ce middleware](https://expressjs.com/en/5x/api.html#express.urlencoded) lit le corps de la [requête HTTP](https://www.tutorialspoint.com/http/http_requests.htm). Par défaut, express l'ignore, car la plupart des requêtes n'en ont pas besoin. Nous en avons besoin car POST utilise le corps.

```typescript
app.use(`/${config.spDir}`, spRouter)
```

Montez le routeur dans le répertoire du fournisseur de services (`/sp`).

```typescript
app.get("/", (req, res) => {
  res.send(`
    <html>
      <body>
        <button onClick="document.location.href='${config.spUrl}/login'">
           Click here to log on
        </button>
      </body>
    </html>
  `)
})
```

Si un navigateur essaie d'obtenir le répertoire racine, fournissez-lui un lien vers la page de connexion.

```typescript
app.listen(config.spPort, () => {
  console.log(`service provider is running on http://${config.spHostname}:${config.spPort}`)
})
```

Écoutez le `spPort` avec cette application express.

#### src/idp.mts {#srcidpmts}

Ceci est le fournisseur d'identité. Il est très similaire au fournisseur de services, les explications ci-dessous concernent les parties qui sont différentes.

```typescript
const xmlParser = new (await import("fast-xml-parser")).XMLParser(
  {
    ignoreAttributes: false, // Préserver les attributs
    attributeNamePrefix: "@_", // Préfixe pour les attributs
  }
)
```

Nous devons lire et comprendre la requête XML que nous recevons du fournisseur de services.

```typescript
const getLoginPage = requestId => `
```

Cette fonction crée la page avec le formulaire soumis automatiquement qui est renvoyée à l'étape 4 du diagramme de séquence ci-dessus.

```typescript
<html>
  <head>
    <title>Login page</title>
  </head>
  <body>
    <h2>Login page</h2>
    <form method="post" action="./loginSubmitted">
      <input type="hidden" name="requestId" value="${requestId}" />
      Email address: <input name="email" />
      <br />
      <button type="Submit">
        Login to the service provider
      </button>
```

Il y a deux champs que nous envoyons au fournisseur de services :

1. Le `requestId` auquel nous répondons.
2. L'identifiant de l'utilisateur (nous utilisons l'adresse e-mail que l'utilisateur fournit pour le moment).

```typescript
    </form>
  </body>
</html>

const idpRouter = express.Router()

idpRouter.post("/loginSubmitted", async (req, res) => {
  const loginResponse = await idp.createLoginResponse(
```

C'est le gestionnaire pour l'étape 5 du diagramme de séquence ci-dessus. [`idp.createLoginResponse`](https://github.com/tngan/samlify/blob/master/src/entity-idp.ts#L73-L125) crée la réponse de connexion. 

```typescript
    sp, 
    {
      authnContextClassRef: 'urn:oasis:names:tc:SAML:2.0:ac:classes:PasswordProtectedTransport',
      audience: sp.entityID,
```

L'audience est le fournisseur de services.

```typescript
      extract: {
        request: {
          id: req.body.requestId
        }
      },
```

Informations extraites de la requête. Le seul paramètre qui nous intéresse dans la requête est le requestId, qui permet au fournisseur de services de faire correspondre les requêtes et leurs réponses.

```typescript
      signingKey: { privateKey: idpPrivateKey, publicKey: config.idpCert }  // Assurer la signature
```

Nous avons besoin de `signingKey` pour avoir les données afin de signer la réponse. Le fournisseur de services ne fait pas confiance aux requêtes non signées.

```typescript
    },
    "post",
    {
      email: req.body.email
```

C'est le champ avec les informations de l'utilisateur que nous renvoyons au fournisseur de services.

```typescript      
    }
  );

  res.send(`
    <html>
      <body>
        <script>
          window.onload = function () { document.forms[0].submit(); }
        </script>
        
        <form method="post" action="${loginResponse.entityEndpoint}">
          <input type="hidden" name="${loginResponse.type}" value="${loginResponse.context}" />
        </form>
      </body>
    </html>
  `)
})
```

Encore une fois, utilisez un formulaire soumis automatiquement. C'est l'étape 6 du diagramme de séquence ci-dessus.

```typescript

// Point de terminaison IdP pour les requêtes de connexion
idpRouter.post(`/login`,
```

C'est le point de terminaison qui reçoit une requête de connexion du fournisseur de services. C'est le gestionnaire de l'étape 3 du diagramme de séquence ci-dessus.

```typescript
  async (req, res) => {
    try {
      // Solution de contournement car je n'ai pas réussi à faire fonctionner parseLoginRequest.
      // const loginRequest = await idp.parseLoginRequest(sp, 'post', req)
      const samlRequest = xmlParser.parse(Buffer.from(req.body.SAMLRequest, 'base64').toString('utf-8'))
      res.send(getLoginPage(samlRequest["samlp:AuthnRequest"]["@_ID"]))
```

Nous devrions pouvoir utiliser [`idp.parseLoginRequest`](https://github.com/tngan/samlify/blob/master/src/entity-idp.ts#L127-L144) pour lire l'ID de la requête d'authentification. Cependant, je n'ai pas réussi à le faire fonctionner et cela ne valait pas la peine d'y passer beaucoup de temps, j'utilise donc simplement un [analyseur XML à usage général](https://www.npmjs.com/package/fast-xml-parser). L'information dont nous avons besoin est l'attribut `ID` à l'intérieur de la balise `<samlp:AuthnRequest>`, qui se trouve au niveau supérieur du XML.

## Utiliser les signatures Ethereum {#using-ethereum-signatures}

Maintenant que nous pouvons envoyer une identité d'utilisateur au fournisseur de services, l'étape suivante consiste à obtenir l'identité de l'utilisateur de manière fiable. Viem nous permet de simplement demander au portefeuille l'adresse de l'utilisateur, mais cela signifie demander l'information au navigateur. Nous ne contrôlons pas le navigateur, nous ne pouvons donc pas faire automatiquement confiance à la réponse que nous en obtenons.

Au lieu de cela, l'IdP va envoyer au navigateur une chaîne de caractères à signer. Si le portefeuille dans le navigateur signe cette chaîne, cela signifie qu'il s'agit bien de cette adresse (c'est-à-dire qu'il connaît la clé privée qui correspond à l'adresse).

Pour voir cela en action, arrêtez l'IdP et le SP existants et exécutez ces commandes :

```sh
git checkout eth-signatures
pnpm install
pnpm start
```

Ensuite, naviguez [vers le SP](http://localhost:3000) et suivez les instructions.

Notez qu'à ce stade, nous ne savons pas comment obtenir l'adresse e-mail à partir de l'adresse Ethereum, donc à la place nous signalons `<ethereum address>@bad.email.address` au SP.

### Explication détaillée {#detailed-explanation-2}

Les changements se situent aux étapes 4 et 5 du diagramme précédent.

![SAML with an Ethereum signature](./fig-05-saml-w-signature.png)

Le seul fichier que nous avons modifié est `idp.mts`. Voici les parties modifiées.

```typescript
import { v4 as uuidv4 } from 'uuid'
import { verifyMessage } from 'viem'
```

Nous avons besoin de ces deux bibliothèques supplémentaires. Nous utilisons [`uuid`](https://www.npmjs.com/package/uuid) pour créer la valeur du [nonce](https://en.wikipedia.org/wiki/Cryptographic_nonce). La valeur elle-même n'a pas d'importance, seul le fait qu'elle ne soit utilisée qu'une seule fois compte.

La bibliothèque [`viem`](https://viem.sh/) nous permet d'utiliser les définitions d'Ethereum. Ici, nous en avons besoin pour vérifier que la signature est bien valide.

```typescript
const loginPrompt = "To access the service provider, sign this nonce: "
```

Le portefeuille demande à l'utilisateur la permission de signer le message. Un message qui n'est qu'un nonce pourrait dérouter les utilisateurs, nous incluons donc cette invite.

```typescript
// Conserver les requestIDs ici
let nonces = {}
```

Nous avons besoin des informations de la requête pour pouvoir y répondre. Nous pourrions les envoyer avec la requête (étape 4), et les recevoir en retour (étape 5). Cependant, nous ne pouvons pas faire confiance aux informations que nous obtenons du navigateur, qui est sous le contrôle d'un utilisateur potentiellement hostile. Il est donc préférable de les stocker ici, avec le nonce comme clé.

Notez que nous le faisons ici sous forme de variable par souci de simplicité. Cependant, cela présente plusieurs inconvénients :

- Nous sommes vulnérables à une attaque par déni de service. Un utilisateur malveillant pourrait tenter de se connecter plusieurs fois, remplissant ainsi notre mémoire.
- Si le processus de l'IdP doit être redémarré, nous perdons les valeurs existantes.
- Nous ne pouvons pas équilibrer la charge sur plusieurs processus, car chacun aurait sa propre variable.

Sur un système en production, nous utiliserions une base de données et implémenterions une sorte de mécanisme d'expiration.

```typescript
const getSignaturePage = requestId => {
  const nonce = uuidv4()
  nonces[nonce] = requestId
```

Créez un nonce, et stockez le `requestId` pour une utilisation future.

```typescript
  return `
<html>
  <head>
    <script type="module">
```

Ce JavaScript est exécuté automatiquement lorsque la page est chargée.

```typescript
      import { createWalletClient, custom, getAddress } from 'https://esm.sh/viem'
```

Nous avons besoin de plusieurs fonctions de `viem`.

```typescript
      if (!window.ethereum) {
          alert("Please install MetaMask or a compatible wallet and then reload")
      }
```

Nous ne pouvons fonctionner que s'il y a un portefeuille sur le navigateur.

```typescript
      const [account] = await window.ethereum.request({method: 'eth_requestAccounts'})
```

Demandez la liste des comptes au portefeuille (`window.ethereum`). Supposons qu'il y en ait au moins un, et ne stockez que le premier. 

```typescript
      const walletClient = createWalletClient({
          account,
          transport: custom(window.ethereum)
      })
```

Créez un [client de portefeuille](https://viem.sh/docs/clients/wallet) pour interagir avec le portefeuille du navigateur.

```typescript
      window.goodSignature = () => {
        walletClient.signMessage({
            message: "${loginPrompt}${nonce}"
```

Demandez à l'utilisateur de signer un message. Parce que tout ce HTML est dans une [chaîne de modèle](https://viem.sh/docs/clients/wallet), nous pouvons utiliser des variables définies dans le processus idp. C'est l'étape 4.5 dans le diagramme de séquence.

```typescript
        }).then(signature => {
            const path= "/${config.idpDir}/signature/${nonce}/" + account + "/" + signature
            window.location.href = path
        })
      }
```

Redirigez vers `/idp/signature/<nonce>/<address>/<signature>`. C'est l'étape 5 dans le diagramme de séquence.

```typescript
      window.badSignature = () => {
        const path= "/${config.idpDir}/signature/${nonce}/" + 
          getAddress("0x" + "BAD060A7".padEnd(40, "0")) + 
          "/0x" + "BAD0516".padStart(130, "0")
        window.location.href = path
      }
```

La signature est renvoyée par le navigateur, qui est potentiellement malveillant (rien ne vous empêche d'ouvrir simplement `http://localhost:3001/idp/signature/bad-nonce/bad-address/bad-signature` dans le navigateur). Par conséquent, il est important de vérifier que le processus de l'IdP gère correctement les mauvaises signatures.

```typescript
    </script>
  </head>
  <body>
    <h2>Please sign</h2>
    <button onClick="window.goodSignature()">
      Submit a good (valid) signature
    </button>
    <br/>
    <button onClick="window.badSignature()">
      Submit a bad (invalid) signature
    </button>
  </body>
</html>  
`
}
```

Le reste n'est que du HTML standard.

```typescript
idpRouter.get("/signature/:nonce/:account/:signature", async (req, res) => {
```

C'est le gestionnaire pour l'étape 5 dans le diagramme de séquence.

```typescript
  const requestId = nonces[req.params.nonce]
  if (requestId === undefined) {
    res.send("Bad nonce")
    return ;
  }  
  
  nonces[req.params.nonce] = undefined
```

Obtenez l'ID de la requête, et supprimez le nonce de `nonces` pour vous assurer qu'il ne peut pas être réutilisé.

```typescript
  try {
```

Parce qu'il y a tellement de façons dont la signature peut être invalide, nous enveloppons cela dans un bloc `try ... catch` pour attraper toutes les erreurs levées.

```typescript
    const validSignature = await verifyMessage({
      address: req.params.account,
      message: `${loginPrompt}${req.params.nonce}`,
      signature: req.params.signature
    })
```

Utilisez [`verifyMessage`](https://viem.sh/docs/actions/public/verifyMessage#verifymessage) pour implémenter l'étape 5.5 dans le diagramme de séquence.

```typescript
    if (!validSignature)
      throw("Bad signature")
  } catch (err) {
    res.send("Error:" + err)
    return ;
  }
```

Le reste du gestionnaire est équivalent à ce que nous avons fait dans le gestionnaire `/loginSubmitted` précédemment, à l'exception d'un petit changement.

```typescript
  const loginResponse = await idp.createLoginResponse(
      .
      .
      .
    {
      email: req.params.account + "@bad.email.address"
    }
  );
```

Nous n'avons pas l'adresse e-mail réelle (nous l'obtiendrons dans la section suivante), donc pour l'instant nous renvoyons l'adresse Ethereum et la marquons clairement comme n'étant pas une adresse e-mail.


```typescript
// Point de terminaison IdP pour les requêtes de connexion
idpRouter.post(`/login`,
  async (req, res) => {
    try {
      // Solution de contournement car je n'ai pas réussi à faire fonctionner parseLoginRequest.
      // const loginRequest = await idp.parseLoginRequest(sp, 'post', req)
      const samlRequest = xmlParser.parse(Buffer.from(req.body.SAMLRequest, 'base64').toString('utf-8'))
      res.send(getSignaturePage(samlRequest["samlp:AuthnRequest"]["@_ID"]))
    } catch (err) {
      console.error('Error processing SAML response:', err);
      res.status(400).send('SAML authentication failed');
    }
  }
)
```

Au lieu de `getLoginPage`, utilisez maintenant `getSignaturePage` dans le gestionnaire de l'étape 3.

## Obtenir l'adresse e-mail {#getting-the-email-address}

L'étape suivante consiste à obtenir l'adresse e-mail, l'identifiant demandé par le fournisseur de services. Pour ce faire, nous utilisons l'[Ethereum Attestation Service (EAS)](https://attest.org/).

La façon la plus simple d'obtenir des attestations est d'utiliser l'[API GraphQL](https://docs.attest.org/docs/developer-tools/api). Nous utilisons cette requête :

```
query GetAttestationsByRecipient {
  attestations(
    where: { 
      recipient: { equals: "${getAddress(ethAddr)}" }
      schemaId: { equals: "0xfa2eff59a916e3cc3246f9aec5e0ca00874ae9d09e4678e5016006f07622f977" }
    }
    take: 1
  ) { 
    data
    id
    attester
  }
}
```

Ce [`schemaId`](https://optimism.easscan.org/schema/view/0xfa2eff59a916e3cc3246f9aec5e0ca00874ae9d09e4678e5016006f07622f977) inclut juste une adresse e-mail. Cette requête demande des attestations de ce schéma. Le sujet de l'attestation est appelé le `recipient`. C'est toujours une adresse Ethereum.

Avertissement : La façon dont nous obtenons les attestations ici présente deux problèmes de sécurité.

- Nous allons vers le point de terminaison de l'API, `https://optimism.easscan.org/graphql`, qui est un composant centralisé. Nous pouvons obtenir l'attribut `id` puis faire une recherche onchain pour vérifier qu'une attestation est réelle, mais le point de terminaison de l'API peut toujours censurer les attestations en ne nous en informant pas. 

  Ce problème n'est pas impossible à résoudre, nous pourrions exécuter notre propre point de terminaison GraphQL et obtenir les attestations à partir des journaux de la chaîne, mais c'est excessif pour nos besoins.

- Nous ne regardons pas l'identité de l'attestateur. N'importe qui peut nous fournir de fausses informations. Dans une implémentation dans le monde réel, nous aurions un ensemble d'attestateurs de confiance et ne regarderions que leurs attestations.

Pour voir cela en action, arrêtez l'IdP et le SP existants et exécutez ces commandes :

```sh
git checkout email-address
pnpm install
pnpm start
```

Ensuite, fournissez votre adresse e-mail. Vous avez deux façons de le faire :

- Importez un portefeuille en utilisant une clé privée, et utilisez la clé privée de test `0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80`.

- Ajoutez une attestation pour votre propre adresse e-mail :

  1. Naviguez vers [le schéma dans l'explorateur d'attestations](https://optimism.easscan.org/schema/view/0xfa2eff59a916e3cc3246f9aec5e0ca00874ae9d09e4678e5016006f07622f977).

  2. Cliquez sur **Attest with Schema** (Attester avec le schéma).

  3. Entrez votre adresse Ethereum comme destinataire, votre adresse e-mail comme adresse e-mail, et sélectionnez **Onchain**. Cliquez ensuite sur **Make Attestation** (Faire une attestation).

  4. Approuvez la transaction dans votre portefeuille. Vous aurez besoin d'un peu d'ETH sur [la chaîne de blocs Optimism](https://app.optimism.io/bridge/deposit) pour payer le gaz.

Dans tous les cas, après avoir fait cela, naviguez vers [http://localhost:3000](http://localhost:3000) et suivez les instructions. Si vous avez importé la clé privée de test, l'e-mail que vous recevez est `test_addr_0@example.com`. Si vous avez utilisé votre propre adresse, ce devrait être ce que vous avez attesté.

### Explication détaillée {#detailed-explanation-3}

![Getting from Ethereum address to e-mail](./fig-06-saml-sig-n-email.png)

Les nouvelles étapes sont la communication GraphQL, étapes 5.6 et 5.7.

Encore une fois, voici les parties modifiées de `idp.mts`.

```typescript
import { GraphQLClient } from 'graphql-request'
import { SchemaEncoder } from '@ethereum-attestation-service/eas-sdk'
```

Importez les bibliothèques dont nous avons besoin.

```typescript
const graphqlEndpointUrl = "https://optimism.easscan.org/graphql"
```

Il y a [un point de terminaison distinct pour chaque chaîne de blocs](https://docs.attest.org/docs/developer-tools/api).

```typescript
const graphqlClient = new GraphQLClient(graphqlEndpointUrl, { fetch })
```

Créez un nouveau client `GraphQLClient` que nous pouvons utiliser pour interroger le point de terminaison.

```typescript
const graphqlSchema = 'string emailAddress'
const graphqlEncoder = new SchemaEncoder(graphqlSchema)
```

GraphQL ne nous donne qu'un objet de données opaque avec des octets. Pour le comprendre, nous avons besoin du schéma. 

```typescript
const ethereumAddressToEmail = async ethAddr => {
```

Une fonction pour passer d'une adresse Ethereum à une adresse e-mail.

```typescript
  const query = `
    query GetAttestationsByRecipient {
```

Ceci est une requête GraphQL.

```typescript
      attestations(
```

Nous recherchons des attestations.

```typescript
        where: { 
          recipient: { equals: "${getAddress(ethAddr)}" }
          schemaId: { equals: "0xfa2eff59a916e3cc3246f9aec5e0ca00874ae9d09e4678e5016006f07622f977" }
        }
```

Les attestations que nous voulons sont celles de notre schéma, où le destinataire est `getAddress(ethAddr)`. La fonction [`getAddress`](https://viem.sh/docs/utilities/getAddress#getaddress) s'assure que notre adresse a la bonne [somme de contrôle](https://github.com/ethereum/ercs/blob/master/ERCS/erc-55.md). C'est nécessaire car GraphQL est sensible à la casse. "0xBAD060A7", "0xBad060A7" et "0xbad060a7" sont des valeurs différentes.

```typescript
        take: 1
```

Peu importe le nombre d'attestations que nous trouvons, nous ne voulons que la première.

```typescript
      ) {
        data
        id
        attester
      }
    }`
```

Les champs que nous voulons recevoir.

- `attester` : L'adresse qui a soumis l'attestation. Normalement, cela est utilisé pour décider s'il faut faire confiance à l'attestation ou non.
- `id` : L'ID de l'attestation. Vous pouvez utiliser cette valeur pour [lire l'attestation onchain](https://optimism.blockscout.com/address/0x4200000000000000000000000000000000000021?tab=read_proxy&source_address=0x4E0275Ea5a89e7a3c1B58411379D1a0eDdc5b088#0xa3112a64) afin de vérifier que les informations de la requête GraphQL sont correctes.
- `data` : Les données du schéma (dans ce cas, l'adresse e-mail).

```typescript
  const queryResult = await graphqlClient.request(query)

  if (queryResult.attestations.length == 0)
    return "no_address@available.is"
```

S'il n'y a pas d'attestation, renvoyez une valeur qui est manifestement incorrecte, mais qui semblerait valide pour le fournisseur de services.

```typescript
  const attestationDataFields = graphqlEncoder.decodeData(queryResult.attestations[0].data)
  return attestationDataFields[0].value.value
}
```

S'il y a une valeur, utilisez `decodeData` pour décoder les données. Nous n'avons pas besoin des métadonnées qu'elle fournit, juste de la valeur elle-même.

```typescript
  const loginResponse = await idp.createLoginResponse(
    sp, 
    {
      .
      .
      .
    },
    "post",
    {
      email: await ethereumAddressToEmail(req.params.account)
    }
  );
```

Utilisez la nouvelle fonction pour obtenir l'adresse e-mail.

## Qu'en est-il de la décentralisation ? {#what-about-decentralization}

Dans cette configuration, les utilisateurs ne peuvent pas prétendre être quelqu'un qu'ils ne sont pas, tant que nous nous appuyons sur des attestateurs dignes de confiance pour le mappage de l'adresse Ethereum vers l'adresse e-mail. Cependant, notre fournisseur d'identité est toujours un composant centralisé. Quiconque possède la clé privée du fournisseur d'identité peut envoyer de fausses informations au fournisseur de services.

Il existe peut-être une solution utilisant le [calcul multipartite (MPC)](https://en.wikipedia.org/wiki/Secure_multi-party_computation). J'espère écrire à ce sujet dans un futur tutoriel.

## Conclusion {#conclusion}

L'adoption d'un standard de connexion, tel que les signatures Ethereum, est confrontée au problème de la poule et de l'œuf. Les fournisseurs de services veulent séduire le marché le plus large possible. Les utilisateurs veulent pouvoir accéder aux services sans avoir à se soucier de la prise en charge de leur standard de connexion.
La création d'adaptateurs, tels qu'un IdP Ethereum, peut nous aider à surmonter cet obstacle.

[Voir ici pour plus de mes travaux](https://cryptodocguy.pro/).