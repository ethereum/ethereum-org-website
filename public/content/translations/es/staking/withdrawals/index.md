---
title: Retiros de staking
description: "Página que resume qué son los retiros automáticos (push) de staking, cómo funcionan y qué deben hacer los participantes para obtener sus recompensas"
lang: es
template: staking
image: /images/staking/leslie-withdrawal.png
alt: Leslie, el rinoceronte, con sus recompensas de staking
sidebarDepth: 2
summaryPoints:
  - Los operadores de validadores deben proporcionar una dirección de retiro para habilitar los retiros
  - A los validadores heredados se les retira automáticamente el saldo excedente de 32 ETH cada pocos días
  - Los validadores compuestos ganan recompensas sobre su saldo completo hasta 2048 ETH
  - Los validadores que salgan completamente del staking recibirán su saldo restante
---

**Los retiros de staking** se refieren a las transferencias de ETH desde una cuenta de validador en la capa de consenso de Ethereum (la cadena de balizas), hacia la capa de ejecución donde se puede transaccionar con él.

> Si forma parte de un [pool de staking](/staking/pools/) o posee tokens de staking, debe consultar con su proveedor para obtener más detalles sobre cómo se manejan los retiros de staking, ya que cada servicio opera de manera diferente.

El funcionamiento de los retiros depende del tipo de credenciales de retiro de su validador:

- **Validadores heredados (Tipo 1)**: El saldo excedente de 32 ETH se envía de forma automática y regular a la dirección de retiro vinculada al validador. Las recompensas por encima de 32 ETH no contribuyen al peso del validador en la red.
- **Validadores compuestos (Tipo 2)**: Las recompensas se componen en el saldo efectivo del validador hasta 2048 ETH, lo que aumenta el peso del validador y genera más recompensas. Solo el saldo que excede los 2048 ETH se barre automáticamente.

Los usuarios también pueden **salir del staking por completo**, enviando una transacción para retirar, esperando el tiempo de cualquier cola de retiro (según la demanda de la red) y desbloqueando el saldo completo de su validador.

## Recompensas de staking {#staking-rewards}

La forma en que se manejan las recompensas depende del tipo de credencial del validador:

Los **validadores heredados (Tipo 1)** tienen un saldo efectivo limitado a 32 ETH. Cualquier saldo superior a 32 ETH recibido como recompensas de la red no contribuye al saldo efectivo ni aumenta el peso de este validador en la red, y estas recompensas se retiran automáticamente a la dirección de retiro dedicada del validador cada pocos días. Aparte de proporcionar una dirección de retiro una vez, reclamar estas recompensas no requiere ninguna acción por parte del operador del validador. Todo esto se inicia en la capa de consenso, por lo que no se requiere gas (tarifa de transacción) en ningún paso.

Los **validadores compuestos (Tipo 2)** pueden tener un saldo efectivo en cualquier punto entre 32 y 2048 ETH. Las recompensas de la red recibidas por estos validadores se componen en su saldo efectivo, lo que aumenta el peso del validador y su potencial para recibir futuras recompensas. Los barridos automáticos solo ocurren para el saldo que excede los 2048 ETH. Para retirar recompensas por debajo del umbral de 2048 ETH, los validadores compuestos deben activar un retiro parcial manualmente desde la capa de ejecución, lo cual sí requiere gas.

### ¿Cómo llegamos aquí? {#how-did-we-get-here}

En los últimos años, [Ethereum](/) ha experimentado varias actualizaciones de red en su transición hacia una red asegurada por el propio ETH, en lugar de la minería intensiva en energía como lo era antes. Participar en el consenso en Ethereum ahora se conoce como "staking", ya que los participantes han bloqueado voluntariamente ETH, depositándolo en garantía (at stake) para tener la capacidad de participar en la red. Los usuarios que sigan las reglas serán recompensados, mientras que los intentos de hacer trampa pueden ser penalizados.

Desde el lanzamiento del contrato de depósito de staking en noviembre de 2020, algunos valientes pioneros de Ethereum han bloqueado fondos voluntariamente para activar "validadores", cuentas especiales que tienen el derecho de atestiguar y proponer bloques formalmente, siguiendo las reglas de la red.

Antes de la actualización Shanghái/Capella, no podía usar ni acceder a su ETH en staking. Pero ahora, puede optar por recibir automáticamente sus recompensas en una cuenta elegida, y también puede retirar su ETH en staking cuando lo desee.

### ¿Cómo me preparo? {#how-do-i-prepare}

<WithdrawalsTabComparison />

### Avisos importantes {#important-notices}

Se requiere que las cuentas de validador proporcionen una dirección de retiro antes de que puedan acceder y retirar las recompensas de la red acumuladas, o procesar un retiro completo al salir del staking.

<Alert variant="warning">
<AlertEmoji text="⚠️"/>
<AlertContent>
<AlertDescription>
**A cada cuenta de validador solo se le puede asignar una única dirección de retiro, una sola vez.** Una vez que se elige una dirección y se envía a la capa de consenso, esto no se puede deshacer ni cambiar nuevamente. Verifique dos veces la propiedad y la precisión de la dirección proporcionada antes de enviarla.
</AlertDescription>
</AlertContent>
</Alert>

Si aún no ha proporcionado una dirección de retiro para su cuenta de validador, **no hay ninguna amenaza para sus fondos mientras tanto**, asumiendo que su frase semilla/mnemotécnica ha permanecido segura fuera de línea y no ha sido comprometida de ninguna manera. No agregar credenciales de retiro simplemente dejará el ETH bloqueado en la cuenta del validador hasta que se proporcione una dirección de retiro.

## Validadores compuestos {#compounding-validators}

Los validadores pueden optar por la **composición** convirtiendo sus credenciales de retiro del Tipo 1 al Tipo 2. Esto eleva el saldo efectivo máximo de 32 ETH a **2048 ETH**, lo que permite que las recompensas se compongan en el saldo efectivo del validador en lugar de ser barridas automáticamente.

Con la composición habilitada:

- Las recompensas aumentan el saldo efectivo del validador en incrementos de 1 ETH (sujeto a un pequeño [búfer de histéresis](https://www.attestant.io/posts/understanding-validator-effective-balance/)), ganando más recompensas con el tiempo
- Los barridos automáticos solo ocurren para el saldo que excede los 2048 ETH
- Los retiros parciales por debajo del umbral de 2048 ETH deben activarse manualmente desde la capa de ejecución (esto cuesta gas)
- Múltiples validadores pueden ser **consolidados** en un solo validador compuesto, reduciendo la carga operativa

<Alert variant="warning">
<AlertEmoji text="⚠️"/>
<AlertContent>
<AlertDescription>
**La conversión de credenciales de retiro del Tipo 1 al Tipo 2 es irreversible.** Utilice el [Staking Launchpad](https://launchpad.ethereum.org/validator-actions) como la herramienta oficial para esta conversión. Para obtener más detalles sobre el proceso de conversión, los riesgos y la consolidación, consulte el [análisis detallado de MaxEB](/roadmap/pectra/maxeb/).
</AlertDescription>
</AlertContent>
</Alert>

## Salir del staking por completo {#exiting-staking-entirely}

Se requiere proporcionar una dirección de retiro antes de que _cualquier_ fondo pueda ser transferido fuera del saldo de una cuenta de validador.

Los usuarios que buscan salir del staking por completo y retirar su saldo completo de vuelta deben iniciar una "salida voluntaria". Esto se puede hacer de dos maneras:

- **Usando claves de validador**: Firme y transmita un mensaje de salida voluntaria con su cliente de validador, enviado a su nodo de consenso. Esto no requiere gas.
- **Usando credenciales de retiro**: Active una salida desde la capa de ejecución usando su dirección de retiro, sin necesidad de acceder a la clave de firma del validador. Esto requiere una transacción y cuesta gas.

El proceso de salida de un validador del staking toma cantidades variables de tiempo, dependiendo de cuántos otros estén saliendo al mismo tiempo. Una vez completado, esta cuenta ya no será responsable de realizar las tareas de la red del validador, ya no será elegible para recompensas y ya no tendrá su ETH en garantía (at stake). En este momento, la cuenta se marcará como completamente "retirable".

Una vez que una cuenta se marca como "retirable" y se han proporcionado las credenciales de retiro, no hay nada más que un usuario deba hacer aparte de esperar. Las cuentas son barridas de forma automática y continua por los proponentes de bloques en busca de fondos salidos elegibles, y el saldo de su cuenta se transferirá en su totalidad (también conocido como un "retiro completo") durante el próximo <a href="#validator-sweeping" customEventOptions={{ eventCategory: "Anchor link", eventAction: "Exiting staking entirely (sweep)", eventName: "click" }}>barrido</a>.

## ¿Cómo funcionan las recompensas automáticas (validador Tipo 1)? {#how-do-withdrawals-work}

Si un validador dado es elegible para un retiro o no, está determinado por el estado de la cuenta del validador en sí. No se necesita la intervención del usuario en ningún momento para determinar si se debe iniciar un retiro en una cuenta o no; todo el proceso lo realiza automáticamente la capa de consenso en un bucle continuo.

### ¿Aprende mejor de forma visual? {#visual-learner}

Eche un vistazo a esta explicación sobre los retiros de staking de Ethereum por Finematics:

<VideoWatch slug="ethereum-staking-withdrawals" />

### "Barrido" de validadores {#validator-sweeping}

Cuando un validador está programado para proponer el siguiente bloque, se le requiere construir una cola de retiros, de hasta 16 retiros elegibles. Esto se hace comenzando originalmente con el índice de validador 0, determinando si hay un retiro elegible para esta cuenta según las reglas del protocolo, y agregándolo a la cola si lo hay. El validador configurado para proponer el siguiente bloque continuará donde lo dejó el último, progresando en orden indefinidamente.

<Alert variant="update">
<AlertEmoji text="🕛"/>
<AlertContent>
<AlertDescription>
Piense en un reloj analógico. La manecilla del reloj señala la hora, avanza en una dirección, no se salta ninguna hora y, finalmente, vuelve al principio después de alcanzar el último número.

Ahora, en lugar de 1 a 12, imagine que el reloj tiene de 0 a N _(siendo N el número total de cuentas de validador que se han registrado alguna vez en la capa de consenso, más de 1,2 millones a partir de abril de 2026)._

La manecilla del reloj señala al siguiente validador que debe ser revisado para retiros elegibles. Comienza en 0 y avanza por completo sin saltarse ninguna cuenta. Cuando se alcanza el último validador, el ciclo continúa de vuelta al principio.
</AlertDescription>
</AlertContent>
</Alert>

#### Revisión de una cuenta para retiros {#checking-an-account-for-withdrawals}

Mientras un proponente está barriendo a través de los validadores en busca de posibles retiros, cada validador que se revisa es evaluado contra una breve serie de preguntas para determinar si se debe activar un retiro y, de ser así, cuánto ETH se debe retirar.

1. **¿Se ha proporcionado una dirección de retiro?** Si no se ha proporcionado ninguna dirección de retiro, la cuenta se omite y no se inicia ningún retiro.
2. **¿El validador ha salido y es retirable?** Si el validador ha salido por completo y hemos llegado a la época en la que su cuenta se considera "retirable", entonces se procesará un retiro completo. Esto transferirá todo el saldo restante a la dirección de retiro.
3. **¿El saldo excede su saldo efectivo máximo?** Para los validadores heredados (Tipo 1), este umbral es de 32 ETH. Para los validadores compuestos (Tipo 2), este umbral es de 2048 ETH. Si la cuenta tiene credenciales de retiro, no ha salido por completo, tiene un saldo efectivo en el máximo y tiene un saldo por encima de este umbral, entonces se procesará un retiro parcial que transfiere solo el exceso a la dirección de retiro del usuario.

Solo hay dos acciones que toman los operadores de validadores durante el transcurso del ciclo de vida de un validador que influyen directamente en este flujo:

- Proporcionar credenciales de retiro para habilitar cualquier forma de retiro
- Salir de la red, lo que activará un retiro completo

### Sin gas {#gas-free}

Los barridos de retiro automáticos no requieren que los participantes envíen manualmente una transacción. Esto significa que **no se requiere gas (tarifa de transacción)** para los barridos automáticos, y no compiten por el espacio de bloque existente en la capa de ejecución.

Tenga en cuenta que los [validadores compuestos](#compounding-validators) que deseen activar un retiro parcial por debajo del umbral de 2048 ETH deben hacerlo manualmente desde la capa de ejecución, lo cual sí requiere gas.

### ¿Con qué frecuencia se desbloquearán y estarán disponibles mis recompensas de staking en mi billetera? {#how-soon}

Se puede procesar un máximo de 16 retiros en un solo bloque. A ese ritmo, se pueden procesar 115.200 retiros de validadores por día (asumiendo que no hay ranuras perdidas). Como se señaló anteriormente, los validadores sin retiros elegibles se omitirán, lo que disminuye el tiempo para terminar el barrido.

Ampliando este cálculo, podemos estimar el tiempo que tomará procesar un número determinado de retiros:

<TableContainer>

| Número de retiros | Tiempo para completar |
| :-------------------: | :--------------: |
|        400.000        |     3,5 días     |
|        500.000        |     4,3 días     |
|        600.000        |     5,2 días     |
|        700.000        |     6,1 días     |
|        800.000        |     7,0 días     |

</TableContainer>

Como puede ver, esto se ralentiza a medida que hay más validadores en la red. Un aumento en las ranuras perdidas podría ralentizar esto proporcionalmente, pero esto generalmente representará el lado más lento de los posibles resultados.

## Preguntas frecuentes {#faq}

<ExpandableCard
title="Once I have provided a withdrawal address, can I change it to an alternative withdrawal address?"
eventCategory="FAQ"
eventAction="Once I have provided a withdrawal address, can I change it to an alternative withdrawal address?"
eventName="read more">
No, el proceso para proporcionar credenciales de retiro es un proceso de una sola vez y no se puede cambiar una vez enviado.
</ExpandableCard>

<ExpandableCard
title="Why can a validator's withdrawal address only be set once?"
eventCategory="FAQ"
eventAction="Why can a validator's withdrawal address only be set once?"
eventName="read more">
Establecer la dirección de retiro de la capa de ejecución de un validador es un cambio permanente en las credenciales del validador en la capa de consenso. No hay forma de actualizar las credenciales de la capa de consenso una vez que están registradas.

Las credenciales de la dirección de retiro de un validador se pueden configurar para que apunten a un contrato inteligente (controlado por su código) o a una cuenta de propiedad externa (EOA, controlada por su clave privada). Actualmente, estas cuentas no tienen forma de comunicar un mensaje de vuelta a la capa de consenso que indique un cambio en las credenciales del validador, y agregar esta funcionalidad añadiría una complejidad innecesaria al protocolo.

Los usuarios que buscan una gestión de retiros flexible pueden configurar una billetera de contrato inteligente capaz de rotar claves (como un [Safe](https://safe.global/)) como la dirección de retiro del validador, lo que permite efectivamente actualizar la EOA receptora final. Si un usuario ya ha establecido una EOA como credencial de retiro, debe iniciar una salida completa para recuperar su ETH en staking y luego usar esos fondos para activar un nuevo validador con credenciales diferentes.
</ExpandableCard>

<ExpandableCard
title="How do I withdraw from staking if I stake through a provider, staking pool, or participate with liquid staking tokens?"
eventCategory="FAQ"
eventAction="How do I withdraw from staking if I stake through a provider, staking pool, or participate with liquid staking tokens?"
eventName="read more">
Si utiliza un pool de staking o posee tokens de staking, comuníquese con su proveedor para saber cómo manejan los retiros, ya que los procesos varían según el servicio. 

En general, al hacer staking a través de un proveedor o pool, debería ser libre de reclamar su ETH en staking subyacente, o de retirar y cambiar el proveedor de staking que utiliza. Si un pool en particular se está volviendo demasiado grande, el ETH en staking se puede retirar, canjear y volver a hacer staking con un [proveedor más pequeño](https://rated.network/). O, si ha acumulado suficiente ETH, podría [hacer staking desde casa](/staking/solo/).

</ExpandableCard>

<ExpandableCard
title="Does claiming network rewards (partial withdrawals) happen automatically?"
eventCategory="FAQ"
eventAction="Does claiming network rewards (partial withdrawals) happen automatically?"
eventName="read more">
Para los **validadores heredados (Tipo 1)**, sí, siempre y cuando su validador haya proporcionado una dirección de retiro. Esta debe proporcionarse una vez para habilitar cualquier retiro, luego la distribución de recompensas de la red a la dirección de retiro se activará automáticamente cada pocos días con cada barrido de validador.

Para los **validadores compuestos (Tipo 2)**, las recompensas se componen en el saldo efectivo del validador (hasta 2048 ETH) en lugar de ser barridas a la dirección de retiro. Los barridos automáticos solo ocurren para saldos que exceden los 2048 ETH. Para retirar recompensas por debajo de este umbral, debe activar manualmente un retiro parcial desde la capa de ejecución.
</ExpandableCard>

<ExpandableCard title="Can I withdraw a custom amount?"
eventCategory="FAQ"
eventAction="Can I withdraw a custom amount?"
eventName="read more">
Para los **validadores heredados (Tipo 1)**, cualquier recompensa de la red en ETH que se haya acumulado sobre el saldo efectivo de 32 ETH del validador se envía automáticamente a la dirección de retiro. A los validadores de Tipo 1 que han enviado una transacción de retiro completo y han completado el proceso de salida del staking se les retira su saldo completo de ETH a su dirección de retiro. No es posible que un validador de Tipo 1 solicite manualmente el retiro de cantidades específicas de ETH.

Los **validadores compuestos (Tipo 2)** pueden activar retiros parciales de una cantidad específica desde la capa de ejecución, siempre y cuando el saldo restante del validador se mantenga en o por encima de 32 ETH. Esto requiere enviar una transacción de retiro parcial y cuesta gas.
</ExpandableCard>

<ExpandableCard
title="I operate a validator. Where can I find more information about managing the withdrawal process?"
eventCategory="FAQ"
eventAction="I operate a validator. Where can I find more information about managing the withdrawal process?"
eventName="read more">

Se recomienda a los operadores de validadores que visiten la página de [Retiros del Staking Launchpad](https://launchpad.ethereum.org/withdrawals/), donde encontrarán más detalles sobre cómo preparar su validador para los retiros, el momento de los eventos y más detalles sobre cómo funcionan los retiros.

Para probar su configuración en una red de prueba primero, visite el [Staking Launchpad de la red de prueba Hoodi](https://hoodi.launchpad.ethereum.org) para comenzar.

</ExpandableCard>

<ExpandableCard
title="Can I re-activate my validator after exiting by depositing more ETH?"
eventCategory="FAQ"
eventAction="Can I re-activate my validator after exiting by depositing more ETH?"
eventName="read more">
No. Una vez que un validador ha salido y su saldo completo ha sido retirado, cualquier ETH adicional depositado en ese validador se transferirá automáticamente a la dirección de retiro durante el próximo barrido de validador. Para comenzar a hacer staking nuevamente usando ese ETH, debe activar un nuevo validador.
</ExpandableCard>

<ExpandableCard
title="What is the difference between legacy and compounding validators?"
eventCategory="FAQ"
eventAction="What is the difference between legacy and compounding validators?"
eventName="read more">
Los validadores heredados usan credenciales de retiro de **Tipo 1** (la dirección de la credencial de retiro comienza con 0x01) y tienen un saldo efectivo limitado a 32 ETH. Cualquier exceso de ETH recibido como recompensas de la red se barre automáticamente a la dirección de retiro cada pocos días.

Los validadores compuestos usan credenciales de retiro de **Tipo 2** (la dirección de la credencial de retiro comienza con 0x02) y pueden tener un saldo efectivo de hasta 2048 ETH. Las recompensas se componen en el saldo efectivo del validador, lo que aumenta el peso del validador en la red y su potencial para recibir futuras recompensas. Los barridos automáticos solo ocurren para el saldo que excede los 2048 ETH. Para retirar ETH por debajo de este umbral, se debe activar un retiro parcial manual desde la capa de ejecución.

Para obtener más detalles, consulte el [análisis detallado de MaxEB](/roadmap/pectra/maxeb/).
</ExpandableCard>

<ExpandableCard
title="How do I convert to a compounding validator?"
eventCategory="FAQ"
eventAction="How do I convert to a compounding validator?"
eventName="read more">
Puede convertir las credenciales de retiro del Tipo 1 al Tipo 2 utilizando el [Staking Launchpad](https://launchpad.ethereum.org/validator-actions). Esta operación es **irreversible**: una vez que se convierte, no puede volver a las credenciales de Tipo 1.

Después de la conversión, también puede **consolidar** múltiples validadores en uno solo, combinando sus saldos en un único validador compuesto. Para obtener un tutorial completo del proceso de conversión, los riesgos y las herramientas de consolidación, consulte el [análisis detallado de MaxEB](/roadmap/pectra/maxeb/).
</ExpandableCard>

<ExpandableCard
title="When were staking withdrawals enabled?"
eventCategory="FAQ"
eventAction="When were staking withdrawals enabled?"
eventName="read more">
La funcionalidad de retiro se habilitó originalmente como parte de la actualización Shanghái/Capella el **12 de abril de 2023**. La [actualización Pectra](/roadmap/pectra/) (mayo de 2025) introdujo posteriormente los validadores compuestos con un saldo efectivo máximo más alto de 2048 ETH, así como salidas y retiros parciales activados por la capa de ejecución.

La actualización Shanghái/Capella permitió que el ETH previamente en staking fuera reclamado en cuentas regulares de Ethereum. Esto cerró el ciclo de la liquidez del staking y acercó a Ethereum un paso más en su viaje hacia la construcción de un ecosistema descentralizado sostenible, escalable y seguro.

- [Más sobre la historia de Ethereum](/ethereum-forks/)
- [Más sobre la hoja de ruta de Ethereum](/roadmap/)
</ExpandableCard>

## Más información {#further-reading}

- [Retiros del Staking Launchpad](https://launchpad.ethereum.org/withdrawals)
- [Acciones del validador del Staking Launchpad](https://launchpad.ethereum.org/validator-actions)
- [Análisis detallado de MaxEB: composición y consolidación](/roadmap/pectra/maxeb/)
- [EIP-4895: Retiros automáticos (push) de la cadena de balizas como operaciones](https://eips.ethereum.org/EIPS/eip-4895)
- [PEEPanEIP #94: Retiro de ETH en staking (Pruebas) con Potuz y Hsiao-Wei Wang](https://www.youtube.com/watch?v=G8UstwmGtyE)
- [PEEPanEIP#68: EIP-4895: Retiros automáticos (push) de la cadena de balizas como operaciones con Alex Stokes](https://www.youtube.com/watch?v=CcL9RJBljUs)
- [Comprender el saldo efectivo del validador](https://www.attestant.io/posts/understanding-validator-effective-balance/)