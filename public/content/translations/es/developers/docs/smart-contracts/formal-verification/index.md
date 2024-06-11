---
title: Verificación formal de contratos inteligentes
description: Visión general de la verificación formal de los contratos inteligentes de Ethereum
lang: es
---

Los [contratos inteligentes](/developers/docs/smart-contracts/) están haciendo posible crear aplicaciones descentralizadas, sin confianza y robustas que introduzcan nuevos casos de uso y proporcionen valor a los usuarios. Debido a que los contratos inteligentes manejan grandes cantidades de valor, la seguridad es una consideración crítica para los desarrolladores.

La verificación formal es una de las técnicas recomendadas para mejorar la [seguridad de los contratos inteligentes](/developers/docs/smart-contracts/security/). La verificación formal, que utiliza [métodos formales](https://www.brookings.edu/techstream/formal-methods-as-a-path-toward-better-cybersecurity/) para especificar, diseñar y verificar programas, se ha utilizado durante años para garantizar la corrección de los sistemas críticos de hardware y software.

Cuando se implementa en contratos inteligentes, la verificación formal puede demostrar que la lógica comercial de un contrato cumple con una especificación predefinida. En comparación con otros métodos para evaluar la corrección del código de un contrato, como las pruebas, la verificación formal ofrece garantías más sólidas de que un contrato inteligente sea funcionalmente correcto.

## ¿Qué es la verificación formal? {#what-is-formal-verification}

La verificación formal se refiere al proceso de evaluación de la corrección de un sistema con respecto a una especificación formal. En términos más simples, la verificación formal nos permite comprobar si el comportamiento de un sistema cumple con algunos requisitos (es decir, hace lo que queremos).

Los comportamientos esperados del sistema (un contrato inteligente en este caso) se describen utilizando un modelado formal, mientras que los lenguajes de especificación permiten la creación de propiedades formales. Las técnicas de verificación formal pueden verificar que la implementación de un contrato cumpla con sus especificaciones y derivar una prueba matemática de la corrección del contrato. Cuando un contrato cumple con su especificación, se describe como "funcionalmente correcto", "correcto por diseño" o "correcto por construcción".

### ¿Qué es un modelo formal? {#what-is-a-formal-model}

En informática, un [modelo formal](https://en.wikipedia.org/wiki/Model_of_computation) es una descripción matemática de un proceso computacional. Los programas se abstraen en funciones matemáticas (ecuaciones), con un modelo que describe cómo se calculan los resultados (o salidas) de las funciones dada una entrada.

Los modelos formales proporcionan un nivel de abstracción sobre el que se puede evaluar el análisis del comportamiento de un programa. La existencia de modelos formales permite la creación de una _especificación formal_, que describe las propiedades deseadas del modelo en cuestión.

Se utilizan diferentes técnicas para modelar contratos inteligentes para la verificación formal. Por ejemplo, algunos modelos se utilizan para razonar sobre el comportamiento de alto nivel de un contrato inteligente. Estas técnicas de modelado aplican una vista de caja negra (black-box view) a los contratos inteligentes, viéndolos como sistemas que aceptan entradas y ejecutan cálculos basados en esas entradas.

Los modelos de alto nivel se centran en la relación entre los contratos inteligentes y los agentes externos, como las cuentas de propiedad externa (EOA), las cuentas de contratos y el entorno de la cadena de bloques. Dichos modelos son útiles para definir propiedades que especifican cómo debe comportarse un contrato en respuesta a ciertas interacciones del usuario.

Por el contrario, otros modelos formales se centran en el comportamiento de bajo nivel de un contrato inteligente. Si bien los modelos de alto nivel pueden ayudar a razonar sobre la funcionalidad de un contrato, pueden fallar en la captura de detalles sobre el funcionamiento interno de la implementación. Los modelos de bajo nivel aplican una vista de caja blanca (white-box view) al análisis del programa y se basan en representaciones de nivel más bajo de aplicaciones de contratos inteligentes, como rastreos de programas y [gráficos de flujo de control](https://en.wikipedia.org/wiki/Control-flow_graph), para razonar sobre las propiedades relevantes para la ejecución de un contrato.

Los modelos de bajo nivel se consideran ideales, ya que representan la ejecución real de un contrato inteligente en el entorno de ejecución de Ethereum (es decir, la [EVM](/developers/docs/evm/)). Las técnicas de modelado de bajo nivel son especialmente útiles para establecer propiedades de seguridad críticas en contratos inteligentes y detectar posibles vulnerabilidades.

### ¿Qué es una especificación formal? {#what-is-a-formal-specification}

Una especificación es simplemente un requisito técnico que un sistema en particular debe cumplir. En la programación, las especificaciones representan ideas generales sobre la ejecución de un programa (es decir, lo que el programa debe hacer).

En el contexto de los contratos inteligentes, las especificaciones formales se refieren a _propiedades_: descripciones formales de los requisitos que un contrato debe cumplir. Tales propiedades se describen como "invariantes" y representan afirmaciones lógicas sobre la ejecución de un contrato que deben seguir siendo verdaderas en todas las circunstancias posibles, sin ninguna excepción.

Por lo tanto, podemos pensar en una especificación formal como una colección de declaraciones escritas en un lenguaje formal que describen la ejecución prevista de un contrato inteligente. Las especificaciones cubren las propiedades de un contrato y definen cómo debe comportarse el contrato en diferentes circunstancias. El propósito de la verificación formal es determinar si un contrato inteligente posee estas propiedades (invariantes) y que estas propiedades no se violen durante la ejecución.

Las especificaciones formales son fundamentales para desarrollar implementaciones seguras de contratos inteligentes. Los contratos que no implementan invariantes o cuyas propiedades se ven violadas durante la ejecución son propensos a vulnerabilidades que pueden dañar la funcionalidad o causar explotaciones, o exploits, maliciosas.

## Tipos de especificaciones formales para contratos inteligentes {#formal-specifications-for-smart-contracts}

Las especificaciones formales permiten el razonamiento matemático sobre la corrección de la ejecución de un programa. Al igual que con los modelos formales, las especificaciones formales pueden capturar propiedades de alto nivel o el comportamiento de bajo nivel de la implementación de un contrato.

Las especificaciones formales se derivan utilizando elementos de [lógica del programa](https://en.wikipedia.org/wiki/Logic_programming), que permiten un razonamiento formal sobre las propiedades de un programa. Una lógica de programa tiene reglas formales que expresan (en lenguaje matemático) el comportamiento esperado de un programa. Se utilizan varias lógicas de programa para crear especificaciones formales, incluyendo [lógica de alcanzabilidad](https://en.wikipedia.org/wiki/Reachability_problem), [lógica temporal](https://en.wikipedia.org/wiki/Temporal_logic) y [lógica de Hoare](https://en.wikipedia.org/wiki/Hoare_logic).

Las especificaciones formales para los contratos inteligentes se pueden clasificar ampliamente como **especificaciones de alto nivel** o **especificaciones de bajo nivel**. Independientemente de a qué categoría pertenezca una especificación, debe describir de manera adecuada e inequívoca la propiedad del sistema que se desea analizar.

### Especificaciones de alto nivel {#high-level-specifications}

Como su nombre lo indica, una especificación de alto nivel (también llamada "especificación orientada a modelos") describe el comportamiento de alto nivel de un programa. Las especificaciones de alto nivel modelan un contrato inteligente como una [máquina de estado finito](https://en.wikipedia.org/wiki/Finite-state_machine) (FSM), que puede hacer la transición entre estados mediante la realización de operaciones, con la lógica temporal utilizada para definir propiedades formales para el modelo FSM.

[Las lógicas temporales](https://en.wikipedia.org/wiki/Temporal_logic) son "reglas para razonar sobre proposiciones calificadas en términos de tiempo (por ejemplo, "Tengo _siempre_ hambre" o "Yo _eventualmente_ tendré hambre")." Cuando se aplican a la verificación formal, las lógicas temporales se utilizan para hacer afirmaciones sobre el comportamiento correcto de los sistemas modelados como máquinas de estado. Específicamente, una lógica temporal describe los estados futuros en los que puede estar un contrato inteligente y cómo hace la transición entre estados.

Las especificaciones de alto nivel generalmente capturan dos propiedades temporales críticas para los contratos inteligentes: **seguridad** y **vitalidad**. Las propiedades de seguridad representan la idea de que "nunca pasa nada malo" y generalmente expresan invariancia. Una propiedad de seguridad puede definir requisitos generales de software, como la ausencia de [deadlock](https://www.techtarget.com/whatis/definition/deadlock), o expresar propiedades específicas del dominio para los contratos (por ejemplo, invariantes en el control de acceso para funciones, valores admisibles de variables de estado o condiciones para transferencias de tokens).

Tomemos por ejemplo este requisito de seguridad que cubre las condiciones para usar el `transfer()` o `transferFrom()` en los contratos de tokens ERC-20: _"El saldo de un remitente nunca es inferior a la cantidad solicitada de tokens que se enviarán". _. Esta descripción en lenguaje natural de un invariante de contrato se puede traducir en una especificación formal (matemática), que luego se puede comprobar rigurosamente para verificar su validez.

Las propiedades de vitalidad afirman que "algo bueno finalmente sucede" y se refieren a la capacidad de un contrato para progresar por diferentes estados. Un ejemplo de una propiedad de vitalidad es la "liquidez", que se refiere a la capacidad de un contrato para transferir sus saldos a usuarios a petición. Si se viola esta propiedad, los usuarios no podrían retirar los activos almacenados en el contrato, como lo que sucedió con el [incidente de la billetera de Parity](https://www.cnbc.com/2017/11/08/accidental-bug-may-have-frozen-280-worth-of-ether-on-parity-wallet.html).

### Especificaciones de bajo nivel {#low-level-specifications}

Las especificaciones de alto nivel toman como punto de partida un modelo de estado finito de un contrato y definen las propiedades deseadas de este modelo. En contraste, las especificaciones de bajo nivel (también llamadas "especificaciones orientadas a propiedades") a menudo modelan programas (contratos inteligentes) como sistemas que constan de una colección de funciones matemáticas y describen el comportamiento correcto de dichos sistemas.

En términos más simples, las especificaciones de bajo nivel analizan _rastros del programa_ e intentan definir las propiedades de un contrato inteligente sobre estos rastros. Los rastros, o pistas, se refieren a secuencias de ejecuciones de funciones que alteran el estado de un contrato inteligente; por lo tanto, las especificaciones de bajo nivel ayudan a especificar los requisitos para la ejecución interna de un contrato.

Las especificaciones formales de bajo nivel se pueden dar como propiedades de estilo Hoare o invariantes en las rutas de ejecución.

### Propiedades de estilo Hoare {#hoare-style-properties}

La [lógica de Hoare](https://en.wikipedia.org/wiki/Hoare_logic) proporciona un conjunto de reglas formales para razonar sobre la corrección de los programas, incluidos los contratos inteligentes. Una propiedad de estilo Hoare está representada por un triple Hoare {_P_}_c_{_Q_}, donde _c_ es un programa y _P_ y _Q_ son predicados sobre el estado del _c_ (es decir, el programa), descrito formalmente como _precondiciones_ y _poscondiciones_, respectivamente.

Una precondición es un predicado que describe las condiciones requeridas para la correcta ejecución de una función; los usuarios que invocan o llaman al contrato deben cumplir con este requisito. Una poscondición es un predicado que describe la condición que una función establece si se ejecuta correctamente; los usuarios pueden esperar que esta condición sea verdadera después de invocar la función. Un _invariante_ en la lógica de Hoare es un predicado que se conserva mediante la ejecución de una función (es decir, no cambia).

Las especificaciones de estilo Hoare pueden garantizar _corrección parcial_ o _corrección total_. La implementación de la función de un contrato es "parcialmente correcta" si la condición previa es verdadera antes de que se ejecute la función, y si la ejecución termina, la poscondición también es verdadera. La prueba de corrección total se obtiene si una condición previa es verdadera antes de que se ejecute la función, se garantiza que la ejecución terminará y, cuando lo hace, la poscondición se mantiene verdadera.

Obtener una prueba de corrección total es difícil, ya que algunas ejecuciones pueden retrasarse antes de terminar, o nunca terminar en absoluto. Dicho esto, la cuestión de si la ejecución termina es posiblemente un punto discutible, ya que el mecanismo de gas de Ethereum evita bucles de programa infinitos (la ejecución termina con éxito o termina debido a un error de "sin gas").

Las especificaciones de contratos inteligentes creadas utilizando la lógica de Hoare tendrán condiciones previas, poscondiciones e invariantes definidos para la ejecución de funciones y bucles en un contrato. Las precondiciones a menudo incluyen la posibilidad de entradas erróneas a una función, con condiciones posteriores que describen la respuesta esperada a dichas entradas (por ejemplo, lanzar una excepción específica). De esta manera, las propiedades de estilo Hoare son efectivas para garantizar la corrección de las implementaciones de los contratos.

Muchos marcos de verificación formal utilizan especificaciones de estilo Hoare para probar la corrección semántica de las funciones. También es posible añadir propiedades de estilo Hoare (como aserciones) directamente al código del contrato utilizando las declaraciones `require` y `assert` en Solidity.

Las declaraciones `require` expresan una condición previa o invariante y a menudo se utilizan para validar las entradas del usuario, mientras que `assert` captura una poscondición necesaria para la seguridad. Por ejemplo, se puede lograr un control de acceso adecuado para las funciones (un ejemplo de una propiedad de seguridad) utilizando `require` como una comprobación previa de la identidad de la cuenta invocante. Del mismo modo, un invariante sobre los valores permitidos de las variables de estado en un contrato (por ejemplo, el número total de tokens en circulación) se puede proteger de la violación mediante el uso de `assert` para confirmar el estado del contrato después de la ejecución de la función.

### Propiedades de nivel de rastreo {#trace-level-properties}

Las especificaciones basadas en rastros o pistas describen las operaciones que hacen la transición de un contrato entre diferentes estados y las relaciones entre estas operaciones. Como se explicó anteriormente, los rastros son secuencias de operaciones que alteran el estado de un contrato de una manera particular.

Este enfoque se basa en el modelo de contratos inteligentes como sistemas de transición de estados con algunos estados predefinidos (descritos por variables de estado) junto con un conjunto de transiciones predefinidas (descritas por funciones de contrato). Además, un [gráfico de flujo de control](https://www.geeksforgeeks.org/software-engineering-control-flow-graph-cfg/) (CFG), que es una representación gráfica del flujo de ejecución de un programa, se utiliza a menudo para describir la semántica operativa de un contrato. Aquí, cada rastro se representa como una ruta en el gráfico de flujo de control.

Principalmente, las especificaciones de nivel de rastreo se utilizan para razonar sobre los patrones de ejecución interna en los contratos inteligentes. Al crear especificaciones de nivel de rastreo, afirmamos las rutas de ejecución admisibles (es decir, transiciones de estado) para un contrato inteligente. Usando técnicas, como la ejecución simbólica, podemos verificar formalmente que la ejecución nunca siga un camino no definido en el modelo formal.

Usemos un ejemplo de un contrato de [DAO](/dao/) que tiene algunas funciones de acceso público para describir las propiedades a nivel de rastreo. Aquí, asumimos que el contrato de DAO permite a los usuarios realizar las siguientes operaciones:

- Depositar fondos

- Votar una propuesta después de depositar fondos

- Reclamar un reembolso si no votan una propuesta

Ejemplos de propiedades de nivel de rastreo podrían ser _"los usuarios que no depositan fondos no pueden votar sobre una propuesta"_ o _"los usuarios que no voten sobre una propuesta siempre deben poder reclamar un reembolso"_. Ambas propiedades afirman secuencias de ejecución preferidas (la votación no puede ocurrir _antes_ de depositar fondos, y reclamar un reembolso no puede ocurrir _después_ de votar sobre una propuesta).

## Técnicas para la verificación formal de contratos inteligentes {#formal-verification-techniques}

### Comprobación de modelos {#model-checking}

La comprobación de modelos es una técnica de verificación formal en la que un algoritmo compara un modelo formal de un contrato inteligente con sus especificaciones. En la comprobación de modelos, los contratos inteligentes a menudo se representan como sistemas de transición de estado, mientras que las propiedades en estados de contrato permisibles se definen utilizando la lógica temporal.

La comprobación de modelos requiere crear una representación matemática abstracta de un sistema (es decir, un contrato) y expresar las propiedades de este sistema utilizando fórmulas basadas en [lógica proposicional](https://www.baeldung.com/cs/propositional-logic). Esto simplifica la tarea del algoritmo de verificación del modelo, es decir, demostrar que un modelo matemático satisface una fórmula lógica dada.

La comprobación de modelos en la verificación formal se utiliza principalmente para evaluar las propiedades temporales que describen el comportamiento de un contrato a lo largo del tiempo. Las propiedades temporales de los contratos inteligentes incluyen _seguridad_ y _vitalidad_, que explicamos anteriormente.

Por ejemplo, una propiedad de seguridad relacionada con el control de acceso (por ejemplo, _Solo el propietario del contrato puede invocar `selfdestruct`_) se puede escribir en lógica formal. En lo sucesivo, el algoritmo de comprobación de modelos puede verificar si el contrato cumple con esta especificación formal.

La comprobación de modelos utiliza la exploración espacial de estado, lo que implica la construcción de todos los estados posibles de un contrato inteligente y el intento de encontrar estados alcanzables que resulten en violaciones de propiedad. Sin embargo, esto puede conducir a un número infinito de estados (conocidos como el "problema de la explosión de estado"), por lo que los verificadores de modelos se basan en técnicas de abstracción para hacer posible el análisis eficiente de los contratos inteligentes.

### Prueba de teorema {#theorem-proving}

La prueba de teorema es un método de razonamiento matemático sobre la corrección de los programas, incluidos los contratos inteligentes. Implica transformar el modelo del sistema de un contrato y sus especificaciones en fórmulas matemáticas (declaraciones lógicas).

El objetivo de la prueba de teorema es verificar la equivalencia lógica entre estas afirmaciones. La "equivalencia lógica" (también llamada "doble implicación lógica") es un tipo de relación entre dos declaraciones de tal manera que la primera declaración es verdadera _si y solo si_ la segunda declaración es verdadera.

La relación requerida (equivalencia lógica) entre las declaraciones sobre el modelo de un contrato y su propiedad se formula como una declaración demostrable (llamada teorema). Usando un sistema formal de inferencia, el verificador de teoremas automatizado puede verificar la validez del teorema. En otras palabras, un verificador de teoremas puede probar de manera concluyente que el modelo de un contrato inteligente coincide con precisión con sus especificaciones.

Mientras que la comprobación de modelos modela contratos como sistemas de transición con estados finitos, la comprobación de teoremas puede manejar el análisis de sistemas de estados infinitos. Sin embargo, esto significa que un verificador de teoremas automatizado no siempre puede saber si un problema lógico es "determinable" o no.

Como resultado, a menudo se requiere asistencia humana para guiar al verificador de teoremas en la obtención de pruebas de corrección. El uso de asistencia humana en la verificación de teoremas hace que sea más costosa de usar que la verificación de modelos, que es totalmente automatizada.

### Ejecución simbólica {#symbolic-execution}

La ejecución simbólica es un método para analizar un contrato inteligente mediante la ejecución de funciones utilizando _valores simbólicos_ (por ejemplo, `x > 5`) en lugar de _valores concretos_ (por ejemplo, `x == 5`). Como técnica de verificación formal, la ejecución simbólica se utiliza para razonar formalmente sobre las propiedades de nivel de rastreo en el código de un contrato.

La ejecución simbólica representa un rastreo de ejecución como una fórmula matemática sobre los valores de entrada simbólicos, también llamado _predicado de ruta_. Se utiliza un [solucionador SMT](https://en.wikipedia.org/wiki/Satisfiability_modulo_theories) para comprobar si un predicado de ruta es "satisfacible" (es decir, existe un valor que puede satisfacer la fórmula). Si una ruta vulnerable es satisfacible, el solucionador SMT generará un valor concreto que active la ejecución hacia esa ruta.

Supongamos que la función de un contrato inteligente toma como entrada un valor `uint` (`x`) y se revierte cuando `x` es mayor que `5` y también menor que `10`. Encontrar un valor para `x` que desencadene el error utilizando un procedimiento de prueba normal requeriría ejecutar docenas de casos de prueba (o más) sin la garantía de encontrar realmente una entrada que desencadene un error.

Por el contrario, una herramienta de ejecución simbólica ejecutaría la función con el valor simbólico: `X > 5 ∧ X < 10` (es decir, `x` es mayor que 5 Y `x` es menor que 10). El predicado de ruta asociado `x = X > 5 ∧ X < 10` se daría luego a un solucionador SMT para que lo resuelva. Si un valor en particular satisface la fórmula `x = X > 5 ∧ X < 10`, el solucionador SMT lo calculará; por ejemplo, el solucionador podría producir `7` como valor para `x`.

Debido a que la ejecución simbólica se basa en las entradas en un programa, y el conjunto de entradas para explorar todos los estados alcanzables es potencialmente infinito, sigue siendo una forma de prueba. Sin embargo, como se muestra en el ejemplo, la ejecución simbólica es más eficiente que las pruebas regulares para encontrar entradas que desencadenen violaciones de propiedades.

Además, la ejecución simbólica produce menos falsos positivos que otras técnicas basadas en propiedades (por ejemplo, fuzzing) que generan entradas aleatorias a una función. Si se activa un estado de error durante la ejecución simbólica, entonces es posible generar un valor concreto que active el error y reproducir el problema.

La ejecución simbólica también puede proporcionar cierto grado de prueba matemática de corrección. Considere el siguiente ejemplo de una función de contrato con protección contra desbordamiento:

```
function safe_add(uint x, uint y) returns(uint z){

  z = x + y;
  require(z>=x);
  require(z>=y);

  return z;
```

Un rastreo de ejecución que resulte en un desbordamiento de enteros tendría que satisfacer la fórmula: `z = x + y AND (z >= x) AND (z=>y) AND (z < x OR z < y)`. Es poco probable que se resuelva una fórmula de este tipo, por lo que servirá como prueba matemática de que la función `safe_add` nunca resulte en el desbordamiento de enteros.

### ¿Por qué usar la verificación formal para los contratos inteligentes? {#benefits-of-formal-verification}

#### Necesidad de fiabilidad {#need-for-reliability}

La verificación formal se utiliza para evaluar la corrección de los sistemas críticos para la seguridad cuya falla puede tener consecuencias devastadoras, como la muerte, lesiones o la ruina financiera. Los contratos inteligentes son aplicaciones de alto valor que controlan enormes cantidades de valor, y simples errores en el diseño pueden conducir a [pérdidas irrecuperables para los usuarios](https://www.freecodecamp.org/news/a-hacker-stole-31m-of-ether-how-it-happened-and-what-it-means-for-ethereum-9e5dc29e33ce/amp/). Sin embargo, la verificación formal de un contrato antes de la implementación puede aumentar las garantías de que funcionará como se espera una vez que se ejecute en la cadena de bloques.

La fiabilidad es una cualidad muy deseada en cualquier contrato inteligente, especialmente porque el código implementado en la máquina virtual de Ethereum (EVM) suele ser inmutable. Dado que las actualizaciones posteriores al lanzamiento no son fácilmente accesibles, la necesidad de garantizar la fiabilidad de los contratos hace necesaria una verificación formal. La verificación formal es capaz de detectar problemas complicados, como desbordamientos hacia arriba y hacia abajo, el reingreso y optimizaciones de gas deficientes, que los auditores y los verificadores pueden pasar por alto.

#### Demostrar la corrección funcional {#prove-functional-correctness}

Las pruebas de programa son el método más común para demostrar que un contrato inteligente cumple con algunos requisitos. Esto implica ejecutar un contrato con una muestra de los datos que se espera que maneje y analizar su comportamiento. Si el contrato devuelve los resultados esperados para los datos de muestra, entonces los desarrolladores tienen una prueba objetiva de su corrección.

No obstante, este enfoque no puede probar la ejecución correcta de valores de entrada que no formen parte de la muestra. Por lo tanto, probar un contrato puede ayudar a detectar errores (es decir, si algunas rutas de código no devuelven los resultados deseados durante la ejecución), pero **no puede probar de manera concluyente la ausencia de errores**.

Por el contrario, la verificación formal puede demostrar formalmente que un contrato inteligente cumple con los requisitos para un rango infinito de ejecuciones _sin_ ejecutar el contrato en absoluto. Esto requiere crear una especificación formal que describa con precisión los comportamientos correctos del contrato y desarrollar un modelo formal (matemático) del sistema del contrato. Así, podremos seguir un procedimiento de prueba formal para comprobar la coherencia entre el modelo del contrato y su especificación.

Con la verificación formal, la cuestión de verificar si la lógica comercial de un contrato satisface los requisitos es una proposición matemática que puede ser probada o refutada. Al probar formalmente una proposición, podemos verificar un número infinito de casos de prueba con un número finito de pasos. De esta manera, la verificación formal tiene mejores perspectivas de demostrar que un contrato es funcionalmente correcto con respecto a una especificación.

#### Objetivos de verificación ideales {#ideal-verification-targets}

Un objetivo de verificación describe el sistema que se verificará formalmente. La verificación formal se utiliza mejor en "sistemas integrados" (software pequeños y simples que forman parte de un sistema más grande). También son ideales para dominios especializados que tienen pocas reglas, ya que esto facilita la modificación de las herramientas para verificar las propiedades específicas del dominio.

Los contratos inteligentes, al menos hasta cierto punto, cumplen con ambos requisitos. Por ejemplo, el pequeño tamaño de los contratos de Ethereum hace que sean adecuados para la verificación formal. Del mismo modo, la EVM sigue reglas simples, lo que facilita la especificación y verificación de las propiedades semánticas de los programas que se ejecutan en ella.

### Ciclo de desarrollo más rápido {#faster-development-cycle}

Las técnicas de verificación formal, como la verificación de modelos y la ejecución simbólica, son generalmente más eficientes que el análisis regular del código de los contratos inteligentes (realizado durante pruebas o auditorías). Esto se debe a que la verificación formal se basa en valores simbólicos para probar las afirmaciones ("¿qué pasa si un usuario intenta retirar _n_ ether?") a diferencia de las pruebas que utilizan valores concretos ("¿qué pasa si un usuario intenta retirar 5 ethers?").

Las variables de entrada simbólicas pueden cubrir múltiples clases de valores concretos, por lo que los enfoques de verificación formal prometen más cobertura de código en un período de tiempo más corto. Cuando se utiliza de manera efectiva, la verificación formal puede acelerar el ciclo de desarrollo para los desarrolladores.

La verificación formal también mejora el proceso de creación de aplicaciones descentralizadas (dapps), ya que reduce los costosos errores de diseño. La actualización de los contratos (cuando es posible) para corregir vulnerabilidades requiere una extensa reescritura de las bases de código y más esfuerzo invertido en el desarrollo. La verificación formal puede detectar muchos errores en las implementaciones de contratos que los verificadores y los auditores pueden pasar por alto, y proporciona una gran oportunidad de solucionar esos problemas antes de implementar un contrato.

## Desventajas de la verificación formal {#drawbacks-of-formal-verification}

### Coste del trabajo manual {#cost-of-manual-labor}

La verificación formal, especialmente la verificación semiautomatizada en la que un humano guía al verificador para obtener pruebas de corrección, requiere un trabajo manual considerable. Además, la creación de especificaciones formales es una actividad compleja que requiere un alto nivel de habilidad.

Estos factores (esfuerzo y habilidad) hacen que la verificación formal sea más exigente y costosa en comparación con los métodos habituales para evaluar la corrección de los contratos, como las pruebas y las auditorías. No obstante, pagar el costo de una auditoría de verificación completa es práctico, teniendo en cuenta el costo de los errores en las implementaciones de contratos inteligentes.

### Falsos negativos {#false-negatives}

La verificación formal solo puede comprobar si la ejecución del contrato inteligente coincide con la especificación formal. Como tal, es importante asegurarse de que la especificación describa correctamente los comportamientos esperados de un contrato inteligente.

Si las especificaciones están mal escritas, las violaciones de las propiedades —que apuntan a ejecuciones vulnerables— no pueden ser detectadas por la auditoría de verificación formal. En este caso, un desarrollador podría asumir erróneamente que el contrato está libre de errores.

### Problemas de rendimiento {#performance-issues}

La verificación formal tiene una serie de problemas de rendimiento. Por ejemplo, los problemas de explosión de estado y ruta encontrados durante la comprobación de modelos y la comprobación simbólica, respectivamente, pueden afectar a los procedimientos de verificación. Además, las herramientas de verificación formal a menudo utilizan solucionadores SMT y otros solucionadores de restricciones en su capa subyacente, y estos solucionadores se basan en procedimientos computacionalmente intensivos.

Además, no siempre es posible que los verificadores de programas determinen si una propiedad (descrita como una fórmula lógica) se puede satisfacer o no (el "[problema de decidibilidad](https://en.wikipedia.org/wiki/Decision_problem)") porque es posible que un programa nunca termine. Como tal, podría ser imposible probar algunas propiedades para un contrato, incluso si está bien especificado.

## Herramientas de verificación formal para contratos inteligentes de Ethereum {#formal-verification-tools}

### Lenguajes de especificación para crear especificaciones formales {#specification-languages}

**Act**: _*Act permite la especificación de actualizaciones de almacenamiento, pre/poscondiciones e invariantes del contrato. Su conjunto de herramientas también tiene backends de prueba capaces de probar muchas propiedades a través de Coq, solucionadores SMT o hevm.**

- [GitHub](https://github.com/ethereum/act)
- [Documentación](https://ethereum.github.io/act/)

**Scribble:** _*Scribble transforma las anotaciones de código del lenguaje de especificación de Scribble en afirmaciones concretas que comprueban la especificación. **

- [Documentación](https://docs.scribble.codes/)

**Dafny:** _*Dafny es un lenguaje de programación listo para la verificación que se basa en anotaciones de alto nivel para razonar y demostrar la corrección del código.**

- [GitHub](https://github.com/dafny-lang/dafny)

### Verificadores de programas para comprobar la corrección {#program-verifiers}

**Certora Prover:** _Certora Prover es una herramienta de verificación formal automática para comprobar la corrección del código en contratos inteligentes. Las especificaciones están escritas en CVL (Certora Verification Language), y las violaciones de propiedad se detectan mediante una combinación de análisis estático y resolución de restricciones. _

- [Sitio web](https://www.certora.com/)
- [Documentación](https://docs.certora.com/en/latest/index.html)

**Solidity SMTChecker:** _*El SMTChecker de Solidity es un comprobador de modelos integrado basado en SMT (Satisfiability Modulo Theories) y resolución de Horn. Confirma si el código fuente de un contrato coincide con las especificaciones durante la compilación y comprueba estáticamente las violaciones de las propiedades de seguridad. **

- [GitHub](https://github.com/ethereum/solidity)

**solc-verify:** _*solc-verify es una versión extendida del compilador de Solidity que puede realizar una verificación formal automatizada en el código de Solidity utilizando anotaciones y verificación de programa modular. **

- [GitHub](https://github.com/SRI-CSL/solidity)

**KEVM:** _*KEVM es una semántica formal de la máquina virtual de Ethereum (EVM) escrita en el marco K. KEVM es ejecutable y puede probar ciertas afirmaciones relacionadas con propiedades utilizando la lógica de accesibilidad. **

- [GitHub](https://github.com/runtimeverification/evm-semantics)
- [Documentación](https://jellopaper.org/)

### Marcos lógicos para la prueba de teoremas {#theorem-provers}

**Isabelle:** _Isabelle/HOL es un asistente de prueba que permite expresar fórmulas matemáticas en lenguaje formal y proporciona herramientas para probar esas fórmulas. La aplicación principal es la formalización de pruebas matemáticas y, en particular, la verificación formal, que incluye probar la corrección de hardware o software informático y probar las propiedades de lenguajes y protocolos informáticos. _

- [GitHub](https://github.com/isabelle-prover)
- [Documentación](https://isabelle.in.tum.de/documentation.html)

**Coq:** _Coq es un verificador de teoremas interactivo que le permite definir programas utilizando teoremas y generar de forma interactiva pruebas de corrección revisadas por máquina. _

- [GitHub](https://github.com/coq/coq)
- [Documentación](https://coq.github.io/doc/v8.13/refman/index.html)

### Herramientas basadas en la ejecución simbólica para detectar patrones vulnerables en contratos inteligentes {#symbolic-execution-tools}

**Manticore:** _*Manticore es una herramienta de ejecución simbólica para el análisis de contratos inteligentes*. *

- [GitHub](https://github.com/trailofbits/manticore)
- [Documentación](https://github.com/trailofbits/manticore/wiki)

**hevm:** _*hevm es un motor de ejecución simbólica y comprobador de equivalencia para el bytecode de EVM. **

- [GitHub](https://github.com/dapphub/dapptools/tree/master/src/hevm)

**Mito:** _Una herramienta de ejecución simbólica para detectar vulnerabilidades en los contratos inteligentes de Ethereum_

- [GitHub](https://github.com/ConsenSys/mythril-classic)
- [Documentación](https://mythril-classic.readthedocs.io/en/develop/)

## Para mayor información {#further-reading}

- [Cómo funciona la verificación formal de los contratos inteligentes](https://runtimeverification.com/blog/how-formal-verification-of-smart-contracts-works/)
- [Cómo la verificación formal puede garantizar contratos inteligentes sin errores](https://media.consensys.net/how-formal-verification-can-ensure-flawless-smart-contracts-cbda8ad99bd1)
- [Visión general de los proyectos de verificación formal en el ecosistema de Ethereum](https://github.com/leonardoalt/ethereum_formal_verification_overview)
- [Verificación formal de extremo a extremo del contrato inteligente de depósito de Ethereum 2.0](https://runtimeverification.com/blog/end-to-end-formal-verification-of-ethereum-2-0-deposit-smart-contract/)
- [Verificar formalmente el contrato inteligente más popular del mundo](https://www.zellic.io/blog/formal-verification-weth)
- [SMTChecker y la verificación formal](https://docs.soliditylang.org/en/v0.8.15/smtchecker.html)
