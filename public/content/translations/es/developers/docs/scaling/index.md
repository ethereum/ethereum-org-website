---
title: Escalabilidad
description: Una introducción a las diferentes opciones de escalabilidad que actualmente está desarrollando la comunidad de Ethereum.
lang: es
sidebarDepth: 3
---

## Resumen de la escalabilidad {#scaling-overview}

A medida que la cantidad de usuarios de Ethereum ha ido creciendo, la cadena de bloques alcanzó ciertos límites en su capacidad. Esto ha hecho que se incrementen los costos para utilizar la red, haciendo necesarias "soluciones de escalado". Actualmente se están investigando, testeando e implementando múltiples soluciones desde distintos enfoques para lograr objetivos similares.

El objetivo principal de la escalabilidad es aumentar la velocidad de las transacciones (finalidad más rápida) y el rendimiento de las transacciones (mayor número de transacciones por segundo) sin sacrificar la descentralización o la seguridad. En la cadena de bloques de capa 1 de Ethereum, la alta demanda provoca transacciones más lentas y [precios del gas](/developers/docs/gas/) inviables. El incremento de la capacidad de la red en términos de velocidad y capacidad de procesamiento es fundamental para la adopción masiva y significativa de Ethereum.

A pesar de que la velocidad y la capacidad de procesamiento son importantes, es esencial que las soluciones de escalado que permitan alcanzar estos objetivos sigan siendo descentralizadas y seguras. Para evitar una progresión hacia un poder de cómputo centralizado e inseguro, es crítico mantener baja la barrera de entrada a los operadores de nodos.

Conceptualmente, primero categorizamos la escalabilidad como en cadena o fuera de la cadena.

## Requisitos previos {#prerequisites}

Es necesario que comprenda todos los temas fundamentales. La implementación de soluciones de escalado es compleja, ya que la tecnología no está demasiado probada y aún continúa en investigación y desarrollo.

## Escalabilidad en cadena {#onchain-scaling}

La escalabilidad en cadena requiere cambios en el protocolo de Ethereum (la [red principal](/glossary/#mainnet) de capa 1). Durante mucho tiempo, se esperaba que la fragmentación de la cadena de bloques escale Ethereum. Esto iba a implicar dividir la cadena de bloques en piezas discretas (fragmentos o shards) para ser verificadas por subconjuntos de validadores. Sin embargo, el escalamiento con rollups de capa 2 ha tomado la delantera como técnica primaria de escalado. Esto se apoya con la adición de una nueva forma más barata de datos adjuntos a bloques de Ethereum que está especialmente diseñada para hacer que los rollups sean más baratos para los usuarios.

### Sharding {#sharding}

La fragmentación, o sharding, es el proceso de división de una base de datos. Subconjuntos de validadores serían responsables de fragmentos individuales en lugar de llevar un seguimiento de todo Ethereum. La fragmentación estuvo en la [hoja de ruta](/roadmap/) de Ethereum durante mucho tiempo, y una vez se tuvo la intención de lanzarla antes de la Fusión a la prueba de participación. Sin embargo, el rápido desarrollo de los [rollups de capa 2](#layer-2-scaling) y la invención de [Danksharding](/roadmap/danksharding) (añadir blobs de datos de rollup a los bloques de Ethereum que los validadores pueden verificar de forma muy eficiente) ha llevado a la comunidad de Ethereum a favorecer la escalabilidad centrada en los rollups en lugar de la escalabilidad por fragmentación. Esto también ayudará a simplificar la lógica de consenso de Ethereum.

## Escalabilidad fuera de la cadena {#offchain-scaling}

Las soluciones fuera de la cadena se implementan por separado de la red principal de capa 1: no requieren cambios en el protocolo existente de Ethereum. Algunas soluciones, conocidas como soluciones de «capa 2», derivan su seguridad directamente del consenso de la capa 1 de Ethereum, como los [rollups optimistas](/developers/docs/scaling/optimistic-rollups/), los [rollups de conocimiento cero](/developers/docs/scaling/zk-rollups/) o los [canales de estado](/developers/docs/scaling/state-channels/). Otras soluciones implican la creación de nuevas cadenas en diversas formas que derivan su seguridad por separado de la red principal, como las [cadenas laterales](#sidechains), los [validiums](#validium) o las [cadenas de plasma](#plasma). Estas soluciones se comunican con la red principal, pero derivan su seguridad de forma diferente para alcanzar una variedad de objetivos.

### Escalabilidad de capa 2 {#layer-2-scaling}

Esta categoría de soluciones fuera de la cadena obtiene su seguridad de la red principal de Ethereum.

Capa 2 es un término colectivo que hace referencia a soluciones diseñadas para ayudar a escalar su aplicación gestionando las transacciones fuera de la red principal de Ethereum (capa 1), al tiempo que se usa el modelo de seguridad robusto y descentralizado de la red principal. La velocidad de transacción se ve afectada cuando la red está ocupada, lo que hace que la experiencia del usuario sea pobre para ciertos tipos de dapps (aplicaciones descentralizadas). Además, a medida que la red se ve más ocupada, los precios del gas aumentan, ya que los remitentes de las transacciones intentan mejorar las ofertas entre sí. Esto puede encarecer mucho el uso de Ethereum.

La mayoría de las soluciones de capa 2 se centran en un servidor o un clúster de servidores, a cada uno de los cuales podemos referirnos como un nodo, validador, operador, secuenciador, creador de bloques o un término similar. Dependiendo de su implementación, estos nodos de capa 2 pueden ser operados por individuos, negocios o entidades que los utilicen, por un tercero o por un gran grupo de individuos (similar a la red principal). Generalmente, las transacciones se envían a estos nodos de capa 2, en lugar de enviarse directamente a la capa 1 (red principal). Para algunas soluciones, la instancia de la capa 2 las agrupa en grupos antes de anclarlas a la capa 1. Tras esta acción están aseguradas por la capa 1 y no se pueden alterar. Los detalles de cómo se realiza esto varían significativamente entre las diferentes tecnologías e implementaciones de capa 2.

Una instancia específica de capa 2 puede ser abierta y compartida por muchas aplicaciones o puede ser implementada por un proyecto y dedicada a brindar soporte exclusivamente a dicha aplicación.

#### ¿Por qué es necesaria la capa 2? {#why-is-layer-2-needed}

- La mayor cantidad de transacciones por segundo mejora ampliamente la experiencia del usuario y reduce la congestión de la red principal de Ethereum.
- Las transacciones se agrupan en una única transacción en la red principal de Ethereum, lo que reduce las tarifas de gas para los usuarios y hace que Ethereum sea más inclusivo y accesible para personas de todo el mundo.
- Las actualizaciones de escalabilidad no deben hacerse a costa de la descentralización o la seguridad; las soluciones de capa 2 reposan sobre Ethereum.
- Hay redes de capa 2 específicas para aplicaciones que aportan su propio conjunto de eficiencias cuando se trabaja con activos a escala.

[Más sobre la capa 2](/layer-2/).

#### Rollups {#rollups}

Los rollups ejecutan transacciones fuera de la capa 1 y luego los datos se publican en la capa 1, donde se alcanza el consenso. Como los datos de las transacciones se incluyen en los bloques de capa 1, esto permite que los rollups estén protegidos por la seguridad nativa de Ethereum.

Hay dos tipos de rollups con diferentes modelos de seguridad:

- **Rollups optimistas**: asume que las transacciones son válidas por defecto y solo ejecuta el cálculo, a través de una [**prueba de fraude**](/glossary/#fraud-proof), en caso de una impugnación. [Más sobre los rollups optimistas](/developers/docs/scaling/optimistic-rollups/).
- **Rollups de conocimiento cero**: ejecuta el cálculo fuera de la cadena y envía una [**prueba de validez**](/glossary/#validity-proof) a la cadena. [Más sobre los rollups de conocimiento cero](/developers/docs/scaling/zk-rollups/).

#### Canales de estado {#channels}

Los canales de estado utilizan contratos multifirma para permitir a los participantes realizar transacciones rápida y libremente fuera de la cadena, y luego resolver la finalidad con la red principal. Esto minimiza la congestión de la red, las tasas y los retrasos. Actualmente, hay dos tipos de canales: de estado y de pago.

Obtenga más información sobre los [canales de estado](/developers/docs/scaling/state-channels/).

### Cadenas laterales {#sidechains}

Una cadena lateral es una cadena de bloques independiente y compatible con la EVM que se ejecuta en paralelo a la red principal. Son compatibles con Ethereum a través de puentes bidireccionales y se ejecutan bajo sus propias reglas de consenso y parámetros de bloque elegidos.

Obtenga más información sobre las [cadenas laterales](/developers/docs/scaling/sidechains/).

### Plasma {#plasma}

Una cadena de plasma es una cadena de bloques independiente que está anclada a la cadena principal de Ethereum y utiliza pruebas de fraude (como los [rollups optimistas](/developers/docs/scaling/optimistic-rollups/)) para arbitrar disputas.

Obtenga más información sobre [Plasma](/developers/docs/scaling/plasma/).

### Validium {#validium}

Una cadena Validium utiliza pruebas de validez como rollups de conocimiento cero, pero los datos no se almacenan en la cadena de capa 1 de Ethereum. Esto puede conducir a 10.000 transacciones por segundo por cadena Validium, y pueden ejecutarse múltiples cadenas en paralelo.

Obtenga más información sobre [Validium](/developers/docs/scaling/validium/).

## ¿Por qué se necesitan tantas soluciones de escalado? {#why-do-we-need-these}

- Múltiples soluciones pueden ayudar a reducir la congestión general en cualquier parte de la red y también a prevenir puntos únicos de fallo.
- El conjunto es mayor que la suma de sus partes. Pueden existir diferentes soluciones y funcionar en armonía, permitiendo un efecto exponencial en la velocidad y la capacidad de procesamiento de transacciones futuras.
- No todas las soluciones requieren utilizar el algoritmo de consenso de Ethereum directamente, y las alternativas pueden ofrecer beneficios que de otro modo serían difíciles de obtener.

## ¿Retiene usted mejor las cosas cuando las ve? {#visual-learner}

<YouTube id="BgCgauWVTs0" />

_Tenga en cuenta que la explicación en el vídeo utiliza el término «Capa 2» para referirse a todas las soluciones de escalabilidad fuera de la cadena, mientras que diferenciamos «Capa 2» como una solución fuera de la cadena que deriva su seguridad a través del consenso de la red principal de la capa 1._

<YouTube id="7pWxCklcNsU" />

## Lecturas adicionales {#further-reading}

- [Una hoja de ruta de Ethereum centrada en los rollups](https://ethereum-magicians.org/t/a-rollup-centric-ethereum-roadmap/4698) _Vitalik Buterin_
- [Análisis actualizados sobre las soluciones de escalabilidad de capa 2 para Ethereum](https://www.l2beat.com/)
- [Evaluación de las soluciones de escalabilidad de la capa 2 de Ethereum: un marco de comparación](https://medium.com/matter-labs/evaluating-ethereum-l2-scaling-solutions-a-comparison-framework-b6b2f410f955)
- [Una guía incompleta de los rollups](https://vitalik.eth.limo/general/2021/01/05/rollup.html)
- [ZK-Rollups impulsados por Ethereum: líderes mundiales](https://hackmd.io/@canti/rkUT0BD8K)
- [Rollups optimistas frente a rollups de conocimiento cero](https://limechain.tech/blog/optimistic-rollups-vs-zk-rollups/)
- [Por qué los rollups y los fragmentos de datos son la única solución sostenible para una alta escalabilidad](https://polynya.medium.com/why-rollups-data-shards-are-the-only-sustainable-solution-for-high-scalability-c9aabd6fbb48)
- [¿Qué tipo de capas 3 tienen sentido?](https://vitalik.eth.limo/general/2022/09/17/layer_3.html)
- [Disponibilidad de datos o: cómo los rollups aprendieron a dejar de preocuparse y a amar a Ethereum](https://web.archive.org/web/20250515194659/https://web.archive.org/web/20241108192208/https://research.2077.xyz/data-availability-or-how-rollups-learned-to-stop-worrying-and-love-ethereum)
- [La guía práctica de los rollups de Ethereum](https://web.archive.org/web/20241108192208/https://research.2077.xyz/the-practical-guide-to-ethereum-rollups)

_¿Conoce algún recurso de la comunidad que le haya sido de ayuda? ¡Edite esta página y agréguela!_
