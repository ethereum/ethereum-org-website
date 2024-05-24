---
title: Monitoreando Geth con InfluxDB y Grafana
description:
author: "Mario Havel"
tags:
  - "clientes"
  - "nodos"
skill: intermediate
lang: es
published: 2021-01-13
---

Este tutorial le ayudará a configurar el monitoreo de su nodo Geth para que pueda comprender mejor su rendimiento e identificar problemas potenciales.

## Pre requisitos {#prerequisites}

- Ya debería estar ejecutando una instancia de Geth.
- La mayoría de los pasos y ejemplos son para el entorno linux; el conocimiento básico sobre terminales será útil.
- Eche un vistazo a este video de resumen del conjunto de métricas de Geth: [Monitoreo de una infraestructura de Ethereum (Péter Szilágyi)](https://www.youtube.com/watch?v=cOBab8IJMYI).

## Pila de monitoreo {#monitoring-stack}

Un cliente de Ethereum recopila muchos datos que pueden ser leídos en forma de una base de datos cronológica. Para facilitar el monitoreo, usted puede colocar esto en software de visualización de datos. Hay varias opciones disponibles:

- [Prometheus](https://prometheus.io/) (modelo pull)
- [InfluxDB](https://www.influxdata.com/get-influxdb/) (modelo push)
- [Telegraf](https://www.influxdata.com/get-influxdb/)
- [Grafana](https://www.grafana.com/)
- [Datadog](https://www.datadoghq.com/)
- [Chronograf](https://www.influxdata.com/time-series-platform/chronograf/)

También está el [Geth Prometheus Exporter](https://github.com/hunterlong/gethexporter), una opción preconfigurada con InfluxDB y Grafana. Puede configurarlo fácilmente usando docker y [Ethbian OS](https://ethbian.org/index.html) para RPi 4.

En este tutorial configuraremos su cliente Geth para que envíe datos a InfluxDB a fin de crear una base de datos y Grafana para crear una visualización gráfica de los datos. Hacerlo manualmente le ayudará a entender el proceso mejor, modificarlo e implementarlo en diferentes entornos.

## Configuración de InfluxDB {#setting-up-influxdb}

Primero, vamos a descargar e instalar InfluxDB. Puede encontrar varias opciones de descarga en la [página de liberaciones de versión de Influxdata](https://portal.influxdata.com/downloads/). Elija la que se adapte a su entorno. También puede instalarlo desde un [repositorio](https://repos.influxdata.com/). Por ejemplo en la distribución basada en Debian:

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

Después de instalar InfluxDB, asegúrese de que se ejecute en segundo plano. Por defecto, es accesible en `localhost:8086`. Antes de usar el cliente `influx`, tiene que crear un nuevo usuario con privilegios de administrador. Este usuario servirá para una gestión de alto nivel, con creación de bases de datos y usuarios.

```
curl -XPOST "http://localhost:8086/query" --data-urlencode "q=CREATE USER username WITH PASSWORD 'password' WITH ALL PRIVILEGES"
```

Ahora puede utilizar el cliente influx para ingresar [InfluxDB shell](https://docs.influxdata.com/influxdb/v1.8/tools/shell/) con este usuario.

```
influx -username 'username' -password 'password'
```

Comunicándose directamente con InfluxDB en su shell, puede crear una bases de datos y un usuario para las métricas geth.

```
create database geth
create user geth with password choosepassword
```

Verifique las entradas creadas con:

```
show databases
show users
```

Abandone el shell de InfluxDB.

```
exit
```

InfluxDB se está ejecutando y está configurado para almacenar métricas de Geth.

## Preparar Geth {#preparing-geth}

Después de configurar la base de datos, necesitamos habilitar la recolección de métricas en Geth. Preste atención a `METRICS AND STATS OPTIONS` en `geth --help`. Se pueden encontrar múltiples opciones aquí; en este caso queremos que Geth envíe datos a InfluxDB. La configuración básica especifica el endpoint donde InfluxDB es accesible y la autenticación para la base de datos.

```
geth --metrics --metrics.influxdb --metrics.influxdb.endpoint "http://0.0.0.0:8086" --metrics.influxdb.username "geth" --metrics.influxdb.password "chosenpassword"
```

Estos indicadores, o flags, pueden ser añadidos a un comando que inicie el cliente o guardados en el archivo de configuración.

Puede verificar que Geth esté enviando datos con éxito, por ejemplo, incluyendo métricas en la base de datos. En el shell de InfluxDB:

```
use geth
show measurements
```

## Configurar Grafana {#setting-up-grafana}

El siguiente paso es instalar Grafana, que interpretará los datos gráficamente. Siga el proceso de instalación para su entorno en la documentación de Grafana. Asegúrese de instalar la versión OSS si no desea otra cosa. Ejemplo de pasos de instalación para las distribuciones de Debian utilizando el repositorio:

```
curl -tlsv1.3 --proto =https -sL https://packages.grafana.com/gpg.key | sudo apt-key add -
echo "deb https://packages.grafana.com/oss/deb stable main" | sudo tee -a /etc/apt/sources.list.d/grafana.list
sudo apt update
sudo apt install grafana
sudo systemctl enable grafana-server
sudo systemctl start grafana-server
```

Cuando tenga Grafana funcionando, debería ser accesible en `localhost:3000`. Utilice su navegador preferido para acceder a esta ruta y luego inicie sesión con las credenciales predeterminadas (usuario: `admin` y contraseña: `admin`). Cuando se le solicite, cambie la contraseña por defecto y guárdela.

![](./grafana1.png)

Será redirigido a la página principal de Grafana. Primero, configure los datos de origen. Haga clic en el ícono de configuración de la barra izquierda y seleccione "Data sources".

![](./grafana2.png)

No hay ninguna fuente de datos creada todavía, así que haga clic en "Add data source" para definir una.

![](./grafana3.png)

Para esta configuración, seleccione "InfluxDB" y proceda.

![](./grafana4.png)

La configuración de la fuente de datos es bastante sencilla si ejecuta herramientas en la misma máquina. Necesita configurar la dirección de InfluxDB y los detalles para acceder a la base de datos. Consulte la siguiente imagen.

![](./grafana5.png)

Si todo está completado e InfluxDB es alcanzable, haga clic en "Save and test" y espere a que se muestre la confirmación.

![](./grafana6.png)

Grafana ahora está configurado para leer datos de InfluxDB. Ahora necesita crear un panel que se encargará de interpretarlos y mostrarlos. Las propiedades de los paneles están codificados en archivos JSON que pueden ser creados por cualquier persona y fácilmente importados. En la barra lateral, haga clic en "Create and Import".

![](./grafana7.png)

Para obtener un panel de monitoreo de Geth, copie el ID de [este panel](https://grafana.com/grafana/dashboards/13877/) y péguelo en la "página de importación" de Grafana. Luego de guardar el panel, debería verse así:

![](./grafana8.png)

Puede modificar sus paneles. Cada panel puede ser editado, movido, removido o agregado. Puede cambiar las configuraciones. ¡Usted decide! Para leer más sobre el funcionamiento de los paneles, consulte la [documentación de Grafana](https://grafana.com/docs/grafana/latest/dashboards/). También puede que le interese [Alerting](https://grafana.com/docs/grafana/latest/alerting/). Esto le permite configurar notificaciones de alertas para cuando las métricas alcancen ciertos valores. Se admiten varios canales de comunicación.
