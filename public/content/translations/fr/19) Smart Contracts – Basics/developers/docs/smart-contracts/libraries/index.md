---
title: Bibliothèques de contrats intelligents
description:
lang: fr
---

Vous n'avez pas besoin de rédiger tous les contrats intelligents de votre projet à partir de zéro. Il existe de nombreuses bibliothèques de contrats intelligents open source fournissant des blocs de construction réutilisables, qui peuvent vous éviter d'avoir à réinventer la roue.

## Prérequis {#prerequisites}

Avant de vous intéresser aux bibliothèques de contrats intelligents, nous vous conseillons d'avoir bien compris en quoi consiste la structure d'un contrat intelligent. Lisez la page [Anatomie des contrats intelligents](/developers/docs/smart-contracts/anatomy/) si vous ne l'avez pas déjà fait.

## En quoi consiste une bibliothèque ? {#whats-in-a-library}

Vous pouvez généralement trouver deux types de blocs de construction dans les bibliothèques de contrats intelligents : des comportements réutilisables que vous pouvez ajouter à vos contrats, et des implémentations de diverses normes.

### Comportements {#behaviors}

Lorsque vous rédigez des contrats intelligents, il y a de grandes chances que vous vous retrouviez à réécrire indéfiniment des modèles similaires, comme assigner une adresse _admin_ pour effectuer des opérations protégées, ou ajouter un bouton d'urgence _pause_ pour répondre aux problèmes inattendus.

Les bibliothèques de contrats intelligents fournissent généralement des implémentations réutilisables de ces comportements sous forme de [bibliothèques](https://solidity.readthedocs.io/en/v0.7.2/contracts.html#libraries) ou via l'[héritage](https://solidity.readthedocs.io/en/v0.7.2/contracts.html#inheritance) dans Solidity.

À titre d'exemple, vous trouverez ci-dessous une version simplifiée du contrat [`Ownable`](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v3.2.0/contracts/access/Ownable.sol) de la [bibliothèque de contrats OpenZeppelin](https://github.com/OpenZeppelin/openzeppelin-contracts), qui conçoit une adresse en tant que propriétaire d'un contrat, et fournit un modificateur pour restreindre l'accès à une méthode uniquement à ce propriétaire.

```solidity
contract Ownable {
    address public owner;

    constructor() internal {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(owner == msg.sender, "Ownable: caller is not the owner");
        _;
    }
}
```

Pour utiliser un bloc de construction comme celui-ci dans votre contrat, vous devrez d'abord l'importer, puis l'étendre dans vos propres contrats. Cela vous permettra d'utiliser le modificateur fourni par le contrat `Ownable` de base pour sécuriser vos propres fonctions.

```solidity
import ".../Ownable.sol"; // Path to the imported library

contract MyContract is Ownable {
    // The following function can only be called by the owner
    function secured() onlyOwner public {
        msg.sender.transfer(1 ether);
    }
}
```

Autres exemples populaires : [SafeMath](https://docs.openzeppelin.com/contracts/3.x/utilities#math) ou [DsMath](https://dappsys.readthedocs.io/en/latest/ds_math.html). Ce sont des bibliothèques (par opposition aux contrats de base) qui fournissent des fonctions arithmétiques avec des vérifications de dépassement qui ne sont pas fournies par le langage. Une bonne pratique consiste à utiliser l'une de ces bibliothèques au lieu d'opérations arithmétiques natives pour protéger votre contrat contre les dépassements, qui peuvent avoir des conséquences désastreuses !

### Normes {#standards}

Pour faciliter la [composabilité et l'interopérabilité](/developers/docs/smart-contracts/composability/), la communauté Ethereum a défini plusieurs normes sous la forme de demandes de commentaires (**ERC**). Pour plus d'informations, lisez la page [Normes de développement Ethereum](/developers/docs/standards/).

Quand vous incluez une ERC dans vos contrats, il est préférable de chercher des implémentations standards plutôt que d'essayer de déployer la vôtre. De nombreuses bibliothèques de contrats intelligents incluent des implémentations pour les ERC les plus populaires. Par exemple, la [norme de jeton fongible ERC20](/developers/tutorials/understand-the-erc-20-token-smart-contract/) est disponible dans [HQ20](https://github.com/HQ20/contracts/blob/master/contracts/token/README.md), [DappSys](https://github.com/dapphub/ds-token/) et [OpenZeppelin](https://docs.openzeppelin.com/contracts/3.x/erc20). De plus, certaines ERC intègrent elles-mêmes également des implémentations canoniques.

Il convient de mentionner que certaines ERC ne sont pas autonomes, mais sont des ajouts à d'autres ERC. Par exemple, [ERC2612](https://eips.ethereum.org/EIPS/eip-2612) ajoute une extension à ERC20 pour améliorer son opérabilité.

## Comment ajouter une bibliothèque ? {#how-to}

Pour obtenir des instructions spécifiques, consultez toujours la documentation de la bibliothèque que vous voulez inclure à votre projet. Plusieurs bibliothèques de contrats Solidity sont compilées en utilisant `npm`, il vous suffit donc d'utiliser `nmp install`. La plupart des outils utilisés pour la [compilation](/developers/docs/smart-contracts/compiling/) de contrats examineront vos `node_modules` pour les bibliothèques de contrats intelligents, vous pouvez donc faire ce qui suit :

```solidity
// This will load the @openzeppelin/contracts library from your node_modules
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract MyNFT is ERC721 {
    constructor() ERC721("MyNFT", "MNFT") public { }
}
```

Quelle que soit la méthode que vous utilisez, lorsque vous incluez une bibliothèque, gardez toujours un œil sur la version du [langage](/developers/docs/smart-contracts/languages/). Par exemple, vous ne pouvez pas utiliser une bibliothèque pour Solidity 0.6 si vous rédigez vos contrats en Solidity 0.5.

## Quand les utiliser ? {#when-to-use}

L'utilisation d'une bibliothèque de contrats intelligents pour votre projet présente plusieurs avantages. D'abord, elle vous fait gagner du temps en vous fournissant des blocs de construction prêts à l'emploi que vous pouvez inclure dans votre système, plutôt que d'avoir à les coder vous-même.

La sécurité est également un atout majeur. Les bibliothèques de contrats intelligents open source sont aussi souvent soumises à un examen approfondi. De nombreux projets dépendant d'elles, la communauté est fortement incitée à les réviser en permanence. Il est beaucoup plus courant de trouver des erreurs dans du code d'application que dans les bibliothèques de contrats réutilisables. Certaines bibliothèques sont également soumises à des [audits externes](https://github.com/OpenZeppelin/openzeppelin-contracts/tree/master/audits) pour plus de sécurité.

Cependant, l'utilisation de bibliothèques de contrats intelligents comporte le risque d'inclure du code que vous ne connaissez pas dans votre projet. Il est tentant d'importer un contrat et de l'inclure directement, mais sans une bonne compréhension de ce que fait ce contrat, vous risquez d'introduire par mégarde un problème dans votre système en raison d'un comportement inattendu. Assurez-vous toujours de lire la documentation du code que vous importez, puis vérifiez le code lui-même avant de l'intégrer à votre projet !

Enfin, au moment où vous décidez s'inclure une bibliothèque, considérez son utilisation globale. Un projet adopté à grande échelle a l'avantage de disposer d'une communauté plus vaste, donc de plus d'utilisateurs qui cherchent les problèmes potentiels. La sécurité doit être votre priorité principale lorsque vous construisez avec des contrats intelligents!

## Outils connexes {#related-tools}

**Contrats OpenZeppelin -** **_Bibliothèque la plus populaire pour développer des contrats intelligents de façon sécurisée_**

- [Documentation](https://docs.openzeppelin.com/contracts/)
- [GitHub](https://github.com/OpenZeppelin/openzeppelin-contracts)
- [Forum communautaire](https://forum.openzeppelin.com/c/general/16)

**DappSys -** **_Blocs de construction sûrs, simples et flexibles pour les contrats intelligents_**

- [Documentation](https://dappsys.readthedocs.io/)
- [GitHub](https://github.com/dapphub/dappsys)

**HQ20 -** **_Projet Solidity avec des contrats, des bibliothèques et des exemples pour vous aider à construire des applications distribuées complètes pour le monde réel_**

- [GitHub](https://github.com/HQ20/contracts)

**SDK Solidity thirdweb -** **_Fournit les outils nécessaires pour construire efficacement des contrats intelligents personnalisés_**

- [Documentation](https://portal.thirdweb.com/solidity/)
- [GitHub](https://github.com/thirdweb-dev/contracts)

## Tutoriels connexes {#related-tutorials}

- [Considérations de sécurité pour les développeurs Ethereum](/developers/docs/smart-contracts/security/) _- Tutoriel sur les considérations de sécurité lors de la construction de contrats intelligents, y compris l'utilisation de la bibliothèque_
- [Comprendre le contrat intelligent de jeton ERC-20](/developers/tutorials/understand-the-erc-20-token-smart-contract/) _- Tutoriel sur la norme ERC20, fournie par de multiples bibliothèques_

## Complément d'information {#further-reading}

_Une ressource communautaire vous a aidé ? Modifiez cette page et ajoutez-la !_
