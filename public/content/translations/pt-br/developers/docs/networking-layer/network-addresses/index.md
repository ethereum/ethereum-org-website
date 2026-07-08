---
title: "Endereços de rede"
description: "Uma introdução aos endereços de rede."
lang: pt-br
sidebarDepth: 2
---

Os nós da [Ethereum](/) precisam se identificar com algumas informações básicas para se conectarem aos pares. Para garantir que qualquer par em potencial possa interpretar essas informações, elas são retransmitidas em um dos três formatos padronizados que qualquer nó da Ethereum pode entender: multiaddr, enode ou Ethereum Node Records (ENRs). Os ENRs são o padrão atual para endereços de rede da Ethereum.

## Pré-requisitos {#prerequisites}

É necessário algum entendimento da [camada de rede](/developers/docs/networking-layer/) da Ethereum para compreender esta página.

## Multiaddr {#multiaddr}

O formato original de endereço de nó da Ethereum era o 'multiaddr' (abreviação de 'multi-addresses'). Multiaddr é um formato universal projetado para redes ponto a ponto. Os endereços são representados como pares de chave-valor, com chaves e valores separados por uma barra. Por exemplo, o multiaddr para um nó com endereço IPv4 `192.168.22.27` escutando na porta TCP `33000` se parece com:

`/ip4/192.168.22.27/tcp/33000`

Para um nó da Ethereum, o multiaddr contém o ID do nó (um hash de sua chave pública):

`/ip4/192.168.22.27/tcp/33000/p2p/5t7Nv7dG2d6ffbvAiewVsEwWweU3LdebSqX2y1bPrW8br`

## Enode {#enode}

Um enode é uma maneira de identificar um nó da Ethereum usando um formato de endereço URL. O ID do nó em hexadecimal é codificado na parte do nome de usuário da URL, separado do host usando um sinal de @. O nome do host só pode ser fornecido como um endereço IP; nomes DNS não são permitidos. A porta na seção do nome do host é a porta de escuta TCP. Se as portas TCP e UDP (descoberta) forem diferentes, a porta UDP é especificada como um parâmetro de consulta "discport".

No exemplo a seguir, a URL do nó descreve um nó com endereço IP `10.3.58.6`, porta TCP `30303` e porta de descoberta UDP `30301`.

`enode://6f8a80d14311c39f35f516fa664deaaaa13e85b2f7493f37f6144d86991ec012937307647bd3b9a82abe2974e1407241d54947bbb39763a4cac9f77166ad92a0@10.3.58.6:30303?discport=30301`

## Ethereum Node Records (ENRs) {#enr}

Os Ethereum Node Records (ENRs) são um formato padronizado para endereços de rede na Ethereum. Eles substituem os multiaddrs e enodes. Eles são especialmente úteis porque permitem uma maior troca de informações entre os nós. O ENR contém uma assinatura, número de sequência e campos detalhando o esquema de identidade usado para gerar e validar assinaturas. O ENR também pode ser preenchido com dados arbitrários organizados como pares de chave-valor. Esses pares de chave-valor contêm o endereço IP do nó e informações sobre os subprotocolos que o nó é capaz de usar. Os clientes de consenso usam uma [estrutura ENR específica](https://github.com/ethereum/consensus-specs/blob/master/specs/phase0/p2p-interface.md#enr-structure) para identificar nós de inicialização e também incluem um campo `eth2` contendo informações sobre a bifurcação atual da Ethereum e a sub-rede de fofoca (gossip) de atestação (isso conecta o nó a um conjunto específico de pares cujas atestações são agregadas em conjunto).

## Leitura adicional {#further-reading}

- [EIP-778: Ethereum Node Records (ENR)](https://eips.ethereum.org/EIPS/eip-778)
- [libp2p: Multiaddr-Enode-ENR?!](https://consensys.net/diligence/blog/2020/09/libp2p-multiaddr-enode-enr/)