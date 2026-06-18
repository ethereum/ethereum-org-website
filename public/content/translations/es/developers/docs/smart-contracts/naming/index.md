---
title: Nombrar contratos inteligentes
description: Mejores prácticas para nombrar contratos inteligentes de Ethereum con ENS
lang: es
---

Los contratos inteligentes son una piedra angular de la infraestructura descentralizada de Ethereum, lo que permite aplicaciones y protocolos autónomos. Pero incluso a medida que evolucionan las capacidades de los contratos, los usuarios y desarrolladores todavía dependen de direcciones hexadecimales sin procesar para identificar y hacer referencia a estos contratos.

Nombrar contratos inteligentes con el [Ethereum Name Service (ENS)](https://ens.domains/) mejora la experiencia del usuario al eliminar las direcciones hexadecimales de los contratos y reduce el riesgo de ataques como el envenenamiento de direcciones y los ataques de suplantación de identidad (spoofing). Esta guía explica por qué es importante nombrar los contratos inteligentes, cómo se puede implementar y las herramientas disponibles como [Enscribe](https://www.enscribe.xyz) para simplificar el proceso y ayudar a los desarrolladores a adoptar la práctica.

## ¿Por qué nombrar los contratos inteligentes? {#why-name-contracts}

### Identificadores legibles por humanos {#human-readable-identifiers}

En lugar de interactuar con direcciones de contratos opacas como `0x8f8e...f9e3`, los desarrolladores y usuarios pueden usar nombres legibles por humanos como `v2.myapp.eth`. Esto simplifica las interacciones con los contratos inteligentes.

Esto es posible gracias al [Ethereum Name Service](https://ens.domains/), que proporciona un servicio de nombres descentralizado para las direcciones de Ethereum. Esto es análogo a cómo el Sistema de Nombres de Dominio (DNS) permite a los usuarios de Internet acceder a direcciones de red utilizando un nombre como ethereum.org en lugar de a través de una dirección IP como `104.18.176.152`.

### Mejora de la seguridad y la confianza {#improved-security-and-trust}

Los contratos nombrados ayudan a reducir las transacciones accidentales a la dirección incorrecta. También ayudan a los usuarios a identificar contratos vinculados a aplicaciones o marcas específicas. Esto añade una capa de confianza reputacional, especialmente cuando los nombres están adjuntos a dominios principales conocidos como `uniswap.eth`.

Debido a la longitud de 42 caracteres de la dirección de Ethereum, es muy difícil para los usuarios identificar pequeños cambios en las direcciones, donde se han modificado un par de caracteres. Por ejemplo, una dirección como `0x58068646C148E313CB414E85d2Fe89dDc3426870` normalmente sería truncada a `0x580...870` por aplicaciones orientadas al usuario como las billeteras. Es poco probable que un usuario note una dirección maliciosa donde se han alterado un par de caracteres.

Este tipo de técnica es empleada por ataques de suplantación y envenenamiento de direcciones donde se hace creer a los usuarios que están interactuando o enviando fondos a la dirección correcta, cuando de hecho la dirección simplemente se parece a la dirección correcta, pero no es la misma.

Los nombres de ENS para billeteras y contratos protegen contra estos tipos de ataques. Al igual que los ataques de suplantación de DNS, los ataques de suplantación de ENS también pueden llevarse a cabo; sin embargo, es más probable que un usuario note un error ortográfico en un nombre de ENS que una pequeña modificación en una dirección hexadecimal.

### Mejor experiencia de usuario (UX) para billeteras y exploradores {#better-ux}

Cuando un contrato inteligente se ha configurado con un nombre de ENS, es posible que aplicaciones como billeteras y exploradores de cadenas de bloques muestren nombres de ENS para los contratos inteligentes, en lugar de direcciones hexadecimales. Esto proporciona una mejora significativa en la experiencia del usuario (UX).

Por ejemplo, al interactuar con una aplicación como Uniswap, los usuarios normalmente verán que la aplicación con la que están interactuando está alojada en el sitio web `uniswap.org`, pero se les presentaría una dirección de contrato hexadecimal si Uniswap no ha nombrado sus contratos inteligentes con ENS. Si el contrato está nombrado, en su lugar podrían ver `v4.contracts.uniswap.eth`, lo cual es mucho más útil.

## Nombrar en el despliegue frente a después del despliegue {#when-to-name}

Hay dos momentos en los que se pueden nombrar los contratos inteligentes:

- **En el momento del despliegue**: asignar un nombre de ENS al contrato a medida que se despliega.
- **Después del despliegue**: mapear una dirección de contrato existente a un nuevo nombre de ENS.

Ambos enfoques dependen de tener acceso de propietario o administrador a un dominio de ENS para que puedan crear y configurar registros de ENS.

## Cómo funciona la asignación de nombres de ENS para los contratos {#how-ens-naming-works}

Los nombres de ENS se almacenan en cadena y se resuelven en direcciones de Ethereum a través de los resolutores de ENS. Para nombrar un contrato inteligente:

1. Registrar o controlar un dominio de ENS principal (ej. `myapp.eth`)
2. Crear un subdominio (ej. `v1.myapp.eth`)
3. Configurar el registro `address` del subdominio a la dirección del contrato
4. Configurar el registro inverso del contrato en el ENS para permitir que el nombre se encuentre a través de su dirección

Los nombres de ENS son jerárquicos y admiten subnombres ilimitados. La configuración de estos registros generalmente implica interactuar con el registro de ENS y los contratos de resolutores públicos.

## Herramientas para nombrar contratos {#tools}

Hay dos enfoques para nombrar contratos inteligentes. Ya sea usando la [Aplicación de ENS](https://app.ens.domains) con algunos pasos manuales, o usando [Enscribe](https://www.enscribe.xyz). Estos se describen a continuación.

### Configuración manual de ENS {#manual-ens-setup}

Usando la [Aplicación de ENS](https://app.ens.domains/), los desarrolladores pueden crear manualmente subnombres y configurar registros de direcciones de reenvío. Sin embargo, no pueden establecer un nombre principal para un contrato inteligente configurando el registro inverso para el nombre a través de la aplicación de ENS. Se deben tomar pasos manuales que se cubren en la [documentación de ENS](https://docs.ens.domains/web/naming-contracts/).

### Enscribe {#enscribe}

[Enscribe](https://www.enscribe.xyz) simplifica la asignación de nombres de contratos inteligentes con ENS y mejora la confianza del usuario en los contratos inteligentes. Proporciona:

- **Despliegue y asignación de nombres atómicos**: Asignar un nombre de ENS al desplegar un nuevo contrato
- **Asignación de nombres después del despliegue**: Adjuntar nombres a contratos ya desplegados
- **Soporte multicadena**: Funciona en Ethereum y redes de capa 2 (l2) donde se admite ENS
- **Datos de verificación de contratos**: Incluye datos de verificación de contratos extraídos de múltiples fuentes para aumentar la confianza de los usuarios

Enscribe admite nombres de ENS proporcionados por los usuarios, o sus propios dominios si el usuario no tiene un nombre de ENS.

Puede acceder a la [Aplicación de Enscribe](https://app.enscribe.xyz) para comenzar a nombrar y ver contratos inteligentes.

## Mejores prácticas {#best-practices}

- **Usar nombres claros y versionados** como `v1.myapp.eth` para hacer transparentes las actualizaciones de los contratos
- **Configurar registros inversos** para vincular contratos a nombres de ENS para su visibilidad en aplicaciones como billeteras y exploradores de cadenas de bloques.
- **Monitorear de cerca los vencimientos** si desea evitar cambios accidentales en la propiedad
- **Verificar la fuente del contrato** para que los usuarios puedan confiar en que el contrato nombrado se comporta como se espera

## Riesgos {#risks}

Nombrar contratos inteligentes proporciona beneficios significativos para los usuarios de Ethereum; sin embargo, los propietarios de dominios de ENS deben estar atentos con respecto a su gestión. Los riesgos notables incluyen:

- **Vencimiento**: Al igual que los nombres de DNS, los registros de nombres de ENS tienen una duración finita. Por lo tanto, es vital que los propietarios monitoreen las fechas de vencimiento de sus dominios y los renueven mucho antes de su vencimiento. Tanto la Aplicación de ENS como Enscribe proporcionan indicadores visuales para los propietarios de dominios cuando se acerca el vencimiento.
- **Cambio de propiedad**: Los registros de ENS se representan como NFT en Ethereum, donde el propietario de un dominio `.eth` específico tiene el NFT asociado en su posesión. Por lo tanto, si una cuenta diferente toma posesión de este NFT, el nuevo propietario puede modificar cualquier registro de ENS como considere oportuno.

Para mitigar tales riesgos, la cuenta del propietario de los dominios de segundo nivel (2LD) `.eth` debe estar asegurada a través de una billetera multifirma con subdominios creados para gestionar la asignación de nombres de los contratos. De esa manera, en caso de cualquier cambio accidental o malicioso en la propiedad a nivel de subdominio, pueden ser anulados por el propietario del 2LD.

## El futuro de la asignación de nombres de contratos {#future}

La asignación de nombres de contratos se está convirtiendo en una mejor práctica para el desarrollo de aplicaciones descentralizadas (dapps), de manera similar a cómo los nombres de dominio reemplazaron a las direcciones IP en la web. A medida que más infraestructura, como billeteras, exploradores y paneles de control, integren la resolución de ENS para los contratos, los contratos nombrados mejorarán la seguridad y reducirán los errores en todo el ecosistema.

Al hacer que los contratos inteligentes sean más fáciles de reconocer y comprender, la asignación de nombres ayuda a cerrar la brecha entre los usuarios y las aplicaciones en Ethereum, mejorando tanto la seguridad como la experiencia del usuario (UX).

## Lecturas adicionales {#further-reading}

- [Nombrar contratos inteligentes con ENS](https://docs.ens.domains/web/naming-contracts/)
- [Nombrar contratos inteligentes con Enscribe](https://www.enscribe.xyz/docs).