---
title: Abstracción de cuenta
description: Una visión general de los planes de Ethereum para hacer que las cuentas de usuario sean más sencillas y seguras.
lang: es
summaryPoints:
  - La abstracción de cuenta facilita la construcción de carteras con contrato inteligente.
  - Las carteras de contrato inteligente facilitan la gestión de acceso a las cuentas de la red de Ethereum.
  - Las claves perdidas y expuestas se pueden recuperar usando múltiples copias de seguridad.
---

# Abstracción de cuentas {#account-abstraction}

La mayoría de los usuarios existentes interactúan con Ethereum mediante **[cuentas de propiedad externa (EOA)](/glossary/#eoa)**. Esto limita la forma en que los usuarios pueden interactuar con Ethereum. Por ejemplo, hace que sea difícil realizar conjuntos de transacciones y requiere que los usuarios siempre mantengan un saldo de ETH para pagar comisiones de transacción.

La abstracción de cuentas es una forma de rosolver estos problemas, que permite a los usuarios programar flexiblemente con mayor seguridad y mejores experiencias de usuario en sus cuentas. Esto puede suceder [actualizando las EOA](https://eips.ethereum.org/EIPS/eip-7702) (EIP-7702) para que puedan ser controladas por contratos inteligentes. También existe otra vía que implica añadir un [segundo sistema de transacciones independiente](https://eips.ethereum.org/EIPS/eip-4337) (EIP-4337) que se ejecute en paralelo con el protocolo existente. Al margen de la vía, el resultado es acceso a Ethereum a través de carteras de contratos inteligentes, bien de forma nativa soportada como parte del protocolo existente, o bien mediante una red de transacciones adicional.

Las billeteras de contrato inteligente desbloquean múltiples beneficios para los usuarios, incluyendo:

- Definir reglas propias de seguridad flexibles.
- Recuperar su cuenta si se pierden las claves.
- Compartir la seguridad de su cuenta entre dispositivos y personas de confianza.
- pagar por el gas de alguien más, o que alguien pague el suyo
- agrupar transacciones en lotes (p. ej., aprobar y ejecutar un intercambio de una vez)
- Más oportunidades de que DApps y desarrolladores de carteras innoven en las experiencias de usuario.

Actualmente, estas ventajas no son compatibles de forma nativa, ya que solo las cuentas de propiedad externa ([EOA](/glossary/#eoa)) pueden iniciar transacciones. Las EOAs son simplemente pares de claves público-privadas. Funcionan de la siguiente forma:

- si tiene la clave privada puede hacer _cualquier cosa_ dentro de las reglas de la máquina virtual de Ethereum (EVM)
- si no tiene la clave privada, no puede hacer _nada_.

Si pierde sus claves, no pueden recuperarse y las claves robadas dan a los ladrones acceso instantáneo a todos los fondos de una cuenta.

Las billeteras de contrato inteligente son la solución a estos problemas, pero hoy en día son difíciles de programar porque, al final, cualquier lógica que implementen debe traducirse a un conjunto de transacciones de EOA antes de que Ethereum pueda procesarlas. La abstracción de cuenta permite que los contratos inteligentes inicien transacciones por sí solos, para que cualquier lógica que el usuario desee implementar pueda codificarse dentro de la misma cartera de contrato inteligente y ejecutarse en Ethereum.

En última instancia, la abstracción de la cuenta respalda a las carteras de contrato inteligente, simplificando su construir y protegiendo su uso. Con abstracción de cuentas, los usuarios pueden disfrutar de todos los beneficios de Ethereum sin tener que entender la tecnología subyacente.

## Más allá de las frases semilla {#beyond-seed-phrases}

Las cuentas de la actualidad son seguras porque usan claves privadas que son calculadas a partir de fases semilla. Cualquier persona con acceso a una frase semilla (de recuperación) puede descubrir fácilmente la clave privada que protege una cuenta y acceder a todos los activos que protege. Si una clave privada y una frase de semilla se pierden, los activos se vuelven permanentemente inaccesibles. Proteger estas frases semilla es complicado, incluso para usuarios expertos, y el phishing de frase semilla es una de las formas más comunes de estafa.

La abstracción de cuentas soluciona esto usando un contrato inteligente para mantener los activos y autorizar transacciones. Los contratos inteligentes pueden incluir una lógica personalizada adaptada para una máxima seguridad y usabilidad. Los usuarios siguen usando claves privadas para controlar el acceso, pero con medidas de seguridad mejoradas.

Por ejemplo, pueden añadirse copias de seguridad de claves a una cartera, permitiendo el reemplazo de la clave si la clave primaria se ve afectada. Cada clave puede protegerse de forma diferente o distribuirse entre individuos de confianza, aumentando significativamente la seguridad. Reglas de billetera adicionales pueden mitigar los daños de la exposición de claves, como requerir múltiples firmas para transacciones de gran valor o restringir transacciones a direcciones de confianza.

## Mejor experiencia de usuario {#better-user-experience}

La abstracción de cuentas mejora enormemente la experiencia de usuario y la seguridad permitiendo carteras de contratos inteligentes a nivel de protocolo. Los desarrolladores pueden innovar libremente, mejorando la agrupación de transacciones para obtener velocidad y eficiencia. Intercambios sencillos pueden convertirse en operaciones de un solo clic, mejorando significativamente la facilidad de uso.

La gestión del gas mejora considerablemente. Las aplicaciones puede pagar las tarifas de gas de los usuarios o permitir pagos en tókenes distintos a ETH, eliminando la necesidad de mantener un saldo de ETH.

## ¿Cómo se implementará la abstracción de cuenta? {#how-will-aa-be-implemented}

Actualmente, las carteras de contratos inteligentes son difíciles de implementar, ya que dependen de código complejo que recoge transacciones estándar. Ethereum puede cambiar esto permitiendo que los contratos inteligentes inicien transacciones directamente, incorporando la lógica en contratos inteligentes de Ethereum en vez de depender de transmisores externos.

### EIP-4337: abstracción de cuenta sin cambios en el protocolo

EIP-4337 permite un soporte nativo de carteras de contratos inteligentes sin modificar el protocolo base de Ethereum. Introduce objetos `UserOperation` recopilados en paquetes de transacciones por los validadores, lo que simplifica el desarrollo de billeteras. El contrato EntryPoint de EIP-4337 se desplegó en la red principal de Ethereum el 1 de marzo de 2023 y ha facilitado la creación de más de 26 millones de carteras inteligentes y 170 millones de UserOperations.

## Progreso actual {#current-progress}

Como parte de la actualización Pectra de Ethereum, EIP-7702 está programado para el 7 de mayo de 2025. El EIP-4337 se ha adoptado de forma generalizada, [con más de 26 millones de cuentas inteligentes desplegadas y más de 170 millones de UserOperations procesadas](https://www.bundlebear.com/erc4337-overview/all).

## Lecturas adicionales {#further-reading}

- [erc4337.io](https://docs.erc4337.io/)
- [Documentación del EIP-4337](https://eips.ethereum.org/EIPS/eip-4337)
- [Documentación del EIP-7702](https://eips.ethereum.org/EIPS/eip-7702)
- [Panel de adopción del ERC-4337](https://www.bundlebear.com/erc4337-overview/all)
- ["El camino a la abstracción de cuentas" de Vitalik](https://notes.ethereum.org/@vbuterin/account_abstraction_roadmap#Transaction-inclusion-lists)
- [Blog de Vitalik sobre las billeteras de recuperación social](https://vitalik.eth.limo/general/2021/01/11/recovery.html)
- [Awesome Account Abstraction](https://github.com/4337Mafia/awesome-account-abstraction)
