---
title: Monitorando o Geth com InfluxDB e Grafana
description: Configure o monitoramento para o seu nó Geth usando InfluxDB e Grafana para rastrear o desempenho e identificar problemas.
author: "Mario Havel"
tags: ["clientes", "nós"]
skill: intermediate
breadcrumb: Monitorando o Geth
lang: pt-br
published: 2021-01-13
---

Este tutorial ajudará você a configurar o monitoramento para o seu nó Geth, para que você possa entender melhor seu desempenho e identificar possíveis problemas.

## Pré-requisitos {#prerequisites}

- Você já deve estar executando uma instância do Geth.
- A maioria das etapas e exemplos são para o ambiente Linux; conhecimento básico de terminal será útil.
- Confira esta visão geral em vídeo do conjunto de métricas do Geth: [Monitorando uma infraestrutura Ethereum por Péter Szilágyi](https://www.youtube.com/watch?v=cOBab8IJMYI).

## Pilha de monitoramento {#monitoring-stack}

Um cliente Ethereum coleta muitos dados que podem ser lidos na forma de um banco de dados cronológico. Para facilitar o monitoramento, você pode alimentar isso em um software de visualização de dados. Existem várias opções disponíveis:

- [Prometheus](https://prometheus.io/) (modelo pull)
- [InfluxDB](https://www.influxdata.com/get-influxdb/) (modelo push)
- [Telegraf](https://www.influxdata.com/get-influxdb/)
- [Grafana](https://www.grafana.com/)
- [Datadog](https://www.datadoghq.com/)
- [Chronograf](https://www.influxdata.com/time-series-platform/chronograf/)

Há também o [Geth Prometheus Exporter](https://github.com/hunterlong/gethexporter), uma opção pré-configurada com InfluxDB e Grafana.

Neste tutorial, configuraremos seu cliente Geth para enviar dados (push) para o InfluxDB para criar um banco de dados e para o Grafana para criar uma visualização gráfica dos dados. Fazer isso manualmente ajudará você a entender melhor o processo, alterá-lo e fazer o deploy em diferentes ambientes.

## Configurando o InfluxDB {#setting-up-influxdb}

Primeiro, vamos baixar e instalar o InfluxDB. Várias opções de download podem ser encontradas na [página de lançamentos da Influxdata](https://portal.influxdata.com/downloads/). Escolha a que melhor se adapta ao seu ambiente.
Você também pode instalá-lo a partir de um [repositório](https://repos.influxdata.com/). Por exemplo, em uma distribuição baseada em Debian:

<HTML-PLACEHOLDER-CODEBLOCK-685d10 />

Após instalar o InfluxDB com sucesso, certifique-se de que ele esteja sendo executado em segundo plano. Por padrão, ele pode ser acessado em `localhost:8086`.
Antes de usar o cliente `influx`, você deve criar um novo usuário com privilégios de administrador. Este usuário servirá para gerenciamento de alto nível, criando bancos de dados e usuários.

<HTML-PLACEHOLDER-CODEBLOCK-a5c65e />

Agora você pode usar o cliente influx para entrar no [shell do InfluxDB](https://docs.influxdata.com/influxdb/v1.8/tools/shell/) com este usuário.

<HTML-PLACEHOLDER-CODEBLOCK-8b28eb />

Comunicando-se diretamente com o InfluxDB em seu shell, você pode criar um banco de dados e um usuário para as métricas do Geth.

<HTML-PLACEHOLDER-CODEBLOCK-1c43ce />

Verifique as entradas criadas com:

<HTML-PLACEHOLDER-CODEBLOCK-5dee85 />

Saia do shell do InfluxDB.

<HTML-PLACEHOLDER-CODEBLOCK-090211 />

O InfluxDB está em execução e configurado para armazenar métricas do Geth.

## Preparando o Geth {#preparing-geth}

Após configurar o banco de dados, precisamos habilitar a coleta de métricas no Geth. Preste atenção em `METRICS AND STATS OPTIONS` em `geth --help`. Várias opções podem ser encontradas lá; neste caso, queremos que o Geth envie dados (push) para o InfluxDB.
A configuração básica especifica o endpoint onde o InfluxDB pode ser acessado e a autenticação para o banco de dados.

<HTML-PLACEHOLDER-CODEBLOCK-1cd01d />

Essas flags podem ser anexadas a um comando que inicia o cliente ou salvas no arquivo de configuração.

Você pode verificar se o Geth está enviando dados com sucesso, por exemplo, listando as métricas no banco de dados. No shell do InfluxDB:

<HTML-PLACEHOLDER-CODEBLOCK-1da8b2 />

## Configurando o Grafana {#setting-up-grafana}

O próximo passo é instalar o Grafana, que interpretará os dados graficamente. Siga o processo de instalação para o seu ambiente na documentação do Grafana. Certifique-se de instalar a versão OSS, a menos que deseje o contrário.
Exemplo de etapas de instalação para distribuições Debian usando o repositório:

<HTML-PLACEHOLDER-CODEBLOCK-ee08e5 />

Quando o Grafana estiver em execução, ele deverá estar acessível em `localhost:3000`.
Use seu navegador preferido para acessar este caminho e faça login com as credenciais padrão (usuário: `admin` e senha: `admin`). Quando solicitado, altere a senha padrão e salve.

![Grafana dashboard screenshot for Geth monitoring (panel 1)](./grafana1.png)

Você será redirecionado para a página inicial do Grafana. Primeiro, configure seus dados de origem. Clique no ícone de configuração na barra esquerda e selecione "Data sources" (Fontes de dados).

![Grafana dashboard screenshot for Geth monitoring (panel 2)](./grafana2.png)

Ainda não há fontes de dados criadas, clique em "Add data source" (Adicionar fonte de dados) para definir uma.

![Grafana dashboard screenshot for Geth monitoring (panel 3)](./grafana3.png)

Para esta configuração, selecione "InfluxDB" e prossiga.

![Grafana dashboard screenshot for Geth monitoring (panel 4)](./grafana4.png)

A configuração da fonte de dados é bastante simples se você estiver executando as ferramentas na mesma máquina. Você precisa definir o endereço do InfluxDB e os detalhes para acessar o banco de dados. Consulte a imagem abaixo.

![Grafana dashboard screenshot for Geth monitoring (panel 5)](./grafana5.png)

Se tudo estiver concluído e o InfluxDB estiver acessível, clique em "Save and test" (Salvar e testar) e aguarde a confirmação aparecer.

![Grafana dashboard screenshot for Geth monitoring (panel 6)](./grafana6.png)

O Grafana agora está configurado para ler dados do InfluxDB. Agora você precisa criar um painel (dashboard) que os interpretará e exibirá. As propriedades dos painéis são codificadas em arquivos JSON que podem ser criados por qualquer pessoa e facilmente importados. Na barra esquerda, clique em "Create and Import" (Criar e Importar).

![Grafana dashboard screenshot for Geth monitoring (panel 7)](./grafana7.png)

Para um painel de monitoramento do Geth, copie o ID [deste painel](https://grafana.com/grafana/dashboards/13877/) e cole-o na "Import page" (Página de importação) no Grafana. Após salvar o painel, ele deve ficar assim:

![Grafana dashboard screenshot for Geth monitoring (panel 8)](./grafana8.png)

Você pode modificar seus painéis. Cada painel pode ser editado, movido, removido ou adicionado. Você pode alterar suas configurações. A escolha é sua! Para saber mais sobre como os painéis funcionam, consulte a [documentação do Grafana](https://grafana.com/docs/grafana/latest/dashboards/).
Você também pode se interessar por [Alertas](https://grafana.com/docs/grafana/latest/alerting/). Isso permite configurar notificações de alerta para quando as métricas atingirem determinados valores. Vários canais de comunicação são suportados.