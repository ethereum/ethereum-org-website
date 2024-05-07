---
title: "EIP-1271: Firma y verificación de firmas de contratos inteligentes"
description: Una visión general de la generación y verificación de la firma de contrato inteligente con EIP-1271. También recorremos la implementación de EIP-1271 utilizada en Safe (anteriormente Gnosis Safe) para proporcionar un ejemplo concreto para que los desarrolladores de contratos inteligentes puedan construir.
author: Nathan H. Leung
lang: es
tags:
  - "EIP-1271"
  - "contratos inteligentes"
  - "verificación"
  - "firma"
skill: intermediate
published: 2023-01-12
---

El estándar [EIP-1271](https://eips.ethereum.org/EIPS/eip-1271) permite que los contratos inteligentes verifiquen las firmas.

En este tutorial, damos una visión general de las firmas digitales, los antecedentes de EIP-1271 y la implementación específica de EIP-1271 utilizada por [Safe](https://safe.global/) (anteriormente Gnosis Safe). En conjunto, esto puede servir como punto de partida para implementar el EIP-1271 en sus propios contratos.

## ¿Qué es una firma?

En este contexto, una firma (más precisamente, una «firma digital») es un mensaje, además de ser algún tipo de prueba de que el mensaje provino de una persona/remitente/dirección específica.

Por ejemplo, una firma digital podría tener el siguiente aspecto:

1. Mensaje: "Quiero iniciar sesión en este sitio web con mi cartera de Ethereum."
2. Firmante: Mi dirección es `0x000... `
3. Prueba: Aquí hay alguna prueba de que yo, `0x000... `, en realidad creé todo este mensaje (esto es generalmente algo criptográfico).

Es importante tener en cuenta que una firma digital incluye tanto un «mensaje» como una «firma».

¿Por qué? Por ejemplo, si me diera un contrato para firmar, y luego cortara la página de firma y le devolviera solo mis firmas sin el resto del contrato, el contrato no sería válido.

De la misma manera, ¡una firma digital no significa nada sin un mensaje asociado!

## ¿Por qué existe EIP-1271?

Con el fin de crear una firma digital para su uso en cadenas de bloques basadas en Ethereum, por lo general se necesita una clave privada secreta que nadie más sabe. Esto es lo que hace que su firma sea suya (nadie más puede crear la misma firma sin el conocimiento de la clave secreta).

Su cuenta de Ethereum (p. ej., su cuenta de propiedad externa/EOA) tiene una clave privada asociada a esta y suele utilizarse cuando un sitio web o una DApp le solicita una firma (p. ej., para «Iniciar sesión con Ethereum»).

Una aplicación puede [verificar una firma](https://docs.alchemy.com/docs/how-to-verify-a-message-signature-on-ethereum) creada utilizando una biblioteca de terceros como ethers.js [sin conocer su clave privada](https://en.wikipedia.org/wiki/Public-key_cryptography) y tener plena confianza en que _tú_ usted creó la firma.

> De hecho, porque las cuentas de propiedad externa utilizan la criptografía de clave pública, ¡estas pueden ser generadas y verificadas **fuera de la cadena**! Así es como funciona la votación DAO sin gas: en vez de enviar votos en la cadena, las firmas digitales pueden ser creadas y verificadas fuera de la cadena utilizando bibliotecas criptográficas.

Mientras las cuentas de propiedad externa tienen una clave privada, las cuentas de contratos inteligentes no tienen ningún tipo de clave privada o secreta (entonces el «Inicio de sesión con Ethereum», entre otros, no funcionan de manera nativa sin las cuentas de contratos inteligentes).

El problema que EIP-1271 busca solucionar: ¿cómo podemos decir que la firma de un contrato inteligente es válida si el contrato inteligente no tiene algún «secreto» que pueda incorporar en la firma?

## ¿Cómo funciona EIP-1271?

Los contratos inteligentes no tienen claves privadas que se puedan utilizar para firmar mensajes. ¿Entonces cómo podemos saber si una firma es auténtica?

Bueno, ¡una idea es que podemos _preguntar_ al contrato inteligente si una firma es auténtica!

Lo que EIP-1271 hace es normalizar esta idea «preguntando» a un contrato inteligente si una firma proporcionada es válida.

Un contrato donde se implementa EIP-1271 debe tener una función llamada `isValidSignature` que tiene lugar en un mensaje y una firma. Luego, el contrato puede ejecutar algo de lógica de validación (aquí la especificación no hace valer algo en específico) y luego devuelve un valor indicando si la firma es válida o no.

Si `isValidSignature` devuelve un resultado válido, es como si el contrato hablara y dijera: «¡Sí, apruebo esta firma + mensaje!».

### Interfaz

Aquí está la interfaz exacta en la especificación EIP-1271 (hablaremos sobre el parámetro `_hash` abajo, pero por ahora, considérleo como el mensaje que se está verificando):

```jsx
pragma solidity ^0.5.0;

contract ERC1271 {

  // bytes4(keccak256("isValidSignature(bytes32,bytes)")
  bytes4 constant internal MAGICVALUE = 0x1626ba7e;

  /**
   * @dev Should return whether the signature provided is valid for the provided hash
   * @param _hash      Hash of the data to be signed
   * @param _signature Signature byte array associated with _hash
   *
   * MUST return the bytes4 magic value 0x1626ba7e when function passes.
   * MUST NOT modify state (using STATICCALL for solc < 0.5, view modifier for solc > 0.5)
   * MUST allow external calls
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

Los contratos pueden implementar `isValidSignature` de varias maneras, la especificación no dice mucho sobre la implementación exacta.

Un contrato destacado que implementa EIP-1271 es Safe (previamente Gnosis Safe).

En el código de Safe, `isValidSignature` [se implementa](https://github.com/safe-global/safe-contracts/blob/main/contracts/handler/CompatibilityFallbackHandler.sol) para que las firmas se creen y comprueben en [de dos maneras:](https://ethereum.stackexchange.com/questions/122635/signing-messages-as-a-gnosis-safe-eip1271-support):

1. Mensajes en cadena
   1. Creación: un propietario seguro crea una nueva transacción segura para «firmar» un mensaje, pasando el mensaje como dato en la transacción. Una vez que suficientes propietarios han firmado la transacción para alcanzar el umbral multifirma, la transacción se transmite y se ejecuta. En la transacción, hay una función segura activada cuando añade el mensaje a un listado de mensajes «aprobados».
   2. Verificación: activa `isValidSignature` en el contrato Safe y pasa el mensaje por verificar como el parámetro del mensaje y [un valor vacío para el parámetro de firma](https://github.com/safe-global/safe-contracts/blob/main/contracts/handler/CompatibilityFallbackHandler.sol#L32) (ej: `0x`). Safe verá que el parámetro de firma está vacío y en vez de verificar criptográficamente la firma, sabrá que debe continuar y revisar si el mensaje se encuentra en el listado de mensajes «aprobados».
2. Mensajes fuera de la cadena:
   1. Creación: un propietario seguro crea un mensaje fuera de cadena, luego solicita a otros propietarios seguros que cada uno firme el mensaje individualmente hasta que haya una cantidad suficiente de firmas para superar el umbral de aprobación multifirma.
   2. Verificación: activa `isValidSignature`. En el parámetro mensaje, pasa el mensaje por verificar. En el parámetro firma, pasa las firmas de cada propietario seguro de manera concatenada. Safe revisará que haya suficientes firmas para cumplir el umbral **y** que cada firma es válida. Si lo es, devuelve un valor indicando que la verificación de la firma se realizó correctamente.

## ¿Qué es exactamente el parámetro `_hash`? ¿Por qué no pasar el mensaje completo?

Puede que haya notado que la función `isValidSignature` en la [interfaz EIP-1271](https://eips.ethereum.org/EIPS/eip-1271) no toma el mensaje en sí mismo, en su lugar toma un parámetro `_hash`. Esto significa que en vez de pasar completamente el mensaje arbitrariamente a `isValidSignature`, para un hash de 32-bytes del mensaje (generalmente keccak256).

Cada byte de Calldata, p- ej., datos del parámetro función pasados a la función de un contrato inteligente, [ cuesta 16 gas (4 gas en si hay cero bytes)](https://eips.ethereum.org/EIPS/eip-2028), por lo que puede ahorrar mucho gas si el mensaje es largo.

### Especificaciones previas de EIP-1271

Hay especificaciones EIP-1271 en varias partes que tienen una función `isValidSignature` con un primer parámetro del tipo `bytes` (longitud arbitraria, en vez de una longitud fija de `bytes32`) y el parámetro nombre `message`. Esto es una [versión anterior](https://github.com/safe-global/safe-contracts/issues/391#issuecomment-1075427206) del estándar EIP-1271.

## ¿Cómo debería implementar EIP-1271 en mis propios contratos?

Aquí la especificación tiene un final muy abierto. La implementación Safe tiene algunas buenas ideas:

- Puede considerar firmas EOA del «propietario» del contrato como válidas.
- Podría almacenar un listado de mensajes del aprobador y sólo considerar aquellos que sean válidos.

A fin de cuentas, ¡depende de usted, porque es el desarrollador del contrato!

## Conclusión

[EIP-1271](https://eips.ethereum.org/EIPS/eip-1271) es un estándar versátil que permite a los contratos inteligentes verificar firmas. Esto abre la puerta para que los contratos inteligentes actúen más como EOA, por ejemplo, proporcionando una manera de «Iniciar sesión con Ethereum» para trabajar con contratos inteligentes, e implementarse de varias manereas (Safe tiene una implementación interesante y nada convencional que debería considerar).
