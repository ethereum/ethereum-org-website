---
title: Dezentralisierte Identität
description: Was ist eine dezentralisierte Identität und warum ist sie wichtig?
lang: de
template: use-cases
emoji: ":id:"
sidebarDepth: 2
image: ../../../../assets/eth-gif-cat.png
summaryPoint1: Traditionelle Identitätssysteme haben die Ausgabe, Wartung und Kontrolle Ihrer Identifikatoren zentralisiert.
summaryPoint2: Eine dezentralisierte Identität beseitigt die Abhängigkeit von zentralisierten Dritten.
summaryPoint3: Dank Krypto haben Benutzer jetzt die Werkzeuge, um ihre eigenen Identifikatoren und Bescheinigungen wieder auszugeben, zu halten und zu kontrollieren.
---

Identität untermauert praktisch jeden Aspekt Ihres heutigen Lebens. Die Nutzung von Online-Diensten, die Eröffnung eines Bankkontos, die Teilnahme an Wahlen, der Kauf von Immobilien, die Sicherung von Arbeit – all dies erfordert den Nachweis Ihrer Identität.

Traditionelle Identitätsmanagementsysteme verlassen sich jedoch seit langem auf zentralisierte Vermittler, die Ihre Identifikatoren und [Attestierungen](#what-are-attestations) ausstellen, halten und kontrollieren. Das bedeutet, dass Sie Ihre identitätsbezogenen Informationen nicht kontrollieren können und nicht entscheiden können, wer Zugriff auf personenbezogene Daten (PII) hat, und wie viel Zugriff diese Parteien haben.

Um diese Probleme zu lösen, haben wir dezentrale Identitätssysteme, die auf öffentlichen Blockchains wie Ethereum basieren. Eine dezentralisierte Identität erlaubt es den Menschen, ihre identitätsbezogenen Informationen zu verwalten. Durch dezentralisierte Identitätslösungen können _Sie_ Identifikatoren erschaffen und Ihre Attestierungen sowohl beanspruchen als auch über sie verfügen, ohne dabei auf zentrale Autoritäten, wie Dienstleister oder Regierungen, vertrauen zu müssen.

## Was ist Identität? {#what-is-identity}

Identität bedeutet das Selbstempfinden eines Individuums, definiert durch einzigartige Charaktereigenschaften. Identität bezieht sich auf ein _Individuum_, d. h. eine eigenständige Person. Identität könnte sich auch auf andere nicht-menschliche Entitäten, wie eine Organisation oder Behörde, beziehen.

## Was sind Identifikatoren? {#what-are-identifiers}

Ein Identifikator ist eine Information, die als Attribut einer bestimmten Identität oder von Identitäten fungiert. Beispiele für allgemeine Identifikatoren:

- Name
- Sozialversicherungsnummer/Steuernummer
- Mobiltelefonnummer
- Geburtsdatum und -ort
- Zugangsdaten für eine digitale Identifikation, z. B. E-Mail-Adressen, Benutzernamen, Avatare

Diese traditionellen Beispiele von Identifikatoren werden von zentralen Stellen herausgegeben, gehalten und kontrolliert. Sie brauchen die Erlaubnis Ihrer Regierung, um Ihren Namen zu ändern, oder die einer Social-Media-Plattform, um Ihren Benutzernamen zu ändern.

## Was ist eine Attestierung? {#what-are-attestations}

Eine Attestierung ist ein Anspruch einer Entität gegenüber einer anderen Entität. Wenn Sie in den Vereinigten Staaten leben, bestätigt der Führerschein des Fahrzeugministeriums (eine Entität), dass Sie (eine andere Entität) berechtigt sind, ein Auto zu fahren.

Attestierungen unterscheiden sich von Identifikatoren. Eine Attestierung _enthält_ Identifikatoren für den Verweis auf eine bestimmte Identität und stellt einen Anspruch gegenüber einem Attribut im Zusammenhang mit dieser Identität. Ihr Führerschein hat also Identifikatoren (Name, Geburtsdatum, Adresse), ist aber zugleich auch die Attestierung Ihres gesetzlichen Fahrrechts.

### Was sind dezentralisierte Identifikatoren? {#what-are-decentralized-identifiers}

Klassische Identifikatoren, wie beispielsweise Ihr bürgerlicher Name oder Ihre E-Mail-Adresse, sind von Dritten abhängig - von Regierungen und E-Mail-Anbietern. Dezentralisierte Identifikatoren (DIDs) sind anders - sie werden nicht von einer zentralen Stelle ausgegeben, verwaltet oder kontrolliert.

Dezentralisierte Identifikatoren werden von Individuen ausgegeben, gehalten und kontrolliert. Ein [Ethereum-Konto](/developers/docs/accounts/) ist ein Beispiel für einen dezentralisierten Identifikator. Sie haben die Möglichkeit, so viele Konten zu erstellen, wie Sie möchten, ohne dass Sie eine Erlaubnis von Dritten benötigen und ohne dass diese Konten in einem zentralen Register gespeichert werden müssen.

Dezentralisierte Identifikatoren werden auf sogenannten dezentralen Ledgern (Blockchains) oder Peer-to-Peer-Netzwerken gespeichert. Das macht DIDs [weltweit eindeutig, auflösbar mit hoher Verfügbarkeit und kryptographisch verifizierbar](https://w3c-ccg.github.io/did-primer/). Ein dezentralisierter Identifikator kann mit verschiedenen Entitäten verknüpft werden, darunter Personen, Organisationen oder staatliche Einrichtungen.

## Was ermöglicht dezentralisierte Identifikatoren? {#what-makes-decentralized-identifiers-possible}

### 1. Öffentliche Schlüssel-Infrastruktur (Public Key Infrastructure, PKI) {#public-key-infrastructure}

Öffentliche Schlüssel-Infrastruktur (PKI) ist ein Maß zur Informationssicherheit, die einen [öffentlichen Schlüssel](/glossary/#public-key) und [einen privaten Schlüssel](/glossary/#private-key) für eine Entität generiert. Öffentliche Schlüssel-Kryptografie wird in Blockchain-Netzwerken verwendet, um Benutzeridentitäten zu authentifizieren und das Eigentum an digitalen Gütern nachzuweisen.

Einige dezentralisierte Identifikatoren, wie z. B. ein Ethereum-Konto, haben öffentliche und private Schlüssel. Der öffentliche Schlüssel identifiziert den Controller des Kontos, während die privaten Schlüssel Nachrichten für dieses Konto signieren und entschlüsseln können. Die öffentliche Schlüssel-Infrastruktur stellt Beweise zur Verfügung, die zur Authentifizierung von Entitäten und zur Verhinderung von Identitätsdiebstahl und Nachahmung der Entitäten dient. Dabei werden [Kryptografische Unterschriften](https://andersbrownworth.com/blockchain/public-private-keys/) genutzt, um alle Ansprüche zu verifizieren.

### 2. Dezentralisierte Datenspeicher {#decentralized-datastores}

Eine Blockchain dient als überprüfbares Datenregister: ein offenes, dezentralisiertes Informationsarchiv, welches in keiner Weise Vertrauen benötigt. Die Existenz öffentlicher Blockchains macht es überflüssig, Identifikatoren in zentralisierten Registern zu speichern.

Wenn jemand die Gültigkeit eines dezentralen Identifikators bestätigen muss, kann er den zugehörigen öffentlichen Schlüssel in der Blockchain finden. Dies unterscheidet sich von traditionellen Identifikatoren, die eine Authentifizierung durch Dritte erfordern.

## Wie ermöglichen dezentralisierte Identifikatoren und Attestierungen dezentralisierte Identitäten? {#how-decentralized-identifiers-and-attestations-enable-decentralized-identity}

Die dezentralisierte Identität repräsentiert die Vorstellung, dass identitätsbezogene Informationen selbstkontrolliert, privat und übertragbar sein sollten. Dabei stellen dezentralisierte Identifikatoren und Attestierungen die Grundbausteine dar.

Im Zusammenhang mit dezentralisierten Identitäten sind Attestierungen (auch bekannt als [nachprüfbare Berechtigungsnachweise](https://www.w3.org/TR/vc-data-model/)) manipulationssichere, kryptografisch überprüfbare Angaben des Emittenten. Jede Attestierung oder jeder nachprüfbarer Berechtigungsnachweis einer Entität (z. B. einer Organisation) wird mit ihrer DID in Zusammenhang gebracht.

Da DIDs auf der Blockchain gespeichert sind, kann jeder die Gültigkeit einer Attestierung überprüfen, indem man die DID des Emittenten auf Ethereum überprüft. Im Grunde funktioniert die Blockchain von Ethereum wie ein globales Verzeichnis, das die Überprüfung von DIDs, die mit bestimmten Entitäten verbunden sind, ermöglicht.

Dezentralisierte Identifikatoren sind der Grund dafür, dass Attestierungen selbstkontrolliert und überprüfbar sind. Auch wenn der Emittent nicht mehr existiert, wird der Inhaber immer einen Nachweis über die Herkunft und Gültigkeit der Attestierung haben.

Dezentralisierte Identifikatoren sind auch entscheidend für den Schutz von persönlichen Daten mittels dezentralisierter Identität. Zum Beispiel, wenn eine Person einen Nachweis über eine Attestierung (z. B. Führerschein) einreicht, müssen die Verifizierenden die Gültigkeit der Informationen nicht überprüfen. Stattdessen benötigt der Verifizierende nur kryptografische Garantien über die Echtheit der Attestierung und die Identität der emittierenden Organisation, um festzustellen, ob der Nachweis gültig ist.

## Attestierungen im Zusammenhang mit einer dezentralisierten Identität {#types-of-attestations-in-decentralized-identity}

Wie Informationen zu Attestierungen gespeichert und in einem auf Ethereum basierenden Ökosystem der Identität abgerufen werden, unterscheidet sich vom traditionellen Identitätsmanagement. Hier finden Sie einen Überblick einiger Ansätze zur Ausgabe, Speicherung und der Überprüfung von Attestierungen in dezentralisierten Identitätssystemen:

### Off-Chain-Attestierungen {#off-chain-attestations}

Eine Sorge bei der On-Chain-Speicherung von Attestierungen besteht darin, dass sie möglicherweise Informationen enthalten, die Einzelpersonen privat halten möchten. Diese öffentliche Art der Ethereum-Blockchain macht sie zum Speichern solcher Attestierungen wenig attraktiv.

Die Lösung besteht darin, Attestierungen auszustellen, die von Benutzern „off-chain" in digitalen Wallets gehalten werden, aber mit der DID des Ausstellers unterschrieben werden, die „on-chain" gespeichert sind. Diese Attestierungen sind als sogenannte [JSON Web Token](https://en.wikipedia.org/wiki/JSON_Web_Token) kodiert und enthalten die digitale Signatur des Emittenten. Das ermöglicht eine einfache Überprüfung von Off-Chain-Ansprüchen.

Hier ist ein hypothetisches Szenario zur Erklärung von Off-Chain-Attestierungen:

1. Eine Universität (der Emittent) stellt eine Attestierung aus (ein digitales akademisches Zertifikat), unterzeichnet sie mit ihren Schlüsseln und gibt sie an Bob (den Identitätseigentümer) aus.

2. Bob bewirbt sich für eine Stelle und möchte seine akademischen Qualifikationen gegenüber einem Arbeitgeber nachweisen. Aus diesem Grund teilt er seine Attestierung mit Hilfe seiner mobilen Wallet. Das Unternehmen (Verifizierender) kann dann die Gültigkeit der Attestierung überprüfen, indem es die Gültigkeit der DID des Emittenten (d. h. ihres öffentlichen Schlüssels auf Ethereum) bestätigt.

### Off-Chain-Attestierungen mit dauerhaftem Zugriff {#offchain-attestations-with-persistent-access}

Bei dieser Regelung werden Attestierungen in JSON-Dateien umgewandelt und off-chain gespeichert (idealerweise mit einem [dezentralen Cloud-Speicher](/developers/docs/storage/), einer Plattform wie IPFS oder Swarm). Ein [Hash](/glossary/#hash) der JSON-Datei wird jedoch on-chain gespeichert und über eine On-Chain-Datenerfassung mit einer DID verbunden. Die dazugehörige DID könnte entweder die des Emittenten der Attestierung oder des Empfängers sein.

Dieser Ansatz macht es möglich, dass Attestierungen eine Blockchain-basierte Langlebigkeit erlangen, wobei Informationen zu Ansprüchen verschlüsselt und überprüfbar bleiben. Er erlaubt auch eine selektive Offenlegung, da der Inhaber des privaten Schlüssels die Informationen entschlüsseln kann.

### On-Chain-Attestierungen {#onchain-attestations}

On-Chain-Attestierungen werden in [Smart Contracts](/developers/docs/smart-contracts/) auf der Ethereum-Blockchain gehalten. Der Smart Contract (als Datenerfassung fungierend) ordnet eine Attestierung einem zugehörigen dezentralisierten On-Chain-Identifikator (einem öffentlichen Schlüssel) zu.

Im Folgenden zeigt ein Beispiel, wie On-Chain-Attestierungen in der Praxis funktionieren könnten:

1. Ein Unternehmen (XYZ Corp) plant, Eigentumsanteile mit einem Smart Contract zu verkaufen, möchte aber nur Käufer, die eine Hintergrundüberprüfung abgeschlossen haben.

2. XYZ Corp kann das Unternehmen Hintergrundüberprüfungen durchführen lassen, um On-Chain-Attestierungen auf Ethereum auszugeben. Mit dieser Attestierung wird bestätigt, dass eine Person die Hintergrundüberprüfung bestanden hat, ohne dass persönliche Daten freigegeben werden.

3. Durch den Verkauf von Aktien mittels Smart Contracts kann man den Datenerfassungsvertrag auf die Identität von geprüften Käufern hin untersuchen. Das macht es möglich, mit dem Smart Contract zu bestimmen, wer Aktien kaufen darf oder nicht.

### Seelengebundene Token und Identität {#soulbound}

[Seelengebundene Token](https://vitalik.ca/general/2022/01/26/soulbound.html) (nicht übertragbare NFTs) können verwendet werden, um Informationen zu sammeln, die eindeutig auf eine bestimmte Wallet zutreffen. Dies erzeugt eine einzigartige On-Chain-Identität, die an eine bestimmte Ethereum-Adresse gebunden ist, die Token enthalten könnte, welche wiederum bestimmte Leistungen (z. B. Abschluss eines bestimmten Online-Kurses oder das Bestehen eines Schwellenwertes in einem Spiel) oder eine Gemeinschaftsbeteiligung darstellen.

## Vorteile dezentralisierter Identitäten {#benefits-of-decentralized-identity}

1. Dezentralisierte Identitäten erhöhen die individuelle Kontrolle der Identifizierung von Informationen. Dezentralisierte Identifikatoren und Attestierungen können überprüft werden, ohne sich auf zentralisierte Behörden und Dienste Dritter zu verlassen.

2. Dezentralisierte Identitätslösungen benötigen kein Vertrauen. Sie stellen eine nahtlose und die Privatsphäre schützende Methode zur Überprüfung und Verwaltung von Benutzeridentitäten dar.

3. Dezentralisierte Identitäten nutzten die Blockchain-Technologie, die Vertrauen zwischen verschiedenen Parteien schafft und kryptografische Garantien bietet, um die Gültigkeit von Attestierungen nachzuweisen.

4. Dezentralisierte Identitäten machen Identitätsdaten übertragbar. Benutzer speichern Attestierungen und Identifikatoren in mobilen Wallets und können sie mit jeder Partei ihrer Wahl teilen. Dezentralisierte Identifikatoren und Attestierungen sind nicht in der Datenbank der emittierenden Organisation gesperrt.

5. Dezentralisierte Identitäten sollten gut mit den sich entwickelnden Null-Wissen-Technologien funktionieren, denn sie ermöglichen es Personen, Eigentum oder bestimmte Aktionen nachzuweisen, ohne dabei aufzudecken, was sie genau besitzen bzw. getan haben. Dies könnte sich zu einer schlagkräftigen Möglichkeit entwickeln, Vertrauen und Privatsphäre für bestimmte Anwendungen zu verbinden, wie z. B. Abstimmungsverhalten.

6. Dezentralisierte Identitäten ermöglichen es Anti-Sybil-Mechanismen, zu identifizieren, ob eine Einzelperson vorgibt, mehrere Menschen zu sein, um ein bestimmtes System auszuspielen oder zu spammen.

## Dezentralisierte Nutzungsmöglichkeiten von Identitäten {#decentralized-identity-use-cases}

Dezentralisierte Identitäten haben viele potenzielle Nutzungsmöglichkeiten:

### 1. Universale Log-Ins {#universal-dapp-logins}

Dezentralisierte Identitäten können dazu beitragen, Passwort-basierte Logins durch [dezentrale Authentifizierung](https://www.ibm.com/blogs/blockchain/2018/10/decentralized-identity-an-alternative-to-password-based-authentication/) zu ersetzen. Dienstleister können Attestierungen an Benutzer verteilen, welche in einer Ethereum-Wallet gespeichert werden. Eine Beispielattestierung wäre ein [NFT](/nft/), welcher dem Inhaber Zugriff auf eine Online-Community gewährt.

Eine [Anmeldung über Ethereum](https://login.xyz/) würde es Servern ermöglichen, das Ethereum-Konto des Benutzers zu bestätigen und die erforderliche Attestierung von seiner Account-Adresse einzuholen. Das bedeutet, dass Benutzer auf Plattformen und Websites zugreifen können, ohne sich lange Passwörter merken und das Online-Erlebnis für Benutzer verbessern zu müssen.

### 2. KYC-Authentifizierung {#kyc-authentication}

Die Nutzung vieler Online-Dienste erfordert von Einzelpersonen die Bereitstellung von Attestierungen und Berechtigungsnachweisen, wie zum Beispiel einen Führerschein oder nationalen Reisepass. Dieser Ansatz ist jedoch problematisch, da private Nutzerinformationen kompromittiert werden und Dienstleister die Echtheit der Attestierung nicht überprüfen können.

Dezentralisierte Identitäten erlauben es Unternehmen, herkömmliche [Know-Your-Customer (KYC)](https://de.wikipedia.org/wiki/Know_your_customer)-Prozesse zu überspringen und Benutzeridentitäten mittels überprüfbarer Zugangsdaten zu authentifizieren. Dies senkt die Kosten des Identitätsmanagements und verhindert die Verwendung gefälschter Dokumentationen.

### 3. Abstimmungen und Online-Communtitys {#voting-and-online-communities}

Online-Abstimmungen und Social Media sind zwei neuartige Anwendungen für dezentralisierte Identitäten. Online-Wahlsysteme sind manipulationsanfällig, insbesondere wenn böswillige Akteure falsche Identitäten zur Abstimmung erschaffen. Einzelpersonen zu bitten, On-chain-Attestierungen vorzulegen, kann die Integrität von Online-Abstimmungsverfahren verbessern.

Dezentralisierte Identitäten können dabei helfen, Online-Communitys zu schaffen, die frei von gefälschten Konten sind. Zum Beispiel müsste jeder Benutzer seine Identität mittels eines On-Chain-Identitätssystems, wie dem Ethereum Name Service, authentifizieren, womit die Gefahr durch Bots reduziert wird.

### 4. Anti-Sybil-Schutz {#sybil-protection}

Sybil-Angriffe beziehen sich auf einzelne Menschen, die das System glauben lassen wollen, sie seien mehrere Menschen, um ihren Einfluss zu erhöhen. [Zuschussgebende Anwendungen](https://gitcoin.co/grants/), die [quadratisches Abstimmen](https://www.radicalxchange.org/concepts/plural-voting/) nutzen, sind durch diese Sybil-Angriffe gefährdet, da der Wert des Zuschusses erhöht wird, wenn mehr Individuen für ihn stimmen. Dies wiederum spornt Nutzer an, ihre Beiträge auf viele Identitäten zu verteilen. Dezentralisierte Identitäten helfen, dies zu verhindern, indem sie jeden Teilnehmer beweisen lassen, dass sie wirklich menschlich sind, auch wenn dabei meist keine spezifischen privaten Informationen verlangt werden.

## Dezentrale Identitäten verwenden {#use-decentralized-identity}

Es gibt viele ehrgeizige Projekte, die Ethereum als Grundlage für dezentrale Identitätslösungen verwenden:

- **[Ethereum Name Service (ENS)](https://ens.domains/)** - _Ein dezentralisiertes Namenssystem für maschinenlesbare On-chain-Identifikatoren, wie Ethereum Wallet-Adressen, Content-Hashes und Metadaten._
- **[SpruceID](https://www.spruceid.com/)** - _Ein dezentralisiertes Identitätsprojekt, das es Benutzern erlaubt, digitale Identitäten mit Hilfe von Ethereum-Konten und ENS-Profilen zu kontrollieren, statt sich auf Dienste Dritter zu verlassen._
- **[Proof of Humanity](https://www.proofofhumanity.id)** - _Proof of Humanity (Beweis des Menschseins) ist ein auf Ethereum basierendes System zur Überprüfung der sozialen Identität._
- **[BrightID](https://www.brightid.org/)**- _Ein dezentralisiertes quelloffenes Netzwerk zur sozialen Identität, das versucht, die Identitätsüberprüfung durch die Schaffung und Analyse eines sozialen Diagramms zu reformieren._
- **[Personennachweis-Passport](https://proofofpersonhood.com/)** - _Ein dezentraler digitaler Identitätsaggregator._

## Weiterführende Informationen {#further-reading}

### Artikel {#articles}

- [Blockchain-Nutzungsfälle: Blockchain in digitaler Identität](https://consensys.net/blockchain-use-cases/digital-identity/) — _ConsenSys_>
- [Was ist Ethereum ERC725? Eigenständiges Identitätsmanagement in der Blockchain](https://cryptoslate.com/what-is-erc725-self-sovereign-identity-management-on-the-blockchain/) — _Sam-Stadt_
- [Wie die Blockchain das Problem der digitalen Identität lösen könnte](https://time.com/6142810/proof-of-humanity/)— _Andrew R. Chow_
- [Was sind dezentralisierte Identitäten und warum sollten sie Sie interessieren?](https://web3.hashnode.com/what-is-decentralized-identity) — _Emmanuel Awosika_

### Videos {#videos}

- [Dezentralisierte Identität (Bonus Livestream Session)](https://www.youtube.com/watch?v=ySHNB1za_SE&t=539s) — _Ein großartiges Erklärungsvideo über dezentrale Identität von Andreas Antonopolous_
- [Anmelden mit Ethereum und dezentralisierter Identität mit Ceramic, IDX, React, und 3ID Connect](https://www.youtube.com/watch?v=t9gWZYJxk7c) — _YouTube-Tutorial zum Aufbau eines Identitätsmanagementsystems zum Erstellen, Lesen und Aktualisieren des Profils von Benutzern mit ihrer Ethereum-Wallet von Nader Dabit_
- [BrightID - Dezentralisierte Identität auf Ethereum](https://www.youtube.com/watch?v=D3DbMFYGRoM) — _Podcast Bankless Episode über BrightID, eine dezentrale Identitätslösung für Ethereum_
- [Das Off-Chain-Internet: Dezentralisierte Identität & Überprüfbare Berechtigungsnachweise](https://www.youtube.com/watch?v=EZ_Bb6j87mg) — EthDenver 2022 Präsentation von Evin McMullen

### Communities {#communities}

- [ERC-725 Allianz auf GitHub](https://github.com/erc725alliance) — _Unterstützer des ERC725-Standards zur Identitätsverwaltung in der Ethereum-Blockchain_
- [SpruceID Discord Server](https://discord.com/invite/Sf9tSFzrnt) — _Community für Enthusiasten und Entwickler, die am Anmelden mit Ethereum arbeiten_
- [Veramo Labs](https://discord.gg/sYBUXpACh4) — _Eine Community von Entwicklern, die zum Aufbau eines Rahmens für überprüfbare Daten für Anwendungen beitragen_
