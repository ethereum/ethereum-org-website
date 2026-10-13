---
title: "Hegotá"
metaTitle: "Heze-Bogotá (Hegotá)"
description: "Aprende sobre la actualización del protocolo Hegotá"
lang: es
template: upgrade
---

Hegotá es la actualización de la red [Ethereum](/) que se espera que siga a [Glamsterdam](/roadmap/glamsterdam/). Su nombre proviene de la combinación de "Bogotá" (actualización de la capa de ejecución, nombrada por una ubicación anterior de Devcon) y "Heze" (actualización de la capa de consenso, nombrada por una estrella).

Hegotá se encuentra en las primeras fases de planificación. Se ha elegido su característica principal y desde entonces se ha programado un segundo cambio, pero el resto del alcance aún se está decidiendo y no se han fijado fechas.

## Característica principal: FOCIL {#focil}

<EipTag upgrade="hegota" id={7805} />

Las listas de inclusión forzadas por la elección de bifurcación (FOCIL, o EIP-7805) tratan sobre la [resistencia a la censura](/roadmap/security/#censorship-resistance): asegurarse de que una transacción válida entre en un bloque incluso si las personas que construyen los bloques prefirieran dejarla fuera.

Hoy en día, un solo [validador](/glossary/#validator) construye cada bloque y decide qué transacciones contiene. Por lo tanto, cualquiera que pueda influir en suficientes constructores de bloques puede retrasar una transacción, y un usuario no tiene forma de forzar la situación más que esperar y tener esperanza.

FOCIL distribuye esa decisión entre muchos validadores. Un comité propone una lista de transacciones que deberían incluirse, y las reglas del protocolo obligan al constructor de bloques a respetar esas listas. Censurar una transacción deja de ser algo que una sola parte pueda hacer por sí sola.

## Transacciones de marco {#frame-transactions}

<EipTag upgrade="hegota" id={8141} />

Las transacciones de marco (EIP-8141) permiten que una [cuenta](/glossary/#account) decida por sí misma qué cuenta como una transacción válida, en lugar de que el protocolo insista en un esquema de firma fijo.

Hoy en día, cada transacción se autoriza de la misma manera: una firma, de una clave. Las [cuentas de contratos inteligentes](/roadmap/account-abstraction/) evitan esto enrutando las transacciones a través de infraestructura adicional, lo que cuesta gas y añade partes móviles que pueden fallar.

Una transacción de marco traslada la comprobación a la propia cuenta. La cuenta ejecuta su propia lógica de verificación, por lo que las capacidades que actualmente necesitan esa infraestructura adicional (recuperación social, límites de gasto, requerir varias aprobaciones, permitir que otra persona pague el gas) se convierten en cosas que el protocolo soporta directamente.

Debido a que la cuenta elige sus propias reglas, también puede elegir un esquema de firma que una computadora cuántica no podría romper. Eso hace que esto sea un paso hacia la [resistencia cuántica](/roadmap/security/#quantum-resistance), así como hacia mejores billeteras.

## Qué más hay en Hegotá {#scope}

Aún no se ha decidido. FOCIL y las transacciones de marco son los dos cambios programados hasta ahora; se han propuesto docenas más y ninguno de ellos está resuelto. Esta página se mantendrá breve hasta que el alcance se defina; para conocer el estado actual de la discusión, consulta los recursos a continuación.

## Más información {#further-reading}

- [Forkcast: Hegotá](https://forkcast.org/upgrade/hegota): estado en vivo de cada propuesta
- [Meta EIP de Hegotá (EIP-8081)](https://eips.ethereum.org/EIPS/eip-8081)
- [Especificación técnica de EIP-7805](https://eips.ethereum.org/EIPS/eip-7805)
- [Especificación técnica de EIP-8141](https://eips.ethereum.org/EIPS/eip-8141)
- [Hoja de ruta de Ethereum](/roadmap/)
