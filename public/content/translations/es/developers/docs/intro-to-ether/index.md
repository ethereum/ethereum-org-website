---
title: Introducción técnica al ether
description: Una introducción para desarrolladores a la criptomoneda ethereum
lang: es
---

## Requisitos previos {#prerequisites}

Para ayudarle a comprender mejor esta página, le recomendamos que primero lea [Introducción a Ethereum](/developers/docs/intro-to-ethereum/).

## ¿Qué es una criptomoneda? {#what-is-a-cryptocurrency}

Una criptomoneda es un medio de intercambio asegurado por un libro mayor basado en cadenas de bloques.

Un medio de intercambio es cualquier elemento que esté aceptado ampliamente como pago de bienes y servicios. Por otro lado, un libro mayor es un almacén de datos que lleva el registro de las transacciones. La tecnología de cadenas de bloques permite a los usuarios realizar transacciones en el libro mayor sin depender de un tercero para mantenerlo.

La primera criptomoneda fue Bitcoin, creada por Satoshi Nakamoto. Desde el lanzamiento de Bitcoin en 2009, muchas personas han creado miles de criptomonedas a través de muchas cadenas de bloques.

## ¿Qué es el ether? {#what-is-ether}

**Ether (ETH)** es la criptomoneda que se utiliza para muchas cosas en la red Ethereum. Fundamentalmente, es la única forma de pago aceptable para las comisiones de transacción y, después de [La Fusión](/roadmap/merge), se requiere ether para validar y proponer bloques en la red principal. El ether también se utiliza como forma principal de colateral en los mercados de préstamos de [DeFi](/defi), como unidad de cuenta en los mercados de NFT, como pago por la prestación de servicios o la venta de bienes del mundo real, y mucho más.

Ethereum permite a los desarrolladores crear [**aplicaciones descentralizadas (dapps)**](/developers/docs/dapps), las cuales comparten un fondo común de potencia de cómputo. Este grupo compatido es finito, por lo que Ethereum necesita un mecanismo para determinar quién lo puede utilizar. De lo contrario, una DApp podría consumir todos los recursos de la red de manera accidental o maliciosa, con lo que se bloquearía el acceso a los demás.

La criptomoneda Ether incluye un mecanismo de fijación de precios para determinar el poder de computación de Ethereum. Cuando los usuarios quieren realizar una transacción, deben pagar Ether para que su transacción sea reconocida en la cadena de bloques. Estos costes de uso se conocen como [tarifas de gas](/developers/docs/gas/), y la tarifa de gas depende de la cantidad de potencia de cómputo necesaria para ejecutar la transacción y de la demanda de potencia de cómputo en toda la red en ese momento.

Por lo tanto, incluso si una DApp maliciosa ejecuta un bucle infinito, se llegaría a un punto en el que la transacción carecería de Ether y terminaría, lo que permitiría que la red vuelva a la normalidad.

Es [común confundir](https://abcnews.go.com/Business/bitcoin-slumps-week-low-amid-renewed-worries-chinese/story?id=78399845) Ethereum y ether; cuando la gente se refiere al "precio de Ethereum", está describiendo el precio del ether.

## Acuñación de ether {#minting-ether}

El proceso de minteado se produce cuando se crea nuevo ether en el libro mayor de Ethereum. El protocolo base de Ethereum se encarga de crear nuevo ether. Un usuario no puede crear ether.

Ether se acuña como recompensa por cada bloque propuesto y en cada punto de control de época por otra actividad de validador relacionada con alcanzar el consenso. La cantidad total emitida depende del número de validadores y de cuántos eth han apostado. Esta emisión total se divide por igual entre validadores en el caso hipotético de que todos los validadores sean honestos y estén en línea, pero en realidad, varía en función del rendimiento del validador. Aproximadamente 1/8 de la emisión total va a parar al proponedor de bloques; el resto se distribuye a través de los demás validadores. Los que proponen bloques también reciben consejos de las comisiones de transacción e ingresos relacionados con MEV, aunque estos provienen de los ethers reciclados, no de los de nueva emisión.

## Quema de ether {#burning-ether}

Además de crear ether a través de las recompensas por bloque, el ether puede destruirse mediante un proceso llamado «quema». Cuando se quema el ether, este se elimina de la circulación de forma permanente.

La quema de ether se produce en cada transacción en Ethereum. Cuando los usuarios pagan por sus transacciones, se destruye una comisión de gas base, establecida por la red, de acuerdo con la demanda transaccional. Esto, junto con tamaños de bloque variables y una tarifa de gas máxima, simplifica la estimación de la comisión de transacción en Ethereum. Cuando la demanda de la red es alta, los [bloques](https://eth.blockscout.com/block/22580057) pueden quemar más ether del que acuñan, lo que compensa eficazmente la emisión de ether.

Quitar la comnisión base impide que los productores de bloques puedan manipular las transacciones. Por ejemplo, si los mineros obtuvieran la tarifa base, podrían incluir sus propias transacciones de forma gratuita y aumentar la tarifa base para todos los demás. Por otra parte, podrían reembolsar la tarifa base a algunos usuarios fuera de la cadena, lo que conduciría a un mercado de tarifas de transacción más opaco y complejo.

## Denominaciones de ether {#denominations}

Dado que muchas de las transacciones en Ethereum tienen un valor pequeño, el ether tiene varias denominaciones que pueden ser referenciadas como unidades de cuenta más pequeñas. De todas estas denominaciones, Wei y gwei son particularmente importantes.

El wei es la cantidad de ether más pequeña posible y, como resultado, muchas implementaciones técnicas, como el [Ethereum Yellowpaper](https://ethereum.github.io/yellowpaper/paper.pdf), basan todos los cálculos en wei.

El Gwei, abreviación de giga-wei, se utiliza para describir los costes del gas en Ethereum.

| Denominación | Valor en ether   | Uso común                                  |
| ------------ | ---------------- | ------------------------------------------ |
| Wei          | 10<sup>-18</sup> | Implementaciones técnicas                  |
| Gwei         | 10<sup>-9</sup>  | Comisiones de gas legibles por los humanos |

## Transferencia de ether {#transferring-ether}

Cada transacción en Ethereum contiene un campo `value` que especifica la cantidad de ether a transferir, denominada en wei, para enviar desde la dirección del emisor a la del destinatario.

Cuando la dirección del destinatario es un [contrato inteligente](/developers/docs/smart-contracts/), este ether transferido puede utilizarse para pagar el gas cuando el contrato inteligente ejecuta su código.

[Más información sobre las transacciones](/developers/docs/transactions/)

## Consulta de ether {#querying-ether}

Los usuarios pueden consultar el saldo de ether de cualquier [cuenta](/developers/docs/accounts/) inspeccionando el campo `balance` de la cuenta, que muestra las tenencias de ether denominadas en wei.

[Etherscan](https://etherscan.io) y [Blockscout](https://eth.blockscout.com) son herramientas populares para inspeccionar los saldos de las direcciones a través de aplicaciones web. Por ejemplo, [esta página de Blockscout](https://eth.blockscout.com/address/0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe) muestra el saldo de la Ethereum Foundation. Los saldos de la cuenta también se pueden consultar usando carteras o directamente haciendo peticiones a nodos.

## Lecturas adicionales {#further-reading}

- [Definición de ether y Ethereum](https://www.cmegroup.com/education/courses/introduction-to-ether/defining-ether-and-ethereum.html) – _CME Group_
- [Libro blanco de Ethereum](/whitepaper/): la propuesta original para Ethereum. En este documento se incluyen una descripción de ether y los motivos por los que se creó.
- [Calculadora de gwei](https://www.alchemy.com/gwei-calculator): utilice esta calculadora de gwei para convertir fácilmente wei, gwei y ether. Simplemente añada cualquier cantidad de wei, gwei o ETH y calcule automáticamente la conversión.

_¿Conoce algún recurso de la comunidad que le haya sido de ayuda? ¡Edite esta página y agréguela!_
