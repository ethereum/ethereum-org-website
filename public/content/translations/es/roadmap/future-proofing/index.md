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

Parte de la [criptografía](/glossary/#cryptography) que asegura el Ethereum actual se verá comprometida cuando la computación cuántica se haga realidad. Aunque es probable que la computación cuántica esté a décadas de distancia de ser una amenaza genuina para la criptografía moderna, Ethereum se está construyendo para ser segura por los siglos de los siglos. Esto significa hacer que [Ethereum sea resistente a la computación cuántica](https://consensys.net/blog/developers/how-will-quantum-supremacy-affect-blockchain/) lo antes posible.

El desafío al que se enfrentan los desarrolladores de Ethereum es que el protocolo actual de [prueba de participación](/glossary/#pos) se basa en un esquema de firmas muy eficiente conocido como BLS para agregar votos en [bloques](/glossary/#block) válidos. Las computadoras cuánticas son capaces de descodificar esta estrategia de firmas, no obstante, las alternativas cuántico-resistentes no son tan eficientes.

Se sabe que los esquemas de compromiso [«KZG»](/roadmap/danksharding/#what-is-kzg) utilizados en varios lugares de Ethereum para generar secretos criptográficos son vulnerables a la computación cuántica. En la actualidad, esto se evita utilizando «configuraciones fiables» (cuya ceremonia de configuración principal finalizó con éxito en 2023), en las que varios usuarios generaron aleatoriedad que no puede ser revertida por una computadora cuántica. Sin embargo, la solución ideal a largo plazo sería incorporar en su lugar la criptografía cuántica segura. Hay dos enfoques principales que podrían convertirse en sustitutos eficientes para el esquema BLS: las firmas [basadas en STARK](https://hackmd.io/@vbuterin/stark_aggregation) y las [basadas en retículos (lattice)](https://medium.com/asecuritysite-when-bob-met-alice/so-what-is-lattice-encryption-326ac66e3175). **Estos todavía se están investigando y prototipando activamente**.

[Leer sobre KZG y las configuraciones de confianza](/roadmap/danksharding#what-is-kzg)

## Un Ethereum más simple y eficiente {#simpler-more-efficient-ethereum}

La complejidad puede generar errores o vulnerabilidades que pueden aprovechar los atacantes. Por lo tanto, una parte del plan de trabajo consiste en simplificar Ethereum y suprimir o modificar el código que se ha mantenido en varias actualizaciones, pero que ya no es necesario o que ahora puede ser mejorado. Una base de código más reducida y sencilla es mucho más fácil de mantener y analizar para los desarrolladores.

Para que la [Máquina Virtual de Ethereum (EVM)](/developers/docs/evm) sea más simple y eficiente, se investigan e implementan mejoras continuamente. Esto implica tanto abordar los componentes heredados como introducir optimizaciones.

**Cambios recientes implementados:**

- **Revisión del cálculo del gas:** la forma en que se calcula el [gas](/glossary/#gas) mejoró significativamente con la **EIP-1559 (implementada en la actualización London, 2021)**, introduciendo una tarifa base y un mecanismo de quema para una tarificación de transacciones más predecible.
- **Restricción de `SELFDESTRUCT`:** el código de operación `SELFDESTRUCT`, aunque se usaba en raras ocasiones, planteaba riesgos potenciales. Su funcionalidad se restringió considerablemente en la **actualización Dencun (marzo de 2024) mediante la EIP-6780** para mitigar los peligros, especialmente en lo que respecta a la gestión del estado.
- **Tipos de transacción modernizados:** se han introducido nuevos formatos de transacción (p. ej., a través de **EIP-2718** y **EIP-4844** para blobs en la actualización Dencun) para dar soporte a nuevas características y mejorar la eficiencia sobre los tipos heredados.

**Objetivos actuales y futuros:**

- **Manejo adicional de `SELFDESTRUCT`:** aunque restringido, la **posible eliminación completa** del código de operación `SELFDESTRUCT` todavía se está considerando para futuras actualizaciones para simplificar aún más el estado de la EVM. ([Más contexto sobre los problemas de SELFDESTRUCT](https://hackmd.io/@vbuterin/selfdestruct)).
- **Eliminación progresiva de transacciones heredadas:** aunque los [clientes de Ethereum](/glossary/#consensus-client) siguen admitiendo tipos de transacción más antiguos por retrocompatibilidad, el objetivo es fomentar la migración a tipos más nuevos y **potencialmente dejar obsoletos o eliminar por completo el soporte para los formatos más antiguos** en el futuro.
- **Investigación continua sobre la eficiencia del gas:** se sigue investigando sobre **nuevos refinamientos para el cálculo del gas**, incluyendo potencialmente conceptos como el gas multidimensional para reflejar mejor el uso de los recursos.
- **Operaciones criptográficas optimizadas:** se está trabajando para **introducir métodos más eficientes para la aritmética** que subyace a las operaciones criptográficas utilizadas dentro de la EVM.

Asimismo, hay actualizaciones que pueden realizarse en otros componentes de los actuales clientes de Ethereum. Un ejemplo es que los actuales clientes de ejecución y consenso utilizan un tipo diferente de compresión de datos. Compartir datos entre clientes será mucho más fácil e intuitivo cuando el esquema de compresión se unifique en toda la red. Esta sigue siendo un área de exploración.

## Progreso actual {#current-progress}

Muchas de las actualizaciones de preparación para el futuro a largo plazo, en particular la **resistencia cuántica total para los protocolos principales, todavía están en fase de investigación y pueden pasar varios años** hasta que se implementen.

Sin embargo, **ya se ha avanzado significativamente en los esfuerzos de simplificación.** Por ejemplo, cambios clave como la **restricción de `SELFDESTRUCT` (EIP-6780)** y la introducción de **transacciones con blobs (EIP-4844)** se implementaron en la **actualización Dencun (marzo de 2024)**. También continúa el trabajo de armonización de los esquemas de compresión de clientes y otras mejoras de eficiencia.

**Leer más**

- [Gas](/developers/docs/gas)
- [EVM](/developers/docs/evm)
- [Estructuras de datos](/developers/docs/data-structures-and-encoding)