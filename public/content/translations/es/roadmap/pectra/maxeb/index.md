---
title: MaxEB
metaTitle: Pectra MaxEB
description: Obtén más información sobre MaxEB en la actualización Pectra
lang: es
authors: ["Nixo"]
---

*Resumen:* La bifurcación dura Pectra permite a los validadores de Ethereum optar por un saldo efectivo máximo más alto y capitalización (compounding) al convertir sus credenciales de retiro de **Tipo 1** a **Tipo 2**. La herramienta oficial para hacer esto es el Launchpad. Esta operación no se puede revertir.

## Descripción general {#overview}

### ¿A quién afecta? {#who-is-affected}

Cualquiera que ejecute un validador: probablemente sea alguien que conozca el índice (por ejemplo, [Validador #12345](https://beaconcha.in/validator/12345)) de un validador que controla. Si utilizas un protocolo para ejecutar un validador (por ejemplo, Lido CSM o Rocket Pool), tendrás que consultar con ellos para ver si admiten MaxEB y cuándo lo harán.

Si haces staking utilizando un token de staking líquido (LST) (por ejemplo, rETH o stETH), no se requiere ni se recomienda ninguna acción.

### ¿Qué es "MaxEB"? {#what-is-maxeb}

MaxEB = el saldo efectivo máximo (MAXimum Effective Balance) de un validador. Hasta la bifurcación dura Pectra, cada validador obtiene recompensas sobre un máximo de 32 ETH. Después de Pectra, los validadores tienen la opción de obtener recompensas sobre cualquier saldo entre 32 y 2048 ETH, en incrementos de 1 ETH, si optan por este cambio.

### ¿Cómo opta por participar un validador? {#how-does-a-validator-opt-in}

Un validador opta por el cambio a MaxEB convirtiendo sus credenciales de retiro de **Tipo 1** a **Tipo 2**. Esto se puede hacer en el [Launchpad (Acciones del validador)](https://launchpad.ethereum.org/validator-actions) después de que la bifurcación dura Pectra entre en funcionamiento. Al igual que con el **Tipo 0** → **Tipo 1**, la conversión de **Tipo 1** → **Tipo 2** es un proceso irreversible.

### ¿Qué son las credenciales de retiro? {#whats-a-withdrawal-credential}

Cuando ejecutas un validador, tienes un conjunto de credenciales de retiro. Estas se pueden encontrar en el archivo json de datos de tu depósito o puedes verlas en la [pestaña de depósitos](https://beaconcha.in/validator/12345#deposits) de tu validador en beaconcha.in.

1. Credenciales de retiro de **Tipo 0**: Si las credenciales de retiro de tu validador comienzan con `0x00...`, depositaste antes de la bifurcación dura Shapella y aún no tienes configurada una dirección de retiro.

![Type 0 withdrawal credential](./0x00-wd.png)

2. Credenciales de retiro de **Tipo 1**: Si las credenciales de retiro de tu validador comienzan con `0x01...`, depositaste después de la bifurcación dura Shapella o ya convertiste tus credenciales de **Tipo 0** a credenciales de **Tipo 1**.

 ![Type 1 withdrawal credential](./0x01-wd.png)

3. Credenciales de retiro de **Tipo 2**: Este nuevo tipo de credencial de retiro comenzará con `0x02...` y se habilitará después de Pectra. A los validadores con credenciales de retiro de **Tipo 2** a veces se les llama "**validadores de capitalización**" (compounding validators).

| **Permitido** | **No permitido** |
| --- | --- |
| ✅ Tipo 0 → Tipo 1 | ❌ Tipo 0 → Tipo 2 |
| ✅ Tipo 1 → Tipo 2 | ❌ Tipo 1 → Tipo 0 |
|  | ❌ Tipo 2 → Tipo 1 |
|  | ❌ Tipo 2 → Tipo 0 |

### Riesgos {#risks}

MaxEB permite a un validador enviar todo su saldo a otro validador. Los usuarios que envíen una solicitud de consolidación deben verificar el origen y el contenido de la transacción que están firmando. La herramienta oficial para aprovechar las funciones de MaxEB es el Launchpad. Si decides utilizar una herramienta de terceros, debes verificar que:

- La clave pública (pubkey) y la dirección de retiro del validador de origen coincidan con el validador que controlan.
- La clave pública del validador de destino sea correcta y les pertenezca.
- La solicitud sea una conversión, no una consolidación, si no tienen la intención de enviar fondos a otro validador.
- La transacción esté siendo firmada por la dirección de retiro correcta.

**Recomendamos encarecidamente** discutir cualquier herramienta de terceros que planees utilizar con la [comunidad de EthStaker](https://ethstaker.org/about). Es un lugar útil para comprobar que tu enfoque tiene sentido y evitar errores. Si utilizas una herramienta maliciosa o mal configurada, **todo el saldo de tu validador podría enviarse a un validador que no controlas**, sin forma de recuperarlo.

## Detalles técnicos {#technical-details}

### El flujo {#the-flow}

Habrá dos usos para la operación `ConsolidationRequest`:

1. Convertir un validador existente de **Tipo 1** a un validador de **Tipo 2**.
2. Consolidar otros validadores en un validador de **Tipo 2** existente.

En una conversión de un validador de **Tipo 1** a uno de **Tipo 2**, tanto el *origen* como el *destino* serán el validador que estás convirtiendo. La operación costará gas y se pondrá en cola detrás de otras solicitudes de consolidación. Esta cola es **independiente** de la cola de depósitos, no se ve afectada por los depósitos de nuevos validadores y se puede ver en [pectrified.com](https://pectrified.com/).

Para consolidar validadores, debes tener un *validador de destino* que tenga credenciales de retiro de **Tipo 2**. Este es el destino de cualquier saldo de validador que se esté consolidando, y el índice que se conservará.

### Requisitos para convertir al Tipo 2 {#requirements-for-converting-to-type-2}

Esto será necesario para el primer validador que conviertas al **Tipo 2**. El índice de este validador se conserva y permanece activo. Para una conversión, el *validador de origen* == el *validador de destino*.

El validador debe...

- estar activo
- tener credenciales de retiro de **Tipo 1**
- no estar en estado de salida (ni haber sufrido un recorte)
- no tener retiros pendientes activados manualmente (no se aplica a los barridos automáticos)

![conversion illustration](./conversion.png)

### Requisitos para consolidar {#requirements-for-consolidating}

Esta es la *misma operación* que la conversión, pero ocurre cuando el *validador de origen* es diferente del *validador de destino*. El índice del validador de destino se conserva y acepta el saldo del validador de origen. El índice del validador de origen pasa a un estado `EXITED`.

En este caso, el validador de origen tiene los mismos requisitos anteriores, además de:

- haber estado activo durante al menos ~27,3 horas (un `SHARD_COMMITTEE_PERIOD`).

El validador de destino debe:

- tener credenciales de retiro de **Tipo 2**
- no estar en estado de salida.

![consolidation illustration](./consolidation.png)

### La solicitud de consolidación {#the-consolidation-request}

La solicitud de consolidación será firmada por la dirección de retiro asociada con el validador de origen y contendrá:

1. Dirección del validador de origen (por ejemplo, `0x15F4B914A0cCd14333D850ff311d6DafbFbAa32b`).
2. Clave pública del validador de origen (por ejemplo, `0xa1d1ad0714035353258038e964ae9675dc0252ee22cea896825c01458e1807bfad2f9969338798548d9858a571f7425c`).
3. Clave pública del validador de destino.

En una conversión, 2 y 3 serán iguales. Esta operación se puede realizar en [el Launchpad](https://launchpad.ethereum.org/).

### Requisitos de firma {#signing-requirements}

Para enviar una `ConsolidationRequest`, la **dirección de retiro del validador de origen** debe firmar la solicitud. Esto demuestra el control sobre los fondos del validador.

### ¿Qué se firma? {#what-is-signed}

Se utiliza una [raíz de firma](https://github.com/ethereum/consensus-specs/blob/master/specs/phase0/beacon-chain.md#compute_signing_root) (signing root) con separación de dominios del objeto `ConsolidationRequest`.

- **Dominio:** `DOMAIN_CONSOLIDATION_REQUEST`
- **Campos de la raíz de firma:**
  - `source_pubkey`: `BLSPubkey`
  - `target_pubkey`: `BLSPubkey`
  - `source_address`: `ExecutionAddress`

La **firma BLS** resultante se envía junto con la solicitud.

Nota: La firma la realiza la dirección de retiro, no la clave del validador.

### Retiros parciales {#partial-withdrawals}

Los validadores con credenciales de **Tipo 1** obtienen barridos automáticos y sin costo de gas de su saldo excedente (cualquier cantidad superior a 32 ETH) hacia su dirección de retiro. Debido a que el **Tipo 2** permite a un validador capitalizar saldos en incrementos de 1 ETH, no barrerá automáticamente los saldos hasta que alcance los 2048 ETH. Los retiros parciales en validadores de **Tipo 2** deben activarse manualmente y costarán gas.

## Herramientas de consolidación {#consolidation-tooling}

Hay varias herramientas disponibles para gestionar las consolidaciones. La herramienta oficial, creada por la Fundación Ethereum, es el [Launchpad](https://launchpad.ethereum.org/en/validator-actions). También existen herramientas de terceros creadas por entidades de la comunidad de staking que pueden ofrecer funciones no proporcionadas por el Launchpad. Aunque las herramientas que se muestran aquí no están auditadas ni respaldadas por la Fundación Ethereum, las siguientes son herramientas de código abierto creadas por miembros conocidos de la comunidad.

| Herramienta | Sitio web | Código abierto | Creador | Auditada | Interfaz | Características destacadas |
| --- | --- | --- | --- | --- | --- | --- |
| Pectra Staking Manager | pectrastaking.com | Sí, Apache 2.0 | [Pier Two](https://piertwo.com/) | No | Interfaz web | WalletConnect, funciona con SAFE |
| Pectra Validator Ops CLI Tool | [GitHub](https://github.com/Luganodes/Pectra-Batch-Contract) | Sí, MIT | [Luganodes](https://www.luganodes.com/) | Sí, Quantstamp [Mayo de 2025](https://certificate.quantstamp.com/full/luganodes-pectra-batch-contract/23f0765f-969a-4798-9edd-188d276c4a2b/index.html) | Línea de comandos | Procesamiento por lotes, para muchos validadores a la vez |
| Ethereal | [GitHub](https://github.com/wealdtech/ethereal) | Sí, Apache 2.0 | [Jim McDonald](https://www.attestant.io/team/) | No | Línea de comandos | Conjunto completo de funciones para la gestión de validadores y nodos |
| Siren | [GitHub](https://github.com/sigp/siren) | Sí, Apache 2.0 | [Sigma Prime](https://sigmaprime.io/) | No | Algo de línea de comandos, pero principalmente interfaz web | Solo funciona si estás utilizando el cliente de consenso Lighthouse |
| Consolideth.app | https://consolideth.app/ [GitHub](https://github.com/Stakely/consolideth) | Sí, licencias MIT | [Stakely](https://stakely.io/) | No | Interfaz web, alojada por Stakely y lista para ser autoalojada libremente | Admite las principales conexiones de billeteras, incluyendo Safe con WalletConnect |

## Preguntas frecuentes {#faq}

### ¿Optar por participar cambia mi suerte en las propuestas o mis recompensas? {#change-luck-or-rewards}

No. Optar por participar no disminuye tus posibilidades de propuesta: tus deberes y la selección de propuestas siguen siendo los mismos. Por ejemplo, si tienes dos validadores de 32 ETH frente a un validador de 64 ETH, tendrás las mismas posibilidades totales de ser seleccionado para proponer un bloque y ganar recompensas.

### ¿Optar por participar cambia mi riesgo de recorte? {#change-slashing-risk}

Para los operadores más pequeños o no profesionales, la respuesta corta es no. La respuesta más larga es que, para los operadores profesionales que ejecutan muchos validadores por nodo con alertas rápidas, la consolidación en menos validadores puede reducir su capacidad de reaccionar ante un recorte y prevenir eventos en cascada. La *penalización* inicial por recorte para todos los validadores se ha reducido drásticamente de 1 ETH (por cada 32 ETH) a 0,0078125 ETH (por cada 32 ETH) para compensar este riesgo.

### ¿Tengo que realizar la salida de mi validador para convertirlo? {#exit-validator}

No. Puedes convertirlo en el lugar sin realizar la salida.

### ¿Cuánto tiempo tomará convertir / consolidar? {#how-long}

Un mínimo de 27,3 horas, pero las consolidaciones también están sujetas a una cola. Esta cola es independiente de las colas de depósitos y retiros, y no se ve afectada por ellas.

### ¿Puedo conservar el índice de mi validador? {#keep-validator-index}

Sí. La conversión en el lugar mantiene el mismo índice del validador. Si consolidas varios validadores, solo podrás conservar el índice del *validador de destino*.

### ¿Perderé atestaciones? {#miss-attestations}

Durante una consolidación en otro validador, el validador de origen realiza la salida y hay un período de espera de ~27 horas antes de que el saldo esté activo en el validador de destino. Este período **no afecta las métricas de rendimiento**.

### ¿Incurriré en penalizaciones? {#incur-penalties}

No. Mientras tu validador esté en línea, no incurrirás en penalizaciones.

### ¿Tienen que coincidir las direcciones de retiro de los validadores que se están consolidando? {#withdrawal-addresses-match}

No. Pero el *origen* debe autorizar la solicitud desde su propia dirección.

### ¿Se capitalizarán mis recompensas después de la conversión? {#rewards-compound}

Sí. Con las credenciales de **Tipo 2**, las recompensas superiores a 32 ETH se vuelven a poner en staking automáticamente, pero no al instante. Debido a un pequeño margen (llamado [*histéresis*](https://eth2book.info/capella/part2/incentives/balances/#hysteresis)), tu saldo debe alcanzar **aproximadamente 1,25 ETH más** antes de que el extra se vuelva a poner en staking. Por lo tanto, en lugar de capitalizarse a los 33,0 ETH, ocurre a los 33,25 (saldo efectivo = 33 ETH), luego a los 34,25 (saldo efectivo = 34 ETH), y así sucesivamente.

### ¿Aún puedo obtener barridos automáticos después de la conversión? {#automatic-sweep}

Los barridos automáticos solo ocurrirán con saldos excedentes superiores a 2048. Para todos los demás retiros parciales, deberás activarlos manualmente.

### ¿Puedo cambiar de opinión y volver del Tipo 2 al Tipo 1? {#go-back-to-type1}

No. La conversión al **Tipo 2** es irreversible.

### Si quiero consolidar varios validadores, ¿tengo que convertir cada uno al Tipo 2 primero? {#consolidate-multiple-validators}

¡No! Convierte un validador al Tipo 2 y luego úsalo como destino. Todos los demás validadores consolidados en ese destino de Tipo 2 pueden ser de Tipo 1 o Tipo 2.

### Mi validador está fuera de línea o por debajo de 32 ETH, ¿aún puedo convertirlo? {#offline-or-below-32eth}

Sí. Siempre que esté activo (sin haber realizado la salida) y puedas firmar con su dirección de retiro, puedes convertirlo.

## Recursos {#resources}

- [Especificaciones de consenso de Electra](https://github.com/ethereum/consensus-specs/blob/master/specs/electra/beacon-chain.md): Esta es la versión "más fiel" en la que debes confiar. En caso de duda, lee las especificaciones.
- No todo el mundo se siente cómodo navegando por el código, por lo que [este maxEB-GPT](https://chatgpt.com/g/g-67f1650fb48081918f555e0c8d1c2ae9-maxeb-gpt) puede ayudar a interpretar las especificaciones. *Descargo de responsabilidad: Se debe confiar en las especificaciones, no en la IA, como la verdad, ya que la IA puede malinterpretar la información o alucinar respuestas.*
- [pectrified.com](https://pectrified.com/): Ve el estado de las consolidaciones, los depósitos y los tiempos de espera en la cola.
- [Ethereal](https://github.com/wealdtech/ethereal): Herramienta CLI creada por la comunidad para gestionar tareas comunes de los validadores.
- [batch-validator-depositor](https://github.com/attestantio/batch-validator-depositor): Contrato creado por la comunidad que permite depositar en múltiples validadores de Ethereum en una sola transacción.