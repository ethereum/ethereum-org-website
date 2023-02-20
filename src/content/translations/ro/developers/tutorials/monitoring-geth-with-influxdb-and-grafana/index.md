---
title: Monitorizarea Geth cu InfluxDB și Grafana
description:
author: "Mario Havel"
tags:
  - "clienți"
  - "geth"
  - "noduri"
skill: intermediate
lang: ro
published: 2021-01-13
---

Acest tutorial vă va ajuta să configurați monitorizarea nodului dvs. Geth ca să-i înțelegeți performanțele și să identificați posibilele probleme.

## Condiții prealabile {#prerequisites}

- Trebuie să știți deja să rulați o instanță de Geth.
- Ar fi util să aveți câteva cunoștințe elementare de terminal în Linux, deoarece majoritatea etapelor și exemplelor sunt din acest mediu.
- Consultați acest videoclip cu prezentarea generală a setului de metrici Geth: [Monitorizarea unei infrastructuri Ethereum de Péter Szilágyi](https://www.youtube.com/watch?v=cOBab8IJMYI).

## Stiva de monitorizare {#monitoring-stack}

Un client Ethereum colectează numeroase date care se pot citi sub forma unei baze de date cronologice. Pentru a face monitorizarea mai ușoară, puteți introduce aceste date într-un software de vizualizare a datelor. Sunt disponibile mai multe opțiuni:

- [Prometheus](https://prometheus.io/) (model „pull”)
- [InfluxDB](https://www.influxdata.com/get-influxdb/) (model „push”)
- [Telegraf](https://www.influxdata.com/get-influxdb/)
- [Grafana](https://www.grafana.com/)
- [Datadog](https://www.datadoghq.com/)
- [Chronograf](https://www.influxdata.com/time-series-platform/chronograf/)

De asemenea, există [Geth Prometheus Exporter](https://github.com/hunterlong/gethexporter), o opțiune preconfigurată cu InfluxDB și Grafana. Se poate configura cu ușurință folosind docker și [Ethbian OS](https://ethbian.org/index.html) pentru RPi 4.

În acest tutorial vă vom configura clientul Geth pentru a împinge date către InfluxDB, care va crea cu ele o bază de date, apoi Grafana pentru a crea o vizualizare grafică a acestora. Dacă executați manual acest proces, vă va ajuta să îl înțelegeți mai bine, să îl modificați și să îl implementați în diferite medii.

## Configurarea InfluxDB {#setting-up-influxdb}

Întâi și-ntâi să descărcăm și să instalăm InfluxDB. Pe [pagina de lansare a InfluxDB](https://portal.influxdata.com/downloads/) găsim mai multe opțiuni de instalare. Alegeți-o pe cea potrivită mediului dumneavoastră. O puteți instala și dintr-un [repository](https://repos.influxdata.com/) (depozitar). De exemplu, pentru distribuția bazată pe Debian:

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

După ce ați terminat instalarea cu succes a InfluxDB, asigurați-vă că acesta funcționează în fundal. În mod implicit, poate fi accesat la adresa `localhost:8086`. Înaintea folosirii clientului `influx`, va trebui să creați un nou client cu privilegii administrative. Acesta va fi responsabil cu managementul la nivel înalt, crearea de baze de date și utilizatori.

```
curl -XPOST "http://localhost:8086/query" --data-urlencode "q=CREATE USER username WITH PASSWORD 'password' WITH ALL PRIVILEGES"
```

Abia acum veți putea folosi clientul „influx” pentru a intra in [shell-ul InfluxDB](https://docs.influxdata.com/influxdb/v1.8/tools/shell/) cu acest utilizator.

```
influx -username 'username' -password 'password'
```

Prin comunicarea directă cu InfluxDB, vă puteți crea baze de date și utilizatori pentru metricile geth.

```
create database geth
create user geth with password choosepassword
```

Verificați datele de intrare create cu:

```
show databases
show users
```

Părăsiți shell-ul InfluxDB.

```
exit
```

Acum InfluxDB funcționează și este configurat să stocheze metricile Geth.

## Pregătirea Geth {#preparing-geth}

După configurarea unei baze de date, trebuie să activăm colectarea metricilor în Geth. Mare atenție la `METRICS AND STATS OPTIONS` din `geth --help`. Acolo vom găsi mai multe opțiuni, iar în cazul nostru vrem ca Geth să împingă („push”) date în InfluxDB. Configurarea de bază specifică atât punctul final unde InfluxDB este accesibil, cât și autentificarea pentru bazele de date.

```
geth --metrics --metrics.influxdb --metrics.influxdb.endpoint "http://0.0.0.0:8086" --metrics.influxdb.username "geth" --metrics.influxdb.password "chosenpassword"
```

Aceste flaguri pot fi adăugate la o comandă care pornește clientul sau pot fi salvate în fișierul de configurare.

Puteți verifica dacă Geth împinge cu succes date, de exemplu, prin listarea metricilor din baza de date. În shell-ul InfluxDB:

```
use geth
show measurements
```

## Configurarea Grafana {#setting-up-grafana}

În următoarea etapă vom instala Grafana, care va interpreta grafic datele. Urmați procesul de instalare pentru mediul dvs. din documentația Grafana. Aveți grijă să instalați versiunea OSS, dacă nu doriți altfel. Exemple de etape de instalare pentru distribuțiile Debian care utilizează depozitarul:

```
curl -tlsv1.3 --proto =https -sL https://packages.grafana.com/gpg.key | sudo apt-key add -
echo "deb https://packages.grafana.com/oss/deb stable main" | sudo tee -a /etc/apt/sources.list.d/grafana.list
sudo apt update
sudo apt install grafana
sudo systemctl enable grafana-server
sudo systemctl start grafana-server
```

Când ați reușit să rulați Grafana, poate fi accesat la `localhost:3000`. Utilizați browserul preferat pentru a accesa această cale, apoi conectați-vă cu datele de autentificare implicite (utilizator: `admin` și parolă: `admin`). Atunci când vi se solicită, schimbați parola implicită și salvați-o.

![](./grafana1.png)

Veți fi redirecționat către pagina de pornire Grafana. Mai întâi configurați datele sursă. Faceți clic pe pictograma din bara din stânga și selecționați „Data sources” (Surse de date).

![](./grafana2.png)

Încă nu a fost creată nicio sursă de date, deci ca să definiți una faceți clic pe „Add data source” (Adăugați o sursă de date).

![](./grafana3.png)

Pentru această configurare selectați „InfluxDB” și continuați.

![](./grafana4.png)

Configurarea sursei de date este destul de simplă dacă instrumentele folosite sunt pe aceeași mașină. Pentru accesarea bazei de date, trebuie să configurați adresa InfluxDB și detaliile. Consultați imaginea de mai jos.

![](./grafana5.png)

Dacă totul este complet și InfluxDB este accesibil, faceți clic pe „Save and test” (Salvați și testați) și așteptați să apară confirmarea.

![](./grafana6.png)

Grafana este acum configurat să citească date din InfluxDB. Iar acum va trebui să creați un tablou de bord care să le interpreteze și să le afișeze. Proprietățile tablourilor de bord sunt codificate în fișiere JSON care pot fi create de oricine și pot fi importate cu ușurință. În bara din stânga, faceți clic pe „Create and Import” (Creați și importați).

![](./grafana7.png)

Pentru un tablou de bord de monitorizare Geth, copiați ID-ul [acestui tablou de bord](https://grafana.com/grafana/dashboards/13877/) și inserați-l în „Import page” (Pagina de import) din Grafana. După salvarea tabloului de bord, acesta ar trebui să arate astfel:

![](./grafana8.png)

Vă puteți modifica tabloul de bord. Fiecare panou poate fi editat, mutat, eliminat sau adăugat. Vă puteți schimba configurațiile. Dvs. hotărâți! Pentru a afla mai multe despre cum funcționează tablourile de bord, consultați [documentația Grafana](https://grafana.com/docs/grafana/latest/dashboards/). S-ar putea să vă intereseze și [Alerting](https://grafana.com/docs/grafana/latest/alerting/) (Alertarea). Aceasta vă permite să configurați notificări de alertă atunci când metricile ating anumite valori. Sunt acceptate diverse canale de comunicare.
