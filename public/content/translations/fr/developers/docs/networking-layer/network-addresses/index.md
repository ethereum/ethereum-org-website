---
title: "Adresses réseau"
description: "Une introduction aux adresses réseau."
lang: fr
sidebarDepth: 2
---

Les nœuds [Ethereum](/) doivent s'identifier avec quelques informations de base pour se connecter à des pairs. Pour s'assurer que tout pair potentiel puisse interpréter ces informations, elles sont relayées dans l'un des trois formats standardisés que tout nœud Ethereum peut comprendre : multiaddr, enode ou Ethereum Node Records (ENR). Les ENR sont la norme actuelle pour les adresses réseau Ethereum.

## Prérequis {#prerequisites}

Une certaine compréhension de la [couche réseau](/developers/docs/networking-layer/) d'Ethereum est requise pour comprendre cette page.

## Multiaddr {#multiaddr}

Le format d'adresse de nœud Ethereum d'origine était le « multiaddr » (abréviation de « multi-addresses »). Multiaddr est un format universel conçu pour les réseaux pair à pair. Les adresses sont représentées sous forme de paires clé-valeur, les clés et les valeurs étant séparées par une barre oblique (slash). Par exemple, le multiaddr pour un nœud avec l'adresse IPv4 `192.168.22.27` écoutant sur le port TCP `33000` ressemble à ceci :

`/ip4/192.168.22.27/tcp/33000`

Pour un nœud Ethereum, le multiaddr contient l'ID du nœud (un hash de sa clé publique) :

`/ip4/192.168.22.27/tcp/33000/p2p/5t7Nv7dG2d6ffbvAiewVsEwWweU3LdebSqX2y1bPrW8br`

## Enode {#enode}

Un enode est un moyen d'identifier un nœud Ethereum en utilisant un format d'adresse URL. L'ID de nœud hexadécimal est encodé dans la partie nom d'utilisateur de l'URL, séparé de l'hôte par un signe @. Le nom d'hôte ne peut être donné que sous forme d'adresse IP ; les noms DNS ne sont pas autorisés. Le port dans la section du nom d'hôte est le port d'écoute TCP. Si les ports TCP et UDP (découverte) diffèrent, le port UDP est spécifié en tant que paramètre de requête « discport ».

Dans l'exemple suivant, l'URL du nœud décrit un nœud avec l'adresse IP `10.3.58.6`, le port TCP `30303` et le port de découverte UDP `30301`.

`enode://6f8a80d14311c39f35f516fa664deaaaa13e85b2f7493f37f6144d86991ec012937307647bd3b9a82abe2974e1407241d54947bbb39763a4cac9f77166ad92a0@10.3.58.6:30303?discport=30301`

## Ethereum Node Records (ENR) {#enr}

Les Ethereum Node Records (ENR) sont un format standardisé pour les adresses réseau sur Ethereum. Ils remplacent les multiaddr et les enodes. Ils sont particulièrement utiles car ils permettent un plus grand échange d'informations entre les nœuds. L'ENR contient une signature, un numéro de séquence et des champs détaillant le schéma d'identité utilisé pour générer et valider les signatures. L'ENR peut également être rempli avec des données arbitraires organisées sous forme de paires clé-valeur. Ces paires clé-valeur contiennent l'adresse IP du nœud et des informations sur les sous-protocoles que le nœud est capable d'utiliser. Les clients de consensus utilisent une [structure ENR spécifique](https://github.com/ethereum/consensus-specs/blob/master/specs/phase0/p2p-interface.md#enr-structure) pour identifier les nœuds d'amorçage (boot nodes) et incluent également un champ `eth2` contenant des informations sur le fork Ethereum actuel et le sous-réseau de diffusion (gossip) d'attestation (cela connecte le nœud à un ensemble particulier de pairs dont les attestations sont agrégées ensemble).

## Complément d'information {#further-reading}

- [EIP-778 : Ethereum Node Records (ENR)](https://eips.ethereum.org/EIPS/eip-778)
- [LibP2P : Multiaddr-Enode-ENR?!](https://consensys.net/diligence/blog/2020/09/libp2p-multiaddr-enode-enr/)