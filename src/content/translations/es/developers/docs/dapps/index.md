---
title: Introducción a las dapps
description:
lang: es
sidebar: true
---

Una aplicación descentralizada (dapp) es una aplicación diseñada en una red descentralizada, que combina un [contrato inteligente](/developers/docs/smart-contracts/) y una interfaz de usuario de front-end. Nota: En Ethereum, los contratos inteligentes son accesibles y transparentes (como las API abiertas), para que tu dapp pueda incluir un contrato inteligente que haya escrito otra persona.

## Requisitos previos {#prerequisites}

Antes de aprender acerca de las dapps, deberías conocer los [conceptos básicos de la blockchain](/developers/docs/intro-to-ethereum/), así como leer acerca de la red Ethereum y de como está descentralizada.

## Definición de una dapp {#definition-of-a-dapp}

Una dapp dispone de un código backend ejecutándose en una red descentralizada punto a punto. Compare esto con una aplicación, en la que el código backend se ejecuta en servidores centralizados.

Una dapp puede tener un código frontend y una interfaz de usuario escrita en cualquier lenguaje (al igual que una aplicación), que puede hacer llamadas a su backend. Además, su frontend se puede alojar en un almacenamiento descentralizado como [IPFS](https://ipfs.io/).

- **Descentralizadas**, es decir, son independientes y nadie las controla.
- **Deterministas**, es decir, realizan la misma función independientemente del entorno en el que se ejecuten.
- **Compatibles con Turing**, es decir, que dados los recursos requeridos, la dapp puede realizar cualquier acción.
- **Aisladas**, lo que significa que se ejecutan en un entorno virtual conocido como Máquina Virtual de Ethereum; por tanto, si ocurre que el contrato inteligente contiene un gran error, este no obstaculizará el funcionamiento normal de la red blockchain.

### Más información sobre los contratos inteligentes {#on-smart-contracts}

Para presentar las dapps, necesitamos hablar de los contratos inteligentes, un backend de una dapp, a falta de un mejor término. Si deseas obtener una descripción detallada, visita nuestra sección sobre [contratos inteligentes](/developers/docs/smart-contracts/).

Un contrato inteligente es un código que reside en la blockchain de Ethereum y se ejecuta exactamente como ha sido programado. Una vez que estos se implementan por la red, ya no se pueden modificar. Las dapps pueden ser descentralizadas debido a que están controladas por la lógica escrita dentro del contrato, no por una persona o compañía. Esto también significa que necesitas diseñar tus contratos cuidadosamente y probarlos minuciosamente.

## Ventajas del desarrollo de las dapps {#benefits-of-dapp-development}

- **Cero tiempo de inactividad**: Una vez que el contrato inteligente esté implementado en el núcleo de la app y sobre la blockchain, la red como conjunto siempre será capaz de servir a los clientes que intentan interactuar con el contrato. Por lo tanto, los actores maliciosos no pueden lanzar ataques de denegación de servicio dirigidos hacia las dapps individuales.
- **Privacidad**: No necesitas proporcionar tu identidad del mundo real para implementar una dapp o interactuar con ella.
- **Resistencia a la censura**: Ninguna entidad en la red puede bloquear a los usuarios a la hora de enviar transacciones, implementar dapps o leer los datos desde la blockchain.
- **Integridad completa de los datos**: Los datos almacenados en la blockchain son inmutables e indisputables, gracias a las primitivas criptográficas. Los actores maliciosos no pueden falsificar transacciones u otros datos que ya se hayan hecho públicos.
- **Informática sin confianza/Comportamiento verificable**: Los contratos inteligentes se pueden analizar y están garantizados para ejecutarse de manera predecible, sin la necesidad de confiar en una autoridad central. Esto no se aplica en los modelos tradicionales; por ejemplo, cuando utilizamos sistemas bancarios en línea, tenemos que confiar en que las instituciones bancarias no abusarán de nuestros datos financieros, manipularán nuestros registros o nos atacarán.

## Implicaciones del desarrollo de una dapp {#implications-of-dapp-development}

- **Mantenimiento**: Las dapps puede ser más difíciles de mantener, ya que el código y los datos publicados en la blockchain son más difíciles a modificar. Es difícil para los desarrolladores realizar actualizaciones de sus dapps (o de los datos almacenados de manera subyacente en una dapp) una vez que estén implementados; incluso si los errores o riesgos de seguridad se identifican en una versión antigua.
- **Sobrecarga**: Hay una sobrecarga de funcionamiento y la escalabilidad es muy complicada. Para conseguir el nivel de seguridad, de integridad, de transparencia y de fiabilidad al que Ethereum aspira, cada nodo ejecuta y almacena cada transacción. Además de esto, la Prueba de trabajo también lleva su tiempo. Un cálculo rápido coloca la sobrecarga en algo como 1 000 000 veces, que es el estándar informático actual.
- **Congestión de la red**: Al menos en el modelo actual, si una dapp está usando algunos recursos computacionales, la red entera se respalda. Actualmente, la red solamente es capaz de procesar alrededor de 10 transacciones por segundo; si las transacciones se están enviando con mayor velocidad, el conjunto de transacciones no confirmadas puede aumentar rápidamente.
- **Experiencia del usuario**: Puede ser más difícil diseñar experiencias fáciles de usar; al usuario final medio le puede parecer difícil configurar un conjunto de herramientas necesario para interactuar con la blockchain de manera segura.
- **Centralización**: Las soluciones sencillas para el usuario y el desarrollador son la base de Ethereum, y podrían terminar pareciéndose a los servicios centralizados; por ejemplo, tales servicios pueden almacenar claves u otra información sensible del lado del servidor, dar servicio a un front-end utilizando un servidor centralizado, o bien ejecutar una lógica comercial importante en un servidor centralizado antes de escribir en la blockchain. Esto elimina muchas (si es que no todas) de las ventajas de la blockchain con respecto al modelo tradicional.

## Las herramientas de las dapps {#dapp-tools}

**One Click Dapp\*\***_: Herramienta FOSS para generar front-ends de dapps desde una ABI._\*\*

- [oneclickdapp.com](https://oneclickdapp.com)
- [GitHub](https://github.com/oneclickdapp/oneclickdapp-v1)

**Etherflow\*\***_: Herramienta FOSS para desarrolladores de Ethereum para probar sus nodos, así como para componer y realizar llamadas RPC de solución de errores desde el navegador._\*\*

- [etherflow.quiknode.io](https://etherflow.quiknode.io/)
- [GitHub](https://github.com/abunsen/etherflow)

## Más información {#further-reading}

_¿Conoces algún recurso en la comunidad que te haya servido de ayuda? Edita esta página y añádelo._

## Temas relacionados {#related-topics}

- [Introducción al bloque de Ethereum](/developers/docs/ethereum-stack/)
- [Frameworks de desarrollo](/developers/docs/frameworks/)
