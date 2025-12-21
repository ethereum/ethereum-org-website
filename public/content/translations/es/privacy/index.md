---
title: Privacidad en Ethereum
description: Herramientas y técnicas para proteger su privacidad en Ethereum
lang: es
---

# Privacidad en Ethereum {#introduction}

La privacidad no solo es esencial para la seguridad personal, es una piedra angular de la libertad y un [garante clave para la descentralización](https://vitalik.eth.limo/general/2025/04/14/privacy.html). La privacidad da a las personas la capacidad de expresarse, transaccionar con otros y organizar comunidades libremente. Pero, como todas las blockchains, el libro mayor público de Ethereum hace que la privacidad sea un desafío.

Ethereum es transparente por diseño. Cada acción en la cadena es visible para cualquier persona que la observe. Si bien Ethereum ofrece seudonimato al vincular su actividad a una [clave pública](/decentralized-identity/#public-key-cryptography) en lugar de una identidad del mundo real, los patrones de actividad pueden analizarse para revelar información sensible e identificar a los usuarios.

Integrar herramientas que preserven la privacidad en Ethereum puede ayudar a personas, organizaciones e instituciones a interactuar de manera segura, limitando la exposición innecesaria. Esto hace que el ecosistema sea más seguro y práctico para una mayor variedad de casos de uso.

## Privacidad en las escrituras {#privacy-of-writes}

Por defecto, cada transacción escrita en Ethereum es pública y permanente. Esto incluye no solo enviar ETH, sino también registrar nombres ENS, coleccionar POAP o intercambiar NFT. Acciones cotidianas como pagos, votaciones o verificaciones de identidad pueden revelar su información a partes no deseadas. Hay varias herramientas y técnicas que pueden ayudar a hacer que estas acciones sean más privadas:

### Protocolos de mezcla (o "mixers") {#mixing-protocols}

Los mezcladores rompen el vínculo entre emisores y destinatarios al poner las transacciones de muchos usuarios en un "pool" compartido, y luego permitir retiros a una dirección nueva. Dado que los depósitos y retiros se mezclan, es mucho más difícil para los observadores conectarlos.

_Ejemplos: [PrivacyPools](https://docs.privacypools.com/), [Tornado Cash](https://tornado.cash/)_

### Pools protegidos {#shielded-pools}

Los pools protegidos son similares a los mixers pero permiten a los usuarios mantener y transferir fondos de forma privada dentro del propio pool. En vez de solo ocultar el vínculo entre depósito y retiro, los pools protegidos mantienen un estado privado permanente, a menudo asegurado con pruebas de conocimiento cero. Esto hace posible construir transferencias privadas, balances privados y más.

_Ejemplos: [Railgun](https://www.railgun.org/), [Aztec](https://aztec.network/), Nightfall_

### Direcciones sigilosas {#stealth-addresses}

Una [dirección sigilosa](https://vitalik.eth.limo/general/2023/01/20/stealth.html) es como dar a cada remitente un casillero postal único y de un solo uso. que solo usted puede abrir. Cada vez que alguien le envía criptomonedas, estas llegan a una dirección nueva, de modo que nadie más puede ver que todos esos pagos le pertenecen. Esto mantiene su historial de pagos privado y más difícil de rastrear.

_Ejemplos: [UmbraCash](https://app.umbra.cash/faq), [FluidKey](https://www.fluidkey.com/)_

### Otros casos de uso {#other-use-cases}

Otros proyectos que exploran escrituras privadas incluyen [PlasmaFold](https://pse.dev/projects/plasma-fold) (pagos privados) y sistemas como [MACI](https://pse.dev/projects/maci) y [Semaphore](https://pse.dev/projects/semaphore) (votaciones privadas).

Estas herramientas amplían las opciones para escribir de forma privada en Ethereum, pero cada una implica ciertas compensaciones. Algunos enfoques aún son experimentales, otros aumentan los costos o la complejidad, y herramientas como mixers pueden enfrentar escrutinio legal o regulatorio según cómo se usen.

## Privacidad en las lecturas {#privacy-of-reads}

Leer o consultar cualquier información en Ethereum (por ejemplo, el saldo de su cartera) normalmente se realiza a través de un servicio como el proveedor de su cartera, un proveedor de nodos o un explorador de bloques. Como depende de ellos para leer la blockchain por usted, también pueden ver sus solicitudes junto con metadatos como su dirección IP o ubicación. Si consulta la misma cuenta con frecuencia, esta información puede ser rastreada para vincular su identidad con su actividad.

Ejecutar su propio nodo de Ethereum evitaría esto, pero almacenar y sincronizar la blockchain completa sigue siendo costoso e impracticable para la mayoría de los usuarios, especialmente en dispositivos móviles.

Algunos proyectos que exploran lecturas privadas incluyen [Private Information Retrieval](https://hackmd.io/@brech1/ethereum-privacy-pir?utm_source=preview-mode&utm_medium=rec) (PIR, obtener datos sin revelar lo que se consulta), [zkID](https://hackmd.io/@brech1/ethereum-privacy-pir?utm_source=preview-mode&utm_medium=rec) (verificaciones privadas de identidad usando pruebas de conocimiento cero), [vOPRF](https://pse.dev/projects/voprf) (usar cuentas Web2 como seudónimas en Web3), [vFHE](https://pse.dev/blog/zero-to-start-applied-fully-homomorphic-encryption-fhe-part-1) (cálculo sobre datos cifrados) y [MachinaIO](https://pse.dev/projects/machina-io) (ocultar detalles de programas manteniendo la funcionalidad).

## Privacidad en la prueba {#privacy-of-proving}

Las pruebas que preservan la privacidad son herramientas que puede usar en Ethereum para demostrar que algo es cierto sin revelar detalles innecesarios. Por ejemplo, podría:

- Demostrar que es mayor de 18 años sin compartir su fecha de nacimiento completa
- Demostrar la propiedad de un NFT o token sin revelar toda su cartera
- Demostrar elegibilidad para una membresía, recompensa o voto sin exponer otros datos personales

La mayoría de estas herramientas se basan en técnicas criptográficas como las pruebas de conocimiento cero, pero el reto es hacerlas lo suficientemente eficientes para funcionar en dispositivos cotidianos, ser portables en cualquier plataforma y seguras.

Algunos proyectos que exploran privacidad en la prueba incluyen [Client Side Proving](https://pse.dev/projects/client-side-proving) (sistemas de pruebas ZK), [TLSNotary](https://tlsnotary.org/) (pruebas de autenticidad de cualquier dato en la web), [Mopro](https://pse.dev/projects/mopro) (pruebas cliente móvil), [Private Proof Delegation](https://pse.dev/projects/private-proof-delegation) (marcos de delegación que evitan suposiciones de confianza) y [Noir](https://noir-lang.org/) (lenguaje para computación privada y verificable).

## Glosario de privacidad {#privacy-glossary}

**Anónimo**: Interactuar eliminando permanentemente todos los identificadores de sus datos, haciendo imposible rastrear la información hacia un individuo.

**Cifrado**: Proceso que codifica los datos para que solo alguien con la clave correcta pueda leerlos.

**[Cifrado Homomórfico Completo](https://pse.dev/blog/zero-to-start-applied-fully-homomorphic-encryption-fhe-part-1) (FHE)**: Método que permite realizar cálculos directamente sobre datos cifrados, sin necesidad de descifrarlos.

**[Ofuscación Indistinguible](https://pse.dev/projects/machina-io) (iO)**: Técnicas de privacidad que hacen que los programas o datos sean ininteligibles pero sigan siendo utilizables.

**[Cómputo Multiparte Seguro](https://pse.dev/blog/secure-multi-party-computation) (MPC)**: Métodos que permiten a varias partes calcular un resultado juntas sin exponer sus entradas privadas.

**Criptografía Programable**: Criptografía flexible, basada en reglas, que puede personalizarse mediante software para controlar cómo y cuándo se comparte, verifica o revela información.

**Seudónimo**: Uso de códigos o números únicos (como una dirección de Ethereum) en lugar de identificadores personales.

**Revelación selectiva**: Capacidad de compartir solo lo necesario (por ejemplo, demostrar que posee un NFT sin revelar todo el historial de su cartera).

**No vinculabilidad**: Garantizar que acciones separadas en la blockchain no puedan relacionarse con una misma dirección.

**Verificabilidad**: Garantizar que otros puedan confirmar que una afirmación es verdadera, como validar una transacción o una prueba en Ethereum.

**Delegación verificable**: Asignar una tarea—como generar una prueba—a otra parte (por ejemplo, una cartera móvil que usa un servidor para cálculos criptográficos complejos) asegurando que pueda verificarse que se realizó correctamente.

**[Pruebas de conocimiento cero](/zero-knowledge-proofs/#why-zero-knowledge-proofs-are-important) (ZKP)**: Protocolos criptográficos que permiten demostrar que una información es verdadera sin revelar los datos subyacentes.

**ZK Rollup**: Sistema de escalabilidad que agrupa transacciones fuera de la cadena y presenta una prueba de validez en la cadena. No es privado por defecto, pero permite sistemas de privacidad eficientes (como pools protegidos) al reducir costos.

## Recursos {#resources}

- [Privacy Stewards of Ethereum](https://pse.dev/) (PSE), un laboratorio de investigación y desarrollo de la Fundación Ethereum centrado en la privacidad para el ecosistema.
- [Web3PrivacyNow](https://web3privacy.info/), una red de personas, proyectos y organizaciones afines que protegen y promueven los derechos humanos en línea.
- [WalletBeat](https://beta.walletbeat.eth.limo/wallet/summary/), un sitio de valoración de carteras Ethereum que busca proporcionar una lista completa de carteras, su funcionalidad, prácticas y soporte para ciertos estándares.
- [Zk-kit](https://zkkit.pse.dev/): Un conjunto de bibliotecas (algoritmos, funciones utilitarias y estructuras de datos) que se pueden reutilizar en diferentes proyectos y protocolos de conocimiento cero.
- [Privacy Apps](/apps/categories/privacy/) - Descubra una lista de aplicaciones de privacidad seleccionadas que funcionan en Ethereum.
