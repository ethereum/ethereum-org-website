---
title: Historia de Ethereum
description: Una historia de la blockchain de Ethereum, que incluye los principales hitos, lanzamientos y bifurcaciones.
lang: es
sidebar: true
sidebarDepth: 1
isOutdated: true
---

# La historia de Ethereum {#the-history-of-ethereum}

Una línea de tiempo que incluye todos los principales hitos, bifurcaciones y actualizaciones de la blockchain de Ethereum.

<ExpandableCard title="¿Qué son las bifurcaciones (forks)?" contentPreview="Changes to the rules of the Ethereum protocol which often include planned technical upgrades.">

Las bifurcaciones se producen cuando se precisa realizar actualizaciones técnicas importantes o cambios en la red; normalmente se basan en las propuestas de mejora de Ethererum, es decir, en las EIP (por sus siglas en inglés) y cambian las "reglas" del protocolo.

Cuando se precisan actualizaciones en un software tradicional y controlado centralmente, la empresa publica una nueva versión para el usuario final. Las blockchains funcionan de manera diferente porque no hay propiedad central. [clientes de Ethereum](/developers/docs/nodes-and-clients) deben actualizar su software para implementar las nuevas reglas de la bifurcación. Además de creadores de bloques (los mineros en el mundo de las Pruebas de trabajo y los validadores en el universo de las Pruebas de participación) y los nodos, deben crearse bloques y validarlos con respecto a las reglas nuevas. [Más información sobre los mecanismos de consenso](/developers/docs/consensus-mechanisms/)

Estos cambios en las reglas pueden crear una división temporal de la red. Los bloques nuevos podrían producirse de acuerdo con las reglas nuevas o con las antiguas. Normalmente las bifurcaciones se acuerdan con antelación para que los clientes adopten los cambios a la vez. Además, de este modo las bifurcaciones actualizadas se convertirán en la cadena principal. Sin embargo, en casos excepcionales, los desacuerdos con respecto a las bifurcaciones pueden provocar que la red permanezca dividida. La más notable es la creación de Ethereum Classic con la [bifurcación DAO] (#dao-fork).

</ExpandableCard>

<Divider />

## 2020 {#2020}

### El origen de la cadena de baliza {#beacon-chain-genesis}

<Emoji text=":calendar:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <code>01-12-2020 12:00:35 PM +UTC</code><br /> <Emoji text=":bricks:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> Número de bloque de la cadena de baliza: <a href="https://beaconscan.com/slot/1">1</a><br /> <Emoji text=":money_bag:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> Precio del ETH: $586.23 USD<br /> <Emoji text=":desktop_computer:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <a href="https://web.archive.org/web/20201207184633/https://www.ethereum.org/en/">ethereum.org on waybackmachine</a>

#### Resumen {#beacon-chain-genesis-summary}

La [cadena de baliza](/upgrades/beacon-chain/) ha necesitado 16 384 depósitos de 32 ETH apostados para enviarse de manera segura. Esto sucedió el 27 de noviembre, es decir, la cadena de baliza comenzó a producir bloques el 1 de diciembre de 2020. Es un primer paso importante para lograr la [visión Eth2](/upgrades/vision/).

[Leer la declaración de la Fundación Ethereum](https://blog.ethereum.org/2020/11/27/eth2-quick-update-no-21/)

<DocLink to="/upgrades/beacon-chain/">
  La cadena de baliza
</DocLink>

---

### Contrato de depósito de participación implementado {#staking-deposit-contract}

<Emoji text=":calendar:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <code>14-10-2020 09:22:52 AM +UTC</code><br /> <Emoji text=":bricks:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> Número de bloque: <a href="https://etherscan.io/block/11052984">11052984</a><br /> <Emoji text=":money_bag:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> Precio ETH : $379.04 USD<br /> <Emoji text=":desktop_computer:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <a href="https://web.archive.org/web/20201104235727/https://ethereum.org/en/">ethereum.org en waybackmachine</a>

#### Resumen {#deposit-contract-summary}

El contrato de depósito de participación introdujo la [participación](/glossary/#staking) en el ecosistema de Ethereum. Aunque se trata de un contrato [de red principal](/glossary/#mainnet), tuvo un impacto directo en la cronología para lanzar la [cadena de baliza](/upgrades/beacon-chain/), una importante [actualización de Eth2](/upgrades/).

[Leer la declaración de la Fundación Ethereum](https://blog.ethereum.org/2020/11/04/eth2-quick-update-no-19/)

<DocLink to="/staking/">
  Participación
</DocLink>

---

### Muir Glacier {#muir-glacier}

<Emoji text=":calendar:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <code>20-01-2020 08:30:49 AM +UTC</code><br /> <Emoji text=":bricks:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> Número de bloque: <a href="https://etherscan.io/block/9200000"> 9200000</a><br /> <Emoji text=":money_bag:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> Precio ETH: $127.18 USD<br /> <Emoji text=":desktop_computer:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <a href="https://web.archive.org/web/20200103093618/https://ethereum.org/">ethereum.org on waybackmachine</a>

#### Resumen {#muir-glacier-summary}

La bifurcación Muir Glacier introdujo una demora en la [bomba de dificultad](/glossary/#difficulty-bomb). El aumento de la dificultad del bloque del mecanismo de consenso de la [Prueba de trabajo](/developers/docs/consensus-mechanisms/pow/) amenazó con degradar la usabilidad de Ethereum, debido al incremento de los tiempos de espera para enviar transacciones y utilizar dapps.

- [Leer la declaración de la Fundación Ethereum](https://blog.ethereum.org/2019/12/23/ethereum-muir-glacier-upgrade-announcement/)
- [Leer la explicación del miembro del grupo Ethereum Cat Herder](https://medium.com/ethereum-cat-herders/ethereum-muir-glacier-upgrade-89b8cea5a210)

<ExpandableCard title="EIP de Muir Glacier" contentPreview="Official improvements included in this fork.">

- [EIP-2384](https://eips.ethereum.org/EIPS/eip-2384) – _retrasa la bomba de dificultad para otros 4 000 000 bloques, o aprox. 611 días._

</ExpandableCard>

<Divider />

## 2019 {#2019}

### Estambul {#istanbul}

<Emoji text=":calendar:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <code>08-12-2019 12:25:09 AM +UTC</code><br /> <Emoji text=":bricks:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> Número de bloque: <a href="https://etherscan.io/block/9069000">9069000</a><br /> <Emoji text=":money_bag:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> Precio ETH: $151.06 USD<br /> <Emoji text=":desktop_computer:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <a href="https://web.archive.org/web/20191216101254if*/https://ethereum.org/">ethereum.org en waybackmachine</a>

#### Resumen {#istanbul-summary}

La bifurcación de Estambul:

- Se ha optimizado el coste del [gas](/glossary/#gas) de ciertas acciones en la [EVM](/developers/docs/ethereum-stack/#ethereum-virtual-machine).
- Mejora de la resistencia al ataque de denegación de servicio.
- Realizó soluciones de [escala de capa 2](/developers/docs/layer-2-scaling/) más eficientes basadas en SNARKs y STARKs.
- Habilitó Ethereum y Zcash para que interoperasen.
- Permitió que los contratos introdujeran funciones más creativas.

[Leer la declaración de la Fundación Ethereum](https://blog.ethereum.org/2019/11/20/ethereum-istanbul-upgrade-announcement/)

<ExpandableCard title="EIP de Estambul" contentPreview="Official improvements included in this fork.">

- [EIP-152](https://eips.ethereum.org/EIPS/eip-152) – _permite a Ethereum trabajar con divisas que preservan la privacidad, como Zcash._
- [EIP-1108](https://eips.ethereum.org/EIPS/eip-1108) – _criptografía más barata para mejorar el precio del [gas](/glossary/#gas)._
- [EIP-1344](https://eips.ethereum.org/EIPS/eip-1344) – _protege a Ethereum contra los ataques de repetición, añadiendo `CHAINID` [opcode](/developers/docs/ethereum-stack/#ethereum-virtual-machine)._
- [EIP-1884](https://eips.ethereum.org/EIPS/eip-1884) – _optimizando el código de operación de los precios del combustible basado en el consumo._
- [EIP-2028](https://eips.ethereum.org/EIPS/eip-2028) – _reduce el costo de la CallData para permitir mas información en los bloques – es bueno para el [escalado de capa 2](/developers/docs/layer-2-scaling/)._
- [EIP-2200](https://eips.ethereum.org/EIPS/eip-2200) – _otras alteraciones del precio del gas en el código de operación._

</ExpandableCard>

---

### Constantinopla {#constantinople}

<Emoji text=":calendar:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <code>28-Feb-2019 07:52:04 PM +UTC</code><br /> <Emoji text=":bricks:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> Número de bloque: <a href="https://etherscan.io/block/7280000">7280000</a><br /> <Emoji text=":money_bag:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> Precio ETH: $136.29 USD<br /> <Emoji text=":desktop_computer:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <a href="https://web.archive.org/web/20190415163751/https://www.ethereum.org/">ethereum.org en waybackmachine</a>

#### Resumen {#constantinople-summary}

La bifurcación Constantinopla:

- Te has cerciorado de que la cadena de bloques no se congelara antes de que se implementara la [prueba de participación](#beacon-chain-genesis).
- Optimizado el costo del [gas](/glossary/#gas) de ciertas acciones en la [EVM](/developers/docs/ethereum-stack/#ethereum-virtual-machine).
- Se ha añadido la capacidad de interactuar con direcciones que aún no se han creado.

[Leer la declaración de la Fundación Ethereum](https://blog.ethereum.org/2019/02/22/ethereum-constantinople-st-petersburg-upgrade-announcement/)

<ExpandableCard title="Las EIP Constantinopla" contentPreview="Official improvements included in this fork.">

- [EIP-145](https://eips.ethereum.org/EIPS/eip-145) – _optimiza el costo de ciertas acciones en cadena._
- [EIP-1014](https://eips.ethereum.org/EIPS/eip-1014) – _permite la interacción con direcciones que aún no han sido creadas._
- [EIP-1052](https://eips.ethereum.org/EIPS/eip-1052) – _optimiza el costo de ciertas acciones en cadena._
- [EIP-1234](https://eips.ethereum.org/EIPS/eip-1234) – _se asegura de que la cadena de bloques no se congele antes de la prueba de participación._

</ExpandableCard>

<Divider />

## 2017 {#2017}

### Bizancio {#byzantium}

<Emoji text=":calendar:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <code>16-10-2017 05:22:11 AM +UTC</code><br /> <Emoji text=":bricks:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> Número de bloque: <a href="https://etherscan.io/block/4370000">4370000</a><br /> <Emoji text=":money_bag:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> Precio ETH: $334.23 USD<br /> <Emoji text=":desktop_computer:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <a href="https://web.archive.org/web/20171017201143/https://www.ethereum.org/">ethereum.org en waybackmachine</a>

#### Resumen {#byzantium-summary}

La bifurcación de Bizancio:

- Se redujo la recompensa del [minero](/developers/docs/consensus-mechanisms/pow/mining/) de bloque de 5 a 3 ETH.
- Se ha retrasado un año la [bomba de dificultad](/glossary/#difficulty-bomb).
- Se ha añadido la habilidad para realizar llamadas "sin cambiar de estado" a otros contratos.
- Se han añadido ciertos métodos de criptografía para permitir \[escalado de capa 2]\]((/Developopers/docs/layer-2-scaling/).

[Leer la declaración de la Fundación Ethereum](https://blog.ethereum.org/2017/10/12/byzantium-hf-announcement/)

<ExpandableCard title="EIP de Bizancio" contentPreview="Official improvements included in this fork.">

- [EIP-140](https://eips.ethereum.org/EIPS/eip-140) – _agrega el código de operación `REVERT`._
- [EIP-658](https://eips.ethereum.org/EIPS/eip-658) – _campo de estado agregado a los recibos de transacciones para indicar éxito o fracaso. _
- [EIP-196](https://eips.ethereum.org/EIPS/eip-196) – _agrega curva elíptica y multiplicación escalar para permitir [ZK-Snarks](/developers/docs/layer-2-scaling/#rollups)._
- [EIP-197](https://eips.ethereum.org/EIPS/eip-197) – _agrega curva elíptica y multiplicación escalar para permitir [ZK-Snarks](/developers/docs/layer-2-scaling/#rollups)._
- [EIP-198](https://eips.ethereum.org/EIPS/eip-198) – _habilita la verificación de firma RSA. _
- [EIP-211](https://eips.ethereum.org/EIPS/eip-211) –_agrega soporte para valores de retorno de longitud variable._
- [EIP-214](https://eips.ethereum.org/EIPS/eip-214) – _agrega el código de operación `STATICCALL`, lo que permite llamadas sin cambio de estado a otros contratos._
- [EIP-100](https://eips.ethereum.org/EIPS/eip-100) – _modifica la fórmula de ajuste de la dificultad._
- [EIP-649](https://eips.ethereum.org/EIPS/eip-649) – _retrasa por 1 año la [bomba de dificultad] (/glosary/ #difficulty -bomb) y reduce la recompensa de bloque de 5 a 3 ETH._

</ExpandableCard>

<Divider />

## 2016 {#2016}

### Spurious Dragon {#spurious-dragon}

<Emoji text=":calendar:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <code>22-11-2016 04:15:44 PM +UTC</code><br /> <Emoji text=":bricks:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> Número de bloque: <a href="https://etherscan.io/block/2675000">2675000</a><br /> <Emoji text=":money_bag:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> Precio ETH: $9.84 USD<br /> <Emoji text=":desktop_computer:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <a href="https://web.archive.org/web/20161127154654/https://www.ethereum.org/">ethereum.org en waybackmachine</a>

#### Resumen {#spurious-dragon-summary}

La bifurcación Spurious Dragon fue la segunda respuesta a los ataques de denegación de servicio (DoS) a la red (Septiembre/Octubre 2016) e incluye:

- ajuste de los precios del código de operación para evitar futuros ataques a la red.
- activación de la «deflación» del estado de la blockchain.
- adición de la protección contra ataques de repetición.

[Leer la declaración de la Fundación Ethereum](https://blog.ethereum.org/2016/11/18/hard-fork-no-4-spurious-dragon/)

<ExpandableCard title="EIP de Spurious Dragon" contentPreview="Official improvements included in this fork.">

- [EIP-155](https://eips.ethereum.org/EIPS/eip-155) – _evita que las transacciones de una cadena de Ethereum se transmitan en una cadena alternativa, por ejemplo, una transacción de testnet que se reproduce en la cadena principal de Ethereum. _
- [EIP-160](https://eips.ethereum.org/EIPS/eip-160) – _ajusta los precios del código de operación "EXP" - hace que sea más difícil ralentizar la red a través de operaciones contractuales computacionalmente costosas. _
- [EIP-161](https://eips.ethereum.org/EIPS/eip-161) – _permite la eliminación de cuentas vacías agregadas a los ataques de DOS. _
- [EIP-170](https://eips.ethereum.org/EIPS/eip-170) – _cambia el tamaño máximo de código que puede tener un contrato en la cadena de bloques, a 24576 bytes. _

</ExpandableCard>

---

### Tangerine whistle {#tangerine-whistle}

<Emoji text=":calendar:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <code>18-10-2016 01:19:31 PM +UTC</code><br /> <Emoji text=":bricks:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> Número de bloque: <a href="https://etherscan.io/block/2463000">2463000</a><br /> <Emoji text=":money_bag:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> Precio ETH: $12.50 USD<br /> <Emoji text=":desktop_computer:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <a href="https://web.archive.org/web/20161030043727/https://www.ethereum.org/">ethereum.org en waybackmachine</a>

#### Resumen {#tangerine-whistle-summary}

La bifurcación Tangerine Whistle fue la primera respuesta a los ataques de denegación de servicio (DoS) a la red (Septiembre/Octubre 2016) e incluyó:

- gestión de problemas urgentes de salud de la red relacionados con códigos de operación de bajo precio.

[Leer la declaración de la Fundación Ethereum](https://blog.ethereum.org/2016/10/18/faq-upcoming-ethereum-hard-fork/)

<ExpandableCard title="EPI de Tangerine Whistle" contentPreview="Official improvements included in this fork.">

- [EIP-150](https://eips.ethereum.org/EIPS/eip-150) – _incrementa el costo de combustible de los códigos de operación que pueden ser usados en ataques de spam._
- [EIP-158](https://eips.ethereum.org/EIPS/eip-158) – _reduce el tamaño del estado eliminando una gran cantidad de cuentas vacías, que fueron colocadas en el estado a muy bajo costo debido a fallas en versiones anteriores del protocolo Ethereum._

</ExpandableCard>

---

### La bifurcación DAO {#dao-fork}

<Emoji text=":calendar:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <code>20-07-2016 01:20:40 PM +UTC</code><br /> <Emoji text=":bricks:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> Número de bloque: <a href="https://etherscan.io/block/1920000">1920000</a><br /> <Emoji text=":money_bag:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> Precio ETH: $12.54 USD<br /> <Emoji text=":desktop_computer:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <a href="https://web.archive.org/web/20160803215306/https://ethereum.org/">ethereum.org en waybackmachine</a>

#### Resumen {#dao-fork-summary}

La bifurcación DAO surgió en respuesta al [ataque de DAO del 2016](https://www.coindesk.com/understanding-dao-hack-journalists), donde un contrato inseguro de [DAO](/glossary/#dao) fue drenado por más de 3,6 millones de ETH en un hack. La bifurcación trasladó los fondos del contrato defectuoso hacia un [nuevo contrato](https://etherscan.io/address/0xbf4ed7b27f1d666546e30d74d50d173d20bca754) con una función única: extracción. Cualquiera que haya perdido fondos podría retirar 1 ETH por cada 100 tokens DAO en sus billeteras.

Esta acción fue votada por la comunidad Ethereum. Cualquier poseedor de ETH pudo votar a través de una transacción en [una plataforma de votación](http://v1.carbonvote.com/). La decisión de bifurcar obtuvo más del 85 % de los votos.

Algunos mineros se negaron a bifurcar porque el incidente de la DAO no era un defecto en el protocolo. Pasaron a formar [Ethereum Classic](https://ethereumclassic.org/).

[Leer la declaración de la Fundación Ethereum](https://blog.ethereum.org/2016/07/20/hard-fork-completed/)

---

### Homestead {#homestead}

<Emoji text=":calendar:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <code>14-03-2016 06:49:53 PM +UTC</code><br /> <Emoji text=":bricks:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> Número de bloque: <a href="https://etherscan.io/block/1150000">1150000</a><br /> <Emoji text=":money_bag:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> Precio ETH: $12.50 USD<br /> <Emoji text=":desktop_computer:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <a href="https://web.archive.org/web/20160313203843/https://www.ethereum.org/">ethereum.org en waybackmachine</a>

#### Resumen {#homestead-summary}

La bifurcación Homestead que miró hacia el futuro. Incluyó varios cambios de protocolo y un cambio de red que concedió a Ethereum la capacidad de hacer más actualizaciones de red.

[Leer la declaración de la Fundación Ethereum](https://blog.ethereum.org/2016/02/29/homestead-release/)

<ExpandableCard title="EIP de Homestead" contentPreview="Official improvements included in this fork.">

- [EIP-2](https://eips.ethereum.org/EIPS/eip-2) – _realiza ediciones al proceso de creación de contratos_
- [EIP-7](https://eips.ethereum.org/EIPS/eip-7) – _añade un nuevo código de operación: `DELEGATECALL`_
- [EIP-8](https://eips.ethereum.org/EIPS/eip-8) – _introduce los requisitos de compatibilidad con devp2p hacia delante_

</ExpandableCard>

<Divider />

## 2015 {#2015}

### Frontier thawing {#frontier-thawing}

<Emoji text=":calendar:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <code>07-09-2015 09:33:09 PM +UTC</code><br /> <Emoji text=":bricks:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> Número de bloque: <a href="https://etherscan.io/block/200000">200000</a><br /> <Emoji text=":money_bag:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> Precio ETH: $1.24 USD<br /> <Emoji text=":desktop_computer:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <a href="https://web.archive.org/web/20150912193811/https://www.ethereum.org/">ethereum.org en waybackmachine</a>

#### Resumen {#frontier-thawing-summary}

La bifuración frontier thawing elevó el limite del [combustible](/glossary/#gas) de 5000 por [bloque](/glossary/#block) y fijó el precio por defecto en 51 [gwei](/glossary/#gwei). Esto está permitido para las transacciones: Las transacciones requieren 21 000 de combustible.

[Leer la declaración de la Fundación Ethereum](https://blog.ethereum.org/2015/08/04/the-thawing-frontier/)

---

### Frontier {#frontier}

<Emoji text=":calendar:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <code>30-Jul-2015 03:26:13 PM +UTC</code><br /> <Emoji text=":bricks:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> Número de bloque: <a href="https://etherscan.io/block/0">0</a><br /> <Emoji text=":money_bag:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> Precio ETH: N/A<br /> <Emoji text=":desktop_computer:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <a href="https://web.archive.org/web/20150802035735/https://www.ethereum.org/">ethereum.org en waybackmachine</a>

#### Resumen {#frontier-summary}

Frontier fue una implementación en vivo, pero básica, del proyecto Ethereum. Siguió a la exitosa fase de pruebas olímpicas. Estaba destinado a usuarios técnicos, específicamente desarrolladores. [Los bloques](/glossary/#block) tenían un límite de [gas](/glossary/#gas) de 5000. Este período de "deshielo" permitió a los mineros dar inicio a sus operaciones y a los primeros adoptantes instalar sus clientes sin tener que “precipitarse”.

[Leer la declaración de la Fundación Ethereum](https://blog.ethereum.org/2015/07/22/frontier-is-coming-what-to-expect-and-how-to-prepare/)

<Divider />

## 2014 {#2014}

### Venta de Ether {#ether-sale}

<Emoji text=":calendar:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> 22 de julio - 02 de septiembre, 2014<br /> <Emoji text=":desktop_computer:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <a href="https://web.archive.org/web/20140804235628/https://www.ethereum.org/">ethereum.org en waybackmachine</a>

Ether salió oficialmente a la venta durante 42 días. Podía ser comprado con BTC.

[Lea el anuncio de la Fundación Ethereum](https://blog.ethereum.org/2014/07/22/launching-the-ether-sale/)

---

### Protocolo publicado {#yellowpaper}

<Emoji text=":calendar:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> 01 de abril, 2014<br /> <Emoji text=":desktop_computer:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <a href="https://web.archive.org/web/20140509173418/https://www.ethereum.org/">ethereum.org en waybackmachine</a>

El Yellow Paper, escrito por el Dr. Gavin Wood, es una definición técnica del protocolo de Ethereum.

[Ver el protocolo](https://github.com/ethereum/yellowpaper)

<Divider />

## 2013 {#2013}

### Protocolo publicado {#whitepaper}

<Emoji text=":calendar:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> 27 de Noviembre de 2013<br /> <Emoji text=":desktop_computer:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <a href="https://web.archive.org/web/20140208030136/http://www.ethereum.org/">ethereum.org en waybackmachine</a>

Documento introductorio, publicado en el 2013 por Vitalik Buterin, fundador de Ethereum, antes del lanzamiento del proyecto en 2015.

<DocLink to="/whitepaper/">
  Papel en blanco
</DocLink>
