---
title: "Lista de verificación de seguridad de contratos inteligentes"
description: Un flujo de trabajo sugerido para escribir contratos inteligentes seguros
author: "Trailofbits"
tags: ["contratos inteligentes", "seguridad", "Solidity"]
skill: intermediate
breadcrumb: "Lista de verificación de seguridad"
lang: es
published: 2020-09-07
source: Building secure contracts
sourceUrl: https://github.com/crytic/building-secure-contracts/blob/master/development-guidelines/workflow.md
---

## Lista de verificación para el desarrollo de contratos inteligentes {#smart-contract-development-checklist}

Aquí tienes un proceso de alto nivel que recomendamos seguir mientras escribes tus contratos inteligentes.

Comprueba si hay problemas de seguridad conocidos:

- Revisa tus contratos con [Slither](https://github.com/crytic/slither). Tiene más de 40 detectores integrados para vulnerabilidades comunes. Ejecútalo en cada confirmación (check-in) con código nuevo y asegúrate de obtener un informe limpio (o usa el modo de triaje para silenciar ciertos problemas).
- Revisa tus contratos con [Crytic](https://crytic.io/). Comprueba 50 problemas que Slither no detecta. Crytic también puede ayudar a tu equipo a mantenerse al tanto, mostrando fácilmente los problemas de seguridad en los Pull Requests de GitHub.

Considera las características especiales de tu contrato:

- ¿Tus contratos son actualizables? Revisa tu código de actualizabilidad en busca de fallos con [`slither-check-upgradeability`](https://github.com/crytic/slither/wiki/Upgradeability-Checks) o [Crytic](https://blog.trailofbits.com/2020/06/12/upgradeable-contracts-made-safer-with-crytic/). Hemos documentado 17 formas en las que las actualizaciones pueden salir mal.
- ¿Tus contratos pretenden cumplir con los ERC? Compruébalos con [`slither-check-erc`](https://github.com/crytic/slither/wiki/ERC-Conformance). Esta herramienta identifica al instante las desviaciones de seis especificaciones comunes.
- ¿Te integras con tokens de terceros? Revisa nuestra [lista de verificación de integración de tokens](/developers/tutorials/token-integration-checklist/) antes de depender de contratos externos.

Inspecciona visualmente las características de seguridad críticas de tu código:

- Revisa el impresor [inheritance-graph](https://github.com/trailofbits/slither/wiki/Printer-documentation#inheritance-graph) de Slither. Evita el ensombrecimiento (shadowing) inadvertido y los problemas de linealización C3.
- Revisa el impresor [function-summary](https://github.com/trailofbits/slither/wiki/Printer-documentation#function-summary) de Slither. Informa sobre la visibilidad de las funciones y los controles de acceso.
- Revisa el impresor [vars-and-auth](https://github.com/trailofbits/slither/wiki/Printer-documentation#variables-written-and-authorization) de Slither. Informa sobre los controles de acceso en las variables de estado.

Documenta las propiedades de seguridad críticas y usa generadores de pruebas automatizados para evaluarlas:

- Aprende a [documentar las propiedades de seguridad de tu código](/developers/tutorials/guide-to-smart-contract-security-tools/). Al principio es difícil, pero es la actividad más importante para lograr un buen resultado. También es un requisito previo para usar cualquiera de las técnicas avanzadas de este tutorial.
- Define las propiedades de seguridad en Solidity, para usarlas con [Echidna](https://github.com/crytic/echidna) y [Manticore](https://manticore.readthedocs.io/en/latest/verifier.html). Céntrate en tu máquina de estado, controles de acceso, operaciones aritméticas, interacciones externas y cumplimiento de estándares.
- Define las propiedades de seguridad con la [API de Python de Slither](/developers/tutorials/how-to-use-slither-to-find-smart-contract-bugs/). Céntrate en la herencia, las dependencias de variables, los controles de acceso y otros problemas estructurales.
- Ejecuta tus pruebas de propiedades en cada confirmación (commit) con [Crytic](https://crytic.io). Crytic puede consumir y evaluar pruebas de propiedades de seguridad para que todos en tu equipo puedan ver fácilmente que se aprueban en GitHub. Las pruebas fallidas pueden bloquear las confirmaciones.

Por último, ten en cuenta los problemas que las herramientas automatizadas no pueden encontrar fácilmente:

- Falta de privacidad: todos los demás pueden ver tus transacciones mientras están en cola en el pool
- Transacciones de front-running
- Operaciones criptográficas
- Interacciones arriesgadas con componentes externos de finanzas descentralizadas (DeFi)

## Pide ayuda {#ask-for-help}

El [horario de atención de Ethereum](https://calendly.com/dan-trailofbits/office-hours) es todos los martes por la tarde. Estas sesiones individuales de 1 hora son una oportunidad para hacernos cualquier pregunta que tengas sobre seguridad, solucionar problemas usando nuestras herramientas y obtener comentarios de expertos sobre tu enfoque actual. Te ayudaremos a avanzar en esta guía.

Únete a nuestro Slack: [Empire Hacking](https://join.slack.com/t/empirehacking/shared_invite/zt-h97bbrj8-1jwuiU33nnzg67JcvIciUw). Siempre estamos disponibles en los canales #crytic y #ethereum si tienes alguna pregunta.