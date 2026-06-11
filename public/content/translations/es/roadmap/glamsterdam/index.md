---
title: Glamsterdam
description: "Aprende sobre la actualización del protocolo Glamsterdam"
lang: es
---

# Glamsterdam {#glamsterdam}

<Alert variant="update">
<AlertContent>
<AlertTitle>
Glamsterdam es una próxima actualización de Ethereum planeada para el segundo semestre de 2026
</AlertTitle>
<AlertDescription>
La actualización Glamsterdam es solo un paso en los objetivos de desarrollo a largo plazo de Ethereum. Aprende más sobre [la hoja de ruta del protocolo](/roadmap/) y [las actualizaciones anteriores](/ethereum-forks/).
</AlertDescription>
</AlertContent>
</Alert>

La próxima actualización Glamsterdam de [Ethereum](/) está diseñada para despejar el camino hacia la próxima generación de escalabilidad. Glamsterdam recibe su nombre de la combinación de "Amsterdam" (actualización de la capa de ejecución, nombrada por una ubicación anterior de Devconnect) y "Gloas" (actualización de la capa de consenso, nombrada por una estrella).

Tras el progreso logrado en la actualización [Fusaka](/roadmap/fusaka/), Glamsterdam se centra en escalar la capa 1 (L1) reorganizando cómo la red procesa las transacciones y gestiona su creciente base de datos, actualizando fundamentalmente cómo Ethereum crea y verifica los bloques.

Mientras que Fusaka se centró en refinamientos fundamentales, Glamsterdam avanza en los objetivos de "Escalar la L1" y "Escalar los blobs" al consagrar la separación de funciones entre los diferentes participantes de la red, e introducir formas más eficientes de manejar los datos para preparar el [estado](/glossary/#state) para una paralelización de alta capacidad de procesamiento.

Estas mejoras aseguran que Ethereum siga siendo rápido, asequible y descentralizado a medida que maneja más actividad, al tiempo que mantiene los requisitos de hardware manejables para las personas que ejecutan [nodos](/glossary/#node) en casa.

<VideoWatch slug="ethereum-evolution-glamsterdam" />

## Mejoras consideradas para Glamsterdam {#improvements-in-glamsterdam}

<Alert variant="info">
<AlertContent>
<AlertDescription>
Nota: Este artículo destaca actualmente una selección de EIP que se están considerando para su inclusión en Glamsterdam. Otras propuestas que se están probando activamente en redes de desarrollo (devnets) incluyen EIP-7778, EIP-7843, EIP-7976, EIP-7981 y EIP-8024. Para conocer las últimas actualizaciones de estado, consulta la [actualización Glamsterdam en Forkcast](https://forkcast.org/upgrade/glamsterdam).

Si deseas agregar una EIP que se esté considerando para Glamsterdam, pero que aún no se haya agregado a esta página, [aprende cómo contribuir a ethereum.org aquí](/contributing/).
</AlertDescription>
</AlertContent>
</Alert>

La actualización Glamsterdam se centra en tres objetivos principales:

- Acelerar el procesamiento (paralelización): Reorganizar cómo la red registra las dependencias de datos, para que pueda procesar de forma segura muchas transacciones al mismo tiempo en lugar de en una secuencia lenta, una por una.
- Ampliar la capacidad: Dividir el trabajo pesado de crear y verificar bloques, dando a la red más tiempo para propagar mayores cantidades de datos sin ralentizarse.
- Prevenir el exceso de tamaño de la base de datos (sostenibilidad): Ajustar las tarifas de la red para reflejar con precisión el costo de hardware a largo plazo de almacenar nuevos datos, desbloqueando futuros aumentos del límite de gas mientras se previene la degradación del rendimiento del hardware.

En resumen, Glamsterdam introducirá cambios estructurales para garantizar que, a medida que la red aumente su capacidad, siga siendo sostenible y el rendimiento se mantenga alto.


El escalado significativo de la L1 requiere alejarse de los supuestos de confianza fuera del protocolo y de las restricciones de ejecución en serie. Glamsterdam aborda esto al consagrar la separación de ciertas tareas de construcción de bloques e introducir nuevas estructuras de datos que permiten a la red prepararse para el procesamiento en paralelo.
## Escalar la L1 y procesamiento en paralelo {#scale-l1}

Un escalado significativo de la capa 1 (L1) requiere alejarse de los supuestos de confianza fuera del protocolo y de las restricciones de ejecución en serie. Glamsterdam aborda esto al consagrar la separación de ciertas funciones de construcción de bloques e introducir nuevas estructuras de datos que permiten a la red prepararse para el procesamiento en paralelo.

### Propuesta principal: Separación proponente-constructor consagrada (ePBS) {#epbs}

- Elimina los supuestos de confianza fuera del protocolo y la dependencia de retransmisores (relays) de terceros
- Apoya el escalado de la L1 al permitir cargas útiles mucho más grandes a través de ventanas de propagación extendidas
- Introduce pagos a constructores sin necesidad de confianza directamente en el protocolo 
- Requiere actualizaciones arquitectónicas para los grupos de staking para permitir un monitoreo sin necesidad de confianza, aunque la experiencia general del usuario de staking mejora mediante un proceso refinado de selección de constructores

Actualmente, el proceso de proponer y construir bloques incluye un traspaso entre los proponentes de bloques y los constructores de bloques. La relación entre proponentes y constructores no forma parte del protocolo central de Ethereum, por lo que depende de middleware de terceros de confianza, software (retransmisores) y confianza fuera del protocolo entre entidades.

La relación fuera del protocolo entre proponentes y constructores también crea una "ruta crítica" (hot path) durante la validación de bloques que obliga a los [validadores](/glossary/#validator) a apresurarse en la transmisión y ejecución de transacciones en una estrecha ventana de 2 segundos, limitando la cantidad de datos que la red puede manejar.

**La separación proponente-constructor consagrada (ePBS, o EIP-7732)** separa formalmente el trabajo del proponente (quien selecciona el bloque de consenso) del constructor (quien ensambla la carga útil de ejecución), consagrando este traspaso directamente en el protocolo. 

Integrar el intercambio sin necesidad de confianza de una carga útil de bloque por un pago directamente en el protocolo elimina la necesidad de middleware de terceros (como MEV-Boost). Sin embargo, los constructores y proponentes aún podrían optar por usar retransmisores o middleware fuera del protocolo para funciones complejas que aún no forman parte del protocolo central. 

Para abordar el cuello de botella de la "ruta crítica", ePBS también introduce el Comité de Puntualidad de la Carga Útil (PTC, por sus siglas en inglés) y una lógica de doble fecha límite, lo que permite a los validadores dar fe del bloque de consenso y de la puntualidad de la carga útil de ejecución por separado para maximizar la capacidad de procesamiento.

<VideoWatch slug="proposer-builder-separation" />

Separar los roles de proponente y constructor a nivel de protocolo amplía la ventana de propagación (o el tiempo disponible para difundir datos a través de la red) de 2 segundos a unos 9 segundos.

Al reemplazar el middleware y los retransmisores fuera del protocolo con mecánicas dentro del protocolo, ePBS reduce las dependencias de confianza y permite a Ethereum procesar de forma segura cantidades mucho mayores de datos (como más blobs para las [capas 2](/glossary/#layer-2)) sin estresar la red.

**Recursos**: [Especificación técnica de la EIP-7732](https://eips.ethereum.org/EIPS/eip-7732)

### Propuesta principal: Listas de acceso a nivel de bloque (BAL) {#bals}

- Elimina los cuellos de botella del procesamiento secuencial al proporcionar un mapa inicial de todas las dependencias de las transacciones, preparando el escenario para que los validadores procesen muchas transacciones en paralelo en lugar de una por una
- Permite a los nodos actualizar sus registros leyendo los resultados finales sin necesidad de reproducir cada transacción (sincronización sin ejecución), lo que hace que sea mucho más rápido sincronizar un nodo con la red
- Elimina las conjeturas, permitiendo a los validadores precargar todos los datos necesarios a la vez en lugar de descubrirlos paso a paso, lo que hace que la validación sea mucho más rápida

El Ethereum actual es como una carretera de un solo carril; debido a que la red no sabe qué datos necesitará o cambiará una transacción (como qué cuentas tocará una transacción) hasta que se haya ejecutado, los validadores deben procesar las transacciones una por una en una línea estricta y secuencial. Si intentaran procesar las transacciones todas a la vez, sin conocer estas dependencias, dos transacciones podrían intentar accidentalmente cambiar exactamente los mismos datos al mismo tiempo, causando errores.

**Las listas de acceso a nivel de bloque (BAL, o EIP-7928)** funcionan como un mapa para la red, detallando a qué partes de la base de datos se accederá antes de que comience el trabajo. La capa de ejecución almacena la lista de acceso de bloque completa, incluyendo cada cambio de cuenta que tocarán las transacciones, junto con los resultados finales de esos cambios (todos los accesos al estado y los valores posteriores a la ejecución). Para mantener los bloques ligeros, el encabezado del bloque contiene un nuevo campo con una huella digital única (el registro hash) de esta lista.

Debido a que brindan visibilidad instantánea sobre qué transacciones no se superponen, las BAL permiten a los nodos realizar lecturas de disco en paralelo, obteniendo información para muchas transacciones simultáneamente. La red puede agrupar de forma segura transacciones no relacionadas y procesarlas en paralelo.

Como la BAL incluye los resultados finales de las transacciones (los valores posteriores a la ejecución), cuando los nodos de la red necesitan sincronizarse con el estado actual de la red, pueden copiar esos resultados finales para actualizar sus registros. Los validadores ya no tienen que reproducir todas las transacciones complicadas desde cero para saber qué sucedió, lo que hace que sea más rápido y fácil para los nuevos nodos unirse a la red.

Las lecturas de disco en paralelo habilitadas por las BAL serán un paso significativo hacia un futuro en el que Ethereum pueda procesar muchas transacciones a la vez, aumentando significativamente la velocidad de la red.

#### Intercambio de listas de acceso de bloque eth/71 {#bale}

El intercambio de listas de acceso de bloque (eth/71 o EIP-8159) es el complemento de red directo para las listas de acceso a nivel de bloque. Mientras que las BAL desbloquean la ejecución en paralelo, eth/71 actualiza el protocolo entre pares para permitir que los nodos realmente compartan estas listas a través de la red. Ahora requerido para todos los clientes de la capa de ejecución, el intercambio de listas de acceso de bloque permitirá una sincronización más rápida y permitirá a los nodos realizar actualizaciones de estado sin ejecución.

**Recursos**:

- [Especificación técnica de la EIP-7928](https://eips.ethereum.org/EIPS/eip-7928)
- [Especificación técnica de la EIP-8159](https://eips.ethereum.org/EIPS/eip-8159)


A medida que la red Ethereum crece más rápido, es importante asegurar que el costo de usarla coincida con el desgaste del hardware que ejecuta Ethereum. La red necesita aumentar sus límites de capacidad general para escalar de forma segura y procesar más transacciones.
## Sostenibilidad de la red {#network-sustainability}

A medida que la red Ethereum crece más rápido, es importante asegurarse de que el costo de usarla coincida con el desgaste del hardware que ejecuta Ethereum. La red necesita aumentar sus límites de capacidad general para escalar de forma segura y procesar más transacciones.

### Aumento del costo de gas para la creación de estado {#state-creation-gas-cost-increase}

- Asegura que las tarifas para crear nuevas cuentas o contratos inteligentes reflejen con precisión la carga a largo plazo que imponen a la base de datos de Ethereum
- Establece un **costo fijo por byte de estado (CPSB)** apuntando a una tasa de crecimiento segura y predecible de 120 GiB/año, asegurando que el hardware físico estándar pueda continuar ejecutando la red
- Separa la contabilidad de estas tarifas específicas en un nuevo depósito (reservoir), eliminando los antiguos límites de transacciones y permitiendo a los desarrolladores desplegar aplicaciones más grandes y complejas

Agregar nuevas cuentas, tokens y [contratos inteligentes](/glossary/#smart-contract) crea datos permanentes (conocidos como "estado") que cada computadora que ejecuta la red debe almacenar indefinidamente. Las tarifas actuales para agregar o leer estos datos son inconsistentes y no reflejan necesariamente la carga real de almacenamiento a largo plazo que imponen al hardware de la red.

Algunas acciones que crean estado en Ethereum, como crear nuevas cuentas o desplegar grandes contratos inteligentes, han sido de costo relativamente bajo en comparación con el espacio de almacenamiento permanente que ocupan en los nodos de la red; por ejemplo, el despliegue de contratos es significativamente más barato por byte que la creación de ranuras de almacenamiento.

Sin un ajuste, el crecimiento del estado de Ethereum se volvería insostenible a medida que la red escala hacia el piso del límite de gas de 200M habilitado por Glamsterdam (con los desarrolladores probando actualmente en un límite de gas de bloque de referencia de 150M para derivar precios de estado precisos).

**El aumento del costo de gas para la creación de estado (o EIP-8037)** armoniza los costos vinculándolos al tamaño real de los datos que se están creando, actualizando las tarifas para que sean proporcionales a la cantidad de datos permanentes que una operación crea o a los que accede.

La EIP-8037 también introduce un modelo de depósito para gestionar estos costos de forma más predecible; los cargos de gas de estado se extraen primero del `state_gas_reservoir`, y el código de operación `GAS` solo devuelve `gas_left`, evitando que los marcos de ejecución calculen mal el gas disponible. Para respaldar esto, a las tareas esenciales en segundo plano se les otorga una asignación de combustible adicional que va directamente a esta reserva dedicada, asegurando que las operaciones críticas de la red no fallen simplemente porque el almacenamiento de datos permanentes requiere más recursos.

Antes de la EIP-8037, tanto el trabajo computacional (el procesamiento activo) como el almacenamiento de datos permanentes (guardar el contrato inteligente en la base de datos de la red) compartían el mismo límite de gas. El modelo de depósito divide la contabilidad: el límite de gas para el trabajo computacional real de la transacción (procesamiento) y para el almacenamiento de datos a largo plazo (gas de estado). Separar ambos ayuda a evitar que el gran tamaño de los datos de una aplicación alcance el tope del límite de gas; siempre que los desarrolladores proporcionen suficientes fondos para llenar el depósito para el almacenamiento de datos, pueden desplegar contratos inteligentes mucho más grandes y complejos.

Fijar el precio del almacenamiento de datos de forma más precisa y predecible ayudará a Ethereum a aumentar de forma segura su velocidad y capacidad sin sobrecargar la base de datos. Esta sostenibilidad permitirá a los operadores de nodos continuar usando hardware (relativamente) asequible en los próximos años, manteniendo el staking en casa accesible para mantener la descentralización de la red.

**Recursos**: [Especificación técnica de la EIP-8037](https://eips.ethereum.org/EIPS/eip-8037)

### Actualización del costo de gas para el acceso al estado {#state-access-gas-cost-update}

- Aumenta los costos de gas para cuando las aplicaciones leen o actualizan información almacenada permanentemente en Ethereum (códigos de operación de acceso al estado) para que coincidan con precisión con el trabajo de cómputo que requieren estos comandos
- Fortalece la resiliencia de la red al prevenir ataques de denegación de servicio que explotan operaciones de lectura de datos artificialmente baratas

A medida que el estado de Ethereum ha crecido, el acto de buscar y leer datos antiguos ("acceso al estado") se ha vuelto más pesado y lento de procesar para los nodos. Las tarifas por estas acciones han permanecido iguales a pesar de que ahora es un poco más costoso buscar información (en términos de potencia de cómputo).

Como resultado, algunos comandos específicos tienen actualmente un precio inferior al trabajo que obligan a realizar a un nodo. `EXTCODESIZE` y `EXTCODECOPY` tienen un precio inferior, por ejemplo, porque requieren dos lecturas de base de datos separadas: una para el objeto de la cuenta y una segunda para el tamaño del código real o el código de bytes.

**La actualización del costo de gas para el acceso al estado (o EIP-8038)** aumenta las constantes de gas para los códigos de operación de acceso al estado, como la búsqueda de datos de cuentas y contratos, para alinearse con el rendimiento del hardware moderno y el tamaño del estado.

Alinear el costo del acceso al estado también ayuda a hacer que Ethereum sea más resiliente. Debido a que estas pesadas acciones de lectura de datos son artificialmente baratas, un atacante malintencionado podría inundar la red con miles de solicitudes de datos complejas en un solo bloque antes de alcanzar el límite de tarifas de la red, lo que podría causar que la red se detenga o colapse (un ataque de denegación de servicio). Incluso sin intenciones maliciosas, los desarrolladores no se ven incentivados económicamente a construir aplicaciones eficientes si leer datos de la red es demasiado barato.

Al fijar el precio de las acciones de acceso al estado con mayor precisión, Ethereum puede ser más resiliente frente a ralentizaciones accidentales o intencionales, mientras que alinear los costos de la red con la carga del hardware demuestra ser una base más sostenible para futuros aumentos del límite de gas.

**Recursos**: [Especificación técnica de la EIP-8038](https://eips.ethereum.org/EIPS/eip-8038)


Los refinamientos en las tareas de los validadores y los procesos de salida aseguran la estabilidad de la red durante eventos de recortes masivos y democratizan la liquidez. Estas mejoras hacen que la red sea más estable y aseguran que todos los participantes, grandes y pequeños, sean tratados de manera justa.
## Resiliencia de la red {#network-resilience}

Los refinamientos en las funciones de los validadores y los procesos de salida aseguran la estabilidad de la red durante eventos de recortes masivos y democratizan la liquidez. Estas mejoras hacen que la red sea más estable y aseguran que todos los participantes, grandes y pequeños, sean tratados de manera justa.

### Excluir a los validadores penalizados de proponer {#exclude-slashed-validators}

- Evita que los validadores penalizados (recortados) sean seleccionados para proponer bloques futuros, eliminando las ranuras (slots) perdidas garantizadas
- Mantiene a Ethereum funcionando sin problemas y de manera confiable, previniendo paradas severas en caso de un evento de recorte masivo

Actualmente, incluso si un validador es penalizado (recortado por romper las reglas o no operar como se esperaba), el sistema aún podría elegirlo para liderar un bloque en el futuro cercano cuando genera previsiones de futuros proponentes.

Debido a que los bloques de proponentes penalizados son rechazados automáticamente como inválidos, esto causa que la red pierda ranuras y retrasa la recuperación de la red durante eventos de recortes masivos.

**Excluir a los validadores penalizados de proponer (o EIP-8045)** simplemente filtra a los validadores penalizados para que no sean seleccionados para futuras funciones. Esto mejora la resiliencia de la cadena al asegurar que solo se seleccionen validadores saludables para proponer bloques, manteniendo la calidad del servicio durante las interrupciones de la red.

**Recursos**: [Especificación técnica de la EIP-8045](https://eips.ethereum.org/EIPS/eip-8045)

### Permitir que las salidas usen la cola de consolidación {#let-exits-use-the-consolidation-queue}

- Cierra un vacío legal que permite a los validadores de alto saldo salir de la red más rápidamente que los validadores más pequeños a través de la cola de consolidación
- Permite que las salidas regulares se desborden hacia esta segunda cola cuando tiene capacidad de sobra, reduciendo los tiempos de retiro de staking durante períodos de alto volumen
- Mantiene una seguridad estricta para evitar alterar los límites de seguridad centrales de Ethereum o debilitar la red

Dado que la [actualización Pectra](/roadmap/pectra) aumentó el saldo efectivo máximo para los validadores de Ethereum de 32 ETH a 2,048 ETH, un vacío técnico permite a los validadores de alto saldo salir de la red más rápido que los validadores más pequeños a través de la cola de consolidación.

**Permitir que las salidas usen la cola de consolidación (o EIP-8080)** democratiza la cola de consolidación para todas las salidas de staking, creando una fila única y justa para todos.

Para desglosar cómo funciona esto hoy:

- El límite de rotación de Ethereum es un límite de seguridad sobre la tasa a la que los validadores pueden entrar, salir o fusionar (consolidar) sus ETH en staking, para asegurar que la seguridad de la red nunca se desestabilice
- Debido a que la consolidación de un validador es una acción más pesada con más partes móviles que una salida de validador estándar, consume una porción mayor de este presupuesto de seguridad (límite de rotación)
- Específicamente, el protocolo dicta que el costo de seguridad exacto de una salida estándar es dos tercios (2/3) del costo de una consolidación

Las colas de salida más justas permitirán que las salidas estándar tomen prestado espacio no utilizado de la cola de consolidación durante períodos de alta demanda de salida, aplicando un tipo de cambio de "3 por 2" (por cada 2 lugares de consolidación no utilizados, la red puede procesar de forma segura 3 salidas estándar). Este factor de rotación de 3/2 equilibra la demanda entre las colas de consolidación y de salida.

Democratizar el acceso a la cola de consolidación aumentará la velocidad a la que los usuarios pueden retirar su participación durante períodos de alta demanda hasta en 2.5 veces, sin comprometer la seguridad de la red.

**Recursos**: [Especificación técnica de la EIP-8080](https://eips.ethereum.org/EIPS/eip-8080)


La actualización Glamsterdam de Ethereum tiene como objetivo mejorar la experiencia del usuario, potenciar la capacidad de descubrimiento de datos y manejar el aumento del tamaño de los mensajes para prevenir fallas de sincronización. Esto hace que sea más fácil rastrear lo que sucede en cadena mientras se previenen contratiempos técnicos a medida que la red escala.
## Mejorar la experiencia del usuario y del desarrollador {#improve-user-developer-experience}

La actualización Glamsterdam de Ethereum tiene como objetivo mejorar la experiencia del usuario, mejorar la capacidad de descubrimiento de datos y manejar el aumento del tamaño de los mensajes para prevenir fallas de sincronización. Esto hace que sea más fácil rastrear lo que sucede en cadena mientras se previenen contratiempos técnicos a medida que la red escala.

### Reducir los costos intrínsecos de gas de las transacciones {#reduce-intrinsic-transaction-gas-costs}

- Reduce la tarifa base para las transacciones, reduciendo el costo general de un pago simple en ETH nativo
- Hace que las transferencias más pequeñas sean más asequibles, impulsando la viabilidad de Ethereum como un medio de intercambio rutinario

Todas las transacciones de Ethereum tienen hoy una tarifa de gas base fija, independientemente de lo simple o complejo que sea procesarlas. **Reducir el gas intrínseco de las transacciones (o EIP-2780)** propone reducir esa tarifa base para hacer que una transferencia estándar de ETH entre cuentas existentes sea hasta un **71% más barata**.

Reducir el gas intrínseco de las transacciones funciona desglosando la tarifa de transacción para reflejar solo el trabajo básico y esencial que realmente hacen las computadoras que ejecutan la red, como verificar una firma digital y actualizar un saldo. Debido a que un pago básico de ETH no ejecuta código complejo ni transporta datos adicionales, esta propuesta reduciría su tarifa para que coincida con su huella ligera.

La propuesta introduce una excepción para la creación de cuentas completamente nuevas para evitar que las tarifas más bajas abrumen el estado de la red. Si una transferencia envía ETH a una dirección vacía e inexistente, la red debe crear un nuevo registro permanente para ella. Se agrega un recargo de gas por la creación de esa cuenta para ayudar a cubrir su carga de almacenamiento a largo plazo.

En conjunto, la EIP-2780 tiene como objetivo hacer que las transferencias diarias entre cuentas existentes sean más asequibles, al tiempo que garantiza que la red siga protegida contra el exceso de tamaño de la base de datos al fijar con precisión el precio del verdadero crecimiento del estado.

**Recursos**: [Especificación técnica de la EIP-2780](https://eips.ethereum.org/EIPS/eip-2780)

### Despliegue previo de fábrica determinista {#deterministic-factory-predeploy}

- Brinda a los desarrolladores una forma nativa de desplegar aplicaciones y billeteras de contratos inteligentes en exactamente la misma dirección en múltiples cadenas
- Permite a los usuarios tener la misma dirección de billetera inteligente en múltiples redes de capa 2 (L2), reduciendo la carga cognitiva, reduciendo la confusión y reduciendo el riesgo de pérdida accidental de fondos
- Reemplaza las soluciones alternativas que los desarrolladores usan actualmente para lograr esta paridad, haciendo que sea más fácil y seguro construir billeteras y aplicaciones multicadena

Si un usuario tiene hoy una billetera de contrato inteligente con cuentas en múltiples cadenas compatibles con la Máquina Virtual de Ethereum (EVM), a menudo termina con una dirección completamente diferente en diferentes redes. Esto no solo es confuso, sino que puede llevar a la pérdida accidental de fondos.

**El despliegue previo de fábrica determinista (o EIP-7997)** brinda a los desarrolladores una forma nativa e integrada de desplegar sus aplicaciones descentralizadas y billeteras de contratos inteligentes en exactamente la misma dirección en múltiples cadenas EVM, incluyendo la red principal de Ethereum, redes de capa 2 (L2) y más. Si se adopta, permitiría al usuario tener exactamente la misma dirección en cada cadena participante, reduciendo significativamente la carga cognitiva y el potencial de error del usuario.

El despliegue previo de fábrica determinista funciona colocando permanentemente un programa de fábrica mínimo y especializado en una ubicación idéntica (específicamente, la dirección 0x12) en cada cadena compatible con EVM participante. Su objetivo es proporcionar un contrato de fábrica universal y estándar que pueda ser adoptado por cualquier red compatible con EVM; siempre que una cadena EVM participe y adopte este estándar, los desarrolladores podrán usarlo para desplegar sus contratos inteligentes en exactamente la misma dirección en esa red.

Esta estandarización simplifica la construcción y gestión de aplicaciones intercadena para los desarrolladores y el ecosistema en general. Los desarrolladores ya no tienen que escribir código personalizado y específico de la cadena para vincular su software a través de diferentes redes, sino que usan esta fábrica universal para generar exactamente la misma dirección para su aplicación en todas partes. Además, los exploradores de bloques, los servicios de seguimiento y las billeteras pueden identificar y vincular más fácilmente estas aplicaciones y cuentas a través de varias cadenas, creando un entorno multicadena más unificado y fluido para todos los participantes basados en Ethereum.

**Recursos**: [Especificación técnica de la EIP-7997](https://eips.ethereum.org/EIPS/eip-7997)

### Las transferencias y quemas de ETH emiten un registro {#eth-transfers-and-burns-emit-a-log}

- Genera automáticamente un registro permanente (log) cada vez que se transfiere o quema ETH
- Soluciona un punto ciego histórico que permite a las aplicaciones, intercambios y puentes detectar de manera confiable los depósitos de los usuarios sin herramientas de rastreo ad-hoc

A diferencia de los tokens (ERC-20), las transferencias regulares de ETH entre contratos inteligentes no emiten un recibo claro (registro estándar), lo que dificulta su seguimiento para los intercambios y las aplicaciones.

Las transferencias y quemas de ETH emiten un registro (o EIP-7708) hace que sea obligatorio para la red emitir un evento de registro estándar cada vez que se mueve o quema una cantidad de ETH distinta de cero.

Esto hará que sea mucho más fácil y confiable para las billeteras, los intercambios y los operadores de puentes rastrear con precisión los depósitos y movimientos sin herramientas personalizadas.

**Recursos**: [Especificación técnica de la EIP-7708](https://eips.ethereum.org/EIPS/eip-7708)

### Listas parciales de recibos de bloque eth/70 {#eth-70-partial-block-receipt-lists}

A medida que aumentamos la cantidad de trabajo que Ethereum puede hacer, las listas de recibos de esas acciones (los registros de datos de estas transacciones) se están volviendo tan grandes que podrían causar que los nodos de la red fallen al intentar sincronizar datos entre sí.

Ahora un requisito para todos los clientes de la capa de ejecución, las listas parciales de recibos de bloque eth/70 (o EIP-7975) introducen una nueva forma para que los nodos se comuniquen entre sí (eth/70) que permite dividir estas grandes listas en partes más pequeñas y manejables. eth/70 introduce un sistema de paginación para el protocolo de comunicación de la red que permite a los nodos desglosar las listas de recibos de bloque y solicitar de forma segura los datos en fragmentos más pequeños y manejables.

Este cambio prevendría fallas de sincronización de la red durante períodos de gran actividad. En última instancia, allana el camino para que Ethereum aumente su capacidad de bloque y procese más transacciones por bloque en el futuro, sin abrumar el hardware físico que sincroniza la cadena.

**Recursos**: [Especificación técnica de la EIP-7975](https://eips.ethereum.org/EIPS/eip-7975)


- [Hoja de ruta de Ethereum](/roadmap/)
- [Forkcast: Glamsterdam](https://forkcast.org/upgrade/glamsterdam)
- [Meta EIP de Glamsterdam](https://eips.ethereum.org/EIPS/eip-7773)
- [Anuncio en el blog de la actualización de prioridades del protocolo para 2026](https://blog.ethereum.org/2026/02/18/protocol-priorities-update-2026)
- [Podcast The Daily Gwei Refuel - Ethereum poscuántico, Glamsterdam se acerca](https://www.youtube.com/watch?v=qx9sd50uQjQ)
## Lecturas adicionales {#further-reading}

- [Hoja de ruta de Ethereum](/roadmap/)
- [Forkcast: Glamsterdam](https://forkcast.org/upgrade/glamsterdam)
- [Meta EIP de Glamsterdam](https://eips.ethereum.org/EIPS/eip-7773)
- [Anuncio en el blog sobre la actualización de prioridades del protocolo para 2026](https://blog.ethereum.org/2026/02/18/protocol-priorities-update-2026)
- [Podcast The Daily Gwei Refuel - Ethereum poscuántico, Glamsterdam se acerca](https://www.youtube.com/watch?v=qx9sd50uQjQ)




## Preguntas frecuentes {#faq}

### ¿Cómo se puede convertir ETH después de la bifurcación dura Glamsterdam? {#how-can-eth-be-converted-after-the-hardfork}

- **No se requiere ninguna acción para tus ETH**: No hay necesidad de convertir o actualizar tus ETH después de la actualización Glamsterdam. Los saldos de tus cuentas seguirán siendo los mismos, y los ETH que posees actualmente seguirán siendo accesibles en su forma existente después de la bifurcación dura.
- **¡Cuidado con las estafas!** <Emoji text="⚠️" /> **cualquiera que te indique "actualizar" tus ETH está intentando estafarte.** No hay nada que debas hacer en relación con esta actualización. Tus activos permanecerán completamente inalterados. Recuerda, mantenerte informado es la mejor defensa contra las estafas.

[Más sobre cómo reconocer y evitar estafas](/security/)

### ¿La actualización Glamsterdam afecta a todos los nodos y validadores de Ethereum? {#does-the-glamsterdam-upgrade-affect-all-ethereum-nodes-and-validators}

Sí, la actualización Glamsterdam requiere actualizaciones tanto para los [clientes de ejecución como para los clientes de consenso](/developers/docs/nodes-and-clients/). Debido a que esta actualización introduce la separación proponente-constructor consagrada (ePBS), los operadores de nodos deberán asegurarse de que sus clientes estén actualizados para manejar las nuevas formas en que la red construye, valida y da fe de los bloques.

Todos los principales clientes de Ethereum lanzarán versiones que admitan la bifurcación dura marcadas como de alta prioridad. Puedes mantenerte al tanto de cuándo estarán disponibles estos lanzamientos en los repositorios de GitHub de los clientes, sus [canales de Discord](https://ethstaker.org/support), el [Discord de EthStaker](https://dsc.gg/ethstaker), o suscribiéndote al blog de Ethereum para recibir actualizaciones del protocolo.

Para mantener la sincronización con la red Ethereum después de la actualización, los operadores de nodos deben asegurarse de estar ejecutando una versión de cliente compatible. Ten en cuenta que la información sobre los lanzamientos de clientes es sensible al tiempo, y los usuarios deben consultar las últimas actualizaciones para obtener los detalles más actuales.

### Como participante de staking, ¿qué debo hacer para la actualización Glamsterdam? {#as-a-staker-what-do-i-need-to-do-for-the-glamsterdam-upgrade}

Al igual que con cada actualización de la red, asegúrate de actualizar tus clientes a las últimas versiones marcadas con soporte para Glamsterdam. Sigue las actualizaciones en la lista de correo y los [Anuncios del protocolo en el blog de la EF](https://blog.ethereum.org/category/protocol) para informarte sobre los lanzamientos.

Para validar tu configuración antes de que Glamsterdam se active en la red principal, puedes ejecutar un validador en redes de prueba. Las bifurcaciones de las redes de prueba también se anuncian en la lista de correo y en el blog.

### ¿Qué mejoras incluirá Glamsterdam para el escalado de la L1? {#what-improvements-will-glamsterdam-include-for-l1-scaling}

La característica principal es ePBS (EIP-7732), que separa la pesada tarea de validar las transacciones de la red de la tarea de alcanzar el consenso. Esto amplía la ventana de propagación de datos de 2 segundos a aproximadamente 9 segundos, desbloqueando la capacidad de Ethereum para manejar de forma segura una capacidad de procesamiento de transacciones mucho mayor y acomodar más blobs de datos para las redes de capa 2.

### ¿Glamsterdam reducirá las tarifas en Ethereum (capa 1)? {#will-glamsterdam-lower-fees-on-ethereum-layer-1}

¡Sí, lo más probable es que Glamsterdam reduzca las tarifas para los usuarios cotidianos! Reducir el gas intrínseco de las transacciones (o EIP-2780) reduce la tarifa base para enviar ETH, haciendo que ETH sea mucho más barato de usar para pagos diarios.

Además, para la sostenibilidad a largo plazo, Glamsterdam introduce las listas de acceso a nivel de bloque (BAL). Esto habilita el procesamiento en paralelo y prepara a la L1 para manejar de forma segura límites de gas generales más altos en el futuro, lo que probablemente reducirá los costos de gas por transacción a medida que crezca la capacidad.

### ¿Habrá algún cambio en mis contratos inteligentes existentes después de Glamsterdam? {#will-my-smart-contracts-change}

Los contratos existentes continuarán funcionando normalmente después de Glamsterdam. Los desarrolladores probablemente obtendrán varias herramientas nuevas y deberían revisar su uso de gas:

- Aumentar el tamaño máximo del contrato (o EIP-7954) permite a los desarrolladores desplegar aplicaciones más grandes, elevando el límite de tamaño máximo del contrato de aproximadamente 24 KiB a 32 KiB.
- El despliegue previo de fábrica determinista (o EIP-7997) introduce un contrato de fábrica universal e integrado. Permite a los desarrolladores desplegar sus aplicaciones y billeteras de contratos inteligentes en exactamente la misma dirección en todas las cadenas EVM participantes.
- Si tu aplicación depende de un rastreo complejo para encontrar transferencias de ETH, las transferencias y quemas de ETH emiten un registro (o EIP-7708) te permitirá cambiar al uso de registros para una contabilidad más simple y confiable.
- El aumento del costo de gas para la creación de estado (o EIP-8037) y la actualización del costo de gas para el acceso al estado (o EIP-8038) introducen nuevos modelos de sostenibilidad que cambiarán ciertos costos de despliegue de contratos, ya que la creación de nuevas cuentas o almacenamiento permanente tendrá una nueva tarifa fija estandarizada basada en el tamaño de los datos creados.

### ¿Cómo afectará Glamsterdam al almacenamiento de los nodos y a los requisitos de hardware? {#how-will-glamsterdam-affect-node-storage-and-hardware-requirements}

Múltiples EIP bajo consideración para Glamsterdam abordan la caída del rendimiento del crecimiento del estado:

- El aumento del costo de gas para la creación de estado (o EIP-8037) introduce un marco de costo fijo (CPSB) para apuntar a una tasa de crecimiento de la base de datos de estado de 120 GiB/año, asegurando que el hardware físico estándar pueda continuar ejecutando la red de manera eficiente.
- Las listas parciales de recibos de bloque eth/70 (o EIP-7975) permiten a los nodos solicitar recibos de bloque paginados, lo que divide las listas de recibos de bloque con gran cantidad de datos en fragmentos más pequeños para prevenir colapsos y sincronizaciones a medida que Ethereum escala.
