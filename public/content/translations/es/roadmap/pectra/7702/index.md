---
title: Directrices de Pectra 7702
description: Aprenda más sobre 7702 en la publicación de Pectra
lang: es
---

# Pectra 7702

## Resumen {#abstract}

EIP 7702 define un mecanismo para añadir código a una cuenta con titularidad externa (EOA en inglés). Esta propuesta permite que las EOA, las cuentas de Ethereum antiguas, reciban mejoras de funcionalidad de corto plazo, aumentando la usabilidad de las aplicaciones. Esto se hace poniendo un puntero a código ya desplegado usando un nuevo tipo de transacción: 4.

Este nuevo tipo de transacción introduce una lista de autorización. Cada tupla de autorización en la lista se define como

```
[ chain_id, address, nonce, y_parity, r, s ]
```

**address** es la delegación (código ya desplegado que será usado por la EOA)
**chain_id** fija la autorización a una cadena específica (o 0 para todas las cadenas)
**nonce** fija la autorización a un nonce específico de cuenta
(**y_parity, r, s**) es la firma de la tupla de autorización, definida como keccak(0x05 || rlp ([chain_id ,address, nonce])) por la clave privada de la EOA a la que se aplica la autorización (también llamada autoridad)

Una delegación puede ser restablecida delegando a la dirección nula.

La clave privada de la EOA conserva el control total de la cuenta después de la delegación. Por ejemplo, delegar a un Safe no hace que la cuenta sea una multifirma porque todavía hay una única clave que puede saltarse cualquier política de firmado. De aquí en adelante, los desarrolladores deberían diseñar asumiendo que cualquier participante en el sistema podría ser un contrato inteligente. Para los desarrolladores de contratos inteligentes, ya no es seguro asumir que `tx.origin` se refiere a una EOA.

## Buenas prácticas {#best-practices}

**Abstracción de cuenta**: un contrato de delegación debería alinearse con los más amplios estándares de abstracción de cuentas de Ethereum para maximizar la compatibilidad. Concretamente, debería idealmente cumplir o ser compatible con ERC-4337.

\*\*Diseño sin necesidad de permisos resistente a la censura: Ethereum valora la participación sin necesidad de permisos. Un contrato de delegación NO DEBE codificar directamente o confiar en ningún solo comunicador o servicio «de confianza». Esto podría inutilizar la cuenta si el retransmisor deja de estar en línea. Funcionalidades como agrupaciones (por ejemplo, approve+transferFrom) pueden usarse por la EOA en sí sin un relayer. Los desarrolladores de aplicaciones que quieren usar funcionalidades avanzadas que permite 7702 (abstracción de gas, retiradas que preservan la privacidad) necesitarán un retransmisor. Aunque existen diferentes arquitecturas de retransmisores, nuestra recomendación es usar [agrupadores 4337](https://www.erc4337.io/bundlers) que apunten al menos a la versión de [punto de entrada 0.8](https://github.com/eth-infinitism/account-abstraction/releases/tag/v0.8.0) porque:

- Proporcionan interfaces estandarizadas para la retransmisión
- Incluyen sistemas de tesorería integrados
- Garantizan compatibilidad con versiones futuras
- Soportan la resistencia a la censura mediante una [zona de espera pública](https://notes.ethereum.org/@yoav/unified-erc-4337-mempool)
- Pueden requerir que la función init solo sea llamada desde [EntryPoint](https://github.com/eth-infinitism/account-abstraction/releases/tag/v0.8.0)

En otras palabras, cualquiera debería poder actuar como el relayer/patrocinador siempre que proporcione la firma válida requerida o la UserOperation de la cuenta. Esto garantiza la resistencia a la censura: si no se requiere una infraestructura personalizada, las transacciones de un usuario no pueden ser bloqueadas arbitrariamente por un relay de control de acceso. Por ejemplo, el [MetaMask’s Delegation Toolkit](https://github.com/MetaMask/delegation-framework/releases/tag/v1.3.0) funciona explícitamente con cualquier agrupador o pagador en cualquier cadena, en vez de requerir un servidor específico de MetaMask.

**Integración de dApps mediante interfaces de billeteras**:

Dado que las carteras incluirán en la lista blanca contratos de delegación específicos para EIP-7702, dApps no debería esperar solicitar directamente las autorizaciones 7702. En su lugar, la integración debe ocurrir a través de interfaces de billetera estandarizadas:

- **ERC-5792 (`wallet_sendCalls`)**: Permite que dApps solicite carteras para ejecutar llamadas por lotes, facilitando funcionalidades como el procesamiento por lotes de transacciones y la abstracción de gas.

- **ERC-6900**: Permite a dApps aprovechar las capacidades de cuentas inteligentes modulares, como las claves de sesión y la recuperación de cuentas, a través de módulos administrados por billetera.

Al utilizar estas interfaces, dApps pueden acceder a las funcionalidades de la cuenta inteligente proporcionadas por EIP-7702 sin gestionar directamente las delegaciones, lo que garantiza la compatibilidad y la seguridad en diferentes implementaciones de cartera.

> Nota: No hay un método estandarizado para que dApps solicite directamente las firmas de autorización 7702. Las DApps deben confiar en interfaces de billetera específicas como ERC-6900 para aprovechar las características de EIP-7702.

Para más información:

- [Especificación ERC-5792](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-5792.md)
- [Especificación ERC-6900](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-6900.md)

**Evitando el bloqueo del proveedor**: En línea con lo anterior, una buena implementación es neutral con respecto al proveedor e interoperable. Esto a menudo significa adherirse a los estándares emergentes para las cuentas inteligentes. Por ejemplo, [Alchemy's Modular Account](https://github.com/alchemyplatform/modular-account) utiliza el estándar ERC-6900 para cuentas inteligentes modulares y está diseñado con el "uso interoperable sin permiso" en mente.

**Preservación de la privacidad**: Si bien la privacidad en cadena es limitada, un contrato de delegación debe esforzarse por minimizar la exposición y la capacidad de enlace de los datos. Esto se puede lograr al admitir características como los pagos de gas en tokens ERC-20 (por lo que los usuarios no necesitan mantener un saldo público de ETH, lo que mejora la privacidad y la experiencia de usuario) y claves de sesión única (que reducen la dependencia de una sola clave a largo plazo). Por ejemplo, EIP-7702 permite pagar gas en tokens a través de transacciones patrocinadas, y una buena implementación facilitará la integración de dichos pagadores sin filtrar más información de la necesaria. Además, la delegación fuera de la cadena de ciertas aprobaciones (utilizando firmas verificadas en cadena) significa menos transacciones en cadena con la clave principal del usuario, lo que ayuda a la privacidad. Las cuentas que requieren el uso de un transmisor obligan a los usuarios a revelar sus direcciones IP. PublicMempools mejora esto, cuando una transacción/UserOp se propaga a través del mempool, no se puede decir si se originó de la IP que la envió, o simplemente se transmitió a través de ella a través del protocolo p2p.

**Extensibilidad y seguridad modular**: Las implementaciones de cuentas deben ser extensibles para que puedan evolucionar con nuevas características y mejoras de seguridad. La actualizabilidad es inherentemente posible con EIP-7702 (ya que un EOA siempre puede delegar a un nuevo contrato en el futuro para actualizar su lógica). Más allá de la capacidad de actualización, un buen diseño permite la modularidad, por ejemplo, módulos enchufables para diferentes esquemas de firma o políticas de gasto, sin necesidad de volver a desplegarse por completo. El kit de cuentas de Alchemy es un excelente ejemplo, ya que permite a los desarrolladores instalar módulos de validación (para diferentes tipos de firma como ECDSA, BLS, etc.) y módulos de ejecución para lógica personalizada. Para lograr una mayor flexibilidad y seguridad en las cuentas habilitadas para EIP-7702, se anima a los desarrolladores a delegar a un contrato de proxy en lugar de directamente a una implementación específica. Este enfoque permite actualizaciones y modularidad sin problemas sin requerir autorizaciones EIP-7702 adicionales para cada cambio.

Beneficios del patrón de proxy:

- **Actualización**: Actualice la lógica del contrato apuntando el proxy a un nuevo contrato de implementación.

- **Lógica de inicialización personalizada**: Incorpore funciones de inicialización dentro del proxy para configurar las variables de estado necesarias de forma segura.

Por ejemplo, el [SafeEIP7702Proxy](https://docs.safe.global/advanced/eip-7702/7702-safe) demuestra cómo se puede utilizar un proxy para inicializar y administrar de forma segura las delegaciones en cuentas compatibles con EIP-7702.

Contras del patrón proxy:

- **Confianza en actores externos**: Tienes que confiar en un equipo externo para no actualizar a un contrato inseguro.

## Consideraciones de seguridad {#security-considerations}

**Reentrancy guard**: Con la introducción de la delegación EIP-7702, la cuenta de un usuario puede cambiar dinámicamente entre una cuenta de propiedad externa (EOA) y un contrato inteligente (SC). Esta flexibilidad permite que la cuenta inicie transacciones y sea el objetivo de las llamadas. Como resultado, los escenarios en los que una cuenta se llama a sí misma y hace llamadas externas tendrán `msg.sender` igual a `tx.origin`, lo que socava ciertas suposiciones de seguridad que anteriormente se basaban en que `tx.origin` siempre era un EOA.

Para los desarrolladores de contratos inteligentes, ya no es seguro asumir que `tx.origin` se refiere a una EOA. Del mismo modo, usar `msg.sender == tx.origin` como protección contra ataques de reentrada ya no es una estrategia confiable.

De aquí en adelante, los desarrolladores deberían diseñar asumiendo que cualquier participante en el sistema podría ser un contrato inteligente. Alternativamente, podrían implementar una protección de reentrada explícita utilizando protectores de reentrada con un patrón de modificador "nonReentrant". Recomendamos seguir un modificador auditado, por ejemplo, [Open Zeppelin's Reentrancy Guard](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/utils/ReentrancyGuard.sol). También podrían usar una [variable de almacenamiento transitoria](https://docs.soliditylang.org/en/latest/internals/layout_in_storage.html).

**Consideraciones de seguridad de inicialización**

La aplicación de los contratos de delegación EIP-7702 introduce desafíos de seguridad específicos, en particular en relación con el proceso de inicialización. Surge una vulnerabilidad crítica cuando la función de inicialización (`init`) se acopla atómicamente con el proceso de delegación. En tales casos, un favorito podría interceptar la firma de la delegación y ejecutar la función `init` con parámetros alterados, potencialmente tomando el control de la cuenta.

Este riesgo es especialmente pertinente cuando se intenta utilizar las implementaciones de la Cuenta de Contrato Inteligente (SCA) existentes con EIP-7702 sin modificar sus mecanismos de inicialización.

**Soluciones para mitigar las vulnerabilidades de inicialización**

- Implementar `initWithSig`
  Reemplace la función estándar `init` con una función `initWithSig` que requiere que el usuario firme los parámetros de inicialización. Este enfoque garantiza que la inicialización solo pueda proceder con el consentimiento explícito del usuario, mitigando así los riesgos de inicialización no autorizada.

- Utilice el punto de entrada de ERC-4337
  Requiere que la función de inicialización se llame exclusivamente desde el contrato ERC-4337 EntryPoint. Este método aprovecha el marco estandarizado de validación y ejecución proporcionado por ERC-4337, añadiendo una capa adicional de seguridad al proceso de inicialización.  
  _(Ver: [Safe Docs](https://docs.safe.global/advanced/eip-7702/7702-safe))_

Al adoptar estas soluciones, los desarrolladores pueden mejorar la seguridad de los contratos de delegación EIP-7702, protegiéndolos contra posibles ataques de adelantarse durante la fase de inicialización.

**Colisiones de almacenamiento** El código de delegación no borra el almacenamiento existente. Al migrar de un contrato de delegación a otro, los datos residuales del contrato anterior permanecen. Si el nuevo contrato utiliza las mismas ranuras de almacenamiento pero las interpreta de manera diferente, puede provocar un comportamiento no deseado. Por instancia, si la delegación inicial fue hacia un contrato donde cuya ranura de almacenamiento representa un `bool`, y la delegación posterior es hacia un contrato donde la misma ranura representa un `uint`, la falta de coincidencia puede llevar a obtener un resultado impredecible.

\*\* Riesgos de phishing \*\* Con la implementación de la delegación EIP-7702, los activos en la cuenta de un usuario pueden estar completamente controlados por contratos inteligentes. Si un usuario delega sin saberlo su cuenta a un contrato malicioso, un atacante podría fácilmente obtener el control y robar fondos. Cuando se usa `chain_id=0`, la delegación se aplica a todos los identificadores de cadena. Solo delegar a un contrato inmutable (nunca delegar a un proxy), y solo a contratos que se implementaron usando CREATE2 (con código de init estándar - sin contratos metamórficos) para que el desplegador no pueda implementar algo diferente en la misma dirección en otro lugar. De lo contrario, tu delegación pone en riesgo tu cuenta en todas las demás cadenas EVM.

Cuando los usuarios realizan firmas delegadas, el contrato objetivo que recibe la delegación debe mostrarse de forma clara y destacada para ayudar a mitigar los riesgos de phishing.

**Superficie y seguridad de confianza mínimas**: Si bien ofrece flexibilidad, un contrato de delegación debe mantener su lógica central mínima y auditable. El contrato es efectivamente una extensión de la EOA del usuario, por lo que cualquier defecto puede ser catastrófico. Las implementaciones deben seguir las mejores prácticas de la comunidad de seguridad de contratos inteligentes. Por ejemplo, las funciones del constructor o inicializador deben asegurarse cuidadosamente, como lo destacan la alquimia, si usa un patrón proxy bajo 7702, un inicializador sin protección podría permitir que un atacante se haga cargo de la cuenta. Los equipos deben tratar de mantener el código en cadena simple: el contrato 7702 de Ambire tiene solo ~200 líneas de Solidity, minimizando deliberadamente la complejidad para reducir los errores. Es necesario encontrar un equilibrio entre una lógica rica en funciones y la simplicidad que facilita la auditoría.

### Implementaciones conocidas {#known-implementations}

Debido a la naturaleza de EIP 7702, se recomienda que las carteras tengan cuidado al ayudar a los usuarios a delegar a un contrato de terceros. A continuación se enumera una colección de implementaciones conocidas que han sido auditadas:

| Dirección de contrato                      | Fuente                                                                                                                                                                    | Auditorías                                                                                                                                                        |
| ------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 0x000000009B1D0aF20D8C6d0A44e162d11F9b8f00 | [Uniswap/calibur](https://github.com/Uniswap/calibur)                                                                                                                     | [auditorías](https://github.com/Uniswap/calibur/tree/main/audits)                                                                                                 |
| 0x69007702764179f14F51cdce752f4f775d74E139 | [alchemyplatform/modular-account](https://github.com/alchemyplatform/modular-account)                                                                                     | [auditorías](https://github.com/alchemyplatform/modular-account/tree/develop/audits)                                                                              |
| 0x5A7FC11397E9a8AD41BF10bf13F22B0a63f96f6d | [AmbireTech/ambire-common](https://github.com/AmbireTech/ambire-common/blob/feature/eip-7702/contracts/AmbireAccount7702.sol)                                             | [auditorías](https://github.com/AmbireTech/ambire-common/tree/feature/eip-7702/audits)                                                                            |
| 0x63c0c19a282a1b52b07dd5a65b58948a07dae32b | [MetaMask/delegation-framework](https://github.com/MetaMask/delegation-framework)                                                                                         | [auditorías](https://github.com/MetaMask/delegation-framework/tree/main/audits)                                                                                   |
| 0x4Cd241E8d1510e30b2076397afc7508Ae59C66c9 | [Equipo de abstracción de cuentas de la Ethereum Foundation](https://github.com/eth-infinitism/account-abstraction/blob/develop/contracts/accounts/Simple7702Account.sol) | [auditorías](https://github.com/eth-infinitism/account-abstraction/blob/develop/audits/SpearBit%20Account%20Abstraction%20Security%20Review%20-%20Mar%202025.pdf) |
| 0x17c11FDdADac2b341F2455aFe988fec4c3ba26e3 | [Luganodes/Pectra-Batch-Contract](https://github.com/Luganodes/Pectra-Batch-Contract)                                                                                     | [auditorías](https://certificate.quantstamp.com/full/luganodes-pectra-batch-contract/23f0765f-969a-4798-9edd-188d276c4a2b/index.html)                             |

## Directrices de cartera de hardware {#hardware-wallet-guidelines}

Las carteras de hardware no deben exponer la delegación arbitraria. El consenso en el espacio de la cartera de hardware es utilizar una lista de contratos de delegado de confianza. Sugerimos permitir las implementaciones conocidas enumeradas anteriormente y considerar otras caso por caso. Como la delegación de su EOA a un contrato le da control sobre todos los activos, las carteras de hardware deben ser cautelosas con la forma en que implementan 7702.

### Escenarios de integración para aplicaciones complementarias {#integration-scenarios-for-companion-apps}

#### Flojo {#lazy}

Como el EOA todavía funciona como de costumbre, no hay nada que hacer.

NOTA: Algunos activos podrían ser rechazados automáticamente por el código de delegación, como ERC 1155 NFT, y el soporte debe ser consciente de ello.

#### Consciente {#aware}

Notifique al usuario que hay una delegación para la EOA comprobando su código y, opcionalmente, ofrezca eliminar la delegación.

#### Delegación estándar {#common-delegation}

El proveedor de hardware enumera los contratos de delegación conocidos e implementa su soporte en el complemento de software. Se recomienda elegir un contrato con soporte completo de ERC 4337.

Los EOA delegados a uno diferente se manejarán como EOA estándar.

#### Delegación personalizada {#custom-delegation}

El proveedor de hardware implementa su propio contrato de delegación y lo agrega a las listas, implementa su soporte en el compañero de software. Se recomienda construir un contrato con soporte completo de ERC 4337.

Los EOA delegados a uno diferente se manejarán como EOA estándar.
