---
title: Jak Sloučení ovlivnilo nabídku ETH
description: Rozbor toho, jak Sloučení ovlivnilo nabídku ETH
lang: cs
---

# Jak Sloučení ovlivnilo nabídku ETH {#how-the-merge-impacts-ETH-supply}

Sloučení představovalo přechod sítě Ethereum z důkazu prací na důkaz podílem, který proběhl v září 2022. Způsob vydávání nových ETH do oběhu v této době prošel změnami. Dříve se nová ETH vydávala ze dvou zdrojů: exekuční vrstvy (tj. Mainnet) a vrstvy konsenzu (tj. Beacon Chain). Od Sloučení je na exekuční vrstvě vydávání nových ETH nulové. Pojďme si to vysvětlit.

## Složky vydávání ETH {#components-of-eth-issuance}

Nabídku ETH můžeme rozdělit na dvě hlavní složky: vydávání a pálení.

**Vydávání** ETH je proces vytváření ETH, které předtím neexistovaly. K **pálení** ETH dochází, když se stávající ETH zničí a odstraní z oběhu. Míra vydávání a pálení se vypočítává na základě několika parametrů a rovnováha mezi nimi určuje výslednou míru inflace či deflace etheru.

<Card
emoji=":chart_decreasing:"
title="Vydávání ETH ve zkratce">

- Před přechodem na důkaz podílem bylo těžařům vydáváno přibližně 13 000 ETH denně
- Uzamykatelům je vydáváno přibližně 1 700 ETH denně, a to na základě celkového objemu přibližně 14 milionů uzamčených ETH
- Přesné vydávání za uzamčení kolísá v závislosti na celkovém množství uzamčených ETH
- **Od Sloučení zůstává pouze ~1 700 ETH/den, což snižuje celkové nové vydávání ETH o ~88 %**
- Pálení: Toto kolísá v závislosti na poptávce v síti. - Pokud je průměrná cena paliva alespoň 16 gwei za daný den, nastává efektivní kompenzace právě těch ~1 700 ETH, které jsou vydávány validátorům, a směruje čistou inflaci ETH v daný den k nule nebo níže.

</Card>

## Před Sloučením (historicky) {#pre-merge}

### Vydávání na exekuční vrstvě {#el-issuance-pre-merge}

Za časů důkazu prací komunikovali těžaři pouze s exekuční vrstvou, a pokud byli první, kdo vyřešil další blok, byla jejich práce kompenzována blokovými odměnami. Od [vylepšení Constantinople](/ethereum-forks/#constantinople) v roce 2019 činila tato odměna 2 ETH za blok. Těžaři byli také odměňováni za zveřejňování [ommer](/glossary/#ommer) bloků, což byly platné bloky, které se neobjevily v nejdelším/kanonickém řetězci. Tyto odměny dosahovaly maximálně 1,75 ETH na ommer a byly _navíc k_ odměně vydané z kanonického bloku. Proces těžby byl ekonomicky náročnou aktivitou, která v minulosti navíc vyžadovala vysokou úroveň vydávání ETH za účelem zachování udržitelnosti.

### Vydávání na vrstvě konsenzu {#cl-issuance-pre-merge}

[Beacon Chain](/ethereum-forks/#beacon-chain-genesis) byl spuštěn v roce 2020. Místo těžařů je zabezpečena validátory využívajícími důkaz podílem. Tento řetězec byl inicializován uživateli Etherea, kteří vkládali ETH jednosměrně do chytrého kontraktu na hlavní síti (exekuční vrstva), který Řetězová vazba sledovala a připsala uživateli stejné množství ETH na novém řetězci. Dokud nedošlo ke Sloučení, validátoři Řetězové vazby nezpracovávali transakce a v podstatě dosahovali shody ohledně samotného stavu poolu validátorů.

Validátoři na Řetězové vazbě jsou za potvrzování stavu řetězce a navrhování bloků odměňováni v ETH. Odměny (nebo pokuty) jsou vypočítávány a rozdělovány každou epochu (každých 6,4 minuty) na základě výkonu validátorů. Odměny pro validátory jsou **výrazně** menší než odměny za těžbu, které byly dříve vydávány v rámci důkazu prací (2 ETH každých ~13,5 sekundy), protože provozování validujícího uzlu není tak ekonomicky náročné a nevyžaduje ani neopravňuje k tak vysoké odměně.

### Rozpis vydávání před Sloučením {#pre-merge-issuance-breakdown}

Celková nabídka ETH: **~120 520 000 ETH** (v době Sloučení v září 2022)

**Vydávání v exekuční vrstvě:**

- Odhad činil 2,08 ETH za 13,3 sekundy\*: **~4 930 000** ETH vydaných za rok
- Výsledkem byla míra inflace **přibližně 4,09 %** (4,93 mil. za rok / 120,5 mil. celkem)
- \*To zahrnuje 2 ETH za kanonický blok, plus průměrně 0,08 ETH za ommer bloky. Také používá 13,3 sekundy, což je základní cílový čas bloku bez vlivu [bomby obtížnosti](/glossary/#difficulty-bomb). ([Viz zdroj](https://bitinfocharts.com/ethereum/))

**Vydávání ve vrstvě konsenzu:**

- Při 14 000 000 celkově uzamčených ETH je míra vydávání ETH přibližně 1700 ETH/den ([Viz zdroj](https://ultrasound.money/))
- Výsledkem je **~620 500** ETH vydaných za rok
- Výsledkem byla míra inflace **přibližně 0,52 %** (620,5 tis. za rok / 119,3 mil. celkem)

<Alert variant="update">
<AlertContent>
<AlertDescription>**Celková roční míra vydávání (před Sloučením): ~4,61 %** (4,09 % + 0,52 %)

**~88,7 %** vydávání šlo těžařům na exekuční vrstvě (4,09 / 4,61 \* 100)

**~11,3 %** bylo vydáváno uzamykatelům na vrstvě konsenzu (0,52 / 4,61 \* 100) </AlertDescription> </AlertContent> </Alert>

## Po Sloučení (současnost) {#post-merge}

### Vydávání na exekuční vrstvě {#el-issuance-post-merge}

Vydávání na exekuční vrstvě je od Sloučení nulové. Důkaz prací již není platným prostředkem produkce bloků podle vylepšených pravidel konsenzu. Veškerá aktivita na exekuční vrstvě je zabalena do "beacon bloků", které jsou zveřejňovány a potvrzovány validátory důkazu podílem. Odměny za potvrzování a zveřejňování beacon bloků se účtují zvlášť na vrstvě konsenzu.

### Vydávání na vrstvě konsenzu {#cl-issuance-post-merge}

Vydávání na vrstvě konsenzu pokračuje i dnes jako před Sloučením, s malými odměnami pro validátory, kteří potvrzují a navrhují bloky. Odměny pro validátory se nadále připisují na _zůstatky validátorů_, které jsou spravovány v rámci vrstvy konsenzu. Na rozdíl od běžných ("exekučních") účtů, které mohou provádět transakce na Mainnetu, tyto oddělené účty Etherea nemohou volně provádět transakce s jinými účty Etherea. Prostředky z těchto účtů lze vybrat pouze na jednu specifikovanou exekuční adresu.

Od vylepšení Shanghai/Capella, které proběhlo v dubnu 2023, jsou tyto výběry pro uzamykatele povoleny. Uzamykatelé jsou motivováni k výběru svých _výdělků/odměn (zůstatek nad 32 ETH)_, protože tyto prostředky jinak nepřispívají k váze jejich podílu (která je maximálně 32).

Uzamykatelé se také mohou rozhodnout odejít a vybrat si celý zůstatek svého validátora. Aby byla zajištěna stabilita Etherea, je počet současně odcházejících validátorů omezen.

Přibližně 0,33 % z celkového počtu validátorů může odejít v daný den. Standardně mohou odejít čtyři (4) validátoři za epochu (každých 6,4 minuty, neboli 900 za den). Další jeden (1) validátor může odejít na každých 65 536 (2<sup>16</sup>) dalších validátorů nad 262 144 (2<sup>18</sup>). Například při více než 327 680 validátorech může za epochu odejít pět (5) (1 125 za den). Šest (6) bude povoleno při celkovém počtu aktivních validátorů nad 393 216 a tak dále.

S tím, jak bude více validátorů vybírat, bude se maximální počet odcházejících validátorů postupně snižovat na minimum čtyř, aby se záměrně zabránilo souběžnému výběru velkých destabilizujících částek uzamčených ETH.

### Rozpis inflace po Sloučení {#post-merge-inflation-breakdown}

- Celková nabídka ETH: **~120 520 000 ETH** (v době Sloučení v září 2022)
- Vydávání na exekuční vrstvě: **0**
- Vydávání na vrstvě konsenzu: Stejné jako výše, roční míra vydávání **~0,52 %** (při 14 milionech celkem uzamčených ETH)

<Alert variant="update">
<AlertContent>
<AlertDescription>Celková roční míra vydávání: **~0,52 %**

Čisté snížení ročního vydávání ETH: **~88,7 %** ((4,61 % – 0,52 %) / 4,61 % \* 100) </AlertDescription> </AlertContent> </Alert>

## <Emoji text=":fire:" size="1" /> Pálení {#the-burn}

Opakem vydávání ETH je stupeň, při které je ETH pálen. Aby byla transakce na Ethereu provedena, musí být zaplacen minimální poplatek (známý jako „základní poplatek“), který se neustále mění (blok od bloku) v závislosti na aktivitě sítě. Poplatek se platí v ETH a je _vyžadován_, aby byla transakce považována za platnou. Tento poplatek se během transakce _pálí_, čímž je odstraněn z oběhu.

<Alert variant="update">
<AlertContent>
<AlertDescription>

Pálení poplatků bylo spuštěno s [vylepšením London](/ethereum-forks/#london) v srpnu 2021 a od Sloučení zůstává nezměněno. </AlertDescription> </AlertContent> </Alert>

Kromě pálení poplatků zavedeného s vylepšením London mohou validátoři také dostávat pokuty za to, že jsou offline, nebo hůře, mohou být „potrestáni“ za porušení specifických pravidel, které ohrožuje bezpečnost sítě. Tyto pokuty vedou k odečtení ETH od zůstatku validátora, aniž by byly převedeny jako odměna jinému účtu, čímž se efektivně pálí/odstraňují z oběhu.

### Výpočet průměrné ceny paliva pro deflaci {#calculating-average-gas-price-for-deflation}

Jak bylo uvedeno výše, množství vydaného ETH za daný den závisí na celkovém uzamčeném ETH. V době psaní tohoto textu je to přibližně 1700 ETH/den.

Abychom určili průměrnou cenu paliva potřebnou k úplné kompenzaci vydávání za dané 24hodinové období, začneme výpočtem celkového počtu bloků za den, při blokovém čase 12 sekund:

- `(1 blok za 12 sekund) * (60 sekund za jednu minutu) = 5 bloků za jednu minutu`
- `(5 bloků za jednu minutu) * (60 minut za jednu hodinu) = 300 bloků za jednu hodinu`
- `(300 bloků za jednu hodinu) * (24 hodin za jeden den) = 7200 bloků za jeden den`

Každý blok cílí na `15x10^6 paliva/blok` ([více o palivu](/developers/docs/gas/)). Použitím tohoto výpočtu můžeme stanovit průměrnou cenu paliva (v jednotkách gwei za jednotku paliva) potřebnou k vyrovnání vydávání, pokud je dané denní vydávání ETH v objemu 1700 ETH:

- `7200 bloků/den * 15x10^6 paliva/blok * `**`Y gwei/palivo`**` * 1 ETH / 10^9 gwei = 1700 ETH/den`

Řešení pro `Y`:

- `Y = (1700(10^9))/(7200 * 15(10^6)) = (17x10^3)/(72 * 15) = 16 gwei` (zaokrouhleno pouze na dvě platné číslice)

Dalším způsobem, jak přeuspořádat tento poslední krok, by bylo nahradit `1700` proměnnou `X`, která představuje denní vydávání ETH, a zbytek zjednodušit na:

- `Y = (X(10^3)/(7200 * 15)) = X/108`

Můžeme to zjednodušit a zapsat jako funkci `X`:

- `f(X) = X/108`, kde `X` je denní vydávání ETH a `f(X)` představuje cenu gwei/palivo potřebnou k vyrovnání veškerého nově vydaného ETH.

Například pokud `X` (denní vydávání ETH) vzroste na 1800 na základě celkového uzamčeného ETH, pak `f(X)` (gwei potřebné k vyrovnání veškerého vydávání) bude `17 gwei` (při použití 2 platných číslic).

## Další čtení {#further-reading}

- [Sloučení](/roadmap/merge/)
- [Ultrasound.money](https://ultrasound.money/) – _panely dostupné pro vizualizaci vydávání a pálení ETH v reálném čase_
- [Grafické znázornění vydávání Etherea](https://www.attestant.io/posts/charting-ethereum-issuance/) – _Jim McDonald 2020_
