---
title: ERC-20 en sécurité
description: Comment aider les gens à éviter des erreurs bêtes
author: Ori Pomerantz
lang: fr
tags:
  - "erc-20"
skill: beginner
published: 2022-08-15
---

## Introduction {#introduction}

L'un des grands avantages avec Ethereum est qu'il n'y a pas d'autorité centrale qui peut modifier ou annuler vos transactions. L'un des grands problèmes avec Ethereum est qu'il n'y a pas d'autorité centrale ayant le pouvoir d'annuler les erreurs des utilisateurs ou les transactions illicites. Dans cet article, vous apprendrez quelques-unes des erreurs courantes que commettent les utilisateurs avec les jetons [ERC-20](/developers/docs/standards/tokens/erc-20/), ainsi que comment créer des contrats ERC-20 qui aident les utilisateurs à éviter ces erreurs, ou qui donnent à une autorité centrale certains pouvoirs (par exemple, geler des comptes).

Notez que bien que nous utiliserons le [contrat de jeton ERC-20 d'OpenZeppelin](https://github.com/OpenZeppelin/openzeppelin-contracts/tree/master/contracts/token/ERC20), cet article n'explique pas en détail son fonctionnement. Vous pouvez trouver ces informations [ici](/developers/tutorials/erc20-annotated-code).

Si vous souhaitez consulter le code source complet :

1. Ouvrez l'[IDE Remix](https://remix.ethereum.org/).
2. Cliquez sur l'icône de clonage GitHub (![clone GitHub icon](icon-clone.png)).
3. Clonez le référentiel GitHub `https://github.com/qbzzt/20220815-erc20-safety-rails`.
4. Ouvrez **contrats > erc20-safety-rails.sol**.

## Création d'un contrat ERC-20 {#creating-an-erc-20-contract}

Avant de pouvoir ajouter la fonctionnalité de sécurité, nous avons besoin d'un contrat ERC-20. Dans cet article, nous utiliserons [l'assistant de contrats OpenZeppelin](https://docs.openzeppelin.com/contracts/4.x/wizard). Ouvrez-le dans un autre navigateur et suivez ces instructions :

1. Sélectionnez **ERC20**.
2. Entrez ces paramètres :

   | Paramètre        | Valeur           |
   | ---------------- | ---------------- |
   | Nom              | SafetyRailsToken |
   | Symbole          | SAFE             |
   | Pré-génère       | 1000             |
   | Fonctionnalités  | Aucune           |
   | Contrôle d'accès | Propriétaire     |
   | Mise à jour      | Aucune           |

3. Remontez et cliquez sur **Ouvrir dans Remix** (pour Remix) ou **Télécharger** pour utiliser un environnement différent. Je vais supposer que vous utilisez Remix, si vous utilisez autre chose, faites simplement les modifications appropriées.
4. Nous avons maintenant un contrat ERC-20 pleinement fonctionnel. Vous pouvez développer `.deps` > ` npm` pour voir le code importé.
5. Compilez, déployez et jouez avec le contrat pour voir qu'il fonctionne comme un contrat ERC-20. Si vous devez apprendre à utiliser Remix, [utilisez ce tutoriel](https://remix.ethereum.org/?#activate=udapp,solidity,LearnEth).

## Erreurs courantes {#common-mistakes}

### Les erreurs {#the-mistakes}

Les utilisateurs envoient parfois des tokens à la mauvaise adresse. Bien que nous ne puissions pas lire dans leurs pensées pour savoir ce qu'ils voulaient faire, il existe deux types d'erreurs qui se produisent souvent et sont faciles à détecter :

1. Envoyer les jetons à l'adresse du contrat lui-même. Par exemple, [le token OP d'Optimism](https://optimism.mirror.xyz/qvd0WfuLKnePm1Gxb9dpGchPf5uDz5NSMEFdgirDS4c) a réussi à accumuler [plus de 120 000 tokens OP](https://optimistic.etherscan.io/address/0x4200000000000000000000000000000000000042#tokentxns) en moins de deux mois. Cela représente une somme d'argent considérable que, vraisemblablement, des gens ont simplement perdue.

2. Envoyer les tokens à une adresse vide, une adresse qui ne correspond pas à [un compte possédé extérieurement](/developers/docs/accounts/#externally-owned-accounts-and-key-pairs) ou [à un contrat intelligent](/developers/docs/smart-contracts). Bien que je n'aie pas de statistiques sur la fréquence à laquelle cela se produit, [un incident aurait pu coûter 20 000 000 tokens](https://gov.optimism.io/t/message-to-optimism-community-from-wintermute/2595).

### Prévenir les transferts {#preventing-transfers}

Le contrat ERC-20 d'OpenZeppelin comprend [un crochet`, _beforeTokenTransfer`](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol#L364-L368), qui est appelé avant qu'un token soit transféré. Par défaut, ce crochet ne fait rien, mais nous pouvons y ajouter notre propre fonctionnalité, comme des vérifications qui annulent le transfert s'il y a un problème.

Pour utiliser le crochet, ajoutez cette fonction après le constructeur :

```solidity
    function _beforeTokenTransfer(address from, address to, uint256 amount)
        internal virtual
        override(ERC20)
    {
        super._beforeTokenTransfer(from, to, amount);
    }
```

Certaines parties de cette fonction peuvent vous être nouvelles si vous n'êtes pas très familiarisé avec Solidity :

```solidity
        internal virtual
```

Le mot-clé `virtual` signifie que tout comme nous avons hérité de la fonctionnalité `d'ERC20` et avons surchargé cette fonction, d'autres contrats peuvent hériter de nous et surcharger aussi cette fonction.

```solidity
        override(ERC20)
```

Nous devons explicitement spécifier que nous [surchargeons](https://docs.soliditylang.org/en/v0.8.15/contracts.html#function-overriding) la définition du jeton ERC20 de `_beforeTokenTransfer`. En général, les définitions explicites sont bien meilleures, du point de vue de la sécurité, que les définitions implicites : vous ne pouvez pas oublier que vous avez fait quelque chose si cela se trouve juste devant vous. C'est aussi la raison pour laquelle nous devons spécifier quelle surclasse de `_beforeTokenTransfer` nous surchargeons.

```solidity
        super._beforeTokenTransfer(from, to, amount);
```

Cette ligne appelle la fonction `_beforeTokenTransfer` du ou des contrats dont nous avons hérité et qui la possèdent. Dans ce cas, il s'agit uniquement `d'ERC20`, `Ownable` n'a pas ce crochet. Bien qu'actuellement `ERC20._beforeTokenTransfer` ne fasse rien, nous l'appelons au cas où une fonctionnalité serait ajoutée à l'avenir (et nous décidons alors de redéployer le contrat, car les contrats ne changent pas après le déploiement).

### Codage des exigences {#coding-the-requirements}

Nous voulons ajouter ces exigences à la fonction :

- L'adresse `to` ne peut pas être égale à cette `address`, l'adresse du contrat ERC-20 lui-même.
- L'adresse `to` ne peut pas être vide, elle doit être soit :
  - Un compte détenu extérieurement (EOA). Nous ne pouvons pas vérifier directement si une adresse est un EOA, mais nous pouvons vérifier le solde ETH d'une adresse. Les EOA ont presque toujours un solde, même s'ils ne sont plus utilisés - il est difficile de les vider jusqu'au dernier wei.
  - Un contrat intelligent. Tester si une adresse est un contrat intelligent est un peu plus difficile. Il existe un opcode qui vérifie la longueur du code externe, appelé [`EXTCODESIZE`](https://www.evm.codes/#3b), mais il n'est pas directement disponible en Solidity. Nous devons utiliser [Yul](https://docs.soliditylang.org/en/v0.8.15/yul.html), qui est l'assembleur EVM, pour cela. Il existe d'autres valeurs que nous pourrions utiliser depuis Solidity ([`<address>.code` et `<address>.codehash`](https://docs.soliditylang.org/en/v0.8.15/units-and-global-variables.html#members-of-address-types)), mais elles coûtent plus cher.

Examinons le nouveau code ligne par ligne :

```solidity
        require(to != address(this), "Can't send tokens to the contract address");
```

C'est la première exigence, vérifier que `to` et `cette(address)` ne sont pas la même chose.

```solidity
        bool isToContract;
        assembly {
           isToContract := gt(extcodesize(to), 0)
        }
```

C'est ainsi que nous vérifions si une adresse est un contrat. Nous ne pouvons pas recevoir de réponse directement de Yul, nous définissons donc une variable pour contenir le résultat (`isToContract` dans ce cas). La façon dont Yul fonctionne est que chaque opcode est considéré comme une fonction. Nous appelons donc d'abord [`EXTCODESIZE`](https://www.evm.codes/#3b) pour obtenir la taille du contrat, puis utilisons [`GT`](https://www.evm.codes/#11) pour vérifier qu'elle n'est pas nulle (nous travaillons avec des entiers non signés, donc bien sûr elle ne peut pas être négative). Nous écrivons ensuite le résultat dans `isToContract`.

```solidity
        require(to.balance != 0 || isToContract, "Can't send tokens to an empty address");
```

Et enfin, nous avons la vérification réelle des adresses vides.

## Accès administratif {#admin-access}

Parfois, il est utile d'avoir un administrateur qui peut annuler des erreurs. Pour réduire le potentiel d'abus, cet administrateur peut être géré par une [multisig](https://blog.logrocket.com/security-choices-multi-signature-wallets/), ce qui signifie que plusieurs personnes doivent accepter une action. Dans cet article, nous aurons deux fonctionnalités administratives :

1. Le gel et le dégel des comptes. Ceci peut être utile, par exemple, lorsqu'un compte pourrait être compromis.
2. Nettoyage des actifs.

   Parfois, des fraudeurs envoient des jetons frauduleux au vrai contrat pour gagner en légitimité. Par exemple, [regardez ici](https://optimistic.etherscan.io/token/0x2348b1a1228ddcd2db668c3d30207c3e1852fbbe?a=0x4200000000000000000000000000000000000042). Le contrat ERC-20 légitime est [0x4200....0042](https://optimistic.etherscan.io/address/0x4200000000000000000000000000000000000042). L'arnaque qui prétend l'être est [0x234....bbe](https://optimistic.etherscan.io/address/0x2348b1a1228ddcd2db668c3d30207c3e1852fbbe).

   Il est également possible que des personnes envoient par erreur des jetons ERC-20 légitimes à notre contrat, ce qui est une autre raison de vouloir trouver un moyen de les retirer.

OpenZeppelin fournit deux mécanismes pour activer l'accès administratif :

- Les contrats [`Ownable`](https://docs.openzeppelin.com/contracts/4.x/access-control#ownership-and-ownable) ont un seul propriétaire. Les fonctions ayant le [modificateur](https://www.tutorialspoint.com/solidity/solidity_function_modifiers.htm) `onlyOwner` ne peuvent être appelées que par ce propriétaire. Les propriétaires peuvent transférer la propriété à quelqu'un d'autre ou y renoncer complètement. Les droits de tous les autres comptes sont généralement identiques.
- Les contrats [`AccessControl`](https://docs.openzeppelin.com/contracts/4.x/access-control#role-based-access-control) ont [un contrôle d'accès basé sur les rôles (RBAC)](https://en.wikipedia.org/wiki/Role-based_access_control).

Pour simplifier, dans cet article, nous utilisons `Ownable`.

### Geler et dégeler les contrats {#freezing-and-thawing-contracts}

Le gel et le dégel des contrats nécessitent plusieurs modifications :

- Un [mapping](https://www.tutorialspoint.com/solidity/solidity_mappings.htm) d'adresses à des [booléens](https://en.wikipedia.org/wiki/Boolean_data_type) pour suivre quelles adresses sont gelées. Toutes les valeurs sont initialement à zéro, ce qui, pour les valeurs booléennes, est interprété comme faux. C'est ce que nous voulons, car par défaut, les comptes ne sont pas gelés.

  ```solidity
      mapping(address => bool) public frozenAccounts;
  ```

- Des [événements](https://www.tutorialspoint.com/solidity/solidity_events.htm) pour informer quiconque intéressé lorsqu'un compte est gelé ou dégelé. Techniquement, ces événements ne sont pas nécessaires pour ces actions, mais cela aide le code hors chaîne à pouvoir écouter ces événements et savoir ce qui se passe. Il est considéré comme une bonne manière pour un contrat intelligent de les émettre lorsque quelque chose qui pourrait être pertinent pour quelqu'un d'autre se produit.

  Les événements sont indexés, il sera donc possible de rechercher toutes les fois qu'un compte a été gelé ou dégelé.

  ```solidity
    // When accounts are frozen or unfrozen
    event AccountFrozen(address indexed _addr);
    event AccountThawed(address indexed _addr);
  ```

- Fonctions pour geler et dégeler les comptes. Ces deux fonctions sont presque identiques, nous n'expliquerons donc que la fonction de gel.

  ```solidity
      function freezeAccount(address addr)
        public
        onlyOwner
  ```

  Les fonctions marquées comme [`public`](https://www.tutorialspoint.com/solidity/solidity_contracts.htm) peuvent être appelées à partir d'autres contrats intelligents ou directement par une transaction.

  ```solidity
    {
        require(!frozenAccounts[addr], "Account already frozen");
        frozenAccounts[addr] = true;
        emit AccountFrozen(addr);
    }  // freezeAccount
  ```

  Si le compte est déjà gelé, annulez. Sinon, gelez-le et `émettez` un événement.

- Modifiez `_beforeTokenTransfer` pour empêcher le transfert d'argent depuis un compte gelé. Notez que l'argent peut toujours être transféré vers le compte gelé.

  ```solidity
       require(!frozenAccounts[from], "The account is frozen");
  ```

### Nettoyage des actifs {#asset-cleanup}

Pour libérer les jetons ERC-20 détenus par ce contrat, nous devons appeler une fonction sur le contrat token auquel ils appartiennent, soit [`transfer`](https://eips.ethereum.org/EIPS/eip-20#transfer) soit [`approve`](https://eips.ethereum.org/EIPS/eip-20#approve). Cela ne sert à rien de gaspiller du gaz dans ce cas en quotas, autant transférer directement.

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

C'est la syntaxe pour créer un objet pour un contrat lorsque nous recevons l'adresse. Nous pouvons faire cela parce que nous avons la définition des jetons ERC20 dans le code source (voir ligne 4), et ce fichier inclut [la définition pour IERC20](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/IERC20.sol), l'interface pour un contrat ERC-20 d'OpenZeppelin.

```solidity
        uint balance = token.balanceOf(address(this));
        token.transfer(dest, balance);
    }
```

C'est une fonction de nettoyage, nous ne voulons donc probablement laisser aucun jeton. Au lieu d'obtenir le solde de l'utilisateur manuellement, autant automatiser le processus.

## Conclusion {#conclusion}

Ce n'est pas une solution parfaite - il n'existe pas de solution parfaite au problème « l'utilisateur a fait une erreur ». Cependant, utiliser ce type de vérifications peut au moins prévenir certaines erreurs. La capacité à geler des comptes, bien que dangereuse, peut être utilisée pour limiter les dégâts de certaines attaques en refusant au pirate les fonds volés.
