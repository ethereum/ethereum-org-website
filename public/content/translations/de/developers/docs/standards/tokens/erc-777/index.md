---
title: ERC-777 Token-Standard
description:
lang: de
---

## Einführung? {#introduction}

ERC-777 ist ein fungibler Token-Standard, der den vorhandenen [ERC-20](/developers/docs/standards/tokens/erc-20/) Standard verbessert.

## Voraussetzungen {#prerequisites}

Um diese Seite besser zu verstehen, empfehlen wir Ihnen, sich zunächst über [ERC-20](/developers/docs/standards/tokens/erc-20/) zu informieren.

## Welche Verbesserungen hat ERC-777 gegenüber ERC-20? {#-erc-777-vs-erc-20}

ERC-777 bietet die folgenden Verbesserungen gegenüber ERC-20.

### Haken {#hooks}

Haken sind eine Funktion, die im Code eines Smart Contract beschrieben wird. Haken werden aufgerufen, wenn Token über den Vertrag gesendet oder empfangen werden. Dies ermöglicht einem Smart Contract, auf eingehende oder ausgehende Token zu reagieren.

Die Haken werden mit Hilfe des [ERC-1820](https://eips.ethereum.org/EIPS/eip-1820)-Standards registriert und entdeckt.

#### Warum sind Haken so großartig? {#why-are-hooks-great}

1. Hooks erlauben das Senden von Token zu einem Vertrag und die Benachrichtigung des Vertrags in einer einzigen Transaktion, im Gegensatz zu [ERC-20](https://eips.ethereum.org/EIPS/eip-20) erfordert dies einen Doppelaufruf, (`approve`/`transferFrom`) um dies zu erreichen.
2. Verträge, die keine Haken registriert haben, sind mit ERC-777 nicht kompatibel. Der sendende Vertrag bricht die Transaktion ab, wenn der empfangende Vertrag keinen Haken registriert hat. Dies verhindert versehentliche Übertragungen auf nicht-ERC-777 Smart Contracts.
3. Haken können Transaktionen ablehnen.

### Dezimalstellen {#decimals}

Der Standard löst auch die Verwirrung um `Dezimale`, die in ERC-20 verursacht wurde. Diese Klarheit verbessert die Erfahrung der Entwickler.

### Rückwärtskompatibilität mit ERC-20 {#backwards-compatibility-with-erc-20}

ERC-777 Verträge können wie ERC-20 Verträge gehandhabt werden.

## Weiterführende Informationen {#further-reading}

[EIP-777: Token-Standard](https://eips.ethereum.org/EIPS/eip-777)
