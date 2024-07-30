---
title: Lista de verificación de integración de tokens
description: Una lista de verificación de cosas a considerar cuando interactuamos con tokens
author: "Trailofbits"
lang: es
tags:
  - "solidity"
  - "contratos inteligentes"
  - "seguridad"
  - "tókenes"
skill: intermediate
published: 2020-08-13
source: Desarrollar contratos seguros
sourceUrl: https://github.com/crytic/building-secure-contracts/blob/master/development-guidelines/token_integration.md
---

Siga esta lista de verificación al interactuar con tokens arbitrarios. Asegúrese de comprender los riesgos asociados con cada elemento y de justificar cualquier excepción a estas reglas.

Por conveniencia, todas las [utilidades](https://github.com/crytic/slither#tools) de Slither pueden correr directamente en una dirección de token, como:

[Uso del tutorial de Slither](/developers/tutorials/how-to-use-slither-to-find-smart-contract-bugs/)

```bash
slither-check-erc 0xdac17f958d2ee523a2206206994597c13d831ec7 TetherToken
```

Para seguir esta lista de verificación, querrá tener esta salida de Slither para el token:

```bash
- slither-check-erc [target] [contractName] [optional: --erc ERC_NUMBER]
- slither [target] --print human-summary
- slither [target] --print contract-summary
- slither-prop . --contract ContractName # requires configuration, and use of Echidna and Manticore
```

## Consideraciones generales {#general-considerations}

- **El contrato tiene una revisión de seguridad.** Evite interactuar con contratos que carezcan de revisión de seguridad. Verifique el alcance del asesoramiento (también conocido como "nivel de esfuerzo"), la reputación de la firma de seguridad, y el número y la gravedad de los hallazgos.
- **Ha contactado a los desarrolladores.** Tal vez quiera alertar al equipo de un incidente. Busque los contactos apropiados en [blockchain-security-contacts](https://github.com/crytic/blockchain-security-contacts).
- **Tienen una lista de correo de seguridad para anuncios importantes.** El equipo debe asesorar a los usuarios (como usted) cuando se encuentren cuestiones críticas o cuando haya una actualización.

## Conformidad con ERC {#erc-conformity}

Slither incluye una utilidad, [slither-check-erc](https://github.com/crytic/slither/wiki/ERC-Conformance), que verifica la conformidad de un token con varios estándares ERC. Utilice slither-check-erc para revisar eso:

- **Transfer y transferFrom devuelven un booleano.** Varios tokens no devuelven un booleano en estas funciones. Como resultado, sus llamadas en el contrato pueden fallar.
- **Las funciones de nombre, decimales y símbolos aparecen si se utilizan.** Estas funciones son opcionales en el estándar ERC20 y podrían no estar presentes.
- **Los decimales dan como resultado un uint8.** Varios tokens devuelven incorrectamente un uint256. Si este es el caso, asegúrese de que el valor devuelto sea inferior a 255.
- **El token mitiga la [condición de carrera ERC20](https://github.com/ethereum/EIPs/issues/20#issuecomment-263524729) conocida.** El estándar ERC20 tiene una condición de carrera ERC20 conocida que debe mitigarse para evitar que los atacantes roben tokens.
- **El token no es un token ERC777 y no tiene ninguna llamada de función externa en transfer y transferFrom.** Las llamadas externas en las funciones de transferencia (transfer) pueden resultar en reentradas.

Slither incluye una utilidad, [slither-prop](https://github.com/crytic/slither/wiki/Property-generation), que genera pruebas unitarias y propiedades de seguridad que pueden descubrir muchas fallas comunes de ERC. Use slither-prop para revisar que:

- **El contrato ha superado todas las pruebas unitarias y las propiedades de seguridad de slither-prop.** Ejecute las pruebas unitarias generadas y después revise las propiedades con [Echidna](https://github.com/crytic/echidna) y [Manticore](https://manticore.readthedocs.io/en/latest/verifier.html).

Por último, hay ciertas características que son difíciles de identificar automáticamente. Revise estas condiciones a mano:

- **Transfer y transferFrom no deben cobrar una tarifa.** Los token deflacionarios pueden resultar en un comportamiento inesperado.
- **Se tiene en cuenta el interés potencial obtenido con el token.** Algunos tokens distribuyen interés a los portadores del token. Este interés podría quedar atrapado en el contrato si no se tiene en cuenta.

## Composición del contrato {#contract-composition}

- **El contrato evita complejidad innecesaria.** El token debe ser un contrato simple; un token con código complejo requiere un estándar más alto de revisión. Use [human-summary printer](https://github.com/crytic/slither/wiki/Printer-documentation#human-summary) de Slither para identificar código complejo.
- **El contrato utiliza SafeMath.** Los contratos que no utilicen SafeMath requieren un estándar más alto de revisión. Inspeccione el contrato a mano para el uso de SafeMath.
- **El contrato solo tiene pocas funciones no relacionadas con tokens.** Las funciones no relacionadas con tokens aumentan la posibilidad de algún problema en el contrato. Use [contract-summary printer](https://github.com/crytic/slither/wiki/Printer-documentation#contract-summary) de Slither para examinar más ampliamente el código usado en el contrato.
- **El token posee solo una dirección.** Los tokens con puntos de entrada múltiples para actualizaciones de saldo pueden romper la contaduría interna basada en la dirección (ej: `balances[token_address][msg.sender]` podría no reflejar el saldo real).

## Privilegios de propietario {#owner-privileges}

- **El token no se puede actualizar.** Los contratos actualizables pueden cambiar sus reglas con el tiempo. Use [human-summary printer](https://github.com/crytic/slither/wiki/Printer-documentation#contract-summary) de Slither para determinar si el contrato es actualizable.
- **El propietario tiene capacidades limitadas de minteo.** Propietarios con intenciones maliciosas o comprometidos pueden abusar de las capacidades de minteo. Use [human-summary printer](https://github.com/crytic/slither/wiki/Printer-documentation#contract-summary) de Slither para revisar las capacidades de minteo y considere revisar manualmente el código.
- **El token no puede ser pausado.** Los propietarios con intenciones maliciosas o comprometidos pueden atrapar contratos que usen tokens pausables. Identifique el código pausable a mano.
- **El propietario no puede poner en la lista negra el contrato.** Los propietarios maliciosos o comprometidos pueden atrapar contratos que usen tokens con una la lista negra. Identifique características de lista negra a mano.
- **El equipo detrás del token es reconocido y puede ser responsabilizado por abuso.** Los contratos con equipos de desarrollo anónimos, o que residan en refugios legales, deben requerir un estándar más alto de revisión.

## Escasez de tokens {#token-scarcity}

Las revisiones de problemas de escasez de tokens requieren una revisión manual. Compruebe estas condiciones:

- **Ningún usuario posee la mayor parte del suministro.** Si unos pocos usuarios poseen la mayoría de los tokens, pueden influir en las operaciones en función de la repartición del token.
- **El suministro total es suficiente.** Los tokens con un suministro total bajo pueden ser manipuladas fácilmente.
- **Los tokens se encuentran en más que algunos pocos exchanges.** Si todos los tokens están en un solo exchange, la vulneración del exchange puede comprometer el contrato asociado al token.
- **Los usuarios comprenden los riesgos asociados a fondos grandes o préstamos flash.** Los contratos que dependen del saldo de token deben tomar en consideración a atacantes con grandes fondos o ataques a través de préstamos flash.
- **El token no permite minteos flash**. Los minteos flash pueden provocar oscilaciones sustanciales en el saldo y el suministro total, que requieren un control estricto y exhaustivo del desbordamiento en el funcionamiento del token.
