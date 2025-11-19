---
title: Introducción sobre los puentes en la cadena de bloques
description: Los puentes permiten a los usuarios, mover sus fondos a través de diferentes cadenas de bloques
lang: es
---

# Puentes blockchain {#prerequisites}

_La Web3 ha evolucionado a un ecosistema de cadenas de bloques L1 y soluciones de escalado L2, cada uno diseñado con capacidades y compensaciones particulares. A medida que el número de protocolos de cadena de bloques aumenta, también aumenta la demanda de mover activos a través de las cadenas.Para satisfacer esta demanda, necesitamos puentes._

<Divider />

## ¿Qué son los puentes? {#what-are-bridges}

Los puentes de las cadenas de bloques funcionan como los puentes que conocemos en el mundo físico. Así como un puente físico conecta dos ubicaciones físicas, un puente de cadena de bloques conecta dos ecosistemas de cadena de bloques. **Los puentes facilitan la comunicación entre las cadenas de bloques mediante la transferencia de información y activos**.

Veamos un ejemplo:

Usted es de los Estados Unidos y está planeando un viaje a Europa. Tiene dólares, pero necesita euros. Para cambiar sus dólares por euros, puede utilizar un cambio de divisa por una pequeña comisión.

Pero, ¿qué hacer si quiere hacer un intercambio similar para usar otra [blockchain](/glossary/#blockchain)? Supongamos que desea intercambiar [ETH](/glossary/#ether) en Ethereum Mainnet por ETH en [Arbitrum](https://arbitrum.io/). Al igual que el cambio de divisas que hicimos para obtener euros, necesitamos un mecanismo para mover nuestro ETH de Ethereum a Arbitrum. Los puentes hacen posible tal transacción. En este caso, [Arbitrum tiene un puente nativo](https://portal.arbitrum.io/bridge) que puede transferir ETH de Mainnet a Arbitrum.

## ¿Por qué necesitamos puentes? {#why-do-we-need-bridges}

Todas las cadenas de bloques tienen sus limitaciones. Para que Ethereum escale y mantenga el ritmo de la demanda, ha requerido [rollups](/glossary/#rollups). Alternativamente, los L1 como Solana y Avalanche están diseñados de forma diferente para permitir una mayor velocidad en las transacciones, pero a costa de la descentralización.

Sin embargo, todas las blockchains se desarrollan en entornos aislados y cuentan con diferentes reglas y mecanismos de [consenso](/glossary/#consensus). Esto significa que no pueden comunicarse de forma nativa, y los tokens no pueden moverse libremente entre cadenas de bloques.

Los puentes existen para conectar cadenas de bloques, permitiendo la transferencia de información y tokens entre ellas.

**Los puentes permiten**:

- la transferencia de activos e información entre cadenas
- [dapps](/glossary/#dapp) para acceder a las fortalezas de varias blockchains, mejorando así sus capacidades (ya que ahora los protocolos tienen más espacio de diseño para la innovación).
- el acceso a nuevas plataformas y el aprovechamiento de los beneficios de las diferentes cadenas
- que los desarrolladores de diferentes ecosistemas de cadenas de bloques colaboren y creen nuevas plataformas para los usuarios

[Cómo puentear tokens a layer 2](/guides/how-to-use-a-bridge/)

<Divider />

## Casos de uso de puentes {#bridge-use-cases}

Los siguientes son algunos escenarios donde puede usar un puente:

### Comisiones de transacción más bajas {#transaction-fees}

Digamos que tiene ETH en la Red principal de Ethereum y quiere comisiones de transacción más bajas para explorar diferentes DApps. Utilizando un puente para llevar su ETH de la Red principal de Ethereum a un roll-up L2 de Ethereum, podrá disfrutar de comisiones de transacción más bajas.

### Dapps en otras blockchains {#dapps-other-chains}

Si ha estado utilizando Aave en la Red principal de Ethereum para suministrar USDT, pero la tasa de interés que puede recibir por suministrar USDT usando Aave en Polygon es mayor.

### Explorar ecosistemas blockchain {#explore-ecosystems}

Si tiene ETH en la Red principal de Ethereum y quiere explorar una alternativa L1 para probar sus DApps nativas, puede utilizar un puente para transferir su ETH de la Red principal de Ethereum a la L1 alternativa.

### Poseer criptoactivos nativos {#own-native}

Digamos que quiere tener Bitcoin (BTC), pero solo tiene fondos en la Red principal de Ethereum. Para obtener exposición a BTC en Ethereum, puede comprar Wrapped Bitcoin (WBTC). Sin embargo, WBTC es un token [ERC-20](/glossary/#erc-20) nativo de la red Ethereum, lo que significa que es una versión de Bitcoin para Ethereum y no el activo original en la blockchain de Bitcoin. Para tener BTC nativo, usted tendría que trasladar sus activos de Ethereum a Bitcoin usando un puente. Esto trasladará entre redes su WBTC y lo convertirá en BTC nativo. Alternativamente, podría poseer BTC y querer usarlo en protocolos de Ethereum [DeFi](/glossary/#defi). Esto requeriría un puente pero al revés, desde el BTC hasta WBTC, que luego puede ser utilizado como un activo en Ethereum.

<Alert variant="update">
<AlertEmoji text=":bulb:"/>
<AlertContent>
<AlertDescription>
  También puede hacer todo lo anterior usando un [exchange centralizado](/get-eth). Sin embargo, a menos que sus fondos ya estén en un exchange, implicaría varios pasos, y probablemente sería mejor usar un puente.
</AlertDescription>
</AlertContent>
</Alert>

<Divider />

## Tipos de puentes {#types-of-bridge}

Los puentes tienen muchos tipos de diseños y complejidades. Generalmente encontramos dos categorías: puentes de confianza (trusted) y puentes sin confianza o que no la necesitan (trustless).

| Puentes de confianza                                                                                                                                                                                      | Puentes sin confianza                                                                                                                                             |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Los puentes de confianza dependen de una entidad o sistema central para sus operaciones.                                                                                                  | Los puentes sin confianza operan usando contratos inteligentes y algoritmos.                                                                      |
| Se asume que son confiables con respecto a la custodia de los fondos y la seguridad del puente. Los usuarios confían mayormente en la reputación del operador del puente. | No es necesario que los usuarios confíen en ellos: la seguridad del puente es la misma que la de la cadena de bloques subyacente. |
| Los usuarios deben renunciar al control de sus activos crypto.                                                                                                                            | A través de [smart contracts](/glossary/#smart-contract), los puentes sin confianza permiten a los usuarios mantener el control de sus fondos.    |

En pocas palabras, podemos decir que los puentes de confianza tienen acuerdos basados en la confianza, o hay presunciones de confianza, mientras que los puentes que no precisan confianza minimizan esta cuestión y se apoyan en la confianza que aportan los automatismos y procesos preestablecidos en los dominios subyacentes. Así es como se pueden describir estos términos:

- **Sin confianza**: ofrece una seguridad equivalente a la de los dominios subyacentes. Como lo describe [Arjun Bhuptani en este artículo.](https://medium.com/connext/the-interoperability-trilemma-657c2cf69f17)
- **Supuestos de confianza:** alejarse de la seguridad de los dominios subyacentes al añadir verificadores externos al sistema, lo que lo hace menos seguro desde el punto de vista criptoeconómico.

Para desarrollar una mejor comprensión de las diferencias clave entre ambos enfoques, pongamos un ejemplo:

Imagínese que está en el control de seguridad del aeropuerto. Existen dos tipos de puntos de control:

1. Puntos de control manuales, operados por funcionarios que revisan manualmente todos los detalles de su billete e identidad antes de entregarle la tarjeta de embarque.
2. Auto Check-In, operado por una máquina en la que se incluyen los datos de su vuelo y se recibe el pase de embarque si todo está bien.

Un punto de control manual es similar a un modelo de confianza, ya que depende de un tercero, por ejemplo, de funcionarios, para sus operaciones. Como usuario, confía en que los funcionarios tomen las decisiones correctas y utilicen correctamente su información privada.

La autofacturación, o auto check-in, es similar a un modelo que no precisa confianza, ya que elimina el papel del operador y utiliza la tecnología para ejecutar las operaciones. Los usuarios siempre mantienen el control de sus datos y no tienen que confiar su información privada a terceros.

Muchas soluciones de puente adoptan modelos entre estos dos extremos con diferentes niveles de no necesidad de confianza en el proceso.

<Divider />

## Usar puentes {#use-bridge}

Usar puentes le permite mover sus activos a través de diferentes cadenas de bloques. He aquí algunos recursos que le pueden ayudar a encontrar y usar puentes:

- **[L2BEAT Bridges Summary](https://l2beat.com/bridges/summary) & [L2BEAT Bridges Risk Analysis](https://l2beat.com/bridges/summary)**: Un resumen completo de varios puentes, incluyendo detalles sobre cuota de mercado, tipo de puente y cadenas de destino. L2BEAT también tiene análisis de riesgo de puentes, ayudando a los usuarios a tomar decisiones informadas a lo largo del proceso de elección de un puente.
- **[DefiLlama Bridge Summary](https://defillama.com/bridges/Ethereum)**: Un resumen de los volúmenes de puentes a través de las redes de Ethereum.

<Divider />

## Riesgos de usar puentes {#bridge-risk}

Los puentes se encuentran en las primeras etapas de desarrollo. Es probable que todavía no se haya descubierto el diseño óptimo de estos. Interactuar con cualquier tipo de puente conlleva riesgos:

- **Riesgo de smart contract —** el riesgo de que un error en el código pueda causar la pérdida de fondos de los usuarios
- **Riesgo tecnológico —** fallos de software, código con errores, errores humanos, spam y ataques maliciosos pueden interrumpir las operaciones de los usuarios

Además, dado que los puentes de confianza añaden presunciones de confianza, conllevan riesgos adicionales como:

- **Riesgo de censura —** los operadores del puente pueden, en teoría, impedir que los usuarios transfieran sus activos usando el puente
- **Riesgo de custodia —** los operadores del puente pueden coludirse para robar los fondos de los usuarios

Los fondos del usuario están en riesgo cuando:

- hay un bug en el contrato inteligente
- el usuario comete un error
- la cadena de bloques subyacente es hackeada
- los operadores del puente tienen intenciones maliciosas en un puente de confianza
- el puente es hackeado

Un hackeo reciente fue el del puente Wormhole de Solana, [donde se robaron 120.000 wETH (325 millones de dólares estadounidenses) durante el ataque](https://rekt.news/wormhole-rekt/). Muchos de los [mayores hackeos en blockchains involucraron puentes](https://rekt.news/leaderboard/).

Los puentes son cruciales para incorporar a los usuarios a las L2 de Ethereum e incluso para los usuarios que quieren explorar diferentes ecosistemas. Sin embargo, dados los riesgos que implica la interacción con los puentes, los usuarios deben entender las implicancias. Estas son algunas [estrategias para la seguridad cross-chain](https://debridge.com/learn/blog/10-strategies-for-cross-chain-security/).

<Divider />

## Lecturas adicionales {#further-reading}

- [EIP-5164: Cross-Chain Execution](https://ethereum-magicians.org/t/eip-5164-cross-chain-execution/9658) - _18 de junio de 2022 - Brendan Asselstine_
- [L2Bridge Risk Framework](https://gov.l2beat.com/t/l2bridge-risk-framework/31) - _5 de julio de 2022 - Bartek Kiepuszewski_
- ["Por qué el futuro será multichain, pero no cross-chain."](https://old.reddit.com/r/ethereum/comments/rwojtk/ama_we_are_the_efs_research_team_pt_7_07_january/hrngyk8/) - _8 de enero de 2022 - Vitalik Buterin_
- [Aprovechando la seguridad compartida para una interoperabilidad cross-chain segura: Lagrange State Committees y más allá](https://web.archive.org/web/20250125035123/https://research.2077.xyz/harnessing-shared-security-for-secure-blockchain-interoperability) - _12 de junio de 2024 - Emmanuel Awosika_
- [El estado de las soluciones de interoperabilidad de rollups](https://web.archive.org/web/20250428015516/https://research.2077.xyz/the-state-of-rollup-interoperability) - _20 de junio de 2024 - Alex Hook_

