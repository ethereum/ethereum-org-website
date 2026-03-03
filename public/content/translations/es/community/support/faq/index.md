---
title: Preguntas más frecuentes
description: Preguntas comunes sobre Ethereum acerca de billeteras, transacciones, staking y más.
lang: es
---

# Preguntas frecuentes {#faq}

## Envié criptomonedas a la dirección equivocada {#wrong-wallet}

Una transacción enviada en Ethereum es irreversible. Lamentablemente, si envió ETH o tokens a la billetera equivocada, no hay manera de revertir la transacción.

**Qué puede hacer:**

- **Si conoce al propietario de la dirección**, póngase en contacto con él directamente y pídale que le devuelva los fondos.
- **Si la dirección pertenece a un intercambio o a un servicio conocido**, póngase en contacto con su equipo de soporte, ya que es posible que puedan ayudarle.
- **Si envió tokens a la dirección de un contrato**, compruebe si el contrato tiene una función de retiro o recuperación (esto es poco frecuente).

En la mayoría de los casos, no hay forma de recuperar los fondos. Ethereum no es propiedad de ninguna organización, entidad o persona central, lo que significa que nadie puede revertir las transacciones. Compruebe siempre dos veces la dirección del destinatario antes de confirmar.

## Perdí el acceso a mi billetera {#lost-wallet-access}

Sus opciones de recuperación dependen del tipo de billetera que utilice.

### Si tiene su frase semilla (frase de recuperación)

Puede restaurar su billetera en cualquier aplicación de billetera compatible usando su frase semilla. Por eso es fundamental que guarde su frase semilla de forma segura y sin conexión. Consulte la documentación de su proveedor de billetera para obtener instrucciones de restauración.

### Si ha perdido su frase semilla

Sin su frase semilla o claves privadas, no se pueden recuperar sus fondos. Nadie, incluido ethereum.org, puede restablecer su contraseña ni restaurar el acceso a una billetera de autocustodia.

### Si su cuenta está en un intercambio

Si su cuenta está en un intercambio centralizado como Coinbase, Binance o Kraken, póngase en contacto directamente con el equipo de soporte del intercambio. Ellos controlan las cuentas en su plataforma y es posible que puedan ayudarle con el restablecimiento de la contraseña o la recuperación de la cuenta.

<Alert variant="warning">
<AlertEmoji text=":shield:"/>
<AlertContent>
<AlertDescription>

**Nunca comparta su frase semilla con nadie** que afirme ayudarle a recuperar su billetera. Esta es una de las tácticas de estafa más comunes. Ningún servicio legítimo le pedirá nunca su frase semilla.

</AlertDescription>
</AlertContent>
</Alert>

<DocLink href="/guides/how-to-use-a-wallet/">
  Cómo usar una billetera
</DocLink>

## Mi transacción está atascada o pendiente {#stuck-transaction}

Las transacciones en Ethereum pueden atascarse cuando la tarifa de gas que estableció es más baja de lo que la red requiere actualmente. La mayoría de las billeteras le permiten solucionar este problema:

- **Acelerar:** Vuelva a enviar la misma transacción con una tarifa de gas más alta
- **Cancelar:** Envíe una transacción de 0 ETH a su propia dirección utilizando el mismo nonce que la transacción pendiente

### Guías útiles

- [Cómo acelerar o cancelar una transacción pendiente en MetaMask](https://support.metamask.io/transactions-and-gas/transactions/how-to-speed-up-or-cancel-a-pending-transaction/)
- [Cómo cancelar transacciones pendientes de Ethereum](https://info.etherscan.com/how-to-cancel-ethereum-pending-transactions/)

## ¿Cómo puedo reclamar mi regalo en Ethereum? {#giveaway-scam}

Los regalos de Ethereum son estafas diseñadas para robarle ETH. No se deje tentar por ofertas que parezcan demasiado buenas para ser verdad. Si envía ETH a una dirección de regalo, no recibirá el regalo y no podrá recuperar sus fondos.

[Más sobre prevención de estafas](/security/#common-scams)

## ¿Cómo hago staking de ETH? {#how-to-stake}

Para convertirse en validador, debe apostar 32 ETH en el contrato de depósito de Ethereum y configurar un nodo de validación. También puede participar con menos ETH a través de pools de staking.

Hay más información disponible en nuestras [páginas de staking](/staking/) y en [el launchpad de staking](https://launchpad.ethereum.org/).

## ¿Cómo puedo minar Ethereum? {#mining-ethereum}

Ya no se puede minar en Ethereum. La minería se desactivó cuando Ethereum pasó de [prueba de trabajo](/glossary/#pow) a [prueba de participación](/glossary/#pos) durante [la Fusión](/roadmap/merge/) en septiembre de 2022. Ahora, en lugar de mineros, Ethereum tiene validadores. Cualquier persona puede [hacer staking](/glossary/#staking) de ETH y recibir recompensas por staking al ejecutar software validador para asegurar la red.
