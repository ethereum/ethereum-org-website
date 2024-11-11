---
title: Cómo añadir carteras
description: La política que utilizamos al agregar billeteras a ethereum.org
lang: es
---

# Cómo añadir carteras {#adding-wallets}

Queremos asegurarnos de mostrar una variedad de billeteras para abarcar el panorama de billeteras tan abundante en funciones, de modo que los usuarios puedan explorar Ethereum de manera segura.

Todos pueden sugerir añadir una cartera en ethereum.org. Si hemos omitido alguna billetera, lo invitamos a sugerirla.

Actualmente, puede ver las billeteras listadas aquí:

- [https://ethereum.org/es/wallets/find-wallet/](/wallets/find-wallet/)

Las billeteras cambian rápidamente en Ethereum. Hemos intentado crear un marco de trabajo justo para su consideración en ethereum.org, pero los criterios de listado cambiarán y evolucionarán con el tiempo.

## El marco de decisión {#the-decision-framework}

### Criterios para la inclusión: los aspectos obligatorios {#the-must-haves}

- **Un producto con seguridad analizada**: ya sea a través de una auditoría, un equipo interno de seguridad, código abierto o algún otro método, su cartera debe estar segura y protegida. Esto reduce el riesgo para nuestros usuarios y nos muestra que usted se toma la seguridad en serio.
- **Una billetera que ha estado “en funcionamiento” por más de seis meses O cuyos publicadores sean un organización con un historial de buena reputación**: este es otro indicador de seguridad. Seis meses es un buen parámetro temporal para que se hayan descubierto errores y vulnerabilidades críticos. Exigimos seis meses para ayudar a filtrar las bifurcaciones que se abandonan rápidamente como proyectos.
- **Reflejar el trabajo de un equipo activo**: esto ayuda a garantizar la calidad y que el usuario obtendrá asistencia en caso de tener dudas.
- **Información honesta y precisa de los listados**: se espera que cualquier contenido sugerido de proyectos proporcione información honesta y precisa. Se eliminarán aquellos productos que falsifiquen información de listado, como al declarar que su producto es “de código abierto” cuando no lo es.
- **Un punto de contacto**: un punto de contacto para la billetera ayudará considerablemente a los usuarios a obtener información precisa cuando se realicen cambios. Esto seguirá actualizando a ethereum.org de forma adecuada al recopilar futura información.
- **Transacciones EIP-1559 (tipo 2)**: su cartera debe soportar estas transacciones en la red principal de Ethereum.
- **Buena experiencia de usuario**: Si bien la UX es subjetiva, si varios miembros del equipo central prueban el producto y lo encuentran difícil de usar, nos reservamos el derecho de rechazar la cartera y, en su lugar, proporcionaremos sugerencias útiles para mejorar. Esto se hace para proteger a nuestra base de usuarios, que en su mayoría está compuesta por principiantes.

### Eliminación de productos {#product-removals}

- **Información actualizada**: Los proveedores de carteras son responsables de volver a enviar la información de su cartera cada 6 meses para garantizar la validez y relevancia de la información proporcionada (incluso si no hay cambios en su producto). Si el equipo del producto no lo cumple, ethereum.org puede eliminar el proyecto de la página.

### Otros criterios: los aspectos deseables {#the-nice-to-haves}

- **Acceso global**: su billetera no tiene limitaciones geográficas ni requisitos de KYC (conozca a su cliente) que no permiten a determinadas personas acceder a su servicio.
- **Disponibilidad en varios idiomas**: su billetera se tradujo a varios idiomas y permite que usuarios de todo el mundo puedan acceder a ella.
- **Código abierto**: la base de código (no solo los módulos) de todo su proyecto debe ser accesible y debe aceptar solicitudes de incorporación de cambios (PR) de la comunidad en general.
- **Sin custodia**: los usuarios controlan sus fondos. Aunque su producto desaparezca, los usuarios aún pueden acceder y mover sus fondos.
- **Compatibilidad con billeteras de hardware**: los usuarios pueden conectar su billetera de hardware para firmar transacciones.
- **WalletConnect**: los usuarios pueden conectarse a dApps a través de WalletConnect.
- **Importación de endpoints RPC de Ethereum**: los usuarios pueden importar datos de nodos RPC, lo que les permite conectarse a un nodo de su elección y a otras redes compatibles con EVM.
- **NFT**: los usuarios pueden ver e interactuar con sus NFT en la billetera.
- **Conexión a aplicaciones de Ethereum**: los usuarios pueden conectarse y usar apliaciones de Ethereum.
- **Staking**: los usuarios pueden hacer staking directamente a través de su billetera.
- **Intercambios**: los usuarios pueden intercambiar tokens a través de la billetera.
- **Acceso multicadena**: por defecto, su billetera permite que los usuarios accedan a varias redes de cadenas de bloque.
- **Redes de capa 2**: por defecto, su billetera permite que los usuarios accedan a redes de capa 2.
- **Comisiones de gas personalizadas**: su billetera permite que los usuarios ajusten las comisiones de gas (comisión base, comisión prioritaria, comisión máx.).
- **Compatibilidad con ENS**: su billetera permite que los usuarios envíen transacciones a nombres ENS (servicio de nombres de Ethereum).
- **Compatibilidad con ERC-20**: su billetera permite que los usuarios importen contratos de tokens ERC-20 o consulta y muestra automáticamente tokens ERC-20.
- **Comprar criptos**: su billetera permite que los usarios compren directamente critpomonedas y se incorporen al ecosistema.
- **Vender por dinero fiduciario**: su billetera permite que los usuarios vendan y hagan retiros en monedas difuciarias directamente a trarjetas o cuentas bancarias.
- **Multifirma**: su billetera es compatible con la funcionalidad multifirma para firmar una transacción.
- **Recuperación social**: su billetera admite guardianes y un usuario puede recuperar su billetera a través de estos guardianes si pierde su frase semilla.
- **Equipo de soporte dedicado**: su billetera tiene un equipo de soporte dedicado al que los usuarios pueden acudir cuando tienen problemas.
- **Documentación/recursos educativos**: su producto debe presentar una experiencia de incorporcación correctamente diseñada para ayudar y educar a los usuarios. O prueba de cómo hacer contenido como artículos o vídeos.

## Agregar una billetera {#adding-a-wallet}

Si quiere agregar una billetera a ethereum.org, cree una incidencia en GitHub.

<ButtonLink href="https://github.com/ethereum/ethereum-org-website/issues/new?assignees=&labels=wallet+%3Apurse%3A&template=suggest_wallet.yaml">
  Crear una incidencia
</ButtonLink>

## Mantenimiento {#maintenance}

Al igual que la naturaleza fluida de Ethereum, los equipos y productos vienen y van y la innovación sucede diariamente, así realizaremos comprobaciones de rutina de nuestro contenido para:

- garantizar que todas las billeteras y dapps listadas todavía cumplan con nuestros criterios
- cercionarnos de que no haya productos sugeridos que cumplan con más de nuestros criterios que los actualmente incluidos

ethereum.org lo mantiene la comunidad de código abierto y dependemos de la comunidad para ayudar a mantener esta información actualizada. Si nota que es necesario actualizar algún dato acerca de las billeteras incluidas en la lista, [abra una incidencia](https://github.com/ethereum/ethereum-org-website/issues/new?assignees=&labels=wallet+%3Apurse%3A&template=suggest_wallet.yaml) o una [solicitud de incorporación de cambios](https://github.com/ethereum/ethereum-org-website/pulls).


## Condiciones de uso {#terms-of-use}

Consulte también nuestros [términos de uso](/terms-of-use/). La información sobre ethereum.org se proporciona únicamente con fines de información general.
