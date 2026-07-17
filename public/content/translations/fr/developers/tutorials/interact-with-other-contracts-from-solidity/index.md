---
title: Interagir avec d'autres contrats depuis Solidity
description: "Comment déployer un contrat intelligent à partir d'un contrat existant et interagir avec lui"
author: "jdourlens"
tags: ["contrats intelligents", "Solidity", "Remix", "déploiement", "composabilité"]
skill: advanced
breadcrumb: Interactions entre contrats
lang: fr
published: 2020-04-05
source: EthereumDev
sourceUrl: https://ethereumdev.io/interact-with-other-contracts-from-solidity/
address: "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
---

Dans les tutoriels précédents, nous avons beaucoup appris sur [comment déployer votre premier contrat intelligent](/developers/tutorials/deploying-your-first-smart-contract/) et y ajouter des fonctionnalités telles que le [contrôle d'accès avec des modificateurs](https://ethereumdev.io/organize-your-code-and-control-access-to-your-smart-contract-with-modifiers/) ou la [gestion des erreurs dans Solidity](https://ethereumdev.io/handle-errors-in-solidity-with-require-and-revert/). Dans ce tutoriel, nous allons apprendre comment déployer un contrat intelligent à partir d'un contrat existant et interagir avec lui.

Nous allons créer un contrat qui permet à quiconque d'avoir son propre contrat intelligent `Counter` en créant une usine (factory) pour celui-ci, son nom sera `CounterFactory`. Voici d'abord le code de notre contrat intelligent `Counter` initial :

```solidity
pragma solidity 0.5.17;

contract Counter {

    uint256 private _count;
    address private _owner;
    address private _factory;


     modifier onlyOwner(address caller) {
        require(caller == _owner, "You're not the owner of the contract");
        _;
    }

    modifier onlyFactory() {
        require(msg.sender == _factory, "You need to use the factory");
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

Notez que nous avons légèrement modifié le code du contrat pour garder une trace de l'adresse de l'usine et de l'adresse du propriétaire du contrat. Lorsque vous appelez le code d'un contrat depuis un autre contrat, le msg.sender fera référence à l'adresse de notre usine de contrats. C'est **un point très important à comprendre** car l'utilisation d'un contrat pour interagir avec d'autres contrats est une pratique courante. Vous devez donc faire attention à qui est l'expéditeur dans les cas complexes.

Pour cela, nous avons également ajouté un modificateur `onlyFactory` qui s'assure que la fonction modifiant l'état ne peut être appelée que par l'usine qui passera l'appelant d'origine en paramètre.

À l'intérieur de notre nouveau `CounterFactory` qui gérera tous les autres compteurs, nous ajouterons un mapping qui associera un propriétaire à l'adresse de son contrat de compteur :

```solidity
mapping(address => Counter) _counters;
```

Dans Ethereum, les mappings sont l'équivalent des objets en JavaScript, ils permettent d'associer une clé de type A à une valeur de type B. Dans ce cas, nous associons l'adresse d'un propriétaire à l'instance de son compteur.

L'instanciation d'un nouveau compteur pour quelqu'un ressemblera à ceci :

```solidity
  function createCounter() public {
      require (_counters[msg.sender] == Counter(0));
      _counters[msg.sender] = new Counter(msg.sender);
  }
```

Nous vérifions d'abord si la personne possède déjà un compteur. Si elle ne possède pas de compteur, nous instancions un nouveau compteur en passant son adresse au constructeur `Counter` et nous assignons l'instance nouvellement créée au mapping.

Pour obtenir le compte d'un compteur spécifique, cela ressemblera à ceci :

```solidity
function getCount(address account) public view returns (uint256) {
    require (_counters[account] != Counter(0));
    return (_counters[account].getCount());
}

function getMyCount() public view returns (uint256) {
    return (getCount(msg.sender));
}
```

La première fonction vérifie si le contrat de compteur existe pour une adresse donnée, puis appelle la méthode `getCount` de l'instance. La deuxième fonction : `getMyCount` est juste un raccourci pour passer le msg.sender directement à la fonction `getCount`.

La fonction `increment` est assez similaire mais passe l'expéditeur de la transaction d'origine au contrat `Counter` :

```solidity
function increment() public {
      require (_counters[msg.sender] != Counter(0));
      Counter(_counters[msg.sender]).increment(msg.sender);
  }
```

Notez que s'il est appelé trop de fois, notre compteur pourrait potentiellement être victime d'un dépassement de capacité. Vous devriez utiliser la [bibliothèque SafeMath](https://ethereumdev.io/using-safe-math-library-to-prevent-from-overflows/) autant que possible pour vous protéger de ce cas de figure.

Pour déployer notre contrat, vous devrez fournir à la fois le code du `CounterFactory` et du `Counter`. Lors du déploiement, par exemple dans Remix, vous devrez sélectionner CounterFactory.

Voici le code complet :

```solidity
pragma solidity 0.5.17;

contract Counter {

    uint256 private _count;
    address private _owner;
    address private _factory;


     modifier onlyOwner(address caller) {
        require(caller == _owner, "You're not the owner of the contract");
        _;
    }

    modifier onlyFactory() {
        require(msg.sender == _factory, "You need to use the factory");
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

Après la compilation, dans la section de déploiement de Remix, vous sélectionnerez l'usine à déployer :

![Selecting the factory to be deployed in Remix](./counterfactory-deploy.png)

Ensuite, vous pouvez jouer avec votre usine de contrats et vérifier le changement de valeur. Si vous souhaitez appeler le contrat intelligent à partir d'une adresse différente, vous devrez changer l'adresse dans la sélection de compte (Account) de Remix.