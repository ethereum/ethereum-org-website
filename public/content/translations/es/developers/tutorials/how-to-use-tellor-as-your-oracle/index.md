---
title: Cómo configurar el contador como tu servidor
description: Una guía para comenzar a integrar el oráculo contador en tu protocolo
author: "Contador"
lang: es
tags:
  - "solidity"
  - "contratos Inteligentes"
  - "oráculos"
skill: beginner
published: 2021-06-29
source: Documentos Tellor
sourceUrl: https://docs.tellor.io/tellor/
---

Pregunta: Su protocolo esta casi terminado, pero necesita de un oracle para tener acceso a datos off-chain..¿Qué necesitas?

## Prerrequisitos (fáciles) {#soft-prerequisites}

Este post pretende hacer que el acceso a una alimentación de oráculo sea lo más directo y sencillo posible. Dicho esto, estamos asumiendo lo siguiente sobre tu nivel de habilidad de codificación para centrarnos en el aspecto del oráculo.

Supuestos:

- puedes navegar por un terminal
- tienes npm instalado
- sabes cómo usar npm para gestionar dependencias

Tellor es un oráculo en vivo y de código abierto listo para su implementación. Esta guía para principiantes está aqui para demostrar la facilidad con la que uno puede implementar y poner en marchar Tellor, proporcionando a tu proyecto con un oracle completamente decentralizado y resistente a la censura.

## Resumen {#overview}

Tellor es un sistema de oráculo donde las partes pueden solicitar el valor de un punto de datos fuera de la cadena (ej. BTC/USD) y los mineros compiten para agregar este valor a un banco de datos en cadena, accesible por todos los contratos ingeligentes de Ethereum. Las entradas a este banco de datos están aseguradas por una red de mineros participativa. Tellor utiliza mecanismos de incentivos criptoeconómicos, recompensando las presentaciones honestas de datos de los mineros y castigando a los malos actores por medio de la emisión del token de Tellor, Tributes (TRB) y un mecanismo de disputa.

En este tutorial abarcaremos:

- Configurar el kit de herramientas inicial que necesitarás para ponerte en marcha.
- Pasar por un ejemplo sencillo.
- Listar las direcciones de la testnet de pruebas de redes en las que actualmente puedes probar Tellor.

## Usando Tellor {#usingtellor}

Lo primero que querrás hacer es instalar las herramientas básicas necesarias para usar Tellor como tu oráculo. Usa [este paquete](https://github.com/tellor-io/usingtellor) para instalar los Contratos de Usuario de Tellor:

`npm install usingtellor`

Una vez instalado esto permitirá a sus contratos heredar las funciones del contrato 'UsingTellor'.

¡Genial! Ahora que las herramientas están listas, continuemos con un pequeño ejercicio donde solicitaremos el precio de bitcoin:

### Ejemplo BTC/USD {#btcusd-example}

Heredar el contrato de UsingTellor, pasando la dirección de Tellor como argumento constructor:

Le mostramos un ejemplo:

```solidity
import "usingtellor/contracts/UsingTellor.sol";

contract PriceContract is UsingTellor {
  uint256 public btcPrice;

 //This Contract now has access to all functions in UsingTellor

constructor(address payable _tellorAddress) UsingTellor(_tellorAddress) public {}

function setBtcPrice() public {
    bytes memory _b = abi.encode("SpotPrice",abi.encode("btc","usd"));
    bytes32 _queryId = keccak256(_b);

    uint256 _timestamp;
    bytes _value;

    (_value, _timestamp) = getDataBefore(_queryId, block.timestamp - 15 minutes);

    btcPrice = abi.decode(_value,(uint256));
  }
}
```

Para un listado completo de direcciones de contrato visite [aquí](https://docs.tellor.io/tellor/the-basics/contracts-reference).

Para la facilidad de uso, el repositorio UsingTellor incluye una versión del contrato de[patio de juegos de Tellor](https://github.com/tellor-io/TellorPlayground) para una integración más fácil. Visite [aquí](https://github.com/tellor-io/sampleUsingTellor#tellor-playground) para un listado de funciones útiles.

Para una implementación más robusta del oráculo de Tellor, revise el listado completo de funciones disponibles [aquí](https://github.com/tellor-io/usingtellor/blob/master/README.md).
