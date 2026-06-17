---
title: Verificación formal de contratos inteligentes
description: Una descripción general de la verificación formal para contratos inteligentes de Ethereum
lang: es
---

Los [contratos inteligentes](/developers/docs/smart-contracts/) están haciendo posible crear aplicaciones descentralizadas, sin necesidad de confianza y robustas que introducen nuevos casos de uso y desbloquean valor para los usuarios. Debido a que los contratos inteligentes manejan grandes cantidades de valor, la seguridad es una consideración crítica para los desarrolladores.

La verificación formal es una de las técnicas recomendadas para mejorar la [seguridad de los contratos inteligentes](/developers/docs/smart-contracts/security/). La verificación formal, que utiliza [métodos formales](https://www.brookings.edu/techstream/formal-methods-as-a-path-toward-better-cybersecurity/) para especificar, diseñar y verificar programas, se ha utilizado durante años para garantizar la corrección de sistemas críticos de hardware y software.

Cuando se implementa en contratos inteligentes, la verificación formal puede probar que la lógica de negocio de un contrato cumple con una especificación predefinida. En comparación con otros métodos para evaluar la corrección del código del contrato, como las pruebas, la verificación formal ofrece garantías más sólidas de que un contrato inteligente es funcionalmente correcto.

## ¿Qué es la verificación formal? {#what-is-formal-verification}

La verificación formal se refiere al proceso de evaluar la corrección de un sistema con respecto a una especificación formal. En términos más simples, la verificación formal nos permite comprobar si el comportamiento de un sistema satisface algunos requisitos (es decir, hace lo que queremos).

Los comportamientos esperados del sistema (un contrato inteligente en este caso) se describen utilizando modelado formal, mientras que los lenguajes de especificación permiten la creación de propiedades formales. Las técnicas de verificación formal pueden entonces verificar que la implementación de un contrato cumple con su especificación y derivar una prueba matemática de la corrección de la primera. Cuando un contrato satisface su especificación, se describe como "funcionalmente correcto", "correcto por diseño" o "correcto por construcción".

### ¿Qué es un modelo formal? {#what-is-a-formal-model}

En ciencias de la computación, un [modelo formal](https://en.wikipedia.org/wiki/Model_of_computation) es una descripción matemática de un proceso computacional. Los programas se abstraen en funciones matemáticas (ecuaciones), y el modelo describe cómo se calculan las salidas de las funciones dada una entrada.

Los modelos formales proporcionan un nivel de abstracción sobre el cual se puede evaluar el análisis del comportamiento de un programa. La existencia de modelos formales permite la creación de una _especificación formal_, que describe las propiedades deseadas del modelo en cuestión.

Se utilizan diferentes técnicas para modelar contratos inteligentes para la verificación formal. Por ejemplo, algunos modelos se utilizan para razonar sobre el comportamiento de alto nivel de un contrato inteligente. Estas técnicas de modelado aplican una vista de caja negra a los contratos inteligentes, viéndolos como sistemas que aceptan entradas y ejecutan cálculos basados en esas entradas.

Los modelos de alto nivel se centran en la relación entre los contratos inteligentes y los agentes externos, como las cuentas de propiedad externa (EOA), las cuentas de contrato y el entorno de la cadena de bloques. Dichos modelos son útiles para definir propiedades que especifican cómo debe comportarse un contrato en respuesta a ciertas interacciones del usuario.

Por el contrario, otros modelos formales se centran en el comportamiento de bajo nivel de un contrato inteligente. Si bien los modelos de alto nivel pueden ayudar a razonar sobre la funcionalidad de un contrato, es posible que no logren capturar detalles sobre el funcionamiento interno de la implementación. Los modelos de bajo nivel aplican una vista de caja blanca al análisis de programas y se basan en representaciones de nivel inferior de las aplicaciones de contratos inteligentes, como trazas de programas y [gráficos de flujo de control](https://en.wikipedia.org/wiki/Control-flow_graph), para razonar sobre las propiedades relevantes para la ejecución de un contrato.

Los modelos de bajo nivel se consideran ideales ya que representan la ejecución real de un contrato inteligente en el entorno de ejecución de Ethereum (es decir, la [EVM](/developers/docs/evm/)). Las técnicas de modelado de bajo nivel son especialmente útiles para establecer propiedades de seguridad críticas en los contratos inteligentes y detectar posibles vulnerabilidades.

### ¿Qué es una especificación formal? {#what-is-a-formal-specification}

Una especificación es simplemente un requisito técnico que un sistema en particular debe satisfacer. En programación, las especificaciones representan ideas generales sobre la ejecución de un programa (es decir, lo que el programa debería hacer).

En el contexto de los contratos inteligentes, las especificaciones formales se refieren a _propiedades_: descripciones formales de los requisitos que un contrato debe satisfacer. Dichas propiedades se describen como "invariantes" y representan aserciones lógicas sobre la ejecución de un contrato que deben permanecer verdaderas bajo cualquier circunstancia posible, sin excepciones.

Por lo tanto, podemos pensar en una especificación formal como una colección de declaraciones escritas en un lenguaje formal que describen la ejecución prevista de un contrato inteligente. Las especificaciones cubren las propiedades de un contrato y definen cómo debe comportarse el contrato en diferentes circunstancias. El propósito de la verificación formal es determinar si un contrato inteligente posee estas propiedades (invariantes) y que estas propiedades no se violen durante la ejecución.

Las especificaciones formales son críticas en el desarrollo de implementaciones seguras de contratos inteligentes. Los contratos que no implementan invariantes o cuyas propiedades se violan durante la ejecución son propensos a vulnerabilidades que pueden dañar la funcionalidad o causar exploits maliciosos.

## Tipos de especificaciones formales para contratos inteligentes {#formal-specifications-for-smart-contracts}

Las especificaciones formales permiten el razonamiento matemático sobre la corrección de la ejecución del programa. Al igual que con los modelos formales, las especificaciones formales pueden capturar propiedades de alto nivel o el comportamiento de bajo nivel de la implementación de un contrato.

Las especificaciones formales se derivan utilizando elementos de la [lógica de programas](https://en.wikipedia.org/wiki/Logic_programming), que permiten el razonamiento formal sobre las propiedades de un programa. Una lógica de programa tiene reglas formales que expresan (en lenguaje matemático) el comportamiento esperado de un programa. Se utilizan varias lógicas de programas en la creación de especificaciones formales, incluida la [lógica de alcanzabilidad](https://en.wikipedia.org/wiki/Reachability_problem), la [lógica temporal](https://en.wikipedia.org/wiki/Temporal_logic) y la [lógica de Hoare](https://en.wikipedia.org/wiki/Hoare_logic).

Las especificaciones formales para contratos inteligentes se pueden clasificar en términos generales como especificaciones de **alto nivel** o de **bajo nivel**. Independientemente de a qué categoría pertenezca una especificación, debe describir de manera adecuada e inequívoca la propiedad del sistema bajo análisis.

### Especificaciones de alto nivel {#high-level-specifications}

Como sugiere el nombre, una especificación de alto nivel (también llamada "especificación orientada a modelos") describe el comportamiento de alto nivel de un programa. Las especificaciones de alto nivel modelan un contrato inteligente como una [máquina de estados finitos](https://en.wikipedia.org/wiki/Finite-state_machine) (FSM), que puede hacer la transición entre estados realizando operaciones, con lógica temporal utilizada para definir propiedades formales para el modelo FSM.

Las [lógicas temporales](https://en.wikipedia.org/wiki/Temporal_logic) son "reglas para razonar sobre proposiciones calificadas en términos de tiempo (por ejemplo, "Yo _siempre_ tengo hambre" o "Yo _eventualmente_ tendré hambre")". Cuando se aplican a la verificación formal, las lógicas temporales se utilizan para establecer aserciones sobre el comportamiento correcto de los sistemas modelados como máquinas de estado. Específicamente, una lógica temporal describe los estados futuros en los que puede estar un contrato inteligente y cómo hace la transición entre estados.

Las especificaciones de alto nivel generalmente capturan dos propiedades temporales críticas para los contratos inteligentes: **seguridad** y **vivacidad**. Las propiedades de seguridad representan la idea de que "nunca sucede nada malo" y generalmente expresan invariancia. Una propiedad de seguridad puede definir requisitos generales de software, como la ausencia de [interbloqueos](https://www.techtarget.com/whatis/definition/deadlock), o expresar propiedades específicas del dominio para los contratos (por ejemplo, invariantes en el control de acceso para funciones, valores admisibles de variables de estado o condiciones para transferencias de tokens).

Tomemos por ejemplo este requisito de seguridad que cubre las condiciones para usar `transfer()` o `transferFrom()` en contratos de tokens ERC-20: _"El saldo de un remitente nunca es inferior a la cantidad solicitada de tokens a enviar"_. Esta descripción en lenguaje natural de un invariante de contrato se puede traducir a una especificación formal (matemática), que luego se puede verificar rigurosamente para comprobar su validez.

Las propiedades de vivacidad afirman que "eventualmente sucede algo bueno" y se refieren a la capacidad de un contrato para progresar a través de diferentes estados. Un ejemplo de una propiedad de vivacidad es la "liquidez", que se refiere a la capacidad de un contrato para transferir sus saldos a los usuarios a pedido. Si se viola esta propiedad, los usuarios no podrían retirar los activos almacenados en el contrato, como sucedió con el [incidente de la billetera Parity](https://www.cnbc.com/2017/11/08/accidental-bug-may-have-frozen-280-worth-of-ether-on-parity-wallet.html).

### Especificaciones de bajo nivel {#low-level-specifications}

Las especificaciones de alto nivel toman como punto de partida un modelo de estados finitos de un contrato y definen las propiedades deseadas de este modelo. Por el contrario, las especificaciones de bajo nivel (también llamadas "especificaciones orientadas a propiedades") a menudo modelan programas (contratos inteligentes) como sistemas que comprenden una colección de funciones matemáticas y describen el comportamiento correcto de dichos sistemas.

En términos más simples, las especificaciones de bajo nivel analizan las _trazas del programa_ e intentan definir las propiedades de un contrato inteligente sobre estas trazas. Las trazas se refieren a secuencias de ejecuciones de funciones que alteran el estado de un contrato inteligente; por lo tanto, las especificaciones de bajo nivel ayudan a especificar los requisitos para la ejecución interna de un contrato.

Las especificaciones formales de bajo nivel se pueden dar como propiedades de estilo Hoare o invariantes en las rutas de ejecución.

### Propiedades de estilo Hoare {#hoare-style-properties}

La [lógica de Hoare](https://en.wikipedia.org/wiki/Hoare_logic) proporciona un conjunto de reglas formales para razonar sobre la corrección de los programas, incluidos los contratos inteligentes. Una propiedad de estilo Hoare está representada por una tripleta de Hoare `{P}c{Q}`, donde `c` es un programa y `P` y `Q` son predicados sobre el estado de `c` (es decir, el programa), descritos formalmente como _precondiciones_ y _postcondiciones_, respectivamente.

Una precondición es un predicado que describe las condiciones requeridas para la ejecución correcta de una función; los usuarios que llaman al contrato deben satisfacer este requisito. Una postcondición es un predicado que describe la condición que establece una función si se ejecuta correctamente; los usuarios pueden esperar que esta condición sea verdadera después de llamar a la función. Un _invariante_ en la lógica de Hoare es un predicado que se preserva mediante la ejecución de una función (es decir, no cambia).

Las especificaciones de estilo Hoare pueden garantizar la _corrección parcial_ o la _corrección total_. La implementación de una función de contrato es "parcialmente correcta" si la precondición es verdadera antes de que se ejecute la función, y si la ejecución termina, la postcondición también es verdadera. La prueba de corrección total se obtiene si una precondición es verdadera antes de que se ejecute la función, se garantiza que la ejecución terminará y, cuando lo hace, la postcondición es verdadera.

Obtener una prueba de corrección total es difícil ya que algunas ejecuciones pueden retrasarse antes de terminar, o nunca terminar en absoluto. Dicho esto, la cuestión de si la ejecución termina es posiblemente un punto discutible ya que el mecanismo de gas de Ethereum evita los bucles de programa infinitos (la ejecución termina con éxito o finaliza debido a un error de 'falta de gas').

Las especificaciones de contratos inteligentes creadas utilizando la lógica de Hoare tendrán precondiciones, postcondiciones e invariantes definidos para la ejecución de funciones y bucles en un contrato. Las precondiciones a menudo incluyen la posibilidad de entradas erróneas a una función, con postcondiciones que describen la respuesta esperada a tales entradas (por ejemplo, lanzar una excepción específica). De esta manera, las propiedades de estilo Hoare son efectivas para asegurar la corrección de las implementaciones de contratos.

Muchos marcos de verificación formal utilizan especificaciones de estilo Hoare para probar la corrección semántica de las funciones. También es posible agregar propiedades de estilo Hoare (como aserciones) directamente al código del contrato utilizando las declaraciones `require` y `assert` en Solidity.

Las declaraciones `require` expresan una precondición o invariante y a menudo se utilizan para validar las entradas del usuario, mientras que `assert` captura una postcondición necesaria para la seguridad. Por ejemplo, el control de acceso adecuado para las funciones (un ejemplo de una propiedad de seguridad) se puede lograr utilizando `require` como una verificación de precondición en la identidad de la cuenta que llama. De manera similar, un invariante sobre los valores permisibles de las variables de estado en un contrato (por ejemplo, el número total de tokens en circulación) se puede proteger de violaciones utilizando `assert` para confirmar el estado del contrato después de la ejecución de la función.

### Propiedades a nivel de traza {#trace-level-properties}

Las especificaciones basadas en trazas describen operaciones que hacen la transición de un contrato entre diferentes estados y las relaciones entre estas operaciones. Como se explicó anteriormente, las trazas son secuencias de operaciones que alteran el estado de un contrato de una manera particular.

Este enfoque se basa en el modelo de contratos inteligentes como sistemas de transición de estado con algunos estados predefinidos (descritos por variables de estado) junto con un conjunto de transiciones predefinidas (descritas por funciones de contrato). Además, a menudo se utiliza un [gráfico de flujo de control](https://www.geeksforgeeks.org/software-engineering-control-flow-graph-cfg/) (CFG), que es una representación gráfica del flujo de ejecución de un programa, para describir la semántica operativa de un contrato. Aquí, cada traza se representa como una ruta en el gráfico de flujo de control.

Principalmente, las especificaciones a nivel de traza se utilizan para razonar sobre patrones de ejecución interna en contratos inteligentes. Al crear especificaciones a nivel de traza, afirmamos las rutas de ejecución admisibles (es decir, transiciones de estado) para un contrato inteligente. Utilizando técnicas, como la ejecución simbólica, podemos verificar formalmente que la ejecución nunca sigue una ruta no definida en el modelo formal.

Usemos un ejemplo de un contrato de [DAO](/dao/) que tiene algunas funciones de acceso público para describir las propiedades a nivel de traza. Aquí, asumimos que el contrato de la DAO permite a los usuarios realizar las siguientes operaciones:

- Depositar fondos

- Votar en una propuesta después de depositar fondos

- Reclamar un reembolso si no votan en una propuesta

Ejemplos de propiedades a nivel de traza podrían ser _"los usuarios que no depositan fondos no pueden votar en una propuesta"_ o _"los usuarios que no votan en una propuesta siempre deberían poder reclamar un reembolso"_. Ambas propiedades afirman secuencias de ejecución preferidas (la votación no puede ocurrir _antes_ de depositar fondos y el reclamo de un reembolso no puede ocurrir _después_ de votar en una propuesta).

## Técnicas para la verificación formal de contratos inteligentes {#formal-verification-techniques}

### Verificación de modelos {#model-checking}

La verificación de modelos es una técnica de verificación formal en la que un algoritmo comprueba un modelo formal de un contrato inteligente frente a su especificación. En la verificación de modelos, los contratos inteligentes a menudo se representan como sistemas de transición de estado, mientras que las propiedades sobre los estados de contrato permisibles se definen utilizando lógica temporal.

La verificación de modelos requiere crear una representación matemática abstracta de un sistema (es decir, un contrato) y expresar las propiedades de este sistema utilizando fórmulas basadas en la [lógica proposicional](https://www.baeldung.com/cs/propositional-logic). Esto simplifica la tarea del algoritmo de verificación de modelos, a saber, probar que un modelo matemático satisface una fórmula lógica dada.

La verificación de modelos en la verificación formal se utiliza principalmente para evaluar propiedades temporales que describen el comportamiento de un contrato a lo largo del tiempo. Las propiedades temporales para los contratos inteligentes incluyen _seguridad_ y _vivacidad_, que explicamos anteriormente.

Por ejemplo, una propiedad de seguridad relacionada con el control de acceso (por ejemplo, _Solo el propietario del contrato puede llamar a `selfdestruct`_) se puede escribir en lógica formal. A partir de entonces, el algoritmo de verificación de modelos puede verificar si el contrato satisface esta especificación formal.

La verificación de modelos utiliza la exploración del espacio de estados, que implica construir todos los estados posibles de un contrato inteligente e intentar encontrar estados alcanzables que resulten en violaciones de propiedades. Sin embargo, esto puede conducir a un número infinito de estados (conocido como el "problema de explosión de estados"), por lo tanto, los verificadores de modelos se basan en técnicas de abstracción para hacer posible un análisis eficiente de los contratos inteligentes.

### Demostración de teoremas {#theorem-proving}

La demostración de teoremas es un método de razonamiento matemático sobre la corrección de los programas, incluidos los contratos inteligentes. Implica transformar el modelo del sistema de un contrato y sus especificaciones en fórmulas matemáticas (declaraciones lógicas).

El objetivo de la demostración de teoremas es verificar la equivalencia lógica entre estas declaraciones. La "equivalencia lógica" (también llamada "biimplicación lógica") es un tipo de relación entre dos declaraciones tal que la primera declaración es verdadera _si y solo si_ la segunda declaración es verdadera.

La relación requerida (equivalencia lógica) entre las declaraciones sobre el modelo de un contrato y su propiedad se formula como una declaración demostrable (llamada teorema). Utilizando un sistema formal de inferencia, el probador de teoremas automatizado puede verificar la validez del teorema. En otras palabras, un probador de teoremas puede probar de manera concluyente que el modelo de un contrato inteligente coincide con precisión con sus especificaciones.

Mientras que la verificación de modelos modela los contratos como sistemas de transición con estados finitos, la demostración de teoremas puede manejar el análisis de sistemas de estados infinitos. Sin embargo, esto significa que un probador de teoremas automatizado no siempre puede saber si un problema lógico es "decidible" o no.

Como resultado, a menudo se requiere asistencia humana para guiar al probador de teoremas en la derivación de pruebas de corrección. El uso del esfuerzo humano en la demostración de teoremas hace que sea más costoso de usar que la verificación de modelos, que está completamente automatizada.

### Ejecución simbólica {#symbolic-execution}

La ejecución simbólica es un método para analizar un contrato inteligente mediante la ejecución de funciones utilizando _valores simbólicos_ (por ejemplo, `x > 5`) en lugar de _valores concretos_ (por ejemplo, `x == 5`). Como técnica de verificación formal, la ejecución simbólica se utiliza para razonar formalmente sobre las propiedades a nivel de traza en el código de un contrato.

La ejecución simbólica representa una traza de ejecución como una fórmula matemática sobre valores de entrada simbólicos, también llamada _predicado de ruta_. Se utiliza un [solucionador SMT](https://en.wikipedia.org/wiki/Satisfiability_modulo_theories) para comprobar si un predicado de ruta es "satisfacible" (es decir, existe un valor que puede satisfacer la fórmula). Si una ruta vulnerable es satisfacible, el solucionador SMT generará un valor concreto que desencadena y dirige la ejecución hacia esa ruta.

Supongamos que la función de un contrato inteligente toma como entrada un valor `uint` (`x`) y se revierte cuando `x` es mayor que `5` y también menor que `10`. Encontrar un valor para `x` que desencadene el error utilizando un procedimiento de prueba normal requeriría ejecutar docenas de casos de prueba (o más) sin la seguridad de encontrar realmente una entrada que desencadene el error.

Por el contrario, una herramienta de ejecución simbólica ejecutaría la función con el valor simbólico: `X > 5 ∧ X < 10` (es decir, `x` es mayor que 5 Y `x` es menor que 10). El predicado de ruta asociado `x = X > 5 ∧ X < 10` se le daría a un solucionador SMT para que lo resuelva. Si un valor particular satisface la fórmula `x = X > 5 ∧ X < 10`, el solucionador SMT lo calculará; por ejemplo, el solucionador podría producir `7` como un valor para `x`.

Debido a que la ejecución simbólica se basa en las entradas a un programa, y el conjunto de entradas para explorar todos los estados alcanzables es potencialmente infinito, sigue siendo una forma de prueba. Sin embargo, como se muestra en el ejemplo, la ejecución simbólica es más eficiente que las pruebas regulares para encontrar entradas que desencadenan violaciones de propiedades.

Además, la ejecución simbólica produce menos falsos positivos que otras técnicas basadas en propiedades (por ejemplo, fuzzing) que generan aleatoriamente entradas a una función. Si se desencadena un estado de error durante la ejecución simbólica, entonces es posible generar un valor concreto que desencadene el error y reproduzca el problema.

La ejecución simbólica también puede proporcionar cierto grado de prueba matemática de corrección. Considere el siguiente ejemplo de una función de contrato con protección contra desbordamiento:

```
function safe_add(uint x, uint y) returns(uint z){

  z = x + y;
  require(z>=x);
  require(z>=y);

  return z;
}
```

Una traza de ejecución que resulte en un desbordamiento de enteros necesitaría satisfacer la fórmula: `z = x + y AND (z >= x) AND (z >= y) AND (z < x OR z < y)` Es poco probable que se resuelva tal fórmula, por lo tanto, sirve como una prueba matemática de que la función `safe_add` nunca se desborda.

### ¿Por qué usar la verificación formal para contratos inteligentes? {#benefits-of-formal-verification}

#### Necesidad de confiabilidad {#need-for-reliability}

La verificación formal se utiliza para evaluar la corrección de los sistemas críticos para la seguridad cuya falla puede tener consecuencias devastadoras, como la muerte, lesiones o la ruina financiera. Los contratos inteligentes son aplicaciones de alto valor que controlan enormes cantidades de valor, y los errores simples en el diseño pueden conducir a [pérdidas irrecuperables para los usuarios](https://www.freecodecamp.org/news/a-hacker-stole-31m-of-ether-how-it-happened-and-what-it-means-for-ethereum-9e5dc29e33ce/amp/). Sin embargo, verificar formalmente un contrato antes del despliegue puede aumentar las garantías de que funcionará como se espera una vez que se ejecute en la cadena de bloques.

La confiabilidad es una cualidad muy deseada en cualquier contrato inteligente, especialmente porque el código desplegado en la Máquina Virtual de [Ethereum](/) (EVM) es típicamente inmutable. Dado que las actualizaciones posteriores al lanzamiento no son fácilmente accesibles, la necesidad de garantizar la confiabilidad de los contratos hace que la verificación formal sea necesaria. La verificación formal es capaz de detectar problemas complicados, como desbordamientos por debajo y por encima de enteros, reentrada y malas optimizaciones de gas, que pueden pasar desapercibidos para los auditores y probadores.

#### Probar la corrección funcional {#prove-functional-correctness}

Las pruebas de programas son el método más común para probar que un contrato inteligente satisface algunos requisitos. Esto implica ejecutar un contrato con una muestra de los datos que se espera que maneje y analizar su comportamiento. Si el contrato devuelve los resultados esperados para los datos de muestra, entonces los desarrolladores tienen una prueba objetiva de su corrección.

Sin embargo, este enfoque no puede probar la ejecución correcta para valores de entrada que no forman parte de la muestra. Por lo tanto, probar un contrato puede ayudar a detectar errores (es decir, si algunas rutas de código no devuelven los resultados deseados durante la ejecución), pero **no puede probar de manera concluyente la ausencia de errores**.

Por el contrario, la verificación formal puede probar formalmente que un contrato inteligente satisface los requisitos para un rango infinito de ejecuciones _sin_ ejecutar el contrato en absoluto. Esto requiere crear una especificación formal que describa con precisión los comportamientos correctos del contrato y desarrollar un modelo formal (matemático) del sistema del contrato. Luego podemos seguir un procedimiento de prueba formal para verificar la consistencia entre el modelo del contrato y su especificación.

Con la verificación formal, la cuestión de verificar si la lógica de negocio de un contrato satisface los requisitos es una proposición matemática que puede ser probada o refutada. Al probar formalmente una proposición, podemos verificar un número infinito de casos de prueba con un número finito de pasos. De esta manera, la verificación formal tiene mejores perspectivas de probar que un contrato es funcionalmente correcto con respecto a una especificación.

#### Objetivos de verificación ideales {#ideal-verification-targets}

Un objetivo de verificación describe el sistema que se va a verificar formalmente. La verificación formal se utiliza mejor en "sistemas integrados" (piezas de software pequeñas y simples que forman parte de un sistema más grande). También son ideales para dominios especializados que tienen pocas reglas, ya que esto facilita la modificación de herramientas para verificar propiedades específicas del dominio.

Los contratos inteligentes, al menos hasta cierto punto, cumplen ambos requisitos. Por ejemplo, el pequeño tamaño de los contratos de Ethereum los hace susceptibles a la verificación formal. De manera similar, la EVM sigue reglas simples, lo que facilita la especificación y verificación de propiedades semánticas para los programas que se ejecutan en la EVM.

### Ciclo de desarrollo más rápido {#faster-development-cycle}

Las técnicas de verificación formal, como la verificación de modelos y la ejecución simbólica, son generalmente más eficientes que el análisis regular del código de contratos inteligentes (realizado durante las pruebas o auditorías). Esto se debe a que la verificación formal se basa en valores simbólicos para probar aserciones ("¿qué pasa si un usuario intenta retirar _n_ ether?") a diferencia de las pruebas que utilizan valores concretos ("¿qué pasa si un usuario intenta retirar 5 ether?").

Las variables de entrada simbólicas pueden cubrir múltiples clases de valores concretos, por lo que los enfoques de verificación formal prometen una mayor cobertura de código en un período de tiempo más corto. Cuando se utiliza de manera efectiva, la verificación formal puede acelerar el ciclo de desarrollo para los desarrolladores.

La verificación formal también mejora el proceso de construcción de aplicaciones descentralizadas (dapps) al reducir los costosos errores de diseño. La actualización de contratos (cuando sea posible) para corregir vulnerabilidades requiere una reescritura extensa de las bases de código y más esfuerzo dedicado al desarrollo. La verificación formal puede detectar muchos errores en las implementaciones de contratos que pueden pasar desapercibidos para los probadores y auditores y proporciona una amplia oportunidad para solucionar esos problemas antes de desplegar un contrato.

## Inconvenientes de la verificación formal {#drawbacks-of-formal-verification}

### Costo del trabajo manual {#cost-of-manual-labor}

La verificación formal, especialmente la verificación semiautomatizada en la que un humano guía al probador para derivar pruebas de corrección, requiere un trabajo manual considerable. Además, la creación de especificaciones formales es una actividad compleja que exige un alto nivel de habilidad.

Estos factores (esfuerzo y habilidad) hacen que la verificación formal sea más exigente y costosa en comparación con los métodos habituales de evaluación de la corrección en los contratos, como las pruebas y las auditorías. Sin embargo, pagar el costo de una auditoría de verificación completa es práctico, dado el costo de los errores en las implementaciones de contratos inteligentes.

### Falsos negativos {#false-negatives}

La verificación formal solo puede comprobar si la ejecución del contrato inteligente coincide con la especificación formal. Como tal, es importante asegurarse de que la especificación describa adecuadamente los comportamientos esperados de un contrato inteligente.

Si las especificaciones están mal escritas, las violaciones de propiedades, que apuntan a ejecuciones vulnerables, no pueden ser detectadas por la auditoría de verificación formal. En este caso, un desarrollador podría asumir erróneamente que el contrato está libre de errores.

### Problemas de rendimiento {#performance-issues}

La verificación formal se encuentra con una serie de problemas de rendimiento. Por ejemplo, los problemas de explosión de estados y rutas encontrados durante la verificación de modelos y la verificación simbólica, respectivamente, pueden afectar los procedimientos de verificación. Además, las herramientas de verificación formal a menudo utilizan solucionadores SMT y otros solucionadores de restricciones en su capa subyacente, y estos solucionadores se basan en procedimientos computacionalmente intensivos.

Además, no siempre es posible para los verificadores de programas determinar si una propiedad (descrita como una fórmula lógica) puede ser satisfecha o no (el "[problema de decidibilidad](https://en.wikipedia.org/wiki/Decision_problem)") porque un programa podría nunca terminar. Como tal, puede ser imposible probar algunas propiedades para un contrato incluso si está bien especificado.

## Herramientas de verificación formal para contratos inteligentes de Ethereum {#formal-verification-tools}

### Lenguajes de especificación para crear especificaciones formales {#specification-languages}

**Act**: _*Act permite la especificación de actualizaciones de almacenamiento, pre/postcondiciones e invariantes de contrato. Su conjunto de herramientas también tiene backends de prueba capaces de probar muchas propiedades a través de Coq, solucionadores SMT o hevm.*_

- [GitHub](https://github.com/ethereum/act)
- [Documentación](https://github.com/argotorg/act)

**Scribble** - _*Scribble transforma las anotaciones de código en el lenguaje de especificación Scribble en aserciones concretas que comprueban la especificación.*_

- [Documentación](https://docs.scribble.codes/)

**Dafny** - _*Dafny es un lenguaje de programación listo para la verificación que se basa en anotaciones de alto nivel para razonar y probar la corrección del código.*_

- [GitHub](https://github.com/dafny-lang/dafny)

### Verificadores de programas para comprobar la corrección {#program-verifiers}

**Certora Prover** - _Certora Prover es una herramienta de verificación formal automática para comprobar la corrección del código en contratos inteligentes. Las especificaciones se escriben en CVL (Certora Verification Language), y las violaciones de propiedades se detectan utilizando una combinación de análisis estático y resolución de restricciones._

- [Sitio web](https://www.certora.com/)
- [Documentación](https://docs.certora.com/en/latest/index.html)

**Solidity SMTChecker** - _*El SMTChecker de Solidity es un verificador de modelos incorporado basado en SMT (Satisfiability Modulo Theories) y resolución de Horn. Confirma si el código fuente de un contrato coincide con las especificaciones durante la compilación y comprueba estáticamente las violaciones de las propiedades de seguridad.*_

- [GitHub](https://github.com/ethereum/solidity)

**solc-verify** - _*solc-verify es una versión extendida del compilador de Solidity que puede realizar una verificación formal automatizada en el código de Solidity utilizando anotaciones y verificación de programas modulares.*_

- [GitHub](https://github.com/SRI-CSL/solidity)

**KEVM** - _*KEVM es una semántica formal de la Máquina Virtual de Ethereum (EVM) escrita en el marco K. KEVM es ejecutable y puede probar ciertas aserciones relacionadas con propiedades utilizando la lógica de alcanzabilidad.*_

- [GitHub](https://github.com/runtimeverification/evm-semantics)
- [Documentación](https://jellopaper.org/)

### Marcos lógicos para la demostración de teoremas {#theorem-provers}

**Isabelle** - _Isabelle/HOL es un asistente de pruebas que permite expresar fórmulas matemáticas en un lenguaje formal y proporciona herramientas para probar esas fórmulas. La aplicación principal es la formalización de pruebas matemáticas y, en particular, la verificación formal, que incluye probar la corrección del hardware o software de la computadora y probar las propiedades de los lenguajes y protocolos informáticos._

- [GitHub](https://github.com/isabelle-prover)
- [Documentación](https://isabelle.in.tum.de/documentation.html)

**Rocq** - _Rocq es un probador de teoremas interactivo que le permite definir programas utilizando teoremas y generar interactivamente pruebas de corrección verificadas por máquina._

- [GitHub](https://github.com/rocq-prover/rocq)
- [Documentación](https://rocq-prover.org/docs)

### Herramientas basadas en ejecución simbólica para detectar patrones vulnerables en contratos inteligentes {#symbolic-execution-tools}

**Manticore** - _*Una herramienta para analizar el código de bytes de la EVM basada en la ejecución simbólica*._

- [GitHub](https://github.com/trailofbits/manticore)
- [Documentación](https://github.com/trailofbits/manticore/wiki)

**hevm** - _*hevm es un motor de ejecución simbólica y un verificador de equivalencia para el código de bytes de la EVM.*_

- [GitHub](https://github.com/dapphub/dapptools/tree/master/src/hevm)

**Mythril** - _Una herramienta de ejecución simbólica para detectar vulnerabilidades en contratos inteligentes de Ethereum_

- [GitHub](https://github.com/ConsenSys/mythril-classic)
- [Documentación](https://mythril-classic.readthedocs.io/en/develop/)

## Más información {#further-reading}

- [Cómo funciona la verificación formal de los contratos inteligentes](https://runtimeverification.com/blog/how-formal-verification-of-smart-contracts-works/)
- [Una descripción general de los proyectos de verificación formal en el ecosistema de Ethereum](https://github.com/leonardoalt/ethereum_formal_verification_overview)
- [Verificación formal de extremo a extremo del contrato inteligente de depósito de Ethereum 2.0](https://runtimeverification.com/blog/end-to-end-formal-verification-of-ethereum-2-0-deposit-smart-contract/)
- [Verificando formalmente el contrato inteligente más popular del mundo](https://www.zellic.io/blog/formal-verification-weth)
- [SMTChecker y verificación formal](https://docs.soliditylang.org/en/v0.8.15/smtchecker.html)