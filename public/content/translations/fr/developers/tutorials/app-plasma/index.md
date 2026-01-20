---
title: Écrire un plasma spécifique à une application qui préserve la confidentialité
description: Dans ce tutoriel, nous créons une banque semi-secrète pour les dépôts. La banque est un composant centralisé ; elle connaît le solde de chaque utilisateur. Cependant, ces informations ne sont pas stockées sur la chaîne. Au lieu de cela, la banque publie un hachage de l'état. Chaque fois qu'une transaction a lieu, la banque publie le nouveau hachage, ainsi qu'une preuve à divulgation nulle de connaissance qu'elle a une transaction signée qui change l'état de hachage au nouveau. Après avoir lu ce tutoriel, vous comprendrez non seulement comment utiliser les preuves à divulgation nulle de connaissance, mais aussi pourquoi vous les utilisez et comment le faire en toute sécurité.
author: Ori Pomerantz
tags:
  [
    "preuve à divulgation nulle de connaissance",
    "serveur",
    "hors-chaîne",
    "confidentialité"
  ]
skill: advanced
lang: fr
published: 15/10/2025
---

## Introduction {#introduction}

Contrairement aux [rollups](/developers/docs/scaling/zk-rollups/), les [plasmas](/developers/docs/scaling/plasma) utilisent le réseau principal Ethereum pour l'intégrité, mais pas pour la disponibilité. Dans cet article, nous écrivons une application qui se comporte comme un plasma, avec Ethereum garantissant l'intégrité (pas de changements non autorisés) mais pas la disponibilité (un composant centralisé peut tomber en panne et désactiver tout le système).

L'application que nous écrivons ici est une banque qui préserve la confidentialité. Différentes adresses ont des comptes avec des soldes, et elles peuvent envoyer de l'argent (ETH) à d'autres comptes. La banque publie les hachages de l'état (comptes et soldes) et des transactions, mais garde les soldes réels hors chaîne où ils peuvent rester privés.

## Conception {#design}

Ce n'est pas un système prêt pour la production, mais un outil pédagogique. En tant que tel, il est écrit avec plusieurs hypothèses simplificatrices.

- Pool de comptes fixe. Il y a un nombre spécifique de comptes, et chaque compte appartient à une adresse prédéterminée. Cela rend le système beaucoup plus simple car il est difficile de gérer des structures de données de taille variable dans les preuves à divulgation nulle de connaissance. Pour un système prêt pour la production, nous pouvons utiliser la [racine de Merkle](/developers/tutorials/merkle-proofs-for-offline-data-integrity/) comme hachage d'état et fournir des preuves de Merkle pour les soldes requis.

- Stockage en mémoire. Sur un système de production, nous devons écrire tous les soldes des comptes sur le disque pour les préserver en cas de redémarrage. Ici, ce n'est pas grave si les informations sont simplement perdues.

- Transferts uniquement. Un système de production nécessiterait un moyen de déposer des actifs dans la banque et de les retirer. Mais le but ici est simplement d'illustrer le concept, donc cette banque est limitée aux transferts.

### Preuves à divulgation nulle de connaissance {#zero-knowledge-proofs}

À un niveau fondamental, une preuve à divulgation nulle de connaissance montre que le prouveur connaît certaines données, _Données<sub>privées</sub>_, de telle sorte qu'il existe une relation _Relation_ entre certaines données publiques, _Données<sub>publiques</sub>_, et _Données<sub>privées</sub>_. Le vérificateur connaît la _Relation_ et les _Données<sub>publiques</sub>_.

Pour préserver la confidentialité, nous avons besoin que les états et les transactions soient privés. Mais pour garantir l'intégrité, nous avons besoin que le [hachage cryptographique](https://en.wikipedia.org/wiki/Cryptographic_hash_function) des états soit public. Pour prouver aux personnes qui soumettent des transactions que ces transactions ont bien eu lieu, nous devons également publier les hachages de transaction.

Dans la plupart des cas, _Données<sub>privées</sub>_ est l'entrée du programme de preuve à divulgation nulle de connaissance, et _Données<sub>publiques</sub>_ est la sortie.

Ces champs dans _Données<sub>privées</sub>_ :

- _État<sub>n</sub>_, l'ancien état
- _État<sub>n+1</sub>_, le nouvel état
- _Transaction_, une transaction qui passe de l'ancien état au nouveau. Cette transaction doit inclure ces champs :
  - _Adresse de destination_ qui reçoit le transfert
  - _Montant_ transféré
  - _Nonce_ pour garantir que chaque transaction ne puisse être traitée qu'une seule fois.
    L'adresse source n'a pas besoin de figurer dans la transaction, car elle peut être récupérée à partir de la signature.
- _Signature_, une signature qui est autorisée à effectuer la transaction. Dans notre cas, la seule adresse autorisée à effectuer une transaction est l'adresse source. Parce que notre système à divulgation nulle de connaissance fonctionne comme il le fait, nous avons également besoin de la clé publique du compte, en plus de la signature Ethereum.

Voici les champs dans _Données<sub>publiques</sub>_ :

- _Hachage(État<sub>n</sub>)_, le hachage de l'ancien état
- _Hachage(État<sub>n+1</sub>)_, le hachage du nouvel état
- _Hachage(Transaction)_, le hachage de la transaction qui fait passer l'état de _État<sub>n</sub>_ à _État<sub>n+1</sub>_.

La relation vérifie plusieurs conditions :

- Les hachages publics sont bien les bons hachages pour les champs privés.
- La transaction, lorsqu'elle est appliquée à l'ancien état, aboutit au nouvel état.
- La signature provient de l'adresse source de la transaction.

En raison des propriétés des fonctions de hachage cryptographique, la preuve de ces conditions suffit à garantir l'intégrité.

### Structures de données {#data-structures}

La structure de données principale est l'état détenu par le serveur. Pour chaque compte, le serveur garde une trace du solde du compte et d'un [nonce](https://en.wikipedia.org/wiki/Cryptographic_nonce), utilisé pour empêcher les [attaques par rejeu](https://en.wikipedia.org/wiki/Replay_attack).

### Composants {#components}

Ce système nécessite deux composants :

- Le _serveur_ qui reçoit les transactions, les traite et publie les hachages sur la chaîne ainsi que les preuves à divulgation nulle de connaissance.
- Un _contrat intelligent_ qui stocke les hachages et vérifie les preuves à divulgation nulle de connaissance pour s'assurer que les transitions d'état sont légitimes.

### Flux de données et de contrôle {#flows}

Ce sont les façons dont les différents composants communiquent pour effectuer un transfert d'un compte à un autre.

1. Un navigateur web soumet une transaction signée demandant un transfert du compte du signataire vers un autre compte.

2. Le serveur vérifie que la transaction est valide :

   - Le signataire a un compte à la banque avec un solde suffisant.
   - Le destinataire a un compte à la banque.

3. Le serveur calcule le nouvel état en soustrayant le montant transféré du solde du signataire et en l'ajoutant au solde du destinataire.

4. Le serveur calcule une preuve à divulgation nulle de connaissance que le changement d'état est valide.

5. Le serveur soumet à Ethereum une transaction qui inclut :

   - Le nouveau hachage d'état
   - Le hachage de la transaction (afin que l'expéditeur de la transaction puisse savoir qu'elle a été traitée)
   - La preuve à divulgation nulle de connaissance qui prouve que la transition vers le nouvel état est valide

6. Le contrat intelligent vérifie la preuve à divulgation nulle de connaissance.

7. Si la preuve à divulgation nulle de connaissance est validée, le contrat intelligent effectue ces actions :
   - Mettre à jour le hachage de l'état actuel avec le nouveau hachage d'état
   - Émettre une entrée de journal avec le nouveau hachage d'état et le hachage de la transaction

### Outils {#tools}

Pour le code côté client, nous allons utiliser [Vite](https://vite.dev/), [React](https://react.dev/), [Viem](https://viem.sh/) et [Wagmi](https://wagmi.sh/). Ce sont des outils standard de l'industrie ; si vous ne les connaissez pas, vous pouvez utiliser [ce tutoriel](/developers/tutorials/creating-a-wagmi-ui-for-your-contract/).

La majorité du serveur est écrite en JavaScript à l'aide de [Node](https://nodejs.org/en). La partie à divulgation nulle de connaissance est écrite en [Noir](https://noir-lang.org/). Nous avons besoin de la version `1.0.0-beta.10`, donc après avoir [installé Noir comme indiqué](https://noir-lang.org/docs/getting_started/quick_start), exécutez :

```
noirup -v 1.0.0-beta.10
```

La blockchain que nous utilisons est `anvil`, une blockchain de test locale qui fait partie de [Foundry](https://getfoundry.sh/introduction/installation).

## Implémentation {#implementation}

Comme il s'agit d'un système complexe, nous allons l'implémenter par étapes.

### Étape 1 - Divulgation nulle de connaissance manuelle {#stage-1}

Pour la première étape, nous signerons une transaction dans le navigateur, puis fournirons manuellement les informations à la preuve à divulgation nulle de connaissance. Le code à divulgation nulle de connaissance s'attend à recevoir ces informations dans `server/noir/Prover.toml` (documenté [ici](https://noir-lang.org/docs/getting_started/project_breakdown#provertoml-1)).

Pour le voir en action :

1. Assurez-vous que [Node](https://nodejs.org/en/download) et [Noir](https://noir-lang.org/install) sont installés. De préférence, installez-les sur un système UNIX tel que macOS, Linux ou [WSL](https://learn.microsoft.com/en-us/windows/wsl/install).

2. Téléchargez le code de l'étape 1 et démarrez le serveur web pour servir le code client.

   ```sh
   git clone https://github.com/qbzzt/250911-zk-bank.git -b 01-manual-zk
   cd 250911-zk-bank
   cd client
   npm install
   npm run dev
   ```

   La raison pour laquelle vous avez besoin d'un serveur web ici est que, pour prévenir certains types de fraude, de nombreux portefeuilles (tels que MetaMask) n'acceptent pas les fichiers servis directement depuis le disque

3. Ouvrez un navigateur avec un portefeuille.

4. Dans le portefeuille, saisissez une nouvelle phrase secrète. Notez que cela supprimera votre phrase secrète existante, donc _assurez-vous d'avoir une sauvegarde_.

   La phrase secrète est `test test test test test test test test test test test junk`, la phrase secrète de test par défaut pour anvil.

5. Accédez au [code côté client](http://localhost:5173/).

6. Connectez-vous au portefeuille et sélectionnez votre compte de destination et le montant.

7. Cliquez sur **Signer** et signez la transaction.

8. Sous l'en-tête **Prover.toml**, vous trouverez du texte. Remplacez `server/noir/Prover.toml` par ce texte.

9. Exécutez la preuve à divulgation nulle de connaissance.

   ```sh
   cd ../server/noir
   nargo execute
   ```

   La sortie devrait être similaire à

   ```
   ori@CryptoDocGuy:~/noir/250911-zk-bank/server/noir$ nargo execute

   [zkBank] Témoin de circuit résolu avec succès
   [zkBank] Témoin enregistré dans target/zkBank.gz
   [zkBank] Sortie du circuit : (0x199aa62af8c1d562a6ec96e66347bf3240ab2afb5d022c895e6bf6a5e617167b, 0x0cfc0a67cb7308e4e9b254026b54204e34f6c8b041be207e64c5db77d95dd82d, 0x450cf9da6e180d6159290554ae3d8787, 0x6d8bc5a15b9037e52fb59b6b98722a85)
   ```

10. Comparez les deux dernières valeurs au hachage que vous voyez sur le navigateur web pour voir si le message est correctement haché.

#### `server/noir/Prover.toml` {#server-noir-prover-toml}

[Ce fichier](https://github.com/qbzzt/250911-zk-bank/blob/01-manual-zk/server/noir/Prover.toml) montre le format d'information attendu par Noir.

```toml
message="send 0x70997970C51812dc3A010C7d01b50e0d17dc79C8 500 finney (milliEth) 0                             "
```

Le message est au format texte, ce qui le rend facile à comprendre pour l'utilisateur (ce qui est nécessaire lors de la signature) et à analyser pour le code Noir. Le montant est exprimé en finneys pour permettre des transferts fractionnés d'une part, et être facilement lisible d'autre part. Le dernier nombre est le [nonce](https://en.wikipedia.org/wiki/Cryptographic_nonce).

La chaîne de caractères fait 100 caractères de long. Les preuves à divulgation nulle de connaissance ne gèrent pas bien les données de taille variable, il est donc souvent nécessaire de compléter les données.

```toml
pubKeyX=["0x83",...,"0x75"]
pubKeyY=["0x35",...,"0xa5"]
signature=["0xb1",...,"0x0d"]
```

Ces trois paramètres sont des tableaux d'octets de taille fixe.

```toml
[[accounts]]
address="0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"
balance=100_000
nonce=0

[[accounts]]
address="0x70997970C51812dc3A010C7d01b50e0d17dc79C8"
balance=100_000
nonce=0
```

C'est la façon de spécifier un tableau de structures. Pour chaque entrée, nous spécifions l'adresse, le solde (en milliETH alias [finney](https://cryptovalleyjournal.com/glossary/finney/)), et la valeur de nonce suivante.

#### `client/src/Transfer.tsx` {#client-src-transfer-tsx}

[Ce fichier](https://github.com/qbzzt/250911-zk-bank/blob/01-manual-zk/client/src/Transfer.tsx) met en œuvre le traitement côté client et génère le fichier `server/noir/Prover.toml` (celui qui inclut les paramètres de la preuve à divulgation nulle de connaissance).

Voici l'explication des parties les plus intéressantes.

```tsx
export default attrs =>  {
```

Cette fonction crée le composant React `Transfer`, que d'autres fichiers peuvent importer.

```tsx
  const accounts = [
    "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
    "0x70997970C51812dc3A010C7d01b50e0d17dc79C8",
    "0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC",
    "0x90F79bf6EB2c4f870365E785982E1f101E93b906",
    "0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65",
  ]
```

Ce sont les adresses de compte, les adresses créées par le `test... phrase secrète `test junk\`. Si vous voulez utiliser vos propres adresses, il suffit de modifier cette définition.

```tsx
  const account = useAccount()
  const wallet = createWalletClient({
    transport: custom(window.ethereum!)
  })
```

Ces [hooks Wagmi](https://wagmi.sh/react/api/hooks) nous permettent d'accéder à la bibliothèque [viem](https://viem.sh/) et au portefeuille.

```tsx
  const message = `send ${toAccount} ${ethAmount*1000} finney (milliEth) ${nonce}`.padEnd(100, " ")
```

C'est le message, complété par des espaces. Chaque fois qu'une des variables [`useState`](https://react.dev/reference/react/useState) change, le composant est redessiné et `message` est mis à jour.

```tsx
  const sign = async () => {
```

Cette fonction est appelée lorsque l'utilisateur clique sur le bouton **Signer**. Le message est automatiquement mis à jour, mais la signature nécessite l'approbation de l'utilisateur dans le portefeuille, et nous ne voulons pas la demander sauf si nécessaire.

```tsx
    const signature = await wallet.signMessage({
        account: fromAccount,
        message,
    })
```

Demander au portefeuille de [signer le message](https://viem.sh/docs/accounts/local/signMessage).

```tsx
    const hash = hashMessage(message)
```

Obtenir le hachage du message. Il est utile de le fournir à l'utilisateur pour le débogage (du code Noir).

```tsx
    const pubKey = await recoverPublicKey({
        hash,
        signature
    })
```

[Obtenir la clé publique](https://viem.sh/docs/utilities/recoverPublicKey). Ceci est requis pour la fonction Noir [`ecrecover`](https://github.com/colinnielsen/ecrecover-noir).

```tsx
    setSignature(signature)
    setHash(hash)
    setPubKey(pubKey)
```

Définir les variables d'état. Cela redessine le composant (après la fin de la fonction `sign`) et montre à l'utilisateur les valeurs mises à jour.

```tsx
    let proverToml = `
```

Le texte pour `Prover.toml`.

```tsx
message="${message}"

pubKeyX=${hexToArray(pubKey.slice(4,4+2*32))}
pubKeyY=${hexToArray(pubKey.slice(4+2*32))}
```

Viem nous fournit la clé publique sous la forme d'une chaîne hexadécimale de 65 octets. Le premier octet est `0x04`, un marqueur de version. Il est suivi de 32 octets pour le `x` de la clé publique, puis de 32 octets pour le `y` de la clé publique.

Cependant, Noir s'attend à recevoir cette information sous forme de deux tableaux d'octets, un pour `x` et un pour `y`. Il est plus facile de l'analyser ici, côté client, plutôt que dans le cadre de la preuve à divulgation nulle de connaissance.

Notez que c'est une bonne pratique en matière de preuve à divulgation nulle de connaissance en général. Le code à l'intérieur d'une preuve à divulgation nulle de connaissance est coûteux, donc tout traitement qui peut être effectué en dehors de la preuve à divulgation nulle de connaissance _devrait_ être effectué en dehors de la preuve à divulgation nulle de connaissance.

```tsx
signature=${hexToArray(signature.slice(2,-2))}
```

La signature est également fournie sous la forme d'une chaîne hexadécimale de 65 octets. Cependant, le dernier octet n'est nécessaire que pour récupérer la clé publique. Comme la clé publique sera déjà fournie au code Noir, nous n'en avons pas besoin pour vérifier la signature, et le code Noir ne l'exige pas.

```tsx
${accounts.map(accountInProverToml).reduce((a,b) => a+b, "")}
`
```

Fournir les comptes.

```tsx
    setProverToml(proverToml)
  }

  return (
    <>
        <h2>Transfer</h2>
```

Ceci est le format HTML (plus précisément, [JSX](https://react.dev/learn/writing-markup-with-jsx)) du composant.

#### `server/noir/src/main.nr` {#server-noir-src-main-nr}

[Ce fichier](https://github.com/qbzzt/250911-zk-bank/blob/01-manual-zk/server/noir/src/main.nr) est le code réel de la preuve à divulgation nulle de connaissance.

```
use std::hash::pedersen_hash;
```

Le [hachage de Pedersen](https://rya-sge.github.io/access-denied/2024/05/07/pedersen-hash-function/) est fourni avec la [bibliothèque standard de Noir](https://noir-lang.org/docs/noir/standard_library/cryptographic_primitives/hashes#pedersen_hash). Les preuves à divulgation nulle de connaissance utilisent couramment cette fonction de hachage. Il est beaucoup plus facile à calculer à l'intérieur de [circuits arithmétiques](https://rareskills.io/post/arithmetic-circuit) par rapport aux fonctions de hachage standard.

```
use keccak256::keccak256;
use dep::ecrecover;
```

Ces deux fonctions sont des bibliothèques externes, définies dans [`Nargo.toml`](https://github.com/qbzzt/250911-zk-bank/blob/01-manual-zk/server/noir/Nargo.toml). Elles sont précisément ce pour quoi elles sont nommées, une fonction qui calcule le [hachage keccak256](https://emn178.github.io/online-tools/keccak_256.html) et une fonction qui vérifie les signatures Ethereum et récupère l'adresse Ethereum du signataire.

```
global ACCOUNT_NUMBER : u32 = 5;
```

Noir est inspiré de [Rust](https://www.rust-lang.org/). Les variables, par défaut, sont des constantes. C'est ainsi que nous définissons les constantes de configuration globales. Plus précisément, `ACCOUNT_NUMBER` est le nombre de comptes que nous stockons.

Les types de données nommés `u<number>` sont ce nombre de bits, non signés. Les seuls types pris en charge sont `u8`, `u16`, `u32`, `u64` et `u128`.

```
global FLAT_ACCOUNT_FIELDS : u32 = 2;
```

Cette variable est utilisée pour le hachage de Pedersen des comptes, comme expliqué ci-dessous.

```
global MESSAGE_LENGTH : u32 = 100;
```

Comme expliqué ci-dessus, la longueur du message est fixe. Elle est spécifiée ici.

```
global ASCII_MESSAGE_LENGTH : [u8; 3] = [0x31, 0x30, 0x30];
global HASH_BUFFER_SIZE : u32 = 26+3+MESSAGE_LENGTH;
```

Les [signatures EIP-191](https://eips.ethereum.org/EIPS/eip-191) nécessitent un tampon avec un préfixe de 26 octets, suivi de la longueur du message en ASCII, et enfin du message lui-même.

```
struct Account {
    balance: u128,
    address: Field,
    nonce: u32,
}
```

Les informations que nous stockons sur un compte. [`Field`](https://noir-lang.org/docs/noir/concepts/data_types/fields) est un nombre, généralement jusqu'à 253 bits, qui peut être utilisé directement dans le [circuit arithmétique](https://rareskills.io/post/arithmetic-circuit) qui met en œuvre la preuve à divulgation nulle de connaissance. Ici, nous utilisons le `Field` pour stocker une adresse Ethereum de 160 bits.

```
struct TransferTxn {
    from: Field,
    to: Field,
    amount: u128,
    nonce: u32
}
```

Les informations que nous stockons pour une transaction de transfert.

```
fn flatten_account(account: Account) -> [Field; FLAT_ACCOUNT_FIELDS] {
```

Une définition de fonction. Le paramètre est une information `Account`. Le résultat est un tableau de variables `Field`, dont la longueur est `FLAT_ACCOUNT_FIELDS`

```
    let flat = [
        account.address,
        ((account.balance << 32) + account.nonce.into()).into(),
    ];
```

La première valeur dans le tableau est l'adresse du compte. La seconde inclut à la fois le solde et le nonce. Les appels `.into()` changent un nombre vers le type de données dont il a besoin. `account.nonce` est une valeur `u32`, mais pour l'ajouter à `account.balance << 32`, une valeur `u128`, elle doit être un `u128`. C'est le premier `.into()`. Le second convertit le résultat `u128` en un `Field` pour qu'il s'insère dans le tableau.

```
    flat
}
```

Dans Noir, les fonctions ne peuvent retourner une valeur qu'à la fin (il n'y a pas de retour anticipé). Pour spécifier la valeur de retour, vous l'évaluez juste avant le crochet de fermeture de la fonction.

```
fn flatten_accounts(accounts: [Account; ACCOUNT_NUMBER]) -> [Field; FLAT_ACCOUNT_FIELDS*ACCOUNT_NUMBER] {
```

Cette fonction transforme le tableau de comptes en un tableau `Field`, qui peut être utilisé comme entrée pour un hachage de Petersen.

```
    let mut flat: [Field; FLAT_ACCOUNT_FIELDS*ACCOUNT_NUMBER] = [0; FLAT_ACCOUNT_FIELDS*ACCOUNT_NUMBER];
```

C'est ainsi que vous spécifiez une variable mutable, c'est-à-dire, _pas_ une constante. Les variables dans Noir doivent toujours avoir une valeur, donc nous initialisons cette variable à tous zéros.

```
    for i in 0..ACCOUNT_NUMBER {
```

Ceci est une boucle `for`. Notez que les limites sont des constantes. Les boucles Noir doivent avoir leurs limites connues au moment de la compilation. La raison est que les circuits arithmétiques ne prennent pas en charge le contrôle de flux. Lors du traitement d'une boucle `for`, le compilateur place simplement le code qu'elle contient plusieurs fois, une pour chaque itération.

```
        let fields = flatten_account(accounts[i]);
        for j in 0..FLAT_ACCOUNT_FIELDS {
            flat[i*FLAT_ACCOUNT_FIELDS + j] = fields[j];
        }
    }

    flat
}

fn hash_accounts(accounts: [Account; ACCOUNT_NUMBER]) -> Field {
    pedersen_hash(flatten_accounts(accounts))
}
```

Enfin, nous arrivons à la fonction qui hache le tableau des comptes.

```
fn find_account(accounts: [Account; ACCOUNT_NUMBER], address: Field) -> u32 {
    let mut account : u32 = ACCOUNT_NUMBER;

    for i in 0..ACCOUNT_NUMBER {
        if accounts[i].address == address {
            account = i;
        }
    }
```

Cette fonction trouve le compte avec une adresse spécifique. Cette fonction serait terriblement inefficace dans un code standard car elle itère sur tous les comptes, même après avoir trouvé l'adresse.

Cependant, dans les preuves à divulgation nulle de connaissance, il n'y a pas de contrôle de flux. Si nous avons besoin de vérifier une condition, nous devons la vérifier à chaque fois.

Une chose similaire se produit avec les instructions `if`. L'instruction `if` dans la boucle ci-dessus est traduite en ces énoncés mathématiques.

_condition<sub>résultat</sub> = accounts[i].address == address_ // un s'ils sont égaux, zéro sinon

_compte<sub>nouveau</sub> = condition<sub>résultat</sub>\*i + (1-condition<sub>résultat</sub>)\*compte<sub>ancien</sub>_

```rust
    assert (account < ACCOUNT_NUMBER, f"{address} n'a pas de compte");

    account
}
```

La fonction [`assert`](https://noir-lang.org/docs/dev/noir/concepts/assert) provoque le plantage de la preuve à divulgation nulle de connaissance si l'assertion est fausse. Dans ce cas, si nous ne pouvons pas trouver un compte avec l'adresse pertinente. Pour signaler l'adresse, nous utilisons une [chaîne de format](https://noir-lang.org/docs/noir/concepts/data_types/strings#format-strings).

```rust
fn apply_transfer_txn(accounts: [Account; ACCOUNT_NUMBER], txn: TransferTxn) -> [Account; ACCOUNT_NUMBER] {
```

Cette fonction applique une transaction de transfert et renvoie le nouveau tableau de comptes.

```rust
    let from = find_account(accounts, txn.from);
    let to = find_account(accounts, txn.to);

    let (txnFrom, txnAmount, txnNonce, accountNonce) =
        (txn.from, txn.amount, txn.nonce, accounts[from].nonce);
```

Nous ne pouvons pas accéder aux éléments de structure à l'intérieur d'une chaîne de format dans Noir, nous créons donc une copie utilisable.

```rust
    assert (accounts[from].balance >= txn.amount,
        f"{txnFrom} n'a pas {txnAmount} finney");

    assert (accounts[from].nonce == txn.nonce,
        f"La transaction a le nonce {txnNonce}, mais le compte est censé utiliser {accountNonce}");
```

Ce sont deux conditions qui pourraient rendre une transaction invalide.

```rust
    let mut newAccounts = accounts;

    newAccounts[from].balance -= txn.amount;
    newAccounts[from].nonce += 1;
    newAccounts[to].balance += txn.amount;

    newAccounts
}
```

Créez le nouveau tableau de comptes, puis renvoyez-le.

```rust
fn readAddress(messageBytes: [u8; MESSAGE_LENGTH]) -> Field
```

Cette fonction lit l'adresse du message.

```rust
{
    let mut result : Field = 0;

    for i in 7..47 {
```

L'adresse est toujours longue de 20 octets (alias 40 chiffres hexadécimaux), et commence au caractère #7.

```rust
        result *= 0x10;
        if messageBytes[i] >= 48 & messageBytes[i] <= 57 {    // 0-9
            result += (messageBytes[i]-48).into();
        }
        if messageBytes[i] >= 65 & messageBytes[i] <= 70 {    // A-F
            result += (messageBytes[i]-65+10).into()
        }
        if messageBytes[i] >= 97 & messageBytes[i] <= 102 {   // a-f
            result += (messageBytes[i]-97+10).into()
        }        
    }    

    result
}

fn readAmountAndNonce(messageBytes: [u8; MESSAGE_LENGTH]) -> (u128, u32)
```

Lire le montant et le nonce du message.

```rust
{
    let mut amount : u128 = 0;
    let mut nonce: u32 = 0;
    let mut stillReadingAmount: bool = true;
    let mut lookingForNonce: bool = false;
    let mut stillReadingNonce: bool = false;
```

Dans le message, le premier nombre après l'adresse est le montant de finney (alias millième d'un ETH) à transférer. Le deuxième nombre est le nonce. Tout texte entre eux est ignoré.

```rust
    for i in 48..MESSAGE_LENGTH {
        if messageBytes[i] >= 48 & messageBytes[i] <= 57 {    // 0-9
            let digit = (messageBytes[i]-48);

            if stillReadingAmount {
                amount = amount*10 + digit.into();
            }

            if lookingForNonce {    // On vient de le trouver
                stillReadingNonce = true;
                lookingForNonce = false;
            }

            if stillReadingNonce {
                nonce = nonce*10 + digit.into();
            }
        } else {
            if stillReadingAmount {
                stillReadingAmount = false;
                lookingForNonce = true;
            }
            if stillReadingNonce {
                stillReadingNonce = false;
            }
        }
    }

    (amount, nonce)
}
```

Le renvoi d'un [tuple](https://noir-lang.org/docs/noir/concepts/data_types/tuples) est la manière Noir de renvoyer plusieurs valeurs d'une fonction.

```rust
fn readTransferTxn(message: str<MESSAGE_LENGTH>) -> TransferTxn 
{
    let mut txn: TransferTxn = TransferTxn { from: 0, to: 0, amount:0, nonce:0 };
    let messageBytes = message.as_bytes();

    txn.to = readAddress(messageBytes);
    let (amount, nonce) = readAmountAndNonce(messageBytes);
    txn.amount = amount;
    txn.nonce = nonce;

    txn
}
```

Cette fonction convertit le message en octets, puis convertit les montants en un `TransferTxn`.

```rust
// L'équivalent de hashMessage de Viem
// https://viem.sh/docs/utilities/hashMessage#hashmessage
fn hashMessage(message: str<MESSAGE_LENGTH>) -> [u8;32] {
```

Nous avons pu utiliser le hachage de Pedersen pour les comptes car ils ne sont hachés qu'à l'intérieur de la preuve à divulgation nulle de connaissance. Cependant, dans ce code, nous devons vérifier la signature du message, qui est générée par le navigateur. Pour cela, nous devons suivre le format de signature Ethereum dans [l'EIP 191](https://eips.ethereum.org/EIPS/eip-191). Cela signifie que nous devons créer un tampon combiné avec un préfixe standard, la longueur du message en ASCII et le message lui-même, et utiliser le keccak256 standard d'Ethereum pour le hacher.

```rust
    // Préfixe ASCII
    let prefix_bytes = [
        0x19, // \x19
        0x45, // 'E'
        0x74, // 't'
        0x68, // 'h'
        0x65, // 'e'
        0x72, // 'r'
        0x65, // 'e'
        0x75, // 'u'
        0x6D, // 'm'
        0x20, // ' '
        0x53, // 'S'
        0x69, // 'i'
        0x67, // 'g'
        0x6E, // 'n'
        0x65, // 'e'
        0x64, // 'd'
        0x20, // ' '
        0x4D, // 'M'
        0x65, // 'e'
        0x73, // 's'
        0x73, // 's'
        0x61, // 'a'
        0x67, // 'g'
        0x65, // 'e'
        0x3A, // ':'
        0x0A  // '\n'
    ];
```

Pour éviter les cas où une application demande à l'utilisateur de signer un message qui peut être utilisé comme une transaction ou à d'autres fins, l'EIP 191 spécifie que tous les messages signés commencent par le caractère 0x19 (qui n'est pas un caractère ASCII valide) suivi de `Ethereum Signed Message:` et d'un saut de ligne.

```rust
    let mut buffer: [u8; HASH_BUFFER_SIZE] = [0u8; HASH_BUFFER_SIZE];
    for i in 0..26 {
        buffer[i] = prefix_bytes[i];
    }

    let messageBytes : [u8; MESSAGE_LENGTH] = message.as_bytes();

    if MESSAGE_LENGTH <= 9 {
        for i in 0..1 {
            buffer[i+26] = ASCII_MESSAGE_LENGTH[i];
        }

        for i in 0..MESSAGE_LENGTH {
            buffer[i+26+1] = messageBytes[i];
        }
    }

    if MESSAGE_LENGTH >= 10 & MESSAGE_LENGTH <= 99 {
        for i in 0..2 {
            buffer[i+26] = ASCII_MESSAGE_LENGTH[i];
        }

        for i in 0..MESSAGE_LENGTH {
            buffer[i+26+2] = messageBytes[i];
        }
    }

    if MESSAGE_LENGTH >= 100 {
        for i in 0..3 {
            buffer[i+26] = ASCII_MESSAGE_LENGTH[i];
        }

        for i in 0..MESSAGE_LENGTH {
            buffer[i+26+3] = messageBytes[i];
        }
    }

    assert(MESSAGE_LENGTH < 1000, "Les messages dont la longueur est supérieure à trois chiffres ne sont pas pris en charge");
```

Gérer les longueurs de message jusqu'à 999 et échouer si c'est plus. J'ai ajouté ce code, même si la longueur du message est une constante, car cela facilite sa modification. Sur un système de production, vous supposeriez probablement que `MESSAGE_LENGTH` ne change pas pour une meilleure performance.

```rust
    keccak256::keccak256(buffer, HASH_BUFFER_SIZE)
}
```

Utiliser la fonction standard d'Ethereum `keccak256`.

```rust
fn signatureToAddressAndHash(
        message: str<MESSAGE_LENGTH>, 
        pubKeyX: [u8; 32],
        pubKeyY: [u8; 32],
        signature: [u8; 64]
    ) -> (Field, Field, Field)   // adresse, 16 premiers octets du hachage, 16 derniers octets du hachage        
{
```

Cette fonction vérifie la signature, ce qui nécessite le hachage du message. Elle nous fournit ensuite l'adresse qui l'a signé et le hachage du message. Le hachage du message est fourni sous forme de deux valeurs `Field` car elles sont plus faciles à utiliser dans le reste du programme qu'un tableau d'octets.

Nous devons utiliser deux valeurs `Field` car les calculs de champ sont effectués [modulo](https://en.wikipedia.org/wiki/Modulo) un grand nombre, mais ce nombre est généralement inférieur à 256 bits (sinon il serait difficile d'effectuer ces calculs dans l'EVM).

```rust
    let hash = hashMessage(message);

    let mut (hash1, hash2) = (0,0);

    for i in 0..16 {
        hash1 = hash1*256 + hash[31-i].into();
        hash2 = hash2*256 + hash[15-i].into();
    }
```

Spécifiez `hash1` et `hash2` comme des variables mutables, et écrivez le hachage dedans octet par octet.

```rust
    (
        ecrecover::ecrecover(pubKeyX, pubKeyY, signature, hash), 
```

Ceci est similaire à la fonction `ecrecover` de [Solidity](https://docs.soliditylang.org/en/v0.8.30/cheatsheet.html#mathematical-and-cryptographic-functions), avec deux différences importantes :

- Si la signature n'est pas valide, l'appel échoue sur un `assert` et le programme est interrompu.
- Bien que la clé publique puisse être récupérée à partir de la signature et du hachage, il s'agit d'un traitement qui peut être effectué en externe et qui, par conséquent, ne vaut pas la peine d'être fait à l'intérieur de la preuve à divulgation nulle de connaissance. Si quelqu'un essaie de nous tromper ici, la vérification de la signature échouera.

```rust
        hash1,
        hash2
    )
}

fn main(
        accounts: [Account; ACCOUNT_NUMBER],
        message: str<MESSAGE_LENGTH>,
        pubKeyX: [u8; 32],
        pubKeyY: [u8; 32],
        signature: [u8; 64],
    ) -> pub (
        Field,  // Hachage de l'ancien tableau de comptes
        Field,  // Hachage du nouveau tableau de comptes
        Field,  // 16 premiers octets du hachage du message
        Field,  // 16 derniers octets du hachage du message
    )
```

Enfin, nous atteignons la fonction `main`. Nous devons prouver que nous avons une transaction qui change valablement le hachage des comptes de l'ancienne valeur à la nouvelle. Nous devons également prouver qu'il a ce hachage de transaction spécifique afin que la personne qui l'a envoyé sache que sa transaction a été traitée.

```rust
{
    let mut txn = readTransferTxn(message);
```

Nous avons besoin que `txn` soit mutable car nous ne lisons pas l'adresse d'origine du message, nous la lisons à partir de la signature.

```rust
    let (fromAddress, txnHash1, txnHash2) = signatureToAddressAndHash(
        message,
        pubKeyX,
        pubKeyY,
        signature);

    txn.from = fromAddress;

    let newAccounts = apply_transfer_txn(accounts, txn);

    (
        hash_accounts(accounts),
        hash_accounts(newAccounts),
        txnHash1,
        txnHash2
    )
}
```

### Étape 2 - Ajout d'un serveur {#stage-2}

Dans la deuxième étape, nous ajoutons un serveur qui reçoit et met en œuvre les transactions de transfert du navigateur.

Pour le voir en action :

1. Arrêtez Vite s'il est en cours d'exécution.

2. Téléchargez la branche qui inclut le serveur et assurez-vous que vous avez tous les modules nécessaires.

   ```sh
   git checkout 02-add-server
   cd client
   npm install
   cd ../server
   npm install
   ```

   Il n'est pas nécessaire de compiler le code Noir, c'est le même code que vous avez utilisé pour l'étape 1.

3. Démarrer le serveur.

   ```sh
   npm run start
   ```

4. Dans une fenêtre de ligne de commande distincte, exécutez Vite pour servir le code du navigateur.

   ```sh
   cd client
   npm run dev
   ```

5. Accédez au code client sur [http://localhost:5173](http://localhost:5173)

6. Avant de pouvoir émettre une transaction, vous devez connaître le nonce, ainsi que le montant que vous pouvez envoyer. Pour obtenir ces informations, cliquez sur **Mettre à jour les données du compte** et signez le message.

   Nous avons un dilemme ici. D'un côté, nous ne voulons pas signer un message qui peut être réutilisé (une [attaque par rejeu](https://en.wikipedia.org/wiki/Replay_attack)), c'est pourquoi nous voulons un nonce en premier lieu. Cependant, nous n'avons pas encore de nonce. La solution est de choisir un nonce qui ne peut être utilisé qu'une seule fois et que nous avons déjà des deux côtés, comme l'heure actuelle.

   Le problème avec cette solution est que l'heure pourrait ne pas être parfaitement synchronisée. Donc, à la place, nous signons une valeur qui change chaque minute. Cela signifie que notre fenêtre de vulnérabilité aux attaques par rejeu est d'au plus une minute. Considérant qu'en production la requête signée sera protégée par TLS, et que l'autre côté du tunnel - le serveur - peut déjà divulguer le solde et le nonce (il doit les connaître pour fonctionner), c'est un risque acceptable.

7. Une fois que le navigateur a récupéré le solde et le nonce, il affiche le formulaire de transfert. Sélectionnez l'adresse de destination et le montant, puis cliquez sur **Transférer**. Signez cette demande.

8. Pour voir le transfert, soit **Mettez à jour les données du compte**, soit regardez dans la fenêtre où vous exécutez le serveur. Le serveur enregistre l'état à chaque fois qu'il change.

    ```
    ori@CryptoDocGuy:~/x/250911-zk-bank/server$ npm run start
    
    > server@1.0.0 start
    > node --experimental-json-modules index.mjs
    
    Écoute sur le port 3000
    Txn send 0x90F79bf6EB2c4f870365E785982E1f101E93b906 36000 finney (milliEth) 0 traitée
    Nouvel état :
    0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266 a 64000 (1)
    0x70997970C51812dc3A010C7d01b50e0d17dc79C8 a 100000 (0)
    0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC a 100000 (0)
    0x90F79bf6EB2c4f870365E785982E1f101E93b906 a 136000 (0)
    0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65 a 100000 (0)
    Txn send 0x70997970C51812dc3A010C7d01b50e0d17dc79C8 7200 finney (milliEth) 1 traitée
    Nouvel état :
    0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266 a 56800 (2)
    0x70997970C51812dc3A010C7d01b50e0d17dc79C8 a 107200 (0)
    0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC a 100000 (0)
    0x90F79bf6EB2c4f870365E785982E1f101E93b906 a 136000 (0)
    0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65 a 100000 (0)
    Txn send 0x90F79bf6EB2c4f870365E785982E1f101E93b906 3000 finney (milliEth) 2 traitée
    Nouvel état :
    0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266 a 53800 (3)
    0x70997970C51812dc3A010C7d01b50e0d17dc79C8 a 107200 (0)
    0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC a 100000 (0)
    0x90F79bf6EB2c4f870365E785982E1f101E93b906 a 139000 (0)
    0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65 a 100000 (0)
    ```

#### `server/index.mjs` {#server-index-mjs-1}

[Ce fichier](https://github.com/qbzzt/250911-zk-bank/blob/02-add-server/server/index.mjs) contient le processus serveur, et interagit avec le code Noir à [`main.nr`](https://github.com/qbzzt/250911-zk-bank/blob/02-add-server/server/noir/src/main.nr). Voici une explication des parties intéressantes.

```js
import { Noir } from '@noir-lang/noir_js'
```

La bibliothèque [noir.js](https://www.npmjs.com/package/@noir-lang/noir_js) fait l'interface entre le code JavaScript et le code Noir.

```js
const circuit = JSON.parse(await fs.readFile("./noir/target/zkBank.json"))
const noir = new Noir(circuit)
```

Chargez le circuit arithmétique - le programme Noir compilé que nous avons créé à l'étape précédente - et préparez-vous à l'exécuter.

```js
// Nous ne fournissons des informations sur le compte qu'en réponse à une demande signée
const accountInformation = async signature => {
    const fromAddress = await recoverAddress({
        hash: hashMessage("Get account data " + Math.floor((new Date().getTime())/60000)),
        signature
    })
```

Pour fournir des informations sur le compte, nous n'avons besoin que de la signature. La raison est que nous savons déjà quel sera le message, et donc le hachage du message.

```js
const processMessage = async (message, signature) => {
```

Traitez un message et exécutez la transaction qu'il encode.

```js
    // Obtenir la clé publique
    const pubKey = await recoverPublicKey({
        hash,
        signature
    })
```

Maintenant que nous exécutons JavaScript sur le serveur, nous pouvons récupérer la clé publique là-bas plutôt que sur le client.

```js
    let noirResult
    try {
        noirResult = await noir.execute({
            message,
            signature: signature.slice(2,-2).match(/.{2}/g).map(x => `0x${x}`),
            pubKeyX,
            pubKeyY,
            accounts: Accounts
        })
```

`noir.execute` exécute le programme Noir. Les paramètres sont équivalents à ceux fournis dans [`Prover.toml`](https://github.com/qbzzt/250911-zk-bank/blob/01-manual-zk/server/noir/Prover.toml). Notez que les valeurs longues sont fournies sous forme de tableau de chaînes hexadécimales (`["0x60", "0xA7"]`), et non sous forme de valeur hexadécimale unique (`0x60A7`), comme le fait Viem.

```js
    } catch (err) {
        console.log(`Erreur Noir : ${err}`)
        throw Error("Transaction invalide, non traitée")
    }
```

S'il y a une erreur, l'attraper et relayer une version simplifiée au client.

```js
    Accounts[fromAccountNumber].nonce++
    Accounts[fromAccountNumber].balance -= amount
    Accounts[toAccountNumber].balance += amount
```

Appliquez la transaction. Nous l'avons déjà fait dans le code Noir, mais il est plus facile de le faire à nouveau ici plutôt que d'en extraire le résultat.

```js
let Accounts = [
    {
        address: "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
        balance: 5000,
        nonce: 0,
    },
```

La structure `Accounts` initiale.

### Étape 3 - Contrats intelligents Ethereum {#stage-3}

1. Arrêtez les processus du serveur et du client.

2. Téléchargez la branche avec les contrats intelligents et assurez-vous que vous avez tous les modules nécessaires.

   ```sh
   git checkout 03-smart-contracts
   cd client
   npm install
   cd ../server
   npm install
   ```

3. Exécutez `anvil` dans une fenêtre de ligne de commande séparée.

4. Générez la clé de vérification et le vérificateur de solidité, puis copiez le code du vérificateur dans le projet Solidity.

   ```sh
   cd noir
   bb write_vk -b ./target/zkBank.json -o ./target --oracle_hash keccak
   bb write_solidity_verifier -k ./target/vk -o ./target/Verifier.sol
   cp target/Verifier.sol ../../smart-contracts/src
   ```

5. Allez dans les contrats intelligents et définissez les variables d'environnement pour utiliser la blockchain `anvil`.

   ```sh
   cd ../../smart-contracts
   export ETH_RPC_URL=http://localhost:8545
   ETH_PRIVATE_KEY=ac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80
   ```

6. Déployez `Verifier.sol` et stockez l'adresse dans une variable d'environnement.

   ```sh
   VERIFIER_ADDRESS=`forge create src/Verifier.sol:HonkVerifier --private-key $ETH_PRIVATE_KEY --optimize --broadcast | awk '/Deployed to:/ {print $3}'`
   echo $VERIFIER_ADDRESS
   ```

7. Déployez le contrat `ZkBank`.

   ```sh
   ZKBANK_ADDRESS=`forge create ZkBank --private-key $ETH_PRIVATE_KEY --broadcast --constructor-args $VERIFIER_ADDRESS 0x199aa62af8c1d562a6ec96e66347bf3240ab2afb5d022c895e6bf6a5e617167b | awk '/Deployed to:/ {print $3}'`
   echo $ZKBANK_ADDRESS
   ```

   La valeur `0x199..67b` est le hachage de Pederson de l'état initial de `Comptes`. Si vous modifiez cet état initial dans `server/index.mjs`, vous pouvez exécuter une transaction pour voir le hachage initial rapporté par la preuve à divulgation nulle de connaissance.

8. Lancez le serveur.

   ```sh
   cd ../server
   npm run start
   ```

9. Exécutez le client dans une autre fenêtre de ligne de commande.

   ```sh
   cd client
   npm run dev
   ```

10. Exécutez quelques transactions.

11. Pour vérifier que l'état a changé sur la chaîne, redémarrez le processus du serveur. Voyez que `ZkBank` n'accepte plus les transactions, car la valeur de hachage originale dans les transactions diffère de la valeur de hachage stockée sur la chaîne.

    C'est le type d'erreur attendu.

    ```
    ori@CryptoDocGuy:~/x/250911-zk-bank/server$ npm run start

    > server@1.0.0 start
    > node --experimental-json-modules index.mjs

    Écoute sur le port 3000
    Erreur de vérification : ContractFunctionExecutionError : La fonction de contrat "processTransaction" a été annulée pour la raison suivante :
    Mauvais hachage de l'ancien état

    Appel de contrat :
        adresse :   0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512
        fonction :  processTransaction(bytes _proof, bytes32[] _publicInputs)
        args :                        (0x0000000000000000000000000000000000000000000000042ab5d6d1986846cf00000000000000000000000000000000000000000000000b75c020998797da7800000000000000000000000000000000000000000000000
    ```

#### `server/index.mjs` {#server-index-mjs-2}

Les changements dans ce fichier concernent principalement la création de la preuve réelle et sa soumission sur la chaîne.

```js
import { exec } from 'child_process'
import util from 'util'

const execPromise = util.promisify(exec)
```

Nous devons utiliser [le paquet Barretenberg](https://github.com/AztecProtocol/aztec-packages/tree/next/barretenberg) pour créer la preuve réelle à envoyer sur la chaîne. Nous pouvons utiliser ce paquet soit en exécutant l'interface de ligne de commande (`bb`) soit en utilisant la [bibliothèque JavaScript, `bb.js`](https://www.npmjs.com/package/@aztec/bb.js). La bibliothèque JavaScript est beaucoup plus lente que l'exécution de code nativement, nous utilisons donc [`exec`](https://nodejs.org/api/child_process.html#child_processexeccommand-options-callback) ici pour utiliser la ligne de commande.

Notez que si vous décidez d'utiliser `bb.js`, vous devez utiliser une version compatible avec la version de Noir que vous utilisez. Au moment de la rédaction, la version actuelle de Noir (1.0.0-beta.11) utilise la version 0.87 de `bb.js`.

```js
const zkBankAddress = process.env.ZKBANK_ADDRESS || "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512"
```

L'adresse ici est celle que vous obtenez lorsque vous commencez avec un `anvil` propre et suivez les instructions ci-dessus.

```js
const walletClient = createWalletClient({ 
    chain: anvil, 
    transport: http(), 
    account: privateKeyToAccount("0x2a871d0798f97d79848a013d4936a73bf4cc922c825d33c1cf7073dff6d409c6")
})
```

Cette clé privée est l'un des comptes pré-financés par défaut dans `anvil`.

```js
const generateProof = async (witness, fileID) => {
```

Générer une preuve en utilisant l'exécutable `bb`.

```js
    const fname = `witness-${fileID}.gz`    
    await fs.writeFile(fname, witness)
```

Écrivez le témoin dans un fichier.

```js
    await execPromise(`bb prove -b ./noir/target/zkBank.json -w ${fname} -o ${fileID} --oracle_hash keccak --output_format fields`)
```

Créez réellement la preuve. Cette étape crée également un fichier avec les variables publiques, mais nous n'en avons pas besoin. Nous avons déjà obtenu ces variables de `noir.execute`.

```js
    const proof = "0x" + JSON.parse(await fs.readFile(`./${fileID}/proof_fields.json`)).reduce((a,b) => a+b, "").replace(/0x/g, "")
```

La preuve est un tableau JSON de valeurs `Field`, chacune représentée par une valeur hexadécimale. Cependant, nous devons l'envoyer dans la transaction en tant que valeur `bytes` unique, que Viem représente par une grande chaîne hexadécimale. Ici, nous changeons le format en concaténant toutes les valeurs, en supprimant tous les `0x`, puis en en ajoutant un à la fin.

```js
    await execPromise(`rm -r ${fname} ${fileID}`)

    return proof
}
```

Nettoyez et retournez la preuve.

```js
const processMessage = async (message, signature) => {
    .
    .
    .

    const publicFields = noirResult.returnValue.map(x=>'0x' + x.slice(2).padStart(64, "0"))
```

Les champs publics doivent être un tableau de valeurs de 32 octets. Cependant, comme nous devions diviser le hachage de la transaction entre deux valeurs `Field`, il apparaît comme une valeur de 16 octets. Ici, nous ajoutons des zéros pour que Viem comprenne qu'il s'agit bien de 32 octets.

```js
    const proof = await generateProof(noirResult.witness, `${fromAddress}-${nonce}`)
```

Chaque adresse n'utilise chaque nonce qu'une seule fois, de sorte que nous pouvons utiliser une combinaison de `fromAddress` et `nonce` comme identifiant unique pour le fichier témoin et le répertoire de sortie.

```js
    try {
        await zkBank.write.processTransaction([
            proof, publicFields])
    } catch (err) {
        console.log(`Erreur de vérification : ${err}`)
        throw Error("Impossible de vérifier la transaction sur la chaîne")
    }
    .
    .
    .
}
```

Envoyez la transaction à la chaîne.

#### `smart-contracts/src/ZkBank.sol` {#smart-contracts-src-zkbank-sol}

Ceci est le code sur la chaîne qui reçoit la transaction.

```solidity
// SPDX-License-Identifier: MIT

pragma solidity >=0.8.21;

import {HonkVerifier} from "./Verifier.sol";

contract ZkBank {
    HonkVerifier immutable myVerifier;
    bytes32 currentStateHash;

    constructor(address _verifierAddress, bytes32 _initialStateHash) {
        currentStateHash = _initialStateHash;
        myVerifier = HonkVerifier(_verifierAddress);
    }
```

Le code sur la chaîne doit garder une trace de deux variables : le vérificateur (un contrat séparé créé par `nargo`) et le hachage de l'état actuel.

```solidity
    event TransactionProcessed(
        bytes32 indexed transactionHash,
        bytes32 oldStateHash,
        bytes32 newStateHash
    );
```

Chaque fois que l'état change, nous émettons un événement `TransactionProcessed`.

```solidity
    function processTransaction(
        bytes calldata _proof,
        bytes32[] calldata _publicFields
    ) public {
```

Cette fonction traite les transactions. Elle reçoit la preuve (en tant que `bytes`) et les entrées publiques (en tant que tableau `bytes32`), dans le format requis par le vérificateur (pour minimiser le traitement sur la chaîne et donc les coûts de gaz).

```solidity
        require(_publicInputs[0] == currentStateHash,
            "Mauvais hachage de l'ancien état");
```

La preuve à divulgation nulle de connaissance doit être que la transaction passe de notre hachage actuel à un nouveau.

```solidity
        myVerifier.verify(_proof, _publicFields);
```

Appeler le contrat vérificateur pour vérifier la preuve à divulgation nulle de connaissance. Cette étape annule la transaction si la preuve à divulgation nulle de connaissance est incorrecte.

```solidity
        currentStateHash = _publicFields[1];

        emit TransactionProcessed(
            _publicFields[2]<<128 | _publicFields[3],
            _publicFields[0],
            _publicFields[1]
        );
    }
}
```

Si tout est correct, mettez à jour le hachage d'état avec la nouvelle valeur et émettez un événement `TransactionProcessed`.

## Abus par le composant centralisé {#abuses}

La sécurité de l'information se compose de trois attributs :

- _Confidentialité_, les utilisateurs ne peuvent pas lire les informations qu'ils ne sont pas autorisés à lire.
- _Intégrité_, les informations ne peuvent être modifiées que par des utilisateurs autorisés d'une manière autorisée.
- _Disponibilité_, les utilisateurs autorisés peuvent utiliser le système.

Sur ce système, l'intégrité est assurée par des preuves à divulgation nulle de connaissance. La disponibilité est beaucoup plus difficile à garantir, et la confidentialité est impossible, car la banque doit connaître le solde de chaque compte et toutes les transactions. Il n'y a aucun moyen d'empêcher une entité qui détient des informations de les partager.

Il serait peut-être possible de créer une banque véritablement confidentielle en utilisant des [adresses furtives](https://vitalik.eth.limo/general/2023/01/20/stealth.html), mais cela dépasse le cadre de cet article.

### Fausses informations {#false-info}

Une façon pour le serveur de violer l'intégrité est de fournir de fausses informations lorsque [des données sont demandées](https://github.com/qbzzt/250911-zk-bank/blob/03-smart-contracts/server/index.mjs#L278-L291).

Pour résoudre ce problème, nous pouvons écrire un deuxième programme Noir qui reçoit les comptes en tant qu'entrée privée et l'adresse pour laquelle des informations sont demandées en tant qu'entrée publique. La sortie est le solde et le nonce de cette adresse, et le hachage des comptes.

Bien sûr, cette preuve ne peut pas être vérifiée sur la chaîne, car nous ne voulons pas publier de nonces et de soldes sur la chaîne. Cependant, elle peut être vérifiée par le code client s'exécutant dans le navigateur.

### Transactions forcées {#forced-txns}

Le mécanisme habituel pour garantir la disponibilité et empêcher la censure sur les L2 est les [transactions forcées](https://docs.optimism.io/stack/transactions/forced-transaction). Mais les transactions forcées ne se combinent pas avec les preuves à divulgation nulle de connaissance. Le serveur est la seule entité capable de vérifier les transactions.

Nous pouvons modifier `smart-contracts/src/ZkBank.sol` pour accepter les transactions forcées et empêcher le serveur de changer l'état jusqu'à ce qu'elles soient traitées. Cependant, cela nous expose à une simple attaque par déni de service. Que se passe-t-il si une transaction forcée est invalide et donc impossible à traiter ?

La solution consiste à avoir une preuve à divulgation nulle de connaissance qu'une transaction forcée est invalide. Cela donne au serveur trois options :

- Traiter la transaction forcée, en fournissant une preuve à divulgation nulle de connaissance qu'elle a été traitée et le nouveau hachage d'état.
- Rejeter la transaction forcée et fournir au contrat une preuve à divulgation nulle de connaissance que la transaction est invalide (adresse inconnue, mauvais nonce ou solde insuffisant).
- Ignorer la transaction forcée. Il n'y a aucun moyen de forcer le serveur à traiter réellement la transaction, mais cela signifie que l'ensemble du système est indisponible.

#### Cautionnement de disponibilité {#avail-bonds}

Dans une implémentation réelle, il y aurait probablement une sorte de motivation de profit pour maintenir le serveur en fonctionnement. Nous pouvons renforcer cette incitation en faisant en sorte que le serveur dépose une caution de disponibilité que n'importe qui peut brûler si une transaction forcée n'est pas traitée dans un certain délai.

### Mauvais code Noir {#bad-noir-code}

Normalement, pour que les gens fassent confiance à un contrat intelligent, nous téléchargeons le code source sur un [explorateur de blocs](https://eth.blockscout.com/address/0x7D16d2c4e96BCFC8f815E15b771aC847EcbDB48b?tab=contract). Cependant, dans le cas des preuves à divulgation nulle de connaissance, cela est insuffisant.

`Verifier.sol` contient la clé de vérification, qui est une fonction du programme Noir. Cependant, cette clé ne nous dit pas ce qu'était le programme Noir. Pour avoir une solution réellement fiable, vous devez télécharger le programme Noir (et la version qui l'a créé). Sinon, les preuves à divulgation nulle de connaissance pourraient refléter un programme différent, un programme avec une porte dérobée.

Jusqu'à ce que les explorateurs de blocs nous permettent de télécharger et de vérifier les programmes Noir, vous devriez le faire vous-même (de préférence sur [IPFS](/developers/tutorials/ipfs-decentralized-ui/)). Alors, les utilisateurs avertis pourront télécharger le code source, le compiler eux-mêmes, créer `Verifier.sol`, et vérifier qu'il est identique à celui sur la chaîne.

## Conclusion {#conclusion}

Les applications de type Plasma nécessitent un composant centralisé pour le stockage des informations. Cela ouvre des vulnérabilités potentielles mais, en retour, nous permet de préserver la confidentialité de manières non disponibles sur la blockchain elle-même. Avec les preuves à divulgation nulle de connaissance, nous pouvons garantir l'intégrité et éventuellement rendre économiquement avantageux pour quiconque exécute le composant centralisé de maintenir la disponibilité.

[Voir ici pour plus de mon travail](https://cryptodocguy.pro/).

## Remerciements {#acknowledgements}

- Josh Crites a lu une ébauche de cet article et m'a aidé avec un problème épineux de Noir.

Toute erreur restante est de ma responsabilité.
