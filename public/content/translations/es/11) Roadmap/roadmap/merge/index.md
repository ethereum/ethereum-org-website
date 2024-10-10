---
title: La Fusión
description: Conozca más sobre La Fusión y sobre cuándo la red principal de Ethereum implementará la prueba de participación.
lang: es
template: upgrade
image: /images/upgrades/merge.png
alt:
summaryPoint1: La Red Principal de Ethereum usa prueba de participación, pero este no fue siempre el caso.
summaryPoint2: La actualización del mecanismo original de prueba de trabajo a prueba de participación se denominó "La Fusión".
summaryPoint3: La Fusión se refiere a la fusión de la red principal original de Ethereum con una cadena de bloques de prueba de participación independiente llamada Cadena de Baliza, que ahora existe como una sola cadena.
summaryPoint4: La Fusión redujo el consumo de energía de Ethereum en un ~99,95%.
---

<UpgradeStatus isShipped dateKey="page-upgrades:page-upgrades-beacon-date">
  La Fusión se ejecutó el 15 de septiembre de 2022. Esto completó la transición de Ethereum al consenso de prueba de participación, dejando de lado oficialmente la prueba de trabajo y reduciendo el consumo de energía en un ~99,95%.
</UpgradeStatus>

## ¿Qué es La Fusión? {#what-is-the-merge}

La fusión fue la unión de la capa de ejecución inicial de Ethereum (la red principal que ha existido desde el [génesis](/history/#frontier)) con su nueva capa de consenso de prueba de participación, la cadena de baliza. Eliminó la necesidad de la minería conun consumo intensivo de energía y, en su lugar, permitió asegurar la red utilizando ETH apostados. Es un paso verdaderamente emocionante para hacer la visión de Ethereum una realidad: más escalabilidad, seguridad y sostenibilidad.

<MergeInfographic />

Inicialmente, la [cadena de baliza](/roadmap/beacon-chain/) se lanzó de manera separada de la [red principal](/glossary/#mainnet). La red principal de Ethereum, con todas sus cuentas, balances, contratos inteligentes y estado de la cadena de bloques, continúa siendo asegurdad por el mecanismo de [prueba de participación](/developers/docs/consensus-mechanisms/pow/), incluso cuando la cadena de baliza se ejecuta en paralelo usando la [prueba de participación](/developers/docs/consensus-mechanisms/pos/). La Fusión se produce cuando estos dos sistemas finalmente se unen, siendo la prueba de trabajo permanentemente remplazada por la prueba de participación.

Imagina que Ethereum es una nave espacial que es lanzada antes de estar lista para un viaje interestelar. Con la cadena de baliza, la comunidad construyó un nuevo motor y un chasis más fuerte. Después de muchas pruebas, casi ha llegado el momento de cambiar el nuevo motor por el antiguo en pleno vuelo. De este modo, el nuevo motor, más eficiente, se integrará en la nave existente, preparada para recorrer grandes distancias y conquistar el universo.

## Acoplamiento con la red principal {#merging-with-mainnet}

Prueba de trabajo aseguraba la red principal de Ethereum desde sus orígenes hasta La Fusión. Esto permitió que la cadena de bloques de Ethereum que todos usamos se creara en julio de 2015 con todas sus características familiares: transacciones, contratos inteligentes, cuentas, etc.

A lo largo de la historia de Ethereum, los desarrolladores han trabajado duro para preparar una eventual transición del algoritmo de consenso prueba de trabajo a prueba de participación. El 1 de diciembre de 2020 se creó la cadena de baliza, que desde entonces existe como una cadena de bloques independiente de la red principal, funcionando en paralelo.

La cadena de baliza no ha estado procesando las transacciones de la red principal. En su lugar, ha ido consensuando su propio estado de acuerdo con los validadores activos y los saldos de sus cuentas. Tras numerosas pruebas, ha llegado el momento de que la cadena de baliza alcance el consenso con datos reales. Tras La Fusión, la cadena de baliza se convierte en el motor de consenso para todos los datos de la red, incluyendo las transacciones de capa de ejecución y los balances de cuenta.

La Fusión representa la transición oficial al uso de la cadena de baliza como el mecanismo de producción de bloques. El minado deja de ser el mecanismo de producción de bloques válidos. En lugar de ello, los validadores de la prueba de participación han asumido este rol y ahora son los responsables de procesar la validez de todas transacciones y de proponer nuevos bloques.

El historial no se ha perdido tras La Fusión. Ya que la red principal se fusionó con la cadena de baliza, también se produjo una fusión de todo el historial de transacciones de Ethereum.

<InfoBanner>
Esta transición a la prueba de participación ha cambiado la forma en la que se emiten Ethers. Más información sobre <a href="/roadmap/merge/issuance/">la emisión de ether antes y después de La Fusión</a>.
</InfoBanner>

### Usuarios y titulares {#users-holders}

**La Fusión no cambió nada para los titulares/usuarios.**

_Es necesario repetirlo_: Como usuarios o titulares de ETH o cualquier otro activo digital de Ethereum, así como aquellos participantes que no operan en nodos, **no es necesario realizar ninguna acción relacionada con sus fondos, cartera o cuenta para La Fusión.** ETH sigue siendo ETH. No existirán tales cosas como «old ETH»/«new ETH» ni «ETH1»/«ETH2». Las carteras seguirán funcionando exactamente igual que como lo hacían antes de La Fusión. Las personas que sugieran lo contrario, probablemente sean estafadores.

A pesar de intercambiar la prueba de trabajo y transicionar a la prueba de participación, el historial completo de Ethereum se mantiene intacto y sin alteraciones desde su creación. Todos los fondos que tengas en tu cartera antes de La Fusión siguen siendo accesibles después de la misma. **No se requiere ninguna actualización por su parte.**

[Más información sobre la seguridad de Ethereum](/security/#eth2-token-scam)

### Operadores de nodos y desarrolladores de DApps {#node-operators-dapp-developers}

<ExpandableCard
title="Operadores de nodos de participación y proveedores"
contentPreview="If you are a staker running your own node setup or a node infrastructure provider, there are a few things you need to be aware of after The Merge."
id="staking-node-operators">

Las principales medidas son las siguientes:

1. Ejecutar un cliente de consenso _both_ y un cliente de ejecución; las terminales de terceros para obtener datos de ejecución ya no funcionarán después de La Fusión.
2. Se autenticarán tanto el cliente de ejecución como el de consenso al compartir un JWT secreto que les permite comunicarse entre sí.
3. Establecer una dirección «receptora de la comisión» para recibir las propinas de las comosiones de transacciones ganadas/MEV.

Si no se completan los dos puntos anteriores, el nodo se verá como «desconectado» hasta que ambas capas estén sincronizadas y autenticadas.

Si no se establece un «receptor de las comisiones», el validador seguirá comportandose como de costumbre, pero se perderán las propinas de las comisiones no consumidas y cualquier MEV que se hubiera ganado en los bloques que propone el validador.
</ExpandableCard>

<ExpandableCard
title="Operadores de nodos no validadores y proveedores de infraestructura"
contentPreview="If you're operating a non-validating Ethereum node, the most significant change that came with The Merge was the requirement to run clients for BOTH the execution layer AND the consensus layer."
id="node-operators">

Hasta el momento de La Fusión, un cliente de ejecución (como Geth, Erigon, Besu o Nethermind) era suficiente para recibir, validar y propagar los bloques divulgados por la red principal. _Tras La Fusión_, la validez de las transacciones contenidas en las cargas de ejecución ahora también dependerán de la validación del «bloque de consenso» que estas contienen.

Como resultado de ello, un nodo completo de Ethereum ahora requiere tanto de un cliente de ejecución como de un cliente de consenso. Estos dos clientes trabajan juntos utilizando una nueva Engine API. La Engine API requiere la autenticación mediante un JWT secreto, que se proporciona a ambos clientes permitiendo una comunicación segura.

Las acciones clave incluyen:

- La instalación de un cliente de consenso adicional al cliente de ejecución.
- La autenticación de los clientes de ejecución y consenso con un JWT secreto compartido para permitir que estos se comuniquen entre sí de manera segura.

Si no se completan los pasos anteriores, su nodo aparecerá como «desconectado» hasta que ambas capas estén sincronizadas y autenticadas.

</ExpandableCard>

<ExpandableCard
title="Desarrolladores de DApps y contratos inteligentes"
contentPreview="The Merge was designed to have minimal impact on smart contract and dapp developers."
id="developers">

La Fusión vino con cambios en el consenso, que también incluye cambios relacionados con:<

<ul>
  <li>estructura de bloque</li>
  <li>secuenciación de bloques/ranuras</li>
  <li>cambios en el código operativo</li>
  <li>fuentes de aleatoriedad en cadena</li>
  <li>concepto de <em>cabeza segura</em> y <em>bloques finalizados</em></li>
</ul>

Para obtener más información, eche un vistazo a esta publicación en el blog de Tim Beiko sobre <a href="https://blog.ethereum.org/2021/11/29/how-the-merge-impacts-app-layer/">Cómo afecta La Fusión a la capa de aplicación de Ethereum</a>.

</ExpandableCard>

## La Fusión y el consumo de energía {#merge-and-energy}

La Fusión marcó el final de la prueba de trabajo para Ethereum y dio inicio a la era de un Ethereum más sostenible y ecológico. El consumo de energía de Ethereum se redujo en un 99,95% aproximadamente, haciendo de Ethereum una cadena de bloques ecológica. Más información sobre [el consumo de energía de Ethereum](/energy-consumption/).

## La Fusión y la fragmentación {#merge-and-scaling}

La Fusión coloca a Ethereum en una nueva fase de actualizaciones escalables que no podrían realizarse bajo el mecanismo de prueba de trabajo, lo que permite que Ethereum dé un paso importante en la consecución de los objetivos de escalabilidad, seguridad y sustentabilidad contenidos en la [Visión de Ethereum](/roadmap/vision/).

## Conceptos erróneos sobre La Fusión {#misconceptions}

<ExpandableCard
title="Concepto erróneo: &quot;Ejecutar un nodo requiere depositar 32 ETH.&quot;"
contentPreview="False. Anyone is free to sync their own self-verified copy of Ethereum (i.e. run a node). No ETH is required—not before The Merge, not after The Merge, not ever.">

Hay dos tipos de nodos en Ethereum: los que pueden proponer bloques y los que no.

Los nodos que proponen bloques son solo un pequeño número total de todos los nodos de Ethereum. Esta categoría incluye los nodos mineros bajo prueba de trabajo (PoW) y los nodos validadores bajo prueba de participación (PoS). Esta categoría requiere comprometer recursos económicos (como el poder de hash de la GPU en una prueba de trabajo o ETH depositado en prueba de participación) a cambio de poder proponer ocasionalmente el siguiente bloque y ganar recompensas del protocolo.

Los demás nodos de la red (es decir, la mayoría) no necesitan comprometer ningún recurso económico más allá de un ordenador de consumo con 1-2 TB de almacenamiento disponible y una conexión a Internet. Estos nodos no proponen bloques, pero siguen desempeñando un papel fundamental en la seguridad de la red, al tener un registro de todos los nodos que sí proponen bloques analizando la inclusión de nuevos y verificando su validez a su llegada, de acuerdo con las reglas de consenso de la red. Si el bloque es válido, el nodo continúa propagándolo por la red. Si el bloque no es válido por cualquier motivo, el software del nodo lo ignorará como no válido y detendrá su propagación.

Cualquier persona bajo cualquier mecanismo de consenso (prueba de trabajo o prueba de participación) puede ejecutar un nodo que no produzca bloques; se <em>recomienda encarecidamente</em> para todos los usuarios si tienen los medios. Ejecutar un nodo es inmensamente valioso para Ethereum y aporta beneficios adicionales a cualquier persona que ejecute uno, como la mejora de la seguridad, la privacidad y la resistencia a la censura.

La capacidad de cualquier persona tiene de ejecutar su propio nodo es <em>absolutamente esencial</em> para mantener la descentralización de la red Ethereum.

<a href="/run-a-node/">Más información sobre cómo ejecutar su propio nodo.</a>

</ExpandableCard>

<ExpandableCard
title="Concepto erróneo: &quot;La Fusión falló en la reducción de la tarifa de gas.&quot;"
contentPreview="False. The Merge was a change of consensus mechanism, not an expansion of network capacity, and was never intended to lower gas fees.">

Las tarifas de gas son producto de la demanda de la red en relación con la capacidad de la misma. La Fusión dejó obsoleto el uso del mecanismo de prueba de trabajo, permitiendo la transición a la prueba de participación para el consenso, pero no cambió de manera significativa ninguno de los parámetros que influyen de manera directa la capacidad o rendimiento de la red.

Con una <a href="https://ethereum-magicians.org/t/a-rollup-centric-ethereum-roadmap/4698">hoja de ruta centrada en las acumulaciones</a>, los esfuerzos se están centrando en escalar la actividad del usuario en la <a href="/layer-2/">capa 2</a>, al tiempo que se le permite la red principal de la capa 1 ser una capa de liquidación descentralizada segura optimizada para el almacenamiento de datos de la acumulación y así ayudar a hacer que las transacciones sean exponencialmente más baratas. La transición a la prueba de participación es un precursor fundamental para conseguirlo. <a href="/developers/docs/gas/">Más información sobre el gas y las tarifas. </a>

</ExpandableCard>

<ExpandableCard
title="Concepto erróneo: &quot;Las transacciones se aceleraron sustancialmente tras La Fusión.&quot;"
contentPreview="False. Though some slight changes exist, transaction speed is mostly the same on layer 1 now as it was before The Merge.">
La «velocidad» de una transacción puede medirse de varias maneras, incluyendo el tiempo de inclusión en un bloque y el tiempo de finalización. Ambas cosas cambian ligeramente, aunque no de forma perceptible para los usuarios.

Históricamente, en la prueba de trabajo, el objetivo era tener un nuevo bloque cada ~13,3 segundos. Con la prueba de participación, los intervalos ocurren cada 12 segundos, y cada uno de ellos constituye una oportunidad para que el validador publique un bloque. La mayoría de las ranuras tienen bloques, aunque no necesariamente todos (por ejemplo , un validador está desconectado). Con la prueba de participación, los bloques se producen con más de 10 % de frecuencia en comparación con la prueba de trabajo. Esto es un cambio relativamente insignificante, con pocas probabilidades de ser percibido por los usuarios.

La prueba de participación introduce el concepto de finalidad de la transacción que no existía anteriormente. Con la prueba de trabajo, la posibilidad de revertir un bloque se hace exponencialmente más difícil, con cada bloque aprobado siendo minado como complemento de la transacción, aunque nunca suele llegar a cero. En la prueba de participación, los bloques se agrupan en épocas (periodos de tiempo de 6,4 minutos que contienen 32 oportunidades para los bloques) que los validadores votan. Cuando termina una época, los validadores votan si la consideran «justificada». Si los validadores están de acuerdo en justificarla, se finaliza en la siguiente. Deshacer las transacciones finalizadas es económicamente inviable ya que requeriría obtener y quemar más de un tercio del total de ETH depositado.

</ExpandableCard>

<ExpandableCard
title="Concepto erróneo: &quot;La Fusión habilitará los retiros de la participación.&quot;"
contentPreview="False, but staking withdrawals have since been enabled via the Shanghai/Capella upgrade.">

Inicialmente, después de La Fusión, los participantes solo podían acceder a las propinas de tarifas y MEV que se ganaban como resultado de las propuestas de bloques. Estas recompensas se acreditan a una cuenta sin participación controlada por el validador (conocida como el <em>destinatario de la tarifa</em>), y están disponibles de inmediato. Estas recompensas están separadas de las recompensas del protocolo para realizar las tareas de validación.

Desde la mejora de la red Shanghai/Capella, los participantes pueden designar una <em>dirección de retirada</em> para comenzar a recibir pagos automáticos de cualquier saldo en exceso (más de 32 ETH por recompensas del protocolo). Esta actualización también permitió a los validadores desbloquear y reclamar el total de su saldo al salir de la red.

<a href="/staking/withdrawals/">Más información sobre la retirada de participaciones.</a>

</ExpandableCard>

<ExpandableCard
title="Ideas erróneas: &quot;ahora que se ha completado La Fusión y las retiradas se han activado, los participantes pueden salir todos a la vez.&quot;"
contentPreview="False. Validator exits are rate limited for security reasons.">
Desde que la actualización Shanghai/Capella activó las retiradas, los validadores tienen el incentivo de retirar su saldo excedente de participación por encima de los 32 ETH, pues estos fondos no suman al rendimiento y sólo están bloqueados. Dependiendo de la tasa efectiva anual (o APR, según sus siglas en inglés), que viene determinada por el total de ETH depositado, se puede animar a su(s) validadores a reclamar todo su saldo o potencialmente apostar aún más usando sus recompensas para ganar más rendimiento.

Un detalle importante que cabe recalcar es que el ritmo de las salidas de un validador total las limita el protocolo, y sólo puede salir cierto número de validadores por época (cada 6,4 minutos). Este límite fluctúa dependiendo del número de validadores activos, pero llega a aproximadamente el 0,33 % del total de ETH en participación que puede salir de la red en un solo día.

Esto evita un éxodo masivo de fondos en participación. Además, evita que un potencial atacante con acceso a una gran parte del total de ETH en participación actúe de mala fe y que se pueda recortar/retirar todo el saldo del validador causante en la misma época, antes de que el protocolo pueda hacer cumplir la penalización mediante recorte.

La APR también es intencionalmente dinámica, lo que permite a un mercado de participantes equilibrar cuánto están dispuestos a que se les pague para ayudar a proteger la red. Si la tasa es muy baja, los validadores se retirarán a un ritmo limitado por el protocolo. Poco a poco, esto aumentará la APR para todos los que se queden, atrayendo a nuevos participantes o a los que regresen.
</ExpandableCard>

## ¿Qué pasó con «Eth2»? {#eth2}

El término «Eth2» ha quedado obsoleto. Al fusionar Eth1 y Eth2 en una sola cadena, no hay necesidad de distinguir entre dos redes de Ethereum; es solo Ethereum.

Para evitar mayor confusión, la comunidad ha actualizado estos términos:

- «Eth1» es ahora la«capa de ejecución», que se encarga de las transacciones y ejecución.
- «Eth2» ahora es la «capa de consenso», que maneja el consenso de prueba de participación.

Estas actualizaciones de terminología solo cambian la nomenclatura, no alteran los objetivos ni el itinerario de Ethereum.

[Más información acerca del cambio de nombre a «Eth2»](https://blog.ethereum.org/2022/01/24/the-great-eth2-renaming/)

## Relación entre actualizaciones {#relationship-between-upgrades}

Las actualizaciones de Ethereum están interrelacionadas de alguna manera. Recapitulemos pues, sobre cómo se relaciona La Fusión con otras actualizaciones.

### La Fusión y la cadena de baliza {#merge-and-beacon-chain}

La Fusión representa la adopción formal de la cadena de baliza como la nueva capa de consenso de la capa de ejecución original de la red principal. Desde La Fusión, se asignan validadores para proteger la red principal de Ethereum y el minado de la [prueba de trabajo](/developers/docs/consensus-mechanisms/pow/) deja de ser el medio válido para la producción de bloques.

En su lugar, los bloques serán propuestos desde un nodo validado que tenga ETH apostados a cambio del derecho de participar en el consenso. Estas actualizaciones sientan las bases para futuras mejoras de escalabilidad, incluida la fragmentación.

<ButtonLink href="/roadmap/beacon-chain/">
  La cadena de baliza
</ButtonLink>

### La Fusión y actualización Shanghai {#merge-and-shanghai}

Con la intención de simplificar y maximizar los esfuerzos centrados en una transición fructífera a la prueba de participación, la actualización de La Fusión no incluirá algunas características previamente anticipadas, como la posibilidad de retirar ETH apostados. Esta funcionalidad se habilitó de forma separada con la actualización Shanghai/Capella.

Aquellos que quieran saber más, pueden ver la charla [Lo que ocurrirá después de La Fusión](https://youtu.be/7ggwLccuN5s?t=101), que dio Vitalik, en el evento ETHGlobal en abril de 2021.

### La fusión y la fragmentación {#merge-and-data-sharding}

Originalmente, el plan era trabajar en la fragmentación antes de La Fusión para abordar la escalabilidad. No obstante, con la proliferación de las [soluciones escalables de capa 2](/layer-2/), las prioridades se reorientaron a pasar de prueba de trabajo a prueba de participación.

Los planes de fragmentación están evolucionando rápidamente, pero dado el auge y el éxito de las tecnologías de capa 2 para escalar la ejecución de transacciones, los planes de fragmentación han pasado a buscar la forma más óptima de distribuir la carga de almacenar los datos comprimidos de las llamadas procedentes de las acumulaciones, permitiendo un crecimiento exponencial de la capacidad de la red. Esto no sería posible sin pasar primero a la prueba de participación.

<ButtonLink href="/roadmap/danksharding/">
  Fragmentación
</ButtonLink>

## Más información {#further-reading}

<MergeArticleList />

<QuizWidget quizKey="merge" />
