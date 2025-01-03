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

Las [estrategias comprometidas «KZG»](/roadmap/danksharding/#what-is-kzg) que Ethereum utiliza en múltiples ocasiones para generar secretos criptográficos tienen vulnerabilidad cuántica. Actualmente, esto se evita usando «configuraciones seguras» en las que muchos usuarios generan una aleatoriedad a la que las computadoras cuánticas no pueden aplicar ingeniería inversa. De cualquier forma, la solución idónea sería incorporar simplemente criptografía cuántica segura. Hay dos enfoques principales que podrían convertirse en sustituciones eficientes de las estrategias BLS: [el basado en STARK](https://hackmd.io/@vbuterin/stark_aggregation) y [el basado en redes](https://medium.com/asecuritysite-when-bob-met-alice/so-what-is-lattice-encryption-326ac66e3175) de firmas. **Se los sigue investigando y se siguen elaborando prototipos**.

<ButtonLink variant="outline-color" href="/roadmap/danksharding#what-is-kzg"> Lea acerca de KZG y las configuraciones seguras</ButtonLink>

## Ethereum más simple y eficiente {#simpler-more-efficient-ethereum}

La complejidad crea oportunidades para errores o vulnerabilidades que los intrusos pueden explotar. En consecuencia, parte de la hoja de ruta está simplificando Ethereum y eliminando el código que ha estado pendiente de varias actualizaciones, pero que ya no se necesita o que ahora puede mejorarse. A los desarrolladores les resulta más sencillo y dinámico mantener y razonar una base de código.

Se realizarán múltiples actualizaciones a la [Máquina Virtual de Ethereum (EVM)](/developers/docs/evm) para hacerla más simple y eficiente. Estas incluyen [eliminar el código operativo AUTODESTRUCTOR](https://hackmd.io/@vbuterin/selfdestruct): un comando rara vez usado que no se necesita más y que, en algunas circunstancias, puede llegar a ser peligroso, especialmente si se combina con otras actualizaciones futuras del modelo de almacenamiento de Ethereum. Los [clientes de Ethereum](/glossary/#consensus-client) además aún soportan algunos tipos de transacciones antiguas que ahora se pueden eliminar por completo. La forma en que se calcula el [gas](/glossary/#gas) también se puede mejorar y se pueden implementar métodos más eficientes para la aritmética que sustenta algunas operaciones criptográficas.

Igualmente, hay actualizaciones que pueden hacerse en otras áreas para los clientes actuales de Ethereum. Un ejemplo es que la ejecución actual y los clientes de consenso usan un tipo diferente de comprensión de la información. Será mucho más fácil e intuitivo compartir datos entre clientes si la estrategia de compresión está unificada en toda la red.

## Progreso actual {#current-progress}

Muchas de las actualizaciones requeridas para asegurar Ethereum para el futuro aún **se encuentran en fase de desarrollo y puede llevar varios años** implementarlas. Actualizaciones como eliminar SELFDESTRUCT y armonizar el esquema de compresión usado en los clientes de ejecución y consenso probablemente estén disponibles antes que la criptografía poscuántica.

**Más información**

- [Gas](/developers/docs/gas)
- [EVM](/developers/docs/evm)
- [Estructura de datos](/developers/docs/data-structures-and-encoding)
