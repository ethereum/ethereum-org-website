---
title: Gas y tarifas
description:
lang: es
sidebar: true
incomplete: true
---

El gas es esencial para la red de Ethereum. Se trata del combustible que le permite operar, de la misma manera que un vehículo necesita gasolina para funcionar.

## Requisitos previos {#prerequisites}

Para comprender mejor esta página, te recomendamos que en primer lugar leas sobre [las transacciones](/en/developers/docs/transactions/) y [la EVM](/en/developers/docs/evm/).

## ¿Qué es el gas? {#what-is-gas}

El gas hace referencia a la unidad que mide la cantidad de esfuerzo computacional requerida para ejecutar operaciones específicas en la red de Ethereum.

Como cada transacción de Ethereum requiere recursos computacionales para ejecutarse, cada transacción requiere una comisión. El gas hace referencia a la comisión necesaria para llevar a cabo una transacción en Ethereum con éxito.

![Un diagrama que muestra dónde se precisa el gas en las operaciones de la EVM.](./gas.png) _Diagrama adaptado de [Ethereum EVM ilustrado](https://takenobu-hs.github.io/downloads/ethereum_evm_illustrated.pdf)_

En esencia, las comisiones de gas son pagadas en la moneda nativa de Ethereum, es decir, el ether (ETH). Los precios del gas están indicados en Gwei, que es una denominación de ETH; cada Gwei equivale a 0,000000001 ETH (10<sup>-9</sup> ETH). Por ejemplo, en lugar de decir que el gas cuesta 0,000000001 Ether, puedes decir que cuesta 1 Gwei.

Este video proporciona una visión concisa de qué es el gas y por qué existe: <iframe width="100%" height="315" src="https://www.youtube.com/embed/AJvzNICwcwc" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen mark="crwd-mark"></iframe>

## ¿Por qué existen tarifas de gas? {#why-do-gas-fees-exist}

En resumen, las comisiones de gas ayudan a mantener la red de Ethereum segura. Al requerir una comisión para cada cálculo computacional ejecutado en la red, evitamos que algunas personas envíen spam a la red. Para prevenir la generación de hostiles bucles infinitos o accidentales, así como de otros desperdicios computacionales generados en el código, cada transacción debe establecer un límite del número de pasos computacionales de código que puede utilizar. La unidad fundamental del cálculo computacional es el "gas".

Aunque una transacción incluye un límite, el gas que no se utilice en la transacción se le devuelve al usuario.

![Diagrama que muestra la devolución del gas no utilizado.](../transactions/gas-tx.png) _Diagrama adaptado de [Ethereum EVM ilustrado](https://takenobu-hs.github.io/downloads/ethereum_evm_illustrated.pdf)_

## Seguir leyendo {#further-reading}

- [Comprensión del gas de Ethereum, los bloques y el mercado de comisiones](https://medium.com/@eric.conner/understanding-ethereum-gas-blocks-and-the-fee-market-d5e268bf0a0e)
- [Gas de Ethereum explicado](https://defiprime.com/gas)

## Herramientas relacionadas {#related-tools}

- [Estación de Gas ETH](https://ethgasstation.info/) _Mediciones orientadas al consumidor para el mercado de gas de Ethereum_.
- [Rastreador de gas de Etherscan](https://etherscan.io/gastracker)_: Estimador de la transacción del precio del gas_.
- [Análisis de gas Bloxy](https://stat.bloxy.info/superset/dashboard/gas/?standalone=true)_: Estadísticas de gas de la red de Ethereum_.

## Temas relacionados {#related-topics}

- [Minando](/en/developers/docs/consensus-mechanisms/pow/mining/)
