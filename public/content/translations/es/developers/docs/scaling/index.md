---
title: Escalado
description: Introducción a las diferentes opciones de escalado que desarrolla actualmente la comunidad de Ethereum.
lang: es
sidebarDepth: 3
---

## Resumen del escalado {#scaling-overview}

A medida que la cantidad de usuarios de Ethereum ha ido creciendo, la cadena de bloques alcanzó ciertos límites en su capacidad. Esto ha hecho que se incrementen los costos para utilizar la red, haciendo necesarias "soluciones de escalado". Actualmente se están investigando, testeando e implementando múltiples soluciones desde distintos enfoques para lograr objetivos similares.

La meta principal del escalado es incrementar la velocidad de las transacciones (finalidad más rápida) y la capacidad de procesamiento de estas (más transacciones por segundo), sin sacrificar la descentralización o la seguridad de la red (más información sobre la [visión de Ethereum](/roadmap/vision/)). En la cadena de bloques de Ethereum de capa 1, una demanda alta lleva a transacciones más lentas y a [precios de gas](/developers/docs/gas/) inviables. El incremento de la capacidad de la red en términos de velocidad y capacidad de procesamiento es fundamental para la adopción masiva y significativa de Ethereum.

A pesar de que la velocidad y la capacidad de procesamiento son importantes, es esencial que las soluciones de escalado que permitan alcanzar estos objetivos sigan siendo descentralizadas y seguras. Para evitar una progresión hacia un poder de cómputo centralizado e inseguro, es crítico mantener baja la barrera de entrada a los operadores de nodos.

Conceptualmente, la primera categorización que hacemos en cuanto a escalado es entre escalado en cadena ("on-chain") y escalado fuera de cadena ("off-chain").

## Requisitos previos {#prerequisites}

Es necesario que comprenda todos los temas fundamentales. La implementación de soluciones de escalado es compleja, ya que la tecnología no está demasiado probada y aún continúa en investigación y desarrollo.

## Escalado en cadena {#on-chain-scaling}

El método de escalado en cadena ("on-chain") requiere cambios en el protocolo de Ethereum ([red principal](/glossary/#mainnet) de capa 1). Durante mucho tiempo, se esperaba que la fragmentación de la cadena de bloques escale Ethereum. Esto iba a implicar dividir la cadena de bloques en piezas discretas (fragmentos o shards) para ser verificadas por subconjuntos de validadores. Sin embargo, el escalamiento con rollups de capa 2 ha tomado la delantera como técnica primaria de escalado. Esto se apoya con la adición de una nueva forma más barata de datos adjuntos a bloques de Ethereum que está especialmente diseñada para hacer que los rollups sean más baratos para los usuarios.

### Fragmentación {#sharding}

La fragmentación, o sharding, es el proceso de división de una base de datos. Subconjuntos de validadores serían responsables de fragmentos individuales en lugar de llevar un seguimiento de todo Ethereum. El fragmentado estuvo en la [hoja de ruta](/roadmap/) de Ethereum durante mucho tiempo, y alguna vez se pensó en hacerlo realidad antes de la Fusión a prueba de participación. Sin embargo, el rápido desarrollo de los [rollups de capa 2](#layer-2-scaling) y la invención de [Danksharding](/roadmap/danksharding) (agregado de blobs de datos de rollups a bloques de Ethereum que pueden ser verificados de forma muy eficiente por los validadores) ha llevado a la comunidad de Ethereum a favorecer el escalamiento centrado en rollups en lugar de escalar por fragmentación. Esto también ayudará a simplificar la lógica de consenso de Ethereum.

## Escalado fuera de cadena {#off-chain-scaling}

Las soluciones fuera de cadena ("off-chain") se implementan de manera separada a la red principal de capa 1 y no requieren cambios en el protocolo existente de Ethereum. Algunas soluciones, llamadas soluciones de "capa 2", adquieren su seguridad directamente del consenso de Ethereum de capa 1, por ejemplo, los [rollups optimistas](/developers/docs/scaling/optimistic-rollups/), los [rollups de conocimiento cero](/developers/docs/scaling/zk-rollups/) o los [canales de estado](/developers/docs/scaling/state-channels/). Otras soluciones involucran la creación de nuevas cadenas en varias formas que derivan su seguridad por separado de la red principal, como las [cadenas laterales](#sidechains), los [validiums](#validium) o las [cadenas de plasma](#plasma). Estas soluciones se comunican con la red principal, pero obtienen su seguridad de manera diferente para perseguir una variedad de objetivos.

### Escalado de capa 2 {#layer-2-scaling}

Esta categoría de soluciones fuera de cadena obtiene su seguridad de la red principal de Ethereum.

Capa 2 es un término colectivo que hace referencia a soluciones diseñadas para ayudar a escalar su aplicación gestionando las transacciones fuera de la red principal de Ethereum (capa 1), al tiempo que se usa el modelo de seguridad robusto y descentralizado de la red principal. La velocidad de transacción se ve afectada cuando la red está ocupada, lo que hace que la experiencia del usuario sea pobre para ciertos tipos de dapps (aplicaciones descentralizadas). Además, a medida que la red se ve más ocupada, los precios del gas aumentan, ya que los remitentes de las transacciones intentan mejorar las ofertas entre sí. Esto puede encarecer mucho el uso de Ethereum.

La mayoría de las soluciones de capa 2 se centran en un servidor o un clúster de servidores, a cada uno de los cuales podemos referirnos como un nodo, validador, operador, secuenciador, creador de bloques o un término similar. Dependiendo de su implementación, estos nodos de capa 2 pueden ser operados por individuos, negocios o entidades que los utilicen, por un tercero o por un gran grupo de individuos (similar a la red principal). Generalmente, las transacciones se envían a estos nodos de capa 2, en lugar de enviarse directamente a la capa 1 (red principal). Para algunas soluciones, la instancia de la capa 2 agrupa las transacciones antes de anclarlas a la capa1, luego de lo cual estas son aseguradas por la capa 1 y ya no pueden ser alteradas. Los detalles de cómo se realiza esto varían significativamente entre las diferentes tecnologías e implementaciones de la capa 2.

Una instancia específica de capa 2 puede ser abierta y compartida por muchas aplicaciones o puede ser implementada por un proyecto y dedicada a brindar soporte exclusivamente a dicha aplicación.

#### ¿Por qué es necesaria la capa 2? {#why-is-layer-2-needed}

- La mayor cantidad de transacciones por segundo mejora ampliamente la experiencia del usuario y reduce la congestión de la red principal de Ethereum.
- Las transacciones se agrupan en una sola transacción hacia la red principal de Ethereum, lo que reduce el gasto de gas para los usuarios y hace que Ethereum sea más inclusivo y más accesible para personas de todo el mundo.
- Las actualizaciones de escalabilidad no deben hacerse a costa de la descentralización o la seguridad; las soluciones de capa 2 reposan sobre Ethereum.
- Hay redes de capa 2 específicas a ciertas aplicaciones que brindan su propio conjunto de eficiencias al trabajar con activos a gran escala.

[Más información sobre la capa 2](/layer-2/).

#### Rollups {#rollups}

Los rollups ejecutan transacciones fuera de la capa 1 y luego los datos se publican en la capa 1, donde se alcanza el consenso. Como los datos de las transacciones se incluyen en los bloques de capa 1, esto permite que los rollups estén protegidos por la seguridad nativa de Ethereum.

Hay dos tipos de rollups con diferentes modelos de seguridad:

- **Rollups optimistas**: asumen que las transacciones son válidas de forma predeterminada y solo ejecutan cómputo a través de una [**prueba de fraude**](/glossary/#fraud-proof) en caso de que haya un reclamo. [Obtenga más información sobre los rollups optimistas](/developers/docs/scaling/optimistic-rollups/).
- **Rollups de conocimiento cero**: realizan la ejecución de las transacciones fuera de la cadena y envían una [**prueba de validez**](/glossary/#validity-proof) a la cadena. [Obtenga más información sobre los rollups de conocimiento cero](/developers/docs/scaling/zk-rollups/).

#### Canales de estado {#channels}

Los canales de estado utilizan contratos multifirma para permitir a los participantes realizar transacciones de forma rápida y libre fuera de la cadena y luego establecer la finalidad con la red principal. Esto minimiza la congestión de la red, las tasas y los retrasos. Actualmente, hay dos tipos de canales: de estado y de pago.

Obtenga más información acerca de los [canales de estado](/developers/docs/scaling/state-channels/).

### Cadenas laterales {#sidechains}

Una cadena lateral es una cadena de bloques independiente compatible con EVM que funciona en paralelo a la red principal. Son compatibles con Ethereum a través de puentes bidireccionales y funcionan bajo sus propias reglas de consenso y parámetros de bloque.

Obtenga más información acerca de las [cadenas laterales](/developers/docs/scaling/sidechains/).

### Plasma {#plasma}

Una cadena de plasma es una cadena de bloques separada que está anclada a la cadena principal de Ethereum, y usa pruebas de fraude (como los [rollups optimistas](/developers/docs/scaling/optimistic-rollups/)) para arbitrar disputas.

Obtenga más información acerca de [Plasma](/developers/docs/scaling/plasma/).

### Validium {#validium}

Una cadena Validium utiliza pruebas de validez como rollups de conocimiento cero, pero los datos no se almacenan en la cadena de capa 1 de Ethereum. Esto puede conducir a 10.000 transacciones por segundo por cadena Validium, y pueden ejecutarse múltiples cadenas en paralelo.

Obtenga más información sobre [Validium](/developers/docs/scaling/validium/).

## ¿Por qué se necesitan tantas soluciones de escalado? {#why-do-we-need-these}

- Las soluciones múltiples pueden ayudar a reducir la congestión general en cualquier parte de la red y también evitan los puntos únicos de fallo.
- El conjunto es mayor que la suma de sus partes. Pueden existir diferentes soluciones y funcionar en armonía, permitiendo un efecto exponencial en la velocidad y la capacidad de procesamiento de transacciones futuras.
- No todas las soluciones requieren utilizar el algoritmo de consenso de Ethereum directamente, y las alternativas pueden ofrecer beneficios que de otro modo serían difíciles de obtener.
- Ninguna solución de escalado es suficiente para llevar a cabo la [visión de Ethereum](/roadmap/vision/).

## ¿Es más bien de los que aprende viendo? {#visual-learner}

<YouTube id="BgCgauWVTs0" />

_Obsérvese que la explicación del video utiliza el término "Capa 2" para referirse a todas las soluciones de escalado fuera de cadena, mientras que nosotros diferenciamos "Capa 2" como una solución fuera de cadena que obtiene su seguridad a través del consenso de la red principal de capa 1._

<YouTube id="7pWxCklcNsU" />

## Más información {#further-reading}

- [Una hoja de ruta de Ethereum centrada en los rollups](https://ethereum-magicians.org/t/a-rollup-centric-ethereum-roadmap/4698) _Vitalik Buterin_
- [Análisis actualizados sobre soluciones de escalado de capa 2 para Ethereum](https://www.l2beat.com/)
- [Evaluación de soluciones de escalado de capa 2 de Ethereum: marco de comparación](https://medium.com/matter-labs/evaluating-ethereum-l2-scaling-solutions-a-comparison-framework-b6b2f410f955)
- [Guía incompleta sobre los rollups](https://vitalik.eth.limo/general/2021/01/05/rollup.html)
- [Rollups de conocimiento cero (ZK) con tecnología de Ethereum: los mejores del mundo](https://hackmd.io/@canti/rkUT0BD8K)
- [Rollups optimistas vs. rollups de conocimiento cero (ZK)](https://limechain.tech/blog/optimistic-rollups-vs-zk-rollups/)
- [Escalabilidad de la cadena de bloques de conocimiento cero](https://ethworks.io/assets/download/zero-knowledge-blockchain-scaling-ethworks.pdf)
- [Por qué los rollups y los fragmentos de datos son la única solución sustentable para la alta escalabilidad](https://polynya.medium.com/why-rollups-data-shards-are-the-only-sustainable-solution-for-high-scalability-c9aabd6fbb48)
- [¿Qué tipo de capas 3 tienen sentido?](https://vitalik.eth.limo/general/2022/09/17/layer_3.html)
- [Disponibilidad De Datos O: Cómo Los Rollups Aprendieron A Dejar De Preocuparse Y Amar A Ethereum](https://ethereum2077.substack.com/p/data-availability-in-ethereum-rollups)

_¿Conoce algún recurso de la comunidad que le haya servido de ayuda? Edite esta página y añádalo._
