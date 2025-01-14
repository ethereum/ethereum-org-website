---
title: Puentes
description: Una visión general para reducir la brecha a los desarrolladores
lang: es
---

Con la proliferación de las cadenas de bloques L1 y las soluciones de [escalamiento](/developers/docs/scaling/) L2, junto con el gran crecimiento del número de aplicaciones descentralizadas operando en varias cadenas o pasando a la modalidad multicadena, la necesidad por establecer comunicación y de poder mover activos a través de estás cadenas se han convertido en una parte esencial de la infraestructura de red. Existen diferentes tipos de puentes que hacen esto posible.

## La necesidad de puentes {#need-for-bridges}

Los puentes existen para poder conectar las redes de cadena de bloques entre sí. Permiten la conectividad e interoperatividad entre las cadenas de bloques.

Las cadenas de bloques existen en entornos aislados, lo que significa que no hay manera de que estas se comuniquen con otras de forma natural. Como resultado, si bien podría haber una significativa actividad e innovación dentro de un ecosistema, esto se verá limitado por la falta de conectividad e interoperabilidad con otros ecosistemas.

Los puentes ofrecen una manera de que los entornos aislados de cadenas de bloques puedan conectarse entre sí. Establecen una vía de transporte entre las cadenas de bloques donde tokens, mensajes, datos arbitrarios e incluso llamadas a [contratos inteligentes](/developers/docs/smart-contracts/) puedan transferirse de una cadena hacia otra.

## Beneficio de los puentes {#benefits-of-bridges}

En pocas palabras, los puentes posibilitan numerosos casos de uso, ya que permiten que las redes de cadenas de bloques intercambien datos y muevan activos entre sí.

Las cadenas de bloques tienen fortalezas, debilidades y enfoques únicos para crear aplicaciones (como velocidad, rendimiento, costo, etc.). Los puentes ayudan al desarrollo del ecosistema cripto en general porque permiten que las cadenas de bloques aprovechen las innovaciones de las demás.

En el caso de los desarrolladores, los puentes permiten lo siguiente:

- La transferencia de cualquier tipo de datos, información y activos entre cadenas;
- La posibilidad de usar nuevas funciones y casos de uso para protocolos a medida en los puentes expandan su espacio de diseño para lo que pueden ofrecer los protocolos. Por ejemplo, un protocolo para yield farming implementado originalmente en la red principal de Ethereum puede ofrecer pools de liquidez en todas las cadenas compatibles con la EVM;
- La oportunidad de aprovechar las fortalezas de diferentes cadenas de bloques. Por ejemplo, los desarrolladores pueden beneficiarse de las bajas comisiones que ofrecen las diferentes soluciones de capa 2 implementando sus dApps en rollups, cadenas laterales, y los usuarios pueden establecer puentes para aprovecharlos;
- Coloración entre desarrolladores de varios ecosistemas de cadenas de bloques para crear nuevos productos;
- Atracción de usuarios y comunidades de varios ecosistemas a sus dapps.

## ¿Cómo funcionan los puentes? {#how-do-bridges-work}

Si bien hay muchos [tipos de diseños de puentes](https://li.fi/knowledge-hub/blockchain-bridges-and-classification/), resaltan tres formas de facilitar la transferencia de activos entre cadenas:

- **Bloqueo y minteo:** Bloquear los activos en la cadena de origen y mintear activos en la cadena de destino.
- **Quemar y mintear:** Quemar activos en la cadena de origen y mintearlos en la cadena de destino.
- **Intercambios atómicos:** Intercambiar activos en la cadena fuente por activos en la cadena de destino con otra parte.

## Tipos de puentes {#bridge-types}

Los puentes usualmente se clasifican en los siguientes tipos:

- **Puentes nativos:** Estos puentes son típicamente creados para impulsar liquidez en una cadena de bloques en particular, haciendo que los usuarios puedan mover activos fácilmente al ecosistema. Por ejemplo, el [Arbitrum Bridge](https://bridge.arbitrum.io/) se creó para que los usuarios establezcan un puente entre la red principal de Ethereum y Arbitrum de forma práctica. Otros tipos de puentes incluyen Polygon PoS Bridge, [Optimism Getawat](https://app.optimism.io/bridge), etc.
- **Puentes basados en validador u oráculos:** Estos puentes se apoyan en un conjunto de validadores u oráculos externos para validar las transferencias entre cadenas. Ejemplos: Multichain y Across.
- **Puentes de pase de mensajes generalizados:** Estos puentes pueden transferir activos, junto con mensajes y datos arbitrarios entre cadenas. Ejemplos: Axelar, LayerZero y Nomad.
- **Redes de liquidez:** Estos puentes principalmente se enfocan en la transferencia de activos desde una cadena de bloques a otra vía intercambios atómicos. Generalmente, no soportan el envío de mensajes entre cadenas. Ejemplos: Connext y Hop.

## Algunas compensaciones que debe considerar {#trade-offs}

Los puentes no son soluciones perfectas. De hecho, deben sacrificarse algunas cuestiones para el propósito. Desarrolladores y usuarios pueden evaluar los puentes basándose en los siguientes factores:

- **Seguridad:** ¿Quién verifica el sistema? Los puentes asegurados por validadores externos son típicamente menos seguros que los puentes con seguridad local o nativa de los validadores de la cadena de bloques.
- **Conveniencia:** ¿Cuánto tiempo toma completar una transacción, y cuántas transacciones necesitó firmar el usuario? Para un desarrollador, ¿cuánto tiempo se tarda en integrar un puente y qué tan complejo es el proceso?
- **Conectividad:** ¿Cuáles son las diferentes redes de destino que el puente puede conectar (a saber, rollups, redes laterales, otras cadenas de bloque de capa 1, etc.) y qué tan difícil es integrar una nueva cadena de bloques?
- **Habilidad para pasar datos más complejos:** ¿Puede un puente permitir la transferencia de mensajes y datos arbitrarios más complejos a través de cadenas o solo admite transferencias de activos multicadena?
- **Rentabilidad:** ¿Cuánto cuesta transferir activos a través de cadenas mediante un puente? Típicamente, los puentes cobran una comisión fija o variable dependiendo de la tarifa de gas y la liquidez de las rutas específicadas. También es crítico evaluar la rentabilidad de un puente según el capital requerido para garantizar su seguridad.

A un alto nivel, los puentes pueden categorizarse como de confianza y sin confianza.

- **De confianza:** Los puentes de confianza son verificados externamente. Usan un conjunto de verificadores externos (federaciones con multifirma, sistemas computacionales multiparte, redes de oráculos) para enviar los datos a través de las cadenas. Como resultado, pueden ofrecer una gran conectividad y permiten el pase de mensajes completamente generalizado a través de cadenas. También tienden a funcionar con velocidad y rentabilidad. Esto tiene como costo la seguridad, ya que los usuarios tienen que confiar en la seguridad del puente.
- **Sin confianza:** Estos puentes se basan en las cadenas de bloques que conectan y sus validadores para transferir mensajes y tokens. Son "sin confianza" porque no añaden nuevas suposiciones de confianza (además de las cadenas de bloques). Como resultado, los puentes sin confianza se consideran más seguros que los puentes de confianza.

Para evaluar los puentes sin confianza en función de otros factores, debemos dividirlos en puentes de pase de mensajes generalizados y redes de liquidez.

- **Puentes de pase de mensajes generalizados:** Estos puentes son excelentes en materia de seguridad y la capacidad de transferir datos más complejos a través de cadenas. Por lo general, también son buenos en términos de rentabilidad. Sin embargo, estas fortalezas generalmente vienen a expensas de la conectividad para los puentes de clientes ligeros (por ejemplo, IBC) e inconvenientes de velocidad para los puentes optimistas (por ejemplo, Nomad) que utilizan pruebas de fraude.
- **Redes de liquidez:** Estos puentes utilizan intercambios atómicos para transferir activos y son sistemas verificados localmente (es decir, utilizan los validadores de las cadenas de bloques subyacentes para verificar las transacciones). Como resultado, sobresalen por seguridad y velocidad. Además, se consideran comparativamente rentables y ofrecen una buena conectividad. Sin embargo, la principal compensación es su incapacidad para transmitir datos más complejos, ya que no admiten la transmisión de mensajes entre cadenas.

## Riesgo con los puentes {#risk-with-bridges}

Los puentes se asocian a los tres [más importantes hackeos en DeFi](https://rekt.news/leaderboard/) y todavía están en las primeras etapas de desarrollo. El uso de cualquier puente conlleva los siguientes riesgos:

- **Riesgo del contrato inteligente:** Si bien muchos puentes han pasado con éxito las auditorías, todo lo que se necesita es una falla en un contrato inteligente para que los activos estén expuestos a hackeos (por ejemplo: [Wormhole Bridge de Solana](https://rekt.news/wormhole-rekt/)).
- **Riesgos financieros sistémicos:** Muchos puentes utilizan activos envueltos para mintear versiones canónicas del activo original en una nueva cadena. Esto expone al ecosistema a un riesgo sistémico, ya que hemos visto versiones envueltas de tokens explotadas.
- **Riesgo de contraparte:** Algunos puentes utilizan un diseño confiable que requiere que los usuarios confíen en la suposición de que los validadores no harán un complot para robar los fondos de los usuarios. La necesidad de que los usuarios confíen en estos actores de terceros los expone a riesgos como los rug pulls, la censura y otras actividades maliciosas.
- **Problemas abiertos:** Dado que los puentes se encuentran en las primeras etapas de desarrollo, hay muchas preguntas sin respuesta relacionadas con el rendimiento de los puentes en diferentes condiciones del mercado, como los tiempos de congestión de la red, y durante eventos imprevistos, como ataques a nivel de red o reversiones de estado. Esta incertidumbre plantea ciertos riesgos, cuyo grado aún se desconoce.

## ¿Cómo pueden usar los puentes las dapps? {#how-can-dapps-use-bridges}

Estas son algunas aplicaciones prácticas que los desarrolladores pueden considerar sobre los puentes y llevar su dapp a otras cadenas:

### Integración de puentes {#integrating-bridges}

Para los desarrolladores, hay muchas maneras de añadir soporte para puentes:

1. **Construir su propio puente:** Construir un puente seguro y confiable no es fácil, especialmente si toma una ruta más minimizada en cuanto a confianza. Además, esto requiere años de experiencia y conocimientos técnicos relacionados con los estudios de escalabilidad e interoperabilidad. Por otra parte, se requeriría un equipo práctico para mantener un puente y atraer suficiente liquidez para hacerlo viable.

2. **Mostrar a los usuarios múltiples opciones de puente:** Muchas [dapps](/developers/docs/dapps/) requieren que los usuarios tengan su token nativo para interactuar con ellas. Para permitir a los usuarios acceder a sus tokens, ofrecen diferentes opciones de puente en su sitio web. No obstante, este método es una solución rápida al problema, ya que aleja al usuario de la interfaz de la dapp y aun así requiere que interactúe con otras dapps y puentes. Esta es una experiencia de incorporación engorrosa y más propensa a que se cometan errores.

3. **Integración de un puente:** Esta solución no requiere que la dapp envíe a los usuarios a las interfances del puente y el DEX externas. Permite que las dapps mejoren la experiencia de incorporación del usuario. No obstante, este enfoque tiene sus limitaciones:

   - La evaluación y el mantenimiento de puentes son difíciles y requieren mucho tiempo.
   - Seleccionar un puente crea un único punto de falla y dependencia.
   - La dapp está limitada por las capacidades del puente.
   - Los puentes por sí solos podrían no ser suficientes. Las DApps podrían necesitar que los DEX ofrezcan más funcionalidad, como intercambios entre cadenas.

4. **Integración de múltiples puentes:** Esta solución resuelve muchos problemas asociados con la integración de un solo puente. No obstante, también tiene limitaciones, ya que la integración de múltiples puentes consume recursos y crea gastos generales técnicos y de comunicación para los desarrolladores, el recurso más escaso en criptografía.

5. **Integración de un agregador de puentes:** Otra opción para las dapps es la integración de una solución de agregación de puentes que les dé acceso a múltiples puentes. Los agregadores de puentes heredan las fortalezas de todos los puentes y, por lo tanto, no están limitados por las capacidades de un único puente. En particular, los agregadores de puentes suelen mantener las integraciones de puentes, lo que evita a la dapp la molestia de mantenerse al tanto de los aspectos técnicos y operativos de una integración de puente.

Dicho esto, los agregadores de puentes también tienen sus limitaciones. Por ejemplo, si bien pueden ofrecer más opciones de puente, normalmente hay muchos más puentes disponibles en el mercado aparte de los que se ofrecen en la plataforma del agregador. Además, al igual que los puentes, los agregadores de puentes también están expuestos a los riesgos de los contratos inteligentes y la tecnología (más contratos inteligentes = más riesgos).

Si una dapp va por la ruta de integrar un puente o un agregador, hay diferentes opciones en función de la profundidad de la integración. Por ejemplo, si solo se trata de una integración de front-end para mejorar la experiencia de incorporación del usuario, una dapp integraría el widget. Sin embargo, si la integración es para explorar estrategias de cadena cruzada más profundas como el staking, el yield farming, etc., la dapp integra el SDK o la API.

### Implementar una dapp en múltiples cadenas {#deploying-a-dapp-on-multiple-chains}

Para implementar una dapp en múltiples cadenas, los desarrolladores pueden usar plataformas de desarrollo como [Alchemy](https://www.alchemy.com/), [Hardhat](https://hardhat.org/), [Moralis](https://moralis.io/), etc. Por lo general, estas plataformas vienen con complementos componibles que pueden permitir que las dapps se hagan multicadena o se usen en otras. Por ejemplo, los desarrolladores pueden usar un proxy de implementación determinista ofrecido por el [complemento hardhat-deploy](https://github.com/wighawag/hardhat-deploy).

#### Ejemplos:

- [Cómo crear dapps multicadena](https://moralis.io/how-to-build-cross-chain-dapps/)
- [Crear un mercado de NFT entre cadenas](https://youtu.be/WZWCzsB1xUE)
- [Moralis: Creación de dapps de NFT multicadena](https://www.youtube.com/watch?v=ehv70kE1QYo)

### Monitoreo de la actividad de contratos entre cadenas {#monitoring-contract-activity-across-chains}

Para monitorear la actividad de los contratos entre cadenas, los desarrolladores pueden usar subgrafos y plataformas de desarrollador como Tenderly para observar los contratos inteligentes en tiempo real. Estas plataformas también tienen herramientas que ofrecen una mayor funcionalidad de monitoreo de datos para actividades multicadena, como la comprobación de [eventos emitidos por contratos](https://docs.soliditylang.org/en/v0.8.14/contracts.html?highlight=events#events), etc.

#### Herramientas

- [The Graph](https://thegraph.com/en/)
- [Antiguamente](https://tenderly.co/)

## Más información {#further-reading}

- [Puntes de cadena de bloques](/bridges/): ethereum.org
- [Puntes de cadena de bloques: crear redes de redes criptográficas](https://medium.com/1kxnetwork/blockchain-bridges-5db6afac44f8) 8 de septiembre de 2021, Dmitriy Berenzon
- [El trilema de interoperabilidad](https://blog.connext.network/the-interoperability-trilemma-657c2cf69f17) 1 de octubre de 2021, Arjun Bhuptani
- [Clústeres: cómo los puentes de confianza y de confianza minimizada dan forma al panorama multicadena](https://blog.celestia.org/clusters/) 4 de octubre de 2021, Mustafa Al-Bassam
- [LI.FI: con los puentes, la confianza es un espectro](https://blog.li.fi/li-fi-with-bridges-trust-is-a-spectrum-354cd5a1a6d8) 28 de abril de 2022, Arjun Chand

Además, aquí hay algunas presentaciones útiles de [James Prestwich](https://twitter.com/_prestwich) que pueden ayudar a desarrollar una comprensión más profunda de los puentes:

- [Crear puentes, no jardines amurallados](https://youtu.be/ZQJWMiX4hT0)
- [Breaking Down Bridges](https://youtu.be/b0mC-ZqN8Oo)
- [Por qué se están quemando los puentes](https://youtu.be/c7cm2kd20j8)
