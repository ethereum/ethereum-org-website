---
title: Contratos inteligentes
description: Una introducción sin tecnicismos a los contratos inteligentes
lang: es
---

# Introducción a los contratos inteligentes {#introduction-to-smart-contracts}

Los contratos inteligentes son los bloques de construcción fundamentales de la capa de aplicación de Ethereum. Se trata de programas computacionales almacenados en la [cadena de bloques](/glossary/#blockchain) que siguen la lógica "si ocurre esto, entonces ocurre aquello". Los programas garantizan ejecutarse siguiendo las reglas definidas por su propio código, las cuales no se pueden cambiar una vez que fueron creadas.

Nick Szabo acuñó el término «contrato inteligente». En 1994, escribió [una introducción al concepto](https://www.fon.hum.uva.nl/rob/Courses/InformationInSpeech/CDROM/Literature/LOTwinterschool2006/szabo.best.vwh.net/smart.contracts.html), y en 1996 escribió [una exploración de lo que podrían hacer los contratos inteligentes](https://www.fon.hum.uva.nl/rob/Courses/InformationInSpeech/CDROM/Literature/LOTwinterschool2006/szabo.best.vwh.net/smart_contracts_2.html).

Szabo imaginó un mercado digital donde procesos autómaticos y [criptográficamente seguros](/glossary/#cryptography) permitieran realizar transacciones y negocios sin la necesidad de intermediarios de confianza. Los contratos inteligentes en Ethereum ponen esta visión en práctica.

Mire en este vídeo cómo Finematics explica los contratos inteligentes:

<YouTube id="pWGLtjG-F5c" />

## Confianza en los contratos convencionales {#trust-and-contracts}

Uno de los mayores problemas con un contrato convencional es la necesidad de tener individuos honestos que cumplan con lo acordado en el contrato.

He aquí un ejemplo:

Alicia y Bob están haciendo una carrera en bicicleta. Digamos que Alicia le apuesta a Bob 10 dólares de que ella le gane en la carrera. Bob está seguro de que él ganará, por eso acepta la apuesta. Al final, Alicia termina la carrera muy por delante de Bob y es la clara ganadora. Pero Bob se niega a pagar la apuesta, alegando que Alicia debe haber hecho trampa.

Este sencillo ejemplo ilustra el problema de cualquier acuerdo no inteligente. Aunque se cumplan las condiciones del acuerdo (es decir, usted sea el ganador de la carrera), aún debe confiar en que la otra persona cumpla el acuerdo (es decir, que pague la apuesta).

## Una máquina expendedora digital {#vending-machine}

Una metáfora sencilla para un contrato inteligente es la de una máquina expendedora que funciona de forma similar a un contrato inteligente: aportes específicos garantizan resultados predeterminados.

- Seleccione un producto
- La máquina expendedora muestra el precio.
- Usted paga el precio.
- La máquina expendedora comprueba que usted ha pagado la cantidad correcta.
- La máquina expendedora le da su artículo.

La máquina expendedora solo dispensará el producto deseado después de que se hayan cumplido todos los requisitos. Si no selecciona un producto o inserta suficiente dinero, la máquina expendedora no le entregará su producto.

## Ejecución automática {#automation}

El principal beneficio de un contrato inteligente es que ejecuta determinísticamente un código sin ambigüedades cuando se cumplen ciertas condiciones. No hay necesidad de esperar a que un humano interprete o negocie el resultado. Esto elimina la necesidad de intermediarios de confianza.

Por ejemplo, usted podría escribir un contrato inteligente que mantenga fondos en fideicomiso para un menor, permitiéndole retirar los fondos después de una fecha específica. Si se intenta retirar fondos antes de esa fecha, el contrato inteligente no se ejecutaría. O podría escribir un contrato que automáticamente le brinde una versión digital de un título de un coche cuando le pague al concesionario.

## Resultados predecibles {#predictability}

Los contratos tradicionales son ambiguos, porque dependen de que los humanos los interpreten y los implementen. Por ejemplo, dos jueces pueden interpretar un contrato de forma distinta, lo que puede dar paso a decisiones inconsistentes y resultados desiguales. Los contratos inteligentes eliminan esta posibilidad. Los contratos inteligentes, por el contrario, se ejecutan con precisión basándose en las condiciones estipuladas por escrito dentro del código del contrato. Esta precisión significa que dadas las mismas circunstancias, el contrato inteligente producirá el mismo resultado.

## Registro público {#public-record}

Los contratos inteligentes también son útiles para auditorías y seguimiento. Dado que los contratos inteligentes de Ethereum están en una cadena de bloques pública, cualquier persona puede realizar un seguimiento instantáneo de la transferencia de activos y de otros datos relacionados. Por ejemplo, puede consultar para ver que alguien envió dinero a su dirección.

## Protección de la privacidad {#privacy-protection}

Los contratos inteligentes también protegen su privacidad. Puesto que Ethereum es una red pseudónima (sus transacciones están vinculadas públicamente a una dirección criptográfica única, no a su identidad), puede proteger su privacidad frente a observadores.

## Términos visibles {#visible-terms}

Finalmente, así como con los contratos tradicionales, usted puede verificar el contenido de un contrato inteligente antes de firmarlo (o alternativamente, interactuar con él). La transparencia de un contato inteligente garantiza que cualquiera pueda examinarlo.

## Casos de uso de contratos inteligentes {#use-cases}

Los contratos inteligentes básicamente pueden hacer lo mismo que otros programas informáticos.

Pueden realizar cómputos, crear divisas, almacenar datos, mintear [NFT](/glossary/#nft), enviar comunicaciones e incluso generar gráficos. He aquí algunos ejemplos populares sacados del mundo real:

- [Monedas estables](/stablecoins/)
- [Crear y distribuir activos digitales únicos](/nft/)
- [Un cambio de divisas automático y abierto](/get-eth/#dex)
- [Juegos descentralizados](/dapps/?category=gaming#explore)
- [Una póliza de seguro que paga automáticamente](https://etherisc.com/)
- [Un estándar que permite a las personas crear divisas interoperables y personalizadas](/developers/docs/standards/tokens/)

## Más información {#further-reading}

- [¿Cómo cambiarán el mundo los contratos inteligentes?](https://www.youtube.com/watch?v=pA6CGuXEKtQ)
- [Contratos inteligentes: la tecnología de la cadena de bloques que remplazará a los abogados](https://blockgeeks.com/guides/smart-contracts/)
- [Contratos inteligentes para desarrolladores](/developers/docs/smart-contracts/)
- [Aprenda a redactar contratos inteligentes](/developers/learning-tools/)
- [Dominar Ethereum: ¿Qué es un contrato inteligente?](https://github.com/ethereumbook/ethereumbook/blob/develop/07smart-contracts-solidity.asciidoc#what-is-a-smart-contract)
