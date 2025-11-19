---
title: Propuestas de mejora de Ethereum (EIP)
description: La información básica que necesita para entender las EIP
lang: es
---

# Introducción a las Propuestas de Mejora de Ethereum (EIPs) {#introduction-to-ethereum-improvement-proposals}

## ¿Qué son las EIP? {#what-are-eips}

[Las Propuestas de Mejora de Ethereum (EIPs)](https://eips.ethereum.org/) son estándares que especifican posibles nuevas características o procesos para Ethereum. Las EIP contienen especificaciones técnicas para los cambios propuestos y actúan como «fuente fidedigna» para la comunidad. Las actualizaciones de la red y los estándares de aplicación para Ethereum se debaten y desarrollan a través del proceso de las EIP.

Cualquier persona dentro de la comunidad Ethereum tiene la capacidad de crear una EIP. Las directrices para redactar EIPs están incluidas en [EIP-1](https://eips.ethereum.org/EIPS/eip-1). Una EIP debe proporcionar principalmente una especificación técnica concisa con alguna motivación. El autor de EIP es responsable de llegar a un consenso dentro de la comunidad y documentar opiniones alternativas. Dada la gran barrera técnica existente para enviar una EIP correctamente formulada, históricamente la mayoría de los autores de EIP suelen ser desarrolladores de aplicaciones o protocolos.

## ¿Por qué importan las EIP? {#why-do-eips-matter}

Las EIP desempeñan un papel importante en la forma en que ocurren los cambios y se documentan en Ethereum. Son la vía para que las personas propongan, debatan y adopten cambios. Existen [diferentes tipos de EIPs](https://eips.ethereum.org/EIPS/eip-1#eip-types), incluyendo EIPs principales para cambios de bajo nivel en el protocolo que afectan al consenso y requieren una actualización de red como [EIP-1559](https://eips.ethereum.org/EIPS/eip-1559), y ERCs para estándares de aplicaciones como [EIP-20](https://eips.ethereum.org/EIPS/eip-20) y [EIP-721](https://eips.ethereum.org/EIPS/eip-721).

Cada actualización de red consiste en un conjunto de EIPs que deben ser implementados por cada [cliente de Ethereum](/learn/#clients-and-nodes) en la red. Esto implica que para mantener el consenso con otros clientes en la red principal de Ethereum, los desarrolladores de clientes deben asegurarse de que todos hayan implementado las EIP necesarias.

Además de proporcionar una especificación técnica para los cambios, las EIP son la unidad alrededor de la cual ocurre la gobernanza en Ethereum: cualquiera es libre de proponer una y, a continuación, varias partes interesadas en la comunidad debatirán para determinar si debe adoptarse como estándar o incluirse en una actualización de la red. Debido a que no todas las aplicaciones tiene que adoptar las EIP no centralizadas (por ejemplo, es posible crear un token fungible que no implemente EIP-20), pero las EIP centrales sí que deben adoptarse ampliamente (ya que todos los nodos deben actualizarse para seguir formando parte de la misma red), las EIP centrales requieren un consenso más amplio dentro de la comunidad que las EIP no centrales.

## Historia de las EIPs {#history-of-eips}

El [repositorio de GitHub de las Propuestas de Mejora de Ethereum (EIPs)](https://github.com/ethereum/EIPs) fue creado en octubre de 2015. El proceso EIP está basado en el proceso de [Propuestas de Mejora de Bitcoin (BIPs)](https://github.com/bitcoin/bips), que a su vez se basa en el proceso de [Propuestas de Mejora de Python (PEPs)](https://www.python.org/dev/peps/).

Los editores de EIP se encargan de revisar las EIP para verificar su solidez técnica, así como su correcta ortografía, gramática y estilo de código. Martin Becze, Vitalik Buterin y Gavin Wood, entre otros, fueron los editores originales de EIP desde 2015 hasta finales de 2016.

Los editores de EIP actuales son:

- Alex Beregszaszi (@axic)
- Gavin John (@Pandapip1)
- Greg Colvin (@gcolvin)
- Matt Garnett (@lightclient)
- Sam Wilson (@SamWilsn)

Los editores de EIP retirados son:

- Casey Detrio (@cdetrio)
- Hudson Jameson (@Souptacular)
- Martin Becze (@wanderer)
- Micah Zoltu (@MicahZoltu)
- Nick Johnson (@arachnid)
- Nick Savers (@nicksavers)
- Vitalik Buterin (@vbuterin)

Si desea convertirse en editor de EIPs, por favor consulte [EIP-5069](https://eips.ethereum.org/EIPS/eip-5069).

Los editores EIP deciden cuándo una propuesta está ya madura para convertirse en una EIP, y ayudan a los autores de EIP a sacar adelante sus propuestas. [Ethereum Cat Herders](https://www.ethereumcatherders.com/) ayudan a organizar reuniones entre los editores de EIP y la comunidad (ver [EIPIP](https://github.com/ethereum-cat-herders/EIPIP)).

El proceso completo de estandarización junto con el diagrama se describe en [EIP-1](https://eips.ethereum.org/EIPS/eip-1)

## Aprenda más {#learn-more}

Si está interesado en leer más sobre las EIPs, visite el [sitio web de EIPs](https://eips.ethereum.org/) y [EIP-1](https://eips.ethereum.org/EIPS/eip-1). He aquí algunos enlaces útiles:

- [Una lista de todas las Propuestas de Mejora de Ethereum](https://eips.ethereum.org/all)
- [Una descripción de todos los tipos de EIP](https://eips.ethereum.org/EIPS/eip-1#eip-types)
- [Una descripción de todos los estados de las EIP](https://eips.ethereum.org/EIPS/eip-1#eip-process)

### Proyectos educativos de la comunidad {#community-projects}

- [PEEPanEIP](https://www.youtube.com/playlist?list=PL4cwHXAawZxqu0PKKyMzG_3BJV_xZTi1F) — _PEEPanEIP es una serie educativa de videos que discute las Propuestas de Mejora de Ethereum (EIPs) y las características clave de las próximas actualizaciones._
- [EIPs.wtf](https://www.eips.wtf/) — _EIPs.wtf proporciona información adicional sobre las Propuestas de Mejora de Ethereum (EIPs), incluyendo su estado, detalles de implementación, pull requests relacionadas y comentarios de la comunidad._
- [EIP.Fun](https://eipfun.substack.com/) — _EIP.Fun ofrece las últimas noticias sobre las Propuestas de Mejora de Ethereum (EIPs), actualizaciones sobre reuniones de EIP y más._
- [EIPs Insight](https://eipsinsight.com/) — _EIPs Insight es una representación del estado del proceso y estadísticas de las Propuestas de Mejora de Ethereum (EIPs) según la información recopilada de diferentes recursos._

## Participar {#participate}

Cualquiera puede crear un EIP. Antes de enviar una propuesta, se debe leer [EIP-1](https://eips.ethereum.org/EIPS/eip-1), que describe el proceso EIP y cómo redactar un EIP, y solicitar comentarios en [Ethereum Magicians](https://ethereum-magicians.org/), donde las propuestas se discuten primero con la comunidad antes de que se envíe un borrador.

## Referencias {#references}

<cite class="citation">

Contenido de la página proporcionado en parte por [Ethereum Protocol Development Governance and Network Upgrade Coordination](https://hudsonjameson.com/posts/2020-03-23-ethereum-protocol-development-governance-and-network-upgrade-coordination/) por Hudson Jameson

</cite>
