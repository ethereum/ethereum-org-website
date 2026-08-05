---
title: "Warum auf Ethereum aufbauen"
description: "Dezentralisierung, Zensurresistenz, erlaubnisfreie Bereitstellung und Komponierbarkeit sind keine separaten Verkaufsargumente. Sie verstärken sich gegenseitig. Ein praktischer Leitfaden, warum Entwickler Ethereum wählen sollten."
author: "Philip Krause"
team: "EF Builder Growth"
tags:
  - "Dezentralisierung"
  - "Zensurresistenz"
  - "Komponierbarkeit"
published: 2026-05-12
image: /images/developers/blog/latest-post-header-1.png
breadcrumb: "Warum auf Ethereum aufbauen"
lang: de
---

Entwickler wählen Infrastruktur nach den Versprechen, die ihre App halten muss.

Die meisten Softwareversprechen hängen von einem Betreiber ab. Ein Cloud-Anbieter hält den Server am Laufen. Eine Plattform hält das Konto offen. Ein Zahlungsabwickler hält den Händler aktiv. Ein API-Anbieter hält den Schlüssel gültig. Das ist für viele Produkte in Ordnung. Es reicht jedoch nicht aus, wenn der Wert des Produkts von neutralem Zugang, einem gemeinsamen Zustand und Commitments abhängt, die Benutzer und andere Entwickler selbst überprüfen können.

Ethereum ist für den zweiten Fall gebaut, in dem neutraler Zugang und verifizierbare Commitments das Produkt sind. Niemandem gehört es. Die Chain läuft über viele Länder, viele Betreiber und mehrere unabhängige Client-Implementierungen hinweg, und kein einzelnes Unternehmen, kein Validator und keine Stiftung kann die Regeln stillschweigend umschreiben. Für einen Entwickler bedeutet das, dass es nicht nur ein Ort ist, um Code zu hosten. Es ist ein Ort, um öffentliche Commitments abzugeben. Sie können Code bereitstellen, ohne jemanden zu fragen, Benutzer können weiterhin auf das zugreifen, was Sie bereitstellen, andere Entwickler können ohne Ihre Erlaubnis darauf aufbauen, und Ihre App kann weiterhin funktionieren, selbst wenn eine Partei, einschließlich Ihnen selbst, die Zusammenarbeit einstellt.

## Dezentralisierung {#decentralization}

Dezentralisierung ist das Fundament, auf dem diese Eigenschaften ruhen. Ethereum liefert sie durch ein Netzwerk von Computern, sogenannten Knoten, die jeweils eine Kopie der Chain speichern und jede Transaktion überprüfen. Jeder Knoten führt Client-Software aus. Eine Teilmenge der Knoten, sogenannte Validatoren, wechseln sich dabei ab, neue Blöcke durch einen Prozess namens Konsens vorzuschlagen und zu bestätigen. Um teilzunehmen, hinterlegen Validatoren ETH als Sicherheit, den sogenannten Stake, den sie verlieren, wenn sie die Regeln brechen. Im April 2026 wurden im Knoten-Tracker von Etherscan rund 13.700 bis 14.000 Knoten erfasst, die über die USA, Deutschland, China, Großbritannien, Russland, Japan und Dutzende andere Länder verteilt waren.

Dezentralisierung ist auch wirtschaftlich. Etwa 32 bis 36 Millionen ETH, rund 27 bis 29 % des Angebots, sind als Sicherheit gestaked, die das Protokoll kürzt (slashing), wenn Validatoren nachweislich Fehlverhalten zeigen. Ein Angreifer müsste einen bedeutenden Bruchteil dieses Stakes erwerben und riskieren, um die Chain zu korrumpieren. Bei den ETH-Preisen vom April 2026 bedeutet das, dass zig Milliarden Dollar auf dem Spiel stünden.

Die andere Dimension ist die Software selbst. Jeder Ethereum-Knoten führt zwei Softwarekomponenten nebeneinander aus. Ein Ausführungsclient führt die EVM aus und verfolgt den Zustand der Verträge. Ein Konsens-Client kümmert sich um Proof-of-Stake (PoS). Er verfolgt, welche Validatoren Blöcke vorschlagen, welche Blöcke das Netzwerk akzeptiert und wann ein Block seine Endgültigkeit erreicht. Eine gesunde Dezentralisierung erfordert mehrere unabhängige Implementierungen von beiden, damit ein Fehler in einem Client nicht automatisch zu einem Fehler in Ethereum wird.

Die Ausführungsschicht hat fünf große Clients in Produktion. Geth läuft bei etwa 50 %, Nethermind bei rund 25 %, Besu bei rund 9 %, Reth bei rund 8 % und Erigon bei rund 7 %. Die Konsensschicht läuft auf Lighthouse, Prysm, Teku, Nimbus, Lodestar und anderen Clients. Ethereum ist auf keiner der beiden Schichten eine Single-Client-Chain.

Der Anteil von Geth von fast 50 % ist die eigentliche Schwachstelle. Ein Fehler in einem Minderheits-Client ist für dessen Betreiber schmerzhaft, aber der Rest des Netzwerks kann weiterarbeiten. Ein schwerwiegender Fehler in einem Mehrheits-Client ist gefährlicher. Deshalb ist Client-Diversität eine aktive operative Priorität.

Diese Priorität wurde bereits auf die Probe gestellt. Ethereum hatte seit dem Genesis-Block am 30. Juli 2015 noch nie einen vollständigen Stillstand der Chain. Am nächsten kam es einem größeren Vorfall am 11. und 12. Mai 2023, als die Konsensschicht, die sogenannte Beacon Chain, für etwa 25 Minuten und später für etwa 64 Minuten keine Endgültigkeit erreichte. Die Ursache war ein Fehler im Prysm-Client. Für die Endgültigkeit müssen mehr als zwei Drittel der Validatoren attestieren, und der Anteil von Prysm war zu diesem Zeitpunkt hoch genug, dass sein Problem das Netzwerk kurzzeitig unter diesen Schwellenwert drückte.

Ein Stillstand der Endgültigkeit ist nicht dasselbe wie ein Stillstand der Chain. Es wurden weiterhin neue Blöcke produziert, Transaktionen wurden weiterhin aufgenommen, und die meisten Benutzer und Anwendungen funktionierten weiterhin. Was ins Stocken geriet, war Ethereums stärkste Garantie für die Abwicklung. Unter normalen Konsensannahmen kann ein Block, der älter als etwa 13 Minuten ist, nicht rückgängig gemacht werden. Bridges, Börsen und andere Systeme, die auf die Endgültigkeit warten, bevor sie Einzahlungen gutschreiben, hätten diese Flüsse pausiert. Die Chain selbst erholte sich automatisch und ohne manuelles Eingreifen, sobald genügend Validatoren wieder auf dem neuesten Stand waren.

Für Entwickler ist diese Historie von Bedeutung. Wenn andere Personen Vermögenswerte in Ihren Verträgen halten, Aufträge über Ihren Markt leiten oder auf Ihren Grundbausteinen aufbauen sollen, benötigen sie ein Fundament, das auch bei Fehlern, Client-Ausfällen und institutionellem Druck weiterläuft.

## Zensurresistenz {#censorship-resistance}

Dezentralisierung ist die Struktur. Zensurresistenz ist einer der praktischen Vorteile, die sie mit sich bringt. Benutzer sollten keine Erlaubnis von einem Unternehmen, einer Regierung, einem Relay, einem Validator, einem RPC-Anbieter oder einem App-Betreiber benötigen, um eine gültige Transaktion an Ihre Verträge zu senden.

Das bedeutet nicht, dass jede Transaktion im nächsten Block landet. Es bedeutet, dass keine einzelne Partei eine gültige Transaktion für immer von der Chain fernhalten kann. Jeder Block wird von einem anderen Validator vorgeschlagen, der mit externen Parteien, sogenannten Erstellern und Relays, zusammenarbeitet, um ihn zusammenzustellen. Wenn einer von ihnen Ihre Transaktion herausfiltert, hat der nächste Slot eine andere Besetzung, und schließlich wird einer von ihnen sie aufnehmen. Zensur muss über diese gesamte rotierende Besetzung hinweg aufrechterhalten werden, was viel schwieriger ist, als wenn ein einzelner Betreiber Nein sagt. Die Zeit nach Tornado Cash hat gezeigt, wie das unter Druck aussieht.

Tornado Cash ist ein Privatsphäre-Mixer-Vertrag, der die Onchain-Verbindung zwischen Einzahlung und Abhebung unterbricht. Nachdem das OFAC ihn im August 2022 sanktioniert hatte, weigerten sich mehrere große MEV-Boost-Relays, Blöcke weiterzuleiten, die Transaktionen von sanktionierten Adressen enthielten. Der Anteil der Blöcke, die über diese OFAC-konformen Relays erstellt wurden, erreichte im November 2022 einen Höchststand von fast 79 %. Die anderen 21 % stammten von Relays und Erstellern, die nicht filterten, sodass Tornado Cash-Transaktionen immer noch landeten, nur langsamer. Die erwartete Wartezeit stieg von etwa 12 Sekunden auf etwa eine Minute.

Das sah alarmierend aus, und das war es auch. Dann fiel der Anteil. Neue Relays starteten explizit ohne Filter, darunter Ultra Sound und Agnostic, und Proposer konnten sie frei zu ihrem MEV-Boost-Setup hinzufügen. Niemand konnte jeden Proposer zwingen, ein filterndes Relay zu nutzen, sodass der Anteil nicht auf seinem Höchststand bleiben konnte. Bis Anfang 2023 lag er unter 50 %, und im restlichen Jahr 2023 schwankte er zwischen 27 % und 47 %. Das OFAC strich Tornado Cash im März 2025 von der Sanktionsliste. Diese Episode bleibt Ethereums deutlichster Stresstest für Zensurresistenz.

Ethereum verlagert auch mehr von dieser Garantie in das Protokoll selbst. Ein geplantes Upgrade namens FOCIL (EIP-7805) fügt Inklusionslisten hinzu. Zufällig ausgewählte Validatoren veröffentlichen Transaktionen, die sie im öffentlichen Mempool sehen, und es wird erwartet, dass der nächste Block diese Listen erfüllt. Wenn ein Block sie ignoriert, kann der Rest des Netzwerks ihn ablehnen. Niemand kann also Ihre Benutzer davon abhalten, Ihre App zu nutzen.

## Erlaubnisfrei {#permissionless}

Bei der Zensurresistenz geht es darum, ob Benutzer Ihre App nach der Bereitstellung weiterhin erreichen können. Bei der Erlaubnisfreiheit geht es darum, ob Sie überhaupt etwas bereitstellen können.

Die Bereitstellung auf Ethereum erfordert keine Partnerschaft, kein Konto, keine Listungsgenehmigung, keine App-Store-Überprüfung und keine kommerzielle Vereinbarung. Jeder kann Code bereitstellen, einen Vertrag aufrufen, einen Knoten betreiben, Daten indizieren, eine Wallet erstellen oder eine Schnittstelle veröffentlichen. Die Basisschicht weiß nicht, ob Sie ein Startup, eine Bank, ein Solo-Entwickler, ein Agent, eine DAO oder ein Benutzer ganz ohne Unternehmen sind.

Das verändert das Entwicklermodell. Auf einer Plattform kann der Plattformbetreiber Bedingungen ändern, Schlüssel widerrufen, Regionen blockieren, Apps entfernen oder den Zugang von einer Geschäftsbeziehung abhängig machen. Auf Ethereum bewertet das Protokoll Transaktionen nach denselben öffentlichen Regeln für jeden Aufrufer. Ein heute bereitgestellter Vertrag läuft nach diesen öffentlichen Regeln für jede Adresse, solange die Chain weiterläuft.

Dies beseitigt nicht jede Abhängigkeit. Die meisten Benutzer erreichen Ihre Verträge nicht direkt. Sie gehen über ein Frontend, eine Wallet und einen RPC-Anbieter, und jede dieser Schichten kann ausfallen oder filtern. Frontends können vom Netz genommen werden. RPC-Anbieter, also die Dienste, die die meisten App- und Wallet-Anfragen an die Chain weiterleiten, können sich weigern, Transaktionen weiterzuleiten, oder bestimmte Regionen und Adressen blockieren. Wallets können wählen, was sie anzeigen.

Die zugrunde liegende Ausführungsumgebung bleibt jedoch offen. Wenn Ihr Frontend ausfällt, kann ein Benutzer den Vertrag immer noch direkt aufrufen, und ein anderer Entwickler kann eine neue Schnittstelle erstellen. Wenn eine Wallet Ihren Token nicht mehr unterstützt, funktioniert der Vertrag weiterhin. Wenn ein RPC-Anbieter filtert, kann eine App über einen anderen routen oder einen eigenen Knoten betreiben, um das Netzwerk zu erreichen.

## Komponierbarkeit {#composability}

Erlaubnisfreiheit bringt Ihren Code auf die Chain. Sobald er dort ist, kann ihn niemand mehr entfernen, sodass andere Entwickler auf Ihren Verträgen aufbauen können und Sie auf ihren.

Wrapped Ether (WETH) ist das sauberste Beispiel. Es ist ein Vertrag, der ETH verpackt, damit es wie ein Standard-Token in anderen Verträgen verwendet werden kann. Er befindet sich an einer festen Ethereum-Adresse, hält mit Stand Mai 2026 etwa 1,8 Millionen WETH, hat rund 3,25 Millionen Inhaber und fungiert als gemeinsame Einheit über DEXs, Märkte für Kreditvergabe, Vaults und Bridges hinweg. Es ist Code, den Tausende anderer Verträge und Apps direkt nutzen können.

Dieses Muster wiederholt sich im gesamten Ökosystem. Vom Genesis-Block bis Anfang 2025 verzeichnete Ethereum zig Millionen Vertragsbereitstellungen und nach Zählung von Zellic rund 2,5 Millionen einzigartige Bytecodes. Standards wie ERC-20 für fungible Token und ERC-721 für nicht-fungible Token (NFTs) wurden zu Koordinationsschichten. Ein Token, den Ihr Vertrag ausgibt, kann auf einer DEX gehandelt, auf einem Geldmarkt beliehen, von Analysetools indiziert, in Wallets angezeigt und von anderen Systemen überbrückt oder verpackt werden, ohne dass jedes Team eine individuelle Vereinbarung aushandeln muss.

Mit Stand Mai 2026 befanden sich rund 46 Milliarden US-Dollar in Dezentralisierten Finanzen (DeFi) auf Ethereum. Dieses Geld ist in Tausenden von funktionierenden Protokollen gebunden, darunter Vermögenswerte, Märkte, Orakel, Wallets, Kontosysteme, Governance-Verträge, Bridges, Analysen und Entwicklertools. All das ist Code, den Sie vom ersten Tag an direkt aufrufen können, anstatt alles von Grund auf neu zu erstellen oder auf Partnerschaften zu warten.

## Die Agenten-Ökonomie {#the-agent-economy}

Erlaubnisfreier Zugang und Zensurresistenz, mit Dezentralisierung als Grundlage, sind für die nächste Welle von Benutzern, die zu Ethereum kommen, noch wichtiger. KI-Agenten sind diese Welle, und sie bezahlen für Dienste, halten Kapital und wickeln Geschäfte mit anderen Agenten durch Transaktionen und Vertragsaufrufe ab, alles ohne menschliches Eingreifen. Ein Agent hat keine Kreditkarte, die belastet werden kann, kein Plattformkonto, das gesperrt werden kann, und keinen Menschen, den er anrufen kann, wenn sich ein Relay weigert, eine Transaktion weiterzuleiten. Deshalb sind beide Eigenschaften für diese Art von Software nicht länger optional, und Ethereums Eigenschaften passen genau zu dem, was ein Agent tatsächlich benötigt. Ethereum ist der Ort, an dem sich diese Ökonomie voraussichtlich abspielen wird, und das könnte die Nutzerbasis immens vergrößern.

Egal, ob Sie den Agenten bereitstellen oder die Verträge, die der Agent aufruft, es treten dieselben Probleme auf. Auf einem typischen gehosteten Stack wird die Identität des Agenten von einem Plattformkonto gemietet, das widerrufen werden kann. Seine Zahlungen hängen von der Karte oder dem API-Schlüssel eines Menschen ab. Seine Regeln laufen auf einem Server, den ein Betreiber kontrolliert. Seine Kontinuität hängt von einem Host ab, der verschwinden kann. Jede einzelne dieser Abhängigkeiten soll durch die Basisschicht von Ethereum beseitigt werden.

Auf Ethereum hängt nichts davon von einem Betreiber ab. Die Schlüssel des Agenten gehören ihm selbst, und die Regeln, gegen die er signiert, können nicht einseitig umgeschrieben werden. Seine Transaktionen durchlaufen dieselbe rotierende Besetzung von Validatoren, Erstellern und Relays, die jede andere Adresse vor gezielter Blockierung schützt. Zustandsübergänge finden öffentlich statt, sodass die Verträge auf der anderen Seite des Aufrufs keinem Betreiber vertrauen müssen, um zu berichten, was passiert ist.

Die Weichen sind bereits gestellt. Smart Contracts, Stablecoins und Kontoabstraktion geben einem autonomen Akteur heute eine funktionierende Adresse, ein funktionierendes Guthaben und programmierbare Ausgabenlimits. Standards für Agentenidentität und maschineneigene Zahlungen holen auf. ERC-8004 definiert Onchain-Register für Agentenidentität, Reputation und Validierung. x402 verwendet den HTTP-Statuscode 402, um Clients, einschließlich Agenten, APIs und digitale Dienste in Stablecoins ohne traditionelle Konten bezahlen zu lassen. Die Akzeptanz steht noch am Anfang, nimmt aber Fahrt auf, und die Integrationsfläche ist klein. Akzeptieren Sie x402-Zahlungen an Ihren Endpunkten, registrieren oder überprüfen Sie die Identität über ERC-8004 und behandeln Sie Agentenadressen als vollwertige Benutzer in Ihren Verträgen.

Für jeden Entwickler, der eine Chain für die Bereitstellung auswählt, sind Agenten die nächste sich bildende Nutzerklasse, und die Infrastruktur ist bereits live. Die Verträge, die Sie heute bereitstellen, können ihnen morgen dienen, ohne auf ein zukünftiges Protokoll warten zu müssen.

## Fazit {#conclusion}

Dezentralisierung, Zensurresistenz, erlaubnisfreie Bereitstellung und Komponierbarkeit sind keine separaten Verkaufsargumente. Sie verstärken sich gegenseitig. Dezentralisierung macht Zensurresistenz glaubwürdig und ermöglicht es Benutzern, weiterhin auf das Bereitgestellte zuzugreifen. Erlaubnisfreie Bereitstellung lässt Entwickler ihre Produkte veröffentlichen. Komponierbarkeit verwandelt diese Apps in eine gemeinsame Infrastruktur. Autonome Agenten können darüber Transaktionen abwickeln und niemand kann sie aufhalten. Was Sie bereitstellen, ist ein öffentliches Commitment. Es läuft auch ohne Sie weiter.

## Weiterführende Literatur {#further-reading}

- [Ethereum Foundation Checkpoint #9 (April 2026)](https://blog.ethereum.org/2026/04/10/checkpoint-9)
- [clientdiversity.org](https://clientdiversity.org/)
- [Etherscan Node Tracker](https://etherscan.io/nodetracker)
- [beaconcha.in Validatoren](https://beaconcha.in/charts/validators)
- [Post-Mortem: Mainnet-Endgültigkeit im Mai 2023](https://medium.com/offchainlabs/post-mortem-report-ethereum-mainnet-finality-05-11-2023-95e271dfd8b2)
- [mevwatch.info](https://www.mevwatch.info/)
- [The Block: OFAC-konforme Blöcke fallen auf 27 %](https://www.theblock.co/post/230179/ethereums-ofac-compliant-blocks-fall-to-27-marking-a-drop-in-protocol-level-censorship)
- [Hegotá Headliner-Vorschlag: FOCIL (EIP-7805)](https://ethereum-magicians.org/t/hegota-headliner-proposal-focil-eip-7805/27604)
- [EIP-7805: Fork-choice enforced Inclusion Lists (FOCIL)](https://eips.ethereum.org/EIPS/eip-7805)
- [EIP-8004: Onchain Agent Identity](https://eips.ethereum.org/EIPS/eip-8004)
- [coinbase/x402 GitHub](https://github.com/coinbase/x402)
- [CoinDesk: x402-Nachfrage hat sich nicht materialisiert](https://www.coindesk.com/markets/2026/03/11/coinbase-backed-ai-payments-protocol-wants-to-fix-micropayment-but-demand-is-just-not-there-yet)
- [WETH auf Etherscan](https://etherscan.io/token/0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2)
- [Zellic: Alle Ethereum-Verträge](https://www.zellic.io/blog/all-ethereum-contracts/)
- [DefiLlama: Ethereum-Chain](https://defillama.com/chain/ethereum)
- [OpenZeppelin: Technical Risk Assessment on Blockchain Networks (April 2026)](https://openzeppelin.com/hubfs/OpenZeppelin%20%7C%20Technical%20Risk%20Assessment%20on%20Blockchain%20Networks.pdf)