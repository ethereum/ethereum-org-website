---
title: "Хронологія всіх форків Ethereum (з 2014 року до сьогодні)"
description: "Історія блокчейну Ethereum, включаючи основні віхи, релізи та форки."
lang: uk
sidebarDepth: 1
---

# Хронологія всіх форків Ethereum (з 2014 року до сьогодні) {#the-history-of-ethereum}

Хронологія всіх основних етапів, форків та оновлень блокчейну Ethereum.

<ExpandableCard title="Що таке форки?" contentPreview="Зміни до правил протоколу Ethereum, що часто включають планові технічні оновлення.">

Форки – це коли необхідно внести серйозні технічні оновлення або зміни в мережу – які зазвичай випливають із [Пропозицій щодо покращення Ethereum (EIPs)](/eips/) і змінюють «правила» протоколу.

Коли потрібні оновлення традиційного програмного забезпечення з центральним управлінням, компанія просто публікує нову версію для кінцевого користувача. Блокчейн працює по-різному, оскільки немає центральної власності. [Клієнти Ethereum](/developers/docs/nodes-and-clients/) повинні оновити своє програмне забезпечення, щоб запровадити нові правила форку. Творці блокування Plus (майнери у світі proof-of-work, валідатори у світі proof-of-stake) та вузли повинні створювати блоки та перевіряти їх відповідно до нових правил. [Докладніше про механізми консенсусу](/developers/docs/consensus-mechanisms/)

Ці зміни правил можуть спричинити тимчасовий розкол у мережі. Нові блоки можуть виготовлятися за новими чи старими правилами. Форки зазвичай узгоджуються заздалегідь, щоб клієнти разом приймали зміни, а форк з оновленнями став основним ланцюгом. Однак у рідкісних випадках розбіжності щодо Форків можуть призвести до остаточного розколу мережі, зокрема створення Ethereum Classic із <a href="#dao-fork"> Форком DAO</a>.
</ExpandableCard>

<ExpandableCard title="Чому деякі оновлення мають кілька назв?" contentPreview="Назви оновлень мають певну закономірність.">

The software that underlies Ethereum is composed of two halves, known as the [execution layer](/glossary/#execution-layer) and the [consensus layer](/glossary/#consensus-layer).

**Найменування оновлень рівня виконання**

З 2021 року оновлення **рівня виконання** називаються відповідно до назв міст [попередніх місць проведення Devcon](https://devcon.org/en/past-events/) у хронологічному порядку:

| Назва оновлення | Рік Devcon | Номер Devcon | Дата оновлення                     |
| --------------- | ---------- | ------------ | ---------------------------------- |
| Берлін          | 2014       | 0            | 15 квітня 2021 р.  |
| Лондон          | 2015       | I            | 5 серпня 2021 р.   |
| Shanghai        | 2016       | II           | 12 квітня 2023 р.  |
| Канкун          | 2017       | III          | 13 березня 2024 р. |
| **Прага**       | 2018       | IV           | Буде визначено — наступне          |
| _Осака_         | 2019       | V            | Буде визначено                     |
| _Богота_        | 2022       | VI           | Буде визначено                     |
| _Бангкок_       | 2024       | VII          | Буде визначено                     |

**Найменування оновлень консенсусу**

З моменту запуску [Beacon Chain](/glossary/#beacon-chain) оновлення **рівня консенсусу** називаються на честь небесних зірок, що починаються з літер, які йдуть в алфавітному порядку:

| Назва оновлення                                               | Дата оновлення                     |
| ------------------------------------------------------------- | ---------------------------------- |
| Beacon Chain genesis                                          | 1 грудня 2020 р.   |
| [Альтаїр](https://en.wikipedia.org/wiki/Altair)               | 27 жовтня 2021 р.  |
| [Беллатрикс](https://en.wikipedia.org/wiki/Bellatrix)         | 6 вересня 2022 р.  |
| [Капелла](https://en.wikipedia.org/wiki/Capella)              | 12 квітня 2023 р.  |
| [Денеб](https://en.wikipedia.org/wiki/Deneb)                  | 13 березня 2024 р. |
| [**Електра**](https://en.wikipedia.org/wiki/Electra_\(star\)) | Буде визначено — наступне          |
| [_Фулу_](https://en.wikipedia.org/wiki/Fulu_\(star\))         | Буде визначено                     |

**Комбіноване найменування**

Оновлення рівнів виконання та консенсусу спочатку розгорталися в різний час, але після [The Merge](/roadmap/merge/) у 2022 році вони були розгорнуті одночасно. Таким чином, з'явилися розмовні терміни, які спрощують посилання на ці оновлення, використовуючи єдиний сполучений термін. Це почалося з оновлення _Shanghai-Capella_, яке зазвичай називають «**Shapella**», і продовжується оновленнями _Cancun-Deneb_ (**Dencun**) та _Prague-Electra_ (**Pectra**).

| Оновлення рівня виконання | Оновлення консенсусу | Коротка назва |
| ------------------------- | -------------------- | ------------- |
| Shanghai                  | Капела               | "Shapella"    |
| Канкун                    | Денеб                | "Dencun"      |
| Прага                     | Електра              | "Pectra"      |
| Осака                     | Фулу                 | "Fusaka"      |
</ExpandableCard>

Перейдіть одразу до інформації про деякі особливо важливі минулі оновлення: [The Beacon Chain](/roadmap/beacon-chain/); [The Merge](/roadmap/merge/); та [EIP-1559](#london)

Шукаєте майбутні оновлення протоколу? [Дізнайтеся про майбутні оновлення в дорожній карті Ethereum](/roadmap/).

<Divider />

## 2025 {#2025}

### Фулу-Осака ("Fusaka") {#fusaka}

<NetworkUpgradeSummary name="fusaka" />

[Докладніше про Fusaka](/roadmap/fusaka/)

### Прага-Електра ("Pectra") {#pectra}

<NetworkUpgradeSummary name="pectra" />

Оновлення Prague-Electra ("Pectra") включало низку покращень протоколу Ethereum, спрямованих на підвищення зручності та ефективності для всіх користувачів, мереж другого рівня (Layer 2), стейкерів і операторів вузлів.

Стейкінг було вдосконалено завдяки впровадженню накопичувальних облікових записів валідаторів (compounding validator accounts) та покращеному контролю над застейканими коштами за допомогою адреси виведення в Execution Layer (execution withdrawal address). EIP-7251 збільшив максимальний ефективний баланс для одного валідатора до 2048, покращивши ефективність капіталу для стейкерів. EIP-7002 дозволив обліковому запису виконання безпечно ініціювати дії валідатора, включно з виходом або виведенням частини коштів, покращуючи досвід для стейкерів ETH, і водночас допомагаючи посилити відповідальність операторів вузлів.

Інші частини оновлення були зосереджені на покращенні досвіду звичайних користувачів. EIP-7702 надав можливість звичайному обліковому запису без смарт-контракту ([EOA](/glossary/#eoa)) виконувати код подібно до смарт-контракту. Це відкрило необмежені нові функціональні можливості для традиційних облікових записів Ethereum, такі як пакетування транзакцій, спонсорство газу, альтернативна автентифікація, програмовані засоби контролю витрат, механізми відновлення облікових записів тощо.

<ExpandableCard title="EIP оновлення Pectra" contentPreview="Офіційні покращення в цьому оновленні.">

Покращення взаємодії з користувачами:

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7702">EIP-7702</a> - <em>Встановити код облікового запису EOA</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7691">EIP-7691</a> - <em>Збільшення пропускної здатності блобів</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7623">EIP-7623</a> - <em>Збільшити вартість calldata</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7840">EIP-7840</a> - <em>Додати розклад блобів до файлів конфігурації EL</em></li>
</ul>

Кращий досвід стейкінгу:

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7251">EIP-7251</a> - <em>Збільшити <code>MAX_EFFECTIVE_BALANCE</code></em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7002">EIP-7002</a> - <em>Виходи, що запускаються з рівня виконання</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7685">EIP-7685</a> - <em>Запити загального призначення до рівня виконання</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-6110">EIP-6110</a> - <em>Надання депозитів валідатора в ланцюжку</em></li>
</ul>

Підвищення ефективності та безпеки протоколу:

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2537">EIP-2537</a> - <em>Прекомпіляція для операцій з кривою BLS12-381</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2935">EIP-2935</a> - <em>Збереження історичних хешів блоків у стані</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7549">EIP-7549</a> - <em>Перемістити індекс комітету за межі атестації</em></li>
</ul>
</ExpandableCard>

- [Pectra.wtf](https://pectra.wtf)
- [Як Pectra покращить досвід стейкінгу](https://www.kiln.fi/post/next-ethereum-upgrade-how-pectra-will-enhance-the-staking-experience)
- [Ознайомтеся зі специфікаціями оновлення Electra](https://github.com/ethereum/consensus-specs/blob/dev/specs/electra/)
- [ЧаПи про Prague-Electra («Pectra»)](/roadmap/pectra/)

<Divider />

## 2024 {#2024}

### Канкун-Денеб ("Dencun") {#dencun}

<NetworkUpgradeSummary name="dencun" />

#### Резюме по Канкуну {#cancun-summary}

Оновлення Cancun містить набір поліпшень для _виконання_ Ethereum, спрямованих на покращення масштабованості, у тандемі з оновленнями консенсусу Deneb.

Зокрема, це включає EIP-4844, відомий як **Proto-Danksharding**, який значно знижує вартість зберігання даних для роллапів рівня 2. Це досягається завдяки впровадженню "блоків" даних, які дозволяють зведенням розміщувати дані в мережі на короткий проміжок часу. Це призводить до значно нижчих комісій за транзакції для користувачів зведень 2-го рівня.

<ExpandableCard title="EIP оновлення Cancun" contentPreview="Офіційні покращення в цьому оновленні.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-1153">EIP-1153</a> - <em>Перехідні коди пам'яті</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-4788">EIP-4788</a> - <em>Beacon block root in the EVM</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-4844">EIP-4844</a> - <em>Транзакції з осколковими блобами (Proto-Danksharding)</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-5656">EIP-5656</a> - <em><code>MCOPY</code> - Команда копіювання пам'яті</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-6780">EIP-6780</a> - <em><code>SELFDESTRUCT</code> лише в тій самій транзакції</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7516">EIP-7516</a> - <em><code>BLOBBASEFEE</code> оп код</em></li>
</ul>
</ExpandableCard>

- [Роллапи рівня 2](/layer-2/)
- [Proto-Danksharding](/roadmap/scaling/#proto-danksharding)
- [Danksharding](/roadmap/danksharding/)
- [Прочитайте специфікацію оновлення Cancun](https://github.com/ethereum/execution-specs/blob/master/network-upgrades/mainnet-upgrades/cancun.md)

#### Резюме по Deneb {#deneb-summary}

Оновлення Deneb містить набір поліпшень _консенсусу_ Ethereum, спрямованих на підвищення масштабованості. Це оновлення йде в тандемі з оновленням виконання в Cancun, яке уможливило Proto-Danksharding (EIP-4844), а також з іншими покращеннями ланцюжка Beacon Chain.

Попередньо згенеровані підписані "повідомлення про добровільний вихід" більше не мають терміну дії, що дає більше контролю користувачам, які зберігають свої кошти у стороннього оператора вузла. За допомогою цього підписаного повідомлення про вихід стейкери можуть делегувати роботу вузла, зберігаючи при цьому можливість безпечно вийти та вивести свої кошти в будь-який час, не питаючи ні в кого дозволу.

EIP-7514 посилює емісію ETH, обмежуючи швидкість "відтоку" валідаторів, які можуть приєднатися до мережі, до восьми (8) за епоху. Оскільки випуск ETH пропорційний загальній кількості застейканих ETH, обмеження кількості валідаторів, що приєднуються, обмежує _темпи зростання_ нововипущених ETH, а також зменшує вимоги до апаратного забезпечення для операторів вузлів, сприяючи децентралізації.

<ExpandableCard title="EIP оновлення Deneb" contentPreview="Офіційні покращення в цьому оновленні">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-4788">EIP-4788</a> - <em>Beacon block root in the EVM</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-4844">EIP-4844</a> - <em>Транзакції з осколковими блобами</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7044">EIP-7044</a> - <em>Безстрокові підписані добровільні виходи</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7045">EIP-7045</a> - <em>Збільшити максимальний слот для включення атестації</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7514">EIP-7514</a> - <em>Додати максимальний ліміт відтоку епохи</em></li>
</ul>
</ExpandableCard>

- [Ознайомтеся зі специфікаціями оновлення Deneb](https://github.com/ethereum/consensus-specs/blob/dev/specs/deneb/)
- [ЧаПи про Cancun-Deneb («Dencun»)](/roadmap/dencun/)

<Divider />

## 2023 {#2023}

### Шанхай-Капелла ("Shapella") {#shapella}

<NetworkUpgradeSummary name="shapella" />

#### Резюме по Шанхаю {#shanghai-summary}

Оновлення Shanghai перенесло зняття ставок на рівень виконання. У поєднанні з оновленням Capella це дозволило блокам приймати операції виведення коштів, що дозволяє стейкерам виводити свої ETH із Beacon Chain на рівень виконання.

<ExpandableCard title="EIP оновлення Shanghai" contentPreview="Офіційні покращення в цьому оновленні.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-3651">EIP-3651</a> – <em>запускає гарячу адресу <code>COINBASE</code></em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-3855">EIP-3855</a> – <em>Нова інструкція для <code>PUSH0</code></em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-3860">EIP-3860</a> – <em>Код ініціалізації ліміту та лічильника</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-4895">EIP-4895</a> – <em>Відкликання ланцюжків маяків як операції</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-6049">EIP-6049</a> - <em>Знецінити <code>САМОРУЙНУВАННЯ</code></em></li>
</ul>
</ExpandableCard>

- [Прочитайте специфікацію оновлення Shanghai](https://github.com/ethereum/execution-specs/blob/master/network-upgrades/mainnet-upgrades/shanghai.md)

#### Резюме по Капеллі {#capella-summary}

Оновлення Capella стало третім великим оновленням консенсусного рівня (Beacon Chain) і дозволило зняття ставок. Capella occurred synchronously with the execution layer upgrade, Shanghai, and enabled staking withdrawal functionality.
clear
​120 / 5 000
Результати перекладу
Результат перекладу
Capella відбулася одночасно з оновленням рівня виконання, Shanghai, і ввімкнула функцію зняття ставок.

Це оновлення консенсусного рівня дало можливість стейкерам, які не надали облікові дані для виведення коштів разом зі своїм початковим депозитом, зробити це, таким чином дозволивши зняття коштів.

Оновлення також забезпечило функцію автоматичного очищення облікового запису, яка постійно обробляє облікові записи валідатора для будь-яких доступних виплат винагород або повного зняття коштів.

- [Докладніше про виведення коштів зі стейкінгу](/staking/withdrawals/).
- [Ознайомтеся зі специфікаціями оновлення Capella](https://github.com/ethereum/consensus-specs/blob/dev/specs/capella/)

<Divider />

## 2022 {#2022}

### Париж (The Merge) {#paris}

<NetworkUpgradeSummary name="paris" />

#### Резюме {#paris-summary}

Оновлення Paris було ініційовано блокчейном proof-of-work, що пройшов [граничну загальну складність](/glossary/#terminal-total-difficulty) у 58750000000000000000000. Це сталося в блоці 15537393 15 вересня 2022 року, що призвело до оновлення Парижа наступного блоку. Оновлення Paris було переходом до [The Merge](/roadmap/merge/) — його головною особливістю було вимкнення алгоритму майнінгу [proof-of-work](/developers/docs/consensus-mechanisms/pow) і пов'язаної з ним логіки консенсусу та перехід на [proof-of-stake](/developers/docs/consensus-mechanisms/pos). Саме по собі оновлення Paris було оновленням [клієнтів виконання](/developers/docs/nodes-and-clients/#execution-clients) (еквівалентно Bellatrix на рівні консенсусу), яке дозволило їм приймати інструкції від підключених [клієнтів консенсусу](/developers/docs/nodes-and-clients/#consensus-clients). Це вимагало активації нового набору внутрішніх методів API, відомих як [Engine API](https://github.com/ethereum/execution-apis/blob/main/src/engine/common.md). Це було, мабуть, найважливіше оновлення в історії Ethereum з часів [Homestead](#homestead)!

- [Прочитайте специфікацію оновлення Paris](https://github.com/ethereum/execution-specs/blob/master/network-upgrades/mainnet-upgrades/paris.md)

<ExpandableCard title="EIP оновлення Paris" contentPreview="Офіційні покращення в цьому оновленні.">

<ul>
  <li>Обновление консенсуc до Proof-of-Stake</li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-4399">EIP-4399</a> – <em>Замініть код операції "DIFFICULTY" за допомогою "PREVRANDAO"</em></li>
</ul>
</ExpandableCard>

---

### Беллатрикс {#bellatrix}

<NetworkUpgradeSummary name="bellatrix" />

#### Резюме {#bellatrix-summary}

Оновлення Bellatrix було другим запланованим оновленням для [Beacon Chain](/roadmap/beacon-chain), яке готувало ланцюжок до [The Merge](/roadmap/merge/). Він повертає штрафи валідатора до повного значення за бездіяльність і порушення, які можна скоротити. Bellatrix також включає оновлення правил вибору виделки щоб підготувати ланцюжок до The Merge і переходу від останнього блоку proof-of-work до першого блоку proof-of-stake. Це включає інформування клієнтів консенсусу про [граничну загальну складність](/glossary/#terminal-total-difficulty) у 58750000000000000000000.

- [Ознайомтеся зі специфікацією оновлення Bellatrix](https://github.com/ethereum/consensus-specs/tree/dev/specs/bellatrix)

---

### Gray Glacier {#gray-glacier}

<NetworkUpgradeSummary name="grayGlacier" />

#### Резюме {#gray-glacier-summary}

Оновлення мережі Gray Glacier відклало [«бомбу складності»](/glossary/#difficulty-bomb) на три місяці. Це єдина зміна, запроваджена в цьому оновленні, і за своєю суттю вона подібна до оновлень [Arrow Glacier](#arrow-glacier) та [Muir Glacier](#muir-glacier). Подібні зміни було впроваджено в оновленнях мережі [Byzantium](#byzantium), [Constantinople](#constantinople) та [London](#london).

- [Блог EF — Оголошення про оновлення Gray Glacier](https://blog.ethereum.org/2022/06/16/gray-glacier-announcement/)

<ExpandableCard title="EIP оновлення Gray Glacier" contentPreview="Офіційні покращення в цьому оновленні.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-5133">EIP-5133</a> – <em>відкладає бомбу складності до вересня 2022 року</em></li>
</ul>
</ExpandableCard>

<Divider />

## 2021 {#2021}

### Arrow Glacier {#arrow-glacier}

<NetworkUpgradeSummary name="arrowGlacier" />

#### Резюме {#arrow-glacier-summary}

Оновлення мережі Arrow Glacier відклало [«бомбу складності»](/glossary/#difficulty-bomb) на кілька місяців. Це єдина зміна, запроваджена в цьому оновленні, і за своєю суттю вона подібна до оновлення [Muir Glacier](#muir-glacier). Подібні зміни було впроваджено в оновленнях мережі [Byzantium](#byzantium), [Constantinople](#constantinople) та [London](#london).

- [Блог EF — Оголошення про оновлення Arrow Glacier](https://blog.ethereum.org/2021/11/10/arrow-glacier-announcement/)
- [Ethereum Cat Herders — оновлення Ethereum Arrow Glacier](https://medium.com/ethereum-cat-herders/ethereum-arrow-glacier-upgrade-e8d20fa4c002)

<ExpandableCard title="EIP оновлення Arrow Glacier" contentPreview="Офіційні покращення в цьому оновленні.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-4345">EIP-4345</a> – <em>відкладає бомбу складності до червня 2022 року</em></li>
</ul>
</ExpandableCard>

---

### Альтаїр {#altair}

<NetworkUpgradeSummary name="altair" />

#### Резюме {#altair-summary}

Оновлення Altair було першим запланованим оновленням [Beacon Chain](/roadmap/beacon-chain). Було додано підтримку "комітетів синхронізації" — дозволяє використовувати легкі клієнти, а також збільшено штрафи за бездіяльність валідаторів і скорочення штрафних санкцій у міру наближення до The Merge.

- [Ознайомтеся зі специфікацією оновлення Altair](https://github.com/ethereum/consensus-specs/tree/dev/specs/altair)

#### <Emoji text=":tada:" size={1} className="me-2" />Цікавий факт! {#altair-fun-fact}

Altair був першим великим оновленням мережі, яке мало точний час розгортання. Кожне попереднє оновлення ґрунтувалося на оголошеному номері блоку в ланцюжку перевірки коректури, де час блокування варіюється. The Beacon Chain не вимагає рішення для розв'язання питання коректури, і замість цього працює в системі epoch, яка заснована на часі, що складається з 32 дванадцятисекундних "інтервалів", в яких валідатори можуть пропонувати блоки. Ось чому ми точно знали, коли досягнемо епохи 74 240, і Altair "ожив"!

- [Час блокування](/developers/docs/blocks/#block-time)

---

### Лондон {#london}

<NetworkUpgradeSummary name="london" />

#### Резюме {#london-summary}

Оновлення London запровадило [EIP-1559](https://eips.ethereum.org/EIPS/eip-1559), який реформував ринок комісій за транзакції, а також змінив спосіб обробки відшкодувань за газ і графік [Ice Age](/glossary/#ice-age).

#### Що таке Лондонська модернізація / EIP-1559? {#eip-1559}

Перед Оновленням Лондон, Ethereum мав блоки з фіксованими розмірами. У періоди високого навантаження на мережу ці блоки працювали на повну потужність. Як наслідок, користувачам часто доводилося чекати, поки запит зменшиться, щоб потрапити в блок, що призводило до поганого користувацького досвіду. Оновлення London ввів в Ethereum блоки змінного розміру.

Спосіб розрахунку комісій за транзакції в мережі Ethereum змінився з [оновленням London](/ethereum-forks/#london) у серпні 2021 року. До оновлення London комісії розраховувалися без поділу на `базові` та `пріоритетні` комісії, а саме:

Для прикладу Еліс повинна заплатити Бобу 1 ETH. В угоді ліміт газу становить 21 000 одиниць, а ціна газу - 200 gwei.

Загальна комісія становила б: `Одиниці газу (ліміт) * Ціна за одиницю газу`, тобто `21 000 * 200 = 4 200 000 gwei` або 0,0042 ETH

Впровадження [EIP-1559](https://eips.ethereum.org/EIPS/eip-1559) в оновленні London ускладнило механізм комісій за транзакції, але зробило комісії за газ більш передбачуваними, що призвело до створення більш ефективного ринку комісій за транзакції. Користувачі можуть надсилати транзакції з `maxFeePerGas`, що відповідає сумі, яку вони готові заплатити за виконання транзакції, знаючи, що вони не заплатять більше ринкової ціни за газ (`baseFeePerGas`), і отримають повернення будь-якої надлишкової суми за вирахуванням чайових.

[У цьому відео пояснюється EIP-1559 та його переваги: Пояснення EIP-1559](https://www.youtube.com/watch?v=MGemhK9t44Q)

- [Ви розробник dapp? Не забудьте оновити свої бібліотеки та інструменти.](https://github.com/ethereum/execution-specs/blob/master/network-upgrades/london-ecosystem-readiness.md)
- [Читайте оголошення Ethereum Foundation](https://blog.ethereum.org/2021/07/15/london-mainnet-announcement/)
- [Читайте пояснення від Ethereum Cat Herder's](https://medium.com/ethereum-cat-herders/london-upgrade-overview-8eccb0041b41)

<ExpandableCard title="EIP оновлення London" contentPreview="Офіційні покращення в цьому оновленні.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-1559">EIP-1559</a> – <em>покращує ринок комісії за транзакції</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-3198">EIP-3198</a> – <em>повертає<code>BASEFEE</code> з блоку</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-3529">EIP-3529</a> - <em>зменшує відшкодування витрат на газ для операцій EVM</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-3541">EIP-3541</a> - <em>запобігає розгортанню контрактів, починаючи з<code>0xEF</code></em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-3554">EIP-3554</a> – <em>відкладає Ice Age до грудня 2021</em></li>
</ul>
</ExpandableCard>

---

### Берлін {#berlin}

<NetworkUpgradeSummary name="berlin" />

#### Резюме {#berlin-summary}

Покращення Берліна оптимізована вартість газу за певні дії EVM і збільшує підтримку декількох типів транзакцій.

- [Читайте оголошення Ethereum Foundation](https://blog.ethereum.org/2021/03/08/ethereum-berlin-upgrade-announcement/)
- [Читайте пояснення від Ethereum Cat Herder's](https://medium.com/ethereum-cat-herders/the-berlin-upgrade-overview-2f7ad710eb80)

<ExpandableCard title="EIP оновлення Berlin" contentPreview="Офіційні покращення в цьому оновленні.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2565">EIP-2565</a> – <em>знижує вартість газу ModExp</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2718">EIP-2718</a> – <em>полегшує підтримку декількох типів транзакцій</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2929">EIP-2929</a> – <em>підвищення вартості газу для державних кодів доступу</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2930">EIP-2930</a> – <em>додає необов'язкові списки доступу</em></li>
</ul>
</ExpandableCard>

<Divider />

## 2020 {#2020}

### Генезис Beacon Chain {#beacon-chain-genesis}

<NetworkUpgradeSummary name="beaconChainGenesis" />

#### Резюме {#beacon-chain-genesis-summary}

Для безпечного запуску [Beacon Chain](/roadmap/beacon-chain/) потрібно було 16 384 депозити по 32 застейканих ETH. Це сталося 27 листопада, і Beacon Chain почав створювати блоки 1 грудня 2020 року.

[Читайте оголошення Ethereum Foundation](https://blog.ethereum.org/2020/11/27/eth2-quick-update-no-21/)

<DocLink href="/roadmap/beacon-chain/">
  Beacon Chain
</DocLink>

---

### Розгорнуто контракт на депозит для стейкінгу {#staking-deposit-contract}

<NetworkUpgradeSummary name="stakingDepositContractDeployed" />

#### Резюме {#deposit-contract-summary}

Контракт на депозит для стейкінгу впровадив [стейкінг](/glossary/#staking) в екосистему Ethereum. Хоча це контракт для [Mainnet](/glossary/#mainnet), він мав прямий вплив на графік запуску [Beacon Chain](/roadmap/beacon-chain/), важливого [оновлення Ethereum](/roadmap/).

[Читайте оголошення Ethereum Foundation](https://blog.ethereum.org/2020/11/04/eth2-quick-update-no-19/)

<DocLink href="/staking/">
  Стейкінг
</DocLink>

---

### Muir Glacier {#muir-glacier}

<NetworkUpgradeSummary name="muirGlacier" />

#### Резюме {#muir-glacier-summary}

Форк Muir Glacier запровадив затримку для [«бомби складності»](/glossary/#difficulty-bomb). Збільшення складності блоків у механізмі консенсусу [proof-of-work](/developers/docs/consensus-mechanisms/pow/) загрожувало погіршити зручність використання Ethereum через збільшення часу очікування для надсилання транзакцій і використання dapps.

- [Читайте оголошення Ethereum Foundation](https://blog.ethereum.org/2019/12/23/ethereum-muir-glacier-upgrade-announcement/)
- [Читайте пояснення від Ethereum Cat Herder's](https://medium.com/ethereum-cat-herders/ethereum-muir-glacier-upgrade-89b8cea5a210)

<ExpandableCard title="EIP оновлення Muir Glacier" contentPreview="Офіційні покращення в цьому форку.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2384">EIP-2384</a> – <em>затримує бомбу складності ще на 4 000 000 блоків, або ~611 днів.</em></li>
</ul>
</ExpandableCard>

<Divider />

## 2019 {#2019}

### Стамбул {#istanbul}

<NetworkUpgradeSummary name="istanbul" />

#### Резюме {#istanbul-summary}

The Istanbul fork:

- Оптимізовано вартість [газу](/glossary/#gas) для певних дій у [EVM](/developers/docs/ethereum-stack/#ethereum-virtual-machine).
- Improved denial-of-service attack resilience.
- Зроблено рішення для [масштабування другого рівня](/developers/docs/scaling/#layer-2-scaling) на основі SNARK та STARK більш продуктивними.
- Enabled Ethereum and Zcash to interoperate.
- Allowed contracts to introduce more creative functions.

[Читайте оголошення Ethereum Foundation](https://blog.ethereum.org/2019/11/20/ethereum-istanbul-upgrade-announcement/)

<ExpandableCard title="EIP оновлення Istanbul" contentPreview="Офіційні покращення в цьому форку.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-152">EIP-152</a> – <em>дозволити Ethereum працювати з валютами, що зберігають конфіденційність, такими як Zcash.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-1108">EIP-1108</a> – <em>дешевша криптографія для зниження вартості [газу](/glossary/#gas).</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-1344">EIP-1344</a> – <em>захищає Ethereum від атак повторного відтворення шляхом додавання [коду операції](/developers/docs/ethereum-stack/#ethereum-virtual-machine) <code>CHAINID</code>.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-1884">EIP-1884</a> – <em>оптимізація цін на газ за оп кодами на основі споживання.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2028">EIP-2028</a> – <em>зменшує вартість CallData, щоб дозволити більше даних у блоках – добре для [масштабування другого рівня](/developers/docs/scaling/#layer-2-scaling).</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2200">EIP-2200</a> - <em>інші зміни ціни на газ за опкодом.</em></li>
</ul>
</ExpandableCard>

---

### Константинополь {#constantinople}

<NetworkUpgradeSummary name="constantinople" />

#### Резюме {#constantinople-summary}

Оновлення Constantinople:

- Зменшено винагороду за [майнінг](/developers/docs/consensus-mechanisms/pow/mining/) блоків з 3 до 2 ETH.
- Гарантував, що блокчейн не «замерзне» до [впровадження proof-of-stake](#beacon-chain-genesis).
- Оптимізовано вартість [газу](/glossary/#gas) для певних дій у [EVM](/developers/docs/ethereum-stack/#ethereum-virtual-machine).
- Додано можливість взаємодіяти з адресами, які ще не було створено.

[Читайте оголошення Ethereum Foundation](https://blog.ethereum.org/2019/02/22/ethereum-constantinople-st-petersburg-upgrade-announcement/)

<ExpandableCard title="EIP оновлення Constantinople" contentPreview="Офіційні покращення в цьому форку.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-145">EIP-145</a> – <em>оптимізує вартість певних дій у ланцюжку.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-1014">EIP-1014</a> - <em>дозволяє взаємодіяти з адресами, які ще не створено.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-1052">EIP-1052</a> – <em>вводить інструкцію <code>EXTCODEHASH</code> для отримання хешу коду іншого контракту.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-1234">EIP-1234</a> - <em> гарантує, що блокчейн не&#39; зависне перед підтвердженням частки, і зменшує винагороду за блок з 3 до 2 ETH.</em></li>
</ul>
</ExpandableCard>

<Divider />

## 2017 {#2017}

### Візантія {#byzantium}

<NetworkUpgradeSummary name="byzantium" />

#### Резюме {#byzantium-summary}

Оновлення Byzantium:

- Зменшено винагороду за [майнінг](/developers/docs/consensus-mechanisms/pow/mining/) блоків з 5 до 3 ETH.
- Відкладено [«бомбу складності»](/glossary/#difficulty-bomb) на рік.
- Додано можливість здійснювати нестандартні дзвінки до інших контрактів.
- Додано певні криптографічні методи, що дозволяють [масштабування другого рівня](/developers/docs/scaling/#layer-2-scaling).

[Читайте оголошення Ethereum Foundation](https://blog.ethereum.org/2017/10/12/byzantium-hf-announcement/)

<ExpandableCard title="EIP оновлення Byzantium" contentPreview="Офіційні покращення в цьому форку.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-140">EIP-140</a> - <em>додає <code>REVERT</code> opcode.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-658">EIP-658</a> - до квитанцій транзакцій додано поле <em>статусу, яке вказує на успіх або невдачу.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-196">EIP-196</a> – <em>додає еліптичну криву та скалярне множення для реалізації [ZK-Snarks](/developers/docs/scaling/zk-rollups/).</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-197">EIP-197</a> – <em>додає еліптичну криву та скалярне множення для реалізації [ZK-Snarks](/developers/docs/scaling/zk-rollups/).</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-198">EIP-198</a> - <em>вмикає перевірку підпису RSA.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-211">EIP-211</a> - <em>додано підтримку значень, що повертаються, змінної довжини.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-214">EIP-214</a> - <em> додано опкод <code>STATICCALL</code>, який дозволяє виклики інших контрактів без зміни стану.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-100">EIP-100</a> - <em>змінює формулу регулювання складності.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-649">EIP-649</a> – <em>відкладає [«бомбу складності»](/glossary/#difficulty-bomb) на 1 рік і зменшує винагороду за блок з 5 до 3 ETH.</em></li>
</ul>
</ExpandableCard>

<Divider />

## 2016 {#2016}

### Spurious Dragon {#spurious-dragon}

<NetworkUpgradeSummary name="spuriousDragon" />

#### Резюме {#spurious-dragon-summary}

Оновлення Spurious Dragon – це друга відповідь на DoS-атаки, здійснені на мережу в період із вересня по жовтень 2016 року. Зокрема, внесено такі покращення:

- удосконалено операційні коди ціноутворення, щоб попередити майбутні атаки на мережу;
- увімкнено очищення стану блокчейну;
- Будь ласка, додайте повторення захисту від атак

[Читайте оголошення Ethereum Foundation](https://blog.ethereum.org/2016/11/18/hard-fork-no-4-spurious-dragon/)

<ExpandableCard title="EIP оновлення Spurious Dragon" contentPreview="Офіційні покращення в цьому форку.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-155">EIP-155</a> - <em>запобігає ретрансляції транзакцій з одного ланцюжка Ethereum в альтернативний ланцюжок, наприклад, відтворення транзакції testnet в основному ланцюжку Ethereum.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-160">EIP-160</a> - <em> коригує ціни опкоду <code>EXP</code> - ускладнює сповільнення мережі за рахунок обчислювально дорогих контрактних операцій.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-161">EIP-161</a> - <em>дозволяє видаляти порожні облікові записи, додані за допомогою DOS-атак.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-170">EIP-170</a> - <em>змінює максимальний розмір коду, який може мати контракт на блокчейні - до 24576 байт.</em></li>
</ul>
</ExpandableCard>

---

### Tangerine Whistle {#tangerine-whistle}

<NetworkUpgradeSummary name="tangerineWhistle" />

#### Резюме {#tangerine-whistle-summary}

Оновлення Tangerine Whistle – це перша відповідь на DoS-атаки, здійснені на мережу у період із вересня по жовтень 2016 року. Зокрема, внесено такі покрашення:

- виправлено помилки й проблеми з мережею, що потребували негайного вирішення, зокрема пов’язані із заниженими цінами в операційних кодах;

[Читайте оголошення Ethereum Foundation](https://blog.ethereum.org/2016/10/18/faq-upcoming-ethereum-hard-fork/)

<ExpandableCard title="EIP оновлення Tangerine Whistle" contentPreview="Офіційні покращення в цьому форку.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-150">EIP-150</a> - <em>збільшує витрати газу на опкоди, які можуть бути використані у спам-атаках.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-158">EIP-158</a> - <em>зменшує розмір штату, видаляючи велику кількість порожніх акаунтів, які були введені в штат за дуже низькою ціною через недоліки в попередніх версіях протоколу Ethereum.</em></li>
</ul>
</ExpandableCard>

---

### Форк DAO {#dao-fork}

<NetworkUpgradeSummary name="daoFork" />

#### Резюме {#dao-fork-summary}

Форк DAO був відповіддю на [атаку на DAO у 2016 році](https://www.coindesk.com/learn/understanding-the-dao-attack/), під час якої з незахищеного контракту [DAO](/glossary/#dao) було викрадено понад 3,6 мільйона ETH. Форк перемістив кошти з несправного контракту до [нового контракту](https://eth.blockscout.com/address/0xbf4ed7b27f1d666546e30d74d50d173d20bca754) з єдиною функцією: виведення. Усі користувачі, які втратили кошти, могли отримати 1 ETH за кожні 100 токенів DAO, що зберігалися в їхніх гаманцях.

Рішення про впровадження такого заходу було прийнято в результаті голосування, у якому взяла участь спільнота Ethereum. Будь-який власник ETH міг проголосувати за допомогою транзакції на [платформі для голосування](https://web.archive.org/web/20170620030820/http://v1.carbonvote.com/). Розгалуження підтримали понад 85 % учасників голосування.

Деякі майнери не підтримали оновлення, оскільки інцидент з організацією DAO не був результатом помилки в протоколі. Вони утворили [Ethereum Classic](https://ethereumclassic.org/).

[Читайте оголошення Ethereum Foundation](https://blog.ethereum.org/2016/07/20/hard-fork-completed/)

---

### Homestead {#homestead}

<NetworkUpgradeSummary name="homestead" />

#### Резюме {#homestead-summary}

Оновлення Homestead стало основою для майбутніх змін. У рамках цього оновлення було внесено кілька змін у протокол і одну зміну в мережу. Це дало нам змогу й надалі покращувати мережу Ethereum.

[Читайте оголошення Ethereum Foundation](https://blog.ethereum.org/2016/02/29/homestead-release/)

<ExpandableCard title="EIP оновлення Homestead" contentPreview="Офіційні покращення в цьому форку.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2">EIP-2</a> - <em>вносить правки в процес створення контракту.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7">EIP-7</a> - <em>додає новий опкод: <code>DELEGATECALL</code></em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-8">EIP-8</a> - <em>впроваджує вимоги до сумісності devp2p з прямим зв'язком</em></li>
</ul>
</ExpandableCard>

<Divider />

## 2015 {#2015}

### Відлига Frontier {#frontier-thawing}

<NetworkUpgradeSummary name="frontierThawing" />

#### Резюме {#frontier-thawing-summary}

Форк «Відлига Frontier» скасував ліміт у 5000 [газу](/glossary/#gas) на [блок](/glossary/#block) і встановив стандартну ціну на газ у 51 [gwei](/glossary/#gwei). Вартість трансакцій склала 21 000 одиниць газу. [«Бомба складності»](/glossary/#difficulty-bomb) була введена для забезпечення майбутнього хард-форку до [proof-of-stake](/glossary/#pos).

- [Читайте оголошення Ethereum Foundation](https://blog.ethereum.org/2015/08/04/the-thawing-frontier/)
- [Читайте оновлення протоколу Ethereum 1](https://blog.ethereum.org/2015/08/04/ethereum-protocol-update-1/)

---

### Frontier {#frontier}

<NetworkUpgradeSummary name="frontier" />

#### Резюме {#frontier-summary}

Етап Frontier був першим тестовим кроком до запуску проекту Ethereum. Йому передував етап успішних тестувань Olympic. Він призначався для технічних користувачів, зокрема розробників. [Блоки](/glossary/#block) мали ліміт [газу](/glossary/#gas) 5000. Цей період "відлиги" дав майнерам змогу розпочати потрібні операції, а першим користувачам – неспішно встановити клієнти.

[Читайте оголошення Ethereum Foundation](https://blog.ethereum.org/2015/07/22/frontier-is-coming-what-to-expect-and-how-to-prepare/)

<Divider />

## 2014 {#2014}

### Продаж Ether {#ether-sale}

<NetworkUpgradeSummary name="etherSale" />

Ether офіційно продавався 42 дні. Його можна було купити за BTC.

[Читайте оголошення Ethereum Foundation](https://blog.ethereum.org/2014/07/22/launching-the-ether-sale/)

---

### Випущено Yellow Paper {#yellowpaper}

<NetworkUpgradeSummary name="yellowpaperRelease" />

Специфікація "The Yellow Paper", автором якої є Др. Гевін Вуд, є технічним описом концепції Ethereum.

[Переглянути Yellow Paper](https://github.com/ethereum/yellowpaper)

<Divider />

## 2013 {#2013}

### Випущено White Paper {#whitepaper}

<NetworkUpgradeSummary name="whitepaperRelease" />

The introductory paper, published in 2013 by Vitalik Buterin, the founder of Ethereum, before the project's launch in 2015.

<DocLink href="/whitepaper/">
  White Paper
</DocLink>
