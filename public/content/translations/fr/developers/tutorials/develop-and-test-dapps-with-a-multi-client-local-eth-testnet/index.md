---
title: "Comment développer et tester une application décentralisée (dapp) sur un réseau de test local multi-clients"
description: "Ce guide vous expliquera d'abord comment instancier et configurer un réseau de test Ethereum local multi-clients avant d'utiliser le réseau de test pour déployer et tester une application décentralisée (dapp)."
author: "Tedi Mitiku"
tags:
  [
    "clients",
    "nœuds",
    "contrats intelligents",
    "composabilité",
    "couche de consensus",
    "couche d'exécution",
    "tests",
  ]
skill: intermediate
breadcrumb: "Réseau de test multi-clients"
lang: fr
published: 2023-04-11
---

## Introduction {#introduction}

Ce guide vous accompagne dans le processus d'instanciation d'un réseau de test Ethereum local configurable, de déploiement d'un contrat intelligent sur celui-ci, et d'utilisation du réseau de test pour exécuter des tests sur votre application décentralisée (dapp). Ce guide est conçu pour les développeurs de dapps qui souhaitent développer et tester leurs dapps localement avec différentes configurations de réseau avant de les déployer sur un réseau de test public ou sur le Réseau principal.

Dans ce guide, vous allez :

- Instancier un réseau de test Ethereum local avec le [`ethereum-package`](https://github.com/ethpandaops/ethereum-package) en utilisant [Kurtosis](https://www.kurtosis.com/),
- Connecter votre environnement de développement de dapp Hardhat au réseau de test local pour compiler, déployer et tester une dapp, et
- Configurer le réseau de test local, y compris des paramètres tels que le nombre de nœuds et les paires spécifiques de clients EL/CL, pour permettre des flux de développement et de test sur diverses configurations de réseau.

### Qu'est-ce que Kurtosis ? {#what-is-kurtosis}

[Kurtosis](https://www.kurtosis.com/) est un système de construction composable conçu pour configurer des environnements de test multi-conteneurs. Il permet spécifiquement aux développeurs de créer des environnements reproductibles qui nécessitent une logique de configuration dynamique, tels que les réseaux de test de chaîne de blocs.

Dans ce guide, le `ethereum-package` Kurtosis, maintenu par [ethPandaOps](https://ethpandaops.io/), lance un réseau de test Ethereum local. Il prend en charge tous les principaux clients de la couche d'exécution (EL), tels que [`geth`](https://geth.ethereum.org/), et les clients de la couche de consensus (CL), tels que [`teku`](https://consensys.io/teku), [`lighthouse`](https://lighthouse.sigmaprime.io/), et [`lodestar`](https://lodestar.chainsafe.io/). Ce paquet sert d'alternative configurable et composable aux réseaux dans des frameworks comme Hardhat Network et Anvil. Kurtosis offre aux développeurs un contrôle et une flexibilité accrus sur les réseaux de test qu'ils utilisent, ce qui est l'une des principales raisons pour lesquelles les équipes de clients Ethereum l'utilisent pour tester les mises à niveau du réseau.

## Configuration de Kurtosis {#setting-up-kurtosis}

Avant de continuer, assurez-vous d'avoir :

- [Installé et démarré le moteur Docker](https://docs.kurtosis.com/install/#i-install--start-docker) sur votre machine locale
- [Installé l'interface en ligne de commande (CLI) Kurtosis](https://docs.kurtosis.com/install#ii-install-the-cli) (ou mis à niveau vers la dernière version, si vous l'avez déjà installée)
- Installé [Node.js](https://nodejs.org/en) (pour votre environnement de dapp)

## Instanciation d'un réseau de test Ethereum local {#instantiate-testnet}

Pour lancer un réseau de test Ethereum local, exécutez :

```sh
kurtosis run --enclave local-eth-testnet github.com/ethpandaops/ethereum-package
```

Remarque : Cette commande nomme votre réseau « local-eth-testnet » en utilisant l'indicateur `--enclave`.

Kurtosis affichera les étapes qu'il effectue en interne pendant qu'il interprète, valide, puis exécute les instructions. À la fin, il affiche un résumé de l'enclave qu'il a créée. Le résumé comprend une liste d'**artefacts de fichiers** et une liste de **services utilisateur**. Avec la configuration par défaut, les services utilisateur comprennent un seul nœud :

- `el-1-geth-lighthouse`, le client d'exécution `geth`
- `cl-1-lighthouse-geth`, le nœud balise `lighthouse`
- `vc-1-geth-lighthouse`, le client validateur `lighthouse`

Chaque service est répertorié avec les ports qu'il expose et le port local auquel chacun est mappé. Par exemple, le port `rpc` du service `el-1-geth-lighthouse` est le point de terminaison JSON-RPC que vos outils de dapp utiliseront. Les services exacts et les numéros de port seront différents sur votre machine.

Vous pouvez consulter ce résumé à tout moment en exécutant :

```sh
kurtosis enclave inspect local-eth-testnet
```

Félicitations ! Vous avez utilisé Kurtosis pour instancier un réseau de test Ethereum local, avec un client CL (`lighthouse`) et un client EL (`geth`), via Docker.

### Bilan {#review-instantiate-testnet}

Dans cette section, vous avez exécuté une commande qui a demandé à Kurtosis d'utiliser le [`ethereum-package` hébergé à distance sur GitHub](https://github.com/ethpandaops/ethereum-package) pour lancer un réseau de test Ethereum local au sein d'une [Enclave](https://docs.kurtosis.com/advanced-concepts/enclaves/) Kurtosis. À l'intérieur de votre enclave, vous trouverez à la fois des « artefacts de fichiers » et des « services utilisateur ».

Les [Artefacts de fichiers](https://docs.kurtosis.com/advanced-concepts/files-artifacts/) dans votre enclave comprennent toutes les données générées et utilisées pour amorcer les clients EL et CL, telles que les fichiers de genèse et les clés de validateur. Les données de genèse ont été créées à l'aide du [ethereum-genesis-generator](https://github.com/ethpandaops/ethereum-genesis-generator).

Les services utilisateur affichent tous les services conteneurisés fonctionnant dans votre enclave. Vous remarquerez qu'un seul nœud, comprenant à la fois un client EL et un client CL, a été créé.

## Connecter votre environnement de développement de dapp au réseau de test Ethereum local {#connect-your-dapp}

### Configurer l'environnement de développement de dapp {#set-up-dapp-env}

Maintenant que vous avez un réseau de test local en cours d'exécution, vous pouvez connecter votre environnement de développement de dapp pour utiliser votre réseau de test local. Le framework Hardhat sera utilisé dans ce guide pour déployer une dapp de blackjack sur votre réseau de test local.

Pour configurer votre environnement de développement de dapp, clonez le dépôt qui contient notre dapp d'exemple et installez ses dépendances, exécutez :

```sh
git clone https://github.com/kurtosis-tech/awesome-kurtosis.git
cd awesome-kurtosis/smart-contract-example
npm install --legacy-peer-deps
```

L'indicateur `--legacy-peer-deps` est nécessaire car certains des plugins Hardhat du projet d'exemple déclarent des versions de dépendances paires conflictuelles.

Le dossier [smart-contract-example](https://github.com/kurtosis-tech/awesome-kurtosis/tree/main/smart-contract-example) utilisé ici contient la configuration typique pour un développeur de dapp utilisant le framework [Hardhat](https://hardhat.org/) :

- [`contracts/`](https://github.com/kurtosis-tech/awesome-kurtosis/tree/main/smart-contract-example/contracts) contient quelques contrats intelligents simples pour une dapp de Blackjack
- [`scripts/`](https://github.com/kurtosis-tech/awesome-kurtosis/tree/main/smart-contract-example/scripts) contient un script pour déployer un contrat de jeton sur votre réseau Ethereum local
- [`test/`](https://github.com/kurtosis-tech/awesome-kurtosis/tree/main/smart-contract-example/test) contient un test .js simple pour votre contrat de jeton afin de confirmer que chaque joueur de notre dapp de Blackjack a 1000 jetons frappés pour lui
- [`hardhat.config.ts`](https://github.com/kurtosis-tech/awesome-kurtosis/blob/main/smart-contract-example/hardhat.config.ts) configure votre installation Hardhat

### Configurer Hardhat pour utiliser le réseau de test local {#configure-hardhat}

Avec votre environnement de développement de dapp configuré, vous allez maintenant connecter Hardhat pour utiliser le réseau de test Ethereum local généré à l'aide de Kurtosis. Tout d'abord, trouvez l'adresse locale du point de terminaison JSON-RPC du client d'exécution :

```sh
kurtosis port print local-eth-testnet el-1-geth-lighthouse rpc
```

La sortie est une URL telle que `http://127.0.0.1:32769`. Votre port sera différent. Remplacez `<PORT>` dans la structure `localnet` de votre fichier de configuration `hardhat.config.ts` par ce port.

Exemple dans `hardhat.config.ts` :

```js
localnet: {
  url: 'http://127.0.0.1:<PORT>',//TODO : REMPLACER <PORT> PAR LE PORT D'UNE URI DE NŒUD PRODUITE PAR LE PACKAGE KURTOSIS DU RÉSEAU ETH
  // Ce sont des clés privées associées à des comptes de test préfinancés créés par le eth-network-package
  //https://github.com/ethpandaops/ethereum-package/blob/main/src/prelaunch_data_generator/genesis_constants/genesis_constants.star
  accounts: [
    "bcdf20249abf0ed6d944c0288fad489e33f66b3960d9e6229c1cd214ed3bbe31",
    "53321db7c1e331d93a11a41d16f004d7ff63972ec8ec7c25db329728ceeb1710",
    "ab63b23eb7941c1251757e24b3d2350d2bc05c3c388d06f8fe6feafefb1e8c70",
    "5d2344259f42259f82d2c140aa66102ba89b57b4883ee441a8b312622bd42491",
    "27515f805127bebad2fb9b183508bdacb8c763da16f54e0678b16e8f28ef3fff",
    "7ff1a4c1d57e5e784d327c4c7651e952350bc271f156afb3d00d20f5ef924856",
  ],
},
```

Ces clés privées sont des clés de test publiquement connues. Ne les utilisez jamais sur le Réseau principal ou sur un réseau public.

Une fois que vous avez enregistré votre fichier, votre environnement de développement de dapp Hardhat est maintenant connecté à votre réseau de test Ethereum local ! Vous pouvez vérifier que votre réseau de test fonctionne en exécutant :

```sh
npx hardhat balances --network localnet
```

La sortie répertorie l'adresse et le solde de chacun des comptes ci-dessus. Par exemple, la première ligne devrait ressembler à ceci :

```
0x8943545177806ED17B9F23F0a21ee5948eCaa776 has balance <a large balance>
```

Cela confirme que Hardhat utilise votre réseau de test local et détecte les comptes préfinancés créés par le `ethereum-package`.

### Déployer et tester votre dapp localement {#deploy-and-test-dapp}

Avec l'environnement de développement de dapp entièrement connecté au réseau de test Ethereum local, vous pouvez maintenant exécuter des flux de développement et de test sur votre dapp en utilisant le réseau de test local.

Pour compiler et déployer le contrat intelligent `ChipToken.sol` pour le prototypage et le développement locaux, exécutez :

```sh
npx hardhat compile
npx hardhat run scripts/deploy.ts --network localnet
```

La sortie devrait ressembler à ceci :

```
ChipToken deployed to: 0xAb2A01BC351770D09611Ac80f1DE076D56E0487d
```

Essayez maintenant d'exécuter le test `ChipToken.js` sur votre dapp locale pour confirmer que chaque joueur de notre dapp de Blackjack a 1000 jetons frappés pour lui. Le test d'exemple utilise toujours la fonction `deployed()` d'ethers v5, qu'ethers v6 a remplacée par `waitForDeployment()`, mettez-la donc d'abord à jour :

```sh
sed -i.bak 's/\.deployed()/.waitForDeployment()/' test/ChipToken.js
```

Exécutez ensuite le test :

```sh
npx hardhat test --network localnet
```

La sortie devrait ressembler à ceci :

```
ChipToken
    mint
      ✔ should mint 1000 chips for PLAYER ONE

  1 passing (654ms)
```

### Bilan {#review-dapp-workflows}

À ce stade, vous avez configuré un environnement de développement de dapp, vous l'avez connecté à un réseau Ethereum local créé par Kurtosis, et vous avez compilé, déployé et exécuté un test simple sur votre dapp.

Explorons maintenant comment vous pouvez configurer le réseau sous-jacent pour tester nos dapps sous diverses configurations de réseau.

## Configuration du réseau de test Ethereum local {#configure-testnet}

### Modification des configurations des clients et du nombre de nœuds {#configure-client-config-and-num-nodes}

Votre réseau de test Ethereum local peut être configuré pour utiliser différentes paires de clients EL et CL, ainsi qu'un nombre variable de nœuds, en fonction du scénario et de la configuration de réseau spécifique que vous souhaitez développer ou tester. Cela signifie qu'une fois configuré, vous pouvez lancer un réseau de test local personnalisé et l'utiliser pour exécuter les mêmes flux de travail (déploiement, tests, etc.) sous diverses configurations de réseau pour vous assurer que tout fonctionne comme prévu. Pour en savoir plus sur les autres paramètres que vous pouvez modifier, consultez [la documentation de configuration du `ethereum-package`](https://github.com/ethpandaops/ethereum-package#configuration).

Essayez ! Vous pouvez transmettre diverses options de configuration au `ethereum-package` via un fichier YAML. Ce fichier de paramètres réseau fournit les configurations spécifiques que Kurtosis utilisera pour configurer le réseau Ethereum local.

Créez un fichier appelé `network_params.yaml` qui lance trois nœuds avec différentes paires EL/CL :

- Nœud 1 avec `geth`/`lighthouse`
- Nœud 2 avec `geth`/`lodestar`
- Nœud 3 avec `geth`/`teku`

Cette configuration crée un réseau hétérogène d'implémentations de nœuds Ethereum pour tester votre dapp. Votre fichier de configuration devrait ressembler à ceci :

```yaml
participants:
  - el_type: geth
    cl_type: lighthouse
  - el_type: geth
    cl_type: lodestar
  - el_type: geth
    cl_type: teku
network_params:
  seconds_per_slot: 12
```

Chaque entrée dans `participants` correspond à un nœud du réseau, donc 3 entrées `participants` indiqueront à Kurtosis de lancer 3 nœuds dans votre réseau. Chaque entrée vous permet de spécifier la paire EL et CL utilisée pour ce nœud spécifique. Tous les paramètres que vous ne spécifiez pas conservent leurs valeurs par défaut.

La structure `network_params` configure les paramètres réseau qui sont utilisés pour créer les fichiers de genèse pour chaque nœud ainsi que d'autres paramètres comme les secondes par créneau du réseau.

Enregistrez votre fichier de paramètres, puis utilisez-le pour exécuter votre paquet Kurtosis en lançant :

```sh
kurtosis clean -a && kurtosis run --enclave local-eth-testnet github.com/ethpandaops/ethereum-package --args-file ./network_params.yaml
```

Remarque : la commande `kurtosis clean -a` est utilisée ici pour demander à Kurtosis de détruire l'ancien réseau de test et son contenu avant d'en démarrer un nouveau.

Une fois de plus, Kurtosis travaillera un moment et affichera les étapes individuelles qui se déroulent. Finalement, il affiche le résumé de l'enclave. Cette fois, les services utilisateur comprennent trois nœuds, par exemple `el-1-geth-lighthouse`, `el-2-geth-lodestar` et `el-3-geth-teku` pour les clients d'exécution, ainsi que les clients de consensus et validateurs correspondants.

Félicitations ! Vous avez configuré avec succès votre réseau de test local pour avoir 3 nœuds au lieu de 1. Pour exécuter les mêmes flux de travail que précédemment sur votre dapp (déploiement et test), effectuez les mêmes opérations que précédemment en remplaçant le `<PORT>` dans la structure `localnet` de votre fichier de configuration `hardhat.config.ts` par le port `rpc` de n'importe quel service `el-<num>-...` dans votre nouveau réseau de test local à 3 nœuds.

## Conclusion {#conclusion}

Et c'est tout ! Pour résumer ce court guide, vous avez :

- Créé un réseau de test Ethereum local via Docker en utilisant Kurtosis
- Connecté votre environnement de développement de dapp local au réseau Ethereum local
- Déployé une dapp et exécuté un test simple sur celle-ci sur le réseau Ethereum local
- Configuré le réseau Ethereum sous-jacent pour avoir 3 nœuds

Nous serions ravis de savoir ce qui s'est bien passé pour vous, ce qui pourrait être amélioré, ou de répondre à vos questions. N'hésitez pas à nous contacter via [GitHub](https://github.com/kurtosis-tech/kurtosis/issues/new/choose) !

### Autres exemples et guides {#other-examples-guides}

Nous vous encourageons à consulter notre [démarrage rapide](https://docs.kurtosis.com/quickstart) et nos autres exemples dans notre [dépôt awesome-kurtosis](https://github.com/kurtosis-tech/awesome-kurtosis).

Le `ethereum-package` peut également démarrer des services supplémentaires aux côtés de votre réseau, tels qu'un spammeur de transactions (pour simuler des transactions), un explorateur de blocs, et des instances Grafana et Prometheus connectées. Pour les activer, listez-les sous `additional_services` dans votre fichier de paramètres, comme décrit dans [la documentation du paquet](https://github.com/ethpandaops/ethereum-package#configuration).
