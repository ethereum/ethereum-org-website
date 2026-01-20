---
title: Exécuter un nœud Ethereum sur un Raspberry Pi 4
description: Flashez votre Raspberry Pi 4, branchez un câble Ethernet, connectez le disque SSD et mettez l'appareil sous tension pour le transformer en un nœud et validateur Ethereum complet
author: "EthereumOnArm"
tags:
  [
    "clients",
    "couche d'exécution",
    "couche de consensus",
    "nœuds"
  ]
lang: fr
skill: intermediate
published: 2022-06-10
source: Ethereum sur ARM
sourceUrl: https://ethereum-on-arm-documentation.readthedocs.io/en/latest/
---

**Ethereum on Arm est une image Linux personnalisée qui peut transformer un Raspberry Pi en un nœud Ethereum.**

Pour utiliser Ethereum on Arm afin de transformer un Raspberry Pi en nœud Ethereum, le matériel suivant est recommandé :

- Carte Raspberry 4 (modèle B 8 Go), Odroid M1 ou Rock 5B (8 Go/16 Go de RAM)
- Carte microSD (16 Go, classe 10 au minimum)
- Disque SSD de 2 To minimum avec port USB 3.0 ou un SSD avec un boîtier USB vers SATA.
- Alimentation électrique
- Câble Ethernet
- Redirection de port (voir les clients pour plus d'informations)
- Un boîtier avec dissipateur thermique et ventilateur
- Clavier USB, moniteur et câble HDMI (micro-HDMI) (en option)

## Pourquoi faire tourner Ethereum sur ARM ? {#why-run-ethereum-on-arm}

Les cartes ARM sont de petits ordinateurs très abordables et flexibles. Elles sont un bon choix pour exécuter des nœuds Ethereum, car elles sont bon marché, peuvent être configurées de manière à ce que toutes leurs ressources se concentrent sur le nœud (ce qui les rend efficaces), consomment peu d'énergie et sont de petite taille, ce qui leur permet de s'intégrer discrètement dans n'importe quel foyer. Il est également très facile de lancer des nœuds, car la carte MicroSD du Raspberry Pi peut simplement être flashée avec une image pré-construite, sans qu'il soit nécessaire de télécharger ou de compiler des logiciels.

## Comment ça marche ? {#how-does-it-work}

La carte mémoire du Raspberry Pi est flashée avec une image pré-construite. Cette image contient tout ce qui est nécessaire pour exécuter un nœud Ethereum. Avec une carte flashée, il suffit à l'utilisateur d'allumer le Raspberry Pi. Tous les processus nécessaires pour exécuter le nœud sont démarrés automatiquement. Cela fonctionne, car la carte mémoire contient un système d'exploitation (SE) basé sur Linux, sur lequel des processus au niveau du système sont exécutés automatiquement pour transformer l'appareil en un nœud Ethereum.

Ethereum ne peut pas être exécuté avec le système d'exploitation populaire du Raspberry Pi, « Raspbian », car ce dernier utilise toujours une architecture 32 bits, ce qui cause des problèmes de mémoire aux utilisateurs d'Ethereum, et les clients de consensus ne prennent pas en charge les binaires 32 bits. Pour surmonter cela, l'équipe Ethereum on Arm a migré vers un système d'exploitation natif 64 bits appelé « Armbian ».

**Les images s'occupent de toutes les étapes nécessaires**, de la configuration de l'environnement et du formatage du disque SSD à l'installation et l'exécution du logiciel Ethereum, ainsi qu'au démarrage de la synchronisation de la blockchain.

## Remarque sur les clients d'exécution et de consensus {#note-on-execution-and-consensus-clients}

L'image Ethereum on Arm inclut des clients d'exécution et de consensus pré-construits en tant que services. Un nœud Ethereum nécessite que les deux clients soient synchronisés et en cours d'exécution. Il vous suffit de télécharger et de flasher l'image, puis de démarrer les services. L'image est préchargée avec les clients d'exécution suivants :

- Geth
- Nethermind
- Besu

et les clients de consensus suivants :

- Lighthouse
- Nimbus
- Prysm
- Teku

Vous devez en choisir un de chaque à exécuter. Tous les clients d'exécution sont compatibles avec tous les clients de consensus. Si vous ne sélectionnez pas explicitement un client, le nœud utilisera ses options par défaut (Geth et Lighthouse) et les exécutera automatiquement à la mise sous tension de la carte. Vous devez ouvrir le port 30303 sur votre routeur pour que Geth puisse trouver des pairs et s'y connecter.

## Téléchargement de l'image {#downloading-the-image}

L'image Ethereum pour Raspberry Pi 4 est une image « prête à l'emploi » qui installe et configure automatiquement les clients d'exécution et de consensus, en les configurant pour qu'ils communiquent entre eux et se connectent au réseau Ethereum. L'utilisateur n'a qu'à démarrer les processus à l'aide d'une simple commande.

Téléchargez l'image du Raspberry Pi depuis [Ethereum on Arm](https://ethereumonarm-my.sharepoint.com/:u:/p/dlosada/Ec_VmUvr80VFjf3RYSU-NzkBmj2JOteDECj8Bibde929Gw?download=1) et vérifiez le hachage SHA256 :

```sh
# À partir du répertoire contenant l'image téléchargée
shasum -a 256 ethonarm_22.04.00.img.zip
# Le hachage devrait être : fb497e8f8a7388b62d6e1efbc406b9558bee7ef46ec7e53083630029c117444f
```

Notez que les images pour les cartes Rock 5B et Odroid M1 sont disponibles sur la [page de téléchargement](https://ethereum-on-arm-documentation.readthedocs.io/en/latest/quick-guide/download-and-install.html) d'Ethereum-on-Arm.

## Flasher la carte MicroSD {#flashing-the-microsd}

La carte MicroSD qui sera utilisée pour le Raspberry Pi doit d'abord être insérée dans un ordinateur de bureau ou un ordinateur portable afin de pouvoir être flashée. Ensuite, les commandes de terminal suivantes flasheront l'image téléchargée sur la carte SD :

```shell
# vérifiez le nom de la carte MicroSD
sudo fdisk -l

>> sdxxx
```

Il est très important d'utiliser le bon nom, car la commande suivante inclut `dd`, qui efface complètement le contenu de la carte avant d'y copier l'image. Pour continuer, accédez au répertoire contenant l'image compressée :

```shell
# décompressez et flashez l'image
unzip ethonarm_22.04.00.img.zip
sudo dd bs=1M if=ethonarm_22.04.00.img of=/dev/<sdxx> conv=fdatasync status=progress
```

La carte est maintenant flashée, elle peut donc être insérée dans le Raspberry Pi.

## Démarrer le nœud {#start-the-node}

Une fois la carte SD insérée dans le Raspberry Pi, branchez le câble Ethernet et le SSD, puis mettez l'appareil sous tension. Le système d'exploitation démarrera et commencera automatiquement à exécuter les tâches préconfigurées qui transforment le Raspberry Pi en un nœud Ethereum, y compris l'installation et la compilation du logiciel client. Cela prendra probablement 10 à 15 minutes.

Une fois que tout est installé et configuré, connectez-vous à l'appareil via une connexion SSH ou en utilisant directement le terminal si un moniteur et un clavier sont connectés à la carte. Utilisez le compte `ethereum` pour vous connecter, car il dispose des autorisations requises pour démarrer le nœud.

```shell
Utilisateur : ethereum
Mot de passe : ethereum
```

Le client d'exécution par défaut, Geth, démarrera automatiquement. Vous pouvez le confirmer en vérifiant les journaux à l'aide de la commande suivante :

```sh
sudo journalctl -u geth -f
```

Le client de consensus doit être démarré explicitement. Pour ce faire, ouvrez d'abord le port 9000 sur votre routeur afin que Lighthouse puisse trouver des pairs et s'y connecter. Ensuite, activez et démarrez le service Lighthouse :

```sh
sudo systemctl enable lighthouse-beacon
sudo systemctl start lighthouse-beacon
```

Vérifiez le client à l'aide des journaux :

```sh
sudo journalctl -u lighthouse-beacon
```

Notez que le client de consensus se synchronisera en quelques minutes, car il utilise la synchronisation par point de contrôle. Le client d'exécution mettra plus de temps (potentiellement plusieurs heures) et ne démarrera pas tant que le client de consensus n'aura pas terminé sa synchronisation (car le client d'exécution a besoin d'une cible avec laquelle se synchroniser, cible qui est fournie par le client de consensus synchronisé).

Une fois les services Geth et Lighthouse en cours d'exécution et synchronisés, votre Raspberry Pi est désormais un nœud Ethereum complet ! L'interaction avec le réseau Ethereum se fait le plus souvent via la console Javascript de Geth, qui peut être attachée au client Geth sur le port 8545. Il est également possible de soumettre des commandes formatées en tant qu'objets JSON à l'aide d'un outil de requête tel que Curl. Pour en savoir plus, consultez la [documentation de Geth](https://geth.ethereum.org/).

Geth est préconfiguré pour envoyer des métriques à un tableau de bord Grafana qui peut être consulté dans le navigateur. Les utilisateurs plus avancés peuvent utiliser cette fonctionnalité pour surveiller la santé de leur nœud en se rendant sur `ipaddress:3000`, et en utilisant `user: admin` et `passwd: ethereum`.

## Validateurs {#validators}

Un validateur peut également être ajouté en option au client de consensus. Le logiciel de validation permet à votre nœud de participer activement au consensus et de fournir au réseau une sécurité cryptoéconomique. Vous êtes récompensé pour ce travail en ETH. Pour exécuter un validateur, vous devez d'abord disposer de 32 ETH, qui doivent être déposés dans le contrat de dépôt. Le dépôt peut être effectué en suivant le guide étape par étape sur le [Launchpad](https://launchpad.ethereum.org/). Faites-le sur un ordinateur de bureau/portable, mais ne générez pas les clés – cette opération peut être effectuée directement sur le Raspberry Pi.

Ouvrez un terminal sur le Raspberry Pi et exécutez la commande suivante pour générer les clés de dépôt :

```
sudo apt-get update
sudo apt-get install staking-deposit-cli
cd && deposit new-mnemonic --num_validators 1
```

(Ou téléchargez le [staking-deposit-cli](https://github.com/ethereum/staking-deposit-cli) pour l'exécuter sur une machine hors ligne, et exécutez la commande `deposit new-mnemnonic`)

Conservez la phrase mnémonique en lieu sûr ! La commande ci-dessus a généré deux fichiers dans le keystore du nœud : les clés de validateur et un fichier de données de dépôt. Les données de dépôt doivent être téléversées sur le Launchpad, elles doivent donc être copiées du Raspberry Pi vers l'ordinateur de bureau/portable. Cela peut être fait en utilisant une connexion SSH ou toute autre méthode de copier-coller.

Une fois que le fichier de données de dépôt est disponible sur l'ordinateur exécutant le Launchpad, il peut être glissé-déposé sur le `+` de l'écran du Launchpad. Suivez les instructions à l'écran pour envoyer une transaction au contrat de dépôt.

De retour sur le Raspberry Pi, un validateur peut être démarré. Cela nécessite d'importer les clés du validateur, de définir l'adresse de collecte des récompenses, puis de démarrer le processus de validation préconfiguré. L'exemple ci-dessous concerne Lighthouse. Les instructions pour les autres clients de consensus sont disponibles dans la [documentation Ethereum on Arm](https://ethereum-on-arm-documentation.readthedocs.io/en/latest/) :

```shell
# importer les clés du validateur
lighthouse account validator import --directory=/home/ethereum/validator_keys

# définir l'adresse de récompense
sudo sed -i 's/<ETH_ADDRESS>' /etc/ethereum/lighthouse-validator.conf

# démarrer le validateur
sudo systemctl start lighthouse-validator
```

Félicitations, vous avez maintenant un nœud et un validateur Ethereum complets fonctionnant sur un Raspberry Pi !

## Plus de détails {#more-details}

Cette page a donné un aperçu de la configuration d'un nœud et d'un validateur Geth-Lighthouse à l'aide d'un Raspberry Pi. Des instructions plus détaillées sont disponibles sur le [site web d'Ethereum-on-Arm](https://ethereum-on-arm-documentation.readthedocs.io/en/latest/index.html).

## Vos commentaires sont les bienvenus {#feedback-appreciated}

Nous savons que le Raspberry Pi a une base d'utilisateurs massive qui pourrait avoir un impact très positif sur la santé du réseau Ethereum.
N'hésitez pas à examiner les détails de ce tutoriel, à faire des essais sur les réseaux de test, à consulter le GitHub d'Ethereum on Arm, à donner votre avis, à signaler des problèmes et à proposer des pull requests pour aider à faire progresser la technologie et la documentation !

## Références {#references}

1. https://ubuntu.com/download/raspberry-pi
2. https://wikipedia.org/wiki/Port_forwarding
3. https://prometheus.io
4. https://grafana.com
5. https://forum.armbian.com/topic/5565-zram-vs-swap/
6. https://geth.ethereum.org
7. https://nethermind.io
8. https://www.hyperledger.org/projects/besu
9. https://github.com/prysmaticlabs/prysm
10. https://lighthouse.sigmaprime.io
11. https://ethersphere.github.io/swarm-home
12. https://raiden.network
13. https://ipfs.io
14. https://status.im
15. https://vipnode.org
