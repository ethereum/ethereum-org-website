---
title: "Cómo construir aplicaciones de privacidad en Ethereum con pruebas de conocimiento cero"
description: "Un patrón reutilizable impulsa el voto anónimo, los mezcladores, los airdrops y los sistemas de membresía en Ethereum. Aprenda el ciclo de compromiso-nulificador-prueba y cómo las herramientas de conocimiento cero hacen que sea práctico construir hoy en día."
author: "Philip Krause"
team: "EF Builder Growth"
tags:
  - "pruebas de conocimiento cero"
  - "privacidad"
published: 2026-05-12
image: /images/developers/blog/latest-post-header-2.png
breadcrumb: Aplicaciones de privacidad en Ethereum
lang: es
---

Ethereum es radicalmente público por diseño. Cada dirección, saldo, transacción, llamada a contrato y evento es visible para cualquiera con un explorador de bloques. Esa transparencia es útil cuando se desea verificabilidad. Es un problema cuando los usuarios necesitan votar, reclamar, retirar o demostrar membresía sin vincular cada acción a la misma billetera.

La membresía anónima es el patrón reutilizable que impulsa una gran clase de aplicaciones de privacidad en Ethereum. Las personas se registran primero y luego demuestran que pertenecen al grupo sin revelar qué miembro son. Una prueba de conocimiento cero es el puente entre la billetera de registro y la billetera de acción, y el puente no revela quién lo cruzó.

El producto circundante cambia, pero el esqueleto de privacidad sigue siendo el mismo.

## El patrón, explicado a través del voto anónimo {#the-pattern-explained-through-anonymous-voting}

El patrón tiene tres piezas. Un compromiso registra a cada miembro. Un árbol de Merkle convierte esos compromisos en una multitud. Una prueba y un nulificador permiten que un miembro actúe una vez sin revelar qué miembro actuó.

### Paso uno: el registro {#step-one-registering}

Cada votante crea dos valores privados fuera de la cadena, el secreto y el nulificador. El votante hashea esos valores en un compromiso público y luego registra ese compromiso en cadena.

El compromiso es el registro público. El secreto y el nulificador son la nota privada que el votante necesita más adelante. Si pierde la nota, el votante no podrá demostrar su membresía. Si se filtra, otra persona podría votar en lugar del usuario.

Debido a que el compromiso es un hash, los observadores no pueden recuperar los valores privados en su interior. El compromiso dice "alguien se registró" sin revelar quién usará ese registro más adelante.

### Paso dos: construir la multitud {#step-two-building-the-crowd}

A medida que se registran más votantes, la aplicación recopila sus compromisos en un árbol de Merkle. Un árbol de Merkle comprime una larga lista de valores en un solo hash, llamado raíz. Si se cambia cualquier valor en la lista, el hash cambia, por lo que la raíz actúa como un resumen a prueba de manipulaciones de todo el conjunto.

Ese árbol es su conjunto de anonimato. Si hay diez usuarios en el árbol, un observador puede reducir una acción posterior a uno de esos diez. Si hay diez mil usuarios en el árbol, la acción es mucho más difícil de vincular a una sola persona. Una aplicación privada con un conjunto de anonimato diminuto generalmente no es muy privada, incluso si la criptografía es correcta.

### Paso tres: actuar de forma anónima {#step-three-acting-anonymously}

Cuando se abre la encuesta, el votante no debe votar desde la misma billetera que registró el compromiso. Votar desde la billetera de registro vincularía el voto directamente con el solicitante del registro y desharía el trabajo de privacidad. En su lugar, el votante crea una prueba de conocimiento cero. La declaración se codifica como un circuito que dice: "Conozco valores privados que producen un compromiso registrado, y estoy revelando el hash del nulificador correcto para esta encuesta".

La prueba convence al contrato verificador de que la declaración es verdadera. No revela el secreto, el nulificador ni qué compromiso se utilizó.

El nulificador es lo que evita el doble voto. Junto a la prueba, el votante publica un hash del nulificador. El contrato de votación almacena ese hash después de aceptar el voto. Si se vuelve a utilizar la misma nota privada para la misma encuesta, se produce el mismo hash del nulificador y el contrato rechaza el segundo voto. Combinado con la prueba, esto deja al contrato sabiendo solo que algún votante registrado actuó una vez, no cuál de ellos.

## La puerta reutilizable {#the-reusable-gate}

Ese mismo par de prueba y nulificador funciona más allá de la votación. Si quitamos la historia de la votación, lo que tenemos es una puerta de privacidad para las funciones de los contratos inteligentes.

Antes de que se ejecute la función, el contrato comprueba la raíz de Merkle, verifica la prueba, confirma que el hash del nulificador no se ha utilizado y vincula las entradas públicas a la aplicación, cadena, encuesta, reclamo o retiro correctos. Si esas comprobaciones se superan, marca el nulificador como utilizado y ejecuta el resto de la función.

Ponga esa puerta frente a un voto y obtendrá una votación anónima. Póngala frente a un reclamo de airdrop y obtendrá reclamos anónimos. Póngala frente a una función de retiro y obtendrá el núcleo de un flujo de retiro estilo mezclador. El mismo árbol de compromisos, la misma idea de nulificador, el mismo patrón de prueba. Lo que cambia es el cuerpo de la función y la lógica de la aplicación circundante.

## Qué se ejecuta y dónde {#what-runs-where}

El trabajo privado generalmente ocurre fuera de la cadena. El usuario almacena la nota, y una aplicación cliente construye el testigo y ejecuta el probador para producir la prueba. Un indexador rastrea los compromisos y las raíces de Merkle. Un empaquetador propaga la operación de usuario (UserOperation) en cadena y un pagador ERC-4337 patrocina el gas, por lo que una billetera nueva no necesita ETH de una billetera conocida del usuario primero.

La aplicación pública ocurre en cadena. El contrato verificador comprueba la prueba. El contrato de la aplicación comprueba las raíces válidas y los nulificadores no utilizados, almacena el hash del nulificador y ejecuta la acción pública.

La experiencia de usuario (UX) sensible es el manejo de notas. Trate el secreto y el nulificador como claves. No los incluya en análisis, registros, URL, informes de errores ni en la telemetría normal del lado del servidor. Una vez que la nota se filtra, la privacidad desaparece, sin importar cuán fuerte sea la prueba.

## Las herramientas se han puesto al día {#the-tooling-caught-up}

No es necesario codificar a mano la criptografía subyacente. Un camino común es escribir el circuito en un lenguaje de conocimiento cero de alto nivel, generar un verificador en Solidity y llamar a ese verificador desde el contrato de la aplicación.

La pila tecnológica adecuada depende del trabajo. Circom con snarkjs es un camino consolidado para circuitos a nivel de aplicación. Noir con Barretenberg es un camino más nuevo y amigable para los desarrolladores. Halo2 y gnark son bibliotecas de circuitos de nivel inferior. Las zkVM como RISC Zero o SP1 prueban programas normales, pero pueden ser más costosas de probar que un pequeño circuito personalizado.

Para la membresía anónima, recurra a un protocolo existente antes de escribir su propio circuito. Semaphore empaqueta la membresía de grupo y la prevención de doble uso basada en nulificadores en contratos y bibliotecas de JavaScript. Para la votación privada y la gobernanza, MACI es el camino especializado porque agrega propiedades anticolusión. Los protocolos maduros suelen ser más seguros que los circuitos nuevos.

## La prueba no es suficiente {#the-proof-is-not-enough}

Incluso una prueba perfecta falla si el flujo de la billetera filtra el vínculo. Regístrese desde la billetera A y luego actúe desde la billetera A, y cualquiera que esté observando podrá conectar las transacciones. Financie la billetera B desde la billetera A justo antes de actuar, y esa transacción de financiamiento crea el mismo problema.

Es por esto que los empaquetadores y los pagadores son importantes. La billetera de acción debe ser nueva y no debe necesitar recibir ETH de una billetera que el usuario está tratando de separar de la acción.

El mismo problema existe fuera de la cadena. Enviar transacciones de registro y acción desde la misma dirección IP, proveedor de RPC o sesión puede debilitar la privacidad que proporciona el circuito. Los frontends pueden filtrar información a través de análisis, almacenamiento local y registros de soporte. Una prueba de conocimiento cero oculta los valores dentro de la prueba. No oculta todo lo que rodea a la transacción.

Las entradas públicas son otro lugar donde fallan las aplicaciones de privacidad. Cualquier cosa marcada como pública en el circuito, emitida como un evento, incluida en los datos de llamada o almacenada por el contrato es visible. Revise las entradas públicas con el mismo cuidado que el control de acceso en un contrato en Solidity.

## Lo que esto cambia para los constructores {#what-this-changes-for-builders}

La privacidad en Ethereum está lista para implementarse. Los constructores pueden componer las piezas en aplicaciones reales. La pila tecnológica es un circuito para la declaración privada, un verificador para la comprobación de pruebas, un contrato de aplicación para las reglas públicas, un indexador para los datos de Merkle y un empaquetador más un pagador para el envío no vinculable y el patrocinio de gas.

Las partes difíciles son el diseño del producto, la gestión de claves, la higiene de los metadatos, las auditorías y el crecimiento del conjunto de anonimato. Si se equivoca en cualquiera de ellos, la privacidad que otorgó la prueba desaparecerá.

## Lecturas adicionales {#further-reading}

1. [Pruebas de conocimiento cero (ethereum.org)](https://ethereum.org/zero-knowledge-proofs/)
2. [Documentación de Semaphore](https://docs.semaphore.pse.dev/)
3. [Documentación de MACI](https://maci.pse.dev/)
4. [Documentación de Circom](https://docs.circom.io/)
5. [Documentación de Noir](https://noir-lang.org/)
6. [Libro de Halo2](https://zcash.github.io/halo2/)
7. [Documentación de gnark](https://docs.gnark.consensys.io/)
8. [Documentación de RISC Zero](https://dev.risczero.com/api/)
9. [Documentación de SP1](https://docs.succinct.xyz/docs/sp1/introduction)
10. [EIP-4337: Abstracción de cuentas a través del contrato EntryPoint](https://eips.ethereum.org/EIPS/eip-4337)