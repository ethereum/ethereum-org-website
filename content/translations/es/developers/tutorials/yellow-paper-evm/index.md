---
title: Explicación de las especificaciones de la EVM del Yellow Paper
description: Explicación de la parte del Yellow Paper, las especificaciones formales de Ethereum, que explican la máquina virtual de Ethereum (EVM).
author: "qbzzt"
tags:
  - "evm"
skill: intermediate
lang: es
published: 2022-05-15
---

El [Yellow Paper](https://ethereum.github.io/yellowpaper/paper.pdf) es la especificación formal de Ethereum. Excepto donde esté modificado por el [proceso de EIP](/eips/), contiene la descripción exacta de cómo funciona todo. Está escrito como un papel matemático que incluye términos que podrían no ser tan familiares para los programadores. En este papel aprenderá cómo leerlo y, por extensión, otros papeles matemáticos relacionados.

## ¿Qué Yellow Paper? {#which-yellow-paper}

Como sucede con casi todo en Ethereum, el Yellow Paper evoluciona conforme avanza el tiempo. Para hacer referencia a una versión específica, he publicado [la versión actual al momento de escribir este artículo](yellow-paper-berlin.pdf). Los números de sección, página y ecuación que utilizo se referirán a esa versión. Es una buena idea tenerlo abierto en una ventana diferente mientras le este documento.

### ¿Por qué la EVM? {#why-the-evm}

La versión original del Yellow Paper se escribió al inicio del desarrollo de Ethereum. Describe el mecanismo de consenso original basado en prueba de trabajo que se usaba originalmente para asegurar la red. Sin embargo, Ethereum acabó con la prueba de trabajo y comenzó a utilizar el consenso basado en prueba de participación en septiembre de 2022. Este tutorial se enfocará en las partes del Yellow Paper que definen la Máquina Virtual de Ethereum (EVM). La EVM no resultó modificada por el cambio a la prueba de participación (a excepción del valor de retorno del código de operación DIFFICULTY).

## 9. Modelo de ejecución {#9-execution-model}

Esta sección (p. 12-14) incluye la mayor parte de la definición de la EVM.

El término _estado de sistema_ incluye todo lo que necesita saber sobre el sistema para ejecutarlo. En una computadora típica, esto significa la memoria, los registros de contenido, etc.

Una [máquina de Turing](https://en.wikipedia.org/wiki/Turing_machine) es un modelo computacional. Esencialmente, es una versión simplificada de una computadora que, según se ha probado, cuenta con la misma capacidad de realizar cálculos que una computadora normal (todo lo que una computadora puede calcular una máquina de Turing puede calcular y viceversa). Este modelo facilita probar varios teoremas sobre qué es y qué no es computable.

El término [Turing-complete](https://en.wikipedia.org/wiki/Turing_completeness) hace referencia a una computadora que puede realizar los mismos cálculos que una máquina de Turing. Las máquinas de Turing pueden entrar en bucles infinitos, y la EVM no, porque el gas se agotaría, por lo que sería solo quasi-Turing-complete.

## 9.1. Fundamentos básicos {#91-basics}

Esta sección proporciona los fundamentos básicos de la Máquina Virtual de Ethereum (EVM) y cómo se compara con otros modelos computacionales.

Una [máquina apiladora](https://en.wikipedia.org/wiki/Stack_machine), o stack machine, es una computadora que almacena datos intermedios no en registros, sino en una [**pila**](https://en.wikipedia.org/wiki/Stack_(abstract_data_type)). Esta es la arquitectura preferida para máquinas virtuales porque es sencilla de implementar, lo que significa que los errores y las vulnerabilidades de seguridad son menos probables. La memoria en la pila se divide en palabras de 256 bits. Esto se eligió porque es conveniente para las operaciones criptográficas centrales de Ethereum como el hash Keccak-256 y los cómputos de curva elíptica. El tamaño máximo de una pila es de 1024 bytes. Cuando se ejecutan códigos de operación (opcodes), estos usualmente reciben sus parámetros de la pila. Hay códigos de operación específicos para reorganizar elementos en la pila, tales como `POP` (elimina un objeto de la parte superior de la pila), `DUP_N` (elemento enésimo duplicado en la pila), etc.

La EVM también cuenta con un espacio volátil llamado **memoria** que es utilizado para almacenar datos durante la ejecución. Esta memoria está organizada en palabras de 32 bytes. Todas las ubicaciones de memoria están inicializadas en cero. Si ejecuta este código [Yul](https://docs.soliditylang.org/en/latest/yul.html) para agregar una palabra en la memoria, este completará 32 bytes de memoria rellenando el espacio vacío en la palabra con ceros, es decir, crea una palabra con ceros en las ubicaciones 0-29, 0x60 a 30 y 0xA7 a 31.

```yul
mstore(0, 0x60A7)
```

`mstore` es uno de los tres códigos de operación proporcionados por la EVM para interactuar con la memoria: carga una palabra en la memoria. Los otros dos son `mstore8`, que carga un único byte en la memoria, y `mload`, que mueve una palabra de la memoria a la pila.

La EVM también tiene un modelo de **almacenamiento** no volátil que es mantenido como parte del estado del sistema; esta memoria se organiza en conjuntos de palabras (a diferencia de las matrices de bytes direccionables por palabras en la pila). Este almacenamiento es donde los contratos guardan datos persistentes; un contrato solo puede interactuar con su propio almacenamiento. El almacenamiento se organiza en asignaciones o mapeos clave-valor.

Aunque no se menciona en esta sección del Yellow Paper, también es útil conocer que hay un cuarto tipo de memoria. **Calldata** es una memoria de solo lectura direccionable por bytes utilizada para almacenar el valor transmitido con el parámetro `data` de una transacción. La EVM tiene códigos de operación específicos para gestionar `calldata`. `calldatasize` devuelve el tamaño de los datos. `calldataload` carga los datos en la pila. `calldatacopy` copia los datos en la memoria.

La [arquitectura Von Neumann](https://en.wikipedia.org/wiki/Von_Neumann_architecture) estándar almacena código y datos en la misma memoria. La EVM no sigue este estándar por razones de seguridad: compartir memoria volátil hace posible el cambio del código del programa. En vez de eso, el código se guarda en el almacenamiento.

Solo hay dos casos donde el código es ejecutado desde la memoria:

- Cuando un contrato crea otro contrato (utilizando [`CREATE`](https://www.evm.codes/#f0) o [`CREATE2`](https://www.evm.codes/#f5)), el código para el constructor del contrato viene de la memoria.
- Durante la cración de _cualquier_ contrato, el código del constructor se ejecuta y luego devuelve el código del contrato real, también desde la memoria.

El término ejecución excepcional significa una excepción que hace que la ejecución del contrato actual se detenga.

## 9.2. Resumen de las tarifas {#92-fees-overview}

Esta sección explica cómo se calculan las tarifas de gas. Hay tres costos:

### Costo de códigos de operación {#opcode-cost}

El costo inherente del código de operación específico. Para obtener este valor, busque el grupo de costo del código de operación en el Apéndice H (p. 28, debajo de la ecuación (327)) y busque el grupo de costo en la ecuación (324). Esto le proporcionará una función de costo, que en la mayoría de los casos utiliza parámetros del Apéndice G (p. 27).

Por ejemplo, el código de operación [`CALLDATACOPY`](https://www.evm.codes/#37) es miembro del grupo _W<sub>copy</sub>_. El costo del código de operación para ese grupo es _G<sub>verylow</sub>+G<sub>copy</sub>×⌈μ<sub>s</sub>[2]÷32]_. Revisando el Apéndice G, podemos ver que ambas constantes son 3, lo que nos da _3+3×⌈μ<sub>s</sub>[2]÷32⌉_.

Todavía necesitamos descifrar la expresión _⌈μ<sub>s</sub>[2]÷32⌉_. La parte más externa, _⌈ \<value\> ⌉_, es la función de techo, una función que, al darle un valor, devuelve el entero más pequeño que no sea más pequeño que el valor. Por ejemplo, _⌈2.5⌉ = ⌈3⌉ = 3_. La parte interior es _μ<sub>s</sub>[2]÷32_. Viendo la sección 3 (Convenciones) en la p. 3, _μ_ es el estado de la máquina. El estado de la máquina es definido en la sección 9.4.1 de la p. 13. De acuerdo con esa sección, uno de los parámetros de estado de la máquina es _s_ para la pila. Al colocar todos juntos, parece que _μ<sub>s</sub>[2]_ es la posición n.º 2 en la pila. Viendo el [código de operación](https://www.evm.codes/#37), la posición 2 en la pila es el tamaño de los datos en bytes. Viendo los otros códigos de operación en el grupo W<sub>copy</sub>, [`CODECOPY`](https://www.evm.codes/#39) y [`RETURNDATACOPY`](https://www.evm.codes/#3e), también tienen un tamaño de datos en la misma ubicación. Entonces, _⌈μ<sub>s</sub>[2]÷32⌉_ es la cantidad de palabras de 32 bytes requerida para almacenar la información copiada. Colocando todo junto, el costo inherente de [`CALLDATACOPY`](https://www.evm.codes/#37) es de 3 gas más 3 por palabra de datos copiados.

### Costo de ejecución {#running-cost}

El costo de ejecutar el código que estamos llamando.

- En el caso de [`CREATE`](https://www.evm.codes/#f0) y [`CREATE2`](https://www.evm.codes/#f5), el constructor para el nuevo contrato.
- En el caso de [`CALL`](https://www.evm.codes/#f1), [`CALLCODE`](https://www.evm.codes/#f2), [`STATICCALL`](https://www.evm.codes/#fa) o [`DELEGATECALL`](https://www.evm.codes/#f4), el contrato que llamamos.

### Costo de expandir la memoria {#expanding-memory-cost}

El costo de expandir la memoria (si es necesario).

En la ecuación 324, este valor se escribe como _C<sub>mem</sub>(μ<sub>i</sub>')-C<sub>mem</sub>(μ<sub>i</sub>)_. Mirando la sección 9.4.1 nuevamente, vemos que _μ<sub>i</sub>_ es la cantidad de palabras en la memoria. Así que _μ<sub>i</sub>_ es la cantidad de palabras en la memoria antes del código de operación, y _μ<sub>i</sub>'_ es la cantidad de palabras en la memoria luego del código de operación.

La función _C<sub>mem</sub>_ es definida en la ecuación 326: _C<sub>mem</sub>(a) = G<sub>memory</sub> × a + ⌊a<sup>2</sup> ÷ 512⌋_. _⌊x⌋_ es la función de piso, una función que, al darle un valor, devuelve el entero más grande que no sea más grande que el valor. Por ejemplo, _⌊2.5⌋ = ⌊2⌋ = 2._ Cuando _a < √512_, _a<sup>2</sup> < 512_ y el resultado de la función de piso es cero. Así, para las primeras 22 palabras (704 bytes), el costo aumenta de manera lineal con la candidad requerida de palabras en la memoria. Más allá de ese punto, _⌊a<sup>2</sup> ÷ 512⌋_ es positivo. Cuando la memoria requerida es suficientemente alta, el costo del gas es proporcional a la cantidad de memoria elevada al cuadrado.

**Note** que estos factores solo influyen en el costo _inherente_ del gas; no se toman en cuenta el mercado de tarifas o las propinas a los validadores que determinan cuánto debe pagar el usuario final; esto es solo el costo bruto de ejecutar una operación en particular en la EVM.

[Más información sobre el gas](/developers/docs/gas/).

## 9.3. Entorno de ejecución {#93-execution-env}

El entorno de ejecución es una tupla, _I_, que incluye información que no es parte del estado de la cadena de bloques o la EVM.

| Parámetro       | Código de operación para acceder a los datos                                                                           | Código de Solidity para acceder a los datos |
| --------------- | ---------------------------------------------------------------------------------------------------------------------- | ------------------------------------------- |
| _I<sub>a</sub>_ | [`ADDRESS`](https://www.evm.codes/#30)                                                                                 | `address(this)`                             |
| _I<sub>o</sub>_ | [`ORIGIN`](https://www.evm.codes/#32)                                                                                  | `tx.origin`                                 |
| _I<sub>p</sub>_ | [`GASPRICE`](https://www.evm.codes/#3a)                                                                                | `tx.gasprice`                               |
| _I<sub>d</sub>_ | [`CALLDATALOAD`](https://www.evm.codes/#35), etc.                                                                      | `msg.data`                                  |
| _I<sub>s</sub>_ | [`CALLER`](https://www.evm.codes/#33)                                                                                  | `msg.sender`                                |
| _I<sub>v</sub>_ | [`CALLVALUE`](https://www.evm.codes/#34)                                                                               | `msg.value`                                 |
| _I<sub>b</sub>_ | [`CODECOPY`](https://www.evm.codes/#39)                                                                                | `address(this).code`                        |
| _I<sub>H</sub>_ | Campos de encabezado de bloque, como [`NUMBER`](https://www.evm.codes/#43) y [`DIFFICULTY`](https://www.evm.codes/#44) | `block.number`, `block.difficulty`, etc.    |
| _I<sub>e</sub>_ | Profundidad de la pila de llamadas para llamadas entre contratos (incluida la creación de contratos)                   |                                             |
| _I<sub>w</sub>_ | ¿La EVM tiene permitido cambiar de estado o se está ejecutando estáticamente?                                          |                                             |

Algunos otros parámetros son necesarios para comprender el resto de la sección 9:

| Parámetro | Definido en la sección | Significado                                                                                                                                                                                                                                      |
| --------- | ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| _σ_       | 2 (p. 2, ecuación 1)   | El estado de la cadena de bloques                                                                                                                                                                                                                |
| _g_       | 9.3 (p. 13)            | Gas restante                                                                                                                                                                                                                                     |
| _A_       | 6.1 (p. 8)             | Subestado acumulado (cambios programados para cuando la transacción finalice)                                                                                                                                                                    |
| _o_       | 9.3 (p. 13)            | Salida: el resultado devuelto en caso de transacción interna (cuando un contrato llama a otro) y llamadas a funciones de visualización (cuando simplemente pregunta por información, por lo que no hay necesidad de esperar por una transacción) |

## 9.4. Descripción general de ejecución {#94-execution-overview}

Ahora que tenemos todas las cuestiones preliminares, finalmente podemos empezar a trabajar en cómo funciona la EVM.

Las ecuaciones 137-142 nos brindan las condiciones iniciales para ejecutar la EVM:

| Símbolo          | Valor inicial | Significado                                                                                                                                                                                                                                                  |
| ---------------- | ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| _μ<sub>g</sub>_  | _g_           | Gas restante                                                                                                                                                                                                                                                 |
| _μ<sub>pc</sub>_ | _0_           | Contador del programa, la dirección de la siguiente instrucción a ejecutar                                                                                                                                                                                   |
| _μ<sub>m</sub>_  | _(0, 0, ...)_ | Memoria, inicializada en todos ceros                                                                                                                                                                                                                         |
| _μ<sub>i</sub>_  | _0_           | Ubicación más alta de memoria usada                                                                                                                                                                                                                          |
| _μ<sub>s</sub>_  | _()_          | La pila, inicialmente vacía                                                                                                                                                                                                                                  |
| _μ<sub>o</sub>_  | _∅_           | La salida, vacía hasta y a menos que nos detengamos con datos de devolución ([`RETURN`](https://www.evm.codes/#f3) o [`REVERT`](https://www.evm.codes/#fd)) o sin ellos ([`STOP`](https://www.evm.codes/#00) o [`SELFDESTRUCT`](https://www.evm.codes/#ff)). |

La ecuación 143 nos dice que hay cuatro posibles condiciones en cada momento específico durante la ejecución y qué se debe hacer con ellas:

1.  `Z(σ,μ,A,I)`. Z representa una función que prueba si una operación crea una transición de estado no válida (ver [detención excepcional](#942-exceptional-halting)). Si se evalúa como True, el nuevo estado es idéntico al anterior (excepto que se quema/usa gas) porque los cambios no se han implementado.
2.  Si el código de operación ejecutado es [`REVERT`](https://www.evm.codes/#fd), el nuevo estado es el mismo que el anterior, se pierde algo de gas.
3.  Si la secuencia de operaciones es finalizada, como lo indica un [`RETURN`](https://www.evm.codes/#f3)), el estado es actualizado al nuevo.
4.  Si no estamos en una de las condiciones finales 1-3, continuar con la ejecución.

## 9.4.1. Estado de la máquina {#941-machine-state}

Esta sección explica el estado de la máquina con mayor detalle. Especifica que _w_ es el actual código de operación. Si _μ<sub>pc</sub>_ es menor que _||I<sub>b</sub>||_, la longitud del código, entonces ese byte (_I<sub>b</sub>[μ<sub>pc</sub>]_) es el código de operación. De lo contrario, el código de operación es definido como [`STOP`](https://www.evm.codes/#00).

Como esta es una [máquina de pila](https://en.wikipedia.org/wiki/Stack_machine), necesitamos mantener un registro de la cantidad de objetos que salieron (_δ_) y entraron (_α_) a causa de cada código de operación.

## 9.4.2. Detención excepcional {#942-exceptional-halt}

Esta sección define la función _Z_, que especifica cuando tenemos una finalización anormal. Se trata de una función [booleana](https://en.wikipedia.org/wiki/Boolean_data_type), así que usa [_∨_ para un o lógico](https://en.wikipedia.org/wiki/Logical_disjunction) y [_∧_ para un y lógico](https://en.wikipedia.org/wiki/Logical_conjunction).

Tenemos una detención excepcional si cualquiera de estas condiciones es verdadera:

- **_μ<sub>g</sub> < C(σ,μ,A,I)_** Como vimos en la sección 9.2, _C_ es la función que especifica el costo del gas. No hay suficiente gas para cubrir el siguiente código de operación.

- **_δ<sub>w</sub>=∅_** Si el número de elementos que aparecen para un código de operación no está definido, entonces el código de operación en sí no está definido.

- **_|| μ<sub>s</sub> || < δ<sub>w</sub>_** Desbordamiento de la pila, no hay suficientes elementos en la pila para el actual código de operación.

- **_w = JUMP ∧ μ<sub>s</sub>[0]∉D(I<sub>b</sub>)_** El código de operación es [`JUMP`](https://www.evm.codes/#56) y la dirección no es un [`JUMPDEST`](https://www.evm.codes/#5b). Los saltos _solo_ son válidos cuando el destino es un [`JUMPDEST`](https://www.evm.codes/#5b).

- **_w = JUMPI ∧ μ<sub>s</sub>[1]≠0 ∧ μ<sub>s</sub>[0] ∉ D(I<sub>b</sub>)_** El código de operación es [`JUMPI`](https://www.evm.codes/#57), la condición es verdadera (no es cero), por lo que el salto debería ocurrir, y la dirección no es un [`JUMPDEST`](https://www.evm.codes/#5b). Los saltos _solo_ son válidos cuando el destino es un [`JUMPDEST`](https://www.evm.codes/#5b).

- **_w = RETURNDATACOPY ∧ μ<sub>s</sub>[1]+μ<sub>s</sub>[2]>|| μ<sub>o</sub> ||_** El código de operación es [`RETURNDATACOPY`](https://www.evm.codes/#3e). En este código de operación, el elemento de pila _μ<sub>s</sub>[1]_ es el desplazamiento desde donde leer en el búfer de datos de retorno, y el elemento de pila _μ<sub>s</sub>[2]_ es la longitud de datos. Esta condición ocurre cuando intenta leer más allá del fin del búfer de datos de retorno. Note que no hay una condición similar para la llamada de datos o para el código en sí. Cuando trata de leer más allá del final de esos búferes obtiene ceros.

- **_|| μ<sub>s</sub> || - δ<sub>w</sub> + α<sub>w</sub> > 1024_**

  Desbordameinto de pila. Si la ejecución del código de operación resultará en una pila con más de 1024 elementos, abortar.

- **_¬I<sub>w</sub> ∧ W(w,μ)_** ¿Estamos corriendo estáticamente ([¬ es negación](https://en.wikipedia.org/wiki/Negation) y _I<sub>w</sub>_ es verdadero cuando tenemos permitido cambiar el estado de la cadena de bloques)? Si es así y estamos intentando una operación de cambio de estado, esto no puede suceder.

  La función _W(w,μ)_ es definida más tarde en la ecuación 150. _W(w,μ)_ es verdadero si una de estas condiciones es verdadera:

  - **_w ∈ {CREATE, CREATE2, SSTORE, SELFDESTRUCT}_** Estos códigos de operación cambian el estado, ya sea creando un nuevo contrato, almacenando un valor o destruyendo el contrato actual.

  - **_LOG0≤w ∧ w≤LOG4_** Si somos llamados estáticamente, no podemos emitir entradas de registro. Los código de operación del registro están todos en un rango entre [`LOG0` (A0)](https://www.evm.codes/#a0) y [`LOG4` (A4)](https://www.evm.codes/#a4). El número que figura luego del código de operación del registro especifica cuántos temas contiene la entrada de registro.
  - **_w=CALL ∧ μ<sub>s</sub>[2]≠0_** Puede invocar otro contrato cuando está estático, pero, si lo hace, no puede transferir ETH a este.

- **_w = SSTORE ∧ μ<sub>g</sub> ≤ G<sub>callstipend</sub>_** No puede correr [`SSTORE`](https://www.evm.codes/#55), a menos que tenga más que G<sub>callstipend</sub> (definido como 2300 en el Apéndice G) gas.

## 9.4.3. Validez de destino de salto {#943-jump-dest-valid}

Aquí definimos formalmente qué son los códigos de operación [`JUMPDEST`](https://www.evm.codes/#5b). No podemos simplemente buscar el valor de byte 0x5B, porque podría estar dentro de un PUSH (y, por lo tanto, datos y no un código de operación).

En la ecuación (153) definimos una función, _N(i,w)_. El primer parámetro, _i_, es la ubicación del código de operación. El segundo, _w_, es el código de operación en sí. Si _w∈[PUSH1, PUSH32]_, eso significa que el código de operación es un PUSH (los corchetes definen un rango que incluye los extremos). En ese caso el siguiente código de operación está en _i+2+(w−PUSH1)_. Para [`PUSH1`](https://www.evm.codes/#60) necesitamos avancar de a dos bytes (el propio PUSH y el valor de un byte), para [`PUSH2`](https://www.evm.codes/#61) necesitamos avanzar de a tres bytes, porque es un valor de dos bytes, etc. Todos los demás códigos de operación de la EVM son solo de un byte de longitud, así que en todos los otros casos _N(i,w)=i+1_.

Esta función se usa en la ecuación (152) para definir _D<sub>J</sub>(c,i)_, que corresponde al [conjunto](https://en.wikipedia.org/wiki/Set_(mathematics)) de todos los destinos de salto válidos en el código _c_, comenzando con la ubicación del código de operación _i_. Esta función es definida de manera recursiva. En caso de ser _i≥||c||_, significa que nos encontramos en o después del final del código. No encontraremos más destinos de salto, por lo que solo devolvemos el conjunto vacío.

En todos los otros casos, nos fijamos en el resto del código dirigiéndonos al siguiente código de operación y obteniendo el conjunto que se inicia desde este. _c[i]_ es el actual código de operación, así que _N(i,c[i])_ es la ubicación del siguiente código de operación. _D<sub>J</sub>(c,N(i,c[i]))_ es, por lo tanto, el conjunto de destinos de salto válidos que inicia en el siguiente código de operación. Si el actual código de operación no es un `JUMPDEST`, solo devolvemos ese conjunto. Si es `JUMPDEST`, debemos incluirlo en el conjunto de resultados y devolverlo.

## 9.4.4. Detención normal {#944-normal-halt}

La función de detención _H_ puede devolver tres tipos de valores.

- Si no estamos en un código de operación de detención, devolver _∅_, el conjunto vacío. Por costumbre, este valor es interpretado como un Booleano falso.
- Si tenemos un código de operación de detención que no produce una salida (ya sea [`STOP`](https://www.evm.codes/#00) o [`SELFDESTRUCT`](https://www.evm.codes/#ff)), devolver una secuencia con tamaño de cero bytes como el valor de devolución. Note que esto es muy diferente al conjunto vacío. Este valor significa que la EVM realmente se ha detenido, solo que no hay datos de devolución para leer.
- Si tenemos un código de operación de detención que produce una salida (ya sea [`RETURN`](https://www.evm.codes/#f3) o [`REVERT`](https://www.evm.codes/#fd)), devolver la secuencia de bytes especificada por ese código de operación. Esta secuencia es tomada de la memoria, el valor en la parte superior de la pila (_μ<sub>s</sub>[0]_) es el primer byte, y el valor luego de este (_μ<sub>s</sub>[1]_) es la longitud.

## H.2. Conjunto de instrucciones {#h2-instruction-set}

Antes de ir a la subsección final de la EVM, 9.5, veamos las instrucciones en sí. Están definidas en el Apéndice H.2 que comienza en la p. 29. Todo lo que no esté especificado que debe cambiar con ese código de operación debe continuar igual. Las variables que sí cambian están especificadas como \<algo\>'.

Por ejemplo, veamos el código de operación [`ADD`](https://www.evm.codes/#01).

| Valor | Nemotecnia | δ | α | Descripción                                               |
| -----:| ---------- | - | - | --------------------------------------------------------- |
|  0x01 | ADD        | 2 | 1 | Operación de suma.                                        |
|       |            |   |   | _μ′<sub>s</sub>[0] ≡ μ<sub>s</sub>[0] + μ<sub>s</sub>[1]_ |

_δ_ es la cantidad de valores que resaltamos de la pila. En este caso dos, porque estamos agregando los dos valores de la parte superior.

_α_ es la cantidad de valores que enviamos de regreso. En este caso uno, la suma.

Entonces la nueva parte superior de la pila (_μ′<sub>s</sub>[0]_) es la suma de la anterior parte superior de la pila (_μ<sub>s</sub>[0]_) y el valor anterior debajo de esta (_μ<sub>s</sub>[1]_).

En lugar de repasar todos los códigos de operación con una "lista de ojos vidriosos", este artículo explica solo aquellos códigos de operación que introducen algo nuevo.

| Valor | Nemotecnia | δ | α | Descripción                                                                                                |
| -----:| ---------- | - | - | ---------------------------------------------------------------------------------------------------------- |
|  0x20 | KECCAK256  | 2 | 1 | Computación del hash Keccak-256.                                                                           |
|       |            |   |   | _μ′<sub>s</sub>[0] ≡ KEC(μ<sub>m</sub>[μ<sub>s</sub>[0] . . . (μ<sub>s</sub>[0] + μ<sub>s</sub>[1] − 1)])_ |
|       |            |   |   | _μ′<sub>i</sub> ≡ M(μ<sub>i</sub>,μ<sub>s</sub>[0],μ<sub>s</sub>[1])_                                      |

Este es el primer código de operación que accede a la memoria (en este caso, solo lectura). Sin embargo, podría expandirse más allá de los límites actuales de la memoria, por lo que necesitamos actualizar _μ<sub>i</sub>._ Esto lo hacemos usando la función _M_, definida en la ecuación 328 de la p. 29.

| Valor | Nemotecnia | δ | α | Descripción                                  |
| -----:| ---------- | - | - | -------------------------------------------- |
|  0x31 | BALANCE    | 1 | 1 | Obtener el saldo de la cuenta proporcionada. |
|       |            |   |   | ...                                          |

La dirección cuyo saldo necesitamos encontrar es _μ<sub>s</sub>[0] mod 2<sup>160</sup>_. La parte superior de la pila es la dirección, pero, debido a que las direcciones solo son de 160 bits, calculamos el valor [modulo](https://en.wikipedia.org/wiki/Modulo_operation)2<sup>160</sup>.

Si _σ[μ<sub>s</sub>[0] mod 2<sup>160</sup>] ≠ ∅_, significa que hay información sobre esta dirección. En ese caso, _σ[μ<sub>s</sub>[0] mod 2<sup>160</sup>]<sub>b</sub>_ es el saldo de esa dirección. Si _σ[μ<sub>s</sub>[0] mod 2<sup>160</sup>] = ∅_, significa que esta dirección no está inicializada y el saldo es cero. Puede ver el listado de campos de información de la cuenta en la sección 4.1 de la p. 4.

La segunda ecuación, _A'<sub>a</sub> ≡ A<sub>a</sub> ∪ {μ<sub>s</sub>[0] mod 2<sup>160</sup>}_, está relacionada con la diferencia en costo entre el acceso al almacenamiento en caliente (almacenamiento al que se ha accedido recientemente y es probable que esté almacenado en caché) y el almacenamiento en frío (almacenamiento al que no se ha accedido y es probable que esté en almacenamiento más lento que es más caro de recuperar). _A<sub>a</sub>_ es el listado de direcciones accesadas previamente por la transacción, que deberían por lo tanto ser más baratas de acceder, como se define en la sección 6.1 de la p. 8. Puede leer más sobre este tema en [EIP-2929](https://eips.ethereum.org/EIPS/eip-2929).

| Valor | Nemotecnia | δ  | α  | Descripción                                  |
| -----:| ---------- | -- | -- | -------------------------------------------- |
|  0x8F | DUP16      | 16 | 17 | Duplicar el decimosexto elemento de la pila. |
|       |            |    |    | _μ′<sub>s</sub>[0] ≡ μ<sub>s</sub>[15]_      |

Note que para usar cualquier elemento de la pila, necesitamos resaltarlo (pop), lo que significa que también necesitamos resaltar todos los elementos de la pila arriba de este. En el caso de [`DUP<n>`](https://www.evm.codes/#8f) y [`SWAP<n>`](https://www.evm.codes/#9f), esto significa tener que resaltar y después empujar hasta dieciséis valores.

## 9.5. El ciclo de ejecución {#95-exec-cycle}

Ahora que tenemos todas las partes, finalmente podemos comprender cómo el ciclo de ejecución de la EVM es documentado.

La ecuación (155) dice que dado el estado:

- _σ_ (estado de la cadena de bloques global)
- _μ_ (estado de la EVM)
- _A_ (subestado, cambios que sucederán cuando la transacción finaliza)
- _I_ (entorno de ejecución)

El nuevo estado es _(σ', μ', A', I')_.

Las ecuaciones (156)-(158) definen la pila y el cambio en esta debido a un código de operación (_μ<sub>s</sub>_). La ecuación (159) es el cambio en el gas (_μ<sub>g</sub>_). La ecuación (160) es el cambio en el contador del programa (_μ<sub>pc</sub>_). Finalmente, las ecuaciones (161)-(164) especifican que los otros parámetros permanecen iguales, a menos que sean explícitamente cambiados por el código de operación.

Con esto, la EVM está completamente definida.

## Conclusión {#conclusion}

La notación matemática es precisa y permite que el Yellow Paper especifique cada detalle de Ethereum. Sin embargo, tiene algunas desventajas:

- Solo puede ser comprendida por humanos, lo que implica que las [pruebas de cumplimiento](https://github.com/ethereum/tests) se deben escribir manualmente.
- Los programadores comprenden el código computacional. Pueden comprender o no la notación matemática.

Quizá por estas razones, las nuevas [especificaciones de capas de consenso](https://github.com/ethereum/consensus-specs/blob/dev/tests/core/pyspec/README.md) están escritas en Python. Hay [especificaciones de capas de ejecución en Python](https://ethereum.github.io/execution-specs), pero no están completas. Hasta y a menos que todo el Yellow Paper también se traduzca a Python o un lenguaje similar, el Yellow Paper continuará en servicio y es útil saber leerlo.
