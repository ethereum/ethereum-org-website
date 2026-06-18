---
title: "Utiliser les adresses furtives"
description: "Les adresses furtives permettent aux utilisateurs de transférer des actifs de manière anonyme. Après avoir lu cet article, vous serez en mesure de : d'expliquer ce que sont les adresses furtives et comment elles fonctionnent, de comprendre comment utiliser les adresses furtives de manière à préserver l'anonymat, et d'écrire une application web qui utilise des adresses furtives."
author: Ori Pomerantz
tags: ["Adresse furtive", "confidentialité", "cryptographie", "rust", "wasm"]
skill: intermediate
breadcrumb: Adresses furtives
published: 2025-11-30
lang: fr
sidebarDepth: 3
---

Vous êtes Bill. Pour des raisons sur lesquelles nous ne nous étendrons pas, vous souhaitez faire un don à la campagne « Alice Reine du Monde » et faire en sorte qu'Alice sache que vous avez fait un don afin qu'elle vous récompense si elle gagne. Malheureusement, sa victoire n'est pas garantie. Il y a une campagne concurrente, « Carol Impératrice du Système Solaire ». Si Carol gagne et qu'elle découvre que vous avez fait un don à Alice, vous aurez des ennuis. Vous ne pouvez donc pas simplement transférer 200 ETH de votre compte vers celui d'Alice.

L'[ERC-5564](https://eips.ethereum.org/EIPS/eip-5564) a la solution. Cet ERC explique comment utiliser les [adresses furtives](https://nerolation.github.io/stealth-utils) pour un transfert anonyme.

**Avertissement** : La cryptographie derrière les adresses furtives est, pour autant que nous le sachions, solide. Cependant, il existe des attaques potentielles par canal auxiliaire. [Ci-dessous](#go-wrong), vous verrez ce que vous pouvez faire pour réduire ce risque.

## Comment fonctionnent les adresses furtives {#how}

Cet article tentera d'expliquer les adresses furtives de deux manières. La première est [comment les utiliser](#how-use). Cette partie est suffisante pour comprendre le reste de l'article. Ensuite, il y a [une explication des mathématiques qui les sous-tendent](#how-math). Si vous vous intéressez à la cryptographie, lisez également cette partie. 

### La version simple (comment utiliser les adresses furtives) {#how-use}

Alice crée deux clés privées et publie les clés publiques correspondantes (qui peuvent être combinées en une seule méta-adresse de double longueur). Bill crée également une clé privée et publie la clé publique correspondante.

En utilisant la clé publique d'une partie et la clé privée de l'autre, vous pouvez dériver un secret partagé connu uniquement d'Alice et de Bill (il ne peut pas être dérivé des seules clés publiques). En utilisant ce secret partagé, Bill obtient l'adresse furtive et peut y envoyer des actifs.

Alice obtient également l'adresse à partir du secret partagé, mais comme elle connaît les clés privées associées aux clés publiques qu'elle a publiées, elle peut également obtenir la clé privée qui lui permet de retirer des fonds de cette adresse.

### Les mathématiques (pourquoi les adresses furtives fonctionnent ainsi) {#how-math}

Les adresses furtives standards utilisent la [cryptographie sur les courbes elliptiques (ECC)](https://blog.cloudflare.com/a-relatively-easy-to-understand-primer-on-elliptic-curve-cryptography/#elliptic-curves-building-blocks-of-a-better-trapdoor) pour obtenir de meilleures performances avec moins de bits de clé, tout en conservant le même niveau de sécurité. Mais pour l'essentiel, nous pouvons ignorer cela et faire comme si nous utilisions l'arithmétique classique.

Il y a un nombre que tout le monde connaît, *G*. Vous pouvez multiplier par *G*. Mais en raison de la nature de l'ECC, il est pratiquement impossible de diviser par *G*. La façon dont la cryptographie à clé publique fonctionne généralement dans Ethereum est que vous pouvez utiliser une clé privée, *P<sub>priv</sub>*, pour signer des transactions qui sont ensuite vérifiées par une clé publique, *P<sub>pub</sub> = GP<sub>priv</sub>*. 

Alice crée deux clés privées, *K<sub>priv</sub>* et *V<sub>priv</sub>*. *K<sub>priv</sub>* sera utilisée pour dépenser l'argent de l'adresse furtive, et *V<sub>priv</sub>* pour voir les adresses qui appartiennent à Alice. Alice publie ensuite les clés publiques : *K<sub>pub</sub> = GK<sub>priv</sub>* et *V<sub>pub</sub> = GV<sub>priv</sub>*

Bill crée une troisième clé privée, *R<sub>priv</sub>*, et publie *R<sub>pub</sub> = GR<sub>priv</sub>* dans un registre central (Bill aurait également pu l'envoyer à Alice, mais nous supposons que Carol écoute).

Bill calcule *R<sub>priv</sub>V<sub>pub</sub> = GR<sub>priv</sub>V<sub>priv</sub>*, qu'il s'attend à ce qu'Alice connaisse également (expliqué ci-dessous). Cette valeur est appelée *S*, le secret partagé. Cela donne à Bill une clé publique, *P<sub>pub</sub> = K<sub>pub</sub>+G\*hash(S)*. À partir de cette clé publique, il peut calculer une adresse et y envoyer les ressources qu'il souhaite. À l'avenir, si Alice gagne, Bill pourra lui communiquer *R<sub>priv</sub>* pour prouver que les ressources proviennent de lui.

Alice calcule *R<sub>pub</sub>V<sub>priv</sub> = GR<sub>priv</sub>V<sub>priv</sub>*. Cela lui donne le même secret partagé, *S*. Parce qu'elle connaît la clé privée, *K<sub>priv</sub>*, elle peut calculer *P<sub>priv</sub> = K<sub>priv</sub>+hash(S)*. Cette clé lui permet d'accéder aux actifs de l'adresse qui résulte de *P<sub>pub</sub> = GP<sub>priv</sub> = GK<sub>priv</sub>+G\*hash(S) = K<sub>pub</sub>+G\*hash(S)*.

Nous avons une clé de visualisation séparée pour permettre à Alice de sous-traiter aux Services de Campagne de Domination Mondiale de Dave. Alice est prête à laisser Dave connaître les adresses publiques et à l'informer lorsque plus d'argent est disponible, mais elle ne veut pas qu'il dépense l'argent de sa campagne.

Parce que la visualisation et la dépense utilisent des clés séparées, Alice peut donner à Dave *V<sub>priv</sub>*. Ensuite, Dave peut calculer *S = R<sub>pub</sub>V<sub>priv</sub> = GR<sub>priv</sub>V<sub>priv</sub>* et ainsi obtenir les clés publiques (*P<sub>pub</sub> = K<sub>pub</sub>+G\*hash(S)*). Mais sans *K<sub>priv</sub>*, Dave ne peut pas obtenir la clé privée.

Pour résumer, voici les valeurs connues par les différents participants.

| Alice | Publié | Bill | Dave |
| - | - | - | - |
| G | G | G | G |
| *K<sub>priv</sub>* | - | - | - | 
| *V<sub>priv</sub>* | - | - | *V<sub>priv</sub>* |
| *K<sub>pub</sub> = GK<sub>priv</sub>* | *K<sub>pub</sub>* | *K<sub>pub</sub>* | *K<sub>pub</sub>* |
| *V<sub>pub</sub> = GV<sub>priv</sub>* | *V<sub>pub</sub>* | *V<sub>pub</sub>* | *V<sub>pub</sub>* |
| - | - | *R<sub>priv</sub>* | - |
| *R<sub>pub</sub>* | *R<sub>pub</sub>* | *R<sub>pub</sub> = GR<sub>priv</sub>* | *R<sub>pub</sub>* |
| *S = R<sub>pub</sub>V<sub>priv</sub> = GR<sub>priv</sub>V<sub>priv</sub>* | - | *S = R<sub>priv</sub>V<sub>pub</sub> = GR<sub>priv</sub>V<sub>priv</sub>* | *S = *R<sub>pub</sub>V<sub>priv</sub>* = GR<sub>priv</sub>V<sub>priv</sub>* |
| *P<sub>pub</sub> = K<sub>pub</sub>+G\*hash(S)* | - | *P<sub>pub</sub> = K<sub>pub</sub>+G\*hash(S)* | *P<sub>pub</sub> = K<sub>pub</sub>+G\*hash(S)* |
| *Adresse=f(P<sub>pub</sub>)* | - | *Adresse=f(P<sub>pub</sub>)* | *Adresse=f(P<sub>pub</sub>)* | *Adresse=f(P<sub>pub</sub>)*
| *P<sub>priv</sub> = K<sub>priv</sub>+hash(S)* | - | - | - |

## Quand les adresses furtives tournent mal {#go-wrong}

*Il n'y a pas de secrets sur la chaîne de blocs*. Bien que les adresses furtives puissent vous offrir de la confidentialité, cette confidentialité est sensible à l'analyse du trafic. Pour prendre un exemple trivial, imaginez que Bill approvisionne une adresse et envoie immédiatement une transaction pour publier une valeur *R<sub>pub</sub>*. Sans la *V<sub>priv</sub>* d'Alice, nous ne pouvons pas être sûrs qu'il s'agit d'une adresse furtive, mais c'est le pari le plus probable. Ensuite, nous voyons une autre transaction qui transfère tous les ETH de cette adresse vers l'adresse du fonds de campagne d'Alice. Nous ne pourrons peut-être pas le prouver, mais il est probable que Bill vienne de faire un don à la campagne d'Alice. Carol le penserait certainement.

Il est facile pour Bill de séparer la publication de *R<sub>pub</sub>* de l'approvisionnement de l'adresse furtive (les faire à des moments différents, à partir d'adresses différentes). Cependant, cela est insuffisant. Le schéma que Carol recherche est que Bill approvisionne une adresse, puis que le fonds de campagne d'Alice y effectue un retrait. 

Une solution consiste pour la campagne d'Alice à ne pas retirer l'argent directement, mais à l'utiliser pour payer un tiers. Si la campagne d'Alice envoie 10 ETH aux Services de Campagne de Domination Mondiale de Dave, Carol sait seulement que Bill a fait un don à l'un des clients de Dave. Si Dave a suffisamment de clients, Carol ne serait pas en mesure de savoir si Bill a fait un don à Alice qui est en concurrence avec elle, ou à Adam, Albert ou Abigail dont Carol ne se soucie pas. Alice peut inclure une valeur hachée (hash) avec le paiement, puis fournir à Dave la pré-image, pour prouver qu'il s'agissait de son don. Alternativement, comme noté ci-dessus, si Alice donne à Dave sa *V<sub>priv</sub>*, il sait déjà de qui provient le paiement.

Le principal problème de cette solution est qu'elle exige qu'Alice se soucie du secret alors que ce secret profite à Bill. Alice peut vouloir maintenir sa réputation afin que Bob, l'ami de Bill, lui fasse également un don. Mais il est également possible que cela ne la dérange pas d'exposer Bill, car il aura alors peur de ce qui se passera si Carol gagne. Bill pourrait finir par apporter encore plus de soutien à Alice.

### Utiliser plusieurs couches furtives {#multi-layer}

Au lieu de compter sur Alice pour préserver la confidentialité de Bill, Bill peut le faire lui-même. Il peut générer plusieurs méta-adresses pour des personnes fictives, Bob et Bella. Bill envoie ensuite des ETH à Bob, et « Bob » (qui est en fait Bill) les envoie à Bella. « Bella » (également Bill) les envoie à Alice.

Carol peut toujours faire une analyse du trafic et voir le pipeline Bill-à-Bob-à-Bella-à-Alice. Cependant, si « Bob » et « Bella » utilisent également des ETH à d'autres fins, il n'apparaîtra pas que Bill a transféré quoi que ce soit à Alice, même si Alice retire immédiatement de l'adresse furtive vers son adresse de campagne connue.

## Écrire une application d'adresse furtive {#write-app}

Cet article explique une application d'adresse furtive [disponible sur GitHub](https://github.com/qbzzt/251022-stealth-addresses.git). 

### Outils {#tools}

Il existe [une bibliothèque d'adresses furtives en TypeScript](https://github.com/ScopeLift/stealth-address-sdk) que nous pourrions utiliser. Cependant, les opérations cryptographiques peuvent être gourmandes en ressources processeur. Je préfère les implémenter dans un langage compilé, tel que [Rust](https://rust-lang.org/), et utiliser [WASM](https://webassembly.org/) pour exécuter le code dans le navigateur.

Nous allons utiliser [Vite](https://vite.dev/) et [React](https://react.dev/). Ce sont des outils standards de l'industrie ; si vous ne les connaissez pas, vous pouvez utiliser [ce tutoriel](/developers/tutorials/creating-a-wagmi-ui-for-your-contract/). Pour utiliser Vite, nous avons besoin de Node.

### Voir les adresses furtives en action {#in-action}

1. Installez les outils nécessaires : [Rust](https://rust-lang.org/tools/install/) et [Node](https://nodejs.org/en/download).

2. Clonez le dépôt GitHub.

   ```sh
   git clone https://github.com/qbzzt/251022-stealth-addresses.git
   cd 251022-stealth-addresses
   ```

3. Installez les prérequis et compilez le code Rust.

   ```sh
   cd src/rust-wasm
   rustup target add wasm32-unknown-unknown   
   cargo install wasm-pack   
   wasm-pack build --target web
   ```

4. Démarrez le serveur web.

   ```sh
   cd ../..
   npm install
   npm run dev
   ```

5. Naviguez vers [l'application](http://localhost:5173/). Cette page d'application comporte deux cadres : l'un pour l'interface utilisateur d'Alice et l'autre pour celle de Bill. Les deux cadres ne communiquent pas ; ils sont uniquement sur la même page pour des raisons de commodité.

6. En tant qu'Alice, cliquez sur **Generate a Stealth Meta-Address** (Générer une méta-adresse furtive). Cela affichera la nouvelle adresse furtive et les clés privées correspondantes. Copiez la méta-adresse furtive dans le presse-papiers.

7. En tant que Bill, collez la nouvelle méta-adresse furtive et cliquez sur **Generate an address** (Générer une adresse). Cela vous donne l'adresse à approvisionner pour Alice. 

8. Copiez l'adresse et la clé publique de Bill et collez-les dans la zone « Private key for address generated by Bill » (Clé privée pour l'adresse générée par Bill) de l'interface utilisateur d'Alice. Une fois ces champs remplis, vous verrez la clé privée pour accéder aux actifs à cette adresse.

9. Vous pouvez utiliser [un calculateur en ligne](https://iancoleman.net/ethereum-private-key-to-address/) pour vous assurer que la clé privée correspond à l'adresse.

### Comment fonctionne le programme {#how-the-program-works}

#### Le composant WASM {#wasm}

Le code source qui se compile en WASM est écrit en [Rust](https://rust-lang.org/). Vous pouvez le voir dans [`src/rust_wasm/src/lib.rs`](https://github.com/qbzzt/251022-stealth-addresses/blob/main/src/rust-wasm/src/lib.rs). Ce code est principalement une interface entre le code JavaScript et [la bibliothèque `eth-stealth-addresses`](https://github.com/kassandraoftroy/eth-stealth-addresses).

**`Cargo.toml`**

[`Cargo.toml`](https://doc.rust-lang.org/cargo/reference/manifest.html) en Rust est analogue à [`package.json`](https://docs.npmjs.com/cli/v9/configuring-npm/package-json) en JavaScript. Il contient des informations sur le paquet, des déclarations de dépendances, etc.

```toml
[package]
name = "rust-wasm"
version = "0.1.0"
edition = "2024"

[dependencies]
eth-stealth-addresses = "0.1.0"
hex = "0.4.3"
wasm-bindgen = "0.2.104"
getrandom = { version = "0.2", features = ["js"] }
```

Le paquet [`getrandom`](https://docs.rs/getrandom/latest/getrandom/) a besoin de générer des valeurs aléatoires. Cela ne peut pas être fait par des moyens purement algorithmiques ; cela nécessite l'accès à un processus physique comme source d'entropie. Cette définition spécifie que nous obtiendrons cette entropie en la demandant au navigateur dans lequel nous nous exécutons.

```toml
console_error_panic_hook = "0.1.7"
```

[Cette bibliothèque](https://docs.rs/console_error_panic_hook/latest/console_error_panic_hook/) nous donne des messages d'erreur plus significatifs lorsque le code WASM panique et ne peut pas continuer.

```toml
[lib]
crate-type = ["cdylib", "rlib"]
```

Le type de sortie requis pour produire du code WASM.

**`lib.rs`**

Il s'agit du code Rust proprement dit.

```rust
use wasm_bindgen::prelude::*;
```

Les définitions pour créer un paquet WASM à partir de Rust. Elles sont documentées [ici](https://wasm-bindgen.github.io/wasm-bindgen/reference/attributes/index.html).

```rust 
use eth_stealth_addresses::{
    generate_stealth_meta_address,
    generate_stealth_address,
    compute_stealth_key
};
```

Les fonctions dont nous avons besoin de [la bibliothèque `eth-stealth-addresses`](https://github.com/kassandraoftroy/eth-stealth-addresses).

```rust
use hex::{decode,encode};
```

Rust utilise généralement des [tableaux](https://doc.rust-lang.org/std/primitive.array.html) d'octets (`[u8; <size>]`) pour les valeurs. Mais en JavaScript, nous utilisons généralement des chaînes hexadécimales. [La bibliothèque `hex`](https://docs.rs/hex/latest/hex/) traduit pour nous d'une représentation à l'autre.

```rust
#[wasm_bindgen]
```

Générer des liaisons WASM pour pouvoir appeler cette fonction depuis JavaScript.

```rust
pub fn wasm_generate_stealth_meta_address() -> String {
```

La façon la plus simple de renvoyer un objet avec plusieurs champs est de renvoyer une chaîne JSON. 

```rust
    let (address, spend_private_key, view_private_key) = 
        generate_stealth_meta_address();
```

La fonction [`generate_stealth_meta_address`](https://docs.rs/eth-stealth-addresses/latest/eth_stealth_addresses/fn.generate_stealth_meta_address.html) renvoie trois champs :

- La méta-adresse (*K<sub>pub</sub>* et *V<sub>pub</sub>*)
- La clé privée de visualisation (*V<sub>priv</sub>*)
- La clé privée de dépense (*K<sub>priv</sub>*)

La syntaxe de [tuple](https://doc.rust-lang.org/std/primitive.tuple.html) nous permet de séparer à nouveau ces valeurs.

```rust
    format!("{{\"address\":\"{}\",\"view_private_key\":\"{}\",\"spend_private_key\":\"{}\"}}",
        encode(address),
        encode(view_private_key),
        encode(spend_private_key)
    )
}
```

Utilisez la macro [`format!`](https://doc.rust-lang.org/std/fmt/index.html) pour générer la chaîne encodée en JSON. Utilisez [`hex::encode`](https://docs.rs/hex/latest/hex/fn.encode.html) pour transformer les tableaux en chaînes hexadécimales.

```rust
fn str_to_array<const N: usize>(s: &str) -> Option<[u8; N]> {
```

Cette fonction transforme une chaîne hexadécimale (fournie par JavaScript) en un tableau d'octets. Nous l'utilisons pour analyser les valeurs fournies par le code JavaScript. Cette fonction est compliquée en raison de la façon dont Rust gère les tableaux et les vecteurs.

L'expression `<const N: usize>` est appelée un [générique](https://doc.rust-lang.org/book/ch10-01-syntax.html). `N` est un paramètre qui contrôle la longueur du tableau renvoyé. La fonction est en fait appelée `str_to_array::<n>`, où `n` est la longueur du tableau.

La valeur de retour est `Option<[u8; N]>`, ce qui signifie que le tableau renvoyé est [optionnel](https://doc.rust-lang.org/std/option/). C'est un modèle typique en Rust pour les fonctions qui peuvent échouer.

Par exemple, si nous appelons `str_to_array::10("bad060a7")`, la fonction est censée renvoyer un tableau de dix valeurs, mais l'entrée n'est que de quatre octets. La fonction doit échouer, et elle le fait en renvoyant `None`. La valeur de retour pour `str_to_array::4("bad060a7")` serait `Some<[0xba, 0xd0, 0x60, 0xa7]>`.

```rust
    // decode retourne Result<Vec<u8>, _>
    let vec = decode(s).ok()?;
```

La fonction [`hex::decode`](https://docs.rs/hex/latest/hex/fn.decode.html) renvoie un `Result<Vec<u8>, FromHexError>`. Le type [`Result`](https://doc.rust-lang.org/std/result/) peut contenir soit un résultat réussi (`Ok(value)`), soit une erreur (`Err(error)`).

La méthode `.ok()` transforme le `Result` en un `Option`, dont la valeur est soit la valeur `Ok()` en cas de succès, soit `None` dans le cas contraire. Enfin, l'[opérateur point d'interrogation](https://doc.rust-lang.org/std/option/#the-question-mark-operator-) interrompt la fonction en cours et renvoie un `None` si le `Option` est vide. Sinon, il déballe la valeur et la renvoie (dans ce cas, pour attribuer une valeur à `vec`).

Cela ressemble à une méthode étrangement alambiquée pour gérer les erreurs, mais `Result` et `Option` garantissent que toutes les erreurs sont gérées, d'une manière ou d'une autre.

```rust
    if vec.len() != N { return None; }
```

Si le nombre d'octets est incorrect, c'est un échec, et nous renvoyons `None`.

```rust
    // try_into consomme vec et tente de créer [u8; N]
    let array: [u8; N] = vec.try_into().ok()?;
```

Rust possède deux types de tableaux. Les [tableaux](https://doc.rust-lang.org/std/primitive.array.html) (arrays) ont une taille fixe. Les [vecteurs](https://doc.rust-lang.org/std/vec/index.html) (vectors) peuvent s'agrandir et rétrécir. `hex::decode` renvoie un vecteur, mais la bibliothèque `eth_stealth_addresses` veut recevoir des tableaux. [`.try_into()`](https://doc.rust-lang.org/std/convert/trait.TryInto.html#required-methods) convertit une valeur en un autre type, par exemple, un vecteur en un tableau.

```rust
    Some(array)
}
```

Rust ne vous oblige pas à utiliser le mot-clé [`return`](https://doc.rust-lang.org/std/keyword.return.html) lors du renvoi d'une valeur à la fin d'une fonction.

```rust
#[wasm_bindgen]
pub fn wasm_generate_stealth_address(stealth_address: &str) -> Option<String> {
```

Cette fonction reçoit une méta-adresse publique, qui inclut à la fois *V<sub>pub</sub>* et *K<sub>pub</sub>*. Elle renvoie l'adresse furtive, la clé publique à publier (*R<sub>pub</sub>*), et une valeur d'analyse d'un octet qui accélère l'identification des adresses publiées pouvant appartenir à Alice.

La valeur d'analyse fait partie du secret partagé (*S = GR<sub>priv</sub>V<sub>priv</sub>*). Cette valeur est disponible pour Alice, et sa vérification est beaucoup plus rapide que de vérifier si *f(K<sub>pub</sub>+G\*hash(S))* est égal à l'adresse publiée.

```rust
    let (address, r_pub, scan) = 
        generate_stealth_address(&str_to_array::<66>(stealth_address)?);
```

Nous utilisons la fonction [`generate_stealth_address`](https://docs.rs/eth-stealth-addresses/latest/eth_stealth_addresses/fn.generate_stealth_address.html) de la bibliothèque.

```rust
    format!("{{\"address\":\"{}\",\"rPub\":\"{}\",\"scan\":\"{}\"}}",
        encode(address),
        encode(r_pub),
        encode(&[scan])
    ).into()
}
```

Préparez la chaîne de sortie encodée en JSON.

```rust
#[wasm_bindgen]
pub fn wasm_compute_stealth_key(
    address: &str, 
    bill_pub_key: &str, 
    view_private_key: &str,
    spend_private_key: &str    
) -> Option<String> {
    .
    .
    .
}
```

Cette fonction utilise la fonction [`compute_stealth_key`](https://docs.rs/eth-stealth-addresses/latest/eth_stealth_addresses/fn.compute_stealth_key.html) de la bibliothèque pour calculer la clé privée permettant de retirer de l'adresse (*R<sub>priv</sub>*). Ce calcul nécessite ces valeurs :

- L'adresse (*Adresse=f(P<sub>pub</sub>)*)
- La clé publique générée par Bill (*R<sub>pub</sub>*)
- La clé privée de visualisation (*V<sub>priv</sub>*)
- La clé privée de dépense (*K<sub>priv</sub>*)

```rust
#[wasm_bindgen(start)]
```

[`#[wasm_bindgen(start)]`](https://wasm-bindgen.github.io/wasm-bindgen/reference/attributes/on-rust-exports/start.html) spécifie que la fonction est exécutée lorsque le code WASM est initialisé.

```rust
pub fn main() {
    console_error_panic_hook::set_once();
}
```

Ce code spécifie que la sortie de panique doit être envoyée à la console JavaScript. Pour le voir en action, utilisez l'application et donnez à Bill une méta-adresse invalide (changez simplement un chiffre hexadécimal). Vous verrez cette erreur dans la console JavaScript :

```
rust_wasm.js:236 panicked at /home/ori/.cargo/registry/src/index.crates.io-1949cf8c6b5b557f/subtle-2.6.1/src/lib.rs:701:9:
assertion `left == right` failed
  left: 0
 right: 1
```

Suivi d'une trace de la pile (stack trace). Ensuite, donnez à Bill la méta-adresse valide, et donnez à Alice soit une adresse invalide, soit une clé publique invalide. Vous verrez cette erreur :

```
rust_wasm.js:236 panicked at /home/ori/.cargo/registry/src/index.crates.io-1949cf8c6b5b557f/eth-stealth-addresses-0.1.0/src/lib.rs:78:9:
keys do not generate stealth address
```

Encore une fois, suivi d'une trace de la pile.

#### L'interface utilisateur {#ui}

L'interface utilisateur est écrite en utilisant [React](https://react.dev/) et servie par [Vite](https://vite.dev/). Vous pouvez en apprendre davantage à leur sujet en utilisant [ce tutoriel](/developers/tutorials/creating-a-wagmi-ui-for-your-contract/). Il n'y a pas besoin de [Wagmi](https://wagmi.sh/) ici car nous n'interagissons pas directement avec une chaîne de blocs ou un portefeuille.

La seule partie non évidente de l'interface utilisateur est la connectivité WASM. Voici comment cela fonctionne.

**`vite.config.js`**

Ce fichier contient [la configuration de Vite](https://vite.dev/config/).

```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import wasm from "vite-plugin-wasm";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), wasm()],
})
```

Nous avons besoin de deux plugins Vite : [react](https://www.npmjs.com/package/@vitejs/plugin-react) et [wasm](https://github.com/Menci/vite-plugin-wasm#readme).

**`App.jsx`**

Ce fichier est le composant principal de l'application. C'est un conteneur qui inclut deux composants : `Alice` et `Bill`, les interfaces utilisateur pour ces utilisateurs. La partie pertinente pour WASM est le code d'initialisation.

```jsx
import init from './rust-wasm/pkg/rust_wasm.js'
```

Lorsque nous utilisons [`wasm-pack`](https://rustwasm.github.io/docs/wasm-pack/), cela crée deux fichiers que nous utilisons ici : un fichier wasm avec le code réel (ici, `src/rust-wasm/pkg/rust_wasm_bg.wasm`) et un fichier JavaScript avec les définitions pour l'utiliser (ici, `src/rust_wasm/pkg/rust_wasm.js`). L'exportation par défaut de ce fichier JavaScript est le code qui doit s'exécuter pour initier WASM.

```jsx
function App() {
    .
    .
    .
  useEffect(() => {
    const loadWasm = async () => {
      try {
        await init();
        setWasmReady(true)
      } catch (err) {
        console.error('Error loading wasm:', err)
        alert("Wasm error: " + err)
      }
    }

    loadWasm()
    }, []
  )
```

Le [hook `useEffect`](https://react.dev/reference/react/useEffect) vous permet de spécifier une fonction qui s'exécute lorsque les variables d'état changent. Ici, la liste des variables d'état est vide (`[]`), donc cette fonction n'est exécutée qu'une seule fois lors du chargement de la page.

La fonction d'effet doit se terminer immédiatement. Pour utiliser du code asynchrone, tel que le `init` de WASM (qui doit charger le fichier `.wasm` et prend donc du temps), nous définissons une fonction interne [`async`](https://en.wikipedia.org/wiki/Async/await) et l'exécutons sans `await`.

**`Bill.jsx`**

Il s'agit de l'interface utilisateur pour Bill. Elle comporte une seule action, la création d'une adresse basée sur la méta-adresse furtive fournie par Alice.

```jsx
import { wasm_generate_stealth_address } from './rust-wasm/pkg/rust_wasm.js'
```

En plus de l'exportation par défaut, le code JavaScript généré par `wasm-pack` exporte une fonction pour chaque fonction du code WASM.

```jsx
            <button onClick={() => {
              setPublicAddress(JSON.parse(wasm_generate_stealth_address(stealthMetaAddress)))
            }}>
```

Pour appeler des fonctions WASM, nous appelons simplement la fonction exportée par le fichier JavaScript créé par `wasm-pack`.

**`Alice.jsx`**

Le code dans `Alice.jsx` est analogue, sauf qu'Alice a deux actions :

- Générer une méta-adresse
- Obtenir la clé privée pour une adresse publiée par Bill

## Conclusion {#conclusion}

Les adresses furtives ne sont pas une panacée ; elles doivent être [utilisées correctement](#go-wrong). Mais lorsqu'elles sont utilisées correctement, elles peuvent permettre la confidentialité sur une chaîne de blocs publique.

[Voir ici pour plus de mes travaux](https://cryptodocguy.pro/).