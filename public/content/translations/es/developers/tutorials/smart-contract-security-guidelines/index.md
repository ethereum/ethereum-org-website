---
title: Directrices de seguridad de contratos inteligentes
description: Lista de directrices de seguridad para tener en cuenta al crear una Dapp
author: "Trailofbits"
tags:
  - "solidity"
  - "contratos inteligentes"
  - "seguridad"
skill: intermediate
lang: es
published: 2020-09-06
source: Desarrollar contratos seguros
sourceUrl: https://github.com/crytic/building-secure-contracts/blob/master/development-guidelines/guidelines.md
---

Siga estas recomendaciones generales para crear contratos inteligentes más seguros.

## Directrices de diseño {#design-guidelines}

El diseño del contrato debe ser verse con antelación, antes de escribir cualquier línea de código.

### Documentación y especificaciones {#documentation-and-specifications}

La documentación se puede escribir en diferentes niveles y debe actualizarse al implementar los contratos:

- **Una descripción sencilla del sistema** que indique lo que hacen los contratos y cualquier suposición en la base de código.
- **Esquema y diagramas arquitectónicos**, incluyendo las interacciones con el contrato y la máquina de estado del sistema. Las [impresoras de Slither](https://github.com/crytic/slither/wiki/Printer-documentation) pueden ayudar a generar estos esquemas.
- **Documentación de código minuciosa**; el [formato Natspec](https://solidity.readthedocs.io/en/develop/natspec-format.html) puede usarse para Solidity.

### Cálculo en cadena vs. fuera de cadena {#on-chain-vs-off-chain-computation}

- **Mantenga todo el código que se pueda fuera de cadena.** Mantenga una capa en cadena pequeña. Preprocese datos con código fuera de la cadena de tal manera que la verificación en cadena sea simple. ¿Necesito una lista ordenada? Ordene la lista fuera de la cadena y luego solo compruebe su orden dentro de la cadena.

### Capacidad de mejora {#upgradeability}

Analizamos diferentes soluciones de mejora en [nuestra entrada de blog](https://blog.trailofbits.com/2018/09/05/contract-upgrade-anti-patterns/). Tome una decisión deliberada de si admitir la capacidad de mejora o no antes de escribir cualquier código. La decisión influirá en la forma en que estructura su código. En general, se recomienda:

- **Favoreciendo la [migración de contratos](https://blog.trailofbits.com/2018/10/29/how-contract-migration-works/) sobre la capacidad de actualización. ** Los sistemas de migración tienen muchas de las mismas ventajas que los que se pueden actualizar, sin sus inconvenientes.
- **Utilizar el patrón de separación de datos por sobre delegatecallproxy.** Si el proyecto tiene una clara separación de abstracción, la mejora mediante la separación de datos requerirá solo de unos pocos ajustes. delegatecallproxy requiere conocimientos sobre la EVM y es altamente propenso a errores.
- **Documentar el procedimiento de migración/actualización antes de la implementación.** Si tiene que reaccionar bajo presión sin ninguna directriz, cometerá errores. Escriba el procedimiento a seguir con antelación. Debe incluir:
  - Las llamadas que inician los nuevos contratos
  - Dónde se almacenan las claves y cómo acceder a ellas
  - Cómo revisar la implementación. Desarrolle y pruebe un script posterior a la implementación.

## Guías de implementación {#implementation-guidelines}

**Busque simplicidad ante todo.** Use simpre la solución más simple que se adapte a su propósito. Cualquier miembro del equipo debería ser capaz de entender la solución.

### Composición de funciones {#function-composition}

La arquitectura del código base debería hacer que el código sea fácil de revisar. Evite opciones arquitectónicas que disminuyan la capacidad de razonar acerca de la corrección.

- **Divida la lógica de su sistema**, ya sea a través de múltiples contratos o agrupando funciones similares (por ejemplo, autenticación, aritmética, ...).
- **Escriba pequeñas funciones con un propósito claro.** Esto facilitará la revisión y permitirá la prueba de componentes individuales.

### Herencia {#inheritance}

- **Mantenga la herencia manejable.** La herencia debe utilizarse para dividir la lógica; sin embargo, el proyecto debe apuntar a minimizar la profundidad y el ancho del árbol de herencia.
- **Use la [impresora de herencia](https://github.com/crytic/slither/wiki/Printer-documentation#inheritance-graph) de Slither para comprobar la jerarquía de los contratos.** La impresora de herencia ayudará a revisar el tamaño de la jerarquía.

### Events {#events}

- **Registre todas las operaciones cruciales.** Los eventos ayudarán a depurar el contrato durante el desarrollo y monitorearlo después de la implementación.

### Evite inconvenientes conocidos {#avoid-known-pitfalls}

- **Tenga presente los problemas de seguridad más comunes.** Hay muchos recursos en línea para aprender sobre problemas comunes, tales como [Ethernaut CTF](https://ethernaut.openzeppelin.com/), [Capture the Ether](https://capturetheether.com/) o [Not so smart contracts](https://github.com/crytic/not-so-smart-contracts/).
- **Tenga en cuenta las secciones de advertencias de la [documentación de Solidity](https://solidity.readthedocs.io/en/latest/).** Las secciones de advertencias lo informarán sobre el comportamiento no obvio del lenguaje.

### Dependencias {#dependencies}

- **Use bibliotecas bien probadas.** Importar código de bibliotecas bien probadas reducirá la probabilidad de escribir código con errores. Si desea escribir un contrato ERC20, use [OpenZeppelin](https://github.com/OpenZeppelin/openzeppelin-contracts/tree/master/contracts/token/ERC20).
- **Use un administrador de dependencias; evite copiar y pegar código.** Si confía en una fuente externa, entonces debe mantenerla actualizada con la fuente original.

### Pruebas y verificación {#testing-and-verification}

- **Escriba pruebas unitarias minuciosas.** Un amplio conjunto de pruebas es crucial para crear software de alta calidad.
- **Escriba verificaciones y propiedades de [Slither](https://github.com/crytic/slither), [Echidna](https://github.com/crytic/echidna) y [Manticore](https://github.com/trailofbits/manticore) personalizadas.** Las herramientas automatizadas ayudarán a garantizar la seguridad del contrato. Revise el resto de esta guía para aprender a escribir verificaciones y propiedades eficientes.
- **Use [crytic.io](https://crytic.io/).** Crytic se integra con Github y proporciona acceso a detectores privados de Slither, además de ejecutar comprobaciones de propiedades personalizadas desde Echidna.

### Solidity {#solidity}

- **Inclínese por Solidity 0.5 por sobre las versiones 0.4 y 0.6.** Solidity 0.5 es más seguro y tiene mejores prácticas incorporadas que la versión 0.4. Solidity 0.6 ha demostrado ser demasiado inestable para la producción y necesita tiempo para madurar.
- **Use una versión estable para compilar; use la última versión para comprobar si hay advertencias.** Compruebe que el código no tenga problemas reportados con la última versión del compilador. Sin embargo, Solidity tiene un ciclo de liberación rápido y un historial de errores del compilador, así que no se recomienda la última versión para la implementación (ver [recomendación de versión de solc](https://github.com/crytic/slither/wiki/Detector-Documentation#recommendation-33) de Slither).
- **No use ensamblado en línea.** El ensamblado requiere conocimientos sobre la EVM. No escriba código de EVM si no _domina_ el Yellow Paper.

## Directrices para la implementación {#deployment-guidelines}

Una vez que el contrato haya sido desarrollado e implementado:

- **Monitoree sus contratos.** Mire los registros y esté listo para reaccionar en caso de que un contrato o una billetera se vean comprometidos.
- **Agregue la información de su contacto a [blockchain-security-contacts](https://github.com/crytic/blockchain-security-contacts).** Esta lista ayuda a terceros a contactarlo si se descubre una falla de seguridad.
- **Proteja las billeteras de usuarios privilegiados.** Siga las [mejores prácticas](https://blog.trailofbits.com/2018/11/27/10-rules-for-the-secure-use-of-cryptocurrency-hardware-wallets/) si almacena llaves en billeteras de hardware.
- **Tenga un plan de respuesta a incidentes.** Considere que los contratos inteligentes pueden verse vulnerados. Incluso si los contratos están libres de fallas, un atacante puede tomar el control de las claves del propietario del contrato.
