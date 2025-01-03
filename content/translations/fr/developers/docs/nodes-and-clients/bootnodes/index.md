---
title: Introduction aux nœuds de démarrage d'Ethereum
description: Informations de base dont vous avez besoin pour comprendre les nœuds de démarrage
lang: fr
---

Lorsqu'un nouveau nœud rejoint le réseau Ethereum, il doit se connecter aux nœuds déjà présents sur ledit réseau dans le but de découvrir de nouveaux pairs. Ces points d'entrée dans le réseau Ethereum sont appelés bootnodes ou nœuds de démarrage. Les clients disposent généralement d'une liste de nœuds de démarrage codée en dur. Ces « bootnodes » sont généralement gérés par l'équipe de développement de l'Ethereum Foundation ou via les équipes clients elles-mêmes. À noter que ces nœuds de démarrage sont bien distincts des nœuds statiques. Les nœuds statiques sont appelés maintes et maintes fois, tandis que les nœuds de démarrage ne sont sollicités que dans le cas où il n'y a pas assez de pairs auxquels se connecter, et qu'un nœud se trouve dans le besoin d'amorcer de nouvelles connexions.

## Se connecter à un nœud de démarrage {#connect-to-a-bootnode}

La plupart des clients ont une liste de nœuds de démarrage intégrée, mais il se peut que vous souhaitiez exécuter votre propre nœud de démarrage, ou encore, prendre un nœud qui ne soit pas issu de la liste codée en dur du client. Dans ce cas, vous pouvez les mentionner comme suit au démarrage de votre client (exemple pour Geth, veuillez vérifier la documentation de votre client) :

```
geth --bootnodes "enode://<node ID>@<IP address>:<port>"
```

## Exécuter un nœud de démarrage {#run-a-bootnode}

Les nœuds de démarrage sont des nœuds complets qui ne se trouvent pas derrière une NAT ([Traduction des adresses réseau](https://www.geeksforgeeks.org/network-address-translation-nat/)). Tout nœud complet peut servir de nœud de démarrage tant qu'il reste accessible au public.

Lorsque vous démarrez un nœud, celui-ci doit enregistrer votre [*enode](/developers/docs/networking-layer/network-addresses/#enode), qui est un identifiant public que d'autres peuvent utiliser pour se connecter à votre nœud. *Un enode est un moyen de décrire un nœud Ethereum sous la forme d'un **URI. **Un identifiant de ressource uniforme ou Uniform Resource Identifier (URI) est une séquence unique de caractères qui identifie une ressource logique ou physique, utilisée par les technologies web.

L'enode est généralement régénéré lors de chaque redémarrage, alors assurez-vous de consulter la documentation de votre client pour savoir comment produire un enode persistant pour votre nœud de démarrage.

Afin d'être un nœud de démarrage performant, il est de bon augure d'augmenter le nombre maximum d'homologues qui peuvent se connecter à ce nœud. L'exécution d'un nœud de démarrage accompagné par de nombreux pairs, augmentera considérablement les besoins en bande passante.

## Nœuds de démarrage disponibles {#available-bootnodes}

Une liste des nœuds de démarrage intégrés à go-ethereum peut être consultée [ici.](https://github.com/ethereum/go-ethereum/blob/master/params/bootnodes.go#L23) Ces nœuds de démarrage sont gérés par l'Ethereum Foundation et l'équipe go-ethereum.

Il existe aussi d'autres listes de nœuds de démarrage maintenues par des bénévoles. Veillez à toujours inclure au moins un nœud de démarrage officiel, sinon vous risquez d'être attaqué par *Eclipse. *Une attaque par éclipse est une attaque par laquelle un acteur malveillant isole un nœud au sein d'un réseau peer-to-peer (P2P) afin d'obscurcir la vue d'un utilisateur sur le réseau et de perturber le réseau en général. Similaires aux attaques Sybil, excepté que dans ce cas, seul un nœud est visé contrairement à une attaque Sybil qui vise l'ensemble du réseau.
