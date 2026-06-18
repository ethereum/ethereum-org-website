---
title: IPFS para interfaces de usuario descentralizadas
description: Este tutorial enseña al lector cómo usar IPFS para almacenar la interfaz de usuario de una aplicación descentralizada (dapp). Aunque los datos y la lógica de negocio de la aplicación estén descentralizados, sin una interfaz de usuario resistente a la censura, los usuarios podrían perder el acceso a ella de todos modos.
author: Ori Pomerantz
tags:
  - ipfs
  - dapps
  - frontend
skill: beginner
breadcrumb: IPFS para interfaces de usuario de dapps
lang: es
published: 2024-06-29
---

Escribiste una nueva e increíble aplicación descentralizada (dapp). Incluso has escrito una [interfaz de usuario](/developers/tutorials/creating-a-wagmi-ui-for-your-contract/) para ella. Pero ahora temes que alguien intente censurarla derribando tu interfaz de usuario, que no es más que un servidor en la nube. En este tutorial aprenderás cómo evitar la censura subiendo tu interfaz de usuario al **[sistema de archivos interplanetario (IPFS)](https://ipfs.tech/developers/)** para que cualquier persona interesada pueda fijarla en un servidor para acceder a ella en el futuro.

Podrías usar un servicio de terceros como [Fleek](https://resources.fleek.xyz/docs/) para que haga todo el trabajo. Este tutorial es para personas que quieren hacer lo suficiente para entender lo que están haciendo, incluso si supone más trabajo.

## Empezando a nivel local {#getting-started-locally}

Existen múltiples [proveedores de IPFS de terceros](https://docs.ipfs.tech/how-to/work-with-pinning-services/#use-a-third-party-pinning-service), pero es mejor empezar ejecutando IPFS localmente para hacer pruebas.

1. Instala la [interfaz de usuario de IPFS](https://docs.ipfs.tech/install/ipfs-desktop/#install-instructions).

2. Crea un directorio con tu sitio web. Si estás usando [Vite](https://vite.dev/), usa este comando:

   ```sh
   pnpm vite build
   ```

3. En IPFS Desktop, haz clic en **Import > Folder** (Importar > Carpeta) y selecciona el directorio que creaste en el paso anterior.

4. Selecciona la carpeta que acabas de subir y haz clic en **Rename** (Renombrar). Dale un nombre más descriptivo.

5. Selecciónala de nuevo y haz clic en **Share link** (Compartir enlace). Copia la URL al portapapeles. El enlace será similar a `https://ipfs.io/ipfs/QmaCuQ7yN6iyBjLmLGe8YiFuCwnePoKfVu6ue8vLBsLJQJ`.

6. Haz clic en **Status** (Estado). Expande la pestaña **Advanced** (Avanzado) para ver la dirección de la puerta de enlace. Por ejemplo, en mi sistema la dirección es `http://127.0.0.1:8080`.

7. Combina la ruta del paso del enlace con la dirección de la puerta de enlace para encontrar tu dirección. Por ejemplo, para el caso anterior, la URL es `http://127.0.0.1:8080/ipfs/QmaCuQ7yN6iyBjLmLGe8YiFuCwnePoKfVu6ue8vLBsLJQJ`. Abre esa URL en un navegador para ver tu sitio.

## Subiendo los archivos {#uploading}

Así que ahora puedes usar IPFS para servir archivos localmente, lo cual no es muy emocionante. El siguiente paso es hacer que estén disponibles para todo el mundo cuando estés desconectado.

Hay varios [servicios de fijación (pinning)](https://docs.ipfs.tech/concepts/persistence/#pinning-services) muy conocidos. Elige uno de ellos. Sea cual sea el servicio que utilices, tendrás que crear una cuenta y proporcionarle el **identificador de contenido (CID)** en tu IPFS Desktop.

Personalmente, me pareció que [4EVERLAND](https://docs.4everland.org/storage/4ever-pin/guides) es el más fácil de usar. Aquí tienes las instrucciones para hacerlo:

1. Ve al [panel de control](https://dashboard.4everland.org/overview) e inicia sesión con tu billetera.

2. En la barra lateral izquierda, haz clic en **Storage > 4EVER Pin**.

3. Haz clic en **Upload > Selected CID**. Dale un nombre a tu contenido y proporciona el CID de IPFS Desktop. En la actualidad, un CID es una cadena que comienza con `Qm` seguida de 44 letras y dígitos que representan un hash [codificado en base-58](https://medium.com/bootdotdev/base64-vs-base58-encoding-c25553ff4524), como `QmaCuQ7yN6iyBjLmLGe8YiFuCwnePoKfVu6ue8vLBsLJQJ`, pero [es probable que esto cambie](https://docs.ipfs.tech/concepts/content-addressing/#version-1-v1).

4. El estado inicial es **Queued** (En cola). Recarga la página hasta que cambie a **Pinned** (Fijado).

5. Haz clic en tu CID para obtener el enlace. Puedes ver mi aplicación [aquí](https://bafybeifqka2odrne5b6l5guthqvbxu4pujko2i6rx2zslvr3qxs6u5o7im.ipfs.dweb.link/).

6. Es posible que necesites activar tu cuenta para mantenerlo fijado durante más de un mes. La activación de la cuenta cuesta alrededor de 1 $. Si la cerraste, cierra sesión y vuelve a entrar para que se te pida activarla de nuevo.

## Uso desde IPFS {#using-from-ipfs}

Llegados a este punto, tienes un enlace a una puerta de enlace centralizada que sirve tu contenido de IPFS. En resumen, tu interfaz de usuario puede ser un poco más segura, pero todavía no es resistente a la censura. Para lograr una verdadera resistencia a la censura, los usuarios deben usar IPFS [directamente desde un navegador](https://docs.ipfs.tech/install/ipfs-companion/#prerequisites).

Una vez que lo tengas instalado (y el IPFS de escritorio funcionando), puedes ir a [/ipfs/`<CID>`](https://any.site/ipfs/bafybeifqka2odrne5b6l5guthqvbxu4pujko2i6rx2zslvr3qxs6u5o7im) en cualquier sitio y obtendrás ese contenido, servido de manera descentralizada.

## Inconvenientes {#drawbacks}

No puedes eliminar archivos de IPFS de forma fiable, por lo que mientras estés modificando tu interfaz de usuario, probablemente sea mejor dejarla centralizada o usar el [sistema de nombres interplanetario (IPNS)](https://docs.ipfs.tech/concepts/ipns/#mutability-in-ipfs), un sistema que proporciona mutabilidad sobre IPFS. Por supuesto, cualquier cosa que sea mutable puede ser censurada, en el caso de IPNS presionando a la persona que posee la clave privada a la que corresponde.

Además, algunos paquetes tienen problemas con IPFS, por lo que si tu sitio web es muy complicado, puede que no sea una buena solución. Y, por supuesto, cualquier cosa que dependa de la integración con un servidor no puede descentralizarse simplemente teniendo el lado del cliente en IPFS.

## Descubrimiento a través de ENS {#discoverability}

Si apuntas un nombre de ENS (como vitalik.eth) a tu sitio web, se considerará una página web totalmente descentralizada y será fijada automáticamente por el servicio [dweb3.wtf](https://dweb3.wtf), además de poder buscarse a través del motor de búsqueda [web3compass.net](https://web3compass.net), de forma muy parecida a como lo hacen DuckDuckGo, Brave Search o Google para la web tradicional.

## Conclusión {#conclusion}

Al igual que Ethereum te permite descentralizar los aspectos de la base de datos y la lógica de negocio de tu aplicación descentralizada (dapp), IPFS te permite descentralizar la interfaz de usuario. Esto te permite cerrar un vector de ataque más contra tu dapp.

[Mira aquí para ver más de mi trabajo](https://cryptodocguy.pro/).