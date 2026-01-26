---
title: "ABI cortas para la optimización de calldata"
description: "Optimización de contratos inteligentes para rollups optimistas"
author: Ori Pomerantz
lang: es
tags: [ "capa 2" ]
skill: intermediate
published: 2022-04-01
---

## Introducción {#introduction}

En este artículo, aprenderá sobre los [rollups optimistas](/developers/docs/scaling/optimistic-rollups), el costo de las transacciones en ellos y cómo esa estructura de costos diferente nos obliga a optimizar aspectos distintos a los de la red principal de Ethereum.
También aprenderá a implementar esta optimización.

### Aviso de transparencia {#full-disclosure}

Soy empleado a tiempo completo de [Optimism](https://www.optimism.io/), así que los ejemplos de este artículo se ejecutarán en Optimism.
Sin embargo, la técnica explicada aquí debería funcionar igual de bien para otros rollups.

### Terminología {#terminology}

Al debatir sobre los rollups, el término 'capa 1' (L1) se utiliza para la red principal, la red de producción de Ethereum.
El término 'capa 2' (L2) se utiliza para el rollup o cualquier otro sistema que se basa en L1 para su seguridad, pero que realiza la mayor parte de su procesamiento fuera de la cadena.

## ¿Cómo podemos reducir aún más el costo de las transacciones en L2? {#how-can-we-further-reduce-the-cost-of-L2-transactions}

Los [rollups optimistas](/developers/docs/scaling/optimistic-rollups) tienen que preservar un registro de cada transacción histórica para que cualquiera pueda revisarlas y verificar que el estado actual es correcto.
La forma más barata de obtener datos en la red principal de Ethereum es escribirlos como calldata.
Esta solución fue elegida tanto por [Optimism](https://help.optimism.io/hc/en-us/articles/4413163242779-What-is-a-rollup-) como por [Arbitrum](https://developer.offchainlabs.com/docs/rollup_basics#intro-to-rollups).

### Costo de las transacciones en L2 {#cost-of-l2-transactions}

El costo de las transacciones en L2 tiene dos componentes:

1. Procesamiento en L2, que generalmente es extremadamente barato
2. Almacenamiento en L1, que está vinculado a los costos de gas de la red principal

Mientras escribo esto, en Optimism el costo del gas de L2 es de 0,001 [Gwei](/developers/docs/gas/#pre-london).
El costo del gas de L1, por otro lado, es de aproximadamente 40 gwei.
[Puede ver los precios actuales aquí](https://public-grafana.optimism.io/d/9hkhMxn7z/public-dashboard?orgId=1&refresh=5m).

Un byte de calldata cuesta 4 de gas (si es cero) o 16 de gas (si es cualquier otro valor).
Una de las operaciones más caras en la EVM es escribir en el almacenamiento.
El costo máximo de escribir una palabra de 32 bytes en el almacenamiento en L2 es de 22 100 de gas. Actualmente, esto es 22,1 gwei.
Así que si podemos ahorrar un solo byte cero de calldata, podremos escribir unos 200 bytes en el almacenamiento y aun así saldremos ganando.

### La ABI {#the-abi}

La gran mayoría de las transacciones acceden a un contrato desde una cuenta de titularidad externa.
La mayoría de los contratos están escritos en Solidity e interpretan su campo de datos según la [interfaz binaria de la aplicación (ABI)](https://docs.soliditylang.org/en/latest/abi-spec.html#formal-specification-of-the-encoding).

Sin embargo, la ABI fue diseñada para L1, donde un byte de calldata cuesta aproximadamente lo mismo que cuatro operaciones aritméticas, no para L2, donde un byte de calldata cuesta más de mil operaciones aritméticas.
El calldata se divide así:

| Sección              | Longitud | Bytes | Bytes desperdiciados | Gas desperdiciado | Bytes necesarios | Gas necesario |
| -------------------- | -------: | ----: | -------------------: | ----------------: | ---------------: | ------------: |
| Selector de función  |        4 |   0-3 |                    3 |                48 |                1 |            16 |
| Ceros                |       12 |  4-15 |                   12 |                48 |                0 |             0 |
| Dirección de destino |       20 | 16-35 |                    0 |                 0 |               20 |           320 |
| Cantidad             |       32 | 36-67 |                   17 |                64 |               15 |           240 |
| Total                |       68 |       |                      |               160 |                  |           576 |

Explicación:

- **Selector de función**: el contrato tiene menos de 256 funciones, por lo que podemos distinguirlas con un solo byte.
  Estos bytes suelen ser distintos de cero y, por lo tanto, [cuestan dieciséis de gas](https://eips.ethereum.org/EIPS/eip-2028).
- **Ceros**: estos bytes siempre son cero porque una dirección de veinte bytes no requiere una palabra de treinta y dos bytes para contenerla.
  Los bytes que valen cero cuestan cuatro de gas ([consulte el Yellow Paper](https://ethereum.github.io/yellowpaper/paper.pdf), Apéndice G,
  p. 27, el valor para `G`<sub>`txdatazero`</sub>).
- **Cantidad**: si asumimos que en este contrato `decimals` es dieciocho (el valor normal) y la cantidad máxima de tokens que transferimos será de 10<sup>18</sup>, obtendremos una cantidad máxima de 10<sup>36</sup>.
  256<sup>15</sup> > 10<sup>36</sup>, por lo que quince bytes son suficientes.

Un desperdicio de 160 de gas en L1 es normalmente insignificante. Una transacción cuesta al menos [21 000 de gas](https://yakkomajuri.medium.com/blockchain-definition-of-the-week-ethereum-gas-2f976af774ed), por lo que un 0,8 % adicional no importa.
Sin embargo, en L2 las cosas son diferentes. Casi todo el costo de la transacción es por escribirla en L1.
Además del calldata de la transacción, hay 109 bytes de encabezado de transacción (dirección de destino, firma, etc.).
Por lo tanto, el costo total es de `109*16+576+160=2480`, y estamos desperdiciando alrededor del 6,5 % de eso.

## Reducir los costos cuando no se tiene el control del destino {#reducing-costs-when-you-dont-control-the-destination}

Suponiendo que no tiene control sobre el contrato de destino, aún puede usar una solución similar a [esta](https://github.com/qbzzt/ethereum.org-20220330-shortABI).
Repasemos los archivos relevantes.

### Token.sol {#token-sol}

[Este es el contrato de destino](https://github.com/qbzzt/ethereum.org-20220330-shortABI/blob/master/contracts/Token.sol).
Es un contrato ERC-20 estándar, con una característica adicional.
Esta función `faucet` permite a cualquier usuario obtener algunos tokens para su uso.
Haría inútil un contrato de producción ERC-20, pero hace la vida más fácil cuando existe un ERC-20 solo para facilitar las pruebas.

```solidity
    /**
     * @dev Proporciona al llamador 1000 tokens para que los use
     */
    function faucet() external {
        _mint(msg.sender, 1000);
    }   // function faucet
```

### CalldataInterpreter.sol {#calldatainterpreter-sol}

[Este es el contrato al que se supone que las transacciones deben llamar con un calldata más corto](https://github.com/qbzzt/ethereum.org-20220330-shortABI/blob/master/contracts/CalldataInterpreter.sol).
Vamos a repasarlo línea por línea.

```solidity
//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;


import { OrisUselessToken } from "./Token.sol";
```

Necesitamos la función del token para saber cómo llamarla.

```solidity
contract CalldataInterpreter {

    OrisUselessToken public immutable token;
```

La dirección del token para el que somos un proxy.

```solidity
    /**
     * @dev Especifica la dirección del token
     * @param tokenAddr_ dirección del contrato ERC-20
     */
    constructor(
        address tokenAddr_
    )  {
        token = OrisUselessToken(tokenAddr_);
    }   // constructor
```

La dirección del token es el único parámetro que debemos especificar.

```solidity
    function calldataVal(uint startByte, uint length)
        private pure returns (uint) {
```

Lee un valor del calldata.

```solidity
        uint _retVal;

        require(length < 0x21,
            "El límite de longitud de calldataVal es de 32 bytes");

        require(length + startByte <= msg.data.length,
            "calldataVal está intentando leer más allá de calldatasize");
```

Vamos a cargar una sola palabra de 32 bytes (256 bits) en la memoria y a eliminar los bytes que no forman parte del campo que queremos.
Este algoritmo no funciona para valores de más de 32 bytes y, por supuesto, no podemos leer más allá del final del calldata.
En L1 podría ser necesario omitir estas pruebas para ahorrar gas, pero en L2 el gas es extremadamente barato, lo que permite cualquier comprobación de validez que se nos ocurra.

```solidity
        assembly {
            _retVal := calldataload(startByte)
        }
```

Podríamos haber copiado los datos de la llamada a `fallback()` (véase más abajo), pero es más fácil usar [Yul](https://docs.soliditylang.org/en/v0.8.12/yul.html), el lenguaje de ensamblado de la EVM.

Aquí usamos [el código de operación CALLDATALOAD](https://www.evm.codes/#35) para leer los bytes desde `startByte` hasta `startByte+31` en la pila.
En general, la sintaxis de un código de operación en Yul es `<nombre del código de operación>(<primer valor de la pila, si lo hay>, <segundo valor de la pila, si lo hay>...)`.

```solidity

        _retVal = _retVal >> (256-length*8);
```

Solo los bytes de `length` más significativos forman parte del campo, por lo que hacemos un [desplazamiento a la derecha](https://en.wikipedia.org/wiki/Logical_shift) para deshacernos de los otros valores.
Esto tiene la ventaja añadida de mover el valor a la derecha del campo, por lo que es el valor en sí mismo en lugar del valor multiplicado por 256<sup>algo</sup>.

```solidity

        return _retVal;
    }


    fallback() external {
```

Cuando una llamada a un contrato de Solidity no coincide con ninguna de las firmas de función, llama a [la función `fallback()`](https://docs.soliditylang.org/en/v0.8.12/contracts.html#fallback-function) (suponiendo que haya una).
En el caso de `CalldataInterpreter`, _cualquier_ llamada llega aquí porque no hay otras funciones `external` o `public`.

```solidity
        uint _func;

        _func = calldataVal(0, 1);
```

Lea el primer byte del calldata, que nos indica la función.
Hay dos razones por las que una función no estaría disponible aquí:

1. Las funciones que son `pure` o `view` no cambian el estado y no cuestan gas (cuando se llaman fuera de la cadena).
   No tiene sentido intentar reducir su costo de gas.
2. Funciones que dependen de [`msg.sender`](https://docs.soliditylang.org/en/v0.8.12/units-and-global-variables.html#block-and-transaction-properties).
   El valor de `msg.sender` será la dirección de `CalldataInterpreter`, no la del llamador.

Desafortunadamente, al observar [las especificaciones de ERC-20](https://eips.ethereum.org/EIPS/eip-20), esto solo deja una función, `transfer`.
Esto nos deja con solo dos funciones: `transfer` (porque podemos llamar a `transferFrom`) y `faucet` (porque podemos transferir los tokens de vuelta a quien nos llamó).

```solidity
        // Llamar a los métodos de cambio de estado del token usando
        // la información del calldata

        // faucet
        if (_func == 1) {
```

Una llamada a `faucet()`, que no tiene parámetros.

```solidity
            token.faucet();
            token.transfer(msg.sender,
                token.balanceOf(address(this)));
        }
```

Después de llamar a `token.faucet()`, obtenemos tokens. Sin embargo, como contrato proxy, no **necesitamos** tokens.
La EOA (cuenta de propiedad externa) o el contrato que nos llamó sí que los necesita.
Así que transferimos todos nuestros tokens a quien nos llamó.

```solidity
        // transferir (asumir que tenemos una asignación para ello)
        if (_func == 2) {
```

La transferencia de tokens requiere dos parámetros: la dirección de destino y la cantidad.

```solidity
            token.transferFrom(
                msg.sender,
```

Solo permitimos que los llamadores transfieran los tokens que poseen

```solidity
                address(uint160(calldataVal(1, 20))),
```

La dirección de destino comienza en el byte n.º 1 (el byte n.º 0 es la función).
Como dirección, tiene 20 bytes de longitud.

```solidity
                calldataVal(21, 2)
```

Para este contrato en particular, asumimos que la cantidad máxima de tokens que alguien querría transferir cabe en dos bytes (menos de 65 536).

```solidity
            );
        }
```

En general, una transferencia ocupa 35 bytes de calldata:

| Sección              | Longitud | Bytes |
| -------------------- | -------: | ----: |
| Selector de función  |        1 |     0 |
| Dirección de destino |       32 |  1-32 |
| Cantidad             |        2 | 33-34 |

```solidity
    }   // fallback

}       // contract CalldataInterpreter
```

### test.js {#test-js}

Este [test unitario de JavaScript](https://github.com/qbzzt/ethereum.org-20220330-shortABI/blob/master/test/test.js) nos muestra cómo usar este mecanismo (y cómo verificar que funciona correctamente).
Voy a suponer que entiende [chai](https://www.chaijs.com/) y [ethers](https://docs.ethers.io/v5/) y solo explicaré las partes que se aplican específicamente al contrato.

```js
const { expect } = require("chai");

describe("CalldataInterpreter", function () {
  it("Debería dejarnos usar tokens", async function () {
    const Token = await ethers.getContractFactory("OrisUselessToken")
    const token = await Token.deploy()
    await token.deployed()
    console.log("Dirección del token:", token.address)

    const Cdi = await ethers.getContractFactory("CalldataInterpreter")
    const cdi = await Cdi.deploy(token.address)
    await cdi.deployed()
    console.log("Dirección de CalldataInterpreter:", cdi.address)

    const signer = await ethers.getSigner()
```

Comenzamos por implementar ambos contratos.

```javascript
    // Obtener tokens para usar
    const faucetTx = {
```

No podemos usar las funciones de alto nivel que normalmente usaríamos (como `token.faucet()`) para crear transacciones, porque no seguimos la ABI.
En cambio, tenemos que construir la transacción nosotros mismos y luego enviarla.

```javascript
      to: cdi.address,
      data: "0x01"
```

Hay dos parámetros que debemos proporcionar para la transacción:

1. `to`, la dirección de destino.
   Este es el contrato intérprete de calldata.
2. `data`, el calldata que se enviará.
   En el caso de una llamada de faucet, los datos son un solo byte, `0x01`.

```javascript

    }
    await (await signer.sendTransaction(faucetTx)).wait()
```

Llamamos al [método `sendTransaction` del firmante](https://docs.ethers.io/v5/api/signer/#Signer-sendTransaction) porque ya hemos especificado el destino (`faucetTx.to`) y necesitamos que se firme la transacción.

```javascript
// Comprobar que el faucet proporciona los tokens correctamente
expect(await token.balanceOf(signer.address)).to.equal(1000)
```

Aquí verificamos el saldo.
No es necesario ahorrar gas en las funciones `view`, por lo que las ejecutamos con normalidad.

```javascript
// Dar al CDI una asignación (las aprobaciones no se pueden intermediar)
const approveTX = await token.approve(cdi.address, 10000)
await approveTX.wait()
expect(await token.allowance(signer.address, cdi.address)).to.equal(10000)
```

Otorgue al intérprete de calldata una asignación para poder realizar transferencias.

```javascript
// Transferir tokens
const destAddr = "0xf5a6ead936fb47f342bb63e676479bddf26ebe1d"
const transferTx = {
  to: cdi.address,
  data: "0x02" + destAddr.slice(2, 42) + "0100",
}
```

Cree una transacción de transferencia. El primer byte es «0x02», seguido de la dirección de destino y, finalmente, la cantidad (0x0100, que es 256 en decimal).

```javascript
    await (await signer.sendTransaction(transferTx)).wait()

    // Comprobar que tenemos 256 tokens menos
    expect (await token.balanceOf(signer.address)).to.equal(1000-256)

    // Y que nuestro destino los recibió
    expect (await token.balanceOf(destAddr)).to.equal(256)
  })    // it
})      // describe
```

## Reducir el costo cuando se tiene el control del contrato de destino {#reducing-the-cost-when-you-do-control-the-destination-contract}

Si controla el contrato de destino, puede crear funciones que omitan las verificaciones de `msg.sender` porque confían en el intérprete del calldata.
[Puede ver un ejemplo de cómo funciona esto aquí, en la rama `control-contract`](https://github.com/qbzzt/ethereum.org-20220330-shortABI/tree/control-contract).

Si el contrato solo respondiera a transacciones externas, podríamos arreglárnoslas teniendo solo un contrato.
Sin embargo, eso rompería la [componibilidad](/developers/docs/smart-contracts/composability/).
Es mucho mejor tener un contrato que responda a llamadas normales ERC-20 y otro contrato que responda a transacciones con llamadas de datos cortas.

### Token.sol {#token-sol-2}

En este ejemplo podemos modificar `Token.sol`.
Esto nos permite tener un número de funciones a las que solo puede llamar el proxy.
Estas son las nuevas partes:

```solidity
    // La única dirección a la que se le permite especificar la dirección de CalldataInterpreter
    address owner;

    // La dirección de CalldataInterpreter
    address proxy = address(0);
```

El contrato ERC-20 necesita conocer la identidad del proxy autorizado.
Sin embargo, no podemos establecer esta variable en el constructor, porque aún no conocemos el valor.
Este contrato se instancia primero porque el proxy espera la dirección del token en su constructor.

```solidity
    /**
     * @dev Llama al constructor de ERC20.
     */
    constructor(
    ) ERC20("Oris useless token-2", "OUT-2") {
        owner = msg.sender;
    }
```

La dirección del creador (llamada `owner`) se almacena aquí porque esa es la única dirección a la que se le permite establecer el proxy.

```solidity
    /**
     * @dev establece la dirección para el proxy (el CalldataInterpreter).
     * Solo puede ser llamado una vez por el propietario
     */
    function setProxy(address _proxy) external {
        require(msg.sender == owner, "Solo puede ser llamado por el propietario");
        require(proxy == address(0), "El proxy ya está configurado");

        proxy = _proxy;
    }    // function setProxy
```

El proxy tiene acceso privilegiado, porque puede omitir las revisiones de seguridad.
Para asegurarnos de que podamos confiar en el proxy, solo le permitimos a `owner` llamar a esta función y solo una vez.
Una vez que `proxy` tenga un valor real (diferente a cero), ese valor no puede cambiar, así que incluso si el propietario decide volverse malicioso o se revela su mnemónico, seguimos estando seguros.

```solidity
    /**
     * @dev Algunas funciones solo pueden ser llamadas por el proxy.
     */
    modifier onlyProxy {
```

Esta es una [función `modifier`](https://www.tutorialspoint.com/solidity/solidity_function_modifiers.htm), que modifica el funcionamiento de otras funciones.

```solidity
      require(msg.sender == proxy);
```

Primero, verificamos que nos ha llamado el proxy y ningún otro.
Si no, `revert`.

```solidity
      _;
    }
```

En caso de ser así, ejecutamos la función que modificamos.

```solidity
   /* Funciones que permiten que el proxy realmente represente a las cuentas */

    function transferProxy(address from, address to, uint256 amount)
        public virtual onlyProxy() returns (bool)
    {
        _transfer(from, to, amount);
        return true;
    }

    function approveProxy(address from, address spender, uint256 amount)
        public virtual onlyProxy() returns (bool)
    {
        _approve(from, spender, amount);
        return true;
    }

    function transferFromProxy(
        address spender,
        address from,
        address to,
        uint256 amount
    ) public virtual onlyProxy() returns (bool)
    {
        _spendAllowance(from, spender, amount);
        _transfer(from, to, amount);
        return true;
    }
```

Esas son tres operaciones que normalmente requieren que el mensaje provenga directamente de la entidad que transfiere los tokens o aprueba una autorización.
Aquí tenemos una versión proxy de estas operaciones que:

1. Es modificada por `onlyProxy()` para que nadie más pueda controlarlas.
2. Obtiene la dirección que normalmente sería `msg.sender` como un parámetro adicional.

### CalldataInterpreter.sol {#calldatainterpreter-sol-2}

El intérprete de calldata es casi idéntico al anterior, excepto que las funciones intermediadas reciben un parámetro `msg.sender` y no es necesaria una asignación para `transfer`.

```solidity
        // transferir (no se necesita asignación)
        if (_func == 2) {
            token.transferProxy(
                msg.sender,
                address(uint160(calldataVal(1, 20))),
                calldataVal(21, 2)
            );
        }

        // aprobar
        if (_func == 3) {
            token.approveProxy(
                msg.sender,
                address(uint160(calldataVal(1, 20))),
                calldataVal(21, 2)
            );
        }

        // transferFrom
        if (_func == 4) {
            token.transferFromProxy(
                msg.sender,
                address(uint160(calldataVal( 1, 20))),
                address(uint160(calldataVal(21, 20))),
                calldataVal(41, 2)
            );
        }
```

### Test.js {#test-js-2}

Hay algunos cambios entre el anterior código de prueba y este.

```js
const Cdi = await ethers.getContractFactory("CalldataInterpreter")
const cdi = await Cdi.deploy(token.address)
await cdi.deployed()
await token.setProxy(cdi.address)
```

Necesitamos decirle al contrato ERC-20 en cuál proxy debe confiar.

```js
console.log("Dirección de CalldataInterpreter:", cdi.address)

// Necesitamos dos firmantes para verificar las asignaciones
const signers = await ethers.getSigners()
const signer = signers[0]
const poorSigner = signers[1]
```

Para verificar `approve()` y `transferFrom()`, necesitamos un segundo firmante.
Lo llamaremos `poorSigner` porque no obtiene ninguno de nuestros tokens (por supuesto, es necesario contar con ETH).

```js
// Transferir tokens
const destAddr = "0xf5a6ead936fb47f342bb63e676479bddf26ebe1d"
const transferTx = {
  to: cdi.address,
  data: "0x02" + destAddr.slice(2, 42) + "0100",
}
await (await signer.sendTransaction(transferTx)).wait()
```

Debido a que el contrato ERC-20 confía en el proxy (`cdi`), no necesitamos una asignación para transmitir transferencias.

```js
// aprobación y transferFrom
const approveTx = {
  to: cdi.address,
  data: "0x03" + poorSigner.address.slice(2, 42) + "00FF",
}
await (await signer.sendTransaction(approveTx)).wait()

const destAddr2 = "0xE1165C689C0c3e9642cA7606F5287e708d846206"

const transferFromTx = {
  to: cdi.address,
  data: "0x04" + signer.address.slice(2, 42) + destAddr2.slice(2, 42) + "00FF",
}
await (await poorSigner.sendTransaction(transferFromTx)).wait()

// Comprobar que la combinación de aprobación y transferFrom se realizó correctamente
expect(await token.balanceOf(destAddr2)).to.equal(255)
```

Pruebe las dos nuevas funciones.
Tenga en cuenta que `transferFromTx` requiere dos parámetros de dirección: quien proporciona la asignación y el receptor.

## Conclusión {#conclusion}

Tanto [Optimism](https://medium.com/ethereum-optimism/the-road-to-sub-dollar-transactions-part-2-compression-edition-6bb2890e3e92) como [Arbitrum](https://developer.offchainlabs.com/docs/special_features) están buscando formas de reducir el tamaño del calldata escrito en L1 y, por lo tanto, el costo de las transacciones.
Sin embargo, como proveedores de infraestructura que buscamos soluciones genéricas, nuestras habilidades están limitadas.
Como desarrollador de dapp, tiene conocimiento específico de la aplicación, lo que le permite optimizar su calldata mejor que nosotros en una solución genérica.
Esperamos que este artículo pueda ayudarle a encontrar la solución ideal a sus necesidades.

[Vea aquí más de mi trabajo](https://cryptodocguy.pro/).

