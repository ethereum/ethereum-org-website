---
title: "Reducción del tamaño de los contratos para combatir el límite de tamaño del contrato"
description: "¿Qué puede hacer para evitar que sus contratos inteligentes se vuelvan demasiado grandes?"
author: Markus Waas
lang: es
tags: ["Solidity", "contratos inteligentes", "almacenamiento"]
skill: intermediate
breadcrumb: "Reducción del tamaño de los contratos"
published: 2020-06-26
source: soliditydeveloper.com
sourceUrl: https://soliditydeveloper.com/max-contract-size
---

## ¿Por qué hay un límite? {#why-is-there-a-limit}

El [22 de noviembre de 2016](https://blog.ethereum.org/2016/11/18/hard-fork-no-4-spurious-dragon), la bifurcación dura Spurious Dragon introdujo el [EIP-170](https://eips.ethereum.org/EIPS/eip-170), que añadió un límite de tamaño para los contratos inteligentes de 24.576 bytes (24 KiB). Para usted, como desarrollador de Solidity, esto significa que cuando añade más y más funcionalidad a su contrato, en algún momento alcanzará el límite y el compilador le advertirá:

`Warning: Contract code size is 25000 bytes and exceeds 24576 bytes (a limit introduced in Spurious Dragon). This contract may not be deployable on Mainnet. Consider enabling the optimizer (with a low "runs" value!), turning off revert strings, or using libraries.`

Existe una advertencia similar para el código de despliegue (initcode), que el [EIP-3860](https://eips.ethereum.org/EIPS/eip-3860) limitó a 49.152 bytes en la actualización Shanghái.

El límite no es permanente. El [EIP-7954](https://eips.ethereum.org/EIPS/eip-7954) lo eleva a 65.536 bytes (64 KiB), y el límite del código de despliegue a 131.072 bytes, y está programado para la [actualización Glamsterdam](/roadmap/glamsterdam/). Hasta que esa actualización se active en la red en la que despliega, 24.576 bytes es el límite allí, e incluso después, los contratos más pequeños siguen siendo más baratos de desplegar y más fáciles de auditar.

Este límite se introdujo para prevenir ataques de denegación de servicio (DOS). Cualquier llamada a un contrato es relativamente barata en términos de gas. Sin embargo, el impacto de una llamada a un contrato para los nodos de Ethereum aumenta de manera desproporcionada dependiendo del tamaño del código del contrato llamado (leer el código del disco, preprocesar el código, añadir datos a la prueba de Merkle). Siempre que se da una situación en la que el atacante requiere pocos recursos para causar mucho trabajo a otros, existe el potencial de ataques DOS.

Originalmente, esto era un problema menor porque un límite natural del tamaño del contrato es el límite de gas del bloque. Obviamente, un contrato debe desplegarse dentro de una transacción que contenga todo el código de bytes del contrato. Si incluye solo esa transacción en un bloque, puede agotar todo ese gas, pero no es infinito. Hoy en día, el límite de gas del bloque es de decenas de millones de gas y los validadores lo han aumentado varias veces, por lo que por sí solo permitiría contratos muy grandes. Desde la [actualización Fusaka](/roadmap/fusaka/), una sola transacción también está limitada a 16.777.216 de gas ([EIP-7825](https://eips.ethereum.org/EIPS/eip-7825)), pero eso sigue estando muy por encima de lo que cuesta desplegar un contrato de 24 KiB, razón por la cual se necesita un límite de tamaño explícito.

A continuación, veremos algunos métodos ordenados por su impacto potencial. Piense en ello en términos de pérdida de peso. La mejor estrategia para que alguien alcance su peso objetivo (en nuestro caso, 24 kb) es centrarse primero en los métodos de gran impacto. En la mayoría de los casos, solo con arreglar su dieta lo conseguirá, pero a veces necesita un poco más. Entonces podría añadir algo de ejercicio (impacto medio) o incluso suplementos (impacto pequeño).

## Gran impacto {#big-impact}

### Separe sus contratos {#separate-your-contracts}

Este debería ser siempre su primer enfoque. ¿Cómo puede separar el contrato en varios más pequeños? Por lo general, le obliga a idear una buena arquitectura para sus contratos. Los contratos más pequeños siempre son preferibles desde la perspectiva de la legibilidad del código. Para dividir contratos, pregúntese:

- ¿Qué funciones pertenecen al mismo grupo? Cada conjunto de funciones podría estar mejor en su propio contrato.
- ¿Qué funciones no requieren leer el estado del contrato o solo un subconjunto específico del estado?
- ¿Puede dividir el almacenamiento y la funcionalidad?

### Bibliotecas {#libraries}

Una forma sencilla de alejar el código de funcionalidad del almacenamiento es usar una [biblioteca](https://docs.soliditylang.org/en/latest/contracts.html#libraries). No declare las funciones de la biblioteca como internas, ya que estas se [añadirán al contrato](https://ethereum.stackexchange.com/questions/12975/are-internal-functions-in-libraries-not-covered-by-linking) directamente durante la compilación. Pero si usa funciones públicas, entonces estas estarán de hecho en un contrato de biblioteca separado. Considere [using for](https://docs.soliditylang.org/en/latest/contracts.html#using-for) para hacer que el uso de bibliotecas sea más conveniente.

### Proxies {#proxies}

Una estrategia más avanzada sería un sistema de proxy. Las bibliotecas usan `DELEGATECALL` en segundo plano, lo que simplemente ejecuta la función de otro contrato con el estado del contrato que realiza la llamada. Consulte la [actualización de contratos inteligentes](/developers/docs/smart-contracts/upgrading/) para obtener más información sobre los sistemas de proxy. Le brindan más funcionalidad, por ejemplo, permiten la capacidad de actualización, pero también añaden mucha complejidad. No los añadiría solo para reducir el tamaño de los contratos a menos que sea su única opción por cualquier motivo.

## Impacto medio {#medium-impact}

### Eliminar funciones {#remove-functions}

Esto debería ser obvio. Las funciones aumentan bastante el tamaño de un contrato.

- **Externas**: A menudo añadimos muchas funciones de vista (view) por razones de conveniencia. Eso está perfectamente bien hasta que alcanza el límite de tamaño. Entonces es posible que desee pensar seriamente en eliminar todas excepto las absolutamente esenciales.
- **Internas**: También puede eliminar funciones internas/privadas y simplemente integrar el código en línea (inline) siempre y cuando la función se llame solo una vez.

### Evitar variables adicionales {#avoid-additional-variables}

```solidity
struct MyStruct {
    address addr1;
    address addr2;
}

mapping(uint => MyStruct) myStructs;

function get(uint id) public view returns (address, address) {
    MyStruct memory myStruct = myStructs[id];
    return (myStruct.addr1, myStruct.addr2);
}
```

```solidity
function get(uint id) public view returns (address, address) {
    return (myStructs[id].addr1, myStructs[id].addr2);
}
```

Un cambio simple como este supuso una diferencia de **0,28 kb** cuando se escribió este artículo. El ahorro exacto depende de la versión y la configuración de su compilador (con Solidity 0.8.37 es de aproximadamente 0,1 kb sin el optimizador y mucho menos con él), así que mida siempre. Lo más probable es que pueda encontrar muchas situaciones similares en sus contratos y estas realmente pueden sumar cantidades significativas.

### Acortar el mensaje de error {#shorten-error-message}

Los mensajes largos al revertir y, en particular, muchos mensajes diferentes al revertir pueden inflar el contrato. En su lugar, use códigos de error cortos y decodifíquelos en su contrato. Un mensaje largo podría volverse mucho más corto:

```solidity
require(msg.sender == owner, "Only the owner of this contract can call this function");
```

```solidity
require(msg.sender == owner, "OW1");
```

### Usar errores personalizados en lugar de mensajes de error {#use-custom-errors-instead-of-error-messages}

Los errores personalizados se introdujeron en [Solidity 0.8.4](https://blog.soliditylang.org/2021/04/21/custom-errors/). Son una excelente manera de reducir el tamaño de sus contratos, porque se codifican en ABI como selectores (al igual que las funciones).

```solidity
error Unauthorized();

function doSomething() public view {
    if (msg.sender != owner) {
        revert Unauthorized();
    }
}
```

### Considerar un valor de ejecución bajo en el optimizador {#consider-a-low-run-value-in-the-optimizer}

También puede cambiar la configuración del optimizador. El valor predeterminado de 200 significa que intenta optimizar el código de bytes como si una función se llamara 200 veces. Si lo cambia a 1, básicamente le dice al optimizador que optimice para el caso de ejecutar cada función solo una vez. Una función optimizada para ejecutarse solo una vez significa que está optimizada para el despliegue en sí. Tenga en cuenta que **esto aumenta los [costos de gas](/developers/docs/gas/) por ejecutar las funciones**, por lo que es posible que no desee hacerlo. Si compila con `viaIR` habilitado, compruebe el tamaño con y sin él, ya que el generador de código basado en IR puede producir tamaños de código de bytes notablemente diferentes. Consulte las [opciones del optimizador](https://docs.soliditylang.org/en/latest/using-the-compiler.html#optimizer-options) para obtener más detalles.

## Impacto pequeño {#small-impact}

### Evitar pasar estructuras a funciones {#avoid-passing-structs-to-functions}

Si está utilizando el [codificador ABI v2](https://docs.soliditylang.org/en/latest/layout-of-source-files.html#abi-coder-pragma) (el predeterminado desde Solidity 0.8.0), puede ser útil no pasar estructuras (structs) a una función. En lugar de pasar el parámetro como una estructura, pase los parámetros requeridos directamente. En este ejemplo ahorramos otros **0,1 kb**.

```solidity
function get(uint id) public view returns (address, address) {
    return _get(myStructs[id]);
}

function _get(MyStruct memory myStruct) private pure returns (address, address) {
    return (myStruct.addr1, myStruct.addr2);
}
```

```solidity
function get(uint id) public view returns (address, address) {
    return _get(myStructs[id].addr1, myStructs[id].addr2);
}

function _get(address addr1, address addr2) private pure returns (address, address) {
    return (addr1, addr2);
}
```

### Declarar la visibilidad correcta para funciones y variables {#declare-correct-visibility-for-functions-and-variables}

- ¿Funciones o variables que solo se llaman desde el exterior? Declárelas como `external` en lugar de `public`.
- ¿Funciones o variables que solo se llaman desde dentro del contrato? Declárelas como `private` o `internal` en lugar de `public`.

### Eliminar modificadores {#remove-modifiers}

Los modificadores, especialmente cuando se usan intensamente, podrían tener un impacto significativo en el tamaño del contrato. Considere eliminarlos y en su lugar usar funciones.

```solidity
modifier checkStuff() {
    require(msg.sender == owner, "OW1");
    _;
}

function doSomething() public checkStuff {}
```

```solidity
function checkStuff() private view {
    require(msg.sender == owner, "OW1");
}

function doSomething() public view {
    checkStuff();
}
```

Estos consejos deberían ayudarle a reducir significativamente el tamaño del contrato. Una vez más, no puedo enfatizar lo suficiente, céntrese siempre en dividir los contratos si es posible para lograr el mayor impacto.
