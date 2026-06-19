---
title: "Bibliothèques de contrats intelligents"
description: "Découvrez des bibliothèques de contrats intelligents et des blocs de construction réutilisables pour accélérer vos projets de développement Ethereum."
lang: fr
---

Vous n'avez pas besoin d'écrire chaque contrat intelligent de votre projet à partir de zéro. Il existe de nombreuses bibliothèques de contrats intelligents open source disponibles qui fournissent des blocs de construction réutilisables pour votre projet, ce qui peut vous éviter d'avoir à réinventer la roue.

## Prérequis {#prerequisites}

Avant de vous plonger dans les bibliothèques de contrats intelligents, il est judicieux de bien comprendre la structure d'un contrat intelligent. Consultez l'[anatomie d'un contrat intelligent](/developers/docs/smart-contracts/anatomy/) si vous ne l'avez pas encore fait.

## Que contient une bibliothèque {#whats-in-a-library}

Vous pouvez généralement trouver deux types de blocs de construction dans les bibliothèques de contrats intelligents : des comportements réutilisables que vous pouvez ajouter à vos contrats, et des implémentations de diverses normes.

### Comportements {#behaviors}

Lors de l'écriture de contrats intelligents, il y a de fortes chances que vous vous retrouviez à écrire des modèles similaires encore et encore, comme l'attribution d'une adresse _admin_ pour effectuer des opérations protégées dans un contrat, ou l'ajout d'un bouton de _pause_ d'urgence en cas de problème inattendu.

Les bibliothèques de contrats intelligents fournissent généralement des implémentations réutilisables de ces comportements sous forme de [bibliothèques](https://solidity.readthedocs.io/en/v0.7.2/contracts.html#libraries) ou via l'[héritage](https://solidity.readthedocs.io/en/v0.7.2/contracts.html#inheritance) dans Solidity.

À titre d'exemple, voici une version simplifiée du [contrat `Ownable`](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v3.2.0/contracts/access/Ownable.sol) de la [bibliothèque OpenZeppelin Contracts](https://github.com/OpenZeppelin/openzeppelin-contracts), qui désigne une adresse comme propriétaire d'un contrat, et fournit un modificateur pour restreindre l'accès à une méthode uniquement à ce propriétaire.

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

Pour utiliser un bloc de construction comme celui-ci dans votre contrat, vous devez d'abord l'importer, puis l'étendre dans vos propres contrats. Cela vous permettra d'utiliser le modificateur fourni par le contrat de base `Ownable` pour sécuriser vos propres fonctions.

```solidity
import ".../Ownable.sol"; // Chemin vers la bibliothèque importée

contract MyContract is Ownable {
    // La fonction suivante ne peut être appelée que par le propriétaire
    function secured() onlyOwner public {
        msg.sender.transfer(1 ether);
    }
}
```

Un autre exemple populaire est [SafeMath](https://docs.openzeppelin.com/contracts/3.x/utilities#math) ou [DsMath](https://dappsys.readthedocs.io/en/latest/ds_math.html). Ce sont des bibliothèques (par opposition aux contrats de base) qui fournissent des fonctions arithmétiques avec des vérifications de dépassement de capacité, qui ne sont pas fournies par le langage. C'est une bonne pratique d'utiliser l'une de ces bibliothèques au lieu des opérations arithmétiques natives pour protéger votre contrat contre les dépassements de capacité, qui peuvent avoir des conséquences désastreuses !

### Normes {#standards}

Pour faciliter la [composabilité et l'interopérabilité](/developers/docs/smart-contracts/composability/), la communauté Ethereum a défini plusieurs normes sous la forme d'**ERC**. Vous pouvez en apprendre davantage à leur sujet dans la section [normes](/developers/docs/standards/).

Lors de l'inclusion d'un ERC dans vos contrats, il est judicieux de rechercher des implémentations standard plutôt que d'essayer de créer la vôtre. De nombreuses bibliothèques de contrats intelligents incluent des implémentations pour les ERC les plus populaires. Par exemple, l'omniprésente [norme de jeton fongible ERC-20](/developers/tutorials/understand-the-erc-20-token-smart-contract/) peut être trouvée dans [HQ20](https://github.com/HQ20/contracts/blob/master/contracts/token/README.md), [DappSys](https://github.com/dapphub/ds-token/) et [OpenZeppelin](https://docs.openzeppelin.com/contracts/3.x/erc20). De plus, certains ERC fournissent également des implémentations canoniques dans le cadre de l'ERC lui-même.

Il convient de mentionner que certains ERC ne sont pas autonomes, mais sont des ajouts à d'autres ERC. Par exemple, l'[ERC-2612](https://eips.ethereum.org/EIPS/eip-2612) ajoute une extension à l'ERC-20 pour améliorer sa convivialité.

## Comment ajouter une bibliothèque {#how-to}

Référez-vous toujours à la documentation de la bibliothèque que vous incluez pour obtenir des instructions spécifiques sur la façon de l'inclure dans votre projet. Plusieurs bibliothèques de contrats Solidity sont empaquetées à l'aide de `npm`, vous pouvez donc simplement les installer avec `npm install`. La plupart des outils de [compilation](/developers/docs/smart-contracts/compiling/) de contrats chercheront dans votre `node_modules` les bibliothèques de contrats intelligents, vous pouvez donc faire ce qui suit :

```solidity
// Cela chargera la bibliothèque @openzeppelin/contracts depuis vos node_modules
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract MyNFT is ERC721 {
    constructor() ERC721("MyNFT", "MNFT") public { }
}
```

Quelle que soit la méthode que vous utilisez, lors de l'inclusion d'une bibliothèque, gardez toujours un œil sur la version du [langage](/developers/docs/smart-contracts/languages/). Par exemple, vous ne pouvez pas utiliser une bibliothèque pour Solidity 0.6 si vous écrivez vos contrats en Solidity 0.5.

## Quand les utiliser {#when-to-use}

L'utilisation d'une bibliothèque de contrats intelligents pour votre projet présente plusieurs avantages. Avant tout, cela vous fait gagner du temps en vous fournissant des blocs de construction prêts à l'emploi que vous pouvez inclure dans votre système, plutôt que d'avoir à les coder vous-même.

La sécurité est également un atout majeur. Les bibliothèques de contrats intelligents open source sont souvent examinées de près. Étant donné que de nombreux projets en dépendent, la communauté est fortement incitée à les soumettre à un examen constant. Il est beaucoup plus courant de trouver des erreurs dans le code d'une application que dans des bibliothèques de contrats réutilisables. Certaines bibliothèques font également l'objet d'[audits externes](https://github.com/OpenZeppelin/openzeppelin-contracts/tree/master/audits) pour une sécurité accrue.

Cependant, l'utilisation de bibliothèques de contrats intelligents comporte le risque d'inclure dans votre projet du code avec lequel vous n'êtes pas familier. Il est tentant d'importer un contrat et de l'inclure directement dans votre projet, mais sans une bonne compréhension de ce que fait ce contrat, vous pourriez introduire par inadvertance un problème dans votre système en raison d'un comportement inattendu. Assurez-vous toujours de lire la documentation du code que vous importez, puis d'examiner le code lui-même avant de l'intégrer à votre projet !

Enfin, lorsque vous décidez d'inclure ou non une bibliothèque, tenez compte de son utilisation globale. Une bibliothèque largement adoptée présente l'avantage d'avoir une communauté plus importante et plus de personnes qui l'examinent pour y déceler des problèmes. La sécurité doit être votre priorité absolue lors de la création avec des contrats intelligents !

## Outils connexes {#related-tools}

**OpenZeppelin Contracts -** **_La bibliothèque la plus populaire pour le développement sécurisé de contrats intelligents._**

- [Documentation](https://docs.openzeppelin.com/contracts/)
- [GitHub](https://github.com/OpenZeppelin/openzeppelin-contracts)
- [Forum de la communauté](https://forum.openzeppelin.com/c/general/16)

**DappSys -** **_Des blocs de construction sûrs, simples et flexibles pour les contrats intelligents._**

- [Documentation](https://dappsys.readthedocs.io/)
- [GitHub](https://github.com/dapphub/dappsys)

**HQ20 -** **_Un projet Solidity avec des contrats, des bibliothèques et des exemples pour vous aider à créer des applications distribuées complètes pour le monde réel._**

- [GitHub](https://github.com/HQ20/contracts)

**SDK Solidity thirdweb -** **_Fournit les outils nécessaires pour créer efficacement des contrats intelligents personnalisés_**

- [Documentation](https://portal.thirdweb.com/contracts/build/overview)
- [GitHub](https://github.com/thirdweb-dev/contracts)

## Tutoriels connexes {#related-tutorials}

- [Considérations de sécurité pour les développeurs Ethereum](/developers/docs/smart-contracts/security/) _– Un tutoriel sur les considérations de sécurité lors de la création de contrats intelligents, y compris l'utilisation de bibliothèques._
- [Comprendre le contrat intelligent de jeton ERC-20](/developers/tutorials/understand-the-erc-20-token-smart-contract/) _- Tutoriel sur la norme ERC-20, fournie par de multiples bibliothèques._

## Lectures complémentaires {#further-reading}

_Vous connaissez une ressource communautaire qui vous a aidé ? Modifiez cette page et ajoutez-la !_