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

- Ya deberías estar ejecutando una instancia de Geth.
- La mayoría de los pasos y ejemplos son para el entorno linux, el conocimiento básico de la terminal será útil.
- Echa un vistazo a este video resumen del conjunto de métricas de Geth: [Monitorización de una infraestructura Ethereum por Péter Szilágyi](https://www.youtube.com/watch?v=cOBab8IJMYI).

## Monitorización {#monitoring-stack}

Un cliente de Ethereum recopila muchos datos que pueden ser leídos en forma de una base de datos cronológica. Para facilitar el monitoreo, usted puede alimentar esto en software de visualización de datos. Hay varias opciones disponibles:

- [Prometheus](https://prometheus.io/) (pull model)
- [InfluxDB](https://www.influxdata.com/get-influxdb/) (modelo push)
- [Telegraf](https://www.influxdata.com/get-influxdb/)
- [Grafana](https://www.grafana.com/)
- [Datadog](https://www.datadoghq.com/)
- [Chronograf](https://www.influxdata.com/time-series-platform/chronograf/)

También hay [Geth Prometheus Exporter](https://github.com/hunterlong/gethexporter), una opción preconfigurada con InfluxDB y Grafana. Puedes configurarlo fácilmente usando docker y [Ethbian OS](https://ethbian.org/index.html) para RPi 4.

En este tutorial configuraremos su cliente Geth para enviar datos a InfluxDB para crear una base de datos y Grafana para crear una visualización gráfica de los datos. Hacerlo manualmente le ayudará a entender el proceso mejor, modificarlo, e implementarlo en diferentes entornos.

## Configurando InfluxDB {#setting-up-influxdb}

Primero, vamos a descargar e instalar InfluxDB. Varias opciones de descarga se pueden encontrar en [Influxdata release page](https://portal.influxdata.com/downloads/). Elige el que se adapte a tu entorno. También puede instalarlo desde un [repositorio](https://repos.influxdata.com/). Por ejemplo en la distribución basada en Debian:

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

Después de instalar InfluxDB, asegúrese de que se está ejecutando en segundo plano. Por defecto, es accesible en `localhost:8086`. Antes de usar el cliente `influx`, tienes que crear un nuevo usuario con privilegios de administrador. Este usuario servirá para una gestión de alto nivel, creando bases de datos y usuarios.

```
curl -XPOST "http://localhost:8086/query" --data-urlencode "q=CREATE USER username WITH PASSWORD 'password' WITH ALL PRIVILEGES"
```

Ahora puede utilizar el cliente influx para ingresar [InfluxDB shell](https://docs.influxdata.com/influxdb/v1.8/tools/shell/) con este usuario.

```
influx -username 'username' -password 'password'
```

Directamente comunicándose con InfluxDB en su shell, puede crear bases de datos y usuario para las métricas geth.

```
create database geth
create user geth with password choosepassword
```

Verificar entradas creadas con:

```
show databases
show users
```

Deja el shell de InfluxDB.

```
exit
```

InfluxDB se está ejecutando y configurado para almacenar métricas de Geth.

## Preparando Geth {#preparing-geth}

Después de configurar la base de datos, necesitamos habilitar la recolección de métricas en Geth. Presta atención a `METRICS AND STATS OPTIONS` en `geth --help`. Se pueden encontrar múltiples opciones, en este caso queremos que Geth envíe datos a InfluxDB. La configuración básica especifica el endpoint donde InfluxDB es accesible y la autenticación para la base de datos.

```
geth --metrics --metrics.influxdb --metrics.influxdb.endpoint "http://0.0.0.0:8086" --metrics.influxdb.username "geth" --metrics.influxdb.password "chosenpassword"
```

Estos parámetros pueden ser añadidos a un comando que inicia el cliente o guardados en el archivo de configuración.

Puede verificar que Geth está enviando datos con éxito, por ejemplo listando métricas en la base de datos. Deja el shell de InfluxDB:

```
use geth
show measurements
```

## Configurando Grafana {#setting-up-grafana}

El siguiente paso es instalar Grafana que interpretará los datos gráficamente. Siga el proceso de instalación para su entorno en la documentación de Grafana. Asegúrese de instalar la versión OSS si no desea otra cosa. Ejemplo de pasos de instalación para las distribuciones de Debian utilizando el repositorio:

```
curl -tlsv1.3 --proto =https -sL https://packages.grafana.com/gpg.key | sudo apt-key add -
echo "deb https://packages.grafana.com/oss/deb stable main" | sudo tee -a /etc/apt/sources.list.d/grafana.list
sudo apt update
sudo apt install grafana
sudo systemctl enable grafana-server
sudo systemctl start grafana-server
```

Cuando tengas a Grafana funcionando, debería ser accesible en `localhost:3000`. Utilice su navegador preferido para acceder a esta ruta, luego inicie sesión con las credenciales predeterminadas (usuario: `admin` y contraseña: `admin`). Cuando se le solicite, cambie la contraseña por defecto y guárdela.

![](./grafana1.png)

Serás redirigido a la página principal de Grafana. Primero, configura tus datos de origen. Haga clic en el icono de configuración de la barra izquierda y seleccione "Fuentes de datos".

![](./grafana2.png)

No hay ninguna fuente de datos creada todavía, haga clic en "Añadir fuente de datos" para definir una.

![](./grafana3.png)

Para esta configuración, seleccione "InfluxDB" y proceda.

![](./grafana4.png)

La configuración de la fuente de datos es bastante directa si está ejecutando herramientas en la misma máquina. Necesita configurar la dirección de InfluxDB y los detalles para acceder a la base de datos. Consulte la siguiente imagen.

![](./grafana5.png)

Si todo está completado e InfluxDB es alcanzable, haga click en "Save and test" y espere que se muestre la confirmación.

![](./grafana6.png)

Grafana ahora está configurado para leer datos de InfluxDB. Ahora necesitas crear un panel que se encargará de interpretarla y mostrarla. Las propiedades de los paneles están codificados en archivos JSON que pueden ser creados por cualquier persona y fácilmente importados. En la barra lateral, haga click en "Create and Import".

![](./grafana7.png)

Para un panel de monitoreo de Geth, copie el ID de [este panel](https://grafana.com/grafana/dashboards/13877/) y péguelo en la "página de Importación" de Grafana. Luego de guardar el panel, debería verse así:

![](./grafana8.png)

Puedes modificar tus paneles. Cada panel puede ser editado, movido, removido o agregado. Puedes cambiar tus configuraciones. ¡Tú decides! Para leer más sobre el funcionamiento de los paneles, consulte la [documentación de Grafana](https://grafana.com/docs/grafana/latest/dashboards/). También puede que muestres interés en [Alerting](https://grafana.com/docs/grafana/latest/alerting/). Esto te permite configurar notificaciónes de alertas para cuando las métricas alcancen ciertos valores. Varios canales de comunicación están soportados.
