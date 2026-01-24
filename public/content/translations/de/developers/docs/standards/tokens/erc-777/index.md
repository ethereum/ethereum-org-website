---
title: ERC-777 Token-Standard
description: "Erfahren Sie mehr über ERC-777, einen verbesserten fungiblen Token-Standard mit Hooks, obwohl aus Sicherheitsgründen ERC-20 empfohlen wird."
lang: de
---

## Warnung {#warning}

**ERC-777 ist aufgrund seiner [Anfälligkeit für verschiedene Angriffsformen](https://github.com/OpenZeppelin/openzeppelin-contracts/issues/2620) nur schwer korrekt zu implementieren. Es wird empfohlen, stattdessen [ERC-20](/developers/docs/standards/tokens/erc-20/) zu verwenden.** Diese Seite bleibt als historisches Archiv erhalten.

## Einführung? Einführung {#introduction}

ERC-777 ist ein fungibler Token-Standard, der den bestehenden [ERC-20](/developers/docs/standards/tokens/erc-20/)-Standard verbessert.

## Voraussetzungen {#prerequisites}

Um diese Seite besser zu verstehen, empfehlen wir Ihnen, sich zunächst über [ERC-20](/developers/docs/standards/tokens/erc-20/) zu informieren.

## Welche Verbesserungen hat ERC-777 gegenüber ERC-20? {#-erc-777-vs-erc-20}

ERC-777 bietet die folgenden Verbesserungen gegenüber ERC-20.

### Hooks {#hooks}

Haken sind eine Funktion, die im Code eines Smart Contract beschrieben wird. Haken werden aufgerufen, wenn Token über den Vertrag gesendet oder empfangen werden. Dies ermöglicht einem Smart Contract, auf eingehende oder ausgehende Token zu reagieren.

Die Hooks werden über den [ERC-1820](https://eips.ethereum.org/EIPS/eip-1820)-Standard registriert und erkannt.

#### Warum sind Haken so großartig? {#why-are-hooks-great}

1. Hooks ermöglichen es, Token an einen Vertrag zu senden und den Vertrag in einer einzigen Transaktion zu benachrichtigen, im Gegensatz zu [ERC-20](https://eips.ethereum.org/EIPS/eip-20), bei dem dafür ein doppelter Aufruf (`approve`/`transferFrom`) erforderlich ist.
2. Verträge, die keine Haken registriert haben, sind mit ERC-777 nicht kompatibel. Der sendende Vertrag bricht die Transaktion ab, wenn der empfangende Vertrag keinen Haken registriert hat. Dies verhindert versehentliche Übertragungen auf nicht-ERC-777 Smart Contracts.
3. Haken können Transaktionen ablehnen.

### Dezimalstellen {#decimals}

Der Standard löst auch die Verwirrung um `decimals`, die durch ERC-20 verursacht wurde. Diese Klarheit verbessert die Erfahrung der Entwickler.

### Abwärtskompatibilität mit ERC-20 {#backwards-compatibility-with-erc-20}

ERC-777 Verträge können wie ERC-20 Verträge gehandhabt werden.

## Weiterführende Lektüre {#further-reading}

[EIP-777: Token-Standard](https://eips.ethereum.org/EIPS/eip-777)
