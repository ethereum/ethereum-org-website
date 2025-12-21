---
title: "Reducir el tamaño de los contratos para combatir el límite de tamaño del contrato"
description: ¿Qué puedes hacer para evitar que tus contratos inteligentes se hagan demasiado grandes?
author: Markus Waas
lang: es
tags: [ "Solidity", "contratos Inteligentes", "almacenamiento" ]
skill: intermediate
published: 2020-06-26
source: soliditydeveloper.com
sourceUrl: https://soliditydeveloper.com/max-contract-size
---

## ¿Por qué hay un límite? {#why-is-there-a-limit}

El [22 de noviembre de 2016](https://blog.ethereum.org/2016/11/18/hard-fork-no-4-spurious-dragon/), la bifurcación dura Spurious Dragon introdujo el [EIP-170](https://eips.ethereum.org/EIPS/eip-170), que añadió un límite de tamaño para los contratos inteligentes de 24,576 kb. Para ti, como desarrollador de Solidity, esto significa que cuando añadas más y más funcionalidad a tu contrato, en algún momento alcanzarás el límite y al desplegarlo verás el error:

`Advertencia: El tamaño del código del contrato supera los 24576 bytes (un límite introducido en Spurious Dragon). Es posible que este contrato no sea desplegable en la red principal. Considera habilitar el optimizador (¡con un valor bajo para "runs"!), desactivar las cadenas de reversión o utilizar librerías.`

Este límite se introdujo para prevenir ataques de denegación de servicio (DOS). Cualquier llamada a un contrato es relativamente barata en términos de gas. Sin embargo, el impacto de una llamada de contrato para los nodos de Ethereum aumenta de forma desproporcionada en función del tamaño del código del contrato al que se llama (lectura del código del disco, preprocesamiento del código, adición de datos a la prueba de Merkle). Siempre que te encuentres en una situación en la que el atacante requiera pocos recursos para causar mucho trabajo a otros, tienes la posibilidad de que se produzcan ataques de DOS.

Originalmente, esto era un problema menor, porque un límite natural del tamaño de un contrato es el límite de gas del bloque. Obviamente, un contrato debe desplegarse dentro de una transacción que contenga todo el bytecode del contrato. Si incluyes solo esa transacción en un bloque, puedes usar todo ese gas, pero no es infinito. Desde la [Actualización de Londres](/ethereum-forks/#london), el límite de gas del bloque ha podido variar entre 15 y 30 millones de unidades en función de la demanda de la red.

A continuación, veremos algunos métodos ordenados por su impacto potencial. Piénsalo en términos de pérdida de peso. La mejor estrategia para que alguien alcance su peso objetivo (en nuestro caso, 24 kb) es centrarse primero en los métodos de gran impacto. En la mayoría de los casos, solo con arreglar tu dieta lo conseguirás, pero a veces necesitas un poco más. Luego, puedes añadir algo de ejercicio (impacto medio) o incluso suplementos (impacto pequeño).

## Gran impacto {#big-impact}

### Separa tus contratos {#separate-your-contracts}

Este debería ser siempre tu primer enfoque. ¿Cómo puedes separar el contrato en varios contratos más pequeños? Generalmente, te obliga a idear una buena arquitectura para tus contratos. Desde la perspectiva de la legibilidad del código, siempre se prefieren los contratos más pequeños. Para dividir los contratos, pregúntate lo siguiente:

- ¿Qué funciones deben ir juntas? Cada conjunto de funciones podría funcionar mejor en su propio contrato.
- ¿Qué funciones no requieren leer el estado del contrato o solo un subconjunto específico del estado?
- ¿Puedes dividir el almacenamiento y la funcionalidad?

### Librerías {#libraries}

Una forma sencilla de separar el código de la funcionalidad del almacenamiento es usar una [librería](https://solidity.readthedocs.io/en/v0.6.10/contracts.html#libraries). No declares las funciones de la librería como `internal`, ya que estas se [añadirán directamente al contrato](https://ethereum.stackexchange.com/questions/12975/are-internal-functions-in-libraries-not-covered-by-linking) durante la compilación. Pero si usas funciones `public`, estas estarán de hecho en un contrato de librería separado. Considera [usar `using for`](https://solidity.readthedocs.io/en/v0.6.10/contracts.html#using-for) para que el uso de librerías sea más práctico.

### Proxies {#proxies}

Una estrategia más avanzada sería un sistema de proxy. Las librerías usan `DELEGATECALL` internamente, que simplemente ejecuta la función de otro contrato con el estado del contrato que realiza la llamada. Consulta [esta publicación del blog](https://hackernoon.com/how-to-make-smart-contracts-upgradable-2612e771d5a2) para aprender más sobre los sistemas proxy. Te dan más funcionalidad (p. ej., permiten la capacidad de actualización), pero también añaden mucha complejidad. Yo no los añadiría solo para reducir el tamaño de los contratos, a menos que sea tu única opción por cualquier motivo.

## Impacto medio {#medium-impact}

### Elimina funciones {#remove-functions}

Esto debería ser obvio. Las funciones aumentan bastante el tamaño de un contrato.

- **Externas**: a menudo, añadimos muchas funciones de vista por comodidad. Eso está perfectamente bien hasta que alcanzas el límite de tamaño. Entonces, quizá quieras plantearte eliminar todas excepto las absolutamente esenciales.
- **Internas**: también puedes eliminar funciones `internal`/`private` y simplemente insertar el código en línea siempre y cuando la función se llame una sola vez.

### Evita variables adicionales {#avoid-additional-variables}

```solidity
function get(uint id) returns (dirección,dirección) {
    MyStruct memory myStruct = myStructs[id];
    return (myStruct.addr1, myStruct.addr2);
}
```

```solidity
function get(uint id) returns (dirección,dirección) {
    return (myStructs[id].addr1, myStructs[id].addr2);
}
```

Un cambio simple como este supone una diferencia de **0,28 kb**. Es probable que encuentres muchas situaciones similares en tus contratos y que en conjunto puedan sumar una cantidad significativa.

### Acorta los mensajes de error {#shorten-error-message}

Los mensajes de reversión largos y, en particular, muchos mensajes de reversión diferentes pueden inflar el contrato. En su lugar, usa códigos de error cortos y descodifícalos en tu contrato. Un mensaje largo podría acortarse mucho:

```solidity
require(msg.sender == owner, "Solo el propietario de este contrato puede llamar a esta función");
```

```solidity
require(msg.sender == owner, "OW1");
```

### Usa errores personalizados en lugar de mensajes de error

Los errores personalizados se introdujeron en [Solidity 0.8.4](https://blog.soliditylang.org/2021/04/21/custom-errors/). Son una forma excelente de reducir el tamaño de tus contratos, porque se codifican en la ABI como selectores (igual que las funciones).

```solidity
error Unauthorized();

if (msg.sender != owner) {
    revert Unauthorized();
}
```

### Considera usar un valor bajo para "runs" en el optimizador {#consider-a-low-run-value-in-the-optimizer}

También puedes cambiar la configuración del optimizador. El valor predeterminado de 200 significa que intenta optimizar el bytecode como si una función se llamara 200 veces. Si lo cambias a 1, básicamente le estás diciendo al optimizador que optimice para el caso de que cada función se ejecute una sola vez. Una función optimizada para ejecutarse una sola vez significa que está optimizada para el propio despliegue. Ten en cuenta que **esto aumenta los [costes de gas](/developers/docs/gas/) por ejecutar las funciones**, así que puede que no quieras hacerlo.

## Impacto pequeño {#small-impact}

### Evita pasar structs a las funciones {#avoid-passing-structs-to-functions}

Si estás usando el [ABIEncoderV2](https://solidity.readthedocs.io/en/v0.6.10/layout-of-source-files.html#abiencoderv2), puede ser útil no pasar `structs` a una función. En lugar de pasar el parámetro como una `struct`, pasa los parámetros requeridos directamente. En este ejemplo, ahorramos otros **0,1 kb**.

```solidity
function get(uint id) returns (dirección,dirección) {
    return _get(myStruct);
}

function _get(MyStruct memory myStruct) private view returns(dirección,dirección) {
    return (myStruct.addr1, myStruct.addr2);
}
```

```solidity
function get(uint id) returns(dirección,dirección) {
    return _get(myStructs[id].addr1, myStructs[id].addr2);
}

function _get(dirección addr1, dirección addr2) private view returns(dirección,dirección) {
    return (addr1, addr2);
}
```

### Declara la visibilidad correcta para funciones y variables {#declare-correct-visibility-for-functions-and-variables}

- ¿Funciones o variables que solo se llaman desde el exterior? Decláralas como `external` en lugar de `public`.
- ¿Funciones o variables que solo se llaman desde dentro del contrato? Decláralas como `private` o `internal` en lugar de `public`.

### Elimina los modificadores {#remove-modifiers}

Los modificadores, sobre todo si se usan de forma intensiva, pueden tener un impacto significativo en el tamaño del contrato. Considera eliminarlos y usar funciones en su lugar.

```solidity
modifier checkStuff() {}

function doSomething() checkStuff {}
```

```solidity
function checkStuff() private {}

function doSomething() { checkStuff(); }
```

Estos consejos deberían ayudarte a reducir considerablemente el tamaño del contrato. Una vez más, no puedo dejar de insistir en que, siempre que sea posible, te centres en dividir los contratos para lograr el mayor impacto.
