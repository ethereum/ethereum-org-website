---
title: Staking en conjunto
description: Conozca más a fondo las reservas de participación
lang: es
template: staking
emoji: ":money_with_wings:"
image: /images/staking/leslie-pool.png
alt: Leslie, el rinoceronte, nadando en la piscina.
sidebarDepth: 2
summaryPoints:
  - Participe y gane recompensas con cualquier cantidad de ETH uniendo fuerzas con otros
  - Ahórrese la parte difícil y confíe el funcionamiento del validador a un tercero
  - Almacene tókenes de participación en su propia cartera
---

## ¿Qué son las participaciones agrupadas? {#what-are-staking-pools}

Las participaciones agrupadas son un enfoque colaborativo que permite a muchas personas con pequeñas cantidades de ETH obtener los 32 ETH necesarios para activar un conjunto de claves de validación. El protocolo no permite por defecto la funcionalidad de agrupación, por lo que se han creado soluciones por separado para satisfacer esta necesidad.

Algunas reservas operan utilizando contratos inteligentes, estos permiten depositar fondos en un contrato, que gestiona y rastrea su participación de forma fiable, y se emite un token que representa este valor. Puede que otras reservas no incluyan los contratos inteligentes y en su lugar se medien fuera de la red.

## ¿Por qué debería participar en una agrupación? {#why-stake-with-a-pool}

Además de los beneficios que describimos en nuestra [introducción al staking](/staking/), hacer staking a través de un pool ofrece una serie de ventajas específicas.

<CardGrid>
  <Card title="Baja barrera de entrada" emoji="🐟" description="¿No eres una ballena? No hay problema. La mayoría de los pools de staking te permiten stakear casi cualquier cantidad de ETH al unir fuerzas con otros stakers, a diferencia del staking en solitario, que requiere 32 ETH." />
  <Card title="Stakea hoy" emoji=":stopwatch:" description="Hacer staking con un pool es tan fácil como un intercambio de tokens. No tienes que preocuparte por la configuración del hardware ni por el mantenimiento de los nodos. Los pools te permiten depositar tu ETH, lo que permite a los operadores de nodos ejecutar validadores. Las recompensas se distribuyen entre los contribuyentes, restando una comisión por las operaciones de los nodos." />
  <Card title="Tokens de staking" emoji=":droplet:" description="Muchos pools de staking proporcionan un token que representa un derecho sobre tu ETH en staking y las recompensas que genera. Esto te permite utilizar tu ETH en staking, por ejemplo, como garantía en aplicaciones DeFi." />
</CardGrid>

<StakingComparison page="pools" />

## Qué tener en cuenta {#what-to-consider}

El protocolo de ETH no admite de forma original las participaciones agrupadas o delegadas, pero dada la demanda de los usuarios de apostar menos de 32 ETH, se ha creado un número creciente de soluciones para satisfacer esta demanda.

Cada reserva y las herramientas o contratos inteligentes que utilizan los han construido diferentes equipos, por eso cada uno conlleva sus propios riesgos y beneficios. Las reservas permiten a los usuarios cambiar sus ETH por tókenes que representan los ETH apostados. El token es útil, pues permite a los usuarios intercambiar cualquier cantidad de ETH a una cantidad equivalente a un token que genera rendimiento a partir de las recompensas de participación aplicadas al ETH apostado subyacente (y viceversa) en intercambios descentralizados, aunque el ETH actual permanezca apostado en la capa de consenso. Esto implica que cambiar de ida y vuelta un ETH apostado que genera rendimiento y un «ETH bruto» es rápido, fácil y no solo disponible en múltiplos de 32 ETH.

Sin embargo, estos tókenes-ETH apostados tienden a generar conductas similares a un cártel en el que una gran cantidad de ETH apostados terminan en manos de unas pocas organizaciones centralizadas, en lugar de distribuirse entre muchos individuos independientes. Esto crea condiciones para la censura o la extracción de valor. La regla de oro para participar siempre debería ser que las personas ejecuten validadores en su propio hardware siempre que sea posible.

[Más información sobre los riesgos de hacer staking con tokens](https://notes.ethereum.org/@djrtwo/risks-of-lsd).

Los indicadores de atributos se utilizan a continuación para señalar los puntos fuertes o débiles que puede tener una agrupación de participaciones de la lista. Utilice esta sección como referencia para saber cómo definimos estos atributos mientras elige un grupo al que unirse.

<StakingConsiderations page="pools" />

## Explorar pools de staking {#explore-staking-pools}

Existe una gran variedad de opciones disponibles para ayudarle con su configuración. Utilice los indicadores anteriores para guiarse a través de las herramientas siguientes.

<ProductDisclaimer />

<StakingProductsCardGrid category="pools" />

Tenga en cuenta la importancia de elegir un servicio que tome en serio la [diversidad de clientes](/developers/docs/nodes-and-clients/client-diversity/), ya que esto mejora la seguridad de la red y limita su riesgo. Los servicios que tienen constatación de limitar el uso de cliente mayoritario están señalados con <em style={{ textTransform: "uppercase" }}>"diversidad de cliente de ejecución"</em> y <em style={{ textTransform: "uppercase" }}>"diversidad de cliente de consenso".</em>

¿Tiene alguna sugerencia para una herramienta de participación no cubierta? Consulte nuestra [política de listado de productos](/contributing/adding-staking-products/) para ver si sería adecuado, y para enviarlo para su revisión.

## Preguntas frecuentes {#faq}

<ExpandableCard title="¿Cómo gano recompensas?">
Por lo general, los tókenes de participación ERC-20 se emiten a los participantes y representan el valor de sus ETH apostados y las recompensas. Tenga en cuenta que las diferentes reservas repartirán las recompensas de las participaciones entre sus usuarios a través de métodos ligeramente diferentes, pero siempre se reparten.
</ExpandableCard>

<ExpandableCard title="¿Cuándo puedo retirar mi stake?">
¡En cualquier momento! La actualización de red Shanghai/Capella se produjo en abril de 2023 e introdujo las retiradas de participaciones. Después de esta actualización, las cuentas de validador que respaldan las reservas de participación tendrán la posibilidad de salir y retirar ETH a su dirección de retirada designada. Esto permitirá la capacidad de canjear su parte de participación por el ETH subyacente. Compruebe con su proveedor la compatibilidad con esta funcionalidad.

Alternativamente, los grupos que usan tókenes de participación ERC-20, permiten a los usuarios operar dicho token en el libre mercado, pudiendo vender la posición en participación, «retirándola» de forma eficaz sin tener que eliminar ETH del contrato de participación.

<ButtonLink href="/staking/withdrawals/">
Más sobre retiros de staking
</ButtonLink>

</ExpandableCard>

<ExpandableCard title="¿Es diferente de hacer staking con mi exchange?">
Existen muchas similitudes entre estas opciones de staking en pool y los exchanges centralizados, como la posibilidad de hacer staking con pequeñas cantidades de ETH y agruparlos para activar validadores.

A diferencia de los intercambios centralizados, muchas otras opciones de participación agrupadas utilizan contratos inteligentes y/o tókenes de participación, que son usualmente tókenes ERC-20 que pueden permanecer en la cartera, y comprarse o venderse como cualquier otro token. Esto ofrece una capa de soberanía y seguridad al darle el control sobre sus tókenes, pero no le da el control directo sobre el cliente validador que certifica en su nombre en segundo plano.

Algunas opciones de agrupamiento están más descentralizadas que otras cuando se trata de los nodos que las respaldan. Para promover la salud y la descentralización de la red, siempre se anima a los participantes a seleccionar un servicio de agrupación que permita un conjunto descentralizado de operadores de nodos sin permisos.
</ExpandableCard>

## Lecturas adicionales {#further-reading}

- [El Directorio de Staking de Ethereum](https://www.staking.directory/) - _Eridian y Spacesider_
- [Staking con Rocket Pool - Descripción general de staking](https://docs.rocketpool.net/guides/staking/overview.html) - _RocketPool docs_
- [Staking de Ethereum con Lido](https://help.lido.fi/en/collections/2947324-staking-ethereum-with-lido) - _Lido help docs_
