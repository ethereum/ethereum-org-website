---
title: Pectra 7702
metaTitle: Guías de Pectra 7702
description: Obtén más información sobre 7702 en la actualización Pectra
lang: es
---

## Resumen {#abstract}

El EIP-7702 define un mecanismo para agregar código a una EOA (cuenta de propiedad externa). Esta propuesta permite que las EOA, las cuentas heredadas de Ethereum, reciban mejoras de funcionalidad a corto plazo, aumentando la usabilidad de las aplicaciones. Esto se hace estableciendo un puntero a un código de bytes ya desplegado utilizando un nuevo tipo de transacción: 4.

Este nuevo tipo de transacción introduce una lista de autorización. Cada tupla de autorización en la lista se define como

```
[ chain_id, address, nonce, y_parity, r, s ]
```

**address** es la delegación (código de bytes ya desplegado que será utilizado por la EOA)
**chain_id** bloquea la autorización a una cadena específica (o 0 para todas las cadenas)
**nonce** bloquea la autorización a un nonce de cuenta específico
(**y_parity, r, s**) es la firma de la tupla de autorización, definida como keccak(0x05 || rlp ([chain_id ,address, nonce])) por la clave privada de la EOA a la que se aplica la autorización (también llamada la autoridad)

Una delegación se puede restablecer delegando a la dirección nula.

La clave privada de la EOA retiene el control total sobre la cuenta después de la delegación. Por ejemplo, delegar a un Safe no convierte la cuenta en una multifirma porque todavía hay una única clave que puede eludir cualquier política de firma. En el futuro, los desarrolladores deben diseñar asumiendo que cualquier participante en el sistema podría ser un contrato inteligente. Para los desarrolladores de contratos inteligentes, ya no es seguro asumir que `tx.origin` se refiere a una EOA.

## Mejores prácticas {#best-practices}

**Abstracción de cuentas**: Un contrato de delegación debe alinearse con los estándares más amplios de abstracción de cuentas (AA) de Ethereum para maximizar la compatibilidad. En particular, idealmente debería cumplir o ser compatible con ERC-4337.

**Diseño sin permisos y resistente a la censura**: Ethereum valora la participación sin permisos. Un contrato de delegación NO DEBE codificar de forma rígida ni depender de un único retransmisor o servicio "de confianza". Esto bloquearía la cuenta si el retransmisor se desconecta. Las características como el procesamiento por lotes (por ejemplo, approve+transferFrom) pueden ser utilizadas por la propia EOA sin un retransmisor. Para los desarrolladores de aplicaciones que deseen utilizar funciones avanzadas habilitadas por el EIP-7702 (abstracción de gas, retiros que preservan la privacidad), necesitarán un retransmisor. Si bien existen diferentes arquitecturas de retransmisores, nuestra recomendación es utilizar [empaquetadores 4337](https://www.erc4337.io/bundlers) que apunten al menos al [punto de entrada 0.8](https://github.com/eth-infinitism/account-abstraction/releases/tag/v0.8.0) porque:

- Proporcionan interfaces estandarizadas para la retransmisión
- Incluyen sistemas de pagador integrados
- Garantizan la compatibilidad futura
- Pueden admitir la resistencia a la censura a través de una [mempool pública](https://notes.ethereum.org/@yoav/unified-erc-4337-mempool)
- Pueden requerir que la función de inicialización solo se llame desde [EntryPoint](https://github.com/eth-infinitism/account-abstraction/releases/tag/v0.8.0)

En otras palabras, cualquiera debería poder actuar como patrocinador/retransmisor de la transacción siempre que proporcione la firma válida requerida o la operación de usuario (UserOperation) de la cuenta. Esto garantiza la resistencia a la censura: si no se requiere una infraestructura personalizada, las transacciones de un usuario no pueden ser bloqueadas arbitrariamente por un retransmisor que actúe como guardián. Por ejemplo, el [Delegation Toolkit de MetaMask](https://github.com/MetaMask/delegation-framework/releases/tag/v1.3.0) funciona explícitamente con cualquier empaquetador o pagador ERC-4337 en cualquier cadena, en lugar de requerir un servidor específico de MetaMask.

**Integración de aplicaciones descentralizadas (dapps) a través de interfaces de billetera**:

Dado que las billeteras incluirán en listas blancas contratos de delegación específicos para el EIP-7702, las dapps no deben esperar solicitar directamente autorizaciones 7702. En su lugar, la integración debe realizarse a través de interfaces de billetera estandarizadas:

- **ERC-5792 (`wallet_sendCalls`)**: Permite a las dapps solicitar a las billeteras que ejecuten llamadas por lotes, facilitando funcionalidades como el procesamiento por lotes de transacciones y la abstracción de gas.

- **ERC-6900**: Permite a las dapps aprovechar las capacidades modulares de la cuenta inteligente, como las claves de sesión y la recuperación de cuentas, a través de módulos administrados por la billetera.

Al utilizar estas interfaces, las dapps pueden acceder a las funcionalidades de cuenta inteligente proporcionadas por el EIP-7702 sin administrar directamente las delegaciones, lo que garantiza la compatibilidad y la seguridad en diferentes implementaciones de billeteras.

> Nota: No existe un método estandarizado para que las dapps soliciten firmas de autorización 7702 directamente. Las dapps deben depender de interfaces de billetera específicas como ERC-6900 para aprovechar las características del EIP-7702.

Para obtener más información:

- [Especificación de ERC-5792](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-5792.md)
- [Especificación de ERC-6900](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-6900.md)

**Evitar la dependencia del proveedor**: En línea con lo anterior, una buena implementación es neutral en cuanto a proveedores e interoperable. Esto a menudo significa adherirse a los estándares emergentes para cuentas inteligentes. Por ejemplo, la [Modular Account de Alchemy](https://github.com/alchemyplatform/modular-account) utiliza el estándar ERC-6900 para cuentas inteligentes modulares y está diseñada teniendo en mente un "uso interoperable sin permisos".

**Preservación de la privacidad**: Si bien la privacidad en cadena es limitada, un contrato de delegación debe esforzarse por minimizar la exposición de datos y la vinculabilidad. Esto se puede lograr admitiendo características como pagos de gas en tokens ERC-20 (para que los usuarios no necesiten mantener un saldo público de ETH, lo que mejora la privacidad y la experiencia del usuario) y claves de sesión de un solo uso (que reducen la dependencia de una única clave a largo plazo). Por ejemplo, el EIP-7702 permite pagar el gas en tokens a través de transacciones patrocinadas, y una buena implementación facilitará la integración de dichos pagadores sin filtrar más información de la necesaria. Además, la delegación fuera de la cadena de ciertas aprobaciones (utilizando firmas que se verifican en cadena) significa menos transacciones en cadena con la clave principal del usuario, lo que ayuda a la privacidad. Las cuentas que requieren el uso de un retransmisor obligan a los usuarios a revelar sus direcciones IP. Las mempools públicas mejoran esto; cuando una transacción u operación de usuario se propaga a través de la mempool, no se puede saber si se originó en la IP que la envió o si simplemente se retransmitió a través de ella mediante el protocolo p2p.

**Extensibilidad y seguridad modular**: Las implementaciones de cuentas deben ser extensibles para que puedan evolucionar con nuevas características y mejoras de seguridad. La capacidad de actualización es inherentemente posible con el EIP-7702 (ya que una EOA siempre puede delegar a un nuevo contrato en el futuro para actualizar su lógica). Más allá de la capacidad de actualización, un buen diseño permite la modularidad (por ejemplo, módulos complementarios para diferentes esquemas de firma o políticas de gasto) sin necesidad de desplegar todo de nuevo. El Account Kit de Alchemy es un excelente ejemplo, ya que permite a los desarrolladores instalar módulos de validación (para diferentes tipos de firma como ECDSA, BLS, etc.) y módulos de ejecución para lógica personalizada. Para lograr una mayor flexibilidad y seguridad en las cuentas habilitadas para el EIP-7702, se anima a los desarrolladores a delegar a un contrato proxy en lugar de directamente a una implementación específica. Este enfoque permite actualizaciones y modularidad sin problemas sin requerir autorizaciones EIP-7702 adicionales para cada cambio.

Beneficios del patrón proxy:

- **Capacidad de actualización**: Actualiza la lógica del contrato apuntando el proxy a un nuevo contrato de implementación.

- **Lógica de inicialización personalizada**: Incorpora funciones de inicialización dentro del proxy para configurar las variables de estado necesarias de forma segura.

Por ejemplo, el [SafeEIP7702Proxy](https://docs.safe.global/advanced/eip-7702/7702-safe) demuestra cómo se puede utilizar un proxy para inicializar y administrar de forma segura las delegaciones en cuentas compatibles con el EIP-7702.

Desventajas del patrón proxy:

- **Dependencia de actores externos**: Tienes que confiar en que un equipo externo no actualice a un contrato inseguro.

## Consideraciones de seguridad {#security-considerations}

**Protección contra reentrada**: Con la introducción de la delegación del EIP-7702, la cuenta de un usuario puede cambiar dinámicamente entre una cuenta de propiedad externa (EOA) y un contrato inteligente (SC). Esta flexibilidad permite que la cuenta inicie transacciones y sea el objetivo de las llamadas. Como resultado, los escenarios en los que una cuenta se llama a sí misma y realiza llamadas externas tendrán `msg.sender` igual a `tx.origin`, lo que socava ciertas suposiciones de seguridad que anteriormente dependían de que `tx.origin` siempre fuera una EOA.

Para los desarrolladores de contratos inteligentes, ya no es seguro asumir que `tx.origin` se refiere a una EOA. Del mismo modo, usar `msg.sender == tx.origin` como salvaguarda contra ataques de reentrada ya no es una estrategia confiable.

En el futuro, los desarrolladores deben diseñar asumiendo que cualquier participante en el sistema podría ser un contrato inteligente. Alternativamente, podrían implementar una protección explícita contra reentrada utilizando protecciones contra reentrada con patrones de modificadores `nonReentrant`. Recomendamos seguir un modificador auditado, por ejemplo, la [protección contra reentrada de OpenZeppelin](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/utils/ReentrancyGuard.sol). También podrían usar una [variable de almacenamiento transitorio](https://docs.soliditylang.org/en/latest/internals/layout_in_storage.html).

**Consideraciones de seguridad de inicialización**

La implementación de contratos de delegación del EIP-7702 introduce desafíos de seguridad específicos, particularmente en lo que respecta al proceso de inicialización. Surge una vulnerabilidad crítica cuando la función de inicialización (`init`) se acopla atómicamente con el proceso de delegación. En tales casos, un atacante de tipo frontrunner podría interceptar la firma de delegación y ejecutar la función `init` con parámetros alterados, tomando potencialmente el control de la cuenta.

Este riesgo es especialmente pertinente cuando se intenta utilizar implementaciones de cuentas de contratos inteligentes (SCA) existentes con el EIP-7702 sin modificar sus mecanismos de inicialización.

**Soluciones para mitigar las vulnerabilidades de inicialización**

- Implementar `initWithSig`  
  Reemplaza la función estándar `init` con una función `initWithSig` que requiere que el usuario firme los parámetros de inicialización. Este enfoque garantiza que la inicialización solo pueda continuar con el consentimiento explícito del usuario, mitigando así los riesgos de inicialización no autorizada.

- Utilizar el EntryPoint de ERC-4337  
  Requiere que la función de inicialización se llame exclusivamente desde el contrato EntryPoint de ERC-4337. Este método aprovecha el marco de validación y ejecución estandarizado proporcionado por ERC-4337, agregando una capa adicional de seguridad al proceso de inicialización.  
  _(Ver: [Documentación de Safe](https://docs.safe.global/advanced/eip-7702/7702-safe))_

Al adoptar estas soluciones, los desarrolladores pueden mejorar la seguridad de los contratos de delegación del EIP-7702, protegiéndose contra posibles ataques de frontrunning durante la fase de inicialización.

**Colisiones de almacenamiento** Delegar código no borra el almacenamiento existente. Al migrar de un contrato de delegación a otro, los datos residuales del contrato anterior permanecen. Si el nuevo contrato utiliza los mismos slots de almacenamiento pero los interpreta de manera diferente, puede causar un comportamiento no deseado. Por ejemplo, si la delegación inicial fue a un contrato donde un slot de almacenamiento representa un `bool`, y la delegación posterior es a un contrato donde el mismo slot representa un `uint`, la falta de coincidencia puede conducir a resultados impredecibles.

**Riesgos de phishing** Con la implementación de la delegación del EIP-7702, los activos en la cuenta de un usuario pueden estar completamente controlados por contratos inteligentes. Si un usuario delega sin saberlo su cuenta a un contrato malicioso, un atacante podría obtener fácilmente el control y robar fondos. Al usar `chain_id=0`, la delegación se aplica a todos los identificadores de cadena (chain ids). Solo delega a un contrato inmutable (nunca delegues a un proxy), y solo a contratos que se desplegaron usando CREATE2 (con código de inicialización estándar, sin contratos metamórficos) para que el implementador no pueda desplegar algo diferente en la misma dirección en otro lugar. De lo contrario, tu delegación pone tu cuenta en riesgo en todas las demás cadenas EVM.

Cuando los usuarios realizan firmas delegadas, el contrato de destino que recibe la delegación debe mostrarse de forma clara y destacada para ayudar a mitigar los riesgos de phishing.

**Superficie de confianza mínima y seguridad**: Si bien ofrece flexibilidad, un contrato de delegación debe mantener su lógica central mínima y auditable. El contrato es efectivamente una extensión de la EOA del usuario, por lo que cualquier falla puede ser catastrófica. Las implementaciones deben seguir las mejores prácticas de la comunidad de seguridad de contratos inteligentes. Por ejemplo, las funciones de constructor o inicializador deben estar cuidadosamente aseguradas; como destacó Alchemy, si se usa un patrón proxy bajo 7702, un inicializador sin protección podría permitir que un atacante se apodere de la cuenta. Los equipos deben apuntar a mantener el código en cadena simple: el contrato 7702 de Ambire tiene solo ~200 líneas de Solidity, minimizando deliberadamente la complejidad para reducir errores. Se debe lograr un equilibrio entre una lógica rica en funciones y la simplicidad que facilita la auditoría.

### Implementaciones conocidas {#known-implementations}

Debido a la naturaleza del EIP-7702, se recomienda que las billeteras tengan precaución al ayudar a los usuarios a delegar a un contrato de terceros. A continuación se enumera una colección de implementaciones conocidas que han sido auditadas:

| Dirección del contrato | Fuente | Auditorías |
| ------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 0x000000009B1D0aF20D8C6d0A44e162d11F9b8f00 | [Uniswap/calibur](https://github.com/Uniswap/calibur)                                                                                      | [auditorías](https://github.com/Uniswap/calibur/tree/main/audits)                                                                                                 |
| 0x69007702764179f14F51cdce752f4f775d74E139 | [alchemyplatform/modular-account](https://github.com/alchemyplatform/modular-account)                                                      | [auditorías](https://github.com/alchemyplatform/modular-account/tree/develop/audits)                                                                              |
| 0x5A7FC11397E9a8AD41BF10bf13F22B0a63f96f6d | [AmbireTech/ambire-common](https://github.com/AmbireTech/ambire-common/blob/feature/eip-7702/contracts/AmbireAccount7702.sol)              | [auditorías](https://github.com/AmbireTech/ambire-common/tree/feature/eip-7702/audits)                                                                            |
| 0x63c0c19a282a1b52b07dd5a65b58948a07dae32b | [MetaMask/delegation-framework](https://github.com/MetaMask/delegation-framework)                                                          | [auditorías](https://github.com/MetaMask/delegation-framework/tree/main/audits)                                                                                   |
| 0x4Cd241E8d1510e30b2076397afc7508Ae59C66c9 | [Equipo de AA de la Fundación Ethereum](https://github.com/eth-infinitism/account-abstraction/blob/develop/contracts/accounts/Simple7702Account.sol) | [auditorías](https://github.com/eth-infinitism/account-abstraction/blob/develop/audits/SpearBit%20Account%20Abstraction%20Security%20Review%20-%20Mar%202025.pdf) |
| 0x17c11FDdADac2b341F2455aFe988fec4c3ba26e3 | [Luganodes/Pectra-Batch-Contract](https://github.com/Luganodes/Pectra-Batch-Contract)                                                      | [auditorías](https://certificate.quantstamp.com/full/luganodes-pectra-batch-contract/23f0765f-969a-4798-9edd-188d276c4a2b/index.html)                             |

## Directrices para billeteras de hardware {#hardware-wallet-guidelines}

Las billeteras de hardware no deberían exponer la delegación arbitraria. El consenso en el espacio de las billeteras de hardware es utilizar una lista de contratos delegadores de confianza. Sugerimos permitir las implementaciones conocidas enumeradas anteriormente y considerar otras caso por caso. Dado que delegar tu EOA a un contrato otorga control sobre todos los activos, las billeteras de hardware deben ser cautelosas con la forma en que implementan el 7702.

### Escenarios de integración para aplicaciones complementarias {#integration-scenarios-for-companion-apps}

#### Perezosa {#lazy}

Como la EOA sigue funcionando como de costumbre, no hay nada que hacer.

Nota: algunos activos podrían ser rechazados automáticamente por el código de delegación, como los NFT ERC-1155, y el soporte debe ser consciente de ello.

#### Consciente {#aware}

Notificar al usuario que existe una delegación para la EOA verificando su código y, opcionalmente, ofrecer eliminar la delegación.

#### Delegación común {#common-delegation}

El proveedor de hardware incluye en una lista blanca los contratos de delegación conocidos e implementa su soporte en la aplicación de software complementaria. Se recomienda elegir un contrato con soporte completo para ERC-4337.

Las EOA delegadas a uno diferente se manejarán como EOA estándar.

#### Delegación personalizada {#custom-delegation}

El proveedor de hardware implementa su propio contrato de delegación y lo agrega a las listas, implementando su soporte en la aplicación de software complementaria. Se recomienda construir un contrato con soporte completo para ERC-4337.

Las EOA delegadas a uno diferente se manejarán como EOA estándar.