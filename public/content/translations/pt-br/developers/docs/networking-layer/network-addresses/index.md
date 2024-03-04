---
title: Endereço de rede
description: Uma introdução aos endereços de rede
lang: pt-br
sidebarDepth: 2
---

Nós Ethereum precisam se identificar com algumas informações básicas para se conectar a pares. Para garantir que qualquer para potencial possa interpretar esta informação, ela é transmitida em um dos três formatos padronizados que qualquer nó Ethereum pode entender: multiaddr, enode ou Ethereum Node Records (ENRs). ENRs são o padrão atual para endereços de rede Ethereum.

## Pré-Requisitos {#prerequisites}

É necessário ter algum entendimento sobre a [camada de rede](/developers/docs/networking-layer/)do Ethereum para entender esta página.

## Multiaddr {#multiaddr}

O formato original do endereço de nó Ethereum era o 'multiaddr' (abreviação de 'multi-endereços'). O Multiaddr é um formato universal desenhado para redes peer-to-peer. Os endereços são representados como pares chave-valor com chaves e valores separados por uma barra. Por exemplo, o multiaddr para um nó com endereço IPv4 `192.168.22.27` escutando a porta TCP `33000` será:

`/ip4/192.168.22.27/tcp/33000`

Para um nó Ethereum, o multiaddr contém o node-ID (um hash de sua chave pública):

`/ip4/192.168.22.27/tcp/33000/p2p/5t7Nv7dG2d6ffbvAiewVsEwWweU3LdebSqX2y1bPrW8br`

## Enode {#enode}

Um enode é uma maneira de identificar um nó Ethereum usando um formato de endereço de URL. O ID hexadecimal do nó é codificado na porção do nome de usuário do URL separado do host usando um sinal @. O nome de host só pode ser dado como um endereço IP; nomes DNS não são permitidos. A porta na seção hostname é a porta de escuta TCP. Se as portas TCP e UDP (descoberta) são diferentes, a porta UDP é especificada como um parâmetro de consulta "discport"

No exemplo a seguir, o URL do nó descreve um nó com endereço IP `10.3.58.`, porta TCP `30303` e porta de descoberta UDP `30301`.

`enode://6f8a80d14311c39f35f516fa664deaaaa13e85b2f7493f37f6144d86991ec012937307647bd3b9a82abe2974e1407241d54947bbb39763a4cac9f77166ad92a0@10.3.58.6:30303?discport=30301`

## Registros de Nó Ethereum {#enr}

Registros de Nó Ethereum (ENRs, pela sigla em inglês) são um formato padronizado para endereços de rede no Ethereum. Eles substituem multiaddrs e enodes. Estes são especialmente úteis porque permitem um maior intercâmbio de informações entre nós. O ENR contém uma assinatura, um número de sequência e campos detalhando o esquema de identidade usado para gerar e validar assinaturas. O ENR também pode ser populado com dados arbitrários organizados como pares de valor-chave. Estes pares chave-valor contêm o endereço IP do nó e as informações sobre os subprotocolos que o nó pode usar. Os clientes de consenso usam uma [estrutura ENR específica](https://github.com/ethereum/consensus-specs/blob/dev/specs/phase0/p2p-interface.md#enr-structure) para identificar nós de inicialização e também incluem um campo `eth2` contendo informações sobre o atual fork do Ethereum e o atestado da sub-rede gossip (isso conecta o nó a um determinado conjunto de pares cujas atestações são agregadas juntos).

## Leitura Adicional {#further-reading}

[EIP-778: Registros de Nó Ethereum (ENR)](https://eips.ethereum.org/EIPS/eip-778) [Endereços de rede no Ethereum](https://dean.eigenmann.me/blog/2020/01/21/network-addresses-in-ethereum/) [LibP2P: Multiaddr-Enode-ENR?!](https://consensys.net/diligence/blog/2020/09/libp2p-multiaddr-enode-enr/)
