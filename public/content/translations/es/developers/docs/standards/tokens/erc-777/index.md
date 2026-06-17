---
title: Estándar de token ERC-777
description: Aprenda sobre ERC-777, un estándar de token fungible mejorado con hooks, aunque se recomienda ERC-20 por seguridad.
lang: es
---

## Advertencia {#warning}

**El estándar ERC-777 es difícil de implementar correctamente debido a su [susceptibilidad a diferentes formas de ataque](https://github.com/OpenZeppelin/openzeppelin-contracts/issues/2620). En su lugar, se recomienda utilizar [ERC-20](/developers/docs/standards/tokens/erc-20/).** Esta página se mantiene como un archivo histórico.

## ¿Introducción? {#introduction}

ERC-777 es un estándar de token fungible que mejora el estándar [ERC-20](/developers/docs/standards/tokens/erc-20/) existente.

## Requisitos previos {#prerequisites}

Para entender mejor esta página, le recomendamos que primero lea sobre [ERC-20](/developers/docs/standards/tokens/erc-20/).

## ¿Qué mejoras propone ERC-777 sobre ERC-20? {#-erc-777-vs-erc-20}

ERC-777 proporciona las siguientes mejoras sobre ERC-20.

### Hooks {#hooks}

Los hooks son una función descrita en el código de un contrato inteligente. Los hooks se llaman cuando se envían o reciben tokens a través del contrato. Esto permite que un contrato inteligente reaccione a los tokens entrantes o salientes.

Los hooks se registran y descubren utilizando el estándar [ERC-1820](https://eips.ethereum.org/EIPS/eip-1820).

#### ¿Por qué son geniales los hooks? {#why-are-hooks-great}

1. Los hooks permiten enviar tokens a un contrato y notificar al contrato en una sola transacción, a diferencia de [ERC-20](https://eips.ethereum.org/EIPS/eip-20), que requiere una doble llamada (`approve`/`transferFrom`) para lograr esto.
2. Los contratos que no han registrado hooks son incompatibles con ERC-777. El contrato emisor abortará la transacción cuando el contrato receptor no haya registrado un hook. Esto evita transferencias accidentales a contratos inteligentes que no son ERC-777.
3. Los hooks pueden rechazar transacciones.

### Decimales {#decimals}

El estándar también resuelve la confusión en torno a `decimals` causada en ERC-20. Esta claridad mejora la experiencia del desarrollador.

### Retrocompatibilidad con ERC-20 {#backwards-compatibility-with-erc-20}

Se puede interactuar con los contratos ERC-777 como si fueran contratos ERC-20.

## Lecturas adicionales {#further-reading}

[EIP-777: Estándar de token](https://eips.ethereum.org/EIPS/eip-777)