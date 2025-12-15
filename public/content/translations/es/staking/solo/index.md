---
title: Participe desde casa con sus ETH
description: Un resumen de cómo empezar con la partición desde casa de sus ETH
lang: es
template: staking
emoji: ":money_with_wings:"
image: /images/staking/leslie-solo.png
alt: Leslie, el rinoceronte, en su propio chip.
sidebarDepth: 2
summaryPoints:
  - Reciba el máximo de recompensas directamente del protocolo al mantener su validador conectado y funcionando correctamente
  - Ejecute hardware doméstico y contribuya personalmente a la seguridad y a la descentralización de la red Ethereum.
  - Desconfíe y no deje nunca de controlar las claves de sus fondos
---

## ¿Qué es el staking en solitario? {#what-is-solo-staking}

El staking en casa consiste en [ejecutar un nodo de Ethereum](/run-a-node/) conectado a Internet y depositar 32 ETH para activar un [validador](#faq), lo que le otorga la capacidad de participar directamente en el consenso de la red.

**El staking en solitario aumenta la descentralización de la red Ethereum**, lo que hace que Ethereum sea más resistente a la censura y robusto frente a los ataques. Es posible que otros métodos de staking no ayuden a la red de la misma manera. El staking en solitario es la mejor opción de staking para proteger Ethereum.

Un nodo de Ethereum consta de un cliente de la capa de ejecución (EL), así como de un cliente de la capa de consenso (CL). Estos clientes son software que trabajan juntos, junto con un conjunto válido de claves de firma, para verificar transacciones y bloques, dar fe de la cabecera correcta de la cadena, agregar atestaciones y proponer bloques.

Los stakers en solitario son responsables de operar el hardware necesario para ejecutar estos clientes. Es muy recomendable utilizar una máquina dedicada para esto que opere desde casa; esto es extremadamente beneficioso para la salud de la red.

Un participante desde casa recibe las recompensas directamente desde el protocolo por mantener su validador funcionando correctamente y en línea.

## ¿Por qué hacer staking en solitario? {#why-stake-solo}

Participar desde casa conlleva más responsabilidad, pero proporciona el máximo control posible sobre los fondos y la configuración de los validadores.

<CardGrid>
  <Card title="Earn fresh ETH" emoji="💸" description="Earn ETH-denominated rewards directly from the protocol when your validator is online, without any middlemen taking a cut." />
  <Card title="Full control" emoji="🎛️" description="Keep your own keys. Choose the combination of clients and hardware that allows you to minimize your risk and best contribute to the health and security of the network. Third-party staking services make these decisions for you, and they don't always make the safest choices." />
  <Card title="Network security" emoji="🔐" description="Home staking is the most impactful way to stake. By running a validator on your own hardware at home, you strengthen the robustness, decentralization, and security of the Ethereum protocol." />
</CardGrid>

## Consideraciones antes de hacer staking en casa {#considerations-before-staking-solo}

Por mucho que nos gustaría que el staking en solitario fuera accesible y sin riesgos для todos, esa no es la realidad. Hay algunas consideraciones prácticas y serias que se deben tener en cuenta antes de elegir hacer staking en solitario con sus ETH.

<InfoGrid>
<ExpandableCard title="Required reading" eventCategory="SoloStaking" eventName="clicked required reading">
Al operar su propio nodo, debe dedicar algo de tiempo a aprender a usar el software que ha elegido. Esto implica leer la documentación pertinente y estar en sintonía con los canales de comunicación de esos equipos de desarrollo.

Cuanto más comprenda sobre el software que está ejecutando y cómo funciona la prueba de participación, menos arriesgado será como staker y más fácil será solucionar cualquier problema que pueda surgir en el camino como operador de nodo. </ExpandableCard>

<ExpandableCard title="Comfortable with computers" eventCategory="SoloStaking" eventName="clicked comfortable with computers">
La configuración del nodo requiere un nivel razonable de comodidad al trabajar con ordenadores, aunque las nuevas herramientas lo hacen más fácil con el tiempo. La comprensión de la interfaz de la línea de comandos es útil, pero ya no es estrictamente necesaria.

También requiere una configuración de hardware muy básica y cierta comprensión de las especificaciones mínimas recomendadas. </ExpandableCard>

<ExpandableCard title="Secure key management" eventCategory="SoloStaking" eventName="clicked secure key management">
Al igual que las claves privadas protegen su dirección de Ethereum, deberá generar claves específicamente para su validador. Debe comprender cómo mantener seguras las frases de recuperación o las claves privadas.{' '}

[Seguridad en Ethereum y prevención de estafas](/security/) </ExpandableCard>

<ExpandableCard title="Maintenance" eventCategory="SoloStaking" eventName="clicked maintenance">
El hardware falla ocasionalmente, las conexiones de red fallan y el software del cliente necesita actualizarse ocasionalmente. El mantenimiento del nodo es inevitable y ocasionalmente requerirá su atención. Deberá asegurarse de estar al tanto de cualquier actualización de red anticipada u otras actualizaciones críticas del cliente.
</ExpandableCard>

<ExpandableCard title="Reliable uptime" eventCategory="SoloStaking" eventName="clicked reliable uptime">
Sus recompensas son proporcionales al tiempo que su validador está en línea y atestiguando correctamente. El tiempo de inactividad incurre en penalizaciones proporcionales a cuántos otros validadores están desconectados al mismo tiempo, pero <a href="#faq">no resulta en slashing</a>. El ancho de banda también importa, ya que las recompensas disminuyen por las atestaciones que no se reciben a tiempo. Los requisitos variarán, pero se recomienda un mínimo de 10 Mb/s de subida y bajada.
</ExpandableCard>

<ExpandableCard title="Slashing risk" eventCategory="SoloStaking" eventName="clicked slashing risk">
A diferencia de las penalizaciones por inactividad por estar desconectado, el <em>slashing</em> es una penalización mucho más grave reservada para las infracciones maliciosas. Al ejecutar un cliente minoritario con sus claves cargadas en una sola máquina a la vez, se minimiza el riesgo de sufrir slashing. Dicho esto, todos los stakers deben ser conscientes de los riesgos del slashing.

<a href="https://medium.com/prysmatic-labs/eth2-slashing-prevention-tips-f6faa5025f50/"> Más información sobre penalizaciones (slashing) y el ciclo de vida de los validadores</a> </ExpandableCard> </InfoGrid>

<StakingComparison page="solo" />

## Cómo funciona {#how-it-works}

<StakingHowSoloWorks />

Mientras esté activo, obtendrá recompensas ETH que se depositarán periódicamente en su dirección de retirada.

Si alguna vez lo desea, puede salir como validador, lo que elimina el requisito de estar en línea y detiene cualquier recompensa adicional. Su saldo restante se retirará a la dirección de retiro que designe durante la configuración.

[Más información sobre las retiradas de participaciones](/staking/withdrawals/)

## Comenzar en Staking Launchpad {#get-started-on-the-staking-launchpad}

El Staking Launchpad es una aplicación de código abierto que le ayudará a convertirse en un staker. Le guiará en la elección de sus clientes, la generación de sus claves y el depósito de su ETH en el contrato de depósito de staking. Se proporciona una lista de verificación para asegurarse de que ha cubierto todo para configurar su validador de forma segura.

<StakingLaunchpadWidget />

## Qué considerar sobre las herramientas para configurar nodos y clientes {#node-tool-considerations}

Existe un número cada vez mayor de herramientas y servicios para ayudarle a participar desde casa con sus ETH, pero cada una comporta diferentes riesgos y beneficios.

Los indicadores de atributos se utilizan a continuación para señalar las fortalezas o debilidades notables que puede tener una herramienta de staking listada. Utilice esta sección como referencia para saber cómo definimos estos atributos mientras elige qué herramientas le ayudarán en su viaje de staking.

<StakingConsiderations page="solo" />

## Explorar herramientas para la configuración de nodos y clientes {#node-and-client-tools}

Hay una variedad de opciones disponibles para ayudarle con su configuración. Utilice los indicadores anteriores para guiarse a través de las herramientas que se enumeran a continuación.

<ProductDisclaimer />

### Herramientas de nodo

<StakingProductsCardGrid category="nodeTools" />

Tenga en cuenta la importancia de elegir un [cliente minoritario](/developers/docs/nodes-and-clients/client-diversity/), ya que mejora la seguridad de la red y limita su riesgo. Las herramientas que le permiten configurar un cliente minoritario se indican como <em style={{ textTransform: "uppercase" }}>"multicliente".</em>

### Generadores de claves

Estas herramientas pueden utilizarse como alternativa al [Staking Deposit CLI](https://github.com/ethereum/staking-deposit-cli/) para ayudar con la generación de claves.

<StakingProductsCardGrid category="keyGen" />

¿Tiene alguna sugerencia sobre una herramienta de staking que nos hayamos perdido? Consulte nuestra [política de listado de productos](/contributing/adding-staking-products/) para ver si encajaría bien y para enviarla a revisión.

## Explorar guías de staking en casa {#staking-guides}

<StakingGuides />

## Preguntas frecuentes {#faq}

Estas son algunas de las preguntas más comunes sobre la participación que vale la pena conocer.

<ExpandableCard title="What is a validator?">

Un <em>validador</em> es una entidad virtual que vive en la cadena de baliza y que participa en el consenso del protocolo Ethereum. Los validadores están representados por un saldo, una clave pública y otras propiedades. Un <em>cliente validador</em> es el software que actúa en nombre del validador al mantener y utilizar su clave privada. Un solo cliente validador puede mantener muchos pares de claves, controlando muchos validadores.

</ExpandableCard>

<ExpandableCard title="Can I deposit more than 32 ETH?">
Sí, las cuentas de validador modernas son capaces de mantener hasta 2048 ETH. El ETH adicional por encima de 32 se compondrá de forma escalonada, aumentando en incrementos de números enteros a medida que aumenta su saldo real. Esto se conoce como su <a href="https://www.attestant.io/posts/understanding-validator-effective-balance/">saldo efectivo</a>.

Para aumentar el saldo efectivo de una cuenta, y así aumentar las recompensas, se debe cruzar un búfer de 0,25 ETH por encima de cualquier umbral de ETH completo. Por ejemplo, una cuenta con un saldo real de 32,9 y un saldo efectivo de 32 necesitaría ganar otros 0,35 ETH para llevar su saldo real por encima de 33,25 antes de provocar un aumento en el saldo efectivo.

Este búfer también evita que un saldo efectivo caiga hasta que haya bajado 0,25 ETH por debajo de su saldo efectivo actual.

Cada par de claves asociado con un validador requiere al menos 32 ETH para ser activado. Cualquier saldo por encima de esto puede ser retirado a la dirección de retiro asociada en cualquier momento a través de una transacción firmada por esta dirección. Cualquier fondo por encima del saldo efectivo máximo será retirado automáticamente de forma periódica.

Si el staking en solitario le parece demasiado exigente, considere usar un proveedor de [staking como servicio](/staking/saas/), o si está trabajando con menos de 32 ETH, consulte los [grupos de staking](/staking/pools/). </ExpandableCard>

<ExpandableCard title="Will I be slashed if I go offline? (tldr: No.)">
Desconectarse cuando la red está finalizando correctamente NO dará lugar a slashing. Se incurren en pequeñas <em>penalizaciones por inactividad</em> si su validador no está disponible para atestiguar durante una época determinada (cada una de 6,4 minutos de duración), pero esto es muy diferente al <em>slashing</em>. Estas penalizaciones son ligeramente menores que la recompensa que habría ganado si el validador hubiera estado disponible para atestiguar, y las pérdidas se pueden recuperar con aproximadamente la misma cantidad de tiempo en línea de nuevo.

Tenga en cuenta que las penalizaciones por inactividad son proporcionales a la cantidad de validadores que están desconectados al mismo tiempo. En los casos en que una gran parte de la red está desconectada a la vez, las penalizaciones para cada uno de estos validadores serán mayores que cuando un solo validador no está disponible.

En casos extremos, si la red deja de finalizar como resultado de que más de un tercio de los validadores estén desconectados, estos usuarios sufrirán lo que se conoce como una <em>fuga de inactividad cuadrática</em>, que es un drenaje exponencial de ETH de las cuentas de validador desconectadas. Esto permite que la red finalmente se autorrepare quemando el ETH de los validadores inactivos hasta que su saldo alcance los 16 ETH, momento en el cual serán expulsados automáticamente del grupo de validadores. Los validadores en línea restantes eventualmente comprenderán más de 2/3 de la red nuevamente, satisfaciendo la supermayoría necesaria para finalizar una vez más la cadena. </ExpandableCard>

<ExpandableCard title="How do I ensure I don't get slashed?">
En resumen, esto nunca se puede garantizar por completo, pero si actúa de buena fe, ejecuta un cliente minoritario y mantiene sus claves de firma en solo una máquina a la vez, el riesgo de ser penalizado (slashed) es casi nulo.

Solo hay unas pocas formas específicas que pueden resultar en que un validador sea slasheado y expulsado de la red. En el momento de escribir este artículo, los slashings que han ocurrido han sido exclusivamente producto de configuraciones de hardware redundantes donde las claves de firma se almacenan en dos máquinas separadas a la vez. Esto puede resultar inadvertidamente en un <em>doble voto</em> de sus claves, lo cual es una ofensa slasheable.

Ejecutar un cliente de supermayoría (cualquier cliente utilizado por más de 2/3 de la red) también conlleva el riesgo de un posible slashing en caso de que este cliente tenga un error que resulte en una bifurcación de la cadena. Esto puede resultar en una bifurcación defectuosa que se finaliza. Para volver a la cadena prevista, sería necesario enviar un <em>voto envolvente</em> intentando deshacer un bloque finalizado. Esto también es una ofensa slasheable y puede evitarse simplemente ejecutando un cliente minoritario en su lugar.

Errores equivalentes en un cliente minoritario <em>nunca finalizarán (bloques) </em> y, por lo tanto, nunca resultarían en un voto surround («envolvente»), y simplemente resultaría en penalizaciones por inactividad, <em>no de «recorte»</em>.

<ul>
  <li><a href="https://hackernoon.com/ethereums-client-diversity-problem">Obtenga más información sobre la importancia de ejecutar un cliente minoritario.</a></li>
  <li><a href="https://medium.com/prysmatic-labs/eth2-slashing-prevention-tips-f6faa5025f50">Obtenga más información sobre la prevención de penalizaciones (slashing)</a></li>
</ul>
</ExpandableCard>

<ExpandableCard title="Which client is best?">
Los clientes individuales pueden variar ligeramente en términos de rendimiento e interfaz de usuario, ya que cada uno es desarrollado por diferentes equipos utilizando una variedad de lenguajes de programación. Dicho esto, ninguno de ellos es el "mejor". Todos los clientes de producción son excelentes piezas de software, que realizan las mesmas funciones básicas para sincronizar e interactuar con la blockchain.

Dado que todos los clientes de producción proporcionan la misma funcionalidad básica, es muy importante que elija un <strong>cliente minoritario</strong>, es decir, cualquier cliente que NO esté siendo utilizado actualmente por la mayoría de los validadores en la red. Esto puede sonar contraintuitivo, pero ejecutar un cliente mayoritario o de supermayoría le pone en un mayor riesgo de slashing en caso de un error en ese cliente. Ejecutar un cliente minoritario limita drásticamente estos riesgos.

<a href="https://mirror.xyz/jmcook.eth/S7ONEka_0RgtKTZ3-dakPmAHQNPvuj15nh0YGKPFriA">Obtenga más información sobre por qué la diversidad de clientes es fundamental</a> </ExpandableCard>

<ExpandableCard title="Can I just use a VPS (virtual private server)?">
Aunque un servidor privado virtual (VPS) puede usarse como reemplazo del hardware doméstico, el acceso físico y la ubicación de su cliente validador <em>sí importan</em>. Las soluciones de nube centralizadas como Amazon Web Services o Digital Ocean permiten la conveniencia de no tener que obtener y operar hardware, a costa de centralizar la red.

Cuantos más clientes validadores se ejecuten en una única solución de almacenamiento en la nube centralizada, más peligroso se vuelve para estos usuarios. Cualquier evento que desconecte a estos proveedores, ya sea por un ataque, demandas regulatorias o simplemente cortes de energía/internet, resultará en que cada cliente validador que dependa de este servidor se desconecte al mismo tiempo.

Las penalizaciones por estar desconectado son proporcionales a cuántos otros están desconectados al mismo tiempo. El uso de un VPS aumenta en gran medida el riesgo de que las penalizaciones por estar desconectado sean más severas, y aumenta su riesgo de fuga cuadrática o slashing en caso de que la interrupción sea lo suficientemente grande. Para minimizar su propio riesgo y el riesgo para la red, se recomienda encarecidamente a los usuarios que obtengan y operen su propio hardware. </ExpandableCard>

<ExpandableCard title="How do I unlock my rewards or get my ETH back?">

Las retiradas de cualquier tipo de la cadena de baliza requieren que se establezcan credenciales de retirada.

Los nuevos stakers establecen esto en el momento de la generación de claves y el depósito. Los stakers existentes que aún no lo hayan configurado pueden actualizar sus claves para admitir esta funcionalidad.

Una vez establecidas las credenciales de retirada, los pagos de recompensa (ETH acumulados por encima de los 32 iniciales) se distribuirán periódica y automáticamente a la dirección de retirada.

Para desbloquear y recibir el saldo completo, también debe completar el proceso de salida de su validador.

<ButtonLink href="/staking/withdrawals/">Más sobre retiros de staking</ButtonLink> </ExpandableCard>

## Lecturas adicionales {#further-reading}

- [El Directorio de Staking de Ethereum](https://www.staking.directory/) - _Eridian y Spacesider_
- [El problema de la diversidad de clientes en Ethereum](https://hackernoon.com/ethereums-client-diversity-problem) - _@emmanuelawosika 2022_
- [Ayudando a la diversidad de clientes](https://www.attestant.io/posts/helping-client-diversity/) - _Jim McDonald 2022_
- [Diversidad de clientes en la capa de consenso de Ethereum](https://mirror.xyz/jmcook.eth/S7ONEka_0RgtKTZ3-dakPmAHQNPvuj15nh0YGKPFriA) - _jmcook.eth 2022_
- [Cómo: Comprar hardware para validadores de Ethereum](https://www.youtube.com/watch?v=C2wwu1IlhDc) - _EthStaker 2022_
- [Consejos de prevención de penalizaciones en Eth2](https://medium.com/prysmatic-labs/eth2-slashing-prevention-tips-f6faa5025f50) - _Raul Jordan 2020_

<QuizWidget quizKey="staking-solo" />
