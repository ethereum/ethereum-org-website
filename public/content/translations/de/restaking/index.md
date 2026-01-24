---
title: Restaking
metaTitle: Was ist Restaking? | Vorteile und Nutzung von Restaking
description: "Verwenden Sie gestakte ETH, um andere dezentralisierte Dienste abzusichern und zusätzliche Belohnungen zu verdienen."
lang: de
template: use-cases
emoji: ":recycle:"
image: /images/use-cases/restaking.png
alt: Eine visuelle Darstellung des Restakings auf Ethereum.
sidebarDepth: 2
summaryPoint1: "Verwenden Sie gestakte ETH, um andere dezentralisierte Dienste abzusichern und zusätzliche Belohnungen zu verdienen."
buttons:
  - content: Was ist Restaking?
    toId: what-is-restaking
  - content: Wie funktioniert das?
    toId: how-does-restaking-work
    isSecondary: false
---

Das Ethereum-Netzwerk sichert Werte in Milliardenhöhe, 24/7, 365 Tage im Jahr. Wie?

Menschen auf der ganzen Welt sperren (oder „staken“) [Ether (ETH)](/eth/) in Smart Contracts, um die Software auszuführen, die Ethereum-Transaktionen verarbeitet und das Ethereum-Netzwerk absichert. Im Gegenzug werden sie mit mehr ETH belohnt.

Restaking ist eine Technologie, die für [Staker](/staking/) entwickelt wurde, um diese Sicherheit auf andere Dienste, Anwendungen oder Netzwerke auszuweiten. Im Gegenzug verdienen sie zusätzliche Restaking-Belohnungen. Allerdings setzen sie ihre gestakten ETH auch einem größeren Risiko aus.

**Restaking in 18 Minuten erklärt**

<YouTube id="rOJo7VwPh7I" />

## Was ist Restaking? {#what-is-restaking}

Restaking ist, wenn Staker ihre bereits gestakten ETH verwenden, um andere dezentralisierte Dienste abzusichern. Im Gegenzug können Restaker zusätzlich zu ihren regulären ETH-Staking-Belohnungen zusätzliche Belohnungen von diesen anderen Diensten erhalten.

Die durch Restaking gesicherten dezentralisierten Dienste werden als „Actively Validated Services“ (AVSs) bezeichnet.
So wie viele ETH-Staker eine Ethereum-Validierungssoftware betreiben, führen viele Restaker eine spezialisierte AVS-Software aus.

<br/>
<Alert className="justify-between">
<AlertEmoji text=":bulb:"/>
<AlertContent>
<AlertDescription>
  <p className="mt-0"><strong>Gut zu wissen</strong></p>
  <p className="mt-2">Obwohl „Actively Validated Services“ (AVSs) am gebräuchlichsten ist, verwenden verschiedene Restaking-Plattformen möglicherweise andere Namen für die dezentralen Dienste, die sie absichern, wie z. B. „Autonomously Validated Services“, „Distributed Secure Services“ oder „Networks“.</p>
</AlertDescription>
</AlertContent>
</Alert>

## Staking vs. Restaking {#staking-vs-restaking}

| Staking                                        | Restaking                                                              |
| ---------------------------------------------- | ---------------------------------------------------------------------- |
| ETH-Belohnungen verdienen                      | ETH-Belohnungen + AVS-Belohnungen verdienen                            |
| Sichert das Ethereum-Netzwerk                  | Sichert das Ethereum-Netzwerk + AVSs                                   |
| Kein Mindestbetrag an ETH                      | Kein Mindestbetrag an ETH                                              |
| Geringes Risiko                                | Geringes bis hohes Risiko                                              |
| Auszahlungszeit hängt von der Warteschlange ab | Auszahlungszeit hängt von der Warteschlange und der Freigabeperiode ab |

## Warum brauchen wir Restaking? {#why-do-we-need-restaking}

Stellen Sie sich zwei Welten vor; eine mit Restaking und eine ohne.

 <TabbedSection />

In dieser Welt mit Restaking profitieren sowohl AVS als auch Staker davon, dass sie sich gegenseitig finden und Sicherheit gegen zusätzliche Belohnungen tauschen können.

<br/>

<Alert className="justify-between">
<AlertEmoji text=":bulb:"/>
<AlertContent>
<AlertDescription>
  <p className="mt-0"><strong>Zusätzlicher Vorteil von Restaking</strong></p>
  <p className="mt-2">AVSs können alle ihre Ressourcen in die Entwicklung und Vermarktung ihrer Dienste stecken, anstatt sich mit Dezentralisierung und Sicherheit ablenken zu lassen.</p>
</AlertDescription>
</AlertContent>
</Alert>

## Wie funktioniert Restaking? {#how-does-restaking-work}

Am Restaking sind mehrere Akteure beteiligt – jeder von ihnen spielt eine wichtige Rolle.

| **Begriff**               | **Beschreibung**                                                                                                                                                                                                                                                                                                                                                                                                                                |
| ------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Restaking-Plattformen** | Eine Restaking-Plattform ist ein Dienst, der AVSs, ETH-Staker und Betreiber miteinander verbindet. Sie entwickeln dezentralisierte Anwendungen für Staker, um ihre ETH zu restaken, und Marktplätze, auf denen sich Staker, AVSs und Betreiber finden können.                                                                                                                                                   |
| **Native Restaker**       | Personen, die ihre ETH staken, indem sie ihre eigenen Ethereum-Validatoren betreiben, können ihre gestakten ETH mit einer Restaking-Plattform, einschließlich EigenLayer und anderen, verbinden, um zusätzlich zu den ETH-Validator-Belohnungen Restaking-Belohnungen zu verdienen.                                                                                                                                             |
|                           |                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| **Liquid Restakers**      | Personen, die ihre ETH über einen Drittanbieter für Liquid Staking, wie Lido oder Rocket Pool, staken, erhalten Liquid Staking Tokens (LSTs), die ihre gestakten ETH repräsentieren. Sie können diese LSTs restaken, um Restaking-Belohnungen zu verdienen, während ihre ursprünglichen ETH gestaked bleiben.                                                                                |
|                           |                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| **Betreiber**             | Betreiber führen die Restaking-Software der AVSs aus und erledigen die Validierungsaufgaben, die jedes AVS erfordert. Betreiber sind in der Regel professionelle Dienstleister, die Dinge wie Betriebszeit und Leistung garantieren. Wie Restaker, die keine Betreiber sind, verwenden Betreiber gestakte ETH, um AVSs abzusichern, erhalten aber auch zusätzliche Belohnungen für ihre Arbeit. |
|                           |                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| **AVSs**                  | Dies sind die dezentralisierten Dienste – wie Preisorakel, Token-Brücken und Datensysteme –, die Sicherheit von Restakern erhalten und im Gegenzug Token-Belohnungen anbieten.                                                                                                                                                                                                                                                  |

<br/>

<Alert className="justify-between">
<AlertEmoji text=":bulb:"/>
<AlertContent>
<AlertDescription>
  <p className="mt-0"><strong>Gut zu wissen</strong></p>
  <p className="mt-2">Native und Liquid Restaker delegieren ihre gestakten ETH oft an einen Betreiber, anstatt die Software zur Absicherung von AVSs selbst auszuführen.</p>
  <p className="mt-2">Auf diese Weise müssen sie sich keine Sorgen über komplizierte technische Anforderungen von AVSs machen, obwohl sie eine niedrigere Belohnungsrate als die Betreiber erhalten.</p>
</AlertDescription>
</AlertContent>
</Alert>

## Was sind einige Beispiele für Restaking? {#what-are-some-examples-of-restaking}

Obwohl es sich um eine neuartige Idee handelt, sind einige Projekte entstanden, die die Möglichkeiten des Restakings erforschen.

<RestakingList/>

<br/>

<Alert variant="warning" className="justify-between">
<AlertEmoji text=":bulb:"/>
<AlertContent>
<AlertDescription>
  <p className="mt-0"><strong>Achtung, Fehlbezeichnung</strong></p>
  <p className="mt-2">Manche Leute verwechseln „Restaking“ mit dem Verleihen und Ausleihen von LSTs in DeFi. Bei beidem werden gestakte ETH eingesetzt, aber Restaking bedeutet, AVSs abzusichern und nicht nur Renditen auf LSTs zu erzielen.</p>
</AlertDescription>
</AlertContent>
</Alert>

## Wie viel können Sie mit Restaking verdienen? {#how-much-can-i-make-from-restaking}

Während AVSs unterschiedliche Raten bieten, geben Ihnen Liquid Restaking Tokens (LRTs) wie eETH eine Vorstellung davon, wie viel Sie verdienen können. Genauso wie Sie LSTs wie stETH für das Staken Ihrer ETH erhalten, können Sie LRTs wie eETH für das Restaken von stETH erhalten. Diese Tokens verdienen ETH-Staking- und Restaking-Belohnungen.

**Es ist wichtig, die Risiken des Restakings zu kennen. Die potenziellen Belohnungen können attraktiv sein, aber sie sind nicht risikofrei.**

## Welche Risiken birgt das Restaking? {#what-are-the-risks-of-restaking}

| **Risiken**                                      | **Beschreibung**                                                                                                                                                                                                                              |
| ------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Strafen (oder „Slashing“)** | Wie beim ETH-Staking kann der Stake von Restakern/Betreibern teilweise oder ganz geslasht (vernichtet) werden, wenn sie offline gehen, Nachrichten zensieren oder versuchen, das Netzwerk zu korrumpieren. |
| **Zentralisierung**                              | Wenn wenige Betreiber den Großteil des Restakings dominieren, könnten sie großen Einfluss auf Restaker, AVSs und sogar Restaking-Plattformen haben.                                                                           |
| **Kettenreaktionen**                             | Wenn ein Restaker beim Absichern mehrerer AVSs geslasht wird, könnte dies die Sicherheit für die anderen AVSs verringern und sie anfällig machen.                                                                             |
| **Sofortiger Zugriff auf Gelder**                | Es gibt eine Wartezeit (oder „Freigabeperiode“) für die Auszahlung von restaked ETH, sodass Sie möglicherweise nicht immer sofortigen Zugriff haben.                                                       |

<br/>

<Alert className="justify-between">
<AlertEmoji text=":bulb:"/>
<AlertContent>
<AlertDescription>
  <p className="mt-0"><strong>Der Ethereum-Mitbegründer tippt …</strong></p>
  <p className="mt-2">
    Vitalik, der Mitbegründer von Ethereum, warnte in einem Blogbeitrag aus dem Jahr 2021 mit dem Titel <a href = "https://vitalik.eth.limo/general/2023/05/21/dont_overload.html">Don't Overload Consensus.</a> vor den potenziellen Risiken des Restakings. </a>  
</p>
</AlertDescription>
</AlertContent>
</Alert>

## Wie fangen Sie mit Restaking an? {#how-to-get-started-with-restaking}

| 🫡 Anfänger                                                                                                                      | 🤓 Fortgeschrittene Benutzer                                                                                                            |
| -------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| 1. Staken Sie ETH auf Plattformen wie Lido oder Rocket Pool, um LSTs zu erhalten.         | 1. Staken Sie Ihre ETH als Validator auf Ethereum.                                               |
| 2. Verwenden Sie diese LSTs, um mit dem Restaking bei einem Restaking-Dienst zu beginnen. | 2. Vergleichen Sie Restaking-Dienste wie EigenLayer, Symbiotic und andere.                       |
|                                                                                                                                  | 3. Folgen Sie den Anweisungen, um Ihren Validator mit dem Restaking Smart Contract zu verbinden. |

<br/>

<Alert className="justify-between">
<AlertEmoji text=":eyes:"/>
<AlertContent>
<AlertDescription>
  <p className="mt-0"><strong>Ethereum-Staking:</strong> Wie funktioniert es?</p>
  <ButtonLink href="/staking/">
    Mehr erfahren
  </ButtonLink>
</AlertDescription>
</AlertContent>
</Alert>

## Erweitert {#advanced}

<YouTube id="-V-fG4J1N_M" />

## Weiterführende Lektüre {#further-reading}

1. [ethereum.org – Leitfaden zum ETH-Staking](https://ethereum.org/en/staking/)
2. [Ledger Academy – Was ist Ethereum Restaking?](https://www.ledger.com/academy/what-is-ethereum-restaking)
3. [Consensys – EigenLayer: Dezentrales Ethereum-Restaking-Protokoll erklärt](https://consensys.io/blog/eigenlayer-decentralized-ethereum-restaking-protocol-explained)
4. [Vitalik Buterin – Den Konsens von Ethereum nicht überlasten](https://vitalik.eth.limo/general/2023/05/21/dont_overload.html)
5. [Cointelegraph – Was ist EigenLayer? Das Restaking-Protokoll von Ethereum erklärt](https://cointelegraph.com/explained/what-is-eigenlayer-ethereums-restaking-protocol-explained)
6. [a16z crypto research – EigenLayer: Genehmigungsfreie Funktionserweiterung für Ethereum mit Sreeram Kannan](https://www.youtube.com/watch?v=-V-fG4J1N_M)
7. [Junion – EigenLayer erklärt: Was ist Restaking?](https://www.youtube.com/watch?v=5r0SooSQFJg)
8. [The Block – Restaking Data Dash](https://www.theblock.co/data/decentralized-finance/restaking)
