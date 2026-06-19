---
title: Monitorización de Geth con InfluxDB y Grafana
description: Configure la monitorización para su nodo de Geth utilizando InfluxDB y Grafana para realizar un seguimiento del rendimiento e identificar problemas.
author: "Mario Havel"
tags: ["clientes", "nodos"]
skill: intermediate
breadcrumb: Monitorización de Geth
lang: es
published: 2021-01-13
---

Este tutorial le ayudará a configurar la monitorización para su nodo de Geth para que pueda comprender mejor su rendimiento e identificar posibles problemas.

## Requisitos previos {#prerequisites}

- Ya debería estar ejecutando una instancia de Geth.
- La mayoría de los pasos y ejemplos son para el entorno Linux, por lo que será útil tener conocimientos básicos de la terminal.
- Eche un vistazo a este resumen en vídeo del conjunto de métricas de Geth: [Monitorización de una infraestructura de Ethereum por Péter Szilágyi](https://www.youtube.com/watch?v=cOBab8IJMYI).

## Pila de monitorización {#monitoring-stack}

Un cliente de Ethereum recopila una gran cantidad de datos que se pueden leer en forma de base de datos cronológica. Para facilitar la monitorización, puede introducir estos datos en un software de visualización de datos. Hay varias opciones disponibles:

- [Prometheus](https://prometheus.io/) (modelo pull)
- [InfluxDB](https://www.influxdata.com/get-influxdb/) (modelo push)
- [Telegraf](https://www.influxdata.com/get-influxdb/)
- [Grafana](https://www.grafana.com/)
- [Datadog](https://www.datadoghq.com/)
- [Chronograf](https://www.influxdata.com/time-series-platform/chronograf/)

También existe [Geth Prometheus Exporter](https://github.com/hunterlong/gethexporter), una opción preconfigurada con InfluxDB y Grafana.

En este tutorial, configuraremos su cliente Geth para enviar datos a InfluxDB para crear una base de datos y a Grafana para crear una visualización gráfica de los datos. Hacerlo manualmente le ayudará a comprender mejor el proceso, modificarlo y desplegarlo en diferentes entornos.

## Configuración de InfluxDB {#setting-up-influxdb}

Primero, descarguemos e instalemos InfluxDB. Puede encontrar varias opciones de descarga en la [página de versiones de Influxdata](https://portal.influxdata.com/downloads/). Elija la que mejor se adapte a su entorno.
También puede instalarlo desde un [repositorio](https://repos.influxdata.com/). Por ejemplo, en una distribución basada en Debian:

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

Después de instalar InfluxDB correctamente, asegúrese de que se esté ejecutando en segundo plano. Por defecto, se puede acceder a él en `localhost:8086`.
Antes de usar el cliente `influx`, debe crear un nuevo usuario con privilegios de administrador. Este usuario servirá para la gestión de alto nivel, creando bases de datos y usuarios.

```
curl -XPOST "http://localhost:8086/query" --data-urlencode "q=CREATE USER username WITH PASSWORD 'password' WITH ALL PRIVILEGES"
```

Ahora puede usar el cliente influx para entrar en la [shell de InfluxDB](https://docs.influxdata.com/influxdb/v1.8/tools/shell/) con este usuario.

```
influx -username 'username' -password 'password'
```

Comunicándose directamente con InfluxDB en su shell, puede crear una base de datos y un usuario para las métricas de Geth.

```
create database geth
create user geth with password choosepassword
```

Verifique las entradas creadas con:

```
show databases
show users
```

Salga de la shell de InfluxDB.

```
exit
```

InfluxDB se está ejecutando y está configurado para almacenar métricas de Geth.

## Preparación de Geth {#preparing-geth}

Después de configurar la base de datos, necesitamos habilitar la recopilación de métricas en Geth. Preste atención a `METRICS AND STATS OPTIONS` en `geth --help`. Allí se pueden encontrar múltiples opciones; en este caso, queremos que Geth envíe datos a InfluxDB.
La configuración básica especifica el punto de conexión (endpoint) donde se puede acceder a InfluxDB y la autenticación para la base de datos.

```
geth --metrics --metrics.influxdb --metrics.influxdb.endpoint "http://0.0.0.0:8086" --metrics.influxdb.username "geth" --metrics.influxdb.password "chosenpassword"
```

Estas banderas (flags) se pueden añadir a un comando que inicie el cliente o guardarse en el archivo de configuración.

Puede verificar que Geth está enviando datos correctamente, por ejemplo, enumerando las métricas en la base de datos. En la shell de InfluxDB:

```
use geth
show measurements
```

## Configuración de Grafana {#setting-up-grafana}

El siguiente paso es instalar Grafana, que interpretará los datos gráficamente. Siga el proceso de instalación para su entorno en la documentación de Grafana. Asegúrese de instalar la versión OSS si no desea otra.
Ejemplo de pasos de instalación para distribuciones Debian utilizando el repositorio:

```
curl -tlsv1.3 --proto =https -sL https://packages.grafana.com/gpg.key | sudo apt-key add -
echo "deb https://packages.grafana.com/oss/deb stable main" | sudo tee -a /etc/apt/sources.list.d/grafana.list
sudo apt update
sudo apt install grafana
sudo systemctl enable grafana-server
sudo systemctl start grafana-server
```

Cuando tenga Grafana en ejecución, debería poder acceder a él en `localhost:3000`.
Utilice su navegador preferido para acceder a esta ruta, luego inicie sesión con las credenciales predeterminadas (usuario: `admin` y contraseña: `admin`). Cuando se le solicite, cambie la contraseña predeterminada y guárdela.

![Grafana dashboard screenshot for Geth monitoring (panel 1)](./grafana1.png)

Será redirigido a la página de inicio de Grafana. Primero, configure sus datos de origen. Haga clic en el icono de configuración en la barra izquierda y seleccione "Data sources" (Fuentes de datos).

![Grafana dashboard screenshot for Geth monitoring (panel 2)](./grafana2.png)

Aún no se ha creado ninguna fuente de datos, haga clic en "Add data source" (Añadir fuente de datos) para definir una.

![Grafana dashboard screenshot for Geth monitoring (panel 3)](./grafana3.png)

Para esta configuración, seleccione "InfluxDB" y continúe.

![Grafana dashboard screenshot for Geth monitoring (panel 4)](./grafana4.png)

La configuración de la fuente de datos es bastante sencilla si está ejecutando las herramientas en la misma máquina. Necesita establecer la dirección de InfluxDB y los detalles para acceder a la base de datos. Consulte la imagen a continuación.

![Grafana dashboard screenshot for Geth monitoring (panel 5)](./grafana5.png)

Si todo está completo y se puede acceder a InfluxDB, haga clic en "Save and test" (Guardar y probar) y espere a que aparezca la confirmación.

![Grafana dashboard screenshot for Geth monitoring (panel 6)](./grafana6.png)

Grafana ahora está configurado para leer datos de InfluxDB. Ahora necesita crear un panel (dashboard) que los interpretará y mostrará. Las propiedades de los paneles están codificadas en archivos JSON que pueden ser creados por cualquier persona e importados fácilmente. En la barra izquierda, haga clic en "Create and Import" (Crear e importar).

![Grafana dashboard screenshot for Geth monitoring (panel 7)](./grafana7.png)

Para un panel de monitorización de Geth, copie el ID de [este panel](https://grafana.com/grafana/dashboards/13877/) y péguelo en la página "Import" (Importar) en Grafana. Después de guardar el panel, debería verse así:

![Grafana dashboard screenshot for Geth monitoring (panel 8)](./grafana8.png)

Puede modificar sus paneles. Cada panel se puede editar, mover, eliminar o añadir. Puede cambiar sus configuraciones. ¡Depende de usted! Para obtener más información sobre cómo funcionan los paneles, consulte la [documentación de Grafana](https://grafana.com/docs/grafana/latest/dashboards/).
También podría interesarle la sección de [Alertas](https://grafana.com/docs/grafana/latest/alerting/). Esto le permite configurar notificaciones de alerta para cuando las métricas alcancen ciertos valores. Se admiten varios canales de comunicación.