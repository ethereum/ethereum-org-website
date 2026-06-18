---
title: Restaking
metaTitle: ¿Qué es el restaking? | Beneficios y uso del restaking
description: Usa ETH en staking para asegurar otros servicios descentralizados y ganar recompensas adicionales.
lang: es
template: use-cases
image: /images/use-cases/restaking.png
alt: Una representación visual del restaking en Ethereum.
sidebarDepth: 2
summaryPoints:
  - "Usa ETH en staking para asegurar otros servicios descentralizados y ganar recompensas adicionales."
buttons:
  - content: ¿Qué es el restaking?
    toId: what-is-restaking
  - content: ¿Cómo funciona?
    toId: how-does-restaking-work
    isSecondary: false
---

La red Ethereum asegura miles de millones de dólares en valor las 24 horas del día, los 365 días del año. ¿Cómo?

Personas de todo el mundo bloquean (o "hacen staking" de) [ether (ETH)](/what-is-ether/) en contratos inteligentes para ejecutar el software que procesa las transacciones de Ethereum y asegura la red Ethereum. A cambio, son recompensados con más ETH.

El restaking es una tecnología creada para que los [participantes (stakers)](/staking/) extiendan esta seguridad a otros servicios, aplicaciones o redes. A cambio, ganan recompensas de restaking adicionales. Sin embargo, también exponen su ETH en staking a un mayor riesgo.

**El restaking explicado en 18 minutos**

<VideoWatch slug="restaking-explained" />

## ¿Qué es el restaking? {#what-is-restaking}

El restaking ocurre cuando los participantes usan su ETH ya en staking para asegurar otros servicios descentralizados. A cambio, los restakers pueden obtener recompensas adicionales de esos otros servicios además de sus recompensas habituales por hacer staking de ETH.

Los servicios descentralizados asegurados mediante restaking se conocen como "Servicios Validados Activamente" (AVS, por sus siglas en inglés).
De la misma manera que muchos participantes de ETH ejecutan software de validación de Ethereum, muchos restakers ejecutan software especializado de AVS.

<br/>
<Alert className="justify-between">
<AlertEmoji text=":bulb:"/>
<AlertContent>
<AlertDescription>
  <p className="mt-0"><strong>Es bueno saberlo</strong></strong>
  <p className="mt-2">Aunque "Servicios Validados Activamente" (AVS) es el término más común, diferentes plataformas de restaking pueden usar otros nombres para los servicios descentralizados que ayudan a asegurar, como "Servicios Validados Autónomamente", "Servicios Seguros Distribuidos" o "Redes".</p>
</AlertDescription>
</AlertContent>
</Alert>

## Staking vs. restaking {#staking-vs-restaking}

| Staking                        | Restaking                                         |
| ------------------------------ | ------------------------------------------------- |
| Gana recompensas en ETH               | Gana recompensas en ETH + recompensas de AVS                    |
| Asegura la red Ethereum   | Asegura la red Ethereum + AVS               |
| Sin mínimo de ETH                 | Sin mínimo de ETH                                    |
| Nivel de riesgo bajo                 | Nivel de riesgo de bajo a alto                            |
| El tiempo de retiro depende de la cola | El tiempo de retiro depende de la cola + período de desvinculación |

## ¿Por qué necesitamos el restaking? {#why-do-we-need-restaking}

Imagina dos mundos; uno con restaking y otro sin él.

 <TabbedSection />

En este mundo con restaking, tanto el AVS como el participante se benefician de poder encontrarse y cambiar seguridad por recompensas adicionales.

<br/>

<Alert className="justify-between">
<AlertEmoji text=":bulb:"/>
<AlertContent>
<AlertDescription>
  <p className="mt-0"><strong>Beneficio adicional del restaking</strong></strong>
  <p className="mt-2">Los AVS pueden destinar todos sus recursos a construir y comercializar sus servicios, en lugar de distraerse con la descentralización y la seguridad.</p>
</AlertDescription>
</AlertContent>
</Alert>

## ¿Cómo funciona el restaking? {#how-does-restaking-work}

Hay varias entidades involucradas en el restaking; cada una de ellas juega un papel importante.

| **Término**                | **Descripción**                                                                                                                                                                                                                                                                                                                                   |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Plataformas de restaking** | Una plataforma de restaking es un servicio que conecta AVS, participantes de ETH y operadores. Construyen aplicaciones descentralizadas para que los participantes hagan restaking de su ETH, y mercados donde los participantes, los AVS y los operadores pueden encontrarse.                                                                                                                |
| **Restakers nativos**    | Las personas que hacen staking de su ETH ejecutando sus propios validadores de Ethereum pueden conectar su ETH en staking a una plataforma de restaking, incluyendo EigenLayer y otras, para ganar recompensas de restaking además de las recompensas del validador de ETH.                                                                                                                             |
| **Restakers líquidos**    | Las personas que hacen staking de su ETH a través de un proveedor de staking líquido de terceros, como Lido o Rocket Pool, obtienen tokens de staking líquido (LST) que representan su ETH en staking. Pueden hacer restaking de estos LST para ganar recompensas de restaking mientras mantienen su ETH original en staking.                                                                                  |
| **Operadores**           | Los operadores ejecutan el software de restaking de los AVS, realizando las tareas de validación que cada AVS requiere. Los operadores suelen ser proveedores de servicios profesionales que garantizan aspectos como el tiempo de actividad y el rendimiento. Al igual que los restakers que no son operadores, los operadores usan ETH en staking para asegurar los AVS, pero los operadores también reciben recompensas adicionales a cambio de su trabajo. |
| **AVS**                | Estos son los servicios descentralizados (como oráculos de precios, puentes de tokens y sistemas de datos) que reciben seguridad de los restakers y ofrecen recompensas en tokens a cambio.                                                                                                                                                                              |

<br/>

<Alert className="justify-between">
<AlertEmoji text=":bulb:"/>
<AlertContent>
<AlertDescription>
  <p className="mt-0"><strong>Es bueno saberlo</strong></strong>
  <p className="mt-2">Los restakers nativos y líquidos a menudo delegan su ETH en staking a un operador, en lugar de ejecutar ellos mismos el software para asegurar los AVS.</p>
  <p className="mt-2">De esta manera, no necesitan preocuparse por los complicados requisitos técnicos de los AVS, aunque reciben una tasa de recompensa menor que los operadores.</p>
</AlertDescription>
</AlertContent>
</Alert>

## ¿Cuáles son algunos ejemplos de restaking? {#what-are-some-examples-of-restaking}

Aunque es una idea novedosa, han surgido algunos proyectos para explorar las posibilidades del restaking.

<RestakingList/>

<br/>

<Alert variant="warning" className="justify-between">
<AlertEmoji text=":bulb:"/>
<AlertContent>
<AlertDescription>
  <p className="mt-0"><strong>Alerta de término incorrecto</strong></strong>
  <p className="mt-2">Algunas personas confunden el "restaking" con los préstamos y la toma de préstamos de LST en las finanzas descentralizadas (DeFi). Ambos ponen a trabajar el ETH en staking, pero el restaking significa asegurar AVS, no solo ganar rendimiento sobre los LST.</p>
</AlertDescription>
</AlertContent>
</Alert>

## ¿Cuánto puedo ganar con el restaking? {#how-much-can-i-make-from-restaking}

Aunque los AVS ofrecen diferentes tasas, los tokens de restaking líquido (LRT) como eETH te dan una idea de cuánto puedes ganar. De la misma manera que obtienes LST como stETH por hacer staking de tu ETH, puedes obtener LRT como eETH por hacer restaking de stETH. Estos tokens ganan recompensas de staking de ETH y de restaking.

**Es importante reconocer los riesgos del restaking. Las recompensas potenciales pueden ser atractivas, pero no están libres de riesgos.**

## ¿Cuáles son los riesgos del restaking? {#what-are-the-risks-of-restaking}

| **Riesgos**                     | **Descripción**                                                                                                                                                |
| ----------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Penalizaciones (o "recorte")** | Al igual que en el staking de ETH, si los restakers/operadores se desconectan, censuran mensajes o intentan corromper la red, su participación puede sufrir un recorte (quemarse) parcial o totalmente. |
| **Centralización**            | Si unos pocos operadores dominan la mayor parte del restaking, podrían tener una gran influencia sobre los restakers, los AVS e incluso las plataformas de restaking.                             |
| **Reacciones en cadena**           | Si un restaker sufre un recorte mientras asegura múltiples AVS, esto podría reducir la seguridad de los otros AVS, haciéndolos vulnerables.                             |
| **Acceso inmediato a los fondos** | Hay un tiempo de espera (o "período de desvinculación") para retirar el ETH en restaking, por lo que es posible que no siempre tengas acceso inmediato.                                       |

<br/>

<Alert className="justify-between">
<AlertEmoji text=":bulb:"/>
<AlertContent>
<AlertDescription>
  <p className="mt-0"><strong>El cofundador de Ethereum está escribiendo…</strong></strong>
  <p className="mt-2">
    Vitalik, el cofundador de Ethereum, advirtió sobre los riesgos potenciales del restaking en una publicación de blog de 2021 llamada <a href="https://vitalik.eth.limo/general/2023/05/21/dont_overload.html">Don't Overload Consensus (No sobrecargues el consenso).</a>
  </a>
</AlertDescription>
</AlertContent>
</Alert>

## ¿Cómo empezar con el restaking? {#how-to-get-started-with-restaking}

| 🫡 Principiantes                                                    | 🤓 Usuarios avanzados                                                                     |
| --------------------------------------------------------------- | ------------------------------------------------------------------------------------- |
| 1. Haz staking de ETH en plataformas como Lido o Rocket Pool para obtener LST. | 1. Haz staking de tu ETH como validador en Ethereum.                                         |
| 2. Usa esos LST para empezar a hacer restaking en un servicio de restaking.    | 2. Compara servicios de restaking como EigenLayer, Symbiotic y otros.                  |
|                                                                 | 3. Sigue las instrucciones para conectar tu validador al contrato inteligente de restaking. |

<br/>

<Alert className="justify-between">
<AlertEmoji text=":eyes:"/>
<AlertContent>
<AlertDescription>
  <p className="mt-0"><strong>Staking de Ethereum:</strong> ¿Cómo funciona?</strong>
  <ButtonLink href="/staking/">
    Más información
  </ButtonLink>
</AlertDescription>
</AlertContent>
</Alert>

## Avanzado {#advanced}

<VideoWatch slug="eigenlayer-permissionless-features" />

## Lecturas adicionales {#further-reading}

1. [ethereum.org: Guía de staking de ETH](/staking/)
2. [Ledger Academy: ¿Qué es el restaking de Ethereum?](https://www.ledger.com/academy/what-is-ethereum-restaking)
3. [ConsenSys: Explicación del protocolo de restaking descentralizado de Ethereum EigenLayer](https://consensys.io/blog/eigenlayer-decentralized-ethereum-restaking-protocol-explained)
4. [Vitalik Buterin: No sobrecargues el consenso de Ethereum](https://vitalik.eth.limo/general/2023/05/21/dont_overload.html)
5. [Cointelegraph: ¿Qué es EigenLayer? Explicación del protocolo de restaking de Ethereum](https://cointelegraph.com/explained/what-is-eigenlayer-ethereums-restaking-protocol-explained)
6. [a16z crypto research: EigenLayer: Adición de características sin permisos a Ethereum con Sreeram Kannan](https://www.youtube.com/watch?v=-V-fG4J1N_M)
7. [Junion: EigenLayer explicado: ¿Qué es el restaking?](https://www.youtube.com/watch?v=5r0SooSQFJg)
8. [The Block: Panel de datos de restaking](https://www.theblock.co/data/decentralized-finance/restaking)