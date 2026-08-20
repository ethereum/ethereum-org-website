---
title: Hacer staking de ETH desde casa
description: Una descripción general de cómo empezar a hacer staking de ETH desde casa
lang: es
template: staking
image: /images/staking/leslie-solo.png
sidebarDepth: 2
summaryPoints:
  - Recibe las máximas recompensas directamente del protocolo por mantener tu validador funcionando correctamente y en línea
  - Ejecuta hardware doméstico y contribuye personalmente a la seguridad y descentralización de la red Ethereum
  - Elimina la necesidad de confianza y nunca cedas el control de las claves de tus fondos
---

## ¿Qué es el staking desde casa? {#what-is-solo-staking}

El staking desde casa es el acto de [ejecutar un nodo de Ethereum](/run-a-node/) conectado a internet y depositar al menos 32 ETH para activar un [validador](#faq), lo que te da la capacidad de participar directamente en el consenso de la red.

El staking desde casa es la forma más directa de hacer staking. No hay contratos inteligentes, operadores ni custodios entre tú y el protocolo. Tú posees tus propias claves, participas activamente en la validación de la red [Ethereum](/) y recibes las recompensas de la red directamente. Cualquier otro método de staking añade capas de tecnología, middleware o servicios por encima de esta actividad principal de la red.

**El staking desde casa aumenta la descentralización de la red Ethereum**, haciendo que Ethereum sea más resistente a la censura y robusto frente a ataques. Otros métodos de staking pueden no ayudar a la red de la misma manera. El staking desde casa es la mejor opción de staking para asegurar Ethereum.

Un nodo de Ethereum consta tanto de un cliente de la capa de ejecución (EL) como de un cliente de la capa de consenso (CL). Estos clientes son software que trabajan juntos, junto con un conjunto válido de claves de firma, para verificar transacciones y bloques, dar fe de la cabeza correcta de la cadena, agregar atestaciones y proponer bloques.

Los que hacen staking desde casa son responsables de operar el hardware necesario para ejecutar estos clientes. Se recomienda encarecidamente utilizar una máquina dedicada para esto que operes desde casa; esto es extremadamente beneficioso para la salud de la red.

Quien hace staking desde casa recibe recompensas directamente del protocolo por mantener su validador funcionando correctamente y en línea.

## ¿Por qué hacer staking desde casa? {#why-stake-solo}

El staking desde casa conlleva más responsabilidad, pero te proporciona el máximo control sobre tus fondos y tu configuración de staking.

<Grid>
  <Card title="Keep all rewards" icon={<HandCoins />} description="Quienes hacen staking desde casa reciben el 100 % de las recompensas del protocolo, pagadas directamente por el protocolo mientras su validador está en línea." />
  <Card title="Autosoberanía" icon={<KeyRound />} description="Mantén tus propias claves y la custodia total de tus fondos en todo momento. Elige la combinación de clientes y hardware que te permita minimizar tu riesgo. Ningún tercero puede tomar estas decisiones por ti ni restringir tus retiros." />
  <Card title="Client and geographic diversity" icon={<GlobeLock />} description="Quienes hacen staking desde casa ejecutando clientes minoritarios en hardware distribuido en muchas ubicaciones fortalecen la descentralización y la seguridad de la red." />
</Grid>

## Consideraciones antes de hacer staking desde casa {#considerations-before-staking-solo}

Por mucho que deseemos que el staking desde casa sea accesible y libre de riesgos para todos, esta no es la realidad. Hay algunas consideraciones prácticas y serias a tener en cuenta antes de elegir hacer staking de tu ETH desde casa.

<ExpandableCard title="Lectura obligatoria" eventCategory="SoloStaking" eventName="clicked required reading">
Al operar tu propio nodo, debes dedicar algo de tiempo a aprender a usar el software que has elegido. Esto implica leer la documentación relevante y estar atento a los canales de comunicación de esos equipos de desarrollo.

Cuanto más entiendas sobre el software que estás ejecutando y cómo funciona la prueba de participación (PoS), menos arriesgado será como staker, y más fácil será solucionar cualquier problema que pueda surgir en el camino como operador de nodo.
</ExpandableCard>

<ExpandableCard title="Familiaridad con las computadoras" eventCategory="SoloStaking" eventName="clicked comfortable with computers">
La configuración del nodo requiere un nivel razonable de comodidad al trabajar con computadoras, aunque las nuevas herramientas están facilitando esto con el tiempo. Comprender la interfaz de línea de comandos es útil, pero ya no es estrictamente necesario.

También requiere una configuración de hardware muy básica y cierta comprensión de las especificaciones mínimas recomendadas.
</ExpandableCard>

<ExpandableCard title="Requisitos de hardware" eventCategory="SoloStaking" eventName="clicked hardware requirements">
La orientación actual de la comunidad para el hardware y el ancho de banda del validador se mantiene en las [recomendaciones de hardware y ancho de banda (EIP-7870)](https://eips.ethereum.org/EIPS/eip-7870). Como guía aproximada, planifica un SSD NVMe de 4 TB, 64 GB de RAM (menos puede funcionar, pero este es el margen recomendado), una CPU multinúcleo moderna y sólida, y una conexión a internet de alrededor de 50 Mbps de descarga / 25 Mbps de carga.

Dado que la actualización Fusaka introdujo PeerDAS, un nodo de staking solo necesita almacenar y descargar una fracción de los datos blob de la red, lo que reduce significativamente los requisitos de disco y ancho de banda para quienes hacen staking desde casa.
</ExpandableCard>

<ExpandableCard title="Gestión segura de claves" eventCategory="SoloStaking" eventName="clicked secure key management">
Al igual que las claves privadas aseguran tu dirección de Ethereum, necesitarás generar claves específicamente para tu validador. Debes entender cómo mantener seguras y protegidas las frases semilla o las claves privadas.{' '}

[Seguridad de Ethereum y prevención de estafas](/security/)
</ExpandableCard>

<ExpandableCard title="Mantenimiento" eventCategory="SoloStaking" eventName="clicked maintenance">
El hardware falla ocasionalmente, las conexiones de red dan error y el software del cliente necesita actualizarse de vez en cuando. El mantenimiento del nodo es inevitable y ocasionalmente requerirá tu atención. Querrás asegurarte de estar al tanto de cualquier actualización anticipada de la red u otras actualizaciones críticas del cliente.
</ExpandableCard>

<ExpandableCard title="Tiempo de actividad confiable" eventCategory="SoloStaking" eventName="clicked reliable uptime">
Tus recompensas son proporcionales al tiempo que tu validador está en línea y atestiguando correctamente. El tiempo de inactividad incurre en penalizaciones proporcionales a cuántos otros validadores están fuera de línea al mismo tiempo, pero [no resulta en un recorte](#faq). El ancho de banda también importa, ya que las recompensas disminuyen para las atestaciones que no se reciben a tiempo. Los requisitos variarán, pero las [recomendaciones actuales de hardware y ancho de banda (EIP-7870)](https://eips.ethereum.org/EIPS/eip-7870) sugieren alrededor de 50 Mbps de descarga y 25 Mbps de carga.
</ExpandableCard>

<ExpandableCard title="Riesgo de recorte" eventCategory="SoloStaking" eventName="clicked slashing risk">
A diferencia de las penalizaciones por inactividad por estar fuera de línea, el <em>recorte</em> es una penalización mucho más grave reservada para ofensas maliciosas. Al ejecutar un cliente minoritario con tus claves cargadas en una sola máquina a la vez, se minimiza tu riesgo de sufrir un recorte. Dicho esto, todos los stakers deben ser conscientes de los riesgos del recorte.

<a href="https://medium.com/prysmatic-labs/eth2-slashing-prevention-tips-f6faa5025f50/"> Más sobre el recorte y el ciclo de vida del validador</a>
</ExpandableCard>

## Comparación de opciones de staking {#comparison-of-staking-options}

<StakingComparison page="solo" />

## Cómo funciona {#how-it-works}

<StakingHowSoloWorks />

Una vez que tu nodo está sincronizado y tus claves están generadas, depositas tu participación para activar tu validador. Un solo validador requiere un mínimo de 32 ETH y puede contener hasta 2048 ETH. La red reconoce los depósitos en unos 13 minutos, pero los nuevos validadores pasan por una cola de activación antes de empezar a atestiguar; su longitud varía según la demanda.

Mientras esté activo, ganarás recompensas en ETH. Con las credenciales de retiro compuestas (0x02), las recompensas se añaden a tu participación automáticamente; con las credenciales de retiros regulares (0x01), las recompensas por encima de los 32 ETH iniciales se transfieren periódicamente a tu dirección de retiro.

Si alguna vez lo deseas, puedes salir como validador, lo que elimina el requisito de estar en línea y detiene cualquier recompensa adicional. Tu saldo restante se retirará entonces a la dirección de retiro que designes durante la configuración. Las salidas pueden iniciarse con las claves de firma de tu validador, o activarse directamente desde tu dirección de retiro con una transacción de la capa de ejecución, por lo que el control final de tus fondos siempre recae en tu dirección de retiro.

### Interés compuesto y el máximo de 2048 ETH {#compounding}

Los validadores tienen uno de dos tipos de credenciales de retiro:

- **Retiros regulares (0x01)**: el saldo efectivo del validador tiene un límite de 32 ETH, y cualquier saldo por encima de eso se transfiere automáticamente a tu dirección de retiro cada pocos días.
- **Compuesto (0x02)**: el saldo efectivo del validador puede crecer hasta 2048 ETH. Las recompensas se componen automáticamente, y ganas recompensas por cada ETH entero por encima del mínimo de 32 ETH, por lo que puedes hacer staking de cantidades flexibles como 40 ETH, no solo múltiplos de 32. Solo el saldo por encima de 2048 ETH se transfiere automáticamente; retirar cualquier otra cosa significa activar manualmente un retiro parcial desde tu dirección de retiro, lo que cuesta gas.

Si ejecutas múltiples validadores, puedes consolidarlos en un solo validador compuesto sin salir y volver a entrar en la red, reduciendo tus gastos generales de mantenimiento. La consolidación se solicita desde tu dirección de retiro y está sujeta a colas de procesamiento. Cambiar un validador de credenciales 0x01 a 0x02 utiliza este mismo mecanismo, y **no se puede revertir** sin salir completamente y depositar de nuevo.

[Más sobre los retiros de staking](/staking/withdrawals/)

## Empieza en el Staking Launchpad {#get-started-on-the-staking-launchpad}

El Staking Launchpad es una aplicación de código abierto que te ayudará a convertirte en staker. Te guiará en la elección de tus clientes, generará tus claves y depositará tu ETH en el contrato de depósito de staking. Se proporciona una lista de verificación para asegurarse de que has cubierto todo para configurar tu validador de forma segura.

<StakingLaunchpadWidget />

## Qué considerar con las herramientas de configuración de nodos y clientes {#node-tool-considerations}

Hay un número creciente de herramientas y servicios para ayudarte a hacer staking de tu ETH desde casa, pero cada uno conlleva diferentes riesgos y beneficios.

A continuación, se utilizan indicadores de atributos para señalar las fortalezas o debilidades notables que puede tener una herramienta de staking listada. Utiliza esta sección como referencia de cómo definimos estos atributos mientras eliges qué herramientas te ayudarán en tu viaje de staking.

<StakingConsiderations page="solo" />

## Explora las herramientas de configuración de nodos y clientes {#node-and-client-tools}

Hay una variedad de opciones disponibles para ayudarte con tu configuración. Utiliza los indicadores anteriores para guiarte a través de las herramientas a continuación.

<ProductDisclaimer />

### Herramientas de nodo {#node-tools}

<StakingProductsCardGrid category="nodeTools" />

Ten en cuenta la importancia de elegir un [cliente minoritario](/developers/docs/nodes-and-clients/client-diversity/) ya que mejora la seguridad de la red y limita tu riesgo. Las herramientas que te permiten configurar un cliente minoritario se indican como <em style={{ textTransform: "uppercase" }}>"multicliente".</em>

### Generadores de claves {#key-generators}

Estas herramientas se pueden utilizar como alternativa a la [CLI de depósito de staking](https://github.com/ethereum/staking-deposit-cli/) para ayudar con la generación de claves.

<StakingProductsCardGrid category="keyGen" />

¿Tienes alguna sugerencia para una herramienta de staking que nos hayamos perdido? Consulta nuestra [política de listado de productos](/contributing/adding-staking-products/) para ver si encajaría bien y enviarla para su revisión.

## Explora las guías de staking desde casa {#staking-guides}

<StakingGuides />

## Staking en escuadrón: staking desde casa con tolerancia a fallos {#squad-staking}

La **tecnología de validador distribuido (DVT)** permite que un solo validador se ejecute en un clúster de máquinas en lugar de solo una. La clave del validador se divide en partes utilizando la generación de claves distribuidas, y un umbral del clúster (por ejemplo, 3 de 4 nodos) debe firmar en conjunto; la clave completa nunca existe en una sola máquina. Si una máquina falla, se desconecta o está mal configurada, el resto del clúster mantiene al validador atestiguando.

Para quienes hacen staking desde casa, esto permite el "staking en escuadrón": formar equipo con amigos u otros miembros de la comunidad para ejecutar validadores juntos, eliminando los puntos únicos de fallo de una configuración en solitario y reduciendo el riesgo de recorte de una sola máquina que se comporte mal. Tanto Obol como SSV Network proporcionan implementaciones de DVT en producción, utilizadas hoy en día en el staking desde casa, el staking como servicio y los pools de staking.

[Más sobre la tecnología de validador distribuido](/staking/dvt/)

## Ejecutar validadores para un protocolo de staking {#run-validators-for-a-staking-protocol}

Si tienes el hardware y las habilidades para ejecutar un nodo pero menos de 32 ETH, algunos protocolos de staking emparejarán tu validador con ETH de sus stakers conjuntos. Tú depositas una fianza menor como colateral y ejecutas el validador en tu propia máquina; el protocolo suministra el resto de la participación y tú ganas una parte de las recompensas.

Este es un enfoque híbrido: mantienes las responsabilidades (y la satisfacción) de operar tu propio hardware, pero tu validador opera bajo los contratos inteligentes, la gobernanza y las reglas de rendimiento del protocolo, lo cual es un perfil de confianza diferente al de hacer staking de tu propio ETH directamente.

Obtén más información sobre cómo funcionan estos protocolos, incluidos sus supuestos de confianza y la mecánica de los tokens, en la [página de staking conjunto](/staking/pools/).

## Más formas de usar tu nodo {#more-ways-to-use-your-node}

No necesitas hacer staking en absoluto para poner a trabajar tus habilidades de operación de nodos. Cualquiera puede [ejecutar un nodo de Ethereum](/run-a-node/) sin depositar ningún ETH. Obtienes una vista autoverificada de la cadena, tu propio punto de conexión privado para enviar transacciones e interactuar con aplicaciones, y contribuyes a la salud y resiliencia de la red. Ejecutar un nodo también es una buena manera de adquirir experiencia antes de activar un validador, sin poner en riesgo ningún ETH.

<StakingCommunityCallout className="my-16" />

## Preguntas frecuentes {#faq}

Estas son algunas de las preguntas más comunes sobre el staking que vale la pena conocer.

<ExpandableCard title="¿Qué es un validador?">

Un <em>validador</em> es una entidad virtual que vive en Ethereum y participa en el consenso del protocolo Ethereum. Los validadores están representados por un saldo, una clave pública y otras propiedades. Un <em>cliente validador</em> es el software que actúa en nombre del validador al mantener y usar su clave privada. Un solo cliente validador puede contener muchos pares de claves, controlando muchos validadores.

</ExpandableCard>

<ExpandableCard title="¿Puedo depositar más de 32 ETH?">
Sí. Un validador con credenciales de retiro _compuestas_ (0x02) puede mantener un saldo efectivo de hasta 2048 ETH, mientras que el mínimo para activarse sigue siendo de 32 ETH. Las recompensas en un validador compuesto se añaden a su participación automáticamente, y gana recompensas por cada ETH entero por encima del mínimo de 32 ETH, por lo que puedes hacer staking de cantidades que no sean múltiplos de 32. Consulta [Interés compuesto y el máximo de 2048 ETH](#compounding).

Los validadores con credenciales de _retiros regulares_ (0x01) siguen teniendo un límite de saldo efectivo de 32 ETH, y cualquier saldo por encima de eso se transfiere automáticamente a la dirección de retiro cada pocos días.

Para un validador compuesto, solo el saldo por encima del máximo de 2048 ETH se transfiere automáticamente. Para retirar cualquier cantidad por debajo de eso, activas un retiro parcial desde tu dirección de retiro (una transacción que cuesta gas), lo que puede reducir cualquier saldo por encima del mínimo de 32 ETH. Si ejecutas múltiples validadores, también puedes consolidarlos en un solo validador compuesto sin salir de la red.

[Más sobre los retiros de staking](/staking/withdrawals/)
</ExpandableCard>

<ExpandableCard title="¿Sufriré un recorte si me desconecto? (TL;DR: No.)">
Desconectarse cuando la red está finalizando correctamente NO resultará en un recorte. Se incurre en pequeñas <em>penalizaciones por inactividad</em> si tu validador no está disponible para atestiguar durante una época determinada (cada una de 6,4 minutos de duración), pero esto es muy diferente al <em>recorte</em>. Estas penalizaciones son ligeramente inferiores a la recompensa que habrías ganado si el validador hubiera estado disponible para atestiguar, y las pérdidas se pueden recuperar con aproximadamente la misma cantidad de tiempo de vuelta en línea.

Ten en cuenta que las penalizaciones por inactividad son proporcionales a cuántos validadores están fuera de línea al mismo tiempo. En los casos en que una gran parte de la red esté fuera de línea a la vez, las penalizaciones para cada uno de estos validadores serán mayores que cuando un solo validador no está disponible.

En casos extremos, si la red deja de finalizar como resultado de que más de un tercio de los validadores estén fuera de línea, estos usuarios sufrirán lo que se conoce como una <em>fuga por inactividad cuadrática</em>, que es un drenaje exponencial de ETH de las cuentas de validadores fuera de línea. Esto permite que la red se cure a sí misma eventualmente al quemar el ETH de los validadores inactivos hasta que su saldo alcance los 16 ETH, momento en el que serán expulsados automáticamente del grupo de validadores. Los validadores en línea restantes eventualmente comprenderán más de 2/3 de la red nuevamente, satisfaciendo la supermayoría necesaria para finalizar la cadena una vez más.
</ExpandableCard>

<ExpandableCard title="¿Cómo me aseguro de no sufrir un recorte?">
En resumen, esto nunca se puede garantizar por completo, pero si actúas de buena fe, ejecutas un cliente minoritario y solo mantienes tus claves de firma en una máquina a la vez, el riesgo de sufrir un recorte es casi nulo.

Solo hay unas pocas formas específicas que pueden resultar en que un validador sufra un recorte y sea expulsado de la red. En el momento de escribir este artículo, los recortes que han ocurrido han sido exclusivamente producto de configuraciones de hardware redundantes donde las claves de firma se almacenan en dos máquinas separadas a la vez. Esto puede resultar inadvertidamente en un <em>doble voto</em> de tus claves, lo cual es una ofensa sujeta a recorte.

Ejecutar un cliente de supermayoría (cualquier cliente utilizado por más de 2/3 de la red) también conlleva el riesgo de un posible recorte en caso de que este cliente tenga un error que resulte en una bifurcación de la cadena. Esto puede resultar en una bifurcación defectuosa que se finaliza. Para corregir y volver a la cadena prevista, se requeriría enviar un <em>voto envolvente</em> al intentar deshacer un bloque finalizado. Esta también es una ofensa sujeta a recorte y se puede evitar simplemente ejecutando un cliente minoritario en su lugar.

Los errores equivalentes en un <em>cliente minoritario nunca se finalizarían</em> y, por lo tanto, nunca resultarían en un voto envolvente, y simplemente resultarían en penalizaciones por inactividad, <em>no en un recorte</em>.

<ul>
  <li><a href="https://clientdiversity.org/">Obtén más información sobre la importancia de ejecutar un cliente minoritario.</a></li>
  <li><a href="/developers/docs/consensus-mechanisms/pos/rewards-and-penalties/">Obtén más información sobre recompensas, penalizaciones y recortes</a></li>
</ul>
</ExpandableCard>

<ExpandableCard title="¿Qué cliente es el mejor?">
Los clientes individuales pueden variar ligeramente en términos de rendimiento e interfaz de usuario, ya que cada uno es desarrollado por diferentes equipos utilizando una variedad de lenguajes de programación. Dicho esto, ninguno de ellos es el "mejor". Todos los clientes de producción son excelentes piezas de software, que realizan las mismas funciones principales para sincronizar e interactuar con la cadena de bloques.

Dado que todos los clientes de producción proporcionan la misma funcionalidad básica, en realidad es muy importante que elijas un <strong>cliente minoritario</strong>, es decir, cualquier cliente que NO esté siendo utilizado actualmente por la mayoría de los validadores en la red. Esto puede sonar contradictorio, pero ejecutar un cliente de mayoría o supermayoría te pone en un mayor riesgo de recorte en caso de un error en ese cliente. Ejecutar un cliente minoritario limita drásticamente estos riesgos.

<a href="https://mirror.xyz/jmcook.eth/S7ONEka_0RgtKTZ3-dakPmAHQNPvuj15nh0YGKPFriA">Obtén más información sobre por qué la diversidad de clientes es fundamental</a>
</ExpandableCard>

<ExpandableCard title="¿Puedo usar simplemente un VPS (servidor privado virtual)?">
Aunque se puede utilizar un servidor privado virtual (VPS) como reemplazo del hardware doméstico, el acceso físico y la ubicación de tu cliente validador <em>sí importan</em>. Las soluciones en la nube centralizadas como Amazon Web Services o Digital Ocean permiten la comodidad de no tener que obtener y operar hardware, a expensas de centralizar la red.

Cuantos más clientes validadores se ejecuten en una sola solución de almacenamiento en la nube centralizada, más peligroso se vuelve para estos usuarios. Cualquier evento que desconecte a estos proveedores, ya sea por un ataque, demandas regulatorias o simplemente cortes de energía/internet, resultará en que todos los clientes validadores que dependen de este servidor se desconecten al mismo tiempo.

Las penalizaciones por estar fuera de línea son proporcionales a cuántos otros están fuera de línea al mismo tiempo. El uso de un VPS aumenta en gran medida el riesgo de que las penalizaciones por estar fuera de línea sean más severas, y aumenta tu riesgo de fuga cuadrática o recorte en caso de que la interrupción sea lo suficientemente grande. Para minimizar tu propio riesgo y el riesgo para la red, se recomienda encarecidamente a los usuarios que obtengan y operen su propio hardware.
</ExpandableCard>

<ExpandableCard title="¿Cómo desbloqueo mis recompensas o recupero mi ETH?">

Cada retiro requiere que tu validador tenga configurada una dirección de retiro. Los nuevos stakers configuran esto en el momento de la generación de claves y el depósito. Los stakers de los primeros días de la red que aún no han configurado una dirección de retiro deberán actualizar sus credenciales de retiro antes de retirar.

Para los validadores con credenciales de retiros regulares (0x01), los pagos de recompensas (ETH acumulado sobre los 32 iniciales) se distribuyen periódicamente a la dirección de retiro de forma automática. Para los validadores compuestos (0x02), las recompensas permanecen en staking y se componen automáticamente. Puedes retirar cualquier saldo por encima de 32 ETH activando un retiro parcial desde tu dirección de retiro.

Para desbloquear y recibir todo tu saldo de vuelta, debes salir de tu validador. Puedes hacer esto usando las claves de firma de tu validador, o activarlo directamente desde tu dirección de retiro con una transacción de la capa de ejecución, lo que significa que tus fondos siguen siendo recuperables incluso si pierdes tus claves de firma.

<ButtonLink href="/staking/withdrawals/">Más sobre los retiros de staking</ButtonLink>
</ExpandableCard>

## Lecturas adicionales {#further-reading}

- [Estadísticas de diversidad de clientes y guías de migración](https://clientdiversity.org/)
- [Ayudando a la diversidad de clientes](https://www.attestant.io/posts/helping-client-diversity/) - _Jim McDonald 2022_
- [Diversidad de clientes en la capa de consenso de Ethereum](https://mirror.xyz/jmcook.eth/S7ONEka_0RgtKTZ3-dakPmAHQNPvuj15nh0YGKPFriA) - _jmcook.eth 2022_
- [Cómo: Comprar hardware para validadores de Ethereum](https://www.youtube.com/watch?v=C2wwu1IlhDc) - _EthStaker 2022_
- [EIP-7870: Recomendaciones de hardware y ancho de banda](https://eips.ethereum.org/EIPS/eip-7870)
- [La actualización Pectra: saldo efectivo máximo y más](/roadmap/pectra/maxeb/)

<QuizWidget quizKey="staking-solo" />