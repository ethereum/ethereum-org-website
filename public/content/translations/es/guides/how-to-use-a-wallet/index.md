---
title: "Cómo usar una billetera"
metaTitle: "Cómo usar billeteras de Ethereum | Paso a paso"
description: "Una guía que explica cómo enviar y recibir tokens, y cómo conectarse a proyectos web3."
lang: es
---

Aprende a operar todas las funciones básicas de una billetera. Si aún no tienes una, consulta nuestra guía sobre [Cómo crear una cuenta de Ethereum](/guides/how-to-create-an-ethereum-account/).

## Abre tu billetera {#open-your-wallet}

Deberías ver un panel de control que probablemente mostrará tu saldo y contendrá botones para enviar y recibir tokens.

## Recibir criptomonedas {#receive-cryptocurrency}

¿Quieres recibir cripto en tu billetera?

Cada cuenta de Ethereum tiene su propia dirección de recepción, que es una secuencia única de números y letras. La dirección funciona como un número de cuenta bancaria. Las direcciones de Ethereum siempre comenzarán con "0x". Puedes compartir esta dirección con cualquier persona: es seguro hacerlo.

Tu dirección es como la dirección de tu casa: necesitas decirle a la gente cuál es para que puedan encontrarte. Es seguro hacer esto, porque aún puedes cerrar la puerta principal con otra clave que solo tú controlas para que nadie pueda entrar, incluso si saben dónde vives.

Necesitas proporcionar tu dirección pública a quien quiera enviarte dinero. Muchas aplicaciones de billetera te permiten copiar tu dirección o mostrar un código QR para escanear y facilitar su uso. Evita escribir cualquier dirección de Ethereum manualmente. Esto puede llevar fácilmente a errores tipográficos y a la pérdida de fondos.

Diferentes aplicaciones pueden variar o usar un lenguaje diferente, pero deberían guiarte a través de un proceso similar si estás intentando transferir fondos.

1. Abre tu aplicación de billetera.
2. Haz clic en "Recibir" (o una opción con palabras similares).
3. Copia tu dirección de Ethereum al portapapeles.
4. Proporciona al remitente tu dirección de recepción de Ethereum.

## Enviar criptomonedas {#send-cryptocurrency}

¿Te gustaría enviar ETH a otra billetera?

1. Abre tu aplicación de billetera.
2. Obtén la dirección de recepción y asegúrate de estar conectado a la misma red que el destinatario.
3. Ingresa la dirección de recepción o escanea un código QR con tu cámara para que no tengas que escribir la dirección manualmente.
4. Haz clic en el botón "Enviar" en tu billetera (o una alternativa con palabras similares).

![Send field for crypto address](./send.png)
<br/>

5. Muchos activos, como DAI o USDC, existen en múltiples redes. Al transferir tokens cripto, asegúrate de que el destinatario esté usando la misma red que tú, ya que estos no son intercambiables.
6. Asegúrate de que tu billetera tenga suficiente ETH para cubrir la tarifa de transacción, que varía según las condiciones de la red. La mayoría de las billeteras agregarán automáticamente la tarifa sugerida a la transacción, la cual luego podrás confirmar.
7. Una vez que se procese tu transacción, la cantidad de cripto correspondiente aparecerá en la cuenta del destinatario. Esto podría tardar desde unos pocos segundos hasta unos minutos, dependiendo de cuánto se esté utilizando la red actualmente.

## Conectarse a proyectos {#connecting-to-projects}

Tu dirección será la misma en todos los proyectos de Ethereum. No necesitas registrarte individualmente en ningún proyecto. Una vez que tengas una billetera, puedes conectarte a cualquier proyecto de Ethereum sin ninguna información adicional. No se necesitan correos electrónicos ni ninguna otra información personal.

1. Visita el sitio web de cualquier proyecto.
2. Si la página de inicio del proyecto es solo una descripción estática del mismo, deberías poder hacer clic en un botón "Abrir la aplicación" en el menú, que te llevará a la aplicación web real.
3. Una vez que estés en la aplicación, haz clic en "Conectar".

![Button allowing user to connect to the website with a wallet](./connect1.png)

4. Selecciona tu billetera de la lista de opciones proporcionada. Si no puedes ver tu billetera, puede estar oculta bajo la opción "WalletConnect".

![Selecting from a list of wallets to connect with](./connect2.png)

5. Confirma la solicitud de firma en tu billetera para establecer la conexión. **Firmar este mensaje no debería requerir gastar ningún ETH**.
6. ¡Eso es todo! Comienza a usar la aplicación. Puedes encontrar algunos proyectos interesantes en nuestra [página de aplicaciones descentralizadas (dapps)](/apps/#explore).
   <br />

<Alert variant="update">
<AlertEmoji text=":eyes:"/>
<AlertContent className="justify-between flex-row items-center">
  <div>¿Quieres aprender más?</div>
  <ButtonLink href="/guides/">
    Mira nuestras otras guías
  </ButtonLink>
</AlertContent>
</Alert>

## Preguntas frecuentes {#frequently-asked-questions}

### Si poseo una dirección de ETH, ¿poseo la misma dirección en otras cadenas de bloques? {#if-i-own-an-eth-address-do-i-own-the-same-address-on-other-blockchains}

Puedes usar la misma dirección en todas las cadenas de bloques compatibles con la EVM (si tienes el tipo de billetera con una frase de recuperación). Esta [lista](https://chainlist.org/) te mostrará qué cadenas de bloques puedes usar con la misma dirección. Algunas cadenas de bloques, como Bitcoin, implementan un conjunto de reglas de red completamente separado y necesitarás una dirección diferente con un formato diferente. Si tienes una billetera de contrato inteligente, deberías consultar el sitio web de su producto para obtener más información sobre qué cadenas de bloques son compatibles.

### ¿Puedo usar la misma dirección en múltiples dispositivos? {#can-i-use-the-same-address-on-multiple-devices}

Sí, puedes usar la misma dirección en múltiples dispositivos. Técnicamente, las billeteras son solo una interfaz para mostrarte tu saldo y realizar transacciones; tu cuenta no se almacena dentro de la billetera, sino en la cadena de bloques.

### No he recibido las cripto, ¿dónde puedo verificar el estado de una transacción? {#i-have-not-received-the-crypto-where-can-i-check-the-status-of-a-transaction}

Puedes usar [exploradores de bloques](/developers/docs/data-and-analytics/block-explorers/) para ver el estado de cualquier transacción en tiempo real. Todo lo que necesitas hacer es buscar la dirección de tu billetera o el ID de la transacción.

### ¿Puedo cancelar o devolver transacciones? {#can-i-cancel-or-return-transactions}

No, una vez que se confirma una transacción, no puedes cancelarla.
