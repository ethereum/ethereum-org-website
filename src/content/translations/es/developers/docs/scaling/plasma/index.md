---
title: Cadenas de plasma
description: Introducción a las cadenas de plasma como solución de escalado actualmente utilizada por la comnunidad de Ethereum.
lang: es
incomplete: true
sidebarDepth: 3
---

Una cadena de plasma es una cadena de bloques separada que está anclada a la cadena principal de Ethereum y utiliza pruebas de fraude (como los [rollups optimistas](/developers/docs/scaling/optimistic-rollups/)) para arbitrar las disputas. Estas cadenas a veces se denominan cadenas secundarias o, por decir, hijas, ya que son esencialmente copias más pequeñas de la red principal de Ethereum. Los árboles de Merkle permiten la creación de una batería ilimitada de estas cadenas que pueden funcionar para descargar ancho de banda de las cadenas principales o madre (incluida la red principal). Derivan su seguridad a través de [pruebas de fraude](/glossary/#fraud-proof), y cada cadena hija tiene su propio mecanismo de validación de bloques.

## Pre requisitos {#prerequisites}

Debe tener una buena comprensión de todos los temas fundamentales y un alto nivel de comprensión del [escalado de Ethereum](/developers/docs/scaling/). Implementar soluciones de escalado como Plasma es un tema avanzado, ya que la tecnología no está demasiado probada y continua siendo investigada y desarrollada.

## Ventajas y desventajas {#pros-and-cons}

| Ventajas                                                                                                                                          | Contras                                                                                                                                                                                                            |
| ------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Alta capacidad de procesamiento, bajo costo por transacción.                                                                                      | No es compatible con el cómputo general. Solo se admiten transferencias básicas de tokens, swaps y algunos otros tipos de transacciones a través de la lógica de primer orden.                                     |
| Útil para transacciones entre usuarios arbitrarios (sin gastos generales por par de usuarios si ambos están establecidos en la cadena de plasma). | Precisa la vigilancia periódica de la red (requisito de vivacidad) o delegar esta responsabilidad a otra persona para garantizar la seguridad de sus fondos.                                                       |
|                                                                                                                                                   | Utiliza uno o más operadores para almacenar datos y mostrarlos bajo petición.                                                                                                                                      |
|                                                                                                                                                   | Los retiros se retrasan varios días para permitir reclamos (objeciones). En el caso de los activos fungibles, esto puede mitigarse mediante los proveedores de liquidez, pero existe un costo de capital asociado. |

### Usos de Plasma {#use-plasma}

Múltiples proyectos proveen implementaciones de Plasma que puede integrar en sus dApps:

- [Red OMG](https://omg.network/)
- [Polygon](https://polygon.technology/) (anteriormente, Red Matic)
- [Gluon](https://gluon.network/)
- [LeapDAO](https://ipfs.leapdao.org/)

## Más lecturas {#further-reading}

- [EthHub: Plasma](https://docs.ethhub.io/ethereum-roadmap/layer-2-scaling/plasma/)
- [Información sobre Plasma](https://www.learnplasma.org/en/)

_¿Conoce algún recurso en la comunidad que le haya sido de ayuda? Edite esta página y añádalo._
