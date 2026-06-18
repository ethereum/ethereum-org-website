---
title: Couche réseau
description: Une introduction à la couche réseau d'Ethereum.
lang: fr
sidebarDepth: 2
---

[Ethereum](/) est un réseau pair à pair composé de milliers de nœuds qui doivent pouvoir communiquer entre eux en utilisant des protocoles standardisés. La « couche réseau » est la pile de protocoles qui permet à ces nœuds de se trouver et d'échanger des informations. Cela inclut le « commérage » (gossiping) d'informations (communication de un à plusieurs) sur le réseau ainsi que l'échange de requêtes et de réponses entre des nœuds spécifiques (communication de un à un). Chaque nœud doit respecter des règles de réseau spécifiques pour s'assurer qu'il envoie et reçoit les bonnes informations.

Le logiciel client se compose de deux parties (les clients d'exécution et les clients de consensus), chacune ayant sa propre pile réseau distincte. En plus de communiquer avec d'autres nœuds Ethereum, les clients d'exécution et de consensus doivent communiquer entre eux. Cette page donne une explication introductive des protocoles qui permettent cette communication.

Les clients d'exécution diffusent les transactions via le protocole de commérage sur le réseau pair à pair de la couche d'exécution. Cela nécessite une communication chiffrée entre des pairs authentifiés. Lorsqu'un validateur est sélectionné pour proposer un bloc, les transactions du pool de transactions local du nœud seront transmises aux clients de consensus via une connexion RPC locale, qui seront empaquetées dans des blocs phares. Les clients de consensus diffuseront ensuite les blocs phares via le protocole de commérage sur leur réseau p2p. Cela nécessite deux réseaux p2p distincts : un connectant les clients d'exécution pour le commérage des transactions et un connectant les clients de consensus pour le commérage des blocs.

## Prérequis {#prerequisites}

Une certaine connaissance des [nœuds et clients](/developers/docs/nodes-and-clients/) Ethereum sera utile pour comprendre cette page.

## La couche d'exécution {#execution-layer}

Les protocoles réseau de la couche d'exécution sont divisés en deux piles :

- la pile de découverte : construite sur UDP, elle permet à un nouveau nœud de trouver des pairs auxquels se connecter

- la pile devp2p : repose sur TCP et permet aux nœuds d'échanger des informations

Les deux piles fonctionnent en parallèle. La pile de découverte intègre les nouveaux participants au réseau, et la pile devp2p permet leurs interactions.

### Découverte {#discovery}

La découverte est le processus de recherche d'autres nœuds sur le réseau. Cela est amorcé à l'aide d'un petit ensemble de nœuds d'amorçage (des nœuds dont les adresses sont [codées en dur](https://github.com/ethereum/go-ethereum/blob/master/params/bootnodes.go) dans le client afin qu'ils puissent être trouvés immédiatement et connecter le client à des pairs). Ces nœuds d'amorçage n'existent que pour présenter un nouveau nœud à un ensemble de pairs - c'est leur seul but, ils ne participent pas aux tâches normales du client comme la synchronisation de la chaîne, et ils ne sont utilisés que la toute première fois qu'un client est lancé.

Le protocole utilisé pour les interactions nœud-nœud d'amorçage est une forme modifiée de [Kademlia](https://medium.com/coinmonks/a-brief-overview-of-kademlia-and-its-use-in-various-decentralized-platforms-da08a7f72b8f) qui utilise une [table de hachage distribuée](https://en.wikipedia.org/wiki/Distributed_hash_table) pour partager des listes de nœuds. Chaque nœud possède une version de cette table contenant les informations requises pour se connecter à ses pairs les plus proches. Cette « proximité » n'est pas géographique - la distance est définie par la similarité de l'ID du nœud. La table de chaque nœud est régulièrement actualisée par mesure de sécurité. Par exemple, dans [discv5](https://github.com/ethereum/devp2p/tree/master/discv5), les nœuds du protocole de découverte sont également capables d'envoyer des « annonces » qui affichent les sous-protocoles que le client prend en charge, permettant aux pairs de négocier les protocoles qu'ils peuvent tous deux utiliser pour communiquer.

La découverte commence par une partie de PING-PONG. Un PING-PONG réussi « lie » le nouveau nœud à un nœud d'amorçage. Le message initial qui alerte un nœud d'amorçage de l'existence d'un nouveau nœud entrant sur le réseau est un `PING`. Ce `PING` inclut des informations hachées sur le nouveau nœud, le nœud d'amorçage et un horodatage d'expiration. Le nœud d'amorçage reçoit le `PING` et renvoie un `PONG` contenant le hash du `PING`. Si les hashs du `PING` et du `PONG` correspondent, alors la connexion entre le nouveau nœud et le nœud d'amorçage est vérifiée et on dit qu'ils sont « liés ».

Une fois lié, le nouveau nœud peut envoyer une requête `FIND-NEIGHBOURS` au nœud d'amorçage. Les données renvoyées par le nœud d'amorçage incluent une liste de pairs auxquels le nouveau nœud peut se connecter. Si les nœuds ne sont pas liés, la requête `FIND-NEIGHBOURS` échouera, de sorte que le nouveau nœud ne pourra pas entrer sur le réseau.

Une fois que le nouveau nœud reçoit une liste de voisins du nœud d'amorçage, il commence un échange PING-PONG avec chacun d'eux. Des PING-PONG réussis lient le nouveau nœud à ses voisins, permettant l'échange de messages.

```
démarrer le client --> se connecter au nœud d'amorçage --> se lier au nœud d'amorçage --> trouver des voisins --> se lier aux voisins
```

Les clients d'exécution utilisent actuellement le protocole de découverte [Discv4](https://github.com/ethereum/devp2p/blob/master/discv4.md) et un effort actif est en cours pour migrer vers le protocole [discv5](https://github.com/ethereum/devp2p/tree/master/discv5).

#### ENR : Enregistrements de nœuds Ethereum {#enr}

L'[enregistrement de nœud Ethereum (ENR)](/developers/docs/networking-layer/network-addresses/) est un objet qui contient trois éléments de base : une signature (hash du contenu de l'enregistrement réalisé selon un schéma d'identité convenu), un numéro de séquence qui suit les modifications de l'enregistrement, et une liste arbitraire de paires clé:valeur. Il s'agit d'un format évolutif qui facilite l'échange d'informations d'identification entre de nouveaux pairs et constitue le format d'[adresse réseau](/developers/docs/networking-layer/network-addresses) préféré pour les nœuds Ethereum.

#### Pourquoi la découverte est-elle construite sur UDP ? {#why-udp}

UDP ne prend en charge aucune vérification d'erreur, aucun renvoi de paquets échoués, ni l'ouverture et la fermeture dynamiques de connexions - au lieu de cela, il envoie simplement un flux continu d'informations vers une cible, qu'elles soient reçues avec succès ou non. Cette fonctionnalité minimale se traduit également par une surcharge minimale, rendant ce type de connexion très rapide. Pour la découverte, où un nœud souhaite simplement signaler sa présence afin d'établir ensuite une connexion formelle avec un pair, UDP est suffisant. Cependant, pour le reste de la pile réseau, UDP n'est pas adapté. L'échange d'informations entre les nœuds est assez complexe et nécessite donc un protocole plus complet pouvant prendre en charge le renvoi, la vérification des erreurs, etc. La surcharge supplémentaire associée à TCP vaut la fonctionnalité supplémentaire. Par conséquent, la majorité de la pile P2P fonctionne sur TCP.

### devp2p {#devp2p}

devp2p est en soi toute une pile de protocoles qu'Ethereum implémente pour établir et maintenir le réseau pair à pair. Une fois que de nouveaux nœuds entrent sur le réseau, leurs interactions sont régies par les protocoles de la pile [devp2p](https://github.com/ethereum/devp2p). Ceux-ci reposent tous sur TCP et incluent le protocole de transport RLPx, le protocole filaire (wire protocol) et plusieurs sous-protocoles. [RLPx](https://github.com/ethereum/devp2p/blob/master/rlpx.md) est le protocole régissant l'initiation, l'authentification et le maintien des sessions entre les nœuds. RLPx encode les messages en utilisant RLP (Recursive Length Prefix), qui est une méthode très économe en espace pour encoder des données dans une structure minimale pour l'envoi entre les nœuds.

Une session RLPx entre deux nœuds commence par une poignée de main cryptographique initiale. Cela implique que le nœud envoie un message d'authentification qui est ensuite vérifié par le pair. En cas de vérification réussie, le pair génère un message d'accusé de réception d'authentification à renvoyer au nœud initiateur. Il s'agit d'un processus d'échange de clés qui permet aux nœuds de communiquer de manière privée et sécurisée. Une poignée de main cryptographique réussie déclenche ensuite l'envoi par les deux nœuds d'un message « hello » l'un à l'autre « sur le fil » (on the wire). Le protocole filaire est initié par un échange réussi de messages hello.

Les messages hello contiennent :

- la version du protocole
- l'ID du client
- le port
- l'ID du nœud
- la liste des sous-protocoles pris en charge

Ce sont les informations requises pour une interaction réussie car elles définissent quelles capacités sont partagées entre les deux nœuds et configurent la communication. Il existe un processus de négociation de sous-protocole où les listes de sous-protocoles pris en charge par chaque nœud sont comparées et ceux qui sont communs aux deux nœuds peuvent être utilisés dans la session.

En plus des messages hello, le protocole filaire peut également envoyer un message « disconnect » qui avertit un pair que la connexion sera fermée. Le protocole filaire inclut également des messages PING et PONG qui sont envoyés périodiquement pour garder une session ouverte. Les échanges RLPx et du protocole filaire établissent donc les bases de la communication entre les nœuds, fournissant l'échafaudage pour que des informations utiles soient échangées selon un sous-protocole spécifique.

### Sous-protocoles {#sub-protocols}

#### Protocole filaire {#wire-protocol}

Une fois que les pairs sont connectés et qu'une session RLPx a été démarrée, le protocole filaire définit comment les pairs communiquent. Initialement, le protocole filaire définissait trois tâches principales : la synchronisation de la chaîne, la propagation des blocs et l'échange de transactions. Cependant, une fois qu'Ethereum est passé à la preuve d'enjeu (PoS), la propagation des blocs et la synchronisation de la chaîne sont devenues une partie de la couche de consensus. L'échange de transactions relève toujours de la compétence des clients d'exécution. L'échange de transactions fait référence à l'échange de transactions en attente entre les nœuds afin que les constructeurs de blocs puissent en sélectionner certaines pour les inclure dans le bloc suivant. Des informations détaillées sur ces tâches sont disponibles [ici](https://github.com/ethereum/devp2p/blob/master/caps/eth.md). Les clients qui prennent en charge ces sous-protocoles les exposent via le [JSON-RPC](/developers/docs/apis/json-rpc/).

#### les (sous-protocole Ethereum léger) {#les}

Il s'agit d'un protocole minimal pour la synchronisation des clients légers. Traditionnellement, ce protocole a rarement été utilisé car les nœuds complets sont tenus de fournir des données aux clients légers sans être incités à le faire. Le comportement par défaut des clients d'exécution n'est pas de fournir des données de client léger via les. Plus d'informations sont disponibles dans la [spécification](https://github.com/ethereum/devp2p/blob/master/caps/les.md) les.

#### Snap {#snap}

Le [protocole snap](https://github.com/ethereum/devp2p/blob/master/caps/snap.md#ethereum-snapshot-protocol-snap) est une extension facultative qui permet aux pairs d'échanger des instantanés d'états récents, permettant aux pairs de vérifier les données de compte et de stockage sans avoir à télécharger les nœuds intermédiaires de l'arbre de Merkle.

#### Wit (protocole de témoin) {#wit}

Le [protocole de témoin](https://github.com/ethereum/devp2p/blob/master/caps/wit.md#ethereum-witness-protocol-wit) est une extension facultative qui permet l'échange de témoins d'état entre les pairs, aidant à synchroniser les clients avec la pointe de la chaîne.

#### Whisper {#whisper}

Whisper était un protocole qui visait à fournir une messagerie sécurisée entre les pairs sans écrire aucune information sur la chaîne de blocs. Il faisait partie du protocole filaire devp2p mais est maintenant obsolète. D'autres [projets connexes](https://wakunetwork.com/) existent avec des objectifs similaires.

## La couche de consensus {#consensus-layer}

Les clients de consensus participent à un réseau pair à pair distinct avec une spécification différente. Les clients de consensus doivent participer au commérage des blocs afin de pouvoir recevoir de nouveaux blocs de leurs pairs et les diffuser lorsque c'est à leur tour d'être proposeur de bloc. À l'instar de la couche d'exécution, cela nécessite d'abord un protocole de découverte afin qu'un nœud puisse trouver des pairs et établir des sessions sécurisées pour échanger des blocs, des attestations, etc.

### Découverte {#consensus-discovery}

À l'instar des clients d'exécution, les clients de consensus utilisent [discv5](https://github.com/ethereum/consensus-specs/blob/master/specs/phase0/p2p-interface.md#the-discovery-domain-discv5) sur UDP pour trouver des pairs. L'implémentation de discv5 de la couche de consensus diffère de celle des clients d'exécution uniquement en ce qu'elle inclut un adaptateur connectant discv5 à une pile [libp2p](https://libp2p.io/), rendant devp2p obsolète. Les sessions RLPx de la couche d'exécution sont obsolètes au profit de la poignée de main du canal sécurisé noise de libp2p.

### ENR {#consensus-enr}

L'ENR pour les nœuds de consensus inclut la clé publique du nœud, l'adresse IP, les ports UDP et TCP et deux champs spécifiques au consensus : le champ de bits du sous-réseau d'attestation et la clé `eth2`. Le premier permet aux nœuds de trouver plus facilement des pairs participant à des sous-réseaux de commérage d'attestation spécifiques. La clé `eth2` contient des informations sur la version du fork Ethereum que le nœud utilise, garantissant que les pairs se connectent au bon Ethereum.

### libp2p {#libp2p}

La pile libp2p prend en charge toutes les communications après la découverte. Les clients peuvent composer et écouter sur IPv4 et/ou IPv6 comme défini dans leur ENR. Les protocoles sur la couche libp2p peuvent être subdivisés en domaines de commérage (gossip) et de requête/réponse (req/resp).

### Commérage {#gossip}

Le domaine de commérage inclut toutes les informations qui doivent se propager rapidement à travers le réseau. Cela inclut les blocs phares, les preuves, les attestations, les sorties et les pénalités (slashings). Cela est transmis en utilisant gossipsub v1 de libp2p et repose sur diverses métadonnées stockées localement sur chaque nœud, y compris la taille maximale des charges utiles de commérage à recevoir et à transmettre. Des informations détaillées sur le domaine de commérage sont disponibles [ici](https://github.com/ethereum/consensus-specs/blob/master/specs/phase0/p2p-interface.md#the-gossip-domain-gossipsub).

### Requête-réponse {#request-response}

Le domaine requête-réponse contient des protocoles pour les clients demandant des informations spécifiques à leurs pairs. Les exemples incluent la demande de blocs phares spécifiques correspondant à certains hashs racines ou dans une plage d'emplacements (slots). Les réponses sont toujours renvoyées sous forme d'octets encodés SSZ compressés avec snappy.

## Pourquoi le client de consensus préfère-t-il SSZ à RLP ? {#ssz-vs-rlp}

SSZ signifie sérialisation simple (simple serialization). Il utilise des décalages fixes qui facilitent le décodage de parties individuelles d'un message encodé sans avoir à décoder la structure entière, ce qui est très utile pour le client de consensus car il peut extraire efficacement des éléments d'information spécifiques des messages encodés. Il est également conçu spécifiquement pour s'intégrer aux protocoles de Merkle, avec des gains d'efficacité associés pour la merkélisation. Étant donné que tous les hashs de la couche de consensus sont des racines de Merkle, cela représente une amélioration significative. SSZ garantit également des représentations uniques des valeurs.

## Connexion des clients d'exécution et de consensus {#connecting-clients}

Les clients de consensus et d'exécution fonctionnent en parallèle. Ils doivent être connectés afin que le client de consensus puisse fournir des instructions au client d'exécution, et que le client d'exécution puisse transmettre des lots de transactions au client de consensus pour les inclure dans les blocs phares. La communication entre les deux clients peut être réalisée à l'aide d'une connexion RPC locale. Une API connue sous le nom d'[« Engine-API »](https://github.com/ethereum/execution-apis/blob/main/src/engine/common.md) définit les instructions envoyées entre les deux clients. Étant donné que les deux clients se trouvent derrière une seule identité réseau, ils partagent un ENR (enregistrement de nœud Ethereum) qui contient une clé distincte pour chaque client (clé Eth1 et clé Eth2).

Un résumé du flux de contrôle est présenté ci-dessous, avec la pile réseau correspondante entre parenthèses.

### Lorsque le client de consensus n'est pas producteur de bloc : {#when-consensus-client-is-not-block-producer}

- Le client de consensus reçoit un bloc via le protocole de commérage de blocs (p2p de consensus)
- Le client de consensus pré-valide le bloc, c'est-à-dire qu'il s'assure qu'il provient d'un expéditeur valide avec des métadonnées correctes
- Les transactions du bloc sont envoyées à la couche d'exécution en tant que charge utile d'exécution (connexion RPC locale)
- La couche d'exécution exécute les transactions et valide l'état dans l'en-tête de bloc (c'est-à-dire vérifie que les hashs correspondent)
- La couche d'exécution renvoie les données de validation à la couche de consensus, le bloc est maintenant considéré comme validé (connexion RPC locale)
- La couche de consensus ajoute le bloc à la tête de sa propre chaîne de blocs et l'atteste, en diffusant l'attestation sur le réseau (p2p de consensus)

### Lorsque le client de consensus est producteur de bloc : {#when-consensus-client-is-block-producer}

- Le client de consensus reçoit l'avis qu'il est le prochain producteur de bloc (p2p de consensus)
- La couche de consensus appelle la méthode `create block` dans le client d'exécution (RPC local)
- La couche d'exécution accède à la mempool de transactions qui a été remplie par le protocole de commérage de transactions (p2p d'exécution)
- Le client d'exécution regroupe les transactions dans un bloc, exécute les transactions et génère un hash de bloc
- Le client de consensus récupère les transactions et le hash de bloc du client d'exécution et les ajoute au bloc phare (RPC local)
- Le client de consensus diffuse le bloc via le protocole de commérage de blocs (p2p de consensus)
- Les autres clients reçoivent le bloc proposé via le protocole de commérage de blocs et le valident comme décrit ci-dessus (p2p de consensus)

Une fois que le bloc a été attesté par suffisamment de validateurs, il est ajouté à la tête de la chaîne, justifié et finalement finalisé.

![Diagram of the Ethereum consensus client networking layer](cons_client_net_layer.png)
![Diagram of the Ethereum execution client networking layer](exe_client_net_layer.png)

Schéma de la couche réseau pour les clients de consensus et d'exécution, d'après [ethresear.ch](https://ethresear.ch/t/eth1-eth2-client-relationship/7248)

## Complément d'information {#further-reading}

[devp2p](https://github.com/ethereum/devp2p)
[libp2p](https://github.com/libp2p/specs)
[Spécifications du réseau de la couche de consensus](https://github.com/ethereum/consensus-specs/blob/master/specs/phase0/p2p-interface.md#enr-structure)
[De Kademlia à discv5](https://vac.dev/kademlia-to-discv5)
[Article sur Kademlia](https://pdos.csail.mit.edu/~petar/papers/maymounkov-kademlia-lncs.pdf)
[Introduction au p2p d'Ethereum](https://p2p.paris/en/talks/intro-ethereum-networking/)
[Relation Eth1/Eth2](https://ethresear.ch/t/eth1-eth2-client-relationship/7248)
[Vidéo sur les détails de la fusion et du client Eth2](https://www.youtube.com/watch?v=zNIrIninMgg)