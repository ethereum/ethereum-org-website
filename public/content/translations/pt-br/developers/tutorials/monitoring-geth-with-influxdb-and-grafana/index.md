---
title: Monitorando o Geth com InfluxDB e Grafana
description: "Configure o monitoramento para seu nó Geth usando InfluxDB e Grafana para acompanhar o desempenho e identificar problemas."
author: "Mario Havel"
tags: [ "clientes", "nós" ]
skill: intermediate
lang: pt-br
published: 2021-01-13
---

Este tutorial irá ajudá-lo a configurar o monitoramento do seu nó Geth para que você possa entender melhor seu desempenho e identificar possíveis problemas.

## Pré-requisitos {#prerequisites}

- Você já deve estar executando uma instância do Geth.
- A maioria das etapas e exemplos é para o ambiente Linux, portanto, conhecimento básico de terminal será útil.
- Confira esta visão geral em vídeo do conjunto de métricas do Geth: [Monitoring an Ethereum infrastructure por Péter Szilágyi](https://www.youtube.com/watch?v=cOBab8IJMYI).

## Pilha de monitoramento {#monitoring-stack}

Um cliente Ethereum coleta muitos dados que podem ser lidos na forma de um banco de dados cronológico. Para facilitar o monitoramento, você pode fornecer esses dados para um software de visualização de dados. Há várias opções disponíveis:

- [Prometheus](https://prometheus.io/) (modelo pull)
- [InfluxDB](https://www.influxdata.com/get-influxdb/) (modelo push)
- [Telegraf](https://www.influxdata.com/get-influxdb/)
- [Grafana](https://www.grafana.com/)
- [Datadog](https://www.datadoghq.com/)
- [Chronograf](https://www.influxdata.com/time-series-platform/chronograf/)

Há também o [Geth Prometheus Exporter](https://github.com/hunterlong/gethexporter), uma opção pré-configurada com InfluxDB e Grafana.

Neste tutorial, vamos configurar seu cliente Geth para enviar dados para o InfluxDB a fim de criar um banco de dados e para o Grafana a fim de criar uma visualização gráfica dos dados. Fazer isso manualmente o ajudará a entender melhor o processo, alterá-lo e implantá-lo em diferentes ambientes.

## Configurando o InfluxDB {#setting-up-influxdb}

Primeiro, vamos baixar e instalar o InfluxDB. Várias opções de download podem ser encontradas na [página de lançamentos do Influxdata](https://portal.influxdata.com/downloads/). Escolha a que melhor se adapta ao seu ambiente.
Você também pode instalá-lo a partir de um [repositório](https://repos.influxdata.com/). Por exemplo, em uma distribuição baseada em Debian:

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

Após instalar o InfluxDB com sucesso, certifique-se de que ele está sendo executado em segundo plano. Por padrão, ele pode ser acessado em `localhost:8086`.
Antes de usar o cliente `influx`, você deve criar um novo usuário com privilégios de administrador. Este usuário servirá para o gerenciamento de alto nível, criação de bancos de dados e usuários.

```
curl -XPOST "http://localhost:8086/query" --data-urlencode "q=CREATE USER username WITH PASSWORD 'password' WITH ALL PRIVILEGES"
```

Agora você pode usar o cliente influx para entrar no [shell do InfluxDB](https://docs.influxdata.com/influxdb/v1.8/tools/shell/) com este usuário.

```
influx -username 'username' -password 'password'
```

Comunicando-se diretamente com o InfluxDB em seu shell, você pode criar um banco de dados e um usuário para as métricas do Geth.

```
create database geth
create user geth with password choosepassword
```

Verifique as entradas criadas com:

```
show databases
show users
```

Saia do shell do InfluxDB.

```
exit
```

O InfluxDB está em execução e configurado para armazenar as métricas do Geth.

## Preparando o Geth {#preparing-geth}

Após configurar o banco de dados, precisamos habilitar a coleta de métricas no Geth. Preste atenção em `METRICS AND STATS OPTIONS` em `geth --help`. Várias opções podem ser encontradas lá. Neste caso, queremos que o Geth envie dados para o InfluxDB.
A configuração básica especifica o endpoint onde o InfluxDB pode ser acessado e a autenticação para o banco de dados.

```
geth --metrics --metrics.influxdb --metrics.influxdb.endpoint "http://0.0.0.0:8086" --metrics.influxdb.username "geth" --metrics.influxdb.password "chosenpassword"
```

Essas flags podem ser anexadas a um comando que inicia o cliente ou salvas no arquivo de configuração.

Você pode verificar se o Geth está enviando dados com sucesso, por exemplo, listando as métricas no banco de dados. No shell do InfluxDB:

```
use geth
show measurements
```

## Configurando o Grafana {#setting-up-grafana}

A próxima etapa é instalar o Grafana, que interpretará os dados graficamente. Siga o processo de instalação para o seu ambiente na documentação do Grafana. Certifique-se de instalar a versão OSS, a menos que queira de outra forma.
Exemplo de etapas de instalação para distribuições Debian usando o repositório:

```
curl -tlsv1.3 --proto =https -sL https://packages.grafana.com/gpg.key | sudo apt-key add -
echo "deb https://packages.grafana.com/oss/deb stable main" | sudo tee -a /etc/apt/sources.list.d/grafana.list
sudo apt update
sudo apt install grafana
sudo systemctl enable grafana-server
sudo systemctl start grafana-server
```

Quando o Grafana estiver em execução, ele deverá estar acessível em `localhost:3000`.
Use seu navegador preferido para acessar este caminho e faça login com as credenciais padrão (usuário: `admin` e senha: `admin`). Quando solicitado, altere a senha padrão e salve.

![](./grafana1.png)

Você será redirecionado para a página inicial do Grafana. Primeiro, configure sua fonte de dados. Clique no ícone de configuração na barra esquerda e selecione "Fontes de dados".

![](./grafana2.png)

Ainda não há nenhuma fonte de dados criada. Clique em "Adicionar fonte de dados" para definir uma.

![](./grafana3.png)

Para esta configuração, selecione "InfluxDB" e prossiga.

![](./grafana4.png)

A configuração da fonte de dados é bastante simples se você estiver executando as ferramentas na mesma máquina. Você precisa definir o endereço do InfluxDB e os detalhes para acessar o banco de dados. Consulte a imagem abaixo.

![](./grafana5.png)

Se tudo estiver correto e o InfluxDB estiver acessível, clique em "Salvar e testar" e aguarde o surgimento da confirmação.

![](./grafana6.png)

O Grafana agora está configurado para ler dados do InfluxDB. Agora você precisa criar um dashboard que irá interpretá-los e exibi-los. As propriedades dos dashboards são codificadas em arquivos JSON que podem ser criados por qualquer pessoa e facilmente importados. Na barra à esquerda, clique em "Criar e importar".

![](./grafana7.png)

Para um dashboard de monitoramento do Geth, copie o ID [deste dashboard](https://grafana.com/grafana/dashboards/13877/) e cole-o na "Página de importação" do Grafana. Depois de salvar o dashboard, ele deve ter a seguinte aparência:

![](./grafana8.png)

Você pode modificar seus dashboards. Cada painel pode ser editado, movido, removido ou adicionado. Você pode alterar suas configurações. A decisão é sua! Para saber mais sobre como os dashboards funcionam, consulte a [documentação do Grafana](https://grafana.com/docs/grafana/latest/dashboards/).
Você também pode se interessar por [Alertas](https://grafana.com/docs/grafana/latest/alerting/). Isso permite que você configure notificações de alerta para quando as métricas atingirem determinados valores. Vários canais de comunicação são suportados.
