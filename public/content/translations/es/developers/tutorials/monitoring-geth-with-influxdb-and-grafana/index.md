---
title: Monitorización de Geth con InfluxDB y Grafana
description: Configure la monitorización de su nodo de Geth con InfluxDB y Grafana para hacer un seguimiento del rendimiento e identificar problemas.
author: "Mario Havel"
tags: [ "clientes", "nodos" ]
skill: intermediate
lang: es
published: 2021-01-13
---

Este tutorial le ayudará a configurar la monitorización para su nodo de Geth, para que pueda comprender mejor su rendimiento e identificar posibles problemas.

## Requisitos previos {#prerequisites}

- Ya debería estar ejecutando una instancia de Geth.
- La mayoría de los pasos y ejemplos son para un entorno Linux; los conocimientos básicos sobre la terminal le serán de gran ayuda.
- Eche un vistazo a este vídeo resumen del conjunto de métricas de Geth: [Monitoring an Ethereum infrastructure por Péter Szilágyi](https://www.youtube.com/watch?v=cOBab8IJMYI).

## Pila de monitorización {#monitoring-stack}

Un cliente de Ethereum recopila una gran cantidad de datos que pueden leerse en forma de una base de datos cronológica. Para facilitar la monitorización, puede introducir estos datos en un software de visualización de datos. Hay varias opciones disponibles:

- [Prometheus](https://prometheus.io/) (modelo de extracción)
- [InfluxDB](https://www.influxdata.com/get-influxdb/) (modelo de inserción)
- [Telegraf](https://www.influxdata.com/get-influxdb/)
- [Grafana](https://www.grafana.com/)
- [Datadog](https://www.datadoghq.com/)
- [Chronograf](https://www.influxdata.com/time-series-platform/chronograf/)

También existe [Geth Prometheus Exporter](https://github.com/hunterlong/gethexporter), una opción preconfigurada con InfluxDB y Grafana.

En este tutorial, configuraremos su cliente de Geth para insertar datos en InfluxDB para crear una base de datos, y en Grafana para crear una visualización gráfica de los datos. Hacerlo manualmente le ayudará a entender mejor el proceso, a alterarlo y a implementarlo en diferentes entornos.

## Configuración de InfluxDB {#setting-up-influxdb}

Primero, descarguemos e instalemos InfluxDB. Puede encontrar varias opciones de descarga en la [página de lanzamientos de Influxdata](https://portal.influxdata.com/downloads/). Elija la que se adapte a su entorno.
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

Tras instalar InfluxDB correctamente, asegúrese de que se esté ejecutando en segundo plano. De forma predeterminada, es accesible en `localhost:8086`.
Antes de usar el cliente `influx`, tiene que crear un nuevo usuario con privilegios de administrador. Este usuario servirá para la gestión de alto nivel, como la creación de bases de datos y usuarios.

```
curl -XPOST "http://localhost:8086/query" --data-urlencode "q=CREATE USER username WITH PASSWORD 'password' WITH ALL PRIVILEGES"
```

Ahora puede usar el cliente influx para entrar en el [shell de InfluxDB](https://docs.influxdata.com/influxdb/v1.8/tools/shell/) con este usuario.

```
influx -username 'username' -password 'password'
```

Comunicándose directamente con InfluxDB en su shell, puede crear la base de datos y el usuario para las métricas de Geth.

```
create database geth
create user geth with password choosepassword
```

Verifique las entradas creadas con:

```
show databases
show users
```

Salga del shell de InfluxDB.

```
exit
```

InfluxDB se está ejecutando y está configurado para almacenar métricas de Geth.

## Preparación de Geth {#preparing-geth}

Después de configurar la base de datos, debemos habilitar la recopilación de métricas en Geth. Preste atención a `METRICS AND STATS OPTIONS` en `geth --help`. Ahí se pueden encontrar múltiples opciones; en este caso, queremos que Geth envíe datos a InfluxDB.
La configuración básica especifica el punto de conexión donde se puede acceder a InfluxDB y la autenticación para la base de datos.

```
geth --metrics --metrics.influxdb --metrics.influxdb.endpoint "http://0.0.0.0:8086" --metrics.influxdb.username "geth" --metrics.influxdb.password "chosenpassword"
```

Estos indicadores pueden adjuntarse a un comando que inicie el cliente o guardarse en el archivo de configuración.

Puede verificar que Geth está insertando datos correctamente, por ejemplo, listando las métricas en la base de datos. En el shell de InfluxDB:

```
use geth
show measurements
```

## Configuración de Grafana {#setting-up-grafana}

El siguiente paso es instalar Grafana, que interpretará los datos gráficamente. Siga el proceso de instalación para su entorno en la documentación de Grafana. Asegúrese de instalar la versión OSS si no desea lo contrario.
Ejemplo de los pasos de instalación para las distribuciones de Debian que utilizan el repositorio:

```
curl -tlsv1.3 --proto =https -sL https://packages.grafana.com/gpg.key | sudo apt-key add -
echo "deb https://packages.grafana.com/oss/deb stable main" | sudo tee -a /etc/apt/sources.list.d/grafana.list
sudo apt update
sudo apt install grafana
sudo systemctl enable grafana-server
sudo systemctl start grafana-server
```

Cuando tenga Grafana en ejecución, se podrá acceder a él en `localhost:3000`.
Use su navegador preferido para acceder a esta ruta, luego inicie sesión con las credenciales predeterminadas (usuario: `admin` y contraseña: `admin`). Cuando se le solicite, cambie la contraseña predeterminada y guárdela.

![](./grafana1.png)

Será redirigido a la página de inicio de Grafana. Primero, configure sus datos de origen. Haga clic en el icono de configuración de la barra izquierda y seleccione "Fuentes de datos".

![](./grafana2.png)

Aún no se ha creado ninguna fuente de datos; haga clic en "Añadir fuente de datos" para definir una.

![](./grafana3.png)

Para esta configuración, seleccione "InfluxDB" y continúe.

![](./grafana4.png)

La configuración de la fuente de datos es bastante sencilla si está ejecutando las herramientas en la misma máquina. Necesita establecer la dirección de InfluxDB y los detalles para acceder a la base de datos. Consulte la imagen de abajo.

![](./grafana5.png)

Si todo está completo y se puede acceder a InfluxDB, haga clic en "Guardar y probar" y espere a que aparezca la confirmación.

![](./grafana6.png)

Grafana ya está configurado para leer datos de InfluxDB. Ahora necesita crear un panel de control que los interpretará y mostrará. Las propiedades de los paneles de control están codificadas en archivos JSON que cualquiera puede crear e importar fácilmente. En la barra izquierda, haga clic en "Crear e importar".

![](./grafana7.png)

Para un panel de monitorización de Geth, copie el ID de [este panel](https://grafana.com/grafana/dashboards/13877/) y péguelo en la "Página de importación" de Grafana. Después de guardar el panel de control, debería tener este aspecto:

![](./grafana8.png)

Puede modificar sus paneles de control. Cada panel se puede editar, mover, eliminar o añadir. Puede cambiar sus configuraciones. ¡Depende de usted! Para saber más sobre cómo funcionan los paneles de control, consulte la [documentación de Grafana](https://grafana.com/docs/grafana/latest/dashboards/).
También podría interesarle la sección [Alertas](https://grafana.com/docs/grafana/latest/alerting/). Esto le permite configurar notificaciones de alerta para cuando las métricas alcancen ciertos valores. Se admiten varios canales de comunicación.
