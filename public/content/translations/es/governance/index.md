---
title: Introducción a la gobernanza de Ethereum
metaTitle: Gobernanza de Ethereum
description: Una introducción a cómo se toman las decisiones sobre Ethereum.
lang: es
---

_Si nadie es dueño de [Ethereum](/), ¿cómo se toman las decisiones sobre los cambios pasados y futuros en Ethereum? La gobernanza de Ethereum se refiere al proceso que permite tomar dichas decisiones._

<Divider />

## ¿Qué es la gobernanza? {#what-is-governance}

La gobernanza son los sistemas establecidos que permiten la toma de decisiones. En una estructura organizativa típica, el equipo ejecutivo o una junta directiva pueden tener la última palabra en la toma de decisiones. O tal vez los accionistas emiten su voto sobre las propuestas para promulgar cambios. En un sistema político, los funcionarios electos pueden promulgar leyes que intentan representar los deseos de sus electores.

## Gobernanza descentralizada {#decentralized-governance}

Ninguna persona posee o controla el protocolo de Ethereum, pero aún así es necesario tomar decisiones sobre la implementación de cambios para garantizar de la mejor manera la longevidad y prosperidad de la red. Esta falta de propiedad hace que la gobernanza organizativa tradicional sea una solución incompatible.

## Gobernanza de Ethereum {#ethereum-governance}

La gobernanza de Ethereum es el proceso mediante el cual se realizan cambios en el protocolo. Es importante señalar que este proceso no está relacionado con cómo las personas y las aplicaciones usan el protocolo: Ethereum es sin permisos. Cualquier persona de cualquier parte del mundo puede participar en actividades en cadena. No hay reglas establecidas sobre quién puede o no puede construir una aplicación o enviar una transacción. Sin embargo, existe un proceso para proponer cambios al protocolo principal, sobre el cual se ejecutan las aplicaciones descentralizadas (dapps). Dado que tantas personas dependen de la estabilidad de Ethereum, existe un umbral de coordinación muy alto para los cambios principales, que incluye procesos sociales y técnicos, para garantizar que cualquier cambio en Ethereum sea seguro y cuente con un amplio apoyo de la comunidad.

<VideoWatch slug="ethereum-core-governance-explained" />

### Gobernanza en cadena frente a fuera de la cadena {#onchain-vs-offchain}

La tecnología de cadena de bloques permite nuevas capacidades de gobernanza, conocidas como gobernanza en cadena. La gobernanza en cadena se da cuando los cambios propuestos al protocolo se deciden mediante el voto de las partes interesadas, generalmente por los titulares de un token de gobernanza, y la votación se lleva a cabo en la cadena de bloques. Con algunas formas de gobernanza en cadena, los cambios propuestos al protocolo ya están escritos en código y se implementan automáticamente si las partes interesadas deciden aprobar los cambios mediante la firma de una transacción.

El enfoque opuesto, la gobernanza fuera de la cadena, es donde cualquier decisión de cambio de protocolo ocurre a través de un proceso informal de discusión social, que, de aprobarse, se implementaría en el código.

**La gobernanza de Ethereum ocurre fuera de la cadena** con una amplia variedad de partes interesadas involucradas en el proceso.

_Aunque a nivel de protocolo la gobernanza de Ethereum es fuera de la cadena, muchos casos de uso construidos sobre Ethereum, como las DAO, utilizan la gobernanza en cadena._

<ButtonLink href="/dao/">
  Más sobre las DAO
</ButtonLink>

<Divider />

## ¿Quiénes participan? {#who-is-involved}

Hay varias partes interesadas en la [comunidad de Ethereum](/community/), y cada una desempeña un papel en el proceso de gobernanza. Empezando por las partes interesadas más alejadas del protocolo y acercándonos, tenemos:

- **Titulares de ether**: estas personas poseen una cantidad arbitraria de ETH. [Más sobre ETH](/what-is-ether/).
- **Usuarios de aplicaciones**: estas personas interactúan con aplicaciones en la cadena de bloques de Ethereum.
- **Desarrolladores de aplicaciones/herramientas**: estas personas escriben aplicaciones que se ejecutan en la cadena de bloques de Ethereum (por ejemplo, finanzas descentralizadas (DeFi), NFT, etc.) o construyen herramientas para interactuar con Ethereum (por ejemplo, billeteras, conjuntos de pruebas, etc.). [Más sobre las dapps](/apps/).
- **Operadores de nodos**: estas personas ejecutan nodos que propagan bloques y transacciones, rechazando cualquier transacción o bloque no válido que encuentren. [Más sobre los nodos](/developers/docs/nodes-and-clients/).
- **Autores de EIP**: estas personas proponen cambios al protocolo de Ethereum, en forma de Propuestas de Mejora de Ethereum (EIP). [Más sobre las EIP](/eips/).
- **Validadores**: estas personas ejecutan nodos que pueden agregar nuevos bloques a la cadena de bloques de Ethereum.
- **Desarrolladores del protocolo** (también conocidos como "desarrolladores principales"): estas personas mantienen las diversas implementaciones de Ethereum (por ejemplo, go-ethereum, Nethermind, Besu, Erigon, Reth en la capa de ejecución o Prysm, Lighthouse, Nimbus, Teku, Lodestar, Grandine en la capa de consenso). [Más sobre los clientes de Ethereum](/developers/docs/nodes-and-clients/).

_Nota: cualquier individuo puede formar parte de varios de estos grupos (por ejemplo, un desarrollador del protocolo podría liderar una EIP, ejecutar un validador de la cadena de balizas y usar aplicaciones DeFi). Sin embargo, para mayor claridad conceptual, es más fácil distinguirlos._

<Divider />

## ¿Qué es una EIP? {#what-is-an-eip}

Un proceso importante utilizado en la gobernanza de Ethereum es la presentación de **Propuestas de Mejora de Ethereum (EIP)**. Las EIP son estándares que especifican posibles nuevas características o procesos para Ethereum. Cualquier persona dentro de la comunidad de Ethereum puede crear una EIP. Si le interesa escribir una EIP o participar en la revisión por pares y/o en la gobernanza, consulte:

<ButtonLink href="/eips/">
  Más sobre las EIP
</ButtonLink>

<Divider />

## El proceso formal {#formal-process}

El proceso formal para introducir cambios en el protocolo de Ethereum es el siguiente:

1. **Proponer una EIP principal**: como se describe en la [EIP-1](https://eips.ethereum.org/EIPS/eip-1#core-eips), el primer paso para proponer formalmente un cambio en Ethereum es detallarlo en una EIP principal (Core EIP). Esta actuará como la especificación oficial para una EIP que los desarrolladores del protocolo implementarán si es aceptada.

2. **Presentar su EIP a los desarrolladores del protocolo**: una vez que tenga una EIP principal para la cual haya recopilado los comentarios de la comunidad, debe presentarla a los desarrolladores del protocolo. Puede hacerlo proponiéndola para su discusión en una [llamada de AllCoreDevs](https://github.com/ethereum/execution-specs/tree/master/network-upgrades#getting-the-considered-for-inclusion-cfi-status). Es probable que algunas discusiones ya hayan tenido lugar de forma asincrónica en el [foro de Ethereum Magicians](https://ethereum-magicians.org/) o en el [Discord de I+D de Ethereum](https://discord.gg/mncqtgVSVw).

> Los posibles resultados de esta etapa son:

> - La EIP será considerada para una futura actualización de la red
> - Se solicitarán cambios técnicos
> - Puede ser rechazada si no es una prioridad o si la mejora no es lo suficientemente grande en relación con el esfuerzo de desarrollo

3. **Iterar hacia una propuesta final:** después de recibir comentarios de todas las partes interesadas relevantes, es probable que deba realizar cambios en su propuesta inicial para mejorar su seguridad o satisfacer mejor las necesidades de los diversos usuarios. Una vez que su EIP haya incorporado todos los cambios que considere necesarios, deberá presentarla nuevamente a los desarrolladores del protocolo. Luego pasará al siguiente paso de este proceso, o surgirán nuevas inquietudes que requerirán otra ronda de iteraciones en su propuesta.

4. **EIP incluida en la actualización de la red**: asumiendo que la EIP es aprobada, probada e implementada, se programa como parte de una actualización de la red. Dados los altos costos de coordinación de las actualizaciones de la red (todos deben actualizar simultáneamente), las EIP generalmente se agrupan en las actualizaciones.

5. **Actualización de la red activada**: después de que se active la actualización de la red, la EIP estará activa en la red de Ethereum. _Nota: las actualizaciones de la red generalmente se activan en redes de prueba antes de activarse en la red principal de Ethereum._

Este flujo, aunque muy simplificado, ofrece una visión general de las etapas significativas para que un cambio de protocolo se active en Ethereum. Ahora, veamos los factores informales en juego durante este proceso.

## El proceso informal {#informal-process}

### Comprender el trabajo previo {#prior-work}

Los defensores de las EIP deben familiarizarse con el trabajo y las propuestas previas antes de crear una EIP que pueda ser considerada seriamente para su despliegue en la red principal de Ethereum. De esta manera, se espera que la EIP aporte algo nuevo que no haya sido rechazado antes. Los tres lugares principales para investigar esto son el [repositorio de EIP](https://github.com/ethereum/EIPs), [Ethereum Magicians](https://ethereum-magicians.org/) y [ethresear.ch](https://ethresear.ch/).

### Grupos de trabajo {#working-groups}

Es poco probable que el borrador inicial de una EIP se implemente en la red principal de Ethereum sin ediciones o cambios. Por lo general, los defensores de las EIP trabajarán con un subconjunto de desarrolladores del protocolo para especificar, implementar, probar, iterar y finalizar su propuesta. Históricamente, estos grupos de trabajo han requerido varios meses (¡y a veces años!) de trabajo. Del mismo modo, los defensores de las EIP para tales cambios deben involucrar a los desarrolladores de aplicaciones/herramientas relevantes al principio de sus esfuerzos para recopilar comentarios de los usuarios finales y mitigar cualquier riesgo de despliegue.

### Consenso de la comunidad {#community-consensus}

Si bien algunas EIP son mejoras técnicas directas con matices mínimos, otras son más complejas y conllevan compensaciones que afectarán a las diferentes partes interesadas de diferentes maneras. Esto significa que algunas EIP son más polémicas dentro de la comunidad que otras.

No hay un manual claro sobre cómo manejar propuestas polémicas. Este es el resultado del diseño descentralizado de Ethereum, por el cual ningún grupo de partes interesadas puede coaccionar al otro mediante la fuerza bruta: los desarrolladores del protocolo pueden optar por no implementar cambios en el código; los operadores de nodos pueden optar por no ejecutar el último cliente de Ethereum; los equipos de aplicaciones y los usuarios pueden optar por no realizar transacciones en la cadena. Dado que los desarrolladores del protocolo no tienen forma de obligar a las personas a adoptar las actualizaciones de la red, generalmente evitarán implementar EIP donde la polémica supere los beneficios para la comunidad en general.

Se espera que los defensores de las EIP soliciten comentarios de todas las partes interesadas relevantes. Si se encuentra defendiendo una EIP polémica, debe intentar abordar las objeciones para generar consenso en torno a su EIP. Dado el tamaño y la diversidad de la comunidad de Ethereum, no existe una métrica única (por ejemplo, una votación con monedas) que pueda usarse para medir el consenso de la comunidad, y se espera que los defensores de las EIP se adapten a las circunstancias de su propuesta.

Más allá de la seguridad de la red de Ethereum, históricamente los desarrolladores del protocolo han dado un peso significativo a lo que valoran los desarrolladores de aplicaciones/herramientas y los usuarios de aplicaciones, dado que su uso y desarrollo en Ethereum es lo que hace que el ecosistema sea atractivo para otras partes interesadas. Además, las EIP deben implementarse en todas las implementaciones de clientes, que son administradas por equipos distintos. Parte de este proceso generalmente significa convencer a múltiples equipos de desarrolladores del protocolo de que un cambio en particular es valioso y que ayuda a los usuarios finales o resuelve un problema de seguridad.

<Divider />

## Manejo de desacuerdos {#disagreements}

Tener muchas partes interesadas con diferentes motivaciones y creencias significa que los desacuerdos no son infrecuentes.

Por lo general, los desacuerdos se manejan con discusiones extensas en foros públicos para comprender la raíz del problema y permitir que cualquiera opine. Típicamente, un grupo cede o se logra un punto medio. Si un grupo tiene una postura lo suficientemente firme, forzar un cambio en particular podría resultar en una división de la cadena. Una división de la cadena ocurre cuando algunas partes interesadas protestan por la implementación de un cambio de protocolo, lo que resulta en el funcionamiento de versiones diferentes e incompatibles del protocolo, de las cuales surgen dos cadenas de bloques distintas.

### La bifurcación de la DAO {#dao-fork}

Las bifurcaciones ocurren cuando se deben realizar actualizaciones o cambios técnicos importantes en la red y cambian las "reglas" del protocolo. Los [clientes de Ethereum](/developers/docs/nodes-and-clients/) deben actualizar su software para implementar las nuevas reglas de la bifurcación.

La bifurcación de la DAO fue en respuesta al [ataque a la DAO de 2016](https://www.coindesk.com/learn/understanding-the-dao-attack), donde un contrato inseguro de la [DAO](/glossary/#dao) fue vaciado de más de 3,6 millones de ETH en un hackeo. La bifurcación movió los fondos del contrato defectuoso a un nuevo contrato, lo que permitió a cualquier persona que perdió fondos en el hackeo recuperarlos.

Este curso de acción fue votado por la comunidad de Ethereum. Cualquier titular de ETH pudo emitir su voto a través de una transacción en [una plataforma de votación](https://web.archive.org/web/20170620030820/http://v1.carbonvote.com/). La decisión de realizar la bifurcación alcanzó más del 85 % de los votos.

Es importante tener en cuenta que, si bien el protocolo se bifurcó para revertir el hackeo, el peso que tuvo el voto en la decisión de la bifurcación es debatible por algunas razones:

- La participación en la votación fue increíblemente baja
- La mayoría de las personas no sabían que se estaba llevando a cabo la votación
- El voto solo representó a los titulares de ETH, no a ninguno de los otros participantes en el sistema

Un subconjunto de la comunidad se negó a la bifurcación, en gran parte porque sentían que el incidente de la DAO no era un defecto en el protocolo. Luego pasaron a formar [Ethereum Classic](https://ethereumclassic.org/).

Hoy en día, la comunidad de Ethereum ha adoptado una política de no intervención en casos de errores en los contratos o pérdida de fondos para mantener la neutralidad creíble del sistema.

Vea más sobre el hackeo de la DAO:

<VideoWatch slug="dao-hack-ethereum-classic" />

<Divider />

### La utilidad de la bifurcación {#forking-utility}

La bifurcación de Ethereum/Ethereum Classic es un excelente ejemplo de una bifurcación saludable. Teníamos dos grupos que discrepaban lo suficientemente fuerte entre sí sobre algunos valores fundamentales como para sentir que valía la pena asumir los riesgos involucrados para seguir sus cursos de acción específicos.

La capacidad de bifurcación frente a diferencias políticas, filosóficas o económicas significativas juega un papel importante en el éxito de la gobernanza de Ethereum. Sin la capacidad de bifurcación, la alternativa era una lucha interna continua, la participación forzada y renuente de aquellos que finalmente formaron Ethereum Classic y una visión cada vez más diferente de cómo se ve el éxito para Ethereum.

<Divider />

## Gobernanza de la cadena de balizas {#beacon-chain}

El proceso de gobernanza de Ethereum a menudo sacrifica la velocidad y la eficiencia en favor de la apertura y la inclusión. Para acelerar el desarrollo de la cadena de balizas, se lanzó por separado de la red de Ethereum de prueba de trabajo (PoW) y siguió sus propias prácticas de gobernanza.

Si bien la especificación y las implementaciones de desarrollo siempre han sido de código abierto, no se utilizaron los procesos formales para proponer actualizaciones descritos anteriormente. Esto permitió que los investigadores y los implementadores especificaran y acordaran los cambios más rápidamente.

Cuando la cadena de balizas se fusionó con la capa de ejecución de Ethereum el 15 de septiembre de 2022, La Fusión se completó como parte de la [actualización de la red Paris](/ethereum-forks/#paris). La propuesta [EIP-3675](https://eips.ethereum.org/EIPS/eip-3675) cambió de 'Última llamada' a 'Final', completando la transición a la prueba de participación (PoS).

<ButtonLink href="/roadmap/merge/">
  Más sobre La Fusión
</ButtonLink>

<Divider />

## ¿Cómo puedo participar? {#get-involved}

- [Proponer una EIP](/eips/#participate)
- [Discutir las propuestas actuales](https://ethereum-magicians.org/)
- [Participar en la discusión de I+D](https://ethresear.ch/)
- [Unirse al Discord de I+D de Ethereum](https://discord.gg/mncqtgVSVw)
- [Ejecutar un nodo](/developers/docs/nodes-and-clients/run-a-node/)
- [Contribuir al desarrollo de clientes](/developers/docs/nodes-and-clients/#execution-clients)
- [Programa de aprendizaje para desarrolladores principales](https://blog.ethereum.org/2021/09/06/core-dev-apprenticeship-second-cohort)

## Lecturas adicionales {#further-reading}

La gobernanza en Ethereum no está rígidamente definida. Varios participantes de la comunidad tienen diversas perspectivas al respecto. Aquí hay algunas de ellas:

- [Notas sobre la gobernanza de la cadena de bloques](https://vitalik.eth.limo/general/2017/12/17/voting.html) - _Vitalik Buterin_
- [¿Cómo funciona la gobernanza de Ethereum?](https://cryptotesters.com/blog/ethereum-governance) – _Cryptotesters_
- [Cómo funciona la gobernanza de Ethereum](https://medium.com/coinmonks/how-ethereum-governance-works-71856426b63a) – _Micah Zoltu_
- [¿Qué es un desarrollador principal de Ethereum?](https://hudsonjameson.com/posts/2020-06-22-what-is-an-ethereum-core-developer/) - _Hudson Jameson_
- [Gobernanza, parte 2: la plutocracia sigue siendo mala](https://vitalik.eth.limo/general/2018/03/28/plutocracy.html) - _Vitalik Buterin_
- [Ir más allá de la gobernanza de votación con monedas](https://vitalik.eth.limo/general/2021/08/16/voting3.html) - _Vitalik Buterin_
- [Comprender la gobernanza de la cadena de bloques](https://web.archive.org/web/20250124192731/https://research.2077.xyz/understanding-blockchain-governance) - _2077 Research_
- [El gobierno de Ethereum](https://www.galaxy.com/insights/research/ethereum-governance/) - _Christine Kim_