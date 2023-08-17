---
title: Validium
description: Introducción a Validium como solución de escalado utilizada actualmente por la comnunidad de Ethereum.
lang: es
incomplete: true
sidebarDepth: 3
---

Utiliza pruebas de validez como [rollups de ZK](/developers/docs/scaling/zk-rollups/), pero los datos no se almacenan en la cadena Ethereum de capa 1 principal. Esto puede llevar a 10.000 transacciones por segundo por cadena Validium y la ejecución en paralelo de varias cadenas.

## Pre requisitos {#prerequisites}

Debe tener una buena comprensión de todos los temas fundamentales y un alto nivel de comprensión del [escalado de Ethereum](/developers/docs/scaling/). Implementar soluciones de escalado como Validium es un tema avanzado, ya que la tecnología no se ha probado tanto y aún sigue investigándose y desarrollándose.

## Ventajas y desventajas {#pros-and-cons}

| Ventajas                                                                                                                                               | Contras                                                                                                                                                                                |
| ------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| No hay demora en la retirada (no hay latencia con respecto a los txs en cadena/entre varias cadenas), lo que conlleva una mayor eficiencia de capital. | Soporte limitado para contratos inteligentes/computación general; se necesitan lenguajes especializados.                                                                               |
| No es vulnerable a ciertos ataques económicos a los que se enfrentan los sistemas basados en prueba de fraude en aplicaciones de alto valor.           | Se requiere un alto poder computacional para generar pruebas de conocimiento cero (ZK); no es rentable para las aplicaciones de bajo rendimiento.                                      |
|                                                                                                                                                        | Tiempo de finalidad subjetivo más lento (de 10 a 30 minutos para generar una prueba de ZK) (pero más rápido para la finalidad completa porque no hay retraso en el tiempo de disputa). |
|                                                                                                                                                        | Generar una prueba requiere que los datos fuera de la cadena estén disponibles en todo momento.                                                                                        |

### Uso de Validium {#use-validium}

Múltiples proyectos proporcionan implementaciones de Validium que se pueden integrar en sus dApps:

- [Starkware](https://starkware.co/)
- [Matter Labs zkPorter](https://matter-labs.io/)

## Más lecturas {#further-reading}

- [Validium y la capa 2 (matriz 2 x 2), emisión número 99](https://www.buildblockchain.tech/newsletter/issues/no-99-validium-and-the-layer-2-two-by-two)

_¿Conoce algún recurso en la comunidad que le haya sido de ayuda? Edite esta página y añádalo._
