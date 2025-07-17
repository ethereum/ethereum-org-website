---
title: Historia y bifurcaciones de Ethereum
description: Una historia de la cadena de bloques de Ethereum, que incluye los principales hitos, lanzamientos y bifurcaciones.
lang: es
sidebarDepth: 1
---

# La historia de Ethereum {#the-history-of-ethereum}

Una cronología que incluye todos los principales hitos, bifurcaciones y actualizaciones de la cadena de bloques de Ethereum.

<ExpandableCard title="¿Qué son las bifurcaciones?" contentPreview="Changes to the rules of the Ethereum protocol which often include planned technical upgrades.">

Las bifurcaciones se producen cuando es necesario realizar actualizaciones o cambios técnicos importantes en la red; suelen provenir de las [propuestas de mejora de Ethereum (o EIP)](/eips/) y cambian las «reglas» del protocolo.

Cuando se precisan actualizaciones en un software tradicional y controlado centralmente, la empresa publica una nueva versión para el usuario final. Las cadenas de bloque funcionan de manera diferente porque no hay propiedad central. Los <a href="/developers/docs/nodes-and-clients/">clientes de Ethereum</a> deben actualizar su software para implementar las nuevas reglas establecidas en la bifurcación. Además de creadores de bloques (los mineros en el mundo de las pruebas de trabajo y los validadores en el universo de las pruebas de participación) y los nodos, deben crearse bloques y validarlos con respecto a las reglas nuevas. <a href="/developers/docs/consensus-mechanisms/">Más información sobre los mecanismos de consenso</a>

Estos cambios en las normas pueden crear una división temporal en la red. Los bloques nuevos podrían producirse de acuerdo con las reglas nuevas o con las antiguas. Normalmente las bifurcaciones se acuerdan con antelación para que los clientes adopten los cambios a la vez. Además, de este modo las bifurcaciones actualizadas se convertirán en la cadena principal. Sin embargo, en casos excepcionales, los desacuerdos con respecto a las bifurcaciones pueden provocar que la red permanezca dividida. La más notable es la creación de Ethereum Classic con la [bifurcación DAO] (#dao-fork).

</ExpandableCard>

Vaya directamente a la información sobre algunas de las actualizaciones anteriores más importantes: [La cadena de baliza](/upgrades); [La Fusión](/roadmap/merge/); y [EIP-1559](#london)

¿Busca futuras actualizaciones del protocolo? [Descubra las próximas actualizaciones de la hoja de ruta de Ethereum](/roadmap/).

<Divider />

## 2023 {#2023}

### Shanghai-Capella {#shapella}

<NetworkUpgradeSummary name="shapella" />

#### Resumen de Shangai {#shanghai-summary}

La actualizacion Shangai permite retirar la participación a la capa de ejecución. Junto con la actualización Capella, habilitó los bloques para aceptar las operaciones de retirada, que permitieran a los interesados retirar sus ETH provenientes de la cadena de baliza para ejecutarlos posteriormente.

<ExpandableCard title="EIP de Shangai" contentPreview="Official improvements included in this upgrade.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-3651">EIP-3651</a>: <em>inicia la <code>dirección</code>COINBASE</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-3855">EIP-3855</a>: <em>nueva instrucción<code>PUSH0</code></em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-3860">EIP-3860</a>: <em>código iniciación límite y contador </em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-4895">EIP-4895</a>: <em>notificación cadena de baliza con retiradas como operaciones</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-6049">EIP-6049</a> - <em>Deprecate <code>SELFDESTRUCT</code></em></li>
</ul>

</ExpandableCard>

- [Lea la especificación de la actualización Shanghai](https://github.com/ethereum/execution-specs/blob/master/network-upgrades/mainnet-upgrades/shanghai.md)

#### Resumen de Capella {#capella-summary}

La actualizacion Capella es la tercera actualización importante a la capa de consenso (cadena de baliza), que le permite retirar su participación. Capella se produjo de forma sincrónica a la actualización de la capa de ejecución, Shanghai, y activó la funcionalidad de retirada de participaciones.

Esta actualización de la capa de consenso aporta a los participantes que no proporcionaron credenciales de retirada en su depósito inicial la posibilidad de hacerlo ahora.

La actualizacion también proporciona la funcionalidad de barrido automático de la cuenta, la cual procesa constantemente cuentas validadoras para cualquier pago de recompensa disponible o retiradas completas.

- [Más información sobre la retirada de participaciones](/staking/withdrawals/).
- [Lea la especificacion de la actualizacion Capella](https://github.com/ethereum/consensus-specs/blob/dev/specs/capella/)

<Divider />

## 2022 {#2022}

### Paris (La Fusión) {#paris}

<NetworkUpgradeSummary name="paris" />

#### Resumen {#paris-summary}

El paso de la cadena de bloque de la prueba de trabajo a la [dificultad total terminal](/glossary/#terminal-total-difficulty) de 58750000000000000000000 originó La Fusión. Esto ocurrió en el bloque 15537393 el 15 de septiembre de 2022, y dio comienzo a la actualización Paris en el siguiente bloque. Paris supuso la transición denominada [La Fusión](/roadmap/merge/): cuya característica principal consistió en pasar del [algoritmo de minería y lógica de consenso asociada de la](/developers/docs/consensus-mechanisms/pow) prueba de trabajo [a la prueba de participación](/developers/docs/consensus-mechanisms/pos). Paris fue en sí una actualización a los [clientes de ejecución](/developers/docs/nodes-and-clients/#execution-clients) (equivalente a Bellatrix, en la capa de consenso) que les permitió recibir instrucciones de sus <a href="/developers/docs/nodes-and-clients/#consensus-clients">clientes de consenso conectados</a>. Esto requirió que se activara un nuevo conjunto de métodos internos de API, conocido colectivamente como [Engine API](https://github.com/ethereum/execution-apis/blob/main/src/engine/common.md). Esta fue probablemente la actualización más significativa en la historia de Ethereum desde [Homestead](#homestead)!

- [Lea la especificación de actualización Paris](https://github.com/ethereum/execution-specs/blob/master/network-upgrades/mainnet-upgrades/paris.md)

<ExpandableCard title="EIP de Paris" contentPreview="Official improvements included in this upgrade.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-3675">EIP-3675</a>: <em>consenso de actualización a la prueba de participación</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-4399">EIP-4399</a>: <em>suplanta código operativo DIFFICULTY por PREVRANDAO</em></li>
</ul>

</ExpandableCard>

---

### Bellatrix {#bellatrix}

<NetworkUpgradeSummary name="bellatrix" />

#### Resumen {#bellatrix-summary}

La actualización Bellatrix fue la segunda actualización programada para la [cadena de baliza](/roadmap/beacon-chain), como prepración de la cadena para [La Fusión](/roadmap/merge/). Incorpora penalizaciones del validador a sus valores completos por inactividad y recortes por malas conductas. Bellatrix también incluye una actualización de las reglas de elección de la bifurcación para preparar la cadena de cara a La Fusión y la transición del último bloque de prueba de trabajo al primer bloque de prueba de participación. Esto incluye sensibilizar a los clientes sobre la dificultad [total de la terminal](/glossary/#terminal-total-difficulty) de 58750000000000000000000.

- [Lea las especificaciones de actualización Bellatrix](https://github.com/ethereum/consensus-specs/tree/dev/specs/bellatrix)

---

### Gray Glacier {#gray-glacier}

<NetworkUpgradeSummary name="grayGlacier" />

#### Resumen {#gray-glacier-summary}

La actualización de la red Gray Glacier hizo retroceder la [bomba de dificultad](/glossary/#difficulty-bomb) tres meses. Este es el único cambio introducido en esta actualización, y es similar en naturaleza a las actualizaciones [Arrow Glacier](#arrow-glacier) y [Muir Glacier](#muir-glacier). Se han llevado a cabo cambios similares en las actualizaciones de red [Byzantium](#byzantium),[Constantinople](#constantinople) y [London](#london).

- [EF Blog: anuncio de actualización de Gray Glacier](https://blog.ethereum.org/2022/06/16/gray-glacier-announcement/)

<ExpandableCard title="EIPs de Gray Glacier" contentPreview="Official improvements included in this upgrade.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-5133">EIP-5133</a>: <em>retrasa la bomba de dificultad hasta septiembre de 2022</em></li>
</ul>

</ExpandableCard>

<Divider />

## 2021 {#2021}

### Arrow Glacier {#arrow-glacier}

<NetworkUpgradeSummary name="arrowGlacier" />

#### Resumen {#arrow-glacier-summary}

La actualización de la red Arrow Glacier hizo retroceder la [bomba de dificultad](/glossary/#difficulty-bomb) varios meses. Este es el único cambio introducido en esta actualización, y es similar en naturaleza a la actualización de [Muir Glacier](#muir-glacier). Cambios similares han sido realizados en las actualizaciones de red [Byzantium](#byzantium),[Constantinopla](#constantinople) y [Londres](#london).

- [Blog de EF: anuncio de actualización de Arrow Glacier](https://blog.ethereum.org/2021/11/10/arrow-glacier-announcement/)
- [Ethereum Cat Herders: actualización de Arrow Glacier de Ethereum](https://medium.com/ethereum-cat-herders/ethereum-arrow-glacier-upgrade-e8d20fa4c002)

<ExpandableCard title="EIP de Arrow Glacier" contentPreview="Official improvements included in this upgrade.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-4345">EIP-4345</a>: <em>retrasa la bomba de dificultad hasta junio de 2022</em></li>
</ul>

</ExpandableCard>

---

### Altair {#altair}

<NetworkUpgradeSummary name="altair" />

#### Resumen {#altair-summary}

La actualización Altair fue la primera programada para la [cadena de baliza](/roadmap/beacon-chain). Añadió soporte para los «comités de sincronización», permitiendo clientes ligeros y un aumento de la inactividad del validador y de las penalizaciones de recorte a medida que avanzaba el desarrollo hacia La Fusión.

- [Lea las especificaciones de actualización Altair](https://github.com/ethereum/consensus-specs/tree/dev/specs/altair)

#### <Emoji text=":tada:" size={1} className="me-2" />¡Dato curioso! {#altair-fun-fact}

Altair fue la primera gran actualización de red que ha tenido un periodo de implementación preciso. Cada una de las actualizaciones anteriores se habían basado en un número de bloques declarados en la cadena de prueba de trabajo, donde los tiempos de bloque varían. La cadena de baliza no requiere resolución para la prueba de trabajo y, en lugar de ello, funciona en un sistema épocas basado en el tiempo, que consiste en «ranuras» de tiempo de doce segundos durante los cuales los validadores pueden proponer bloques. Por esta razón sabíamos exactamente cuándo alcanzaríamos la época 74.240 y Altair vería la luz.

- [Tiempo del bloque](/developers/docs/blocks/#block-time)

---

### London {#london}

<NetworkUpgradeSummary name="london" />

#### Resumen {#london-summary}

La actualización London introdujo [EIP-1559](https://eips.ethereum.org/EIPS/eip-1559), que ha transformado el mercado de las comisiones de las transacciones, junto con cambios en la forma en que se manejan los reembolsos de gas y el plan [Era de hielo](/glossary/#ice-age).

- [¿Es desarrollador de DApps? Asegúrese de actualizar sus bibliotecas y herramientas.](https://github.com/ethereum/execution-specs/blob/master/network-upgrades/london-ecosystem-readiness.md)
- [Lea el anuncio de Ethereum Foundation.](https://blog.ethereum.org/2021/07/15/london-mainnet-announcement/)
- [Lea la explicación de Ethereum Cat Herders.](https://medium.com/ethereum-cat-herders/london-upgrade-overview-8eccb0041b41)

<ExpandableCard title="EIP de London" contentPreview="Official improvements included in this upgrade.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-1559">EIP-1559</a>: <em>mejora el sector de las comisiones de las transacciones</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-3198">EIP-3198</a>: <em>devuelve el <code>BASEFEE</code> de un bloque</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-3529">EIP-3529</a>: <em>reduces reembolsos de gas para operaciones EVM</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-3541">EIP-3541</a>: <em>evita lanzar contratos que empiecen por <code>0xEF</code></em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-3554">EIP-3554</a>: <em>retrasa la Era de hielo hasta diciembre de 2021</em></li>
</ul>

</ExpandableCard>

---

### Berlin {#berlin}

<NetworkUpgradeSummary name="berlin" />

#### Resumen {#berlin-summary}

La actualización Berlin optimizó el coste del gas para ciertas acciones de EVM, y aumentó la compatibilidad con múltiples tipos de transacciones.

- [Leer el anuncio de Ethereum Foundation](https://blog.ethereum.org/2021/03/08/ethereum-berlin-upgrade-announcement/)
- [Leer la explicación de Ethereum Cat Herders](https://medium.com/ethereum-cat-herders/the-berlin-upgrade-overview-2f7ad710eb80)

<ExpandableCard title="EIP de Berlin" contentPreview="Official improvements included in this upgrade.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2565">EIP-2565</a>: <em>reduce el gasto moderado ModExp de gas</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2718">EIP-2718</a>: <em>permite mejor soporte para múltiples tipos de transacciones</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2929">EIP-2929</a>: <em>incrementos en el coste del gas para códigos operativos de acceso a estados</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2930">EIP-2930</a>: <em>añade listas de acceso opcionales</em></li>
</ul>

</ExpandableCard>

<Divider />

## 2020 {#2020}

### El origen de la cadena de baliza {#beacon-chain-genesis}

<NetworkUpgradeSummary name="beaconChainGenesis" />

#### Resumen {#beacon-chain-genesis-summary}

La [cadena de baliza](/roadmap/beacon-chain/) necesita 16.384 depósitos de 32 ETH apostados para enviarse de forma segura. Esto sucedió el 27 de noviembre, lo que significa que la cadena de baliza comenzó a producir su cadena de bloques a partir del 1 de diciembre de 2020. Este es un importante primer paso para lograr la[ vision de Ethereum](/roadmap/vision/).

[Leer el anuncio de Ethereum Foundation](https://blog.ethereum.org/2020/11/27/eth2-quick-update-no-21/)

<DocLink href="/roadmap/beacon-chain/">
  La cadena de baliza
</DocLink>

---

### Contrato de depósito de participación implementado {#staking-deposit-contract}

<NetworkUpgradeSummary name="stakingDepositContractDeployed" />

#### Resumen {#deposit-contract-summary}

El contrato de depósito de participación introdujo la [participación](/glossary/#staking) en el ecosistema de Ethereum. A pesar de ser un contrato en la [red principal](/glossary/#mainnet), ha tenido impacto directo sobre la secuenciación de lanzamiento de la [cadena de baliza](/roadmap/beacon-chain/), una importante [ actualización de Ethereum](/roadmap/).

[Leer el anuncio de Ethereum Foundation](https://blog.ethereum.org/2020/11/04/eth2-quick-update-no-19/)

<DocLink href="/staking/">
  Staking (apostar)
</DocLink>

---

### Muir Glacier {#muir-glacier}

<NetworkUpgradeSummary name="muirGlacier" />

#### Resumen {#muir-glacier-summary}

La bifurcación Muir Glacier introdujo un retraso en la [bomba de dificultad](/glossary/#difficulty-bomb). El aumento de la dificultad del bloque del mecanismo de consenso de la [prueba de trabajo](/developers/docs/consensus-mechanisms/pow/) amenazó con degradar la usabilidad de Ethereum, debido al incremento de los tiempos de espera para enviar transacciones y utilizar DApps.

- [Leer el anuncio de Ethereum Foundation](https://blog.ethereum.org/2019/12/23/ethereum-muir-glacier-upgrade-announcement/)
- [Leer la explicación de Ethereum Cat Herders](https://medium.com/ethereum-cat-herders/ethereum-muir-glacier-upgrade-89b8cea5a210)

<ExpandableCard title="EIP de Muir Glacier" contentPreview="Official improvements included in this fork.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2384">EIP-2384</a>: <em>retrasa la bomba de dificultad otros 4.000.000 bloques o ~611 días.</em></li>
</ul>

</ExpandableCard>

<Divider />

## 2019 {#2019}

### Istanbul {#istanbul}

<NetworkUpgradeSummary name="istanbul" />

#### Resumen {#istanbul-summary}

La bifurcación de Istanbul:

- Optimizó el coste del [gas](/glossary/#gas) de ciertas acciones en la [EVM](/developers/docs/ethereum-stack/#ethereum-virtual-machine).
- Mejoró la resistencia al ataque de denegación de servicio.
- Realizó escalabilidad de [capa 2](/developers/docs/scaling/#layer-2-scaling) basada en SNARK y STARK más eficientes.
- Habilitó Ethereum y Zcash para que interoperasen.
- Permitió que los contratos introdujeran funciones más creativas.

[Leer el anuncio de Ethereum Foundation](https://blog.ethereum.org/2019/11/20/ethereum-istanbul-upgrade-announcement/)

<ExpandableCard title="EIP de Estambul" contentPreview="Official improvements included in this fork.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-152">EIP-152</a>: <em>permite a Ethereum funcionar con una moneda que mantiene la privacidad como Zcash.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-1108">EIP-1108</a>: <em>una criptografía más barata para mejorar los costes del <a href="/glossary/#gas">gas</a> gas.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-1344">EIP-1344</a>: <em>protege a Ethereum contra ataques de repetición al añadir <code>CHAINID</code> <a href="/developers/docs/ethereum-stack/#ethereum-virtual-machine">opcode</a>.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-1884">EIP-1884</a>: <em>optimiza los precios del gas para el código de operación en función del consumo.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2028">EIP-2028</a>: <em>reduce el coste de CallData para permitir más datos en bloques, lo que es productivo para la <a href="/developers/docs/scaling/#layer-2-scaling">escalabilidad de capa 2</a>.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2200">EIP-2200</a>: <em>otras modificaciones del precio del gas del código de operación</em></li>
</ul>

</ExpandableCard>

---

### Constantinople {#constantinople}

<NetworkUpgradeSummary name="constantinople" />

#### Resumen {#constantinople-summary}

La bifurcación Constantinople:

- Garantizó que la cadena de bloques no se congelara antes de que se implementara la [prueba de participación](#beacon-chain-genesis).
- Optimizado el costo del [gas](/glossary/#gas) de ciertas acciones en la [EVM](/developers/docs/ethereum-stack/#ethereum-virtual-machine).
- Añadió la capacidad de interactuar con direcciones que aún no se han creado.

[Leer el anuncio de Ethereum Foundation](https://blog.ethereum.org/2019/02/22/ethereum-constantinople-st-petersburg-upgrade-announcement/)

<ExpandableCard title="Las EIP de Constantinople" contentPreview="Official improvements included in this fork.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-145">EIP-145</a>: <em>optimizó el precio del gas en función del consumo.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-1014">EIP-1014</a>: <em>le permite interactuar con direcciones que aún no se han creado.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-1052">EIP-1052</a>: <em>optimiza el coste de ciertas acciones en cadena.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-1234">EIP-1234</a>: <em>se asegura de que la cadena de bloque no lo congele&#39;antes de la prueba.</em></li>
</ul>

</ExpandableCard>

<Divider />

## 2017 {#2017}

### Byzantium {#byzantium}

<NetworkUpgradeSummary name="byzantium" />

#### Resumen {#byzantium-summary}

La bifurcación de Bizantium:

- Redujo las recompensas de [minería](/developers/docs/consensus-mechanisms/pow/mining/) de bloques de 5 a 3 ETH.
- Retrasó un año la [bomba de dificultad](/glossary/#difficulty-bomb).
- Se ha añadido la habilidad para realizar llamadas «sin cambiar de estado» a otros contratos.
- Añadió ciertos métodos de criptografía para permitir [escalabilidad de capa 2](/developers/docs/scaling/#layer-2-scaling).

[Leer el anuncio de Ethereum Foundation](https://blog.ethereum.org/2017/10/12/byzantium-hf-announcement/)

<ExpandableCard title="EIP de Bizantium" contentPreview="Official improvements included in this fork.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-140">EIP-140</a>: <em>añade el código de operación<code>REVERT</code>.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-658">EIP-658</a>: <em>campo de estado añadido a los recibos de la transacción para indicar el éxito o el fracaso.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-196">EIP-196</a>: <em>añade curva elíptica y multiplicación escalar para permitir <a href="/developers/docs/scaling/zk-rollups/">ZK-Snarks</a>.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-197">EIP-197</a>: <em>añade curva elíptica y multiplicación escalar para permitir <a href="/developers/docs/scaling/zk-rollups/">ZK-Snarks</a>.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-198">EIP-198</a>: <em>permite la verificación de firmas RSA.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-211">EIP-211</a>: <em>añade soporte para valores de retorno de longitud variable.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-214">EIP-214</a> – <em>agrega el código <code>STATICALL</code> , permitiendo llamadas no cambiantes de estado a otros contratos.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-100">EIP-100</a>: <em>cambia la fórmula de ajuste de dificultad.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-649">EIP-649</a>: <em>retrasa <a href="/glossary/#difficulty-bomb">la bomba de dificultad</a> 1 año y reduce la recompensa de bloques de 5 a 3 ETH.</em></li>
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

<ExpandableCard title="EIP de Spurious Dragon" contentPreview="Official improvements included in this fork.">

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

[Leer el anuncio de Ethereum Foundation](https://blog.ethereum.org/2016/10/18/faq-upcoming-ethereum-hard-fork/)

<ExpandableCard title="EPI de Tangerine Whistle" contentPreview="Official improvements included in this fork.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-150">EIP-150</a>: <em>aumenta el coste de gas de los códigos operativos que pueden utilizarse en ataques de spam.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-158">EIP-158</a>: <em>reduce el tamaño del estado al eliminar un gran número de cuentas vacías que se pusieron en el estado depreciados debido a fallos en versiones anteriores del protocolo Ethereum.</em></li>
</ul>

</ExpandableCard>

---

### La bifuración DAO {#dao-fork}

<NetworkUpgradeSummary name="daoFork" />

#### Resumen {#dao-fork-summary}

La bifurcación DAO surgió como respuesta al [ataque de DAO de 2016](https://www.coindesk.com/learn/understanding-the-dao-attack/) donde un contrato inseguro [DAO](/glossary/#dao) fue drenando más de 3,6 millones de ETH en un hackeo. La bifurcación movió los fondos del contrato defectuoso a un [nuevo contrato](https://etherscan.io/address/0xbf4ed7b27f1d666546e30d74d50d173d20bca754) con una única función: la de retirada. Cualquiera que haya perdido fondos podría retirar 1 ETH por cada 100 tókenes DAO en sus carteras.

Esta acción fue votada por la comunidad Ethereum. Cualquier titular de ETH pudo votar a través de una transacción en [una plataforma de votación](https://web.archive.org/web/20170620030820/http://v1.carbonvote.com/). La decisión de realizar un fork obtuvo más del 85 % de los votos.

Algunos mineros se negaron a bifurcar porque el incidente de la DAO no era un defecto en el protocolo. Pasaron a formar [Ethereum Classic](https://ethereumclassic.org/).

[Leer el anuncio de Ethereum Foundation](https://blog.ethereum.org/2016/07/20/hard-fork-completed/)

---

### Homestead {#homestead}

<NetworkUpgradeSummary name="homestead" />

#### Resumen {#homestead-summary}

Homestead: la bifurcación con perspectivas de futuro. Incluyó varios cambios de protocolo y un cambio de red que concedió a Ethereum la capacidad de hacer más actualizaciones de red.

[Leer el anuncio de Ethereum Foundation](https://blog.ethereum.org/2016/02/29/homestead-release/)

<ExpandableCard title="EIP de Homestead" contentPreview="Official improvements included in this fork.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2">EIP-2</a>: <em>edita el proceso de creación del contrato.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7">EIP-7</a>: <em>añade un nuevo código operativo: <code>DELEGATECALL</code></em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-8">EIP-8</a>: <em>introduce los requisitos de compatibilidad futura de devp2p</em></li>
</ul>

</ExpandableCard>

<Divider />

## 2015 {#2015}

### Deshielo Frontier {#frontier-thawing}

<NetworkUpgradeSummary name="frontierThawing" />

#### Resumen {#frontier-thawing-summary}

La bifurcación de deshielo Frontier elevó el limite del [gas](/glossary/#gas) de 5.000 por [bloque](/glossary/#block) y fijó el precio por defecto en 51 [gwei](/glossary/#gwei). Esto permitió que se realizaran transacciones que requiriesen 21.000 unidades de gas. La [bomba de dificultad](/glossary/#difficulty-bomb)se introdujo para asegurar un futuro de bifurcación dura a la [prueba de participación](/glossary/#pos).

- [Leer el anuncio de Ethereum Foundation](https://blog.ethereum.org/2015/08/04/the-thawing-frontier/)
- [Lea la actualización 1 del protocolo de Ethereum](https://blog.ethereum.org/2015/08/04/ethereum-protocol-update-1/)

---

### Frontier {#frontier}

<NetworkUpgradeSummary name="frontier" />

#### Resumen {#frontier-summary}

Frontier fue una implementación en vivo, pero básica, del proyecto Ethereum. Siguió a la exitosa fase de pruebas Olympic. Estaba destinada a usuarios técnicos, específicamente a desarrolladores. [Los bloques](/glossary/#block) tenían un límite de [gas](/glossary/#gas) de 5.000. Este período de «deshielo» permitió a los mineros iniciar sus operaciones y a los primeros adoptantes instalar sus clientes sin tener que «precipitarse».

[Leer el anuncio de Ethereum Foundation](https://blog.ethereum.org/2015/07/22/frontier-is-coming-what-to-expect-and-how-to-prepare/)

<Divider />

## 2014 {#2014}

### Venta de ether {#ether-sale}

<NetworkUpgradeSummary name="etherSale" />

El ether salió oficialmente a la venta durante 42 días. Podía comprarse con BTC.

[Leer el anuncio de Ethereum Foundation](https://blog.ethereum.org/2014/07/22/launching-the-ether-sale/)

---

### Protocolo publicado {#yellowpaper}

<NetworkUpgradeSummary name="yellowpaperRelease" />

El protocolo, escrito por el Dr. Gavin Wood, es una definición técnica del protocolo de Ethereum.

[Ver el protocolo](https://github.com/ethereum/yellowpaper)

<Divider />

## 2013 {#2013}

### Protocolo publicado {#whitepaper}

<NetworkUpgradeSummary name="whitepaperRelease" />

Documento introductorio, publicado en el 2013 por Vitalik Buterin, fundador de Ethereum, antes del lanzamiento del proyecto en 2015.

<DocLink href="/whitepaper/">
  Informe
</DocLink>
