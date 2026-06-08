---
title: Danksharding
description: Aprenda sobre Proto-Danksharding y danksharding: dos actualizaciones secuenciales para escalar Ethereum.
lang: es
summaryPoints:
  - El danksharding es una actualización de múltiples fases para mejorar la escalabilidad y capacidad de Ethereum.
  - La primera etapa, Proto-Danksharding, añade blobs de datos a los bloques.
  - Los blobs de datos ofrecen una forma más barata para que los rollups publiquen datos en Ethereum y esos costos pueden trasladarse a los usuarios en forma de tarifas de transacción más bajas.
  - Más adelante, el danksharding completo distribuirá la responsabilidad de verificar los blobs de datos entre subconjuntos de nodos, escalando aún más Ethereum a más de 100.000 transacciones por segundo.
---

El **danksharding** es la forma en que [Ethereum](/) se convierte en una cadena de bloques verdaderamente escalable, pero se requieren varias actualizaciones del protocolo para llegar allí. El **Proto-Danksharding** es un paso intermedio en el camino. Ambos tienen como objetivo hacer que las transacciones en la capa 2 sean lo más baratas posible para los usuarios y deberían escalar Ethereum a >100.000 transacciones por segundo.

## ¿Qué es el Proto-Danksharding? {#what-is-protodanksharding}

El Proto-Danksharding, también conocido como [EIP-4844](https://eips.ethereum.org/EIPS/eip-4844), es una forma para que los [rollups](/layer-2/#rollups) añadan datos más baratos a los bloques. El nombre proviene de los dos investigadores que propusieron la idea: Protolambda y Dankrad Feist. Históricamente, los rollups habían estado limitados en cuanto a lo baratas que podían hacer las transacciones de los usuarios por el hecho de que publican sus transacciones en `CALLDATA`.

Esto es costoso porque es procesado por todos los nodos de Ethereum y vive en cadena para siempre, a pesar de que los rollups solo necesitan los datos por un corto tiempo. El Proto-Danksharding introduce blobs de datos que pueden enviarse y adjuntarse a los bloques. Los datos en estos blobs no son accesibles para la EVM y se eliminan automáticamente después de un período de tiempo fijo (establecido en 4096 épocas al momento de escribir este artículo, o aproximadamente 18 días). Esto significa que los rollups pueden enviar sus datos de manera mucho más barata y trasladar los ahorros a los usuarios finales en forma de transacciones más baratas.

<ExpandableCard title="¿Por qué los blobs hacen que los rollups sean más baratos?" eventCategory="/roadmap/danksharding" eventName="clicked why do blocks make rollups cheaper?">

Los rollups son una forma de escalar Ethereum mediante el procesamiento por lotes de transacciones fuera de la cadena y luego publicando los resultados en Ethereum. Un rollup está compuesto esencialmente por dos partes: datos y comprobación de ejecución. Los datos son la secuencia completa de transacciones que está siendo procesada por un rollup para producir el cambio de estado que se publica en Ethereum. La comprobación de ejecución es la reejecución de esas transacciones por parte de algún actor honesto (un "probador") para garantizar que el cambio de estado propuesto sea correcto. Para realizar la comprobación de ejecución, los datos de la transacción deben estar disponibles el tiempo suficiente para que cualquiera pueda descargarlos y comprobarlos. Esto significa que cualquier comportamiento deshonesto por parte del secuenciador del rollup puede ser identificado y cuestionado por el probador. Sin embargo, no es necesario que estén disponibles para siempre.

</ExpandableCard>

<ExpandableCard title="¿Por qué está bien eliminar los datos del blob?" eventCategory="/roadmap/danksharding" eventName="clicked why is it OK to delete the blob data?">

Los rollups publican compromisos de sus datos de transacciones en cadena y también hacen que los datos reales estén disponibles en blobs de datos. Esto significa que los probadores pueden comprobar que los compromisos son válidos o cuestionar los datos que creen que son incorrectos. A nivel de nodo, los blobs de datos se mantienen en el cliente de consenso. Los clientes de consenso atestiguan que han visto los datos y que se han propagado por la red. Si los datos se mantuvieran para siempre, estos clientes se sobrecargarían y generarían grandes requisitos de hardware para ejecutar nodos. En su lugar, los datos se podan automáticamente del nodo cada 18 días. Las atestaciones del cliente de consenso demuestran que hubo una oportunidad suficiente para que los probadores verificaran los datos. Los datos reales pueden ser almacenados fuera de la cadena por operadores de rollups, usuarios u otros.

</ExpandableCard>

### ¿Cómo se verifican los datos de los blobs? {#how-are-blobs-verified}

Los rollups publican las transacciones que ejecutan en blobs de datos. También publican un "compromiso" con los datos. Hacen esto ajustando una función polinómica a los datos. Esta función luego puede ser evaluada en varios puntos. Por ejemplo, si definimos una función extremadamente simple `f(x) = 2x-1` entonces podemos evaluar esta función para `x = 1`, `x = 2`, `x = 3` dando los resultados `1, 3, 5`. Un probador aplica la misma función a los datos y la evalúa en los mismos puntos. Si los datos originales cambian, la función no será idéntica y, por lo tanto, tampoco lo serán los valores evaluados en cada punto. En realidad, el compromiso y la prueba son más complicados porque están envueltos en funciones criptográficas.

### ¿Qué es KZG? {#what-is-kzg}

KZG significa Kate-Zaverucha-Goldberg: los nombres de los tres [autores originales](https://link.springer.com/chapter/10.1007/978-3-642-17373-8_11) de un esquema que reduce un blob de datos a un pequeño ["compromiso" criptográfico](https://dankradfeist.de/ethereum/2020/06/16/kate-polynomial-commitments.html). El blob de datos enviado por un rollup debe ser verificado para garantizar que el rollup no se esté comportando mal. Esto implica que un probador vuelva a ejecutar las transacciones en el blob para comprobar que el compromiso era válido. Esto es conceptualmente lo mismo que la forma en que los clientes de ejecución comprueban la validez de las transacciones de Ethereum en la capa 1 utilizando pruebas de Merkle. KZG es una prueba alternativa que ajusta una ecuación polinómica a los datos. El compromiso evalúa el polinomio en algunos puntos de datos secretos. Un probador ajustaría el mismo polinomio sobre los datos y lo evaluaría en los mismos valores, comprobando que el resultado sea el mismo. Esta es una forma de verificar los datos que es compatible con las técnicas de conocimiento cero utilizadas por algunos rollups y, eventualmente, por otras partes del protocolo Ethereum.

### ¿Qué fue la Ceremonia KZG? {#what-is-a-kzg-ceremony}

La ceremonia KZG fue una forma para que muchas personas de toda la comunidad de Ethereum generaran colectivamente una cadena aleatoria secreta de números que se puede utilizar para verificar algunos datos. Es muy importante que esta cadena de números no se conozca y no pueda ser recreada por nadie. Para garantizar esto, cada persona que participó en la ceremonia recibió una cadena del participante anterior. Luego crearon algunos valores aleatorios nuevos (por ejemplo, permitiendo que su navegador midiera el movimiento de su ratón) y los mezclaron con el valor anterior. Luego enviaron el valor al siguiente participante y lo destruyeron de su máquina local. Siempre que una persona en la ceremonia haya hecho esto honestamente, el valor final será incognoscible para un atacante.

La ceremonia KZG de EIP-4844 estuvo abierta al público y decenas de miles de personas participaron para añadir su propia entropía (aleatoriedad). En total hubo más de 140.000 contribuciones, lo que la convierte en la ceremonia más grande del mundo en su tipo. Para que la ceremonia se viera comprometida, el 100% de esos participantes tendrían que ser activamente deshonestos. Desde la perspectiva de los participantes, si saben que fueron honestos, no hay necesidad de confiar en nadie más porque saben que aseguraron la ceremonia (satisficieron individualmente el requisito de 1 de N participantes honestos).

<ExpandableCard title="¿Para qué se utiliza el número aleatorio de la ceremonia KZG?" eventCategory="/roadmap/danksharding" eventName="clicked why is the random number from the KZG ceremony used for?">

Cuando un rollup publica datos en un blob, proporciona un "compromiso" que publica en cadena. Este compromiso es el resultado de evaluar un ajuste polinómico a los datos en ciertos puntos. Estos puntos están definidos por los números aleatorios generados en la ceremonia KZG. Los probadores pueden entonces evaluar el polinomio en los mismos puntos para verificar los datos: si llegan a los mismos valores, entonces los datos son correctos.

</ExpandableCard>

<ExpandableCard title="¿Por qué los datos aleatorios de KZG deben mantenerse en secreto?" eventCategory="/roadmap/danksharding" eventName="clicked why does the KZG random data have to stay secret?">

Si alguien conoce las ubicaciones aleatorias utilizadas para el compromiso, le resulta fácil generar un nuevo polinomio que se ajuste a esos puntos específicos (es decir, una "colisión"). Esto significa que podrían añadir o eliminar datos del blob y aun así proporcionar una prueba válida. Para evitar esto, en lugar de dar a los probadores las ubicaciones secretas reales, en realidad reciben las ubicaciones envueltas en una "caja negra" criptográfica utilizando curvas elípticas. Estas mezclan efectivamente los valores de tal manera que los valores originales no pueden ser sometidos a ingeniería inversa, pero con algo de álgebra inteligente los probadores y verificadores aún pueden evaluar polinomios en los puntos que representan.

</ExpandableCard>

<Alert variant="warning">
  Ni el danksharding ni el Proto-Danksharding siguen el modelo tradicional de "fragmentación" (sharding) que tiene como objetivo dividir la cadena de bloques en múltiples partes. Las cadenas de fragmentos ya no forman parte de la hoja de ruta. En su lugar, el danksharding utiliza el muestreo de datos distribuidos a través de blobs para escalar Ethereum. Esto es mucho más sencillo de implementar. A este modelo a veces se le ha denominado "fragmentación de datos" (data-sharding).
</Alert>

## ¿Qué es el danksharding? {#what-is-danksharding}

El danksharding es la realización completa del escalado de rollups que comenzó con el Proto-Danksharding. El danksharding aportará cantidades masivas de espacio en Ethereum para que los rollups vuelquen sus datos de transacciones comprimidos. Esto significa que Ethereum podrá soportar cientos de rollups individuales con facilidad y hacer realidad millones de transacciones por segundo.

La forma en que esto funciona es expandiendo los blobs adjuntos a los bloques de seis (6) en el Proto-Danksharding, a 64 en el danksharding completo. El resto de los cambios requeridos son todas actualizaciones a la forma en que operan los clientes de consenso para permitirles manejar los nuevos blobs grandes. Varios de estos cambios ya están en la hoja de ruta para otros propósitos independientes del danksharding. Por ejemplo, el danksharding requiere que se haya implementado la separación proponente-constructor (PBS). Esta es una actualización que separa las tareas de construir bloques y proponer bloques entre diferentes validadores. De manera similar, el muestreo de disponibilidad de datos es necesario para el danksharding, pero también es necesario para el desarrollo de clientes muy ligeros que no almacenan muchos datos históricos ("clientes sin estado").

<ExpandableCard title="¿Por qué Danksharding requiere la separación proponente-constructor?" eventCategory="/roadmap/danksharding" eventName="clicked why does danksharding require proposer-builder separation?">

La separación proponente-constructor es necesaria para evitar que los validadores individuales tengan que generar compromisos y pruebas costosos para 32 MB de datos de blobs. Esto pondría demasiada presión sobre los participantes domésticos y requeriría que invirtieran en hardware más potente, lo que perjudica la descentralización. En su lugar, los constructores de bloques especializados asumen la responsabilidad de este costoso trabajo computacional. Luego, ponen sus bloques a disposición de los proponentes de bloques para que los transmitan. El proponente de bloque simplemente elige el bloque que es más rentable. Cualquiera puede verificar los blobs de forma barata y rápida, lo que significa que cualquier validador normal puede comprobar que los constructores de bloques se están comportando honestamente. Esto permite que los blobs grandes se procesen sin sacrificar la descentralización. Los constructores de bloques que se comporten mal podrían simplemente ser expulsados de la red y sufrir un recorte; otros ocuparán su lugar porque la construcción de bloques es una actividad rentable.

</ExpandableCard>

<ExpandableCard title="¿Por qué Danksharding requiere el muestreo de disponibilidad de datos?" eventCategory="/roadmap/danksharding" eventName="clicked why does danksharding require data availability sampling?">

El muestreo de disponibilidad de datos es necesario para que los validadores verifiquen de manera rápida y eficiente los datos de los blobs. Utilizando el muestreo de disponibilidad de datos, los validadores pueden estar muy seguros de que los datos del blob estaban disponibles y se comprometieron correctamente. Cada validador puede muestrear aleatoriamente solo unos pocos puntos de datos y crear una prueba, lo que significa que ningún validador tiene que comprobar todo el blob. Si falta algún dato, se identificará rápidamente y el blob será rechazado.

</ExpandableCard>

### Progreso actual {#current-progress}

Faltan varios años para el danksharding completo. Mientras tanto, la ceremonia KZG ha concluido con más de 140.000 contribuciones, y la [EIP](https://eips.ethereum.org/EIPS/eip-4844) para el Proto-Danksharding ha madurado. Esta propuesta se ha implementado completamente en todas las redes de prueba y se lanzó en la Red principal con la actualización de la red Cancun-Deneb ("Dencun") en marzo de 2024.

### Lecturas adicionales {#further-reading}

- [Notas sobre el Proto-Danksharding](https://notes.ethereum.org/@vbuterin/proto_danksharding_faq) - _Vitalik Buterin_
- [Notas de Dankrad sobre el danksharding](https://notes.ethereum.org/@dankrad/new_sharding)
- [Dankrad, Proto y Vitalik discuten sobre el danksharding](https://www.youtube.com/watch?v=N5p0TB77flM)
- [La ceremonia KZG](https://ceremony.ethereum.org/)
- [Charla de Carl Beekhuizen en Devcon sobre configuraciones de confianza](https://archive.devcon.org/archive/watch/6/the-kzg-ceremony-or-how-i-learnt-to-stop-worrying-and-love-trusted-setups/?tab=YouTube)
- [Más sobre el muestreo de disponibilidad de datos para blobs](https://hackmd.io/@vbuterin/sharding_proposal#ELI5-data-availability-sampling)
- [Dankrad Feist sobre compromisos y pruebas KZG](https://youtu.be/8L2C6RDMV9Q)
- [Compromisos polinómicos KZG](https://dankradfeist.de/ethereum/2020/06/16/kate-polynomial-commitments.html)