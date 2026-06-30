---
title: Mejorar la experiencia del usuario
description: "Todavía es demasiado complejo usar Ethereum para la mayoría de las personas. Para fomentar la adopción masiva, Ethereum debe reducir drásticamente sus barreras de entrada: los usuarios deben obtener los beneficios del acceso descentralizado, sin permisos y resistente a la censura a Ethereum, pero debe ser tan fluido como usar una aplicación Web2 tradicional."
lang: es
image: /images/roadmap/roadmap-ux.png
alt: "Hoja de ruta de Ethereum"
template: roadmap
---

**El uso de Ethereum debe simplificarse**; desde la gestión de [claves](/glossary/#key) y [billeteras](/glossary/#wallet) hasta el inicio de transacciones. Para facilitar la adopción masiva, Ethereum debe aumentar drásticamente la facilidad de uso, permitiendo a los usuarios experimentar un acceso sin permisos y resistente a la censura a Ethereum con la experiencia fluida de usar aplicaciones [Web2](/glossary/#web2).

## Más allá de las frases semilla {#no-more-seed-phrases}

Las cuentas de Ethereum están protegidas por un par de claves que se utilizan para identificar las cuentas (clave pública) y firmar mensajes (clave privada). Una clave privada es como una contraseña maestra; permite el acceso completo a una cuenta de Ethereum. Esta es una forma diferente de operar para las personas más familiarizadas con los bancos y las aplicaciones Web2 que gestionan las cuentas en nombre del usuario. Para que Ethereum alcance la adopción masiva sin depender de terceros centralizados, debe haber una forma sencilla y fluida para que un usuario asuma la custodia de sus activos y mantenga el control de sus datos sin tener que entender la criptografía de clave pública-privada y la gestión de claves.

La solución a esto es usar billeteras de [contratos inteligentes](/glossary/#smart-contract) para interactuar con Ethereum. Las billeteras de contratos inteligentes crean formas de proteger las cuentas si las claves se pierden o son robadas, oportunidades para una mejor detección y defensa contra el fraude, y permiten que las billeteras obtengan nuevas funcionalidades. Aunque las billeteras de contratos inteligentes existen hoy en día, son difíciles de construir porque el protocolo de Ethereum necesita soportarlas mejor. Este soporte adicional se conoce como abstracción de cuentas.

<ButtonLink variant="outline-color" href="/roadmap/account-abstraction/">Más sobre la abstracción de cuentas</ButtonLink>

## Nodos para todos {#nodes-for-everyone}

Los usuarios que ejecutan [nodos](/glossary/#node) no tienen que confiar en terceros para que les proporcionen datos, y pueden interactuar de forma rápida, privada y sin permisos con la [cadena de bloques](/glossary/#blockchain) de Ethereum. Sin embargo, ejecutar un nodo en este momento requiere conocimientos técnicos y un espacio en disco sustancial, lo que significa que muchas personas deben confiar en intermediarios en su lugar.

Hay varias actualizaciones que harán que la ejecución de nodos sea mucho más fácil y requiera muchos menos recursos. La forma en que se almacenan los datos se cambiará para usar una estructura más eficiente en cuanto a espacio conocida como **árbol Verkle**. Además, con la [ausencia de estado](/roadmap/statelessness) o la [caducidad de datos](/roadmap/statelessness/#data-expiry), los nodos de Ethereum no necesitarán almacenar una copia de todos los datos del estado de Ethereum, lo que reducirá drásticamente los requisitos de espacio en el disco duro. Los [nodos ligeros](/developers/docs/nodes-and-clients/light-clients/) ofrecerán muchos de los beneficios de ejecutar un nodo completo, pero pueden ejecutarse fácilmente en teléfonos móviles o dentro de aplicaciones de navegador simples.

<ButtonLink variant="outline-color" href="/roadmap/verkle-trees/">Leer sobre los árboles Verkle</ButtonLink>

Con estas actualizaciones, las barreras para ejecutar un nodo se reducen efectivamente a cero. Los usuarios se beneficiarán de un acceso seguro y sin permisos a Ethereum sin tener que sacrificar un espacio en disco o CPU notable en su computadora o teléfono móvil, y no tendrán que depender de terceros para obtener datos o acceso a la red cuando usen aplicaciones.

## Progreso actual {#current-progress}

Las billeteras de contratos inteligentes ya están disponibles, pero se requieren más actualizaciones para hacerlas lo más descentralizadas y sin permisos posible. EIP-4337 es una propuesta madura que no requiere ningún cambio en el protocolo de Ethereum. El contrato inteligente principal requerido para EIP-4337 fue **implementado en marzo de 2023**.

**La ausencia de estado completa todavía está en fase de investigación** y es probable que falten varios años para su implementación. Hay varios hitos en el camino hacia la ausencia de estado completa, incluida la caducidad de datos, que pueden implementarse antes. Otros elementos de la hoja de ruta, como los [árboles Verkle](/roadmap/verkle-trees/) y la [separación proponente-constructor (PBS)](/roadmap/pbs/), deben completarse primero.

Las redes de prueba de árboles Verkle ya están en funcionamiento, y la siguiente fase es ejecutar clientes habilitados para árboles Verkle en redes de prueba privadas y luego públicas. Puedes ayudar a acelerar el progreso implementando contratos en las redes de prueba o ejecutando clientes de redes de prueba.
