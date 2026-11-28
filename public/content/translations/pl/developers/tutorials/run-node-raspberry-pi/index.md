---
title: "Uruchom węzeł Ethereum na Raspberry Pi 5"
description: "Sflashuj swoje Raspberry Pi 5, podłącz kabel Ethernet, podłącz dysk NVMe i włącz urządzenie, aby zmienić Raspberry Pi 5 w pełny węzeł Ethereum i walidator"
author: "EthereumOnArm"
tags: ["klienty", "warstwa wykonawcza", "warstwa konsensusu", "węzły"]
lang: pl
skill: intermediate
breadcrumb: "Węzeł na Raspberry Pi"
published: 2022-06-10
source: Ethereum on ARM
sourceUrl: https://ethereum-on-arm-documentation.readthedocs.io/en/latest/
---

**Ethereum on Arm to niestandardowy obraz systemu Linux, który może zmienić Raspberry Pi w węzeł Ethereum.**

Aby użyć Ethereum on Arm do zmiany Raspberry Pi w węzeł Ethereum, zalecany jest następujący sprzęt:

- Raspberry Pi 5 z 16 GB pamięci RAM
- Nakładka (HAT) NVMe dla Raspberry Pi 5, do podłączenia dysku NVMe
- Dysk SSD NVMe (M.2 2280), minimum 4 TB. Unikaj dysków z kontrolerem Phison, które mają znane problemy z kompatybilnością.
- Karta MicroSD (minimum 16 GB Class 10)
- Zasilacz
- Kabel Ethernet
- Przekierowanie portów (więcej informacji znajdziesz w dokumentacji klientów)
- Obudowa z radiatorem
- Klawiatura USB, monitor i kabel HDMI (micro-HDMI) (opcjonalnie)

Ethereum on Arm obsługuje również inne płyty ARM, takie jak NanoPC T6, Rock 5B i Orange Pi 5 Plus. Płyty te mają natywną obsługę NVMe, więc zespół Ethereum on Arm poleca je zamiast Raspberry Pi 5, jeśli kupujesz nowy sprzęt. Zobacz [listę zalecanego sprzętu](https://ethereum-on-arm-documentation.readthedocs.io/en/latest/overview/supported-hardware.html), aby uzyskać szczegółowe informacje. Reszta tego samouczka jest taka sama dla wszystkich obsługiwanych płyt, z wyjątkiem pliku obrazu, który pobierasz.

## Dlaczego warto uruchomić Ethereum na architekturze ARM? {#why-run-ethereum-on-arm}

Płyty ARM to bardzo przystępne cenowo, elastyczne i małe komputery. Są dobrym wyborem do uruchamiania węzłów Ethereum, ponieważ można je tanio kupić, skonfigurować tak, aby wszystkie ich zasoby skupiały się tylko na węźle, co czyni je wydajnymi, zużywają mało energii i są fizycznie małe, dzięki czemu dyskretnie zmieszczą się w każdym domu. Bardzo łatwo jest również uruchomić węzły, ponieważ kartę MicroSD Raspberry Pi można po prostu sflashować gotowym obrazem, bez konieczności pobierania lub budowania oprogramowania.

## Jak to działa? {#how-does-it-work}

Karta pamięci Raspberry Pi jest flashowana gotowym obrazem. Ten obraz zawiera wszystko, co jest potrzebne do uruchomienia węzła Ethereum. Po sflashowaniu karty jedyne, co użytkownik musi zrobić, to włączyć Raspberry Pi. Wszystkie procesy wymagane do uruchomienia węzła są uruchamiane automatycznie. Działa to w ten sposób, ponieważ karta pamięci zawiera system operacyjny (OS) oparty na systemie Linux, na którym automatycznie uruchamiane są procesy na poziomie systemu, które zmieniają urządzenie w węzeł Ethereum.

Obrazy Ethereum on Arm są oparte na 64-bitowej dystrybucji systemu Linux, która jest zoptymalizowana pod kątem uruchamiania węzła Ethereum, i zawierają gotowe klienty Ethereum.

**Obrazy zajmują się wszystkimi niezbędnymi krokami**, od konfiguracji środowiska i formatowania dysku NVMe po instalację oprogramowania Ethereum.

## Uwaga dotycząca klientów warstwy wykonawczej i konsensusu {#note-on-execution-and-consensus-clients}

Obraz Ethereum on Arm zawiera gotowe klienty warstwy wykonawczej i konsensusu jako usługi. Węzeł Ethereum wymaga, aby oba klienty były zsynchronizowane i uruchomione. Wystarczy pobrać i sflashować obraz, a następnie uruchomić usługi. Obraz ma fabrycznie załadowanych kilka klientów warstwy wykonawczej (takich jak Geth, Nethermind, Besu, Erigon i Reth) oraz klientów konsensusu (takich jak Lighthouse, Prysm, Teku, Nimbus i Lodestar). Zobacz [dokumentację Ethereum on Arm](https://ethereum-on-arm-documentation.readthedocs.io/en/latest/running-a-node/managing-clients.html), aby zapoznać się z aktualną listą.

Należy wybrać po jednym z każdego rodzaju do uruchomienia - wszystkie klienty warstwy wykonawczej są kompatybilne ze wszystkimi klientami konsensusu. W tym samouczku użyto Geth i Lighthouse.

## Pobieranie obrazu {#downloading-the-image}

Obraz Ethereum on Arm to obraz typu „plug and play”, który automatycznie instaluje i konfiguruje zarówno klienty warstwy wykonawczej, jak i konsensusu, konfigurując je tak, aby komunikowały się ze sobą i łączyły z siecią Ethereum. Wszystko, co użytkownik musi zrobić, to uruchomić ich procesy za pomocą prostego polecenia.

Pobierz najnowszy obraz dla swojej płyty ze [strony pobierania Ethereum on Arm](https://ethereum-on-arm-documentation.readthedocs.io/en/latest/getting-started/installation.html#image-downloads). Strona pobierania zawiera również sumę kontrolną SHA-256 każdego obrazu. Zweryfikuj pobrany plik z jej użyciem:

```sh
# Z katalogu zawierającego pobrany obraz
sha256sum ethonarm_rpi5_<version>.img.zip
# Porównaj wynik z sumą kontrolną na stronie pobierania
```

## Flashowanie karty MicroSD {#flashing-the-microsd}

Karta MicroSD, która będzie używana w Raspberry Pi, powinna najpierw zostać włożona do komputera stacjonarnego lub laptopa, aby można było ją sflashować. Następnie poniższe polecenia terminala sflashują pobrany obraz na kartę SD:

```shell
# sprawdź nazwę karty MicroSD
sudo fdisk -l

>> sdxxx
```

Bardzo ważne jest, aby podać poprawną nazwę, ponieważ następne polecenie zawiera `dd`, co całkowicie usuwa istniejącą zawartość karty przed wgraniem na nią obrazu. Aby kontynuować, przejdź do katalogu zawierającego spakowany obraz:

```shell
# rozpakuj i wgraj obraz
unzip ethonarm_rpi5_<version>.img.zip
sudo dd bs=1M if=ethonarm_rpi5_<version>.img of=/dev/<sdxx> conv=fdatasync status=progress
```

Karta jest teraz sflashowana, więc można ją włożyć do Raspberry Pi.

## Uruchom węzeł {#start-the-node}

Po włożeniu karty SD do Raspberry Pi podłącz kabel Ethernet i dysk NVMe, a następnie włącz zasilanie. System operacyjny uruchomi się i automatycznie zacznie wykonywać wstępnie skonfigurowane zadania, które zmieniają Raspberry Pi w węzeł Ethereum, w tym formatowanie dysku NVMe i instalację oprogramowania klienta. Prawdopodobnie zajmie to 10-15 minut, a po zakończeniu płyta automatycznie uruchomi się ponownie. W tym czasie nie przerywaj zasilania.

Gdy wszystko zostanie zainstalowane i skonfigurowane, zaloguj się do urządzenia za pośrednictwem połączenia SSH lub bezpośrednio za pomocą terminala, jeśli do płyty podłączony jest monitor i klawiatura. Użyj konta `ethereum` do zalogowania się, ponieważ ma ono uprawnienia wymagane do uruchomienia węzła.

```shell
User: ethereum
Password: ethereum
```

Przy pierwszym logowaniu zostaniesz poproszony o zmianę domyślnego hasła. Zrób to, ponieważ w przeciwnym razie każdy, kto ma dostęp do Twojego węzła, mógłby zalogować się przy użyciu domyślnego hasła. Zapora systemowa jest domyślnie wyłączona, więc jeśli Twój węzeł ma publiczny adres IP, zapoznaj się z [przewodnikiem bezpieczeństwa Ethereum on Arm](https://ethereum-on-arm-documentation.readthedocs.io/en/latest/system/security.html), aby ją włączyć.

Najpierw uruchom klienta konsensusu. Otwórz port 9000 (TCP i UDP) na routerze, aby Lighthouse mógł znaleźć i połączyć się z węzłami partnerskimi (peers). Następnie włącz i uruchom usługę lighthouse, aby uruchamiała się również po ponownym uruchomieniu:

```sh
sudo systemctl enable --now lighthouse-beacon
```

Sprawdź klienta za pomocą logów:

```sh
sudo journalctl -u lighthouse-beacon -f
```

Następnie uruchom klienta warstwy wykonawczej. Otwórz port 30303 (TCP i UDP) na routerze, aby Geth mógł znaleźć i połączyć się z węzłami partnerskimi. Następnie włącz i uruchom usługę geth:

```sh
sudo systemctl enable --now geth
```

Możesz potwierdzić, że działa, sprawdzając logi:

```sh
sudo journalctl -u geth -f
```

Zauważ, że klient konsensusu zsynchronizuje się w ciągu kilku minut, ponieważ używa synchronizacji z punktem kontrolnym (checkpoint sync). Klient warstwy wykonawczej będzie potrzebował więcej czasu - potencjalnie kilku godzin. Oba klienty działają w tym samym czasie: klient konsensusu informuje klienta warstwy wykonawczej, który blok jest szczytem łańcucha, a klient warstwy wykonawczej pobiera i weryfikuje bloki aż do niego.

Gdy usługi Geth i Lighthouse są uruchomione i zsynchronizowane, Twoje Raspberry Pi jest teraz węzłem Ethereum! Najczęściej interakcja z siecią Ethereum odbywa się za pomocą konsoli JavaScript Geth, którą można podłączyć do klienta Geth na porcie 8545. Możliwe jest również przesyłanie poleceń sformatowanych jako obiekty JSON za pomocą narzędzia do żądań, takiego jak Curl. Zobacz więcej w [dokumentacji Geth](https://geth.ethereum.org/).

Obraz zawiera również pulpit nawigacyjny Grafana, którego bardziej zaawansowani użytkownicy mogą używać do monitorowania kondycji swojego węzła, przechodząc do `ipaddress:3000` w przeglądarce.

## Walidatory {#validators}

Do klienta konsensusu można również opcjonalnie dodać walidator. Oprogramowanie walidatora pozwala Twojemu węzłowi aktywnie uczestniczyć w konsensusie i zapewnia sieci bezpieczeństwo kryptoekonomiczne. Za tę pracę otrzymujesz nagrodę w ETH. Aby uruchomić walidator, musisz najpierw posiadać 32 ETH, które należy wpłacić do kontraktu depozytowego. Depozytu można dokonać, postępując zgodnie z przewodnikiem krok po kroku na [Launchpadzie](https://launchpad.ethereum.org/). Zrób to na komputerze stacjonarnym/laptopie, ale nie generuj kluczy — można to zrobić bezpośrednio na Raspberry Pi.

Narzędzie [ethstaker-deposit-cli](https://github.com/ethstaker/ethstaker-deposit-cli) generuje klucze walidatora. Obecne obrazy je zawierają; jeśli używasz starszego obrazu, najpierw je zainstaluj. Następnie wygeneruj klucze depozytowe, zastępując `<YOUR_ETH_ADDRESS>` adresem, na który mają trafiać Twoje wypłaty:

```sh
sudo apt-get update
sudo apt-get install ethstaker-deposit-cli
cd && deposit new-mnemonic --num_validators 1 --execution_address <YOUR_ETH_ADDRESS> --chain mainnet
```

(Albo pobierz [ethstaker-deposit-cli](https://github.com/ethstaker/ethstaker-deposit-cli), aby uruchomić je na maszynie odłączonej od sieci (airgapped), i tam uruchom polecenie `deposit new-mnemonic`)

Przechowuj frazę mnemoniczną w bezpiecznym miejscu! Powyższe polecenie wygenerowało dwa pliki w katalogu `validator_keys`: klucze walidatora i plik danych depozytowych. Dane depozytowe należy przesłać do Launchpada, więc trzeba je skopiować z Raspberry Pi na komputer stacjonarny/laptop. Można to zrobić za pomocą połączenia SSH lub dowolnej innej metody kopiowania/wklejania.

Gdy plik danych depozytowych będzie dostępny na komputerze, na którym uruchomiony jest Launchpad, można go przeciągnąć i upuścić na `+` na ekranie Launchpada. Postępuj zgodnie z instrukcjami na ekranie, aby wysłać transakcję do kontraktu depozytowego.

Wracając do Raspberry Pi, można uruchomić walidator. Wymaga to zaimportowania kluczy walidatora, ustawienia adresu do odbierania nagród, a następnie uruchomienia wstępnie skonfigurowanego procesu walidatora. Poniższy przykład dotyczy Lighthouse — instrukcje dla innych klientów konsensusu są dostępne w [dokumentacji Ethereum on Arm](https://ethereum-on-arm-documentation.readthedocs.io/en/latest/staking/solo-staking.html):

```shell
# zaimportuj klucze walidatora
lighthouse account validator import --directory=/home/ethereum/validator_keys

# ustaw adres nagród (zastąp <YOUR_ETH_ADDRESS> swoim adresem)
sudo sed -i 's/changeme/<YOUR_ETH_ADDRESS>/' /etc/ethereum/lighthouse-validator.conf

# uruchom walidator
sudo systemctl enable --now lighthouse-validator
```

Gratulacje, masz teraz pełny węzeł Ethereum i walidator działający na Raspberry Pi!

## Więcej szczegółów {#more-details}

Ta strona zawierała przegląd konfiguracji węzła Geth-Lighthouse i walidatora przy użyciu Raspberry Pi. Bardziej szczegółowe instrukcje są dostępne na [stronie internetowej Ethereum-on-Arm](https://ethereum-on-arm-documentation.readthedocs.io/en/latest/).

## Będziemy wdzięczni za opinie {#feedback-appreciated}

Wiemy, że Raspberry Pi ma ogromną bazę użytkowników, która mogłaby mieć bardzo pozytywny wpływ na kondycję sieci Ethereum.
Zagłęb się w szczegóły tego samouczka, spróbuj uruchomić węzeł w sieciach testowych, sprawdź [GitHub Ethereum on Arm](https://github.com/EOA-Blockchain-Labs/ethereumonarm), przekaż opinię, zgłaszaj problemy (issues) i pull requesty oraz pomóż w rozwoju technologii i dokumentacji!

## Referencje {#references}

1. https://ethereum-on-arm-documentation.readthedocs.io/en/latest/
2. https://wikipedia.org/wiki/Port_forwarding
3. https://prometheus.io
4. https://grafana.com
5. https://geth.ethereum.org
6. https://lighthouse.sigmaprime.io
7. https://github.com/ethstaker/ethstaker-deposit-cli
