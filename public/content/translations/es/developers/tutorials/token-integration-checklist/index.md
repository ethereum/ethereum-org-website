---
title: "Lista de verificación de integración de tokens"
description: "Una lista de verificación de cosas a considerar al interactuar con tokens"
author: "Trailofbits"
lang: es
tags:
  [
    "Solidity",
    "contratos Inteligentes",
    "seguridades",
    "tókenes"
  ]
skill: intermediate
published: 2020-08-13
source: Building secure contracts
sourceUrl: https://github.com/crytic/building-secure-contracts/blob/master/development-guidelines/token_integration.md
---

Siga esta lista de verificación al interactuar con tokens arbitrarios. Asegúrese de comprender los riesgos asociados con cada elemento y de justificar cualquier excepción a estas reglas.

Para mayor comodidad, todas las [utilidades](https://github.com/crytic/slither#tools) de Slither se pueden ejecutar directamente en la dirección de un token, como:

[Tutorial de uso de Slither](/developers/tutorials/how-to-use-slither-to-find-smart-contract-bugs/)

```bash
slither-check-erc 0xdac17f958d2ee523a2206206994597c13d831ec7 TetherToken
```

Para seguir esta lista de verificación, necesitará tener esta salida de Slither para el token:

```bash
- slither-check-erc [target] [contractName] [opcional: --erc ERC_NUMBER]
- slither [target] --print human-summary
- slither [target] --print contract-summary
- slither-prop . --contract ContractName # requiere configuración y el uso de Echidna y Manticore
```

## Consideraciones generales {#general-considerations}

- **El contrato tiene una revisión de seguridad.** Evite interactuar con contratos que carezcan de una revisión de seguridad. Verifique la duración de la evaluación (también conocida como «nivel de esfuerzo»), la reputación de la empresa de seguridad, y el número y la gravedad de los hallazgos.
- **Ha contactado a los desarrolladores.** Es posible que deba alertar a su equipo sobre un incidente. Busque los contactos apropiados en [blockchain-security-contacts](https://github.com/crytic/blockchain-security-contacts).
- **Tienen una lista de correo de seguridad para anuncios importantes.** Su equipo debería avisar a los usuarios (¡como usted!) cuando se encuentren problemas críticos o cuando se produzcan actualizaciones.

## Conformidad con ERC {#erc-conformity}

Slither incluye una utilidad, [slither-check-erc](https://github.com/crytic/slither/wiki/ERC-Conformance), que revisa la conformidad de un token con muchos estándares ERC relacionados. Utilice slither-check-erc para revisar que:

- **Transfer y transferFrom devuelven un booleano.** Varios tokens no devuelven un booleano en estas funciones. Como resultado, sus llamadas en el contrato podrían fallar.
- **Las funciones de nombre, decimales y símbolo están presentes si se utilizan.** Estas funciones son opcionales en el estándar ERC-20 y podrían no estar presentes.
- **La función «Decimals» devuelve un uint8.** Varios tokens devuelven incorrectamente un uint256. Si este es el caso, asegúrese de que el valor devuelto sea inferior a 255.
- **El token mitiga la [condición de carrera de ERC-20](https://github.com/ethereum/EIPs/issues/20#issuecomment-263524729) conocida.** El estándar ERC-20 tiene una condición de carrera conocida que debe mitigarse para evitar que los atacantes roben tokens.
- **El token no es un token ERC-777 y no tiene llamadas a funciones externas en transfer y transferFrom.** Las llamadas externas en las funciones de transferencia pueden dar lugar a reentradas.

Slither incluye una utilidad, [slither-prop](https://github.com/crytic/slither/wiki/Property-generation), que genera pruebas unitarias y propiedades de seguridad que pueden descubrir muchos errores comunes de ERC. Utilice slither-prop para revisar que:

- **El contrato pasa todas las pruebas unitarias y las propiedades de seguridad de slither-prop.** Ejecute las pruebas unitarias generadas y, a continuación, compruebe las propiedades con [Echidna](https://github.com/crytic/echidna) y [Manticore](https://manticore.readthedocs.io/en/latest/verifier.html).

Por último, hay ciertas características que son difíciles de identificar automáticamente. Revise estas condiciones manualmente:

- **Las funciones transfer y transferFrom no deberían cobrar una comisión.** Los tokens deflacionarios pueden provocar un comportamiento inesperado.
- **Se tiene en cuenta el interés potencial obtenido del token.** Algunos tokens distribuyen intereses a los titulares de tokens. Este interés podría quedar atrapado en el contrato si no se tiene en cuenta.

## Composición del contrato {#contract-composition}

- **El contrato evita una complejidad innecesaria.** El token debe ser un contrato simple; un token con código complejo requiere un estándar de revisión más alto. Utilice la utilidad [human-summary printer](https://github.com/crytic/slither/wiki/Printer-documentation#human-summary) de Slither para identificar código complejo.
- **El contrato utiliza SafeMath.** Los contratos que no utilizan SafeMath requieren un estándar de revisión más alto. Inspeccione manualmente el contrato para comprobar el uso de SafeMath.
- **El contrato solo tiene unas pocas funciones no relacionadas con el token.** Las funciones no relacionadas con el token aumentan la probabilidad de que haya un problema en el contrato. Utilice la utilidad [contract-summary printer](https://github.com/crytic/slither/wiki/Printer-documentation#contract-summary) de Slither para revisar a grandes rasgos el código utilizado en el contrato.
- **El token solo tiene una dirección.** Los tokens con múltiples puntos de entrada para las actualizaciones de saldo pueden romper la contabilidad interna basada en la dirección (p. ej., `balances[token_address][msg.sender]` podría no reflejar el saldo real).

## Privilegios del propietario {#owner-privileges}

- **El token no es actualizable.** Los contratos actualizables pueden cambiar sus reglas con el tiempo. Utilice la utilidad [human-summary printer](https://github.com/crytic/slither/wiki/Printer-documentation#contract-summary) de Slither para determinar si el contrato es actualizable.
- **El propietario tiene capacidades de acuñación limitadas.** Los propietarios maliciosos o comprometidos pueden abusar de las capacidades de acuñación. Utilice la utilidad [human-summary printer](https://github.com/crytic/slither/wiki/Printer-documentation#contract-summary) de Slither para revisar las capacidades de acuñación y considere revisar manualmente el código.
- **El token no se puede pausar.** Los propietarios maliciosos o comprometidos pueden atrapar contratos que dependen de tokens pausables. Identifique el código pausable manualmente.
- **El propietario no puede incluir el contrato en la lista negra.** Los propietarios maliciosos o comprometidos pueden atrapar contratos que dependen de tokens con una lista negra. Identifique manualmente las funciones de inclusión en listas negras.
- **El equipo detrás del token es conocido y puede ser considerado responsable de cualquier abuso.** Los contratos con equipos de desarrollo anónimos, o que residen en paraísos legales, deberían requerir un estándar de revisión más alto.

## Escasez de tokens {#token-scarcity}

La revisión de los problemas de escasez de tokens requiere una revisión manual. Compruebe estas condiciones:

- **Ningún usuario posee la mayor parte del suministro.** Si unos pocos usuarios poseen la mayoría de los tokens, pueden influir en las operaciones en función de la repartición del token.
- **El suministro total es suficiente.** Los tokens con un suministro total bajo pueden ser manipulados fácilmente.
- **Los tokens se encuentran en más de unos pocos intercambios.** Si todos los tokens están en un solo intercambio, una vulneración del intercambio puede comprometer el contrato que depende del token.
- **Los usuarios comprenden los riesgos asociados a los grandes fondos o a los préstamos flash.** Los contratos que dependen del saldo del token deben tener muy en cuenta a los atacantes con grandes fondos o los ataques a través de préstamos flash.
- **El token no permite la acuñación flash.** La acuñación flash puede provocar oscilaciones sustanciales en el saldo y el suministro total, lo que requiere comprobaciones de desbordamiento estrictas y exhaustivas en el funcionamiento del token.
