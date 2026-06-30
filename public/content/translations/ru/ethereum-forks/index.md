---
title: Хронология всех форков Эфириума (с 2014 года по настоящее время)
description: История блокчейна Эфириум, включая основные вехи, релизы и форки.
lang: ru
sidebarDepth: 1
authors: ["Никсо"]
---

Хронология всех основных вех, форков и обновлений блокчейна [Эфириум](/).

<ExpandableCard title="Что такое форки?" contentPreview="Изменения правил протокола Эфириум, которые часто включают запланированные технические обновления.">

Форки происходят, когда в сеть необходимо внести крупные технические обновления или изменения — обычно они возникают на основе [предложений по улучшению Эфириума (EIP)](/eips/) и меняют «правила» протокола.

Когда требуются обновления в традиционном, централизованно управляемом программном обеспечении, компания просто выпускает новую версию для конечного пользователя. Блокчейны работают иначе, поскольку в них нет централизованного владения. [Клиенты Эфириума](/developers/docs/nodes-and-clients/) должны обновить свое программное обеспечение, чтобы внедрить новые правила форка. Кроме того, создатели блоков (майнеры в мире доказательства выполнения работы (PoW), валидаторы в мире доказательства доли владения) и узлы должны создавать блоки и проводить валидацию в соответствии с новыми правилами. [Подробнее о механизмах консенсуса](/developers/docs/consensus-mechanisms/)

Эти изменения правил могут привести к временному разделению сети. Новые блоки могут создаваться как по новым, так и по старым правилам. Форки обычно согласовываются заранее, чтобы клиенты принимали изменения синхронно, и форк с обновлениями становился основной цепью. Однако в редких случаях разногласия по поводу форков могут привести к необратимому разделению сети — наиболее известным примером является создание Эфириум Классик в результате <a href="#dao-fork">форка DAO</a>.

</ExpandableCard>

<ExpandableCard title="Почему у некоторых обновлений несколько названий?" contentPreview="Названия обновлений следуют определенному шаблону">

Программное обеспечение, лежащее в основе Эфириума, состоит из двух частей, известных как [уровень исполнения](/glossary/#execution-layer) и [уровень консенсуса](/glossary/#consensus-layer).

**Названия обновлений уровня исполнения**

С 2021 года обновления **уровня исполнения** называются в честь городов, где [ранее проводились Devcon и Devconnect](https://devcon.org/en/past-events/), в хронологическом порядке:

| Название обновления | Год Devcon(nect) | Номер Devcon | Дата обновления |
| ------------------- | ---------------- | ------------ | --------------- |
| Берлин              | 2014             | 0            | 15 апр. 2021 г. |
| Лондон              | 2015             | I            | 5 авг. 2021 г.  |
| Шанхай              | 2016             | II           | 12 апр. 2023 г. |
| Канкун              | 2017             | III          | 13 мар. 2024 г. |
| Прага               | 2018             | IV           | 7 мая 2025 г.   |
| Осака               | 2019             | V            | 3 дек. 2025 г.  |
| **Амстердам**       | 2022             | Devconnect   | Будет определено - Следующее |
| _Богота_            | 2022             | VI           | Будет определено |
| _Истанбул_          | 2023             | Devconnect   | Будет определено |
| _Бангкок_           | 2024             | VII          | Будет определено |
| _Буэнос-Айрес_      | 2025             | Devconnect   | Будет определено |
| _Мумбаи_            | 2026             | VIII         | Будет определено |

**Названия обновлений уровня консенсуса**

С момента запуска [сигнальной цепочки](/glossary/#beacon-chain) обновления **уровня консенсуса** называются в честь звезд, названия которых начинаются с букв в алфавитном порядке:

| Название обновления                                       | Дата обновления |
| --------------------------------------------------------- | --------------- |
| Генезис сигнальной цепочки                                | 1 дек. 2020 г.  |
| [Альтаир](https://en.wikipedia.org/wiki/Altair)            | 27 окт. 2021 г. |
| [Беллатрикс](https://en.wikipedia.org/wiki/Bellatrix)      | 6 сент. 2022 г. |
| [Капелла](https://en.wikipedia.org/wiki/Capella)          | 12 апр. 2023 г. |
| [Денеб](https://en.wikipedia.org/wiki/Deneb)              | 13 мар. 2024 г. |
| [Электра](<https://en.wikipedia.org/wiki/Electra_(star)>) | 7 мая 2025 г.   |
| [Фулу](<https://en.wikipedia.org/wiki/Fulu_(star)>)       | 3 дек. 2025 г.  |
| [**Глоас**](https://en.wikipedia.org/wiki/WASP-13)        | Будет определено - Следующее |
| [_Хезе_](https://en.wikipedia.org/wiki/Zeta_Virginis)     | Будет определено |

**Комбинированные названия**

Обновления уровней исполнения и консенсуса изначально выпускались в разное время, но после [Слияния](/roadmap/merge/) в 2022 году они стали развертываться одновременно. В связи с этим появились разговорные термины для упрощения ссылок на эти обновления с использованием одного объединенного слова. Это началось с обновления _Shanghai-Capella_, которое обычно называют «**Шапелла**», и продолжилось в последующих обновлениях.

| Обновление уровня исполнения | Обновление уровня консенсуса | Краткое название |
| ---------------------------- | ---------------------------- | ---------------- |
| Шанхай                       | Капелла                      | «Шапелла»        |
| Канкун                       | Денеб                        | «Денкун»         |
| Прага                        | Электра                      | «Пектра»         |
| Осака                        | Фулу                         | «Фусака»         |
| Амстердам                    | Глоас                        | «Гламстердам»    |
| Богота                       | Хезе                         | «Хегота»         |

</ExpandableCard>

Перейти сразу к информации о некоторых особенно важных прошлых обновлениях: [сигнальная цепочка](/roadmap/beacon-chain/); [Слияние](/roadmap/merge/); и [EIP-1559](#london)

Ищете информацию о будущих обновлениях протокола? [Узнайте о предстоящих обновлениях в дорожной карте Эфириума](/roadmap/).

<Divider />

## 2025 {#2025}

### Fulu-Osaka («Фусака») {#fusaka}

<NetworkUpgradeSummary name="fusaka" />

[Подробнее о Фусаке](/roadmap/fusaka/)

### Прага-Электра («Пектра»)
<NetworkUpgradeSummary name="pectra" />

Обновление Прага-Электра («Пектра») включало в себя несколько улучшений протокола Эфириума, направленных на повышение удобства работы для всех пользователей, сетей уровня 2 (l2), стейкеров и операторов узлов.

Стейкинг получил обновление благодаря возможности компаундинга для аккаунтов валидаторов и улучшенному контролю над средствами в стейкинге с использованием адреса для вывода на уровне исполнения. EIP-7251 увеличил максимальный эффективный баланс для одного валидатора до 2048, повысив эффективность использования капитала для стейкеров. EIP-7002 позволил аккаунту исполнения безопасно инициировать действия валидатора, включая выход или вывод части средств, что улучшило опыт для стейкеров ETH и помогло усилить подотчетность операторов узлов.

Другие части обновления были сосредоточены на улучшении опыта для обычных пользователей. EIP-7702 предоставил возможность обычному аккаунту, не являющемуся смарт-контрактом ([EOA](/glossary/#eoa)), выполнять код подобно смарт-контракту. Это открыло безграничные новые функциональные возможности для традиционных аккаунтов Эфириума, такие как пакетирование транзакций, спонсирование газа, альтернативная аутентификация, программируемый контроль расходов, механизмы восстановления аккаунта и многое другое.

<ExpandableCard title="EIP Пектра" contentPreview="Официальные улучшения, включенные в это обновление.">

Улучшенный пользовательский опыт:

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7702">EIP-7702</a> — <em>Установка кода аккаунта EOA</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7691">EIP-7691</a> — <em>Увеличение пропускной способности блобов</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7623">EIP-7623</a> — <em>Увеличение стоимости данных вызова</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7840">EIP-7840</a> — <em>Добавление расписания блобов в конфигурационные файлы уровня исполнения</em></li>
</ul>

Улучшенный опыт стейкинга:

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7251">EIP-7251</a> — <em>Увеличение <code>MAX_EFFECTIVE_BALANCE</code></em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7002">EIP-7002</a> — <em>Выходы, инициируемые уровнем исполнения</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7685">EIP-7685</a> — <em>Запросы уровня исполнения общего назначения</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-6110">EIP-6110</a> — <em>Предоставление депозитов валидаторов ончейн</em></li>
</ul>

Улучшения эффективности и безопасности протокола:

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2537">EIP-2537</a> — <em>Прекомпилированный контракт для операций с кривой BLS12-381</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2935">EIP-2935</a> — <em>Сохранение исторических хешей блоков в состоянии</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7549">EIP-7549</a> — <em>Перемещение индекса комитета за пределы аттестации</em></li>
</ul>

</ExpandableCard>

- [Как Пектра улучшит опыт стейкинга](https://www.kiln.fi/post/next-ethereum-upgrade-how-pectra-will-enhance-the-staking-experience)
- [Ознакомиться со спецификациями обновления Электра](https://github.com/ethereum/consensus-specs/tree/master/specs/electra/)
- [Часто задаваемые вопросы о Прага-Электра («Пектра»)](/roadmap/pectra/)

<Divider />

## 2024 {#2024}

### Канкун-Денеб («Денкун») {#dencun}

<NetworkUpgradeSummary name="dencun" />

#### Обзор обновления Канкун {#cancun-summary}

Обновление Канкун содержит набор улучшений _исполнения_ Эфириума, направленных на повышение масштабируемости, в тандеме с обновлениями консенсуса Денеб.

В частности, оно включает EIP-4844, известное как **прото-данкшардинг**, которое значительно снижает стоимость хранения данных для роллапов уровня 2 (l2). Это достигается за счет внедрения «блобов» данных, что позволяет роллапам публиковать данные в Мейннет на короткий период времени. В результате комиссии за транзакции для пользователей роллапов уровня 2 (l2) значительно снижаются.

<ExpandableCard title="EIP Канкун" contentPreview="Официальные улучшения, включенные в это обновление.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-1153">EIP-1153</a> - <em>Коды операций временного хранилища</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-4788">EIP-4788</a> - <em>Корень блока сигнальной цепи в EVM</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-4844">EIP-4844</a> - <em>Транзакции с блобами шардов (прото-данкшардинг)</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-5656">EIP-5656</a> - <em><code>MCOPY</code> — Инструкция копирования памяти</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-6780">EIP-6780</a> - <em><code>SELFDESTRUCT</code> только в той же транзакции</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7516">EIP-7516</a> - <em>Код операции <code>BLOBBASEFEE</code></em></li>
</ul>

</ExpandableCard>

- [Роллапы уровня 2 (l2)](/layer-2/)
- [Прото-данкшардинг](/roadmap/scaling/#proto-danksharding)
- [Данкшардинг](/roadmap/danksharding/)
- [Ознакомиться со спецификацией обновления Канкун](https://github.com/ethereum/execution-specs/blob/master/network-upgrades/mainnet-upgrades/cancun.md)

#### Обзор обновления Денеб {#deneb-summary}

Обновление Денеб содержит набор улучшений _консенсуса_ Эфириума, направленных на повышение масштабируемости. Это обновление выходит в тандеме с обновлениями исполнения Канкун для включения прото-данкшардинга (EIP-4844), наряду с другими улучшениями сигнальной цепочки.

Предварительно сгенерированные подписанные «сообщения о добровольном выходе» больше не имеют срока действия, что дает больше контроля пользователям, осуществляющим стейкинг своих средств через стороннего оператора узла. С помощью этого подписанного сообщения о выходе стейкеры могут делегировать управление узлом, сохраняя при этом возможность безопасно выйти и осуществить вывод своих средств в любое время, не спрашивая ни у кого разрешения.

EIP-7514 ужесточает эмиссию ETH, ограничивая «текучесть» (скорость, с которой валидаторы могут присоединяться к сети) до восьми (8) за эпоху. Поскольку эмиссия ETH пропорциональна общему количеству ETH в стейкинге, ограничение числа присоединяющихся валидаторов сдерживает _темпы роста_ вновь выпущенных ETH, а также снижает требования к оборудованию для операторов узлов, способствуя децентрализации.

<ExpandableCard title="EIP Денеб" contentPreview="Официальные улучшения, включенные в это обновление">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-4788">EIP-4788</a> - <em>Корень блока сигнальной цепи в EVM</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-4844">EIP-4844</a> - <em>Транзакции с блобами шардов</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7044">EIP-7044</a> - <em>Бессрочно действительные подписанные добровольные выходы</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7045">EIP-7045</a> - <em>Увеличение максимального слота включения аттестации</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7514">EIP-7514</a> - <em>Добавление максимального лимита текучести в эпоху</em></li>
</ul>

</ExpandableCard>

- [Ознакомиться со спецификациями обновления Денеб](https://github.com/ethereum/consensus-specs/tree/master/specs/deneb/)
- [Часто задаваемые вопросы о Канкун-Денеб («Денкун»)](/roadmap/dencun/)

<Divider />

## 2023 {#2023}

### Шанхай-Капелла («Шапелла») {#shapella}

<NetworkUpgradeSummary name="shapella" />

#### Обзор обновления Шанхай {#shanghai-summary}

Обновление Шанхай добавило возможность вывода средств из стейкинга на уровень исполнения. В тандеме с обновлением Капелла это позволило блокам принимать операции вывода, что дает стейкерам возможность выводить свои ETH из сигнальной цепочки на уровень исполнения.

<ExpandableCard title="EIP Шанхай" contentPreview="Официальные улучшения, включенные в это обновление.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-3651">EIP-3651</a> – <em>Изначально «прогревает» адрес <code>COINBASE</code></em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-3855">EIP-3855</a> – <em>Новая инструкция <code>PUSH0</code></em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-3860">EIP-3860</a> – <em>Ограничение и измерение initcode</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-4895">EIP-4895</a> – <em>Вывод средств из сигнальной цепочки в виде операций</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-6049">EIP-6049</a> - <em>Объявление <code>SELFDESTRUCT</code> устаревшим</em></li>
</ul>

</ExpandableCard>

- [Ознакомиться со спецификацией обновления Шанхай](https://github.com/ethereum/execution-specs/blob/master/network-upgrades/mainnet-upgrades/shanghai.md)

#### Обзор обновления Капелла {#capella-summary}

Обновление Капелла стало третьим крупным обновлением уровня консенсуса (сигнальной цепочки) и позволило выводить средства из стейкинга. Капелла произошла синхронно с обновлением уровня исполнения, Шанхай, и активировала функцию вывода средств из стейкинга.

Это обновление уровня консенсуса дало возможность стейкерам, которые не предоставили реквизиты для вывода при первоначальном депозите, сделать это, тем самым разрешив вывод средств.

Обновление также предоставило функцию автоматического сканирования аккаунтов, которая непрерывно обрабатывает аккаунты валидаторов на предмет любых доступных выплат вознаграждений или полного вывода средств.

- [Подробнее о выводе средств из стейкинга](/staking/withdrawals/).
- [Ознакомиться со спецификациями обновления Капелла](https://github.com/ethereum/consensus-specs/tree/master/specs/capella/)

<Divider />

## 2022 {#2022}

### Париж (Слияние) {#paris}

<NetworkUpgradeSummary name="paris" />

#### Краткое описание {#paris-summary}

Обновление Париж было активировано, когда блокчейн с доказательством выполнения работы (PoW) превысил [терминальную общую сложность](/glossary/#terminal-total-difficulty) в 58750000000000000000000. Это произошло на блоке 15537393 15 сентября 2022 года, что активировало обновление Париж на следующем блоке. Париж стал переходом к [Слиянию](/roadmap/merge/) — его главной особенностью было отключение алгоритма майнинга на основе [доказательства выполнения работы (PoW)](/developers/docs/consensus-mechanisms/pow) и связанной с ним логики консенсуса, а также включение вместо него [доказательства доли владения (PoS)](/developers/docs/consensus-mechanisms/pos). Сам Париж был обновлением для [клиентов исполнения](/developers/docs/nodes-and-clients/#execution-clients) (эквивалент Bellatrix на уровне консенсуса), которое позволило им получать инструкции от подключенных к ним [клиентов консенсуса](/developers/docs/nodes-and-clients/#consensus-clients). Для этого потребовалась активация нового набора внутренних методов API, известных под общим названием [Engine API](https://github.com/ethereum/execution-apis/blob/main/src/engine/common.md). Возможно, это было самое значительное обновление в истории Эфириума со времен [Хомстед](#homestead)!

- [Ознакомиться со спецификацией обновления Париж](https://github.com/ethereum/execution-specs/blob/master/network-upgrades/mainnet-upgrades/paris.md)

<ExpandableCard title="EIP Париж" contentPreview="Официальные улучшения, включенные в это обновление.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-3675">EIP-3675</a> – <em>Обновление консенсуса до доказательства доли владения</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-4399">EIP-4399</a> – <em>Замена кода операции DIFFICULTY на PREVRANDAO</em></li>
</ul>

</ExpandableCard>

---

### Bellatrix {#bellatrix}

<NetworkUpgradeSummary name="bellatrix" />

#### Краткое описание {#bellatrix-summary}

Обновление Bellatrix стало вторым запланированным обновлением для [сигнальной цепочки](/roadmap/beacon-chain), подготавливающим цепь к [Слиянию](/roadmap/merge/). Оно доводит штрафы валидаторов до их полных значений за бездействие и нарушения, ведущие к слэшингу. Bellatrix также включает обновление правил выбора форка для подготовки цепи к Слиянию и переходу от последнего блока с доказательством выполнения работы (PoW) к первому блоку с доказательством доли владения (PoS). Это включает в себя информирование клиентов консенсуса о [терминальной общей сложности](/glossary/#terminal-total-difficulty), равной 58750000000000000000000.

- [Ознакомиться со спецификацией обновления Bellatrix](https://github.com/ethereum/consensus-specs/tree/master/specs/bellatrix)

---

### Gray Glacier {#gray-glacier}

<NetworkUpgradeSummary name="grayGlacier" />

#### Краткое описание {#gray-glacier-summary}

Обновление сети Gray Glacier отодвинуло [бомбу сложности](/glossary/#difficulty-bomb) на три месяца. Это единственное изменение, представленное в данном обновлении, и по своей природе оно аналогично обновлениям [Arrow Glacier](#arrow-glacier) и [Muir Glacier](#muir-glacier). Подобные изменения были выполнены в обновлениях сети [Бизантиум](#byzantium), [Константинополь](#constantinople) и [Лондон](#london).

- [Блог EF — Анонс обновления Gray Glacier](https://blog.ethereum.org/2022/06/16/gray-glacier-announcement)

<ExpandableCard title="EIP Gray Glacier" contentPreview="Официальные улучшения, включенные в это обновление.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-5133">EIP-5133</a> – <em>откладывает бомбу сложности до сентября 2022 года</em></li>
</ul>

</ExpandableCard>

<Divider />

## 2021 {#2021}

### Arrow Glacier {#arrow-glacier}

<NetworkUpgradeSummary name="arrowGlacier" />

#### Краткое описание {#arrow-glacier-summary}

Обновление сети Arrow Glacier отодвинуло [бомбу сложности](/glossary/#difficulty-bomb) на несколько месяцев. Это единственное изменение, представленное в этом обновлении, и по своей природе оно похоже на обновление [Muir Glacier](#muir-glacier). Аналогичные изменения были выполнены в обновлениях сети [Бизантиум](#byzantium), [Константинополь](#constantinople) и [Лондон](#london).

- [Блог EF — Анонс обновления Arrow Glacier](https://blog.ethereum.org/2021/11/10/arrow-glacier-announcement)
- [Ethereum Cat Herders — Обновление Эфириума Arrow Glacier](https://medium.com/ethereum-cat-herders/ethereum-arrow-glacier-upgrade-e8d20fa4c002)

<ExpandableCard title="EIP Arrow Glacier" contentPreview="Официальные улучшения, включенные в это обновление.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-4345">EIP-4345</a> — <em>откладывает бомбу сложности до июня 2022 года</em></li>
</ul>

</ExpandableCard>

---

### Altair {#altair}

<NetworkUpgradeSummary name="altair" />

#### Краткое описание {#altair-summary}

Обновление Altair стало первым запланированным обновлением для [сигнальной цепочки](/roadmap/beacon-chain). Оно добавило поддержку «комитетов синхронизации», что позволило использовать легкие клиенты, а также увеличило штрафы за неактивность валидаторов и слэшинг по мере продвижения разработки к Слиянию.

- [Ознакомиться со спецификацией обновления Altair](https://github.com/ethereum/consensus-specs/tree/master/specs/altair)

#### <Emoji text=":tada:" size={1} className="me-2" /> Интересный факт! {#altair-fun-fact}

Altair стал первым крупным обновлением сети, у которого было точное время развертывания. Каждое предыдущее обновление основывалось на объявленном номере блока в цепи доказательства выполнения работы (PoW), где время блока варьируется. Сигнальная цепочка не требует решения задач для доказательства выполнения работы (PoW), а вместо этого работает на основанной на времени системе эпох, состоящей из 32 двенадцатисекундных «слотов» времени, в которых валидаторы могут предлагать блоки. Именно поэтому мы точно знали, когда достигнем эпохи 74 240 и Altair будет запущен!

- [Время блока](/developers/docs/blocks/#block-time)

---

### Лондон {#london}

<NetworkUpgradeSummary name="london" />

#### Краткое описание {#london-summary}

Обновление Лондон представило [EIP-1559](https://eips.ethereum.org/EIPS/eip-1559), которое реформировало рынок комиссий за транзакции, наряду с изменениями в обработке возврата газа и расписании [Ледникового периода](/glossary/#ice-age).

#### Что такое обновление Лондон / EIP-1559? {#eip-1559}

До обновления Лондон в Эфириуме были блоки фиксированного размера. Во времена высокого спроса в сети эти блоки работали на полную мощность. В результате пользователям часто приходилось ждать снижения спроса, чтобы попасть в блок, что приводило к ухудшению пользовательского опыта. Обновление Лондон ввело в Эфириум блоки переменного размера.

Способ расчета комиссий за транзакции в сети Эфириум изменился с [обновлением Лондон](/ethereum-forks/#london) в августе 2021 года. До обновления Лондон комиссии рассчитывались без разделения комиссий `base` и `priority` следующим образом:

Допустим, Алисе нужно было заплатить Бобу 1 ETH. В транзакции лимит газа составляет 21 000 единиц, а цена газа — 200 Gwei.

Общая комиссия составила бы: `Gas units (limit) * Gas price per unit`, то есть `21,000 * 200 = 4,200,000 gwei` или 0,0042 ETH.

Внедрение [EIP-1559](https://eips.ethereum.org/EIPS/eip-1559) в обновлении Лондон сделало механизм комиссий за транзакции более сложным, но сделало комиссии за газ более предсказуемыми, что привело к более эффективному рынку комиссий за транзакции. Пользователи могут отправлять транзакции с `maxFeePerGas`, соответствующим тому, сколько они готовы заплатить за выполнение транзакции, зная, что они не заплатят больше рыночной цены за газ (`baseFeePerGas`), и получат обратно любую переплату за вычетом их чаевых.

В этом видео объясняется EIP-1559 и преимущества, которые он приносит: [Объяснение EIP-1559](https://www.youtube.com/watch?v=MGemhK9t44Q)

- [Вы разработчик децентрализованных приложений (dapp)? Обязательно обновите свои библиотеки и инструменты.](https://github.com/ethereum/execution-specs/blob/master/network-upgrades/london-ecosystem-readiness.md)
- [Прочитать анонс Фонда Ethereum](https://blog.ethereum.org/2021/07/15/london-mainnet-announcement)
- [Прочитать объяснение от Ethereum Cat Herders](https://medium.com/ethereum-cat-herders/london-upgrade-overview-8eccb0041b41)

<ExpandableCard title="EIP Лондон" contentPreview="Официальные улучшения, включенные в это обновление.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-1559">EIP-1559</a> — <em>улучшает рынок комиссий за транзакции</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-3198">EIP-3198</a> — <em>возвращает <code>BASEFEE</code> из блока</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-3529">EIP-3529</a> — <em>сокращает возврат газа для операций EVM</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-3541">EIP-3541</a> — <em>предотвращает развертывание контрактов, начинающихся с <code>0xEF</code></em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-3554">EIP-3554</a> — <em>откладывает Ледниковый период до декабря 2021 года</em></li>
</ul>

</ExpandableCard>

---

### Берлин {#berlin}

<NetworkUpgradeSummary name="berlin" />

#### Краткое описание {#berlin-summary}

Обновление Берлин оптимизировало стоимость газа для определенных действий EVM и расширило поддержку нескольких типов транзакций.

- [Прочитать анонс Фонда Ethereum](https://blog.ethereum.org/2021/03/08/ethereum-berlin-upgrade-announcement)
- [Прочитать объяснение от Ethereum Cat Herders](https://medium.com/ethereum-cat-herders/the-berlin-upgrade-overview-2f7ad710eb80)

<ExpandableCard title="EIP Берлин" contentPreview="Официальные улучшения, включенные в это обновление.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2565">EIP-2565</a> — <em>снижает стоимость газа для MODEXP</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2718">EIP-2718</a> — <em>упрощает поддержку нескольких типов транзакций</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2929">EIP-2929</a> — <em>увеличивает стоимость газа для кодов операций доступа к состоянию</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2930">EIP-2930</a> — <em>добавляет необязательные списки доступа</em></li>
</ul>

</ExpandableCard>

<Divider />

## 2020 {#2020}

### Генезис сигнальной цепочки {#beacon-chain-genesis}

<NetworkUpgradeSummary name="beaconChainGenesis" />

#### Резюме {#beacon-chain-genesis-summary}

Для безопасного запуска [сигнальной цепочке](/roadmap/beacon-chain/) требовалось 16384 депозита по 32 ETH в стейкинге. Это произошло 27 ноября, и сигнальная цепочка начала производить блоки 1 декабря 2020 года.

[Прочитать анонс Фонда Ethereum](https://blog.ethereum.org/2020/11/27/eth2-quick-update-no-21)

<DocLink href="/roadmap/beacon-chain/">
  Сигнальная цепочка
</DocLink>

---

### Развернут контракт стейкингового депозита {#staking-deposit-contract}

<NetworkUpgradeSummary name="stakingDepositContractDeployed" />

#### Резюме {#deposit-contract-summary}

Контракт стейкингового депозита внедрил [стейкинг](/glossary/#staking) в экосистему Эфириума. Хотя это контракт [Мейннета](/glossary/#mainnet), он оказал прямое влияние на сроки запуска [сигнальной цепочки](/roadmap/beacon-chain/) — важного [обновления Эфириума](/roadmap/).

[Прочитать анонс Фонда Ethereum](https://blog.ethereum.org/2020/11/04/eth2-quick-update-no-19)

<DocLink href="/staking/">
  Стейкинг
</DocLink>

---

### Muir Glacier {#muir-glacier}

<NetworkUpgradeSummary name="muirGlacier" />

#### Резюме {#muir-glacier-summary}

Форк Muir Glacier отложил [бомбу сложности](/glossary/#difficulty-bomb). Увеличение сложности блоков механизма консенсуса [доказательства выполнения работы (PoW)](/developers/docs/consensus-mechanisms/pow/) угрожало ухудшить удобство использования Эфириума за счет увеличения времени ожидания отправки транзакций и использования децентрализованных приложений (dapps).

- [Прочитать анонс Фонда Ethereum](https://blog.ethereum.org/2019/12/23/ethereum-muir-glacier-upgrade-announcement)
- [Прочитать объяснение от Ethereum Cat Herders](https://medium.com/ethereum-cat-herders/ethereum-muir-glacier-upgrade-89b8cea5a210)

<ExpandableCard title="EIP Muir Glacier" contentPreview="Официальные улучшения, включенные в этот форк.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2384">EIP-2384</a> — <em>откладывает бомбу сложности еще на 4 000 000 блоков, или примерно на 611 дней.</em></li>
</ul>

</ExpandableCard>

<Divider />

## 2019 {#2019}

### Истанбул {#istanbul}

<NetworkUpgradeSummary name="istanbul" />

#### Резюме {#istanbul-summary}

Форк Истанбул:

- Оптимизировал стоимость [газа](/glossary/#gas) для определенных действий в [EVM](/developers/docs/ethereum-stack/#ethereum-virtual-machine).
- Повысил устойчивость к атакам типа «отказ в обслуживании» (DoS).
- Сделал решения для [масштабирования уровня 2 (l2)](/developers/docs/scaling/#layer-2-scaling) на базе SNARK и STARK более производительными.
- Обеспечил возможность взаимодействия между Эфириумом и Zcash.
- Позволил контрактам внедрять более креативные функции.

[Прочитать анонс Фонда Ethereum](https://blog.ethereum.org/2019/11/20/ethereum-istanbul-upgrade-announcement)

<ExpandableCard title="EIP Истанбул" contentPreview="Официальные улучшения, включенные в этот форк.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-152">EIP-152</a> – <em>позволяет Эфириуму работать с криптовалютами, сохраняющими приватность, такими как Zcash.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-1108">EIP-1108</a> – <em>более дешевая криптография для снижения стоимости [газа](/glossary/#gas).</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-1344">EIP-1344</a> – <em>защищает Эфириум от атак повторного воспроизведения путем добавления [кода операции](/developers/docs/ethereum-stack/#ethereum-virtual-machine) <code>CHAINID</code>.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-1884">EIP-1884</a> – <em>оптимизация цены газа для кодов операций на основе потребления.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2028">EIP-2028</a> – <em>снижает стоимость данных вызова (CallData), чтобы позволить размещать больше данных в блоках — полезно для [масштабирования уровня 2 (l2)](/developers/docs/scaling/#layer-2-scaling).</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2200">EIP-2200</a> – <em>другие изменения цены газа для кодов операций.</em></li>
</ul>

</ExpandableCard>

---

### Константинополь {#constantinople}

<NetworkUpgradeSummary name="constantinople" />

#### Резюме {#constantinople-summary}

Форк Константинополь:

- Снизил вознаграждение за [майнинг](/developers/docs/consensus-mechanisms/pow/mining/) блока с 3 до 2 ETH.
- Обеспечил, чтобы блокчейн не заморозился до [внедрения доказательства доли владения](#beacon-chain-genesis).
- Оптимизировал стоимость [газа](/glossary/#gas) для определенных действий в [EVM](/developers/docs/ethereum-stack/#ethereum-virtual-machine).
- Добавил возможность взаимодействия с адресами, которые еще не были созданы.

[Прочитать анонс Фонда Ethereum](https://blog.ethereum.org/2019/02/22/ethereum-constantinople-st-petersburg-upgrade-announcement)

<ExpandableCard title="EIP Константинополь" contentPreview="Официальные улучшения, включенные в этот форк.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-145">EIP-145</a> – <em>оптимизирует стоимость определенных ончейн-действий.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-1014">EIP-1014</a> – <em>позволяет взаимодействовать с адресами, которые еще предстоит создать.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-1052">EIP-1052</a> – <em>внедряет инструкцию <code>EXTCODEHASH</code> для получения хеша кода другого контракта.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-1234">EIP-1234</a> – <em>гарантирует, что блокчейн не заморозится до внедрения доказательства доли владения, и снижает вознаграждение за блок с 3 до 2 ETH.</em></li>
</ul>

</ExpandableCard>

<Divider />

## 2017 {#2017}

### Бизантиум {#byzantium}

<NetworkUpgradeSummary name="byzantium" />

#### Резюме {#byzantium-summary}

Форк Бизантиум:

- Снижено вознаграждение за [майнинг](/developers/docs/consensus-mechanisms/pow/mining/) блока с 5 до 3 ETH.
- Отложена [бомба сложности](/glossary/#difficulty-bomb) на один год.
- Добавлена возможность выполнять вызовы других контрактов без изменения состояния.
- Добавлены определенные криптографические методы для обеспечения [масштабирования уровня 2 (l2)](/developers/docs/scaling/#layer-2-scaling).

[Прочитать анонс Фонда Ethereum](https://blog.ethereum.org/2017/10/12/byzantium-hf-announcement)

<ExpandableCard title="EIP Бизантиум" contentPreview="Официальные улучшения, включенные в этот форк.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-140">EIP-140</a> – <em>добавляет код операции <code>REVERT</code>.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-658">EIP-658</a> – <em>в квитанции о транзакциях добавлено поле статуса, указывающее на успех или ошибку.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-196">EIP-196</a> – <em>добавляет эллиптическую кривую и скалярное умножение для поддержки [ZK-Snarks](/developers/docs/scaling/zk-rollups/).</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-197">EIP-197</a> – <em>добавляет эллиптическую кривую и скалярное умножение для поддержки [ZK-Snarks](/developers/docs/scaling/zk-rollups/).</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-198">EIP-198</a> – <em>включает проверку подписи RSA.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-211">EIP-211</a> – <em>добавляет поддержку возвращаемых значений переменной длины.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-214">EIP-214</a> – <em>добавляет код операции <code>STATICCALL</code>, позволяющий выполнять вызовы других контрактов без изменения состояния.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-100">EIP-100</a> – <em>изменяет формулу корректировки сложности.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-649">EIP-649</a> – <em>откладывает [бомбу сложности](/glossary/#difficulty-bomb) на 1 год и снижает вознаграждение за блок с 5 до 3 ETH.</em></li>
</ul>

</ExpandableCard>

<Divider />

## 2016 {#2016}

### Spurious Dragon {#spurious-dragon}

<NetworkUpgradeSummary name="spuriousDragon" />

#### Краткое описание {#spurious-dragon-summary}

Форк Spurious Dragon стал вторым ответом на атаки типа «отказ в обслуживании» (DoS) на сеть (сентябрь/октябрь 2016 года), включающим:

- корректировку стоимости кодов операций для предотвращения будущих атак на сеть.
- включение «очистки» состояния блокчейна от лишних данных.
- добавление защиты от атак повторного воспроизведения.

[Прочитать анонс Фонда Ethereum](https://blog.ethereum.org/2016/11/18/hard-fork-no-4-spurious-dragon)

<ExpandableCard title="EIP Spurious Dragon" contentPreview="Официальные улучшения, включенные в этот форк.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-155">EIP-155</a> — <em>предотвращает повторную трансляцию транзакций из одной цепи Эфириума в альтернативной цепи, например, повторное воспроизведение транзакции из тестовой сети в основной цепи Эфириума.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-160">EIP-160</a> — <em>корректирует цены кода операции <code>EXP</code>, что усложняет замедление сети с помощью вычислительно затратных операций контракта.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-161">EIP-161</a> — <em>позволяет удалять пустые аккаунты, добавленные в ходе DOS-атак.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-170">EIP-170</a> — <em>изменяет максимальный размер кода, который может иметь контракт в блокчейне, до 24576 байт.</em></li>
</ul>

</ExpandableCard>

---

### Tangerine whistle {#tangerine-whistle}

<NetworkUpgradeSummary name="tangerineWhistle" />

#### Краткое описание {#tangerine-whistle-summary}

Форк Tangerine Whistle стал первым ответом на атаки типа «отказ в обслуживании» (DoS) на сеть (сентябрь/октябрь 2016 года), включающим:

- решение срочных проблем работоспособности сети, связанных с заниженной стоимостью кодов операций.

[Прочитать анонс Фонда Ethereum](https://blog.ethereum.org/2016/10/18/faq-upcoming-ethereum-hard-fork)

<ExpandableCard title="EIP Tangerine Whistle" contentPreview="Официальные улучшения, включенные в этот форк.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-150">EIP-150</a> — <em>увеличивает стоимость газа для кодов операций, которые могут быть использованы в спам-атаках.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-158">EIP-158</a> — <em>уменьшает размер состояния путем удаления большого количества пустых аккаунтов, которые были добавлены в состояние по очень низкой цене из-за недостатков в ранних версиях протокола Эфириума.</em></li>
</ul>

</ExpandableCard>

---

### Форк DAO {#dao-fork}

<NetworkUpgradeSummary name="daoFork" />

#### Краткое описание {#dao-fork-summary}

Форк DAO стал ответом на [атаку на DAO в 2016 году](https://www.coindesk.com/learn/understanding-the-dao-attack/), когда в результате взлома из уязвимого контракта [DAO](/glossary/#dao) было выведено более 3,6 миллиона ETH. Форк перевел средства из неисправного контракта в [новый контракт](https://eth.blockscout.com/address/0xbf4ed7b27f1d666546e30d74d50d173d20bca754) с единственной функцией: вывод (withdraw). Любой, кто потерял средства, мог вывести 1 ETH за каждые 100 токенов DAO в своем кошельке.

За этот план действий проголосовало сообщество Эфириума. Любой владелец ETH мог проголосовать с помощью транзакции на [платформе для голосования](https://web.archive.org/web/20170620030820/http://v1.carbonvote.com/). Решение о проведении форка набрало более 85% голосов.

Некоторые майнеры отказались от форка, поскольку инцидент с DAO не был дефектом протокола. В дальнейшем они образовали [Эфириум Классик](https://ethereumclassic.org/).

[Прочитать анонс Фонда Ethereum](https://blog.ethereum.org/2016/07/20/hard-fork-completed)

---

### Хомстед {#homestead}

<NetworkUpgradeSummary name="homestead" />

#### Краткое описание {#homestead-summary}

Форк Хомстед был устремлен в будущее. Он включал в себя несколько изменений протокола и сетевое изменение, которое дало Эфириуму возможность проводить дальнейшие обновления сети.

[Прочитать анонс Фонда Ethereum](https://blog.ethereum.org/2016/02/29/homestead-release)

<ExpandableCard title="EIP Хомстед" contentPreview="Официальные улучшения, включенные в этот форк.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2">EIP-2</a> — <em>вносит изменения в процесс создания контракта.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7">EIP-7</a> — <em>добавляет новый код операции: <code>DELEGATECALL</code></em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-8">EIP-8</a> — <em>вводит требования к прямой совместимости devp2p</em></li>
</ul>

</ExpandableCard>

<Divider />

## 2015 {#2015}

### Оттепель Фронтира {#frontier-thawing}

<NetworkUpgradeSummary name="frontierThawing" />

#### Краткое описание {#frontier-thawing-summary}

Форк оттепели Фронтира снял лимит в 5000 [газа](/glossary/#gas) на [блок](/glossary/#block) и установил цену газа по умолчанию на уровне 51 [Gwei](/glossary/#gwei). Это сделало возможным проведение транзакций — транзакции требуют 21 000 газа. Была введена [бомба сложности](/glossary/#difficulty-bomb), чтобы гарантировать будущий хард-форк для перехода на [доказательство доли владения](/glossary/#pos).

- [Прочитать анонс Фонда Ethereum](https://blog.ethereum.org/2015/08/04/the-thawing-frontier)
- [Прочитать Обновление протокола Эфириума 1](https://blog.ethereum.org/2015/08/04/ethereum-protocol-update-1)

---

### Фронтир {#frontier}

<NetworkUpgradeSummary name="frontier" />

#### Краткое описание {#frontier-summary}

Фронтир был рабочей, но базовой реализацией проекта Эфириум. Он последовал за успешной фазой тестирования Olympic. Он предназначался для технических пользователей, в первую очередь для разработчиков. [Блоки](/glossary/#block) имели лимит [газа](/glossary/#gas) в 5000. Этот период «оттепели» позволил майнерам начать свою работу, а первым пользователям — установить свои клиенты без необходимости «спешить».

[Прочитать анонс Фонда Ethereum](https://blog.ethereum.org/2015/07/22/frontier-is-coming-what-to-expect-and-how-to-prepare)

<Divider />

## 2014 {#2014}

### Продажа эфира {#ether-sale}

<NetworkUpgradeSummary name="etherSale" />

Эфир официально поступил в продажу на 42 дня. Его можно было купить за BTC.

[Прочитать анонс Фонда Ethereum](https://blog.ethereum.org/2014/07/22/launching-the-ether-sale)

---

### Выпущена желтая книга {#yellowpaper}

<NetworkUpgradeSummary name="yellowpaperRelease" />

Желтая книга, написанная доктором Гэвином Вудом, представляет собой техническое описание протокола Эфириума.

[Посмотреть желтую книгу](https://github.com/ethereum/yellowpaper)

<Divider />

## 2013 {#2013}

### Выпущена белая книга {#whitepaper}

<NetworkUpgradeSummary name="whitepaperRelease" />

Вводный документ, опубликованный в 2013 году Виталиком Бутериным, основателем Эфириума, до запуска проекта в 2015 году.

<DocLink href="/whitepaper/">
  Белая книга
</DocLink>
