---
title: "Cómo añadir carteras"
description: "La política que utilizamos al agregar billeteras a ethereum.org"
lang: es
---

# Añadir billeteras {#adding-wallets}

Queremos asegurarnos de mostrar una variedad de billeteras para abarcar el panorama de billeteras tan abundante en funciones, de modo que los usuarios puedan explorar Ethereum de manera segura.

Todos pueden sugerir añadir una cartera en ethereum.org. Si hemos omitido alguna billetera, lo invitamos a sugerirla.

Actualmente, puede ver las billeteras listadas aquí:

- [ethereum.org/wallets/find-wallet/](/wallets/find-wallet/)

Las billeteras cambian rápidamente en Ethereum. Hemos intentado crear un marco de trabajo justo para su consideración en ethereum.org, pero los criterios de listado cambiarán y evolucionarán con el tiempo.

## El marco de decisión {#the-decision-framework}

### Criterios de inclusión: los imprescindibles {#the-must-haves}

- **Un producto con seguridad probada**: ya sea a través de una auditoría, un equipo de seguridad interno, código fuente abierto o algún otro método, la seguridad de su billetera debe ser fiable. Esto reduce el riesgo para nuestros usuarios y nos muestra que usted se toma la seguridad en serio.
- **Una billetera que ha estado “activa” durante más de seis meses O que haya sido lanzada por un grupo con una trayectoria de buena reputación**: este es otro indicador de seguridad. Seis meses es un buen parámetro temporal para que se hayan descubierto errores y vulnerabilidades críticos. Exigimos seis meses para ayudar a filtrar las bifurcaciones que se abandonan rápidamente como proyectos.
- **Desarrollado por un equipo activo**: esto ayuda a garantizar la calidad y que un usuario obtendrá soporte para sus consultas.
- **Información honesta y precisa sobre el listado**: se espera que cualquier sugerencia de listado de proyectos venga con información honesta y precisa. Se eliminarán aquellos productos que falsifiquen información de listado, como al declarar que su producto es “de código abierto” cuando no lo es.
- **Punto de contacto**: un punto de contacto para la billetera nos ayudará enormemente a obtener información precisa cuando se realicen cambios. Esto seguirá actualizando a ethereum.org de forma adecuada al recopilar futura información.
- **Transacciones EIP-1559 (tipo 2)**: su billetera debe admitir transacciones EIP-1559 (tipo 2) para las transacciones en la red principal de Ethereum.
- **Buena experiencia de usuario**: si bien la UX es subjetiva, si varios miembros del equipo principal prueban el producto y lo encuentran difícil de usar, nos reservamos el derecho a rechazar la billetera y, en su lugar, ofreceremos sugerencias útiles para mejorarla. Esto se hace para proteger a nuestra base de usuarios, que en su mayoría está compuesta por principiantes.
- **Enfoque en Ethereum**: una billetera debe proporcionar una experiencia principalmente enfocada en Ethereum. Esto significa que Ethereum (o cualquier L2) está configurada como la red por defecto, los activos ERC son compatibles y las características están alineadas con el ecosistema de Ethereum. No se incluirán en la lista las billeteras que den prioridad en la interfaz de usuario a capas 1 alternativas.

### Eliminación de productos {#product-removals}

- **Información actualizada**: los proveedores de billeteras son responsables de volver a enviar la información de su billetera cada 6 meses para garantizar la validez y la relevancia de la información proporcionada (incluso si no hay cambios en su producto). Si el equipo del producto no lo cumple, ethereum.org puede eliminar el proyecto de la página.

### Otros criterios: los aspectos deseables {#the-nice-to-haves}

- **Accesible globalmente**: su billetera no tiene limitaciones geográficas ni requisitos KYC que excluyan a ciertas personas del acceso a su servicio.
- **Disponible en varios idiomas**: su billetera está traducida a varios idiomas, lo que permite que los usuarios de todo el mundo puedan acceder a ella.
- **Código abierto**: la base de código de todo su proyecto (no solo los módulos) debe ser accesible y debe aceptar solicitudes de pull (PR) de la comunidad en general.
- **Sin custodia**: los usuarios controlan sus fondos. Aunque su producto desaparezca, los usuarios aún pueden acceder y mover sus fondos.
- **Compatibilidad con billeteras de hardware**: los usuarios pueden conectar su billetera de hardware para firmar transacciones.
- **WalletConnect**: los usuarios pueden conectarse a dapps utilizando WalletConnect.
- **Importación de puntos de conexión RPC de Ethereum**: los usuarios pueden importar datos RPC de nodos, lo que les permite conectarse a un nodo de su elección o a otras redes compatibles con la EVM.
- **NFT**: los usuarios pueden ver e interactuar con sus NFT en la billetera.
- **Conectarse a aplicaciones de Ethereum**: los usuarios pueden conectarse a aplicaciones de Ethereum y usarlas.
- **Staking**: los usuarios pueden hacer staking directamente a través de la billetera.
- **Intercambios**: los usuarios pueden intercambiar tokens a través de la billetera.
- **Redes multicadena**: su billetera permite a los usuarios acceder a múltiples redes de cadenas de bloques por defecto.
- **Redes de capa 2**: por defecto, su billetera permite a los usuarios acceder a redes de capa 2.
- **Personalizar las comisiones de gas**: su billetera permite a los usuarios personalizar las comisiones de gas de sus transacciones (tarifa base, tarifa de prioridad, tarifa máxima).
- **Compatibilidad con ENS**: su billetera permite a los usuarios enviar transacciones a nombres ENS.
- **Compatibilidad con ERC-20**: su billetera permite a los usuarios importar contratos de tokens ERC-20 o consultar y mostrar automáticamente los tokens ERC-20.
- **Comprar criptomonedas**: su billetera permite a los usuarios comprar criptomonedas directamente e incorporarse a su ecosistema.
- **Vender por dinero fiduciario**: su billetera permite a los usuarios vender y retirar a dinero fiduciario directamente a una tarjeta o cuenta bancaria.
- **Multifirma**: su billetera admite múltiples firmas para firmar una transacción.
- **Recuperación social**: su billetera admite guardianes, y un usuario puede recuperar su billetera si pierde su frase semilla usándolos.
- **Equipo de soporte dedicado**: su billetera tiene un equipo de soporte dedicado al que los usuarios pueden acudir cuando tienen problemas.
- **Recursos educativos/documentación**: su producto debe tener una experiencia de incorporación bien diseñada para ayudar y educar a los usuarios. O prueba de cómo hacer contenido como artículos o vídeos.

## Añadir una billetera {#adding-a-wallet}

Si quiere agregar una billetera a ethereum.org, cree una incidencia en GitHub.

<ButtonLink href="https://github.com/ethereum/ethereum-org-website/issues/new?assignees=&labels=wallet+%3Apurse%3A&template=suggest_wallet.yaml">
  Crear una incidencia
</ButtonLink>

## Mantenimiento {#maintenance}

Al igual que la naturaleza fluida de Ethereum, los equipos y productos vienen y van y la innovación sucede diariamente, así realizaremos comprobaciones de rutina de nuestro contenido para:

- garantizar que todas las billeteras y dapps listadas todavía cumplan con nuestros criterios
- cercionarnos de que no haya productos sugeridos que cumplan con más de nuestros criterios que los actualmente incluidos

ethereum.org lo mantiene la comunidad de código abierto y dependemos de la comunidad para ayudar a mantener esta información actualizada. Si observa que alguna información sobre las billeteras listadas necesita ser actualizada, ¡por favor [abra una incidencia](https://github.com/ethereum/ethereum-org-website/issues/new?assignees=&labels=wallet+%3Apurse%3A&template=suggest_wallet.yaml) o una [solicitud de pull](https://github.com/ethereum/ethereum-org-website/pulls)!

## Términos de uso {#terms-of-use}

Consulte también nuestros [términos de uso](/terms-of-use/). La información sobre ethereum.org se proporciona únicamente con fines de información general.
