---
title: Propuestas de mejora de Ethereum (EIP)
description: La información básica que necesita para entender las EIP
lang: es
---

# Introducción a las propuestas de mejora de Ethereum (EIP) {#introduction-to-ethereum-improvement-proposals}

## ¿Qué son las EIP? {#what-are-eips}

[Las propuestas de mejora de Ethereum (EIP, por sus siglas en inglés)](https://eips.ethereum.org/) son estándares que especifican nuevas características o procesos potenciales para Ethereum. Las EIP contienen especificaciones técnicas para los cambios propuestos y actúan como «fuente fidedigna» para la comunidad. Las actualizaciones de la red y los estándares de aplicación para Ethereum se debaten y desarrollan a través del proceso de las EIP.

Cualquier persona dentro de la comunidad Ethereum tiene la capacidad de crear una EIP. Las directrices para escribir EIP se incluyen en [EIP-1](https://eips.ethereum.org/EIPS/eip-1). Una EIP debe proporcionar principalmente una especificación técnica concisa con alguna motivación. El autor de EIP es responsable de llegar a un consenso dentro de la comunidad y documentar opiniones alternativas. Dada la gran barrera técnica existente para enviar una EIP correctamente formulada, históricamente la mayoría de los autores de EIP suelen ser desarrolladores de aplicaciones o protocolos.

## ¿Por qué importan las EIP? {#why-do-eips-matter}

Las EIP desempeñan un papel importante en la forma en que ocurren los cambios y se documentan en Ethereum. Son la forma de que la gente proponga, debata y adopte cambios. Existen [diferentes tipos de EIP](https://eips.ethereum.org/EIPS/eip-1#eip-types), incluidas las EIP centrales para cambios de protocolo de bajo nivel que afectan al consenso y requieren una actualización de la red, así como [EIP-1559](https://eips.ethereum.org/EIPS/eip-1559) y ERC para estándares de la aplicación como [EIP-20](https://eips.ethereum.org/EIPS/eip-20) y [EIP-721](https://eips.ethereum.org/EIPS/eip-721).

Cada actualización de red consta de un conjunto de EIP que debe implementar cada [cliente de Ethereum](/learn/#clients-and-nodes) en la red. Esto implica que para mantener el consenso con otros clientes en la red principal de Ethereum, los desarrolladores de clientes deben asegurarse de que todos hayan implementado las EIP necesarias.

Además de proporcionar una especificación técnica para los cambios, las EIP son la unidad alrededor de la cual ocurre la gobernanza en Ethereum: cualquiera es libre de proponer una y, a continuación, varias partes interesadas en la comunidad debatirán para determinar si debe adoptarse como estándar o incluirse en una actualización de la red. Debido a que no todas las aplicaciones tiene que adoptar las EIP no centralizadas (por ejemplo, es posible crear un token fungible que no implemente EIP-20), pero las EIP centrales sí que deben adoptarse ampliamente (ya que todos los nodos deben actualizarse para seguir formando parte de la misma red), las EIP centrales requieren un consenso más amplio dentro de la comunidad que las EIP no centrales.

## Historia de las EIP {#history-of-eips}

El [repositorio de Github de propuestas de mejora de Ethereum (EIP)](https://github.com/ethereum/EIPs) se creó en octubre de 2015. El proceso de EIP se basa en el proceso de [propuestas de mejora de Bitcoin (BIP)](https://github.com/bitcoin/bips), que a su vez se basa en el [proceso de propuestas de mejora de Python (PEP)](https://www.python.org/dev/peps/).

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

Si deseas convertirte en un editor de EIP, por favor revisa [EIP-5069](https://eips.ethereum.org/EIPS/eip-5069).

Los editores EIP deciden cuándo una propuesta está ya madura para convertirse en una EIP, y ayudan a los autores de EIP a sacar adelante sus propuestas. [Los Ethereum Cat Herders](https://www.ethereumcatherders.com/) ayudan a organizar reuniones entre los editores de EIP y la comunidad (ver [EIPIP](https://github.com/ethereum-cat-herders/EIPIP)).

El proceso de normalización completo junto con el gráfico correspondiente se describe en [EIP-1](https://eips.ethereum.org/EIPS/eip-1)

## Más información {#learn-more}

Si quiere profundizar más sobre las EIP, consulte el [sitio web de EIP](https://eips.ethereum.org/) y [EIP-1](https://eips.ethereum.org/EIPS/eip-1). He aquí algunos enlaces útiles:

- [Una lista de cada Propuesta de Mejora de Ethereum](https://eips.ethereum.org/all)
- [Una descripción de todos los tipos de EIP](https://eips.ethereum.org/EIPS/eip-1#eip-types)
- [Una descripción de todos los estados de EIP](https://eips.ethereum.org/EIPS/eip-1#eip-process)

### Proyectos de educación comunitaria {#community-projects}

- [PEEPanEIP](https://www.youtube.com/playlist?list=PL4cwHXAawZxqu0PKKyMzG_3BJV_xZTi1F): *PEEPanEIP es una serie de videos educativos que analiza propuestas de mejora de Ethereum (EIP) y las características clave de las próximas actualizaciones.*
- [EIPs For Nerds](https://ethereum2077.substack.com/t/eip-research): *EIPs For Nerds proporciona una visión general completa al estilo ELI5 de varias propuestas de mejora de Ethereum (EIP), incluidas EIP básicas y EIP de capa de aplicación/infraestructura (ERC), para educar a los lectores y dar forma al consenso en torno a los cambios propuestos al protocolo de Ethereum.*
- [EIPs.wtf](https://www.eips.wtf/): *EIPs.wtf proporciona información adicional para las Propuestas de Mejora de Ethereum (EIP), incluyendo su estado, detalles de implementación, solicitudes pull relacionadas y comentarios de la comunidad.*
- [EIP.Fun](https://eipfun.substack.com/): *EIP.Fun proporciona las últimas noticias sobre las propuestas de mejora de Ethereum (EIP), novedades sobre reuniones de EIP y más.*
- [EIPs Insight](https://eipsinsight.com/): *EIPs Insight brinda una representación de estado del proceso y estadísticas de las Propuestas de Mejora de Ethereum (EIP) según información recopilada de diferentes recursos.*

## Participar {#participate}

Cualquiera puede crear un EIP. Antes de enviar una propuesta, se debe leer [EIP-1](https://eips.ethereum.org/EIPS/eip-1) que describe el proceso de la EIP y cómo escribir una EIP y solicitar comentarios sobre [Ethereum Magicians](https://ethereum-magicians.org/), donde las propuestas se debaten primero dentro de la comunidad antes de enviar un borrador.

## Referencias {#references}

<cite class="citation">

Contenido de la página proporcionado en parte por [Ethereum Protocol Development Governance and Network Upgrade Coordination](https://hudsonjameson.com/2020-03-23-ethereum-protocol-development-governance-and-network-upgrade-coordination/) por Hudson Jameson

</cite>
