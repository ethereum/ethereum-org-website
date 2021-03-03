---
title: Anatomia contractelor inteligente
description: O privire aprofundată asupra anatomiei unui contact inteligent – funcțiile, datele și variabilele.
author: ro
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

Orice date contractuale trebuie alocate unei locații: fie `stocare`, fie `memorie`. Este costisitor să modifici spațiul de stocare într-un contract inteligent, deci trebuie să te gândești unde ar trebui să existe datele tale.

Un tip `address` poate conține o adresă Ethereum care echivalează cu 20 de byți sau 160 de biți. Acesta returnează în notație hexazecimală cu un 0x la început.

Alte tipuri includ:

## {#main-features}

- boolean
- întreg
- numere în virgulă fixă
- matrice de octeți de dimensiuni fixe
- matrice de octeți de dimensiuni dinamice
- literale raționale și întregi
- literale de tip string

## {#software-included}

Pentru mai multe explicații, consultă documentele:

### {#ethereum-10-clients}

-
-
-
-

### {#ethereum-20-clients}

-
-

### {#ethereum-framework}

- funcțiile de tip `public` pot fi apelate intern din cadrul contractului sau extern prin mesaje
- funcțiile `private` sunt vizibile numai pentru contractul în care sunt definite și nu în contractele derivate
-
-
-

## {#installation-guide-and-usage}

### {#recommended-hardware-and-setup}

- Parametrul `value` de tip `string` este trecut în funcția: `update_name`
- Este declarat `public`, ceea ce înseamnă că oricine îl poate accesa
- Nu este declarat `view`, astfel încât să poată modifica starea contractului
-
-
-
-
-

## {#storage}

Valorile care sunt stocate numai pe durata de viață a executării unei funcții contractuale se numesc variabile de memorie. Deoarece acestea nu sunt stocate permanent pe blockchain, acestea sunt mult mai ieftin de utilizat.

- `address.send()` – Solidity
-

Află mai multe informații despre modul în care EVM stochează datele (stocare, memorie și stivă) în [documentele Solidity](https://solidity.readthedocs.io/en/latest/introduction-to-smart-contracts.html?highlight=memory#storage-memory-and-the-stack).

## {#image-download-and-installation}

### {#1-download-eth-10-or-eth-20-images}<ButtonLink to="https://ethraspbian.com/downloads/ubuntu-20.04-preinstalled-server-arm64+raspi-eth1.img.zip"></ButtonLink>

<ButtonLink to="https://ethraspbian.com/downloads/ubuntu-20.04-preinstalled-server-arm64+raspi-eth2.img.zip"></ButtonLink>

Exemple:

### {#2-flash-the-image}

În termenii cei mai simpliști, funcțiile pot obține informații sau pot seta informații ca răspuns la tranzacțiile primite.

```bash

```

Există două tipuri de apeluri funcționale:

De asemenea, pot fi de tip `public` sau `private`

```bash
# Exemplu Vyper
storedData: int128
```

```bash
// Exemplu Solidity
function update_name(string value) public {
    dapp_name = value;
}
```

### {#3-insert-the-microsd-into-the-raspberry-pi-4-connect-an-ethernet-cable-and-attach-the-usb-ssd-disk-make-sure-you-are-using-a-blue-port}

### {#4-power-on-the-device}

Iată o funcție pentru actualizarea unei variabile de stare pe un contract:

- parametru variabil și tip (dacă acceptă parametri)
- declarație internă/externă

### {#5-log-in}

Ce se consideră ca modificator de stare:

```bash
// Exemplu Solidity
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

În plus față de variabilele și funcțiile pe care le definești în contract, există unele funcții speciale încorporate. Cel mai evident exemplu este:

## {#monitoring-dashboards}

```bash

```

## {#switching-clients}

Un contract complet ar putea arăta așa. Aici funcția `constructor` furnizează o valoare inițială pentru variabila `dapp_name`.

```bash
# exemplu Vyper

@external
def __init__(_beneficiary: address, _bidding_time: uint256):
    self.beneficiary = _beneficiary
    self.auctionStart = block.timestamp
    self.auctionEnd = self.auctionStart + _bidding_time
```

```bash
pragma solidity >=0.4.0 <=0.6.0;

contract ExampleDapp {
   string dapp_name; //variabila de stare
   /*Apelat când contractul este implementat și inițializează valoarea*/
   constructor() public{
        dapp_name = "Exemplul meu de aplicație dapp";
    }

    //Funcția Get
    function read_name() public view returns(string){
       return dapp_name;
        }

    // Funcția Set
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
3. [Crearea altor contracte](https://solidity.readthedocs.io/en/v0.7.0/control-structures.html#creating-contracts).
4. Folosirea `selfdestruct`.
5. Trimiterea eterului prin apeluri.
6. Apelarea oricărei funcții care nu este marcată `view` sau `pure`.
7. Folosirea de apeluri de nivel scăzut.
8. Utilizarea ansamblului în linie care conține anumite coduri opcode.
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
