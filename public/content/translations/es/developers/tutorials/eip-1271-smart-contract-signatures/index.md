---
title: "EIP-1271: Firma y verificación de firmas de contratos inteligentes"
description: Una visión general de la generación y verificación de la firma de contrato inteligente con EIP-1271. También recorremos la implementación de EIP-1271 utilizada en Safe (anteriormente Gnosis Safe) para proporcionar un ejemplo concreto para que los desarrolladores de contratos inteligentes puedan construir.
author: Nathan H. Leung
lang: es
tags:
  [
    "EIP-1271",
    "contratos Inteligentes",
    "verificación",
    "firma"
  ]
skill: intermediate
published: 12-1-2023
---

El estándar [EIP-1271](https://eips.ethereum.org/EIPS/eip-1271) permite a los contratos inteligentes verificar firmas.

En este tutorial, ofrecemos una descripción general de las firmas digitales, los antecedentes de EIP-1271 y la implementación específica de EIP-1271 utilizada por [Safe](https://safe.global/) (anteriormente Gnosis Safe). En conjunto, esto puede servir como punto de partida para implementar el EIP-1271 en sus propios contratos.

## ¿Qué es una firma?

En este contexto, una firma (más precisamente, una «firma digital») es un mensaje, además de ser algún tipo de prueba de que el mensaje provino de una persona/remitente/dirección específica.

Por ejemplo, una firma digital podría tener el siguiente aspecto:

1. Mensaje: "Quiero iniciar sesión en este sitio web con mi cartera de Ethereum."
2. Firmante: Mi dirección es `0x000…`
3. Prueba: Aquí hay una prueba de que yo, `0x000…`, realmente creé este mensaje completo (esto suele ser algo criptográfico).

Es importante tener en cuenta que una firma digital incluye tanto un «mensaje» como una «firma».

¿Por qué? Por ejemplo, si me diera un contrato para firmar, y luego cortara la página de firma y le devolviera solo mis firmas sin el resto del contrato, el contrato no sería válido.

De la misma manera, ¡una firma digital no significa nada sin un mensaje asociado!

## ¿Por qué existe EIP-1271?

Con el fin de crear una firma digital para su uso en cadenas de bloques basadas en Ethereum, por lo general se necesita una clave privada secreta que nadie más sabe. Esto es lo que hace que su firma sea suya (nadie más puede crear la misma firma sin el conocimiento de la clave secreta).

Su cuenta de Ethereum (es decir, su cuenta de propiedad externa/EOA) tiene una clave privada asociada, y esta es la clave privada que se usa normalmente cuando un sitio web o una dapp le piden una firma (p. ej., para «Iniciar sesión con Ethereum»).

Una aplicación puede [verificar una firma](https://www.alchemy.com/docs/how-to-verify-a-message-signature-on-ethereum) que usted cree usando una biblioteca de terceros como ethers.js [sin conocer su clave privada](https://en.wikipedia.org/wiki/Public-key_cryptography) y tener la certeza de que fue _usted_ quien creó la firma.

> De hecho, como las firmas digitales de EOA utilizan la criptografía de clave pública, ¡pueden generarse y verificarse **fuera de la cadena**! Así es como funciona la votación de DAO sin gas: en lugar de enviar los votos en la cadena, las firmas digitales pueden crearse y verificarse fuera de la cadena utilizando bibliotecas criptográficas.

Mientras las cuentas de propiedad externa tienen una clave privada, las cuentas de contratos inteligentes no tienen ningún tipo de clave privada o secreta (entonces el «Inicio de sesión con Ethereum», entre otros, no funcionan de manera nativa sin las cuentas de contratos inteligentes).

El problema que EIP-1271 busca solucionar: ¿cómo podemos decir que la firma de un contrato inteligente es válida si el contrato inteligente no tiene algún «secreto» que pueda incorporar en la firma?

## ¿Cómo funciona EIP-1271?

Los contratos inteligentes no tienen claves privadas que se puedan utilizar para firmar mensajes. ¿Entonces cómo podemos saber si una firma es auténtica?

Bueno, una idea es que podemos _preguntarle_ al contrato inteligente ¡si una firma es auténtica!

Lo que EIP-1271 hace es normalizar esta idea «preguntando» a un contrato inteligente si una firma proporcionada es válida.

Un contrato que implementa el EIP-1271 debe tener una función llamada `isValidSignature` que toma un mensaje y una firma. Luego, el contrato puede ejecutar algo de lógica de validación (aquí la especificación no hace valer algo en específico) y luego devuelve un valor indicando si la firma es válida o no.

Si `isValidSignature` devuelve un resultado válido, es básicamente el contrato diciendo «¡sí, apruebo esta firma + mensaje!».

### Interfaz

Esta es la interfaz exacta en la especificación del EIP-1271 (hablaremos del parámetro `_hash` más adelante, pero por ahora, considérelo como el mensaje que se está verificando):

```jsx
pragma solidity ^0.5.0;

contract ERC1271 {

  // bytes4(keccak256("isValidSignature(bytes32,bytes)")
  bytes4 constant internal MAGICVALUE = 0x1626ba7e;

  /**
   * @dev Debería devolver si la firma proporcionada es válida para el hash proporcionado
   * @param _hash      Hash de los datos a firmar
   * @param _signature Matriz de bytes de la firma asociada a _hash
   *
   * DEBE devolver el valor mágico bytes4 0x1626ba7e cuando la función se ejecuta correctamente.
   * NO DEBE modificar el estado (usando STATICCALL para solc < 0.5, modificador de vista para solc > 0.5)
   * DEBE permitir llamadas externas
   */
  function isValidSignature(
    bytes32 _hash,
    bytes memory _signature)
    public
    view
    returns (bytes4 magicValue);
}
```

## Implementación EIP-1271 de ejemplo: Safe

Los contratos pueden implementar `isValidSignature` de muchas maneras; la especificación no dice mucho sobre la implementación exacta.

Un contrato destacado que implementa EIP-1271 es Safe (previamente Gnosis Safe).

En el código de Safe, `isValidSignature` [está implementado](https://github.com/safe-global/safe-contracts/blob/main/contracts/handler/CompatibilityFallbackHandler.sol) de modo que las firmas pueden crearse y verificarse de [dos maneras](https://ethereum.stackexchange.com/questions/122635/signing-messages-as-a-gnosis-safe-eip1271-support):

1. Mensajes en la cadena
   1. Creación: un propietario seguro crea una nueva transacción segura para «firmar» un mensaje, pasando el mensaje como dato en la transacción. Una vez que suficientes propietarios han firmado la transacción para alcanzar el umbral multifirma, la transacción se transmite y se ejecuta. En la transacción, hay una función segura activada cuando añade el mensaje a un listado de mensajes «aprobados».
   2. Verificación: llame a `isValidSignature` en el contrato de Safe y pase el mensaje a verificar como el parámetro de mensaje y [un valor vacío para el parámetro de la firma](https://github.com/safe-global/safe-contracts/blob/main/contracts/handler/CompatibilityFallbackHandler.sol#L32) (es decir, `0x`). Safe verá que el parámetro de firma está vacío y en vez de verificar criptográficamente la firma, sabrá que debe continuar y revisar si el mensaje se encuentra en el listado de mensajes «aprobados».
2. Mensajes fuera de la cadena:
   1. Creación: el propietario de un Safe crea un mensaje fuera de la cadena, luego consigue que otros propietarios del Safe firmen el mensaje individualmente hasta que haya suficientes firmas para superar el umbral de aprobación de la multifirma.
   2. Verificación: llame a `isValidSignature`. En el parámetro mensaje, pasa el mensaje por verificar. En el parámetro firma, pasa las firmas de cada propietario seguro de manera concatenada. El Safe comprobará que hay suficientes firmas para cumplir el umbral **y** que cada firma es válida. Si lo es, devuelve un valor indicando que la verificación de la firma se realizó correctamente.

## ¿Qué es exactamente el parámetro `_hash`? ¿Por qué no pasar el mensaje completo?

Puede que haya notado que la función `isValidSignature` en la [interfaz del EIP-1271](https://eips.ethereum.org/EIPS/eip-1271) no toma el mensaje en sí, sino un parámetro `_hash`. Lo que esto significa es que, en lugar de pasar el mensaje completo de longitud arbitraria a `isValidSignature`, pasamos un hash de 32 bytes del mensaje (generalmente keccak256).

Cada byte de calldata (es decir, los datos de los parámetros de la función pasados a una función del contrato inteligente) [cuesta 16 de gas (4 de gas si el byte es cero)](https://eips.ethereum.org/EIPS/eip-2028), por lo que esto puede ahorrar mucho gas si un mensaje es largo.

### Especificaciones previas de EIP-1271

Existen especificaciones de EIP-1271 en circulación que tienen una función `isValidSignature` con un primer parámetro de tipo `bytes` (longitud arbitraria, en lugar de una longitud fija `bytes32`) y nombre de parámetro `message`. Esta es una [versión más antigua](https://github.com/safe-global/safe-contracts/issues/391#issuecomment-1075427206) del estándar EIP-1271.

## ¿Cómo debería implementar EIP-1271 en mis propios contratos?

Aquí la especificación tiene un final muy abierto. La implementación Safe tiene algunas buenas ideas:

- Puede considerar firmas EOA del «propietario» del contrato como válidas.
- Podría almacenar un listado de mensajes del aprobador y sólo considerar aquellos que sean válidos.

A fin de cuentas, ¡depende de usted, porque es el desarrollador del contrato!

## Conclusión

[EIP-1271](https://eips.ethereum.org/EIPS/eip-1271) es un estándar versátil que permite a los contratos inteligentes verificar firmas. Esto abre la puerta para que los contratos inteligentes actúen más como EOA, por ejemplo, proporcionando una manera de «Iniciar sesión con Ethereum» para trabajar con contratos inteligentes, e implementarse de varias manereas (Safe tiene una implementación interesante y nada convencional que debería considerar).
