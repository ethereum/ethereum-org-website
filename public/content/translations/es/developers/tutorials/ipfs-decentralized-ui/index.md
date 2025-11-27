---
title: IPFS para interfaces de usuario descentralizadas
description: Este tutorial enseña al lector cómo usar IPFS para almacenar la interfaz de usuario de una dapp. Aunque los datos y la lógica de negocio de la aplicación estén descentralizados, sin una interfaz de usuario resistente a la censura, los usuarios podrían perder el acceso a ella de todos modos.
author: Ori Pomerantz
tags: [ "ipfs" ]
skill: principiante
lang: es
published: 2024-06-29
---

Ha escrito una nueva e increíble dapp. Incluso ha escrito una [interfaz de usuario](/developers/tutorials/creating-a-wagmi-ui-for-your-contract/) para ella. Pero ahora teme que alguien intente censurarla tumbando su interfaz de usuario, que no es más que un servidor en la nube. En este tutorial aprenderá cómo evitar la censura poniendo su interfaz de usuario en el **[sistema de archivos interplanetario (IPFS)](https://ipfs.tech/developers/)** para que cualquiera que esté interesado pueda fijarla en un servidor para su futuro acceso.

Podría utilizar un servicio de terceros como [Fleek](https://resources.fleek.xyz/docs/) para hacer todo el trabajo. Este tutorial es para personas que quieren hacer lo suficiente para entender lo que están haciendo, aunque suponga más trabajo.

## Primeros pasos en local {#getting-started-locally}

Existen múltiples [proveedores de IPFS de terceros](https://docs.ipfs.tech/how-to/work-with-pinning-services/#use-a-third-party-pinning-service), pero es mejor empezar ejecutando IPFS localmente para realizar pruebas.

1. Instale la [interfaz de usuario de IPFS](https://docs.ipfs.tech/install/ipfs-desktop/#install-instructions).

2. Cree un directorio con su sitio web. Si utiliza [Vite](https://vite.dev/), use este comando:

   ```sh
   pnpm vite build
   ```

3. En IPFS Desktop, haga clic en **Import > Folder** y seleccione el directorio que creó en el paso anterior.

4. Seleccione la carpeta que acaba de subir y haga clic en **Rename**. Póngale un nombre más significativo.

5. Vuelva a seleccionarla y haga clic en **Share link**. Copie la URL en el portapapeles. El enlace sería similar a `https://ipfs.io/ipfs/QmaCuQ7yN6iyBjLmLGe8YiFuCwnePoKfVu6ue8vLBsLJQJ`.

6. Haga clic en **Status**. Despliegue la pestaña **Advanced** para ver la dirección de la puerta de enlace. Por ejemplo, en mi sistema la dirección es `http://127.0.0.1:8080`.

7. Combine la ruta del paso del enlace con la dirección de la puerta de enlace para encontrar su dirección. Por ejemplo, para el ejemplo anterior, la URL es `http://127.0.0.1:8080/ipfs/QmaCuQ7yN6iyBjLmLGe8YiFuCwnePoKfVu6ue8vLBsLJQJ`. Abra esa URL en un navegador para ver su sitio.

## Subiendo {#uploading}

Así que ahora puede usar IPFS para servir archivos localmente, lo que no es muy emocionante. El siguiente paso es ponerlos a disposición del mundo cuando usted no esté conectado.

Hay una serie de [servicios de fijado](https://docs.ipfs.tech/concepts/persistence/#pinning-services) bien conocidos. Elija uno de ellos. Sea cual sea el servicio que utilice, necesita crear una cuenta y proporcionarle el **identificador de contenido (CID)** de su escritorio IPFS.

Personalmente, [4EVERLAND](https://docs.4everland.org/storage/4ever-pin/guides) me pareció el más fácil de usar. Aquí están las instrucciones para ello:

1. Vaya a [el panel de control](https://dashboard.4everland.org/overview) e inicie sesión con su monedero.

2. En la barra lateral izquierda, haga clic en **Storage > 4EVER Pin**.

3. Haga clic en **Upload > Selected CID**. Ponga un nombre a su contenido y proporcione el CID del escritorio de IPFS. Actualmente, un CID es una cadena que empieza por `Qm` seguida de 44 letras y dígitos que representan un hash [codificado en base-58](https://medium.com/bootdotdev/base64-vs-base58-encoding-c25553ff4524), como `QmaCuQ7yN6iyBjLmLGe8YiFuCwnePoKfVu6ue8vLBsLJQJ`, pero [es probable que eso cambie](https://docs.ipfs.tech/concepts/content-addressing/#version-1-v1).

4. El estado inicial es **Queued**. Recargue hasta que cambie a **Pinned**.

5. Haga clic en su CID para obtener el enlace. Puede ver mi aplicación [aquí](https://bafybeifqka2odrne5b6l5guthqvbxu4pujko2i6rx2zslvr3qxs6u5o7im.ipfs.dweb.link/).

6. Es posible que necesite activar su cuenta para mantenerla fijada durante más de un mes. La activación de la cuenta cuesta alrededor de 1 $. Si lo ha cerrado, cierre la sesión y vuelva a iniciarla para que se le pida que la active de nuevo.

## Uso desde IPFS {#using-from-ipfs}

En este punto, tiene un enlace a una puerta de enlace centralizada que sirve su contenido de IPFS. En resumen, su interfaz de usuario puede ser un poco más segura, pero todavía no es resistente a la censura. Para una verdadera resistencia a la censura, los usuarios necesitan usar IPFS [directamente desde un navegador](https://docs.ipfs.tech/install/ipfs-companion/#prerequisites).

Una vez que lo tenga instalado (y el escritorio de IPFS funcionando), puede ir a [/ipfs/`<CID>`](https://any.site/ipfs/bafybeifqka2odrne5b6l5guthqvbxu4pujko2i6rx2zslvr3qxs6u5o7im) en cualquier sitio y obtendrá ese contenido, servido de forma descentralizada.

## Inconvenientes {#drawbacks}

No se pueden eliminar los archivos IPFS de forma fiable, por lo que mientras esté modificando su interfaz de usuario, probablemente sea mejor dejarla centralizada, o utilizar el [sistema de nombres interplanetario (IPNS)](https://docs.ipfs.tech/concepts/ipns/#mutability-in-ipfs), un sistema que proporciona mutabilidad sobre IPFS. Por supuesto, todo lo que es mutable puede ser censurado, en el caso de IPNS presionando a la persona que tiene la clave privada a la que corresponde.

Además, algunos paquetes tienen problemas con IPFS, por lo que si su sitio web es muy complicado puede que no sea una buena solución. Y, por supuesto, todo lo que depende de la integración con el servidor no puede descentralizarse simplemente por tener el lado del cliente en IPFS.

## Conclusión {#conclusion}

Así como Ethereum le permite descentralizar la base de datos y los aspectos de lógica de negocio de su dapp, IPFS le permite descentralizar la interfaz de usuario. Esto le permite cerrar un vector de ataque más contra su dapp.

[Vea aquí más de mi trabajo](https://cryptodocguy.pro/).
