---
title: Introducción a los contratos inteligentes
metaTitle: "Contratos inteligentes: qué son y sus beneficios"
description: Una introducción no técnica a los contratos inteligentes
lang: es
---

Los contratos inteligentes son los bloques de construcción fundamentales de la capa de aplicaciones de [Ethereum](/). Son programas informáticos almacenados en la [cadena de bloques](/glossary/#blockchain) que siguen la lógica de "si ocurre esto, entonces haz aquello", y se garantiza que se ejecutarán de acuerdo con las reglas definidas por su código, el cual no se puede cambiar una vez creado.

Nick Szabo acuñó el término "contrato inteligente". En 1994, escribió [una introducción al concepto](https://www.fon.hum.uva.nl/rob/Courses/InformationInSpeech/CDROM/Literature/LOTwinterschool2006/szabo.best.vwh.net/smart.contracts.html), y en 1996 escribió [una exploración sobre lo que podrían hacer los contratos inteligentes](https://www.fon.hum.uva.nl/rob/Courses/InformationInSpeech/CDROM/Literature/LOTwinterschool2006/szabo.best.vwh.net/smart_contracts_2.html).

Szabo imaginó un mercado digital donde procesos automáticos y [criptográficamente seguros](/glossary/#cryptography) permitieran que las transacciones y las funciones comerciales se llevaran a cabo sin intermediarios de confianza. Los contratos inteligentes en Ethereum ponen esta visión en práctica.

Vea a Finematics explicar los contratos inteligentes:

<VideoWatch slug="smart-contracts-code-is-law" />

## Confianza en los contratos convencionales {#trust-and-contracts}

Uno de los mayores problemas de un contrato tradicional es la necesidad de contar con personas de confianza para cumplir con los resultados del contrato.

Aquí hay un ejemplo:

Alice y Bob están compitiendo en una carrera de bicicletas. Supongamos que Alice le apuesta a Bob 10 dólares a que ganará la carrera. Bob confía en que será el ganador y acepta la apuesta. Al final, Alice termina la carrera muy por delante de Bob y es la clara ganadora. Pero Bob se niega a pagar la apuesta, alegando que Alice debió haber hecho trampa.

Este tonto ejemplo ilustra el problema con cualquier acuerdo que no sea inteligente. Incluso si se cumplen las condiciones del acuerdo (es decir, usted es el ganador de la carrera), todavía debe confiar en otra persona para que cumpla el acuerdo (es decir, pagar la apuesta).

## Una máquina expendedora digital {#vending-machine}

Una metáfora sencilla para un contrato inteligente es una máquina expendedora, que funciona de manera algo similar a un contrato inteligente: entradas específicas garantizan resultados predeterminados.

- Usted selecciona un producto
- La máquina expendedora muestra el precio
- Usted paga el precio
- La máquina expendedora verifica que haya pagado la cantidad correcta
- La máquina expendedora le entrega su artículo

La máquina expendedora solo dispensará el producto deseado después de que se cumplan todos los requisitos. Si no selecciona un producto o no inserta suficiente dinero, la máquina expendedora no le entregará su producto.

## Ejecución automática {#automation}

El principal beneficio de un contrato inteligente es que ejecuta de manera determinista un código inequívoco cuando se cumplen ciertas condiciones. No hay necesidad de esperar a que un humano interprete o negocie el resultado. Esto elimina la necesidad de intermediarios de confianza.

Por ejemplo, podría escribir un contrato inteligente que mantenga fondos en depósito de garantía para un niño, permitiéndole retirar los fondos después de una fecha específica. Si intenta retirarlos antes de esa fecha, el contrato inteligente no se ejecutará. O podría escribir un contrato que le otorgue automáticamente una versión digital del título de un automóvil cuando le pague al concesionario.

## Resultados predecibles {#predictability}

Los contratos tradicionales son ambiguos porque dependen de humanos para interpretarlos e implementarlos. Por ejemplo, dos jueces podrían interpretar un contrato de manera diferente, lo que podría llevar a decisiones inconsistentes y resultados desiguales. Los contratos inteligentes eliminan esta posibilidad. En su lugar, los contratos inteligentes se ejecutan con precisión basándose en las condiciones escritas dentro del código del contrato. Esta precisión significa que, dadas las mismas circunstancias, el contrato inteligente producirá el mismo resultado.

## Registro público {#public-record}

Los contratos inteligentes son útiles para auditorías y seguimiento. Dado que los contratos inteligentes de Ethereum están en una cadena de bloques pública, cualquiera puede rastrear instantáneamente las transferencias de activos y otra información relacionada. Por ejemplo, puede verificar que alguien haya enviado dinero a su dirección.

## Protección de la privacidad {#privacy-protection}

Los contratos inteligentes también protegen su privacidad. Dado que Ethereum es una red seudónima (sus transacciones están vinculadas públicamente a una dirección criptográfica única, no a su identidad), puede proteger su privacidad de los observadores.

## Términos visibles {#visible-terms}

Finalmente, al igual que con los contratos tradicionales, puede verificar qué hay en un contrato inteligente antes de firmarlo. A diferencia de un contrato tradicional, la transparencia en cadena de un contrato inteligente permite que cualquiera lo examine y revise antes de interactuar con él. 

Sin embargo, aunque cualquiera puede ver los términos de un contrato inteligente, los datos sin procesar de la transacción están diseñados para ser interpretados por aplicaciones y billeteras, no por humanos. Debido a que estos datos son tan difíciles de leer, los usuarios a menudo se enfrentan a un importante riesgo de seguridad llamado "firma a ciegas", o aprobar una transacción que interactúa con un contrato inteligente sin entender realmente lo que hará. 

El ecosistema de Ethereum está en transición hacia los estándares de **[Firma Clara](https://clearsigning.org/)** (específicamente [ERC-7730](https://eips.ethereum.org/EIPS/eip-7730)). La Firma Clara traduce los datos opacos de los contratos inteligentes en descripciones de transacciones sencillas y legibles para humanos, asegurando que cualquiera pueda entender la verdadera intención de un contrato antes de firmar.

## Casos de uso de los contratos inteligentes {#use-cases}

Los contratos inteligentes pueden hacer esencialmente cualquier cosa que puedan hacer los programas informáticos.

Pueden realizar cálculos, crear moneda, almacenar datos, acuñar [NFT](/glossary/#nft), enviar comunicaciones e incluso generar gráficos. Aquí hay algunos ejemplos populares del mundo real:

- [Monedas estables](/stablecoins/)
- [Creación y distribución de activos digitales únicos](/nft/)
- [Un intercambio de divisas automático y abierto](/get-eth/#dex)
- [Juegos descentralizados](/apps/categories/gaming)
- [Una póliza de seguro que paga automáticamente](https://etherisc.com/)
- [Un estándar que permite a las personas crear monedas personalizadas e interoperables](/developers/docs/standards/tokens/)

## Lecturas adicionales {#further-reading}

- [Cómo los contratos inteligentes cambiarán el mundo](https://www.youtube.com/watch?v=pA6CGuXEKtQ)
- [Contratos inteligentes para desarrolladores](/developers/docs/smart-contracts/)
- [Aprenda a escribir contratos inteligentes](/developers/learning-tools/)
- [Dominando Ethereum: ¿Qué es un contrato inteligente?](https://github.com/ethereumbook/ethereumbook/blob/openedition/07smart-contracts-solidity.asciidoc#what-is-a-smart-contract)

<Divider />

<QuizWidget quizKey="smart-contracts" />