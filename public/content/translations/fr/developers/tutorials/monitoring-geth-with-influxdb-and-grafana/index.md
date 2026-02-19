---
title: Surveillance de Geth avec InfluxDB et Grafana
description: "Configurez la surveillance de votre nœud Geth avec InfluxDB et Grafana pour suivre les performances et identifier les problèmes."
author: "Mario Havel"
tags: [ "clients", "nœuds" ]
skill: intermediate
lang: fr
published: 2021-01-13
---

Ce tutoriel vous aidera à mettre en place une surveillance de votre nœud Geth afin de mieux comprendre ses performances et d'identifier les problèmes potentiels.

## Prérequis {#prerequisites}

- Vous devriez déjà avoir une instance de Geth en cours d'exécution.
- La plupart des étapes et des exemples sont destinés à un environnement Linux ; des connaissances de base du terminal seront utiles.
- Découvrez cet aperçu vidéo de la suite de métriques de Geth : [Surveillance d'une infrastructure Ethereum par Péter Szilágyi](https://www.youtube.com/watch?v=cOBab8IJMYI).

## Pile de surveillance {#monitoring-stack}

Un client Ethereum collecte de nombreuses données qui peuvent être lues sous la forme d'une base de données chronologique. Pour faciliter la surveillance, vous pouvez intégrer ces données dans un logiciel de visualisation. Plusieurs options sont disponibles :

- [Prometheus](https://prometheus.io/) (modèle pull)
- [InfluxDB](https://www.influxdata.com/get-influxdb/) (modèle push)
- [Telegraf](https://www.influxdata.com/get-influxdb/)
- [Grafana](https://www.grafana.com/)
- [Datadog](https://www.datadoghq.com/)
- [Chronograf](https://www.influxdata.com/time-series-platform/chronograf/)

Il existe également [Geth Prometheus Exporter](https://github.com/hunterlong/gethexporter), une option préconfigurée avec InfluxDB et Grafana.

Dans ce tutoriel, nous allons configurer votre client Geth pour pousser des données sur InfluxDB afin de créer une base de données, et sur Grafana pour créer une visualisation graphique des données. Le faire manuellement vous aidera à mieux comprendre le processus, à le modifier et à le déployer dans différents environnements.

## Configuration d'InfluxDB {#setting-up-influxdb}

Tout d'abord, téléchargeons et installons InfluxDB. Vous trouverez plusieurs options de téléchargement sur la [page des versions d'Influxdata](https://portal.influxdata.com/downloads/). Choisissez celle qui convient à votre environnement.
Vous pouvez également l'installer depuis un [dépôt](https://repos.influxdata.com/). Par exemple, pour une distribution basée sur Debian :

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

Après avoir installé InfluxDB avec succès, assurez-vous qu'il fonctionne en arrière-plan. Par défaut, il est accessible à l'adresse `localhost:8086`.
Avant d'utiliser le client `influx`, vous devez créer un nouvel utilisateur avec des privilèges d'administrateur. Cet utilisateur servira à la gestion de haut niveau, à la création de bases de données et d'utilisateurs.

```
curl -XPOST "http://localhost:8086/query" --data-urlencode "q=CREATE USER username WITH PASSWORD 'password' WITH ALL PRIVILEGES"
```

Vous pouvez maintenant utiliser le client influx pour entrer dans le [shell InfluxDB](https://docs.influxdata.com/influxdb/v1.8/tools/shell/) avec cet utilisateur.

```
influx -username 'username' -password 'password'
```

En communiquant directement avec InfluxDB dans son shell, vous pouvez créer une base de données et un utilisateur pour les métriques de Geth.

```
create database geth
create user geth with password choosepassword
```

Vérifiez les entrées créées avec :

```
show databases
show users
```

Quittez le shell InfluxDB.

```
exit
```

InfluxDB est en cours d'exécution et configuré pour stocker les métriques de Geth.

## Préparation de Geth {#preparing-geth}

Après avoir configuré la base de données, nous devons activer la collecte de métriques dans Geth. Faites attention aux `METRICS AND STATS OPTIONS` dans `geth --help`. Vous y trouverez plusieurs options ; dans notre cas, nous voulons que Geth pousse les données vers InfluxDB.
La configuration de base spécifie le point de terminaison où InfluxDB est joignable et l'authentification pour la base de données.

```
geth --metrics --metrics.influxdb --metrics.influxdb.endpoint "http://0.0.0.0:8086" --metrics.influxdb.username "geth" --metrics.influxdb.password "chosenpassword"
```

Ces options peuvent être ajoutées à une commande qui lance le client ou être enregistrées dans le fichier de configuration.

Vous pouvez vérifier que Geth pousse bien les données, par exemple en listant les métriques dans la base de données. Dans le shell InfluxDB :

```
use geth
show measurements
```

## Configuration de Grafana {#setting-up-grafana}

L'étape suivante consiste à installer Grafana, qui interprétera les données graphiquement. Suivez le processus d'installation pour votre environnement dans la documentation de Grafana. Assurez-vous d'installer la version OSS si vous n'avez pas besoin d'une autre version.
Exemple d'étapes d'installation pour les distributions Debian à l'aide du dépôt :

```
curl -tlsv1.3 --proto =https -sL https://packages.grafana.com/gpg.key | sudo apt-key add -
echo "deb https://packages.grafana.com/oss/deb stable main" | sudo tee -a /etc/apt/sources.list.d/grafana.list
sudo apt update
sudo apt install grafana
sudo systemctl enable grafana-server
sudo systemctl start grafana-server
```

Lorsque Grafana est en cours d'exécution, il devrait être accessible à l'adresse `localhost:3000`.
Utilisez votre navigateur préféré pour accéder à ce chemin, puis connectez-vous avec les identifiants par défaut (utilisateur : `admin` et mot de passe : `admin`). Lorsque vous y êtes invité, changez le mot de passe par défaut et enregistrez.

![](./grafana1.png)

Vous serez redirigé vers la page d'accueil de Grafana. Tout d'abord, configurez vos données sources. Cliquez sur l'icône de configuration dans la barre de gauche et sélectionnez "Sources de données".

![](./grafana2.png)

Aucune source de données n'a encore été créée, cliquez sur "Ajouter une source de données" pour en définir une.

![](./grafana3.png)

Pour cette configuration, sélectionnez "InfluxDB" et continuez.

![](./grafana4.png)

La configuration de la source de données est assez simple si vous exécutez les outils sur la même machine. Vous devez définir l'adresse d'InfluxDB et les informations d'accès à la base de données. Reportez-vous à l'image ci-dessous.

![](./grafana5.png)

Si tout est complet et qu'InfluxDB est accessible, cliquez sur "Enregistrer et tester" et attendez que la confirmation apparaisse.

![](./grafana6.png)

Grafana est maintenant configuré pour lire les données depuis InfluxDB. Vous devez maintenant créer un tableau de bord qui interprétera et affichera ces données. Les propriétés des tableaux de bord sont encodées dans des fichiers JSON qui peuvent être créés par n'importe qui et importés facilement. Dans la barre de gauche, cliquez sur "Créer et Importer".

![](./grafana7.png)

Pour un tableau de bord de surveillance Geth, copiez l'ID de [ce tableau de bord](https://grafana.com/grafana/dashboards/13877/) et collez-le dans la "Page d'importation" dans Grafana. Après avoir enregistré le tableau de bord, il devrait ressembler à ceci :

![](./grafana8.png)

Vous pouvez modifier vos tableaux de bord. Chaque panneau peut être modifié, déplacé, supprimé ou ajouté. Vous pouvez modifier vos configurations. À vous de jouer ! Pour en savoir plus sur le fonctionnement des tableaux de bord, consultez la [documentation de Grafana](https://grafana.com/docs/grafana/latest/dashboards/).
Les [alertes](https://grafana.com/docs/grafana/latest/alerting/) pourraient également vous intéresser. Cela vous permet de configurer des notifications d'alerte pour les cas où les métriques atteignent certaines valeurs. Divers canaux de communication sont pris en charge.
