---
title: Escalabilidad
description: Una introducción a las diferentes opciones de escalabilidad que la comunidad de Ethereum está desarrollando actualmente.
lang: es
sidebarDepth: 3
---

## Visión general de la escalabilidad {#scaling-overview}

A medida que ha crecido el número de personas que usan [Ethereum](/), la cadena de bloques ha alcanzado ciertas limitaciones de capacidad. Esto ha elevado el costo de usar la red, creando la necesidad de "soluciones de escalabilidad". Hay múltiples soluciones que se están investigando, probando e implementando, las cuales adoptan diferentes enfoques para lograr objetivos similares.

El objetivo principal de la escalabilidad es aumentar la velocidad de las transacciones (una finalidad más rápida) y la capacidad de procesamiento de transacciones (mayor número de transacciones por segundo) sin sacrificar la descentralización ni la seguridad. En la cadena de bloques de capa 1 de Ethereum, la alta demanda provoca transacciones más lentas y [precios del gas](/developers/docs/gas/) inviables. Aumentar la capacidad de la red en términos de velocidad y capacidad de procesamiento es fundamental para la adopción masiva y significativa de Ethereum.

Si bien la velocidad y la capacidad de procesamiento son importantes, es esencial que las soluciones de escalabilidad que permiten alcanzar estos objetivos sigan siendo descentralizadas y seguras. Mantener una barrera de entrada baja para los operadores de nodos es fundamental para evitar una progresión hacia un poder de cómputo centralizado e inseguro.

Conceptualmente, primero categorizamos la escalabilidad como escalabilidad en cadena o escalabilidad fuera de la cadena.

## Requisitos previos {#prerequisites}

Debería tener una buena comprensión de todos los temas fundamentales. La implementación de soluciones de escalabilidad es un tema avanzado, ya que la tecnología está menos probada en la práctica y continúa siendo investigada y desarrollada.

## Escalabilidad en cadena {#onchain-scaling}

La escalabilidad en cadena requiere cambios en el protocolo de Ethereum (la [Red principal](/glossary/#mainnet) de capa 1). Durante mucho tiempo, se esperaba que la fragmentación de la cadena de bloques escalara Ethereum. Esto iba a implicar dividir la cadena de bloques en piezas discretas (fragmentos) para ser verificadas por subconjuntos de validadores. Sin embargo, la escalabilidad mediante rollups de capa 2 ha tomado el relevo como la técnica de escalabilidad principal. Esto está respaldado por la adición de una nueva forma de datos más económica adjunta a los bloques de Ethereum, que está especialmente diseñada para hacer que los rollups sean baratos para los usuarios.

### Fragmentación {#sharding}

La fragmentación es el proceso de dividir una base de datos. Subconjuntos de validadores serían responsables de fragmentos individuales en lugar de realizar un seguimiento de todo Ethereum. La fragmentación estuvo en la [hoja de ruta](/roadmap/) de Ethereum durante mucho tiempo, y alguna vez se pretendió lanzar antes de La Fusión hacia la prueba de participación (PoS). Sin embargo, el rápido desarrollo de los [rollups de capa 2](#layer-2-scaling) y la invención del [danksharding](/roadmap/danksharding) (agregar blobs de datos de rollup a los bloques de Ethereum que pueden ser verificados de manera muy eficiente por los validadores) ha llevado a la comunidad de Ethereum a favorecer la escalabilidad centrada en rollups en lugar de la escalabilidad por fragmentación. Esto también ayudará a mantener más simple la lógica de consenso de Ethereum.

## Escalabilidad fuera de la cadena {#offchain-scaling}

Las soluciones fuera de la cadena se implementan por separado de la Red principal de capa 1: no requieren cambios en el protocolo de Ethereum existente. Algunas soluciones, conocidas como soluciones de "capa 2", derivan su seguridad directamente del consenso de Ethereum de capa 1, como los [rollups optimistas](/developers/docs/scaling/optimistic-rollups/), los [rollups de conocimiento cero](/developers/docs/scaling/zk-rollups/) o los [canales de estado](/developers/docs/scaling/state-channels/). Otras soluciones implican la creación de nuevas cadenas en diversas formas que derivan su seguridad de forma separada de la Red principal, como las [cadenas laterales](#sidechains), [Validiums](#validium) o [cadenas Plasma](#plasma). Estas soluciones se comunican con la Red principal, pero derivan su seguridad de manera diferente para obtener una variedad de objetivos.

### Escalabilidad de capa 2 {#layer-2-scaling}

Esta categoría de soluciones fuera de la cadena deriva su seguridad de la red principal de Ethereum.

Capa 2 es un término colectivo para las soluciones diseñadas para ayudar a escalar su aplicación mediante el manejo de transacciones fuera de la red principal de Ethereum (capa 1) mientras se aprovecha el robusto modelo de seguridad descentralizado de la Red principal. La velocidad de las transacciones se resiente cuando la red está ocupada, lo que empobrece la experiencia del usuario para ciertos tipos de aplicaciones descentralizadas (dapps). Y a medida que la red se congestiona más, los precios del gas aumentan ya que los remitentes de transacciones intentan superarse entre sí en las ofertas. Esto puede hacer que usar Ethereum sea muy costoso.

La mayoría de las soluciones de capa 2 se centran en un servidor o grupo de servidores, cada uno de los cuales puede denominarse nodo, validador, operador, secuenciador, productor de bloques o un término similar. Dependiendo de la implementación, estos nodos de capa 2 pueden ser operados por los individuos, empresas o entidades que los usan, o por un operador externo, o por un gran grupo de individuos (similar a la Red principal). En términos generales, las transacciones se envían a estos nodos de capa 2 en lugar de enviarse directamente a la capa 1 (Red principal). Para algunas soluciones, la instancia de capa 2 luego las agrupa en lotes antes de anclarlas a la capa 1, después de lo cual quedan aseguradas por la capa 1 y no pueden ser alteradas. Los detalles de cómo se hace esto varían significativamente entre las diferentes tecnologías e implementaciones de capa 2.

Una instancia específica de capa 2 puede ser abierta y compartida por muchas aplicaciones, o puede ser implementada por un proyecto y dedicada a respaldar solo su aplicación.

#### ¿Por qué es necesaria la capa 2? {#why-is-layer-2-needed}

- El aumento de transacciones por segundo mejora enormemente la experiencia del usuario y reduce la congestión de la red en la red principal de Ethereum.
- Las transacciones se agrupan (rollup) en una sola transacción hacia la red principal de Ethereum, lo que reduce las tarifas de gas para los usuarios y hace que Ethereum sea más inclusivo y accesible para personas de todo el mundo.
- Cualquier actualización de la escalabilidad no debe hacerse a expensas de la descentralización o la seguridad: la capa 2 se construye sobre Ethereum.
- Existen redes de capa 2 específicas para aplicaciones que aportan su propio conjunto de eficiencias al trabajar con activos a gran escala.

[Más sobre la capa 2](/layer-2/).

#### Rollups {#rollups}

Los rollups realizan la ejecución de transacciones fuera de la capa 1 y luego los datos se publican en la capa 1, donde se alcanza el consenso. Como los datos de las transacciones se incluyen en los bloques de la capa 1, esto permite que los rollups estén protegidos por la seguridad nativa de Ethereum.

Hay dos tipos de rollups con diferentes modelos de seguridad:

- **Rollups optimistas**: asumen que las transacciones son válidas por defecto y solo ejecutan el cálculo, a través de una [**prueba de fraude**](/glossary/#fraud-proof), en caso de una impugnación. [Más sobre los rollups optimistas](/developers/docs/scaling/optimistic-rollups/).
- **Rollups de conocimiento cero**: ejecutan el cálculo fuera de la cadena y envían una [**prueba de validez**](/glossary/#validity-proof) a la cadena. [Más sobre los rollups de conocimiento cero](/developers/docs/scaling/zk-rollups/).

#### Canales de estado {#channels}

Los canales de estado utilizan contratos multifirma para permitir a los participantes realizar transacciones de forma rápida y libre fuera de la cadena, y luego liquidar la finalidad con la Red principal. Esto minimiza la congestión de la red, las tarifas y los retrasos. Los dos tipos de canales actualmente son los canales de estado y los canales de pago.

Obtenga más información sobre los [canales de estado](/developers/docs/scaling/state-channels/).

### Cadenas laterales {#sidechains}

Una cadena lateral es una cadena de bloques independiente compatible con la EVM que se ejecuta en paralelo a la Red principal. Estas son compatibles con Ethereum a través de puentes bidireccionales y se ejecutan bajo sus propias reglas de consenso y parámetros de bloque elegidos.

Obtenga más información sobre las [cadenas laterales](/developers/docs/scaling/sidechains/).

### Plasma {#plasma}

Una cadena Plasma es una cadena de bloques separada que está anclada a la cadena principal de Ethereum y utiliza pruebas de fraude (como los [rollups optimistas](/developers/docs/scaling/optimistic-rollups/)) para arbitrar disputas.

Obtenga más información sobre [Plasma](/developers/docs/scaling/plasma/).

### Validium {#validium}

Una cadena Validium utiliza pruebas de validez como los rollups de conocimiento cero, pero los datos no se almacenan en la cadena principal de Ethereum de capa 1. Esto puede llevar a 10.000 transacciones por segundo por cadena Validium y se pueden ejecutar múltiples cadenas en paralelo.

Obtenga más información sobre [Validium](/developers/docs/scaling/validium/).

## ¿Por qué se necesitan tantas soluciones de escalabilidad? {#why-do-we-need-these}

- Múltiples soluciones pueden ayudar a reducir la congestión general en cualquier parte de la red y también prevenir puntos únicos de falla.
- El todo es mayor que la suma de sus partes. Diferentes soluciones pueden existir y trabajar en armonía, permitiendo un efecto exponencial en la velocidad y capacidad de procesamiento de transacciones futuras.
- No todas las soluciones requieren utilizar el algoritmo de consenso de Ethereum directamente, y las alternativas pueden ofrecer beneficios que de otro modo serían difíciles de obtener.

## ¿Aprende mejor de forma visual? {#visual-learner}

<VideoWatch slug="layer-2-scaling-explained" />

_Tenga en cuenta que la explicación en el video usa el término "Capa 2" para referirse a todas las soluciones de escalabilidad fuera de la cadena, mientras que nosotros diferenciamos la "Capa 2" como una solución fuera de la cadena que deriva su seguridad a través del consenso de la Red principal de capa 1._

<VideoWatch slug="rollups-scaling-strategy" />

## Lecturas adicionales {#further-reading}

- [Una hoja de ruta de Ethereum centrada en rollups](https://ethereum-magicians.org/t/a-rollup-centric-ethereum-roadmap/4698) _Vitalik Buterin_
- [Análisis actualizados sobre las soluciones de escalabilidad de capa 2 para Ethereum](https://www.l2beat.com/)
- [Evaluación de las soluciones de escalabilidad de capa 2 de Ethereum: un marco de comparación](https://medium.com/matter-labs/evaluating-ethereum-l2-scaling-solutions-a-comparison-framework-b6b2f410f955)
- [Una guía incompleta sobre los rollups](https://vitalik.eth.limo/general/2021/01/05/rollup.html)
- [ZK-Rollups impulsados por Ethereum: los mejores del mundo](https://hackmd.io/@canti/rkUT0BD8K)
- [Rollups optimistas frente a ZK Rollups](https://limechain.tech/blog/optimistic-rollups-vs-zk-rollups/)
- [Por qué los rollups + fragmentos de datos son la única solución sostenible para una alta escalabilidad](https://polynya.medium.com/why-rollups-data-shards-are-the-only-sustainable-solution-for-high-scalability-c9aabd6fbb48)
- [¿Qué tipo de capas 3 tienen sentido?](https://vitalik.eth.limo/general/2022/09/17/layer_3.html)
- [Disponibilidad de datos o: cómo los rollups aprendieron a dejar de preocuparse y amar a Ethereum](https://web.archive.org/web/20250515194659/https://web.archive.org/web/20241108192208/https://research.2077.xyz/data-availability-or-how-rollups-learned-to-stop-worrying-and-love-ethereum)
- [La guía práctica de los rollups de Ethereum](https://web.archive.org/web/20241108192208/https://research.2077.xyz/the-practical-guide-to-ethereum-rollups)

_¿Conoce algún recurso de la comunidad que le haya ayudado? ¡Edite esta página y agréguelo!_

## Tutoriales: Construya capas 2 escalables en Ethereum {#tutorials}

- [Todo lo que pueda almacenar en caché](/developers/tutorials/all-you-can-cache/) _– Cómo construir y usar un contrato de almacenamiento en caché para reducir los costos de los datos de llamada en los rollups._
- [ABI cortos para la optimización de datos de llamada](/developers/tutorials/short-abi/) _– Cómo usar ABI más cortos para reducir los costos de los datos de llamada para las transacciones de capa 2._