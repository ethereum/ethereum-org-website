---
title: Historia y bifurcaciones de Ethereum
description: Una historia de la cadena de bloques de Ethereum, que incluye los principales hitos, lanzamientos y bifurcaciones.
lang: es
sidebarDepth: 1
---

# La historia de Ethereum {#the-history-of-ethereum}

Una cronología que incluye todos los principales hitos, bifurcaciones y actualizaciones de la cadena de bloques de Ethereum.

<ExpandableCard title="¿Qué son las bifurcaciones?" contentPreview="Changes to the rules of the Ethereum protocol which often include planned technical upgrades.">

Las bifurcaciones se producen cuando es necesario realizar actualizaciones o cambios técnicos importantes en la red; suelen provenir de las [Propuestas de Mejora de Ethereum (EIP)](/eips/) y cambian las «reglas» del protocolo.

Cuando se precisan actualizaciones en un software tradicional y controlado centralmente, la empresa publica una nueva versión para el usuario final. Las cadenas de bloque funcionan de manera diferente porque no hay propiedad central. [clientes de Ethereum](/developers/docs/nodes-and-clients/) deben actualizar su software para implementar las nuevas reglas de la bifurcación. Además de creadores de bloques (los mineros en el mundo de las pruebas de trabajo y los validadores en el universo de las pruebas de participación) y los nodos, deben crearse bloques y validarlos con respecto a las reglas nuevas. [Más sobre mecanismos de consenso (/desarrolladores/docs/mecanismos-de-consenso/)

Estos cambios de reglas pueden crear una ruptura temporal en la red. Los bloques nuevos podrían producirse de acuerdo con las reglas nuevas o con las antiguas. Normalmente las bifurcaciones se acuerdan con antelación para que los clientes adopten los cambios a la vez. Además, de este modo las bifurcaciones actualizadas se convertirán en la cadena principal. Sin embargo, en casos excepcionales, los desacuerdos con respecto a las bifurcaciones pueden provocar que la red permanezca dividida. La más notable es la creación de Ethereum Classic con la [bifurcación DAO] (#dao-fork).

</ExpandableCard>

¿Busca futuras actualizaciones del protocolo? [Entérese de las próximas actualizaciones de Ethereum](/upgrades/).

<Divider />

## 2021 {#2021}

### Arrow Glacier {#arrow-glacier}

<Emoji text=":calendar:" size={1} mr={"0.5rem"} mb={"0.5rem"} /><code>9 diciembre de 2021 07:55:23 PM +UTC</code><br /> <Emoji text=":bricks:" size={1} mr={"0.5rem"} mb={"0.5rem"} />Número de bloque: <a href="https://etherscan.io/block/13773000">13.773.000</a><br /> <Emoji text=":money_bag:" size={1} mr={"0.5rem"} mb={"0.5rem"} />Precio de ETH: 4.111 $ USD<br /> <Emoji text=":desktop_computer:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <a href="https://web.archive.org/web/20211207064430/https://ethereum.org/en/">ethereum.org en waybackmachine</a>

#### Sumario {#arrow-glacier-summary}

La actualización de la red Arrow Glacier hizo retroceder la [bomba de dificultad](/glossary/#difficulty-bomb) durante varios meses. Este es el único cambio introducido en esta actualización, y es similar en naturaleza a la actualización de [Muir Glacier](#muir-glacier). En las actualizaciones de red [Byzantium](#byzantium),[Constantinopla](#constantinople) y [Londres](#london) se han realizado cambios similares.

- [BLog de EF - anuncio de actualización de Arrow Glacier](https://blog.ethereum.org/2021/11/10/arrow-glacier-announcement/)
- [Ethereum Cat Herders - Actualización de Ethereum Arrow Glacier](https://medium.com/ethereum-cat-herders/ethereum-arrow-glacier-upgrade-e8d20fa4c002)

<ExpandableCard title="EIP de Arrow Glacier" contentPreview="Official improvements included in this upgrade.">

- [EIP-4345](https://eips.ethereum.org/EIPS/eip-4345) – _retrasa la bomba de dificultad hasta junio de 2022_

</ExpandableCard>

#### <Emoji text=":police_car_light:" size={1} mr="0.5rem" />Operadores de nodos {#arrow-glacier-node-operators}

Asegúrese de actualizar su software de cliente a la última versión antes del 5 de diciembre de 2021 para tener en cuenta los tiempos de bloque variables. Esto ayudará a evitar que su cliente sincronice con una cadena de pre-bifurcación, resultando en la incapacidad de enviar fondos o verificar transacciones correctamente.

---

### Altair {#altair}

<Emoji text=":calendar:" size={1} mr={"0.5rem"} mb={"0.5rem"} /><code>27 de octubre de 2021 10:56:23 AM +UTC</code><br /> <Emoji text=":bricks:" size={1} mr={"0.5rem"} mb={"0.5rem"} />Número de época: 74,240<br /> <Emoji text=":money_bag:" size={1} mr={"0.5rem"} mb={"0.5rem"} />Precio ETH: 4.024 $ USD<br /> <Emoji text=":desktop_computer:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <a href="https://web.archive.org/web/20211026174951/https://ethereum.org/en/">ethereum.org en waybackmachine</a>

#### Resumen {#altair-summary}

La actualización de Altair fue la primera programada para la [cadena de baliza](/upgrades/beacon-chain). Ha añadido soporte para los «Comités de Sincronización», que pueden habilitar a los clientes ligeros, y hará que las penalizaciones por inactividad y recorte alcancen sus valores completos.

- [Lea las especificaciones de actualización de Altair](https://github.com/ethereum/consensus-specs/tree/dev/specs/altair)

#### <Emoji text=":tada:" size={1} mr="0.5rem" />¡Dato curioso! {#altair-fun-fact}

Altair fue la primera gran actualización de red que ha tenido un tiempo de implementación preciso. Cada una de las actualizaciones anteriores habían sido basadas en un número de bloques declarados en la cadena de prueba de trabajo, donde los tiempos de bloque varían. La cadena de baliza no requiere resolución para la prueba de trabajo y, en lugar de ello, funciona en un sistema época basado en tiempo que consiste en «slots» (o ranuras) de tiempo de doce segundos durante los cuales los validadores pueden proponer bloques. Por esta razón sabíamos exactamente cuándo alcanzaríamos la época 74.240 y Altair vería la luz.

- [Glosario de Beaconcha.in - Ranuras](https://kb.beaconcha.in/glossary#slots)

---

### Londres {#london}

<Emoji text=":calendar:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <code>5 de agosto de 2021 12:33:42 PM UTC</code><br /> <Emoji text=":bricks:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> Número de bloque: <a href="https://etherscan.io/block/12965000">12.965.000</a><br /> <Emoji text=":money_bag:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> Precio ETH: 2.621 $ USD<br /> <Emoji text=":desktop_computer:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <a href="https://web.archive.org/web/20210805124609/https://ethereum.org/en/">ethereum.org en waybackmachine</a>

#### Resumen {#london-summary}

La actualización de Londres introdujo [EIP-1559](https://eips.ethereum.org/EIPS/eip-1559), que ha reformado el mercado de las cuotas de transacción, junto con cambios en la forma en que se manejan los reembolsos de gas y el plan [Era de hielo](/glossary/#ice-age).

- [¿Desarrolla usted dApp? Asegúrese de actualizar sus bibliotecas y herramientas.](https://github.com/ethereum/execution-specs/blob/master/network-upgrades/london-ecosystem-readiness.md)
- [Leer el anuncio de Ethereum Foundation](https://blog.ethereum.org/2021/07/15/london-mainnet-announcement/)
- [Leer la explicación del miembro del grupo Ethereum Cat Herder](https://medium.com/ethereum-cat-herders/london-upgrade-overview-8eccb0041b41)

<ExpandableCard title="London EIPs" contentPreview="Official improvements included in this upgrade.">

- [EIP-1559](https://eips.ethereum.org/EIPS/eip-1559) – _mejora el mercado de las tasas de transacción_
- [EIP-3198](https://eips.ethereum.org/EIPS/eip-3198) – _devuelve la `BASEFEE` de un bloque_
- [EIP-3529](https://eips.ethereum.org/EIPS/eip-3529) - _reduce los reembolsos de gas para las operaciones de EVM_
- [EIP-3541](https://eips.ethereum.org/EIPS/eip-3541) - _evita la implementación de contratos que comienzan con `0xEF`_
- [EIP-3554](https://eips.ethereum.org/EIPS/eip-3554) – _retrasa la Era de hielo hasta diciembre de 2021_

</ExpandableCard>

---

### Berlín {#berlin}

<Emoji text=":calendar:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <code>15- de abril de 2021 10:07:03 AM UTC</code><br /> <Emoji text=":bricks:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> Número de bloque: <a href="https://etherscan.io/block/12244000">12.244.000</a><br /> <Emoji text=":money_bag:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> Precio ETH: 2.454 $ USD<br /> <Emoji text=":desktop_computer:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <a href="https://web.archive.org/web/20210415093618/https://ethereum.org/">ethereum.org en waybackmachine</a>

#### Sumario {#berlin-summary}

La actualización de Berlín optimizó el coste del gas para ciertas acciones de EVM, y aumenta la compatibilidad con múltiples tipos de transacciones.

- [Leer la declaración de la Fundación Ethereum](https://blog.ethereum.org/2021/03/08/ethereum-berlin-upgrade-announcement/)
- [Leer la explicación de Ethereum Cat Herders](https://medium.com/ethereum-cat-herders/the-berlin-upgrade-overview-2f7ad710eb80)

<ExpandableCard title="EIP de Berlín" contentPreview="Official improvements included in this upgrade.">

- [EIP-2565](https://eips.ethereum.org/EIPS/eip-2565) – _reduce el coste del gas ModExp_
- [EIP-2718](https://eips.ethereum.org/EIPS/eip-2718) - _habilita un soporte más fácil para múltiples tipos de transacción_
- [EIP-2929](https://eips.ethereum.org/EIPS/eip-2929) – _gas aumenta el coste del acceso al estado para códigos de operación_
- [EIP-2930](https://eips.ethereum.org/EIPS/eip-2930) - _agrega listas de acceso opcionales_

</ExpandableCard>

<Divider />

## 2020 {#2020}

### El origen de la cadena de baliza {#beacon-chain-genesis}

<Emoji text=":calendar:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <code>12 de enero de 2020 12:00:35 PM +UTC</code><br /> <Emoji text=":bricks:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> Número de bloque de la cadena de baliza: <a href="https://beaconscan.com/slot/1">1</a><br /> <Emoji text=":money_bag:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> Precio del ETH: 586,23 $ USD<br /> <Emoji text=":desktop_computer:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <a href="https://web.archive.org/web/20201207184633/https://www.ethereum.org/en/">ethereum.org on waybackmachine</a>

#### Sumario {#beacon-chain-genesis-summary}

La [cadena de baliza](/upgrades/beacon-chain/) necesita 16.384 depósitos de 32 ETH apostados para enviarse de forma segura. Esto sucedió el 27 de noviembre, es decir, la cadena de baliza comenzó a producir bloques el 1 de diciembre de 2020. Este es un primer paso importante en el cumplimiento de la [Visión de Ethereum](/upgrades/vision/).

[Leer el anuncio de Ethereum Foundation](https://blog.ethereum.org/2020/11/27/eth2-quick-update-no-21/)

<DocLink to="/upgrades/beacon-chain/">
  La cadena de baliza
</DocLink>

---

### Contrato de depósito de participación implementado {#staking-deposit-contract}

<Emoji text=":calendar:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <code>14 de octubre de 2020 09:22:52 AM +UTC</code><br /> <Emoji text=":bricks:" size={1} mr={"0.5rem"} mb={"0.5rem"} />Número de bloque: <a href="https://etherscan.io/block/11052984">11.052.984</a><br /> <Emoji text=":money_bag:" size={1} mr={"0.5rem"} mb={"0.5rem"} />Precio ETH: 379,04 $ USD<br /> <Emoji text=":desktop_computer:" size={1} mr={"0.5rem"} mb={"0.5rem"} /><a href="https://web.archive.org/web/20201104235727/https://ethereum.org/en/">ethereum.org en waybackmachine</a>

#### Resumen {#deposit-contract-summary}

El contrato de depósito de apuesta introdujo la [apuesta](/glossary/#staking) en el ecosistema de Ethereum. A pesar de ser un contrato en la [red principal](/glossary/#mainnet), ha tenido impacto directo sobre la secuenciación de lanzamiento de [cadena de baliza](/upgrades/beacon-chain/), una importante [ actualización de Ethereum](/upgrades/).

[Leer el anuncio de Ethereum Foundation](https://blog.ethereum.org/2020/11/04/eth2-quick-update-no-19/)

<DocLink to="/staking/">
  Staking (apostar)
</DocLink>

---

### Muir Glacier {#muir-glacier}

<Emoji text=":calendar:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <code>2 de enero de 2020 08:30:49 AM +UTC</code><br /> <Emoji text=":bricks:" size={1} mr={"0.5rem"} mb={"0.5rem"} />Número de bloque: <a href="https://etherscan.io/block/9200000">9.200.000</a><br /> <Emoji text=":money_bag:" size={1} mr={"0.5rem"} mb={"0.5rem"} />Precio ETH: 127,18 $ USD<br /> <Emoji text=":desktop_computer:" size={1} mr={"0.5rem"} mb={"0.5rem"} /><a href="https://web.archive.org/web/20200103093618/https://ethereum.org/">ethereum.org en waybackmachine</a>

#### Sumario {#muir-glacier-summary}

La bifurcación Muir Glacier introdujo una demora en la [bomba de dificultad](/glossary/#difficulty-bomb). El aumento de la dificultad del bloque del mecanismo de consenso de la [prueba de trabajo](/developers/docs/consensus-mechanisms/pow/) amenazó con degradar la usabilidad de Ethereum, debido al incremento de los tiempos de espera para enviar transacciones y utilizar dapps.

- [Leer la declaración de la Fundación Ethereum](https://blog.ethereum.org/2019/12/23/ethereum-muir-glacier-upgrade-announcement/)
- [Leer la explicación de Ethereum Cat Herders](https://medium.com/ethereum-cat-herders/ethereum-muir-glacier-upgrade-89b8cea5a210)

<ExpandableCard title="EIP de Muir Glacier" contentPreview="Official improvements included in this fork.">

- [EIP-2384](https://eips.ethereum.org/EIPS/eip-2384) – _retrasa la bomba de dificultad para otros 4.000.000 bloques, o aprox. 611 días._

</ExpandableCard>

<Divider />

## 2019 {#2019}

### Estambul {#istanbul}

<Emoji text=":calendar:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <code>8 de diciembre de 2019 12:25:09 AM +UTC</code><br /> <Emoji text=":bricks:" size={1} mr={"0.5rem"} mb={"0.5rem"} />Numero de bloque:<a href="https://etherscan.io/block/9069000">9.069.000</a><br /> <Emoji text=":money_bag:" size={1} mr={"0.5rem"} mb={"0.5rem"} />Precio ETH:151,06 $ USD<br /> <Emoji text=":desktop_computer:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <a href="https://web.archive.org/web/20191216101254if*/https://ethereum.org/">ethereum.org en waybackmachine</a>

#### Resumen {#istanbul-summary}

La bifurcación de Estambul:

- Se ha optimizado el coste del [gas](/glossary/#gas) de ciertas acciones en la [EVM](/developers/docs/ethereum-stack/#ethereum-virtual-machine).
- Mejora de la resistencia al ataque de denegación de servicio.
- Realizó soluciones de escala de [capa 2](/developers/docs/scaling/#layer-2-scaling) basadas en SNARK y STARK más eficientes.
- Habilitó Ethereum y Zcash para que interoperasen.
- Permitió que los contratos introdujeran funciones más creativas.

[Leer el anuncio de Ethereum Foundation](https://blog.ethereum.org/2019/11/20/ethereum-istanbul-upgrade-announcement/)

<ExpandableCard title="EIP de Estambul" contentPreview="Official improvements included in this fork.">

- [EIP-152](https://eips.ethereum.org/EIPS/eip-152) - _permitir a Ethereum que opere con una divisa que vele por la privacidad, como Zcash._
- [EIP-1108](https://eips.ethereum.org/EIPS/eip-1108) – _criptografía más barata para mejorar [gas](/glossary/#gas)._
- [EIP-1344](https://eips.ethereum.org/EIPS/eip-1344) – _protege a Ethereum contra ataques de repetición mediante la adición de `CHAINID` [opcode](/Developers/docs/ethereum-stack/#ethereum-virtual-machine)._
- [EIP-1884](https://eips.ethereum.org/EIPS/eip-1884) – _optimizando los precios de gas de código opcional basado en el consumo._
- [EIP-2028](https://eips.ethereum.org/EIPS/eip-2028) – _reduce el coste de CallData para permitir más datos en bloques - bueno para [Escalado de capa 2](/developers/docs/scaling/#layer-2-scaling)._
- [EIP-2200](https://eips.ethereum.org/EIPS/eip-2200) – _otras alteraciones de código de operación del precio de gas._

</ExpandableCard>

---

### Constantinopla {#constantinople}

<Emoji text=":calendar:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <code>28 de febrero de 2019 07:52:04 PM +UTC</code><br /> <Emoji text=":bricks:" size={1} mr={"0.5rem"} mb={"0.5rem"} />Número de bloque: <a href="https://etherscan.io/block/7280000">7.280.000</a><br /> <Emoji text=":money_bag:" size={1} mr={"0.5rem"} mb={"0.5rem"} />Precio ETH: 136,29 $ USD<br /> <Emoji text=":desktop_computer:" size={1} mr={"0.5rem"} mb={"0.5rem"} /><a href="https://web.archive.org/web/20190415163751/https://www.ethereum.org/">ethereum.org en waybackmachine</a>

#### Resumen {#constantinople-summary}

La bifurcación Constantinopla:

- Te has cerciorado de que la cadena de bloques no se congelara antes de que se implementara la [prueba de participación](#beacon-chain-genesis).
- Se ha optimizado el coste del [gas](/glossary/#gas) de ciertas acciones en la [EVM](/developers/docs/ethereum-stack/#ethereum-virtual-machine).
- Se ha añadido la capacidad de interactuar con direcciones que aún no se han creado.

[Leer el anuncio de Ethereum Foundation](https://blog.ethereum.org/2019/02/22/ethereum-constantinople-st-petersburg-upgrade-announcement/)

<ExpandableCard title="Las EIP Constantinopla" contentPreview="Official improvements included in this fork.">

- [EIP-145](https://eips.ethereum.org/EIPS/eip-145) – _optimiza el coste de ciertas acciones en cadena._
- [EIP-1014](https://eips.ethereum.org/EIPS/eip-1014) – _permite la interacción con direcciones que aún no han sido creadas._
- [EIP-1052](https://eips.ethereum.org/EIPS/eip-1052) – _optimiza el coste de ciertas acciones en cadena._
- [EIP-1234](https://eips.ethereum.org/EIPS/eip-1234) – _se asegura de que la cadena de bloques no se congele antes de la prueba de participación._

</ExpandableCard>

<Divider />

## 2017 {#2017}

### Bizancio {#byzantium}

<Emoji text=":calendar:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <code>16 de octubre de 2017 05:22:11 AM +UTC</code><br /> <Emoji text=":bricks:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> Número de bloque: <a href="https://etherscan.io/block/4370000">4.370.000</a><br /> <Emoji text=":money_bag:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> Precio ETH: 334,23 $ USD<br /> <Emoji text=":desktop_computer:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <a href="https://web.archive.org/web/20171017201143/https://www.ethereum.org/">ethereum.org en waybackmachine</a>

#### Resumen {#byzantium-summary}

La bifurcación de Bizancio:

- Se redujo la recompensa del [minero](/developers/docs/consensus-mechanisms/pow/mining/) de bloque de 5 a 3 ETH.
- Se ha retrasado un año la [bomba de dificultad](/glossary/#difficulty-bomb).
- Se ha añadido la habilidad para realizar llamadas «sin cambiar de estado» a otros contratos.
- Se añadieron ciertos métodos de criptografía para permitir [escalado de capa 2](/developers/docs/scaling/#layer-2-scaling).

[Leer el anuncio de Ethereum Foundation](https://blog.ethereum.org/2017/10/12/byzantium-hf-announcement/)

<ExpandableCard title="EIP de Bizancio" contentPreview="Official improvements included in this fork.">

- [EIP-140](https://eips.ethereum.org/EIPS/eip-140) – _añade el código de operación `REVERT`._
- [EIP-658](https://eips.ethereum.org/EIPS/eip-658) – _se ha añadido el estado de campo a los recibos de la transacción para indicar que se ha realizado correctamente o ha fallado._
- [EIP-196](https://eips.ethereum.org/EIPS/eip-196) – _añade una curva elíptica y una multiplicación de escalada para permitir [ZK-Snarks](/Developopers/docs/scaling/zk-rollups/)._
- [EIP-197](https://eips.ethereum.org/EIPS/eip-197) – _añade una curva elíptica y una multiplicación de escalada para permitir [ZK-Snarks](/Developers/docs/scaling/zk-rollups/)._
- [EIP-198](https://eips.ethereum.org/EIPS/eip-198) – _habilita la verificación de firma RSA._
- [EIP-211](https://eips.ethereum.org/EIPS/eip-211) – _añade soporte para valores de retorno de longitud variable._
- [EIP-214](https://eips.ethereum.org/EIPS/eip-214) – _añade el código `STATICALL`, permitiendo llamadas no estatales a otros contratos._
- [EIP-100](https://eips.ethereum.org/EIPS/eip-100) - _cambia la fórmula de ajuste de dificultad._
- [EIP-649](https://eips.ethereum.org/EIPS/eip-649) – _retrasa [bomba de dificultad](/glossary/#difficulty-bomb) 1 año y reduce la recompensa de bloque de 5 a 3 ETH._

</ExpandableCard>

<Divider />

## 2016 {#2016}

### Spurious Dragon {#spurious-dragon}

<Emoji text=":calendar:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <code>22 de noviembre de 2016 04:15:44 PM +UTC</code><br /> <Emoji text=":bricks:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> Número de bloque: <a href="https://etherscan.io/block/2675000">2.675.000</a><br /> <Emoji text=":money_bag:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> Precio ETH: 9,84 $ USD<br /> <Emoji text=":desktop_computer:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <a href="https://web.archive.org/web/20161127154654/https://www.ethereum.org/">ethereum.org en waybackmachine</a>

#### Resumen {#spurious-dragon-summary}

La bifurcación Spurious Dragon fue la segunda respuesta a los ataques de denegación de servicio (DoS) a la red (septiembre/octubre de 2016) e incluye:

- ajuste de los precios del código de operación para evitar futuros ataques a la red.
- activación de la «deflación» del estado de la cadena de bloques.
- adición de la protección contra ataques de repetición.

[Leer el anuncio de Ethereum Foundation](https://blog.ethereum.org/2016/11/18/hard-fork-no-4-spurious-dragon/)

<ExpandableCard title="EIP de Spurious Dragon" contentPreview="Official improvements included in this fork.">

- [EIP-155](https://eips.ethereum.org/EIPS/eip-155) – _evita que las transacciones de una cadena de Ethereum se transmitan en una cadena alternativa, por ejemplo, una transacción de red de pruebas que se reproduce en la cadena principal de Ethereum._
- [EIP-160](https://eips.ethereum.org/EIPS/eip-160) – _ajusta los precios del código de operación "EXP" - hace que sea más difícil ralentizar la red a través de operaciones contractuales computacionalmente costosas._
- [EIP-161](https://eips.ethereum.org/EIPS/eip-161) – _permite la eliminación de cuentas vacías agregadas a los ataques de DOS._
- [EIP-170](https://eips.ethereum.org/EIPS/eip-170) – _cambia el tamaño máximo de código que puede tener un contrato en la cadena de bloques, a 24.576 bytes._

</ExpandableCard>

---

### Tangerine Whistle {#tangerine-whistle}

<Emoji text=":calendar:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <code>18 de octubre de 2016 01:19:31 PM +UTC</code><br /> <Emoji text=":bricks:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> Número de bloque: <a href="https://etherscan.io/block/2463000">2.463.000</a><br /> <Emoji text=":money_bag:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> Precio ETH: 12,50 $ USD<br /> <Emoji text=":desktop_computer:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <a href="https://web.archive.org/web/20161030043727/https://www.ethereum.org/">ethereum.org en waybackmachine</a>

#### Resumen {#tangerine-whistle-summary}

La bifurcación Tangerine Whistle fue la primera respuesta a los ataques de denegación de servicio (DoS) a la red (septiembre/octubre de 2016) e incluyó:

- gestión de problemas urgentes de salud de la red relacionados con códigos de operación de bajo precio.

[Leer el anuncio de Ethereum Foundation](https://blog.ethereum.org/2016/10/18/faq-upcoming-ethereum-hard-fork/)

<ExpandableCard title="EPI de Tangerine Whistle" contentPreview="Official improvements included in this fork.">

- [EIP-150](https://eips.ethereum.org/EIPS/eip-150) – _incrementa el coste de combustible de los códigos de operación que pueden ser usados en ataques de spam._
- [EIP-158](https://eips.ethereum.org/EIPS/eip-158) – _reduce el tamaño del estado eliminando una gran cantidad de cuentas vacías, que fueron colocadas en el estado a muy bajo coste, debido a fallas en versiones anteriores del protocolo Ethereum._

</ExpandableCard>

---

### La bifurcación DAO {#dao-fork}

<Emoji text=":calendar:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <code>20 de julio de 2016 01:20:40 PM +UTC</code><br /> <Emoji text=":bricks:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> Número de bloque: <a href="https://etherscan.io/block/1920000">1.920.000</a><br /> <Emoji text=":money_bag:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> Precio ETH: 12,54 $ USD<br /> <Emoji text=":desktop_computer:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <a href="https://web.archive.org/web/20160803215306/https://ethereum.org/">ethereum.org en waybackmachine</a>

#### Resumen {#dao-fork-summary}

La bifurcación DAO surgió como respuesta al [ataque de DAO de 2016](https://www.coindesk.com/markets/2016/06/25/understanding-the-dao-attack/) donde un contrato [DAO](/glossary/#dao) inseguro fue drenando más de 3,6 millones de ETH en un hackeo. La bifurcación movió los fondos del contrato defectuoso a un [nuevo contrato](https://etherscan.io/address/0xbf4ed7b27f1d666546e30d74d50d173d20bca754) con una única función: retirar. Cualquiera que haya perdido fondos podría retirar 1 ETH por cada 100 tókenes DAO en sus billeteras.

Esta acción fue votada por la comunidad Ethereum. Cualquier titular de ETH pudo votar a través de una transacción en [una plataforma de votación](http://v1.carbonvote.com/). La decisión de bifurcar obtuvo más del 85 % de los votos.

Algunos mineros se negaron a bifurcar porque el incidente de la DAO no era un defecto en el protocolo. Pasaron a formar [Ethereum Classic](https://ethereumclassic.org/).

[Leer el anuncio de Ethereum Foundation](https://blog.ethereum.org/2016/07/20/hard-fork-completed/)

---

### Homestead {#homestead}

<Emoji text=":calendar:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <code>14 de marzo de 2016 06:49:53 PM +UTC</code><br /> <Emoji text=":bricks:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> Número de bloque: <a href="https://etherscan.io/block/1150000">1.150.000</a><br /> <Emoji text=":money_bag:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> Precio ETH: 12,50 $ USD<br /> <Emoji text=":desktop_computer:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <a href="https://web.archive.org/web/20160313203843/https://www.ethereum.org/">ethereum.org en waybackmachine</a>

#### Resumen {#homestead-summary}

La bifurcación Homestead que miró hacia el futuro. Incluyó varios cambios de protocolo y un cambio de red que concedió a Ethereum la capacidad de hacer más actualizaciones de red.

[Leer el anuncio de Ethereum Foundation](https://blog.ethereum.org/2016/02/29/homestead-release/)

<ExpandableCard title="EIP de Homestead" contentPreview="Official improvements included in this fork.">

- [EIP-2](https://eips.ethereum.org/EIPS/eip-2) – _realiza ediciones al proceso de creación de contratos_
- [EIP-7](https://eips.ethereum.org/EIPS/eip-7) – _añade un nuevo código de operación: `DELEGATECALL`_
- [EIP-8](https://eips.ethereum.org/EIPS/eip-8) – _introduce los requisitos de compatibilidad con devp2p hacia delante_

</ExpandableCard>

<Divider />

## 2015 {#2015}

### Deshielo Frontier {#frontier-thawing}

<Emoji text=":calendar:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <code>7 de septiembre de 2015 09:33:09 PM +UTC</code><br /> <Emoji text=":bricks:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> Número de bloque: <a href="https://etherscan.io/block/200000">200.000</a><br /> <Emoji text=":money_bag:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> Precio ETH: 1,24 $ USD<br /> <Emoji text=":desktop_computer:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <a href="https://web.archive.org/web/20150912193811/https://www.ethereum.org/">ethereum.org en waybackmachine</a>

#### Resumen {#frontier-thawing-summary}

La bifurcación de deshielo Frontier elevó el limite del [combustible](/glossary/#gas) de 5.000 por [bloque](/glossary/#block) y fijó el precio por defecto en 51 [gwei](/glossary/#gwei). Esto se permite en las transacciones - transacciones que requieren 21.000 de combustible.

[Leer el anuncio de Ethereum Foundation](https://blog.ethereum.org/2015/08/04/the-thawing-frontier/)

---

### Frontier {#frontier}

<Emoji text=":calendar:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <code>30 de julio de 2015 03:26:13 PM +UTC</code><br /> <Emoji text=":bricks:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> Número de bloque: <a href="https://etherscan.io/block/0">0</a><br /> <Emoji text=":money_bag:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> Precio ETH: N/A<br /> <Emoji text=":desktop_computer:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <a href="https://web.archive.org/web/20150802035735/https://www.ethereum.org/">ethereum.org en waybackmachine</a>

#### Resumen {#frontier-summary}

Frontier fue una implementación en vivo, pero básica, del proyecto Ethereum. Siguió a la exitosa fase de pruebas olímpicas. Estaba destinada a usuarios técnicos, específicamente a desarrolladores. [Los bloques](/glossary/#block) tenían un límite de [gas](/glossary/#gas) de 5.000. Este período de «deshielo» permitió a los mineros iniciar sus operaciones y a los primeros adoptantes instalar sus clientes sin tener que «precipitarse».

[Leer el anuncio de Ethereum Foundation](https://blog.ethereum.org/2015/07/22/frontier-is-coming-what-to-expect-and-how-to-prepare/)

<Divider />

## 2014 {#2014}

### Venta de Ether {#ether-sale}

<Emoji text=":calendar:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> 22 de julio - 2 de septiembre de 2014<br /> <Emoji text=":desktop_computer:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <a href="https://web.archive.org/web/20140804235628/https://www.ethereum.org/">ethereum.org en waybackmachine</a>

Ether salió oficialmente a la venta durante 42 días. Podía comprarse con BTC.

[Leer el anuncio de Ethereum Foundation](https://blog.ethereum.org/2014/07/22/launching-the-ether-sale/)

---

### Protocolo publicado {#yellowpaper}

<Emoji text=":calendar:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> 1 de abril de 2014<br /> <Emoji text=":desktop_computer:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <a href="https://web.archive.org/web/20140509173418/https://www.ethereum.org/">ethereum.org en waybackmachine</a>

El protocolo, escrito por el Dr. Gavin Wood, es una definición técnica del protocolo de Ethereum.

[Ver el protocolo](https://github.com/ethereum/yellowpaper)

<Divider />

## 2013 {#2013}

### Protocolo publicado {#whitepaper}

<Emoji text=":calendar:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> 27 de Noviembre de 2013<br /> <Emoji text=":desktop_computer:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <a href="https://web.archive.org/web/20140208030136/http://www.ethereum.org/">ethereum.org en waybackmachine</a>

Documento introductorio, publicado en el 2013 por Vitalik Buterin, fundador de Ethereum, antes del lanzamiento del proyecto en 2015.

<DocLink to="/whitepaper/">
  Informe
</DocLink>
