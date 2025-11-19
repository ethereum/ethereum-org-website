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

## ¿Qué es la participación desde casa? {#what-is-solo-staking}

El staking en casa consiste en [ejecutar un nodo de Ethereum](/run-a-node/) conectado a Internet y depositar 32 ETH para activar un [validador](#faq), lo que le otorga la capacidad de participar directamente en el consenso de la red.

**El staking en casa incrementa la descentralización de la red de Ethereum**, haciendo que Ethereum sea más resistente a la censura y más robusto frente a ataques. Puede que otros métodos de participación no ayuden a la red de la misma manera. La participación desde casa es la mejor forma de participación para asegurar Ethereum.

Un nodo Ethereum consiste tanto en un cliente de capa de ejecución (EL), como en un cliente de capa de consenso (CL). Estos clientes son programas que funcionan estrechamente entre sí, en conjunto con un par de claves de validación, para verificar transacciones y bloques, certificar el encabezado corecto de la cadena, resumir verificaciones, y proponer bloques.

Los participantes desde casa son responsables de operar el hardware necesario para ejecutar estos clientes. Es muy recomendable utilizar una máquina específicamente dedicada a esto, que usted opere desde su hogar, algo que es extremadamente beneficioso para la salud de la red.

Un participante desde casa recibe las recompensas directamente desde el protocolo por mantener su validador funcionando correctamente y en línea.

## ¿Por qué participar desde casa? {#why-stake-solo}

Participar desde casa conlleva más responsabilidad, pero proporciona el máximo control posible sobre los fondos y la configuración de los validadores.

<CardGrid>
  <Card title="Earn fresh ETH" emoji="💸" description="Earn ETH-denominated rewards directly from the protocol when your validator is online, without any middlemen taking a cut." />
  <Card title="Full control" emoji="🎛️" description="Keep your own keys. Choose the combination of clients and hardware that allows you to minimize your risk and best contribute to the health and security of the network. Third-party staking services make these decisions for you, and they don't always make the safest choices." />
  <Card title="Network security" emoji="🔐" description="Home staking is the most impactful way to stake. By running a validator on your own hardware at home, you strengthen the robustness, decentralization, and security of the Ethereum protocol." />
</CardGrid>

## Consideraciones antes de hacer staking en casa {#considerations-before-staking-solo}

Por mucho que busquemos que participar desde casa sea accesible y libre de riesgos para todos, esta no es la realidad. Hay algunas consideraciones prácticas y serias que debemos tener en cuenta antes de elegir participar desde casa con sus ETH.

<InfoGrid>
<ExpandableCard title="Required reading" eventCategory="SoloStaking" eventName="clicked required reading">

Al operar su propio nodo debería invertir tiempo en aprender cómo utilizar el software que ha elegido. Esto implica leer la documentación pertinente y estar en sintonía con los canales de comunicación de los equipos de desarrollo relacionados.

Cuanto más entienda sobre el software que está ejecutando y cómo funciona la prueba de participación, menos riesgo tendrá como participante, y le será más fácil solucionar cualquier incidente que pueda surgir en su función como operador de nodos.

</ExpandableCard>

<ExpandableCard title="Comfortable with computers" eventCategory="SoloStaking" eventName="clicked comfortable with computers">
La configuración del nodo requiere un nivel de comodidad razonable al trabajar con ordenadores, aunque las nuevas herramientas lo facilitan con el tiempo. Entender la interfaz de la línea de comandos es útil, pero no estrictamente necesario.

También requiere una configuración de hardware muy básica, y cierta comprensión de las especificaciones mínimas recomendadas.

</ExpandableCard>

<ExpandableCard title="Secure key management" eventCategory="SoloStaking" eventName="clicked secure key management">
De la misma manera que las claves privadas protegen su dirección de Ethereum, necesitará generar claves específicamente para su validador. Debe comprender cómo mantener seguras y protegidas todas las frases semilla o claves privadas.{' '}

[Seguridad en Ethereum y prevención de estafas](/security/)

</ExpandableCard>

<ExpandableCard title="Maintenance" eventCategory="SoloStaking" eventName="clicked maintenance">
El hardware ocasionalmente falla, en las conexiones de red suceden desconexiones, y el software cliente ocasionalmente necesita actualizarse. El mantenimiento de nodos es inevitable y de vez en cuando requerirá tu atención. Conviene que esté al tanto de cualquier actualización de red prevista, o de otras actualizaciones críticas del software cliente.
</ExpandableCard>

<ExpandableCard title="Reliable uptime" eventCategory="SoloStaking" eventName="clicked reliable uptime">
Sus recompensas son proporcionales al tiempo que su validador esté en línea y certifique correctamente. El tiempo de inactividad incurre en penalizaciones proporcionales a los validadores que estén desconectados al mismo tiempo, pero <a href="#faq"> no ocasiona recortes</a>. El ancho de banda también importa, ya que las recompensas disminuyen por las certificaciones que no se reciben a tiempo. Los requisitos variarán, pero se recomienda un mínimo de 10 Mb/s de descarga y carga.
</ExpandableCard>

<ExpandableCard title="Slashing risk" eventCategory="SoloStaking" eventName="clicked slashing risk">
Distinta a las penalizaciones por inactividad por estar fuera de línea, <em>el recorte</em> es una penalización mucho más grave reservada para infracciones maliciosas. Al ejecutar un cliente minoritario con sus claves cargadas en una sola máquina cada vez, se reduce el riesgo de ser penalizado por recortes. Dicho esto, todos los participantes deben ser conscientes de los riesgos de los recortes.

<a href="https://medium.com/prysmatic-labs/eth2-slashing-prevention-tips-f6faa5025f50/"> Más información sobre penalizaciones (slashing) y el ciclo de vida de los validadores</a>

</ExpandableCard>
</InfoGrid>

<StakingComparison page="solo" />

## Cómo funciona {#how-it-works}

<StakingHowSoloWorks />

Mientras esté activo, obtendrá recompensas ETH que se depositarán periódicamente en su dirección de retirada.

Si lo desea, puede salir como validador, lo que elimina el requisito de estar en línea y detiene cualquier recompensa adicional. Su saldo restante se retirará entonces a la dirección de retirada que usted designe durante la configuración.

[Más sobre retiradas de participaciones](/staking/withdrawals/)

## Comenzar en Staking Launchpad {#get-started-on-the-staking-launchpad}

El Lanzador de participaciones es una aplicación de código abierto que le ayudará a convertirse en un participante. Le guiará a través de la elección de sus clientes de software, a generar sus llaves y depositar su ETH en el contrato de depósito de participación. Se proporciona una lista de verificación para asegurarse de que ha cubierto todo para configurar su validador de forma segura.

<StakingLaunchpadWidget />

## Qué considerar sobre las herramientas para configurar nodos y clientes {#node-tool-considerations}

Existe un número cada vez mayor de herramientas y servicios para ayudarle a participar desde casa con sus ETH, pero cada una comporta diferentes riesgos y beneficios.

Los indicadores de atributos a continuación indican las fortalezas o debilidades que puede tener cada herramienta de participación. Utilice esta sección como referencia sobre cómo definimos estos atributos, mientras está eligiendo las herramientas que le ayudarán con su experiencia de participación.

<StakingConsiderations page="solo" />

## Explorar herramientas para la configuración de nodos y clientes {#node-and-client-tools}

Existe una gran variedad de opciones disponibles para ayudarle con su configuración. Utilice los indicadores anteriores para guiarse a través de las herramientas siguientes.

<ProductDisclaimer />

### Herramientas de nodo

<StakingProductsCardGrid category="nodeTools" />

Tenga en cuenta la importancia de elegir un [cliente minoritario](/developers/docs/nodes-and-clients/client-diversity/), ya que mejora la seguridad de la red y limita su riesgo. Las herramientas que le permiten configurar un cliente minoritario se expresan como <em style={{ textTransform: "uppercase" }}>«multi-cliente».</em>

### Generadores de claves

Estas herramientas pueden utilizarse como alternativa al [Staking Deposit CLI](https://github.com/ethereum/staking-deposit-cli/) para ayudar con la generación de claves.

<StakingProductsCardGrid category="keyGen" />

¿Tiene alguna sugerencia para una herramienta de participación no cubierta? Consulte nuestra [política de listado de productos](/contributing/adding-staking-products/) para ver si sería adecuado, y para enviarlo para su revisión.

## Explorar guías de staking en casa {#staking-guides}

<StakingGuides />

## Preguntas frecuentes {#faq}

Estas son algunas de las preguntas más comunes sobre la participación que vale la pena conocer.

<ExpandableCard title="What is a validator?">

Un <em>validador</em> es una entidad virtual que vive en Ethereum y participa en el consenso del protocolo Ethereum. Los validadores están representados por un saldo, una clave pública y otras propiedades. Un <em>cliente validador</em> es el software que actúa en nombre del validador al mantener y utilizar su clave privada. Un solo cliente validador puede mantener muchos pares de claves y controlar muchos validadores.

</ExpandableCard>

<ExpandableCard title="Can I deposit more than 32 ETH?">
Sí, los validadores modernos son capaces de mantener hasta 2048 ETH. El ETH adicional por encima de 32 va a compuestar de manera escalonada, aumentando en incrementos de números enteros a medida que aumente su saldo real. Esto se conoce como tu <a href="https://www.attestant.io/posts/understanding-validator-effective-balance/">balance efectivo</a>.

Para incrementar el balance efectivo de una cuenta y así aumentar las recompensas, se debe cruzar un buffer de 0,25 ETH por encima de cualquier umbral de ETH completo. Por ejemplo, una cuenta con un saldo real de 32,9 y un saldo efectivo de 32 necesita ganar otro 0,35 de ETH para traer su saldo real encima de 33,25 antes de activando un aumento en saldo efectivo.

Este amortiguador también evita que un saldo efectivo caiga hasta que haya bajado 0,25 ETH por debajo de su saldo efectivo actual.

Cada par de claves asociado con un validador requiere que se activen al menos 32 ETH. Cualquier saldo encima de este puedo ser retirado a la dirección de retiro asociada en cualquier tiempo a través de una transacción firmada por este dirrección. Cualquier fondo que supere el saldo máximo efectivo será retirado automaticamente de forma periódica.

Si participar desde casa le parece demasiado exigente, considere usar un proveedor de [participación como servicio](/staking/saas/), o, si tiene menos de 32  ETH, échele un vistazo a las [participaciones agrupadas](/staking/pools/).

</ExpandableCard>

<ExpandableCard title="Will I be slashed if I go offline? (tldr: No.)">
El desconectarse cuando la red está finalizando correctamente NO producirá «recortes». Se le aplicarán ligeras <em>penalizaciones por inactividad</em> si su validador no está disponible para certificar una época determinada (a cada 6,4 minutos), que es muy diferente del <em>«recorte»</em>. Estas penalizaciones son ligeramente inferiores a la recompensa que usted habría ganado si el validador hubiera estado disponible para certificar, y las pérdidas pueden devolverse al cabo del mismo tiempo aproximadamente en línea.

Tenga en cuenta que las penalizaciones por inactividad son proporcionales a los validadores que estén fuera de línea al mismo tiempo. En casos en los que una gran parte de la red está desconectada a la vez, las penalizaciones para cada uno de estos validadores serán mayores que cuando un validador no esté disponible.

En casos extremos, si la red se detiene con más de un tercio de los validadores fuera de línea como resultado, estos usuarios serán penalizados con lo que se conoce como una <em>fuga cuadrática de inactividad</em>, esto es, un drenaje exponencial de ETH de las cuentas de validadores fuera de línea. Esto permite que la red eventualmente se regenere al quemar ETH de validadores inactivos hasta que su balance alcance los 16 ETH, en cuyo momento serán expulsados automáticamente del grupo de validadores. Los validadores en línea restantes eventualmente comprenderán más de 2/3 la red de nuevo, satisfaciendo la supermayoría necesaria para finalizar la cadena una vez más.

</ExpandableCard>

<ExpandableCard title="How do I ensure I don't get slashed?">
En resumen, esto nunca se puede garantizar por completo, pero si actúa de buena fe, ejecuta un cliente minoritario y mantiene sus claves de firma en solo una máquina a la vez, el riesgo de ser penalizado (slashed) es casi nulo.

Solo hay unas cuantas formas específicas de que un validador sea penalizado con «recortes» y expulsado de la red. A fecha de publicación de este blog, los «recortes» que se han producido han sido exclusivamente un producto de configuraciones de hardware redundantes donde las claves de firma se almacenan en dos máquinas separadas a la vez. Esto puede dar como resultado casualmente un <em>doble voto</em> de sus llaves, lo cual es una acción penalizada.

Ejecutar un cliente de supermayoría (cualquier cliente utilizado por más de 2/3 la red) también tiene el riesgo de un potencial «recorte» en el caso de que este cliente tenga un error que resulte en una bifurcación de la cadena. Esto puede producir una bifurcación defectuosa que se finalice. Para revertir a la cadena prevista, se requeriría enviar un <em>voto surround («envolvente») </em> intentando deshacer un bloque finalizado. Esto también es una acción penalizada con «recorte» y que se puede evitar simplemente ejecutando un cliente minoritario en su lugar.

Errores equivalentes en un cliente minoritario <em>nunca finalizarán (bloques) </em> y, por lo tanto, nunca resultarían en un voto surround («envolvente»), y simplemente resultaría en penalizaciones por inactividad, <em>no de «recorte»</em>.

<ul>
  <li><a href="https://hackernoon.com/ethereums-client-diversity-problem">Obtenga más información sobre la importancia de ejecutar un cliente minoritario.</a></li>
  <li><a href="https://medium.com/prysmatic-labs/eth2-slashing-prevention-tips-f6faa5025f50">Obtenga más información sobre la prevención de penalizaciones (slashing)</a></li>
</ul>
</ExpandableCard>

<ExpandableCard title="Which client is best?">
Los clientes individuales pueden variar ligeramente en términos de funcionamiento e interfaz de usuario, ya que cada uno lo desarrollan diferentes equipos, utilizando una variedad de lenguajes de programación. Dicho esto, ninguno de ellos es el «mejor». Todos los clientes de producción son excelentes piezas de software, los cuales realizan las mismas funciones fundamentales para sincronizar e interactuar con la cadena de bloques.

Dado que todos los clientes de producción proporcionan la misma funcionalidad básica, es en realidad es muy importante que elija un <strong>cliente minoritario</strong>, esto es, cualquier cliente que NO esté siendo usado actualmente por la mayoría de validadores de la red. Esto puede parecer poco intuitivo, pero el ejecutar un cliente en mayoría o supermayoría aumenta su riesgo de sufrir «recortes» en el caso de error en ese cliente. La ejecución de un cliente minoritario limita drásticamente estos riesgos.

<a href="https://mirror.xyz/jmcook.eth/S7ONEka_0RgtKTZ3-dakPmAHQNPvuj15nh0YGKPFriA">Obtenga más información sobre por qué la diversidad de clientes es fundamental</a>

</ExpandableCard>

<ExpandableCard title="Can I just use a VPS (virtual private server)?">
Aunque un servidor privado virtual (VPS) puede utilizarse en sustitución del hardware doméstico, el acceso físico y la ubicación de su cliente validador <em> sí importa</em>. Las soluciones centralizadas en la nube tales como Amazon Web Services (AWS) o Digital Ocean permiten la conveniencia de no tener que obtener y operar hardware, a expensas de centralizar la red.

Cuantos más clientes validadores se ejecuten en una sola solución centralizada de almacenamiento en la nube, más peligroso será para estos usuarios. Cualquier evento que desconecte a estos proveedores, ya sea por un ataque, por exigencias regulatorias, o simplemente por interrupciones de energía o Internet, ocasionará que cada cliente validador que se base en estos servidores se desconecte al mismo tiempo.

Las penalizaciones por estar fuera de línea son proporcionales a cuántos están fuera de línea al mismo tiempo. El uso de VPS aumenta enormemente el riesgo de que las penalizaciones por estar fuera de línea sean más severas, y aumenta su riesgo de fuga cuadrática o «recorte» en el caso de que la interrupción sea lo suficientemente importante. Para reducir su propio riesgo, y el riesgo para la red, se recomienda encarecidamente a los usuarios obtener y operar su propio hardware.

</ExpandableCard>

<ExpandableCard title="How do I unlock my rewards or get my ETH back?">

Las retiradas de cualquier tipo de la cadena de baliza requieren que se establezcan credenciales de retirada.

Los nuevos participantes las establecen en el momento de la generación y el depósito de la clave. Los particpipantes existentes que no hayan configurado esta funcionalidad pueden actualizar sus claves para poder utilizarla.

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
