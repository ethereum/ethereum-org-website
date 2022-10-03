---
title: Propuestas de mejora de Ethereum (EIP)
description: La información básica necesaria para entender las propuestas de mejora de Ethereum (EIP, por sus siglas en inglés).
lang: es
---

# Introducción a las propuestas de mejora de Ethereum (EIP) {#introduction-to-ethereum-improvement-proposals-eips}

## ¿Qué son las EIP? {#what-are-eips}

[Las propuestas de mejora de Ethereum (EIP, por sus siglas en inglés)](https://eips.ethereum.org/) son estándares que especifican nuevas características o procesos potenciales para Ethereum. Las EIP contienen especificaciones técnicas para los cambios propuestos y actúan como «fuente fidedigna» para la comunidad. Las actualizaciones de la red y los estándares de aplicación para Ethereum se debaten y desarrollan a través del proceso de las EIP.

Cualquier persona dentro de la comunidad Ethereum tiene la capacidad de crear una EIP. Las pautas para escribir EIP se incluyen en [EIP 1](https://eips.ethereum.org/EIPS/eip-1). La EIP deberá proporcionar una especificación técnica concisa de la característica que propone. El autor de la EIP es responsable de crear consenso dentro de la comunidad y de documentar opiniones discrepantes. Dada la alta exigencia técnica para enviar una EIP bien formada, históricamente, la mayoría de los autores de EIP han sido desarrolladores de aplicaciones o protocolos.

## ¿Por qué importan las EIP? {#why-do-eips-matter}

Las EIP desempeñan un papel importante en la forma en que ocurren los cambios y se documentan en Ethereum. Son la forma de que la gente proponga, debata y adopte cambios. Existen diferentes [tipos de EIP](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-1.md#eip-types), incluidas las EIP centrales para cambios de protocolo de bajo nivel que afectan el consenso y requieren una actualización de la red, así como ERC para los estándares de aplicación. Por ejemplo, estándares para crear tókenes, como [ERC20](https://eips.ethereum.org/EIPS/eip-20) o [ERC721](https://eips.ethereum.org/EIPS/eip-721) permiten que las aplicaciones que interactúan con estos tókenes traten todos los traten a todos usando las mismas reglas, lo que facilita la creación de aplicaciones interoperables.

Cada actualización de red consta de un conjunto de EIP que debe implementar cada [cliente de Ethereum](/learn/#clients-and-nodes) en la red. Esto implica que para mantener el consenso con otros clientes en la red principal de Ethereum, los desarrolladores de clientes deben asegurarse de que todos hayan implementado las EIP necesarias.

Además de proporcionar una especificación técnica para los cambios, las EIP son la unidad alrededor de la cual ocurre la gobernanza en Ethereum: cualquiera es libre de proponer una y, a continuación, varias partes interesadas en la comunidad debatirán para determinar si debe adoptarse como estándar o incluirse en una actualización de la red. Debido a que las EIP no son esenciales, no tienen que adoptarlas todas las aplicaciones (por ejemplo, puede crear un token que no sea [ERC20](https://eips.ethereum.org/EIPS/eip-20)). Sin embargo, las EIP esenciales deben adoptarse ampliamente (ya que todos los nodos deben actualizarse para permanecer como parte de la misma red). Las EIP esenciales requieren un consenso más amplio dentro de la comunidad que las EIP no esenciales.

## Historia de las EIP {#history-of-eips}

El [repositorio de GitHub de propuestas de mejora de Ethereum (EIP)](https://github.com/ethereum/EIPs) se creó en octubre de 2015. El proceso de EIP se basa en el proceso de [propuestas de mejora de Bitcoin (BIP)](https://github.com/bitcoin/bips), que a su vez se basa en el [proceso de propuestas de mejora de Python (PEP)](https://www.python.org/dev/peps/).

Los editores de EIP se encargan de revisar las EIP para verificar su solidez técnica, así como su correcta ortografía/gramática y estilo de código. Martin Becze, Vitalik Buterin y Gavin Wood, entre otros, fueron los editores originales de EIP desde 2015 hasta finales de 2016. Los editores EIP actuales son:

- Alex Beregszaszi (EWASM/Ethereum Foundation)
- Greg Colvin (Comunidad)
- Casey Detrio (EWASM/Ethereum Foundation)
- Matt Garnett (Quilt)
- Hudson James (Ethereum Foundation)
- Nick Johnson (ENS)
- Nick Savers (Comunidad)
- Micah Zoltu (Comunidad)

Los editores de EIP junto con los miembros de la comunidad de [Ethereum Cat Herders](https://ethereumcatherders.com/) y [Ethererum Magicians](https://ethereum-magicians.org/) decidirán qué EIP se implementará. Además, son los responsables de la facilitación de EIP, así como de pasar las EIP a la etapa «Final» o «Retirada».

El proceso de normalización completo junto con el gráfico correspondiente se describe en [EIP-1](https://eips.ethereum.org/EIPS/eip-1)

## Más información {#learn-more}

Si le interesa saber más sobre las EIP, consulte el [sitio web de EIP](https://eips.ethereum.org/), donde puede encontrar información adicional, que incluye:

- [Los diferentes tipos de EIP.](https://eips.ethereum.org/)
- [Una lista de cada EIP que se ha creado.](https://eips.ethereum.org/all)
- [Estados de las EIP y lo que significan](https://eips.ethereum.org/)

## Participar {#participate}

Cualquiera puede crear EIP o ERC, aunque antes debería leer [EIP-1](https://eips.ethereum.org/EIPS/eip-1), que describe el proceso EIP, lo que es una EIP, los tipos de EIP, lo que debe contener el documento EIP, el formato y plantilla EIP, la lista de editores de EIP y todo lo que necesita saber sobre EIP antes de crear una. Su nueva EIP debe definir una nueva característica que no necesariamente tiene que ser compleja, pero que puedan utilizarla los proyectos en el ecosistema Ethereum. La parte más difícil es la el feedback, ya que usted, como el autor, tien que permitir a la gente que interactúe con su EPI, recibir feedback, escribir artículos que describan los problemas que su EIP resuelva y colaborar con proyectos para implementar su EIP.

Si le interesa seguir o compartir su opinión sobre las EIP, consulte el [foro de magos de Ethereum](https://ethereum-magicians.org/), en el que se debate sobre las EIP con la comunidad.

Además, eche un vistazo a:

- [Cómo crear una EIP](https://eips.ethereum.org/EIPS/eip-1)

## Referencias {#references}

<cite class="citation">

Contenido de la página proporcionado en parte por [Ethereum Protocol Development Governance and Network Upgrade Coordination](https://hudsonjameson.com/2020-03-23-ethereum-protocol-development-governance-and-network-upgrade-coordination/) por Hudson Jameson

</cite>
