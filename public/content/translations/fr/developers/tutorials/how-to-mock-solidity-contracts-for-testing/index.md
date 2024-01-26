---
title: Comment simuler des contrats intelligents Solidity pour les tests
description: Pourquoi vous devriez vous amuser avec vos contrats lors de vos tests
author: Markus Waas
lang: fr
tags:
  - "solidity"
  - "contrats intelligents"
  - "tests"
  - "simulation"
skill: intermediate
published: 2020-05-02
source: soliditydeveloper.com
sourceUrl: https://soliditydeveloper.com/mocking-contracts
---

[Les objets simulés](https://wikipedia.org/wiki/Mock_object) sont un modèle de conception commun en programmation orientée objet. Provenant du vieux mot français "mocquer", qui signifiait "se moquer de", sa signification a évolué en "imiter quelque chose de réel", ce qui est en fait ce que nous faisons en programmation. Vous pouvez vous moquer de vos contrats intelligents si vous le souhaitez, mais simulez-les dès que vous le pouvez. Cela vous facilite la vie.

## Contrats de test unitaire avec simulation {#unit-testing-contracts-with-mocks}

Simuler un contrat signifie essentiellement créer une seconde version de ce contrat qui se comporte d'une manière très similaire à la version originale, mais qui peut être facilement contrôlé par le développeur. Vous vous retrouvez souvent avec des contrats complexes où vous ne voulez que [tester de petites parties du contrat](/developers/docs/smart-contracts/testing/). Le problème est le suivant : que se passe-t-il si le test de cette petite partie exige un état de contrat très spécifique dans lequel il est difficile de s'y retrouver ?

Vous pouvez écrire une logique de configuration de test complexe à chaque fois que le contrat est dans l'état requis ou vous pouvez écrire une simulation. Il est facile de simuler un contrat en utilisant l'héritage. Il suffit de créer un second contrat fictif qui hérite du contrat original. Vous pouvez maintenant remplacer les fonctions sur votre contrat fictif. Voyons cela avec un exemple.

## Exemple : ERC20 privé {#example-private-erc20}

Notre exemple est celui d'un contrat ERC-20 ayant une durée de vie privée initiale. Le propriétaire peut gérer les utilisateurs privés et seuls ces derniers seront autorisés à recevoir des jetons au début. Une fois un certain temps écoulé, tout le monde sera autorisé à utiliser les jetons. Si vous êtes curieux, sachez que nous utilisons le crochet [`_beforeTokenTransfer`](https://docs.openzeppelin.com/contracts/3.x/extending-contracts#using-hooks) des nouveaux contrats OpenZeppelin v3.

```solidity
pragma solidity ^0.6.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract PrivateERC20 is ERC20, Ownable {
    mapping (address => bool) public isPrivateUser;
    uint256 private publicAfterTime;

    constructor(uint256 privateERC20timeInSec) ERC20("PrivateERC20", "PRIV") public {
        publicAfterTime = now + privateERC20timeInSec;
    }

    function addUser(address user) external onlyOwner {
        isPrivateUser[user] = true;
    }

    function isPublic() public view returns (bool) {
        return now >= publicAfterTime;
    }

    function _beforeTokenTransfer(address from, address to, uint256 amount) internal virtual override {
        super._beforeTokenTransfer(from, to, amount);

        require(_validRecipient(to), "PrivateERC20: invalid recipient");
    }

    function _validRecipient(address to) private view returns (bool) {
        if (isPublic()) {
            return true;
        }

        return isPrivateUser[to];
    }
}
```

Nous allons maintenant en créer une version fictive.

```solidity
pragma solidity ^0.6.0;
import "../PrivateERC20.sol";

contract PrivateERC20Mock is PrivateERC20 {
    bool isPublicConfig;

    constructor() public PrivateERC20(0) {}

    function setIsPublic(bool isPublic) external {
        isPublicConfig = isPublic;
    }

    function isPublic() public view returns (bool) {
        return isPublicConfig;
    }
}
```

Vous obtiendrez l'un des messages d'erreur suivants :

- `PrivateERC20Mock.sol: TypeError: Overriding function is missing "override" specifier.`
- `PrivateERC20.sol: TypeError: Trying to override non-virtual function. Did you forget to add "virtual"?.`

Comme nous utilisons la nouvelle version 0.6 de Solidity, nous devons ajouter le mot clé `virtual` pour les fonctions qui peuvent être remplacées et remplacer pour la fonction de remplacement. Alors ajoutons-les aux deux fonctions `isPublic`.

Dans vos tests unitaires, vous pouvez désormais utiliser `PrivateERC20Mock` à la place. Pour tester le comportement pendant le temps d'utilisation privée, utilisez `setIsPublic(false)` et, de la même manière, `setIsPublic(true)` pour tester le temps d'utilisation publique. Bien sûr, dans notre exemple, nous pourrions juste utiliser [des aides de temps](https://docs.openzeppelin.com/test-helpers/0.5/api#increase) pour également changer les temps correspondants. Mais l'utilisation d'une version fictive devrait désormais être plus claire. Vous pouvez imaginer des scénarios où il n'est pas aussi simple de faire avancer le temps.

## Simuler de nombreux contrats {#mocking-many-contracts}

La situation peut devenir confuse si vous devez créer un autre contrat pour chaque simulation. Si cela vous dérange, vous pouvez jeter un coup d'oeil à la bibliothèque [MockContract](https://github.com/gnosis/mock-contract). Elle vous permet de remplacer et de modifier les comportements des contrats à la volée. Cependant, cela ne fonctionne que pour simuler des appels à un autre contrat, cela ne fonctionnerait donc pas dans notre exemple.

## La simulation peut être encore plus puissante {#mocking-can-be-even-more-powerful}

Les pouvoirs de la simulation ne s'arrêtent pas là.

- Ajout de fonctions : Il peut être utile non seulement de remplacer une fonction spécifique, mais aussi d'ajouter des fonctions supplémentaires. Pour les jetons, un bon exemple est simplement d'avoir une fonction `mint` supplémentaire pour permettre à tout utilisateur d'obtenir de nouveaux jetons gratuitement.
- Utilisation dans les réseaux de test : Lorsque vous déployez et testez vos contrats sur des réseaux de test avec votre dapp, envisagez d'utiliser une version fictive. Évitez de remplacer des fonctions à moins que cela ne soit indispensable. Après tout, vous voulez tester la logique réelle. Il peut néanmoins être utile d'ajouter, par exemple, une fonction de réinitialisation, celle-ci vous permettant de réinitialiser simplement l'état du contrat au début, sans avoir à effectuer de nouveau déploiement. Évidemment, vous ne voudriez pas de cela dans un contrat de réseau principal.
