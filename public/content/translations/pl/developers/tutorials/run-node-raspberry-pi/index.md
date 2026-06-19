---
title: Uruchom węzeł Ethereum na Raspberry Pi 4
description: Sflashuj swoje Raspberry Pi 4, podłącz kabel Ethernet, podłącz dysk SSD i włącz urządzenie, aby zmienić Raspberry Pi 4 w pełny węzeł Ethereum i walidator.
author: "EthereumOnArm"
tags: ["klienty", "warstwa wykonawcza", "warstwa konsensusu", "węzły"]
lang: pl
skill: intermediate
breadcrumb: Węzeł na Raspberry Pi
published: 2022-06-10
source: Ethereum on ARM
sourceUrl: https://ethereum-on-arm-documentation.readthedocs.io/en/latest/
---

**Ethereum on Arm to niestandardowy obraz systemu Linux, który może zmienić Raspberry Pi w węzeł Ethereum.**

Aby użyć Ethereum on Arm do zmiany Raspberry Pi w węzeł Ethereum, zalecany jest następujący sprzęt:

- Płyta Raspberry Pi 4 (model B 8 GB), Odroid M1 lub Rock 5B (8 GB/16 GB RAM)
- Karta MicroSD (minimum 16 GB, klasa 10)
- Dysk SSD o pojemności minimum 2 TB na USB 3.0 lub dysk SSD w obudowie USB do SATA.
- Zasilacz
- Kabel Ethernet
- Przekierowanie portów (więcej informacji w sekcji dotyczącej klientów)
- Obudowa z radiatorem i wentylatorem
- Klawiatura USB, monitor i kabel HDMI (micro-HDMI) (opcjonalnie)

## Dlaczego warto uruchomić Ethereum na architekturze ARM? {#why-run-ethereum-on-arm}

Płyty ARM to bardzo przystępne cenowo, elastyczne i małe komputery. Są dobrym wyborem do uruchamiania węzłów Ethereum, ponieważ można je tanio kupić, skonfigurować tak, aby wszystkie ich zasoby skupiały się tylko na węźle, co czyni je wydajnymi, zużywają mało energii i są fizycznie małe, dzięki czemu dyskretnie zmieszczą się w każdym domu. Bardzo łatwo jest również uruchomić węzły, ponieważ kartę MicroSD Raspberry Pi można po prostu sflashować gotowym obrazem, bez konieczności pobierania lub budowania oprogramowania.

## Jak to działa? {#how-does-it-work}

Karta pamięci Raspberry Pi jest flashowana gotowym obrazem. Ten obraz zawiera wszystko, co jest potrzebne do uruchomienia węzła Ethereum. Po sflashowaniu karty jedyne, co użytkownik musi zrobić, to włączyć Raspberry Pi. Wszystkie procesy wymagane do działania węzła są uruchamiane automatycznie. Działa to w ten sposób, ponieważ karta pamięci zawiera system operacyjny (OS) oparty na systemie Linux, na którym automatycznie uruchamiane są procesy na poziomie systemu, zmieniające urządzenie w węzeł Ethereum.

Ethereum nie może być uruchomione przy użyciu popularnego systemu operacyjnego Linux dla Raspberry Pi „Raspbian”, ponieważ Raspbian nadal używa architektury 32-bitowej, co prowadzi użytkowników Ethereum do problemów z pamięcią, a klienty konsensusu nie obsługują 32-bitowych plików binarnych. Aby temu zaradzić, zespół Ethereum on Arm zmigrował do natywnego 64-bitowego systemu operacyjnego o nazwie „Armbian”.

**Obrazy zajmują się wszystkimi niezbędnymi krokami**, od konfiguracji środowiska i formatowania dysku SSD po instalację i uruchomienie oprogramowania Ethereum, a także rozpoczęcie synchronizacji blockchaina.

## Uwaga dotycząca klientów warstwy wykonawczej i konsensusu {#note-on-execution-and-consensus-clients}

Obraz Ethereum on Arm zawiera gotowe klienty warstwy wykonawczej i konsensusu jako usługi. Węzeł Ethereum wymaga, aby oba klienty były zsynchronizowane i działały. Wystarczy pobrać i sflashować obraz, a następnie uruchomić usługi. Obraz ma fabrycznie załadowane następujące klienty warstwy wykonawczej:

- Geth
- Nethermind
- Besu

oraz następujące klienty konsensusu:

- Lighthouse
- Nimbus
- Prysm
- Teku

Należy wybrać po jednym z każdego rodzaju do uruchomienia – wszystkie klienty warstwy wykonawczej są kompatybilne ze wszystkimi klientami konsensusu. Jeśli nie wybierzesz klienta jawnie, węzeł powróci do ustawień domyślnych – Geth i Lighthouse – i uruchomi je automatycznie po włączeniu zasilania płyty. Musisz otworzyć port 30303 na swoim routerze, aby Geth mógł znaleźć i połączyć się z węzłami partnerskimi (peers).

## Pobieranie obrazu {#downloading-the-image}

Obraz Ethereum dla Raspberry Pi 4 to obraz typu „plug and play”, który automatycznie instaluje i konfiguruje zarówno klienty warstwy wykonawczej, jak i konsensusu, konfigurując je tak, aby komunikowały się ze sobą i łączyły z siecią Ethereum. Jedyne, co użytkownik musi zrobić, to uruchomić ich procesy za pomocą prostego polecenia.

Pobierz obraz dla Raspberry Pi ze strony [Ethereum on Arm](https://ethereumonarm-my.sharepoint.com/:u:/p/dlosada/Ec_VmUvr80VFjf3RYSU-NzkBmj2JOteDECj8Bibde929Gw?download=1) i zweryfikuj hash SHA256:

```sh
# Z katalogu zawierającego pobrany obraz
shasum -a 256 ethonarm_22.04.00.img.zip
# Hash powinien zwrócić: fb497e8f8a7388b62d6e1efbc406b9558bee7ef46ec7e53083630029c117444f
```

Należy pamiętać, że obrazy dla płyt Rock 5B i Odroid M1 są dostępne na [stronie pobierania](https://ethereum-on-arm-documentation.readthedocs.io/en/latest/) Ethereum-on-Arm.

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
unzip ethonarm_22.04.00.img.zip
sudo dd bs=1M if=ethonarm_22.04.00.img of=/dev/<sdxx> conv=fdatasync status=progress
```

Karta jest teraz sflashowana, więc można ją włożyć do Raspberry Pi.

## Uruchomienie węzła {#start-the-node}

Po włożeniu karty SD do Raspberry Pi podłącz kabel Ethernet i dysk SSD, a następnie włącz zasilanie. System operacyjny uruchomi się i automatycznie zacznie wykonywać wstępnie skonfigurowane zadania, które zmienią Raspberry Pi w węzeł Ethereum, w tym instalację i budowanie oprogramowania klienta. Zajmie to prawdopodobnie 10-15 minut.

Gdy wszystko zostanie zainstalowane i skonfigurowane, zaloguj się do urządzenia za pośrednictwem połączenia SSH lub bezpośrednio za pomocą terminala, jeśli do płyty podłączony jest monitor i klawiatura. Użyj konta `ethereum` do zalogowania się, ponieważ ma ono uprawnienia wymagane do uruchomienia węzła.

```shell
User: ethereum
Password: ethereum
```

Domyślny klient warstwy wykonawczej, Geth, uruchomi się automatycznie. Możesz to potwierdzić, sprawdzając logi za pomocą następującego polecenia terminala:

```sh
sudo journalctl -u geth -f
```

Klient konsensusu musi zostać uruchomiony jawnie. Aby to zrobić, najpierw otwórz port 9000 na swoim routerze, aby Lighthouse mógł znaleźć i połączyć się z węzłami partnerskimi. Następnie włącz i uruchom usługę Lighthouse:

```sh
sudo systemctl enable lighthouse-beacon
sudo systemctl start lighthouse-beacon
```

Sprawdź klienta za pomocą logów:

```sh
sudo journalctl -u lighthouse-beacon
```

Należy pamiętać, że klient konsensusu zsynchronizuje się w ciągu kilku minut, ponieważ używa synchronizacji z punktem kontrolnym (checkpoint sync). Klient warstwy wykonawczej będzie potrzebował więcej czasu – potencjalnie kilku godzin, i nie uruchomi się, dopóki klient konsensusu nie zakończy synchronizacji (wynika to z faktu, że klient warstwy wykonawczej potrzebuje celu do synchronizacji, który zapewnia zsynchronizowany klient konsensusu).

Gdy usługi Geth i Lighthouse działają i są zsynchronizowane, Twoje Raspberry Pi jest teraz węzłem Ethereum! Najczęściej interakcja z siecią Ethereum odbywa się za pomocą konsoli JavaScript klienta Geth, którą można podłączyć do klienta Geth na porcie 8545. Możliwe jest również przesyłanie poleceń sformatowanych jako obiekty JSON za pomocą narzędzia do żądań, takiego jak Curl. Zobacz więcej w [dokumentacji Geth](https://geth.ethereum.org/).

Geth jest wstępnie skonfigurowany do raportowania metryk do pulpitu nawigacyjnego Grafana, który można przeglądać w przeglądarce. Bardziej zaawansowani użytkownicy mogą chcieć użyć tej funkcji do monitorowania kondycji swojego węzła, przechodząc do `ipaddress:3000`, podając `user: admin` i `passwd: ethereum`.

## Walidatory {#validators}

Do klienta konsensusu można również opcjonalnie dodać walidator. Oprogramowanie walidatora pozwala Twojemu węzłowi aktywnie uczestniczyć w konsensusie i zapewnia sieci bezpieczeństwo kryptoekonomiczne. Za tę pracę otrzymujesz nagrodę w ETH. Aby uruchomić walidator, musisz najpierw posiadać 32 ETH, które należy wpłacić do kontraktu depozytowego. Depozytu można dokonać, postępując zgodnie z przewodnikiem krok po kroku na [Launchpadzie](https://launchpad.ethereum.org/). Zrób to na komputerze stacjonarnym/laptopie, ale nie generuj kluczy — można to zrobić bezpośrednio na Raspberry Pi.

Otwórz terminal na Raspberry Pi i uruchom następujące polecenie, aby wygenerować klucze depozytowe:

```
sudo apt-get update
sudo apt-get install staking-deposit-cli
cd && deposit new-mnemonic --num_validators 1
```

(Lub pobierz [staking-deposit-cli](https://github.com/ethereum/staking-deposit-cli), aby uruchomić na maszynie odłączonej od sieci (airgapped), i uruchom polecenie `deposit new-mnemnonic`)

Przechowuj frazę mnemoniczną w bezpiecznym miejscu! Powyższe polecenie wygenerowało dwa pliki w magazynie kluczy węzła: klucze walidatora i plik danych depozytowych. Dane depozytowe muszą zostać przesłane do Launchpada, więc należy je skopiować z Raspberry Pi na komputer stacjonarny/laptop. Można to zrobić za pomocą połączenia SSH lub dowolnej innej metody kopiuj/wklej.

Gdy plik danych depozytowych będzie dostępny na komputerze, na którym uruchomiony jest Launchpad, można go przeciągnąć i upuścić na `+` na ekranie Launchpada. Postępuj zgodnie z instrukcjami na ekranie, aby wysłać transakcję do kontraktu depozytowego.

Wracając do Raspberry Pi, można uruchomić walidator. Wymaga to zaimportowania kluczy walidatora, ustawienia adresu do zbierania nagród, a następnie uruchomienia wstępnie skonfigurowanego procesu walidatora. Poniższy przykład dotyczy Lighthouse — instrukcje dla innych klientów konsensusu są dostępne w [dokumentacji Ethereum on Arm](https://ethereum-on-arm-documentation.readthedocs.io/en/latest/):

```shell
# zaimportuj klucze walidatora
lighthouse account validator import --directory=/home/ethereum/validator_keys

# ustaw adres nagród
sudo sed -i 's/<ETH_ADDRESS>' /etc/ethereum/lighthouse-validator.conf

# uruchom walidator
sudo systemctl start lighthouse-validator
```

Gratulacje, masz teraz pełny węzeł Ethereum i walidator działający na Raspberry Pi!

## Więcej szczegółów {#more-details}

Ta strona zawierała przegląd konfiguracji węzła Geth-Lighthouse i walidatora przy użyciu Raspberry Pi. Bardziej szczegółowe instrukcje są dostępne na [stronie internetowej Ethereum-on-Arm](https://ethereum-on-arm-documentation.readthedocs.io/en/latest/).

## Będziemy wdzięczni za opinie {#feedback-appreciated}

Wiemy, że Raspberry Pi ma ogromną bazę użytkowników, która może mieć bardzo pozytywny wpływ na kondycję sieci Ethereum.
Zapoznaj się ze szczegółami w tym samouczku, spróbuj uruchomić węzeł w sieciach testowych, sprawdź repozytorium Ethereum on Arm na GitHubie, przekaż opinię, zgłaszaj problemy (issues) i twórz pull requesty, aby pomóc w rozwoju technologii i dokumentacji!

## Referencje {#references}

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
11. https://docs.ethswarm.org/
12. https://raiden.network
13. https://ipfs.io
14. https://status.im
15. https://vipnode.org