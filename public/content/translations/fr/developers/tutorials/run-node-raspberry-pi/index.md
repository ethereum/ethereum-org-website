---
title: Comment transformer son Raspberry Pi 4 en un nœud en flashant simplement la carte MicroSD
description: Flashez votre Raspberry Pi 4, branchez-y un câble ethernet, connectez le disque SSD et mettez l'appareil en marche pour transformer votre Raspberry Pi 4 en un nœud Ethereum complet + validateur
author: "EthereumOnArm"
tags:
  - "clients"
  - "couche d'exécution"
  - "couche de consensus"
  - "nœuds"
lang: fr
skill: intermediate
published: 2022-06-10
source: Ethereum sur ARM
sourceUrl: https://ethereum-on-arm-documentation.readthedocs.io/en/latest/
---

**Ethereum sur Arm est une image Linux personnalisée qui peut transformer un Raspberry Pi en un nœud Ethereum.**

Pour utiliser Ethereum sur Arm pour transformer un Raspberry Pi en un nœud Ethereum, le matériel suivant est recommandé :

- Carte Raspberry 4 (modèle B 8Go), Odroid M1 ou Rock 5B (8Go/16Go de RAM)
- Carte MicroSD (16 Go Classe 10 minimum)
- Disque 2 To SSD USB 3.0 minimum ou un SSD avec USB vers un SATA.
- Alimentation électrique
- Un câble Ethernet
- Transfert de port (voir clients pour plus d'informations)
- Un boîtier avec dissipateur de chaleur et ventilateur
- Clavier USB, moniteur et câble HDMI (micro-HDMI) (facultatif)

## Pourquoi utiliser Ethereum avec ARM ? {#why-run-ethereum-on-arm}

Les cartes ARM sont très abordables, flexibles et équivalentes à de petits ordinateurs. Elles sont de bons choix pour faire fonctionner des nœuds Ethereum car elles sont bon marché, configurées de sorte que toutes leurs ressources se concentrent uniquement sur le nœud, les rendant ainsi efficaces, elles consomment peu de puissance et sont physiquement peu nombreuses pour qu'elles puissent s'adapter discrètement à n'importe quel environnement. Il est également très facile de faire tourner des nœuds puisque la MicroSD du Raspberry Pi peut simplement être flashée avec une image reconstruite, sans téléchargement ou logiciel de construction requis.

## Comment ça marche ? {#how-does-it-work}

La carte mémoire du Raspberry Pi est flashée avec une image préconstruite. Cette image contient tout ce qui est nécessaire pour exécuter un nœud Ethereum. Avec une carte flash, tout ce que l'utilisateur a besoin de faire est d'allumer son Raspberry Pi. Tous les processus requis pour exécuter le nœud sont démarrés automatiquement. Cela fonctionne parce que la carte mémoire contient un système d'exploitation (OS) basé sur Linux sur lequel sont exécutés automatiquement les processus au niveau du système qui transforment l'unité en un nœud Ethereum.

Ethereum ne peut pas être exécuté en utilisant le populaire Raspberry Pi Linux OS « Raspbian » car Raspbian utilise toujours une architecture 32 bits qui conduit les utilisateurs d'Ethereum à rencontrer des problèmes de mémoire et les clients de consensus ne prennent pas en charge les binaires 32 bits. Pour surmonter cela, l'équipe Ethereum on Arm a migré vers un OS 64 bits natif appelé « Armbian ».

**Les images s'occupent de réaliser toutes les étapes nécessaires**, allant de la configuration de l'environnement et du formatage du disque SSD, à l'installation et à l'exécution du logiciel Ethereum, ainsi qu'au lancement de la synchronisation avec la blockchain.

## Note sur les clients d'exécution et de consensus {#note-on-execution-and-consensus-clients}

L'image Ethereum sur Arm inclut les clients d'exécution et de consensuel préconstruits en tant que services. Un nœud Ethereum nécessite que les deux clients soient synchronisés et exécutés. Vous devez seulement télécharger et flasher l'image et ensuite démarrer les services. L'image est préchargée avec les clients d'exécution suivants :

- Geth
- Nethermind
- Besu

et les clients de consensus suivants :

- Lighthouse
- Nimbus
- Prysm
- Teku

Vous devez choisir un de chaque à exécuter - tous les clients d'exécution sont compatibles avec tous les clients de consensus. Si vous ne sélectionnez pas explicitement un client, le noeud va revenir à ses valeurs par défaut - Geth et Lighthouse - et les exécuter automatiquement lorsque la carte sera mise en marche. Vous devez ouvrir le port 30303 sur votre routeur pour que Geth puisse trouver et se connecter aux pairs.

## Téléchargement de l'image {#downloading-the-image}

L'image Ethereum Raspberry Pi 4 est une image « plug and play » qui installe et configure automatiquement à la fois les clients d'exécution et de consensus pour communiquer mutuellement et se connecter au réseau Ethereum. Tout ce que l'utilisateur doit faire est de démarrer ses processus en utilisant une commande simple.

Téléchargez l'image Raspberry Pi depuis [Ethereum sur Arm](https://ethereumonarm-my.sharepoint.com/:u:/p/dlosada/Ec_VmUvr80VFjf3RYSU-NzkBmj2JOteDECj8Bibde929Gw?download=1) et vérifiez le hachage SHA256 :

```sh
# From directory containing the downloaded image
shasum -a 256 ethonarm_22.04.00.img.zip
# Hash should output: fb497e8f8a7388b62d6e1efbc406b9558bee7ef46ec7e53083630029c117444f
```

Notez que les images des cartes Rock 5B et Odroid M1 sont disponibles sur la page de téléchargement [Ethereum sur Arm](https://ethereum-on-arm-documentation.readthedocs.io/en/latest/quick-guide/download-and-install.html).

## Flasher la carte MicroSD {#flashing-the-microsd}

La carte MicroSD qui sera utilisée pour le Raspberry Pi doit d'abord être insérée dans un ordinateur de bureau ou portable pour qu'elle puisse être flashée. Ensuite, les commandes de terminal suivantes installeront l'image téléchargée sur la carte SD :

```shell
# check the MicroSD card name
sudo fdisk -l

>> sdxxx
```

Il est vraiment important d'obtenir le nom correct, car la commande suivante inclut `dd` qui efface complètement le contenu existant de la carte avant de flasher l'image dessus. Pour continuer, accédez au répertoire contenant l'image compressée :

```shell
# unzip and flash image
unzip ethonarm_22.04.00.img.zip
sudo dd bs=1M if=ethonarm_22.04.00.img of=/dev/<sdxx> conv=fdatasync status=progress
```

La carte est maintenant flashée et peut être insérée dans le Raspberry Pi.

## Démarrer le nœud {#start-the-node}

Avec la carte SD insérée dans le Raspberry Pi, connectez le câble ethernet et le SSD puis allumez l'alimentation. L'OS démarrera et commencera automatiquement à exécuter les tâches préconfigurées qui transforment le Raspberry Pi en un nœud Ethereum, y compris l'installation et la construction du logiciel client. Cela prendra probablement 10 à 15 minutes.

Une fois que tout est installé et configuré, connectez-vous au périphérique via une connexion ssh ou directement en utilisant le terminal si un moniteur et un clavier sont connectés à la carte. Utilisez le compte `ethereum` pour vous connecter, car il a les permissions requises pour démarrer le nœud.

```shell
Utilisateur : ethereum
Mot de passe : ethereum
```

Le client d'exécution par défaut, Geth, démarrera automatiquement. Vous pouvez confirmer cela en vérifiant les logs en utilisant la ligne de commande suivante :

```sh
sudo journalctl -u geth -f
```

Le client de consensus doit être démarré explicitement. Pour ce faire, ouvrez d'abord le port 9000 sur votre routeur afin que Lighthouse puisse trouver des paires et s'y connecter. Ensuite, activez et démarrez le service Lighthouse :

```sh
sudo systemctl enable lighthouse-beacon
sudo systemctl start lighthouse-beacon
```

Vérifiez le client en utilisant les logs :

```sh
sudo journalctl -u lighthouse-beacon
```

Notez que le client de consensus se synchronisera après quelques minutes car il utilise la synchronisation de point de contrôle. Le client d'exécution prendra plus de temps - potentiellement plusieurs heures, et il ne démarrera pas jusqu'à ce que le client de consensus soit déjà synchronisé (du fait que le client d'exécution a besoin d'une cible pour synchroniser, que le client de consensus synchronisé fournit).

Avec les services Geth et Lighthouse exécutant et synchronisés, votre Raspberry Pi est maintenant un nœud Ethereum ! Il est plus courant d'interagir avec le réseau Ethereum en utilisant la console JavaScript de Geth, qui peut être reliée au client Geth sur le port 8545. Il est également possible de soumettre des commandes formatées en objets JSON en utilisant un outil de requête tel que Curl. En savoir plus dans la [documentation Geth](https://geth.ethereum.org).

Geth est préconfiguré pour rapporter des mesures sur un tableau de bord Grafana qui peut être consulté dans le navigateur. Les utilisateurs plus avancés pourraient vouloir utiliser cette fonctionnalité pour surveiller la santé de leur nœud en naviguant vers `ipaddress:3000`, utilisant `utilisateur : admin` et `passe: ethereum`.

## Validateurs {#validators}

Un validateur peut également être ajouté au client de consensus. Le logiciel du validateur permet à votre nœud de participer activement au consensus et fournit au réseau une sécurité cryptoéconomique. Vous avez été récompensé pour ce travail en ETH. Pour faire fonctionner un validateur, vous devez d'abord avoir 32 ETH, qui doivent être déposés dans le contrat de dépôt. **Ceci est un engagement à long terme - il n'est pas encore possible de retirer cet ETH !**. Le dépôt peut être fait en suivant le guide étape par étape sur la [plateforme de lancement](https://launchpad.ethereum.org/). Faites ceci sur un ordinateur de bureau ou portable, mais ne générez pas de clés — cela peut être fait directement sur le Raspberry Pi.

Ouvrir un terminal sur le Raspberry Pi et exécutez la commande suivante pour générer les clés de dépôt :

```
sudo apt-get update
sudo apt-get install staking-deposit-cli
cd && deposit new-mnemonic --num_validators 1
```

Gardez la phrase mnémonique en sécurité ! La commande ci-dessus a généré deux fichiers dans le répertoire de clés du noeud : les clés du validateur et un fichier de données de dépôt. Les données de dépôt doivent être téléchargées sur la plateforme de lancement, donc elles doivent être copiées du Raspberry Pi à l'ordinateur. Cela peut être fait en utilisant une connexion ssh ou toute autre méthode de copier/coller.

Une fois que le fichier de données de dépôt est disponible sur l'ordinateur exécutant la plateforme de lancement, il peut être déplacé et déposé sur le `+` de l'écran de la plateforme de lancement. Suivez les instructions à l'écran pour envoyer une transaction au contrat de dépôt.

Sur le Raspberry Pi, un validateur peut être démarré. Cela nécessite d'importer les clés du validateur, de définir l'adresse pour collecter les récompenses, puis de démarrer le processus de validateur préconfiguré. L'exemple ci-dessous est pour Lighthouse : des instructions pour d'autres clients de consensus sont disponibles sur [la documentation Ethereum on Arm](https://ethereum-on-arm-documentation.readthedocs.io/en/latest/) :

```shell
# import the validator keys
lighthouse account validator import --directory=/home/ethereum/validator_keys

# set the reward address
sudo sed -i 's/<ETH_ADDRESS>' /etc/ethereum/lighthouse-validator.conf

# start the validator
sudo systemctl start lighthouse-validator
```

Félicitations, vous disposez maintenant d'un nœud Ethereum complet et d'un validateur fonctionnant sur un Raspberry Pi !

## Plus de détails {#more-details}

Cette page a donné un aperçu de la façon de mettre en place un nœud et un validateur Geth-Lighthouse utilisant Raspberry Pi. Des instructions plus détaillées sont disponibles sur[ le site Ethereum-on-Arm](https://ethereum-on-arm-documentation.readthedocs.io/en/latest/index.html).

## Commentaires appréciés {#feedback-appreciated}

Nous savons que le Raspberry Pi dispose d'une importante base d'utilisateurs qui pourrait avoir un impact très positif sur la santé du réseau Ethereum. Veuillez parcourir les détails de ce tutoriel, essayez d'exécuter sur les réseaux de test, regardez sur le GitHub Ethereum-on-Arm, émettez vos commentaires, soulevez des problématiques et des pull requests et aidez ainsi à faire avancer la technologie et la documentation !

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
