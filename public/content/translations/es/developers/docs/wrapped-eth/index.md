---
title: ¿Qué es Wrapped Ether (WETH)?
description: Introducción a Wrapped Ether (WETH), un wrapper compatible con ERC20 para Ether (ETH)
lang: es
---

# Wrapped Ether (WETH) {#intro-to-weth}

<Alert variant="update">
<Emoji text="🎁" />
<div>Conecte su cartera para agrupar o desagrupar ETH en cualquier cadena en [WrapETH.com](https://www.wrapeth.com/)</div>
</Alert>

Ether (ETH) es la moneda principal de Ethereum. Se utiliza para varios propósitos como staking, como moneda, y pagar comisiones de gas para las transacciones. **WETH es efectivamente una forma actualizada de ETH con alguna funcionalidad adicional requerida por muchas aplicaciones y [tokens ERC-20](/glossary/#erc-20)**, que son otros tipos de activos digitales en Ethereum. Para trabajar con estos tokens, ETH debe seguir las mismas reglas que ellos, conocidas como el estándar ERC-20.

Para cerrar esta brecha, se creó Wrapped Ether (WETH). **Wrapped ETH es un contrato inteligente que le permite depositar cualquier cantidad de ETH en el contrato y recibir la misma cantidad en WETH minteado** que cumple con el estándar de tokens ERC-20. WETH es una representación de ETH que le permite interactuar con él como un token ERC-20, no como el activo nativo ETH. Aún necesitará ETH nativo para pagar las tarifas de gas, así que asegúrese de ahorrar un poco al depositar.

Puede unwrappear (desenvolver) WETH por ETH utilizando el contrato inteligente de WETH. Puede canjear cualquier cantidad de WETH con el contrato inteligente de WETH, y recibirá la misma cantidad en ETH. El WETH depositado se quema y se saca del suministro circulante de WETH.

**Aproximadamente ~3% del suministro de ETH circulante es bloqueado en el contrato de token de WETH**, lo que lo convierte en uno de los [contratos inteligentes](/glossary/#smart-contract). WETH es especialmente importante para los usuarios que interactúan con aplicaciones en finanzas descentralizadas (DeFi).

## ¿Por qué necesitamos WETH como un ERC-20? {#why-do-we-need-to-wrap-eth}

[ERC-20](/developers/docs/standards/tokens/erc-20/) define una interfaz estándar para los tokens transferibles, para que cualquiera pueda crear tokens que interactúen sin problemas con aplicaciones y tokens que utilicen este estándar en el ecosistema de Ethereum. Dado que **ETH es anterior al estándar ERC-20**, ETH no cumple con esta especificación. Esto significa que **no puede fácilmente** cambiar ETH por otros tokens ERC-20 o **usar ETH en aplicaciones que utilizan el estándar ERC-20**. Wrappear ETH le da la oportunidad de hacer lo siguiente:

- **Intercambiar ETH por tokens ERC-20**: No puede intercambiar ETH directamente por otros tokens ERC-20. WETH es una representación de ether que cumple con el estándar de tokens fungibles ERC-20 y se puede intercambiar con otros tokens ERC-20.

- **Usar ETH en dapps**: Debido a que ETH no es compatible con ERC20, los desarrolladores tendrían que crear interfaces separadas (una para ETH y otra para tokens ERC-20) en dapps. Wrappear ETH elimina este obstáculo y permite a los desarrolladores manejar ETH y otros tokens dentro de la misma dapp. Muchas aplicaciones de finanzas descentralizadas utilizan este estándar y crean mercados para intercambiar estos tokens.

## Wrapped Ether (WETH) vs. ether (ETH): ¿cuál es la diferencia? {#weth-vs-eth-differences}

|            | **Ether (ETH)**                                                                                                                                                                                                     | **Wrapped Ether (WETH)**                                                                                                                                                                                                                                                                      |
| ---------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Suministro | El suministro de ETH es manejado por el protocolo de Ethereum. La [emisión](/roadmap/merge/issuance) de ETH es manejada por los validadores de Ethereum cuando procesan transacciones y crean bloques. | WETH es un token ERC-20 cuyo suministro es manejado por un contrato inteligente. Nuevas unidades de WETH son emitidas por el contrato luego de que recibe depósitos de ETH que provienen de usuarios, o se queman unidades de WETH cuando un usuario desea canjear WETH por ETH. |
| Propiedad  | La propiedad está gestionada por el protocolo Ethereum a través del saldo de su cuenta.                                                                                                                                | La propiedad de WETH es gestionada por el contrato inteligente del token WETH, asegurado por el protocolo Ethereum.                                                                                                                                                                              |
| Gas        | Ether (ETH) es la unidad de pago aceptada para el cálculo en la red Ethereum. Las tarifas de gas se denominan en gwei (una unidad de ether).                     | El pago del gas con tokens WETH no es compatible de forma nativa.                                                                                                                                                                                                                                |

## Preguntas frecuentes {#faq}

<ExpandableCard title="Do you pay to wrap/unwrap ETH?" eventCategory="/wrapped-eth" eventName="clicked Do you pay to wrap/unwrap ETH?">

Usted paga tasas de gas para wrappear o unwrappear ETH utilizando el contrato WETH.

</ExpandableCard>

<ExpandableCard title="Is WETH safe?" eventCategory="/wrapped-eth" eventName="clicked Is WETH safe?">

En general, WETH se considera seguro porque se basa en un contrato inteligente sencillo y de eficacia probada. El contrato WETH también ha sido verificado formalmente, lo cual representa el estándar de seguridad más alto para contratos inteligentes en Ethereum.

</ExpandableCard>

<ExpandableCard title="Why am I seeing different WETH tokens?" eventCategory="/wrapped-eth" eventName="clicked Why am I seeing different WETH tokens?">

Además de la [implementación canónica de WETH](https://etherscan.io/token/0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2) descrita en esta página, existen otras variantes. Pueden ser tokens personalizados creados por desarrolladores de aplicaciones o versiones emitidas en otras cadenas de bloques, y pueden comportarse de forma diferente o tener propiedades de seguridad distintas. **Compruebe siempre la información del token para saber con qué implementación de WETH está interactuando.**

</ExpandableCard>

<ExpandableCard title="What are the WETH contracts on other networks?" eventCategory="/wrapped-eth" eventName="clicked What are the WETH contracts on other networks?">

- [Red principal de Ethereum](https://etherscan.io/token/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2)
- [Arbitrum](https://arbiscan.io/token/0x82af49447d8a07e3bd95bd0d56f35241523fbab1)
- [Optimism](https://optimistic.etherscan.io/token/0x4200000000000000000000000000000000000006)

</ExpandableCard>

## Lecturas adicionales {#further-reading}

- [¿Qué es WETH?](https://weth.tkn.eth.limo/)
- [Información del token WETH en Blockscout](https://eth.blockscout.com/token/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2)
- [Verificación formal de WETH](https://zellic.io/blog/formal-verification-weth)
