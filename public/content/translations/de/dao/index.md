---
title: Dezentrale autonome Organisationen (DAO)
description: Eine Übersicht über DAOs auf Ethereum
lang: de
template: use-cases
emoji: ":handshake:"
sidebarDepth: 2
image: /use-cases/dao-2.png
alt: Eine Repräsentation eines Abstimmungsvorschlags in einer DAO.
summaryPoint1: Communitys im Besitz ihrer Mitglieder ohne zentrale Führung.
summaryPoint2: Ein sicherer Weg, um mit Fremden im Internet zusammenzuarbeiten.
summaryPoint3: Ein sicherer Ort, um Mittel für einen bestimmten Zweck bereitzustellen.
---

## Was sind DAOs? {#what-are-daos}

Eine DAO ist eine kollektiv geführte und durch die Blockchain verwaltete Organisation, die auf eine gemeinsame Mission hinarbeitet.

DAOs ermöglichen es uns, mit Gleichgesinnten rund um den Globus zusammenzuarbeiten, ohne unser Vertrauen in das Wohlwollen einer Führungskraft setzen zu müssen, die die Fonds oder Operationen verwaltet. Es gibt keinen Geschäftsführer, der Geld nach Lust und Laune ausgeben kann, und keinen Finanzchef, der die Buchhaltung manipulieren kann. Stattdessen bestimmen in den Code eingebaute Blockchain-basierte Regeln, wie die Organisation arbeitet und wie die Mittel ausgegeben werden.

Die Finanzverwaltung ist integriert und niemand kann ohne die Zustimmung der Gruppe darauf zugreifen. Entscheidungen werden durch Vorschläge und Abstimmungen geregelt, um sicherzustellen, dass jeder in der Organisation ein Mitspracherecht hat, und alles geschieht transparent On-Chain.

## Warum brauchen wir DAOs? {#why-dao}

Ein gemeinsam mit anderen Personen ein Unternehmen zu gründen und dafür Gelder und Finanzierungsmöglichkeiten bereitzustellen, benötigt viel Vertrauen in die Menschen, mit denen Sie arbeiten. Doch es ist alles andere als leicht, jemandem zu vertrauen, den Sie nur über das Internet kennen. Mit DAOs müssen Sie anderen in der Gruppe nicht vertrauen, sondern nur dem DAO-Code, der vollständig transparent und für jeden einsehbar ist.

Das eröffnet viele neue Möglichkeiten für globale Zusammenarbeit und Koordination.

### Ein Vergleich {#dao-comparison}

| DAO                                                                                                                | Ein herkömmliches Unternehmen                                                                                               |
| ------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------- |
| In der Regel flache Strukturen und vollständig demokratisiert                                                      | In der Regel hierarchisch                                                                                                   |
| Abstimmung durch die Gruppe erforderlich, um Veränderungen zu implementieren                                       | Veränderungen können je nach Struktur durch einzelne Parteien verlangt oder durch offene Abstimmungen beschlossen werden    |
| Nach der Stimmenauszählung wird das Ergebnis wird automatisch ohne vertrauenswürdige Dritte implementiert          | Sofern Abstimmungen erlaubt sind, werden Stimmen intern gezählt und das Ergebnis muss manuell umgesetzt werden              |
| Angebotene Dienste werden automatisch auf dezentrale Weise abgewickelt (etwa die Verteilung gemeinnütziger Mittel) | Erfordert die Abwicklung durch Personen oder zentral kontrollierte automatische Abläufe, die anfällig für Manipulation sind |
| Alle Aktivitäten sind transparent und vollständig öffentlich                                                       | Aktivitäten sind normalerweise unternehmensintern, begrenzte Einsicht für die Öffentlichkeit                                |

### Beispiele für DAOs {#dao-examples}

Für ein besseres Verständnis finden Sie im Folgenden Beispiele für den Einsatz einer DAO:

- Eine Wohltätigkeitsorganisation – Sie können von jedem auf der Welt Spenden annehmen und darüber abstimmen, welche Zwecke finanziert werden sollen.
- Kollektives Eigentum – Sie können physische oder digitale Vermögenswerte erwerben und die Mitglieder können über deren Verwendung abstimmen.
- Unternehmen und Zuschüsse: Sie könnten einen Risikofonds gründen, der Investitionskapital bündelt und über zu unterstützende Unternehmen abstimmt. Das zurückgezahlte Geld könnte später unter den DAO-Mitgliedern neu verteilt werden.

## Wie funktionieren DAOs? {#how-daos-work}

Das Fundament einer DAO ist ihr Smart Contract, der das Regelwerk der Organisation festhält und die Schatzkammer verwaltet. Sobald ein Smart Contract auf Ethereum aktiv ist, können die Regeln ausschließlich per Abstimmung geändert werden. Vorgänge, die nicht durch die Regeln und Logik des Codes abgedeckt sind, schlagen fehl. Da auch die Finanzverwaltung durch den Smart Contract definiert ist, kann niemand das Geld ohne die Zustimmung der Gruppe ausgeben. Daher benötigen DAOs keine zentrale Instanz. Stattdessen trifft die Gruppe gemeinsam Entscheidungen, wobei Zahlungen bei positiver Abstimmung automatisch genehmigt werden.

Möglich wird dies durch die Manipulationssicherheit veröffentlichter Smart Contracts. Da alle Vorgänge öffentlich sind, sind unbemerkte Änderungen am Code (also den Regeln der DAO) unmöglich.

<DocLink to="/smart-contracts/">
  Mehr zu Smart Contracts
</DocLink>

## Ethereum und DAOs {#ethereum-and-daos}

Ethereum ist aus einer Reihe von Gründen die perfekte Plattform für DAOs:

- Der Ethereum-eigene Konsens ist so weit verbreitet und etabliert, dass Unternehmen dem Netzwerk vertrauen können.
- Der Code eines Smart Contracts kann nach seiner Veröffentlichung nicht mehr geändert werden, auch nicht von seinen Eigentümern. Damit kann die DAO nach den Regeln arbeiten, mit denen sie programmiert wurde.
- Smart Contracts können Geldmittel senden und empfangen. Andernfalls wäre für die Verwaltung der Geldmittel der Gruppe ein vertrauenswürdiger Vermittler erforderlich.
- Die Ethereum-Community ist bekannt dafür, dass es um Zusammenarbeit und nicht um Wettbewerb geht. Daher können sich bewährte Verfahren und Unterstützungssysteme schnell herausbilden.

## DAO-Verwaltung {#dao-governance}

Um DAOs zu verwalten, sind vorher zahlreiche Überlegungen notwendig – etwa wie Abstimmungen und Vorschläge funktionieren sollen.

### Delegation {#governance-delegation}

Die Delegation ist die DAO-Variante repräsentativer Demokratie. Tokenbesitzer delegieren Stimmen an Nutzer, die sich selbst nominieren und sich verpflichten, auf dem aktuellen Stand zu bleiben und das Protokoll zu betreuen.

#### Bekanntes Beispiel {#governance-example}

[ENS](https://claim.ens.domains/delegate-ranking) – Um sie zu vertreten, können ENS-Besitzer ihre Stimmen an engagierte Communitymitglieder delegieren.

### Automatische Transaktionsverwaltung {#governance-example}

In vielen DAOs werden Transaktionen automatisch ausgeführt, wenn eine Mehrheit der Mitglieder zustimmt.

#### Bekanntes Beispiel {#governance-example}

[Nouns](https://nouns.wtf) – Sofern die Gründer kein Veto einlegen, wird eine Transaktion in Nouns DAO automatisch ausgeführt, sofern ein Stimmquorum erreicht wird und die Mehrheit zustimmt.

### Multisig-Verwaltung {#governance-example}

Zwar können DAOs Tausende Mitglieder haben, doch die Gelder befinden sich meist in einer Wallet, auf die 5–20 aktive Communitymitglieder Zugriff haben und die in der Regel vertrauenswürdig und öffentlich bekannt sind (öffentliche Identitäten, die der Community bekannt sind). Nach einer erfolgreichen Abstimmung führen die Multisig-Unterzeichner den Community-Willen aus.

## DAO-Gesetze {#dao-laws}

Wyoming hat 1977 die LCC eingeführt, die Unternehmer schützt und ihre Haftung beschränkt. Kürzlich hat der Bundesstaat außerdem ein DAO-Gesetz verabschiedet, das den Rechtsstatus von DAOs festlegt. Aktuell verfügen (in den USA) Wyoming, Vermont und die Jungferninseln über eine Form von DAO-Gesetzen.

### Bekanntes Beispiel {#law-example}

[CityDAO](https://citydao.io) – CityDAO hat durch Wyomings DAO-Gesetz 40 Hektar Land in der Nähe des Yellowstone Nationalparks gekauft.

## DAO-Mitgliedschaft {#dao-membership}

Für die Mitgliedschaft in einer DAO gibt es verschiedene Modelle. Über die Mitgliedschaft wird festgelegt, wie Abstimmungen und andere wesentliche Bereiche der DAO funktionieren.

### Token-basierte Mitgliedschaft {#token-based-membership}

In der Regel völlig frei von Berechtigungen, je nach verwendetem Token. Meistens können diese Governance-Token an einer dezentralen Börse berechtigungsfrei gehandelt werden. Andere müssen erworben werden, durch die Bereitstellung liquider Mittel oder eine andere Form des „Arbeitsnachweises“. In jedem Fall gewährt der Besitz des Tokens Zugang zur Abstimmung.

_In der Regel werden sie zur Steuerung umfangreicher dezentraler Protokolle und/oder von Token selbst verwendet._

#### Bekanntes Beispiel {#token-example}

[MakerDAO](https://makerdao.com) – MakerDAOs Token MKR wird an zahlreichen dezentralisierten Börsen angeboten, sodass jeder Tokens und damit Stimmrechte für die zukünftige Ausrichtung von Maker kaufen kann.

### Anteilsbasierte Mitgliedschaft {#share-based-membership}

Anteilsbasierte DAOs sind stärker reglementiert, aber immer noch recht offen. Alle potenziellen Mitglieder können Anträge stellen, um der DAO beizutreten. Dafür wird meist eine Gegenleistung in Form von Tokens oder geleisteter Arbeit angeboten. Anteile stehen für direkte Stimmrechte und Eigentum. Mitglieder können jeder aussteigen und erhalten einen proportionalen Anteil an der Schatzkammer.

_Findet in der Regel Anwendung für kleinere, auf den Menschen ausgerichtete Organisationen wie Wohltätigkeitsorganisationen, Gewerkschaften und Investmentclubs. Sie können auch Protokolle und Token regeln._

#### Bekanntes Beispiel {#share-example}

[MolochDAO](http://molochdao.com/) – MolochDAO ist auf die Finanzierung von Ethereum-Projekten ausgerichtet. Gefordert wird ein Antrag auf Mitgliedschaft, damit die Gruppe beurteilen kann, ob Interessenten über das nötige Fachwissen und Kapital verfügen, um fundierte Entscheidungen über potenzielle Zuschussempfänger zu treffen. Es ist nicht möglich, den Zugang zur DAO einfach auf dem freien Markt zu kaufen.

### Reputationsbasierte Mitgliedschaft {#reputation-based-membership}

Reputation ist ein Nachweis der Teilnahme und gewährt Stimmrechte im DAO. Im Gegensatz zur token- oder anteilsbasierten Mitgliedschaft übertragen reputationsbasierte DAOs keine Vermögenswerte an Mitwirkende. Reputation kann weder gekauft, übertragen noch delegiert werden. DAO-Mitglieder können Reputation nur durch Teilnahme erwerben. On-Chain-Abstimmungen sind frei zugänglich. Jedes potenzielle Mitglied kann einen Antrag auf Beitritt zur DAO und Vergütung seiner Mitwirkung in Form von Reputation und Token stellen.

_Typischerweise für die dezentrale Entwicklung und Steuerung von Protokollen und dApps verwendet, aber auch gut geeignet für eine Vielzahl von Organisationen wie Wohltätigkeitsorganisationen, Arbeiterkollektive, Investmentclubs usw._

#### Bekanntes Beispiel {#reputation-example}

[DXdao](https://DXdao.eth.link) – DXdao ist ein globales und souveränes Kollektiv, das seit 2019 dezentralisierte Protokolle und Anwendungen entwickelt und administriert. Zur Koordinierung und Verwaltung der Geldmittel wird auf eine reputationsbasierte Administration gesetzt und ein holografischer Konsens verwendet. Somit ist es nicht möglich, sich die Entscheidungsmacht über die Organisation zu erkaufen.

## DAO – Beitritt und Gründung {#join-start-a-dao}

### Beitritt zu einer DAO {#join-a-dao}

- [DAOs der Ethereum-Community](/community/get-involved/#decentralized-autonomous-organizations-daos)
- [DAO-Liste von DAOHaus](https://app.daohaus.club/explore)
- [DAO-Liste von tally.xyz](https://www.tally.xyz)

### Gründung einer DAO {#start-a-dao}

- [Eine DAO mit DAOHaus gründen](https://app.daohaus.club/summon)
- [Starte eine Governor DAO mit Tally](https://www.tally.xyz/add-a-dao)
- [Eine von Aragon betriebene DAO gründen](https://aragon.org/product)
- [Eine Kolonie gründen](https://colony.io/)
- [Erstellen einer DAO mit dem holografischen Konsens von DAOstack](https://alchemy.daostack.io/daos/create)

## Weiterführende Informationen {#further-reading}

### DAO-Artikel {#dao-articles}

- [Was ist eine DAO?](https://aragon.org/dao) – [Aragon](https://aragon.org/)
- [Das DAO-Handbuch](https://daohandbook.xyz)
- [Haus der DAOs](https://wiki.metagame.wtf/docs/great-houses/house-of-daos) – [Metagame](https://wiki.metagame.wtf/)
- [Was ist eine DAO und wofür ist sie da?](https://daohaus.substack.com/p/-what-is-a-dao-and-what-is-it-for) – [DAOhaus](https://daohaus.club/)
- [Wie man eine DAO-basierte digitale Community gründet](https://daohaus.substack.com/p/four-and-a-half-steps-to-start-a) – [DAOhaus](https://daohaus.club/)
- [Was ist eine DAO?](https://coinmarketcap.com/alexandria/article/what-is-a-dao) – [Coinmarketcap](https://coinmarketcap.com)
- [Was ist holografischer Konsens?](https://medium.com/daostack/holographic-consensus-part-1-116a73ba1e1c) – [DAOstack](https://daostack.io/)
- [DAOs sind keine Unternehmen: Wo die Dezentralisierung in autonomen Organisationen wichtig ist von Vitalik](https://vitalik.ca/general/2022/09/20/daos.html)
- [DAOs, DACs, DAs und mehr: Ein unvollständiger Terminologie-Guide](https://blog.ethereum.org/2014/05/06/daos-dacs-das-and-more-an-incomplete-terminology-guide) - [Ethereum Blog](https://blog.ethereum.org)

### Videos {#videos}

- [Was ist eine DAO in der Kryptowirtschaft?](https://youtu.be/KHm0uUPqmVE)
- [Kann eine DAO eine Stadt bauen?](https://www.ted.com/talks/scott_fitsimones_could_a_dao_build_the_next_great_city) – [TED](https://www.ted.com/)
