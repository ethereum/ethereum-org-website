---
title: Machine virtuelle Ethereum (EVM)
description: Introduction à la machine virtuelle Ethereum et en quoi elle concerne l'état, les transactions et les contrats intelligents.
lang: fr
sidebar: true
---

L’instanciation physique de l’EVM ne peut pas être décrite aussi facilement qu'on pointerait du doigt un nuage ou une vague, mais elle _existe_ en tant qu'entité unique gérée par des milliers d'ordinateurs connectés exécutant un client Ethereum.

Le protocole Ethereum existe uniquement dans le but de maintenir le fonctionnement continu, interrompu et immuable de cette machine d'état. C'est dans cet environnement que prennent vie tous les comptes et contrats intelligents Ethereum. À n'importe quel bloc de la chaîne, Ethereum a un seul et unique état dit "canonique" (conforme), et l'EVM est ce qui définit les règles pour le calcul d'un nouvel état valide de bloc en bloc.

## Prérequis {#prerequisites}

Une certaine connaissance des termes informatiques courants, comme [octets](https://en. wikipedia. org/wiki/Byte), [mémoire](https://en. wikipedia. org/wiki/Computer*memory), et [pile](https://en. wikipedia. org/wiki/Stack*(abstract_data_type)) sont nécessaires pour comprendre l'EVM. Il est également utile d'être à l'aise avec les concepts de cryptographie/blockchain comme les [fonctions de hachage](https://en.wikipedia.org/wiki/Cryptographic_hash_function), la [preuve de travail](https://en.wikipedia.org/wiki/Proof_of_work) et l'[arbre de Merkle](https://en.wikipedia.org/wiki/Merkle_tree).

## Du registre à la machine d'état {#from-ledger-to-state-machine}

L'analogie avec un "registre distribué" est souvent utilisée pour décrire les blockchains comme Bitcoin, qui permettent l'existence d'une monnaie décentralisée utilisant des outils de cryptographie fondamentaux. Une cryptomonnaie se comporte comme une "vraie" monnaie en raison des règles qui régissent ce qui est autorisé ou pas pour modifier le registre. Par exemple, une adresse Bitcoin ne peut pas dépenser plus de Bitcoin qu'elle n'en a reçu. Ces règles sont appliquées à toutes les transactions sur Bitcoin et de nombreuses autres blockchains.

Alors qu'Ethereum dispose de sa propre cryptomonnaie native (Ether) qui suit presque exactement les mêmes règles intuitives, il offre également une fonction beaucoup plus puissante : [les contrats intelligents](/en/developers/docs/smart-contracts/). Pour cette fonctionnalité plus complexe, une analogie plus sophistiquée est nécessaire. Au lieu d'un registre distribué, Ethereum est une [machine d'état distribuée](https://en.wikipedia.org/wiki/Finite-state_machine). L'état d'Ethereum est une grande structure de données qui contient non seulement tous les comptes et tous les soldes, mais aussi une _machine à état_ qui peut changer d'un bloc à l'autre selon un ensemble de règles prédéfinies, et qui peut exécuter du code machine arbitraire. Les règles spécifiques de changement d'état d'un bloc à l'autre sont définies par l'EVM.

![Schéma montrant la composition d'un compte](./evm.png) _Schéma adapté à partir du document [EVM Ethereum illustrated](https://takenobu-hs.github.io/downloads/ethereum_evm_illustrated.pdf)_

## Fonction de transition d'état Ethereum {#the-ethereum-state-transition-function}

L'EVM se comporte comme une fonction mathématique : avec des données en entrée, elle produit une sortie déterministe. Il est donc très utile de décrire plus formellement Ethereum comme ayant une **fonction de transition d'état** :

```
Y(S, T) = S'
```

Étant donné un ancien état valide `(S)` et un nouvel ensemble de transactions valides `(T)`, la fonction de transition d'état Ethereum `Y(S, T)` produit un nouvel état de sortie valide `S'`

### État {#state}

Dans le contexte d'Ethereum, l'état est une énorme structure de données appelée [arbre de Merkle Patricia modifié](https://eth.wiki/en/fundamentals/patricia-tree), qui conserve tous les comptes [](/developers/docs/accounts/) liés par des hashs et réduits à un seul hash racine stocké sur la blockchain.

### Transactions {#transactions}

Les transactions sont des instructions signées cryptographiquement provenant des comptes. Il existe deux types de transactions : celles qui donnent lieu à messages d'appel et celles qui débouchent sur la création de contrats.

La création d'un contrat entraîne la création d'un compte de contrat contenant le bytecode du [contract intelligent](/developers/docs/smart-contracts/anatomy/) compilé. Chaque fois qu'un autre compte effectue un appel de message à ce contrat, il exécute son bytecode.

## Instructions de l'EVM {#evm-instructions}

L'EVM s'exécute comme une [machine de pile](https://en.wikipedia.org/wiki/Stack_machine) avec une profondeur de 1024 éléments. Chaque élément est un mot à 256 bits choisi pour être compatibilité avec le schéma de hachage SHA-3-256.

<!-- ![A diagram showing the make up of the stack](./evm-stack.png)
_Diagram adapted from [Ethereum EVM illustrated](https://takenobu-hs.github.io/downloads/ethereum_evm_illustrated.pdf)_

Removed as we should probably show memory and account storage too if showing stack-->

Lors de l'exécution, l'EVM maintient une _mémoire_ transitoire (en tant que tableau d'octets adressé à un mot) qui ne persiste pas entre les transactions.

Cependant, les contrats contiennent un arbre de _stockage_ Merkle Patricia (en tant que tableau de mots adressables à un mot), associé au compte en question et faisant partie de l'état global.

Le bytecode du contract intelligent compilé s'exécute comme un certain nombre [de codes d'opérations](https://www.ethervm.io/) EVM, qui effectuent des opérations de pile standards comme `XOR`, `AND`, `ADD`, `SUB`, etc. L'EVM implémente également un certain nombre d'opérations de pile spécifiques à la blockchain, comme `ADDRESS`, `BALANCE`, `SHA3`, `BLOCKHASH`, etc.

![Diagramme indiquant où le carburant est nécessaire dans les opérations de l'EVM](../gas/gas.png) _Schéma adapté à partir du document [EVM Ethereum illustrated](https://takenobu-hs.github.io/downloads/ethereum_evm_illustrated.pdf)_

<!-- TODO add full list from  https://eth.wiki/concepts/evm/implementations -->

## Implémentations de l'EVM {#evm-implementations}

Toutes les implémentations de l'EVM doivent respecter les spécifications décrites dans le Livre jaune Ethereum.

Au cours des 5 ans d'histoire d'Ethereum, l'EVM a subi plusieurs révisions et il existe plusieurs implémentations dans différents langages de programmation.

Tous les [clients Ethereum](/developers/docs/nodes-and-clients/#clients) incluent une implémentation de l'EVM. Il existe également plusieurs implémentations intelligents, y compris :

- [Py-EVM](https://github.com/ethereum/py-evm) - _Python_
- [evmone](https://github.com/ethereum/evmone) - _C++_
- [ethereumjs-vm](https://github.com/ethereumjs/ethereumjs-vm) - _JavaScript_
- [eEVM](https://github.com/microsoft/eevm) - _C++_
- [Hyperledger Burrow](https://github.com/hyperledger/burrow) - _Go_

## Complément d'information {#further-reading}

- [Livre jaune Ethereum](https://ethereum.github.io/yellowpaper/paper.pdf)
- [Livre beige Ethereum](https://github.com/chronaeon/beigepaper)
- [Codes d'opérations de l'EVM](https://www.ethervm.io/)

## Sujets connexes {#related-topics}

- [Carburant](/en/developers/docs/gas/)
