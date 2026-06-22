---
title: Langages de contrats intelligents
description: "Un aperçu et une comparaison des deux principaux langages de contrats intelligents – Solidity et Vyper."
lang: fr
---

Un aspect formidable d'[Ethereum](/) est que les contrats intelligents peuvent être programmés en utilisant des langages relativement conviviaux pour les développeurs. Si vous avez de l'expérience avec Python ou tout autre [langage à accolades](https://wikipedia.org/wiki/List_of_programming_languages_by_type#Curly-bracket_languages), vous pouvez trouver un langage avec une syntaxe familière.

Les deux langages les plus actifs et maintenus sont :

- Solidity
- Vyper

L'IDE Remix fournit un environnement de développement complet pour créer et tester des contrats en Solidity et Vyper. [Essayez l'IDE Remix dans le navigateur](https://remix.ethereum.org) pour commencer à coder.

Les développeurs plus expérimentés pourraient également vouloir utiliser Yul, un langage intermédiaire pour la [Machine Virtuelle Ethereum](/developers/docs/evm/), ou Yul+, une extension de Yul.

Si vous êtes curieux et aimez aider à tester de nouveaux langages qui sont encore en plein développement, vous pouvez expérimenter avec Fe, un langage de contrats intelligents émergent qui en est encore à ses balbutiements.

## Prérequis {#prerequisites}

Une connaissance préalable des langages de programmation, en particulier de JavaScript ou Python, peut vous aider à comprendre les différences entre les langages de contrats intelligents. Nous vous recommandons également de comprendre les contrats intelligents en tant que concept avant de vous plonger trop profondément dans les comparaisons de langages. [Introduction aux contrats intelligents](/developers/docs/smart-contracts/).

## Solidity {#solidity}

- Langage de haut niveau orienté objet pour l'implémentation de contrats intelligents.
- Langage à accolades qui a été le plus profondément influencé par C++.
- Typage statique (le type d'une variable est connu au moment de la compilation).
- Prend en charge :
  - L'héritage (vous pouvez étendre d'autres contrats).
  - Les bibliothèques (vous pouvez créer du code réutilisable que vous pouvez appeler depuis différents contrats – comme des fonctions statiques dans une classe statique dans d'autres langages de programmation orientés objet).
  - Les types complexes définis par l'utilisateur.

### Liens importants {#important-links}

- [Documentation](https://docs.soliditylang.org/en/latest/)
- [Portail du langage Solidity](https://soliditylang.org/)
- [Solidity par l'exemple](https://docs.soliditylang.org/en/latest/solidity-by-example.html)
- [GitHub](https://github.com/ethereum/solidity/)
- [Salon de discussion Gitter de Solidity](https://gitter.im/ethereum/solidity) relié au [salon de discussion Matrix de Solidity](https://matrix.to/#/#ethereum_solidity:gitter.im)
- [Aide-mémoire](https://reference.auditless.com/cheatsheet)
- [Blog Solidity](https://blog.soliditylang.org/)
- [Twitter de Solidity](https://twitter.com/solidity_lang)

### Exemple de contrat {#example-contract}

```solidity
// SPDX-License-Identifier: GPL-3.0
pragma solidity >= 0.7.0;

contract Coin {
    // Le mot-clé "public" rend les variables
    // accessibles depuis d'autres contrats
    address public minter;
    mapping (address => uint) public balances;

    // Les événements permettent aux clients de réagir à des
    // changements de contrat spécifiques que vous déclarez
    event Sent(address from, address to, uint amount);

    // Le code du constructeur n'est exécuté que lorsque le contrat
    // est créé
    constructor() {
        minter = msg.sender;
    }

    // Envoie une quantité de pièces nouvellement créées à une adresse
    // Ne peut être appelé que par le créateur du contrat
    function mint(address receiver, uint amount) public {
        require(msg.sender == minter);
        require(amount < 1e60);
        balances[receiver] += amount;
    }

    // Envoie une quantité de pièces existantes
    // de n'importe quel appelant vers une adresse
    function send(address receiver, uint amount) public {
        require(amount <= balances[msg.sender], "Insufficient balance.");
        balances[msg.sender] -= amount;
        balances[receiver] += amount;
        emit Sent(msg.sender, receiver, amount);
    }
}
```

Cet exemple devrait vous donner une idée de ce à quoi ressemble la syntaxe d'un contrat Solidity. Pour une description plus détaillée des fonctions et des variables, [consultez la documentation](https://docs.soliditylang.org/en/latest/contracts.html).

## Vyper {#vyper}

- Langage de programmation pythonique
- Typage fort
- Code du compilateur petit et compréhensible
- Génération efficace de bytecode
- Possède délibérément moins de fonctionnalités que Solidity dans le but de rendre les contrats plus sécurisés et plus faciles à auditer. Vyper ne prend pas en charge :
  - Les modificateurs
  - L'héritage
  - L'assembleur en ligne
  - La surcharge de fonctions
  - La surcharge d'opérateurs
  - Les appels récursifs
  - Les boucles de longueur infinie
  - Les points fixes binaires

Pour plus d'informations, [lisez la justification de Vyper](https://vyper.readthedocs.io/en/latest/index.html).

### Liens importants {#important-links-1}

- [Documentation](https://vyper.readthedocs.io)
- [Vyper par l'exemple](https://vyper.readthedocs.io/en/latest/vyper-by-example.html)
- [Plus de Vyper par l'exemple](https://vyper-by-example.org/)
- [GitHub](https://github.com/vyperlang/vyper)
- [Discussion Discord de la communauté Vyper](https://discord.gg/SdvKC79cJk)
- [Aide-mémoire](https://reference.auditless.com/cheatsheet)
- [Frameworks et outils de développement de contrats intelligents pour Vyper](/developers/docs/programming-languages/python/)
- [VyperPunk - apprenez à sécuriser et à pirater des contrats intelligents Vyper](https://github.com/SupremacyTeam/VyperPunk)
- [Vyper Hub pour le développement](https://github.com/zcor/vyper-dev)
- [Exemples de contrats intelligents des plus grands succès de Vyper](https://github.com/pynchmeister/vyper-greatest-hits/tree/main/contracts)
- [Ressources sélectionnées Awesome Vyper](https://github.com/spadebuilders/awesome-vyper)

### Exemple {#example}

```python
# Enchère ouverte

# Paramètres de l'enchère
# Le bénéficiaire reçoit l'argent du meilleur enchérisseur
beneficiary: public(address)
auctionStart: public(uint256)
auctionEnd: public(uint256)

# État actuel de l'enchère
highestBidder: public(address)
highestBid: public(uint256)

# Défini sur true à la fin, interdit tout changement
ended: public(bool)

# Garde une trace des offres remboursées afin de pouvoir suivre le modèle de retrait
pendingReturns: public(HashMap[address, uint256])

# Crée une enchère simple avec `_bidding_time`
# secondes de temps d'enchère pour le compte de l'
# adresse bénéficiaire `_beneficiary`.
@external
def __init__(_beneficiary: address, _bidding_time: uint256):
    self.beneficiary = _beneficiary
    self.auctionStart = block.timestamp
    self.auctionEnd = self.auctionStart + _bidding_time

# Faire une offre sur l'enchère avec la valeur envoyée
# avec cette transaction.
# La valeur ne sera remboursée que si l'
# enchère n'est pas remportée.
@external
@payable
def bid():
    # Vérifie si la période d'enchère est terminée.
    assert block.timestamp < self.auctionEnd
    # Vérifie si l'offre est suffisamment élevée
    assert msg.value > self.highestBid
    # Suit le remboursement pour le précédent meilleur enchérisseur
    self.pendingReturns[self.highestBidder] += self.highestBid
    # Suit la nouvelle meilleure offre
    self.highestBidder = msg.sender
    self.highestBid = msg.value

# Retirer une offre précédemment remboursée. Le modèle de retrait est
# utilisé ici pour éviter un problème de sécurité. Si les remboursements étaient directement
# envoyés dans le cadre de bid(), un contrat d'enchère malveillant pourrait bloquer
# ces remboursements et ainsi empêcher l'arrivée de nouvelles offres plus élevées.
@external
def withdraw():
    pending_amount: uint256 = self.pendingReturns[msg.sender]
    self.pendingReturns[msg.sender] = 0
    send(msg.sender, pending_amount)

# Terminer l'enchère et envoyer la meilleure offre
# au bénéficiaire.
@external
def endAuction():
    # C'est une bonne pratique de structurer les fonctions qui interagissent
    # avec d'autres contrats (c.-à-d. qu'elles appellent des fonctions ou envoient de l'ether)
    # en trois phases :
    # 1. vérification des conditions
    # 2. exécution des actions (modifiant potentiellement les conditions)
    # 3. interaction avec d'autres contrats
    # Si ces phases sont mélangées, l'autre contrat pourrait rappeler
    # le contrat actuel et modifier l'état ou faire en sorte que
    # des effets (paiement en ether) soient exécutés plusieurs fois.
    # Si les fonctions appelées en interne incluent une interaction avec des
    # contrats externes, elles doivent également être considérées comme une interaction avec
    # des contrats externes.

    # 1. Conditions
    # Vérifie si l'heure de fin de l'enchère a été atteinte
    assert block.timestamp >= self.auctionEnd
    # Vérifie si cette fonction a déjà été appelée
    assert not self.ended

    # 2. Effets
    self.ended = True

    # 3. Interaction
    send(self.beneficiary, self.highestBid)
```

Cet exemple devrait vous donner une idée de ce à quoi ressemble la syntaxe d'un contrat Vyper. Pour une description plus détaillée des fonctions et des variables, [consultez la documentation](https://vyper.readthedocs.io/en/latest/vyper-by-example.html#simple-open-auction).

## Yul et Yul+ {#yul}

Si vous êtes nouveau sur Ethereum et que vous n'avez pas encore codé avec des langages de contrats intelligents, nous vous recommandons de commencer par Solidity ou Vyper. Ne vous penchez sur Yul ou Yul+ qu'une fois que vous serez familiarisé avec les meilleures pratiques de sécurité des contrats intelligents et les spécificités du travail avec l'EVM.

**Yul**

- Langage intermédiaire pour Ethereum.
- Prend en charge l'[EVM](/developers/docs/evm) et l'[Ewasm](https://github.com/ewasm), une version de WebAssembly adaptée à Ethereum, et est conçu pour être un dénominateur commun utilisable pour les deux plateformes.
- Bonne cible pour les étapes d'optimisation de haut niveau qui peuvent bénéficier de manière égale aux plateformes EVM et Ewasm.

**Yul+**

- Une extension de bas niveau et très efficace pour Yul.
- Initialement conçu pour un contrat de [rollup optimiste](/developers/docs/scaling/optimistic-rollups/).
- Yul+ peut être considéré comme une proposition de mise à niveau expérimentale pour Yul, lui ajoutant de nouvelles fonctionnalités.

### Liens importants {#important-links-2}

- [Documentation de Yul](https://docs.soliditylang.org/en/latest/yul.html)
- [Documentation de Yul+](https://github.com/fuellabs/yulp)
- [Article d'introduction à Yul+](https://medium.com/@fuellabs/introducing-yul-a-new-low-level-language-for-ethereum-aa64ce89512f)

### Exemple de contrat {#example-contract-2}

L'exemple simple suivant implémente une fonction de puissance. Il peut être compilé en utilisant `solc --strict-assembly --bin input.yul`. L'exemple doit être stocké dans le fichier input.yul.

```
{
    function power(base, exponent) -> result
    {
        switch exponent
        case 0 { result := 1 }
        case 1 { result := base }
        default
        {
            result := power(mul(base, base), div(exponent, 2))
            if mod(exponent, 2) { result := mul(base, result) }
        }
    }
    let res := power(calldataload(0), calldataload(32))
    mstore(0, res)
    return(0, 32)
}
```

Si vous êtes déjà très expérimenté avec les contrats intelligents, une implémentation complète d'ERC-20 en Yul peut être trouvée [ici](https://solidity.readthedocs.io/en/latest/yul.html#complete-erc20-example).

## Fe {#fe}

- Langage à typage statique pour la Machine Virtuelle Ethereum (EVM).
- Inspiré par Python et Rust.
- Vise à être facile à apprendre -- même pour les développeurs qui découvrent l'écosystème Ethereum.
- Le développement de Fe en est encore à ses débuts, le langage a eu sa version alpha en janvier 2021.

### Liens importants {#important-links-3}

- [GitHub](https://github.com/ethereum/fe)
- [Annonce de Fe](https://blog.fe-lang.org/posts/fe-a-new-language-for-the-ethereum-ecosystem/)
- [Fe : Feuille de route 2021](https://notes.ethereum.org/LVhaTF30SJOpkbG1iVw1jg)
- [Discussion Discord de Fe](https://discord.com/invite/ywpkAXFjZH)
- [Twitter de Fe](https://twitter.com/official_fe)

### Exemple de contrat {#example-contract-3}

Ce qui suit est un contrat simple implémenté en Fe.

```
type BookMsg = bytes[100]

contract GuestBook:
    pub guest_book: map<address, BookMsg>

    event Signed:
        book_msg: BookMsg

    pub def sign(book_msg: BookMsg):
        self.guest_book[msg.sender] = book_msg

        emit Signed(book_msg=book_msg)

    pub def get_msg(addr: address) -> BookMsg:
        return self.guest_book[addr].to_mem()
```

## Comment choisir {#how-to-choose}

Comme pour tout autre langage de programmation, il s'agit principalement de choisir le bon outil pour le bon travail, ainsi que de préférences personnelles.

Voici quelques éléments à prendre en compte si vous n'avez encore essayé aucun de ces langages :

### Quels sont les avantages de Solidity ? {#solidity-advantages}

- Si vous êtes débutant, il existe de nombreux tutoriels et outils d'apprentissage. Pour en savoir plus, consultez la section [Apprendre en codant](/developers/learning-tools/).
- De bons outils de développement sont disponibles.
- Solidity possède une grande communauté de développeurs, ce qui signifie que vous trouverez très probablement des réponses à vos questions assez rapidement.

### Quels sont les avantages de Vyper ? {#vyper-advatages}

- Un excellent moyen de commencer pour les développeurs Python qui souhaitent écrire des contrats intelligents.
- Vyper possède un nombre réduit de fonctionnalités, ce qui le rend idéal pour le prototypage rapide d'idées.
- Vyper vise à être facile à auditer et le plus lisible possible par l'homme.

### Quels sont les avantages de Yul et Yul+ ? {#yul-advantages}

- Langage de bas niveau simpliste et fonctionnel.
- Permet de se rapprocher beaucoup plus de l'EVM brute, ce qui peut aider à optimiser l'utilisation du gaz de vos contrats.

## Comparaisons de langages {#language-comparisons}

Pour des comparaisons de la syntaxe de base, du cycle de vie des contrats, des interfaces, des opérateurs, des structures de données, des fonctions, du flux de contrôle et plus encore, consultez cet [aide-mémoire par Auditless](https://reference.auditless.com/cheatsheet/)

## Lectures complémentaires {#further-reading}

- [Bibliothèque de contrats Solidity par OpenZeppelin](https://docs.openzeppelin.com/contracts/5.x/)
- [Solidity par l'exemple](https://solidity-by-example.org)