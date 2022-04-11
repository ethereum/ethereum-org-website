---
title: Nodos como un servicio
description: Una visión general para principiantes de los servicios de nodos, los pros y los contras, y los proveedores populares.
lang: es
sidebar: true
sidebarDepth: 2
isOutdated: true
---

## Introducción {#Introduction}

Ejecutar tu propio [ nodo de Ethereum](/developers/docs/nodes-and-clients/#what-are-nodes-and-clients) puede ser desafiante, especialmente al principio o durante una escalada rápida. Hay un [número de servicios](#popular-node-services) que ejecutan infraestructuras de nodo optimizadas para ti; así podrás centrarte en desarrollar tu producto o aplicación. Te explicaremos el funcionamiento de los servicios de nodos, las ventajas y desventajas de usarlos, y haremos una lista con los proveedores por si estás interesado en ponerte en marcha.

## Requisitos previos {#prerequisites}

Si aún no entiendes qué son los nodos y los clientes, consulta [Nodos y clientes](/developers/docs/nodes-and-clients/).

## ¿Cómo funcionan los servicios de nodos? {#how-do-node-services-work}

Los proveedores de servicios de nodos ejecutan clientes de nodos distribuidos para ti, así que tú no tienes que hacerlo.

Estos servicios suelen proporcionar una clave de API, que puedes usar para escribir y leer desde la blockchain. Además, suelen incluir acceso a [redes de pruebas de Ethereum](/developers/docs/networks/#testnets), además de a la red principal.

Algunos servicios te ofrecen tu propio nodo que ellos gestionan para ti, mientras que otros usan equilibradores de carga para distribuir la actividad a través de los nodos.

Casi todos los servicios de nodos son extremadamente fáciles de integrar, incluyen cambios de una línea en tu código para intercambiar tu nodo autoalojado o incluso cambiar entre los mismos servicios.

Muchas veces, los nodos de servicio ejecutan una serie de [nodos de cliente](/developers/docs/nodes-and-clients/#execution-clients) y [tipos](/developers/docs/nodes-and-clients/#node-types). Esto te permite acceder a los archivos de nodo completos además de a los métodos específicos de los clientes en una API.

Es importante remarcar que los servicios de nodos no almacenan ni deben almacenar sus claves o información privadas.

## ¿Cuáles son las ventajas de usar un servicio de nodos? {#benefits-of-using-a-node-service}

El principal beneficio de usar un servicio de nodo es no tener que dedicar tiempo de ingeniería para mantener y administrar los nodos tú mismo. Esto te permite centrarte en crear tu producto, en lugar de tener que preocuparte por el mantenimiento de la infraestructura.

Ejecutar tus propios nodos puede ser muy caro, desde el almacenamiento al ancho de banda o al carísimo tiempo de ingeniería. Cosas como disponer de más nodos al escalar, actualizar los nodos a su última versión y asegurar su coherencia puede quitarte tiempo para crear y utilizar recursos en tu producto web3 deseado.

## ¿Cuáles son las desventajas de utilizar un servicio de nodos? {#cons-of-using-a-node-service}

Al utilizar un servicio de nodos, estás centralizando el aspecto infraestructural de tu producto. Por este motivo, los proyectos que se basan en la descentralización como uno de sus puntos fuertes quizá prefieran utilizar nodos autoalojados que externalizarlos a un tercero.

Más información sobre [las ventajas de ejecutar tu propio nodo](/developers/docs/nodes-and-clients/#benefits-to-you).

## Servicios de nodos populares {#popular-node-services}

A continuación se incluye una lista con algunos de los proveedores de nodos de Ethereum más populares. Si echas de menos alguno, puedes añadirlo. Cada servicio de nodos ofrece diferentes beneficios y características, además de niveles gratuitos o de pago. Te recomendamos que investigues cuáles se adaptan mejor a tus necesidades antes de tomar una decisión.

- [**Alchemy**](https://alchemyapi.io/)
  - [Documentación](https://docs.alchemyapi.io/)
  - Características
    - Opción de nivel gratuito
    - Escala según tus necesidades
    - Datos de archivo gratuitos
    - Herramientas de análisis
    - Tablero
    - Puntos finales de API única
    - Webhooks
    - Soporte directo
- [**Infura**](https://infura.io/)
  - [Documentación](https://infura.io/docs)
  - Características
    - Opción de nivel gratuito
    - Escala según tus necesidades
    - Datos de archivo de pago
    - Soporte directo
    - Tablero
- [**QuikNode**](https://www.quiknode.io/)
  - Características
    - Prueba gratuita de 7 días
    - Soporte variado
    - Webhooks
    - Tablero
    - Análisis
- [**Rivet**](https://rivet.cloud/)
  - [Documentación](https://rivet.readthedocs.io/en/latest/)
  - Características
    - Opción de nivel gratuito
    - Escala según tus necesidades
- [**BlockDaemon**](https://blockdaemon.com/)
  - [Documentación](https://ubiquity.docs.blockdaemon.com/)
  - Beneficios
    - Tablero
    - Base por nodo
    - Análisis

## Más información {#further-reading}

- [Lista de servicios de nodos de Ethereum](https://ethereumnodes.com/)

## Temas relacionados {#related-topics}

- [Nodos y clientes](/developers/docs/nodes-and-clients/)

## Tutoriales relacionados {#related-tutorials}

- [Primeros pasos con el desarrollo de Ethereum usando Alchemy](/developers/tutorials/sending-transactions-using-web3-and-alchemy/)
- [Guía para enviar transacciones usando Web 3.0 y Alchemy](/developers/tutorials/getting-started-with-ethereum-development-using-alchemy/)
