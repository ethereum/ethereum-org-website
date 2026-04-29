---
title: "Blockchain-Konsensmechanismen verstehen"
description: "Eine Erklärung der wichtigsten Konsensmechanismen, die in Blockchains verwendet werden, und wie sie es dezentralen Netzwerken ermöglichen, sich ohne eine zentrale Autorität auf den Zustand von Transaktionen zu einigen."
lang: de
youtubeId: "ojxfbN78WFQ"
uploadDate: 2018-11-29
duration: "0:09:33"
educationLevel: beginner
topic:
  - "consensus"
  - "blockchain"
format: explainer
author: Tech in Asia
breadcrumb: "Konsensmechanismen"
---

Eine Erklärung von **Tech in Asia**, die die drei wichtigsten Konsensmechanismen behandelt, die in Blockchain-Systemen verwendet werden: Proof-of-Work (PoW), Proof-of-Stake (PoS) und Autoritätsnachweis (PoA), und wie sie es dezentralen Netzwerken ermöglichen, sich auf den Zustand von Transaktionen zu einigen.

*Dieses Transkript ist eine barrierefreie Kopie des [originalen Video-Transkripts](https://www.youtube.com/watch?v=ojxfbN78WFQ), das von Tech in Asia veröffentlicht wurde. Es wurde zur besseren Lesbarkeit leicht bearbeitet.*

#### Was sind Konsensmechanismen? (0:00) {#what-are-consensus-mechanisms-000}

Blockchain – das Hype-Wort des Jahres 2018. Aber wissen Sie, wie ein dezentrales Peer-to-Peer-System ohne autoritäre Instanz Entscheidungen trifft? Die Antwort liegt in Konsensmechanismen. Es gibt verschiedene Konsensmechanismen, aber sie alle dienen demselben Zweck: sicherzustellen, dass Aufzeichnungen wahr und ehrlich sind. Der Unterschied liegt in der Art und Weise, wie der Konsens erreicht wird. Hier werden wir drei Arten von Konsensmechanismen untersuchen.

#### Proof-of-Work (0:23) {#proof-of-work-023}

In einem Proof-of-Work-System werden Transaktionsdaten in Blöcken gespeichert und validiert, indem Personen ein damit verbundenes kompliziertes mathematisches Problem lösen. Dies wird typischerweise von leistungsstarken Computern durchgeführt und ist als „Mining“ bekannt. Eine Belohnung in Form einer Kryptowährung wird an den ersten Miner ausgegeben, der das Problem löst.

Stellen Sie sich eine Gruppe von Schatzsuchern vor, die versuchen, eine Truhe mit einem komplizierten Schloss zu öffnen. Die richtige Kombination herauszufinden ist mühsam, aber die erste Person, die dies tut, wird belohnt. Einfach ausgedrückt ist Proof-of-Work ein Wettlauf darum, die richtige Kombination für eine Schatztruhe herauszufinden. Kryptowährungen wie Bitcoin und Ethereum verwenden einen Proof-of-Work-Mechanismus.

#### Proof-of-Stake (1:04) {#proof-of-stake-104}

Als Nächstes haben wir Proof-of-Stake. Hier wird der Ersteller eines neuen Blocks, auch bekannt als Validator, zufällig basierend darauf ausgewählt, wie viel Stake er dem Netzwerk zur Verfügung stellt. Je höher der platzierte Stake, desto höher die Chance, als Validator ausgewählt zu werden.

Wenden wir dies auf das Schatztruhen-Szenario an. Stellen Sie sich eine Gruppe von Schatzsuchern vor, die um eine Truhe wetteifern. Die Truhe wird basierend auf einem Lotteriesystem vergeben. Um teilzunehmen, muss jeder Sucher Lotterielose kaufen. Je mehr jeder Sucher kauft, desto höher ist die Gewinnchance. Blockchain-Protokolle wie Cardanos Ouroboros und EOS verwenden den Proof-of-Stake-Konsens.

#### Autoritätsnachweis (1:42) {#proof-of-authority-142}

Zuletzt der Autoritätsnachweis – eine modifizierte Form von Proof-of-Stake. Hier können nur genehmigte Parteien, die basierend auf ihrer Reputation ausgewählt wurden, Validatoren werden.

Kehren wir zum Schatztruhen-Szenario zurück. Die Gruppe der Schatzsucher bildet eine Gewerkschaft und legt ihre Schätze zusammen. Basierend auf ihrer Vertrauenswürdigkeit werden einige wenige von der Gruppe ernannt, um die Gültigkeit des Inhalts der Truhe sicherzustellen. IBMs Hyperledger Fabric und Ethereums Kovan-Testnetz sind einige Beispiele für Blockchain-Systeme, die den Autoritätsnachweis verwenden.

#### Hybride Konsensmodelle (2:14) {#hybrid-consensus-models-214}

Während traditionelle Blockchain-Unternehmen auf einem einzigen Konsensmechanismus basieren, übernehmen einige innovative Unternehmen mehrere Konsensprotokolle. Nehmen wir zum Beispiel die Opet Foundation, die eine einzigartige Blockchain aufbaut, um Daten zu speichern, die in ihrer Nachhilfe-Chatbot-App gesammelt wurden, indem sie sowohl Autoritätsnachweis- als auch Proof-of-Work-Protokolle anwendet.

Daten wie akademische, außerschulische und Persönlichkeitsprofil-Aufzeichnungen von Schülern werden auf der Blockchain gespeichert und potenziell über ein Autoritätsnachweis-Framework validiert, das von Hyperledger Fabric angetrieben wird. Validatoren sind in diesem Fall angesehene Bildungseinrichtungen oder sogar nationale Register und die jeweiligen Bildungsministerien. Dies hilft sicherzustellen, dass alle Schülerdaten vertrauenswürdig sind.

Aber wer arbeitet schon umsonst? Der Proof-of-Work-Konsens kommt ins Spiel, um Validatoren zu belohnen, die Arbeit geleistet haben.

#### Privatsphäre und Schülerdaten (3:02) {#privacy-and-student-data-302}

Mit Hyperledger Fabric wird jeder Schülerdatensatz mit einem privaten Hash-Schlüssel gesichert, der dem Schüler gehört. Auf die Daten kann nur zugegriffen werden, wenn der Schüler den einzigartigen Schlüssel bereitstellt. Das bedeutet, dass die Privatsphäre der Schüler gewahrt bleibt und von den Schülern selbst kontrolliert wird.

Wenn sich Schüler beispielsweise über die Plattform von Opet an einer Universität bewerben, stellen sie der Universität den einzigartigen Schlüssel ihrer Aufzeichnungen zur Verfügung. Damit kann die Universität auf ihre neuesten akademischen Aufzeichnungen zugreifen. Die Schüler können auch sehen, ob ihre Aufzeichnungen entsperrt oder zumindest für die Bewerbung berücksichtigt wurden. Dies steigert die Effizienz und Transparenz im Vergleich zu traditionellen Methoden.

#### Abschluss (3:37) {#closing-337}

Durch die Verbindung der Proof-of-Work- und Autoritätsnachweis-Modelle stellt die Blockchain-Lösung der Opet Foundation die Privatsphäre der Schülerdaten sicher und bietet gleichzeitig Anreize für Bildungseinrichtungen und Schüler, wenn sie zur Plattform beitragen. Da Blockchains an Popularität gewinnen, ist es nur eine Frage der Zeit, bis wir noch mehr einzigartige hybride Systeme sehen werden.