---
title: Añadir billeteras
description: La política que utilizamos al añadir una billetera a ethereum.org
lang: es
---

Queremos asegurarnos de mostrar una variedad de billeteras que cubran el panorama rico en funciones de las billeteras para que los usuarios puedan navegar por Ethereum de manera segura.

Cualquiera es libre de sugerir añadir una billetera en ethereum.org. Si hay alguna billetera que hayamos pasado por alto, ¡por favor sugiérela!

Actualmente, las billeteras están listadas en:

- [ethereum.org/wallets/find-wallet/](/wallets/find-wallet/)

Las billeteras cambian rápidamente en Ethereum. Hemos intentado crear un marco justo para su consideración en ethereum.org, pero los criterios de inclusión cambiarán y evolucionarán con el tiempo.

## El marco de decisión {#the-decision-framework}

### Criterios de inclusión: los requisitos indispensables {#the-must-haves}

- **Un producto con seguridad probada**: ya sea a través de una auditoría, un equipo de seguridad interno, código de código abierto o algún otro método, la seguridad de tu billetera debe ser confiable. Esto reduce el riesgo para nuestros usuarios y nos demuestra que te tomas la seguridad en serio.
- **Una billetera que haya estado "activa" durante más de seis meses O lanzada por un grupo con una trayectoria respetable**: esta es otra indicación de seguridad. Seis meses es un buen período de tiempo para que se hayan encontrado errores críticos y vulnerabilidades. Pedimos seis meses para ayudar a filtrar las bifurcaciones que se abandonan rápidamente como proyectos.
- **Desarrollada por un equipo activo**: esto ayuda a garantizar la calidad y que el usuario obtendrá soporte para sus consultas.
- **Información de listado honesta y precisa**: se espera que cualquier sugerencia de listado de proyectos venga con información honesta y precisa. Los productos que falsifiquen la información del listado, como declarar que su producto es de "código abierto" cuando no lo es, serán eliminados.
- **Punto de contacto**: un punto de contacto para la billetera nos ayudará enormemente a obtener información precisa cuando se realicen cambios. Esto mantendrá la actualización de ethereum.org manejable al recopilar información futura.
- **Transacciones EIP-1559 (tipo 2)**: tu billetera debe admitir transacciones EIP-1559 (tipo 2) para transacciones en la Red principal de Ethereum.
- **Buena experiencia de usuario**: aunque la experiencia de usuario (UX) es subjetiva, si varios miembros del equipo principal prueban el producto y les resulta difícil de usar, nos reservamos el derecho de rechazar la billetera y, en su lugar, proporcionaremos sugerencias útiles para mejorar. Esto se hace para proteger a nuestra base de usuarios, que está compuesta en su mayoría por principiantes.
- **Enfocada en Ethereum**: una billetera debe proporcionar una experiencia principal enfocada en Ethereum. Esto significa que Ethereum (o cualquier capa 2 (l2)) está configurada como la red predeterminada, los activos ERC son compatibles adecuadamente y las funciones están alineadas con el ecosistema de Ethereum. Las billeteras que prioricen en la interfaz de usuario (UI) capas 1 alternativas no serán listadas. 

### Eliminación de productos {#product-removals}

- **Información actualizada**: los proveedores de billeteras son responsables de volver a enviar la información de su billetera cada 6 meses para garantizar la validez y relevancia de la información proporcionada (incluso si no hay cambios en su producto). Si el equipo del producto no lo hace, ethereum.org puede eliminar el proyecto de la página. 

### Otros criterios: los deseables {#the-nice-to-haves}

- **Accesible globalmente**: tu billetera no tiene limitaciones geográficas ni requisitos de KYC que excluyan a ciertas personas de acceder a tu servicio.
- **Disponible en varios idiomas**: tu billetera está traducida a varios idiomas, lo que permite a usuarios de todo el mundo acceder a ella.
- **Código abierto**: el código base de todo tu proyecto (no solo los módulos) debe ser accesible y debes aceptar solicitudes de extracción (PR) de la comunidad en general.
- **Sin custodia**: los usuarios controlan sus fondos. Si tu producto desaparece, los usuarios aún pueden acceder y mover sus fondos.
- **Soporte para billetera de hardware**: los usuarios pueden conectar su billetera de hardware para firmar transacciones.
- **WalletConnect**: los usuarios pueden conectarse a aplicaciones descentralizadas (dapps) usando WalletConnect.
- **Importación de puntos de conexión RPC de Ethereum**: los usuarios pueden importar datos RPC de un nodo, lo que les permite conectarse a un nodo de su elección o a otras redes compatibles con la EVM.
- **NFT**: los usuarios pueden ver e interactuar con sus NFT en la billetera.
- **Conexión a aplicaciones de Ethereum**: los usuarios pueden conectarse y usar aplicaciones de Ethereum.
- **Staking**: los usuarios pueden hacer staking directamente a través de la billetera.
- **Intercambios**: los usuarios pueden intercambiar tokens a través de la billetera.
- **Redes multicadena**: tu billetera permite a los usuarios acceder a múltiples redes de cadenas de bloques por defecto.
- **Redes de capa 2**: tu billetera permite a los usuarios acceder a redes de capa 2 (l2) por defecto.
- **Personalización de tarifas de gas**: tu billetera permite a los usuarios personalizar las tarifas de gas de sus transacciones (tarifa base, tarifa de prioridad, tarifa máxima).
- **Soporte para ENS**: tu billetera permite a los usuarios enviar transacciones a nombres de ENS.
- **Soporte para ERC-20**: tu billetera permite a los usuarios importar contratos de tokens ERC-20, o consulta y muestra automáticamente los tokens ERC-20.
- **Comprar cripto**: tu billetera permite a los usuarios comprar directamente y facilita la incorporación a las cripto.
- **Vender por dinero fiduciario**: tu billetera permite a los usuarios vender y retirar dinero fiduciario directamente a una tarjeta o cuenta bancaria.
- **Multifirma**: tu billetera admite múltiples firmas para firmar una transacción.
- **Recuperación social**: tu billetera admite guardianes y un usuario puede recuperar su billetera si pierde su frase semilla utilizando a estos guardianes.
- **Equipo de soporte dedicado**: tu billetera cuenta con un equipo de soporte dedicado al que los usuarios pueden acudir cuando experimentan problemas.
- **Recursos educativos/documentación**: tu producto debe tener una experiencia de incorporación bien diseñada para ayudar y educar a los usuarios. O evidencia de contenido instructivo como artículos o videos.

## Añadir una billetera {#adding-a-wallet}

Si deseas añadir una billetera a ethereum.org, crea un problema (issue) en GitHub.

<ButtonLink href="https://github.com/ethereum/ethereum-org-website/issues/new?assignees=&labels=wallet+%3Apurse%3A&template=suggest_wallet.yaml">
  Crear un problema
</ButtonLink>

## Mantenimiento {#maintenance}

Dada la naturaleza fluida de Ethereum, los equipos y productos van y vienen, y la innovación ocurre a diario, por lo que realizaremos controles de rutina de nuestro contenido para:

- asegurarnos de que todas las billeteras y aplicaciones descentralizadas (dapps) listadas sigan cumpliendo con nuestros criterios
- verificar que no haya productos sugeridos que cumplan con más de nuestros criterios que los que están listados actualmente

ethereum.org es mantenido por la comunidad de código abierto y dependemos de ella para ayudar a mantener esto actualizado. Si notas alguna información sobre las billeteras listadas que necesite actualizarse, ¡por favor [abre un problema (issue)](https://github.com/ethereum/ethereum-org-website/issues/new?assignees=&labels=wallet+%3Apurse%3A&template=suggest_wallet.yaml) o una [solicitud de extracción (pull request)](https://github.com/ethereum/ethereum-org-website/pulls)!


## Términos de uso {#terms-of-use}

Por favor, consulta también nuestros [términos de uso](/terms-of-use/). La información en ethereum.org se proporciona únicamente con fines informativos generales.