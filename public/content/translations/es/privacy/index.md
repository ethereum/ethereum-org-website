---
title: Privacidad en Ethereum
description: Herramientas y técnicas para proteger su privacidad en Ethereum
lang: es
---

La privacidad no solo es esencial para la seguridad personal, es una piedra angular de la libertad y un [garante clave para la descentralización](https://vitalik.eth.limo/general/2025/04/14/privacy.html). La privacidad otorga a las personas la capacidad de expresarse, realizar transacciones con otros y organizar comunidades libremente. Pero, al igual que todas las cadenas de bloques, el libro mayor público de Ethereum hace que la privacidad sea un desafío.

Ethereum es transparente por diseño. Cada acción en cadena es visible para cualquiera que la observe. Si bien Ethereum ofrece seudonimato al vincular su actividad a una [clave pública](/decentralized-identity/#public-key-cryptography) en lugar de a una identidad del mundo real, los patrones de actividad podrían analizarse para revelar información confidencial e identificar a los usuarios.

La integración de herramientas que preservan la privacidad en Ethereum puede ayudar a las personas, organizaciones e instituciones a interactuar de forma segura al tiempo que limita la exposición innecesaria. Esto hace que el ecosistema sea más seguro y práctico para una gama más amplia de casos de uso.

<VideoWatch slug="privacy-is-existential" />

## Privacidad para escrituras {#privacy-of-writes}

Por defecto, cada transacción escrita en Ethereum es pública y permanente. Esto incluye no solo el envío de ETH, sino también el registro de nombres ENS, la recopilación de POAP o el comercio de NFT. Las acciones cotidianas como los pagos, el voto o la verificación de identidad pueden revelar su información a terceros no deseados. Existen varias herramientas y técnicas que pueden ayudar a que estas acciones sean más privadas:

### Protocolos de mezcla (o "mezcladores") {#mixing-protocols}

Los mezcladores rompen el vínculo entre remitentes y destinatarios al colocar las transacciones de muchos usuarios en un "fondo" compartido y luego permitir que las personas realicen un retiro más tarde a una dirección nueva. Dado que los depósitos y los retiros se mezclan, es mucho más difícil para los observadores conectarlos.

_Ejemplos: [PrivacyPools](https://docs.privacypools.com/), [Tornado Cash](https://tornado.cash/)_

### Fondos blindados {#shielded-pools}

Los fondos blindados son similares a los mezcladores, pero permiten a los usuarios mantener y realizar transferencias de fondos de forma privada dentro del propio fondo. En lugar de simplemente ocultar el vínculo entre el depósito y el retiro, los fondos blindados mantienen un estado privado continuo, a menudo asegurado con pruebas de conocimiento cero. Esto hace posible crear transferencias privadas, saldos privados y más.

_Ejemplos: [Railgun](https://www.railgun.org/), [Aztec](https://aztec.network/), Nightfall_

### Direcciones sigilosas {#stealth-addresses}

Una [dirección sigilosa](https://vitalik.eth.limo/general/2023/01/20/stealth.html) es como darle a cada remitente un apartado de correos único y de un solo uso que solo usted puede abrir. Cada vez que alguien le envía cripto, va a una dirección nueva, por lo que nadie más puede ver que todos esos pagos le pertenecen. Esto mantiene su historial de pagos privado y más difícil de rastrear.

_Ejemplos: [UmbraCash](https://app.umbra.cash/faq), [FluidKey](https://www.fluidkey.com/)_

### Otros casos de uso {#other-use-cases}

Otros proyectos que exploran las escrituras privadas incluyen [PlasmaFold](https://pse.dev/projects/plasma-fold) (pagos privados) y sistemas como [MACI](https://pse.dev/projects/maci) y [Semaphore](https://pse.dev/projects/semaphore) (voto privado).

Estas herramientas amplían las opciones para escribir de forma privada en Ethereum, pero cada una conlleva concesiones. Algunos enfoques aún son experimentales, otros aumentan los costos o la complejidad, y algunas herramientas como los mezcladores pueden enfrentar escrutinio legal o regulatorio dependiendo de cómo se utilicen.

## Privacidad para lecturas {#privacy-of-reads}

Leer o verificar cualquier información en Ethereum (por ejemplo, el saldo de su billetera) generalmente pasa por un servicio como su proveedor de billetera, un proveedor de nodo o un explorador de bloques. Debido a que confía en ellos para leer la cadena de bloques por usted, también pueden ver sus solicitudes junto con los metadatos, como su dirección IP o ubicación. Si sigue verificando la misma cuenta, esta información se puede juntar para vincular su identidad con su actividad.

Ejecutar su propio nodo de Ethereum evitaría esto, pero almacenar y sincronizar la cadena de bloques completa sigue siendo costoso y poco práctico para la mayoría de los usuarios, especialmente en dispositivos móviles.

Algunos proyectos que exploran las lecturas privadas incluyen la [Recuperación de Información Privada](https://hackmd.io/@brech1/ethereum-privacy-pir?utm_source=preview-mode&utm_medium=rec) (PIR, por sus siglas en inglés, para obtener datos sin revelar lo que está buscando), [zkID](https://hackmd.io/@brech1/ethereum-privacy-pir?utm_source=preview-mode&utm_medium=rec) (verificaciones de identidad privadas con pruebas de conocimiento cero), [vOPRF](https://pse.dev/projects/voprf) (usar cuentas de Web2 de forma seudónima en Web3), [vFHE](https://pse.dev/blog/zero-to-start-applied-fully-homomorphic-encryption-fhe-part-1) (computar sobre datos cifrados) y [MachinaIO](https://pse.dev/projects/machina-io) (ocultar detalles del programa manteniendo la funcionalidad).

## Privacidad para probar {#privacy-of-proving}

Las pruebas que preservan la privacidad son herramientas que puede usar en Ethereum para demostrar que algo es cierto sin revelar detalles innecesarios. Por ejemplo, podría:

- Demostrar que es mayor de 18 años sin compartir su fecha de nacimiento completa
- Demostrar la propiedad de un NFT o token sin revelar toda su billetera
- Demostrar la elegibilidad para una membresía, recompensa o voto sin exponer otros datos personales

La mayoría de las herramientas para esto se basan en técnicas de criptografía como las pruebas de conocimiento cero, pero el desafío es hacerlas lo suficientemente eficientes como para ejecutarse en dispositivos cotidianos, portátiles a cualquier plataforma y seguras.

Algunos proyectos que exploran la privacidad para probar incluyen [Client Side Proving](https://pse.dev/projects/client-side-proving) (sistemas de prueba ZK), [TLSNotary](https://tlsnotary.org/) (pruebas de autenticidad para cualquier dato en la web), [Mopro](https://pse.dev/projects/mopro) (pruebas del lado del cliente móvil), [Private Proof Delegation](https://pse.dev/projects/private-proof-delegation) (marcos de delegación que evitan los supuestos de confianza) y [Noir](https://noir-lang.org/) (lenguaje para la computación privada y verificable).

## Glosario de privacidad {#privacy-glossary}

**Anónimo**: Interactuar con todos los identificadores eliminados permanentemente de sus datos, lo que hace imposible rastrear la información hasta un individuo

**Cifrado**: Un proceso que mezcla los datos para que solo alguien con la clave correcta pueda leerlos

**[Cifrado homomórfico completo](https://pse.dev/blog/zero-to-start-applied-fully-homomorphic-encryption-fhe-part-1) (FHE)**: Una forma de realizar cálculos directamente sobre datos cifrados, sin descifrarlos nunca

**[Ofuscación indistinguible](https://pse.dev/projects/machina-io) (iO)**: Técnicas de privacidad que hacen que los programas o datos sean ininteligibles sin dejar de ser utilizables

**[Computación multiparte](https://pse.dev/blog/secure-multi-party-computation) (MPC)**: Métodos que permiten a múltiples partes calcular un resultado juntas sin exponer sus entradas privadas

**Criptografía programable**: Criptografía flexible y basada en reglas que se puede personalizar en el software para controlar cómo y cuándo se comparten, verifican o revelan los datos

**Seudónimo**: Uso de códigos o números únicos (como una dirección de Ethereum) en lugar de identificadores personales

**Divulgación selectiva**: La capacidad de compartir solo lo que se necesita (por ejemplo, demostrar que posee un NFT sin revelar todo el historial de su billetera)

**Invinculabilidad**: Asegurarse de que las acciones separadas en la cadena de bloques no se puedan vincular a la misma dirección

**Verificabilidad**: Garantizar que otros puedan confirmar que un reclamo es cierto, como validar una transacción o prueba en Ethereum

**Delegación verificable**: Asignar una tarea, como generar una prueba, a otra parte (por ejemplo, una billetera móvil que usa un servidor para criptografía pesada) sin dejar de poder verificar que se hizo correctamente

**[Pruebas de conocimiento cero](/zero-knowledge-proofs/#why-zero-knowledge-proofs-are-important) (ZKP)**: Protocolos de criptografía que permiten a alguien demostrar que la información es cierta sin revelar los datos subyacentes

**ZK Rollup**: Un sistema de escalabilidad que agrupa transacciones fuera de la cadena y envía una prueba de validez en cadena; no son privados por defecto, pero permiten sistemas de privacidad eficientes (como los fondos blindados) al reducir los costos

## Recursos {#resources}

- [Privacy Stewards of Ethereum](https://pse.dev/) (PSE), un laboratorio de investigación y desarrollo de la Fundación Ethereum centrado en la privacidad para el ecosistema
- [Web3PrivacyNow](https://web3privacy.info/), una red de personas, proyectos y organizaciones alineadas que protegen y promueven los derechos humanos en línea
- [WalletBeat](https://beta.walletbeat.eth.limo/wallet/summary/), un sitio de calificación de billeteras de Ethereum que tiene como objetivo proporcionar una lista completa de billeteras, su funcionalidad, prácticas y soporte para ciertos estándares.
- [Zk-kit](https://zkkit.org/): Un conjunto de bibliotecas (algoritmos, funciones de utilidad y estructuras de datos) que se pueden reutilizar en diferentes proyectos y protocolos de conocimiento cero.
- [Privacy Apps](/apps/categories/privacy/) - Descubra una lista seleccionada de aplicaciones de privacidad que se ejecutan en Ethereum.
