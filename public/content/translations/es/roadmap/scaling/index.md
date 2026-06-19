---
title: Escalar Ethereum
description: Los rollups agrupan transacciones fuera de la cadena, reduciendo los costos para el usuario. Sin embargo, la forma en que los rollups utilizan actualmente los datos es demasiado costosa, lo que limita lo baratas que pueden ser las transacciones. Proto-Danksharding soluciona esto.
lang: es
image: /images/roadmap/roadmap-transactions.png
alt: "Hoja de ruta de Ethereum"
template: roadmap
---

Ethereum se escala utilizando [capas 2](/layer-2/#rollups) (también conocidas como rollups), que agrupan transacciones y envían el resultado a Ethereum. Aunque los rollups son hasta ocho veces más baratos que la red principal de Ethereum, es posible optimizarlos aún más para reducir los costos para los usuarios finales. Los rollups también dependen de algunos componentes centralizados que los desarrolladores pueden eliminar a medida que los rollups maduran.

<Alert variant="update">
<AlertContent>
<AlertTitle className="mb-4">
  Costos de transacción
</AlertTitle>
  <ul style={{ marginBottom: 0 }}>
    <li>Los rollups actuales son <strong>~5-20x</strong> más baratos que la capa 1 (l1) de Ethereum</li>
    <li>Los ZK-rollups pronto reducirán las tarifas en <strong>~40-100x</strong></li>
    <li>Los próximos cambios en Ethereum proporcionarán otros <strong>~100-1000x</strong> de escalabilidad</li>
    <li style={{ marginBottom: 0 }}>Los usuarios deberían beneficiarse de transacciones <strong>que cuesten menos de $0.001</strong></strong>
  </strong>
</AlertContent>
</Alert>

## Abaratar los datos {#making-data-cheaper}

Los rollups recopilan un gran número de transacciones, las ejecutan y envían los resultados a Ethereum. Esto genera una gran cantidad de datos que deben estar disponibles abiertamente para que cualquiera pueda ejecutar las transacciones por sí mismo y verificar que el operador del rollup fue honesto. Si alguien encuentra una discrepancia, puede presentar una impugnación.

### Proto-Danksharding {#proto-danksharding}

Históricamente, los datos de los rollups se han almacenado en Ethereum de forma permanente, lo cual es costoso. Más del 90% del costo de transacción que pagan los usuarios en los rollups se debe a este almacenamiento de datos. Para reducir los costos de transacción, podemos trasladar los datos a un nuevo almacenamiento temporal de 'blobs'. Los blobs son más baratos porque no son permanentes; se eliminan de Ethereum una vez que ya no son necesarios. El almacenamiento a largo plazo de los datos de los rollups se convierte en responsabilidad de las personas que los necesitan, como los operadores de rollups, los intercambios (exchanges), los servicios de indexación, etc. Añadir transacciones de blobs a Ethereum es parte de una actualización conocida como "Proto-Danksharding".

Con Proto-Danksharding, es posible añadir muchos blobs a los bloques de Ethereum. Esto permite otro aumento sustancial (>100x) en la capacidad de procesamiento de Ethereum y una reducción en los costos de transacción.

### Danksharding {#danksharding}

La segunda etapa de la expansión de los datos de los blobs es complicada porque requiere nuevos métodos para comprobar que los datos de los rollups están disponibles en la red y depende de que los [validadores](/glossary/#validator) separen sus responsabilidades de construcción de [bloques](/glossary/#block) y de propuesta de bloques. También requiere una forma de probar criptográficamente que los validadores han verificado pequeños subconjuntos de los datos de los blobs.

Este segundo paso se conoce como ["danksharding"](/roadmap/danksharding/). El trabajo de implementación continúa, con avances en los requisitos previos como la [separación de la construcción y propuesta de bloques](/roadmap/pbs) y nuevos diseños de red que permiten a la red confirmar eficientemente que los datos están disponibles mediante el muestreo aleatorio de unos pocos kilobytes a la vez, conocido como [muestreo de disponibilidad de datos (DAS)](/developers/docs/data-availability).

<ButtonLink variant="outline-color" href="/roadmap/danksharding/">Más sobre danksharding</ButtonLink>

## Descentralización de los rollups {#decentralizing-rollups}

Los [rollups](/layer-2) ya están escalando Ethereum. Un [rico ecosistema de proyectos de rollups](https://l2beat.com/scaling/tvs) está permitiendo a los usuarios realizar transacciones de forma rápida y barata, con una serie de garantías de seguridad. Sin embargo, los rollups se han puesto en marcha utilizando secuenciadores centralizados (computadoras que realizan todo el procesamiento y agregación de transacciones antes de enviarlas a Ethereum). Esto es vulnerable a la censura, porque los operadores del secuenciador pueden ser sancionados, sobornados o comprometidos de alguna otra manera. Al mismo tiempo, los [rollups varían](https://l2beat.com/scaling/summary) en la forma en que validan los datos entrantes. La mejor manera es que los "probadores" (provers) envíen [pruebas de fraude](/glossary/#fraud-proof) o pruebas de validez, pero no todos los rollups han llegado a ese punto todavía. Incluso aquellos rollups que sí utilizan pruebas de validez/fraude emplean un pequeño grupo de probadores conocidos. Por lo tanto, el siguiente paso crítico para escalar Ethereum es distribuir la responsabilidad de ejecutar secuenciadores y probadores entre más personas.

<ButtonLink variant="outline-color" href="/developers/docs/scaling/">Más sobre los rollups</ButtonLink>

## Progreso actual {#current-progress}

Proto-Danksharding se implementó con éxito como parte de la actualización de la red Cancun-Deneb ("Dencun") en marzo de 2024. Desde su implementación, los rollups han comenzado a utilizar el almacenamiento de blobs, lo que ha resultado en una reducción de los costos de transacción para los usuarios y millones de transacciones procesadas en blobs.

El trabajo en el danksharding completo continúa, con avances en sus requisitos previos como la separación proponente-constructor (PBS) y el muestreo de disponibilidad de datos (DAS). La descentralización de la infraestructura de los rollups es un proceso gradual: hay muchos rollups diferentes que están construyendo sistemas ligeramente distintos y se descentralizarán por completo a ritmos diferentes.

[Más sobre la actualización Dencun de la red y su impacto](/roadmap/dencun/)

<QuizWidget quizKey="scaling" />