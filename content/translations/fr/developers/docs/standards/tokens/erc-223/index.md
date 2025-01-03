---
title: Norme de jeton ERC-223
description: Un aperçu du standard de jeton fongible ERC-223, de son fonctionnement, et une comparaison avec l'ERC-20.
lang: fr
---

## Introduction {#introduction}

### Qu'est-ce que l'ERC-223 ? {#what-is-erc223}

L'ERC-223 est une norme relative aux jetons fongibles, similaire à la norme ERC-20. La principale différence est que l'ERC-223 définit non seulement l'API du jeton, mais aussi la logique de transfert des jetons de l'expéditeur au destinataire. Il introduit un modèle de communication qui permet de gérer les transferts de jetons du côté du destinataire.

### Différences par rapport à l'ERC-20 {#erc20-differences}

L'ERC-223 résout certaines limitations de l'ERC-20 et introduit une nouvelle méthode d'interaction entre le contrat de jeton et un contrat susceptible de recevoir les jetons. Certaines choses sont possibles avec l'ERC-223 mais pas avec l'ERC-20 :

- Gestion du transfert de jetons du côté du destinataire : les destinataires peuvent détecter qu'un jeton ERC-223 est en cours de dépôt.
- Rejet des jetons envoyés incorrectement : si un utilisateur envoie des jetons ERC-223 à un contrat qui n'est pas censé recevoir de jetons, le contrat peut rejeter la transaction, empêchant ainsi la perte de jetons.
- Métadonnées dans les transferts : Les jetons ERC-223 peuvent inclure des métadonnées, permettant d'attacher des informations arbitraires aux transactions de jetons.

## Prérequis {#prerequisites}

- [Comptes](/developers/docs/accounts)
- [Contrats intelligents](/developers/docs/smart-contracts/)
- [Norme de jetons](/developers/docs/standards/tokens/)
- [ERC-20](/developers/docs/standards/tokens/erc-20/)

## Corps {#body}

L'ERC-223 est une norme de jeton qui implémente une API pour les jetons au sein de contrats intelligents. Il définit également une API pour les contrats qui sont censés recevoir des jetons ERC-223. Les contrats qui ne prennent pas en charge l'API de réception ERC-223 ne peuvent pas recevoir de jetons ERC-223, évitant ainsi les erreurs d'utilisation.

Si un contrat intelligent implémente les méthodes et événements suivants, il peut être considéré comme un contrat de jeton compatible avec l'ERC-223. Une fois déployé, il
sera responsable de suivre les jetons créés sur Ethereum.

Le contrat n'est pas obligé de ne comporter que ces fonctions et un développeur peut ajouter à ce contrat n'importe quelle autre fonction issue de différentes normes de jetons. Par exemple, les fonctions `approve` et `transferFrom` ne font pas partie de la norme ERC-223, mais elles pourraient être implémentées si nécessaire.

Provenant de l'[EIP-223](https://eips.ethereum.org/EIPS/eip-223):

### Méthodes {#methods}

Le jeton ERC-223 doit implémenter les méthodes suivantes :

```solidity
function name() public view returns (string)
function symbol() public view returns (string)
function decimals() public view returns (uint8)
function totalSupply() public view returns (uint256)
function balanceOf(address _owner) public view returns (uint256 balance)
function transfer(address _to, uint256 _value) public returns (bool success)
function transfer(address _to, uint256 _value, bytes calldata _data) public returns (bool success)
```

Un contrat qui est censé recevoir des jetons ERC-223 doit implémenter la méthode suivante :

```solidity
function tokenReceived(address _from, uint _value, bytes calldata _data)
```

Si des jetons ERC-223 sont envoyés à un contrat qui n'implémente pas la fonction `tokenReceived(..)`, alors le transfert doit échouer et les jetons ne doivent pas être retirés du solde de l'expéditeur.

### Événements {#events}

```solidity
event Transfer(address indexed _from, address indexed _to, uint256 _value, bytes calldata _data)
```

### Exemples {#examples}

L'API du jeton ERC-223 est similaire à celle de l'ERC-20, donc du point de vue du développement de l'interface utilisateur, il n'y a pas de différence. La seule exception ici est que les jetons ERC-223 peuvent ne pas avoir les fonctions `approve` et `transferFrom`, car elles sont optionnelles pour cette norme.

#### Exemples sur Solidity {#solidity-example}

L'exemple suivant illustre le fonctionnement d'un contrat de jeton ERC-223 de base :

```solidity
pragma solidity ^0.8.19;
abstract contract IERC223Recipient {
    function tokenReceived(address _from, uint _value, bytes memory _data) public virtual;
}
contract VeryBasicERC223Token {
    event Transfer(address indexed from, address indexed to, uint value, bytes data);
    string  private _name;
    string  private _symbol;
    uint8   private _decimals;
    uint256 private _totalSupply;
    mapping(address => uint256) private balances;
    function name() public view returns (string memory) { return _name; }
    function symbol() public view returns (string memory) {return _symbol; }
    function decimals() public view returns (uint8) { return _decimals; }
    function totalSupply() public view returns (uint256) { return _totalSupply; }
    function balanceOf(address _owner) public view returns (uint256) { return balances[_owner]; }
    function isContract(address account) internal view returns (bool) {
        uint256 size;
        assembly { size := extcodesize(account) }
        return size > 0;
    }
    function transfer(address _to, uint _value, bytes calldata _data) public returns (bool success){
        balances[msg.sender] = balances[msg.sender] - _value;
        balances[_to] = balances[_to] + _value;
        if(isContract(_to)) {
            IERC223Recipient(_to).tokenReceived(msg.sender, _value, _data);
        }
        emit Transfer(msg.sender, _to, _value, _data);
        return true;
    }
    function transfer(address _to, uint _value) public returns (bool success){
        bytes memory _empty = hex"00000000";
        balances[msg.sender] = balances[msg.sender] - _value;
        balances[_to] = balances[_to] + _value;
        if(isContract(_to)) {
            IERC223Recipient(_to).tokenReceived(msg.sender, _value, _empty);
        }
        emit Transfer(msg.sender, _to, _value, _empty);
        return true;
    }
}
```

Nous souhaitons maintenant qu'un autre contrat accepte les dépôts de `tokenA`, en supposant que `tokenA` est un jeton ERC-223. Le contrat doit accepter uniquement `tokenA` et rejeter tout autre jeton. Lorsque le contrat reçoit `tokenA`, il doit émettre un événement `Deposit()` et augmenter la valeur de la variable interne `deposits`.

Voici le code :

```solidity
contract RecipientContract is IERC223Recipient {
    event Deposit(address whoSentTheTokens);
    uint256 deposits = 0;
    address tokenA; // The only token that we want to accept.
    function tokenReceived(address _from, uint _value, bytes memory _data) public override
    {
        // It is important to understand that within this function
        // msg.sender is the address of a token that is being received,
        // msg.value  is always 0 as the token contract does not own or send Ether in most cases,
        // _from      is the sender of the token transfer,
        // _value     is the amount of tokens that was deposited.
        require(msg.sender == tokenA);
        deposits += _value;
        emit Deposit(_from);
    }
}
```

## Foire aux questions {#faq}

### Que se passera-t-il si nous envoyons des tokenB au contrat ? {#sending-tokens}

La transaction échouera, et le transfert des jetons ne se produira pas. Les jetons seront renvoyés à l'adresse de l'expéditeur.

### Comment pouvons-nous effectuer un dépôt sur ce contrat ? {#contract-deposits}

Appelez la fonction `transfer(address,uint256)` ou `transfer(address,uint256,bytes)` du jeton ERC-223, en spécifiant l'adresse du `RecipientContract`.

### Que se passera-t-il si nous transférons un jeton ERC-20 à ce contrat ? {#erc-20-transfers}

Si un jeton ERC-20 est envoyé au `RecipientContract`, les jetons seront transférés, mais le transfert ne sera pas reconnu (aucun événement `Deposit()` ne sera déclenché, et la valeur des dépôts ne changera pas). Les dépôts indésirables de jetons ERC-20 ne peuvent pas être filtrés ou empêchés.

### Que faire si nous voulons exécuter une fonction après que le dépôt de jetons soit complété ? {#function-execution}

Il existe plusieurs façons de procéder. Dans cet exemple, nous suivrons la méthode qui rend les transferts ERC-223 identiques aux transferts d'Ether :

```solidity
contract RecipientContract is IERC223Recipient {
    event Foo();
    event Bar(uint256 someNumber);
    address tokenA; // The only token that we want to accept.
    function tokenReceived(address _from, uint _value, bytes memory _data) public override
    {
        require(msg.sender == tokenA);
        address(this).call(_data); // Handle incoming transaction and perform a subsequent function call.
    }
    function foo() public
    {
        emit Foo();
    }
    function bar(uint256 _someNumber) public
    {
        emit Bar(_someNumber);
    }
}
```

Lorsque le `RecipientContract` recevra un jeton ERC-223, le contrat exécutera une fonction encodée comme paramètre `_data` de la transaction de jeton, de manière identique à la façon dont les transactions Ether codent les appels de fonction en tant que `data` de transaction. Consultez [le champ de données](https://ethereum.org/en/developers/docs/transactions/#the-data-field) pour plus d'informations.

Dans l'exemple ci-dessus, un jeton ERC-223 doit être transféré à l'adresse du `RecipientContract` avec la fonction `transfer(address,uint256,bytes calldata _data)`. Si le paramètre de données est `0xc2985578` (la signature de la fonction `faut()`), alors la fonction `foo()` sera invoquée après la réception du dépôt de jetons, et l'événement `Foo()` sera déclenché.

Les paramètres peuvent également être encodés dans les `data` du transfert de jetons. Par exemple, nous pouvons appeler la fonction `bar()` avec la valeur `12345` pour `_someNumber`. Dans ce cas, les `data` doivent être `0x0423a13200000000000000000000000000000000000000000000000000000000000004d2`, où `0x0423a132` est la signature de la fonction `bar(uint256)` et `00000000000000000000000000000000000000000000000000000000000004d2` correspond à `12345` en tant que `uint256`.

## Limitations {#limitations}

Bien que l'ERC-223 résolve plusieurs problèmes présents dans la norme ERC-20, il n'est pas sans ses propres limitations :

- Adoption et compatibilité : l'ERC-223 n'est pas encore largement adopté, ce qui peut limiter sa compatibilité avec les plateformes et outils existants.
- Compatibilité rétroactive : l'ERC-223 n'est pas rétrocompatible avec l'ERC-20, ce qui signifie que les contrats et outils ERC-20 existants ne fonctionneront pas avec les jetons ERC-223 sans modifications.
- Coûts en gaz : les vérifications supplémentaires et les fonctionnalités des transferts ERC-223 peuvent entraîner des coûts en gaz plus élevés par rapport aux transactions ERC-20.

## En savoir plus {#further-reading}

- [EIP-223 : Standard de jeton ERC-223](https://eips.ethereum.org/EIPS/eip-223)
- [Proposition initiale de l'ERC-223](https://github.com/ethereum/eips/issues/223)
