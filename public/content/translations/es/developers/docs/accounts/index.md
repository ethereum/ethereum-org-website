---
title: Cuentas de Ethereum
description: Una explicación sobre las cuentas Ethereum, su estructura de datos y su relación con el par de claves criptográficas.
lang: es
---

Una cuenta Ethereum cuenta con un saldo en ether (ETH), que permite realizar transacciones en Ethereum. Los usuarios pueden controlar las cuentas, o bien se pueden implementar como contratos inteligentes.

## Requisitos previos {#prerequisites}

Las cuentas son muy fáciles de manejar incluso para los principiantes. Sin embargo, para ayudarle a comprender mejor esta página, le recomendamos visitar nuestra [introducción a Ethereum](/developers/docs/intro-to-ethereum/).

## Tipos de cuenta {#types-of-account}

Ethereum tiene dos tipos de cuenta:

- De propiedad externa: cualquier persona que disponga de las claves privadas puede controlarla
- De contrato: se trata de un contrato inteligente implementado en la red, que se controla mediante código. Si desea obtener más información, consulte la información sobre [contratos inteligentes](/developers/docs/smart-contracts/)

Ambos tipos de cuenta tienen la habilidad de:

- Recibir, almacenar y enviar ETH y tokens
- Interactuar con contratos inteligentes implementados

### Diferencias principales {#key-differences}

**Propiedad externa (Externally-owned)**

- Crear una cuenta no tiene ningún coste
- Se pueden iniciar transacciones
- Las transacciones entre cuentas de propiedad externa solo pueden ser transferencias con ETH/tokens

**Contrato**

- Crear un contrato tiene un coste porque está usando almacenamiento en la red
- Solo se pueden enviar transacciones como respuesta a una transacción recibida
- Las transacciones de cuentas externas a una cuenta de contrato pueden activar código, que a su vez realiza muchas acciones diferentes, como transferir tokens o incluso crear un nuevo contrato

## Información detallada de una cuenta {#an-account-examined}

Las cuentas Ethereum tienen cuatro campos:

- `nonce`: Un contador que indica el número de transacciones enviadas desde la cuenta. Esto asegura que las transacciones solo se procesan una vez. En una cuenta de contrato, este número representa el número de contratos creados por la cuenta.
- `saldo`: número de wei pertenecientes a esa dirección. Wei es una denominación de ETH, y hay 1e+18 wei por ETH.
- `codeHash`: este hash hace referencia al _código_ de una cuenta en la máquina virtual de Ethereum (EVM). Las cuentas de contrato tienen fragmentos de código programados que pueden realizar diferentes operaciones. Este código EVM se ejecuta si la cuenta recibe una llamada de mensaje. Este campo no se puede modificar, a diferencia de otros campos de la cuenta. Todos estos fragmentos de código están contenidos en la base de datos de estado con sus correspondientes hashes para su recuperación. Este valor hash es conocido como un codeHash. Para las cuentas de propiedad externa, el campo codeHash es el hash de una cadena vacía.
- `storageRoot`: a veces conocido como hash de almacenamiento. Un hash de 256 bits del nodo raíz de un trie de Merkle Patricia que codifica el contenido de almacenamiento de la cuenta (un mapeo entre valores enteros de 256 bits), codificado en el trie como un mapeo del hash de 256 bits de Keccak de las claves enteras de 256 bits para los valores enteros de 256 bits codificados en RLP. Este trie codifica el hash del contenido de almacenamiento de esta cuenta y está vacío por defecto.

![Un diagrama que muestra la creación de una cuenta](./accounts.png) _Diagrama adaptado de [Ethereum EVM ilustrado](https://takenobu-hs.github.io/downloads/ethereum_evm_illustrated.pdf)_

## Cuentas de propiedad externa y pares de claves {#externally-owned-accounts-and-key-pairs}

Una cuenta está formada por un par criptográfico de claves: pública y privada. Estas claves ayudan a probar que una transacción fue realmente firmada por el remitente y prevenir falsificaciones. Tu clave privada es lo que utilizas para firmar transacciones, así que garantiza la custodia de los fondos relacionados con tu cuenta. Realmente nunca se almacenan criptomonedas, sino que se dispone de claves privadas: los fondos están siempre en la cadena de bloques de Ethereum.

Esto evita que actores maliciosos difundan transacciones falsas a la red, ya que siempre se puede verificar el remitente de una transacción.

Si Alice quiere enviar ether desde su propia cuenta a la cuenta de Bob, Alice necesita crear una solicitud de transacción y enviarla a la red para su posterior verificación. El uso que Ethereum hace de la criptografía de la clave pública asegura que Alice pueda comprobar que ella ha iniciado originalmente la solicitud de transacción. Sin mecanismos criptográficos, una adversaria maliciosa llamada Eve podría emitir públicamente una solicitud similar a “enviar 5 ETH de la cuenta de Alice a la cuenta de Eve” y nadie podría verificar que no procede de Alice.

## Creación de una cuenta {#account-creation}

Cuando se quiere crear una cuenta, la mayoría de las bibliotecas generan una clave privada aleatoria.

Una clave privada consta de 64 caracteres hexadecimales y se puede cifrar con una contraseña.

Ejemplo:

`fffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd036415f`

La clave pública se genera a partir de una clave privada mediante el uso del [algoritmo de firma digital de curva elíptica](https://wikipedia.org/wiki/Elliptic_Curve_Digital_Signature_Algorithm). Obtendrá una dirección pública para su cuenta al tomar los últimos 20 bytes del hash Keccak-256 de la clave pública, añadiéndole `0x` al principio.

A continuación se incluye un ejemplo de creación de una cuenta en consola usando la `personal_newAccount` de GETH

```go
> personal.newAccount()
Passphrase:
Repeat passphrase:
"0x5e97870f263700f46aa00d967821199b9bc5a120"

> personal.newAccount("h4ck3r")
"0x3d80b31a78c30fc628f20b2c89d7ddbf6e53cedc"
```

[Documentación de GETH](https://geth.ethereum.org/docs)

Es posible obtener nuevas claves públicas a partir de nuestra clave privada, pero no podemos obtener la clave privada a partir de las claves públicas. Esto significa que es vital mantener una clave privada segura y, como su nombre sugiere, cerciorase de que sea **PRIVADA**.

Necesitas una clave privada para firmar mensajes y transacciones, lo que genera una firma. A continuación, otros pueden utilizar la firma para derivar la clave pública y autenticar así al autor del mensaje. En tu aplicación, puedes utilizar una biblioteca javascript para enviar transacciones a la red.

## Cuentas de contrato {#contract-accounts}

Las cuentas de contrato también poseen una dirección hexadecimal de 42 caracteres:

Ejemplo:

`0x06012c8cf97bead5deae237070f9587f8e7a266d`

La dirección del contrato se asigna cuando un contrato se implementa en la cadena de bloques de Ethereum. La dirección se obtiene de la dirección del creador y del número de transacciones enviadas desde esa dirección (el «nonce»).

## Una nota sobre las carteras {#a-note-on-wallets}

Una cuenta no es una cartera. Una cuenta consiste en un par de claves para una cuenta de Ethereum que pertenece a un usuario. Una cartera es una interfaz o aplicación que le permite interactuar con su cuenta de Ethereum.

## Una demostración visual {#a-visual-demo}

En el siguiente vídeo Austin te guiará a través de las funciones hash y los pares de claves.

<YouTube id="QJ010l-pBpE" />

<YouTube id="9LtBDy67Tho" />

## Más información {#further-reading}

_¿Conoce algún recurso en la comunidad que le haya servido de ayuda? Edite esta página y añádalo._

## Temas relacionados {#related-topics}

- [Contratos inteligentes](/developers/docs/smart-contracts/)
- [Transacciones](/developers/docs/transactions/)
