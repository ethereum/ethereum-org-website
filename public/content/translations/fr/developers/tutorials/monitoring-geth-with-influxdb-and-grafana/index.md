---
title: Surveiller Geth avec InfluxDB et Grafana
description: "Configurez la surveillance de votre nœud Geth à l'aide d'InfluxDB et de Grafana pour suivre les performances et identifier les problèmes."
author: "Mario Havel"
tags: ["clients", "nœuds"]
skill: intermediate
breadcrumb: Surveiller Geth
lang: fr
published: 2021-01-13
---

Ce tutoriel vous aidera à configurer la surveillance de votre nœud Geth afin de mieux comprendre ses performances et d'identifier les problèmes potentiels.

## Prérequis {#prerequisites}

- Vous devez déjà exécuter une instance de Geth.
- La plupart des étapes et des exemples sont destinés à un environnement Linux, des connaissances de base du terminal seront utiles.
- Découvrez cet aperçu vidéo de la suite de métriques de Geth : [Surveiller une infrastructure Ethereum par Péter Szilágyi](https://www.youtube.com/watch?v=cOBab8IJMYI).

## Pile de surveillance {#monitoring-stack}

Un client Ethereum collecte de nombreuses données qui peuvent être lues sous la forme d'une base de données chronologique. Pour faciliter la surveillance, vous pouvez les intégrer dans un logiciel de visualisation de données. Plusieurs options sont disponibles :

- [Prometheus](https://prometheus.io/) (modèle pull)
- [InfluxDB](https://www.influxdata.com/get-influxdb/) (modèle push)
- [Telegraf](https://www.influxdata.com/time-series-platform/telegraf/)
- [Grafana](https://www.grafana.com/)
- [Datadog](https://www.datadoghq.com/)
- [Chronograf](https://www.influxdata.com/time-series-platform/chronograf/)

Si vous préférez Prometheus, Geth peut également exposer ses métriques au format Prometheus. Démarrez Geth avec `--metrics --metrics.addr 127.0.0.1` et pointez Prometheus vers `http://127.0.0.1:6060/debug/metrics/prometheus`.

Dans ce tutoriel, nous allons configurer votre client Geth pour qu'il pousse les données vers InfluxDB afin de créer une base de données, et vers Grafana pour créer une visualisation graphique des données. Le faire manuellement vous aidera à mieux comprendre le processus, à le modifier et à le déployer dans différents environnements.

## Configuration d'InfluxDB {#setting-up-influxdb}

Tout d'abord, téléchargeons et installons InfluxDB. Ce tutoriel utilise InfluxDB 1.x (OSS), que Geth prend en charge avec les options `--metrics.influxdb` ci-dessous. Les versions plus récentes d'InfluxDB utilisent une configuration différente avec des organisations, des compartiments (buckets) et des jetons (tokens) au lieu de bases de données et d'utilisateurs. Geth prend en charge InfluxDB 2.x avec les options `--metrics.influxdbv2`, mais les étapes de configuration de ce tutoriel ne s'appliquent qu'à la version 1.x.

Suivez les [instructions d'installation d'InfluxDB 1.x](https://docs.influxdata.com/influxdb/v1/introduction/install/) pour votre environnement. Par exemple, sur Debian ou Ubuntu, vous pouvez l'installer à partir du dépôt InfluxData. Vérifiez les instructions d'installation pour connaître l'empreinte de la clé de signature actuelle avant de faire confiance à la clé :

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

Le paquet `influxdb` inclut le client en ligne de commande `influx`.

Après avoir installé InfluxDB avec succès, assurez-vous qu'il s'exécute en arrière-plan. Par défaut, il est accessible à l'adresse `localhost:8086`.
Avant d'utiliser le client `influx`, vous devez créer un nouvel utilisateur avec des privilèges d'administrateur. Cet utilisateur servira à la gestion de haut niveau, à la création de bases de données et d'utilisateurs.

```sh
curl -XPOST "http://localhost:8086/query" --data-urlencode "q=CREATE USER username WITH PASSWORD 'password' WITH ALL PRIVILEGES"
```

Vous pouvez maintenant utiliser le client influx pour accéder au [shell InfluxDB](https://docs.influxdata.com/influxdb/v1/tools/shell/) avec cet utilisateur.

```sh
influx -username 'username' -password 'password'
```

En communiquant directement avec InfluxDB dans son shell, vous pouvez créer une base de données et un utilisateur pour les métriques de Geth.

```sql
create database geth
create user geth with password '<geth-password>'
```

Vérifiez les entrées créées avec :

```sql
show databases
show users
```

Quittez le shell InfluxDB.

```
exit
```

InfluxDB est en cours d'exécution et configuré pour stocker les métriques de Geth.

## Préparation de Geth {#preparing-geth}

Après avoir configuré la base de données, nous devons activer la collecte de métriques dans Geth. Faites attention à `METRICS AND STATS OPTIONS` dans `geth --help`. Plusieurs options s'y trouvent, dans ce cas nous voulons que Geth pousse les données dans InfluxDB.
La configuration de base spécifie le point de terminaison où InfluxDB est accessible et l'authentification pour la base de données.

```sh
geth --metrics --metrics.influxdb --metrics.influxdb.endpoint "http://127.0.0.1:8086" --metrics.influxdb.database "geth" --metrics.influxdb.username "geth" --metrics.influxdb.password "<geth-password>"
```

Utilisez le même mot de passe que celui que vous avez défini lors de la création de l'utilisateur `geth`. Ces options peuvent être ajoutées à une commande de démarrage du client ou enregistrées dans le fichier de configuration.

Vous pouvez vérifier que Geth pousse les données avec succès, par exemple en listant les métriques dans la base de données. Dans le shell InfluxDB :

```sql
use geth
show measurements
```

## Configuration de Grafana {#setting-up-grafana}

L'étape suivante consiste à installer Grafana qui interprétera les données graphiquement. Suivez le [processus d'installation pour votre environnement](https://grafana.com/docs/grafana/latest/setup-grafana/installation/) dans la documentation de Grafana. Assurez-vous d'installer la version OSS à moins que vous n'ayez besoin d'autre chose.
Exemple d'étapes d'installation pour Debian ou Ubuntu en utilisant le dépôt Grafana :

```sh
sudo mkdir -p /etc/apt/keyrings
curl -fsSL https://apt.grafana.com/gpg.key | gpg --dearmor | sudo tee /etc/apt/keyrings/grafana.gpg > /dev/null
echo "deb [signed-by=/etc/apt/keyrings/grafana.gpg] https://apt.grafana.com stable main" | sudo tee /etc/apt/sources.list.d/grafana.list
sudo apt update
sudo apt install grafana
sudo systemctl enable grafana-server
sudo systemctl start grafana-server
```

Une fois que Grafana est en cours d'exécution, il devrait être accessible à l'adresse `localhost:3000`.
Utilisez votre navigateur préféré pour accéder à ce chemin, puis connectez-vous avec les identifiants par défaut (utilisateur : `admin` et mot de passe : `admin`). Lorsque vous y êtes invité, modifiez le mot de passe par défaut et enregistrez.

![Capture d'écran du tableau de bord Grafana pour la surveillance de Geth (panneau 1)](./grafana1.png)

Vous serez redirigé vers la page d'accueil de Grafana. Tout d'abord, configurez vos données sources. Ouvrez le menu et sélectionnez **Connections > Data sources** (Connexions > Sources de données). Les captures d'écran de ce tutoriel proviennent d'une ancienne version de Grafana, vos écrans peuvent donc être légèrement différents.

![Capture d'écran du tableau de bord Grafana pour la surveillance de Geth (panneau 2)](./grafana2.png)

Il n'y a pas encore de sources de données créées, cliquez sur « Add data source » (Ajouter une source de données) pour en définir une.

![Capture d'écran du tableau de bord Grafana pour la surveillance de Geth (panneau 3)](./grafana3.png)

Pour cette configuration, sélectionnez « InfluxDB » et continuez.

![Capture d'écran du tableau de bord Grafana pour la surveillance de Geth (panneau 4)](./grafana4.png)

La configuration de la source de données est assez simple si vous exécutez les outils sur la même machine. Vous devez définir l'adresse d'InfluxDB et les détails d'accès à la base de données. Référez-vous à l'image ci-dessous.

![Capture d'écran du tableau de bord Grafana pour la surveillance de Geth (panneau 5)](./grafana5.png)

Si tout est complet et qu'InfluxDB est accessible, cliquez sur « Save and test » (Enregistrer et tester) et attendez que la confirmation apparaisse.

![Capture d'écran du tableau de bord Grafana pour la surveillance de Geth (panneau 6)](./grafana6.png)

Grafana est maintenant configuré pour lire les données d'InfluxDB. Vous devez maintenant créer un tableau de bord qui les interprétera et les affichera. Les propriétés des tableaux de bord sont encodées dans des fichiers JSON qui peuvent être créés par n'importe qui et facilement importés. Ouvrez le menu et sélectionnez **Dashboards** (Tableaux de bord), puis cliquez sur **New > Import** (Nouveau > Importer).

![Capture d'écran du tableau de bord Grafana pour la surveillance de Geth (panneau 7)](./grafana7.png)

Pour un tableau de bord de surveillance de Geth, copiez l'ID de [ce tableau de bord](https://grafana.com/grafana/dashboards/13877/) et collez-le dans la page « Import » (Importer) de Grafana. Après avoir enregistré le tableau de bord, il devrait ressembler à ceci :

![Capture d'écran du tableau de bord Grafana pour la surveillance de Geth (panneau 8)](./grafana8.png)

Vous pouvez modifier vos tableaux de bord. Chaque panneau peut être édité, déplacé, supprimé ou ajouté. Vous pouvez modifier vos configurations. C'est à vous de décider ! Pour en savoir plus sur le fonctionnement des tableaux de bord, consultez la [documentation de Grafana](https://grafana.com/docs/grafana/latest/dashboards/).
Vous pourriez également être intéressé par les [Alertes](https://grafana.com/docs/grafana/latest/alerting/). Cela vous permet de configurer des notifications d'alerte lorsque les métriques atteignent certaines valeurs. Divers canaux de communication sont pris en charge.
