---
title: Rollups Optimistas
description: Introducción a los rollups optimistas
lang: es
---

## Pre requisitos {#prerequisites}

Debe tener una buena comprensión de todos los temas fundamentales y un alto nivel de comprensión del [escalado de Ethereum](/developers/docs/scaling/). La implementación de soluciones de escalado como los rollups es un tema avanzado, ya que la tecnología no está demasiado probada y sigue en investigación y desarrollo.

¿Busca un recurso para principiantes? Consulte nuestra [introducción a la capa 2](/layer-2/).

## Rollups optimistas {#optimistic-rollups}

Los rollups optimistas se encuentran en paralelo a la cadena principal de Ethereum en la capa 2. Pueden ofrecer mejoras de escalabilidad porque no realizan ningún cálculo por defecto. En cambio, después de una transacción, proponen el nuevo estado a la red principal o "notarizan" la transacción.

Con los rollups optimistas, las transacciones se escriben en la cadena principal de Ethereum como `calldata`, lo que ofrece mayor optimización, ya que se reduce el costo del gas.

Como el cálculo es la parte lenta y costosa del uso de Ethereum, los rollups optimistas pueden ofrecer mejoras de 10 a 100 veces en lo que respecta a la escalabilidad en función de la transacción. Este número incrementará aún más con la introducción de las [cadenas de fragmentos](/upgrades/sharding), ya que habrá más datos disponibles si se disputa una transacción.

### Disputar transacciones {#disputing-transactions}

Los rollups optimistas no computan la transacción, por lo que debe haber un mecanismo que garantice que las transacciones son legítimas y no fraudulentas. Aquí es donde entran en juego las pruebas de fraude. Si alguien nota la existencia de una transacción fraudulenta, el rollup realizará una prueba de fraude y ejecutará el cómputo de la transacción con ayuda de los datos de estado disponibles. Esto significa que puede haber tiempos de espera más largos para la confirmación de la transacción que con un rollup de ZK porque la trasacción podría recibir un reclamo.

![Diagrama que muestra lo que sucede cuando una transacción fraudulenta ocurre en un rollup optimista en Ethereum](./optimistic-rollups.png)

Incluso el gas que necesita para ejecutar el cálculo de la prueba de fraude se reembolsa. Ben Jones de Optimism describe el sistema de fianza:

"_cualquier persona que pueda realizar una acción que usted tendría que demostrar que es fraudulenta para asegurar sus fondos requiere que deposite una fianza. Básicamente, coge unos ETH, los boquea y dice: "Ok, me comprometo a decir la verdad…" Si no digo la verdad y se prueba el fraude, se recortará el dinero. No solo se recortará parte de este dinero, sino que parte de él se utilizará para pagar el gas que hayan consumido las personas al realizar la prueba de fraude_"

Para que pueda ver los incentivos: los participantes son penalizados por llevar a cabo el fraude y son reembolsados por demostrarlo.

### Ventajas y desventajas {#optimistic-pros-and-cons}

| Ventajas                                                                                                                                  | Contras                                                                                                |
| ----------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| Cualquier cosa que pueda hacer en la capa 1 de Ethereum se puede hacer con rollups optimistas, ya que son compatibles con EVM y Solidity. | Los tiempos de espera de las transacciones en cadena son largos debido a posibles reclamos por fraude. |
| Todos los datos de transacción se almacenan en la cadena de la capa 1, lo que significa que es seguro y descentralizado.                  | Un operador puede infliuenciar el orden de las transacciones.                                          |

### Explicación visual de los rollups optimistas {#optimistic-video}

Vea una explicación de Finematics de los rollups optimistas:

<YouTube id="7pWxCklcNsU" start="263" />

### Uso de rollups optimistas {#use-optimistic-rollups}

Existen múltiples implementaciones de rollups optimistas que puede integrar en sus dApps:

<RollupProductDevDoc rollupType="optimistic" />

**Lectura sobre rollups optimistas**

- [Todo lo que debes saber sobre Optimistic rollup](https://research.paradigm.xyz/rollups)
- [EthHub: rollups optimistas](https://docs.ethhub.io/ethereum-roadmap/layer-2-scaling/optimistic_rollups/)
- [Guía esencial sobre Arbitrum](https://newsletter.banklesshq.com/p/the-essential-guide-to-arbitrum)
- [¿Cómo funciona realmente el rollup de Optimism?](https://research.paradigm.xyz/optimism)
- [Análisis detallado de OVM](https://medium.com/ethereum-optimism/ovm-deep-dive-a300d1085f52)
