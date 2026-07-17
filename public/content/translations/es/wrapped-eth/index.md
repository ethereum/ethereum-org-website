---
title: Ether envuelto (WETH)
metaTitle: Qué es el ether envuelto (WETH)
description: Una introducción al ether envuelto (WETH), un envoltorio compatible con ERC-20 para el ether (ETH). 
lang: es
---

<Alert variant="update">
<Emoji text="🎁" />
<div>Conecta tu billetera para envolver o desenvolver ETH en cualquier cadena en [WrapETH.com](https://www.wrapeth.com/)</div>
</Alert>

El ether (ETH) es la moneda principal de Ethereum. Se utiliza para varios propósitos, como hacer staking, como moneda y para pagar las tarifas de gas por computación. **El WETH es efectivamente una forma mejorada de ETH con algunas funcionalidades adicionales requeridas por muchas aplicaciones y [tokens ERC-20](/glossary/#erc-20)**, que son otros tipos de activos digitales en Ethereum. Para funcionar con estos tokens, el ETH debe seguir las mismas reglas que ellos, conocidas como el estándar ERC-20.

Para cerrar esta brecha, se creó el ether envuelto (WETH). **El ether envuelto es un contrato inteligente que te permite depositar cualquier cantidad de ETH en el contrato y recibir la misma cantidad en WETH acuñado** que cumple con el estándar de token ERC-20. El WETH es una representación del ETH que te permite interactuar con él como un token ERC-20, no como el activo nativo ETH. Aún necesitarás ETH nativo para pagar las tarifas de gas, así que asegúrate de guardar un poco al depositar. 

Puedes desenvolver WETH por ETH utilizando el contrato inteligente de WETH. Puedes canjear cualquier cantidad de WETH con el contrato inteligente de WETH, y recibirás la misma cantidad en ETH. El WETH depositado luego se quema y se retira del suministro circulante de WETH.

**Aproximadamente el ~3% del suministro circulante de ETH está bloqueado en el contrato del token WETH**, lo que lo convierte en uno de los [contratos inteligentes](/glossary/#smart-contract) más utilizados. El WETH es especialmente importante para los usuarios que interactúan con aplicaciones de finanzas descentralizadas (DeFi).

## ¿Por qué necesitamos envolver el ETH como un ERC-20? {#why-do-we-need-to-wrap-eth}

[ERC-20](/developers/docs/standards/tokens/erc-20/) define una interfaz estándar para tokens transferibles, por lo que cualquiera puede crear tokens que interactúen sin problemas con aplicaciones y tokens que utilicen este estándar en el ecosistema de Ethereum. Dado que **el ETH es anterior al estándar ERC-20**, el ETH no cumple con esta especificación. Esto significa que **no puedes intercambiar fácilmente** ETH por otros tokens ERC-20 ni **usar ETH en aplicaciones que utilicen el estándar ERC-20**. Envolver el ETH te da la oportunidad de hacer lo siguiente:

- **Intercambiar ETH por tokens ERC-20**: No puedes intercambiar ETH directamente por otros tokens ERC-20. El WETH es una representación del ether que cumple con el estándar de token fungible ERC-20 y se puede intercambiar con otros tokens ERC-20. 

- **Usar ETH en dapps**: Debido a que el ETH no es compatible con ERC-20, los desarrolladores tendrían que crear interfaces separadas (una para ETH y otra para tokens ERC-20) en las aplicaciones descentralizadas (dapps). Envolver el ETH elimina este obstáculo y permite a los desarrolladores manejar ETH y otros tokens dentro de la misma dapp. Muchas aplicaciones de finanzas descentralizadas utilizan este estándar y crean mercados para intercambiar estos tokens.

## Ether envuelto (WETH) vs. ether (ETH): ¿Cuál es la diferencia? {#weth-vs-eth-differences}


|            | **Ether (ETH)**                                                                                                                                                                                                                 | **Ether envuelto (WETH)**                                                                                                                                                                                                                                                                                    |
|------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Suministro | El [suministro de ETH](/eth/supply/) es gestionado por el protocolo [Ethereum](/). La [emisión](/roadmap/merge/issuance) de ETH es manejada por los validadores de Ethereum al procesar transacciones y crear bloques.                           | El WETH es un token ERC-20 cuyo suministro es gestionado por un contrato inteligente. El contrato emite nuevas unidades de WETH después de recibir depósitos de ETH de los usuarios, o se queman unidades de WETH cuando un usuario desea canjear WETH por ETH.                                                                                                                                        |
| Propiedad  | La propiedad es gestionada por el protocolo Ethereum a través del saldo de tu cuenta.  | La propiedad del WETH es gestionada por el contrato inteligente del token WETH, asegurado por el protocolo Ethereum.                                                                                                                                         |
| Gas        | El ether (ETH) es la unidad de pago aceptada para la computación en la red Ethereum. Las tarifas de gas se denominan en Gwei (una unidad de ether).                                                                                    | El pago de gas con tokens WETH no es compatible de forma nativa.                                                                                                                                                                                              |

## Preguntas frecuentes {#faq}
 
<ExpandableCard title="¿Pagas por envolver/desenvolver ETH?" eventCategory="/wrapped-eth" eventName="clicked Do you pay to wrap/unwrap ETH?">

Pagas tarifas de gas para envolver o desenvolver ETH utilizando el contrato de WETH.

</ExpandableCard>

<ExpandableCard title="¿Es seguro el WETH?" eventCategory="/wrapped-eth" eventName="clicked Is WETH safe?">

El WETH generalmente se considera seguro porque se basa en un contrato inteligente simple y probado en batalla. El contrato de WETH también ha pasado por una verificación formal, que es el estándar de seguridad más alto para los contratos inteligentes en Ethereum.

</ExpandableCard>

<ExpandableCard title="¿Por qué veo diferentes tokens WETH?" eventCategory="/wrapped-eth" eventName="clicked Why am I seeing different WETH tokens?">

Además de la [implementación canónica de WETH](https://etherscan.io/token/0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2) descrita en esta página, existen otras variantes en la práctica. Estas pueden ser tokens personalizados creados por desarrolladores de aplicaciones o versiones emitidas en otras cadenas de bloques, y pueden comportarse de manera diferente o tener diferentes propiedades de seguridad. **Siempre verifica dos veces la información del token para saber con qué implementación de WETH estás interactuando.**

</ExpandableCard>

<ExpandableCard title="¿Cuáles son los contratos de WETH en otras redes?" eventCategory="/wrapped-eth" eventName="clicked What are the WETH contracts on other networks?">

- [Red principal de Ethereum](https://etherscan.io/token/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2)
- [Arbitrum](https://arbiscan.io/token/0x82af49447d8a07e3bd95bd0d56f35241523fbab1)
- [Optimism](https://optimistic.etherscan.io/token/0x4200000000000000000000000000000000000006)

</ExpandableCard>

## Más información {#further-reading}

- [¿Qué es el WETH?](https://weth.tkn.eth.limo/)
- [Información del token WETH en Blockscout](https://eth.blockscout.com/token/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2)
- [Verificación formal del WETH](https://zellic.io/blog/formal-verification-weth)