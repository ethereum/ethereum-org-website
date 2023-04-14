---
title: Monitorare Geth con InfluxDB e Grafana
description:
author: "Mario Havel"
tags:
  - "client"
  - "nodi"
skill: intermediate
lang: it
published: 2021-01-13
---

Questo tutorial ti aiuterà a configurare il monitoraggio per il tuo nodo di Geth così che tu possa meglio comprenderne le prestazioni e identificare i problemi potenziali.

## Prerequisiti {#prerequisites}

- Dovresti avere già in esecuzione un'istanza di Geth.
- Gran parte dei passaggi ed esempi sono per l'ambiente Linux, è utile quindi una conoscenza di base della console.
- Dai un'occhiata a questa panoramica video della suite di metriche di Geth: [Monitoring an Ethereum infrastructure by Péter Szilágyi](https://www.youtube.com/watch?v=cOBab8IJMYI).

## Stack di monitoraggio {#monitoring-stack}

Un client di Ethereum raccoglie molti dati leggibili sotto forma di database cronologico. Per semplificare il monitoraggio, puoi alimentare i dati nel software di visualizzazione. Esistono numerose opzioni disponibili:

- [Prometheus](https://prometheus.io/) (modello pull)
- [InfluxDB](https://www.influxdata.com/get-influxdb/) (modello push)
- [Telegraf](https://www.influxdata.com/get-influxdb/)
- [Grafana](https://www.grafana.com/)
- [Datadog](https://www.datadoghq.com/)
- [Chronograf](https://www.influxdata.com/time-series-platform/chronograf/)

Esiste anche [Geth Prometheus Exporter](https://github.com/hunterlong/gethexporter), un'opzione preconfigurata con InfluxDB e Grafana. Puoi configurarla facilmente usando docker ed [Ethbian OS](https://ethbian.org/index.html) per RPi 4.

In questo tutorial, configureremo il tuo client di Geth per inviare i dati a InfluxDB per creare un database e Grafana per creare una visualizzazione grafica dei dati. Farlo manualmente ti aiuterà a comprendere meglio il processo e a distribuirlo in ambienti diversi.

## Configurare InfluxDB {#setting-up-influxdb}

Prima, scarichiamo e installiamo InfluxDB. Varie opzioni di download si possono trovare alla [pagina di release di Influxdata](https://portal.influxdata.com/downloads/). Seleziona quella che si adatta al tuo ambiente. Puoi anche installarla da una [repository](https://repos.influxdata.com/). Per esempio, nella distribuzione basata su Debian:

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

Dopo aver installato correttamente InfluxDB, accertati che sia in esecuzione in background. Di default, è raggiungibile a `localhost:8086`. Prima di usare il client `influx`, devi creare un nuovo utente con privilegi d'amministratore. Questo utente servirà per l'amministrazione d'alto livello, la creazione di database e utenti.

```
curl -XPOST "http://localhost:8086/query" --data-urlencode "q=CREATE USER username WITH PASSWORD 'password' WITH ALL PRIVILEGES"
```

Ora puoi usare il client di influx per accedere alla [shell di InfluxDB](https://docs.influxdata.com/influxdb/v1.8/tools/shell/) con questo utente.

```
influx -username 'username' -password 'password'
```

Comunicando direttamente con InfluxDB nella sua shell, puoi creare il database e l'utente per le metriche di Geth.

```
create database geth
create user geth with password choosepassword
```

Verifica le voci create con:

```
show databases
show users
```

Esci dalla shell di InfluxDB.

```
exit
```

InfluxDB è in esecuzione e configurato per memorizzare le metriche da Geth.

## Preparare Geth {#preparing-geth}

Dopo aver configurato il database, dobbiamo abilitare la raccolta di metriche su Geth. Presta attenzione a `METRICS AND STATS OPTIONS` in `geth --help`. Lì si possono trovare diverse opzioni, in questo caso vogliamo che Geth alimenti i dati in InfluxDB. La configurazione di base specifica l'endpoint dove InfluxDB è raggiungibile e l'autenticazione per il database.

```
geth --metrics --metrics.influxdb --metrics.influxdb.endpoint "http://0.0.0.0:8086" --metrics.influxdb.username "geth" --metrics.influxdb.password "chosenpassword"
```

Questi flag possono essere accodati a un comando che avvia il client o salvati nel file di configurazione.

Puoi verificare che Geth stia inviando correttamente i dati, per esempio, elencando le metriche nel database. Nella shell di InfluxDB:

```
use geth
show measurements
```

## Configurare Grafana {#setting-up-grafana}

Il prossimo passo è installare Grafana, che interpreterà graficamente i dati. Segui il processo di installazione per il tuo ambiente nella documentazione di Grafana. Assicurati di installare la versione OSS, se non desideri un'altra versione. Esempio di fasi d'installazione per le distribuzioni di Debian usando il repository:

```
curl -tlsv1.3 --proto =https -sL https://packages.grafana.com/gpg.key | sudo apt-key add -
echo "deb https://packages.grafana.com/oss/deb stable main" | sudo tee -a /etc/apt/sources.list.d/grafana.list
sudo apt update
sudo apt install grafana
sudo systemctl enable grafana-server
sudo systemctl start grafana-server
```

Quando Grafana è in esecuzione, dovrebbe esser raggiungibile a `localhost:3000`. Usa il tuo browser preferito per accedere a questo percorso, poi accedi con le credenziali predefinite (utente: `admin` e password: `admin`). Quando richiesto, modifica la password predefinita e salva.

![](./grafana1.png)

Sarai reindirizzato alla pagina home di Grafana. Per prima cosa, configura i tuoi dati sorgente. Clicca sull'icona di configurazione nella barra a sinistra e seleziona "Sorgenti dati".

![](./grafana2.png)

Se non sono ancora state create sorgenti di dati, clicca su "Aggiungi sorgente di dati" per definirne una.

![](./grafana3.png)

Per questa configurazione, seleziona "InfluxDB" e procedi.

![](./grafana4.png)

La configurazione della sorgente di dati è abbastanza semplice se esegui gli strumenti sulla stessa macchina. Devi impostare l'indirizzo di InfluxDB e i dettagli per accedere al database. Fai riferimento alla seguente immagine.

![](./grafana5.png)

Se tutto è completo e InfluxDB è raggiungibile, clicca su "Salva e prova" e attendi che compaia la conferma.

![](./grafana6.png)

Grafana è ora configurato per leggere i dati da InfluxDB. Ora devi creare una dashboard che li interpreterà e mostrerà. Le proprietà dei pannelli di controllo sono codificate nei file JSON, che possono essere creati da chiunque e sono facilmente importabili. Sulla barra sinistra, clicca su "Crea e Importa".

![](./grafana7.png)

Per una dashboard di monitoraggio di Geth, copia l'ID di [questa dashboard](https://grafana.com/grafana/dashboards/13877/) e incollalo nella "Pagina d'importazione" su Grafana. Dopo aver salvato la dashboard, dovrebbe somigliare a questo:

![](./grafana8.png)

Puoi modificare i tuoi pannelli di controllo. Ogni pannello può essere modificato, spostato, rimosso o aggiunto. Puoi modificare le tue configurazioni. Sta a te! Per saperne di più su come funzionano i pannelli di controllo, fai riferimento alla [documentazione di Grafana](https://grafana.com/docs/grafana/latest/dashboards/). Potresti esser anche interessato agli [avvisi](https://grafana.com/docs/grafana/latest/alerting/), che ti consentono di configurare delle notifiche di avviso per quando le metriche raggiungono certi valori. Sono supportati diversi canali di comunicazione.
