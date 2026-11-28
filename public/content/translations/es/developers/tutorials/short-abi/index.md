---
title: "ABI cortas para la optimización de datos de llamada"
description: "Optimización de contratos inteligentes para rollups optimistas"
author: Ori Pomerantz
lang: es
tags: ["capa 2 (L2)"]
skill: intermediate
breadcrumb: ABI cortas
published: 2022-04-01
---

## Introducción {#introduction}

En este artículo, aprenderá sobre los [rollups optimistas](/developers/docs/scaling/optimistic-rollups), el costo de las transacciones en ellos y cómo esa estructura de costos diferente requiere que optimicemos para cosas distintas que en la red principal de Ethereum.
También aprenderá cómo implementar esta optimización.

### Divulgación completa {#full-disclosure}

Soy un empleado a tiempo completo de [Optimism](https://www.optimism.io/), por lo que los ejemplos de este artículo se ejecutarán en Optimism.
Sin embargo, la técnica explicada aquí debería funcionar igual de bien para otros rollups.

### Terminología {#terminology}

Al hablar de rollups, el término 'capa 1 (L1)' se utiliza para la Red principal, la red de producción de Ethereum.
El término 'capa 2 (L2)' se utiliza para el rollup o cualquier otro sistema que dependa de la L1 para su seguridad, pero que realiza la mayor parte de su procesamiento fuera de la cadena.

## ¿Cómo podemos reducir aún más el costo de las transacciones de L2? {#how-can-we-further-reduce-the-cost-of-l2-transactions}

Los [rollups optimistas](/developers/docs/scaling/optimistic-rollups) tienen que preservar un registro de cada transacción histórica para que cualquiera pueda revisarlas y verificar que el estado actual sea correcto.
Cuando se escribió este artículo, la forma más barata de introducir datos en la red principal de Ethereum era escribirlos como datos de llamada.
Esta solución fue elegida tanto por [Optimism](https://docs.optimism.io/op-stack/protocol/overview) como por [Arbitrum](https://docs.arbitrum.io/welcome/arbitrum-gentle-introduction).
Desde la actualización Dencun (marzo de 2024), los rollups pueden publicar estos datos en [blobs](/roadmap/danksharding/) en su lugar, que son mucho más baratos.

### Costo de las transacciones de L2 {#cost-of-l2-transactions}

El costo de las transacciones de L2 se compone de dos elementos:

1. Procesamiento de L2, que suele ser extremadamente barato
2. Almacenamiento de L1, que está vinculado a los costos de gas de la Red principal

Cuando escribí este artículo en 2022, en Optimism el costo del gas de L2 era de 0.001 [Gwei](/developers/docs/gas/#what-is-gas).
El costo del gas de L1, por otro lado, era de aproximadamente 40 Gwei.

Un byte de datos de llamada cuesta 4 de gas (si es cero) o 16 de gas (si es cualquier otro valor).
Una de las operaciones más caras en la EVM es escribir en el almacenamiento.
El costo máximo de escribir una palabra de 32 bytes en el almacenamiento en L2 es de 22100 de gas. En ese momento, esto era 22.1 Gwei.
Así que si pudiéramos ahorrar un solo byte cero de datos de llamada, podríamos escribir unos 200 bytes en el almacenamiento y aún así salir ganando.

#### Cómo cambiaron los costos de L2 en 2024 {#how-l2-costs-changed-in-2024}

La fórmula de la [tarifa de datos de L1](https://docs.optimism.io/op-stack/transactions/fees#l1-data-fee) de OP Stack ha cambiado dos veces desde que se escribió este artículo:

- Con la [actualización Ecotone](https://docs.optimism.io/op-stack/transactions/fees#ecotone) (marzo de 2024), las cadenas de OP Stack comenzaron a publicar datos de transacciones en blobs, que tienen un precio basado en una tarifa base de blob separada (y generalmente mucho más baja).
- Con la [actualización Fjord](https://docs.optimism.io/op-stack/transactions/fees#fjord) (julio de 2024), la tarifa de datos de L1 se basa en una estimación del tamaño de la transacción después de la compresión [FastLZ](https://github.com/ariya/FastLZ), con un mínimo de 100 bytes por transacción ([consulte la especificación](https://specs.optimism.io/protocol/fjord/exec-engine.html)).

Esto cambia el análisis en el resto de este artículo de tres maneras:

1. Los bytes cero se comprimen bien, por lo que son casi gratuitos.
   Las cifras de 4 y 16 de gas por byte a continuación son el costo de los datos de llamada de L1, no lo que paga por los datos de transacciones en una cadena de OP Stack en la actualidad.
2. Por debajo del mínimo de 100 bytes, los datos de llamada más cortos no ahorran nada.
   Por ejemplo, en octubre de 2026 en OP Mainnet, un `transfer` estándar de ERC-20 (68 bytes de datos de llamada) y la versión corta de 23 bytes de este artículo habrían pagado exactamente la misma tarifa de datos de L1, el mínimo, aproximadamente 1 Gwei (10<sup>-9</sup> ETH).
3. Debido a que el espacio de los blobs es barato, la tarifa de ejecución de L2 ahora suele ser mayor que la tarifa de datos de L1.
   A un precio del gas de L2 de 0.001 Gwei, 1000 de gas cuestan 1 Gwei, lo mismo que toda esa tarifa de datos de L1, por lo que el gas de ejecución adicional de pasar por un contrato proxy puede costar más que los bytes que ahorra.

El principio sigue siendo válido: menos bytes comprimidos significan una tarifa de datos de L1 más baja.
Las ABI cortas tienen más sentido para transacciones con muchos datos que no se comprimen bien, y en cadenas o en momentos en que los datos de L1 son caros.
Para ver lo que pagaría una transacción específica, llame a `getL1Fee` en el [despliegue previo de `GasPriceOracle`](https://specs.optimism.io/protocol/predeploys.html#gaspriceoracle) con la transacción sin firmar.
Por ejemplo, usando `cast` de [Foundry](https://getfoundry.sh/introduction/installation/):

```sh
TX=$(cast mktx --raw-unsigned --from <your address> --chain 10 --nonce 0 --gas-limit 100000 \
  --priority-gas-price 1000000 --gas-price 1000000 <destination address> <calldata>)
cast call 0x420000000000000000000000000000000000000F "getL1Fee(bytes)(uint256)" $TX --rpc-url https://mainnet.optimism.io
```

El resultado está en Wei.

### La ABI {#the-abi}

La gran mayoría de las transacciones acceden a un contrato desde una cuenta de propiedad externa.
La mayoría de los contratos están escritos en Solidity e interpretan su campo de datos según [la interfaz binaria de aplicación (ABI)](https://docs.soliditylang.org/en/latest/abi-spec.html#formal-specification-of-the-encoding).

Sin embargo, la ABI fue diseñada para L1, donde un byte de datos de llamada cuesta aproximadamente lo mismo que cuatro operaciones aritméticas, no para L2 donde (a precios de 2022) un byte de datos de llamada cuesta más de mil operaciones aritméticas.
Los datos de llamada se dividen de la siguiente manera:

| Sección | Longitud | Bytes | Bytes desperdiciados | Gas desperdiciado | Bytes necesarios | Gas necesario |
| ------------------- | -----: | ----: | -----------: | ---------: | --------------: | ------------: |
| Selector de función | 4 | 0-3 | 3 | 48 | 1 | 16 |
| Ceros | 12 | 4-15 | 12 | 48 | 0 | 0 |
| Dirección de destino | 20 | 16-35 | 0 | 0 | 20 | 320 |
| Cantidad | 32 | 36-67 | 17 | 68 | 15 | 240 |
| Total | 68 | | | 164 | | 576 |

Explicación:

- **Selector de función**: El contrato tiene menos de 256 funciones, por lo que podemos distinguirlas con un solo byte.
  Estos bytes normalmente no son cero y, por lo tanto, [cuestan dieciséis de gas](https://eips.ethereum.org/EIPS/eip-2028).
- **Ceros**: Estos bytes siempre son cero porque una dirección de veinte bytes no requiere una palabra de treinta y dos bytes para contenerla.
  Los bytes que contienen cero cuestan cuatro de gas ([consulte el libro amarillo](https://ethereum.github.io/yellowpaper/paper.pdf), Apéndice G,
  pág. 27, el valor de `G`<sub>`txdatazero`</sub>).
- **Cantidad**: Si asumimos que en este contrato `decimals` es dieciocho (el valor normal) y la cantidad máxima de tokens que transferimos será 10<sup>18</sup>, obtenemos una cantidad máxima de 10<sup>36</sup>.
  256<sup>15</sup> &gt; 10<sup>36</sup>, por lo que quince bytes son suficientes.

Un desperdicio de 164 de gas en L1 normalmente es insignificante. Una transacción cuesta al menos [21,000 de gas](https://yakkomajuri.medium.com/blockchain-definition-of-the-week-ethereum-gas-2f976af774ed), por lo que un 0.8% adicional no importa.
Sin embargo, en L2 en 2022, las cosas eran diferentes. Casi todo el costo de la transacción era escribirla en L1.
Además de los datos de llamada de la transacción, hay 109 bytes de encabezado de transacción (dirección de destino, firma, etc.).
Por lo tanto, el costo total es `109*16+576+164=2484`, y estamos desperdiciando aproximadamente el 6.6% de eso.

## Reducción de costos cuando no controla el destino {#reducing-costs-when-you-dont-control-the-destination}

Asumiendo que no tiene control sobre el contrato de destino, aún puede usar una solución similar a [esta](https://github.com/qbzzt/ethereum.org-20220330-shortABI).

Para ejecutarla, necesita [Node.js](https://nodejs.org/) y git:

```sh
git clone https://github.com/qbzzt/ethereum.org-20220330-shortABI.git
cd ethereum.org-20220330-shortABI
npm install
npx hardhat test
```

La prueba implementa los contratos en la red local integrada de Hardhat, por lo que no necesita ningún ETH.
El repositorio usa Hardhat 2.9, por lo que en las versiones actuales de Node.js advierte que su versión de Node.js no es compatible, pero la prueba aún se aprueba.

Repasemos los archivos relevantes.

### Token.sol {#token-sol}

[Este es el contrato de destino](https://github.com/qbzzt/ethereum.org-20220330-shortABI/blob/master/contracts/Token.sol).
Es un contrato ERC-20 estándar, con una característica adicional.
Esta función `faucet` permite a cualquier usuario obtener algunos tokens para usar.
Haría inútil un contrato ERC-20 de producción, pero facilita la vida cuando un ERC-20 existe solo para facilitar las pruebas.

```solidity
    /**
     * @dev Da al llamador 1000 tokens para jugar
     */
    function faucet() external {
        _mint(msg.sender, 1000);
    }   // function faucet
```

### CalldataInterpreter.sol {#calldatainterpreter-sol}

[Este es el contrato que se supone que las transacciones deben llamar con datos de llamada más cortos](https://github.com/qbzzt/ethereum.org-20220330-shortABI/blob/master/contracts/CalldataInterpreter.sol).
Repasémoslo línea por línea.

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

La dirección del token es el único parámetro que necesitamos especificar.

```solidity
    function calldataVal(uint startByte, uint length)
        private pure returns (uint) {
```

Leer un valor de los datos de llamada.

```solidity
        uint _retVal;

        require(length < 0x21,
            "calldataVal length limit is 32 bytes");

        require(length + startByte <= msg.data.length,
            "calldataVal trying to read beyond calldatasize");
```

Vamos a cargar una sola palabra de 32 bytes (256 bits) en la memoria y eliminar los bytes que no forman parte del campo que queremos.
Este algoritmo no funciona para valores de más de 32 bytes y, por supuesto, no podemos leer más allá del final de los datos de llamada.
En L1 podría ser necesario omitir estas pruebas para ahorrar gas, pero en L2 el gas es extremadamente barato, lo que permite cualquier control de cordura que se nos ocurra.

```solidity
        assembly {
            _retVal := calldataload(startByte)
        }
```

Podríamos haber copiado los datos de la llamada a `fallback()` (ver a continuación), pero es más fácil usar [Yul](https://docs.soliditylang.org/en/v0.8.12/yul.html), el lenguaje ensamblador de la EVM.

Aquí usamos [el código de operación CALLDATALOAD](https://www.evm.codes/#35) para leer los bytes `startByte` a `startByte+31` en la pila.
En general, la sintaxis de un código de operación en Yul es `<opcode name>(<first stack value, if any>,<second stack value, if any>...)`.

```solidity

        _retVal = _retVal >> (256-length*8);
```

Solo los `length` bytes más significativos forman parte del campo, por lo que [desplazamos a la derecha](https://en.wikipedia.org/wiki/Logical_shift) para deshacernos de los otros valores.
Esto tiene la ventaja adicional de mover el valor a la derecha del campo, por lo que es el valor en sí mismo en lugar del valor multiplicado por 256<sup>algo</sup>.

```solidity

        return _retVal;
    }


    fallback() external {
```

Cuando una llamada a un contrato de Solidity no coincide con ninguna de las firmas de función, llama a [la función `fallback()`](https://docs.soliditylang.org/en/v0.8.12/contracts.html#fallback-function) (asumiendo que hay una).
En el caso de `CalldataInterpreter`, _cualquier_ llamada llega aquí porque no hay otras funciones `external` o `public`.

```solidity
        uint _func;

        _func = calldataVal(0, 1);
```

Lea el primer byte de los datos de llamada, que nos indica la función.
Hay dos razones por las que una función no estaría disponible aquí:

1. Las funciones que son `pure` o `view` no cambian el estado y no cuestan gas (cuando se llaman fuera de la cadena).
   No tiene sentido intentar reducir su costo de gas.
2. Funciones que dependen de [`msg.sender`](https://docs.soliditylang.org/en/v0.8.12/units-and-global-variables.html#block-and-transaction-properties).
   El valor de `msg.sender` va a ser la dirección de `CalldataInterpreter`, no el llamador.

Desafortunadamente, [al observar las especificaciones de ERC-20](https://eips.ethereum.org/EIPS/eip-20), esto deja solo una función estándar, `transfer` (porque podemos llamar a `transferFrom`).
Nuestro token de prueba también tiene `faucet`, que podemos admitir porque podemos transferir los tokens de vuelta a quien nos llamó.

```solidity

        // Llama a los métodos de cambio de estado del token usando
        // información de los datos de llamada

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

Después de llamar a `token.faucet()` obtenemos tokens. Sin embargo, como contrato proxy, no **necesitamos** tokens.
La cuenta de propiedad externa (EOA) o el contrato que nos llamó sí los necesita.
Así que transferimos todos nuestros tokens a quien nos llamó.

```solidity
        // transferencia (asume que tenemos una asignación para ello)
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

Para este contrato en particular, asumimos que la cantidad máxima de tokens que alguien querría transferir cabe en dos bytes (menos de 65536).

```solidity
            );
        }
```

En general, una transferencia requiere 23 bytes de datos de llamada:

| Sección | Longitud | Bytes |
| ------------------- | -----: | ----: |
| Selector de función | 1 | 0 |
| Dirección de destino | 20 | 1-20 |
| Cantidad | 2 | 21-22 |

```solidity
    }   // fallback

}       // contrato CalldataInterpreter
```

### test.js {#test-js}

[Esta prueba unitaria en JavaScript](https://github.com/qbzzt/ethereum.org-20220330-shortABI/blob/master/test/test.js) nos muestra cómo usar este mecanismo (y cómo verificar que funciona correctamente).
Voy a asumir que entiende [chai](https://www.chaijs.com/) y [ethers](https://docs.ethers.org/v5/) y solo explicaré las partes que se aplican específicamente al contrato.

```js
const { expect } = require("chai");

describe("CalldataInterpreter", function () {
  it("Should let us use tokens", async function () {
    const Token = await ethers.getContractFactory("OrisUselessToken")
    const token = await Token.deploy()
    await token.deployed()
    console.log("Token addr:", token.address)

    const Cdi = await ethers.getContractFactory("CalldataInterpreter")
    const cdi = await Cdi.deploy(token.address)
    await cdi.deployed()
    console.log("CalldataInterpreter addr:", cdi.address)

    const signer = await ethers.getSigner()
```

Comenzamos implementando ambos contratos.

```javascript
    // Obtener tokens para jugar
    const faucetTx = {
```

No podemos usar las funciones de alto nivel que usaríamos normalmente (como `token.faucet()`) para crear transacciones, porque no seguimos la ABI.
En su lugar, tenemos que construir la transacción nosotros mismos y luego enviarla.

```javascript
      to: cdi.address,
      data: "0x01"
```

Hay dos parámetros que debemos proporcionar para la transacción:

1. `to`, la dirección de destino.
   Este es el contrato intérprete de datos de llamada.
2. `data`, los datos de llamada a enviar.
   En el caso de una llamada al faucet, los datos son un solo byte, `0x01`.

```javascript

    }
    await (await signer.sendTransaction(faucetTx)).wait()
```

Llamamos [al método `sendTransaction` del firmante](https://docs.ethers.org/v5/api/signer/#Signer-sendTransaction) porque ya especificamos el destino (`faucetTx.to`) y necesitamos que la transacción esté firmada.

```javascript
// Comprobar que el faucet proporciona los tokens correctamente
expect(await token.balanceOf(signer.address)).to.equal(1000)
```

Aquí verificamos el saldo.
No hay necesidad de ahorrar gas en las funciones `view`, así que simplemente las ejecutamos normalmente.

```javascript
// Dar al CDI una asignación (las aprobaciones no pueden ser delegadas por proxy)
const approveTX = await token.approve(cdi.address, 10000)
await approveTX.wait()
expect(await token.allowance(signer.address, cdi.address)).to.equal(10000)
```

Otorgue al intérprete de datos de llamada una asignación para poder realizar transferencias.

```javascript
// Transferir tokens
const destAddr = "0xf5a6ead936fb47f342bb63e676479bddf26ebe1d"
const transferTx = {
  to: cdi.address,
  data: "0x02" + destAddr.slice(2, 42) + "0100",
}
```

Cree una transacción de transferencia. El primer byte es "0x02", seguido de la dirección de destino y, finalmente, la cantidad (0x0100, que es 256 en decimal).

```javascript
    await (await signer.sendTransaction(transferTx)).wait()

    // Comprobar que tenemos 256 tokens menos
    expect (await token.balanceOf(signer.address)).to.equal(1000-256)

    // Y que nuestro destino los recibió
    expect (await token.balanceOf(destAddr)).to.equal(256)
  })    // it
})      // describe
```

## Reducción del costo cuando sí controla el contrato de destino {#reducing-the-cost-when-you-do-control-the-destination-contract}

Si tiene control sobre el contrato de destino, puede crear funciones que omitan las comprobaciones de `msg.sender` porque confían en el intérprete de datos de llamada.
[Puede ver un ejemplo de cómo funciona esto aquí, en la rama `control-contract`](https://github.com/qbzzt/ethereum.org-20220330-shortABI/tree/control-contract).
Para ejecutarlo, cambie a esa rama en el repositorio que clonó anteriormente y vuelva a ejecutar la prueba:

```sh
git checkout control-contract
npx hardhat test
```

Si el contrato respondiera solo a transacciones externas, podríamos arreglárnoslas con tener un solo contrato.
Sin embargo, eso rompería la [composabilidad](/developers/docs/smart-contracts/composability/).
Es mucho mejor tener un contrato que responda a las llamadas normales de ERC-20 y otro contrato que responda a las transacciones con datos de llamada cortos.

### Token.sol {#token-sol-2}

En este ejemplo podemos modificar `Token.sol`.
Esto nos permite tener una serie de funciones que solo el contrato proxy puede llamar.
Aquí están las partes nuevas:

```solidity
    // La única dirección permitida para especificar la dirección del CalldataInterpreter
    address owner;

    // La dirección del CalldataInterpreter
    address proxy = address(0);
```

El contrato ERC-20 necesita conocer la identidad del contrato proxy autorizado.
Sin embargo, no podemos establecer esta variable en el constructor, porque aún no conocemos el valor.
Este contrato se instancia primero porque el contrato proxy espera la dirección del token en su constructor.

```solidity
    /**
     * @dev Llama al constructor de ERC-20.
     */
    constructor(
    ) ERC20("Oris useless token-2", "OUT-2") {
        owner = msg.sender;
    }
```

La dirección del creador (llamada `owner`) se almacena aquí porque esa es la única dirección autorizada para establecer el contrato proxy.

```solidity
    /**
     * @dev establece la dirección para el proxy (el CalldataInterpreter).
     * Solo puede ser llamado una vez por el propietario
     */
    function setProxy(address _proxy) external {
        require(msg.sender == owner, "Can only be called by owner");
        require(proxy == address(0), "Proxy is already set");

        proxy = _proxy;
    }    // function setProxy
```

El contrato proxy tiene acceso privilegiado, porque puede omitir las comprobaciones de seguridad.
Para asegurarnos de que podemos confiar en el contrato proxy, solo permitimos que `owner` llame a esta función, y solo una vez.
Una vez que `proxy` tiene un valor real (no cero), ese valor no puede cambiar, por lo que incluso si el propietario decide volverse malicioso, o se revela su frase mnemotécnica, seguimos estando a salvo.

```solidity
    /**
     * @dev Algunas funciones solo pueden ser llamadas por el proxy.
     */
    modifier onlyProxy {
```

Esta es una [función `modifier`](https://www.tutorialspoint.com/solidity/solidity_function_modifiers.htm), modifica la forma en que funcionan otras funciones.

```solidity
      require(msg.sender == proxy);
```

Primero, verifique que fuimos llamados por el contrato proxy y por nadie más.
Si no es así, `revert`.

```solidity
      _;
    }
```

Si es así, ejecute la función que modificamos.

```solidity
   /* Funciones que permiten al proxy actuar realmente como proxy para las cuentas */

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

Estas son tres operaciones que normalmente requieren que el mensaje provenga directamente de la entidad que transfiere tokens o aprueba una asignación.
Aquí tenemos una versión proxy de estas operaciones que:

1. Está modificada por `onlyProxy()` para que a nadie más se le permita controlarlas.
2. Obtiene la dirección que normalmente sería `msg.sender` como un parámetro adicional.

### CalldataInterpreter.sol {#calldatainterpreter-sol-2}

El intérprete de datos de llamada es casi idéntico al anterior, excepto que las funciones proxy reciben un parámetro `msg.sender` y no hay necesidad de una asignación para `transfer`.

```solidity
        // transfer (sin necesidad de asignación)
        if (_func == 2) {
            token.transferProxy(
                msg.sender,
                address(uint160(calldataVal(1, 20))),
                calldataVal(21, 2)
            );
        }

        // approve
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

Hay algunos cambios entre el código de prueba anterior y este.

```js
const Cdi = await ethers.getContractFactory("CalldataInterpreter")
const cdi = await Cdi.deploy(token.address)
await cdi.deployed()
await token.setProxy(cdi.address)
```

Necesitamos decirle al contrato ERC-20 en qué contrato proxy confiar

```js
console.log("CalldataInterpreter addr:", cdi.address)

// Se necesitan dos firmantes para verificar las asignaciones
const signers = await ethers.getSigners()
const signer = signers[0]
const poorSigner = signers[1]
```

Para comprobar `approve()` y `transferFrom()` necesitamos un segundo firmante.
Lo llamamos `poorSigner` porque no obtiene ninguno de nuestros tokens (por supuesto, sí necesita tener ETH).

```js
// Transferir tokens
const destAddr = "0xf5a6ead936fb47f342bb63e676479bddf26ebe1d"
const transferTx = {
  to: cdi.address,
  data: "0x02" + destAddr.slice(2, 42) + "0100",
}
await (await signer.sendTransaction(transferTx)).wait()
```

Debido a que el contrato ERC-20 confía en el contrato proxy (`cdi`), no necesitamos una asignación para retransmitir transferencias.

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

// Comprobar que la combinación approve / transferFrom se realizó correctamente
expect(await token.balanceOf(destAddr2)).to.equal(255)
```

Pruebe las dos funciones nuevas.
Tenga en cuenta que `transferFromTx` requiere dos parámetros de dirección: el otorgante de la asignación y el receptor.

## Conclusión {#conclusion}

Tanto [Optimism](https://docs.optimism.io/op-stack/transactions/fees#fjord) como [Arbitrum](https://docs.arbitrum.io/how-arbitrum-works/deep-dives/gas-and-fees) ahora comprimen los datos que escriben en L1 y cobran cada transacción en función de su tamaño comprimido, para reducir el costo de las transacciones.
Sin embargo, como proveedores de infraestructura que buscan soluciones genéricas, nuestras capacidades son limitadas.
Como desarrollador de dapps, tiene conocimientos específicos de la aplicación, lo que le permite optimizar sus datos de llamada mucho mejor de lo que podríamos hacerlo en una solución genérica.
Con suerte, este artículo le ayudará a encontrar la solución ideal para sus necesidades.

[Vea aquí más de mi trabajo](https://cryptodocguy.pro/).

