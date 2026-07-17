---
title: "Explicación del escalado de la capa 2 de Ethereum"
description: "Una descripción general de las soluciones de escalado de la capa 2 para Ethereum, que incluye los rollups, Plasma, los canales de estado y las cadenas laterales."
lang: es
youtubeId: "BgCgauWVTs0"
uploadDate: 2021-02-03
duration: "0:14:28"
educationLevel: intermediate
topic:
  - "scaling"
  - "layer-2"
format: explainer
author: Finematics
breadcrumb: "Escalado de la capa 2"
---

Un video explicativo de **Finematics** que cubre las soluciones de escalado de la capa 2 para Ethereum, incluidos los canales, Plasma, las cadenas laterales y los rollups, y por qué los rollups están emergiendo como la estrategia de escalado dominante. Aprenda cómo estas tecnologías reducen los costos y aumentan la capacidad de procesamiento mientras heredan la seguridad de Ethereum.

*Esta transcripción es una copia accesible de la [transcripción original del video](https://www.youtube.com/watch?v=BgCgauWVTs0) publicada por Finematics. Ha sido ligeramente editada para facilitar su lectura.*

#### Escalado de Ethereum (0:31) {#ethereum-scaling-031}

El escalado de Ethereum ha sido uno de los temas más discutidos prácticamente desde el momento en que se lanzó la red. El debate sobre el escalado siempre se intensifica después de un período de gran congestión de la red.

Uno de los primeros períodos de este tipo fue el mercado alcista cripto de 2017, donde los infames CryptoKitties junto con las ICO lograron congestionar toda la red de Ethereum, causando un gran aumento en las tarifas de gas. Este año, la congestión de la red volvió aún más fuerte, esta vez causada por la popularidad de las finanzas descentralizadas (DeFi) y la agricultura de rendimiento. Hubo períodos de tiempo en los que incluso tarifas de gas de más de 500 Gwei no lograban que su transacción se verificara por un tiempo.

#### Escalado de cadenas de bloques (1:20) {#scaling-blockchains-120}

Cuando se trata de escalar Ethereum o las cadenas de bloques en general, hay dos formas principales de hacerlo: escalar la capa base en sí (la capa 1) o escalar la red descargando parte del trabajo a otra capa (la capa 2).

La capa 1 es la capa de consenso base estándar donde actualmente se liquidan casi todas las transacciones. El concepto de capas no es exclusivo de Ethereum; otras cadenas de bloques como Bitcoin o Zcash también lo utilizan ampliamente.

La capa 2 es otra capa construida sobre la capa 1. Hay algunos puntos importantes aquí: la capa 2 no requiere ningún cambio en la capa 1; simplemente se puede construir sobre la capa 1 utilizando sus elementos existentes, como los contratos inteligentes. La capa 2 también aprovecha la seguridad de la capa 1 al anclar su estado en la capa 1.

Actualmente, Ethereum puede procesar alrededor de 15 transacciones por segundo en su capa base. El escalado de la capa 2 puede aumentar drásticamente el número de transacciones: dependiendo de la solución, procesando entre 2000 y 4000 transacciones por segundo.

#### Ethereum 2.0 (2:39) {#ethereum-20-239}

¿Qué pasa con Ethereum 2.0? ¿No se suponía que eso escalaría Ethereum? Sí, Ethereum 2.0 introduce la prueba de participación (PoS) y la fragmentación que aumentarán drásticamente la capacidad de procesamiento de transacciones en la capa base.

¿Significa esto que no necesitamos el escalado de la capa 2 cuando se lance Ethereum 2.0? En realidad no: incluso con la fragmentación, Ethereum seguirá necesitando el escalado de la capa 2 para poder manejar cientos de miles o incluso millones de transacciones por segundo en el futuro.

#### El trilema de la escalabilidad (3:15) {#scalability-trilemma-315}

Aquí es también donde entra en juego el famoso trilema de la escalabilidad. En teoría, podríamos omitir la capa 2 por completo y centrarnos en escalar la capa base en su lugar. Esto requeriría nodos altamente especializados para manejar la mayor carga de trabajo, lo que conduciría a una mayor centralización y, por lo tanto, reduciría la seguridad y las propiedades de resistencia a la censura de la red.

Manteniéndonos fieles al hecho de que la escalabilidad nunca debe darse a expensas de la seguridad y la descentralización, nos quedamos con una combinación de escalado de la capa 1 y la capa 2 de cara al futuro.

#### Escalado de la capa 2 (3:52) {#layer-2-scaling-352}

El escalado de la capa 2 es un término colectivo para las soluciones que ayudan a aumentar las capacidades de la capa 1 al manejar transacciones fuera de la cadena. Las dos capacidades principales que se pueden mejorar son la velocidad de las transacciones y la capacidad de procesamiento de las transacciones. Además de eso, las soluciones de la capa 2 pueden reducir en gran medida las tarifas de gas.

Cuando se trata de soluciones de escalado reales, hay múltiples opciones disponibles. Algunas de las opciones están disponibles en este momento y pueden aumentar la capacidad de procesamiento de la red Ethereum a corto y mediano plazo, mientras que otras apuntan a un horizonte temporal de mediano a largo plazo. Algunas soluciones son específicas para aplicaciones (por ejemplo, los canales de pago), mientras que otras, como los rollups optimistas, se pueden usar para cualquier ejecución de contrato arbitraria.

#### Canales (5:03) {#channels-503}

Los canales son una de las primeras soluciones de escalado ampliamente discutidas. Permiten a los participantes intercambiar sus transacciones varias veces mientras solo envían dos transacciones a la capa base. Los tipos de canales más populares son los canales de estado y su subtipo, los canales de pago.

Aunque los canales tienen el potencial de procesar fácilmente miles de transacciones por segundo, vienen con algunas desventajas. No ofrecen participación abierta: los participantes deben conocerse de antemano y los usuarios deben bloquear sus fondos en un contrato multifirma. Además de eso, esta solución de escalado es específica para aplicaciones y no se puede utilizar para escalar contratos inteligentes de propósito general.

El proyecto principal que aprovecha el poder de los canales de estado en Ethereum es Raiden. El concepto de canales de pago también es utilizado ampliamente por la Lightning Network de Bitcoin.

#### Plasma (6:04) {#plasma-604}

Plasma es una solución de escalado de la capa 2 que fue propuesta originalmente por Joseph Poon y Vitalik Buterin. Es un marco de trabajo para construir aplicaciones escalables en Ethereum.

Plasma aprovecha el uso de contratos inteligentes y árboles de Merkle para permitir la creación de un número ilimitado de cadenas secundarias (copias de la cadena de bloques principal de Ethereum). Descargar las transacciones de la cadena principal a las cadenas secundarias permite transacciones rápidas y baratas.

Uno de los inconvenientes de Plasma es un largo período de espera para los usuarios que desean retirar sus fondos de la capa 2. Plasma, de manera similar a los canales, no se puede utilizar para escalar contratos inteligentes de propósito general. La OMG Network está construida sobre su propia implementación de Plasma llamada More Viable Plasma. Matic Network es otro ejemplo de una plataforma que utiliza una versión adaptada del marco de trabajo de Plasma.

#### Cadenas laterales (7:08) {#sidechains-708}

Las cadenas laterales son cadenas de bloques independientes compatibles con Ethereum con sus propios modelos de consenso y parámetros de bloque. La interoperabilidad con Ethereum es posible mediante el uso de la misma Máquina Virtual de Ethereum (EVM), por lo que los contratos implementados en la capa base de Ethereum se pueden implementar directamente en la cadena lateral.

xDai es un ejemplo de una de estas cadenas laterales.

#### Rollups ZK (8:11) {#zk-rollups-811}

Los rollups proporcionan escalado al agrupar (o "enrollar") las transacciones de la cadena lateral en una sola transacción y generar una prueba criptográfica, también conocida como SNARK (Argumento de Conocimiento Sucinto No Interactivo). Solo esta prueba se envía a la capa base. Con los rollups, todo el estado y la ejecución de las transacciones se manejan en las cadenas laterales; la cadena principal de Ethereum solo almacena los datos de las transacciones.

Hay dos tipos de rollups: los rollups ZK y los rollups optimistas.

Los rollups ZK, aunque son más rápidos y eficientes que los rollups optimistas, no proporcionan una manera fácil para que los contratos inteligentes existentes migren a la capa 2.

Los rollups optimistas ejecutan una máquina virtual compatible con la EVM llamada OVM (Máquina Virtual Optimista), que permite ejecutar los mismos contratos inteligentes que se pueden ejecutar en Ethereum. Esto es realmente importante, ya que facilita que los contratos inteligentes existentes mantengan su composabilidad, lo cual es extremadamente relevante en las finanzas descentralizadas (DeFi), donde todos los contratos inteligentes principales ya han sido probados en batalla.

Uno de los principales proyectos que trabaja en rollups optimistas es Optimism, que se está acercando cada vez más al lanzamiento de su Red principal. Cuando se trata de rollups ZK, Loopring y DeversiFi son buenos ejemplos de intercambios descentralizados construidos en la capa 2. Además de eso, tenemos a zkSync que permite pagos cripto escalables.

#### Una hoja de ruta centrada en los rollups (9:18) {#a-rollup-centric-roadmap-918}

La escalabilidad de los rollups también puede ser amplificada por Ethereum 2.0. De hecho, debido a que los rollups solo necesitan que se escale la capa de datos, pueden obtener un tremendo impulso ya en la Fase 1 de Ethereum 2.0, que trata sobre la fragmentación de datos.

A pesar de la variedad de soluciones de escalado de la capa 2 disponibles, parece que la comunidad de Ethereum está convergiendo en el enfoque de escalar principalmente a través de los rollups y la fragmentación de datos de la Fase 1 de Ethereum 2.0. Este enfoque también fue confirmado en una publicación reciente de Vitalik Buterin llamada "Una hoja de ruta de Ethereum centrada en los rollups".

En futuros videos, exploraremos el escalado de la capa base con Ethereum 2.0 y cómo el escalado tanto de la capa 1 como de la capa 2 puede ayudar a hacer que las finanzas descentralizadas sean más accesibles para todos.