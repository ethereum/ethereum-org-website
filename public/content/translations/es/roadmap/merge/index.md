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

La Fusión fue la unión de la capa de ejecución original de Ethereum (la Mainnet que ha existido desde el [génesis](/history/#frontier)) con su nueva capa de consenso proof-of-stake, la Beacon Chain. Eliminó la necesidad de la minería conun consumo intensivo de energía y, en su lugar, permitió asegurar la red utilizando ETH apostados. Es un paso verdaderamente emocionante para hacer la visión de Ethereum una realidad: más escalabilidad, seguridad y sostenibilidad.

<MergeInfographic />

Inicialmente, la [Beacon Chain](/roadmap/beacon-chain/) se lanzó por separado de la [Mainnet](/glossary/#mainnet). La Mainnet de Ethereum - con todas sus cuentas, balances, contratos inteligentes y estado de la blockchain - continuó asegurada mediante [proof-of-work](/developers/docs/consensus-mechanisms/pow/), incluso mientras la Beacon Chain funcionaba en paralelo utilizando [proof-of-stake](/developers/docs/consensus-mechanisms/pos/). La Fusión se produce cuando estos dos sistemas finalmente se unen, siendo la prueba de trabajo permanentemente remplazada por la prueba de participación.

Imagina que Ethereum es una nave espacial que es lanzada antes de estar lista para un viaje interestelar. Con la cadena de baliza, la comunidad construyó un nuevo motor y un chasis más fuerte. Después de muchas pruebas, casi ha llegado el momento de cambiar el nuevo motor por el antiguo en pleno vuelo. Esto integró el nuevo y más eficiente motor en la nave existente, permitiéndole recorrer grandes distancias y enfrentar el universo.

## Fusión con Mainnet {#merging-with-mainnet}

Prueba de trabajo aseguraba la red principal de Ethereum desde sus orígenes hasta La Fusión. Esto permitió que la blockchain de Ethereum que todos conocemos existiera desde julio de 2015 con todas sus características familiares: transacciones, contratos inteligentes, cuentas, etc.

A lo largo de la historia de Ethereum, los desarrolladores han trabajado duro para preparar una eventual transición del algoritmo de consenso prueba de trabajo a prueba de participación. El 1 de diciembre de 2020 se creó la cadena de baliza, que desde entonces existe como una cadena de bloques independiente de la red principal, funcionando en paralelo.

La cadena de baliza no ha estado procesando las transacciones de la red principal. En su lugar, ha ido consensuando su propio estado de acuerdo con los validadores activos y los saldos de sus cuentas. Tras numerosas pruebas, ha llegado el momento de que la cadena de baliza alcance el consenso con datos reales. Tras La Fusión, la cadena de baliza se convierte en el motor de consenso para todos los datos de la red, incluyendo las transacciones de capa de ejecución y los balances de cuenta.

La Fusión representa la transición oficial al uso de la cadena de baliza como el mecanismo de producción de bloques. El minado deja de ser el mecanismo de producción de bloques válidos. En lugar de ello, los validadores de la prueba de participación han asumido este rol y ahora son los responsables de procesar la validez de todas transacciones y de proponer nuevos bloques.

El historial no se ha perdido tras La Fusión. Ya que la red principal se fusionó con la cadena de baliza, también se produjo una fusión de todo el historial de transacciones de Ethereum.

<Alert variant="update">
<AlertContent>
<AlertDescription>
Esta transición a la prueba de participación ha cambiado la forma en la que se emiten Ethers. Aprende más sobre [la emisión de ether antes y después de The Merge](/roadmap/merge/issuance/).
</AlertDescription>
</AlertContent>
</Alert>

### Usuarios y poseedores {#users-holders}

**La Fusión no cambió nada para los titulares/usuarios.**

_Esto merece repetirse_: Como usuario o poseedor de ETH o cualquier otro activo digital en Ethereum, así como stakeadores que no operan nodos, **no necesita hacer nada con sus fondos o billetera para tener en cuenta la Fusión.** ETH sigue siendo solo ETH. No existirán tales cosas como «old ETH»/«new ETH» ni «ETH1»/«ETH2». Las carteras seguirán funcionando exactamente igual que como lo hacían antes de La Fusión. Las personas que sugieran lo contrario, probablemente sean estafadores.

A pesar de intercambiar la prueba de trabajo y transicionar a la prueba de participación, el historial completo de Ethereum se mantiene intacto y sin alteraciones desde su creación. Todos los fondos que tengas en tu cartera antes de La Fusión siguen siendo accesibles después de la misma. **No se requiere ninguna actualización por su parte.**

[Más sobre seguridad en Ethereum](/security/#eth2-token-scam)

### Operadores de nodos y desarrolladores de dapps {#node-operators-dapp-developers}

<ExpandableCard
title="Staking node operators and providers"
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
title="Non-validating node operators and infrastructure providers"
contentPreview="If you're operating a non-validating Ethereum node, the most significant change that came with The Merge was the requirement to run clients for BOTH the execution layer AND the consensus layer."
id="node-operators">

Hasta el momento de La Fusión, un cliente de ejecución (como Geth, Erigon, Besu o Nethermind) era suficiente para recibir, validar y propagar los bloques divulgados por la red principal. _Tras La Fusión_, la validez de las transacciones contenidas en las cargas de ejecución ahora también dependerán de la validación del «bloque de consenso» que estas contienen.

Como resultado de ello, un nodo completo de Ethereum ahora requiere tanto de un cliente de ejecución como de un cliente de consenso. Estos dos clientes trabajan juntos utilizando una nueva Engine API. La Engine API requiere la autenticación mediante un JWT secreto, que se proporciona a ambos clientes permitiendo una comunicación segura.

Las principales medidas son las siguientes:

- Instale un cliente de consenso además de un cliente de ejecución
- Autentique los clientes de ejecución y consenso con un secreto JWT compartido para que puedan comunicarse de forma segura entre sí.

Si no se completan los pasos anteriores, su nodo aparecerá como «desconectado» hasta que ambas capas estén sincronizadas y autenticadas.

</ExpandableCard>

<ExpandableCard
title="Dapp and smart contract developers"
contentPreview="The Merge was designed to have minimal impact on smart contract and dapp developers."
id="developers">

La Fusión vino con cambios en el consenso, que también incluye cambios relacionados con:

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

La Fusión marcó el final de la prueba de trabajo para Ethereum y dio inicio a la era de un Ethereum más sostenible y ecológico. El consumo de energía de Ethereum se redujo en un 99,95% aproximadamente, haciendo de Ethereum una cadena de bloques ecológica. Conozca más sobre el [consumo energético de Ethereum](/energy-consumption/).

## La Fusión y la escalabilidad {#merge-and-scaling}

La Fusión también preparó el camino para futuras mejoras de escalabilidad que no serían posibles bajo proof-of-work, acercando a Ethereum un paso más a lograr la escala, seguridad y sustentabilidad completas descritas en su [visión de Ethereum](/roadmap/vision/).

## Conceptos erróneos sobre la Fusión {#misconceptions}

<ExpandableCard
title="Concepto erróneo: &quot;Ejecutar un nodo requiere hacer staking de 32 ETH.&quot;"
contentPreview="Falso. Cualquier persona puede sincronizar su propia copia auto-verificada de Ethereum (es decir, ejecutar un nodo). No se requiere ETH, ni antes de la Fusión, ni después de la Fusión, ni nunca.">

Hay dos tipos de nodos en Ethereum: los que pueden proponer bloques y los que no.

Los nodos que proponen bloques son solo un pequeño número total de todos los nodos de Ethereum. Esta categoría incluye los nodos mineros bajo prueba de trabajo (PoW) y los nodos validadores bajo prueba de participación (PoS). Esta categoría requiere comprometer recursos económicos (como el poder de hash de la GPU en una prueba de trabajo o ETH depositado en prueba de participación) a cambio de poder proponer ocasionalmente el siguiente bloque y ganar recompensas del protocolo.

Los demás nodos de la red (es decir, la mayoría) no necesitan comprometer ningún recurso económico más allá de un ordenador de consumo con 1-2 TB de almacenamiento disponible y una conexión a Internet. Estos nodos no proponen bloques, pero siguen desempeñando un papel fundamental en la seguridad de la red, al tener un registro de todos los nodos que sí proponen bloques analizando la inclusión de nuevos y verificando su validez a su llegada, de acuerdo con las reglas de consenso de la red. Si el bloque es válido, el nodo continúa propagándolo por la red. Si el bloque no es válido por cualquier motivo, el software del nodo lo ignorará como no válido y detendrá su propagación.

Cualquier persona bajo cualquier mecanismo de consenso (prueba de trabajo o prueba de participación) puede ejecutar un nodo que no produzca bloques; se <em>recomienda encarecidamente</em> para todos los usuarios si tienen los medios. Ejecutar un nodo es inmensamente valioso para Ethereum y aporta beneficios adicionales a cualquier persona que ejecute uno, como la mejora de la seguridad, la privacidad y la resistencia a la censura.

La capacidad de cualquier persona tiene de ejecutar su propio nodo es <em>absolutamente esencial</em> para mantener la descentralización de la red Ethereum.

[Más sobre la ejecución de su propio nodo](/run-a-node/)

</ExpandableCard>

<ExpandableCard
title="Concepto erróneo: &quot;La Fusión no logró reducir las tarifas de gas.&quot;"
contentPreview="Falso. La Fusión fue un cambio de mecanismo de consenso, no una expansión de la capacidad de la red, y nunca se pretendió que redujera las tarifas de gas.">

Las tarifas de gas son producto de la demanda de la red en relación con la capacidad de la misma. La Fusión dejó obsoleto el uso del mecanismo de prueba de trabajo, permitiendo la transición a la prueba de participación para el consenso, pero no cambió de manera significativa ninguno de los parámetros que influyen de manera directa la capacidad o rendimiento de la red.

Con una <a href="https://ethereum-magicians.org/t/a-rollup-centric-ethereum-roadmap/4698">hoja de ruta centrada en los rollups</a>, los esfuerzos se enfocan en escalar la actividad de los usuarios en la [capa 2](/layer-2/), mientras que la capa 1 Mainnet se habilita como una capa de liquidación descentralizada y segura, optimizada para el almacenamiento de datos de los rollups, lo que ayuda a que las transacciones de rollups sean exponencialmente más baratas. La transición a la prueba de participación es un precursor fundamental para conseguirlo. [Más sobre el gas y las tasas.](/developers/docs/gas/)

</ExpandableCard>

<ExpandableCard
title="Concepto erróneo: &quot;Las transacciones se aceleraron sustancialmente con la Fusión.&quot;"
contentPreview="Falso. Aunque existen algunos pequeños cambios, la velocidad de las transacciones en la capa 1 sigue siendo prácticamente la misma que antes de la Fusión.">
La "velocidad" de una transacción se puede medir de varias maneras, incluyendo el tiempo hasta ser incluida en un bloque y el tiempo hasta su finalización. Ambas cosas cambian ligeramente, aunque no de forma perceptible para los usuarios.

Históricamente, en la prueba de trabajo, el objetivo era tener un nuevo bloque cada ~13,3 segundos. Con la prueba de participación, los intervalos ocurren cada 12 segundos, y cada uno de ellos constituye una oportunidad para que el validador publique un bloque. La mayoría de las ranuras tienen bloques, aunque no necesariamente todos (por ejemplo , un validador está desconectado). Con la prueba de participación, los bloques se producen con más de 10 % de frecuencia en comparación con la prueba de trabajo. Esto es un cambio relativamente insignificante, con pocas probabilidades de ser percibido por los usuarios.

La prueba de participación introduce el concepto de finalidad de la transacción que no existía anteriormente. Con la prueba de trabajo, la posibilidad de revertir un bloque se hace exponencialmente más difícil, con cada bloque aprobado siendo minado como complemento de la transacción, aunque nunca suele llegar a cero. En la prueba de participación, los bloques se agrupan en épocas (periodos de tiempo de 6,4 minutos que contienen 32 oportunidades para los bloques) que los validadores votan. Cuando termina una época, los validadores votan si la consideran «justificada». Si los validadores están de acuerdo en justificarla, se finaliza en la siguiente. Deshacer transacciones finalizadas es económicamente inviable, ya que requeriría obtener y quemar más de un tercio del ETH total en staking.

</ExpandableCard>

<ExpandableCard
title="Misconception: &quot;The Merge enabled staking withdrawals.&quot;"
contentPreview="False, but staking withdrawals have since been enabled via the Shanghai/Capella upgrade.">

Inicialmente, después de La Fusión, los participantes solo podían acceder a las propinas de tarifas y MEV que se ganaban como resultado de las propuestas de bloques. Estas recompensas se acreditan a una cuenta sin participación controlada por el validador (conocida como el <em>destinatario de la tarifa</em>), y están disponibles de inmediato. Estas recompensas están separadas de las recompensas del protocolo para realizar las tareas de validación.

Desde la mejora de la red Shanghai/Capella, los participantes pueden designar una <em>dirección de retirada</em> para comenzar a recibir pagos automáticos de cualquier saldo en exceso (más de 32 ETH por recompensas del protocolo). Esta actualización también permitió a los validadores desbloquear y reclamar el total de su saldo al salir de la red.

[Más sobre retiradas de participaciones](/staking/withdrawals/)

</ExpandableCard>

<ExpandableCard
title="Concepto erróneo: &quot;Ahora que la Fusión está completa y los retiros están habilitados, todos los stakeadores podrían salir al mismo tiempo.&quot;"
contentPreview="Falso. La salida de validadores está limitada por tasa por motivos de seguridad.">
Desde que la actualización Shanghai/Capella habilitó los retiros, los validadores están incentivados a retirar el saldo en staking por encima de 32 ETH, ya que esos fondos no generan rendimiento y de otro modo permanecen bloqueados. Dependiendo de la tasa efectiva anual (o APR, según sus siglas en inglés), que viene determinada por el total de ETH depositado, se puede animar a su(s) validadores a reclamar todo su saldo o potencialmente apostar aún más usando sus recompensas para ganar más rendimiento.

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

[Obtenga más información sobre el cambio de nombre de 'Eth2'](https://blog.ethereum.org/2022/01/24/the-great-eth2-renaming/)

## Relación entre actualizaciones {#relationship-between-upgrades}

Las actualizaciones de Ethereum están interrelacionadas de alguna manera. Recapitulemos pues, sobre cómo se relaciona La Fusión con otras actualizaciones.

### La Fusión y la Beacon Chain {#merge-and-beacon-chain}

La Fusión representa la adopción formal de la cadena de baliza como la nueva capa de consenso de la capa de ejecución original de la red principal. Desde la Fusión, los validadores están asignados para asegurar la Mainnet de Ethereum, y la minería mediante [proof-of-work](/developers/docs/consensus-mechanisms/pow/) ya no es un método válido para la producción de bloques.

En su lugar, los bloques serán propuestos desde un nodo validado que tenga ETH apostados a cambio del derecho de participar en el consenso. Estas actualizaciones sientan las bases para futuras mejoras de escalabilidad, incluida la fragmentación.

<ButtonLink href="/roadmap/beacon-chain/">
  La Beacon Chain
</ButtonLink>

### La Fusión y la actualización Shanghai {#merge-and-shanghai}

Con la intención de simplificar y maximizar los esfuerzos centrados en una transición fructífera a la prueba de participación, la actualización de La Fusión no incluirá algunas características previamente anticipadas, como la posibilidad de retirar ETH apostados. Esta funcionalidad se habilitó de forma separada con la actualización Shanghai/Capella.

Para quienes tengan curiosidad, conozca más sobre [Qué sucede después de la Fusión](https://youtu.be/7ggwLccuN5s?t=101), presentado por Vitalik en el evento ETHGlobal de abril de 2021.

### La Fusión y el sharding {#merge-and-data-sharding}

Originalmente, el plan era trabajar en la fragmentación antes de La Fusión para abordar la escalabilidad. Sin embargo, con el auge de las [soluciones de escalado de capa 2](/layer-2/), la prioridad cambió a reemplazar primero el proof-of-work por proof-of-stake.

Los planes de fragmentación están evolucionando rápidamente, pero dado el auge y el éxito de las tecnologías de capa 2 para escalar la ejecución de transacciones, los planes de fragmentación han pasado a buscar la forma más óptima de distribuir la carga de almacenar los datos comprimidos de las llamadas procedentes de las acumulaciones, permitiendo un crecimiento exponencial de la capacidad de la red. Esto no sería posible sin pasar primero a la prueba de participación.

<ButtonLink href="/roadmap/danksharding/">
  Sharding
</ButtonLink>

## Lecturas adicionales {#further-reading}

<MergeArticleList />

<QuizWidget quizKey="merge" />
