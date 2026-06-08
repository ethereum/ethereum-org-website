---
title: Cronología de todas las bifurcaciones de Ethereum (2014 hasta el presente)
description: Una historia de la cadena de bloques de Ethereum que incluye los principales hitos, lanzamientos y bifurcaciones.
lang: es
sidebarDepth: 1
authors: ["Nixo"]
---

Una cronología de todos los principales hitos, bifurcaciones y actualizaciones de la cadena de bloques de [Ethereum](/).

<ExpandableCard title="¿Qué son las bifurcaciones?" contentPreview="Cambios en las reglas del protocolo de Ethereum que a menudo incluyen actualizaciones técnicas planificadas.">

Las bifurcaciones ocurren cuando se necesitan realizar actualizaciones o cambios técnicos importantes en la red; por lo general, provienen de las [Propuestas de mejora de Ethereum (EIP)](/eips/) y cambian las "reglas" del protocolo.

Cuando se necesitan actualizaciones en el software tradicional controlado de forma centralizada, la empresa simplemente publica una nueva versión para el usuario final. Las cadenas de bloques funcionan de manera diferente porque no hay una propiedad central. Los [clientes de Ethereum](/developers/docs/nodes-and-clients/) deben actualizar su software para implementar las nuevas reglas de la bifurcación. Además, los creadores de bloques (mineros en un entorno de prueba de trabajo (PoW), validadores en un entorno de prueba de participación (PoS)) y los nodos deben crear bloques y validarlos según las nuevas reglas. [Más sobre los mecanismos de consenso](/developers/docs/consensus-mechanisms/)

Estos cambios en las reglas pueden crear una división temporal en la red. Se podrían producir nuevos bloques de acuerdo con las nuevas reglas o las antiguas. Las bifurcaciones generalmente se acuerdan con anticipación para que los clientes adopten los cambios al unísono y la bifurcación con las actualizaciones se convierta en la cadena principal. Sin embargo, en casos raros, los desacuerdos sobre las bifurcaciones pueden hacer que la red se divida permanentemente, siendo el caso más notable la creación de Ethereum Classic con la <a href="#dao-fork">bifurcación DAO</a>.

</ExpandableCard>

<ExpandableCard title="¿Por qué algunas actualizaciones tienen varios nombres?" contentPreview="Los nombres de las actualizaciones siguen un patrón">

El software subyacente de Ethereum está compuesto por dos mitades, conocidas como la [capa de ejecución](/glossary/#execution-layer) y la [capa de consenso](/glossary/#consensus-layer).

**Nomenclatura de las actualizaciones de ejecución**

Desde 2021, las actualizaciones de la **capa de ejecución** se nombran según los nombres de las ciudades de las [ubicaciones anteriores de Devcon y Devconnect](https://devcon.org/en/past-events/) en orden cronológico:

| Nombre de la actualización | Año de Devcon(nect) | Número de Devcon | Fecha de actualización |
| -------------------------- | ------------------- | ---------------- | ---------------------- |
| Berlín                     | 2014                | 0                | 15 de abr. de 2021     |
| Londres                    | 2015                | I                | 5 de ago. de 2021      |
| Shanghái                   | 2016                | II               | 12 de abr. de 2023     |
| Cancún                     | 2017                | III              | 13 de mar. de 2024     |
| Praga                      | 2018                | IV               | 7 de may. de 2025      |
| Osaka                      | 2019                | V                | 3 de dic. de 2025      |
| **Ámsterdam**              | 2022                | Devconnect       | Por determinar - Siguiente |
| _Bogotá_                   | 2022                | VI               | Por determinar         |
| _Istanbul_                 | 2023                | Devconnect       | Por determinar         |
| _Bangkok_                  | 2024                | VII              | Por determinar         |
| _Buenos Aires_             | 2025                | Devconnect       | Por determinar         |
| _Mumbai_                   | 2026                | VIII             | Por determinar         |

**Nomenclatura de las actualizaciones de consenso**

Desde el lanzamiento de la [cadena de balizas](/glossary/#beacon-chain), las actualizaciones de la **capa de consenso** llevan el nombre de estrellas celestes que comienzan con letras en orden alfabético:

| Nombre de la actualización                                | Fecha de actualización |
| --------------------------------------------------------- | ---------------------- |
| Génesis de la cadena de balizas                           | 1 de dic. de 2020      |
| [Altair](https://en.wikipedia.org/wiki/Altair)            | 27 de oct. de 2021     |
| [Bellatrix](https://en.wikipedia.org/wiki/Bellatrix)      | 6 de sep. de 2022      |
| [Capella](https://en.wikipedia.org/wiki/Capella)          | 12 de abr. de 2023     |
| [Deneb](https://en.wikipedia.org/wiki/Deneb)              | 13 de mar. de 2024     |
| [Electra](<https://en.wikipedia.org/wiki/Electra_(star)>) | 7 de may. de 2025      |
| [Fulu](<https://en.wikipedia.org/wiki/Fulu_(star)>)       | 3 de dic. de 2025      |
| [**Gloas**](https://en.wikipedia.org/wiki/WASP-13)        | Por determinar - Siguiente |
| [_Heze_](https://en.wikipedia.org/wiki/Zeta_Virginis)     | Por determinar         |

**Nomenclatura combinada**

Las actualizaciones de ejecución y consenso se implementaron inicialmente en diferentes momentos, pero después de [La Fusión](/roadmap/merge/) en 2022, estas se han implementado simultáneamente. Como tal, han surgido términos coloquiales para simplificar las referencias a estas actualizaciones utilizando un solo término conjunto. Esto comenzó con la actualización _Shanghái-Capella_, comúnmente conocida como "**Shapella**", y continúa con las actualizaciones posteriores.

| Actualización de ejecución | Actualización de consenso | Nombre corto  |
| -------------------------- | ------------------------- | ------------- |
| Shanghái                   | Capella                   | "Shapella"    |
| Cancún                     | Deneb                     | "Dencun"      |
| Praga                      | Electra                   | "Pectra"      |
| Osaka                      | Fulu                      | "Fusaka"      |
| Ámsterdam                  | Gloas                     | "Glamsterdam" |
| Bogotá                     | Heze                      | "Hegotá"      |

</ExpandableCard>

Vaya directamente a la información sobre algunas de las actualizaciones pasadas particularmente importantes: [La cadena de balizas](/roadmap/beacon-chain/); [La Fusión](/roadmap/merge/); y [EIP-1559](#london)

¿Busca futuras actualizaciones del protocolo? [Obtenga más información sobre las próximas actualizaciones en la hoja de ruta de Ethereum](/roadmap/).

<Divider />

## 2025 {#2025}

### Fulu-Osaka ("Fusaka") {#fusaka}

<NetworkUpgradeSummary name="fusaka" />

[Más sobre Fusaka](/roadmap/fusaka/)

### Prague-Electra ("Pectra") {#pectra}

<NetworkUpgradeSummary name="pectra" />

La actualización Prague-Electra ("Pectra") incluyó varias mejoras en el protocolo de Ethereum destinadas a mejorar la experiencia de todos los usuarios, las redes de capa 2 (l2), los participantes de staking y los operadores de nodos.

El staking recibió una actualización con cuentas de validador de interés compuesto y un mejor control sobre los fondos en staking utilizando la dirección de retiro de ejecución. EIP-7251 aumentó el saldo efectivo máximo para un solo validador a 2048, mejorando la eficiencia del capital para los participantes de staking. EIP-7002 permitió que una cuenta de ejecución activara de forma segura acciones del validador, incluida la salida o el retiro de partes de los fondos, mejorando la experiencia para los participantes de staking de ETH, al tiempo que ayudaba a fortalecer la responsabilidad de los operadores de nodos.

Otras partes de la actualización se centraron en mejorar la experiencia de los usuarios habituales. EIP-7702 brindó la capacidad para que una cuenta normal que no es un contrato inteligente ([EOA](/glossary/#eoa)) ejecute código similar a un contrato inteligente. Esto desbloqueó nuevas funcionalidades ilimitadas para las cuentas tradicionales de Ethereum, como el procesamiento por lotes de transacciones, el patrocinio de gas, la autenticación alternativa, los controles de gasto programables, los mecanismos de recuperación de cuentas y más.

<ExpandableCard title="EIP de Pectra" contentPreview="Mejoras oficiales incluidas en esta actualización.">

Mejor experiencia de usuario:

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7702">EIP-7702</a> - <em>Establecer código de cuenta EOA</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7691">EIP-7691</a> - <em>Aumento de la capacidad de procesamiento de blobs</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7623">EIP-7623</a> - <em>Aumentar el costo de los datos de llamada</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7840">EIP-7840</a> - <em>Agregar programación de blobs a los archivos de configuración de la capa de ejecución (EL)</em></li>
</ul>

Mejor experiencia de staking:

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7251">EIP-7251</a> - <em>Aumentar el <code>MAX_EFFECTIVE_BALANCE</code></em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7002">EIP-7002</a> - <em>Salidas activables por la capa de ejecución</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7685">EIP-7685</a> - <em>Solicitudes de capa de ejecución de propósito general</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-6110">EIP-6110</a> - <em>Suministrar depósitos de validador en cadena</em></li>
</ul>

Mejoras en la eficiencia y seguridad del protocolo:

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2537">EIP-2537</a> - <em>Precompilado para operaciones de curva BLS12-381</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2935">EIP-2935</a> - <em>Guardar hashes de bloques históricos en el estado</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7549">EIP-7549</a> - <em>Mover el índice del comité fuera de la atestación</em></li>
</ul>

</ExpandableCard>

- [Pectra.wtf](https://pectra.wtf)
- [Cómo Pectra mejorará la experiencia de staking](https://www.kiln.fi/post/next-ethereum-upgrade-how-pectra-will-enhance-the-staking-experience)
- [Leer las especificaciones de la actualización Electra](https://github.com/ethereum/consensus-specs/tree/master/specs/electra/)
- [Preguntas frecuentes sobre Prague-Electra ("Pectra")](/roadmap/pectra/)

<Divider />

## 2024 {#2024}

### Cancún-Deneb ("Dencun") {#dencun}

<NetworkUpgradeSummary name="dencun" />

#### Resumen de Cancún {#cancun-summary}

La actualización Cancún contiene un conjunto de mejoras para la _ejecución_ de Ethereum destinadas a mejorar la escalabilidad, en conjunto con las actualizaciones de consenso de Deneb.

En particular, esto incluye la EIP-4844, conocida como **Proto-Danksharding**, que disminuye significativamente el costo de almacenamiento de datos para los rollups de capa 2. Esto se logra mediante la introducción de "blobs" de datos que permiten a los rollups publicar datos en la Red principal durante un corto período de tiempo. Esto da como resultado tarifas de transacción significativamente más bajas para los usuarios de los rollups de capa 2.

<ExpandableCard title="EIP de Cancún" contentPreview="Mejoras oficiales incluidas en esta actualización.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-1153">EIP-1153</a> - <em>Códigos de operación de almacenamiento transitorio</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-4788">EIP-4788</a> - <em>Raíz del bloque baliza en la EVM</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-4844">EIP-4844</a> - <em>Transacciones de blobs de fragmentos (Proto-Danksharding)</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-5656">EIP-5656</a> - <em><code>MCOPY</code> - Instrucción de copia de memoria</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-6780">EIP-6780</a> - <em><code>SELFDESTRUCT</code> solo en la misma transacción</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7516">EIP-7516</a> - <em>Código de operación <code>BLOBBASEFEE</code></em></li>
</ul>

</ExpandableCard>

- [Rollups de capa 2](/layer-2/)
- [Proto-Danksharding](/roadmap/scaling/#proto-danksharding)
- [Danksharding](/roadmap/danksharding/)
- [Leer la especificación de la actualización Cancún](https://github.com/ethereum/execution-specs/blob/master/network-upgrades/mainnet-upgrades/cancun.md)

#### Resumen de Deneb {#deneb-summary}

La actualización Deneb contiene un conjunto de mejoras para el _consenso_ de Ethereum destinadas a mejorar la escalabilidad. Esta actualización viene en conjunto con las actualizaciones de ejecución de Cancún para habilitar Proto-Danksharding (EIP-4844), junto con otras mejoras en la cadena de balizas.

Los "mensajes de salida voluntaria" firmados y generados previamente ya no caducan, lo que otorga más control a los usuarios que hacen staking de sus fondos con un operador de nodo externo. Con este mensaje de salida firmado, los participantes pueden delegar la operación del nodo mientras mantienen la capacidad de salir de forma segura y retirar sus fondos en cualquier momento, sin necesidad de pedir permiso a nadie.

La EIP-7514 trae un endurecimiento a la emisión de ETH al limitar la tasa de "rotación" con la que los validadores pueden unirse a la red a ocho (8) por época. Dado que la emisión de ETH es proporcional al total de ETH en staking, limitar el número de validadores que se unen limita la _tasa de crecimiento_ de los ETH recién emitidos, al tiempo que reduce los requisitos de hardware para los operadores de nodos, lo que ayuda a la descentralización.

<ExpandableCard title="EIP de Deneb" contentPreview="Mejoras oficiales incluidas en esta actualización">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-4788">EIP-4788</a> - <em>Raíz del bloque baliza en la EVM</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-4844">EIP-4844</a> - <em>Transacciones de blobs de fragmentos</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7044">EIP-7044</a> - <em>Salidas voluntarias firmadas perpetuamente válidas</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7045">EIP-7045</a> - <em>Aumentar el slot máximo de inclusión de atestación</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7514">EIP-7514</a> - <em>Añadir límite máximo de rotación por época</em></li>
</ul>

</ExpandableCard>

- [Leer las especificaciones de la actualización Deneb](https://github.com/ethereum/consensus-specs/tree/master/specs/deneb/)
- [Preguntas frecuentes sobre Cancún-Deneb ("Dencun")](/roadmap/dencun/)

<Divider />

## 2023 {#2023}

### Shanghái-Capella ("Shapella") {#shapella}

<NetworkUpgradeSummary name="shapella" />

#### Resumen de Shanghái {#shanghai-summary}

La actualización Shanghái trajo los retiros de staking a la capa de ejecución. En conjunto con la actualización Capella, esto permitió que los bloques aceptaran operaciones de retiro, lo que permite a quienes hacen staking retirar su ETH de la cadena de balizas a la capa de ejecución.

<ExpandableCard title="EIP de Shanghái" contentPreview="Mejoras oficiales incluidas en esta actualización.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-3651">EIP-3651</a> – <em>Inicia la dirección <code>COINBASE</code> en caliente</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-3855">EIP-3855</a> – <em>Nueva instrucción <code>PUSH0</code></em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-3860">EIP-3860</a> – <em>Limita y mide el initcode</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-4895">EIP-4895</a> – <em>Retiros push de la cadena de balizas como operaciones</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-6049">EIP-6049</a> - <em>Declara obsoleto <code>SELFDESTRUCT</code></em></li>
</ul>

</ExpandableCard>

- [Leer la especificación de la actualización Shanghái](https://github.com/ethereum/execution-specs/blob/master/network-upgrades/mainnet-upgrades/shanghai.md)

#### Resumen de Capella {#capella-summary}

La actualización Capella fue la tercera gran actualización de la capa de consenso (cadena de balizas) y habilitó los retiros de staking. Capella ocurrió de forma sincrónica con la actualización de la capa de ejecución, Shanghái, y habilitó la funcionalidad de retiro de staking.

Esta actualización de la capa de consenso brindó la capacidad para que quienes hacen staking y no proporcionaron credenciales de retiro con su depósito inicial pudieran hacerlo, habilitando así los retiros.

La actualización también proporcionó una funcionalidad de barrido automático de cuentas, que procesa continuamente las cuentas de los validadores en busca de pagos de recompensas disponibles o retiros completos.

- [Más sobre los retiros de staking](/staking/withdrawals/).
- [Leer las especificaciones de la actualización Capella](https://github.com/ethereum/consensus-specs/tree/master/specs/capella/)

<Divider />

## 2022 {#2022}

### Paris (La Fusión) {#paris}

<NetworkUpgradeSummary name="paris" />

#### Resumen {#paris-summary}

La actualización Paris se activó cuando la cadena de bloques de prueba de trabajo (PoW) superó una [dificultad total terminal](/glossary/#terminal-total-difficulty) de 58750000000000000000000. Esto ocurrió en el bloque 15537393 el 15 de septiembre de 2022, lo que activó la actualización Paris en el siguiente bloque. Paris fue la transición de [La Fusión](/roadmap/merge/): su característica principal fue desactivar el algoritmo de minería de [prueba de trabajo (PoW)](/developers/docs/consensus-mechanisms/pow) y la lógica de consenso asociada, y activar en su lugar la [prueba de participación (PoS)](/developers/docs/consensus-mechanisms/pos). Paris en sí fue una actualización de los [clientes de ejecución](/developers/docs/nodes-and-clients/#execution-clients) (equivalente a Bellatrix en la capa de consenso) que les permitió recibir instrucciones de sus [clientes de consenso](/developers/docs/nodes-and-clients/#consensus-clients) conectados. Esto requirió la activación de un nuevo conjunto de métodos de API internos, conocidos colectivamente como la [Engine API](https://github.com/ethereum/execution-apis/blob/main/src/engine/common.md). ¡Esta fue posiblemente la actualización más significativa en la historia de Ethereum desde [Homestead](#homestead)!

- [Leer la especificación de la actualización Paris](https://github.com/ethereum/execution-specs/blob/master/network-upgrades/mainnet-upgrades/paris.md)

<ExpandableCard title="EIP de París" contentPreview="Mejoras oficiales incluidas en esta actualización.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-3675">EIP-3675</a> – <em>Actualizar el consenso a prueba de participación (PoS)</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-4399">EIP-4399</a> – <em>Reemplazar el código de operación DIFFICULTY con PREVRANDAO</em></li>
</ul>

</ExpandableCard>

---

### Bellatrix {#bellatrix}

<NetworkUpgradeSummary name="bellatrix" />

#### Resumen {#bellatrix-summary}

La actualización Bellatrix fue la segunda actualización programada para la [cadena de balizas](/roadmap/beacon-chain), preparando la cadena para [La Fusión](/roadmap/merge/). Lleva las penalizaciones del validador a sus valores máximos por inactividad e infracciones de recorte. Bellatrix también incluye una actualización de las reglas de elección de bifurcación para preparar la cadena para La Fusión y la transición del último bloque de prueba de trabajo (PoW) al primer bloque de prueba de participación (PoS). Esto incluye hacer que los clientes de consenso sean conscientes de la [dificultad total terminal](/glossary/#terminal-total-difficulty) de 58750000000000000000000.

- [Leer la especificación de la actualización Bellatrix](https://github.com/ethereum/consensus-specs/tree/master/specs/bellatrix)

---

### Gray Glacier {#gray-glacier}

<NetworkUpgradeSummary name="grayGlacier" />

#### Resumen {#gray-glacier-summary}

La actualización de la red Gray Glacier retrasó la [bomba de dificultad](/glossary/#difficulty-bomb) tres meses. Este es el único cambio introducido en esta actualización, y es de naturaleza similar a las actualizaciones [Arrow Glacier](#arrow-glacier) y [Muir Glacier](#muir-glacier). Se han realizado cambios similares en las actualizaciones de la red [Bizancio](#byzantium), [Constantinopla](#constantinople) y [Londres](#london).

- [Blog de la EF: Anuncio de la actualización Gray Glacier](https://blog.ethereum.org/2022/06/16/gray-glacier-announcement)

<ExpandableCard title="EIP de Gray Glacier" contentPreview="Mejoras oficiales incluidas en esta actualización.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-5133">EIP-5133</a> – <em>retrasa la bomba de dificultad hasta septiembre de 2022</em></li>
</ul>

</ExpandableCard>

<Divider />

## 2021 {#2021}

### Arrow Glacier {#arrow-glacier}

<NetworkUpgradeSummary name="arrowGlacier" />

#### Resumen {#arrow-glacier-summary}

La actualización de la red Arrow Glacier retrasó la [bomba de dificultad](/glossary/#difficulty-bomb) varios meses. Este es el único cambio introducido en esta actualización, y es de naturaleza similar a la actualización [Muir Glacier](#muir-glacier). Se han realizado cambios similares en las actualizaciones de la red [Bizancio](#byzantium), [Constantinopla](#constantinople) y [Londres](#london).

- [Blog de la EF: Anuncio de la actualización Arrow Glacier](https://blog.ethereum.org/2021/11/10/arrow-glacier-announcement)
- [Ethereum Cat Herders: Actualización Arrow Glacier de Ethereum](https://medium.com/ethereum-cat-herders/ethereum-arrow-glacier-upgrade-e8d20fa4c002)

<ExpandableCard title="EIP de Arrow Glacier" contentPreview="Mejoras oficiales incluidas en esta actualización.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-4345">EIP-4345</a> – <em>retrasa la bomba de dificultad hasta junio de 2022</em></li>
</ul>

</ExpandableCard>

---

### Altair {#altair}

<NetworkUpgradeSummary name="altair" />

#### Resumen {#altair-summary}

La actualización Altair fue la primera actualización programada para la [cadena de balizas](/roadmap/beacon-chain). Añadió soporte para los "comités de sincronización" (lo que habilitó los clientes ligeros) y aumentó las penalizaciones por inactividad y recorte de los validadores a medida que el desarrollo avanzaba hacia La Fusión.

- [Leer la especificación de la actualización Altair](https://github.com/ethereum/consensus-specs/tree/master/specs/altair)

#### <Emoji text=":tada:" size={1} className="me-2" /> ¡Dato curioso! {#altair-fun-fact}

Altair fue la primera actualización importante de la red que tuvo una hora de lanzamiento exacta. Todas las actualizaciones anteriores se habían basado en un número de bloque declarado en la cadena de prueba de trabajo (PoW), donde los tiempos de bloque varían. La cadena de balizas no requiere resolver la prueba de trabajo y, en su lugar, funciona con un sistema de épocas basado en el tiempo que consta de 32 "slots" de doce segundos de duración en los que los validadores pueden proponer bloques. ¡Es por eso que sabíamos exactamente cuándo llegaríamos a la época 74.240 y Altair entraría en funcionamiento!

- [Tiempo de bloque](/developers/docs/blocks/#block-time)

---

### Londres {#london}

<NetworkUpgradeSummary name="london" />

#### Resumen {#london-summary}

La actualización Londres introdujo la [EIP-1559](https://eips.ethereum.org/EIPS/eip-1559), que reformó el mercado de tarifas de transacción, junto con cambios en la forma en que se manejan los reembolsos de gas y el cronograma de la [Era de Hielo](/glossary/#ice-age).

#### ¿Qué fue la actualización Londres / EIP-1559? {#eip-1559}

Antes de la actualización Londres, Ethereum tenía bloques de tamaño fijo. En momentos de alta demanda de la red, estos bloques operaban a plena capacidad. Como resultado, los usuarios a menudo tenían que esperar a que la demanda se redujera para ser incluidos en un bloque, lo que generaba una mala experiencia de usuario. La actualización Londres introdujo bloques de tamaño variable en Ethereum.

La forma en que se calculaban las tarifas de transacción en la red Ethereum cambió con [la actualización Londres](/ethereum-forks/#london) de agosto de 2021. Antes de la actualización Londres, las tarifas se calculaban sin separar las tarifas `base` y `priority`, de la siguiente manera:

Supongamos que Alice tenía que pagarle a Bob 1 ETH. En la transacción, el límite de gas es de 21.000 unidades y el precio del gas es de 200 Gwei.

La tarifa total habría sido: `Gas units (limit) * Gas price per unit`, es decir, `21,000 * 200 = 4,200,000 gwei` o 0,0042 ETH

La implementación de la [EIP-1559](https://eips.ethereum.org/EIPS/eip-1559) en la actualización Londres hizo que el mecanismo de tarifas de transacción fuera más complejo, pero hizo que las tarifas de gas fueran más predecibles, lo que resultó en un mercado de tarifas de transacción más eficiente. Los usuarios pueden enviar transacciones con un `maxFeePerGas` correspondiente a cuánto están dispuestos a pagar para que se ejecute la transacción, sabiendo que no pagarán más que el precio de mercado del gas (`baseFeePerGas`), y se les reembolsará cualquier extra, menos su tarifa de prioridad.

Este video explica la EIP-1559 y los beneficios que aporta: [Explicación de la EIP-1559](https://www.youtube.com/watch?v=MGemhK9t44Q)

- [¿Eres desarrollador de una aplicación descentralizada (dapp)? Asegúrate de actualizar tus bibliotecas y herramientas.](https://github.com/ethereum/execution-specs/blob/master/network-upgrades/london-ecosystem-readiness.md)
- [Leer el anuncio de la Fundación Ethereum](https://blog.ethereum.org/2021/07/15/london-mainnet-announcement)
- [Leer la explicación de Ethereum Cat Herders](https://medium.com/ethereum-cat-herders/london-upgrade-overview-8eccb0041b41)

<ExpandableCard title="EIP de Londres" contentPreview="Mejoras oficiales incluidas en esta actualización.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-1559">EIP-1559</a> – <em>mejora el mercado de tarifas de transacción</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-3198">EIP-3198</a> – <em>devuelve la <code>BASEFEE</code> de un bloque</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-3529">EIP-3529</a> - <em>reduce los reembolsos de gas para las operaciones de la EVM</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-3541">EIP-3541</a> - <em>evita el despliegue de contratos que comiencen con <code>0xEF</code></em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-3554">EIP-3554</a> – <em>retrasa la Era de Hielo hasta diciembre de 2021</em></li>
</ul>

</ExpandableCard>

---

### Berlín {#berlin}

<NetworkUpgradeSummary name="berlin" />

#### Resumen {#berlin-summary}

La actualización Berlín optimizó el costo de gas para ciertas acciones de la EVM y aumenta el soporte para múltiples tipos de transacciones.

- [Leer el anuncio de la Fundación Ethereum](https://blog.ethereum.org/2021/03/08/ethereum-berlin-upgrade-announcement)
- [Leer la explicación de Ethereum Cat Herders](https://medium.com/ethereum-cat-herders/the-berlin-upgrade-overview-2f7ad710eb80)

<ExpandableCard title="EIP de Berlín" contentPreview="Mejoras oficiales incluidas en esta actualización.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2565">EIP-2565</a> – <em>reduce el costo de gas de MODEXP</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2718">EIP-2718</a> – <em>permite un soporte más fácil para múltiples tipos de transacciones</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2929">EIP-2929</a> – <em>aumentos en el costo de gas para los códigos de operación de acceso al estado</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2930">EIP-2930</a> – <em>añade listas de acceso opcionales</em></li>
</ul>

</ExpandableCard>

<Divider />

## 2020 {#2020}

### Génesis de la cadena de balizas {#beacon-chain-genesis}

<NetworkUpgradeSummary name="beaconChainGenesis" />

#### Resumen {#beacon-chain-genesis-summary}

La [cadena de balizas](/roadmap/beacon-chain/) necesitaba 16384 depósitos de 32 ETH en staking para lanzarse de forma segura. Esto ocurrió el 27 de noviembre, y la cadena de balizas comenzó a producir bloques el 1 de diciembre de 2020.

[Leer el anuncio de la Fundación Ethereum](https://blog.ethereum.org/2020/11/27/eth2-quick-update-no-21)

<DocLink href="/roadmap/beacon-chain/">
  La cadena de balizas
</DocLink>

---

### Despliegue del contrato de depósito de staking {#staking-deposit-contract}

<NetworkUpgradeSummary name="stakingDepositContractDeployed" />

#### Resumen {#deposit-contract-summary}

El contrato de depósito de staking introdujo el [staking](/glossary/#staking) en el ecosistema de Ethereum. Aunque es un contrato de la [Red principal](/glossary/#mainnet), tuvo un impacto directo en el cronograma de lanzamiento de la [cadena de balizas](/roadmap/beacon-chain/), una importante [actualización de Ethereum](/roadmap/).

[Leer el anuncio de la Fundación Ethereum](https://blog.ethereum.org/2020/11/04/eth2-quick-update-no-19)

<DocLink href="/staking/">
  Staking
</DocLink>

---

### Muir Glacier {#muir-glacier}

<NetworkUpgradeSummary name="muirGlacier" />

#### Resumen {#muir-glacier-summary}

La bifurcación Muir Glacier introdujo un retraso en la [bomba de dificultad](/glossary/#difficulty-bomb). Los aumentos en la dificultad del bloque del mecanismo de consenso de [prueba de trabajo (PoW)](/developers/docs/consensus-mechanisms/pow/) amenazaban con degradar la usabilidad de Ethereum al aumentar los tiempos de espera para enviar transacciones y usar aplicaciones descentralizadas (dapps).

- [Leer el anuncio de la Fundación Ethereum](https://blog.ethereum.org/2019/12/23/ethereum-muir-glacier-upgrade-announcement)
- [Leer la explicación de Ethereum Cat Herders](https://medium.com/ethereum-cat-herders/ethereum-muir-glacier-upgrade-89b8cea5a210)

<ExpandableCard title="EIP de Muir Glacier" contentPreview="Mejoras oficiales incluidas en esta bifurcación.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2384">EIP-2384</a> – <em>retrasa la bomba de dificultad por otros 4.000.000 de bloques, o ~611 días.</em></li>
</ul>

</ExpandableCard>

<Divider />

## 2019 {#2019}

### Istanbul {#istanbul}

<NetworkUpgradeSummary name="istanbul" />

#### Resumen {#istanbul-summary}

La bifurcación Istanbul:

- Optimizó el costo de [gas](/glossary/#gas) de ciertas acciones en la [EVM](/developers/docs/ethereum-stack/#ethereum-virtual-machine).
- Mejoró la resistencia a los ataques de denegación de servicio.
- Hizo que las soluciones de [escalabilidad de capa 2](/developers/docs/scaling/#layer-2-scaling) basadas en SNARKs y STARKs fueran más eficientes.
- Permitió la interoperabilidad entre Ethereum y Zcash.
- Permitió a los contratos introducir funciones más creativas.

[Leer el anuncio de la Fundación Ethereum](https://blog.ethereum.org/2019/11/20/ethereum-istanbul-upgrade-announcement)

<ExpandableCard title="EIP de Istanbul" contentPreview="Mejoras oficiales incluidas en esta bifurcación.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-152">EIP-152</a>: <em>permite que Ethereum funcione con monedas que preservan la privacidad como Zcash.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-1108">EIP-1108</a>: <em>criptografía más barata para mejorar los costos de [gas](/glossary/#gas).</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-1344">EIP-1344</a>: <em>protege a Ethereum contra ataques de repetición al agregar el [código de operación](/developers/docs/ethereum-stack/#ethereum-virtual-machine) <code>CHAINID</code>.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-1884">EIP-1884</a>: <em>optimiza los precios del gas de los códigos de operación en función del consumo.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2028">EIP-2028</a>: <em>reduce el costo de los datos de llamada para permitir más datos en los bloques, lo cual es bueno para la [escalabilidad de capa 2](/developers/docs/scaling/#layer-2-scaling).</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2200">EIP-2200</a>: <em>otras alteraciones en el precio del gas de los códigos de operación.</em></li>
</ul>

</ExpandableCard>

---

### Constantinopla {#constantinople}

<NetworkUpgradeSummary name="constantinople" />

#### Resumen {#constantinople-summary}

La bifurcación Constantinopla:

- Redujo las recompensas de [minería](/developers/docs/consensus-mechanisms/pow/mining/) de bloques de 3 a 2 ETH.
- Aseguró que la cadena de bloques no se congelara antes de que [se implementara la prueba de participación (PoS)](#beacon-chain-genesis).
- Optimizó el costo de [gas](/glossary/#gas) de ciertas acciones en la [EVM](/developers/docs/ethereum-stack/#ethereum-virtual-machine).
- Agregó la capacidad de interactuar con direcciones que aún no se han creado.

[Leer el anuncio de la Fundación Ethereum](https://blog.ethereum.org/2019/02/22/ethereum-constantinople-st-petersburg-upgrade-announcement)

<ExpandableCard title="EIP de Constantinopla" contentPreview="Mejoras oficiales incluidas en esta bifurcación.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-145">EIP-145</a>: <em>optimiza el costo de ciertas acciones en cadena.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-1014">EIP-1014</a>: <em>permite interactuar con direcciones que aún no se han creado.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-1052">EIP-1052</a>: <em>introduce la instrucción <code>EXTCODEHASH</code> para recuperar el hash del código de otro contrato.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-1234">EIP-1234</a>: <em>asegura que la cadena de bloques no se congele antes de la prueba de participación (PoS) y reduce la recompensa de bloque de 3 a 2 ETH.</em></li>
</ul>

</ExpandableCard>

<Divider />

## 2017 {#2017}

### Bizancio {#byzantium}

<NetworkUpgradeSummary name="byzantium" />

#### Resumen {#byzantium-summary}

La bifurcación Bizancio:

- Redujo las recompensas de [minería](/developers/docs/consensus-mechanisms/pow/mining/) de bloque de 5 a 3 ETH.
- Retrasó la [bomba de dificultad](/glossary/#difficulty-bomb) un año.
- Añadió la capacidad de realizar llamadas que no cambian el estado a otros contratos.
- Añadió ciertos métodos de criptografía para permitir el escalado de [capa 2](/developers/docs/scaling/#layer-2-scaling).

[Leer el anuncio de la Fundación Ethereum](https://blog.ethereum.org/2017/10/12/byzantium-hf-announcement)

<ExpandableCard title="EIP de Bizancio" contentPreview="Mejoras oficiales incluidas en esta bifurcación.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-140">EIP-140</a> – <em>añade el código de operación <code>REVERT</code>.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-658">EIP-658</a> – <em>se añade un campo de estado a los recibos de transacción para indicar éxito o fracaso.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-196">EIP-196</a> – <em>añade la curva elíptica y la multiplicación escalar para permitir los [ZK-Snarks](/developers/docs/scaling/zk-rollups/).</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-197">EIP-197</a> – <em>añade la curva elíptica y la multiplicación escalar para permitir los [ZK-Snarks](/developers/docs/scaling/zk-rollups/).</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-198">EIP-198</a> – <em>habilita la verificación de firma RSA.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-211">EIP-211</a> – <em>añade soporte para valores de retorno de longitud variable.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-214">EIP-214</a> – <em>añade el código de operación <code>STATICCALL</code>, permitiendo llamadas que no cambian el estado a otros contratos.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-100">EIP-100</a> – <em>cambia la fórmula de ajuste de dificultad.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-649">EIP-649</a> – <em>retrasa la [bomba de dificultad](/glossary/#difficulty-bomb) 1 año y reduce la recompensa de bloque de 5 a 3 ETH.</em></li>
</ul>

</ExpandableCard>

<Divider />

## 2016 {#2016}

### Spurious Dragon {#spurious-dragon}

<NetworkUpgradeSummary name="spuriousDragon" />

#### Resumen {#spurious-dragon-summary}

La bifurcación Spurious Dragon fue la segunda respuesta a los ataques de denegación de servicio (DoS) en la red (septiembre/octubre de 2016), que incluyó:

- el ajuste de los precios de los códigos de operación para prevenir futuros ataques en la red.
- la habilitación del «aligeramiento» (debloat) del estado de la cadena de bloques.
- la adición de protección contra ataques de repetición.

[Leer el anuncio de la Fundación Ethereum](https://blog.ethereum.org/2016/11/18/hard-fork-no-4-spurious-dragon)

<ExpandableCard title="EIP de Spurious Dragon" contentPreview="Mejoras oficiales incluidas en esta bifurcación.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-155">EIP-155</a>: <em>evita que las transacciones de una cadena de Ethereum se vuelvan a transmitir en una cadena alternativa, por ejemplo, que una transacción de una red de prueba se repita en la cadena principal de Ethereum.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-160">EIP-160</a>: <em>ajusta los precios del código de operación <code>EXP</code>, lo que dificulta la ralentización de la red mediante operaciones de contrato computacionalmente costosas.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-161">EIP-161</a>: <em>permite la eliminación de cuentas vacías añadidas a través de los ataques DOS.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-170">EIP-170</a>: <em>cambia el tamaño máximo de código que puede tener un contrato en la cadena de bloques a 24576 bytes.</em></li>
</ul>

</ExpandableCard>

---

### Tangerine whistle {#tangerine-whistle}

<NetworkUpgradeSummary name="tangerineWhistle" />

#### Resumen {#tangerine-whistle-summary}

La bifurcación Tangerine Whistle fue la primera respuesta a los ataques de denegación de servicio (DoS) en la red (septiembre/octubre de 2016), que incluyó:

- la resolución de problemas urgentes de salud de la red relacionados con códigos de operación con precios demasiado bajos.

[Leer el anuncio de la Fundación Ethereum](https://blog.ethereum.org/2016/10/18/faq-upcoming-ethereum-hard-fork)

<ExpandableCard title="EIP de Tangerine Whistle" contentPreview="Mejoras oficiales incluidas en esta bifurcación.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-150">EIP-150</a>: <em>aumenta los costos de gas de los códigos de operación que pueden usarse en ataques de spam.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-158">EIP-158</a>: <em>reduce el tamaño del estado al eliminar una gran cantidad de cuentas vacías que se incluyeron en el estado a un costo muy bajo debido a fallas en versiones anteriores del protocolo Ethereum.</em></li>
</ul>

</ExpandableCard>

---

### Bifurcación DAO {#dao-fork}

<NetworkUpgradeSummary name="daoFork" />

#### Resumen {#dao-fork-summary}

La bifurcación DAO fue una respuesta al [ataque a The DAO de 2016](https://www.coindesk.com/learn/understanding-the-dao-attack/), en el que un contrato [DAO](/glossary/#dao) inseguro fue vaciado de más de 3,6 millones de ETH en un hackeo. La bifurcación movió los fondos del contrato defectuoso a un [nuevo contrato](https://eth.blockscout.com/address/0xbf4ed7b27f1d666546e30d74d50d173d20bca754) con una única función: retirar. Cualquiera que hubiera perdido fondos podía retirar 1 ETH por cada 100 tokens DAO en sus billeteras.

Este curso de acción fue votado por la comunidad de Ethereum. Cualquier titular de ETH pudo votar a través de una transacción en [una plataforma de votación](https://web.archive.org/web/20170620030820/http://v1.carbonvote.com/). La decisión de bifurcar alcanzó más del 85 % de los votos.

Algunos mineros se negaron a bifurcar porque el incidente de The DAO no era un defecto en el protocolo. Posteriormente, pasaron a formar [Ethereum Classic](https://ethereumclassic.org/).

[Leer el anuncio de la Fundación Ethereum](https://blog.ethereum.org/2016/07/20/hard-fork-completed)

---

### Homestead {#homestead}

<NetworkUpgradeSummary name="homestead" />

#### Resumen {#homestead-summary}

La bifurcación Homestead miraba hacia el futuro. Incluyó varios cambios en el protocolo y un cambio en la red que le dio a Ethereum la capacidad de realizar futuras actualizaciones de la red.

[Leer el anuncio de la Fundación Ethereum](https://blog.ethereum.org/2016/02/29/homestead-release)

<ExpandableCard title="EIP de Homestead" contentPreview="Mejoras oficiales incluidas en esta bifurcación.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2">EIP-2</a>: <em>realiza ediciones en el proceso de creación de contratos.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7">EIP-7</a>: <em>añade un nuevo código de operación: <code>DELEGATECALL</code></em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-8">EIP-8</a>: <em>introduce requisitos de compatibilidad hacia adelante para devp2p</em></li>
</ul>

</ExpandableCard>

<Divider />

## 2015 {#2015}

### Deshielo de Frontera {#frontier-thawing}

<NetworkUpgradeSummary name="frontierThawing" />

#### Resumen {#frontier-thawing-summary}

La bifurcación de deshielo de Frontera eliminó el límite de 5.000 de [gas](/glossary/#gas) por [bloque](/glossary/#block) y estableció el precio del gas predeterminado en 51 [Gwei](/glossary/#gwei). Esto permitió realizar transacciones (las transacciones requieren 21.000 de gas). Se introdujo la [bomba de dificultad](/glossary/#difficulty-bomb) para garantizar una futura bifurcación dura hacia la [prueba de participación (PoS)](/glossary/#pos).

- [Leer el anuncio de la Fundación Ethereum](https://blog.ethereum.org/2015/08/04/the-thawing-frontier)
- [Leer la actualización 1 del protocolo de Ethereum](https://blog.ethereum.org/2015/08/04/ethereum-protocol-update-1)

---

### Frontera {#frontier}

<NetworkUpgradeSummary name="frontier" />

#### Resumen {#frontier-summary}

Frontera fue una implementación en vivo, pero básica, del proyecto Ethereum. Siguió a la exitosa fase de pruebas Olympic. Estaba destinada a usuarios técnicos, específicamente a desarrolladores. Los [bloques](/glossary/#block) tenían un límite de [gas](/glossary/#gas) de 5.000. Este período de «deshielo» permitió a los mineros iniciar sus operaciones y a los primeros usuarios instalar sus clientes sin tener que «apresurarse».

[Leer el anuncio de la Fundación Ethereum](https://blog.ethereum.org/2015/07/22/frontier-is-coming-what-to-expect-and-how-to-prepare)

<Divider />

## 2014 {#2014}

### Venta de ether {#ether-sale}

<NetworkUpgradeSummary name="etherSale" />

El ether salió oficialmente a la venta durante 42 días. Se podía comprar con BTC.

[Leer el anuncio de la Fundación Ethereum](https://blog.ethereum.org/2014/07/22/launching-the-ether-sale)

---

### Lanzamiento del Libro Amarillo {#yellowpaper}

<NetworkUpgradeSummary name="yellowpaperRelease" />

El Libro Amarillo, escrito por el Dr. Gavin Wood, es una definición técnica del protocolo Ethereum.

[Ver el Libro Amarillo](https://github.com/ethereum/yellowpaper)

<Divider />

## 2013 {#2013}

### Publicación del documento técnico {#whitepaper}

<NetworkUpgradeSummary name="whitepaperRelease" />

El documento introductorio, publicado en 2013 por Vitalik Buterin, el fundador de Ethereum, antes del lanzamiento del proyecto en 2015.

<DocLink href="/whitepaper/">
  Documento técnico
</DocLink>