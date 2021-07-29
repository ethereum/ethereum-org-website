---
title: Anatomie des contrats intelligents
description: "Examen approfondi des composantes d'un contrat intelligent : les fonctions, les données et les variables."
author: fr
tags:
  -
  -
  -
lang:
sidebar:
skill:
published:
source:
sourceUrl:
---

<!--Content below provided by @EthereumOnArm-->[]()

Toute donnée relative à un contrat doit être affectée à un emplacement : soit `storage` soit `memory`. Il est coûteux de modifier le stockage dans un contrat intelligent. Vous devez donc décider de l'endroit où vous souhaitez conserver vos données.

Un type `address ` peut contenir une adresse Ethereum qui équivaut à 20 octets ou 160 bits, ce qui donne une adresse en notation hexadécimale commençant par 0x.

Les autres types incluent les :

## {#main-features}

- booléens ;
- nombres entiers ;
- numéros de points fixes ;
- tableaux d'octets de taille fixe ;
- tableaux d'octets de taille dynamique ;
- littéraux rationnels et entiers ;
- littéraux de chaîne ;

## {#software-included}

Pour plus d'explications, consultez les pages ci-dessous :

### {#ethereum-10-clients}

-
-
-
-

### {#ethereum-20-clients}

-
-

### {#ethereum-framework}

- Les fonctions `public` peuvent être appelées en interne à l'intérieur du contrat ou à l'extérieur via des messages
- Les fonctions `private` ne sont visibles que pour le contrat dans lequel elles sont définies et non dans les contrats dérivés
-
-
-

## {#installation-guide-and-usage}

### {#recommended-hardware-and-setup}

- Le paramètre `value` de type `string` est passé dans la fonction : `update_name`.
- Il est déclaré `public`, ce qui signifie que n'importe qui peut y accéder.
- Il n'est pas déclaré comme `view`, il peut donc modifier l'état du contrat
-
-
-
-
-

## {#storage}

Les valeurs qui ne sont stockées que pendant la durée de l'exécution d'une fonction de contrat sont appelées variables de mémoire. Celles-ci n'étant pas stockées de façon permanente sur la blockchain, elles sont donc moins chères à utiliser.

- `address.send()` - Solidity
-

Pour en savoir plus sur la façon dont l'EVM conserve les données (stockage, mémoire et pile) consultez la documentation [Solidity](https://solidity.readthedocs.io/en/latest/introduction-to-smart-contracts.html?highlight=memory#storage-memory-and-the-stack).

## {#image-download-and-installation}

### {#1-download-eth-10-or-eth-20-images}<ButtonLink to="https://ethraspbian.com/downloads/ubuntu-20.04-preinstalled-server-arm64+raspi-eth1.img.zip"></ButtonLink>

<ButtonLink to="https://ethraspbian.com/downloads/ubuntu-20.04-preinstalled-server-arm64+raspi-eth2.img.zip"></ButtonLink>

Exemples :

### {#2-flash-the-image}

En termes simples, les fonctions peuvent obtenir ou définir des informations en réponse à des transactions entrantes.

```bash

```

Il existe deux types d'appels de fonctions :

Elles peuvent également être de type `public` ou `private`

```bash
# Vyper example
storedData: int128
```

```bash
// Solidity example
function update_name(string value) public {
    dapp_name = value;
}
```

### {#3-insert-the-microsd-into-the-raspberry-pi-4-connect-an-ethernet-cable-and-attach-the-usb-ssd-disk-make-sure-you-are-using-a-blue-port}

### {#4-power-on-the-device}

Voici une fonction pour mettre à jour une variable d'état sur un contrat :

- Paramètre variable et type (si elle accepte des paramètres)
- Déclaration de fonction internal/external

### {#5-log-in}

Voici ce qui est considéré comme une modification d'état :

```bash
// Solidity example
function balanceOf(address _owner) public view returns (uint256 _balance) {
    return ownerPizzaCount[_owner];
}
```

### {#6-open-30303-port-for-geth-and-13000-if-you-are-running-prysm-beacon-chain-if-you-dont-know-how-to-do-this-google-port-forwarding-followed-by-your-router-model}

### {#7-get-console-output}

```bash
dappName: public(string)

@view
@public
def readName() -> string:
  return dappName
```

---

## {#syncing-the-blockchain}

En plus des variables et des fonctions que vous définissez pour votre contrat, il existe des fonctions spéciales intégrées. Exemple le plus évident :

## {#monitoring-dashboards}

```bash

```

## {#switching-clients}

Un contrat complet pourrait ressembler à cela. Ici la fonction `constructor` fournit une valeur initiale pour la variable `dapp_name`.

```bash
# Vyper example

@external
def __init__(_beneficiary: address, _bidding_time: uint256):
    self.beneficiary = _beneficiary
    self.auctionStart = block.timestamp
    self.auctionEnd = self.auctionStart + _bidding_time
```

```bash
pragma solidity >=0.4.0 <=0.6.0;

contract ExampleDapp {
   string dapp_name; //state variable

   /*Called when the contract is deployed and initializes the value*/
   constructor() public{
        dapp_name = "My Example dapp";
    }

    // Get Function
    function read_name() public view returns(string){
       return dapp_name;
        }

    // Set Function
    function update_name(string value) public {
        dapp_name = value;
        }
}
```

```bash

```

## {#changing-parameters}

```bash

```

### {#eth-10}

```bash

```

### {#eth2}

```bash

```

## {#nethermind-and-hyperledger-besu}

## {#validator}

## {#feedback-appreciated}

## {#references}

1. []()
2. []()
3. [Création d'autres contrats](https://solidity.readthedocs.io/en/v0.7.0/control-structures.html#creating-contracts)
4. Utilisation d'`autodestruct`
5. Envoi d'ether via des appels
6. Appel d'une fonction non marquée `view` ni `pure`
7. Utilisation d'appels de bas niveau
8. Utilisation d'un assemblage en ligne conteant certains opcodes
9.
10.
11.
12.
13.
14.
15.
16.
17.
18.
