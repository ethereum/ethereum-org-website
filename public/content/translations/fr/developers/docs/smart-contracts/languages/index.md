---
title: Les langages des contrats intelligents
description: "Présentation et comparaison des deux principaux langages de contrat intelligent : Solidity et Vyper"
lang: fr
---

Un aspect important d'Ethereum est que les contrats intelligents peuvent être programmés en utilisant des langages relativement conviviaux pour les développeurs. Si vous avez de l'expérience avec Python ou tout [langage à accolades](https://wikipedia.org/wiki/List_of_programming_languages_by_type#Curly-bracket_languages), vous pouvez trouver un langage avec une syntaxe familière.

Les deux langages les plus actifs et les plus suivis sont :

- solidity
- Vyper

L'IDE Remix fournit un environnement de développement complet pour créer et tester des contrats dans Solidity et Vyper. [Essayez l'IDE Remix dans le navigateur](https://remix.ethereum.org) pour commencer à coder.

Les développeurs plus expérimentés peuvent également utiliser Yul, un langage intermédiaire pour la [machine virtuelle Ethereum](/developers/docs/evm/), ou Yul+, une extension de Yul.

Si vous êtes curieux et que vous aimez aider à tester de nouveaux langages encore en cours de développement, vous pouvez essayer Fe, un nouveau langage pour contrat intelligent qui en est encore à ses balbutiements.

## Prérequis {#prerequisites}

La connaissance de langages de programmation comme JavaScript ou Python peut vous aider à comprendre les différences entre les langages de contrats intelligents. Nous vous conseillons également d'avoir compris le concept des contrats intelligents avant de vous plonger dans les comparaisons entre les différents langages. [Introduction aux contrats intelligents](/developers/docs/smart-contracts/).

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
- [Portail du langage Solidity](https://soliditylang.org/)
- [Solidity by Example](https://docs.soliditylang.org/en/latest/solidity-by-example.html)
- [GitHub](https://github.com/ethereum/solidity/)
- [Salon de discussion Gitter de Solidity](https://gitter.im/ethereum/solidity) ponté vers le [salon de discussion Matrix de Solidity](https://matrix.to/#/#ethereum_solidity:gitter.im)
- [Aide-mémoire](https://reference.auditless.com/cheatsheet)
- [Blog Solidity](https://blog.soliditylang.org/)
- [Twitter de Solidity](https://twitter.com/solidity_lang)

### Exemple de contrat {#example-contract}

```solidity
// SPDX-License-Identifier: GPL-3.0
pragma solidity >= 0.7.0;

contract Coin {
    // Le mot-clé « public » rend les variables
    // accessibles depuis d'autres contrats
    address public minter;
    mapping (address => uint) public balances;

    // Les événements permettent aux clients de réagir aux modifications spécifiques
    // du contrat que vous déclarez
    event Sent(address from, address to, uint amount);

    // Le code du constructeur n'est exécuté que lors de la création
    // du contrat
    constructor() {
        minter = msg.sender;
    }

    // Envoie un montant de pièces nouvellement créées à une adresse
    // Ne peut être appelé que par le créateur du contrat
    function mint(address receiver, uint amount) public {
        require(msg.sender == minter);
        require(amount < 1e60);
        balances[receiver] += amount;
    }

    // Envoie un montant de pièces existantes
    // depuis n'importe quel appelant vers une adresse
    function send(address receiver, uint amount) public {
        require(amount <= balances[msg.sender], "Solde insuffisant.");
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

Pour plus d'informations, [lisez la raison d'être de Vyper](https://vyper.readthedocs.io/en/latest/index.html).

### Liens importants {#important-links-1}

- [Documentation](https://vyper.readthedocs.io)
- [Vyper by Example](https://vyper.readthedocs.io/en/latest/vyper-by-example.html)
- [More Vyper by Example](https://vyper-by-example.org/)
- [GitHub](https://github.com/vyperlang/vyper)
- [Chat Discord de la communauté Vyper](https://discord.gg/SdvKC79cJk)
- [Aide-mémoire](https://reference.auditless.com/cheatsheet)
- [Cadres de développement et outils pour les contrats intelligents pour Vyper](/developers/docs/programming-languages/python/)
- [VyperPunk – apprenez à sécuriser et à pirater les contrats intelligents Vyper](https://github.com/SupremacyTeam/VyperPunk)
- [Hub Vyper pour le développement](https://github.com/zcor/vyper-dev)
- [Exemples de contrats intelligents Vyper greatest hits](https://github.com/pynchmeister/vyper-greatest-hits/tree/main/contracts)
- [Awesome Vyper – ressources sélectionnées](https://github.com/spadebuilders/awesome-vyper)

### Exemple {#example}

```python
# Enchère ouverte

# Paramètres de l'enchère

# Le bénéficiaire reçoit l'argent du plus offrant

beneficiary: public(address)
auctionStart: public(uint256)
auctionEnd: public(uint256)

# État actuel de l'enchère

highestBidder: public(address)
highestBid: public(uint256)

# Mis à « true » à la fin, interdit toute modification

ended: public(bool)

# Suivi des enchères remboursées afin que nous puissions suivre le modèle de retrait

pendingReturns: public(HashMap[address, uint256])

# Crée une enchère simple avec un temps d'enchère de `_bidding_time`

# secondes pour le compte de

# l'adresse du bénéficiaire `_beneficiary`.

@external
def __init__(_beneficiary: address, _bidding_time: uint256):
    self.beneficiary = _beneficiary
    self.auctionStart = block.timestamp
    self.auctionEnd = self.auctionStart + _bidding_time

# Enchérir sur l'enchère avec la valeur envoyée

# avec cette transaction.

# La valeur ne sera remboursée que si

# l'enchère n'est pas remportée.

@external
@payable
def bid():
    # Vérifie si la période d'enchères est terminée.
    assert block.timestamp < self.auctionEnd
    # Vérifie si l'enchère est suffisamment élevée
    assert msg.value > self.highestBid
    # Suivi du remboursement de l'enchérisseur le plus élevé précédent
    self.pendingReturns[self.highestBidder] += self.highestBid
    # Suivi de la nouvelle enchère la plus élevée
    self.highestBidder = msg.sender
    self.highestBid = msg.value

# Retirer une enchère précédemment remboursée. Le modèle de retrait est

# utilisé ici pour éviter un problème de sécurité. Si les remboursements étaient directement

# envoyés dans le cadre de bid(), un contrat d'enchères malveillant pourrait bloquer

# ces remboursements et ainsi empêcher l'arrivée de nouvelles enchères plus élevées.

@external
def withdraw():
    pending_amount: uint256 = self.pendingReturns[msg.sender]
    self.pendingReturns[msg.sender] = 0
    send(msg.sender, pending_amount)

# Met fin à l'enchère et envoie l'enchère la plus élevée

# au bénéficiaire.

@external
def endAuction():
    # Il est recommandé de structurer les fonctions qui interagissent
    # avec d'autres contrats (c'est-à-dire qu'elles appellent des fonctions ou envoient de l'ether)
    # en trois phases :
    # 1. vérification des conditions
    # 2. exécution d'actions (pouvant modifier les conditions)
    # 3. interaction avec d'autres contrats
    # Si ces phases sont mélangées, l'autre contrat pourrait rappeler
    # le contrat actuel et modifier l'état ou provoquer
    # des effets (paiement d'ether) à effectuer plusieurs fois.
    # Si les fonctions appelées en interne incluent une interaction avec des contrats
    # externes, elles doivent également être considérées comme une interaction avec des
    # contrats externes.

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

Cet exemple devrait vous donner une idée de la syntaxe d'un contrat Vyper. Pour une description plus détaillée des fonctions et des variables, [consultez la documentation](https://vyper.readthedocs.io/en/latest/vyper-by-example.html#simple-open-auction).

## Yul et Yul+ {#yul}

Si vous débutez avec Ethereum et que vous n'avez pas encore jamais codé avec des langages de contrats intelligents, nous vous recommandons de commencer avec Solidity ou Vyper. Intéressez-vous à Yul ou Yul+ seulement une fois que vous êtes familiarisé avec les bonnes pratiques de sécurité pour les contrats intelligents et les spécificités de l'EVM.

**Yul**

- Langage intermédiaire pour Ethereum
- Prend en charge l'[EVM](/developers/docs/evm) et l'[Ewasm](https://github.com/ewasm), un WebAssembly aux couleurs d'Ethereum, et est conçu pour être un dénominateur commun utilisable des deux plateformes.
- Bonne cible pour les étapes d'optimisation de haut niveau qui peuvent bénéficier de la même manière aux plateformes EVM et Ewasm.

**Yul+**

- Extension de Yul de bas niveau très efficace
- Initialement conçu pour un contrat de [rollup optimiste](/developers/docs/scaling/optimistic-rollups/).
- Yul+ peut être considéré comme une proposition de mise à niveau expérimentale de Yul, qui y ajoute de nouvelles fonctionnalités

### Liens importants {#important-links-2}

- [Documentation de Yul](https://docs.soliditylang.org/en/latest/yul.html)
- [Documentation de Yul+](https://github.com/fuellabs/yulp)
- [Article d'introduction à Yul+](https://medium.com/@fuellabs/introducing-yul-a-new-low-level-language-for-ethereum-aa64ce89512f)

### Exemple de contrat {#example-contract-2}

Cet exemple simple implémente une fonction puissance. Il peut être compilé en utilisant `solc --strict-assembly --bin input.yul`. et devrait être stocké dans le fichier input.yul.

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

Si vous avez déjà une bonne expérience des contrats intelligents, une implémentation complète d'ERC20 dans Yul peut être trouvée [ici](https://solidity.readthedocs.io/en/latest/yul.html#complete-erc20-example).

## Fe {#fe}

- Langage statique pour la Machine Virtuelle Ethereum (EVM).
- Inspiré par Python et Rust.
- Son objectif est d'être facile à apprendre, même pour les développeurs qui sont nouveaux dans l'écosystème Ethereum.
- Le développement de Fe en est encore à ses débuts, le langage a connu sa version alpha en janvier 2021.

### Liens importants {#important-links-3}

- [GitHub](https://github.com/ethereum/fe)
- [Annonce de Fe](https://snakecharmers.ethereum.org/fe-a-new-language-for-the-ethereum-ecosystem/)
- [Feuille de route 2021 de Fe](https://notes.ethereum.org/LVhaTF30SJOpkbG1iVw1jg)
- [Chat Discord de Fe](https://discord.com/invite/ywpkAXFjZH)
- [Twitter de Fe](https://twitter.com/official_fe)

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

### Quels sont les avantages de Solidity ? Avantages de Solidity {#solidity-advantages}

- Si vous débutez, il existe de nombreux tutoriels et outils d'apprentissage. Pour en savoir plus, consultez la section [Apprendre en codant](/developers/learning-tools/).
- De bons outils de développement sont disponibles.
- Solidity dispose d'une importante communauté de développeurs, ce qui signifie que vous obtiendrez probablement des réponses à vos questions très rapidement.

### Quels sont les avantages de Vyper ? Avantages de Vyper {#vyper-advatages}

- Excellent moyen de commencer pour les développeurs Python qui veulent rédiger des contrats intelligents.
- Vyper dispose d'un nombre plus restreint de fonctionnalités, ce qui en fait un langage idéal pour un prototypage rapide des idées.
- Il est conçu de façon à être facile à contrôler et extrêmement lisible pour l'être humain.

### Quels sont les avantages de Yul et Yul+ ? Avantages de Yul {#yul-advantages}

- Language simple et fonctionnel de bas niveau.
- Permet de se rapprocher au plus près de l'EVM brute, ce qui peut aider à optimiser l'utilisation du gaz de vos contrats.

## Comparaisons des langages {#language-comparisons}

Pour des comparaisons de la syntaxe de base, du cycle de vie du contrat, des interfaces, des opérateurs, des structures de données, des fonctions, du flux de contrôle et plus encore, consultez cet [aide-mémoire d'Auditless](https://reference.auditless.com/cheatsheet/)

## En savoir plus {#further-reading}

- [Bibliothèque de contrats Solidity par OpenZeppelin](https://docs.openzeppelin.com/contracts/5.x/)
- [Solidity by Example](https://solidity-by-example.org)
