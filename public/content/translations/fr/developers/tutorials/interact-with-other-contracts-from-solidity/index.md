---
title: Interagir avec d'autres contrats depuis Solidity
description: Comment déployer un contrat intelligent à partir d'un contrat existant et interagir avec lui
author: "jdourlens"
tags:
  [
    "contrats intelligents",
    "solidité",
    "remix",
    "déploiement",
    "composabilité"
  ]
skill: advanced
lang: fr
published: 2020-04-05
source: EthereumDev
sourceUrl: https://ethereumdev.io/interact-with-other-contracts-from-solidity/
address: "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
---

Dans les tutoriels précédents, nous avons beaucoup appris sur [comment déployer votre premier contrat intelligent](/developers/tutorials/deploying-your-first-smart-contract/), comment y ajouter certaines fonctionnalités comme le [contrôle d'accès avec des modificateurs](https://ethereumdev.io/organize-your-code-and-control-access-to-your-smart-contract-with-modifiers/) ou la [gestion des erreurs dans Solidity](https://ethereumdev.io/handle-errors-in-solidity-with-require-and-revert/). Dans ce tutoriel, nous allons apprendre comment déployer un contrat intelligent à partir d'un contrat existant et interagir avec celui-ci.

Nous allons créer un contrat qui permet à quiconque d'avoir son propre contrat intelligent `Counter` en créant une fabrique pour celui-ci. Son nom sera `CounterFactory`. Voici d'abord le code de notre contrat intelligent `Counter` initial :

```solidity
pragma solidity 0.5.17;

contract Counter {

    uint256 private _count;
    address private _owner;
    address private _factory;


     modifier onlyOwner(address caller) {
        require(caller == _owner, "Vous n'êtes pas le propriétaire du contrat");
        _;
    }

    modifier onlyFactory() {
        require(msg.sender == _factory, "Vous devez utiliser la fabrique");
        _;
    }

     constructor(address owner) public {
        _owner = owner;
        _factory = msg.sender;
    }

     function getCount() public view returns (uint256) {
        return _count;
    }

    function increment(address caller) public onlyFactory onlyOwner(caller) {
        _count++;
    }

}
```

Notez que nous avons légèrement modifié le code du contrat pour garder une trace de l'adresse de la fabrique et de l'adresse du propriétaire du contrat. Lorsque vous appelez un code de contrat depuis un autre contrat, `msg.sender` fera référence à l'adresse de notre fabrique de contrats. C'est un **point vraiment important à comprendre**, car l'utilisation d'un contrat pour interagir avec d'autres contrats est une pratique courante. Vous devez donc faire attention à qui est l'expéditeur dans les cas complexes.

Pour cela, nous avons également ajouté un modificateur `onlyFactory` qui s'assure que la fonction de changement d'état ne peut être appelée que par la fabrique qui transmettra l'appelant original en tant que paramètre.

À l'intérieur de notre nouvelle `CounterFactory` qui gérera tous les autres contrats Compteur, nous ajouterons un mapping qui associera un propriétaire à l'adresse de son contrat Compteur :

```solidity
mapping(address => Counter) _counters;
```

Dans Ethereum, les mappings sont l'équivalent des objets en JavaScript. Ils permettent de mapper une clé de type A à une valeur de type B. Dans ce cas, nous mappons l'adresse d'un propriétaire avec l'instance de son Compteur.

Instancier un nouveau Compteur pour quelqu'un ressemblera à ceci :

```solidity
  function createCounter() public {
      require (_counters[msg.sender] == Counter(0));
      _counters[msg.sender] = new Counter(msg.sender);
  }
```

Nous vérifions d'abord si la personne possède déjà un Compteur. S'il ne possède pas de Compteur, nous instancions un nouveau Compteur en passant son adresse au constructeur `Counter` et nous assignons l'instance nouvellement créée au mapping.

Pour obtenir la valeur d'un Compteur spécifique, cela ressemblera à ceci :

```solidity
function getCount(address account) public view returns (uint256) {
    require (_counters[account] != Counter(0));
    return (_counters[account].getCount());
}

function getMyCount() public view returns (uint256) {
    return (getCount(msg.sender));
}
```

La première fonction vérifie si le contrat Compteur existe pour une adresse donnée, puis appelle la méthode `getCount` depuis l'instance. La deuxième fonction, `getMyCount`, est juste un raccourci pour passer directement `msg.sender` à la fonction `getCount`.

La fonction `increment` est assez similaire, mais elle transmet l'expéditeur de la transaction originale au contrat `Counter` :

```solidity
function increment() public {
      require (_counters[msg.sender] != Counter(0));
      Counter(_counters[msg.sender]).increment(msg.sender);
  }
```

Notez que s'il est appelé trop de fois, notre compteur pourrait être victime d'un dépassement de capacité (overflow). Vous devriez utiliser la [bibliothèque SafeMath](https://ethereumdev.io/using-safe-math-library-to-prevent-from-overflows/) autant que possible pour vous protéger de ce cas de figure.

Pour déployer notre contrat, vous devrez fournir à la fois le code de `CounterFactory` et de `Counter`. Lors du déploiement, dans Remix par exemple, vous devrez sélectionner CounterFactory.

Voici le code complet :

```solidity
pragma solidity 0.5.17;

contract Counter {

    uint256 private _count;
    address private _owner;
    address private _factory;


     modifier onlyOwner(address caller) {
        require(caller == _owner, "Vous n'êtes pas le propriétaire du contrat");
        _;
    }

    modifier onlyFactory() {
        require(msg.sender == _factory, "Vous devez utiliser la fabrique");
        _;
    }

     constructor(address owner) public {
        _owner = owner;
        _factory = msg.sender;
    }

     function getCount() public view returns (uint256) {
        return _count;
    }

    function increment(address caller) public onlyFactory onlyOwner(caller) {
        _count++;
    }

}

contract CounterFactory {

    mapping(address => Counter) _counters;

    function createCounter() public {
        require (_counters[msg.sender] == Counter(0));
        _counters[msg.sender] = new Counter(msg.sender);
    }

    function increment() public {
        require (_counters[msg.sender] != Counter(0));
        Counter(_counters[msg.sender]).increment(msg.sender);
    }

    function getCount(address account) public view returns (uint256) {
        require (_counters[account] != Counter(0));
        return (_counters[account].getCount());
    }

    function getMyCount() public view returns (uint256) {
        return (getCount(msg.sender));
    }

}
```

Après compilation, dans la section de déploiement de Remix, vous sélectionnerez la fabrique à déployer :

![Sélection de la fabrique à déployer dans Remix](./counterfactory-deploy.png)

Ensuite, vous pouvez vous amuser avec votre fabrique de contrats et vérifier que la valeur change. Si vous souhaitez appeler le contrat intelligent à partir d'une adresse différente, vous devrez changer l'adresse dans la sélection de compte de Remix.
