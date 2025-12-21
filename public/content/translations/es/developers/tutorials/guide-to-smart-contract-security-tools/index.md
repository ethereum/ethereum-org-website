---
title: Una guía de herramientas de seguridad para contratos inteligentes
description: Una descripción general de tres técnicas diferentes de prueba y análisis de programas
author: "Trailofbits"
lang: es
tags: [ "Solidity", "contratos Inteligentes", "seguridades" ]
skill: intermediate
published: 07-09-2020
source: Desarrollar contratos seguros
sourceUrl: https://github.com/crytic/building-secure-contracts/tree/master/program-analysis
---

Vamos a utilizar tres técnicas distintas de prueba y análisis de programas:

- **Análisis estático con [Slither](/developers/tutorials/how-to-use-slither-to-find-smart-contract-bugs/).** Todas las rutas del programa se aproximan y analizan al mismo tiempo, a través de diferentes presentaciones del programa (p. ej., grafo de flujo de control).
- **Fuzzing con [Echidna](/developers/tutorials/how-to-use-echidna-to-test-smart-contracts/).** El código se ejecuta con una generación pseudoaleatoria de transacciones. El fuzzer intentará encontrar una secuencia de transacciones que infrinja una propiedad determinada.
- **Ejecución simbólica con [Manticore](/developers/tutorials/how-to-use-manticore-to-find-smart-contract-bugs/).** Una técnica de verificación formal que traduce cada ruta de ejecución a una fórmula matemática sobre la que se pueden comprobar las restricciones.

Cada técnica tiene ventajas e inconvenientes, y será útil en [casos específicos](#determining-security-properties):

| Técnica             | Herramienta | Uso                               | Velocidad | Errores no detectados | Falsas alarmas |
| ------------------- | ----------- | --------------------------------- | --------- | --------------------- | -------------- |
| Análisis estático   | Slither     | CLI y scripts                     | segundos  | moderado              | bajo           |
| Fuzzing             | Echidna     | Propiedades de Solidity           | minutos   | bajo                  | ninguno        |
| Ejecución simbólica | Manticore   | Propiedades de Solidity y scripts | horas     | ninguno\*             | ninguno        |

\* si se exploran todas las rutas sin que se agote el tiempo de espera

**Slither** analiza los contratos en segundos; sin embargo, el análisis estático puede provocar falsas alarmas y será menos adecuado para verificaciones complejas (p. ej., verificaciones aritméticas). Ejecute Slither a través de la API para un acceso sencillo a los detectores integrados o a través de la API para verificaciones definidas por el usuario.

**Echidna** necesita ejecutarse durante varios minutos y solo producirá verdaderos positivos. Echidna verifica las propiedades de seguridad proporcionadas por el usuario, escritas en Solidity. Podría no detectar errores, ya que se basa en una exploración aleatoria.

**Manticore** realiza el análisis de "mayor peso". Al igual que Echidna, Manticore verifica las propiedades proporcionadas por el usuario. Necesitará más tiempo para ejecutarse, pero puede demostrar la validez de una propiedad y no informará de falsas alarmas.

## Flujo de trabajo sugerido {#suggested-workflow}

Comience con los detectores integrados de Slither para asegurarse de que no haya errores simples ahora ni se introduzcan más adelante. Utilice Slither para verificar propiedades relacionadas con la herencia, las dependencias de variables y los problemas estructurales. A medida que el código base crece, utilice Echidna para probar propiedades más complejas de la máquina de estados. Vuelva a utilizar Slither para desarrollar verificaciones personalizadas para protecciones que no están disponibles en Solidity, como la protección contra la sobreescritura de una función. Por último, utilice Manticore para realizar una verificación dirigida de las propiedades de seguridad críticas, p. ej., las operaciones aritméticas.

- Use la CLI de Slither para detectar problemas comunes
- Use Echidna para probar las propiedades de seguridad de alto nivel de su contrato
- Use Slither para escribir verificaciones estáticas personalizadas
- Use Manticore cuando quiera una garantía profunda de las propiedades de seguridad críticas

**Una nota sobre las pruebas unitarias**. Las pruebas unitarias son necesarias para crear software de alta calidad. Sin embargo, estas técnicas no son las más adecuadas para encontrar fallos de seguridad. Normalmente se utilizan para probar los comportamientos positivos del código (es decir, que el código funciona como se espera en el contexto normal), mientras que los fallos de seguridad tienden a residir en casos límite que los desarrolladores no tuvieron en cuenta. En nuestro estudio de docenas de revisiones de seguridad de contratos inteligentes, [la cobertura de las pruebas unitarias no tuvo ningún efecto en el número o la gravedad de los fallos de seguridad](https://blog.trailofbits.com/2019/08/08/246-findings-from-our-smart-contract-audits-an-executive-summary/) que encontramos en el código de nuestros clientes.

## Determinación de las propiedades de seguridad {#determining-security-properties}

Para probar y verificar eficazmente su código, debe identificar las áreas que necesitan atención. Dado que los recursos que se dedican a la seguridad son limitados, es importante delimitar las partes débiles o de gran valor de su código base para optimizar su esfuerzo. El modelado de amenazas puede ayudar. Considere revisar:

- [Rapid Risk Assessments](https://infosec.mozilla.org/guidelines/risk/rapid_risk_assessment.html) (nuestro enfoque preferido cuando hay poco tiempo)
- [Guide to Data-Centric System Threat Modeling](https://csrc.nist.gov/pubs/sp/800/154/ipd) (también conocido como NIST 800-154)
- [Shostack threat modeling](https://www.amazon.com/Threat-Modeling-Designing-Adam-Shostack/dp/1118809998)
- [STRIDE](https://wikipedia.org/wiki/STRIDE_\(security\)) / [DREAD](https://wikipedia.org/wiki/DREAD_\(risk_assessment_model\))
- [PASTA](https://wikipedia.org/wiki/Threat_model#P.A.S.T.A.)
- [Use of Assertions](https://blog.regehr.org/archives/1091)

### Componentes {#components}

Saber lo que quiere comprobar también le ayudará a seleccionar la herramienta correcta.

Las áreas generales que suelen ser relevantes para los contratos inteligentes incluyen:

- **Máquina de estados.** La mayoría de los contratos pueden representarse como una máquina de estados. Considere verificar que (1) no se pueda alcanzar ningún estado no válido, (2) si un estado es válido, que se pueda alcanzar, y (3) ningún estado bloquee el contrato.

  - Echidna y Manticore son las herramientas recomendadas para probar las especificaciones de la máquina de estados.

- **Controles de acceso.** Si su sistema tiene usuarios con privilegios (p. ej., un propietario, controladores, ...) debe asegurarse de que (1) cada usuario solo pueda realizar las acciones autorizadas y (2) ningún usuario pueda bloquear acciones de un usuario con más privilegios.

  - Slither, Echidna y Manticore pueden verificar la corrección de los controles de acceso. Por ejemplo, Slither puede comprobar que solo las funciones de la lista blanca carecen del modificador onlyOwner. Echidna y Manticore son útiles para un control de acceso más complejo, como un permiso que se concede solo si el contrato alcanza un estado determinado.

- **Operaciones aritméticas.** Comprobar la solidez de las operaciones aritméticas es fundamental. Usar SafeMath en todas partes es un buen paso para evitar el desbordamiento/subdesbordamiento; sin embargo, aún debe considerar otros fallos aritméticos, incluidos los problemas de redondeo y los fallos que bloquean el contrato.

  - Manticore es la mejor opción aquí. Se puede usar Echidna si la aritmética está fuera del alcance del solucionador SMT.

- **Corrección de la herencia.** Los contratos de Solidity dependen en gran medida de la herencia múltiple. Se pueden cometer fácilmente errores, como una función de shadowing que carezca de una llamada a super y un orden de linealización c3 mal interpretado.

  - Slither es la herramienta para garantizar la detección de estos problemas.

- **Interacciones externas.** Los contratos interactúan entre sí, y no se debe confiar en algunos contratos externos. Por ejemplo, si su contrato depende de oráculos externos, ¿seguirá siendo seguro si la mitad de los oráculos disponibles están comprometidos?

  - Manticore y Echidna son la mejor opción para probar las interacciones externas con sus contratos. Manticore tiene un mecanismo integrado para crear stubs de contratos externos.

- **Conformidad con el estándar.** Los estándares de Ethereum (p. ej., ERC20) tienen un historial de fallos en su diseño. Sea consciente de las limitaciones del estándar sobre el que está construyendo.
  - Slither, Echidna y Manticore le ayudarán a detectar desviaciones de un estándar determinado.

### Chuleta para la selección de herramientas {#tool-selection-cheatsheet}

| Componente                  | Herramientas                | Ejemplos                                                                                                                                                                                                                                                                              |
| --------------------------- | --------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Máquina de estados          | Echidna, Manticore          |                                                                                                                                                                                                                                                                                       |
| Control de acceso           | Slither, Echidna, Manticore | [Ejercicio 2 de Slither](https://github.com/crytic/slither/blob/7f54c8b948c34fb35e1d61adaa1bd568ca733253/docs/src/tutorials/exercise2.md), [Ejercicio 2 de Echidna](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/echidna/exercises/Exercise-2.md) |
| Operaciones aritméticas     | Manticore, Echidna          | [Ejercicio 1 de Echidna](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/echidna/exercises/Exercise-1.md), [Ejercicios 1 - 3 de Manticore](https://github.com/crytic/building-secure-contracts/tree/master/program-analysis/manticore/exercises)     |
| Corrección de la herencia   | Slither                     | [Ejercicio 1 de Slither](https://github.com/crytic/slither/blob/7f54c8b948c34fb35e1d61adaa1bd568ca733253/docs/src/tutorials/exercise1.md)                                                                                                                                             |
| Interacciones externas      | Manticore, Echidna          |                                                                                                                                                                                                                                                                                       |
| Conformidad con el estándar | Slither, Echidna, Manticore | [`slither-erc`](https://github.com/crytic/slither/wiki/ERC-Conformance)                                                                                                                                                                                                               |

Será necesario verificar otras áreas en función de sus objetivos, pero estas áreas de enfoque generales son un buen punto de partida para cualquier sistema de contratos inteligentes.

Nuestras auditorías públicas contienen ejemplos de propiedades verificadas o probadas. Considere la posibilidad de leer las secciones de Pruebas y verificación automatizadas de los siguientes informes para revisar las propiedades de seguridad del mundo real:

- [0x](https://github.com/trailofbits/publications/blob/master/reviews/0x-protocol.pdf)
- [Balancer](https://github.com/trailofbits/publications/blob/master/reviews/BalancerCore.pdf)
