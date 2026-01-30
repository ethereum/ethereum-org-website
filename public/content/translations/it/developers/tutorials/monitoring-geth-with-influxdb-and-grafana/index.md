---
title: Monitorare Geth con InfluxDB e Grafana
description: Configura il monitoraggio per il tuo nodo Geth usando InfluxDB e Grafana per tracciare le prestazioni e identificare i problemi.
author: "Mario Havel"
tags: [ "client", "nodi" ]
skill: intermediate
lang: it
published: 2021-01-13
---

Questo tutorial ti aiuterà a configurare il monitoraggio per il tuo nodo Geth, in modo da poterne comprendere meglio le prestazioni e identificare potenziali problemi.

## Prerequisiti {#prerequisites}

- Dovresti già avere in esecuzione un'istanza di Geth.
- La maggior parte dei passaggi e degli esempi sono per l'ambiente Linux; sarà utile una conoscenza di base del terminale.
- Dai un'occhiata a questa panoramica video della suite di metriche di Geth: [Monitoring an Ethereum infrastructure di Péter Szilágyi](https://www.youtube.com/watch?v=cOBab8IJMYI).

## Stack di monitoraggio {#monitoring-stack}

Un client di Ethereum raccoglie molti dati leggibili sotto forma di database cronologico. Per semplificare il monitoraggio, puoi alimentare questi dati in un software di visualizzazione dati. Sono disponibili diverse opzioni:

- [Prometheus](https://prometheus.io/) (modello pull)
- [InfluxDB](https://www.influxdata.com/get-influxdb/) (modello push)
- [Telegraf](https://www.influxdata.com/get-influxdb/)
- [Grafana](https://www.grafana.com/)
- [Datadog](https://www.datadoghq.com/)
- [Chronograf](https://www.influxdata.com/time-series-platform/chronograf/)

Esiste anche [Geth Prometheus Exporter](https://github.com/hunterlong/gethexporter), un'opzione preconfigurata con InfluxDB e Grafana.

In questo tutorial, configureremo il tuo client Geth per inviare dati a InfluxDB per creare un database e a Grafana per creare una visualizzazione grafica dei dati. Farlo manualmente ti aiuterà a comprendere meglio il processo, a modificarlo e a distribuirlo in ambienti diversi.

## Configurazione di InfluxDB {#setting-up-influxdb}

Per prima cosa, scarichiamo e installiamo InfluxDB. Varie opzioni di download sono disponibili nella [pagina di release di Influxdata](https://portal.influxdata.com/downloads/). Scegli quella che si adatta al tuo ambiente.
Puoi anche installarlo da un [repository](https://repos.influxdata.com/). Ad esempio, in una distribuzione basata su Debian:

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

Dopo aver installato correttamente InfluxDB, assicurati che sia in esecuzione in background. Per impostazione predefinita, è raggiungibile all'indirizzo `localhost:8086`.
Prima di usare il client `influx`, devi creare un nuovo utente con privilegi di amministratore. Questo utente servirà per la gestione di alto livello, la creazione di database e utenti.

```
curl -XPOST "http://localhost:8086/query" --data-urlencode "q=CREATE USER username WITH PASSWORD 'password' WITH ALL PRIVILEGES"
```

Ora puoi usare il client influx per entrare nella [shell di InfluxDB](https://docs.influxdata.com/influxdb/v1.8/tools/shell/) con questo utente.

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

InfluxDB è in esecuzione e configurato per archiviare le metriche da Geth.

## Preparazione di Geth {#preparing-geth}

Dopo aver configurato il database, dobbiamo abilitare la raccolta delle metriche in Geth. Presta attenzione a `METRICS AND STATS OPTIONS` in `geth --help`. Lì si possono trovare diverse opzioni, in questo caso vogliamo che Geth invii i dati a InfluxDB.
La configurazione di base specifica l'endpoint in cui InfluxDB è raggiungibile e l'autenticazione per il database.

```
geth --metrics --metrics.influxdb --metrics.influxdb.endpoint "http://0.0.0.0:8086" --metrics.influxdb.username "geth" --metrics.influxdb.password "chosenpassword"
```

Questi flag possono essere aggiunti a un comando che avvia il client o salvati nel file di configurazione.

Puoi verificare che Geth stia inviando correttamente i dati, ad esempio elencando le metriche nel database. Nella shell di InfluxDB:

```
use geth
show measurements
```

## Configurazione di Grafana {#setting-up-grafana}

Il passaggio successivo è l'installazione di Grafana, che interpreterà i dati graficamente. Segui la procedura di installazione per il tuo ambiente nella documentazione di Grafana. Assicurati di installare la versione OSS, se non diversamente desiderato.
Esempio di passaggi di installazione per le distribuzioni Debian che utilizzano il repository:

```
curl -tlsv1.3 --proto =https -sL https://packages.grafana.com/gpg.key | sudo apt-key add -
echo "deb https://packages.grafana.com/oss/deb stable main" | sudo tee -a /etc/apt/sources.list.d/grafana.list
sudo apt update
sudo apt install grafana
sudo systemctl enable grafana-server
sudo systemctl start grafana-server
```

Quando Grafana è in esecuzione, dovrebbe essere raggiungibile all'indirizzo `localhost:3000`.
Usa il tuo browser preferito per accedere a questo percorso, quindi accedi con le credenziali predefinite (utente: `admin` e password: `admin`). Quando richiesto, modifica la password predefinita e salva.

![](./grafana1.png)

Sarai reindirizzato alla home page di Grafana. Per prima cosa, imposta i dati di origine. Fai clic sull'icona della configurazione nella barra di sinistra e seleziona "Sorgenti dati".

![](./grafana2.png)

Non ci sono ancora origini dati create, fai clic su "Aggiungi origine dati" per definirne una.

![](./grafana3.png)

Per questa configurazione, seleziona "InfluxDB" e procedi.

![](./grafana4.png)

La configurazione dell'origine dati è piuttosto semplice se si eseguono gli strumenti sulla stessa macchina. È necessario impostare l'indirizzo di InfluxDB e i dettagli per accedere al database. Fai riferimento all'immagine sottostante.

![](./grafana5.png)

Se tutto è completo e InfluxDB è raggiungibile, fai clic su "Salva e testa" e attendi la comparsa della conferma.

![](./grafana6.png)

Grafana è ora impostato per leggere i dati da InfluxDB. Ora è necessario creare una dashboard che la interpreterà e la visualizzerà. Le proprietà delle dashboard sono codificate in file JSON che possono essere creati da chiunque e importati facilmente. Sulla barra di sinistra, fai clic su "Crea e importa".

![](./grafana7.png)

Per una dashboard di monitoraggio Geth, copia l'ID di [questa dashboard](https://grafana.com/grafana/dashboards/13877/) e incollalo nella pagina "Importa" di Grafana. Dopo aver salvato la dashboard, dovrebbe apparire così:

![](./grafana8.png)

Puoi modificare le tue dashboard. Ogni pannello può essere modificato, spostato, rimosso o aggiunto. Puoi modificare le tue configurazioni. Dipende da te! Per saperne di più su come funzionano i pannelli di controllo, consulta la [documentazione di Grafana](https://grafana.com/docs/grafana/latest/dashboards/).
Potresti anche essere interessato a [Alerting](https://grafana.com/docs/grafana/latest/alerting/). Ciò consente di impostare notifiche di avviso per quando le metriche raggiungono determinati valori. Sono supportati vari canali di comunicazione.
