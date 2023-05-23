---
title: Participación agrupada
description: Una visión general de cómo empezar con la participación agrupada de ETH
lang: es
template: staking
emoji: ":money_with_wings:"
image: ../../../../../assets/staking/leslie-pool.png
alt: Leslie, el rinoceronte, nadando en la piscina.
sidebarDepth: 2
summaryPoints:
  - Participe y gane recompensas con cualquier cantidad de ETH uniendo fuerzas con otros
  - Ahórrese la parte difícil y confíe el funcionamiento del validador a un tercero
  - Conserve los tókenes de liquidez en su propia cartera
---

## ¿Qué son las participaciones agrupadas? {#what-are-staking-pools}

Las participaciones agrupadas son un enfoque colaborativo que permite a muchas personas con pequeñas cantidades de ETH obtener los 32 ETH necesarios para activar un conjunto de claves de validación. El protocolo no permite por defecto la funcionalidad de agrupación, por lo que se han creado soluciones por separado para satisfacer esta necesidad.

Algunas agrupaciones operan utilizando contratos inteligentes, estos permiten depositar fondos en un contrato, que gestiona y rastrea su participación de forma fiable, y se emite un token que representa este valor. Puede que otras agrupaciones no comprendan contratos inteligentes y en su lugar se medien fuera de la red.

## ¿Por qué debería participar en una agrupación? {#why-stake-with-a-pool}

Además de las ventajas que hemos descrito en nuestra [introducción a las participaciones](/staking/), participar en una agrupación supone una serie de ventajas distintas.

<CardGrid>
  <Card title="Barrera baja de entrada" emoji="🐟">
    ¿No es ballena? No pasa nada. La mayoría de las agrupaciones de participaciones le permiten apostar prácticamente cualquier cantidad de ETH uniendo fuerzas con otros participantes, a diferencia de una participación en solitario, que se requiere 32 ETH.
  </Card>
  <Card title="Participe hoy" emoji=":stopwatch:">
    Participar en una agrupación es tan fácil como intercambiar tókenes. No es necesario preocuparse por la configuración del hardware ni por el mantenimiento del nodo. Las agrupaciones le permiten depositar su ETH y capacitar a los operadores de nodos a ejecutar validadores. Las recompensas se reparten entre los colaboradores menos una comisión por las operaciones del nodo.
  </Card>
  <Card title="Token de liquidez" emoji=":droplet:">
    Muchas agrupaciones de participación proporcionan un token que representa un derecho sobre su ETH apostado y las recompensas que genera. Esto le permite hacer uso de su ETH apostado, por ejemplo, como garantía en aplicaciones DeFi.
  </Card>
</CardGrid>

<StakingComparison page="pools" />

## Qué hay que tener en cuenta {#what-to-consider}

El protocolo de ETH no admite de forma original las participaciones agrupadas o delegadas, pero dada la demanda de los usuarios de apostar menos de 32 ETH, se ha creado un número creciente de soluciones para satisfacer esta demanda.

Cada reserva y las herramientas o contratos inteligentes que utilizan los han construido diferentes equipos, por eso cada uno conlleva sus propios riesgos y beneficios. Las reservas permiten a los usuarios cambiar sus ETH por tókenes que representan los ETH apostados. El token es conocido como un «derivado líquido de participación»; esto es útil porque permite a los usuarios intercambiar cualquier cantidad de ETH por una cantidad equivalente de un token que genera un rendimiento, por los de las recomensas de la participación y del subyacente ETH apostado (y viceversa) en servicios de intercambio descentralizado, aunque el ETH actual se quede apostado en la cadena de baliza. Esto implica que cambiar de ida y vuelta un ETH apostado que genera rendimiento y un «ETH bruto» es rápido, fácil y no solo disponible en múltiplos de 32 ETH.

Sin embargo, estos derivados líquidos de participación tienden a crear comportamientos parecidos a un cártel en el que una gran cantidad de ETH apostados terminan bajo el control de unas pocas organizaciones centralizadas, en lugar de extenderse entre muchas personas independientes. Esto crea condiciones para la censura o la extracción de valor. La regla de oro para participar siempre debería ser que las personas ejecuten validadores en su propio hardware siempre que sea posible.

[Más información sobre los riesgos de la participación de tókenes](https://notes.ethereum.org/@djrtwo/risks-of-lsd).

Los indicadores de atributos se utilizan a continuación para señalar los puntos fuertes o débiles que puede tener una agrupación de participaciones de la lista. Utilice esta sección como referencia para saber cómo definimos estos atributos mientras elige un grupo al que unirse.

<StakingConsiderations page="pools" />

## Explore las participaciones agrupadas {#explore-staking-pools}

Existe una gran variedad de opciones disponibles para ayudarle con su configuración. Utilice los indicadores anteriores para guiarse a través de las herramientas siguientes.

<InfoBanner emoji="⚠️" isWarning>
Es importante elegir un servicio que se tome en serio la <a href="/developers/docs/nodes-and-clients/client-diversity/">diversidad de clientes</a>, ya que mejora la seguridad de la red y limita el riesgo. Aquellos servicios que demuestren limitar el uso de clientes mayoritarios están marcados como <em style="text-transform: uppercase;">" clientes diversos."</em>
</InfoBanner>

<StakingProductsCardGrid category="pools" />

¿Tiene alguna sugerencia sobre una herramienta de participación que hayamos pasado por alto? Revise nuestra [política de lista de productos](/contributing/adding-staking-products/) para ver si le parece una buena opción y enviarla para su revisión.

## Preguntas más frecuentes {#faq}

<ExpandableCard title="¿Cómo puedo ganar recompensas?">
Normalmente se emiten tókenes de liquidez ERC-20 a los participantes que representan el valor de su ETH apostado más las recompensas. Tenga en cuenta que las diferentes agrupaciones repartirán las recompensas de las participaciones entre sus usuarios a través de métodos ligeramente diferentes, pero siempre se reparten.
</ExpandableCard>

<ExpandableCard title="¿Cuándo puedo retirar mi participación?">
¡En cualquier momento! La actualización de red Shanghai/Capella se produjo en abril de 2023 e introdujo las retiradas de participaciones. Después de esta actualización, las cuentas de validador que respaldan las reservas de participación tendrán la posibilidad de salir y retirar ETH a su dirección de retirada designada. Esto permitirá la capacidad de canjear su parte de participación por el ETH subyacente. Compruebe con su proveedor la compatibilidad con esta funcionalidad.

Por otro lado, los grupos que utilizan un token de liquidez ERC-20 permiten a los usuarios comerciar con este token en el mercado abierto, lo que le permite vender su posición de apuesta, «retirándose» de forma efectiva sin eliminar realmente ETH del contrato de participación.

<ButtonLink to="/staking/withdrawals/">Más sobre retiradas de participaciones</ButtonLink>
</ExpandableCard>

<ExpandableCard title="¿Es esto diferente a participar con mi intercambio?">
Hay muchas semejanzas entre estas opciones de participación agrupada y los intercambios centralizados, como la posibilidad de apostar pequeñas cantidades de ETH y tenerlas juntas para activar validadores.

A diferencia de los intercambios centralizados, muchas otras opciones de apuestas combinadas utilizan contratos inteligentes y/o tókenes de liquidez, que suelen ser tókenes ERC-20 que pueden mantenerse en su propia cartera, y comprarse o venderse como cualquier otro token. Esto ofrece una capa de soberanía y seguridad al darle el control sobre sus tókenes, pero no le da el control directo sobre el cliente validador que certifica en su nombre en segundo plano.

Algunas opciones de agrupamiento están más descentralizadas que otras cuando se trata de los nodos que las respaldan. Para promover la salud y la descentralización de la red, siempre se anima a los participantes a seleccionar un servicio de agrupación que permita un conjunto descentralizado de operadores de nodos sin permisos.
</ExpandableCard>

## Para profundizar sobre el tema {#further-reading}

- [Participaciones con RocketPool: visión general de las participaciones](https://docs.rocketpool.net/guides/staking/overview.html) - _Documentos de RocketPool_
- [Participaciones Ethereum con Lido](https://help.lido.fi/en/collections/2947324-staking-ethereum-with-lido) - _Documentos de ayuda de Lido_
