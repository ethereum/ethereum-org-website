---
title: Lista de verificación de seguridad de los contratos inteligentes
description: Un flujo de trabajo recomendado para escribir contratos inteligentes seguros
author: "Trailofbits"
tags:
  - "contratos inteligentes"
  - "seguridad"
  - "solidity"
skill: intermediate
lang: es
published: 2020-09-07
source: Desarrollar contratos seguros
sourceUrl: https://github.com/crytic/building-secure-contracts/blob/master/development-guidelines/workflow.md
---

## Lista de verificación de desarrollo de contratos inteligente {#smart-contract-development-checklist}

Le indicamos un proceso altamente eficiente que le recomendamos seguir cuando escriba sus contratos inteligentes.

Compruebe cualquier problema de seguridad conocido:

- Revisa tus contratos con [Slither](https://github.com/crytic/slither). Tiene más de 40 detectores integrados para vulnerabilidades comunes. Ejecútelo en cada comprobación con un nuevo código y asegúrese de obtener un informe limpio (o utilice el modo de cribado para silenciar ciertos problemas).
- Revise sus contratos con [Crytic](https://crytic.io/). Comprueba 50 problemas que Slither no revisa. Crytic puede ayudar a que su equipo se mantenga a la cabecera, al descubrir fácilmente problemas de seguridad en Pull Requests en GitHub.

Tenga en cuenta las características especiales de su contrato:

- ¿Sus contratos pueden mejorarse? Revise su código de mejora para errores con [`slither-check-upgradeability`](https://github.com/crytic/slither/wiki/Upgradeability-Checks) o [Crytic](https://blog.trailofbits.com/2020/06/12/upgradeable-contracts-made-safer-with-crytic/). Hemos documentado 17 formas en que las actualizaciones pueden fallar.
- ¿Sus contratos pretenden ajustarse a los ERC? Compruébalos con [`slither-check-erc`](https://github.com/crytic/slither/wiki/ERC-Conformance). Esta herramienta identifica instantáneamente las desviaciones de seis especificaciones comunes.
- ¿Se integra con tókenes de terceros? Revise nuestra [lista de verificación de integración de tókenes](/developers/tutorials/token-integration-checklist/) antes de depender de contratos externos.

Inspeccione visualmente las características de seguridad críticas de su código:

- Revise la impresión en consola [heredance-graph](https://github.com/trailofbits/slither/wiki/Printer-documentation#inheritance-graph) de Slither. Evite problemas de operaciones en paralelo involuntarias y de linearización C3.
- Revise la impresion en consola [function-summary](https://github.com/trailofbits/slither/wiki/Printer-documentation#function-summary) de Slither. Informa de la visibilidad de las funciones y los controles de acceso.
- Revise la impresion en consola [vars-and-auth](https://github.com/trailofbits/slither/wiki/Printer-documentation#variables-written-and-authorization) de Slither. Informa de los controles de acceso sobre las variables de estado.

Documente propiedades de seguridad críticas y utilice generadores de pruebas automatizados para evaluarlas:

- Aprende a [documentar propiedades de seguridad para su código](/developers/tutorials/guide-to-smart-contract-security-tools/). Es difícil al principio, pero es la actividad más importante para lograr un buen resultado. También es un requisito previo para utilizar cualquiera de las técnicas avanzadas en este tutorial.
- Defina propiedades de seguridad en Solidity, para su uso con [Echidna](https://github.com/crytic/echidna) y [Manticore](https://manticore.readthedocs.io/en/latest/verifier.html). Concéntrese en su máquina de estado, controles de acceso, operaciones aritméticas, interacciones externas y conformidad con los estándares.
- Defina las propiedades de seguridad con [la API Python de Slither](/developers/tutorials/how-to-use-slither-to-find-smart-contract-bugs/). Concéntrese en la herencia, dependencias variables, controles de acceso y otras cuestiones estructurales.
- Ejecute sus pruebas de propiedad en cada comando commit con [Crytic](https://crytic.io). Crytic puede consumir y evaluar pruebas de propiedad de seguridad para que todos los miembros de su equipo puedan ver fácilmente que pasan por GitHub. Las pruebas fallidas pueden bloquear los commits.

Por último, tenga en cuenta los problemas que las herramientas automatizadas no pueden encontrar fácilmente:

- Falta de privacidad: todos los demás pueden ver sus transacciones mientras están en cola de espera.
- Transacciones en ejecución frontal
- Operaciones criptográficas
- Interacciones arriesgadas con componentes DeFi externos

## Pedir ayuda {#ask-for-help}

[El horario de oficina de Ethereum](https://calendly.com/dan-trailofbits/ethereum-office-hours) funciona cada martes por la tarde. Estas sesiones individuales de una hora de duración son una oportunidad para hacernos cualquier pregunta que tenga sobre la seguridad, solucionar problemas usando nuestras herramientas y obtener comentarios de expertos sobre su enfoque actual. Le ayudaremos a trabajar con esta guía.

Únase a nuestro Slack: [Pirateando el imperio](https://join.slack.com/t/empirehacking/shared_invite/zt-h97bbrj8-1jwuiU33nnzg67JcvIciUw). Siempre estamos disponibles en los canales #crytic y #ethereum si tiene alguna duda.
