---
title: "Cómo configurar Tellor como tu oráculo"
description: "Una guía para empezar a integrar el oráculo de Tellor en tu protocolo"
author: "Tellor"
lang: es
tags: ["Solidity", "contratos inteligentes", "oráculos"]
skill: beginner
breadcrumb: "Oráculo de Tellor"
published: 2021-06-29
source: Tellor Docs
sourceUrl: https://docs.tellor.io/tellor/
---

Examen sorpresa: tu protocolo está casi terminado, pero necesita un oráculo para acceder a datos fuera de la cadena... ¿Qué haces?

## Requisitos previos (flexibles) {#soft-prerequisites}

Esta publicación tiene como objetivo hacer que el acceso a un feed de oráculo sea lo más simple y directo posible. Dicho esto, asumimos lo siguiente sobre tu nivel de habilidad de programación para centrarnos en el aspecto del oráculo.

Suposiciones:

- puedes navegar por una terminal
- tienes npm instalado
- sabes cómo usar npm para gestionar dependencias

Tellor es un oráculo en vivo y de código abierto listo para su implementación. Esta guía para principiantes está aquí para mostrar la facilidad con la que uno puede ponerse en marcha con Tellor, proporcionando a tu proyecto un oráculo totalmente descentralizado y resistente a la censura.

## Descripción general {#overview}

Tellor es un sistema de oráculo donde las partes pueden solicitar el valor de un punto de datos fuera de la cadena (por ejemplo, BTC/USD) y los reporteros compiten para agregar este valor a un banco de datos en cadena, accesible por todos los contratos inteligentes de Ethereum. Las entradas a este banco de datos están aseguradas por una red de reporteros con participación depositada en garantía. Tellor utiliza mecanismos de incentivos criptoeconómicos, recompensando los envíos de datos honestos por parte de los reporteros y castigando a los malos actores a través de la emisión del token de Tellor, Tributes (TRB), y un mecanismo de disputa.

En este tutorial repasaremos:

- La configuración del conjunto de herramientas inicial que necesitarás para ponerte en marcha.
- Un recorrido por un ejemplo sencillo.
- Una lista de las direcciones de la red de prueba de las redes en las que actualmente puedes probar Tellor.

## UsingTellor {#usingtellor}

Lo primero que querrás hacer es instalar las herramientas básicas necesarias para usar Tellor como tu oráculo. Usa [este paquete](https://github.com/tellor-io/usingtellor) para instalar los contratos de usuario de Tellor (Tellor User Contracts):

`npm install usingtellor`

Una vez instalado, esto permitirá que tus contratos hereden las funciones del contrato 'UsingTellor'.

¡Genial! Ahora que tienes las herramientas listas, hagamos un ejercicio sencillo en el que recuperamos el precio de Bitcoin:

### Ejemplo de BTC/USD {#btcusd-example}

Hereda el contrato UsingTellor, pasando la dirección de Tellor como argumento del constructor:

Aquí tienes un ejemplo:

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

Para obtener una lista completa de las direcciones de los contratos, consulta [aquí](https://docs.tellor.io/tellor/the-basics/contracts-reference).

Para facilitar su uso, el repositorio de UsingTellor viene con una versión del contrato [Tellor Playground](https://github.com/tellor-io/TellorPlayground) para una integración más sencilla. Consulta [aquí](https://github.com/tellor-io/sampleUsingTellor#tellor-playground) para ver una lista de funciones útiles.

Para una implementación más robusta del oráculo de Tellor, echa un vistazo a la lista completa de funciones disponibles [aquí](https://github.com/tellor-io/usingtellor/blob/master/README.md).