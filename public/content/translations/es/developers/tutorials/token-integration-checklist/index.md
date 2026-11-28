---
title: "Lista de verificación para la integración de tokens"
description: "Una lista de verificación de aspectos a considerar al interactuar con tokens"
author: "Trailofbits"
lang: es
tags: ["Solidity", "contratos inteligentes", "seguridad", "tokens"]
skill: intermediate
breadcrumb: "Integración de tokens"
published: 2020-08-13
source: Building secure contracts
sourceUrl: https://github.com/crytic/building-secure-contracts/blob/master/development-guidelines/token_integration.md
---

Siga esta lista de verificación al interactuar con tokens arbitrarios. Asegúrese de comprender los riesgos asociados con cada elemento y justifique cualquier excepción a estas reglas.

Para mayor comodidad, todas las [utilidades](https://github.com/crytic/slither#tools) de Slither se pueden ejecutar directamente en una dirección de token, como por ejemplo:

[Tutorial de uso de Slither](/developers/tutorials/how-to-use-slither-to-find-smart-contract-bugs/)

Obtener el código fuente verificado de Etherscan requiere una [clave de API de Etherscan](https://docs.etherscan.io/set-up-your-api-key) (una clave gratuita funciona). Pásela con `--etherscan-apikey`, o establezca la variable de entorno `ETHERSCAN_API_KEY`, que Slither también lee:

```sh
export ETHERSCAN_API_KEY=<your-etherscan-api-key>
slither-check-erc 0xdac17f958d2ee523a2206206994597c13d831ec7 TetherToken --erc erc20 --etherscan-apikey $ETHERSCAN_API_KEY
slither-check-erc 0x06012c8cf97BEaD5deAe237070F9587f8E7A266d KittyCore --erc erc721 --etherscan-apikey $ETHERSCAN_API_KEY
```

Sin una clave, el comando falla con un error `Invalid etherscan API Key`.

Para seguir esta lista de verificación, querrá tener esta salida de Slither para el token:

```sh
slither-check-erc [target] [contractName] [optional: --erc ERC_NUMBER]
slither [target] --print human-summary
slither [target] --print contract-summary
slither-prop . --contract ContractName # require (Se mantiene en inglés por ser una palabra reservada del lenguaje Solidity.) configuración, y el uso de Echidna (Proper noun referring to a specific development tool. Never translated.)
```

## Consideraciones generales {#general-considerations}

- **El contrato tiene una revisión de seguridad.** Evite interactuar con contratos que carezcan de una revisión de seguridad. Compruebe la duración de la evaluación (también conocida como «nivel de esfuerzo»), la reputación de la empresa de seguridad y el número y la gravedad de los hallazgos.
- **Se ha puesto en contacto con los desarrolladores.** Es posible que deba alertar a su equipo sobre un incidente. Busque los contactos adecuados en [blockchain-security-contacts](https://github.com/crytic/blockchain-security-contacts).
- **Tienen una lista de correo de seguridad para anuncios críticos.** Su equipo debe avisar a los usuarios (¡como usted!) cuando se encuentren problemas críticos o cuando se realicen actualizaciones.

## Conformidad con ERC {#erc-conformity}

Slither incluye una utilidad, [slither-check-erc](https://github.com/crytic/slither/wiki/ERC-Conformance), que revisa la conformidad de un token con muchos estándares ERC relacionados. Utilice slither-check-erc para revisar que:

- **transfer y transferFrom devuelven un booleano.** Varios tokens no devuelven un booleano en estas funciones. Como resultado, sus llamadas en el contrato podrían fallar.
- **Las funciones name, decimals y symbol están presentes si se utilizan.** Estas funciones son opcionales en el estándar ERC-20 y podrían no estar presentes.
- **decimals devuelve un uint8.** Varios tokens devuelven incorrectamente un uint256. Si este es el caso, asegúrese de que el valor devuelto sea inferior a 255.
- **El token mitiga la conocida [condición de carrera de ERC-20](https://github.com/ethereum/EIPs/issues/20#issuecomment-263524729).** El estándar ERC-20 tiene una condición de carrera conocida que debe mitigarse para evitar que los atacantes roben tokens.
- **El token no es un token ERC-777 y no tiene llamadas a funciones externas en transfer y transferFrom.** Las llamadas externas en las funciones de transferencia pueden provocar reentradas.

Slither incluye una utilidad, [slither-prop](https://github.com/crytic/slither/wiki/Property-generation), que genera pruebas unitarias y propiedades de seguridad que pueden descubrir muchos fallos comunes de ERC. Utilice slither-prop para revisar que:

- **El contrato pasa todas las pruebas unitarias y propiedades de seguridad de slither-prop.** Ejecute las pruebas unitarias generadas y, a continuación, compruebe las propiedades con [Echidna](https://github.com/crytic/echidna).

Por último, hay ciertas características que son difíciles de identificar automáticamente. Revise estas condiciones manualmente:

- **transfer y transferFrom no deben cobrar una tarifa.** Los tokens deflacionarios pueden provocar un comportamiento inesperado.
- **Se tiene en cuenta el posible interés ganado por el token.** Algunos tokens distribuyen intereses a los titulares de tokens. Este interés podría quedar atrapado en el contrato si no se tiene en cuenta.

## Composición del contrato {#contract-composition}

- **El contrato evita la complejidad innecesaria.** El token debe ser un contrato simple; un token con código complejo requiere un estándar de revisión más alto. Utilice la [herramienta de impresión human-summary](https://github.com/crytic/slither/wiki/Printer-documentation#human-summary) de Slither para identificar código complejo.
- **El contrato utiliza aritmética comprobada.** Solidity 0.8 y versiones posteriores revierten en caso de desbordamiento por defecto; los contratos más antiguos necesitan SafeMath para la misma protección. Los contratos compilados con versiones anteriores sin SafeMath, o que utilizan bloques `unchecked`, requieren un estándar de revisión más alto. Inspeccione la aritmética manualmente, especialmente dentro de los bloques `unchecked` y el ensamblador en línea (inline assembly).
- **El contrato tiene solo unas pocas funciones no relacionadas con el token.** Las funciones no relacionadas con el token aumentan la probabilidad de un problema en el contrato. Utilice la [herramienta de impresión contract-summary](https://github.com/crytic/slither/wiki/Printer-documentation#contract-summary) de Slither para revisar de forma general el código utilizado en el contrato.
- **El token solo tiene una dirección.** Los tokens con múltiples puntos de entrada para las actualizaciones de saldo pueden romper la contabilidad interna basada en la dirección (por ejemplo, `balances[token_address][msg.sender]` podría no reflejar el saldo real).

## Privilegios del propietario {#owner-privileges}

- **El token no es actualizable.** Los contratos actualizables pueden cambiar sus reglas con el tiempo. Utilice la [herramienta de impresión human-summary](https://github.com/crytic/slither/wiki/Printer-documentation#human-summary) de Slither para determinar si el contrato es actualizable.
- **El propietario tiene capacidades de acuñación limitadas.** Los propietarios malintencionados o comprometidos pueden abusar de las capacidades de acuñación. Utilice la [herramienta de impresión human-summary](https://github.com/crytic/slither/wiki/Printer-documentation#human-summary) de Slither para revisar las capacidades de acuñación y considere la posibilidad de revisar el código manualmente.
- **El token no se puede pausar.** Los propietarios malintencionados o comprometidos pueden atrapar contratos que dependen de tokens pausables. Identifique el código pausable manualmente.
- **El propietario no puede incluir el contrato en una lista negra.** Los propietarios malintencionados o comprometidos pueden atrapar contratos que dependen de tokens con una lista negra. Identifique las funciones de lista negra manualmente.
- **El equipo detrás del token es conocido y se le puede hacer responsable de los abusos.** Los contratos con equipos de desarrollo anónimos o que residen en paraísos legales deberían requerir un estándar de revisión más alto.

## Escasez de tokens {#token-scarcity}

La revisión de problemas de escasez de tokens requiere una revisión manual. Compruebe estas condiciones:

- **Ningún usuario posee la mayor parte del suministro.** Si unos pocos usuarios poseen la mayoría de los tokens, pueden influir en las operaciones en función de la repartición del token.
- **El suministro total es suficiente.** Los tokens con un suministro total bajo pueden manipularse fácilmente.
- **Los tokens se encuentran en más de unos pocos intercambios.** Si todos los tokens están en un solo intercambio, si este se ve comprometido, puede comprometer el contrato que depende del token.
- **Los usuarios comprenden los riesgos asociados a los grandes fondos o a los préstamos relámpago (flash loans).** Los contratos que dependen del saldo de tokens deben tener muy en cuenta a los atacantes con grandes fondos o los ataques a través de préstamos relámpago.
- **El token no permite la acuñación relámpago (flash minting)**. La acuñación relámpago puede provocar oscilaciones sustanciales en el saldo y el suministro total, lo que requiere comprobaciones de desbordamiento estrictas y exhaustivas en el funcionamiento del token.
## Tokens ERC-20 no estándar conocidos {#known-non-standard-erc20-tokens}

Los protocolos que permiten la integración con tokens arbitrarios deben tener cuidado de manejar adecuadamente ciertos tokens ERC-20 no estándar bien conocidos. Consulte la [lista de tokens no estándar](https://secure-contracts.com/development-guidelines/non-standard-tokens.html) para conocer los tokens bien conocidos que conllevan riesgos adicionales.

## Tokens ERC-721 {#erc721-tokens}

### Comprobaciones de conformidad con ERC-721 {#erc721-conformity-checks}

El comportamiento de ciertos contratos puede diferir de la especificación ERC original. Revise las siguientes condiciones manualmente:

- **Las transferencias de tokens a la dirección 0x0 se revierten.** Algunos tokens permiten transferencias a 0x0 y consideran que los tokens enviados a esa dirección han sido quemados; sin embargo, el estándar ERC-721 requiere que dichas transferencias se reviertan.
- **Las funciones `safeTransferFrom` se implementan con la firma correcta.** Algunos contratos de tokens no implementan estas funciones. La transferencia de NFT a uno de esos contratos puede resultar en una pérdida de activos.
- **Las funciones `name`, `decimals` y `symbol` están presentes si se utilizan.** Estas funciones son opcionales en el estándar ERC-721 y pueden no estar presentes.
- **Si se utiliza, `decimals` devuelve un `uint8(0)`.** Otros valores no son válidos.
- **Las funciones `name` y `symbol` pueden devolver una cadena vacía.** Este comportamiento está permitido por el estándar.
- **La función `ownerOf` se revierte si el `tokenId` no es válido o se refiere a un token que ya ha sido quemado.** La función no puede devolver 0x0. Este comportamiento es requerido por el estándar, pero puede que no siempre se implemente correctamente.
- **Una transferencia de un NFT borra sus aprobaciones.** Esto es requerido por el estándar.
- **El ID de token de un NFT no se puede cambiar durante su vida útil.** Esto es requerido por el estándar.

### Riesgos comunes del estándar ERC-721 {#common-risks-of-the-erc721-standard}

Mitigue los riesgos asociados con los contratos ERC-721 realizando una revisión manual de las siguientes condiciones:

- **Se tiene en cuenta la devolución de llamada (callback) `onERC721Received`.** Las llamadas externas en las funciones de transferencia pueden provocar reentradas, especialmente cuando la devolución de llamada no es explícita (por ejemplo, en llamadas [`safeMint`](https://www.paradigm.xyz/writing/the-dangers-of-surprising-code)).
- **Cuando se acuña un NFT, se transfiere de forma segura a un contrato inteligente.** Si existe una función de acuñación, debería comportarse de manera similar a `safeTransferFrom` y manejar la acuñación de nuevos tokens a un contrato inteligente de manera adecuada, evitando la pérdida de activos.
- **Quemar un token borra sus aprobaciones.** Si existe una función para quemar, debería borrar las aprobaciones anteriores del token.
