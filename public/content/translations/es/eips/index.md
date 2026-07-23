---
title: Introducción a las propuestas de mejora de Ethereum (EIP)
metaTitle: Propuestas de mejora de Ethereum (EIP)
description: La información básica que necesitas para entender las EIP
lang: es
---

## ¿Qué son las EIP? {#what-are-eips}

Las [propuestas de mejora de Ethereum (EIP)](https://eips.ethereum.org/) son estándares que especifican posibles nuevas características o procesos para Ethereum. Las EIP contienen especificaciones técnicas para los cambios propuestos y actúan como la "fuente de la verdad" para la comunidad. Las actualizaciones de la red y los estándares de aplicaciones para [Ethereum](/) se debaten y desarrollan a través del proceso de las EIP.

Cualquier persona dentro de la comunidad de Ethereum tiene la capacidad de crear una EIP. Las pautas para redactar las EIP se incluyen en la [EIP-1](https://eips.ethereum.org/EIPS/eip-1). Una EIP debe proporcionar principalmente una especificación técnica concisa con una breve motivación. El autor de la EIP es responsable de alcanzar el consenso dentro de la comunidad y documentar las opiniones alternativas. Dada la alta barrera técnica para enviar una EIP bien estructurada, históricamente, la mayoría de los autores de EIP suelen ser desarrolladores de aplicaciones o del protocolo.

## ¿Por qué son importantes las EIP? {#why-do-eips-matter}

Las EIP desempeñan un papel central en cómo se producen y documentan los cambios en Ethereum. Son la forma en que las personas proponen, debaten y adoptan cambios. Existen [diferentes tipos de EIP](https://eips.ethereum.org/EIPS/eip-1#eip-types), incluidas las EIP principales (core) para cambios de protocolo de bajo nivel que afectan al consenso y requieren una actualización de la red como la [EIP-1559](https://eips.ethereum.org/EIPS/eip-1559), y las ERC para estándares de aplicaciones como la [EIP-20](https://eips.ethereum.org/EIPS/eip-20) y la [EIP-721](https://eips.ethereum.org/EIPS/eip-721).

Cada actualización de la red consta de un conjunto de EIP que deben ser implementadas por cada [cliente de Ethereum](/learn/#clients-and-nodes) en la red. Esto significa que para mantenerse en consenso con otros clientes en la red principal de Ethereum, los desarrolladores de clientes deben asegurarse de haber implementado todas las EIP requeridas.

Además de proporcionar una especificación técnica para los cambios, las EIP son la unidad en torno a la cual se desarrolla la gobernanza en Ethereum: cualquiera es libre de proponer una, y luego varias partes interesadas de la comunidad debatirán para determinar si debe adoptarse como un estándar o incluirse en una actualización de la red. Debido a que las EIP no principales no tienen que ser adoptadas por todas las aplicaciones (por ejemplo, es posible crear un token fungible que no implemente la EIP-20), pero las EIP principales deben ser ampliamente adoptadas (porque todos los nodos deben actualizarse para seguir siendo parte de la misma red), las EIP principales requieren un consenso más amplio dentro de la comunidad que las EIP no principales.

## Historia de las EIP {#history-of-eips}

El [repositorio de GitHub de las propuestas de mejora de Ethereum (EIP)](https://github.com/ethereum/EIPs) se creó en octubre de 2015. El proceso de las EIP se basa en el proceso de las [propuestas de mejora de Bitcoin (BIP)](https://github.com/bitcoin/bips), que a su vez se basa en el proceso de las [propuestas de mejora de Python (PEP)](https://www.python.org/dev/peps/).

Los editores de las EIP tienen la tarea de revisar las EIP para comprobar su solidez técnica, problemas de formato y corregir la ortografía, la gramática y el estilo del código. Martin Becze, Vitalik Buterin, Gavin Wood y algunos otros fueron los editores originales de las EIP desde 2015 hasta finales de 2016.

Los editores actuales de las EIP son:

- Alex Beregszaszi (@axic)
- Gavin John (@Pandapip1)
- Greg Colvin (@gcolvin)
- Matt Garnett (@lightclient)
- Sam Wilson (@SamWilsn)

Los editores eméritos de las EIP son:

- Casey Detrio (@cdetrio)
- Hudson Jameson (@Souptacular)
- Martin Becze (@wanderer)
- Micah Zoltu (@MicahZoltu)
- Nick Johnson (@arachnid)
- Nick Savers (@nicksavers)
- Vitalik Buterin (@vbuterin)

Si deseas convertirte en editor de EIP, consulta la [EIP-5069](https://eips.ethereum.org/EIPS/eip-5069).

Los editores de las EIP deciden cuándo una propuesta está lista para convertirse en una EIP y ayudan a los autores de las EIP a hacer avanzar sus propuestas. [Ethereum Cat Herders](https://www.ethereumcatherders.com/) ayuda a organizar reuniones entre los editores de las EIP y la comunidad (consulta [EIPIP](https://github.com/ethereum-cat-herders/EIPIP)).

El proceso de estandarización completo junto con el diagrama se describe en la [EIP-1](https://eips.ethereum.org/EIPS/eip-1).

## Más información {#learn-more}

Si te interesa leer más sobre las EIP, echa un vistazo al [sitio web de las EIP](https://eips.ethereum.org/) y a la [EIP-1](https://eips.ethereum.org/EIPS/eip-1). Aquí tienes algunos enlaces útiles:

- [Una lista de todas las propuestas de mejora de Ethereum](https://eips.ethereum.org/all)
- [Una descripción de todos los tipos de EIP](https://eips.ethereum.org/EIPS/eip-1#eip-types)
- [Una descripción de todos los estados de las EIP](https://eips.ethereum.org/EIPS/eip-1#eip-process)

### Proyectos educativos de la comunidad {#community-projects}

- [PEEPanEIP](https://www.youtube.com/playlist?list=PL4cwHXAawZxqu0PKKyMzG_3BJV_xZTi1F) — *PEEPanEIP es una serie de videos educativos que analiza las propuestas de mejora de Ethereum (EIP) y las características clave de las próximas actualizaciones.*
- [EIPs.wtf](https://www.eips.wtf/) — *EIPs.wtf proporciona información adicional sobre las propuestas de mejora de Ethereum (EIP), incluido su estado, detalles de implementación, solicitudes de extracción (pull requests) relacionadas y comentarios de la comunidad.* 
- [EIP.Fun](https://eipfun.substack.com/) — *EIP.Fun ofrece las últimas noticias sobre las propuestas de mejora de Ethereum (EIP), actualizaciones sobre las reuniones de las EIP y mucho más.*
- [EIPs Insight](https://eipsinsight.com/) — *EIPs Insight es una representación del estado del proceso de las propuestas de mejora de Ethereum (EIP) y estadísticas según la información recopilada de diferentes recursos.*

## Participa {#participate}

Cualquiera puede crear una EIP. Antes de enviar una propuesta, se debe leer la [EIP-1](https://eips.ethereum.org/EIPS/eip-1), que describe el proceso de las EIP y cómo redactar una, y solicitar comentarios en [Ethereum Magicians](https://ethereum-magicians.org/), donde las propuestas se debaten primero con la comunidad antes de enviar un borrador.

## Referencias {#references}

<cite class="citation">

El contenido de la página ha sido proporcionado en parte por [Gobernanza del desarrollo del protocolo de Ethereum y coordinación de actualizaciones de la red](https://hudsonjameson.com/posts/2020-03-23-ethereum-protocol-development-governance-and-network-upgrade-coordination/) de Hudson Jameson.

</cite>