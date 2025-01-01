---
title: Angriff und Verteidigung im Proof-of-Stake-System auf Ethereum
description: Lernen Sie die bekannten Angriffsvektoren im Proof-of-Stake-System auf Ethereum kennen und wie diese abgewehrt werden können.
lang: de
---

Diebe und Saboteure suchen ständig nach Möglichkeiten, die Client-Software auf Ethereum anzugreifen. Diese Seite stellt die bekannten Angriffsvektoren auf Ethereums Konsensebene dar und erläutert, wie diese Angriffe abgewehrt werden können.

## Voraussetzungen {#prerequisites}

##  {#what-is-pos}

Ein häufiges Missverständnis ist, dass erfolgreiche Angreifer neue Ether generieren oder sie von beliebigen Konten abziehen können. Keines von beidem ist möglich, da alle Transaktionen von allen Ausführungs-Clients im Netzwerk ausgeführt werden. Diese müssen einfache Gültigkeitsbedingungen erfüllen (z. B. müssen Transaktionen vom privaten Schlüssel eines Absenders signiert werden, der Absender muss über ausreichend Guthaben verfügen, usw.), sonst werden sie einfach rückgängig gemacht. Es gibt drei verschiedene Arten von Ergebnissen, die ein Angreifer realistischerweise erreichen möchte: Neuorganisationen, doppelte Endgültigkeit oder das Verzögern von Endgültigkeit.

##  {#validators}

Eine **“Neuorganisation”** ist eine Neumischung von Blöcken in eine neue Reihenfolge. Hier könnten einige Blöcke in der kanonischen Chain hinzugefügt oder entfernt werden. Bei einer böswilligen Neuanordnung könnte sichergegangen werden, dass spezifische Blöcke ein- oder ausgeschlossen werden. Dies könnte dazu führen, dass für vorweglaufende und zurücklaufende Transaktionen (MEV) doppelte Ausgaben oder Wertextraktionen getätigt werden. Neuorganisationen könnten auch dazu eingesetzt werden, um zu verhindern, dass bestimmte Transaktionen in die kanonische Chain aufgenommen werden – eine Form der Zensur. Die extremste Form einer Neuorganisation ist die „Endgültigkeitsumkehrung“, bei der Blöcke ersetzt oder entfernt werden, die zuvor bereits finalisiert wurden. Das ist nur möglich, wenn mehr als ⅓ der insgesamt eingesetzten Ether vom Angreifer zerstört wird – diese Garantie wird als „wirtschaftliche Endgültigkeit“ bezeichnet – mehr dazu später.

**Doppelte Endgültigkeit** ist die unwahrscheinliche, aber ernste Bedingung, bei der zwei Abspaltungen gleichzeitig finalisiert werden können, was zu einer permanente Spaltung der Chain führt. Das ist theoretisch möglich für einen Angreifer, der dazu bereit ist, 34 % der insgesamt eingesetzten Ether zu riskieren. Die Community wäre dazu gezwungen, sich außerhalb der Chain zu koordinieren und sich darauf zu einigen, welcher Chain gefolgt werden soll. Dies würde eine starke Sozialebene erfordern.

##  {#transaction-execution-ethereum-pos}

1.
2.
3.
4.
5.
6.

Ein Angriff auf die soziale Ebene könnte darauf abzielen, das öffentliche Vertrauen in Ethereum zu untergraben, Ether zu entwerten, die Akzeptanz zu verringern oder die Ethereum-Community zu schwächen, sodass die Koordination außerhalb des Bands erschwert wird.

##  {#finality}

Erstmal könnten Einzelpersonen, die sich nicht aktiv an Ethereum beteiligen (indem sie Client-Software ausführen) angreifen, indem sie die Sozialebene (Layer 0) ins Visier nehmen. Layer 0 ist das Fundament, auf dem Ethereum aufgebaut ist. Als solches bietet es eine potenzielle Angriffsfläche. Die Konsequenzen aus so einem Angriff hätten Auswirkungen auf den gesamten restlichen Stack. Einige Beispiele hierfür sind:

##  {#crypto-economic-security}

Was diese Angriffe besonders gefährlich macht, ist, dass in vielen Fällen sehr wenig Kapital oder technisches Wissen dafür erforderlich ist. Ein Angriff auf Layer 0 könnte ein Multiplikator auf einen krypto-ökonomischen Angriff sein. Wenn es beispielsweise zu Zensur oder einer Endgültigkeitsumkehrung durch einen böswilligen Mehrheits-Stakeholder kommen würde, könnte eine Schwächung der Sozialebene es schwieriger machen, eine Antwort der Community außerhalb des Bandes zu koordinieren.

Eine Verteidigung gegen Angriffe auf Layer 0 ist wahrscheinlich nicht unkompliziert, jedoch lassen sich einige einfachen Prinzipien festlegen. Eines davon ist die Aufrechterhaltung eines hohen Signal-Rausch-Verhältnisses in Bezug auf öffentliche Informationen über Ethereum, die von ehrlichen Mitgliedern der Community in Blogs, auf Discord-Servern, in kommentierten Spezifikationen, Büchern, Podcasts und auf YouTube erstellt und verbreitet werden. Hier auf ethereum.org bemühen wir uns sehr darum, akkurate Informationen zu liefern und diese in möglichst viele Sprachen zu übersetzen. Einen Bereich mit hochqualitativen Informationen und Memes zu überfluten ist eine effektive Verteidigung gegen Falschinformationen.

##  {#fork-choice}

Eine andere wichtige Verteidigung gegen Angriffe gegen die Sozialebene sind klare Leitlinien und Verwaltungsprotokolle. Ethereum hat sich unter den Smart-Contract-Layer-1-Systemen seine Position als Champion in Bezug auf Dezentralisierung und Sicherheit erkämpft und misst gleichzeitig auch der Skalierbarkeit und Nachhaltigkeit hohen Wert bei. Welche Meinungsverschiedenheiten auch immer in der Ethereum-Community auftreten, diese Grundprinzipien werden nur minimal beeinträchtigt. Die Einschätzung zu einem Narrativ gegen diese Grundprinzipien und eine Prüfung dieser Prinzipien in mehreren Runden im Rahmen des EIP(Ethereum Improvement Proposal)-Prozesses könnte der Community helfen, gute von böswilligen Akteuren zu unterscheiden. Dies schränkt darüber hinaus die Optionen für böswillige Akteuren ein, die zukünftige Richtung von Ethereum zu beeinflussen.

##  {#pos-and-security}

Schließlich ist es von entscheidender Bedeutung, dass die Ethereum-Community offen bleibt und alle Teilnehmer willkommen heißt. Eine von Gatekeepern und Exklusivität geprägte Community ist besonders anfällig für soziale Angriffe, weil es ein Leichtes ist, ein „Wir gegen die anderen“-Narrativ zu etablieren. Tribalismus und toxischer Maximalismus schaden der Community und untergraben die Sicherheit der Layer 0. Ethereaner, die ein berechtigtes Interesse an der Sicherheit des Netzwerks haben, sollten ihr Verhalten online und in der realen Welt als direkten Beitrag zur Sicherheit der Layer 0 auf Ethereum betrachten.

-
-
-
- Eine Infiltration der Entwicklercommunity durch wissende, aber böswillige Akteure mit dem Ziel, den Fortschritt aufzuhalten, und zwar durch Diskussionen über Kleinigkeiten, das Verlangsamen von Schlüsselentscheidungen, Spam usw.

##  {#pros-and-cons}

|  |  |
|  |  |
|  |  |
|  |  |
|  |  |
|  |  |

###  {#comparison-to-proof-of-work}

In mehreren Artikeln wurden Angriffe auf Ethereum beschrieben, die Neuorganisationen oder Endgültigkeitsverzögerungen mit nur einem kleinen Teil der insgesamt eingesetzten Ether erreichten. Diese Angriffe beruhen in der Regel darauf, dass der Angreifer anderen Validatoren bestimmte Informationen vorenthält und diese dann auf eine nuancierte Art und/oder zu einem günstigen Zeitpunkt freigibt.

-
-
-
-
-
-

##  {#further-reading}

-
-
-
-
-
- []()
-
- []()

##  {#related-topics}

- []()
- []()
