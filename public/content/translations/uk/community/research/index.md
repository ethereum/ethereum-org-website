---
title: Активні області дослідження в Ethereum
description: Досліджуйте різні області відкритого дослідження та дізнайтеся, як прийняти участь.
lang: uk
---

# Активні напрямки досліджень Ethereum {#active-areas-of-ethereum-research}

Однією з основних переваг Ethereum є те, що активна дослідницька та інженерна спільнота постійно вдосконалює його. Багато ентузіастів та кваліфікованих фахівців по всьому світу хотіли б займатися невирішеними питаннями в Ethereum, але не завжди легко дізнатися, які саме ці питання. Ця сторінка надає загальний огляд ключових активних областей досліджень як орієнтир до передового рівня Ethereum.

## Як працюють дослідження Ethereum {#how-ethereum-research-works}

Дослідження Ethereum є відкритими та прозорими, вони втілюють принципи [децентралізованої науки (DeSci)](https://hackernoon.com/desci-decentralized-science-as-our-chance-to-recover-the-real-science). Культура полягає в тому, щоб робити дослідницькі інструменти та результати як можна більш відкритими та взаємодійними, наприклад, за допомогою виконуваних нотаток. Дослідження Ethereum розвиваються швидко, нові результати публікуються та обговорюються відкрито на таких форумах, як [ethresear.ch](https://ethresear.ch/), а не потрапляють до спільноти через традиційні публікації після кількох раундів експертної оцінки.

## Загальні дослідницькі ресурси {#general-research-resources}

Незалежно від конкретної теми, на [ethresear.ch](https://ethresear.ch) та в [каналі Eth R&D у Discord](https://discord.gg/qGpsxSA) можна знайти безліч інформації про дослідження Ethereum. Ось основні місця, де дослідники Ethereum обговорюють найновіші ідеї та можливості розвитку.

Цей звіт, опублікований у травні 2022 року [DelphiDigital](https://members.delphidigital.io/reports/the-hitchhikers-guide-to-ethereum), надає хороший огляд плану розвитку Ethereum.

## Джерела фінансування {#sources-of-funding}

Ви можете приєднатися до дослідницької спільноти Ethereum і отримувати за це оплату! Наприклад, [Ethereum Foundation](/foundation/) нещодавно провів раунд фінансування [академічних грантів](https://esp.ethereum.foundation/academic-grants). Ви можете знайти інформацію про активні та майбутні можливості фінансування на [сторінці грантів Ethereum](/community/grants/).

## Дослідження протоколу {#protocol-research}

Протокольне дослідження стосується базового рівня Ethereum - набору правил, що визначають, як вузли підключаються, спілкуються, обмінюються та зберігають дані Ethereum, а також досягають згоди щодо стану блокчейну. Протокольне дослідження поділяється на дві основні категорії: консенсус і виконання.

### Консенсус {#consensus}

Дослідження консенсусу стосуються [механізму підтвердження частки володіння (proof-of-stake) Ethereum](/developers/docs/consensus-mechanisms/pos/). Деякі приклади тем дослідження консенсусу включають:

- виявлення та усунення вразливостей;
- кількісна оцінка криптоекономічної безпеки;
- підвищення безпеки або продуктивності реалізацій клієнтів;
- та розробка легких клієнтів.

Поміж перспективними дослідженнями також вивчаються фундаментальні переосмислення протоколу, такі як однослотова завершеність, які дозволять здійснити значні покращення в Ethereum. Крім того, ефективність, безпека та моніторинг мережі між клієнтами консенсусу є також важливими темами дослідження.

#### Додаткові матеріали {#background-reading}

- [Вступ до механізму підтвердження частки володіння (proof-of-stake)](/developers/docs/consensus-mechanisms/pos/)
- [Документ Casper-FFG](https://arxiv.org/abs/1710.09437)
- [Пояснення Casper-FFG](https://medium.com/unitychain/intro-to-casper-ffg-9ed944d98b2d)
- [Документ Gasper](https://arxiv.org/abs/2003.03052)

#### Останні дослідження {#recent-research}

- [Консенсус на Ethresear.ch](https://ethresear.ch/c/consensus/29)
- [Дилема доступності/завершеності](https://arxiv.org/abs/2009.04987)
- [Завершеність в одному слоті](https://ethresear.ch/t/a-model-for-cumulative-committee-based-finality/10259)
- [Розділення того, хто пропонує, і того, хто будує](https://notes.ethereum.org/@vbuterin/pbs_censorship_resistance)

### Виконання {#execution}

Рівень виконання відповідає за виконання транзакцій, роботу [віртуальної машини Ethereum (EVM)](/developers/docs/evm/) і створення корисних даних для виконання, які передаються на рівень консенсусу. Існує багато активних напрямків досліджень, включаючи:

- до активних напрямків досліджень входять;
- дослідження обмежень на газ;
- і включення нових структур даних (наприклад, дерева Веркла).

#### Додаткові матеріали {#background-reading-1}

- [Вступ до EVM](/developers/docs/evm)
- [Рівень виконання на Ethresear.ch](https://ethresear.ch/c/execution-layer-research/37)

#### Останні дослідження {#recent-research-1}

- [Оптимізація бази даних](https://github.com/ledgerwatch/erigon/blob/devel/docs/programmers_guide/db_faq.md)
- [Закінчення терміну дії стану](https://notes.ethereum.org/@vbuterin/state_expiry_eip)
- [Шляхи до закінчення терміну дії стану](https://hackmd.io/@vbuterin/state_expiry_paths)
- [Пропозиція щодо дерев Веркла та закінчення терміну дії стану](https://notes.ethereum.org/@vbuterin/verkle_and_state_expiry_proposal)
- [Керування історією](https://eips.ethereum.org/EIPS/eip-4444)
- [Дерева Веркла](https://vitalik.eth.limo/general/2021/06/18/verkle.html)
- [Вибірка доступності даних](https://github.com/ethereum/research/wiki/A-note-on-data-availability-and-erasure-coding)

## Розробка клієнта {#client-development}

Клієнти Ethereum - це реалізації протоколу Ethereum. Розробка клієнтів перетворює результати дослідження протоколу в реальність, вбудовуючи їх у ці клієнтів. Розробка клієнтів включає оновлення специфікацій клієнта, а також створення конкретних реалізацій.

Для роботи вузла Ethereum потрібно запустити дві програми:

1. клієнт консенсусу для відстежування головного блоку блокчейну, передачі блоків через мережу та обробки логіки консенсусу
2. виконавчий клієнт для підтримки Віртуальної машини Ethereum та виконання транзакцій та смарт-контрактів

Для отримання докладнішої інформації про вузли та клієнтів, а також для перегляду списку всіх поточних реалізацій клієнтів, перегляньте [сторінку «Вузли та клієнти»](/developers/docs/nodes-and-clients/). Ви також можете знайти історію всіх оновлень Ethereum на [сторінці історії](/ethereum-forks/).

### Клієнти виконання {#execution-clients}

- [Специфікація клієнта виконання](https://github.com/ethereum/execution-specs)
- [Специфікація API виконання](https://github.com/ethereum/execution-apis)

### Клієнти консенсусу {#consensus-clients}

- [Специфікація клієнта консенсусу](https://github.com/ethereum/consensus-specs)
- [Специфікація API ланцюга Beacon](https://ethereum.github.io/beacon-APIs/#/Beacon/getStateRoot)

## Масштабування та продуктивність {#scaling-and-performance}

Масштабування Ethereum - це великий напрям досліджень для вчених Ethereum. Поточні підходи включають перенесення транзакцій на rollups та зменшення їх вартості за допомогою data blobs. Вступна інформація про масштабування Ethereum доступна на нашій [сторінці масштабування](/developers/docs/scaling).

### Рівень 2 {#layer-2}

Зараз існують кілька протоколів другого рівня (Layer 2), які масштабують Ethereum за допомогою різних технік пакетування транзакцій та їх захисту на рівні 1 Ethereum. Це дуже швидко розвиваюча тема з великим потенціалом досліджень та розвитку.

#### Додаткові матеріали {#background-reading-2}

- [Вступ до рівня 2](/layer-2/)
- [Polynya: ролапи, доступність даних і модульні ланцюги](https://polynya.medium.com/rollups-data-availability-layers-modular-blockchains-introductory-meta-post-5a1e7a60119d)

#### Останні дослідження {#recent-research-2}

- [Справедливе впорядкування Arbitrum для секвенсорів](https://eprint.iacr.org/2021/1465)
- [Рівень 2 на Ethresear.ch](https://ethresear.ch/c/layer-2/32)
- [План розвитку, орієнтований на ролапи](https://ethereum-magicians.org/t/a-rollup-centric-ethereum-roadmap/4698)
- [L2Beat](https://l2beat.com/)

### Мости {#bridges}

Одна конкретна сфера другого рівня, яка потребує більше досліджень та розробки, це безпечні та продуктивні мости. Це включає мости між різними другими рівнями і мости між першим і другим рівнем. Це особливо важлива область дослідження, оскільки мости часто стають об'єктом атак хакерів.

#### Додаткові матеріали {#background-reading-3}

- [Вступ до блокчейн-мостів](/bridges/)
- [Віталік про мости](https://old.reddit.com/r/ethereum/comments/rwojtk/ama_we_are_the_efs_research_team_pt_7_07_january/hrngyk8/)
- [Стаття про блокчейн-мости](https://medium.com/1kxnetwork/blockchain-bridges-5db6afac44f8)
- [Вартість, заблокована в мостах](https://dune.com/eliasimos/Bridge-Away-\(from-Ethereum\))

#### Останні дослідження {#recent-research-3}

- [Валідація мостів](https://stonecoldpat.github.io/images/validatingbridges.pdf)

### Шардинг {#sharding}

Фрагментація блокчейну Ethereum давно є частиною плану розвитку. Проте, нові рішення для масштабування, такі як "Danksharding", наразі займають головну сцену.

Попередник повного Danksharding, відомий як Proto-Danksharding, запрацював з оновленням мережі Cancun-Deneb («Dencun»).

[Більше про оновлення Dencun](/roadmap/dencun/)

#### Додаткові матеріали {#background-reading-4}

- [Нотатки про Proto-Danksharding](https://notes.ethereum.org/@vbuterin/proto_danksharding_faq)
- [Відео про Danksharding від Bankless](https://www.youtube.com/watch?v=N5p0TB77flM)
- [Компендіум досліджень шардингу Ethereum](https://notes.ethereum.org/@serenity/H1PGqDhpm?type=view)
- [Danksharding (Polynya)](https://polynya.medium.com/danksharding-36dc0c8067fe)

#### Останні дослідження {#recent-research-4}

- [EIP-4844: Proto-Danksharding](https://eips.ethereum.org/EIPS/eip-4844)
- [Віталік про шардинг і вибірку доступності даних](https://hackmd.io/@vbuterin/sharding_proposal)

### Апаратне забезпечення {#hardware}

[Запуск вузлів](/developers/docs/nodes-and-clients/run-a-node/) на невимогливому апаратному забезпеченні є фундаментальним для підтримки децентралізації Ethereum. Отже, активне дослідження для зменшення вимог до апаратного забезпечення для запуску вузлів є важливою областю дослідження.

#### Додаткові матеріали {#background-reading-5}

- [Ethereum на ARM](https://ethereum-on-arm-documentation.readthedocs.io/en/latest/)

#### Останні дослідження {#recent-research-5}

- [ecdsa на FPGA](https://ethresear.ch/t/does-ecdsa-on-fpga-solve-the-scaling-problem/6738)

## Безпека {#security}

Безпека - широка тема, яка може включати запобігання спаму/шахрайству, безпеку гаманців, апаратну безпеку, крипто економічну безпеку, пошук помилок і тестування програм та клієнтського програмного забезпечення, а також управління ключами. Внесок у знання в цих областях допоможе стимулювати широке прийняття технологій.

### Криптографія та ZKP {#cryptography--zkp}

Докази нуль-знання (ZKP) та криптографія є ключовими для забезпечення приватності та безпеки в Ethereum та його додатках. Докази нуль-знання - це відносно молода, але швидкозмінна сфера з багатьма відкритими можливостями для дослідження та розробки. Деякі можливості включають розробку ефективніших реалізацій [алгоритму хешування Keccak](https://hackmd.io/sK7v0lr8Txi1bgION1rRpw?view#Overview), пошук кращих поліноміальних зобов’язань, ніж існують зараз, або зниження вартості генерації відкритих ключів ecdsa та схем перевірки підписів.

#### Додаткові матеріали {#background-reading-6}

- [Блог 0xparc](https://0xparc.org/blog)
- [zkp.science](https://zkp.science/)
- [Подкаст Zero Knowledge](https://zeroknowledge.fm/)

#### Останні дослідження {#recent-research-6}

- [Останні досягнення в криптографії на еліптичних кривих](https://ethresear.ch/t/the-ec-fft-algorithm-without-elliptic-curve-and-isogenies/11346)
- [ZK на Ethresear.ch](https://ethresear.ch/c/zk-s-nt-arks/13)

### Гаманці {#wallets}

Гаманці Ethereum можуть бути розширеннями для браузера, програмами для робочого столу та мобільними додатками або смарт-контрактами на Ethereum. Ведеться активне дослідження соціальних гаманців з можливістю відновлення, що зменшують деякий ризик, пов'язаний з управлінням ключами окремих користувачів. Разом із розвитком гаманців ведуться дослідження альтернативних форм абстракції облікових записів, що є важливою областю піонерських досліджень.

#### Додаткові матеріали {#background-reading-7}

- [Вступ до гаманців](/wallets/)
- [Вступ до безпеки гаманців](/security/)
- [Безпека на Ethresear.ch](https://ethresear.ch/tag/security)
- [EIP-2938: абстракція облікового запису](https://eips.ethereum.org/EIPS/eip-2938)
- [EIP-4337: абстракція облікового запису](https://eips.ethereum.org/EIPS/eip-4337)

#### Останні дослідження {#recent-research-7}

- [Гаманці зі смарт-контрактами, орієнтовані на валідацію](https://ethereum-magicians.org/t/validation-focused-smart-contract-wallets/6603)
- [Майбутнє облікових записів](https://ethereum-magicians.org/t/validation-focused-smart-contract-wallets/6603)
- [EIP-3074: коди операцій AUTH та AUTHCALL](https://eips.ethereum.org/EIPS/eip-3074)
- [Публікація коду на адресу EOA](https://eips.ethereum.org/EIPS/eip-5003)

## Спільнота, освіта та популяризація {#community-education-and-outreach}

Підключення нових користувачів до Ethereum потребує нових освітніх ресурсів та підходів до комунікації. Це можуть бути публікації в блогах і статті, книги, подкасти, меми, навчальні ресурси, заходи та будь-що інше, що створює спільноти, вітає новачків та навчає людей про Ethereum.

### UX/UI {#uxui}

Для підключення більше людей до Ethereum екосистема повинна покращити користувацький досвід та інтерфейс. Це вимагатиме від дизайнерів та експертів з продукту перевірки дизайну гаманців та додатків.

#### Додаткові матеріали {#background-reading-8}

- [UX/UI на Ethresear.ch](https://ethresear.ch/c/ui-ux/24)

#### Останні дослідження {#recent-research-8}

- [Discord для дизайну Web3](https://discord.gg/FsCFPMTSm9)
- [Принципи дизайну Web3](https://www.web3designprinciples.com/)
- [Обговорення UX на Ethereum Magicians](https://ethereum-magicians.org/t/og-council-ux-follow-up/9032/3)

### Економіка {#economics}

Економічні дослідження в Ethereum взагалі дотримуються двох підходів: перевірка безпеки механізмів, що ґрунтуються на економічних стимулах ("мікроекономіка") та аналіз потоків цінності між протоколами, додатками та користувачами ("макроекономіка"). Існують складні криптоекономічні фактори, пов'язані з основним активом Ethereum (етером) та токенами, побудованими на його основі (наприклад, NFT та токени ERC20).

#### Додаткові матеріали {#background-reading-9}

- [Robust Incentives Group](https://rig.ethereum.org/)
- [Семінар з економіки ETH на Devconnect](https://www.youtube.com/playlist?list=PLTLjFJ0OQOj5PHRvA2snoOKt2udVsyXEm)

#### Останні дослідження {#recent-research-9}

- [Емпіричний аналіз EIP-1559](https://arxiv.org/abs/2201.05574)
- [Рівновага циркулюючої пропозиції](https://ethresear.ch/t/circulating-supply-equilibrium-for-ethereum-and-minimum-viable-issuance-during-the-proof-of-stake-era/10954)
- [Кількісна оцінка MEV: наскільки темний ліс?](https://arxiv.org/abs/2101.05511)

### Простір блоків і ринки комісій {#blockspace-fee-markets}

Ринки блокпростору регулюють включення транзакцій кінцевих користувачів, як безпосередньо на Ethereum (рівень 1) або на місткових мережах, наприклад, rollups (рівень 2). На Ethereum транзакції надсилаються на ринок комісій, який реалізований у протоколі за стандартом EIP-1559, що захищає ланцюг від спаму та встановлює ціни на перевантаження. На обох рівнях транзакції можуть викликати зовнішні ефекти, відомі як Максимально Видобуткова Вартість (MEV), які створюють нові ринкові структури для захоплення або управління цими зовнішніми ефектами.

#### Додаткові матеріали {#background-reading-10}

- [Дизайн механізму комісії за транзакції для блокчейну Ethereum: економічний аналіз EIP-1559 (Tim Roughgarden, 2020)](https://timroughgarden.org/papers/eip1559.pdf)
- [Симуляції EIP-1559 (Robust Incentives Group)](https://ethereum.github.io/abm1559)
- [Економіка ролапів з перших принципів](https://barnabe.substack.com/p/understanding-rollup-economics-from?utm_source=url)
- [Flash Boys 2.0: Фронтранінг, зміна порядку транзакцій та нестабільність консенсусу на децентралізованих біржах](https://arxiv.org/abs/1904.05234)

#### Останні дослідження {#recent-research-10}

- [Багатовимірна відеопрезентація EIP-1559](https://youtu.be/QbR4MTgnCko)
- [Міждоменний MEV](http://arxiv.org/abs/2112.01472)
- [Аукціони MEV](https://ethresear.ch/t/mev-auction-auctioning-transaction-ordering-rights-as-a-solution-to-miner-extractable-value/6788)

### Стимули підтвердження частки володіння {#proof-of-stake-incentives}

Валідатори використовують основний актив Ethereum (етер) як заставу проти недоброчесної поведінки. Криптоекономіка цього визначає безпеку мережі. Складні валідатори можуть використовувати витонченість шару стимулювання для здійснення явних атак.

#### Додаткові матеріали {#background-reading-11}

- [Майстер-клас з економіки Ethereum та економічна модель](https://github.com/CADLabs/ethereum-economic-model)
- [Симуляції стимулів PoS (Robust Incentives Group)](https://ethereum.github.io/beaconrunner/)

#### Останні дослідження {#recent-research-11}

- [Підвищення стійкості транзакцій до цензури за умов розділення того, хто пропонує, і того, хто будує (PBS)](https://notes.ethereum.org/s3JToeApTx6CKLJt8AbhFQ)
- [Три атаки на PoS Ethereum](https://arxiv.org/abs/2110.10086)

### Ліквідний стейкінг і деривативи {#liquid-staking-and-derivatives}

Ліквілний стейкінг дозволяє користувачам з менше ніж 32 ETH отримувати доходи від стейкінгу, обмінюючи ефір на токен, що представляє стейкнутий ефір, який можна використовувати в екосистемі DeFi. Однак стимули та ринкова динаміка, пов'язані з ліквідним стейкінгом, все ще досліджуються, як і його вплив на безпеку Ethereum (наприклад, ризики централізації).

#### Додаткові матеріали {#background-reading-12}

- [Ліквідний стейкінг на Ethresear.ch](https://ethresear.ch/search?q=liquid%20staking)
- [Lido: шлях до бездовірного стейкінгу Ethereum](https://blog.lido.fi/the-road-to-trustless-ethereum-staking/)
- [Rocket Pool: вступ до протоколу стейкінгу](https://medium.com/rocket-pool/rocket-pool-staking-protocol-part-1-8be4859e5fbd)

#### Останні дослідження {#recent-research-12}

- [Обробка виведення коштів з Lido](https://ethresear.ch/t/handling-withdrawals-in-lidos-eth-liquid-staking-protocol/8873)
- [Облікові дані для виведення коштів](https://ethresear.ch/t/withdrawal-credential-rotation-from-bls-to-eth1/8722)
- [Ризики деривативів ліквідного стейкінгу](https://notes.ethereum.org/@djrtwo/risks-of-lsd)

## Тестування {#testing}

### Формальна верифікація {#formal-verification}

Формальна верифікація - це написання коду для перевірки правильності та відсутності помилок у специфікаціях консенсусу Ethereum. Існує виконавча версія специфікації, написана на мові Python, яка потребує підтримки та розвитку. Додаткове дослідження може сприяти вдосконаленню виконання специфікації на Python та додаванню інструментів, які більш надійно перевіряють правильність та виявляють проблеми.

#### Додаткові матеріали {#background-reading-13}

- [Вступ до формальної верифікації](https://ptolemy.berkeley.edu/projects/embedded/research/vis/doc/VisUser/vis_user/node4.html)
- [Формальна верифікація (Intel)](https://www.cl.cam.ac.uk/~jrh13/papers/mark10.pdf)

#### Останні дослідження {#recent-research-13}

- [Формальна верифікація депозитного контракту](https://github.com/runtimeverification/deposit-contract-verification)
- [Формальна верифікація специфікації ланцюга Beacon](https://github.com/runtimeverification/deposit-contract-verification)

## Наука про дані та аналітика {#data-science-and-analytics}

Є потреба в більшому розмаїтті інструментів аналізу даних та інформаційних панелях, які надають детальну інформацію про активність на Ethereum та стан мережі.

### Додаткові матеріали {#background-reading-14}

- [Dune Analytics](https://dune.com/browse/dashboards)
- [Панель різноманітності клієнтів](https://clientdiversity.org/)

#### Останні дослідження {#recent-research-14}

- [Аналіз даних від Robust Incentives Group](https://rig.ethereum.org/)

## Застосунки та інструменти {#apps-and-tooling}

Рівень застосунків підтримує різноманітний екосистему програм, які проводять транзакції на базовому рівні Ethereum. Команди розробників постійно вдосконалюють способи використання Ethereum для створення композиційних, бездозвільних та відновлюваних версій важливих застосунків Web2 або для створення абсолютно нових концепцій, властивих Web3. У той же час розробляються нові інструменти, які роблять процес створення додатків на Ethereum менш складним.

### DeFi {#defi}

Децентралізовані фінанси (DeFi) є одним з основних класів застосунків, створених на базі Ethereum. DeFi має на меті створити сумісні «грошові лего», які дозволяють користувачам зберігати, переказувати, позичати, брати в борг та інвестувати криптоактиви за допомогою смарт-контрактів. DeFi — це сфера, що швидко розвивається та постійно оновлюється. Постійно потрібні дослідження безпечних, ефективних і доступних протоколів.

#### Додаткові матеріали {#background-reading-15}

- [DeFi](/defi/)
- [Coinbase: що таке DeFi?](https://www.coinbase.com/learn/crypto-basics/what-is-defi)

#### Останні дослідження {#recent-research-15}

- [Децентралізовані фінанси, централізоване володіння?](https://arxiv.org/pdf/2012.09306.pdf)
- [Optimism: шлях до транзакцій вартістю менше долара](https://medium.com/ethereum-optimism/the-road-to-sub-dollar-transactions-part-2-compression-edition-6bb2890e3e92)

### DAO {#daos}

Важливим варіантом використання Ethereum є можливість децентралізованої організації за допомогою DAO. Ведеться багато активних досліджень того, як DAO на Ethereum можна розробляти та використовувати для реалізації покращених форм управління як інструменту координації з мінімізованою довірою, що значно розширює можливості людей за межами традиційних корпорацій та організацій.

#### Додаткові матеріали {#background-reading-16}

- [Вступ до DAO](/dao/)
- [Dao Collective](https://daocollective.xyz/)

#### Останні дослідження {#recent-research-16}

- [Картографування екосистеми DAO](https://www.researchgate.net/publication/358694594_Mapping_out_the_DAO_Ecosystem_and_Assessing_DAO_Autonomy)

### Інструменти розробника {#developer-tools}

Інструменти для розробників Ethereum швидко вдосконалюються. У цій загальній сфері ведеться багато активних досліджень і розробок.

#### Додаткові матеріали {#background-reading-17}

- [Інструменти за мовами програмування](/developers/docs/programming-languages/)
- [Фреймворки для розробників](/developers/docs/frameworks/)
- [Список інструментів для розробників консенсусу](https://github.com/ConsenSys/ethereum-developer-tools-list)
- [Стандарти токенів](/developers/docs/standards/tokens/)
- [CryptoDevHub: інструменти EVM](https://cryptodevhub.io/wiki/ethereum-virtual-machine-tools)

#### Останні дослідження {#recent-research-17}

- [Канал інструментів консенсусу в Discord Eth R&D](https://discordapp.com/channels/595666850260713488/746343380900118528)

### Оракули {#oracles}

Оракули імпортують позаланцюгові дані в блокчейн бездозвольним і децентралізованим способом. Отримання цих даних у ланцюзі дозволяє децентралізованим застосункам реагувати на явища реального світу, такі як коливання цін на реальні активи, події в позаланцюгових застосунках або навіть зміни погоди.

#### Додаткові матеріали {#background-reading-18}

- [Вступ до оракулів](/developers/docs/oracles/)

#### Останні дослідження {#recent-research-18}

- [Огляд блокчейн-оракулів](https://arxiv.org/pdf/2004.07140.pdf)
- [Офіційний документ Chainlink](https://chain.link/whitepaper)

### Безпека застосунків {#app-security}

Хаки в Ethereum зазвичай використовують уразливості в окремих застосунках, а не в самому протоколі. Хакери та розробники застосунків ведуть гонку озброєнь, розробляючи нові атаки та захисти. Це означає, що завжди потрібні важливі дослідження та розробки, щоб убезпечити застосунки від хакерських атак.

#### Додаткові матеріали {#background-reading-19}

- [Звіт про експлойт Wormhole](https://blog.chainalysis.com/reports/wormhole-hack-february-2022/)
- [Список посмертних аналізів зломів контрактів Ethereum](https://forum.openzeppelin.com/t/list-of-ethereum-smart-contracts-post-mortems/1191)
- [Rekt News](https://x.com/RektHQ?s=20&t=3otjYQdM9Bqk8k3n1a1Adg)

#### Останні дослідження {#recent-research-19}

- [Застосунки на Ethresear.ch](https://ethresear.ch/c/applications/18)

### Стек технологій {#technology-stack}

Децентралізація всього технологічного стека Ethereum є важливим напрямком досліджень. Наразі децентралізовані застосунки на Ethereum часто мають певні точки централізації, оскільки вони покладаються на централізовані інструменти або інфраструктуру.

#### Додаткові матеріали {#background-reading-20}

- [Стек Ethereum](/developers/docs/ethereum-stack/)
- [Coinbase: вступ до стека Web3](https://blog.coinbase.com/a-simple-guide-to-the-web3-stack-785240e557f0)
- [Вступ до смарт-контрактів](/developers/docs/smart-contracts/)
- [Вступ до децентралізованого сховища](/developers/docs/storage/)

#### Останні дослідження {#recent-research-20}

- [Сумісність смарт-контрактів](/developers/docs/smart-contracts/composability/)
