---
title: "ERC-20 avec des mesures de sécurité"
description: "Comment aider les utilisateurs à éviter les erreurs stupides"
author: Ori Pomerantz
lang: fr
tags: ["erc-20"]
skill: beginner
breadcrumb: "Sécurité ERC-20"
published: 2022-08-15
---

## Introduction {#introduction}

L'un des grands avantages d'Ethereum est qu'il n'y a pas d'autorité centrale qui puisse modifier ou annuler vos transactions. L'un des grands problèmes d'Ethereum est qu'il n'y a pas d'autorité centrale ayant le pouvoir d'annuler les erreurs des utilisateurs ou les transactions illicites. Dans cet article, vous découvrirez certaines des erreurs courantes que les utilisateurs commettent avec les jetons [ERC-20](/developers/docs/standards/tokens/erc-20/), ainsi que la manière de créer des contrats ERC-20 qui aident les utilisateurs à éviter ces erreurs, ou qui donnent un certain pouvoir à une autorité centrale (par exemple pour geler des comptes).

Notez que bien que nous utiliserons le [contrat de jeton ERC-20 d'OpenZeppelin](https://github.com/OpenZeppelin/openzeppelin-contracts/tree/master/contracts/token/ERC20), cet article ne l'explique pas en détail. Vous pouvez trouver ces informations [ici](/developers/tutorials/erc20-annotated-code).

Si vous souhaitez voir le code source complet :

1. Ouvrez l'[IDE Remix](https://remix.ethereum.org/).
2. Cliquez sur l'icône de clonage GitHub (![icône de clonage GitHub](icon-clone.png)).
3. Clonez le dépôt GitHub `https://github.com/qbzzt/20220815-erc20-safety-rails`.
4. Ouvrez **contracts > erc20-safety-rails.sol**.

Notez que le dépôt a été écrit pour OpenZeppelin Contracts 4.7.2, où la fonction que cet article remplace s'appelle `_beforeTokenTransfer`. Cet article utilise la version actuelle d'OpenZeppelin Contracts 5.x, où vous remplacez `_update` à la place, de sorte que le code de cet article diffère légèrement du code du dépôt.

## Créer un contrat ERC-20 {#creating-an-erc-20-contract}

Avant de pouvoir ajouter la fonctionnalité de mesures de sécurité, nous avons besoin d'un contrat ERC-20. Dans cet article, nous utiliserons [l'assistant de contrats OpenZeppelin (Contracts Wizard)](https://docs.openzeppelin.com/contracts/5.x/wizard). Ouvrez-le dans un autre navigateur et suivez ces instructions :

1. Sélectionnez **ERC20**.
2. Saisissez ces paramètres :

   | Paramètre      | Valeur                     |
   | -------------- | ------------------------- |
   | Name           | SafetyRailsToken          |
   | Symbol         | SAFE                      |
   | Premint        | 1000                      |
   | Features       | None (décochez **Permit**) |
   | Access Control | Ownable                   |
   | Upgradability  | None                      |

3. Faites défiler vers le haut et cliquez sur **Open in Remix** (pour Remix) ou sur **Download** pour utiliser un environnement différent. Je vais supposer que vous utilisez Remix, si vous utilisez autre chose, apportez simplement les modifications appropriées.
4. Nous avons maintenant un contrat ERC-20 entièrement fonctionnel. Vous pouvez développer `.deps` > `npm` pour voir le code importé.
5. Compilez, déployez et jouez avec le contrat pour voir qu'il fonctionne comme un contrat ERC-20. Si vous avez besoin d'apprendre à utiliser Remix, [utilisez ce tutoriel](https://remix.ethereum.org/?#activate=udapp,solidity,LearnEth).

## Erreurs courantes {#common-mistakes}

### Les erreurs {#the-mistakes}

Les utilisateurs envoient parfois des jetons à la mauvaise adresse. Bien que nous ne puissions pas lire dans leurs pensées pour savoir ce qu'ils voulaient faire, il existe deux types d'erreurs qui se produisent souvent et qui sont faciles à détecter :

1. Envoyer les jetons à la propre adresse du contrat. Par exemple, [le jeton OP d'Optimism](https://optimism.mirror.xyz/qvd0WfuLKnePm1Gxb9dpGchPf5uDz5NSMEFdgirDS4c) a réussi à accumuler [plus de 120 000](https://optimism.blockscout.com/address/0x4200000000000000000000000000000000000042) jetons OP en moins de deux mois. Cela représente une quantité importante de richesse que les gens ont vraisemblablement tout simplement perdue.

2. Envoyer les jetons à une adresse vide, une adresse qui ne correspond pas à un [compte détenu par un tiers (EOA)](/developers/docs/accounts/#externally-owned-accounts-and-key-pairs) ou à un [contrat intelligent](/developers/docs/smart-contracts). Bien que je n'aie pas de statistiques sur la fréquence à laquelle cela se produit, [un incident aurait pu coûter 20 000 000 de jetons](https://gov.optimism.io/t/message-to-optimism-community-from-wintermute/2595).

### Empêcher les transferts {#preventing-transfers}

Dans le contrat ERC-20 d'OpenZeppelin, chaque modification des soldes, qu'il s'agisse d'un transfert, d'une frappe (mint) ou d'un burn, passe par [une fonction interne, `_update`](https://docs.openzeppelin.com/contracts/5.x/api/token/erc20#ERC20-_update-address-address-uint256-). Nous pouvons la remplacer pour y greffer nos propres fonctionnalités, telles que des vérifications qui annulent s'il y a un problème.

Pour ce faire, ajoutez cette fonction après le constructeur :

```solidity
    function _update(address from, address to, uint256 value)
        internal virtual
        override(ERC20)
    {
        super._update(from, to, value);
    }
```

Certaines parties de cette fonction peuvent être nouvelles si vous n'êtes pas très familier avec Solidity :

```solidity
        internal virtual
```

Le mot-clé `virtual` signifie que tout comme nous avons hérité des fonctionnalités de `ERC20` et remplacé cette fonction, d'autres contrats peuvent hériter de nous et remplacer cette fonction.

```solidity
        override(ERC20)
```

Nous devons spécifier explicitement que nous [remplaçons (overriding)](https://docs.soliditylang.org/en/latest/contracts.html#function-overriding) la définition du jeton ERC20 de `_update`. En général, les définitions explicites sont bien meilleures, du point de vue de la sécurité, que les définitions implicites - vous ne pouvez pas oublier que vous avez fait quelque chose si c'est juste devant vous. C'est aussi la raison pour laquelle nous devons spécifier quelle `_update` de la superclasse nous remplaçons.

```solidity
        super._update(from, to, value);
```

Cette ligne appelle la fonction `_update` du ou des contrats dont nous avons hérité et qui la possèdent. Dans ce cas, il s'agit uniquement de `ERC20`, `Ownable` n'a pas cette fonction. Contrairement à un hook vide, `ERC20._update` est ce qui déplace réellement les jetons, il est donc essentiel de l'appeler. Nos vérifications précèdent cet appel, elles peuvent donc annuler avant toute modification de solde.

### Coder les exigences {#coding-the-requirements}

Nous voulons ajouter ces exigences à la fonction. Étant donné que `_update` est également appelée lorsque des jetons sont brûlés, avec `to` défini sur `address(0)`, nous ne vérifons `to` que lorsqu'elle n'est pas `address(0)` :

- L'adresse `to` ne peut pas être égale à `address(this)`, l'adresse du contrat ERC-20 lui-même.
- L'adresse `to` ne peut pas être vide, elle doit être soit :
  - Un compte détenu en externe (EOA). Nous ne pouvons pas vérifier directement si une adresse est un EOA, mais nous pouvons vérifier le solde en ETH d'une adresse. Les EOA ont presque toujours un solde, même s'ils ne sont plus utilisés - il est difficile de les vider jusqu'au dernier Wei.
  - Un contrat intelligent. Tester si une adresse est un contrat intelligent est un peu plus difficile. Il existe un code d'opération qui vérifie la longueur du code externe, appelé [`EXTCODESIZE`](https://www.evm.codes/#3b). Dans Solidity, vous pouvez l'obtenir avec [`<address>.code.length`](https://docs.soliditylang.org/en/latest/units-and-global-variables.html#members-of-address-types), que le compilateur transforme en `EXTCODESIZE`. Ici, nous utilisons [Yul](https://docs.soliditylang.org/en/latest/yul.html), qui est l'assembleur de l'EVM, pour montrer comment appeler le code d'opération directement. Notez que depuis l'[EIP-7702](https://eips.ethereum.org/EIPS/eip-7702), un EOA peut également avoir du code (une délégation à un contrat), donc cette vérification identifie les comptes avec du code, pas strictement les contrats. Pour notre objectif, qui est de rejeter les adresses vides, cela convient parfaitement.

Voici la fonction complète :

```solidity
    function _update(address from, address to, uint256 value)
        internal virtual
        override(ERC20)
    {
        // Brûler envoie les jetons à l'adresse(0), ne le bloquez pas
        if (to != address(0)) {
            require(to != address(this), "Can't send tokens to the contract address");

            bool isToContract;
            assembly {
               isToContract := gt(extcodesize(to), 0)
            }

            require(to.balance != 0 || isToContract, "Can't send tokens to an empty address");
        }

        super._update(from, to, value);
    }
```

Passons en revue le nouveau code ligne par ligne :

```solidity
        require(to != address(this), "Can't send tokens to the contract address");
```

C'est la première exigence, vérifier que `to` et `this(address)` ne sont pas la même chose.

```solidity
        bool isToContract;
        assembly {
           isToContract := gt(extcodesize(to), 0)
        }
```

C'est ainsi que nous vérifions si une adresse est un contrat. Nous ne pouvons pas recevoir de sortie directement de Yul, donc à la place, nous définissons une variable pour contenir le résultat (`isToContract` dans ce cas). La façon dont Yul fonctionne est que chaque code d'opération est considéré comme une fonction. Donc, d'abord, nous appelons [`EXTCODESIZE`](https://www.evm.codes/#3b) pour obtenir la taille du contrat, puis nous utilisons [`GT`](https://www.evm.codes/#11) pour vérifier qu'elle n'est pas nulle (nous traitons des entiers non signés, donc bien sûr, elle ne peut pas être négative). Nous écrivons ensuite le résultat dans `isToContract`.

```solidity
        require(to.balance != 0 || isToContract, "Can't send tokens to an empty address");
```

Et enfin, nous avons la vérification proprement dite des adresses vides.

## Accès administratif {#admin-access}

Il est parfois utile d'avoir un administrateur qui peut annuler les erreurs. Pour réduire le risque d'abus, cet administrateur peut être un [multisig](https://blog.logrocket.com/security-choices-multi-signature-wallets/) afin que plusieurs personnes doivent s'entendre sur une action. Dans cet article, nous aurons deux fonctionnalités administratives :

1. Geler et dégeler des comptes. Cela peut être utile, par exemple, lorsqu'un compte pourrait être compromis.
2. Nettoyage des actifs.

   Parfois, des fraudeurs envoient des jetons frauduleux au contrat du vrai jeton pour gagner en légitimité. Par exemple, [voir ici](https://optimism.blockscout.com/token/0x2348B1a1228DDCd2dB668c3d30207c3E1852fBbe?tab=holders). Le contrat ERC-20 légitime est [0x4200....0042](https://optimism.blockscout.com/token/0x4200000000000000000000000000000000000042). L'arnaque qui prétend l'être est [0x234....bbe](https://optimism.blockscout.com/token/0x2348B1a1228DDCd2dB668c3d30207c3E1852fBbe).

   Il est également possible que des personnes envoient des jetons ERC-20 légitimes à notre contrat par erreur, ce qui est une autre raison de vouloir avoir un moyen de les récupérer.

OpenZeppelin fournit deux mécanismes pour activer l'accès administratif :

- Les contrats [`Ownable`](https://docs.openzeppelin.com/contracts/5.x/access-control#ownership-and-ownable) ont un seul propriétaire. Les fonctions qui ont le [modificateur](https://docs.soliditylang.org/en/latest/contracts.html#function-modifiers) `onlyOwner` ne peuvent être appelées que par ce propriétaire. Les propriétaires peuvent transférer la propriété à quelqu'un d'autre ou y renoncer complètement. Les droits de tous les autres comptes sont généralement identiques.
- Les contrats [`AccessControl`](https://docs.openzeppelin.com/contracts/5.x/access-control#role-based-access-control) ont un [contrôle d'accès basé sur les rôles (RBAC)](https://en.wikipedia.org/wiki/Role-based_access_control).

Par souci de simplicité, dans cet article nous utilisons `Ownable`.

### Geler et dégeler des contrats {#freezing-and-thawing-contracts}

Geler et dégeler des contrats nécessite plusieurs modifications :

- Un [mapping](https://docs.soliditylang.org/en/latest/types.html#mapping-types) des adresses vers des [booléens](https://en.wikipedia.org/wiki/Boolean_data_type) pour garder une trace des adresses qui sont gelées. Toutes les valeurs sont initialement à zéro, ce qui pour les valeurs booléennes est interprété comme faux. C'est ce que nous voulons car par défaut les comptes ne sont pas gelés.

  ```solidity
      mapping(address => bool) public frozenAccounts;
  ```

- Des [événements](https://docs.soliditylang.org/en/latest/contracts.html#events) pour informer toute personne intéressée lorsqu'un compte est gelé ou dégelé. Techniquement parlant, les événements ne sont pas requis pour ces actions, mais cela aide le code hors chaîne à pouvoir écouter ces événements et savoir ce qui se passe. Il est considéré comme de bonnes manières pour un contrat intelligent de les émettre lorsque quelque chose qui pourrait être pertinent pour quelqu'un d'autre se produit.

  Les événements sont indexés, il sera donc possible de rechercher toutes les fois où un compte a été gelé ou dégelé.

  ```solidity
    // Lorsque les comptes sont gelés ou dégelés
    event AccountFrozen(address indexed _addr);
    event AccountThawed(address indexed _addr);
  ```

- Des fonctions pour geler et dégeler des comptes. Ces deux fonctions sont presque identiques, nous ne passerons donc en revue que la fonction de gel.

  ```solidity
      function freezeAccount(address addr)
        public
        onlyOwner
  ```

  Les fonctions marquées [`public`](https://docs.soliditylang.org/en/latest/contracts.html#function-visibility) peuvent être appelées depuis d'autres contrats intelligents ou directement par une transaction.

  ```solidity
    {
        require(!frozenAccounts[addr], "Account already frozen");
        frozenAccounts[addr] = true;
        emit AccountFrozen(addr);
    }  // gelerCompte
  ```

  Si le compte est déjà gelé, annuler. Sinon, le geler et émettre (`emit`) un événement.

- Modifier `_update` pour empêcher que de l'argent ne soit déplacé depuis un compte gelé. Notez que de l'argent peut toujours être transféré vers le compte gelé. Placez cette ligne au début de la fonction, en dehors du bloc `if`, afin qu'elle empêche également de brûler des jetons depuis un compte gelé.

  ```solidity
       require(!frozenAccounts[from], "The account is frozen");
  ```

### Nettoyage des actifs {#asset-cleanup}

Pour libérer les jetons ERC-20 détenus par ce contrat, nous devons appeler une fonction sur le contrat de jeton auquel ils appartiennent, soit [`transfer`](https://eips.ethereum.org/EIPS/eip-20#transfer) soit [`approve`](https://eips.ethereum.org/EIPS/eip-20#approve). Il ne sert à rien de gaspiller du gaz dans ce cas pour des allocations (allowances), autant transférer directement.

```solidity
    function cleanupERC20(
        address erc20,
        address dest
    )
        public
        onlyOwner
    {
        IERC20 token = IERC20(erc20);
```

C'est la syntaxe pour créer un objet pour un contrat lorsque nous recevons l'adresse. Pour l'utiliser, nous avons besoin de [la définition de IERC20](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/IERC20.sol), l'interface pour un contrat ERC-20 d'OpenZeppelin. La ligne `import {ERC20} from ...` de l'assistant n'importe que `ERC20`, ajoutez donc cette ligne à côté des autres importations en haut du fichier :

```solidity
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
```

```solidity
        uint balance = token.balanceOf(address(this));
        token.transfer(dest, balance);
    }
```

Il s'agit d'une fonction de nettoyage, donc nous ne voulons vraisemblablement laisser aucun jeton. Au lieu d'obtenir le solde de l'utilisateur manuellement, autant automatiser le processus.

## Conclusion {#conclusion}

Ce n'est pas une solution parfaite - il n'y a pas de solution parfaite au problème de « l'utilisateur a fait une erreur ». Cependant, l'utilisation de ce type de vérifications peut au moins prévenir certaines erreurs. La capacité de geler des comptes, bien que dangereuse, peut être utilisée pour limiter les dégâts de certains piratages en refusant au pirate l'accès aux fonds volés.

[Voir ici pour plus de mon travail](https://cryptodocguy.pro/).
