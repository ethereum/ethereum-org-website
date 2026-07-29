---
title: Authentification sur Ethereum
description: "Découvrez comment fonctionne l'authentification des utilisateurs dans les applications Ethereum : pas de mots de passe, juste des portefeuilles et des signatures."
lang: fr
---

Si vous venez du développement web traditionnel, vous êtes habitué à la connexion par nom d'utilisateur/mot de passe, aux flux OAuth et aux cookies de session. L'authentification sur Ethereum fonctionne différemment, et à bien des égards, plus simplement.

Sur Ethereum, un utilisateur prouve son identité en **signant un message avec son portefeuille**. Aucun mot de passe à stocker. Aucune base de données d'identifiants susceptible de fuiter. Juste de la cryptographie.

## En quoi est-ce différent du Web2 ? {#how-is-it-different}

| Web2                              | Ethereum                                         |
| --------------------------------- | ------------------------------------------------ |
| Nom d'utilisateur + mot de passe  | Adresse de portefeuille + signature              |
| Le serveur stocke les identifiants| L'utilisateur détient la clé privée              |
| Sessions gérées par cookies / JWT | Les sessions commencent par une signature de portefeuille hors chaîne |
| « Se connecter avec Google »      | « Se connecter avec Ethereum »                   |
| Flux de réinitialisation de mot de passe | Récupération par phrase secrète                  |

Le changement fondamental : dans le Web2, un serveur centralisé vous authentifie. Sur Ethereum, **vous vous authentifiez vous-même** en prouvant que vous contrôlez une adresse spécifique, et n'importe qui peut le vérifier de manière indépendante.

## Prérequis {#prerequisites}

Assurez-vous de bien comprendre :

- [Les comptes Ethereum et leur fonctionnement](/developers/docs/accounts/)
- [Ce qu'est un portefeuille et comment en connecter un](/wallets/)
- [Les bases de la cryptographie à clé publique et privée](/developers/docs/accounts/#externally-owned-accounts-and-key-pairs)

## Comment fonctionne l'authentification basée sur le portefeuille {#how-wallet-auth-works}

Le flux principal est simple :

1. **Votre application décentralisée (dapp) demande à l'utilisateur de connecter son portefeuille** (via MetaMask, Rainbow, WalletConnect, etc.)
2. **Le portefeuille partage l'adresse Ethereum de l'utilisateur** - c'est son identifiant public
3. **Votre dapp génère un message unique** (un nonce ou un défi)
4. **L'utilisateur signe le message** avec sa clé privée (cela se passe à l'intérieur du portefeuille)
5. **Votre backend vérifie la signature** par rapport à l'adresse revendiquée
6. **Si elle est valide, l'utilisateur est authentifié**

Aucun mot de passe n'a jamais été tapé, stocké ou transmis.

## Se connecter avec Ethereum (EIP-4361) {#sign-in-with-ethereum}

L'[EIP-4361](https://eips.ethereum.org/EIPS/eip-4361) définit un format de message standard pour la connexion à Ethereum, communément appelé **SIWE** (Sign-In with Ethereum). Il remplace la signature de message ad hoc par un standard structuré et sécurisé.

Un message SIWE ressemble à ceci :

```yaml
example.com wants you to sign in with your Ethereum account:
0xAb5801a7D398351b8bE11C439e05C5B3259aeC9B

I accept the Terms of Service: https://example.com/tos

URI: https://example.com/login
Version: 1
Chain ID: 1
Nonce: 32891757
Issued At: 2024-06-12T14:30:00Z
```

Caractéristiques principales de SIWE :

- **Liaison de domaine** - le message inclut le domaine, ce qui empêche l'hameçonnage (phishing)
- **ID de chaîne** - spécifie pour quel réseau la signature est valide
- **Nonce** - empêche les attaques par rejeu
- **Expiration** - horodatage optionnel limitant la fenêtre de validité
- **Ressources** - URI optionnelles pour un accès restreint

### Bibliothèques SIWE {#siwe-libraries}

- **[siwe](https://github.com/spruceid/siwe)** - Implémentation officielle en TypeScript par Spruce
- **[siwe-rs](https://github.com/spruceid/siwe-rs)** - Implémentation en Rust
- **[siwe-go](https://github.com/spruceid/siwe-go)** - Implémentation en Go

### Exemple : connexion côté client avec siwe {#example-siwe-client}

```ts
import { SiweMessage } from 'siwe'
import { BrowserProvider } from 'ethers'

async function signIn() {
  const provider = new BrowserProvider(window.ethereum)
  const signer = await provider.getSigner()
  const address = await signer.getAddress()

  // 1. Obtenir un nonce depuis votre backend
  const { nonce } = await fetch('/api/auth/nonce').then(r => r.json())

  // 2. Créer et signer le message SIWE
  const message = new SiweMessage({
    domain: window.location.host,
    address,
    statement: 'Sign in to My Dapp',
    uri: window.location.origin,
    version: '1',
    chainId: 1,
    nonce,
  })

  const signature = await signer.signMessage(message.prepareMessage())

  // 3. Envoyer au backend pour vérification
  await fetch('/api/auth/verify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message, signature }),
  })
}
```

### Exemple : vérification côté serveur (Node.js) {#example-siwe-server}

```ts
import { SiweMessage, generateNonce } from 'siwe'

// Émettre un nonce et le stocker dans la session pour que /verify puisse le vérifier plus tard
app.get('/api/auth/nonce', (req, res) => {
  req.session.nonce = generateNonce()
  res.json({ nonce: req.session.nonce })
})

app.post('/api/auth/verify', async (req, res) => {
  try {
    const { message, signature } = req.body
    const siweMessage = new SiweMessage(message)

    const { success, data } = await siweMessage.verify({
      signature,
      nonce: req.session.nonce,
    })

    if (success) {
      // data.address est l'adresse Ethereum vérifiée
      // Créer une session ou un JWT pour l'utilisateur
      req.session.address = data.address
      res.json({ ok: true, address: data.address })
    }
  } catch {
    res.status(401).json({ error: 'Invalid signature' })
  }
})
```

## Bibliothèques de connexion de portefeuille {#wallet-connection-libraries}

Avant de s'authentifier, l'utilisateur doit connecter son portefeuille. Ces bibliothèques facilitent la tâche :

- **[RainbowKit](https://www.rainbowkit.com/)** - Composant React prêt à l'emploi avec une belle interface utilisateur
- **[ConnectKit](https://docs.family.co/connectkit)** - Fenêtre modale de connexion de portefeuille prête à intégrer
- **[AppKit (WalletConnect)](https://reown.com/appkit)** - Connexion de portefeuille multichaîne avec SIWE intégré
- **[Wagmi](https://wagmi.sh)** - Bibliothèque de Hooks React avec `useAccount`, `useConnect`

## Vérification manuelle des signatures {#verifying-manually}

Si vous préférez ne pas utiliser SIWE, vous pouvez vérifier les signatures directement :

```ts
import { verifyMessage } from 'ethers'

// Le message que l'utilisateur a signé
const message = `Sign in to My Dapp. Nonce: ${storedNonce}`

// Récupérer l'adresse du signataire à partir de la signature
const recoveredAddress = verifyMessage(message, signature)

// Comparer avec l'adresse revendiquée
if (recoveredAddress.toLowerCase() === claimedAddress.toLowerCase()) {
  // Authentification réussie
}
```

### Notes de sécurité importantes {#security-notes}

- **Utilisez toujours un nonce** - empêche les attaques par rejeu où une ancienne signature est réutilisée
- **Incluez le domaine** - empêche les signatures d'être valides sur différents sites
- **Vérifiez l'expiration** - les signatures doivent avoir une fenêtre de validité limitée
- **Utilisez SIWE (EIP-4361) lorsque c'est possible** - il gère tout ce qui précède pour vous
- **N'exposez jamais les clés privées** - la signature se produit à l'intérieur du portefeuille ; votre application ne voit que le résultat

## Gestion des sessions {#session-management}

Une fois authentifié, vous avez toujours besoin de sessions, tout comme dans le Web2. Modèles courants :

- **Jetons JWT** - émettez un JWT après avoir vérifié la signature, à utiliser pour les requêtes API
- **Sessions côté serveur** - stockez l'adresse vérifiée dans un cookie de session
- **SIWE avec ressources** - définissez des jetons d'accès restreints liés à des URI spécifiques

La principale différence avec le Web2 : l'adresse Ethereum de l'utilisateur est son identité persistante. Il peut l'utiliser sur n'importe quelle dapp sans créer de nouveau compte.

## Identité décentralisée {#decentralized-identity}

L'authentification Ethereum fait partie d'un mouvement plus large vers l'**identité auto-souveraine**. Les standards et projets dans cet espace incluent :

- **[Ethereum Name Service (ENS)](https://ens.domains/)** - Noms lisibles par l'homme (par ex., `vitalik.eth`) qui se résolvent en adresses
- **[Ethereum Attestation Service (EAS)](https://attest.org/)** - Attestations onchain concernant l'identité et les informations d'identification
- **[Identifiants décentralisés (DID) du W3C](https://www.w3.org/TR/did-core/)** - Standard mondial pour l'identité décentralisée vérifiable
- **[Ceramic Network](https://ceramic.network/)** - Flux de données décentralisés liés à une identité décentralisée (DID)

## Complément d'information {#further-reading}

- [EIP-4361 : Se connecter avec Ethereum](https://eips.ethereum.org/EIPS/eip-4361)
- [Documentation SIWE](https://docs.login.xyz/)
- [Se connecter avec Ethereum sur Auth0](https://auth0.com/blog/sign-in-with-ethereum-siwe-now-available-on-auth0/)
- [Documentation d'authentification Reown AppKit](https://docs.reown.com/appkit/authentication)
- [Documentation ENS](https://docs.ens.domains/)

## Sujets connexes {#related-topics}

- [Comptes Ethereum](/developers/docs/accounts/)
- [Bibliothèques d'API JavaScript](/developers/docs/apis/javascript/)
- [Bibliothèques d'API backend](/developers/docs/apis/backend/)
- [Portefeuilles](/wallets/)