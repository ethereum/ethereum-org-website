---
title: Wie man eine Dapp auf einem lokalen Multi-Client-Testnet entwickelt und testet
description: "Dieser Leitfaden führt Sie zunächst durch die Instanziierung und Konfiguration eines lokalen Multi-Client-Ethereum-Testnets, bevor Sie das Testnet verwenden, um eine Dapp bereitzustellen und zu testen."
author: "Tedi Mitiku"
tags:
  [
    "Clients",
    "Blockchain-Knoten",
    "Smart Contracts",
    "Zusammensetzbarkeit",
    "Konsensebene",
    "Ausführungsebene",
    "Testen",
  ]
skill: intermediate
breadcrumb: Multi-Client-Testnet
lang: de
published: 2023-04-11
---

## Einführung {#introduction}

Dieser Leitfaden führt Sie durch den Prozess der Instanziierung eines konfigurierbaren lokalen Ethereum-Testnets, der Bereitstellung eines Smart Contracts darauf und der Verwendung des Testnets zur Ausführung von Tests für Ihre Dapp. Dieser Leitfaden richtet sich an Dapp-Entwickler, die ihre Dapps lokal mit verschiedenen Netzwerkkonfigurationen entwickeln und testen möchten, bevor sie sie in einem Live-Testnet oder dem Mainnet bereitstellen.

In diesem Leitfaden werden Sie:

- Ein lokales Ethereum-Testnet mit dem [`eth-network-package`](https://github.com/kurtosis-tech/eth-network-package) unter Verwendung von [Kurtosis](https://www.kurtosis.com/) instanziieren,
- Ihre Hardhat-Dapp-Entwicklungsumgebung mit dem lokalen Testnet verbinden, um eine Dapp zu kompilieren, bereitzustellen und zu testen, und
- Das lokale Testnet konfigurieren, einschließlich Parametern wie der Anzahl der Blockchain-Knoten und spezifischen EL/CL-Client-Paarungen, um Entwicklungs- und Test-Workflows für verschiedene Netzwerkkonfigurationen zu ermöglichen.

### Was ist Kurtosis? {#what-is-kurtosis}

[Kurtosis](https://www.kurtosis.com/) ist ein zusammensetzbares Build-System, das für die Konfiguration von Multi-Container-Testumgebungen entwickelt wurde. Es ermöglicht Entwicklern insbesondere die Erstellung reproduzierbarer Umgebungen, die eine dynamische Setup-Logik erfordern, wie z. B. Blockchain-Testnets.

In diesem Leitfaden startet das Kurtosis `eth-network-package` ein lokales Ethereum-Testnet mit Unterstützung für den Ausführungs-Client (EL) [`geth`](https://geth.ethereum.org/) sowie die Konsens-Clients (CL) [`teku`](https://consensys.io/teku), [`lighthouse`](https://lighthouse.sigmaprime.io/) und [`lodestar`](https://lodestar.chainsafe.io/). Dieses Paket dient als konfigurierbare und zusammensetzbare Alternative zu Netzwerken in Frameworks wie Hardhat Network, Ganache und Anvil. Kurtosis bietet Entwicklern mehr Kontrolle und Flexibilität über die von ihnen verwendeten Testnets, was ein Hauptgrund dafür ist, dass die [Ethereum Foundation Kurtosis zum Testen des Merge verwendet hat](https://www.kurtosis.com/blog/testing-the-ethereum-merge) und es weiterhin zum Testen von Netzwerk-Upgrades verwendet.

## Kurtosis einrichten {#setting-up-kurtosis}

Bevor Sie fortfahren, stellen Sie sicher, dass Sie Folgendes haben:

- Die [Docker-Engine installiert und gestartet](https://docs.kurtosis.com/install/#i-install--start-docker) auf Ihrem lokalen Rechner
- Die [Kurtosis-CLI installiert](https://docs.kurtosis.com/install#ii-install-the-cli) (oder auf die neueste Version aktualisiert, falls Sie die CLI bereits installiert haben)
- [Node.js](https://nodejs.org/en), [yarn](https://classic.yarnpkg.com/lang/en/docs/install/#mac-stable) und [npx](https://www.npmjs.com/package/npx) installiert (für Ihre Dapp-Umgebung)

## Ein lokales Ethereum-Testnet instanziieren {#instantiate-testnet}

Um ein lokales Ethereum-Testnet zu starten, führen Sie Folgendes aus:

```bash
kurtosis run --enclave local-eth-testnet github.com/kurtosis-tech/eth-network-package
```

Hinweis: Dieser Befehl benennt Ihr Netzwerk mit dem Flag `--enclave` als „local-eth-testnet“.

Kurtosis gibt die Schritte aus, die es im Hintergrund ausführt, während es die Anweisungen interpretiert, validiert und dann ausführt. Am Ende sollten Sie eine Ausgabe sehen, die der folgenden ähnelt:

```bash
INFO[2023-03-16T14:22:54-04:00] =========================================================
INFO[2023-03-16T14:22:54-04:00] ||          Created enclave: local-eth-testnet         ||
INFO[2023-03-16T14:22:54-04:00] =========================================================
Name:            local-eth-testnet
UUID:            221111111111
Status:          RUNNING
Creation Time:   Thu, 16 Mar 2023 14:21:41 EDT

========================================= Files Artifacts =========================================
UUID           Name
111111111111   111111111111-111111111111-111111111111-genesis-data
222222222222   222222222222-222222222222-222222222222-prysm-password
333333333333   333333333333-333333333333-333333333333-geth-prefunded-keys

========================================== User Services ==========================================
UUID           Name                                Ports                                         Status
444444444444   cl-1-lighthouse-geth                http: 4000/tcp -> http://127.0.0.1:64250      RUNNING
                                                   metrics: 5054/tcp -> http://127.0.0.1:64251
                                                   tcp-discovery: 9000/tcp -> 127.0.0.1:64252
                                                   udp-discovery: 9000/udp -> 127.0.0.1:64253
555555555555   el-1-geth-lighthouse                engine-rpc: 8551/tcp -> 127.0.0.1:64247       RUNNING
                                                   rpc: 8545/tcp -> 127.0.0.1:64248
                                                   tcp-discovery: 30303/tcp -> 127.0.0.1:64249
                                                   udp-discovery: 30303/udp -> 127.0.0.1:64254
                                                   ws: 8546/tcp -> 127.0.0.1:64255
666666666666   prelaunch-data-generator            <none>                                        RUNNING
777777777777   validator-key-generation-cl-1       <none>                                        RUNNING
```

Herzlichen Glückwunsch! Sie haben Kurtosis verwendet, um ein lokales Ethereum-Testnet mit einem CL- (`lighthouse`) und EL-Client (`geth`) über Docker zu instanziieren.

### Überprüfung {#review-instantiate-testnet}

In diesem Abschnitt haben Sie einen Befehl ausgeführt, der Kurtosis anwies, das [remote auf GitHub gehostete `eth-network-package`](https://github.com/kurtosis-tech/eth-network-package) zu verwenden, um ein lokales Ethereum-Testnet innerhalb einer Kurtosis-[Enclave](https://docs.kurtosis.com/advanced-concepts/enclaves/) zu starten. Innerhalb Ihrer Enclave finden Sie sowohl „Dateiartefakte“ (file artifacts) als auch „Benutzerdienste“ (user services).

Die [Dateiartefakte](https://docs.kurtosis.com/advanced-concepts/files-artifacts/) in Ihrer Enclave umfassen alle Daten, die generiert und verwendet wurden, um die EL- und CL-Clients zu bootstrappen. Die Daten wurden mit dem Dienst `prelaunch-data-generator` erstellt, der aus diesem [Docker-Image](https://github.com/ethpandaops/ethereum-genesis-generator) erstellt wurde.

Benutzerdienste zeigen alle containerisierten Dienste an, die in Ihrer Enclave ausgeführt werden. Sie werden feststellen, dass ein einzelner Blockchain-Knoten erstellt wurde, der sowohl über einen EL-Client als auch über einen CL-Client verfügt.

## Verbinden Sie Ihre Dapp-Entwicklungsumgebung mit dem lokalen Ethereum-Testnet {#connect-your-dapp}

### Einrichten der Dapp-Entwicklungsumgebung {#set-up-dapp-env}

Da Sie nun über ein laufendes lokales Testnet verfügen, können Sie Ihre Dapp-Entwicklungsumgebung so verbinden, dass sie Ihr lokales Testnet verwendet. In diesem Leitfaden wird das Hardhat-Framework verwendet, um eine Blackjack-Dapp in Ihrem lokalen Testnet bereitzustellen.

Um Ihre Dapp-Entwicklungsumgebung einzurichten, klonen Sie das Repository, das unsere Beispiel-Dapp enthält, und installieren Sie deren Abhängigkeiten, indem Sie Folgendes ausführen:

```bash
git clone https://github.com/kurtosis-tech/awesome-kurtosis.git
cd awesome-kurtosis/smart-contract-example
npm install
```

Der hier verwendete Ordner [smart-contract-example](https://github.com/kurtosis-tech/awesome-kurtosis/tree/main/smart-contract-example) enthält das typische Setup für einen Dapp-Entwickler, der das [Hardhat](https://hardhat.org/)-Framework verwendet:

- [`contracts/`](https://github.com/kurtosis-tech/awesome-kurtosis/tree/main/smart-contract-example/contracts) enthält einige einfache Smart Contracts für eine Blackjack-Dapp
- [`scripts/`](https://github.com/kurtosis-tech/awesome-kurtosis/tree/main/smart-contract-example/scripts) enthält ein Skript zur Bereitstellung eines Token-Vertrags in Ihrem lokalen Ethereum-Netzwerk
- [`test/`](https://github.com/kurtosis-tech/awesome-kurtosis/tree/main/smart-contract-example/test) enthält einen einfachen .js-Test für Ihren Token-Vertrag, um zu bestätigen, dass für jeden Spieler in unserer Blackjack-Dapp 1000 geprägt wurden
- [`hardhat.config.ts`](https://github.com/kurtosis-tech/awesome-kurtosis/blob/main/smart-contract-example/hardhat.config.ts) konfiguriert Ihr Hardhat-Setup

### Hardhat für die Verwendung des lokalen Testnets konfigurieren {#configure-hardhat}

Nachdem Ihre Dapp-Entwicklungsumgebung eingerichtet ist, verbinden Sie nun Hardhat, um das mit Kurtosis generierte lokale Ethereum-Testnet zu verwenden. Ersetzen Sie dazu `<$YOUR_PORT>` in der `localnet`-Struktur in Ihrer Konfigurationsdatei `hardhat.config.ts` durch den Port der RPC-URI-Ausgabe eines beliebigen `el-client-<num>`-Dienstes. In diesem Beispielfall wäre der Port `64248`. Ihr Port wird ein anderer sein.

Beispiel in `hardhat.config.ts`:

```ts
import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const config: HardhatUserConfig = {
  solidity: "0.8.18",
  networks: {
    localnet: {
      url: "http://127.0.0.1:<$YOUR_PORT>",
    },
  },
};

export default config;
```

Sobald Sie Ihre Datei speichern, ist Ihre Hardhat-Dapp-Entwicklungsumgebung nun mit Ihrem lokalen Ethereum-Testnet verbunden! Sie können überprüfen, ob Ihr Testnet funktioniert, indem Sie Folgendes ausführen:

```bash
npx hardhat balances --network localnet
```

Die Ausgabe sollte in etwa so aussehen:

```bash
0x821b55d8abe79bc98f05eb675fdc50dfe796b7ab has balance 10000000000000000000000
0x123463a4b065722e99115d6c222f267d9cabb524 has balance 10000000000000000000000
0x2e0d69cdbc64d09d52ac77708f55cd0274065642 has balance 10000000000000000000000
```

Dies bestätigt, dass Hardhat Ihr lokales Testnet verwendet und die vom `eth-network-package` erstellten, im Voraus finanzierten Konten erkennt.

### Stellen Sie Ihre Dapp lokal bereit und testen Sie sie {#deploy-and-test-dapp}

Da die Dapp-Entwicklungsumgebung nun vollständig mit dem lokalen Ethereum-Testnet verbunden ist, können Sie Entwicklungs- und Test-Workflows für Ihre Dapp über das lokale Testnet ausführen.

Um den Smart Contract `ChipToken.sol` für lokales Prototyping und Entwicklung zu kompilieren und bereitzustellen, führen Sie Folgendes aus:

```bash
npx hardhat run scripts/deploy.ts --network localnet
```

Die Ausgabe sollte in etwa so aussehen:

```bash
Compiled 2 Solidity files successfully
ChipToken deployed to: 0x5FbDB2315678afecb367f032d93F642f64180aa3
```

Versuchen Sie nun, den Test `simple.js` für Ihre lokale Dapp auszuführen, um zu bestätigen, dass für jeden Spieler in unserer Blackjack-Dapp 1000 geprägt wurden:

Die Ausgabe sollte in etwa so aussehen:

```bash
npx hardhat test --network localnet
```

Die Ausgabe sollte in etwa so aussehen:

```bash
  ChipToken
    ✔ Should mint 1000 tokens for each player (101ms)


  1 passing (103ms)
```

### Überprüfung {#review-dapp-workflows}

Zu diesem Zeitpunkt haben Sie nun eine Dapp-Entwicklungsumgebung eingerichtet, sie mit einem von Kurtosis erstellten lokalen Ethereum-Netzwerk verbunden und einen einfachen Test für Ihre Dapp kompiliert, bereitgestellt und ausgeführt.

Lassen Sie uns nun untersuchen, wie Sie das zugrunde liegende Netzwerk konfigurieren können, um unsere Dapps unter verschiedenen Netzwerkkonfigurationen zu testen.

## Konfigurieren des lokalen Ethereum-Testnets {#configure-testnet}

### Ändern der Client-Konfigurationen und der Anzahl der Blockchain-Knoten {#configure-client-config-and-num-nodes}

Ihr lokales Ethereum-Testnet kann so konfiguriert werden, dass es verschiedene EL- und CL-Client-Paare sowie eine unterschiedliche Anzahl von Blockchain-Knoten verwendet, abhängig vom Szenario und der spezifischen Netzwerkkonfiguration, die Sie entwickeln oder testen möchten. Das bedeutet, dass Sie nach der Einrichtung ein angepasstes lokales Testnet starten und es verwenden können, um dieselben Workflows (Bereitstellung, Tests usw.) unter verschiedenen Netzwerkkonfigurationen auszuführen, um sicherzustellen, dass alles wie erwartet funktioniert. Um mehr über die anderen Parameter zu erfahren, die Sie ändern können, besuchen Sie diesen Link.

Probieren Sie es aus! Sie können dem `eth-network-package` über eine JSON-Datei verschiedene Konfigurationsoptionen übergeben. Diese JSON-Datei mit Netzwerkparametern enthält die spezifischen Konfigurationen, die Kurtosis zum Einrichten des lokalen Ethereum-Netzwerks verwendet.

Nehmen Sie die Standardkonfigurationsdatei und bearbeiten Sie sie, um zwei Blockchain-Knoten mit unterschiedlichen EL/CL-Paaren zu starten:

- Knoten 1 mit `geth`/`lighthouse`
- Knoten 2 mit `geth`/`lodestar`
- Knoten 3 mit `geth`/`teku`

Diese Konfiguration erstellt ein heterogenes Netzwerk von Ethereum-Knotenimplementierungen zum Testen Ihrer Dapp. Ihre Konfigurationsdatei sollte nun wie folgt aussehen:

```json
{
  "participants": [
    {
      "el_client_type": "geth",
      "el_client_image": "",
      "el_client_log_level": "",
      "cl_client_type": "lighthouse",
      "cl_client_image": "",
      "cl_client_log_level": "",
      "beacon_extra_params": [],
      "el_extra_params": [],
      "validator_extra_params": [],
      "builder_network_params": null
    },
    {
      "el_client_type": "geth",
      "el_client_image": "",
      "el_client_log_level": "",
      "cl_client_type": "lodestar",
      "cl_client_image": "",
      "cl_client_log_level": "",
      "beacon_extra_params": [],
      "el_extra_params": [],
      "validator_extra_params": [],
      "builder_network_params": null
    },
    {
      "el_client_type": "geth",
      "el_client_image": "",
      "el_client_log_level": "",
      "cl_client_type": "teku",
      "cl_client_image": "",
      "cl_client_log_level": "",
      "beacon_extra_params": [],
      "el_extra_params": [],
      "validator_extra_params": [],
      "builder_network_params": null
    }
  ],
  "network_params": {
    "preregistered_validator_keys_mnemonic": "giant issue aisle success illegal bike spike question tent bar rely arctic volcano waffle brown round aries mita",
    "num_validator_keys_per_node": 64,
    "network_id": "3151908",
    "deposit_contract_address": "0x4242424242424242424242424242424242424242",
    "seconds_per_slot": 12,
    "slots_per_epoch": 32,
    "genesis_delay": 20
  }
}
```

Jede `participants`-Struktur ist einem Blockchain-Knoten im Netzwerk zugeordnet, sodass 3 `participants`-Strukturen Kurtosis anweisen, 3 Blockchain-Knoten in Ihrem Netzwerk zu starten. Jede `participants`-Struktur ermöglicht es Ihnen, das EL- und CL-Paar anzugeben, das für diesen spezifischen Knoten verwendet wird.

Die Struktur `network_params` konfiguriert die Netzwerkeinstellungen, die zum Erstellen der Genesis-Dateien für jeden Knoten verwendet werden, sowie andere Einstellungen wie die Sekunden pro Slot des Netzwerks.

Speichern Sie Ihre bearbeitete Parameterdatei in einem beliebigen Verzeichnis (im folgenden Beispiel wird sie auf dem Desktop gespeichert) und verwenden Sie sie dann, um Ihr Kurtosis-Paket auszuführen, indem Sie Folgendes eingeben:

```bash
kurtosis clean -a && kurtosis run --enclave local-eth-testnet github.com/kurtosis-tech/eth-network-package "$(cat ~/Desktop/network_params.json)"
```

Hinweis: Der Befehl `kurtosis clean -a` wird hier verwendet, um Kurtosis anzuweisen, das alte Testnet und dessen Inhalte zu zerstören, bevor ein neues gestartet wird.

Auch hier wird Kurtosis eine Weile arbeiten und die einzelnen Schritte ausgeben, die stattfinden. Schließlich sollte die Ausgabe in etwa so aussehen:

```bash
INFO[2023-03-16T14:44:22-04:00] =========================================================
INFO[2023-03-16T14:44:22-04:00] ||          Created enclave: local-eth-testnet         ||
INFO[2023-03-16T14:44:22-04:00] =========================================================
Name:            local-eth-testnet
UUID:            888888888888
Status:          RUNNING
Creation Time:   Thu, 16 Mar 2023 14:42:41 EDT

========================================= Files Artifacts =========================================
UUID           Name
111111111111   111111111111-111111111111-111111111111-genesis-data
222222222222   222222222222-222222222222-222222222222-prysm-password
333333333333   333333333333-333333333333-333333333333-geth-prefunded-keys

========================================== User Services ==========================================
UUID           Name                                Ports                                         Status
444444444444   cl-1-lighthouse-geth                http: 4000/tcp -> http://127.0.0.1:64306      RUNNING
                                                   metrics: 5054/tcp -> http://127.0.0.1:64307
                                                   tcp-discovery: 9000/tcp -> 127.0.0.1:64308
                                                   udp-discovery: 9000/udp -> 127.0.0.1:64309
555555555555   cl-2-lodestar-geth                  http: 4000/tcp -> http://127.0.0.1:64316      RUNNING
                                                   metrics: 8008/tcp -> http://127.0.0.1:64317
                                                   tcp-discovery: 9000/tcp -> 127.0.0.1:64318
                                                   udp-discovery: 9000/udp -> 127.0.0.1:64319
666666666666   cl-3-teku-geth                      http: 4000/tcp -> http://127.0.0.1:64326      RUNNING
                                                   metrics: 8008/tcp -> http://127.0.0.1:64327
                                                   tcp-discovery: 9000/tcp -> 127.0.0.1:64328
                                                   udp-discovery: 9000/udp -> 127.0.0.1:64329
777777777777   el-1-geth-lighthouse                engine-rpc: 8551/tcp -> 127.0.0.1:64301       RUNNING
                                                   rpc: 8545/tcp -> 127.0.0.1:64302
                                                   tcp-discovery: 30303/tcp -> 127.0.0.1:64303
                                                   udp-discovery: 30303/udp -> 127.0.0.1:64310
                                                   ws: 8546/tcp -> 127.0.0.1:64311
888888888888   el-2-geth-lodestar                  engine-rpc: 8551/tcp -> 127.0.0.1:64312       RUNNING
                                                   rpc: 8545/tcp -> 127.0.0.1:64313
                                                   tcp-discovery: 30303/tcp -> 127.0.0.1:64314
                                                   udp-discovery: 30303/udp -> 127.0.0.1:64320
                                                   ws: 8546/tcp -> 127.0.0.1:64321
999999999999   el-3-geth-teku                      engine-rpc: 8551/tcp -> 127.0.0.1:64322       RUNNING
                                                   rpc: 8545/tcp -> 127.0.0.1:64323
                                                   tcp-discovery: 30303/tcp -> 127.0.0.1:64324
                                                   udp-discovery: 30303/udp -> 127.0.0.1:64330
                                                   ws: 8546/tcp -> 127.0.0.1:64331
000000000000   prelaunch-data-generator            <none>                                        RUNNING
121212121212   validator-key-generation-cl-1       <none>                                        RUNNING
232323232323   validator-key-generation-cl-2       <none>                                        RUNNING
343434343434   validator-key-generation-cl-3       <none>                                        RUNNING
```

Herzlichen Glückwunsch! Sie haben Ihr lokales Testnet erfolgreich so konfiguriert, dass es 3 Blockchain-Knoten anstelle von 1 hat. Um dieselben Workflows wie zuvor für Ihre Dapp auszuführen (Bereitstellen und Testen), führen Sie dieselben Vorgänge wie zuvor aus, indem Sie `<$YOUR_PORT>` in der `localnet`-Struktur in Ihrer Konfigurationsdatei `hardhat.config.ts` durch den Port der RPC-URI-Ausgabe eines beliebigen `el-client-<num>`-Dienstes in Ihrem neuen lokalen Testnet mit 3 Knoten ersetzen.

## Fazit {#conclusion}

Und das war's! Um diesen kurzen Leitfaden zusammenzufassen, haben Sie:

- Ein lokales Ethereum-Testnet über Docker mit Kurtosis erstellt
- Ihre lokale Dapp-Entwicklungsumgebung mit dem lokalen Ethereum-Netzwerk verbunden
- Eine Dapp bereitgestellt und einen einfachen Test dafür im lokalen Ethereum-Netzwerk ausgeführt
- Das zugrunde liegende Ethereum-Netzwerk so konfiguriert, dass es 3 Blockchain-Knoten hat

Wir würden uns freuen, von Ihnen zu hören, was für Sie gut gelaufen ist, was verbessert werden könnte, oder Ihre Fragen zu beantworten. Zögern Sie nicht, uns über [GitHub](https://github.com/kurtosis-tech/kurtosis/issues/new/choose) zu kontaktieren oder [uns eine E-Mail zu senden](mailto:feedback@kurtosistech.com)!

### Weitere Beispiele und Leitfäden {#other-examples-guides}

Wir empfehlen Ihnen, sich unseren [Schnellstart](https://docs.kurtosis.com/quickstart) (wo Sie eine Postgres-Datenbank und eine API darauf aufbauen) und unsere anderen Beispiele in unserem [awesome-kurtosis-Repository](https://github.com/kurtosis-tech/awesome-kurtosis) anzusehen, wo Sie einige großartige Beispiele finden, einschließlich Paketen für:

- [Das Starten desselben lokalen Ethereum-Testnets](https://github.com/kurtosis-tech/eth2-package), jedoch mit zusätzlichen verbundenen Diensten wie einem Transaktions-Spammer (zur Simulation von Transaktionen), einem Fork-Monitor und einer verbundenen Grafana- und Prometheus-Instanz
- Die Durchführung eines [Subnetzwerk-Tests](https://github.com/kurtosis-tech/awesome-kurtosis/tree/main/ethereum-network-partition-test) für dasselbe lokale Ethereum-Netzwerk