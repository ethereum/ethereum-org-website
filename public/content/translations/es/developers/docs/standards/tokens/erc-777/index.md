---
title: Estándar de token ERC-777
description: Aprenda sobre ERC-777, un estándar mejorado de tókenes fungibles con hooks, aunque por seguridad se recomienda ERC-20.
lang: es
---

## Advertencia {#warning}

**Es difícil implementar ERC-777 de forma adecuada, debido a su [susceptibilidad a diferentes tipos de ataques](https://github.com/OpenZeppelin/openzeppelin-contracts/issues/2620). En su lugar se recomienda usar [ERC-20](/developers/docs/standards/tokens/erc-20/).** Esta página permanece como un documento histórico.

## ¿Introducción? {#introduction}

ERC-777 es un estándar de tókenes fungibles que mejora el estándar [ERC-20](/developers/docs/standards/tokens/erc-20/) existente.

## Requisitos previos {#prerequisites}

Para entender mejor esta página, le recomendamos que lea antes acerca de [ERC-20](/developers/docs/standards/tokens/erc-20/).

## ¿Qué mejoras propone ERC-777 sobre ERC-20? {#-erc-777-vs-erc-20}

ERC-777 proporciona las siguientes mejoras sobre ERC-20.

### Hooks {#hooks}

Los hooks son una función descrita en el código de los contratos inteligentes. Se recurre a ellos cuando se envían o reciben tokens a través de un contrato. Esto permite que un contato inteligente reaccione a tokens entrantes o salientes.

Los hooks se registran y descubren usando el estándar [ERC-1820](https://eips.ethereum.org/EIPS/eip-1820).

#### ¿Por qué los hooks son útiles? {#why-are-hooks-great}

1. Los hooks permiten enviar tókenes a un contrato y notificar al contrato en una única transacción, a diferencia de [ERC-20](https://eips.ethereum.org/EIPS/eip-20), que requiere una doble llamada (`approve`/`transferFrom`) para lograr esto.
2. Los contratos que no hayan registrado hooks son incompatibles con ERC-777. El contrato de envío abortará la transacción cuando el contrato de recepción no tenga registrado un hook. Esto previene transferencias accidentales a contratos inteligentes que no sean ERC-777.
3. Los hooks pueden rechazar transacciones.

### Decimales {#decimals}

El estándar también resuelve la confusión en torno a los `decimals` causada por ERC-20. Esta claridad mejora la experiencia del desarrollador.

### Retrocompatibilidad con ERC-20 {#backwards-compatibility-with-erc-20}

Se puede interactuar con contratos ERC-777 como si fueran contratos ERC-20.

## Lecturas recomendadas {#further-reading}

[EIP-777: Estándar de tókenes](https://eips.ethereum.org/EIPS/eip-777)
