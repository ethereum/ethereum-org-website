---
title: Hacer staking de ETH desde casa
description: "Una descripción general de cómo empezar a hacer staking de ETH desde casa"
lang: es
template: staking
emoji: ":money_with_wings:"
image: /images/staking/leslie-solo.png
alt: El rinoceronte Leslie en su propio chip de computadora.
sidebarDepth: 2
summaryPoints:
  - Reciba las máximas recompensas directamente del protocolo por mantener su validador funcionando correctamente y en línea
  - Ejecute hardware doméstico y contribuya personalmente a la seguridad y descentralización de la red Ethereum
  - Elimine la necesidad de confianza y nunca ceda el control de las claves de sus fondos
---

## ¿Qué es el staking desde casa? {#what-is-solo-staking}

El staking desde casa es el acto de [ejecutar un nodo de Ethereum](/run-a-node/) conectado a internet y depositar 32 ETH para activar un [validador](#faq), lo que le da la capacidad de participar directamente en el consenso de la red.

**El staking desde casa aumenta la descentralización de la red Ethereum**, haciendo que [Ethereum](/) sea más resistente a la censura y robusto contra ataques. Otros métodos de staking pueden no ayudar a la red de la misma manera. El staking desde casa es la mejor opción de staking para asegurar Ethereum.

Un nodo de Ethereum consta tanto de un cliente de la capa de ejecución (EL) como de un cliente de la capa de consenso (CL). Estos clientes son software que trabajan juntos, junto con un conjunto válido de claves de firma, para verificar transacciones y bloques, dar fe de la cabeza correcta de la cadena, agregar atestaciones y proponer bloques.

Los que hacen staking desde casa son responsables de operar el hardware necesario para ejecutar estos clientes. Se recomienda encarecidamente utilizar una máquina dedicada para esto que opere desde casa; esto es extremadamente beneficioso para la salud de la red.

Quien hace staking desde casa recibe recompensas directamente del protocolo por mantener su validador funcionando correctamente y en línea.

## ¿Por qué hacer staking desde casa? {#why-stake-solo}

El staking desde casa conlleva más responsabilidad, pero le proporciona el máximo control sobre sus fondos y su configuración de staking.

<Grid>
  <Card title="Gana ETH nuevo" emoji="💸" description="Gana recompensas denominadas en ETH directamente del protocolo cuando tu validador está en línea, sin intermediarios que se lleven una parte." />
  <Card title="Control total" emoji="🎛️" description="Mantén tus propias claves. Elige la combinación de clientes y hardware que te permita minimizar tu riesgo y contribuir mejor a la salud y seguridad de la red. Los servicios de staking de terceros toman estas decisiones por ti, y no siempre toman las decisiones más seguras." />
  <Card title="Seguridad de la red" emoji="🔐" description="El staking en casa es la forma más impactante de hacer staking. Al ejecutar un validador en tu propio hardware en casa, fortaleces la solidez, la descentralización y la seguridad del protocolo Ethereum." />
</Grid>

## Consideraciones antes de hacer staking desde casa {#considerations-before-staking-solo}

Por mucho que deseemos que el staking desde casa sea accesible y libre de riesgos para todos, esta no es la realidad. Hay algunas consideraciones prácticas y serias a tener en cuenta antes de elegir hacer staking de sus ETH desde casa.

<ExpandableCard title="Lectura obligatoria" eventCategory="SoloStaking" eventName="clicked required reading">
Al operar su propio nodo, debe dedicar algo de tiempo a aprender a usar el software que ha elegido. Esto implica leer la documentación relevante y estar atento a los canales de comunicación de esos equipos de desarrollo.

Cuanto más entienda sobre el software que está ejecutando y cómo funciona la prueba de participación (PoS), menos riesgoso será como participante (staker), y más fácil será solucionar cualquier problema que pueda surgir en el camino como operador de nodo.
</ExpandableCard>

<ExpandableCard title="Familiaridad con las computadoras" eventCategory="SoloStaking" eventName="clicked comfortable with computers">
La configuración del nodo requiere un nivel razonable de comodidad al trabajar con computadoras, aunque las nuevas herramientas están facilitando esto con el tiempo. Comprender la interfaz de línea de comandos es útil, pero ya no es estrictamente necesario.

También requiere una configuración de hardware muy básica y cierta comprensión de las especificaciones mínimas recomendadas.
</ExpandableCard>

<ExpandableCard title="Gestión segura de claves" eventCategory="SoloStaking" eventName="clicked secure key management">
Al igual que las claves privadas aseguran su dirección de Ethereum, necesitará generar claves específicamente para su validador. Debe comprender cómo mantener seguras y protegidas las frases semilla o las claves privadas.{' '}

[Seguridad de Ethereum y prevención de estafas](/security/)
</ExpandableCard>

<ExpandableCard title="Mantenimiento" eventCategory="SoloStaking" eventName="clicked maintenance">
El hardware falla ocasionalmente, las conexiones de red dan error y el software del cliente ocasionalmente necesita actualizarse. El mantenimiento del nodo es inevitable y ocasionalmente requerirá su atención. Querrá asegurarse de estar al tanto de cualquier actualización anticipada de la red u otras actualizaciones críticas del cliente.
</ExpandableCard>

<ExpandableCard title="Tiempo de actividad confiable" eventCategory="SoloStaking" eventName="clicked reliable uptime">
Sus recompensas son proporcionales al tiempo que su validador está en línea y atestiguando correctamente. El tiempo de inactividad incurre en penalizaciones proporcionales a cuántos otros validadores están fuera de línea al mismo tiempo, pero <a href="#faq">no resulta en un recorte (slashing)</a>. El ancho de banda también importa, ya que las recompensas disminuyen para las atestaciones que no se reciben a tiempo. Los requisitos variarán, pero se recomienda un mínimo de 10 Mb/s de subida y bajada.
</ExpandableCard>

<ExpandableCard title="Riesgo de recorte" eventCategory="SoloStaking" eventName="clicked slashing risk">
A diferencia de las penalizaciones por inactividad por estar fuera de línea, el <em>recorte (slashing)</em> es una penalización mucho más grave reservada para ofensas maliciosas. Al ejecutar un cliente minoritario con sus claves cargadas en una sola máquina a la vez, se minimiza su riesgo de sufrir un recorte. Dicho esto, todos los que hacen staking deben ser conscientes de los riesgos del recorte.

<a href="https://medium.com/prysmatic-labs/eth2-slashing-prevention-tips-f6faa5025f50/"> Más sobre el recorte y el ciclo de vida del validador</a>
</ExpandableCard>

<StakingComparison page="solo" />

## Cómo funciona {#how-it-works}

<StakingHowSoloWorks />

Mientras esté activo, ganará recompensas en ETH, que se depositarán periódicamente en su dirección de retiro.

Si alguna vez lo desea, puede realizar la salida como validador, lo que elimina el requisito de estar en línea y detiene cualquier recompensa adicional. Su saldo restante se retirará a la dirección de retiro que designe durante la configuración.

[Más sobre los retiros de staking](/staking/withdrawals/)

## Empiece en el Staking Launchpad {#get-started-on-the-staking-launchpad}

El Staking Launchpad es una aplicación de código abierto que le ayudará a convertirse en un participante (staker). Le guiará en la elección de sus clientes, la generación de sus claves y el depósito de sus ETH en el contrato de depósito de staking. Se proporciona una lista de verificación para asegurarse de que ha cubierto todo para configurar su validador de forma segura.

<StakingLaunchpadWidget />

## Qué considerar con las herramientas de configuración de nodos y clientes {#node-tool-considerations}

Hay un número creciente de herramientas y servicios para ayudarle a hacer staking de sus ETH desde casa, pero cada uno conlleva diferentes riesgos y beneficios.

A continuación, se utilizan indicadores de atributos para señalar las fortalezas o debilidades notables que puede tener una herramienta de staking listada. Utilice esta sección como referencia de cómo definimos estos atributos mientras elige qué herramientas le ayudarán en su viaje de staking.

<StakingConsiderations page="solo" />

## Explore las herramientas de configuración de nodos y clientes {#node-and-client-tools}

Hay una variedad de opciones disponibles para ayudarle con su configuración. Utilice los indicadores anteriores para guiarse a través de las herramientas a continuación.

<ProductDisclaimer />

### Herramientas de nodo {#node-tools}

<StakingProductsCardGrid category="nodeTools" />

Tenga en cuenta la importancia de elegir un [cliente minoritario](/developers/docs/nodes-and-clients/client-diversity/) ya que mejora la seguridad de la red y limita su riesgo. Las herramientas que le permiten configurar un cliente minoritario se denotan como <em style={{ textTransform: "uppercase" }}>"multicliente".</em>

### Generadores de claves {#key-generators}

Estas herramientas se pueden utilizar como una alternativa a la [CLI de depósito de staking](https://github.com/ethereum/staking-deposit-cli/) para ayudar con la generación de claves.

<StakingProductsCardGrid category="keyGen" />

¿Tiene alguna sugerencia para una herramienta de staking que nos hayamos perdido? Consulte nuestra [política de listado de productos](/contributing/adding-staking-products/) para ver si encajaría bien y enviarla para su revisión.

## Explore las guías de staking desde casa {#staking-guides}

<StakingGuides />

## Preguntas frecuentes {#faq}

Estas son algunas de las preguntas más comunes sobre el staking que vale la pena conocer.

<ExpandableCard title="¿Qué es un validador?">

Un <em>validador</em> es una entidad virtual que vive en Ethereum y participa en el consenso del protocolo Ethereum. Los validadores están representados por un saldo, una clave pública y otras propiedades. Un <em>cliente de validador</em> es el software que actúa en nombre del validador al mantener y usar su clave privada. Un solo cliente de validador puede contener muchos pares de claves, controlando muchos validadores.

</ExpandableCard>

<ExpandableCard title="¿Puedo depositar más de 32 ETH?">
Sí, las cuentas de validador modernas son capaces de mantener hasta 2048 ETH. El ETH adicional por encima de 32 se capitalizará de manera escalonada, aumentando en incrementos de números enteros a medida que aumenta su saldo real. Esto se conoce como su <a href="https://www.attestant.io/posts/understanding-validator-effective-balance/">saldo efectivo</a>.

Para aumentar el saldo efectivo de una cuenta y, por lo tanto, aumentar las recompensas, se debe cruzar un margen de 0,25 ETH por encima de cualquier umbral de ETH completo. Por ejemplo, una cuenta con un saldo real de 32,9 y un saldo efectivo de 32 necesitaría ganar otros 0,35 ETH para llevar su saldo real por encima de 33,25 antes de desencadenar un aumento en el saldo efectivo.

Este margen también evita que un saldo efectivo disminuya hasta que haya bajado 0,25 ETH por debajo de su saldo efectivo actual.

Cada par de claves asociado con un validador requiere al menos 32 ETH para activarse. Cualquier saldo por encima de esto puede retirarse a la dirección de retiro asociada en cualquier momento a través de una transacción firmada por esta dirección. Cualquier fondo por encima del saldo efectivo máximo se retirará automáticamente de forma periódica.

Si el staking desde casa le parece demasiado exigente, considere usar un proveedor de [staking como servicio](/staking/saas/), o si está trabajando con menos de 32 ETH, consulte los [fondos de staking (staking pools)](/staking/pools/).
</ExpandableCard>

<ExpandableCard title="¿Sufriré un recorte si me desconecto? (tldr: No).">
Desconectarse cuando la red se está finalizando correctamente NO resultará en un recorte (slashing). Se incurre en pequeñas <em>penalizaciones por inactividad</em> si su validador no está disponible para atestiguar durante una época determinada (cada una de 6,4 minutos de duración), pero esto es muy diferente al <em>recorte</em>. Estas penalizaciones son ligeramente menores que la recompensa que habría ganado si el validador hubiera estado disponible para atestiguar, y las pérdidas se pueden recuperar con aproximadamente la misma cantidad de tiempo de vuelta en línea.

Tenga en cuenta que las penalizaciones por inactividad son proporcionales a cuántos validadores están fuera de línea al mismo tiempo. En los casos en que una gran parte de la red esté fuera de línea a la vez, las penalizaciones para cada uno de estos validadores serán mayores que cuando un solo validador no está disponible.

En casos extremos, si la red deja de finalizar como resultado de que más de un tercio de los validadores estén fuera de línea, estos usuarios sufrirán lo que se conoce como una <em>fuga por inactividad cuadrática</em>, que es una pérdida exponencial de ETH de las cuentas de validadores fuera de línea. Esto permite que la red eventualmente se recupere por sí misma al quemar los ETH de los validadores inactivos hasta que su saldo alcance los 16 ETH, momento en el que serán expulsados automáticamente del grupo de validadores. Los validadores en línea restantes eventualmente comprenderán más de 2/3 de la red nuevamente, satisfaciendo la supermayoría necesaria para finalizar la cadena una vez más.
</ExpandableCard>

<ExpandableCard title="¿Cómo me aseguro de no sufrir un recorte?">
En resumen, esto nunca se puede garantizar por completo, pero si actúa de buena fe, ejecuta un cliente minoritario y solo mantiene sus claves de firma en una máquina a la vez, el riesgo de sufrir un recorte es casi nulo.

Solo hay unas pocas formas específicas que pueden resultar en que un validador sufra un recorte y sea expulsado de la red. En el momento de escribir este artículo, los recortes que han ocurrido han sido exclusivamente producto de configuraciones de hardware redundantes donde las claves de firma se almacenan en dos máquinas separadas a la vez. Esto puede resultar inadvertidamente en un <em>doble voto</em> de sus claves, lo cual es una ofensa sancionable con recorte.

Ejecutar un cliente de supermayoría (cualquier cliente utilizado por más de 2/3 de la red) también conlleva el riesgo de un posible recorte en caso de que este cliente tenga un error que resulte en una bifurcación de la cadena. Esto puede resultar en una bifurcación defectuosa que se finaliza. Para corregir y volver a la cadena prevista, se requeriría enviar un <em>voto envolvente (surround vote)</em> al intentar deshacer un bloque finalizado. Esta también es una ofensa sancionable con recorte y se puede evitar simplemente ejecutando un cliente minoritario en su lugar.

Los errores equivalentes en un <em>cliente minoritario nunca se finalizarían</em> y, por lo tanto, nunca resultarían en un voto envolvente, y simplemente resultarían en penalizaciones por inactividad, <em>no en un recorte</em>.

<ul>
  <li><a href="https://hackernoon.com/ethereums-client-diversity-problem">Obtenga más información sobre la importancia de ejecutar un cliente minoritario.</a></li>
  <li><a href="https://medium.com/prysmatic-labs/eth2-slashing-prevention-tips-f6faa5025f50">Obtenga más información sobre la prevención de recortes</a></li>
</ul>
</ExpandableCard>

<ExpandableCard title="¿Cuál es el mejor cliente?">
Los clientes individuales pueden variar ligeramente en términos de rendimiento e interfaz de usuario, ya que cada uno es desarrollado por diferentes equipos utilizando una variedad de lenguajes de programación. Dicho esto, ninguno de ellos es "el mejor". Todos los clientes de producción son excelentes piezas de software, que realizan las mismas funciones principales para sincronizar e interactuar con la cadena de bloques.

Dado que todos los clientes de producción proporcionan la misma funcionalidad básica, en realidad es muy importante que elija un <strong>cliente minoritario</strong>, lo que significa cualquier cliente que NO esté siendo utilizado actualmente por la mayoría de los validadores en la red. Esto puede sonar contradictorio, pero ejecutar un cliente de mayoría o supermayoría lo pone en un mayor riesgo de recorte en caso de un error en ese cliente. Ejecutar un cliente minoritario limita drásticamente estos riesgos.

<a href="https://mirror.xyz/jmcook.eth/S7ONEka_0RgtKTZ3-dakPmAHQNPvuj15nh0YGKPFriA">Obtenga más información sobre por qué la diversidad de clientes es fundamental</a>
</ExpandableCard>

<ExpandableCard title="¿Puedo usar simplemente un VPS (servidor privado virtual)?">
Aunque se puede utilizar un servidor privado virtual (VPS) como reemplazo del hardware doméstico, el acceso físico y la ubicación de su cliente de validador <em>sí importan</em>. Las soluciones en la nube centralizadas como Amazon Web Services o Digital Ocean permiten la comodidad de no tener que obtener y operar hardware, a expensas de centralizar la red.

Cuantos más clientes de validador se ejecuten en una sola solución de almacenamiento en la nube centralizada, más peligroso se vuelve para estos usuarios. Cualquier evento que desconecte a estos proveedores, ya sea por un ataque, demandas regulatorias o simplemente cortes de energía/internet, resultará en que cada cliente de validador que dependa de este servidor se desconecte al mismo tiempo.

Las penalizaciones por estar fuera de línea son proporcionales a cuántos otros están fuera de línea al mismo tiempo. El uso de un VPS aumenta en gran medida el riesgo de que las penalizaciones por estar fuera de línea sean más severas, y aumenta su riesgo de fuga cuadrática o recorte en caso de que la interrupción sea lo suficientemente grande. Para minimizar su propio riesgo y el riesgo para la red, se recomienda encarecidamente a los usuarios que obtengan y operen su propio hardware.
</ExpandableCard>

<ExpandableCard title="¿Cómo desbloqueo mis recompensas o recupero mi ETH?">

Los retiros de cualquier tipo de la cadena de balizas requieren que se establezcan credenciales de retiro.

Los nuevos participantes (stakers) establecen esto en el momento de la generación de claves y el depósito. Los participantes existentes que aún no lo hayan establecido pueden actualizar sus claves para admitir esta funcionalidad.

Una vez que se establecen las credenciales de retiro, los pagos de recompensas (ETH acumulado sobre los 32 iniciales) se distribuirán periódicamente a la dirección de retiro de forma automática.

Para desbloquear y recibir todo su saldo de vuelta, también debe completar el proceso de salida de su validador.

<ButtonLink href="/staking/withdrawals/">Más sobre los retiros de staking</ButtonLink>
</ButtonLink>

## Lecturas adicionales {#further-reading}

- [El directorio de staking de Ethereum](https://www.staking.directory/) - _Eridian y Spacesider_
- [El problema de la diversidad de clientes de Ethereum](https://hackernoon.com/ethereums-client-diversity-problem) - _@emmanuelawosika 2022_
- [Ayudando a la diversidad de clientes](https://www.attestant.io/posts/helping-client-diversity/) - _Jim McDonald 2022_
- [Diversidad de clientes en la capa de consenso de Ethereum](https://mirror.xyz/jmcook.eth/S7ONEka_0RgtKTZ3-dakPmAHQNPvuj15nh0YGKPFriA) - _jmcook.eth 2022_
- [Cómo: Comprar hardware para validadores de Ethereum](https://www.youtube.com/watch?v=C2wwu1IlhDc) - _EthStaker 2022_
- [Consejos para la prevención de recortes en Eth2](https://medium.com/prysmatic-labs/eth2-slashing-prevention-tips-f6faa5025f50) - _Raul Jordan 2020_

<QuizWidget quizKey="staking-solo" />