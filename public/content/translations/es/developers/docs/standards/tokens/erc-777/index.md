---
title: Estándar de token ERC-777
description:
lang: es
---

## Advertencia {#warning}

**ERC-777 es dificil de implementar de forma apropiada debido a su [susceptibilidad a diferentes formas de ataque](https://github.com/OpenZeppelin/openzeppelin-contracts/issues/2620). En cambio es recomendable usar [ERC-20](/developers/docs/standards/tokens/erc-20/). **Esta página permanece como un archivo histórico.

## ¿Introducción? {#introduction}

ERC-777 es un estándar de token fungible que mejora el estándar [ERC-20](/developers/docs/standards/tokens/erc-20/) existente.

## Pre-requisitos: {#prerequisites}

Para entender mejor esta página, recomendamos que primero lea acerca de [ERC-20](/developers/docs/standards/tokens/erc-20/).

## ¿Qué mejoras propone ERC-777 sobre ERC-20? {#-erc-777-vs-erc-20}

ERC-777 proporciona las siguientes mejoras sobre ERC-20.

### Hooks {#hooks}

Los hooks son una función descrita en el código de los contratos inteligentes. Se recurre a ellos cuando se envían o reciben tokens a través de un contrato. Esto permite que un contato inteligente reaccione a tokens entrantes o salientes.

Los hooks se registran y descubren usando el estándar [ERC-1820](https://eips.ethereum.org/EIPS/eip-1820).

#### ¿Por qué los hooks son útiles? {#why-are-hooks-great}

1. Los hooks permiten enviar tokens a un contrato y notificarlo en una sola transacción, a diferencia de [ ERC-20](https://eips.ethereum.org/EIPS/eip-20), que requiere una doble llamada (`approve`/`transferFrom`) para lograr esto.
2. Los contratos que no hayan registrado hooks son incompatibles con ERC-777. El contrato de envío abortará la transacción cuando el contrato de recepción no tenga registrado un hook. Esto previene transferencias accidentales a contratos inteligentes que no sean ERC-777.
3. Los hooks pueden rechazar transacciones.

### Decimales {#decimals}

El estándar también resuelve la confusión en torno a los ` decimales` de ERC-20. Esta claridad mejora la experiencia del desarrollador.

### Compatibilidad retrospectiva con ERC-20 {#backwards-compatibility-with-erc-20}

Se puede interactuar con contratos ERC-777 como si fueran contratos ERC-20.

## Más información {#further-reading}

[Estándar de token EIP-777](https://eips.ethereum.org/EIPS/eip-777)
