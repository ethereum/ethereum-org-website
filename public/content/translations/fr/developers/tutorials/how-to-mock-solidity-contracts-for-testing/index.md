---
title: Comment simuler (mock) des contrats intelligents Solidity pour les tests
description: Pourquoi vous devriez simuler vos contrats lors des tests
author: Markus Waas
lang: fr
tags: ["solidity", "contrats intelligents", "tests", "mocking"]
skill: intermediate
breadcrumb: Simuler des contrats
published: 2020-05-02
source: soliditydeveloper.com
sourceUrl: https://soliditydeveloper.com/mocking-contracts
---

Les [objets simulés (mocks)](https://wikipedia.org/wiki/Mock_object) sont un modèle de conception courant en programmation orientée objet. Venant de l'ancien mot français « mocquer » qui signifie « se moquer de », il a évolué pour signifier « imiter quelque chose de réel », ce qui est exactement ce que nous faisons en programmation. Ne vous moquez de vos contrats intelligents que si vous le souhaitez, mais simulez-les (mock) chaque fois que vous le pouvez. Cela vous facilitera la vie.

## Tester unitairement des contrats avec des mocks {#unit-testing-contracts-with-mocks}

Simuler un contrat signifie essentiellement créer une deuxième version de ce contrat qui se comporte de manière très similaire à l'original, mais d'une manière qui peut être facilement contrôlée par le développeur. Vous vous retrouvez souvent avec des contrats complexes où vous souhaitez uniquement [tester unitairement de petites parties du contrat](/developers/docs/smart-contracts/testing/). Le problème est : que se passe-t-il si le test de cette petite partie nécessite un état de contrat très spécifique qui est difficile à atteindre ?

Vous pourriez écrire une logique de configuration de test complexe à chaque fois pour amener le contrat dans l'état requis, ou bien vous écrivez un mock. Simuler un contrat est facile avec l'héritage. Créez simplement un deuxième contrat simulé qui hérite de l'original. Vous pouvez maintenant remplacer (override) des fonctions dans votre mock. Voyons cela avec un exemple.

## Exemple : ERC-20 privé {#example-private-erc20}

Nous utilisons un exemple de contrat ERC-20 qui a une période privée initiale. Le propriétaire peut gérer des utilisateurs privés et seuls ces derniers seront autorisés à recevoir des jetons au début. Une fois un certain temps écoulé, tout le monde sera autorisé à utiliser les jetons. Si vous êtes curieux, nous utilisons le hook [`_beforeTokenTransfer`](https://docs.openzeppelin.com/contracts/5.x/extending-contracts#using-hooks) des nouveaux contrats OpenZeppelin v3.

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

Et maintenant, simulons-le.

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

Puisque nous utilisons la nouvelle version 0.6 de Solidity, nous devons ajouter le mot-clé `virtual` pour les fonctions qui peuvent être remplacées et override pour la fonction de remplacement. Ajoutons-les donc aux deux fonctions `isPublic`.

Maintenant, dans vos tests unitaires, vous pouvez utiliser `PrivateERC20Mock` à la place. Lorsque vous souhaitez tester le comportement pendant la période d'utilisation privée, utilisez `setIsPublic(false)` et de même `setIsPublic(true)` pour tester la période d'utilisation publique. Bien sûr, dans notre exemple, nous pourrions simplement utiliser des [assistants de temps (time helpers)](https://docs.openzeppelin.com/test-helpers/0.5/api#increase) pour modifier les temps en conséquence. Mais l'idée de la simulation (mocking) devrait être claire maintenant et vous pouvez imaginer des scénarios où ce n'est pas aussi facile que de simplement avancer le temps.

## Simuler de nombreux contrats {#mocking-many-contracts}

Cela peut devenir fastidieux si vous devez créer un autre contrat pour chaque mock. Si cela vous dérange, vous pouvez jeter un œil à la bibliothèque [MockContract](https://github.com/gnosis/mock-contract). Elle vous permet de remplacer et de modifier les comportements des contrats à la volée. Cependant, elle ne fonctionne que pour simuler des appels à un autre contrat, elle ne fonctionnerait donc pas pour notre exemple.

## La simulation peut être encore plus puissante {#mocking-can-be-even-more-powerful}

Les pouvoirs de la simulation ne s'arrêtent pas là.

- Ajout de fonctions : Il n'est pas seulement utile de remplacer une fonction spécifique, mais aussi d'ajouter simplement des fonctions supplémentaires. Un bon exemple pour les jetons est d'avoir simplement une fonction `mint` supplémentaire pour permettre à n'importe quel utilisateur d'obtenir de nouveaux jetons gratuitement.
- Utilisation sur les réseaux de test : Lorsque vous déployez et testez vos contrats sur des réseaux de test avec votre application décentralisée (dapp), envisagez d'utiliser une version simulée. Évitez de remplacer des fonctions à moins d'y être vraiment obligé. Vous voulez tester la vraie logique après tout. Mais ajouter par exemple une fonction de réinitialisation peut être utile pour simplement réinitialiser l'état du contrat au début, sans nécessiter de nouveau déploiement. Évidemment, vous ne voudriez pas avoir cela dans un contrat sur le Réseau principal.