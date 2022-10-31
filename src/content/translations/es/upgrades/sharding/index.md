---
title: Cadenas de fragmentos
description: Obtenga más información sobre las cadenas de fragmentos, particiones de la red que proporcionan a Ethereum más capacidad de transacción y facilitan su ejecución.
lang: es
template: upgrade
image: ../../../../../assets/upgrades/newrings.png
summaryPoint1: La fragmentación es una actualización multifase para mejorar la escalabilidad y la capacidad de Ethereum.
summaryPoint2: Las cadenas de fragmentos proporcionan capas de almacenamiento adicionales, más económicas, para que las aplicaciones y las acumulaciones (o «rollups») almacenen datos.
summaryPoint3: Permiten que las soluciones de capa 2 ofrezcan bajas comisiones por transacción, al mismo tiempo que aprovechan la seguridad de Ethereum.
summaryPoint4: Esta actualización está prevista que siga a la fusión de la red principal con la cadena de baliza.
---

<UpgradeStatus dateKey="page-upgrades-shards-date">
    Las cadenas de fragmentos deberían llegar a lo largo de 2023, dependiendo de la rapidez con la que avance el proyecto tras <a href="/upgrades/merge/">la fusión</a>. Estos fragmentos le darán a Ethereum más capacidad para almacenar y acceder a datos, pero no se usarán para ejecutar código.
</UpgradeStatus>

## ¿Qué es la fragmentación? {#what-is-sharding}

La fragmentación o «sharding» es un concepto común en informática que denomina el proceso de dividir una base de datos horizontalmente para distribuir la carga. En un contexto de Ethereum, la fragmentación reducirá la congestión de la red y aumentará las transacciones por segundo mediante la creación de nuevas cadenas, conocidas como fragmentos (o «shards»).

Esto es importante por otras razones, además de la escalabilidad.

## Características de la fragmentación {#features-of-sharding}

### Cualquiera puede ejecutar un nodo {#everyone-can-run-a-node}

La fragmentación es una buena manera de escalar si se quieren mantener la descentralización, ya que la alternativa es escalar aumentando el tamaño de la base de datos existente. Esto haría que Ethereum fuese menos accesible para los validadores de red, porque necesitarían ordenadores potentes y costosos. Con las cadenas de fragmentos (o «shard chains»), los validadores solo necesitan almacenar o ejecutar datos para el fragmento que están validando, no para toda la red, como sucede hoy en día. Esto acelera las cosas y reduce drásticamente los requisitos de hardware.

### Más participación en la red {#more-network-participation}

Con el tiempo, la fragmentación le permitirá ejecutar Ethereum en un ordenador portátil o teléfono. Por lo tanto, más personas podrán participar o ejecutar [clientes](/developers/docs/nodes-and-clients/) en un Ethereum fragmentado. Esto aumentará la seguridad, porque cuanto más descentralizada sea la red, menor será la superficie de ataque.

Con menores requisitos de hardware, la fragmentación facilitará la ejecución de [clientes](/developers/docs/nodes-and-clients/) por su propia cuenta, sin depender de ningún servicio intermediario en absoluto. Y si puede, plantéese la posibilidad de ejecutar varios clientes también. Esto puede mejorar el funcionamiento de la red al reducir aún más las causas de los fallos. [Ejecute un cliente de cadena de baliza](/upgrades/get-involved/)

<br />

<InfoBanner isWarning={true}>
  Al principio, usted necesitará ejecutar un cliente de red principal al mismo tiempo que su cliente de cadena de baliza. La <a href="https://launchpad.ethereum.org" target="_blank">plataforma de lanzamiento</a> le guiará a través de los requisitos de hardware y el proceso. Asimismo, puede usar una <a href="/developers/docs/apis/backend/#available-libraries">API de backend</a>.
</InfoBanner>

## Cadenas de fragmentos versión 1: disponibilidad de datos {#data-availability}

Cuando se envíen las primeras cadenas de fragmentos, solo proporcionarán datos adicionales a la red. No manejarán transacciones ni contratos inteligentes. Pero seguirán ofreciendo increíbles mejoras en las transacciones por segundo cuando se combinen con acumulaciones (o «rollups»).

Las acumulaciones son una tecnología de «capa 2» que existe en la actualidad. Permiten que las dapps agrupen o «acumulen» transacciones en una única transacción fuera de la cadena, generen una prueba criptográfica y luego la envíen a la cadena. Esto reduce los datos necesarios para una transacción. Si lo combinamos con toda la disponibilidad de datos adicional proporcionada por los fragmentos, obtendremos 100.000 transacciones por segundo.

<InfoBanner isWarning={false}>
  El reciente progreso en la investigación y el desarrollo de soluciones de escalabilidad de capa 2 ha llevado a priorizar la actualización de la fusión antes que las cadenas de fragmentos. Estas serán el centro de atención tras la transición de la red principal a la prueba de participación.

[Más información sobre las acumulaciones o «rollups»](/developers/docs/scaling/#rollups)
</InfoBanner>

## Cadenas de fragmentos versión 2: ejecución del código {#code-execution}

El plan siempre consistió en añadir funcionalidad adicional a los fragmentos, para hacerlos más parecidos a la [red principal Ethereum](/glossary/#mainnet) actual. Esto les permitiría almacenar y ejecutar un código y manejar transacciones, ya que cada fragmento contendría su conjunto único de contratos inteligentes y saldos de cuentas. La comunicación entre fragmentos permitiría transacciones entre fragmentos.

Sin embargo, teniendo en cuenta el aumento de las transacciones por segundo que proporcionan los fragmentos de la versión 1, ¿sigue siendo necesario que esto suceda? Este es un tema que aún se está debatiendo en la comunidad y parece que hay algunas opciones.

### ¿Los fragmentos necesitan ejecución del código? {#do-shards-need-code-execution}

En el pódcast Bankless, Vitalik Buterin presentó tres opciones potenciales que vale la pena discutir.

<YouTube id="-R0j5AMUSzA" start="5841" />

#### 1. No necesitar ejecución del estado {#state-execution-not-needed}

Esto significaría que no dar a los fragmentos la capacidad de manejar contratos inteligentes y dejarlos como depósitos de datos.

#### 2. Tener algunos fragmentos de ejecución {#some-execution-shards}

Quizás haya un compromiso en el que no necesitemos todos los fragmentos (en este momento están planeados 64) para ser más inteligentes. Podríamos añadir esta funcionalidad a unos cuantos y dejar el resto. De esta forma se podría acelerar la entrega.

#### 3. Esperar hasta que podamos hacer snarks de Zero Knowledge (ZK) {#wait-for-zk-snarks}

Por último, quizás deberíamos volver a plantearnos esto cuando se establezcan los snarks de ZK. Esta es una tecnología que podría ayudar a traer transacciones verdaderamente privadas a la red. Es probable que requieran fragmentos más inteligentes, pero aún están en investigación y desarrollo.

#### Otros recursos {#other-sources}

Aquí tiene algunas ideas que van en la misma línea:

- [Fase 1 y listo: Eth2 como motor de disponibilidad de datos](https://ethresear.ch/t/phase-one-and-done-eth2-as-a-data-availability-engine/5269/8) (_cdetrio, ethresear.ch)_

Este sigue siendo un punto de debate activo. Actualizaremos estas páginas en cuanto sepamos más.

## Relación entre actualizaciones {#relationship-between-upgrades}

Las actualizaciones de Ethereum están interrelacionadas de alguna manera. Por tanto, recapitulemos sobre cómo se relacionan las cadenas de fragmentos con las otras actualizaciones.

### Los fragmentos y la cadena de baliza {#shards-and-beacon-chain}

La cadena de baliza contiene toda la lógica para mantener los fragmentos seguros y sincronizados. La cadena de balizas coordinará a los participantes de la red, asignándoles los fragmentos en los que deben trabajar. Y también facilitará la comunicación entre fragmentos al recibir y almacenar datos de transacción de fragmentación accesibles para otros fragmentos. Esto dará a los fragmentos una panorámica del estado de Ethereum para mantener todo actualizado.

<ButtonLink to="/upgrades/beacon-chain/">
  La cadena de baliza
</ButtonLink>

### Los fragmentos y la fusión {#shards-and-docking}

En el momento en que se añadan los fragmentos adicionales, la red principal de Ethereum ya se encontrará asegurada por la cadena de baliza utilizando la prueba de participación. Esto permite una red principal fértil para construir cadenas de fragmentos, impulsada por soluciones de capa 2 que potencian la escalabilidad.

Queda por ver si la red principal existirá como el único fragmento «inteligente» que puede gestionar la ejecución del código. En cualquier caso, la decisión de ampliar los fragmentos siempre puede revisarse en caso de ser necesario.

<ButtonLink to="/upgrades/merge/">
  La fusión
</ButtonLink>

<Divider />

### Más información {#read-more}

<ShardChainsList />
