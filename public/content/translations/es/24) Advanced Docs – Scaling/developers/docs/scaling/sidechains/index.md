---
title: Cadenas laterales
description: Introducción a las cadenas laterales como solución de escalado actualmente utilizada por la comunidad de Ethereum.
lang: es
sidebarDepth: 3
---

Una cadena lateral (sidechain) es una cadena de bloques separada que funciona independientemente de Ethereum,  mientras que, a su vez, está conectada a la red principal de Ethereum por un puente bidireccional. Las cadenas laterales pueden tener parámetros de bloque y [algoritmos de consenso](/developers/docs/consensus-mechanisms/) separados, los cuales a menudo están diseñados para el procesamiento eficiente de las transacciones. El uso de una cadena lateral implica compensaciones no obstante, ya que no heredan las propiedades de seguridad de Ethereum. A diferencia de las [soluciones de escalado de capa 2](/layer-2/), las cadenas laterales no publican de vuelta en la red principal de Ethereum cambios de estado y datos de transacciones.

Las cadenas laterales también sacrifican alguna medida de descentralización o seguridad para lograr un alto rendimiento ([trilema de escalabilidad](https://vitalik.eth.limo/general/2021/05/23/scaling.html)). Sin embargo, Ethereum está comprometido a escalar sin tener que comprometer su descentralización y seguridad como se indica en su [declaración de visión](/roadmap/vision/) para actualizaciones.

## ¿Cómo funcionan las cadenas laterales? {#how-do-sidechains-work}

Las cadenas laterales son cadenas de bloques independientes, con diferentes historias, hojas de ruta de desarrollo y consideraciones de diseño. Si bien las cadenas laterales pueden compartir similitudes de nivel básico con Ethereum, tienen varias características distintivas.

### Algoritmos de consenso {#consensus-algorithms}

Una de las cualidades que hacen que las cadenas laterales sean únicas (es decir, diferentes de Ethereum) es el algoritmo de consenso utilizado. Las cadenas laterales no utilizan Ethereum para el consenso y pueden elegir protocolos de consenso alternativos que se adapten a sus necesidades. Algunos ejemplos de algoritmos de consenso utilizados en las cadenas laterales incluyen:

- [Prueba de autoridad](/developers/docs/consensus-mechanisms/poa/)
- [Prueba de participación delegada](https://en.bitcoin.it/wiki/Delegated_proof_of_stake)
- [Toleración de fallas bizantinas](https://decrypt.co/resources/byzantine-fault-tolerance-what-is-it-explained)

Al igual que Ethereum, las cadenas laterales tienen nodos de validación que verifican y procesan transacciones, producen bloques y almacenan el estado de la cadena de bloques. Los validadores también son responsables de mantener el consenso en toda la red y protegerlo contra ataques maliciosos.

#### Parámetros de bloques {#block-parameters}

Ethereum pone límites a los [tiempos de los bloques](/developers/docs/blocks/#block-time) (es decir, el tiempo que toma producir nuevos bloques) y los [tamaños de los bloques](/developers/docs/blocks/#block-size) (es decir, la cantidad de datos contenidos por bloque denominados en gas). Por el contrario, las cadenas laterales a menudo adoptan diferentes parámetros, como tiempos de bloques más rápidos y límites de gas más altos, para lograr un alto rendimiento, transacciones rápidas y tarifas bajas.

Si bien esto tiene algunos beneficios, tiene implicaciones críticas para la descentralización y la seguridad de las redes. Los parámetros de bloques, como los tiempos de bloques más rápidos y los tamaños de bloque grandes, aumentan la dificultad de ejecutar un nodo completo, dejando a unos pocos "supernodos" la responsabilidad de mantener segura la cadena. En tal escenario, aumenta la posibilidad de colusión de validadores o una toma de control maliciosa de la cadena.

Para que las cadenas de bloques escalen sin sacrificar la decentralización, la posibilidad de correr un nodo debe estar abierta a cualquiera, y no necesariamente a personas u organizaciónes con hardware de cómputo especializado. Es por eso que hay iniciativas para asegurar que caulquiera pueda correr un [nodo completo](/developers/docs/nodes-and-clients/#why-should-i-run-an-ethereum-node) en Ethereum.

### Compatibilidad con la EVM {#evm-compatibility}

Algunas cadenas laterales son compatibles con la EVM y pueden ejecutar contraros derarrollados para la [Máquina virtual de Ethereum (EVM)](/developers/docs/evm/). Las cadenas laterales compatibles con la EVM admiten contratos inteligentes [escritoes en Solidity](/developers/docs/smart-contracts/languages/), así como en otros lenguages de programación de contratos inteligentes comaptibles con la EVM, lo que quiere decir que los contratos inteligentes escritos para la red prinicpal de Ethereum también funcionarán en cadenas laterales compatibles con la EVM.

Esto quiere decir que si quiere usar una [dapp](/developers/docs/dapps/) en una cadena lateral, solo es cuestión de implementar su [contrato inteligente](/developers/docs/smart-contracts/) en esta cadena lateral. Se ve, siente y funciona como la red principal de Ethereum: escribe un contrato usando Solidity e interactúa por medio del RPC de las cadenas laterales.

Debido a que las cadenas laterales son compatibles con la EVM, también son consideradas como una [solución de escalabilidad](/developers/docs/scaling/) útil para dapps nativas de Ethereum. Con su dapp en una cadena lateral, los usuarios pueden disfrutar de tarifas de gas menores, así como transacciones más rápidas, especialmente si la red principal se encontrara congestionada.

Sin embargo, como se explicó anteriormente, usar una cadena lateral conlleva sus sacrificios. Cada cadena lateral es responsable de su propia seguridad y no hereda las propiedades de seguridad de Ethereum. Esto incrementa la posibilidad de comportamiento malicioso que podría afectar a los usarios o poner sus fondos en riesgo.

### Movimiento de activos {#asset-movement}

Para que una cadena de bloques se convierta en una cadena lateral a la red prinicpal de Ethereum, requerirá facilitar la transferencia de los activos desde y hacia la red principal de Ethereum. Esta interoperabilidad con Ethereum se logra con un puente entre las cadenas. Los [puentes](/bridges/) utilizan contratos inteligentes implementados tanto en la red principal de Ethereum como en la cadena lateral para controlar el puenteo de fondos.

Si bien los puentes permiten a los usuarios mover sus fondos entre Ethereum y la cadena lateral, los activos realmente no se están moviendo entre las dos cadenas. En su lugar, se utilizan otros mecanismos que transfieren el valor entre las cadenas que podrían involucrar la destrucción o quema del activo en una cadena y la creación o minteo de su equivalente en la otra cadena. Para obtener más información, revise [cómo funcionan los puentes](/developers/docs/bridges/#how-do-bridges-work).

## Ventajas y desventajas de las cadenas laterales {#pros-and-cons-of-sidechains}

| Ventajas                                                                                                                                             | Desventajas                                                                                                                                  |
| ---------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| La tecnología detrás de las cadenas laterales está bien establecida y se beneficia de investigación exhaustiva y mejoras en diseño.                  | Las cadenas laterales sacrifican algunas medidas de descentralización y no necesidad de confianza por la escalabilidad.                      |
| Las cadenas laterales admiten la computación general y ofrecen compatibilidad con la EVM (pueden correr dapps que son nativas a Ethereum).           | Una cadena lareral utiliza mecanismos de conseso independientes y no se beneficia de las garantías de seguridad de Ethereum.                 |
| Las cadenas laterales utilizan diferentes modelos de consenso para procesar transacciones de forma eficiente y reducir los costos de las comisiones. | Reuqieren un mayor nivel de supuestos para su confianza (por ejemplo, un quórum de validadores maliciosos unidos podrían cometer un fraude). |
| Las cadenas laterales compatibles con la EVM permiten a las dapp expandir su ecosistema.                                                             |                                                                                                                                              |

### Usos de las cadenas laterales {#use-sidechains}

Múltiples proyectos proporcionan implementaciones de cadenas laterales que puede integrar en sus dApps:

- [Polygon PoS](https://polygon.technology/solutions/polygon-pos)
- [Skale](https://skale.network/)
- [Cadena Gnosis (anteriormente xDai)](https://www.gnosischain.com/)
- [Red Loom](https://loomx.io/)
- [Metis Andromeda](https://www.metis.io/)

## Más lecturas {#further-reading}

- [Escalar dapps de Ethereum a través de cadenas laterales](https://medium.com/loom-network/dappchains-scaling-ethereum-dapps-through-sidechains-f99e51fff447) _8 de febrero, 2018 - Georgios Konstantopoulos_

_¿Conoces algún recurso en la comunidad que te haya servido de ayuda? Edita esta página y añádelo._
