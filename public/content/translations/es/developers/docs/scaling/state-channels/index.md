---
title: Canales de estado
description: Introducción a los canales de estado y a los canales de pago como solución de escalado actualmente utilizada por la comunidad de Ethereum.
lang: es
sidebarDepth: 3
---

Los "canales de estado" permiten a los participantes hacer transacciones seguras fuera de la cadena mientras siguen manteniendo interacción con la Red principal de Ethereum a un nivel mínimo. Los pares de un canal puede realizar un número arbitrario de transacciones fuera de la cadena solamente enviando dos transacciones en cadena, una para abrir y otra para cerrar el canal. Esto permite una alta velocidad en el número de transacciones y conlleva un menor costo para los usuarios.

##  {#how-do-sidechains-work}

Las cadenas de bloques públicas, como Ethereum, enfrentan desafíos de escalabilidad debido a su arquitectura distrubuida: todas las transacciones hechas dentro de la cadena deben ser ejecutadas por todos los nodos. Los nodos deben ser capaces de manejar el volumen de transacciones en un solo bloque usando equipos de cómputo modestos, lo cual limita el volumen de transacciones para mantener la red descentralizada.

###  {#consensus-algorithms}

Los canales son simples protocolos entre pares que permiten a dos entidades hacer cuantas transacciones requieran entre ellos y, al finalizar, solamente publicar el resultado final en la cadena de bloques. El canal usa criptografía para demostrar que los datos de resumen que generan son el verdadero resultado de un conjunto válido de transacciones intermedias. Un contrato inteligente ["multifirma"](/developers/docs/smart-contracts/#multisig) asegura que las transacciones sean firmadas por las entidades correctas.

- []()
- []()
-

Con los canales, los cambios de estado son ejecutados y validados por las partes interesadas, minimizando el nivel de cómputo requerido en la capa de ejecución de Ethereum. Esto disminuye la congestión en Ethereum a la vez que incrementa la velocidad de procesamiento de transacciones para los usuarios.

####  {#block-parameters}

Cada canal es administrado por un [contrato inteligente multifirma](/developers/docs/smart-contracts/#multisig) que corre en Ethereum. Para abrir un canal, los participantes implementan el contrato del canal en la cadena y depositan fondos en él.

Para cerrar un canal, los participantes deben enviar el estado final acordado del canal en la cadena. Después el contrato inteligente distribuye los fondos bloqueados de acuerdo al saldo de cada uno de los participantes indicado en el estado final del canal.

Los canales entre pares son particularmente útiles en situaciones donde un definido número de participantes deseen hacer transacciones con alta frecuencia sin incurrir grandes gastos. Los canales de la cadena de bloques se dividen en dos categorías: **canales de pago** y **canales de estado**.

###  {#evm-compatibility}

Un canal de pago podría describirse mejor como un "libro mayor de dos vías" mantenido de manera colectiva por dos usuarios. El saldo inicial del libro mayor es la suma de los depósitos enviados al contrato en cadena durante la fase de apertura del canal.

Las actualizaciones del saldo del libro mayor (es decir, el estado del canal de pago) requieren la aprobación de todas las partes del canal. Una actualización del canal, firmada por todos los participantes del canal, se considera finalizada, al igual que una transacción en Ethereum.

Los canales de pago fueron algunas de las primeras soluciones de escalado diseñadas para minimizar la costosa actividad en cadena de las interacciones simples de los usuarios (por ejemplo, transferencias de ETH, intercambios o swaps atómicos o micropagos). Los participantes del canal pueden realizar una cantidad ilimitada de transacciones instantáneas entre sí, siempre y cuando la suma neta de sus transferencias no exceda los tokens depositados.

Aparte de permitir los pagos fuera de la cadena, los canales de pago no han demostrado ser útiles para manejar lógica general de transición de estados. Los canales de estado se crearon para resolver este problema y hacer que los canales fueran útiles para escalar los cálculos de uso general.

###  {#asset-movement}

Los canales de estado todavía tienen mucho en común con los canales de pago. Por ejemplo, los usuarios interactúan intercambiando mensajes firmados criptográficamente (transacciones), que los otros participantes del canal también deben firmar. Si una actualización de estado propuesta no está firmada por todos los participantes, se considera no válida.

##  {#pros-and-cons-of-sidechains}

|  |  |
|  |  |
|  |  |
|  |  |
|  |  |
|  |  |

###  {#use-sidechains}

- []()
- []()
- []()
- []()
- []()

##  {#further-reading}

-

_ _
