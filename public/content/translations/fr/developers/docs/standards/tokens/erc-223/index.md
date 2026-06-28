---
title: Norme de jeton ERC-223
description: "Un aperçu de la norme de jeton fongible ERC-223, de son fonctionnement et une comparaison avec l'ERC-20."
lang: fr
---

## Introduction {#introduction}

### Qu'est-ce que l'ERC-223 ? {#what-is-erc223}

L'ERC-223 est une norme pour les jetons fongibles, similaire à la norme ERC-20. La principale différence est que l'ERC-223 définit non seulement l'API du jeton, mais aussi la logique de transfert des jetons de l'expéditeur au destinataire. Il introduit un modèle de communication qui permet de gérer les transferts de jetons du côté du destinataire.

### Différences avec l'ERC-20 {#erc20-differences}

L'ERC-223 résout certaines limites de l'ERC-20 et introduit une nouvelle méthode d'interaction entre le contrat de jeton et un contrat susceptible de recevoir les jetons. Il y a quelques éléments qui sont possibles avec l'ERC-223 mais pas avec l'ERC-20 :

- Gestion du transfert de jetons du côté du destinataire : Les destinataires peuvent détecter qu'un jeton ERC-223 est en cours de dépôt.
- Rejet des jetons envoyés de manière incorrecte : Si un utilisateur envoie des jetons ERC-223 à un contrat qui n'est pas censé recevoir de jetons, le contrat peut rejeter la transaction, évitant ainsi la perte de jetons.
- Métadonnées dans les transferts : Les jetons ERC-223 peuvent inclure des métadonnées, permettant d'attacher des informations arbitraires aux transactions de jetons.

## Prérequis {#prerequisites}

- [Comptes](/developers/docs/accounts)
- [Contrats intelligents](/developers/docs/smart-contracts/)
- [Normes de jetons](/developers/docs/standards/tokens/)
- [ERC-20](/developers/docs/standards/tokens/erc-20/)

## Corps {#body}

L'ERC-223 est une norme de jeton qui implémente une API pour les jetons au sein des contrats intelligents. Il déclare également une API pour les contrats qui sont censés recevoir des jetons ERC-223. Les contrats qui ne prennent pas en charge l'API de réception ERC-223 ne peuvent pas recevoir de jetons ERC-223, ce qui évite les erreurs des utilisateurs.

Si un contrat intelligent implémente les méthodes et événements suivants, il peut être qualifié de contrat de jeton compatible ERC-223. Une fois déployé, il sera responsable du suivi des jetons créés sur Ethereum.

Le contrat n'est pas obligé de posséder uniquement ces fonctions et un développeur peut ajouter à ce contrat toute autre fonctionnalité issue de différentes normes de jetons. Par exemple, les fonctions `approve` et `transferFrom` ne font pas partie de la norme ERC-223, mais ces fonctions pourraient être implémentées si nécessaire.

D'après l'[EIP-223](https://eips.ethereum.org/EIPS/eip-223) :

### Méthodes {#methods}

Un jeton ERC-223 doit implémenter les méthodes suivantes :

```solidity
function name() public view returns (string)
function symbol() public view returns (string)
function decimals() public view returns (uint8)
function totalSupply() public view returns (uint256)
function balanceOf(address _owner) public view returns (uint256 balance)
function transfer(address _to, uint256 _value) public returns (bool success)
function transfer(address _to, uint256 _value, bytes calldata _data) public returns (bool success)
```

Un contrat censé recevoir des jetons ERC-223 doit implémenter la méthode suivante :

```solidity
function tokenReceived(address _from, uint _value, bytes calldata _data)
```

Si des jetons ERC-223 sont envoyés à un contrat qui n'implémente pas la fonction `tokenReceived(..)`, alors le transfert doit échouer et les jetons ne doivent pas être déduits du solde de l'expéditeur.

### Événements {#events}

```solidity
event Transfer(address indexed _from, address indexed _to, uint256 _value, bytes calldata _data)
```

### Exemples {#examples}

L'API du jeton ERC-223 est similaire à celle de l'ERC-20, donc du point de vue du développement de l'interface utilisateur (UI), il n'y a aucune différence. La seule exception ici est que les jetons ERC-223 peuvent ne pas avoir les fonctions `approve` + `transferFrom` car elles sont facultatives pour cette norme.

#### Exemples en Solidity {#solidity-example}

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

Maintenant, nous voulons qu'un autre contrat accepte les dépôts de `tokenA` en supposant que tokenA est un jeton ERC-223. Le contrat doit accepter uniquement tokenA et rejeter tout autre jeton. Lorsque le contrat reçoit tokenA, il doit émettre un événement `Deposit()` et augmenter la valeur de la variable interne `deposits`.

Voici le code :

```solidity
contract RecipientContract is IERC223Recipient {
    event Deposit(address whoSentTheTokens);
    uint256 deposits = 0;
    address tokenA; // Le seul jeton que nous voulons accepter.
    function tokenReceived(address _from, uint _value, bytes memory _data) public override
    {
        // Il est important de comprendre que dans cette fonction
        // msg.sender est l'adresse d'un jeton qui est reçu,
        // msg.value  est toujours 0 car le contrat de jeton ne possède ni n'envoie d'ether dans la plupart des cas,
        // _from      est l'expéditeur du transfert de jeton,
        // _value     est la quantité de jetons qui a été déposée.
        require(msg.sender == tokenA);
        deposits += _value;
        emit Deposit(_from);
    }
}
```

## Foire aux questions {#faq}

### Que se passera-t-il si nous envoyons un tokenB au contrat ? {#sending-tokens}

La transaction échouera et le transfert de jetons n'aura pas lieu. Les jetons seront retournés à l'adresse de l'expéditeur.

### Comment pouvons-nous effectuer un dépôt sur ce contrat ? {#contract-deposits}

Appelez la fonction `transfer(address,uint256)` ou `transfer(address,uint256,bytes)` du jeton ERC-223, en spécifiant l'adresse du `RecipientContract`.

### Que se passera-t-il si nous transférons un jeton ERC-20 à ce contrat ? {#erc-20-transfers}

Si un jeton ERC-20 est envoyé au `RecipientContract`, les jetons seront transférés, mais le transfert ne sera pas reconnu (aucun événement `Deposit()` ne sera déclenché et la valeur des dépôts ne changera pas). Les dépôts ERC-20 indésirables ne peuvent pas être filtrés ou empêchés.

### Et si nous voulons exécuter une fonction une fois le dépôt de jetons terminé ? {#function-execution}

Il existe plusieurs façons de le faire. Dans cet exemple, nous suivrons la méthode qui rend les transferts ERC-223 identiques aux transferts d'ether :

```solidity
contract RecipientContract is IERC223Recipient {
    event Foo();
    event Bar(uint256 someNumber);
    address tokenA; // Le seul jeton que nous voulons accepter.
    function tokenReceived(address _from, uint _value, bytes memory _data) public override
    {
        require(msg.sender == tokenA);
        address(this).call(_data); // Gérer la transaction entrante et effectuer un appel de fonction ultérieur.
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

Lorsque le `RecipientContract` recevra un jeton ERC-223, le contrat exécutera une fonction encodée en tant que paramètre `_data` de la transaction de jeton, de manière identique à la façon dont les transactions en ether encodent les appels de fonction en tant que `data` de transaction. Lisez [le champ de données](/developers/docs/transactions/#the-data-field) pour plus d'informations.

Dans l'exemple ci-dessus, un jeton ERC-223 doit être transféré à l'adresse du `RecipientContract` avec la fonction `transfer(address,uin256,bytes calldata _data)`. Si le paramètre de données est `0xc2985578` (la signature d'une fonction `foo()`), alors la fonction foo() sera invoquée après la réception du dépôt de jetons et l'événement Foo() sera déclenché.

Les paramètres peuvent également être encodés dans le `data` du transfert de jetons, par exemple nous pouvons appeler la fonction bar() avec la valeur 12345 pour `_someNumber`. Dans ce cas, le `data` doit être `0x0423a13200000000000000000000000000000000000000000000000000000000000004d2` où `0x0423a132` est la signature de la fonction `bar(uint256)` et `00000000000000000000000000000000000000000000000000000000000004d2` est 12345 en tant que uint256.

## Limites {#limitations}

Bien que l'ERC-223 résolve plusieurs problèmes rencontrés dans la norme ERC-20, il n'est pas sans ses propres limites :

- Adoption et compatibilité : L'ERC-223 n'est pas encore largement adopté, ce qui peut limiter sa compatibilité avec les outils et plateformes existants.
- Rétrocompatibilité : L'ERC-223 n'est pas rétrocompatible avec l'ERC-20, ce qui signifie que les contrats et outils ERC-20 existants ne fonctionneront pas avec les jetons ERC-223 sans modifications.
- Coûts en gaz : Les vérifications et fonctionnalités supplémentaires dans les transferts ERC-223 peuvent entraîner des coûts en gaz plus élevés par rapport aux transactions ERC-20.

## Pour aller plus loin {#further-reading}

- [EIP-223 : Norme de jeton ERC-223](https://eips.ethereum.org/EIPS/eip-223)
- [Proposition initiale de l'ERC-223](https://github.com/ethereum/eips/issues/223)