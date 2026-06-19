---
title: Cadenas laterales
description: "Una introducción a las cadenas laterales como solución de escalabilidad utilizada actualmente por la comunidad de Ethereum."
lang: es
sidebarDepth: 3
---

Una cadena lateral es una cadena de bloques separada que se ejecuta de forma independiente de [Ethereum](/) y está conectada a la red principal de Ethereum mediante un puente bidireccional. Las cadenas laterales pueden tener parámetros de bloque y [algoritmos de consenso](/developers/docs/consensus-mechanisms/) separados, que a menudo están diseñados para un procesamiento eficiente de las transacciones. Sin embargo, el uso de una cadena lateral implica concesiones, ya que no heredan las propiedades de seguridad de Ethereum. A diferencia de las [soluciones de escalabilidad de capa 2 (l2)](/layer-2/), las cadenas laterales no publican los cambios de estado ni los datos de las transacciones en la red principal de Ethereum.

Las cadenas laterales también sacrifican cierta medida de descentralización o seguridad para lograr una alta capacidad de procesamiento ([trilema de la escalabilidad](https://vitalik.eth.limo/general/2021/05/23/scaling.html)). Ethereum, sin embargo, está comprometido a escalar sin comprometer la descentralización y la seguridad.

## ¿Cómo funcionan las cadenas laterales? {#how-do-sidechains-work}

Las cadenas laterales son cadenas de bloques independientes, con diferentes historiales, hojas de ruta de desarrollo y consideraciones de diseño. Aunque una cadena lateral puede compartir algunas similitudes superficiales con Ethereum, tiene varias características distintivas.

### Algoritmos de consenso {#consensus-algorithms}

Una de las cualidades que hacen únicas a las cadenas laterales (es decir, diferentes de Ethereum) es el algoritmo de consenso utilizado. Las cadenas laterales no dependen de Ethereum para el consenso y pueden elegir protocolos de consenso alternativos que se adapten a sus necesidades. Algunos ejemplos de algoritmos de consenso utilizados en las cadenas laterales incluyen:

- [Prueba de autoridad (PoA)](/developers/docs/consensus-mechanisms/poa/)
- [Prueba de participación delegada](https://en.bitcoin.it/wiki/Delegated_proof_of_stake)
- [Tolerancia a fallas bizantinas](https://decrypt.co/resources/byzantine-fault-tolerance-what-is-it-explained).

Al igual que Ethereum, las cadenas laterales tienen nodos validadores que verifican y procesan transacciones, producen bloques y almacenan el estado de la cadena de bloques. Los validadores también son responsables de mantener el consenso en toda la red y protegerla contra ataques maliciosos.

#### Parámetros de bloque {#block-parameters}

Ethereum establece límites en los [tiempos de bloque](/developers/docs/blocks/#block-time) (es decir, el tiempo que se tarda en producir nuevos bloques) y los [tamaños de bloque](/developers/docs/blocks/#block-size) (es decir, la cantidad de datos contenidos por bloque denominados en gas). Por el contrario, las cadenas laterales a menudo adoptan parámetros diferentes, como tiempos de bloque más rápidos y límites de gas más altos, para lograr una alta capacidad de procesamiento, transacciones rápidas y tarifas bajas.

Aunque esto tiene algunos beneficios, tiene implicaciones críticas para la descentralización y la seguridad de la red. Los parámetros de bloque, como tiempos de bloque rápidos y tamaños de bloque grandes, aumentan la dificultad de ejecutar un nodo completo, dejando a unos pocos "supernodos" como responsables de asegurar la cadena. En tal escenario, aumenta la posibilidad de colusión de validadores o de una toma de control maliciosa de la cadena.

Para que las cadenas de bloques escalen sin perjudicar la descentralización, la ejecución de un nodo debe estar abierta a todos, no necesariamente a partes con hardware especializado. Es por eso que se están realizando esfuerzos para garantizar que todos puedan [ejecutar un nodo completo](/developers/docs/nodes-and-clients/#why-should-i-run-an-ethereum-node) en la red de Ethereum.

### Compatibilidad con la EVM {#evm-compatibility}

Algunas cadenas laterales son compatibles con la EVM y pueden ejecutar contratos desarrollados para la [Máquina Virtual de Ethereum (EVM)](/developers/docs/evm/). Las cadenas laterales compatibles con la EVM admiten contratos inteligentes [escritos en Solidity](/developers/docs/smart-contracts/languages/), así como otros lenguajes de contratos inteligentes de la EVM, lo que significa que los contratos inteligentes escritos para la red principal de Ethereum también funcionarán en cadenas laterales compatibles con la EVM.

Esto significa que si desea utilizar su [aplicación descentralizada (dapp)](/developers/docs/dapps/) en una cadena lateral, solo es cuestión de implementar su [contrato inteligente](/developers/docs/smart-contracts/) en esta cadena lateral. Se ve, se siente y actúa igual que la Red principal: usted escribe contratos en Solidity e interactúa con la cadena a través del RPC de las cadenas laterales.

Debido a que las cadenas laterales son compatibles con la EVM, se consideran una [solución de escalabilidad](/developers/docs/scaling/) útil para las dapps nativas de Ethereum. Con su dapp en una cadena lateral, los usuarios pueden disfrutar de tarifas de gas más bajas y transacciones más rápidas, especialmente si la Red principal está congestionada.

Sin embargo, como se explicó anteriormente, el uso de una cadena lateral implica concesiones significativas. Cada cadena lateral es responsable de su seguridad y no hereda las propiedades de seguridad de Ethereum. Esto aumenta la posibilidad de un comportamiento malicioso que puede afectar a sus usuarios o poner en riesgo sus fondos.

### Movimiento de activos {#asset-movement}

Para que una cadena de bloques separada se convierta en una cadena lateral de la red principal de Ethereum, necesita la capacidad de facilitar la transferencia de activos desde y hacia la red principal de Ethereum. Esta interoperabilidad con Ethereum se logra utilizando un puente de cadena de bloques. Los [puentes](/bridges/) utilizan contratos inteligentes implementados en la red principal de Ethereum y una cadena lateral para controlar el puenteo de fondos entre ellos.

Aunque los puentes ayudan a los usuarios a mover fondos entre Ethereum y la cadena lateral, los activos no se mueven físicamente a través de las dos cadenas. En su lugar, se utilizan mecanismos que normalmente implican la acuñación y el quemado para transferir valor a través de las cadenas. Más información sobre [cómo funcionan los puentes](/developers/docs/bridges/#how-do-bridges-work).

## Pros y contras de las cadenas laterales {#pros-and-cons-of-sidechains}

| Pros                                                                                                                        | Contras                                                                                                             |
| --------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| La tecnología que sustenta las cadenas laterales está bien establecida y se beneficia de una amplia investigación y mejoras en el diseño. | Las cadenas laterales sacrifican cierta medida de descentralización y ausencia de necesidad de confianza a cambio de escalabilidad.                          |
| Las cadenas laterales admiten la computación general y ofrecen compatibilidad con la EVM (pueden ejecutar dapps nativas de Ethereum).                    | Una cadena lateral utiliza un mecanismo de consenso separado y no se beneficia de las garantías de seguridad de Ethereum.         |
| Las cadenas laterales utilizan diferentes modelos de consenso para procesar transacciones de manera eficiente y reducir las tarifas de transacción para los usuarios.         | Las cadenas laterales requieren mayores supuestos de confianza (por ejemplo, un quórum de validadores maliciosos de la cadena lateral puede cometer fraude). |
| Las cadenas laterales compatibles con la EVM permiten a las dapps expandir su ecosistema.                                                            |                                                                                                                  |

### Usar cadenas laterales {#use-sidechains}

Múltiples proyectos proporcionan implementaciones de cadenas laterales que puede integrar en sus dapps:

- [Polygon PoS](https://polygon.technology/solutions/polygon-pos)
- [Skale](https://skale.network/)
- [Gnosis Chain (anteriormente xDai)](https://www.gnosischain.com/)
- [Loom Network](https://loomx.io/)
- [Metis Andromeda](https://www.metis.io/)

## Más información {#further-reading}

- [Escalabilidad de dapps de Ethereum a través de cadenas laterales](https://medium.com/loom-network/dappchains-scaling-ethereum-dapps-through-sidechains-f99e51fff447) _8 de febrero de 2018 - Georgios Konstantopoulos_

_¿Conoce algún recurso de la comunidad que le haya servido de ayuda? ¡Edite esta página y añádalo!_