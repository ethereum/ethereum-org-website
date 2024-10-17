---
title: Cuentas de Ethereum
description: Una explicación sobre las cuentas Ethereum, su estructura de datos y su relación con el par de claves criptográficas.
lang: es
---

Una cuenta Ethereum con un saldo en ether (ETH), que permite realizar transacciones en Ethereum. Los usuarios pueden controlar las cuentas, o bien se pueden implementar como contratos inteligentes.

## Requisitos previos {#prerequisites}

Para ayudarle a entender mejor esta página, recomendamos que lea nuestra [Introducción a Ethereum](/developers/docs/intro-to-ethereum/).

## Tipos de cuenta {#types-of-account}

Ethereum tiene dos tipos de cuenta:

- Cuenta con titularidad externa (EOA): controlada por cualquier persona que tenga consigo las claves privadas
- Cuenta de contrato: contrato inteligente implementado en la red, controlado por código. Si desea obtener más información, consulte la información sobre [contratos inteligentes](/developers/docs/smart-contracts/)

Ambos tipos de cuenta tienen la habilidad de:

- Recibir, almacenar y enviar ETH y tokens
- Interactuar con contratos inteligentes implementados

### Diferencias principales {#key-differences}

**Titularidad externa (Externally-owned)**

- Crear una cuenta no tiene ningún coste
- Se pueden iniciar transacciones
- Las transacciones entre cuentas de titularidad externa solo pueden ser transferencias con ETH/tókenes
- Compuesto por un par de claves criptográficas: claves privadas y públicas que tienen el control de las actividades de la cuenta

**Contrato**

- Crear un contrato tiene un coste porque está usando almacenamiento en la red
- Solo se pueden enviar transacciones como respuesta a una transacción recibida
- Las transacciones de cuentas externas a una cuenta de contrato pueden activar código, que a su vez realiza muchas acciones diferentes, como transferir tokens o incluso crear un nuevo contrato
- Las cuentas de contrato no tienen claves privadas. En su lugar, están controlados por la lógica del código de contrato inteligente

## Información detallada de una cuenta {#an-account-examined}

Las cuentas Ethereum tienen cuatro campos:

- `Nonce`: contador que indica el número de transacciones enviadas desde una cuenta con titularidad externa o el número de contratos creados por una cuenta de contrato. Sólo puede ejecutarse una transacción con un nonce determinado por cada cuenta, lo que protege contra los ataques de repetición cuyas transacciones firmadas se difunden y reejecutan repetidamente.
- `saldo`: número de wei pertenecientes a esa dirección. Wei es una denominación de ETH, y hay 1e+18 wei por ETH.
- `codeHash`: este hash hace referencia al _código_ de una cuenta en la máquina virtual de Ethereum (EVM). Las cuentas de contrato tienen fragmentos de código programados que pueden realizar diferentes operaciones. Este código EVM se ejecuta si la cuenta recibe una llamada de mensaje. Este campo no se puede modificar, a diferencia de otros campos de la cuenta. Todos estos fragmentos de código están contenidos en la base de datos de estado con sus correspondientes hashes para su recuperación. Este valor hash es conocido como un codeHash. Para las cuentas de titularidad externa, el campo codeHash es el hash de una cadena vacía.
- `storageRoot`: a veces conocido como hash de almacenamiento. Un hash de 256 bits del nodo raíz de un trie de Merkle Patricia que codifica el contenido de almacenamiento de la cuenta (un mapeo entre valores enteros de 256 bits), codificado en el trie como un mapeo del hash de 256 bits de Keccak de las claves enteras de 256 bits para los valores enteros de 256 bits codificados en RLP. Este trie codifica el hash del contenido de almacenamiento de esta cuenta y está vacío por defecto.

![Un diagrama que muestra la creación de una cuenta](./accounts.png) _Diagrama adaptado de [Ethereum EVM ilustrado](https://takenobu-hs.github.io/downloads/ethereum_evm_illustrated.pdf)_

## Cuentas de titularidad externa y pares de claves {#externally-owned-accounts-and-key-pairs}

Una cuenta se compone de un par de claves criptográficas: pública y privada. Estas claves ayudan a probar que una transacción fue realmente firmada por el remitente y prevenir falsificaciones. Tu clave privada es lo que utilizas para firmar transacciones, así que garantiza la custodia de los fondos relacionados con tu cuenta. Realmente nunca se almacenan criptomonedas, sino que se dispone de claves privadas: los fondos están siempre en la cadena de bloques de Ethereum.

Esto evita que actores maliciosos difundan transacciones falsas a la red, ya que siempre se puede verificar el remitente de una transacción.

Si Alice quiere enviar ether desde su propia cuenta a la cuenta de Bob, Alice necesita crear una solicitud de transacción y enviarla a la red para su posterior verificación. El uso que Ethereum hace de la criptografía de la clave pública asegura que Alice pueda comprobar que ella ha iniciado originalmente la solicitud de transacción. Sin mecanismos criptográficos, una adversaria maliciosa llamada Eve podría emitir públicamente una solicitud similar a “enviar 5 ETH de la cuenta de Alice a la cuenta de Eve” y nadie podría verificar que no procede de Alice.

## Creación de una cuenta {#account-creation}

Cuando quiera crear una cuenta, la mayoría de las bibliotecas le generarán una clave privada aleatoria.

Una clave privada consta de 64 caracteres hexadecimales y se puede cifrar con una contraseña.

Ejemplo:

`fffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd036415f`

La clave pública se genera a partir de una clave privada mediante el uso del [algoritmo de firma digital de curva elíptica](https://wikipedia.org/wiki/Elliptic_Curve_Digital_Signature_Algorithm). Obtendrá una dirección pública para su cuenta al tomar los últimos 20 bytes del hash Keccak-256 de la clave pública, añadiéndole `0x` al principio.

Esto significa que una cuenta de propiedad externa (EOA) tiene una dirección de 42 caracteres (segmento de 20 bytes, que es de 40 caracteres hexadecimales más el prefijo `0x`).

Ejemplo:

`0x5e97870f263700f46aa00d967821199b9bc5a120`

El siguiente ejemplo muestra cómo utilizar una herramienta de firma llamada [Clef](https://geth.ethereum.org/docs/tools/clef/introduction) para generar una nueva cuenta. Clef es una herramienta de gestión y firma de cuentas que viene con el cliente de Ethereum, [Geth](https://geth.ethereum.org). El comando `clef newaccount` crea un nuevo par de claves y las guarda en un archivo de claves cifrado.

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

Es posible obtener nuevas claves públicas a partir de nuestra clave privada, pero no podemos obtener la clave privada a partir de las claves públicas. Es vital mantener sus claves privadas seguras y, como su nombre indica, **PRIVADAS**.

Necesitas una clave privada para firmar mensajes y transacciones, lo que genera una firma. A continuación, otros pueden utilizar la firma para derivar la clave pública y autenticar así al autor del mensaje. En su aplicación, puede utilizar una biblioteca de JavaScript para enviar transacciones a la red.

## Cuentas de contrato {#contract-accounts}

Las cuentas de contrato también poseen una dirección hexadecimal de 42 caracteres:

Ejemplo:

`0x06012c8cf97bead5deae237070f9587f8e7a266d`

La dirección del contrato se asigna cuando un contrato se implementa en la cadena de bloques de Ethereum. La dirección se obtiene de la dirección del creador y del número de transacciones enviadas desde esa dirección (el «nonce»).

## Claves de validador {#validators-keys}

También hay otro tipo de clave en Ethereum, introducida cuando Ethereum cambió de prueba de trabajo a prueba de participación basada en el consenso. Se trata de las claves «BLS» y se utilizan para identificar validadores. Estas claves pueden añadirse eficientemente para reducir el ancho de banda necesario para que la red llegue al consenso. Sin esta agregación de claves, la participación mínima de un validador sería mucho mayor.

[Más sobre las claves validadoras](/developers/docs/consensus-mechanisms/pos/keys/).

## Una nota sobre las carteras {#a-note-on-wallets}

Una cuenta no es una cartera. Una billetera es una interfaz o aplicación que le permite interactuar con su cuenta de Ethereum, ya sea una cuenta de propiedad externa o una dirección de contrato.

## Una demostración visual {#a-visual-demo}

En el siguiente vídeo Austin le guiará por las funciones hash y los pares de claves.

<YouTube id="QJ010l-pBpE" />

<YouTube id="9LtBDy67Tho" />

## Para seguir leyendo {#further-reading}

- [Claves para entender las cuentas de Ethereum](https://info.etherscan.com/understanding-ethereum-accounts/)-etherscan

_¿Conoce algún recurso comunitario que le haya sido de ayuda? Edite la página y añádalo._

## Temas relacionados {#related-topics}

- [Contratos inteligentes](/developers/docs/smart-contracts/)
- [Transacciones](/developers/docs/transactions/)
