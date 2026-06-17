---
title: Wie man eine Dapp auf einem lokalen Multi-Client-Testnetz entwickelt und testet
description: Dieser Leitfaden führt Sie zunächst durch die Instanziierung und Konfiguration eines lokalen Multi-Client-Ethereum-Testnetzes, bevor Sie das Testnetz verwenden, um eine Dapp bereitzustellen und zu testen.
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

Dieser Leitfaden führt Sie durch den Prozess der Instanziierung eines konfigurierbaren lokalen Ethereum-Testnetzes, der Bereitstellung eines Smart Contracts darauf und der Verwendung des Testnetzes, um Tests für Ihre dezentrale Anwendung (Dapp) auszuführen. Dieser Leitfaden richtet sich an Dapp-Entwickler, die ihre Dapps lokal mit verschiedenen Netzwerkkonfigurationen entwickeln und testen möchten, bevor sie sie in einem Live-Testnetz oder dem Mainnet bereitstellen.

In diesem Leitfaden werden Sie:

- Ein lokales Ethereum-Testnetz mit dem [`eth-network-package`](https://github.com/kurtosis-tech/eth-network-package) unter Verwendung von [Kurtosis](https://www.kurtosis.com/) instanziieren,
- Ihre Hardhat-Dapp-Entwicklungsumgebung mit dem lokalen Testnetz verbinden, um eine Dapp zu kompilieren, bereitzustellen und zu testen, und
- Das lokale Testnetz konfigurieren, einschließlich Parametern wie der Anzahl der Knoten und spezifischen EL/CL-Client-Paarungen, um Entwicklungs- und Test-Workflows für verschiedene Netzwerkkonfigurationen zu ermöglichen.

### Was ist Kurtosis? {#what-is-kurtosis}

[Kurtosis](https://www.kurtosis.com/) ist ein zusammensetzbares Build-System, das für die Konfiguration von Multi-Container-Testumgebungen entwickelt wurde. Es ermöglicht Entwicklern insbesondere die Erstellung reproduzierbarer Umgebungen, die eine dynamische Setup-Logik erfordern, wie z. B. Blockchain-Testnetze.

In diesem Leitfaden startet das Kurtosis eth-network-package ein lokales Ethereum-Testnetz mit Unterstützung für den [`geth`](https://geth.ethereum.org/) Ausführungsschicht (EL)-Client sowie die [`teku`](https://consensys.io/teku), [`lighthouse`](https://lighthouse.sigmaprime.io/) und [`lodestar`](https://lodestar.chainsafe.io/) Konsensschicht (CL)-Clients. Dieses Paket dient als konfigurierbare und zusammensetzbare Alternative zu Netzwerken in Frameworks wie Hardhat Network, Ganache und Anvil. Kurtosis bietet Entwicklern mehr Kontrolle und Flexibilität über die von ihnen verwendeten Testnetze, was ein Hauptgrund dafür ist, warum die [Ethereum Foundation Kurtosis verwendet hat, um den Merge zu testen](https://www.kurtosis.com/blog/testing-the-ethereum-merge), und es weiterhin für das Testen von Netzwerk-Upgrades verwendet.

## Kurtosis einrichten {#setting-up-kurtosis}

Bevor Sie fortfahren, stellen Sie sicher, dass Sie Folgendes haben:

- [Die Docker-Engine installiert und gestartet](https://docs.kurtosis.com/install/#i-install--start-docker) auf Ihrem lokalen Rechner
- [Die Kurtosis-CLI installiert](https://docs.kurtosis.com/install#ii-install-the-cli) (oder auf die neueste Version aktualisiert, falls Sie die CLI bereits installiert haben)
- [Node.js](https://nodejs.org/en), [yarn](https://classic.yarnpkg.com/lang/en/docs/install/#mac-stable) und [npx](https://www.npmjs.com/package/npx) installiert (für Ihre Dapp-Umgebung)

## Ein lokales Ethereum-Testnetz instanziieren {#instantiate-testnet}

Um ein lokales Ethereum-Testnetz zu starten, führen Sie Folgendes aus:

```python
kurtosis --enclave local-eth-testnet run github.com/kurtosis-tech/eth-network-package
```

Hinweis: Dieser Befehl benennt Ihr Netzwerk: „local-eth-testnet“ unter Verwendung des `--enclave`-Flags.

Kurtosis gibt die Schritte aus, die es intern durchführt, während es die Anweisungen interpretiert, validiert und dann ausführt. Am Ende sollten Sie eine Ausgabe sehen, die der folgenden ähnelt:

```python
INFO[2023-04-04T18:09:44-04:00] ======================================================
INFO[2023-04-04T18:09:44-04:00] ||          Created enclave: local-eth-testnet      ||
INFO[2023-04-04T18:09:44-04:00] ======================================================
Name:            local-eth-testnet
UUID:            39372d756ae8
Status:          RUNNING
Creation Time:   Tue, 04 Apr 2023 18:09:03 EDT

========================================= Files Artifacts =========================================
UUID           Name
d4085a064230   cl-genesis-data
1c62cb792e4c   el-genesis-data
bd60489b73a7   genesis-generation-config-cl
b2e593fe5228   genesis-generation-config-el
d552a54acf78   geth-prefunded-keys
5f7e661eb838   prysm-password
054e7338bb59   validator-keystore-0

========================================== User Services ==========================================
UUID           Name                                           Ports                                         Status
e20f129ee0c5   cl-client-0-beacon                             http: 4000/tcp -> <http://127.0.0.1:54261>    RUNNING
                                                              metrics: 5054/tcp -> <http://127.0.0.1:54262>
                                                              tcp-discovery: 9000/tcp -> 127.0.0.1:54263
                                                              udp-discovery: 9000/udp -> 127.0.0.1:60470
a8b6c926cdb4   cl-client-0-validator                          http: 5042/tcp -> 127.0.0.1:54267             RUNNING
                                                              metrics: 5064/tcp -> <http://127.0.0.1:54268>
d7b802f623e8   el-client-0                                    engine-rpc: 8551/tcp -> 127.0.0.1:54253       RUNNING
                                                              rpc: 8545/tcp -> 127.0.0.1:54251
                                                              tcp-discovery: 30303/tcp -> 127.0.0.1:54254
                                                              udp-discovery: 30303/udp -> 127.0.0.1:53834
                                                              ws: 8546/tcp -> 127.0.0.1:54252
514a829c0a84   prelaunch-data-generator-1680646157905431468   <none>                                        STOPPED
62bd62d0aa7a   prelaunch-data-generator-1680646157915424301   <none>                                        STOPPED
05e9619e0e90   prelaunch-data-generator-1680646157922872635   <none>                                        STOPPED

```

Herzlichen Glückwunsch! Sie haben Kurtosis verwendet, um ein lokales Ethereum-Testnetz mit einem CL- (`lighthouse`) und EL-Client (`geth`) über Docker zu instanziieren.

### Rückblick {#review-instantiate-testnet}

In diesem Abschnitt haben Sie einen Befehl ausgeführt, der Kurtosis anwies, das [remote auf GitHub gehostete `eth-network-package`](https://github.com/kurtosis-tech/eth-network-package) zu verwenden, um ein lokales Ethereum-Testnetz innerhalb einer Kurtosis-[Enklave](https://docs.kurtosis.com/advanced-concepts/enclaves/) zu starten. Innerhalb Ihrer Enklave finden Sie sowohl „Dateiartefakte“ (file artifacts) als auch „Benutzerdienste“ (user services).

Die [Dateiartefakte](https://docs.kurtosis.com/advanced-concepts/files-artifacts/) in Ihrer Enklave umfassen alle Daten, die generiert und verwendet wurden, um die EL- und CL-Clients zu bootstrappen. Die Daten wurden mit dem `prelaunch-data-generator`-Dienst erstellt, der aus diesem [Docker-Image](https://github.com/ethpandaops/ethereum-genesis-generator) erstellt wurde.

Benutzerdienste zeigen alle containerisierten Dienste an, die in Ihrer Enklave ausgeführt werden. Sie werden feststellen, dass ein einzelner Knoten erstellt wurde, der sowohl über einen EL-Client als auch über einen CL-Client verfügt.

## Verbinden Sie Ihre Dapp-Entwicklungsumgebung mit dem lokalen Ethereum-Testnetz {#connect-your-dapp}

### Einrichten der Dapp-Entwicklungsumgebung {#set-up-dapp-env}

Da Sie nun ein laufendes lokales Testnetz haben, können Sie Ihre Dapp-Entwicklungsumgebung so verbinden, dass sie Ihr lokales Testnetz verwendet. Das Hardhat-Framework wird in diesem Leitfaden verwendet, um eine Blackjack-Dapp in Ihrem lokalen Testnetz bereitzustellen.

Um Ihre Dapp-Entwicklungsumgebung einzurichten, klonen Sie das Repository, das unsere Beispiel-Dapp enthält, und installieren Sie deren Abhängigkeiten, indem Sie Folgendes ausführen:

```python
git clone https://github.com/kurtosis-tech/awesome-kurtosis.git && cd awesome-kurtosis/smart-contract-example && yarn
```

Der hier verwendete Ordner [smart-contract-example](https://github.com/kurtosis-tech/awesome-kurtosis/tree/main/smart-contract-example) enthält das typische Setup für einen Dapp-Entwickler, der das [Hardhat](https://hardhat.org/)-Framework verwendet:

- [`contracts/`](https://github.com/kurtosis-tech/awesome-kurtosis/tree/main/smart-contract-example/contracts) enthält einige einfache Smart Contracts für eine Blackjack-Dapp
- [`scripts/`](https://github.com/kurtosis-tech/awesome-kurtosis/tree/main/smart-contract-example/scripts) enthält ein Skript zur Bereitstellung eines Token-Vertrags in Ihrem lokalen Ethereum-Netzwerk
- [`test/`](https://github.com/kurtosis-tech/awesome-kurtosis/tree/main/smart-contract-example/test) enthält einen einfachen .js-Test für Ihren Token-Vertrag, um zu bestätigen, dass für jeden Spieler in unserer Blackjack-Dapp 1000 geprägt wurden
- [`hardhat.config.ts`](https://github.com/kurtosis-tech/awesome-kurtosis/blob/main/smart-contract-example/hardhat.config.ts) konfiguriert Ihr Hardhat-Setup

### Hardhat für die Verwendung des lokalen Testnetzes konfigurieren {#configure-hardhat}

Nachdem Ihre Dapp-Entwicklungsumgebung eingerichtet ist, verbinden Sie nun Hardhat, um das mit Kurtosis generierte lokale Ethereum-Testnetz zu verwenden. Ersetzen Sie dazu `<$YOUR_PORT>` in der `localnet`-Struktur in Ihrer `hardhat.config.ts`-Konfigurationsdatei durch den Port der RPC-URI-Ausgabe eines beliebigen `el-client-<num>`-Dienstes. In diesem Beispielfall wäre der Port `64248`. Ihr Port wird anders sein.

Beispiel in `hardhat.config.ts`:

```js
localnet: {
url: 'http://127.0.0.1:<$YOUR_PORT>',// TODO: ERSETZE $YOUR_PORT DURCH DEN PORT EINER KNOTEN-URI, DIE VOM ETH-NETZWERK-KURTOSIS-PAKET ERZEUGT WURDE

// Dies sind private Schlüssel für vorfinanzierte Testkonten, die vom eth-network-package erstellt wurden
// <https://github.com/kurtosis-tech/eth-network-package/blob/main/src/prelaunch_data_generator/genesis_constants/genesis_constants.star>
accounts: [
    "ef5177cd0b6b21c87db5a0bf35d4084a8a57a9d6a064f86d51ac85f2b873a4e2",
    "48fcc39ae27a0e8bf0274021ae6ebd8fe4a0e12623d61464c498900b28feb567",
    "7988b3a148716ff800414935b305436493e1f25237a2a03e5eebc343735e2f31",
    "b3c409b6b0b3aa5e65ab2dc1930534608239a478106acf6f3d9178e9f9b00b35",
    "df9bb6de5d3dc59595bcaa676397d837ff49441d211878c024eabda2cd067c9f",
    "7da08f856b5956d40a72968f93396f6acff17193f013e8053f6fbb6c08c194d6",
  ],
},
```

Sobald Sie Ihre Datei speichern, ist Ihre Hardhat-Dapp-Entwicklungsumgebung nun mit Ihrem lokalen Ethereum-Testnetz verbunden! Sie können überprüfen, ob Ihr Testnetz funktioniert, indem Sie Folgendes ausführen:

```python
npx hardhat balances --network localnet
```

Die Ausgabe sollte in etwa so aussehen:

```python
0x878705ba3f8Bc32FCf7F4CAa1A35E72AF65CF766 has balance 10000000000000000000000000
0x4E9A3d9D1cd2A2b2371b8b3F489aE72259886f1A has balance 10000000000000000000000000
0xdF8466f277964Bb7a0FFD819403302C34DCD530A has balance 10000000000000000000000000
0x5c613e39Fc0Ad91AfDA24587e6f52192d75FBA50 has balance 10000000000000000000000000
0x375ae6107f8cC4cF34842B71C6F746a362Ad8EAc has balance 10000000000000000000000000
0x1F6298457C5d76270325B724Da5d1953923a6B88 has balance 10000000000000000000000000
```

Dies bestätigt, dass Hardhat Ihr lokales Testnetz verwendet und die vom `eth-network-package` erstellten, vorfinanzierten Konten erkennt.

### Ihre Dapp lokal bereitstellen und testen {#deploy-and-test-dapp}

Da die Dapp-Entwicklungsumgebung nun vollständig mit dem lokalen Ethereum-Testnetz verbunden ist, können Sie Entwicklungs- und Test-Workflows für Ihre Dapp unter Verwendung des lokalen Testnetzes ausführen.

Um den `ChipToken.sol` Smart Contract für lokales Prototyping und Entwicklung zu kompilieren und bereitzustellen, führen Sie Folgendes aus:

```python
npx hardhat compile
npx hardhat run scripts/deploy.ts --network localnet
```

Die Ausgabe sollte in etwa so aussehen:

```python
ChipToken deployed to: 0xAb2A01BC351770D09611Ac80f1DE076D56E0487d
```

Versuchen Sie nun, den `simple.js`-Test für Ihre lokale Dapp auszuführen, um zu bestätigen, dass für jeden Spieler in unserer Blackjack-Dapp 1000 geprägt wurden:

Die Ausgabe sollte in etwa so aussehen:

```python
npx hardhat test --network localnet
```

Die Ausgabe sollte in etwa so aussehen:

```python
ChipToken
    mint
      ✔ should mint 1000 chips for PLAYER ONE

  1 passing (654ms)
```

### Rückblick {#review-dapp-workflows}

Zu diesem Zeitpunkt haben Sie nun eine Dapp-Entwicklungsumgebung eingerichtet, sie mit einem von Kurtosis erstellten lokalen Ethereum-Netzwerk verbunden und einen einfachen Test für Ihre Dapp kompiliert, bereitgestellt und ausgeführt.

Lassen Sie uns nun untersuchen, wie Sie das zugrunde liegende Netzwerk konfigurieren können, um unsere Dapps unter verschiedenen Netzwerkkonfigurationen zu testen.

## Konfigurieren des lokalen Ethereum-Testnetzes {#configure-testnet}

### Ändern der Client-Konfigurationen und der Anzahl der Knoten {#configure-client-config-and-num-nodes}

Ihr lokales Ethereum-Testnetz kann so konfiguriert werden, dass es verschiedene EL- und CL-Client-Paare sowie eine unterschiedliche Anzahl von Knoten verwendet, abhängig vom Szenario und der spezifischen Netzwerkkonfiguration, die Sie entwickeln oder testen möchten. Das bedeutet, dass Sie nach der Einrichtung ein angepasstes lokales Testnetz starten und es verwenden können, um dieselben Workflows (Bereitstellung, Tests usw.) unter verschiedenen Netzwerkkonfigurationen auszuführen, um sicherzustellen, dass alles wie erwartet funktioniert. Um mehr über die anderen Parameter zu erfahren, die Sie ändern können, besuchen Sie diesen Link.

Probieren Sie es aus! Sie können dem `eth-network-package` über eine JSON-Datei verschiedene Konfigurationsoptionen übergeben. Diese Netzwerkparameter-JSON-Datei enthält die spezifischen Konfigurationen, die Kurtosis verwenden wird, um das lokale Ethereum-Netzwerk einzurichten.

Nehmen Sie die Standardkonfigurationsdatei und bearbeiten Sie sie, um zwei Knoten mit unterschiedlichen EL/CL-Paaren zu starten:

- Knoten 1 mit `geth`/`lighthouse`
- Knoten 2 mit `geth`/`lodestar`
- Knoten 3 mit `geth`/`teku`

Diese Konfiguration erstellt ein heterogenes Netzwerk von Ethereum-Knoten-Implementierungen zum Testen Ihrer Dapp. Ihre Konfigurationsdatei sollte nun so aussehen:

```yaml
{
  "participants":
    [
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
        "builder_network_params": null,
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
        "builder_network_params": null,
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
        "builder_network_params": null,
      },
    ],
  "network_params":
    {
      "preregistered_validator_keys_mnemonic": "giant issue aisle success illegal bike spike question tent bar rely arctic volcano long crawl hungry vocal artwork sniff fantasy very lucky have athlete",
      "num_validator_keys_per_node": 64,
      "network_id": "3151908",
      "deposit_contract_address": "0x4242424242424242424242424242424242424242",
      "seconds_per_slot": 12,
      "genesis_delay": 120,
      "capella_fork_epoch": 5,
    },
}
```

Jede `participants`-Struktur ist einem Knoten im Netzwerk zugeordnet, sodass 3 `participants`-Strukturen Kurtosis anweisen, 3 Knoten in Ihrem Netzwerk zu starten. Jede `participants`-Struktur ermöglicht es Ihnen, das EL- und CL-Paar anzugeben, das für diesen spezifischen Knoten verwendet wird.

Die `network_params`-Struktur konfiguriert die Netzwerkeinstellungen, die verwendet werden, um die Genesis-Dateien für jeden Knoten zu erstellen, sowie andere Einstellungen wie die Sekunden pro Slot des Netzwerks.

Speichern Sie Ihre bearbeitete Parameterdatei in einem beliebigen Verzeichnis (im folgenden Beispiel wird sie auf dem Desktop gespeichert) und verwenden Sie sie dann, um Ihr Kurtosis-Paket auszuführen, indem Sie Folgendes ausführen:

```python
kurtosis clean -a && kurtosis run --enclave local-eth-testnet github.com/kurtosis-tech/eth-network-package "$(cat ~/eth-network-params.json)"
```

Hinweis: Der Befehl `kurtosis clean -a` wird hier verwendet, um Kurtosis anzuweisen, das alte Testnetz und dessen Inhalte zu zerstören, bevor ein neues gestartet wird.

Wieder wird Kurtosis eine Weile arbeiten und die einzelnen Schritte ausgeben, die stattfinden. Schließlich sollte die Ausgabe in etwa so aussehen:

```python
Starlark code successfully run. No output was returned.
INFO[2023-04-07T11:43:16-04:00] ==========================================================
INFO[2023-04-07T11:43:16-04:00] ||          Created enclave: local-eth-testnet          ||
INFO[2023-04-07T11:43:16-04:00] ==========================================================
Name:            local-eth-testnet
UUID:            bef8c192008e
Status:          RUNNING
Creation Time:   Fri, 07 Apr 2023 11:41:58 EDT

========================================= Files Artifacts =========================================
UUID           Name
cc495a8e364a   cl-genesis-data
7033fcdb5471   el-genesis-data
a3aef43fc738   genesis-generation-config-cl
8e968005fc9d   genesis-generation-config-el
3182cca9d3cd   geth-prefunded-keys
8421166e234f   prysm-password
d9e6e8d44d99   validator-keystore-0
23f5ba517394   validator-keystore-1
4d28dea40b5c   validator-keystore-2

========================================== User Services ==========================================
UUID           Name                                           Ports                                            Status
485e6fde55ae   cl-client-0-beacon                             http: 4000/tcp -> http://127.0.0.1:65010         RUNNING
                                                              metrics: 5054/tcp -> http://127.0.0.1:65011
                                                              tcp-discovery: 9000/tcp -> 127.0.0.1:65012
                                                              udp-discovery: 9000/udp -> 127.0.0.1:54455
73739bd158b2   cl-client-0-validator                          http: 5042/tcp -> 127.0.0.1:65016                RUNNING
                                                              metrics: 5064/tcp -> http://127.0.0.1:65017
1b0a233cd011   cl-client-1-beacon                             http: 4000/tcp -> 127.0.0.1:65021                RUNNING
                                                              metrics: 8008/tcp -> 127.0.0.1:65023
                                                              tcp-discovery: 9000/tcp -> 127.0.0.1:65024
                                                              udp-discovery: 9000/udp -> 127.0.0.1:56031
                                                              validator-metrics: 5064/tcp -> 127.0.0.1:65022
949b8220cd53   cl-client-1-validator                          http: 4000/tcp -> 127.0.0.1:65028                RUNNING
                                                              metrics: 8008/tcp -> 127.0.0.1:65030
                                                              tcp-discovery: 9000/tcp -> 127.0.0.1:65031
                                                              udp-discovery: 9000/udp -> 127.0.0.1:60784
                                                              validator-metrics: 5064/tcp -> 127.0.0.1:65029
c34417bea5fa   cl-client-2                                    http: 4000/tcp -> 127.0.0.1:65037                RUNNING
                                                              metrics: 8008/tcp -> 127.0.0.1:65035
                                                              tcp-discovery: 9000/tcp -> 127.0.0.1:65036
                                                              udp-discovery: 9000/udp -> 127.0.0.1:63581
e19738e6329d   el-client-0                                    engine-rpc: 8551/tcp -> 127.0.0.1:64986          RUNNING
                                                              rpc: 8545/tcp -> 127.0.0.1:64988
                                                              tcp-discovery: 30303/tcp -> 127.0.0.1:64987
                                                              udp-discovery: 30303/udp -> 127.0.0.1:55706
                                                              ws: 8546/tcp -> 127.0.0.1:64989
e904687449d9   el-client-1                                    engine-rpc: 8551/tcp -> 127.0.0.1:64993          RUNNING
                                                              rpc: 8545/tcp -> 127.0.0.1:64995
                                                              tcp-discovery: 30303/tcp -> 127.0.0.1:64994
                                                              udp-discovery: 30303/udp -> 127.0.0.1:58096
                                                              ws: 8546/tcp -> 127.0.0.1:64996
ad6f401126fa   el-client-2                                    engine-rpc: 8551/tcp -> 127.0.0.1:65003          RUNNING
                                                              rpc: 8545/tcp -> 127.0.0.1:65001
                                                              tcp-discovery: 30303/tcp -> 127.0.0.1:65000
                                                              udp-discovery: 30303/udp -> 127.0.0.1:57269
                                                              ws: 8546/tcp -> 127.0.0.1:65002
12d04a9dbb69   prelaunch-data-generator-1680882122181135513   <none>                                           STOPPED
5b45f9c0504b   prelaunch-data-generator-1680882122192182847   <none>                                           STOPPED
3d4aaa75e218   prelaunch-data-generator-1680882122201668972   <none>                                           STOPPED
```

Herzlichen Glückwunsch! Sie haben Ihr lokales Testnetz erfolgreich so konfiguriert, dass es 3 Knoten anstelle von 1 hat. Um dieselben Workflows wie zuvor für Ihre Dapp auszuführen (Bereitstellung und Test), führen Sie dieselben Operationen wie zuvor durch, indem Sie `<$YOUR_PORT>` in der `localnet`-Struktur in Ihrer `hardhat.config.ts`-Konfigurationsdatei durch den Port der RPC-URI-Ausgabe eines beliebigen `el-client-<num>`-Dienstes in Ihrem neuen lokalen 3-Knoten-Testnetz ersetzen.

## Fazit {#conclusion}

Und das war's! Um diesen kurzen Leitfaden zusammenzufassen, haben Sie:

- Ein lokales Ethereum-Testnetz über Docker mit Kurtosis erstellt
- Ihre lokale Dapp-Entwicklungsumgebung mit dem lokalen Ethereum-Netzwerk verbunden
- Eine Dapp bereitgestellt und einen einfachen Test dafür im lokalen Ethereum-Netzwerk ausgeführt
- Das zugrunde liegende Ethereum-Netzwerk so konfiguriert, dass es 3 Knoten hat

Wir würden uns freuen, von Ihnen zu hören, was für Sie gut gelaufen ist, was verbessert werden könnte, oder um Ihre Fragen zu beantworten. Zögern Sie nicht, uns über [GitHub](https://github.com/kurtosis-tech/kurtosis/issues/new/choose) zu kontaktieren oder [uns eine E-Mail zu schreiben](mailto:feedback@kurtosistech.com)!

### Weitere Beispiele und Leitfäden {#other-examples-guides}

Wir empfehlen Ihnen, sich unseren [Schnellstart](https://docs.kurtosis.com/quickstart) (wo Sie eine Postgres-Datenbank und eine API darauf aufbauen) und unsere anderen Beispiele in unserem [awesome-kurtosis-Repository](https://github.com/kurtosis-tech/awesome-kurtosis) anzusehen, wo Sie einige großartige Beispiele finden, einschließlich Paketen für:

- [Das Starten desselben lokalen Ethereum-Testnetzes](https://github.com/kurtosis-tech/eth2-package), jedoch mit zusätzlichen verbundenen Diensten wie einem Transaktions-Spammer (zur Simulation von Transaktionen), einem Fork-Monitor und einer verbundenen Grafana- und Prometheus-Instanz
- Die Durchführung eines [Subnetzwerk-Tests](https://github.com/kurtosis-tech/awesome-kurtosis/tree/main/ethereum-network-partition-test) für dasselbe lokale Ethereum-Netzwerk