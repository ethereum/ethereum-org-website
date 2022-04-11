---
title: Dezentrale autonome Organisationen (DAO)
description: Eine Übersicht über DAOs auf Ethereum
lang: de
template: use-cases
emoji: ":handshake:"
sidebar: true
sidebarDepth: 2
image: ../../../../assets/use-cases/dao-2.png
alt: Darstellung, wie eine DAO über einen Vorschlag abstimmt
summaryPoint1: Communitys im Besitz ihrer Mitglieder ohne zentrale Führung
summaryPoint2: Ein sicherer Weg um mit Fremden im Internet zusammenzuarbeiten
summaryPoint3: Ein sicherer Ort, um Mittel für einen bestimmten Zweck bereitzustellen
---

## Was sind DAOs? {#what-are-daos}

DAOs bieten einen effektiven und sicheren Weg, mit Gleichgesinnten auf der ganzen Welt zusammenzuarbeiten.

Sie können sich DAOs wie internetbasierte Unternehmen vorstellen, die sich im Besitz aller Mitglieder befinden und die kollektiv geführt werden. Die Finanzverwaltung ist integriert und niemand kann ohne die Zustmmung der Gruppe drauf zugreifen. Die Entscheidungsfindung erfolgt in Form von Vorschlägen und Abstimmungen. So ist sichergestellt, dass jeder in der Organisation eine Stimme hat.

Es gibt keine Geschäftsführer, die nach ihrem Ermessen über Gelder verfügen können, und keinen Finanzvorstand, der Bilanzen manipulieren könnte. Alles wird transparent offengelegt und das Regularium, um über geplante Ausgaben zu entscheiden, ist per Code in die DAO integriert.

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

- Eine Wohltätigkeitsorganisation: Sie können Mitgliedschaften und Spenden weltweit von allen Menschen annehmen und die Gruppe entscheidet, wie die Gelder ausgegeben werden sollen.
- Ein Freiberufler-Netzwer: Sie könnten ein Netzwerk aus Auftragnehmern schaffen, die ihr Geld für Büroräume und Softwarelizenzen zusammenlegen.
- Unternehmen und Zuschüsse: Sie könnten einen Risikofonds gründen, der Investitionskapital bündelt und über zu unterstützende Unternehmen abstimmt. Das zurückgezahlte Geld könnte später unter den DAO-Mitgliedern neu verteilt werden.

## DAO-Mitgliedschaft {#dao-membership}

Für die Mitgliedschaft in einer DAO gibt es verschiedene Modelle. Über die Mitgliedschaft wird festgelegt, wie Abstimmungen und andere wesentliche Bereiche der DAO funktionieren.

### Token-basierte Mitgliedschaft {#token-based-membership}

In der Regel völlig frei von Berechtigungen, je nach verwendetem Token. Meistens können diese Governance-Token an einer dezentralen Börse berechtigungsfrei gehandelt werden. Andere müssen erworben werden, durch die Bereitstellung liquider Mittel oder eine andere Form des „Arbeitsnachweises“. In jedem Fall gewährt der Besitz des Tokens Zugang zur Abstimmung.

_In der Regel werden sie zur Steuerung umfangreicher dezentraler Protokolle und/oder von Token selbst verwendet._

#### Bekanntes Beispiel {#token-example}

[MakerDAO](https://makerdao.com) – Der Token MKR von MakerDAO ist auf dezentralen Börsen weit verbreitet. Damit kann sich ein jeder ein Stimmrecht über die Zukunft des Maker-Protokolls erkaufen.

### Anteilbasierte Mitgliedschaft {#share-based-membership}

Anteilsbasierte DAOs sind stärker reglementiert, aber immer noch recht offen. Jedes potenzielle Mitglied kann einen Antrag auf Beitritt zur DAO stellen und bietet in der Regel eine Gegenleistung in Form von Token oder Arbeit an. Anteile stehen für direkte Stimmrechte und Eigentum. Die Mitglieder können jederzeit mit ihrem Anteil an der Kapitalbeteiligung aussteigen.

_Findet in der Regel Anwendung für kleinere, auf den Menschen ausgerichtete Organisationen wie Wohltätigkeitsorganisationen, Gewerkschaften und Investmentclubs. Sie können auch Protokolle und Token regeln._

#### Bekanntes Beispiel {#share-example}

[MolochDAO](http://molochdao.com/) – MolochDAO ist auf die Finanzierung von Ethereum-Projekten ausgerichtet. Gefordert wird ein Antrag auf Mitgliedschaft, damit die Gruppe beurteilen kann, ob Interessenten über das nötige Fachwissen und Kapital verfügen, um fundierte Entscheidungen über potenzielle Zuschussempfänger zu treffen. Es ist nicht möglich, den Zugang zur DAO einfach auf dem freien Markt zu kaufen.

## Wie funktionieren DAOs? {#how-daos-work}

Das Rückgrat einer DAO ist ihr Smart Contract. Über den Smart Contract werden die Regeln der Organisation festgelegt und die Finanzmittel der Gruppe verwaltet. Sobald ein Smart Contract auf Ethereum aktiv ist, können Regeln ausschließlich per Abstimmung geändert werden. Vorgänge, die nicht durch die Regeln und Logik des Codes abgedeckt sind, schlagen fehl. Da auch die Finanzverwaltung durch den Smart Contract definiert ist, kann auch niemand das Geld ohne die Zustimmung der Gruppe ausgeben. Daher benötigen DAOs keine zentrale Instanz. Stattdessen trifft die Gruppe gemeinsam Entscheidungen und Zahlungen werden automatisch genehmigt, wenn eine Abstimmung positiv ausfällt.

Das ist möglich, da Smart Contracts manipulationssicher sind, sobald sie auf Ethereum veröffentlicht wurden. Es ist nicht möglich, unbemerkt einfach Änderungen am Code (also den Regeln der DAOs) vorzunehmen, da alle Vorgänge öffentlich sind.

<DocLink to="/smart-contracts/">
  Mehr zu Smart Contracts
</DocLink>

## Ethereum und DAOs {#ethereum-and-daos}

Aus verschiedenen Gründen ist Ethereum die perfekte Grundlage für DAOs:

- Der Ethereum-eigene Konsens ist so weit verbreitet und etabliert, dass Unternehmen dem Netzwerk vertrauen können.
- Der Code eines Smart Contracts kann nach seiner Veröffentlichung nicht mehr geändert werden, auch nicht von seinen Eigentümern. Damit kann die DAO nach den Regeln arbeiten, mit denen sie programmiert wurde.
- Smart Contracts können Geldmittel senden und empfangen. Andernfalls wäre für die Verwaltung der Geldmittel der Gruppe ein vertrauenswürdiger Vermittler erforderlich.
- Die Ethereum-Community ist bekannt dafür, dass es um Zusammenarbeit und nicht um Wettbewerb geht. Daher können sich bewährte Verfahren und Unterstützungssysteme schnell herausbilden.

## DAO – Beitritt und Gründung {#join-start-a-dao}

### Einer DAO beitreten {#join-a-dao}

- [DAOs der Ethereum-Community](/community/get-involved/#decentralized-autonomous-organizations-daos)
- [DAO-Liste von DAOHaus](https://app.daohaus.club/explore)

### Eine DAO gründen {#start-a-dao}

- [Eine DAO mit DAOHaus gründen](https://app.daohaus.club/summon)
- [Eine von Aragon betriebene DAO gründen](https://aragon.org/product)
- [Eine Kolonie gründen](https://colony.io/)
- [Eine DAO mit DAOstack gründen](https://daostack.io/)

## Weiterführende Informationen {#further-reading}

### DAO-Artikel {#dao-articles}

- [Was ist eine DAO?](https://aragon.org/dao) – [Aragon](https://aragon.org/)
- [Haus der DAOs](https://wiki.metagame.wtf/docs/great-houses/house-of-daos) – [Metagame](https://wiki.metagame.wtf/)
- [Was ist eine DAO und wofür ist sie da?](https://daohaus.substack.com/p/-what-is-a-dao-and-what-is-it-for) – [DAOhaus](https://daohaus.club/)
- [Wie man eine DAO-basierte digitale Community gründet](https://daohaus.substack.com/p/four-and-a-half-steps-to-start-a) – [DAOhaus](https://daohaus.club/)
- [Was ist eine DAO?](https://coinmarketcap.com/alexandria/article/what-is-a-dao) – [Coinmarketcap](https://coinmarketcap.com)

### Videos {#videos}

- [Was ist eine DAO in der Kryptowirtschaft?](https://youtu.be/KHm0uUPqmVE)
