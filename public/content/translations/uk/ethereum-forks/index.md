---
title: "Хронологія всіх форків Етеріуму (з 2014 року дотепер)"
description: "Історія блокчейну Етеріум, включаючи основні етапи, релізи та форки."
lang: uk
sidebarDepth: 1
authors: ["Nixo"]
---

Хронологія всіх основних етапів, форків та оновлень блокчейну [Етеріум](/).

<ExpandableCard title="Що таке форки?" contentPreview="Зміни до правил протоколу Етеріум, які часто включають заплановані технічні оновлення.">

Форки відбуваються, коли в мережі необхідно зробити серйозні технічні оновлення або зміни — зазвичай вони випливають із [Пропозицій щодо покращення Етеріуму (EIP)](/eips/) та змінюють «правила» протоколу.

Коли оновлення потрібні в традиційному, централізовано керованому програмному забезпеченні, компанія просто випускає нову версію для кінцевого користувача. Блокчейни працюють інакше, оскільки не мають централізованого власника. [Клієнти Етеріуму](/developers/docs/nodes-and-clients/) повинні оновити своє програмне забезпечення, щоб запровадити нові правила форку. Крім того, творці блоків (майнери у світі доказу виконання роботи (PoW), валідатори у світі доказу частки (PoS)) та вузли повинні створювати блоки та перевіряти їх за новими правилами. [Детальніше про механізми консенсусу](/developers/docs/consensus-mechanisms/)

Ці зміни правил можуть створити тимчасовий розкол у мережі. Нові блоки можуть створюватися за новими або за старими правилами. Форки зазвичай узгоджуються заздалегідь, щоб клієнти приймали зміни одночасно, і форк з оновленнями ставав головним ланцюгом. Однак у рідкісних випадках розбіжності щодо форків можуть призвести до остаточного розколу мережі — найвідомішим прикладом є створення Етеріум Класик під час <a href="#dao-fork">форку DAO</a>.

</ExpandableCard>

<ExpandableCard title="Чому деякі оновлення мають кілька назв?" contentPreview="Назви оновлень формуються за шаблоном">

Програмне забезпечення, що лежить в основі Етеріуму, складається з двох частин, відомих як [рівень виконання](/glossary/#execution-layer) та [рівень консенсусу](/glossary/#consensus-layer).

**Назви оновлень рівня виконання**

З 2021 року оновлення **рівня виконання** називаються на честь міст, де [раніше проходили Devcon та Devconnect](https://devcon.org/en/past-events/), у хронологічному порядку:

| Назва оновлення | Рік Devcon(nect) | Номер Devcon | Дата оновлення |
| --------------- | ---------------- | ------------ | -------------- |
| Берлін          | 2014             | 0            | 15 квіт. 2021 р. |
| Лондон          | 2015             | I            | 5 серп. 2021 р.  |
| Шанхай          | 2016             | II           | 12 квіт. 2023 р. |
| Канкун          | 2017             | III          | 13 бер. 2024 р.  |
| Прага           | 2018             | IV           | 7 трав. 2025 р.  |
| Осака           | 2019             | V            | 3 груд. 2025 р.  |
| **Амстердам**   | 2022             | Devconnect   | Буде визначено - Наступне |
| _Богота_        | 2022             | VI           | Буде визначено |
| _Стамбул_       | 2023             | Devconnect   | Буде визначено |
| _Бангкок_       | 2024             | VII          | Буде визначено |
| _Буенос-Айрес_  | 2025             | Devconnect   | Буде визначено |
| _Мумбаї_        | 2026             | VIII         | Буде визначено |

**Назви оновлень рівня консенсусу**

З моменту запуску [сигнального ланцюга](/glossary/#beacon-chain) оновлення **рівня консенсусу** називаються на честь зірок, починаючи з літер в алфавітному порядку:

| Назва оновлення                                           | Дата оновлення |
| --------------------------------------------------------- | -------------- |
| Генезис сигнального ланцюга                               | 1 груд. 2020 р. |
| [Альтаїр](https://en.wikipedia.org/wiki/Altair)            | 27 жовт. 2021 р. |
| [Беллатрікс](https://en.wikipedia.org/wiki/Bellatrix)      | 6 вер. 2022 р.  |
| [Капелла](https://en.wikipedia.org/wiki/Capella)          | 12 квіт. 2023 р. |
| [Денеб](https://en.wikipedia.org/wiki/Deneb)              | 13 бер. 2024 р.  |
| [Електра](<https://en.wikipedia.org/wiki/Electra_(star)>) | 7 трав. 2025 р.  |
| [Фулу](<https://en.wikipedia.org/wiki/Fulu_(star)>)       | 3 груд. 2025 р.  |
| [**Глоас**](https://en.wikipedia.org/wiki/WASP-13)        | Буде визначено - Наступне |
| [_Хезе_](https://en.wikipedia.org/wiki/Zeta_Virginis)     | Буде визначено |

**Комбіновані назви**

Оновлення рівня виконання та консенсусу спочатку розгорталися в різний час, але після [Злиття](/roadmap/merge/) у 2022 році вони впроваджуються одночасно. Тому з'явилися розмовні терміни для спрощення посилань на ці оновлення за допомогою єдиного об'єднаного терміна. Це почалося з оновлення _Shanghai-Capella_, яке зазвичай називають «**Шапелла**», і продовжується в наступних оновленнях.

| Оновлення рівня виконання | Оновлення рівня консенсусу | Коротка назва |
| ------------------------- | -------------------------- | ------------- |
| Шанхай                    | Капелла                    | «Шапелла»     |
| Канкун                    | Денеб                      | «Денкун»      |
| Прага                     | Електра                    | «Пектра»      |
| Осака                     | Фулу                       | «Фусака»      |
| Амстердам                 | Глоас                      | «Гламстердам» |
| Богота                    | Хезе                       | «Хегота»      |

</ExpandableCard>

Перейдіть одразу до інформації про деякі особливо важливі минулі оновлення: [Сигнальний ланцюг](/roadmap/beacon-chain/); [Злиття](/roadmap/merge/); та [EIP-1559](#london)

Шукаєте майбутні оновлення протоколу? [Дізнайтеся про майбутні оновлення в дорожній карті Етеріуму](/roadmap/).

<Divider />

## 2025 {#2025}

### Фулу-Осака ("Фусака") {#fusaka}

<NetworkUpgradeSummary name="fusaka" />

[Більше про Фусаку](/roadmap/fusaka/)

### Прага-Електра («Пектра») {#pectra}

<NetworkUpgradeSummary name="pectra" />

Оновлення Прага-Електра («Пектра») включало кілька покращень протоколу Етеріум, спрямованих на покращення досвіду для всіх користувачів, мереж рівня 2 (l2), стейкерів та операторів вузлів.

Стейкінг отримав оновлення завдяки акаунтам валідаторів із реінвестуванням та покращеному контролю над застейканими коштами за допомогою адреси виведення рівня виконання. EIP-7251 збільшив максимальний ефективний баланс для одного валідатора до 2048, покращуючи ефективність капіталу для стейкерів. EIP-7002 дозволив акаунту виконання безпечно ініціювати дії валідатора, включаючи вихід або виведення частини коштів, що покращує досвід для стейкерів ETH, водночас допомагаючи посилити підзвітність операторів вузлів.

Інші частини оновлення були зосереджені на покращенні досвіду для звичайних користувачів. EIP-7702 надав можливість звичайному акаунту, що не є смарт-контрактом (зовнішньому акаунту (EOA)), виконувати код подібно до смарт-контракту. Це відкрило безмежні нові функціональні можливості для традиційних акаунтів Етеріуму, такі як пакетування транзакцій, спонсорування газу, альтернативна автентифікація, програмований контроль витрат, механізми відновлення акаунтів та багато іншого.

<ExpandableCard title="EIP Пектра" contentPreview="Офіційні покращення, включені в це оновлення.">

Кращий користувацький досвід:

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7702">EIP-7702</a> - <em>Встановлення коду акаунта EOA</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7691">EIP-7691</a> - <em>Збільшення пропускної здатності блобів</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7623">EIP-7623</a> - <em>Збільшення вартості даних виклику</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7840">EIP-7840</a> - <em>Додавання розкладу блобів до файлів конфігурації рівня виконання (EL)</em></li>
</ul>

Кращий досвід стейкінгу:

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7251">EIP-7251</a> - <em>Збільшення <code>MAX_EFFECTIVE_BALANCE</code></em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7002">EIP-7002</a> - <em>Виходи, що ініціюються рівнем виконання</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7685">EIP-7685</a> - <em>Запити рівня виконання загального призначення</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-6110">EIP-6110</a> - <em>Постачання депозитів валідаторів ончейн</em></li>
</ul>

Покращення ефективності та безпеки протоколу:

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2537">EIP-2537</a> - <em>Прекомпільований контракт для операцій з кривою BLS12-381</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2935">EIP-2935</a> - <em>Збереження історичних хешів блоків у стані</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7549">EIP-7549</a> - <em>Переміщення індексу комітету за межі атестації</em></li>
</ul>

</ExpandableCard>

- [Як Пектра покращить досвід стейкінгу](https://www.kiln.fi/post/next-ethereum-upgrade-how-pectra-will-enhance-the-staking-experience)
- [Читати специфікації оновлення Електра](https://github.com/ethereum/consensus-specs/tree/master/specs/electra/)
- [Поширені запитання щодо Прага-Електра («Пектра»)](/roadmap/pectra/)

<Divider />

## 2024 {#2024}

### Канкун-Денеб ("Денкун") {#dencun}

<NetworkUpgradeSummary name="dencun" />

#### Підсумок Канкун {#cancun-summary}

Оновлення Канкун містить набір покращень _виконання_ Етеріуму, спрямованих на покращення масштабованості, у тандемі з оновленнями консенсусу Денеб.

Зокрема, сюди входить EIP-4844, відомий як **прото-данкшардинг**, який значно знижує вартість зберігання даних для ролапів рівня 2 (l2). Це досягається завдяки впровадженню «блобів» даних, що дозволяє ролапам публікувати дані в Головній мережі на короткий проміжок часу. Це призводить до значно нижчих комісій за транзакції для користувачів ролапів рівня 2 (l2).

<ExpandableCard title="EIP Канкун" contentPreview="Офіційні покращення, включені в це оновлення.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-1153">EIP-1153</a> - <em>Опкоди тимчасового зберігання</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-4788">EIP-4788</a> - <em>Корінь блоку маяка в EVM</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-4844">EIP-4844</a> - <em>Транзакції з блобами шардів (прото-данкшардинг)</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-5656">EIP-5656</a> - <em><code>MCOPY</code> - Інструкція копіювання пам'яті</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-6780">EIP-6780</a> - <em><code>SELFDESTRUCT</code> лише в тій самій транзакції</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7516">EIP-7516</a> - <em>Опкод <code>BLOBBASEFEE</code></em></li>
</ul>

</ExpandableCard>

- [Ролапи рівня 2 (l2)](/layer-2/)
- [Прото-данкшардинг](/roadmap/scaling/#proto-danksharding)
- [Данкшардинг](/roadmap/danksharding/)
- [Читати специфікацію оновлення Канкун](https://github.com/ethereum/execution-specs/blob/master/network-upgrades/mainnet-upgrades/cancun.md)

#### Підсумок Денеб {#deneb-summary}

Оновлення Денеб містить набір покращень _консенсусу_ Етеріуму, спрямованих на покращення масштабованості. Це оновлення відбувається у тандемі з оновленнями виконання Канкун для впровадження прото-данкшардингу (EIP-4844), а також інших покращень сигнального ланцюга.

Попередньо згенеровані підписані «повідомлення про добровільний вихід» більше не мають терміну дії, що дає більше контролю користувачам, які здійснюють стейкінг своїх коштів через стороннього оператора вузла. Завдяки цьому підписаному повідомленню про вихід стейкери можуть делегувати роботу вузла, зберігаючи при цьому можливість безпечно здійснити вихід та виведення своїх коштів у будь-який час, не питаючи ні в кого дозволу.

EIP-7514 посилює емісію ETH, обмежуючи ліміт плинності, з яким валідатори можуть приєднуватися до мережі, до восьми (8) за епоху. Оскільки емісія ETH пропорційна загальній кількості ETH у стейкінгу, обмеження кількості валідаторів, що приєднуються, обмежує _темпи зростання_ нових випущених ETH, а також знижує вимоги до апаратного забезпечення для операторів вузлів, сприяючи децентралізації.

<ExpandableCard title="EIP Денеб" contentPreview="Офіційні покращення, включені в це оновлення">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-4788">EIP-4788</a> - <em>Корінь блоку маяка в EVM</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-4844">EIP-4844</a> - <em>Транзакції з блобами шардів</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7044">EIP-7044</a> - <em>Безстроково дійсні підписані добровільні виходи</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7045">EIP-7045</a> - <em>Збільшення максимального слота включення атестації</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7514">EIP-7514</a> - <em>Додавання максимального ліміту плинності епохи</em></li>
</ul>

</ExpandableCard>

- [Читати специфікації оновлення Денеб](https://github.com/ethereum/consensus-specs/tree/master/specs/deneb/)
- [Поширені запитання щодо Канкун-Денеб («Денкун»)](/roadmap/dencun/)

<Divider />

## 2023 {#2023}

### Шанхай-Капелла ("Шапелла") {#shapella}

<NetworkUpgradeSummary name="shapella" />

#### Підсумок оновлення Шанхай {#shanghai-summary}

Оновлення Шанхай додало можливість виведення коштів зі стейкінгу на рівень виконання. У тандемі з оновленням Капелла це дозволило блокам приймати операції виведення, що дає змогу стейкерам виводити свої ETH із сигнального ланцюга на рівень виконання.

<ExpandableCard title="EIP Шанхай" contentPreview="Офіційні покращення, включені в це оновлення.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-3651">EIP-3651</a> – <em>Запускає адресу <code>COINBASE</code> у «теплому» стані</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-3855">EIP-3855</a> – <em>Нова інструкція <code>PUSH0</code></em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-3860">EIP-3860</a> – <em>Обмеження та вимірювання initcode</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-4895">EIP-4895</a> – <em>Виведення із сигнального ланцюга як операції</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-6049">EIP-6049</a> - <em>Оголошення <code>SELFDESTRUCT</code> застарілим</em></li>
</ul>

</ExpandableCard>

- [Читати специфікацію оновлення Шанхай](https://github.com/ethereum/execution-specs/blob/master/network-upgrades/mainnet-upgrades/shanghai.md)

#### Підсумок оновлення Капелла {#capella-summary}

Оновлення Капелла стало третім великим оновленням рівня консенсусу (сигнального ланцюга) і дозволило виведення коштів зі стейкінгу. Капелла відбулася синхронно з оновленням рівня виконання, Шанхай, і активувала функціональність виведення коштів зі стейкінгу.

Це оновлення рівня консенсусу дало можливість стейкерам, які не надали облікові дані для виведення під час свого початкового депозиту, зробити це, тим самим уможлививши виведення.

Оновлення також забезпечило функцію автоматичного сканування акаунтів, яка безперервно обробляє акаунти валідаторів на наявність будь-яких доступних виплат винагород або повного виведення.

- [Більше про виведення коштів зі стейкінгу](/staking/withdrawals/).
- [Читати специфікації оновлення Капелла](https://github.com/ethereum/consensus-specs/tree/master/specs/capella/)

<Divider />

## 2022 {#2022}

### Париж (Злиття) {#paris}

<NetworkUpgradeSummary name="paris" />

#### Підсумок {#paris-summary}

Оновлення Париж було активовано, коли блокчейн на базі доказу виконання роботи (PoW) перевищив [термінальну загальну складність](/glossary/#terminal-total-difficulty) у 58750000000000000000000. Це сталося на блоці 15537393 15 вересня 2022 року, що ініціювало оновлення Париж на наступному блоці. Париж став переходом до [Злиття](/roadmap/merge/) — його головною особливістю було відключення алгоритму майнінгу [PoW](/developers/docs/consensus-mechanisms/pow) та пов'язаної з ним логіки консенсусу, і натомість увімкнення [доказу частки (PoS)](/developers/docs/consensus-mechanisms/pos). Сам Париж був оновленням [клієнтів виконання](/developers/docs/nodes-and-clients/#execution-clients) (еквівалент Беллатрикс на рівні консенсусу), яке дозволило їм отримувати інструкції від підключених до них [клієнтів консенсусу](/developers/docs/nodes-and-clients/#consensus-clients). Це вимагало активації нового набору внутрішніх методів API, спільно відомих як [Engine API](https://github.com/ethereum/execution-apis/blob/main/src/engine/common.md). Це було, мабуть, найважливіше оновлення в історії Етеріуму з часів [Гоумстед](#homestead)!

- [Читати специфікацію оновлення Париж](https://github.com/ethereum/execution-specs/blob/master/network-upgrades/mainnet-upgrades/paris.md)

<ExpandableCard title="EIP Париж" contentPreview="Офіційні покращення, включені в це оновлення.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-3675">EIP-3675</a> – <em>Оновлення консенсусу до доказу частки (PoS)</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-4399">EIP-4399</a> – <em>Заміна опкоду DIFFICULTY на PREVRANDAO</em></li>
</ul>

</ExpandableCard>

---

### Беллатрикс {#bellatrix}

<NetworkUpgradeSummary name="bellatrix" />

#### Підсумок {#bellatrix-summary}

Оновлення Беллатрикс стало другим запланованим оновленням для [сигнального ланцюга](/roadmap/beacon-chain), яке підготувало ланцюг до [Злиття](/roadmap/merge/). Воно доводить штрафи валідаторів до їхніх повних значень за неактивність та порушення, що підлягають слешингу. Беллатрикс також включає оновлення правил вибору форку, щоб підготувати ланцюг до Злиття та переходу від останнього блоку доказу виконання роботи (PoW) до першого блоку доказу частки (PoS). Це включає інформування клієнтів консенсусу про [термінальну загальну складність](/glossary/#terminal-total-difficulty) у 58750000000000000000000.

- [Читати специфікацію оновлення Беллатрикс](https://github.com/ethereum/consensus-specs/tree/master/specs/bellatrix)

---

### Грей Глейшер {#gray-glacier}

<NetworkUpgradeSummary name="grayGlacier" />

#### Підсумок {#gray-glacier-summary}

Оновлення мережі Грей Глейшер відклало [бомбу складності](/glossary/#difficulty-bomb) на три місяці. Це єдина зміна, запроваджена в цьому оновленні, і за своєю природою вона схожа на оновлення [Ерроу Глейшер](#arrow-glacier) та [М'юїр Глейшер](#muir-glacier). Подібні зміни були здійснені під час оновлень мережі [Бізантіум](#byzantium), [Константинополь](#constantinople) та [Лондон](#london).

- [Блог EF — Анонс оновлення Грей Глейшер](https://blog.ethereum.org/2022/06/16/gray-glacier-announcement)

<ExpandableCard title="EIP Грей Глейшер" contentPreview="Офіційні покращення, включені в це оновлення.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-5133">EIP-5133</a> – <em>відкладає бомбу складності до вересня 2022 року</em></li>
</ul>

</ExpandableCard>

<Divider />

## 2021 {#2021}

### Arrow Glacier {#arrow-glacier}

<NetworkUpgradeSummary name="arrowGlacier" />

#### Підсумок {#arrow-glacier-summary}

Оновлення мережі Arrow Glacier відклало [бомбу складності](/glossary/#difficulty-bomb) на кілька місяців. Це єдина зміна, запроваджена в цьому оновленні, і за своєю суттю вона схожа на оновлення [Muir Glacier](#muir-glacier). Подібні зміни були здійснені в оновленнях мережі [Бізантіум](#byzantium), [Константинополь](#constantinople) та [Лондон](#london).

- [Блог Фундації Ethereum — Анонс оновлення Arrow Glacier](https://blog.ethereum.org/2021/11/10/arrow-glacier-announcement)
- [Ethereum Cat Herders — Оновлення Етеріуму Arrow Glacier](https://medium.com/ethereum-cat-herders/ethereum-arrow-glacier-upgrade-e8d20fa4c002)

<ExpandableCard title="EIP Ероу Глейшер" contentPreview="Офіційні покращення, включені в це оновлення.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-4345">EIP-4345</a> – <em>відкладає бомбу складності до червня 2022 року</em></li>
</ul>

</ExpandableCard>

---

### Altair {#altair}

<NetworkUpgradeSummary name="altair" />

#### Підсумок {#altair-summary}

Оновлення Altair стало першим запланованим оновленням для [сигнального ланцюга](/roadmap/beacon-chain). Воно додало підтримку «комітетів синхронізації», що уможливило роботу легких клієнтів, а також збільшило штрафи за неактивність валідаторів та слешинг у міру просування розробки до Злиття.

- [Ознайомтеся зі специфікацією оновлення Altair](https://github.com/ethereum/consensus-specs/tree/master/specs/altair)

#### <Emoji text=":tada:" size={1} className="me-2" /> Цікавий факт! {#altair-fun-fact}

Altair стало першим великим оновленням мережі, яке мало точний час розгортання. Кожне попереднє оновлення базувалося на оголошеному номері блоку в ланцюзі доказу виконання роботи (PoW), де час блоку варіюється. Сигнальний ланцюг не вимагає вирішення завдань для доказу виконання роботи (PoW), а натомість працює на основі часової системи епох, що складається з 32 дванадцятисекундних «слотів» часу, протягом яких валідатори можуть пропонувати блоки. Ось чому ми точно знали, коли досягнемо епохи 74 240 і Altair запрацює!

- [Час блоку](/developers/docs/blocks/#block-time)

---

### Лондон {#london}

<NetworkUpgradeSummary name="london" />

#### Підсумок {#london-summary}

Оновлення Лондон запровадило [EIP-1559](https://eips.ethereum.org/EIPS/eip-1559), яке реформувало ринок комісій за транзакції, а також змінило спосіб обробки відшкодувань за газ та графік [Льодовикового періоду](/glossary/#ice-age).

#### Чим було оновлення Лондон / EIP-1559? {#eip-1559}

До оновлення Лондон Етеріум мав блоки фіксованого розміру. У періоди високого попиту в мережі ці блоки працювали на повну потужність. Як наслідок, користувачам часто доводилося чекати зниження попиту, щоб потрапити в блок, що призводило до погіршення користувацького досвіду. Оновлення Лондон запровадило в Етеріумі блоки змінного розміру.

Спосіб розрахунку комісій за транзакції в мережі Етеріум змінився з [оновленням Лондон](/ethereum-forks/#london) у серпні 2021 року. До оновлення Лондон комісії розраховувалися без розділення комісій `base` та `priority` наступним чином:

Припустімо, Аліса мала заплатити Бобу 1 ETH. У транзакції ліміт газу становить 21 000 одиниць, а ціна газу — 200 Gwei.

Загальна комісія становила б: `Gas units (limit) * Gas price per unit`, тобто `21,000 * 200 = 4,200,000 gwei` або 0,0042 ETH

Впровадження [EIP-1559](https://eips.ethereum.org/EIPS/eip-1559) в оновленні Лондон зробило механізм комісій за транзакції складнішим, але зробило комісії за газ більш передбачуваними, що призвело до більш ефективного ринку комісій за транзакції. Користувачі можуть надсилати транзакції з `maxFeePerGas`, що відповідає сумі, яку вони готові заплатити за виконання транзакції, знаючи, що вони не заплатять більше ринкової ціни за газ (`baseFeePerGas`), і отримають будь-який надлишок, за вирахуванням їхньої пріоритетної комісії, назад.

Це відео пояснює EIP-1559 та переваги, які воно приносить: [Пояснення EIP-1559](https://www.youtube.com/watch?v=MGemhK9t44Q)

- [Ви розробник децентралізованих застосунків (dapp)? Обов'язково оновіть свої бібліотеки та інструменти.](https://github.com/ethereum/execution-specs/blob/master/network-upgrades/london-ecosystem-readiness.md)
- [Прочитайте анонс Фундації Ethereum](https://blog.ethereum.org/2021/07/15/london-mainnet-announcement)
- [Прочитайте пояснення від Ethereum Cat Herders](https://medium.com/ethereum-cat-herders/london-upgrade-overview-8eccb0041b41)

<ExpandableCard title="EIP Лондон" contentPreview="Офіційні покращення, включені в це оновлення.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-1559">EIP-1559</a> – <em>покращує ринок комісій за транзакції</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-3198">EIP-3198</a> – <em>повертає <code>BASEFEE</code> з блоку</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-3529">EIP-3529</a> - <em>зменшує відшкодування газу за операції EVM</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-3541">EIP-3541</a> - <em>запобігає розгортанню контрактів, що починаються з <code>0xEF</code></em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-3554">EIP-3554</a> – <em>відкладає Льодовиковий період до грудня 2021 року</em></li>
</ul>

</ExpandableCard>

---

### Берлін {#berlin}

<NetworkUpgradeSummary name="berlin" />

#### Підсумок {#berlin-summary}

Оновлення Берлін оптимізувало вартість газу для певних дій EVM та розширило підтримку кількох типів транзакцій.

- [Прочитайте анонс Фундації Ethereum](https://blog.ethereum.org/2021/03/08/ethereum-berlin-upgrade-announcement)
- [Прочитайте пояснення від Ethereum Cat Herders](https://medium.com/ethereum-cat-herders/the-berlin-upgrade-overview-2f7ad710eb80)

<ExpandableCard title="EIP Берлін" contentPreview="Офіційні покращення, включені в це оновлення.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2565">EIP-2565</a> – <em>знижує вартість газу для MODEXP</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2718">EIP-2718</a> – <em>забезпечує простішу підтримку кількох типів транзакцій</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2929">EIP-2929</a> – <em>збільшує вартість газу для опкодів доступу до стану</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2930">EIP-2930</a> – <em>додає необов'язкові списки доступу</em></li>
</ul>

</ExpandableCard>

<Divider />

## 2020 {#2020}

### Генезис сигнального ланцюга {#beacon-chain-genesis}

<NetworkUpgradeSummary name="beaconChainGenesis" />

#### Підсумок {#beacon-chain-genesis-summary}

Для безпечного запуску [сигнальний ланцюг](/roadmap/beacon-chain/) потребував 16384 депозитів по 32 застейканих ETH. Це сталося 27 листопада, і сигнальний ланцюг почав створювати блоки 1 грудня 2020 року.

[Читати анонс Фундації Ethereum](https://blog.ethereum.org/2020/11/27/eth2-quick-update-no-21)

<DocLink href="/roadmap/beacon-chain/">
  Сигнальний ланцюг
</DocLink>

---

### Контракт стейкінгового депозиту розгорнуто {#staking-deposit-contract}

<NetworkUpgradeSummary name="stakingDepositContractDeployed" />

#### Підсумок {#deposit-contract-summary}

Контракт стейкінгового депозиту запровадив [стейкінг](/glossary/#staking) в екосистемі Етеріуму. Хоча це контракт [Головної мережі](/glossary/#mainnet), він мав безпосередній вплив на терміни запуску [сигнального ланцюга](/roadmap/beacon-chain/) — важливого [оновлення Етеріуму](/roadmap/).

[Читати анонс Фундації Ethereum](https://blog.ethereum.org/2020/11/04/eth2-quick-update-no-19)

<DocLink href="/staking/">
  Стейкінг
</DocLink>

---

### М'юїр Глейшер {#muir-glacier}

<NetworkUpgradeSummary name="muirGlacier" />

#### Підсумок {#muir-glacier-summary}

Форк М'юїр Глейшер відклав [бомбу складності](/glossary/#difficulty-bomb). Зростання складності блоків механізму консенсусу [доказ виконання роботи (PoW)](/developers/docs/consensus-mechanisms/pow/) загрожувало погіршити зручність використання Етеріуму через збільшення часу очікування на надсилання транзакцій та використання децентралізованих застосунків (dapps).

- [Читати анонс Фундації Ethereum](https://blog.ethereum.org/2019/12/23/ethereum-muir-glacier-upgrade-announcement)
- [Читати пояснення від Ethereum Cat Herders](https://medium.com/ethereum-cat-herders/ethereum-muir-glacier-upgrade-89b8cea5a210)

<ExpandableCard title="EIP М'юїр Глейшер" contentPreview="Офіційні покращення, включені в цей форк.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2384">EIP-2384</a> – <em>відкладає бомбу складності ще на 4 000 000 блоків, або приблизно на 611 днів.</em></li>
</ul>

</ExpandableCard>

<Divider />

## 2019 {#2019}

### Стамбул {#istanbul}

<NetworkUpgradeSummary name="istanbul" />

#### Підсумок {#istanbul-summary}

Форк Стамбул:

- Оптимізував вартість [газу](/glossary/#gas) для певних дій у [EVM](/developers/docs/ethereum-stack/#ethereum-virtual-machine).
- Покращив стійкість до атак типу «відмова в обслуговуванні» (DoS).
- Зробив рішення для [масштабування рівня 2](/developers/docs/scaling/#layer-2-scaling) на базі SNARK та STARK більш продуктивними.
- Дозволив Етеріуму та Zcash взаємодіяти між собою.
- Дозволив контрактам запроваджувати більш креативні функції.

[Прочитати анонс Фундації Ethereum](https://blog.ethereum.org/2019/11/20/ethereum-istanbul-upgrade-announcement)

<ExpandableCard title="EIP Стамбул" contentPreview="Офіційні покращення, включені в цей форк.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-152">EIP-152</a> – <em>дозволяє Етеріуму працювати з валютами, що зберігають приватність, такими як Zcash.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-1108">EIP-1108</a> – <em>дешевша криптографія для покращення витрат [газу](/glossary/#gas).</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-1344">EIP-1344</a> – <em>захищає Етеріум від атак повторного відтворення шляхом додавання [опкоду](/developers/docs/ethereum-stack/#ethereum-virtual-machine) <code>CHAINID</code>.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-1884">EIP-1884</a> – <em>оптимізація цін на газ для опкодів на основі споживання.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2028">EIP-2028</a> – <em>знижує вартість даних виклику (CallData), щоб дозволити більше даних у блоках — корисно для [масштабування рівня 2](/developers/docs/scaling/#layer-2-scaling).</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2200">EIP-2200</a> – <em>інші зміни цін на газ для опкодів.</em></li>
</ul>

</ExpandableCard>

---

### Константинополь {#constantinople}

<NetworkUpgradeSummary name="constantinople" />

#### Підсумок {#constantinople-summary}

Форк Константинополь:

- Зменшив винагороду за [майнінг](/developers/docs/consensus-mechanisms/pow/mining/) блоку з 3 до 2 ETH.
- Забезпечив, щоб блокчейн не заморозився до [впровадження доказу частки (PoS)](#beacon-chain-genesis).
- Оптимізував вартість [газу](/glossary/#gas) для певних дій у [EVM](/developers/docs/ethereum-stack/#ethereum-virtual-machine).
- Додав можливість взаємодіяти з адресами, які ще не були створені.

[Прочитати анонс Фундації Ethereum](https://blog.ethereum.org/2019/02/22/ethereum-constantinople-st-petersburg-upgrade-announcement)

<ExpandableCard title="EIP Константинополь" contentPreview="Офіційні покращення, включені в цей форк.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-145">EIP-145</a> – <em>оптимізує вартість певних ончейн-дій.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-1014">EIP-1014</a> – <em>дозволяє взаємодіяти з адресами, які ще не створені.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-1052">EIP-1052</a> – <em>запроваджує інструкцію <code>EXTCODEHASH</code> для отримання хешу коду іншого контракту.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-1234">EIP-1234</a> – <em>гарантує, що блокчейн не заморозиться до впровадження доказу частки (PoS), і зменшує винагороду за блок з 3 до 2 ETH.</em></li>
</ul>

</ExpandableCard>

<Divider />

## 2017 {#2017}

### Бізантіум {#byzantium}

<NetworkUpgradeSummary name="byzantium" />

#### Огляд {#byzantium-summary}

Форк Візантіум:

- Зменшив винагороду за [майнінг](/developers/docs/consensus-mechanisms/pow/mining/) блоку з 5 до 3 ETH.
- Відклав [бомбу складності](/glossary/#difficulty-bomb) на рік.
- Додав можливість здійснювати виклики до інших контрактів без зміни стану.
- Додав певні криптографічні методи для забезпечення [масштабування рівня 2](/developers/docs/scaling/#layer-2-scaling).

[Читати анонс Фундації Ethereum](https://blog.ethereum.org/2017/10/12/byzantium-hf-announcement)

<ExpandableCard title="EIP Бізантіум" contentPreview="Офіційні покращення, включені в цей форк.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-140">EIP-140</a> – <em>додає опкод <code>REVERT</code>.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-658">EIP-658</a> – <em>до квитанцій транзакцій додано поле статусу для вказівки на успіх або невдачу.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-196">EIP-196</a> – <em>додає еліптичну криву та скалярне множення для забезпечення [ZK-Snarks](/developers/docs/scaling/zk-rollups/).</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-197">EIP-197</a> – <em>додає еліптичну криву та скалярне множення для забезпечення [ZK-Snarks](/developers/docs/scaling/zk-rollups/).</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-198">EIP-198</a> – <em>дозволяє перевірку підпису RSA.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-211">EIP-211</a> – <em>додає підтримку значень повернення змінної довжини.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-214">EIP-214</a> – <em>додає опкод <code>STATICCALL</code>, що дозволяє здійснювати виклики до інших контрактів без зміни стану.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-100">EIP-100</a> – <em>змінює формулу коригування складності.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-649">EIP-649</a> – <em>відкладає [бомбу складності](/glossary/#difficulty-bomb) на 1 рік і зменшує винагороду за блок з 5 до 3 ETH.</em></li>
</ul>

</ExpandableCard>

<Divider />

## 2016 {#2016}

### Сп'юріус Драгон {#spurious-dragon}

<NetworkUpgradeSummary name="spuriousDragon" />

#### Підсумок {#spurious-dragon-summary}

Форк Сп'юріус Драгон став другою відповіддю на атаки типу «відмова в обслуговуванні» (DoS) на мережу (вересень/жовтень 2016 року), що включало:

- коригування ціноутворення опкодів для запобігання майбутнім атакам на мережу.
- уможливлення «очищення» стану блокчейну.
- додавання захисту від атак повторного відтворення.

[Прочитати анонс Фундації Ethereum](https://blog.ethereum.org/2016/11/18/hard-fork-no-4-spurious-dragon)

<ExpandableCard title="EIP Сп'юріес Дрегон" contentPreview="Офіційні покращення, включені в цей форк.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-155">EIP-155</a> – <em>запобігає повторній трансляції транзакцій з одного ланцюга Етеріуму в альтернативному ланцюзі, наприклад, повторному відтворенню транзакції з тестової мережі в головному ланцюзі Етеріуму.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-160">EIP-160</a> – <em>коригує ціни на опкод <code>EXP</code>, що ускладнює уповільнення роботи мережі за допомогою обчислювально складних операцій контракту.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-161">EIP-161</a> – <em>дозволяє видаляти порожні акаунти, додані під час DoS-атак.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-170">EIP-170</a> – <em>змінює максимальний розмір коду, який може мати контракт у блокчейні, до 24576 байтів.</em></li>
</ul>

</ExpandableCard>

---

### Танджерин Вістл {#tangerine-whistle}

<NetworkUpgradeSummary name="tangerineWhistle" />

#### Підсумок {#tangerine-whistle-summary}

Форк Танджерин Вістл став першою відповіддю на атаки типу «відмова в обслуговуванні» (DoS) на мережу (вересень/жовтень 2016 року), що включало:

- вирішення нагальних проблем зі станом мережі, пов'язаних із заниженою вартістю опкодів.

[Прочитати анонс Фундації Ethereum](https://blog.ethereum.org/2016/10/18/faq-upcoming-ethereum-hard-fork)

<ExpandableCard title="EIP Танджерин Вістл" contentPreview="Офіційні покращення, включені в цей форк.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-150">EIP-150</a> – <em>збільшує вартість газу для опкодів, які можуть бути використані в спам-атаках.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-158">EIP-158</a> – <em>зменшує розмір стану шляхом видалення великої кількості порожніх акаунтів, які були додані до стану за дуже низькою ціною через недоліки в попередніх версіях протоколу Етеріуму.</em></li>
</ul>

</ExpandableCard>

---

### Форк DAO {#dao-fork}

<NetworkUpgradeSummary name="daoFork" />

#### Підсумок {#dao-fork-summary}

Форк DAO став відповіддю на [атаку на DAO у 2016 році](https://www.coindesk.com/learn/understanding-the-dao-attack/), під час якої через злам із незахищеного контракту [DAO](/glossary/#dao) було виведено понад 3,6 мільйона ETH. Форк перемістив кошти з несправного контракту в [новий контракт](https://eth.blockscout.com/address/0xbf4ed7b27f1d666546e30d74d50d173d20bca754) з єдиною функцією: виведення (withdraw). Кожен, хто втратив кошти, міг вивести 1 ETH за кожні 100 токенів DAO у своєму гаманці.

За цей план дій проголосувала спільнота Етеріуму. Будь-який власник ETH міг проголосувати за допомогою транзакції на [платформі для голосування](https://web.archive.org/web/20170620030820/http://v1.carbonvote.com/). Рішення про форк набрало понад 85% голосів.

Деякі майнери відмовилися від форку, оскільки інцидент із DAO не був дефектом протоколу. Згодом вони утворили [Етеріум Класик](https://ethereumclassic.org/).

[Прочитати анонс Фундації Ethereum](https://blog.ethereum.org/2016/07/20/hard-fork-completed)

---

### Гоумстед {#homestead}

<NetworkUpgradeSummary name="homestead" />

#### Підсумок {#homestead-summary}

Форк Гоумстед був спрямований у майбутнє. Він включав кілька змін у протоколі та зміну в мережі, що дало Етеріуму можливість здійснювати подальші оновлення мережі.

[Прочитати анонс Фундації Ethereum](https://blog.ethereum.org/2016/02/29/homestead-release)

<ExpandableCard title="EIP Гоумстед" contentPreview="Офіційні покращення, включені в цей форк.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2">EIP-2</a> – <em>вносить зміни до процесу створення контракту.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7">EIP-7</a> – <em>додає новий опкод: <code>DELEGATECALL</code></em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-8">EIP-8</a> – <em>запроваджує вимоги до прямої сумісності devp2p</em></li>
</ul>

</ExpandableCard>

<Divider />

## 2015 {#2015}

### Відлига Фронтіру {#frontier-thawing}

<NetworkUpgradeSummary name="frontierThawing" />

#### Підсумок {#frontier-thawing-summary}

Форк відлиги Фронтіру скасував ліміт у 5000 [газу](/glossary/#gas) на [блок](/glossary/#block) та встановив типову ціну газу на рівні 51 [Gwei](/glossary/#gwei). Це уможливило транзакції — для транзакцій потрібно 21 000 газу. Було запроваджено [бомбу складності](/glossary/#difficulty-bomb), щоб гарантувати майбутній хардфорк до [доказу частки (PoS)](/glossary/#pos).

- [Прочитати анонс Фундації Ethereum](https://blog.ethereum.org/2015/08/04/the-thawing-frontier)
- [Прочитати Оновлення протоколу Ethereum 1](https://blog.ethereum.org/2015/08/04/ethereum-protocol-update-1)

---

### Фронтір {#frontier}

<NetworkUpgradeSummary name="frontier" />

#### Підсумок {#frontier-summary}

Фронтір був робочою, але базовою реалізацією проєкту Етеріум. Він відбувся після успішної фази тестування Olympic. Він призначався для технічних користувачів, зокрема розробників. [Блоки](/glossary/#block) мали ліміт [газу](/glossary/#gas) 5000. Цей період «відлиги» дозволив майнерам розпочати свою роботу, а першим користувачам — встановити свої клієнти без необхідності «поспішати».

[Прочитати анонс Фундації Ethereum](https://blog.ethereum.org/2015/07/22/frontier-is-coming-what-to-expect-and-how-to-prepare)

<Divider />

## 2014 {#2014}

### Продаж етеру {#ether-sale}

<NetworkUpgradeSummary name="etherSale" />

Етер офіційно надійшов у продаж на 42 дні. Його можна було придбати за BTC.

[Читати анонс Фундації Ethereum](https://blog.ethereum.org/2014/07/22/launching-the-ether-sale)

---

### Випуск Жовтої книги {#yellowpaper}

<NetworkUpgradeSummary name="yellowpaperRelease" />

Жовта книга, автором якої є доктор Гевін Вуд, — це технічне визначення протоколу Етеріум.

[Переглянути Жовту книгу](https://github.com/ethereum/yellowpaper)

<Divider />

## 2013 {#2013}

### Випуск білої книги {#whitepaper}

<NetworkUpgradeSummary name="whitepaperRelease" />

Вступний документ, опублікований у 2013 році Віталіком Бутеріним, засновником Етеріуму, до запуску проєкту у 2015 році.

<DocLink href="/whitepaper/">
  Біла книга
</DocLink>
