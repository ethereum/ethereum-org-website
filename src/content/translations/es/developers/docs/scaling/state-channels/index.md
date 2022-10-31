---
title: Canales de estado
description: Introducción a los canales de estado y a los canales de pago como solución de escalado actualmente utilizada por la comunidad de Ethereum.
lang: es
incomplete: true
sidebarDepth: 3
---

Los canales de estado permiten a los participantes realizar transacciones `x` número de veces fuera de la cadena mientras que solo se envían dos transacciones en cadena a la red de Ethereum. Esto permite una capacidad de procesamiento de las transacciones extremadamente alta.

## Pre requisitos {#prerequisites}

Debe tener una buena comprensión de todos los temas fundamentales y un alto nivel de comprensión del [escalado de Ethereum](/developers/docs/scaling/). Implementar soluciones de escalado como los canales es un tema avanzado, ya que la tecnología no se ha probado tanto y aún sigue investigándose y desarrollándose.

## Canales {#channels}

Los participantes deben bloquear una porción del estado de Ethereum, como un depósito de ETH, en un contrato multifirma. Un contrato multifirma es un tipo de contrato que requiere las firmas (y, por lo tanto, el acuerdo) de varias claves privadas para ejecutarse.

Bloquear el estado de esta manera es la primera transacción y abre el canal. A continuación, los participantes pueden realizar transacciones rápida y libremente fuera de la cadena. Cuando se termina la interacción, se envía una transacción final en cadena, lo que desbloquea el estado.

**Útil para**:

- montones de actualizaciones de estado
- cuando el número de participantes se conoce por adelantado
- si los participantes están siempre disponibles

Hay dos tipos de canales en este momento: los canales de estado y los de pago.

## Canales de estado {#state-channels}

El canal de estado tal vez se explique mejor con el ejemplo del juego de tres en línea:

1. Cree un contrato inteligente multifirma “Judge” (juez) en la cadena principal de Ethereum que entienda las reglas del juego "tres en línea" y pueda identificar a Alice y Bob como los dos jugadores en nuestro juego. Este contrato tiene el premio 1ETH.

2. A continuación, Alice y Bob comienzan a jugar el juego y abren así el canal de estado. Cada movimiento crea una transacción fuera de la cadena que contiene un “nonce”, lo que simplemente significa que siempre podremos saber a posteriori en qué orden se realizaron los movimientos.

3. Cuando hay un ganador, cierran el canal enviando el estado final (p. ej., una lista de transacciones) al contrato Judge y pagan solo una comisión de la transacción. El juez asegura que ambas partes firmen este "estado final" y espera un período de tiempo para asegurar que nadie pueda hacer un reclamo legítimamente sobre el resultado. Luego, paga el premio 1 ETH a Alice.

## Canales de pago {#payment-channels}

Canales de estado simplificados que solo se ocupan de los pagos (por ejemplo, transferencias de ETH). Permiten realizar transferencias fuera de la cadena entre dos participantes, siempre y cuando la suma neta de las transferencias no supere los tokens depositados.

## Ventajas y desventajas {#channels-pros-and-cons}

| Ventajas                                                                                      | Contras                                                                                                                                                      |
| --------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Retirada/liquidación instantáneas en la red principal (si ambas partes cooperan en un canal). | Tiempo y costo para configurar y establecer un canal; no es lo más recomendable para realizar transacciones ocasionales entre usuarios arbitrarios.          |
| Enorme capacidad de procesamiento.                                                            | Precisa la vigilancia periódica de la red (requisito de vivacidad) o delegar esta responsabilidad a otra persona para garantizar la seguridad de sus fondos. |
| El gasto por transacción es más bajo; es recomendable para realizar micropagos.               | Precisa el bloqueo de fondos en canales de pago abiertos.                                                                                                    |
|                                                                                               | No es compatible con la participación abierta.                                                                                                               |

## Uso de los canales de estado {#use-state-channels}

Múltiples proyectos proporcionan implementaciones de canales de estado que se pueden integrar en sus dApps:

- [Connext](https://connext.network/)
- [Kchannels](https://www.kchannels.io/)
- [Perun](https://perun.network/)
- [Raiden](https://raiden.network/)
- [Statechannels.org](https://statechannels.org/)

## Más información {#further-reading}

**Canales de estado**

- [EthHub: canales de estado](https://docs.ethhub.io/ethereum-roadmap/layer-2-scaling/state-channels/)
- [Explicación de las soluciones de escalado de capa 2 de Ethereum: canales de estado, Plasma y Truebit](https://medium.com/l4-media/making-sense-of-ethereums-layer-2-scaling-solutions-state-channels-plasma-and-truebit-22cb40dcc2f4) _– 12 de febrero de 2018, Josh Stark_
- [Explicación de los canales de estado](https://www.jeffcoleman.ca/state-channels/) _6 de noviembre de 2015, Jeff Coleman_
- [Aspectos básicos sobre los canales de estado](https://education.district0x.io/general-topics/understanding-ethereum/basics-state-channels/) _District0x_

**Canales de pago**

- [EthHub: canales de pago](https://docs.ethhub.io/ethereum-roadmap/layer-2-scaling/payment-channels/)

_¿Conoce algún recurso comunitario que lo haya ayudado? Edite esta página y añádalo._
