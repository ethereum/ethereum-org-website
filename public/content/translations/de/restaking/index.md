---
title: Restaking
metaTitle: Was ist Restaking? | Vorteile und Nutzung von Restaking
description: "Nutze gestakte ETH, um andere dezentrale Dienste abzusichern und zusätzliche Belohnungen zu verdienen."
lang: de
template: use-cases
image: /images/use-cases/restaking.png
alt: Eine visuelle Darstellung von Restaking auf Ethereum.
sidebarDepth: 2
summaryPoints:
  - "Nutze gestakte ETH, um andere dezentrale Dienste abzusichern und zusätzliche Belohnungen zu verdienen."
buttons:
  - content: Was ist Restaking?
    toId: what-is-restaking
  - content: Wie funktioniert es?
    toId: how-does-restaking-work
    isSecondary: false
---

Das Ethereum-Netzwerk sichert rund um die Uhr an 365 Tagen im Jahr Werte in Milliardenhöhe. Wie?

Menschen auf der ganzen Welt sperren [Ether (ETH)](/what-is-ether/) in Smart Contracts ein (oder "staken" sie), um die Software auszuführen, die Ethereum-Transaktionen verarbeitet und das Ethereum-Netzwerk absichert. Im Gegenzug werden sie mit mehr ETH belohnt.

Restaking ist eine Technologie, die für [Staker](/staking/) entwickelt wurde, um diese Sicherheit auf andere Dienste, Anwendungen oder Netzwerke auszuweiten. Im Gegenzug verdienen sie zusätzliche Restaking-Belohnungen. Allerdings setzen sie ihre gestakten ETH auch einem höheren Risiko aus.

**Restaking in 18 Minuten erklärt**

<VideoWatch slug="restaking-explained" />

## Was ist Restaking? {#what-is-restaking}

Restaking bedeutet, dass Staker ihre bereits gestakten ETH verwenden, um andere dezentrale Dienste abzusichern. Im Gegenzug können Restaker von diesen anderen Diensten zusätzliche Belohnungen zu ihren regulären ETH-Staking-Belohnungen erhalten.

Die dezentralen Dienste, die durch Restaking abgesichert werden, sind als "Actively Validated Services" (AVSs) bekannt.
Genauso wie viele ETH-Staker Ethereum-Validierungssoftware ausführen, führen viele Restaker spezialisierte AVS-Software aus.

<br/>
<Alert className="justify-between">
<AlertEmoji text=":bulb:"/>
<AlertContent>
<AlertDescription>
 <p className="mt-0"><strong>Gut zu wissen</strong>
  <p className="mt-2">Während "Actively Validated Services" (AVSs) am gebräuchlichsten ist, verwenden verschiedene Restaking-Plattformen möglicherweise andere Namen für die dezentralen Dienste, die sie absichern helfen, wie "Autonomously Validated Services", "Distributed Secure Services" oder "Networks".</p>
</AlertDescription>
</AlertContent>
</Alert>

## Staking vs. Restaking {#staking-vs-restaking}

| Staking                        | Restaking                                         |
| ------------------------------ | ------------------------------------------------- |
| ETH-Belohnungen verdienen               | ETH-Belohnungen + AVS-Belohnungen verdienen                    |
| Sichert das Ethereum-Netzwerk ab   | Sichert das Ethereum-Netzwerk + AVSs ab               |
| Keine Mindestmenge an ETH                 | Keine Mindestmenge an ETH                                    |
| Niedriges Risikoniveau                 | Niedriges bis hohes Risikoniveau                            |
| Auszahlungszeit hängt von der Warteschlange ab | Auszahlungszeit hängt von der Warteschlange + Entbindungsfrist (Unbonding Period) ab |

## Warum brauchen wir Restaking? {#why-do-we-need-restaking}

Stell dir zwei Welten vor: eine mit Restaking und eine ohne.

 <TabbedSection />

In dieser Welt mit Restaking profitieren sowohl der AVS als auch der Staker davon, dass sie sich finden und Sicherheit gegen zusätzliche Belohnungen tauschen können.

<br/>

<Alert className="justify-between">
<AlertEmoji text=":bulb:"/>
<AlertContent>
<AlertDescription>
 <p className="mt-0"><strong>Zusätzlicher Vorteil von Restaking</strong>
  <p className="mt-2">AVSs können all ihre Ressourcen in den Aufbau und die Vermarktung ihrer Dienste stecken, anstatt sich von Dezentralisierung und Sicherheit ablenken zu lassen.</p>
</AlertDescription>
</AlertContent>
</Alert>

## Wie funktioniert Restaking? {#how-does-restaking-work}

Am Restaking sind mehrere Entitäten beteiligt – jede von ihnen spielt eine wichtige Rolle.

| **Begriff**                | **Beschreibung**                                                                                                                                                                                                                                                                                                                                   |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Restaking-Plattformen** | Eine Restaking-Plattform ist ein Dienst, der AVSs, ETH-Staker und Betreiber (Operators) miteinander verbindet. Sie entwickeln dezentrale Anwendungen für Staker, um ihre ETH zu restaken, sowie Marktplätze, auf denen sich Staker, AVSs und Betreiber finden können.                                                                                                                |
| **Native Restaker**    | Personen, die ihre ETH staken, indem sie ihre eigenen Ethereum-Validatoren betreiben, können ihre gestakten ETH mit einer Restaking-Plattform wie EigenLayer und anderen verbinden, um zusätzlich zu den ETH-Validator-Belohnungen Restaking-Belohnungen zu verdienen.                                                                                                                             |
| **Liquid Restaker**    | Personen, die ihre ETH über einen Drittanbieter für Liquid Staking wie Lido oder Rocket Pool staken, erhalten Liquid-Staking-Token (LSTs), die ihre gestakten ETH repräsentieren. Sie können diese LSTs restaken, um Restaking-Belohnungen zu verdienen, während ihre ursprünglichen ETH gestakt bleiben.                                                                                  |
| **Betreiber (Operators)**           | Betreiber führen die Restaking-Software der AVSs aus und übernehmen die Validierungsaufgaben, die jedes AVS erfordert. Betreiber sind in der Regel professionelle Dienstleister, die Dinge wie Betriebszeit und Leistung garantieren. Wie Nicht-Betreiber-Restaker verwenden Betreiber gestakte ETH, um AVSs abzusichern, aber Betreiber erhalten im Austausch für ihre Arbeit auch zusätzliche Belohnungen. |
| **AVSs**                | Dies sind die dezentralen Dienste – wie Preis-Orakel, Token-Bridges und Datensysteme –, die Sicherheit von Restakern erhalten und im Gegenzug Token-Belohnungen anbieten.                                                                                                                                                                              |

<br/>

<Alert className="justify-between">
<AlertEmoji text=":bulb:"/>
<AlertContent>
<AlertDescription>
 <p className="mt-0"><strong>Gut zu wissen</strong>
  <p className="mt-2">Native und Liquid Restaker delegieren ihre gestakten ETH oft an einen Betreiber, anstatt die Software zur Absicherung von AVSs selbst auszuführen.</p>
  <p className="mt-2">Auf diese Weise müssen sie sich keine Sorgen um komplizierte technische Anforderungen von AVSs machen, obwohl sie eine niedrigere Belohnungsrate als Betreiber erhalten.</p>
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
 <p className="mt-0"><strong>Achtung, falsche Bezeichnung</strong>
  <p className="mt-2">Einige Leute verwechseln "Restaking" mit der Kreditvergabe und Kreditaufnahme von LSTs in Dezentralisierten Finanzen (DeFi). Beides lässt gestakte ETH arbeiten, aber Restaking bedeutet die Absicherung von AVSs und nicht nur das Erzielen von Renditen auf LSTs.</p>
</AlertDescription>
</AlertContent>
</Alert>

## Wie viel kann ich mit Restaking verdienen? {#how-much-can-i-make-from-restaking}

Während AVSs unterschiedliche Raten anbieten, geben dir Liquid Restaking Tokens (LRTs) wie eETH eine Vorstellung davon, wie viel du verdienen kannst. Genauso wie du LSTs wie stETH für das Staking deiner ETH erhältst, kannst du LRTs wie eETH für das Restaking von stETH erhalten. Diese Token verdienen ETH-Staking- und Restaking-Belohnungen.

**Es ist wichtig, die Risiken beim Restaking anzuerkennen. Die potenziellen Belohnungen können attraktiv sein, aber sie sind nicht risikofrei.**

## Was sind die Risiken von Restaking? {#what-are-the-risks-of-restaking}

| **Risiken**                     | **Beschreibung**                                                                                                                                                |
| ----------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Strafen (oder "Slashing")** | Wie beim ETH-Staking kann der Stake von Restakern/Betreibern teilweise oder vollständig geslasht (verbrannt) werden, wenn sie offline gehen, Nachrichten zensieren oder versuchen, das Netzwerk zu korrumpieren. |
| **Zentralisierung**            | Wenn wenige Betreiber den Großteil des Restakings dominieren, könnten sie großen Einfluss auf Restaker, AVSs und sogar Restaking-Plattformen haben.                             |
| **Kettenreaktionen**           | Wenn ein Restaker geslasht wird, während er mehrere AVSs absichert, könnte dies die Sicherheit für die anderen AVSs verringern und sie anfällig machen.                             |
| **Sofortiger Zugriff auf Gelder** | Es gibt eine Wartezeit (oder "Entbindungsfrist") für das Abheben von restakten ETH, sodass du möglicherweise nicht immer sofortigen Zugriff hast.                                       |

<br/>

<Alert className="justify-between">
<AlertEmoji text=":bulb:"/>
<AlertContent>
<AlertDescription>
 <p className="mt-0"><strong>Der Ethereum-Mitbegründer schreibt…</strong>
  <p className="mt-2">
    Vitalik, der Mitbegründer von Ethereum, warnte in einem Blogbeitrag aus dem Jahr 2021 mit dem Titel <a href="https://vitalik.eth.limo/general/2023/05/21/dont_overload.html">Don't Overload Consensus</a> vor den potenziellen Risiken des Restakings.

</AlertDescription>
</AlertContent>
</Alert>

## Wie fange ich mit Restaking an? {#how-to-get-started-with-restaking}

| 🫡 Anfänger                                                    | 🤓 Fortgeschrittene Nutzer                                                                     |
| --------------------------------------------------------------- | ------------------------------------------------------------------------------------- |
| 1. Stake ETH auf Plattformen wie Lido oder Rocket Pool, um LSTs zu erhalten. | 1. Stake deine ETH als Validator auf Ethereum.                                         |
| 2. Nutze diese LSTs, um mit dem Restaking bei einem Restaking-Dienst zu beginnen.    | 2. Vergleiche Restaking-Dienste wie EigenLayer, Symbiotic und andere.                  |
|                                                                 | 3. Befolge die Anweisungen, um deinen Validator mit dem Restaking-Smart-Contract zu verbinden. |

<br/>

<Alert className="justify-between">
<AlertEmoji text=":eyes:"/>
<AlertContent>
<AlertDescription>
 <p className="mt-0"><strong>Ethereum-Staking:</strong> Wie funktioniert es?
  <ButtonLink href="/staking/">
    Mehr erfahren
  </ButtonLink>
</AlertDescription>
</AlertContent>
</Alert>

## Fortgeschritten {#advanced}

<VideoWatch slug="eigenlayer-permissionless-features" />

## Weiterführende Literatur {#further-reading}

1. [ethereum.org - ETH-Staking-Leitfaden](/staking/)
2. [Ledger Academy - Was ist Ethereum-Restaking?](https://www.ledger.com/academy/what-is-ethereum-restaking)
3. [ConsenSys - EigenLayer: Dezentrales Ethereum-Restaking-Protokoll erklärt](https://consensys.io/blog/eigenlayer-decentralized-ethereum-restaking-protocol-explained)
4. [Vitalik Buterin - Don't overload Ethereum's consensus](https://vitalik.eth.limo/general/2023/05/21/dont_overload.html)
5. [Cointelegraph - Was ist EigenLayer? Ethereums Restaking-Protokoll erklärt](https://cointelegraph.com/explained/what-is-eigenlayer-ethereums-restaking-protocol-explained)
6. [a16z crypto research - EigenLayer: Erlaubnisfreie Funktionserweiterung für Ethereum mit Sreeram Kannan](https://www.youtube.com/watch?v=-V-fG4J1N_M)
7. [Junion - EigenLayer erklärt: Was ist Restaking?](https://www.youtube.com/watch?v=5r0SooSQFJg)
8. [The Block - Restaking Data Dash](https://www.theblock.co/data/decentralized-finance/restaking)