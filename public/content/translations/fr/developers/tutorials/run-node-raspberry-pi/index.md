---
title: "Exécuter un nœud Ethereum sur Raspberry Pi 4"
description: "Flashez votre Raspberry Pi 4, branchez un câble Ethernet, connectez le disque SSD et allumez l'appareil pour transformer le Raspberry Pi 4 en un nœud Ethereum complet + validateur"
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

- Carte Raspberry 4 (modèle B 8 Go), Odroid M1 ou Rock 5B (8 Go/16 Go de RAM)
- Carte MicroSD (16 Go Classe 10 minimum)
- Disque SSD de 2 To minimum USB 3.0 ou un SSD avec un boîtier USB vers SATA.
- Alimentation électrique
- Câble Ethernet
- Redirection de port (voir les clients pour plus d'informations)
- Un boîtier avec dissipateur thermique et ventilateur
- Clavier USB, moniteur et câble HDMI (micro-HDMI) (Facultatif)

## Pourquoi exécuter Ethereum sur ARM ? {#why-run-ethereum-on-arm}

Les cartes ARM sont de petits ordinateurs très abordables et flexibles. Elles constituent de bons choix pour exécuter des nœuds Ethereum car elles peuvent être achetées à bas prix, configurées de manière à ce que toutes leurs ressources se concentrent uniquement sur le nœud, ce qui les rend efficaces. Elles consomment peu d'énergie et sont physiquement petites, de sorte qu'elles peuvent s'intégrer discrètement dans n'importe quelle maison. Il est également très facile de lancer des nœuds car la carte MicroSD du Raspberry Pi peut simplement être flashée avec une image préconstruite, sans nécessiter de téléchargement ou de compilation de logiciels.

## Comment ça marche ? {#how-does-it-work}

La carte mémoire du Raspberry Pi est flashée avec une image préconstruite. Cette image contient tout ce qui est nécessaire pour exécuter un nœud Ethereum. Avec une carte flashée, tout ce que l'utilisateur a à faire est d'allumer le Raspberry Pi. Tous les processus requis pour exécuter le nœud démarrent automatiquement. Cela fonctionne car la carte mémoire contient un système d'exploitation (OS) basé sur Linux sur lequel des processus de niveau système sont automatiquement exécutés pour transformer l'unité en un nœud Ethereum.

Ethereum ne peut pas être exécuté en utilisant le populaire système d'exploitation Linux pour Raspberry Pi « Raspbian » car Raspbian utilise toujours une architecture 32 bits, ce qui entraîne des problèmes de mémoire pour les utilisateurs d'Ethereum, et les clients de consensus ne prennent pas en charge les binaires 32 bits. Pour surmonter cela, l'équipe d'Ethereum on Arm a migré vers un système d'exploitation natif 64 bits appelé « Armbian ».

**Les images prennent en charge toutes les étapes nécessaires**, de la configuration de l'environnement et du formatage du disque SSD à l'installation et l'exécution du logiciel Ethereum, ainsi qu'au démarrage de la synchronisation de la chaîne de blocs.

## Remarque sur les clients d'exécution et de consensus {#note-on-execution-and-consensus-clients}

L'image Ethereum on Arm inclut des clients d'exécution et de consensus préconstruits en tant que services. Un nœud Ethereum nécessite que les deux clients soient synchronisés et en cours d'exécution. Il vous suffit de télécharger et de flasher l'image, puis de démarrer les services. L'image est préchargée avec les clients d'exécution suivants :

- Geth
- Nethermind
- Besu

et les clients de consensus suivants :

- Lighthouse
- Nimbus
- Prysm
- Teku

Vous devez choisir un de chaque pour l'exécution - tous les clients d'exécution sont compatibles avec tous les clients de consensus. Si vous ne sélectionnez pas explicitement un client, le nœud se rabattra sur ses valeurs par défaut - Geth et Lighthouse - et les exécutera automatiquement lors de la mise sous tension de la carte. Vous devez ouvrir le port 30303 sur votre routeur pour que Geth puisse trouver et se connecter à des pairs.

## Téléchargement de l'image {#downloading-the-image}

L'image Ethereum pour Raspberry Pi 4 est une image « plug and play » qui installe et configure automatiquement les clients d'exécution et de consensus, en les configurant pour qu'ils communiquent entre eux et se connectent au réseau Ethereum. Tout ce que l'utilisateur a à faire est de démarrer leurs processus à l'aide d'une simple commande.

Téléchargez l'image Raspberry Pi depuis [Ethereum on Arm](https://ethereumonarm-my.sharepoint.com/:u:/p/dlosada/Ec_VmUvr80VFjf3RYSU-NzkBmj2JOteDECj8Bibde929Gw?download=1) et vérifiez le hash SHA256 :

```sh
# Depuis le répertoire contenant l'image téléchargée
shasum -a 256 ethonarm_22.04.00.img.zip
# Le hash devrait retourner : fb497e8f8a7388b62d6e1efbc406b9558bee7ef46ec7e53083630029c117444f
```

Notez que les images pour les cartes Rock 5B et Odroid M1 sont disponibles sur la [page de téléchargement](https://ethereum-on-arm-documentation.readthedocs.io/en/latest/) d'Ethereum-on-Arm.

## Flasher la MicroSD {#flashing-the-microsd}

La carte MicroSD qui sera utilisée pour le Raspberry Pi doit d'abord être insérée dans un ordinateur de bureau ou un ordinateur portable afin de pouvoir être flashée. Ensuite, les commandes de terminal suivantes flasheront l'image téléchargée sur la carte SD :

```shell
# vérifier le nom de la carte MicroSD
sudo fdisk -l

>> sdxxx
```

Il est très important d'obtenir le nom correct car la commande suivante inclut `dd` qui efface complètement le contenu existant de la carte avant d'y pousser l'image. Pour continuer, naviguez jusqu'au répertoire contenant l'image zippée :

```shell
# décompresser et flasher l'image
unzip ethonarm_22.04.00.img.zip
sudo dd bs=1M if=ethonarm_22.04.00.img of=/dev/<sdxx> conv=fdatasync status=progress
```

La carte est maintenant flashée, elle peut donc être insérée dans le Raspberry Pi.

## Démarrer le nœud {#start-the-node}

Avec la carte SD insérée dans le Raspberry Pi, connectez le câble Ethernet et le SSD, puis mettez sous tension. Le système d'exploitation démarrera et commencera automatiquement à effectuer les tâches préconfigurées qui transforment le Raspberry Pi en un nœud Ethereum, y compris l'installation et la compilation du logiciel client. Cela prendra probablement 10 à 15 minutes.

Une fois que tout est installé et configuré, connectez-vous à l'appareil via une connexion ssh ou en utilisant directement le terminal si un moniteur et un clavier sont connectés à la carte. Utilisez le compte `ethereum` pour vous connecter, car il dispose des autorisations requises pour démarrer le nœud.

```shell
User: ethereum
Password: ethereum
```

Le client d'exécution par défaut, Geth, démarrera automatiquement. Vous pouvez le confirmer en vérifiant les journaux à l'aide de la commande de terminal suivante :

```sh
sudo journalctl -u geth -f
```

Le client de consensus doit être démarré explicitement. Pour ce faire, ouvrez d'abord le port 9000 sur votre routeur afin que Lighthouse puisse trouver et se connecter à des pairs. Ensuite, activez et démarrez le service lighthouse :

```sh
sudo systemctl enable lighthouse-beacon
sudo systemctl start lighthouse-beacon
```

Vérifiez le client à l'aide des journaux :

```sh
sudo journalctl -u lighthouse-beacon
```

Notez que le client de consensus se synchronisera en quelques minutes car il utilise la synchronisation par point de contrôle. Le client d'exécution prendra plus de temps - potentiellement plusieurs heures, et il ne démarrera pas tant que le client de consensus n'aura pas terminé sa synchronisation (cela s'explique par le fait que le client d'exécution a besoin d'une cible sur laquelle se synchroniser, ce que fournit le client de consensus synchronisé).

Avec les services Geth et Lighthouse en cours d'exécution et synchronisés, votre Raspberry Pi est maintenant un nœud Ethereum ! Il est très courant d'interagir avec le réseau Ethereum en utilisant la console JavaScript de Geth, qui peut être attachée au client Geth sur le port 8545. Il est également possible de soumettre des commandes formatées en tant qu'objets JSON à l'aide d'un outil de requête tel que Curl. Pour en savoir plus, consultez la [documentation de Geth](https://geth.ethereum.org/).

Geth est préconfiguré pour rapporter des métriques à un tableau de bord Grafana qui peut être consulté dans le navigateur. Les utilisateurs plus avancés pourraient souhaiter utiliser cette fonctionnalité pour surveiller la santé de leur nœud en naviguant vers `ipaddress:3000`, en passant `user: admin` et `passwd: ethereum`.

## Validateurs {#validators}

Un validateur peut également être ajouté de manière facultative au client de consensus. Le logiciel du validateur permet à votre nœud de participer activement au consensus et fournit au réseau une sécurité cryptoéconomique. Vous êtes récompensé pour ce travail en ETH. Pour exécuter un validateur, vous devez d'abord posséder 32 ETH, qui doivent être déposés dans le contrat de dépôt. Le dépôt peut être effectué en suivant le guide étape par étape sur le [Launchpad](https://launchpad.ethereum.org/). Faites-le sur un ordinateur de bureau/portable, mais ne générez pas de clés — cela peut être fait directement sur le Raspberry Pi.

Ouvrez un terminal sur le Raspberry Pi et exécutez la commande suivante pour générer les clés de dépôt :

```
sudo apt-get update
sudo apt-get install staking-deposit-cli
cd && deposit new-mnemonic --num_validators 1
```

(Ou téléchargez le [staking-deposit-cli](https://github.com/ethereum/staking-deposit-cli) pour l'exécuter sur une machine isolée du réseau (airgapped), et exécutez la commande `deposit new-mnemnonic`)

Gardez la phrase mnémonique en sécurité ! La commande ci-dessus a généré deux fichiers dans le magasin de clés du nœud : les clés du validateur et un fichier de données de dépôt. Les données de dépôt doivent être téléchargées dans le launchpad, elles doivent donc être copiées du Raspberry Pi vers l'ordinateur de bureau/portable. Cela peut être fait en utilisant une connexion ssh ou toute autre méthode de copier/coller.

Une fois que le fichier de données de dépôt est disponible sur l'ordinateur exécutant le launchpad, il peut être glissé et déposé sur le `+` sur l'écran du launchpad. Suivez les instructions à l'écran pour envoyer une transaction au contrat de dépôt.

De retour sur le Raspberry Pi, un validateur peut être démarré. Cela nécessite d'importer les clés du validateur, de définir l'adresse pour collecter les récompenses, puis de démarrer le processus de validateur préconfiguré. L'exemple ci-dessous concerne Lighthouse — les instructions pour les autres clients de consensus sont disponibles dans la [documentation d'Ethereum on Arm](https://ethereum-on-arm-documentation.readthedocs.io/en/latest/) :

```shell
# importer les clés du validateur
lighthouse account validator import --directory=/home/ethereum/validator_keys

# définir l'adresse de récompense
sudo sed -i 's/<ETH_ADDRESS>' /etc/ethereum/lighthouse-validator.conf

# démarrer le validateur
sudo systemctl start lighthouse-validator
```

Félicitations, vous avez maintenant un nœud Ethereum complet et un validateur en cours d'exécution sur un Raspberry Pi !

## Plus de détails {#more-details}

Cette page a donné un aperçu de la façon de configurer un nœud Geth-Lighthouse et un validateur en utilisant un Raspberry Pi. Des instructions plus détaillées sont disponibles sur le [site Web d'Ethereum-on-Arm](https://ethereum-on-arm-documentation.readthedocs.io/en/latest/).

## Vos retours sont appréciés {#feedback-appreciated}

Nous savons que le Raspberry Pi possède une base d'utilisateurs massive qui pourrait avoir un impact très positif sur la santé du réseau Ethereum.
N'hésitez pas à vous plonger dans les détails de ce tutoriel, essayez de l'exécuter sur des réseaux de test, consultez le GitHub d'Ethereum on Arm, donnez votre avis, signalez des problèmes et soumettez des pull requests pour aider à faire avancer la technologie et la documentation !

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
11. https://docs.ethswarm.org/
12. https://raiden.network
13. https://ipfs.io
14. https://status.im
15. https://vipnode.org