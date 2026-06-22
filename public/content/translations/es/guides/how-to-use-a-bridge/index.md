---
title: Cómo transferir tokens a la capa 2 mediante un puente
description: Una guía que explica cómo mover tokens de Ethereum a la capa 2 usando un puente.
lang: es
---

Si hay mucho tráfico en Ethereum, puede volverse costoso. Una solución a esto es crear nuevas "capas": es decir, diferentes redes que operan de manera similar a la propia Ethereum. Estas llamadas capas 2 (l2) ayudan a reducir la congestión y el costo en Ethereum al procesar muchas más transacciones con tarifas más bajas, y solo almacenan el resultado de estas en Ethereum de vez en cuando. Como tal, estas capas 2 nos permiten realizar transacciones con mayor velocidad y menores costos. Muchos proyectos cripto populares se están moviendo a las capas 2 debido a estos beneficios. La forma más sencilla de mover tokens de Ethereum a la capa 2 es usar un puente.

**Requisitos previos:** 

- tener una billetera cripto; si no tienes una, sigue esta guía para [crear una cuenta de Ethereum](/guides/how-to-create-an-ethereum-account/)
- agregar fondos a tu billetera

## 1. Determina qué red de capa 2 quieres usar {#1-determine-which-layer-2-network-you-want-to-use}

Puedes obtener más información sobre los diferentes proyectos y enlaces importantes en nuestra [página de capa 2](/layer-2/).

## 2. Ve al puente seleccionado {#2-go-to-the-selected-bridge}

Algunas capas 2 populares son:

- [Puente de Arbitrum](https://portal.arbitrum.io/bridge?l2ChainId=42161)
- [Puente de Optimism](https://app.optimism.io/bridge/deposit)
- [Puente de la red Boba](https://hub.boba.network/)

## 3. Conéctate al puente con tu billetera {#3-connect-to-the-bridge-with-your-wallet}

Asegúrate de que tu billetera esté conectada a la red principal de Ethereum. Si no lo está, el sitio web te pedirá automáticamente que cambies de red.

![Common interface for bridging tokens](./bridge1.png)

## 4. Especifica la cantidad y mueve los fondos {#4-specify-the-amount-and-move-the-funds}

Revisa la cantidad que obtendrás a cambio en la red de capa 2 y las tarifas para evitar sorpresas desagradables.

![Common interface for bridging tokens](./bridge2.png)

## 5. Confirma la transacción en tu billetera {#5-confirm-the-transaction-in-your-wallet}

Tendrás que pagar una tarifa (llamada [gas](/glossary/#gas)) en forma de ETH para procesar la transacción.

![Common interface for bridging tokens](./bridge3.png)

## 6. Espera a que se muevan tus fondos {#6-wait-for-your-funds-to-be-moved}

Este proceso no debería tardar más de 10 minutos.

## 7. Agrega la red de capa 2 seleccionada a tu billetera (opcional) {#7-add-the-selected-layer-2-network-to-your-wallet-optional}

Puedes usar [chainlist.org](https://chainlist.org) para encontrar los detalles de RPC de la red. Una vez que se agregue la red y finalice la transacción, deberías ver los tokens en tu billetera.
<br />

<Alert variant="update">
<AlertEmoji text=":eyes:"/>
<AlertContent className="justify-between flex-row items-center">
  <div>¿Quieres aprender más?</div>
  <ButtonLink href="/guides/">
    Consulta nuestras otras guías
  </ButtonLink>
</AlertContent>
</Alert>

## Preguntas frecuentes {#frequently-asked-questions}

### ¿Qué pasa si tengo fondos en un exchange? {#what-if-i-have-funds-on-an-exchange}

Es posible que puedas retirar a algunas capas 2 directamente desde un exchange. Consulta la sección «Mover a la capa 2» de nuestra [página de capa 2](/layer-2/) para obtener más información.

### ¿Puedo volver a la red principal de Ethereum después de transferir mis tokens a la L2 mediante un puente? {#can-i-go-back-to-ethereum-mainnet-after-i-bridge-my-tokens-to-l2}

Sí, siempre puedes mover tus fondos de vuelta a la red principal usando el mismo puente.
