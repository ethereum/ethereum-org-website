---
title: Couche de réseautage
description: Introduction à la couche réseau Ethereum.
lang: fr
sidebarDepth: 2
---

Ethereum est un réseau pair-à-pair composé de milliers de nœuds qui doivent pouvoir communiquer entre eux en utilisant des protocoles standardisés. La « couche réseau » est la pile de protocoles qui permettent à ces nœuds de se trouver et d'échanger des informations. Cela inclut des informations de commutation (communication de type « d'une personne à plusieurs ») sur le réseau, ainsi que des échanges de requêtes et de réponses entre des nœuds spécifiques (communication de type « de personne à personne »). Chaque nœud doit adhérer à des règles de réseautage spécifiques pour s'assurer qu'il envoie et reçoit les informations correctes.

Il existe deux types de logiciels clients (les clients d'exécution et les clients de consensus), chacun disposant de sa propre pile réseau. En plus de communiquer avec d’autres nœuds Ethereum, les clients d’exécution et de consensus doivent communiquer entre eux. Cette page est une introduction explicative des protocoles qui permettent cette communication.

Les clients d'exécution font circuler des informations sur les transactions dans le réseau pair-à-pair de la couche d'exécution. Cela nécessite une communication chiffrée entre les pairs authentifiés. Lorsqu'un validateur est sélectionné pour proposer un bloc, les transactions depuis le pool de transactions locales du nœud seront transmises à des clients de consensus via une connexion RPC locale, qui sera empaquetée dans des blocs de chaîne phare. Les clients de consensus diffuseront ensuite les blocs de la chaîne phare au travers de leur réseau p2p. Deux réseaux p2p distincts sont donc nécessaires : un connecté au client d'exécution pour les commutations de transaction et un client de consensus pour les blocs de commutation.

## Prérequis {#prerequisites}

Une certaine connaissance des [nœuds et clients d'Ethereum](/developers/docs/nodes-and-clients/) sera utile pour comprendre cette page.

## La couche d'exécution {#execution-layer}

Les protocoles de réseau de la couche d'exécution sont divisés en deux piles :

- la pile de découverte : s'appuie sur UDP et permet à un nouveau nœud de trouver des pairs auxquels se connecter

- la pile DevP2P : s'appuie sur TCP et permet aux nœuds d'échanger des informations

Les deux piles fonctionnent en parallèle. La pile de découverte alimente le réseau en nouveaux participants, et la pile DevP2P permet leurs interactions.

### La découverte {#discovery}

La découverte est le processus permettant de trouver d'autres nœuds sur le réseau. Il est amorcé en utilisant un petit ensemble de nœuds de démarrage (nœuds dont les adresses sont [codées en dur](https://github.com/ethereum/go-ethereum/blob/master/params/bootnodes.go) dans le client afin de pouvoir être trouvés immédiatement et de connecter le client à des pairs). Ces nœuds de démarrage n'existent que pour introduire un nouveau nœud à un ensemble de pairs - c'est leur seul objectif, ils ne participent pas aux tâches normales du client comme la synchronisation de la chaîne, et ils ne sont utilisés que lors du premier lancement d'un client.

Le protocole utilisé pour les interactions des nœuds avec les nœuds de démarrage est une forme modifiée de [Kademlia](https://medium.com/coinmonks/a-brief-overview-of-kademlia-and-its-use-in-various-decentralized-platforms-da08a7f72b8f) qui utilise une [table de hachage distribué](https://en.wikipedia.org/wiki/Distributed_hash_table) pour partager des listes de nœuds. Chaque nœud dispose d'une version de cette table contenant les informations nécessaires pour se connecter à ses pairs les plus proches. Cette « proximité » n'est pas géographique - la distance est définie par la similitude de l'ID du nœud. Chaque table de nœud est régulièrement actualisée en tant que fonctionnalité de sécurité. Par exemple, dans [Discv5](https://github.com/ethereum/devp2p/tree/master/discv5), les nœuds de protocole de découverte sont également en mesure d'envoyer des « publicités » qui affichent les sous-protocoles pris en charge par le client, ce qui permet aux pairs de négocier les protocoles qu'ils peuvent tous deux utiliser pour communiquer.

Le processus de découverte commence par une partie de PING-PONG. Un PING-PONG réussi va « lier » le nouveau nœud à un nœud de démarrage. Le message initial qui avertit un nœud de démarrage de l'existence d'un nouveau nœud entrant sur le réseau est un `PING`. Ce `PING` inclut des informations hachées sur le nouveau nœud, le nœud de démarrage et une date d'expiration. Le nœud de démarrage reçoit le `PING` et retourne un `PONG` contenant le hachage `PING`. Si les hachages `PING` et `PONG` correspondent, alors la connexion entre le nouveau nœud et le nœud de démarrage est vérifiée et on dit qu'ils sont « liés ».

Une fois lié, le nouveau nœud peut envoyer une requête `FIND-NEIGHBOURS` au nœud de démarrage. Les données retournées par le nœud de démarrage incluent une liste de pairs auxquels le nouveau nœud peut se connecter. Si les nœuds ne sont pas liés, la requête `FIND-NEIGHBOURS` échouera, de sorte que le nouveau nœud ne pourra pas entrer sur le réseau.

Dès que le nouveau nœud reçoit une liste de voisins depuis le nœud de démarrage, il commence un échange PING-PONG avec chacun d'eux. Les PING-PONG réussissent à lier le nouveau nœud avec ses voisins, ce qui permet l’échange de messages.

```
démarrage du client --> connexion au nœud de démarrage --> lien avec le nœud de démarrage --> trouver les voisins --> liens avec les voisins
```

Les clients d'exécution utilisent actuellement le protocole de découverte [Discv4](https://github.com/ethereum/devp2p/blob/master/discv4.md) et des actions ont été entreprises pour migrer vers le protocole [Discv5](https://github.com/ethereum/devp2p/tree/master/discv5).

#### ENR : Ethereum Node Records (Registres des Nœuds Ethereum) {#enr}

Le [registre des nœuds Ethereum (ENR : Ethereum Node Records)](/developers/docs/networking-layer/network-addresses/) est un objet qui contient trois éléments de base : une signature (hachage du contenu des registres selon un schéma d'identité convenu), un numéro de séquence qui suit les modifications apportées au registre, et une liste arbitraire de paires clé/valeur. Il s'agit d'un format à l'épreuve du futur qui permet de simplifier l'échange d'informations d'identification entre les nouveaux pairs. C'est également le format [d'adresse réseau](/developers/docs/networking-layer/network-addresses) préféré pour les nœuds Ethereum.

#### Pourquoi le processus de découverte est-il basé sur UDP ? {#why-udp}

UDP ne prend pas en charge le contrôle des erreurs, le renvoi des paquets en échec, ou l'ouverture et la fermeture dynamique des connexions. Il se contente d'envoyer un flux continu d'informations à une cible, qu'il soit ou non reçu avec succès. Cette fonctionnalité minimale se traduit également par un minimum de frais, ce qui rend ce type de connexion très rapide. Pour la découverte, où un nœud veut simplement faire connaître sa présence afin d'établir ensuite une connexion formelle avec un pair, UDP est suffisant. Cependant, pour le reste de la pile de réseaux, UDP n'est pas adapté. L'échange d'informations entre les nœuds est assez complexe et a donc besoin d'un protocole plus complet qui puisse prendre en charge le renvoi, la vérification des erreurs, etc. Les frais supplémentaires associés à TCP valent la peine de bénéficier de fonctionnalités supplémentaires. Par conséquent, la majorité de la pile P2P fonctionne sur TCP.

### DevP2P {#devp2p}

DevP2P est en lui-même une pile de protocoles qu'Ethereum implémente pour établir et maintenir le réseau de pair à pair. Une fois les nouveaux nœuds entrés sur le réseau, leurs interactions sont régies par des protocoles dans la pile [DevP2P](https://github.com/ethereum/devp2p). Ils reposent tous sur TCP et comprennent le protocole de transport RLPx, le protocole filaire et plusieurs sous-protocoles. [RLPx](https://github.com/ethereum/devp2p/blob/master/rlpx.md) est le protocole régissant l'initiation, l'authentification et la maintenance des sessions entre nœuds. RLPx code les messages à l'aide de RLP (Recursive Length Prefix), une méthode très efficace d'encodage des données dans une structure minimale pour l'envoi entre nœuds.

Une session RLPx entre deux nœuds commence par une poignée de main cryptographique. Cela implique que le nœud envoie un message d'authentification qui est ensuite vérifié par le pair. En cas de vérification réussie, le pair génère un message de reconnaissance d'authentification à renvoyer au nœud initiateur. Il s'agit d'un processus d'échange de clés qui permet aux nœuds de communiquer en privé et en toute sécurité. Une poignée de main cryptographique réussie déclenche ensuite l'envoi par les deux nœuds d'un message « bonjour » « en mode filaire ». Le protocole filaire est initié par un échange réussi de messages de bienvenue.

Les messages de bienvenue contiennent :

- La version du protocole
- L'ID du client
- Le port
- L'ID du nœud
- La liste des sous-protocoles pris en charge

Ce sont les informations requises pour une interaction réussie, car elles définissent les capacités qui sont partagées entre les deux nœuds et configurent la communication. Il existe un processus de négociation de sous-protocoles où les listes de sous-protocoles prises en charge par chaque nœud sont comparées ; ceux qui sont communs aux deux nœuds peuvent être utilisés dans la session.

Outre les messages de bienvenue, le protocole filaire peut également envoyer un message de « déconnexion » qui avertit un pair que la connexion va être fermée. Le protocole filaire comprend également les messages PING et PONG qui sont envoyés périodiquement pour conserver une session ouverte. Les échanges de RLPx et de protocoles filaires établissent donc les bases de la communication entre les nœuds, fournissant l'échafaudage nécessaire à l'échange d'informations utiles selon un sous-protocole spécifique.

### Sous-protocoles {#sub-protocols}

#### Le protocole filaire {#wire-protocol}

Une fois que les pairs sont connectés et qu'une session RLPx est entamée, le protocole filaire définit la façon dont les pairs communiquent. Initialement, le protocole filaire définissait trois tâches principales : synchronisation de chaînes, propagation de blocs et échange de transactions. Cependant, depuis qu'Ethereum est passé à la preuve d'enjeu, la propagation des blocs et la synchronisation des chaînes sont devenues partie intégrante de la couche de consensus. L'échange de transactions est toujours à la charge des clients d'exécution. L'échange de transactions fait référence à l'échange de transactions en attente entre les nœuds afin que les constructeurs de blocs puissent sélectionner certaines d'entre elles pour les inclure dans le bloc suivant. Des informations plus détaillées sur ces tâches sont disponibles [ici](https://github.com/ethereum/devp2p/blob/master/caps/eth.md). Les clients qui prennent en charge ces sous-protocoles les affichent via [JSON-RPC](/developers/docs/apis/json-rpc/).

#### Les (sous-protocole ethereum léger) {#les}

Il s'agit d'un protocole minimal destiné à synchroniser les clients légers. Jusqu'à présent, ce protocole a rarement été utilisé, dans la mesure où les nœuds complets sont contraints de servir des données à des clients légers sans être incités à le faire. Le comportement par défaut des clients d'exécution n'est pas de servir des données clientes légères via les. D'autres informations sont disponibles dans les [spécifications](https://github.com/ethereum/devp2p/blob/master/caps/les.md).

#### Snap (protocole d'accrochage) {#snap}

Le [protocole snap](https://github.com/ethereum/devp2p/blob/master/caps/snap.md#ethereum-snapshot-protocol-snap) est une extension optionnelle qui permet aux pairs d'échanger des instantanés d'états récents, permettant aux pairs de vérifier les données de compte et de stockage sans avoir à télécharger les nœuds intermédiaires d'arbre de Merkle.

#### Wit (protocole de témoin) {#wit}

Le [protocole de témoin](https://github.com/ethereum/devp2p/blob/master/caps/wit.md#ethereum-witness-protocol-wit) est une extension facultative qui permet l'échange de témoins d'état entre pairs, aidant à synchroniser les clients à la pointe de la chaîne.

#### Whisper {#whisper}

Whisper était un protocole visant à fournir une messagerie sécurisée entre pairs sans écrire aucune information sur la blockchain. Il faisait partie du protocole filaire DevP2P mais est maintenant obsolète. D'autres [projets connexes](https://wakunetwork.com/) existent avec des objectifs similaires.

## La couche de consensus {#consensus-layer}

Les clients de consensus participent à un réseau distinct de pair-à-pair avec une spécification différente. Les clients de consensus doivent participer à des commutateurs de blocs afin de recevoir des pairs de nouveaux blocs de leurs pairs et les diffuser quand c'est à leur tour de proposer un bloc. De la même manière que la couche d'exécution, cette approche nécessite d'abord un protocole de découverte afin qu'un nœud puisse trouver des pairs et établir des sessions sécurisées pour échanger des blocs, des attestations, etc.

### La découverte {#consensus-discovery}

Comme pour les clients d'exécution, les clients de consensus utilisent [discv5](https://github.com/ethereum/consensus-specs/blob/dev/specs/phase0/p2p-interface.md#the-discovery-domain-discv5) sur UDP pour trouver des pairs. L'implémentation de la couche de consensus de discv5 diffère de celle des clients d'exécution uniquement en ce qu'elle inclut un adaptateur connectant discv5 dans une pile [libP2P](https://libp2p.io/), dépréciant DevP2P. Les sessions de la couche d'exécution RLPx sont dépréciées au profit du système de liaison sécurisé libP2P.

### ENRs {#consensus-enr}

L'ENR pour les nœuds de consensus inclut la clé publique du nœud, l'adresse IP, les ports UDP et TCP et deux champs spécifiques au consensus : l'attestation bitfield du sous-réseau et la clé `eth2`. Le premier permet aux nœuds de trouver plus facilement des nœuds participant à des sous-réseaux de commutation d'attestations spécifiques. La clé `eth2` contient des informations sur la version de la fourche d'Ethereum que le nœud utilise, en s'assurant que les pairs se connectent au bon Ethereum.

### libP2P {#libp2p}

La pile libP2P prend en charge toutes les communications après la découverte. Les clients peuvent composer et écouter sur IPv4 et/ou IPv6 tel que défini dans leur ENR. Les protocoles de la couche libP2P peuvent être subdivisés en domaines de commutation et de questions/réponses.

### Commutation {#gossip}

Le domaine du commutateur inclut toutes les informations qui doivent se propager rapidement sur le réseau. Cela inclut les blocs de la chaîne phare, les preuves, les attestations, les sorties et les coupes. Les informations sont transmises à l'aide de libP2P gossipsub v1 et repose sur diverses métadonnées stockées localement sur chaque nœud, y compris la taille maximale des charges de commutation à recevoir et à transmettre. Des informations plus détaillées sur les domaines de commutation sont disponibles [ici](https://github.com/ethereum/consensus-specs/blob/dev/specs/phase0/p2p-interface.md#the-gossip-domain-gossipsub).

### Question-réponse {#request-response}

Le domaine question-réponse contient des protocoles pour les clients demandant des informations spécifiques à leurs pairs. Il peut s'agir, par exemple, de demander des blocs spécifiques de la chaîne phare correspondant à certains hachages de la racine ou se situant dans une gamme d'emplacements. Les réponses sont toujours renvoyées sous la forme d'octets encodés SSZ compressés par snappy.

## Pourquoi le client de consensus préfère-t-il SSZ à RLP ? {#ssz-vs-rlp}

SSZ signifie "sérialisation simple". Elle utilise des décalages fixes qui facilitent le décodage de parties individuelles d'un message encodé sans avoir à décoder toute la structure, ce qui est très utile pour le client de consensus qui peut récupérer efficacement des éléments d'information spécifiques à partir de messages codés. Elle est également conçue spécifiquement pour s’intégrer aux protocoles Merkle, cela se traduisant par des gains d'efficacité pour la Merkleization. Puisque tous les hachages de la couche de consensus sont des racines de Merkle, cela représente une amélioration significative. SSZ garantit également des représentations uniques de valeurs.

## Connexion des clients d'exécution et de consensus {#connecting-clients}

Les clients de consensus et d'exécution fonctionnent en parallèle. Ils doivent être connectés afin que le client de consensus puisse fournir des instructions au client d'exécution et que le client d'exécution puisse passer des paquets de transactions au client de consensus pour les inclure dans les blocs phares. Cette communication entre les deux clients peut être réalisée en utilisant une connexion RPC locale. Une API connue sous le nom de ['Engine-API'](https://github.com/ethereum/execution-apis/blob/main/src/engine/common.md) définit les instructions envoyées entre les deux clients. Puisque les deux clients se trouvent derrière une seule identité de réseau, ils partagent un ENR (registre de nœuds Ethereum) qui contient une clé séparée pour chaque client (clé eth1 et clé eth2).

Un résumé du flux de contrôle est affiché ci-dessous (la pile réseau pertinente apparaît entre parenthèses).

### Lorsque le client du consensus n'est pas un producteur de blocs : {#when-consensus-client-is-not-block-producer}

- Le client de consensus reçoit un bloc via le protocole de commutation (consensus p2p)
- Le client de consensus prévalide le bloc, c'est-à-dire qu'il s'assure qu'il est arrivé d'un expéditeur valide avec des métadonnées correctes
- Les transactions dans le bloc sont envoyées à la couche d'exécution en tant que charge d'exécution (connexion RPC locale)
- La couche d'exécution exécute les transactions et valide l'état dans l'en-tête du bloc (c'est-à-dire vérifie la correspondance des haches)
- La couche d'exécution transmet les données de validation à la couche de consensus, le bloc est maintenant considéré comme validé (connexion RPC locale)
- La couche de consensus ajoute un bloc à la tête de sa propre blockchain et l'atteste, diffusant l'attestation sur le réseau (consensus p2p)

### Lorsque le client du consensus est un producteur de blocs : {#when-consensus-client-is-block-producer}

- Le client de consensus reçoit une note l'informant qu'il est le prochain producteur de blocs (consensus p2p)
- La couche de consensus appelle la méthode `create block` dans le client d'exécution (RPC en local)
- La couche d'exécution accède au mempool de transaction qui a été alimenté par le protocole de commutation de transaction (exécution p2p)
- Le client d'exécution empaquette les transactions dans un bloc, exécute les transactions et génère un hachage du bloc
- Le client de consensus récupère les transactions et bloque le hachage du client d'exécution et les ajoute au bloc phare (RPC)
- Le client de consensus reçoit le bloc via le protocole de commutation (consensus p2p)
- Les autres clients reçoivent le bloc proposé via le protocole de commutation de bloc et le valident comme décrit ci-dessus (consensus p2p)

Une fois le bloc attesté par suffisamment de validateurs, il est ajouté en tête de la chaîne, justifié et finalisé.

![](cons_client_net_layer.png) ![](exe_client_net_layer.png)

Le schéma de couche réseau pour les clients de consensus et d'exécution par [ethresear.ch](https://ethresear.ch/t/eth1-eth2-client-relationship/7248)

## Complément d'information {#further-reading}

[DevP2P](https://github.com/ethereum/devp2p) [LibP2p](https://github.com/libp2p/specs) [spécifications réseau de la couche de consensus](https://github.com/ethereum/consensus-specs/blob/dev/specs/phase0/p2p-interface.md#enr-structure) [kademlia to discv5](https://vac.dev/kademlia-to-discv5) [kademlia paper](https://pdos.csail.mit.edu/~petar/papers/maymounkov-kademlia-lncs.pdf) [introduction à Ethereum p2p](https://p2p.paris/en/talks/intro-ethereum-networking/) [relation eth1/eth2](http://ethresear.ch/t/eth1-eth2-client-relationship/7248) [vidéo sur les détails de La Fusion avec client eth2](https://www.youtube.com/watch?v=zNIrIninMgg)
