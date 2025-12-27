---
title: "Introducción a la pila de Ethereum"
description: "Un tutorial de las diferentes capas de la pila de Ethereum y acerca de cómo encajan."
lang: es
---

Como sucede con cualquier pila de software, la "pila de Ethereum" variará de un proyecto a otro dependiendo de sus objetivos.

Sin embargo, existen componentes centrales de Ethereum que te ayudarán a tener un modelo mental de cómo interactúan las aplicaciones de software con la cadena de bloques de Ethereum. Comprender cómo funcionan las capas de la pila te ayudará a entender las diferentes maneras de integrar Ethereum en los proyectos de software.

## Nivel 1: Máquina virtual de Ethereum {#ethereum-virtual-machine}

La [Máquina virtual de Ethereum (EVM)](/developers/docs/evm/) es el entorno de ejecución de los contratos inteligentes en Ethereum. Todos los contratos inteligentes y los cambios de estado en la cadena de bloques de Ethereum se ejecutan mediante [transacciones](/developers/docs/transactions/). La EVM gestiona todo el procesamiento de las transacciones en la red de Ethereum.

Como sucede con cualquier máquina virtual, la EVM crea una nivel de abstracción entre el código de ejecución y la máquina de ejecución (un nodo de Ethereum). Actualmente, la EVM se está ejecutando en miles de nodos distribuidos por todo el mundo.

De manera invisible, la EVM utiliza un conjunto de instrucciones de códigos de operación para ejecutar tareas específicas. Estos (140 únicos) códigos de operación permiten que la EVM sea [Turing-completa](https://en.wikipedia.org/wiki/Turing_completeness), lo que significa que la EVM es capaz de computar casi cualquier cosa, si se le dan los recursos suficientes.

Como desarrollador de dapps, no necesitas saber mucho sobre la EVM, aparte de que existe y que impulsa de forma fiable todas las aplicaciones en Ethereum sin tiempo de inactividad.

## Nivel 2: Contratos inteligentes {#smart-contracts}

[Los contratos inteligentes](/developers/docs/smart-contracts/) son los programas ejecutables que se ejecutan en la cadena de bloques de Ethereum.

Los contratos inteligentes se escriben utilizando [lenguajes de programación](/developers/docs/smart-contracts/languages/) específicos que se compilan en bytecode de la EVM (instrucciones de máquina de bajo nivel llamadas códigos de operación).

Los contratos inteligentes no solo sirven como bibliotecas de código abierto, son esencialmente servicios de API abiertos que funcionan ininterrumpidamente y no se pueden dar de baja. Los contratos inteligentes proporcionan funciones públicas con las que los usuarios y las aplicaciones ([dapps](/developers/docs/dapps/)) pueden interactuar, sin necesidad de permiso. Cualquier aplicación puede integrarse con contratos inteligentes implementados para componer funcionalidades, como añadir [fuentes de datos](/developers/docs/oracles/) o para admitir intercambios de tokens. Además, cualquiera puede implementar nuevos contratos inteligentes en Ethereum para añadir una funcionalidad personalizada que satisfaga las necesidades de su aplicación.

Como desarrollador de dapps, deberás escribir contratos inteligentes solo si deseas agregar una funcionalidad personalizada a la blockchain de Ethereum. Quizá pienses que puedes satisfacer la mayoría de las necesidades de tu proyecto integrándolo con contratos inteligentes existentes, por ejemplo, si deseas ofrecer compatibilidad para los pagos con stablecoins o activar el intercambio descentralizado de tokens.

## Nivel 3: Nodos de Ethereum {#ethereum-nodes}

Para que una aplicación interactúe con la cadena de bloques de Ethereum, debe conectarse a un [nodo de Ethereum](/developers/docs/nodes-and-clients/). Conectarse a un nodo le permite leer datos de la cadena de bloques y/o enviar transacciones a la red.

Los nodos de Ethereum son ordenadores que ejecutan un software: un cliente de Ethereum. Un cliente es una implementación de Ethereum, que verifica todas las transacciones en cada bloque, manteniendo la red segura y la precisión de los datos. **Los nodos de Ethereum son la cadena de bloques de Ethereum**. Almacenan colectivamente el estado de la blockchain de Ethereum y llegan a un consenso sobre transacciones para transformar el estado de la blockchain.

Al conectar tu aplicación a un nodo de Ethereum (a través de la [API JSON-RPC](/developers/docs/apis/json-rpc/)), tu aplicación puede leer datos de la cadena de bloques (como los saldos de las cuentas de usuario), así como transmitir nuevas transacciones a la red (como transferir ETH entre cuentas de usuario o ejecutar funciones de contratos inteligentes).

## Nivel 4: API de cliente de Ethereum {#ethereum-client-apis}

Muchas bibliotecas de conveniencia (creadas y mantenidas por la comunidad de código abierto de Ethereum) permiten que tus aplicaciones se conecten y se comuniquen con la cadena de bloques de Ethereum.

Si tu aplicación orientada al usuario es una aplicación web, puedes optar por `npm install` una [API de JavaScript](/developers/docs/apis/javascript/) directamente en tu frontend. O tal vez prefieras implementar esta funcionalidad en el lado del servidor, usando una API de [Python](/developers/docs/programming-languages/python/) o [Java](/developers/docs/programming-languages/java/).

Si bien son una pieza necesaria de la pila, estas API abstraen gran parte de la complejidad de interactuar directamente con el nodo de Ethereum. También proporcionan funciones de utilidad (p. ej., convertir ETH a Gwei) para que, como desarrollador, puedas dedicar menos tiempo a lidiar con las complejidades de los clientes de Ethereum y más tiempo a centrarte en la funcionalidad específica de tu aplicación.

## Nivel 5: Aplicaciones para el usuario final {#end-user-applications}

En el nivel superior de la pila están las aplicaciones orientadas al usuario. Se trata de aplicaciones estándar que normalmente se usan y se diseñan hoy en día: principalmente aplicaciones móviles y web.

La forma en la que desarrollas estas interfaces de usuario permanece esencialmente sin cambios. Los usuarios no suelen necesitar saber si la aplicación que están utilizando se ha diseñado mediante una blockchain.

## ¿Estás preparado para elegir tu pila? ¿Listo para elegir tu stack? {#ready-to-choose-your-stack}

Consulta nuestra guía para [configurar un entorno de desarrollo local](/developers/local-environment/) para tu aplicación de Ethereum.

## Lecturas adicionales {#further-reading}

- [La arquitectura de una aplicación Web 3.0](https://www.preethikasireddy.com/post/the-architecture-of-a-web-3-0-application) - _Preethi Kasireddy_

_¿Conoce algún recurso de la comunidad que le haya sido de ayuda? ¡Edite esta página y agréguela!_
