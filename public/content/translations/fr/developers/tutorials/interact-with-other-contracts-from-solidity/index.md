---
title: Interagir avec les autres contrats de Solidity
description: Comment déployer un contrat intelligent à partir d'un contrat existant et interagir avec lui
author: "jdourlens"
tags:
  - "contrats intelligents"
  - "solidity"
  - "remix"
  - "déploiement"
  - "composabilité"
skill: advanced
lang: fr
published: 2020-04-05
source: EthereumDev
sourceUrl: https://ethereumdev.io/interact-with-other-contracts-from-solidity/
address: "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
---

Dans le tutoriel précédent nous avons appris [Comment déployer votre premier contrat intelligent](/developers/tutorials/deploying-your-first-smart-contract/) et ajouter des fonctionnalité comme [le contrôle d'accès avec des modificateurs](https://ethereumdev.io/organize-your-code-and-control-access-to-your-smart-contract-with-modifiers/) ou [la gestion d'erreur avec Solidity](https://ethereumdev.io/handle-errors-in-solidity-with-require-and-revert/). Dans ce tutoriel, nous allons apprendre comment déployer un contrat intelligent à partir d'un contrat existant et interagir avec celui-ci.

Nous allons créer un contrat qui permet à quiconque de disposer de son propre contrat intelligent `Counter` en créant une usine. Nous l'appellerons `CounterFactory`. Tout d'abord voici le code de notre précèdent contrat intelligent `Counter` :

```solidity
pragma solidity 0.5.17;

contract Counter {

    uint256 private _count;
    address private _owner;
    address private _factory;


     modifier onlyOwner(address caller) {
        require(caller == _owner, "Vous le proprietaire du contrat");
        _;
    }

    modifier onlyFactory() {
        require(msg.sender == _factory, "Vous avez besoin d’un factory");
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

Notez que nous avons légèrement modifié le code du contrat pour garder une trace de l'adresse de la Factory et de l'adresse du titulaire du contrat. Lorsque vous appelez un code contrat depuis un autre contrat, msg.render se réfère à l'adresse de notre contrat Factory. C'est **un point vraiment important à comprendre** car utiliser un contrat pour interagir avec d'autres contrats est une pratique courante. Il convient donc de déterminer qui est l'expéditeur dans des cas complexes.

Pour cela, nous avons également ajouté un modificateur `onlyFactory` qui s'assure que la fonction de changement d'état ne peut être appelée que par la Factory qui passera l'appelant original comme paramètre.

À l'intérieur de notre nouvelle `CounterFactory` qui gérera tous les autres contre-contrats, nous ajouterons un mapping qui associera un titulaire à l'adresse de son contrat:

```solidity
mapping(address => Counter) _counters;
```

Dans Ethereum, le mapping est équivalent aux objets en javascript, il permet de faire correspondre une clé de type A à une valeur de type B. Dans ce cas, nous cartographions l'adresse d'un propriétaire avec l'instance de son contre-contrat.

Instancier un nouveau contre-contrat pour quelqu'un ressemblera à ceci :

```solidity
  function createCounter() public {
      require (_counters[msg.sender] == Counter(0));
      _counters[msg.sender] = new Counter(msg.sender);
  }
```

Nous vérifions d'abord si la personne est déjà propriétaire d'un contre-contrat. S'il ne possède pas de contre-contrat, nous instancions un nouveau contre-contrat en passant son adresse au constructeur `Counter` et assignons l'instance nouvellement créée au mapping.

Pour obtenir le nombre de vues d'un contre-contrat spécifique, il faudra faire comme ceci :

```solidity
function getCount(address account) public view returns (uint256) {
    require (_counters[account] != Counter(0));
    return (_counters[account].getCount());
}

function getMyCount() public view returns (uint256) {
    return (getCount(msg.sender));
}
```

La première fonction vérifie s'il existe un contre-contrat pour une adresse donnée, puis appelle la méthode `getCount` de l'instance. La deuxième fonction : `getMyCount` est juste une courte opération pour passer le msg.sender directement à la fonction `getCount`.

La fonction `increment` est assez similaire mais bascule l'émetteur de la transaction originale vers le contrat `Counter`:

```solidity
function increment() public {
      require (_counters[msg.sender] != Counter(0));
      Counter(_counters[msg.sender]).increment(msg.sender);
  }
```

Notez que s'il est trop sollicité, notre compteur pourrait être saturé. Il convient d'utiliser la bibliothèque [SafeMath](https://ethereumdev.io/using-safe-math-library-to-prevent-from-overflows/) autant que possible pour se protéger de cette éventualité.

Pour déployer notre contrat, vous devrez fournir à la fois le code de la `CounterFactory` et du `Counter`. Lors du déploiement, dans Remix par exemple, vous devrez sélectionner CounterFactory.

Voici le code final :

```solidity
pragma solidity 0.5.17;

contract Counter {

    uint256 private _count;
    address private _owner;
    address private _factory;


     modifier onlyOwner(address caller) {
        require(caller == _owner, "Vous etes le proprietaire du contrat");
        _;
    }

    modifier onlyFactory() {
        require(msg.sender == _factory, "Vous avez besoin d’un factory");
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

Après avoir compilé, dans la section de déploiement de Remix, vous sélectionnez la Factory à déployer :

![Sélection de la Factory à déployer dans Remix](./counterfactory-deploy.png)

Ensuite, vous pouvez jouer avec votre Factory à contrat et suivre l'évolution de la valeur. Si vous souhaitez appeler le contrat intelligent à partir d'une adresse différente, vous devrez changer l'adresse dans la sélection de compte de Remix.
