---
title: Proof-of-Stake (PoS)
description: Eine Erklärung des Proof-of-Stake-Konsensprotokolls und seiner Rolle in Ethereum.
lang: de
---

Proof-of-Stake (PoS) liegt dem [Konsensmechanismus](/developers/docs/consensus-mechanisms/) von Ethereum zugrunde. Ethereum wechselte 2022 zum Proof-of-Stake-Mechanismus, da dieser sicherer und weniger energieintensiv ist sowie sich besser für die Implementierung neuer Skalierungslösungen eignet als die frühere [Proof-of-Work](/developers/docs/consensus-mechanisms/pow)-Architektur.

## Voraussetzungen {#prerequisites}

Um diese Seite besser zu verstehen, empfehlen wir Ihnen, sich zunächst über [Konsensmechanismen](/developers/docs/consensus-mechanisms/) zu informieren.

## Was ist Proof-of-Stake (PoS)? {#what-is-pos}

Proof-of-Stake ist eine Methode, mit der nachgewiesen wird, dass Validatoren einen gewissen Wert in das Netzwerk eingebracht haben, der zerstört werden kann, wenn sie unehrlich handeln. Im Proof-of-Stake-Verfahren auf Ethereum setzen die Validatoren explizit Kapital ein, und zwar in Form von ETH in einen Smart Contract. Es ist dann die Aufgabe des Validatoren, zu prüfen, ob neue Blöcke, die über das Netzwerk propagiert wurden, gültig sind. Die Validatoren sind auch dafür verantwortlich, gelegentlich selbst neue Blöcke zu erstellen und über das Netzwerk zu propagieren. Wenn sie versuchen, das System zu täuschen (beispielsweise durch das Vorschlagen mehrerer Blöcke, wenn sie nur einen versenden sollen, oder das Abgeben widersprüchlicher Attestierungen) könnten Teile oder alle ETH, die sie als Kapital eingesetzt haben, zerstört werden.

## Validatoren {#validators}

Um als Validator teilzunehmen, muss ein Nutzer 32 ETH im Einzahlungsvertrag hinterlegen und drei separate Softwarekomponenten ausführen: einen Ausführungs-Client, einen Konsens-Client und einen Validator-Client. Wenn der Nutzer seine ETH hinterlegt, tritt er in eine Aktivierungswarteschlange ein, die die Anzahl neuer Validatoren begrenzt, die dem Netzwerk beitreten. Nach der Aktivierung erhalten Validatoren neue Blöcke von Peers im Ethereum-Netzwerk. Die im Block enthaltenen Transaktionen werden erneut ausgeführt, um zu prüfen, ob die vorgeschlagenen Änderungen am Ethereum-Status gültig sind. Zusätzlich dazu erfolgt die Überprüfung der Blocksignatur. Der Validator versendet dann ein Votum (genannt Attestierung) zugunsten dieses Blocks über das Netzwerk.

Bei Proof-of-Work war das Timing der Blocks durch die Schwierigkeit des Minings bestimmt. Bei Proof-of-Work ist das Tempo hingegen festgelegt. Die Zeit wird bei Proof-of-Stake-Ethereum in Slots (12 Sekunden) und Epochen (32 Slots) unterteilt. Ein Validator wird in jedem Slot zufällig für das Vorschlagen eines Blocks ausgewählt. Es ist die Aufgabe dieses Validators, einen neuen Block zu erstellen und ihn an andere Nodes im Netzwerk zu versenden. In jedem Slot wird außerdem zufällig ein Komitee aus Validatoren ausgewählt, das per Abstimmung über die Gültigkeit des vorgeschlagenen Blocks entscheidet. Die Aufteilung des Validatoren-Sets in Komitees ist wichtig, um die Netzwerkbelastung in einem kontrollierbaren Rahmen zu halten. Die Komitees teilen das Validatoren-Team so auf, dass jeder aktive Validator in jeder Epoche Attestierungen abgibt, jedoch nicht in jedem Slot.

## Wie eine Transaktion in Ethereum-PoS ausgeführt wird {#transaction-execution-ethereum-pos}

Der folgende Abschnitt enthält eine End-to-End-Erklärung, wie eine Transaktion auf Ethereum Proof of Stake ausgeführt wird.

1. Ein Nutzer erstellt und signiert eine [Transaktion](/developers/docs/transactions/) mit seinem privaten Schlüssel. Dies wird in der Regel von einer Wallet oder einer Bibliothek wie [ethers.js](https://docs.ethers.org/v6/), [web3js](https://docs.web3js.org/), [web3py](https://web3py.readthedocs.io/en/v5/) usw. übernommen, aber im Hintergrund stellt der Nutzer über die [JSON-RPC-API](/developers/docs/apis/json-rpc/) von Ethereum eine Anfrage an einen Node. Der Nutzer setzte die Menge an Gas fest, die er als Trinkgeld an den Validator abgeben würde, um ihn dazu anzuregen, die Transaktion in einen Block aufzunehmen. Die [Prioritätsgebühren](/developers/docs/gas/#priority-fee) werden an den Validator gezahlt, während die [Grundgebühr](/developers/docs/gas/#base-fee) verbrannt wird.
2. Die Transaktion wird an einen Ethereum-[Ausführungs-Client](/developers/docs/nodes-and-clients/#execution-client) übermittelt, der ihre Gültigkeit verifiziert. Das bedeutet, sicherzustellen, dass der Sender über genügend ETH verfügt, um die Transaktion zu erfüllen, und dass er sie mit dem richtigen Schlüssel signiert hat.
3. Wenn die Transaktion gültig ist, fügt der Ausführungsclient sie seinem lokalen Mempool (Liste der ausstehenden Transaktionen) hinzu und versendet sie über die Ausführungsebene im Gossip-Netzwerk an andere Nodes. Wenn andere Nodes von der Transaktion erfahren, fügen sie sie ebenfalls ihrem lokalen Mempool hinzu. Fortgeschrittene Nutzer können darauf verzichten, ihre Transaktion zu übertragen und sie stattdessen an spezialisierte Blockersteller wie [Flashbots Auction](https://docs.flashbots.net/flashbots-auction/overview) weiterleiten. Dies ermöglicht es ihnen, die Transaktionen in kommenden Blöcken so zu organisieren, dass maximaler Profit ([MEV](/developers/docs/mev/#mev-extraction)) erzielt wird.
4. Einer der Validatoren-Nodes im Netzwerk ist der Block-Proposer für den aktuellen Slot, der zuvor mittels RANDAO pseudozufällig ausgewählt wurde. Dieser Node ist dafür verantwortlich, den nächsten Block zu erstellen und zu übertragen, der zur Ethereum-Blockchain hinzugefügt wird, und dafür, den globalen Status zu aktualisieren. Der Node setzt sich aus drei Teilen zusammen: einem Ausführungsclient, einem Konsensclient und einem Validatorenclient. Der Ausführungsclient bündelt Transaktionen aus dem lokalen Mempool zu einer „Ausführungsnutzlast“ und führt sie lokal aus, um eine Zustandsänderung herbeizuführen. Diese Informationen werden an den Konsensclient weitergeleitet, wo die Ausführungsnutzlast als Teil eines „Beacon-Blocks“ verpackt wird, der auch Informationen über Belohnungen, Strafen, Slashings, Attestierungen usw. enthält, die es dem Netzwerk ermöglichen, sich auf die Reihenfolge der Blöcke an der Spitze der Chain zu einigen. Die Kommunikation zwischen den Ausführungs- und Konsens-Clients wird unter [Verbinden von Konsens- und Ausführungs-Clients](/developers/docs/networking-layer/#connecting-clients) genauer beschrieben.
5. Andere Nodes empfangen den neuen Beacon-Block über das Gossip-Netzwerk auf der Konsensebene. Sie leiten ihn an ihren Ausführungs-Client weiter, wo die Transaktionen erneut lokal ausgeführt werden, um sicherzustellen, dass die vorgeschlagene Zustandsänderung gültig ist. Der Validator-Client attestiert dann, dass der Block gültig ist und aus seiner Sicht der Kette der logisch nächste Block ist (d.h. er baut auf der Kette mit dem größten Gewicht an Attestierungen auf, wie in den [Fork-Auswahlregeln](/developers/docs/consensus-mechanisms/pos/#fork-choice) definiert). Der Block wird zur lokalen Datenbank in jedem Node hinzugefügt, der ihn attestiert.
6. Eine Transaktion kann als „finalisiert“ angesehen werden, wenn sie Teil einer Chain geworden ist, wobei zwischen zwei Checkpoints eine „Supermajority-Verbindung“ besteht. Zu Checkpoints kommt es zu Beginn jeder Epoche. Sie sollen der Tatsache Rechnung tragen, dass in jedem Slot nur eine bestimmte Teilmenge der aktiven Validatoren Attestierungen abgibt, wohingegen über die gesamte Epoche gesehen alle aktiven Validatoren Attestierungen abgeben. Deshalb kann eine „Supermajority-Verbindung“ nur zwischen Epochen nachgewiesen werden (hier stimmen 66 % der gesamten eingesetzten ETH im Netzwerk über zwei Checkpoints überein).

Weitere Details zur Endgültigkeit finden Sie unten.

## Endgültigkeit {#finality}

Eine Transaktion hat in verteilten Netzwerken „Endgültigkeit“, wenn sie Teil eines Blocks ist, der nicht geändern werden kann, ohne dass eine große Menge ETH verbrannt wird. Auf Proof-of-Stake-Ethereum wird dies mithilfe von „Checkpoint“-Blöcken verwaltet. Der erste Block jeder Epoche ist ein Checkpoint. Validatoren stimmen für Paare von Checkpoints ab, die sie als gültig einstufen. Wenn ein Paar von Checkpoints Stimmen auf sich vereint, die mindestens zwei Drittel der gesamten eingesetzten ETH repräsentieren, werden die Checkpoints aktualisiert. Der aktuellere der beiden (Ziel) wird „berechtigt“. Der frühere der beiden ist bereits berechtigt, da er in der vorherigen Epoche das „Ziel“ war. Jetzt wird er auf „finalisiert“ aktualisiert. Dieser Prozess der Aktualisierung der Checkpoints wird von **[Casper the Friendly Finality Gadget (Casper-FFG)](https://arxiv.org/pdf/1710.09437)** übernommen. Casper-FFG ist ein Tool für die Endgültigkeit von Blöcken im Konsens. Sobald ein Block finalisiert ist, kann er nicht ohne ein Slashing der Mehrheit der Staker rückgängig gemacht oder geändert werden, was dies wirtschaftlich unrentabel macht.

Um diesen Vorgang für einen finalisierten Block rückgängig zu machen, müsste ein Angreifer sich dazu bereit erklären, mindestens ein Drittel der Gesamtmenge an eingesetzten ETH zu verlieren. Der genaue Grund dafür wird in diesem [Blogbeitrag der Ethereum Foundation](https://blog.ethereum.org/2016/05/09/on-settlement-finality/) erklärt. Da für die Endgültigkeit eine Zwei-Drittel-Mehrheit erforderlich ist, könnte ein Angreifer verhindern, dass das Netzwerk Endgültigkeit erreicht, indem er mit einem Drittel des gesamten Einsatzes abstimmt. Es gibt einen Mechanismus, um sich dagegen zu verteidigen: das [Inaktivitäts-Leck](https://eth2book.info/bellatrix/part2/incentives/inactivity). Dieses tritt immer dann in Kraft, wenn die Chain in mehr als vier Epochen nicht finalisiert wird. Das Inactivity Leak entzieht den Validatoren die eingesetzten ETH, die gegen die Mehrheit stimmen, wodurch die Mehrheit wieder eine Zwei-Drittel-Mehrheit erreichen und die Chain finalisieren kann.

## Kryptoökonomische Sicherheit {#crypto-economic-security}

Das Ausführen eines Validators ist ein Commitment. Vom Validator wird erwartet, dass er ausreichend Hardware und Konnektivität aufrechterhält, um an Blockvalidierung und -vorschlägen teilzunehmen. Im Gegenzug wird der Validator in ETH bezahlt (sein eingesetztes Guthaben erhöht sich). Auf der anderen Seite ergeben sich aus der Teilnahme als Validator auch neue Möglichkeiten für Nutzer, das Netzwerk aus Motiven der persönlichen Vorteilnahme oder Sabotage anzugreifen. Um dies zu verhindern, profitieren Validatoren nicht von ETH-Belohnungen, wenn sie trotz Aufforderung nicht teilnehmen. Außerdem kann ihr bestehender Stake bei unehrlichen Handlungen zerstört werden. Zwei primäre Verhaltensweisen können als unehrlich betrachtet werden: das Vorschlagen mehrerer Blöcke in einem einzelnen Slot (Äquivokation) und das Einreichen widersprüchlicher Attestierungen.

Die Höhe der geslashten ETH hängt davon ab, wie viele Validatoren ungefähr zur gleichen Zeit geslasht werden. Dies wird als [„Korrelationsstrafe“](https://eth2book.info/bellatrix/part2/incentives/slashing#the-correlation-penalty) bezeichnet, und sie kann geringfügig ausfallen (~1 % des Stakes, wenn ein einzelner Validator alleine geslasht wird) oder dazu führen, dass 100 % des Stakes des Validators vernichtet wird (Massen-Slashing-Ereignis). Sie wird zur Hälfte der Zeit einer erzwungenen Austrittsperiode verhängt und beginnt mit einer sofortigen Strafe (bis zu 1 ETH) an Tag 1, setzt sich mit der Korrelationsstrafe an Tag 18 fort und führt schließlich zum Rauswurf aus dem Netzwerk an Tag 36. Sie erhalten täglich geringfügige Strafen für Attestierungen, da sie im Netzwerk präsent sind, aber keine Stimmen abgeben. All das bedeutet, dass ein koordinierter Angriff für den Angreifer sehr teuer wäre.

## Fork-Auswahl {#fork-choice}

Wenn das Netzwerk optimal und auf ehrliche Weise funktioniert, gibt es immer nur einen neuen Block an der Spitze der Chain und alle Validatoren bestätigen dies durch ihre Attestierungen. Es ist jedoch möglich, dass Validatoren aufgrund der Netzwerklatenz oder mehrdeutiger Aussagen eines Block-Proposers unterschiedliche Ansichten über Spitze der Chain haben. Daher benötigen Konsens-Clients einen Algorithmus, um zu entscheiden, welchen sie bevorzugen sollen. Der bei Proof-of-Stake-Ethereum verwendete Algorithmus heißt [LMD-GHOST](https://arxiv.org/pdf/2003.03052.pdf) und funktioniert, indem er den Fork identifiziert, der das größte Gewicht an Attestierungen in seiner Geschichte hat.

## Proof-of-Stake und Sicherheit {#pos-and-security}

Die Gefahr eines [51-%-Angriffs](https://www.investopedia.com/terms/1/51-attack.asp) besteht bei Proof-of-Stake genauso wie bei Proof-of-Work, aber für die Angreifer ist das Risiko noch höher. Ein Angreifer müsste über 51 % der eingesetzten ETH verfügen. Er könnte dann seine eigenen Attestierungen einsetzen, um sicherzustellen, dass seine gewünschte Abspaltung diejenige mit den meisten kumulierten Attestierungen ist. Das „Gewicht“ der kumulierten Attestierungen wird von Konsens-Clients verwendet, um die richtige Chain zu bestimmen. Ein Angreifer mit 51 % der eingesetzten ETH hätte also die Möglichkeit, seine Abspaltung zur kanonischen zu machen. Ein Vorteil von Proof-of-Stake gegenüber Proof-of-Work besteht allerdings darin, dass die Community Flexibilität bei der Durchführung einer Gegenattacke hat. Zum Beispiel könnten die ehrlichen Validatoren beschließen, weiterhin auf der Minderheits-Chain aufzubauen und gleichzeitig die Abspaltung des Angreifers zu ignorieren, während sie Apps, Börsen und Pools ermutigen, es ihnen gleichzutun. Sie könnten auch beschließen, den Angreifer gewaltsam aus dem Netzwerk zu entfernen und seine eingesetzten ETH zu vernichten. Diese Maßnahmen stellen starke wirtschaftliche Verteidigungsmechanismen gegen einen 51 %-Angriff dar.

Neben 51 %-Angriffen könnten böswillige Akteure auch versuchen, andere Arten von schädlichen Aktivitäten durchzuführen, wie zum Beispiel:

- Langstreckenangriffe (obwohl das Endgültigkeits-Gadget diesen Angriffsvektor neutralisiert)
- Kurzstrecken-'Reorgs' (werden durch Proposer-Boosting und Fristen für Attestierungen abgeschwächt)
- Bouncing- und Balancing-Angriffe (ebenfalls durch das Proposer-Boosting abgeschwächt; diese Angriffe wurden ohnehin nur unter idealisierten Netzwerkbedingungen demonstriert)
- Lawinenangriffe (neutralisiert durch die Regel des Abspaltungs-Wahl-Algorithmus, die besagt, dass nur die neueste Nachricht berücksichtigt wird)

Es hat sich insgesamt gezeigt, dass Proof-of-Stake, wie es auf Ethereum implementiert ist, wirtschaftlich sicherer ist als Proof-of-Work.

## Pro und Kontra {#pros-and-cons}

| Pro                                                                                                                                                                                                                                                                                                                                                     | Nachteile                                                                                                                   |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| Das Staking erleichtert es Einzelpersonen, an der Sicherung des Netzwerks teilzuhaben, und fördert damit die Dezentralisierung. Validator-Node kann auf einem normalen Laptop ausgeführt werden. Staking Pools ermöglichen es Benutzern, Kapital einzusetzen, auch wenn sie nicht über 32 ETH verfügen. | Proof-of-Stake ist neuer und es liegt weniger Betriebserfahrung vor als bei Proof-of-Work                                   |
| Staking ist stärker dezentralisiert. Skaleneffekte gelten beim Staking nicht in dem gleichen Maße wie beim Proof-of-Work-Mining.                                                                                                                                                                                        | Die Implementierung von Proof-of-Stake ist schwieriger als bei Proof-of-Work                                                |
| Proof-of-Stake bietet mehr kryptoökonomische Sicherheit als Proof-of-Work                                                                                                                                                                                                                                                                               | Benutzer müssen drei Komponenten von Software ausführen um an Ethereums Proof-of-Stake teilhaben zu können. |
| Weniger neue ETH müssen ausgegeben werden, um Anreize für Netzwerkteilnehmer zu schaffen                                                                                                                                                                                                                                                                |                                                                                                                             |

### Vergleich mit Proof-of-Work {#comparison-to-proof-of-work}

Ethereum nutzte ursprünglich Proof-of-Work, wechselte jedoch im September 2022 zu Proof-of-Stake. PoS bietet zahlreiche Vorteile gegenüber PoW, wie zum Beispiel:

- bessere Energieeffizienz – es besteht keine Notwendigkeit, viel Energie für Proof-of-Work-Berechnungen aufzuwenden
- niedrigere Eintrittshürden, reduzierte Hardwareanforderungen – es besteht für Benutzer keine Notwendigkeit für Elite-Hardware, damit sie eine Chance haben, neuen Blöcke zu erstellen
- reduziertes Zentralisierungsrisiko – Proof-of-Stake sollte zu mehr Nodes führen, die das Netzwerk sichern
- aufgrund des niedrigen Energiebedarfs ist eine geringere ETH-Ausgabe erforderlich, um Anreize für die Teilnahme zu schaffen
- wirtschaftliche Strafen für Fehlverhalten machen 51 %-Stil-Angriffe für einen Angreifer im Vergleich zu Proof-of-Work kostspieliger
- die Community kann auf die „soziale Wiederherstellung“ einer ehrlichen Chain zurückgreifen, falls ein 51 %-Angriff die kryptoökonomischen Abwehrmechanismen überwinden sollte.

## Weiterführende Lektüre {#further-reading}

- [Proof-of-Stake-FAQ](https://vitalik.eth.limo/general/2017/12/31/pos_faq.html) _Vitalik Buterin_
- [Was ist Proof-of-Stake](https://consensys.net/blog/blockchain-explained/what-is-proof-of-stake/) _ConsenSys_
- [Was Proof-of-Stake ist und warum es wichtig ist](https://bitcoinmagazine.com/culture/what-proof-of-stake-is-and-why-it-matters-1377531463) _Vitalik Buterin_
- [Warum Proof-of-Stake (Nov. 2020)](https://vitalik.eth.limo/general/2020/11/06/pos2020.html) _Vitalik Buterin_
- [Proof-of-Stake: Wie ich lernte, schwache Subjektivität zu lieben](https://blog.ethereum.org/2014/11/25/proof-stake-learned-love-weak-subjectivity/) _Vitalik Buterin_
- [Angriff und Verteidigung bei Proof-of-Stake-Ethereum](https://mirror.xyz/jmcook.eth/YqHargbVWVNRQqQpVpzrqEQ8IqwNUJDIpwRP7SS5FXs)
- [Eine Designphilosophie für Proof-of-Stake](https://medium.com/@VitalikButerin/a-proof-of-stake-design-philosophy-506585978d51) _Vitalik Buterin_
- [Video: Vitalik Buterin erklärt Lex Fridman Proof-of-Stake](https://www.youtube.com/watch?v=3yrqBG-7EVE)

## Verwandte Themen {#related-topics}

- [Proof-of-Work](/developers/docs/consensus-mechanisms/pow/)
- [Proof-of-Authority](/developers/docs/consensus-mechanisms/poa/)
