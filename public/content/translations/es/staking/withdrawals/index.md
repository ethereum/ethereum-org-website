---
title: Retiros de staking
description: Página que resume qué son los retiros automáticos (push) de staking, cómo funcionan y qué deben hacer los stakers para obtener sus recompensas.
lang: es
template: staking
image: /images/staking/leslie-withdrawal.png
alt: El rinoceronte Leslie con sus recompensas de staking
sidebarDepth: 2
summaryPoints:
  - Los operadores de validadores deben proporcionar una dirección de retiro para habilitar los retiros
  - Los validadores heredados (legacy) tienen el exceso de saldo sobre 32 ETH retirado automáticamente cada pocos días
  - Los validadores compuestos (compounding) ganan recompensas sobre su saldo total hasta 2048 ETH
  - Los validadores que salen completamente del staking recibirán su saldo restante
---

Los **retiros de staking** se refieren a las transferencias de ETH desde una cuenta de validador en la capa de consenso de Ethereum (la cadena Beacon), hacia la capa de ejecución donde se puede transaccionar con él.

El funcionamiento de los retiros depende del tipo de credencial de retiro de su validador:

- **Validadores heredados (Tipo 1)**: El exceso de saldo por encima de 32 ETH se envía de forma automática y regular a la dirección de retiro vinculada al validador. Las recompensas por encima de 32 ETH no contribuyen al peso del validador en la red.
- **Validadores compuestos (Tipo 2)**: Las recompensas se componen en el saldo efectivo del validador hasta 2048 ETH, aumentando el peso del validador y ganando más recompensas. Solo el saldo que excede los 2048 ETH se barre automáticamente.

Los usuarios también pueden **salir del staking por completo**, desbloqueando todo el saldo de su validador.

## Recompensas de staking {#staking-rewards}

La forma en que se manejan las recompensas depende del tipo de credencial del validador:

Los **validadores heredados (Tipo 1)** tienen un saldo efectivo limitado a 32 ETH. Cualquier saldo superior a 32 ETH ganado a través de recompensas no contribuye al capital ni aumenta el peso de este validador en la red, y se retira automáticamente como pago de recompensa cada pocos días. Aparte de proporcionar una dirección de retiro una vez, estas recompensas no requieren ninguna acción por parte del operador del validador. Todo esto se inicia en la capa de consenso, por lo que no se requiere gas (tarifa de transacción) en ningún paso.

Los **validadores compuestos (Tipo 2)** pueden tener un saldo efectivo en cualquier punto entre 32 y 2048 ETH. Las recompensas ganadas por estos validadores se componen en su saldo efectivo, aumentando el peso del validador y las recompensas futuras. Los barridos automáticos solo ocurren para el saldo que excede los 2048 ETH. Para retirar recompensas por debajo del umbral de 2048 ETH, los validadores compuestos deben activar un retiro parcial manualmente desde la capa de ejecución, lo cual sí requiere gas.

### ¿Cómo llegamos aquí? {#how-did-we-get-here}

En los últimos años, [Ethereum](/) ha experimentado varias actualizaciones de red, haciendo la transición a una red asegurada por el propio ETH, en lugar de la minería intensiva en energía como lo era antes. Participar en el consenso en Ethereum ahora se conoce como "staking", ya que los participantes han bloqueado voluntariamente ETH, poniéndolo "en juego" para tener la capacidad de participar en la red. Los usuarios que sigan las reglas serán recompensados, mientras que los intentos de hacer trampa pueden ser penalizados.

Desde el lanzamiento del contrato de depósito de staking en noviembre de 2020, algunos valientes pioneros de Ethereum han bloqueado fondos voluntariamente para activar "validadores", cuentas especiales que tienen el derecho de atestiguar formalmente y proponer bloques, siguiendo las reglas de la red.

Antes de la actualización Shanghai/Capella, no podía usar ni acceder a su ETH en staking. Pero ahora, puede optar por recibir automáticamente sus recompensas en una cuenta elegida, y también puede retirar su ETH en staking cuando lo desee.

### ¿Cómo me preparo? {#how-do-i-prepare}

<WithdrawalsTabComparison />

### Avisos importantes {#important-notices}

Proporcionar una dirección de retiro es un paso obligatorio para cualquier cuenta de validador antes de que sea elegible para que se retire ETH de su saldo.

<Alert variant="warning">
<AlertEmoji text="⚠️"/>
<AlertContent>
<AlertDescription>
**A cada cuenta de validador solo se le puede asignar una única dirección de retiro, una sola vez.** Una vez que se elige una dirección y se envía a la capa de consenso, esto no se puede deshacer ni cambiar nuevamente. Verifique dos veces la propiedad y la precisión de la dirección proporcionada antes de enviarla.
</AlertDescription>
</AlertContent>
</Alert>

**No hay ninguna amenaza para sus fondos mientras tanto** por no proporcionar esto, asumiendo que su frase mnemotécnica/frase semilla ha permanecido segura fuera de línea y no ha sido comprometida de ninguna manera. No agregar credenciales de retiro simplemente dejará el ETH bloqueado en la cuenta del validador como ha estado hasta que se proporcione una dirección de retiro.

## Validadores compuestos {#compounding-validators}

Los validadores pueden optar por la **composición** convirtiendo sus credenciales de retiro del Tipo 1 al Tipo 2. Esto eleva el saldo efectivo máximo de 32 ETH a **2048 ETH**, permitiendo que las recompensas se compongan en el saldo efectivo del validador en lugar de ser barridas automáticamente.

Con la composición habilitada:

- Las recompensas aumentan el saldo efectivo del validador en incrementos de 1 ETH (sujeto a un pequeño [búfer de histéresis](https://www.attestant.io/posts/understanding-validator-effective-balance/)), ganando más recompensas con el tiempo
- Los barridos automáticos solo ocurren para el saldo que excede los 2048 ETH
- Los retiros parciales por debajo del umbral de 2048 ETH deben activarse manualmente desde la capa de ejecución (esto cuesta gas)
- Múltiples validadores pueden ser **consolidados** en un solo validador compuesto, reduciendo la carga operativa

<Alert variant="warning">
<AlertEmoji text="⚠️"/>
<AlertContent>
<AlertDescription>
**La conversión de credenciales de retiro del Tipo 1 al Tipo 2 es irreversible.** Utilice el [Staking Launchpad](https://launchpad.ethereum.org/validator-actions) como la herramienta oficial para esta conversión. Para obtener más detalles sobre el proceso de conversión, los riesgos y la consolidación, consulte el [análisis profundo de MaxEB](/roadmap/pectra/maxeb/).
</AlertDescription>
</AlertContent>
</Alert>

## Salir del staking por completo {#exiting-staking-entirely}

Es necesario proporcionar una dirección de retiro antes de que _cualquier_ fondo pueda ser transferido fuera del saldo de una cuenta de validador.

Los usuarios que buscan salir del staking por completo y retirar todo su saldo deben iniciar una "salida voluntaria". Esto se puede hacer de dos maneras:

- **Usando claves de validador**: Firme y transmita un mensaje de salida voluntaria con su cliente de validador, enviado a su nodo de consenso. Esto no requiere gas.
- **Usando credenciales de retiro**: Active una salida desde la capa de ejecución usando su dirección de retiro, sin necesidad de acceder a la clave de firma del validador. Esto requiere una transacción y cuesta gas.

El proceso de salida de un validador del staking toma cantidades variables de tiempo, dependiendo de cuántos otros estén saliendo al mismo tiempo. Una vez completado, esta cuenta ya no será responsable de realizar las tareas de la red del validador, ya no será elegible para recompensas y ya no tendrá su ETH "en juego". En este momento, la cuenta se marcará como totalmente "retirable".

Una vez que una cuenta se marca como "retirable" y se han proporcionado las credenciales de retiro, no hay nada más que el usuario deba hacer aparte de esperar. Las cuentas son barridas automática y continuamente por los proponentes de bloques en busca de fondos salientes elegibles, y el saldo de su cuenta se transferirá en su totalidad (también conocido como "retiro completo") durante el próximo <a href="#validator-sweeping" customEventOptions={{ eventCategory: "Anchor link", eventAction: "Exiting staking entirely (sweep)", eventName: "click" }}>barrido</a>.

## ¿Cuándo se habilitaron los retiros de staking? {#when}

La funcionalidad de retiro se habilitó originalmente como parte de la actualización Shanghai/Capella el **12 de abril de 2023**. La [actualización Pectra](/roadmap/pectra/) (mayo de 2025) introdujo más tarde los validadores compuestos con un saldo efectivo máximo más alto de 2048 ETH, así como salidas y retiros parciales activados por la capa de ejecución.

La actualización Shanghai/Capella permitió que el ETH previamente en staking fuera reclamado en cuentas regulares de Ethereum. Esto cerró el ciclo de la liquidez del staking y acercó a Ethereum un paso más en su viaje hacia la construcción de un ecosistema descentralizado sostenible, escalable y seguro.

- [Más sobre la historia de Ethereum](/ethereum-forks/)
- [Más sobre la hoja de ruta de Ethereum](/roadmap/)

## ¿Cómo funcionan los pagos de retiro? {#how-do-withdrawals-work}

Si un validador dado es elegible para un retiro o no, está determinado por el estado de la cuenta del validador en sí. No se necesita la intervención del usuario en ningún momento para determinar si se debe iniciar un retiro en una cuenta o no; todo el proceso lo realiza automáticamente la capa de consenso en un bucle continuo.

### ¿Aprende mejor de forma visual? {#visual-learner}

Eche un vistazo a esta explicación sobre los retiros de staking de Ethereum por Finematics:

<YouTube id="RwwU3P9n3uo" />

### "Barrido" de validadores {#validator-sweeping}

Cuando un validador está programado para proponer el siguiente bloque, se le requiere construir una cola de retiros, de hasta 16 retiros elegibles. Esto se hace comenzando originalmente con el índice de validador 0, determinando si hay un retiro elegible para esta cuenta según las reglas del protocolo, y agregándolo a la cola si lo hay. El validador configurado para proponer el siguiente bloque continuará donde lo dejó el último, progresando en orden indefinidamente.

<Alert variant="update">
<AlertEmoji text="🕛"/>
<AlertContent>
<AlertDescription>
Piense en un reloj analógico. La manecilla del reloj señala la hora, avanza en una dirección, no se salta ninguna hora y, finalmente, vuelve al principio después de alcanzar el último número.

Ahora, en lugar de 1 a 12, imagine que el reloj tiene de 0 a N _(el número total de cuentas de validadores que se han registrado en la capa de consenso, más de 500.000 a partir de enero de 2023)._

La manecilla del reloj señala al siguiente validador que debe ser revisado para retiros elegibles. Comienza en 0 y avanza por completo sin saltarse ninguna cuenta. Cuando se alcanza el último validador, el ciclo continúa de nuevo al principio.
</AlertDescription>
</AlertContent>
</Alert>

#### Revisión de una cuenta para retiros {#checking-an-account-for-withdrawals}

Mientras un proponente está barriendo a través de los validadores en busca de posibles retiros, cada validador que se revisa es evaluado contra una breve serie de preguntas para determinar si se debe activar un retiro y, de ser así, cuánto ETH se debe retirar.

1. **¿Se ha proporcionado una dirección de retiro?** Si no se ha proporcionado ninguna dirección de retiro, se omite la cuenta y no se inicia ningún retiro.
2. **¿El validador ha salido y es retirable?** Si el validador ha salido por completo y hemos llegado a la época en la que su cuenta se considera "retirable", entonces se procesará un retiro completo. Esto transferirá todo el saldo restante a la dirección de retiro.
3. **¿El saldo excede el saldo efectivo máximo?** Para los validadores heredados (Tipo 1), este umbral es de 32 ETH. Para los validadores compuestos (Tipo 2), este umbral es de 2048 ETH. Si la cuenta tiene credenciales de retiro, no ha salido por completo y tiene un saldo por encima de su umbral, se procesará un retiro parcial que transfiere solo el exceso a la dirección de retiro del usuario.

Solo hay dos acciones que toman los operadores de validadores durante el transcurso del ciclo de vida de un validador que influyen directamente en este flujo:

- Proporcionar credenciales de retiro para habilitar cualquier forma de retiro
- Salir de la red, lo que activará un retiro completo

### Libre de gas {#gas-free}

Los barridos de retiro automáticos no requieren que los stakers envíen manualmente una transacción. Esto significa que **no se requiere gas (tarifa de transacción)** para los barridos automáticos, y no compiten por el espacio de bloque existente en la capa de ejecución.

Tenga en cuenta que los [validadores compuestos](#compounding-validators) que deseen activar un retiro parcial por debajo del umbral de 2048 ETH deben hacerlo manualmente desde la capa de ejecución, lo cual sí requiere gas.

### ¿Con qué frecuencia obtendré mis recompensas de staking? {#how-soon}

Se puede procesar un máximo de 16 retiros en un solo bloque. A ese ritmo, se pueden procesar 115.200 retiros de validadores por día (asumiendo que no hay ranuras perdidas). Como se señaló anteriormente, los validadores sin retiros elegibles se omitirán, disminuyendo el tiempo para terminar el barrido.

Ampliando este cálculo, podemos estimar el tiempo que tomará procesar un número determinado de retiros:

<TableContainer>

| Número de retiros | Tiempo para completar |
| :-------------------: | :--------------: |
|        400,000        |     3.5 días     |
|        500,000        |     4.3 días     |
|        600,000        |     5.2 días     |
|        700,000        |     6.1 días     |
|        800,000        |     7.0 días     |

</TableContainer>

Como puede ver, esto se ralentiza a medida que hay más validadores en la red. Un aumento en las ranuras perdidas podría ralentizar esto proporcionalmente, pero esto generalmente representará el lado más lento de los posibles resultados.

## Preguntas frecuentes {#faq}

<ExpandableCard
title="Una vez que he proporcionado una dirección de retiro, ¿puedo cambiarla a una dirección de retiro alternativa?"
eventCategory="FAQ"
eventAction="Once I have provided a withdrawal address, can I change it to an alternative withdrawal address?"
eventName="read more">
No, el proceso para proporcionar credenciales de retiro es un proceso de una sola vez y no se puede cambiar una vez enviado.
</ExpandableCard>

<ExpandableCard
title="¿Por qué una dirección de retiro solo se puede configurar una vez?"
eventCategory="FAQ"
eventAction="Why can a withdrawal address only be set once?"
eventName="read more">
Al configurar una dirección de retiro de la capa de ejecución, las credenciales de retiro para ese validador se han cambiado permanentemente. Esto significa que las credenciales antiguas ya no funcionarán y las nuevas credenciales se dirigen a una cuenta de la capa de ejecución.

Las direcciones de retiro pueden ser un contrato inteligente (controlado por su código) o una cuenta de propiedad externa (EOA, controlada por su clave privada). Actualmente, estas cuentas no tienen forma de comunicar un mensaje a la capa de consenso que indique un cambio de credenciales de validador, y agregar esta funcionalidad agregaría una complejidad innecesaria al protocolo.

Como alternativa a cambiar la dirección de retiro para un validador en particular, los usuarios pueden optar por configurar un contrato inteligente como su dirección de retiro que podría manejar la rotación de claves, como un Safe. Los usuarios que configuran sus fondos en su propia EOA pueden realizar una salida completa para retirar todos sus fondos en staking y luego volver a hacer staking usando nuevas credenciales.
</ExpandableCard>

<ExpandableCard
title="¿Qué pasa si participo en tokens de staking o en un staking pool?"
eventCategory="FAQ"
eventAction="What if I participate in staking tokens or pooled staking"
eventName="read more">

Si forma parte de un [staking pool](/staking/pools/) o posee tokens de staking, debe consultar con su proveedor para obtener más detalles sobre cómo se manejan los retiros de staking, ya que cada servicio opera de manera diferente.

En general, los usuarios deberían ser libres de reclamar su ETH subyacente en staking o cambiar el proveedor de staking que utilizan. Si un pool en particular se está volviendo demasiado grande, los fondos se pueden retirar, canjear y volver a poner en staking con un [proveedor más pequeño](https://rated.network/). O, si ha acumulado suficiente ETH, podría [hacer staking desde casa](/staking/solo/).

</ExpandableCard>

<ExpandableCard
title="¿Los pagos de recompensas (retiros parciales) ocurren automáticamente?"
eventCategory="FAQ"
eventAction="Do reward payments (partial withdrawals) happen automatically?"
eventName="read more">
Para los **validadores heredados (Tipo 1)**, sí, siempre y cuando su validador haya proporcionado una dirección de retiro. Esto debe proporcionarse una vez para habilitar inicialmente cualquier retiro, luego los pagos de recompensas se activarán automáticamente cada pocos días con cada barrido de validador.

Para los **validadores compuestos (Tipo 2)**, las recompensas se componen en el saldo efectivo en lugar de ser barridas. Los barridos automáticos solo ocurren para el saldo que excede los 2048 ETH. Para retirar recompensas por debajo de este umbral, debe activar manualmente un retiro parcial desde la capa de ejecución.
</ExpandableCard>

<ExpandableCard
title="¿Los retiros completos ocurren automáticamente?"
eventCategory="FAQ"
eventAction="Do full withdrawals happen automatically?"
eventName="read more">

No, si su validador todavía está activo en la red, un retiro completo no ocurrirá automáticamente. Esto requiere iniciar manualmente una salida voluntaria.

Una vez que un validador ha completado el proceso de salida, y asumiendo que la cuenta tiene credenciales de retiro, el saldo restante _entonces_ se retirará durante el próximo <a href="#validator-sweeping" customEventOptions={{ eventCategory: "Anchor link", eventAction: "FAQ happen automatically (sweep)", eventName: "click" }}>barrido de validadores</a>.

</ExpandableCard>

<ExpandableCard title="¿Puedo retirar una cantidad personalizada?"
eventCategory="FAQ"
eventAction="Can I withdraw a custom amount?"
eventName="read more">
Para los **validadores heredados (Tipo 1)**, los retiros se envían automáticamente, transfiriendo cualquier ETH que no esté contribuyendo activamente a la participación. Esto incluye saldos completos para cuentas que han completado el proceso de salida. No es posible solicitar manualmente cantidades específicas de ETH para ser retiradas para los validadores de Tipo 1.

Los **validadores compuestos (Tipo 2)** pueden activar retiros parciales de una cantidad específica desde la capa de ejecución, siempre y cuando el saldo restante se mantenga en o por encima de 32 ETH. Esto requiere una transacción y cuesta gas.
</ExpandableCard>

<ExpandableCard
title="Opero un validador. ¿Dónde puedo encontrar más información sobre cómo habilitar los retiros?"
eventCategory="FAQ"
eventAction="I operate a validator. Where can I find more information on enabling withdrawals?"
eventName="read more">

Se recomienda a los operadores de validadores que visiten la página de [Retiros del Staking Launchpad](https://launchpad.ethereum.org/withdrawals/) donde encontrarán más detalles sobre cómo preparar su validador para los retiros, el momento de los eventos y más detalles sobre cómo funcionan los retiros.

Para probar su configuración en una red de prueba primero, visite el [Hoodi Testnet Staking Launchpad](https://hoodi.launchpad.ethereum.org) para comenzar.

</ExpandableCard>

<ExpandableCard
title="¿Puedo reactivar mi validador después de salir depositando más ETH?"
eventCategory="FAQ"
eventAction="Can I re-activate my validator after exiting by depositing more ETH?"
eventName="read more">
No. Una vez que un validador ha salido y su saldo completo ha sido retirado, cualquier fondo adicional depositado en ese validador se transferirá automáticamente a la dirección de retiro durante el próximo barrido de validadores. Para volver a hacer staking de ETH, se debe activar un nuevo validador.
</ExpandableCard>

<ExpandableCard
title="¿Cuál es la diferencia entre los validadores heredados y los compuestos?"
eventCategory="FAQ"
eventAction="What is the difference between legacy and compounding validators?"
eventName="read more">
Los validadores heredados usan credenciales de retiro de **Tipo 1** y tienen un saldo efectivo limitado a 32 ETH. Cualquier exceso se barre automáticamente a la dirección de retiro cada pocos días.

Los validadores compuestos usan credenciales de retiro de **Tipo 2** y pueden tener un saldo efectivo de hasta 2048 ETH. Las recompensas se componen en su saldo efectivo, aumentando el peso del validador en la red y las recompensas futuras. Los barridos automáticos solo ocurren para el saldo que excede los 2048 ETH. Para retirar por debajo de este umbral, se debe activar un retiro parcial manual desde la capa de ejecución.

Para obtener más detalles, consulte el [análisis profundo de MaxEB](/roadmap/pectra/maxeb/).
</ExpandableCard>

<ExpandableCard
title="¿Cómo me convierto en un validador compuesto?"
eventCategory="FAQ"
eventAction="How do I convert to a compounding validator?"
eventName="read more">
Puede convertir las credenciales de retiro del Tipo 1 al Tipo 2 utilizando el [Staking Launchpad](https://launchpad.ethereum.org/validator-actions). Esta operación es **irreversible**: una vez que se convierte, no puede volver a las credenciales de Tipo 1.

Después de la conversión, también puede **consolidar** múltiples validadores en uno solo, combinando sus saldos en un solo validador compuesto. Para obtener un tutorial completo del proceso de conversión, los riesgos y las herramientas de consolidación, consulte el [análisis profundo de MaxEB](/roadmap/pectra/maxeb/).
</ExpandableCard>

## Lecturas adicionales {#further-reading}

- [Retiros del Staking Launchpad](https://launchpad.ethereum.org/withdrawals)
- [Acciones de validador del Staking Launchpad](https://launchpad.ethereum.org/validator-actions)
- [Análisis profundo de MaxEB: composición y consolidación](/roadmap/pectra/maxeb/)
- [EIP-4895: Retiros automáticos (push) de la cadena Beacon como operaciones](https://eips.ethereum.org/EIPS/eip-4895)
- [PEEPanEIP #94: Retiro de ETH en staking (Pruebas) con Potuz y Hsiao-Wei Wang](https://www.youtube.com/watch?v=G8UstwmGtyE)
- [PEEPanEIP#68: EIP-4895: Retiros automáticos (push) de la cadena Beacon como operaciones con Alex Stokes](https://www.youtube.com/watch?v=CcL9RJBljUs)
- [Comprendiendo el saldo efectivo del validador](https://www.attestant.io/posts/understanding-validator-effective-balance/)