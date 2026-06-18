---
title: "EIP-1271: Firmar y verificar firmas de contratos inteligentes"
description: Una descripción general de la generación y verificación de firmas de contratos inteligentes con EIP-1271. También analizamos la implementación de EIP-1271 utilizada en Safe (anteriormente Gnosis Safe) para proporcionar un ejemplo concreto sobre el cual los desarrolladores de contratos inteligentes puedan construir.
author: Nathan H. Leung
lang: es
tags: ["eip-1271", "contratos inteligentes", "verificar", "firmar"]
skill: intermediate
breadcrumb: Firmas EIP-1271
published: 2023-01-12
---

El estándar [EIP-1271](https://eips.ethereum.org/EIPS/eip-1271) permite a los contratos inteligentes verificar firmas.

En este tutorial, ofrecemos una descripción general de las firmas digitales, los antecedentes de EIP-1271 y la implementación específica de EIP-1271 utilizada por [Safe](https://safe.global/) (anteriormente Gnosis Safe). En conjunto, esto puede servir como punto de partida para implementar EIP-1271 en sus propios contratos.

## ¿Qué es una firma? {#what-is-a-signature}

En este contexto, una firma (más precisamente, una «firma digital») es un mensaje más algún tipo de prueba de que el mensaje provino de una persona/remitente/dirección específica.

Por ejemplo, una firma digital podría verse así:

1. Mensaje: «Quiero iniciar sesión en este sitio web con mi billetera de Ethereum».
2. Firmante: Mi dirección es `0x000…`
3. Prueba: Aquí hay alguna prueba de que yo, `0x000…`, realmente creé todo este mensaje (esto suele ser algo criptográfico).

Es importante tener en cuenta que una firma digital incluye tanto un «mensaje» como una «firma».

¿Por qué? Por ejemplo, si me diera un contrato para firmar, y luego yo cortara la página de la firma y le devolviera solo mis firmas sin el resto del contrato, el contrato no sería válido.

De la misma manera, ¡una firma digital no significa nada sin un mensaje asociado!

## ¿Por qué existe EIP-1271? {#why-does-eip-1271-exist}

Para crear una firma digital para su uso en cadenas de bloques basadas en Ethereum, generalmente necesita una clave privada secreta que nadie más conoce. Esto es lo que hace que su firma sea suya (nadie más puede crear la misma firma sin conocer la clave secreta).

Su cuenta de Ethereum (es decir, su cuenta de propiedad externa o EOA) tiene una clave privada asociada, y esta es la clave privada que se usa típicamente cuando un sitio web o aplicación descentralizada (dapp) le pide una firma (por ejemplo, para «Iniciar sesión con Ethereum»).

Una aplicación puede [verificar una firma](https://www.alchemy.com/docs/how-to-verify-a-message-signature-on-ethereum) que usted cree utilizando una biblioteca de terceros como ethers.js [sin conocer su clave privada](https://en.wikipedia.org/wiki/Public-key_cryptography) y estar segura de que _usted_ fue quien creó la firma.

> De hecho, debido a que las firmas digitales de EOA utilizan criptografía de clave pública, ¡se pueden generar y verificar **fuera de la cadena**! Así es como funciona la votación de DAO sin gas: en lugar de enviar votos en cadena, las firmas digitales se pueden crear y verificar fuera de la cadena utilizando bibliotecas criptográficas.

Si bien las cuentas EOA tienen una clave privada, las cuentas de contratos inteligentes no tienen ningún tipo de clave privada o secreta (por lo que «Iniciar sesión con Ethereum», etc., no puede funcionar de forma nativa con cuentas de contratos inteligentes).

El problema que EIP-1271 pretende resolver: ¿cómo podemos saber que una firma de contrato inteligente es válida si el contrato inteligente no tiene ningún «secreto» que pueda incorporar a la firma?

## ¿Cómo funciona EIP-1271? {#how-does-eip-1271-work}

Los contratos inteligentes no tienen claves privadas que puedan usarse para firmar mensajes. Entonces, ¿cómo podemos saber si una firma es auténtica?

Bueno, una idea es que simplemente podemos _preguntarle_ al contrato inteligente si una firma es auténtica.

Lo que hace EIP-1271 es estandarizar esta idea de «preguntar» a un contrato inteligente si una firma dada es válida.

Un contrato que implementa EIP-1271 debe tener una función llamada `isValidSignature` que recibe un mensaje y una firma. El contrato puede entonces ejecutar alguna lógica de validación (la especificación no impone nada específico aquí) y luego devolver un valor que indique si la firma es válida o no.

Si `isValidSignature` devuelve un resultado válido, es prácticamente el contrato diciendo «¡sí, apruebo esta firma + mensaje!».

### Interfaz {#interface}

Aquí está la interfaz exacta en la especificación EIP-1271 (hablaremos sobre el parámetro `_hash` a continuación, pero por ahora, piense en él como el mensaje que se está verificando):

```jsx
pragma solidity ^0.5.0;

contract ERC1271 {

  // bytes4(keccak256("isValidSignature(bytes32,bytes)")
  bytes4 constant internal MAGICVALUE = 0x1626ba7e;

  /**
   * @dev Debe devolver si la firma proporcionada es válida para el hash proporcionado
   * @param _hash      Hash de los datos a firmar
   * @param _signature Arreglo de bytes de la firma asociado con _hash
   *
   * DEBE devolver el valor mágico bytes4 0x1626ba7e cuando la función pasa.
   * NO DEBE modificar el estado (usando STATICCALL para solc < 0.5, modificador view para solc > 0.5)
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

## Ejemplo de implementación de EIP-1271: Safe {#example-eip-1271-implementation-safe}

Los contratos pueden implementar `isValidSignature` de muchas maneras: la especificación simplemente no dice mucho sobre la implementación exacta.

Un contrato notable que implementa EIP-1271 es Safe (anteriormente Gnosis Safe).

En el código de Safe, `isValidSignature` [se implementa](https://github.com/safe-global/safe-contracts/blob/main/contracts/handler/CompatibilityFallbackHandler.sol) de modo que las firmas se puedan crear y verificar de [dos maneras](https://ethereum.stackexchange.com/questions/122635/signing-messages-as-a-gnosis-safe-eip1271-support):

1. Mensajes en cadena
   1. Creación: un propietario de Safe crea una nueva transacción de Safe para «firmar» un mensaje, pasando el mensaje como datos en la transacción. Una vez que suficientes propietarios firman la transacción para alcanzar el umbral de la multifirma, la transacción se transmite y se ejecuta. En la transacción, hay una función de Safe llamada (`signMessage(bytes calldata _data)`) que agrega el mensaje a una lista de mensajes «aprobados».
   2. Verificación: llame a `isValidSignature` en el contrato de Safe y pase el mensaje a verificar como el parámetro del mensaje y [un valor vacío para el parámetro de la firma](https://github.com/safe-global/safe-contracts/blob/main/contracts/handler/CompatibilityFallbackHandler.sol#L32) (es decir, `0x`). Safe verá que el parámetro de la firma está vacío y, en lugar de verificar criptográficamente la firma, sabrá que simplemente debe continuar y verificar si el mensaje está en la lista de mensajes «aprobados».
2. Mensajes fuera de la cadena:
   1. Creación: un propietario de Safe crea un mensaje fuera de la cadena, luego hace que otros propietarios de Safe firmen el mensaje individualmente hasta que haya suficientes firmas para superar el umbral de aprobación de la multifirma.
   2. Verificación: llame a `isValidSignature`. En el parámetro del mensaje, pase el mensaje a verificar. En el parámetro de la firma, pase las firmas individuales de cada propietario de Safe concatenadas, una tras otra. Safe verificará que haya suficientes firmas para cumplir con el umbral **y** que cada firma sea válida. Si es así, devolverá un valor que indica la verificación exitosa de la firma.

## ¿Qué es exactamente el parámetro `_hash`? ¿Por qué no pasar todo el mensaje? {#what-exactly-is-the-hash-parameter-why-not-pass-the-whole-message}

Es posible que haya notado que la función `isValidSignature` en la [interfaz EIP-1271](https://eips.ethereum.org/EIPS/eip-1271) no recibe el mensaje en sí, sino un parámetro `_hash`. Lo que esto significa es que en lugar de pasar el mensaje completo de longitud arbitraria a `isValidSignature`, pasamos un hash de 32 bytes del mensaje (generalmente keccak256).

Cada byte de datos de llamada (es decir, los datos de los parámetros de la función que se pasan a una función de contrato inteligente) [cuesta 16 de gas (4 de gas si es un byte cero)](https://eips.ethereum.org/EIPS/eip-2028), por lo que esto puede ahorrar mucho gas si un mensaje es largo.

### Especificaciones anteriores de EIP-1271 {#previous-eip-1271-specifications}

Existen especificaciones de EIP-1271 en la práctica que tienen una función `isValidSignature` con un primer parámetro de tipo `bytes` (de longitud arbitraria, en lugar de un `bytes32` de longitud fija) y el nombre de parámetro `message`. Esta es una [versión anterior](https://github.com/safe-global/safe-contracts/issues/391#issuecomment-1075427206) del estándar EIP-1271.

## ¿Cómo debería implementarse EIP-1271 en mis propios contratos? {#how-should-eip-1271-be-implemented-in-my-own-contracts}

La especificación es muy abierta aquí. La implementación de Safe tiene algunas buenas ideas:

- Puede considerar que las firmas de EOA del «propietario» del contrato son válidas.
- Podría almacenar una lista de mensajes aprobados y considerar solo esos como válidos.

Al final, ¡depende de usted como desarrollador del contrato!

## Conclusión {#conclusion}

[EIP-1271](https://eips.ethereum.org/EIPS/eip-1271) es un estándar versátil que permite a los contratos inteligentes verificar firmas. Abre la puerta para que los contratos inteligentes actúen más como EOA (por ejemplo, proporcionando una forma para que «Iniciar sesión con Ethereum» funcione con contratos inteligentes) y se puede implementar de muchas maneras (Safe tiene una implementación interesante y no trivial a considerar).