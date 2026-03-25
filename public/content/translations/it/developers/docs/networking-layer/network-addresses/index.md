---
title: Indirizzi di rete
description: Un'introduzione agli indirizzi di rete.
lang: it
sidebarDepth: 2
---

I nodi di [Ethereum](/) devono identificarsi con alcune informazioni di base per connettersi ai peer. Per garantire che qualsiasi potenziale peer possa interpretare queste informazioni, vengono trasmesse in uno dei tre formati standardizzati che qualsiasi nodo di Ethereum può comprendere: multiaddr, enode o Ethereum Node Records (ENR). Gli ENR sono lo standard attuale per gli indirizzi di rete di Ethereum.

## Prerequisiti {#prerequisites}

È necessaria una certa comprensione del [livello di rete](/developers/docs/networking-layer/) di Ethereum per comprendere questa pagina.

## Multiaddr {#multiaddr}

Il formato originale dell'indirizzo del nodo di Ethereum era il 'multiaddr' (abbreviazione di 'multi-addresses'). Multiaddr è un formato universale progettato per le reti peer-to-peer. Gli indirizzi sono rappresentati come coppie chiave-valore con chiavi e valori separati da una barra (slash). Ad esempio, il multiaddr per un nodo con indirizzo IPv4 `192.168.22.27` in ascolto sulla porta TCP `33000` si presenta così:

`/ip4/192.168.22.27/tcp/33000`

Per un nodo di Ethereum, il multiaddr contiene l'ID del nodo (un hash della sua chiave pubblica):

`/ip4/192.168.22.27/tcp/33000/p2p/5t7Nv7dG2d6ffbvAiewVsEwWweU3LdebSqX2y1bPrW8br`

## Enode {#enode}

Un enode è un modo per identificare un nodo di Ethereum utilizzando un formato di indirizzo URL. L'ID esadecimale del nodo è codificato nella porzione dell'username dell'URL, separato dall'host tramite un segno @. L'hostname può essere fornito solo come indirizzo IP; i nomi DNS non sono consentiti. La porta nella sezione dell'hostname è la porta di ascolto TCP. Se le porte TCP e UDP (discovery) differiscono, la porta UDP viene specificata come parametro di query "discport".

Nel seguente esempio, l'URL del nodo descrive un nodo con indirizzo IP `10.3.58.6`, porta TCP `30303` e porta di discovery UDP `30301`.

`enode://6f8a80d14311c39f35f516fa664deaaaa13e85b2f7493f37f6144d86991ec012937307647bd3b9a82abe2974e1407241d54947bbb39763a4cac9f77166ad92a0@10.3.58.6:30303?discport=30301`

## Ethereum Node Records (ENR) {#enr}

Gli Ethereum Node Records (ENR) sono un formato standardizzato per gli indirizzi di rete su Ethereum. Sostituiscono i multiaddr e gli enode. Sono particolarmente utili perché consentono un maggiore scambio di informazioni tra i nodi. L'ENR contiene una firma, un numero di sequenza e campi che dettagliano lo schema di identità utilizzato per generare e convalidare le firme. L'ENR può anche essere popolato con dati arbitrari organizzati come coppie chiave-valore. Queste coppie chiave-valore contengono l'indirizzo IP del nodo e informazioni sui sotto-protocolli che il nodo è in grado di utilizzare. I client di consenso utilizzano una [struttura ENR specifica](https://github.com/ethereum/consensus-specs/blob/master/specs/phase0/p2p-interface.md#enr-structure) per identificare i nodi di avvio e includono anche un campo `eth2` contenente informazioni sull'attuale biforcazione di Ethereum e sulla sottorete di gossip dell'attestazione (questo connette il nodo a un particolare insieme di peer le cui attestazioni vengono aggregate insieme).

## Letture consigliate {#further-reading}

- [EIP-778: Ethereum Node Records (ENR)](https://eips.ethereum.org/EIPS/eip-778)
- [LibP2P: Multiaddr-Enode-ENR?!](https://consensys.net/diligence/blog/2020/09/libp2p-multiaddr-enode-enr/)