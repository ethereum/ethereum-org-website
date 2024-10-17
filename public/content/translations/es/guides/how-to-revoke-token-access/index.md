---
title: Cómo revocar el acceso al contrato inteligente a sus fondos en criptomonedas
description: Guía para revocar el acceso a tókenes de contratos inteligentes engañosos
lang: es
---

# Cómo revocar el acceso al contrato inteligente a sus fondos en criptomonedas

Esta guía le enseñará cómo ver una lista de todos los [contratos inteligentes](/glossary/#smart-contract) a los que ha permitido acceder a sus fondos y cómo cancelarlos.

En ocasiones, desarrolladores malintencionados crean puertas traseras en los contratos inteligentes que permiten acceder a los fondos de usuarios desprevenidos que interactúan con el contrato inteligente. Lo que a menudo sucede es que tales plataformas piden al usuario permiso para gastar un **número ilimitado de tokens** en un intento de ahorrar pequeñas cantidades de [gas](/glossary/#gas) en el futuro, pero esto conlleva un mayor riesgo.

Una vez que una plataforma tiene derechos de acceso ilimitados a un token en su [billetera](/glossary/#wallet), puede gastar todos esos tokens incluso si ha retirado sus fondos de su plataforma a su billetera. Los atacantes aun pueden seguir accediendo a sus fondos y retirarlos a sus carteras sin que le quede ninguna opción de recuperación.

Las únicas protecciones son abstenerse de utilizar nuevos proyectos no probados, aprobar sólo lo que se necesita o revocar regularmente el acceso. Pero, ¿cómo se logra hacer?

## Paso 1: Utilizar las herramientas de revocación de acceso

Existen varios sitios web que le permiten ver y revocar contratos inteligentes conectados a su dirección. Visite el sitio web y conecte su cartera:

- [Ethallowance](https://ethallowance.com/) (Ethereum)
- [Etherscan](https://etherscan.io/tokenapprovalchecker) (Ethereum)
- [Cointool](https://cointool.app/approve/eth) (múltiples redes)
- [Revoke](https://revoke.cash/) (múltiples redes)
- [Unrekt](https://app.unrekt.net/) (múltiples redes)
- [EverRevoke](https://everrise.com/everrevoke/) (múltiples redes)

## Paso 2: Conecte su cartera

Una vez en el sitio web, haga clic en «Conectar cartera». El sitio web debería pedirle que conecte su cartera.

Asegúrese de usar la misma red en su cartera y en el sitio web. Solo podrá ver los contratos inteligentes relacionados con la red seleccionada. Por ejemplo, si se conecta a Ethereum Mainnet, solo verá contratos de Ethereum, no contratos de otras cadenas como Polygon.

## Paso 3: Seleccione el contrato inteligente que desee revocar

Debería ver todos los contratos que tienen permiso para acceder a sus tókenes y su límite de gasto. Encuentre el que desea revocar.

Si no sabe qué contrato elegir, puede revocarlos todos. No le creará ningún problema, pero tendrá que conceder un nuevo conjunto de permisos la próxima vez que interactúe con cualquiera de estos contratos.

## Paso 4: Revocar acceso a sus fondos

Una vez que haga clic en revocar, debería ver una nueva sugerencia de transacción en su cartera. Es algo que cabe esperar. Tendrá que pagar la cuota para que se cancele satisfactoriamente. Dependiendo de la red, su procesaminto puede llevar entre uno y varios minutos.

Le aconsejamos que actualice la herramienta de revocación transcurridos unos minutos y vuelva a conectar su cartera de nuevo para asegurarse de que el contrato revocado haya desaparecido de la lista.

<mark>Le recomendamos que nunca permita que los proyectos tengan acceso ilimitado a sus tókenes y que revoque regularmente todos los permisos de acceso a tókenes. Revocar el acceso a un token nunca debería provocar una pérdida de fondos, especialmente si utiliza la lista de herramientas mencionadas anteriormente.</mark>

 <br />

<InfoBanner shouldSpaceBetween emoji=":eyes:">
  <div>¿Quiere saber más?</div>
  <ButtonLink href="/guides/">
    Consulte nuestras demás guías
  </ButtonLink>
</InfoBanner>

## Preguntas más frecuentes

### ¿Revocar el acceso de tókenes también hace que se termine la apuesta, la reserva, el préstamo, etc?

No, no afectará a ninguna de sus estrategias [DeFi](/glossary/#defi). Permanecerá en sus posiciones y seguirá obteniendo recompensas, etc.

### ¿Desconectar una cartera de un proyecto es lo mismo que quitar el permiso para usar mis fondos?

No, si desconecta su cartera del proyecto, pero ha concedido permisos de acceso a tókenes, todavía pueden usar esos tókenes. Es preciso que revoque ese acceso.

### ¿Cuándo caducará el permiso del contrato?

No hay fechas de caducidad en los permisos de contrato. Si usted concede permisos de contrato, pueden usarse incluso años después de que se concedan.

### ¿Por qué los proyectos establecen una autorización ilimitada de tókenes?

Los proyectos a menudo hacen esto para minimizar el número de peticiones requeridas, lo que significa que el usuario sólo tiene que aprobar y pagar la cuota de transacción una vez. Aunque es conveniente aprobarlos, si los usuarios lo hacen sin prestar atención puede ser peligroso en sitios que no están probados con tiempo o auditados. Algunas carteras le permiten restringir manualmente la cantidad de tókenes que se están aprobando para limitar su riesgo. Consulte con su proveedor de cartera para obtener más información.
