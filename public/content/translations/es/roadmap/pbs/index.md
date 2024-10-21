---
title: Separación del creador de propuestas
description: Aprenda cómo y por qué los validadores de Ethereum separarán sus responsabilidades de construcción y transmisión de bloques.
lang: es
---

# Separación del creador de propuestas {#proposer-builder-separation}

Los validadores de Ethereum del presente crean _y_ transmiten bloques. Agrupan transacciones de las que han oído hablar en una red de intercambio de información y las agrupan en un bloque que se envía a los pares en la red de Ethereum. **Separación del proponente-constructor (PBS)** dividie estas tareas entre múltiples validadores. Los constructores de bloques son responsables de la creación de bloques y de ofrecerlos al proponente de bloques de cada espacio. El proponente de bloque no puede ver su contenido, simplemente elige el más rentable y paga una tasa al constructor del bloque antes de enviarlo a sus pares.

Es una actualización importante por varias razones. En primer lugar, porque crea oportunidades para prevenir que una transacción sea censurada en el nivel de protocolo. En segundo lugar, evita que validadores aficionados sean superados por figuras institucionales que pueden optimizar la rentabilidad de sus construcciones de bloques. Y en tercer lugar, ayuda a Ethereum a escalar, ya que habilita las actualizaciones de Danksharding.

## PSB y resistencia a la censura {#pbs-and-censorship-resistance}

Separar a proponentes y constructores de bloques dificulta que los constructores de bloques puedan censurar las transacciones. Esto se debe a que se puede añadir un criterio de inclusión relativamente complejo, para asegurarse de que no haya censura antes de proponer el bloque. Ya que el proponente de bloque es una entidad separada del constructor de bloque, este puede adoptar el papel de protector contra censuras de los constructores de bloques.

Por ejemplo, pueden introducirse unas listas de inclusión para que cuando los validadores sepan sobre las transacciones, pero no las vean incluidas en los bloques, puedan imponerlas como condiciones indispensables en el siguiente bloque. La lista de inclusión es generada a partir de la zona de espera local de proponedores de bloques (la lista de transacciones de las que es consciente) y enviada a sus pares justo antes de que se proponga un bloque. Si falta alguna de las transacciones de la lista de inclusión, el proponente puede rechazar el bloque y añadir la transacción faltante antes de proponerla, o proponerla y que la rechacen otros validadores cuando la reciban. También existe una versión potencialmente más eficiente de esta idea que verifica que los constructores deben utilizar por completo el espacio del bloque disponible y si no lo hacen, las transacciones se añaden desde la lista de inclusión del proponente. Esta es un área de investigación aún activa y la configuración óptima para las listas de inclusión todavía no se ha determinado.

[Las zonas de espera encriptadas](https://www.youtube.com/watch?v=fHDjgFcha0M&list=PLpktWkixc1gUqkyc1-iE6TT0RWQTBJELe&index=3) también imposibilitarán a constructores y proponentes saber qué transacciones se están incluyendo en un bloque hasta después de que el bloque se haya transmitido.

<ExpandableCard title="¿Qué tipo de censura soluciona PBS?" eventCategory="/roadmap/pbs" eventName="clicked what kinds of censorship does PBS solve?">

Las organizaciones poderosas pueden presionar a los validadores para censurar transacciones para o de ciertas direcciones. Los validadores cumplen con esta presión detectando direcciones en la lista negra en su pool de transacciones y omitiéndolas de los bloques que proponen. Después de PBS, esto ya no será posible, porque los proponentes de bloques no sabrán qué transacciones están transmitiendo en sus bloques. Cumplir las reglas de censura ―por ejemplo, con la elaboración de un proyecto de ley en esa región― puede que sea importante para ciertos individuos o aplicaciones. En estos casos, se cumple a nivel de la solicitud, mientras que el protocolo se mantiene sin permisos ni censura.

</ExpandableCard>

## PBS y MEV {#pbs-and-mev}

**Valor de extracción máximo (MEV)** se refiere a los validadores que maximizan su rentabilidad al ordenar transacciones favorables. Ejemplos comunes incluyen el intercambio arbitrario en bolsas descentralizadas (p. ej., favorecerse por anticipado de una gran venta o compra) o identificar oportunidades para liquidar posiciones DeFi. Maximizar MEV requiere sofisticados conocimientos técnicos y software personalizado adjuntado a validadores normales, aumentando las probabilidades de que los operadores institucionales superen a validadores individuales y aficionados en extracciones MEV. Esto significa que la rentabilidad de las participaciones probablemente sea más alta con operadores centralizados, creando una fuerza centralizadora que disuade las participaciones domésticas.

PBS soluciona este problema, ya que reconfigura la economía de MEV. En lugar de que el proponente de bloques haga su propia búsqueda de MEV, simplemente tomará un bloque de todos los que ofrecen los constructores de bloques. Puede que los constructores de bloques hayan realizado una extracción sofisticada de MEV, pero la recompensa va al proponente del bloque. Esto significa que incluso cuando un grupo pequeño de constructores de bloques especializados domina la extracción de MEV, la recompensa irá a cualquier validador en la red, incluyendo participaciones individuales domésticas.

<ExpandableCard title="¿Por qué está bien centralizar la construcción de bloques?" eventCategory="/roadmap/pbs" eventName="clicked why is it OK to centralize block building?">

Los individuos pueden recibir incentivos a participar en agrupaciones en vez de hacerlo en solitario, debido a las sugerentes recompensas ofrecidas por las estrategias sofisticadas de MEV. Separar la construcción y la propuesta de bloques, significa que los MEV extraídos serán distribuidos a más validadores en lugar de que sean centralizados con los buscadores más efectivos de MEV. Al mismo tiempo, permitir la existencia de constructores de bloques especializados alivia el peso de la construcción de bloques de los individuos y evita que estos roben MEV, al tiempo que maximiza el número de validadores independientes e individuales que pueden verificar la fiabilidad de los bloques. El concepto importante es «asimetría de probador-verificador» que se refiere a la idea de que la producción centralizada de bloques está bien, siempre y cuando haya una red descentralizada, masiva y robusta de validadores que puedan verificar que los bloques son honestos. La descentralización es un medio, no un objetivo final; lo que queremos son bloques honestos.
</ExpandableCard>

## PBS y Danksarding {#pbs-and-danksharding}

Danksharding es la manera en que Ethereum alcanzará >100.000 transacciones por segundo y minimizará las comisiones por usuarios acumulados. Se basa en PBS porque agrega a la carga de trabajo de los constructores de bloques, quienes tendrán que calcular pruebas de datos acumulados de hasta 64 MB en menos de 1 segundo. Esto probablemente requiera constructores especializados que puedan destinar una cantidad considerable de hardware a la tarea. De cualquier forma, en la situación actual, la construcción de bloques podría centralizarse cada vez más alrededor de operadores más sofisticados y poderosos por la extracción de MEV. La separación de proponente-constructor es la forma en que puede englobar esta realidad y evitar que ejerza una fuerza centralizadora sobre la validación de bloques (la parte importante) o la distribución de recompensas apostadas. Un gran beneficio secundario es que los constructores de bloques especializados también están dispuestos y son capaces de registrar las pruebas de datos necesarias para Danksharding.

## Progreso actual {#current-progress}

PBS está en una fase avanzada de investigación, pero aún hay algunas cuestiones importantes de diseños por resolver antes de presentarlas como prototipo a los clientes de Ethereum. Todavía no hay una especificación terminada. Esto significa que PBS está a un año de distancia o más. Revise la última actualización en el [estado de investigación](https://notes.ethereum.org/@vbuterin/pbs_censorship_resistance).

## Más información {#further-reading}

- [Estado de la investigación: resistencia a la censura bajo PBS](https://notes.ethereum.org/@vbuterin/pbs_censorship_resistance)
- [Diseños de mercado con tarifas de PBS interesantes](https://ethresear.ch/t/proposer-block-builder-separation-friendly-fee-market-designs/9725)
- [PSB y resistencia a la censura](https://notes.ethereum.org/@fradamt/H1TsYRfJc#Secondary-auctions)
- [Listas de inclusión](https://notes.ethereum.org/@fradamt/H1ZqdtrBF)
