---
title: Una guía de herramientas de seguridad para contratos inteligentes
description: Una descripción general de tres técnicas diferentes de prueba y análisis de programas
author: "Trailofbits"
lang: es
tags:
  - "solidity"
  - "contratos inteligentes"
  - "seguridad"
skill: intermediate
published: 2020-09-07
source: Desarrollar contratos seguros
sourceUrl: https://github.com/crytic/building-secure-contracts/tree/master/program-analysis
---

Vamos a usar tres técnicas distintas para el análisis de pruebas y programas:

- **Análisis estático con [Slither](/developers/tutorials/how-to-use-slither-to-find-smart-contract-bugs/).** Todas las rutas del programa se abordan y analizan al mismo tiempo, a través de diferentes presentaciones del programa (por ejemplo, control-flow-graph).
- **Fuzzing (auditorías de seguridad) con [Echidna](/developers/tutorials/how-to-use-echidna-to-test-smart-contracts/).** El código se ejecuta con una generación pseudoaleatoria de transacciones. El fuzzer tratará de encontrar una secuencia de transacciones para infringir una propiedad determinada.
- **Ejecución simbólica con [Manticore](/developers/tutorials/how-to-use-manticore-to-find-smart-contract-bugs/).** Una técnica de verificación formal, que traduce cada ruta de ejecución a una fórmula matemática, en la que se pueden comprobar las restricciones superiores.

Cada técnica tiene ventajas y obstáculos que serán útiles en [casos específicos](#determining-security-properties):

| Técnica             | Herramienta | Uso                               | Velocidad | Errores perdidos | Falsas alarmas |
| ------------------- | ----------- | --------------------------------- | --------- | ---------------- | -------------- |
| Análisis estáticos  | Slither     | CLI & scripts                     | segundos  | moderado         | bajo           |
| Fuzzing             | Echidna     | Propiedades de Solidity           | minutos   | bajo             | ninguno        |
| Ejecución simbólica | Manticore   | Propiedades de Solidity & scripts | horas     | ninguno      | ninguno        |

- si todas las rutas son exploradas sin tiempo de espera

**Slither** analiza los contratos en segundos, sin embargo, el análisis estático puede conducir a falsas alarmas y será menos adecuado para comprobaciones complejas (ej., controles aritméticos). Ejecute Slither a través de la API para acceder a los detectores incorporados o a través de la API para comprobaciones definidas por el usuario.

**Echidna** necesita funcionar durante varios minutos y solo producirá verdaderos positivos. Echidna comprueba las propiedades de seguridad proporcionadas por el usuario, escritas en Solidity. Podría perderse errores, ya que se basa en una exploración aleatoria.

**Manticore** realiza el análisis de «peso más pesado». Al igual que Echidna, Manticore verifica las propiedades proporcionadas por el usuario. Necesitará más tiempo para funcionar, pero puede demostrar la validez de una propiedad y no comunicará falsas alarmas.

## Flujo de trabajo sugerido {#suggested-workflow}

Comience con los detectores incorporados de Slither para asegurarse de que no haya errores simples ahora o que se introduzcan más tarde. Utilice Slither para comprobar propiedades relacionadas con la herencia, dependencias variables y problemas estructurales. A medida que vaya creciendo el código, utilice Echidna para probar propiedades más complejas de la máquina de estado. Revise de nuevo Slither para desarrollar comprobaciones personalizadas para protecciones no disponibles de Solidity, como la protección contra una función que se anula. Por último, utilice Manticore para realizar una verificación específica de las propiedades de seguridad crítica, por ejemplo, operaciones aritméticas.

- Utilice el CLI de Slither para detectar problemas comunes.
- Utilice Echidna para probar propiedades de seguridad de alto nivel de su contrato.
- Utilice Slither para escribir comprobaciones estáticas personalizadas.
- Utilice Manticore una vez que desee una garantía profunda de las propiedades de seguridad críticas.

**Una aclaración sobre las pruebas unitarias**. Las pruebas unitarias son necesarias para construir software de alta calidad. Sin embargo, estas técnicas no son las más adecuadas para encontrar defectos de seguridad. Se suelen utilizar para probar comportamientos positivos del código (ej., que el código funciona como se esperaba en el contexto normal), mientras que los defectos de seguridad tienden a residir en casos extremos que los desarrolladores no consideraron. En nuestro estudio de docenas de revisiones de seguridad de contratos inteligentes, [la cobertura de prueba unitaria no tuvo efecto en el número o gravedad de defectos de seguridad](https://blog.trailofbits.com/2019/08/08/246-findings-from-our-smart-contract-audits-an-executive-summary/) que encontramos en el código de nuestro cliente.

## Determinar propiedades de seguridad {#determining-security-properties}

Para probar y verificar eficazmente su código, debe identificar las áreas que necesitan atención. Como sus recursos destinados a seguridad son limitados, es importante hacer frente a las partes débiles o de alto valor de su código base para optimizar su esfuerzo. El modelado de amenazas puede ser útil. Considere revisar:

- [Evaluaciones de riesgo rápidas](https://infosec.mozilla.org/guidelines/risk/rapid_risk_assessment.html) (nuestro enfoque preferido cuando hay poco tiempo)
- [Guía de modelos de amenazas del sistema central de datos](https://csrc.nist.gov/publications/detail/sp/800-154/draft) (también conocido como NIST 800-154)
- [Modelos de amenazas de Shostack](https://www.amazon.com/Threat-Modeling-Designing-Adam-Shostack/dp/1118809998)
- [STRIDE](https://wikipedia.org/wiki/STRIDE_(security)) / [DREAD](https://wikipedia.org/wiki/DREAD_(risk_assessment_model))
- [PASTA](https://wikipedia.org/wiki/Threat_model#P.A.S.T.A.)
- [Uso de afirmaciones](https://blog.regehr.org/archives/1091)

### Componentes {#components}

Saber lo que quiere comprobar también le ayudará a seleccionar la herramienta correcta.

Las áreas extensas que suelen ser relevantes para los contratos inteligentes incluyen:

- **Máquina de estado.** La mayoría de los contratos pueden representarse como una máquina de estado. Considere comprobar que (1) No se puede alcanzar un estado no válido, (2) si puede alcanzarse un estado válido, y (3) ningún estado retiene el contrato.

  - Echidna y Manticore son las herramientas para favorecer la prueba de especificaciones de las máquinas del estado.

- **Controles de acceso.** Si tu sistema tiene usuarios privilegiados (por ejemplo, un propietario, controladores...) debes asegurarte de que (1) cada usuario solo pueda realizar las acciones autorizadas y (2) ningún usuario pueda bloquear acciones de un usuario más privilegiado.

  - Slither, Echidna y Manticore pueden comprobar si hay controles de acceso correctos. Por ejemplo, Slither puede comprobar que sólo las funciones de la lista blanca carecen del modificador onlyOwner. Echidna y Manticore son útiles para un control de acceso más complejo, como un permiso dado sólo si el contrato alcanza un estado determinado.

- **Operaciones aritméticas.** Comprobar la integridad de las operaciones aritméticas es crucial. Sin embargo, usar `SafeMath` en todas partes es un buen paso para prevenir el flujo excesivo/deficiente. Debe tener en cuenta otros defectos aritméticos, incluidas las cuestiones del redondeo y de los fallos que retienen el contrato.

  - Manticore es la mejor opción en este caso. Echidna se puede usar si la aritmética está fuera del alcance del solucionador SMT.

- **Corrección de herencia.** Los contratos de Solidity dependen en gran medida de la herencia múltiple. Errores como una función en paralelo sin llamada `super` y una orden de linearización de c3 mal interpretadas pueden cometerse fácilmente.

  - Slither es la herramienta perfecta para garantizar la detección de estos problemas.

- **Interacciones externas.** Los contratos interactúan entre sí, y algunos contratos externos no deben ser de confianza. Por ejemplo, si su contrato se basa en oráculos externos, ¿seguirá siendo seguro si la mitad de los oráculos disponibles están en peligro?

  - Manticore y Echidna son la mejor opción para probar las interacciones externas con sus contratos. Manticore tiene un mecanismo integrado para cerrar contratos externos.

- **Conformidad estándar.** Los estándares Ethereum (por ejemplo, ERC20) tienen un historial de defectos en su diseño. Tenga en cuenta las limitaciones del estándar sobre el que está construyendo.
  - Slither, Echidna y Manticore le ayudarán a detectar desviaciones de un estándar determinado.

### Hoja de trucos para selección de herramientas {#tool-selection-cheatsheet}

| Componente              | Herramientas                | Ejemplos                                                                                                                                                                                                                                                              |
| ----------------------- | --------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Máquina de estado       | Echidna, Manticore          |                                                                                                                                                                                                                                                                       |
| Control de acceso       | Slither, Echidna, Manticore | [Ejercicio 2 de Slither](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/slither/exercise2.md), [Ejercicio 2 de Echidna](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/echidna/exercises/Exercise-2.md)     |
| Operaciones aritméticas | Manticore, Echidna          | [Ejercicio 1 de Echidna](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/echidna/exercises/Exercise-1.md), [Ejercicios 1-3 de Manticore](https://github.com/crytic/building-secure-contracts/tree/master/program-analysis/manticore/exercises) |
| Corrección de herencia  | Slither                     | [Slither ejercicio 1](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/slither/exercise1.md)                                                                                                                                          |
| Interacciones externas  | Manticore, Echidna          |                                                                                                                                                                                                                                                                       |
| Cumplimiento estándar   | Slither, Echidna, Manticore | [`slither-erc`](https://github.com/crytic/slither/wiki/ERC-Conformance)                                                                                                                                                                                               |

Se tendrán que revisar otras áreas dependiendo de sus objetivos, aunque estas áreas de enfoque generales son un buen comienzo para cualquier sistema de contratos inteligentes.

Nuestras auditorías públicas contienen ejemplos de propiedades verificadas o probadas. Piense en leer las secciones de `Pruebas automáticas y verificación` de los siguientes informes para revisar las propiedades de seguridad del mundo real:

- [0x](https://github.com/trailofbits/publications/blob/master/reviews/0x-protocol.pdf)
- [Balancer](https://github.com/trailofbits/publications/blob/master/reviews/BalancerCore.pdf)
