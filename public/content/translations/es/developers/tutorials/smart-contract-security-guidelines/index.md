---
title: Pautas de seguridad para contratos inteligentes
description: Una lista de verificación de pautas de seguridad a considerar al construir tu dapp
author: "Trailofbits"
tags: ["solidity", "contratos inteligentes", "seguridad"]
skill: intermediate
breadcrumb: Pautas de seguridad
lang: es
published: 2020-09-06
source: Building secure contracts
sourceUrl: https://github.com/crytic/building-secure-contracts/blob/master/development-guidelines/guidelines.md
---

Sigue estas recomendaciones de alto nivel para construir contratos inteligentes más seguros.

## Pautas de diseño {#design-guidelines}

El diseño del contrato debe discutirse con anticipación, antes de escribir cualquier línea de código.

### Documentación y especificaciones {#documentation-and-specifications}

La documentación puede escribirse en diferentes niveles y debe actualizarse mientras se implementan los contratos:

- **Una descripción del sistema en lenguaje sencillo**, que describa lo que hacen los contratos y cualquier suposición sobre el código base.
- **Esquemas y diagramas arquitectónicos**, incluyendo las interacciones del contrato y la máquina de estado del sistema. Los [impresores de Slither](https://github.com/crytic/slither/wiki/Printer-documentation) pueden ayudar a generar estos esquemas.
- **Documentación exhaustiva del código**, se puede usar el [formato NatSpec](https://docs.soliditylang.org/en/develop/natspec-format.html) para Solidity.

### Computación en cadena frente a fuera de la cadena {#onchain-vs-offchain-computation}

- **Mantén la mayor cantidad de código posible fuera de la cadena.** Mantén la capa en cadena pequeña. Preprocesa los datos con código fuera de la cadena de tal manera que la verificación en cadena sea simple. ¿Necesitas una lista ordenada? Ordena la lista fuera de la cadena y luego solo verifica su orden en cadena.

### Capacidad de actualización {#upgradeability}

Discutimos las diferentes soluciones de capacidad de actualización en [nuestra publicación de blog](https://blog.trailofbits.com/2018/09/05/contract-upgrade-anti-patterns/). Toma una decisión deliberada sobre si admitir o no la capacidad de actualización antes de escribir cualquier código. La decisión influirá en cómo estructures tu código. En general, recomendamos:

- **Favorecer la [migración de contratos](https://blog.trailofbits.com/2018/10/29/how-contract-migration-works/) sobre la capacidad de actualización.** Los sistemas de migración tienen muchas de las mismas ventajas que los actualizables, sin sus inconvenientes.
- **Usar el patrón de separación de datos sobre el de delegatecallproxy.** Si tu proyecto tiene una clara separación de abstracción, la capacidad de actualización mediante la separación de datos requerirá solo unos pocos ajustes. El delegatecallproxy requiere experiencia en la EVM y es muy propenso a errores.
- **Documentar el procedimiento de migración/actualización antes del despliegue.** Si tienes que reaccionar bajo estrés sin ninguna pauta, cometerás errores. Escribe el procedimiento a seguir con anticipación. Debe incluir:
  - Las llamadas que inician los nuevos contratos
  - Dónde se almacenan las claves y cómo acceder a ellas
  - ¡Cómo verificar el despliegue! Desarrolla y prueba un script posterior al despliegue.

## Pautas de implementación {#implementation-guidelines}

**Esfuérzate por la simplicidad.** Usa siempre la solución más simple que se adapte a tu propósito. Cualquier miembro de tu equipo debería poder entender tu solución.

### Composición de funciones {#function-composition}

La arquitectura de tu código base debería hacer que tu código sea fácil de revisar. Evita las decisiones arquitectónicas que disminuyan la capacidad de razonar sobre su corrección.

- **Divide la lógica de tu sistema**, ya sea a través de múltiples contratos o agrupando funciones similares (por ejemplo, autenticación, aritmética, ...).
- **Escribe funciones pequeñas, con un propósito claro.** Esto facilitará la revisión y permitirá probar componentes individuales.

### Herencia {#inheritance}

- **Mantén la herencia manejable.** La herencia debe usarse para dividir la lógica; sin embargo, tu proyecto debe apuntar a minimizar la profundidad y el ancho del árbol de herencia.
- **Usa el [impresor de herencia](https://github.com/crytic/slither/wiki/Printer-documentation#inheritance-graph) de Slither para verificar la jerarquía de los contratos.** El impresor de herencia te ayudará a revisar el tamaño de la jerarquía.

### Eventos {#events}

- **Registra todas las operaciones cruciales.** Los eventos ayudarán a depurar el contrato durante el desarrollo y a monitorearlo después del despliegue.

### Evita los errores conocidos {#avoid-known-pitfalls}

- **Ten en cuenta los problemas de seguridad más comunes.** Hay muchos recursos en línea para aprender sobre problemas comunes, como [Ethernaut CTF](https://ethernaut.openzeppelin.com/), [Capture the Ether](https://capturetheether.com/) o [Not so smart contracts](https://github.com/crytic/not-so-smart-contracts/).
- **Presta atención a las secciones de advertencias en la [documentación de Solidity](https://docs.soliditylang.org/en/latest/).** Las secciones de advertencias te informarán sobre el comportamiento no obvio del lenguaje.

### Dependencias {#dependencies}

- **Usa bibliotecas bien probadas.** Importar código de bibliotecas bien probadas reducirá la probabilidad de que escribas código con errores. Si quieres escribir un contrato ERC-20, usa [OpenZeppelin](https://github.com/OpenZeppelin/openzeppelin-contracts/tree/master/contracts/token/ERC20).
- **Usa un administrador de dependencias; evita copiar y pegar código.** Si dependes de una fuente externa, debes mantenerla actualizada con la fuente original.

### Pruebas y verificación {#testing-and-verification}

- **Escribe pruebas unitarias exhaustivas.** Un conjunto de pruebas extenso es crucial para construir software de alta calidad.
- **Escribe comprobaciones y propiedades personalizadas para [Slither](https://github.com/crytic/slither), [Echidna](https://github.com/crytic/echidna) y [Manticore](https://github.com/trailofbits/manticore).** Las herramientas automatizadas ayudarán a garantizar que tu contrato sea seguro. Revisa el resto de esta guía para aprender a escribir comprobaciones y propiedades eficientes.
- **Usa [crytic.io](https://crytic.io/).** Crytic se integra con GitHub, proporciona acceso a detectores privados de Slither y ejecuta comprobaciones de propiedades personalizadas desde Echidna.

### Solidity {#solidity}

- **Favorece Solidity 0.5 sobre 0.4 y 0.6.** En nuestra opinión, Solidity 0.5 es más seguro y tiene mejores prácticas integradas que 0.4. Solidity 0.6 ha demostrado ser demasiado inestable para producción y necesita tiempo para madurar.
- **Usa una versión estable para compilar; usa la última versión para comprobar si hay advertencias.** Verifica que tu código no tenga problemas reportados con la última versión del compilador. Sin embargo, Solidity tiene un ciclo de lanzamiento rápido y un historial de errores en el compilador, por lo que no recomendamos la última versión para el despliegue (consulta la [recomendación de versión de solc](https://github.com/crytic/slither/wiki/Detector-Documentation#recommendation-33) de Slither).
- **No uses ensamblador en línea.** El ensamblador requiere experiencia en la EVM. No escribas código de la EVM si no dominas el _Libro Amarillo_.

## Pautas de despliegue {#deployment-guidelines}

Una vez que el contrato ha sido desarrollado y desplegado:

- **Monitorea tus contratos.** Observa los registros y prepárate para reaccionar en caso de que el contrato o la billetera se vean comprometidos.
- **Agrega tu información de contacto a [blockchain-security-contacts](https://github.com/crytic/blockchain-security-contacts).** Esta lista ayuda a terceros a contactarte si se descubre una falla de seguridad.
- **Asegura las billeteras de los usuarios privilegiados.** Sigue nuestras [mejores prácticas](https://blog.trailofbits.com/2018/11/27/10-rules-for-the-secure-use-of-cryptocurrency-hardware-wallets/) si almacenas claves en billeteras de hardware.
- **Ten un plan de respuesta a incidentes.** Considera que tus contratos inteligentes pueden verse comprometidos. Incluso si tus contratos no tienen errores, un atacante podría tomar el control de las claves del propietario del contrato.