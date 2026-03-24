---
title: Benennung von Smart Contracts
description: "Best Practices für die Benennung von Ethereum-Smart-Contracts mit ENS"
lang: de
---

Smart Contracts sind ein Eckpfeiler der dezentralisierten Infrastruktur von Ethereum und ermöglichen autonome Anwendungen und Protokolle. Aber auch wenn sich die Fähigkeiten von Verträgen weiterentwickeln, verlassen sich Benutzer und Entwickler immer noch auf rohe hexadezimale Adressen, um diese Verträge zu identifizieren und darauf zu verweisen.

Die Benennung von Smart Contracts mit dem [Ethereum Name Service (ENS)](https://ens.domains/) verbessert die Benutzererfahrung, indem hexadezimale Vertragsadressen eliminiert werden, und reduziert das Risiko von Angriffen wie Address-Poisoning und Spoofing-Angriffen. Dieser Leitfaden erklärt, warum die Benennung von Smart Contracts wichtig ist, wie sie implementiert werden kann und welche Tools wie [Enscribe](https://www.enscribe.xyz) verfügbar sind, um den Prozess zu vereinfachen und Entwicklern bei der Übernahme dieser Praxis zu helfen.

## Warum Smart Contracts benennen? {#why-name-contracts}

### Menschenlesbare Identifikatoren {#human-readable-identifiers}

Anstatt mit undurchsichtigen Vertragsadressen wie `0x8f8e...f9e3` zu interagieren, können Entwickler und Benutzer menschenlesbare Namen wie `v2.myapp.eth` verwenden. Dies vereinfacht die Interaktionen mit Smart Contracts.

Dies wird durch den [Ethereum Name Service](https://ens.domains/) ermöglicht, der einen dezentralisierten Namensdienst für Ethereum-Adressen bereitstellt. Dies ist analog dazu, wie der Domain Name Service (DNS) es Internetnutzern ermöglicht, auf Netzwerkadressen über einen Namen wie ethereum.org zuzugreifen, anstatt über eine IP-Adresse wie `104.18.176.152`.

### Verbesserte Sicherheit und Vertrauen {#improved-security-and-trust}

Benannte Verträge helfen, versehentliche Transaktionen an die falsche Adresse zu reduzieren. Sie helfen Benutzern auch, Verträge zu identifizieren, die an bestimmte Apps oder Marken gebunden sind. Dies fügt eine Ebene des Reputationsvertrauens hinzu, insbesondere wenn Namen an bekannte übergeordnete Domains wie `uniswap.eth` angehängt sind.

Aufgrund der Länge von 42 Zeichen einer Ethereum-Adresse ist es für Benutzer sehr schwer, kleine Änderungen in Adressen zu erkennen, bei denen ein paar Zeichen geändert wurden. Zum Beispiel würde eine Adresse wie `0x58068646C148E313CB414E85d2Fe89dDc3426870` normalerweise von benutzerorientierten Anwendungen wie Wallets auf `0x580...870` gekürzt werden. Es ist unwahrscheinlich, dass ein Benutzer eine bösartige Adresse bemerkt, bei der ein paar Zeichen verändert wurden.

Diese Art von Technik wird bei Address-Spoofing- und Poisoning-Angriffen eingesetzt, bei denen Benutzer in dem Glauben gelassen werden, dass sie mit der richtigen Adresse interagieren oder Gelder an diese senden, während die Adresse in Wirklichkeit nur der richtigen Adresse ähnelt, aber nicht dieselbe ist.

ENS-Namen für Wallets und Verträge schützen vor diesen Arten von Angriffen. Wie bei DNS-Spoofing-Angriffen können auch ENS-Spoofing-Angriffe vorkommen, jedoch ist es wahrscheinlicher, dass ein Benutzer einen Rechtschreibfehler in einem ENS-Namen bemerkt als eine kleine Änderung an einer hexadezimalen Adresse.

### Bessere UX für Wallets und Blocksuchmaschinen {#better-ux}

Wenn ein Smart Contract mit einem ENS-Namen konfiguriert wurde, ist es für Apps wie Wallets und Blocksuchmaschinen möglich, ENS-Namen für Smart Contracts anstelle von hexadezimalen Adressen anzuzeigen. Dies bietet eine erhebliche Verbesserung der Benutzererfahrung (UX) für die Benutzer.

Wenn Benutzer beispielsweise mit einer App wie Uniswap interagieren, sehen sie normalerweise, dass die App, mit der sie interagieren, auf der Website `uniswap.org` gehostet wird, aber ihnen würde eine hexadezimale Vertragsadresse präsentiert werden, wenn Uniswap seine Smart Contracts nicht mit ENS benannt hat. Wenn der Vertrag benannt ist, könnten sie stattdessen `v4.contracts.uniswap.eth` sehen, was weitaus nützlicher ist.

## Benennung bei der Bereitstellung vs. nach der Bereitstellung {#when-to-name}

Es gibt zwei Zeitpunkte, zu denen Smart Contracts benannt werden können:

- **Zum Zeitpunkt der Bereitstellung**: Zuweisung eines ENS-Namens an den Vertrag, während er bereitgestellt wird.
- **Nach der Bereitstellung**: Zuordnung einer bestehenden Vertragsadresse zu einem neuen ENS-Namen.

Beide Ansätze setzen voraus, dass man Eigentümer- oder Managerzugriff auf eine ENS-Domain hat, damit ENS-Einträge erstellt und festgelegt werden können.

## Wie die ENS-Benennung für Verträge funktioniert {#how-ens-naming-works}

ENS-Namen werden auf der Blockchain gespeichert und über ENS-Resolver in Ethereum-Adressen aufgelöst. Um einen Smart Contract zu benennen:

1. Registrieren oder kontrollieren Sie eine übergeordnete ENS-Domain (z. B. `myapp.eth`)
2. Erstellen Sie eine Subdomain (z. B. `v1.myapp.eth`)
3. Setzen Sie den `address`-Eintrag der Subdomain auf die Vertragsadresse
4. Setzen Sie den Reverse-Eintrag des Vertrags im ENS, damit der Name über seine Adresse gefunden werden kann

ENS-Namen sind hierarchisch und unterstützen unbegrenzte Unternamen. Das Festlegen dieser Einträge beinhaltet typischerweise die Interaktion mit der ENS-Registry und öffentlichen Resolver-Verträgen.

## Tools zur Benennung von Verträgen {#tools}

Es gibt zwei Ansätze zur Benennung von Smart Contracts. Entweder die Verwendung der [ENS App](https://app.ens.domains) mit einigen manuellen Schritten oder die Verwendung von [Enscribe](https://www.enscribe.xyz). Diese werden im Folgenden skizziert.

### Manuelle ENS-Einrichtung {#manual-ens-setup}

Mit der [ENS App](https://app.ens.domains/) können Entwickler manuell Unternamen erstellen und Forward-Address-Einträge festlegen. Sie können jedoch keinen primären Namen für einen Smart Contract festlegen, indem sie den Reverse-Eintrag für den Namen über die ENS-App setzen. Es müssen manuelle Schritte unternommen werden, die in den [ENS-Dokumentationen](https://docs.ens.domains/web/naming-contracts/) behandelt werden.

### Enscribe {#enscribe}

[Enscribe](https://www.enscribe.xyz) vereinfacht die Benennung von Smart Contracts mit ENS und stärkt das Vertrauen der Benutzer in Smart Contracts. Es bietet:

- **Atomare Bereitstellung und Benennung**: Weisen Sie bei der Bereitstellung eines neuen Vertrags einen ENS-Namen zu
- **Benennung nach der Bereitstellung**: Hängen Sie Namen an bereits bereitgestellte Verträge an
- **Multi-Chain-Unterstützung**: Funktioniert über Ethereum und L2-Netzwerke hinweg, in denen ENS unterstützt wird
- **Vertragsverifizierungsdaten**: Enthält Vertragsverifizierungsdaten, die aus mehreren Quellen bezogen werden, um das Vertrauen der Benutzer zu erhöhen

Enscribe unterstützt von Benutzern bereitgestellte ENS-Namen oder eigene Domains, wenn der Benutzer keinen ENS-Namen hat.

Sie können auf die [Enscribe App](https://app.enscribe.xyz) zugreifen, um mit der Benennung und Anzeige von Smart Contracts zu beginnen.

## Best Practices {#best-practices}

- **Verwenden Sie klare, versionierte Namen** wie `v1.myapp.eth`, um Vertrags-Upgrades transparent zu machen
- **Setzen Sie Reverse-Einträge**, um Verträge mit ENS-Namen zu verknüpfen, für die Sichtbarkeit in Apps wie Wallets und Blocksuchmaschinen.
- **Überwachen Sie Ablauffristen genau**, wenn Sie versehentliche Eigentümerwechsel verhindern möchten
- **Verifizieren Sie die Vertragsquelle**, damit Benutzer darauf vertrauen können, dass sich der benannte Vertrag wie erwartet verhält

## Risiken {#risks}

Die Benennung von Smart Contracts bietet erhebliche Vorteile für Benutzer von Ethereum, jedoch müssen Eigentümer von ENS-Domains hinsichtlich ihrer Verwaltung wachsam sein. Zu den bemerkenswerten Risiken gehören:

- **Ablauf**: Genau wie bei DNS-Namen sind Registrierungen von ENS-Namen von begrenzter Dauer. Daher ist es wichtig, dass Eigentümer die Ablaufdaten ihrer Domains überwachen und sie rechtzeitig vor ihrem Ablauf erneuern. Sowohl die ENS App als auch Enscribe bieten visuelle Indikatoren für Domain-Eigentümer, wenn der Ablauf bevorsteht.
- **Eigentümerwechsel**: ENS-Einträge werden als NFTs auf Ethereum dargestellt, wobei der Eigentümer einer bestimmten `.eth`-Domain das zugehörige NFT in seinem Besitz hat. Sollte also ein anderes Konto das Eigentum an diesem NFT übernehmen, kann der neue Eigentümer alle ENS-Einträge nach Belieben ändern.

Um solche Risiken zu mindern, sollte das Eigentümerkonto für die `.eth` Second-Level-Domains (2LD) über ein Mehrfachsignatur-Wallet gesichert werden, wobei Subdomains erstellt werden, um die Vertragsbenennung zu verwalten. Auf diese Weise können im Falle von versehentlichen oder böswilligen Eigentümerwechseln auf Subdomain-Ebene diese vom 2LD-Eigentümer überschrieben werden.

## Zukunft der Vertragsbenennung {#future}

Die Vertragsbenennung wird zu einer Best Practice für die Dapp-Entwicklung, ähnlich wie Domainnamen IP-Adressen im Web ersetzt haben. Da immer mehr Infrastrukturen wie Wallets, Blocksuchmaschinen und Dashboards die ENS-Auflösung für Verträge integrieren, werden benannte Verträge die Sicherheit verbessern und Fehler im gesamten Ökosystem reduzieren.

Indem Smart Contracts leichter zu erkennen und zu verstehen sind, hilft die Benennung, die Lücke zwischen Benutzern und Apps auf Ethereum zu schließen und sowohl die Sicherheit als auch die UX für Benutzer zu verbessern.

## Weiterführende Literatur {#further-reading}

- [Benennung von Smart Contracts mit ENS](https://docs.ens.domains/web/naming-contracts/)
- [Benennung von Smart Contracts mit Enscribe](https://www.enscribe.xyz/docs).