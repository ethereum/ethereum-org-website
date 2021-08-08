---
title: Cadenas de fragmentos
description: Obtén más información sobre las cadenas de fragmentos, particiones de la red que proporcionan a Ethereum más capacidad de transacción y facilitan su ejecución.
lang: es
template: eth2
sidebar: true
image: ../../../../../assets/eth2/newrings.png
summaryPoints:
  [
    "La fragmentación es una actualización de varias fases para mejorar la escalabilidad y la capacidad de Ethereum.",
    "Las cadenas de fragmentos distribuyen la carga de la red en 64 nuevas cadenas.",
    "Facilitan la ejecución de un nodo manteniendo bajos los requisitos de hardware.",
    'Las hojas de ruta técnicas incluyen el trabajo en las cadenas de fragmentos en la "Fase 1" y potencialmente en la "Fase 2".',
  ]
---

<UpgradeStatus date="~2021">
  Las cadenas de fragmentos deberían enviarse en algún momento de 2021, en función de lo rápido que progrese el trabajo después del lanzamiento de <a href="/en/eth2/beacon-chain/">la Cadena de Baliza</a>. Estos fragmentos le darán a Ethereum más capacidad para almacenar y acceder a datos, pero no se usarán para ejecutar código. Los detalles de eso aún se están aclarando.
</UpgradeStatus>

## ¿Qué es la fragmentación o "sharding"? {#what-is-sharding}

La fragmentación o "sharding" es el proceso de dividir una base de datos horizontalmente para distribuir la carga; es un concepto común en informática. En un contexto de Ethereum, la fragmentación reducirá la congestión de la red y aumentará las transacciones por segundo mediante la creación de nuevas cadenas, conocidas como "fragmentos" o "shards".

Esto es importante por razones distintas a la escalabilidad.

## Características de la fragmentación {#features-of-sharding}

### Todos pueden ejecutar un nodo {#everyone-can-run-a-node}

La fragmentación es una buena manera de escalar si se quieren mantener las cosas descentralizadas, ya que la alternativa es escalar aumentando el tamaño de la base de datos existente. Esto haría que Ethereum fuese menos accesible para los validadores de red, porque necesitarían ordenadores potentes y costosos. Con las cadenas de fragmentos ("shard chains"), los validadores solo necesitan almacenar o ejecutar datos para el fragmento que están validando, no para toda la red, como sucede hoy en día. Esto acelera las cosas y reduce drásticamente los requisitos de hardware.

### Más participación en la red {#more-network-participation}

Con el tiempo, la fragmentación te permitirá ejecutar Ethereum en un ordenador portátil o teléfono. Por lo tanto, más personas deberían poder participar o ejecutar [clientes](/developers/docs/nodes-and-clients/) en un Ethereum fragmentado. Esto aumentará la seguridad porque, cuanto más descentralizada sea la red, menor será la superficie de ataque.

Con menores requisitos de hardware, la fragmentación facilitará la ejecución de [clientes](/developers/docs/nodes-and-clients/) por tu cuenta, sin depender de ningún servicio intermediario en absoluto. Y si puedes, considera ejecutar varios clientes. Esto puede ayudar a la salud de la red al reducir aún más los puntos de falla. [Ejecutar un cliente Eth2](/eth2/get-involved/)

<br />

<InfoBanner isWarning={true}>
  Al principio, deberás ejecutar un cliente de la red principal al mismo tiempo que tu cliente Eth2. <a href="https://launchpad.ethereum.org" target="_blank">El launchpad</a> te guiará a través de los requisitos de hardware y el proceso. Alternativamente, puedes utilizar una <a href="/en/developers/docs/apis/backend/#available-libraries">API de back-end</a>.
</InfoBanner>

## Cadenas de fragmentos versión 1: disponibilidad de datos {#data-availability}

Cuando se envían las primeras cadenas de fragmentos, solo proporcionarán datos adicionales a la red. No manejarán transacciones ni contratos inteligentes. Pero seguirán ofreciendo increíbles mejoras en las transacciones por segundo cuando se combinen con acumulaciones.

Las acumulaciones o "rollups" son una tecnología de "capa 2" que existe en la actualidad. Permiten que las dapps agrupen o “acumulen” transacciones en una única transacción fuera de la cadena, generen una prueba criptográfica y luego la envíen a la cadena. Esto reduce los datos necesarios para una transacción. Combina esto con toda la disponibilidad de datos adicional proporcionada por los fragmentos y obtén 100.000 transacciones por segundo.

[Más sobre las acumulaciones](/developers/docs/scaling/layer-2-rollups/#rollups)

## Cadenas de fragmentos versión 2: ejecución de código {#code-execution}

El plan siempre fue añadir funcionalidad adicional a los fragmentos, para que se parezcan más a la [red principal de Ethereum](/glossary/#mainnet) actual. Esto les permitiría almacenar y ejecutar contratos inteligentes y manejar cuentas. Pero teniendo en cuenta el aumento de transacciones por segundo que proporcionan los fragmentos de la versión 1, ¿es necesario que esto suceda? Esto todavía se está debatiendo en la comunidad y parece que hay algunas opciones.

### ¿Los fragmentos necesitan ejecución de código? {#do-shards-need-code-execution}

Vitalik Buterin, al hablar en el podcast Bankless, presentó 3 opciones potenciales que vale la pena discutir.

<iframe width="100%" height="315" src="https://www.youtube.com/embed/-R0j5AMUSzA?start=5841" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen mark="crwd-mark"></iframe>

#### 1. No necesitar ejecución del estado {#state-execution-not-needed}

Esto significaría que no damos a los fragmentos la capacidad de manejar contratos inteligentes y dejarlos como depósitos de datos.

#### 2. Tener algunos fragmentos de ejecución {#some-execution-shards}

Quizás haya un compromiso en el que no necesitemos todos los fragmentos (64 están planeados en este momento) para ser más inteligentes. Podríamos añadir esta funcionalidad a unos pocos y dejar el resto. Esto podría acelerar la entrega.

#### 3. Esperar hasta que podamos hacer snarks de Zero Knowledge (ZK) {#wait-for-zk-snarks}

Por último, quizás deberíamos volver a plantear este debate cuando se reafirmen los snarks de ZK. Esta es una tecnología que podría ayudar a traer transacciones verdaderamente privadas a la red. Es probable que requieran fragmentos más inteligentes, pero aún están en investigación y desarrollo.

#### Otros recursos {#other-sources}

Aquí hay algo más de pensamiento en la misma línea:

- [Fase 1 y listo: Eth2 como motor de disponibilidad de datos (](https://ethresear.ch/t/phase-one-and-done-eth2-as-a-data-availability-engine/5269/8)_cdetrio, ethresear.ch)_

Este sigue siendo un punto de discusión activo. Actualizaremos estas páginas una vez que sepamos más.

## Relación entre actualizaciones {#relationship-between-upgrades}

Las actualizaciones de Eth2 están de algún modo interrelacionadas. Así que recapitulemos sobre cómo las cadenas de fragmentos se relacionan con las otras actualizaciones.

### Los fragmentos y la Cadena de Baliza {#shards-and-beacon-chain}

La Cadena de Baliza contiene toda la lógica para mantener los fragmentos seguros y sincronizados. La Cadena de Baliza coordinará a los participantes en la red y les asignará a los fragmentos en los que tienen que trabajar. Y también facilitará la comunicación entre fragmentos al recibir y almacenar datos de transacción de fragmentación accesibles por otros fragmentos. Esto dará a los fragmentos una instantánea del estado de Ethereum para mantener todo actualizado.

<ButtonLink to="/eth2/beacon-chain/">La Cadena de Baliza</ButtonLink>

### Los fragmentos y el acoplamiento {#shards-and-docking}

La red principal de Ethereum existirá como lo hace hoy, incluso después de la introducción de fragmentos. Sin embargo, en algún momento, la red principal tendrá que convertirse en un fragmento para poder pasar a la apuesta. Queda por ver si la red principal existirá como el único fragmento “inteligente” que puede manejar la ejecución del código, pero, de cualquier manera, habrá que tomar una decisión sobre la fase 2 de fragmentación.

<ButtonLink to="/eth2/merge/">El acoplamiento</ButtonLink>

<Divider />

### Más información {#read-more}

<Eth2ShardChainsList />
