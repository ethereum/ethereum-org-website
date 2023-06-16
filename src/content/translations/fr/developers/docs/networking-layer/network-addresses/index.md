---
title: Adresses réseau
description: Une introduction aux adresses réseau.
lang: fr
sidebarDepth: 2
---

Les nœuds Ethereum doivent s'identifier avec certaines informations de base pour se connecter aux pairs. Pour s'assurer que n'importe quel pair potentiel peut interpréter ces informations, il est relayé dans l'un des trois formats normalisés que tout nœud Ethereum peut comprendre : multiaddr, enode, ou Ethereum Node Records (ENRs). Les ENRs sont la norme actuelle pour les adresses réseau Ethereum.

## Prérequis {#prerequisites}

Une certaine compréhension de la [couche réseau](/developers/docs/networking-layer/) d'Ethereum est requise pour comprendre cette page.

## Multiaddr {#multiaddr}

Le format originel d'adresse des nœuds Ethereum était le 'multiaddr' (abréviation de 'multi-addresses' en anglais). Multiaddr est un format universel conçu pour les réseaux de pair-à-pair. Les adresses sont représentées par des paires clé-valeur avec des clés et des valeurs séparées par un slash. Par exemple, la multiaddr pour un nœud avec une adresse IPv4 `192.168.22.27` à l'écoute du port TCP `33000` ressemble à :

`/ip4/192.168.22.27/tcp/33000`

Pour un nœud Ethereum, la multiaddr contient l'identifiant du nœud (un hachage de sa clé publique) :

`/ip4/192.168.22.27/tcp/33000/p2p/5t7Nv7dG2d6ffbvAiewVsEwWweU3LdebSqX2y1bPrW8br`

## Enode {#enode}

Un enode est un moyen d'identifier un nœud Ethereum en utilisant un format d'adresse URL. L'identifiant hexadécimal de nœud est encodé dans la partie nom d'utilisateur de l'URL, séparée de l'hôte à l'ide du signe @. Le nom d'hôte ne peut être donné qu'en tant qu'adresse IP, les noms DNS ne sont pas autorisés. Le port dans la section nom d'hôte est le port d'écoute TCP. Si les ports TCP et UDP (découverte) diffèrent, le port UDP est spécifié comme paramètre de requête "discport"

Dans l'exemple suivant, l'URL du nœud décrit un nœud avec une adresse IP `10.3.58.`, port TCP `30303` et port de découverte UDP `30301`.

`enode://6f8a80d14311c39f35f516fa664deaaaa13e85b2f7493f37f6144d86991ec012937307647bd3b9a82abe2974e1407241d54947bbb39763a4cac9f77166ad92a0@10.3.58.6:30303?discport=30301`

## Registres de nœuds Ethereum (ENRs en anglais) {#enr}

Les registres de Nœuds Ethereum (ENRs en anglais) sont un format standardisé pour les adresses réseau sur Ethereum. Ils remplacent les 'multiaddr' et les 'enodes'. Ceux-ci sont particulièrement utiles car ils permettent un échange plus large d'informations entre les nœuds. L'ENR contient une signature, un numéro de séquence et des champs détaillant le schéma d'identité utilisé pour générer et valider les signatures. L'ENR peut également être alimenté de données arbitraires organisées sous la forme de paires valeur-clé. Ces paires valeur-clé contiennent l'adresse IP du nœud ainsi que les informations sur les sous-protocoles que le nœud peut utiliser. Les clients de consensus utilisent une [structure ENR spécifique](https://github.com/ethereum/consensus-specs/blob/dev/specs/phase0/p2p-interface.md#enr-structure) pour identifier les nœuds d'amorçage et incluent également un champ `eth2` contenant des informations sur la fourche Ethereum actuelle et le sous-réseau de l'attestation de commutation (cela permet de connecter le nœud à un ensemble particulier de pairs dont les attestations sont regroupées).

## Complément d'information {#further-reading}

[EIP-778 : Registres de Nœuds Ethereum (ENR)](https://eips.ethereum.org/EIPS/eip-778) [Adresses réseau sur Ethereum](https://dean.eigenmann.me/blog/2020/01/21/network-addresses-in-ethereum/) [LibP2P : Multiaddr-Enode-ENR ?!](https://consensys.net/diligence/blog/2020/09/libp2p-multiaddr-enode-enr/)
