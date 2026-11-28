---
title: "Monitorowanie Geth za pomocą InfluxDB i Grafana"
description: "Skonfiguruj monitorowanie swojego węzła Geth za pomocą InfluxDB i Grafana, aby śledzić wydajność i identyfikować problemy."
author: "Mario Havel"
tags: ["klienci", "węzły"]
skill: intermediate
breadcrumb: Monitorowanie Geth
lang: pl
published: 2021-01-13
---

Ten samouczek pomoże Ci skonfigurować monitorowanie węzła Geth, aby lepiej zrozumieć jego wydajność i zidentyfikować potencjalne problemy.

## Wymagania wstępne {#prerequisites}

- Powinieneś mieć już uruchomioną instancję Geth.
- Większość kroków i przykładów dotyczy środowiska Linux, więc podstawowa znajomość terminala będzie pomocna.
- Obejrzyj ten przegląd wideo pakietu metryk Geth: [Monitoring an Ethereum infrastructure autorstwa Pétera Szilágyi](https://www.youtube.com/watch?v=cOBab8IJMYI).

## Stos monitorowania {#monitoring-stack}

Klient Ethereum zbiera mnóstwo danych, które można odczytać w formie chronologicznej bazy danych. Aby ułatwić monitorowanie, możesz przesłać je do oprogramowania do wizualizacji danych. Dostępnych jest wiele opcji:

- [Prometheus](https://prometheus.io/) (model pull)
- [InfluxDB](https://www.influxdata.com/get-influxdb/) (model push)
- [Telegraf](https://www.influxdata.com/time-series-platform/telegraf/)
- [Grafana](https://www.grafana.com/)
- [Datadog](https://www.datadoghq.com/)
- [Chronograf](https://www.influxdata.com/time-series-platform/chronograf/)

Jeśli wolisz Prometheus, Geth może również udostępniać swoje metryki w formacie Prometheus. Uruchom Geth z `--metrics --metrics.addr 127.0.0.1` i skieruj Prometheus na `http://127.0.0.1:6060/debug/metrics/prometheus`.

W tym samouczku skonfigurujemy Twojego klienta Geth tak, aby wypychał dane do InfluxDB w celu utworzenia bazy danych oraz do Grafana w celu utworzenia wizualizacji danych na wykresach. Ręczne wykonanie tego pomoże Ci lepiej zrozumieć proces, modyfikować go i wdrożyć w różnych środowiskach.

## Konfiguracja InfluxDB {#setting-up-influxdb}

Najpierw pobierzmy i zainstalujmy InfluxDB. Ten samouczek używa InfluxDB 1.x (OSS), który Geth obsługuje za pomocą poniższych flag `--metrics.influxdb`. Nowsze wersje InfluxDB używają innej konfiguracji z organizacjami, zasobnikami (buckets) i tokenami zamiast baz danych i użytkowników. Geth obsługuje InfluxDB 2.x za pomocą flag `--metrics.influxdbv2`, ale kroki konfiguracji w tym samouczku dotyczą tylko wersji 1.x.

Postępuj zgodnie z [instrukcjami instalacji InfluxDB 1.x](https://docs.influxdata.com/influxdb/v1/introduction/install/) dla Twojego środowiska. Na przykład w systemach Debian lub Ubuntu możesz zainstalować go z repozytorium InfluxData. Przed zaufaniem kluczowi sprawdź w instrukcji instalacji aktualny odcisk klucza podpisywania:

```sh
curl --silent --location -O https://repos.influxdata.com/influxdata-archive.key
sudo mkdir -p /etc/apt/keyrings
gpg --dearmor < influxdata-archive.key | sudo tee /etc/apt/keyrings/influxdata-archive.gpg > /dev/null
echo "deb [signed-by=/etc/apt/keyrings/influxdata-archive.gpg] https://repos.influxdata.com/debian stable main" | sudo tee /etc/apt/sources.list.d/influxdata.list
sudo apt update
sudo apt install influxdb -y
sudo systemctl enable influxdb
sudo systemctl start influxdb
```

Pakiet `influxdb` zawiera klienta wiersza poleceń `influx`.

Po pomyślnym zainstalowaniu InfluxDB upewnij się, że działa w tle. Domyślnie jest on dostępny pod adresem `localhost:8086`.
Przed użyciem klienta `influx` musisz utworzyć nowego użytkownika z uprawnieniami administratora. Ten użytkownik będzie służył do zarządzania na wysokim poziomie, tworzenia baz danych i użytkowników.

```sh
curl -XPOST "http://localhost:8086/query" --data-urlencode "q=CREATE USER username WITH PASSWORD 'password' WITH ALL PRIVILEGES"
```

Teraz możesz użyć klienta influx, aby wejść do [powłoki InfluxDB](https://docs.influxdata.com/influxdb/v1/tools/shell/) jako ten użytkownik.

```sh
influx -username 'username' -password 'password'
```

Komunikując się bezpośrednio z InfluxDB w jego powłoce, możesz utworzyć bazę danych i użytkownika dla metryk Geth.

```sql
create database geth
create user geth with password '<geth-password>'
```

Zweryfikuj utworzone wpisy za pomocą:

```sql
show databases
show users
```

Opuść powłokę InfluxDB.

```
exit
```

InfluxDB jest uruchomiony i skonfigurowany do przechowywania metryk z Geth.

## Przygotowanie Geth {#preparing-geth}

Po skonfigurowaniu bazy danych musimy włączyć zbieranie metryk w Geth. Zwróć uwagę na `METRICS AND STATS OPTIONS` w `geth --help`. Można tam znaleźć wiele opcji, w tym przypadku chcemy, aby Geth wypychał dane do InfluxDB.
Podstawowa konfiguracja określa punkt końcowy, w którym dostępny jest InfluxDB, oraz uwierzytelnianie dla bazy danych.

```sh
geth --metrics --metrics.influxdb --metrics.influxdb.endpoint "http://127.0.0.1:8086" --metrics.influxdb.database "geth" --metrics.influxdb.username "geth" --metrics.influxdb.password "<geth-password>"
```

Użyj tego samego hasła, które zostało ustawione podczas tworzenia użytkownika `geth`. Te flagi można dołączyć do polecenia uruchamiającego klienta lub zapisać w pliku konfiguracyjnym.

Możesz sprawdzić, czy Geth pomyślnie wypycha dane, na przykład wyświetlając metryki w bazie danych. W powłoce InfluxDB:

```sql
use geth
show measurements
```

## Konfiguracja Grafana {#setting-up-grafana}

Następnym krokiem jest instalacja Grafana, która będzie graficznie interpretować dane. Postępuj zgodnie z [procesem instalacji dla Twojego środowiska](https://grafana.com/docs/grafana/latest/setup-grafana/installation/) w dokumentacji Grafana. Upewnij się, że instalujesz wersję OSS, chyba że potrzebujesz czegoś innego.
Przykładowe kroki instalacji dla systemów Debian lub Ubuntu przy użyciu repozytorium Grafana:

```sh
sudo mkdir -p /etc/apt/keyrings
curl -fsSL https://apt.grafana.com/gpg.key | gpg --dearmor | sudo tee /etc/apt/keyrings/grafana.gpg > /dev/null
echo "deb [signed-by=/etc/apt/keyrings/grafana.gpg] https://apt.grafana.com stable main" | sudo tee /etc/apt/sources.list.d/grafana.list
sudo apt update
sudo apt install grafana
sudo systemctl enable grafana-server
sudo systemctl start grafana-server
```

Gdy Grafana jest uruchomiona, powinna być dostępna pod adresem `localhost:3000`.
Użyj preferowanej przeglądarki, aby uzyskać dostęp do tej ścieżki, a następnie zaloguj się przy użyciu domyślnych danych uwierzytelniających (użytkownik: `admin` i hasło: `admin`). Po wyświetleniu monitu zmień domyślne hasło i zapisz.

![Zrzut ekranu pulpitu nawigacyjnego Grafana do monitorowania Geth (panel 1)](./grafana1.png)

Zostaniesz przekierowany na stronę główną Grafana. Najpierw skonfiguruj dane źródłowe. Otwórz menu i wybierz **Connections > Data sources**. Zrzuty ekranu w tym samouczku pochodzą ze starszej wersji Grafana, więc Twoje ekrany mogą wyglądać nieco inaczej.

![Zrzut ekranu pulpitu nawigacyjnego Grafana do monitorowania Geth (panel 2)](./grafana2.png)

Nie utworzono jeszcze żadnych źródeł danych, kliknij „Add data source”, aby je zdefiniować.

![Zrzut ekranu pulpitu nawigacyjnego Grafana do monitorowania Geth (panel 3)](./grafana3.png)

W tej konfiguracji wybierz „InfluxDB” i kontynuuj.

![Zrzut ekranu pulpitu nawigacyjnego Grafana do monitorowania Geth (panel 4)](./grafana4.png)

Konfiguracja źródła danych jest dość prosta, jeśli uruchamiasz narzędzia na tej samej maszynie. Musisz ustawić adres InfluxDB i szczegóły dostępu do bazy danych. Zapoznaj się z poniższym obrazkiem.

![Zrzut ekranu pulpitu nawigacyjnego Grafana do monitorowania Geth (panel 5)](./grafana5.png)

Jeśli wszystko jest gotowe, a InfluxDB jest dostępny, kliknij „Save and test” i poczekaj na pojawienie się potwierdzenia.

![Zrzut ekranu pulpitu nawigacyjnego Grafana do monitorowania Geth (panel 6)](./grafana6.png)

Grafana jest teraz skonfigurowana do odczytu danych z InfluxDB. Teraz musisz utworzyć pulpit nawigacyjny, który będzie je interpretował i wyświetlał. Właściwości pulpitów nawigacyjnych są zakodowane w plikach JSON, które mogą być tworzone przez każdego i łatwo importowane. Otwórz menu i wybierz **Dashboards**, a następnie kliknij **New > Import**.

![Zrzut ekranu pulpitu nawigacyjnego Grafana do monitorowania Geth (panel 7)](./grafana7.png)

W przypadku pulpitu nawigacyjnego do monitorowania Geth skopiuj identyfikator [tego pulpitu](https://grafana.com/grafana/dashboards/13877/) i wklej go na stronie „Import” w Grafana. Po zapisaniu pulpitu nawigacyjnego powinien on wyglądać tak:

![Zrzut ekranu pulpitu nawigacyjnego Grafana do monitorowania Geth (panel 8)](./grafana8.png)

Możesz modyfikować swoje pulpity nawigacyjne. Każdy panel można edytować, przenosić, usuwać lub dodawać. Możesz zmieniać swoje konfiguracje. Wszystko zależy od Ciebie! Aby dowiedzieć się więcej o tym, jak działają pulpity nawigacyjne, zapoznaj się z [dokumentacją Grafana](https://grafana.com/docs/grafana/latest/dashboards/).
Może Cię również zainteresować [Alerting](https://grafana.com/docs/grafana/latest/alerting/). Pozwala to na skonfigurowanie powiadomień o alertach, gdy metryki osiągną określone wartości. Obsługiwane są różne kanały komunikacji.
