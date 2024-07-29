---
title: Jak zmienić Raspberry Pi 4 w węzeł, po prostu flashując kartę MicroSD
description: Flash Raspberry Pi 4, podłącz kabel Ethernet, podłącz dysk SSD i włącz urządzenie, aby zmienić Raspberry Pi 4 w pełny węzeł Ethereum 1.0 lub Ethereum 2.0 (łańcuch śledzący / walidator)
author: "EthereumOnArm"
tags:
  - "klienty"
  - "eth2"
  - "węzły"
lang: pl
skill: intermediate
published: 2020-05-07
source: r/ethereum
sourceUrl: https://www.reddit.com/r/ethereum/comments/gf3nhg/ethereum_on_arm_raspberry_pi_4_images_release/
---

**TL;DR**: Flashuj Raspberry Pi 4, podłącz kabel Ethernet, podłącz dysk SSD i włącz urządzenie, aby zmienić Raspberry Pi 4 w pełne Ethereum 1.0 węzeł lub węzeł Ethereum 2.0 (łańcuch śledzący/ walidator)

[Dowiedz się więcej o Ethereum 2.0 (Eth2)](/roadmap/)

Najpierw trochę tła. Jak wiesz, napotkaliśmy pewne problemy z pamięcią [[1]](/developers/tutorials/run-node-raspberry-pi/#references) związane z obrazem Raspberry Pi 4 ponieważ Raspbian OS jest nadal 32-bitowy [[2]](/developers/tutorials/run-node-raspberry-pi/#references) (przynajmniej w przestrzeni użytkownika). Chociaż wolimy pozostać przy oficjalnym systemie operacyjnym, doszliśmy do wniosku, że aby rozwiązać te problemy, musimy przeprowadzić migrację do natywnego 64-bitowego systemu operacyjnego

Poza tym klienty Eth 2.0 nie obsługują 32-bitowych plików binarnych, więc użycie Raspbian wykluczyłoby Raspberry Pi 4 z uruchamiania węzła Eth 2.0 (oraz możliwość stakingu).

Po kilku testach wydajemy teraz 2 różne obrazy oparte na 64-bitowym Ubuntu 20.04 [[3]](/developers/tutorials/run-node-raspberry-pi/#references): Edycje Eth 1.0 i Eth 2.0.

Zasadniczo oba są tym samym obrazem i zawierają te same cechy obrazów opartych na Raspbian. Ale są one domyślnie skonfigurowane do uruchamiania oprogramowania Eth 1.0 lub Eth 2.0.

**Obrazy wykonują wszystkie niezbędne kroki**, od konfiguracji środowiska i formatowania dysku SSD po instalację i uruchomienie oprogramowania Ethereum, a także uruchomienie synchronizacji łańcucha bloków.

## Główne funkcje {#main-features}

- Na podstawie Ubuntu 20.04 64bit
- Automatyczna partycja i formatowanie dysku USB
- Dodaje pamięć wymiany (moduł jądra ZRAM + plik wymiany) na podstawie pracy Armbiana [[7]](/developers/tutorials/run-node-raspberry-pi/#references)
- Zmienia nazwę hosta na coś w rodzaju „ethnode-e2a3e6fe” w oparciu o hash MAC
- Uruchamia oprogramowanie jako usługę systemową i rozpoczyna synchronizację Blockchain
- Zawiera repozytorium APT do instalacji i aktualizacji oprogramowania Ethereum
- Zawiera panel monitorowania oparty na Grafana / Prometheus

## Dołączone oprogramowanie {#software-included}

Oba obrazy zawierają te same pakiety, jedyną różnicą między nimi jest to, że Eth 1.0 domyślnie uruchamia Geth, a Eth 2.0 domyślnie uruchamia łańcuch śledzący Prysm.

### Klienty Ethereum 1.0 {#execution-clients}

- Geth [[8]](/developers/tutorials/run-node-raspberry-pi/#references): 1.9.13 (oficjalny plik binarny)
- Parity [[9]](/developers/tutorials/run-node-raspberry-pi/#references): 2.7.2 (kompilacja krzyżowa)
- Nethermind [[10]](/developers/tutorials/run-node-raspberry-pi/#references): 1.8.28 (kompilacja krzyżowa)
- Hyperledger Besu [[11]](/developers/tutorials/run-node-raspberry-pi/#references): 1.4.4 (skompilowane)

### Klienty Ethereum 2.0 {#consensus-clients}

- Prysm [[12]](/developers/tutorials/run-node-raspberry-pi/#references): 1.0.0-alpha6 (oficjalny plik binarny)
- Lighthouse [[13]](/developers/tutorials/run-node-raspberry-pi/#references): 0.1.1 (kompilacja)

### Framework Ethereum {#ethereum-framework}

- Swarm [[14]](/developers/tutorials/run-node-raspberry-pi/#references): 0.5.7 (oficjalny plik binarny)
- Raiden Network [[15]](/developers/tutorials/run-node-raspberry-pi/#references): 0.200.0~rc1 (oficjalny plik binarny)
- IPFS [[16]](/developers/tutorials/run-node-raspberry-pi/#references): 0.5.0 (oficjalny plik binarny)
- Statusd [[17]](/developers/tutorials/run-node-raspberry-pi/#references): 0.52.3 (skompilowany)
- Vipnode [[18]](/developers/tutorials/run-node-raspberry-pi/#references): 2.3.3 (oficjalny plik binarny)

## Instrukcja instalacji i użytkowania {#installation-guide-and-usage}

### Zalecany sprzęt i konfiguracja {#recommended-hardware-and-setup}

- Raspberry 4 (model B) - 4GB
- Karta MicroSD (16 GB klasy 10 minimum)
- SSD USB 3.0 (zob. sekcja pamięci)
- Zasilacz
- Kabel Ethernet
- 30303 Przekierowanie portów (Eth 1.0) i 13000 przekierowanie portów (Eth 2.0) [[4]](/developers/tutorials/run-node-raspberry-pi/#references)
- Obudowa z radiatorem i wentylatorem (opcjonalna, ale zdecydowanie zalecana)
- Klawiatura USB, monitor i kabel HDMI (micro-HDMI) (opcjonalnie)

## Pamięć {#storage}

Będziesz potrzebować dysku SSD, aby uruchomić klientów Ethereum (bez dysku SSD nie ma absolutnie żadnej szansy na zsynchronizowanie łańcucha bloków Ethereum). Istnieją dwie opcje:

- Użyj przenośnego dysku SSD USB, takiego jak przenośny dysk SSD Samsung T5.
- Użyj etui na zewnętrzny dysk twardy USB 3.0 z dyskiem SSD. W naszym przypadku zastosowaliśmy obudowę dysku twardego Inateck 2.5 FE2011. Upewnij się, że kupujesz obudowę z chipem zgodnym z UAS, w szczególności jedną z nich: JMicron (JMS567 lub JMS578) lub ASMedia (ASM1153E).

W obu przypadkach unikaj uzyskiwania dysków SSD niskiej jakości, ponieważ jest to kluczowy element węzła i może drastycznie wpłynąć na wydajność (i czasy synchronizacji).

Pamiętaj, że musisz podłączyć dysk do portu USB 3.0 (niebieski)

## Pobieranie i instalacja obrazu {#image-download-and-installation}

### 1. Pobierz obrazy Eth 1.0 lub Eth 2.0 {#1-download-execution-or-consensus-images}

<ButtonLink href="https://ethraspbian.com/downloads/ubuntu-20.04-preinstalled-server-arm64+raspi-eth1.img.zip">Pobierz obraz Eth 1.0</ButtonLink>

sha256 7fa9370d13857dd6abcc8fde637c7a9a7e3a66b307d5c28b0c0d29a09c73c55c<ButtonLink href="https://ethraspbian.com/downloads/ubuntu-20.04-preinstalled-server-arm64+raspi-eth2.img.zip">Pobierz obraz Eth2</ButtonLink>

sha256 74c0c15b708720e5ae5cac324f1afded6316537fb17166109326755232cd316e

### 2. Wgraj obraz {#2-flash-the-image}

Włóż kartę microSD do komputera stacjonarnego / laptopa i pobierz plik (na przykład Eth 1.0):

```bash
wget https://ethraspbian.com/downloads/ubuntu-20.04-preinstalled-server-arm64+raspi-eth1.img.zip
```

Uwaga: jeśli nie czujesz się dobrze z wierszem poleceń lub jeśli używasz systemu Windows, możesz użyć [Etcher](https://etcher.io)

Otwórz terminal i sprawdź nazwę swojego urządzenia MicroSD, które działa:

```bash
sudo fdisk -l
```

Powinieneś zobaczyć urządzenie o nazwie mmcblk0 lub sdd. Rozpakuj i wgraj obraz:

```bash
unzip ubuntu-20.04-preinstalled-server-arm64+raspi-eth1.img.zip
sudo dd bs=1M if=ubuntu-20.04-preinstalled-server-arm64+raspi-eth1.img of=/dev/mmcblk0 && sync
```

### 3. Włóż microSD do Raspberry Pi 4. Podłącz kabel Ethernet i podłącz dysk USB SSD (upewnij się, że używasz niebieskiego portu). {#3-insert-the-microsd-into-the-raspberry-pi-4-connect-an-ethernet-cable-and-attach-the-usb-ssd-disk-make-sure-you-are-using-a-blue-port}

### 4. Włącz urządzenie {#4-power-on-the-device}

System operacyjny Ubuntu uruchomi się za mniej niż minutę, ale **trzeba poczekać około 10 minut**, aby skrypt mógł wykonać niezbędne zadania, aby zmienić urządzenie w węzeł Ethereum i zrestartuj Raspberry.

W zależności od obrazu uruchomisz:

- Eth 1.0: Geth jako domyślny klient synchronizujący łańcuch bloków
- Eth2: Prysm jako domyślny klient synchronizujący łańcuch śledzący (sieć testowa Topaz)

### 5. Zaloguj się {#5-log-in}

Możesz zalogować się przez SSH lub za pomocą konsoli (jeśli masz podłączony monitor i klawiaturę)

```bash
User: ethereum
Password: ethereum
```

Zostaniesz poproszony o zmianę hasła przy pierwszym logowaniu, więc będziesz musiał zalogować się dwukrotnie.

### 6. Otwórz port 30303 dla Getha i 13000, jeśli używasz łańcucha śledzącego Prysm. Jeśli nie wiesz, jak to zrobić, wygoogluj „przekierowanie portów”, a następnie model routera. {#6-open-30303-port-for-geth-and-13000-if-you-are-running-prysm-beacon-chain-if-you-dont-know-how-to-do-this-google-port-forwarding-followed-by-your-router-model}

### 7. Uzyskaj dane wyjściowe konsoli {#7-get-console-output}

Możesz zobaczyć, co dzieje się w tle, wpisując:

```bash
sudo tail -f /var/log/syslog
```

**Gratulacje. Korzystasz teraz z pełnego węzła Ethereum na swoim Raspberry Pi 4.**

## Synchronizowanie łańcucha bloków {#syncing-the-blockchain}

Teraz musisz poczekać na synchronizację łańcucha bloków. W przypadku Eth 1.0 zajmie to kilka dni w zależności od kilku czynników, ale możesz spodziewać się do około 5-7 dni.

Jeśli korzystasz z tesnetu Eth2 Topaz, możesz spodziewać się 1-2 dni czasu synchronizacji łańcucha śledzącego. Pamiętaj, że będziesz musiał ustawić walidator później, aby rozpocząć proces stakingu. [Jak uruchomić walidator Eth 2.0](/developers/tutorials/run-node-raspberry-pi/#validator)

## Pulpity kontrolne {#monitoring-dashboards}

W tej pierwszej wersji dołączyliśmy 3 panele monitorowania oparte na Prometheus [[5]](/developers/tutorials/run-node-raspberry-pi/#references) /Grafana [[6]](/developers/tutorials/run-node-raspberry-pi/#references) w celu monitorowania danych węzła i klientów (Geth i Besu). Możesz uzyskać dostęp przez przeglądarkę internetową:

```bash
URL: http://your_raspberrypi_IP:3000
User: admin
Password: ethereum
```

## Przełączanie klientów {#switching-clients}

Wszyscy klienci działają jako usługa systemowa. Jest to ważne, ponieważ jeśli pojawi się problem, system automatycznie odrodzi proces.

Łańcuch śledzący Geth i Prysm jest uruchamiany domyślnie (w zależności od tego, co synchronizujesz, Eth 1.0 lub Eth2), więc jeśli chcesz przełączyć się na innych klientów (na przykład z Geth na Nethermind), musisz najpierw zatrzymać i wyłączyć Geth, oraz włącz i uruchom drugiego klienta:

```bash
sudo systemctl stop geth && sudo systemctl disable geth
```

Polecenia włączania i uruchamiania każdego klienta Eth 1.0:

```bash
sudo systemctl enable besu && sudo systemctl start besu
sudo systemctl enable nethermind && sudo systemctl start nethermind
sudo systemctl enable parity && sudo systemctl start parity
```

Eth2:

```bash
sudo systemctl stop prysm-beacon && sudo systemctl disable prysm-beacon
sudo systemctl start lighthouse && sudo systemctl enable lighthouse
```

## Zmiana parametrów {#changing-parameters}

Pliki konfiguracyjne klientów znajdują się w katalogu /etc/ethereum/. Możesz edytować te pliki i ponownie uruchomić usługę systemd, aby zmiany zaczęły obowiązywać. Jedynym wyjątkiem jest Nethermind, który dodatkowo posiada plik konfiguracyjny sieci głównej, który znajduje się tutaj:

```bash
/etc/nethermind/configs/mainnet.cfg
```

Dane klientów Blockchain są przechowywane na koncie domowym Ethereum w następujący sposób (zwróć uwagę na kropkę przed nazwą katalogu):

### Eth 1.0 {#execution-layer}

```bash
/home/ethereum/.geth
/home/ethereum/.parity
/home/ethereum/.besu
/home/ethereum/.nethermind
```

### Eth2 {#consensus-layer}

```bash
/home/ethereum/.eth2
/home/ethereum/.eth2validators
/home/ethereum/.lighthouse
```

## Nethermind i Hyperledger Besu {#nethermind-and-hyperledger-besu}

Te 2 wspaniałe klienty Eth 1.0 stały się świetną alternatywą dla Geth and Parity. Im większa różnorodność w sieci, tym lepiej, więc możesz spróbować i przyczynić się do poprawy stanu sieci.

Oba wymagają dalszych testów, więc wypróbuj je i zgłoś swoją opinię.

## Jak uruchomić walidator Eth 2.0 (staking) {#validator}

Gdy łańcuch śledzący sieci testowej Topaz zostanie zsynchronizowany, można uruchomić walidator na tym samym urządzeniu. Będziesz musiał postępować według [tych etapów uczestnictwa](https://prylabs.net/participate).

Po raz pierwszy, musisz utworzyć ręcznie konto, uruchamiając plik binarny „validator” i skonfigurować hasło. Po zakończeniu tego kroku możesz dodać hasło do `/etc/ethereum/prysm-validator.conf` i uruchomić walidator jako usługę systemową.

## Opinie są mile widziane! {#feedback-appreciated}

Włożyliśmy dużo pracy, próbując skonfigurować Raspberry Pi 4 jako pełny węzeł Ethereum, ponieważ wiemy, że ogromna baza użytkowników tego urządzenia może mieć bardzo pozytywny wpływ na sieć.

Proszę wziąć pod uwagę, że jest to pierwszy obraz oparty na Ubuntu 20.04, więc może być kilka błędów. Jeśli tak, otwórz zgłoszenie na [GitHub](https://github.com/diglos/ethereumonarm) lub skontaktuj się z nami na [Twitter](https://twitter.com/EthereumOnARM).

## Odniesienia {#references}

1. [geth repeatedly crashes with SIGSEGV](https://github.com/ethereum/go-ethereum/issues/20190)
2. [https://github.com/diglos/ethereumonarm](https://github.com/diglos/ethereumonarm)
3. https://ubuntu.com/download/raspberry-pi
4. https://wikipedia.org/wiki/Port_forwarding
5. https://prometheus.io
6. https://grafana.com
7. https://forum.armbian.com/topic/5565-zram-vs-swap/
8. https://geth.ethereum.org
9. https://github.com/openethereum/openethereum
10. https://nethermind.io
11. https://www.hyperledger.org/projects/besu
12. https://github.com/prysmaticlabs/prysm
13. https://lighthouse.sigmaprime.io
14. https://ethersphere.github.io/swarm-home
15. https://raiden.network
16. https://ipfs.io
17. https://status.im
18. https://vipnode.org
