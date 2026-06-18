---
title: "Actualización de contratos inteligentes"
description: "Una descripción general de los patrones de actualización para los contratos inteligentes de Ethereum"
lang: es
---

Los contratos inteligentes en Ethereum son programas autoejecutables que se ejecutan en la Máquina Virtual de Ethereum (EVM). Estos programas son inmutables por diseño, lo que impide cualquier actualización de la lógica de negocio una vez que el contrato está desplegado.

Si bien la inmutabilidad es necesaria para la ausencia de necesidad de confianza, la descentralización y la seguridad de los contratos inteligentes, puede ser un inconveniente en ciertos casos. Por ejemplo, el código inmutable puede hacer que sea imposible para los desarrolladores arreglar contratos vulnerables.

Sin embargo, el aumento de la investigación para mejorar los contratos inteligentes ha llevado a la introducción de varios patrones de actualización. Estos patrones de actualización permiten a los desarrolladores actualizar los contratos inteligentes (preservando la inmutabilidad) al colocar la lógica de negocio en diferentes contratos.

## Requisitos previos {#prerequisites}

Debería tener una buena comprensión de los [contratos inteligentes](/developers/docs/smart-contracts/), la [anatomía de los contratos inteligentes](/developers/docs/smart-contracts/anatomy/) y la [Máquina Virtual de Ethereum (EVM)](/developers/docs/evm/). Esta guía también asume que los lectores tienen conocimientos sobre la programación de contratos inteligentes.

## ¿Qué es una actualización de un contrato inteligente? {#what-is-a-smart-contract-upgrade}

Una actualización de un contrato inteligente implica cambiar la lógica de negocio de un contrato inteligente mientras se preserva el estado del contrato. Es importante aclarar que la capacidad de actualización y la mutabilidad no son lo mismo, especialmente en el contexto de los contratos inteligentes.

Aún no puede cambiar un programa desplegado en una dirección en la red Ethereum. Pero puede cambiar el código que se ejecuta cuando los usuarios interactúan con un contrato inteligente.

Esto se puede hacer a través de los siguientes métodos:

1. Crear múltiples versiones de un contrato inteligente y migrar el estado (es decir, los datos) del contrato antiguo a una nueva instancia del contrato.

2. Crear contratos separados para almacenar la lógica de negocio y el estado.

3. Usar patrones proxy para delegar llamadas de función desde un contrato proxy inmutable a un contrato lógico modificable.

4. Crear un contrato principal inmutable que interactúe y dependa de contratos satélite flexibles para ejecutar funciones específicas.

5. Usar el patrón diamante para delegar llamadas de función desde un contrato proxy a contratos lógicos.

### Mecanismo de actualización n.º 1: Migración de contratos {#contract-migration}

La migración de contratos se basa en el control de versiones: la idea de crear y gestionar estados únicos del mismo software. La migración de contratos implica el despliegue de una nueva instancia de un contrato inteligente existente y la transferencia del almacenamiento y los saldos al nuevo contrato.

El contrato recién desplegado tendrá un almacenamiento vacío, lo que le permitirá recuperar datos del contrato antiguo y escribirlos en la nueva implementación. Después, necesitará actualizar todos los contratos que interactuaron con el contrato antiguo para reflejar la nueva dirección.

El último paso en la migración de contratos es convencer a los usuarios de que cambien al uso del nuevo contrato. La nueva versión del contrato retendrá los saldos y las direcciones de los usuarios, lo que preserva la inmutabilidad. Si es un contrato basado en tokens, también necesitará contactar a los intercambios para descartar el contrato antiguo y usar el nuevo contrato.

La migración de contratos es una medida relativamente sencilla y segura para actualizar contratos inteligentes sin interrumpir las interacciones de los usuarios. Sin embargo, migrar manualmente el almacenamiento y los saldos de los usuarios al nuevo contrato requiere mucho tiempo y puede incurrir en altos costos de gas.

[Más sobre la migración de contratos.](https://blog.trailofbits.com/2018/10/29/how-contract-migration-works/)

### Mecanismo de actualización n.º 2: Separación de datos {#data-separation}

Otro método para actualizar contratos inteligentes es separar la lógica de negocio y el almacenamiento de datos en contratos separados. Esto significa que los usuarios interactúan con el contrato lógico, mientras que los datos se almacenan en el contrato de almacenamiento.

El contrato lógico contiene el código que se ejecuta cuando los usuarios interactúan con la aplicación. También contiene la dirección del contrato de almacenamiento e interactúa con él para obtener y establecer datos.

Mientras tanto, el contrato de almacenamiento mantiene el estado asociado con el contrato inteligente, como los saldos y las direcciones de los usuarios. Tenga en cuenta que el contrato de almacenamiento es propiedad del contrato lógico y se configura con la dirección de este último en el momento del despliegue. Esto evita que contratos no autorizados llamen al contrato de almacenamiento o actualicen sus datos.

Por defecto, el contrato de almacenamiento es inmutable, pero puede reemplazar el contrato lógico al que apunta con una nueva implementación. Esto cambiará el código que se ejecuta en la EVM, mientras mantiene intactos el almacenamiento y los saldos.

El uso de este método de actualización requiere actualizar la dirección del contrato lógico en el contrato de almacenamiento. También debe configurar el nuevo contrato lógico con la dirección del contrato de almacenamiento por las razones explicadas anteriormente.

El patrón de separación de datos es posiblemente más fácil de implementar en comparación con la migración de contratos. Sin embargo, tendrá que gestionar múltiples contratos e implementar esquemas de autorización complejos para proteger los contratos inteligentes de actualizaciones maliciosas.

### Mecanismo de actualización n.º 3: Patrones proxy {#proxy-patterns}

El patrón proxy también utiliza la separación de datos para mantener la lógica de negocio y los datos en contratos separados. Sin embargo, en un patrón proxy, el contrato de almacenamiento (llamado proxy) llama al contrato lógico durante la ejecución del código. Esto es lo inverso al método de separación de datos, donde el contrato lógico llama al contrato de almacenamiento.

Esto es lo que sucede en un patrón proxy:

1. Los usuarios interactúan con el contrato proxy, que almacena datos, pero no contiene la lógica de negocio.

2. El contrato proxy almacena la dirección del contrato lógico y delega todas las llamadas de función al contrato lógico (que contiene la lógica de negocio) utilizando la función `delegatecall`.

3. Después de que la llamada se reenvía al contrato lógico, los datos devueltos por el contrato lógico se recuperan y se devuelven al usuario.

El uso de los patrones proxy requiere una comprensión de la función **delegatecall**. Básicamente, `delegatecall` es un código de operación que permite a un contrato llamar a otro contrato, mientras que la ejecución real del código ocurre en el contexto del contrato que llama. Una implicación del uso de `delegatecall` en los patrones proxy es que el contrato proxy lee y escribe en su almacenamiento y ejecuta la lógica almacenada en el contrato lógico como si llamara a una función interna.

De la [documentación de Solidity](https://docs.soliditylang.org/en/latest/introduction-to-smart-contracts.html#delegatecall-callcode-and-libraries):

> _Existe una variante especial de una llamada de mensaje, llamada **delegatecall**, que es idéntica a una llamada de mensaje, aparte del hecho de que el código en la dirección de destino se ejecuta en el contexto (es decir, en la dirección) del contrato que llama y `msg.sender` y `msg.value` no cambian sus valores._ _Esto significa que un contrato puede cargar dinámicamente código desde una dirección diferente en tiempo de ejecución. El almacenamiento, la dirección actual y el saldo aún se refieren al contrato que llama, solo el código se toma de la dirección llamada._

El contrato proxy sabe invocar `delegatecall` cada vez que un usuario llama a una función porque tiene una función `fallback` incorporada. En la programación de Solidity, la [función de respaldo](https://docs.soliditylang.org/en/latest/contracts.html#fallback-function) se ejecuta cuando una llamada de función no coincide con las funciones especificadas en un contrato.

Hacer que el patrón proxy funcione requiere escribir una función de respaldo personalizada que especifique cómo el contrato proxy debe manejar las llamadas de función que no admite. En este caso, la función de respaldo del proxy está programada para iniciar un delegatecall y redirigir la solicitud del usuario a la implementación actual del contrato lógico.

El contrato proxy es inmutable por defecto, pero se pueden crear nuevos contratos lógicos con lógica de negocio actualizada. Realizar la actualización es entonces cuestión de cambiar la dirección del contrato lógico referenciado en el contrato proxy.

Al apuntar el contrato proxy a un nuevo contrato lógico, el código que se ejecuta cuando los usuarios llaman a la función del contrato proxy cambia. Esto nos permite actualizar la lógica de un contrato sin pedir a los usuarios que interactúen con un nuevo contrato.

Los patrones proxy son un método popular para actualizar contratos inteligentes porque eliminan las dificultades asociadas con la migración de contratos. Sin embargo, los patrones proxy son más complicados de usar y pueden introducir fallas críticas, como [choques de selectores de funciones](https://medium.com/nomic-foundation-blog/malicious-backdoors-in-ethereum-proxies-62629adf3357), si se usan incorrectamente.

[Más sobre los patrones proxy](https://blog.openzeppelin.com/proxy-patterns/).

### Mecanismo de actualización n.º 4: Patrón de estrategia {#strategy-pattern}

Esta técnica está influenciada por el [patrón de estrategia](https://en.wikipedia.org/wiki/Strategy_pattern), que fomenta la creación de programas de software que interactúan con otros programas para implementar características específicas. Aplicar el patrón de estrategia al desarrollo de Ethereum significaría construir un contrato inteligente que llame a funciones de otros contratos.

El contrato principal en este caso contiene la lógica de negocio central, pero interactúa con otros contratos inteligentes ("contratos satélite") para ejecutar ciertas funciones. Este contrato principal también almacena la dirección de cada contrato satélite y puede cambiar entre diferentes implementaciones del contrato satélite.

Puede construir un nuevo contrato satélite y configurar el contrato principal con la nueva dirección. Esto le permite cambiar las _estrategias_ (es decir, implementar nueva lógica) para un contrato inteligente.

Aunque es similar al patrón proxy discutido anteriormente, el patrón de estrategia es diferente porque el contrato principal, con el que interactúan los usuarios, contiene la lógica de negocio. El uso de este patrón le brinda la oportunidad de introducir cambios limitados en un contrato inteligente sin afectar la infraestructura central.

El principal inconveniente es que este patrón es útil principalmente para implementar actualizaciones menores. Además, si el contrato principal se ve comprometido (por ejemplo, a través de un hackeo), no puede usar este método de actualización.

### Mecanismo de actualización n.º 5: Patrón diamante {#diamond-pattern}

El patrón diamante puede considerarse una mejora del patrón proxy. Los patrones diamante difieren de los patrones proxy porque el contrato proxy diamante puede delegar llamadas de función a más de un contrato lógico.

Los contratos lógicos en el patrón diamante se conocen como _facetas_. Para que el patrón diamante funcione, necesita crear un mapeo en el contrato proxy que asigne los [selectores de funciones](https://docs.soliditylang.org/en/latest/abi-spec.html#function-selector) a diferentes direcciones de facetas.

Cuando un usuario realiza una llamada de función, el contrato proxy verifica el mapeo para encontrar la faceta responsable de ejecutar esa función. Luego invoca `delegatecall` (usando la función de respaldo) y redirige la llamada al contrato lógico apropiado.

El patrón de actualización diamante tiene algunas ventajas sobre los patrones de actualización proxy tradicionales:

1. Le permite actualizar una pequeña parte del contrato sin cambiar todo el código. El uso del patrón proxy para las actualizaciones requiere crear un contrato lógico completamente nuevo, incluso para actualizaciones menores.

2. Todos los contratos inteligentes (incluidos los contratos lógicos utilizados en los patrones proxy) tienen un límite de tamaño de 24 KB, lo que puede ser una limitación, especialmente para contratos complejos que requieren más funciones. El patrón diamante facilita la solución de este problema al dividir las funciones en múltiples contratos lógicos.

3. Los patrones proxy adoptan un enfoque general para los controles de acceso. Una entidad con acceso a las funciones de actualización puede cambiar _todo_ el contrato. Pero el patrón diamante permite un enfoque de permisos modulares, donde puede restringir a las entidades la actualización de ciertas funciones dentro de un contrato inteligente.

[Más sobre el patrón diamante](https://eip2535diamonds.substack.com/p/introduction-to-the-diamond-standard?s=w).

## Ventajas y desventajas de la actualización de contratos inteligentes {#pros-and-cons-of-upgrading-smart-contracts}

| Ventajas                                                                                                                                                           | Desventajas                                                                                                                                                                                                                         |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Una actualización de un contrato inteligente puede facilitar la corrección de vulnerabilidades descubiertas en la fase posterior al despliegue.                    | La actualización de contratos inteligentes niega la idea de la inmutabilidad del código, lo que tiene implicaciones para la descentralización y la seguridad.                                                                       |
| Los desarrolladores pueden usar actualizaciones lógicas para agregar nuevas características a las aplicaciones descentralizadas.                                   | Los usuarios deben confiar en que los desarrolladores no modificarán los contratos inteligentes de manera arbitraria.                                                                                                               |
| Las actualizaciones de contratos inteligentes pueden mejorar la seguridad para los usuarios finales, ya que los errores se pueden corregir rápidamente.            | Programar la funcionalidad de actualización en los contratos inteligentes agrega otra capa de complejidad y aumenta la posibilidad de fallas críticas.                                                                              |
| Las actualizaciones de contratos dan a los desarrolladores más margen para experimentar con diferentes características y mejorar las aplicaciones descentralizadas (dapps) con el tiempo. | La oportunidad de actualizar los contratos inteligentes puede alentar a los desarrolladores a lanzar proyectos más rápido sin hacer la debida diligencia durante la fase de desarrollo.                             |
|                                                                                                                                                                    | El control de acceso inseguro o la centralización en los contratos inteligentes pueden facilitar que actores maliciosos realicen actualizaciones no autorizadas.                                                                    |

## Consideraciones para la actualización de contratos inteligentes {#considerations-for-upgrading-smart-contracts}

1. Utilice mecanismos seguros de control de acceso/autorización para evitar actualizaciones no autorizadas de contratos inteligentes, especialmente si utiliza patrones proxy, patrones de estrategia o separación de datos. Un ejemplo es restringir el acceso a la función de actualización, de modo que solo el propietario del contrato pueda llamarla.

2. La actualización de contratos inteligentes es una actividad compleja y requiere un alto nivel de diligencia para evitar la introducción de vulnerabilidades.

3. Reduzca los supuestos de confianza descentralizando el proceso de implementación de actualizaciones. Las posibles estrategias incluyen el uso de un [contrato de billetera multifirma](/developers/docs/smart-contracts/#multisig) para controlar las actualizaciones, o requerir que los [miembros de una DAO](/dao/) emitan su voto para aprobar la actualización.

4. Tenga en cuenta los costos involucrados en la actualización de contratos. Por ejemplo, copiar el estado (por ejemplo, los saldos de los usuarios) de un contrato antiguo a un contrato nuevo durante la migración de contratos puede requerir más de una transacción, lo que significa más tarifas de gas.

5. Considere implementar **bloqueos de tiempo (timelocks)** para proteger a los usuarios. Un bloqueo de tiempo se refiere a un retraso impuesto a los cambios en un sistema. Los bloqueos de tiempo se pueden combinar con un sistema de gobernanza multifirma para controlar las actualizaciones: si una acción propuesta alcanza el umbral de aprobación requerido, no se ejecuta hasta que transcurra el período de retraso predefinido.

Los bloqueos de tiempo dan a los usuarios algo de tiempo para salir del sistema si no están de acuerdo con un cambio propuesto (por ejemplo, una actualización lógica o nuevos esquemas de tarifas). Sin bloqueos de tiempo, los usuarios deben confiar en que los desarrolladores no implementarán cambios arbitrarios en un contrato inteligente sin previo aviso. El inconveniente aquí es que los bloqueos de tiempo restringen la capacidad de parchear vulnerabilidades rápidamente.

## Recursos {#resources}

**Plugins de actualizaciones de OpenZeppelin: _un conjunto de herramientas para desplegar y asegurar contratos inteligentes actualizables._**

- [GitHub](https://github.com/OpenZeppelin/openzeppelin-upgrades)
- [Documentación](https://docs.openzeppelin.com/upgrades)

## Tutoriales {#tutorials}

- [Actualización de sus contratos inteligentes | Tutorial de YouTube](https://www.youtube.com/watch?v=bdXJmWajZRY) por Patrick Collins
- [Tutorial de migración de contratos inteligentes de Ethereum](https://medium.com/coinmonks/ethereum-smart-contract-migration-13f6f12539bd) por Austin Griffith
- [Uso del patrón proxy UUPS para actualizar contratos inteligentes](https://blog.logrocket.com/author/praneshas/) por Pranesh A.S
- [Tutorial de Web3: Escribir un contrato inteligente actualizable (proxy) usando OpenZeppelin](https://dev.to/yakult/tutorial-write-upgradeable-smart-contract-proxy-contract-with-openzeppelin-1916) por fangjun.eth

## Lecturas adicionales {#further-reading}

- [El estado de las actualizaciones de contratos inteligentes](https://blog.openzeppelin.com/the-state-of-smart-contract-upgrades/) por Santiago Palladino
- [Múltiples formas de actualizar un contrato inteligente de Solidity](https://cryptomarketpool.com/multiple-ways-to-upgrade-a-solidity-smart-contract/) - Blog de Crypto Market Pool
- [Aprender: Actualización de contratos inteligentes](https://docs.openzeppelin.com/learn/upgrading-smart-contracts) - Documentación de OpenZeppelin
- [Patrones proxy para la capacidad de actualización de contratos de Solidity: Proxies transparentes vs UUPS](https://mirror.xyz/0xB38709B8198d147cc9Ff9C133838a044d78B064B/M7oTptQkBGXxox-tk9VJjL66E1V8BUF0GF79MMK4YG0) por Naveen Sahu
- [Cómo funcionan las actualizaciones diamante](https://dev.to/mudgen/how-diamond-upgrades-work-417j) por Nick Mudge