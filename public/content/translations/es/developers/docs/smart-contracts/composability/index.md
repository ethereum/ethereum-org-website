---
title: Componibilidad de los contratos inteligentes
description: Descubra cómo los contratos inteligentes pueden combinarse al igual que los bloques de Lego para construir DApps complejas reutilizando componentes existentes.
lang: es
incomplete: true
---

## Una breve introducción {#a-brief-introduction}

Los contratos inteligentes son públicos en Ethereum y se pueden considerar API abiertas. No necesitas escribir tu propio contrato inteligente para convertirte en un desarrollador de dapp, solo necesitas saber cómo interactuar con ellos. Por ejemplo, puede usar los contratos inteligentes existentes de [Uniswap](https://uniswap.exchange/swap), un intercambio descentralizado, para gestionar toda la lógica de intercambio de tokens en su aplicación; no necesita empezar desde cero. Consulte algunos de sus contratos [v2](https://github.com/Uniswap/uniswap-v2-core/tree/master/contracts) y [v3](https://github.com/Uniswap/uniswap-v3-core/tree/main/contracts).

## ¿Qué es la componibilidad? {#what-is-composability}

La componibilidad es combinar distintos componentes para crear nuevos sistemas o resultados. En el desarrollo de software, la componibilidad significa que los desarrolladores pueden reutilizar componentes de software ya existentes para crear nuevas aplicaciones. Una buena manera de entender la componibilidad es pensar en elementos componibles como si fueran bloques de Lego. Cada Lego puede ser combinado con otro, permitiéndole construir estructuras complejas combinando diferentes Legos.

En Ethereum, todos los contratos inteligentes son una especie de Lego: puede usar contratos inteligentes de otros proyectos como bloques fundamentales para su proyecto. Esto significa que no tiene que invertir tiempo en reinventar la rueda o partir desde cero.

## ¿Cómo funciona la componibilidad? {#how-does-composability-work}

Los contratos inteligentes de Ethereum son como API públicas, por lo que cualquiera puede interactuar con el contrato inteligente o integrarlos en dapps para añadir nuevas funcionalidades. La componibilidad de los contratos inteligentes generalmente se basa en tres principios: modularidad, autonomía y capacidad de descubrimiento:

**1. Modularidad**: Es la capacidad que tienen los componentes individuales para realizar una tarea específica. En Ethereum, cada contrato inteligente tiene un caso de uso específico (como se muestra en el ejemplo de Uniswap).

**2. Autonomía**: Los componentes componibles deben poder operar de forma independiente. Cada contrato inteligente en Ethereum es autoejecutable y puede funcionar sin depender de otras partes del sistema.

**3. Capacidad de descubrimiento**: Los desarrolladores no pueden llamar a contratos externos ni integrar bibliotecas de software en aplicaciones si estos no están disponibles públicamente. Por diseño, los contratos inteligentes son de código abierto; cualquiera puede invocar un contrato inteligente o realizar una bifurcación de la base de código.

## Beneficios de la componibilidad {#benefits-of-composability}

### Ciclo de desarrollo más corto {#shorter-development-cycle}

La componibilidad reduce el trabajo que los desarrolladores tienen que hacer al crear [dapps](/apps/#what-are-dapps). [Como dice Naval Ravikant:](https://twitter.com/naval/status/1444366754650656770) "El código abierto significa que cada problema tiene que resolverse una sola vez".

Si hay un contrato inteligente que resuelve un problema, otros desarrolladores pueden reutilizarlo, por lo que no tienen que resolver el mismo problema. De esta manera, los desarrolladores pueden usar las bibliotecas de software ya existentes y añadir funcionalidad adicional para crear nuevas dapps.

### Mayor innovación {#greater-innovation}

La componibilidad fomenta la innovación y la experimentación porque los desarrolladores son libres de reutilizar, modificar, duplicar o integrar código de código abierto para crear los resultados deseados. Como resultado, los equipos de desarrollo dedican menos tiempo a funcionalidad básica y pueden dedicar más tiempo a experimentar con nuevas funciones.

### Mejor experiencia de usuario {#better-user-experience}

La interoperabilidad entre los componentes del ecosistema Ethereum mejora la experiencia de usuario. Los usuarios pueden disfrutar de una mayor funcionalidad cuando las dapps integran contratos inteligentes externos que en un ecosistema fragmentado donde las aplicaciones no puedan comunicarse.

Utilizaremos un ejemplo de trading de arbitraje para mostrar los beneficios de la interoperabilidad:

Si un token se cotiza más alto en el `intercambio A` que en el `intercambio B`, puede aprovechar la diferencia de precio para obtener ganancias. Sin embargo, solo puede hacerlo si tiene suficiente capital para financiar la transacción (es decir, comprar el token del `intercambio B` y venderlo en el `intercambio A`).

En una situación donde no tiene suficientes fondos para cubrir la operación, un préstamo flash o instantáneo podría ser la mejor idea. [Los préstamos flash](/defi/#flash-loans) son muy técnicos, pero la idea básica es que se pueden tomar prestados activos (sin garantía) y devolverlos en _una_ sola transacción.

Volviendo a nuestro ejemplo inicial, un operador de arbitraje puede tomar un gran préstamo flash, comprar tokens en el `intercambio B`, venderlos en el `intercambio A`, devolver el capital + los intereses y quedarse con las ganancias, todo dentro de la misma transacción. Esta compleja lógica requiere combinar llamadas a múltiples contratos, lo que no sería posible si los contratos inteligentes no pudieran ser interoperables.

## Ejemplos de componibilidad en Ethereum {#composability-in-ethereum}

### Intercambios de tokens {#token-swaps}

Si crea un dapp que requiere que las transacciones se paguen en ETH, puede permitir que los usuarios paguen en otros tokens ERC-20 integrando la lógica de intercambio de tokens. El código convertirá automáticamente el token del usuario a ETH antes de que el contrato ejecute la función invocada.

### Gobernanza {#governance}

Crear sistemas de gobernanza a medida para una [DAO](/dao/) puede ser caro y llevar mucho tiempo. En su lugar, podría utilizar un kit de herramientas de gobernanza de código abierto, como [Aragon Client](https://client.aragon.org/), para arrancar su DAO y crear rápidamente un marco de gobernanza.

### Gestión de la identidad {#identity-management}

En lugar de crear un sistema de autenticación personalizado o usar proveedores centralizados, puede integrar herramientas de identidad descentralizada (DID) para gestionar la autenticación de los usuarios. Un ejemplo es [SpruceID](https://www.spruceid.com/), un kit de herramientas de código abierto que ofrece una funcionalidad de "Iniciar sesión con Ethereum" que permite a los usuarios autenticar identidades con una billetera de Ethereum.

## Tutoriales relacionados {#related-tutorials}

- [Arranque el desarrollo frontend de su dapp con create-eth-app](/developers/tutorials/kickstart-your-dapp-frontend-development-with-create-eth-app/) _– Una descripción general de cómo utilizar create-eth-app para crear aplicaciones con contratos inteligentes populares listos para usar._

## Lecturas adicionales {#further-reading}

_¿Conoce algún recurso de la comunidad que le haya sido de ayuda? ¡Edite esta página y agréguela!_

- [La componibilidad es innovación](https://a16zcrypto.com/posts/article/how-composability-unlocks-crypto-and-everything-else/)
- [Por qué la componibilidad es importante para la Web3](https://hackernoon.com/why-composability-matters-for-web3)
- [¿Qué es la componibilidad?](https://blog.aragon.org/what-is-composability/#:~:text=Aragon,connect%20to%20every%20other%20piece.)
