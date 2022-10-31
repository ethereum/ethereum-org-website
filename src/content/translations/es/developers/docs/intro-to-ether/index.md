---
title: Introducción a ether
description: Una introducción para desarrolladores a la criptomoneda ethereum
lang: es
---

## Requisitos previos {#prerequisites}

Para que entienda mejor esta página, le recomendamos que lea primero la [introducción a Ethereum](/developers/docs/intro-to-ethereum/).

## ¿Qué es una criptomoneda? {#what-is-a-cryptocurrency}

Una criptomoneda es un medio de intercambio asegurado por un libro mayor basado en cadenas de bloques.

Un medio de intercambio es cualquier elemento que esté aceptado ampliamente como pago de bienes y servicios. Por otro lado, un libro mayor es un almacén de datos que lleva el registro de las transacciones. La tecnología de cadenas de bloques permite a los usuarios realizar transacciones en el libro mayor sin depender de un tercero para mantenerlo.

La primera criptomoneda fue Bitcoin, creada por Satoshi Nakamoto. Desde el lanzamiento de Bitcoin en 2009, muchas personas han creado miles de criptomonedas a través de muchas cadenas de bloques.

## ¿Qué es el ether? {#what-is-ether}

**Ether (ETH)** es la criptomoneda que se utiliza para llevar a cabo multitud de acciones en la red Ethereum. Fundamentalmente, es la única forma de pago aceptable para las tarifas de transacción, y después de [The Merge](/upgrades/merge), se requerirá ether para validar y proponer bloques en Mainnet. Ether también se utiliza como forma principal de garantía en los mercados de préstamos de la [DeFi](/defi), como una unidad de cuenta en los mercados de NFT, como pago recibido por la prestación de servicios o la venta de bienes en el mundo real, y para muchas otras cosas.

Ethereum le permite a los desarrolladores crear [**aplicaciones descentralizadas (dapps)**](/developers/docs/dapps), las cuales comparten un conjunto de energía de computación. Este grupo compatido es finito, por lo que Ethereum necesita un mecanismo para determinar quién lo puede utilizar. De lo contrario, una dapp podría consumir todos los recursos de la red de manera accidental o maliciosa, con lo que se bloquearía el acceso a los demás.

La criptomoneda Ether incluye un mecanismo de fijación de precios para determinar el poder de computación de Ethereum. Cuando los usuarios quieren realizar una transacción, deben pagar Ether para que su transacción sea reconocida en la cadena de bloques. Estos costes de uso se conocen como [comisiones de gas](/developers/docs/gas/); la comisión de gas depende de la cantidad de potencia de computación requerida para ejecutar la transacción y la demanda de energía de la red en el momento de la transacción.

Por lo tanto, incluso si una dapp maliciosa ejecuta un bucle infinito, se llegaría a un punto en el que la transacción carecería de Ether y terminaría, lo que permitiría que la red vuelva a la normalidad.

[Es](https://www.reuters.com/article/us-crypto-currencies-lending-insight-idUSKBN25M0GP#:~:text=price%20of%20ethereum) [común](https://abcnews.go.com/Business/bitcoin-slumps-week-low-amid-renewed-worries-chinese/story?id=78399845#:~:text=cryptocurrencies%20including%20ethereum) [confundir](https://www.cnn.com/2021/03/14/tech/nft-art-buying/index.html#:~:text=price%20of%20ethereum) Ethereum y ether. Cuando las personas dicen «el precio de Ethereum» se están refiriendo al precio de ether.

## Mintear ether {#minting-ether}

El proceso de minteado se produce cuando se crea nuevo ether en el libro mayor de Ethereum. El protocolo base de Ethereum se encarga de crear nuevo ether. Un usuario no puede crear ether.

El ether se mintea cuando un minero crea un bloque en la cadena de bloques de Ethereum. Como incentivo para los mineros, el protocolo les otorga una recompensa en cada bloque, con lo que se incrementa el saldo de la cuenta que ellos especificaron a través de la dirección de esta. La recompensa por bloque ha cambiado a lo largo del tiempo. Hoy en día es de 2 ETH por bloque.

## Quemar ether {#burning-ether}

Además de crear ether a través de las recompensas por bloque, el ether puede destruirse mediante un proceso llamado «quema». Cuando se quema el ether, este se elimina de la circulación de forma permanente.

La quema de ether se produce en cada transacción en Ethereum. Cuando los usuarios pagan por sus transacciones, se destruye una tasa de gas base, fijada por la red en función de la demanda transaccional. Esto, unido al tamaño variable de los bloques y a una tasa máxima de gas, simplifica la estimación de la tasa de transacción en Ethereum. Cuando la demanda de la red es alta, [los bloques](https://etherscan.io/block/12965263) pueden quemar más éter del que acuñan, compensando así la emisión de éter.

La quema de la tasa base evita que los mineros puedan manipularla de otra manera. Por ejemplo, si los mineros obtuvieran la tarifa base, podrían incluir sus propias transacciones de forma gratuita y aumentar la tarifa base para todos los demás. También podrían devolver la tarifa base a algunos usuarios fuera de la cadena, lo que llevaría a un mercado de tarifas de transacción más opaco y complejo.

## Denominaciones de ether {#denominations}

Ya que muchas transacciones en Ethereum son pequeñas, el ether tiene varias denominaciones, que pueden referenciarse para cantidades más pequeñas. De todas estas denominaciones, Wei y gwei son particularmente importantes.

Wei es el valor de ether más pequeño posible, y, como consecuencia, muchas implementaciones técnicas, como el [Libro amarillo de Ethereum](https://ethereum.github.io/yellowpaper/paper.pdf) basan todos sus cálculos en Wei.

El Gwei, abreviación de giga-wei, se utiliza para describir los costes del gas en Ethereum.

| Denominación | Valor en ether   | Uso común                                  |
| ------------ | ---------------- | ------------------------------------------ |
| Wei          | 10<sup>-18</sup> | Implementaciones técnicas                  |
| Gwei         | 10<sup>-9</sup>  | Comisiones de gas legibles por los humanos |

## Transferir ether {#transferring-ether}

Cada transacción en Ethereum contiene un campo llamado `value`, el cual especifica la cantidad de ether que se transfiere, denominada en wei, para enviar desde la dirección del emisor a la dirección del destinatario.

Cuando la dirección del destinatario es un [contrato inteligente](/developers/docs/smart-contracts/), puede que el ether transferido se utilice para pagar el gas cuando el contrato inteligente ejecuta su código.

[Más información sobre las transacciones](/developers/docs/transactions/)

## Consultar la cantidad de ether {#querying-ether}

Los usuarios pueden consultar el saldo en ether de cualquier [cuenta](/developers/docs/accounts/) al inspeccionar el campo `balance` de la cuenta, el cual muestra la reserva de ether denominada en wei.

[Etherscan](https://etherscan.io) es una herramienta muy conocida que permite inspeccionar el saldo de las direcciones a través de una aplicación web. Por ejemplo, en [esta página de Etherscan](https://etherscan.io/address/0xde0b295669a9fd93d5f28d9ec85e40f4cb697bae) se muestra el saldo de la Ethereum Foundation.

## Más información {#further-reading}

- [Definición de Ether y Ethereum](https://www.cmegroup.com/education/courses/introduction-to-ether/defining-ether-and-ethereum.html) — _Grupo CME_
- [Informe de Ethereum](/whitepaper/): la propuesta original de Ethereum. En este documento se incluyen una descripción de ether y los motivos por los que se creó.

_¿Conoce algún recurso en la comunidad que le haya servido de ayuda? Edite esta página y añádalo._
