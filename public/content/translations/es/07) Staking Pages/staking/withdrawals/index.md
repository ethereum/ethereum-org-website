---
title: Retiradas de participaciones
description: La página resume lo que son los «empujones de retirada», cómo funcionan y lo que los participantes deben hacer para obtener sus recompensas
lang: es
template: staking
image: /images/staking/leslie-withdrawal.png
alt: Leslie el rinoceronte con sus recompensas de participaciones
sidebarDepth: 2
summaryPoints:
  - La actualización Shanghai/Capella habilita las retiradas de participaciones en Ethereum
  - Los operadores del validador deben proporcionar una dirección de retirada para habilitarla
  - Las recompensas se distribuyen automáticamente cada tantos días
  - Los validadores que salen completamente de las apuestas recibirán su balance restante
---

<UpgradeStatus dateKey="page-staking-withdrawals-when">
Las retiradas de participaciones se habilitarán con la actualización de Shanghai/Capella que ocurrió el 12 de abril de 2023.&nbsp;<a href="#when" customEventOptions={{ eventCategory: "Anchor link", eventAction: "When's it shipping?", eventName: "click" }}>Más información sobre Shanghai/Capella</a>
</UpgradeStatus>

**Las retiradas de participaciones** se refieren a las transferencias de ETH para la cuenta del validador en la capa de consenso de Ethereum (la cadena de baliza), a la capa de ejecución donde se pueden transferir.

**Los pagos de recompensas del saldo excedente** de más de 32 ETH se enviará automática y regularmente a una dirección de retirada vinculada a cada validador, una vez proporcionada por el usuario. Los usuarios también pueden **dejar de apostar por completo**, desbloqueando todo su saldo del validador.

## Recompensas de participaciones {#staking-rewards}

Los pagos de recompensas se procesan automáticamente para cuentas de validadores activas con un saldo efectivo máximo de 32 ETH.

Cualquier saldo por encima de 32 ETH ganado a través de recompensas no contribuye realmente al capital inicial, ni aumenta el peso de este validador en la red y, por lo tanto, se retira automáticamente como un pago de recompensa cada pocos días. Aparte de proporcionar una dirección de retiro una vez, estas recompensas no requieren ninguna acción del operador validador. Todo esto se inicia en la capa de consenso, por lo tanto no se requiere gas (tarifa de transacción) en ningún paso.

### ¿Cómo hemos llegado hasta aquí? {#how-did-we-get-here}

En los últimos años, Ethereum se ha sometido a varias actualizaciones de red que han hecho la transición a una red protegida por ETH en sí, en lugar de la minería con alto consumo nergético como era antes. Participar en el consenso en Ethereum se denomina ahora «participar», ya que los participantes han bloqueado voluntariamente ETH, poniéndolos «en juego» por la capacidad de participar en la red. Los usuarios que sigan las reglas serán recompensados, mientras que los intentos de hacer trampa podrán penalizarse.

Desde el lanzamiento del contrato de depósito de participación en noviembre de 2020, algunos valientes pioneros de Ethereum han bloqueado voluntariamente fondos para activar «validadores»: cuentas especiales que tienen derecho a certificar formalmente y proponer bloques, siguiendo las reglas de la red.

Antes de la actualización Shanghai/Capella, no se podía usar o acceder a sus ETH apostados. Pero ahora, puede optar por recibir automáticamente sus recompensas en una cuenta elegida y también puede retirar sus ETH apostados cuando quiera.

### ¿Cómo me preparo? {#how-do-i-prepare}

<WithdrawalsTabComparison />

### Avisos importantes {#important-notices}

Proporcionar una dirección de retirada es un paso obligatorio para cualquier cuenta de validdor antes de que sea elegible para que se retiren ETH de su saldo.

<InfoBanner emoji="⚠️" isWarning>
  <strong>A cada cuenta de validador sólo se le puede asignar una dirección de retirada, una vez.</strong> Cuando se elige una dirección y se envía a la capa de consenso, no puede deshacerse ni cambiarse nuevamente. Vuelva a verificar la propiedad y la precisión de la dirección proporcionada antes de enviarla.
</InfoBanner>

Mientras tanto <strong>no hay ninguna amenaza para sus fondos</strong> por no proporcionar esto, asumiendo que su frase mnemónica/de recuperación esté segura fuera de línea, y no se vea afectada de ninguna manera. Si no agrega las credenciales de retirada, simplemente dejará los ETH bloqueados en la cuenta del validador como ha estado hasta que se proporcione una dirección de retirada.

## Salir completamente de la apuesta {#exiting-staking-entirely}

Antes de que _los_ fondos puedan transferirse fuera del saldo de una cuenta de validación, es necesario proporcionar una dirección de retirada.

Para abandonar la apuesta y recuperar todo su saldo, los usuarios deben enviar un mensaje de «salida voluntaria» firmado con sus claves de validación que iniciará el proceso de desvinculación de la apuesta. Esto se hace con su cliente validador y se envía a su nodo consenso, y no requiere gas.

El proceso de un validador que sale de la apuesta lleva un tiempo variable, en función de la cantidad de peticiones de salida que se registren al mismo tiempo. Una vez completado, esta cuenta ya no tendrá la responsabilidad de realizar las tareas de la red de validación, no será elegible para recibir recompensas ni tendrá sus ETH «apostados». En ese momento, la cuenta se marcará como totalmente «retirable».

Una vez que una cuenta se marca como «retirable» y se proporcionan las credenciales de retirada, no hay nada más que el usuario deba hacer aparte de esperar. Los proponentes de bloques barren de forma automática y continua las cuentas en busca de fondos que reúnan las condiciones de salida, y el saldo de su cuenta se transferirá en su totalidad (también conocido como «retirada completa») durante el próximo <a href="#validator-sweeping" customEventOptions={{ eventCategory: "Anchor link", eventAction: "Exiting staking entirely (sweep)", eventName: "click" }}>barrido</a>.

## ¿Cuándo se habilitarán las retiradas de apuestas? {#when}

¡Las retiradas de apuestas ya están hablitadas! La funcionalidad de retirada se ha habilitado como parte de la actualización Shanghai/Capella que se lanzó el 12 de abril de 2023.

La actualización Shanghai/Capella habilitó previamente que los ETH apostados se reclamen en las cuentas regulares de Ethereum. Con esto se cierra el ciclo de la liquidez y aproima un poco más a Ethereum en su intención de desarrollar un ecosistema descentralizado escalable, seguro y sostenible.

- [Más sobre la historia de Ethereum](/history/)
- [Más sobre la hoja de ruta de Ethereum](/roadmap/)

## ¿Cómo funcionan los pagos de las retiradas? {#how-do-withdrawals-work}

La elegibilidad de un validador dado para una retirada o no, viene determinada por el estado de la cuenta del validador. No se necesita ninguna entrada de usuario en un momento dado para determinar si una cuenta debe tener una retirada iniciada o no (todo el proceso lo realiza automáticamente la capa de consenso en un bucle continuo).

### ¿Es más bien de los que aprende viendo? {#visual-learner}

Lea la explicación sobre retirads de apuestas en Ethereum hecha por Finematics:

<YouTube id="RwwU3P9n3uo" />

### «Barrido» del validador {#validator-sweeping}

Cuando un validador está programado para proponer el siguiente bloque, se requiere construir una cola de retirada, de hasta 16 retiradas elegibles. Para ello se empieza originariamente con el índice del validador 0, que determina si hay una retirada elegible para esta cuenta según las reglas del protocolo y se añade a la cola, si existe. El validador establecido para proponer el siguiente bloque lo tomará ahí donde el último lo haya dejado y irá procesando las órdenes de manera indefinida.

<InfoBanner emoji="🕛">
Piense en un reloj analógico. La manecilla en el reloj marca la hora, avanza en un sentido, no se salta ninguna hora y, al alcanzar el último número, vuelve nuevamente al punto de inicio.<br/><br/>
Ahora en lugar del 1 al 12, imagine que el reloj tiene de 0 hasta N <em>(el número total de cuentas validadoras que alguna vez se registraron en la capa de consenso, más de 500.000 en enero de 2023).</em><br/><br/>
La manecilla en el reloj apunta hacia el siguiente validador que necesita ser verificado antes de permitirle retiradas. Empieza a partir de 0, y avanza todo el camino alrededor sin saltarse ninguna cuenta. Cuando se alcance el último validador, el ciclo continúa volviendo al principio.
</InfoBanner>

#### Cómo comprobar si una cuenta es elegible para retirada {#checking-an-account-for-withdrawals}

Mientras un proponente barre posibles retiradas a través de validadores, cada validador que se revisa se evalúa, a tenor de una pequeña serie de preguntas, para determinar si debe activarse una retirada, y de ser así, cuántos ETH se deberían retirar.

1. **¿Se ha proporcionado una dirección de retirada?** Si no se ha proporcionado ninguna dirección, se omitirá la cuenta y no se iniciará ningún proceso de retirada.
2. **¿El validador ha salido y es apto para la retirada?** Si el validador ha salido completamente, y hemos llegado a la época en la que se considera que su cuenta es «retirable», entonces se procesará una retirada completa. Esto transferirá todo el saldo restante a la dirección de retirada.
3. **¿Supera el saldo efecto máximo los 32 ETH?** Si la cuenta tiene credenciales de retirada, no está completamente cerrada y tiene recompensas sobre los 32 en espera, se procesará una retirada parcial que sólo transfiere las recompensas por encima de 32 a la dirección de retirada del usuario.

En el transcurso del ciclo de vida de un validador, solo hay dos acciones que puede emprender un validador que influyen directamente en este flujo:

- Proporcionar credenciales de retirada para habilitar cualquier forma de retirada
- Salir de la red, que provocará una retirada completa

### Gas gratis {#gas-free}

Este enfoque a las retiradas de apuestas evita que los participantes tengan que presentar manualmente una transacción solicitando la retirada de una cantidad particular de ETH. Esto también significa que no se requiere **ningún gas (comisión de transacción)** y que las retiradas tampoco compiten por el espacio de bloque existente de la capa de ejecución.

### ¿Con qué frecuencia obtendré mis recompensas de participación? {#how-soon}

Se pueden procesar un máximo de 16 retiradas en un solo bloque. A ese ritmo, se pueden procesar 115.200 retiradas de validadores al día (asumiendo que no se pierda el turno). Como se mencionó anteriormente, se omitirá a los validadores sin retiradas elegibles, lo que reducirá el tiempo para finalizar el barrido.

Ampliando este cálculo podemos estimar el tiempo que llevará el procesar un número determinado de retiradas:

<TableContainer>

| Número de retiradas | Tiempo que llevará|
| :-------------------: | :--------------: |
| 400.000 | 3,5 días |
| 500.00 | 4,3 días |
| 600.000 | 5,2 días |
| 700.000 | 6,1 días |
| 800.000 | 7 días |

</TableContainer>

Como puede ver, cuantos más validadores esten en la red, más se ralentiza el proceso. Un aumento en las vacantes podría ralentizar esto proporcionalmente, pero esto generalmente representará el lado más lento de los posibles resultados.

## Preguntas más frecuentes {#faq}

<ExpandableCard
title="Una vez que he proporcionado una dirección de retirada, ¿puedo cambiarla a una dirección de retirada alternativa?"
eventCategory="FAQ"
eventAction="Once I have provided a withdrawal address, can I change it to an alternative withdrawal address?"
eventName="read more">
No, el proceso para proporcionar credenciales de retirada es un proceso de una sola vez, y no se puede cambiar una vez presentado.
</ExpandableCard>

<ExpandableCard
title="¿Por qué una dirección de retirada sólo puede establecerse una vez?"
eventCategory="FAQ"
eventAction="Why can a withdrawal address only be set once?"
eventName="read more">
Al establecer una capa de ejecución en una dirección de retirada, las credenciales de retirada para ese validador se cambian permanentemente. Esto significa que las credenciales antiguas ya no funcionarán, y las nuevas credenciales irán directamente a una cuenta de capa de ejecución.

Las direcciones de retirada pueden ser un contrato inteligente (controlado por su código), o una cuenta de propietario externa (EOA, controlada por su clave privada). Actualmente estas cuentas no tienen forma de comunicar un mensaje de vuelta a la capa de consenso que señalaría un cambio de credenciales de validador, y añadir esta funcionalidad añadiría una complejidad innecesaria al protocolo.

Como alternativa al cambio de la dirección de retirada para un validador en particular, los usuarios pueden optar por establecer un contrato inteligente como su dirección de retirada, la cual podría manejar la rotación clave, como una caja fuerte. Los usuarios que establezcan sus fondos en su propia EOA pueden realizar una salida completa para retirar todos sus fondos apostados, y luego volver a apostarlos usando nuevas credenciales.
</ExpandableCard>

<ExpandableCard
title="Qué pasa si participo en tókenes de participación o en participaciones agrupadas."
eventCategory="FAQ"
eventAction="What if I participate in staking tokens or pooled staking"
eventName="read more">

Si forma parte de alguna <a href="/staking/pools/">reserva de participación</a> o tiene tókenes de participación, debería consultarle a su proveedor los detalles de retiradas de participación, pues cada servicio opera de forma distinta.

En general, los usuarios deberían tener la libertad de reclamar sus ETH apostados subyacentes, o cambiar de proveedor de apuestas. Si un grupo en particular se está volviendo demasiado grande, los fondos se pueden cerrar y canjear, y volver a apostarlos con un <a href="https://rated.network/">proveedor más pequeño</a>. O, si ha acumulado suficientes ETH podría <a href="/staking/solo/">apostar desde casa</a>.

</ExpandableCard>

<ExpandableCard
title="¿Los pagos de recompensa (retiradas parciales) ocurren automáticamente?"
eventCategory="FAQ"
eventAction="Do reward payments (partial withdrawals) happen automatically?"
eventName="read more">
Sí, siempre y cuando su validador haya proporcionado una dirección de retirada. Se debe proporcionar una vez para habilitar inicialmente cualquier retirada, luego los pagos de recompensa se activarán automáticamente cada pocos días con cada barrido del validador.
</ExpandableCard>

<ExpandableCard
title="¿Las retiradas completas ocurren automáticamente?"
eventCategory="FAQ"
eventAction="Do full withdrawals happen automatically?"
eventName="read more">

No, si su validador todavía está activo en la red, una retirada completa no se producirá automáticamente. Esto requiere iniciar manualmente una salida voluntaria.

Una vez que un validador ha completado el proceso de salida ―asumiendo que la cuenta tenga credenciales de retirada― el saldo restante se retirará <em>entonces</em> durante el siguiente <a href="#validator-sweeping">barrido del validador</a>.

</ExpandableCard>

<ExpandableCard title="¿Puedo retirar una cantidad personalizada?"
eventCategory="FAQ"
eventAction="Can I withdraw a custom amount?"
eventName="read more">
Las retiradas están diseñadas para producirse automáticamente, transfiriendo cualquier ETH que no contribuya activamente a la apuesta. Esto incluye saldos completos para cuentas que han completado el proceso de salida.

No es posible solicitar manualmente la retirada de cantidades específicas de ETH.
</ExpandableCard>

<ExpandableCard
title="Opero un validador. ¿Dónde puedo encontrar más información sobre cómo habilitar retiradas?"
eventCategory="FAQ"
eventAction="I operate a validator. Where can I find more information on enabling withdrawals?"
eventName="read more">

Se recomienda a los operadores validadores visitar la página <a href="https://launchpad.ethereum.org/withdrawals/">Retiradas del lanzador de apuestas</a> donde encontrará más detalles sobre cómo preparar su validador para las retiradas, la sincronización de los eventos y más detalles sobre cómo funcionan las retiradas.

Para probar primero su configuración en una red de pruebas, visite el <a href="https://holesky.launchpad.ethereum.org">Holesky Testnet Staking Launchpad</a> para comenzar.

</ExpandableCard>

<ExpandableCard
title="¿Puedo reactivar mi validador después de salir depositando más ETH?"
eventCategory="FAQ"
eventAction="Can I re-activate my validator after exiting by depositing more ETH?"
eventName="read more">
No. Una vez que un validador ha salido y su saldo total se ha retirado, cualquier fondo adicional depositado a ese validador se transferirá automáticamente a la dirección de retirada durante el próximo barrido del validador. Para volver a apostar ETH, se debe activar un validador nuevo.
</ExpandableCard>

## Más información {#further-reading}

- [Retiradas en la plataforma de lanzamiento de participaciones](https://launchpad.ethereum.org/withdrawals)
- [EIP-4895: La cadena de baliza impulsa las retiradas como operaciones](https://eips.ethereum.org/EIPS/eip-4895)
- [ Ethereum Cat Herders - Shanghai](https://www.ethereumcatherders.com/shanghai_upgrade/index.html)
- [PEEPanEIP #94: Retirada de ETH apostados (Prueba) con Potuz & Hsiao-Wei Wang](https://www.youtube.com/watch?v=G8UstwmGtyE)
- [PEEPanEIP#68: EIP-4895: La cadena de baliza impulsa retiradas como operaciones con Alex Stokes](https://www.youtube.com/watch?v=CcL9RJBljUs)
- [Entender el saldo efectivo del validador](https://www.attestant.io/posts/understanding-validator-effective-balance/)
