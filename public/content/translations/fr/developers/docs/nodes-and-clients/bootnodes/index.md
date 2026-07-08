---
title: "Introduction aux nœuds d'amorçage Ethereum"
description: "Les informations de base dont vous avez besoin pour comprendre les nœuds d'amorçage"
lang: fr
---

Lorsqu'un nouveau nœud rejoint le réseau Ethereum, il doit se connecter à des nœuds qui sont déjà sur le réseau afin de découvrir ensuite de nouveaux pairs. Ces points d'entrée dans le réseau Ethereum sont appelés nœuds d'amorçage. Les clients ont généralement une liste de nœuds d'amorçage codée en dur. Ces nœuds d'amorçage sont généralement gérés par l'équipe devops de la Fondation Ethereum ou par les équipes clientes elles-mêmes. Notez que les nœuds d'amorçage ne sont pas la même chose que les nœuds statiques. Les nœuds statiques sont appelés encore et encore, tandis que les nœuds d'amorçage ne sont sollicités que s'il n'y a pas assez de pairs auxquels se connecter et qu'un nœud a besoin d'amorcer de nouvelles connexions.

## Se connecter à un nœud d'amorçage {#connect-to-a-bootnode}

La plupart des clients ont une liste de nœuds d'amorçage intégrée, mais vous pourriez également vouloir exécuter votre propre nœud d'amorçage, ou en utiliser un qui ne fait pas partie de la liste codée en dur du client. Dans ce cas, vous pouvez les spécifier lors du démarrage de votre client, comme suit (l'exemple est pour Geth, veuillez vérifier la documentation de votre client) :

```
geth --bootnodes "enode://<ID du nœud>@<adresse IP>:<port>"
```

## Exécuter un nœud d'amorçage {#run-a-bootnode}

Les nœuds d'amorçage sont des nœuds complets qui ne sont pas derrière un NAT ([Traduction d'adresse réseau](https://www.geeksforgeeks.org/network-address-translation-nat/)). Tout nœud complet peut agir comme un nœud d'amorçage tant qu'il est accessible publiquement.

Lorsque vous démarrez un nœud, il devrait afficher dans le journal votre [enode](/developers/docs/networking-layer/network-addresses/#enode), qui est un identifiant public que d'autres peuvent utiliser pour se connecter à votre nœud.

L'enode est généralement régénéré à chaque redémarrage, assurez-vous donc de consulter la documentation de votre client sur la façon de générer un enode persistant pour votre nœud d'amorçage.

Afin d'être un bon nœud d'amorçage, il est judicieux d'augmenter le nombre maximum de pairs qui peuvent s'y connecter. L'exécution d'un nœud d'amorçage avec de nombreux pairs augmentera considérablement les besoins en bande passante.

## Nœuds d'amorçage disponibles {#available-bootnodes}

Une liste des nœuds d'amorçage intégrés dans go-ethereum peut être trouvée [ici](https://github.com/ethereum/go-ethereum/blob/master/params/bootnodes.go#L23). Ces nœuds d'amorçage sont maintenus par la Fondation Ethereum et l'équipe go-ethereum.

Il existe d'autres listes de nœuds d'amorçage maintenues par des bénévoles. Veuillez vous assurer de toujours inclure au moins un nœud d'amorçage officiel, sinon vous pourriez subir une attaque par éclipse.