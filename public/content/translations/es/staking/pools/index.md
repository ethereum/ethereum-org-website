---
title: Staking conjunto
description: Aprenda sobre los pools de staking
lang: es
template: staking
emoji: ":money_with_wings:"
image: /images/staking/leslie-pool.png
alt: Leslie, el rinoceronte, nadando en la piscina.
sidebarDepth: 2
summaryPoints:
  - Haga staking y gane recompensas con cualquier cantidad de ETH uniendo fuerzas con otros
  - Sáltese la parte difícil y confíe la operación del validador a un tercero
  - Mantenga los tokens de staking en su propia billetera
---

## ¿Qué son los pools de staking? {#what-are-staking-pools}

Los pools de staking son un enfoque colaborativo para permitir que muchos usuarios con cantidades más pequeñas de ETH obtengan los 32 ETH requeridos para activar un conjunto de claves de validador. La funcionalidad de agrupación no es compatible de forma nativa dentro del protocolo, por lo que se crearon soluciones por separado para abordar esta necesidad.

Algunos pools operan usando contratos inteligentes, donde los fondos se pueden depositar en un contrato, que administra y rastrea su participación sin necesidad de confianza, y le emite un token que representa este valor. Otros pools pueden no involucrar contratos inteligentes y, en su lugar, están mediados fuera de la cadena.

## ¿Por qué hacer staking con un pool? {#why-stake-with-a-pool}

Además de los beneficios que describimos en nuestra [introducción al staking](/staking/), hacer staking con un pool conlleva una serie de beneficios distintos.

<Grid>
  <Card title="Baja barrera de entrada" emoji="🐟" description="¿No eres una ballena? No hay problema. La mayoría de los pools de staking te permiten hacer staking con prácticamente cualquier cantidad de ETH al unir fuerzas con otros participantes, a diferencia del staking en solitario, que requiere 32 ETH." />
  <Card title="Haz staking hoy" emoji=":stopwatch:" description="Hacer staking con un pool es tan fácil como un intercambio de tokens. No hay necesidad de preocuparse por la configuración del hardware ni por el mantenimiento del nodo. Los pools te permiten depositar tus ETH, lo que habilita a los operadores de nodos a ejecutar validadores. Luego, las recompensas se distribuyen a los contribuyentes menos una tarifa por las operaciones del nodo." />
  <Card title="Tokens de staking" emoji=":droplet:" description="Muchos pools de staking proporcionan un token que representa un derecho sobre tu ETH en staking y las recompensas que genera. Esto te permite hacer uso de tu ETH en staking, por ejemplo, como garantía en aplicaciones DeFi." />
</Grid>

<StakingComparison page="pools" />

## Qué tener en cuenta {#what-to-consider}

El staking conjunto o delegado no es compatible de forma nativa con el protocolo [Ethereum](/), pero dada la demanda de los usuarios de hacer staking con menos de 32 ETH, se ha creado un número creciente de soluciones para satisfacer esta demanda.

Cada pool y las herramientas o contratos inteligentes que utilizan han sido creados por diferentes equipos, y cada uno conlleva beneficios y riesgos. Los pools permiten a los usuarios intercambiar su ETH por un token que representa el ETH en staking. El token es útil porque permite a los usuarios intercambiar cualquier cantidad de ETH por una cantidad equivalente de un token de rendimiento que genera un retorno de las recompensas de staking aplicadas al ETH en staking subyacente (y viceversa) en intercambios descentralizados, a pesar de que el ETH real permanece en staking en la capa de consenso. Esto significa que los intercambios de ida y vuelta entre un producto de ETH en staking con rendimiento y "ETH puro" son rápidos, fáciles y no solo están disponibles en múltiplos de 32 ETH.

Sin embargo, estos tokens de ETH en staking tienden a crear comportamientos similares a los de un cártel, donde una gran cantidad de ETH en staking termina bajo el control de unas pocas organizaciones centralizadas en lugar de distribuirse entre muchos individuos independientes. Esto crea condiciones para la censura o la extracción de valor. El estándar de oro para el staking siempre debería ser que los individuos ejecuten validadores en su propio hardware siempre que sea posible.

[Más sobre los riesgos de los tokens de staking](https://notes.ethereum.org/@djrtwo/risks-of-lsd).

A continuación, se utilizan indicadores de atributos para señalar las fortalezas o debilidades notables que puede tener un pool de staking listado. Utilice esta sección como referencia sobre cómo definimos estos atributos mientras elige a qué pool unirse.

<StakingConsiderations page="pools" />

## Explorar pools de staking {#explore-staking-pools}

Hay una variedad de opciones disponibles para ayudarle con su configuración. Utilice los indicadores anteriores para guiarse a través de las herramientas a continuación.

<ProductDisclaimer />

<StakingProductsCardGrid category="pools" />

Tenga en cuenta la importancia de elegir un servicio que se tome en serio la [diversidad de clientes](/developers/docs/nodes-and-clients/client-diversity/), ya que mejora la seguridad de la red y limita su riesgo. Los servicios que tienen evidencia de limitar el uso de clientes mayoritarios se indican con <em style={{ textTransform: "uppercase" }}>"diversidad de clientes de ejecución"</em> y <em style={{ textTransform: "uppercase" }}>"diversidad de clientes de consenso".</em>

¿Tiene alguna sugerencia sobre una herramienta de staking que hayamos pasado por alto? Consulte nuestra [política de listado de productos](/contributing/adding-staking-products/) para ver si encajaría bien y enviarla para su revisión.

## Preguntas frecuentes {#faq}

<ExpandableCard title="¿Cómo gano recompensas?">
Por lo general, los tokens de staking ERC-20 se emiten a los participantes y representan el valor de su ETH en staking más las recompensas. Tenga en cuenta que los diferentes pools distribuirán las recompensas de staking a sus usuarios a través de métodos ligeramente diferentes, pero este es el tema común.
</ExpandableCard>

<ExpandableCard title="¿Cuándo puedo retirar mi participación?">
¡Ahora mismo! La actualización de la red Shanghái/Capella ocurrió en abril de 2023 e introdujo los retiros de staking. Las cuentas de validador que respaldan los pools de staking ahora tienen la capacidad de realizar una salida y retirar ETH a su dirección de retiro designada. Esto habilita la capacidad de canjear su porción de participación por el ETH subyacente. Consulte con su proveedor para ver cómo admiten esta funcionalidad.

Alternativamente, los pools que utilizan un token de staking ERC-20 permiten a los usuarios intercambiar este token en el mercado abierto, lo que le permite vender su posición de staking, "retirando" efectivamente sin eliminar realmente el ETH del contrato de staking.

<ButtonLink href="/staking/withdrawals/">Más sobre los retiros de staking</ButtonLink>
</ButtonLink>

<ExpandableCard title="¿Es esto diferente de hacer staking con mi exchange?">
Existen muchas similitudes entre estas opciones de staking conjunto y los intercambios centralizados, como la capacidad de hacer staking con pequeñas cantidades de ETH y agruparlas para activar validadores.

A diferencia de los intercambios centralizados, muchas otras opciones de staking conjunto utilizan contratos inteligentes y/o tokens de staking, que generalmente son tokens ERC-20 que se pueden mantener en su propia billetera y comprar o vender como cualquier otro token. Esto ofrece una capa de soberanía y seguridad al darle control sobre sus tokens, pero aún no le da control directo sobre el cliente de validador que da fe en su nombre en segundo plano.

Algunas opciones de agrupación son más descentralizadas que otras en lo que respecta a los nodos que las respaldan. Para promover la salud y la descentralización de la red, siempre se anima a los participantes a seleccionar un servicio de agrupación que habilite un conjunto descentralizado y sin permisos de operadores de nodos.
</ExpandableCard>

## Lecturas adicionales {#further-reading}

- [El directorio de staking de Ethereum](https://www.staking.directory/) - _Eridian y Spacesider_
- [Staking con Rocket Pool: descripción general del staking](https://docs.rocketpool.net/guides/staking/overview.html) - _Documentación de Rocket Pool_
- [Hacer staking de Ethereum con Lido](https://help.lido.fi/en/collections/2947324-staking-ethereum-with-lido) - _Documentos de ayuda de Lido_