---
title: Una guía sobre herramientas de seguridad para contratos inteligentes
description: Una descripción general de tres técnicas diferentes de pruebas y análisis de programas
author: "Trailofbits"
lang: es
tags: ["solidity", "contratos inteligentes", "seguridad"]
skill: intermediate
breadcrumb: Herramientas de seguridad
published: 2020-09-07
source: Building secure contracts
sourceUrl: https://github.com/crytic/building-secure-contracts/tree/master/program-analysis
---

Vamos a utilizar tres técnicas distintivas de pruebas y análisis de programas:

- **Análisis estático con [Slither](/developers/tutorials/how-to-use-slither-to-find-smart-contract-bugs/).** Todas las rutas del programa se aproximan y analizan al mismo tiempo, a través de diferentes presentaciones del programa (por ejemplo, gráfico de flujo de control).
- **Fuzzing con [Echidna](/developers/tutorials/how-to-use-echidna-to-test-smart-contracts/).** El código se ejecuta con una generación pseudoaleatoria de transacciones. El fuzzer intentará encontrar una secuencia de transacciones que viole una propiedad determinada.
- **Ejecución simbólica con [Manticore](/developers/tutorials/how-to-use-manticore-to-find-smart-contract-bugs/).** Una técnica de verificación formal que traduce cada ruta de ejecución a una fórmula matemática, sobre la cual se pueden comprobar restricciones.

Cada técnica tiene ventajas y desventajas, y será útil en [casos específicos](#determining-security-properties):

| Técnica | Herramienta | Uso | Velocidad | Errores omitidos | Falsas alarmas |
| ------------------ | --------- | ----------------------------- | ------- | ----------- | ------------ |
| Análisis estático | Slither | CLI y scripts | segundos | moderado | bajo |
| Fuzzing | Echidna | Propiedades de Solidity | minutos | bajo | ninguno |
| Ejecución simbólica | Manticore | Propiedades de Solidity y scripts | horas | ninguno\* | ninguno |

\* si todas las rutas se exploran sin que se agote el tiempo de espera

**Slither** analiza contratos en cuestión de segundos; sin embargo, el análisis estático podría generar falsas alarmas y será menos adecuado para comprobaciones complejas (por ejemplo, comprobaciones aritméticas). Ejecute Slither a través de la API para acceder con un solo clic a los detectores integrados o a través de la API para comprobaciones definidas por el usuario.

**Echidna** necesita ejecutarse durante varios minutos y solo producirá verdaderos positivos. Echidna comprueba las propiedades de seguridad proporcionadas por el usuario, escritas en Solidity. Podría pasar por alto errores, ya que se basa en la exploración aleatoria.

**Manticore** realiza el análisis "más pesado". Al igual que Echidna, Manticore verifica las propiedades proporcionadas por el usuario. Necesitará más tiempo para ejecutarse, pero puede demostrar la validez de una propiedad y no informará de falsas alarmas.

## Flujo de trabajo sugerido {#suggested-workflow}

Comience con los detectores integrados de Slither para asegurarse de que no haya errores simples presentes ahora o que se introduzcan más adelante. Utilice Slither para comprobar propiedades relacionadas con la herencia, las dependencias de variables y los problemas estructurales. A medida que crece el código base, utilice Echidna para probar propiedades más complejas de la máquina de estado. Vuelva a Slither para desarrollar comprobaciones personalizadas para protecciones no disponibles en Solidity, como la protección contra la anulación de una función. Por último, utilice Manticore para realizar una verificación específica de las propiedades de seguridad críticas, por ejemplo, las operaciones aritméticas.

- Utilice la CLI de Slither para detectar problemas comunes
- Utilice Echidna para probar las propiedades de seguridad de alto nivel de su contrato
- Utilice Slither para escribir comprobaciones estáticas personalizadas
- Utilice Manticore una vez que desee una garantía exhaustiva de las propiedades de seguridad críticas

**Una nota sobre las pruebas unitarias**. Las pruebas unitarias son necesarias para crear software de alta calidad. Sin embargo, estas técnicas no son las más adecuadas para encontrar fallos de seguridad. Por lo general, se utilizan para probar comportamientos positivos del código (es decir, el código funciona como se espera en el contexto normal), mientras que los fallos de seguridad tienden a residir en casos extremos que los desarrolladores no consideraron. En nuestro estudio de docenas de revisiones de seguridad de contratos inteligentes, [la cobertura de las pruebas unitarias no tuvo ningún efecto sobre el número o la gravedad de los fallos de seguridad](https://blog.trailofbits.com/2019/08/08/246-findings-from-our-smart-contract-audits-an-executive-summary/) que encontramos en el código de nuestros clientes.

## Determinación de las propiedades de seguridad {#determining-security-properties}

Para probar y verificar eficazmente su código, debe identificar las áreas que necesitan atención. Dado que los recursos que invierte en seguridad son limitados, es importante delimitar las partes débiles o de alto valor de su código base para optimizar su esfuerzo. El modelado de amenazas puede ayudar. Considere revisar:

- [Evaluaciones rápidas de riesgos](https://infosec.mozilla.org/guidelines/risk/rapid_risk_assessment.html) (nuestro enfoque preferido cuando hay poco tiempo)
- [Guía para el modelado de amenazas de sistemas centrados en datos](https://csrc.nist.gov/pubs/sp/800/154/ipd) (también conocido como NIST 800-154)
- [Modelado de amenazas de Shostack](https://www.amazon.com/Threat-Modeling-Designing-Adam-Shostack/dp/1118809998)
- [STRIDE](<https://wikipedia.org/wiki/STRIDE_(security)>) / [DREAD](<https://wikipedia.org/wiki/DREAD_(risk_assessment_model)>)
- [PASTA](https://wikipedia.org/wiki/Threat_model#P.A.S.T.A.)
- [Uso de aserciones](https://blog.regehr.org/archives/1091)

### Componentes {#components}

Saber qué desea comprobar también le ayudará a seleccionar la herramienta adecuada.

Las áreas generales que suelen ser relevantes para los contratos inteligentes incluyen:

- **Máquina de estado.** La mayoría de los contratos se pueden representar como una máquina de estado. Considere comprobar que (1) no se pueda alcanzar ningún estado no válido, (2) si un estado es válido, que se pueda alcanzar, y (3) ningún estado atrape al contrato.

  - Echidna y Manticore son las herramientas preferidas para probar las especificaciones de la máquina de estado.

- **Controles de acceso.** Si su sistema tiene usuarios privilegiados (por ejemplo, un propietario, controladores, ...), debe asegurarse de que (1) cada usuario solo pueda realizar las acciones autorizadas y (2) ningún usuario pueda bloquear las acciones de un usuario con más privilegios.

  - Slither, Echidna y Manticore pueden comprobar que los controles de acceso sean correctos. Por ejemplo, Slither puede comprobar que solo las funciones incluidas en la lista blanca carecen del modificador onlyOwner. Echidna y Manticore son útiles para controles de acceso más complejos, como un permiso otorgado solo si el contrato alcanza un estado determinado.

- **Operaciones aritméticas.** Comprobar la solidez de las operaciones aritméticas es fundamental. Usar `SafeMath` en todas partes es un buen paso para evitar el desbordamiento; sin embargo, aún debe considerar otros fallos aritméticos, incluidos los problemas de redondeo y los fallos que atrapan al contrato.

  - Manticore es la mejor opción aquí. Echidna se puede utilizar si la aritmética está fuera del alcance del solucionador SMT.

- **Corrección de la herencia.** Los contratos de Solidity dependen en gran medida de la herencia múltiple. Se pueden introducir fácilmente errores como una función de sombreado (shadowing) a la que le falta una llamada `super` y un orden de linealización c3 mal interpretado.

  - Slither es la herramienta para garantizar la detección de estos problemas.

- **Interacciones externas.** Los contratos interactúan entre sí y no se debe confiar en algunos contratos externos. Por ejemplo, si su contrato depende de oráculos externos, ¿seguirá siendo seguro si la mitad de los oráculos disponibles se ven comprometidos?

  - Manticore y Echidna son la mejor opción para probar las interacciones externas con sus contratos. Manticore tiene un mecanismo integrado para simular (stub) contratos externos.

- **Conformidad con los estándares.** Los estándares de Ethereum (por ejemplo, ERC-20) tienen un historial de fallos en su diseño. Tenga en cuenta las limitaciones del estándar sobre el que está construyendo.
  - Slither, Echidna y Manticore le ayudarán a detectar desviaciones de un estándar determinado.

### Hoja de referencia para la selección de herramientas {#tool-selection-cheatsheet}

| Componente | Herramientas | Ejemplos |
| ----------------------- | --------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Máquina de estado | Echidna, Manticore |
| Control de acceso | Slither, Echidna, Manticore | [Ejercicio 2 de Slither](https://github.com/crytic/slither/blob/7f54c8b948c34fb35e1d61adaa1bd568ca733253/docs/src/tutorials/exercise2.md), [Ejercicio 2 de Echidna](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/echidna/exercises/Exercise-2.md) |
| Operaciones aritméticas | Manticore, Echidna | [Ejercicio 1 de Echidna](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/echidna/exercises/Exercise-1.md), [Ejercicios 1 - 3 de Manticore](https://github.com/crytic/building-secure-contracts/tree/master/program-analysis/manticore/exercises) |
| Corrección de la herencia | Slither | [Ejercicio 1 de Slither](https://github.com/crytic/slither/blob/7f54c8b948c34fb35e1d61adaa1bd568ca733253/docs/src/tutorials/exercise1.md) |
| Interacciones externas | Manticore, Echidna |
| Conformidad con los estándares | Slither, Echidna, Manticore | [`slither-erc`](https://github.com/crytic/slither/wiki/ERC-Conformance) |

Será necesario comprobar otras áreas en función de sus objetivos, pero estas áreas de enfoque generales son un buen comienzo para cualquier sistema de contratos inteligentes.

Nuestras auditorías públicas contienen ejemplos de propiedades verificadas o probadas. Considere leer las secciones `Automated Testing and Verification` de los siguientes informes para revisar las propiedades de seguridad del mundo real:

- [0x](https://github.com/trailofbits/publications/blob/master/reviews/0x-protocol.pdf)
- [Balancer](https://github.com/trailofbits/publications/blob/master/reviews/BalancerCore.pdf)