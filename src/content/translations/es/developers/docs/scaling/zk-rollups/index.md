---
title: Rollups de conocimiento cero
description: Introducción a los rollups de conocimiento cero
lang: es
---

## Pre requisitos {#prerequisites}

Debe tener una buena comprensión de todos los temas fundamentales y un alto nivel de comprensión del [escalado de Ethereum](/developers/docs/scaling/). La implementación de soluciones de escalado como los rollups es un tema avanzado, ya que la tecnología no está demasiado probada y sigue en investigación y desarrollo.

¿Busca un recurso para principiantes? Consulte nuestra [introducción a la capa 2](/layer-2/).

## Rollups de conocimiento cero {#zk-rollups}

Los **rollups de conocimiento cero (ZK)** agrupan cientos de transferencias fuera de la cadena y generan una prueba criptográfica. Estas pruebas pueden adoptar la forma de SNARK (argumentos sucintos no interactivos de conocimiento) o STARK (argumentos transparentes escalables de conocimiento). Los SNARK y STARK se conocen como pruebas de validez y se publican en la capa 1.

El contrato inteligente de rollups de ZK mantiene el estado de todas las transferencias en la capa 2, y este estado solo se puede actualizar con una prueba de validez. Esto significa que los rollups de ZK solo necesitan la prueba de validez en lugar de todos los datos de la transacción. Con un rollup de ZK, validar un bloque es más rápido y barato porque se incluyen menos datos.

Con un rollup de ZK, no hay retrasos al mover fondos de la capa 2 a la capa 1 porque una prueba de validez aceptada por el contrato de rollups de ZK ya ha verificado los fondos.

Al estar en la capa 2, los rollups de ZK se pueden optimizar para reducir aún más el tamaño de la transacción. Por ejemplo, una cuenta está representada mediante un índice en lugar de una dirección, lo que reduce una transacción de 32 bytes a únicamente 4 bytes. Las transacciones también se escriben en Ethereum como `calldata`, lo que reduce el gas necesario.

### Ventajas y desventajas {#zk-pros-and-cons}

| Ventajas                                                                                                                               | Contras                                                                                                           |
| -------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| Tiempo de finalidad más rápido, ya que el estado se verifica instantáneamente una vez que las pruebas se envían a la cadena principal. | Algunos no tienen soporte para EVM.                                                                               |
| No vulnerables a los ataques económicos a los que pueden ser vulnerables los [rollups optimistas](#optimistic-pros-and-cons).          | Las pruebas de validez son difíciles de computar, no vale la pena para aplicaciones con poca actividad en cadena. |
| Seguridad y descentralización, ya que los datos que se necesitan para recuperar el estado se almacenan en la cadena de capa 1.         | Un operador puede influenciar el ordenamiento de transacciones.                                                   |

### Explicación visual de los rollups de ZK {#zk-video}

Vea una explicación de Finematics de los rollups de ZK:

<YouTube id="7pWxCklcNsU" start="406" />

### Utilice rollups de ZK {#use-zk-rollups}

Existen múltiples implementaciones de rollups de ZK que puede integrar en tus dApps:

<RollupProductDevDoc rollupType="zk" />

**Lectura sobre rollups de ZK**

- [Qué son los rollups de conocimiento cero o zk-Rollups?](https://coinmarketcap.com/alexandria/glossary/zero-knowledge-rollups)
- [STARK vs. SNARK](https://consensys.net/blog/blockchain-explained/zero-knowledge-proofs-starks-vs-snarks/)
