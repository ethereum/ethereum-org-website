---
title: "Monitorización de Geth con InfluxDB y Grafana"
description: "Configure la monitorización para su nodo de Geth utilizando InfluxDB y Grafana para realizar un seguimiento del rendimiento e identificar problemas."
author: "Mario Havel"
tags: ["clientes", "nodos"]
skill: intermediate
breadcrumb: "Monitorización de Geth"
lang: es
published: 2021-01-13
---

Este tutorial le ayudará a configurar la monitorización para su nodo de Geth para que pueda comprender mejor su rendimiento e identificar posibles problemas.

## Requisitos previos {#prerequisites}

- Ya debería estar ejecutando una instancia de Geth.
- La mayoría de los pasos y ejemplos son para el entorno Linux, por lo que será útil tener conocimientos básicos de la terminal.
- Eche un vistazo a este resumen en vídeo del conjunto de métricas de Geth: [Monitorización de una infraestructura de Ethereum por Péter Szilágyi](https://www.youtube.com/watch?v=cOBab8IJMYI).

## Pila de monitorización {#monitoring-stack}

Un cliente de Ethereum recopila una gran cantidad de datos que se pueden leer en forma de base de datos cronológica. Para facilitar la monitorización, puede introducir estos datos en un software de visualización de datos. Hay múltiples opciones disponibles:

- [Prometheus](https://prometheus.io/) (modelo pull)
- [InfluxDB](https://www.influxdata.com/get-influxdb/) (modelo push)
- [Telegraf](https://www.influxdata.com/time-series-platform/telegraf/)
- [Grafana](https://www.grafana.com/)
- [Datadog](https://www.datadoghq.com/)
- [Chronograf](https://www.influxdata.com/time-series-platform/chronograf/)

Si prefiere Prometheus, Geth también puede exponer sus métricas en formato Prometheus. Inicie Geth con `--metrics --metrics.addr 127.0.0.1` y apunte Prometheus a `http://127.0.0.1:6060/debug/metrics/prometheus`.

En este tutorial, configuraremos su cliente de Geth para enviar datos a InfluxDB para crear una base de datos y a Grafana para crear una visualización gráfica de los datos. Hacerlo manualmente le ayudará a comprender mejor el proceso, modificarlo y desplegarlo en diferentes entornos.

## Configuración de InfluxDB {#setting-up-influxdb}

Primero, descarguemos e instalemos InfluxDB. Este tutorial utiliza InfluxDB 1.x (OSS), que Geth soporta con las banderas `--metrics.influxdb` a continuación. Las versiones más recientes de InfluxDB utilizan una configuración diferente con organizaciones, depósitos (buckets) y tokens en lugar de bases de datos y usuarios. Geth soporta InfluxDB 2.x con las banderas `--metrics.influxdbv2`, pero los pasos de configuración en este tutorial solo se aplican a la versión 1.x.

Siga las [instrucciones de instalación de InfluxDB 1.x](https://docs.influxdata.com/influxdb/v1/introduction/install/) para su entorno. Por ejemplo, en Debian o Ubuntu puede instalarlo desde el repositorio de InfluxData. Compruebe las instrucciones de instalación para ver la huella digital de la clave de firma actual antes de confiar en la clave:

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

El paquete `influxdb` incluye el cliente de línea de comandos `influx`.

Después de instalar InfluxDB con éxito, asegúrese de que se esté ejecutando en segundo plano. Por defecto, es accesible en `localhost:8086`.
Antes de usar el cliente `influx`, debe crear un nuevo usuario con privilegios de administrador. Este usuario servirá para la gestión de alto nivel, creando bases de datos y usuarios.

```sh
curl -XPOST "http://localhost:8086/query" --data-urlencode "q=CREATE USER username WITH PASSWORD 'password' WITH ALL PRIVILEGES"
```

Ahora puede usar el cliente influx para entrar en la [shell de InfluxDB](https://docs.influxdata.com/influxdb/v1/tools/shell/) con este usuario.

```sh
influx -username 'username' -password 'password'
```

Comunicándose directamente con InfluxDB en su shell, puede crear una base de datos y un usuario para las métricas de Geth.

```sql
create database geth
create user geth with password '<geth-password>'
```

Verifique las entradas creadas con:

```sql
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
La configuración básica especifica el punto de conexión (endpoint) donde InfluxDB es accesible y la autenticación para la base de datos.

```sh
geth --metrics --metrics.influxdb --metrics.influxdb.endpoint "http://127.0.0.1:8086" --metrics.influxdb.database "geth" --metrics.influxdb.username "geth" --metrics.influxdb.password "<geth-password>"
```

Utilice la misma contraseña que estableció cuando creó el usuario `geth`. Estas banderas se pueden añadir a un comando que inicie el cliente o guardarse en el archivo de configuración.

Puede verificar que Geth está enviando datos con éxito, por ejemplo, listando las métricas en la base de datos. En la shell de InfluxDB:

```sql
use geth
show measurements
```

## Configuración de Grafana {#setting-up-grafana}

El siguiente paso es instalar Grafana, que interpretará los datos gráficamente. Siga el [proceso de instalación para su entorno](https://grafana.com/docs/grafana/latest/setup-grafana/installation/) en la documentación de Grafana. Asegúrese de instalar la versión OSS a menos que necesite otra cosa.
Ejemplo de pasos de instalación para Debian o Ubuntu utilizando el repositorio de Grafana:

```sh
sudo mkdir -p /etc/apt/keyrings
curl -fsSL https://apt.grafana.com/gpg.key | gpg --dearmor | sudo tee /etc/apt/keyrings/grafana.gpg > /dev/null
echo "deb [signed-by=/etc/apt/keyrings/grafana.gpg] https://apt.grafana.com stable main" | sudo tee /etc/apt/sources.list.d/grafana.list
sudo apt update
sudo apt install grafana
sudo systemctl enable grafana-server
sudo systemctl start grafana-server
```

Cuando tenga Grafana en ejecución, debería ser accesible en `localhost:3000`.
Utilice su navegador preferido para acceder a esta ruta, luego inicie sesión con las credenciales predeterminadas (usuario: `admin` y contraseña: `admin`). Cuando se le solicite, cambie la contraseña predeterminada y guárdela.

![Captura de pantalla del panel de Grafana para la monitorización de Geth (panel 1)](./grafana1.png)

Será redirigido a la página de inicio de Grafana. Primero, configure sus datos de origen. Abra el menú y seleccione **Connections > Data sources**. Las capturas de pantalla de este tutorial son de una versión anterior de Grafana, por lo que sus pantallas pueden verse un poco diferentes.

![Captura de pantalla del panel de Grafana para la monitorización de Geth (panel 2)](./grafana2.png)

Aún no hay fuentes de datos creadas, haga clic en "Add data source" para definir una.

![Captura de pantalla del panel de Grafana para la monitorización de Geth (panel 3)](./grafana3.png)

Para esta configuración, seleccione "InfluxDB" y continúe.

![Captura de pantalla del panel de Grafana para la monitorización de Geth (panel 4)](./grafana4.png)

La configuración de la fuente de datos es bastante sencilla si está ejecutando herramientas en la misma máquina. Necesita establecer la dirección de InfluxDB y los detalles para acceder a la base de datos. Consulte la imagen a continuación.

![Captura de pantalla del panel de Grafana para la monitorización de Geth (panel 5)](./grafana5.png)

Si todo está completo e InfluxDB es accesible, haga clic en "Save and test" y espere a que aparezca la confirmación.

![Captura de pantalla del panel de Grafana para la monitorización de Geth (panel 6)](./grafana6.png)

Grafana ahora está configurado para leer datos de InfluxDB. Ahora necesita crear un panel (dashboard) que los interpretará y mostrará. Las propiedades de los paneles están codificadas en archivos JSON que pueden ser creados por cualquier persona e importados fácilmente. Abra el menú y seleccione **Dashboards**, luego haga clic en **New > Import**.

![Captura de pantalla del panel de Grafana para la monitorización de Geth (panel 7)](./grafana7.png)

Para un panel de monitorización de Geth, copie el ID de [este panel](https://grafana.com/grafana/dashboards/13877/) y péguelo en la página "Import" en Grafana. Después de guardar el panel, debería verse así:

![Captura de pantalla del panel de Grafana para la monitorización de Geth (panel 8)](./grafana8.png)

Puede modificar sus paneles. Cada panel se puede editar, mover, eliminar o añadir. Puede cambiar sus configuraciones. ¡Depende de usted! Para obtener más información sobre cómo funcionan los paneles, consulte la [documentación de Grafana](https://grafana.com/docs/grafana/latest/dashboards/).
También podría interesarle [Alerting](https://grafana.com/docs/grafana/latest/alerting/). Esto le permite configurar notificaciones de alerta para cuando las métricas alcancen ciertos valores. Se admiten varios canales de comunicación.
