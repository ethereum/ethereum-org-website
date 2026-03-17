---
title: ERC-20 avec des garde-fous
description: "Comment aider les gens à éviter des erreurs bêtes"
author: Ori Pomerantz
lang: fr
tags: [ "erc-20" ]
skill: beginner
published: 2022-08-15
---

## Introduction {#introduction}

L'un des grands avantages d'Ethereum est qu'il n'y a pas d'autorité centrale qui peut modifier ou annuler vos transactions. L'un des grands problèmes d'Ethereum est qu'il n'y a pas d'autorité centrale ayant le pouvoir d'annuler les erreurs des utilisateurs ou les transactions illicites. Dans cet article, vous apprendrez quelques-unes des erreurs courantes que commettent les utilisateurs avec les jetons [ERC-20](/developers/docs/standards/tokens/erc-20/), ainsi que comment créer des contrats ERC-20 qui aident les utilisateurs à éviter ces erreurs, ou qui donnent à une autorité centrale certains pouvoirs (par exemple, geler des comptes).

Notez que bien que nous utilisions le [contrat de jeton ERC-20 d'OpenZeppelin](https://github.com/OpenZeppelin/openzeppelin-contracts/tree/master/contracts/token/ERC20), cet article ne l'explique pas en détail. Vous pouvez trouver ces informations [ici](/developers/tutorials/erc20-annotated-code).

Si vous souhaitez consulter le code source complet :

1. Ouvrez l'[IDE Remix](https://remix.ethereum.org/).
2. Cliquez sur l'icône de clonage de GitHub (![icône de clonage de GitHub](icon-clone.png)).
3. Clonez le dépôt GitHub `https://github.com/qbzzt/20220815-erc20-safety-rails`.
4. Ouvrez **contracts > erc20-safety-rails.sol**.

## Création d'un contrat ERC-20 {#creating-an-erc-20-contract}

Avant de pouvoir ajouter la fonctionnalité de garde-fou, nous avons besoin d'un contrat ERC-20. Dans cet article, nous utiliserons [l'assistant de contrats OpenZeppelin](https://docs.openzeppelin.com/contracts/5.x/wizard). Ouvrez-le dans un autre navigateur et suivez ces instructions :

1. Sélectionnez **ERC20**.

2. Entrez ces paramètres :

   | Paramètre        | Valeur           |
   | ---------------- | ---------------- |
   | Nom              | SafetyRailsToken |
   | Symbole          | SAFE             |
   | Prémint          | 1000             |
   | Fonctionnalités  | Aucun            |
   | Contrôle d'accès | Ownable          |
   | Évolutivité      | Aucun            |

3. Faites défiler vers le haut et cliquez sur **Ouvrir dans Remix** (pour Remix) ou sur **Télécharger** pour utiliser un autre environnement. Je vais supposer que vous utilisez Remix. Si vous utilisez autre chose, faites simplement les modifications appropriées.

4. Nous avons maintenant un contrat ERC-20 pleinement fonctionnel. Vous pouvez développer `.deps` > `npm` pour voir le code importé.

5. Compilez, déployez et interagissez avec le contrat pour voir qu'il fonctionne comme un contrat ERC-20. Si vous avez besoin d'apprendre à utiliser Remix, [consultez ce tutoriel](https://remix.ethereum.org/?#activate=udapp,solidity,LearnEth).

## Erreurs courantes {#common-mistakes}

### Les erreurs {#the-mistakes}

Les utilisateurs envoient parfois des jetons à la mauvaise adresse. Bien que nous ne puissions pas lire dans leurs pensées pour savoir ce qu'ils voulaient faire, il existe deux types d'erreurs qui se produisent souvent et qui sont faciles à détecter :

1. Envoi des jetons à la propre adresse du contrat. Par exemple, le [jeton OP d'Optimism](https://optimism.mirror.xyz/qvd0WfuLKnePm1Gxb9dpGchPf5uDz5NSMEFdgirDS4c) a accumulé [plus de 120 000](https://optimism.blockscout.com/address/0x4200000000000000000000000000000000000042) jetons OP en moins de deux mois. Cela représente une somme d'argent considérable que, vraisemblablement, des personnes ont simplement perdue.

2. Envoi de jetons à une adresse vide, c'est-à-dire une adresse qui ne correspond ni à un [compte externe](/developers/docs/accounts/#externally-owned-accounts-and-key-pairs) ni à un [contrat intelligent](/developers/docs/smart-contracts). Bien que je n'aie pas de statistiques sur la fréquence à laquelle cela se produit, [un incident aurait pu coûter 20 000 000 de jetons](https://gov.optimism.io/t/message-to-optimism-community-from-wintermute/2595).

### Prévention des transferts {#preventing-transfers}

Le contrat ERC-20 d'OpenZeppelin inclut [un hook, `_beforeTokenTransfer`](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol#L364-L368), qui est appelé avant le transfert d'un jeton. Par défaut, ce hook ne fait rien, mais nous pouvons y ajouter notre propre fonctionnalité, comme des vérifications qui annulent la transaction en cas de problème.

Pour utiliser le hook, ajoutez cette fonction après le constructeur :

```solidity
    function _beforeTokenTransfer(address from, address to, uint256 amount)
        internal virtual
        override(ERC20)
    {
        super._beforeTokenTransfer(from, to, amount);
    }
```

Certaines parties de cette fonction peuvent vous paraître nouvelles si vous n'êtes pas très familier avec Solidity :

```solidity
        internal virtual
```

Le mot-clé `virtual` signifie que, tout comme nous avons hérité de la fonctionnalité de `ERC20` et avons substitué cette fonction, d'autres contrats peuvent hériter de nous et substituer également cette fonction.

```solidity
        override(ERC20)
```

Nous devons spécifier explicitement que nous [substituons](https://docs.soliditylang.org/en/v0.8.15/contracts.html#function-overriding) la définition de `_beforeTokenTransfer` du jeton ERC20. En général, les définitions explicites sont bien meilleures du point de vue de la sécurité que les définitions implicites : vous ne pouvez pas oublier que vous avez fait quelque chose si cela se trouve juste devant vous. C'est aussi la raison pour laquelle nous devons spécifier de quelle superclasse nous substituons la fonction `_beforeTokenTransfer`.

```solidity
        super._beforeTokenTransfer(from, to, amount);
```

Cette ligne appelle la fonction `_beforeTokenTransfer` du ou des contrats dont nous avons hérité qui la possèdent. Dans ce cas, il s'agit uniquement de `ERC20`, car `Ownable` n'a pas ce hook. Même si `ERC20._beforeTokenTransfer` ne fait rien actuellement, nous l'appelons au cas où une fonctionnalité serait ajoutée à l'avenir (et que nous décidions alors de redéployer le contrat, car les contrats ne changent pas après leur déploiement).

### Coder les exigences {#coding-the-requirements}

Nous voulons ajouter ces exigences à la fonction :

- L'adresse `to` ne peut pas être égale à `address(this)`, l'adresse du contrat ERC-20 lui-même.
- L'adresse `to` ne peut pas être vide, elle doit être soit :
  - Un compte externe (EOA). Nous ne pouvons pas vérifier directement si une adresse est un EOA, mais nous pouvons vérifier le solde en ETH d'une adresse. Les EOA ont presque toujours un solde, même s'ils ne sont plus utilisés. Il est difficile de les vider jusqu'au dernier wei.
  - Un contrat intelligent. Vérifier si une adresse est un contrat intelligent est un peu plus difficile. Il existe un opcode qui vérifie la longueur du code externe, appelé [`EXTCODESIZE`](https://www.evm.codes/#3b), mais il n'est pas disponible directement dans Solidity. Pour cela, nous devons utiliser [Yul](https://docs.soliditylang.org/en/v0.8.15/yul.html), qui est l'assembleur de l'EVM. Il existe d'autres valeurs que nous pourrions utiliser à partir de Solidity ([`<address>.code` et `<address>.codehash`](https://docs.soliditylang.org/en/v0.8.15/units-and-global-variables.html#members-of-address-types)), mais elles coûtent plus cher.

Passons en revue le nouveau code, ligne par ligne :

```solidity
        require(to != address(this), "Impossible d'envoyer des jetons à l'adresse du contrat");
```

C'est la première exigence : vérifier que `to` et `address(this)` ne sont pas la même chose.

```solidity
        bool isToContract;
        assembly {
           isToContract := gt(extcodesize(to), 0)
        }
```

Voici comment nous vérifions si une adresse est un contrat. Nous ne pouvons pas recevoir de sortie directement de Yul. À la place, nous définissons donc une variable pour conserver le résultat (`isToContract` dans ce cas). Yul fonctionne de telle manière que chaque opcode est considéré comme une fonction. Donc, nous appelons d'abord [`EXTCODESIZE`](https://www.evm.codes/#3b) pour obtenir la taille du contrat, puis nous utilisons [`GT`](https://www.evm.codes/#11) pour vérifier qu'elle n'est pas nulle (nous avons affaire à des entiers non signés, donc bien sûr, elle ne peut pas être négative). Nous écrivons ensuite le résultat dans `isToContract`.

```solidity
        require(to.balance != 0 || isToContract, "Impossible d'envoyer des jetons à une adresse vide");
```

Et enfin, nous avons la vérification effective des adresses vides.

## Accès administratif {#admin-access}

Il est parfois utile d'avoir un administrateur qui peut annuler des erreurs. Pour réduire le potentiel d'abus, cet administrateur peut être un [multisig](https://blog.logrocket.com/security-choices-multi-signature-wallets/), de sorte que plusieurs personnes doivent approuver une action. Dans cet article, nous verrons deux fonctionnalités administratives :

1. Le gel et le dégel des comptes. Ceci peut être utile, par exemple, lorsqu'un compte pourrait être compromis.
2. Nettoyage des actifs.

   Parfois, des fraudeurs envoient des jetons frauduleux au contrat du jeton réel pour gagner en légitimité. Par exemple, [voir ici](https://optimism.blockscout.com/token/0x2348B1a1228DDCd2dB668c3d30207c3E1852fBbe?tab=holders). Le contrat ERC-20 légitime est [0x4200....0042](https://optimism.blockscout.com/token/0x4200000000000000000000000000000000000042). L'arnaque qui prétend être ce contrat est [0x234....bbe](https://optimism.blockscout.com/token/0x2348B1a1228DDCd2dB668c3d30207c3E1852fBbe).

   Il est également possible que des personnes envoient par erreur des jetons ERC-20 légitimes à notre contrat, ce qui est une autre raison de vouloir trouver un moyen de les retirer.

OpenZeppelin fournit deux mécanismes pour activer l'accès administratif :

- Les contrats `Ownable` ont un propriétaire unique. Les fonctions qui ont le [modificateur](https://www.tutorialspoint.com/solidity/solidity_function_modifiers.htm) `onlyOwner` ne peuvent être appelées que par ce propriétaire. Les propriétaires peuvent transférer la propriété à quelqu'un d'autre ou y renoncer complètement. Les droits de tous les autres comptes sont généralement identiques.
- Les contrats `AccessControl` ont un [contrôle d'accès basé sur les rôles (RBAC)](https://en.wikipedia.org/wiki/Role-based_access_control).

Par souci de simplicité, nous utilisons `Ownable` dans cet article.

### Gel et dégel des contrats {#freezing-and-thawing-contracts}

Le gel et le dégel des contrats nécessitent plusieurs modifications :

- Un [mapping](https://www.tutorialspoint.com/solidity/solidity_mappings.htm) des adresses vers des [booléens](https://en.wikipedia.org/wiki/Boolean_data_type) pour suivre les adresses qui sont gelées. Toutes les valeurs sont initialement à zéro, ce qui, pour les valeurs booléennes, est interprété comme faux. C'est ce que nous voulons, car par défaut, les comptes ne sont pas gelés.

  ```solidity
      mapping(address => bool) public frozenAccounts;
  ```

- Des [événements](https://www.tutorialspoint.com/solidity/solidity_events.htm) pour informer toute personne intéressée lorsqu'un compte est gelé ou dégelé. Techniquement, les événements ne sont pas requis pour ces actions, mais ils aident le code hors chaîne à écouter ces événements et à savoir ce qui se passe. Il est de bon ton pour un contrat intelligent de les émettre lorsque quelque chose qui pourrait intéresser quelqu'un d'autre se produit.

  Les événements sont indexés, il sera donc possible de rechercher toutes les fois où un compte a été gelé ou dégelé.

  ```solidity
    // Lorsque les comptes sont gelés ou dégelés
    event AccountFrozen(address indexed _addr);
    event AccountThawed(address indexed _addr);
  ```

- Fonctions pour geler et dégeler les comptes. Ces deux fonctions sont presque identiques, nous n'examinerons donc que la fonction de gel.

  ```solidity
      function freezeAccount(address addr)
        public
        onlyOwner
  ```

  Les fonctions marquées comme [`public`](https://www.tutorialspoint.com/solidity/solidity_contracts.htm) peuvent être appelées depuis d'autres contrats intelligents ou directement par une transaction.

  ```solidity
    {
        require(!frozenAccounts[addr], "Compte déjà gelé");
        frozenAccounts[addr] = true;
        emit AccountFrozen(addr);
    }  // freezeAccount
  ```

  Si le compte est déjà gelé, la transaction est annulée. Sinon, gelez-le et `émettez` un événement.

- Modifiez `_beforeTokenTransfer` pour empêcher que des fonds ne soient déplacés depuis un compte gelé. Notez que des fonds peuvent toujours être transférés vers le compte gelé.

  ```solidity
       require(!frozenAccounts[from], "Le compte est gelé");
  ```

### Nettoyage des actifs {#asset-cleanup}

Pour libérer les jetons ERC-20 détenus par ce contrat, nous devons appeler une fonction sur le contrat de jeton auquel ils appartiennent, soit [`transfer`](https://eips.ethereum.org/EIPS/eip-20#transfer) soit [`approve`](https://eips.ethereum.org/EIPS/eip-20#approve). Il est inutile de gaspiller du gaz sur des allocations dans ce cas, autant transférer directement.

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

C'est la syntaxe pour créer un objet pour un contrat lorsque nous recevons l'adresse. Nous pouvons le faire parce que nous avons la définition des jetons ERC20 dans le code source (voir la ligne 4), et ce fichier inclut [la définition de IERC20](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/IERC20.sol), l'interface pour un contrat ERC-20 OpenZeppelin.

```solidity
        uint balance = token.balanceOf(address(this));
        token.transfer(dest, balance);
    }
```

Il s'agit d'une fonction de nettoyage, donc nous ne voulons vraisemblablement laisser aucun jeton. Au lieu de demander manuellement le solde à l'utilisateur, nous pouvons tout aussi bien automatiser le processus.

## Conclusion {#conclusion}

Ce n'est pas une solution parfaite. Il n'y a pas de solution parfaite au problème « l'utilisateur a fait une erreur ». Cependant, l'utilisation de ce type de vérifications peut au moins éviter certaines erreurs. La possibilité de geler des comptes, bien que dangereuse, peut être utilisée pour limiter les dégâts de certains piratages en refusant au pirate les fonds volés.

[Voir ici pour plus de mon travail](https://cryptodocguy.pro/).
