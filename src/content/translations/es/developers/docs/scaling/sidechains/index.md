---
title: Cadenas laterales
description: Introducción a las cadenas laterales como solución de escalado actualmente utilizada por la comunidad de Ethereum.
lang: es
incomplete: true
sidebarDepth: 3
---

Una cadena lateral es una cadena de bloques separada que funciona en paralelo a la red principal de Ethereum (mainnet) y opera independientemente. Tiene su propio [algoritmo de consenso](/developers/docs/consensus-mechanisms/) (por ejemplo, [prueba de autoridad](https://wikipedia.org/wiki/Proof_of_authority), [prueba de participación delegada](https://en.bitcoinwiki.org/wiki/DPoS), [tolerancia a fallas bizantinas](https://decrypt.co/resources/byzantine-fault-tolerance-what-is-it-explained)). La cadena lateral está conectada a la cadena principal por un puente bidireccional.

Lo que hace que una cadena lateral sea particularmente útil es que funciona igual que la cadena principal de Ethereum porque se basa en [la EVM](/developers/docs/evm/). No utiliza Ethereum, es Ethereum. Esto significa que si quiere usar su [dApp](/developers/docs/dapps/) en una cadena lateral, solo es cuestión de implementar su código en esta cadena. Se ve, se siente y funciona igual que la red principal; usted escribe contratos en Solidity e interactúa con la cadena a través de la API de Web3.

## Pre requisitos {#prerequisites}

Debe tener una buena comprensión de todos los temas básicos y un alto nivel de conocimiento del [escalado de Ethereum](/developers/docs/scaling/).

## Ventajas y desventajas {#pros-and-cons}

| Ventajas                                               | Contras                                                                                                            |
| ------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------ |
| Tecnología establecida.                                | Menor descentralización.                                                                                           |
| Soporta el cálculo general y es compatible con la EVM. | Utiliza un mecanismo de consenso separado. No está asegurado por la capa 1 (así que técnicamente no es la capa 2). |
|                                                        | Un quorum de validadores de cadenas laterales puede cometer fraude.                                                |

### Usos de las cadenas laterales {#use-sidechains}

Múltiples proyectos proporcionan implementaciones de cadenas laterales que puede integrar en sus dApps:

- [Polygon PoS](https://polygon.technology/solutions/polygon-pos)
- [Skale](https://skale.network/)
- [Cadena Gnosis (anteriormente xDai)](https://www.xdaichain.com/)

## Más lecturas {#further-reading}

- [EthHub en sidechains](https://docs.ethhub.io/ethereum-roadmap/layer-2-scaling/sidechains/)
- [Escalado de dApps de Ethereum por medio de cadenas laterales](https://medium.com/loom-network/dappchains-scaling-ethereum-dapps-through-sidechains-f99e51fff447) _8 de febrero de 2018, Georgios Konstantopoulos_

_¿Conoce algún recurso comunitario que le haya sido de ayuda? Edite esta página y añádalo._
