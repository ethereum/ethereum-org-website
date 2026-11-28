---
title: Monitorare Geth con InfluxDB e Grafana
description: Configura il monitoraggio per il tuo nodo Geth usando InfluxDB e Grafana per tracciare le prestazioni e identificare i problemi.
author: "Mario Havel"
tags: ["client", "nodi"]
skill: intermediate
breadcrumb: Monitorare Geth
lang: it
published: 2021-01-13
---

Questo tutorial ti aiuterà a configurare il monitoraggio per il tuo nodo Geth, in modo da poterne comprendere meglio le prestazioni e identificare potenziali problemi.

## Prerequisiti {#prerequisites}

- Dovresti avere già un'istanza di Geth in esecuzione.
- La maggior parte dei passaggi e degli esempi sono per l'ambiente Linux, sarà utile una conoscenza di base del terminale.
- Dai un'occhiata a questa panoramica video della suite di metriche di Geth: [Monitorare un'infrastruttura Ethereum di Péter Szilágyi](https://www.youtube.com/watch?v=cOBab8IJMYI).

## Stack di monitoraggio {#monitoring-stack}

Un client Ethereum raccoglie molti dati che possono essere letti sotto forma di database cronologico. Per semplificare il monitoraggio, puoi inserire questi dati in un software di visualizzazione dei dati. Ci sono diverse opzioni disponibili:

- [Prometheus](https://prometheus.io/) (modello pull)
- [InfluxDB](https://www.influxdata.com/get-influxdb/) (modello push)
- [Telegraf](https://www.influxdata.com/time-series-platform/telegraf/)
- [Grafana](https://www.grafana.com/)
- [Datadog](https://www.datadoghq.com/)
- [Chronograf](https://www.influxdata.com/time-series-platform/chronograf/)

Se preferisci Prometheus, Geth può anche esporre le sue metriche nel formato di Prometheus. Avvia Geth con `--metrics --metrics.addr 127.0.0.1` e punta Prometheus a `http://127.0.0.1:6060/debug/metrics/prometheus`.

In questo tutorial, configureremo il tuo client Geth per inviare i dati a InfluxDB per creare un database e a Grafana per creare una visualizzazione grafica dei dati. Farlo manualmente ti aiuterà a comprendere meglio il processo, a modificarlo e a distribuirlo in ambienti diversi.

## Configurare InfluxDB {#setting-up-influxdb}

Per prima cosa, scarichiamo e installiamo InfluxDB. Questo tutorial utilizza InfluxDB 1.x (OSS), che Geth supporta con i flag `--metrics.influxdb` di seguito. Le versioni più recenti di InfluxDB utilizzano una configurazione diversa con organizzazioni, bucket e token invece di database e utenti. Geth supporta InfluxDB 2.x con i flag `--metrics.influxdbv2`, ma i passaggi di configurazione in questo tutorial si applicano solo alla versione 1.x.

Segui le [istruzioni di installazione di InfluxDB 1.x](https://docs.influxdata.com/influxdb/v1/introduction/install/) per il tuo ambiente. Ad esempio, su Debian o Ubuntu puoi installarlo dal repository di InfluxData. Controlla le istruzioni di installazione per l'impronta digitale della chiave di firma corrente prima di fidarti della chiave:

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

Il pacchetto `influxdb` include il client a riga di comando `influx`.

Dopo aver installato con successo InfluxDB, assicurati che sia in esecuzione in background. Per impostazione predefinita, è raggiungibile all'indirizzo `localhost:8086`.
Prima di utilizzare il client `influx`, devi creare un nuovo utente con privilegi di amministratore. Questo utente servirà per la gestione di alto livello, creando database e utenti.

```sh
curl -XPOST "http://localhost:8086/query" --data-urlencode "q=CREATE USER username WITH PASSWORD 'password' WITH ALL PRIVILEGES"
```

Ora puoi usare il client influx per accedere alla [shell di InfluxDB](https://docs.influxdata.com/influxdb/v1/tools/shell/) con questo utente.

```sh
influx -username 'username' -password 'password'
```

Comunicando direttamente con InfluxDB nella sua shell, puoi creare il database e l'utente per le metriche di geth.

```sql
create database geth
create user geth with password '<geth-password>'
```

Verifica le voci create con:

```sql
show databases
show users
```

Esci dalla shell di InfluxDB.

```
exit
```

InfluxDB è in esecuzione e configurato per archiviare le metriche da Geth.

## Preparare Geth {#preparing-geth}

Dopo aver configurato il database, dobbiamo abilitare la raccolta delle metriche in Geth. Presta attenzione a `METRICS AND STATS OPTIONS` in `geth --help`. Lì si possono trovare diverse opzioni, in questo caso vogliamo che Geth invii i dati a InfluxDB.
La configurazione di base specifica l'endpoint in cui InfluxDB è raggiungibile e l'autenticazione per il database.

```sh
geth --metrics --metrics.influxdb --metrics.influxdb.endpoint "http://127.0.0.1:8086" --metrics.influxdb.database "geth" --metrics.influxdb.username "geth" --metrics.influxdb.password "<geth-password>"
```

Usa la stessa password che hai impostato quando hai creato l'utente `geth`. Questi flag possono essere aggiunti a un comando che avvia il client o salvati nel file di configurazione.

Puoi verificare che Geth stia inviando i dati con successo, ad esempio elencando le metriche nel database. Nella shell di InfluxDB:

```sql
use geth
show measurements
```

## Configurare Grafana {#setting-up-grafana}

Il passaggio successivo è l'installazione di Grafana, che interpreterà i dati graficamente. Segui il [processo di installazione per il tuo ambiente](https://grafana.com/docs/grafana/latest/setup-grafana/installation/) nella documentazione di Grafana. Assicurati di installare la versione OSS a meno che tu non abbia bisogno di altro.
Esempio di passaggi di installazione per Debian o Ubuntu utilizzando il repository di Grafana:

```sh
sudo mkdir -p /etc/apt/keyrings
curl -fsSL https://apt.grafana.com/gpg.key | gpg --dearmor | sudo tee /etc/apt/keyrings/grafana.gpg > /dev/null
echo "deb [signed-by=/etc/apt/keyrings/grafana.gpg] https://apt.grafana.com stable main" | sudo tee /etc/apt/sources.list.d/grafana.list
sudo apt update
sudo apt install grafana
sudo systemctl enable grafana-server
sudo systemctl start grafana-server
```

Quando Grafana è in esecuzione, dovrebbe essere raggiungibile all'indirizzo `localhost:3000`.
Usa il tuo browser preferito per accedere a questo percorso, quindi accedi con le credenziali predefinite (utente: `admin` e password: `admin`). Quando richiesto, cambia la password predefinita e salva.

![Screenshot della dashboard di Grafana per il monitoraggio di Geth (pannello 1)](./grafana1.png)

Verrai reindirizzato alla home page di Grafana. Per prima cosa, configura i tuoi dati di origine. Apri il menu e seleziona **Connections > Data sources**. Gli screenshot in questo tutorial provengono da una versione precedente di Grafana, quindi le tue schermate potrebbero avere un aspetto leggermente diverso.

![Screenshot della dashboard di Grafana per il monitoraggio di Geth (pannello 2)](./grafana2.png)

Non ci sono ancora origini dati create, clicca su "Add data source" per definirne una.

![Screenshot della dashboard di Grafana per il monitoraggio di Geth (pannello 3)](./grafana3.png)

Per questa configurazione, seleziona "InfluxDB" e procedi.

![Screenshot della dashboard di Grafana per il monitoraggio di Geth (pannello 4)](./grafana4.png)

La configurazione dell'origine dati è piuttosto semplice se stai eseguendo gli strumenti sulla stessa macchina. Devi impostare l'indirizzo di InfluxDB e i dettagli per accedere al database. Fai riferimento all'immagine sottostante.

![Screenshot della dashboard di Grafana per il monitoraggio di Geth (pannello 5)](./grafana5.png)

Se tutto è completo e InfluxDB è raggiungibile, clicca su "Save and test" e attendi che appaia la conferma.

![Screenshot della dashboard di Grafana per il monitoraggio di Geth (pannello 6)](./grafana6.png)

Grafana è ora configurato per leggere i dati da InfluxDB. Ora devi creare una dashboard che li interpreterà e li visualizzerà. Le proprietà delle dashboard sono codificate in file JSON che possono essere creati da chiunque e importati facilmente. Apri il menu e seleziona **Dashboards**, quindi clicca su **New > Import**.

![Screenshot della dashboard di Grafana per il monitoraggio di Geth (pannello 7)](./grafana7.png)

Per una dashboard di monitoraggio di Geth, copia l'ID di [questa dashboard](https://grafana.com/grafana/dashboards/13877/) e incollalo nella pagina "Import" in Grafana. Dopo aver salvato la dashboard, dovrebbe apparire così:

![Screenshot della dashboard di Grafana per il monitoraggio di Geth (pannello 8)](./grafana8.png)

Puoi modificare le tue dashboard. Ogni pannello può essere modificato, spostato, rimosso o aggiunto. Puoi cambiare le tue configurazioni. Dipende da te! Per saperne di più su come funzionano le dashboard, fai riferimento alla [documentazione di Grafana](https://grafana.com/docs/grafana/latest/dashboards/).
Potresti anche essere interessato ad [Alerting](https://grafana.com/docs/grafana/latest/alerting/). Questo ti consente di impostare notifiche di avviso per quando le metriche raggiungono determinati valori. Sono supportati vari canali di comunicazione.
