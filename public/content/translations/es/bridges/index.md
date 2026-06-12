---
title: Puentes de cadenas de bloques
metaTitle: Introducción a los puentes de cadenas de bloques
description: Los puentes permiten a los usuarios mover sus fondos a través de diferentes cadenas de bloques
lang: es
---

_La Web3 ha evolucionado hacia un ecosistema de cadenas de bloques de capa 1 (l1) y soluciones de escalabilidad de capa 2 (l2), cada una diseñada con capacidades y concesiones únicas. A medida que aumenta el número de protocolos de cadenas de bloques, también lo hace la demanda de mover activos entre cadenas. Para satisfacer esta demanda, necesitamos puentes._

<Divider />

## ¿Qué son los puentes? {#what-are-bridges}

Los puentes de cadenas de bloques funcionan igual que los puentes que conocemos en el mundo físico. Así como un puente físico conecta dos ubicaciones físicas, un puente de cadena de bloques conecta dos ecosistemas de cadenas de bloques. **Los puentes facilitan la comunicación entre cadenas de bloques a través de la transferencia de información y activos**.

Consideremos un ejemplo:

Eres de EE. UU. y estás planeando un viaje a Europa. Tienes USD, pero necesitas EUR para gastar. Para cambiar tus USD por EUR, puedes usar una casa de cambio de divisas por una pequeña tarifa.

Pero, ¿qué haces si quieres hacer un intercambio similar para usar una [cadena de bloques](/glossary/#blockchain) diferente? Digamos que quieres cambiar [ETH](/glossary/#ether) en la [red principal de Ethereum](/) por ETH en [Arbitrum](https://arbitrum.io/). Al igual que el cambio de divisas que hicimos por EUR, necesitamos un mecanismo para mover nuestro ETH de Ethereum a Arbitrum. Los puentes hacen posible tal transacción. En este caso, [Arbitrum tiene un puente nativo](https://portal.arbitrum.io/bridge) que puede transferir ETH desde la Red principal hacia Arbitrum.

## ¿Por qué necesitamos puentes? {#why-do-we-need-bridges}

Todas las cadenas de bloques tienen sus limitaciones. Para que Ethereum escale y se mantenga al día con la demanda, ha requerido [rollups](/glossary/#rollups). Alternativamente, las l1 como Solana y Avalanche están diseñadas de manera diferente para permitir una mayor capacidad de procesamiento, pero a costa de la descentralización.

Sin embargo, todas las cadenas de bloques se desarrollan en entornos aislados y tienen diferentes reglas y mecanismos de [consenso](/glossary/#consensus). Esto significa que no pueden comunicarse de forma nativa y los tokens no pueden moverse libremente entre las cadenas de bloques.

Los puentes existen para conectar cadenas de bloques, permitiendo la transferencia de información y tokens entre ellas.

**Los puentes permiten**:

- la transferencia intercadena de activos e información.
- que las [aplicaciones descentralizadas (dapps)](/glossary/#dapp) accedan a las fortalezas de varias cadenas de bloques, mejorando así sus capacidades (ya que los protocolos ahora tienen más espacio de diseño para la innovación).
- que los usuarios accedan a nuevas plataformas y aprovechen los beneficios de diferentes cadenas.
- que los desarrolladores de diferentes ecosistemas de cadenas de bloques colaboren y construyan nuevas plataformas para los usuarios.

[Cómo transferir tokens a través de un puente hacia la capa 2 (l2)](/guides/how-to-use-a-bridge/)

<Divider />

## Casos de uso de los puentes {#bridge-use-cases}

Los siguientes son algunos escenarios en los que puedes usar un puente:

### Tarifas de transacción más bajas {#transaction-fees}

Digamos que tienes ETH en la red principal de Ethereum pero quieres tarifas de transacción más baratas para explorar diferentes dapps. Al transferir tu ETH desde la Red principal a un rollup de l2 de Ethereum a través de un puente, puedes disfrutar de tarifas de transacción más bajas.

### Dapps en otras cadenas de bloques {#dapps-other-chains}

Si has estado usando Aave en la red principal de Ethereum para suministrar USDT, pero la tasa de interés que puedes recibir por suministrar USDT usando Aave en Polygon es mayor.

### Explorar ecosistemas de cadenas de bloques {#explore-ecosystems}

Si tienes ETH en la red principal de Ethereum y quieres explorar una l1 alternativa para probar sus dapps nativas. Puedes usar un puente para realizar una transferencia de tu ETH desde la red principal de Ethereum a la l1 alternativa.

### Poseer criptoactivos nativos {#own-native}

Digamos que quieres poseer Bitcoin (BTC) nativo, pero solo tienes fondos en la red principal de Ethereum. Para obtener exposición a BTC en Ethereum, puedes comprar Bitcoin envuelto (WBTC). Sin embargo, WBTC es un token [ERC-20](/glossary/#erc-20) nativo de la red Ethereum, lo que significa que es una versión de Ethereum de Bitcoin y no el activo original en la cadena de bloques de Bitcoin. Para poseer BTC nativo, tendrías que transferir tus activos de Ethereum a Bitcoin usando un puente. Esto transferirá tu WBTC y lo convertirá en BTC nativo. Alternativamente, podrías poseer BTC y querer usarlo en protocolos de [finanzas descentralizadas (DeFi)](/glossary/#defi) de Ethereum. Esto requeriría usar un puente en la dirección opuesta, de BTC a WBTC, que luego se puede usar como un activo en Ethereum.

<Alert variant="update">
<AlertEmoji text=":bulb:"/>
<AlertContent>
<AlertDescription>
  También puedes hacer todo lo anterior usando un [exchange centralizado](/get-eth). Sin embargo, a menos que tus fondos ya estén en un exchange, implicaría múltiples pasos y probablemente te iría mejor usando un puente.
</AlertDescription>
</AlertContent>
</Alert>

<Divider />

## Tipos de puentes {#types-of-bridge}

Los puentes tienen muchos tipos de diseños y complejidades. Generalmente, los puentes se dividen en dos categorías: puentes de confianza y puentes sin necesidad de confianza.

| Puentes de confianza                                                                                                                                                                    | Puentes sin necesidad de confianza                                                                                                                            |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Los puentes de confianza dependen de una entidad o sistema central para sus operaciones.                                                                                                | Los puentes sin necesidad de confianza operan usando contratos inteligentes y algoritmos.                                                                     |
| Tienen supuestos de confianza con respecto a la custodia de los fondos y la seguridad del puente. Los usuarios confían principalmente en la reputación del operador del puente.         | No tienen necesidad de confianza, es decir, la seguridad del puente es la misma que la de la cadena de bloques subyacente.                                    |
| Los usuarios deben ceder el control de sus criptoactivos.                                                                                                                               | A través de [contratos inteligentes](/glossary/#smart-contract), los puentes sin necesidad de confianza permiten a los usuarios mantener el control de sus fondos. |

En pocas palabras, podemos decir que los puentes de confianza tienen supuestos de confianza, mientras que los puentes sin necesidad de confianza son de confianza minimizada y no hacen nuevos supuestos de confianza más allá de los de los dominios subyacentes. Así es como se pueden describir estos términos:

- **Sin necesidad de confianza**: tener una seguridad equivalente a la de los dominios subyacentes. Como lo describe [Arjun Bhuptani en este artículo.](https://medium.com/connext/the-interoperability-trilemma-657c2cf69f17)
- **Supuestos de confianza:** alejarse de la seguridad de los dominios subyacentes al agregar verificadores externos en el sistema, haciéndolo así menos seguro desde el punto de vista criptoeconómico.

Para desarrollar una mejor comprensión de las diferencias clave entre los dos enfoques, tomemos un ejemplo:

Imagina que estás en el punto de control de seguridad del aeropuerto. Hay dos tipos de puntos de control:

1. Puntos de control manuales: operados por funcionarios que verifican manualmente todos los detalles de tu boleto e identidad antes de entregarte la tarjeta de embarque.
2. Auto check-in: operado por una máquina donde ingresas los detalles de tu vuelo y recibes la tarjeta de embarque si todo está en orden.

Un punto de control manual es similar a un modelo de confianza, ya que depende de un tercero, es decir, los funcionarios, para sus operaciones. Como usuario, confías en que los funcionarios tomarán las decisiones correctas y usarán tu información privada correctamente.

El auto check-in es similar a un modelo sin necesidad de confianza, ya que elimina el papel del operador y utiliza tecnología para sus operaciones. Los usuarios siempre mantienen el control de sus datos y no tienen que confiar su información privada a un tercero.

Muchas soluciones de puentes adoptan modelos entre estos dos extremos con diversos grados de ausencia de necesidad de confianza.

<Divider />

## Usar puentes {#use-bridge}

El uso de puentes te permite mover tus activos a través de diferentes cadenas de bloques. Aquí hay algunos recursos que pueden ayudarte a encontrar y usar puentes:

- **[Resumen de puentes de L2BEAT](https://l2beat.com/bridges/summary) y [Análisis de riesgo de puentes de L2BEAT](https://l2beat.com/bridges/summary)**: un resumen completo de varios puentes, que incluye detalles sobre la cuota de mercado, el tipo de puente y las cadenas de destino. L2BEAT también tiene un análisis de riesgo para los puentes, lo que ayuda a los usuarios a tomar decisiones informadas al seleccionar un puente.
- **[Resumen de puentes de DefiLlama](https://defillama.com/bridges/Ethereum)**: un resumen de los volúmenes de los puentes en las redes de Ethereum.

<Divider />

## Riesgo de usar puentes {#bridge-risk}

Los puentes se encuentran en las primeras etapas de desarrollo. Es probable que aún no se haya descubierto el diseño óptimo de un puente. Interactuar con cualquier tipo de puente conlleva riesgos:

- **Riesgo de contrato inteligente:** el riesgo de un error en el código que puede causar la pérdida de los fondos del usuario.
- **Riesgo tecnológico:** fallas de software, código con errores, errores humanos, spam y ataques maliciosos pueden interrumpir las operaciones del usuario.

Además, dado que los puentes de confianza agregan supuestos de confianza, conllevan riesgos adicionales como:

- **Riesgo de censura:** los operadores de puentes pueden, en teoría, impedir que los usuarios transfieran sus activos utilizando el puente.
- **Riesgo de custodia:** los operadores de puentes pueden confabularse para robar los fondos de los usuarios.

Los fondos del usuario están en riesgo si:

- hay un error en el contrato inteligente
- el usuario comete un error
- la cadena de bloques subyacente es hackeada
- los operadores del puente tienen intenciones maliciosas en un puente de confianza
- el puente es hackeado

Un hackeo reciente fue el del puente Wormhole de Solana, [donde se robaron 120 mil wETH ($325 millones de USD) durante el hackeo](https://rekt.news/wormhole-rekt/). Muchos de los [principales hackeos en cadenas de bloques involucraron puentes](https://rekt.news/leaderboard/).

Los puentes son cruciales para la incorporación de usuarios a las l2 de Ethereum, e incluso para los usuarios que desean explorar diferentes ecosistemas. Sin embargo, dados los riesgos que implica interactuar con los puentes, los usuarios deben comprender las concesiones que estos hacen. Estas son algunas [estrategias para la seguridad intercadena](https://debridge.com/learn/blog/10-strategies-for-cross-chain-security/).

<Divider />

## Más información {#further-reading}
- [EIP-5164: Ejecución intercadena](https://ethereum-magicians.org/t/eip-5164-cross-chain-execution/9658) - _18 de junio de 2022 - Brendan Asselstine_
- [Marco de riesgo de L2Bridge](https://gov.l2beat.com/t/l2bridge-risk-framework/31) - _5 de julio de 2022 - Bartek Kiepuszewski_
- ["Por qué el futuro será multicadena, pero no intercadena".](https://old.reddit.com/r/ethereum/comments/rwojtk/ama_we_are_the_efs_research_team_pt_7_07_january/hrngyk8/) - _8 de enero de 2022 - Vitalik Buterin_
- [Aprovechamiento de la seguridad compartida para una interoperabilidad intercadena segura: comités de estado de Lagrange y más allá](https://web.archive.org/web/20250125035123/https://research.2077.xyz/harnessing-shared-security-for-secure-blockchain-interoperability) - _12 de junio de 2024 - Emmanuel Awosika_
- [El estado de las soluciones de interoperabilidad de rollups](https://web.archive.org/web/20250428015516/https://research.2077.xyz/the-state-of-rollup-interoperability) - _20 de junio de 2024 - Alex Hook_