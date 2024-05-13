---
title: Crear e implementar una aplicación DeFi
description: Deposite tokens ERC20 en el contrato inteligente y mintee Farme Tokens
author: "strykerin"
tags:
  - "solidez"
  - "defi"
  - "web3.js"
  - "truffle"
  - "ganache"
  - "contratos inteligentes"
skill: intermediate
lang: es
published: 2020-12-31
source: github.com
sourceUrl: https://github.com/strykerin/DeFi-Token-Farm
---

En este tutorial crearemos una aplicación DeFi con Solidity donde los usuarios pueden depositar un token ERC20 en el contrato inteligente y este minteará y transferirá Farm Tokens. Los usuarios pueden retirar más tarde sus tokens ERC20 quemando su Farm Token en un contrato inteligente, y se les devolverán los tokens ERC20.

## Instalar Truffle y Ganache {#install-truffle-and-ganache}

Si es la primera vez que escribe un contrato inteligente, deberá configurar su entorno. Vamos a utilizar dos herramientas: [Truffle](https://www.trufflesuite.com/) y [Ganache](https://www.trufflesuite.com/ganache).

Truffle es un entorno de desarrollo y marco de pruebas para desarrollar contratos inteligentes para Ethereum. Con Truffle es fácil crear e implementar contratos inteligentes en la cadena de bloques. Ganache nos permite crear una cadena de bloques de Ethereum local para probar contratos inteligentes. Simula las características de la red real y las primeras 10 cuentas cuentan con 100 ether de prueba, lo que hace que la implementación y las pruebas de contratos inteligentes sean gratuitas y fáciles. Ganache está disponible como aplicación de escritorio y herramienta de línea de comandos. Para este artículo usaremos la aplicación de escritorio de UI.

![Aplicación de escritorio de UI de Ganache](https://cdn-images-1.medium.com/max/2360/1*V1iQ5onbLbT5Ib2QaiOSyg.png)_Aplicación de escritorio de UI de Ganache_

Para crear el proyecto, ejecute los siguientes comandos:

```bash
mkdir your-project-name
cd your-project-name
truffle init
```

Esto creará un proyecto en blanco para el desarrollo e implementación de nuestros contratos inteligentes. La estructura de proyecto creada es la siguiente:

- `contracts`: Carpeta para los contratos inteligentes de Solidity

- `migrations`: Carpeta para los scripts de implementación

- `test`: Carpeta para probar nuestros contratos inteligentes

- `truffle-config.js`: Archivo de configuración Truffle

## Crear el token ERC20 {#create-the-erc20-token}

Primero necesitamos crear nuestro token ERC20 que utilizaremos para apostar, o hacer staking, en el contrato inteligente. Para crear nuestro token fungible, primero necesitamos instalar la biblioteca OpenZeppelin. Esta biblioteca contiene las implementaciones de estándares como ERC20 y ERC721. Para instalarla, ejecute el comando:

```bash
npm install @openzeppelin/contracts
```

Utilizando la biblioteca OpenZeppelin podemos crear nuestro token ERC20 escribiendo a `contracts/MyToken.sol` con el siguiente código de Solidity:

```solidity
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MyToken is ERC20 {
    constructor() public ERC20("MyToken", "MTKN"){
        _mint(msg.sender, 1000000000000000000000000);
    }
}
```

En el código de arriba en:

- Línea 3: Importamos el contrato ERC-20.sol desde openzeppelin que contiene la implementación para este estándar de tokens.

- Línea 5: Heredamos desde el contrato ERC-20.sol.

- Línea 6: Estamos llamando al contructor ERC20.sol y pasando los parámetros de nombre y símbolo como `"MyToken"` y `"MTKN"`, respectivamente.

- Línea 7: Estamos minteando y transfiriendo 1 millon de tokens para la cuenta que está implementando el contrato inteligente (estamos usando los 18 decimales por defecto del token ERC20; eso significa que, si queremos mintear 1 token, lo representaremos como 1000000000000000000, 1 con 18 ceros).

Debajo podemos ver la implementacion del constructor ERC20.sol, donde el campo `_decimals` está establecido en 18:

```solidity
string private _name;
string private _symbol;
uint8 private _decimals;

constructor (string memory name_, string memory symbol_) public {
    _name = name_;
    _symbol = symbol_;
    _decimals = 18;
}
```

## Compilar el token ERC20 {#compile-the-erc20-token}

Para compilar nuestro contrato inteligente, primer debemos verificar la versión de nuestro compilador de Solidity. Puede verificarla ejecutando el comando:

```bash
truffle version
```

La versión por defecto es `Solidity v0.5.16`. Como nuestro token está escrito usando la versión de Solidity `0.6.2`, si corremos el comando para compilar nuestros contratos, obtendremos un error de compilador. Para especificar qué versión del compilador de Solidity usar, vaya al archivo `truffle-config.js` y establezca la versión deseada del compilador como se ve a continuación:

```javascript
// Configure your compilers
compilers: {
  solc: {
    version: "^0.8.0",    // Fetch exact version from solc-bin (default: truffle's version)
    // docker: true,        // Use "0.5.1" you've installed locally with docker (default: false)
    // settings: {          // See the solidity docs for advice about optimization and evmVersion
    //  optimizer: {
    //    enabled: false,
    //    runs: 200
    //  },
    //  evmVersion: "byzantium"
    // }
  }
}
```

Ahora podemos compilar nuestro contrato inteligente ejecutando el siguiente comando:

```bash
truffle compile
```

## Implementar el token ERC20 {#deploy-erc20-token}

Despues de compilar, ahora podemos implementar nuestro token.

En la carpeta `migrations`, cree un archivo llamado `2_deploy_Tokens.js`. Este archivo es donde vamos a implementar tanto nuestro token ERC20 como nuestro contrato inteligente FarmToken. El siguiente código se utiliza para implementar nuestro contrato MyToken.sol:

```javascript
const MyToken = artifacts.require("MyToken")

module.exports = async function (deployer, network, accounts) {
  // Deploy MyToken
  await deployer.deploy(MyToken)
  const myToken = await MyToken.deployed()
}
```

Abra Ganache y seleccione la opción "Quickstart" para comenzar una cadena de bloques local de Ethereum. Para implementar nuestro contrato, ejecute:

```bash
truffle migrate
```

La dirección utilizada para implementar nuestros contratos es la primera de la lista de direcciones que Ganache nos muestra. Para verificarlo, podemos abrir la aplicacion de escritorio de Ganache y verificar que el saldo de ether de nuestra primera cuenta haya sido reducido debido al costo de ether para implementar nuestros contratos inteligentes:

![Aplicación de escritorio de Ganache](https://cdn-images-1.medium.com/max/2346/1*1iJ9VRlyLuza58HL3DLfpg.png)_Aplicación de escritorio de Ganache_

Para verificar que se hayan enviado 1 millón de tokens de MyToken a la dirección del implementador, podemos usar la consola de Truffle para interactuar con nuestro contrato inteligente implementado.

> [Truffle Console es una consola básica e interactiva que se conecta con cualquier cliente de Ethereum.](https://www.trufflesuite.com/docs/truffle/getting-started/using-truffle-develop-and-the-console)

Para poder interactuar con nuestro contrato inteligente, ejecute el siguiente comando:

```bash
truffle console
```

Ahora podemos escribir los siguientes comandos en el terminal:

- Obtener el contrato inteligente: `myToken = await MyToken.deployed()`

- Obtener el array de cuentas de Ganache: `accounts = await web3.eth.getAccounts()`

- Obtener el saldo de la primera cuenta: `balance = await myToken.balanceOf(accounts[0])`

- Formatear el saldo a partir de 18 decimales: `web3.utils.fromWei(balance.toString())`

Al ejecutar los comandos de arriba, veremos que la primera dirección tiene de hecho 1 millón de MyTokens:

![La primera dirección tiene 1000000 MyTokens](https://cdn-images-1.medium.com/max/2000/1*AQlj9A7dw-qtY4QAD3Bpxw.png)

_La primera dirección tiene 1000000 MyTokens_

## Crear un contrato inteligente FarmToken {#create-farmtoken-smart-contract}

El contrato inteligente FarmToken tendrá 3 funciones:

- `balance()`: Obtener el saldo de MyToken en el contrato inteligente FarmToken.

- `deposit(uint256 _amount)`: Transferir MyToken en nombre del usuario al contrato inteligente FarmToken y luego mintear y transferir FarmToken al usuario.

- `withdraw(uint256 _amount)`: Quemar FarmTokens del usuario y transferir MyTokens a la dirección del usuario.

Veamos el constructor de FarmToken:

```solidity
pragma solidity ^0.6.2;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/Address.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract FarmToken is ERC20 {
    using Address for address;
    using SafeMath for uint256; // As of Solidity v0.8.0, mathematical operations can be done safely without the need for SafeMath
    using SafeERC20 for IERC20;

    IERC20 public token;

    constructor(address _token)
        public
        ERC20("FarmToken", "FRM")
    {
        token = IERC20(_token);
    }
```

- Líneas 3-6: Importamos los siguientes contratos de openzeppelin: IERC20.sol, Address.sol, SafeERC20.sol y ERC20.sol.

- Línea 8: El FarmToken heredará del contrato ERC20.

- Líneas 14-19: El constructor de FarmToken recibirá como parámetro la dirección del contrato MyToken y asignará su contrato a nuestra variable pública llamada `token`.

Vamos a implementar la función `balance()`. No recibirá ningún parámetro y devolverá el saldo de MyToken en este contrato inteligente. Se implementa así:

```solidity
function balance() public view returns (uint256) {
    return token.balanceOf(address(this));
}
```

Para la función `deposite(uint256 _amount)`, recibirá como parámetro la cantidad que el usuario quiere depositar y minteará y transferirá FarmTokens al usuario:

```solidity
function deposit(uint256 _amount) public {
    // Amount must be greater than zero
    require(_amount > 0, "amount cannot be 0");

    // Transfer MyToken to smart contract
    token.safeTransferFrom(msg.sender, address(this), _amount);

    // Mint FarmToken to msg sender
    _mint(msg.sender, _amount);
}
```

Para la función `withdraw(uint256 _amount)`, recibiremos como parámetro la cantidad de FarmTokens que el usuario desea quemar y luego transferir la misma cantidad de MyTokens de vuelta al usuario:

```solidity
function withdraw(uint256 _amount) public {
    // Burn FarmTokens from msg sender
    _burn(msg.sender, _amount);

    // Transfer MyTokens from this smart contract to msg sender
    token.safeTransfer(msg.sender, _amount);
}
```

Ahora implementaremos nuestro contrato inteligente. Para hacerlo, regresaremos al archivo `2_deploy_Tokens.js` y agregaremos el nuevo contrato que se va a implementar:

```javascript
const MyToken = artifacts.require("MyToken")
const FarmToken = artifacts.require("FarmToken")

module.exports = async function (deployer, network, accounts) {
  // Deploy MyToken
  await deployer.deploy(MyToken)
  const myToken = await MyToken.deployed()

  // Deploy Farm Token
  await deployer.deploy(FarmToken, myToken.address)
  const farmToken = await FarmToken.deployed()
}
```

Tenga en cuenta que, al implementar FarmToken, pasamos como parámetro la dirección del contrato implementado MyToken.

Ahora, ejecute `truffle compile` y `truffle migrate` para implementar nuestros contratos.

Probemos nuestro contrato inteligente. En lugar de usar la `consola de truffle` para interactuar con nuestro contrato inteligente, crearemos un script para automatizar este proceso. Cree una carpeta llamada `scripts` y añada el siguiente archivo `getMyTokenBalance.js`. Comprobará el saldo de MyTokens en el contrato inteligente FarmToken:

```javascript
const MyToken = artifacts.require("MyToken")
const FarmToken = artifacts.require("FarmToken")

module.exports = async function (callback) {
  myToken = await MyToken.deployed()
  farmToken = await FarmToken.deployed()
  balance = await myToken.balanceOf(farmToken.address)
  console.log(web3.utils.fromWei(balance.toString()))
  callback()
}
```

Para ejecutar este script, ejecute el siguiente comando de CLI:

```bash
truffle exec .\scripts\getMyTokenBalance.js
```

Obtendremos el resultado esperado, que es 0. Si recibe un error que indica que el FarmToken aún no se implementó, se debe a que la red de Truffle no ha recibido la última versión del código de su contrato. Cierre Ganache, vuelva a iniciarlo y asegúrese de ejecutar `truffle migrate`.

Ahora, vamos a apostar MyToken en el contrato inteligente. Puesto que la función `deposit(uint256 _amount)` llama a la función `safeTransferFrom` desde el ERC20, el usuario debe aprobar primero el contrato inteligente para transferir MyToken en nombre del usuario. Así que, en el siguiente script, primero aprobaremos este paso y luego llamaremos a la función:

```javascript
const MyToken = artifacts.require("MyToken")
const FarmToken = artifacts.require("FarmToken")

module.exports = async function (callback) {
  const accounts = await new web3.eth.getAccounts()
  const myToken = await MyToken.deployed()
  const farmToken = await FarmToken.deployed()

  // Returns the remaining number of tokens that spender will be allowed to spend on behalf of owner through transferFrom.
  // This is zero by default.
  const allowanceBefore = await myToken.allowance(
    accounts[0],
    farmToken.address
  )
  console.log(
    "Amount of MyToken FarmToken is allowed to transfer on our behalf Before: " +
      allowanceBefore.toString()
  )

  // In order to allow the Smart Contract to transfer to MyToken (ERC-20) on the accounts[0] behalf,
  // we must explicitly allow it.
  // We allow farmToken to transfer x amount of MyToken on our behalf
  await myToken.approve(farmToken.address, web3.utils.toWei("100", "ether"))

  // Validate that the farmToken can now move x amount of MyToken on our behalf
  const allowanceAfter = await myToken.allowance(accounts[0], farmToken.address)
  console.log(
    "Amount of MyToken FarmToken is allowed to transfer on our behalf After: " +
      allowanceAfter.toString()
  )

  // Verify accounts[0] and farmToken balance of MyToken before and after the transfer
  balanceMyTokenBeforeAccounts0 = await myToken.balanceOf(accounts[0])
  balanceMyTokenBeforeFarmToken = await myToken.balanceOf(farmToken.address)
  console.log("*** My Token ***")
  console.log(
    "Balance MyToken Before accounts[0] " +
      web3.utils.fromWei(balanceMyTokenBeforeAccounts0.toString())
  )
  console.log(
    "Balance MyToken Before TokenFarm " +
      web3.utils.fromWei(balanceMyTokenBeforeFarmToken.toString())
  )

  console.log("*** Farm Token ***")
  balanceFarmTokenBeforeAccounts0 = await farmToken.balanceOf(accounts[0])
  balanceFarmTokenBeforeFarmToken = await farmToken.balanceOf(farmToken.address)
  console.log(
    "Balance FarmToken Before accounts[0] " +
      web3.utils.fromWei(balanceFarmTokenBeforeAccounts0.toString())
  )
  console.log(
    "Balance FarmToken Before TokenFarm " +
      web3.utils.fromWei(balanceFarmTokenBeforeFarmToken.toString())
  )
  // Call Deposit function from FarmToken
  console.log("Call Deposit Function")
  await farmToken.deposit(web3.utils.toWei("100", "ether"))
  console.log("*** My Token ***")
  balanceMyTokenAfterAccounts0 = await myToken.balanceOf(accounts[0])
  balanceMyTokenAfterFarmToken = await myToken.balanceOf(farmToken.address)
  console.log(
    "Balance MyToken After accounts[0] " +
      web3.utils.fromWei(balanceMyTokenAfterAccounts0.toString())
  )
  console.log(
    "Balance MyToken After TokenFarm " +
      web3.utils.fromWei(balanceMyTokenAfterFarmToken.toString())
  )

  console.log("*** Farm Token ***")
  balanceFarmTokenAfterAccounts0 = await farmToken.balanceOf(accounts[0])
  balanceFarmTokenAfterFarmToken = await farmToken.balanceOf(farmToken.address)
  console.log(
    "Balance FarmToken After accounts[0] " +
      web3.utils.fromWei(balanceFarmTokenAfterAccounts0.toString())
  )
  console.log(
    "Balance FarmToken After TokenFarm " +
      web3.utils.fromWei(balanceFarmTokenAfterFarmToken.toString())
  )

  // End function
  callback()
}
```

Para ejecutar este script: `truffle exec .\scripts\transferMyTokenToFarmToken.js`. Debería ver en la consola:

![salida de transferMyTokenToFarmToken.js](https://cdn-images-1.medium.com/max/2000/1*MoekE2QCw7vB98u5dl7ang.png)

_salida de transferMyTokenToFarmToken.js_

Como podemos ver, hemos depositado exitosamente MyTokens en el contrato inteligente, ya que la primera cuenta ahora tiene FarmTokens.

Para poder retirar:

```javascript
const MyToken = artifacts.require("MyToken")
const FarmToken = artifacts.require("FarmToken")

module.exports = async function (callback) {
  const accounts = await new web3.eth.getAccounts()
  const myToken = await MyToken.deployed()
  const farmToken = await FarmToken.deployed()

  // Verify accounts[0] and farmToken balance of MyToken before and after the transfer
  balanceMyTokenBeforeAccounts0 = await myToken.balanceOf(accounts[0])
  balanceMyTokenBeforeFarmToken = await myToken.balanceOf(farmToken.address)
  console.log("*** My Token ***")
  console.log(
    "Balance MyToken Before accounts[0] " +
      web3.utils.fromWei(balanceMyTokenBeforeAccounts0.toString())
  )
  console.log(
    "Balance MyToken Before TokenFarm " +
      web3.utils.fromWei(balanceMyTokenBeforeFarmToken.toString())
  )

  console.log("*** Farm Token ***")
  balanceFarmTokenBeforeAccounts0 = await farmToken.balanceOf(accounts[0])
  balanceFarmTokenBeforeFarmToken = await farmToken.balanceOf(farmToken.address)
  console.log(
    "Balance FarmToken Before accounts[0] " +
      web3.utils.fromWei(balanceFarmTokenBeforeAccounts0.toString())
  )
  console.log(
    "Balance FarmToken Before TokenFarm " +
      web3.utils.fromWei(balanceFarmTokenBeforeFarmToken.toString())
  )

  // Call Deposit function from FarmToken
  console.log("Call Withdraw Function")
  await farmToken.withdraw(web3.utils.toWei("100", "ether"))

  console.log("*** My Token ***")
  balanceMyTokenAfterAccounts0 = await myToken.balanceOf(accounts[0])
  balanceMyTokenAfterFarmToken = await myToken.balanceOf(farmToken.address)
  console.log(
    "Balance MyToken After accounts[0] " +
      web3.utils.fromWei(balanceMyTokenAfterAccounts0.toString())
  )
  console.log(
    "Balance MyToken After TokenFarm " +
      web3.utils.fromWei(balanceMyTokenAfterFarmToken.toString())
  )

  console.log("*** Farm Token ***")
  balanceFarmTokenAfterAccounts0 = await farmToken.balanceOf(accounts[0])
  balanceFarmTokenAfterFarmToken = await farmToken.balanceOf(farmToken.address)
  console.log(
    "Balance FarmToken After accounts[0] " +
      web3.utils.fromWei(balanceFarmTokenAfterAccounts0.toString())
  )
  console.log(
    "Balance FarmToken After TokenFarm " +
      web3.utils.fromWei(balanceFarmTokenAfterFarmToken.toString())
  )

  // End function
  callback()
}
```

Para ejecutar este script: `truffle exec .\scripts\withdrawMyTokenFromTokenFarm.js`. Como podemos ver a continuación, hemos recuperado con éxito los MyTokens y quemado los FarmTokens:

![salida de DropMyTokenFromTokenFarm.js](https://cdn-images-1.medium.com/max/2000/1*jHYlTFg0NgGbhASpsRvc0w.png)

_salida de DropMyTokenFromTokenFarm.js_

## Referencias {#references}

[Contratos: documentos OpenZeppelin](https://docs.openzeppelin.com/contracts/3.x/)

[Sweet Tools for Smart Contracts | Truffle Suite](https://www.trufflesuite.com/)

[Ganache | Truffle Suite](https://www.trufflesuite.com/ganache)

[¿Qué es DeFi? Guía para principiantes (actualizado 2021) (99bitcoins.com)](https://99bitcoins.com/what-is-defi/)

[DeFi - La tabla de clasificación de finanzas descentralizadas en DeFi Llama](https://defillama.com/)
