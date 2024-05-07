---
title: Componibilidad de los contratos inteligentes
description:
lang: es
incomplete: true
---

## Breve introducción {#a-brief-introduction}

Los contratos inteligentes son públicos en Ethereum y se pueden considerar API abiertas. No necesitas escribir tu propio contrato inteligente para convertirte en un desarrollador de dapp, solo necesitas saber cómo interactuar con ellos. Por ejemplo, puedes utilizar los contratos inteligentes existentes de [Uniswap](https://uniswap.exchange/swap), un mercado descentralizado, para manejar toda la lógica del intercambio de tokens en tu aplicación; No necesitas empezar desde cero. Consulte algunos de sus contratos [v2](https://github.com/Uniswap/uniswap-v2-core/tree/master/contracts) y [v3](https://github.com/Uniswap/uniswap-v3-core/tree/main/contracts).

## ¿Qué es la componibilidad? {#what-is-composability}

La componibilidad es combinar distintos componentes para crear nuevos sistemas o resultados. En el desarrollo de software, la componibilidad significa que los desarrolladores pueden reutilizar componentes de software ya existentes para crear nuevas aplicaciones. Una buena manera de entender la componibilidad es pensar en elementos componibles como si fueran bloques de Lego. Cada Lego puede ser combinado con otro, permitiéndole construir estructuras complejas combinando diferentes Legos.

En Ethereum, todos los contratos inteligentes son una especie de Lego: puede usar contratos inteligentes de otros proyectos como bloques fundamentales para su proyecto. Esto significa que no tiene que invertir tiempo en reinventar la rueda o partir desde cero.

## ¿Cómo funciona la componibilidad? {#how-does-composability-work}

Los contratos inteligentes de Ethereum son como API públicas, por lo que cualquiera puede interactuar con el contrato inteligente o integrarlos en dapps para añadir nuevas funcionalidades. La componibilidad de los contratos inteligentes generalmente se basa en tres principios: modularidad, autonomía y capacidad de descubrimiento:

**1. Modularidad**: Es la capacidad de los componentes individuales para realizar una tarea específica. En Ethereum, cada contrato inteligente tiene un caso de uso específico (como se muestra en el ejemplo de Uniswap).

**2. Autonomía**: Los elementos componibles deben ser capaces de funcionar de forma independiente. Cada contrato inteligente en Ethereum es autoejecutable y puede funcionar sin depender de otras partes del sistema.

**3. Capacidad de descubrimiento**: Los desarrolladores no pueden invocar contratos externos o integrar bibliotecas de software en aplicaciones si los primeros no están disponibles públicamente. Por diseño, los contratos inteligentes son de código abierto; cualquiera puede invocar un contrato inteligente o realizar una bifurcación de la base de código.

## Beneficios de la componibilidad {#benefits-of-composability}

### Ciclo de desarrollo más corto {#shorter-development-cycle}

La componibilidad reduce el trabajo que los desarrolladores tienen que hacer al crear [dapps](/dapps/#what-are-dapps). [Como indica Naval Ravikant:](https://twitter.com/naval/status/1444366754650656770) "Código abierto significa que cada problema tiene que resolverse una vez."

Si hay un contrato inteligente que resuelve un problema, otros desarrolladores pueden reutilizarlo, por lo que no tienen que resolver el mismo problema. De esta manera, los desarrolladores pueden usar las bibliotecas de software ya existentes y añadir funcionalidad adicional para crear nuevas dapps.

### Mayor innovación {#greater-innovation}

La componibilidad fomenta la innovación y la experimentación porque los desarrolladores son libres de reutilizar, modificar, duplicar o integrar código de código abierto para crear los resultados deseados. Como resultado, los equipos de desarrollo dedican menos tiempo a funcionalidad básica y pueden dedicar más tiempo a experimentar con nuevas funciones.

### Mejor experiencia de usuario {#better-user-experience}

La interoperabilidad entre los componentes del ecosistema Ethereum mejora la experiencia de usuario. Los usuarios pueden disfrutar de una mayor funcionalidad cuando las dapps integran contratos inteligentes externos que en un ecosistema fragmentado donde las aplicaciones no puedan comunicarse.

Utilizaremos un ejemplo de trading de arbitraje para mostrar los beneficios de la interoperabilidad:

Si un token opera a un precio más alto en el `exchange A` que en el `exchange B`, entonces se puede aprovechar la diferencia de precio para obtener beneficios. Sin embargo, solo puede hacer esto si se tiene suficiente capital para financiar la transacción (comprar el token en el `exchange B` y venderlo en el `exchange A`).

En una situación donde no tiene suficientes fondos para cubrir la operación, un préstamo flash o instantáneo podría ser la mejor idea. Los [prestámos flash](/defi/#flash-loans) son algo muy técnico, pero la idea básica es que se puede pedir prestado activos (sin colateral) y devolver lo mismo en _una_ transacción.

Volviendo a nuestro ejemplo inicial, un trader de arbitraje puede tomar un préstamo flash grande, comprar tokens del `exchange B`, venderlos en el `exchange A`, devolver el capital + los intereses, y quedarse con la diferencia, dentro de la misma transacción. Esta compleja lógica requiere combinar llamadas a múltiples contratos, lo que no sería posible si los contratos inteligentes no pudieran ser interoperables.

## Ejemplos de componibilidad en Ethereum {#composability-in-ethereum}

### Intercambio de tókenes {#token-swaps}

Si crea un dapp que requiere que las transacciones se paguen en ETH, puede permitir que los usuarios paguen en otros tokens ERC-20 integrando la lógica de intercambio de tokens. El código convertirá automáticamente el token del usuario a ETH antes de que el contrato ejecute la función invocada.

### Gobernanza {#governance}

Crear sistemas de gobernanza a medida para una [DAO](/dao/) puede ser costoso y consumir mucho tiempo. En su lugar, se podría utilizar un kit de herramientas de gobernanza de código abierto, como Aragon Client, para arrancar la DAO y poder crear rápidamente un marco de gobernanza.

### Gestión de identidades {#identity-management}

En lugar de crear un sistema de autenticación personalizado o usar proveedores centralizados, puede integrar herramientas de identidad descentralizada (DID) para gestionar la autenticación de los usuarios. Un ejemplo es [SpruceID](https://www.spruceid.com/), un conjunto de herramientas de código abierto que ofrece la funcionalidad de "Iniciar sesión con Ethereum" que permite a los usuarios autenticar identidades con una billetera de Ethereum.

## Tutoriales relacionados {#related-tutorials}

- [Componibilidad de los contratos: bloques fundamentales para el desarrollo de contratos inteligentes de Ethereum](https://www.decentlabs.io/blog/contract-composability-the-building-blocks-of-ethereum-smart-contract-development)
- [Comience con el desarrollo del fontend de su DApp con create-eth-app:](/developers/tutorials/kickstart-your-dapp-frontend-development-with-create-eth-app/)_ un resumen sobre cómo usar create-eth-app para crear aplicaciones con contratos inteligentes populares previamente formulados. _

## Más información {#further-reading}

_¿Conoce algún recurso en la comunidad que le haya servido de ayuda? Edita esta página y añádelo._

- [Componibilidad es innovación](https://future.a16z.com/how-composability-unlocks-crypto-and-everything-else/)
- [Por qué la componibilidad es importante para la Web3](https://hackernoon.com/why-composability-matters-for-web3)
- [¿Qué es la componibilidad?](https://blog.aragon.org/what-is-composability/#:~:text=Aragon,connect%20to%20every%20other%20piece.)
