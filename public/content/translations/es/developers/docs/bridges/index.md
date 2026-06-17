---
title: Puentes
description: "Una descripción general de los puentes para desarrolladores"
lang: es
---

Con la proliferación de las cadenas de bloques de capa 1 (l1) y las soluciones de [escalado](/developers/docs/scaling/) de capa 2 (l2), junto con un número cada vez mayor de aplicaciones descentralizadas (dapp) que se vuelven intercadena, la necesidad de comunicación y movimiento de activos entre cadenas se ha convertido en una parte esencial de la infraestructura de la red. Existen diferentes tipos de puentes para ayudar a que esto sea posible.

## Necesidad de los puentes {#need-for-bridges}

Los puentes existen para conectar redes de cadenas de bloques. Permiten la conectividad y la interoperabilidad entre las cadenas de bloques.

Las cadenas de bloques existen en entornos aislados, lo que significa que no hay forma de que las cadenas de bloques intercambien y se comuniquen con otras cadenas de bloques de forma natural. Como resultado, aunque podría haber una actividad e innovación significativas dentro de un ecosistema, está limitado por la falta de conectividad e interoperabilidad con otros ecosistemas.

Los puentes ofrecen una forma para que los entornos aislados de cadenas de bloques se conecten entre sí. Establecen una ruta de transporte entre cadenas de bloques donde los tokens, mensajes, datos arbitrarios e incluso las llamadas a [contratos inteligentes](/developers/docs/smart-contracts/) pueden transferirse de una cadena a otra.

## Beneficios de los puentes {#benefits-of-bridges}

En pocas palabras, los puentes desbloquean numerosos casos de uso al permitir que las redes de cadenas de bloques intercambien datos y muevan activos entre ellas.

Las cadenas de bloques tienen fortalezas, debilidades y enfoques únicos para crear aplicaciones (como velocidad, capacidad de procesamiento, costos, etc.). Los puentes ayudan al desarrollo del ecosistema cripto en general al permitir que las cadenas de bloques aprovechen las innovaciones de las demás.

Para los desarrolladores, los puentes permiten lo siguiente:

- la transferencia de cualquier dato, información y activos entre cadenas.
- desbloquear nuevas funciones y casos de uso para los protocolos, ya que los puentes amplían el espacio de diseño de lo que los protocolos pueden ofrecer. Por ejemplo, un protocolo de agricultura de rendimiento desplegado originalmente en la [red principal de Ethereum](/) puede ofrecer fondos de liquidez en todas las cadenas compatibles con la EVM.
- la oportunidad de aprovechar las fortalezas de diferentes cadenas de bloques. Por ejemplo, los desarrolladores pueden beneficiarse de las tarifas más bajas que ofrecen las diferentes soluciones de capa 2 (l2) al desplegar sus aplicaciones descentralizadas (dapp) en rollup y cadenas laterales, y los usuarios pueden usar puentes entre ellas.
- la colaboración entre desarrolladores de varios ecosistemas de cadenas de bloques para crear nuevos productos.
- atraer usuarios y comunidades de varios ecosistemas a sus dapp.

## ¿Cómo funcionan los puentes? {#how-do-bridges-work}

Aunque hay muchos [tipos de diseños de puentes](https://li.fi/knowledge-hub/blockchain-bridges-and-classification/), destacan tres formas de facilitar la transferencia intercadena de activos:

- **Bloquear y acuñar:** bloquea activos en la cadena de origen y acuña activos en la cadena de destino.
- **Quemar y acuñar:** quema activos en la cadena de origen y acuña activos en la cadena de destino.
- **Intercambios atómicos:** intercambia activos en la cadena de origen por activos en la cadena de destino con otra parte.

## Tipos de puentes {#bridge-types}

Los puentes generalmente se pueden clasificar en una de las siguientes categorías:

- **Puentes nativos:** estos puentes se construyen típicamente para impulsar la liquidez en una cadena de bloques en particular, lo que facilita a los usuarios mover fondos al ecosistema. Por ejemplo, el [puente de Arbitrum](https://bridge.arbitrum.io/) está construido para que sea conveniente para los usuarios usar un puente desde la red principal de Ethereum a Arbitrum. Otros puentes de este tipo incluyen el puente Polygon PoS, [Optimism Gateway](https://app.optimism.io/bridge), etc.
- **Puentes basados en validadores u oráculos:** estos puentes dependen de un conjunto de validadores externos u oráculos para validar las transferencias intercadena. Ejemplos: Multichain y Across.
- **Puentes de paso de mensajes generalizados:** estos puentes pueden transferir activos, junto con mensajes y datos arbitrarios entre cadenas. Ejemplos: Axelar, LayerZero y Nomad.
- **Redes de liquidez:** estos puentes se centran principalmente en transferir activos de una cadena a otra a través de intercambios atómicos. Por lo general, no admiten el paso de mensajes intercadena. Ejemplos: Connext y Hop.

## Compensaciones a considerar {#trade-offs}

Con los puentes, no hay soluciones perfectas. Más bien, solo hay compensaciones que se hacen para cumplir un propósito. Los desarrolladores y usuarios pueden evaluar los puentes en función de los siguientes factores:

- **Seguridad:** ¿quién verifica el sistema? Los puentes asegurados por validadores externos suelen ser menos seguros que los puentes que están asegurados local o nativamente por los validadores de la cadena de bloques.
- **Conveniencia:** ¿cuánto tiempo se tarda en completar una transacción y cuántas transacciones tuvo que firmar un usuario? Para un desarrollador, ¿cuánto tiempo se tarda en integrar un puente y qué tan complejo es el proceso?
- **Conectividad:** ¿cuáles son las diferentes cadenas de destino que puede conectar un puente (es decir, rollup, cadenas laterales, otras cadenas de bloques de capa 1, etc.) y qué tan difícil es integrar una nueva cadena de bloques?
- **Capacidad para pasar datos más complejos:** ¿puede un puente permitir la transferencia de mensajes y datos arbitrarios más complejos entre cadenas, o solo admite transferencias de activos intercadena?
- **Rentabilidad:** ¿cuánto cuesta transferir activos entre cadenas a través de un puente? Por lo general, los puentes cobran una tarifa fija o variable según los costos de gas y la liquidez de rutas específicas. También es fundamental evaluar la rentabilidad de un puente en función del capital necesario para garantizar su seguridad.

A un alto nivel, los puentes se pueden clasificar como de confianza y sin necesidad de confianza.

- **De confianza:** los puentes de confianza se verifican externamente. Utilizan un conjunto externo de verificadores (federaciones con multifirma, sistemas de computación multipartita, red de oráculos) para enviar datos entre cadenas. Como resultado, pueden ofrecer una gran conectividad y permitir el paso de mensajes totalmente generalizado entre cadenas. También tienden a funcionar bien en cuanto a velocidad y rentabilidad. Esto tiene un costo en la seguridad, ya que los usuarios tienen que depender de la seguridad del puente.
- **Sin necesidad de confianza:** estos puentes dependen de las cadenas de bloques que conectan y de sus validadores para transferir mensajes y tokens. Son "sin necesidad de confianza" porque no añaden nuevos supuestos de confianza (además de las cadenas de bloques). Como resultado, los puentes sin necesidad de confianza se consideran más seguros que los puentes de confianza.

Para evaluar los puentes sin necesidad de confianza en función de otros factores, debemos dividirlos en puentes de paso de mensajes generalizados y redes de liquidez.

- **Puentes de paso de mensajes generalizados:** estos puentes destacan por su seguridad y la capacidad de transferir datos más complejos entre cadenas. Por lo general, también son buenos en cuanto a rentabilidad. Sin embargo, estas fortalezas generalmente tienen el costo de la conectividad para los puentes de clientes ligeros (ej.: IBC) y los inconvenientes de velocidad para los puentes optimistas (ej.: Nomad) que utilizan pruebas de fraude.
- **Redes de liquidez:** estos puentes utilizan intercambios atómicos para transferir activos y son sistemas verificados localmente (es decir, utilizan los validadores de las cadenas de bloques subyacentes para verificar las transacciones). Como resultado, destacan por su seguridad y velocidad. Además, se consideran comparativamente rentables y ofrecen buena conectividad. Sin embargo, la principal compensación es su incapacidad para pasar datos más complejos, ya que no admiten el paso de mensajes intercadena.

## Riesgos de los puentes {#risk-with-bridges}

Los puentes representan los tres [mayores hackeos en las finanzas descentralizadas (DeFi)](https://rekt.news/leaderboard/) y todavía se encuentran en las primeras etapas de desarrollo. El uso de cualquier puente conlleva los siguientes riesgos:

- **Riesgo de contratos inteligentes:** aunque muchos puentes han superado con éxito las auditorías, basta con un fallo en un contrato inteligente para que los activos queden expuestos a hackeos (ej.: [el puente Wormhole de Solana](https://rekt.news/wormhole-rekt/)).
- **Riesgos financieros sistémicos:** muchos puentes utilizan activos envueltos para acuñar versiones canónicas del activo original en una nueva cadena. Esto expone al ecosistema a un riesgo sistémico, ya que hemos visto cómo se explotan las versiones envueltas de los tokens.
- **Riesgo de contraparte:** algunos puentes utilizan un diseño de confianza que requiere que los usuarios dependan del supuesto de que los validadores no se confabularán para robar los fondos de los usuarios. La necesidad de que los usuarios confíen en estos actores externos los expone a riesgos como tirones de alfombra (rug pulls), censura y otras actividades maliciosas.
- **Problemas abiertos:** dado que los puentes se encuentran en las etapas incipientes de desarrollo, hay muchas preguntas sin respuesta relacionadas con cómo funcionarán los puentes en diferentes condiciones del mercado, como en momentos de congestión de la red y durante eventos imprevistos como ataques a nivel de red o reversiones de estado. Esta incertidumbre plantea ciertos riesgos, cuyo grado aún se desconoce.

## ¿Cómo pueden las dapp usar los puentes? {#how-can-dapps-use-bridges}

Aquí hay algunas aplicaciones prácticas que los desarrolladores pueden considerar sobre los puentes y llevar su dapp a ser intercadena:

### Integración de puentes {#integrating-bridges}

Para los desarrolladores, hay muchas formas de añadir soporte para puentes:

1. **Construir su propio puente:** construir un puente seguro y confiable no es fácil, especialmente si toma una ruta de confianza minimizada. Además, requiere años de experiencia y conocimientos técnicos relacionados con estudios de escalabilidad e interoperabilidad. Adicionalmente, requeriría un equipo práctico para mantener un puente y atraer suficiente liquidez para hacerlo factible.

2. **Mostrar a los usuarios múltiples opciones de puentes:** muchas [dapp](/developers/docs/dapps/) requieren que los usuarios tengan su token nativo para interactuar con ellas. Para permitir a los usuarios acceder a sus tokens, ofrecen diferentes opciones de puentes en su sitio web. Sin embargo, este método es una solución rápida al problema, ya que aleja al usuario de la interfaz de la dapp y aún requiere que interactúe con otras dapp y puentes. Esta es una experiencia de incorporación engorrosa con un mayor margen para cometer errores.

3. **Integrar un puente:** esta solución no requiere que la dapp envíe a los usuarios a las interfaces externas de puentes y DEX. Permite a las dapp mejorar la experiencia de incorporación del usuario. Sin embargo, este enfoque tiene sus limitaciones:

   - La evaluación y el mantenimiento de los puentes son difíciles y consumen mucho tiempo.
   - Seleccionar un solo puente crea un único punto de fallo y dependencia.
   - La dapp está limitada por las capacidades del puente.
   - Los puentes por sí solos podrían no ser suficientes. Las dapp podrían necesitar DEX para ofrecer más funcionalidades, como intercambios intercadena.

4. **Integrar múltiples puentes:** esta solución resuelve muchos problemas asociados con la integración de un solo puente. Sin embargo, también tiene limitaciones, ya que la integración de múltiples puentes consume recursos y crea gastos generales técnicos y de comunicación para los desarrolladores, el recurso más escaso en el mundo cripto.

5. **Integrar un agregador de puentes:** otra opción para las dapp es integrar una solución de agregación de puentes que les dé acceso a múltiples puentes. Los agregadores de puentes heredan las fortalezas de todos los puentes y, por lo tanto, no están limitados por las capacidades de un solo puente. En particular, los agregadores de puentes suelen mantener las integraciones de los puentes, lo que ahorra a la dapp la molestia de estar al tanto de los aspectos técnicos y operativos de la integración de un puente.

Dicho esto, los agregadores de puentes también tienen sus limitaciones. Por ejemplo, aunque pueden ofrecer más opciones de puentes, por lo general hay muchos más puentes disponibles en el mercado además de los que se ofrecen en la plataforma del agregador. Además, al igual que los puentes, los agregadores de puentes también están expuestos a riesgos tecnológicos y de contratos inteligentes (más contratos inteligentes = más riesgos).

Si una dapp opta por la ruta de integrar un puente o un agregador, hay diferentes opciones según la profundidad que se pretenda dar a la integración. Por ejemplo, si es solo una integración de front-end para mejorar la experiencia de incorporación del usuario, una dapp integraría el widget. Sin embargo, si la integración es para explorar estrategias intercadena más profundas como el staking, la agricultura de rendimiento, etc., la dapp integra el SDK o la API.

### Despliegue de una dapp en múltiples cadenas {#deploying-a-dapp-on-multiple-chains}

Para desplegar una dapp en múltiples cadenas, los desarrolladores pueden usar plataformas de desarrollo como [Alchemy](https://www.alchemy.com/), [Hardhat](https://hardhat.org/), [Moralis](https://moralis.io/), etc. Por lo general, estas plataformas vienen con complementos componibles que pueden permitir que las dapp se vuelvan intercadena. Por ejemplo, los desarrolladores pueden usar un proxy de despliegue determinista ofrecido por el [complemento hardhat-deploy](https://github.com/wighawag/hardhat-deploy).

#### Ejemplos: {#examples}

- [Cómo construir dapp intercadena](https://moralis.io/how-to-build-cross-chain-dapps/)
- [Construcción de un mercado de NFT intercadena](https://youtu.be/WZWCzsB1xUE)
- [Moralis: Construcción de dapp de NFT intercadena](https://www.youtube.com/watch?v=ehv70kE1QYo)

### Monitoreo de la actividad de los contratos en múltiples cadenas {#monitoring-contract-activity-across-chains}

Para monitorear la actividad de los contratos en múltiples cadenas, los desarrolladores pueden usar subgrafos y plataformas para desarrolladores como Tenderly para observar los contratos inteligentes en tiempo real. Dichas plataformas también tienen herramientas que ofrecen una mayor funcionalidad de monitoreo de datos para actividades intercadena, como verificar los [eventos emitidos por los contratos](https://docs.soliditylang.org/en/v0.8.14/contracts.html?highlight=events#events), etc.

#### Herramientas {#tools}

- [The Graph](https://thegraph.com/en/)
- [Tenderly](https://tenderly.co/)

## Lecturas adicionales {#further-reading}

- [Puentes de cadenas de bloques](/bridges/) – ethereum.org
- [Marco de riesgo de puentes de L2BEAT](https://l2beat.com/bridges/summary)
- [Puentes de cadenas de bloques: Construyendo redes de criptoredes](https://medium.com/1kxnetwork/blockchain-bridges-5db6afac44f8) - 8 de septiembre de 2021 – Dmitriy Berenzon
- [El trilema de la interoperabilidad](https://blog.connext.network/the-interoperability-trilemma-657c2cf69f17) - 1 de octubre de 2021 – Arjun Bhuptani
- [Clústeres: Cómo los puentes de confianza y de confianza minimizada dan forma al panorama multicadena](https://blog.celestia.org/clusters/) - 4 de octubre de 2021 – Mustafa Al-Bassam
- [LI.FI: Con los puentes, la confianza es un espectro](https://blog.li.fi/li-fi-with-bridges-trust-is-a-spectrum-354cd5a1a6d8) - 28 de abril de 2022 – Arjun Chand
- [El estado de las soluciones de interoperabilidad de rollup](https://web.archive.org/web/20250428015516/https://research.2077.xyz/the-state-of-rollup-interoperability) - 20 de junio de 2024 – Alex Hook
- [Aprovechamiento de la seguridad compartida para una interoperabilidad intercadena segura: Comités de estado de Lagrange y más allá](https://web.archive.org/web/20250125035123/https://research.2077.xyz/harnessing-shared-security-for-secure-blockchain-interoperability) - 12 de junio de 2024 – Emmanuel Awosika

Además, aquí hay algunas presentaciones interesantes de [James Prestwich](https://twitter.com/_prestwich) que pueden ayudar a desarrollar una comprensión más profunda de los puentes:

- [Construyendo puentes, no jardines amurallados](https://youtu.be/ZQJWMiX4hT0)
- [Desglosando los puentes](https://youtu.be/b0mC-ZqN8Oo)
- [Por qué se están quemando los puentes](https://youtu.be/c7cm2kd20j8)