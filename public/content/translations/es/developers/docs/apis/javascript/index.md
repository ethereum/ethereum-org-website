---
title: Bibliotecas de API de JavaScript
description: Una introducción a las bibliotecas de cliente de JavaScript, que te permiten interactuar con la blockchain desde tu aplicación.
lang: es
---

Para que una aplicación web interactúe con el blockchain de Ethereum (es decir, para que lea datos de blockchain y/o envíe transacciones a la red), este debe conectarse a un nodo de Ethereum.

Con esta finalidad, cada cliente de Ethereum implementa la especificación de JSON-RPC (protocolo Remote Procedure Call codificado en JSON) para que haya un conjunto uniforme de puntos finales "endpoints" en los que las aplicaciones pueden confiar.

Si quieres usar JavaScript para conectar con un nodo de Ethereum, puedes usar VanillaJS (Vanilla JavaScript). Sin embargo, hay varias bibliotecas de conveniencia que existen dentro del ecosistema que lo simplifican. Con estas bibliotecas, los desarrolladores pueden escribir intuitivamente métodos de una línea para iniciar requerimientos de JSON RPC (de manera oculta) que interactúan con Ethereum.

## Requisitos previos {#prerequisites}

Además de para comprender JavaScript, podría ser útil para entender el [bloque de Ethereum](/developers/docs/ethereum-stack/) y a los [clientes de Ethereum](/developers/docs/nodes-and-clients/).

## ¿Por qué usar una biblioteca? {#why-use-a-library}

Estas bibliotecas eliminan en gran parte la complejidad de interactuar directamente con un nodo Ethereum. También proporcionan funciones útiles (por ejemplo, convertir ETH a Gwei) de modo que, como desarrollador, puedas dedicar menos tiempo a lidiar con las complejidades de los clientes de Ethereum y centrarte más en las características únicas de tu aplicación.

## Características de la biblioteca {#library-features}

### Conectar a nodos Ethereum {#connect-to-ethereum-nodes}

Mediante proveedores, estas bibliotecas te permiten conectarte a Ethereum y leer tus datos, ya sea sobre JSON-RPC, INFURA, Etherscan, Alchemy o MetaMask.

**Ejemplo de Ether**

```js
// Un Web3Provider enlaza un proveedor estándar Web3, en el
// que MetaMask se inyecta como window.ethereum en cada página
const provider = new ethers.providers.Web3Provider(window.ethereum)

// El plugin MetaMask también permite firmar transacciones para
// enviar Ether y pagar el cambio de estado dentro de la blockchain.
// Para esto, necesitamos al titular de la cuenta...
const signer = provider.getSigner()
```

**Ejemplo de Web3js**

```js
var web3 = new Web3("http://localhost:8545")
// o
var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"))

// cambiar proveedor
web3.setProvider("ws://localhost:8546")
// o
web3.setProvider(new Web3.providers.WebsocketProvider("ws://localhost:8546"))

// Utilizando un proveedor IPC en node.js
var net = require("net")
var web3 = new Web3("/Users/myuser/Library/Ethereum/geth.ipc", net) // ruta para macOS
// o
var web3 = new Web3(
  new Web3.providers.IpcProvider("/Users/myuser/Library/Ethereum/geth.ipc", net)
)
// ruta para macOS
// en Windows, la ruta es: "\\\\.\\pipe\\geth.ipc"
// en Linux, la ruta es: "/users/myuser/.ethereum/geth.ipc"
```

Una vez configurado, estarás habilitado para consultar en la blockchain:

- números de bloque
- estimaciones del gas
- eventos de contrato inteligente
- id de la red
- y más...

### Funcionalidad de la cartera {#wallet-functionality}

Estas bibliotecas te darán la funcionalidad para crear carteras, administrar claves y firmar transacciones.

A continuación se incluyen algunos ejemplos de Ethers

```js
// Crear una instancia de la cartera desde un mnemonic...
mnemonic =
  "anuncia el patrón de miembro de la sala a escala seca esfuerzo de escala suave de weasel de jazz"
walletMnemonic = Wallet.romMnemonic(mnemonic)

// ...or from a private key
walletPrivateKey = new Wallet(walletMnemonic.privateKey)

walletMnemonic.ddress === walletPrivateKey.address
// verdadero

// La dirección como una promesa por la cartera de Signer API
Mnemonic.etAddress()
// { Promise: '0x71CB05EE1b1F506fF321Da3dac38f25c0c9ce6E1' }

// Una dirección de cartera también está disponible sincrónicamente
walletMnemonic.ddress
// '0x71CB05EE1b1F506fF321Da3dac38f25c0c9ce6E1'

// Los componentes criptográficos internos
walletMnemonic.privateKey
// '0x1da6847600b0ee25e9ad9a52abbd786dd2502fa4005dd5af9310b7cc7a3b25db'
walletMnemonic.ublicKey
// '0x04b9e72dfd423bcf95b3801ac93f4392be5ff22143f9980eb78b3a860c4843bfd04829ae61cdba4b3b1978ac5fc64f5cc2f4350e35a108a9c9a92a81200a60cd64'

// El mnemónico del monedero
walletMnemonic.nemonic
// {
// locale: 'en',
// ruta: 'm/44\'/60\'/0\'/0/0',
// frase: 'anunciar el patrón de miembro de la sala el esfuerzo de escala seca de la escala de la unidad de jazz weasel aferrado'
// }

// Nota: Una cartera creada con una clave privada no
// tiene un mnemónico (la derivación lo impide)
walletPrivateKey.nemonic
// null

// Firmando un mensaje
walletMnemonic.ignMessage("Hola Mundo")
// { Promise: '0x14280e5885a19f60e536de50097e96e3738c7acae4e9e62d67272d794b8127d31c03d9cd59781d4ee31fb4e1b893bd9b020ec67dfa65cfb51e2bdadbb1de26d91c' }

tx = {
  to: "0x8ba1f109551bD432803012645Ac136ddd64DBA72",
  value: utils.arseEther("1.0"),
}

// Firmando una transacción
walletMnemonic.ignTransaction(tx)
// { Promise: '0xf865808080948ba1f109551bd432803012645ac136ddd64dba72880de0b6b3a7640000801ca0918e294306d177ab7bd664f5e141436563854ebe0a3e523b9690b4922bbb52b8a01181612cec9c431c4257a79b8c9f0c980a2c49bb5a0e6ac52949163eeb565dfc' }

// El método de conexión devuelve una nueva instancia del
// Wallet conectado a un proveedor
wallet = walletMnemonic.onnect(provider)

// Consultando la red
wallet.getBalance()
// { Promise: { BigNumber: "42" } }
wallet.etTransactionCount()
// { Promise: 0 }

// Enviando ether
wallet.sendTransaction(tx)
```

[Leer la documentación completa](https://docs.ethers.io/v5/api/signer/#Wallet)

Una vez configurado, podrás:

- crear cuentas
- enviar transacciones
- firmar transacciones
- y más...

### Interactuar con las funciones del contrato inteligente {#interact-with-smart-contract-functions}

Las bibliotecas de cliente de JavaScript permiten que tu aplicación solicite funciones de contrato inteligente mediante la lectura de la Interfaz Binaria de Aplicación (ABI) de un contrato compilado.

El ABI esencialmente explica las funciones del contrato en un formato JSON y te permite usarlo como un objeto JavaScript normal.

Así que el siguiente contrato Solidity:

```solidity
contract Test {
    uint a;
    address d = 0x12345678901234567890123456789012;

    function Test(uint testInt)  { a = testInt;}

    event Event(uint indexed b, bytes32 c);

    event Event2(uint indexed b, bytes32 c);

    function foo(uint b, bytes32 c) returns(address) {
        Event(b, c);
        return d;
    }
}
```

Resultaría en el siguiente JSON:

```json
[{
    "tip":"constructor",
    "pagable":false,
    "stateMutability":"nonpayable"
    "inputs":[{"name":"testInt", type":"uint256"}],
  },{
    "type":"function",
    "name":"foo",
    "constant":false,
    "payable":false,
    "stateMutability":"nonpayable",
    "inputs":[{"name":"b","type":"uint256"}, {"name":"c","type":"bytes32"}],
    "outputs":[{"name":"", type":"address"}]
  },{
    "type":"event",
    "name":"Event",
    "inputs":[{"indexed":true, name":"b","type":"uint256"}, {"indexed":false,"name":"c","type":"bytes32"}],
    "anonymous":false
  },
    "type":"event",
    "name":"Event2",
    "inputs":[{"indexed":true,"name":"b", type":"uint256"},{"indexed":false,"name":"c","type":"bytes32"}],
    "anonymous":false
}]
```

Esto significa que puedes:

- Enviar una transacción al contrato inteligente y ejecutarla con el método
- Promover la estimación del gas que tomará un método de ejecución cuando se ejecute en la máquina virtual EVM
- Desplegar un contrato
- Y mucho más...

### Funciones de utilidad {#utility-functions}

Las funciones de utilidad te dan atajos prácticos que hacen que la construcción sea más fácil con Ethereum.

Los valores de ETH vienen en Wei por defecto. 1 ETH = 1 000 000 000 000 000 000 WEI (esto significa que estás trabajando con muchos números) `web3.utils.toWei` // convierte los Ether a Wei por ti.

Y en Ethers esto sería así:

```js
// Obtener el saldo de una cuenta (por dirección o nombre ENS)
balance = await provider.getBalance("ethers.eth")
// { BigNumber: "2337132817842795605" }

// A menudo tendrás que formatear la salida para el usuario
// que prefiere ver los valores en Ether (en lugar de Wei)
ethers.utils.formatEther(balance)
// '2.337132817842795605'
```

- [Funciones de utilidad de Web3js](https://docs.web3js.org/api/web3-utils)
- [Funciones de utilidad de Ethers](https://docs.ethers.io/v5/api/utils/)

## Bibliotecas disponibles {#available-libraries}

**Web3.js:** **_API de JavaScript de Ethereum._**

- [Documentación](https://docs.web3js.org/)
- [GitHub](https://github.com/ethereum/web3.js/)

**Ethers.js:** **_ Implementación completa de la cartera de Ethereum y utilidades en JavaScript y TypeScript._**

- [Documentación](https://docs.ethers.io/ethers.js/html/)
- [GitHub](https://github.com/ethers-io/ethers.js/)

**The Graph:** **_Un protocolo para catalogar datos de Ethereum y IPFS, y consultarlos usando GraphQL._**

- [The Graph](https://thegraph.com/)
- [Graph Explorer](https://thegraph.com/explorer/)
- [Documentación](https://thegraph.com/docs/)
- [GitHub](https://github.com/graphprotocol/)
- [Discord](https://thegraph.com/discord)

**light.js:** **_Una biblioteca de JS optimizada y de alto nivel para clientes ligeros._**

- [GitHub](https://github.com/openethereum/js-libs/tree/master/packages/light.js)

**Web3-wrapper:** **_Typescript alternativo a Web3.js._**

- [Documentación](https://0x.org/docs/web3-wrapper#introduction)
- [GitHub](https://github.com/0xProject/0x-monorepo/tree/development/packages/web3-wrapper)

**Alchemyweb3:** **_Wrapper alrededor de Web3.js con reintentos automáticos y API mejoradas._**

- [Documentación](https://docs.alchemy.com/reference/api-overview)
- [GitHub](https://github.com/alchemyplatform/alchemy-web3)

## Más información {#further-reading}

_¿Conoces algún recurso comunitario que te haya servido de ayuda? Edita esta página y añádelo._

## Temas relacionados {#related-topics}

- [Nodos y clientes](/developers/docs/nodes-and-clients/)
- [Frameworks de desarrollo](/developers/docs/frameworks/)

## Tutoriales relacionados {#related-tutorials}

- [Configurar Web3js para utilizar el blockchain de Ethereum en JavaScript](/developers/tutorials/set-up-web3js-to-use-ethereum-in-javascript/) _– Instrucciones de configuración de web3.js para tu proyecto._
- [Llamar un contrato inteligente desde JavaScript](/developers/tutorials/calling-a-smart-contract-from-javascript/) _– Utilizando un token Dai, ver como llamar a la función de contratos usando JavaScript._
- [Enviar transacciones usando web 3.0 y Alchemy:](/developers/tutorials/sending-transactions-using-web3-and-alchemy/) _Tutorial de paso a paso para enviar transacciones desde el backend._
