---
title: Restaking
metaTitle: ¿Qué es el restaking? | Beneficios y uso del restaking
description: Utilice ETH en staking para asegurar otros servicios descentralizados y obtenga recompensas adicionales.
lang: es
template: use-cases
emoji: ":recycle:"
image: /images/use-cases/restaking.png
alt: Una representación visual del restaking en Ethereum.
sidebarDepth: 2
summaryPoint1: Utilice ETH en staking para asegurar otros servicios descentralizados y obtenga recompensas adicionales.
buttons:
  - content: ¿Qué es el restaking?
    toId: que-es-el-restaking
  - content: ¿Cómo funciona?
    toId: como-funciona-el-restaking
    isSecondary: false
---

La red de Ethereum protege miles de millones de dólares en valor las 24 horas del día, los 365 días del año. ¿Cómo?

Personas de todo el mundo bloquean (o "hacen staking" de) [ether (ETH)](/eth/) en contratos inteligentes para ejecutar el software que procesa las transacciones de Ethereum y protege la red de Ethereum. A cambio, son recompensados con más ETH.

Restaking es una tecnología creada para que los [stakers](/staking/) extiendan esta seguridad a otros servicios, aplicaciones o redes. A cambio, obtienen recompensas adicionales de restaking. Sin embargo, también exponen su ETH en staking a un mayor riesgo.

**Restaking explicado en 18 minutos**

<YouTube id="rOJo7VwPh7I" />

## ¿Qué es el restaking? {#que-es-el-restaking}

El restaking es cuando los stakers usan su ETH ya en staking para asegurar otros servicios descentralizados. A cambio, los restakers pueden obtener recompensas adicionales de esos otros servicios además de sus recompensas normales por staking de ETH.

Los servicios descentralizados asegurados mediante restaking se conocen como "Servicios Validados Activamente" (AVS, por sus siglas en inglés).
De la misma manera que muchos stakers de ETH ejecutan el software de validación de Ethereum, muchos restakers ejecutan un software AVS especializado.

<br/>
<Alert className="justify-between">
<AlertEmoji text=":bulb:"/>
<AlertContent>
<AlertDescription>
  <p className="mt-0"><strong>Bueno saber</strong></p>
  <p className="mt-2">Si bien "Servicios Validados Activamente" (AVS) es el nombre más común, diferentes plataformas de restaking pueden usar otros nombres para los servicios descentralizados que ayudan a asegurar, como "Servicios Validados Autonómamente", "Servicios de Seguridad Distribuida" o "Redes".</p>
</AlertDescription>
</AlertContent>
</Alert>

## Staking vs restaking {#staking-vs-restaking}

| Staking (apostar)   | Restaking                                                          |
| -------------------------------------- | ------------------------------------------------------------------ |
| Obtenga recompensas en ETH             | Obtenga recompensas en ETH + recompensas de AVS                    |
| Asegura la red de Ethereum             | Asegura la red de Ethereum + AVSs                                  |
| Sin mínimo de ETH                      | Sin mínimo de ETH                                                  |
| Nivel de riesgo bajo                   | Nivel de riesgo de bajo a alto                                     |
| El tiempo de retiro depende de la cola | El tiempo de retiro depende de la cola + período de desvinculación |

## ¿Por qué necesitamos el restaking? {#por-que-necesitamos-el-restaking}

Imagine dos mundos: uno con restaking y otro sin él.

 <TabbedSection />

En este mundo con restaking, tanto el AVS como el staker se benefician al poder encontrarse y negociar seguridad a cambio de recompensas adicionales.

<br/>

<Alert className="justify-between">
<AlertEmoji text=":bulb:"/>
<AlertContent>
<AlertDescription>
  <p className="mt-0"><strong>Beneficio adicional del restaking</strong></p>
  <p className="mt-2">Los AVS pueden dedicar todos sus recursos a desarrollar y comercializar sus servicios, en vez de distraerse con la descentralización y la seguridad.</p>
</AlertDescription>
</AlertContent>
</Alert>

## ¿Cómo funciona el restaking? {#como-funciona-el-restaking}

Hay varias entidades involucradas en el restaking: cada una cumple un papel importante.

| **Término**                  | **Descripción**                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| ---------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Plataformas de restaking** | Una plataforma de restaking es un servicio que conecta AVSs, stakers de ETH y operadores. Construyen aplicaciones descentralizadas para que los stakers hagan restaking de su ETH, y marketplaces donde stakers, AVSs y operadores pueden encontrarse.                                                                                                                                                                                                       |
| **Restakers nativos**        | Las personas que hacen staking de su ETH ejecutando sus propios validadores de Ethereum pueden conectar su ETH en staking a una plataforma de restaking, incluyendo EigenLayer y otras, para ganar recompensas de restaking además de las recompensas de su validador de ETH.                                                                                                                                                                                                |
|                              |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| **Restakers líquidos**       | Las personas que hacen staking de su ETH a través de un proveedor de staking líquido de terceros, como Lido o Rocket Pool, reciben Tokens de Staking Líquidos (LST) que representan su ETH en staking. Pueden hacer restaking con estos LST para obtener recompensas de restaking mientras mantienen su ETH original en staking.                                                                                                          |
|                              |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| **Operadores**               | Los operadores ejecutan el software de restaking de los AVSs, realizando las tareas de validación que cada AVS requiere. Los operadores normalmente son proveedores de servicios profesionales que garantizan aspectos como la disponibilidad y el rendimiento. Al igual que los restakers que no son operadores, los operadores usan ETH en staking para asegurar AVSs, pero además reciben recompensas adicionales a cambio de su trabajo. |
|                              |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| **AVSs**                     | Estos son los servicios descentralizados —como oráculos de precios, puentes de tokens y sistemas de datos— que reciben seguridad de los restakers y ofrecen recompensas en tokens a cambio.                                                                                                                                                                                                                                                                                  |

<br/>

<Alert className="justify-between">
<AlertEmoji text=":bulb:"/>
<AlertContent>
<AlertDescription>
  <p className="mt-0"><strong>Bueno saber</strong></p>
  <p className="mt-2">Los restakers nativos y líquidos suelen delegar su ETH en staking a un operador, en vez de ejecutar ellos mismos el software para asegurar AVSs.</p>
  <p className="mt-2">De esta manera, no tienen que preocuparse por los requisitos técnicos complejos de los AVSs, aunque reciben una tasa de recompensa menor que los operadores.</p>
</AlertDescription>
</AlertContent>
</Alert>

## ¿Cuáles son algunos ejemplos de restaking? {#ejemplos-de-restaking}

Aunque es una idea novedosa, han surgido algunos proyectos que exploran las posibilidades del restaking.

<RestakingList/>

<br/>

<Alert variant="warning" className="justify-between">
<AlertEmoji text=":bulb:"/>
<AlertContent>
<AlertDescription>
  <p className="mt-0"><strong>Alerta de término incorrecto</strong></p>
  <p className="mt-2">Algunas personas confunden "restaking" con prestar y pedir prestados LSTs en DeFi. Ambos ponen a trabajar el ETH en staking, pero el restaking significa asegurar AVSs, no solo obtener rendimiento sobre los LSTs.</p>
</AlertDescription>
</AlertContent>
</Alert>

## ¿Cuánto puedo ganar con el restaking? {#cuanto-puedo-ganar-con-el-restaking}

Aunque los AVS ofrecen diferentes tasas, los Tokens Líquidos de Restaking (LRT) como eETH le dan una idea de cuánto puede ganar. De la misma forma en que recibe LST como stETH por hacer staking de su ETH, puede recibir LRT como eETH por hacer restaking de stETH. Estos tokens generan recompensas tanto por staking de ETH como por restaking.

**Es importante tener en cuenta los riesgos del restaking. Las recompensas potenciales pueden ser atractivas, pero no están libres de riesgo.**

## ¿Cuáles son los riesgos del restaking? {#riesgos-del-restaking}

| **Riesgos**                                          | **Descripción**                                                                                                                                                                                                                |
| ---------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Penalizaciones (o "slashing")** | Al igual que en el staking de ETH, si los restakers/operadores se desconectan, censuran mensajes o intentan corromper la red, su stake puede ser penalizado (quemado) total o parcialmente. |
| **Centralización**                                   | Si pocos operadores dominan la mayor parte del restaking, podrían tener una gran influencia sobre los restakers, los AVSs e incluso las plataformas de restaking.                                              |
| **Reacciones en cadena**                             | Si un restaker es penalizado mientras asegura múltiples AVSs, esto podría reducir la seguridad de los demás AVSs, haciéndolos vulnerables.                                                                     |
| **Acceso inmediato a los fondos**                    | Existe un tiempo de espera (o "período de desvinculación") para retirar el ETH restaurado, por lo que no siempre podrá acceder de inmediato.                                                |

<br/>

<Alert className="justify-between">
<AlertEmoji text=":bulb:"/>
<AlertContent>
<AlertDescription>
  <p className="mt-0"><strong>El cofundador de Ethereum está escribiendo…</strong></p>
  <p className="mt-2">
    Vitalik, el cofundador de Ethereum, advirtió sobre los riesgos potenciales del restaking en una publicación del blog de 2021 llamada <a href = "https://vitalik.eth.limo/general/2023/05/21/dont_overload.html"> Don't Overload Consensus. </a>  
</p>
</AlertDescription>
</AlertContent>
</Alert>

## ¿Cómo empezar con el restaking? {#como-empezar-con-el-restaking}

| 🫡 Principiantes                                                                                                         | 🤓 Usuarios avanzados                                                                                                       |
| ------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------- |
| 1. Haga staking de ETH en plataformas como Lido o Rocket Pool para obtener LSTs.  | 1. Haga staking de su ETH como validador en Ethereum.                                |
| 2. Utilice esos LSTs para comenzar a hacer restaking en un servicio de restaking. | 2. Compare servicios de restaking como EigenLayer, Symbiotic y otros.                |
|                                                                                                                          | 3. Siga las instrucciones para conectar su validador al smart contract de restaking. |

<br/>

<Alert className="justify-between">
<AlertEmoji text=":eyes:"/>
<AlertContent>
<AlertDescription>
  <p className="mt-0"><strong>Staking en Ethereum :</strong> ¿Cómo funciona?</p>
  <ButtonLink href="/staking/">
    Más información
  </ButtonLink>
</AlertDescription>
</AlertContent>
</Alert>

## Avanzado {#advanced}

<YouTube id="-V-fG4J1N_M" />

## Lecturas adicionales {#further-reading}

1. [ethereum.org - Guía de stake de ETH](https://ethereum.org/en/staking/)
2. [Ledger Academy - ¿Qué es el restaking en Ethereum?](https://www.ledger.com/academy/what-is-ethereum-restaking)
3. [Consensys - EigenLayer: Protocolo de restaking descentralizado de Ethereum explicado](https://consensys.io/blog/eigenlayer-decentralized-ethereum-restaking-protocol-explained)
4. [Vitalik Buterin - No sobrecargues el consenso de Ethereum](https://vitalik.eth.limo/general/2023/05/21/dont_overload.html)
5. [Cointelegraph - ¿Qué es EigenLayer? El protocolo de restaking de Ethereum explicado](https://cointelegraph.com/explained/what-is-eigenlayer-ethereums-restaking-protocol-explained)
6. [a16z crypto research - EigenLayer: Permiso para añadir funciones a Ethereum con Sreeram Kannan](https://www.youtube.com/watch?v=-V-fG4J1N_M)
7. [Junion - EigenLayer Explicado: ¿Qué es el restaking?](https://www.youtube.com/watch?v=5r0SooSQFJg)
8. [The Block - Restaking Data Dash](https://www.theblock.co/data/decentralized-finance/restaking)
