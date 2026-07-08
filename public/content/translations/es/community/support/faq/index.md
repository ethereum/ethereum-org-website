---
title: Preguntas frecuentes
description: Preguntas comunes sobre Ethereum acerca de billeteras, transacciones, staking y más.
lang: es
---

## Envié cripto a la dirección equivocada {#wrong-wallet}

Una transacción enviada en Ethereum es irreversible. Desafortunadamente, si enviaste ETH o tokens a la billetera equivocada, no hay forma de revertir la transacción.

**Qué puedes hacer:**

- **Si conoces al propietario de la dirección**, contáctalo directamente y pídele que te devuelva los fondos
- **Si la dirección pertenece a un exchange o servicio conocido**, contacta a su equipo de soporte, ya que podrían ayudarte
- **Si enviaste tokens a la dirección de un contrato**, verifica si el contrato tiene una función de retiro o recuperación (esto es poco común)

En la mayoría de los casos, no hay forma de recuperar los fondos. Ninguna organización central, entidad o persona es dueña de Ethereum, lo que significa que nadie puede revertir las transacciones. Siempre verifica dos veces la dirección del destinatario antes de confirmar.

## Perdí el acceso a mi billetera {#lost-wallet-access}

Tus opciones de recuperación dependen del tipo de billetera que utilices.

### Si tienes tu frase semilla (frase de recuperación) {#if-you-have-your-seed-phrase-recovery-phrase}

Puedes restaurar tu billetera en cualquier aplicación de billetera compatible usando tu frase semilla. Por esto es fundamental mantener tu frase semilla guardada de forma segura sin conexión. Consulta la documentación de tu proveedor de billetera para obtener instrucciones de restauración.

### Si perdiste tu frase semilla {#if-you-have-lost-your-seed-phrase}

Sin tu frase semilla o claves privadas, tus fondos no pueden ser recuperados. Nadie, incluyendo ethereum.org, puede restablecer tu contraseña o restaurar el acceso a una billetera de autocustodia.

### Si tu cuenta está en un exchange {#if-your-account-is-on-an-exchange}

Si tu cuenta está en un exchange centralizado como Coinbase, Binance o Kraken, contacta directamente al equipo de soporte del exchange. Ellos controlan las cuentas en su plataforma y podrían ayudarte con el restablecimiento de contraseñas o la recuperación de la cuenta.

<Alert variant="warning">
<AlertEmoji text=":shield:"/>
<AlertContent>
<AlertDescription>

**Nunca compartas tu frase semilla con nadie** que afirme ayudarte a recuperar tu billetera. Esta es una de las tácticas de estafa más comunes. Ningún servicio legítimo te pedirá jamás tu frase semilla.

</AlertDescription>
</AlertContent>
</Alert>

<DocLink href="/guides/how-to-use-a-wallet/">
  Cómo usar una billetera
</DocLink>

## Mi transacción está atascada o pendiente {#stuck-transaction}

Las transacciones en Ethereum pueden atascarse cuando la tarifa de gas que estableciste fue menor a la que la red requiere actualmente. La mayoría de las billeteras te permiten solucionar esto:

- **Acelerar:** Vuelve a enviar la misma transacción con una tarifa de gas más alta
- **Cancelar:** Envía una transacción de 0 ETH a tu propia dirección usando el mismo nonce que la transacción pendiente

### Guías útiles {#helpful-guides}

- [Cómo acelerar o cancelar una transacción pendiente en MetaMask](https://support.metamask.io/transactions-and-gas/transactions/how-to-speed-up-or-cancel-a-pending-transaction/)
- [Cómo cancelar transacciones pendientes en Ethereum](https://info.etherscan.com/how-to-cancel-ethereum-pending-transactions/)

## ¿Cómo puedo reclamar mi sorteo de Ethereum? {#giveaway-scam}

Los sorteos de Ethereum son estafas diseñadas para robar tus ETH. No te dejes tentar por ofertas que parecen demasiado buenas para ser verdad. Si envías ETH a una dirección de sorteo, no recibirás ningún premio y no podrás recuperar tus fondos.

[Más sobre la prevención de estafas](/security/#common-scams)

## ¿Cómo hago staking de ETH? {#how-to-stake}

Para convertirte en un validador, debes hacer staking de 32 ETH en el contrato de depósito de Ethereum y configurar un nodo validador. También puedes participar con menos ETH a través de pools de staking.

Hay más información disponible en nuestras [páginas de staking](/staking/) y en [la plataforma de lanzamiento de staking](https://launchpad.ethereum.org/).

## ¿Cómo mino Ethereum? {#mining-ethereum}

La minería de Ethereum ya no es posible. La minería se desactivó cuando Ethereum pasó de la [prueba de trabajo (PoW)](/glossary/#pow) a la [prueba de participación (PoS)](/glossary/#pos) durante [La Fusión](/roadmap/merge/) en septiembre de 2022. Ahora, en lugar de mineros, Ethereum tiene validadores. Cualquiera puede [hacer staking](/glossary/#staking) de ETH y recibir recompensas de staking por ejecutar el software de validador para asegurar la red.