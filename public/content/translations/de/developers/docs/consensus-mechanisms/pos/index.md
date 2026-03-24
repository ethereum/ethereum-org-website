---
title: Proof-of-Stake (PoS)
description: "Eine Erklärung des Proof-of-Stake-Konsensprotokolls und seiner Rolle bei Ethereum."
lang: de
---

Proof-of-Stake (PoS) liegt dem [Konsensmechanismus](/developers/docs/consensus-mechanisms/) von Ethereum zugrunde. Ethereum hat seinen Proof-of-Stake-Mechanismus im Jahr 2022 aktiviert, da er im Vergleich zur vorherigen [Proof-of-Work](/developers/docs/consensus-mechanisms/pow)-Architektur sicherer, weniger energieintensiv und besser für die Implementierung neuer Skalierungslösungen geeignet ist.

## Voraussetzungen {#prerequisites}

Um diese Seite besser zu verstehen, empfehlen wir Ihnen, sich zunächst über [Konsensmechanismen](/developers/docs/consensus-mechanisms/) zu informieren.

## Was ist Proof-of-Stake (PoS)? {#what-is-pos}

Proof-of-Stake ist eine Möglichkeit zu beweisen, dass Validatoren etwas von Wert in das Netzwerk eingebracht haben, das zerstört werden kann, wenn sie unehrlich handeln. Beim Proof-of-Stake von [Ethereum](/) hinterlegen Validatoren explizit Kapital in Form von ETH in einem Smart Contract auf Ethereum (Staking). Der Validator ist dann dafür verantwortlich zu überprüfen, ob neue Blöcke, die über das Netzwerk verbreitet werden, gültig sind, und gelegentlich selbst neue Blöcke zu erstellen und zu verbreiten. Wenn sie versuchen, das Netzwerk zu betrügen (zum Beispiel, indem sie mehrere Blöcke vorschlagen, wenn sie nur einen senden sollten, oder widersprüchliche Bestätigungen senden), kann ein Teil oder ihr gesamtes gestaktes ETH zerstört werden.

## Validatoren {#validators}

Um als Validator teilzunehmen, muss ein Benutzer 32 ETH in den Einzahlungsvertrag einzahlen und drei separate Softwarekomponenten ausführen: einen Ausführungs-Client, einen Konsens-Client und einen Validator-Client. Nach der Einzahlung ihrer ETH reiht sich der Benutzer in eine Aktivierungswarteschlange ein, die die Rate neuer Validatoren begrenzt, die dem Netzwerk beitreten. Sobald sie aktiviert sind, erhalten Validatoren neue Blöcke von Peers im Ethereum-Netzwerk. Die im Block gelieferten Transaktionen werden erneut ausgeführt, um zu überprüfen, ob die vorgeschlagenen Änderungen am Zustand von Ethereum gültig sind, und die Block-Signatur wird überprüft. Der Validator sendet dann eine Stimme (eine sogenannte Bestätigung) zugunsten dieses Blocks über das Netzwerk.

Während beim Proof-of-Work das Timing der Blöcke durch die Mining-Schwierigkeit bestimmt wird, ist das Tempo beim Proof-of-Stake festgelegt. Die Zeit im Proof-of-Stake-Ethereum ist in Slots (12 Sekunden) und Epochen (32 Slots) unterteilt. In jedem Slot wird zufällig ein Validator als Block-Vorschlagender ausgewählt. Dieser Validator ist dafür verantwortlich, einen neuen Block zu erstellen und ihn an andere Blockchain-Knoten im Netzwerk zu senden. Ebenfalls in jedem Slot wird zufällig ein Komitee von Validatoren ausgewählt, deren Stimmen verwendet werden, um die Gültigkeit des vorgeschlagenen Blocks zu bestimmen. Die Aufteilung der Validatoren in Komitees ist wichtig, um die Netzwerklast überschaubar zu halten. Komitees teilen die Validatoren so auf, dass jeder aktive Validator in jeder Epoche Bestätigungen abgibt, aber nicht in jedem Slot.

## Wie eine Transaktion im Ethereum-PoS ausgeführt wird {#transaction-execution-ethereum-pos}

Im Folgenden wird durchgehend erklärt, wie eine Transaktion im Proof-of-Stake von Ethereum ausgeführt wird.

1. Ein Benutzer erstellt und signiert eine [Transaktion](/developers/docs/transactions/) mit seinem Private-Key. Dies wird normalerweise von einem Wallet oder einer Bibliothek wie [ethers.js](https://docs.ethers.org/v6/), [web3js](https://docs.web3js.org/), [web3py](https://web3py.readthedocs.io/en/v5/) usw. gehandhabt, aber unter der Haube stellt der Benutzer eine Anfrage an einen Blockchain-Knoten über die Ethereum-[JSON-RPC-API](/developers/docs/apis/json-rpc/). Der Benutzer definiert die Menge an Gas, die er bereit ist, als Trinkgeld an einen Validator zu zahlen, um ihn zu ermutigen, die Transaktion in einen Block aufzunehmen. Die [Trinkgelder](/developers/docs/gas/#priority-fee) werden an den Validator gezahlt, während die [Grundgebühr](/developers/docs/gas/#base-fee) verbrannt wird.
2. Die Transaktion wird an einen Ethereum-[Ausführungs-Client](/developers/docs/nodes-and-clients/#execution-client) übermittelt, der ihre Gültigkeit überprüft. Dies bedeutet, dass sichergestellt wird, dass der Absender über genügend ETH verfügt, um die Transaktion auszuführen, und dass er sie mit dem richtigen Schlüssel signiert hat.
3. Wenn die Transaktion gültig ist, fügt der Ausführungs-Client sie seinem lokalen Mempool (Liste der ausstehenden Transaktionen) hinzu und überträgt sie auch an andere Blockchain-Knoten über das Gossip-Netzwerk der Ausführungsebene. Wenn andere Blockchain-Knoten von der Transaktion erfahren, fügen sie diese ebenfalls ihrem lokalen Mempool hinzu. Fortgeschrittene Benutzer könnten darauf verzichten, ihre Transaktion zu übertragen, und sie stattdessen an spezialisierte Block-Builder wie [Flashbots Auction](https://docs.flashbots.net/flashbots-auction/overview) weiterleiten. Dies ermöglicht es ihnen, die Transaktionen in kommenden Blöcken für maximalen Profit zu organisieren ([Maximal extrahierbarer Wert (MEV)](/developers/docs/mev/#mev-extraction)).
4. Einer der Validator-Blockchain-Knoten im Netzwerk ist der Block-Vorschlagende für den aktuellen Slot, nachdem er zuvor pseudozufällig mittels RANDAO ausgewählt wurde. Dieser Blockchain-Knoten ist dafür verantwortlich, den nächsten Block zu erstellen und zu übertragen, der der Ethereum-Blockchain hinzugefügt werden soll, und den globalen Zustand zu aktualisieren. Der Blockchain-Knoten besteht aus drei Teilen: einem Ausführungs-Client, einem Konsens-Client und einem Validator-Client. Der Ausführungs-Client bündelt Transaktionen aus dem lokalen Mempool in eine „Ausführungs-Payload“ und führt sie lokal aus, um eine Zustandsänderung zu generieren. Diese Informationen werden an den Konsens-Client weitergegeben, wo die Ausführungs-Payload als Teil eines „Beacon-Blocks“ verpackt wird, der auch Informationen über Belohnungen, Strafen, Slashing, Bestätigungen usw. enthält, die es dem Netzwerk ermöglichen, sich auf die Reihenfolge der Blöcke an der Spitze der Chain zu einigen. Die Kommunikation zwischen den Ausführungs- und Konsens-Clients wird detaillierter unter [Verbindung der Konsens- und Ausführungs-Clients](/developers/docs/networking-layer/#connecting-clients) beschrieben.
5. Andere Blockchain-Knoten empfangen den neuen Beacon-Block über das Gossip-Netzwerk der Konsensebene. Sie geben ihn an ihren Ausführungs-Client weiter, wo die Transaktionen lokal erneut ausgeführt werden, um sicherzustellen, dass die vorgeschlagene Zustandsänderung gültig ist. Der Validator-Client bestätigt dann, dass der Block gültig ist und aus seiner Sicht der Chain der logische nächste Block ist (was bedeutet, dass er auf der Chain mit dem größten Gewicht an Bestätigungen aufbaut, wie in den [Fork-Choice-Regeln](/developers/docs/consensus-mechanisms/pos/#fork-choice) definiert). Der Block wird der lokalen Datenbank in jedem Blockchain-Knoten hinzugefügt, der ihn bestätigt.
6. Die Transaktion kann als „finalisiert“ betrachtet werden, wenn sie Teil einer Chain mit einer „Supermajority-Verbindung“ zwischen zwei Checkpoints geworden ist. Checkpoints treten zu Beginn jeder Epoche auf und existieren, um der Tatsache Rechnung zu tragen, dass nur eine Teilmenge der aktiven Validatoren in jedem Slot Bestätigungen abgibt, aber alle aktiven Validatoren über jede Epoche hinweg Bestätigungen abgeben. Daher kann eine „Supermajority-Verbindung“ nur zwischen Epochen nachgewiesen werden (hierbei stimmen 66 % des gesamten gestakten ETH im Netzwerk über zwei Checkpoints überein).

Weitere Details zur Finalität finden Sie unten.

## Finalität {#finality}

Eine Transaktion hat in verteilte Netzwerken „Finalität“, wenn sie Teil eines Blocks ist, der sich nicht ändern kann, ohne dass eine große Menge an ETH verbrannt wird. Beim Proof-of-Stake-Ethereum wird dies mithilfe von „Checkpoint“-Blöcken verwaltet. Der erste Block in jeder Epoche ist ein Checkpoint. Validatoren stimmen für Paare von Checkpoints ab, die sie für gültig halten. Wenn ein Paar von Checkpoints Stimmen auf sich zieht, die mindestens zwei Drittel des gesamten gestakten ETH repräsentieren, werden die Checkpoints hochgestuft. Der neuere der beiden (Ziel) wird „gerechtfertigt“ (justified). Der frühere der beiden ist bereits gerechtfertigt, da er das „Ziel“ in der vorherigen Epoche war. Nun wird er auf „finalisiert“ hochgestuft. Dieser Prozess der Hochstufung der Checkpoints wird von **[Casper the Friendly Finality Gadget (Casper-FFG)](https://arxiv.org/pdf/1710.09437)** gehandhabt. Casper-FFG ist ein Block-Finalitäts-Tool für den Konsens. Sobald ein Block finalisiert ist, kann er nicht rückgängig gemacht oder geändert werden, ohne dass ein mehrheitliches Slashing der Staker erfolgt, was es wirtschaftlich unrentabel macht.

Um einen finalisierten Block rückgängig zu machen, müsste ein Angreifer in Kauf nehmen, mindestens ein Drittel des gesamten Angebots an gestaktem ETH zu verlieren. Der genaue Grund dafür wird in diesem [Blogbeitrag der Ethereum Foundation](https://blog.ethereum.org/2016/05/09/on-settlement-finality) erklärt. Da Finalität eine Zweidrittelmehrheit erfordert, könnte ein Angreifer das Netzwerk daran hindern, Finalität zu erreichen, indem er mit einem Drittel des gesamten Einsatzes abstimmt. Es gibt einen Mechanismus, um sich dagegen zu verteidigen: das [Inactivity Leak](https://eth2book.info/bellatrix/part2/incentives/inactivity) (Inaktivitätsleck). Dieses wird aktiviert, wenn die Chain für mehr als vier Epochen nicht finalisiert werden kann. Das Inactivity Leak entzieht den Validatoren, die gegen die Mehrheit stimmen, nach und nach das gestakte ETH, sodass die Mehrheit wieder eine Zweidrittelmehrheit erlangen und die Chain finalisieren kann.

## Kryptoökonomische Sicherheit {#crypto-economic-security}

Einen Validator zu betreiben, ist eine Verpflichtung. Es wird erwartet, dass der Validator über ausreichende Hardware und Konnektivität verfügt, um an der Block-Validierung und -Vorschlagung teilzunehmen. Im Gegenzug wird der Validator in ETH bezahlt (sein gestaktes Guthaben steigt). Andererseits eröffnet die Teilnahme als Validator auch neue Wege für Benutzer, das Netzwerk aus persönlichem Gewinnstreben oder zur Sabotage anzugreifen. Um dies zu verhindern, entgehen Validatoren ETH-Belohnungen, wenn sie nicht teilnehmen, wenn sie dazu aufgerufen werden, und ihr bestehender Einsatz kann zerstört werden, wenn sie sich unehrlich verhalten. Zwei primäre Verhaltensweisen können als unehrlich angesehen werden: das Vorschlagen mehrerer Blöcke in einem einzigen Slot (Equivocation) und das Einreichen widersprüchlicher Bestätigungen.

Die Menge an ETH, die dem Slashing unterliegt, hängt davon ab, wie viele Validatoren etwa zur gleichen Zeit ebenfalls geslasht werden. Dies ist als ["Korrelationsstrafe"](https://eth2book.info/bellatrix/part2/incentives/slashing#the-correlation-penalty) bekannt und kann geringfügig sein (\~1 % Einsatz für einen einzelnen Validator, der alleine geslasht wird) oder dazu führen, dass 100 % des Einsatzes des Validators zerstört werden (Massen-Slashing-Ereignis). Sie wird auf halbem Weg durch eine erzwungene Austrittsperiode verhängt, die mit einer sofortigen Strafe (bis zu 1 ETH) an Tag 1, der Korrelationsstrafe an Tag 18 und schließlich dem Ausschluss aus dem Netzwerk an Tag 36 beginnt. Sie erhalten jeden Tag geringfügige Strafen für fehlende Bestätigungen, weil sie im Netzwerk präsent sind, aber keine Stimmen abgeben. All dies bedeutet, dass ein koordinierter Angriff für den Angreifer sehr kostspielig wäre.

## Fork-Choice {#fork-choice}

Wenn das Netzwerk optimal und ehrlich funktioniert, gibt es immer nur einen neuen Block an der Spitze der Chain, und alle Validatoren bestätigen ihn. Es ist jedoch möglich, dass Validatoren aufgrund von Netzwerklatenz oder weil ein Block-Vorschlagender zweideutig gehandelt hat (Equivocation), unterschiedliche Ansichten über die Spitze der Chain haben. Daher benötigen Konsens-Clients einen Algorithmus, um zu entscheiden, welchen sie bevorzugen. Der im Proof-of-Stake-Ethereum verwendete Algorithmus heißt [LMD-GHOST](https://arxiv.org/pdf/2003.03052.pdf) und funktioniert, indem er den Fork identifiziert, der das größte Gewicht an Bestätigungen in seiner Historie aufweist.

## Proof-of-Stake und Sicherheit {#pos-and-security}

Die Bedrohung durch einen [51-%-Angriff](https://www.investopedia.com/terms/1/51-attack.asp) besteht beim Proof-of-Stake nach wie vor, genau wie beim Proof-of-Work, aber sie ist für die Angreifer noch riskanter. Ein Angreifer bräuchte 51 % des gestakten ETH. Er könnte dann seine eigenen Bestätigungen verwenden, um sicherzustellen, dass sein bevorzugter Fork derjenige mit den meisten angesammelten Bestätigungen ist. Das „Gewicht“ der angesammelten Bestätigungen wird von Konsens-Clients verwendet, um die korrekte Chain zu bestimmen, sodass dieser Angreifer in der Lage wäre, seinen Fork zum kanonischen zu machen. Eine Stärke von Proof-of-Stake gegenüber Proof-of-Work ist jedoch, dass die Community Flexibilität bei der Durchführung eines Gegenangriffs hat. Zum Beispiel könnten die ehrlichen Validatoren beschließen, weiter auf der Minderheits-Chain aufzubauen und den Fork des Angreifers zu ignorieren, während sie Apps, Börsen und Pools ermutigen, dasselbe zu tun. Sie könnten auch beschließen, den Angreifer gewaltsam aus dem Netzwerk zu entfernen und sein gestaktes ETH zu zerstören. Dies sind starke wirtschaftliche Verteidigungen gegen einen 51-%-Angriff.

Über 51-%-Angriffe hinaus könnten böswillige Akteure auch andere Arten von bösartigen Aktivitäten versuchen, wie zum Beispiel:

- Long-Range-Angriffe (obwohl das Finalitäts-Gadget diesen Angriffsvektor neutralisiert)
- Short-Range-„Reorgs“ (obwohl Proposer-Boosting und Fristen für Bestätigungen dies abschwächen)
- Bouncing- und Balancing-Angriffe (ebenfalls durch Proposer-Boosting abgeschwächt, und diese Angriffe wurden ohnehin nur unter idealisierten Netzwerkbedingungen demonstriert)
- Avalanche-Angriffe (neutralisiert durch die Regel der Fork-Choice-Algorithmen, nur die neueste Nachricht zu berücksichtigen)

Insgesamt hat sich gezeigt, dass Proof-of-Stake, wie es auf Ethereum implementiert ist, wirtschaftlich sicherer ist als Proof-of-Work.

## Vor- und Nachteile {#pros-and-cons}

| Vorteile                                                                                                                                                                                                                                                                            | Nachteile                                                                                           |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------- |
| Staking macht es für Einzelpersonen einfacher, sich an der Sicherung des Netzwerks zu beteiligen, was die Dezentralisierung fördert. Ein Validator-Blockchain-Knoten kann auf einem normalen Laptop ausgeführt werden. Staking-Pools ermöglichen es Benutzern, Staking zu betreiben, ohne 32 ETH zu besitzen. | Proof-of-Stake ist jünger und im Vergleich zu Proof-of-Work weniger praxiserprobt.                  |
| Staking ist dezentralisierter. Skaleneffekte gelten nicht in der gleichen Weise wie beim PoW-Mining.                                                                                                                                                                                | Proof-of-Stake ist komplexer zu implementieren als Proof-of-Work.                                   |
| Proof-of-Stake bietet eine größere kryptoökonomische Sicherheit als Proof-of-Work.                                                                                                                                                                                                  | Benutzer müssen drei Softwarekomponenten ausführen, um am Proof-of-Stake von Ethereum teilzunehmen. |
| Es ist weniger Emission von neuem ETH erforderlich, um Netzwerkteilnehmer zu motivieren.                                                                                                                                                                                            |                                                                                                     |

### Vergleich mit Proof-of-Work {#comparison-to-proof-of-work}

Ethereum verwendete ursprünglich Proof-of-Work, wechselte aber im September 2022 zu Proof-of-Stake. PoS bietet mehrere Vorteile gegenüber PoW, wie zum Beispiel:

- bessere Energieeffizienz – es ist nicht nötig, viel Energie für Proof-of-Work-Berechnungen aufzuwenden
- niedrigere Eintrittsbarrieren, reduzierte Hardwareanforderungen – es ist keine Elite-Hardware erforderlich, um eine Chance zu haben, neue Blöcke zu erstellen
- reduziertes Zentralisierungsrisiko – Proof-of-Stake sollte dazu führen, dass mehr Blockchain-Knoten das Netzwerk sichern
- aufgrund des geringen Energiebedarfs ist weniger ETH-Emission erforderlich, um die Teilnahme zu motivieren
- wirtschaftliche Strafen für Fehlverhalten machen Angriffe im 51-%-Stil für einen Angreifer im Vergleich zu Proof-of-Work kostspieliger
- die Community kann auf die soziale Wiederherstellung einer ehrlichen Chain zurückgreifen, falls ein 51-%-Angriff die kryptoökonomischen Verteidigungen überwinden sollte.

## Weiterführende Literatur {#further-reading}

- [Proof of Stake FAQ](https://vitalik.eth.limo/general/2017/12/31/pos_faq.html) _Vitalik Buterin_
- [What is Proof of Stake](https://consensys.net/blog/blockchain-explained/what-is-proof-of-stake/) _ConsenSys_
- [What Proof of Stake Is And Why It Matters](https://bitcoinmagazine.com/culture/what-proof-of-stake-is-and-why-it-matters-1377531463) _Vitalik Buterin_
- [Why Proof of Stake (Nov 2020)](https://vitalik.eth.limo/general/2020/11/06/pos2020.html) _Vitalik Buterin_
- [Proof of Stake: How I Learned to Love Weak Subjectivity](https://blog.ethereum.org/2014/11/25/proof-stake-learned-love-weak-subjectivity) _Vitalik Buterin_
- [Proof-of-stake Ethereum attack and defense](https://mirror.xyz/jmcook.eth/YqHargbVWVNRQqQpVpzrqEQ8IqwNUJDIpwRP7SS5FXs)
- [A Proof of Stake Design Philosophy](https://medium.com/@VitalikButerin/a-proof-of-stake-design-philosophy-506585978d51) _Vitalik Buterin_
- [Video: Vitalik Buterin explains proof-of-stake to Lex Fridman](https://www.youtube.com/watch?v=3yrqBG-7EVE)

## Verwandte Themen {#related-topics}

- [Proof-of-Work](/developers/docs/consensus-mechanisms/pow/)
- [Proof-of-Authority](/developers/docs/consensus-mechanisms/poa/)