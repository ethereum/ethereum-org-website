---
title: IPFS pour les interfaces utilisateur décentralisées
description: Ce tutoriel apprend au lecteur comment utiliser IPFS pour stocker l'interface utilisateur d'une dapp. Bien que les données et la logique métier de l'application soient décentralisées, sans une interface utilisateur résistante à la censure, les utilisateurs pourraient tout de même en perdre l'accès.
author: Ori Pomerantz
tags:
  - ipfs
  - dapps
  - front-end
skill: beginner
breadcrumb: IPFS pour les interfaces utilisateur de dapps
lang: fr
published: 2024-06-29
---

Vous avez écrit une nouvelle application décentralisée (dapp) incroyable. Vous avez même écrit une [interface utilisateur](/developers/tutorials/creating-a-wagmi-ui-for-your-contract/) pour celle-ci. Mais maintenant, vous craignez que quelqu'un tente de la censurer en mettant hors ligne votre interface utilisateur, qui n'est qu'un simple serveur dans le cloud. Dans ce tutoriel, vous apprendrez comment éviter la censure en hébergeant votre interface utilisateur sur le **[système de fichiers interplanétaire (IPFS)](https://ipfs.tech/developers/)** afin que toute personne intéressée puisse l'épingler sur un serveur pour un accès futur.

Vous pourriez utiliser un service tiers tel que [Fleek](https://resources.fleek.xyz/docs/) pour faire tout le travail. Ce tutoriel s'adresse aux personnes qui souhaitent en faire suffisamment pour comprendre ce qu'elles font, même si cela demande plus de travail.

## Commencer localement {#getting-started-locally}

Il existe de multiples [fournisseurs IPFS tiers](https://docs.ipfs.tech/how-to/work-with-pinning-services/#use-a-third-party-pinning-service), mais il est préférable de commencer par exécuter IPFS localement pour faire des tests.

1. Installez l'[interface utilisateur IPFS](https://docs.ipfs.tech/install/ipfs-desktop/#install-instructions).

2. Créez un répertoire avec votre site web. Si vous utilisez [Vite](https://vite.dev/), utilisez cette commande :

   ```sh
   pnpm vite build
   ```

3. Dans IPFS Desktop, cliquez sur **Import > Folder** (Importer > Dossier) et sélectionnez le répertoire que vous avez créé à l'étape précédente.

4. Sélectionnez le dossier que vous venez de téléverser et cliquez sur **Rename** (Renommer). Donnez-lui un nom plus significatif.

5. Sélectionnez-le à nouveau et cliquez sur **Share link** (Partager le lien). Copiez l'URL dans le presse-papiers. Le lien sera similaire à `https://ipfs.io/ipfs/QmaCuQ7yN6iyBjLmLGe8YiFuCwnePoKfVu6ue8vLBsLJQJ`.

6. Cliquez sur **Status** (Statut). Développez l'onglet **Advanced** (Avancé) pour voir l'adresse de la passerelle. Par exemple, sur mon système, l'adresse est `http://127.0.0.1:8080`.

7. Combinez le chemin de l'étape du lien avec l'adresse de la passerelle pour trouver votre adresse. Par exemple, pour l'exemple ci-dessus, l'URL est `http://127.0.0.1:8080/ipfs/QmaCuQ7yN6iyBjLmLGe8YiFuCwnePoKfVu6ue8vLBsLJQJ`. Ouvrez cette URL dans un navigateur pour voir votre site.

## Téléversement {#uploading}

Vous pouvez donc maintenant utiliser IPFS pour servir des fichiers localement, ce qui n'est pas très excitant. L'étape suivante consiste à les rendre disponibles pour le monde entier lorsque vous êtes hors ligne.

Il existe un certain nombre de [services d'épinglage](https://docs.ipfs.tech/concepts/persistence/#pinning-services) bien connus. Choisissez-en un. Quel que soit le service que vous utilisez, vous devez créer un compte et lui fournir l'**identifiant de contenu (CID)** présent dans votre IPFS Desktop.

Personnellement, j'ai trouvé que [4EVERLAND](https://docs.4everland.org/storage/4ever-pin/guides) était le plus facile à utiliser. Voici les instructions pour l'utiliser :

1. Accédez au [tableau de bord](https://dashboard.4everland.org/overview) et connectez-vous avec votre portefeuille.

2. Dans la barre latérale gauche, cliquez sur **Storage > 4EVER Pin**.

3. Cliquez sur **Upload > Selected CID**. Donnez un nom à votre contenu et fournissez le CID provenant d'IPFS Desktop. Actuellement, un CID est une chaîne de caractères qui commence par `Qm` suivie de 44 lettres et chiffres qui représentent un hash [encodé en base-58](https://medium.com/bootdotdev/base64-vs-base58-encoding-c25553ff4524), tel que `QmaCuQ7yN6iyBjLmLGe8YiFuCwnePoKfVu6ue8vLBsLJQJ`, mais [cela est susceptible de changer](https://docs.ipfs.tech/concepts/content-addressing/#version-1-v1).

4. Le statut initial est **Queued** (En file d'attente). Rechargez la page jusqu'à ce qu'il passe à **Pinned** (Épinglé).

5. Cliquez sur votre CID pour obtenir le lien. Vous pouvez voir mon application [ici](https://bafybeifqka2odrne5b6l5guthqvbxu4pujko2i6rx2zslvr3qxs6u5o7im.ipfs.dweb.link/).

6. Vous devrez peut-être activer votre compte pour qu'il reste épinglé pendant plus d'un mois. L'activation du compte coûte environ 1 $. Si vous l'avez fermé, déconnectez-vous puis reconnectez-vous pour qu'on vous demande de l'activer à nouveau.

## Utilisation depuis IPFS {#using-from-ipfs}

À ce stade, vous disposez d'un lien vers une passerelle centralisée qui sert votre contenu IPFS. En bref, votre interface utilisateur est peut-être un peu plus sûre, mais elle n'est toujours pas résistante à la censure. Pour une véritable résistance à la censure, les utilisateurs doivent utiliser IPFS [directement depuis un navigateur](https://docs.ipfs.tech/install/ipfs-companion/#prerequisites).

Une fois que vous l'avez installé (et qu'IPFS Desktop fonctionne), vous pouvez aller sur [/ipfs/`<CID>`](https://any.site/ipfs/bafybeifqka2odrne5b6l5guthqvbxu4pujko2i6rx2zslvr3qxs6u5o7im) sur n'importe quel site et vous obtiendrez ce contenu, servi de manière décentralisée.

## Inconvénients {#drawbacks}

Vous ne pouvez pas supprimer de manière fiable des fichiers IPFS, donc tant que vous modifiez votre interface utilisateur, il est probablement préférable de la laisser centralisée, ou d'utiliser le [système de noms interplanétaire (IPNS)](https://docs.ipfs.tech/concepts/ipns/#mutability-in-ipfs), un système qui offre de la mutabilité par-dessus IPFS. Bien sûr, tout ce qui est mutable peut être censuré, dans le cas d'IPNS en faisant pression sur la personne possédant la clé privée à laquelle il correspond.

De plus, certains paquets ont des problèmes avec IPFS, donc si votre site web est très complexe, ce n'est peut-être pas une bonne solution. Et bien sûr, tout ce qui repose sur une intégration serveur ne peut pas être décentralisé simplement en ayant le côté client sur IPFS.

## Découvrabilité via ENS {#discoverability}

Si vous faites pointer un nom ENS (comme vitalik.eth) vers votre site web, il sera considéré comme une page web entièrement décentralisée et sera automatiquement épinglé par le service [dweb3.wtf](https://dweb3.wtf), ainsi que rendu consultable via le moteur de recherche [web3compass.net](https://web3compass.net), un peu comme le font DuckDuckGo, Brave Search ou Google pour le web traditionnel.

## Conclusion {#conclusion}

Tout comme Ethereum vous permet de décentraliser les aspects de base de données et de logique métier de votre application décentralisée (dapp), IPFS vous permet de décentraliser l'interface utilisateur. Cela vous permet de fermer un vecteur d'attaque supplémentaire contre votre dapp.

[Voir ici pour plus de mes travaux](https://cryptodocguy.pro/).