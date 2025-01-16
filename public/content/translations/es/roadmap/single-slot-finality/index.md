---
title: Finalidad de la ranura única
description: Explicación de la finalidad de la ranura única
lang: es
---

# Finalidad de la ranura única {#single-slot-finality}

Un bloque de Ethereum tarda aproximadamente 15 minutos en finalizar. Sin embargo, podemos hacer que un mecanismo de consenso de bloques validados de Ethereum sea más eficiente y disminuya dramáticamente el tiempo que tarda en finalizarse. En lugar de esperar 15 minutos, la misma ranura podría proponer y finalizar los bloques. Este concepto se conoce como **finalidad de la ranura única (SSF)**.

## ¿Qué es la finalidad? {#what-is-finality}

En la prueba de participación de Ethereum basada en el mecanismo de consenso, la «finalidad» se refiere a la garantía de que un bloque no puede alterarse o eliminarse de la cadena de bloques sin quemar por lo menos un 33 % del total apostado de ETH. Esta es la seguridad de la «criptoeconómica». La confianza viene de que el coste asociado con el cambio de orden o del contenido de la cadena es extremadamente alto, desincentivando a que cualquier entidad económica racional de hacerlo.

## ¿Por qué es interesante que tarde menos en finalizar? {#why-aim-for-quicker-finality}

El tiempo actual que tarda en finalizar es demasiado largo. La mayoría de los usuarios no quieren esperar 15 minutos para finalizar una transacción y esto es un inconveniente para aplicaciones e intercambios que deseen una alta velocidad de transacción y que tienen que esperar mucho tiempo para asegurarse de que sus transacciones sean permanentes. Tener un retraso entre bloques propuestos y su finalidad crea oportunidades de reorganizaciones a corto plazo que atacantes podrían usar para censurar ciertos bloques o extraer MEV. El mecanismo que se encarga de actualizar los bloques por etapas también es bastante complejo y se han hecho varios parches para prevenir riesgos de seguridad, lo que lo convierte en una de las partes de la base de código de Ethereum donde es más probable que surjan errores. Estos problemas podrían ser todos eliminados reduciendo el tiempo de finalidad a una ranura única.

## La compensación en/tiempo/gastos/general de la descentralización {#the-decentralization-time-overhead-tradeoff}

La garantía de finalidad no es una propiedad inmediata de un nuevo bloque; la finalidad de un nuevo bloque lleva su tiempo. La razón reside en que los validadores que representen al menos 2/3 del ETH total apostado en la red tengan la oportunidad de votar (o «certificar») el bloque para que se considere finalizado. Cada nodo validador en la red tiene que procesar las certificaciones de los otros nodos para saber si el bloque ha alcanzado o no el mínimo de dos terceras partes.

Cuanto menos tarde en finalizar, más potencia de computación se requiere de cada nodo, porque el procesamiento de certificación ha de hacerse más rápido. Asimismo, cuantos más nodos de validación existan en la red, más certificaciones tiene que procesar cada bloque, lo que suma más poder de procesamiento requerido de los validadores. Y cuanto más poder de procesamiento se requiera, menos personas pueden participar en la red, ya que el hardware que se necesita para ejecutar cada nodo validador será más costoso. Aumentar el tiempo entre bloques disminuye el poder computacional requerido en cada nodo, pero también aumenta el tiempo para la finalidad, porque las certificaciones se procesan más lentamente.

Por lo tanto, hay una compensación entre el coste (poder de computación), la descentralización (el número de nodos que pueden participar en la validación en la cadena) y el tiempo para finalizar. El sistema ideal busca optimizar elpoder de computación mínimo, la descentralización máxima y el tiempo de finalización mínimo.

El mecanismo de consenso actual de Ethereum equilibra estos tres parámetros por medio de:

- **Ajustar el mínimo de participación a 32 ETH**. Esto fija un máximo de certificaciones que cada nodo puede procesar y, por lo tanto, también fija un máximo de los requisitos computacionales (costes) de cada nodo.
- **Ajusta el tiempo de finalidad a ~ 15 minutos**. Esto da suficiente tiempo para que los validadores puedan ejecutarlo en ordenadores domésticos con seguridad y aún así procesar las certificaciones de cada bloque.

Con el diseño del mecanismo actual, para acortar la finalidad, es necesario que se reduzca el número de validadores en la red o se incrementen los requisitos de hardware en cada nodo. Sin embargo, hay mejoras que pueden hacerse a la forma en que las certificaciones se procesan que pueden permitir contar más certificaciones sin aumentar coste de cada nodo. El procesamiento más eficiente puede permitir que se alcance la finalidad en una sola ranura, en lugar de a través de dos épocas.

## Rutas hacia la SSF {#routes-to-ssf}

<ExpandableCard title= "¿Por qué no podemos usar SSF a día de hoy?" eventCategory="/roadmap/single-slot-finality" eventName="clicked Why can't we hear SSF today?">

El mecanismo de consenso actual combina certificaciones de multiples validadores, conocidos como comités, para reducir el número de mensajes que cada validador tiene que procesar para validar un bloque. Cada validador tiene una oportunidad para certificar en cada época (32 ranuras) pero en cada ranura, solo un subgrupo de validadores, conocido como comité de certificación. Ellos lo hacen al dividirse en subredes en las que se seleccionan a unos cuantos validadores para ser «agregadores». Cada agregador combina todas las firmas de parte de los validadores en su subred en una sola firma. Los agregadores que incluyen los números más grandes de contribuidores individuales pasan su firma combinada al bloque del proponente, quien la incluye en el bloque, junto con la firma combinada de otros comités.

Este proceso proporciona suficiente capacidad para que cada validador vote en cada época, ya que 32 ranuras * 64 comités * 256 validadores por comité = 524.288 validadores por época`. Al cierra de la edición de este documento (febrero de 2023) hay ~513.000 validadores activos.

En este esquema, cada validador solo puede votar en un bloque para distribuir sus certificaciones a través de la época completa. Sin embargo, hay formas potenciales de mejorar el mecanismo para que _cada validador tenga la oportunidad de certificar en cada ranura_.
</ExpandableCard>

Desde que se designó el mecanismo de consenso de Ethereum, el esquema de agregación de firmas (BLS, por sus siglas en inglés) ha resultado ser mucho más escalable de lo que se pensó inicialmente, mientras que también ha mejorado la posibilidad de que los clientes procesen y verifiquen firmas. Resulta que procesar certificaciones de un gran número de validadores puede, de hecho, hacerse en una única ranura. Por ejemplo, con un millón de validadores, votando cada uno dos veces en cada ranura y 16 segundos para cada ranura, se requerirán nodos para verificar firmas a un ritmo mínimo de 125.000 certificaciones por segundo para procesar todo el millón de certificaciones en la ranura. En realidad, a un ordenador normal le lleva cerca de 500 nanosegundos hacer la verificación de una firma, lo que significa que se pueden hacer 125.000 en ~62,5 ms - muy por debajo del umbral de un segundo.

La creación de supercomités podría aumentar aún más la eficacia p. ej., 125.000 validadores seleccionados aleatoriamente por ranura. Solo estos validadores pueden votar en un bloque y, por lo tanto, solo estos subconjuntos de validadores deciden si un bloque se finaliza. Que esto sea una buena idea o no depende, en realidad, de lo caro que la comunidad prefiera que sea un ataque exitoso a Ethereum. Porque en lugar de requerir 2/3 del total de ether apostado, un atacante puede finalizar un bloque deshonesto con 2/3 del ether apostado_en ese supercomité_. Esto todavía es un área activa de la investigación, aunque parece que para un conjunto de validadores lo suficientemente grande como para requerir un supercomité en primer lugar, el coste de atacar uno de esos supercomités sería extremadamente alto (p. ej., el coste de un ataque expresado en ETH sería de `2/3 * 125.000 * 32 = ~2,6 millones de ETH`). El coste del ataque puede ajustarse aumentando el tamaño del conjunto de validadores (p. ej.,. ajusta el tamaño del validador para que el coste del ataque sea igual a 1 millón de ether, 4 millones de ether, 10 millones de ether, etc). Los [sondeos preliminares](https://youtu.be/ojBgyFl6-v4?t=755) de la comunidad parecen sugerir que 1-2 millones de ether es un coste aceptable de ataque, que implica ~65.536 - 97.152 validadores por supercomité.

Sin embargo, la verificación no es obstáculo verdadero, la agregación de las firmas es el verdadero reto de nodos validadores. Escalar la agregación de firmas probablemente requerirá aumentar el número de validadores en cada subred, incrementar la cantidad de subredes o agregar una capa adicional de agregación (por ejemplo, implementar un comité de comités). Parte de la solución podría ser permitir a agregadores especializados, de la misma manera que la construcción de bloques y la generación de compromiso para los datos de las acumulaciones se externalicen a constructores de bloques especializados bajo el marco de la separación proponente-constructor (PBS) y Danksharding.

## ¿Cuál es la función de la norma de elección de bifuración en SSF? {#role-of-the-fork-choice-rule}

El mecanismo de consenso actual depende de una estrecha relación entre el parámetro de finalidad (el algoritmo que determina si dos tercios de los validadores certificaron cierta cadena) y la norma de elección de bifurcación (el algoritmo que decide qué cadena es la correcta en caso de haber múltiples opciones). El algoritmo de decisión de bifurcación solo tiene en cuenta bloques _desde_ el último bloque finalizado. En SSF no habría ningún bloque que la regla de elección de bifurcación pudiera considerar, porque la finalidad ocurre en la misma ranura cuando se propone el bloque. Esto significa que en SSF,_ya sea_ el algoritmo de elección de bifurcación _o_ el mecanismo de finalidad estarían activos en cualquier momento dado. El mecanismo de finalidad finalizaría un bloque con 2/3 de los validadores en línea certificando con honestidad. Si un bloque no puede exceder el 2/3 del umbral, la regla de elección de bifurcación se pondría en marcha para determinar qué cadena seguir. Esto también supone una oportunidad de mantener el mecanismo de pérdida por inactividad que recupera una cadena donde >1/3 de los validadores se desconectan, aunque con algunos matices adicionales.

## Asuntos pendientes {#outstanding-issues}

La agregación de escalabilidad aumentando el número de validadores por subred supone el problema de generar una mayor carga en la red entre pares. Y lo que sucede al añadir capas de agregación es que es bastante complejo de organizar y agrega latencia (es decir, puede llevarle al proveedor del bloque más tiempo controlar todos los agregadores de subredes). Tampoco está claro cómo liderar en el caso de que haya más validadores activos en la red que de los que se pueda procesar de forma viable en cada ranura, incluso agregando la firma BLS. Una solución potencial pasa por que todos los validadores certifiquen cada ranura y se prescinda de los comités en SSF, el límite de 32 ETH en el saldo efectivo podría eliminarse por completo, lo que significa que los operadores que manejan múltiples validadores puedan consolidar su participación y ejecutar menos, reduciendo el número de mensajes que los nodos validadores tengan que procesar para tener en cuenta todo el grupo de validadores. Esto depende de que los grandes participantes estén de acuerdo en consolidar los validadores. Es posible imponer un tope fijo de números de validadores o la cantidad de ETH apostado en cualquier momento. Sin embargo, esto requiere algún mecanismo para decidir a qué validadores se les permite participar y a quiénes no, o quién es responsable de crear efectos secundarios indeseados.

## Progreso actual {#current-progress}

SSF está en su fase de investigación. No se espera que se lance durante varios años, probablemente después de otras mejoras sustanciales como los [árboles de Verkle](/roadmap/verkle-trees/) y [Danksharding](/roadmap/danksharding/).

## Más información {#further-reading}

- [Vitalik habla de SSF en EDCON 2022](https://www.youtube.com/watch?v=nPgUKNPWXNI)
- [Notas de Vitalik: en rumbo a la finalidad de ranura única](https://notes.ethereum.org/@vbuterin/single_slot_finality)
