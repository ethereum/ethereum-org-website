---
title: Escalado de capa 2
description: Una introducción a las diferentes opciones de escalado, que desarrolla actualmente la comunidad de Ethereum.
lang: es
incomplete: true
sidebarDepth: 3
isOutdated: true
---

La capa 2 es un término colectivo de soluciones diseñadas para ayudar a escalar tu aplicación mediante el manejo de transacciones de la cadena principal de Ethereum (capa 1). La velocidad de transacción sufre cuando la red está ocupada, lo que puede hacer que la experiencia del usuario sea poco favorable para ciertos tipos de dapps. Además, en cuanto la red se activa más, los precios del gas aumentan a medida que los remitentes de las transacciones intentan superar sus apuestas. Esto puede encarecer mucho el uso de Ethereum.

## Requisitos previos {#prerequisites}

Es necesario que comprendas todos los temas fundamentales. La implementación de las soluciones de capa 2 se consideran avanzadas, ya que la tecnología se ha probado menos en la práctica.

## ¿Por qué es necesaria la capa 2? {#why-is-layer-2-needed}

- Algunos casos de uso, como juegos de la blockchain, no tienen sentido con los tiempos de transacción actuales.
- Usar aplicaciones de blockchain puede ser innecesariamente costoso.
- Cualquier actualización de la escalabilidad no debería ser a costa de la descentralización de la seguridad; la capa 2 se construye sobre Ethereum.

## Tipos de solución de capa 2 {#types}

- [Rollups](#rollups)
  - [ZK rollups](#zk-rollups)
  - [Optimistic rollups](#optimistic-rollups)
- [Canales de estado](#channels)
- [Plasma](#plasma)
- [Validium](#validium)
- [Sidechains](#sidechains)
- [Soluciones hídribas](#hybrid-solutions)

La mayoría de las soluciones de capa 2 se centran en un servidor o un clúster de servidores, cada una de los cuales puede hacer referencia a un nodo, validador, operador, secuenciador, creador de bloques o término similar. Según la implementación, estos nodos de la capa 2 pueden ser administrados mediante las empresas o las entidades que los utilizan, o bien a través de un tercero o un gran grupo de personas (similar a la red principal). En general, las transacciones se envían a estos nodos de la capa 2 en lugar de directamente a la capa 1 ([red principal](/glossary/#mainnet)); a continuación, la instancia de la capa 2 los junta en grupos antes de anclarlos a la capa 1; luego, se aseguran mediante la misma capa 1 y así no se pueden alterar. Los detalles de cómo se realiza esto varían significativamente entre las diferentes tecnologías e implementaciones de la capa 2.

Una instancia específica de la capa 2 puede ser abierta y compartida por varias aplicaciones, o bien puede ser implementada mediante una empresa y dedicarse a ofrecer soporte a su aplicación únicamente.

## Rollups {#rollups}

Las rollups son soluciones que agrupan transacciones de sidechain en una sola transacción y generan una prueba criptográfica que se denomina SNARK (siglas en inglés de "Succinct Non-interactive ARgument of Knowledge"). Únicamente esta prueba se envía a la cadena principal.

_Las sidechains (o cadenas laterales) son blockchains independientes y compatibles con Ethereum._

En otras palabras, los rollups implican que todos los estados y ejecuciones se manejan en las sidechains ( es decir, la verificación de firma, la ejecución de contrato, etc.). La cadena principal de Ethereum (capa 1) almacena únicamente datos de la transacción.

Las soluciones de tipo rollup requieren relayers (repetidores) que hayan apostado un bono en el contrato de rollup. Esto los incentivará a retransmitir los rollups con precisión.

**Es útil para:**

- reducir las tarifas para los usuarios
- fomentar la participación abierta
- alcanzar un rendimiento rápido de las transacciones

Hay dos tipos de rollups con diferentes modelos de seguridad:

- Cero conocimiento: Ejecuta el cálculo fuera de la cadena y envía una [**prueba de validez**](/glossary/#validity-proof) a la cadena.
- Optimista: Asume que las transacciones son válidas por defecto y sólo ejecuta el cálculo, a través de una [**prueba de fraude**](/glossary/#fraud-proof) en caso de que se produzca un desafío.

### Rollups de conocimiento cero {#zk-rollups}

Los rollups de conocimiento cero, también conocidos como ZK-Rollups, agrupan cientos de transferencias fuera de la cadena en una sola transacción realizada través de un contrato inteligente. A partir de los datos enviados, el contrato inteligente puede verificar todas las transferencias que están incluidas. Esto se conoce como una prueba de validez.

Con un ZK-Rollup, validar un bloque es más rápido y más barato porque se incluye menos datos. No necesitas todos los datos de la transacción para verificarla, sino únicamente la prueba.

La cadena lateral donde ocurren los ZK-Rollups se puede optimizar para reducir aún más el tamaño de las transacciones. Por ejemplo, una cuenta está representada mediante un índice en lugar de con una dirección, lo que reduce una transacción de 32 bytes a únicamente 4 bytes. Las transacciones también se escriben en Ethereum como datos de llamadas, lo que reduce el gas.

#### Ventajas y desventajas {#zk-pros-and-cons}

| Ventajas                                                                                                                        | Desventajas                                                                                                                                                                                                                                                                        |
| ------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| No hay demora ya que las pruebas ya se consideran válidas cuando se envían a la cadena principal.                               | Se limita a transferencias simples, no es compatible con la EVM.                                                                                                                                                                                                                   |
| Menos vulnerable a los ataques económicos a los que los [Optimistic Rollups](#optimistic-pros-and-cons) pueden ser vulnerables. | Las pruebas de validez son difíciles de computar, no vale la pena para aplicaciones con poca actividad en cadena.                                                                                                                                                                  |
|                                                                                                                                 | Duración de la [finalidad](/glossary/#finality) subjetiva más larga (se tarda de 10 a 30 minutos en generar una prueba de ZK) (pero la finalización completa es más rápida, ya que no hay retrasos en el tiempo de disputa como en los [Optimistic rollups](#optimistic-rollups)). |

#### Uso de ZK Rollups {#use-zk-rollups}

- [Loopring](https://loopring.org/#/)
- [Starkware](https://starkware.co/)
- [Matter Labs ZKsync](https://matter-labs.io/)
- [Aztec 2.0](https://aztec.network/)

### Optimistic Rollups {#optimistic-rollups}

Los Optimistic Rollups utilizan una cadena lateral que se establece en paralelo a la cadena principal de Ethereum. Pueden ofrecer mejoras en escalabilidad porque no realizan ningún cálculo por defecto. En cambio, tras realizar una transacción, proponen un estado a la red principal. O "validan" la transacción.

Con los Optimistic Rollups, las transacciones se escriben en la cadena principal de Ethereum como datos de llamada, optimizándolos todavía más y reduciendo el coste del gas.

Como el cálculo es la parte lenta y costosa del uso de Ethereum, los Optimistic Rollups pueden ofrecer resultados de 10 a 100 veces mejores en lo que respecta a la escalabilidad en función de la transacción. Este número aumentará aún más con la introducción de la mejora de Eth2: [Las cadenas de fragmentos](/roadmap/danksharding). Esto se debe a que habrá más datos disponibles en el caso de que una transacción sea disputada.

#### Disputar transacciones {#disputing-transactions}

En realidad, los Optimistic Rollups no calculan la transacción; por eso, es necesario que exista un mecanismo para garantizar que las transacciones sean legítimas y no fraudulentas. Aquí es donde entran las pruebas de fraude. Si alguien es consciente de la existencia de una transacción fraudulenta, el rollup realizará una prueba de fraude y ejecutará el cómputo de la transacción con ayuda de los datos del estado disponibles. Esto significa que el tiempo de espera para la confirmación de la transacción puede ser más largo que un ZK-rollup, ya que podría ser desafiado.

![Diagrama que muestra lo que sucede cuando una transacción fraudulenta ocurre en un Optimistic Rollup en Ethereum.](./optimistic-rollups.png)

Incluso el gas que necesita para ejecutar el cálculo de la prueba de fraude se reembolsa. Ben Jones del Optimism describe el sistema de unión en su lugar:

"_Cualquier persona que pueda realizar una acción que usted tendría que probar como fraudulenta para asegurar sus fondos, debe depositar un bono. Básicamente, coges unos ETH, los boqueas y dices: "oye, me comprometo a decir la verdad"... Si no digo la verdad y se proclama el fraude, este dinero será recortado. No solo se recorta parte de este dinero, sino que parte de él se utilizará para pagar el gas que hayan consumido las personas al realizar la prueba de fraude_"

Entonces se te reembolsa por haber demostrado el fraude.

#### Ventajas y desventajas {#optimistic-pros-and-cons}

| Ventajas                                                                                                                                    | Desventajas                                                                                                              |
| ------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| Cualquier cosa que se pueda hacer en la capa 1 de Ethereum se puede hacer con Optimistic Rollups, ya que su EVM y Solidity son compatibles. | Los tiempos de espera de las transacciones en cadena son largos debido a posibles desafíos por fraude.                   |
| Todos los datos de transacción se almacenan en la cadena de la capa 1, lo que significa que es seguro y descentralizado.                    | Es potencialmente vulnerable a ataques si el valor en un Optimistic Rollup excede la cantidad en el bono de un operador. |

#### Usar Optimistic Rollups {#use-optimistic-rollups}

- [Optimismo](https://optimism.io/)
- [Offchain Labs Arbitrum Rollup](https://offchainlabs.com/)
- [Red de combustible](https://fuel.sh/)

## Canales {#channels}

Los canales permiten a los participantes realizar transacciones `x` número de veces fuera de la cadena mientras solo se envían dos transacciones a la red en cadena. Esto permite disfrutar de un rendimiento de transacción extremadamente alto

**Es útil para**:

- muchas actualizaciones de estado
- si el número de participantes se conoce por adelantado
- si los participantes están siempre disponibles

Los participantes deben bloquear una porción del estado de Ethereum, como un depósito de ETH, en un contrato multifirma. Un contrato multifirma es un tipo de contrato que requiere las firmas (y, por lo tanto, el acuerdo) de varias claves privadas para ejecutarse.

Bloquear el estado de esta manera es la primera transacción y abre el canal. A continuación, los participantes pueden realizar transacciones rápida y libremente fuera de la cadena. Cuando se termina la interacción, se envía una transacción final en cadena, lo que desbloquea el estado.

### Canales de estado {#state-channels}

Canal de estado (tres en raya):

1. Crear un contrato inteligente multifirma “Judge” en la cadena principal de Ethereum, que entienda las reglas del tres en raya y puede identificar a Alice y Bob como los dos jugadores en nuestro juego. Este contrato es el titular del premio de 1ETH.

2. A continuación, Alice y Bob comienzan a jugar el juego y abren así el canal de estado. Cada movimiento crea una transacción fuera de la cadena, que contiene un “nonce”, lo que simplemente significa que siempre podemos decir a posteriori en qué orden se realizaron los movimientos.

3. Cuando hay un ganador, cierran el canal enviando el estado final (p. ej., una lista de transacciones) al contrato de Judge y pagan solo una cuota de transacción. El juez se asegura de que ambas partes firmen este "estado final", y espera un período de tiempo para asegurar que nadie pueda desafiar legítimamente el resultado. A continuación, paga el premio de 1 ETH a Alice.

Hay dos tipos de canales en este momento:

- Canales de estado, es decir, los que se han descrito anteriormente.
- Canales de pago, es decir, canales de estado simplificados que solo se ocupan de los pagos. Permiten realizar transferencias fuera de la cadena entre dos participantes, siempre y cuando la suma neta de sus transferencias no supere los tokens depositados.

#### Ventajas y desventajas {#channels-pros-and-cons}

| Ventajas                                                                               | Desventajas                                                                                                                                               |
| -------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Retirada/ajuste instantáneo en la red principal (si ambas partes cooperan en un canal) | Tiempo y coste para configurar y establecer un canal; no es lo más recomendable para realizar transacciones ocasionales entre usuarios arbitrarios.       |
| Permite disfrutar de rendimientos muy elevados.                                        | Precisa la vigilancia periódica de la red (requisito de viveza) o delegar esta responsabilidad a otra persona para garantizar la seguridad de sus fondos. |
| El gasto por transición es más bajo; es recomendable para realizar micropagos.         | Precisa el bloqueo de fondos en los canales de pago abiertos.                                                                                             |
|                                                                                        | No es compatible con la participación abierta.                                                                                                            |

#### Usos de los canales de estado {#use-state-channels}

- [Connext](https://connext.network/)
- [Raiden](https://raiden.network/)
- [Perun](https://perun.network/)
- [Statechannels.org](https://statechannels.org/)

## Plasma {#plasma}

Una cadena de plasma es una blockchain independiente que está anclada a la cadena principal de Ethereum y utiliza pruebas de fraude (como [Optimistic Rollups](#optimistic-rollups)) para procesar disputas.

| Ventajas                                                                                                                                                         | Desventajas                                                                                                                                                                                              |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Alto rendimiento, bajo costo por transacción.                                                                                                                    | No es compatible con el cálculo general. Solo es compatible con las transferencias básicas de tokens, swaps y algunos otros tipos de transacciones a través de la lógica predicha.                       |
| Es una buena opción para realizar transacciones entre usuarios arbitrarios (no se sobrecarga por par de usuarios si ambos se establecen en la cadena de plasma). | Precisarás vigilar periódicamente la red (requerimiento de vida) o delegar esta responsabilidad a otra persona para garantizar la seguridad de tus fondos.                                               |
|                                                                                                                                                                  | Depende de uno o más operadores para almacenar datos y servirlos bajo petición.                                                                                                                          |
|                                                                                                                                                                  | Los retiros se retrasan varios días para permitir desafíos. En el caso de los activos fungibles, esto puede ser mitigado mediante los proveedores de liquidez, pero existe un costo de capital asociado. |

### Usos de Plasma {#use-plasma}

- [Red OMG](https://omg.network/)
- [Red Matic](https://matic.network/)
- [Gluon](https://gluon.network/)
- [LeapDAO](https://ipfs.leapdao.org/)

## Validium {#validium}

Utiliza pruebas de validez como [ZK-Rollups](#zk-rollups), pero los datos no se almacenan en la cadena Ethereum de la capa 1 principal. Esto puede llevar a 10 000 transacciones por segundo y por cadena Validium, así como a la ejecución en paralelo de varias cadenas.

| Ventajas                                                                                                                               | Desventajas                                                                                                                                                                     |
| -------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| No hay demora en la retirada (no hay latencia con respecto a la cadena transversal); lo que conlleva una mayor eficiencia del capital. | Soporte limitado para contratos inteligentes/computación general; se necesitan lenguajes especializados.                                                                        |
| No es vulnerable a ciertos ataques económicos a los que se enfrentan los sistemas basados en fraudes en aplicaciones de alto valor.    | Un alto poder computacional requerido para generar pruebas de ZK; no es rentable para las aplicaciones de bajo rendimiento.                                                     |
|                                                                                                                                        | Tiempo de finalidad más lento (de 10 a 30 minutos para generar una prueba de ZK) (pero más rápido para la finalización completa porque no hay retraso en el tiempo de disputa). |

### Usos de Validium {#use-validium}

- [Starkware](https://starkware.co/)
- [Matter Labs zkPorter](https://matter-labs.io/)
- [Loopring](https://loopring.org/#/)

## Sidechains {#sidechains}

Una cadena sidechain (o lateral) es una blockchain independiente que funciona en paralelo con respecto a la red principal y opera independientemente. Tiene su propio algoritmo de consenso ([Prueba de autoridad](https://wikipedia.org/wiki/Proof_of_authority), [Prueba de participación delegada](https://en.bitcoinwiki.org/wiki/DPoS), [tolerancia a fallas bizantinas](https://decrypt.co/resources/byzantine-fault-tolerance-what-is-it-explained), etc.). Está conectado a la cadena principal por un puente bidireccional.

| Ventajas                                               | Desventajas                                                                                           |
| ------------------------------------------------------ | ----------------------------------------------------------------------------------------------------- |
| Tecnología establecida.                                | Menos descentralizado.                                                                                |
| Soporta el cálculo general y es compatible con la EVM. | Utiliza un mecanismo de consenso separado. No asegurado por la capa 1 (técnicamente no es la capa 2). |
|                                                        | Un quórum de validadores de sidechain puede cometer fraude.                                           |

### Usos de las sidechains {#use-sidechains}

- [Skale](https://skale.network/)
- [Red POA](https://www.poa.network/)

## Soluciones híbridas {#hybrid-solutions}

Combinan las mejores partes de las tecnologías múltiples de capa 2 y pueden ofrecer compensaciones configurables.

### Usos de las soluciones híbridas {#use-hybrid-solutions}

- [Celer](https://www.celer.network/)

## Para seguir leyendo {#further-reading}

- [Validium y la capa 2, número 99](https://www.buildblockchain.tech/newsletter/issues/no-99-validium-and-the-layer-2-two-by-two)
- [Evaluación de soluciones de escala de la capa 2 de Ethereum: Una estructura de comparación](https://blog.matter-labs.io/evaluating-ethereum-l2-scaling-solutions-a-comparison-framework-b6b2f410f955)
- [Adición del Rollup de la Prueba de participación híbrida a la plataforma de la capa 2 de Celer en Ethereum](https://medium.com/celer-network/adding-hybrid-pos-rollup-sidechain-to-celers-coherent-layer-2-platform-d1d3067fe593)
- [Escalabilidad de la blockchain de conocimiento cero](https://ethworks.io/assets/download/zero-knowledge-blockchain-scaling-ethworks.pdf)

**Canales de estado**

- [Making Sense of Ethereum’s Layer 2 Scaling Solutions: State Channels, Plasma, and Truebit](https://medium.com/l4-media/making-sense-of-ethereums-layer-2-scaling-solutions-state-channels-plasma-and-truebit-22cb40dcc2f4) _– 12 de febrero de 2018, Josh Stark_
- [State Channels - an explanation](https://www.jeffcoleman.ca/state-channels/), _6 de noviembre de 2015, Jeff Coleman_
- [Basics of State Channels](https://education.district0x.io/general-topics/understanding-ethereum/basics-state-channels/) _District0x_

**Canales de pago**

**ZK-Rollups**

**Optimistic Rollups**

- [OVM Deep Dive](https://medium.com/ethereum-optimism/ovm-deep-dive-a300d1085f52)

**Sidechains**

- [Scaling Ethereum Dapps through Sidechains](https://medium.com/loom-network/dappchains-scaling-ethereum-dapps-through-sidechains-f99e51fff447), _8 de febrero de 2018, Georgios Konstantopoulos_
