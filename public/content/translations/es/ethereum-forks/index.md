---
title: Cronología de todos los forks de Ethereum (2014 hasta la actualidad)
description: Una historia de la cadena de bloques de Ethereum, que incluye los principales hitos, lanzamientos y bifurcaciones.
lang: es
sidebarDepth: 1
---

# Cronología de todos los forks de Ethereum (2014 hasta la actualidad) {#the-history-of-ethereum}

Una cronología que incluye todos los principales hitos, bifurcaciones y actualizaciones de la cadena de bloques de Ethereum.

<ExpandableCard title="What are forks?" contentPreview="Changes to the rules of the Ethereum protocol which often include planned technical upgrades.">

Las bifurcaciones se producen cuando es necesario realizar actualizaciones o cambios técnicos importantes en la red; suelen provenir de las [Propuestas de Mejora de Ethereum (EIP)](/eips/) y cambian las «reglas» del protocolo.

Cuando se precisan actualizaciones en un software tradicional y controlado centralmente, la empresa publica una nueva versión para el usuario final. Las cadenas de bloque funcionan de manera diferente porque no hay propiedad central. [Clientes de Ethereum](/developers/docs/nodes-and-clients/) deben actualizar su software para implementar las nuevas reglas de la bifurcación. Además de creadores de bloques (los mineros en el mundo de las pruebas de trabajo y los validadores en el universo de las pruebas de participación) y los nodos, deben crearse bloques y validarlos con respecto a las reglas nuevas. [Más sobre los mecanismos de consenso](/developers/docs/consensus-mechanisms/)

Estos cambios en las reglas pueden crear una división temporal en la red. Los bloques nuevos podrían producirse de acuerdo con las reglas nuevas o con las antiguas. Normalmente las bifurcaciones se acuerdan con antelación para que los clientes adopten los cambios a la vez. Además, de este modo las bifurcaciones actualizadas se convertirán en la cadena principal. Sin embargo, en casos excepcionales, los desacuerdos con respecto a las bifurcaciones pueden provocar que la red permanezca dividida. La más notable es la creación de Ethereum Classic con la [bifurcación DAO] (#dao-fork).

</ExpandableCard>

<ExpandableCard title="Why do some upgrades have multiple names?" contentPreview="Upgrades names follow a pattern">

El software que sustenta a Ethereum se compone de dos mitades, conocidas como la [capa de ejecución](/glossary/#execution-layer) y la [capa de consenso](/glossary/#consensus-layer).

**Nombres de actualizaciones de la ejecución**

Desde 2021, las actualizaciones de la **capa de ejecución** se nombran según las ciudades de [anteriores ubicaciones de Devcon](https://devcon.org/en/past-events/) en orden cronológico:

| Nombre de Actualización | Año de Devcon | Número de Devcon | Fecha de Actualización |
| ----------------------- | ------------- | ---------------- | ---------------------- |
| Berlin                  | 2014          | 0                | 15 de abril de 2021    |
| London                  | 2015          | I                | 5 de agosto de 2021    |
| Shanghai                | 2016          | II               | 12 de abril de 2023    |
| Cancún                  | 2017          | III              | 13 de marzo de 2024    |
| **Praga**               | 2018          | IV               | Por definir - Próxima  |
| _Osaka_                 | 2019          | V                | Por definir            |
| _Bogotá_                | 2022          | VI               | Por definir            |
| _Bangkok_               | 2024          | VII              | Por definir            |

**Nombres de las actualizaciones de consenso**

Desde el lanzamiento de la [Beacon Chain](/glossary/#beacon-chain), las actualizaciones de la **capa de consenso** se nombran por estrellas celestes comenzando con letras que avanzan en orden alfabético:

| Nombre de Actualización                                       | Fecha de Actualización  |
| ------------------------------------------------------------- | ----------------------- |
| El origen de la cadena de baliza                              | 1 de diciembre de 2020  |
| [Altair](https://en.wikipedia.org/wiki/Altair)                | 27 de octubre de 2021   |
| [Bellatrix](https://en.wikipedia.org/wiki/Bellatrix)          | 6 de septiembre de 2022 |
| [Capella](https://en.wikipedia.org/wiki/Capella)              | 12 de abril de 2023     |
| [Deneb](https://en.wikipedia.org/wiki/Deneb)                  | 13 de marzo de 2024     |
| [**Electra**](https://en.wikipedia.org/wiki/Electra_\(star\)) | Por definir - Próxima   |
| [_Fulu_](https://en.wikipedia.org/wiki/Fulu_\(star\))         | Por definir             |

**Nombres combinados**

Las actualizaciones de ejecución y consenso se implementaron inicialmente en distintos momentos, pero tras [La Fusión](/roadmap/merge/) en 2022 estas se despliegan simultáneamente. Como tal, han surgido términos coloquiales para simplificar las referencias a estas actualizaciones utilizando un único término conjunto. Esto comenzó con la actualización _Shanghai-Capella_, comúnmente llamada "**Shapella**", y continúa con las actualizaciones _Cancun-Deneb_ (**Dencun**) y _Prague-Electra_ (**Pectra**).

| Actualización de Ejecución | Actualización de Consenso | Nombre Corto |
| -------------------------- | ------------------------- | ------------ |
| Shanghai                   | Capella                   | "Shapella"   |
| Cancún                     | Deneb                     | "Dencun"     |
| Praga                      | Electra                   | "Pectra"     |
| Osaka                      | Fulu                      | "Fusaka"     |

</ExpandableCard>

Vaya directamente a la información sobre algunas de las actualizaciones pasadas especialmente importantes: [La Beacon Chain](/roadmap/beacon-chain/); [La Fusión](/roadmap/merge/); y [EIP-1559](#london)

¿Busca futuras actualizaciones del protocolo? [Conozca las próximas actualizaciones en la hoja de ruta de Ethereum](/roadmap/).

<Divider />

## 2025 {#2025}

### Praga-Electra ("Pectra") {#pectra}

<NetworkUpgradeSummary name="pectra" />

La actualización Prague-Electra ("Pectra") incluyó varias mejoras en el protocolo de Ethereum destinadas a mejorar la experiencia para todos los usuarios, redes de capa 2, participantes en staking y operadores de nodos.

El staking recibió una mejora con cuentas de validadores compuestas y un mejor control sobre los fondos en staking mediante la dirección de retiro de ejecución. El EIP-7251 aumentó el saldo efectivo máximo para un solo validador a 2048, mejorando la eficiencia de capital para los participantes en staking. El EIP-7002 permitió que una cuenta de ejecución activara de forma segura acciones del validador, incluyendo salir o retirar partes de los fondos, mejorando la experiencia para los participantes en staking de ETH y ayudando a fortalecer la responsabilidad de los operadores de nodos.

Otras partes de la actualización se centraron en mejorar la experiencia para los usuarios comunes. EIP-7702 añadió la capacidad de que una cuenta regular que no es smart contract ([EOA](/glossary/#eoa)) ejecute código similar a un smart contract. Esto desbloqueó una nueva funcionalidad ilimitada para las cuentas tradicionales de Ethereum, como el agrupamiento de transacciones, el patrocinio de gas, la autenticación alternativa, controles programables de gasto, mecanismos de recuperación de cuenta y más.

<ExpandableCard title="Pectra EIPs" contentPreview="Official improvements included in this upgrade.">

Mejor experiencia de usuario:

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7702">EIP-7702</a> - <em>Establecer código de cuenta EOA</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7691">EIP-7691</a> - <em>Aumento del rendimiento de blobs</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7623">EIP-7623</a> - <em>Aumento del costo de calldata</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7840">EIP-7840</a> - <em>Agregar programación de blobs a los archivos de configuración EL</em></li>
</ul>

Mejor experiencia de staking:

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7251">EIP-7251</a> - <em>Aumentar el <code>MAX\_EFFECTIVE\_BALANCE</code></em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7002">EIP-7002</a> - <em>Salidas activables desde la capa de ejecución</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7685">EIP-7685</a> - <em>Solicitudes de propósito general para la capa de ejecución</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-6110">EIP-6110</a> - <em>Registrar depósitos de validadores en la cadena</em></li>
</ul>

Mejoras en la eficiencia y seguridad del protocolo:

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2537">EIP-2537</a> - <em>Precompilado para operaciones de la curva BLS12-381</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2935">EIP-2935</a> - <em>Guardar hashes de bloques históricos en el estado</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7549">EIP-7549</a> - <em>Mover el índice del comité fuera de la Atestación</em></li>
</ul>

</ExpandableCard>

- [Pectra.wtf](https://pectra.wtf)
- [Cómo Pectra mejorará la experiencia de staking](https://www.kiln.fi/post/next-ethereum-upgrade-how-pectra-will-enhance-the-staking-experience)
- [Lea las especificaciones de la actualización Electra](https://github.com/ethereum/consensus-specs/blob/dev/specs/electra/)
- [Preguntas frecuentes sobre Praga-Electra ("Pectra")](/roadmap/pectra/)

<Divider />

## 2024 {#2024}

### Cancún-Deneb ("Dencun") {#dencun}

<NetworkUpgradeSummary name="dencun" />

#### Resumen de Cancún {#cancun-summary}

La actualización Cancún contiene un conjunto de mejoras en la _ejecución_ de Ethereum orientadas a mejorar la escalabilidad, junto con las actualizaciones de consenso de Deneb.

Esto incluye especialmente EIP-4844, conocido como **Proto-Danksharding**, que reduce significativamente el coste de almacenamiento de datos para los rollups de capa 2. Esto se logra a través de la introducción de "blobs" de datos que permiten que los rollups publiquen datos en la red principal por un corto período de tiempo. Esto da como resultado tarifas de transacción significativamente más bajas para los usuarios de los rollups de la capa 2.

<ExpandableCard title="Cancun EIPs" contentPreview="Official improvements included in this upgrade.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-1153">EIP-1153</a> - <em>Códigos de operación de almacenamiento transitorio</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-4788">EIP-4788</a> - <em>Raíz de bloque de Baliza en la EVM</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-4844">EIP-4844</a> - <em>Transacciones de blob fragmentado (Proto-Danksharding)</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-5656">EIP-5656</a> - <em><code>MCOPY</code> - Instrucción de copia de memoria</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-6780">EIP-6780</a> - <em><code>AUTODESTRUCTOR</code> solo en la misma transacción</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7516">EIP-7516</a> - <em><code>BLOBBASEFEE</code> código de operación</em></li>
</ul>

</ExpandableCard>

- [Rollups de capa 2](/layer-2/)
- [Proto-Danksharding](/roadmap/scaling/#proto-danksharding)
- [Danksharding](/roadmap/danksharding/)
- [Lea la especificación de la actualización Cancún](https://github.com/ethereum/execution-specs/blob/master/network-upgrades/mainnet-upgrades/cancun.md)

#### Resumen de Deneb {#deneb-summary}

La actualización Deneb contiene un conjunto de mejoras en el _consenso_ de Ethereum orientadas a mejorar la escalabilidad. Esta actualización viene junto con las actualizaciones de ejecución de Cancun para habilitar Proto-Danksharding (EIP-4844), junto con otras mejoras en la cadena de Baliza.

Los "mensajes de salida voluntaria" pregenerados y firmados ya no caducan, lo que da más control a los usuarios que realizan staking con un operador de nodo externo. Con este mensaje de salida firmado, los stakers pueden delegar la operación del nodo mientras mantienen la capacidad de salir y retirar sus fondos de forma segura en cualquier momento, sin necesidad de pedir permiso a nadie.

EIP-7514 reduce la emisión de ETH limitando la tasa de "churn" a la que los validadores pueden unirse a la red a ocho (8) por época. Dado que la emisión de ETH es proporcional al total de ETH en staking, limitar el número de validadores que se unen pone un tope al _ritmo de crecimiento_ de ETH emitido, y también reduce los requisitos de hardware para los operadores de nodos, ayudando a la descentralización.

<ExpandableCard title="Deneb EIPs" contentPreview="Official improvements included in this upgrade">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-4788">EIP-4788</a> - <em>Raíz de bloque de Baliza en la EVM</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-4844">EIP-4844</a> - <em>Transacciones de blobs de shard</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7044">EIP-7044</a> - <em>Salidas voluntarias firmadas válidas perpetuamente</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7045">EIP-7045</a> - <em>Aumentar la ranura de inclusión de atestación máxima</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7514">EIP-7514</a> - <em>Añadir límite máximo de churn de época</em></li>
</ul>

</ExpandableCard>

- [Lea las especificaciones de la actualización Deneb](https://github.com/ethereum/consensus-specs/blob/dev/specs/deneb/)
- [Preguntas frecuentes sobre Cancún-Deneb ("Dencun")](/roadmap/dencun/)

<Divider />

## 2023 {#2023}

### Shanghái-Capella ("Shapella") {#shapella}

<NetworkUpgradeSummary name="shapella" />

#### Resumen de Shanghái {#shanghai-summary}

La actualizacion de Shangai trae los retiros de staking a la capa de ejecución. Junto con la actualización Capella, habilitó los bloques para aceptar las operaciones de retirada, que permitieran a los interesados retirar sus ETH provenientes de la cadena de baliza para ejecutarlos posteriormente.

<ExpandableCard title="Shanghai EIPs" contentPreview="Official improvements included in this upgrade.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-3651">EIP-3651</a><em>: inicia el calentamiento de dirección de <code>COINBASE</code></em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-3855">EIP-3855</a>: <em>nueva instrucción<code>PUSH0</code></em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-3860">EIP-3860</a>: <em>código iniciación límite y contador </em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-4895">EIP-4895</a>: <em>notificación cadena de baliza con retiradas como operaciones</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-6049">EIP-6049</a> - <em>Deprecate <code>SELFDESTRUCT</code></em></li>
</ul>

</ExpandableCard>

- [Lea la especificación de la actualización Shanghái](https://github.com/ethereum/execution-specs/blob/master/network-upgrades/mainnet-upgrades/shanghai.md)

#### Resumen de Capella {#capella-summary}

La actualizacion Capella es la tercera actualización importante a la capa de consenso (cadena de baliza), que le permite retirar su participación. Capella se produjo de forma sincrónica a la actualización de la capa de ejecución, Shanghai, y activó la funcionalidad de retirada de participaciones.

Esta actualización de la capa de consenso aporta a los participantes que no proporcionaron credenciales de retirada en su depósito inicial la posibilidad de hacerlo ahora.

La actualizacion también proporciona la funcionalidad de barrido automático de la cuenta, la cual procesa constantemente cuentas validadoras para cualquier pago de recompensa disponible o retiradas completas.

- [Más sobre retiradas de participaciones](/staking/withdrawals/).
- [Lea las especificaciones de la actualización Capella](https://github.com/ethereum/consensus-specs/blob/dev/specs/capella/)

<Divider />

## 2022 {#2022}

### París (La Fusión) {#paris}

<NetworkUpgradeSummary name="paris" />

#### Resumen {#paris-summary}

La actualización París se activó cuando la blockchain proof-of-work superó una [dificultad total terminal](/glossary/#terminal-total-difficulty) de 58750000000000000000000. Esto ocurrió en el bloque 15537393 el 15 de septiembre de 2022, y dio comienzo a la actualización Paris en el siguiente bloque. París fue la transición de [La Fusión](/roadmap/merge/) — su característica principal fue apagar el algoritmo de minería [proof-of-work](/developers/docs/consensus-mechanisms/pow) y la lógica de consenso asociada, y activar [proof-of-stake](/developers/docs/consensus-mechanisms/pos) en su lugar. París en sí fue una actualización para los [clientes de ejecución](/developers/docs/nodes-and-clients/#execution-clients) (equivalente a Bellatrix en la capa de consenso), que les permitió recibir instrucciones de sus conectados [clientes de consenso](/developers/docs/nodes-and-clients/#consensus-clients). Esto requirió un nuevo conjunto de métodos de API internos, conocidos colectivamente como la [Engine API](https://github.com/ethereum/execution-apis/blob/main/src/engine/common.md), que debía ser activada. ¡Esta fue, sin duda, la actualización más significativa en la historia de Ethereum desde [Homestead](#homestead)!

- [Lea la especificación de la actualización París](https://github.com/ethereum/execution-specs/blob/master/network-upgrades/mainnet-upgrades/paris.md)

<ExpandableCard title="Paris EIPs" contentPreview="Official improvements included in this upgrade.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-3675">EIP-3675</a>: <em>consenso de actualización a la prueba de participación</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-4399">EIP-4399</a>: <em>suplanta código operativo DIFFICULTY por PREVRANDAO</em></li>
</ul>

</ExpandableCard>

---

### Bellatrix {#bellatrix}

<NetworkUpgradeSummary name="bellatrix" />

#### Resumen {#bellatrix-summary}

La actualización Bellatrix fue la segunda actualización programada para la [Beacon Chain](/roadmap/beacon-chain), preparando la cadena para [La Fusión](/roadmap/merge/). Incorpora penalizaciones del validador a sus valores completos por inactividad y recortes por malas conductas. Bellatrix también incluye una actualización de las reglas de elección de la bifurcación para preparar la cadena de cara a La Fusión y la transición del último bloque de prueba de trabajo al primer bloque de prueba de participación. Esto incluye hacer que los clientes de consenso conozcan la [dificultad total terminal](/glossary/#terminal-total-difficulty) de 58750000000000000000000.

- [Lea la especificación de la actualización Bellatrix](https://github.com/ethereum/consensus-specs/tree/dev/specs/bellatrix)

---

### Gray Glacier {#gray-glacier}

<NetworkUpgradeSummary name="grayGlacier" />

#### Resumen {#gray-glacier-summary}

La actualización de red Gray Glacier pospuso la [bomba de dificultad](/glossary/#difficulty-bomb) por tres meses. Este es el único cambio introducido en esta actualización, y es de naturaleza similar a las actualizaciones [Arrow Glacier](#arrow-glacier) y [Muir Glacier](#muir-glacier). Cambios similares se realizaron en las actualizaciones de red [Bizancio](#byzantium), [Constantinopla](#constantinople) y [Londres](#london).

- [EF Blog - Anuncio de actualización Gray Glacier](https://blog.ethereum.org/2022/06/16/gray-glacier-announcement/)

<ExpandableCard title="Gray Glacier EIPs" contentPreview="Official improvements included in this upgrade.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-5133">EIP-5133</a>: <em>retrasa la bomba de dificultad hasta septiembre de 2022</em></li>
</ul>

</ExpandableCard>

<Divider />

## 2021 {#2021}

### Arrow Glacier {#arrow-glacier}

<NetworkUpgradeSummary name="arrowGlacier" />

#### Resumen {#arrow-glacier-summary}

La actualización de red Arrow Glacier pospuso la [bomba de dificultad](/glossary/#difficulty-bomb) por varios meses. Este es el único cambio introducido en esta actualización, y es de naturaleza similar a la actualización [Muir Glacier](#muir-glacier). Cambios similares se realizaron en las actualizaciones de red [Bizancio](#byzantium), [Constantinopla](#constantinople) y [Londres](#london).

- [EF Blog - Anuncio de actualización Arrow Glacier](https://blog.ethereum.org/2021/11/10/arrow-glacier-announcement/)
- [Ethereum Cat Herders - Actualización Arrow Glacier de Ethereum](https://medium.com/ethereum-cat-herders/ethereum-arrow-glacier-upgrade-e8d20fa4c002)

<ExpandableCard title="Arrow Glacier EIPs" contentPreview="Official improvements included in this upgrade.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-4345">EIP-4345</a>: <em>retrasa la bomba de dificultad hasta junio de 2022</em></li>
</ul>

</ExpandableCard>

---

### Altair {#altair}

<NetworkUpgradeSummary name="altair" />

#### Resumen {#altair-summary}

La actualización Altair fue la primera actualización programada para la [Beacon Chain](/roadmap/beacon-chain). Añadió soporte para los «comités de sincronización», permitiendo clientes ligeros y un aumento de la inactividad del validador y de las penalizaciones de recorte a medida que avanzaba el desarrollo hacia La Fusión.

- [Lea la especificación de la actualización Altair](https://github.com/ethereum/consensus-specs/tree/dev/specs/altair)

#### <Emoji text=":tada:" size={1} className="me-2" />¡Dato curioso! {#altair-fun-fact}

Altair fue la primera gran actualización de red que ha tenido un periodo de implementación preciso. Cada una de las actualizaciones anteriores se habían basado en un número de bloques declarados en la cadena de prueba de trabajo, donde los tiempos de bloque varían. La cadena de baliza no requiere resolución para la prueba de trabajo y, en lugar de ello, funciona en un sistema épocas basado en el tiempo, que consiste en «ranuras» de tiempo de doce segundos durante los cuales los validadores pueden proponer bloques. Por esta razón sabíamos exactamente cuándo alcanzaríamos la época 74.240 y Altair vería la luz.

- [Tiempo de bloque](/developers/docs/blocks/#block-time)

---

### Londres {#london}

<NetworkUpgradeSummary name="london" />

#### Resumen {#london-summary}

La actualización Londres introdujo [EIP-1559](https://eips.ethereum.org/EIPS/eip-1559), que reformó el mercado de tarifas de transacción, junto con cambios en el manejo de devoluciones de gas y el calendario de la [Edad de Hielo](/glossary/#ice-age).

#### ¿Qué fue la actualización London/EIP-1559? {#eip-1559}

Antes de la actualización London, Ethereum tenía bloques de tamaño fijo. En momentos de alta demanda de la red, estos bloques operaban a capacidad total. Como resultado, los usuarios a menudo tenían que esperar que la alta demanda disminuyera para ser incluidos en un bloque, lo cual provocaba una mala experiencia de usuario. La actualización London introdujo los bloques de tamaño variable en Ethereum.

La forma en la que se calculaban las tarifas de transacción en la red Ethereum cambió con [la Actualización Londres](/ethereum-forks/#london) de agosto de 2021. Antes de la actualización Londres, las tarifas se calculaban sin separar las `base` y `priority` fees, de la siguiente manera:

Supongamos que Alice tiene que pagar a Bob 1 ETH. En la transacción, el límite de gas es de 21.000 unidades y el precio del gas es de 200 gwei.

La tarifa total habría sido: `Unidades de gas (límite) * Precio del gas por unidad`, es decir, `21,000 * 200 = 4,200,000 gwei` o 0.0042 ETH

La implementación de [EIP-1559](https://eips.ethereum.org/EIPS/eip-1559) en la Actualización Londres hizo que el mecanismo de tarifas fuera más complejo, pero permitió que las tarifas de gas sean más previsibles, resultando en un mercado de tarifas de transacción más eficiente. Los usuarios pueden enviar transacciones con un `maxFeePerGas` que corresponda a lo máximo que están dispuestos a pagar para que la transacción sea ejecutada, sabiendo que no pagarán más que el precio de mercado para el gas (`baseFeePerGas`), y recibirán cualquier exceso, menos su propina, de vuelta.

Este video explica EIP-1559 y los beneficios que trae: [EIP-1559 Explicado](https://www.youtube.com/watch?v=MGemhK9t44Q)

- [¿Es usted desarrollador de dapps? Asegúrese de actualizar sus librerías y herramientas.](https://github.com/ethereum/execution-specs/blob/master/network-upgrades/london-ecosystem-readiness.md)
- [Lea el anuncio de la Fundación Ethereum](https://blog.ethereum.org/2021/07/15/london-mainnet-announcement/)
- [Lea la explicación de Ethereum Cat Herder](https://medium.com/ethereum-cat-herders/london-upgrade-overview-8eccb0041b41)

<ExpandableCard title="London EIPs" contentPreview="Official improvements included in this upgrade.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-1559">EIP-1559</a>: <em>mejora el sector de las comisiones de las transacciones</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-3198">EIP-3198</a>: <em>devuelve el <code>BASEFEE</code> de un bloque</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-3529">EIP-3529</a>: <em>reduces reembolsos de gas para operaciones EVM</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-3541">EIP-3541</a>: <em>evita lanzar contratos que empiecen por <code>0xEF</code></em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-3554">EIP-3554</a>: <em>retrasa la Era de hielo hasta diciembre de 2021</em></li>
</ul>

</ExpandableCard>

---

### Berlín {#berlin}

<NetworkUpgradeSummary name="berlin" />

#### Resumen {#berlin-summary}

La actualización Berlin optimizó el coste del gas para ciertas acciones de EVM, y aumentó la compatibilidad con múltiples tipos de transacciones.

- [Lea el anuncio de la Fundación Ethereum](https://blog.ethereum.org/2021/03/08/ethereum-berlin-upgrade-announcement/)
- [Lea la explicación de Ethereum Cat Herder](https://medium.com/ethereum-cat-herders/the-berlin-upgrade-overview-2f7ad710eb80)

<ExpandableCard title="Berlin EIPs" contentPreview="Official improvements included in this upgrade.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2565">EIP-2565</a>: <em>reduce el gasto moderado ModExp de gas</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2718">EIP-2718</a>: <em>permite mejor soporte para múltiples tipos de transacciones</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2929">EIP-2929</a>: <em>incrementos en el coste del gas para códigos operativos de acceso a estados</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2930">EIP-2930</a>: <em>añade listas de acceso opcionales</em></li>
</ul>

</ExpandableCard>

<Divider />

## 2020 {#2020}

### Génesis de Beacon Chain {#beacon-chain-genesis}

<NetworkUpgradeSummary name="beaconChainGenesis" />

#### Resumen {#beacon-chain-genesis-summary}

La [Beacon Chain](/roadmap/beacon-chain/) necesitó 16,384 depósitos de 32 ETH en staking para lanzarse de forma segura. Esto sucedió el 27 de noviembre, lo que significa que la cadena de baliza comenzó a producir su cadena de bloques a partir del 1 de diciembre de 2020. Este es un primer paso importante para lograr la [visión de Ethereum](/roadmap/vision/).

[Lea el anuncio de la Fundación Ethereum](https://blog.ethereum.org/2020/11/27/eth2-quick-update-no-21/)

<DocLink href="/roadmap/beacon-chain/">
  La Beacon Chain
</DocLink>

---

### Contrato de depósito para staking implementado {#staking-deposit-contract}

<NetworkUpgradeSummary name="stakingDepositContractDeployed" />

#### Resumen {#deposit-contract-summary}

El contrato de depósito para staking introdujo el [staking](/glossary/#staking) en el ecosistema Ethereum. Aunque fue un contrato de [Mainnet](/glossary/#mainnet), tuvo un impacto directo en el cronograma para lanzar la [Beacon Chain](/roadmap/beacon-chain/), una importante [actualización de Ethereum](/roadmap/).

[Lea el anuncio de la Fundación Ethereum](https://blog.ethereum.org/2020/11/04/eth2-quick-update-no-19/)

<DocLink href="/staking/">
  Staking
</DocLink>

---

### Muir Glacier {#muir-glacier}

<NetworkUpgradeSummary name="muirGlacier" />

#### Resumen {#muir-glacier-summary}

El fork Muir Glacier introdujo un retraso en la [bomba de dificultad](/glossary/#difficulty-bomb). El aumento de dificultad por bloque del mecanismo de consenso [proof-of-work](/developers/docs/consensus-mechanisms/pow/) amenazaba con degradar la usabilidad de Ethereum aumentando los tiempos de espera para enviar transacciones y usar dapps.

- [Lea el anuncio de la Fundación Ethereum](https://blog.ethereum.org/2019/12/23/ethereum-muir-glacier-upgrade-announcement/)
- [Lea la explicación de Ethereum Cat Herder](https://medium.com/ethereum-cat-herders/ethereum-muir-glacier-upgrade-89b8cea5a210)

<ExpandableCard title="Muir Glacier EIPs" contentPreview="Official improvements included in this fork.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2384">EIP-2384</a>: <em>retrasa la bomba de dificultad otros 4.000.000 bloques o ~611 días.</em></li>
</ul>

</ExpandableCard>

<Divider />

## 2019 {#2019}

### Estambul {#istanbul}

<NetworkUpgradeSummary name="istanbul" />

#### Resumen {#istanbul-summary}

La bifurcación de Istanbul:

- Se optimizó el coste de [gas](/glossary/#gas) de ciertas acciones dentro de la [EVM](/developers/docs/ethereum-stack/#ethereum-virtual-machine).
- Mejoró la resistencia al ataque de denegación de servicio.
- Se mejoró el rendimiento de las soluciones de [escalabilidad de capa 2](/developers/docs/scaling/#layer-2-scaling) basadas en SNARKs y STARKs.
- Habilitó Ethereum y Zcash para que interoperasen.
- Permitió que los contratos introdujeran funciones más creativas.

[Lea el anuncio de la Fundación Ethereum](https://blog.ethereum.org/2019/11/20/ethereum-istanbul-upgrade-announcement/)

<ExpandableCard title="Istanbul EIPs" contentPreview="Official improvements included in this fork.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-152">EIP-152</a>: <em>permite a Ethereum funcionar con una moneda que mantiene la privacidad como Zcash.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-1108">EIP-1108</a> – <em>criptografía más económica para mejorar los costos de [gas](/glossary/#gas).</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-1344">EIP-1344</a> – <em>protege a Ethereum contra ataques de repetición al agregar el <code>CHAINID</code> [opcode](/developers/docs/ethereum-stack/#ethereum-virtual-machine).</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-1884">EIP-1884</a>: <em>optimiza los precios del gas para el código de operación en función del consumo.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2028">EIP-2028</a> – <em>reduce el costo de CallData para permitir más datos en los bloques – beneficioso para la [Escalabilidad de Capa 2](/developers/docs/scaling/#layer-2-scaling).</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2200">EIP-2200</a>: <em>otras modificaciones del precio del gas del código de operación</em></li>
</ul>

</ExpandableCard>

---

### Constantinopla {#constantinople}

<NetworkUpgradeSummary name="constantinople" />

#### Resumen {#constantinople-summary}

La bifurcación Constantinople:

- Se redujeron las recompensas de [minería](/developers/docs/consensus-mechanisms/pow/mining/) por bloque de 3 a 2 ETH.
- Se garantizó que la blockchain no se congelara antes de que se [implementase proof-of-stake](#beacon-chain-genesis).
- Se optimizó el coste de [gas](/glossary/#gas) de ciertas acciones dentro de la [EVM](/developers/docs/ethereum-stack/#ethereum-virtual-machine).
- Añadió la capacidad de interactuar con direcciones que aún no se han creado.

[Lea el anuncio de la Fundación Ethereum](https://blog.ethereum.org/2019/02/22/ethereum-constantinople-st-petersburg-upgrade-announcement/)

<ExpandableCard title="Constantinople EIPs" contentPreview="Official improvements included in this fork.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-145">EIP-145</a> – <em>optimiza el costo de ciertas acciones en la cadena.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-1014">EIP-1014</a>: <em>le permite interactuar con direcciones que aún no se han creado.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-1052">EIP-1052</a> – <em>introduce la instrucción <code>EXTCODEHASH</code> para obtener el hash del código de otro contrato.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-1234">EIP-1234</a>: <em>se asegura de que la cadena de bloques no&#39; se congele antes de la prueba de participación y reduce la recompensa del bloque de 3 ETH a 2. </em></li>
</ul>

</ExpandableCard>

<Divider />

## 2017 {#2017}

### Bizancio {#byzantium}

<NetworkUpgradeSummary name="byzantium" />

#### Resumen {#byzantium-summary}

La bifurcación de Bizantium:

- Se redujeron las recompensas de [minería](/developers/docs/consensus-mechanisms/pow/mining/) por bloque de 5 a 3 ETH.
- Se retrasó la [bomba de dificultad](/glossary/#difficulty-bomb) un año.
- Se ha añadido la habilidad para realizar llamadas «sin cambiar de estado» a otros contratos.
- Se añadieron ciertos métodos criptográficos para permitir la [escalabilidad de capa 2](/developers/docs/scaling/#layer-2-scaling).

[Lea el anuncio de la Fundación Ethereum](https://blog.ethereum.org/2017/10/12/byzantium-hf-announcement/)

<ExpandableCard title="Byzantium EIPs" contentPreview="Official improvements included in this fork.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-140">EIP-140</a>: <em>añade el código de operación<code>REVERT</code>.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-658">EIP-658</a>: <em>campo de estado añadido a los recibos de la transacción para indicar el éxito o el fracaso.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-196">EIP-196</a> – <em>agrega curva elíptica y multiplicación escalar para habilitar el uso de [ZK-Snarks](/developers/docs/scaling/zk-rollups/).</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-197">EIP-197</a> – <em>agrega curva elíptica y multiplicación escalar para habilitar el uso de [ZK-Snarks](/developers/docs/scaling/zk-rollups/).</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-198">EIP-198</a>: <em>permite la verificación de firmas RSA.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-211">EIP-211</a>: <em>añade soporte para valores de retorno de longitud variable.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-214">EIP-214</a> – <em>agrega el código <code>STATICALL</code> , permitiendo llamadas no cambiantes de estado a otros contratos.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-100">EIP-100</a>: <em>cambia la fórmula de ajuste de dificultad.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-649">EIP-649</a> – <em>retrasa la [bomba de dificultad](/glossary/#difficulty-bomb) por 1 año y reduce la recompensa por bloque de 5 a 3 ETH.</em></li>
</ul>

</ExpandableCard>

<Divider />

## 2016 {#2016}

### Spurious Dragon {#spurious-dragon}

<NetworkUpgradeSummary name="spuriousDragon" />

#### Resumen {#spurious-dragon-summary}

La bifurcación Spurious Dragon fue la segunda respuesta a los ataques de denegación de servicio (DoS) a la red (septiembre/octubre de 2016) e incluye:

- Ajuste de los precios del código de operación para evitar futuros ataques a la red.
- Activación de la «deflación» del estado de la cadena de bloques.
- Adición de la protección contra ataques de repetición.

[Lea el anuncio de la Fundación Ethereum](https://blog.ethereum.org/2016/11/18/hard-fork-no-4-spurious-dragon/)

<ExpandableCard title="Spurious Dragon EIPs" contentPreview="Official improvements included in this fork.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-155">EIP-155</a>: <em>evita que las transacciones de una cadena Ethereum se redifundan en una cadena alternativa, por ejemplo, una transacción de red de prueba que se reproduce en la cadena principal de Ethereum.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-160">EIP-160</a>: <em>ajusta los precios del código operativo <code>EXP</code>: hace más difícil ralentizar la red a través de operaciones de contrato de elevado coste computacional.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-161">EIP-161</a>: <em>permite eliminar cuentas vacías añadidas a través de los ataques DOS.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-170">EIP-170</a>: <em>cambia el tamaño máximo del código que un contrato en la cadena de bloques puede tener a 24.576 bytes.</em></li>
</ul>

</ExpandableCard>

---

### Tangerine Whistle {#tangerine-whistle}

<NetworkUpgradeSummary name="tangerineWhistle" />

#### Resumen {#tangerine-whistle-summary}

La bifurcación Tangerine Whistle fue la primera respuesta a los ataques de denegación de servicio (DoS) a la red (septiembre/octubre de 2016) e incluyó:

- la gestión de problemas urgentes del buen estado de la red relacionados con códigos de operación depreciados.

[Lea el anuncio de la Fundación Ethereum](https://blog.ethereum.org/2016/10/18/faq-upcoming-ethereum-hard-fork/)

<ExpandableCard title="Tangerine Whistle EIPs" contentPreview="Official improvements included in this fork.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-150">EIP-150</a>: <em>aumenta el coste de gas de los códigos operativos que pueden utilizarse en ataques de spam.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-158">EIP-158</a>: <em>reduce el tamaño del estado al eliminar un gran número de cuentas vacías que se pusieron en el estado depreciados debido a fallos en versiones anteriores del protocolo Ethereum.</em></li>
</ul>

</ExpandableCard>

---

### Fork de la DAO {#dao-fork}

<NetworkUpgradeSummary name="daoFork" />

#### Resumen {#dao-fork-summary}

El fork de la DAO fue en respuesta al [ataque de la DAO en 2016](https://www.coindesk.com/learn/understanding-the-dao-attack/), donde un contrato [DAO](/glossary/#dao) inseguro fue vaciado en un hackeo de más de 3.6 millones de ETH. El fork movió los fondos del contrato defectuoso a un [nuevo contrato](https://eth.blockscout.com/address/0xbf4ed7b27f1d666546e30d74d50d173d20bca754) con una sola función: retirar. Cualquiera que haya perdido fondos podría retirar 1 ETH por cada 100 tókenes DAO en sus carteras.

Esta acción fue votada por la comunidad Ethereum. Cualquier tenedor de ETH pudo votar mediante una transacción en [una plataforma de votación](https://web.archive.org/web/20170620030820/http://v1.carbonvote.com/). La decisión de realizar un fork obtuvo más del 85 % de los votos.

Algunos mineros se negaron a bifurcar porque el incidente de la DAO no era un defecto en el protocolo. Fueron quienes formaron [Ethereum Classic](https://ethereumclassic.org/).

[Lea el anuncio de la Fundación Ethereum](https://blog.ethereum.org/2016/07/20/hard-fork-completed/)

---

### Homestead {#homestead}

<NetworkUpgradeSummary name="homestead" />

#### Resumen {#homestead-summary}

Homestead: la bifurcación con perspectivas de futuro. Incluyó varios cambios de protocolo y un cambio de red que concedió a Ethereum la capacidad de hacer más actualizaciones de red.

[Lea el anuncio de la Fundación Ethereum](https://blog.ethereum.org/2016/02/29/homestead-release/)

<ExpandableCard title="Homestead EIPs" contentPreview="Official improvements included in this fork.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2">EIP-2</a>: <em>edita el proceso de creación del contrato.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7">EIP-7</a>: <em>añade un nuevo código operativo: <code>DELEGATECALL</code></em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-8">EIP-8</a>: <em>introduce los requisitos de compatibilidad futura de devp2p</em></li>
</ul>

</ExpandableCard>

<Divider />

## 2015 {#2015}

### Frontier Thawing {#frontier-thawing}

<NetworkUpgradeSummary name="frontierThawing" />

#### Resumen {#frontier-thawing-summary}

El fork Frontier Thawing eliminó el límite de 5,000 [gas](/glossary/#gas) por [bloque](/glossary/#block) y estableció el precio por defecto del gas en 51 [gwei](/glossary/#gwei). Esto permitió que se realizaran transacciones que requiriesen 21.000 unidades de gas. Se introdujo la [bomba de dificultad](/glossary/#difficulty-bomb) para asegurar un hard fork futuro hacia [proof-of-stake](/glossary/#pos).

- [Lea el anuncio de Frontier Thawing de la Fundación Ethereum](https://blog.ethereum.org/2015/08/04/the-thawing-frontier/)
- [Lea la Actualización de Protocolo de Ethereum 1](https://blog.ethereum.org/2015/08/04/ethereum-protocol-update-1/)

---

### Frontier {#frontier}

<NetworkUpgradeSummary name="frontier" />

#### Resumen {#frontier-summary}

Frontier fue una implementación en vivo, pero básica, del proyecto Ethereum. Siguió a la exitosa fase de pruebas Olympic. Estaba destinada a usuarios técnicos, específicamente a desarrolladores. [Los bloques](/glossary/#block) tenían un límite de [gas](/glossary/#gas) de 5,000. Este período de «deshielo» permitió a los mineros iniciar sus operaciones y a los primeros adoptantes instalar sus clientes sin tener que «precipitarse».

[Lea el anuncio de la Fundación Ethereum](https://blog.ethereum.org/2015/07/22/frontier-is-coming-what-to-expect-and-how-to-prepare/)

<Divider />

## 2014 {#2014}

### Venta de Ether {#ether-sale}

<NetworkUpgradeSummary name="etherSale" />

El ether salió oficialmente a la venta durante 42 días. Podía comprarse con BTC.

[Lea el anuncio de la Fundación Ethereum](https://blog.ethereum.org/2014/07/22/launching-the-ether-sale/)

---

### Yellowpaper publicado {#yellowpaper}

<NetworkUpgradeSummary name="yellowpaperRelease" />

El protocolo, escrito por el Dr. Gavin Wood, es una definición técnica del protocolo de Ethereum.

[Ver el Yellow Paper](https://github.com/ethereum/yellowpaper)

<Divider />

## 2013 {#2013}

### Whitepaper publicado {#whitepaper}

<NetworkUpgradeSummary name="whitepaperRelease" />

Documento introductorio, publicado en el 2013 por Vitalik Buterin, fundador de Ethereum, antes del lanzamiento del proyecto en 2015.

<DocLink href="/whitepaper/">
  Whitepaper
</DocLink>
