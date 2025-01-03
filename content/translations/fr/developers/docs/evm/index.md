---
title: Machine virtuelle Ethereum (EVM)
description: Introduction à la machine virtuelle Ethereum et en quoi elle concerne l'état, les transactions et les contrats intelligents.
lang: fr
---

La machine virtuelle Ethereum (EVM) est un environnement virtuel décentralisé qui exécute le code de manière cohérente et sécurisée sur tous les nœuds Ethereum. Les nœuds exécutent l'EVM qui exécute des contrats intelligents, utilisant du «[gaz](/gas/)» pour mesurer l'effort de calcul requis pour les [opérations](/developers/docs/evm/opcodes/), garantissant une allocation efficace des ressources et la sécurité du réseau.

## Prérequis {#prerequisites}

Une certaine familiarité avec la terminologie commune en informatique, comme [les octets](https://wikipedia.org/wiki/Byte), [la mémoire](https://wikipedia.org/wiki/Computer_memory), et une [pile](https://wikipedia.org/wiki/Stack_(abstract_data_type)) sont nécessaires pour comprendre l'EVM. Il peut se révéler utile d'être à l'aise avec les concepts de cryptographie/blockchain comme les [fonctions de hachage](https://wikipedia.org/wiki/Cryptographic_hash_function), et [l'arbre de Merkle](https://wikipedia.org/wiki/Merkle_tree).

## Du registre à la machine d'état {#from-ledger-to-state-machine}

L'analogie avec un « registre distribué » est souvent utilisée pour décrire les blockchains comme Bitcoin, qui permettent l'existence d'une monnaie décentralisée utilisant des outils de cryptographie fondamentaux. Le registre tient un enregistrement des activités devant se conformer à un ensemble de règles, celles-ci régissant ce que quelqu'un peut, ou ne peut pas faire, pour modifier le registre. Par exemple, une adresse Bitcoin ne peut pas dépenser plus de Bitcoin qu'elle n'en a reçu. Ces règles sont appliquées à toutes les transactions sur Bitcoin et de nombreuses autres blockchains.

Alors qu'Ethereum dispose de sa propre cryptomonnaie native (Ether) qui suit presque exactement les mêmes règles intuitives, il offre également une fonction beaucoup plus puissante : [les contrats intelligents](/developers/docs/smart-contracts/). Pour cette fonctionnalité plus complexe, une analogie plus sophistiquée est nécessaire. Au lieu d'un registre distribué, Ethereum est une [machine d'état distribuée](https://wikipedia.org/wiki/Finite-state_machine). L'état d'Ethereum est une grande structure de données qui contient non seulement tous les comptes et tous les soldes, mais aussi une _machine à état_ qui peut changer d'un bloc à l'autre selon un ensemble de règles prédéfinies, et qui peut exécuter du code machine arbitraire. Les règles spécifiques de changement d'état d'un bloc à l'autre sont définies par l'EVM.

![Schéma montrant la composition d'un compte](./evm.png) _Schéma adapté à partir du document [EVM Ethereum illustrated](https://takenobu-hs.github.io/downloads/ethereum_evm_illustrated.pdf)_

## Fonction de transition d'état Ethereum {#the-ethereum-state-transition-function}

L'EVM se comporte comme une fonction mathématique : avec des données en entrée, elle produit une sortie déterministe. Il est donc très utile de décrire plus formellement Ethereum comme ayant une **fonction de transition d'état** :

```
Y(S, T) = S'
```

Étant donné un ancien état valide `(S)` et un nouvel ensemble de transactions valides `(T)`, la fonction de transition d'état Ethereum `Y(S, T)` produit un nouvel état de sortie valide `S'`

### État {#state}

Dans le contexte d'Ethereum, l'état est une énorme structure de données appelée [arbre de Patricia Merkle modifié](/developers/docs/data-structures-and-encoding/patricia-merkle-trie/), qui conserve tous [les comptes](/developers/docs/accounts/) liés par hachages et réduits à un seul hash racine stocké sur la blockchain.

### Transactions {#transactions}

Les transactions sont des instructions signées cryptographiquement provenant des comptes. Il existe deux types de transactions : celles qui donnent lieu à appels de messages et celles qui débouchent sur la création de contrats.

La création d'un contrat entraîne la création d'un nouveau compte de contrat contenant le bytecode du [contract intelligent](/developers/docs/smart-contracts/anatomy/) compilé. Chaque fois qu'un autre compte effectue un appel de message à ce contrat, il exécute son bytecode.

## Instructions de l'EVM {#evm-instructions}

L'EVM s'exécute comme une [machine de pile](https://wikipedia.org/wiki/Stack_machine) avec une profondeur de 1 024 éléments. Chaque élément est un mot de 256 bits qui a été choisi pour la facilité d'utilisation avec la cryptographie 256 bits (comme les hachages Keccak-256 ou les signatures secp256k1).

Lors de l'exécution, l'EVM maintient une _mémoire_ transitoire (en tant que tableau d'octets adressé à un mot) qui ne persiste pas entre les transactions.

Cependant, les contrats contiennent un arbre de _stockage_ Merkle Patricia (en tant que tableau de mots adressables à un mot), associé au compte en question et faisant partie de l'état global.

Le bytecode du contract intelligent compilé s'exécute comme un certain nombre [de codes d'opérations](/developers/docs/evm/opcodes) EVM, qui effectuent des opérations de pile standards comme `XOR`, `AND`, `ADD`, `SUB`, etc. L'EVM implémente également un certain nombre d'opérations de pile spécifiques à la blockchain, comme `ADDRESS`, `BALANCE`, `BLOCKHASH`, etc.

![Diagramme indiquant où le gaz est nécessaire dans les opérations de l'EVM](../gas/gas.png) _Schéma adapté à partir du document [EVM Ethereum illustrated](https://takenobu-hs.github.io/downloads/ethereum_evm_illustrated.pdf)_

## Implémentations de l'EVM {#evm-implementations}

Toutes les implémentations de l'EVM doivent respecter les spécifications décrites dans les pages jaunes Ethereum.

Au cours des neuf années d'existence d'Ethereum, l'EVM a fait l'objet de plusieurs révisions, et il existe plusieurs implémentations de l'EVM dans divers langages de programmation.

Les [clients d'exécution Ethereum](/developers/docs/nodes-and-clients/#execution-clients) incluent une implémentation de l'EVM. Il existe également plusieurs implémentations autonomes, telles que :

- [Py-EVM](https://github.com/ethereum/py-evm) - _Python_
- [evmone](https://github.com/ethereum/evmone) - _C++_
- [ethereumjs-vm](https://github.com/ethereumjs/ethereumjs-vm) - _JavaScript_
- [revm](https://github.com/bluealloy/revm) - _Rust_

## Complément d'information {#further-reading}

- [Les pages jaunes Ethereum](https://ethereum.github.io/yellowpaper/paper.pdf)
- [Jellopaper aka KEVM : Sémantique de l'EVM en K](https://jellopaper.org/)
- [Livre beige Ethereum](https://github.com/chronaeon/beigepaper)
- [Codes d'opérations de l'EVM](https://www.ethervm.io/)
- [Documents de Référence aux Codes Opératoires de la Machine Virtuelle Ethereum](https://www.evm.codes/)
- [Une courte introduction dans la documentation de Solidity](https://docs.soliditylang.org/en/latest/introduction-to-smart-contracts.html#index-6)
- [Maîtriser Ethereum - La Machine Virtuelle Ethereum](https://github.com/ethereumbook/ethereumbook/blob/develop/13evm.asciidoc)

## Sujets connexes {#related-topics}

- [Gaz](/developers/docs/gas/)
