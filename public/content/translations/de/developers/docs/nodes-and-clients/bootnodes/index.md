---
title: Einführung zu Ethereum Bootnodes
description: Grundlegend benötigte Informationen zum Verständnis von Bootnodes
lang: de
---

Wenn ein neuer Knoten dem Ethereum-Netzwerk beitritt, muss er sich mit anderen Knoten, sich sich bereits im Netzwerk befinden, verbinden, damit er neue Peers finden kann. Diese Eintrittspunkte in das Ethereum-Netzwerk werden Bootnodes genannt. Clients haben häufig eine Liste von Bootnodes fest einkodiert. Diese Bootnodes werden normalerweise vom Ethereum Foundation Entwicklerteam oder den Client-Teams betrieben. Beachten Sie dabei, dass Bootnodes nicht dasselbe wie statische Knoten sind. Statische Knoten werden immer wieder aufgerufen, während Bootnodes nur aufgerufen werden, wenn es genug Peers zum Verbinden gibt. Der Knoten muss zudem neue komplexere Verbindungen aufbauen.

## Verbinden mit einem Bootnode {#connect-to-a-bootnode}

Die meisten Clients verfügen über eine integrierte Liste von Bootnodes. Aber möglicherweise möchten Sie auch Ihren eigenen Bootnode betreiben, oder einen nutzen, der nicht Teil der fest einkodierten Liste des Clients ist. In diesem Fall können Sie sie spezifizieren, wenn Sie ihren Client wie folgt starten (Beispiel gilt für Geth, bitte überprüfen Sie die Dokumentation Ihres Clients):

```
geth --bootnodes "enode://<node ID>@<IP address>:<port>"
```

## Betrieb eines Bootnodes {#run-a-bootnode}

Bootnodes sind vollständige Knoten, die nicht hinter einem NAT ([Network Address Translation](https://www.geeksforgeeks.org/network-address-translation-nat/)) stehen. Jeder vollständige Knoten kann als Bootnode wirken, solange er öffentlich zugänglich ist.

Wenn Sie einen Knoten starten, sollte er sich in Ihren ["Enode"](/developers/docs/networking-layer/network-addresses/#enode) einloggen. Dieser ist ein öffentlicher Identifikator, den andere nutzen können, um sich mit Ihrem Knoten zu verbinden.

Der Enode wird normalerweise bei jedem Neustart neu generiert, schauen Sie sich daher die Dokumentation Ihres Clients an. Dort erfahren Sie, wie man einen beständigen Enode für Ihren Bootnode erzeugt.

Ein guter Bootnode benötigt möglichst viele Peers, die an ihm andocken können, daher wird empfohlen, die maximale Anzahl davon zu erhöhen. Einen Bootnode mit vielen Peers auszuführen, kann die benötigte Bandbreite signifikant vergrößern.

## Verfügbare Bootnodes {#available-bootnodes}

Eine Liste bereits verfügbarer Bootnodes in go-Ethereum finden Sie [hier](https://github.com/ethereum/go-ethereum/blob/master/params/bootnodes.go#L23). Diese Bootnodes werden von der Ethereum Foundation und dem go-Ethereum Team gewartet.

Es gibt weitere Listen von Bootnodes, die von Freiwilligen gepflegt werden. Stellen Sie sicher, dass Sie immer mindestens einen offiziellen Bootnode verwenden, da Sie sonst Opfer eines Eclipse-Angriffs werden könnten.
