---
title: Pautas de seguridad de contratos inteligentes
description: Lista de directrices de seguridad para tener en cuenta al crear una Dapp
author: "Trailofbits"
tags: [ "Solidity", "contratos Inteligentes", "seguridades" ]
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

- **Una descripción del sistema en un inglés sencillo**, que describa lo que hacen los contratos y cualquier suposición sobre la base del código.
- **Esquemas y diagramas de arquitectura**, incluidas las interacciones del contrato y la máquina de estados del sistema. Los [impresores de Slither](https://github.com/crytic/slither/wiki/Printer-documentation) pueden ayudar a generar estos esquemas.
- **Documentación exhaustiva del código**, se puede utilizar el [formato Natspec](https://docs.soliditylang.org/en/develop/natspec-format.html) para Solidity.

### Computación on-chain frente a off-chain {#onchain-vs-offchain-computation}

- **Mantenga la mayor cantidad de código que pueda off-chain.** Mantenga la capa on-chain pequeña. Preprocese los datos con código off-chain de tal manera que la verificación on-chain sea sencilla. ¿Necesito una lista ordenada? Ordene la lista fuera de la cadena y luego solo compruebe su orden dentro de la cadena.

### Actualizabilidad {#upgradeability}

Analizamos las diferentes soluciones de actualizabilidad en [nuestra publicación de blog](https://blog.trailofbits.com/2018/09/05/contract-upgrade-anti-patterns/). Tome una decisión deliberada de si admitir la capacidad de mejora o no antes de escribir cualquier código. La decisión influirá en la forma en que estructura su código. En general, se recomienda:

- **Favorecer la [migración de contratos](https://blog.trailofbits.com/2018/10/29/how-contract-migration-works/) sobre la actualizabilidad.** Los sistemas de migración tienen muchas de las mismas ventajas que los actualizables, sin sus inconvenientes.
- **Usar el patrón de separación de datos en lugar del patrón delegatecallproxy.** Si su proyecto tiene una clara separación de abstracción, la actualizabilidad mediante la separación de datos solo requerirá unos pocos ajustes. delegatecallproxy requiere conocimientos sobre la EVM y es altamente propenso a errores.
- **Documente el procedimiento de migración/actualización antes del despliegue.** Si tiene que reaccionar bajo estrés sin ninguna directriz, cometerá errores. Escriba el procedimiento a seguir con antelación. Debe incluir:
  - Las llamadas que inician los nuevos contratos
  - Dónde se almacenan las claves y cómo acceder a ellas
  - Cómo revisar la implementación. Desarrolle y pruebe un script posterior a la implementación.

## Directrices de implementación {#implementation-guidelines}

**Busque la simplicidad.** Utilice siempre la solución más sencilla que se ajuste a su propósito. Cualquier miembro del equipo debería ser capaz de entender la solución.

### Composición de funciones {#function-composition}

La arquitectura del código base debería hacer que el código sea fácil de revisar. Evite opciones arquitectónicas que disminuyan la capacidad de razonar acerca de la corrección.

- **Divida la lógica de su sistema**, ya sea a través de múltiples contratos o agrupando funciones similares (por ejemplo, autenticación, aritmética, ...).
- **Escriba funciones pequeñas con un propósito claro.** Esto facilitará la revisión y permitirá probar los componentes individuales.

### Herencia {#inheritance}

- **Mantenga la herencia manejable.** La herencia debe usarse para dividir la lógica, sin embargo, su proyecto debe apuntar a minimizar la profundidad y la anchura del árbol de herencia.
- **Utilice el [impresor de herencia](https://github.com/crytic/slither/wiki/Printer-documentation#inheritance-graph) de Slither para comprobar la jerarquía de los contratos.** El impresor de herencia le ayudará a revisar el tamaño de la jerarquía.

### Eventos {#events}

- **Registre todas las operaciones cruciales.** Los eventos ayudarán a depurar el contrato durante el desarrollo y a supervisarlo después del despliegue.

### Evite los escollos conocidos {#avoid-known-pitfalls}

- **Sea consciente de los problemas de seguridad más comunes.** Hay muchos recursos en línea para aprender sobre los problemas comunes, como [Ethernaut CTF](https://ethernaut.openzeppelin.com/), [Capture the Ether](https://capturetheether.com/) o [Not so smart contracts](https://github.com/crytic/not-so-smart-contracts/).
- **Preste atención a las secciones de advertencias en la [documentación de Solidity](https://docs.soliditylang.org/en/latest/).** Las secciones de advertencias le informarán sobre el comportamiento no obvio del lenguaje.

### Dependencias {#dependencies}

- **Utilice bibliotecas bien probadas.** La importación de código de bibliotecas bien probadas reducirá la probabilidad de que escriba código con errores. Si quiere escribir un contrato ERC20, utilice [OpenZeppelin](https://github.com/OpenZeppelin/openzeppelin-contracts/tree/master/contracts/token/ERC20).
- **Utilice un gestor de dependencias; evite copiar y pegar el código.** Si depende de una fuente externa, debe mantenerla actualizada con la fuente original.

### Pruebas y verificación {#testing-and-verification}

- **Escriba pruebas unitarias exhaustivas.** Un conjunto de pruebas exhaustivo es crucial para crear software de alta calidad.
- **Escriba comprobaciones y propiedades personalizadas de [Slither](https://github.com/crytic/slither), [Echidna](https://github.com/crytic/echidna) y [Manticore](https://github.com/trailofbits/manticore).** Las herramientas automatizadas le ayudarán a garantizar que su contrato sea seguro. Revise el resto de esta guía para aprender a escribir verificaciones y propiedades eficientes.
- **Use [crytic.io](https://crytic.io/).** Crytic se integra con GitHub, proporciona acceso a detectores privados de Slither y ejecuta comprobaciones de propiedades personalizadas de Echidna.

### Solidity {#solidity}

- **Prefiera Solidity 0.5 a 0.4 y 0.6.** En nuestra opinión, Solidity 0.5 es más seguro y tiene mejores prácticas integradas que la versión 0.4. Solidity 0.6 ha demostrado ser demasiado inestable para la producción y necesita tiempo para madurar.
- **Utilice una versión estable para compilar; utilice la última versión para comprobar las advertencias.** Compruebe que su código no tiene problemas reportados con la última versión del compilador. Sin embargo, Solidity tiene un ciclo de lanzamiento rápido y un historial de errores del compilador, por lo que no recomendamos la última versión para el despliegue (consulte la [recomendación de la versión de solc](https://github.com/crytic/slither/wiki/Detector-Documentation#recommendation-33) de Slither).
- **No utilice el ensamblador en línea.** El ensamblador requiere experiencia en EVM. No escriba código EVM si no ha _dominado_ el «libro amarillo» (yellow paper).

## Directrices de despliegue {#deployment-guidelines}

Una vez que el contrato haya sido desarrollado e implementado:

- **Supervise sus contratos.** Vigile los registros y esté preparado para reaccionar en caso de que el contrato o la billetera se vean comprometidos.
- **Añada su información de contacto a [blockchain-security-contacts](https://github.com/crytic/blockchain-security-contacts).** Esta lista ayuda a terceros a ponerse en contacto con usted si se descubre un fallo de seguridad.
- **Asegure las billeteras de los usuarios con privilegios.** Siga nuestras [mejores prácticas](https://blog.trailofbits.com/2018/11/27/10-rules-for-the-secure-use-of-cryptocurrency-hardware-wallets/) si almacena claves en billeteras de hardware.
- **Tenga un plan de respuesta a incidentes.** Tenga en cuenta que sus contratos inteligentes pueden verse comprometidos. Incluso si los contratos están libres de fallas, un atacante puede tomar el control de las claves del propietario del contrato.
