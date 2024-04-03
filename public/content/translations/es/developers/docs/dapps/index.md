---
title: Introducción a las DApps
description:
lang: es
---

Una aplicación descentralizada (DApp) es una aplicación diseñada en una red descentralizada, que combina un [contrato inteligente](/developers/docs/smart-contracts/) y una interfaz de usuario frontal. Nota: En Ethereum, los contratos inteligentes son accesibles y transparentes (como las API abiertas), para que su DApp pueda incluir un contrato inteligente que haya escrito otra persona.

## Requisitos previos {#prerequisites}

Antes de aprender acerca de las DApps, debería conocer los [conceptos básicos de la cadena de bloques](/developers/docs/intro-to-ethereum/), así como leer acerca de la red Ethereum y de como está descentralizada.

## Definición de una DApp {#definition-of-a-dapp}

Una DApp dispone de un código backend ejecutándose en una red descentralizada punto a punto. Compare esto con una aplicación, en la que el código backend se ejecuta en servidores centralizados.

Una DApp puede tener un código frontend y una interfaz de usuario escrita en cualquier lenguaje (al igual que una aplicación), que puede hacer llamadas a su backend. Además, su frontend se puede alojar en un almacenamiento descentralizado como [IPFS](https://ipfs.io/).

- **Descentralizado**: Las DApps operan en Ethereum, una plataforma pública descentralizada abierta en la que ninguna persona ni ningún grupo tiene el control
- **Deterministas**, es decir, realizan la misma función independientemente del entorno en el que se ejecuten
- **Turing complete**: Las DApps permiten realizar cualquier acción dada la cantidad de recursos requeridos
- **Aisladas**: Las DApps se ejecutan en un entorno virtual conocido como Máquina Virtual de Ethereum; por tanto, si el contrato inteligente contiene un gran error, este no obstaculizará el funcionamiento normal de la red de cadenas de bloques

### Más información sobre los contratos inteligentes {#on-smart-contracts}

Para presentar las DApps, necesitamos hablar de los contratos inteligentes, un backend de una DApp, a falta de un mejor término. Si desea obtener un resumen detallado, visite nuestra sección sobre [contratos inteligentes](/developers/docs/smart-contracts/).

Un contrato inteligente es un código que reside en la blockchain de Ethereum y se ejecuta exactamente como ha sido programado. Una vez que estos se implementan en la red, ya no pueden modificarse. Las DApps pueden ser descentralizadas debido a que están controladas por la lógica escrita dentro del contrato, no por una persona o compañía. Esto también significa que necesitas diseñar tus contratos cuidadosamente y probarlos minuciosamente.

## Ventajas del desarrollo de las DApps {#benefits-of-dapp-development}

- **Tiempo de inactividad nulo**: una vez que el contrato inteligente esté implementado en la cadena de bloques, la red en su conjunto siempre estará a disposición de los clientes que intentan interactuar con el contrato. Por lo tanto, los actores maliciosos no pueden lanzar ataques de denegación de servicio dirigidos hacia las DApps individuales.
- **Privacidad**: No necesita proporcionar su identidad del mundo real para implementar una DApp o interactuar con ella.
- **Resistencia a la censura**: Ninguna entidad en la red puede bloquear a los usuarios a la hora de enviar transacciones, implementar DApps o leer los datos desde la cadena de bloques.
- **Integridad completa de los datos**: Los datos almacenados en la blockchain son inmutables e indisputables, gracias a las primitivas criptográficas. Los actores maliciosos no pueden falsificar transacciones u otros datos que ya se hayan hecho públicos.
- **Computación sin confianza/comportamiento verificable**: los contratos inteligentes se pueden analizar y se garantiza que se ejecutarán de manera predecible, sin la necesidad de confiar en una autoridad central. Esto no se aplica en los modelos tradicionales; por ejemplo, cuando utilizamos sistemas bancarios en línea, tenemos que confiar en que las instituciones bancarias no abusarán de nuestros datos financieros, manipularán nuestros registros o nos atacarán.

## Desventajas del desarrollo de las DApps {#drawbacks-of-dapp-development}

- **Mantenimiento**: Las DApps puede ser más difíciles de mantener, ya que el código y los datos publicados en la cadena de bloques son más difíciles a modificar. A los desarrolladores les resulta complicado realizar actualizaciones de sus DApps (o de los datos subyacentes almacenados por una DApp) una vez que se implementan, incluso si se identifican errores o riesgos de seguridad en una versión anterior.
- **Sobrecarga de trabajo**: existe una enorme sobrecarga de trabajo y resulta muy complicado escalarla. Para conseguir el nivel de seguridad, de integridad, de transparencia y de fiabilidad al que Ethereum aspira, cada nodo ejecuta y almacena cada transacción. Además de esto, el consenso de prueba de participación también lleva tiempo.
- **Congestión en la red**: Cuando una DApp usa demasiados recursos computacionales, se realiza una copia de seguridad de toda la red. Actualmente, la red solamente es capaz de procesar alrededor de 10 transacciones por segundo; si las transacciones se están enviando con mayor velocidad, el conjunto de transacciones no confirmadas puede aumentar rápidamente.
- **Experiencia de usuario**: puede resultar más difícil diseñar experiencias fáciles de usar porque al usuario final promedio podría resultarle demasiado complicado configurar una pila de herramientas necesarias para interactuar con la cadena de bloques de una manera verdaderamente segura.
- **Centralización**: las soluciones fáciles de usar para los usuarios y desarrolladores instaladas sobre la capa base de Ethereum podrían terminar pareciendo servicios centralizados de todos modos. Por ejemplo, dichos servicios permiten almacenar claves u otra información confidencial en el servidor, estar a disposición de la interfaz de usuario mediante el uso de un servidor centralizado o ejecutar una lógica comercial importante en un servidor centralizado antes de escribirlo en la cadena de bloques. La centralización elimina muchas (si no todas) las ventajas de la cadena de bloques frente al modelo tradicional.

## ¿Es usted una persona que aprende de manera visual? {#visual-learner}

<YouTube id="F50OrwV6Uk8" />

## Herramientas para crear DApps {#dapp-tools}

**Scaffold-ETH _: un experimento rápido con Solidity mediante el uso de una interfaz de usuario que se adapta a su contrato inteligente._**

- [GitHub](https://github.com/austintgriffith/scaffold-eth)
- [Ejemplo de DApp](https://punkwallet.io/)

**Crear una aplicación Ethereum_: crear aplicaciones Ethereum con un comando. _**

- [GitHub](https://github.com/paulrberg/create-eth-app)

**One Click Dapp _: Herramienta FOSS para generar interfaces de dapp a partir de una [ABI](/glossary/#abi)._**

- [oneclickdapp.com](https://oneclickdapp.com)
- [GitHub](https://github.com/oneclickdapp/oneclickdapp-v1)

**Etherflow_: herramienta FOSS para que los desarrolladores de Ethereum prueben sus nodos, así como para componer & y depurar las llamadas RPC desde el navegador._|**

- [etherflow.quiknode.io](https://etherflow.quiknode.io/)
- [GitHub](https://github.com/abunsen/etherflow)

**web3 _- Kits de desarrollo de software (o SDK) en todos los idiomas, contratos inteligentes, herramientas e infraestructuras para desarrolladores de Web3._**

- [Página de inicio](https://thirdweb.com/)
- [Documentación](https://portal.thirdweb.com/)
- [GitHub](https://github.com/thirdweb-dev/)

## Más información {#further-reading}

- [Explorar DApps](/dapps)
- [La arquitectura de una aplicación en Web 3.0](https://www.preethikasireddy.com/post/the-architecture-of-a-web-3-0-application) - _Preethi Kasireddy_
- [Una guía de 2021 para las Aplicaciones Descentralizadas](https://limechain.tech/blog/what-are-dapps-the-2021-guide/): _LimeChain_
- [¿Qué son las Aplicaciones Descentralizadas?](https://www.gemini.com/cryptopedia/decentralized-applications-defi-dapps): _Gemini_
- [DApps populares](https://www.alchemy.com/dapps): _Alquimia_

_¿Conoce algún recurso de la comunidad que le haya servido de ayuda? Edite esta página y añádalo._

## Temas relacionados {#related-topics}

- [Introducción a la pila de Ethereum](/developers/docs/ethereum-stack/)
- [Entornos de desarrollo](/developers/docs/frameworks/)
