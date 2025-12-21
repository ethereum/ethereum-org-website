---
title: Nomenclatura de contratos inteligentes
description: Mejores prácticas para nombrar contratos inteligentes de Ethereum con ENS
lang: es
---

Los contratos inteligentes son una piedra angular de la infraestructura descentralizada de Ethereum, que permite aplicaciones y protocolos autónomos. Pero incluso a medida que las capacidades de los contratos evolucionan, los usuarios y desarrolladores todavía dependen de direcciones hexadecimales sin formato para identificar y hacer referencia a estos contratos.

Nombrar contratos inteligentes con el [Servicio de nombres de Ethereum (ENS)](https://ens.domains/) mejora la experiencia del usuario al eliminar las direcciones hexadecimales de los contratos y reduce el riesgo de ataques como el envenenamiento de direcciones y los ataques de suplantación de identidad. Esta guía explica por qué es importante nombrar los contratos inteligentes, cómo se puede implementar y las herramientas disponibles, como [Enscribe](https://www.enscribe.xyz), para simplificar el proceso y ayudar a los desarrolladores a adoptar esta práctica.

## ¿Por qué nombrar los contratos inteligentes? {#why-name-contracts}

### Identificadores legibles por humanos {#human-readable-identifiers}

En lugar de interactuar con direcciones de contrato opacas como `0x8f8e...f9e3`, los desarrolladores y usuarios pueden usar nombres legibles por humanos como `v2.myapp.eth`. Esto simplifica las interacciones con los contratos inteligentes.

Esto es posible gracias al [Servicio de nombres de Ethereum](https://ens.domains/), que proporciona un servicio de nombres descentralizado para las direcciones de Ethereum. Esto es análogo a cómo el Servicio de nombres de dominio (DNS) permite a los usuarios de internet acceder a las direcciones de red utilizando un nombre como ethereum.org en lugar de una dirección IP como `104.18.176.152`.

### Seguridad y confianza mejoradas {#improved-security-and-trust}

Los contratos con nombre ayudan a reducir las transacciones accidentales a la dirección incorrecta. También ayudan a los usuarios a identificar contratos vinculados a aplicaciones o marcas específicas. Esto añade una capa de confianza reputacional, especialmente cuando los nombres están asociados a dominios principales conocidos como `uniswap.eth`.

Debido a la longitud de 42 caracteres de la dirección de Ethereum, es muy difícil para los usuarios identificar pequeños cambios en las direcciones, donde se han modificado un par de caracteres. Por ejemplo, una dirección como `0x58068646C148E313CB414E85d2Fe89dDc3426870` normalmente sería truncada a `0x580...870` por aplicaciones orientadas al usuario como las billeteras. Es poco probable que un usuario note una dirección maliciosa en la que se han alterado un par de caracteres.

Este tipo de técnica se emplea en ataques de suplantación y envenenamiento de direcciones, en los que se hace creer a los usuarios que están interactuando o enviando fondos a la dirección correcta, cuando en realidad la dirección simplemente se parece a la correcta, pero no es la misma.

Los nombres de ENS para billeteras y contratos protegen contra este tipo de ataques. Al igual que los ataques de suplantación de DNS, los ataques de suplantación de ENS también pueden producirse; sin embargo, es más probable que un usuario note un error ortográfico en un nombre de ENS que una pequeña modificación en una dirección hexadecimal.

### Mejor UX para billeteras y exploradores {#better-ux}

Cuando un contrato inteligente se ha configurado con un nombre de ENS, es posible que las aplicaciones, como las billeteras y los exploradores de la cadena de bloques, muestren los nombres de ENS para los contratos inteligentes, en lugar de las direcciones hexadecimales. Esto proporciona una mejora significativa en la experiencia de usuario (UX) para los usuarios.

Por ejemplo, al interactuar con una aplicación como Uniswap, los usuarios verán normalmente que la aplicación con la que interactúan está alojada en el sitio web `uniswap.org`, pero se les presentará una dirección de contrato hexadecimal si Uniswap no ha nombrado sus contratos inteligentes con ENS. Si el contrato tiene un nombre, podrían ver en su lugar `v4.contracts.uniswap.eth`, que es mucho más útil.

## Nomenclatura en el momento del despliegue frente a la post-despliegue {#when-to-name}

Hay dos momentos en los que se puede nombrar a los contratos inteligentes:

- **En el momento del despliegue**: asignar un nombre de ENS al contrato a medida que se despliega.
- **Después del despliegue**: asignar una dirección de contrato existente a un nuevo nombre de ENS.

Ambos enfoques se basan en tener acceso como propietario o gestor a un dominio ENS para poder crear y establecer registros ENS.

## Cómo funciona la nomenclatura de ENS para los contratos {#how-ens-naming-works}

Los nombres de ENS se almacenan en la cadena y se resuelven en direcciones de Ethereum a través de resolutores de ENS. Para nombrar un contrato inteligente:

1. Registrar o controlar un dominio ENS principal (p. ej., `myapp.eth`)
2. Crear un subdominio (p. ej., `v1.myapp.eth`)
3. Establecer el registro de `dirección` del subdominio en la dirección del contrato
4. Establecer el registro inverso del contrato en el ENS para permitir que el nombre se encuentre a través de su dirección

Los nombres de ENS son jerárquicos y admiten un número ilimitado de subnombres. Establecer estos registros suele implicar la interacción con el registro de ENS y los contratos de resolución públicos.

## Herramientas para nombrar contratos {#tools}

Hay dos enfoques para nombrar los contratos inteligentes. Ya sea utilizando la [Aplicación ENS](https://app.ens.domains) con algunos pasos manuales, o utilizando [Enscribe](https://www.enscribe.xyz). Estos se describen a continuación.

### Configuración manual de ENS {#manual-ens-setup}

Utilizando la [Aplicación ENS](https://app.ens.domains), los desarrolladores pueden crear manualmente subnombres y establecer registros de dirección de reenvío. Sin embargo, no pueden establecer un nombre primario para un contrato inteligente estableciendo el registro inverso para el nombre a través de la aplicación ENS. Se deben seguir unos pasos manuales que se describen en los [documentos de ENS](https://docs.ens.domains/web/naming-contracts/).

### Enscribe {#enscribe}

[Enscribe](https://www.enscribe.xyz) simplifica la nomenclatura de los contratos inteligentes con ENS y aumenta la confianza del usuario en los contratos inteligentes. Proporciona:

- **Despliegue y nomenclatura atómicos**: Asignar un nombre de ENS al desplegar un nuevo contrato
- **Nomenclatura post-despliegue**: Adjuntar nombres a contratos ya desplegados
- **Soporte multicadena**: Funciona en Ethereum y en redes de capa 2 donde se soporta ENS
- **Datos de verificación de contratos**: Incluye datos de verificación de contratos extraídos de múltiples fuentes para aumentar la confianza de los usuarios

Enscribe admite nombres de ENS proporcionados por los usuarios, o sus propios dominios si el usuario no tiene un nombre de ENS.

Puede acceder a la [Aplicación Enscribe](https://app.enscribe.xyz) para empezar a nombrar y ver contratos inteligentes.

## Buenas prácticas {#best-practices}

- **Utilice nombres claros y versionados** como `v1.myapp.eth` para que las actualizaciones de los contratos sean transparentes
- **Establezca registros inversos** para vincular los contratos a los nombres de ENS y así darles visibilidad en aplicaciones como billeteras y exploradores de cadenas de bloques.
- **Supervise de cerca los vencimientos** si quiere evitar cambios accidentales de propiedad
- **Verifique la fuente del contrato** para que los usuarios puedan confiar en que el contrato nombrado se comporta como se espera

## Riesgos {#risks}

La nomenclatura de los contratos inteligentes ofrece importantes ventajas a los usuarios de Ethereum; sin embargo, los propietarios de los dominios ENS deben estar atentos a su gestión. Entre los riesgos más notables se incluyen:

- **Vencimiento**: Al igual que los nombres DNS, los registros de nombres ENS tienen una duración finita. Por lo tanto, es vital que los propietarios supervisen las fechas de vencimiento de sus dominios y los renueven con suficiente antelación. Tanto la Aplicación ENS como Enscribe proporcionan indicadores visuales para los propietarios de dominios cuando se acerca el vencimiento.
- **Cambio de propiedad**: Los registros de ENS se representan como NFT en Ethereum, donde el propietario de un dominio `.eth` específico tiene el NFT asociado en su poder. Por lo tanto, si una cuenta diferente toma posesión de este NFT, el nuevo propietario puede modificar cualquier registro ENS como considere oportuno.

Para mitigar dichos riesgos, la cuenta del propietario de los dominios de segundo nivel (2LD) `.eth` debe estar asegurada a través de una billetera multifirma, creándose subdominios para gestionar la nomenclatura de los contratos. De este modo, en caso de que se produzcan cambios accidentales o maliciosos en la propiedad a nivel de subdominio, el propietario del 2LD puede anularlos.

## Futuro de la nomenclatura de contratos {#future}

La nomenclatura de contratos se está convirtiendo en una buena práctica para el desarrollo de dapps, de forma similar a como los nombres de dominio sustituyeron a las direcciones IP en la web. A medida que más infraestructuras, como billeteras, exploradores y paneles de control, integren la resolución de ENS para los contratos, los contratos con nombre mejorarán la seguridad y reducirán los errores en todo el ecosistema.

Al hacer que los contratos inteligentes sean más fáciles de reconocer y razonar, la nomenclatura ayuda a cerrar la brecha entre los usuarios y las aplicaciones en Ethereum, mejorando tanto la seguridad como la UX para los usuarios.

## Lecturas adicionales {#further-reading}

- [Nomenclatura de contratos inteligentes con ENS](https://docs.ens.domains/web/naming-contracts/)
- [Nomenclatura de contratos inteligentes con Enscribe](https://www.enscribe.xyz/docs).
