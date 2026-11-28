---
title: "Exécuter un nœud Ethereum sur un Raspberry Pi 5"
description: "Flashez votre Raspberry Pi 5, branchez un câble Ethernet, connectez le disque NVMe et allumez l'appareil pour transformer le Raspberry Pi 5 en un nœud Ethereum complet + validateur"
author: "EthereumOnArm"
tags: ["clients", "couche d'exécution", "couche de consensus", "nœuds"]
lang: fr
skill: intermediate
breadcrumb: "Nœud Rasp Pi"
published: 2022-06-10
source: Ethereum on ARM
sourceUrl: https://ethereum-on-arm-documentation.readthedocs.io/en/latest/
---

**Ethereum on Arm est une image Linux personnalisée qui peut transformer un Raspberry Pi en un nœud Ethereum.**

Pour utiliser Ethereum on Arm afin de transformer un Raspberry Pi en un nœud Ethereum, le matériel suivant est recommandé :

- Raspberry Pi 5 avec 16 Go de RAM
- Un HAT NVMe pour le Raspberry Pi 5, pour connecter un disque NVMe
- SSD NVMe (M.2 2280), 4 To minimum. Évitez les disques avec un contrôleur Phison, qui ont des problèmes de compatibilité connus.
- Carte MicroSD (16 Go Classe 10 minimum)
- Alimentation
- Câble Ethernet
- Redirection de port (voir les clients pour plus d'informations)
- Un boîtier avec dissipateur thermique
- Clavier USB, moniteur et câble HDMI (micro-HDMI) (Optionnel)

Ethereum on Arm prend également en charge d'autres cartes ARM, telles que le NanoPC T6, le Rock 5B et l'Orange Pi 5 Plus. Ces cartes ont une prise en charge NVMe native, l'équipe d'Ethereum on Arm les recommande donc plutôt que le Raspberry Pi 5 si vous achetez du nouveau matériel. Consultez la [liste du matériel recommandé](https://ethereum-on-arm-documentation.readthedocs.io/en/latest/overview/supported-hardware.html) pour plus de détails. Le reste de ce tutoriel est le même pour toutes les cartes prises en charge, à l'exception du fichier d'image que vous téléchargez.

## Pourquoi exécuter Ethereum sur ARM ? {#why-run-ethereum-on-arm}

Les cartes ARM sont de petits ordinateurs très abordables et flexibles. Elles constituent de bons choix pour exécuter des nœuds Ethereum car elles peuvent être achetées à bas prix, configurées de manière à ce que toutes leurs ressources se concentrent uniquement sur le nœud, ce qui les rend efficaces. Elles consomment peu d'énergie et sont physiquement petites, de sorte qu'elles peuvent s'intégrer discrètement dans n'importe quelle maison. Il est également très facile de lancer des nœuds car la carte MicroSD du Raspberry Pi peut simplement être flashée avec une image préconstruite, sans nécessiter de téléchargement ou de compilation de logiciels.

## Comment ça marche ? {#how-does-it-work}

La carte mémoire du Raspberry Pi est flashée avec une image préconstruite. Cette image contient tout ce qui est nécessaire pour exécuter un nœud Ethereum. Avec une carte flashée, tout ce que l'utilisateur a à faire est d'allumer le Raspberry Pi. Tous les processus requis pour exécuter le nœud sont automatiquement démarrés. Cela fonctionne car la carte mémoire contient un système d'exploitation (OS) basé sur Linux sur lequel des processus de niveau système sont automatiquement exécutés pour transformer l'unité en un nœud Ethereum.

Les images Ethereum on Arm sont basées sur une distribution Linux 64 bits optimisée pour l'exécution d'un nœud Ethereum, et elles incluent des clients Ethereum préconstruits.

**Les images s'occupent de toutes les étapes nécessaires**, de la configuration de l'environnement et du formatage du disque NVMe à l'installation du logiciel Ethereum.

## Remarque sur les clients d'exécution et de consensus {#note-on-execution-and-consensus-clients}

L'image Ethereum on Arm inclut des clients d'exécution et de consensus préconstruits en tant que services. Un nœud Ethereum nécessite que les deux clients soient synchronisés et en cours d'exécution. Il vous suffit de télécharger et de flasher l'image, puis de démarrer les services. L'image est préchargée avec plusieurs clients d'exécution (tels que Geth, Nethermind, Besu, Erigon et Reth) et clients de consensus (tels que Lighthouse, Prysm, Teku, Nimbus et Lodestar). Consultez la [documentation d'Ethereum on Arm](https://ethereum-on-arm-documentation.readthedocs.io/en/latest/running-a-node/managing-clients.html) pour la liste actuelle.

Vous devez choisir un de chaque à exécuter - tous les clients d'exécution sont compatibles avec tous les clients de consensus. Ce tutoriel utilise Geth et Lighthouse.

## Téléchargement de l'image {#downloading-the-image}

L'image Ethereum on Arm est une image « plug and play » qui installe et configure automatiquement les clients d'exécution et de consensus, en les configurant pour communiquer entre eux et se connecter au réseau Ethereum. Tout ce que l'utilisateur a à faire est de démarrer leurs processus à l'aide d'une simple commande.

Téléchargez la dernière image pour votre carte depuis la [page de téléchargement d'Ethereum on Arm](https://ethereum-on-arm-documentation.readthedocs.io/en/latest/getting-started/installation.html#image-downloads). La page de téléchargement répertorie également la somme de contrôle SHA-256 de chaque image. Vérifiez le fichier téléchargé avec celle-ci :

```sh
# Depuis le répertoire contenant l'image téléchargée
sha256sum ethonarm_rpi5_<version>.img.zip
# Comparer la sortie avec la somme de contrôle sur la page de téléchargement
```

## Flasher la MicroSD {#flashing-the-microsd}

La carte MicroSD qui sera utilisée pour le Raspberry Pi doit d'abord être insérée dans un ordinateur de bureau ou un ordinateur portable afin de pouvoir être flashée. Ensuite, les commandes de terminal suivantes flasheront l'image téléchargée sur la carte SD :

```shell
# vérifier le nom de la carte MicroSD
sudo fdisk -l

>> sdxxx
```

Il est très important d'obtenir le nom correct car la commande suivante inclut `dd` qui efface complètement le contenu existant de la carte avant d'y pousser l'image. Pour continuer, accédez au répertoire contenant l'image zippée :

```shell
# décompresser et flasher l'image
unzip ethonarm_rpi5_<version>.img.zip
sudo dd bs=1M if=ethonarm_rpi5_<version>.img of=/dev/<sdxx> conv=fdatasync status=progress
```

La carte est maintenant flashée, elle peut donc être insérée dans le Raspberry Pi.

## Démarrer le nœud {#start-the-node}

Avec la carte SD insérée dans le Raspberry Pi, connectez le câble Ethernet et le disque NVMe puis mettez sous tension. Le système d'exploitation démarrera et commencera automatiquement à effectuer les tâches préconfigurées qui transforment le Raspberry Pi en un nœud Ethereum, y compris le formatage du disque NVMe et l'installation du logiciel client. Cela prendra probablement 10 à 15 minutes, et la carte redémarre automatiquement lorsqu'elle a terminé. N'interrompez pas l'alimentation électrique pendant ce temps.

Une fois que tout est installé et configuré, connectez-vous à l'appareil via une connexion ssh ou en utilisant directement le terminal si un moniteur et un clavier sont connectés à la carte. Utilisez le compte `ethereum` pour vous connecter, car il dispose des autorisations requises pour démarrer le nœud.

```shell
User: ethereum
Password: ethereum
```

Il vous sera demandé de modifier le mot de passe par défaut lors de votre première connexion. Faites-le, car toute personne pouvant atteindre votre nœud pourrait autrement se connecter avec le mot de passe par défaut. Le pare-feu du système est désactivé par défaut, donc si votre nœud a une adresse IP publique, consultez le [guide de sécurité d'Ethereum on Arm](https://ethereum-on-arm-documentation.readthedocs.io/en/latest/system/security.html) pour l'activer.

Démarrez d'abord le client de consensus. Ouvrez le port 9000 (TCP et UDP) sur votre routeur afin que Lighthouse puisse trouver et se connecter à des pairs. Ensuite, activez et démarrez le service lighthouse, afin qu'il redémarre également après un redémarrage :

```sh
sudo systemctl enable --now lighthouse-beacon
```

Vérifiez le client à l'aide des journaux :

```sh
sudo journalctl -u lighthouse-beacon -f
```

Ensuite, démarrez le client d'exécution. Ouvrez le port 30303 (TCP et UDP) sur votre routeur afin que Geth puisse trouver et se connecter à des pairs. Ensuite, activez et démarrez le service geth :

```sh
sudo systemctl enable --now geth
```

Vous pouvez confirmer qu'il est en cours d'exécution en vérifiant les journaux :

```sh
sudo journalctl -u geth -f
```

Notez que le client de consensus se synchronisera en quelques minutes car il utilise la synchronisation par point de contrôle. Le client d'exécution prendra plus de temps - potentiellement plusieurs heures. Les deux clients s'exécutent en même temps : le client de consensus indique au client d'exécution quel bloc est la tête de la chaîne, et le client d'exécution télécharge et vérifie les blocs jusqu'à celui-ci.

Avec les services Geth et Lighthouse en cours d'exécution et synchronisés, votre Raspberry Pi est maintenant un nœud Ethereum ! Il est plus courant d'interagir avec le réseau Ethereum à l'aide de la console JavaScript de Geth, qui peut être attachée au client Geth sur le port 8545. Il est également possible de soumettre des commandes formatées en tant qu'objets JSON à l'aide d'un outil de requête tel que Curl. Pour en savoir plus, consultez la [documentation de Geth](https://geth.ethereum.org/).

L'image inclut également un tableau de bord Grafana que les utilisateurs plus avancés peuvent utiliser pour surveiller la santé de leur nœud, en naviguant vers `ipaddress:3000` dans un navigateur.

## Validateurs {#validators}

Un validateur peut également être ajouté de manière facultative au client de consensus. Le logiciel validateur permet à votre nœud de participer activement au consensus et fournit au réseau une sécurité crypto-économique. Vous êtes récompensé pour ce travail en ETH. Pour exécuter un validateur, vous devez d'abord avoir 32 ETH, qui doivent être déposés dans le contrat de dépôt. Le dépôt peut être effectué en suivant le guide étape par étape sur le [Launchpad](https://launchpad.ethereum.org/). Faites-le sur un ordinateur de bureau/portable, mais ne générez pas de clés — cela peut être fait directement sur le Raspberry Pi.

L'outil [ethstaker-deposit-cli](https://github.com/ethstaker/ethstaker-deposit-cli) génère des clés de validateur. Les images actuelles l'incluent ; si vous exécutez une image plus ancienne, installez-le d'abord. Ensuite, générez les clés de dépôt, en remplaçant `<YOUR_ETH_ADDRESS>` par l'adresse qui doit recevoir vos retraits :

```sh
sudo apt-get update
sudo apt-get install ethstaker-deposit-cli
cd && deposit new-mnemonic --num_validators 1 --execution_address <YOUR_ETH_ADDRESS> --chain mainnet
```

(Ou téléchargez [ethstaker-deposit-cli](https://github.com/ethstaker/ethstaker-deposit-cli) pour l'exécuter sur une machine déconnectée d'Internet, et exécutez-y la commande `deposit new-mnemonic`)

Gardez la phrase mnémonique en sécurité ! La commande ci-dessus a généré deux fichiers dans le répertoire `validator_keys` : les clés de validateur et un fichier de données de dépôt. Les données de dépôt doivent être téléchargées dans le launchpad, elles doivent donc être copiées du Raspberry Pi vers l'ordinateur de bureau/portable. Cela peut être fait en utilisant une connexion ssh ou toute autre méthode de copier/coller.

Une fois que le fichier de données de dépôt est disponible sur l'ordinateur exécutant le launchpad, il peut être glissé et déposé sur le `+` sur l'écran du launchpad. Suivez les instructions à l'écran pour envoyer une transaction au contrat de dépôt.

De retour sur le Raspberry Pi, un validateur peut être démarré. Cela nécessite d'importer les clés de validateur, de définir l'adresse pour collecter les récompenses, puis de démarrer le processus de validateur préconfiguré. L'exemple ci-dessous est pour Lighthouse — les instructions pour d'autres clients de consensus sont disponibles sur la [documentation d'Ethereum on Arm](https://ethereum-on-arm-documentation.readthedocs.io/en/latest/staking/solo-staking.html) :

```shell
# importer les clés du validateur
lighthouse account validator import --directory=/home/ethereum/validator_keys

# définir l'adresse de récompense (remplacer <YOUR_ETH_ADDRESS> par votre adresse)
sudo sed -i 's/changeme/<YOUR_ETH_ADDRESS>/' /etc/ethereum/lighthouse-validator.conf

# démarrer le validateur
sudo systemctl enable --now lighthouse-validator
```

Félicitations, vous avez maintenant un nœud Ethereum complet et un validateur en cours d'exécution sur un Raspberry Pi !

## Plus de détails {#more-details}

Cette page a donné un aperçu de la façon de configurer un nœud Geth-Lighthouse et un validateur en utilisant un Raspberry Pi. Des instructions plus détaillées sont disponibles sur le [site Web d'Ethereum-on-Arm](https://ethereum-on-arm-documentation.readthedocs.io/en/latest/).

## Vos retours sont appréciés {#feedback-appreciated}

Nous savons que le Raspberry Pi a une base d'utilisateurs massive qui pourrait avoir un impact très positif sur la santé du réseau Ethereum.
Veuillez vous plonger dans les détails de ce tutoriel, essayer de l'exécuter sur des réseaux de test, consulter le [GitHub d'Ethereum on Arm](https://github.com/EOA-Blockchain-Labs/ethereumonarm), donner votre avis, signaler des problèmes, soumettre des pull requests et aider à faire progresser la technologie et la documentation !

## Références {#references}

1. https://ethereum-on-arm-documentation.readthedocs.io/en/latest/
2. https://wikipedia.org/wiki/Port_forwarding
3. https://prometheus.io
4. https://grafana.com
5. https://geth.ethereum.org
6. https://lighthouse.sigmaprime.io
7. https://github.com/ethstaker/ethstaker-deposit-cli
