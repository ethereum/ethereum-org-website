---
title: Asegurar Ethereum para el futuro
description: Estas actualizaciones consolidan a Ethereum como el fundamento descentralizado y resiliente del futuro, en todas sus formas.
lang: es
image: /images/roadmap/roadmap-future.png
alt: "Hoja de ruta de Ethereum"
template: roadmap
---

Algunas partes de la hoja de ruta no son obligatorias para escalar o asegurar a Ethereum a corto plazo, pero preparan la estabilidad y fiabilidad de Ethereum en el futuro.

## Resistencia cuántica {#quantum-resistance}

Parte de la [criptografía](/glossary/#cryptography) que protege Ethereum en la actualidad se verá comprometida cuando la computación cuántica se convierta en una realidad. Aunque es probable que la computación cuántica esté a décadas de distancia de ser una amenaza genuina para la criptografía moderna, Ethereum se está construyendo para ser segura por los siglos de los siglos. Esto significa hacer a [Ethereum cuántico resistente](https://consensys.net/blog/developers/how-will-quantum-supremacy-affect-blockchain/) tan pronto como sea posible.

El desafío al que se enfrentan los desarrolladores de Ethereum es que el actual protocolo de [prueba de participación](/glossary/#pos) se base en un esquema de firmas muy eficiente conocido como BLS para agregar votos en [bloques](/glossary/#block) válidos. Las computadoras cuánticas son capaces de descodificar esta estrategia de firmas, no obstante, las alternativas cuántico-resistentes no son tan eficientes.

Las [estrategias comprometidas «KZG»](/roadmap/danksharding/#what-is-kzg) que Ethereum utiliza en múltiples ocasiones para generar secretos criptográficos tienen vulnerabilidad cuántica. En la actualidad, esto se evita utilizando «configuraciones fiables» (cuya ceremonia de configuración principal finalizó con éxito en 2023), en las que varios usuarios generaron aleatoriedad que no puede ser revertida por una computadora cuántica. Sin embargo, la solución ideal a largo plazo sería incorporar en su lugar la criptografía cuántica segura. Hay dos enfoques principales que podrían convertirse en sustituciones eficientes de las estrategias BLS: [el basado en STARK](https://hackmd.io/@vbuterin/stark_aggregation) y [el basado en redes](https://medium.com/asecuritysite-when-bob-met-alice/so-what-is-lattice-encryption-326ac66e3175) de firmas. <strong x-id=«1»>Esto continúa en fase de investigación activa y elaboración de prototipos</strong>.

[Más información sobre KZG y configuraciones fiables](/roadmap/danksharding#what-is-kzg)

## Ethereum más simple y eficiente {#simpler-more-efficient-ethereum}

La complejidad puede generar errores o vulnerabilidades que pueden aprovechar los atacantes. Por lo tanto, una parte del plan de trabajo consiste en simplificar Ethereum y suprimir o modificar el código que se ha mantenido en varias actualizaciones, pero que ya no es necesario o que ahora puede ser mejorado. Una base de código más reducida y sencilla es mucho más fácil de mantener y analizar para los desarrolladores.

Para que la [Máquina Virtual de Ethereum (EVM)](/developers/docs/evm) sea más sencilla y eficiente, se investigan e implementan mejoras continuamente. Esto implica tanto abordar los componentes heredados como introducir optimizaciones.

**Cambios recientes implementados:**

- **Revisión del cálculo de gas:** la forma en que se calcula el [gas](/glossary/#gas) se mejoró significativamente con la **EIP-1559 (implementada en la actualización de Londres, en 2021)**, introduciendo una tarifa base y un mecanismo de quema que permiten una fijación de precios de transacciones más predecible.
- **`Restricción de SELFDESTRUCT`:** el código operativo (opcode) `SELFDESTRUCT`, a pesar de que era raramente utilizado, representaba riesgos potenciales. Su funcionalidad **se restringió seriamente con la actualización Dencun (marzo de 2024) mediante la EIP-6780** para mitigar riesgos, especialmente relacionados con la gestión del estado.
- **Tipos modernizados de transacciones:** se han introducido nuevos formatos de transacción (por ejemplo, mediante la **EIP-2718** y la **EIP-4844** para blobs en la actualización Dencun) para soportar nuevas funcionalidades y mejorar la eficiencia con respecto a los tipos heredados.

**Objetivos actuales y futuros:**

- **Manejo adicional de `SELFDESTRUCT`:** aunque está restringido, se considera la **posible eliminación completa** del código operativo (opcode) `SELFDESTRUCT` en futuras actualizaciones para simplificar aún más el estado de la EVM. ([Más contexto sobre los problemas de SELFDESTRUCT](https://hackmd.io/@vbuterin/selfdestruct)).
- **Eliminación progresiva de transacciones heredadas:** aunque los [clientes de Ethereum](/glossary/#consensus-client) aún admiten los tipos de transacción más antiguos para mantener compatibilidad retroactiva, el objetivo es fomentar la migración a tipos más nuevos y **posiblemente reducir o eliminar del todo el soporte para los formatos más antiguos** en el futuro.
- **Investigación continua sobre eficiencia del gas:** continúa la exploración de **nuevas mejoras en el cálculo del gas**, que potencialmente incluyen conceptos como el gas multidimensional para reflejar mejor el uso de recursos.
- **Operaciones criptográficas optimizadas:** se están realizando esfuerzos para **introducir métodos más eficientes para la aritmética** que sustenta las operaciones criptográficas usadas en la EVM.

Asimismo, hay actualizaciones que pueden realizarse en otros componentes de los actuales clientes de Ethereum. Un ejemplo es que los actuales clientes de ejecución y consenso utilizan un tipo diferente de compresión de datos. Compartir datos entre clientes será mucho más fácil e intuitivo cuando el esquema de compresión se unifique en toda la red. Esta sigue siendo un área de exploración.

## Progreso actual {#current-progress}

Muchas de las mejoras a largo plazo, en particular **la resistencia cuántica total de los protocolos centrales, están aún en fase de investigación y su implementación puede tardar varios años**.

Sin embargo, **ya se han realizado avances significativos en los esfuerzos de simplificación.** Por ejemplo, cambios clave como la **restricción de `SELFDESTRUCT` (EIP-6780)** y la introducción de **transacciones con blobs (EIP-4844)** se implementaron en la **actualización Dencun (marzo de 2024)**. También continúa el trabajo de armonización de los esquemas de compresión de clientes y otras mejoras de eficiencia.

**Más información**

- [Gas](/developers/docs/gas)
- [EVM](/developers/docs/evm)
- [Estructura de datos](/developers/docs/data-structures-and-encoding)