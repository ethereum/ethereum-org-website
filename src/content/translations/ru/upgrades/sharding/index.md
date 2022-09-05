---
title: Шардинг
description: Learn about sharding - breaking up and distributing the data load needed to give Ethereum more transaction capacity and make it easier to run.
lang: ru
template: upgrade
sidebar: true
image: ../../../../../assets/upgrades/newrings.png
summaryPoint1: Шардинг — это многофазное обновление, нацеленное на улучшение масштабируемости и емкости Ethereum.
summaryPoint2: Sharding provides secure distribution of data storage requirements, enabling rollups to be even cheaper, and making nodes easier to operate.
summaryPoint3: Они позволяют использовать решения второго слоя, предлагающие низкие комиссии за транзакции при использовании безопасности Ethereum.
summaryPoint4: Это обновление запланировано на время после слияния основной сети с Beacon Chain.
---

<UpgradeStatus dateKey="page-upgrades-shards-date">
    Sharding should ship sometime in 2023, depending on how quickly work progresses after <a href="/upgrades/merge/">The Merge</a>. Эти осколки дадут Ethereum больше возможностей для хранения и доступа к данным, но они не будут использоваться для выполнения кода.
</UpgradeStatus>

## Что такое шардинг? {#what-is-sharding}

Шардинг – это процесс разделения базы данных по горизонтали для распределения нагрузки, распространенная концепция в информатике. In an Ethereum context, sharding will work synergistically with [layer 2 rollups](/layer-2/) by splitting up the burden of handling the large amount of data needed by rollups over the entire network. This will continue to reduce network congestion and increase transactions per second.

Это важно по причинам, отличным от масштабируемости.

## Особенности шардинга {#features-of-sharding}

### Каждый может запустить узел {#everyone-can-run-a-node}

Шардинг - это хороший способ масштабирования, если вы хотите сохранить децентрализацию, поскольку альтернативой является масштабирование путем увеличения размера существующей базы данных. Это сделало бы Ethereum менее доступным для валидаторов сети, потому что им понадобились бы более мощные и дорогие компьютеры. With sharding, validators will no longer be required to store all of this data themselves, but instead can use data techniques to confirm that the data has been made available by the network as a whole. This drastically reduces the cost of storing data on layer 1 by reducing hardware requirements.

### Более активное участие в сети {#more-network-participation}

Шардинг в конечном итоге позволит вам запускать Ethereum на личном ноутбуке или телефоне. Таким образом, больше людей должны иметь возможность участвовать или запускать [клиенты](/developers/docs/nodes-and-clients/) в сегментированном Ethereum. Это повысит безопасность, потому что чем более децентрализована сеть, тем меньше площадь поверхности атаки.

При более низких требованиях к оборудованию шардинг упростит запуск [клиентов](/developers/docs/nodes-and-clients/) самостоятельно, не полагаясь вообще ни на какие посреднические услуги. И если вы можете, подумайте о запуске нескольких клиентов. Это может улучшить работоспособность сети за счет дальнейшего сокращения точек сбоя. [Запуск клиента Beacon Chain](/upgrades/get-involved/)

<br />

<InfoBanner isWarning>
  At first, you'll need to run a Mainnet (execution layer) client at the same time as your Beacon Chain (consensus later) client. <a href="https://launchpad.ethereum.org" target="_blank">Панель запуска</a> проведет вас через требования к оборудованию и процесс.
</InfoBanner>

## Цепочки-осколки версии 1: доступность данных {#data-availability}

<InfoBanner emoji=":construction:" isWarning>
  <strong>Note:</strong> The plans for sharding have been evolving as more efficient paths to scaling have been developed. "Danksharding" is a new approach to sharding, which does not utilize the concept of shard "chains" but instead uses shard "blobs" to split up the data, along with "data availability sampling" to confirm all data has been made available. This change in plan solves the same original problem.<br/><br/>
  <strong>Details below may be out of date with the latest development plans.</strong> While we update things, check out <a href="https://members.delphidigital.io/reports/the-hitchhikers-guide-to-ethereum">The Hitchhiker's Guide to the Ethereum</a> for an excellent breakdown of Ethereum plans after The Merge.
</InfoBanner>

Когда первые цепочки-осколки будут запущены, они просто предоставят дополнительные данные в сеть. Они не будут обрабатывать транзакции или смарт-контракты. Но они все равно значительно повысят количество обрабатываемых транзакций в секунду в сочетании со свертками.

Сверток - это технология второго слоя, которая существует сегодня. Они позволяют децентрализованным приложениям комбинировать или «сворачивать» транзакции в одну транзакцию вне цепи, генерировать криптографическое доказательство и затем передать их в цепочку. Это уменьшает объем данных, необходимых для транзакции. Объедините это со всей дополнительной доступностью данных, обеспечиваемой осколками, и вы получите 100 000 транзакций в секунду.

<InfoBanner>
  Given recent progress in layer 2 scaling solution research and development, this has prompted the prioritization of transitioning to proof-of-stake ahead of sharding. Sharding will be the focus following The Merge.

[Подробнее о свертках](/developers/docs/scaling/#rollups)
</InfoBanner>

## Цепочки-осколки версии 2: выполнение кода {#code-execution}

План всегда состоял в том, чтобы добавить дополнительную функциональность осколкам и сделать их более похожими на [основную сеть Ethereum](/glossary/#mainnet) сегодня. Это позволит им хранить и выполнять код и обрабатывать транзакции, так как каждый осколок будет содержать свой уникальный набор смарт-контрактов и балансов счетов. Коммуникация между осколками позволит выполнять транзакции между ними.

Но учитывая увеличение количества транзакций в секунду, которое обеспечивают цепочки осколков версии 1, требуется ли это до сих пор? В сообществе все еще обсуждается этот вопрос, и, похоже, существует несколько вариантов.

### Нужны ли осколки для выполнения кода? {#do-shards-need-code-execution}

Виталик Бутерин в разговоре с подкастом Bankless представил три потенциальных варианта, которые стоит обсудить.

<YouTube id="-R0j5AMUSzA" start="5841" />

#### 1. Исполнение состояния не требуется {#state-execution-not-needed}

Это означало бы, что мы не даем осколкам возможности обрабатывать смарт-контракты и оставляем их в качестве хранилищ данных.

#### 2. Иметь несколько исполнительных осколков {#some-execution-shards}

Perhaps there’s a compromise where we don’t need all shards to be smarter. Мы могли бы просто добавить эту функциональность к нескольким, а остальные оставить как есть. Это может ускорить запуск.

#### 3. Подождать, пока мы не сможем сделать СНАРКи с нулевым разглашением {#wait-for-zk-snarks}

Наконец, возможно, нам следует вернуться к этой дискуссии после более полной реализации технологии ZK-SNARK. Это технология, которая может помочь принести действительно конфиденциальные транзакции в сеть. Вполне вероятно, что им потребуются более умные осколки, но они все еще находятся в стадии исследований и разработок.

#### Другие источники {#other-sources}

Вот еще несколько мыслей в том же духе.

- [Фаза первая и готово: Eth2 как механизм доступности данных](https://ethresear.ch/t/phase-one-and-done-eth2-as-a-data-availability-engine/5269/8) – _cdetrio, ethresear.ch_

Этот вопрос до сих пор активно обсуждается. Мы обновим эти страницы, как только узнаем больше.

## Взаимосвязь между обновлениями {#relationship-between-upgrades}

Все обновления Ethereum в некоторой степени взаимосвязаны. Итак, давайте вспомним, как цепочки осколков связаны с другими обновлениями.

### Осколки и Beacon Chain {#shards-and-beacon-chain}

Beacon Chain содержит всю логику для обеспечения безопасности и синхронизации осколков. Beacon Chain будет координировать дольщиков в сети, распределяя их по осколкам, над которыми они должны работать. И она также облегчит связь между осколками, получая и храня данные транзакций в цепочках осколков, доступные другим осколкам. Это даст осколкам моментальный снимок состояния в сети Ethereum, чтобы держать все в актуальном состоянии.

<ButtonLink to="/upgrades/beacon-chain/">
  Beacon Chain
</ButtonLink>

### Осколки и слияние {#shards-and-docking}

К тому времени, когда будут добавлены дополнительные осколки, основная сеть Ethereum уже будет защищена с помощью Beacon Chain и с использованием доказательства владения. Это позволит использовать основную сеть для построения цепочек осколков на основе решений второго уровня, которые повышают масштабируемость.

Пока неясно, будет ли основная сеть существовать как единственный «умный» осколок, способный выполнять код, но в любом случае решение о расширении осколков может быть пересмотрено по мере необходимости.

<ButtonLink to="/upgrades/merge/">
  Слияние
</ButtonLink>

<Divider />

### Подробнее {#read-more}

<ShardChainsList />
