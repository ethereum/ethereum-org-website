---
title: "ABIs cortas para la Optimización de Calldata"
description: Optimizando contratos inteligentes para Optimistic Rollups
author: Ori Pomerantz
lang: es
tags:
  - "capa 2"
skill: intermediate
published: 2022-04-01
---

## Introducción {#introduction}

En este artículo aprenderá sobre [optimistic rollups](/developers/docs/scaling/optimistic-rollups), el coste de transacciones en ellos, y cómo esa estructura de coste diferente requiere que optimicemos para cosas diferentes que en la Red principal de Ethereum. También aprenderá a implementar esta optimización.

### Divulgación completa {#full-disclosure}

Soy un empleado a tiempo completo de [Optimism](https://www.optimism.io/), así que los ejemplos de este artículo se ejecutarán en Optimism. Sin embargo, la técnica explicada aquí debería funcionar igual de bien para otros rollups.

### Terminología {#terminology}

Cuando se discuten rollups, el término 'capa 1' (L1) se utiliza para Mainnet, la red de producción Ethereum. El término 'capa 2' (L2) se utiliza para rollup o cualquier otro sistema que se base en L1 para la seguridad, pero realiza la mayor parte de su procesamiento fuera de cadena.

## ¿Cómo podemos reducir aún más el coste de las transacciones en L2? {#how-can-we-further-reduce-the-cost-of-L2-transactions}

[Los Optimistic rollups](/developers/docs/scaling/optimistic-rollups) tienen que preservar un registro de cada transacción histórica para que cualquiera pueda pasar por ellos y verificar que el estado actual es correcto. La forma más barata de obtener datos en el Ethereum Mainnet es escribirlos como datos de llamada. Esta solución fue elegida por [Optimism](https://help.optimism.io/hc/en-us/articles/4413163242779-What-is-a-rollup-) y [Arbitrum](https://developer.offchainlabs.com/docs/rollup_basics#intro-to-rollups).

### Coste de transacciones en L2 {#cost-of-l2-transactions}

El coste de las transacciones en L2 se compone de dos componentes:

1. Procesamiento en L2, que generalmente es extremadamente barato
2. Almacenamiento L1, que está vinculado a los costes de gas de La Red Principal

Mientras escribo esto, en Optimism el costo del gas en L2 es 0.001 [Gwei](/developers/docs/gas/#pre-london). Por otra parte, el coste del gas en L1 es de aproximadamente 40 gwei. [Puedes ver los precios actuales aquí](https://public-grafana.optimism.io/d/9hkhMxn7z/public-dashboard?orgId=1&refresh=5m).

Un byte de calldata cuesta 4 de gas (si es cero) o 16 de gas (si es cualquier otro valor). Una de las operaciones más caras en la EVM es escribir en el almacenamiento. El coste máximo de escribir una palabra de 32 bytes para almacenar en L2 es de 22100 gas. Actualmente, esto es 22.1 gwei. Así que si podemos guardar un único byte cero de calldata, podremos escribir unos 200 bytes en el almacenamiento y aún así saldremos adelante.

### El ABI {#the-abi}

La gran mayoría de las transacciones acceden a un contrato desde una cuenta de propiedad externa. La mayoría de los contratos están escritos en Solidity e interpretan su campo de datos por [la interfaz binaria de la aplicación (ABI)](https://docs.soliditylang.org/en/latest/abi-spec.html#formal-specification-of-the-encoding).

Sin embargo, el ABI fue diseñado para L1, donde un byte de datos de llamada cuesta aproximadamente lo mismo que cuatro operaciones aritméticas, y no para L2, donde un byte de datos de llamada cuesta más de mil operaciones aritméticas. Por ejemplo, [aquí está una transacción de transferencia de ERC-20](https://kovan-optimistic.etherscan.io/tx/0x7ce4c144ebfce157b4de99d8ad53a352ae91b57b3fa06d8a1c79439df6bfa998). Los datos de llamada se dividen así:

| Sección               | Longitud | Bytes | Bytes consumidos | Gas consumido | Bytes necesarios | Gas necesario |
| --------------------- | --------:| -----:| ----------------:| -------------:| ----------------:| -------------:|
| Selector de funciones |        4 |   0-3 |                3 |            48 |                1 |            16 |
| Ceros                 |       12 |  4-15 |               12 |            48 |                0 |             0 |
| Dirección de destino  |       20 | 16-35 |                0 |             0 |               20 |           320 |
| Monto                 |       32 | 36-67 |               17 |            64 |               15 |           240 |
| Total                 |       68 |       |                  |           160 |                  |           576 |

Explicación:

- **Function selector**: Contrato con menos de 256 funciones, para que podamos distinguirlos con un solo byte. Estos bytes suelen ser distintos de cero y, por lo tanto, [cuesta dieciséis de gas](https://eips.ethereum.org/EIPS/eip-2028).
- **Ceros**: estos bytes son siempre cero porque una dirección de veinte bytes no requiere una palabra de treinta y dos bytes para contenerla. Bytes que contienen cuatro gas de costo cero ([ver el yellow paper](https://ethereum.github.io/yellowpaper/paper.pdf), Apéndice G, pag. 27, el valor de `G`<sub>`txdatazero`</sub>).
- **Amount**: Si asumimos que en este contrato `decimals` es dieciocho (el valor normal) y la cantidad máxima de tokens que transferiremos será 10<sup>18</sup>, obtenemos una cantidad máxima de 10<sup>36</sup>. 256<sup>15</sup> &gt; 10<sup>36</sup>, entonces quince bytes serán suficientes.

Un desperdicio de 160 en gas en L1 normalmente es insignificante. Una transacción cuesta al menos [21.000 de gas](https://yakkomajuri.medium.com/blockchain-definition-of-the-week-ethereum-gas-2f976af774ed), por lo que un 0,8% adicional no importa. Sin embargo, en L2 las cosas son diferentes. Casi todo el costo de la transacción es escrito en L1. Además de los datos de llamada de la transacción, hay 109 bytes de encabezado de transacción (dirección de destino, firma, etc.). Por lo tanto, el costo total es `109*16+576+160=2480`, y estamos desperdiciando alrededor del 6,5 % de eso.

## Reducir costes cuando no controlas el destino {#reducing-costs-when-you-dont-control-the-destination}

Suponiendo que no tienes control sobre el contrato de destino, aún puedes usar una solución similar a [ésta](https://github.com/qbzzt/ethereum.org-20220330-shortABI). Repasemos los archivos relevantes.

### Token.sol {#token-sol}

[Este es el contrato de destino](https://github.com/qbzzt/ethereum.org-20220330-shortABI/blob/master/contracts/Token.sol). Es un contrato ERC-20 estándar, con una característica adicional. Esta función `faucet` permite a cualquier usuario obtener algún token para usar. Haría inútil un contrato de producción de ERC-20, pero hace la vida más fácil cuando existe un ERC-20 sólo para facilitar las pruebas.

```solidity
    /**
     * @dev Gives the caller 1000 tokens to play with
     */
    function faucet() external {
        _mint(msg.sender, 1000);
    }   // function faucet
```

[Puede ver un ejemplo de la implementación de este contrato aquí](https://kovan-optimistic.etherscan.io/address/0x950c753c0edbde44a74d3793db738a318e9c8ce8).

### CalldataInterpreter.sol {#calldatainterpreter-sol}

[Este es el contrato al que se supone que deben llamar las transacciones con datos de llamada más cortos](https://github.com/qbzzt/ethereum.org-20220330-shortABI/blob/master/contracts/CalldataInterpreter.sol). Vamos a repasarlo línea por línea.

```solidity
//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;


import { OrisUselessToken } from "./Token.sol";
```

Necesitamos la función token para saber cómo llamarla.

```solidity
contract CalldataInterpreter {

    OrisUselessToken public immutable token;
```

La dirección del token del que somos proxy.

```solidity

    /**
     * @dev Specify the token address
     * @param tokenAddr_ ERC-20 contract address
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

Leer el valor desde el calldata.

```solidity
        uint _retVal;

        require(length < 0x21,
            "calldataVal length limit is 32 bytes");

        require(length + startByte <= msg.data.length,
            "calldataVal trying to read beyond calldatasize");
```

Vamos a cargar una sola palabra de 32 bytes (256 bits) en la memoria y eliminar los bytes que no forman parte del campo que queremos. Este algoritmo no funciona para valores de más de 32 bytes y, por supuesto, no podemos leer más allá del final de los datos de llamada. En L1 puede que sea necesario saltarse estas pruebas para ahorrar gasolina, pero en L2 el gas es extremadamente barato, lo que permite realizar cualquier control de seguridad que podamos imaginar.

```solidity
        assembly {
            _retVal := calldataload(startByte)
        }
```

Podríamos haber copiado los datos de la llamada a `fallback()` (ver más abajo), pero es más fácil usar [Yul](https://docs.soliditylang.org/en/v0.8.12/yul.html), el lenguaje ensamblador del EVM.

Aquí usamos [el código de operación CALLDATALOAD](https://www.evm.codes/#35) para leer los bytes `startByte` a `startByte+31` en la pila. En general, la sintaxis de un código de operación en Yul es `<nombre del código de operación>(<primer valor de pila, si lo hay>,<segundo valor de pila, si lo hay>...)`.

```solidity

        _retVal = _retVal >> (256-length*8);
```

Sólo los bytes de `length` más significativos forman parte del campo, por lo que [desplazamiento a la derecha](https://en.wikipedia.org/wiki/Logical_shift) para obtener deshacerse de los otros valores. Esto tiene la ventaja adicional de mover el valor a la derecha del campo, por lo que es el valor en sí mismo en lugar del valor multiplicado por 256<sup>algo</sup>.

```solidity

        return _retVal;
    }


    fallback() external {
```

Cuando una llamada a un contrato de Solidity no coincide con ninguna de las firmas de función, llama [la función `fallback()`](https://docs.soliditylang.org/en/v0.8.12/contracts.html#fallback-function) (suponiendo que exista una). En el caso de `CalldataInterpreter`, _cualquier_ llamada llega aquí porque no hay ningún otro `external` o `public` funciones.

```solidity
    uint _func;
    _func = calldataVal(0, 1);
```


Lea el primer byte del calldata, que nos dice la función. Hay dos razones por las que una función no estaría disponible aquí:

1. Las funciones que son `pure` o `view` no cambian el estado y no cuestan gas (cuando se llaman fuera de la cadena). No tiene sentido tratar de reducir su costo de gas.
2. Funciones que dependen de

`msg.sender`.
El valor de `msg.sender` será la dirección de `CalldataInterpreter`, no la persona que llama.

Desafortunadamente, [mirando las especificaciones ERC-20](https://eips.ethereum.org/EIPS/eip-20), esto deja solo una función, `transfer`. Esto nos deja con sólo dos funciones: `transfer` (porque podemos llamar a `transferFrom`) y `faucet` (porque podemos transferir los tokens a quien haya llamado a nosotros).
   
   

```solidity

        // Call the state changing methods of token using
        // information from the calldata

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


Después de llamar a `token.faucet()` obtenemos tokens. Sin embargo, como contrato de proxy, no **necesitamos** tokens. El EOA (externally owned account) o o contrato que nos llama lo hace. Entonces transferimos todos nuestros tokens a quien nos llamó.



```solidity
        // transfer (assume we have an allowance for it)
        if (_func == 2) {
```


La transferencia de tokens requiere dos parámetros: la dirección de destino y la cantidad.



```solidity
            token.transferFrom(
                msg.sender,
```


Solo permitimos que las personas que llaman transfieran tokens de su propiedad



```solidity
                address(uint160(calldataVal(1, 20))),
```


La dirección de destinación empieza en byte #1 (byte #0 es la función). Como una dirección, es de 20 bytes de largo.



```solidity
                calldataVal(21, 2)
```


Por este contrato en particular asumimos que el número máximo de tokens que alguien querría transferir en 2 bytes (menos que 65536).



```solidity
            );
        }
```


En general, una transferencia toma 35 bytes de datos de llamada:

| Sección               | Longitud | Bytes |
| --------------------- | --------:| -----:|
| Selector de funciones |        1 |     0 |
| Dirección de destino  |       32 |  1-32 |
| Monto                 |        2 | 33-34 |




```solidity
    }   // fallback

}       // contract CalldataInterpreter
```




### prueba.js {#test-js}

[Esta unidad de prueba de JavaScript](https://github.com/qbzzt/ethereum.org-20220330-shortABI/blob/master/test/test.js) nos muestra cómo usar este mecanismo (y cómo verificar si funciona correctamente). Voy a asumir que entendiste [chai](https://www.chaijs.com/) y [ethers](https://docs.ethers.io/v5/) y solo voy a explicar específicamente las partes para aplicar un contrato.



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


Empezamos implementando ambos contratos.



```javascript
    // Get tokens to play with
    const faucetTx = {
```


No podemos usar las funciones de alto nivel que normalmente usamos (como `token.faucet()`) para crear transacciones, porque no seguimos el ABI. En cambio, tenemos que construir la transacción por nuestra cuenta y después enviarla.



```javascript
      to: cdi.address,
      data: "0x01"
```


Hay dos parámetros necesarios que debemos proporcionar para la transacción:

1. `to`, la dirección de destino. Este es el contrato intérprete de calldata.

2. `data`, el calldata por enviar. En caso de un llamado de grifo, la información es un único byte, `0x01`.



```javascript

    }
    await (await signer.sendTransaction(faucetTx)).wait()
```


Llamamos al [método `sendTransaction` del firmante](https://docs.ethers.io/v5/api/signer/#Signer-sendTransaction) porque ya especificamos el destino (`faucetTx.to`) y necesitamos que la transacción sea firmada.



```javascript
// Check the faucet provides the tokens correctly
expect(await token.balanceOf(signer.address)).to.equal(1000)
```


Aquí verificamos el balance. No es necesario ahorrar gas en las funciones `view`, por lo que las ejecutamos con normalidad.



```javascript
// Give the CDI an allowance (approvals cannot be proxied)
const approveTX = await token.approve(cdi.address, 10000)
await approveTX.wait()
expect(await token.allowance(signer.address, cdi.address)).to.equal(10000)
```


Otorgue al intérprete de calldata la autorización para realizar transferencias.



```javascript
// Transfer tokens
const destAddr = "0xf5a6ead936fb47f342bb63e676479bddf26ebe1d"
const transferTx = {
  to: cdi.address,
  data: "0x02" + destAddr.slice(2, 42) + "0100",
}
```


Crea una transacción de transferencia. El primer byte es "0x02", seguido por la dirección de destino y finalmente la cantidad (0x0100, que es 256 en decimal).



```javascript
    await (await signer.sendTransaction(transferTx)).wait()

    // Check that we have 256 tokens less
    expect (await token.balanceOf(signer.address)).to.equal(1000-256)

    // And that our destination got them
    expect (await token.balanceOf(destAddr)).to.equal(256)
  })    // it
})      // describe
```




### Ejemplo {#example}

Si quieres ver esos archivos en acción sin ejecutarlas por ti mismo, sigue estos enlaces:

1. [Despliegue de `OrisUselessToken`](https://kovan-optimistic.etherscan.io/tx/1410744) a [la dirección `0x950c753c0edbde44a74d3793db738a318e9c8ce8`](https://kovan-optimistic.etherscan.io/address/0x950c753c0edbde44a74d3793db738a318e9c8ce8).
2. [Despliegue de `CalldataInterpreter`](https://kovan-optimistic.etherscan.io/tx/1410745) a [la dirección `0x16617fea670aefe3b9051096c0eb4aeb4b3a5f55`](https://kovan-optimistic.etherscan.io/address/0x16617fea670aefe3b9051096c0eb4aeb4b3a5f55).
3. [Llama a `faucet()`](https://kovan-optimistic.etherscan.io/tx/1410746).
4. [Llama a `OrisUselessToken.approve()`](https://kovan-optimistic.etherscan.io/tx/1410747). Este llamado debe ir directamente al contrato del token porque el procesamiento depende de `msg.sender`.

5. [Llama a `transfer()`](https://kovan-optimistic.etherscan.io/tx/1410748).



## Reduciendo el costo cuando controlas el contrato de destino {#reducing-the-cost-when-you-do-control-the-destination-contract}

Si controlas el contrato de la dirección de destino puedes crear funciones para omitir las revisiones de `msg.sender` porque confían en el intérprete de calldata. [Aquí puedes ver un ejemplo de cómo esto funciona en la rama de `control-contract`](https://github.com/qbzzt/ethereum.org-20220330-shortABI/tree/control-contract).

Si el contrato sólo ha respondido a transacciones externas, podemos arreglárnoslas teniendo sólo un contrato. Sin embargo, eso puede romper la [capacidad de composición](/developers/docs/smart-contracts/composability/). Es mejor tener un contrato que responda a llamados normales ERC-20 y otro contrato que responda a transacciones con llamados cortos de datos.



### Token.sol {#token-sol-2}

En este ejemplo podemos modificar `Token.sol`. Esto nos permite tener un número de funciones que sólo el proxy podría llamar. Aquí están las nuevas partes:



```solidity
    // The only address allowed to specify the CalldataInterpreter address
    address owner;

    // The CalldataInterpreter address
    address proxy = address(0);
```


El contrato ERC-20 necesita conocer la identidad del proxy autorizado. Sin embargo, no podemos establecer esta variable en el constructor, porque aún no conocemos el valor. El contrato es instanciado primero porque el proxy espera la dirección del token en su constructor.



```solidity
    /**
     * @dev Calls the ERC20 constructor.
     */
    constructor(
    ) ERC20("Oris useless token-2", "OUT-2") {
        owner = msg.sender;
    }
```


La dirección del creador (llamada `owner`) es almacenada aquí porque esa es la única dirección permitida para establecer el proxy.



```solidity
    /**
     * @dev set the address for the proxy (the CalldataInterpreter).
     * Can only be called once by the owner
     */
    function setProxy(address _proxy) external {
        require(msg.sender == owner, "Can only be called by owner");
        require(proxy == address(0), "Proxy is already set");

        proxy = _proxy;
    }    // function setProxy
```


El proxy tiene acceso privilegiado, porque puede omitir las revisiones de seguridad. Para asegurarnos que podemos confier en el proxy solo le permitimos al `owner` llamar esta función y solo una vez. Una vez que `proxy` tiene un valor real (diferente a cero), ese valor no puede cambiar, incluso si el propietario decide volverse pícaro o el mnemotécnico para este es revelado, entonces todavía estamos seguros.



```solidity
    /**
     * @dev Some functions may only be called by the proxy.
     */
    modifier onlyProxy {
```


Esta es una [función `modifier`](https://www.tutorialspoint.com/solidity/solidity_function_modifiers.htm), esta modifica la manera en que operan otras funciones.



```solidity
      require(msg.sender == proxy);
```


Primero, verificamos que nos ha llamado el proxy y nadie más. Si no, `revert`.



```solidity
      _;
    }
```


En caso de ser así, ejecutamos la función que modificamos.



```solidity
   /* Functions that allow the proxy to actually proxy for accounts */

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


Esas son tres operaciones que normalmente requieren que el mensaje proviene directamente de la entidad transfiriendo tokens o aprovando una autorización. Aquí tenemos una versión proxy de estas operaciones que:

1. Es modificada por `onlyProxy()`, por lo que nadie cuenta con la autorización de controlarlo.
2. Obtiene la dirección que normalmente sería `msg.sender` como un parámetro adicional.



### CalldataInterpreter.sol {#calldatainterpreter-sol-2}

El intérprete de calldata es casi idéntico al que se encuentra arriba, con la excepción de que las funciones de proxy reciben un parámetro `msg.sender` y no es necesaria una asignación para `transfer`.



```solidity
        // transfer (no need for allowance)
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

Hay algunos cambios entre el anterior código de prueba y este.



```js
const Cdi = await ethers.getContractFactory("CalldataInterpreter")
const cdi = await Cdi.deploy(token.address)
await cdi.deployed()
await token.setProxy(cdi.address)
```


Necesitamos decirle al contrato ERC-20 en cual proxy debe confiar



```js
console.log("CalldataInterpreter addr:", cdi.address)

// Need two signers to verify allowances
const signers = await ethers.getSigners()
const signer = signers[0]
const poorSigner = signers[1]
```


Para revisar `approve()` y `transferFrom()` necesitamos un segundo firmante. Lo llamaremos `poorSigner` porque no obtiene alguno de nuestros tókens (por supuesto, no es necesario contar con ETH).



```js
// Transfer tokens
const destAddr = "0xf5a6ead936fb47f342bb63e676479bddf26ebe1d"
const transferTx = {
  to: cdi.address,
  data: "0x02" + destAddr.slice(2, 42) + "0100",
}
await (await signer.sendTransaction(transferTx)).wait()
```


Debido a que el contrato ERC-20 confía en el proxy (`cdi`), no necesitamos una asignación para retransmitir transferencias.



```js
// approval and transferFrom
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

// Check the approve / transferFrom combo was done correctly
expect(await token.balanceOf(destAddr2)).to.equal(255)
```


Prueba las dos nuevas funciones. Toma en cuenta que `transferFromTx` requiere dos direcciones como parámetros: el dador de la asignación y el receptor.



### Ejemplo {#example-2}

Si quieres ver esos archivos en acción sin ejecutarlas por ti mismo, sigue estos enlaces:

1. [Despliegue de `OrisUselessToken-2`](https://kovan-optimistic.etherscan.io/tx/1475397) en la dirección [`0xb47c1f550d8af70b339970c673bbdb2594011696`](https://kovan-optimistic.etherscan.io/address/0xb47c1f550d8af70b339970c673bbdb2594011696).
2. [Despliegue de `CalldataInterpreter`](https://kovan-optimistic.etherscan.io/tx/1475400) en la dirección[`0x0dccfd03e3aaba2f8c4ea4008487fd0380815892`](https://kovan-optimistic.etherscan.io/address/0x0dccfd03e3aaba2f8c4ea4008487fd0380815892).
3. [Llamar a `setProxy()`](https://kovan-optimistic.etherscan.io/tx/1475402).
4. [Llamar a `faucet()`](https://kovan-optimistic.etherscan.io/tx/1475409).
5. [Llamar a `transferProxy()`](https://kovan-optimistic.etherscan.io/tx/1475416).
6. [Llamar a `approveProxy()`](https://kovan-optimistic.etherscan.io/tx/1475419).
7. [Llamar a `transferFromProxy()`](https://kovan-optimistic.etherscan.io/tx/1475421). Tome en cuenta que este llamado proviene de una dirección diferente a las anteriores, `poorSigner` en el lugar de `signer`.



## Conclusión {#conclusion}

[Optimism](https://medium.com/ethereum-optimism/the-road-to-sub-dollar-transactions-part-2-compression-edition-6bb2890e3e92) y [Arbitrum](https://developer.offchainlabs.com/docs/special_features) están buscando algunas maneras de reducir el tamaño del calldata escrito a L1 y por lo tanto el costo de las transacciones. Sin embargo, como proveedores buscando por soluciones genéricas, nuestras habilidades están limitadas. Como el desarrollador dapp, tienes conocimiento específico de la aplicación, lo que te permite optimizar tu calldata mejor a como lo harías en una solución genérica. Con un poco de suerte, este artículo puede ayudarte a encontrar la solución ideal a tus necesidades.
