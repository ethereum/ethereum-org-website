---
title: Was ist eine DAO?
metaTitle: Was ist eine DAO? | Dezentrale Autonome Organisation
description: "Ein Überblick über DAOs auf Ethereum"
lang: de
template: use-cases
sidebarDepth: 2
image: /images/use-cases/dao-2.png
alt: "Eine Darstellung einer DAO, die über einen Vorschlag abstimmt."
summaryPoints:
  - "Gemeinschaften im Besitz der Mitglieder ohne zentrale Führung."
  - "Ein sicherer Weg, um mit Fremden im Internet zusammenzuarbeiten."
  - "Ein sicherer Ort, um Gelder für einen bestimmten Zweck bereitzustellen."
---

## Was sind DAOs? {#what-are-daos}

Eine DAO ist eine Organisation in kollektivem Besitz, die auf eine gemeinsame Mission hinarbeitet.

DAOs ermöglichen es uns, mit Gleichgesinnten auf der ganzen Welt zusammenzuarbeiten, ohne einem wohlwollenden Anführer vertrauen zu müssen, der die Gelder oder den Betrieb verwaltet. Es gibt keinen CEO, der nach Lust und Laune Gelder ausgeben kann, oder einen CFO, der die Bücher manipulieren kann. Stattdessen definieren Blockchain-basierte Regeln, die im Code verankert sind, wie die Organisation funktioniert und wie Gelder ausgegeben werden.

Sie verfügen über integrierte Schatzkammern, auf die niemand ohne die Zustimmung der Gruppe zugreifen darf. Entscheidungen werden durch Vorschläge und Abstimmungen geregelt, um sicherzustellen, dass jeder in der Organisation eine Stimme hat, und alles geschieht transparent [Onchain](/glossary/#onchain).

## Warum brauchen wir DAOs? {#why-dao}

Die Gründung einer Organisation mit jemandem, bei der es um Finanzierung und Geld geht, erfordert viel Vertrauen in die Personen, mit denen man zusammenarbeitet. Aber es ist schwer, jemandem zu vertrauen, mit dem man bisher nur im Internet interagiert hat. Bei DAOs muss man niemandem in der Gruppe vertrauen, sondern nur dem Code der DAO, der zu 100 % transparent und für jeden überprüfbar ist.

Dies eröffnet so viele neue Möglichkeiten für die globale Zusammenarbeit und Koordination.

### Ein Vergleich {#dao-comparison}

| DAO                                                                                                                     | Eine traditionelle Organisation                                                                       |
| ----------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------ |
| Meist flach und vollständig demokratisiert.                                                                                   | Meist hierarchisch.                                                                            |
| Abstimmung durch die Mitglieder erforderlich, damit Änderungen umgesetzt werden.                                                           | Je nach Struktur können Änderungen von einer einzigen Partei verlangt oder eine Abstimmung angeboten werden.     |
| Stimmen werden ausgezählt und das Ergebnis automatisch ohne vertrauenswürdigen Vermittler umgesetzt.                                      | Wenn eine Abstimmung zulässig ist, werden die Stimmen intern ausgezählt und das Ergebnis der Abstimmung muss manuell umgesetzt werden. |
| Angebotene Dienste werden automatisch auf dezentrale Weise abgewickelt (z. B. die Verteilung philanthropischer Gelder). | Erfordert menschliche Handhabung oder zentral gesteuerte Automatisierung, die anfällig für Manipulationen ist.              |
| Alle Aktivitäten sind transparent und vollständig öffentlich.                                                                           | Aktivitäten sind in der Regel privat und für die Öffentlichkeit nur eingeschränkt zugänglich.                                        |

### DAO-Beispiele {#dao-examples}

Damit dies verständlicher wird, sind hier einige Beispiele, wie man eine DAO nutzen könnte:

- **Eine Wohltätigkeitsorganisation** – man könnte Spenden von jedem auf der Welt annehmen und darüber abstimmen, welche Zwecke finanziert werden sollen.
- **Kollektiver Besitz** – man könnte physische oder digitale Vermögenswerte erwerben und die Mitglieder können darüber abstimmen, wie diese genutzt werden sollen.
- **Unternehmen und Zuschüsse** – man könnte einen Risikokapitalfonds gründen, der Investitionskapital bündelt und darüber abstimmt, welche Unternehmen unterstützt werden sollen. Zurückgezahltes Geld könnte später unter den DAO-Mitgliedern neu verteilt werden.

<VideoWatch slug="dao-build-next-great-city" />

## Wie funktionieren DAOs? {#how-daos-work}

Das Rückgrat einer DAO ist ihr [Smart Contract](/glossary/#smart-contract), der die Regeln der Organisation definiert und die Schatzkammer der Gruppe verwaltet. Sobald der Vertrag auf [Ethereum](/) live ist, kann niemand die Regeln ändern, außer durch eine Abstimmung. Wenn jemand versucht, etwas zu tun, das nicht durch die Regeln und die Logik im Code abgedeckt ist, wird es fehlschlagen. Und da die Schatzkammer ebenfalls durch den Smart Contract definiert ist, bedeutet das, dass auch niemand das Geld ohne die Zustimmung der Gruppe ausgeben kann. Das bedeutet, dass DAOs keine zentrale Autorität benötigen. Stattdessen trifft die Gruppe Entscheidungen kollektiv, und Zahlungen werden automatisch autorisiert, wenn Abstimmungen erfolgreich sind.

Dies ist möglich, weil Smart Contracts manipulationssicher sind, sobald sie auf Ethereum live gehen. Man kann den Code (die Regeln der DAO) nicht einfach bearbeiten, ohne dass es jemand merkt, da alles öffentlich ist.

## Ethereum und DAOs {#ethereum-and-daos}

Ethereum ist aus mehreren Gründen die perfekte Grundlage für DAOs:

- Ethereums eigener Konsens ist dezentral und etabliert genug, damit Organisationen dem Netzwerk vertrauen können.
- Der Code eines Smart Contracts kann nach der Veröffentlichung nicht mehr geändert werden, nicht einmal von seinen Eigentümern. Dadurch kann die DAO nach den Regeln betrieben werden, mit denen sie programmiert wurde.
- Smart Contracts können Gelder senden und empfangen. Ohne dies bräuchte man einen vertrauenswürdigen Vermittler, um die Gelder der Gruppe zu verwalten.
- Die Ethereum-Community hat sich als eher kollaborativ denn als kompetitiv erwiesen, was es ermöglicht, dass Best Practices und Unterstützungssysteme schnell entstehen.

## DAO-Governance {#dao-governance}

Bei der Governance einer DAO gibt es viele Überlegungen, wie zum Beispiel die Funktionsweise von Abstimmungen und Vorschlägen.

### Delegation {#governance-delegation}

Delegation ist wie die DAO-Version der repräsentativen Demokratie. Token-Inhaber delegieren Stimmen an Nutzer, die sich selbst nominieren und sich verpflichten, das Protokoll zu verwalten und informiert zu bleiben.

#### Ein bekanntes Beispiel {#governance-example}

[ENS](https://claim.ens.domains/delegate-ranking) – ENS-Inhaber können ihre Stimmen an engagierte Community-Mitglieder delegieren, um sie zu vertreten.

### Automatische Transaktions-Governance {#governance-example-2}

In vielen DAOs werden Transaktionen automatisch ausgeführt, wenn ein Quorum der Mitglieder zustimmend abstimmt.

#### Ein bekanntes Beispiel {#governance-example-3}

[Nouns](https://nouns.wtf) – In der Nouns DAO wird eine Transaktion automatisch ausgeführt, wenn ein Quorum an Stimmen erreicht ist und eine Mehrheit zustimmt, solange die Gründer kein Veto einlegen.

### Multisig-Governance {#governance-example-4}

Während DAOs Tausende von stimmberechtigten Mitgliedern haben können, können die Gelder in einer [Wallet](/glossary/#wallet) liegen, die von 5-20 aktiven Community-Mitgliedern geteilt wird, die vertrauenswürdig und in der Regel gedoxxt sind (öffentliche Identitäten, die der Community bekannt sind). Nach einer Abstimmung führen die [Multisig](/glossary/#multisig)-Unterzeichner den Willen der Community aus.

## DAO-Gesetze {#dao-laws}

1977 erfand Wyoming die LLC, die Unternehmer schützt und ihre Haftung begrenzt. In jüngerer Zeit leisteten sie Pionierarbeit beim DAO-Gesetz, das einen rechtlichen Status für DAOs festlegt. Derzeit haben Wyoming, Vermont und die Jungferninseln DAO-Gesetze in irgendeiner Form.

### Ein bekanntes Beispiel {#law-example}

[CityDAO](https://citizen.citydao.io/) – CityDAO nutzte das DAO-Gesetz von Wyoming, um 40 Acres Land in der Nähe des Yellowstone-Nationalparks zu kaufen.

## DAO-Mitgliedschaft {#dao-membership}

Es gibt verschiedene Modelle für die DAO-Mitgliedschaft. Die Mitgliedschaft kann bestimmen, wie die Abstimmung funktioniert und andere wichtige Teile der DAO beeinflussen.

### Token-basierte Mitgliedschaft {#token-based-membership}

In der Regel vollständig [erlaubnisfrei](/glossary/#permissionless), abhängig vom verwendeten Token. Meistens können diese Governance-Token erlaubnisfrei an einer [dezentralen Börse](/glossary/#dex) gehandelt werden. Andere müssen durch die Bereitstellung von Liquidität oder einen anderen „Proof-of-Work“ verdient werden. So oder so gewährt das bloße Halten des Tokens Zugang zur Abstimmung.

_Wird typischerweise verwendet, um breite dezentrale Protokolle und/oder Token selbst zu verwalten._

#### Ein bekanntes Beispiel {#token-example}

[MakerDAO](https://makerdao.com) – Der Token MKR von MakerDAO ist auf dezentralen Börsen weit verbreitet und jeder kann sich einkaufen, um Stimmrecht über die Zukunft des Maker-Protokolls zu erhalten.

### Anteilsbasierte Mitgliedschaft {#share-based-membership}

Anteilsbasierte DAOs sind eher erlaubnispflichtig, aber immer noch recht offen. Alle potenziellen Mitglieder können einen Vorschlag einreichen, um der DAO beizutreten, wobei sie in der Regel einen Tribut von gewissem Wert in Form von Token oder Arbeit anbieten. Anteile repräsentieren direkte Stimmrechte und Eigentum. Mitglieder können jederzeit mit ihrem proportionalen Anteil an der Schatzkammer austreten.

_Wird typischerweise für enger verbundene, menschenzentrierte Organisationen wie Wohltätigkeitsorganisationen, Arbeiterkollektive und Investmentclubs verwendet. Kann auch Protokolle und Token verwalten._

### Reputationsbasierte Mitgliedschaft {#reputation-based-membership}

Reputation stellt einen Teilnahmenachweis dar und gewährt Stimmrecht in der DAO. Im Gegensatz zur Token- oder anteilsbasierten Mitgliedschaft übertragen reputationsbasierte DAOs kein Eigentum an die Mitwirkenden. Reputation kann nicht gekauft, transferiert oder delegiert werden; DAO-Mitglieder müssen sich Reputation durch Teilnahme verdienen. Onchain-Abstimmungen sind erlaubnisfrei und potenzielle Mitglieder können frei Vorschläge einreichen, um der DAO beizutreten und als Belohnung für ihre Beiträge Reputation und Token zu fordern.

_Wird typischerweise für die dezentrale Entwicklung und Governance von Protokollen und [dezentralen Anwendungen (Dapps)](/glossary/#dapp) verwendet, eignet sich aber auch gut für eine Vielzahl von Organisationen wie Wohltätigkeitsorganisationen, Arbeiterkollektive, Investmentclubs usw._

#### Ein bekanntes Beispiel {#reputation-example}

[DXdao](https://DXdao.eth.limo) – DXdao war ein globales souveränes Kollektiv, das seit 2019 dezentrale Protokolle und Anwendungen aufbaute und verwaltete. Es nutzte reputationsbasierte Governance und [Holografischen Konsens](/glossary/#holographic-consensus), um Gelder zu koordinieren und zu verwalten, was bedeutete, dass sich niemand Einfluss auf seine Zukunft oder Governance erkaufen konnte.

## Einer DAO beitreten / eine DAO gründen {#join-start-a-dao}

### Einer DAO beitreten {#join-a-dao}

- [Ethereum-Community-DAOs](/community/get-involved/#decentralized-autonomous-organizations-daos)
- [DAO-Liste von DAOHaus](https://app.daohaus.club/explore)
- [DAO-Liste von Tally.xyz](https://www.tally.xyz/explore)
- [DAO-Liste von DeGov.AI](https://apps.degov.ai/)

### Eine DAO gründen {#start-a-dao}

- [Eine DAO mit DAOHaus gründen](https://app.daohaus.club/summon)
- [Eine Governor-DAO mit Tally gründen](https://www.tally.xyz/get-started)
- [Eine Aragon-basierte DAO erstellen](https://aragon.org/product)
- [Eine Colony gründen](https://colony.io/)
- [Eine DAO mit dem DeGov Launcher starten](https://docs.degov.ai/integration/deploy)
## Weiterführende Literatur {#further-reading}

### DAO-Artikel {#dao-articles}

- [Was ist eine DAO?](https://blog.aragon.org/what-is-a-dao/) – [Aragon](https://aragon.org/)
- [House of DAOs](https://wiki.metagame.wtf/docs/great-houses/house-of-daos) – [Metagame](https://wiki.metagame.wtf/)
- [Was ist eine DAO und wofür ist sie da?](https://daohaus.substack.com/p/-what-is-a-dao-and-what-is-it-for) – [DAOhaus](https://daohaus.club/)
- [Wie man eine DAO-gestützte digitale Community gründet](https://daohaus.substack.com/p/four-and-a-half-steps-to-start-a) – [DAOhaus](https://daohaus.club/)
- [Was ist eine DAO?](https://coinmarketcap.com/alexandria/article/what-is-a-dao) – [Coinmarketcap](https://coinmarketcap.com)
- [Was ist Holografischer Konsens?](https://medium.com/daostack/holographic-consensus-part-1-116a73ba1e1c) - [DAOstack](https://daostack.io/)
- [DAOs sind keine Unternehmen: Wo Dezentralisierung in autonomen Organisationen wichtig ist (von Vitalik)](https://vitalik.eth.limo/general/2022/09/20/daos.html)
- [DAOs, DACs, DAs und mehr: Ein unvollständiger Terminologie-Leitfaden](https://blog.ethereum.org/2014/05/06/daos-dacs-das-and-more-an-incomplete-terminology-guide) - [Ethereum Blog](https://blog.ethereum.org)

### Videos {#videos}

- [Was ist eine DAO im Krypto-Bereich?](https://youtu.be/KHm0uUPqmVE)
- [Kann eine DAO eine Stadt bauen?](https://www.ted.com/talks/scott_fitsimones_could_a_dao_build_the_next_great_city) – [TED](https://www.ted.com/)

<Divider />

<QuizWidget quizKey="daos" />
