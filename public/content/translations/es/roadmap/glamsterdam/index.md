---
title: Glamsterdam
description: "Más información sobre la actualización del protocolo Glamsterdam"
lang: es
---
# Glamsterdam {#glamsterdam}

**Glamsterdam es una próxima actualización de Ethereum prevista para el primer semestre de 2026**


<Alert variant="update">
<AlertContent>
<AlertDescription>
La actualización Glamsterdam es solo un paso en los objetivos de desarrollo a largo plazo de Ethereum. Obtenga más información sobre [la hoja de ruta del protocolo](/roadmap/) y [las actualizaciones anteriores](/ethereum-forks/).
</AlertDescription>
</AlertContent>
</Alert>

La próxima actualización [de Ethereum,](/) Glamsterdam, está diseñada para allanar el camino a la próxima generación de escalabilidad. Glamsterdam recibe su nombre de la combinación de "Amsterdam" (actualización de la capa de ejecución, que toma su nombre de una ubicación anterior de Devconnect) y "Gloas" (actualización de la capa de consenso, que toma su nombre de una estrella).

Tras el progreso realizado en la actualización [de Fusaka](/roadmap/fusaka/), Glamsterdam se centra en escalabilidad la L1 reorganizando la forma en que la red procesa las transacciones y gestiona su creciente base de datos, actualizando fundamentalmente la forma en que Ethereum crea y verifica los bloques.

Mientras que Fusaka se centró en mejoras fundamentales, Glamsterdam avanza en los objetivos de "Scale L1" y "Scale Blobs" al consagrar la separación de funciones entre los diferentes participantes de la red e introducir formas más eficientes de gestionar los datos para preparar el [estado](/glossary/#state) para la paralelización de alto rendimiento. 

Estas mejoras garantizan que Ethereum siga siendo rápido, asequible y descentralizado a medida que gestiona más actividad, al tiempo que mantiene los requisitos de hardware manejables para las personas que ejecutan [nodos](/glossary/#node) en casa.

<YouTube id="GgKveVMLnoo" />

## Mejoras consideradas para Glamsterdam {#improvements-in-glamsterdam}

<Alert variant="info">
<AlertContent>
<AlertDescription>
Nota: Este artículo destaca actualmente una selección de EIP que se están considerando para su inclusión en Glamsterdam. Para obtener las últimas actualizaciones de estado, consulte la [actualización de Glamsterdam en Forkcast](https://forkcast.org/upgrade/glamsterdam). 

Si quieres añadir un EIP que se está considerando para Glamsterdam, pero que aún no se ha añadido a esta página, [aprende a contribuir a ethereum.org aquí](/contributing/).
</AlertDescription>
</AlertContent>
</Alert>

La actualización de Glamsterdam se centra en tres objetivos principales:

- Acelerar el procesamiento (paralelización): Reorganizar la forma en que la red registra las dependencias de datos, de modo que pueda procesar de forma segura muchas transacciones al mismo tiempo en lugar de hacerlo de forma lenta, una por una.
- Ampliación de la capacidad: Dividir el trabajo pesado de crear y verificar bloques, lo que le da a la red más tiempo para propagar mayores cantidades de datos sin ralentizarse.
- Prevención de la sobrecarga de la base de datos (sostenibilidad): Ajustar las tarifas de la red para reflejar con precisión el coste del hardware a largo plazo del almacenamiento de nuevos datos, desbloqueando futuros aumentos del límite de gas y evitando la degradación del rendimiento del hardware.

En resumen, Glamsterdam introducirá cambios estructurales para garantizar que, a medida que la red aumente su capacidad, siga siendo sostenible y su rendimiento se mantenga alto.

## Escalabilidad L1 y procesamiento paralelo {#scale-l1}

Una escalabilidad significativa de L1 requiere alejarse de las suposiciones de confianza fuera del protocolo y de las restricciones de ejecución en serie. Glamsterdam aborda esto consagrando la separación de ciertas tareas de construcción de bloques e introduciendo nuevas estructuras de datos que permiten a la red prepararse para el procesamiento paralelo.

### Propuesta principal: Separación integrada entre proponente y constructor (ePBS) {#epbs}

- Elimina las suposiciones de confianza fuera del protocolo y la dependencia de los relés de código cerrado.
- Permite el escalabilidad de nivel 1 al permitir cargas útiles mucho mayores a través de ventanas de propagación extendidas.
- Introduce pagos sin intermediarios para constructores y transacciones cifradas para constructores anónimos.

Actualmente, el proceso de propuesta y construcción de bloques incluye un traspaso entre los bloque y los constructores de bloque. La relación entre proponentes y constructores no forma parte del protocolo central de Ethereum, por lo que depende de software de terceros de código cerrado (relés), así como de la confianza fuera del protocolo entre entidades. 

La relación fuera de protocolo entre los proponentes y los constructores también crea una "ruta crítica" durante la validación de bloque que obliga a [los validadores](/glossary/#validator) a apresurar la difusión y ejecución de transacción en una estrecha ventana de 2 segundos, lo que limita la cantidad de datos que la red puede manejar.

**La separación integrada entre proponente y constructor (ePBS o EIP-7732)** separa formalmente el trabajo del proponente (que elige el bloque) del constructor (que ensambla las transacciones), "integrando" este proceso directamente en el protocolo de Ethereum para eliminar la confianza fuera del protocolo. También introduce el Comité de Oportunidad de Carga Útil (PTC) y una lógica de doble plazo, con validadores que atestiguan la oportunidad y la disponibilidad de datos por separado para maximizar el rendimiento. 

<YouTube id="u8XvkTrjITs" />

La separación de las funciones de proponente y constructor a nivel de protocolo amplía la ventana de propagación (o el tiempo disponible para difundir datos a través de la red) de 2 segundos a aproximadamente 9 segundos. 

ePBS reduce la dependencia de software adicional de terceros y permite que Ethereum procese de forma segura cantidades mucho mayores de datos (como más blobs para [las capas 2](/glossary/#layer-2)) sin sobrecargar la red.

**Recursos**: [Especificación técnica EIP-7732](https://eips.ethereum.org/EIPS/eip-7732)

### Propuesta principal: Listas de acceso a nivel de bloque (BAL) {#bals}

- Elimina los cuellos de botella del procesamiento secuencial al proporcionar un mapa inicial de todas las dependencias de las transacción, preparando el escenario para que los validadores procesen muchas transacciones en paralelo en lugar de una por una.
- Permite que los nodos actualicen sus registros leyendo los resultados finales sin necesidad de reproducir cada transacción (sincronización sin ejecución), lo que hace que la sincronización de un nodo con la red sea mucho más rápida. 
- Elimina las conjeturas, lo que permite a los validadores precargar todos los datos necesarios de una vez en lugar de descubrirlos paso a paso, lo que hace que la validación sea mucho más rápida. 

El Ethereum actual es como una carretera de un solo carril; debido a que la red no sabe qué datos necesitará o modificará una transacción (como qué cuentas afectará una transacción) hasta que se haya ejecutado una transacción, los validadores deben procesar las transacciones una por una en una línea estricta y secuencial. Si intentaran procesar las transacciones todas a la vez, sin conocer estas dependencias, dos transacciones podrían intentar cambiar accidentalmente los mismos datos al mismo tiempo, lo que causaría errores.

**Las listas de acceso a nivel de bloque (BAL, o EIP-7928)** son como un mapa que se incluye en cada bloque, que le dice a la red a qué partes de la base de datos se accederá antes de que comience el trabajo. Las BAL requieren que cada bloque incluya el hash de cada cambio de cuenta que las transacciones tocarán, junto con los resultados finales de esos cambios (el registro hash de todos los accesos al estado y los valores posteriores a la ejecución). 

Debido a que proporcionan visibilidad instantánea sobre qué transacciones no se superponen, los BAL permiten a los nodos realizar lecturas de disco en paralelo, obteniendo información para muchas transacciones simultáneamente. La red puede agrupar de forma segura transacciones no relacionadas y procesarlas en paralelo. 

Dado que el BAL incluye los resultados finales de las transacciones (los valores posteriores a la ejecución), cuando los nodos de la red necesitan sincronizarse con el estado actual de la red, pueden copiar esos resultados finales para actualizar sus registros. Los validadores ya no tienen que volver a ejecutar todas las transacciones complicadas desde cero para saber qué sucedió, lo que hace que sea más rápido y fácil para los nuevos nodos unirse a la red. 

Las lecturas de disco paralelas habilitadas por los BAL serán un paso significativo hacia un futuro en el que Ethereum pueda procesar muchas transacciones a la vez, lo que aumentará significativamente la velocidad de la red.

#### Intercambio de lista de acceso al bloque eth/71 {#bale}

El intercambio de listas de acceso a bloques (eth/71 o EIP-8159) es el complemento directo de las listas de acceso a nivel de bloque. Mientras que las BAL desbloquean la ejecución paralela, eth/71 actualiza el protocolo peer-to-peer para permitir que los nodos compartan estas listas a través de la red. La implementación del intercambio de listas de acceso a bloque permitirá una sincronización más rápida y permitirá a los nodos realizar actualizaciones de estado sin ejecución.

**Recursos**: 
- [Especificación técnica EIP-7928](https://eips.ethereum.org/EIPS/eip-7928)
- [Especificación técnica EIP-8159](https://eips.ethereum.org/EIPS/eip-8159)

## Sostenibilidad de la red {#network-sustainability}

A medida que la red de Ethereum crece más rápido, es importante asegurarse de que el costo de usarla coincida con el desgaste del hardware que ejecuta Ethereum. La red necesita aumentar sus límites de capacidad general para escalar y procesar más transacciones de forma segura. 

### Aumento del coste del gas para la creación de estados {#state-creation-gas-cost-increase}

- Garantiza que las tarifas para crear nuevas cuentas o contratos inteligentes reflejen con precisión la carga a largo plazo que imponen a la base de datos de Ethereum.
- Ajusta automáticamente estas tarifas de creación de datos en función de la capacidad general de la red, con el objetivo de lograr una tasa de crecimiento segura y predecible para que el hardware físico estándar pueda seguir ejecutando la red.
- Separa la contabilidad de estas tarifas específicas en un nuevo depósito, eliminando los antiguos límites de transacción y permitiendo a los desarrolladores implementar aplicaciones más grandes y complejas.

La adición de nuevas cuentas, tokens y [contratos inteligentes](/glossary/#smart-contract) crea datos permanentes (conocidos como "estado") que cada ordenador que ejecuta la red debe almacenar indefinidamente. Las tarifas actuales para añadir o leer estos datos son inconsistentes y no reflejan necesariamente la carga real de almacenamiento a largo plazo que imponen al hardware de la red.

Algunas acciones que crean estado en Ethereum, como la creación de nuevas cuentas o la implementación de grandes contratos inteligentes, han tenido un costo relativamente bajo en comparación con el espacio de almacenamiento permanente que ocupan en los nodos de la red; por ejemplo, la implementación de contratos es significativamente más barata por byte que la creación de espacios de almacenamiento. 

Sin ajustes, el estado de Ethereum podría crecer en casi 200 GiB al año si la red se amplía a un límite de gas, superando finalmente el hardware común. 

**El aumento del coste del gas para la creación de estados (o EIP-8037)** armoniza los costes al vincularlos al tamaño real de los datos que se están creando, actualizando las tarifas para que sean proporcionales a la cantidad de datos permanentes que una operación crea o a los que accede. 

EIP-8037 también introduce un modelo de depósito para gestionar estos costes de forma más predecible; los cargos de gas del estado se extraen primero del `state_gas_reservoir`, y el opcode `GAS` solo devuelve `gas_left`, lo que evita que los marcos de ejecución calculen mal el gas disponible.

Antes de EIP-8037, tanto el trabajo computacional (el procesamiento activo) como el almacenamiento permanente de datos (guardar el contrato inteligente en la base de datos de la red) compartían el mismo límite de gas. El modelo de depósito divide la contabilidad: el límite de gas para el trabajo computacional real de la transacción (procesamiento) y para el almacenamiento de datos a largo plazo (gas de estado). La separación de los dos ayuda a evitar que el tamaño de los datos de una aplicación alcance el límite de gas; siempre que los desarrolladores proporcionen fondos suficientes para llenar el depósito para el almacenamiento de datos, pueden implementar contratos inteligentes mucho más grandes y complejos. 

Almacenar datos de forma más precisa y predecible ayudará a Ethereum a aumentar su velocidad y capacidad de forma segura sin inflar la base de datos. Esta sostenibilidad permitirá a los operadores de nodo seguir utilizando hardware (relativamente) asequible durante los próximos años, manteniendo el staking doméstico accesible para mantener la descentralización de la red.

**Recursos**: [Especificación técnica EIP-8037](https://eips.ethereum.org/EIPS/eip-8037)

### Actualización del costo del gas de acceso estatal {#state-access-gas-cost-update}

- Aumenta los costes de gas para cuando las aplicaciones leen o actualizan información almacenada permanentemente en Ethereum (códigos de operación de acceso al estado) para que coincidan con precisión con el trabajo de cálculo que requieren estos comandos.

A medida que el estado de Ethereum ha crecido, el acto de buscar y leer datos antiguos («acceso al estado ») se ha vuelto más pesado y lento de procesar para los nodos. Las tarifas para estas acciones se han mantenido iguales, aunque ahora es un poco más caro buscar información (en términos de potencia de cálculo). 

Como resultado, algunos comandos específicos tienen actualmente un precio inferior en relación con el trabajo que obligan a realizar a un nodo . `EXTCODESIZE` y `EXTCODECOPY` tienen un precio inferior, por ejemplo, porque requieren dos lecturas de base de datos separadas: una para el objeto de cuenta y una segunda para el tamaño real del código o bytecode.

**La actualización del costo del gas de acceso al estado (o EIP-8038)** aumenta las constantes de gas para los códigos de operación de acceso al estado, como la búsqueda de datos de cuenta y contratos, para alinearse con el rendimiento del hardware moderno y el tamaño del estado. 

Alinear el coste del acceso al estado también ayuda a que Ethereum sea más resistente. Debido a que estas acciones de lectura de datos pesadas son artificialmente baratas, un atacante malicioso podría saturar la red con miles de solicitudes de datos complejas en un solo bloque antes de alcanzar el límite de tarifas de la red, lo que podría hacer que la red se detenga o se bloquee (un ataque de denegación de servicio). Incluso sin intención maliciosa, los desarrolladores no están económicamente incentivados a crear aplicaciones eficientes si la lectura de datos de la red es demasiado barata.

Al fijar precios más precisos para las acciones de acceso al estado, Ethereum puede ser más resistente a las ralentizaciones accidentales o intencionales, mientras que alinear los costes de la red con la carga del hardware demuestra ser una base más sostenible para futuros aumentos del límite de gas.

**Recursos**: [Especificación técnica EIP-8038](https://eips.ethereum.org/EIPS/eip-8038)

## Resiliencia de la red 

Las mejoras en las funciones de los validador y los procesos de salida garantizan la estabilidad de la red durante los eventos de slashing masivo y democratizan la liquidez. Estas mejoras hacen que la red sea más estable y garantizan que todos los participantes, grandes y pequeños, sean tratados de manera justa.

### Excluir a los validadores sancionados de la propuesta {#exclude-slashed-validators}

- Impide que los validadores penalizados (con slashing) sean seleccionados para proponer futuros bloques, eliminando las ranuras garantizadas perdidas.
- Mantiene Ethereum funcionando sin problemas y de forma fiable, evitando graves interrupciones en caso de un evento de slashing masivo.

Actualmente, incluso si un validador es sancionado (penalizado por incumplir las reglas o no funcionar como se esperaba), el sistema podría seguir seleccionándolo para liderar un bloque en un futuro próximo cuando genere futuras preselecciones de proponente. 

Debido a que los bloques de los validadores penalizados se rechazan automáticamente por ser inválidos, esto hace que la red pierda franjas y retrase la recuperación de la red durante eventos de slashing masiva. 

**Excluir a los validadores penalizados de la propuesta (o EIP-8045)** simplemente filtra a los validadores penalizados para que no sean seleccionados para futuras tareas. Esto mejora la resiliencia de la cadena al asegurar que solo los validadores sanos sean seleccionados para proponer bloques, manteniendo la calidad del servicio durante las interrupciones de la red.

**Recursos**: [Especificación técnica EIP-8045](https://eips.ethereum.org/EIPS/eip-8045)

### Permitir que las salidas utilicen la cola de consolidación {#let-exits-use-the-consolidation-queue}

- Cierra una laguna legal que permite a los validadores con saldos elevados salir de la red más rápidamente que los validadores más pequeños a través de la cola de consolidación. 
- Permite que las salidas regulares se desborden a esta segunda cola cuando tiene capacidad de sobra, lo que reduce los tiempos de retirada de las staking durante los períodos de gran volumen.
- Mantiene una seguridad estricta para evitar alterar los límites de seguridad centrales de Ethereum o debilitar la red.

Dado que la [actualización de Pectra](/roadmap/pectra) aumentó el saldo efectivo máximo para los validadores de Ethereum de 32 ETH a 2048 ETH, una laguna técnica permite que los validadores con saldos altos salgan de la red más rápido que los validadores más pequeños a través de la cola de consolidación.

**Permitir que las salidas utilicen la cola de consolidación (o EIP-8080)** democratiza la cola de consolidación para todas las salidas de staking, creando una única fila justa para todos.  

Para desglosar cómo funciona esto hoy en día:

- El límite de rotación de Ethereum es un límite de seguridad sobre la tasa a la que los validadores pueden entrar, salir o fusionar (consolidar) su ETH en participación, para garantizar que la seguridad de la red nunca se desestabilice.
- Debido a que una consolidación de validador es una acción más pesada con más partes móviles que una salida de validador estándar, consume una porción mayor de este presupuesto de seguridad (límite de rotación) 
- Específicamente, el protocolo dicta que el costo de seguridad exacto de una salida estándar es dos tercios (2/3) del costo de una consolidación.

Unas colas de salida más justas permitirán que las salidas estándar tomen prestado espacio no utilizado de la cola de consolidación durante los períodos de alta demanda de salida, aplicando una tasa de cambio de "3 por 2" (por cada 2 espacios de consolidación no utilizados, la red puede procesar de forma segura 3 salidas estándar). Este factor de rotación de 3/2 equilibra la demanda entre las colas de consolidación y de salida.

Democratizar el acceso a la cola de consolidación aumentará la velocidad a la que los usuarios pueden salir de su participar durante los períodos de alta demanda hasta 2,5 veces, sin comprometer la seguridad de la red.

**Recursos**: [Especificación técnica EIP-8080](https://eips.ethereum.org/EIPS/eip-8080)

## Mejorar la experiencia del usuario y del desarrollador {#improve-user-developer-experience}

La actualización Glamsterdam de Ethereum tiene como objetivo mejorar la experiencia del usuario, potenciar la visibilidad de los datos y gestionar el creciente tamaño de los mensajes para evitar fallos de sincronización. Esto facilita el seguimiento de lo que ocurre en cadena, al tiempo que previene problemas técnicos a medida que la red se amplía.

### Reducir los costes intrínsecos del gas de las transacción {#reduce-intrinsic-transaction-gas-costs}

- Reduce la tarifa base de las transacciones, lo que disminuye el coste total de un pago simple en ETH nativo. 
- Hace que las transferencias más pequeñas sean más asequibles, lo que aumenta la viabilidad de Ethereum como medio de intercambio habitual.

Todas las transacciones de Ethereum tienen hoy una tarifa de gas base fija, independientemente de lo simple o complejo que sea procesarlas. **Reducir el gas intrínseco de la transacción (o EIP-2780)** propone reducir esa tarifa base para hacer que una transferencia estándar de ETH entre cuentas existentes sea hasta un 71% más barata. 

Reduce el consumo intrínseco de gas de las transacción al desglosar la tarifa de transacción para reflejar solo el trabajo básico y esencial que realizan los ordenadores que ejecutan la red, como verificar una firma digital y actualizar un saldo. Dado que un pago básico de ETH no ejecuta código complejo ni transporta datos adicionales, esta propuesta reduciría su comisión para que coincida con su huella ligera. 

La propuesta introduce una excepción para la creación de cuentas nuevas con el fin de evitar que las tarifas bajas saturen el estado de la red. Si una transferencia envía ETH a una dirección vacía y no existente, la red debe crear un nuevo registro permanente para ella. Se añade un recargo de gas para la creación de esa cuenta para ayudar a cubrir su carga de almacenamiento a largo plazo. 

En conjunto, el EIP-2780 tiene como objetivo hacer que las transferencias diarias entre las cuentas existentes sean más asequibles, al tiempo que garantiza que la red siga estando protegida contra la sobrecarga de la base de datos mediante la fijación de precios precisos del crecimiento real del estado.

**Recursos**: [Especificación técnica EIP-2780](https://eips.ethereum.org/EIPS/eip-2780)

### Despliegue previo determinista de fábrica {#deterministic-factory-predeploy}

- Ofrece a los desarrolladores una forma nativa de implementar aplicaciones y monederos de contrato inteligente en la misma dirección en múltiples cadenas.
- Permite a los usuarios tener la misma dirección de billetera inteligente en varias redes de capa 2 (L2), lo que reduce la carga cognitiva, la confusión y el riesgo de pérdida accidental de fondos. 
- Reemplaza las soluciones alternativas que los desarrolladores utilizan actualmente para lograr esta paridad, lo que facilita y hace más seguro el desarrollo de monederos y aplicaciones multicadena.

Si un usuario tiene hoy en día una billetera de contrato inteligente con cuentas en varias cadenas compatibles con la Máquina Virtual de Ethereum (EVM), a menudo termina con una dirección completamente diferente en diferentes redes. Esto no solo es confuso, sino que puede provocar la pérdida accidental de fondos. 

**La implementación previa determinista de fábrica (o EIP-7997)** ofrece a los desarrolladores una forma nativa e integrada de implementar sus aplicaciones descentralizado y sus monederos de contrato inteligente en la misma dirección en múltiples cadenas EVM, incluidas la red principal de Ethereum, las redes de capa 2 (L2) y más. Si se adopta, permitiría a los usuarios tener la misma dirección en cada cadena participante, lo que reduciría significativamente la carga cognitiva y la posibilidad de errores por parte del usuario.

La implementación previa de fábrica determinista funciona colocando permanentemente un programa de fábrica mínimo y especializado en una ubicación idéntica (específicamente, la dirección 0x12) en cada cadena compatible con EVM participante. Su objetivo es proporcionar un contrato de fábrica universal y estándar que pueda ser adoptado por cualquier red compatible con EVM; siempre que una cadena EVM participe y adopte este estándar, los desarrolladores podrán utilizarlo para implementar sus contratos inteligentes en la misma dirección en esa red. 

Esta estandarización simplifica la creación y gestión de aplicaciones entre cadenas para los desarrolladores y el ecosistema en general. Los desarrolladores ya no tienen que crear código personalizado y específico de la cadena para vincular su software a través de diferentes redes, sino que utilizan esta fábrica universal para generar exactamente la misma dirección para su aplicación en todas partes. Además, los exploradores de bloque, los servicios de seguimiento y las carteras pueden identificar y vincular más fácilmente estas aplicaciones y cuentas a través de varias cadenas, creando un entorno multicadena más unificado y fluido para todos los participantes basados en Ethereum. 

**Recursos**: [Especificación técnica de EIP-7997](https://eips.ethereum.org/EIPS/eip-7997)

### Las transferencias y quemas de ETH emiten un registro. {#eth-transfers-and-burns-emit-a-log}

- Genera automáticamente un registro permanente (log) cada vez que se transfiere o se quema ETH.
- Soluciona un punto ciego histórico que permite a las aplicaciones, los intercambios y los puentes detectar de forma fiable los depósitos de los usuarios sin necesidad de herramientas de rastreo ad hoc.

A diferencia de los tokens (ERC-20), las transferencias regulares de ETH entre contratos inteligentes no emiten un recibo claro (registro estándar), lo que dificulta su seguimiento por parte de los intercambios y las aplicaciones.

Las transferencias y quemas de ETH emiten un registro (o EIP-7708) que hace obligatorio que la red emita un evento de registro estándar cada vez que se mueve o quema una cantidad distinta de cero de ETH.

Esto facilitará y hará más fiable el seguimiento preciso de los depósitos y movimientos para los operadores de monederos, intercambios y puente, sin necesidad de herramientas personalizadas.

**Recursos**: [Especificación técnica de EIP-7708](https://eips.ethereum.org/EIPS/eip-7708)

### eth/70 listas de recepción de bloque parciales {#eth-70-partial-block-receipt-lists}

A medida que aumentamos la cantidad de trabajo que Ethereum puede realizar, las listas de recibos de esas acciones (los registros de datos de estas transacciones) se están volviendo tan grandes que podrían hacer que los nodos de la red fallen al intentar sincronizar los datos entre sí. 

eth/70, listas de recibos de bloque parciales (o EIP-7975), introduce una nueva forma para que los nodos se comuniquen entre sí (eth/70) que permite que estas grandes listas se dividan en partes más pequeñas y manejables. eth/70 introduce un sistema de paginación para el protocolo de comunicación de la red que permite a los nodos dividir las listas de recibos de bloque y solicitar los datos de forma segura en fragmentos más pequeños y manejables.

Este cambio evitaría fallos de sincronización de la red durante períodos de gran actividad. En última instancia, allana el camino para que Ethereum aumente su capacidad de bloque y procese más transacciones por bloque en el futuro, sin sobrecargar el hardware físico que sincroniza la cadena.

**Recursos**: [Especificación técnica EIP-7975](https://eips.ethereum.org/EIPS/eip-7975)

## Lecturas recomendadas {#further-reading}

- [hoja de ruta de Ethereum](/roadmap/)
- [Pronóstico: Glamsterdam](https://forkcast.org/upgrade/glamsterdam)
- [Glamsterdam Meta EIP](https://eips.ethereum.org/EIPS/eip-7773) 
- [Anuncio en el blog sobre la actualización de las prioridades del protocolo para 2026](https://blog.ethereum.org/2026/02/18/protocol-priorities-update-2026)
- [El podcast Daily Gwei Refuel: Ethereum poscuántico, Glamsterdam está llegando](https://www.youtube.com/watch?v=qx9sd50uQjQ) 

## Preguntas frecuentes {#faq}

### ¿Cómo se puede convertir el ETH después del bifurcación dura de Glamsterdam? {#how-can-eth-be-converted-after-the-hardfork}

- **No se requiere ninguna acción para su ETH**: No es necesario convertir o actualizar su ETH después de la actualización de Glamsterdam. Los saldos de su cuenta seguirán siendo los mismos, y el ETH que posee actualmente seguirá siendo accesible en su forma actual después de la bifurcación dura.
- **¡Cuidado con las estafas!**<Emoji text="⚠️" /> **Cualquier persona que te indique que "actualices" tu ETH está tratando de estafarte.** No hay nada que debas hacer en relación con esta actualización. Tus activos permanecerán completamente inalterados. Recuerda que mantenerse informado es la mejor defensa contra las estafas.

[Más información sobre cómo reconocer y evitar estafas](/security/)

### ¿La actualización de Glamsterdam afecta a todos los nodos y validadores de Ethereum? {#does-the-glamsterdam-upgrade-affect-all-ethereum-nodes-and-validators}

Sí, la actualización de Glamsterdam requiere actualizaciones tanto de [los clientes de ejecución como de los clientes de consenso](/developers/docs/nodes-and-clients/). Debido a que esta actualización introduce la separación integrada de proponente-constructor (ePBS), los operadores de nodo deberán asegurarse de que sus clientes estén actualizados para manejar las nuevas formas en que los bloques son construidos, validados y atestiguados por la red. 

Todos los principales clientes de Ethereum lanzarán versiones que admitan la bifurcación dura marcada como de alta prioridad. Puedes mantenerte al tanto de cuándo estarán disponibles estas versiones en los repositorios de GitHub de los cliente, sus [canales de Discord](https://ethstaker.org/support), el [Discord de EthStaker](https://dsc.gg/ethstaker) o suscribiéndote al blog de Ethereum para recibir actualizaciones del protocolo. 

Para mantener la sincronización con la red de Ethereum después de la actualización, los operadores de nodo deben asegurarse de que están ejecutando una versión de cliente compatible. Tenga en cuenta que la información sobre las versiones de los cliente es sensible al tiempo, y los usuarios deben consultar las últimas actualizaciones para obtener los detalles más actuales.

### Como staker, ¿qué debo hacer para la actualización de Glamsterdam? {#as-a-staker-what-do-i-need-to-do-for-the-glamsterdam-upgrade}

Como con cada actualización de la red, asegúrate de actualizar tus clientes a las últimas versiones marcadas con el soporte de Glamsterdam. Sigue las actualizaciones en la lista de correo y [los anuncios de protocolo en el blog de EF](https://blog.ethereum.org/category/protocol) para estar informado sobre los lanzamientos.

Para validar tu configuración antes de que Glamsterdam se active en la red principal, puedes ejecutar un validador en las redes de prueba. Las bifurcaciones de la red de prueba también se anuncian en la lista de correo y en el blog.

### ¿Qué mejoras incluirá Glamsterdam para el escalado de L1? {#what-improvements-will-glamsterdam-include-for-l1-scaling}

La característica principal es ePBS (EIP-7732), que separa la pesada tarea de validar las transacciones de la red de la tarea de alcanzar el consenso. Esto amplía la ventana de propagación de datos de 2 segundos a aproximadamente 9 segundos, desbloqueando la capacidad de Ethereum para manejar de forma segura un rendimiento de transacción mucho mayor y acomodar más fragmentos de datos para las redes de Capa 2.

### ¿Reducirá Glamsterdam las tarifas de Ethereum (capa 1)? {#will-glamsterdam-lower-fees-on-ethereum-layer-1}

Sí, ¡Glamsterdam probablemente reducirá las tarifas para los usuarios cotidianos! La reducción del gas de transacción intrínseco (o EIP-2780) reduce la tarifa base para enviar ETH, lo que hace que el uso de ETH para pagos cotidianos sea mucho más económico.

Además, para la sostenibilidad a largo plazo, Glamsterdam introduce las listas de acceso a nivel de bloque (BAL). Esto permite el procesamiento paralelo y prepara la L1 para gestionar de forma segura límites de gas generales más altos en el futuro, lo que probablemente reducirá los costes de gas por transacción a medida que la capacidad aumente.

### ¿Habrá algún cambio en mis contratos inteligentes existentes después de Glamsterdam? {#will-my-smart-contracts-change}

Los contratos existentes seguirán funcionando con normalidad después de Glamsterdam. Es probable que los desarrolladores obtengan varias herramientas nuevas y deberían revisar su consumo de gas :
- El aumento del tamaño máximo del contrato (o EIP-7954) permite a los desarrolladores implementar aplicaciones más grandes, elevando el límite máximo del tamaño del contrato de aproximadamente 24 KiB a 32 KiB. 
- La implementación previa determinista de fábrica (o EIP-7997) introduce un contrato de fábrica universal e integrado. Permite a los desarrolladores implementar sus aplicaciones y carteras de contrato inteligente en la misma dirección en todas las cadenas EVM participantes.
- Si tu aplicación depende de un rastreo complejo para encontrar transferencias de ETH, las transferencias y quemas de ETH emiten un registro (o EIP-7708) que te permitirá cambiar al uso de registros para una contabilidad más simple y confiable.
- El aumento del coste del gas para la creación de estados (o EIP-8037) y la actualización del coste del gas para el acceso a los estados (o EIP-8038) introducen nuevos modelos de sostenibilidad que cambiarán ciertos costes de implementación de contratos, ya que la creación de nuevas cuentas o el almacenamiento permanente tendrán una tarifa que se ajustará dinámicamente. 

### ¿Cómo afectará Glamsterdam al almacenamiento de los nodo y a los requisitos de hardware? {#how-will-glamsterdam-affect-node-storage-and-hardware-requirements}

Múltiples EIPs que se están considerando para Glamsterdam dirección el problema del rendimiento del crecimiento estado : 
- El aumento del coste del gas para la creación de estados (o EIP-8037) introduce un modelo de precios dinámico para alcanzar una tasa de crecimiento de la base de datos de estado de 100 GiB/año, lo que garantiza que el hardware físico estándar pueda seguir ejecutando la red de forma eficiente. 
- eth/70 partial bloque receipt lists (o EIP-7975) permite a los nodos solicitar recibos de bloque paginados, lo que divide las listas de recibos de bloque con gran cantidad de datos en fragmentos más pequeños para evitar fallos y sincronizaciones a medida que Ethereum se amplía.

