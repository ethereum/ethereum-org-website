---
title: Comment transformer son Raspberry Pi 4 en un nœud en flashant simplement la carte MicroSD
description: Flashez votre Raspberry Pi 4, branchez-y un câble Ethernet, connectez le disque SSD et mettez l'appareil en marche pour transformer votre Raspberry Pi 4 en un nœud Ethereum complet exécutant la couche d'exécution ou la couche de consensus (chaîne phare / validateur)
author: "EthereumOnArm"
tags:
  - "clients"
  - "couche d'exécution"
  - "couche de consensus"
  - "nœuds"
lang: fr
skill: intermediate
published: 2020-05-07
source: r/ethereum
sourceUrl: https://www.reddit.com/r/ethereum/comments/gf3nhg/ethereum_on_arm_raspberry_pi_4_images_release/
---

**TL; DR** : Flashez votre Raspberry Pi 4, branchez-y un câble Ethernet, connectez le disque SSD et mettez l'appareil en marche pour transformer votre Raspberry Pi 4 en un nœud Ethereum complet exécutant la couche d'exécution ou la couche de consensus (chaîne phare / validateur)

[En savoir plus sur les mises à jour d'Ethereum](/upgrades/)

Pour commencer, un peu de contexte. Comme vous le savez, on peut rencontrer des problèmes de mémoire [[1]](/developers/tutorials/run-node-raspberry-pi/#references) puisque l'image du Raspberry Pi 4 dans le cadre du système d'exploitation Raspbian est toujours en 32 bits [[2]](/developers/tutorials/run-node-raspberry-pi/#references) (en tout cas l'espace utilisateur). Si on préfère s'en tenir au système d'exploitation officiel, nous sommes arrivés à la conclusion que, pour résoudre ces problèmes, il faut migrer vers un système d'exploitation natif 64 bits

De plus, [les clients de consensus](/upgrades/get-involved/#clients) ne prennent pas en charge les binaires en 32 bits, donc l'utilisation de Raspbian exclurait le Raspberry Pi 4 de l'exécution d'un noeud de couche de consensus (et la possibilité de miser).

Donc, après plusieurs tests, nous sortons 2 images différentes basées sur Ubuntu 20.4 64 bits [[3]](/developers/tutorials/run-node-raspberry-pi/#references) : une édition pour la couche d'exécution et l'autre pour la couche de consensus.

Fondamentalement, il s'agit de la même image basée sur Raspbian avec les mêmes caractéristiques. Mais elles sont configurées par défaut pour exécuter le logiciel de couche d'exécution ou de couche de consensus.

**Les images s'occupent de réaliser toutes les étapes nécessaires**, allant de la configuration de l'environnement et du formatage du disque SSD, à l'installation et à l'exécution du logiciel client Ethereum, ainsi qu'au lancement de la synchronisation avec la blockchain.

## Principales caractéristiques {#main-features}

- Se base sur Ubuntu 20.04 64 bits
- Partitionnement et formatage automatiques des disques USB
- Ajout de mémoire d'échange (module ZRAM kernel + fichier d'échange) basée sur le travail Armbian [[7]](/developers/tutorials/run-node-raspberry-pi/#references)
- Change le nom d'hôte en quelque chose comme « ethnode-e2a3e6fe » basé sur le hachage MAC
- Exécute un logiciel en tant que service système et commence la synchronisation avec la Blockchain
- Inclut un dépôt APT pour installer et mettre à jour le logiciel Ethereum
- Inclut un tableau de bord de surveillance basé sur Grafana / Prometheus

## Logiciels inclus {#software-included}

Les deux images incluent les mêmes paquets, la seule différence entre elles est que l'édition exécution utilise Geth par défaut et que l'édition consensus s'appuie sur Prysm comme client beacon chain par défaut.

### Clients d'exécution {#execution-clients}

- Geth [[8]](/developers/tutorials/run-node-raspberry-pi/#references) : 1.9.13 (binaire officiel)
- Parity [[9]](/developers/tutorials/run-node-raspberry-pi/#references) : 2.7.2 (transpilé)
- Nethermind [[10]](/developers/tutorials/run-node-raspberry-pi/#references) : 1.8.28 (transpilé)
- Hyperledger Besu [[11]](/developers/tutorials/run-node-raspberry-pi/#references) : 1.4.4 (compilé)

### Clients de consensus {#consensus-clients}

- Prysm [[12]](/developers/tutorials/run-node-raspberry-pi/#references) : 1.0.0-alpha6 (binaire officiel)
- Lighthouse [[13]](/developers/tutorials/run-node-raspberry-pi/#references) : 0.1.1 (compilé)

### Framework Ethereum {#ethereum-framework}

- Swarm [[14]](/developers/tutorials/run-node-raspberry-pi/#references) : 0.5.7 (binaire officiel)
- Raiden Network [[15]](/developers/tutorials/run-node-raspberry-pi/#references) : 0.200.0~rc1 (binaire officiel)
- IPFS [[16]](/developers/tutorials/run-node-raspberry-pi/#references) : 0.5.0 (binaire officiel)
- Statusd [[17]](/developers/tutorials/run-node-raspberry-pi/#references) : 0.52.3 (compilé)
- Vipnode [[18]](/developers/tutorials/run-node-raspberry-pi/#references) : 2.3.3 (binaire officiel)

## Guide d'installation et d'utilisation {#installation-guide-and-usage}

### Matériel et configuration recommandés {#recommended-hardware-and-setup}

- Raspberry 4 (modèle B) - 4Go
- Carte MicroSD (16 Go Classe 10 minimum)
- Disque SSD USB 3.0 (voir la section stockage)
- Alimentation électrique
- Un câble Ethernet
- Redirection du Port 30303 (couche d'exécution) et redirection du Port 13000 (couche de consensus) [[4]](/developers/tutorials/run-node-raspberry-pi/#references)
- Un boîtier avec dissipateur de chaleur et ventilateur (facultatif mais fortement recommandé)
- Clavier USB, moniteur et câble HDMI (micro-HDMI) (facultatif)

## Stockage {#storage}

Vous aurez besoin d'un SSD pour exécuter les clients Ethereum (sans disque SSD, vous n'avez absolument aucune chance de vous synchroniser avec la blockchain Ethereum). Vous avez 2 options :

- Utiliser un disque SSD USB portable tel que le SSD Samsung Portable T5.
- Utiliser un boîtier externe USB 3.0 pour disque dur avec un disque SSD. Dans notre cas, nous avons utilisé un dock Inateck pour disque dur 2,5 FE2011. Assurez-vous d'acheter un boîtier avec une puce compatible UAS, si possible l'une des suivantes : JMicron (JMS567 ou JMS578) ou ASMedia (ASM1153E).

Dans les deux cas, évitez d'utiliser des disques SSD de mauvaise qualité, car c'est un composant clé de votre nœud et cela peut considérablement affecter les performances (et les temps de synchronisation).

N'oubliez pas que vous devez brancher le disque sur un port USB 3.0 (bleu)

## Téléchargement et installation de l'image {#image-download-and-installation}

### 1. Télécharger les images de couche de consensus et d'exécution {#1-download-execution-or-consensus-images}

<ButtonLink to="https://ethraspbian.com/downloads/ubuntu-20.04-preinstalled-server-arm64+raspi-eth1.img.zip">
  Téléchargez l'image de la couche d'exécution
</ButtonLink>

sha256 7fa9370d13857dd6abcc8fde637c7a9a7e3a66b307d5c28b0c0d29a09c73c55c

<ButtonLink to="https://ethraspbian.com/downloads/ubuntu-20.04-preinstalled-server-arm64+raspi-eth2.img.zip">
  Téléchargez l'image de la couche de consensus
</ButtonLink>

sha256 74c0c15b708720e5ae5cac324f1afded6316537fb17166109326755232cd316e

### 2. Flasher l'image {#2-flash-the-image}

Insérez la carte microSD dans votre ordinateur de bureau / ordinateur portable et téléchargez le fichier (couche d'exécution, par exemple) :

```bash
wget https://ethraspbian.com/downloads/ubuntu-20.04-preinstalled-server-arm64+raspi-eth1.img.zip
```

Remarque : si vous n'êtes pas à l'aise avec l'interface de ligne de commande ou si vous utilisez Windows, vous pouvez recourir à [Etcher](https://etcher.io)

Ouvrez un terminal et vérifiez le nom de votre périphérique MicroSD qui est en cours d'exécution :

```bash
sudo fdisk -l
```

Vous devriez voir un périphérique ayant pour nom mmcblk0 ou sdd. Décompressez et flashez l'image :

```bash
unzip ubuntu-20.04-preinstalled-server-arm64+raspi-eth1.img.zip
sudo dd bs=1M if=ubuntu-20.04-preinstalled-server-arm64+raspi-eth1.img of=/dev/mmcblk0 && sync
```

### 3. Insérez la carte MicroSD dans le Raspberry Pi 4. Connectez un câble Ethernet et branchez le disque SSD USB (assurez-vous que vous utilisez bien un port bleu). {#3-insert-the-microsd-into-the-raspberry-pi-4-connect-an-ethernet-cable-and-attach-the-usb-ssd-disk-make-sure-you-are-using-a-blue-port}

### 4. Mettre l'appareil sous tension {#4-power-on-the-device}

Le système d'exploitation Ubuntu démarrera en moins d'une minute mais **vous devrez attendre environ 10 minutes** afin de permettre au script d'effectuer les tâches nécessaires pour transformer l'appareil en un nœud Ethereum et redémarrer le Raspberry.

En fonction de l'image, vous allez exécuter :

- Client d'exécution : Geth comme client par défaut de synchronisation de la blockchain
- Client de consensus : Prysm comme client par défaut de synchronisation de la chaîne phare (Prater testnet)

### 5. S'identifier {#5-log-in}

Vous pouvez vous connecter via SSH ou en utilisant la console (si vous avez un moniteur et un clavier connectés).

```bash
Utilisateur : ethereum
Mot de passe : ethereum
```

Vous serez invité à changer le mot de passe lors de votre première connexion, il vous faudra donc vous identifier deux fois.

### 6. Ouvrez le port 30303 pour Geth et 13000 si vous utilisez la chaîne phare Prysm. Si vous ne savez pas comment faire, cherchez sur Google « transfert de port » suivi de votre modèle de routeur. {#6-open-30303-port-for-geth-and-13000-if-you-are-running-prysm-beacon-chain-if-you-dont-know-how-to-do-this-google-port-forwarding-followed-by-your-router-model}

### 7. Obtenir la sortie de la console {#7-get-console-output}

Vous pouvez voir ce qui se passe en arrière-plan en tapant :

```bash
sudo tail -f /var/log/syslog
```

**Félicitations. Vous exécutez désormais un nœud Ethereum complet sur votre Raspberry Pi 4.**

## Synchronisation de la blockchain {#syncing-the-blockchain}

Vous devez maintenant attendre que la blockchain soit synchronisée. Dans le cas de la couche d'exécution, cela pourra prendre quelques jours en fonction de plusieurs facteurs, mais il faudra bien compter 5 à 7 jours.

Si vous utilisez la couche de consensus Prater testnet, vous pouvez attendre 1 à 2 jours avant la synchronisation de la chaîne phare. N'oubliez pas que vous devrez configurer le validateur plus tard afin de démarrer le processus de mise en jeu. [Comment exécuter le validateur de couche de consensus](/developers/tutorials/run-node-raspberry-pi/#validator)

## Tableaux de bord de suivi {#monitoring-dashboards}

Pour cette première version, nous avons inclus 3 tableaux de bord de suivi basés sur Prometheus [[5]](/developers/tutorials/run-node-raspberry-pi/#references) / Grafana [[6]](/developers/tutorials/run-node-raspberry-pi/#references) afin de surveiller le nœud et les données des clients (Geth et Besu). Vous pouvez y accéder via votre navigateur Web :

```bash
URL : http://your_raspberrypi_IP:3000
Utilisateur : admin
Mot de passe : ethereum
```

## Changer de clients {#switching-clients}

Tous les clients fonctionnent en tant que service système. C'est important parce que si un problème se produit, le système relancera automatiquement le processus.

Geth et Prysm fonctionnent par défaut (selon ce que vous synchronisez, couche d'exécution ou couche de consensus) donc, si vous voulez passer à d'autres clients (par exemple de Geth à Nethermind), vous devez d'abord arrêter et désactiver Geth puis activer et démarrer l'autre client :

```bash
sudo systemctl stop geth && sudo systemctl disable geth
```

Commandes pour activer et démarrer chaque client d'exécution :

```bash
sudo systemctl enable besu && sudo systemctl start besu
sudo systemctl enable nethermind && sudo systemctl start nethermind
sudo systemctl enable parity && sudo systemctl start parity
```

Clients de consensus :

```bash
sudo systemctl stop prysm-beacon && sudo systemctl disable prysm-beacon
sudo systemctl start lighthouse && sudo systemctl enable lighthouse
```

## Changer les paramètres {#changing-parameters}

Les fichiers de configuration des clients se trouvent dans le répertoire /etc/ethereum/. Vous pouvez modifier ces fichiers et redémarrer le système afin que les changements soient pris en compte. La seule exception est Nethermind qui, en outre, dispose d'un fichier de configuration du réseau principal qui se trouve ici :

```bash
/etc/nethermind/configs/mainnet.cfg
```

Les données des clients Blockchain sont stockées sur le compte principal Ethereum comme suit (notez le point avant le nom du répertoire) :

### Couche d'exécution {#execution-layer}

```bash
/home/ethereum/.geth
/home/ethereum/.parity
/home/ethereum/.besu
/home/ethereum/.nethermind
```

### Couche de consensus {#consensus-layer}

```bash
/home/ethereum/.eth2
/home/ethereum/.eth2validators
/home/ethereum/.lighthouse
```

## Nethermind et Hyperledger Besu {#nethermind-and-hyperledger-besu}

Ces deux grands clients d'exécution sont devenus d'excellentes alternatives à Geth et Parity. Plus le réseau est diversifié, mieux c'est. Vous pouvez ainsi essayer de contribuer à la bonne santé du réseau.

Tous deux nécessitent de nouveaux tests alors n'hésitez pas à vous exercer avec et à faire part de vos commentaires.

## Comment exécuter le validateur de consensus (mise en jeu) {#validator}

Une fois que la chaîne phare Prater testnet est synchronisée, vous pouvez exécuter un validateur sur le même appareil. Vous devrez suivre [ces étapes de participation](https://prylabs.net/participate).

La première fois, vous devrez créer manuellement un compte en exécutant le « validateur » binaire et configurer un mot de passe. Une fois cette étape terminée, vous pouvez ajouter le mot de passe à `/etc/ethereum/prysm-validator.conf` et démarrer le validateur en tant que service système.

## Commentaires appréciés {#feedback-appreciated}

Nous avons beaucoup travaillé pour parvenir à configurer le Raspberry Pi 4 en tant que nœud Ethereum complet, car nous savons que la base d'utilisateurs massive de cet appareil peut avoir un impact très positif sur le réseau.

Veuillez prendre en coonsidération que ceci est la première image basée sur Ubuntu 20.04, il peut donc exister quelques bugs. Si tel était le cas, vous pouvez ouvrir un ticket sur [GitHub](https://github.com/diglos/ethereumonarm) ou nous contacter sur [Twitter](https://twitter.com/EthereumOnARM).

## Références {#references}

1. [geth crash à plusieurs reprises avec SIGSEGV](https://github.com/ethereum/go-ethereum/issues/20190)
2. [https://github.com/diglos/ethereumonarm](https://github.com/diglos/ethereumonarm)
3. https://ubuntu.com/download/raspberry-pi
4. https://wikipedia.org/wiki/Port_forwarding
5. https://prometheus.io
6. https://grafana.com
7. https://forum.armbian.com/topic/5565-zram-vs-swap/
8. https://geth.ethereum.org
9. https://github.com/openethereum/openethereum \* **Veuillez noter que OpenEthereum [a été déprécié](https://medium.com/openethereum/gnosis-joins-erigon-formerly-turbo-geth-to-release-next-gen-ethereum-client-c6708dd06dd) et n'est plus maintenu.** Utilisez-le avec prudence et passez de préférence à une autre implémentation client.
10. https://nethermind.io
11. https://www.hyperledger.org/projects/besu
12. https://github.com/prysmaticlabs/prysm
13. https://lighthouse.sigmaprime.io
14. https://ethersphere.github.io/swarm-home
15. https://raiden.network
16. https://ipfs.io
17. https://status.im
18. https://vipnode.org
