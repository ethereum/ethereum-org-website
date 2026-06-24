---
title: "Einführung in Ethereum-Bootnodes"
description: "Die grundlegenden Informationen, die Sie benötigen, um Bootnodes zu verstehen"
lang: de
---

Wenn ein neuer Knoten dem Ethereum-Netzwerk beitritt, muss er sich mit Knoten verbinden, die sich bereits im Netzwerk befinden, um dann neue Peers zu entdecken. Diese Eintrittspunkte in das Ethereum-Netzwerk werden Bootnodes genannt. Clients haben normalerweise eine Liste von Bootnodes fest einprogrammiert. Diese Bootnodes werden typischerweise vom DevOps-Team der Ethereum Foundation oder den Client-Teams selbst betrieben. Beachten Sie, dass Bootnodes nicht dasselbe sind wie statische Knoten. Statische Knoten werden immer wieder aufgerufen, während Bootnodes nur dann aufgerufen werden, wenn es nicht genügend Peers gibt, mit denen man sich verbinden kann, und ein Knoten einige neue Verbindungen aufbauen muss.

## Mit einem Bootnode verbinden {#connect-to-a-bootnode}

Die meisten Clients haben eine Liste von Bootnodes integriert, aber vielleicht möchten Sie auch Ihren eigenen Bootnode betreiben oder einen verwenden, der nicht Teil der fest einprogrammierten Liste des Clients ist. In diesem Fall können Sie diese beim Starten Ihres Clients wie folgt angeben (das Beispiel gilt für Geth, bitte überprüfen Sie die Dokumentation Ihres Clients):

```
geth --bootnodes "enode://<node ID>@<IP address>:<port>"
```

## Einen Bootnode betreiben {#run-a-bootnode}

Bootnodes sind Full Nodes, die sich nicht hinter einem NAT ([Network Address Translation](https://www.geeksforgeeks.org/network-address-translation-nat/)) befinden. Jeder Full Node kann als Bootnode fungieren, solange er öffentlich erreichbar ist.

Wenn Sie einen Knoten starten, sollte er Ihre [enode](/developers/docs/networking-layer/network-addresses/#enode) im Log ausgeben. Dies ist eine öffentliche Kennung, die andere verwenden können, um sich mit Ihrem Knoten zu verbinden.

Die enode wird normalerweise bei jedem Neustart neu generiert. Lesen Sie daher in der Dokumentation Ihres Clients nach, wie Sie eine dauerhafte enode für Ihren Bootnode generieren können.

Um ein guter Bootnode zu sein, ist es ratsam, die maximale Anzahl von Peers, die sich mit ihm verbinden können, zu erhöhen. Der Betrieb eines Bootnodes mit vielen Peers erhöht den Bandbreitenbedarf erheblich.

## Verfügbare Bootnodes {#available-bootnodes}

Eine Liste der in go-ethereum integrierten Bootnodes finden Sie [hier](https://github.com/ethereum/go-ethereum/blob/master/params/bootnodes.go#L23). Diese Bootnodes werden von der Ethereum Foundation und dem go-ethereum-Team gepflegt.

Es gibt weitere Listen von Bootnodes, die von Freiwilligen gepflegt werden. Bitte stellen Sie sicher, dass Sie immer mindestens einen offiziellen Bootnode einbeziehen, da Sie sonst Opfer einer Eclipse-Attacke werden könnten.