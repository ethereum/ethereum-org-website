---
title: Introducción a la pila de Ethereum
description: Un recorrido por las diferentes capas de la pila de Ethereum y cómo encajan entre sí.
lang: es
---

Como cualquier pila de software, la «pila de Ethereum» completa variará de un proyecto a otro dependiendo de sus objetivos.

Sin embargo, hay componentes centrales de Ethereum que ayudan a proporcionar un modelo mental de cómo las aplicaciones de software interactúan con la cadena de bloques de Ethereum. Comprender las capas de la pila le ayudará a entender las diferentes formas en que Ethereum puede integrarse en proyectos de software.

## Nivel 1: Máquina virtual de Ethereum {#ethereum-virtual-machine}

La [Máquina virtual de Ethereum (EVM)](/developers/docs/evm/) es el entorno de ejecución para los contratos inteligentes en Ethereum. Todos los contratos inteligentes y los cambios de estado en la cadena de bloques de Ethereum se ejecutan mediante [transacciones](/developers/docs/transactions/). La EVM maneja todo el procesamiento de transacciones en la red de Ethereum.

Al igual que con cualquier máquina virtual, la EVM crea un nivel de abstracción entre el código que se ejecuta y la máquina que lo ejecuta (un nodo de Ethereum). Actualmente, la EVM se ejecuta en miles de nodos distribuidos por todo el mundo.

A nivel interno, la EVM utiliza un conjunto de instrucciones de código de operación para ejecutar tareas específicas. Estos códigos de operación (140 únicos) permiten que la EVM sea [Turing completa](https://en.wikipedia.org/wiki/Turing_completeness), lo que significa que la EVM es capaz de calcular casi cualquier cosa, si cuenta con los recursos suficientes.

Como desarrollador de aplicaciones descentralizadas (dapp), no necesita saber mucho sobre la EVM, aparte de que existe y que impulsa de manera confiable todas las aplicaciones en Ethereum sin tiempo de inactividad.

## Nivel 2: Contratos inteligentes {#smart-contracts}

Los [contratos inteligentes](/developers/docs/smart-contracts/) son los programas ejecutables que se ejecutan en la cadena de bloques de Ethereum.

Los contratos inteligentes se escriben utilizando [lenguajes de programación](/developers/docs/smart-contracts/languages/) específicos que se compilan en código de bytes de la EVM (instrucciones de máquina de bajo nivel llamadas códigos de operación).

Los contratos inteligentes no solo sirven como bibliotecas de código abierto, sino que son esencialmente servicios de API abiertos que siempre están en ejecución y no pueden ser desactivados. Los contratos inteligentes proporcionan funciones públicas con las que los usuarios y las aplicaciones ([dapps](/developers/docs/dapps/)) pueden interactuar, sin necesidad de permiso. Cualquier aplicación puede integrarse con contratos inteligentes desplegados para componer funcionalidades, como agregar [fuentes de datos](/developers/docs/oracles/) o para admitir intercambios de tokens. Además, cualquiera puede desplegar nuevos contratos inteligentes en Ethereum para agregar funcionalidades personalizadas que satisfagan las necesidades de su aplicación.

Como desarrollador de dapps, solo necesitará escribir contratos inteligentes si desea agregar funcionalidades personalizadas en la cadena de bloques de Ethereum. Es posible que descubra que puede satisfacer la mayoría o todas las necesidades de su proyecto simplemente integrándose con contratos inteligentes existentes, por ejemplo, si desea admitir pagos en monedas estables o habilitar el intercambio descentralizado de tokens.

## Nivel 3: Nodos de Ethereum {#ethereum-nodes}

Para que una aplicación interactúe con la cadena de bloques de Ethereum, debe conectarse a un [nodo de Ethereum](/developers/docs/nodes-and-clients/). Conectarse a un nodo le permite leer datos de la cadena de bloques y/o enviar transacciones a la red.

Los nodos de Ethereum son computadoras que ejecutan software: un cliente de Ethereum. Un cliente es una implementación de Ethereum que verifica todas las transacciones en cada bloque, manteniendo la red segura y los datos precisos. **Los nodos de Ethereum son la cadena de bloques de Ethereum**. Almacenan colectivamente el estado de la cadena de bloques de Ethereum y alcanzan un consenso sobre las transacciones para mutar el estado de la cadena de bloques.

Al conectar su aplicación a un nodo de Ethereum (a través de la [API JSON-RPC](/developers/docs/apis/json-rpc/)), su aplicación puede leer datos de la cadena de bloques (como los saldos de las cuentas de los usuarios), así como transmitir nuevas transacciones a la red (como transferir ETH entre cuentas de usuarios o ejecutar funciones de contratos inteligentes).

## Nivel 4: API de clientes de Ethereum {#ethereum-client-apis}

Muchas bibliotecas de conveniencia (creadas y mantenidas por la comunidad de código abierto de Ethereum) permiten que sus aplicaciones se conecten y se comuniquen con la cadena de bloques de Ethereum.

Si su aplicación orientada al usuario es una aplicación web, puede optar por `npm install` una [API de JavaScript](/developers/docs/apis/javascript/) directamente en su frontend. O tal vez elija implementar esta funcionalidad en el lado del servidor, utilizando una API de [Python](/developers/docs/programming-languages/python/) o [Java](/developers/docs/programming-languages/java/).

Si bien estas API no son una pieza necesaria de la pila, abstraen gran parte de la complejidad de interactuar directamente con un nodo de Ethereum. También proporcionan funciones de utilidad (por ejemplo, convertir ETH a Gwei) para que, como desarrollador, pueda dedicar menos tiempo a lidiar con las complejidades de los clientes de Ethereum y más tiempo a centrarse en la funcionalidad específica de su aplicación.

## Nivel 5: Aplicaciones para el usuario final {#end-user-applications}

En el nivel superior de la pila se encuentran las aplicaciones orientadas al usuario. Estas son las aplicaciones estándar que usa y desarrolla habitualmente en la actualidad: principalmente aplicaciones web y móviles.

La forma en que desarrolla estas interfaces de usuario permanece esencialmente inalterada. A menudo, los usuarios no necesitarán saber que la aplicación que están utilizando está construida usando una cadena de bloques.

## ¿Listo para elegir su pila? {#ready-to-choose-your-stack}

Consulte nuestra guía para [configurar un entorno de desarrollo local](/developers/local-environment/) para su aplicación de Ethereum.

## Más información {#further-reading}

- [La arquitectura de una aplicación Web 3.0](https://www.preethikasireddy.com/post/the-architecture-of-a-web-3-0-application) - _Preethi Kasireddy_

_¿Conoce algún recurso de la comunidad que le haya servido de ayuda? ¡Edite esta página y añádalo!_