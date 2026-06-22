---
title: Cómo revocar el acceso de los contratos inteligentes a tus fondos de criptomonedas
description: Una guía práctica sobre cómo revocar el acceso abusivo de los contratos inteligentes a tus tokens
lang: es
---

Esta guía te enseñará cómo ver una lista de todos los [contratos inteligentes](/glossary/#smart-contract) a los que has permitido el acceso a tus fondos y cómo cancelarlos.

A veces, los desarrolladores malintencionados crean puertas traseras en los contratos inteligentes que permiten el acceso a los fondos de los usuarios desprevenidos que interactúan con el contrato inteligente. Lo que suele ocurrir es que dichas plataformas piden permiso al usuario para gastar un **número ilimitado de tokens** en un intento de ahorrar pequeñas cantidades de [gas](/glossary/#gas) en el futuro, pero esto conlleva un mayor riesgo.

Una vez que una plataforma tiene derechos de acceso ilimitados a un token en tu [billetera](/glossary/#wallet), pueden gastar todos esos tokens incluso si has retirado tus fondos de su plataforma a tu billetera. Los actores malintencionados aún pueden acceder a tus fondos y retirarlos a sus billeteras sin dejarte ninguna opción de recuperación.

Las únicas protecciones son abstenerse de usar proyectos nuevos no probados, aprobar solo lo que necesitas o revocar el acceso regularmente. Entonces, ¿cómo se hace eso?

## Paso 1: Usa herramientas para revocar el acceso {#step-1-use-revoke-access-tools}

Varios sitios web te permiten ver y revocar los contratos inteligentes conectados a tu dirección. Visita el sitio web y conecta tu billetera:

- [Etherscan](https://etherscan.io/tokenapprovalchecker) (Ethereum)
- [Blockscout](https://eth.blockscout.com/essential-dapps/revoke) (Ethereum)
- [Revoke](https://revoke.cash/) (múltiples redes)
- [Unrekt](https://app.unrekt.net/) (múltiples redes)
- [EverRevoke](https://everrise.com/everrevoke/) (múltiples redes)

## Paso 2: Conecta tu billetera {#step-2-connect-your-wallet}

Una vez que estés en el sitio web, haz clic en «Connect wallet» (Conectar billetera). El sitio web debería pedirte que conectes tu billetera.

Asegúrate de usar la misma red en tu billetera y en el sitio web. Solo verás los contratos inteligentes relacionados con la red seleccionada. Por ejemplo, si te conectas a la red principal de Ethereum, solo verás contratos de Ethereum, no contratos de otras cadenas como Polygon.

## Paso 3: Selecciona un contrato inteligente que desees revocar {#step-3-select-a-smart-contract-you-wish-to-revoke}

Deberías ver todos los contratos que tienen permitido el acceso a tus tokens y su límite de gasto. Encuentra el que deseas cancelar.

Si no sabes qué contrato elegir, puedes revocarlos todos. No te causará ningún problema, pero tendrás que otorgar un nuevo conjunto de permisos la próxima vez que interactúes con cualquiera de estos contratos.

## Paso 4: Revoca el acceso a tus fondos {#step-4-revoke-access-to-your-funds}

Una vez que hagas clic en revocar, deberías ver una nueva sugerencia de transacción en tu billetera. Esto es lo esperado. Tendrás que pagar la tarifa de transacción para que la cancelación sea exitosa. Dependiendo de la red, esto puede tardar desde un minuto hasta varios en procesarse.

Te aconsejamos que actualices la herramienta de revocación después de unos minutos y conectes tu billetera nuevamente para verificar si el contrato revocado ha desaparecido de la lista.

<mark>Te recomendamos que nunca permitas a los proyectos un acceso ilimitado a tus tokens y que revoques todo el acceso de asignación de tokens regularmente. Revocar el acceso a los tokens nunca debería resultar en una pérdida de fondos, especialmente si usas las herramientas enumeradas anteriormente.</mark>

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

### ¿Revocar el acceso a los tokens también cancela el staking, los fondos de liquidez (pooling), los préstamos, etc.? {#does-revoking-token-access-also-terminate-staking-pooling-lending-etc}

No, no afectará a ninguna de tus estrategias de [finanzas descentralizadas (DeFi)](/glossary/#defi). Mantendrás tus posiciones y seguirás obteniendo recompensas, etc.

### ¿Desconectar una billetera de un proyecto es lo mismo que eliminar el permiso para usar mis fondos? {#is-disconnecting-a-wallet-from-a-project-the-same-as-removing-permission-to-use-my-funds}

No, si desconectas tu billetera del proyecto, pero has otorgado permisos de asignación de tokens, aún pueden usar esos tokens. Necesitas revocar ese acceso.

### ¿Cuándo caducará el permiso del contrato? {#when-will-the-contract-permission-expire}

No hay fechas de caducidad en los permisos de los contratos. Si otorgas permisos a un contrato, pueden usarse, incluso años después de haber sido otorgados.

### ¿Por qué los proyectos establecen una asignación de tokens ilimitada? {#why-do-projects-set-unlimited-token-allowance}

Los proyectos a menudo hacen esto para minimizar el número de solicitudes requeridas, lo que significa que el usuario solo tiene que aprobar una vez y pagar la tarifa de transacción una sola vez. Aunque es conveniente, puede ser peligroso para los usuarios aprobar descuidadamente en sitios que no han sido probados con el tiempo o auditados. Algunas billeteras te permiten restringir manualmente la cantidad de tokens que se aprueban para limitar tu riesgo. Consulta con el proveedor de tu billetera para obtener más información.
