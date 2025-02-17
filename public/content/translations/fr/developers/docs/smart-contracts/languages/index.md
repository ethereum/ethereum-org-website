---
title: Les langages des contrats intelligents
description: 'Présentation et comparaison des deux principaux langages de contrat intelligent : Solidity et Vyper'
lang: fr
---

Un aspect important d'Ethereum est que les contrats intelligents peuvent être programmés en utilisant des langages relativement conviviaux pour les développeurs. Si vous maitrisez Python ou n'importe quel [langage d'accolades](https://wikipedia.org/wiki/List_of_programming_languages_by_type#Curly-bracket_languages), vous pouvez trouver un langage avec une syntaxe qui vous sera familière.

Les deux langages les plus actifs et les plus suivis sont :

- Solidity
- Vyper

L'IDE Remix fournit un environnement de développement complet pour créer et tester des contrats dans Solidity et Vyper. [Essayez l'IDE Remix dans le navigateur](https://remix.ethereum.org) pour commencer à coder.

Des développeurs plus expérimentés peuvent choisir d'utiliser Yul, un langage intermédiaire pour la [machine virtuelle Ethereum (EVM)](/developers/docs/evm/), ou Yul+, une extension de Yul.

Si vous êtes curieux et que vous aimez aider à tester de nouveaux langages encore en cours de développement, vous pouvez essayer Fe, un nouveau langage pour contrat intelligent qui en est encore à ses balbutiements.

## Prérequis {#prerequisites}

La connaissance de langages de programmation comme JavaScript ou Python peut vous aider à comprendre les différences entre les langages de contrats intelligents. Nous vous conseillons également d'avoir compris le concept des contrats intelligents avant de vous plonger dans les comparaisons entre les différents langages. Lire la page [Introduction aux contrats intelligents](/developers/docs/smart-contracts/)

## Solidity {#solidity}

- Un langage orienté objet et de haut niveau pour la mise en œuvre de contrats intelligents.
- Un langage à accolades principalement influencé par C++.
- Typé statiquement (le type d'une variable est connu au moment de la compilation)
- Prend en charge les éléments suivants :
  - Héritage : Vous pouvez prolonger d'autres contrats.
  - Bibliothèques : Vous pouvez créer du code réutilisable que vous pouvez appeler à partir de différents contrats, comme les fonctions statiques d'une classe statique dans d'autres langages de programmation orientés objets.
  - Types complexes défini par l'utilisateur

### Liens importants {#important-links}

- [Documentation](https://docs.soliditylang.org/en/latest/)
- [Portail Solidity](https://soliditylang.org/)
- [Solidity by Example](https://docs.soliditylang.org/en/latest/solidity-by-example.html)
- [GitHub](https://github.com/ethereum/solidity/)
- [Salle de chat Gitter Solidity](https://gitter.im/ethereum/solidity) reliée à [Salle de chat Matrix Solidity](https://matrix.to/#/#ethereum_solidity:gitter.im)
- [Cheat Sheet](https://reference.auditless.com/cheatsheet)
- [Blog Solidity](https://blog.soliditylang.org/)
- [Twitter Solidity](https://twitter.com/solidity_lang)

### Exemple de contrat {#example-contract}

```solidity
// SPDX-License-Identifier: GPL-3.0
pragma solidity >= 0.7.0;

contract Coin {
    // The keyword "public" makes variables
    // accessible from other contracts
    address public minter;
    mapping (address => uint) public balances;

    // Events allow clients to react to specific
    // contract changes you declare
    event Sent(address from, address to, uint amount);

    // Constructor code is only run when the contract
    // is created
    constructor() {
        minter = msg.sender;
    }

    // Sends an amount of newly created coins to an address
    // Can only be called by the contract creator
    function mint(address receiver, uint amount) public {
        require(msg.sender == minter);
        require(amount < 1e60);
        balances[receiver] += amount;
    }

    // Sends an amount of existing coins
    // from any caller to an address
    function send(address receiver, uint amount) public {
        require(amount <= balances[msg.sender], "Insufficient balance.");
        balances[msg.sender] -= amount;
        balances[receiver] += amount;
        emit Sent(msg.sender, receiver, amount);
    }
}
```

Cet exemple devrait vous donner une idée de la syntaxe d'un contrat Solidity. Pour une description plus détaillée des fonctions et des variables, [consultez la documentation](https://docs.soliditylang.org/en/latest/contracts.html).

## Vyper {#vyper}

- Langage de programmation pythonique
- Typage fort
- Code de compilation concis et compréhensible
- Génération efficace du bytecode
- A intentionnellement moins de fonctionnalités que Solidity dans le but de rendre les contrats plus sécurisés et plus faciles à auditer. Vyper ne prend pas en charge les éléments suivants :
  - Modificateurs
  - Héritage
  - Assemblage en ligne
  - Surcharge des fonctions
  - Surcharge d’opérateur
  - Appels récurrents
  - Boucles infinies
  - Points fixes binaires

Pour plus d'informations, [lisez cette page Vyper](https://vyper.readthedocs.io/en/latest/index.html).

### Liens importants {#important-links-1}

- [Documentation](https://vyper.readthedocs.io)
- [Vyper par exemple](https://vyper.readthedocs.io/en/latest/vyper-by-example.html)
- [Plus de Vyper par exemple](https://vyper-by-example.org/)
- [GitHub](https://github.com/vyperlang/vyper)
- [Discussion Discord pour la Communauté Vyper](https://discord.gg/SdvKC79cJk)
- [Cheat Sheet](https://reference.auditless.com/cheatsheet)
- [Cadres et outils de développement des Contrats intelligents pour Vyper](/developers/docs/programming-languages/python/)
- [VyperPunk - apprendre à sécuriser et à pirater les contrats intelligents Vyper](https://github.com/SupremacyTeam/VyperPunk)
- [VyperExamples - exemples de vulnérabilités Vyper](https://www.vyperexamples.com/reentrancy)
- [Hub Vyper pour le développement](https://github.com/zcor/vyper-dev)
- [Exemples des meilleurs contrats intelligents pour Vyper](https://github.com/pynchmeister/vyper-greatest-hits/tree/main/contracts)
- [Des ressources géniales liées à Vyper](https://github.com/spadebuilders/awesome-vyper)

### Exemple {#example}

```python
# Open Auction

# Auction params
# Beneficiary receives money from the highest bidder
beneficiary: public(address)
auctionStart: public(uint256)
auctionEnd: public(uint256)

# Current state of auction
highestBidder: public(address)
highestBid: public(uint256)

# Set to true at the end, disallows any change
ended: public(bool)

# Keep track of refunded bids so we can follow the withdraw pattern
pendingReturns: public(HashMap[address, uint256])

# Create a simple auction with `_bidding_time`
# seconds bidding time on behalf of the
# beneficiary address `_beneficiary`.
@external
def __init__(_beneficiary: address, _bidding_time: uint256):
    self.beneficiary = _beneficiary
    self.auctionStart = block.timestamp
    self.auctionEnd = self.auctionStart + _bidding_time

# Bid on the auction with the value sent
# together with this transaction.
# The value will only be refunded if the
# auction is not won.
@external
@payable
def bid():
    # Check if bidding period is over.
    assert block.timestamp < self.auctionEnd
    # Check if bid is high enough
    assert msg.value > self.highestBid
    # Track the refund for the previous high bidder
    self.pendingReturns[self.highestBidder] += self.highestBid
    # Track new high bid
    self.highestBidder = msg.sender
    self.highestBid = msg.value

# Withdraw a previously refunded bid. The withdraw pattern is
# used here to avoid a security issue. If refunds were directly
# sent as part of bid(), a malicious bidding contract could block
# those refunds and thus block new higher bids from coming in.
@external
def withdraw():
    pending_amount: uint256 = self.pendingReturns[msg.sender]
    self.pendingReturns[msg.sender] = 0
    send(msg.sender, pending_amount)

# End the auction and send the highest bid
# to the beneficiary.
@external
def endAuction():
    # It is a good guideline to structure functions that interact
    # with other contracts (i.e. they call functions or send ether)
    # into three phases:
    # 1. checking conditions
    # 2. performing actions (potentially changing conditions)
    # 3. interacting with other contracts
    # If these phases are mixed up, the other contract could call
    # back into the current contract and modify the state or cause
    # effects (ether payout) to be performed multiple times.
    # If functions called internally include interaction with external
    # contracts, they also have to be considered interaction with
    # external contracts.

    # 1. Conditions
    # Check if auction endtime has been reached
    assert block.timestamp >= self.auctionEnd
    # Check if this function has already been called
    assert not self.ended

    # 2. Effects
    self.ended = True

    # 3. Interaction
    send(self.beneficiary, self.highestBid)
```

Cet exemple devrait vous donner une idée de la syntaxe d'un contrat Vyper. Pour une description plus détaillée des fonctions et des variables, [consultez la documentation](https://vyper.readthedocs.io/en/latest/vyper-by-example.html#simple-open-auction).

## Yul et Yul+ {#yul}

Si vous débutez avec Ethereum et que vous n'avez pas encore jamais codé avec des langages de contrats intelligents, nous vous recommandons de commencer avec Solidity ou Vyper. Intéressez-vous à Yul ou Yul+ seulement une fois que vous êtes familiarisé avec les bonnes pratiques de sécurité pour les contrats intelligents et les spécificités de l'EVM.

**Yul**

- Langage intermédiaire pour Ethereum
- Prends en charge l'[EVM](/developers/docs/evm) et l'[Ewasm](https://github.com/ewasm), un assemblage Web au petit goût d'Ethereum conçu pour être un dénominateur commun utilisable sur les deux plateformes.
- Excellente cible pour les phases d'optimisation de haut niveau qui peuvent bénéficier à la fois aux plateformes EVM et eWASM.

**Yul+**

- Extension de Yul de bas niveau très efficace
- Initialement conçue pour un contrat de [rollup optimiste](/developers/docs/scaling/optimistic-rollups/).
- Yul+ peut être considéré comme une proposition de mise à niveau expérimentale de Yul, qui y ajoute de nouvelles fonctionnalités

### Liens importants {#important-links-2}

- [Documentation Yul](https://docs.soliditylang.org/en/latest/yul.html)
- [Documentation Yul+](https://github.com/fuellabs/yulp)
- [Terrain de jeu Yul+](https://yulp.fuel.sh/)
- [Article d'introduction à Yul+](https://medium.com/@fuellabs/introducing-yul-a-new-low-level-language-for-ethereum-aa64ce89512f)

### Exemple de contrat {#example-contract-2}

Cet exemple simple implémente une fonction puissance. Il peut être compilé en utilisant `solc --strict-assembly --bin input.yul` et devrait être stocké dans le fichier input.yul.

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

Si vous avez déjà une bonne expérience en développement de contrats intelligents, vous trouverez ici une [implémentation complète ERC20 dans Yul](https://solidity.readthedocs.io/en/latest/yul.html#complete-erc20-example).

## Fe {#fe}

- Langage statique pour la Machine Virtuelle Ethereum (EVM).
- Inspiré par Python et Rust.
- Son objectif est d'être facile à apprendre, même pour les développeurs qui sont nouveaux dans l'écosystème Ethereum.
- Le développement de Fe en est encore à ses débuts, le langage a connu sa version alpha en janvier 2021.

### Liens importants {#important-links-3}

- [GitHub](https://github.com/ethereum/fe)
- [Annonce de Fe](https://snakecharmers.ethereum.org/fe-a-new-language-for-the-ethereum-ecosystem/)
- [Feuille de route 2021 pour Fe](https://notes.ethereum.org/LVhaTF30SJOpkbG1iVw1jg)
- [Chat de discussion Fe](https://discord.com/invite/ywpkAXFjZH)
- [Twitter Fe](https://twitter.com/official_fe)

### Exemple de contrat {#example-contract-3}

Ceci est un simple contrat implémenté dans Fe.

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

Comme pour tout autre langage de programmation, il s'agit surtout de choisir le bon outil en fonction du travail à effectuer et des préférences personnelles.

Voici quelques éléments à considérer si vous n'en avez encore essayé :

### Quels sont les avantages de Solidity ? {#solidity-advantages}

- Si vous débutez, il existe de nombreux tutoriels et outils d'apprentissage. Pour plus d'infos, consultez la page [Apprendre en codant](/developers/learning-tools/).
- De bons outils de développement sont disponibles.
- Solidity dispose d'une importante communauté de développeurs, ce qui signifie que vous obtiendrez probablement des réponses à vos questions très rapidement.

### Quels sont les avantages de Vyper ? {#vyper-advatages}

- Excellent moyen de commencer pour les développeurs Python qui veulent rédiger des contrats intelligents.
- Vyper dispose d'un nombre plus restreint de fonctionnalités, ce qui en fait un langage idéal pour un prototypage rapide des idées.
- Il est conçu de façon à être facile à contrôler et extrêmement lisible pour l'être humain.

### Quels sont les avantages de Yul et Yul+ ? {#yul-advantages}

- Language simple et fonctionnel de bas niveau.
- Permet de se rapprocher au plus près de l'EVM brute, ce qui peut aider à optimiser l'utilisation du gaz de vos contrats.

## Comparaison des langages {#language-comparisons}

Pour des comparaisons de la syntaxe de base, du cycle de vie des contrats, des interfaces, des opérateurs, des structures de données, des fonctions, du flux de contrôle, et plus encore, consultez la page Auditless [ Solidity & Vyper Cheat Sheet](https://reference.auditless.com/cheatsheet/)

## Complément d'information {#further-reading}

- [Bibliothèque de contrats Solidity par OpenZeppelin](https://docs.openzeppelin.com/contracts)
- [Solidity by Example](https://solidity-by-example.org)
