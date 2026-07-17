---
title: "La Fusión"
description: "Aprenda sobre La Fusión: cuando la red principal de Ethereum adoptó la prueba de participación."
lang: es
template: upgrade
image: /images/upgrades/merge.png
alt: 
summaryPoints:
  - "La red principal de Ethereum utiliza la prueba de participación, pero esto no siempre fue así."
  - "La actualización del mecanismo original de prueba de trabajo a la prueba de participación se llamó La Fusión."
  - "La Fusión se refiere a la unión de la red principal de Ethereum original con una cadena de bloques de prueba de participación separada llamada cadena de balizas, que ahora existen como una sola cadena."
  - "La Fusión redujo el consumo de energía de Ethereum en un ~99.95 %."
---

<UpgradeStatus isShipped dateKey="page-upgrades:page-upgrades-beacon-date">
  La Fusión se ejecutó el 15 de septiembre de 2022. Esto completó la transición de Ethereum al consenso de prueba de participación, desaprobando oficialmente la prueba de trabajo y reduciendo el consumo de energía en un ~99.95 %.
</UpgradeStatus>

## ¿Qué fue La Fusión? {#what-is-the-merge}

La Fusión fue la unión de la capa de ejecución original de Ethereum (la red principal que ha existido desde el [génesis](/ethereum-forks/#frontier)) con su nueva capa de consenso de prueba de participación, la cadena de balizas. Eliminó la necesidad de la minería intensiva en energía y, en su lugar, permitió que la red se asegurara utilizando ETH en staking. Fue un paso verdaderamente emocionante para hacer realidad la visión de [Ethereum](/): más escalabilidad, seguridad y sostenibilidad.

<MergeInfographic />

Inicialmente, la [cadena de balizas](/roadmap/beacon-chain/) se lanzó por separado de la [red principal](/glossary/#mainnet). La red principal de Ethereum, con todas sus cuentas, saldos, contratos inteligentes y el estado de la cadena de bloques, continuó siendo asegurada por la [prueba de trabajo](/developers/docs/consensus-mechanisms/pow/), incluso mientras la cadena de balizas se ejecutaba en paralelo utilizando la [prueba de participación](/developers/docs/consensus-mechanisms/pos/). La Fusión fue cuando estos dos sistemas finalmente se unieron, y la prueba de trabajo fue reemplazada permanentemente por la prueba de participación.

Imagine que Ethereum es una nave espacial que se lanzó antes de estar lista para un viaje interestelar. Con la cadena de balizas, la comunidad construyó un nuevo motor y un casco reforzado. Después de pruebas significativas, llegó el momento de cambiar en caliente el motor nuevo por el viejo en pleno vuelo. Esto fusionó el motor nuevo y más eficiente en la nave existente, lo que le permitió recorrer algunos años luz serios y enfrentarse al universo.

## Fusión con la red principal {#merging-with-mainnet}

La prueba de trabajo aseguró la red principal de Ethereum desde el génesis hasta La Fusión. Esto permitió que la cadena de bloques de Ethereum a la que todos estamos acostumbrados naciera en julio de 2015 con todas sus características familiares: transacciones, contratos inteligentes, cuentas, etc.

A lo largo de la historia de Ethereum, los desarrolladores se prepararon para una eventual transición de la prueba de trabajo a la prueba de participación. El 1 de diciembre de 2020, la cadena de balizas se creó como una cadena de bloques separada de la red principal, ejecutándose en paralelo.

La cadena de balizas no procesaba originalmente transacciones de la red principal. En su lugar, estaba alcanzando el consenso sobre su propio estado al acordar los validadores activos y los saldos de sus cuentas. Después de pruebas exhaustivas, llegó el momento de que la cadena de balizas alcanzara el consenso sobre datos del mundo real. Después de La Fusión, la cadena de balizas se convirtió en el motor de consenso para todos los datos de la red, incluidas las transacciones de la capa de ejecución y los saldos de las cuentas.

La Fusión representó el cambio oficial al uso de la cadena de balizas como el motor de producción de bloques. La minería ya no es el medio para producir bloques válidos. En su lugar, los validadores de prueba de participación han adoptado este papel y ahora son responsables de procesar la validez de todas las transacciones y proponer bloques.

No se perdió ningún historial en La Fusión. A medida que la red principal se fusionó con la cadena de balizas, también fusionó todo el historial transaccional de Ethereum.

<Alert variant="update">
<AlertContent>
<AlertDescription>
Esta transición a la prueba de participación cambió la forma en que se emite el ether. Obtenga más información sobre la [emisión de ether antes y después de La Fusión](/roadmap/merge/issuance/).
</AlertDescription>
</AlertContent>
</Alert>

### Usuarios y titulares {#users-holders}

**La Fusión no cambió nada para los titulares/usuarios.**

_Vale la pena repetirlo_: Como usuario o titular de ETH o cualquier otro activo digital en Ethereum, así como los stakers que no operan nodos, **no necesita hacer nada con sus fondos o billetera para tener en cuenta La Fusión.** ETH es solo ETH. No existe tal cosa como "ETH viejo"/"ETH nuevo" o "ETH1"/"ETH2" y las billeteras funcionan exactamente igual después de La Fusión que antes; las personas que le digan lo contrario probablemente sean estafadores.

A pesar de cambiar la prueba de trabajo, todo el historial de Ethereum desde el génesis permaneció intacto e inalterado por la transición a la prueba de participación. Cualquier fondo mantenido en su billetera antes de La Fusión sigue siendo accesible después de La Fusión. **No se requiere ninguna acción de su parte para actualizar.**

[Más sobre la seguridad de Ethereum](/security/#eth2-token-scam)

### Operadores de nodos y desarrolladores de aplicaciones descentralizadas (dapps) {#node-operators-dapp-developers}

<ExpandableCard
title="Operadores y proveedores de nodos de staking"
contentPreview="Si eres un staker que ejecuta su propia configuración de nodo o un proveedor de infraestructura de nodos, hay algunas cosas que debes tener en cuenta después de La Fusión."
id="staking-node-operators">

Los elementos de acción clave incluyen:

1. Ejecutar _tanto_ un cliente de consenso como un cliente de ejecución; los puntos de conexión de terceros para obtener datos de ejecución ya no funcionan desde La Fusión.
2. Autenticar tanto los clientes de ejecución como los de consenso con un secreto JWT compartido para que puedan comunicarse de forma segura.
3. Establecer una dirección `fee recipient` para recibir las propinas de las tarifas de transacción ganadas/MEV.

No completar los dos primeros elementos anteriores dará como resultado que su nodo se vea como "fuera de línea" hasta que ambas capas estén sincronizadas y autenticadas.

No establecer una `fee recipient` aún permitirá que su validador se comporte como de costumbre, pero se perderá las propinas de tarifas no quemadas y cualquier MEV que de otro modo habría ganado en los bloques que propone su validador.
</ExpandableCard>

<ExpandableCard
title="Operadores de nodos no validadores y proveedores de infraestructura"
contentPreview="Si operas un nodo de Ethereum no validador, el cambio más significativo que trajo La Fusión fue el requisito de ejecutar clientes TANTO para la capa de ejecución COMO para la capa de consenso."
id="node-operators">

Hasta La Fusión, un cliente de ejecución (como Go Ethereum (Geth), Erigon, Besu o Nethermind) era suficiente para recibir, validar adecuadamente y propagar los bloques que la red estaba transmitiendo. _Después de La Fusión_, la validez de las transacciones contenidas dentro de una carga útil de ejecución ahora también depende de la validez del "bloque de consenso" en el que está contenida.

Como resultado, un nodo completo de Ethereum ahora requiere tanto un cliente de ejecución como un cliente de consenso. Estos dos clientes trabajan juntos utilizando una nueva API de motor (Engine API). La API de motor requiere autenticación mediante un secreto JWT, que se proporciona a ambos clientes permitiendo una comunicación segura.

Los elementos de acción clave incluyen:

- Instalar un cliente de consenso además de un cliente de ejecución
- Autenticar los clientes de ejecución y consenso con un secreto JWT compartido para que puedan comunicarse de forma segura entre sí.

No completar los elementos anteriores dará como resultado que su nodo parezca estar "fuera de línea" hasta que ambas capas estén sincronizadas y autenticadas.

</ExpandableCard>

<ExpandableCard
title="Desarrolladores de dapps y contratos inteligentes"
contentPreview="La Fusión se diseñó para tener un impacto mínimo en los desarrolladores de contratos inteligentes y dapps."
id="developers">

La Fusión vino con cambios en el consenso, que también incluyen cambios relacionados con:

<ul>
  <li>la estructura del bloque</li>
  <li>el tiempo de slot/bloque</li>
  <li>cambios en el código de operación</li>
  <li>fuentes de aleatoriedad en cadena</li>
  <li>el concepto de <em>cabeza segura</em> y <em>bloques finalizados</em></li>
</ul>

Para obtener más información, consulte esta publicación de blog de Tim Beiko sobre <a href="https://blog.ethereum.org/2021/11/29/how-the-merge-impacts-app-layer">Cómo La Fusión impacta la capa de aplicación de Ethereum</a>.

</ExpandableCard>

## La Fusión y el consumo de energía {#merge-and-energy}

La Fusión marcó el final de la prueba de trabajo para Ethereum y comenzó la era de un Ethereum más sostenible y ecológico. El consumo de energía de Ethereum se redujo en un estimado del 99.95 %, convirtiendo a Ethereum en una cadena de bloques ecológica. Obtenga más información sobre el [consumo de energía de Ethereum](/energy-consumption/).

## La Fusión y el escalado {#merge-and-scaling}

La Fusión también preparó el escenario para futuras actualizaciones de escalabilidad que no eran posibles bajo la prueba de trabajo, acercando a Ethereum un paso más a lograr la escala completa, la seguridad y la sostenibilidad hacia las que se dirige [su hoja de ruta](/roadmap/).

## Conceptos erróneos sobre La Fusión {#misconceptions}

<ExpandableCard
title="Concepto erróneo: &quot;Ejecutar un nodo requiere hacer staking de 32 ETH.&quot;"
contentPreview="Falso. Cualquiera es libre de sincronizar su propia copia autoverificada de Ethereum (es decir, ejecutar un nodo). No se requiere ETH: ni antes de La Fusión, ni después de La Fusión, ni nunca.">

Hay dos tipos de nodos de Ethereum: nodos que pueden proponer bloques y nodos que no.

Los nodos que proponen bloques son solo un pequeño número del total de nodos en Ethereum. Esta categoría incluye nodos de minería bajo la prueba de trabajo (PoW) y nodos validadores bajo la prueba de participación (PoS). Esta categoría requiere comprometer recursos económicos (como el poder de hash de la GPU en la prueba de trabajo o ETH en staking en la prueba de participación) a cambio de la capacidad de proponer ocasionalmente el siguiente bloque y ganar recompensas del protocolo.

Los otros nodos de la red (es decir, la mayoría) no están obligados a comprometer ningún recurso económico más allá de una computadora de nivel de consumidor con 1-2 TB de almacenamiento disponible y una conexión a Internet. Estos nodos no proponen bloques, pero aún cumplen un papel fundamental en la seguridad de la red al responsabilizar a todos los proponentes de bloques al escuchar nuevos bloques y verificar su validez a su llegada de acuerdo con las reglas de consenso de la red. Si el bloque es válido, el nodo continúa propagándolo a través de la red. Si el bloque es inválido por cualquier motivo, el software del nodo lo descartará como inválido y detendrá su propagación.

Ejecutar un nodo que no produce bloques es posible para cualquier persona bajo cualquier mecanismo de consenso (prueba de trabajo o prueba de participación); se <em>recomienda encarecidamente</em> a todos los usuarios si tienen los medios. Ejecutar un nodo es inmensamente valioso para Ethereum y brinda beneficios adicionales a cualquier individuo que ejecute uno, como una mayor seguridad, privacidad y resistencia a la censura.

La capacidad de que cualquier persona ejecute su propio nodo es <em>absolutamente esencial</em> para mantener la descentralización de la red Ethereum.

[Más sobre cómo ejecutar su propio nodo](/run-a-node/)

</ExpandableCard>

<ExpandableCard
title="Concepto erróneo: &quot;La Fusión no logró reducir las tarifas de gas.&quot;"
contentPreview="Falso. La Fusión fue un cambio de mecanismo de consenso, no una expansión de la capacidad de la red, y nunca tuvo la intención de reducir las tarifas de gas.">

Las tarifas de gas son un producto de la demanda de la red en relación con la capacidad de la red. La Fusión desaprobó el uso de la prueba de trabajo, haciendo la transición a la prueba de participación para el consenso, pero no cambió significativamente ningún parámetro que influya directamente en la capacidad de la red o la capacidad de procesamiento.

Con una <a href="https://ethereum-magicians.org/t/a-rollup-centric-ethereum-roadmap/4698">hoja de ruta centrada en los rollups</a>, los esfuerzos se centran en escalar la actividad del usuario en la [capa 2 (l2)](/layer-2/), al tiempo que se habilita la red principal de capa 1 (l1) como una capa de liquidación descentralizada segura optimizada para el almacenamiento de datos de rollup para ayudar a que las transacciones de rollup sean exponencialmente más baratas. La transición a la prueba de participación es un precursor crítico para lograr esto. [Más sobre el gas y las tarifas.](/developers/docs/gas/)

</ExpandableCard>

<ExpandableCard
title="Concepto erróneo: &quot;Las transacciones se aceleraron sustancialmente con La Fusión.&quot;"
contentPreview="Falso. Aunque existen algunos cambios leves, la velocidad de las transacciones es prácticamente la misma en la capa 1 ahora que antes de La Fusión.">
La "velocidad" de una transacción se puede medir de varias maneras, incluido el tiempo para ser incluida en un bloque y el tiempo hasta la finalización. Ambos cambian ligeramente, pero no de una manera que los usuarios noten.

Históricamente, en la prueba de trabajo, el objetivo era tener un nuevo bloque cada ~13.3 segundos. Bajo la prueba de participación, los slots ocurren precisamente cada 12 segundos, cada uno de los cuales es una oportunidad para que un validador publique un bloque. La mayoría de los slots tienen bloques, pero no necesariamente todos (es decir, un validador está fuera de línea). En la prueba de participación, los bloques se producen un ~10 % más frecuentemente que en la prueba de trabajo. Este fue un cambio bastante insignificante y es poco probable que los usuarios lo noten.

La prueba de participación introdujo el concepto de finalidad de la transacción que no existía anteriormente. En la prueba de trabajo, la capacidad de revertir un bloque se vuelve exponencialmente más difícil con cada bloque extraído sobre una transacción, pero nunca llega a cero. Bajo la prueba de participación, los bloques se agrupan en épocas (períodos de tiempo de 6.4 minutos que contienen 32 oportunidades para bloques) sobre las cuales los validadores emiten su voto. Cuando termina una época, los validadores votan sobre si considerar la época 'justificada'. Si los validadores acuerdan justificar la época, se finaliza en la siguiente época. Deshacer transacciones finalizadas es económicamente inviable, ya que requeriría obtener y quemar más de un tercio del total de ETH en staking.

</ExpandableCard>

<ExpandableCard
title="Concepto erróneo: &quot;La Fusión habilitó los retiros de staking.&quot;"
contentPreview="Falso, pero los retiros de staking se han habilitado desde entonces mediante la actualización Shanghái/Capella.">

Inicialmente después de La Fusión, los stakers solo podían acceder a las propinas de tarifas y al MEV que se ganaban como resultado de las propuestas de bloques. Estas recompensas se acreditan a una cuenta que no es de staking controlada por el validador (conocida como el <em>destinatario de la tarifa</em>), y están disponibles de inmediato. Estas recompensas están separadas de las recompensas del protocolo por realizar las tareas del validador.

Desde la actualización de la red Shanghái/Capella, los stakers ahora pueden designar una <em>dirección de retiro</em> para comenzar a recibir pagos automáticos de cualquier saldo de staking excedente (ETH por encima de 32 de las recompensas del protocolo). Esta actualización también habilitó la capacidad de un validador para desbloquear y reclamar todo su saldo al salir de la red.

[Más sobre los retiros de staking](/staking/withdrawals/)

</ExpandableCard>

<ExpandableCard
title="Concepto erróneo: &quot;Ahora que La Fusión está completa y los retiros están habilitados, todos los stakers podrían salir a la vez.&quot;"
contentPreview="Falso. Las salidas de validadores están limitadas por frecuencia por razones de seguridad.">
Dado que la actualización Shanghái/Capella habilitó los retiros, los validadores están incentivados a retirar su saldo de staking por encima de 32 ETH, ya que estos fondos no se suman al rendimiento y de otro modo estarían bloqueados. Dependiendo del APR (determinado por el total de ETH en staking), pueden estar incentivados a salir de su(s) validador(es) para reclamar todo su saldo o potencialmente hacer staking de aún más utilizando sus recompensas para ganar más rendimiento.

Una advertencia importante aquí, las salidas completas de validadores están limitadas en tasa por el protocolo, y solo un número determinado de validadores puede salir por época (cada 6.4 minutos). Este límite fluctúa dependiendo del número de validadores activos, pero resulta en que aproximadamente el 0.33 % del total de ETH en staking puede salir de la red en un solo día.

Esto evita un éxodo masivo de fondos en staking. Además, evita que un atacante potencial con acceso a una gran parte del total de ETH en staking cometa una ofensa sujeta a recorte y salga/retire todos los saldos de los validadores infractores en la misma época antes de que el protocolo pueda aplicar la penalización de recorte.

El APR también es intencionalmente dinámico, lo que permite que un mercado de stakers equilibre cuánto están dispuestos a que se les pague para ayudar a asegurar la red. Si la tasa es demasiado baja, entonces los validadores saldrán a una tasa limitada por el protocolo. Gradualmente, esto aumentará el APR para todos los que permanezcan, atrayendo a stakers nuevos o que regresan una vez más.
</ExpandableCard>

## ¿Qué pasó con 'Eth2'? {#eth2}

El término 'Eth2' ha sido desaprobado. Después de fusionar 'Eth1' y 'Eth2' en una sola cadena, ya no hay necesidad de distinguir entre dos redes de Ethereum; solo existe Ethereum.

Para limitar la confusión, la comunidad ha actualizado estos términos:

- 'Eth1' es ahora la 'capa de ejecución', que maneja las transacciones y la ejecución.
- 'Eth2' es ahora la 'capa de consenso', que maneja el consenso de prueba de participación.

Estas actualizaciones de terminología solo cambian las convenciones de nomenclatura; esto no altera los objetivos ni la hoja de ruta de Ethereum.

[Obtenga más información sobre el cambio de nombre de 'Eth2'](https://blog.ethereum.org/2022/01/24/the-great-eth2-renaming)

## Relación entre las actualizaciones {#relationship-between-upgrades}

Las actualizaciones de Ethereum están todas algo interrelacionadas. Así que recapitulemos cómo La Fusión se relaciona con las otras actualizaciones.

### La Fusión y la cadena de balizas {#merge-and-beacon-chain}

La Fusión representa la adopción formal de la cadena de balizas como la nueva capa de consenso para la capa de ejecución original de la red principal. Desde La Fusión, se asignan validadores para asegurar la red principal de Ethereum, y la minería en la [prueba de trabajo](/developers/docs/consensus-mechanisms/pow/) ya no es un medio válido de producción de bloques.

En su lugar, los bloques son propuestos por nodos validadores que han hecho staking de ETH a cambio del derecho a participar en el consenso. Estas actualizaciones preparan el escenario para futuras actualizaciones de escalabilidad, incluida la cadena de fragmentos.

<ButtonLink href="/roadmap/beacon-chain/">
  La cadena de balizas
</ButtonLink>

### La Fusión y la actualización Shanghái {#merge-and-shanghai}

Para simplificar y maximizar el enfoque en una transición exitosa a la prueba de participación, la actualización de La Fusión no incluyó ciertas características anticipadas, como la capacidad de retirar ETH en staking. Esta funcionalidad se habilitó por separado con la actualización Shanghái/Capella.

Para los curiosos, obtenga más información sobre [Qué sucede después de La Fusión](https://youtu.be/7ggwLccuN5s?t=101), presentado por Vitalik en el evento ETHGlobal de abril de 2021.

### La Fusión y la cadena de fragmentos {#merge-and-data-sharding}

Originalmente, el plan era trabajar en la cadena de fragmentos antes de La Fusión para abordar la escalabilidad. Sin embargo, con el auge de las [soluciones de escalado de capa 2 (l2)](/layer-2/), la prioridad cambió a cambiar la prueba de trabajo a la prueba de participación primero.

Los planes para la cadena de fragmentos están evolucionando rápidamente, pero dado el aumento y el éxito de las tecnologías de capa 2 (l2) para escalar la ejecución de transacciones, los planes de la cadena de fragmentos han cambiado a encontrar la forma más óptima de distribuir la carga de almacenar datos de llamada comprimidos de los contratos de rollup, lo que permite un crecimiento exponencial en la capacidad de la red. Esto no sería posible sin antes hacer la transición a la prueba de participación.

<ButtonLink href="/roadmap/danksharding/">
  Cadena de fragmentos
</ButtonLink>

## Lecturas adicionales {#further-reading}

<MergeArticleList />

<QuizWidget quizKey="merge" />
