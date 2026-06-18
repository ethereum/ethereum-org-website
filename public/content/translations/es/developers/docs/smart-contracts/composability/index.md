---
title: Composabilidad de los contratos inteligentes
description: Aprenda cómo los contratos inteligentes se pueden combinar como bloques de Lego para construir aplicaciones descentralizadas (dapps) complejas reutilizando componentes existentes.
lang: es
incomplete: true
---

## Una breve introducción {#a-brief-introduction}

Los contratos inteligentes son públicos en Ethereum y pueden considerarse como API abiertas. No necesita escribir su propio contrato inteligente para convertirse en desarrollador de aplicaciones descentralizadas (dapps), solo necesita saber cómo interactuar con ellos. Por ejemplo, puede usar los contratos inteligentes existentes de [Uniswap](https://uniswap.exchange/swap), un intercambio descentralizado, para manejar toda la lógica de intercambio de tokens en su aplicación; no necesita empezar desde cero. Eche un vistazo a algunos de sus contratos [v2](https://github.com/Uniswap/uniswap-v2-core/tree/master/contracts) y [v3](https://github.com/Uniswap/uniswap-v3-core/tree/main/contracts).

## ¿Qué es la composabilidad? {#what-is-composability}

La composabilidad es la combinación de distintos componentes para crear nuevos sistemas o resultados. En el desarrollo de software, la composabilidad significa que los desarrolladores pueden reutilizar componentes de software existentes para construir nuevas aplicaciones. Una buena forma de entender la composabilidad es pensar en los elementos componibles como bloques de Lego. Cada Lego se puede combinar con otro, lo que le permite construir estructuras complejas combinando diferentes Legos.

En Ethereum, cada contrato inteligente es una especie de Lego: puede usar contratos inteligentes de otros proyectos como bloques de construcción para su proyecto. Esto significa que no tiene que perder tiempo reinventando la rueda o construyendo desde cero.

## ¿Cómo funciona la composabilidad? {#how-does-composability-work}

Los contratos inteligentes de Ethereum son como API públicas, por lo que cualquiera puede interactuar con el contrato o integrarlos en aplicaciones descentralizadas (dapps) para obtener mayor funcionalidad. La composabilidad de los contratos inteligentes generalmente funciona a partir de tres principios: modularidad, autonomía y capacidad de descubrimiento:

**1. Modularidad**: Esta es la capacidad de los componentes individuales para realizar una tarea específica. En Ethereum, cada contrato inteligente tiene un caso de uso específico (como se muestra en el ejemplo de Uniswap).

**2. Autonomía**: Los componentes componibles deben poder operar de forma independiente. Cada contrato inteligente en Ethereum se autoejecuta y puede funcionar sin depender de otras partes del sistema.

**3. Capacidad de descubrimiento**: Los desarrolladores no pueden llamar a contratos externos ni integrar bibliotecas de software en aplicaciones si los primeros no están disponibles públicamente. Por diseño, los contratos inteligentes son de código abierto; cualquiera puede llamar a un contrato inteligente o hacer una bifurcación de una base de código.

## Beneficios de la composabilidad {#benefits-of-composability}

### Ciclo de desarrollo más corto {#shorter-development-cycle}

La composabilidad reduce el trabajo que los desarrolladores tienen que hacer al crear [aplicaciones descentralizadas (dapps)](/apps/#what-are-dapps). [Como dice Naval Ravikant:](https://twitter.com/naval/status/1444366754650656770) "El código abierto significa que cada problema tiene que resolverse una sola vez".

Si hay un contrato inteligente que resuelve un problema, otros desarrolladores pueden reutilizarlo, por lo que no tienen que resolver el mismo problema. De esta manera, los desarrolladores pueden tomar bibliotecas de software existentes y agregar funcionalidad adicional para crear nuevas dapps.

### Mayor innovación {#greater-innovation}

La composabilidad fomenta la innovación y la experimentación porque los desarrolladores son libres de reutilizar, modificar, duplicar o integrar código de fuente abierta para crear los resultados deseados. Como resultado, los equipos de desarrollo dedican menos tiempo a la funcionalidad básica y pueden asignar más tiempo a experimentar con nuevas características.

### Mejor experiencia de usuario {#better-user-experience}

La interoperabilidad entre los componentes del ecosistema de Ethereum mejora la experiencia del usuario. Los usuarios pueden acceder a una mayor funcionalidad cuando las dapps integran contratos inteligentes externos que en un ecosistema fragmentado donde las aplicaciones no pueden comunicarse.

Usaremos un ejemplo de comercio de arbitraje para ilustrar los beneficios de la interoperabilidad:

Si un token se cotiza más alto en `exchange A` que en `exchange B`, puede aprovechar la diferencia de precio para obtener ganancias. Sin embargo, solo puede hacerlo si tiene suficiente capital para financiar la transacción (es decir, comprar el token en `exchange B` y venderlo en `exchange A`).

En un escenario en el que no tiene fondos suficientes para cubrir la operación, un préstamo relámpago podría ser ideal. Los [préstamos relámpago](/defi/#flash-loans) son muy técnicos, pero la idea básica es que puede pedir prestados activos (sin colateral) y devolverlos dentro de _una_ transacción.

Volviendo a nuestro ejemplo inicial, un operador de arbitraje puede obtener un gran préstamo relámpago, comprar tokens en `exchange B`, venderlos en `exchange A`, devolver el capital + intereses y quedarse con las ganancias, dentro de la misma transacción. Esta lógica compleja requiere combinar llamadas a múltiples contratos, lo que no sería posible si los contratos inteligentes carecieran de interoperabilidad.

## Ejemplos de composabilidad en Ethereum {#composability-in-ethereum}

### Intercambios de tokens {#token-swaps}

Si crea una aplicación descentralizada (dapp) que requiere que las transacciones se paguen en ETH, puede permitir que los usuarios paguen en otros tokens ERC-20 integrando la lógica de intercambio de tokens. El código convertirá automáticamente el token del usuario a ETH antes de que el contrato ejecute la función llamada.

### Gobernanza {#governance}

Construir sistemas de gobernanza a medida para una [DAO](/dao/) puede ser costoso y llevar mucho tiempo. En su lugar, podría usar un conjunto de herramientas de gobernanza de código abierto, como [Aragon Client](https://client.aragon.org/), para iniciar su DAO y crear rápidamente un marco de gobernanza.

### Gestión de identidad {#identity-management}

En lugar de construir un sistema de autenticación personalizado o depender de proveedores centralizados, puede integrar herramientas de identidad descentralizada (DID) para gestionar la autenticación de los usuarios. Un ejemplo es [SpruceID](https://www.spruceid.com/), un conjunto de herramientas de código abierto que ofrece una funcionalidad de "Iniciar sesión con Ethereum" que permite a los usuarios autenticar identidades con una billetera de Ethereum.

## Tutoriales relacionados {#related-tutorials}

- [Inicie el desarrollo del frontend de su dapp con create-eth-app](/developers/tutorials/kickstart-your-dapp-frontend-development-with-create-eth-app/) _– Una descripción general de cómo usar create-eth-app para crear aplicaciones con contratos inteligentes populares listos para usar._

## Lecturas adicionales {#further-reading}

_¿Conoce algún recurso de la comunidad que le haya ayudado? ¡Edite esta página y agréguelo!_

- [La composabilidad es innovación](https://a16zcrypto.com/posts/article/how-composability-unlocks-crypto-and-everything-else/)
- [Por qué la composabilidad es importante para Web3](https://hackernoon.com/why-composability-matters-for-web3)
- [¿Qué es la composabilidad?](https://blog.aragon.org/what-is-composability/#:~:text=Aragon,connect%20to%20every%20other%20piece.)