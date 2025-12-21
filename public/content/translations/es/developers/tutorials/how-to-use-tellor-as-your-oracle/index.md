---
title: Cómo configurar Tellor como su oráculo
description: Una guía para empezar a integrar el oráculo Tellor en su protocolo
author: "Tellor"
lang: es
tags: [ "Solidity", "contratos Inteligentes", "oráculos" ]
skill: beginner
published: 29/06/2021
source: Documentación de Tellor
sourceUrl: https://docs.tellor.io/tellor/
---

Pregunta rápida: su protocolo está casi terminado, pero necesita un oráculo para obtener acceso a datos fuera de la cadena... ¿Qué hace?

## (Requisitos recomendados) {#soft-prerequisites}

Esta publicación tiene como objetivo que el acceso a una fuente de datos de oráculo sea lo más simple y directo posible. Dicho esto, presuponemos lo siguiente sobre su nivel de conocimientos de programación para centrarnos en el aspecto del oráculo.

Suposiciones:

- sabe cómo utilizar una terminal
- tiene npm instalado
- sabe cómo usar npm para gestionar las dependencias

Tellor es un oráculo activo y de código abierto listo para su implementación. Esta guía para principiantes demuestra lo fácil que es poner en marcha Tellor, lo que proporciona a su proyecto un oráculo totalmente descentralizado y resistente a la censura.

## Presentación {#overview}

Tellor es un sistema de oráculo en el que las partes pueden solicitar el valor de un punto de datos fuera de la cadena (p. ej., BTC/USD) y los reporteros compiten para añadir este valor a un banco de datos en la cadena, al que pueden acceder todos los contratos inteligentes de Ethereum. Las entradas a este banco de datos están protegidas por una red de reporteros que hacen staking. Tellor utiliza mecanismos de incentivos criptoeconómicos que recompensan las entregas de datos honestas por parte de los reporteros y castigan a los malos actores mediante la emisión del token de Tellor, Tributes (TRB), y un mecanismo de disputas.

En este tutorial veremos:

- La configuración del kit de herramientas inicial que necesitará para ponerse en marcha.
- Un recorrido por un ejemplo sencillo.
- Una lista de las direcciones de las redes de prueba en las que puede probar Tellor actualmente.

## UsingTellor {#usingtellor}

Lo primero que querrá hacer es instalar las herramientas básicas necesarias para usar Tellor como su oráculo. Utilice [este paquete](https://github.com/tellor-io/usingtellor) para instalar los contratos de usuario de Tellor:

`npm install usingtellor`

Una vez instalado, esto permitirá que sus contratos hereden las funciones del contrato 'UsingTellor'.

¡Genial! Ahora que tiene las herramientas listas, vamos a realizar un ejercicio sencillo en el que recuperaremos el precio de Bitcoin:

### Ejemplo de BTC/USD {#btcusd-example}

Herede del contrato UsingTellor, pasando la dirección de Tellor como argumento del constructor:

Le mostramos un ejemplo:

```solidity
import "usingtellor/contracts/UsingTellor.sol";

contract PriceContract is UsingTellor {
  uint256 public btcPrice;

 //Este contrato ahora tiene acceso a todas las funciones en UsingTellor

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

Para obtener una lista completa de las direcciones de los contratos, consulte [aquí](https://docs.tellor.io/tellor/the-basics/contracts-reference).

Para facilitar su uso, el repositorio de UsingTellor incluye una versión del contrato [Tellor Playground](https://github.com/tellor-io/TellorPlayground) para una integración más sencilla. Consulte [aquí](https://github.com/tellor-io/sampleUsingTellor#tellor-playground) una lista de funciones útiles.

Para una implementación más robusta del oráculo Tellor, consulte la lista completa de funciones disponibles [aquí](https://github.com/tellor-io/usingtellor/blob/master/README.md).
