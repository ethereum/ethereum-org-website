---
title: Gobernanza de Ethereum
description: Introducción sobre cómo se toman las decisiones relativas a Ethereum
lang: es
postMergeBannerTranslation: page-upgrades-post-merge-banner-governance-ood
---

# Introducción a la gobernanza de Ethereum {#introduction}

_Si Ethereum no le pertenece a nadie, ¿cómo se toman las decisiones sobre los cambios pasados y futuros? La gobernanza de Ethereum se refiere al proceso por el cual se toman tales decisiones._

<Divider />

## ¿Qué es la gobernanza? {#what-is-governance}

La gobernanza es el sistema por el cual se toman las decisiones. En una estructura organizacional típica, el equipo o junta directivos son los que tienen la última palabra en la toma de decisiones. También puede suceder que los accionistas voten para implementar algún cambio. En un sistema político, los funcionarios electos legislan para representar los deseos de sus electores.

## Gobernanza descentralizada {#decentralized-governance}

Ninguna persona controla el protocolo de Ethereum; sin embargo, eso no quita que deban tomarse decisiones acerca de la implementación de cambios con el objeto de asegurar la longevidad y prosperidad de la red. La ausencia de un control central hace de la gobernanza organizativa tradicional una solución poco viable.

## Gobernanza de Ethereum {#ethereum-governance}

La gobernanza de Ethereum es el proceso mediante el cual se realizan cambios en el protocolo. Es importante señalar que este proceso no está relacionado con el uso que la gente y las aplicaciones hacen del protocolo: Ethereum es una red pública. Cualquier individuo, independientemente de su procedencia, puede participar en actividades desarrolladas en la cadena de bloques. No hay reglas establecidas con respecto a quién puede o no puede crear una aplicación o realizar una transacción. Sin embargo, existe un proceso para proponer cambios en el protocolo central, sobre el que se ejecutan las aplicaciones descentralizadas. Puesto que tanta gente depende de la estabilidad de Ethereum, existen unos estrictos criterios de coordinación aplicables a los cambios fundamentales, que incluyen procesos sociales y técnicos. El objetivo es garantizar que cualquier cambio en Ethereum sea seguro y cuente con el respaldo unánime de la comunidad.

### Gobernanza «on-chain» frente a gobernanza «off-chain» {#on-chain-vs-off-chain}

La tecnología de cadenas de bloques abre la posibilidad a nuevas opciones de gobernanza, conocidas como gobernanza «on-chain» o dentro de la cadena. La gobernanza dentro de la cadena se da cuando las propuestas de cambios en el protocolo se deciden mediante los votos de las partes interesadas. Por lo general, estos actores son los tenedores de un token de gobernanza y la votación ocurre en la cadena de bloques. En algunas formas de gobernanza en cadena, los cambios de protocolo propuestos ya están escritos en código y se implementan automáticamente si las partes interesadas aprueban los cambios.

El enfoque opuesto, la gobernanza «off-chain» o externa a la cadena, consiste en que cualquier decisión de modificación del protocolo se produce a través de un proceso informal de debate social que, de aprobarse, se aplicaría en código.

**La gobernanza de Ethereum ocurre externa a la cadena** y una amplia variedad de actores intervienen en el proceso.

_A pesar de que siguiendo el protocolo, la gobernanza de Ethereum se desarrolla externa a la cadena de bloques, muchos casos de uso que se ejecutan sobre la red Ethereum, como las DAO, se sirven de la gobernanza dentro de la cadena._

<ButtonLink to="/dao/">
  Más información acerca de las DAO
</ButtonLink>

<Divider />

## ¿Quiénes son los participantes? {#who-is-involved}

En la [comunidad Ethereum](/community/), hay diversos actores y cada uno cumple una función en el proceso de gobernanza. Desde los actores más desvinculados del protocolo hasta los que exhiben un mayor nivel de participación, encontramos los siguientes:

- **Tenedores de ether**: personas que tienen una cantidad arbitraria de ETH. [Más información sobre ETH](/eth/).
- **Usuarios de aplicaciones**: estas personas interactúan con aplicaciones en la cadena de bloques de Ethereum.
- **Desarrolladores de aplicaciones o herramientas**: estas personas programan aplicaciones que se ejecutan en la cadena de bloques de Ethereum (p. ej., DeFi, NFT, etc.) o diseñan herramientas para interactuar con Ethereum (p. ej., carteras, series de pruebas, etc.). [Más información sobre DApps](/dapps/).
- **Operadores de nodos**: estas personas ejecutan nodos que propagan bloques y transacciones y rechazan cualquier transacción o bloque inválido con el que se encuentren. [Más información sobre los nodos](/developers/docs/nodes-and-clients/).
- **Autores de EIP**: estas personas proponen cambios en el protocolo Ethereum en calidad de propuestas de mejora de Ethereum (EIP, «Ethereum Improvement Proposals»). [Más información sobre las EIP](/eips/).
- **Validadores**: estas personas ejecutan nodos que pueden añadir nuevos bloques a la cadena de bloques de Ethereum.
- **Desarrolladores del protocolo** (también conocidos como «desarrolladores principales» ): estas personas mantienen las diversas implementaciones de Ethereum (p. ej., go-ethereum, mind, Besu, Erigon en la capa de ejecución, o Prisma, Lighthouse, Nimbus, Teku, Lodestar en la capa de consenso). [Más información sobre los clientes de Ethereum](/developers/docs/nodes-and-clients/).

_Nota: cualquier persona puede ser parte de varios de estos grupos (p. ej., un desarrollador de protocolos podría abogar por una EIP, ejecutar un validador de la cadena de baliza y utilizar aplicaciones DeFi). Sin embargo, por motivos de claridad conceptual, resulta más práctico hacer una distinción entre ellos._

<Divider />

## ¿Qué es una EIP? {#what-is-an-eip}

Un proceso importante utilizado en la gobernanza Ethereum son las **propuestas de mejora de Ethereum (EIP, «Ethereum Improvement Proposals»)**. Las EIP son estándares que especifican posibles nuevas características o procesos para Ethereum. Cualquier persona dentro de la comunidad Ethereum puede formular una EIP. Si le interesa escribir una EIP o participar en una revisión entre pares, vea:

<ButtonLink to="/eips/">
  Más información sobre las EIP
</ButtonLink>

<Divider />

## Procedimiento formal {#formal-process}

El procedimiento formal para realizar cambios en el protocolo de Ethereum es el siguiente:

1. **Proponer una EIP central**: tal como se describe en [EIP-1](https://eips.ethereum.org/EIPS/eip-1#core-eips), el primer paso para proponer formalmente un cambio en Ethereum es detallarlo en una EIP central. Esto servirá como la especificación oficial de una EIP que los desarrolladores de protocolos implementarán si se acepta.

2. **Presentar la EIP a los desarrolladores de protocolos**: una vez que tenga una EIP central para la cual haya recibido contribuciones de la comunidad, debería presentársela a los desarrolladores de protocolo. Para ello, puede proponer que se someta a debate en una [llamada en AllCoreDevs](https://github.com/ethereum/execution-specs/tree/master/network-upgrades#getting-the-considered-for-inclusion-cfi-status). Es posible que, para ese entonces, ya se hayan originado debates de forma asíncrona en el [foro Ethereum Magicians](https://ethereum-magicians.org/) o en [el canal de Discord Ethereum R&D](https://discord.gg/mncqtgVSVw).

> Las consecuencias probables de esta etapa son las siguientes:

> - La EIP se tendrá en cuenta para una futura actualización de la red
> - Se solicitarán cambios técnicos
> - Puede ser rechazada si no es una prioridad o la mejora planteada no es lo suficientemente significativa si se tienen en cuenta los esfuerzos de desarrollo que conlleva.

3. **Elaborar la propuesta final:** después de recibir comentarios de todos los actores pertinentes, puede que necesite hacer cambios en la propuesta inicial para mejorar su seguridad o satisfacer más adecuadamente las necesidades de varios usuarios. Una vez que se haya incorporado a la EIP todos los cambios que considere necesarios, tendrá que presentársela a los desarrolladores de protocolo nuevamente. Es ahí cuando se avanza a la siguiente etapa del proceso. Es posible, sin embargo, que se generen nuevas inquietudes, lo que amerite otra ronda de debates en torno a su propuesta.

4. **Incluir la EIP en la actualización de la red**: suponiendo que se apruebe, pruebe o implemente la EIP, se programará su incorporación a la actualización de la red. Dados los altos costos de coordinación de las actualizaciones de la red (todos necesitan actualizar simultáneamente), las EIP generalmente se agrupan en las actualizaciones.

5. **Activar la actualización de la red:** después de activar la actualización de la red, la EIP entrará en funcionamiento dentro de la red Ethereum. _Nota: las actualizaciones de red generalmente se activan en redes de prueba antes de ser activadas en la red principal de Ethereum._

Esta secuencia, aunque muy simplificada, da una visión general de las etapas significativas para que un cambio de protocolo se active en Ethereum. Ahora, veamos los factores informales que están en juego durante este proceso.

## Procedimiento informal {#informal-process}

### Comprensión del trabajo previo {#prior-work}

Los defensores de una determinada EIP deberían familiarizarse con el trabajo y las propuestas previas antes de crear una EIP que pueda llegar a considerarse seriamente para su implementación en la red principal de Ethereum. De esta forma, la EIP traerá consigo una idea novedosa que no se haya rechazado anteriormente. Los tres lugares principales para estas investigaciones son: el [repositorio de EIP](https://github.com/ethereum/EIPs), [Ethereum Magicians](https://ethereum-magicians.org/) y [ethinvestig.ch](https://ethresear.ch/).

### Grupos de trabajo {#working-groups}

Es poco probable que el borrador inicial de una EIP se implemente en la red principal de Ethereum sin modificaciones ni cambios. Por lo general, los defensores de una EIP trabajarán con un subconjunto de desarrolladores del protocolo para especificar, implementar, probar, iterar y finalizar la propuesta. Históricamente, estos grupos de trabajo han requerido varios meses (y a veces años) de trabajo. De manera similar, para tales cambios los defensores de la EIP deben involucrar a los desarrolladores de aplicaciones/herramientas relevantes al principio de sus esfuerzos para recopilar comentarios de los usuarios finales y mitigar los riesgos de implementación.

### Consenso comunitario {#community-consensus}

Si bien algunas EIP son simples mejoras técnicas con matices mínimos, otras son más complejas y constituyen soluciones intermedias que afectarán a distintos actores de diferentes maneras. Esto significa que algunas EIP serán más polémicas dentro de la comunidad que otras.

No hay un proceso definido sobre cómo tratar propuestas polémicas. Este es el resultado del diseño descentralizado de Ethereum, en el cual ningún grupo de partes interesadas puede coaccionar al otro a través de la fuerza bruta: los desarrolladores de protocolos pueden elegir no implementar cambios de código; los operadores de nodos pueden elegir no ejecutar el último cliente de Ethereum; los equipos de aplicaciones y los usuarios pueden elegir no transaccionar en la cadena. Dado que los desarrolladores de protocolos no pueden forzar a la gente a adoptar actualizaciones de la red, por lo general, evitarán la implementación de EIP si los puntos controversiales pesan más que los beneficios que pueden aportar a la comunidad en general.

Se espera que los defensores de la EIP soliciten una devolución de parte de todos los actores. Si en algún momento usted es el defensor de una EIP polémica, debería intentar lidiar con las objeciones con el fin de generar un consenso en torno a la EIP. Dado el tamaño y la diversidad de la comunidad Ethereum, no hay una sola medida (p. ej. un voto ejercido con una moneda) que puede ser utilizada para determinar el consenso comunitario, y se espera que los defensores de la EIP se adapten a las circunstancias de su propuesta.

Además de centrarse en la seguridad de la red Ethereum, históricamente los desarrolladores del protocolo le han asignado gran importancia a lo que los desarrolladores de aplicaciones y herramientas y los usuarios valoran. Esto se debe a que el desarrollo en Ethereum, así como su uso, es lo que hace al ecosistema atractivo a otras personas. Adicionalmente, las EIP deben aplicarse en todas las implementaciones, las cuales son gestionadas por distintos equipos. Parte de este proceso generalmente implica convencer a varios equipos de desarrolladores del protocolo de que un cambio específico es valioso y que traería beneficios para los usuarios o resolvería problemas de seguridad.

<Divider />

## Gestión de los desacuerdos {#disagreements}

El hecho de que existan muchas partes interesadas con diferentes motivaciones y creencias significa que los desacuerdos no son inusuales.

Por lo general, los desacuerdos se tratan en discusiones extensas en foros de acceso público con el fin de entender la raíz del problema y permitir que cualquier persona pueda aportar sus ideas. Usualmente, uno de los grupos del debate capitula o se alcanza un punto intermedio. Si un grupo se siente lo suficientemente fuerte, forzar un cambio en particular podría resultar en una división de la cadena de bloques. Una separación de la cadena se da cuando las partes involucradas se ponen de acuerdo para generar un cambio en el protocolo, donde, en consecuencia, se generan dos versiones incompatibles del mismo; generando dos cadenas de bloque diferentes.

### La bifurcación de una DAO {#dao-fork}

Las bifurcaciones se dan cuando hay mejoras técnicas o modificaciones que cambian las reglas del juego en el protocolo. Los [clientes de Ethereum](/developers/docs/nodes-and-clients/) deben actualizar su software para implementar las nuevas reglas establecidas en la bifurcación.

La bifurcación de una DAO surgió en respuesta al [ataque de una DAO en 2016](https://www.coindesk.com/understanding-dao-hack-journalists), donde un contrato inseguro de una [DAO](/glossary/#dao) fue drenado por más de 3,6 millones de ETH en un hack. La bifurcación movió los fondos desde el contrato corrompido a un nuevo contrato, permitiendo que las personas que perdieron sus fondos, los recuperaran.

Esta acción fue votada por la comunidad Ethereum. Cualquier poseedor de ETH pudo votar a través de una transacción en [una plataforma de votación](http://v1.carbonvote.com/). La decisión de bifurcar obtuvo más del 85 % de los votos.

Es importante destacar que a pesar de que el protocolo efectivamente se bifurcó para revertir el ataque, el peso que el voto tenía en decidir la separación es debatible por varias razones:

- La participación de voto fue extremadamente baja.
- Gran parte de las personas ni se enteró de que la votación se llevó a cabo.
- El voto solo representó a las personas que poseían ETH, no a los demás participantes del sistema.

Una parte de la comunidad se rehusaba a la bifurcación, más que nada porque sentían que el incidente de la DAO no había sido un defecto del protocolo. Pasaron a formar [Ethereum Classic](https://ethereumclassic.org/).

Hoy en día, la comunidad de Ethereum adoptó una política de no intervención ante casos de errores en contrato o fondos perdidos para mantener la credibilidad neutral del sistema.

Más información del hack a la DAO

<YouTube id="rNeLuBOVe8A" />

<Divider />

### La utilidad de las bifurcaciones {#forking-utility}

La bifurcación de Ethereum/Ethereum Classic es un excelente ejemplo de una separación fructífera. Había dos grupos que no estaban de acuerdo con valores clave para pensar que era necesario pasar por los riesgos involucrados con el fin de cumplir con sus intereses.

La habilidad de bifurcar en relación a desacuerdos políticos, económicos y filosóficos juega un rol fundamental en la gobernanza de Ethereum. Sin la posibilidad de bifurcar, la alternativa era un desacuerdo constante para las personas que formaban Ethereum Classic y una visión completamente diferente de cuál era la vía correcta para Ethereum.

<Divider />

## Gobernanza de la cadena de baliza (Beacon) {#beacon-chain}

El proceso de gobernanza de Ethereum usualmente cambia velocidad y eficiencia por inclusión y honestidad. Con el fin de acelerar el desarrollo de la cadena de baliza, esta fue lanzada de forma separada a la red de Ethereum, que utiliza prueba de trabajo, y siguió sus propias reglas y gobernanza.

Si bien la especificación y las implementaciones de desarrollo siempre han sido totalmente de código abierto, no se utilizaron los procesos formales arriba descritos para proponer actualizaciones. Esto permitió que los investigadores y los implementadores especificaran los cambios y los acordaran más rápidamente.

Cuando la cadena de baliza se fusionó con la capa de ejecución de Ethereum el 15 de septiembre de 2022, La fusión se completó como parte de la [actualización de la red París](/history/#paris). La propuesta [EIP-3675](https://eips.ethereum.org/EIPS/eip-3675) se cambió de "Última llamada" a "Final", completando la transición a la prueba de participación.

<ButtonLink to="/roadmap/merge/">
  Más sobre la fusión
</ButtonLink>

<Divider />

## ¿Cómo puedo involucrarme? {#get-involved}

- [Proponga una EIP](/eips/#participate)
- [Debata sobre las propuestas actuales](https://ethereum-magicians.org/)
- [Involúcrese en el debate R&D](https://ethresear.ch/)
- [Únase al Discord de Ethereum R&D](https://discord.gg/mncqtgVSVw)
- [Ejecute un nodo](/developers/docs/nodes-and-clients/run-a-node/)
- [Contribuya al desarrollo del cliente](/developers/docs/nodes-and-clients/#execution-clients)
- [Programa de aprendizaje del desarrollador principal](https://blog.ethereum.org/2021/09/06/core-dev-apprenticeship-second-cohort/)

## Más información {#further-reading}

La gobernanza en Ethereum no está estrictamente definida. Muchos participantes de la comunidad tienen diversas perspectivas al respecto. Aquí nombramos algunas de ellas:

- [Notas sobre la gobernanza de la cadena de bloques](https://vitalik.eth.limo/general/2017/12/17/voting.html), _Vitalik Buterin_
- [¿Cómo funciona la gobernanza de Ethereum?](https://cryptotesters.com/blog/ethereum-governance) – _Cryptotesters_
- [Cómo funciona la gobernanza de Ethereum](https://medium.com/coinmonks/how-ethereum-governance-works-71856426b63a) - _Micah Zoltu_
- [¿Qué es un desarrollador del núcleo de Ethereum?](https://hudsonjameson.com/2020-06-22-what-is-an-ethereum-core-developer/) - _Hudson Jameson_
- [Gobernanza, parte 2: La plutocracia todavía es mala](https://vitalik.eth.limo/general/2018/03/28/plutocracy.html), _Vitalik Buterin_
- [Más allá de la gobernanza de la votación de monedas](https://vitalik.eth.limo/general/2021/08/16/voting3.html), _Vitalik Buterin_
