---
title: Abstracción de cuentas
description: Una descripción general de los planes de Ethereum para hacer que las cuentas de usuario sean más simples y seguras
lang: es
summaryPoints:
  - La abstracción de cuentas hace que sea mucho más fácil crear billeteras de contratos inteligentes
  - Las billeteras de contratos inteligentes hacen que sea mucho más fácil gestionar el acceso a las cuentas de Ethereum
  - Las claves perdidas y expuestas se pueden recuperar utilizando múltiples copias de seguridad
---

La mayoría de los usuarios actuales interactúan con [Ethereum](/) utilizando **[cuentas de propiedad externa (EOA)](/glossary/#eoa)**. Esto limita la forma en que los usuarios pueden interactuar con Ethereum. Por ejemplo, dificulta la realización de lotes de transacciones y requiere que los usuarios mantengan siempre un saldo de ETH para pagar las tarifas de transacción.

La abstracción de cuentas es una forma de resolver estos problemas al permitir a los usuarios programar de manera flexible más seguridad y mejores experiencias de usuario en sus cuentas. Esto puede ocurrir al [actualizar las EOA](https://eips.ethereum.org/EIPS/eip-7702) (EIP-7702) para que puedan ser controladas por contratos inteligentes. También hay otro camino que implica agregar un [segundo sistema de transacciones separado](https://eips.ethereum.org/EIPS/eip-4337) (EIP-4337) para que se ejecute en paralelo al protocolo existente. Independientemente de la ruta, el resultado es el acceso a Ethereum a través de billeteras de contratos inteligentes, ya sea con soporte nativo como parte del protocolo existente o a través de una red de transacciones complementaria.

Las billeteras de contratos inteligentes desbloquean muchos beneficios para el usuario, que incluyen:

- definir tus propias reglas de seguridad flexibles
- recuperar tu cuenta si pierdes las claves
- compartir la seguridad de tu cuenta entre dispositivos o personas de confianza
- pagar el gas de otra persona, o hacer que otra persona pague el tuyo
- agrupar transacciones (por ejemplo, aprobar y ejecutar un intercambio de una sola vez)
- más oportunidades para que los desarrolladores de aplicaciones descentralizadas (dapps) y billeteras innoven en las experiencias de usuario

Estos beneficios no tienen soporte nativo hoy en día porque solo las cuentas de propiedad externa ([EOA](/glossary/#eoa)) pueden iniciar transacciones. Las EOA son simplemente pares de claves públicas y privadas. Funcionan de la siguiente manera:

- si tienes la clave privada puedes hacer _cualquier cosa_ dentro de las reglas de la Máquina Virtual de Ethereum (EVM)
- si no tienes la clave privada no puedes hacer _nada_.

Si pierdes tus claves no se pueden recuperar, y las claves robadas dan a los ladrones acceso instantáneo a todos los fondos de una cuenta.

Las billeteras de contratos inteligentes son la solución a estos problemas, pero hoy en día son difíciles de programar porque, al final, cualquier lógica que implementen tiene que traducirse en un conjunto de transacciones de EOA antes de que puedan ser procesadas por Ethereum. La abstracción de cuentas permite que los contratos inteligentes inicien transacciones por sí mismos, de modo que cualquier lógica que el usuario desee implementar pueda codificarse en la propia billetera de contrato inteligente y ejecutarse en Ethereum.

En última instancia, la abstracción de cuentas mejora el soporte para las billeteras de contratos inteligentes, haciéndolas más fáciles de crear y más seguras de usar. Con la abstracción de cuentas, los usuarios pueden disfrutar de todos los beneficios de Ethereum sin necesidad de entender la tecnología subyacente.

## Más allá de las frases semilla {#beyond-seed-phrases}

Las cuentas actuales están aseguradas mediante claves privadas que se calculan a partir de frases semilla. Cualquier persona con acceso a una frase semilla puede descubrir fácilmente la clave privada que protege una cuenta y obtener acceso a todos los activos que protege. Si se pierden una clave privada y una frase semilla, los activos quedan permanentemente inaccesibles. Asegurar estas frases semilla es incómodo, incluso para usuarios expertos, y el phishing de frases semilla es una de las estafas más comunes.

La abstracción de cuentas resuelve esto utilizando un contrato inteligente para mantener los activos y autorizar las transacciones. Los contratos inteligentes pueden incluir lógica personalizada adaptada para lograr la máxima seguridad y usabilidad. Los usuarios siguen utilizando claves privadas para controlar el acceso, pero con medidas de seguridad mejoradas.

Por ejemplo, se pueden agregar claves de respaldo a una billetera, lo que permite el reemplazo de claves si la clave principal se ve comprometida. Cada clave se puede asegurar de manera diferente o distribuir entre personas de confianza, lo que aumenta significativamente la seguridad. Las reglas adicionales de la billetera pueden mitigar el daño por la exposición de claves, como requerir múltiples firmas para transacciones de alto valor o restringir las transacciones a direcciones de confianza.

## Mejor experiencia de usuario {#better-user-experience}

La abstracción de cuentas mejora en gran medida la experiencia del usuario y la seguridad al admitir billeteras de contratos inteligentes a nivel de protocolo. Los desarrolladores pueden innovar libremente, mejorando la agrupación de transacciones para lograr mayor velocidad y eficiencia. Los intercambios simples pueden convertirse en operaciones de un solo clic, lo que mejora significativamente la facilidad de uso.

La gestión del gas mejora considerablemente. Las aplicaciones pueden pagar las tarifas de gas de los usuarios o permitir el pago en tokens distintos a ETH, eliminando la necesidad de mantener un saldo de ETH.

## ¿Cómo se implementará la abstracción de cuentas? {#how-will-aa-be-implemented}

Actualmente, las billeteras de contratos inteligentes son difíciles de implementar, ya que dependen de código complejo que envuelve las transacciones estándar. Ethereum puede cambiar esto al permitir que los contratos inteligentes inicien transacciones directamente, integrando la lógica en los contratos inteligentes de Ethereum en lugar de depender de retransmisores externos.

### EIP-4337: Abstracción de cuentas sin cambios en el protocolo {#eip-4337-account-abstraction-without-protocol-changes}

EIP-4337 permite el soporte nativo de billeteras de contratos inteligentes sin modificar el protocolo central de Ethereum. Introduce objetos `UserOperation` recopilados en paquetes de transacciones por los validadores, lo que simplifica el desarrollo de billeteras. El contrato EntryPoint de EIP-4337 se implementó en la red principal de Ethereum el 1 de marzo de 2023 y ha facilitado la creación de más de 26 millones de billeteras inteligentes y 170 millones de UserOperations.

## Progreso actual {#current-progress}

Como parte de la actualización Pectra de Ethereum, EIP-7702 está programada para el 7 de mayo de 2025. EIP-4337 ha sido ampliamente adoptada, [con más de 26 millones de cuentas inteligentes implementadas y más de 170 millones de UserOperations procesadas](https://www.bundlebear.com/erc4337-overview/all).

## Lecturas adicionales {#further-reading}

- [erc4337.io](https://docs.erc4337.io/)
- [Documentación de EIP-4337](https://eips.ethereum.org/EIPS/eip-4337)
- [Documentación de EIP-7702](https://eips.ethereum.org/EIPS/eip-7702)
- [Panel de adopción de ERC-4337](https://www.bundlebear.com/erc4337-overview/all)
- ["El camino hacia la abstracción de cuentas" de Vitalik](https://notes.ethereum.org/@vbuterin/account_abstraction_roadmap#Transaction-inclusion-lists)
- [Blog de Vitalik sobre billeteras de recuperación social](https://vitalik.eth.limo/general/2021/01/11/recovery.html)
- [Awesome Account Abstraction](https://github.com/4337Mafia/awesome-account-abstraction)