---
title: Хронология всех форков Ethereum (с 2014 года по настоящее время)
description: История появления блокчейна на основе Эфириума, этапы развития, важные обновления и разветвления.
lang: ru
sidebarDepth: 1
---

# Хронология всех форков Ethereum (с 2014 года по настоящее время) {#the-history-of-ethereum}

Хронология выхода важных этапов, вилок и обновлений блокчейна Эфириума.

<ExpandableCard title="Что такое форки?" contentPreview="Изменения в правилах протокола Ethereum, часто включающие плановые технические обновления.">

Форки - это когда необходимо произвести значительные технические обновления или изменения в сети – они обычно вытекают из [Предложения об улучшении Ethereum (EIPs)](/eips/) и изменяют "правила" протокола.

Когда требуются обновления в традиционном, централизованном программном обеспечении, компания просто опубликует новую версию для конечного пользователя. Когда требуются обновления в традиционном, централизованном программном обеспечении, компания просто опубликует новую версию для конечного пользователя. [Клиенты Ethereum](/developers/docs/nodes-and-clients/) должны обновить свое программное обеспечение для реализации новых правил форка. Плюс создатели блоков (майнеры в мире PoW, валидаторы в мире PoS) и узлы должны создавать блоки и проверять в соответствии с новыми правилами. [Подробнее о механизмах консенсуса](/developers/docs/consensus-mechanisms/)

Эти изменения правил могут привести к временному расколу в сети. Новые блоки могут создаваться в соответствии с новыми или старыми правилами. Вилки обычно согласовываются заблаговременно, так что клиенты вместе принимают изменения, и вилка с модернизацией становится главной цепочкой. Однако, в редких случаях, разногласия в вилках могут привести к постоянному разделению сети – особенно примечательно создание Эфира Классик и <a href="#dao-fork">Вилка DAO</a>.

</ExpandableCard>

<ExpandableCard title="Почему у некоторых обновлений несколько названий?" contentPreview="Названия обновлений следуют шаблону">

Программное обеспечение, которое лежит в основе Эфиpиума, состоит из двух половин, известных как [исполнительный слой](/словарь/#execution-layer) и [слой сргласия](/словарь/#consensus-layer).

**Именование обновлений уровня исполнения**

С 2021 года обновления **уровня исполнения** именуются в соответствии с названиями городов, где проходили [предыдущие конференции Devcon](https://devcon.org/en/past-events/), в хронологическом порядке:

| Название обновления | Год Devcon | Номер Devcon | Дата обновления                      |
| ------------------- | ---------- | ------------ | ------------------------------------ |
| Берлин              | 2014       | 0            | 15 апреля 2021 г.    |
| Лондон              | 2015       | I            | 5 августа 2021 г.    |
| Shanghai            | 2016       | II           | 12 апреля 2023 г.    |
| Cancun              | 2017       | III          | 13 марта 2024 г.     |
| **Prague**          | 2018       | IV           | Будет определено позднее — следующее |
| _Osaka_             | 2019       | V            | Будет определено позднее             |
| _Bogota_            | 2022       | VI           | Будет определено позднее             |
| _Bangkok_           | 2024       | VII          | Будет определено позднее             |

**Именование обновлений уровня консенсуса**

С момента запуска [Beacon Chain](/glossary/#beacon-chain) обновления **уровня консенсуса** именуются в честь небесных звезд, названия которых начинаются с букв, идущих в алфавитном порядке:

| Название обновления                                           | Дата обновления                      |
| ------------------------------------------------------------- | ------------------------------------ |
| Генезис Beacon Chain                                          | 1 декабря 2020 г.    |
| [Altair](https://en.wikipedia.org/wiki/Altair)                | 27 октября 2021 г.   |
| [Bellatrix](https://en.wikipedia.org/wiki/Bellatrix)          | 6 сентября 2022 г.   |
| [Capella](https://en.wikipedia.org/wiki/Capella)              | 12 апреля 2023 г.    |
| [Deneb](https://en.wikipedia.org/wiki/Deneb)                  | 13 марта 2024 г.     |
| [**Electra**](https://en.wikipedia.org/wiki/Electra_\(star\)) | Будет определено позднее — следующее |
| [_Fulu_](https://en.wikipedia.org/wiki/Fulu_\(star\))         | Будет определено позднее             |

**Комбинированное именование**

Обновления уровней исполнения и консенсуса первоначально развертывались в разное время, но после [«Слияния» (The Merge)](/roadmap/merge/) в 2022 году они стали развертываться одновременно. Также появились разговорные термины, чтобы упростить ссылки на эти обновления с помощью единого термина. Это началось с модернизации _Шанхай-Капелла_, обычно называемой «**Шапелла**», и продолжилось модернизациями _Канкун-Денеб_ (**Денкун**) и _Прага-Электра_ (**Пектра**).

| Обновление уровня исполнения | Обновление уровня консенсуса | Краткое название |
| ---------------------------- | ---------------------------- | ---------------- |
| Shanghai                     | Capella                      | "Shapella"       |
| Cancun                       | Deneb                        | "Dencun"         |
| Prague                       | Electra                      | "Pectra"         |
| Osaka                        | Fulu                         | "Fusaka"         |

</ExpandableCard>

Перейдите непосредственно к информации о некоторых особенно важных прошлых обновлениях: [The Beacon Chain](/roadmap/beacon-chain/); [The Merge](/roadmap/merge/); и [EIP-1559](#london)

Ожидаете будущих обновлений протокола? [Узнайте о предстоящих обновлениях в дорожной карте Ethereum](/roadmap/).

<Divider />

## 2025 {#2025}

### Fulu-Osaka («Fusaka») {#fusaka}

<NetworkUpgradeSummary name="fusaka" />

[Подробнее о Fusaka](/roadmap/fusaka/)

### Prague-Electra («Pectra») {#pectra}

<NetworkUpgradeSummary name="pectra" />

Обновление Prague-Electra («Pectra») включало ряд улучшений протокола Ethereum, направленных на улучшение опыта для всех пользователей, сетей уровня 2, стейкеров и операторов узлов.

Механизм стейкинга получил обновление: добавлены составные аккаунты валидаторов и улучшен контроль над заблокированными средствами через адрес для исполнения выводов. EIP-7251 увеличил максимальный эффективный баланс для одного валидатора до 2048, повысив эффективность капитала для стейкеров. EIP-7002 позволил учетной записи выполнения безопасно инициировать действия валидатора, включая выход или снятие части средств, что улучшило опыт для держателей ETH, а также помогло усилить подотчетность операторов узлов.

Другие части обновления были направлены на улучшение удобства для обычных пользователей. EIP-7702 предоставил возможность обычному аккаунту, не являющемуся смарт-контрактом ([EOA](/glossary/#eoa)), исполнять код, подобный смарт-контракту. Это открыло неограниченные новые функциональные возможности для традиционных учетных записей Ethereum, такие как пакетирование транзакций, газовое спонсорство, альтернативная аутентификация, программируемый контроль расходов, механизмы восстановления учетных записей и многое другое.

<ExpandableCard title="EIP в Pectra" contentPreview="Официальные улучшения, включенные в это обновление.">

Повышение удобства:

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7702">EIP-7702</a> – <em>Установить код учетной записи EOA</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7691">EIP-7691</a> - <em>Увеличение пропускной способности массива бинарных данных</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7623">EIP-7623</a> - <em>Увеличение стоимости calldata</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7840">EIP-7840</a> - <em> Добавление расписаний массивов бинарных данных в конфигурационные файлы уровня выполнения </em></li>
</ul>

Расширенные возможности стейкинга:

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7251">EIP-7251</a> - <em>Увеличение <code>MAX_EFFECTIVE_BALANCE </code></em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7002">EIP-7002</a> - <em> Выходы, инициированные на уровне выполнения </em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7685">EIP-7685</a> - <em> Универсальные запросы к уровню исполнения</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-6110">EIP-6110</a> - <em> Размещение депозитов валидаторов в блокчейне</em></li>
</ul>

Оптимизация эффективности и усиление безопасности протокола:

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2537">EIP-2537</a> - <em> Предварительная сборка для операций с кривой BLS12-381</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2935">EIP-2935</a> - <em> Сохранение хешей исторических блоков в состоянии сети</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7549">EIP-7549</a> - <em> Вынос индекса комитета за пределы аттестации</em></li>
</ul>

</ExpandableCard>

- [Pectra.wtf](https://pectra.wtf)
- [Как Pectra улучшит опыт стейкинга](https://www.kiln.fi/post/next-ethereum-upgrade-how-pectra-will-enhance-the-staking-experience)
- [Прочитать спецификации обновления Electra](https://github.com/ethereum/consensus-specs/blob/dev/specs/electra/)
- [Часто задаваемые вопросы о Prague-Electra («Pectra»)](/roadmap/pectra/)

<Divider />

## 2024 {#2024}

### Cancun-Deneb («Dencun») {#dencun}

<NetworkUpgradeSummary name="dencun" />

#### Краткое описание Cancun {#cancun-summary}

Обновление Cancun содержит набор улучшений _исполнения_ Ethereum, направленных на повышение масштабируемости, в тандеме с обновлениями консенсуса Deneb.

Примечательно, что оно включает EIP-4844, известное как **Proto-Danksharding**, которое значительно снижает стоимость хранения данных для ролл-апов уровня 2. Это достигается за счет внедрения "капель" данных, которые позволяют роллам размещать данные в основной сети в течение короткого периода времени. Это приводит к значительному снижению транзакционных сборов для пользователей свертков  уровня 2.

<ExpandableCard title="EIP в Cancun" contentPreview="Официальные улучшения, включенные в это обновление.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-1153">EIP-1153</a> - <em>Переходные коды хранения</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-4788">EIP-4788</a> - <em>Корень блока Beacon в EVM</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-4844">EIP-4844</a> - <em>Транзакции Shard blob (Proto-Thanksharding)</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-5656">EIP-5656</a> - <em><code>MCOPY</code> - Инструкция по копированию памяти</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-6780">EIP-6780</a> - <em><code>SELFDESTRUCT</code> только в той же транзакции</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7516">EIP-7516</a> - <em><code>BLOBBASEFEE</code> opcode</em></li>
</ul>

</ExpandableCard>

- [Ролл-апы уровня 2](/layer-2/)
- [Proto-Danksharding](/roadmap/scaling/#proto-danksharding)
- [Danksharding](/roadmap/danksharding/)
- [Прочитать спецификацию обновления Cancun](https://github.com/ethereum/execution-specs/blob/master/network-upgrades/mainnet-upgrades/cancun.md)

#### Краткое описание Deneb {#deneb-summary}

Обновление Deneb содержит набор улучшений _консенсуса_ Ethereum, направленных на повышение масштабируемости. Это обновление идет в тандеме с обновлениями исполнения Cancun, чтобы включить Proto-Danksharding (EIP-4844), наряду с другими улучшениями Beacon Chain.

Предварительно сгенерированные подписанные "добровольные сообщения о выходе" больше не истекают, что дает больше контроля пользователям, которые делают ставки на свои средства со сторонним оператором узла. Благодаря этому подписанному сообщению о выходе валидаторы могут делегировать операции узла третьим лицам, сохраняя при этом полный контроль над своими средствами и возможность безопасного вывода в любое время без необходимости получения дополнительных разрешений.

EIP-7514 приводит к ужесточению выпуска ETH, ограничивая ставку «отката», по которой валидаторы могут присоединиться к сети до восьми (8) за эпоху. Поскольку эмиссия ETH пропорциональна общему объему ETH в стейкинге, ограничение числа присоединяющихся валидаторов ограничивает _темпы роста_ вновь выпущенных ETH, а также снижает требования к оборудованию для операторов узлов, способствуя децентрализации.

<ExpandableCard title="EIP в Deneb" contentPreview="Официальные улучшения, включенные в это обновление">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-4788">EIP-4788</a> - <em>Корень блока Beacon в EVM</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-4844">EIP-4844</a> - <em>Транзакции осколков blob</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7044">EIP-7044</a> - <em>Вечно действительные подписанные добровольные выходы</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7045">EIP-7045</a> - <em>Увеличить максимальный слот включения аттестации</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7514">EIP-7514</a> - <em>Добавить максимальный лимит оттока эпох</em></li>
</ul>

</ExpandableCard>

- [Прочитать спецификации обновления Deneb](https://github.com/ethereum/consensus-specs/blob/dev/specs/deneb/)
- [Часто задаваемые вопросы о Cancun-Deneb («Dencun»)](/roadmap/dencun/)

<Divider />

## 2023 {#2023}

### Shanghai-Capella («Shapella») {#shapella}

<NetworkUpgradeSummary name="shapella" />

#### Краткое описание Shanghai {#shanghai-summary}

Обновление Shanghai позволило пользоваться вложенными ранее средствами. В сочетании с обновлением Capella, это позволило блокам принимать операции по снятию средств, и выводить держателям свои ETH из Beacon Chain и пользоваться ими.

<ExpandableCard title="EIP в Shanghai" contentPreview="Официальные улучшения, включенные в это обновление.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-3651">EIP-3651</a> – <em>Starts the <code>COINBASE</code> address warm</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-3855">EIP-3855</a> – <em>New <code>PUSH0</code> instruction</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-3860">EIP-3860</a> – <em>New </em>PUSH0 instruction</li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-4895">EIP-4895</a> – <em>Beacon chain push withdrawals as operations</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-6049">EIP-6049</a> - <em>Deprecate <code>SELFDESTRUCT</code></em></li>
</ul>

</ExpandableCard>

- [Прочитать спецификацию обновления Shanghai](https://github.com/ethereum/execution-specs/blob/master/network-upgrades/mainnet-upgrades/shanghai.md)

#### Краткое описание Capella {#capella-summary}

Обновление Capella стало третьим крупным обновлением соглашения (Beacon Chain) и позволило выводить вложенные ранее средства. Capella появилась одновременно с обновлением возможности перевода средств – Shanghai, и включила функцию вывода вложенных средств.

Это обновление соглашения дало возможность держателям, не предоставившим учетные данные для вывода средств с первоначальным депозитом, сделать это, тем самым обеспечив вывод средств.

Обновление также предоставило функцию автоматической проверки аккаунтов, которая постоянно обрабатывает подтверждения аккаунтов для любых доступных выплат вознаграждений или полного вывода средств.

- [Подробнее о выводе средств из стейкинга](/staking/withdrawals/).
- [Прочитать спецификации обновления Capella](https://github.com/ethereum/consensus-specs/blob/dev/specs/capella/)

<Divider />

## 2022 {#2022}

### Paris (The Merge) {#paris}

<NetworkUpgradeSummary name="paris" />

#### Краткое описание {#paris-summary}

Обновление Paris было вызвано тем, что блокчейн proof-of-work преодолел [конечную общую сложность (terminal total difficulty)](/glossary/#terminal-total-difficulty) в 58750000000000000000000. Это произошло на блоке 15537393 15 сентября 2022 года, спровоцировав обновление Париж следующего блока. Paris был переходом на [The Merge](/roadmap/merge/) — его главной особенностью было отключение алгоритма майнинга [proof-of-work](/developers/docs/consensus-mechanisms/pow) и связанной с ним логики консенсуса, и включение вместо него [proof-of-stake](/developers/docs/consensus-mechanisms/pos). Само обновление Paris было обновлением [клиентов уровня исполнения](/developers/docs/nodes-and-clients/#execution-clients) (эквивалентно Bellatrix на уровне консенсуса), которое позволило им принимать инструкции от подключенных к ним [клиентов консенсуса](/developers/docs/nodes-and-clients/#consensus-clients). Это потребовало активации нового набора внутренних методов API, известных под общим названием [Engine API](https://github.com/ethereum/execution-apis/blob/main/src/engine/common.md). Это было, пожалуй, самое значительное обновление в истории Ethereum со времен [Homestead](#homestead)!

- [Прочитать спецификацию обновления Paris](https://github.com/ethereum/execution-specs/blob/master/network-upgrades/mainnet-upgrades/paris.md)

<ExpandableCard title="EIP в Paris" contentPreview="Официальные улучшения, включенные в это обновление.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-3675">EIP-3675</a> – <em>Обновление соглашения Proof-of-Stake</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-4399">EIP-4399</a> – <em>Замените DIFFICULTY код операции на PREVRANDAO</em></li>
</ul>

</ExpandableCard>

---

### Bellatrix {#bellatrix}

<NetworkUpgradeSummary name="bellatrix" />

#### Краткое описание {#bellatrix-summary}

Обновление Bellatrix было вторым запланированным обновлением для [Beacon Chain](/roadmap/beacon-chain), готовящим сеть к [«Слиянию» (The Merge)](/roadmap/merge/). It brings validator penalties to their full values for inactivity and slashable offenses. Bellatrix also includes an update to the fork choice rules to prepare the chain for The Merge and the transition from the last proof-of-work block to the first proof-of-stake block. Оно включает в себя информирование клиентов консенсуса о [конечной общей сложности (terminal total difficulty)](/glossary/#terminal-total-difficulty) в 58750000000000000000000.

- [Прочитать спецификацию обновления Bellatrix](https://github.com/ethereum/consensus-specs/tree/dev/specs/bellatrix)

---

### Gray Glacier {#gray-glacier}

<NetworkUpgradeSummary name="grayGlacier" />

#### Краткое описание {#gray-glacier-summary}

Сетевое обновление Gray Glacier отложило [«бомбу сложности» (difficulty bomb)](/glossary/#difficulty-bomb) на три месяца. Это единственное изменение, внесенное в это обновление, и по своей сути оно схоже с обновлениями [Arrow Glacier](#arrow-glacier) и [Muir Glacier](#muir-glacier). Подобные изменения были внесены в сетевые обновления [Byzantium](#byzantium), [Constantinople](#constantinople) и [London](#london).

- [Блог EF — объявление об обновлении Gray Glacier](https://blog.ethereum.org/2022/06/16/gray-glacier-announcement/)

<ExpandableCard title="EIP в Gray Glacier" contentPreview="Официальные улучшения, включенные в это обновление.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-5133">EIP-5133</a> – <em>отсрочка бомбы сложности до сентября 2022 года</em></li>
</ul>

</ExpandableCard>

<Divider />

## 2021 {#2021}

### Arrow Glacier {#arrow-glacier}

<NetworkUpgradeSummary name="arrowGlacier" />

#### Краткое описание {#arrow-glacier-summary}

Сетевое обновление Arrow Glacier отложило [«бомбу сложности» (difficulty bomb)](/glossary/#difficulty-bomb) на несколько месяцев. Это единственное изменение, внесенное в это обновление, и по своей сути оно схоже с обновлением [Muir Glacier](#muir-glacier). Подобные изменения были внесены в сетевые обновления [Byzantium](#byzantium), [Constantinople](#constantinople) и [London](#london).

- [Блог EF — объявление об обновлении Arrow Glacier](https://blog.ethereum.org/2021/11/10/arrow-glacier-announcement/)
- [Ethereum Cat Herders — обновление Ethereum Arrow Glacier](https://medium.com/ethereum-cat-herders/ethereum-arrow-glacier-upgrade-e8d20fa4c002)

<ExpandableCard title="EIP в Arrow Glacier" contentPreview="Официальные улучшения, включенные в это обновление.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-4345">EIP-4345</a> – <em>отсрочка бомбы сложности до июня 2022</em></li>
</ul>

</ExpandableCard>

---

### Altair {#altair}

<NetworkUpgradeSummary name="altair" />

#### Краткое описание {#altair-summary}

Обновление Altair было первым запланированным обновлением для [Beacon Chain](/roadmap/beacon-chain). It added support for "sync committees"—enabling light clients, and increased validator inactivity and slashing penalties as development progressed towards The Merge.

- [Прочитать спецификацию обновления Altair](https://github.com/ethereum/consensus-specs/tree/dev/specs/altair)

#### <Emoji text=":tada:" size={1} className="me-2" />Интересный факт! {#altair-fun-fact}

Altair был первым крупным сетевым обновлением, которое имело точное время разветрывания. Каждое предыдущее обновление было основано на объявлении номера блока в цепи с доказательством работы, где время блоков различно. Сеть Beacon не требует решения для доказательства работы, и вместо этого работает на основанной на времени системе эпох, состоящей из 32 двенадцати секундных "ячеек" времени, в течение которых валидаторы могут предлагать блоки. Вот почему мы знали точно, когда мы попали в эпоху 74,240 и Altair начал жить!

- [Время блока](/developers/docs/blocks/#block-time)

---

### London {#london}

<NetworkUpgradeSummary name="london" />

#### Краткое описание {#london-summary}

Обновление London представило [EIP-1559](https://eips.ethereum.org/EIPS/eip-1559), который реформировал рынок комиссий за транзакции, а также внесло изменения в обработку возврата газа и график [«Ледникового периода» (Ice Age)](/glossary/#ice-age).

#### Что такое обновление London / EIP-1559? {#eip-1559}

До обновления London у Ethereum были блоки фиксированного размера. В моменты высокого спроса в сети эти блоки заполнялись под завязку. В результате пользователям приходилось ждать, пока уменьшится спрос, чтобы включить свои транзакции в блок, что вело к неудовлетворительному опыту взаимодействия с сетью. С обновлением London в Ethereum появились блоки переменного размера.

Способ расчета комиссий за транзакции в сети Ethereum изменился с [обновлением London](/ethereum-forks/#london) в августе 2021 года. До обновления London комиссии рассчитывались без разделения на `базовую` и `приоритетную` комиссии следующим образом:

Допустим, Алисе пришлось заплатить Бобу 1 ETH. В транзакции лимит газа составляет 21 000 единиц, а цена газа составляет 200 gwei.

Общая комиссия составляла бы: `Единицы газа (лимит) * Цена газа за единицу`, т. е. `21,000 * 200 = 4,200,000 gwei` или 0,0042 ETH

Внедрение [EIP-1559](https://eips.ethereum.org/EIPS/eip-1559) в обновлении London усложнило механизм комиссий за транзакции, но сделало плату за газ более предсказуемой, что привело к более эффективному рынку комиссий за транзакции. Пользователи могут отправлять транзакции с `maxFeePerGas`, соответствующим тому, сколько они готовы заплатить за выполнение транзакции, зная, что они не заплатят больше рыночной цены за газ (`baseFeePerGas`), и получат возврат любой излишней суммы за вычетом чаевых.

В этом видео объясняется EIP-1559 и преимущества, которые он дает: [EIP-1559 в деталях](https://www.youtube.com/watch?v=MGemhK9t44Q)

- [Являетесь ли Вы dapp разработчиком? [Обязательно обновите свои библиотеки и инструменты.](https://github.com/ethereum/execution-specs/blob/master/network-upgrades/london-ecosystem-readiness.md)
- [Прочитать объявление Ethereum Foundation](https://blog.ethereum.org/2021/07/15/london-mainnet-announcement/)
- [Прочитать объяснение от Ethereum Cat Herders](https://medium.com/ethereum-cat-herders/london-upgrade-overview-8eccb0041b41)

<ExpandableCard title="EIP в London" contentPreview="Официальные улучшения, включенные в это обновление.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-1559">EIP-1559</a> – <em>совершенствует систему уровня комиссии за транзакции</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-3198">EIP-3198</a> – <em>Возвращает <code>BASEFEE</code> из блока</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-3529">EIP-3529</a> - <em>снижает компенсации газа за операции в EVM</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-3541">EIP-3541</a> - <em>предотвращает деплой контрактов, начинающихся с <code>0xEF</code></em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-3554">EIP-3554</a> – <em>отсрочка Ледникового Периода до декабря 2021</em></li>
</ul>

</ExpandableCard>

---

### Berlin {#berlin}

<NetworkUpgradeSummary name="berlin" />

#### Краткое описание {#berlin-summary}

Берлинское обновление оптимизировало стоимость газа для определенных действий EVM и улучшило поддержку нескольких типов транзакций.

- [Прочитать объявление Ethereum Foundation](https://blog.ethereum.org/2021/03/08/ethereum-berlin-upgrade-announcement/)
- [Прочитать объяснение от Ethereum Cat Herders](https://medium.com/ethereum-cat-herders/the-berlin-upgrade-overview-2f7ad710eb80)

<ExpandableCard title="EIP в Berlin" contentPreview="Официальные улучшения, включенные в это обновление.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2565">EIP-2565</a> – <em>снижает газ, расходуемый ModExp</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2718">EIP-2718</a> – <em>упрощает поддержку мульти-типовых транзакций</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2929">EIP-2929</a> – <em>повышает газ, расходуемый опкодами, что обращаются к стейтам</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2930">EIP-2930</a> – <em>добавляет опциональные экономные списки доступа</em></li>
</ul>

</ExpandableCard>

<Divider />

## 2020 {#2020}

### Генезис Beacon Chain {#beacon-chain-genesis}

<NetworkUpgradeSummary name="beaconChainGenesis" />

#### Краткое описание {#beacon-chain-genesis-summary}

Для безопасного запуска [Beacon Chain](/roadmap/beacon-chain/) требовалось 16 384 депозита по 32 ETH в стейкинге. Это произошло 27 ноября, и Beacon Chain начал производить блоки 1 декабря 2020 года.

[Прочитать объявление Ethereum Foundation](https://blog.ethereum.org/2020/11/27/eth2-quick-update-no-21/)

<DocLink href="/roadmap/beacon-chain/">\n  Сеть Beacon\n</DocLink>

---

### Развернут депозитный контракт для стейкинга {#staking-deposit-contract}

<NetworkUpgradeSummary name="stakingDepositContractDeployed" />

#### Краткое описание {#deposit-contract-summary}

Депозитный контракт для стейкинга ввел [стейкинг](/glossary/#staking) в экосистему Ethereum. Хотя это был контракт [основной сети (Mainnet)](/glossary/#mainnet), он оказал прямое влияние на сроки запуска [Beacon Chain](/roadmap/beacon-chain/) — важного [обновления Ethereum](/roadmap/).

[Прочитать объявление Ethereum Foundation](https://blog.ethereum.org/2020/11/04/eth2-quick-update-no-19/)

<DocLink href="/staking/">
  Стейкинг
</DocLink>

---

### Muir Glacier {#muir-glacier}

<NetworkUpgradeSummary name="muirGlacier" />

#### Краткое описание {#muir-glacier-summary}

Форк Muir Glacier ввел задержку для [«бомбы сложности» (difficulty bomb)](/glossary/#difficulty-bomb). Увеличение сложности блока механизма консенсуса [proof-of-work](/developers/docs/consensus-mechanisms/pow/) угрожало снизить удобство использования Ethereum за счет увеличения времени ожидания при отправке транзакций и использовании децентрализованных приложений.

- [Прочитать объявление Ethereum Foundation](https://blog.ethereum.org/2019/12/23/ethereum-muir-glacier-upgrade-announcement/)
- [Прочитать объяснение от Ethereum Cat Herders](https://medium.com/ethereum-cat-herders/ethereum-muir-glacier-upgrade-89b8cea5a210)

<ExpandableCard title="EIP в Muir Glacier" contentPreview="Официальные улучшения, включенные в этот форк.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2384">EIP-2384</a> – <em>отсрочка бомбы сложности на 4 000 000 блоков, или ~611 дней.</em></li>
</ul>

</ExpandableCard>

<Divider />

## 2019 {#2019}

### Istanbul {#istanbul}

<NetworkUpgradeSummary name="istanbul" />

#### Краткое описание {#istanbul-summary}

Стамбульский форк:

- Оптимизирована стоимость [газа](/glossary/#gas) для определенных действий в [EVM](/developers/docs/ethereum-stack/#ethereum-virtual-machine).
- Улучшена устойчивость к атакам типа "отказ в обслуживании".
- Сделал решения для [масштабирования уровня 2](/developers/docs/scaling/#layer-2-scaling), основанные на SNARK и STARK, более производительными.
- Позволило Ethereum и Zcash взаимодействовать.
- Контрактам разрешено выполнение более творческих функций.

[Прочитать объявление Ethereum Foundation](https://blog.ethereum.org/2019/11/20/ethereum-istanbul-upgrade-announcement/)

<ExpandableCard title="EIP в Istanbul" contentPreview="Официальные улучшения, включенные в этот форк.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-152">EIP-152</a> – <em>позволяет Ethereum работать с валютами, обеспечивающими приватность (как Zcash).</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-1108">EIP-1108</a> – <em>Удешевление криптографических операций для снижения затрат на [газ](/glossary/#gas).</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-1344">EIP-1344</a> – <em>Защищает Ethereum от атак повторного воспроизведения путем добавления [кода операции](/developers/docs/ethereum-stack/#ethereum-virtual-machine) <code>CHAINID</code>.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-1884">EIP-1884</a> – <em>оптимизирует стоимость газа для вызова опкодов, в зависимости от текущего уровня потребления.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2028">EIP-2028</a> – <em>Снижает стоимость CallData, позволяя размещать больше данных в блоках – полезно для [масштабирования уровня 2](/developers/docs/scaling/#layer-2-scaling).</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2200">EIP-2200</a> – <em>прочие изменения в расходах газа опкодами.</em></li>
</ul>

</ExpandableCard>

---

### Constantinople {#constantinople}

<NetworkUpgradeSummary name="constantinople" />

#### Краткое описание {#constantinople-summary}

Константинопольский форк:

- Снижена награда за [майнинг](/developers/docs/consensus-mechanisms/pow/mining/) блока с 3 до 2 ETH.
- Гарантировал, что блокчейн не «замерзнет» до [внедрения proof-of-stake](#beacon-chain-genesis).
- Оптимизирована стоимость [газа](/glossary/#gas) для определенных действий в [EVM](/developers/docs/ethereum-stack/#ethereum-virtual-machine).
- Добавлена возможность взаимодействия с адресами, которые еще не были созданы.

[Прочитать объявление Ethereum Foundation](https://blog.ethereum.org/2019/02/22/ethereum-constantinople-st-petersburg-upgrade-announcement/)

<ExpandableCard title="EIP в Constantinople" contentPreview="Официальные улучшения, включенные в этот форк.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-145">EIP-145</a> – <em>Оптимизирует стоимость определённых действий в блокчейне. </em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-1014">EIP-1014</a> – <em>позволяет взаимодействовать с адресами, которые ещё не были созданы.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-1052">EIP-1052</a> – <em>introduces the <code>EXTCODEHASH</code> instruction to retrieve the hash of another contract's code.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-1234">EIP-1234</a> – <em>Makes sure the blockchain doesn't freeze before proof-of-stake and reduces block reward from 3 to 2 ETH</em></li>
</ul>

</ExpandableCard>

<Divider />

## 2017 {#2017}

### Byzantium {#byzantium}

<NetworkUpgradeSummary name="byzantium" />

#### Краткое описание {#byzantium-summary}

Византийский форк:

- Снижена награда за [майнинг](/developers/docs/consensus-mechanisms/pow/mining/) блока с 5 до 3 ETH.
- Отложена [«бомба сложности» (difficulty bomb)](/glossary/#difficulty-bomb) на год.
- Добавлена возможность совершать внештатные вызовы к другим контрактам.
- Добавлены определенные криптографические методы для обеспечения [масштабирования уровня 2](/developers/docs/scaling/#layer-2-scaling).

[Прочитать объявление Ethereum Foundation](https://blog.ethereum.org/2017/10/12/byzantium-hf-announcement/)

<ExpandableCard title="EIP в Byzantium" contentPreview="Официальные улучшения, включенные в этот форк.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-140">EIP-140</a> – <em>добавляет опкод <code>REVERT</code>.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-658">EIP-658</a> – <em>добавляет поле статуса (успех/ошибка) в чеках транзакций.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-196">EIP-196</a> – <em>Добавляет операции с эллиптическими кривыми и скалярное умножение для поддержки технологии [ZK-Snarks](/developers/docs/scaling/zk-rollups/).</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-197">EIP-197</a> – <em>Добавляет эллиптические кривые и скалярное умножение для поддержки [ZK-Snarks](/developers/docs/scaling/zk-rollups/).</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-198">EIP-198</a> – <em>активация верификации RSA подписей.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-211">EIP-211</a> – <em>добавляет поддержку возвращения данных произвольной длины внутри EVM.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-214">EIP-214</a> – <em>добавляет опкод <code>STATICCALL</code>, открывает вызовы других контрактов без изменения стейтов.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-100">EIP-100</a> – <em>смена формулы расчёта сложности.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-649">EIP-649</a> – <em>Откладывает [бомбу сложности](/glossary/#difficulty-bomb) на 1 год и снижает вознаграждение за блок с 5 до 3 ETH.</em></li>
</ul>

</ExpandableCard>

<Divider />

## 2016 {#2016}

### Spurious Dragon {#spurious-dragon}

<NetworkUpgradeSummary name="spuriousDragon" />

#### Краткое описание {#spurious-dragon-summary}

Форк Фальшивого Дракона был вторым ответом на атаки отказа в обслуживании (DoS) на сеть (Сентябрь/Октябрь 2016) включающие:

- настройка ценообразующих опкодов для предотвращения будущих атак на сеть.
- включение "debloat" состояния блокчейна.
- добавление защиты от атаки повторами.

[Прочитать объявление Ethereum Foundation](https://blog.ethereum.org/2016/11/18/hard-fork-no-4-spurious-dragon/)

<ExpandableCard title="EIP в Spurious Dragon" contentPreview="Официальные улучшения, включенные в этот форк.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-155">EIP-155</a> – <em>предотвращает ретрансляцию транзакций из сети Ethereum в альтернативных сетях (например повторное воспроизведение транзакции из тестнета в основной цепочке Ethereum).</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-160">EIP-160</a> – <em>корректирует стоимость вызова опкода <code>EXP</code> – усложняет замедление сети дорогостоящими для вычисления операциями контрактов</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-161">EIP-161</a> – <em>позволяет удалять пустые аккаунты, добавленные во время DOS аттак.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-170">EIP-170</a> – <em>меняет максимальный размер кода, который может иметь контракт в блокчейне — на 24576 байт.</em></li>
</ul>

</ExpandableCard>

---

### Tangerine Whistle {#tangerine-whistle}

<NetworkUpgradeSummary name="tangerineWhistle" />

#### Краткое описание {#tangerine-whistle-summary}

Форк Свист Танжерина был первым ответом на атаки отказа в обслуживании (DoS) на сеть (Сентябрь/Октябрь 2016) включающие:

- решение неотложных проблем, связанных со здоровьем сетей в отношении недооцененных опкодов.

[Прочитать объявление Ethereum Foundation](https://blog.ethereum.org/2016/10/18/faq-upcoming-ethereum-hard-fork/)

<ExpandableCard title="EIP в Tangerine Whistle" contentPreview="Официальные улучшения, включенные в этот форк.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-150">EIP-150</a> – <em>повышает стоимость газа опкодов, которые могут быть использованы во время спам атак.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-158">EIP-158</a> – <em>снижает размер стейта путём удаления огромного количества пустых аккаунтов, которые были добавлены в стейт по низким ценам из-за недостатков в ранних версиях протокола Ethereum</em></li>
</ul>

</ExpandableCard>

---

### Форк DAO {#dao-fork}

<NetworkUpgradeSummary name="daoFork" />

#### Краткое описание {#dao-fork-summary}

Форк DAO был ответом на [атаку на DAO в 2016 году](https://www.coindesk.com/learn/understanding-the-dao-attack/), в ходе которой из-за уязвимости из контракта [DAO](/glossary/#dao) было выведено более 3,6 миллиона ETH. Форк переместил средства из ошибочного контракта в [новый контракт](https://eth.blockscout.com/address/0xbf4ed7b27f1d666546e30d74d50d173d20bca754) с единственной функцией: withdraw (вывод). Любой, кто потерял средства, может снять 1 ETH за каждые 100 токенов DAO в своих кошельках.

Этот курс действий был установлен по результатам голосования в сообществе Ethereum. Любой держатель ETH мог проголосовать с помощью транзакции на [платформе для голосования](https://web.archive.org/web/20170620030820/http://v1.carbonvote.com/). Решение о ветвлении набрало более 85 % голосов.

Некоторые майнеры отказались от форка из-за того, что инцидент DAO не был дефектом протокола. Они продолжили работу, сформировав [Ethereum Classic](https://ethereumclassic.org/).

[Прочитать объявление Ethereum Foundation](https://blog.ethereum.org/2016/07/20/hard-fork-completed/)

---

### Homestead {#homestead}

<NetworkUpgradeSummary name="homestead" />

#### Краткое описание {#homestead-summary}

Homestead форк, который смотрел на будущее. Он включал в себя несколько изменений протокола и сетевые изменения, которые дали Ethereum возможность выполнять дальнейшие обновления сети.

[Прочитать объявление Ethereum Foundation](https://blog.ethereum.org/2016/02/29/homestead-release/)

<ExpandableCard title="EIP в Homestead" contentPreview="Официальные улучшения, включенные в этот форк.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2">EIP-2</a> – <em>вносит изменения в процесс создания контракта.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7">EIP-7</a> – <em>добавляет новый опкод: <code>DELEGATECALL</code></em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-8">EIP-8</a> – <em>добавляет требования для обратной совместимости с devp2p</em></li>
</ul>

</ExpandableCard>

<Divider />

## 2015 {#2015}

### Оттаивание Frontier {#frontier-thawing}

<NetworkUpgradeSummary name="frontierThawing" />

#### Краткое описание {#frontier-thawing-summary}

Форк «Оттаивание Frontier» снял [лимит газа](/glossary/#gas) в 5000 на [блок](/glossary/#block) и установил цену на газ по умолчанию в 51 [гвей](/glossary/#gwei). Это позволило проводить транзакции – транзакции требуют 21 000 газа. [«Бомба сложности» (difficulty bomb)](/glossary/#difficulty-bomb) была введена, чтобы обеспечить будущий хард-форк на [proof-of-stake](/glossary/#pos).

- [Прочитать объявление Ethereum Foundation](https://blog.ethereum.org/2015/08/04/the-thawing-frontier/)
- [Прочитать Обновление протокола Ethereum 1](https://blog.ethereum.org/2015/08/04/ethereum-protocol-update-1/)

---

### Frontier {#frontier}

<NetworkUpgradeSummary name="frontier" />

#### Краткое описание {#frontier-summary}

Frontier работал, но был по сути голой реализацией проекта Ethereum. Она последовала за успешным этапом тестирования на олимпийских испытаниях. Это было предназначено для технических пользователей, в частности разработчиков. [Блоки](/glossary/#block) имели [лимит газа](/glossary/#gas) 5000. Этот период «таяния» позволил майнерам начать свои операции и ранним пользователям установить своих клиентов без необходимости «спешить».

[Прочитать объявление Ethereum Foundation](https://blog.ethereum.org/2015/07/22/frontier-is-coming-what-to-expect-and-how-to-prepare/)

<Divider />

## 2014 {#2014}

### Продажа Ether {#ether-sale}

<NetworkUpgradeSummary name="etherSale" />

Ether официально поступил в продажу на 42 дня. Вы можете купить его за BTC.

[Прочитать объявление Ethereum Foundation](https://blog.ethereum.org/2014/07/22/launching-the-ether-sale/)

---

### Выпущена «желтая книга» {#yellowpaper}

<NetworkUpgradeSummary name="yellowpaperRelease" />

Yellowpaper, автором которой является д-р Гавин Вуд, представляет собой техническое определение протокола Ethereum.

[Посмотреть «желтую книгу»](https://github.com/ethereum/yellowpaper)

<Divider />

## 2013 {#2013}

### Выпущена «белая книга» {#whitepaper}

<NetworkUpgradeSummary name="whitepaperRelease" />

Вступительный документ, опубликованный основателем Ethereum Виталиком Бутерином в 2013 году, до начала проекта в 2015 году.

<DocLink href="/whitepaper/">
  Whitepaper
</DocLink>
