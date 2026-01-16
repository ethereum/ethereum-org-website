---
title: "Explicación de las especificaciones de la EVM del Yellow Paper"
description: "Explicación de la parte del Yellow Paper, las especificaciones formales de Ethereum, que explica la máquina virtual de Ethereum (EVM)."
author: "qbzzt"
tags: [ "evm" ]
skill: intermediate
lang: es
published: 2022-05-15
---

[El Yellow Paper](https://ethereum.github.io/yellowpaper/paper.pdf) es la especificación formal de Ethereum. Excepto donde se modifique por el [proceso de EIP](/eips/), contiene la descripción exacta de cómo funciona todo. Está escrito como un documento matemático, que incluye terminología con la que los programadores podrían no estar familiarizados. En este documento aprenderá a leerlo y, por extensión, otros documentos matemáticos relacionados.

## ¿Qué Yellow Paper? {#which-yellow-paper}

Como casi todo en Ethereum, el Yellow Paper evoluciona con el tiempo. Para poder hacer referencia a una versión específica, he subido [la versión actual en el momento de la redacción](yellow-paper-berlin.pdf). Los números de sección, página y ecuación que utilizo se referirán a esa versión. Es una buena idea tenerlo abierto en una ventana diferente mientras lee este documento.

### ¿Por qué la EVM? {#why-the-evm}

El Yellow Paper original se escribió justo al principio del desarrollo de Ethereum. Describe el mecanismo de consenso original basado en la prueba de trabajo que se utilizó originalmente para asegurar la red. Sin embargo, Ethereum dejó de usar la prueba de trabajo y comenzó a utilizar el consenso basado en la prueba de participación en septiembre de 2022. Este tutorial se centrará en las partes del Yellow Paper que definen la Máquina Virtual de Ethereum. La EVM no resultó modificada por la transición a la prueba de participación (a excepción del valor de retorno del código de operación DIFFICULTY).

## 9 Modelo de ejecución {#9-execution-model}

Esta sección (p. 12-14) incluye la mayor parte de la definición de la EVM.

El término _estado del sistema_ incluye todo lo que necesita saber sobre el sistema para ejecutarlo. En una computadora típica, esto significa la memoria, el contenido de los registros, etc.

Una [máquina de Turing](https://en.wikipedia.org/wiki/Turing_machine) es un modelo computacional. Esencialmente, es una versión simplificada de una computadora que, según se ha probado, cuenta con la misma capacidad de realizar cálculos que una computadora normal (todo lo que una computadora puede calcular una máquina de Turing puede calcular y viceversa). Este modelo facilita probar varios teoremas sobre qué es y qué no es computable.

El término [Turing-complete](https://en.wikipedia.org/wiki/Turing_completeness) significa una computadora que puede ejecutar los mismos cálculos que una máquina de Turing. Las máquinas de Turing pueden entrar en bucles infinitos, y la EVM no puede porque se quedaría sin gas, por lo que es solo cuasi-Turing-complete.

## 9.1 Conceptos básicos {#91-basics}

Esta sección proporciona los fundamentos básicos de la EVM y cómo se compara con otros modelos computacionales.

Una [máquina de pila](https://en.wikipedia.org/wiki/Stack_machine) es una computadora que almacena datos intermedios no en registros, sino en una [**pila**](https://en.wikipedia.org/wiki/Stack_\(abstract_data_type\)). Esta es la arquitectura preferida para las máquinas virtuales porque es fácil de implementar, lo que significa que los errores y las vulnerabilidades de seguridad son mucho menos probables. La memoria en la pila se divide en palabras de 256 bits. Esto se eligió porque es conveniente para las operaciones criptográficas centrales de Ethereum como el hash Keccak-256 y los cómputos de curva elíptica. El tamaño máximo de la pila es de 1024 elementos (1024 x 256 bits). Cuando se ejecutan los códigos de operación, normalmente obtienen sus parámetros de la pila. Hay códigos de operación específicos para reorganizar elementos en la pila, tales como `POP` (elimina el elemento de la parte superior de la pila), `DUP_N` (duplica el enésimo elemento en la pila), etc.

La EVM también tiene un espacio volátil llamado **memoria** que se utiliza para almacenar datos durante la ejecución. Esta memoria está organizada en palabras de 32 bytes. Todas las ubicaciones de memoria se inicializan a cero. Si ejecuta este código de [Yul](https://docs.soliditylang.org/en/latest/yul.html) para agregar una palabra a la memoria, llenará 32 bytes de memoria rellenando el espacio vacío de la palabra con ceros, es decir, crea una palabra con ceros en las ubicaciones 0-29, 0x60 en la 30 y 0xA7 en la 31.

```yul
mstore(0, 0x60A7)
```

`mstore` es uno de los tres códigos de operación que la EVM proporciona para interactuar con la memoria: carga una palabra en la memoria. Los otros dos son `mstore8`, que carga un solo byte en la memoria, y `mload`, que mueve una palabra de la memoria a la pila.

La EVM también tiene un modelo de **almacenamiento** no volátil separado que se mantiene como parte del estado del sistema; esta memoria se organiza en matrices de palabras (a diferencia de las matrices de bytes direccionables por palabras en la pila). Este almacenamiento es donde los contratos guardan datos persistentes; un contrato solo puede interactuar con su propio almacenamiento. El almacenamiento se organiza en asignaciones de clave-valor.

Aunque no se menciona en esta sección del Yellow Paper, también es útil saber que existe un cuarto tipo de memoria. **Calldata** es una memoria de solo lectura direccionable por bytes que se utiliza para almacenar el valor pasado con el parámetro `data` de una transacción. La EVM tiene códigos de operación específicos para gestionar `calldata`. `calldatasize` devuelve el tamaño de los datos. `calldataload` carga los datos en la pila. `calldatacopy` copia los datos en la memoria.

La [arquitectura de Von Neumann](https://en.wikipedia.org/wiki/Von_Neumann_architecture) estándar almacena el código y los datos en la misma memoria. La EVM no sigue este estándar por razones de seguridad: compartir memoria volátil hace posible cambiar el código del programa. En su lugar, el código se guarda en el almacenamiento.

Solo hay dos casos en los que el código se ejecuta desde la memoria:

- Cuando un contrato crea otro contrato (usando [`CREATE`](https://www.evm.codes/#f0) o [`CREATE2`](https://www.evm.codes/#f5)), el código del constructor del contrato proviene de la memoria.
- Durante la creación de _cualquier_ contrato, el código del constructor se ejecuta y luego devuelve el código del contrato real, también desde la memoria.

El término ejecución excepcional significa una excepción que provoca que la ejecución del contrato actual se detenga.

## 9.2 Resumen de las tarifas {#92-fees-overview}

Esta sección explica cómo se calculan las tarifas de gas. Hay tres costos:

### Costo del código de operación {#opcode-cost}

El costo inherente del código de operación específico. Para obtener este valor, busque el grupo de costo del código de operación en el Apéndice H (p. 28, bajo la ecuación (327)) y busque el grupo de costo en la ecuación (324). Esto le proporcionará una función de costo, que en la mayoría de los casos utiliza parámetros del Apéndice G (p. 27).

Por ejemplo, el código de operación [`CALLDATACOPY`](https://www.evm.codes/#37) es un miembro del grupo _W<sub>copy</sub>_. El costo del código de operación para ese grupo es _G<sub>verylow</sub>+G<sub>copy</sub>×⌈μ<sub>s</sub>[2]÷32⌉_. Al mirar el Apéndice G, vemos que ambas constantes son 3, lo que nos da _3+3×⌈μ<sub>s</sub>[2]÷32⌉_.

Todavía necesitamos descifrar la expresión _⌈μ<sub>s</sub>[2]÷32⌉_. La parte más externa, _⌈ \<valor\> ⌉_ es la función techo, una función que, dado un valor, devuelve el entero más pequeño que no es menor que el valor. Por ejemplo, _⌈2.5⌉ = ⌈3⌉ = 3_. La parte interna es _μ<sub>s</sub>[2]÷32_. Al mirar la sección 3 (Convenciones) en la p. 3, _μ_ es el estado de la máquina. El estado de la máquina se define en la sección 9.4.1 en la p. 13. Según esa sección, uno de los parámetros de estado de la máquina es _s_ para la pila. En conjunto, parece que _μ<sub>s</sub>[2]_ es la ubicación n.º 2 en la pila. Al observar [el código de operación](https://www.evm.codes/#37), la ubicación n.º 2 en la pila es el tamaño de los datos en bytes. Al observar los otros códigos de operación del grupo W<sub>copy</sub>, [`CODECOPY`](https://www.evm.codes/#39) y [`RETURNDATACOPY`](https://www.evm.codes/#3e), también tienen un tamaño de datos en la misma ubicación. Así que _⌈μ<sub>s</sub>[2]÷32⌉_ es el número de palabras de 32 bytes necesarias para almacenar los datos que se están copiando. En resumen, el coste inherente de [`CALLDATACOPY`](https://www.evm.codes/#37) es de 3 de gas más 3 por cada palabra de datos que se copia.

### Costo de ejecución {#running-cost}

El costo de ejecutar el código al que estamos llamando.

- En el caso de [`CREATE`](https://www.evm.codes/#f0) y [`CREATE2`](https://www.evm.codes/#f5), el constructor del nuevo contrato.
- En el caso de [`CALL`](https://www.evm.codes/#f1), [`CALLCODE`](https://www.evm.codes/#f2), [`STATICCALL`](https://www.evm.codes/#fa) o [`DELEGATECALL`](https://www.evm.codes/#f4), el contrato que llamamos.

### Costo de expansión de la memoria {#expanding-memory-cost}

El costo de expandir la memoria (si es necesario).

En la ecuación 324, este valor se escribe como _C<sub>mem</sub>(μ<sub>i</sub>')-C<sub>mem</sub>(μ<sub>i</sub>)_. Mirando de nuevo la sección 9.4.1, vemos que _μ<sub>i</sub>_ es el número de palabras en la memoria. Por lo tanto, _μ<sub>i</sub>_ es el número de palabras en la memoria antes del código de operación y _μ<sub>i</sub>'_ es el número de palabras en la memoria después del código de operación.

La función _C<sub>mem</sub>_ se define en la ecuación 326: _C<sub>mem</sub>(a) = G<sub>memory</sub> × a + ⌊a<sup>2</sup> ÷ 512⌋_. _⌊x⌋_ es la función suelo, una función que, dado un valor, devuelve el entero más grande que no es mayor que el valor. Por ejemplo, _⌊2.5⌋ = ⌊2⌋ = 2._ Cuando _a < √512_, _a<sup>2</sup> < 512_, y el resultado de la función suelo es cero. Así, para las primeras 22 palabras (704 bytes), el costo aumenta linealmente con el número de palabras de memoria requeridas. Más allá de ese punto _⌊a<sup>2</sup> ÷ 512⌋_ es positivo. Cuando la memoria requerida es lo suficientemente alta, el costo de gas es proporcional al cuadrado de la cantidad de memoria.

**Nota**: estos factores solo influyen en el costo _inherente_ del gas; no tienen en cuenta el mercado de tarifas ni las propinas a los validadores que determinan cuánto debe pagar un usuario final. Este es solo el costo bruto de ejecutar una operación particular en la EVM.

[Lea más sobre el gas](/developers/docs/gas/).

## 9.3 Entorno de ejecución {#93-execution-env}

El entorno de ejecución es una tupla, _I_, que incluye información que no forma parte del estado de la cadena de bloques ni de la EVM.

| Parámetro       | Código de operación para acceder a los datos                                                                             | Código de Solidity para acceder a los datos              |
| --------------- | ------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------- |
| _I<sub>a</sub>_ | [`ADDRESS`](https://www.evm.codes/#30)                                                                                   | `address(this)`                                          |
| _I<sub>o</sub>_ | [`ORIGIN`](https://www.evm.codes/#32)                                                                                    | `tx.origin`                                              |
| _I<sub>p</sub>_ | [`GASPRICE`](https://www.evm.codes/#3a)                                                                                  | `tx.gasprice`                                            |
| _I<sub>d</sub>_ | [`CALLDATALOAD`](https://www.evm.codes/#35), etc.                                                        | `msg.data`                                               |
| _I<sub>s</sub>_ | [`CALLER`](https://www.evm.codes/#33)                                                                                    | `msg.sender`                                             |
| _I<sub>v</sub>_ | [`CALLVALUE`](https://www.evm.codes/#34)                                                                                 | `msg.value`                                              |
| _I<sub>b</sub>_ | [`CODECOPY`](https://www.evm.codes/#39)                                                                                  | `address(this).code`                                     |
| _I<sub>H</sub>_ | Campos de la cabecera del bloque, como [`NUMBER`](https://www.evm.codes/#43) y [`DIFFICULTY`](https://www.evm.codes/#44) | `block.number`, `block.difficulty`, etc. |
| _I<sub>e</sub>_ | Profundidad de la pila de llamadas para llamadas entre contratos (incluida la creación de contratos)  |                                                          |
| _I<sub>w</sub>_ | ¿Se le permite a la EVM cambiar de estado o se está ejecutando de forma estática?                                        |                                                          |

Algunos otros parámetros son necesarios para entender el resto de la sección 9:

| Parámetro | Definido en la sección                                         | Significado                                                                                                                                                                                                                                                                                                          |
| --------- | -------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| _σ_       | 2 (p. 2, ecuación 1)        | El estado de la cadena de bloques                                                                                                                                                                                                                                                                                    |
| _g_       | 9.3 (p. 13) | Gas restante                                                                                                                                                                                                                                                                                                         |
| _A_       | 6.1 (p. 8)  | Subestado acumulado (cambios programados para cuando finalice la transacción)                                                                                                                                                                                                                     |
| _o_       | 9.3 (p. 13) | Salida: el resultado devuelto en el caso de una transacción interna (cuando un contrato llama a otro) y llamadas a funciones de visualización (cuando solo está pidiendo información, por lo que no hay necesidad de esperar una transacción). |

## 9.4 Resumen de la ejecución {#94-execution-overview}

Ahora que tenemos todos los preliminares, podemos finalmente empezar a ver cómo funciona la EVM.

Las ecuaciones 137-142 nos dan las condiciones iniciales para ejecutar la EVM:

| Símbolo          | Valor inicial                                                                    | Significado                                                                                                                                                                                                                                                                                                              |
| ---------------- | -------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| _μ<sub>g</sub>_  | _g_                                                                              | Gas restante                                                                                                                                                                                                                                                                                                             |
| _μ<sub>pc</sub>_ | _0_                                                                              | Contador de programa, la dirección de la siguiente instrucción a ejecutar                                                                                                                                                                                                                                                |
| _μ<sub>m</sub>_  | _(0, 0, ...)_ | Memoria, inicializada a todo ceros                                                                                                                                                                                                                                                                                       |
| _μ<sub>i</sub>_  | _0_                                                                              | Ubicación de memoria más alta utilizada                                                                                                                                                                                                                                                                                  |
| _μ<sub>s</sub>_  | _()_                                                          | La pila, inicialmente vacía                                                                                                                                                                                                                                                                                              |
| _μ<sub>o</sub>_  | _∅_                                                                              | La salida, conjunto vacío hasta y a menos que nos detengamos con datos de retorno ([`RETURN`](https://www.evm.codes/#f3) o [`REVERT`](https://www.evm.codes/#fd)) o sin ellos ([`STOP`](https://www.evm.codes/#00) o [`SELFDESTRUCT`](https://www.evm.codes/#ff)). |

La ecuación 143 nos dice que hay cuatro condiciones posibles en cada momento durante la ejecución y qué hacer con ellas:

1. `Z(σ,μ,A,I)`. Z representa una función que comprueba si una operación crea una transición de estado no válida (véase [detención excepcional](#942-exceptional-halting)). Si se evalúa como Verdadero, el nuevo estado es idéntico al antiguo (excepto que se quema gas) porque los cambios no se han implementado.
2. Si el código de operación que se está ejecutando es [`REVERT`](https://www.evm.codes/#fd), el nuevo estado es el mismo que el estado antiguo y se pierde algo de gas.
3. Si la secuencia de operaciones ha finalizado, como indica un [`RETURN`](https://www.evm.codes/#f3)), el estado se actualiza al nuevo estado.
4. Si no estamos en una de las condiciones finales 1-3, se continúa la ejecución.

## 9.4.1 Estado de la máquina {#941-machine-state}

Esta sección explica el estado de la máquina con más detalle. Especifica que _w_ es el código de operación actual. Si _μ<sub>pc</sub>_ es menor que _||I<sub>b</sub>||_, la longitud del código, entonces ese byte (_I<sub>b</sub>[μ<sub>pc</sub>]_) es el código de operación. De lo contrario, el código de operación se define como [`STOP`](https://www.evm.codes/#00).

Como se trata de una [máquina de pila](https://en.wikipedia.org/wiki/Stack_machine), necesitamos hacer un seguimiento del número de elementos extraídos (_δ_) e introducidos (_α_) por cada código de operación.

## 9.4.2 Detención excepcional {#942-exceptional-halt}

Esta sección define la función _Z_, que especifica cuándo tenemos una terminación anormal. Esta es una función [booleana](https://en.wikipedia.org/wiki/Boolean_data_type), por lo que utiliza [_∨_ para un O lógico](https://en.wikipedia.org/wiki/Logical_disjunction) y [_∧_ para un Y lógico](https://en.wikipedia.org/wiki/Logical_conjunction).

Tenemos una detención excepcional si alguna de estas condiciones es verdadera:

- **_μ<sub>g</sub> < C(σ,μ,A,I)_**
  Como vimos en la sección 9.2, _C_ es la función que especifica el costo de gas. No queda suficiente gas para cubrir el siguiente código de operación.

- **_δ<sub>w</sub>=∅_**
  Si el número de elementos extraídos para un código de operación no está definido, entonces el propio código de operación no está definido.

- **_|| μ<sub>s</sub> || < δ<sub>w</sub>_**
  Subdesbordamiento de pila, no hay suficientes elementos en la pila para el código de operación actual.

- **_w = JUMP ∧ μ<sub>s</sub>[0]∉D(I<sub>b</sub>)_**
  El código de operación es [`JUMP`](https://www.evm.codes/#56) y la dirección no es un [`JUMPDEST`](https://www.evm.codes/#5b). Los saltos _solo_ son válidos cuando el destino es un [`JUMPDEST`](https://www.evm.codes/#5b).

- **_w = JUMPI ∧ μ<sub>s</sub>[1]≠0 ∧ μ<sub>s</sub>[0] ∉ D(I<sub>b</sub>)_**
  El código de operación es [`JUMPI`](https://www.evm.codes/#57), la condición es verdadera (distinta de cero), por lo que el salto debería ocurrir, y la dirección no es un [`JUMPDEST`](https://www.evm.codes/#5b). Los saltos _solo_ son válidos cuando el destino es un [`JUMPDEST`](https://www.evm.codes/#5b).

- **_w = RETURNDATACOPY ∧ μ<sub>s</sub>[1]+μ<sub>s</sub>[2]>|| μ<sub>o</sub> ||_**
  El código de operación es [`RETURNDATACOPY`](https://www.evm.codes/#3e). En este código de operación, el elemento de la pila _μ<sub>s</sub>[1]_ es el desplazamiento desde el que se lee en el búfer de datos de retorno, y el elemento de la pila _μ<sub>s</sub>[2]_ es la longitud de los datos. Esta condición se produce cuando se intenta leer más allá del final del búfer de datos de retorno. Tenga en cuenta que no hay una condición similar para `calldata` o para el propio código. Cuando intenta leer más allá del final de esos búferes, solo obtiene ceros.

- **_|| μ<sub>s</sub> || - δ<sub>w</sub> + α<sub>w</sub> > 1024_**

  Desbordamiento de pila. Si la ejecución del código de operación da como resultado una pila de más de 1024 elementos, se aborta.

- **_¬I<sub>w</sub> ∧ W(w,μ)_**
  ¿Estamos ejecutando de forma estática ([¬ es negación](https://en.wikipedia.org/wiki/Negation) e _I<sub>w</sub>_ es verdadero cuando se nos permite cambiar el estado de la cadena de bloques)? Si es así, y estamos intentando una operación que cambia el estado, no puede ocurrir.

  La función _W(w,μ)_ se define más adelante en la ecuación 150. _W(w,μ)_ es verdadero si una de estas condiciones es verdadera:

  - **_w ∈ \{CREATE, CREATE2, SSTORE, SELFDESTRUCT}_**
    Estos códigos de operación cambian el estado, ya sea creando un nuevo contrato, almacenando un valor o destruyendo el contrato actual.

  - **_LOG0≤w ∧ w≤LOG4_**
    Si se nos llama de forma estática, no podemos emitir entradas de registro.
    Los códigos de operación de registro están todos en el rango entre [`LOG0` (A0)](https://www.evm.codes/#a0) y [`LOG4` (A4)](https://www.evm.codes/#a4).
    El número después del código de operación del registro especifica cuántos temas contiene la entrada del registro.

  - **_w=CALL ∧ μ<sub>s</sub>[2]≠0_**
    Puede llamar a otro contrato cuando está en modo estático, but si lo hace no puede transferirle ETH.

- **_w = SSTORE ∧ μ<sub>g</sub> ≤ G<sub>callstipend</sub>_**
  No puede ejecutar [`SSTORE`](https://www.evm.codes/#55) a menos que tenga más de G<sub>callstipend</sub> (definido como 2300 en el Apéndice G) de gas.

## 9.4.3 Validez del destino del salto {#943-jump-dest-valid}

Aquí definimos formalmente qué son los códigos de operación [`JUMPDEST`](https://www.evm.codes/#5b). No podemos simplemente buscar el valor de byte 0x5B, porque podría estar dentro de un PUSH (y por lo tanto ser datos y no un código de operación).

En la ecuación (153) definimos una función, _N(i,w)_. El primer parámetro, _i_, es la ubicación del código de operación. El segundo, _w_, es el propio código de operación. Si _w∈[PUSH1, PUSH32]_ significa que el código de operación es un PUSH (los corchetes definen un rango que incluye los puntos finales). En ese caso, el siguiente código de operación está en _i+2+(w−PUSH1)_. Para [`PUSH1`](https://www.evm.codes/#60) necesitamos avanzar dos bytes (el propio PUSH y el valor de un byte), para [`PUSH2`](https://www.evm.codes/#61) necesitamos avanzar tres bytes porque es un valor de dos bytes, etc. Todos los demás códigos de operación de la EVM tienen solo un byte de longitud, por lo que en todos los demás casos _N(i,w)=i+1_.

Esta función se utiliza en la ecuación (152) para definir _D<sub>J</sub>(c,i)_, que es el [conjunto](https://en.wikipedia.org/wiki/Set_\(mathematics\)) de todos los destinos de salto válidos en el código _c_, comenzando en la ubicación del código de operación _i_. Esta función se define de forma recursiva. Si _i≥||c||_, significa que estamos al final del código o después. No vamos a encontrar más destinos de salto, así que simplemente devolvemos el conjunto vacío.

En todos los demás casos, miramos el resto del código yendo al siguiente código de operación y obteniendo el conjunto que comienza a partir de él. _c[i]_ es el código de operación actual, por lo que _N(i,c[i])_ es la ubicación del siguiente código de operación. _D<sub>J</sub>(c,N(i,c[i]))_ es, por lo tanto, el conjunto de destinos de salto válidos que comienza en el siguiente código de operación. Si el código de operación actual no es un `JUMPDEST`, simplemente devuelva ese conjunto. Si es `JUMPDEST`, inclúyalo en el conjunto de resultados y devuélvalo.

## 9.4.4 Detención normal {#944-normal-halt}

La función de detención _H_, puede devolver tres tipos de valores.

- Si no estamos en un código de operación de detención, devuelve _∅_, el conjunto vacío. Por convención, este valor se interpreta como Booleano falso.
- Si tenemos un código de operación de detención que no produce una salida (ya sea [`STOP`](https://www.evm.codes/#00) o [`SELFDESTRUCT`](https://www.evm.codes/#ff)), devuelve una secuencia de cero bytes de tamaño como valor de retorno. Tenga en cuenta que esto es muy diferente del conjunto vacío. Este valor significa que la EVM realmente se detuvo, solo que no hay datos de retorno para leer.
- Si tenemos un código de operación de detención que produce una salida (ya sea [`RETURN`](https://www.evm.codes/#f3) o [`REVERT`](https://www.evm.codes/#fd)), devuelve la secuencia de bytes especificada por ese código de operación. Esta secuencia se toma de la memoria, el valor en la parte superior de la pila (_μ<sub>s</sub>[0]_) es el primer byte, y el valor que le sigue (_μ<sub>s</sub>[1]_) es la longitud.

## H.2 Conjunto de instrucciones {#h2-instruction-set}

Antes de pasar a la subsección final de la EVM, 9.5, veamos las instrucciones en sí. Se definen en el Apéndice H.2, que comienza en la p. 29. Se espera que todo lo que no se especifique que cambie con ese código de operación específico permanezca igual. Las variables que sí cambian se especifican como \<algo\>′.

Por ejemplo, veamos el código de operación [`ADD`](https://www.evm.codes/#01).

| Valor | Mnemónico | δ | α | Descripción                                                                                                                                                                                                           |
| ----: | --------- | - | - | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|  0x01 | ADD       | 2 | 1 | Operación de suma.                                                                                                                                                                                    |
|       |           |   |   | _μ′<sub>s</sub>[0] ≡ μ<sub>s</sub>[0] + μ<sub>s</sub>[1]_ |

_δ_ es el número de valores que extraemos de la pila. En este caso dos, porque estamos sumando los dos valores superiores.

_α_ es el número de valores que reintroducimos. En este caso uno, la suma.

Por lo tanto, el nuevo tope de la pila (_μ′<sub>s</sub>[0]_) es la suma del antiguo tope de la pila (_μ<sub>s</sub>[0]_) y el valor antiguo debajo de él (_μ<sub>s</sub>[1]_).

En lugar de repasar todos los códigos de operación con una "lista que hace que se pongan los ojos en blanco", este artículo explica solo aquellos códigos de operación que introducen algo nuevo.

| Valor | Mnemónico | δ | α | Descripción                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| ----: | --------- | - | - | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|  0x20 | KECCAK256 | 2 | 1 | Calcular el hash Keccak-256.                                                                                                                                                                                                                                                                                                                                                                                                                         |
|       |           |   |   | _μ′<sub>s</sub>[0] ≡ KEC(μ<sub>m</sub>[μ<sub>s</sub>[0] . . . (μ<sub>s</sub>[0] + μ<sub>s</sub>[1] − 1)])_ |
|       |           |   |   | _μ′<sub>i</sub> ≡ M(μ<sub>i</sub>,μ<sub>s</sub>[0],μ<sub>s</sub>[1])_                                                                                                                                                                                                                                                                     |

Este es el primer código de operación que accede a la memoria (en este caso, solo de lectura). Sin embargo, podría expandirse más allá de los límites actuales de la memoria, por lo que necesitamos actualizar _μ<sub>i</sub>_. Hacemos esto usando la función _M_ definida en la ecuación 328 en la p. 29.

| Valor | Mnemónico | δ | α | Descripción                                         |
| ----: | --------- | - | - | --------------------------------------------------- |
|  0x31 | BALANCE   | 1 | 1 | Obtener el saldo de la cuenta dada. |
|       |           |   |   | ... |

La dirección cuyo saldo necesitamos encontrar es _μ<sub>s</sub>[0] mod 2<sup>160</sup>_. El tope de la pila es la dirección, pero como las direcciones son de solo 160 bits, calculamos el valor [módulo](https://en.wikipedia.org/wiki/Modulo_operation) 2<sup>160</sup>.

Si _σ[μ<sub>s</sub>[0] mod 2<sup>160</sup>] ≠ ∅_, significa que hay información sobre esta dirección. En ese caso, _σ[μ<sub>s</sub>[0] mod 2<sup>160</sup>]<sub>b</sub>_ es el saldo para esa dirección. Si _σ[μ<sub>s</sub>[0] mod 2<sup>160</sup>] = ∅_, significa que esta dirección no está inicializada y el saldo es cero. Puede ver la lista de campos de información de la cuenta en la sección 4.1 de la p. 4.

La segunda ecuación, _A'<sub>a</sub> ≡ A<sub>a</sub> ∪ \{μ<sub>s</sub>[0] mod 2<sup>160</sup>}_, está relacionada con la diferencia en costo entre el acceso al almacenamiento caliente (almacenamiento al que se ha accedido recientemente y es probable que esté almacenado en caché) y el almacenamiento frío (almacenamiento al que no se ha accedido y es probable que esté en almacenamiento más lento que es más caro de recuperar). _A<sub>a</sub>_ es la lista de direcciones a las que la transacción ha accedido previamente, por lo que debería ser más barato acceder a ellas, como se define en la sección 6.1 en la p. 8. Puede leer más sobre este tema en [EIP-2929](https://eips.ethereum.org/EIPS/eip-2929).

| Valor | Mnemónico | δ  | α  | Descripción                                                                                                                                     |
| ----: | --------- | -- | -- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
|  0x8F | DUP16     | 16 | 17 | Duplicar el 16.º elemento de la pila.                                                                           |
|       |           |    |    | _μ′<sub>s</sub>[0] ≡ μ<sub>s</sub>[15]_ |

Tenga en cuenta que para usar cualquier elemento de la pila, necesitamos extraerlo (pop), lo que significa que también necesitamos extraer todos los elementos de la pila que están por encima de él. En el caso de [`DUP<n>`](https://www.evm.codes/#8f) y [`SWAP<n>`](https://www.evm.codes/#9f), esto significa tener que extraer (pop) y luego reintroducir (push) hasta dieciséis valores.

## 9.5 El ciclo de ejecución {#95-exec-cycle}

Ahora que tenemos todas las partes, finalmente podemos entender cómo se documenta el ciclo de ejecución de la EVM.

La ecuación (155) dice que, dado el estado:

- _σ_ (estado global de la cadena de bloques)
- _μ_ (estado de la EVM)
- _A_ (subestado, cambios que ocurrirán cuando la transacción termine)
- _I_ (entorno de ejecución)

El nuevo estado es _(σ', μ', A', I')_.

Las ecuaciones (156)-(158) definen la pila y el cambio en ella debido a un código de operación (_μ<sub>s</sub>_). La ecuación (159) es el cambio en el gas (_μ<sub>g</sub>_). La ecuación (160) es el cambio en el contador de programa (_μ<sub>pc</sub>_). Finalmente, las ecuaciones (161)-(164) especifican que los demás parámetros permanecen igual, a menos que el código de operación los cambie explícitamente.

Con esto, la EVM está completamente definida.

## Conclusión {#conclusion}

La notación matemática es precisa y ha permitido que el Yellow Paper especifique cada detalle de Ethereum. Sin embargo, tiene algunas desventajas:

- Solo puede ser entendido por humanos, lo que significa que las [pruebas de cumplimiento](https://github.com/ethereum/tests) deben escribirse manually.
- Los programadores entienden el código informático.
  Pueden o no entender la notación matemática.

Quizás por estas razones, las [especificaciones de la capa de consenso](https://github.com/ethereum/consensus-specs/blob/dev/tests/core/pyspec/README.md) más nuevas están escritas en Python. Hay [especificaciones de la capa de ejecución en Python](https://ethereum.github.io/execution-specs), pero no están completas. Hasta que todo el Yellow Paper se traduzca también a Python o a un lenguaje similar, el Yellow Paper seguirá en servicio, y es útil poder leerlo.
