---
title: Cómo detectar los tókenes de estafa
description: Detectar los tókenes de estafa, cómo hacen para parecer legítimos y cómo evitarlos.
lang: es
---

# Cómo detectar los tókenes de estafa {#identify-scam-tokens}

Uno de los usos más comunes para Ethereum es que un grupo cree un token intercambiable, en cierto sentido su propia moneda. Estos tókenes suelen seguir un estándar, [ERC-20](/developers/docs/standards/tokens/erc-20/). No obstante, en cualquier lugar donde haya casos de uso legítimos que aporten valor, también hay criminales que intentan robar ese valor para sí mismos.

Hay dos maneras en las que puede que intenten engañarle:

- **Vendiéndole un token estafa**, que puede parecer el token legítimo que quiere comprar, pero que lo emiten los estafadores y, por tanto, no vale nada.
- **Engañándole para que firme malas transacciones**, generalmente dirigiéndole a su propia interfaz de usuario. Podrían intentar que le dé a sus contratos una asignación en sus tókenes ERC-20, exponiendo información confidencial que les dé acceso a sus activos, etc. Estas interfaces de usuario podrían ser clones casi perfectos de sitios honestos, pero con trucos ocultos.

Para ilustrar lo que son los tókenes estafa y cómo identificarlos, vamos a ver un ejemplo de uno: [`wARB`](https://etherscan.io/token/0xb047c8032b99841713b8e3872f06cf32beb27b82). Este token intenta parecerse al token legítimo [`ARB`](https://etherscan.io/address/0xb50721bcf8d664c30412cfbc6cf7a15145234ad1).

<ExpandableCard
title="¿Qué es ARB?"
contentPreview=''>

Arbitrum es una organización que desarrolla y gestiona <a href="/developers/docs/scaling/optimistic-rollups/">rollups (o acumulaciones) optimistas</a>. Inicialmente, Arbitrum se fundó como una empresa con fines lucrativos, pero luego tomó medidas para descentralizarse. Como parte de ese proceso, emitió un <a href="/dao/#token-based-based-membership">token de gobernanza negociable</a>.

</ExpandableCard>

<ExpandableCard
title="¿Por qué el token estafa se llama wARB?"
contentPreview=''>

Hay una convención en Ethereum que dice que cuando un activo no cumple con ERC-20, creamos una versión «encubierta» del mismo cuyo nombre comienza por «w». Así que, por ejemplo, tenemos wBTC para bitcoin y <a href="https://cointelegraph.com/news/what-is-wrapped-ethereum-weth-and-how-does-it-work">wETH para ether</a>.

No tiene sentido crear una versión encubierta de un token ERC-20 que ya está en Ethereum, pero los estafadores confían en la apariencia de legitimidad en lugar de la realidad subyacente.

</ExpandableCard>

## ¿Cómo funcionan los tókenes estafa? {#how-do-scam-tokens-work}

La finalidad última de Ethereum es la descentralización. Esto significa que no hay una autoridad central que pueda confiscar sus activos ni impedirle implementar un contrato inteligente. Aunque también significa que los estafadores pueden desplegar cualquier contrato inteligente que deseen.

<ExpandableCard
title="¿Qué son los contratos inteligentes?"
contentPreview=''>

<a href="/developers/docs/smart-contracts/">Los contratos inteligentes</a> son los programas que se ejecutan en la parte superior de la cadena de bloques Ethereum. Cada token ERC-20, por ejemplo, se implementa como un contrato inteligente.

</ExpandableCard>

Específicamente, Arbitrum desplegó un contrato que utiliza el símbolo `ARB`. Pero eso no impide que otras personas también desplieguen un contrato que utiliza exactamente el mismo símbolo, o uno similar. Quienquiera que escriba el contrato puede establecer lo que hará el contrato.

## Apariencia legítima {#appearing-legitimate}

Hay varios trucos que los creadores de tókenes estafa hacen para que parezcan legítimos.

- **Nombre y símbolo legítimos**. Como se mencionó anteriormente, los contratos ERC-20 pueden tener el mismo símbolo y nombre que otros contratos ERC-20. Con respecto a la seguridad, no puede contar con esos campos.

- **Propietarios legítimos**. Los tokens estafa a menudo regalan saldos significativos a direcciones que se puede esperar que sean titulares legítimos del token real.

  Por ejemplo, retomemos el `wARB` de nuevo. [Alrededor del 16 % de los tókenes](https://etherscan.io/token/0xb047c8032b99841713b8e3872f06cf32beb27b82?a=0x1c8db745abe3c8162119b9ef2c13864cd1fdd72f) están en manos de una dirección cuya nombre público es [Arbitrum Foundation: Deployer](https://etherscan.io/address/0x1c8db745abe3c8162119b9ef2c13864cd1fdd72f). Esta no _es_ una dirección falsa, realmente es la dirección que [desplegó el contrato ARB real en la red principal de Ethereum](https://etherscan.io/tx/0x242b50ab4fe9896cb0439cfe6e2321d23feede7eeceb31aa2dbb46fc06ed2670).

  Debido a que el saldo ERC-20 de una dirección es parte del almacenamiento del contrato ERC-20, se puede especificar en el contrato para que sea lo que el desarrollador del contrato desee. También es posible que un contrato prohíba las transferencias para que los usuarios legítimos no puedan deshacerse de esos tókenes estafa.

- **Transferencias legítimas**. _Los propietarios legítimos no pagarían por transferir un token estafa a otros, por lo que si hay transferencias, debería ser legítimo, ¿no? _ **Incorrecto**. Los eventos `transacción` los produce el contrato ERC-20. Un estafador puede escribir fácilmente el contrato de tal manera que produzca esas acciones.

## Sitios web fraudulentos {#websites}

Los estafadores también pueden producir sitios web muy convincentes, a veces incluso clones precisos de sitios auténticos con interfaces de usuario idénticas, pero con trucos sutiles. Los ejemplos podrían ser enlaces externos que parecen legítimos remitiendo al usuario a un sitio de estafa externo, o instrucciones incorrectas que guían al usuario a exponer sus claves o enviar fondos a la dirección de un atacante.

La mejor práctica para evitar esto es comprobar cuidadosamente la URL de los sitios que visita y guardar las direcciones de los sitios auténticos conocidos en sus marcadores. Luego, puede acceder al sitio real a través de sus marcadores sin cometer accidentalmente errores ortográficos ni depender de enlaces externos.

## ¿Cómo puede protegerse a sí mismo? {#protect-yourself}

1. **Compruebe la dirección del contrato**. Los tókenes legítimos provienen de organizaciones legítimas, y puede ver las direcciones del contrato en el sitio web de la organización. Por ejemplo, [para `ARB` puede ver las direcciones legítimas aquí](https://docs.arbitrum.foundation/deployment-addresses#token).

2. **Los tókenes reales tienen liquidez**. Otra opción es mirar el tamaño del grupo de liquidez en [Uniswap](https://uniswap.org/), uno de los protocolos de intercambio de tókenes más comunes. Este protocolo funciona utilizando fondos de liquidez, en los que los inversores depositan sus tókenes con la esperanza de obtener la devolución de las comisiones de transacciones.

Los tókenes estafa suelen tener pequeños fondos de liquidez, si los hay, porque los estafadores no quieren arriesgar activos reales. Por ejemplo, el fondo `ARB`/`ETH` Uniswap tiene alrededor de un millón de dólares ([ver aquí el valor actualizado](https://info.uniswap.org/#/pools/0x755e5a186f0469583bd2e80d1216e02ab88ec6ca)) y comprar o vender una pequeña cantidad no va a cambiar el precio:

![Comprar un token legítimo](./uniswap-real.png)

Pero cuando intente comprar el token estafa `wARB`, incluso una pequeña compra cambiaría el precio en más del 90 %:

![Comprar un token estafa](./uniswap-scam.png)

Esta es otra prueba que nos muestra que `wARB` no es probable que sea un token legítimo.

3. **Consulte en Etherscan**. La comunidad ya ha identificado y denunciado muchos tókenes estafa. Dichos tókenes están [marcados en Etherscan](https://info.etherscan.com/etherscan-token-reputation/). Si bien Etherscan no es una fuente autorizada «oficial»( la naturaleza de las redes descentralizadas impide que haya una fuente autorizada de legitimidad), los tókenes que Etherscan identifica como estafas es probable que sean estafas.

   ![Token estafa en Etherscan](./etherscan-scam.png)

## Conclusión {#conclusion}

Mientras haya valor en el mundo, va a haber estafadores que intenten robarlo para su beneficio, y en un mundo descentralizado no hay nadie que le proteja excepto usted mismo. Esperamos que recuerde estos puntos para ayudar a distinguir los tókenes legítimos de las estafas:

- Los tókenes estafa se hacen pasar por tókenes legítimos, pueden usar el mismo nombre, símbolo, etc.
- Los tókenes estafa \_no pueden_usar la misma dirección del contrato.
- La mejor fuente para la dirección del token legítimo es la organización propietaria del token.
- De lo contrario, puede usar aplicaciones populares y de confianza como [Uniswap](https://app.uniswap.org/#/swap) y [Etherscan](https://etherscan.io/).
