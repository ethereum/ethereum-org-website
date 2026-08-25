---
title: Staking líquido y conjunto
description: Una descripción general del staking líquido y conjunto en Ethereum
lang: es
template: staking
image: /images/staking/leslie-pool.png
sidebarDepth: 2
summaryPoints:
  - Haz staking y gana recompensas con cualquier cantidad de ETH uniendo fuerzas con otros
  - Sáltate la parte difícil y confía la operación del validador a un tercero
  - Mantén tokens de staking líquido en tu propia billetera
---

## ¿Qué son los pools de staking? {#what-are-staking-pools}

Los pools de staking son un enfoque colaborativo para permitir que muchas personas con cantidades más pequeñas de ETH obtengan el mínimo de 32 ETH requerido para activar un validador en [Ethereum](/). La funcionalidad de agrupación no es compatible de forma nativa dentro del protocolo, por lo que se crearon soluciones por separado para abordar la necesidad de participar con cantidades más pequeñas.

Algunos pools de staking operan utilizando contratos inteligentes, donde los fondos se depositan en un contrato que administra y rastrea tu participación, y te emite un token de recibo (token de staking líquido) que representa este valor. Otros pools pueden no involucrar contratos inteligentes y, en su lugar, están mediados fuera de la cadena.

Las opciones conjuntas difieren enormemente en cuánto puedes verificar sobre ellas. Los pools transparentes y gobernados por protocolos son contratos inteligentes de código abierto en Ethereum que mantienen depósitos, publican sus conjuntos de operadores de nodos y emiten un token canjeable; todo lo que respalda tu posición es visible en cadena. Los productos conjuntos opacos, como algunos programas de rendimiento de intercambios centralizados, toman tu ETH en custodia y no puedes verificar de forma independiente qué se ha depositado en garantía en tu nombre, si es que hay algo. La mayor parte de esta página cubre el primer tipo; consulta los [productos conjuntos opacos](#opaque-pooled-products) para saber cómo notar la diferencia.

Cada opción conjunta resuelve el problema real de acceso de hacer staking con menos de 32 ETH, o sin ejecutar hardware. Pero cada una también pone un intermediario entre el participante y el protocolo principal de Ethereum. Solo el [staking en solitario](/staking/solo/) te brinda una relación directa y sin intermediarios con Ethereum.

## ¿Por qué hacer staking con un pool? {#why-stake-with-a-pool}

Además de los beneficios de [participar en el staking](/staking/), hacer staking con un pool conlleva una serie de beneficios únicos.

<Grid>
  <Card title="Baja barrera de entrada" icon={<Fish />} description="¿No eres una ballena? No hay problema. La mayoría de los pools de staking te permiten hacer staking de prácticamente cualquier cantidad de ETH uniendo fuerzas con otros participantes, a diferencia del staking en solitario que requiere 32 ETH." />
  <Card title="Haz staking hoy" icon={<Clock />} description="Hacer staking con un pool es tan fácil como un intercambio de tokens. No hay necesidad de preocuparse por la configuración del hardware y el mantenimiento del nodo. Los pools te permiten depositar tu ETH, lo que permite a los operadores de nodos ejecutar validadores. Luego, las recompensas se distribuyen a los contribuyentes menos una tarifa por las operaciones del nodo." />
  <Card title="Tokens de staking líquido" icon={<Droplets />} description="Muchos pools de staking proporcionan un token que representa un reclamo sobre tu ETH en staking y las recompensas que genera. Esto te permite hacer uso de tu ETH en staking, por ejemplo, como colateral en aplicaciones DeFi." />
</Grid>

## Comparación de opciones de staking {#comparison-of-staking-options}

<StakingComparison page="pools" />

## Tokens de staking líquido {#liquid-staking-tokens}

La mayoría de los pools de staking transparentes emiten un **token de staking líquido (LST)**, un token ERC-20 que representa un reclamo sobre el ETH en staking y las recompensas que gana. Cuando depositas ETH, el protocolo hace staking con sus operadores de nodos y acuña un token de recibo (LST) en tu billetera. Puedes mantener el token tú mismo o custodiarlo con un proveedor externo, y puedes transferir o vender el token en cualquier momento. El ETH subyacente permanece en staking en la capa de consenso. Los protocolos de staking líquido representan alrededor de un tercio de todo el ETH en staking, lo que hace que los LST sean una de las formas más comunes de hacer staking en la actualidad.

### Cómo aparecen las recompensas en el token {#how-rewards-show-up-in-the-token}

Los LST reflejan las recompensas de staking de una de dos maneras:

- **Tokens de reajuste** (como el stETH de Lido): el saldo de tu token aumenta a medida que se acumulan las recompensas, por lo que un token se mantiene aproximadamente igual en valor a un ETH.
- **Tokens de tipo de cambio** (como el rETH de Rocket Pool): el saldo de tu token se mantiene igual, pero cada token se vuelve canjeable por una cantidad creciente de ETH con el tiempo.

Ambos diseños entregan recompensas netas de la tarifa del protocolo de staking. Ninguno es inherentemente mejor, pero se comportan de manera diferente en billeteras y aplicaciones DeFi, y se tratan de manera diferente para fines fiscales en algunas jurisdicciones. Los tokens de reajuste a menudo tienen versiones "envueltas" sin reajuste para compatibilidad con aplicaciones [DeFi](/glossary/#defi).

### Canje e intercambio {#redeeming-and-trading}

Hay dos formas de salir de una posición de LST:

- **Canjear a través del protocolo** por el ETH subyacente. El canje depende de que el protocolo tenga liquidez disponible, ya sea un búfer de ETH sin staking o validadores que salen a través de la cola de salida de la capa de consenso, lo que puede llevar tiempo.
- **Vender en mercados secundarios** en cualquier momento. Debido a que el token se negocia libremente, su precio de mercado puede desviarse del valor del ETH que lo respalda, particularmente durante períodos de estrés en el mercado.

Desde la actualización Pectra, los [retiros activados por la capa de ejecución (EIP-7002)](https://eips.ethereum.org/EIPS/eip-7002) permiten que las salidas de los validadores se activen directamente desde la capa de ejecución por el titular de la dirección de retiro. Los protocolos de staking pueden usar esta función para garantizar que sus validadores puedan salir sin depender de la cooperación de los operadores de nodos, por lo que los canjes dependen menos de confiar en los operadores de nodos que antes.

### Mantener un LST no es lo mismo que hacer staking {#holding-an-lst-is-not-the-same-as-staking}

El protocolo Ethereum paga recompensas a los validadores; no sabe que tu token existe. Cuando mantienes un LST, no eres un participante desde el punto de vista del protocolo. En cambio, mantienes un reclamo sobre un servicio o contrato inteligente que hace staking en tu nombre. Esto funciona bien en condiciones normales, pero conlleva dependencias de confianza adicionales. Tu ETH en staking depende de que los contratos, la gobernanza y los operadores del pool funcionen correctamente, no solo del propio Ethereum.

## Riesgos de los tokens de staking líquido {#risks-of-liquid-staking-tokens}

Los LST heredan los riesgos subyacentes del staking (como el recorte y las penalizaciones por tiempo de inactividad en los validadores del pool) y agregan sus propias capas:

- **Riesgo de contrato inteligente**: tu ETH está en manos de contratos que podrían contener errores o ser explotados. Favorece los protocolos con código de fuente abierta, auditado y probado en batalla.
- **Riesgo de mercado y liquidez**: el precio del mercado secundario del token puede caer por debajo del valor del ETH que lo respalda ("pérdida de paridad"). Si los canjes del protocolo son lentos o están congestionados cuando deseas salir, vender con descuento puede ser tu única salida rápida.
- **Riesgo de gobernanza y actualización**: las tarifas, los conjuntos de operadores de nodos e incluso cómo funciona el token se pueden cambiar a través de la gobernanza del protocolo y las actualizaciones de contratos. Como titular de un token, normalmente no tienes voto en esa gobernanza.
- **Centralización del conjunto de operadores**: algunos pools concentran la participación con sus operadores de nodos elegidos. Grandes cantidades de ETH en staking bajo el control de unas pocas organizaciones crean condiciones para la censura, la extracción de valor y puntos únicos de falla. Prefiere pools con conjuntos de operadores distribuidos y sin permisos.
- **Transferencia de recortes**: si los validadores del pool sufren un recorte o son penalizados, la pérdida generalmente se socializa entre todos los titulares de tokens de acuerdo con las reglas del protocolo.

<Alert variant="update">
<AlertIcon size="xl"><Split /></AlertIcon>
<AlertContent>
<AlertDescription>
Muchos pools reducen el riesgo del operador utilizando la **tecnología de validador distribuido (DVT)**, un middleware que divide la clave de un validador en múltiples máquinas y operadores para que ninguna falla o compromiso individual derribe al validador. [Más sobre la tecnología de validador distribuido](/staking/dvt/)
</AlertDescription>
</AlertContent>
</Alert>

## Productos conjuntos opacos {#opaque-pooled-products}

No todo lo que se comercializa como "staking" es staking de protocolo. Los programas de "ganancias" o "recompensas" de intercambios centralizados, y algunos productos de rendimiento creados sobre tokens de staking, agrupan el ETH de los clientes de formas que no puedes inspeccionar:

- **Custodia**: el proveedor posee las claves de retiro y el ETH.
- **Los términos pueden cambiar**: las tasas, los bloqueos y la elegibilidad se establecen por la política de la empresa y se pueden revisar en cualquier momento, a diferencia de las reglas aplicadas por los contratos en cadena.
- **Puede que no sea staking en absoluto**: internamente, el rendimiento puede provenir de préstamos, operaciones comerciales u otras actividades en lugar de validadores. Por lo general, no tienes forma de verificarlo.
- **Riesgo de contraparte**: si el proveedor se vuelve insolvente o congela los retiros, no hay nada en cadena que puedas canjear.

Para distinguir un pool transparente de un producto opaco, pregúntate:

1. ¿Puedes verificar en cadena a dónde va tu ETH, en contratos de código abierto y auditados?
2. ¿Está publicado el conjunto de operadores de nodos?
3. ¿Recibes un token guardado en tu propia billetera que es canjeable por el ETH subyacente?
4. ¿Las reglas se aplican mediante contratos inteligentes y gobernanza pública, o mediante los términos de servicio de una empresa?

Cuantas más de estas preguntas un proveedor solo pueda responder con "confía en nosotros", más opaco será el producto.

<Alert variant="warning">
<AlertIcon size="lg"><TriangleAlert /></AlertIcon>
<AlertContent>
<AlertDescription>
Algunos productos anuncian un rendimiento "mejorado" o "potenciado" al combinar el staking con el **restaking**, un caso de uso para los LST que compromete el ETH en staking para asegurar protocolos adicionales bajo condiciones de recorte adicionales. El restaking es una categoría de riesgo separada y una aplicación novedosa construida sobre los LST, no una forma de participación directa en el staking. Si una cifra de rendimiento es significativamente más alta que la tasa de staking de la red principal, debes preguntar exactamente de dónde proviene el rendimiento adicional. [¿Qué es el restaking?](/restaking/)
</AlertDescription>
</AlertContent>
</Alert>

## Ejecutar un nodo para un pool {#run-a-node-for-a-pool}

Convertirse en un operador de nodo vinculado para un pool de staking es un camino intermedio entre mantener un token y el staking en solitario. Algunos protocolos de staking permiten a las personas ejecutar validadores utilizando ETH conjunto de otros usuarios. Publicas una fianza de tu propio ETH como colateral, ejecutas el hardware y las claves, y ganas una comisión sobre la participación que se te asigna.

Por ejemplo, los validadores de megapool de Rocket Pool requieren una fianza de 4 ETH por validador, y el Módulo de Staking Comunitario de Lido requiere alrededor de 2.4 ETH para una primera clave de validador (1.5 ETH para Participantes Comunitarios Identificados). Esto ofrece a las personas con menos de 32 ETH una forma de ejecutar su propio hardware y fortalecer el conjunto de operadores de la red, al tiempo que aceptan las reglas, los requisitos de rendimiento y las condiciones de penalización del pool.

## Qué considerar {#what-to-consider}

Cada pool y las herramientas o contratos inteligentes que utilizan han sido creados por diferentes equipos, y cada uno conlleva beneficios y riesgos. El staking conjunto o delegado no es compatible de forma nativa con el protocolo Ethereum, y el estándar de oro para el staking siempre debe ser que las personas ejecuten validadores en su propio hardware siempre que sea posible.

Los indicadores de atributos se utilizan a continuación para señalar las fortalezas o debilidades notables que puede tener un pool de staking listado. Usa esta sección como referencia sobre cómo definimos estos atributos mientras eliges un pool al que unirte.

<StakingConsiderations page="pools" />

## Explorar pools de staking {#explore-staking-pools}

Hay una variedad de opciones disponibles para ayudarte con tu configuración. Usa los indicadores anteriores para guiarte a través de las herramientas a continuación.

<ProductDisclaimer />

<StakingProductsCardGrid category="pools" />

Ten en cuenta la importancia de elegir un servicio que se tome en serio la [diversidad de clientes](/developers/docs/nodes-and-clients/client-diversity/), ya que mejora la seguridad de la red y limita tu riesgo. Los servicios que tienen evidencia de limitar el uso mayoritario de clientes se indican con <em style={{ textTransform: "uppercase" }}>"diversidad de clientes de ejecución"</em> y <em style={{ textTransform: "uppercase" }}>"diversidad de clientes de consenso".</em>

¿Tienes una sugerencia para una herramienta de staking que nos perdimos? Consulta nuestra [política de listado de productos](/contributing/adding-staking-products/) para ver si encajaría bien y para enviarla a revisión.

<StakingCommunityCallout className="my-16" />

## Preguntas frecuentes {#faq}

<ExpandableCard title="¿Cómo gano recompensas?">
Por lo general, los tokens de staking líquido ERC-20 se emiten a los participantes y representan el valor de su ETH en staking más las recompensas. Las recompensas te llegan de una de dos maneras dependiendo del diseño del token: los tokens de reajuste aumentan el saldo de tu token a medida que se acumulan las recompensas, mientras que los tokens de tipo de cambio mantienen tu saldo fijo y se vuelven canjeables por más ETH con el tiempo. De cualquier manera, las recompensas se distribuyen netas de la tarifa del pool.
</ExpandableCard>

<ExpandableCard title="¿Cuándo puedo retirar mi participación?">
Los retiros de staking se han habilitado desde la actualización Shanghái/Capella en abril de 2023. Las cuentas de validadores que respaldan los pools de staking pueden salir y retirar ETH a su dirección de retiro designada, lo que te permite canjear tu porción de participación por el ETH subyacente. La velocidad de canje depende de la liquidez disponible de tu pool y de la cola de salida de la capa de consenso. Consulta con tu proveedor para ver cómo admiten esta funcionalidad.

Desde la actualización Pectra, los pools también pueden usar retiros activados por la capa de ejecución (EIP-7002) para sacar validadores directamente desde la dirección de retiro, sin depender de las claves de firma de los operadores de nodos, lo que reduce la confianza requerida para que se cumplan los canjes.

Alternativamente, los pools que utilizan un token de staking líquido ERC-20 permiten a los usuarios intercambiar este token en el mercado abierto, lo que te permite vender tu posición de staking, "retirando" efectivamente sin eliminar realmente el ETH del contrato de staking. Ten en cuenta que el precio de mercado puede diferir del valor de canje del token.

<ButtonLink href="/staking/withdrawals/">Más sobre los retiros de staking</ButtonLink>
</ExpandableCard>

<ExpandableCard title="¿Es esto diferente de hacer staking con mi exchange?">
Existen muchas similitudes entre estas opciones de staking conjunto y los intercambios centralizados, como la capacidad de hacer staking de pequeñas cantidades de ETH y agruparlas para activar validadores.

A diferencia de los intercambios centralizados, muchas otras opciones de staking conjunto utilizan contratos inteligentes y/o tokens de staking líquido, que generalmente son tokens ERC-20 que se pueden mantener en tu propia billetera y comprar o vender como cualquier otro token. Esto ofrece una capa de soberanía y seguridad al darte control sobre tus tokens, pero aún no te da control directo sobre el cliente validador que atestigua en tu nombre en segundo plano.

Los programas de "ganancias" de los intercambios también son de custodia y se rigen por los términos de la empresa en lugar de las reglas en cadena, y su rendimiento puede no provenir del staking del protocolo en absoluto. Consulta los [productos conjuntos opacos](#opaque-pooled-products) para saber cómo notar la diferencia.

Algunas opciones de agrupación son más descentralizadas que otras en lo que respecta a los nodos que las respaldan. Para promover la salud y la descentralización de la red, siempre se anima a los participantes a seleccionar un servicio de agrupación que permita un conjunto descentralizado y sin permisos de operadores de nodos.
</ExpandableCard>

## Lecturas adicionales {#further-reading}

- [El directorio de staking de Ethereum](https://www.staking.directory/) - _Eridian y Spacesider_
- [Los riesgos de los derivados de staking líquido](https://notes.ethereum.org/@djrtwo/risks-of-lsd) - _Danny Ryan_
- [¿Qué es el staking líquido?](https://chain.link/education-hub/liquid-staking) - _Chainlink_
- [EIP-7002: Retiros activables por la capa de ejecución](https://eips.ethereum.org/EIPS/eip-7002) - _Propuestas de mejora de Ethereum_
- [Calificaciones de pools de staking de Ethereum](https://explorer.rated.network/) - _Rated Network Explorer_
- [¿Cuál es la diferencia entre un token de restaking líquido (LRT) y un token de staking líquido (LST)?](https://liquidcollective.io/lst-vs-lrt/) - _Liquid Collective_