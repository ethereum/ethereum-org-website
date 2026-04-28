---
title: Credenciales de retiro
description: "Una explicación de los tipos de credenciales de retiro de los validadores (0x00, 0x01, 0x02) y sus implicaciones para quienes hacen staking en Ethereum."
lang: es
---

Cada validador tiene una **credencial de retiro** que determina cómo y dónde se pueden retirar sus ETH en staking y sus recompensas. El tipo de credencial se indica mediante el primer byte: `0x00`, `0x01` o `0x02`. Comprender estos tipos es importante para los validadores que administran su participación.

## 0x00: Credenciales previas a Shapella {#0x00-credentials}

El tipo `0x00` es el formato original de credencial de retiro de antes de la actualización Shapella (abril de 2023). Los validadores con este tipo de credencial no tienen configurada una dirección de retiro en la capa de ejecución, lo que significa que sus fondos permanecen bloqueados en la capa de consenso. Si todavía tiene credenciales `0x00`, debe actualizarlas a `0x01` o `0x02` antes de poder recibir cualquier retiro.

## 0x01: Credenciales de retiro heredadas {#0x01-credentials}

El tipo `0x01` se introdujo con la actualización Shapella y se convirtió en el estándar para los validadores que querían configurar una dirección de retiro en la capa de ejecución. Con las credenciales `0x01`:

- Cualquier saldo superior a 32 ETH se **transfiere automáticamente** a su dirección de retiro.
- Las salidas completas pasan por la cola de salida estándar.
- Las recompensas superiores a 32 ETH no se pueden capitalizar (compound); se transfieren periódicamente.

**Por qué algunos validadores todavía usan 0x01:** Es más simple y familiar. Muchos validadores depositaron después de Shapella y ya tienen este tipo, y funciona bien para aquellos que desean retiros automáticos del saldo excedente.

**Por qué no se recomienda:** Con `0x01`, pierde la capacidad de capitalizar las recompensas por encima de 32 ETH. Cada pequeña cantidad de exceso se transfiere automáticamente, lo que limita el potencial de ganancias de su validador y requiere administrar los fondos retirados por separado.

## 0x02: Credenciales de retiro de capitalización {#0x02-credentials}

El tipo `0x02` se introdujo con la actualización Pectra y es la **opción recomendada** para los validadores en la actualidad. A los validadores con credenciales `0x02` a veces se les llama "validadores de capitalización".

Con las credenciales `0x02`:

- Las recompensas superiores a 32 ETH **se capitalizan** en incrementos de 1 ETH hasta un saldo efectivo máximo de 2048 ETH.
- Los retiros parciales deben solicitarse manualmente (las transferencias automáticas solo ocurren por encima del umbral de 2048 ETH).
- Los validadores pueden consolidar múltiples validadores de 32 ETH en un solo validador de mayor saldo.
- Las salidas completas aún son compatibles a través de la cola de salida estándar.

Tanto los retiros parciales como las consolidaciones se pueden realizar a través de las [Acciones del validador en el Launchpad](https://launchpad.ethereum.org/en/validator-actions).

**Por qué los validadores deberían preferir 0x02:** Ofrece una mejor eficiencia del capital a través de la capitalización, más control sobre cuándo ocurren los retiros y admite la consolidación de validadores. Para los stakers en solitario que acumulan recompensas con el tiempo, esto significa que su saldo efectivo (y, por lo tanto, sus recompensas) puede crecer más allá de 32 ETH sin intervención manual.

**Importante:** Una vez que convierta de `0x01` a `0x02`, no podrá revertir el proceso.

Para obtener una guía detallada sobre la conversión a credenciales de Tipo 2 y la función MaxEB, consulte la [página explicativa de MaxEB](/roadmap/pectra/maxeb/).

## ¿Qué debería elegir? {#what-should-i-pick}

- **Nuevos validadores:** Elija `0x02`. Es el estándar moderno con mejor capitalización y flexibilidad.
- **Validadores 0x01 existentes:** Considere convertir a `0x02` si desea que las recompensas se capitalicen por encima de 32 ETH o si planea consolidar validadores.
- **Validadores 0x00 existentes:** Actualice de inmediato; no puede retirar sin actualizar sus credenciales. Primero debe convertir a `0x01`, luego puede convertir a `0x02`.

## Herramientas para administrar las credenciales de retiro {#withdrawal-credential-tools}

Varias herramientas admiten la elección o conversión entre tipos de credenciales:

- **[Launchpad de staking de Ethereum](https://launchpad.ethereum.org/en/validator-actions)**: la herramienta oficial para depósitos y administración de validadores, incluidas las conversiones y consolidaciones de credenciales.
- **[Pectra Staking Manager](https://pectrastaking.com)**: interfaz de usuario web con soporte de conexión de billetera para conversiones y consolidación.
- **[Pectra Validator Ops CLI Tool](https://github.com/Luganodes/Pectra-Batch-Contract)**: herramienta de línea de comandos para conversiones por lotes.
- **[Ethereal](https://github.com/wealdtech/ethereal)**: herramienta CLI para operaciones de Ethereum, incluida la administración de validadores.

Para obtener una lista completa de herramientas de consolidación e instrucciones detalladas de conversión, consulte las [herramientas de consolidación de MaxEB](/roadmap/pectra/maxeb/#consolidation-tooling).

## Más información {#further-reading}

- [Claves en la prueba de participación (PoS) de Ethereum](/developers/docs/consensus-mechanisms/pos/keys/): aprenda sobre las claves de los validadores y cómo se relacionan con las credenciales de retiro.
- [MaxEB](/roadmap/pectra/maxeb/): guía detallada sobre la actualización Pectra y la función de saldo efectivo máximo.