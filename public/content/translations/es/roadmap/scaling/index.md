---
title: Escalar en Ethereum
description: Las acumulaciones agrupan transacciones en lotes y lo hacen fuera de la cadena, reduciendo costes para el usuario. Sin embargo, la forma en que las acumulaciones gestionan los datos es muy cara en estos momentos, limitando con ello la posibilidad de tener transacciones baratas. Proto-anksharing se encarga de solucionarlo.
lang: es
image: /images/roadmap/roadmap-transactions.png
alt: "Hoja de ruta de Ethereum"
template: roadmap
---

Ethereum escala utilizando las [capas 2](/layer-2/#rollups)(también conocidas como acumulaciones o «rollups»), que agrupan transacciones y envían el resultado a Ethereum. Aunque las acumulaciones son hasta ocho veces más baratas que la red principal de Ethereum, es posible optimizarlas aún más para reducir costes para los usuarios finales. Las acumulaciones dependen de algunos componentes centralizados que los desarrolladores podrán eliminar en la medida en que dichas acumulaciones maduren.

<InfoBanner mb={8} title="Costos de transacción">
  <ul style={{ marginBottom: 0 }}>
    <li>Actualmente las acumulaciones son <strong>~3-8x</strong> más baratas que la capa 1 de Ethereum</li>
    <li>Las acumulaciones ZK pronto reducirán un <strong>~40-100</strong> las tarifas.</li>
    <li>Los próximos cambios en Ethereum traerán un incremento de <strong>~100-1.000</strong> en escalabilidad.</li>
    <li style={{ marginBottom: 0 }}>Los usuarios deberían beneficiarse con transacciones <strong>que cuesten menos de 0,001 USD</strong>.</li>
  </ul>
</InfoBanner>

## Abaratar los datos {#making-data-cheaper}

Las acumulaciones agrupan un gran número de transacciones, las ejecutan y envían los resultados a Ethereum. Esto genera una gran cantidad de datos que necesitan estar disponibles para todos, de forma que cualquiera pueda ejecutar las transacciones por sí mismo y verificar que el operador de la acumulación ha actuado con honestidad. Si alguien encuentra una discrepancia, puede denunciarla.

### ProtoDanksharding {#proto-danksharding}

Los datos de las acumulaciones se almacenan en Ethereum de forma permanente, lo que tiene un coste elevado. Más del 90 % del coste de la transacción que los usuarios pagan en las acumulaciones se debe a este almacenamiento de datos. Para reducir los costes de las transacciones, podemos trasladar los datos a un nuevo almacenamiento temporal masivo. Las masas de datos son más baratas, ya que no son permanentes; se eliminan de Ethereum una vez que ya no se necesitan. Almacenar datos de las acumulaciones a largo plazo se convierte en una responsabilidad de las personas que los necesitan, como los operadores de acumulación, los intercambios, los servicios de indexación, etc. Añadir transacciones masivas a Ethereum es parte de una actualización conocida como «ProtoDanksharding». Se espera que esté lista relativamente pronto, tal vez a finales de 2023.

Después de que las transacciones masivas se hayan convertido en parte del protocolo Ethereum a través de ProtoDanksharding, se podrán añadir muchas masas a los bloques de Ethereum. Esto traerá otro aumento sustancial (>x 100) del rendimiento de Ethereum y una reducción en los costes de transacción.

### Danksharding {#danksharding}

La segunda fase de expansión de los datos guardados masivamente es complicada, porque requiere nuevos métodos para comprobar si los datos de las acumulaciones están disponibles en la red y depende de que se puedan separar las responsabilidades de los validadores en la construcción y propuesta de bloques. También requiere una forma de demostrar criptográficamente que los validadores han verificado pequeños subconjuntos de los datos masivos.

Este segundo paso es conocido como [«Danksharding»](/roadmap/danksharding/). Es probable que aún tarde varios años en implementarse en su totalidad. Danksharding se basa en otros desarrollos como [separar la construcción y la propuesta de bloques](/roadmap/pbs) y nuevos diseños de red que permitan a la red confirmar eficientemente que los datos están disponibles, muestreando aleatoriamente unos cuantos kilobytes cada vez, lo que se denomina [muestreo de disponibilidad de datos (DAS)](/developers/docs/data-availability).

<ButtonLink variant="outline-color" href="/roadmap/danksharding/">Más información sobre la fragmentación.</ButtonLink>

## Descentralizar las acumulaciones {#decentralizing-rollups}

Las [acumulaciones](/layer-2) ya están escalando en Ethereum. Un ecosistema rico en [proyectos sobre acumulaciones](https://l2beat.com/scaling/tvl) permite que los usuarios hagan una transacción rápida y económica, con un rango de garantías de seguridad. Sin embargo, las acumulaciones se han implementado inicialmente utilizando secuenciadores centralizados (ordenadores que realizan todo el procesamiento de transacciones y la agregación antes de enviarlas a Ethereum). Esto los hace vulnerables a la censura, porque los operadores de los secuenciadores pueden ser sancionados, sobornados o verse expuestos a riesgos. Al mismo tiempo, [las acumulaciones se diferencian](https://l2beat.com) en la forma en que validan los datos entrantes. La mejor forma es que los «probadores» presenten pruebas de fraude o pruebas de validez, pero no todas las acumulaciones están a ese nivel. Incluso aquellas acumulaciones que utilizan pruebas de validez/fraude utilizan un pequeño grupo de probadores conocidos. Por lo tanto, el siguiente paso crítico en la escalabilidad de Ethereum es distribuir la responsabilidad de ejecutar secuenciadores y probadores entre más personas.

<ButtonLink variant="outline-color" href="/developers/docs/scaling/">Más información sobre las acumulaciones.</ButtonLink>

## Progreso actual {#current-progress}

Es probable que ProtoDanksharding sea uno de los primeros componentes de la hoja de ruta en implementarse. Los pasos en computación descentralizada necesarios para configurarlo ya están en marcha y varios clientes han implementado prototipos para manejar datos en masa. Es probable que el Danksharding completo aún no vea la luz en varios años, ya que depende de que se completen varios otros elementos de la hoja de ruta en primer lugar. Descentralizar la infraestructura de acumulaciones seguramente será un proceso gradual: hay muchas acumulaciones distintas que están construyendo sistemas ligeramente diferentes y se descentralizarán totalmente a diferentes velocidades.
