---
title: "Introducción a los contratos inteligentes"
description: "Una descripción de contratos inteligentes, que se centra en sus características y limitaciones únicas."
lang: es
---

## ¿Qué es un contrato inteligente? ¿Qué es un contrato inteligente? {#what-is-a-smart-contract}

Un "contrato inteligente" es básicamente un programa que se ejecuta en la blockchain de Ethereum. Se trata de un grupo de código (sus funciones) y datos (su estado) que existe en una dirección específica en la blockchain de Ethereum.

Los contratos inteligentes son un tipo de [cuenta de Ethereum](/developers/docs/accounts/). Esto significa que tienen un saldo y pueden ser el objetivo de las transacciones. Sin embargo, no están controlados por un usuario, sino que están implementados en la red y se ejecutan como se hayan programado. Las cuentas de usuario pueden interactuar con un contrato inteligente enviando transacciones que ejecuten una función definida en el contrato inteligente. Los contratos inteligentes pueden definir reglas, como un contrato normal, y automáticamente se ejecutan a través del código. Los contratos inteligentes no pueden ser eliminados por defecto, y las interacciones con ellos son irreversibles.

## Requisitos previos {#prerequisites}

Si está empezando o busca una introducción menos técnica, le recomendamos nuestra [Introducción a los contratos inteligentes](/smart-contracts/).

Asegúrese de haber leído sobre las [cuentas](/developers/docs/accounts/), las [transacciones](/developers/docs/transactions/) y la [máquina virtual de Ethereum](/developers/docs/evm/) antes de adentrarse en el mundo de los contratos inteligentes.

## Una máquina expendedora digital {#a-digital-vending-machine}

Quizás la mejor metáfora para un contrato inteligente es una máquina expendedora, como lo describe [Nick Szabo](https://unenumerated.blogspot.com/). Con las entradas adecuadas, se garantiza un cierto resultado o producto.

Para obtener un snack de una máquina expendedora:

```
money + snack selection = snack dispensed
```

Esta lógica está programada en la máquina expendedora.

Un contrato inteligente, como una máquina expendedora, tiene la lógica programada en él. He aquí un ejemplo sencillo de cómo se vería esta máquina expendedora si fuera un contrato inteligente escrito en Solidity:

```solidity
pragma solidity 0.8.7;

contract VendingMachine {

    // Declarar las variables de estado del contrato
    address public owner;
    mapping (address => uint) public cupcakeBalances;

    // Cuando se despliega el contrato 'VendingMachine':
    // 1. establecer la dirección de despliegue como propietaria del contrato
    // 2. establecer el saldo de cupcakes del contrato inteligente desplegado en 100
    constructor() {
        owner = msg.sender;
        cupcakeBalances[address(this)] = 100;
    }

    // Permitir al propietario aumentar el saldo de cupcakes del contrato inteligente
    function refill(uint amount) public {
        require(msg.sender == owner, "Solo el propietario puede recargar.");
        cupcakeBalances[address(this)] += amount;
    }

    // Permitir que cualquiera compre cupcakes
    function purchase(uint amount) public payable {
        require(msg.value >= amount * 1 ether, "Debe pagar al menos 1 ETH por cupcake");
        require(cupcakeBalances[address(this)] >= amount, "No hay suficientes cupcakes en existencias para completar esta compra");
        cupcakeBalances[address(this)] -= amount;
        cupcakeBalances[msg.sender] += amount;
    }
}
```

Del mismo modo que una máquina expendedora elimina la necesidad de un empleado de un proveedor, los contratos inteligentes son capaces de sustituir a los intermediarios en muchas industrias.

## Sin permiso {#permissionless}

Cualquiera puede escribir un contrato inteligente e implementarlo en la red. Solo necesita aprender a programar en un [lenguaje de contratos inteligentes](/developers/docs/smart-contracts/languages/) y tener suficiente ETH para desplegar su contrato. La implementación de un contrato inteligente es técnicamente una transacción, por lo que debe pagar [gas](/developers/docs/gas/) de la misma manera que debe pagar gas por una simple transferencia de ETH. Sin embargo, los costos de gas para la implementación de contratos son mucho mayores.

Ethereum dispone de lenguajes amigables para programadores para que redacten contratos inteligentes:

- Solidez
- Vyper

[Más información sobre lenguajes](/developers/docs/smart-contracts/languages/)

Sin embargo, deben compilarse antes de implementarse para que la máquina virtual de Ethereum pueda interpretar y almacenar el contrato. [Más información sobre la compilación](/developers/docs/smart-contracts/compiling/)

## Capacidad de composición {#composability}

Los contratos inteligentes son públicos en Ethereum y se pueden considerar API abiertas. Esto significa que puede invocar otros contratos inteligentes en su propio contrato inteligente para ampliar en gran medida las posibilidades. Los contratos pueden incluso implementar otros contratos.

Obtenga más información sobre la [capacidad de composición de los contratos inteligentes](/developers/docs/smart-contracts/composability/).

## Limitaciones {#limitations}

Los contratos inteligentes no pueden obtener por sí solos información sobre eventos del «mundo real», porque no pueden obtener datos de fuentes externas a la cadena. Esto significa que no pueden responder a los eventos en el mundo real. Esto es por defecto. Depender de información externa puede poner en peligro el consenso, pieza clave para la seguridad y la descentralización.

Sin embargo, es importante que las aplicaciones de cadena de bloques puedan usar datos externos a la cadena. La solución son los [oráculos](/developers/docs/oracles/), que son herramientas que ingieren datos fuera de cadena y los ponen a disposición de los contratos inteligentes.

Otra limitación de los contratos inteligentes es el tamaño máximo de los contratos. Un contrato inteligente puede tener un máximo de 24 KB; superar esta cantidad supone quedarse sin gas. Esto puede eludirse utilizando [The Diamond Pattern](https://eips.ethereum.org/EIPS/eip-2535).

## Contratos multifirma {#multisig}

Los contratos Multisig (o multifirma) son cuentas de contratos inteligentes que requieren múltiples firmas válidas para ejecutar una transacción. Esto es muy útil para evitar puntos únicos de falla en los contratos con cantidades sustanciales de Eth u otros tokens. Los multifirma también dividen la responsabilidad de la ejecución de contratos y la gestión de claves entre múltiples partes, y evitan la pérdida de una única clave privada que conduzca a una pérdida irreversible de fondos. Por estas razones, los contratos multifirma pueden utilizarse para la gobernanza simple de DAO. Las multifirmas requieren N firmas de M firmas aceptables posibles (donde N ≤ M y M > 1) para ejecutarse. `N = 3, M = 5` y `N = 4, M = 7` se usan comúnmente. Un contrato multifirma 4/7 requiere cuatro de siete firmas válidas posibles. Esto significa que los fondos siguen siendo recuperables, incluso si se pierden tres firmas. En este caso, también significa que la mayoría de los titulares de las claves deben acordar y firmar para que el contrato se ejecute.

## Recursos sobre contratos inteligentes {#smart-contract-resources}

**OpenZeppelin Contracts -** **_Biblioteca para el desarrollo seguro de contratos inteligentes._**

- [openzeppelin.com/contracts/](https://openzeppelin.com/contracts/)
- [GitHub](https://github.com/OpenZeppelin/openzeppelin-contracts)
- [Foro de la comunidad](https://forum.openzeppelin.com/c/general/16)

## Lecturas adicionales {#further-reading}

- [Coinbase: ¿Qué es un contrato inteligente?](https://www.coinbase.com/learn/crypto-basics/what-is-a-smart-contract)
- [Chainlink: ¿Qué es un contrato inteligente?](https://chain.link/education/smart-contracts)
- [Vídeo: Simply Explained - Contratos inteligentes](https://youtu.be/ZE2HxTmxfrI)
- [Cyfrin Updraft: plataforma de aprendizaje y auditoría de Web3](https://updraft.cyfrin.io)
