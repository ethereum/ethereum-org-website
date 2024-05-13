---
title: Cómo configurar Tellor como su oráculo
description: Guía para comenzar a integrar el oráculo Tellor en su protocolo
author: "Tellor"
lang: es
tags:
  - "solidity"
  - "contratos inteligentes"
  - "oráculos"
skill: beginner
published: 2021-06-29
source: Documentos sobre Tellor
sourceUrl: https://docs.tellor.io/tellor/
---

Pregunta: Su protocolo está casi terminado, pero necesita un oráculo para tener acceso a datos fuera de la cadena... ¿Qué necesita?

## Requisitos previos (fácil) {#soft-prerequisites}

Esta publicación tiene como objetivo hacer que el acceso a un feed de oráculo sea lo más simple y directo posible. Dicho esto, vamos a asumir lo siguiente sobre su nivel de habilidad de codificación para centrarnos en el aspecto del oráculo.

Supuestos:

- Puede navegar por un terminal.
- Tiene npm instalado.
- Sabe cómo usar npm para gestionar dependencias.

Tellor es un oráculo en vivo y de código abierto listo para su implementación. Esta guía para principiantes está aqui para demostrar la facilidad con la que uno puede implementar y poner en marcha Tellor, proporcionando a su proyecto un oráculo completamente descentralizado y resistente a la censura.

## Resumen {#overview}

Tellor es un sistema de oráculo donde las partes pueden solicitar el valor de un punto de datos fuera de la cadena (p. ej., BTC/USD) y los informantes compiten para agregar este valor a un banco de datos en cadena, accesible para todos los contratos inteligentes de Ethereum. Las entradas a este banco de datos están aseguradas por una red de informantes que hacen staking. Tellor utiliza mecanismos de incentivos criptoeconómicos, recompensando las presentaciones de datos honestas de los informantes y castigando a los malos actores por medio de la emisión del token de Tellor, Tributes (TRB), y un mecanismo de disputa.

En este tutorial veremos:

- Configurar el kit de herramientas inicial que necesitará para comenzar.
- Analizar un ejemplo sencillo.
- Listar direcciones de redes de prueba en las que actualmente puede probar Tellor.

## UsingTellor {#usingtellor}

Lo primero que debe hacer es instalar las herramientas básicas necesarias para usar Tellor como oráculo. Use [este paquete](https://github.com/tellor-io/usingtellor) para instalar los contratos de usuario de Tellor:

`npm install usingtellor`

Una vez instalado, esto permitirá a sus contratos heredar las funciones del contrato "UsingTellor".

¡Genial! Ahora que las herramientas están listas, continuemos con un pequeño ejercicio donde solicitaremos el precio de bitcoin:

### Ejemplo de BTC/USD {#btcusd-example}

Herede el contrato UsingTellor, pasando la dirección de Tellor como argumento de constructor:

Aquí hay un ejemplo:

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

Para ver un listado completo de direcciones de contrato, visite [este enlace](https://docs.tellor.io/tellor/the-basics/contracts-reference).

Para la facilidad de uso, el repositorio UsingTellor incluye una versión del contrato [Tellor Playground](https://github.com/tellor-io/TellorPlayground) para una integración más fácil. Visite [aquí](https://github.com/tellor-io/sampleUsingTellor#tellor-playground) para un listado de funciones útiles.

Para una implementación más sólida del oráculo de Tellor, revise el listado completo de funciones disponibles [aquí](https://github.com/tellor-io/usingtellor/blob/master/README.md).
