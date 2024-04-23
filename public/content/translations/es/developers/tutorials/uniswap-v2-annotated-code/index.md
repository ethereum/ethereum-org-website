---
title: "Un recorrido por el contrato Uniswap-v2"
description: '¿Cómo funciona el contrato Uniswap-v2? ¿Por qué esta escrito de esta manera?'
author: Ori Pomerantz
tags:
  - "solidity"
skill: intermediate
published: 2021-05-01
lang: es
---

## Introducción {#introduction}

[Uniswap V2](https://uniswap.org/whitepaper.pdf) puede crear un mercado de intercambio entre dos tókenes ERC-20 cualquiera. En este artículo vamos a revisar el código fuente de los contratos que implementan este protocolo y ver por qué están escritos de esta manera.

### ¿Qué hace Uniswap? {#what-does-uniswap-do}

Básicamente hay dos tipos de usuario: los proveedores de liquidez y los que compran y venden.

Los _proveedores de liquidez_ proporcionan la reserva con los dos tókenes que se pueden intercambiar (los llamaremos **Token0** y **Token1**). A cambio, estos reciben un tercer token que representa la propiedad parcial de la reserva, llamado _token de liquidez_.

Los _traders_ envían un tipo de token al grupo y reciben el otro (por ejemplo, envían un **Token0** y reciben un **Token1**) del grupo proporcionado por los proveedores de liquidez. El tipo de cambio viene determinado por el número relativo del **Token0** y del **Token1** que tiene el grupo. Además, la reserva toma un pequeño porcentaje como recompensa para la reserva de liquidez.

Cuando los proveedores de liquidez quieren recuperar sus activos, pueden quemar los tókenes de la reserva y así recuperar sus tókenes, incluyendo su parte de la recompensa.

[Haga clic aquí para ver una descripción completa](https://docs.uniswap.org/contracts/v2/concepts/core-concepts/swaps/).

### ¿Por qué V2? ¿Por qué no V3? {#why-v2}

[Uniswap V3](https://uniswap.org/whitepaper-v3.pdf) es una actualización mucho más complicada que la V2. Es más fácil aprender la V2 primero y luego pasar a la V3.

### Contratos Principales vs Contratos Periféricos {#contract-types}

Uniswap v2 se divide en dos componentes: uno principal y otro periférico. Esta división permite que los contratos principales —que guardan los activos— y, por lo tanto _tienen_ que ser seguros, simples y fáciles de auditar. Toda la funcionalidad adicional que necesitan los agentes pueden proporcionarla los contratos periféricos.

## Flujos de control y de datos {#flows}

Este es el flujo de datos y de control que se produce cuando se realizan las tres acciones principales de Uniswap:

1. Intercambio entre diferentes tókenes
2. Aporte liquidez al mercado, y será recompensado con el intercambio de un par de tókenes de liquidez ERC-20
3. Queme los tókenes de liquidez ERC-20, y recupere los tókenes ERC-20 de intercambio de par permite a los agentes que intercambien.

### Intercambiar {#swap-flow}

Este es el flujo más común, utilizado por los agentes:

#### Solicitante {#caller}

1. Proporciona a la cuenta periférica una asignación en el importe por canjear.
2. Activar una de las muchas funciones de intercambio de los contratos periféricos (que depende de si hay ETH involucrados o no, si el trader especifica la cantidad de tókenes por depositar, o la cantidad de tókenes por recuperar, etc.). Cada función de intercambio acepta una `ruto`, una matriz de intercambios por la que pasar.

#### En el contrato periférico (UniswapV2Router02.sol) {#in-the-periphery-contract-uniswapv2router02-sol}

3. Identifique, durante el proceso, las cantidades que se necesitan negociar en cada intercambio.
4. Se repite por el camino. Por cada intercambio producido durante el proceso, se envia el token de entrada, y luego se activa la función de `intercambio`. En la mayoría de los casos, la dirección de destino para los tókenes es el siguiente par en la ruta. En el intercambio final, es la dirección proporcionada por el agente.

#### En el contrato principal (UniswapV2Pair.sol) {#in-the-core-contract-uniswapv2pairsol-2}

5. Verifique que no se está estafando el contrato principal y que puede mantener la suficiente liquidez despúes del intercambio.
6. Compruebe cuántos tókenes adicionales tiene, además de las reservas conocidas. Esa cantidad, es el numero de tókenes de entrada recibidos para intercambiar.
7. Envíe los tókenes de salida al destino.
8. Active `_update` para actualizar la cantidad de reserva

#### Retomando los contratos periféricos (UniswapV2Router02.sol) {#back-in-the-periphery-contract-uniswapv2router02-sol}

9. Realice cualquier limpieza necesaria (por ejemplo, quemar tókenes WETH para recuperar ETH para enviar al comprador o vendedor).

### Añadir liquidez {#add-liquidity-flow}

#### Llamar {#caller-2}

1. Proporcione a las cuentas periféricas una cantidad adicional para añadirla a la reserva de liquidez.
2. Active una de las funciones `addLiquidity` del contrato periférico.

#### En el contrato periférico (UniswapV2Router02.sol) {#in-the-periphery-contract-uniswapv2router02sol-2}

3. Cree un nuevo par de intercambio si es necesario.
4. Si hay un par de intercambio existente, calcule la cantidad de tókenes que debe añadir. Se supone que este valor es idéntico para ambos tókenes, es decir, la misma relación entre tókenes nuevos y existentes.
5. Compruebe si los importes son aceptables (los solicitantes pueden especificar un importe mínimo, por debajo del cual prefieren no añadir liquidez).
6. Active el contrato principal.

#### En el contrato principal (UniswapV2Pair.sol) {#in-the-core-contract-uniswapv2pairsol-2}

7. Acumule tókenes de liquidez y envíelos al solicitante.
8. Llamar `_update` para actualizar la cantidad de reserva

### Suprimir la liquidez {#remove-liquidity-flow}

#### Llamador {#caller-3}

1. Proporcione a la cuenta periférica una cantidad de tókenes de liquidez para quemar a cambio de los tókenes subyacentes.
2. Active una de las funciones `removeLiquidity` del contrato periférico.

#### En el contrato periférico (UniswapV2Router02.sol) {#in-the-periphery-contract-uniswapv2router02sol-3}

3. Envíe los tókenes de liquidez al intercambio de par.

#### En el contrato principal (UniswapV2Pair.sol) {#in-the-core-contract-uniswapv2pairsol-3}

4. Envíe a la dirección de destino los tókenes subyacentes proporcionales a los tókenes quemados. Por ejemplo, si hay 1.000 tókenes A en la reserva, 500 tókenes B y 90 tókenes de liquidez, y recibimos 9 tókenes para quemar, estamos quemando el 10 % de los tókenes de liquidez, por lo tanto, enviamos al usuario 100 tókenes A y 50 tókenes B.
5. Queme los tókenes de liquidez.
6. Llmar `_update` para actualizar el monto de reserva

## Los contratos principales {#core-contracts}

Estos son los contratos seguros que mantienen la liquidez.

### UniswapV2Pair.sol {#UniswapV2Pair}

[Este contrato](https://github.com/Uniswap/uniswap-v2-core/blob/master/contracts/UniswapV2Pair.sol) implementa una reserva real que intercambia tókenes. Esta es la principal función de Uniswap.

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

Estas son todas las interfaces que el contrato necesita conocer, ya sea porque el contrato las implementa (`IUniswapV2Pair` and `UniswapV2ERC20`) o porque activa los contratos que las implementan.

```solidity
contract UniswapV2Pair is IUniswapV2Pair, UniswapV2ERC20 {
```

Este contrado hereda de `UniswapV2ERC20`, que proporciona las funciones de ERC-20 para los tókenes de liquidez.

```solidity
    using SafeMath  for uint;
```

La [biblioteca SafeMath](https://docs.openzeppelin.com/contracts/2.x/api/math) se usa para evitar excedentes y faltantes. Esto es importante, porque de otra manera podría darse una situación donde un valor debería ser `-1`, pero en cambio es `2^256-1`.

```solidity
    using UQ112x112 for uint224;
```

Muchos de los cálculos en el contrato de reserva requieren fracciones. Sin embargo, la EVM no admite fracciones. La solución que encontró Uniswap es usar valores de 224 bits, con 112 bits para la parte íntegra y 112 bits para las fracciones. Entonces `1.0` se representa como `2^112`, `1,5` se representa como `2^112 + 2^111`, etc.

Más detalles sobre esta biblioteca están disponibles [ en el siguiente documento](#FixedPoint).

#### Variables {#pair-vars}

```solidity
    uint public constant MINIMUM_LIQUIDITY = 10**3;
```

Para evitar casos de división entre cero, hay un número mínimo de tókenes de liquidez que siempre existe (aunque son propiedad de la cuenta cero). Ese número es **LIQUIDEZ_MINIMA** mil.

```solidity
    bytes4 private constant SELECTOR = bytes4(keccak256(bytes('transfer(address,uint256)')));
```

Este es el seleccionador de ABI para la función de transferencia de ERC-20. Se usa para transferir tókenes ERC-20 en dos cuentas de token.

```solidity
    address public factory;
```

Este es el contrato de fábrica que crea esta reserva. Cada reserva es un intercambio entre dos tókenes ERC-20, la fábrica es el punto central que conecta todas estas reservas.

```solidity
    address public token0;
    address public token1;
```

Existen direcciones de los contratos para los dos tipos de tókenes ERC-20 que esta reserva puede intercambiar.

```solidity
    uint112 private reserve0;           // uses single storage slot, accessible via getReserves
    uint112 private reserve1;           // uses single storage slot, accessible via getReserves
```

Los fondos que tiene la reserva para cada tipo de token. Asumimos que los dos representan el mismo monto de valor y por ello cada token0 vale reserve1/reserve0 token1's.

```solidity
    uint32  private blockTimestampLast; // uses single storage slot, accessible via getReserves
```

La marca de tiempo para el último bloque en el que el intercambio ocurre se usa para rastrear los tipos de cambio a través del tiempo.

Uno de los gastos de gas más grandes de los contratos Ethereum es el almacenamiento, que persiste de una activación del contrato a la siguiente. Cada celda de almacenamiento mide 256 bits. Por lo tanto, tres variables, `reserve0`, `reserve1` y `blockTimestampLast` se asignan de tal manera que un único valor de almacenamiento puede incluir las tres (112 112 32=256).

```solidity
    uint public price0CumulativeLast;
    uint public price1CumulativeLast;
```

Estas variables mantienen los costes acumulados para cada token (cada uno en término del otro). Se pueden utilizar para calcular el tipo de cambio medio durante un periodo de tiempo.

```solidity
    uint public kLast; // reserve0 * reserve1, as of immediately after the most recent liquidity event
```

La manera en que el intercambio de pares decide la tasa de cambio entre token0 y token1 consiste en mantener el múltiplo de las dos reservas constante durante las transacciones. Este valor es `kLast`. Cambia cuando un proveedor de liquidez deposita o retira tókenes, e incrementa ligeramente por la comisión del mercado del 0,3%.

He aquí un ejemplo. Tenga en cuenta que, en aras de la simplicidad, la tabla solo tiene tres dígitos tras el punto decimal, e ignoramos la comisión de negociación del 0,3 %, por eso los números no son precisos.

| Evento                                            |  reserve0 |  reserve1 | reserve0 \* reserve1 | Tipo de cambio medio (token1 / token0) |
| ------------------------------------------------- | ---------:| ---------:| ----------------------:| -------------------------------------- |
| Configuración inicial                             | 1.000,000 | 1.000,000 |              1.000,000 |                                        |
| Agente A intercambia 50 token0 por 47,619 token1  | 1.050,000 |   952.381 |              1.000.000 | 0,952                                  |
| Agente B intercambia 10 token0 por 8,984 token1   | 1.060,000 |   943,396 |              1.000.000 | 0,898                                  |
| Agente C intercambia 40 token0 por 34,305 token1  | 1.100,000 |   909,090 |              1,000,000 | 0,858                                  |
| Agente D intercambia 100 token1 por 109,01 token0 |   990,990 | 1.009,090 |              1.000.000 | 0,917                                  |
| Agente E intercambia 10 token0 por 10,079 token1  | 1.000,990 |   999.010 |              1,000,000 | 1.008                                  |

Al proveer los agentes más token0, el valor relativo del token1 incrementa y vice versa, en función de la oferta y demanda.

#### Bloqueo {#pair-lock}

```solidity
    uint private unlocked = 1;
```

Hay una clase de vulnerabilidades de seguridad que están basadas en [abusos de reentrada](https://medium.com/coinmonks/ethernaut-lvl-10-re-entrancy-walkthrough-how-to-abuse-execution-ordering-and-reproduce-the-dao-7ec88b912c14). Uniswap necesita transferir tókenes ERC-20 arbitrarios, lo que significa activar los contratos ERC-20 que podrían intentar abusar del mercado Uniswap que los activa. Al tener una variable `unlocked` como parte del contrato, podemos evitar la activación de las funciones mientras se están ejecutando (dentro de la misma transacción).

```solidity
    modifier lock() {
```

Esta función es un [ modificador](https://docs.soliditylang.org/en/v0.8.3/contracts.html#function-modifiers), una función que se envuelve alrededor de otra función para cambiar de alguna manera su comportamiento.

```solidity
        require(unlocked == 1, 'UniswapV2: LOCKED');
        unlocked = 0;
```

Si `unlocked` es igual a uno, configúrelo a cero. Si ya es cero, revierta la activación y trúnquela.

```solidity
        _;
```

En un modificador `_;` es la función de activación original (con todos los parámetros). Esto significa que la activación de la función solo ocurre si la variable `unlocked` tenía asignado 1 cuando se activó, y mientras se ejecuta, el valor de `unlocked` es 0.

```solidity
        unlocked = 1;
    }
```

Después de que la función principal retorne, libere el bloqueo.

#### Funciones variadas {#pair-misc}

```solidity
    function getReserves() public view returns (uint112 _reserve0, uint112 _reserve1, uint32 _blockTimestampLast) {
        _reserve0 = reserve0;
        _reserve1 = reserve1;
        _blockTimestampLast = blockTimestampLast;
    }
```

Esta función proporciona a los solicitantes el estado actual del intercambio. Nótese que las funciones de Solidity [pueden proporcionar valores múltiples](https://docs.soliditylang.org/en/v0.8.3/contracts.html#returning-multiple-values).

```solidity
    function _safeTransfer(address token, address to, uint value) private {
        (bool success, bytes memory data) = token.call(abi.encodeWithSelector(SELECTOR, to, value));
```

Esta función interna transfiere una cantidad de tókenes ERC-20 desde el intercambio a alguien más. `SELECTOR` especifica que la función que estamos activando es `transfer(address,uint)` (véase la definición arriba).

Para evitar el tener que importar una interfaz para la función del token, creamos «manualmente» la activación usando una de las [ funciones de ABI](https://docs.soliditylang.org/en/v0.8.3/units-and-global-variables.html#abi-encoding-and-decoding-functions).

```solidity
        require(success && (data.length == 0 || abi.decode(data, (bool))), 'UniswapV2: TRANSFER_FAILED');
    }
```

Hay dos maneras en las que una tranferencia ERC-20 puede informar de un fallo:

1. Revertir. Si la activación de un contrato externo se revierte, el valor de retorno booleano es `false`.
2. Termina de forma normal, pero informa de un fracaso. En ese caso, el buffer de valor devuelto tiene una longitud diferente de cero, y cuando se decodifica como un valor booleano es `false`.

Si ocurre alguna de estas condiciones, reviértala.

#### Eventos {#pair-events}

```solidity
    event Mint(address indexed sender, uint amount0, uint amount1);
    event Burn(address indexed sender, uint amount0, uint amount1, address indexed to);
```

Estos dos eventos se emiten cuando un proveedor de liquidez deposita liquidez (`Mint`) o retira la liquidez (`Quemar`). En cualquier caso, los montos de Token0 y Token1 que se depositan o retiran son parte del evento, así como la identidad de la cuenta que los activó (`sender`). En caso de retirada, el evento además incluye al objetivo que recibió los tókenes (`to`) que puede no ser el mismo que el emisor.

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

El evento se emite cuando un agente intercambia un token por otro. Nuevamente, el emisor y el destinatario pueden no coincidir. Cada token puede ser enviado al Exchange o recibido desde allí.

```solidity
    event Sync(uint112 reserve0, uint112 reserve1);
```

Finalmente, `Sync` se emite cada vez que se añaden o retiran tókenes, sin importar la razón, para proveer la información de reserva más actualizada (y por lo tanto el tipo de cambio).

#### Funciones de configuración {#pair-setup}

Se supone que estas funciones se llaman una vez cuando se establece el nuevo par de intercambio.

```solidity
    constructor() public {
        factory = msg.sender;
    }
```

El constructor se asegura de que mantengamos el seguimiento de la dirección de la fábrica que creó el par. `initialize` y la tasa de fábrica (si existe) requieren esta información.

```solidity
    // called once by the factory at time of deployment
    function initialize(address _token0, address _token1) external {
        require(msg.sender == factory, 'UniswapV2: FORBIDDEN'); // sufficient check
        token0 = _token0;
        token1 = _token1;
    }
```

Esta función le permite a la fábrica (y sólo a la fábrica) especificar los dos tókenes ERC-20 que este par intercambiará.

#### Funciones de actualización interna {#pair-update-internal}

##### \_update

```solidity
    // update reserves and, on the first call per block, price accumulators
    function _update(uint balance0, uint balance1, uint112 _reserve0, uint112 _reserve1) private {
```

Se realiza esta función cada vez que se depositan o retiran tókenes.

```solidity
        require(balance0 <= uint112(-1) && balance1 <= uint112(-1), 'UniswapV2: OVERFLOW');
```

Si el balance0 o el balance1 (uint256) es mayor que uint112(-1) (=2^112-1) (por lo que overflows & se vuelve a 0 cuando se convierte en uint112) se niegan a continuar el \_update para prevenir excedentes. Con un token normal que puede subdividirse en 10^18 unidades, esto significa que cada intercambio está limitado a alrededor de 5,1\*10^15 de cada token. Hasta ahora no ha presentado ningún problema.

```solidity
        uint32 blockTimestamp = uint32(block.timestamp % 2**32);
        uint32 timeElapsed = blockTimestamp - blockTimestampLast; // overflow is desired
        if (timeElapsed > 0 && _reserve0 != 0 && _reserve1 != 0) {
```

Si el tiempo transcurrido no es cero, significa que somos la primera transacción de cambio en este bloque. En ese caso, tenemos que actualizar los acumuladores de costes.

```solidity
            // * never overflows, and + overflow is desired
            price0CumulativeLast += uint(UQ112x112.encode(_reserve1).uqdiv(_reserve0)) * timeElapsed;
            price1CumulativeLast += uint(UQ112x112.encode(_reserve0).uqdiv(_reserve1)) * timeElapsed;
        }
```

Cada acumulador de coste se actualiza con el último costo (reserva del otro token/reserva de este token) por el tiempo transcurrido en segundos. Para obtener el precio medio, se lee el precio acumulado en dos puntos en el tiempo y se divide entre la diferencia de tiempo entre ellos. Por ejemplo, asumir esta secuencia de eventos:

| Evento                                                         |  reserva0 |  reserva1 | marca de tiempo | Tipo de cambio marginal (reserve1 / reserve0) |         price0CumulativeLast |
| -------------------------------------------------------------- | ---------:| ---------:| --------------- | ---------------------------------------------:| ----------------------------:|
| Configuración Inicial                                          | 1.000,000 | 1.000,000 | 5.000           |                                         1,000 |                            0 |
| Agente A deposita 50 token0 y obtiene de vuelta 47,619 token 1 | 1.050,000 |   952,381 | 5.020           |                                         0,907 |                           20 |
| Agente B deposita 10 token0 y obtiene de vuelta 8,984 token1   | 1.060,000 |   943,396 | 5.030           |                                         0,890 |       20+10\*0,907 = 29,07 |
| Agente C deposita 40 token0 y obyiene de vuelta 34,305 token1  | 1.100,000 |   909,090 | 5.100           |                                         0,826 |    29,07+70\*0,890 = 91,37 |
| Agente D deposita 100 token1 y obtiene de vuelta 109,01 token0 |   990,990 | 1.009,090 | 5.110           |                                         1,018 |    91,37+10\*0,826 = 99,63 |
| Agente E deposita 10 token0 y obtiene de vuelta 10,079 token1  | 1.000,990 |   999,010 | 5.150           |                                         0,998 | 99,63+40\*1,1018 = 143,702 |

Pongamos que queremos calcular el precio medio de **Token0** entre entre la marca de tiempo 5.030 y 5.150. La diferencia en el valor de `price0Cumulative` es 143,702-29,07=114,632. Este es el promedio a o largo de dos minutos (120 segundos). Por lo tanto, el precio medio es de 114,632/120 = 0,955.

Este cálculo de precios es la razón por la que necesitamos conocer los antiguos tamaños de reserva.

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

En Uniswap 2.0 los agentes pagan una comisión del 0,30 % por usar el mercado. La mayoría de esas comisiones (el 0,25 % de la operación) siempre va a los proveedores de liquidez. El 0,05 % restante puede ir a los proveedores de liquidez o a una dirección especificada por la fábrica como una comisión del protocolo, el cual le paga a Uniswap por el esfuerzo de desarrollo.

Para reducir estos cálculos (y por lo tanto los costes de gas), esta comisión sólo se calcula cuando se añade o elimina la liquidez de la reserva, en lugar de hacerlo en cada transacción.

```solidity
        address feeTo = IUniswapV2Factory(factory).feeTo();
        feeOn = feeTo != address(0);
```

Lea el destino de las comisiones de la fábrica. Si es cero, entonces no hay ninguna comisión de protocolo y no hay necesidad de calcularla.

```solidity
        uint _kLast = kLast; // gas savings
```

La variable del estado `kLast` se encuentra en el almacenamiento, por lo que tendrá un valor entre diferentes activaciones al contrato. El acceso al almacenamiento es mucho más caro que el acceso a la memoria volátil que se libera cuando finaliza la activación de función al contrato, por lo que utilizamos una variable interna para ahorrar gas.

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

Si hay nueva liquidez sobre la que cobrar una tasa de protocolo. Puede ver la función raíz cuadrada [más adelante en este articulo](#Math).

```solidity
                    uint numerator = totalSupply.mul(rootK.sub(rootKLast));
                    uint denominator = rootK.mul(5).add(rootKLast);
                    uint liquidity = numerator / denominator;
```

Este cálculo complicado de las comisiones se explica en [el informe](https://uniswap.org/whitepaper.pdf) en la página 5. Sabemos que entre el tiempo en que se calculó `kLast` y el presente no ha añadido ni eliminado ninguna liquidez (porque ejecutamos este cálculo cada vez que se añade o elimina liquidez, antes de que cambie realmente), por eso cualquier cambio en `reserve0 * reserve1` tiene que provenir de las comisiones de transacción (sin ellas mantendremos `reserve0 * reserve1` constante).

```solidity
                    if (liquidity > 0) _mint(feeTo, liquidity);
                }
            }
```

Use la función `UniswapV2ERC20._mint` para crear los tókenes de liquidez adicionales y dárselos a la dirección `feeTo`.

```solidity
        } else if (_kLast != 0) {
            kLast = 0;
        }
    }
```

Si no hay tasa establecida `kLast` a cero (en caso de ser otro valor). Cuando se escribió este contrato, había una función de [reembolso de gas](https://eips.ethereum.org/EIPS/eip-3298) que animaba a los contratos a reducir el tamaño total del estado de Ethereum al eliminar el almacenamiento que no necesitaban. Este código recibe ese reembolso cuando sea posible.

#### Funciones accesibles externamente {#pair-external}

Tenga en cuenta que mientras que cualquier transacción o contrato _puede_ activar estas funciones, están diseñadas para activarse desde el contrato de la periferia. Si las activa directamente, no podrá hacer trampas al intercambio de pares, pero podrá perder valor por un error.

##### mint (acuñar)

```solidity
    // this low-level function should be called from a contract which performs important safety checks
    function mint(address to) external lock returns (uint liquidity) {
```

Esta función se activa cuando un proveedor de liquidez añade liquidez a la reserva. Se acuñan tókenes de liquidez adicionales como recompensa. Debe activarse desde un [contrato de periferia](#UniswapV2Router02) que lo activa después de añadir la liquidez en la misma transacción (para que nadie más pueda presentar una transacción que reclame la nueva liquidez antes que el dueño legítimo).

```solidity
        (uint112 _reserve0, uint112 _reserve1,) = getReserves(); // gas savings
```

Esta es la manera de leer los resultados de una función de Solidity que devuelve múltiples valores. Descartamos los últimos valores devueltos, la marca de tiempo del bloque, porque no los necesitamos.

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

Calcule las comisiones del protocolo por cobrar, si las hay, y acuñe los tókenes de liquidez respectivos. Debido a que los parámetros de `_mintFee` son los valores de reserva antiguos, la tasa se calcula con precisión basándose solo en los cambios de la reserva debido a las tasas.

```solidity
        uint _totalSupply = totalSupply; // gas savings, must be defined here since totalSupply can update in _mintFee
        if (_totalSupply == 0) {
            liquidity = Math.sqrt(amount0.mul(amount1)).sub(MINIMUM_LIQUIDITY);
           _mint(address(0), MINIMUM_LIQUIDITY); // permanently lock the first MINIMUM_LIQUIDITY tokens
```

Si este es el primer depósito, cree tókenes de `MINIMUM_LIQUIDITY` y envíelos a la dirección cero para bloquearlos. Estos nunca se pueden canjear, lo que significa que la reserva nunca se vaciará completamente (esto nos salva de la división de cero en algunos lugares). El valor de `MINIMUM_LIQUIDITY` es un millar, que considerando que la mayoría de ERC-20 están subdivididos en unidades de 10^-18'th de un token, como ETH se divide en wei, es 10^-15 al valor de un solo token. No es un coste elevado.

En el momento del primer depósito no conocemos el valor relativo de los dos tókenes, así que simplemente multiplicamos las cantidades y tomamos una raíz cuadrada, suponiendo que el depósito nos proporciona el mismo valor en ambos tókenes.

Podemos confiar en esto, porque es de interés para el depositante proporcionar el mismo valor, para evitar perder valor debido a arbitrajes. Pongamos que el valor de nuestros dos tókenes es idéntico, pero nuestro depositante ha depositado 4 veces más del **Token1** que del **Token0**. Un agente puede usar el hecho de que el intercambio de pares piensa que el **Token0** es más valioso para extraer valor de él.

| Evento                                                         | reserva0 | reserva1 | reserva0 \* reserva1 | Valor de la reserva (reserve0 + reserve1) |
| -------------------------------------------------------------- | --------:| --------:| ----------------------:| -----------------------------------------:|
| Configuración inicial                                          |        8 |       32 |                    256 |                                        40 |
| El agente depósita 8 tókenes **Token0**, obtiene 16 **Token1** |       16 |       16 |                    256 |                                        32 |

Como puede ver, el agente ganó 8 tókenes extra, que provienen de una reducción en el valor de la reserva, lastimando al depositante que los posee.

```solidity
        } else {
            liquidity = Math.min(amount0.mul(_totalSupply) / _reserve0, amount1.mul(_totalSupply) / _reserve1);
```

Con cada depósito posterior ya conocemos el tipo de cambio entre ambos activos, y esperamos que los proveedores de liquidez proporcionen el mismo valor en ambos. Si no lo hacen, les damos tókenes de liquidez en función del valor menor que proporcionaron como castigo.

Ya sea el depósito inicial o uno posterior, el número de tókenes de liquidez que proporcionamos es igual a la raíz cuadrada del cambio en `reserve0*reserve1` y el valor del token de liquidez no cambia (a menos que obtengamos un depósito que no tenga los mismos valores de ambos tipos, en cuyo caso la «multa» se comparte). Este es otro ejemplo con dos tokens que tienen el mismo valor. con tres buenos depósitos y uno malo (depósito de un solo tipo de token, por lo que no produce ningún token de liquidez).

| Evento                     | reserve0 | reserve1 | reserve0 \* reserve1 | Valor de la reserva (reserve0 + reserve1) | Tókenes de liquidez acuñados para este depósito | Tókenes de liquidez totales | valor de cada token de liquidez |
| -------------------------- | --------:| --------:| ----------------------:| -----------------------------------------:| -----------------------------------------------:| ---------------------------:| -------------------------------:|
| Configuración inicial      |    8,000 |    8,000 |                     64 |                                    16,000 |                                               8 |                           8 |                           2,000 |
| Depósito 4 para cada tipo  |   12,000 |   12,000 |                    144 |                                    24,000 |                                               4 |                          12 |                           2,000 |
| Depósito 2 para cada tipo  |   14,000 |   14,000 |                    196 |                                    28,000 |                                               2 |                          14 |                           2,000 |
| Depósito de valor desigual |   18,000 |   14,000 |                    252 |                                    32,000 |                                               0 |                          14 |                          ~2,286 |
| Después del arbitraje      |  ~15,874 |  ~15,874 |                    252 |                                   ~31,748 |                                               0 |                          14 |                          ~2,267 |

```solidity
        }
        require(liquidity > 0, 'UniswapV2: INSUFFICIENT_LIQUIDITY_MINTED');
        _mint(to, liquidity);
```

Use la función `UniswapV2ERC20._mint` para crear realmente la liquidez adicional de tókenes y dárselos a la cuenta correcta.

```solidity

        _update(balance0, balance1, _reserve0, _reserve1);
        if (feeOn) kLast = uint(reserve0).mul(reserve1); // reserve0 and reserve1 are up-to-date
        emit Mint(msg.sender, amount0, amount1);
    }
```

Actualice las variables de estado (`reserve0`, `reserve1`, y si es necesario `kLast`) y emita el evento apropiado.

##### burn (quemar)

```solidity
    // this low-level function should be called from a contract which performs important safety checks
    function burn(address to) external lock returns (uint amount0, uint amount1) {
```

Esta función se activa cuando se retira liquidez y es preciso «quemar» los tókenes de liquidez apropiados. También debería activarse [desde una cuenta de la periferia](#UniswapV2Router02).

```solidity
        (uint112 _reserve0, uint112 _reserve1,) = getReserves(); // gas savings
        address _token0 = token0;                                // gas savings
        address _token1 = token1;                                // gas savings
        uint balance0 = IERC20(_token0).balanceOf(address(this));
        uint balance1 = IERC20(_token1).balanceOf(address(this));
        uint liquidity = balanceOf[address(this)];
```

El contrato de la periferia transfirió la liquidez por quemar a este contrato antes de activarla. De esa manera sabemos cuánta liquidez quemar, y podemos asegurarnos de que se quema.

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

El resto de las funciones `burn` es una imagen espejo de la función `mint` citada anteriormente.

##### swap (intercambio)

```solidity
    // this low-level function should be called from a contract which performs important safety checks
    function swap(uint amount0Out, uint amount1Out, address to, bytes calldata data) external lock {
```

Esta función también se supone que debe activarse desde [un contrato de periferia](#UniswapV2Router02).

```solidity
        require(amount0Out > 0 || amount1Out > 0, 'UniswapV2: INSUFFICIENT_OUTPUT_AMOUNT');
        (uint112 _reserve0, uint112 _reserve1,) = getReserves(); // gas savings
        require(amount0Out < _reserve0 && amount1Out < _reserve1, 'UniswapV2: INSUFFICIENT_LIQUIDITY');

        uint balance0;
        uint balance1;
        { // scope for _token{0,1}, avoids stack too deep errors
```

Las variables locales pueden almacenarse en la memoria o, si no hay demasiadas, directamente en la pila. Si podemos limitar el número, así usaremos la pila que gaste menos gas. Si desea conocer más detalles, consulte [el protocolo, las especificaciones formales de Ethereum](https://ethereum.github.io/yellowpaper/paper.pdf), pág. 26, ecuación 298.

```solidity
            address _token0 = token0;
            address _token1 = token1;
            require(to != _token0 && to != _token1, 'UniswapV2: INVALID_TO');
            if (amount0Out > 0) _safeTransfer(_token0, to, amount0Out); // optimistically transfer tokens
            if (amount1Out > 0) _safeTransfer(_token1, to, amount1Out); // optimistically transfer tokens
```

Esta tranferencia es optimista, ya que transferimos una vez que estamos seguros de que se cumplen todas las condiciones. Esto puede hacerse en Ethereum, porque si las condiciones no se cumplen más tarde en la activación, revertimos cualquier cambio que haya creado.

```solidity
            if (data.length > 0) IUniswapV2Callee(to).uniswapV2Call(msg.sender, amount0Out, amount1Out, data);
```

Informe al receptor sobre el intercambio, si así lo solicita.

```solidity
            balance0 = IERC20(_token0).balanceOf(address(this));
            balance1 = IERC20(_token1).balanceOf(address(this));
        }
```

Obtén los saldos actuales. El contrato de la periferia nos envía los tókenes antes de llamarnos para el intercambio. Esto facilita que el contrato compruebe que no está siendo engañado, una comprobación de que _tiene_ que pasar en el contrato central (porque se nos puede activar mediante otras entidades que no sean nuestro contrato de periferia).

```solidity
        uint amount0In = balance0 > _reserve0 - amount0Out ? balance0 - (_reserve0 - amount0Out) : 0;
        uint amount1In = balance1 > _reserve1 - amount1Out ? balance1 - (_reserve1 - amount1Out) : 0;
        require(amount0In > 0 || amount1In > 0, 'UniswapV2: INSUFFICIENT_INPUT_AMOUNT');
        { // scope for reserve{0,1}Adjusted, avoids stack too deep errors
            uint balance0Adjusted = balance0.mul(1000).sub(amount0In.mul(3));
            uint balance1Adjusted = balance1.mul(1000).sub(amount1In.mul(3));
            require(balance0Adjusted.mul(balance1Adjusted) >= uint(_reserve0).mul(_reserve1).mul(1000**2), 'UniswapV2: K');
```

Esta es una comprobación para asegurarnos de que no perdemos en el intercambio. No hay ningún impedimento en el que un intercambio deba reducir `reserve0*reserve1`. Aquí es donde también garantizamos que se esté enviando una tarifa del 0,3 % en el intercambio; antes de que la comprobación verifique el valor de K, multiplicamos ambos saldos por 1.000 y le restamos las cantidades multiplicadas por 3, esto nos da que el 0,3 % (3/1.000 = 0,003 = 0,3 %) se está deduciendo del saldo antes de comparar su valor K con el valor actual de reservas K.

```solidity
        }

        _update(balance0, balance1, _reserve0, _reserve1);
        emit Swap(msg.sender, amount0In, amount1In, amount0Out, amount1Out, to);
    }
```

Actualice `reserve0` y `reserve1`y, si es necesario, los acumuladores de precio y la marca de tiempo y emita un evento.

##### Sync o Skim

Es posible que los saldos reales no estén sincronizados con las reservas que el par de intercambio cree tener. No hay forma de retirar tókenes sin el consentimiento del contrato, pero los depósitos son un asunto diferente. Una cuenta puede transferir tókenes al intercambio sin activar a `mint` o `swap`.

En ese caso hay dos soluciones:

- `sync`, actualice las reservas de los saldos actuales.
- `skim`, retier la cantidad extra. Tenga en cuenta que cualquier cuenta puede ejecutar `skim` porque no sabemos quién depositó los tókenes. Esta información se emite en un evento, no obstante a los eventos no se puede acceder desde la cadena de bloques.

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

[Este contrato](https://github.com/Uniswap/uniswap-v2-core/blob/master/contracts/UniswapV2Factory.sol) implementa pares de intercambio.

```solidity
pragma solidity =0.5.16;

import './interfaces/IUniswapV2Factory.sol';
import './UniswapV2Pair.sol';

contract UniswapV2Factory is IUniswapV2Factory {
    address public feeTo;
    address public feeToSetter;
```

Estas variables de estado son necesarias para implementar las comisiones del protocolo (ver [el papel blanco](https://uniswap.org/whitepaper.pdf), p. 5). La dirección `feeTo` acumula los tókenes de liquidez por la tarifa del protocolo, y `feeToSetter` es la dirección permitida para cambiar `feeTo` a una dirección diferente.

```solidity
    mapping(address => mapping(address => address)) public getPair;
    address[] public allPairs;
```

Estas variables registran los pares, los intercambios entre dos tipos de tókenes.

El primero, `getPair`, es un mapeo que identifica un contrato de intercambio de pares basado en los dos tókenes ERC-20 que intercambia. Los tókenes ERC-20 se identifican por las direcciones de los contratos que los implementan, por lo que las claves y el valor son direcciones en su totalidad. Para obtener la dirección del par de intercambio que le permite pasar de `tokenA` a `tokenB`, utilice `getPair[<tokenA address>][<tokenB address>]` (o al revés).

La segunda variable, `allpairs`, es una matriz que incluye todas las direcciones de los intercambios de pares creados por esta fábrica. En Ethereum no se puede repetir el contenido de un mapeo, ni obtener una lista de todas las claves, por lo que esta variable es la única forma de saber qué intercambios gestiona esta fábrica.

Aviso: la razón por la que no se pueden repetir todas las claves de un mapeo es que el almacenamiento de datos contractuales resulta _costoso_, por lo que cuanto menos utilicemos, mejor; y cuanto menos los cambiemos, mejor.  Puede crear [ mapeos que soporten la iteración](https://github.com/ethereum/dapp-bin/blob/master/library/iterable_mapping.sol), pero requieren almacenamiento extra para una lista de claves. En la mayoría de las aplicaciones no es necesario.

```solidity
    event PairCreated(address indexed token0, address indexed token1, address pair, uint);
```

Este evento se emite cuando se crea una nuevo intercambio de pares. Incluye las direcciones de los tókenes, la dirección de intercambio de pares y el número total de intercambios gestionados por la fábrica.

```solidity
    constructor(address _feeToSetter) public {
        feeToSetter = _feeToSetter;
    }
```

Lo único que hace el constructor es especificar `feeToSetter`. Las fábricas empiezan sin tasa, y sólo `feeSetter` puede cambiar eso.

```solidity
    function allPairsLength() external view returns (uint) {
        return allPairs.length;
    }
```

Esta función muestra el número de pares de intercambio.

```solidity
    function createPair(address tokenA, address tokenB) external returns (address pair) {
```

Esta es la función principal de la fábrica: crear un intercambio de pares entre dos tókenes ERC-20. Ten en cuenta que cualquiera puede ejecutar a esta función. No necesita permiso de Uniswap para crear un nuevo intercambio de pares.

```solidity
        require(tokenA != tokenB, 'UniswapV2: IDENTICAL_ADDRESSES');
        (address token0, address token1) = tokenA < tokenB ? (tokenA, tokenB) : (tokenB, tokenA);
```

Queremos que la dirección del nuevo intercambio sea de carácter concluyente, de modo que pueda calcularse de antemano fuera de la cadena (esto puede ser útil para las [transacciones de capa 2](/developers/docs/layer-2-scaling/)). Para ello necesitamos seguir un orden consistente de las direcciones de los tókenes, independientemente del orden en que los hayamos recibido, así que los ordenamos aquí.

```solidity
        require(token0 != address(0), 'UniswapV2: ZERO_ADDRESS');
        require(getPair[token0][token1] == address(0), 'UniswapV2: PAIR_EXISTS'); // single check is sufficient
```

Las reservas de liquidez más grandes son mejores que los pequeñas, porque tienen precios más estables. No queremos tener más de una reserva de liquidez por par de tókenes. Si ya existe un intercambio, no es necesario crear otro para el mismo par.

```solidity
        bytes memory bytecode = type(UniswapV2Pair).creationCode;
```

Para crear un nuevo contrato, necesitamos el código que lo crea (tanto la función que lo construye, como el código que escribe a la memoria el código de bytes de la EVM del contrato actual). Por lo general, en Solidity sólo usamos `addr = new<name of contract> (<constructor parameters>)` y el compilador se encarga de todo, pero para tener una dirección de contrato determinista necesitamos usar [el código de operación CREATE2](https://eips.ethereum.org/EIPS/eip-1014). Cuando se escribió este código, el código de operación Solidity aún no lo soportaba, por lo que era necesario obtener manualmente el código. Esto ya no es un problema, porque [Solidity ahora soporta CREATE2](https://docs.soliditylang.org/en/v0.8.3/control-structures.html#salted-contract-creations-create2).

```solidity
        bytes32 salt = keccak256(abi.encodePacked(token0, token1));
        assembly {
            pair := create2(0, add(bytecode, 32), mload(bytecode), salt)
        }
```

Cuando Solidity aún no soporta un código de operación, podemos activarlo usando el [montaje en línea](https://docs.soliditylang.org/en/v0.8.3/assembly.html).

```solidity
        IUniswapV2Pair(pair).initialize(token0, token1);
```

Active la función `initialize` para informar al intercambio cuáles son los dos tókenes que este intercambia.

```solidity
        getPair[token0][token1] = pair;
        getPair[token1][token0] = pair; // populate mapping in the reverse direction
        allPairs.push(pair);
        emit PairCreated(token0, token1, pair, allPairs.length);
    }
```

Guarde el nuevo par de información en las variables de estado y transmita un evento para informar al mundo sobre el nuevo intercambio de pares.

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

Estas dos funciones permiten a `feeSetter` controlar la tarifa receptora (si la hay) y cambia `feeSetter` a una nueva dirección.

### UniswapV2ERC20.sol {#UniswapV2ERC20}

[Este contrato](https://github.com/Uniswap/uniswap-v2-core/blob/master/contracts/UniswapV2ERC20.sol) implementa el token de liquidez ERC-20. Este es bastante similar al [contrato ERC-20 de OpenZeppelin](/developers/tutorials/erc20-annotated-code), por lo que solo explicaré la parte que es diferente, la funcionalidad `permit`.

Las transacciones en Ethereum cuestan ether (ETH), que equivale a dinero real. Si tiene tókenes ERC-20 pero no ETH, no puede enviar transacciones, por lo que no puede hacer nada con ellos. Una solución para evitar este problema son las [metatransacciones](https://docs.uniswap.org/contracts/v2/guides/smart-contract-integration/supporting-meta-transactions). El propietario de los tókenes firma una transacción que le permite a alguien retirar tókenes fuera de la cadena y enviarlos por medio de Internet al receptor. El receptor, que tiene ETH, luego envía el permiso en nombre del propietario.

```solidity
    bytes32 public DOMAIN_SEPARATOR;
    // keccak256("Permit(address owner,address spender,uint256 value,uint256 nonce,uint256 deadline)");
    bytes32 public constant PERMIT_TYPEHASH = 0x6e71edae12b1b97f4d1f60370fef10105fa2faae0126114a169c64845d6126c9;
```

Este hash es el [identificador para el tipo de transacción](https://eips.ethereum.org/EIPS/eip-712#rationale-for-typehash). El único que soportamos aquí es `Permit` con estos parámetros.

```solidity
    mapping(address => uint) public nonces;
```

No es conveniente para un receptor falsificar una firma digital. Sin embargo, es trivial enviar la misma transacción dos veces (esto es una forma de [ataque de repetición](https://wikipedia.org/wiki/Replay_attack)). Para evitarlo, usamos [nonce](https://wikipedia.org/wiki/Cryptographic_nonce). Si el nonce de un nuevo `Permit` no es mayor que el último usado, se asume que este no es válido.

```solidity
    constructor() public {
        uint chainId;
        assembly {
            chainId := chainid
        }
```

Este es el código para recuperar el [identificador de cadena](https://chainid.network/). Este usa un dialecto ensamblado por la EVM llamado [Yul](https://docs.soliditylang.org/en/v0.8.4/yul.html). Recuerde que en la versión actual de Yul necesita usar `chainid()`, no `chainid`.

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

Calcule el [separador de dominio](https://eips.ethereum.org/EIPS/eip-712#rationale-for-domainseparator) para EIP-712.

```solidity
    function permit(address owner, address spender, uint value, uint deadline, uint8 v, bytes32 r, bytes32 s) external {
```

Esta es la función que implementa los permisos. Esta recibe como parámetros los campos relevantes y los tres valores escalables para [la firma](https://yos.io/2018/11/16/ethereum-signatures/) (v, r y s).

```solidity
        require(deadline >= block.timestamp, 'UniswapV2: EXPIRED');
```

No acepte transacciones fuera del límite de tiempo.

```solidity
        bytes32 digest = keccak256(
            abi.encodePacked(
                '\x19\x01',
                DOMAIN_SEPARATOR,
                keccak256(abi.encode(PERMIT_TYPEHASH, owner, spender, value, nonces[owner]++, deadline))
            )
        );
```

`abi.encodePacked(...)` es el mensaje que esperamos obtener. Sabemos que el nonce debería estar, por lo que es necesario obtenerlo como parámetro.

El algoritmo de firma de Ethereum espera obtener 256 bits para firmar y poder usar la función de hash `keccak256`.

```solidity
        address recoveredAddress = ecrecover(digest, v, r, s);
```

Desde el resumen y la firma podemos obtener la dirección que la firmó usando [ecrecover](https://coders-errand.com/ecrecover-signature-verification-ethereum/).

```solidity
        require(recoveredAddress != address(0) && recoveredAddress == owner, 'UniswapV2: INVALID_SIGNATURE');
        _approve(owner, spender, value);
    }

```

Si todo está bien, trate esto como [una aprobación ERC-20](https://eips.ethereum.org/EIPS/eip-20#approve).

## Los contratos periféricos {#periphery-contracts}

Los contratos periféricos son la API (interfaz del programa de aplicación) para Uniswap. Estos están disponibles para activaciones externas, ya sea desde otros contratos o aplicaciones descentralizadas. Podría activar los contratos principales directamente, pero es más complicado y podría perder valor si comete un error. Los contratos principales solo contienen pruebas para asegurarnos de que no están trucados, no revisiones sanitarias para otras cosas. Estos están en la periferia, por lo que pueden actualizarse según se necesite.

### UniswapV2Router01.sol {#UniswapV2Router01}

[Este contrato](https://github.com/Uniswap/uniswap-v2-periphery/blob/master/contracts/UniswapV2Router01.sol) tiene problemas y [no debería utilizarse](https://docs.uniswap.org/contracts/v2/reference/smart-contracts/router-01). Afortunadamente, los contratos periféricos no tienen estado y no almacenan ningún activo, lo que los hace fáciles de desaprobar y sugerir a las personas usar `UniswapV2Router02` en su lugar.

### UniswapV2Router02.sol {#UniswapV2Router02}

En la mayoría de los casos, usaría Uniswap a través de [este contrato](https://github.com/Uniswap/uniswap-v2-periphery/blob/master/contracts/UniswapV2Router02.sol). [Aquí](https://docs.uniswap.org/contracts/v2/reference/smart-contracts/router-02) puede ver cómo usarlo.

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

La mayoría de estos los hemos encontrado antes o son muy obvios. La única excepción es `IWETH.sol`. Uniswap v2 permite el intercambio de cualquier par de tókenes ERC-20, pero ether (ETH) no es un token ERC-20. Este antecede al estándar y se transfiere usando mecanismos únicos. Para habilitar el uso de ETH en contratos aplicables a los tókenes ERC-20, las personas pueden usar el contrato [wrapped ether (WETH)](https://weth.io/). Puede enviar ETH a este contrato y este acuña una cantidad equivalente de WETH. También puede quemar WETH y obtener ETH después de esto.

```solidity
contract UniswapV2Router02 is IUniswapV2Router02 {
    using SafeMath for uint;

    address public immutable override factory;
    address public immutable override WETH;
```

El enrutador necesita conocer qué fábrica debe usar y para transacciones que requieren WETH, qué contrato de WETH debe usar. Estos valores son [inmutables](https://docs.soliditylang.org/en/v0.8.3/contracts.html#constant-and-immutable-state-variables), lo que significa que sólo se pueden establecer en el constructor. Esto le proporciona a los usuarios la garantía de que nadie podría cambiarlos para apuntar a contratos poco honestos.

```solidity
    modifier ensure(uint deadline) {
        require(deadline >= block.timestamp, 'UniswapV2Router: EXPIRED');
        _;
    }
```

Este modificador se asegura de que las transacciones con límite de tiempo («si puede, haga X antes del tiempo X») no sucedan antes de su límite de tiempo.

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

Esta función se activa cuando canjeamos tókenes del contrato WETH en ETH. Sólo el contrato WETH que usamos está autorizado para hacer eso.

#### Agregue liquidez {#add-liquidity}

Estas funciones agregan tókenes al intercambio de pares, que incrementa la reserva de liquidez.

```solidity

    // **** ADD LIQUIDITY ****
    function _addLiquidity(
```

Esta función se usa para calcular la cantidad de tókenes A y B que se debería depositar en el intercambio de pares.

```solidity
        address tokenA,
        address tokenB,
```

Estas son las direcciones de los contratos de token ERC-20.

```solidity
        uint amountADesired,
        uint amountBDesired,
```

Estas son las cantidades que el proveedor de liquidez quiere depositar. También son las cantidades máximas de A y B que se pueden depositar.

```solidity
        uint amountAMin,
        uint amountBMin
```

Estas son las cantidades mínimas aceptadas para depositar. Si la transacción no se puede realizar con estas cantidades o más, debe revertirla. Si no quiere esta característica, especifique únicamente cero.

Los proveedores de liquidez especifican un mínimo, por lo general, porque ellos quieren limitar la transacción a un tipo de cambio que es cercano al actual. Si el tipo de cambio fluctúa demasiado, podría significar que cambien los valores subyacentes y quieran decidir manualmente qué hacer.

Por ejemplo, imagine un caso donde el tipo de cambio es de uno a uno y el proveedor de liquidez especifica estos valores:

| Parámetro      | Valor |
| -------------- | -----:|
| amountADesired | 1.000 |
| amountBDesired | 1.000 |
| amountAMin     |   900 |
| amountBMin     |   800 |

Mientras el tipo de cambio se encuentre entre 0,9 y 1,25, la transacción se realiza. Si el tipo de cambio está fuera de ese rango, la transacción se cancela.

El motivo de esta precaución es que las transacciones no son inmediatas, usted las envías y, eventualmente, un validador las incluirá en un bloque (a menos que su precio de gas sea muy bajo, en cuyo caso necesitará enviar otra transacción con el mismo valor y un precio de gas más alto para sobrescribirla). No puedes controlar lo que sucede durante el intervalo entre el envío y la inclusión.

```solidity
    ) internal virtual returns (uint amountA, uint amountB) {
```

La función muestra las cantidades que el proveedor de liquidez debería depositar para tener una proporción igual a la proporción actual entre reservas.

```solidity
        // create the pair if it doesn't exist yet
        if (IUniswapV2Factory(factory).getPair(tokenA, tokenB) == address(0)) {
            IUniswapV2Factory(factory).createPair(tokenA, tokenB);
        }
```

Si no hay un intercambio para este par de tókenes, créelo.

```solidity
        (uint reserveA, uint reserveB) = UniswapV2Library.getReserves(factory, tokenA, tokenB);
```

Obtenga las reservas actuales en el par.

```solidity
        if (reserveA == 0 && reserveB == 0) {
            (amountA, amountB) = (amountADesired, amountBDesired);
```

Si las reservas actuales están vacías, entonces esto es un nuevo intercambio de pares. Las cantidades por depositar deberían ser exactamente iguales a las que el proveedor de liquidez desea proporcionar.

```solidity
        } else {
            uint amountBOptimal = UniswapV2Library.quote(amountADesired, reserveA, reserveB);
```

Si necesitamos ver de cuánto serían las cantidades, obtenemos el valor adecuado usando [esta función](https://github.com/Uniswap/uniswap-v2-periphery/blob/master/contracts/libraries/UniswapV2Library.sol#L35). Queremos la misma proporción de las reservas actuales.

```solidity
            if (amountBOptimal <= amountBDesired) {
                require(amountBOptimal >= amountBMin, 'UniswapV2Router: INSUFFICIENT_B_AMOUNT');
                (amountA, amountB) = (amountADesired, amountBOptimal);
```

Si `amountBOptimal` es menor que la cantidad que el proveedor de liquidez quiere depositar, esto significa que el token B es más valioso que lo que el depositante piensa, por lo que se requiere una cantidad menor.

```solidity
            } else {
                uint amountAOptimal = UniswapV2Library.quote(amountBDesired, reserveB, reserveA);
                assert(amountAOptimal <= amountADesired);
                require(amountAOptimal >= amountAMin, 'UniswapV2Router: INSUFFICIENT_A_AMOUNT');
                (amountA, amountB) = (amountAOptimal, amountBDesired);
```

Si la cantidad óptima B es mayor que la cantidad B deseada, esto significa que los tókenes B son menos valiosos que lo que el depositante de liquidez piensa, por lo que se requiere una cantidad más alta. Sin embargo, la cantidad deseada es un máximo, por lo que no podemos hacer eso. En su lugar, calculamos el número óptimo de tókenes A para la cantidad deseada de tókenes B.

Al unirlo todo, obtenemos este gráfico. Pongamos que está intentando depositar mil tókenes A (línea azul) y mil tókenes B (línea roja). El eje x es el tipo de cambio, A/B. Si x=1, son iguales en valor y deposita mil de cada uno. Si x=2, A es el doble del valor de B (obtienes dos tókenes B por cada token A), por lo que deposita mil tókenes B, pero solo 500 tókenes A. Si x=0.5, la situación se invierte, mil tókenes A y quinientos tókenes B.

![Graph](liquidityProviderDeposit.png)

Podría depositar liquidez directamente en el contrato principal (usando [UniswapV2Pair::mint](https://github.com/Uniswap/uniswap-v2-core/blob/master/contracts/UniswapV2Pair.sol#L110)), pero el contrato principal solo verifica que no está siendo engañado en sí mismo, por lo que corre el riesgo de perder valor si el tipo de cambio cambia entre el momento en que envía su transacción y el momento en que se ejecuta. Si utiliza el contrato periférico, calcule la cantidad que debe depositar y deposítela inmediatamente, para que el tipo de cambio no cambie y no pierda nada.

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

Esta función puede activarse mediante una transacción para depositar liquidez. La mayoría de los parámetros son los mismos que en `_addLiquidity` anterior, con dos excepciones:

. `to` es la dirección que obtiene los nuevos tókenes de liquidez acuñados para mostrar la parte de la reserva del proveedor de liquidez . `fecha límite` es un límite de tiempo para la transacción

```solidity
    ) external virtual override ensure(deadline) returns (uint amountA, uint amountB, uint liquidity) {
        (amountA, amountB) = _addLiquidity(tokenA, tokenB, amountADesired, amountBDesired, amountAMin, amountBMin);
        address pair = UniswapV2Library.pairFor(factory, tokenA, tokenB);
```

Calculamos las cantidades para depositar realmente y luego encontramos la dirección del fondo de liquidez. Para ahorrar gas, no hacemos esto preguntando a la fábrica, sino usando la función de biblioteca `pairFor` (ver más abajo en las bibliotecas)

```solidity
        TransferHelper.safeTransferFrom(tokenA, msg.sender, pair, amountA);
        TransferHelper.safeTransferFrom(tokenB, msg.sender, pair, amountB);
```

Transfiera las cantidades correctas de tókenes del usuario al intercambio de pares.

```solidity
        liquidity = IUniswapV2Pair(pair).mint(to);
    }
```

A cambio, dé los tókenes de liquidez de la dirección `to` para la propiedad parcial del grupo. La función `mint` del contrato principal ve cuántos tókenes adicionales tiene (en comparación con los que tenía la última vez que cambió la liquidez) y la liquidez de las acuñaciones en consecuencia.

```solidity
    function addLiquidityETH(
        address token,
        uint amountTokenDesired,
```

Cuando un proveedor de liquidez quiere proporcionar liquidez a un intercambio de par Token/ETH, hay algunas diferencias. El contrato maneja la envoltura del ETH para el proveedor de liquidez. No hay necesidad de especificar cuántos ETH quiere depositar el usuario, porque el usuario solo los envía con la transacción (la cantidad está disponible en `msg.value`).

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

Para depositar el ETH, el contrato primero lo envuelve en WETH y luego transfiere el WETH al par. Tenga en cuenta que la transferencia está envuelta en una `reinvindicación`. Esto significa que si la transferencia falla, esta activación de contrato también falla y, por lo tanto, la envoltura realmente no ocurre.

```solidity
        liquidity = IUniswapV2Pair(pair).mint(to);
        // refund dust eth, if any
        if (msg.value > amountETH) TransferHelper.safeTransferETH(msg.sender, msg.value - amountETH);
    }
```

El usuario ya nos ha enviado el ETH, por lo que si queda algo extra (porque el otro token es menos valioso de lo que el usuario pensaba), tenemos que emitir un reembolso.

#### Remover la liquidez {#remove-liquidity}

Estas funciones eliminarán la liquidez y lo devolverán al proveedor de liquidez.

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

El caso más sencillo de eliminar la liquidez. Hay una cantidad mínima de cada token que el proveedor de liquidez acepta, y debe ocurrir antes de la fecha límite.

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

Traduce las cantidades de la forma en que el contrato principal las devuelve (primero el token de dirección inferior) a la forma en que el usuario las espera (correspondiente a `tokenA` y `tokenB`).

```solidity
        require(amountA >= amountAMin, 'UniswapV2Router: INSUFFICIENT_A_AMOUNT');
        require(amountB >= amountBMin, 'UniswapV2Router: INSUFFICIENT_B_AMOUNT');
    }
```

Se puede hacer la transferencia primero y luego verificar que es legítima, porque si no lo es, revertiremos todos los cambios de estado.

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

Eliminar la liquidez para ETH es casi la misma, excepto que recibimos los tókenes WETH y luego los canjeamos para que ETH los devuelva al proveedor de liquidez.

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

Estas funciones retransmiten metatransacciones para permitir que los usuarios sin ether se retiren del grupo, utilizando [el mecanismo de permiso](#UniswapV2ERC20).

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

Esta función se puede utilizar para tókenes que tienen tarifas de transferencia o almacenamiento. Cuando un token tiene tales tarifas, no podemos confiar en la función `removeLiquidity` para decirnos cuánto del token recibimos, por lo que primero tenemos que retirar y luego obtener el saldo.

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

#### Comercio {#trade}

```solidity
    // **** SWAP ****
    // requires the initial amount to have already been sent to the first pair
    function _swap(uint[] memory amounts, address[] memory path, address _to) internal virtual {
```

Esta función realiza el procesamiento interno que se requiere para las funciones que están expuestas a los comerciantes.

```solidity
        for (uint i; i < path.length - 1; i++) {
```

A la edición de este artículo, hay [388.160 tókenes ERC-20](https://etherscan.io/tokens). Si hubiera un par de intercambio por cada par de tókenes, sería de más de 150 mil millones de pares de intercambio. Toda la cadena, por el momento, [solo tiene un 0,1 % de ese número de cuentas](https://etherscan.io/chart/address). En lugar, las funciones de intercambio soportan el concepto de una ruta. Un comerciante puede cambiar A por B, B por, C, y C por D, entonces, no hay necesidad para un cambio directo de pares A-D.

Los precios en estos mercados tienden a sincronizarse, debido a que cuando ellos están desincronizados, se crea una oportunidad para el arbitraje. Imagine, por ejemplo, tres tókenes, A, B y C. Hay tres intercambios de pares, uno para cada par.

1. La situación inicial
2. Un comerciante vende 24,695 tókenes A, y recibe 25,305 tókenes B.
3. El comerciante vende 24,695 tókenes B por 25,305 tókenes C, manteniendo aproximadamente 0,61 de tókenes B como ganancia.
4. El comerciante vende 24,695 tókenes C por 25,305 tókenes A, manteniendo aproximadamente 0,61 tókenes C como ganancia. El comerciante también tiene un 0,61 tókenes A adicionales (los 25,305 con los que el comerciante termina, menos la inversión original de 26,695).

| Paso | Intercambio A-B               | Intercambio B-C               | Intercambio A-C               |
| ---- | ----------------------------- | ----------------------------- | ----------------------------- |
| 1    | A:1.000 B:1.050 A/B=1,05      | B:1.000 C:1.050 B/C=1,05      | A:1.050 C:1.000 C/A=1,05      |
| 2    | A:1.024,695 B:1.024,695 A/B=1 | B:1.000 C:1.050 B/C=1,05      | A:1.050 C:1.000 C/A=1,05      |
| 3    | A:1.024,695 B:1.024,695 A/B=1 | B:1,024,695 C:1.024,695 B/C=1 | A:1.050 C:1.000 C/A=1,05      |
| 4    | A:1.024,695 B:1.024,695 A/B=1 | B:1,024,695 C:1.024,695 B/C=1 | A:1,024,695 C:1.024,695 C/A=1 |

```solidity
            (address input, address output) = (path[i], path[i + 1]);
            (address token0,) = UniswapV2Library.sortTokens(input, output);
            uint amountOut = amounts[i + 1];
```

Obtiene el par que actualmente estamos manejando, lo ordena (para usarlo con el par) y obtiene la cantidad esperada de salida.

```solidity
            (uint amount0Out, uint amount1Out) = input == token0 ? (uint(0), amountOut) : (amountOut, uint(0));
```

Obtiene las cantidades esperadas de salida, ordenadas de la manera esperada por el intercambio de pares.

```solidity
            address to = i < path.length - 2 ? UniswapV2Library.pairFor(factory, output, path[i + 2]) : _to;
```

¿Este es el último intercambio? Si es así, envíe los tókenes recibidos para el intercambio al destino. Si no, envíelo al siguiente intercambio de pares.

```solidity

            IUniswapV2Pair(UniswapV2Library.pairFor(factory, input, output)).swap(
                amount0Out, amount1Out, to, new bytes(0)
            );
        }
    }
```

En realidad, lo que hace es activar el intercambio de pares para intercambiar los tókenes. No necesitamos devolver la activación para que nos informen sobre el intercambio, por lo que no enviamos ningún byte en ese campo.

```solidity
    function swapExactTokensForTokens(
```

Esta función la usan directamente los comerciantes para intercambiar un token por otro.

```solidity
        uint amountIn,
        uint amountOutMin,
        address[] calldata path,
```

Este parámetro contiene las direcciones de los contratos ERC-20. Como se ha explicado previamente, este es una matriz, porque puede que necesite recorrer varios intercambios de pares para obtener el activo que quiere, desde el activo que ya tiene.

Un parámetro de función en Solidity se puede almacenar ya sea en `memory` o `calldata`. Si la función es un punto de entrada al contrato, activada directamente por el usuario (usando una transacción) o desde un contrato diferente, entonces el valor del parámetro puede tomarse directamente desde calldata. Si la función se activa internamente, como `_swap` anteriormente, entonces los parámetros se deben almacenar en `memory`. Desde la perspectiva del contrato activado, `calldata` es de sólo lectura.

Con tipos escalables como `uint` o `address`, el compilador maneja por nosotros la elección de almacenamiento, pero con matrices que son más largos y más costosos, nosotros especificamos el tipo de almacenamiento por utilizar.

```solidity
        address to,
        uint deadline
    ) external virtual override ensure(deadline) returns (uint[] memory amounts) {
```

Los valores de retorno siempre son devueltos en la memoria.

```solidity
        amounts = UniswapV2Library.getAmountsOut(factory, amountIn, path);
        require(amounts[amounts.length - 1] >= amountOutMin, 'UniswapV2Router: INSUFFICIENT_OUTPUT_AMOUNT');
```

Calcule la cantidad por comprarse en cada intercambio. Si el resultado es menor que lo mínimo aceptado por el agente, la transacción se revierte.

```solidity
        TransferHelper.safeTransferFrom(
            path[0], msg.sender, UniswapV2Library.pairFor(factory, path[0], path[1]), amounts[0]
        );
        _swap(amounts, path, to);
    }
```

Por último, transfiera el primer token ERC-20 a la cuenta para el primer intercambio de pares y active `_swap`. Todo esto sucede en la misma transacción, por lo que el intercambio de pares sabe que cualquier token inesperado es parte de esta transferencia.

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

La función anterior, `swapTokensForTokens`, permite a un agente especificar una cantidad exacta de tókenes de entrada que está dispuesto a dar y la cantidad de tókenes de salida que está dispuesto a recibir. Esta función hace el intercambio a la inversa: permite al agente especificar la cantidad de tókenes de salida que quiere y la cantidad máxima de tókenes de entrada que está dispuesto a pagar por ellos.

En ambos casos, el agente debe otorgar un permiso al contrato de la periferia para permitir las transferencias.

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

Estas cuatro variantes implican operaciones entre ETH y tókenes. La única diferencia es que o bien recibimos ETH del agente y lo usamos para acuñar WETH, o recibimos WETH del último intercambio en la ruta y lo quemamos, enviando al agente de vuelta el ETH resultante.

```solidity
    // **** SWAP (supporting fee-on-transfer tokens) ****
    // requires the initial amount to have already been sent to the first pair
    function _swapSupportingFeeOnTransferTokens(address[] memory path, address _to) internal virtual {
```

Esta es la función interna para intercambiar tókenes que tienen tarifas de transferencia o almacenamiento para resolver ([este problema](https://github.com/Uniswap/uniswap-interface/issues/835)).

```solidity
        for (uint i; i < path.length - 1; i++) {
            (address input, address output) = (path[i], path[i + 1]);
            (address token0,) = UniswapV2Library.sortTokens(input, output);
            IUniswapV2Pair pair = IUniswapV2Pair(UniswapV2Library.pairFor(factory, input, output));
            uint amountInput;
            uint amountOutput;
            { // scope to avoid stack too deep errors
            (uint reserve0, uint reserve1,) = pair.getReserves();
            (uint reserveInput, uint reserveOutput) = input == token0 ? (reserve0, reserve1) : (reserve1, reserve0);
            amountInput = IERC20(input).balanceOf(address(pair)).sub(reserveInput);
            amountOutput = UniswapV2Library.getAmountOut(amountInput, reserveInput, reserveOutput);
```

A causa de las tarifas de transferencia, no podemos confiar en la función `getAmountsOut` para decirnos cuánto obtenemos de cada transferencia (de la forma en que lo hacemos antes de activar el `_swap` original). En su lugar, tenemos que transferir primero y luego ver cuántos tókenes hemos recibido.

Nota: En teoría, podríamos usar esta función en lugar de `_swap`, pero en ciertos casos (por ejemplo, si la transferencia termina siendo revertida, porque no hay suficiente al final para cumplir con el mínimo requerido) eso terminaría costando más gas. Los tókenes de tarifas de transferencia son bastante raros, por lo que, aunque necesitamos acomodarlos, no hay necesidad de que todos los intercambios asuman que pasan por al menos uno de ellos.

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

Estas son las mismas variantes que se utilizan para los tókenes normales, pero en su lugar activan a `_swapSupportingFeeOnTransferTokens`.

```solidity
    // **** LIBRARY FUNCTIONS ****
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

Estas funciones son solo proxies que activan a las [funciones de UniswapV2Library](#uniswapV2library).

### UniswapV2Migrator.sol {#UniswapV2Migrator}

Este contrato se ha utilizado para migrar los intercambios de la antigua v1 a la v2. Ahora que ya se han sido migrados, ya no es relevante.

## Las bibliotecas {#libraries}

La [biblioteca SafeMath](https://docs.openzeppelin.com/contracts/2.x/api/math) está bien documentada, por lo que no hay necesidad de documentarla aquí.

### Matemáticas {#Math}

Esta biblioteca contiene algunas funciones matemáticas que no suele necesitar el código Solidity, por lo que no son parte del lenguaje.

```solidity
pragma solidity =0.5.16;

// a library for performing various math operations

library Math {
    function min(uint x, uint y) internal pure returns (uint z) {
        z = x < y ? x : y;
    }

    // babylonian method (https://wikipedia.org/wiki/Methods_of_computing_square_roots#Babylonian_method)
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

Obtenga una estimación más cercana, el promedio de la estimación anterior y el número cuya raíz cuadrada estamos tratando de encontrar, dividido entre la estimación anterior. Repita hasta que la nueva estimación no sea inferior a la existente. Para más detalles, [vea aquí](https://wikipedia.org/wiki/Methods_of_computing_square_roots#Babylonian_method).

```solidity
            }
        } else if (y != 0) {
            z = 1;
```

Nunca deberíamos necesitar la raíz cuadrada de cero. Las raíces cuadradas de uno, dos y tres son aproximadamente una (usamos números enteros, por lo que ignoramos la fracción).

```solidity
        }
    }
}
```

### Fracciones de punto fijo (UQ112x112) {#FixedPoint}

Esta biblioteca maneja fracciones, que normalmente no forman parte de la aritmética de Ethereum. Lo hace codificando el número _x_ como _x\*2^112_. Esto nos permite usar los códigos de suma y resta originales sin ningún cambio.

```solidity
pragma solidity =0.5.16;

// a library for handling binary fixed point numbers (https://wikipedia.org/wiki/Q_(number_format))

// range: [0, 2**112 - 1]
// resolution: 1 / 2**112

library UQ112x112 {
    uint224 constant Q112 = 2**112;
```

`Q112` es la codificación para uno.

```solidity
    // encode a uint112 as a UQ112x112
    function encode(uint112 y) internal pure returns (uint224 z) {
        z = uint224(y) * Q112; // never overflows
    }
```

Debido a que y es `uint112`, lo máximo que puede ser es 2^112-1. Ese número todavía se puede codificar como `UQ112x112`.

```solidity
    // divide a UQ112x112 by a uint112, returning a UQ112x112
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

    // returns sorted token addresses, used to handle return values from pairs sorted in this order
    function sortTokens(address tokenA, address tokenB) internal pure returns (address token0, address token1) {
        require(tokenA != tokenB, 'UniswapV2Library: IDENTICAL_ADDRESSES');
        (token0, token1) = tokenA < tokenB ? (tokenA, tokenB) : (tokenB, tokenA);
        require(token0 != address(0), 'UniswapV2Library: ZERO_ADDRESS');
    }
```

Ordene los dos tókenes por dirección, para que podamos obtener la dirección del intercambio de pares por ellos. Esto es necesario porque, de lo contrario, tendríamos dos posibilidades, una para los parámetros A, B y otra para los parámetros B, A, lo que llevaría a dos intercambios en lugar de uno.

```solidity
    // calculates the CREATE2 address for a pair without making any external calls
    function pairFor(address factory, address tokenA, address tokenB) internal pure returns (address pair) {
        (address token0, address token1) = sortTokens(tokenA, tokenB);
        pair = address(uint(keccak256(abi.encodePacked(
                hex'ff',
                factory,
                keccak256(abi.encodePacked(token0, token1)),
                hex'96e8ac4277198ff8b6f785478aa9a39f403cb768dd02cbee326c3e7da348845f' // init code hash
            ))));
    }
```

Esta función calcula la dirección del intercambio de pares para los dos tókenes. Este contrato se crea usando [el código de operación CREATE2](https://eips.ethereum.org/EIPS/eip-1014), por lo que podemos calcular la dirección usando el mismo algoritmo si conocemos los parámetros que utiliza. Esto es mucho más barato que preguntarle a la fábrica, y

```solidity
    // fetches and sorts the reserves for a pair
    function getReserves(address factory, address tokenA, address tokenB) internal view returns (uint reserveA, uint reserveB) {
        (address token0,) = sortTokens(tokenA, tokenB);
        (uint reserve0, uint reserve1,) = IUniswapV2Pair(pairFor(factory, tokenA, tokenB)).getReserves();
        (reserveA, reserveB) = tokenA == token0 ? (reserve0, reserve1) : (reserve1, reserve0);
    }
```

Esta función devuelve las reservas de los dos tókenes que tiene el intercambio de pares. Tenga en cuenta que puede recibir los tókenes en cualquier orden y ordenarlos para uso interno.

```solidity
    // given some amount of an asset and pair reserves, returns an equivalent amount of the other asset
    function quote(uint amountA, uint reserveA, uint reserveB) internal pure returns (uint amountB) {
        require(amountA > 0, 'UniswapV2Library: INSUFFICIENT_AMOUNT');
        require(reserveA > 0 && reserveB > 0, 'UniswapV2Library: INSUFFICIENT_LIQUIDITY');
        amountB = amountA.mul(reserveB) / reserveA;
    }
```

Esta función le da la cantidad de token B que obtendrá a cambio del token A si no hay ningún cargo involucrado. Este cálculo tiene en cuenta que la transferencia cambia el tipo de cambio.

```solidity
    // given an input amount of an asset and pair reserves, returns the maximum output amount of the other asset
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

Solidity no maneja las fracciones de forma nativa, por lo que no podemos multiplicar la cantidad por 0,997. En su lugar, multiplicamos el numerador por 997 y el denominador por 1.000, logrando el mismo efecto.

```solidity
    // given an output amount of an asset and pair reserves, returns a required input amount of the other asset
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

    // performs chained getAmountOut calculations on any number of pairs
    function getAmountsOut(address factory, uint amountIn, address[] memory path) internal view returns (uint[] memory amounts) {
        require(path.length >= 2, 'UniswapV2Library: INVALID_PATH');
        amounts = new uint[](path.length);
        amounts[0] = amountIn;
        for (uint i; i < path.length - 1; i++) {
            (uint reserveIn, uint reserveOut) = getReserves(factory, path[i], path[i + 1]);
            amounts[i + 1] = getAmountOut(amounts[i], reserveIn, reserveOut);
        }
    }

    // performs chained getAmountIn calculations on any number of pairs
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

### Ayudante de transferencia {#transfer-helper}

[Esta biblioteca](https://github.com/Uniswap/uniswap-lib/blob/master/contracts/libraries/TransferHelper.sol) agrega comprobaciones de éxito en torno a las transferencias de ERC-20 y Ethereum para tratar una reversión y un valor `falso` devuelto de la misma manera.

```solidity
// SPDX-License-Identifier: GPL-3.0-or-later

pragma solidity >=0.6.0;

// helper methods for interacting with ERC20 tokens and sending ETH that do not consistently return true/false
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

- Utilice una definición de interfaz para crear una activación de función
- Utilice la [interfaz binaria de aplicación (ABI)](https://docs.soliditylang.org/en/v0.8.3/abi-spec.html) «manualmente» para crear la activación. Esto es lo que el autor del código decidió hacer.

```solidity
        require(
            success && (data.length == 0 || abi.decode(data, (bool))),
            'TransferHelper::safeApprove: approve failed'
        );
    }
```

En aras de la compatibilidad con versiones anteriores con el token que se crearon antes del estándar ERC-20, una activación ERC-20 puede fallar ya sea revirtiendo (en cuyo caso `success` es `false`) o al tener éxito y devolver un valor `false` (en cuyo caso hay datos de salida, y si lo decodifica como un booleano, obtiene `false`).

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

Esta función implementa la funcionalidad de transferencia de [ERC-20](https://eips.ethereum.org/EIPS/eip-20#transfer), que permite a una cuenta gastar la asignación proporcionada por una cuenta diferente.

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

Esta función implementa la funcionalidad de ERC-20 [transferFrom](https://eips.ethereum.org/EIPS/eip-20#transferfrom), que permite a una cuenta gastar la asignación proporcionada por una cuenta diferente.

```solidity

    function safeTransferETH(address to, uint256 value) internal {
        (bool success, ) = to.call{value: value}(new bytes(0));
        require(success, 'TransferHelper::safeTransferETH: ETH transfer failed');
    }
}
```

Esta función transfiere ether a una cuenta. Cualquier activación de un contrato diferente puede intentar enviar ether. Debido a que no necesitamos activar ninguna función realmente, no enviamos ningún dato con la activación.

## Conclusión {#conclusion}

Este es un artículo largo de aproximadamente 50 páginas. Si ha llegado hasta aquí, ¡le felicitamos! Espero que a estas alturas haya entendido lo referente a escribir una aplicación de verdad (a diferencia de programas cortos de ejemplo) y ahora sea capaz de escribir mejor contratos para sus propios casos de uso.

Ahora ya puede ir y escribir algo útil que nos sorprenda.
