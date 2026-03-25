---
title: "Einführung in Ethereum-Bootnodes"
description: "Die grundlegenden Informationen, die Sie benötigen, um Bootnodes zu verstehen"
lang: de
---

Wenn ein neuer Blockchain-Knoten dem Ethereum-Netzwerk beitritt, muss er sich mit Blockchain-Knoten verbinden, die sich bereits im Netzwerk befinden, um dann neue Peers zu entdecken. Diese Einstiegspunkte in das Ethereum-Netzwerk werden Bootnodes genannt. Anwendungen haben normalerweise eine Liste von Bootnodes fest einkodiert. Diese Bootnodes werden typischerweise vom DevOps-Team der Ethereum Foundation oder den Anwendungs-Teams selbst betrieben. Beachten Sie, dass Bootnodes nicht dasselbe sind wie statische Blockchain-Knoten. Statische Blockchain-Knoten werden immer wieder aufgerufen, während Bootnodes nur dann aufgerufen werden, wenn es nicht genügend Peers gibt, mit denen man sich verbinden kann, und ein Blockchain-Knoten einige neue Verbindungen aufbauen muss.

## Mit einem Bootnode verbinden {#connect-to-a-bootnode}

Die meisten Anwendungen haben eine Liste von Bootnodes integriert, aber vielleicht möchten Sie auch Ihren eigenen Bootnode betreiben oder einen verwenden, der nicht Teil der fest einkodierten Liste der Anwendung ist. In diesem Fall können Sie diese beim Starten Ihrer Anwendung wie folgt angeben (das Beispiel gilt für Geth, bitte überprüfen Sie die Dokumentation Ihrer Anwendung):

```
geth --bootnodes "enode://<node ID>@<IP address>:<port>"
```

## Einen Bootnode betreiben {#run-a-bootnode}

Bootnodes sind vollständige Blockchain-Knoten, die sich nicht hinter einem NAT ([Network Address Translation](https://www.geeksforgeeks.org/network-address-translation-nat/)) befinden. Jeder vollständige Blockchain-Knoten kann als Bootnode fungieren, solange er öffentlich erreichbar ist.

Wenn Sie einen Blockchain-Knoten starten, sollte dieser Ihre [enode](/developers/docs/networking-layer/network-addresses/#enode) protokollieren. Dies ist eine öffentliche Kennung, die andere verwenden können, um sich mit Ihrem Blockchain-Knoten zu verbinden.

Die enode wird normalerweise bei jedem Neustart neu generiert. Schauen Sie daher in der Dokumentation Ihrer Anwendung nach, wie Sie eine dauerhafte enode für Ihren Bootnode generieren können.

Um ein guter Bootnode zu sein, ist es ratsam, die maximale Anzahl von Peers zu erhöhen, die sich mit ihm verbinden können. Der Betrieb eines Bootnodes mit vielen Peers wird den Bandbreitenbedarf erheblich erhöhen.

## Verfügbare Bootnodes {#available-bootnodes}

Eine Liste der in go-ethereum integrierten Bootnodes finden Sie [hier](https://github.com/ethereum/go-ethereum/blob/master/params/bootnodes.go#L23). Diese Bootnodes werden von der Ethereum Foundation und dem go-ethereum-Team gepflegt.

Es gibt noch weitere Listen von Bootnodes, die von Freiwilligen gepflegt werden. Bitte stellen Sie sicher, dass Sie immer mindestens einen offiziellen Bootnode einbeziehen, da Sie sonst Opfer eines Eclipse-Angriffs werden könnten.