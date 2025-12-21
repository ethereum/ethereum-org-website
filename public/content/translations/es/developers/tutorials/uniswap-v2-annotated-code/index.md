---
title: "Un recorrido por el contrato Uniswap-v2"
description: ¿Cómo funciona el contrato Uniswap-v2? ¿Por qué está escrito de esa manera?
author: Ori Pomerantz
tags: [ "Solidity" ]
skill: intermediate
published: 2021-05-01
lang: es
---

## Introducción {#introduction}

[Uniswap v2](https://app.uniswap.org/whitepaper.pdf) puede crear un mercado de intercambio entre dos tókenes ERC-20 cualesquiera. En este artículo revisaremos el código fuente de los contratos que implementan este protocolo y veremos por qué están escritos de esta manera.

### ¿Qué hace Uniswap? {#what-does-uniswap-do}

Básicamente, hay dos tipos de usuarios: los proveedores de liquidez y los traders.

Los _proveedores de liquidez_ proporcionan a la reserva los dos tókenes que se pueden intercambiar (los llamaremos **Token0** y **Token1**). A cambio, reciben un tercer token que representa la propiedad parcial de la reserva, llamado _token de liquidez_.

Los _traders_ envían un tipo de token a la reserva y reciben el otro (por ejemplo, envían **Token0** y reciben **Token1**) de la reserva proporcionada por los proveedores de liquidez. El tipo de cambio se determina por la cantidad relativa de **Token0** y **Token1** que tiene la reserva. Además, la reserva toma un pequeño porcentaje como recompensa para el fondo de liquidez.

Cuando los proveedores de liquidez quieren recuperar sus activos, pueden quemar los tókenes de la reserva y recibir de vuelta sus tókenes, incluida su parte de las recompensas.

[Haga clic aquí para obtener una descripción más completa](https://docs.uniswap.org/contracts/v2/concepts/core-concepts/swaps/).

### ¿Por qué v2? ¿Por qué no v3? {#why-v2}

[Uniswap v3](https://app.uniswap.org/whitepaper-v3.pdf) es una actualización mucho más complicada que la v2. Es más fácil aprender primero v2 y luego pasar a v3.

### Contratos principales frente a contratos periféricos {#contract-types}

Uniswap v2 se divide en dos componentes, uno principal y otro periférico. Esta división permite que los contratos principales, que contienen los activos y, por lo tanto, _tienen_ que ser seguros, sean más simples y fáciles de auditar. Toda la funcionalidad adicional que requieren los traders puede ser proporcionada por los contratos periféricos.

## Flujos de datos y de control {#flows}

Este es el flujo de datos y de control que se produce cuando se realizan las tres acciones principales de Uniswap:

1. Intercambiar entre diferentes tókenes
2. Añadir liquidez al mercado y ser recompensado con tókenes de liquidez ERC-20 de intercambio de pares
3. Quemar tókenes de liquidez ERC-20 y recuperar los tókenes ERC-20 que el intercambio de pares permite que los traders intercambien

### Intercambio {#swap-flow}

Este es el flujo más común, utilizado por los traders:

#### Emisor {#caller}

1. Proporcionar a la cuenta periférica una asignación por el importe que se va a intercambiar.
2. Llamar a una de las muchas funciones de intercambio del contrato periférico (cuál dependerá de si hay ETH involucrado o no, si el trader especifica la cantidad de tókenes a depositar o la cantidad de tókenes a recuperar, etc.).
   Cada función de intercambio acepta una `path` (ruta), una matriz de intercambios por los que pasar.

#### En el contrato periférico (UniswapV2Router02.sol) {#in-the-periphery-contract-uniswapv2router02-sol}

3. Identificar las cantidades que se deben negociar en cada intercambio a lo largo de la ruta.
4. Iterar sobre la ruta. Por cada intercambio en el camino, envía el token de entrada y luego llama a la función `swap` del intercambio.
   En la mayoría de los casos, la dirección de destino de los tókenes es el siguiente intercambio de par en la ruta. En el intercambio final, es la dirección proporcionada por el trader.

#### En el contrato principal (UniswapV2Pair.sol) {#in-the-core-contract-uniswapv2pairsol-2}5. Verificar que el contrato principal no está siendo engañado y que puede mantener suficiente liquidez después del intercambio.

6. Ver cuántos tókenes adicionales tenemos además de las reservas conocidas. Esa cantidad es el número de tókenes de entrada que recibimos para intercambiar.
7. Enviar los tókenes de salida al destino.
8. Llamar a `_update` para actualizar las cantidades de la reserva

#### De vuelta en el contrato periférico (UniswapV2Router02.sol) {#back-in-the-periphery-contract-uniswapv2router02-sol}

9. Realizar cualquier limpieza necesaria (por ejemplo, quemar tókenes WETH para recuperar ETH y enviarlos al trader).

### Añadir liquidez {#add-liquidity-flow}

#### Emisor {#caller-2}

1. Proporcionar a la cuenta periférica una asignación en las cantidades que se añadirán al fondo de liquidez.
2. Llamar a una de las funciones `addLiquidity` del contrato periférico.

#### En el contrato periférico (UniswapV2Router02.sol) {#in-the-periphery-contract-uniswapv2router02sol-2}

3. Crear un nuevo intercambio de pares si es necesario.
4. Si existe un intercambio de pares, calcular la cantidad de tókenes a añadir. Se supone que este es un valor idéntico para ambos tókenes, por lo que se mantiene la misma proporción de tókenes nuevos con respecto a los existentes.
5. Comprobar si las cantidades son aceptables (los emisores pueden especificar una cantidad mínima por debajo de la cual prefieren no añadir liquidez).
6. Llamar al contrato principal.

#### En el contrato principal (UniswapV2Pair.sol) {#in-the-core-contract-uniswapv2pairsol-2}

7. Acuñar tókenes de liquidez y enviarlos al emisor
8. Llamar a `_update` para actualizar las cantidades de la reserva

### Retirar liquidez {#remove-liquidity-flow}

#### Emisor {#caller-3}

1. Proporcionar a la cuenta periférica una asignación de tókenes de liquidez para ser quemados a cambio de los tókenes subyacentes.
2. Llamar a una de las funciones `removeLiquidity` del contrato periférico.

#### En el contrato periférico (UniswapV2Router02.sol) {#in-the-periphery-contract-uniswapv2router02sol-3}

3. Enviar los tókenes de liquidez al intercambio de pares.

#### En el contrato principal (UniswapV2Pair.sol) {#in-the-core-contract-uniswapv2pairsol-3}

4. Enviar a la dirección de destino los tókenes subyacentes en proporción a los tókenes quemados. Por ejemplo, si hay 1000 tókenes A en la reserva, 500 tókenes B y 90 tókenes de liquidez, y recibimos 9 tókenes para quemar, estamos quemando el 10 % de los tókenes de liquidez, por lo que devolvemos al usuario 100 tókenes A y 50 tókenes B.
5. Quemar los tókenes de liquidez.
6. Llamar a `_update` para actualizar las cantidades de la reserva

## Los contratos principales {#core-contracts}

Estos son los contratos seguros que contienen la liquidez.

### UniswapV2Pair.sol {#UniswapV2Pair}

[Este contrato](https://github.com/Uniswap/uniswap-v2-core/blob/master/contracts/UniswapV2Pair.sol) implementa la reserva real que intercambia tókenes. Es la funcionalidad principal de Uniswap.

```solidity
pragma solidity =0.5.16;

import './interfaces/IUniswapV2Pair.sol';
import './UniswapV2ERC20.sol';
import './libraries/Math.sol';
import './libraries/UQ112x112.sol';
import './interfaces/IERC20.sol';
import './interfaces/IUniswapV2Factory.sol';
import './interfaces/IUniswapV2Callee.sol';
```

Estas son todas las interfaces que el contrato necesita conocer, ya sea porque el contrato las implementa (`IUniswapV2Pair` y `UniswapV2ERC20`) o porque llama a contratos que las implementan.

```solidity
contract UniswapV2Pair is IUniswapV2Pair, UniswapV2ERC20 {
```

Este contrato hereda de `UniswapV2ERC20`, que proporciona las funciones ERC-20 para los tókenes de liquidez.

```solidity
    using SafeMath  for uint;
```

La [librería SafeMath](https://docs.openzeppelin.com/contracts/2.x/api/math) se utiliza para evitar desbordamientos y subdesbordamientos. Esto es importante porque, de lo contrario, podríamos terminar en una situación en la que un valor debería ser `-1`, pero en su lugar es `2^256-1`.

```solidity
    using UQ112x112 for uint224;
```

Muchos cálculos en el contrato de la reserva requieren fracciones. Sin embargo, la EVM no admite fracciones.
La solución que encontró Uniswap es usar valores de 224 bits, con 112 bits para la parte entera y 112 bits para la fracción. Por lo tanto, `1.0` se representa como `2^112`, `1.5` se representa como `2^112 + 2^111`, etc.

Hay más detalles sobre esta librería [más adelante en el documento](#FixedPoint).

#### Variables {#pair-vars}

```solidity
    uint public constant MINIMUM_LIQUIDITY = 10**3;
```

Para evitar casos de división por cero, hay un número mínimo de tókenes de liquidez que siempre existen (pero son propiedad de la cuenta cero). Ese número es **MINIMUM_LIQUIDITY**, mil.

```solidity
    bytes4 private constant SELECTOR = bytes4(keccak256(bytes('transfer(address,uint256)')));
```

Este es el selector de ABI para la función de transferencia de ERC-20. Se utiliza para transferir tókenes ERC-20 en las dos cuentas de tókenes.

```solidity
    address public factory;
```

Este es el contrato de fábrica que creó esta reserva. Cada reserva es un intercambio entre dos tókenes ERC-20; la fábrica es un punto central que conecta todas estas reservas.

```solidity
    address public token0;
    address public token1;
```

Son las direcciones de los contratos para los dos tipos de tókenes ERC-20 que esta reserva puede intercambiar.

```solidity
    uint112 private reserve0;           // uses single storage slot, accessible via getReserves
    uint112 private reserve1;           // uses single storage slot, accessible via getReserves
```

Las reservas que la reserva tiene para cada tipo de token. Asumimos que los dos representan la misma cantidad de valor y, por lo tanto, cada token0 vale reserve1/reserve0 de token1.

```solidity
    uint32  private blockTimestampLast; // uses single storage slot, accessible via getReserves
```

La marca de tiempo del último bloque en el que se produjo un intercambio, utilizada para rastrear los tipos de cambio a lo largo del tiempo.

Uno de los mayores gastos de gas de los contratos de Ethereum es el almacenamiento, que persiste de una llamada del contrato a la siguiente. Cada celda de almacenamiento tiene 256 bits de longitud. Por lo tanto, tres variables, `reserve0`, `reserve1` y `blockTimestampLast`, se asignan de tal manera que un único valor de almacenamiento puede incluirlas a las tres (112+112+32=256).

```solidity
    uint public price0CumulativeLast;
    uint public price1CumulativeLast;
```

Estas variables contienen los costes acumulados para cada token (cada uno en términos del otro). Se pueden utilizar para calcular el tipo de cambio promedio durante un período de tiempo.

```solidity
    uint public kLast; // reserve0 * reserve1, as of immediately after the most recent liquidity event
```

La forma en que el intercambio de pares decide el tipo de cambio between token0 y token1 es mantener constante el múltiplo de las dos reservas durante las operaciones. `kLast` es este valor. Cambia cuando un proveedor de liquidez deposita o retira tókenes, y aumenta ligeramente debido a la comisión de mercado del 0,3 %.

Aquí tiene un ejemplo sencillo. Tenga en cuenta que, para simplificar, la tabla solo tiene tres dígitos después del punto decimal e ignoramos la comisión de negociación del 0,3 %, por lo que los números no son precisos.

| Evento                                               | reserva0 | reserva1 |                      reserva0 \* reserva1 | Tipo de cambio promedio (token1 / token0) |
| ---------------------------------------------------- | -------: | -------: | ----------------------------------------: | ------------------------------------------------------------ |
| Configuración inicial                                | 1000,000 | 1000,000 | 1.000.000 |                                                              |
| El trader A intercambia 50 token0 por 47,619 token1  | 1050,000 |  952,381 | 1.000.000 | 0,952                                                        |
| El trader B intercambia 10 token0 por 8,984 token1   | 1060,000 |  943,396 | 1.000.000 | 0,898                                                        |
| El trader C intercambia 40 token0 por 34,305 token1  | 1100,000 |  909,090 | 1.000.000 | 0,858                                                        |
| El trader D intercambia 100 token1 por 109,01 token0 |  990,990 | 1009,090 | 1.000.000 | 0,917                                                        |
| El trader E intercambia 10 token0 por 10,079 token1  | 1000,990 |  999,010 | 1.000.000 | 1,008                                                        |

A medida que los traders proporcionan más token0, el valor relativo del token1 aumenta, y viceversa, en función de la oferta y la demanda.

#### Bloqueo {#pair-lock}

```solidity
    uint private unlocked = 1;
```

Hay una clase de vulnerabilidades de seguridad que se basan en el [abuso de reentrada](https://medium.com/coinmonks/ethernaut-lvl-10-re-entrancy-walkthrough-how-to-abuse-execution-ordering-and-reproduce-the-dao-7ec88b912c14). Uniswap necesita transferir tókenes ERC-20 arbitrarios, lo que significa llamar a contratos ERC-20 que pueden intentar abusar del mercado de Uniswap que los llama.
Al tener una variable `unlocked` como parte del contrato, podemos evitar que se llamen funciones mientras se están ejecutando (dentro de la misma transacción).

```solidity
    modifier lock() {
```

Esta función es un [modificador](https://docs.soliditylang.org/en/v0.8.3/contracts.html#function-modifiers), una función que envuelve a una función normal para cambiar su comportamiento de alguna manera.

```solidity
        require(unlocked == 1, 'UniswapV2: LOCKED');
        unlocked = 0;
```

Si `unlocked` es igual a uno, se establece en cero. Si ya es cero, se revierte la llamada y se produce un fallo.

```solidity
        _;
```

En un modificador, `_;` es la llamada a la función original (con todos los parámetros). Aquí significa que la llamada a la función solo ocurre si `unlocked` era uno cuando se llamó, y mientras se ejecuta, el valor de `unlocked` es cero.

```solidity
        unlocked = 1;
    }
```

Después de que la función principal devuelva un valor, se libera el bloqueo.

#### Miscelánea funciones {#pair-misc}

```solidity
    function getReserves() public view returns (uint112 _reserve0, uint112 _reserve1, uint32 _blockTimestampLast) {
        _reserve0 = reserve0;
        _reserve1 = reserve1;
        _blockTimestampLast = blockTimestampLast;
    }
```

Esta función proporciona a los emisores el estado actual del intercambio. Tenga en cuenta que las funciones de Solidity [pueden devolver múltiples valores](https://docs.soliditylang.org/en/v0.8.3/contracts.html#returning-multiple-values).

```solidity
    function _safeTransfer(address token, address to, uint value) private {
        (bool success, bytes memory data) = token.call(abi.encodeWithSelector(SELECTOR, to, value));
```

Esta función interna transfiere una cantidad de tókenes ERC-20 del intercambio a otra persona. `SELECTOR` especifica que la función que estamos llamando es `transfer(address,uint)` (consulte la definición anterior).

Para evitar tener que importar una interfaz para la función del token, creamos «manualmente» la llamada usando una de las [funciones de ABI](https://docs.soliditylang.org/en/v0.8.3/units-and-global-variables.html#abi-encoding-and-decoding-functions).

```solidity
        require(success && (data.length == 0 || abi.decode(data, (bool))), 'UniswapV2: TRANSFER_FAILED');
    }
```

Hay dos formas en que una llamada de transferencia de ERC-20 puede informar de un fallo:

1. Revertir. Si una llamada a un contrato externo se revierte, el valor de retorno booleano es `false`
2. Terminar normalmente pero informar de un fallo. En ese caso, el búfer de valor de retorno tiene una longitud distinta de cero y, cuando se decodifica como un valor booleano, es `false`

Si se da alguna de estas condiciones, revertir.

#### Eventos {#pair-events}

```solidity
    event Mint(address indexed sender, uint amount0, uint amount1);
    event Burn(address indexed sender, uint amount0, uint amount1, address indexed to);
```

Estos dos eventos se emiten cuando un proveedor de liquidez deposita liquidez (`Mint`) o la retira (`Burn`). En cualquier caso, las cantidades de token0 y token1 que se depositan o retiran forman parte del evento, así como la identidad de la cuenta que nos llamó (`sender`). En el caso de una retirada, el evento también incluye el objetivo que recibió los tókenes (`to`), que puede no ser el mismo que el emisor.

```solidity
    event Swap(
        address indexed sender,
        uint amount0In,
        uint amount1In,
        uint amount0Out,
        uint amount1Out,
        address indexed to
    );
```

Este evento se emite cuando un trader intercambia un token por otro. Una vez más, el emisor y el destino pueden no ser los mismos.
Cada token puede enviarse al intercambio o recibirse de él.

```solidity
    event Sync(uint112 reserve0, uint112 reserve1);
```

Finalmente, `Sync` se emite cada vez que se agregan o retiran tókenes, independientemente del motivo, para proporcionar la información de reserva más reciente (y, por lo tanto, el tipo de cambio).

#### Funciones de configuración {#pair-setup}

Se supone que estas funciones se deben llamar una vez cuando se configura el nuevo intercambio de pares.

```solidity
    constructor() public {
        factory = msg.sender;
    }
```

El constructor se asegura de que hagamos un seguimiento de la dirección de la fábrica que creó el par. Esta información es necesaria para `initialize` y para la comisión de la fábrica (si existe)

```solidity
    // called once by the factory at time of deployment
    function initialize(address _token0, address _token1) external {
        require(msg.sender == factory, 'UniswapV2: FORBIDDEN'); // sufficient check
        token0 = _token0;
        token1 = _token1;
    }
```

Esta función permite a la fábrica (y solo a la fábrica) especificar los dos tókenes ERC-20 que este par intercambiará.

#### Funciones de actualización internas {#pair-update-internal}

##### \_update

```solidity
    // update reserves and, on the first call per block, price accumulators
    function _update(uint balance0, uint balance1, uint112 _reserve0, uint112 _reserve1) private {
```

Esta función se llama cada vez que se depositan o retiran tókenes.

```solidity
        require(balance0 <= uint112(-1) && balance1 <= uint112(-1), 'UniswapV2: OVERFLOW');
```

Si balance0 o balance1 (uint256) es mayor que uint112(-1) (=2^112-1) (por lo que se desborda y vuelve a 0 cuando se convierte a uint112), se niega a continuar la \_actualización para evitar desbordamientos. Con un token normal que se puede subdividir en 10^18 unidades, esto significa que cada intercambio está limitado a unos 5.1\*10^15 de cada token. Hasta ahora eso no ha sido un problema.

```solidity
        uint32 blockTimestamp = uint32(block.timestamp % 2**32);
        uint32 timeElapsed = blockTimestamp - blockTimestampLast; // overflow is desired
        if (timeElapsed > 0 && _reserve0 != 0 && _reserve1 != 0) {
```

Si el tiempo transcurrido no es cero, significa que somos la primera transacción de intercambio en este bloque. En ese caso, tenemos que actualizar los acumuladores de costes.

```solidity
            // * never overflows, and + overflow is desired
            price0CumulativeLast += uint(UQ112x112.encode(_reserve1).uqdiv(_reserve0)) * timeElapsed;
            price1CumulativeLast += uint(UQ112x112.encode(_reserve0).uqdiv(_reserve1)) * timeElapsed;
        }
```

Cada acumulador de coste se actualiza con el último coste (reserva del otro token/reserva de este token) multiplicado por el tiempo transcurrido en segundos. Para obtener un precio promedio, se lee el precio acumulado en dos puntos en el tiempo y se divide por la diferencia de tiempo entre ellos. Por ejemplo, asuma esta secuencia de eventos:

| Evento                                                           | reserva0 | reserva1 | marca de tiempo | Tipo de cambio marginal (reserva1 / reserva0) |       price0CumulativeLast |
| ---------------------------------------------------------------- | -------: | -------: | --------------- | ---------------------------------------------------------------: | -------------------------: |
| Configuración inicial                                            | 1000,000 | 1000,000 | 5000            |                                                            1,000 |                          0 |
| El trader A deposita 50 token0 y recibe 47,619 token1 de vuelta  | 1050,000 |  952,381 | 5020            |                                                            0,907 |                         20 |
| El trader B deposita 10 token0 y recibe 8,984 token1 de vuelta   | 1060,000 |  943,396 | 5030            |                                                            0,890 |       20+10\*0,907 = 29,07 |
| El trader C deposita 40 token0 y recibe 34,305 token1 de vuelta  | 1100,000 |  909,090 | 5100            |                                                            0,826 |    29,07+70\*0,890 = 91,37 |
| El trader D deposita 100 token1 y recibe 109,01 token0 de vuelta |  990,990 | 1009,090 | 5110            |                                                            1,018 |    91,37+10\*0,826 = 99,63 |
| El trader E deposita 10 token0 y recibe 10,079 token1 de vuelta  | 1000,990 |  999,010 | 5150            |                                                            0,998 | 99,63+40\*1,1018 = 143,702 |

Supongamos que queremos calcular el precio promedio de **Token0** entre las marcas de tiempo 5030 y 5150. La diferencia en el valor de `price0Cumulative` es 143,702-29,07=114,632. Este es el promedio a lo largo de dos minutos (120 segundos). Así que el precio promedio es 114,632/120 = 0,955.

Este cálculo de precios es la razón por la que necesitamos conocer los tamaños de reserva antiguos.

```solidity
        reserve0 = uint112(balance0);
        reserve1 = uint112(balance1);
        blockTimestampLast = blockTimestamp;
        emit Sync(reserve0, reserve1);
    }
```

Finalmente, actualice las variables globales y emita un evento `Sync`.

##### \_mintFee

```solidity
    // if fee is on, mint liquidity equivalent to 1/6th of the growth in sqrt(k)
    function _mintFee(uint112 _reserve0, uint112 _reserve1) private returns (bool feeOn) {
```

En Uniswap 2.0 los traders pagan una comisión del 0,30 % por usar el mercado. La mayor parte de esa comisión (0,25 % de la operación) siempre va a los proveedores de liquidez. El 0,05 % restante puede ir a los proveedores de liquidez o a una dirección especificada por la fábrica como una comisión del protocolo, que paga a Uniswap por su esfuerzo de desarrollo.

Para reducir los cálculos (y, por lo tanto, los costes de gas), esta comisión solo se calcula cuando se añade o elimina liquidez de la reserva, en lugar de en cada transacción.

```solidity
        address feeTo = IUniswapV2Factory(factory).feeTo();
        feeOn = feeTo != address(0);
```

Leer el destino de la comisión de la fábrica. Si es cero, entonces no hay ninguna comisión de protocolo y no hay necesidad de calcularla.

```solidity
        uint _kLast = kLast; // gas savings
```

La variable de estado `kLast` se encuentra en el almacenamiento, por lo que tendrá un valor entre diferentes llamadas al contrato.
El acceso al almacenamiento es mucho más caro que el acceso a la memoria volátil que se libera cuando finaliza la llamada de función al contrato, por lo que utilizamos una variable interna para ahorrar en gas.

```solidity
        if (feeOn) {
            if (_kLast != 0) {
```

Los proveedores de liquidez obtienen su parte simplemente por la apreciación de sus tókenes de liquidez. Pero la comisión del protocolo requiere que se acuñen nuevos tókenes de liquidez y se suministren a la dirección `feeTo`.

```solidity
                uint rootK = Math.sqrt(uint(_reserve0).mul(_reserve1));
                uint rootKLast = Math.sqrt(_kLast);
                if (rootK > rootKLast) {
```

Si hay nueva liquidez sobre la que cobrar una comisión de protocolo. Puede ver la función de raíz cuadrada [más adelante en este artículo](#Math)

```solidity
                    uint numerator = totalSupply.mul(rootK.sub(rootKLast));
                    uint denominator = rootK.mul(5).add(rootKLast);
                    uint liquidity = numerator / denominator;
```

Este complicado cálculo de comisiones se explica en [el libro blanco](https://app.uniswap.org/whitepaper.pdf) en la página 5. Sabemos que entre el momento en que se calculó `kLast` y el presente no se añadió ni eliminó liquidez (porque ejecutamos este cálculo cada vez que se añade o elimina liquidez, antes de que cambie realmente), por lo que cualquier cambio en `reserve0 * reserve1` tiene que provenir de las comisiones de transacción (sin ellas mantendríamos `reserve0 * reserve1` constante).

```solidity
                    if (liquidity > 0) _mint(feeTo, liquidity);
                }
            }
```

Utilice la función `UniswapV2ERC20._mint` para crear los tókenes de liquidez adicionales y asignarlos a `feeTo`.

```solidity
        } else if (_kLast != 0) {
            kLast = 0;
        }
    }
```

Si no hay ninguna comisión, establezca `kLast` en cero (si no lo está ya). Cuando se escribió este contrato, había una [función de reembolso de gas](https://eips.ethereum.org/EIPS/eip-3298) que animaba a los contratos a reducir el tamaño total del estado de Ethereum poniendo a cero el almacenamiento que no necesitaban.
Este código obtiene ese reembolso cuando es posible.

#### Funciones accesibles externamente {#pair-external}

Tenga en cuenta que, si bien cualquier transacción o contrato _puede_ llamar a estas funciones, están diseñadas para ser llamadas desde el contrato periférico. Si las llama directamente, no podrá engañar al intercambio de pares, pero podría perder valor por un error.

##### acuñar

```solidity
    // this low-level function should be called from a contract which performs important safety checks
    function mint(address to) external lock returns (uint liquidity) {
```

Esta función se llama cuando un proveedor de liquidez añade liquidez a la reserva. Se acuñan tókenes de liquidez adicionales como recompensa. Debe llamarse desde [un contrato periférico](#UniswapV2Router02) que lo llama después de añadir la liquidez en la misma transacción (para que nadie más pueda presentar una transacción que reclame la nueva liquidez antes que el propietario legítimo).

```solidity
        (uint112 _reserve0, uint112 _reserve1,) = getReserves(); // gas savings
```

Esta es la forma de leer los resultados de una función de Solidity que devuelve múltiples valores. Descartamos los últimos valores devueltos, la marca de tiempo del bloque, porque no la necesitamos.

```solidity
        uint balance0 = IERC20(token0).balanceOf(address(this));
        uint balance1 = IERC20(token1).balanceOf(address(this));
        uint amount0 = balance0.sub(_reserve0);
        uint amount1 = balance1.sub(_reserve1);
```

Obtenga los saldos actuales y vea cuánto se añadió de cada tipo de token.

```solidity
        bool feeOn = _mintFee(_reserve0, _reserve1);
```

Calcular las comisiones del protocolo a cobrar, si las hay, y acuñar los tókenes de liquidez correspondientes. Como los parámetros de `_mintFee` son los valores antiguos de la reserva, la comisión se calcula con precisión basándose únicamente en los cambios de la reserva debidos a las comisiones.

```solidity
        uint _totalSupply = totalSupply; // gas savings, must be defined here since totalSupply can update in _mintFee
        if (_totalSupply == 0) {
            liquidity = Math.sqrt(amount0.mul(amount1)).sub(MINIMUM_LIQUIDITY);
           _mint(address(0), MINIMUM_LIQUIDITY); // permanently lock the first MINIMUM_LIQUIDITY tokens
```

Si este es el primer depósito, cree tókenes de MINIMUM_LIQUIDITY y envíelos a la dirección cero para bloquearlos. Estos nunca se pueden canjear, lo que significa que la reserva nunca se vaciará completamente (esto nos salva de la división por cero en algunos lugares). El valor de `MINIMUM_LIQUIDITY` es mil, que considerando que la mayoría de los ERC-20 se subdividen en unidades de 10^-18 de un token, como el ETH se divide en wei, es 10^-15 del valor de un solo token. No es un coste elevado.

En el momento del primer depósito no conocemos el valor relativo de los dos tókenes, así que simplemente multiplicamos las cantidades y tomamos una raíz cuadrada, suponiendo que el depósito nos proporciona el mismo valor en ambos tókenes.

Podemos confiar en esto porque al depositante le interesa proporcionar el mismo valor, para evitar perder valor por el arbitraje.
Digamos que el valor de los dos tókenes es idéntico, pero nuestro depositante depositó cuatro veces más **Token1** que **Token0**. Un trader puede utilizar el hecho de que el intercambio de pares piense que el **Token0** es más valioso para extraer valor de él.

| Evento                                                         | reserva0 | reserva1 | reserva0 \* reserva1 | Valor de la reserva (reserva0 + reserva1) |
| -------------------------------------------------------------- | -------: | -------: | -------------------: | -----------------------------------------------------------: |
| Configuración inicial                                          |        8 |       32 |                  256 |                                                           40 |
| El trader deposita 8 tókenes **Token0** y recibe 16 **Token1** |       16 |       16 |                  256 |                                                           32 |

Como puede ver, el trader ganó 8 tókenes extra, que provienen de una reducción en el valor de la reserva, perjudicando al depositante que la posee.

```solidity
        } else {
            liquidity = Math.min(amount0.mul(_totalSupply) / _reserve0, amount1.mul(_totalSupply) / _reserve1);
```

Con cada depósito posterior ya conocemos el tipo de cambio entre los dos activos, y esperamos que los proveedores de liquidez proporcionen el mismo valor en ambos. Si no lo hacen, les damos tókenes de liquidez en función del valor menor que proporcionaron como castigo.

Tanto si se trata del depósito inicial como de uno posterior, el número de tókenes de liquidez que proporcionamos es igual a la raíz cuadrada del cambio en `reserve0*reserve1` y el valor del token de liquidez no cambia (a menos que obtengamos un depósito que no tenga valores iguales de ambos tipos, en cuyo caso la «multa» se distribuye). Aquí hay otro ejemplo con dos tókenes que tienen el mismo valor, con tres depósitos buenos y uno malo (depósito de un solo tipo de token, por lo que no produce ningún token de liquidez).

| Evento                       |                reserva0 |                reserva1 | reserva0 \* reserva1 | Valor de la reserva (reserva0 + reserva1) | Tókenes de liquidez acuñados para este depósito | Total de tókenes de liquidez | valor de cada token de liquidez |
| ---------------------------- | ----------------------: | ----------------------: | -------------------: | -----------------------------------------------------------: | ----------------------------------------------: | ---------------------------: | ------------------------------: |
| Configuración inicial        |                   8,000 |                   8,000 |                   64 |                                                       16,000 |                                               8 |                            8 |                           2,000 |
| Deposite cuatro de cada tipo |                  12,000 |                  12,000 |                  144 |                                                       24,000 |                                               4 |                           12 |                           2,000 |
| Deposite dos de cada tipo    |                  14,000 |                  14,000 |                  196 |                                                       28,000 |                                               2 |                           14 |                           2,000 |
| Depósito de valor desigual   |                  18,000 |                  14,000 |                  252 |                                                       32,000 |                                               0 |                           14 |          ~2,286 |
| Después del arbitraje        | ~15,874 | ~15,874 |                  252 |                                      ~31,748 |                                               0 |                           14 |          ~2,267 |

```solidity
        }
        require(liquidity > 0, 'UniswapV2: INSUFFICIENT_LIQUIDITY_MINTED');
        _mint(to, liquidity);
```

Utilice la función `UniswapV2ERC20._mint` para crear realmente la liquidez adicional de tókenes y dárselos a la cuenta correcta.

```solidity

        _update(balance0, balance1, _reserve0, _reserve1);
        if (feeOn) kLast = uint(reserve0).mul(reserve1); // reserve0 and reserve1 are up-to-date
        emit Mint(msg.sender, amount0, amount1);
    }
```

Actualice las variables de estado (`reserve0`, `reserve1`, y si es necesario `kLast`) y emita el evento apropiado.

##### quemar

```solidity
    // this low-level function should be called from a contract which performs important safety checks
    function burn(address to) external lock returns (uint amount0, uint amount1) {
```

Esta función se llama cuando se retira liquidez y es preciso quemar los tókenes de liquidez apropiados.
También debería llamarse [desde una cuenta periférica](#UniswapV2Router02).

```solidity
        (uint112 _reserve0, uint112 _reserve1,) = getReserves(); // gas savings
        address _token0 = token0;                                // gas savings
        address _token1 = token1;                                // gas savings
        uint balance0 = IERC20(_token0).balanceOf(address(this));
        uint balance1 = IERC20(_token1).balanceOf(address(this));
        uint liquidity = balanceOf[address(this)];
```

El contrato periférico transfirió la liquidez a quemar a este contrato antes de la llamada. De esa manera sabemos cuánta liquidez quemar y podemos asegurarnos de que se quema.

```solidity
        bool feeOn = _mintFee(_reserve0, _reserve1);
        uint _totalSupply = totalSupply; // gas savings, must be defined here since totalSupply can update in _mintFee
        amount0 = liquidity.mul(balance0) / _totalSupply; // using balances ensures pro-rata distribution
        amount1 = liquidity.mul(balance1) / _totalSupply; // using balances ensures pro-rata distribution
        require(amount0 > 0 && amount1 > 0, 'UniswapV2: INSUFFICIENT_LIQUIDITY_BURNED');
```

El proveedor de liquidez recibe un valor igual de ambos tókenes. De esta manera no cambiamos el tipo de cambio.

```solidity
        _burn(address(this), liquidity);
        _safeTransfer(_token0, to, amount0);
        _safeTransfer(_token1, to, amount1);
        balance0 = IERC20(_token0).balanceOf(address(this));
        balance1 = IERC20(_token1).balanceOf(address(this));

        _update(balance0, balance1, _reserve0, _reserve1);
        if (feeOn) kLast = uint(reserve0).mul(reserve1); // reserve0 and reserve1 are up-to-date
        emit Burn(msg.sender, amount0, amount1, to);
    }

```

El resto de la función `burn` es una imagen especular de la función `mint` anterior.

##### intercambiar

```solidity
    // this low-level function should be called from a contract which performs important safety checks
    function swap(uint amount0Out, uint amount1Out, address to, bytes calldata data) external lock {
```

Se supone que esta función también se llama desde [un contrato periférico](#UniswapV2Router02).

```solidity
        require(amount0Out > 0 || amount1Out > 0, 'UniswapV2: INSUFFICIENT_OUTPUT_AMOUNT');
        (uint112 _reserve0, uint112 _reserve1,) = getReserves(); // gas savings
        require(amount0Out < _reserve0 && amount1Out < _reserve1, 'UniswapV2: INSUFFICIENT_LIQUIDITY');

        uint balance0;
        uint balance1;
        { // scope for _token{0,1}, avoids stack too deep errors
```

Las variables locales se pueden almacenar en la memoria o, si no hay demasiadas, directamente en la pila.
Si podemos limitar el número para usar la pila, usaremos menos gas. Para más detalles, consulte [el libro amarillo, las especificaciones formales de Ethereum](https://ethereum.github.io/yellowpaper/paper.pdf), p. 26, ecuación 298.

```solidity
            address _token0 = token0;
            address _token1 = token1;
            require(to != _token0 && to != _token1, 'UniswapV2: INVALID_TO');
            if (amount0Out > 0) _safeTransfer(_token0, to, amount0Out); // optimistically transfer tokens
            if (amount1Out > 0) _safeTransfer(_token1, to, amount1Out); // optimistically transfer tokens
```

Esta transferencia es optimista, porque transferimos antes de estar seguros de que se cumplen todas las condiciones. Esto está bien en Ethereum porque si las condiciones no se cumplen más tarde en la llamada, la revertimos junto con cualquier cambio que haya creado.

```solidity
            if (data.length > 0) IUniswapV2Callee(to).uniswapV2Call(msg.sender, amount0Out, amount1Out, data);
```

Informar al receptor sobre el intercambio si se solicita.

```solidity
            balance0 = IERC20(_token0).balanceOf(address(this));
            balance1 = IERC20(_token1).balanceOf(address(this));
        }
```

Obtenga los saldos actuales. El contrato periférico nos envía los tókenes antes de llamarnos para el intercambio. Esto facilita que el contrato compruebe que no está siendo engañado, una comprobación que _tiene_ que ocurrir en el contrato principal (porque podemos ser llamados por otras entidades además de nuestro contrato periférico).

```solidity
        uint amount0In = balance0 > _reserve0 - amount0Out ? balance0 - (_reserve0 - amount0Out) : 0;
        uint amount1In = balance1 > _reserve1 - amount1Out ? balance1 - (_reserve1 - amount1Out) : 0;
        require(amount0In > 0 || amount1In > 0, 'UniswapV2: INSUFFICIENT_INPUT_AMOUNT');
        { // scope for reserve{0,1}Adjusted, avoids stack too deep errors
            uint balance0Adjusted = balance0.mul(1000).sub(amount0In.mul(3));
            uint balance1Adjusted = balance1.mul(1000).sub(amount1In.mul(3));
            require(balance0Adjusted.mul(balance1Adjusted) >= uint(_reserve0).mul(_reserve1).mul(1000**2), 'UniswapV2: K');
```

Esta es una comprobación para asegurarnos de que no perdemos en el intercambio. No hay ninguna circunstancia en la que un intercambio deba reducir `reserve0*reserve1`. Aquí es también donde nos aseguramos de que se envíe una comisión del 0,3 % en el intercambio; antes de comprobar el valor de K, multiplicamos ambos saldos por 1000 y le restamos las cantidades multiplicadas por 3, lo que significa que se deduce un 0,3 % (3/1000 = 0,003 = 0,3 %) del saldo antes de comparar su valor K con el valor K de las reservas actuales.

```solidity
        }

        _update(balance0, balance1, _reserve0, _reserve1);
        emit Swap(msg.sender, amount0In, amount1In, amount0Out, amount1Out, to);
    }
```

Actualice `reserve0` y `reserve1`, y si es necesario los acumuladores de precio y la marca de tiempo, y emita un evento.

##### Sincronizar o desnatar

Es posible que los saldos reales se desincronicen con las reservas que el intercambio de pares cree que tiene.
No hay forma de retirar tókenes sin el consentimiento del contrato, pero los depósitos son un asunto diferente. Una cuenta puede transferir tókenes al intercambio sin llamar a `mint` o `swap`.

En ese caso hay dos soluciones:

- `sync`, actualizar las reservas a los saldos actuales
- `skim`, retirar la cantidad extra. Tenga en cuenta que cualquier cuenta puede llamar a `skim` porque no sabemos quién depositó los tókenes. Esta información se emite en un evento, pero los eventos no son accesibles desde la cadena de bloques.

```solidity
    // force balances to match reserves
    function skim(address to) external lock {
        address _token0 = token0; // gas savings
        address _token1 = token1; // gas savings
        _safeTransfer(_token0, to, IERC20(_token0).balanceOf(address(this)).sub(reserve0));
        _safeTransfer(_token1, to, IERC20(_token1).balanceOf(address(this)).sub(reserve1));
    }



    // force reserves to match balances
    function sync() external lock {
        _update(IERC20(token0).balanceOf(address(this)), IERC20(token1).balanceOf(address(this)), reserve0, reserve1);
    }
}
```

### UniswapV2Factory.sol {#UniswapV2Factory}

[Este contrato](https://github.com/Uniswap/uniswap-v2-core/blob/master/contracts/UniswapV2Factory.sol) crea los intercambios de pares.

```solidity
pragma solidity =0.5.16;

import './interfaces/IUniswapV2Factory.sol';
import './UniswapV2Pair.sol';

contract UniswapV2Factory is IUniswapV2Factory {
    address public feeTo;
    address public feeToSetter;
```

Estas variables de estado son necesarias para implementar la comisión del protocolo (consulte [el libro blanco](https://app.uniswap.org/whitepaper.pdf), p. 5).
La dirección `feeTo` acumula los tókenes de liquidez para la comisión del protocolo, y `feeToSetter` es la dirección autorizada a cambiar `feeTo` por una dirección diferente.

```solidity
    mapping(address => mapping(address => address)) public getPair;
    address[] public allPairs;
```

Estas variables registran los pares, los intercambios entre dos tipos de tókenes.

La primera, `getPair`, es una asignación que identifica un contrato de intercambio de pares basado en los dos tókenes ERC-20 que intercambia. Los tókenes ERC-20 se identifican por las direcciones de los contratos que los implementan, por lo que las claves y el valor son todos direcciones. Para obtener la dirección del intercambio de pares que le permite convertir de `tokenA` a `tokenB`, utilice `getPair[<dirección de tokenA>][<dirección de tokenB>]` (o al revés).

La segunda variable, `allPairs`, es una matriz que incluye todas las direcciones de los intercambios de pares creados por esta fábrica. En Ethereum no se puede iterar sobre el contenido de una asignación, ni obtener una lista de todas las claves, por lo que esta variable es la única forma de saber qué intercambios gestiona esta fábrica.

Nota: la razón por la que no se pueden iterar todas las claves de una asignación es que el almacenamiento de datos del contrato es _costoso_, por lo que cuanto menos lo usemos, mejor, y cuanto menos lo cambiemos
, mejor. Puede crear [asignaciones que admitan la iteración](https://github.com/ethereum/dapp-bin/blob/master/library/iterable_mapping.sol), pero requieren almacenamiento adicional para una lista de claves. En la mayoría de las aplicaciones no se necesita.

```solidity
    event PairCreated(address indexed token0, address indexed token1, address pair, uint);
```

Este evento se emite cuando se crea un nuevo intercambio de pares. Incluye las direcciones de los tókenes, la dirección del intercambio de pares y el número total de intercambios gestionados por la fábrica.

```solidity
    constructor(address _feeToSetter) public {
        feeToSetter = _feeToSetter;
    }
```

Lo único que hace el constructor es especificar el `feeToSetter`. Las fábricas empiezan sin comisión, y solo `feeSetter` puede cambiar eso.

```solidity
    function allPairsLength() external view returns (uint) {
        return allPairs.length;
    }
```

Esta función devuelve el número de pares de intercambio.

```solidity
    function createPair(address tokenA, address tokenB) external returns (address pair) {
```

Esta es la función principal de la fábrica, crear un intercambio de pares entre dos tókenes ERC-20. Tenga en cuenta que cualquiera puede llamar a esta función. No necesita permiso de Uniswap para crear un nuevo intercambio de pares.

```solidity
        require(tokenA != tokenB, 'UniswapV2: IDENTICAL_ADDRESSES');
        (address token0, address token1) = tokenA < tokenB ? (tokenA, tokenB) : (tokenB, tokenA);
```

Queremos que la dirección del nuevo intercambio sea determinista, para que pueda calcularse por adelantado fuera de la cadena (esto puede ser útil para [las transacciones de capa 2](/developers/docs/scaling/)).
Para ello necesitamos tener un orden consistente de las direcciones de los tókenes, independientemente del orden en que los hayamos recibido, así que los ordenamos aquí.

```solidity
        require(token0 != address(0), 'UniswapV2: ZERO_ADDRESS');
        require(getPair[token0][token1] == address(0), 'UniswapV2: PAIR_EXISTS'); // single check is sufficient
```

Los fondos de liquidez grandes son mejores que los pequeños, porque tienen precios más estables. No queremos tener más de un fondo de liquidez por par de tókenes. Si ya existe un intercambio, no es necesario crear otro para el mismo par.

```solidity
        bytes memory bytecode = type(UniswapV2Pair).creationCode;
```

Para crear un nuevo contrato, necesitamos el código que lo crea (tanto la función constructora como el código que escribe en la memoria el código de bytes de la EVM del contrato real). Normalmente en Solidity solo usamos `addr = new <nombre del contrato>(<parámetros del constructor>)` y el compilador se encarga de todo por nosotros, pero para tener una dirección de contrato determinista necesitamos usar [el código de operación CREATE2](https://eips.ethereum.org/EIPS/eip-1014).
Cuando se escribió este código, ese código de operación aún no era compatible con Solidity, por lo que era necesario obtener el código manualmente. Esto ya no es un problema, porque [Solidity ahora es compatible con CREATE2](https://docs.soliditylang.org/en/v0.8.3/control-structures.html#salted-contract-creations-create2).

```solidity
        bytes32 salt = keccak256(abi.encodePacked(token0, token1));
        assembly {
            pair := create2(0, add(bytecode, 32), mload(bytecode), salt)
        }
```

Cuando un código de operación aún no es compatible con Solidity, podemos llamarlo usando [ensamblado en línea](https://docs.soliditylang.org/en/v0.8.3/assembly.html).

```solidity
        IUniswapV2Pair(pair).initialize(token0, token1);
```

Llamar a la función `initialize` para indicar al nuevo intercambio qué dos tókenes intercambia.

```solidity
        getPair[token0][token1] = pair;
        getPair[token1][token0] = pair; // populate mapping in the reverse direction
        allPairs.push(pair);
        emit PairCreated(token0, token1, pair, allPairs.length);
```

Guarde la información del nuevo par en las variables de estado y emita un evento para informar al mundo del nuevo intercambio de pares.

```solidity
    function setFeeTo(address _feeTo) external {
        require(msg.sender == feeToSetter, 'UniswapV2: FORBIDDEN');
        feeTo = _feeTo;
    }

    function setFeeToSetter(address _feeToSetter) external {
        require(msg.sender == feeToSetter, 'UniswapV2: FORBIDDEN');
        feeToSetter = _feeToSetter;
    }
}
```

Estas dos funciones permiten a `feeSetter` controlar el destinatario de la comisión (si lo hay) y cambiar `feeSetter` a una nueva dirección.

### UniswapV2ERC20.sol {#UniswapV2ERC20}

[Este contrato](https://github.com/Uniswap/uniswap-v2-core/blob/master/contracts/UniswapV2ERC20.sol) implementa el token de liquidez ERC-20. Es similar al [contrato ERC-20 de OpenZeppelin](/developers/tutorials/erc20-annotated-code), por lo que solo explicaré la parte que es diferente, la funcionalidad de `permit`.

Las transacciones en Ethereum cuestan ether (ETH), que equivale a dinero real. Si tiene tókenes ERC-20 pero no ETH, no puede enviar transacciones, por lo que no puede hacer nada with ellos. Una solución para evitar este problema son las [metatransacciones](https://docs.uniswap.org/contracts/v2/guides/smart-contract-integration/supporting-meta-transactions).
El propietario de los tókenes firma una transacción que permite a otra persona retirar tókenes fuera de la cadena y la envía a través de Internet al destinatario. El destinatario, que sí tiene ETH, envía el permiso en nombre del propietario.

```solidity
    bytes32 public DOMAIN_SEPARATOR;
    // keccak256("Permit(address owner,address spender,uint256 value,uint256 nonce,uint256 deadline)");
    bytes32 public constant PERMIT_TYPEHASH = 0x6e71edae12b1b97f4d1f60370fef10105fa2faae0126114a169c64845d6126c9;
```

Este hash es el [identificador del tipo de transacción](https://eips.ethereum.org/EIPS/eip-712#rationale-for-typehash). El único que admitimos aquí es `Permit` with estos parámetros.

```solidity
    mapping(address => uint) public nonces;
```

No es factible que un destinatario falsifique una firma digital. Sin embargo, es trivial enviar la misma transacción dos veces (esto es una forma de [ataque de repetición](https://wikipedia.org/wiki/Replay_attack)). Para evitarlo, utilizamos un [nonce](https://wikipedia.org/wiki/Cryptographic_nonce). Si el nonce de un nuevo `Permit` no es uno más que el último utilizado, asumimos que no es válido.

```solidity
    constructor() public {
        uint chainId;
        assembly {
            chainId := chainid
        }
```

Este es el código para recuperar el [identificador de cadena](https://chainid.network/). Utiliza un dialecto de ensamblado de EVM llamado [Yul](https://docs.soliditylang.org/en/v0.8.4/yul.html). Tenga en cuenta que en la versión actual de Yul tiene que usar `chainid()`, no `chainid`.

```solidity
        DOMAIN_SEPARATOR = keccak256(
            abi.encode(
                keccak256('EIP712Domain(string name,string version,uint256 chainId,address verifyingContract)'),
                keccak256(bytes(name)),
                keccak256(bytes('1')),
                chainId,
                address(this)
            )
        );
    }
```

Calcular el [separador de dominio](https://eips.ethereum.org/EIPS/eip-712#rationale-for-domainseparator) para EIP-712.

```solidity
    function permit(address owner, address spender, uint value, uint deadline, uint8 v, bytes32 r, bytes32 s) external {
```

Esta es la función que implementa los permisos. Recibe como parámetros los campos relevantes y los tres valores escalares para [la firma](https://yos.io/2018/11/16/ethereum-signatures/) (v, r y s).

```solidity
        require(deadline >= block.timestamp, 'UniswapV2: EXPIRED');
```

No acepte transacciones después de la fecha límite.

```solidity
        bytes32 digest = keccak256(
            abi.encodePacked(
                '\x19\x01',
                DOMAIN_SEPARATOR,
                keccak256(abi.encode(PERMIT_TYPEHASH, owner, spender, value, nonces[owner]++, deadline))
            )
        );
```

`abi.encodePacked(...)` es el mensaje que esperamos recibir. Sabemos cuál debe ser el nonce, por lo que no es necesario que lo obtengamos como parámetro.

El algoritmo de firma de Ethereum espera obtener 256 bits para firmar, por lo que usamos la función hash `keccak256`.

```solidity
        address recoveredAddress = ecrecover(digest, v, r, s);
```

A partir del resumen y la firma podemos obtener la dirección que lo firmó usando [ecrecover](https://coders-errand.com/ecrecover-signature-verification-ethereum/).

```solidity
        require(recoveredAddress != address(0) && recoveredAddress == owner, 'UniswapV2: INVALID_SIGNATURE');
        _approve(owner, spender, value);
    }

```

Si todo está bien, trátelo como [una aprobación de ERC-20](https://eips.ethereum.org/EIPS/eip-20#approve).

## Los contratos periféricos {#periphery-contracts}

Los contratos periféricos son la API (interfaz de programación de aplicaciones) de Uniswap. Están disponibles para llamadas externas, ya sea desde otros contratos o aplicaciones descentralizadas. Podría llamar a los contratos principales directamente, pero es más complicado y podría perder valor si comete un error. Los contratos principales solo contienen pruebas para asegurarse de que no están siendo engañados, no comprobaciones de seguridad para nadie más. Estos están en la periferia para que puedan actualizarse según sea necesario.

### UniswapV2Router01.sol {#UniswapV2Router01}

[Este contrato](https://github.com/Uniswap/uniswap-v2-periphery/blob/master/contracts/UniswapV2Router01.sol) tiene problemas y [ya no debería usarse](https://docs.uniswap.org/contracts/v2/reference/smart-contracts/router-01). Por suerte, los contratos periféricos no tienen estado y no contienen ningún activo, por lo que es fácil dejarlo obsoleto y sugerir que se use el reemplazo, `UniswapV2Router02`, en su lugar.

### UniswapV2Router02.sol {#UniswapV2Router02}

En la mayoría de los casos, usaría Uniswap a través de [este contrato](https://github.com/Uniswap/uniswap-v2-periphery/blob/master/contracts/UniswapV2Router02.sol).
Puede ver cómo usarlo [aquí](https://docs.uniswap.org/contracts/v2/reference/smart-contracts/router-02).

```solidity
pragma solidity =0.6.6;

import '@uniswap/v2-core/contracts/interfaces/IUniswapV2Factory.sol';
import '@uniswap/lib/contracts/libraries/TransferHelper.sol';

import './interfaces/IUniswapV2Router02.sol';
import './libraries/UniswapV2Library.sol';
import './libraries/SafeMath.sol';
import './interfaces/IERC20.sol';
import './interfaces/IWETH.sol';
```

La mayoría de estos los hemos encontrado antes o son bastante obvios. La única excepción es `IWETH.sol`. Uniswap v2 permite intercambios para cualquier par de tókenes ERC-20, pero ether (ETH) en sí mismo no es un token ERC-20. Es anterior al estándar y se transfiere mediante mecanismos únicos. Para permitir el uso de ETH en contratos que se aplican a tókenes ERC-20, la gente ideó el contrato [ether envuelto (WETH)](https://weth.tkn.eth.limo/). Usted envía ETH a este contrato y este le acuña una cantidad equivalente de WETH. O puede quemar WETH y recuperar ETH.

```solidity
contract UniswapV2Router02 is IUniswapV2Router02 {
    using SafeMath for uint;

    address public immutable override factory;
    address public immutable override WETH;
```

El enrutador necesita saber qué fábrica usar y, para las transacciones que requieren WETH, qué contrato WETH usar. Estos valores son [inmutables](https://docs.soliditylang.org/en/v0.8.3/contracts.html#constant-and-immutable-state-variables), lo que significa que solo se pueden establecer en el constructor. Esto da a los usuarios la confianza de que nadie podrá cambiarlos para que apunten a contratos menos honestos.

```solidity
    modifier ensure(uint deadline) {
        require(deadline >= block.timestamp, 'UniswapV2Router: EXPIRED');
        _;
    }
```

Este modificador se asegura de que las transacciones con límite de tiempo («haga X antes de la hora Y si puede») no ocurran después de su límite de tiempo.

```solidity
    constructor(address _factory, address _WETH) public {
        factory = _factory;
        WETH = _WETH;
    }
```

El constructor solo establece las variables de estado inmutables.

```solidity
    receive() external payable {
        assert(msg.sender == WETH); // only accept ETH via fallback from the WETH contract
    }
```

Esta función se llama cuando canjeamos tókenes del contrato WETH de nuevo en ETH. Solo el contrato WETH que usamos está autorizado a hacerlo.

#### Añadir liquidez {#add-liquidity}

Estas funciones agregan tókenes al intercambio de pares, lo que aumenta el fondo de liquidez.

```solidity

    // **** ADD LIQUIDITY ****
    function _addLiquidity(
```

Esta función se utiliza para calcular la cantidad de tókenes A y B que deben depositarse en el intercambio de pares.

```solidity
        address tokenA,
        address tokenB,
```

Estas son las direcciones de los contratos de tókenes ERC-20.

```solidity
        uint amountADesired,
        uint amountBDesired,
```

Estas son las cantidades que el proveedor de liquidez quiere depositar. También son las cantidades máximas de A y B que se pueden depositar.

```solidity
        uint amountAMin,
        uint amountBMin
```

Estas son las cantidades mínimas aceptables para depositar. Si la transacción no puede realizarse con estas cantidades o más, reviértala. Si no quiere esta función, simplemente especifique cero.

Los proveedores de liquidez especifican un mínimo, por lo general, porque quieren limitar la transacción a un tipo de cambio cercano al actual. Si el tipo de cambio fluctúa demasiado, podría significar noticias que cambien los valores subyacentes, y querrán decidir manualmente qué hacer.

Por ejemplo, imagine un caso en el que el tipo de cambio es de uno a uno y el proveedor de liquidez especifica estos valores:

| Parámetro      | Valor |
| -------------- | ----: |
| amountADesired |  1000 |
| amountBDesired |  1000 |
| amountAMin     |   900 |
| amountBMin     |   800 |

Mientras el tipo de cambio se mantenga entre 0,9 y 1,25, la transacción se realiza. Si el tipo de cambio sale de ese rango, la transacción se cancela.

El motivo de esta precaución es que las transacciones no son inmediatas, usted las envía y, finalmente, un validador las incluirá en un bloque (a menos que su precio de gas sea muy bajo, en cuyo caso necesitará enviar otra transacción con el mismo nonce y un precio de gas más alto para sobrescribirla). No puede controlar lo que sucede durante el intervalo entre el envío y la inclusión.

```solidity
    ) internal virtual returns (uint amountA, uint amountB) {
```

La función devuelve las cantidades que el proveedor de liquidez debe depositar para tener una relación igual a la relación actual entre las reservas.

```solidity
        // create the pair if it doesn't exist yet
        if (IUniswapV2Factory(factory).getPair(tokenA, tokenB) == address(0)) {
            IUniswapV2Factory(factory).createPair(tokenA, tokenB);
        }
```

Si aún no existe un intercambio para este par de tókenes, créelo.

```solidity
        (uint reserveA, uint reserveB) = UniswapV2Library.getReserves(factory, tokenA, tokenB);
```

Obtenga las reservas actuales en el par.

```solidity
        if (reserveA == 0 && reserveB == 0) {
            (amountA, amountB) = (amountADesired, amountBDesired);
```

Si las reservas actuales están vacías, este es un nuevo intercambio de pares. Las cantidades a depositar deben ser exactamente las mismas que las que el proveedor de liquidez desea proporcionar.

```solidity
        } else {
            uint amountBOptimal = UniswapV2Library.quote(amountADesired, reserveA, reserveB);
```

Si necesitamos ver qué cantidades habrá, obtenemos la cantidad óptima usando [esta función](https://github.com/Uniswap/uniswap-v2-periphery/blob/master/contracts/libraries/UniswapV2Library.sol#L35). Queremos la misma proporción que las reservas actuales.

```solidity
            if (amountBOptimal <= amountBDesired) {
                require(amountBOptimal >= amountBMin, 'UniswapV2Router: INSUFFICIENT_B_AMOUNT');
                (amountA, amountB) = (amountADesired, amountBOptimal);
```

Si `amountBOptimal` es menor que la cantidad que el proveedor de liquidez quiere depositar, significa que el token B es actualmente más valioso de lo que cree el depositante de liquidez, por lo que se requiere una cantidad menor.

```solidity
            } else {
                uint amountAOptimal = UniswapV2Library.quote(amountBDesired, reserveB, reserveA);
                assert(amountAOptimal <= amountADesired);
                require(amountAOptimal >= amountAMin, 'UniswapV2Router: INSUFFICIENT_A_AMOUNT');
                (amountA, amountB) = (amountAOptimal, amountBDesired);
```

Si la cantidad óptima de B es mayor que la cantidad deseada de B, significa que los tókenes B son actualmente menos valiosos de lo que cree el depositante de liquidez, por lo que se requiere una cantidad mayor. Sin embargo, la cantidad deseada es un máximo, por lo que no podemos hacer eso. En su lugar, calculamos el número óptimo de tókenes A para la cantidad deseada de tókenes B.

Al juntar todo, obtenemos este gráfico. Supongamos que está intentando depositar mil tókenes A (línea azul) y mil tókenes B (línea roja). El eje x es el tipo de cambio, A/B. Si x=1, tienen el mismo valor y deposita mil de cada uno. Si x=2, A vale el doble que B (se obtienen dos tókenes B por cada token A), por lo que se depositan mil tókenes B, pero solo 500 tókenes A. Si x=0.5, la situación se invierte, mil tókenes A y quinientos tókenes B.

![Gráfico](liquidityProviderDeposit.png)

Podría depositar liquidez directamente en el contrato principal (usando [UniswapV2Pair::mint](https://github.com/Uniswap/uniswap-v2-core/blob/master/contracts/UniswapV2Pair.sol#L110)), pero el contrato principal solo comprueba que no está siendo engañado, por lo que corre el riesgo de perder valor si el tipo de cambio cambia entre el momento en que envía su transacción y el momento en que se ejecuta. Si utiliza el contrato periférico, este calcula la cantidad que debe depositar y la deposita inmediatamente, para que el tipo de cambio no cambie y no pierda nada.

```solidity
    function addLiquidity(
        address tokenA,
        address tokenB,
        uint amountADesired,
        uint amountBDesired,
        uint amountAMin,
        uint amountBMin,
        address to,
        uint deadline
```

Esta función puede ser llamada por una transacción para depositar liquidez. La mayoría de los parámetros son los mismos que en `_addLiquidity` anterior, con dos excepciones:

. `to` es la dirección que obtiene los nuevos tókenes de liquidez acuñados para mostrar la parte del fondo del proveedor de liquidez
. `deadline` es un límite de tiempo en la transacción

```solidity
    ) external virtual override ensure(deadline) returns (uint amountA, uint amountB, uint liquidity) {
        (amountA, amountB) = _addLiquidity(tokenA, tokenB, amountADesired, amountBDesired, amountAMin, amountBMin);
        address pair = UniswapV2Library.pairFor(factory, tokenA, tokenB);
```

Calculamos las cantidades a depositar realmente y luego encontramos la dirección del fondo de liquidez. Para ahorrar gas no lo hacemos preguntando a la fábrica, sino usando la función de librería `pairFor` (ver más abajo en librerías)

```solidity
        TransferHelper.safeTransferFrom(tokenA, msg.sender, pair, amountA);
        TransferHelper.safeTransferFrom(tokenB, msg.sender, pair, amountB);
```

Transferir las cantidades correctas de tókenes del usuario al intercambio de pares.

```solidity
        liquidity = IUniswapV2Pair(pair).mint(to);
```

A cambio, dé a la dirección `to` tókenes de liquidez para la propiedad parcial de la reserva. La función `mint` del contrato principal ve cuántos tókenes adicionales tiene (en comparación con los que tenía la última vez que cambió la liquidez) y acuña liquidez en consecuencia.

```solidity
    function addLiquidityETH(
        address token,
        uint amountTokenDesired,
```

Cuando un proveedor de liquidez quiere proporcionar liquidez a un intercambio de pares Token/ETH, hay algunas diferencias. El contrato gestiona el empaquetado del ETH para el proveedor de liquidez. No es necesario especificar cuántos ETH quiere depositar el usuario, porque este simplemente los envía con la transacción (la cantidad está disponible en `msg.value`).

```solidity
        uint amountTokenMin,
        uint amountETHMin,
        address to,
        uint deadline
    ) external virtual override payable ensure(deadline) returns (uint amountToken, uint amountETH, uint liquidity) {
        (amountToken, amountETH) = _addLiquidity(
            token,
            WETH,
            amountTokenDesired,
            msg.value,
            amountTokenMin,
            amountETHMin
        );
        address pair = UniswapV2Library.pairFor(factory, token, WETH);
        TransferHelper.safeTransferFrom(token, msg.sender, pair, amountToken);
        IWETH(WETH).deposit{value: amountETH}();
        assert(IWETH(WETH).transfer(pair, amountETH));
```

Para depositar el ETH, el contrato primero lo envuelve en WETH y luego transfiere el WETH al par. Tenga en cuenta que la transferencia está envuelta en un `assert`. Esto significa que si la transferencia falla, esta llamada de contrato también falla y, por lo tanto, la envoltura realmente no ocurre.

```solidity
        liquidity = IUniswapV2Pair(pair).mint(to);
        // refund dust eth, if any
        if (msg.value > amountETH) TransferHelper.safeTransferETH(msg.sender, msg.value - amountETH);
    }
```

El usuario ya nos ha enviado el ETH, por lo que si queda algo extra (porque el otro token es menos valioso de lo que el usuario pensaba), tenemos que emitir un reembolso.

#### Retirar liquidez {#remove-liquidity}

Estas funciones eliminarán la liquidez y la devolverán al proveedor de liquidez.

```solidity
    // **** REMOVE LIQUIDITY ****
    function removeLiquidity(
        address tokenA,
        address tokenB,
        uint liquidity,
        uint amountAMin,
        uint amountBMin,
        address to,
        uint deadline
    ) public virtual override ensure(deadline) returns (uint amountA, uint amountB) {
```

El caso más sencillo de eliminación de liquidez. Hay una cantidad mínima de cada token que el proveedor de liquidez acepta, y debe ocurrir antes de la fecha límite.

```solidity
        address pair = UniswapV2Library.pairFor(factory, tokenA, tokenB);
        IUniswapV2Pair(pair).transferFrom(msg.sender, pair, liquidity); // send liquidity to pair
        (uint amount0, uint amount1) = IUniswapV2Pair(pair).burn(to);
```

La función `burn` del contrato principal se encarga de devolver al usuario los tókenes.

```solidity
        (address token0,) = UniswapV2Library.sortTokens(tokenA, tokenB);
```

Cuando una función devuelve varios valores, pero solo estamos interesados en algunos de ellos, así es como solo obtenemos esos valores. Es algo más barato en términos de gas que leer un valor y nunca usarlo.

```solidity
        (amountA, amountB) = tokenA == token0 ? (amount0, amount1) : (amount1, amount0);
```

Traducir las cantidades de la forma en que el contrato principal las devuelve (primero el token de dirección inferior) a la forma en que el usuario las espera (correspondiente a `tokenA` y `tokenB`).

```solidity
        require(amountA >= amountAMin, 'UniswapV2Router: INSUFFICIENT_A_AMOUNT');
        require(amountB >= amountBMin, 'UniswapV2Router: INSUFFICIENT_B_AMOUNT');
    }
```

Se puede hacer la transferencia primero y luego verificar que es legítima, porque si no lo es, se revertirán todos los cambios de estado.

```solidity
    function removeLiquidityETH(
        address token,
        uint liquidity,
        uint amountTokenMin,
        uint amountETHMin,
        address to,
        uint deadline
    ) public virtual override ensure(deadline) returns (uint amountToken, uint amountETH) {
        (amountToken, amountETH) = removeLiquidity(
            token,
            WETH,
            liquidity,
            amountTokenMin,
            amountETHMin,
            address(this),
            deadline
        );
        TransferHelper.safeTransfer(token, to, amountToken);
        IWETH(WETH).withdraw(amountETH);
        TransferHelper.safeTransferETH(to, amountETH);
    }
```

Eliminar liquidez para ETH es casi lo mismo, excepto que recibimos los tókenes WETH y luego los canjeamos por ETH para devolverlos al proveedor de liquidez.

```solidity
    function removeLiquidityWithPermit(
        address tokenA,
        address tokenB,
        uint liquidity,
        uint amountAMin,
        uint amountBMin,
        address to,
        uint deadline,
        bool approveMax, uint8 v, bytes32 r, bytes32 s
    ) external virtual override returns (uint amountA, uint amountB) {
        address pair = UniswapV2Library.pairFor(factory, tokenA, tokenB);
        uint value = approveMax ? uint(-1) : liquidity;
        IUniswapV2Pair(pair).permit(msg.sender, address(this), value, deadline, v, r, s);
        (amountA, amountB) = removeLiquidity(tokenA, tokenB, liquidity, amountAMin, amountBMin, to, deadline);
    }


    function removeLiquidityETHWithPermit(
        address token,
        uint liquidity,
        uint amountTokenMin,
        uint amountETHMin,
        address to,
        uint deadline,
        bool approveMax, uint8 v, bytes32 r, bytes32 s
    ) external virtual override returns (uint amountToken, uint amountETH) {
        address pair = UniswapV2Library.pairFor(factory, token, WETH);
        uint value = approveMax ? uint(-1) : liquidity;
        IUniswapV2Pair(pair).permit(msg.sender, address(this), value, deadline, v, r, s);
        (amountToken, amountETH) = removeLiquidityETH(token, liquidity, amountTokenMin, amountETHMin, to, deadline);
    }
```

Estas funciones retransmiten metatransacciones para permitir que los usuarios sin ether se retiren de la reserva, utilizando [el mecanismo de permiso](#UniswapV2ERC20).

```solidity

    // **** REMOVE LIQUIDITY (supporting fee-on-transfer tokens) ****
    function removeLiquidityETHSupportingFeeOnTransferTokens(
        address token,
        uint liquidity,
        uint amountTokenMin,
        uint amountETHMin,
        address to,
        uint deadline
    ) public virtual override ensure(deadline) returns (uint amountETH) {
        (, amountETH) = removeLiquidity(
            token,
            WETH,
            liquidity,
            amountTokenMin,
            amountETHMin,
            address(this),
            deadline
        );
        TransferHelper.safeTransfer(token, to, IERC20(token).balanceOf(address(this)));
        IWETH(WETH).withdraw(amountETH);
        TransferHelper.safeTransferETH(to, amountETH);
    }

```

Esta función se puede utilizar para tókenes que tienen comisiones de transferencia o almacenamiento. Cuando un token tiene tales comisiones no podemos confiar en la función `removeLiquidity` para decirnos cuánto del token recibimos, por lo que primero tenemos que retirar y luego obtener el saldo.

```solidity


    function removeLiquidityETHWithPermitSupportingFeeOnTransferTokens(
        address token,
        uint liquidity,
        uint amountTokenMin,
        uint amountETHMin,
        address to,
        uint deadline,
        bool approveMax, uint8 v, bytes32 r, bytes32 s
    ) external virtual override returns (uint amountETH) {
        address pair = UniswapV2Library.pairFor(factory, token, WETH);
        uint value = approveMax ? uint(-1) : liquidity;
        IUniswapV2Pair(pair).permit(msg.sender, address(this), value, deadline, v, r, s);
        amountETH = removeLiquidityETHSupportingFeeOnTransferTokens(
            token, liquidity, amountTokenMin, amountETHMin, to, deadline
        );
    }
```

La función final combina las tarifas de almacenamiento con las metatransacciones.

#### Operar {#trade}

```solidity
    // **** INTERCAMBIO ****
    // requiere que la cantidad inicial ya haya sido enviada al primer par
    function _swap(uint[] memory amounts, address[] memory path, address _to) internal virtual {
```

Esta función realiza el procesamiento interno necesario para las funciones que se exponen a los operadores.

```solidity
        for (uint i; i < path.length - 1; i++) {
```

Mientras escribo esto, hay [388.160 tokens ERC-20](https://eth.blockscout.com/tokens). Si hubiera un intercambio de pares por cada par de tokens, habría más de 150 mil millones de intercambios de pares. La cadena entera, por el momento, [solo tiene el 0,1 % de ese número de cuentas](https://eth.blockscout.com/stats/accountsGrowth). En su lugar, las funciones de intercambio soportan el concepto de una ruta. Un operador puede intercambiar A por B, B por C y C por D, por lo que no hay necesidad de un intercambio de pares A-D directo.

Los precios en estos mercados tienden a estar sincronizados, porque cuando no están sincronizados, se crea una oportunidad de arbitraje. Imagine, por ejemplo, tres tokens, A, B y C. Hay tres intercambios de pares, uno para cada par.

1. La situación inicial
2. Un operador vende 24,695 tokens A y obtiene 25,305 tokens B.
3. El operador vende 24,695 tokens B por 25,305 tokens C y se queda con aproximadamente 0,61 tokens B como ganancia.
4. Luego, el operador vende 24,695 tokens C por 25,305 tokens A y se queda con aproximadamente 0,61 tokens C como ganancia. El operador también tiene 0,61 tokens A adicionales (los 25,305 que obtiene al final, menos la inversión original de 24,695).

| Paso | Intercambio A-B                                             | Intercambio B-C                                             | Intercambio A-C                                             |
| ---- | ----------------------------------------------------------- | ----------------------------------------------------------- | ----------------------------------------------------------- |
| 1    | A:1000 B:1050 A/B=1,05      | B:1000 C:1050 B/C=1,05      | A:1050 C:1000 C/A=1,05      |
| 2    | A:1024,695 B:1024,695 A/B=1 | B:1000 C:1050 B/C=1,05      | A:1050 C:1000 C/A=1,05      |
| 3    | A:1024,695 B:1024,695 A/B=1 | B:1024,695 C:1024,695 B/C=1 | A:1050 C:1000 C/A=1,05      |
| 4    | A:1024,695 B:1024,695 A/B=1 | B:1024,695 C:1024,695 B/C=1 | A:1024,695 C:1024,695 C/A=1 |

```solidity
            (address input, address output) = (path[i], path[i + 1]);
            (address token0,) = UniswapV2Library.sortTokens(input, output);
            uint amountOut = amounts[i + 1];
```

Obtener el par que estamos manejando, ordenarlo (para usarlo con el par) y obtener la cantidad de salida esperada.

```solidity
            (uint amount0Out, uint amount1Out) = input == token0 ? (uint(0), amountOut) : (amountOut, uint(0));
```

Obtener las cantidades de salida esperadas, ordenadas de la forma en que el intercambio de pares espera que estén.

```solidity
            address to = i < path.length - 2 ? UniswapV2Library.pairFor(factory, output, path[i + 2]) : _to;
```

¿Es este el último intercambio? Si es así, envíe los tokens recibidos por la operación al destino. Si no es así, envíelo al siguiente intercambio de pares.

```solidity

            IUniswapV2Pair(UniswapV2Library.pairFor(factory, input, output)).swap(
                amount0Out, amount1Out, to, new bytes(0)
            );
        }
    }
```

Llamar realmente al intercambio de pares para intercambiar los tokens. No necesitamos una retrollamada que nos informe sobre el intercambio, por lo que no enviamos ningún byte en ese campo.

```solidity
    function swapExactTokensForTokens(
```

Esta función es utilizada directamente por los operadores para intercambiar un token por otro.

```solidity
        uint amountIn,
        uint amountOutMin,
        address[] calldata path,
```

Este parámetro contiene las direcciones de los contratos ERC-20. Como se explicó anteriormente, esto es una matriz porque es posible que deba pasar por varios intercambios de pares para llegar desde el activo que tiene al activo que desea.

Un parámetro de función en Solidity se puede almacenar en `memory` o en `calldata`. Si la función es un punto de entrada al contrato, llamada directamente por un usuario (mediante una transacción) o desde un contrato diferente, el valor del parámetro puede tomarse directamente de los datos de la llamada. Si se llama a la función internamente, como `_swap` más arriba, los parámetros deben almacenarse en `memory`. Desde la perspectiva del contrato llamado, `calldata` es de solo lectura.

Con tipos escalares como `uint` o `address`, el compilador se encarga de elegir el almacenamiento por nosotros, pero con las matrices, que son más largas y costosas, especificamos el tipo de almacenamiento que se va a utilizar.

```solidity
        address to,
        uint deadline
    ) external virtual override ensure(deadline) returns (uint[] memory amounts) {
```

Los valores de retorno siempre se devuelven en la memoria.

```solidity
        amounts = UniswapV2Library.getAmountsOut(factory, amountIn, path);
        require(amounts[amounts.length - 1] >= amountOutMin, 'UniswapV2Router: INSUFFICIENT_OUTPUT_AMOUNT');
```

Calcular la cantidad a comprar en cada intercambio. Si el resultado es menor que el mínimo que el operador está dispuesto a aceptar, se revierte la transacción.

```solidity
        TransferHelper.safeTransferFrom(
            path[0], msg.sender, UniswapV2Library.pairFor(factory, path[0], path[1]), amounts[0]
        );
        _swap(amounts, path, to);
    }
```

Finalmente, transfiera el token ERC-20 inicial a la cuenta del primer intercambio de pares y llame a `_swap`. Todo esto sucede en la misma transacción, por lo que el intercambio de pares sabe que cualquier token inesperado es parte de esta transferencia.

```solidity
    function swapTokensForExactTokens(
        uint amountOut,
        uint amountInMax,
        address[] calldata path,
        address to,
        uint deadline
    ) external virtual override ensure(deadline) returns (uint[] memory amounts) {
        amounts = UniswapV2Library.getAmountsIn(factory, amountOut, path);
        require(amounts[0] <= amountInMax, 'UniswapV2Router: EXCESSIVE_INPUT_AMOUNT');
        TransferHelper.safeTransferFrom(
            path[0], msg.sender, UniswapV2Library.pairFor(factory, path[0], path[1]), amounts[0]
        );
        _swap(amounts, path, to);
    }
```

La función anterior, `swapTokensForTokens`, permite a un operador especificar un número exacto de tokens de entrada que está dispuesto a dar y el número mínimo de tokens de salida que está dispuesto a recibir a cambio. Esta función realiza el intercambio inverso: permite a un operador especificar el número de tokens de salida que desea y el número máximo de tokens de entrada que está dispuesto a pagar por ellos.

En ambos casos, el operador debe primero dar a este contrato de periferia una autorización para permitirle transferirlos.

```solidity
    function swapExactETHForTokens(uint amountOutMin, address[] calldata path, address to, uint deadline)
        external
        virtual
        override
        payable
        ensure(deadline)
        returns (uint[] memory amounts)
    {
        require(path[0] == WETH, 'UniswapV2Router: INVALID_PATH');
        amounts = UniswapV2Library.getAmountsOut(factory, msg.value, path);
        require(amounts[amounts.length - 1] >= amountOutMin, 'UniswapV2Router: INSUFFICIENT_OUTPUT_AMOUNT');
        IWETH(WETH).deposit{value: amounts[0]}();
        assert(IWETH(WETH).transfer(UniswapV2Library.pairFor(factory, path[0], path[1]), amounts[0]));
        _swap(amounts, path, to);
    }


    function swapTokensForExactETH(uint amountOut, uint amountInMax, address[] calldata path, address to, uint deadline)
        external
        virtual
        override
        ensure(deadline)
        returns (uint[] memory amounts)
    {
        require(path[path.length - 1] == WETH, 'UniswapV2Router: INVALID_PATH');
        amounts = UniswapV2Library.getAmountsIn(factory, amountOut, path);
        require(amounts[0] <= amountInMax, 'UniswapV2Router: EXCESSIVE_INPUT_AMOUNT');
        TransferHelper.safeTransferFrom(
            path[0], msg.sender, UniswapV2Library.pairFor(factory, path[0], path[1]), amounts[0]
        );
        _swap(amounts, path, address(this));
        IWETH(WETH).withdraw(amounts[amounts.length - 1]);
        TransferHelper.safeTransferETH(to, amounts[amounts.length - 1]);
    }



    function swapExactTokensForETH(uint amountIn, uint amountOutMin, address[] calldata path, address to, uint deadline)
        external
        virtual
        override
        ensure(deadline)
        returns (uint[] memory amounts)
    {
        require(path[path.length - 1] == WETH, 'UniswapV2Router: INVALID_PATH');
        amounts = UniswapV2Library.getAmountsOut(factory, amountIn, path);
        require(amounts[amounts.length - 1] >= amountOutMin, 'UniswapV2Router: INSUFFICIENT_OUTPUT_AMOUNT');
        TransferHelper.safeTransferFrom(
            path[0], msg.sender, UniswapV2Library.pairFor(factory, path[0], path[1]), amounts[0]
        );
        _swap(amounts, path, address(this));
        IWETH(WETH).withdraw(amounts[amounts.length - 1]);
        TransferHelper.safeTransferETH(to, amounts[amounts.length - 1]);
    }


    function swapETHForExactTokens(uint amountOut, address[] calldata path, address to, uint deadline)
        external
        virtual
        override
        payable
        ensure(deadline)
        returns (uint[] memory amounts)
    {
        require(path[0] == WETH, 'UniswapV2Router: INVALID_PATH');
        amounts = UniswapV2Library.getAmountsIn(factory, amountOut, path);
        require(amounts[0] <= msg.value, 'UniswapV2Router: EXCESSIVE_INPUT_AMOUNT');
        IWETH(WETH).deposit{value: amounts[0]}();
        assert(IWETH(WETH).transfer(UniswapV2Library.pairFor(factory, path[0], path[1]), amounts[0]));
        _swap(amounts, path, to);
        // refund dust eth, if any
        if (msg.value > amounts[0]) TransferHelper.safeTransferETH(msg.sender, msg.value - amounts[0]);
    }
```

Estas cuatro variantes implican el intercambio entre ETH y tokens. La única diferencia es que o bien recibimos ETH del operador y lo usamos para acuñar WETH, o recibimos WETH del último intercambio en la ruta y lo quemamos, devolviendo al operador el ETH resultante.

```solidity
    // **** INTERCAMBIO (admite tokens con comisión por transferencia) ****
    // requiere que la cantidad inicial ya haya sido enviada al primer par
    function _swapSupportingFeeOnTransferTokens(address[] memory path, address _to) internal virtual {
```

Esta es la función interna para intercambiar tokens que tienen tarifas de transferencia o de almacenamiento para resolver ([este problema](https://github.com/Uniswap/uniswap-interface/issues/835)).

```solidity
        for (uint i; i < path.length - 1; i++) {
            (address input, address output) = (path[i], path[i + 1]);
            (address token0,) = UniswapV2Library.sortTokens(input, output);
            IUniswapV2Pair pair = IUniswapV2Pair(UniswapV2Library.pairFor(factory, input, output));
            uint amountInput;
            uint amountOutput;
            { // el ámbito para evitar errores de pila demasiado profunda
            (uint reserve0, uint reserve1,) = pair.getReserves();
            (uint reserveInput, uint reserveOutput) = input == token0 ? (reserve0, reserve1) : (reserve1, reserve0);
            amountInput = IERC20(input).balanceOf(address(pair)).sub(reserveInput);
            amountOutput = UniswapV2Library.getAmountOut(amountInput, reserveInput, reserveOutput);
```

Debido a las tarifas de transferencia no podemos confiar en la función `getAmountsOut` para que nos diga cuánto obtenemos de cada transferencia (de la forma en que lo hacemos antes de llamar al `_swap` original). En su lugar, tenemos que transferir primero y luego ver cuántos tokens recibimos.

Nota: En teoría podríamos usar esta función en lugar de `_swap`, pero en ciertos casos (por ejemplo, si la transferencia termina siendo revertida porque no hay suficiente al final para cumplir con el mínimo requerido) eso terminaría costando más gas. Los tokens con tarifa de transferencia son bastante raros, así que, aunque tenemos que darles soporte, no es necesario que todos los intercambios asuman que pasan por al menos uno de ellos.

```solidity
            }
            (uint amount0Out, uint amount1Out) = input == token0 ? (uint(0), amountOutput) : (amountOutput, uint(0));
            address to = i < path.length - 2 ? UniswapV2Library.pairFor(factory, output, path[i + 2]) : _to;
            pair.swap(amount0Out, amount1Out, to, new bytes(0));
        }
    }


    function swapExactTokensForTokensSupportingFeeOnTransferTokens(
        uint amountIn,
        uint amountOutMin,
        address[] calldata path,
        address to,
        uint deadline
    ) external virtual override ensure(deadline) {
        TransferHelper.safeTransferFrom(
            path[0], msg.sender, UniswapV2Library.pairFor(factory, path[0], path[1]), amountIn
        );
        uint balanceBefore = IERC20(path[path.length - 1]).balanceOf(to);
        _swapSupportingFeeOnTransferTokens(path, to);
        require(
            IERC20(path[path.length - 1]).balanceOf(to).sub(balanceBefore) >= amountOutMin,
            'UniswapV2Router: INSUFFICIENT_OUTPUT_AMOUNT'
        );
    }


    function swapExactETHForTokensSupportingFeeOnTransferTokens(
        uint amountOutMin,
        address[] calldata path,
        address to,
        uint deadline
    )
        external
        virtual
        override
        payable
        ensure(deadline)
    {
        require(path[0] == WETH, 'UniswapV2Router: INVALID_PATH');
        uint amountIn = msg.value;
        IWETH(WETH).deposit{value: amountIn}();
        assert(IWETH(WETH).transfer(UniswapV2Library.pairFor(factory, path[0], path[1]), amountIn));
        uint balanceBefore = IERC20(path[path.length - 1]).balanceOf(to);
        _swapSupportingFeeOnTransferTokens(path, to);
        require(
            IERC20(path[path.length - 1]).balanceOf(to).sub(balanceBefore) >= amountOutMin,
            'UniswapV2Router: INSUFFICIENT_OUTPUT_AMOUNT'
        );
    }


    function swapExactTokensForETHSupportingFeeOnTransferTokens(
        uint amountIn,
        uint amountOutMin,
        address[] calldata path,
        address to,
        uint deadline
    )
        external
        virtual
        override
        ensure(deadline)
    {
        require(path[path.length - 1] == WETH, 'UniswapV2Router: INVALID_PATH');
        TransferHelper.safeTransferFrom(
            path[0], msg.sender, UniswapV2Library.pairFor(factory, path[0], path[1]), amountIn
        );
        _swapSupportingFeeOnTransferTokens(path, address(this));
        uint amountOut = IERC20(WETH).balanceOf(address(this));
        require(amountOut >= amountOutMin, 'UniswapV2Router: INSUFFICIENT_OUTPUT_AMOUNT');
        IWETH(WETH).withdraw(amountOut);
        TransferHelper.safeTransferETH(to, amountOut);
    }
```

Estas son las mismas variantes que se utilizan para los tokens normales, pero en su lugar llaman a `_swapSupportingFeeOnTransferTokens`.

```solidity
    // **** FUNCIONES DE BIBLIOTECA ****
    function quote(uint amountA, uint reserveA, uint reserveB) public pure virtual override returns (uint amountB) {
        return UniswapV2Library.quote(amountA, reserveA, reserveB);
    }

    function getAmountOut(uint amountIn, uint reserveIn, uint reserveOut)
        public
        pure
        virtual
        override
        returns (uint amountOut)
    {
        return UniswapV2Library.getAmountOut(amountIn, reserveIn, reserveOut);
    }

    function getAmountIn(uint amountOut, uint reserveIn, uint reserveOut)
        public
        pure
        virtual
        override
        returns (uint amountIn)
    {
        return UniswapV2Library.getAmountIn(amountOut, reserveIn, reserveOut);
    }

    function getAmountsOut(uint amountIn, address[] memory path)
        public
        view
        virtual
        override
        returns (uint[] memory amounts)
    {
        return UniswapV2Library.getAmountsOut(factory, amountIn, path);
    }

    function getAmountsIn(uint amountOut, address[] memory path)
        public
        view
        virtual
        override
        returns (uint[] memory amounts)
    {
        return UniswapV2Library.getAmountsIn(factory, amountOut, path);
    }
}
```

Estas funciones son solo proxies que llaman a las [funciones de UniswapV2Library](#uniswapV2library).

### UniswapV2Migrator.sol {#UniswapV2Migrator}

Este contrato se utilizó para migrar los intercambios de la antigua v1 a la v2. Ahora que han sido migrados, ya no es relevante.

## Las bibliotecas {#libraries}

La [biblioteca SafeMath](https://docs.openzeppelin.com/contracts/2.x/api/math) está bien documentada, así que no hay necesidad de documentarla aquí.

### Math {#Math}

Esta biblioteca contiene algunas funciones matemáticas que normalmente no se necesitan en el código de Solidity, por lo que no forman parte del lenguaje.

```solidity
pragma solidity =0.5.16;

// una biblioteca para realizar varias operaciones matemáticas

library Math {
    function min(uint x, uint y) internal pure returns (uint z) {
        z = x < y ? x : y;
    }

    // método babilónico (https://wikipedia.org/wiki/Methods_of_computing_square_roots#Babylonian_method)
    function sqrt(uint y) internal pure returns (uint z) {
        if (y > 3) {
            z = y;
            uint x = y / 2 + 1;
```

Comience con x como una estimación que es más alta que la raíz cuadrada (esa es la razón por la que necesitamos tratar 1-3 como casos especiales).

```solidity
            while (x < z) {
                z = x;
                x = (y / x + x) / 2;
```

Obtenga una estimación más cercana, el promedio de la estimación anterior y el número cuya raíz cuadrada estamos tratando de encontrar dividido por la estimación anterior. Repita hasta que la nueva estimación no sea inferior a la existente. Para más detalles, [consulte aquí](https://wikipedia.org/wiki/Methods_of_computing_square_roots#Babylonian_method).

```solidity
            }
        } else if (y != 0) {
            z = 1;
```

Nunca deberíamos necesitar la raíz cuadrada de cero. Las raíces cuadradas de uno, dos y tres son aproximadamente uno (usamos números enteros, por lo que ignoramos la fracción).

```solidity
        }
    }
}
```

### Fracciones de punto fijo (UQ112x112) {#FixedPoint}

Esta biblioteca maneja fracciones, que normalmente no forman parte de la aritmética de Ethereum. Lo hace codificando el número _x_ como _x\*2^112_. Esto nos permite usar los códigos de operación de suma y resta originales sin ningún cambio.

```solidity
pragma solidity =0.5.16;

// una biblioteca para manejar números binarios de punto fijo (https://wikipedia.org/wiki/Q_(number_format))

// rango: [0, 2**112 - 1]
// resolución: 1 / 2**112

library UQ112x112 {
    uint224 constant Q112 = 2**112;
```

`Q112` es la codificación para uno.

```solidity
    // codificar un uint112 como UQ112x112
    function encode(uint112 y) internal pure returns (uint224 z) {
        z = uint224(y) * Q112; // nunca se desborda
    }
```

Como y es `uint112`, lo máximo que puede ser es 2^112-1. Ese número todavía se puede codificar como un `UQ112x112`.

```solidity
    // divide un UQ112x112 por un uint112, devolviendo un UQ112x112
    function uqdiv(uint224 x, uint112 y) internal pure returns (uint224 z) {
        z = x / uint224(y);
    }
}
```

Si dividimos dos valores `UQ112x112`, el resultado ya no se multiplica por 2^112. Así que, en su lugar, tomamos un número entero para el denominador. Habríamos tenido que usar un truco similar para hacer la multiplicación, pero no necesitamos multiplicar los valores de `UQ112x112`.

### UniswapV2Library {#uniswapV2library}

Esta biblioteca solo la utilizan los contratos de la periferia

```solidity
pragma solidity >=0.5.0;

import '@uniswap/v2-core/contracts/interfaces/IUniswapV2Pair.sol';

import "./SafeMath.sol";

library UniswapV2Library {
    using SafeMath for uint;

    // devuelve las direcciones de los tokens ordenadas, que se usan para manejar los valores de retorno de los pares ordenados en este orden
    function sortTokens(address tokenA, address tokenB) internal pure returns (address token0, address token1) {
        require(tokenA != tokenB, 'UniswapV2Library: IDENTICAL_ADDRESSES');
        (token0, token1) = tokenA < tokenB ? (tokenA, tokenB) : (tokenB, tokenA);
        require(token0 != address(0), 'UniswapV2Library: ZERO_ADDRESS');
    }
```

Ordene los dos tokens por dirección, para que podamos obtener la dirección del intercambio de pares por ellos. Esto es necesario porque, de lo contrario, tendríamos dos posibilidades, una para los parámetros A, B y otra para los parámetros B, A, lo que llevaría a dos intercambios en lugar de uno.

```solidity
    // calcula la dirección CREATE2 para un par sin realizar ninguna llamada externa
    function pairFor(address factory, address tokenA, address tokenB) internal pure returns (address pair) {
        (address token0, address token1) = sortTokens(tokenA, tokenB);
        pair = address(uint(keccak256(abi.encodePacked(
                hex'ff',
                factory,
                keccak256(abi.encodePacked(token0, token1)),
                hex'96e8ac4277198ff8b6f785478aa9a39f403cb768dd02cbee326c3e7da348845f' // hash del código de inicialización
            ))));
    }
```

Esta función calcula la dirección del intercambio de pares para los dos tokens. Este contrato se crea utilizando [el código de operación CREATE2](https://eips.ethereum.org/EIPS/eip-1014), por lo que podemos calcular la dirección utilizando el mismo algoritmo si conocemos los parámetros que utiliza. Esto es mucho más barato que preguntarle a la fábrica, y

```solidity
    // obtiene y ordena las reservas de un par
    function getReserves(address factory, address tokenA, address tokenB) internal view returns (uint reserveA, uint reserveB) {
        (address token0,) = sortTokens(tokenA, tokenB);
        (uint reserve0, uint reserve1,) = IUniswapV2Pair(pairFor(factory, tokenA, tokenB)).getReserves();
        (reserveA, reserveB) = tokenA == token0 ? (reserve0, reserve1) : (reserve1, reserve0);
    }
```

Esta función devuelve las reservas de los dos tokens que tiene el intercambio de pares. Tenga en cuenta que puede recibir los tokens en cualquier orden y ordenarlos para uso interno.

```solidity
    // dada una cantidad de un activo y las reservas de un par, devuelve una cantidad equivalente del otro activo
    function quote(uint amountA, uint reserveA, uint reserveB) internal pure returns (uint amountB) {
        require(amountA > 0, 'UniswapV2Library: INSUFFICIENT_AMOUNT');
        require(reserveA > 0 && reserveB > 0, 'UniswapV2Library: INSUFFICIENT_LIQUIDITY');
        amountB = amountA.mul(reserveB) / reserveA;
    }
```

Esta función le da la cantidad de token B que obtendrá a cambio del token A si no hay ningún cargo involucrado. Este cálculo tiene en cuenta que la transferencia cambia el tipo de cambio.

```solidity
    // dada una cantidad de entrada de un activo y las reservas de un par, devuelve la cantidad máxima de salida del otro activo
    function getAmountOut(uint amountIn, uint reserveIn, uint reserveOut) internal pure returns (uint amountOut) {
```

La función `quote` anterior funciona muy bien si no hay ninguna tarifa para usar el intercambio de pares. Sin embargo, si hay una tarifa de cambio del 0,3 %, la cantidad que realmente obtiene es menor. Esta función calcula la cantidad después de la tarifa de cambio.

```solidity

        require(amountIn > 0, 'UniswapV2Library: INSUFFICIENT_INPUT_AMOUNT');
        require(reserveIn > 0 && reserveOut > 0, 'UniswapV2Library: INSUFFICIENT_LIQUIDITY');
        uint amountInWithFee = amountIn.mul(997);
        uint numerator = amountInWithFee.mul(reserveOut);
        uint denominator = reserveIn.mul(1000).add(amountInWithFee);
        amountOut = numerator / denominator;
    }
```

Solidity no maneja las fracciones de forma nativa, por lo que no podemos multiplicar la cantidad por 0,997. En su lugar, multiplicamos el numerador por 997 y el denominador por 1000, logrando el mismo efecto.

```solidity
    // dada una cantidad de salida de un activo y las reservas de un par, devuelve la cantidad de entrada requerida del otro activo
    function getAmountIn(uint amountOut, uint reserveIn, uint reserveOut) internal pure returns (uint amountIn) {
        require(amountOut > 0, 'UniswapV2Library: INSUFFICIENT_OUTPUT_AMOUNT');
        require(reserveIn > 0 && reserveOut > 0, 'UniswapV2Library: INSUFFICIENT_LIQUIDITY');
        uint numerator = reserveIn.mul(amountOut).mul(1000);
        uint denominator = reserveOut.sub(amountOut).mul(997);
        amountIn = (numerator / denominator).add(1);
    }
```

Esta función hace más o menos lo mismo, pero obtiene la cantidad de salida y proporciona la entrada.

```solidity

    // realiza cálculos encadenados de getAmountOut en cualquier número de pares
    function getAmountsOut(address factory, uint amountIn, address[] memory path) internal view returns (uint[] memory amounts) {
        require(path.length >= 2, 'UniswapV2Library: INVALID_PATH');
        amounts = new uint[](path.length);
        amounts[0] = amountIn;
        for (uint i; i < path.length - 1; i++) {
            (uint reserveIn, uint reserveOut) = getReserves(factory, path[i], path[i + 1]);
            amounts[i + 1] = getAmountOut(amounts[i], reserveIn, reserveOut);
        }
    }

    // realiza cálculos encadenados de getAmountIn en cualquier número de pares
    function getAmountsIn(address factory, uint amountOut, address[] memory path) internal view returns (uint[] memory amounts) {
        require(path.length >= 2, 'UniswapV2Library: INVALID_PATH');
        amounts = new uint[](path.length);
        amounts[amounts.length - 1] = amountOut;
        for (uint i = path.length - 1; i > 0; i--) {
            (uint reserveIn, uint reserveOut) = getReserves(factory, path[i - 1], path[i]);
            amounts[i - 1] = getAmountIn(amounts[i], reserveIn, reserveOut);
        }
    }
}
```

Estas dos funciones manejan la identificación de los valores cuando es necesario pasar por varios intercambios de pares.

### TransferHelper {#transfer-helper}

[Esta biblioteca](https://github.com/Uniswap/uniswap-lib/blob/master/contracts/libraries/TransferHelper.sol) agrega comprobaciones de éxito en torno a las transferencias de ERC-20 y Ethereum para tratar una reversión y la devolución de un valor `false` de la misma manera.

```solidity
// SPDX-License-Identifier: GPL-3.0-or-later

pragma solidity >=0.6.0;

// métodos de ayuda para interactuar con tokens ERC20 y enviar ETH que no devuelven consistentemente verdadero/falso
library TransferHelper {
    function safeApprove(
        address token,
        address to,
        uint256 value
    ) internal {
        // bytes4(keccak256(bytes('approve(address,uint256)')));
        (bool success, bytes memory data) = token.call(abi.encodeWithSelector(0x095ea7b3, to, value));

```

Podemos llamar a un contrato diferente de una de dos maneras:

- Usar una definición de interfaz para crear una llamada de función
- Utilice la [interfaz binaria de aplicación (ABI)](https://docs.soliditylang.org/en/v0.8.3/abi-spec.html) "manualmente" para crear la llamada. Esto es lo que el autor del código decidió hacer.

```solidity
        require(
            success && (data.length == 0 || abi.decode(data, (bool))),
            'TransferHelper::safeApprove: approve failed'
        );
    }
```

En aras de la compatibilidad con versiones anteriores de tokens creados antes del estándar ERC-20, una llamada a ERC-20 puede fallar, ya sea revirtiendo (en cuyo caso `success` es `false`) o teniendo éxito y devolviendo un valor `false` (en cuyo caso hay datos de salida, y si los decodifica como un booleano, obtiene `false`).

```solidity


    function safeTransfer(
        address token,
        address to,
        uint256 value
    ) internal {
        // bytes4(keccak256(bytes('transfer(address,uint256)')));
        (bool success, bytes memory data) = token.call(abi.encodeWithSelector(0xa9059cbb, to, value));
        require(
            success && (data.length == 0 || abi.decode(data, (bool))),
            'TransferHelper::safeTransfer: transfer failed'
        );
    }
```

Esta función implementa [la funcionalidad de transferencia de ERC-20](https://eips.ethereum.org/EIPS/eip-20#transfer), que permite a una cuenta gastar la autorización proporcionada por una cuenta diferente.

```solidity

    function safeTransferFrom(
        address token,
        address from,
        address to,
        uint256 value
    ) internal {
        // bytes4(keccak256(bytes('transferFrom(address,address,uint256)')));
        (bool success, bytes memory data) = token.call(abi.encodeWithSelector(0x23b872dd, from, to, value));
        require(
            success && (data.length == 0 || abi.decode(data, (bool))),
            'TransferHelper::transferFrom: transferFrom failed'
        );
    }
```

Esta función implementa la [funcionalidad transferFrom de ERC-20](https://eips.ethereum.org/EIPS/eip-20#transferfrom), que permite a una cuenta gastar la autorización proporcionada por una cuenta diferente.

```solidity

    function safeTransferETH(address to, uint256 value) internal {
        (bool success, ) = to.call{value: value}(new bytes(0));
        require(success, 'TransferHelper::safeTransferETH: ETH transfer failed');
    }
}
```

Esta función transfiere ether a una cuenta. Cualquier llamada a un contrato diferente puede intentar enviar ether. Como no necesitamos llamar a ninguna función, no enviamos ningún dato con la llamada.

## Conclusión {#conclusion}

Este es un artículo largo de unas 50 páginas. Si ha llegado hasta aquí, ¡enhorabuena! Esperamos que a estas alturas haya entendido las consideraciones a la hora de escribir una aplicación real (a diferencia de los programas de ejemplo cortos) y esté mejor preparado para escribir contratos para sus propios casos de uso.

Ahora, vaya y escriba algo útil y sorpréndanos.

[Vea aquí más de mi trabajo](https://cryptodocguy.pro/).
