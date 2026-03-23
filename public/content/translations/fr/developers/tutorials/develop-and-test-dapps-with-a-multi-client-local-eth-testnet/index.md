---
title: "Comment développer et tester une dApp sur un réseau de test local multi-clients"
description: "Ce guide vous expliquera d'abord comment instancier et configurer un réseau de test Ethereum local multi-clients avant d'utiliser le réseau de test pour déployer et tester une dApp."
author: "Tedi Mitiku"
tags:
  [
    "clients",
    "nœuds",
    "contrats intelligents",
    "composabilité",
    "couche de consensus",
    "couche d'exécution",
    "test"
  ]
skill: intermediate
lang: fr
published: 2023-04-11
---

## Introduction {#introduction}

Ce guide vous explique comment instancier un réseau de test Ethereum local configurable, y déployer un contrat intelligent et utiliser ce réseau de test pour exécuter des tests sur votre dApp. Ce guide est conçu pour les développeurs de dApps qui souhaitent développer et tester leurs dApps localement avec différentes configurations de réseau avant de les déployer sur un réseau de test public ou sur le réseau principal.

Dans ce guide, vous allez :

- Instancier un réseau de test Ethereum local avec le [`eth-network-package`](https://github.com/kurtosis-tech/eth-network-package) en utilisant [Kurtosis](https://www.kurtosis.com/),
- Connecter votre environnement de développement de dApp Hardhat au réseau de test local pour compiler, déployer et tester une dApp, et
- Configurer le réseau de test local, y compris des paramètres comme le nombre de nœuds et les paires de clients EL/CL spécifiques, pour permettre des flux de travail de développement et de test sur diverses configurations de réseau.

### Qu'est-ce que Kurtosis ? {#what-is-kurtosis}

[Kurtosis](https://www.kurtosis.com/) est un système de construction composable conçu pour configurer des environnements de test multi-conteneurs. Il permet spécifiquement aux développeurs de créer des environnements reproductibles qui nécessitent une logique de configuration dynamique, comme les réseaux de test de blockchain.

Dans ce guide, le paquet eth-network-package de Kurtosis lance un réseau de test Ethereum local avec prise en charge du client de couche d'exécution (EL) [`geth`](https://geth.ethereum.org/), ainsi que des clients de couche de consensus (CL) [`teku`](https://consensys.io/teku), [`lighthouse`](https://lighthouse.sigmaprime.io/) et [`lodestar`](https://lodestar.chainsafe.io/). Ce paquet sert d'alternative configurable et composable aux réseaux dans des cadres de développement comme Hardhat Network, Ganache et Anvil. Kurtosis offre aux développeurs un contrôle et une flexibilité accrus sur les réseaux de test qu'ils utilisent, ce qui est l'une des raisons principales pour lesquelles la [Fondation Ethereum a utilisé Kurtosis pour tester la Fusion](https://www.kurtosis.com/blog/testing-the-ethereum-merge) et continue de l'utiliser pour tester les mises à niveau du réseau.

## Configuration de Kurtosis {#setting-up-kurtosis}

Avant de continuer, assurez-vous d'avoir :

- [Installé et démarré le moteur Docker](https://docs.kurtosis.com/install/#i-install--start-docker) sur votre machine locale
- [Installé la CLI Kurtosis](https://docs.kurtosis.com/install#ii-install-the-cli) (ou l'avoir mise à niveau vers la dernière version, si vous avez déjà installé la CLI)
- Installé [Node.js](https://nodejs.org/en), [yarn](https://classic.yarnpkg.com/lang/en/docs/install/#mac-stable), et [npx](https://www.npmjs.com/package/npx) (pour votre environnement de dApp)

## Instanciation d'un réseau de test Ethereum local {#instantiate-testnet}

Pour lancer un réseau de test Ethereum local, exécutez :

```python
kurtosis --enclave local-eth-testnet run github.com/kurtosis-tech/eth-network-package
```

Remarque : cette commande nomme votre réseau « local-eth-testnet » à l'aide de l'indicateur `--enclave`.

Kurtosis affichera les étapes qu'il exécute en arrière-plan pendant qu'il interprète, valide, puis exécute les instructions. À la fin, vous devriez voir une sortie qui ressemble à ce qui suit :

```python
INFO[2023-04-04T18:09:44-04:00] ======================================================
INFO[2023-04-04T18:09:44-04:00] ||          Created enclave: local-eth-testnet      ||
INFO[2023-04-04T18:09:44-04:00] ======================================================
Name:            local-eth-testnet
UUID:            39372d756ae8
Status:          RUNNING
Creation Time:   Tue, 04 Apr 2023 18:09:03 EDT

========================================= Files Artifacts =========================================
UUID           Name
d4085a064230   cl-genesis-data
1c62cb792e4c   el-genesis-data
bd60489b73a7   genesis-generation-config-cl
b2e593fe5228   genesis-generation-config-el
d552a54acf78   geth-prefunded-keys
5f7e661eb838   prysm-password
054e7338bb59   validator-keystore-0

========================================== User Services ==========================================
UUID           Name                                           Ports                                         Status
e20f129ee0c5   cl-client-0-beacon                             http: 4000/tcp -> <http://127.0.0.1:54261>    RUNNING
                                                              metrics: 5054/tcp -> <http://127.0.0.1:54262>
                                                              tcp-discovery: 9000/tcp -> 127.0.0.1:54263
                                                              udp-discovery: 9000/udp -> 127.0.0.1:60470
a8b6c926cdb4   cl-client-0-validator                          http: 5042/tcp -> 127.0.0.1:54267             RUNNING
                                                              metrics: 5064/tcp -> <http://127.0.0.1:54268>
d7b802f623e8   el-client-0                                    engine-rpc: 8551/tcp -> 127.0.0.1:54253       RUNNING
                                                              rpc: 8545/tcp -> 127.0.0.1:54251
                                                              tcp-discovery: 30303/tcp -> 127.0.0.1:54254
                                                              udp-discovery: 30303/udp -> 127.0.0.1:53834
                                                              ws: 8546/tcp -> 127.0.0.1:54252
514a829c0a84   prelaunch-data-generator-1680646157905431468   <none>                                        STOPPED
62bd62d0aa7a   prelaunch-data-generator-1680646157915424301   <none>                                        STOPPED
05e9619e0e90   prelaunch-data-generator-1680646157922872635   <none>                                        STOPPED

```

Félicitations ! Vous avez utilisé Kurtosis pour instancier un réseau de test Ethereum local, avec un client CL (`lighthouse`) et un client EL (`geth`), via Docker.

### Résumé {#review-instantiate-testnet}

Dans cette section, vous avez exécuté une commande qui a demandé à Kurtosis d'utiliser le [`eth-network-package` hébergé à distance sur GitHub](https://github.com/kurtosis-tech/eth-network-package) pour lancer un réseau de test Ethereum local dans une [Enclave](https://docs.kurtosis.com/advanced-concepts/enclaves/) Kurtosis. À l'intérieur de votre enclave, vous trouverez à la fois des « artefacts de fichiers » et des « services utilisateur ».

Les [Artefacts de fichiers](https://docs.kurtosis.com/advanced-concepts/files-artifacts/) dans votre enclave incluent toutes les données générées et utilisées pour amorcer les clients EL et CL. Les données ont été créées à l'aide du service `prelaunch-data-generator` construit à partir de cette [image Docker](https://github.com/ethpandaops/ethereum-genesis-generator)

Les services utilisateur affichent tous les services conteneurisés fonctionnant dans votre enclave. Vous remarquerez qu'un seul nœud, comprenant à la fois un client EL et un client CL, a été créé.

## Connecter votre environnement de développement de dApp au réseau de test Ethereum local {#connect-your-dapp}

### Configurer l'environnement de développement de la dApp {#set-up-dapp-env}

Maintenant que vous disposez d'un réseau de test local en cours d'exécution, vous pouvez connecter votre environnement de développement de dApp pour utiliser votre réseau de test local. Le cadre de développement Hardhat sera utilisé dans ce guide pour déployer une dApp de blackjack sur votre réseau de test local.

Pour configurer votre environnement de développement de dApp, clonez le dépôt qui contient notre exemple de dApp et installez ses dépendances, exécutez :

```python
git clone https://github.com/kurtosis-tech/awesome-kurtosis.git && cd awesome-kurtosis/smart-contract-example && yarn
```

Le dossier [smart-contract-example](https://github.com/kurtosis-tech/awesome-kurtosis/tree/main/smart-contract-example) utilisé ici contient la configuration typique pour un développeur de dApp utilisant le cadre de développement [Hardhat](https://hardhat.org/) :

- [`contracts/`](https://github.com/kurtosis-tech/awesome-kurtosis/tree/main/smart-contract-example/contracts) contient quelques contrats intelligents simples pour une dApp de Blackjack
- [`scripts/`](https://github.com/kurtosis-tech/awesome-kurtosis/tree/main/smart-contract-example/scripts) contient un script pour déployer un contrat de jeton sur votre réseau Ethereum local
- [`test/`](https://github.com/kurtosis-tech/awesome-kurtosis/tree/main/smart-contract-example/test) contient un simple test .js pour votre contrat de jeton afin de confirmer que chaque joueur de notre dApp de Blackjack a reçu 1000 jetons frappés pour lui
- [`hardhat.config.ts`](https://github.com/kurtosis-tech/awesome-kurtosis/blob/main/smart-contract-example/hardhat.config.ts) configure votre installation Hardhat

### Configurer Hardhat pour utiliser le réseau de test local {#configure-hardhat}

Une fois votre environnement de développement de dApp configuré, vous allez maintenant connecter Hardhat pour utiliser le réseau de test Ethereum local généré à l'aide de Kurtosis. Pour ce faire, remplacez `<$YOUR_PORT>` dans la structure `localnet` de votre fichier de configuration `hardhat.config.ts` par le port de la sortie de l'URI rpc de n'importe quel service `el-client-<num>`. Dans cet exemple, le port serait `64248`. Votre port sera différent.

Exemple dans `hardhat.config.ts` :

```js
localnet: {
url: 'http://127.0.0.1:<$YOUR_PORT>',// TODO : REMPLACEZ $YOUR_PORT PAR LE PORT D'UNE URI DE NŒUD PRODUITE PAR LE PAQUETAGE KURTOSIS DU RÉSEAU ETH

// Il s'agit de clés privées associées à des comptes de test pré-financés créés par le paquetage eth-network-package
// <https://github.com/kurtosis-tech/eth-network-package/blob/main/src/prelaunch_data_generator/genesis_constants/genesis_constants.star>
accounts: [
    "ef5177cd0b6b21c87db5a0bf35d4084a8a57a9d6a064f86d51ac85f2b873a4e2",
    "48fcc39ae27a0e8bf0274021ae6ebd8fe4a0e12623d61464c498900b28feb567",
    "7988b3a148716ff800414935b305436493e1f25237a2a03e5eebc343735e2f31",
    "b3c409b6b0b3aa5e65ab2dc1930534608239a478106acf6f3d9178e9f9b00b35",
    "df9bb6de5d3dc59595bcaa676397d837ff49441d211878c024eabda2cd067c9f",
    "7da08f856b5956d40a72968f93396f6acff17193f013e8053f6fbb6c08c194d6",
  ],
},
```

Une fois que vous avez enregistré votre fichier, votre environnement de développement de dApp Hardhat est maintenant connecté à votre réseau de test Ethereum local ! Vous pouvez vérifier que votre réseau de test fonctionne en exécutant :

```python
npx hardhat balances --network localnet
```

La sortie devrait ressembler à ceci :

```python
0x878705ba3f8Bc32FCf7F4CAa1A35E72AF65CF766 has balance 10000000000000000000000000
0x4E9A3d9D1cd2A2b2371b8b3F489aE72259886f1A has balance 10000000000000000000000000
0xdF8466f277964Bb7a0FFD819403302C34DCD530A has balance 10000000000000000000000000
0x5c613e39Fc0Ad91AfDA24587e6f52192d75FBA50 has balance 10000000000000000000000000
0x375ae6107f8cC4cF34842B71C6F746a362Ad8EAc has balance 10000000000000000000000000
0x1F6298457C5d76270325B724Da5d1953923a6B88 has balance 10000000000000000000000000
```

Cela confirme que Hardhat utilise votre réseau de test local et détecte les comptes pré-financés créés par le `eth-network-package`.

### Déployer et tester votre dApp localement {#deploy-and-test-dapp}

L'environnement de développement de la dApp étant entièrement connecté au réseau de test Ethereum local, vous pouvez maintenant exécuter des flux de travail de développement et de test sur votre dApp en utilisant le réseau de test local.

Pour compiler et déployer le contrat intelligent `ChipToken.sol` pour le prototypage et le développement local, exécutez :

```python
npx hardhat compile
npx hardhat run scripts/deploy.ts --network localnet
```

La sortie devrait ressembler à :

```python
ChipToken déployé à : 0xAb2A01BC351770D09611Ac80f1DE076D56E0487d
```

Essayez maintenant d'exécuter le test `simple.js` sur votre dApp locale pour confirmer que chaque joueur de notre dApp de Blackjack a reçu 1000 jetons frappés pour lui :

La sortie devrait ressembler à ceci :

```python
npx hardhat test --network localnet
```

La sortie devrait ressembler à ceci :

```python
ChipToken
    mint
      ✔ devrait frapper 1000 jetons pour PLAYER ONE

  1 réussi (654ms)
```

### Résumé {#review-dapp-workflows}

À ce stade, vous avez configuré un environnement de développement de dApp, l'avez connecté à un réseau Ethereum local créé par Kurtosis, et avez compilé, déployé et exécuté un test simple sur votre dApp.

Explorons maintenant comment vous pouvez configurer le réseau sous-jacent pour tester nos dApps dans diverses configurations de réseau.

## Configuration du réseau de test Ethereum local {#configure-testnet}

### Modification des configurations du client et du nombre de nœuds {#configure-client-config-and-num-nodes}

Votre réseau de test Ethereum local peut être configuré pour utiliser différentes paires de clients EL et CL, ainsi qu'un nombre variable de nœuds, en fonction du scénario et de la configuration réseau spécifique que vous souhaitez développer ou tester. Cela signifie qu'une fois configuré, vous pouvez lancer un réseau de test local personnalisé et l'utiliser pour exécuter les mêmes flux de travail (déploiement, tests, etc.) dans diverses configurations de réseau pour vous assurer que tout fonctionne comme prévu. Pour en savoir plus sur les autres paramètres que vous pouvez modifier, consultez ce lien.

Essayez ! Vous pouvez transmettre diverses options de configuration au `eth-network-package` via un fichier JSON. Ce fichier JSON de paramètres réseau fournit les configurations spécifiques que Kurtosis utilisera pour configurer le réseau Ethereum local.

Prenez le fichier de configuration par défaut et modifiez-le pour lancer trois nœuds avec différentes paires EL/CL :

- Nœud 1 avec `geth`/`lighthouse`
- Nœud 2 avec `geth`/`lodestar`
- Nœud 3 avec `geth`/`teku`

Cette configuration crée un réseau hétérogène d'implémentations de nœuds Ethereum pour tester votre dApp. Votre fichier de configuration devrait maintenant ressembler à :

```yaml
{
  "participants":
    [
      {
        "el_client_type": "geth",
        "el_client_image": "",
        "el_client_log_level": "",
        "cl_client_type": "lighthouse",
        "cl_client_image": "",
        "cl_client_log_level": "",
        "beacon_extra_params": [],
        "el_extra_params": [],
        "validator_extra_params": [],
        "builder_network_params": null,
      },
      {
        "el_client_type": "geth",
        "el_client_image": "",
        "el_client_log_level": "",
        "cl_client_type": "lodestar",
        "cl_client_image": "",
        "cl_client_log_level": "",
        "beacon_extra_params": [],
        "el_extra_params": [],
        "validator_extra_params": [],
        "builder_network_params": null,
      },
      {
        "el_client_type": "geth",
        "el_client_image": "",
        "el_client_log_level": "",
        "cl_client_type": "teku",
        "cl_client_image": "",
        "cl_client_log_level": "",
        "beacon_extra_params": [],
        "el_extra_params": [],
        "validator_extra_params": [],
        "builder_network_params": null,
      },
    ],
  "network_params":
    {
      "preregistered_validator_keys_mnemonic": "giant issue aisle success illegal bike spike question tent bar rely arctic volcano long crawl hungry vocal artwork sniff fantasy very lucky have athlete",
      "num_validator_keys_per_node": 64,
      "network_id": "3151908",
      "deposit_contract_address": "0x4242424242424242424242424242424242424242",
      "seconds_per_slot": 12,
      "genesis_delay": 120,
      "capella_fork_epoch": 5,
    },
}
```

Chaque structure `participants` correspond à un nœud du réseau, donc 3 structures `participants` indiqueront à Kurtosis de lancer 3 nœuds dans votre réseau. Chaque structure `participants` vous permettra de spécifier la paire EL et CL utilisée pour ce nœud spécifique.

La structure `network_params` configure les paramètres réseau qui sont utilisés pour créer les fichiers de genèse pour chaque nœud ainsi que d'autres paramètres comme les secondes par créneau du réseau.

Enregistrez votre fichier de paramètres modifié dans le répertoire de votre choix (dans l'exemple ci-dessous, il est enregistré sur le bureau), puis utilisez-le pour exécuter votre paquetage Kurtosis en exécutant :

```python
kurtosis clean -a && kurtosis run --enclave local-eth-testnet github.com/kurtosis-tech/eth-network-package "$(cat ~/eth-network-params.json)"
```

Remarque : la commande `kurtosis clean -a` est utilisée ici pour demander à Kurtosis de détruire l'ancien réseau de test et son contenu avant d'en démarrer un nouveau.

Encore une fois, Kurtosis fonctionnera un instant et affichera les différentes étapes qui se déroulent. Finalement, la sortie devrait ressembler à :

```python
Starlark code successfully run. No output was returned.
INFO[2023-04-07T11:43:16-04:00] ==========================================================
INFO[2023-04-07T11:43:16-04:00] ||          Created enclave: local-eth-testnet          ||
INFO[2023-04-07T11:43:16-04:00] ==========================================================
Name:            local-eth-testnet
UUID:            bef8c192008e
Status:          RUNNING
Creation Time:   Fri, 07 Apr 2023 11:41:58 EDT

========================================= Files Artifacts =========================================
UUID           Name
cc495a8e364a   cl-genesis-data
7033fcdb5471   el-genesis-data
a3aef43fc738   genesis-generation-config-cl
8e968005fc9d   genesis-generation-config-el
3182cca9d3cd   geth-prefunded-keys
8421166e234f   prysm-password
d9e6e8d44d99   validator-keystore-0
23f5ba517394   validator-keystore-1
4d28dea40b5c   validator-keystore-2

========================================== User Services ==========================================
UUID           Name                                           Ports                                            Status
485e6fde55ae   cl-client-0-beacon                             http: 4000/tcp -> http://127.0.0.1:65010         RUNNING
                                                              metrics: 5054/tcp -> http://127.0.0.1:65011
                                                              tcp-discovery: 9000/tcp -> 127.0.0.1:65012
                                                              udp-discovery: 9000/udp -> 127.0.0.1:54455
73739bd158b2   cl-client-0-validator                          http: 5042/tcp -> 127.0.0.1:65016                RUNNING
                                                              metrics: 5064/tcp -> 127.0.0.1:65017
1b0a233cd011   cl-client-1-beacon                             http: 4000/tcp -> 127.0.0.1:65021                RUNNING
                                                              metrics: 8008/tcp -> 127.0.0.1:65023
                                                              tcp-discovery: 9000/tcp -> 127.0.0.1:65024
                                                              udp-discovery: 9000/udp -> 127.0.0.1:56031
                                                              validator-metrics: 5064/tcp -> 127.0.0.1:65022
949b8220cd53   cl-client-1-validator                          http: 4000/tcp -> 127.0.0.1:65028                RUNNING
                                                              metrics: 8008/tcp -> 127.0.0.1:65030
                                                              tcp-discovery: 9000/tcp -> 127.0.0.1:65031
                                                              udp-discovery: 9000/udp -> 127.0.0.1:60784
                                                              validator-metrics: 5064/tcp -> 127.0.0.1:65029
c34417bea5fa   cl-client-2                                    http: 4000/tcp -> 127.0.0.1:65037                RUNNING
                                                              metrics: 8008/tcp -> 127.0.0.1:65035
                                                              tcp-discovery: 9000/tcp -> 127.0.0.1:65036
                                                              udp-discovery: 9000/udp -> 127.0.0.1:63581
e19738e6329d   el-client-0                                    engine-rpc: 8551/tcp -> 127.0.0.1:64986          RUNNING
                                                              rpc: 8545/tcp -> 127.0.0.1:64988
                                                              tcp-discovery: 30303/tcp -> 127.0.0.1:64987
                                                              udp-discovery: 30303/udp -> 127.0.0.1:55706
                                                              ws: 8546/tcp -> 127.0.0.1:64989
e904687449d9   el-client-1                                    engine-rpc: 8551/tcp -> 127.0.0.1:64993          RUNNING
                                                              rpc: 8545/tcp -> 127.0.0.1:64995
                                                              tcp-discovery: 30303/tcp -> 127.0.0.1:64994
                                                              udp-discovery: 30303/udp -> 127.0.0.1:58096
                                                              ws: 8546/tcp -> 127.0.0.1:64996
ad6f401126fa   el-client-2                                    engine-rpc: 8551/tcp -> 127.0.0.1:65003          RUNNING
                                                              rpc: 8545/tcp -> 127.0.0.1:65001
                                                              tcp-discovery: 30303/tcp -> 127.0.0.1:65000
                                                              udp-discovery: 30303/udp -> 127.0.0.1:57269
                                                              ws: 8546/tcp -> 127.0.0.1:65002
12d04a9dbb69   prelaunch-data-generator-1680882122181135513   <none>                                           STOPPED
5b45f9c0504b   prelaunch-data-generator-1680882122192182847   <none>                                           STOPPED
3d4aaa75e218   prelaunch-data-generator-1680882122201668972   <none>                                           STOPPED
```

Félicitations ! Vous avez configuré avec succès votre réseau de test local pour avoir 3 nœuds au lieu de 1. Pour exécuter les mêmes flux de travail que précédemment sur votre dApp (déploiement et test), effectuez les mêmes opérations que nous avons faites auparavant en remplaçant le `<$YOUR_PORT>` dans la structure `localnet` de votre fichier de configuration `hardhat.config.ts` par le port de la sortie de l'URI rpc de n'importe quel service `el-client-<num>` dans votre nouveau réseau de test local à 3 nœuds.

## Conclusion {#conclusion}

Et c'est tout ! Pour résumer ce court guide, vous avez :

- Créé un réseau de test Ethereum local sur Docker en utilisant Kurtosis
- Connecté votre environnement de développement de dApp local au réseau Ethereum local
- Déployé une dApp et exécuté un test simple sur celle-ci sur le réseau Ethereum local
- Configuré le réseau Ethereum sous-jacent pour avoir 3 nœuds

Nous serions ravis d'avoir votre retour sur ce qui s'est bien passé pour vous, ce qui pourrait être amélioré, ou de répondre à vos questions. N'hésitez pas à nous contacter via [GitHub](https://github.com/kurtosis-tech/kurtosis/issues/new/choose) ou à [nous envoyer un e-mail](mailto:feedback@kurtosistech.com) !

### Autres exemples et guides {#other-examples-guides}

Nous vous encourageons à consulter notre [guide de démarrage rapide](https://docs.kurtosis.com/quickstart) (où vous construirez une base de données Postgres et une API par-dessus) et nos autres exemples dans notre [dépôt awesome-kurtosis](https://github.com/kurtosis-tech/awesome-kurtosis) où vous trouverez d'excellents exemples, y compris des paquetages pour :

- [Lancer le même réseau de test Ethereum local](https://github.com/kurtosis-tech/eth2-package), mais avec des services supplémentaires connectés tels qu'un spammeur de transactions (pour simuler des transactions), un moniteur de fourche, et une instance Grafana et Prometheus connectée
- Effectuer un [test de sous-réseautage](https://github.com/kurtosis-tech/awesome-kurtosis/tree/main/ethereum-network-partition-test) sur le même réseau Ethereum local
