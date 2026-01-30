---
title: Uruchom węzeł Ethereum na Raspberry Pi 4
description: Sflashuj swoje Raspberry Pi 4, podłącz kabel ethernet, podłącz dysk SSD i włącz urządzenie, aby zmienić Raspberry Pi 4 w pełny węzeł Ethereum + walidator
author: "EthereumOnArm"
tags:
  [
    "klienci",
    "warstwa wykonawcza",
    "warstwa konsensusu",
    "węzły"
  ]
lang: pl
skill: intermediate
published: 2022-06-10
source: Ethereum na ARM
sourceUrl: https://ethereum-on-arm-documentation.readthedocs.io/en/latest/
---

**Ethereum on Arm to niestandardowy obraz Linuksa, który może zamienić Raspberry Pi w węzeł Ethereum.**

Aby użyć Ethereum on Arm do przekształcenia Raspberry Pi w węzeł Ethereum, zalecany jest następujący sprzęt:

- Płytka Raspberry 4 (model B 8GB), Odroid M1 lub Rock 5B (8GB/16GB RAM)
- Karta MicroSD (minimum 16 GB Klasy 10)
- Dysk SSD o pojemności co najmniej 2 TB z USB 3.0 lub dysk SSD z obudową USB na SATA.
- Zasilacz
- Kabel Ethernet
- Przekierowanie portów (zobacz klientów, aby uzyskać więcej informacji)
- Obudowa z radiatorem i wentylatorem
- Klawiatura USB, monitor i kabel HDMI (micro-HDMI) (opcjonalnie)

## Dlaczego warto uruchomić Ethereum na ARM? {#why-run-ethereum-on-arm}

Płyty ARM to bardzo przystępne cenowo, elastyczne i małe komputery. Są dobrym wyborem do uruchamiania węzłów Ethereum, ponieważ można je tanio kupić, skonfigurować tak, aby wszystkie ich zasoby skupiały się tylko na węźle, co czyni je wydajnymi, zużywają niewielkie ilości energii i są fizycznie małe, dzięki czemu mogą dyskretnie zmieścić się w każdym domu. Bardzo łatwo jest również uruchomić węzły, ponieważ kartę MicroSD Raspberry Pi można po prostu sflashować gotowym obrazem, bez konieczności pobierania lub budowania oprogramowania.

## Jak to działa? {#how-does-it-work}

Karta pamięci Raspberry Pi jest flashowana gotowym obrazem. Ten obraz zawiera wszystko, co jest potrzebne do uruchomienia węzła Ethereum. Po sflashowaniu karty, wszystko co użytkownik musi zrobić, to włączyć Raspberry Pi. Wszystkie procesy wymagane do uruchomienia węzła są uruchamiane automatycznie. Działa to, ponieważ karta pamięci zawiera system operacyjny (OS) oparty na systemie Linux, na którym automatycznie uruchamiane są procesy na poziomie systemu, które przekształcają urządzenie w węzeł Ethereum.

Ethereum nie może być uruchomione przy użyciu popularnego systemu operacyjnego Linux dla Raspberry Pi "Raspbian", ponieważ Raspbian wciąż używa 32-bitowej architektury, co prowadzi użytkowników Ethereum do problemów z pamięcią, a klienci konsensusu nie obsługują 32-bitowych plików binarnych. Aby to przezwyciężyć, zespół Ethereum on Arm przeniósł się na natywny 64-bitowy system operacyjny o nazwie "Armbian".

**Obrazy zajmują się wszystkimi niezbędnymi krokami**, od konfiguracji środowiska i formatowania dysku SSD po instalację i uruchomienie oprogramowania Ethereum, a także uruchomienie synchronizacji blockchain.

## Uwaga na temat klientów wykonawczych i konsensusu {#note-on-execution-and-consensus-clients}

Obraz Ethereum on Arm zawiera preinstalowanych klientów wykonawczych i konsensusu jako usługi. Węzeł Ethereum wymaga, aby obaj klienci byli zsynchronizowani i działali. Wymagane jest jedynie pobranie i sflashowanie obrazu, a następnie uruchomienie usług. Obraz jest wstępnie załadowany następującymi klientami wykonawczymi:

- Geth
- Nethermind
- Besu

oraz następującymi klientami konsensusu:

- Lighthouse
- Nimbus
- Prysm
- Teku

Należy wybrać po jednym z każdego do uruchomienia - wszyscy klienci wykonawczy są kompatybilni ze wszystkimi klientami konsensusu. Jeśli nie wybierzesz jawnie klienta, węzeł powróci do swoich wartości domyślnych - Geth i Lighthouse - i uruchomi je automatycznie po włączeniu zasilania płyty. Musisz otworzyć port 30303 na swoim routerze, aby Geth mógł znaleźć i połączyć się z peerami.

## Pobieranie obrazu {#downloading-the-image}

Obraz Ethereum dla Raspberry Pi 4 to obraz typu "plug and play", który automatycznie instaluje i konfiguruje zarówno klientów wykonawczych, jak i konsensusu, konfigurując ich do komunikacji między sobą i połączenia z siecią Ethereum. Wszystko, co użytkownik musi zrobić, to uruchomić ich procesy za pomocą prostego polecenia.

Pobierz obraz Raspberry Pi z [Ethereum na ARM](https://ethereumonarm-my.sharepoint.com/:u:/p/dlosada/Ec_VmUvr80VFjf3RYSU-NzkBmj2JOteDECj8Bibde929Gw?download=1) i zweryfikuj hasz SHA256:

```sh
# Z katalogu zawierającego pobrany obraz
shasum -a 256 ethonarm_22.04.00.img.zip
# Wynikowy hasz powinien być: fb497e8f8a7388b62d6e1efbc406b9558bee7ef46ec7e53083630029c117444f
```

Zwróć uwagę, że obrazy dla płyt Rock 5B i Odroid M1 są dostępne na stronie [pobierania](https://ethereum-on-arm-documentation.readthedocs.io/en/latest/quick-guide/download-and-install.html) Ethereum-on-Arm.

## Flashowanie MicroSD {#flashing-the-microsd}

Karta MicroSD, która będzie używana w Raspberry Pi, powinna najpierw zostać włożona do komputera stacjonarnego lub laptopa, aby można ją było sflashować. Następnie poniższe polecenia terminala sflashują pobrany obraz na kartę SD:

```shell
# sprawdź nazwę karty MicroSD
sudo fdisk -l

>> sdxxx
```

Bardzo ważne jest, aby podać poprawną nazwę, ponieważ następne polecenie zawiera `dd`, które całkowicie usuwa istniejącą zawartość karty przed zapisaniem na niej obrazu. Aby kontynuować, przejdź do katalogu zawierającego spakowany obraz:

```shell
# rozpakuj i sflashuj obraz
unzip ethonarm_22.04.00.img.zip
sudo dd bs=1M if=ethonarm_22.04.00.img of=/dev/<sdxx> conv=fdatasync status=progress
```

Karta jest teraz sflashowana, więc można ją włożyć do Raspberry Pi.

## Uruchom węzeł {#start-the-node}

Po włożeniu karty SD do Raspberry Pi, podłącz kabel Ethernet i dysk SSD, a następnie włącz zasilanie. System operacyjny uruchomi się i automatycznie rozpocznie wykonywanie wstępnie skonfigurowanych zadań, które przekształcą Raspberry Pi w węzeł Ethereum, w tym instalację i budowanie oprogramowania klienta. Prawdopodobnie zajmie to 10-15 minut.

Gdy wszystko zostanie zainstalowane i skonfigurowane, zaloguj się do urządzenia za pomocą połączenia ssh lub bezpośrednio za pomocą terminala, jeśli do płyty podłączony jest monitor i klawiatura. Użyj konta `ethereum` do zalogowania się, ponieważ ma ono uprawnienia wymagane do uruchomienia węzła.

```shell
Użytkownik: ethereum
Hasło: ethereum
```

Domyślny klient wykonawczy, Geth, uruchomi się automatycznie. Możesz to potwierdzić, sprawdzając logi za pomocą następującego polecenia terminala:

```sh
sudo journalctl -u geth -f
```

Klient konsensusu musi być uruchomiony jawnie. Aby to zrobić, najpierw otwórz port 9000 na routerze, aby Lighthouse mógł znaleźć i połączyć się z peerami. Następnie włącz i uruchom usługę lighthouse:

```sh
sudo systemctl enable lighthouse-beacon
sudo systemctl start lighthouse-beacon
```

Sprawdź klienta za pomocą logów:

```sh
sudo journalctl -u lighthouse-beacon
```

Zwróć uwagę, że klient konsensusu zsynchronizuje się w kilka minut, ponieważ używa synchronizacji z punktu kontrolnego. Synchronizacja klienta wykonawczego potrwa dłużej – potencjalnie kilka godzin i nie rozpocznie się, dopóki klient konsensusu nie zakończy synchronizacji (dzieje się tak, ponieważ klient wykonawczy potrzebuje celu do synchronizacji, który zapewnia zsynchronizowany klient konsensusu).

Gdy usługi Geth i Lighthouse działają i są zsynchronizowane, Twoje Raspberry Pi jest teraz węzłem Ethereum! Najczęściej interakcja z siecią Ethereum odbywa się za pomocą konsoli Javascript Geth, którą można podłączyć do klienta Geth na porcie 8545. Możliwe jest również przesyłanie poleceń sformatowanych jako obiekty JSON za pomocą narzędzia do zapytań, takiego jak Curl. Zobacz więcej w [dokumentacji Geth](https://geth.ethereum.org/).

Geth jest wstępnie skonfigurowany do raportowania metryk na pulpicie nawigacyjnym Grafana, który można wyświetlić w przeglądarce. Bardziej zaawansowani użytkownicy mogą chcieć użyć tej funkcji do monitorowania kondycji swojego węzła, przechodząc do `ipaddress:3000` i podając `user: admin` i `passwd: ethereum`.

## Walidatorzy {#validators}

Walidator można również opcjonalnie dodać do klienta konsensusu. Oprogramowanie walidatora pozwala węzłowi aktywnie uczestniczyć w konsensusie i zapewnia sieci bezpieczeństwo kryptoekonomiczne. Za tę pracę otrzymujesz nagrodę w ETH. Aby uruchomić walidatora, musisz najpierw posiadać 32 ETH, które muszą zostać zdeponowane w kontrakcie depozytowym. Wpłaty można dokonać, postępując zgodnie z przewodnikiem krok po kroku na [Launchpadzie](https://launchpad.ethereum.org/). Zrób to na komputerze stacjonarnym/laptopie, ale nie generuj kluczy — można to zrobić bezpośrednio na Raspberry Pi.

Otwórz terminal na Raspberry Pi i uruchom następujące polecenie, aby wygenerować klucze depozytowe:

```
sudo apt-get update
sudo apt-get install staking-deposit-cli
cd && deposit new-mnemonic --num_validators 1
```

(Lub pobierz [staking-deposit-cli](https://github.com/ethereum/staking-deposit-cli), aby uruchomić go na maszynie odizolowanej od sieci i uruchom polecenie `deposit new-mnemnonic`)

Przechowuj frazę mnemoniczną w bezpiecznym miejscu! Powyższe polecenie wygenerowało dwa pliki w keystorze węzła: klucze walidatora i plik danych depozytowych. Dane depozytowe muszą zostać przesłane do Launchpada, więc muszą zostać skopiowane z Raspberry Pi na komputer stacjonarny/laptop. Można to zrobić za pomocą połączenia ssh lub dowolnej innej metody kopiuj/wklej.

Gdy plik danych depozytowych jest dostępny na komputerze, na którym uruchomiony jest Launchpad, można go przeciągnąć i upuścić na znak `+` na ekranie Launchpada. Postępuj zgodnie z instrukcjami na ekranie, aby wysłać transakcję do kontraktu depozytowego.

Wracając do Raspberry Pi, można uruchomić walidatora. Wymaga to zaimportowania kluczy walidatora, ustawienia adresu do zbierania nagród, a następnie uruchomienia wstępnie skonfigurowanego procesu walidatora. Poniższy przykład dotyczy Lighthouse – instrukcje dla innych klientów konsensusu są dostępne w [dokumentacji Ethereum on Arm](https://ethereum-on-arm-documentation.readthedocs.io/en/latest/):

```shell
# zaimportuj klucze walidatora
lighthouse account validator import --directory=/home/ethereum/validator_keys

# ustaw adres nagrody
sudo sed -i 's/<ETH_ADDRESS>' /etc/ethereum/lighthouse-validator.conf

# uruchom walidatora
sudo systemctl start lighthouse-validator
```

Gratulacje, masz teraz pełny węzeł Ethereum i walidatora działającego na Raspberry Pi!

## Więcej szczegółów {#more-details}

Ta strona zawiera przegląd sposobu konfiguracji węzła i walidatora Geth-Lighthouse przy użyciu Raspberry Pi. Bardziej szczegółowe instrukcje są dostępne na [stronie internetowej Ethereum-on-Arm](https://ethereum-on-arm-documentation.readthedocs.io/en/latest/index.html).

## Twoja opinia jest mile widziana {#feedback-appreciated}

Wiemy, że Raspberry Pi ma ogromną bazę użytkowników, która może mieć bardzo pozytywny wpływ na kondycję sieci Ethereum.
Zapoznaj się ze szczegółami tego samouczka, spróbuj uruchomić go na sieciach testowych, sprawdź GitHub Ethereum on Arm, przekaż opinie, zgłaszaj problemy i pull requesty oraz pomóż w rozwoju technologii i dokumentacji!

## Materiały źródłowe {#references}

1. https://ubuntu.com/download/raspberry-pi
2. https://wikipedia.org/wiki/Port_forwarding
3. https://prometheus.io
4. https://grafana.com
5. https://forum.armbian.com/topic/5565-zram-vs-swap/
6. https://geth.ethereum.org
7. https://nethermind.io
8. https://www.hyperledger.org/projects/besu
9. https://github.com/prysmaticlabs/prysm
10. https://lighthouse.sigmaprime.io
11. https://ethersphere.github.io/swarm-home
12. https://raiden.network
13. https://ipfs.io
14. https://status.im
15. https://vipnode.org
