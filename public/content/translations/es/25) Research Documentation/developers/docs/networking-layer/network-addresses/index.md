---
title: Dirección de la red
description: Introducción a las direcciones de red.
lang: es
sidebarDepth: 2
---

Los nodos de Ethereum tienen que identificarse con alguna información básica para conectar con sus pares. Para asegurar que cualquier potencial par pueda interpretar esta información, esta se transmite en uno de los tres formatos estandarizados que cualquier nodo de Ethereum puede entender: multiaddr, enode o Registros de nodos de Ethereum (ENR). Los ENR son el estándar actual para las direcciones de red de Ethereum.

## Pre requisitos {#prerequisites}

Se requiere algo de comprensión sobre la [capa de red](/developers/docs/networking-layer/) de Ethereum para entender esta página.

## Multiaddr {#multiaddr}

El formato original de las direcciones de los nodos de Ethereum era "multiaddr" (abreviatura de "multi-addresses"). Multiaddr es un formato universal diseñado para redes entre pares (peer-to-peer). Las direcciones son representadas como pares clave-valor; las claves y los valores están separados con una barra /. Por ejemplo, el multiaddr para un nodo con dirección IPv4 `192.168.22.27` que escuche el puerto TCP `33000` luce así:

`/ip4/192.168.22.27/tcp/33000`

Para un nodo de Ethereum, el multiaddr contiene el ID del nodo (un hash de su clave pública):

`/ip4/192.168.22.27/tcp/33000/p2p/5t7Nv7dG2d6ffbvAiewVsEwWweU3LdebSqX2y1bPrW8br`

## Enode {#enode}

Un enode es una forma de identificar a un nodo de Ethereum usando un formato de dirección URL.  El ID hexadecimal del nodo se codifica en la parte del nombre de usuario de la URL separado del host con el símbolo @. El nombre de host solo puede darse en forma de una dirección IP; los nombres de DNS no están permitidos. El puerto en la sección del nombre de host es el puerto de escucha TCP. Si los puertos TCP y UDP (descubrimiento) difieren, el puerto UDP es especificado como un parámetro de consulta "discport".

En el siguiente ejemplo, la URL de nodo describe un nodo con una dirección IP `10.3.58.6`, un puerto TCP `30303` y un puerto de descubrimiento UDP `30301`.

`enode://6f8a80d14311c39f35f516fa664deaaaa13e85b2f7493f37f6144d86991ec012937307647bd3b9a82abe2974e1407241d54947bbb39763a4cac9f77166ad92a0@10.3.58.6:30303?discport=30301`

## Registros de nodos de Ethereum (ENR) {#enr}

Los Registros de nodos de Ethereum (ENR) son un formato estandarizado para las direcciones de red en Ethereum. Reemplazan los formatos multiaddrs y enodes. Son especialmente útiles porque permiten un mayor intercambio de información entre los nodos. El ENR contiene una firma, un número de secuencia y campos que detallan el esquema de identidad usado para generar y validar firmas. El ENR puede completarse con datos arbitrarios organizados como pares clave-valor. Esos pares clave-valor contienen la dirección IP del nodo e información acerca de los subprotocolos que el nodo puede usar. Los clientes de consenso usan una [estructura de ENR específica](https://github.com/ethereum/consensus-specs/blob/dev/specs/phase0/p2p-interface.md#enr-structure) para identificar nodos de arranque o bootnodes y también incluyen un campo `eth2` que contiene información acerca de la actual bifurcación de Ethereum y la subred de gossiping de atestación (esta conecta el nodo con un conjunto particular de pares cuyas validaciones o atestaciones son agregadas).

## Más información {#further-reading}

[EIP-778: Registros de nodos de Ethereum (ENR)](https://eips.ethereum.org/EIPS/eip-778) [Direcciones de red en Ethereum](https://dean.eigenmann.me/blog/2020/01/21/network-addresses-in-ethereum/) [LibP2P: Multiaddr-Enode-ENR](https://consensys.net/diligence/blog/2020/09/libp2p-multiaddr-enode-enr/)
