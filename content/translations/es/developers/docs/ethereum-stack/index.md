---
title: Introducción a la pila de Ethereum
description: Un tutorial de las diferentes capas de la pila de Ethereum y acerca de cómo encajan.
lang: es
---

Como sucede con cualquier pila de software, la "pila de Ethereum" variará de un proyecto a otro dependiendo de sus objetivos.

Sin embargo, existen tecnologías base de Ethereum que te ayudarán a hacerte una idea de cómo interactúan las apps de software con la blockchain de Ethereum. Comprender cómo funcionan las capas de la pila te ayudará a entender las diferentes maneras de integrar Ethereum en los proyectos de software.

## Nivel 1: Máquina virtual de Ethereum {#ethereum-virtual-machine}

La [máquina virtual de Ethereum (EVM)](/developers/docs/evm/) es el entorno de ejecución de los contratos inteligentes en Ethereum. Todos los contratos inteligentes y los cambios de estado de la blockchain de Ethereum se ejecutan mediante las [transacciones](/developers/docs/transactions/). La EVM gestiona todo el procesamiento de las transacciones en la red de Ethereum.

Como sucede con cualquier máquina virtual, la EVM crea una nivel de abstracción entre el código de ejecución y la máquina de ejecución (un nodo de Ethereum). Actualmente la EVM está ejecutándose en cientos de nodos distribuidos por todo el mundo.

De manera invisible, la EVM utiliza un conjunto de instrucciones de códigos de operación para ejecutar tareas específicas. Estos (140 únicos) opcodes permiten que la EVM sea [Turing-complete](https://en.wikipedia.org/wiki/Turing_completeness), lo que significa que la EVM es capaz de computar o calcular casi cualquier cosa si cuenta con suficientes recursos.

Como desarrollador de dapps, no necesitas saber mucho de la EVM aparte de la que existe y de que potencia de forma fiable todas las aplicaciones en Ethereum sin tiempos de inactividad.

## Nivel 2: Contratos Inteligentes {#smart-contracts}

Los [contratos inteligentes](/developers/docs/smart-contracts/) son programas ejecutables que se ejecutan en la blockchain de Ethereum.

Los contratos inteligentes están escritos con [lenguajes de programación](/developers/docs/smart-contracts/languages/) específicos, que se compilan en bytecodes de la EVM (instrucciones de máquina de bajo nivel llamados códigos de operación).

Los contratos inteligentes no solo sirven como bibliotecas de código abierto, esencialmente son servicios de API abierta que funcionan ininterrumpidamente y no se pueden dar de baja. Los contratos inteligentes proveen funciones públicas con las que los usuarios y aplicaciones ([dapps](/developers/docs/dapps/)) pueden interactuar entre ellos, sin necesidad de permiso. Cualquier aplicación puede integrarse con contratos inteligentes implementados para componer funcionalidades, como agregar [feeds de datos](/developers/docs/oracles/) o para admitir swaps de tokens. Cualquier persona puede implementar nuevos contratos en Ethereum con el propósito de agregar funciones personalizadas para satisfacer las necesidades de sus aplicaciones.

Como desarrollador de dapps, deberás escribir contratos inteligentes solo si deseas agregar una funcionalidad personalizada a la blockchain de Ethereum. Quizá pienses que puedes satisfacer la mayoría de las necesidades de tu proyecto integrándolo con contratos inteligentes existentes, por ejemplo, si deseas ofrecer compatibilidad para los pagos con stablecoins o activar el intercambio descentralizado de tokens.

## Nivel 3: Nodos de Ethereum {#ethereum-nodes}

Para que una apliación interactúe con la cadena de bloques de Ethereum, debe estar conectada a un [nodo de Ethereum](/developers/docs/nodes-and-clients/). Conectarse a un nodo le permite leer datos de la cadena de bloques y/o enviar transacciones a la red.

Los nodos de Ethereum son ordenadores que ejecutan un software: un cliente de Ethereum. Un cliente es una implementación de Ethereum que verifica todas las transacciones en cada bloque, lo que mantiene la seguridad de la red y la precisión de los datos. **Los nodos de Ethereum son la cadena de bloques de Ethereum**. Almacenan colectivamente el estado de la blockchain de Ethereum y llegan a un consenso sobre transacciones para transformar el estado de la blockchain.

Al conectar su aplicación a un nodo de Ethereum (a través de la [JSON-RPC API](/developers/docs/apis/json-rpc/)), su aplicación puede leer datos de la cadena de bloques (como los saldos de las cuentas de usuario), así como transmitir nuevas transacciones a la red (como transferir ETH entre cuentas de usuario o ejecutar funciones de contratos inteligentes).

## Nivel 4: API de clientes de Ethereum {#ethereum-client-apis}

Muchas bibliotecas de conveniencia (construidas y mantenidas por la comunidad de código abierto de Ethereum) permiten a tus aplicaciones de usuario final conectarse y comunicarse con la blockchain de Ethereum.

Si tu aplicación orientada al usuario es una aplicación web, puedes elegir `npm install`, una [API de JavaScript](/developers/docs/apis/javascript/) directamente en tu front-end. O quizás escogerás implementar esta funcionalidad del lado del servidor, usando una API de [Python](/developers/docs/programming-languages/python/), o bien una API de [Java](/developers/docs/programming-languages/java/).

Si bien son una pieza necesaria de la pila, estas API abstraen gran parte de la complejidad de interactuar directamente con el nodo de Ethereum. Estas también proporcionan funciones útiles (p. ej., convertir ETH a Gwei) para que así un desarrollador gaste menos tiempo tratando con las complejidades de los clientes de Ethereum y pase más tiempo enfocado en la funcionalidad única de tu aplicación.

## Nivel 5: Aplicaciones de usuario final {#end-user-applications}

En el nivel superior de la pila están las aplicaciones orientadas al usuario. Se trata de aplicaciones estándar que normalmente se usan y se diseñan hoy en día: principalmente aplicaciones móviles y web.

La forma en la que desarrollas estas interfaces de usuario permanece esencialmente sin cambios. Los usuarios no suelen necesitar saber si la aplicación que están utilizando se ha diseñado mediante una blockchain.

## ¿Estás preparado para elegir tu pila? {#ready-to-choose-your-stack}

Revisa nuestra guía para [configurar un entorno de desarrollo local](/developers/local-environment/) para tu aplicación de Ethereum.

## Más información {#further-reading}

- [La arquitectura de una aplicación Web 3.0](https://www.preethikasireddy.com/post/the-architecture-of-a-web-3-0-application) - _Preethi Kasireddy_

_¿Conoces algún recurso en la comunidad que te haya servido de ayuda? Edita esta página y añádelo._
