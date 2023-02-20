---
title: Fragmentación
description: "Obtenga mayor información sobre la fragmentación: la división y distribución del flujo de datos necesaria para aportar a Ethereum una mayor capacidad para transacciones y facilitar su ejecución."
lang: es
template: upgrade
image: ../../../../../assets/upgrades/newrings.png
summaryPoint1: La fragmentación es una actualización multifase para mejorar la escalabilidad y la capacidad de Ethereum.
summaryPoint2: La fragmentación proporciona una distribución segura de los requisitos de almacenamiento de datos, permitiendo que las acumulaciones sean aún más económicas y facilitando las operaciones de nodos.
summaryPoint3: Permiten que las soluciones de capa 2 ofrezcan bajas comisiones por transacción, al mismo tiempo que aprovechan la seguridad de Ethereum.
summaryPoint4: Esta actualización se ha convertido en una prioridad desde la transición de Ethereum a la prueba de participación.
---

<UpgradeStatus dateKey="page-upgrades-shards-date">
    La fragmentación podría implementarse durante el 2023. Las particiones podrán dotar a Ethereum de una mayor capacidad de almacenamiento y acceso a la data, pero no serán utilizadas para la ejecución de código.
</UpgradeStatus>

## ¿Qué es la fragmentación? {#what-is-sharding}

La fragmentación o «sharding» es un concepto común en informática que denomina el proceso de dividir una base de datos horizontalmente para distribuir la carga. En el contexto de la red de Ethereum, la fragmentación operará en sinergia con las [acumulaciones de capa 2](/layer-2/) al aliviar la carga que representa el manejo de la amplia cantidad de datos requeridos por las acumulaciones en toda la red. Esto continuará ayudando a reducir la congestión de la red e incrementará el número de transacciones por segundo.

Esto es importante por otras razones, además de la escalabilidad.

## Características de la fragmentación {#features-of-sharding}

### Cualquiera puede ejecutar un nodo {#everyone-can-run-a-node}

La fragmentación es una buena manera de escalar si se quieren mantener la descentralización, ya que la alternativa es escalar aumentando el tamaño de la base de datos existente. Esto haría que Ethereum fuese menos accesible para los validadores de red, porque necesitarían ordenadores potentes y costosos. A través de la fragmentación, ya no será necesario que los validadores almacenen toda esta cantidad de datos. En lugar de ello, se espera el uso de técnicas basadas en los datos disponibles habilitados en la totalidad de la red. Esto reduce drásticamente el coste del almacenamiento de datos en la capa 1 al minimizar los requerimientos de hardware.

### Más participación en la red {#more-network-participation}

Con el tiempo, la fragmentación le permitirá ejecutar Ethereum en un ordenador portátil o teléfono. Por lo tanto, más personas podrán participar o ejecutar [clientes](/developers/docs/nodes-and-clients/) en un Ethereum fragmentado. Esto aumentará la seguridad, porque cuanto más descentralizada sea la red, menor será la superficie de ataque.

Con menores requisitos de hardware, la fragmentación facilitará la ejecución de [clientes](/developers/docs/nodes-and-clients/) por su propia cuenta, sin depender de ningún servicio intermediario en absoluto. Y si puede, plantéese la posibilidad de ejecutar varios clientes también. Esto puede mejorar el funcionamiento de la red al reducir aún más las causas de los fallos.

<br />

<InfoBanner isWarning>
  Tendrá que ejecutar de manera simultánea un cliente de ejecución junto con su cliente de consenso. La <a href="https://launchpad.ethereum.org" target="_blank">plataforma de lanzamiento</a> le guiará a través de los requisitos de hardware y el proceso.
</InfoBanner>

## Cadenas de fragmentos versión 1: disponibilidad de datos {#data-availability}

<InfoBanner emoji=":construction:" isWarning>
  <strong>Aviso:</strong> La planificación relacionada a la fragmentación ha ido evolucionando gracias a la aparición de nuevos desarrollos con formas de escalabilidad más eficientes. El «danksharding» es una nueva aproximación a la fragmentación, en la que, en lugar de emplear el concepto de cadena de fragmentos, se usan cúmulos de fragmentaciones para dividir los datos, junto con el «muestreo de la disponibilidad de datos» para confirmar que se encuentran todos ellos disponibles. Este cambio de plan ofrece una solución al problema original.<br/><br/>
  <strong> Los detalles señalados a continuación podrían estar desactualizados con respecto a los más recientes planes de desarrollo. </strong> Mientras realizamos dichas actualizaciones, por favor, consulte <a href="https://members.delphidigital.io/reports/the-hitchhikers-guide-to-ethereum"> «La guía del autoestopista de Ethereum» </a> para acceder a un desglose detallado de la hoja de ruta de Ethereum.
</InfoBanner>

Cuando se envíen las primeras cadenas de fragmentos, solo proporcionarán datos adicionales a la red. No manejarán transacciones ni contratos inteligentes. Pero seguirán ofreciendo increíbles mejoras en las transacciones por segundo cuando se combinen con acumulaciones (o «rollups»).

Las acumulaciones son una tecnología de «capa 2» que existe en la actualidad. Permiten que las dapps agrupen o «acumulen» transacciones en una única transacción fuera de la cadena, generen una prueba criptográfica y luego la envíen a la cadena. Esto reduce los datos necesarios para una transacción. Si lo combinamos con toda la disponibilidad de datos adicional proporcionada por los fragmentos, obtendremos 100.000 transacciones por segundo.

## Cadenas de fragmentos versión 2: ejecución del código {#code-execution}

El plan siempre consistió en añadir funcionalidad adicional a los fragmentos, para hacerlos más parecidos a la [red principal Ethereum](/glossary/#mainnet) actual. Esto les permitiría almacenar y ejecutar un código y manejar transacciones, ya que cada fragmento contendría su conjunto único de contratos inteligentes y saldos de cuentas. La comunicación entre fragmentos permitiría transacciones entre fragmentos.

Sin embargo, teniendo en cuenta el aumento de las transacciones por segundo que proporcionan los fragmentos de la versión 1, ¿sigue siendo necesario que esto suceda? Este es un tema que aún se está debatiendo en la comunidad y parece que hay algunas opciones.

### ¿Los fragmentos necesitan ejecución del código? {#do-shards-need-code-execution}

En el pódcast Bankless, Vitalik Buterin presentó tres opciones potenciales que vale la pena discutir.

<YouTube id="-R0j5AMUSzA" start="5841" />

#### 1. No requiere una ejecución del estado {#state-execution-not-needed}

Esto significaría que no dar a los fragmentos la capacidad de manejar contratos inteligentes y dejarlos como depósitos de datos.

#### 2. Tenga algunos fragmentos de ejecución. {#some-execution-shards}

Es probable que existan algunos elementos que no requieran que todos los fragmentos sean inteligentes. Podríamos añadir esta funcionalidad a unos cuantos y dejar el resto. De esta forma se podría acelerar la entrega.

#### 3. Espere hasta que podamos hacer snarks de Zero Knowledge (ZK) {#wait-for-zk-snarks}

Por último, quizás deberíamos volver a plantearnos esto cuando se establezcan los snarks de ZK. Esta es una tecnología que podría ayudar a traer transacciones verdaderamente privadas a la red. Es probable que requieran fragmentos más inteligentes, pero aún están en investigación y desarrollo.

#### Otros recursos {#other-sources}

Aquí tiene algunas ideas que van en la misma línea:

- [Fase 1 y listo: Eth2 como motor de disponibilidad de datos](https://ethresear.ch/t/phase-one-and-done-eth2-as-a-data-availability-engine/5269/8) (_cdetrio, ethresear.ch)_

Este sigue siendo un punto de debate activo. Actualizaremos estas páginas en cuanto sepamos más.

## Relación entre actualizaciones {#relationship-between-upgrades}

Las actualizaciones de Ethereum están interrelacionadas de alguna manera. Por tanto, recapitulemos sobre cómo se relacionan las cadenas de fragmentos con las otras actualizaciones.

### Los fragmentos y la cadena de bloques de Ethereum {#shards-and-blockchain}

La lógica tras mantener los fragmentos seguros y sincronizados está del todo integrada en los clientes que construyen la cadena de bloques de Ethereum. Los participantes de la red serán asignados a los fragmentos en los que trabajarán. Los fragmentos tendrán acceso a capturas instantáneas de otros fragmentos, de tal forma que puedan tener una visión del estado de la red Ethereum y así lograr mantener todo actualizado.

### Más información {#read-more}

<ShardChainsList />
