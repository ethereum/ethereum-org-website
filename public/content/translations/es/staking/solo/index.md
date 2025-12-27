---
title: Participe desde casa con sus ETH
description: "Un resumen de cómo empezar con la partición desde casa de sus ETH"
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

## ¿Qué es el staking doméstico? {#what-is-solo-staking}

El staking en casa consiste en [ejecutar un nodo de Ethereum](/run-a-node/) conectado a Internet y depositar 32 ETH para activar un [validador](#faq), lo que le otorga la capacidad de participar directamente en el consenso de la red.

**El staking doméstico aumenta la descentralización de la red Ethereum**, lo que hace que Ethereum sea más resistente a la censura y más robusta ante los ataques. Es posible que otros métodos de staking no ayuden a la red de la misma manera. El staking doméstico es la mejor opción de staking para proteger Ethereum.

Un nodo de Ethereum se compone de un cliente de capa de ejecución (EL) y de un cliente de capa de consenso (CL). Estos clientes son un software que funciona conjuntamente, junto con un conjunto válido de claves de firma, para verificar transacciones y bloques, dar fe de la cabecera correcta de la cadena, agregar atestaciones y proponer bloques.

Los stakers domésticos son responsables de operar el hardware necesario para ejecutar estos clientes. Es muy recomendable utilizar una máquina dedicada para esto que usted opere desde casa, esto es extremadamente beneficioso para la salud de la red.

Un participante desde casa recibe las recompensas directamente desde el protocolo por mantener su validador funcionando correctamente y en línea.

## ¿Por qué hacer staking desde casa? {#why-stake-solo}

Participar desde casa conlleva más responsabilidad, pero proporciona el máximo control posible sobre los fondos y la configuración de los validadores.

<CardGrid>
  <Card title="Gana ETH nuevo" emoji="💸" description="Gana recompensas en ETH directamente del protocolo cuando tu validador esté en línea, sin que los intermediarios se lleven una parte." />
  <Card title="Control total" emoji="🎛️" description="Conserva tus propias claves. Elige la combinación de clientes y hardware que te permita minimizar tu riesgo y contribuir mejor a la salud y seguridad de la red. Los servicios de staking de terceros toman estas decisiones por ti y no siempre eligen las opciones más seguras." />
  <Card title="Seguridad de la red" emoji="🔐" description="Hacer staking en casa es la forma de staking con mayor impacto. Al ejecutar un validador en tu propio hardware en casa, fortaleces la robustez, la descentralización y la seguridad del protocolo de Ethereum." />
</CardGrid>

## Consideraciones antes de hacer staking en casa {#considerations-before-staking-solo}

Por mucho que deseemos que el staking doméstico sea accesible y esté libre de riesgos para todo el mundo, no es la realidad. Hay algunas consideraciones prácticas y serias a tener en cuenta antes de elegir hacer staking doméstico con sus ETH.

<InfoGrid>
<ExpandableCard title="Lectura obligatoria" eventCategory="SoloStaking" eventName="clicked required reading">
Cuando opere su propio nodo, debe dedicar algo de tiempo a aprender a usar el software que ha elegido. Esto implica leer la documentación pertinente y estar en sintonía con los canales de comunicación de los equipos de desarrollo.

Cuanto más entienda sobre el software que está ejecutando y cómo funciona la prueba de participación, menos arriesgado será como staker, y más fácil será solucionar cualquier problema que pueda surgir en el camino como operador de nodos.
</ExpandableCard>

<ExpandableCard title="Soltura con las computadoras" eventCategory="SoloStaking" eventName="clicked comfortable with computers">
La configuración de un nodo requiere un nivel de comodidad razonable a la hora de trabajar con ordenadores, aunque las nuevas herramientas facilitan cada vez más esta tarea. Entender la interfaz de línea de comandos es útil, pero ya no es estrictamente necesario.

También requiere una configuración de hardware muy básica y cierta comprensión de las especificaciones mínimas recomendadas.
</ExpandableCard>

<ExpandableCard title="Gestión segura de claves" eventCategory="SoloStaking" eventName="clicked secure key management">
Al igual que las claves privadas protegen su dirección de Ethereum, tendrá que generar claves específicas para su validador. Debe entender cómo mantener seguras y a salvo las frases semilla o las claves privadas.{' '}

[Seguridad en Ethereum y prevención de estafas](/security/)
</ExpandableCard>

<ExpandableCard title="Mantenimiento" eventCategory="SoloStaking" eventName="clicked maintenance">
El hardware falla ocasionalmente, las conexiones de red dan error y el software cliente necesita actualizarse de vez en cuando. El mantenimiento de los nodos es inevitable y requerirá su atención de vez en cuando. Deberá asegurarse de estar al tanto de cualquier actualización prevista de la red o de otras actualizaciones críticas de los clientes.
</ExpandableCard>

<ExpandableCard title="Tiempo de actividad confiable" eventCategory="SoloStaking" eventName="clicked reliable uptime">
Sus recompensas son proporcionales al tiempo que su validador está en línea y atestiguando correctamente. El tiempo de inactividad conlleva penalizaciones proporcionales al número de validadores que estén desconectados al mismo tiempo, pero <a href="#faq">no da lugar a slashing</a>. El ancho de banda también importa, ya que las recompensas disminuyen por las atestaciones que no se reciben a tiempo. Los requisitos varían, pero se recomienda un mínimo de 10 Mb/s de subida y bajada.
</ExpandableCard>

<ExpandableCard title="Riesgo de slashing" eventCategory="SoloStaking" eventName="clicked slashing risk">
A diferencia de las penalizaciones por inactividad por estar desconectado, el <em>slashing</em> es una penalización mucho más grave reservada para las infracciones maliciosas. Al ejecutar un cliente minoritario con las claves cargadas en una sola máquina a la vez, se minimiza el riesgo de sufrir slashing. Dicho esto, todos los stakers deben ser conscientes de los riesgos del slashing.

<a href="https://medium.com/prysmatic-labs/eth2-slashing-prevention-tips-f6faa5025f50/"> Más información sobre penalizaciones (slashing) y el ciclo de vida de los validadores</a>
</ExpandableCard>

</InfoGrid>

<StakingComparison page="solo" />

## Cómo funciona {#how-it-works}

<StakingHowSoloWorks />

Mientras esté activo, obtendrá recompensas ETH que se depositarán periódicamente en su dirección de retirada.

Si lo desea, puede salir como validador, lo que elimina el requisito de estar en línea y detiene cualquier recompensa adicional. Su saldo restante se retirará a la dirección de retiro que designe durante la configuración.

[Más información sobre las retiradas de participaciones](/staking/withdrawals/)

## Comenzar en Staking Launchpad {#get-started-on-the-staking-launchpad}

La Plataforma de lanzamiento de staking es una aplicación de código abierto que le ayudará a convertirse en un staker. Le guiará en la elección de sus clientes, la generación de sus claves y el depósito de sus ETH en el contrato de depósito de staking. Se proporciona una lista de verificación para asegurarse de que ha cubierto todo para configurar su validador de forma segura.

<StakingLaunchpadWidget />

## Qué considerar sobre las herramientas para configurar nodos y clientes {#node-tool-considerations}

Existe un número cada vez mayor de herramientas y servicios para ayudarle a participar desde casa con sus ETH, pero cada una comporta diferentes riesgos y beneficios.

Los indicadores de atributos se utilizan a continuación para señalar las fortalezas o debilidades notables que pueda tener una herramienta de staking de la lista. Utilice esta sección como referencia para saber cómo definimos estos atributos mientras elige las herramientas que le ayudarán en su viaje de staking.

<StakingConsiderations page="solo" />

## Explorar herramientas para la configuración de nodos y clientes {#node-and-client-tools}

Existe una gran variedad de opciones disponibles para ayudarle con su configuración. Utilice los indicadores anteriores para guiarse a través de las herramientas siguientes.

<ProductDisclaimer />

### Herramientas de nodo

<StakingProductsCardGrid category="nodeTools" />

Tenga en cuenta la importancia de elegir un [cliente minoritario](/developers/docs/nodes-and-clients/client-diversity/), ya que mejora la seguridad de la red y limita su riesgo. Las herramientas que le permiten configurar un cliente minoritario se denominan <em style={{ textTransform: "uppercase" }}>"multicliente."</em>

### Generadores de claves

Estas herramientas pueden utilizarse como alternativa al [Staking Deposit CLI](https://github.com/ethereum/staking-deposit-cli/) para ayudar con la generación de claves.

<StakingProductsCardGrid category="keyGen" />

¿Tiene alguna sugerencia para una herramienta de participación no cubierta? Consulte nuestra [política de listado de productos](/contributing/adding-staking-products/) para ver si sería adecuado, y para enviarlo para su revisión.

## Explorar guías de staking en casa {#staking-guides}

<StakingGuides />

## Preguntas frecuentes {#faq}

Estas son algunas de las preguntas más comunes sobre la participación que vale la pena conocer.

<ExpandableCard title="¿Qué es un validador?">

Un <em>validador</em> es una entidad virtual que vive en Ethereum y participa en el consenso del protocolo de Ethereum. Los validadores están representados por un saldo, una clave pública y otras propiedades. Un <em>cliente validador</em> es el software que actúa en nombre del validador al mantener y utilizar su clave privada. Un único cliente validador puede contener muchos pares de claves, controlando a muchos validadores.
</ExpandableCard>

<ExpandableCard title="¿Puedo depositar más de 32 ETH?">
Sí, las cuentas de validador modernas son capaces de albergar hasta 2048 ETH. El ETH adicional por encima de 32 se compondrá de forma escalonada, aumentando en incrementos de números enteros a medida que aumente su saldo real. Esto se conoce como su <a href="https://www.attestant.io/posts/understanding-validator-effective-balance/">saldo efectivo</a>.

Para aumentar el saldo efectivo de una cuenta, y por lo tanto aumentar las recompensas, se debe cruzar un búfer de 0,25 ETH por encima de cualquier umbral de ETH completo. Por ejemplo, una cuenta con un saldo real de 32,9 y un saldo efectivo de 32 necesitaría ganar otros 0,35 ETH para que su saldo real supere los 33,25 antes de provocar un aumento del saldo efectivo.

Este búfer también evita que un saldo efectivo caiga hasta que haya bajado 0,25 ETH por debajo de su saldo efectivo actual.

Cada par de claves asociado a un validador requiere al menos 32 ETH para ser activado. Cualquier saldo por encima de este puede ser retirado a la dirección de retiro asociada en cualquier momento a través de una transacción firmada por esta dirección. Cualquier fondo que supere el saldo efectivo máximo se retirará automáticamente de forma periódica.

Si el staking doméstico le parece demasiado exigente, considere la posibilidad de utilizar un proveedor de [staking como servicio](/staking/saas/), o si está trabajando con menos de 32 ETH, consulte los [grupos de staking](/staking/pools/).
</ExpandableCard>

<ExpandableCard title="¿Me aplicarán slashing si me desconecto? (En resumen: no).">
Desconectarse cuando la red está finalizando correctamente NO dará lugar a slashing. Se incurre en pequeñas <em>penalizaciones por inactividad</em> si su validador no está disponible para atestiguar durante una época determinada (cada una de 6,4 minutos de duración), pero esto es muy diferente del <em>slashing</em>. Estas penalizaciones son ligeramente inferiores a la recompensa que habría obtenido si el validador hubiera estado disponible para atestiguar, y las pérdidas pueden recuperarse con aproximadamente la misma cantidad de tiempo en línea de nuevo.

Tenga en cuenta que las penalizaciones por inactividad son proporcionales al número de validadores que estén desconectados al mismo tiempo. En los casos en que una gran parte de la red está desconectada a la vez, las penalizaciones para cada uno de estos validadores serán mayores que cuando un solo validador no está disponible.

En casos extremos, si la red deja de finalizar como resultado de que más de un tercio de los validadores están desconectados, estos usuarios sufrirán lo que se conoce como una <em>fuga de inactividad cuadrática</em>, que es un drenaje exponencial de ETH de las cuentas de los validadores desconectados. Esto permite que la red se autocure eventualmente quemando el ETH de los validadores inactivos hasta que su saldo alcance los 16 ETH, momento en el que serán expulsados automáticamente del grupo de validadores. Los validadores restantes en línea acabarán constituyendo de nuevo más de 2/3 de la red, satisfaciendo la supermayoría necesaria para volver a finalizar la cadena.
</ExpandableCard>

<ExpandableCard title="¿Cómo evito que me apliquen slashing?">
En resumen, esto nunca se puede garantizar por completo, pero si actúa de buena fe, ejecuta un cliente minoritario y mantiene sus claves de firma en solo una máquina a la vez, el riesgo de ser penalizado (slashed) es casi nulo.

Solo hay unas pocas formas específicas que pueden hacer que un validador sea objeto de slashing y expulsado de la red. En el momento de redactar este informe, los slashings que se han producido han sido exclusivamente producto de configuraciones de hardware redundantes en las que las claves de firma se almacenan en dos máquinas distintas a la vez. Esto puede dar lugar inadvertidamente a un <em>voto doble</em> de sus claves, lo que es una infracción sancionable con slashing.

Ejecutar un cliente de supermayoría (cualquier cliente utilizado por más de 2/3 de la red) también conlleva el riesgo de un posible slashing en caso de que este cliente tenga un error que resulte en una bifurcación de la cadena. Esto puede dar lugar a una bifurcación defectuosa que se finalice. Para volver a la cadena prevista sería necesario presentar un <em>voto envolvente</em> intentando deshacer un bloque finalizado. Esto también es una infracción sancionable con slashing y puede evitarse simplemente ejecutando un cliente minoritario en su lugar.

Errores equivalentes en un cliente minoritario <em>nunca finalizarán (bloques) </em> y, por lo tanto, nunca resultarían en un voto surround («envolvente»), y simplemente resultaría en penalizaciones por inactividad, <em>no de «recorte»</em>.

<ul>
  <li><a href="https://hackernoon.com/ethereums-client-diversity-problem">Obtenga más información sobre la importancia de ejecutar un cliente minoritario.</a></li>
  <li><a href="https://medium.com/prysmatic-labs/eth2-slashing-prevention-tips-f6faa5025f50">Obtenga más información sobre la prevención de penalizaciones (slashing)</a></li>
</ul>
</ExpandableCard>

<ExpandableCard title="¿Cuál es el mejor cliente?">
Los clientes individuales pueden variar ligeramente en cuanto a rendimiento e interfaz de usuario, ya que cada uno de ellos está desarrollado por equipos diferentes que utilizan una variedad de lenguajes de programación. Dicho esto, ninguno de ellos es "el mejor". Todos los clientes de producción son excelentes piezas de software, que realizan las mismas funciones básicas para sincronizarse e interactuar con la cadena de bloques.

Dado que todos los clientes de producción ofrecen la misma funcionalidad básica, es muy importante que elija un <strong>cliente minoritario</strong>, es decir, cualquier cliente que NO esté siendo utilizado actualmente por la mayoría de los validadores de la red. Puede que esto suene contraintuitivo, pero ejecutar un cliente mayoritario o de supermayoría le expone a un mayor riesgo de slashing en caso de que se produzca un error en dicho cliente. Ejecutar un cliente minoritario limita drásticamente estos riesgos.

<a href="https://mirror.xyz/jmcook.eth/S7ONEka_0RgtKTZ3-dakPmAHQNPvuj15nh0YGKPFriA">Obtenga más información sobre por qué la diversidad de clientes es fundamental</a>
</ExpandableCard>

<ExpandableCard title="¿Puedo usar solo un VPS (servidor privado virtual)?">
Aunque se puede utilizar un servidor privado virtual (VPS) como sustituto del hardware doméstico, el acceso físico y la ubicación de su cliente validador <em>sí importan</em>. Las soluciones centralizadas en la nube, como Amazon Web Services o Digital Ocean, permiten la comodidad de no tener que obtener y operar hardware, a expensas de centralizar la red.

Cuantos más clientes validadores se ejecuten en una única solución de almacenamiento centralizado en la nube, más peligroso se vuelve para estos usuarios. Cualquier evento que desconecte a estos proveedores, ya sea por un ataque, por exigencias normativas o simplemente por cortes de energía o de Internet, hará que todos los clientes validadores que dependen de este servidor se desconecten al mismo tiempo.

Las penalizaciones por estar fuera de línea son proporcionales a cuántos otros están fuera de línea al mismo tiempo. El uso de un VPS aumenta en gran medida el riesgo de que las penalizaciones por desconexión sean más graves, y aumenta el riesgo de fugas cuadráticas o de slashing en caso de que la interrupción sea lo suficientemente grande. Para minimizar su propio riesgo y el de la red, se recomienda encarecidamente a los usuarios que obtengan y operen su propio hardware.
</ExpandableCard>

<ExpandableCard title="¿Cómo desbloqueo mis recompensas o recupero mi ETH?">

Las retiradas de cualquier tipo de la cadena de baliza requieren que se establezcan credenciales de retirada.

Los nuevos stakers lo establecen en el momento de la generación de la clave y del depósito. Los stakers existentes que aún no lo hayan establecido pueden actualizar sus claves para admitir esta funcionalidad.

Una vez establecidas las credenciales de retirada, los pagos de recompensa (ETH acumulados por encima de los 32 iniciales) se distribuirán periódica y automáticamente a la dirección de retirada.

Para desbloquear y recibir el saldo completo, también debe completar el proceso de salida de su validador.

<ButtonLink href="/staking/withdrawals/">Más sobre retiros de staking</ButtonLink>
</ExpandableCard>

## Lecturas adicionales {#further-reading}

- [El Directorio de Staking de Ethereum](https://www.staking.directory/) - _Eridian y Spacesider_
- [El problema de la diversidad de clientes en Ethereum](https://hackernoon.com/ethereums-client-diversity-problem) - _@emmanuelawosika 2022_
- [Ayudando a la diversidad de clientes](https://www.attestant.io/posts/helping-client-diversity/) - _Jim McDonald 2022_
- [Diversidad de clientes en la capa de consenso de Ethereum](https://mirror.xyz/jmcook.eth/S7ONEka_0RgtKTZ3-dakPmAHQNPvuj15nh0YGKPFriA) - _jmcook.eth 2022_
- [Cómo: Comprar hardware para validadores de Ethereum](https://www.youtube.com/watch?v=C2wwu1IlhDc) - _EthStaker 2022_
- [Consejos de prevención de penalizaciones en Eth2](https://medium.com/prysmatic-labs/eth2-slashing-prevention-tips-f6faa5025f50) - _Raul Jordan 2020_

<QuizWidget quizKey="staking-solo" />
