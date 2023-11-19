---
title: Danksharding
description: "Más información sobre ProtoDanksharding y Danksharding: dos mejoras secuenciales para escalar Ethereum."
lang: es
summaryPoints:
  - Danksharding es una actualización multifase para mejorar la escalabilidad y capacidad de Ethereum.
  - ProtoDanksharding es la primera etapa y añade objetos binarios a bloques de datos.
  - Los bloques de datos ofrecen una forma más barata para que las acumulaciones envíen datos a Ethereum y esos costes pueden repercutir en los usuarios en forma de tarifas de transacción más bajas.
  - Posteriormente, con la Danksharding completa, difundirá la responsabilidad de verificar los bloques de datos entre subconjuntos de nodos, escalando aún más Ethereum, a más de 100.000 transacciones por segundo.
---

# Danksharding {#danksharding}

Gracias a **Danksharding** (es decir, a la fragmentación), Ethereum se convierte en una cadena de bloques realmente escalable, aunque para llegar aquí, hay varias actualizaciones de protocolo necesarias. **ProtoDanksharding** es un paso intermedio en el camino. Ambas tienen como objetivo hacer que las transacciones a la capa 2 sean tan baratas como sea posible para los usuarios y deben escalar Ethereum a >100.000 transacciones por segundo.

## ¿Qué es ProtoDanksharding? {#what-is-protodanksharding}

ProtoDanksharding, también conocido como [EIP-4844](https://eips.ethereum.org/EIPS/eip-4844), es una manera para que las [acumulaciones](/layer2/#rollups) añadan datos más baratos a bloques. El nombre proviene de los investigadores que propusieron la idea: Protolambda y Dankrad Feist. En la actualidad, las acumulaciones no abaratan precisamente el coste de las transacciones para los usuarios, ya que tienen que enviarlas en `CALLDATA`. Su coste es elevado, ya que requiere del procesamiento de todos los nodos de Ethereum y viven siempre en la cadena, aunque las acumulaciones solo necesitan datos por un tiempo limitado. ProtoDanksharding introduce los blobs de datos que se pueden enviar y adjuntar a los bloques. Los datos en estos blobs no son accesibles a la EVM y se eliminan automáticamente después de un periodo de tiempo fijo (1-3 meses). Esto significa que las acumulaciones pueden enviar datos de forma más barata y repercutir el ahorro al usuario final en la forma de transacciones baratas.

<ExpandableCard title="¿Por qué los blobs hacen las acumulaciones más baratas?" eventCategory="/roadmap/danksharding" eventName="clicked why do blocks make rollups cheaper?">

Las acumulaciones son una forma de escalar en Ethereum por lotes de transacciones fuera de la cadena y después publicar los resultados en Ethereum. Una acumulación se compone básicamente de dos partes: de datos y de verificación de la ejecución. Los datos son la secuencia total de transacciones que procesa una acumulación para producir un cambio en el estado publicado por Ethereum. La verificación de ejecución es la reejecución de esas transacciones por algún actor honesto (un «proveedor») para asegurarse de que el cambio del estado propuesto sea correcto. Para verificar la ejecución, los datos de las transacciones tienen que estar disponibles durante un tiempo para que cualquiera los descargue y verifique. Esto significa que el proveedor puede identificar y cuestionar cualquier mala conducta del secuenciador de acumulaciones. Sin embargo, no tiene que estar dispobible para siempre.

</ExpandableCard>

<ExpandableCard title="¿Por qué es lícito eliminar los datos en masa?" eventCategory="/roadmap/danksharding" eventName="clicked why is it OK to delete the blob data?">

Las acumulaciones envían compromisos a sus datos de transacción en cadena y también hacen que los datos estén disponibles en masas de datos. Esto significa que los proveedores pueden verificar que los compromisos son válidos y desafiar los datos que ellos creen que sea incorrectos. Dentro del nodo, el cliente de consenso mantiene las masas de datos. Los clientes de consenso certifican que ellos han visto los datos y que se están propagando por la red. Si los datos se mantuvieran para siempre, estos clientes se saturarían y sus requisitos para ejecutar los nodos serían ingentes. En lugar de ello, los datos se «podan» (o se limpian) automáticamente del nodo cada 1-3 meses. Las certificaciones del cliente de consenso demuestran que los proveedores tenían suficientes oportunidades de comprobar los datos. Operadores de acumulaciones, usuarios y otros operadores pueden almacenar los datos actuales fuera de la cadena.

</ExpandableCard>

### ¿Cómo se verifican los datos de una masa? {#how-are-blobs-verified}

Las acumulaciones publican las transacciones que ejecutan en las masas de datos. También publican un «compromiso» con los datos. Para ello, ajustan una función polinómica a los datos. Esta función puede evaluarse en varios puntos. Por ejemplo, si definimos una función extremadamente simple `f(x) = 2x-1` entonces podemos evaluarla por `x = 1`, `x = 2`, `x = 3` dando el resultado `1, 3, 5`. Un proveedor aplica la misma función a los datos y la evalúa en los mismos puntos. Si cambian los datos originales, la función no será idéntica y, por lo tanto, tampoco se evaluarán los mismos valores en cada punto. En realidad, el compromiso y prueba son más complicados, porque ellos están involucrados en funciones criptográficas.

### ¿Qué es KZG? {#what-is-kzg}

KZG significa Kate-Zaverucha-Goldberg: el nombre de los tres [autores originales](https://link.springer.com/chapter/10.1007/978-3-642-17373-8_11) de un esquema que reduce una masa de datos hasta un pequeño [«compromiso» criptográfico](https://dankradfeist.de/ethereum/2020/06/16/kate-polynomial-commitments.html). Tiene que verificarse la masa de datos enviada por una acumulación para garantizar que la misma no se esté comportando indebidamente. Esto incluye un proveedor que reejecuta las transacciones en la masa para verificar la fiabilidad del compromiso. Es igual que la forma en que los clientes de ejecución comprueban la validez de las transacciones de Ethereum en la capa 1 usando pruebas de Merkle. KZG es una prueba alternativa que ajusta una ecuación polinómica a la información. El compromiso evalúa el polinomio en algún punto secreto de datos. Un proveedor encajaría el mismo polinómico de los datos y lo evaluaría en los mismos valores, asegurándose de que el resultado fuera el mismo. Es una forma de comprobar que los datos son compatibles con las técnicas de conocimiento cero usadas por algunas acumulaciones y eventualmente otras partes del protocolo de Ethereum.

### ¿Qué es la ceremonia KZG? {#what-is-a-kzg-ceremony}

Una ceremonia KZG es una forma en la que muchas personas de la comunidad de Ethereum pueden generar en conjunto una cadena aleatoria de números secretos que pueden utilizarse para verificar alguna información. Es muy importante que esta cadena de números no sea conocida y no pueda ser recreada por nadie. Para asegurarnos de ello, cada persona que participa en la ceremonia recibe una cadena del participante previo. Entonces crean nuevos valores aleatorios (por ejemplo, permitiendo que su navegador registre el movimiento de su ratón) y los mezclan con el valor anterior. Luego envían el valor al siguiente participante y lo destruyen de su máquina local. Mientras una persona en la ceremonia haga esto con honestidad, el valor final será desconocido para un atacante. La ceremonia EIP-4844 KZG fue abierta al público y decenas de miles de personas participaron para agregar su propia entropía. Para frustrar la ceremonia, el 100 % de los participantes tendría que actuar de mala fe. Desde la perspectiva de los participantes, si saben que se han comportado mal, no necesitan confiar en nadie más, porque saben que aseguraron la ceremonia (cumplieron individualmente con el requisito de 1-de-N participantes honestos).

<ExpandableCard title="¿Para qué se utiliza el número aleatorio de la ceremonia KZG?" eventCategory="/roadmap/danksharding" eventName="clicked why is the random number from the KZG ceremony used for?">

Cuando una acumulación publica datos en un bloque, proporcionan un «compromiso» que publican en la cadena. Este compromiso es el resultado de evaluar un ajuste polinómico a los datos en ciertos puntos. Estos puntos vienen definidos por los números aleatorios generados en la ceremonia KZG. Los demostradores pueden luego evaluar el polinómico en los mismos puntos para comprobar los datos; si llegan a los mismos valores, entonces los datos son correctos.

</ExpandableCard>

<ExpandableCard title="¿Por qué los datos aleatorios de KZG tienen que mantenerse en secreto?" eventCategory="/roadmap/danksharding" eventName="clicked why does the KZG random data have to stay secret?">

Si alguien conoce las ubicaciones aleatorias utilizadas para el compromiso, le resultará fácil generar un nuevo polinómico que se ajuste a esos puntos específicos (es decir, una «colisión»). Esto significa que podrían añadir o eliminar datos de la masa y aún así proporcionar una prueba válida. Para evitarlo, en lugar de proporcionar a los demostradores las ubicaciones secretas reales, en realidad reciben las ubicaciones recogidas en una «caja negra» criptográfica utilizando curvas elípticas. Estas mezclan efectivamente los valores de tal manera que los valores originales no se pueden invertir, pero con un álgebra ingeniosa, los demostradores y verificadores aún pueden evaluar polinómicos en los puntos que representan.

</ExpandableCard>

<InfoBanner isWarning mb={8}>
  Ni el Danksharding ni el ProtoDanksharding siguen el modelo de fragmentación («sharding», en inglés) tradicional que buscaba dividir la cadena de bloques en varias partes. Las cadenas de fragmentación ya no forman parte de la hoja de ruta. En su lugar, Danksharding utiliza el muestreo distribuido de datos en varias masas para escalar Ethereum. Su implementación es mucho más sencilla. A este modelo a veces se le denomina «fragmentación de datos».
</InfoBanner>

## ¿Qué es Danksharding? {#what-is-danksharding}

Danksharding es la máxima expresión de la escalabilidad de las acumulaciones, que comenzó con ProtoDanksharding. Danksharding aportará una gran cantidad de espacio en Ethereum para que las acumulaciones depositen sus datos comprimidos de transacciones. Esto significa que Ethereum será compatible con cientos de acumulaciones individuales con facilidad y hará realidad la posibilidad de realizar millones de transacciones por segundo.

Esto funciona mediante la expansión de las masas de datos adjuntos a los bloques, pasando de 1 en ProtoDanksharding a 64 en Danksharding completo. El resto de los cambios necesarios son todas actualizaciones en la forma en que operan los clientes de consenso para permitirles gestionar las grandes masas. La hoja de ruta ya incluye varias de estas modificaciones con otros objetivos independientes del Danksharding. Por ejemplo, Danksharding requiere que se haya implementado la separación entre el generador de propuestas y el constructor de bloques. Esta es una actualización que separa las tareas de construir bloques y proponer bloques entre diferentes validadores. De manera similar, el Danksharding requiere el muestreo de disponibilidad de datos, aunque también es necesario para el desarrollo de clientes muy ligeros que no almacenen mucha información histórica («clientes sin estado»).

<ExpandableCard title="¿Por qué Danksharding require una separación de proponente-constructor?" eventCategory="/roadmap/danksharding" eventName="clicked why does danksharding require proposer-builder separation?">

La separación entre generador de propuestas y constructor de bloques es necesaria para evitar que los validadores individuales tengan que generar compromisos y pruebas costosas para 32 Mb de masas de datos. Esto ejercería demasiada presión sobre los participantes domésticos y les obligaría a invertir en hardware más potente, lo que perjudica la descentralización. En su lugar, los constructores de bloques especializados asumen la responsabilidad de este costoso trabajo computacional. Luego, ponen sus bloques a disposición de los proponentes de bloques para su difusión. El proponente de bloques simplemente elige el bloque que sea más rentable. Cualquiera puede verificar las masas de datos de manera económica y rápida, lo que significa que cualquier validador normal puede comprobar que los constructores de bloques se están comportando de manera honesta. Esto permite procesar grandes masas sin sacrificar la descentralización. Los constructores de bloques que se comporten de manera incorrecta simplemente podrían ser expulsados de la red con un recorte como penalización, y otros ocuparían su lugar debido a que la construcción de bloques es una actividad rentable.

</ExpandableCard>

<ExpandableCard title="¿Por qué Danksharding requiere muestreo de disponibilidad de datos?" eventCateogry="/roadmap/danksharding" eventName="clicked why does danksharding require data availability sampling?">

El muestreo de disponibilidad de datos es necesario para que los validadores verifiquen de manera rápida y eficiente las masas de datos. Mediante el muestreo de disponibilidad de datos, los validadores pueden estar muy seguros de que las masas de datos están disponibles y se ha comprometido correctamente. Cada validador puede muestrear aleatoriamente solo algunos puntos de datos y crear una prueba, lo que significa que ningún validador tiene que verificar la masa entera. Si falta algún dato, se identifica rápidamente y la masa se rechazará.

</ExpandableCard>

### Progreso actual {#current-progress}

La implementación completa del Danksharding está aún fuera de escena. Sin embargo, ProtoDanksharding debería llegar relativamente pronto. Al cierre de la edición de este documento (febrero de 2023), la ceremonia KZG sigue abierta y hasta el momento ha atraído a más de 50.000 contribuyentes. El [EIP](https://eips.ethereum.org/EIPS/eip-4844) para el ProtoDanksharding está maduro, la especificación se ha acordado y los clientes implementaron prototipos que actualmente se están probando y preparando para producción. El siguiente paso es implementar los cambios en una red de prueba pública. Puede estar al tanto con la [lista de verificación de preparación del EIP 4844](https://github.com/ethereum/pm/blob/master/Breakout-Room/4844-readiness-checklist.md#client-implementation-status).

### Más información {#further-reading}

- [Notas sobre el ProtoDanksharding](https://notes.ethereum.org/@vbuterin/proto_danksharding_faq), _Vitalik Buterin_
- [Notas de Dankrad sobre Danksharding](https://notes.ethereum.org/@dankrad/new_sharding)
- [Dankrad, Proto y Vitalik comentan el Danksharding](https://www.youtube.com/watch?v=N5p0TB77flM)
- [La ceremonia KZG](https://ceremony.ethereum.org/)
- [La charla en Devcon de Carl Beekhuizen en configuraciones de confianza](https://archive.devcon.org/archive/watch/6/the-kzg-ceremony-or-how-i-learnt-to-stop-worrying-and-love-trusted-setups/?tab=YouTube)
- [Más información sobre el muestreo de disponibilidad para masas de datos](https://hackmd.io/@vbuterin/sharding_proposal#ELI5-data-availability-sampling)
- [Dankrad Feist sobre compromisos y pruebas en KZG](https://youtu.be/8L2C6RDMV9Q)
- [Compromisos polinómicos KZG](https://dankradfeist.de/ethereum/2020/06/16/kate-polynomial-commitments.html)
