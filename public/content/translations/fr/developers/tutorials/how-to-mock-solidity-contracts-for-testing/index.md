---
title: Comment simuler (mock) des contrats intelligents Solidity pour les tests
description: Pourquoi vous devriez simuler vos contrats lors des tests
author: Markus Waas
lang: fr
tags: ["Solidity", "contrats intelligents", "tests", "mocking"]
skill: intermediate
breadcrumb: Simuler des contrats
published: 2020-05-02
source: soliditydeveloper.com
sourceUrl: https://soliditydeveloper.com/mocking-contracts
---

Les [objets simulés (mocks)](https://wikipedia.org/wiki/Mock_object) sont un modèle de conception courant en programmation orientée objet. Venant de l'ancien mot français « mocquer » qui signifie « se moquer de », il a évolué pour signifier « imiter quelque chose de réel », ce qui est exactement ce que nous faisons en programmation. Ne vous moquez de vos contrats intelligents que si vous le souhaitez, mais simulez-les (mock) chaque fois que vous le pouvez. Cela vous facilitera la vie.

## Tester unitairement des contrats avec des mocks {#unit-testing-contracts-with-mocks}

Simuler (mock) un contrat signifie essentiellement créer une deuxième version de ce contrat qui se comporte de manière très similaire à l'original, mais d'une manière qui peut être facilement contrôlée par le développeur. Vous vous retrouvez souvent avec des contrats complexes où vous souhaitez uniquement [tester unitairement de petites parties du contrat](/developers/docs/smart-contracts/testing/). Le problème est : que se passe-t-il si le test de cette petite partie nécessite un état de contrat très spécifique qui est difficile à atteindre ?

Vous pourriez écrire une logique de configuration de test complexe à chaque fois qui amène le contrat dans l'état requis, ou vous écrivez un mock. Simuler un contrat est facile avec l'héritage. Créez simplement un deuxième contrat simulé (mock) qui hérite de l'original. Vous pouvez maintenant remplacer (override) des fonctions dans votre mock. Voyons cela avec un exemple.

Les exemples ci-dessous utilisent [Foundry](https://www.getfoundry.sh/introduction/installation) et OpenZeppelin Contracts 5.x. Pour suivre, créez un projet et installez OpenZeppelin :

```sh
forge init private-erc20
cd private-erc20
forge install OpenZeppelin/openzeppelin-contracts
```

Foundry détecte automatiquement le remappage d'importation `@openzeppelin/contracts/` à partir de la bibliothèque installée.

## Exemple : ERC-20 privé {#example-private-erc20}

Nous utilisons un exemple de contrat ERC-20 qui a une période privée initiale. Le propriétaire peut gérer des utilisateurs privés et seuls ceux-ci seront autorisés à recevoir des jetons au début. Une fois qu'un certain temps s'est écoulé, tout le monde sera autorisé à utiliser les jetons. Si vous êtes curieux, nous remplaçons la fonction [`_update`](https://docs.openzeppelin.com/contracts/5.x/api/token/erc20#ERC20-_update-address-address-uint256-) d'OpenZeppelin Contracts 5.x, par laquelle passent toutes les opérations pour frapper, brûler et transférer.

Enregistrez ceci sous `src/PrivateERC20.sol` :

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

contract PrivateERC20 is ERC20, Ownable {
    mapping (address => bool) public isPrivateUser;
    uint256 private publicAfterTime;

    constructor(uint256 privateERC20timeInSec) ERC20("PrivateERC20", "PRIV") Ownable(msg.sender) {
        publicAfterTime = block.timestamp + privateERC20timeInSec;
    }

    function addUser(address user) external onlyOwner {
        isPrivateUser[user] = true;
    }

    function isPublic() public view returns (bool) {
        return block.timestamp >= publicAfterTime;
    }

    function _update(address from, address to, uint256 value) internal virtual override {
        require(_validRecipient(to), "PrivateERC20: invalid recipient");

        super._update(from, to, value);
    }

    function _validRecipient(address to) private view returns (bool) {
        if (isPublic()) {
            return true;
        }

        return isPrivateUser[to];
    }
}
```

Et maintenant, simulons-le. Enregistrez ceci sous `src/mocks/PrivateERC20Mock.sol` :

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {PrivateERC20} from "../PrivateERC20.sol";

contract PrivateERC20Mock is PrivateERC20 {
    bool isPublicConfig;

    constructor() PrivateERC20(0) {}

    function setIsPublic(bool isPublic_) external {
        isPublicConfig = isPublic_;
    }

    function isPublic() public view returns (bool) {
        return isPublicConfig;
    }

    function mint(address to, uint256 amount) external {
        _mint(to, amount);
    }
}
```

Lorsque vous exécutez `forge build`, vous obtiendrez les messages d'erreur suivants :

- `Error (9456): Overriding function is missing "override" specifier.`
- `Error (4334): Trying to override non-virtual function. Did you forget to add "virtual"?`

Depuis Solidity 0.6, vous devez ajouter le mot-clé `virtual` pour les fonctions qui peuvent être remplacées et `override` pour la fonction de remplacement. Ajoutons-les donc aux deux fonctions `isPublic` :

```solidity
// Dans PrivateERC20.sol
function isPublic() public view virtual returns (bool) {

// Dans PrivateERC20Mock.sol
function isPublic() public view override returns (bool) {
```

Maintenant, dans vos tests unitaires, vous pouvez utiliser `PrivateERC20Mock` à la place. Lorsque vous souhaitez tester le comportement pendant la période d'utilisation privée, utilisez `setIsPublic(false)` et de même `setIsPublic(true)` pour tester la période d'utilisation publique. Le mock possède également une fonction `mint`, de sorte que les tests peuvent créer des soldes sans aucune configuration supplémentaire. Enregistrez ceci sous `test/PrivateERC20.t.sol` et exécutez `forge test` :

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {Test} from "forge-std/Test.sol";
import {PrivateERC20} from "../src/PrivateERC20.sol";
import {PrivateERC20Mock} from "../src/mocks/PrivateERC20Mock.sol";

contract PrivateERC20Test is Test {
    PrivateERC20Mock token;
    address alice = makeAddr("alice");

    function setUp() public {
        token = new PrivateERC20Mock();
    }

    function test_PrivatePhaseRejectsUnknownRecipient() public {
        token.setIsPublic(false);

        vm.expectRevert("PrivateERC20: invalid recipient");
        token.mint(alice, 1 ether);
    }

    function test_PrivatePhaseAcceptsPrivateUser() public {
        token.setIsPublic(false);
        token.addUser(alice);

        token.mint(alice, 1 ether);
        assertEq(token.balanceOf(alice), 1 ether);
    }

    function test_PublicPhaseAcceptsAnyRecipient() public {
        token.setIsPublic(true);

        token.mint(alice, 1 ether);
        assertEq(token.balanceOf(alice), 1 ether);
    }

    function test_BecomesPublicAfterTime() public {
        PrivateERC20 realToken = new PrivateERC20(1 days);
        assertFalse(realToken.isPublic());

        vm.warp(block.timestamp + 1 days);
        assertTrue(realToken.isPublic());
    }
}
```

Bien sûr, dans notre exemple, nous pourrions simplement modifier le temps de bloc à la place, comme le fait le dernier test avec le cheatcode [`vm.warp`](https://www.getfoundry.sh/reference/cheatcodes/warp) de Foundry (dans Hardhat, utilisez les [aides de réseau `time`](https://hardhat.org/docs/plugins/hardhat-network-helpers#increase)). Mais l'idée de la simulation (mocking) devrait être claire maintenant et vous pouvez imaginer des scénarios où ce n'est pas aussi facile que de simplement avancer le temps.

## Simuler de nombreux contrats {#mocking-many-contracts}

Cela peut devenir fastidieux si vous devez créer un autre contrat pour chaque mock. Si cela vous dérange, les cheatcodes [`vm.mockCall`](https://www.getfoundry.sh/reference/cheatcodes/mock-call) et [`vm.mockCallRevert`](https://www.getfoundry.sh/reference/cheatcodes/mock-call-revert) de Foundry vous permettent de modifier ce qu'un contrat renvoie à la volée, même pour une adresse qui n'a aucun code :

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {Test} from "forge-std/Test.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract MockCallTest is Test {
    function test_MockedBalance() public {
        address someToken = makeAddr("someToken");
        address alice = makeAddr("alice");

        vm.mockCall(
            someToken,
            abi.encodeCall(IERC20.balanceOf, (alice)),
            abi.encode(100 ether)
        );

        assertEq(IERC20(someToken).balanceOf(alice), 100 ether);
    }
}
```

Cependant, cela ne fonctionne que pour simuler des appels vers un autre contrat. `PrivateERC20` appelle `isPublic()` en interne, ce qui ne passe jamais par un appel externe, cela ne fonctionnerait donc pas pour notre exemple.

## La simulation peut être encore plus puissante {#mocking-can-be-even-more-powerful}

Les pouvoirs de la simulation (mocking) ne s'arrêtent pas là.

- Ajout de fonctions : Il n'est pas seulement utile de remplacer une fonction spécifique, mais aussi d'ajouter simplement des fonctions supplémentaires. Un bon exemple pour les jetons est d'avoir simplement une fonction `mint` supplémentaire pour permettre à n'importe quel utilisateur d'obtenir de nouveaux jetons gratuitement, comme celle dans `PrivateERC20Mock` ci-dessus.
- Utilisation sur les réseaux de test : Lorsque vous déployez et testez vos contrats sur des réseaux de test avec votre dapp, envisagez d'utiliser une version simulée. Évitez de remplacer des fonctions à moins d'y être vraiment obligé. Après tout, vous voulez tester la vraie logique. Mais ajouter par exemple une fonction de réinitialisation peut être utile pour simplement réinitialiser l'état du contrat au début, sans nécessiter de nouveau déploiement. Évidemment, vous ne voudriez pas avoir cela dans un contrat sur le Réseau principal.
