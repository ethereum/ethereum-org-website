---
title: Contratos inteligentes
description: Una introducción sin tecnicismos a los contratos inteligentes
lang: es
---

# Introducción a los contratos inteligentes {#introduction-to-smart-contracts}

Los contratos inteligentes son los componentes fundamentales de las [aplicaciones Ethereum](/dapps/). Son programas informáticos almacenados en la cadena de bloques que nos permiten convertir contratos tradicionales en paralelos digitales. Los contratos inteligentes son muy lógicos y siguen una estructura condicional «si ocurre esto, entonces se produce aquello». Esto significa que se comportan exactamente como se programaron y no se pueden cambiar.

Nick Szabo acuñó el término «contrato inteligente». En 1994, escribió [una introducción al concepto](https://www.fon.hum.uva.nl/rob/Courses/InformationInSpeech/CDROM/Literature/LOTwinterschool2006/szabo.best.vwh.net/smart.contracts.html) y, en 1996, [una exploración de lo que podrían hacer los contratos inteligentes](https://www.fon.hum.uva.nl/rob/Courses/InformationInSpeech/CDROM/Literature/LOTwinterschool2006/szabo.best.vwh.net/smart_contracts_2.html).

Nick Szabo imaginó un mercado digital construido sobre estos procesos automáticos y criptográficamente seguros. Un lugar donde las transacciones y las funciones empresariales pueden producirse sin una base de confianza, sin intermediarios. Los contratos inteligentes en Ethereum ponen esta visión en práctica.

## ¿Qué contratos ofrece? {#what-are-contracts}

Probablemente esté pensando: _«¡Qué sé yo de leyes!». ¿Por qué deberían importarme los contratos?"_. Para la mayoría de los mortales, los contratos son sinónimo de acuerdos con largos términos y condiciones, o aburridos documentos legales.

Los contratos son solamente acuerdos. Es decir, cualquier forma de acuerdo puede incorporarse en las condiciones de un contrato. Los acuerdos verbales o los contratos por escrito son aceptables para muchas cosas, pero no están exentos de defectos.

### Confianza y contratos {#trust-and-contracts}

Uno de los mayores problemas con un contrato convencional es la necesidad que personas de confianza cumplan con los resultados del contrato.

He aquí un ejemplo:

Alicia y Bob están haciendo una carrera de bicicleta. Digamos que Alicia se apuesta con Bob 10 $ a que le gana en la carrera. Bob confía en que será el ganador y acepta la apuesta. Al final, Alicia termina la carrera por delante de Bob y es la clara ganadora. Pero Bob se niega a pagar la apuesta, alegando que Alicia debe haber hecho trampa.

Este sencillo ejemplo ilustra el problema de cualquier acuerdo no inteligente. Aunque se cumplan las condiciones del acuerdo (es decir, usted sea el ganador de la carrera), aún debe confiar en otra persona para cumplir con el acuerdo (es decir, el pago de la apuesta).

## Contratos inteligentes {#smart-contracts}

Los contratos inteligentes digitalizan los acuerdos convirtiendo los términos de un acuerdo en código informático que se ejecuta automáticamente cuando los términos del contrato se cumplen.

### Una máquina expendedora digital {#vending-machine}

Una metáfora sencilla para un contrato inteligente es, por ejemplo, la de una máquina expendedora que funciona de manera similar a un contrato inteligente: las entradas específicas garantizan salidas predeterminadas.

- Seleccione un producto
- La máquina expendedora devuelve la cantidad requerida para comprar el producto
- Inserte la cantidad correcta
- La máquina expendedora verifica que haya insertado la cantidad correcta.
- La máquina expendedora dispensa el producto elegido.

La máquina expendedora solo dispensará el producto deseado después de que todos los requisitos se cumplan. Si no selecciona un producto o no inserta suficiente dinero, la máquina expendedora no entregará su producto.

### Ejecución automática {#automation}

Uno de los beneficios más significativos que los contratos inteligentes tienen sobre los contratos ordinarios es que el resultado se ejecuta automáticamente cuando se cumplen las condiciones del contrato. No hay necesidad de esperar a que un humano ejecute el resultado. En otras palabras: los contratos inteligentes eliminan la necesidad de confianza.

Por ejemplo, podría escribir un contrato inteligente que mantenga los fondos en depósito para un niño, permitiéndole retirar fondos después de una fecha específica. Cuando se intente retirar fondos antes de la fecha especificada, el contrato inteligente no se ejecutará. O bien, podría escribir un contrato que le brinde automáticamente una versión digital de la propiedad de un coche cuando le paga al distribuidor.

### Resultados predecibles {#predictability}

El factor humano es uno de las mayores causas de fracaso de los contratos tradicionales. Por ejemplo, dos jueces individuales podrían interpretar un contrato tradicional en diferentes maneras. Su interpretación podría conllevar diferentes decisiones tomadas y resultados dispares. Los contratos inteligentes eliminan la posibilidad de interpretaciones diferentes. Los contratos inteligentes, por el contrario, se ejecutan con precisión basándose en las condiciones estipuladas por escrito del código del contrato. Esta precisión significa que dándose las mismas circunstancias, el contrato inteligente generará el mismo resultado.

### Registro público {#public-record}

Los contratos inteligentes son también útilies para auditorías y seguimiento. Dado que los contratos inteligentes de Ethereum están en una cadena de bloques pública, cualquier persona puede realizar un seguimiento instantáneo de las transferencias de activos y de otra información relacionada. Puede comprobar que alguien le ha enviado dinero a su dirección, por ejemplo.

### Protección de la privacidad {#privacy-protection}

Los contratos inteligentes pueden también proteger nuestra privacidad. Puesto que Ethereum es una red pseudónima (sus transacciones están vinculadas públicamente a una dirección criptográfica única, no a su identidad), puede proteger su privacidad frente a observadores.

### Términos visibles {#visible-terms}

Finalmente, al igual que los contratos, puede verificar el contenido de un contrato inteligente antes de firmarlo (o interactuar con este). Mejor aún, la transparencia pública de los términos dentro del contrato significa que cualquiera puede examinarlo.

## Casos de uso de contratos inteligentes {#use-cases}

Por lo tanto, los contratos inteligentes son programas informáticos que viven en la cadena de bloques. Se pueden ejecutar automáticamente. Puede realizar el seguimiento de sus transacciones, predecir cómo actúan e incluso usarlas con un pseudónimo. ¡Es genial! Pero, ¿para qué sirven? Pues sí, los contratos inteligentes pueden hacer básicamente cualquier cosa que otros programas informáticos también hacen.

Pueden realizar cálculos, crear una divisa, almacenar datos, acuñar NFT, enviar comunicaciones e incluso generar gráficos. He aquí algunos ejemplos populares sacados del mundo real:

- [Monedas estables](/stablecoins/)
- [Crear y distribuir activos digitales únicos](/nft/)
- [Un cambio de divisas automático y abierto](/get-eth/#dex)
- [Juegos descentralizados](/dapps/?category=gaming)
- [Una póliza de seguro que paga automáticamente](https://etherisc.com/)
- [Un estándar que permite a las personas crear divisas interoperables y personalizadas](/developers/docs/standards/tokens/)

## ¿Retiene usted mejor las cosas cuando las ve? {#visual-learner}

Pues mire en este vídeo cómo Finematics explica los contratos inteligentes:

<YouTube id="pWGLtjG-F5c" />

## Más información {#further-reading}

- [¿Cómo cambiarán el mundo los contratos inteligentes?](https://www.youtube.com/watch?v=pA6CGuXEKtQ)
- [Contratos inteligentes: la tecnología de la cadena de bloques que remplazará a los abogados](https://blockgeeks.com/guides/smart-contracts/)
- [Contratos inteligentes para desarrolladores](/developers/docs/smart-contracts/)
- [Aprenda a redactar contratos inteligentes](/developers/learning-tools/)
- [Dominar Ethereum: ¿Qué es un contrato inteligente?](https://github.com/ethereumbook/ethereumbook/blob/develop/07smart-contracts-solidity.asciidoc#what-is-a-smart-contract)
