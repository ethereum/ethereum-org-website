---
title: Mejora de los contratos inteligentes
description: Descripción general de patrones de actualización para los contratos inteligentes en Ethereum
lang: es
---

Los contratos inteligentes en Ethereum son programas que se ejecutan solos y que funcionan en la máquina virtual de Ethereum (EVM). Estos programas están diseñados para ser inmutables, lo que impide cualquier actualización en la lógica empresarial una vez que el contrato fue implementado.

Si bien la inmutabilidad es necesaria para no requerir de confianza, la descentralización y la seguridad de los contratos inteligentes puede ser una desventaja en ciertos casos. Por ejemplo, el código inmutable puede hacer que sea imposible para los desarrolladores corregir contratos vulnerables.

Sin embargo, investigación más profunda en la mejora de los contratos inteligentes llevó a la introducción de diversos patrones de actualización. Estos patrones de actualización permiten a los desarrolladores actualizar los contratos inteligentes (manteniendo la inmutabilidad) colocando lógica empresarial en diferentes contratos.

## Requisitos previos {#prerequisites}

Debe contar con un buen entendimiento de los [contratos inteligentes](/developers/docs/smart-contracts/), la [anatomía de los contratos inteligentes](/developers/docs/smart-contracts/anatomy/) y la [Máquina virtual de Ethereum (EVM)](/developers/docs/evm/). Esta guía también asume que los lectores tengan conocimiento sobre programación de contratos inteligentes.

## ¿Qué es la actualización de un contrato inteligente? {#what-is-a-smart-contract-upgrade}

La actualización de un contrato inteligente implica cambiar la lógica empresarial de un contrato inteligente a la vez que se preserva el estado del contrato. Es importante aclarar que la capacidad de actualización y la mutabilidad no son lo mismo, especialmente en el contexto de contratos inteligentes.

Todavía no puede cambiar un programa implementado en una dirección en la red Ethereum. Pero puede cambiar el código que se ejecuta cuando los usuarios interactúan con un contrato inteligente.

Esto se puede llevar a cabo a través de los siguientes métodos:

1. Creando múltiples versiones de un contrato inteligente y migrando el estado (es decir, los datos) del contrato antiguo a una nueva instancia del contrato.

2. Creando contratos separados para almacenar la lógica empresarial y el estado.

3. Utilizando patrones de proxy para delegar llamadas de funciones de un contrato proxy inmutable a un contrato de lógica modificable.

4. Creando un contrato principal inmutable que se comunique con, y dependa de, contratos satélite flexibles para ejecutar funciones específicas.

5. Utilizando el patrón de diamante para delegar llamadas de funciones de un contrato proxy a contratos de lógica.

### Mecanismo de actualización 1: migración del contrato {#contract-migration}

La migración de contratos se basa en el uso de versiones, que consiste en crear y gestionar estados únicos del mismo software. La migración de un contrato implica implementar una nueva instancia de un contrato inteligente existente y la transferencia del almacenamiento y los saldos al nuevo contrato.

El nuevo contrato tendrá un almacenamiento vacío, lo que le permitirá recuperar los datos del contrato anterior y escribirlos en la nueva implementación. Luego va a tener que actualizar todos los contratos que interactuaron con el contrato antiguo para reflejar la nueva dirección.

El último paso en la migración de contratos es convencer a los usuarios para que cambien y usen el nuevo contrato. La nueva versión del contrato va a mantener los saldos y direcciones de los usuarios, lo cual preserva la inmutabilidad. Si se trata de un contrato basado en tokens, también tendrá que ponerse en contacto con los exchanges para que descarten el contrato anterior y comiencen a usar el nuevo contrato.

La migración de contratos es una medida relativamente sencilla y segura para actualizar contratos inteligentes sin interrumpir las interacciones de los usuarios. Sin embargo, la migración manual de almacenamiento y saldos de usuarios al nuevo contrato consume mucho tiempo y puede generar altos costes de gas.

[Más sobre la migración de contratos.](https://blog.trailofbits.com/2018/10/29/how-contract-migration-works/)

### Mecanismo de actualización 2: separación de datos {#data-separation}

Otro método para actualizar contratos inteligentes es separar la lógica empresarial y el almacenamiento de datos en contratos diferentes. Esto significa que los usuarios interactúan con el contrato de lógica, mientras que los datos se almacenan en el contrato de almacenamiento.

El contrato de lógica contiene el código que se ejecuta cuando los usuarios interactúan con la aplicación. También conserva la dirección del contrato de almacenamiento e interactúa con él para obtener y establecer datos.

Mientras tanto, el contrato de almacenamiento contiene el estado asociado con el contrato inteligente, como los saldos y direcciones de los usuarios. Tenga en cuenta que el contrato de almacenamiento es propiedad del contrato de lógica y está configurado con la dirección de este último en la implementación. Esto evita que contratos no autorizados llamen al contrato de almacenamiento o actualicen sus datos.

Por defecto, el contrato de almacenamiento es inmutable, pero se puede reemplazar el contrato de lógica al que apunta con una nueva implementación. Esto va a cambiar el código que se ejecuta en la EVM, manteniendo el almacenamiento y los saldos intactos.

Utilizar este método de actualización requiere actualizar la dirección del contrato de lógica en el contrato de almacenamiento. También hay que configurar el nuevo contrato de lógica con la dirección del contrato de almacenamiento por las razones explicadas anteriormente.

El patrón de separación de datos es posiblemente más fácil de implementar en comparación con la migración de contratos. Sin embargo, hay que gestionar varios contratos e implementar esquemas de autorización complejos para proteger los contratos inteligentes de actualizaciones maliciosas.

### Mecanismo de actualización 3: patrones de proxy {#proxy-patterns}

El patrón de proxy también utiliza la separación de datos para mantener la lógica empresarial y los datos en contratos diferentes. Sin embargo, en un patrón de proxy, el contrato de almacenamiento (llamado proxy) llama al contrato de lógica durante la ejecución del código. Esto es una inversión del método de separación de datos, donde el contrato de lógica llama al contrato de almacenamiento.

Esto es lo que sucede en un patrón de proxy:

1. Los usuarios interactúan con el contrato proxy, que almacena datos, pero que no contiene la lógica empresarial.

2. El contrato proxy almacena la dirección del contrato de lógica y delega todas las llamadas de funciones al contrato de lógica (que contiene la lógica empresarial) utilizando la función `delegatecall`.

3. Luego de que la llamada se reenvía al contrato de lógica, los datos devueltos por el contrato de lógica se recuperan y se devuelven al usuario.

El uso de los patrones de proxy requiere una comprensión de la función **delegatecall**. Básicamente, `delegatecall` es un opcode que permite que un contrato llame a otro contrato, mientras que la ejecución real del código se realiza en el contexto del contrato invocante. Una implicación del uso de `delegatecall` en patrones de proxy es que el contrato de proxy lee y escribe en su almacenamiento y ejecuta la lógica almacenada en el contrato de lógica como si llamara a una función interna.

De la [documentación de Solidity](https://docs.soliditylang.org/en/latest/introduction-to-smart-contracts.html#delegatecall-callcode-and-libraries):

> _Existe una variante especial de una llamada de mensaje, llamada **delegatecall**, que es idéntica a una llamada de mensaje, aparte del hecho de que el código en la dirección de destino se ejecuta en el contexto (es decir, en la dirección) del contrato de llamada y `msg.sender` y `msg.value` no cambian sus valores.__Esto significa que un contrato puede cargar dinámicamente código de una dirección diferente en tiempo de ejecución. El almacenamiento, la dirección actual y el saldo todavía se refieren al contrato de llamada, solo se toma el código de la dirección llamada._

El contrato de proxy sabe invocar `delegatecall` cada vez que un usuario llama a una función porque tiene una función `fallback` integrada. En la programación de Solidity, la [función fallback](https://docs.soliditylang.org/en/latest/contracts.html#fallback-function) se ejecuta cuando una llamada a una función no coincide con las funciones especificadas en un contrato.

Hacer que el patrón de proxy funcione requiere escribir una función fallback personalizada que especifique cómo el contrato de proxy debe manejar las llamadas de función que no admite. En este caso, la función fallback del proxy está programada para iniciar una delegatecall y redirigir la solicitud del usuario a la implementación del contrato de lógica actual.

El contrato de proxy es inmutable de forma predeterminada, pero se pueden crear nuevos contratos de lógica con lógica empresarial actualizada. Realizar la actualización es cuestión de cambiar la dirección del contrato de lógica al que se hace referencia en el contrato proxy.

Al apuntar el contrato de proxy a un nuevo contrato de lógica, el código que se ejecuta cuando los usuarios llaman a la función de contrato de proxy cambia. Esto nos permite actualizar la lógica de un contrato sin pedir a los usuarios que interactúen con un nuevo contrato.

Los patrones de proxy son un método popular para actualizar los contratos inteligentes porque eliminan las dificultades asociadas con la migración de contratos. No obstante, los patrones de proxy son más complicados de usar y pueden introducir defectos críticos, como [function selector clashes](https://medium.com/nomic-foundation-blog/malicious-backdoors-in-ethereum-proxies-62629adf3357), si se usan incorrectamente.

[Más información sobre los patrones de proxy](https://blog.openzeppelin.com/proxy-patterns/).

### Mecanismo de actualización 4: patrón de estrategia {#strategy-pattern}

Esta técnica está influenciada por el [patrón de estrategia](https://en.wikipedia.org/wiki/Strategy_pattern), que fomenta la creación de programas de software que interactúan con otros programas para implementar funciones específicas. Aplicar el patrón de estrategia al desarrollo de Ethereum significaría crear un contrato inteligente que llame a las funciones de otros contratos.

El contrato principal en este caso contiene la lógica empresarial central, pero interactúa con otros contratos inteligentes ("contratos satélite") para ejecutar ciertas funciones. Este contrato principal también almacena la dirección de cada contrato satélite y puede cambiar entre diferentes implementaciones del contrato satélite.

Puede crear un nuevo contrato satélite y configurar el contrato principal con la nueva dirección. Esto le permite cambiar _estrategias_ (es decir, implementar nueva lógica) para un contrato inteligente.

Aunque es similar al patrón de proxy explicado anteriormente, el patrón de estrategia es diferente porque el contrato principal, con el que interactúan los usuarios, mantiene la lógica empresarial. El uso de este patrón le brinda la oportunidad de introducir cambios limitados en un contrato inteligente sin afectar a la infraestructura central.

El principal inconveniente es que este patrón es principalmente útil para implementar actualizaciones menores. Además, si el contrato principal se ve comprometido (por ejemplo, a través de un hackeo), no podrá usar este método de actualización.

### Mecanismo de actualización 5: patrón de diamante {#diamond-pattern}

El patrón de diamante puede considerarse una mejora en el patrón de proxy. Los patrones de diamante difieren de los patrones de proxy porque el contrato de proxy de diamante puede delegar llamadas de función a más de un contrato de lógica.

Los contratos de lógica del patrón de diamante se conocen como _facets_. Para que el patrón de diamante funcione, se debe crear un mapeo en el contrato de proxy que mapee [selectores de funciones](https://docs.soliditylang.org/en/latest/abi-spec.html#function-selector) a diferentes direcciones de facets.

Cuando un usuario realiza una llamada a una función, el contrato de proxy comprueba el mapeo para encontrar el facet responsable de ejecutar esa función. Luego invoca `delegatecall` (usando la función fallback) y redirige la llamada al contrato de lógica apropiado.

El patrón de actualización de diamante tiene algunas ventajas sobre los patrones tradicionales de actualización de proxy:

1. Le permite actualizar una pequeña parte del contrato sin cambiar todo el código. El uso del patrón de proxy para las actualizaciones requiere la creación de un contrato de lógica completamente nuevo, incluso para actualizaciones menores.

2. Todos los contratos inteligentes (incluidos los contratos de lógica utilizados en los patrones de proxy) tienen un límite de tamaño de 24 Kb, lo que puede ser una limitación, especialmente para contratos complejos que requieren más funciones. El patrón de diamante facilita la solución de este problema dividiendo las funciones en múltiples contratos de lógica.

3. Los patrones de proxy adoptan un enfoque general para acceder a los controles. Una entidad con acceso a funciones de actualización puede cambiar el contrato _entero_. Pero el patrón de diamante permite un enfoque de permisos modular, en el que puede restringir a las entidades la actualización de ciertas funciones dentro de un contrato inteligente.

[Más información sobre el patrón de diamante](https://eip2535diamonds.substack.com/p/introduction-to-the-diamond-standard?s=w).

## Pros y contras de la actualización de los contratos inteligentes {#pros-and-cons-of-upgrading-smart-contracts}

| Ventajas                                                                                                                                                  | Desventajas                                                                                                                                                                            |
| --------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Una actualización de contrato inteligente puede facilitar la corrección de las vulnerabilidades descubiertas en la fase posterior a la implementación.    | La actualización de los contratos inteligentes es contraria a la idea de la inmutabilidad del código, lo que tiene implicaciones para la descentralización y la seguridad.             |
| Los desarrolladores pueden usar actualizaciones de lógica para añadir nuevas funciones a las aplicaciones descentralizadas.                               | Los usuarios deben confiar en que los desarrolladores no modifiquen los contratos inteligentes arbitrariamente.                                                                        |
| Las actualizaciones de los contratos inteligentes pueden mejorar la seguridad de los usuarios finales, ya que los errores se pueden corregir rápidamente. | La programación de la funcionalidad de actualización en contratos inteligentes añade mayor complejidad y aumenta la posibilidad de fallas críticas.                                    |
| Las actualizaciones de contratos dan a los desarrolladores más espacio para experimentar con diferentes funciones y mejorar las dapps con el tiempo.      | La oportunidad de actualizar los contratos inteligentes puede animar a los desarrolladores a lanzar proyectos más rápido sin hacer la debida diligencia durante la fase de desarrollo. |
|                                                                                                                                                           | El control de acceso inseguro o la centralización en los contratos inteligentes pueden facilitar que los actores maliciosos realicen actualizaciones no autorizadas.                   |

## Consideraciones para actualizar los contratos inteligentes {#considerations-for-upgrading-smart-contracts}

1. Utilice mecanismos seguros de control de acceso/autorización para evitar actualizaciones no autorizadas de contratos inteligentes, especialmente si se utilizan patrones de proxy, patrones de estrategia o separación de datos. Un ejemplo es restringir el acceso a la función de actualización, de modo que solo el propietario del contrato pueda invocarlo.

2. La actualización de contratos inteligentes es una actividad compleja y requiere un alto nivel de diligencia para evitar la introducción de vulnerabilidades.

3. Reduzca los supuestos de confianza descentralizando el proceso de implementación de actualizaciones. Posibles estrategias incluyen el uso de un [contrato de billetera multifirma](/developers/docs/smart-contracts/#multisig) para controlar las actualizaciones o requerir que los [miembros de la DAO](/dao/) voten sobre la aprobación de la actualización.

4. Tenga en cuenta los costos involucrados en la actualización de contratos. Por ejemplo, copiar el estado (por ejemplo, saldos de los usuarios) de un contrato antiguo a un nuevo contrato durante la migración de un contrato puede requerir más de una transacción, lo que significa más tarifas de gas.

5. Considere la posibilidad de implementar **timelocks** (o bloqueos de tiempo) para proteger a los usuarios. Un timelock se refiere a un retraso impuesto en los cambios en un sistema. Los timelocks se pueden combinar con un sistema de gobernanza multifirma para controlar las actualizaciones: si una acción propuesta alcanza el umbral de aprobación requerido, no se ejecuta hasta que transcurre el período de retraso predefinido.

Los timelocks dan a los usuarios algo de tiempo para salir del sistema si no están de acuerdo con un cambio propuesto (por ejemplo, una actualización de lógica o nuevos esquemas de tarifas). Sin timelocks, los usuarios deben confiar en que los desarrolladores no implementen cambios arbitrarios en un contrato inteligente sin previo aviso. La desventaja de los timelocks es que restringen la capacidad de parchear rápidamente las vulnerabilidades.

## Recursos {#resources}

**OpenZeppelin Upgrades Plugins: _Conjunto de herramientas para implementar y asegurar contratos inteligentes actualizables. _**

- [GitHub](https://github.com/OpenZeppelin/openzeppelin-upgrades)
- [Documentación](https://docs.openzeppelin.com/upgrades)

## Tutoriales {#tutorials}

- [Actualización de sus contratos inteligentes | Tutorial de YouTube](https://www.youtube.com/watch?v=bdXJmWajZRY) por Patrick Collins
- [Tutorial de migración de contratos inteligentes de Ethereum](https://medium.com/coinmonks/ethereum-smart-contract-migration-13f6f12539bd) por Austin Griffith
- [Uso del patrón de proxy UUPS para actualizar contratos inteligentes](https://blog.logrocket.com/author/praneshas/) por Pranesh A.S
- [Tutorial de Web3: Escribir un contrato inteligente actualizable (proxy) usando OpenZeppelin](https://dev.to/yakult/tutorial-write-upgradeable-smart-contract-proxy-contract-with-openzeppelin-1916) por fangjun.eth

## Más información {#further-reading}

- [El estado de las actualizaciones de contratos inteligentes](https://blog.openzeppelin.com/the-state-of-smart-contract-upgrades/) por Santiago Palladino
- [Múltiples formas de actualizar un contrato inteligente de Solidity](https://cryptomarketpool.com/multiple-ways-to-upgrade-a-solidity-smart-contract/): Blog Crypto Market Pool
- [Aprenda: Actualización de contratos inteligentes](https://docs.openzeppelin.com/learn/upgrading-smart-contracts): Documentos de OpenZeppelin
- [Patrones de proxy para la actualización de los contratos de Solidity: proxies transparentes vs. proxies UUPS](https://mirror.xyz/0xB38709B8198d147cc9Ff9C133838a044d78B064B/M7oTptQkBGXxox-tk9VJjL66E1V8BUF0GF79MMK4YG0) por Naveen Sahu
- [¿Cómo funcionan las actualizaciones de diamante?](https://dev.to/mudgen/how-diamond-upgrades-work-417j) por Nick Mudge
