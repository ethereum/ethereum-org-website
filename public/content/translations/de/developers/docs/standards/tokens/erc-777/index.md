---
title: ERC-777-Token-Standard
description: "Erfahren Sie mehr über ERC-777, einen verbesserten Standard für fungible Token mit Hooks, obwohl aus Sicherheitsgründen ERC-20 empfohlen wird."
lang: de
---

## Warnung {#warning}

**ERC-777 ist aufgrund seiner [Anfälligkeit für verschiedene Angriffsformen](https://github.com/OpenZeppelin/openzeppelin-contracts/issues/2620) schwer korrekt zu implementieren. Es wird empfohlen, stattdessen [ERC-20](/developers/docs/standards/tokens/erc-20/) zu verwenden.** Diese Seite bleibt als historisches Archiv erhalten.

## Einführung? {#introduction}

ERC-777 ist ein Standard für fungible Token, der den bestehenden [ERC-20](/developers/docs/standards/tokens/erc-20/)-Standard verbessert.

## Voraussetzungen {#prerequisites}

Um diese Seite besser zu verstehen, empfehlen wir Ihnen, zuerst über [ERC-20](/developers/docs/standards/tokens/erc-20/) zu lesen.

## Welche Verbesserungen bietet ERC-777 gegenüber ERC-20? {#-erc-777-vs-erc-20}

ERC-777 bietet die folgenden Verbesserungen gegenüber ERC-20.

### Hooks {#hooks}

Hooks sind eine Funktion, die im Code eines Smart Contracts beschrieben wird. Hooks werden aufgerufen, wenn Token über den Vertrag gesendet oder empfangen werden. Dies ermöglicht es einem Smart Contract, auf eingehende oder ausgehende Token zu reagieren.

Die Hooks werden mithilfe des [ERC-1820](https://eips.ethereum.org/EIPS/eip-1820)-Standards registriert und entdeckt.

#### Warum sind Hooks großartig? {#why-are-hooks-great}

1. Hooks ermöglichen es, Token an einen Vertrag zu senden und den Vertrag in einer einzigen Transaktion zu benachrichtigen, im Gegensatz zu [ERC-20](https://eips.ethereum.org/EIPS/eip-20), das dafür einen doppelten Aufruf (`approve`/`transferFrom`) erfordert.
2. Verträge, die keine Hooks registriert haben, sind mit ERC-777 inkompatibel. Der sendende Vertrag bricht die Transaktion ab, wenn der empfangende Vertrag keinen Hook registriert hat. Dies verhindert versehentliche Übertragungen an Nicht-ERC-777-Smart-Contracts.
3. Hooks können Transaktionen ablehnen.

### Dezimalstellen {#decimals}

Der Standard löst auch die Verwirrung um `decimals`, die in ERC-20 verursacht wurde. Diese Klarheit verbessert die Entwicklererfahrung.

### Abwärtskompatibilität mit ERC-20 {#backwards-compatibility-with-erc-20}

Mit ERC-777-Verträgen kann so interagiert werden, als wären sie ERC-20-Verträge.

## Weiterführende Literatur {#further-reading}

[EIP-777: Token-Standard](https://eips.ethereum.org/EIPS/eip-777)