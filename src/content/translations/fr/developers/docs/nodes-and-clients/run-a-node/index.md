---
title: Créez votre propre nœud Ethereum
description: Introduction générale à l'exécution de votre propre instance d'un client Ethereum.
lang: fr
sidebarDepth: 2
---

La gestion de votre propre nœud vous offre divers avantages, ouvre de nouvelles possibilités et aide à soutenir l'écosystème. Cette page vous guidera en faisant tourner votre propre nœud et en participant à la validation des transactions Ethereum.

## Prérequis {#prerequisites}

Il vous faut comprendre ce qu'est un nœud Ethereum et pourquoi il peut être important d'exécuter un client. Cette section est couverte dans le chapitre [Clients et nœuds](/developers/docs/nodes-and-clients/).

Si vous êtes novice quant au sujet de l'exécution d'un nœud, ou si vous cherchez une explication moins technique, nous vous recommandons de consulter en premier lieu notre introduction facile sur [l'exécution d'un nœud Ethereum](/run-a-node).

## Choisir une approche {#choosing-approach}

La première étape pour faire tourner votre nœud est de choisir votre approche. Vous devez choisir le client (le logiciel), l'environnement et les paramètres avec lesquels vous voulez commencer. Consultez tous les [clients du réseau principal](/developers/docs/nodes-and-clients/#advantages-of-different-implementations) disponibles.

#### Paramètres du client {#client-settings}

Les implémentations de clients offrent différents modes de synchronisation et diverses autres options. [Les modes de synchronisation](/developers/docs/nodes-and-clients/#sync-modes) représentent différentes méthodes de téléchargement et de validation des données blockchain. Avant de commencer le nœud, vous devez décider du réseau et du mode de synchronisation à utiliser. Les choses les plus importantes à considérer sont l'espace disque et le temps de synchronisation dont le client a besoin.

Toutes les fonctionnalités et options se trouvent dans la documentation du client. Diverses configurations de client peuvent être définies en exécutant le client selon les options correspondantes. Vous pouvez obtenir plus d'informations sur les options sur [EthHub](https://docs.ethhub.io/using-ethereum/running-an-ethereum-node/#client-settings) ou via la documentation du client. À des fins de test, vous pouvez exécuter un client sur un des réseaux testnet. [Voir l'aperçu des réseaux pris en charge](/developers/docs/nodes-and-clients/#execution-clients).

### Environnement et matériel {#environment-and-hardware}

#### En local ou dans le cloud {#local-vs-cloud}

Les clients Ethereum peuvent fonctionner sur des ordinateurs grand public et ne nécessitent pas de matériel spécial, comme pour le minage par exemple. Vous disposez donc de différentes options de déploiement en fonction de vos besoins. Pour simplifier, considérons l'exécution d'un nœud à la fois sur une machine physique locale et sur un serveur cloud :

- Cloud
  - Les fournisseurs offrent une disponibilité élevée du serveur, des adresses IP publiques statiques
  - Obtenir un serveur dédié ou virtuel peut être plus confortable que de construire le vôtre
  - L'échange fait confiance à un tiers - fournisseur du serveur
  - En raison de la taille de stockage requise pour le noeud complet, le coût de la location d'un serveur pourrait être élevé
- Son propre matériel
  - Une approche plus digne de confiance et souveraine
  - Investissement ponctuel
  - Une option pour acheter des machines préconfigurées
  - Vous devez préparer physiquement la machine, la maintenir et potentiellement résoudre les problèmes

Les deux options ont différents avantages résumés plus haut. Si vous cherchez une solution cloud, outre les nombreux fournisseurs traditionnels de cloud computing, il existe également des services axés sur le déploiement de nœuds. Par exemple :

- [QuikNode](https://www.quiknode.io/)
- [Blockdaemon](https://blockdaemon.com)
- [LunaNode](https://www.lunanode.com/)
- [Alchemy](https://www.alchemy.com/)

#### Matériel {#hardware}

Cependant, un réseau décentralisé et résistant à la censure ne devrait pas dépendre des fournisseurs de services dans le cloud. Il est plus sain pour l'écosystème d'exécuter votre propre nœud sur du matériel. Les options les plus simples sont les machines préconfigurées comme :

- [DappNode](https://dappnode.io/)
- [Avado](https://ava.do/)

Vérifier les [recommandations concernant l'espace disque minimum de chaque client et de chaque mode de synchronisation](/developers/docs/nodes-and-clients/#requirements). En général, une petite puissance de calcul devrait suffire. En général, le problème réside dans la vitesse du disque. Lors de la synchronisation initiale, les clients Ethereum effectuent de nombreuses opérations de lecture/écriture. Par conséquent, le SSD est fortement recommandé. Un client pourrait même ne pas [être en mesure de synchroniser l'état actuel sur le disque dur](https://github.com/ethereum/go-ethereum/issues/16796#issuecomment-391649278) et rester coincé quelques blocs derrière le réseau principal. Vous pouvez exécuter la plupart des clients sur un [ordinateur à carte unique avec ARM](/developers/docs/nodes-and-clients/#ethereum-on-a-single-board-computer/). Vous pouvez également utiliser le système d'exploitation [Ethbian](https://ethbian.org/index.html) pour Raspberry Pi 4. Cela vous permet d'[exécuter un client en flashant la carte SD](/developers/tutorials/run-node-raspberry-pi/). En fonction de vos logiciels et des choix de matériel, le temps de synchronisation initial et les besoins en stockage peuvent varier. Assurez-vous d'avoir [vérifié les temps de synchronisation et les besoins de stockage](/developers/docs/nodes-and-clients/#recommended-specifications). Assurez-vous également que votre [bande passante](https://wikipedia.org/wiki/Data_cap) vers Internet ne soit pas limitée. Il est recommandé d'utiliser une connexion illimitée car la synchronisation initiale et les données diffusées sur le réseau pourraient dépasser votre limite.

#### Système d'exploitation {#operating-system}

Tous les clients prennent en charge les principaux systèmes d'exploitation - Linux, MacOS, Windows. Cela signifie que vous pouvez exécuter des nœuds sur des ordinateurs de bureau ou des serveurs avec le système d'exploitation (OS) qui vous convient le mieux. Assurez-vous que votre système d'exploitation est à jour pour éviter les problèmes potentiels et les failles de sécurité.

## Faire tourner le nœud {#spinning-up-node}

### Obtenir le logiciel client {#getting-the-client}

Tout d'abord, téléchargez votre [logiciel client](/developers/docs/nodes-and-clients/#execution-clients) préféré.

Vous pouvez simplement télécharger une application exécutable ou un pack d'installation qui convient à votre système d'exploitation et à votre architecture. Vérifiez toujours les signatures et les sommes de contrôle des packs téléchargés. Certains clients proposent également des répertoires pour faciliter l'installation et les mises à jour. Si vous préférez, vous pouvez en élaborer un à la source. Tous les clients sont open source et vous pouvez les construire à partir du code source avec le compilateur approprié.

Les binaires exécutables pour les implémentations de clients stables du réseau principal peuvent être téléchargés à partir de leurs pages de publication :

- [Geth](https://geth.ethereum.org/downloads/)
- [OpenEthereum,](https://github.com/openethereum/openethereum/releases)
- [Nethermind](https://downloads.nethermind.io/)
- [Besu](https://besu.hyperledger.org/en/stable/)
- [Erigon](https://github.com/ledgerwatch/erigon)

**Notez que OpenEthereum [a été déprécié](https://medium.com/openethereum/gnosis-joins-erigon-formerly-turbo-geth-to-release-next-gen-ethereum-client-c6708dd06dd) et n'est plus entretenu.** Utilisez-le avec prudence et de préférence passez à une autre implémentation client.

### Démarrer le client {#starting-the-client}

Avant de démarrer le logiciel client Ethereum, vérifiez que votre environnement est prêt. Par exemple, assurez-vous que :

- Vous disposez d'assez d'espace disque en tenant compte du mode de synchronisation et du réseau choisi.
- La mémoire et le processeur ne sont pas déjà utilisés par d'autres programmes.
- Votre système d'exploitation est mis à jour à la dernière version.
- Le système a une date et une heure correctes.
- Votre routeur et votre pare-feu acceptent les connexions sur les ports d'écoute. Par défaut, les clients Ethereum utilisent un port listener (TCP) et un port discovery (UDP), tous deux sur 30303 par défaut.

Exécutez d'abord votre client sur un réseau test pour vous assurer que tout fonctionne correctement. [Exécuter un nœud léger Geth](/developers/tutorials/run-light-node-geth/) devrait aider. Au démarrage, vous devez déclarer tous les paramètres du client qui ne sont pas par défaut. Vous pouvez utiliser les drapeaux ou le fichier de configuration pour indiquer votre configuration préférée. Consultez la documentation de votre client pour plus de détails. L'exécution du client lancera ses fonctions de base, les points de terminaison choisis et lancera la recherche de pairs. Après avoir découvert avec succès les pairs, le client débutera la synchronisation. Les données actuelles de la blockchain seront disponibles une fois le client correctement synchronisé avec l'état actuel.

### Utiliser le client {#using-the-client}

Les clients proposent des points de terminaison d'API RPC que vous pouvez utiliser pour contrôler le client et interagir avec le réseau Ethereum de différentes manières :

- Appel manuel avec un protocole approprié (par exemple en utilisant `curl`)
- Attachement d'une console fournie (par exemple `geth attach`)
- Implémentation dans les applications

Chaque client dispose d'une implémentation différente des points de terminaison RPC. Mais il existe un standard JSON-RPC que vous pouvez utiliser avec chaque client. Pour un aperçu [lisez la documentation JSON-RPC](https://eth.wiki/json-rpc/API). Les applications ayant besoin d'informations du réseau Ethereum peuvent utiliser ce RPC. Par exemple, le portefeuille populaire MetaMask vous permet [d'exécuter une instance locale de blockchain et de vous y connecter](https://metamask.zendesk.com/hc/en-us/articles/360015290012-Using-a-Local-Node).

#### Atteindre le RPC {#reaching-rpc}

Le port par défaut de JSON-RPC est `8545` mais vous pouvez modifier les ports des points de terminaison locaux dans le fichier de configuration. Par défaut, l'interface RPC n'est accessible que sur l'hôte local de votre ordinateur. Pour la rendre accessible à distance, vous pourriez envisager de l'exposer au public en modifiant l'adresse sur `0.0.0.0`. Cela la rendra accessible via les adresses IP locales et publiques. Dans la plupart des cas, vous devrez également configurer la redirection de port sur votre routeur.

Vous devriez effectuer ces opérations avec grande prudence dans la mesure où cela permettra à quiconque sur Internet de contrôler votre nœud. Des acteurs malveillants pourraient accéder à votre nœud pour neutraliser votre système ou voler vos fonds si vous utilisez votre client comme portefeuille.

Pour contourner ce problème, vous pouvez empêcher les méthodes RPC potentiellement dangereuses d'être modifiables. Par exemple, avec `geth`, vous pouvez indiquer des méthodes modifiables via un drapeau : `--http.api web3,eth,txpool`.

Vous pouvez également héberger l'accès à votre interface RPC en pointant le service de serveur web comme Nginx vers l'adresse locale et le port de votre client.

La façon la plus simple et la plus respectueuse de la vie privée de créer un point de terminaison accessible au public est de l'héberger sur votre propre service d'oignon [Tor](https://www.torproject.org/). Cela vous permettra d'atteindre le RPC en dehors de votre réseau local sans adresse IP publique statique ni ports ouverts. Pour cela :

- Installez `tor`
- Modifiez la configuration de `torrc` pour activer le service caché avec l'adresse RPC et le port de votre client
- Redémarrez le service `tor`

Une fois que vous aurez redémarré Tor, vous obtiendrez des clés de service cachées et un nom d'hôte dans le répertoire de votre choix. À partir de là, votre RPC sera joignable sur un nom d'hôte `.onion`.

### Maintenir le nœud {#operating-the-node}

Vous devriez surveiller régulièrement votre nœud pour vous assurer qu'il fonctionne correctement. Vous devrez peut-être effectuer un entretien occasionnel.

#### Garder le nœud en ligne {#keeping-node-online}

Votre nœud ne doit pas être en ligne en permanence, mais vous devriez le maintenir en ligne le plus souvent possible pour qu'il reste synchronisé avec le réseau. Vous pouvez l'éteindre pour le redémarrer, mais gardez en tête que :

- L'arrêt peut prendre jusqu'à plusieurs minutes si le dernier état est toujours en cours d'écriture sur le disque.
- Les arrêts forcés peuvent endommager la base de données.
- Votre client sera désynchronisé du réseau et devra donc rétablir sa synchronisation lors du redémarrage.

_Ceci ne s'applique pas pour les nœuds de validateur de couche consensuel._ Mettre votre nœud hors ligne affectera tous les services qui en dépendent. Si vous exécutez un nœud pour _miser_, vous devriez essayer de minimiser le temps d'arrêt autant que possible.

#### Créer un service pour le client {#creating-client-service}

Envisagez de créer un service pour exécuter automatiquement votre client au démarrage. Par exemple, sur les serveurs Linux, la bonne pratique consisterait à créer un service qui exécute le client avec une configuration appropriée, sous un utilisateur aux privilèges limités et qui redémarre automatiquement.

#### Mettre à jour le client {#updating-client}

Vous devez conserver votre logiciel client à jour avec les derniers patchs de sécurité, les dernières fonctionnalités et les [EIPs](/eips/). Tout particulièrement avant [les fourches majeures](/history/), assurez-vous que vous utilisez la bonne version client.

Chaque implémentation client dispose d'un identifiant de version lisible par l'homme et utilisé dans le protocole de pair-à-pair, mais également accessible depuis la ligne de commande. Cet identifiant permet aux utilisateurs de vérifier qu'ils utilisent la bonne version et aux explorateurs de blocs et autres outils d'analyse de mesurer la distribution des différents clients sur le réseau. Veuillez vous référer à la documentation de chaque client pour plus d'informations sur les chaînes de version.

#### Faire fonctionner des services supplémentaires {#running-additional-services}

Exécuter votre propre nœud vous permet d'utiliser des services qui nécessitent un accès direct au client RPC Ethereum. Ce sont des services construits au-dessus d'Ethereum comme les solutions de[couche 2, ](/developers/docs/scaling/#layer-2-scaling), les [clients de consensus](/upgrades/get-involved/#clients), et d'autres infrastructures Ethereum.

#### Surveiller le nœud {#monitoring-the-node}

Pour bien surveiller votre nœud, envisagez de collecter des métriques. Les clients fournissent des points de terminaison métriques pour que vous puissiez obtenir des données complètes sur votre noeud. Utilisez des outils comme [InfluxDB](https://www.influxdata.com/get-influxdb/) ou [Prometheus](https://prometheus.io/) pour créer des bases de données susceptibles d'être transformées en visualisations et graphiques dans des logiciels tels que [Grafana](https://grafana.com/). Il existe différentes configurations pour utiliser ce logiciel et différents tableaux de bord Grafana pour visualiser votre nœud et le réseau dans son ensemble. Dans le cadre de votre surveillance, assurez-vous de garder un œil sur les performances de votre machine. Lors de la synchronisation initiale de votre nœud, le logiciel client peut être très lourd en CPU et en RAM. Outre Grafana, vous pouvez utiliser les outils proposés par votre système d'exploitation comme `htop` ou `uptime` pour le faire.

## Complément d'information {#further-reading}

- [Analyser les exigences matérielles pour être un nœud Ethereum entièrement validé](https://medium.com/coinmonks/analyzing-the-hardware-requirements-to-be-an-ethereum-full-validated-node-dc064f167902) _- Albert Palau, 24 septembre 2018_
- [Exécuter des nœuds Ethereum complets : un guide pour les peu motivés](https://medium.com/@JustinMLeroux/running-ethereum-full-nodes-a-guide-for-the-barely-motivated-a8a13e7a0d31) _- Justin Leroux, 7 novembre 2019_
- [Exécuter un nœud Ethereum](https://docs.ethhub.io/using-ethereum/running-an-ethereum-node/) _– ETHHub, mis à jour régulièrement_
- [Exécuter un nœud Hyperledger Besu sur le réseau principal d'Ethereum : avantages, exigences et configuration](https://pegasys.tech/running-a-hyperledger-besu-node-on-the-ethereum-mainnet-benefits-requirements-and-setup/) _- Felipe Faraggi, 7 mai 2020_
- [Déploiement du client Nethermind Ethereum avec la pile de surveillance](https://medium.com/nethermind-eth/deploying-nethermind-ethereum-client-with-monitoring-stack-55ce1622edbd) _– Nethermind.eth, 8 July 2020_

## Sujets connexes {#related-topics}

- [Nœuds et clients](/developers/docs/nodes-and-clients/)
- [Les blocs](/developers/docs/blocks/)
- [Réseaux](/developers/docs/networks/)
