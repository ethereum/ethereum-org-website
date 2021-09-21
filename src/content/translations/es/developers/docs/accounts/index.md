---
title: Cuentas de Ethereum
description: Una explicación sobre las cuentas Ethereum, su estructura de datos y su relación con el par de claves criptográficas.
lang: es
sidebar: true
---

Una cuenta Ethereum cuenta con un saldo en ether (ETH), que permite realizar transacciones en Ethereum. Los usuarios pueden controlar las cuentas, o bien se pueden implementar como contratos inteligentes.

## Requisitos previos {#prerequisites}

Las cuentas son muy fáciles de manejar incluso para los principiantes. Sin embargo, para ayudarte a comprender mejor esta pagina, te recomendamos visitar nuestra [introducción a Ethereum](/en/developers/docs/intro-to-ethereum/).

## Tipos de cuenta {#types-of-account}

Ethereum tiene dos tipos de cuenta:

- De propiedad externa: cualquier persona que disponga de las claves privadas puede controlarla
- De contrato: se trata de un contrato inteligente implementado en la red, que se controla mediante código. Si deseas obtener más información, consulta [contratos inteligentes](/en/developers/docs/smart-contracts/)

Ambos tipos de cuenta tienen la habilidad de:

- Recibir, almacenar y enviar ETH y tokens
- Interactuar con contratos inteligentes implementados

### Diferencias principales {#key-differences}

**Propiedad externa (Externally-owned)**

- Crear una cuenta no tiene ningún coste
- Se pueden iniciar transacciones
- Las transacciones entre cuentas de propiedad externa sólo pueden ser transferencias con ETH

**Contrato**

- Crear una cuenta tiene un coste, porque se utiliza el almacenamiento en la red
- Solo se pueden enviar transacciones como respuesta a una transacción recibida
- Las transacciones desde una cuenta de propiedad externa a una cuenta de contrato pueden activar un código, que permite ejecutar diferentes acciones, como transferir tokens o incluso crear un nuevo contrato

## Información detallada de una cuenta {#an-account-examined}

Las cuentas Ethereum tienen cuatro campos:

- `nonce`: Un contador que indica el número de transacciones enviadas desde la cuenta. Esto asegura que las transacciones solo se procesan una vez. Si es una cuenta de contrato, este número representa el número de contratos que ha creado la cuenta.
- `saldo`: El número de Wei pertenecientes a esta dirección. Wei es una denominación de ETH y equivale a 1e+18 Wei por ETH.
- `codeHash` – Todos los fragmentos de código están contenidos en la base de datos de estado con sus hash correspondientes para su posterior recuperación. En el caso de las cuentas de contrato, este es el código hash y se almacena como codeHash. En el caso de las cuentas de propiedad externa, el campo codeHash es el hash de la cadena vacía.
<!--this hash refers to the code of this account on the Ethereum virtual machine (EVM). This EVM code gets executed if the account gets a message call. It cannot be changed unlike the other account fields.  -->
- `storageRoot`: A veces conocido como hash de almacenamiento. Un hash de 256-bit del nodo raíz de un árbol Merkle Patricia que codifica el contenido almacenado en la cuenta (un mapeo entre valores enteros de 256-bits), codificado como un mapeo desde el hash de 256-bit de Keccak de las claves enteras de 256-bit a los valores enteros codificados en RLP de 256-bit. Este árbol codifica el hash del contenido de almacenamiento de esta cuenta, y está vacío por defecto.

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

La clave pública se genera a partir de la clave privada, mediante el algoritmo de firma digital de curva elíptica. Se obtiene una dirección pública para la cuenta tomando los últimos 20 bytes de la clave pública y añadiendo `0x` al principio.

A continuación se incluye un ejemplo de creación de una cuenta en consola usando la `personal_newAccount` de GETH

```go
> personal.newAccount()
Frase de contraseña:
Repetir la frase de contraseña:
"0x5e97870f263700f46aa00d967821199b9bc5a120"

> personal.newAccount("h4ck3r")
"0x3d80b31a78c30fc628f20b2c89d7ddbf6e53cedc"
```

[Documentación de GETH](https://geth.ethereum.org/docs)

Es posible obtener nuevas claves públicas a partir de nuestra clave privada, pero no podemos obtener la clave privada a partir de las claves públicas. Esto significa que es vital mantener una clave privada segura y, como su nombre sugiere, cerciorase de que sea **PRIVADA**.

Necesitas una clave privada para firmar mensajes y transacciones, lo que genera una firma. A continuación, otros pueden utilizar la firma para derivar la clave pública y autenticar así al autor del mensaje. En tu aplicación, puedes utilizar una biblioteca javascript para enviar transacciones a la red.<!-- **WEB3JS example**

```jsx
web3.eth.accounts.recoverTransaction('0xf86180808401ef364594f0109fc8df283027b6285cc889f5aa624eac1f5580801ca031573280d608f75137e33fc14655f097867d691d5c4c44ebe5ae186070ac3d5ea0524410802cdc025034daefcdfa08e7d2ee3f0b9d9ae184b2001fe0aff07603d9');
> "0xF0109fC8DF283027b6285cc889F5aA624EaC1F55"
```

[Web3js documentation](https://web3js.readthedocs.io/)

[code for creating an account in JS?] + links to how to do it in other languages maybe?

`$ geth account new` -->## Cuentas de contrato {#contract-accounts}

Las cuentas de contrato también poseen una dirección hexadecimal de 42 caracteres:

Ejemplo:

`0x06012c8cf97bead5deae237070f9587f8e7a266d`

La dirección del contrato se asigna cuando un contrato se implementa en la blockchain de Ethereum. La dirección se obtiene de la dirección del creador y del número de transacciones enviadas desde esa dirección (el “nonce”).<!-- @Sam Richards is there a line of code you can use to return your contract's address – in the same way that we have personal.newAccount() above? – Don't know if what I found below is helpful?

```jsx
ethers.utils.getContractAddress( transaction ) ⇒ string< Address >
```

TODO: add a contract address example--><!-- ## Managing an account

Most users will want to interact with their account via a wallet. Note that an account is not a wallet. A wallet is the keypair associated with a user-owned account, which allow a user to make transactions from or manage the account

For dapp development, you'll want access to dummy accounts with test ETH so you can experiment. When you create a local chain, you'll get test accounts wth fake ETH which you can then import using MetaMask and use on your dapp's frontend. -->

## Una nota sobre las carteras {#a-note-on-wallets}

Una cuenta no es una cartera. Una cartera es el par de claves asociado con una cuenta de usuario, que permite al usuario realizar transacciones desde la cuenta o administrarla.

## Más información {#further-reading}

_¿Conoces algún recurso en la comunidad que te haya servido de ayuda? Edita esta página y añádelo._

## Temas relacionados {#related-topics}

- [Contratos inteligentes](/en/developers/docs/smart-contracts/)
- [Transacciones](/en/developers/docs/transactions/)
