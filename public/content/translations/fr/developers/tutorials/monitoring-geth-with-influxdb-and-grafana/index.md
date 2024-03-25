---
title: Surveillance de Geth avec InfluxDB et Grafana
description:
author: "Mario Havel"
tags:
  - "clients"
  - "nœuds"
skill: intermediate
lang: fr
published: 2021-01-13
---

Ce tutoriel vous aidera à mettre en place une surveillance de votre nœud Geth afin de mieux comprendre ses performances et identifier les problèmes potentiels.

## Prérequis {#prerequisites}

- Vous devriez déjà savoir exécuter une instance Geth.
- La plupart des étapes et des exemples étant réalisés pour l'environnement linux, la connaissance des bases sur terminal sera utile.
- Visionnez cette vidéo pour obtenir un aperçu de suite de métriques de Geth : [Surveillance d'une infrastructure Ethereum par Péter Szilágyi](https://www.youtube.com/watch?v=cOBab8IJMYI).

## Pile de surveillance {#monitoring-stack}

Un client Ethereum collecte de nombreuses données qui peuvent être lues sous la forme d'une base de données chronologique. Pour faciliter la surveillance, vous pouvez l'intégrer dans le logiciel de visualisation des données. Plusieurs options sont disponibles :

- [Prometheus](https://prometheus.io/) (modèle de retrait)
- [InfluxDB](https://www.influxdata.com/get-influxdb/) (modèle d'ajout)
- [Telegraf](https://www.influxdata.com/get-influxdb/)
- [Grafana](https://www.grafana.com/)
- [Datadog](https://www.datadoghq.com/)
- [Chronograf](https://www.influxdata.com/time-series-platform/chronograf/)

Il existe également [Geth Prometheus Exporter](https://github.com/hunterlong/gethexporter), une option préconfigurée avec InfluxDB et Grafana. Vous pouvez le configurer facilement en utilisant docker et [Ethbian OS](https://ethbian.org/index.html) pour RPi 4.

Dans ce tutoriel, nous allons configurer votre client Geth pour pousser des données sur InfluxDB afin de créer une base de données, et Grafana pour créer une visualisation graphique des données. Réaliser cela manuellement vous aidera à mieux comprendre le processus, à le modifier et à le déployer dans différents environnements.

## Configuration de InfluxDB {#setting-up-influxdb}

Tout d'abord, téléchargeons et installons InfluxDB. Diverses options de téléchargement peuvent être trouvées sur la page des versions de [Influxdata](https://portal.influxdata.com/downloads/). Choisissez celles qui conviennent à votre environnement. Vous pouvez également l'installer depuis un [dépôt](https://repos.influxdata.com/). Par exemple dans la distribution basée sur Debian :

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

Après avoir installé InfluxDB avec succès, assurez-vous qu'il fonctionne en arrière-plan. Par défaut, il est accessible via `localhost:8086`. Avant d'utiliser le client `influx`, vous devez créer un nouvel utilisateur avec les privilèges d'administrateur. Cet utilisateur servira à la gestion de haut niveau, à la création de bases de données et d'utilisateurs.

```
curl -XPOST "http://localhost:8086/query" --data-urlencode "q=CREATE USER username WITH PASSWORD 'password' WITH ALL PRIVILEGES"
```

Maintenant, vous pouvez utiliser le client influx pour entrer [InfluxDB shell](https://docs.influxdata.com/influxdb/v1.8/tools/shell/) avec cet utilisateur.

```
influx -username 'username' -password 'password'
```

En communiquant directement avec InfluxDB dans son invite de commande, vous pouvez créer une base de données et un utilisateur pour les métriques Geth.

```
create database geth
create user geth with password choosepassword
```

Vérifiez les entrées créées avec :

```
show databases
show users
```

Quitter l’invite de commande InfluxDB.

```
exit
```

InfluxDB est en cours d'exécution et configuré pour stocker les métriques Geth.

## Préparation de Geth {#preparing-geth}

Après avoir configuré la base de données, nous devons activer la collecte des métriques dans Geth. Faites attention aux `OPTIONS METRICS ET STATS` dans `geth --help`. Plusieurs options peuvent y être trouvées. Dans ce cas, nous voulons que Geth envoie des données dans InfluxDB. La configuration de base spécifie le point de terminaison où InfluxDB est accessible ainsi que l'authentification pour la base de données.

```
geth --metrics --metrics.influxdb --metrics.influxdb.endpoint "http://0.0.0.0:8086" --metrics.influxdb.username "geth" --metrics.influxdb.password "chosenpassword"
```

Ces options peuvent être ajoutées à une commande démarrant le client ou enregistrées dans le fichier de configuration.

Vous pouvez vérifier que Geth envoie les données avec succès, par exemple en listant les paramètres dans la base de données. Dans l'invite de commande InfluxDB :

```
use geth
show measurements
```

## Configuration de Grafana {#setting-up-grafana}

L'étape suivante est l'installation de Grafana qui interprétera les données graphiquement. Suivez le processus d'installation au regard de votre environnement dans la documentation de Grafana. Assurez-vous d'installer la version OSS si vous ne voulez pas le contraire. Exemple d'étapes d'installation pour les distributions Debian en utilisant le dépôt :

```
curl -tlsv1.3 --proto =https -sL https://packages.grafana.com/gpg.key | sudo apt-key add -
echo "deb https://packages.grafana.com/oss/deb stable main" | sudo tee -a /etc/apt/sources.list.d/grafana.list
sudo apt update
sudo apt install grafana
sudo systemctl enable grafana-server
sudo systemctl start grafana-server
```

Lorsque Grafana est en cours d'exécution, il devrait être accessible via `localhost:3000`. Utilisez votre navigateur préféré pour accéder à ce chemin, puis connectez-vous avec les identifiants par défaut (utilisateur : `admin` et mot de passe : `admin`). Lorsque vous y êtes invité, changez le mot de passe par défaut et enregistrez.

![](./grafana1.png)

Vous serez redirigé vers la page d'accueil de Grafana. Tout d'abord, configurez vos données sources. Cliquez sur l'icône de configuration dans la barre de gauche et sélectionnez « Data sources ».

![](./grafana2.png)

Il n'y a pas encore de sources de données créées, cliquez sur « Add data source » pour en définir.

![](./grafana3.png)

Pour cette configuration, sélectionnez « InfluxDB » et continuez.

![](./grafana4.png)

La configuration des données sources est assez directe si vous utilisez des outils sur la même machine. Vous devez définir l'adresse InfluxDB et les détails pour accéder à la base de données. Reportez-vous à l'image ci-dessous.

![](./grafana5.png)

Si la configuration est complète et que InfluxDB est joignable, cliquez sur « Save and test » et attendez que la confirmation apparaisse.

![](./grafana6.png)

Grafana est maintenant configuré pour lire les données depuis InfluxDB. Maintenant, vous devez créer un tableau de bord qui les interpréter et les affichera. Les propriétés des tableaux de bord sont encodées en fichiers JSON qui peuvent être créés par n'importe qui et facilement importés. Dans la barre de gauche, cliquez sur « Create and Import ».

![](./grafana7.png)

Pour un tableau de bord de surveillance Geth, copiez l'ID de [ce tableau de bord](https://grafana.com/grafana/dashboards/13877/) et collez-le dans « Import page » sur Grafana. Après avoir enregistré le tableau de bord, il devrait ressembler à ceci :

![](./grafana8.png)

Vous pouvez modifier vos tableaux de bord. Chaque panneau peut être modifié, déplacé, supprimé ou ajouté. Vous pouvez modifier vos configurations. C'est à vous ! Pour en savoir plus sur le fonctionnement des tableaux de bord, reportez-vous à la documentation de [Grafana](https://grafana.com/docs/grafana/latest/dashboards/). Vous pourriez également être intéressé par [Alerte](https://grafana.com/docs/grafana/latest/alerting/). Cela vous permet de configurer des notifications d'alerte lorsque les paramètres atteignent certaines valeurs. Différents canaux de communication sont pris en charge.
