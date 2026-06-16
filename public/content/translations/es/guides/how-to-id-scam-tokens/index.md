---
title: Cómo identificar tokens fraudulentos
description: Comprender los tokens fraudulentos, cómo se hacen pasar por legítimos y cómo evitarlos.
lang: es
---

Uno de los usos más comunes de Ethereum es que un grupo cree un token negociable, en cierto sentido, su propia moneda. Estos tokens suelen seguir un estándar, [ERC-20](/developers/docs/standards/tokens/erc-20/). Sin embargo, dondequiera que haya casos de uso legítimos que aporten valor, también hay delincuentes que intentan robar ese valor para sí mismos.

Hay dos formas en las que es probable que te engañen:

- **Vendiéndote un token fraudulento**, que puede parecerse al token legítimo que deseas comprar, pero que es emitido por los estafadores y no vale nada.
- **Engañándote para firmar transacciones maliciosas**, generalmente dirigiéndote a su propia interfaz de usuario. Podrían intentar que le des a sus contratos una asignación sobre tus tokens ERC-20, exponiendo información confidencial que les da acceso a tus activos, etc. Estas interfaces de usuario pueden ser clones casi perfectos de sitios honestos, pero con trampas ocultas.

Para ilustrar qué son los tokens fraudulentos y cómo identificarlos, vamos a ver un ejemplo de uno: [`wARB`](https://eth.blockscout.com/token/0xB047c8032b99841713b8E3872F06cF32beb27b82). Este token intenta parecerse al token legítimo [`ARB`](https://eth.blockscout.com/address/0xb50721bcf8d664c30412cfbc6cf7a15145234ad1).

<ExpandableCard
title="What is ARB?"
contentPreview=''>

Arbitrum es una organización que desarrolla y gestiona [rollups optimistas](/developers/docs/scaling/optimistic-rollups/). Inicialmente, Arbitrum se organizó como una empresa con fines de lucro, pero luego tomó medidas para descentralizarse. Como parte de ese proceso, emitieron un [token de gobernanza](/dao/#token-based-membership) negociable.

</ExpandableCard>

<ExpandableCard
title="Why is the scam token called wARB?"
contentPreview=''>

Existe una convención en Ethereum de que cuando un activo no es compatible con ERC-20, creamos una versión "envuelta" (wrapped) del mismo con un nombre que comienza con "w". Así, por ejemplo, tenemos wBTC para Bitcoin y <a href="https://cointelegraph.com/news/what-is-wrapped-ethereum-weth-and-how-does-it-work">wETH para ether</a>.

No tiene sentido crear una versión envuelta de un token ERC-20 que ya está en Ethereum, pero los estafadores se basan en la apariencia de legitimidad en lugar de la realidad subyacente.

</ExpandableCard>

## ¿Cómo funcionan los tokens fraudulentos? {#how-do-scam-tokens-work}

El objetivo principal de Ethereum es la descentralización. Esto significa que no hay una autoridad central que pueda confiscar tus activos o impedirte desplegar un contrato inteligente. Pero también significa que los estafadores pueden desplegar cualquier contrato inteligente que deseen.

<ExpandableCard
title="What are smart contracts?"
contentPreview=''>

Los [contratos inteligentes](/developers/docs/smart-contracts/) son los programas que se ejecutan sobre la cadena de bloques de Ethereum. Cada token ERC-20, por ejemplo, se implementa como un contrato inteligente.

</ExpandableCard>

Específicamente, Arbitrum desplegó un contrato que usa el símbolo `ARB`. Pero eso no impide que otras personas también desplieguen un contrato que use exactamente el mismo símbolo, o uno similar. Quien escribe el contrato es quien establece lo que hará el contrato.

## Aparentar legitimidad {#appearing-legitimate}

Hay varios trucos que los creadores de tokens fraudulentos utilizan para aparentar legitimidad.

- **Nombre y símbolo legítimos**. Como se mencionó anteriormente, los contratos ERC-20 pueden tener el mismo símbolo y nombre que otros contratos ERC-20. No puedes confiar en esos campos para tu seguridad.

- **Propietarios legítimos**. Los tokens fraudulentos a menudo hacen airdrop de saldos significativos a direcciones que se esperaría que fueran titulares legítimos del token real.

  Por ejemplo, veamos `wARB` de nuevo. [Alrededor del 16 % de los tokens](https://eth.blockscout.com/token/0xb047c8032b99841713b8e3872f06cf32beb27b82?tab=holders) están en manos de una dirección cuya etiqueta pública es [Arbitrum Foundation: Deployer](https://eth.blockscout.com/address/0x1C8db745ABe3C8162119b9Ef2c13864Cd1FDD72F). Esta _no_ es una dirección falsa, realmente es la dirección que [desplegó el contrato ARB real en la red principal de Ethereum](https://eth.blockscout.com/tx/0x242b50ab4fe9896cb0439cfe6e2321d23feede7eeceb31aa2dbb46fc06ed2670).

  Debido a que el saldo ERC-20 de una dirección es parte del almacenamiento del contrato ERC-20, el contrato puede especificar que sea lo que el desarrollador del contrato desee. También es posible que un contrato prohíba las transferencias para que los usuarios legítimos no puedan deshacerse de esos tokens fraudulentos.

- **Transferencias legítimas**. _Los propietarios legítimos no pagarían por transferir un token fraudulento a otros, así que si hay transferencias debe ser legítimo, ¿verdad?_ **Falso**. Los eventos `Transfer` son producidos por el contrato ERC-20. Un estafador puede escribir fácilmente el contrato de tal manera que produzca esas acciones.

## Sitios web fraudulentos {#websites}

Los estafadores también pueden crear sitios web muy convincentes, a veces incluso clones precisos de sitios auténticos con interfaces de usuario idénticas, pero con trampas sutiles. Algunos ejemplos podrían ser enlaces externos que parecen legítimos pero que en realidad envían al usuario a un sitio fraudulento externo, o instrucciones incorrectas que guían al usuario a exponer sus claves o enviar fondos a la dirección de un atacante.

La mejor práctica para evitar esto es verificar cuidadosamente la URL de los sitios que visitas y guardar las direcciones de los sitios auténticos conocidos en tus marcadores. Luego, puedes acceder al sitio real a través de tus marcadores sin cometer errores ortográficos accidentalmente ni depender de enlaces externos.

## ¿Cómo puedes protegerte? {#protect-yourself}

1. **Verifica la dirección del contrato**. Los tokens legítimos provienen de organizaciones legítimas, y puedes ver las direcciones de los contratos en el sitio web de la organización. Por ejemplo, [para `ARB` puedes ver las direcciones legítimas aquí](https://docs.arbitrum.foundation/deployment-addresses#token).

2. **Los tokens reales tienen liquidez**. Otra opción es observar el tamaño del fondo de liquidez en [Uniswap](https://uniswap.org/), uno de los protocolos de intercambio de tokens más comunes. Este protocolo funciona utilizando fondos de liquidez, en los que los inversores depositan sus tokens con la esperanza de obtener un rendimiento de las tarifas de negociación.

Los tokens fraudulentos suelen tener fondos de liquidez diminutos, si es que tienen alguno, porque los estafadores no quieren arriesgar activos reales. Por ejemplo, el fondo de liquidez de Uniswap de `ARB`/`ETH` contiene alrededor de un millón de dólares ([consulta aquí el valor actualizado](https://app.uniswap.org/explore#/pools/0x755e5a186f0469583bd2e80d1216e02ab88ec6ca)) y comprar o vender una pequeña cantidad no va a cambiar el precio:

![Buying a legitimate token](./uniswap-real.png)

Pero cuando intentas comprar el token fraudulento `wARB`, incluso una compra diminuta cambiaría el precio en más del 90 %:

![Buying a scam token](./uniswap-scam.png)

Esta es otra prueba que nos demuestra que es poco probable que `wARB` sea un token legítimo.

3. **Busca en Etherscan**. Muchos tokens fraudulentos ya han sido identificados y reportados por la comunidad. Dichos tokens están [marcados en Etherscan](https://info.etherscan.com/etherscan-token-reputation/). Si bien Etherscan no es una fuente de verdad autorizada (es la naturaleza de las redes descentralizadas que no pueda haber una fuente autorizada de legitimidad), es probable que los tokens identificados por Etherscan como estafas lo sean.

   ![Scam token in Etherscan](./etherscan-scam.png)

## Conclusión {#conclusion}

Mientras haya valor en el mundo, habrá estafadores que intenten robarlo para sí mismos, y en un mundo descentralizado no hay nadie que te proteja excepto tú mismo. Con suerte, recordarás estos puntos para ayudarte a distinguir los tokens legítimos de las estafas:

- Los tokens fraudulentos se hacen pasar por tokens legítimos, pueden usar el mismo nombre, símbolo, etc.
- Los tokens fraudulentos _no pueden_ usar la misma dirección de contrato.
- La mejor fuente para obtener la dirección del token legítimo es la organización a la que pertenece el token.
- En su defecto, puedes usar aplicaciones populares y confiables como [Uniswap](https://app.uniswap.org/#/swap) y [Blockscout](https://eth.blockscout.com/).