---
title: "Introducción a los contratos inteligentes"
description: "Una descripción general de los contratos inteligentes, centrada en sus características y limitaciones únicas."
lang: es
---

## ¿Qué es un contrato inteligente? {#what-is-a-smart-contract}

Un "contrato inteligente" es simplemente un programa que se ejecuta en la cadena de bloques de [Ethereum](/). Es una colección de código (sus funciones) y datos (su estado) que reside en una dirección específica en la cadena de bloques de Ethereum.

Los contratos inteligentes son un tipo de [cuenta de Ethereum](/developers/docs/accounts/). Esto significa que tienen un saldo y pueden ser el destino de transacciones. Sin embargo, no están controlados por un usuario, sino que se despliegan en la red y se ejecutan según lo programado. Las cuentas de usuario pueden interactuar con un contrato inteligente enviando transacciones que ejecutan una función definida en el contrato inteligente. Los contratos inteligentes pueden definir reglas, como un contrato normal, y aplicarlas automáticamente a través del código. Los contratos inteligentes no se pueden eliminar por defecto, y las interacciones con ellos son irreversibles.

## Requisitos previos {#prerequisites}

Si recién estás comenzando o buscas una introducción menos técnica, te recomendamos nuestra [introducción a los contratos inteligentes](/smart-contracts/).

Asegúrate de haber leído sobre las [cuentas](/developers/docs/accounts/), las [transacciones](/developers/docs/transactions/) y la [máquina virtual de Ethereum](/developers/docs/evm/) antes de adentrarte en el mundo de los contratos inteligentes.

## Una máquina expendedora digital {#a-digital-vending-machine}

Quizás la mejor metáfora para un contrato inteligente sea una máquina expendedora, tal como la describe [Nick Szabo](https://unenumerated.blogspot.com/). Con las entradas correctas, se garantiza un resultado determinado.

Para obtener un bocadillo de una máquina expendedora:

```
dinero + selección de bocadillo = bocadillo dispensado
```

Esta lógica está programada en la máquina expendedora.

Un contrato inteligente, al igual que una máquina expendedora, tiene lógica programada en él. Aquí hay un ejemplo simple de cómo se vería esta máquina expendedora si fuera un contrato inteligente escrito en Solidity:

```solidity
pragma solidity 0.8.7;

contract VendingMachine {

    // Declarar las variables de estado del contrato
    address public owner;
    mapping (address => uint) public cupcakeBalances;

    // Cuando se despliega el contrato 'VendingMachine':
    // 1. establecer la dirección de despliegue como propietario del contrato
    // 2. establecer el saldo de cupcakes del contrato inteligente desplegado en 100
    constructor() {
        owner = msg.sender;
        cupcakeBalances[address(this)] = 100;
    }

    // Permitir al propietario aumentar el saldo de cupcakes del contrato inteligente
    function refill(uint amount) public {
        require(msg.sender == owner, "Only the owner can refill.");
        cupcakeBalances[address(this)] += amount;
    }

    // Permitir a cualquiera comprar cupcakes
    function purchase(uint amount) public payable {
        require(msg.value >= amount * 1 ether, "You must pay at least 1 ETH per cupcake");
        require(cupcakeBalances[address(this)] >= amount, "Not enough cupcakes in stock to complete this purchase");
        cupcakeBalances[address(this)] -= amount;
        cupcakeBalances[msg.sender] += amount;
    }
}
```

Al igual que una máquina expendedora elimina la necesidad de un empleado vendedor, los contratos inteligentes pueden reemplazar a los intermediarios en muchas industrias.

## Sin permisos {#permissionless}

Cualquiera puede escribir un contrato inteligente y desplegarlo en la red. Solo necesitas aprender a programar en un [lenguaje de contratos inteligentes](/developers/docs/smart-contracts/languages/) y tener suficiente ETH para desplegar tu contrato. Desplegar un contrato inteligente es técnicamente una transacción, por lo que debes pagar [gas](/developers/docs/gas/) de la misma manera que necesitas pagar gas por una simple transferencia de ETH. Sin embargo, los costos de gas para el despliegue de contratos son mucho más altos.

Ethereum tiene lenguajes amigables para los desarrolladores para escribir contratos inteligentes:

- Solidity
- Vyper

[Más sobre lenguajes](/developers/docs/smart-contracts/languages/)

Sin embargo, deben compilarse antes de poder desplegarse para que la máquina virtual de Ethereum pueda interpretar y almacenar el contrato. [Más sobre la compilación](/developers/docs/smart-contracts/compiling/)

## Composabilidad {#composability}

Los contratos inteligentes son públicos en Ethereum y pueden considerarse como API abiertas. Esto significa que puedes llamar a otros contratos inteligentes en tu propio contrato inteligente para ampliar enormemente lo que es posible. Los contratos incluso pueden desplegar otros contratos.

Aprende más sobre la [composabilidad de los contratos inteligentes](/developers/docs/smart-contracts/composability/).

## Limitaciones {#limitations}

Los contratos inteligentes por sí solos no pueden obtener información sobre eventos del "mundo real" porque no pueden recuperar datos de fuentes fuera de la cadena. Esto significa que no pueden responder a eventos en el mundo real. Esto es por diseño. Depender de información externa podría poner en peligro el consenso, lo cual es importante para la seguridad y la descentralización.

Sin embargo, es importante que las aplicaciones de la cadena de bloques puedan usar datos fuera de la cadena. La solución son los [oráculos](/developers/docs/oracles/), que son herramientas que ingieren datos fuera de la cadena y los ponen a disposición de los contratos inteligentes.

Otra limitación de los contratos inteligentes es el tamaño máximo del contrato. Un contrato inteligente puede tener un máximo de 24 KB o se quedará sin gas. Esto se puede eludir utilizando [el patrón diamante](https://eips.ethereum.org/EIPS/eip-2535).

## Contratos multifirma {#multisig}

Los contratos multifirma (de firmas múltiples) son cuentas de contratos inteligentes que requieren múltiples firmas válidas para ejecutar una transacción. Esto es muy útil para evitar puntos únicos de falla en contratos que contienen cantidades sustanciales de ether u otros tokens. Las multifirmas también dividen la responsabilidad de la ejecución del contrato y la gestión de claves entre múltiples partes y evitan que la pérdida de una sola clave privada provoque la pérdida irreversible de fondos. Por estas razones, los contratos multifirma se pueden utilizar para la gobernanza simple de una DAO. Las multifirmas requieren N firmas de M firmas aceptables posibles (donde N ≤ M, y M > 1) para poder ejecutarse. `N = 3, M = 5` y `N = 4, M = 7` se utilizan comúnmente. Una multifirma 4/7 requiere cuatro de siete firmas válidas posibles. Esto significa que los fondos aún se pueden recuperar incluso si se pierden tres firmas. En este caso, también significa que la mayoría de los titulares de claves deben estar de acuerdo y firmar para que el contrato se ejecute.

## Recursos sobre contratos inteligentes {#smart-contract-resources}

**Contratos de OpenZeppelin -** **_Biblioteca para el desarrollo seguro de contratos inteligentes._**

- [openzeppelin.com/contracts/](https://openzeppelin.com/contracts/)
- [GitHub](https://github.com/OpenZeppelin/openzeppelin-contracts)
- [Foro de la comunidad](https://forum.openzeppelin.com/c/general/16)

## Lecturas adicionales {#further-reading}

- [Coinbase: ¿Qué es un contrato inteligente?](https://www.coinbase.com/learn/crypto-basics/what-is-a-smart-contract)
- [Chainlink: ¿Qué es un contrato inteligente?](https://chain.link/education/smart-contracts)
- [Video: Explicación sencilla - Contratos inteligentes](https://youtu.be/ZE2HxTmxfrI)
- [Cyfrin Updraft: Plataforma de aprendizaje y auditoría de Web3](https://updraft.cyfrin.io)

## Tutoriales: Firmas de contratos inteligentes (EIP-1271) en Ethereum {#tutorials}

- [EIP-1271: Firmar y verificar firmas de contratos inteligentes](/developers/tutorials/eip-1271-smart-contract-signatures/) _– Cómo EIP-1271 permite a los contratos inteligentes verificar firmas, con un recorrido por la implementación de Safe._