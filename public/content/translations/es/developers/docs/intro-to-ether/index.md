---
title: Introducción técnica a ether
description: Una introducción para desarrolladores a la criptomoneda ether.
lang: es
---

## Requisitos previos {#prerequisites}

Para ayudarle a comprender mejor esta página, le recomendamos que primero lea la [Introducción a Ethereum](/developers/docs/intro-to-ethereum/).

## ¿Qué es una criptomoneda? {#what-is-a-cryptocurrency}

Una criptomoneda es un medio de intercambio asegurado por un libro mayor basado en una cadena de bloques.

Un medio de intercambio es cualquier cosa ampliamente aceptada como pago por bienes y servicios, y un libro mayor es un almacén de datos que realiza un seguimiento de las transacciones. La tecnología de cadena de bloques permite a los usuarios realizar transacciones en el libro mayor sin depender de un tercero de confianza para mantenerlo.

La primera criptomoneda fue Bitcoin, creada por Satoshi Nakamoto. Desde el lanzamiento de Bitcoin en 2009, se han creado miles de criptomonedas en muchas cadenas de bloques diferentes.

## ¿Qué es ether? {#what-is-ether}

**Ether (ETH)** es la criptomoneda utilizada para muchas cosas en la red Ethereum. Fundamentalmente, es la única forma de pago aceptable para las tarifas de transacción, y después de [La Fusión](/roadmap/merge), se requiere ether para validar y proponer bloques en la Red principal. Ether también se utiliza como una forma principal de colateral en los mercados de préstamos de [finanzas descentralizadas (DeFi)](/defi), como unidad de cuenta en los mercados de NFT, como pago obtenido por realizar servicios o vender bienes del mundo real, y más.

Ethereum permite a los desarrolladores crear [**aplicaciones descentralizadas (dapps)**](/developers/docs/dapps), que comparten un grupo de poder computacional. Este grupo compartido es finito, por lo que Ethereum necesita un mecanismo para determinar quién puede usarlo. De lo contrario, una dapp podría consumir accidental o maliciosamente todos los recursos de la red, lo que bloquearía el acceso de otros.

La criptomoneda ether respalda un mecanismo de fijación de precios para el poder computacional de Ethereum. Cuando los usuarios quieren realizar una transacción, deben pagar ether para que su transacción sea reconocida en la cadena de bloques. Estos costos de uso se conocen como [tarifas de gas](/developers/docs/gas/), y la tarifa de gas depende de la cantidad de poder computacional requerido para ejecutar la transacción y de la demanda de poder computacional en toda la red en ese momento.

Por lo tanto, incluso si una dapp maliciosa enviara un bucle infinito, la transacción eventualmente se quedaría sin ether y terminaría, permitiendo que la red volviera a la normalidad.

Es [común confundir](https://abcnews.go.com/Business/bitcoin-slumps-week-low-amid-renewed-worries-chinese/story?id=78399845) Ethereum y ether: cuando las personas hacen referencia al "precio de Ethereum", están describiendo el precio de ether.

## Acuñación de ether {#minting-ether}

La acuñación es el proceso en el que se crea nuevo ether en el libro mayor de Ethereum. El protocolo Ethereum subyacente crea el nuevo ether, y no es posible que un usuario cree ether.

El ether se acuña como recompensa por cada bloque propuesto y en cada punto de control de la época por otra actividad del validador relacionada con alcanzar el consenso. La cantidad total emitida depende del número de validadores y de cuánto ether hayan depositado en garantía. Esta emisión total se divide equitativamente entre los validadores en el caso ideal de que todos los validadores sean honestos y estén en línea, pero en realidad, varía según el rendimiento del validador. Aproximadamente 1/8 de la emisión total va al proponente de bloque; el resto se distribuye entre los demás validadores. Los proponentes de bloque también reciben propinas de las tarifas de transacción e ingresos relacionados con MEV, pero estos provienen de ether reciclado, no de una nueva emisión.

## Quema de ether {#burning-ether}

Además de crear ether a través de recompensas de bloque, el ether puede ser destruido a través de un proceso llamado 'quema'. Cuando el ether se quema, se elimina de la circulación permanentemente.

La quema de ether ocurre en cada transacción en Ethereum. Cuando los usuarios pagan por sus transacciones, una tarifa base de gas, establecida por la red de acuerdo con la demanda transaccional, se destruye. Esto, junto con tamaños de bloque variables y una tarifa de gas máxima, simplifica la estimación de la tarifa de transacción en Ethereum. Cuando la demanda de la red es alta, los [bloques](https://eth.blockscout.com/block/22580057) pueden quemar más ether del que acuñan, compensando efectivamente la emisión de ether.

Quemar la tarifa base dificulta la capacidad de un productor de bloques para manipular transacciones. Por ejemplo, si los productores de bloques recibieran la tarifa base, podrían incluir sus propias transacciones de forma gratuita y aumentar la tarifa base para todos los demás. Alternativamente, podrían reembolsar la tarifa base a algunos usuarios fuera de la cadena, lo que llevaría a un mercado de tarifas de transacción más opaco y complejo.

## Denominaciones de ether {#denominations}

Dado que el valor de muchas transacciones en Ethereum es pequeño, el ether tiene varias denominaciones a las que se puede hacer referencia como unidades de cuenta más pequeñas. De estas denominaciones, Wei y Gwei son particularmente importantes.

Wei es la cantidad más pequeña posible de ether y, como resultado, muchas implementaciones técnicas, como el [Yellowpaper de Ethereum](https://ethereum.github.io/yellowpaper/paper.pdf), basarán todos los cálculos en Wei.

Gwei, abreviatura de giga-wei, se usa a menudo para describir los costos de gas en Ethereum.

| Denominación | Valor en ether   | Uso común                 |
| ------------ | ---------------- | ------------------------- |
| Wei          | 10<sup>-18</sup> | Implementaciones técnicas |
| Gwei         | 10<sup>-9</sup>  | Tarifas de gas legibles por humanos |

## Transferencia de ether {#transferring-ether}

Cada transacción en Ethereum contiene un campo `value`, que especifica la cantidad de ether a transferir, denominada en Wei, para enviar desde la dirección del remitente a la dirección del destinatario.

Cuando la dirección del destinatario es un [contrato inteligente](/developers/docs/smart-contracts/), este ether transferido se puede usar para pagar el gas cuando el contrato inteligente ejecuta su código.

[Más sobre transacciones](/developers/docs/transactions/)

## Consulta de ether {#querying-ether}

Los usuarios pueden consultar el saldo de ether de cualquier [cuenta](/developers/docs/accounts/) inspeccionando el campo `balance` de la cuenta, que muestra las tenencias de ether denominadas en Wei.

[Etherscan](https://etherscan.io) y [Blockscout](https://eth.blockscout.com) son herramientas populares para inspeccionar los saldos de las direcciones a través de aplicaciones basadas en la web. Por ejemplo, [esta página de Blockscout](https://eth.blockscout.com/address/0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe) muestra el saldo de la Fundación Ethereum. Los saldos de las cuentas también se pueden consultar utilizando billeteras o directamente haciendo solicitudes a los nodos.

## Lecturas adicionales {#further-reading}

- [Definición de ether y Ethereum](https://www.cmegroup.com/education/courses/introduction-to-ether/defining-ether-and-ethereum.html) – _CME Group_
- [Documento técnico de Ethereum](/whitepaper/): La propuesta original para Ethereum. Este documento incluye una descripción de ether y las motivaciones detrás de su creación.
- [Calculadora de Gwei](https://www.alchemy.com/gwei-calculator): Utilice esta calculadora de Gwei para convertir fácilmente Wei, Gwei y ether. Simplemente ingrese cualquier cantidad de Wei, Gwei o ETH y calcule automáticamente la conversión.

_¿Conoce algún recurso de la comunidad que le haya ayudado? ¡Edite esta página y agréguelo!_