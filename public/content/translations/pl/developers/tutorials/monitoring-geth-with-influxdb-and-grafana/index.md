---
title: Monitorowanie Geth za pomocą InfluxDB i Grafana
description: Skonfiguruj monitorowanie węzła Geth za pomocą InfluxDB i Grafana, aby śledzić wydajność i identyfikować problemy.
author: "Mario Havel"
tags: [ "klienci", "węzły" ]
skill: intermediate
lang: pl
published: 2021-01-13
---

Ten samouczek pomoże Ci skonfigurować monitorowanie węzła Geth, abyś mógł lepiej zrozumieć jego wydajność i zidentyfikować potencjalne problemy.

## Wymagania wstępne {#prerequisites}

- Powinieneś już mieć uruchomioną instancję Geth.
- Większość kroków i przykładów dotyczy środowiska Linux, pomocna będzie podstawowa znajomość terminala.
- Obejrzyj ten przegląd wideo zestawu metryk Geth: [Monitorowanie infrastruktury Ethereum autorstwa Pétera Szilágyiego](https://www.youtube.com/watch?v=cOBab8IJMYI).

## Stos monitorowania {#monitoring-stack}

Klient Ethereum zbiera wiele danych, które można odczytać w formie chronologicznej bazy danych. Aby ułatwić monitorowanie, możesz wprowadzić te dane do oprogramowania do wizualizacji danych. Dostępnych jest wiele opcji:

- [Prometheus](https://prometheus.io/) (model pull)
- [InfluxDB](https://www.influxdata.com/get-influxdb/) (model push)
- [Telegraf](https://www.influxdata.com/get-influxdb/)
- [Grafana](https://www.grafana.com/)
- [Datadog](https://www.datadoghq.com/)
- [Chronograf](https://www.influxdata.com/time-series-platform/chronograf/)

Istnieje również [Geth Prometheus Exporter](https://github.com/hunterlong/gethexporter), opcja wstępnie skonfigurowana z InfluxDB i Grafana.

W tym samouczku skonfigurujemy Twojego klienta Geth tak, aby przesyłał dane do InfluxDB w celu utworzenia bazy danych, a Grafana posłuży do stworzenia wizualizacji graficznej tych danych. Ręczne wykonanie tych czynności pomoże Ci lepiej zrozumieć proces, modyfikować go i wdrażać w różnych środowiskach.

## Konfiguracja InfluxDB {#setting-up-influxdb}

Najpierw pobierzmy i zainstalujmy InfluxDB. Różne opcje pobierania można znaleźć na [stronie wydań Influxdata](https://portal.influxdata.com/downloads/). Wybierz tę, która pasuje do Twojego środowiska.
Możesz również zainstalować go z [repozytorium](https://repos.influxdata.com/). Na przykład w dystrybucji opartej na Debianie:

```
curl -tlsv1.3 --proto =https -sL https://repos.influxdata.com/influxdb.key | sudo apt-key add
source /etc/lsb-release
echo "deb https://repos.influxdata.com/${DISTRIB_ID,,} ${DISTRIB_CODENAME} stable" | sudo tee /etc/apt/sources.list.d/influxdb.list
sudo apt update
sudo apt install influxdb -y
sudo systemctl enable influxdb
sudo systemctl start influxdb
sudo apt install influxdb-client
```

Po pomyślnej instalacji InfluxDB upewnij się, że działa on w tle. Domyślnie jest on dostępny pod adresem `localhost:8086`.
Przed użyciem klienta `influx` musisz utworzyć nowego użytkownika z uprawnieniami administratora. Ten użytkownik będzie służył do zarządzania na wysokim poziomie, tworzenia baz danych i użytkowników.

```
curl -XPOST "http://localhost:8086/query" --data-urlencode "q=CREATE USER username WITH PASSWORD 'password' WITH ALL PRIVILEGES"
```

Teraz możesz użyć klienta influx, aby wejść do [powłoki InfluxDB](https://docs.influxdata.com/influxdb/v1.8/tools/shell/) z tym użytkownikiem.

```
influx -username 'username' -password 'password'
```

Komunikując się bezpośrednio z InfluxDB w jego powłoce, możesz utworzyć bazę danych i użytkownika dla metryk Geth.

```
create database geth
create user geth with password choosepassword
```

Zweryfikuj utworzone wpisy za pomocą:

```
show databases
show users
```

Wyjdź z powłoki InfluxDB.

```
exit
```

InfluxDB jest uruchomiony i skonfigurowany do przechowywania metryk z Geth.

## Przygotowanie Geth {#preparing-geth}

Po skonfigurowaniu bazy danych musimy włączyć zbieranie metryk w Geth. Zwróć uwagę na `METRICS AND STATS OPTIONS` w `geth --help`. Można tam znaleźć wiele opcji, w tym przypadku chcemy, aby Geth przesyłał dane do InfluxDB.
Podstawowa konfiguracja określa punkt końcowy, pod którym InfluxDB jest osiągalny, oraz uwierzytelnianie dla bazy danych.

```
geth --metrics --metrics.influxdb --metrics.influxdb.endpoint "http://0.0.0.0:8086" --metrics.influxdb.username "geth" --metrics.influxdb.password "chosenpassword"
```

Te flagi można dołączyć do polecenia uruchamiającego klienta lub zapisać w pliku konfiguracyjnym.

Możesz zweryfikować, czy Geth pomyślnie przesyła dane, na przykład wyświetlając listę metryk w bazie danych. W powłoce InfluxDB:

```
use geth
show measurements
```

## Konfiguracja Grafany {#setting-up-grafana}

Następnym krokiem jest instalacja Grafany, która zinterpretuje dane graficznie. Postępuj zgodnie z procesem instalacji dla swojego środowiska w dokumentacji Grafany. Upewnij się, że instalujesz wersję OSS, jeśli nie chcesz inaczej.
Przykładowe kroki instalacji dla dystrybucji Debian przy użyciu repozytorium:

```
curl -tlsv1.3 --proto =https -sL https://packages.grafana.com/gpg.key | sudo apt-key add -
echo "deb https://packages.grafana.com/oss/deb stable main" | sudo tee -a /etc/apt/sources.list.d/grafana.list
sudo apt update
sudo apt install grafana
sudo systemctl enable grafana-server
sudo systemctl start grafana-server
```

Gdy Grafana jest uruchomiona, powinna być dostępna pod adresem `localhost:3000`.
Użyj preferowanej przeglądarki, aby uzyskać dostęp do tej ścieżki, a następnie zaloguj się przy użyciu domyślnych poświadczeń (użytkownik: `admin` i hasło: `admin`). Gdy pojawi się monit, zmień domyślne hasło i zapisz.

![](./grafana1.png)

Zostaniesz przekierowany na stronę główną Grafany. Najpierw skonfiguruj dane źródłowe. Kliknij ikonę konfiguracji na lewym pasku i wybierz „Źródła danych”.

![](./grafana2.png)

Nie ma jeszcze utworzonych żadnych źródeł danych, kliknij „Dodaj źródło danych”, aby zdefiniować jedno.

![](./grafana3.png)

W tej konfiguracji wybierz „InfluxDB” i kontynuuj.

![](./grafana4.png)

Konfiguracja źródła danych jest dość prosta, jeśli uruchamiasz narzędzia na tej samej maszynie. Musisz ustawić adres InfluxDB i szczegóły dostępu do bazy danych. Zapoznaj się z poniższym obrazkiem.

![](./grafana5.png)

Jeśli wszystko jest gotowe, a InfluxDB jest osiągalny, kliknij „Zapisz i przetestuj” i poczekaj na pojawienie się potwierdzenia.

![](./grafana6.png)

Grafana jest teraz skonfigurowana do odczytu danych z InfluxDB. Teraz musisz utworzyć pulpit nawigacyjny, który będzie go interpretował i wyświetlał. Właściwości pulpitów nawigacyjnych są zakodowane w plikach JSON, które mogą być tworzone przez każdego i łatwo importowane. Na lewym pasku kliknij „Utwórz i importuj”.

![](./grafana7.png)

W przypadku pulpitu nawigacyjnego do monitorowania Geth skopiuj identyfikator [tego pulpitu](https://grafana.com/grafana/dashboards/13877/) i wklej go na stronie „Importuj” w Grafanie. Po zapisaniu pulpitu nawigacyjnego powinien on wyglądać tak:

![](./grafana8.png)

Możesz modyfikować swoje pulpity nawigacyjne. Każdy panel można edytować, przesuwać, usuwać lub dodawać. Możesz zmieniać swoje konfiguracje. To zależy od Ciebie! Aby dowiedzieć się więcej o działaniu pulpitów nawigacyjnych, zapoznaj się z [dokumentacją Grafany](https://grafana.com/docs/grafana/latest/dashboards/).
Może Cię również zainteresować [Alerting](https://grafana.com/docs/grafana/latest/alerting/). Umożliwia to skonfigurowanie powiadomień o alertach, gdy metryki osiągną określone wartości. Obsługiwane są różne kanały komunikacji.
