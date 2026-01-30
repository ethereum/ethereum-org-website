---
title: "Jak rozwijać i testować dApp na lokalnej, wieloklientowej sieci testowej"
description: "Ten poradnik najpierw przeprowadzi Cię przez proces tworzenia i konfigurowania wieloklientowej lokalnej sieci testowej Ethereum, a następnie pokaże, jak użyć tej sieci testowej do wdrożenia i przetestowania dApp."
author: "Tedi Mitiku"
tags:
  [
    "klienci",
    "węzły",
    "smart kontrakty",
    "kompozycyjność",
    "warstwa konsensusu",
    "warstwa wykonawcza",
    "testowanie"
  ]
skill: intermediate
lang: pl
published: 2023-04-11
---

## Wprowadzenie {#introduction}

Ten poradnik przeprowadzi Cię przez proces tworzenia konfigurowalnej lokalnej sieci testowej Ethereum, wdrażania na niej smart kontraktu i używania sieci testowej do przeprowadzania testów Twojej dApp. Ten poradnik jest przeznaczony dla deweloperów dApp, którzy chcą rozwijać i testować swoje dapki lokalnie w różnych konfiguracjach sieci przed wdrożeniem na działającą sieć testową lub sieć główną.

W tym poradniku:

- Utworzyć lokalną sieć testową Ethereum za pomocą pakietu [`eth-network-package`](https://github.com/kurtosis-tech/eth-network-package) przy użyciu [Kurtosis](https://www.kurtosis.com/),
- Połączyć swoje środowisko programistyczne dApp Hardhat z lokalną siecią testową w celu kompilacji, wdrożenia i przetestowania dApp oraz
- Skonfigurować lokalną sieć testową, w tym parametry takie jak liczba węzłów i określone pary klientów EL/CL, aby umożliwić procesy programistyczne i testowe w różnych konfiguracjach sieci.

### Czym jest Kurtosis? {#what-is-kurtosis}

[Kurtosis](https://www.kurtosis.com/) to komponowalny system budowania przeznaczony do konfigurowania wielokontenerowych środowisk testowych. W szczególności umożliwia deweloperom tworzenie odtwarzalnych środowisk, które wymagają dynamicznej logiki konfiguracji, takich jak sieci testowe blockchain.

W tym poradniku pakiet eth-network-package Kurtosis uruchamia lokalną sieć testową Ethereum z obsługą klienta warstwy wykonawczej (EL) [`geth`](https://geth.ethereum.org/), a także klientów warstwy konsensusu (CL) [`teku`](https://consensys.io/teku), [`lighthouse`](https://lighthouse.sigmaprime.io/) i [`lodestar`](https://lodestar.chainsafe.io/). Ten pakiet służy jako konfigurowalna i komponowalna alternatywa dla sieci w frameworkach takich jak Hardhat Network, Ganache i Anvil. Kurtosis oferuje deweloperom większą kontrolę i elastyczność nad sieciami testowymi, których używają, co jest głównym powodem, dla którego [Ethereum Foundation użyła Kurtosis do testowania Połączenia](https://www.kurtosis.com/blog/testing-the-ethereum-merge) i nadal używa go do testowania aktualizacji sieci.

## Konfiguracja Kurtosis {#setting-up-kurtosis}

Zanim przejdziesz dalej, upewnij się, że masz:

- [Zainstalowany i uruchomiony silnik Docker](https://docs.kurtosis.com/install/#i-install--start-docker) na swoim komputerze lokalnym
- [Zainstalowany Kurtosis CLI](https://docs.kurtosis.com/install#ii-install-the-cli) (lub zaktualizowany do najnowszej wersji, jeśli masz już zainstalowany CLI)
- Zainstalowane [Node.js](https://nodejs.org/en), [yarn](https://classic.yarnpkg.com/lang/en/docs/install/#mac-stable) i [npx](https://www.npmjs.com/package/npx) (dla Twojego środowiska dApp)

## Tworzenie lokalnej sieci testowej Ethereum {#instantiate-testnet}

Aby uruchomić lokalną sieć testową Ethereum, wykonaj:

```python
kurtosis --enclave local-eth-testnet run github.com/kurtosis-tech/eth-network-package
```

Uwaga: to polecenie nazywa Twoją sieć: \"local-eth-testnet\" za pomocą flagi `--enclave`.

Kurtosis wydrukuje kroki, które podejmuje w tle, podczas gdy interpretuje, waliduje, a następnie wykonuje instrukcje. Na końcu powinieneś zobaczyć dane wyjściowe podobne do poniższych:

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

Gratulacje! Użyłeś Kurtosis do utworzenia lokalnej sieci testowej Ethereum z klientem CL (`lighthouse`) i klientem EL (`geth`) za pośrednictwem Dockera.

### Podsumowanie {#review-instantiate-testnet}

W tej sekcji wykonałeś polecenie, które poleciło Kurtosis użycie pakietu [`eth-network-package` hostowanego zdalnie na GitHub](https://github.com/kurtosis-tech/eth-network-package) do uruchomienia lokalnej sieci testowej Ethereum w enklawie Kurtosis [Enclave](https://docs.kurtosis.com/advanced-concepts/enclaves/). Wewnątrz enklawy znajdziesz zarówno \"artefakty plików\", jak i \"usługi użytkownika\".

[Artefakty plików](https://docs.kurtosis.com/advanced-concepts/files-artifacts/) w Twojej enklawie zawierają wszystkie dane wygenerowane i wykorzystane do uruchomienia klientów EL i CL. Dane zostały utworzone za pomocą usługi `prelaunch-data-generator` zbudowanej z tego [obrazu Docker](https://github.com/ethpandaops/ethereum-genesis-generator)

Usługi użytkownika wyświetlają wszystkie skonteneryzowane usługi działające w Twojej enklawie. Zauważysz, że został utworzony pojedynczy węzeł, zawierający zarówno klienta EL, jak i klienta CL.

## Połącz swoje środowisko programistyczne dApp z lokalną siecią testową Ethereum {#connect-your-dapp}

### Konfiguracja środowiska programistycznego dApp {#set-up-dapp-env}

Teraz, gdy masz działającą lokalną sieć testową, możesz połączyć swoje środowisko programistyczne dApp, aby korzystać z lokalnej sieci testowej. W tym poradniku zostanie użyty framework Hardhat do wdrożenia dApp do gry w blackjacka na Twojej lokalnej sieci testowej.

Aby skonfigurować środowisko programistyczne dApp, sklonuj repozytorium zawierające naszą przykładową dApp i zainstaluj jego zależności, uruchamiając:

```python
git clone https://github.com/kurtosis-tech/awesome-kurtosis.git && cd awesome-kurtosis/smart-contract-example && yarn
```

Użyty tutaj folder [smart-contract-example](https://github.com/kurtosis-tech/awesome-kurtosis/tree/main/smart-contract-example) zawiera typową konfigurację dla dewelopera dApp korzystającego z frameworka [Hardhat](https://hardhat.org/):

- [`contracts/`](https://github.com/kurtosis-tech/awesome-kurtosis/tree/main/smart-contract-example/contracts) zawiera kilka prostych smart kontraktów dla dApp do gry w Blackjacka
- [`scripts/`](https://github.com/kurtosis-tech/awesome-kurtosis/tree/main/smart-contract-example/scripts) zawiera skrypt do wdrożenia kontraktu tokena na Twojej lokalnej sieci Ethereum
- [`test/`](https://github.com/kurtosis-tech/awesome-kurtosis/tree/main/smart-contract-example/test) zawiera prosty test .js dla Twojego kontraktu tokena, aby potwierdzić, że dla każdego gracza w naszej dApp do gry w Blackjacka zostało wybitych 1000 żetonów
- [`hardhat.config.ts`](https://github.com/kurtosis-tech/awesome-kurtosis/blob/main/smart-contract-example/hardhat.config.ts) konfiguruje Twoją instalację Hardhat

### Konfiguracja Hardhat do korzystania z lokalnej sieci testowej {#configure-hardhat}

Po skonfigurowaniu środowiska programistycznego dApp, połączysz teraz Hardhat z lokalną siecią testową Ethereum wygenerowaną za pomocą Kurtosis. Aby to osiągnąć, zastąp `<$YOUR_PORT>` w strukturze `localnet` w pliku konfiguracyjnym `hardhat.config.ts` portem z danych wyjściowych rpc uri dowolnej usługi `el-client-<num>`. W tym przykładowym przypadku portem byłoby `64248`. Twój port będzie inny.

Przykład w `hardhat.config.ts`:

```js
localnet: {
url: 'http://127.0.0.1:<$YOUR_PORT>',// TODO: ZASTĄP $YOUR_PORT PORTEM URI WĘZŁA WYGENEROWANYM PRZEZ PAKIET SIECI ETH KURTOSIS

// To są klucze prywatne powiązane z prefinansowanymi kontami testowymi utworzonymi przez eth-network-package
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

Po zapisaniu pliku Twoje środowisko programistyczne dApp Hardhat jest połączone z lokalną siecią testową Ethereum! Możesz sprawdzić, czy Twoja sieć testowa działa, uruchamiając:

```python
npx hardhat balances --network localnet
```

Dane wyjściowe powinny wyglądać mniej więcej tak:

```python
0x878705ba3f8Bc32FCf7F4CAa1A35E72AF65CF766 has balance 10000000000000000000000000
0x4E9A3d9D1cd2A2b2371b8b3F489aE72259886f1A has balance 10000000000000000000000000
0xdF8466f277964Bb7a0FFD819403302C34DCD530A has balance 10000000000000000000000000
0x5c613e39Fc0Ad91AfDA24587e6f52192d75FBA50 has balance 10000000000000000000000000
0x375ae6107f8cC4cF34842B71C6F746a362Ad8EAc has balance 10000000000000000000000000
0x1F6298457C5d76270325B724Da5d1953923a6B88 has balance 10000000000000000000000000
```

To potwierdza, że Hardhat korzysta z Twojej lokalnej sieci testowej i wykrywa wstępnie zasilone konta utworzone przez `eth-network-package`.

### Wdróż i przetestuj swoją dApp lokalnie {#deploy-and-test-dapp}

Gdy środowisko programistyczne dApp jest w pełni połączone z lokalną siecią testową Ethereum, możesz teraz uruchamiać procesy programistyczne i testowe dla swojej dApp, korzystając z lokalnej sieci testowej.

Aby skompilować i wdrożyć smart kontrakt `ChipToken.sol` do lokalnego prototypowania i rozwoju, uruchom:

```python
npx hardhat compile
npx hardhat run scripts/deploy.ts --network localnet
```

Dane wyjściowe powinny wyglądać mniej więcej tak:

```python
ChipToken wdrożono do: 0xAb2A01BC351770D09611Ac80f1DE076D56E0487d
```

Teraz spróbuj uruchomić test `simple.js` na swojej lokalnej dApp, aby potwierdzić, że każdemu graczowi w naszej dApp Blackjack zostało wybite 1000 żetonów:

Dane wyjściowe powinny wyglądać mniej więcej tak:

```python
npx hardhat test --network localnet
```

Dane wyjściowe powinny wyglądać mniej więcej tak:

```python
ChipToken
    wybij
      ✔ powinien wybić 1000 żetonów dla GRACZA PIERWSZEGO

  1 przeszedł (654ms)
```

### Podsumowanie {#review-dapp-workflows}

W tym momencie skonfigurowałeś środowisko programistyczne dApp, połączyłeś je z lokalną siecią Ethereum utworzoną przez Kurtosis oraz skompilowałeś, wdrożyłeś i uruchomiłeś prosty test dla swojej dApp.

Teraz zbadajmy, jak można skonfigurować podstawową sieć do testowania naszych dapek w różnych konfiguracjach sieci.

## Konfiguracja lokalnej sieci testowej Ethereum {#configure-testnet}

### Zmiana konfiguracji klienta i liczby węzłów {#configure-client-config-and-num-nodes}

Twoją lokalną sieć testową Ethereum można skonfigurować do używania różnych par klientów EL i CL, a także różnej liczby węzłów, w zależności od scenariusza i konkretnej konfiguracji sieci, którą chcesz rozwijać lub testować. Oznacza to, że po skonfigurowaniu możesz uruchomić dostosowaną lokalną sieć testową i używać jej do uruchamiania tych samych procesów (wdrażanie, testy itp.) w różnych konfiguracjach sieci, aby upewnić się, że wszystko działa zgodnie z oczekiwaniami. Aby dowiedzieć się więcej o innych parametrach, które możesz modyfikować, odwiedź ten link.

Spróbuj! Możesz przekazać różne opcje konfiguracyjne do `eth-network-package` za pośrednictwem pliku JSON. Ten plik JSON z parametrami sieci dostarcza określonych konfiguracji, których Kurtosis użyje do skonfigurowania lokalnej sieci Ethereum.

Weź domyślny plik konfiguracyjny i edytuj go, aby uruchomić dwa węzły z różnymi parami EL/CL:

- Węzeł 1 z `geth`/`lighthouse`
- Węzeł 2 z `geth`/`lodestar`
- Węzeł 3 z `geth`/`teku`

Ta konfiguracja tworzy heterogeniczną sieć implementacji węzłów Ethereum do testowania Twojej dApp. Twój plik konfiguracyjny powinien teraz wyglądać następująco:

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

Każda struktura `participants` odpowiada węzłowi w sieci, więc 3 struktury `participants` poinformują Kurtosis, aby uruchomić 3 węzły w Twojej sieci. Każda struktura `participants` pozwoli Ci określić parę EL i CL używaną dla tego konkretnego węzła.

Struktura `network_params` konfiguruje ustawienia sieci, które są używane do tworzenia plików genezy dla każdego węzła, a także inne ustawienia, takie jak sekundy na slot sieci.

Zapisz edytowany plik parametrów w dowolnym katalogu (w poniższym przykładzie jest on zapisany na pulpicie), a następnie użyj go do uruchomienia pakietu Kurtosis, uruchamiając:

```python
kurtosis clean -a && kurtosis run --enclave local-eth-testnet github.com/kurtosis-tech/eth-network-package \"$(cat ~/eth-network-params.json)\"
```

Uwaga: polecenie `kurtosis clean -a` jest tutaj używane, aby poinstruować Kurtosis, aby zniszczył starą sieć testową i jej zawartość przed uruchomieniem nowej.

Ponownie, Kurtosis będzie działać przez chwilę i wydrukuje poszczególne kroki, które mają miejsce. Ostatecznie, dane wyjściowe powinny wyglądać mniej więcej tak:

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

Gratulacje! Pomyślnie skonfigurowałeś swoją lokalną sieć testową, aby miała 3 węzły zamiast 1. Aby uruchomić te same procesy, co wcześniej, w swojej dApp (wdrażanie i testowanie), wykonaj te same operacje, co poprzednio, zastępując `<$YOUR_PORT>` w strukturze `localnet` w pliku konfiguracyjnym `hardhat.config.ts` portem z danych wyjściowych rpc uri dowolnej usługi `el-client-<num>` w nowej, 3-węzłowej lokalnej sieci testowej.

## Wnioski {#conclusion}

I to wszystko! Podsumowując ten krótki poradnik, Ty:

- Utworzyłeś lokalną sieć testową Ethereum za pośrednictwem Dockera przy użyciu Kurtosis
- Połączyłeś swoje lokalne środowisko programistyczne dApp z lokalną siecią Ethereum
- Wdrożyłeś dApp i uruchomiłeś prosty test na lokalnej sieci Ethereum
- Skonfigurowałeś podstawową sieć Ethereum, aby miała 3 węzły

Chcielibyśmy usłyszeć od Ciebie, co poszło Ci dobrze, co można by poprawić, lub odpowiedzieć na wszelkie Twoje pytania. Nie wahaj się skontaktować z nami za pośrednictwem [GitHub](https://github.com/kurtosis-tech/kurtosis/issues/new/choose) lub [napisz do nas e-mail](mailto:feedback@kurtosistech.com)!

### Inne przykłady i poradniki {#other-examples-guides}

Zachęcamy do zapoznania się z naszym [szybkim startem](https://docs.kurtosis.com/quickstart) (gdzie zbudujesz bazę danych Postgres i API) oraz innymi przykładami w naszym repozytorium [awesome-kurtosis](https://github.com/kurtosis-tech/awesome-kurtosis), gdzie znajdziesz świetne przykłady, w tym pakiety do:

- Uruchamiania tej samej lokalnej sieci testowej Ethereum, ale z podłączonymi dodatkowymi usługami, takimi jak spamer transakcji (do symulowania transakcji), monitor forka oraz podłączona instancja Grafana i Prometheus
- Przeprowadzania [testu podsieci](https://github.com/kurtosis-tech/awesome-kurtosis/tree/main/ethereum-network-partition-test) na tej samej lokalnej sieci Ethereum
