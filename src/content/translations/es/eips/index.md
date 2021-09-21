---
title: Propuestas de mejora de Ethereum (EIP)
description: La información básica necesaria para entender las propuestas de mejora de Ethereum (EIP, por sus siglas en inglés).
lang: es
sidebar: true
---

# Introducción a las propuestas de mejora de Ethereum (EIP) {#introduction-to-ethereum-improvement-proposals-eips}

## ¿Qué son las EIP? {#what-are-eips}

[Las propuestas de mejora de Ethereum (EIPs)](https://eips.ethereum.org/) son estándares que especifican nuevas características o procesos potenciales para Ethereum. Las EIP contienen especificaciones técnicas para los cambios propuestos y actúan como “fuente de verdad” para la comunidad. Las actualizaciones de la red y los estándares de aplicación para Ethereum se debaten y desarrollan a través del proceso de las EIP.

Cualquier persona dentro de la comunidad Ethereum tiene la capacidad de crear una EIP. Las pautas para escribir EIP se incluyen en [EIP 1](https://eips.ethereum.org/EIPS/eip-1). La EIP deberá proporcionar una especificación técnica concisa de la característica que propone. El autor de la EIP es responsable de crear consenso dentro de la comunidad y de documentar opiniones discrepantes. Dada la alta exigencia técnica para enviar una EIP bien formada, históricamente, la mayoría de los autores de EIP han sido desarrolladores de aplicaciones o protocolos.

## ¿Por qué importan las EIP? {#why-do-eips-matter}

Las EIP desempeñan un papel importante en la forma en que ocurren los cambios y se documentan en Ethereum. Son la forma de que la gente proponga, debata y adopte cambios. Existen diferentes [tipos de EIP](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-1.md#eip-types), incluidas las EIP centrales para cambios de protocolo de bajo nivel que afectan el consenso y requieren una actualización de la red, así como ERC para los estándares de aplicación. Por ejemplo, estándares para crear tokens, como [ERC20](https://eips.ethereum.org/EIPS/eip-20) o [ERC721](https://eips.ethereum.org/EIPS/eip-721) permite que las aplicaciones que interactúan con estos tokens traten todos los tokens usando las mismas reglas, lo que facilita la creación de aplicaciones interoperables.

Cada actualización de red consta de un conjunto de EIP que debe implementar cada [cliente de Ethereum](/en/learn/#clients-and-nodes) en la red. Esto implica que para mantener el consenso con otros clientes en la red principal de Ethereum, los desarrolladores de clientes deben asegurarse de que todos hayan implementado las EIP necesarias.

Además de proporcionar una especificación técnica para los cambios, las EIP son la unidad alrededor de la cual ocurre la gobernanza en Ethereum: cualquiera es libre de proponer una y, a continuación, varias partes interesadas en la comunidad debatirán para determinar si debe adoptarse como estándar o incluirse en una actualización de la red. Debido a que las EIP no son esenciales, no tienen que ser adoptadas por todas las aplicaciones (por ejemplo, puedes crear un token que no sea [ERC20](https://eips.ethereum.org/EIPS/eip-20)). Sin embargo, las EIP esenciales deben adoptarse ampliamente (porque todos los nodos deben actualizarse para permanecer como parte de la misma red). Las EIP esenciales requieren un consenso más amplio dentro de la comunidad que las EIP no esenciales.

## Historia de las EIP {#history-of-eips}

El [repositorio de Github de propuestas de mejora de Ethereum (EIP)](https://github.com/ethereum/EIPs) se creó en octubre de 2015. El proceso de EIP se basa en el proceso de [propuestas de mejora de Bitcoin (BIP)](https://github.com/bitcoin/bips), que a su vez se basa en el [ proceso de propuestas de mejora de Python (PEP) ](https://www.python.org/dev/peps/).

Los editores de EIP tienen la tarea de revisar las EIP para verificar su solidez técnica, así como su correcta ortografía/gramática y estilo de código. Martin Becze, Vitalik Buterin y Gavin Wood, entre otros, fueron los editores originales de EIP desde 2015 hasta finales de 2016. Los editores EIP actuales son:

- Alex Beregszaszi (EWASM/Fundación Ethereum)
- Greg Colvin (Comunidad)
- Casey Detrio (EWASM/Fundación Ethereum)
- Hudson James (Fundación Ethereum)
- Nick Johnson (ENS)
- Nick Savers (Comunidad)

## Más información {#learn-more}

Si estás interesado en leer más sobre las EIP, consulta el [sitio web de EIP](https://eips.ethereum.org/), donde puedes encontrar información adicional, que incluye:

- [Los diferentes tipos de IEP](https://eips.ethereum.org/)
- [Una lista de cada EIP que se ha creada](https://eips.ethereum.org/all)
- [Estados de las EIP y lo que significan](https://eips.ethereum.org/)

## Participar {#participate}

Si estás interesado en seguir o compartir tu opinión sobre las EIP, consulta el [foro de magos de Ethereum](https://ethereum-magicians.org/), en el que se habla de las EIP con la comunidad.

Además, echa un vistazo a:

- [Cómo crear una EIP](https://eips.ethereum.org/EIPS/eip-1)

## Referencias {#references}

<cite class="citation">

Contenido de la página proporcionado en parte por [Ethereum Protocol Development Governance and Network Upgrade Coordination](https://hudsonjameson.com/2020-03-23-ethereum-protocol-development-governance-and-network-upgrade-coordination/) por Hudson Jameson

</cite>
