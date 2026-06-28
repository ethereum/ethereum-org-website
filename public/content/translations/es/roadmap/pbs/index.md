---
title: Separación proponente-constructor
description: Aprenda cómo y por qué los validadores de Ethereum dividirán sus responsabilidades de construcción y difusión de bloques.
lang: es
---

Los validadores actuales de [Ethereum](/) crean _y_ difunden bloques. Agrupan las transacciones de las que han tenido conocimiento a través de la red de chismes (gossip network) y las empaquetan en un bloque que se envía a sus pares en la red Ethereum. La **separación proponente-constructor (PBS)** divide estas tareas entre múltiples validadores. Los constructores de bloques pasan a ser responsables de crear bloques y ofrecerlos al proponente de bloque en cada slot. El proponente de bloque no puede ver el contenido del bloque, simplemente elige el más rentable, recibiendo una tarifa del constructor de bloques (o el constructor paga una oferta al proponente) antes de enviar el bloque a sus pares.

Esta es una actualización importante por varias razones. En primer lugar, crea oportunidades para evitar la censura de transacciones a nivel del protocolo. En segundo lugar, evita que los validadores aficionados se vean superados por actores institucionales que pueden optimizar mejor la rentabilidad de su construcción de bloques. En tercer lugar, ayuda a escalar Ethereum al habilitar las actualizaciones de danksharding.

## PBS y resistencia a la censura {#pbs-and-censorship-resistance}

Separar a los constructores de bloques y a los proponentes de bloques hace que sea mucho más difícil para los constructores de bloques censurar transacciones. Esto se debe a que se pueden agregar criterios de inclusión relativamente complejos que garantizan que no haya habido censura antes de que se proponga el bloque. Como el proponente de bloque es una entidad separada del constructor de bloques, puede asumir el papel de protector contra los constructores de bloques que censuran.

Por ejemplo, se pueden introducir listas de inclusión para que cuando los validadores conozcan transacciones pero no las vean incluidas en los bloques, puedan imponerlas como obligatorias en el siguiente bloque. La lista de inclusión se genera a partir de la mempool local del proponente de bloque (la lista de transacciones de las que tiene conocimiento) y se envía a sus pares justo antes de que se proponga un bloque. Si falta alguna de las transacciones de la lista de inclusión, el proponente podría rechazar el bloque, agregar las transacciones faltantes antes de proponerlo, o proponerlo y dejar que otros validadores lo rechacen cuando lo reciban. También existe una versión potencialmente más eficiente de esta idea que afirma que los constructores deben utilizar completamente el espacio de bloque disponible y, si no lo hacen, se agregan transacciones de la lista de inclusión del proponente. Esta sigue siendo un área de investigación activa y aún no se ha determinado la configuración óptima para las listas de inclusión.

Las [mempools encriptadas](https://www.youtube.com/watch?v=fHDjgFcha0M&list=PLpktWkixc1gUqkyc1-iE6TT0RWQTBJELe&index=3) también podrían hacer imposible que los constructores y proponentes sepan qué transacciones están incluyendo en un bloque hasta después de que el bloque ya haya sido difundido.

<ExpandableCard title="¿Qué tipos de censura resuelve PBS?" eventCategory="/roadmap/pbs" eventName="clicked what kinds of censorship does PBS solve?">

Las organizaciones poderosas pueden presionar a los validadores para que censuren transacciones hacia o desde ciertas direcciones. Los validadores ceden a esta presión detectando direcciones en listas negras en su pool de transacciones y omitiéndolas de los bloques que proponen. Después de la PBS, esto ya no será posible porque los proponentes de bloques no sabrán qué transacciones están difundiendo en sus bloques. Podría ser importante para ciertos individuos o aplicaciones cumplir con las reglas de censura, por ejemplo, cuando se convierte en ley en su región. En estos casos, el cumplimiento ocurre a nivel de la aplicación, mientras que el protocolo sigue siendo sin permisos y libre de censura.

</ExpandableCard>

## PBS y MEV {#pbs-and-mev}

El **valor máximo extraíble (MEV)** se refiere a los validadores que maximizan su rentabilidad ordenando favorablemente las transacciones. Ejemplos comunes incluyen el arbitraje de intercambios en exchanges descentralizados (por ejemplo, adelantarse a una gran venta o compra) o identificar oportunidades para liquidar posiciones de finanzas descentralizadas (DeFi). Maximizar el MEV requiere conocimientos técnicos sofisticados y software personalizado añadido a los validadores normales, lo que hace mucho más probable que los operadores institucionales superen a los individuos y validadores aficionados en la extracción de MEV. Esto significa que los retornos del staking probablemente sean mayores con operadores centralizados, creando una fuerza centralizadora que desincentiva el staking en casa.

La PBS resuelve este problema reconfigurando la economía del MEV. En lugar de que el proponente de bloque haga su propia búsqueda de MEV, simplemente elige un bloque de los muchos que le ofrecen los constructores de bloques. Los constructores de bloques podrían haber realizado una extracción sofisticada de MEV, pero la recompensa por ello va al proponente de bloque. Esto significa que incluso si un pequeño grupo de constructores de bloques especializados domina la extracción de MEV, la recompensa por ello podría ir a cualquier validador en la red, incluidos los stakers individuales en casa.

<ExpandableCard title="¿Por qué está bien centralizar la construcción de bloques?" eventCategory="/roadmap/pbs" eventName="clicked why is it OK to centralize block building?">

Los individuos podrían verse incentivados a hacer staking con pools en lugar de hacerlo por su cuenta debido a las mayores recompensas que ofrecen las estrategias sofisticadas de MEV. Separar la construcción de bloques de la propuesta de bloques significa que el MEV extraído se distribuirá entre más validadores en lugar de centralizarse en el buscador de MEV más efectivo. Al mismo tiempo, permitir que existan constructores de bloques especializados quita la carga de la construcción de bloques a los individuos, y también evita que los individuos roben MEV para sí mismos, mientras maximiza el número de validadores individuales e independientes que pueden comprobar que los bloques son honestos. El concepto importante es la "asimetría probador-verificador", que se refiere a la idea de que la producción centralizada de bloques está bien siempre y cuando haya una red robusta y máximamente descentralizada de validadores capaces de probar que los bloques son honestos. La descentralización es un medio, no un objetivo final: lo que queremos son bloques honestos.
</ExpandableCard>

## PBS y danksharding {#pbs-and-danksharding}

El danksharding es la forma en que Ethereum escalará a >100.000 transacciones por segundo y minimizará las tarifas para los usuarios de rollups. Depende de la PBS porque aumenta la carga de trabajo para los constructores de bloques, quienes tendrán que calcular pruebas para hasta 64 MB de datos de rollup en menos de 1 segundo. Esto probablemente requerirá constructores especializados que puedan dedicar un hardware bastante sustancial a la tarea. Sin embargo, en la situación actual, la construcción de bloques podría volverse cada vez más centralizada en torno a operadores más sofisticados y poderosos de todos modos debido a la extracción de MEV. La separación proponente-constructor es una forma de aceptar esta realidad y evitar que ejerza una fuerza centralizadora sobre la validación de bloques (la parte importante) o la distribución de las recompensas de staking. Un gran beneficio adicional es que los constructores de bloques especializados también están dispuestos y son capaces de calcular las pruebas de datos necesarias para el danksharding.

## Progreso actual {#current-progress}

La PBS se encuentra en una etapa avanzada de investigación, pero todavía hay algunas preguntas de diseño importantes que deben resolverse antes de que se pueda crear un prototipo en los clientes de Ethereum. Aún no hay una especificación finalizada. Esto significa que la PBS probablemente esté a un año o más de distancia. Consulte el último [estado de la investigación](https://notes.ethereum.org/@vbuterin/pbs_censorship_resistance).

## Más información {#further-reading}

- [Estado de la investigación: resistencia a la censura bajo la PBS](https://notes.ethereum.org/@vbuterin/pbs_censorship_resistance)
- [Diseños de mercado de tarifas amigables con la PBS](https://ethresear.ch/t/proposer-block-builder-separation-friendly-fee-market-designs/9725)
- [PBS y resistencia a la censura](https://notes.ethereum.org/@fradamt/H1TsYRfJc#Secondary-auctions)
- [Listas de inclusión](https://notes.ethereum.org/@fradamt/forward-inclusion-lists)