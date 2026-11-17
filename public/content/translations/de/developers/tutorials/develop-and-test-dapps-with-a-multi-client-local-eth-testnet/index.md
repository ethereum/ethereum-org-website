---
title: Wie man eine Dapp auf einem lokalen Multi-Client-Testnetz entwickelt und testet
description: "Dieser Leitfaden führt Sie zunächst durch die Instanziierung und Konfiguration eines lokalen Multi-Client-Ethereum-Testnetzes, bevor Sie das Testnetz verwenden, um eine Dapp bereitzustellen und zu testen."
author: "Tedi Mitiku"
tags:
  [
    "Clients",
    "Knoten",
    "Smart Contracts",
    "Zusammensetzbarkeit",
    "Konsensschicht",
    "Ausführungsschicht",
    "Testen",
  ]
skill: intermediate
breadcrumb: Multi-Client-Testnetz
lang: de
published: 2023-04-11
---

## Einführung {#introduction}

Dieser Leitfaden führt Sie durch den Prozess der Instanziierung eines konfigurierbaren lokalen Ethereum-Testnetzes, der Bereitstellung eines Smart Contracts darauf und der Verwendung des Testnetzes, um Tests für Ihre dezentrale Anwendung (Dapp) durchzuführen. Dieser Leitfaden richtet sich an Dapp-Entwickler, die ihre Dapps lokal mit verschiedenen Netzwerkkonfigurationen entwickeln und testen möchten, bevor sie diese in einem Live-Testnetz oder dem Mainnet bereitstellen.

In diesem Leitfaden werden Sie:

- Ein lokales Ethereum-Testnetz mit dem [`ethereum-package`](https://github.com/ethpandaops/ethereum-package) unter Verwendung von [Kurtosis](https://www.kurtosis.com/) instanziieren,
- Ihre Hardhat-Dapp-Entwicklungsumgebung mit dem lokalen Testnetz verbinden, um eine Dapp zu kompilieren, bereitzustellen und zu testen, und
- Das lokale Testnetz konfigurieren, einschließlich Parametern wie der Anzahl der Knoten und spezifischen EL/CL-Client-Paarungen, um Entwicklungs- und Test-Workflows für verschiedene Netzwerkkonfigurationen zu ermöglichen.

### Was ist Kurtosis? {#what-is-kurtosis}

[Kurtosis](https://www.kurtosis.com/) ist ein zusammensetzbares Build-System, das für die Konfiguration von Multi-Container-Testumgebungen entwickelt wurde. Es ermöglicht Entwicklern insbesondere die Erstellung reproduzierbarer Umgebungen, die eine dynamische Setup-Logik erfordern, wie z. B. Blockchain-Testnetze.

In diesem Leitfaden startet das Kurtosis-`ethereum-package`, das von [ethPandaOps](https://ethpandaops.io/) gepflegt wird, ein lokales Ethereum-Testnetz. Es unterstützt alle wichtigen Ausführungsschicht-Clients (EL-Clients), wie [`geth`](https://geth.ethereum.org/), und Konsensschicht-Clients (CL-Clients), wie [`teku`](https://consensys.io/teku), [`lighthouse`](https://lighthouse.sigmaprime.io/) und [`lodestar`](https://lodestar.chainsafe.io/). Dieses Paket dient als konfigurierbare und zusammensetzbare Alternative zu Netzwerken in Frameworks wie Hardhat Network und Anvil. Kurtosis bietet Entwicklern mehr Kontrolle und Flexibilität über die von ihnen verwendeten Testnetze, was ein Hauptgrund dafür ist, warum Ethereum-Client-Teams es zum Testen von Netzwerk-Upgrades verwenden.

## Kurtosis einrichten {#setting-up-kurtosis}

Bevor Sie fortfahren, stellen Sie sicher, dass Sie Folgendes haben:

- [Die Docker-Engine installiert und gestartet](https://docs.kurtosis.com/install/#i-install--start-docker) auf Ihrem lokalen Rechner
- [Die Kurtosis-CLI installiert](https://docs.kurtosis.com/install#ii-install-the-cli) (oder auf die neueste Version aktualisiert, falls Sie die CLI bereits installiert haben)
- [Node.js](https://nodejs.org/en) installiert (für Ihre Dapp-Umgebung)

## Ein lokales Ethereum-Testnetz instanziieren {#instantiate-testnet}

Um ein lokales Ethereum-Testnetz zu starten, führen Sie Folgendes aus:

```sh
kurtosis run --enclave local-eth-testnet github.com/ethpandaops/ethereum-package
```

Hinweis: Dieser Befehl benennt Ihr Netzwerk mit dem Flag `--enclave` als „local-eth-testnet“.

Kurtosis gibt die Schritte aus, die es intern durchführt, während es die Anweisungen interpretiert, validiert und dann ausführt. Am Ende wird eine Zusammenfassung der erstellten Enklave ausgegeben. Die Zusammenfassung enthält eine Liste von **Dateiartefakten** (files artifacts) und eine Liste von **Benutzerdiensten** (user services). In der Standardkonfiguration umfassen die Benutzerdienste einen einzelnen Knoten:

- `el-1-geth-lighthouse`, den `geth`-Ausführungsclient
- `cl-1-lighthouse-geth`, den `lighthouse`-Beacon-Knoten
- `vc-1-geth-lighthouse`, den `lighthouse`-Validator-Client

Jeder Dienst wird mit den von ihm freigegebenen Ports und dem lokalen Port aufgelistet, dem er zugeordnet ist. Zum Beispiel ist der Port `rpc` des Dienstes `el-1-geth-lighthouse` der JSON-RPC-Endpunkt, den Ihre Dapp-Tools verwenden werden. Die genauen Dienste und Portnummern werden auf Ihrem Rechner unterschiedlich sein.

Sie können diese Zusammenfassung jederzeit erneut anzeigen, indem Sie Folgendes ausführen:

```sh
kurtosis enclave inspect local-eth-testnet
```

Herzlichen Glückwunsch! Sie haben Kurtosis verwendet, um ein lokales Ethereum-Testnetz mit einem CL- (`lighthouse`) und EL-Client (`geth`) über Docker zu instanziieren.

### Rückblick {#review-instantiate-testnet}

In diesem Abschnitt haben Sie einen Befehl ausgeführt, der Kurtosis anwies, das [remote auf GitHub gehostete `ethereum-package`](https://github.com/ethpandaops/ethereum-package) zu verwenden, um ein lokales Ethereum-Testnetz innerhalb einer Kurtosis-[Enklave](https://docs.kurtosis.com/advanced-concepts/enclaves/) zu starten. Innerhalb Ihrer Enklave finden Sie sowohl „Dateiartefakte“ als auch „Benutzerdienste“.

Die [Dateiartefakte](https://docs.kurtosis.com/advanced-concepts/files-artifacts/) in Ihrer Enklave umfassen alle Daten, die generiert und verwendet wurden, um die EL- und CL-Clients zu bootstrappen, wie z. B. die Genesis-Dateien und Validator-Schlüssel. Die Genesis-Daten wurden mit dem [ethereum-genesis-generator](https://github.com/ethpandaops/ethereum-genesis-generator) erstellt.

Benutzerdienste zeigen alle containerisierten Dienste an, die in Ihrer Enklave ausgeführt werden. Sie werden feststellen, dass ein einzelner Knoten erstellt wurde, der sowohl einen EL-Client als auch einen CL-Client enthält.

## Verbinden Sie Ihre Dapp-Entwicklungsumgebung mit dem lokalen Ethereum-Testnetz {#connect-your-dapp}

### Einrichten der Dapp-Entwicklungsumgebung {#set-up-dapp-env}

Da Sie nun ein laufendes lokales Testnetz haben, können Sie Ihre Dapp-Entwicklungsumgebung so verbinden, dass sie Ihr lokales Testnetz verwendet. Das Hardhat-Framework wird in diesem Leitfaden verwendet, um eine Blackjack-Dapp in Ihrem lokalen Testnetz bereitzustellen.

Um Ihre Dapp-Entwicklungsumgebung einzurichten, klonen Sie das Repository, das unsere Beispiel-Dapp enthält, und installieren Sie deren Abhängigkeiten, indem Sie Folgendes ausführen:

```sh
git clone https://github.com/kurtosis-tech/awesome-kurtosis.git
cd awesome-kurtosis/smart-contract-example
npm install --legacy-peer-deps
```

Das Flag `--legacy-peer-deps` wird benötigt, da einige der Hardhat-Plugins des Beispielprojekts widersprüchliche Peer-Abhängigkeitsversionen deklarieren.

Der hier verwendete Ordner [smart-contract-example](https://github.com/kurtosis-tech/awesome-kurtosis/tree/main/smart-contract-example) enthält das typische Setup für einen Dapp-Entwickler, der das [Hardhat](https://hardhat.org/)-Framework verwendet:

- [`contracts/`](https://github.com/kurtosis-tech/awesome-kurtosis/tree/main/smart-contract-example/contracts) enthält einige einfache Smart Contracts für eine Blackjack-Dapp
- [`scripts/`](https://github.com/kurtosis-tech/awesome-kurtosis/tree/main/smart-contract-example/scripts) enthält ein Skript zur Bereitstellung eines Token-Vertrags in Ihrem lokalen Ethereum-Netzwerk
- [`test/`](https://github.com/kurtosis-tech/awesome-kurtosis/tree/main/smart-contract-example/test) enthält einen einfachen .js-Test für Ihren Token-Vertrag, um zu bestätigen, dass für jeden Spieler in unserer Blackjack-Dapp 1000 Token geprägt wurden
- [`hardhat.config.ts`](https://github.com/kurtosis-tech/awesome-kurtosis/blob/main/smart-contract-example/hardhat.config.ts) konfiguriert Ihr Hardhat-Setup

### Hardhat für die Verwendung des lokalen Testnetzes konfigurieren {#configure-hardhat}

Nachdem Ihre Dapp-Entwicklungsumgebung eingerichtet ist, werden Sie nun Hardhat so verbinden, dass es das mit Kurtosis generierte lokale Ethereum-Testnetz verwendet. Suchen Sie zunächst die lokale Adresse des JSON-RPC-Endpunkts des Ausführungsclients:

```sh
kurtosis port print local-eth-testnet el-1-geth-lighthouse rpc
```

Die Ausgabe ist eine URL wie `http://127.0.0.1:32769`. Ihr Port wird anders sein. Ersetzen Sie `<PORT>` in der Struktur `localnet` in Ihrer Konfigurationsdatei `hardhat.config.ts` durch diesen Port.

Beispiel in `hardhat.config.ts`:

```js
localnet: {
  url: 'http://127.0.0.1:<PORT>',//TODO: ERSETZE <PORT> DURCH DEN PORT EINER KNOTEN-URI, DIE VOM ETH-NETZWERK-KURTOSIS-PAKET ERZEUGT WURDE
  // Dies sind private Schlüssel, die mit vorfinanzierten Testkonten verknüpft sind, die vom eth-network-package erstellt wurden
  //https://github.com/ethpandaops/ethereum-package/blob/main/src/prelaunch_data_generator/genesis_constants/genesis_constants.star
  accounts: [
    "bcdf20249abf0ed6d944c0288fad489e33f66b3960d9e6229c1cd214ed3bbe31",
    "53321db7c1e331d93a11a41d16f004d7ff63972ec8ec7c25db329728ceeb1710",
    "ab63b23eb7941c1251757e24b3d2350d2bc05c3c388d06f8fe6feafefb1e8c70",
    "5d2344259f42259f82d2c140aa66102ba89b57b4883ee441a8b312622bd42491",
    "27515f805127bebad2fb9b183508bdacb8c763da16f54e0678b16e8f28ef3fff",
    "7ff1a4c1d57e5e784d327c4c7651e952350bc271f156afb3d00d20f5ef924856",
  ],
},
```

Diese privaten Schlüssel sind öffentlich bekannte Testschlüssel. Verwenden Sie sie niemals im Mainnet oder in einem öffentlichen Netzwerk.

Sobald Sie Ihre Datei speichern, ist Ihre Hardhat-Dapp-Entwicklungsumgebung nun mit Ihrem lokalen Ethereum-Testnetz verbunden! Sie können überprüfen, ob Ihr Testnetz funktioniert, indem Sie Folgendes ausführen:

```sh
npx hardhat balances --network localnet
```

Die Ausgabe listet die Adresse und den Kontostand jedes der oben genannten Konten auf. Die erste Zeile sollte beispielsweise so aussehen:

```
0x8943545177806ED17B9F23F0a21ee5948eCaa776 has balance <a large balance>
```

Dies bestätigt, dass Hardhat Ihr lokales Testnetz verwendet und die vom `ethereum-package` erstellten, vorfinanzierten Konten erkennt.

### Ihre Dapp lokal bereitstellen und testen {#deploy-and-test-dapp}

Da die Dapp-Entwicklungsumgebung nun vollständig mit dem lokalen Ethereum-Testnetz verbunden ist, können Sie jetzt Entwicklungs- und Test-Workflows für Ihre Dapp unter Verwendung des lokalen Testnetzes ausführen.

Um den Smart Contract `ChipToken.sol` für lokales Prototyping und Entwicklung zu kompilieren und bereitzustellen, führen Sie Folgendes aus:

```sh
npx hardhat compile
npx hardhat run scripts/deploy.ts --network localnet
```

Die Ausgabe sollte in etwa so aussehen:

```
ChipToken deployed to: 0xAb2A01BC351770D09611Ac80f1DE076D56E0487d
```

Versuchen Sie nun, den Test `ChipToken.js` für Ihre lokale Dapp auszuführen, um zu bestätigen, dass für jeden Spieler in unserer Blackjack-Dapp 1000 Token geprägt wurden. Der Beispieltest verwendet noch die Funktion `deployed()` von ethers v5, die in ethers v6 durch `waitForDeployment()` ersetzt wurde. Aktualisieren Sie diese also zuerst:

```sh
sed -i.bak 's/\.deployed()/.waitForDeployment()/' test/ChipToken.js
```

Führen Sie dann den Test aus:

```sh
npx hardhat test --network localnet
```

Die Ausgabe sollte in etwa so aussehen:

```
ChipToken
    mint
      ✔ should mint 1000 chips for PLAYER ONE

  1 passing (654ms)
```

### Rückblick {#review-dapp-workflows}

Zu diesem Zeitpunkt haben Sie nun eine Dapp-Entwicklungsumgebung eingerichtet, sie mit einem von Kurtosis erstellten lokalen Ethereum-Netzwerk verbunden und einen einfachen Test für Ihre Dapp kompiliert, bereitgestellt und ausgeführt.

Lassen Sie uns nun untersuchen, wie Sie das zugrunde liegende Netzwerk konfigurieren können, um unsere Dapps unter verschiedenen Netzwerkkonfigurationen zu testen.

## Das lokale Ethereum-Testnetz konfigurieren {#configure-testnet}

### Ändern der Client-Konfigurationen und der Anzahl der Knoten {#configure-client-config-and-num-nodes}

Ihr lokales Ethereum-Testnetz kann so konfiguriert werden, dass es verschiedene EL- und CL-Client-Paare sowie eine unterschiedliche Anzahl von Knoten verwendet, abhängig vom Szenario und der spezifischen Netzwerkkonfiguration, die Sie entwickeln oder testen möchten. Das bedeutet, dass Sie nach der Einrichtung ein angepasstes lokales Testnetz starten und es verwenden können, um dieselben Workflows (Bereitstellung, Tests usw.) unter verschiedenen Netzwerkkonfigurationen auszuführen, um sicherzustellen, dass alles wie erwartet funktioniert. Um mehr über die anderen Parameter zu erfahren, die Sie ändern können, lesen Sie [die Konfigurationsdokumentation des `ethereum-package`](https://github.com/ethpandaops/ethereum-package#configuration).

Probieren Sie es aus! Sie können dem `ethereum-package` über eine YAML-Datei verschiedene Konfigurationsoptionen übergeben. Diese Netzwerkparameterdatei enthält die spezifischen Konfigurationen, die Kurtosis verwenden wird, um das lokale Ethereum-Netzwerk einzurichten.

Erstellen Sie eine Datei namens `network_params.yaml`, die drei Knoten mit unterschiedlichen EL/CL-Paaren startet:

- Knoten 1 mit `geth`/`lighthouse`
- Knoten 2 mit `geth`/`lodestar`
- Knoten 3 mit `geth`/`teku`

Diese Konfiguration erstellt ein heterogenes Netzwerk von Ethereum-Knotenimplementierungen zum Testen Ihrer Dapp. Ihre Konfigurationsdatei sollte so aussehen:

```yaml
participants:
  - el_type: geth
    cl_type: lighthouse
  - el_type: geth
    cl_type: lodestar
  - el_type: geth
    cl_type: teku
network_params:
  seconds_per_slot: 12
```

Jeder Eintrag in `participants` entspricht einem Knoten im Netzwerk, sodass 3 `participants`-Einträge Kurtosis anweisen, 3 Knoten in Ihrem Netzwerk zu starten. Jeder Eintrag ermöglicht es Ihnen, das EL- und CL-Paar anzugeben, das für diesen spezifischen Knoten verwendet wird. Alle Parameter, die Sie nicht angeben, behalten ihre Standardwerte.

Die Struktur `network_params` konfiguriert die Netzwerkeinstellungen, die verwendet werden, um die Genesis-Dateien für jeden Knoten zu erstellen, sowie andere Einstellungen wie die Sekunden pro Slot des Netzwerks.

Speichern Sie Ihre Parameterdatei und verwenden Sie sie dann, um Ihr Kurtosis-Paket auszuführen, indem Sie Folgendes eingeben:

```sh
kurtosis clean -a && kurtosis run --enclave local-eth-testnet github.com/ethpandaops/ethereum-package --args-file ./network_params.yaml
```

Hinweis: Der Befehl `kurtosis clean -a` wird hier verwendet, um Kurtosis anzuweisen, das alte Testnetz und dessen Inhalte zu zerstören, bevor ein neues gestartet wird.

Wieder wird Kurtosis eine Weile arbeiten und die einzelnen Schritte ausgeben, die stattfinden. Schließlich wird die Enklaven-Zusammenfassung ausgegeben. Dieses Mal umfassen die Benutzerdienste drei Knoten, zum Beispiel `el-1-geth-lighthouse`, `el-2-geth-lodestar` und `el-3-geth-teku` für die Ausführungsclients, zusammen mit den passenden Konsens- und Validator-Clients.

Herzlichen Glückwunsch! Sie haben Ihr lokales Testnetz erfolgreich so konfiguriert, dass es 3 Knoten anstelle von 1 hat. Um dieselben Workflows wie zuvor für Ihre Dapp auszuführen (Bereitstellung und Test), führen Sie dieselben Operationen wie zuvor durch, indem Sie den `<PORT>` in der Struktur `localnet` in Ihrer Konfigurationsdatei `hardhat.config.ts` durch den Port `rpc` eines beliebigen `el-<num>-...`-Dienstes in Ihrem neuen lokalen 3-Knoten-Testnetz ersetzen.

## Fazit {#conclusion}

Und das war's! Um diesen kurzen Leitfaden zusammenzufassen, haben Sie:

- Ein lokales Ethereum-Testnetz über Docker mit Kurtosis erstellt
- Ihre lokale Dapp-Entwicklungsumgebung mit dem lokalen Ethereum-Netzwerk verbunden
- Eine Dapp bereitgestellt und einen einfachen Test dafür im lokalen Ethereum-Netzwerk ausgeführt
- Das zugrunde liegende Ethereum-Netzwerk so konfiguriert, dass es 3 Knoten hat

Wir würden uns freuen, von Ihnen zu hören, was für Sie gut gelaufen ist, was verbessert werden könnte, oder um Ihre Fragen zu beantworten. Zögern Sie nicht, uns über [GitHub](https://github.com/kurtosis-tech/kurtosis/issues/new/choose) zu kontaktieren!

### Weitere Beispiele und Leitfäden {#other-examples-guides}

Wir empfehlen Ihnen, sich unseren [Schnellstart](https://docs.kurtosis.com/quickstart) und unsere anderen Beispiele in unserem [awesome-kurtosis-Repository](https://github.com/kurtosis-tech/awesome-kurtosis) anzusehen.

Das `ethereum-package` kann auch zusätzliche Dienste neben Ihrem Netzwerk starten, wie z. B. einen Transaktions-Spammer (um Transaktionen zu simulieren), einen Block-Explorer sowie verbundene Grafana- und Prometheus-Instanzen. Um sie zu aktivieren, listen Sie sie unter `additional_services` in Ihrer Parameterdatei auf, wie in [der Paketdokumentation](https://github.com/ethpandaops/ethereum-package#configuration) beschrieben.
