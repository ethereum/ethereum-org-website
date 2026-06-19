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

Klient Ethereum zbiera mnóstwo danych, które można odczytać w postaci chronologicznej bazy danych. Aby ułatwić monitorowanie, możesz przesłać je do oprogramowania do wizualizacji danych. Dostępnych jest wiele opcji:

- [Prometheus](https://prometheus.io/) (model pull)
- [InfluxDB](https://www.influxdata.com/get-influxdb/) (model push)
- [Telegraf](https://www.influxdata.com/get-influxdb/)
- [Grafana](https://www.grafana.com/)
- [Datadog](https://www.datadoghq.com/)
- [Chronograf](https://www.influxdata.com/time-series-platform/chronograf/)

Istnieje również [Geth Prometheus Exporter](https://github.com/hunterlong/gethexporter), opcja wstępnie skonfigurowana z InfluxDB i Grafana.

W tym samouczku skonfigurujemy Twojego klienta Geth tak, aby wypychał dane do InfluxDB w celu utworzenia bazy danych oraz do Grafana w celu utworzenia wizualizacji danych na wykresach. Ręczne wykonanie tego zadania pomoże Ci lepiej zrozumieć proces, modyfikować go i wdrożyć w różnych środowiskach.

## Konfiguracja InfluxDB {#setting-up-influxdb}

Najpierw pobierzmy i zainstalujmy InfluxDB. Różne opcje pobierania można znaleźć na [stronie wydań Influxdata](https://portal.influxdata.com/downloads/). Wybierz tę, która pasuje do Twojego środowiska.
Możesz również zainstalować go z [repozytorium](https://repos.influxdata.com/). Na przykład w dystrybucji opartej na Debianie:

Po pomyślnym zainstalowaniu InfluxDB upewnij się, że działa w tle. Domyślnie jest on dostępny pod adresem `localhost:8086`.
Przed użyciem klienta `influx` musisz utworzyć nowego użytkownika z uprawnieniami administratora. Ten użytkownik będzie służył do zarządzania na wysokim poziomie, tworzenia baz danych i użytkowników.

Teraz możesz użyć klienta influx, aby wejść do [powłoki InfluxDB](https://docs.influxdata.com/influxdb/v1.8/tools/shell/) jako ten użytkownik.

Komunikując się bezpośrednio z InfluxDB w jego powłoce, możesz utworzyć bazę danych i użytkownika dla metryk Geth.

Zweryfikuj utworzone wpisy za pomocą:

Opuść powłokę InfluxDB.

InfluxDB jest uruchomiony i skonfigurowany do przechowywania metryk z Geth.

## Przygotowanie Geth {#preparing-geth}

Po skonfigurowaniu bazy danych musimy włączyć zbieranie metryk w Geth. Zwróć uwagę na `METRICS AND STATS OPTIONS` w `geth --help`. Można tam znaleźć wiele opcji, w tym przypadku chcemy, aby Geth wypychał dane do InfluxDB.
Podstawowa konfiguracja określa punkt końcowy, w którym dostępny jest InfluxDB, oraz uwierzytelnianie dla bazy danych.

Te flagi można dołączyć do polecenia uruchamiającego klienta lub zapisać w pliku konfiguracyjnym.

Możesz sprawdzić, czy Geth pomyślnie wypycha dane, na przykład wyświetlając listę metryk w bazie danych. W powłoce InfluxDB:

## Konfiguracja Grafana {#setting-up-grafana}

Następnym krokiem jest instalacja Grafana, która będzie graficznie interpretować dane. Postępuj zgodnie z procesem instalacji dla swojego środowiska w dokumentacji Grafana. Upewnij się, że instalujesz wersję OSS, chyba że wolisz inaczej.
Przykładowe kroki instalacji dla dystrybucji Debiana przy użyciu repozytorium:

Gdy Grafana jest już uruchomiona, powinna być dostępna pod adresem `localhost:3000`.
Użyj preferowanej przeglądarki, aby uzyskać dostęp do tej ścieżki, a następnie zaloguj się przy użyciu domyślnych danych uwierzytelniających (użytkownik: `admin` i hasło: `admin`). Po wyświetleniu monitu zmień domyślne hasło i zapisz.

![Grafana dashboard screenshot for Geth monitoring (panel 1)](./grafana1.png)

Zostaniesz przekierowany na stronę główną Grafana. Najpierw skonfiguruj dane źródłowe. Kliknij ikonę konfiguracji na lewym pasku i wybierz „Data sources” (Źródła danych).

![Grafana dashboard screenshot for Geth monitoring (panel 2)](./grafana2.png)

Nie utworzono jeszcze żadnych źródeł danych, kliknij „Add data source” (Dodaj źródło danych), aby je zdefiniować.

![Grafana dashboard screenshot for Geth monitoring (panel 3)](./grafana3.png)

W tej konfiguracji wybierz „InfluxDB” i kontynuuj.

![Grafana dashboard screenshot for Geth monitoring (panel 4)](./grafana4.png)

Konfiguracja źródła danych jest dość prosta, jeśli uruchamiasz narzędzia na tej samej maszynie. Musisz ustawić adres InfluxDB i szczegóły dostępu do bazy danych. Zapoznaj się z poniższym obrazkiem.

![Grafana dashboard screenshot for Geth monitoring (panel 5)](./grafana5.png)

Jeśli wszystko jest gotowe, a InfluxDB jest dostępny, kliknij „Save and test” (Zapisz i przetestuj) i poczekaj na pojawienie się potwierdzenia.

![Grafana dashboard screenshot for Geth monitoring (panel 6)](./grafana6.png)

Grafana jest teraz skonfigurowana do odczytu danych z InfluxDB. Teraz musisz utworzyć pulpit nawigacyjny (dashboard), który będzie je interpretował i wyświetlał. Właściwości pulpitów nawigacyjnych są kodowane w plikach JSON, które mogą być tworzone przez każdego i łatwo importowane. Na lewym pasku kliknij „Create and Import” (Utwórz i importuj).

![Grafana dashboard screenshot for Geth monitoring (panel 7)](./grafana7.png)

W przypadku pulpitu nawigacyjnego do monitorowania Geth skopiuj identyfikator [tego pulpitu](https://grafana.com/grafana/dashboards/13877/) i wklej go na stronie „Import” w Grafana. Po zapisaniu pulpit nawigacyjny powinien wyglądać tak:

![Grafana dashboard screenshot for Geth monitoring (panel 8)](./grafana8.png)

Możesz modyfikować swoje pulpity nawigacyjne. Każdy panel można edytować, przenosić, usuwać lub dodawać. Możesz zmieniać swoje konfiguracje. Wszystko zależy od Ciebie! Aby dowiedzieć się więcej o tym, jak działają pulpity nawigacyjne, zapoznaj się z [dokumentacją Grafana](https://grafana.com/docs/grafana/latest/dashboards/).
Może Cię również zainteresować [Alerting](https://grafana.com/docs/grafana/latest/alerting/) (Alerty). Pozwala to na skonfigurowanie powiadomień o alertach, gdy metryki osiągną określone wartości. Obsługiwane są różne kanały komunikacji.