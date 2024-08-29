---
title: "Reducir el tamaño de los contratos para luchar contra el límite de tamaño del contrato"
description: '¿Qué puede hacer para evitar que sus contratos inteligentes sean demasiado grandes?'
author: Markus Waas
lang: es
tags:
  - "solidity"
  - "contratos inteligentes"
  - "almacenamiento"
skill: intermediate
published: 2020-06-26
source: soliditydeveloper.com
sourceUrl: https://soliditydeveloper.com/max-contract-size
---

## ¿Por qué hay un límite? {#why-is-there-a-limit}

El [22 de noviembre de 2016](https://blog.ethereum.org/2016/11/18/hard-fork-no-4-spurious-dragon/) el hard-fork Spurious Dragon introdujo [EIP-170](https://eips.ethereum.org/EIPS/eip-170), que agregó un límite de tamaño del contrato inteligente de 24.576 bytes. Para usted, como desarrollador de Solidity, esto significa que cuando añada más y más funcionalidad a su contrato, en algún momento alcanzará el límite y al realizar la implementación verá el error:

`Warning: Contract code size exceeds 24576 bytes (a limit introduced in Spurious Dragon). This contract may not be deployable on Mainnet. Consider enabling the optimizer (with a low "runs" value!), turning off revert strings, or using libraries.`

Este límite se introdujo para prevenir ataques de denegación de servicio (DOS). Cualquier llamada a un contrato es relativamente barata en términos de gas. Sin embargo, el impacto de una llamada al contrato para nodos Ethereum aumenta desproporcionadamente dependiendo del tamaño del código del contrato llamado (leer el código del disco, preprocesar el código, agregar datos a la prueba Merkle). Cada vez que uno se encuentre en una situación en la que el atacante requiera pocos recursos para causar mucho trabajo a los demás, obtiene el potencial para ataques de DOS.

Originalmente esto era un problema menor porque el tamaño natural de un contrato es el límite de gas de un bloque. Obviamente, un contrato debe implementarse dentro de una transacción que contenga todo el código de bytes del contrato. Si incluye solo esa transacción en un bloque, puede usar todo ese gas, pero no es infinito. Desde la [Actualización London](/history/#london), el límite de gas de un bloque ha podido variar entre 15 millones y 30 millones de unidades dependiendo de la demanda de la red.

A continuación veremos algunos métodos ordenados según su posible impacto. Piénsalo en términos de pérdida de peso. La mejor estrategia para que alguien alcance su peso deseado (en nuestro caso 24kb) es centrarse primero en los métodos de gran impacto. En la mayoría de los casos, basta con corregir la dieta para conseguirlo, pero a veces se necesita un poco más. Luego puedes añadir algo de ejercicio (impacto medio) o incluso suplementos (impacto bajo).

## Gran impacto {#big-impact}

### Separe sus contratos {#separate-your-contracts}

Este debería ser siempre su primera estrategia. ¿Cómo puede separar el contrato en múltiples contratos más pequeños? Por lo general, esto lo obliga a crear una buena estructura para sus contratos. Desde el punto de vista de la legibilidad del código, siempre se prefieren los contratos más pequeños. A la hora de dividir los contratos, plantéese lo siguiente:

- ¿Qué funciones deben ir juntas? Cada conjunto de funciones quizás resulte mejor en su propio contrato.
- ¿Qué funciones no requieren la lectura del estado del contrato o solo un subconjunto específico del estado?
- ¿Se puede dividir el almacenamiento y la funcionalidad?

### Bibliotecas {#libraries}

Una forma sencilla de mover el código de funcionalidad más allá del almacenamiento es usar una [biblioteca](https://solidity.readthedocs.io/en/v0.6.10/contracts.html#libraries). No declare las funciones de la biblioteca como internas, ya que que se [agregarán al contrato](https://ethereum.stackexchange.com/questions/12975/are-internal-functions-in-libraries-not-covered-by-linking) directamente durante la compilación. Pero si utiliza funciones públicas, estas estarán en realidad en un contrato de biblioteca separado. Considere el uso de [for](https://solidity.readthedocs.io/en/v0.6.10/contracts.html#using-for) para que el uso de las bibliotecas sea más conveniente.

### Proxies {#proxies}

Una estrategia más avanzada sería un sistema de proxy. Las bibliotecas utilizan `DELEGATECALL` en la parte trasera, lo que simplemente ejecuta la función de otro contrato con el estado del contrato invocante. Eche un vistazo a [esta entrada de blog](https://hackernoon.com/how-to-make-smart-contracts-upgradable-2612e771d5a2) para aprender más sobre los sistemas de proxy. Le darán mayor funcionalidad, por ejemplo, permiten la actualización, pero también añaden mucha complejidad. No los añadiría solo para reducir el tamaño de los contratos, a menos que sea su única opción por cualquier razón.

## Impacto medio {#medium-impact}

### Elimine funciones {#remove-functions}

Esta debería ser la opción obvia. Las funciones aumentan el tamaño de un contrato.

- **Externas**: A menudo añadimos muchas funciones de visualización por motivos de conveniencia. Eso está muy bien hasta que alcance el límite de tamaño. Es así que tal vez quiera considerar eliminar todas excepto las absolutamente esenciales.
- **Internas**: También puede eliminar funciones internas/privadas y simplemente insertar el código en la medida en que la función sea invocada solo una vez.

### Evite variables adicionales {#avoid-additional-variables}

Un simple cambio como este:

```solidity
function get(uint id) returns (address,address) {
    MyStruct memory myStruct = myStructs[id];
    return (myStruct.addr1, myStruct.addr2);
}
```

```solidity
function get(uint id) returns (address,address) {
    return (myStructs[id].addr1, myStructs[id].addr2);
}
```

implica una diferencia de **0,28 kb**. Es posible que pueda encontrar muchas situaciones similares en sus contratos y que las cantidades sean significativas.

### Acorte los mensajes de error {#shorten-error-message}

Los mensajes largos de revertir y, en particular, muchos mensajes diferentes de revertir pueden inflar el contrato. En su lugar, use códigos de error cortos y decodifíquelos en su contrato. Un mensaje largo puede ser mucho más corto:

```solidity
require(msg.sender == owner, "Only the owner of this contract can call this function");

```

```solidity
require(msg.sender == owner, "OW1");
```

### Utilice errores personalizados en lugar de mensajes de error

Los errores personalizados se introdujeron en [Solidity 0.8.4](https://blog.soliditylang.org/2021/04/21/custom-errors/). Son una excelente manera de reducir el tamaño de sus contratos, porque están codificados con ABI como selectores (al igual que las funciones).

```solidity
error Unauthorized();

if (msg.sender != owner) {
    revert Unauthorized();
}
```

### Considere un valor de ejecución bajo en el optimizador {#consider-a-low-run-value-in-the-optimizer}

También puede cambiar la configuración del optimizador. El valor por defecto de 200 significa que intenta optimizar el código de bytes como si una función fuera llamada 200 veces. Si lo cambia a 1, básicamente le indicará al optimizador que actúe de manera optimizada en el caso de ejecutar cada función una sola vez. Una función optimizada para ejecutarse solo una vez significa que está optimizada para la implementación misma. Tenga en cuenta que **esto incrementa el [costo del gas](/developers/docs/gas/) por ejecutar las funciones**, así que tal vez no quiera inclinarse por esta opción.

## Pequeño impacto {#small-impact}

### Evite pasar estructuras a funciones {#avoid-passing-structs-to-functions}

Si usa el [ABIEncoderV2](https://solidity.readthedocs.io/en/v0.6.10/layout-of-source-files.html#abiencoderv2), puede ayudar a no pasar estructuras a una función. En vez de pasar el parámetro como una estructura...

```solidity
function get(uint id) returns (address,address) {
    return _get(myStruct);
}

function _get(MyStruct memory myStruct) private view returns(address,address) {
    return (myStruct.addr1, myStruct.addr2);
}
```

```solidity
function get(uint id) returns(address,address) {
    return _get(myStructs[id].addr1, myStructs[id].addr2);
}

function _get(address addr1, address addr2) private view returns(address,address) {
    return (addr1, addr2);
}
```

... pase directamente los parámetros requeridos. En este ejemplo ahorramos **0,1 kb**.

### Declare la visibilidad correcta de las funciones y variables {#declare-correct-visibility-for-functions-and-variables}

- ¿Funciones o variables que solo sean invocadas desde el exterior? Declárelas como `externas` en lugar de `públicas`.
- ¿Funciones o variables que solo sean invocadas desde dentro del contrato? Declárelas como `privadas` o `internas` en lugar de `públicas`.

### Elimine modificadores {#remove-modifiers}

Los modificadores, especialmente cuando se utilizan demasiado, podrían tener un impacto significativo en el tamaño del contrato. Considere eliminarlos y utilizar funciones.

```solidity
modifier checkStuff() {}

function doSomething() checkStuff {}
```

```solidity
function checkStuff() private {}

function doSomething() { checkStuff(); }
```

Estos consejos deberían ayudarlo a reducir significativamente el tamaño de un contrato. Una vez más, no me canso de decirlo, siempre y cuando sea posible, haga hincapié en la división de los contratos para lograr un mayor impacto.
