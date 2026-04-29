---
title: "Erklärung von Restaking"
description: "Eine Erklärung von Restaking, das bereits gestakte ETH verwendet, um Sicherheit für zusätzliche Protokolle und Dienste über die Basisschicht von Ethereum hinaus zu bieten."
lang: de
youtubeId: "rOJo7VwPh7I"
uploadDate: 2024-02-05
duration: "0:12:33"
educationLevel: intermediate
topic:
  - "Restaking"
  - "Sicherheit"
format: explainer
author: CBER Forum
breadcrumb: "Restaking"
---

Eine Präsentation von **Mike Neuder** auf einer Veranstaltung des CBER Forums darüber, wie Restaking funktioniert. Die Präsentation definiert Self-Staking, delegiertes Staking, natives und nicht-natives Restaking, die Mechanismen von Liquid Staking und Liquid-Restaking-Token sowie die Interaktion von Slashing mit restakten Positionen.

*Dieses Transkript ist eine barrierefreie Kopie des [ursprünglichen Video-Transkripts](https://www.youtube.com/watch?v=rOJo7VwPh7I), das vom CBER Forum veröffentlicht wurde. Es wurde zur besseren Lesbarkeit leicht bearbeitet.*

#### Einführung (0:00) {#introduction-000}

Hallo zusammen, ich bin Mike. Ich werde über Liquid-Restaking-Token (LRTs) und Liquid-Staking-Token (LSTs) sprechen. LRTs – ist Restaking das neue Staking? Ich werde mit einer zweiten Frage beginnen und diese nutzen, um die Diskussion über LSTs und LRTs anzuregen und zu definieren, was diese sind. Dies ist hauptsächlich eine grafische Präsentation, also können wir hoffentlich ganz am Anfang beginnen und gemeinsam darauf aufbauen.

Kurzer Überblick: Ganz am Anfang werden wir zwei Arten des Stakings definieren. Erstens das Self-Staking, zweitens das delegierte Staking. Dann werden wir uns mit dem Konzept des Restakings befassen und es definieren. Es gibt vier verschiedene Modelle, die ich untersuchen möchte – unter Verwendung der Trennung von Self-Staking und delegiertem Staking, wobei der Schwerpunkt dann auf nativem Restaking im Vergleich zu nicht-nativem Restaking liegt. Dann werden wir uns mit der Verflüssigung befassen und über liquide Token sprechen – Liquid-Staking-Token und Liquid-Restaking-Token. Wir werden dies motivieren, indem wir uns Slashing und Restaking ansehen, und dann beide Token-Arten. Abschließend werden wir mit einigen Daten zum Staking abschließen, wie es heute in Ethereum existiert.

#### Self-Staking (0:48) {#self-staking-048}

Ganz am Anfang haben wir das Staking, bei dem Alice es selbst durchführt. Sie interagiert direkt mit dem Protokoll, bringt ihren Stake in das Protokoll ein und wird dafür durch die Emission des nativen Tokens belohnt. Im Fall von Ethereum stakt Alice 32 ETH und wird in ETH für die Teilnahme am Konsens belohnt.

Hier gibt es zwei Dinge, auf die man sich konzentrieren sollte. Erstens dient Staking als dieser Anti-Sybil-Mechanismus – man kann das Netzwerk nicht austricksen und behaupten, man hätte viele Identitäten, da jede Identität einen bestimmten Betrag dieses festen Token-Angebots kostet. Zweitens ist die Sicherheit einem Risiko ausgesetzt – dies betrifft die Protokollregeln in Bezug auf Slashing. Wenn sich Alice gemäß einer sehr genau definierten Spezifikation falsch verhält, wird das Protokoll ihr Kapital entziehen und sie dafür bestrafen.

#### Delegiertes Staking (2:52) {#delegated-staking-252}

Delegiertes Staking fügt eine weitere Schicht in der Mitte zwischen Alice und dem Protokoll hinzu. Alice delegiert nun an Bob, der im Ethereum-Protokoll stakt. Die Belohnungen werden an Bob gesendet, und die Belohnungen abzüglich der Gebühren werden an Alice weitergeleitet. Dies ist die einfachste Version des delegierten Stakings – Alice möchte die Software nicht selbst ausführen, vielleicht hat sie keine vollen 32 ETH oder verfügt nicht über die Hardware oder das technische Fachwissen, um einen Validator zu betreiben.

Es gibt viele verschiedene Arten dieser Delegation mit unterschiedlichen Vertrauensstufen. Die Version mit dem größten Vertrauen ist verwahrend – man sendet seine ETH an Coinbase und sagt: "Stake in meinem Namen." Man vertraut ihnen faktisch vollständig, da sie den Vermögenswert in deinem Namen verwahren. Es gibt eine nicht-verwahrende, aber DAO-gesteuerte Version, bei der man seinen Stake an jemanden delegiert, der von einer DAO bestimmt wird, die darüber abstimmt, wer die Knoten betreiben darf – dies ist das Staking im Lido-Stil. Die dritte ist eine vertrauensminimierte Version, bei der sowohl Alice als auch Bob eine Sicherheit hinterlegen. Alice subventioniert den Rest von Bobs Sicherheit, und wenn Bob sich falsch verhält und geslasht wird, ist seine Sicherheit die erste Tranche, die entfernt wird. Ich sage "vertrauensminimiert" und nicht "vertrauenslos", denn egal was passiert, es gibt Szenarien, in denen Alices Sicherheit je nachdem, was Bob tut, vollständig vernichtet wird.

#### Self-Restaking mit nativem ETH (4:42) {#self-restaking-with-native-eth-442}

Jetzt können wir darüber sprechen, was Restaking ist. Dies ist ein brandneues Konzept – es existiert, seit Sreeram und EigenLayer den Begriff vor vielleicht anderthalb oder zwei Jahren eingeführt haben.

In diesem Modell tut Alice dasselbe wie zuvor – sie sendet ihren Stake an das Ethereum-Protokoll und erhält Belohnungen für die Teilnahme am Konsens. Nun haben wir ein neues Protokoll – nennen wir es "Retheum" –, bei dem Alice restakt. Das Wichtige hierbei ist, dass sie dieselben Token, die sie im Ethereum-Protokoll stakt, verwendet, um dieses zweite Protokoll zu sichern.

Dafür erhält sie Belohnungen. Das klingt großartig – Alice hat nun potenziell die doppelte Belohnung für denselben Stake-Betrag. Das Risiko besteht jedoch darin, dass das Kapital, das sie in beiden Protokollen gestakt hat, nun den Regeln beider Protokolle unterliegt. Wenn sich Alice in Ethereum falsch verhält, kann sie ihr Kapital durch Slashing verlieren. Wenn sie sich in "Retheum" falsch verhält, kann sie ebenfalls geslasht werden. Mit zusätzlicher Rendite gehen zusätzliche Verantwortlichkeiten einher – Protokollverhalten, die vorgeschrieben sind und auf weitere Arten bestraft werden können, wenn man seinen Staking-Token über viele verschiedene Protokolle hinweg belastet.

#### Delegiertes natives Restaking (8:28) {#delegated-native-restaking-828}

Die zweite Version ist delegiertes Restaking mit nativem ETH. Alice stakt bei Ethereum und möchte nun Bob nutzen, um ihren Stake an das "Retheum"-Protokoll zu delegieren. Sie delegiert an Bob, Bob restakt, das Protokoll gibt Belohnungen an Bob aus, und Bob gibt die Belohnungen abzüglich der Gebühren an Alice weiter.

Unter diesem Modell haften die 32 ETH im Ethereum-Protokoll für die Handlungen von sowohl Alice als auch Bob – zwei Personen, die potenziell dafür sorgen könnten, dass diese ETH geslasht werden. Der Token ist durch zwei verschiedene Sätze von Protokollregeln belastet.

**Frage aus dem Publikum:** Wenn man ETH im Ethereum-Protokoll stakt, muss einem das Protokoll etwas geben, das man dann vorlegt – was ist dieses Etwas?

In dieser nativen Version stakt Alice und erhält eine sogenannte Abhebungsberechtigung aus dem Ethereum-Ökosystem. Diese Abhebungsberechtigung kann auf einen Vertrag auf Ethereum verweisen, der die zweite Schicht des Stakings abwickelt. Es ist ein Vertrag, der die Vermögenswerte kontrolliert, wenn man sie von Ethereum abhebt – es ist wie eine vertrauenslose Verwahrung im Smart Contract, der die zweite Schicht von Slashing-Strafen durchsetzt.

Warum wird dies "nativ" genannt? Weil Alice immer noch direkt mit Ethereum interagiert – ihr Stake sind die 32 ETH, die sie besitzt und die verwendet werden, um die Konsensschicht von Ethereum zu sichern.

#### Nicht-natives Restaking (10:57) {#non-native-restaking-1057}

Self-Restaking im nicht-nativen Umfeld: Alice interagiert nur mit dem "Retheum"-Protokoll. Sie betreibt keinen Knoten auf Ethereum. Sie restakt – obwohl ich "Re" in Anführungszeichen setze, da sie nicht wirklich restakt, sondern es sich in erster Linie um Staking handelt. Der einzige Grund, warum es Restaking genannt wird, ist, dass dies über ein Protokoll stattfindet, das auch andere Arten von Restaking ermöglicht.

Sie nimmt nicht-native Token – das könnte USDC, ein Euro-Stablecoin, Wrapped Bitcoin oder was auch immer sein –, stellt sie dem Protokoll als wirtschaftliche Sicherheit und Sybil-Resistenz zur Verfügung und verdient Belohnungen. Dies definiert Restaking neu als einen Marktplatz für dezentrales Vertrauen, wobei sich Vertrauen auf den wirtschaftlichen Wert des gefährdeten Kapitals bezieht.

Delegiertes Restaking mit nicht-nativen Token folgt demselben Muster – Alice delegiert über Bob und erhält Belohnungen abzüglich der Gebühren.

#### Slashing und Restaking (13:55) {#slashing-and-restaking-1355}

Bevor wir zur Liquidität kommen, lassen Sie uns über Slashing sprechen. Im normalen Slashing-Modus stakt Alice im Ethereum-Protokoll. Wenn sie etwas tut, das das Protokoll als falsch ansieht – zum Beispiel eine Äquivokation, bei der sie ihren kryptografischen Schlüssel verwendet, um zwei Informationen zu signieren, die im Widerspruch zueinander stehen –, ist das ein objektiver Fehler. Jeder kann verifizieren, dass beide Signaturen von Alice signiert wurden, und das ist ein ausreichender Beweis, um ihre Token zu slashen.

Wie interagieren Restaking und Slashing? In der einfachsten Version – Self-Restaking mit dem nativen Vermögenswert – stakt Alice bei Ethereum und restakt auch über "Retheum". Wenn Alice weiterhin ihre Arbeit im "Retheum"-Protokoll erledigt, aber auf Ethereum eine Äquivokation begeht, haben wir nun ein Problem: Sie wird auf Ethereum geslasht, aber "Retheum" hat nichts festgestellt, was ihr zuzuschreiben wäre und gegen deren Regeln verstößt. Es muss eine gewisse Kommunikation zwischen den beiden Protokollen geben.

Diese Kommunikationsrichtung ist eigentlich recht einfach, da "Retheum" ein Smart Contract auf Ethereum ist – er kann den Zustand von Ethereum lesen und sagen: "Dieser Validator wurde laut Ethereum geslasht", sodass Alice auch im Protokoll zweiter Ordnung geslasht wird.

Die andere Richtung ist schwieriger. Wenn Alice auf der Restaking-Plattform geslasht wird, müsste Ethereum darüber informiert werden. Aber Ethereum ist absichtlich unwissend gegenüber allem, was auf seiner Vertragsschicht in Bezug auf den Konsensmechanismus passiert.

**Frage aus dem Publikum:** Warum sollte das eine Rolle spielen? Ethereum benötigt den Stake für das, was es tut, aber der Restake-Betrag ist ein Derivat des Originals.

Das Problem ist, dass Alice, wenn sie auf der Restaking-Plattform geslasht wird, diesen Stake eigentlich nicht mehr besitzt. Sie kann im Ethereum-Protokoll tun, was sie will, ohne dass tatsächliches Kapital gefährdet ist – was überhaupt der ganze Sinn eines Stakes ist. Es ist, als würde man Geld für zwei Dinge verwenden, es verschwindet bei der einen Sache, und die andere Sache muss erkennen, dass das Geld nicht mehr einem selbst gehört. Es hat in gewissem Sinne immer noch einen wirtschaftlichen Wert, aber man kontrolliert es nicht – also ist es einem egal, was damit passiert, weil es bereits weg ist.