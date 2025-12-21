---
title: Puentes
description: Una visión general del puenteo para los desarrolladores
lang: es
---

Con la proliferación de blockchains de nivel 1 (L1) y soluciones de escalabilidad de nivel 2 (L2) [scaling](/developers/docs/scaling/), junto con un número cada vez mayor de aplicaciones descentralizadas que operan entre cadenas, la necesidad de comunicación y transferencia de activos entre cadenas se ha vuelto una parte esencial de la infraestructura de la red. Existen diferentes tipos de puentes que hacen esto posible.

## Necesidad de los bridges {#need-for-bridges}

Los puentes existen para poder conectar las redes de cadena de bloques entre sí. Permiten la conectividad e interoperatividad entre las cadenas de bloques.

Las cadenas de bloques existen en entornos aislados, lo que significa que no hay manera de que estas se comuniquen con otras de forma natural. Como resultado, si bien podría haber una significativa actividad e innovación dentro de un ecosistema, esto se verá limitado por la falta de conectividad e interoperabilidad con otros ecosistemas.

Los puentes ofrecen una manera de que los entornos aislados de cadenas de bloques puedan conectarse entre sí. Establecen una ruta de transporte entre blockchains donde se pueden transferir tokens, mensajes, datos arbitrarios e incluso llamadas a [smart contracts](/developers/docs/smart-contracts/) de una cadena a otra.

## Beneficios de los bridges {#benefits-of-bridges}

En pocas palabras, los puentes posibilitan numerosos casos de uso, ya que permiten que las redes de cadenas de bloques intercambien datos y muevan activos entre sí.

Las cadenas de bloques tienen fortalezas, debilidades y enfoques únicos para crear aplicaciones (como velocidad, rendimiento, costo, etc.). Los puentes ayudan al desarrollo del ecosistema cripto en general porque permiten que las cadenas de bloques aprovechen las innovaciones de las demás.

En el caso de los desarrolladores, los puentes permiten lo siguiente:

- La transferencia de cualquier tipo de datos, información y activos entre cadenas;
- La posibilidad de usar nuevas funciones y casos de uso para protocolos a medida en los puentes expandan su espacio de diseño para lo que pueden ofrecer los protocolos. Por ejemplo, un protocolo para yield farming implementado originalmente en la red principal de Ethereum puede ofrecer pools de liquidez en todas las cadenas compatibles con la EVM;
- La oportunidad de aprovechar las fortalezas de diferentes cadenas de bloques. Por ejemplo, los desarrolladores pueden beneficiarse de las bajas comisiones que ofrecen las diferentes soluciones de capa 2 implementando sus dApps en rollups, cadenas laterales, y los usuarios pueden establecer puentes para aprovecharlos;
- Coloración entre desarrolladores de varios ecosistemas de cadenas de bloques para crear nuevos productos;
- Atracción de usuarios y comunidades de varios ecosistemas a sus dapps.

## ¿Cómo funcionan los puentes? {#how-do-bridges-work}

Si bien existen muchos [tipos de diseños de bridges](https://li.fi/knowledge-hub/blockchain-bridges-and-classification/), tres formas de facilitar la transferencia de activos entre cadenas se destacan:

- **Lock and mint –** Bloquear activos en la cadena de origen y acuñar activos en la cadena de destino.
- **Burn and mint –** Quemar activos en la cadena de origen y acuñar activos en la cadena de destino.
- **Atomic swaps –** Cambiar activos en la cadena de origen por activos en la cadena de destino con otra parte.

## Tipos de bridges {#bridge-types}

Los puentes usualmente se clasifican en los siguientes tipos:

- **Bridges nativos –** Estos bridges suelen construirse para impulsar la liquidez en una blockchain en particular, facilitando que los usuarios trasladen fondos al ecosistema. Por ejemplo, el [Arbitrum Bridge](https://bridge.arbitrum.io/) está diseñado para que los usuarios puedan transferir fondos fácilmente desde Ethereum Mainnet hacia Arbitrum. Otros bridges similares incluyen Polygon PoS Bridge, [Optimism Gateway](https://app.optimism.io/bridge), etc.
- **Bridges basados en validadores u oráculos –** Estos bridges dependen de un conjunto externo de validadores o de oráculos para validar las transferencias entre cadenas. Ejemplos: Multichain y Across.
- **Bridges de paso de mensajes generalizados –** Estos bridges pueden transferir activos, además de mensajes y datos arbitrarios entre cadenas. Ejemplos: Axelar, LayerZero y Nomad.
- **Redes de liquidez –** Estos bridges se enfocan principalmente en transferir activos de una cadena a otra mediante atomic swaps. Generalmente, no soportan el envío de mensajes entre cadenas. Ejemplos: Connext y Hop.

## Compensaciones a considerar {#trade-offs}

Los puentes no son soluciones perfectas. De hecho, deben sacrificarse algunas cuestiones para el propósito. Desarrolladores y usuarios pueden evaluar los puentes basándose en los siguientes factores:

- **Seguridad –** ¿Quién verifica el sistema? Los puentes asegurados por validadores externos son típicamente menos seguros que los puentes con seguridad local o nativa de los validadores de la cadena de bloques.
- **Comodidad –** ¿Cuánto tiempo se tarda en completar una transacción y cuántas transacciones tuvo que firmar un usuario? Para un desarrollador, ¿cuánto tiempo se tarda en integrar un puente y qué tan complejo es el proceso?
- **Conectividad –** ¿Cuáles son las diferentes cadenas de destino que un bridge puede conectar (por ejemplo, rollups, sidechains, otras blockchains de nivel 1, etc.) y qué tan difícil es integrar una nueva blockchain?
- **Capacidad para transferir datos más complejos –** ¿Puede un bridge habilitar la transferencia de mensajes y datos arbitrarios más complejos entre cadenas, o solo admite transferencias de activos entre cadenas?
- **Rentabilidad –** ¿Cuánto cuesta transferir activos entre cadenas a través de un bridge? Típicamente, los puentes cobran una comisión fija o variable dependiendo de la tarifa de gas y la liquidez de las rutas específicadas. También es crítico evaluar la rentabilidad de un puente según el capital requerido para garantizar su seguridad.

A un alto nivel, los puentes pueden categorizarse como de confianza y sin confianza.

- **Confiables –** Los bridges confiables son verificados externamente. Usan un conjunto de verificadores externos (federaciones con multifirma, sistemas computacionales multiparte, redes de oráculos) para enviar los datos a través de las cadenas. Como resultado, pueden ofrecer una gran conectividad y permiten el pase de mensajes completamente generalizado a través de cadenas. También tienden a funcionar con velocidad y rentabilidad. Esto tiene como costo la seguridad, ya que los usuarios tienen que confiar en la seguridad del puente.
- **Sin confianza (trustless) –** Estos bridges dependen de las blockchains que están conectando y sus validadores para transferir mensajes y tokens. Son "sin confianza" porque no añaden nuevas suposiciones de confianza (además de las cadenas de bloques). Como resultado, los puentes sin confianza se consideran más seguros que los puentes de confianza.

Para evaluar los puentes sin confianza en función de otros factores, debemos dividirlos en puentes de pase de mensajes generalizados y redes de liquidez.

- **Bridges de paso de mensajes generalizados –** Estos bridges sobresalen en seguridad y en la capacidad de transferir datos más complejos entre cadenas. Por lo general, también son buenos en términos de rentabilidad. Sin embargo, estas fortalezas generalmente vienen a expensas de la conectividad para los puentes de clientes ligeros (por ejemplo, IBC) e inconvenientes de velocidad para los puentes optimistas (por ejemplo, Nomad) que utilizan pruebas de fraude.
- **Redes de liquidez –** Estos bridges utilizan atomic swaps para transferir activos y son sistemas verificados localmente (es decir, utilizan los validadores de las blockchains subyacentes para verificar transacciones). Como resultado, sobresalen por seguridad y velocidad. Además, se consideran comparativamente rentables y ofrecen una buena conectividad. Sin embargo, la principal compensación es su incapacidad para transmitir datos más complejos, ya que no admiten la transmisión de mensajes entre cadenas.

## Riesgos de los bridges {#risk-with-bridges}

Los bridges representan los tres [mayores hacks en DeFi](https://rekt.news/leaderboard/) y todavía se encuentran en las primeras etapas de desarrollo. El uso de cualquier puente conlleva los siguientes riesgos:

- **Riesgo de smart contract –** Aunque muchos bridges han superado auditorías con éxito, basta con una falla en un smart contract para que los activos queden expuestos a hacks (ejemplo: [Wormhole Bridge de Solana](https://rekt.news/wormhole-rekt/)).
- **Riesgos financieros sistémicos** – Muchos bridges utilizan activos envueltos para acuñar versiones canónicas del activo original en una nueva cadena. Esto expone al ecosistema a un riesgo sistémico, ya que hemos visto versiones envueltas de tokens explotadas.
- **Riesgo de contraparte –** Algunos bridges emplean un diseño confiable que requiere que los usuarios confíen en que los validadores no se pondrán de acuerdo para robar los fondos de los usuarios. La necesidad de que los usuarios confíen en estos actores de terceros los expone a riesgos como los rug pulls, la censura y otras actividades maliciosas.
- **Cuestiones abiertas –** Dado que los bridges están en las primeras etapas de desarrollo, existen muchas preguntas sin respuesta relacionadas con cómo funcionarán en diferentes condiciones de mercado, como en momentos de congestión de la red y durante eventos imprevistos como ataques a nivel de red o retrocesos de estado. Esta incertidumbre plantea ciertos riesgos, cuyo grado aún se desconoce.

## ¿Cómo pueden usar los puentes las dapps? {#how-can-dapps-use-bridges}

Estas son algunas aplicaciones prácticas que los desarrolladores pueden considerar sobre los puentes y llevar su dapp a otras cadenas:

### Integrando bridges {#integrating-bridges}

Para los desarrolladores, hay muchas maneras de añadir soporte para puentes:

1. **Construir su propio bridge –** Construir un bridge seguro y fiable no es sencillo, especialmente si se opta por una ruta de mínima confianza. Además, esto requiere años de experiencia y conocimientos técnicos relacionados con los estudios de escalabilidad e interoperabilidad. Por otra parte, se requeriría un equipo práctico para mantener un puente y atraer suficiente liquidez para hacerlo viable.

2. **Mostrar a los usuarios múltiples opciones de bridges –** Muchas [dapps](/developers/docs/dapps/) requieren que los usuarios tengan su token nativo para interactuar con ellas. Para permitir a los usuarios acceder a sus tokens, ofrecen diferentes opciones de puente en su sitio web. No obstante, este método es una solución rápida al problema, ya que aleja al usuario de la interfaz de la dapp y aun así requiere que interactúe con otras dapps y puentes. Esta es una experiencia de incorporación engorrosa y más propensa a que se cometan errores.

3. **Integrar un bridge –** Esta solución no requiere que la dapp envíe a los usuarios a las interfaces externas de bridges y DEX. Permite que las dapps mejoren la experiencia de incorporación del usuario. No obstante, este enfoque tiene sus limitaciones:

   - La evaluación y el mantenimiento de puentes son difíciles y requieren mucho tiempo.
   - Seleccionar un puente crea un único punto de falla y dependencia.
   - La dapp está limitada por las capacidades del puente.
   - Los puentes por sí solos podrían no ser suficientes. Las DApps podrían necesitar que los DEX ofrezcan más funcionalidad, como intercambios entre cadenas.

4. **Integrar múltiples bridges –** Esta solución resuelve muchos de los problemas asociados con la integración de un solo bridge. No obstante, también tiene limitaciones, ya que la integración de múltiples puentes consume recursos y crea gastos generales técnicos y de comunicación para los desarrolladores, el recurso más escaso en criptografía.

5. **Integrar un agregador de bridges –** Otra opción para las dapps es integrar una solución de agregación de bridges que les brinde acceso a múltiples bridges. Los agregadores de puentes heredan las fortalezas de todos los puentes y, por lo tanto, no están limitados por las capacidades de un único puente. En particular, los agregadores de puentes suelen mantener las integraciones de puentes, lo que evita a la dapp la molestia de mantenerse al tanto de los aspectos técnicos y operativos de una integración de puente.

Dicho esto, los agregadores de puentes también tienen sus limitaciones. Por ejemplo, si bien pueden ofrecer más opciones de puente, normalmente hay muchos más puentes disponibles en el mercado aparte de los que se ofrecen en la plataforma del agregador. Además, al igual que los puentes, los agregadores de puentes también están expuestos a los riesgos de los contratos inteligentes y la tecnología (más contratos inteligentes = más riesgos).

Si una dapp va por la ruta de integrar un puente o un agregador, hay diferentes opciones en función de la profundidad de la integración. Por ejemplo, si solo se trata de una integración de front-end para mejorar la experiencia de incorporación del usuario, una dapp integraría el widget. Sin embargo, si la integración es para explorar estrategias de cadena cruzada más profundas como el staking, el yield farming, etc., la dapp integra el SDK o la API.

### Implementar una dapp en múltiples cadenas {#deploying-a-dapp-on-multiple-chains}

Para implementar una dapp en múltiples cadenas, los desarrolladores pueden utilizar plataformas de desarrollo como [Alchemy](https://www.alchemy.com/), [Hardhat](https://hardhat.org/), [Moralis](https://moralis.io/), etc. Por lo general, estas plataformas vienen con complementos componibles que pueden permitir que las dapps se hagan multicadena o se usen en otras. Por ejemplo, los desarrolladores pueden utilizar un proxy de implementación determinística ofrecido por el [plugin hardhat-deploy](https://github.com/wighawag/hardhat-deploy).

#### Ejemplos:

- [Cómo construir dapps entre cadenas](https://moralis.io/how-to-build-cross-chain-dapps/)
- [Construyendo un Marketplace de NFT entre cadenas](https://youtu.be/WZWCzsB1xUE)
- [Moralis: Construyendo dapps de NFT entre cadenas](https://www.youtube.com/watch?v=ehv70kE1QYo)

### Monitoreo de la actividad de contratos entre cadenas {#monitoring-contract-activity-across-chains}

Para monitorear la actividad de los contratos entre cadenas, los desarrolladores pueden usar subgrafos y plataformas de desarrollador como Tenderly para observar los contratos inteligentes en tiempo real. Estas plataformas también cuentan con herramientas que ofrecen una mayor funcionalidad de monitoreo de datos para actividades entre cadenas, como la posibilidad de consultar [eventos emitidos por contratos](https://docs.soliditylang.org/en/v0.8.14/contracts.html?highlight=events#events), etc.

#### Herramientas

- [The Graph](https://thegraph.com/en/)
- [Tenderly](https://tenderly.co/)

## Lecturas adicionales {#further-reading}

- [Blockchain Bridges](/bridges/) – ethereum.org
- [L2Beat Bridge Risk Framework](https://l2beat.com/bridges/summary)
- [Blockchain Bridges: Building Networks of Cryptonetworks](https://medium.com/1kxnetwork/blockchain-bridges-5db6afac44f8) - 8 de septiembre de 2021 – Dmitriy Berenzon
- [The Interoperability Trilemma](https://blog.connext.network/the-interoperability-trilemma-657c2cf69f17) - 1 de octubre de 2021 – Arjun Bhuptani
- [Clusters: How Trusted & Trust-Minimized Bridges Shape the Multi-Chain Landscape](https://blog.celestia.org/clusters/) - 4 de octubre de 2021 – Mustafa Al-Bassam
- [LI.FI: With Bridges, Trust is a Spectrum](https://blog.li.fi/li-fi-with-bridges-trust-is-a-spectrum-354cd5a1a6d8) - 28 de abril de 2022 – Arjun Chand
- [The State Of Rollup Interoperability Solutions](https://web.archive.org/web/20250428015516/https://research.2077.xyz/the-state-of-rollup-interoperability) - 20 de junio de 2024 – Alex Hook
- [Harnessing Shared Security For Secure Cross-Chain Interoperability: Lagrange State Committees And Beyond](https://web.archive.org/web/20250125035123/https://research.2077.xyz/harnessing-shared-security-for-secure-blockchain-interoperability) - 12 de junio de 2024 – Emmanuel Awosika

Además, aquí hay presentaciones esclarecedoras de [James Prestwich](https://twitter.com/_prestwich) que pueden ayudarle a desarrollar una comprensión más profunda sobre los bridges:

- [Construyendo bridges, no jardines amurallados](https://youtu.be/ZQJWMiX4hT0)
- [Desglosando los bridges](https://youtu.be/b0mC-ZqN8Oo)
- [¿Por qué están ardiendo los bridges?](https://youtu.be/c7cm2kd20j8)
