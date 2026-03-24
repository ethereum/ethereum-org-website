---
title: Restaking
metaTitle: Was ist Restaking? | Vorteile und Nutzung von Restaking
description: "Verwenden Sie gestaktes ETH, um andere dezentralisierte Dienste abzusichern und zusätzliche Belohnungen zu verdienen."
lang: de
template: use-cases
emoji: ":recycle:"
image: /images/use-cases/restaking.png
alt: Eine visuelle Darstellung von Restaking auf Ethereum.
sidebarDepth: 2
summaryPoint1: "Verwenden Sie gestaktes ETH, um andere dezentralisierte Dienste abzusichern und zusätzliche Belohnungen zu verdienen."
buttons:
  - content: Was ist Restaking?
    toId: what-is-restaking
  - content: Wie funktioniert es?
    toId: how-does-restaking-work
    isSecondary: false
---

Das Ethereum-Netzwerk sichert rund um die Uhr, 365 Tage im Jahr, Werte in Milliardenhöhe. Wie?

Menschen auf der ganzen Welt sperren [Ether (ETH)](/what-is-ether/) in Smart Contracts ein (oder „staken“ sie), um die Software auszuführen, die Ethereum-Transaktionen verarbeitet und das Ethereum-Netzwerk sichert. Im Gegenzug werden sie mit mehr ETH belohnt.

Restaking ist eine Technologie, die für [Staker](/staking/) entwickelt wurde, um diese Sicherheit auf andere Dienste, Anwendungen oder Netzwerke auszuweiten. Im Gegenzug verdienen sie zusätzliche Restaking-Belohnungen. Allerdings setzen sie ihr gestaktes ETH auch einem höheren Risiko aus.

**Restaking in 18 Minuten erklärt**

<YouTube id="rOJo7VwPh7I" />

## Was ist Restaking? {#what-is-restaking}

Restaking bedeutet, dass Staker ihr bereits gestaktes ETH verwenden, um andere dezentralisierte Dienste abzusichern. Im Gegenzug können Restaker von diesen anderen Diensten zusätzliche Belohnungen zu ihren regulären ETH-Staking-Belohnungen erhalten.

Die durch Restaking gesicherten dezentralisierten Dienste werden als „Actively Validated Services“ (AVSs) bezeichnet.
Genauso wie viele ETH-Staker Ethereum-Validierungssoftware ausführen, führen viele Restaker spezialisierte AVS-Software aus.

<br/>
<Alert className="justify-between">
<AlertEmoji text=":bulb:"/>
<AlertContent>
<AlertDescription>
  <p className="mt-0"><strong>Gut zu wissen</strong></p>
  <p className="mt-2">Während „Actively Validated Services“ (AVSs) am gebräuchlichsten ist, verwenden verschiedene Restaking-Plattformen möglicherweise andere Namen für die dezentralisierten Dienste, die sie absichern helfen, wie z. B. „Autonomously Validated Services“, „Distributed Secure Services“ oder „Networks“.</p>
</AlertDescription>
</AlertContent>
</Alert>

## Staking vs. Restaking {#staking-vs-restaking}

| Staking | Restaking |
| ------------------------------ | ------------------------------------------------- |
| ETH-Belohnungen verdienen | ETH-Belohnungen + AVS-Belohnungen verdienen |
| Sichert das Ethereum-Netzwerk | Sichert das Ethereum-Netzwerk + AVSs |
| Kein Mindest-ETH | Kein Mindest-ETH |
| Niedriges Risikoniveau | Niedriges bis hohes Risikoniveau |
| Auszahlungszeit hängt von der Warteschlange ab | Auszahlungszeit hängt von der Warteschlange + Entbindungsfrist (Unbonding Period) ab |

## Warum brauchen wir Restaking? {#why-do-we-need-restaking}

Stellen Sie sich zwei Welten vor: eine mit Restaking und eine ohne.

 <TabbedSection />

In dieser Welt mit Restaking profitieren sowohl der AVS als auch der Staker davon, dass sie sich gegenseitig finden und Sicherheit gegen zusätzliche Belohnungen eintauschen können.

<br/>

<Alert className="justify-between">
<AlertEmoji text=":bulb:"/>
<AlertContent>
<AlertDescription>
  <p className="mt-0"><strong>Zusätzlicher Vorteil von Restaking</strong></p>
  <p className="mt-2">AVSs können all ihre Ressourcen in den Aufbau und die Vermarktung ihrer Dienste stecken, anstatt sich von Dezentralisierung und Sicherheit ablenken zu lassen.</p>
</AlertDescription>
</AlertContent>
</Alert>

## Wie funktioniert Restaking? {#how-does-restaking-work}

Am Restaking sind mehrere Entitäten beteiligt – jede von ihnen spielt eine wichtige Rolle.

| **Begriff** | **Beschreibung** |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Restaking-Plattformen** | Eine Restaking-Plattform ist ein Dienst, der AVSs, ETH-Staker und Betreiber (Operators) miteinander verbindet. Sie entwickeln dezentralisierte Anwendungen für Staker, um ihr ETH zu restaken, sowie Marktplätze, auf denen Staker, AVSs und Betreiber zueinander finden können. |
| **Native Restaker** | Personen, die ihr ETH staken, indem sie ihre eigenen Ethereum-Validatoren betreiben, können ihr gestaktes ETH mit einer Restaking-Plattform, einschließlich EigenLayer und anderen, verbinden, um zusätzlich zu den ETH-Validator-Belohnungen Restaking-Belohnungen zu verdienen. |
| **Liquid Restaker** | Personen, die ihr ETH über einen Drittanbieter für Liquid Staking wie Lido oder Rocket Pool staken, erhalten Liquid Staking Tokens (LSTs), die ihr gestaktes ETH repräsentieren. Sie können diese LSTs restaken, um Restaking-Belohnungen zu verdienen, während ihr ursprüngliches ETH gestakt bleibt. |
| **Betreiber (Operators)** | Betreiber führen die Restaking-Software der AVSs aus und übernehmen die Validierungsaufgaben, die jedes AVS erfordert. Betreiber sind in der Regel professionelle Dienstleister, die Dinge wie Betriebszeit und Leistung garantieren. Wie Restaker, die keine Betreiber sind, verwenden Betreiber gestaktes ETH, um AVSs abzusichern, erhalten jedoch im Austausch für ihre Arbeit zusätzliche Belohnungen. |
| **AVSs** | Dies sind die dezentralisierten Dienste – wie Preis-Orakel, kettenübergreifende Token-Brücken und Datensysteme –, die Sicherheit von Restakern erhalten und im Gegenzug Token-Belohnungen anbieten. |

<br/>

<Alert className="justify-between">
<AlertEmoji text=":bulb:"/>
<AlertContent>
<AlertDescription>
  <p className="mt-0"><strong>Gut zu wissen</strong></p>
  <p className="mt-2">Native und Liquid Restaker delegieren ihr gestaktes ETH oft an einen Betreiber, anstatt die Software zur Absicherung von AVSs selbst auszuführen.</p>
  <p className="mt-2">Auf diese Weise müssen sie sich keine Gedanken über komplizierte technische Anforderungen von AVSs machen, erhalten jedoch eine niedrigere Belohnungsrate als Betreiber.</p>
</AlertDescription>
</AlertContent>
</Alert>

## Was sind einige Beispiele für Restaking? {#what-are-some-examples-of-restaking}

Obwohl es sich um eine neuartige Idee handelt, sind bereits einige Projekte entstanden, um die Möglichkeiten des Restakings zu erkunden.

<RestakingList/>

<br/>

<Alert variant="warning" className="justify-between">
<AlertEmoji text=":bulb:"/>
<AlertContent>
<AlertDescription>
  <p className="mt-0"><strong>Achtung, falsche Bezeichnung</strong></p>
  <p className="mt-2">Manche Leute verwechseln „Restaking“ mit dem Verleihen und Ausleihen von LSTs im DeFi-Bereich. Beides lässt gestaktes ETH arbeiten, aber Restaking bedeutet die Absicherung von AVSs und nicht nur das Erzielen von Rendite auf LSTs.</p>
</AlertDescription>
</AlertContent>
</Alert>

## Wie viel kann ich mit Restaking verdienen? {#how-much-can-i-make-from-restaking}

Während AVSs unterschiedliche Raten anbieten, geben Ihnen Liquid Restaking Tokens (LRTs) wie eETH eine Vorstellung davon, wie viel Sie verdienen können. Genauso wie Sie LSTs wie stETH für das Staking Ihres ETH erhalten, können Sie LRTs wie eETH für das Restaking von stETH erhalten. Diese Token verdienen ETH-Staking- und Restaking-Belohnungen.

**Es ist wichtig, die Risiken beim Restaking anzuerkennen. Die potenziellen Belohnungen können attraktiv sein, aber sie sind nicht risikofrei.**

## Was sind die Risiken von Restaking? {#what-are-the-risks-of-restaking}

| **Risiken** | **Beschreibung** |
| ----------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Strafen (oder „Slashing“)** | Wie beim ETH-Staking kann der Einsatz (Stake) von Restakern/Betreibern teilweise oder vollständig geslasht (verbrannt) werden, wenn sie offline gehen, Nachrichten zensieren oder versuchen, das Netzwerk zu korrumpieren. |
| **Zentralisierung** | Wenn wenige Betreiber den Großteil des Restakings dominieren, könnten sie großen Einfluss auf Restaker, AVSs und sogar Restaking-Plattformen haben. |
| **Kettenreaktionen** | Wenn ein Restaker geslasht wird, während er mehrere AVSs absichert, könnte dies die Sicherheit für die anderen AVSs verringern und sie anfällig machen. |
| **Sofortiger Zugriff auf Gelder** | Es gibt eine Wartezeit (oder „Entbindungsfrist“) für das Abheben von restaktem ETH, sodass Sie möglicherweise nicht immer sofortigen Zugriff haben. |

<br/>

<Alert className="justify-between">
<AlertEmoji text=":bulb:"/>
<AlertContent>
<AlertDescription>
  <p className="mt-0"><strong>Der Ethereum-Mitbegründer tippt…</strong></p>
  <p className="mt-2">
    Vitalik, der Mitbegründer von Ethereum, warnte in einem Blogbeitrag aus dem Jahr 2021 mit dem Titel <a href="https://vitalik.eth.limo/general/2023/05/21/dont_overload.html">Don't Overload Consensus</a> vor den potenziellen Risiken des Restakings.
  </p>
</AlertDescription>
</AlertContent>
</Alert>

## Wie fange ich mit Restaking an? {#how-to-get-started-with-restaking}

| 🫡 Anfänger | 🤓 Fortgeschrittene Benutzer |
| --------------------------------------------------------------- | ------------------------------------------------------------------------------------- |
| 1. Staken Sie ETH auf Plattformen wie Lido oder Rocket Pool, um LSTs zu erhalten. | 1. Staken Sie Ihr ETH als Validator auf Ethereum. |
| 2. Verwenden Sie diese LSTs, um mit dem Restaking bei einem Restaking-Dienst zu beginnen. | 2. Vergleichen Sie Restaking-Dienste wie EigenLayer, Symbiotic und andere. |
| | 3. Befolgen Sie die Anweisungen, um Ihren Validator mit dem Restaking-Smart-Contract zu verbinden. |

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

## Fortgeschritten {#advanced}

<YouTube id="-V-fG4J1N_M" />

## Weiterführende Literatur {#further-reading}

1. [ethereum.org - ETH-Staking-Leitfaden](/staking/)
2. [Ledger Academy - Was ist Ethereum-Restaking?](https://www.ledger.com/academy/what-is-ethereum-restaking)
3. [Consensys - EigenLayer: Dezentralisiertes Ethereum-Restaking-Protokoll erklärt](https://consensys.io/blog/eigenlayer-decentralized-ethereum-restaking-protocol-explained)
4. [Vitalik Buterin - Überlasten Sie den Ethereum-Konsens nicht](https://vitalik.eth.limo/general/2023/05/21/dont_overload.html)
5. [Cointelegraph - Was ist EigenLayer? Ethereums Restaking-Protokoll erklärt](https://cointelegraph.com/explained/what-is-eigenlayer-ethereums-restaking-protocol-explained)
6. [a16z crypto research - EigenLayer: Erlaubnisfreie Funktionserweiterung für Ethereum mit Sreeram Kannan](https://www.youtube.com/watch?v=-V-fG4J1N_M)
7. [Junion - EigenLayer erklärt: Was ist Restaking?](https://www.youtube.com/watch?v=5r0SooSQFJg)
8. [The Block - Restaking Data Dash](https://www.theblock.co/data/decentralized-finance/restaking)