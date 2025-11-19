---
title: Escalar en Ethereum
description: Los rollups agrupan transacciones fuera de cadena, reduciendo los costes para el usuario. Sin embargo, la forma en que los rollups usan datos actualmente es muy costosa, limitando cuán baratas pueden ser las transacciones. Proto-anksharing se encarga de solucionarlo.
lang: es
image: /images/roadmap/roadmap-transactions.png
alt: "Hoja de ruta de Ethereum"
template: roadmap
---

Ethereum se escala utilizando [capa 2](/layer-2/#rollups) (también conocidas como rollups), que agrupan transacciones y envían el resultado a Ethereum. Aunque las acumulaciones son hasta ocho veces más baratas que la red principal de Ethereum, es posible optimizarlas aún más para reducir costes para los usuarios finales. Las acumulaciones dependen de algunos componentes centralizados que los desarrolladores podrán eliminar en la medida en que dichas acumulaciones maduren.

<Alert variant="update" className="mb-8">
<AlertContent>
<AlertTitle className="mb-4">
  Costos de transacción
</AlertTitle>
  <ul style={{ marginBottom: 0 }}>
    <li>Los rollups actuales son <strong>~5-20 veces</strong> más baratos que Ethereum de capa 1.</li>
    <li>Las acumulaciones ZK pronto reducirán un <strong>~40-100</strong> las tarifas.</li>
    <li>Los próximos cambios en Ethereum traerán un incremento de <strong>~100-1.000</strong> en escalabilidad.</li>
    <li style={{ marginBottom: 0 }}>Los usuarios deberían beneficiarse con transacciones <strong>que cuesten menos de 0,001 USD</strong>.</li>
  </ul>
</AlertContent>
</Alert>

## Haciendo que los datos sean más baratos {#making-data-cheaper}

Las acumulaciones agrupan un gran número de transacciones, las ejecutan y envían los resultados a Ethereum. Esto genera una gran cantidad de datos que necesitan estar disponibles para todos, de forma que cualquiera pueda ejecutar las transacciones por sí mismo y verificar que el operador de la acumulación ha actuado con honestidad. Si alguien encuentra una discrepancia, puede denunciarla.

### Proto-Danksharding {#proto-danksharding}

Históricamente, los datos de rollups se han almacenado en Ethereum de forma permanente, lo que resulta caro. Más del 90 % del coste de la transacción que los usuarios pagan en las acumulaciones se debe a este almacenamiento de datos. Para reducir los costes de las transacciones, podemos trasladar los datos a un nuevo almacenamiento temporal masivo. Las masas de datos son más baratas, ya que no son permanentes; se eliminan de Ethereum una vez que ya no se necesitan. El almacenamiento de datos de rollups a largo plazo pasa a ser responsabilidad de las personas que lo necesitan, como operadores de rollup, exchanges, servicios de indexación, etc. Añadir transacciones masivas a Ethereum es parte de una actualización conocida como «ProtoDanksharding».

Con Proto-Danksharding, es posible añadir muchos blobs a los bloques de Ethereum. Esto permite otra expansión sustancial (>100x) en la capacidad de procesamiento de Ethereum y una reducción significativa en los costos de transacción.

### Danksharding {#danksharding}

La segunda etapa de expansión de los datos de blob es complicada porque requiere nuevos métodos para verificar que los datos de los rollups estén disponibles en la red y depende de que los [validadores](/glossary/#validator) separen sus responsabilidades de construcción de [bloques](/glossary/#block) y de propuesta de bloques. También requiere una forma de demostrar criptográficamente que los validadores han verificado pequeños subconjuntos de los datos masivos.

Este segundo paso se conoce como ["Danksharding"](/roadmap/danksharding/). El trabajo de implementación sigue en marcha, avanzando con los requisitos previos como la [separación de la construcción y propuesta de bloques](/roadmap/pbs) y nuevos diseños de red que permiten a la red confirmar de manera eficiente que los datos están disponibles mediante el muestreo aleatorio de unos pocos kilobytes a la vez, conocido como [muestreo de disponibilidad de datos (DAS)](/developers/docs/data-availability).

<ButtonLink variant="outline-color" href="/roadmap/danksharding/">Más sobre Danksharding</ButtonLink>

## Descentralizando los rollups {#decentralizing-rollups}

[Los rollups](/layer-2) ya están escalando Ethereum. Un [ecosistema diverso de proyectos de rollup](https://l2beat.com/scaling/tvl) permite a los usuarios realizar transacciones de manera rápida y económica, con una variedad de garantías de seguridad. Sin embargo, las acumulaciones se han implementado inicialmente utilizando secuenciadores centralizados (ordenadores que realizan todo el procesamiento de transacciones y la agregación antes de enviarlas a Ethereum). Esto los hace vulnerables a la censura, porque los operadores de los secuenciadores pueden ser sancionados, sobornados o verse expuestos a riesgos. Al mismo tiempo, [los rollups varían](https://l2beat.com) en la manera en que validan los datos entrantes. La mejor manera es que los "provers" presenten [pruebas de fraude](/glossary/#fraud-proof) o pruebas de validez, pero no todos los rollups han llegado a ese punto todavía. Incluso aquellas acumulaciones que utilizan pruebas de validez/fraude utilizan un pequeño grupo de probadores conocidos. Por lo tanto, el siguiente paso crítico en la escalabilidad de Ethereum es distribuir la responsabilidad de ejecutar secuenciadores y probadores entre más personas.

<ButtonLink variant="outline-color" href="/developers/docs/scaling/">Más sobre los rollups</ButtonLink>

## Progreso actual {#current-progress}

ProtoDanksharding fue implementado con éxito como parte de la actualización de red Cancun-Deneb ("Dencun") en marzo de 2024. Desde su implementación, los rollups han empezado ha utilizar almacenamiento de blobs, dando como resultado una reducción en los costes de transacción para usuarios y millones de transacciones procesadas en blobs.

Continúa el trabajo para una implementación completa de Danksharding, con avances en sus prerrequisito, como separación del creador de propuestas (PBS en inglés) y muestreo de disponibilidad de datos (DAS en inglés). Descentralizar la infraestructura de rollups es un proceso paulatino —hay muchas rollups diferentes que están construyendo sistemas ligeramente diferentes y descentralizarán de forma completa a diferentes velocidades—.

[Más sobre la actualización de red Dencun y su impacto](/roadmap/dencun/)

<QuizWidget quizKey="scaling" />