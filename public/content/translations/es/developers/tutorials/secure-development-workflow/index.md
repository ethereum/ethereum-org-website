---
title: Lista de verificación de seguridad para contratos inteligentes
description: Un flujo de trabajo sugerido para escribir contratos inteligentes seguros
author: "Trailofbits"
tags: [ "smart contracts", "seguridad", "solidity" ]
skill: intermedio
lang: es
published: 2020-09-07
source: Crear contratos seguros
sourceUrl: https://github.com/crytic/building-secure-contracts/blob/master/development-guidelines/workflow.md
---

## Lista de verificación para el desarrollo de contratos inteligentes {#smart-contract-development-checklist}

Este es un proceso de alto nivel que recomendamos que siga al escribir sus contratos inteligentes.

Compruebe los problemas de seguridad conocidos:

- Revise sus contratos con [Slither](https://github.com/crytic/slither). Tiene más de 40 detectores integrados para las vulnerabilidades comunes. Ejecútelo en cada confirmación de código nuevo y asegúrese de que obtiene un informe limpio (o utilice el modo de triaje para silenciar ciertos problemas).
- Revise sus contratos con [Crytic](https://crytic.io/). Comprueba 50 problemas que Slither no comprueba. Crytic también puede ayudar a que los miembros de su equipo se mantengan al día, al mostrar fácilmente los problemas de seguridad en las solicitudes de cambios (Pull Requests) en GitHub.

Considere las características especiales de su contrato:

- ¿Se pueden actualizar sus contratos? Revise su código de capacidad de actualización en busca de fallos con [`slither-check-upgradeability`](https://github.com/crytic/slither/wiki/Upgradeability-Checks) o [Crytic](https://blog.trailofbits.com/2020/06/12/upgradeable-contracts-made-safer-with-crytic/). Hemos documentado 17 maneras en que las actualizaciones pueden salir mal.
- ¿Pretenden sus contratos ajustarse a los ERC? Compruébelos con [`slither-check-erc`](https://github.com/crytic/slither/wiki/ERC-Conformance). Esta herramienta identifica al instante desviaciones de seis especificaciones comunes.
- ¿Se integra con tokens de terceros? Revise nuestra [lista de verificación para la integración de tokens](/developers/tutorials/token-integration-checklist/) antes de depender de contratos externos.

Inspeccione visualmente las características de seguridad críticas de su código:

- Revise el impresor [inheritance-graph](https://github.com/trailofbits/slither/wiki/Printer-documentation#inheritance-graph) de Slither. Evite problemas de ensombrecimiento involuntario y de linearización C3.
- Revise el impresor [function-summary](https://github.com/trailofbits/slither/wiki/Printer-documentation#function-summary) de Slither. Informa sobre la visibilidad de las funciones y los controles de acceso.
- Revise el impresor [vars-and-auth](https://github.com/trailofbits/slither/wiki/Printer-documentation#variables-written-and-authorization) de Slither. Informa sobre los controles de acceso en las variables de estado.

Documente las propiedades de seguridad críticas y utilice generadores de pruebas automatizados para evaluarlas:

- Aprenda a [documentar las propiedades de seguridad para su código](/developers/tutorials/guide-to-smart-contract-security-tools/). Es difícil al principio, pero es la actividad más importante para lograr un buen resultado. También es un prerrequisito para utilizar cualquiera de las técnicas avanzadas de este tutorial.
- Defina las propiedades de seguridad en Solidity, para su uso con [Echidna](https://github.com/crytic/echidna) y [Manticore](https://manticore.readthedocs.io/en/latest/verifier.html). Céntrese en la máquina de estados, los controles de acceso, las operaciones aritméticas, las interacciones externas y la conformidad con los estándares.
- Defina las propiedades de seguridad con la [API de Python de Slither](/developers/tutorials/how-to-use-slither-to-find-smart-contract-bugs/). Céntrese en la herencia, las dependencias de variables, los controles de acceso y otros problemas estructurales.
- Ejecute sus pruebas de propiedades en cada confirmación con [Crytic](https://crytic.io). Crytic puede consumir y evaluar las pruebas de propiedades de seguridad para que todos en su equipo puedan ver fácilmente que las aprueban en GitHub. Las pruebas fallidas pueden bloquear las confirmaciones.

Por último, tenga en cuenta los problemas que las herramientas automatizadas no pueden encontrar fácilmente:

- Falta de privacidad: todos los demás pueden ver sus transacciones mientras están en cola en el pool
- Transacciones de front-running
- Operaciones criptográficas
- Interacciones arriesgadas con componentes DeFi externos

## Pida ayuda {#ask-for-help}

Las [horas de consulta de Ethereum](https://calendly.com/dan-trailofbits/office-hours) tienen lugar todos los martes por la tarde. Estas sesiones individuales de 1 hora son una oportunidad para hacernos cualquier pregunta que tenga sobre seguridad, solucionar problemas con nuestras herramientas y obtener la opinión de expertos sobre su enfoque actual. Le ayudaremos a seguir esta guía.

Únase a nuestro Slack: [Empire Hacking](https://join.slack.com/t/empirehacking/shared_invite/zt-h97bbrj8-1jwuiU33nnzg67JcvIciUw). Estamos siempre disponibles en los canales #crytic y #ethereum si tiene alguna pregunta.
