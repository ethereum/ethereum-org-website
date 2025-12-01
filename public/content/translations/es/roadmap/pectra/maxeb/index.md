---
title: MaxEB de Pectra
description: Más información sobre MaxEB en la publicación de Pectra
lang: es
---

# MaxEB {#maxeb}

_tl;dr:_ La bifurcación dura Petra permite a los validadores de Ethereum optar por un balance efectivo máximo más alto y por intereses sobre intereses mediante la conversión de los credenciales de retirada de **Tipo 1** a los de **Tipo 2**. La herramienta oficial para hacer esto es el lanzador. Esta operación no se puede revertir.

## Presentación {#overview}

### ¿A quién le afecta? {#who-is-affected}

Todos los que ejecuten un validador —probablemente sea alguien que conoce el índice (por ejemplo, [Validador #12345](https://beaconcha.in/validator/12345)) de un validador bajo su control—. Si usa un protocolo para ejecutar un validador (por ejemplo, Lido CSM o Rocket Pool), tendrá que consultar con ellos para ver si admiten maxEB y cuándo lo admiten.

Si participa usando un token de participación líquido (como rETH o stETH), no se requiere o recomienda ninguna acción.

### ¿Qué es «maxEB»? {#what-is-maxeb}

maxEB = balance máximo efectivo de un validador. Hasta la bifurcación dura Pectra, cada validador gana sobre un máximo de 32 ETH. Después de Pectra, los validadores tienen la opción de ganar sobre cualquier balance entre 32 y 2048 ETH, en incrementos de 1 ETH optando participar en el cambio.

### ¿Cómo elige participar un validador? {#how-does-a-validator-opt-in}

Un validador elige participar en el cambio maxEB pasando de los credenciales de retirada de **Tipo 1** a los de **Tipo 2**. Esto puede hacerse en el [lanzador](https://launchpad.ethereum.org/) después de que se lleve a cabo la bifurcación dura Pectra. Como con **Tipo 0** → **Tipo 1**, convertir de **Tipo 1** → **Tipo 2** es un proceso irreversible.

### ¿Qué es una credencial de retirada? {#whats-a-withdrawal-credential}

Cuando ejecuta un validador, tiene un conjunto de credenciales de retirada. Estos se pueden encontrar en los datos de depósito json o se pueden ver en el beaconcha.in de su validador [pestaña de depósito].
(https://beaconcha.in/validator/12345#deposits).

1. Credenciales de retirada de **tipo 0**: si las credenciales de retirada de su validador comienzan con `0x00...`, usted realizó un depósito antes de la bifurcación dura de Shapella y aún no tiene una dirección de retirada configurada.

![Credencial de retirada de tipo 0](./0x00-wd.png)

2. Credenciales de retirada de **tipo 1**: si los credenciales de retirada de su validador comienzan por `0x01...`, usted realizó un depósito antes de la bifurcación dura de Shapella o ya convirtió sus credenciales de **tipo 0** a credenciales de **tipo 1**.

![Credencial de retirada de tipo 1](./0x01-wd.png)

3. Credenciales de retirada de **tipo 2**: este nuevo tipo de credencial de retirada comenzará por `0x02...` y se habilitará después de Pectra. Los validadores con credenciales de **tipo 2** a veces son llamados **validadores compuestos**

| **Permitido**     | **No permitido**  |
| ----------------- | ----------------- |
| ✅ Tipo 0 → Tipo 1 | ❌ Tipo 0 → Tipo 2 |
| ✅ Tipo 1 → Tipo 2 | ❌ Tipo 1 → Tipo 0 |
|                   | ❌ Tipo 2 → Tipo 1 |
|                   | ❌ Tipo 2 → Tipo 0 |

### Riesgos {#risks}

MaxEB permite a un validador mandar todo su balance a otro validador. Los usuarios que envíen una solicitud de consolidación deben verificar el origen y el contenido de la transacción que están firmando. La herramienta oficial para sacarle partido a las funcionalidades de maxEB es el lanzador. Si decide usar una herramienta de terceros, debería comprobar que:

- La clave pública de la fuente del validador y la dirección de retirada coinciden con el validador que controlan
- La clave pública del validador de destino es correcta y les pertenece
- La petición es una conversión, no una consolidación, si no tienen intención de enviar fondos a otro validador
- La transacción se está firmando por la dirección de retirada correcta

**Recomendamos encarecidamente** que delibere sobre cualquier herramienta de terceros que tenga pensado usar con la [comunidad de EthStaker](https://ethstaker.org/about). Es un lugar útil para verificar la sensatez de su enfoque y evitar errores. Si usa una herramienta maliciosa o mal configurada, **el balance completo de su validador podría envuarse a un validador que no controla** —y no hay forma de recuperarlo—.

## Detalles técnicos {#technical-details}

### El flujo {#the-flow}

Habrá dos usos posibles de la operación `ConsolidationRequest`:

1. Convertir un validador existente de **tipo 1** a un validador de **tipo 2**
2. Consolidar otros validadores en un validador de **tipo 2** existente

En una conversión de un validador **Tipo 1** a un validador **Tipo 2**, tanto la _fuente_ como el _objetivo_ serán el validador que está convirtiendo. La operación costará gas y se pondrá a la cola detrás de otras solicitudes de consolidación. Esta cola está **separada** de la cola de depósitos y no se ve afectada por los nuevos depósitos de validador y se puede ver en [pectrified.com](https://pectrified.com/).

Para consolidar los validadores, debe tener un _validador de destino_ que tenga una credencial de retirada **Tipo 2**. Este es el destino de cualquier saldo validador que se consolide y que se conserve el índice.

### Requisitos para convertir a tipo 2 {#requirements-for-converting-to-type-2}

Esto será necesario para el primer validador que convierta a **Tipo 2**. El índice de este validador se conserva y está activo. Para una conversión, el _validador de origen_ == el \*validador de destino. \*

El validador debe...

- estar activo
- tener credenciales de retirada de **tipo 1**
- no estar en un estado de salida (o cortado)
- no tener retiradas activadas manualmente pendientes (no se aplica a los barridos)

![Ilustración de conversión](./conversion.png)

### Requisitos para consolidar {#requirements-for-consolidating}

Esta es la _misma operación_ que la conversión, pero es cuando el _validador de origen_ es diferente del _validador de destino_. El índice del validador de destino se conserva y acepta el saldo del validador de origen. El índice del validador de origen se pone en un estado `EXITED`.

En este caso, el validador de código fuente tiene todos los mismos requisitos que los anteriores, además de:

- haber estado activo durante al menos ~27,3 horas (uno `SHARD_COMMITTEE_PERIOD`)

El validador de destino debe

- tener credenciales de retirada del **tipo 2**
- no estar en un estado de salida.

![Ilustración de consolidación](./consolidation.png)

### La petición de consolidación {#the-consolidation-request}

La solicitud de consolidación la firmará la dirección de retirada asociada con el validador de origen y tendrá:

1. Dirección del validador de origen (por ejemplo, `0x15F4B914A0cCd14333D850ff311d6DafbFbAa32b`)
2. Clave pública del validador de origen (por ejemplo, `0xa1d1ad0714035353258038e964ae9675dc0252ee22cea896825c01458e1807bfad2f9969338798548d9858a571f7425c`)
3. Clave pública de ese validador de destino

En una conversión, 2 y 3 serán iguales. Esta operación se puede hacer en [el lanzador](https://launchpad.ethereum.org/).

### Requisitos de firma {#signing-requirements}

Para enviar una `ConsolidationRequest`, la **dirección de retirada del validador de origen** debe firmar la solicitud. Esto demuestra el control sobre los fondos del validador.

### ¿Qué se ha firmado? {#what-is-signed}

Se utiliza una [raíz de firma] separada por dominio (https://github.com/ethereum/consensus-specs/blob/dev/specs/phase0/beacon-chain.md#compute_signing_root) del objeto `ConsolidationRequest`.

- **Dominio:** `DOMAIN_CONSOLIDATION_REQUEST`
- **Firmando campos raíz:**
  - `source_pubkey`: `BLSPubkey`
  - `target_pubkey`: `BLSPubkey`
  - `source_address`: `ExecutionAddress`

La **firma BLS** resultante se envía junto con la solicitud.

Nota: la firma se realiza mediante la dirección de retirada, no con la clave de validación.

### Retiradas parciales {#partial-withdrawals}

Los validadores con credenciales **Tipo 1** obtienen barridos automáticos sin gas de su exceso de saldo (cualquier cosa por encima de 32 ETH) a su dirección de retirada. Debido a que **Tipo 2** permite a un validador componer saldos en incrementos de 1 ETH, no barrerá automáticamente los saldos hasta que alcance 2048 ETH. Las retiradas parciales en los validadores **Tipo 2** deben activarse manualmente y costarán gas.

## Herramientas de consolidación {#consolidation-tooling}

Hay varias herramientas disponibles para gestionar las consolidaciones. La herramienta oficial, creada por Ethereum Foundation, es [Launchpad](https://launchpad.ethereum.org/en/validator-actions). También hay herramientas de terceros creadas por entidades de la comunidad de participaciones que pueden ofrecer características que no proporcione el lanzador. Si bien Ethereum Foundation no audita ni respalda las herramientas aquí, las siguientes son herramientas de código abierto de miembros conocidos de la comunidad.

| Herramienta                                | Sitio web                                                    | Código abierto                 | Creador                                        | Auditado                                                                                                                                               | Interfaz                                                                   | Características destacables                                              |
| ------------------------------------------ | ------------------------------------------------------------ | ------------------------------ | ---------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------- | ------------------------------------------------------------------------ |
| Administrador de participaciones de Pectra | pectrastaking.com                            | Sí, Apache 2.0 | [Pier Two](https://piertwo.com/)               | No                                                                                                                                                     | Interfaz de usuario web                                                    | Wallet Connect, funciona con SAFE                                        |
| Herramienta CLI de Pectra Validator Ops    | [GitHub](https://github.com/Luganodes/Pectra-Batch-Contract) | Sí, MIT                        | [Luganodes](https://www.luganodes.com/)        | Sí, cuantstamp [mayo de 2025](https://certificate.quantstamp.com/full/luganodes-pectra-batch-contract/23f0765f-969a-4798-9edd-188d276c4a2b/index.html) | Línea de comandos                                                          | Batching, para muchos validadores a la vez                               |
| Ethereal                                   | [GitHub](https://github.com/wealdtech/ethereal)              | Sí, Apache 2.0 | [Jim McDonald](https://www.attestant.io/team/) | No                                                                                                                                                     | Línea de comandos                                                          | Lista completa de características para la gestión de validadores y nodos |
| Siren                                      | [GitHub](https://github.com/sigp/siren)                      | Sí, Apache 2.0 | [Sigma Prime](https://sigmaprime.io/)          | No                                                                                                                                                     | Algunas líneas de comandos, pero principalmente la interfaz de usuario web | Solo funciona si está utilizando el cliente de consenso de Lighthouse    |

## Preguntas frecuentes {#faq}

### ¿Dar el consentimiento cambia mi propuesta de suerte o recompensas? {#change-luck-or-rewards}

No. Dar el consentimiento no disminuye su cambio de propuesta: sus deberes y selección de propuestas siguen siendo los mismos. Por ejemplo, si tiene dos validadores de 32 ETH frente a un validador de 64 ETH, tendrá las mismas posibilidades totales de ser seleccionado para proponer un bloque y ganar recompensas.

### ¿Dar consentimiento cambia en algo mis riesgos de sufrir recortes? {#change-slashing-risk}

Para operadores más pequeños o no profesionales, la respuesta corta es no. La respuesta más larga es que para los operadores profesionales que ejecutan muchos validadores por nodo con alerta rápida, consolidar en menos validadores puede reducir su capacidad de reaccionar a un recorte y evitar eventos en cascada. El recorte inicial de _penalización_ para todos los validadores se ha reducido drásticamente de 1 ETH (por 32 ETH) a 0,0078125 ETH (por 32 ETH) para compensar este riesgo.

### ¿Tengo que salir de mi validador para convertir? {#exit-validator}

No. Puede convertir en su lugar sin tener que salir.

### ¿Cuánto tiempo llevará convertir / consolidar? {#how-long}

Un mínimo de 27,3 horas, aunque las consolidaciones también tienen una lista de espera. Esta cola es independiente de los depósitos y las retiradas y no se ve afectada por ellos.

### ¿Puedo mantener mi índice de validador? {#keep-validator-index}

Sí. La conversión en el lugar mantiene el mismo índice de validador. Si consolida múltiples validadores, solo podrá mantener el índice del _validador de destino_.

### ¿Perderé las certificaciones? {#miss-attestations}

Durante una consolidación en otro validador, se sale el validador de la fuente y hay un período de espera de ~ 27 horas antes de que el saldo sea activo en el validador de destino. Este período \*\* no afecta las métricas de rendimiento \*\*.

### ¿Incurriré en penalizaciones? {#incur-penalties}

No. Mientras su validador esté en línea, no incurrirá en penalizaciones.

### ¿Las direcciones de retirada de los validadores que se consolidan tienen que coincidir? {#withdrawal-addresses-match}

No. Aunque la _fuente_ debe autorizar la solicitud desde su propia dirección.

### ¿Mis recompensas se agravarán después de convertir? {#rewards-compound}

Sí. Con credenciales de \*\* Tipo 2 \*\*, las recompensas superiores a 32 ETH se reenvían automáticamente para participación, pero no al instante. Debido a un pequeño búfer (llamado [_histéresis_] (https://eth2book.info/capella/part2/incentives/balances/#hysteresis)), su saldo debe alcanzar \*\* alrededor de 1,25 eth más \*\* antes de volver a enviar para participación la cantidad adicional. Entonces, en lugar de capitalizarse a 33,0 ETH, ocurre en 33,25 (saldo efectivo = 33 ETH), luego 34,25 (saldo efectivo = 34 ETH), etc.

### ¿Aún puedo obtener barridos automáticos después de convertir? {#automatic-sweep}

Los barridos automáticos solo ocurrirán con exceso de saldos por encima de 2048. Para todas las demás retiradas parciales, tendrá que activarlas manualmente.

### ¿Puedo cambiar de opinión y volver del Tipo 2 al Tipo 1? {#go-back-to-type1}

No. La conversión a **tipo 2** es irreversible.

### Si quiero consolidar varios validadores, ¿tengo que convertir cada uno a Tipo 2 primero? {#consolidate-multiple-validators}

¡Pues no! Convierta un validador a Tipo 2 y luego úselo como objetivo. Todos los demás validadores consolidados en ese objetivo de Tipo 2 pueden ser Tipo 1 o Tipo 2

### Mi validador está fuera de línea o por debajo de 32 ETH, ¿todavía puedo convertirlo? {#offline-or-below-32eth}

Sí. Mientras esté activo (no salga) y pueda firmar con su dirección de retirada, puede convertirlo.

## Recursos {#resources}

- [Especificaciones de consenso de Electra] (https://github.com/ethereum/consensus-specs/blob/dev/specs/electra/beacon-hain.md): esta es la versión más real en la que debe confiar. En caso de duda, lea las especificaciones
- No todo el mundo se sienten cómodo operando con un código, por eso [este maxeb-gpt] (https://chatgpt.com/g/g-67f1650fb48081918f555e0c8d1c2ae9-maxeb-gpt) interpretar las especificaciones puede servirle de ayuda. _Descargo de responsabilidad: las especificaciones, no la IA, deben confiar en la verdad, ya que la IA puede malinterpretar la información o dar respuestas descabelladas_
- [pectrified.com] (https://pectrifice.com/): ver el estado de consolidaciones, depósitos y tiempos de listas de espera
- [Ethereal] (https://github.com/wealdtech/ethereal): herramienta CLI creada por la comunidad para administrar tareas de validador comunes
- [Batch-validator-depositor](https://github.com/attestantio/batch-validator-depositor): contrato creado por la comunidad que permite depositar múltiples validadores de Ethereum en una sola transacción
