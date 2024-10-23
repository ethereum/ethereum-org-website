---
title: Introducción sobre los puentes en la cadena de bloques
description: Los puentes permiten a los usuarios, mover sus fondos a través de diferentes cadenas de bloques
lang: es
---

# Puentes en el blockchain {#prerequisites}

_La Web3 ha evolucionado a un ecosistema de cadenas de bloques L1 y soluciones de escalado L2, cada uno diseñado con capacidades y compensaciones particulares. A medida que el número de protocolos de cadena de bloques aumenta, también aumenta la demanda de mover activos a través de las cadenas. Para satisfacer esta demanda, necesitamos puentes (bridges)._

<Divider />

## ¿Qué son los puentes? {#what-are-bridges}

Los puentes de las cadenas de bloques funcionan como los puentes que conocemos en el mundo físico. Así como un puente físico conecta dos ubicaciones físicas, un puente de cadena de bloques conecta dos ecosistemas de cadena de bloques. **Los puentes facilitan la comunicación entre las cadenas de bloques mediante la transferencia de información y activos**.

Veamos un ejemplo:

Usted es de los Estados Unidos y está planeando un viaje a Europa. Tiene dólares, pero necesita euros. Para cambiar sus dólares por euros, puede utilizar un cambio de divisa por una pequeña comisión.

Pero, ¿qué puede hacer si quiere realizar un intercambio similar para usar una [cadena de bloques](/glossary/#blockchain) diferente? Digamos que usted quiere cambiar [ETH](/glossary/#ether) en la red principal de Ethereum por ETH en [Arbitrum](https://arbitrum.io/). Al igual que el cambio de divisas que hicimos para obtener euros, necesitamos un mecanismo para mover nuestro ETH de Ethereum a Arbitrum. Los puentes hacen posible tal transacción. En este caso, [Arbitrum tiene un puente nativo](https://bridge.arbitrum.io/) que puede transferir ETH de la Red principal a Arbitrum.

## ¿Por qué necesitamos puentes? {#why-do-we-need-bridges}

Todas las cadenas de bloques tienen sus limitaciones. Para que Ethereum escale y siga el ritmo de la demanda, ha requerido el uso de [rollups](/glossary/#rollups). Alternativamente, los L1 como Solana y Avalanche están diseñados de forma diferente para permitir una mayor velocidad en las transacciones, pero a costa de la descentralización.

Sin embargo, todas las cadenas de bloques se desarrollan en un entorno aislado y tienen diferentes reglas y mecanismos de [consenso](/glossary/#consensus). Esto significa que no pueden comunicarse de forma nativa, y los tokens no pueden moverse libremente entre cadenas de bloques.

Los puentes existen para conectar cadenas de bloques, permitiendo la transferencia de información y tokens entre ellas.

**Los puentes permiten**:

- la transferencia de activos e información entre cadenas
- que las [dapps](/glossary/#dapp) se beneficien de las fortalezas de varias cadenas de bloques, mejorando así sus capacidades (ya que los protocolos ahora tienen más espacio para la innovación)
- el acceso a nuevas plataformas y el aprovechamiento de los beneficios de las diferentes cadenas
- que los desarrolladores de diferentes ecosistemas de cadenas de bloques colaboren y creen nuevas plataformas para los usuarios

[Cómo pasar los tókenes a la capa 2](/guides/how-to-use-a-bridge/)

<Divider />

## Casos de uso de los puentes {#bridge-use-cases}

Los siguientes son algunos escenarios donde puede usar un puente:

### Menores comisiones por transacción {#transaction-fees}

Digamos que tiene ETH en la Red principal de Ethereum y quiere comisiones de transacción más bajas para explorar diferentes DApps. Utilizando un puente para llevar su ETH de la Red principal de Ethereum a un roll-up L2 de Ethereum, podrá disfrutar de comisiones de transacción más bajas.

### DApps en otras cadenas de bloques {#dapps-other-chains}

Si ha estado usando Aave en la Red principal de Ethereum para prestar USDT, pero la tasa de interés para prestarlos usando Aave en Polygon es más alta.

### Explorar ecosistemas de cadenas de bloques {#explore-ecosystems}

Si tiene ETH en la Red principal de Ethereum y quiere explorar una alternativa L1 para probar sus DApps nativas, puede utilizar un puente para transferir su ETH de la Red principal de Ethereum a la L1 alternativa.

### Tener activos crypto nativos {#own-native}

Digamos que quiere tener Bitcoin (BTC), pero solo tiene fondos en la Red principal de Ethereum. Para obtener exposición a BTC en Ethereum, puede comprar Wrapped Bitcoin (WBTC). Sin embargo, WBTC es un token [ERC-20](/glossary/#erc-20) nativo de la red de Ethereum, lo que significa que es una versión de Ethereum de Bitcoin y no el activo original en la cadena de bloques de Bitcoin. Para tener BTC nativo, usted tendría que trasladar sus activos de Ethereum a Bitcoin usando un puente. Esto trasladará entre redes su WBTC y lo convertirá en BTC nativo. De forma alternativa, podría tener BTC y querer usarlo en protocolos [DeFi](/glossary/#defi) de Ethereum. Esto requeriría un puente pero al revés, desde el BTC hasta WBTC, que luego puede ser utilizado como un activo en Ethereum.

<InfoBanner shouldCenter emoji=":bulb:">
  También puede hacer todo lo anterior usando un <a href="/get-eth/">exchange centralizado</a>. Sin embargo, a menos que sus fondos ya estén en un exchange, esto implicaría varios pasos y probablemente sería mejor usar un puente.
</InfoBanner>

<Divider />

## Tipos de puente {#types-of-bridge}

Los puentes tienen muchos tipos de diseños y complejidades. Generalmente encontramos dos categorías: puentes de confianza (trusted) y puentes sin confianza o que no la necesitan (trustless).

| Puentes de confianza                                                                                                                                                      | Puentes sin confianza                                                                                                                                 |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| Los puentes de confianza dependen de una entidad o sistema central para sus operaciones.                                                                                  | Los puentes sin confianza operan usando contratos inteligentes y algoritmos.                                                                          |
| Se asume que son confiables con respecto a la custodia de los fondos y la seguridad del puente. Los usuarios confían mayormente en la reputación del operador del puente. | No es necesario que los usuarios confíen en ellos: la seguridad del puente es la misma que la de la cadena de bloques subyacente.                     |
| Los usuarios deben renunciar al control de sus activos crypto.                                                                                                            | A través de [contratos inteligentes](/glossary/#smart-contract), los puentes "sin confianza" permiten a los usuarios seguir en control de sus fondos. |

En pocas palabras, podemos decir que los puentes de confianza tienen acuerdos basados en la confianza, o hay presunciones de confianza, mientras que los puentes que no precisan confianza minimizan esta cuestión y se apoyan en la confianza que aportan los automatismos y procesos preestablecidos en los dominios subyacentes. Así es como se pueden describir estos términos:

- **Trustless (no precisan confianza)**: tener una seguridad equivalente a los dominios subyacentes. Como describe [Arjun Bhuptani en este artículo](https://medium.com/connext/the-interoperability-trilemma-657c2cf69f17).
- **Presunciones de confianza:** alejarse de la seguridad de los dominios subyacentes agregando verificadores externos en el sistema, haciéndolo menos seguro desde el punto de vista criptoeconómico.

Para desarrollar una mejor comprensión de las diferencias clave entre ambos enfoques, pongamos un ejemplo:

Imagínese que está en el control de seguridad del aeropuerto. Existen dos tipos de puntos de control:

1. Puntos de control manuales, operados por funcionarios que revisan manualmente todos los detalles de su billete e identidad antes de entregarle la tarjeta de embarque.
2. Auto Check-In, operado por una máquina en la que se incluyen los datos de su vuelo y se recibe el pase de embarque si todo está bien.

Un punto de control manual es similar a un modelo de confianza, ya que depende de un tercero, por ejemplo, de funcionarios, para sus operaciones. Como usuario, confía en que los funcionarios tomen las decisiones correctas y utilicen correctamente su información privada.

La autofacturación, o auto check-in, es similar a un modelo que no precisa confianza, ya que elimina el papel del operador y utiliza la tecnología para ejecutar las operaciones. Los usuarios siempre mantienen el control de sus datos y no tienen que confiar su información privada a terceros.

Muchas soluciones de puente adoptan modelos entre estos dos extremos con diferentes niveles de no necesidad de confianza en el proceso.

<Divider />

## Riesgo al utilizar puentes {#bridge-risk}

Los puentes se encuentran en las primeras etapas de desarrollo. Es probable que todavía no se haya descubierto el diseño óptimo de estos. Interactuar con cualquier tipo de puente conlleva riesgos:

- **Riesgo del contrato inteligente:** el riesgo de un error o bug en el código que pueda causar la pérdida de fondos del usuario.
- **Riesgo de tecnología:** falla de software, código con errores, error humano, spam y ataques maliciosos pueden afectar las operaciones del usuario.

Además, dado que los puentes de confianza añaden presunciones de confianza, conllevan riesgos adicionales como:

- **Riesgo de censura: **los operadores del puente pueden impedir teóricamente que los usuarios transfieran sus activos usando el puente.
- **Riesgo de custodia:** los operadores del puente pueden ponerse de acuerdo para robar los fondos de los usuarios.

Los fondos del usuario están en riesgo cuando:

- hay un bug en el contrato inteligente
- el usuario comete un error
- la cadena de bloques subyacente es hackeada
- los operadores del puente tienen intenciones maliciosas en un puente de confianza
- el puente es hackeado

Un hackeo reciente ocurrió en el puente de Solana Wormhole, [donde se robaron durante el ataque 120.000 wETH ($325 millones de USD)](https://rekt.news/wormhole-rekt/). Muchos de los [principales hackeos en las cadenas de bloques involucraron puentes](https://rekt.news/leaderboard/).

Los puentes son cruciales para incorporar a los usuarios a las L2 de Ethereum e incluso para los usuarios que quieren explorar diferentes ecosistemas. Sin embargo, dados los riesgos que implica la interacción con los puentes, los usuarios deben entender las implicancias. Estas son algunas [estrategias para la seguridad entre cadenas](https://blog.debridge.finance/10-strategies-for-cross-chain-security-8ed5f5879946).

<Divider />

## Para seguir leyendo {#further-reading}

- [EIP-5164: Ejecución entre cadenas (cross-chain)](https://ethereum-magicians.org/t/eip-5164-cross-chain-execution/9658) _18 de junio de 2022 - Brendan Asselstine_
- [Marco de riesgos L2Bridge](https://gov.l2beat.com/t/l2bridge-risk-framework/31) _5 de julio de 2022 - Bartek Kiepuszewski_
- ["Por qué el futuro será multicadena, pero no entre cadenas"](https://old.reddit.com/r/ethereum/comments/rwojtk/ama_we_are_the_efs_research_team_pt_7_07_january/hrngyk8/) _8 de enero de 2022 - Vitalik Buterin_
