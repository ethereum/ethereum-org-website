---
title: Cuentas de Ethereum
description: "Una explicación de las cuentas de Ethereum: sus estructuras de datos y su relación con la criptografía de pares de claves."
lang: es
---

Una cuenta de [Ethereum](/) es una entidad con un saldo de ether (ETH) que puede enviar mensajes en Ethereum. Las cuentas pueden ser controladas por usuarios o implementadas como contratos inteligentes.

## Requisitos previos {#prerequisites}

Para ayudarte a comprender mejor esta página, te recomendamos que primero leas nuestra [introducción a Ethereum](/developers/docs/intro-to-ethereum/).

## Tipos de cuentas {#types-of-account}

Ethereum tiene dos tipos de cuentas:

- Cuenta de propiedad externa (EOA) – controlada por cualquiera con las claves privadas
- Cuenta de contrato – un contrato inteligente implementado en la red, controlado por código. Aprende sobre los [contratos inteligentes](/developers/docs/smart-contracts/)

Ambos tipos de cuentas tienen la capacidad de:

- Recibir, mantener y enviar ETH y tokens
- Interactuar con contratos inteligentes implementados

### Diferencias clave {#key-differences}

**De propiedad externa**

- Crear una cuenta no cuesta nada
- Puede iniciar transacciones
- Las transacciones entre cuentas de propiedad externa solo pueden ser transferencias de ETH o tokens
- Compuesta por un par de claves criptográficas: claves públicas y privadas que controlan las actividades de la cuenta

**De contrato**

- Crear un contrato tiene un costo porque estás utilizando el almacenamiento de la red
- Solo puede enviar mensajes en respuesta a la recepción de una transacción
- Las transacciones de una cuenta externa a una cuenta de contrato pueden activar código que puede ejecutar muchas acciones diferentes, como transferir tokens o incluso crear un nuevo contrato
- Las cuentas de contrato no tienen claves privadas. En su lugar, están controladas por la lógica del código del contrato inteligente

## Análisis de una cuenta {#an-account-examined}

Las cuentas de Ethereum tienen cuatro campos:

- `nonce` – Un contador que indica el número de transacciones enviadas desde una cuenta de propiedad externa o el número de contratos creados por una cuenta de contrato. Solo se puede ejecutar una transacción con un nonce determinado para cada cuenta, lo que protege contra ataques de repetición donde las transacciones firmadas se transmiten y vuelven a ejecutar repetidamente.
- `balance` – El número de Wei que posee esta dirección. Wei es una denominación de ETH y hay 1e+18 Wei por ETH.
- `codeHash` – Este hash se refiere al _código_ de una cuenta en la máquina virtual de Ethereum (EVM). Las cuentas de contrato tienen fragmentos de código programados que pueden realizar diferentes operaciones. Este código de la EVM se ejecuta si la cuenta recibe una llamada de mensaje. No se puede cambiar, a diferencia de los otros campos de la cuenta. Todos estos fragmentos de código están contenidos en la base de datos de estado bajo sus hashes correspondientes para su posterior recuperación. Este valor hash se conoce como codeHash. Para las cuentas de propiedad externa, el campo codeHash es el hash de una cadena vacía.
- `storageRoot` – A veces conocido como hash de almacenamiento. Un hash de 256 bits del nodo raíz de un [trie de Merkle Patricia](/developers/docs/data-structures-and-encoding/patricia-merkle-trie/) que codifica el contenido de almacenamiento de la cuenta (un mapeo entre valores enteros de 256 bits), codificado en el trie como un mapeo desde el hash Keccak-256 de las claves enteras de 256 bits a los valores enteros de 256 bits codificados en RLP. Este trie codifica el hash del contenido de almacenamiento de esta cuenta, y está vacío por defecto.

![A diagram showing the make up of an account](./accounts.png)
_Diagrama adaptado de [Ethereum EVM illustrated](https://takenobu-hs.github.io/downloads/ethereum_evm_illustrated.pdf)_

## Cuentas de propiedad externa y pares de claves {#externally-owned-accounts-and-key-pairs}

Una cuenta está compuesta por un par de claves criptográficas: pública y privada. Ayudan a demostrar que una transacción fue realmente firmada por el remitente y evitan falsificaciones. Tu clave privada es lo que usas para firmar transacciones, por lo que te otorga la custodia de los fondos asociados con tu cuenta. En realidad, nunca posees criptomonedas, posees claves privadas: los fondos siempre están en el libro mayor de Ethereum.

Esto evita que actores malintencionados transmitan transacciones falsas porque siempre puedes verificar al remitente de una transacción.

Si Alice quiere enviar ether desde su propia cuenta a la cuenta de Bob, Alice necesita crear una solicitud de transacción y enviarla a la red para su verificación. El uso de criptografía de clave pública por parte de Ethereum garantiza que Alice pueda demostrar que ella inició originalmente la solicitud de transacción. Sin mecanismos criptográficos, una adversaria malintencionada, Eve, podría simplemente transmitir públicamente una solicitud que se parezca a "enviar 5 ETH de la cuenta de Alice a la cuenta de Eve", y nadie podría verificar que no provino de Alice.

## Creación de cuentas {#account-creation}

Cuando deseas crear una cuenta, la mayoría de las bibliotecas te generarán una clave privada aleatoria.

Una clave privada está compuesta por 64 caracteres hexadecimales y se puede cifrar con una contraseña.

Ejemplo:

`fffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd036415f`

La clave pública se genera a partir de la clave privada utilizando el [algoritmo de firma digital de curva elíptica](https://wikipedia.org/wiki/Elliptic_Curve_Digital_Signature_Algorithm). Obtienes una dirección pública para tu cuenta tomando los últimos 20 bytes del hash Keccak-256 de la clave pública y agregando `0x` al principio.

Esto significa que una cuenta de propiedad externa (EOA) tiene una dirección de 42 caracteres (un segmento de 20 bytes que son 40 caracteres hexadecimales más el prefijo `0x`).

Ejemplo:

`0x5e97870f263700f46aa00d967821199b9bc5a120`

El siguiente ejemplo muestra cómo usar una herramienta de firma llamada [Clef](https://geth.ethereum.org/docs/tools/clef/introduction) para generar una nueva cuenta. Clef es una herramienta de gestión de cuentas y firma que viene incluida con el cliente de Ethereum, [Go Ethereum (Geth)](https://geth.ethereum.org). El comando `clef newaccount` crea un nuevo par de claves y las guarda en un almacén de claves cifrado.

```
> clef newaccount --keystore <path>

Please enter a password for the new account to be created:
> <password>

------------
INFO [10-28|16:19:09.156] Your new key was generated       address=0x5e97870f263700f46aa00d967821199b9bc5a120
WARN [10-28|16:19:09.306] Please backup your key file      path=/home/user/go-ethereum/data/keystore/UTC--2022-10-28T15-19-08.000825927Z--5e97870f263700f46aa00d967821199b9bc5a120
WARN [10-28|16:19:09.306] Please remember your password!
Generated account 0x5e97870f263700f46aa00d967821199b9bc5a120
```

[Documentación de Geth](https://geth.ethereum.org/docs)

Es posible derivar nuevas claves públicas a partir de tu clave privada, pero no puedes derivar una clave privada a partir de claves públicas. Es vital mantener tus claves privadas seguras y, como su nombre indica, **PRIVADAS**.

Necesitas una clave privada para firmar mensajes y transacciones que generan una firma. Otros pueden entonces tomar la firma para derivar tu clave pública, demostrando la autoría del mensaje. En tu aplicación, puedes usar una biblioteca de JavaScript para enviar transacciones a la red.

## Cuentas de contrato {#contract-accounts}

Las cuentas de contrato también tienen una dirección hexadecimal de 42 caracteres:

Ejemplo:

`0x06012c8cf97bead5deae237070f9587f8e7a266d`

La dirección del contrato generalmente se proporciona cuando se implementa un contrato en la cadena de bloques de Ethereum. La dirección proviene de la dirección del creador y del número de transacciones enviadas desde esa dirección (el "nonce").

## Claves de validador {#validators-keys}

También hay otro tipo de clave en Ethereum, introducida cuando Ethereum cambió del consenso basado en prueba de trabajo (PoW) a prueba de participación (PoS). Estas son las claves 'BLS' y se utilizan para identificar a los validadores. Estas claves se pueden agregar de manera eficiente para reducir el ancho de banda requerido para que la red llegue a un consenso. Sin esta agregación de claves, la participación mínima para un validador sería mucho mayor.

[Más sobre las claves de validador](/developers/docs/consensus-mechanisms/pos/keys/).

## Una nota sobre las billeteras {#a-note-on-wallets}

Una cuenta no es una billetera. Una billetera es una interfaz o aplicación que te permite interactuar con tu cuenta de Ethereum, ya sea una cuenta de propiedad externa o una cuenta de contrato.

## Una demostración visual {#a-visual-demo}

Mira a Austin guiarte a través de las funciones hash y los pares de claves.

<VideoWatch slug="hash-function-eth-build" />

<VideoWatch slug="key-pair-eth-build" />

## Lecturas adicionales {#further-reading}

- [Comprendiendo las cuentas de Ethereum](https://info.etherscan.com/understanding-ethereum-accounts/) - Etherscan

_¿Conoces algún recurso de la comunidad que te haya ayudado? ¡Edita esta página y agrégalo!_

## Temas relacionados {#related-topics}

- [Contratos inteligentes](/developers/docs/smart-contracts/)
- [Transacciones](/developers/docs/transactions/)