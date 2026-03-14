---
title: Benennung von Smart Contracts
description: "Bewährte Praktiken für die Benennung von Ethereum Smart Contracts mit ENS"
lang: de
---

Smart Contracts sind ein Grundpfeiler der dezentralen Infrastruktur von Ethereum und ermöglichen autonome Anwendungen und Protokolle. Doch auch wenn sich die Vertragsfähigkeiten weiterentwickeln, verlassen sich Benutzer und Entwickler immer noch auf hexadezimale Adressen, um diese Verträge zu identifizieren und auf sie zu verweisen.

Die Benennung von Smart Contracts mit dem [Ethereum Name Service (ENS)](https://ens.domains/) verbessert die Benutzererfahrung, indem hexadezimale Vertragsadressen überflüssig werden, und reduziert das Risiko von Angriffen wie Address-Poisoning- und Spoofing-Angriffen. Dieser Leitfaden erklärt, warum die Benennung von Smart Contracts wichtig ist, wie sie umgesetzt werden kann und welche Tools wie [Enscribe](https://www.enscribe.xyz) zur Verfügung stehen, um den Prozess zu vereinfachen und Entwicklern bei der Übernahme dieser Praxis zu helfen.

## Warum Smart Contracts benennen? {#why-name-contracts}

### Menschenlesbare Bezeichner {#human-readable-identifiers}

Anstatt mit undurchsichtigen Vertragsadressen wie `0x8f8e...f9e3` zu interagieren, können Entwickler und Benutzer menschenlesbare Namen wie `v2.myapp.eth` verwenden. Dies vereinfacht die Interaktionen mit Smart Contracts.

Dies wird durch den [Ethereum Name Service](https://ens.domains/) ermöglicht, der einen dezentralen Benennungsdienst für Ethereum-Adressen bereitstellt. Dies ist analog dazu, wie der Domain Name Service (DNS) es Internetnutzern ermöglicht, auf Netzwerkadressen zuzugreifen, indem sie einen Namen wie ethereum.org anstelle einer IP-Adresse wie `104.18.176.152` verwenden.

### Verbesserte Sicherheit und Vertrauen {#improved-security-and-trust}

Benannte Verträge helfen, versehentliche Transaktionen an die falsche Adresse zu reduzieren. Sie helfen Benutzern auch dabei, Verträge zu identifizieren, die mit bestimmten Apps oder Marken verbunden sind. Dies schafft zusätzliches Vertrauen durch Reputation, insbesondere wenn Namen mit bekannten übergeordneten Domains wie `uniswap.eth` verknüpft sind.

Aufgrund der Länge von 42 Zeichen einer Ethereum-Adresse ist es für Benutzer sehr schwierig, kleine Änderungen in Adressen zu erkennen, bei denen ein paar Zeichen geändert wurden. Beispielsweise würde eine Adresse wie `0x58068646C148E313CB414E85d2Fe89dDc3426870` von benutzerorientierten Anwendungen wie Wallets normalerweise auf `0x580...870` gekürzt. Es ist unwahrscheinlich, dass ein Benutzer eine bösartige Adresse bemerkt, bei der ein paar Zeichen geändert wurden.

Diese Art von Technik wird bei Address-Spoofing- und -Poisoning-Angriffen eingesetzt, bei denen Benutzer dazu verleitet werden zu glauben, dass sie mit der richtigen Adresse interagieren oder Gelder an sie senden, obwohl die Adresse in Wirklichkeit der richtigen Adresse nur ähnelt, aber nicht dieselbe ist.

ENS-Namen für Wallets und Verträge schützen vor dieser Art von Angriffen. Ähnlich wie DNS-Spoofing-Angriffe können auch ENS-Spoofing-Angriffe durchgeführt werden, jedoch wird ein Benutzer einen Tippfehler in einem ENS-Namen eher bemerken als eine kleine Änderung an einer hexadezimalen Adresse.

### Bessere UX für Wallets und Explorer {#better-ux}

Wenn ein Smart Contract mit einem ENS-Namen konfiguriert wurde, können Apps wie Wallets und Blockchain-Explorer ENS-Namen für Smart Contracts anstelle von hexadezimalen Adressen anzeigen. Dies stellt für die Benutzer eine erhebliche Verbesserung der Benutzererfahrung (UX) dar.

Wenn Benutzer beispielsweise mit einer App wie Uniswap interagieren, sehen sie normalerweise, dass die App, mit der sie interagieren, auf der Website `uniswap.org` gehostet wird, aber ihnen würde eine hexadezimale Vertragsadresse angezeigt, wenn Uniswap seine Smart Contracts nicht mit ENS benannt hat. Wenn der Vertrag benannt ist, könnten sie stattdessen `v4.contracts.uniswap.eth` sehen, was weitaus nützlicher ist.

## Benennung bei der Bereitstellung vs. nach der Bereitstellung {#when-to-name}

Es gibt zwei Zeitpunkte, zu denen Smart Contracts benannt werden können:

- **Zum Zeitpunkt der Bereitstellung**: Zuweisung eines ENS-Namens zum Vertrag bei dessen Bereitstellung.
- **Nach der Bereitstellung**: Zuordnung einer bestehenden Vertragsadresse zu einem neuen ENS-Namen.

Beide Ansätze setzen voraus, dass man Eigentümer- oder Managerzugriff auf eine ENS-Domain hat, um ENS-Einträge erstellen und festlegen zu können.

## Wie die ENS-Benennung für Verträge funktioniert {#how-ens-naming-works}

ENS-Namen werden on-chain gespeichert und über ENS-Resolver in Ethereum-Adressen aufgelöst. Um einen Smart Contract zu benennen:

1. Registrieren oder kontrollieren Sie eine übergeordnete ENS-Domain (z. B. `myapp.eth`)
2. Erstellen Sie eine Subdomain (z. B. `v1.myapp.eth`)
3. Setzen Sie den `address`-Eintrag der Subdomain auf die Vertragsadresse
4. Setzen Sie den Reverse Record des Vertrags auf den ENS, damit der Name über seine Adresse gefunden werden kann

ENS-Namen sind hierarchisch und unterstützen unbegrenzt viele Unternamen. Das Festlegen dieser Einträge erfordert in der Regel die Interaktion mit den Verträgen der ENS-Registry und des Public Resolvers.

## Tools zur Benennung von Verträgen {#tools}

Es gibt zwei Ansätze, um Smart Contracts zu benennen. Entweder über die [ENS App](https://app.ens.domains) mit einigen manuellen Schritten oder über [Enscribe](https://www.enscribe.xyz). Diese werden im Folgenden beschrieben.

### Manuelle ENS-Einrichtung {#manual-ens-setup}

Mit der [ENS App](https://app.ens.domains) können Entwickler manuell Unternamen erstellen und Forward-Address-Einträge festlegen. Allerdings können sie über die ENS-App keinen primären Namen für einen Smart Contract festlegen, indem sie den Reverse Record für den Namen setzen. Es müssen manuelle Schritte unternommen werden, die in den [ENS-Dokumenten](https://docs.ens.domains/web/naming-contracts/) behandelt werden.

### Enscribe {#enscribe}

[Enscribe](https://www.enscribe.xyz) vereinfacht die Benennung von Smart Contracts mit ENS und stärkt das Vertrauen der Benutzer in Smart Contracts. Es bietet:

- **Atomare Bereitstellung und Benennung**: Zuweisung eines ENS-Namens bei der Bereitstellung eines neuen Vertrags
- **Benennung nach der Bereitstellung**: Verknüpfung von Namen mit bereits bereitgestellten Verträgen
- **Multi-Chain-Unterstützung**: Funktioniert auf Ethereum- und L2-Netzwerken, auf denen ENS unterstützt wird
- **Vertragsverifizierungsdaten**: Beinhaltet Vertragsverifizierungsdaten aus mehreren Quellen, um das Vertrauen der Benutzer zu erhöhen

Enscribe unterstützt von Benutzern bereitgestellte ENS-Namen oder seine eigenen Domains, falls der Benutzer keinen ENS-Namen besitzt.

Sie können auf die [Enscribe App](https://app.enscribe.xyz) zugreifen, um mit der Benennung und Anzeige von Smart Contracts zu beginnen.

## Bewährte Praktiken {#best-practices}

- **Verwenden Sie klare, versionierte Namen** wie `v1.myapp.eth`, um Vertrags-Upgrades transparent zu machen
- **Legen Sie Reverse Records fest**, um Verträge mit ENS-Namen zu verknüpfen und die Sichtbarkeit in Apps wie Wallets und Blockchain-Explorern zu gewährleisten.
- **Überwachen Sie die Ablaufdaten genau**, um unbeabsichtigte Eigentümerwechsel zu verhindern
- **Überprüfen Sie die Vertragsquelle**, damit Benutzer darauf vertrauen können, dass sich der benannte Vertrag wie erwartet verhält

## Risiken {#risks}

Die Benennung von Smart Contracts bietet erhebliche Vorteile für die Benutzer von Ethereum, jedoch müssen die Eigentümer von ENS-Domains bei deren Verwaltung wachsam sein. Zu den nennenswerten Risiken gehören:

- **Ablauf**: Genau wie bei DNS-Namen haben auch ENS-Namensregistrierungen eine begrenzte Dauer. Daher ist es von entscheidender Bedeutung, dass die Eigentümer die Ablaufdaten ihrer Domains überwachen und sie rechtzeitig vor Ablauf erneuern. Sowohl die ENS App als auch Enscribe bieten Domain-Eigentümern visuelle Hinweise, wenn ein Ablaufdatum bevorsteht.
- **Eigentümerwechsel**: ENS-Einträge werden als NFTs auf Ethereum abgebildet, wobei der Eigentümer einer bestimmten `.eth`-Domain den zugehörigen NFT in seinem Besitz hat. Sollte also ein anderes Konto das Eigentum an diesem NFT übernehmen, kann der neue Eigentümer alle ENS-Einträge nach Belieben ändern.

Um solche Risiken zu mindern, sollte das Eigentümerkonto für die `.eth` Second-Level-Domains (2LD) durch eine Multi-Sig-Wallet gesichert werden, wobei Subdomains zur Verwaltung der Vertragsbenennung erstellt werden. Auf diese Weise können im Falle von unbeabsichtigten oder bösartigen Eigentümerwechseln auf Subdomain-Ebene diese vom 2LD-Eigentümer überschrieben werden.

## Zukunft der Vertragsbenennung {#future}

Die Vertragsbenennung wird zu einer bewährten Praxis für die Dapp-Entwicklung, ähnlich wie Domainnamen IP-Adressen im Web ersetzt haben. Da immer mehr Infrastrukturen wie Wallets, Explorer und Dashboards die ENS-Auflösung für Verträge integrieren, werden benannte Verträge die Sicherheit verbessern und Fehler im gesamten Ökosystem reduzieren.

Indem Smart Contracts leichter zu erkennen und nachzuvollziehen sind, hilft die Benennung, die Lücke zwischen Benutzern und Apps auf Ethereum zu schließen, wodurch sowohl die Sicherheit als auch die UX für die Benutzer verbessert werden.

## Weiterführende Lektüre {#further-reading}

- [Benennung von Smart Contracts mit ENS](https://docs.ens.domains/web/naming-contracts/)
- [Benennung von Smart Contracts mit Enscribe](https://www.enscribe.xyz/docs).
