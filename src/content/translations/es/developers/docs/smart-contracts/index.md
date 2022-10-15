---
title: Introducción a los contratos inteligentes
description: Una descripción de contratos inteligentes, que se centra en sus características y limitaciones únicas.
lang: es
---

## ¿Qué es un contrato inteligente?

Un "contrato inteligente" es básicamente un programa que se ejecuta en la blockchain de Ethereum. Se trata de un grupo de código (sus funciones) y datos (su estado) que existe en una dirección específica en la blockchain de Ethereum.

Los contratos inteligentes son un tipo de [cuenta de Ethereum](/developers/docs/accounts/). Esto significa que tienen un saldo y pueden enviar transacciones por la red. Sin embargo, no están controlados por un usuario, sino que están implementados en la red y se ejecutan como se hayan programado. Las cuentas de usuario pueden interactuar con un contrato inteligente enviando transacciones que ejecuten una función definida en el contrato inteligente. Los contratos inteligentes pueden definir reglas, como un contrato normal, y automáticamente se ejecutan a través del código.

## Requisitos previos {#prerequisites}

Asegúrate de haber leído sobre las [cuentas](/developers/docs/accounts/), [transacciones](/developers/docs/transactions/) y la [máquina virtual de Ethereum](/developers/docs/evm/) antes de entrar en el mundo de los contratos inteligentes.

## Una máquina expendedora digital {#a-digital-vending-machine}

Tal vez la mejor metáfora para el contrato inteligente sea la de la máquina expendedora, según lo descrito por Nick Szabo. Con las entradas adecuadas, una cierta producción está garantizada.

Para obtener un snack de una máquina expendedora:

```
dinero + selección del snack = obtención del snack
```

Esta lógica está programada en la máquina expendedora.

Un contrato inteligente, como una máquina expendedora, tiene la lógica programada en él. A continuación incluimos un ejemplo que demuestra que la máquina expendedora podría parecerse al contrato inteligente:

```solidity
pragma solidity 0.8.7;

contract VendingMachine {

    // Declarar las variables del estado del contrato
    address public owner;
    mapping (address => uint) public cupcakeBalances;

    // Cuando se implementa el contrato "VendingMachine":
    // 1. configurar la dirección de implantación como el propietario del contrato
    // 2. configurar el saldo de magdalenas del contrato inteligente implementado en 100
    constructor() {
        owner = msg.sender;
        cupcakeBalances[address(this)] = 100;
    }

    // Permitir que el propietario aumente el saldo de magdalenas del contrato inteligente
    function refill(uint amount) public {
        require(msg.sender == owner, "Only the owner can refill.");
        cupcakeBalances[address(this)] += amount;
    }

    // Permitir que cualquier persona compre magdalenas
    function purchase(uint amount) public payable {
        require(msg.value >= amount * 1 ether, "You must pay at least 1 ETH per cupcake");
        require(cupcakeBalances[address(this)] >= amount, "Not enough cupcakes in stock to complete this purchase");
        cupcakeBalances[address(this)] -= amount;
        cupcakeBalances[msg.sender] += amount;
    }
}
```

Del mismo modo que una máquina expendedora elimina la necesidad de un empleado, los contratos inteligentes pueden sustituir los intermediarios en muchas industrias.

## Sin permiso {#permissionless}

Cualquiera puede escribir un contrato inteligente e implementarlo en la red. Solo tienes que aprender a programar en un [lenguaje de contrato inteligente](/developers/docs/smart-contracts/languages/) y tener una cantidad suficiente de ETH para implementar tu contrato. Implementar un contrato inteligente es técnicamente una transacción, así que necesitas pagar tu [gas](/developers/docs/gas/) del mismo modo que necesitas pagar gas a cambio de realizar una simple transferencia de ETH. Sin embargo, los costes de gas para la implementación de contratos son mucho mayores.

Ethereum dispone de lenguajes cómodos para que los programadores puedan redactar contratos inteligentes:

- Solidity
- Vyper

[Más sobre lenguajes](/developers/docs/smart-contracts/languages/)

Sin embargo, deben compilarse antes de implementarse para que la máquina virtual de Ethereum pueda interpretar y almacenar el contrato. [Más información sobre la compilación](/developers/docs/smart-contracts/compiling/)

## Capacidad de composición {#composability}

Los contratos inteligentes son públicos en Ethereum y se pueden considerar API abiertas. Esto significa que puedes acceder a otros contratos inteligentes en su propio contrato inteligente para ampliar en gran medida lo que es posible. Los contratos pueden incluso implementar otros contratos.

Obtén más información sobre la [composición de contratos inteligentes](/developers/docs/smart-contracts/composability/).

## Limitaciones {#limitations}

Los contratos inteligentes por sí solos no pueden obtener información sobre eventos "del mundo real" porque no pueden enviar solicitudes HTTP. Esto es así de manera predeterminada, ya que que confiar en información externa podría perjudicar al consenso, que es importante para la seguridad y la descentralización.

Hay maneras de eludir esto con ayuda de [oráculos](/developers/docs/oracles/).

## Recursos de contrato inteligente {#smart-contract-resources}

**Contratos de OpenZeppelin:** **_Bibliotecas para el desarrollo seguro de contratos inteligentes._**

- [openzeppelin.com/contracts/](https://openzeppelin.com/contracts/)
- [GitHub](https://github.com/OpenZeppelin/openzeppelin-contracts)
- [Foro de la comunidad](https://forum.openzeppelin.com/c/general/16)

**DappSys:** **_Bloques de construcción seguros, flexibles y sencillos para contratos inteligentes._**

- [Dappsys](https://dappsys.readthedocs.io/)
- [GitHub](https://github.com/dapphub/dappsys)

## Más lectura {#further-reading}

- [Contratos Inteligentes: La tecnología de la blockchain que reemplazará a los abogados](https://blockgeeks.com/guides/smart-contracts/)_Blockgeeks_
- [Prácticas recomendadas para el desarrollo de contratos inteligentes,](https://yos.io/2019/11/10/smart-contract-development-best-practices/)_ 10 de noviembre de 2019, Yos Riady_
