---
title: Gobernanza de Ethereum
description: Introducción sobre cómo se toman las decisiones relativas a Ethereum
lang: es
---

# Introducción a la gobernanza de Ethereum {#introduction}

_Si Ethereum no le pertenece a nadie, ¿cómo se toman las decisiones sobre los cambios pasados y futuros? La gobernanza de Ethereum se refiere al proceso por el cual se toman tales decisiones._

<Divider />

## ¿Qué es la gobernanza? {#what-is-governance}

La gobernanza es el sistema por el cual se toman las decisiones. En una estructura organizacional típica, el equipo o junta directivos son los que tienen la última palabra en la toma de decisiones. También puede suceder que los accionistas voten para implementar algún cambio. En un sistema político, los funcionarios electos legislan para representar los deseos de sus electores.

## Gobernanza descentralizada {#decentralized-governance}

Ninguna persona controla el protocolo de Ethereum; sin embargo, eso no quita que deban tomarse decisiones acerca de la implementación de cambios con el objeto de asegurar la longevidad y prosperidad de la red. La ausencia de un control central hace de la gobernanza organizativa tradicional una solución poco viable.

## Gobernanza de Ethereum {#ethereum-governance}

La gobernanza de Ethereum es el proceso mediante el cual se realizan cambios en el protocolo. Es importante señalar que este proceso no está relacionado con el uso que la gente y las aplicaciones hacen del protocolo: Ethereum es una red pública. Cualquier persona de cualquier parte del mundo puede participar en actividades en cadena. No hay reglas establecidas con respecto a quién puede o no puede crear una aplicación o realizar una transacción. Sin embargo, existe un proceso para proponer cambios en el protocolo central, sobre el que se ejecutan las aplicaciones descentralizadas. Puesto que tanta gente depende de la estabilidad de Ethereum, existen unos estrictos criterios de coordinación aplicables a los cambios fundamentales, que incluyen procesos sociales y técnicos. El objetivo es garantizar que cualquier cambio en Ethereum sea seguro y cuente con el respaldo unánime de la comunidad.

### Gobernanza dentro de la cadena vs. fuera de la cadena {#onchain-vs-offchain}

La tecnología de cadena de bloques permite nuevas posibilidades de gobernanza, lo que se conoce como gobernanza en cadena. La gobernanza en cadena ocurre cuando propuestas de cambios en el protocolo se deciden por una votación de las partes interesadas, normalmente tenedores de un token de gobernanza, y la votación ocurre en la cadena de bloques. En algunas formas de gobernanza en cadena, los cambios de protocolo propuestos ya están escritos en código y se implementan automáticamente si las partes interesadas aprueban los cambios firmando una transacción.

El enfoque opuesto, la gobernanza fuera de cadena, es cuando cualquier decisión de modificación del protocolo se produce a través de un proceso informal de debate social, que, de aprobarse, se implementaría en el código.

**La gobernanza de Ethereum ocurre fuera de la cadena**, con una amplia variedad de partes interesadas involucradas en el proceso.

_A pesar de que a nivel de protocolo la gobernanza de Ethereum se realiza fuera de cadena, muchos casos de uso construidos sobre Ethereum, como las DAO, se sirven de la gobernanza en cadena._

<ButtonLink href="/dao/">
  Más sobre DAOs
</ButtonLink>

<Divider />

## ¿Quién participa en este proceso? {#who-is-involved}

Existen varios actores en la [comunidad de Ethereum](/community/), cada uno desempeñando un papel en el proceso de gobernanza. Desde los actores más desvinculados del protocolo hasta los que exhiben un mayor nivel de participación, encontramos los siguientes:

- **Tenedores de ether**: estas personas poseen una cantidad arbitraria de ETH. [Más sobre ETH](/eth/).
- **Usuarios de aplicaciones**: estas personas interactúan con aplicaciones en la blockchain de Ethereum.
- **Desarrolladores de aplicaciones/herramientas**: estas personas escriben aplicaciones que se ejecutan en la blockchain de Ethereum (por ejemplo, DeFi, NFT, etc.) o crean herramientas para interactuar con Ethereum (por ejemplo, wallets, suites de pruebas, etc.). [Más sobre dapps](/apps/).
- **Operadores de nodos**: estas personas ejecutan nodos que propagan bloques y transacciones, rechazando cualquier transacción o bloque inválido que encuentren. [Más sobre nodos](/developers/docs/nodes-and-clients/).
- **Autores de EIP**: estas personas proponen cambios al protocolo de Ethereum, en forma de Propuestas de Mejora de Ethereum (EIPs). [Más sobre EIPs](/eips/).
- **Validadores**: estas personas ejecutan nodos que pueden agregar nuevos bloques a la blockchain de Ethereum.
- **Desarrolladores del protocolo** (también conocidos como "Desarrolladores principales"): estas personas mantienen las distintas implementaciones de Ethereum (por ejemplo, go-ethereum, Nethermind, Besu, Erigon, Reth en la capa de ejecución o Prysm, Lighthouse, Nimbus, Teku, Lodestar, Grandine en la capa de consenso). [Más sobre los clientes de Ethereum](/developers/docs/nodes-and-clients/).

_Nota: cualquier persona puede formar parte de varios de estos grupos (por ejemplo, una persona desarrolladora del protocolo podría liderar una EIP, ejecutar un validador de la beacon chain y usar aplicaciones DeFi). Sin embargo, por motivos de claridad conceptual, resulta más práctico hacer una distinción entre ellos._

<Divider />

## ¿Qué es una EIP? {#what-is-an-eip}

Un proceso importante usado en la gobernanza de Ethereum es la propuesta de **Propuestas de Mejora de Ethereum (EIPs)**. Las EIP son estándares que especifican posibles nuevas características o procesos para Ethereum. Cualquier persona dentro de la comunidad Ethereum puede formular una EIP. Si le interesa escribir una EIP o participar en una revisión entre pares, vea:

<ButtonLink href="/eips/">
  Más sobre las EIP
</ButtonLink>

<Divider />

## El proceso formal {#formal-process}

El procedimiento formal para realizar cambios en el protocolo de Ethereum es el siguiente:

1. **Proponer una EIP Core**: como se describe en [EIP-1](https://eips.ethereum.org/EIPS/eip-1#core-eips), el primer paso para proponer formalmente un cambio a Ethereum es detallarlo en una EIP Core. Esto servirá como la especificación oficial de una EIP que los desarrolladores de protocolos implementarán si se acepta.

2. **Presentar tu EIP a los desarrolladores del protocolo**: una vez que tengas una EIP Core para la que has reunido comentarios de la comunidad, debes presentarla a los desarrolladores del protocolo. Puedes hacerlo proponiéndola para discusión en una [llamada de AllCoreDevs](https://github.com/ethereum/execution-specs/tree/master/network-upgrades#getting-the-considered-for-inclusion-cfi-status). Es probable que algunas discusiones ya hayan sucedido de manera asíncrona en el [foro de Ethereum Magicians](https://ethereum-magicians.org/) o en el [Discord de Ethereum R&D](https://discord.gg/mncqtgVSVw).

> Las consecuencias probables de esta etapa son las siguientes:

> - La EIP se tendrá en cuenta para una futura actualización de la red
> - Se solicitarán cambios técnicos
> - Puede ser rechazada si no es una prioridad o la mejora planteada no es lo suficientemente significativa si se tienen en cuenta los esfuerzos de desarrollo que conlleva.

3. **Iterar hacia una propuesta final:** después de recibir comentarios de todas las partes interesadas relevantes, probablemente tendrás que hacer cambios a tu propuesta inicial para mejorar su seguridad o ajustarla mejor a las necesidades de distintos usuarios. Una vez que se haya incorporado a la EIP todos los cambios que considere necesarios, tendrá que presentársela a los desarrolladores de protocolo nuevamente. Es ahí cuando se avanza a la siguiente etapa del proceso. Es posible, sin embargo, que se generen nuevas inquietudes, lo que amerite otra ronda de debates en torno a su propuesta.

4. **EIP incluida en la actualización de red**: si la EIP es aprobada, probada e implementada, se agenda como parte de una actualización de red. Dados los altos costos de coordinación de las actualizaciones de la red (todos necesitan actualizar simultáneamente), las EIP generalmente se agrupan en las actualizaciones.

5. **Actualización de red activada**: después de que la actualización de red esté activa, la EIP estará operativa en la red de Ethereum. _Nota: las actualizaciones de red generalmente se activan en redes de prueba antes de ser activadas en la red principal de Ethereum._

Esta secuencia, aunque muy simplificada, da una visión general de las etapas significativas para que un cambio de protocolo se active en Ethereum. Ahora, veamos los factores informales que están en juego durante este proceso.

## El proceso informal {#informal-process}

### Comprender el trabajo previo {#prior-work}

Los defensores de una determinada EIP deberían familiarizarse con el trabajo y las propuestas previas antes de crear una EIP que pueda llegar a considerarse seriamente para su implementación en la red principal de Ethereum. De esta forma, la EIP traerá consigo una idea novedosa que no se haya rechazado anteriormente. Los tres principales lugares para investigar esto son el [repositorio de EIP](https://github.com/ethereum/EIPs), [Ethereum Magicians](https://ethereum-magicians.org/) y [ethresear.ch](https://ethresear.ch/).

### Grupos de trabajo {#working-groups}

Es poco probable que el borrador inicial de una EIP se implemente en la red principal de Ethereum sin modificaciones ni cambios. Por lo general, los defensores de una EIP trabajarán con un subconjunto de desarrolladores del protocolo para especificar, implementar, probar, iterar y finalizar la propuesta. Históricamente, estos grupos de trabajo han requerido varios meses (y a veces años) de trabajo. De manera similar, para tales cambios los defensores de la EIP deben involucrar a los desarrolladores de aplicaciones/herramientas relevantes al principio de sus esfuerzos para recopilar comentarios de los usuarios finales y mitigar los riesgos de implementación.

### Consenso de la comunidad {#community-consensus}

Si bien algunas EIP son simples mejoras técnicas con matices mínimos, otras son más complejas y constituyen soluciones intermedias que afectarán a distintos actores de diferentes maneras. Esto significa que algunas EIP serán más polémicas dentro de la comunidad que otras.

No hay un proceso definido sobre cómo tratar propuestas polémicas. Este es el resultado del diseño descentralizado de Ethereum, en el cual ningún grupo de partes interesadas puede coaccionar al otro a través de la fuerza bruta: los desarrolladores de protocolos pueden elegir no implementar cambios de código; los operadores de nodos pueden elegir no ejecutar el último cliente de Ethereum; los equipos de aplicaciones y los usuarios pueden elegir no transaccionar en la cadena. Dado que los desarrolladores de protocolos no pueden forzar a la gente a adoptar actualizaciones de la red, por lo general, evitarán la implementación de EIP si los puntos controversiales pesan más que los beneficios que pueden aportar a la comunidad en general.

Se espera que los defensores de la EIP soliciten una devolución de parte de todos los actores. Si en algún momento usted es el defensor de una EIP polémica, debería intentar lidiar con las objeciones con el fin de generar un consenso en torno a la EIP. Dado el tamaño y la diversidad de la comunidad de Ethereum, no existe una única métrica (por ejemplo, una votación por monedas) que pueda usarse para medir el consenso de la comunidad, y se espera que quienes lideran una EIP se adapten a las circunstancias de su propuesta.

Además de centrarse en la seguridad de la red Ethereum, históricamente los desarrolladores del protocolo le han asignado gran importancia a lo que los desarrolladores de aplicaciones y herramientas y los usuarios valoran. Esto se debe a que el desarrollo en Ethereum, así como su uso, es lo que hace al ecosistema atractivo a otras personas. Adicionalmente, las EIP deben aplicarse en todas las implementaciones, las cuales son gestionadas por distintos equipos. Parte de este proceso generalmente implica convencer a varios equipos de desarrolladores del protocolo de que un cambio específico es valioso y que traería beneficios para los usuarios o resolvería problemas de seguridad.

<Divider />

## Cómo gestionar desacuerdos {#disagreements}

El hecho de que existan muchas partes interesadas con diferentes motivaciones y creencias significa que los desacuerdos no son inusuales.

Por lo general, los desacuerdos se tratan en discusiones extensas en foros de acceso público con el fin de entender la raíz del problema y permitir que cualquier persona pueda aportar sus ideas. Usualmente, uno de los grupos del debate capitula o se alcanza un punto intermedio. Si un grupo se siente lo suficientemente fuerte, forzar un cambio en particular podría resultar en una división de la cadena de bloques. Una separación de la cadena se da cuando las partes involucradas se ponen de acuerdo para generar un cambio en el protocolo, donde, en consecuencia, se generan dos versiones incompatibles del mismo; generando dos cadenas de bloque diferentes.

### La bifurcación de la DAO {#dao-fork}

Las bifurcaciones se dan cuando hay mejoras técnicas o modificaciones que cambian las reglas del juego en el protocolo. [Clientes de Ethereum](/developers/docs/nodes-and-clients/) deben actualizar su software para implementar las nuevas reglas de la bifurcación.

La bifurcación de la DAO fue en respuesta al [ataque a la DAO en 2016](https://www.coindesk.com/learn/understanding-the-dao-attack), donde un contrato [DAO](/glossary/#dao) inseguro fue vaciado de más de 3,6 millones de ETH mediante un hackeo. La bifurcación movió los fondos desde el contrato corrompido a un nuevo contrato, permitiendo que las personas que perdieron sus fondos, los recuperaran.

Esta acción fue votada por la comunidad Ethereum. Cualquier tenedor de ETH pudo votar mediante una transacción en [una plataforma de votación](https://web.archive.org/web/20170620030820/http://v1.carbonvote.com/). La decisión de realizar un fork obtuvo más del 85 % de los votos.

Es importante destacar que a pesar de que el protocolo efectivamente se bifurcó para revertir el ataque, el peso que el voto tenía en decidir la separación es debatible por varias razones:

- La participación de voto fue extremadamente baja.
- Gran parte de las personas ni se enteró de que la votación se llevó a cabo.
- El voto solo representó a las personas que poseían ETH, no a los demás participantes del sistema.

Una parte de la comunidad se rehusaba a la bifurcación, más que nada porque sentían que el incidente de la DAO no había sido un defecto del protocolo. Fueron quienes formaron [Ethereum Classic](https://ethereumclassic.org/).

Hoy en día, la comunidad de Ethereum adoptó una política de no intervención ante casos de errores en contrato o fondos perdidos para mantener la credibilidad neutral del sistema.

Más información del hack a la DAO

<YouTube id="rNeLuBOVe8A" />

<Divider />

### La utilidad de las bifurcaciones {#forking-utility}

La bifurcación de Ethereum/Ethereum Classic es un excelente ejemplo de una separación fructífera. Había dos grupos que no estaban de acuerdo con valores clave para pensar que era necesario pasar por los riesgos involucrados con el fin de cumplir con sus intereses.

La habilidad de bifurcar en relación a desacuerdos políticos, económicos y filosóficos juega un rol fundamental en la gobernanza de Ethereum. Sin la posibilidad de bifurcar, la alternativa era un desacuerdo constante para las personas que formaban Ethereum Classic y una visión completamente diferente de cuál era la vía correcta para Ethereum.

<Divider />

## Gobernanza de la Beacon Chain {#beacon-chain}

El proceso de gobernanza de Ethereum usualmente cambia velocidad y eficiencia por inclusión y honestidad. Con el fin de acelerar el desarrollo de la cadena de baliza, esta fue lanzada de forma separada a la red de Ethereum, que utiliza prueba de trabajo, y siguió sus propias reglas y gobernanza.

Si bien la especificación y las implementaciones de desarrollo siempre han sido totalmente de código abierto, no se utilizaron los procesos formales arriba descritos para proponer actualizaciones. Esto permitió que los investigadores y los implementadores especificaran los cambios y los acordaran más rápidamente.

Cuando la Beacon Chain se fusionó con la capa de ejecución de Ethereum el 15 de septiembre de 2022, se completó The Merge como parte de la [actualización de red París](/ethereum-forks/#paris). La propuesta [EIP-3675](https://eips.ethereum.org/EIPS/eip-3675) fue cambiada de 'Last Call' a 'Final', completando la transición a prueba de participación (proof of stake).

<ButtonLink href="/roadmap/merge/">
  Más sobre The Merge
</ButtonLink>

<Divider />

## ¿Cómo puedo involucrarme? {#get-involved}

- [Proponer una EIP](/eips/#participate)
- [Discutir propuestas actuales](https://ethereum-magicians.org/)
- [Participar en la discusión de I+D](https://ethresear.ch/)
- [Unirse al Discord de I+D de Ethereum](https://discord.gg/mncqtgVSVw)
- [Ejecutar un nodo](/developers/docs/nodes-and-clients/run-a-node/)
- [Contribuir al desarrollo de clientes](/developers/docs/nodes-and-clients/#execution-clients)
- [Programa de Aprendizaje para Desarrolladores Principales](https://blog.ethereum.org/2021/09/06/core-dev-apprenticeship-second-cohort/)

## Lecturas adicionales {#further-reading}

La gobernanza en Ethereum no está estrictamente definida. Muchos participantes de la comunidad tienen diversas perspectivas al respecto. He aquí algunas de ellas:

- [Notas sobre la gobernanza de blockchain](https://vitalik.eth.limo/general/2017/12/17/voting.html) - _Vitalik Buterin_
- [¿Cómo funciona la gobernanza de Ethereum?](https://cryptotesters.com/blog/ethereum-governance) – _Cryptotesters_
- [Cómo funciona la gobernanza de Ethereum](https://medium.com/coinmonks/how-ethereum-governance-works-71856426b63a) – _Micah Zoltu_
- [¿Qué es un desarrollador principal de Ethereum?](https://hudsonjameson.com/2020-06-22-what-is-an-ethereum-core-developer/) - _Hudson Jameson_
- [Gobernanza, Parte 2: La plutocracia sigue siendo mala](https://vitalik.eth.limo/general/2018/03/28/plutocracy.html) - _Vitalik Buterin_
- [Más allá de la gobernanza por votación con tokens](https://vitalik.eth.limo/general/2021/08/16/voting3.html) - _Vitalik Buterin_
- [Entendiendo la gobernanza blockchain](https://web.archive.org/web/20250124192731/https://research.2077.xyz/understanding-blockchain-governance) - _2077 Research_
- [El gobierno de Ethereum](https://www.galaxy.com/insights/research/ethereum-governance/) - _Christine Kim_
