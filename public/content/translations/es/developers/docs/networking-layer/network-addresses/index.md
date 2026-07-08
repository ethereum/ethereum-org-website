---
title: Direcciones de red
description: "Una introducción a las direcciones de red."
lang: es
sidebarDepth: 2
---

Los nodos de [Ethereum](/) tienen que identificarse con cierta información básica para conectarse a sus pares. Para asegurar que cualquier par potencial pueda interpretar esta información, se transmite en uno de los tres formatos estandarizados que cualquier nodo de Ethereum puede entender: multiaddr, enode o Registros de Nodos de Ethereum (ENR, por sus siglas en inglés). Los ENR son el estándar actual para las direcciones de red de Ethereum.

## Requisitos previos {#prerequisites}

Se requiere cierta comprensión de la [capa de red](/developers/docs/networking-layer/) de Ethereum para entender esta página.

## Multiaddr {#multiaddr}

El formato original de dirección de nodo de Ethereum era el 'multiaddr' (abreviatura de 'multi-addresses' o multidirecciones). Multiaddr es un formato universal diseñado para redes entre pares. Las direcciones se representan como pares clave-valor, con las claves y los valores separados por una barra diagonal. Por ejemplo, el multiaddr para un nodo con dirección IPv4 `192.168.22.27` que escucha en el puerto TCP `33000` se ve así:

`/ip4/192.168.22.27/tcp/33000`

Para un nodo de Ethereum, el multiaddr contiene el ID del nodo (un hash de su clave pública):

`/ip4/192.168.22.27/tcp/33000/p2p/5t7Nv7dG2d6ffbvAiewVsEwWweU3LdebSqX2y1bPrW8br`

## Enode {#enode}

Un enode es una forma de identificar un nodo de Ethereum utilizando un formato de dirección URL. El ID de nodo hexadecimal se codifica en la parte del nombre de usuario de la URL, separado del host mediante un signo @. El nombre de host solo se puede proporcionar como una dirección IP; no se permiten nombres DNS. El puerto en la sección del nombre de host es el puerto de escucha TCP. Si los puertos TCP y UDP (descubrimiento) difieren, el puerto UDP se especifica como un parámetro de consulta "discport".

En el siguiente ejemplo, la URL del nodo describe un nodo con dirección IP `10.3.58.6`, puerto TCP `30303` y puerto de descubrimiento UDP `30301`.

`enode://6f8a80d14311c39f35f516fa664deaaaa13e85b2f7493f37f6144d86991ec012937307647bd3b9a82abe2974e1407241d54947bbb39763a4cac9f77166ad92a0@10.3.58.6:30303?discport=30301`

## Registros de Nodos de Ethereum (ENR) {#enr}

Los Registros de Nodos de Ethereum (ENR) son un formato estandarizado para las direcciones de red en Ethereum. Reemplazan a los multiaddr y enodes. Son especialmente útiles porque permiten un mayor intercambio de información entre los nodos. El ENR contiene una firma, un número de secuencia y campos que detallan el esquema de identidad utilizado para generar y validar firmas. El ENR también se puede rellenar con datos arbitrarios organizados como pares clave-valor. Estos pares clave-valor contienen la dirección IP del nodo e información sobre los subprotocolos que el nodo puede utilizar. Los clientes de consenso utilizan una [estructura ENR específica](https://github.com/ethereum/consensus-specs/blob/master/specs/phase0/p2p-interface.md#enr-structure) para identificar los nodos de arranque y también incluyen un campo `eth2` que contiene información sobre la bifurcación actual de Ethereum y la subred gossip de atestaciones (esto conecta el nodo a un conjunto particular de pares cuyas atestaciones se agregan juntas).

## Lecturas adicionales {#further-reading}

- [EIP-778: Registros de Nodos de Ethereum (ENR)](https://eips.ethereum.org/EIPS/eip-778)
- [LibP2P: ¿Multiaddr-Enode-ENR?!](https://consensys.net/diligence/blog/2020/09/libp2p-multiaddr-enode-enr/)