---
title: Jak Sloučení ovlivnilo nabídku ETH
description: Rozbor toho, jak Sloučení ovlivnilo nabídku ETH
lang: cs
---

# Jak Sloučení ovlivnilo nabídku ETH {#how-the-merge-impacts-ETH-supply}

Sloučení představovalo přechod sítě Ethereum z důkazu prací na důkaz podílem, který proběhl v září 2022. Způsob vydávání nových ETH do oběhu v této době prošel změnami. Dříve byly nové ETH vydávány ze dvou zdrojů: z exekuční vrstvy (tj. hlavní síť) a vrstvy konsenzu (tj. Řetězová vazba). Od Sloučení je na exekuční vrstvě vydávání nových ETH nulové. Pojďme si to vysvětlit.

## Složky vydávání ETH {#components-of-ETH-issuance}

Nabídku ETH můžeme rozdělit na dvě hlavní složky: vydávání a pálení.

**Vydávání** ETH je proces vytváření ETH, které předtím neexistovaly. K **pálení** ETH dochází, když se stávající ETH zničí a odstraní z oběhu. Míra vydávání a pálení se vypočítává na základě několika parametrů a rovnováha mezi nimi určuje výslednou míru inflace či deflace etheru.

<Card
emoji=":chart_decreasing:"
title="Vydávání ETH tldr">

- Před přechodem na důkaz podílem bylo těžařům vydáváno přibližně 13 000 ETH/den.
- Uzamykatelům je vydáváno přibližně 1 700 ETH/den, na základě přibližně 14 milionů celkově uzamčených ETH.
- Přesná míra vydávání uzamčení se mění podle celkového množství uzamčených ETH.
- **Od Sloučení se vydává pouze ~1 700 ETH/den, což snižuje celkové vydávání nových ETH o ~88 %**.
- Pálení: Mění se podle poptávky sítě. - Pokud je průměrná cena paliva alespoň 16 gwei za daný den, nastává efektivní kompenzace právě těch ~1 700 ETH, které jsou vydávány validátorům, a směruje čistou inflaci ETH v daný den k nule nebo níže.

</Card>

## Před Sloučením (historicky) {#pre-merge}

### Vydávání v exekuční vrstvě {#el-issuance-pre-merge}

Za časů důkazu prací komunikovali těžaři pouze s exekuční vrstvou, a pokud byli první, kdo vyřešil další blok, byla jejich práce kompenzována blokovými odměnami. Od [vylepšení Constantinople](/Ethereum-forks/#constantinople) v roce 2019 činila tato odměna 2 ETH na blok. Těžaři byli také odměňováni za zveřejňování [ommer](/glossary/#ommer) bloků, což byly platné bloky, které se neobjevily v nejdelším/kanonickém řetězci. Tyto odměny dosahovaly maximálně 1,75 ETH na ommer a těžaři je dostávali _navíc k_ odměně za kanonický blok. Proces těžby byl ekonomicky náročnou aktivitou, která v minulosti navíc vyžadovala vysokou úroveň vydávání ETH za účelem zachování udržitelnosti.

### Vydávání ve vrstvě konsenzu {#cl-issuance-pre-merge}

[Řetězová vazba](/Ethereum-forks/#beacon-chain-genesis) byla spuštěna v roce 2020. Místo těžařů je zabezpečena validátory využívajícími důkaz podílem. Tento řetězec byl inicializován uživateli Etherea, kteří vkládali ETH jednosměrně do chytrého kontraktu na hlavní síti (exekuční vrstva), který Řetězová vazba sledovala a připsala uživateli stejné množství ETH na novém řetězci. Dokud nedošlo ke Sloučení, validátoři Řetězové vazby nezpracovávali transakce a v podstatě dosahovali shody ohledně samotného stavu poolu validátorů.

Validátoři na Řetězové vazbě jsou za potvrzování stavu řetězce a navrhování bloků odměňováni v ETH. Odměny (nebo pokuty) jsou vypočítávány a rozdělovány každou epochu (každých 6,4 minuty) na základě výkonu validátorů. Odměny validátorům jsou **výrazně** menší než odměny za těžbu, které byly dříve vydávány v době důkazu prací (2 ETH každých ~13,5 sekundy), protože provoz validujícího uzlu není tak ekonomicky náročný, a proto nevyžaduje, a tím pádem ani neospravedlňuje, tak vysokou odměnu.

### Systém vydávání před Sloučením {#pre-merge-issuance-breakdown}

Celková nabídka ETH: **~120 520 000 ETH** (v době Sloučení v září 2022)

**Vydávání v exekuční vrstvě:**

- Odhadováno na 2,08 ETH každých 13,3 sekundy*: **~4 930 000** ETH vydáno za rok
- Vedlo k inflaci **přibližně 4,09 %** (4,93 mil. za rok / 120,5 mil. celkem)
- \*To zahrnuje 2 ETH za kanonický blok, plus průměrně 0,08 ETH za ommer bloky. Také pracuje s časovým úsekem 13,3 sekundy, což je základní cílový čas bloku bez jakéhokoli vlivu [bomby obtížnosti.](/glossary/#difficulty-bomb). ([Vizte zdroje](https://bitinfocharts.com/Ethereum/))

**Vydávání ve vrstvě konsenzu:**

- Při použití 14 000 000 celkově uzamčených ETH je míra vydávání ETH přibližně 1700 ETH/den ([Vizte zdroj](https://ultrasound.money/))
- Výsledkem je **~620 500** ETH vydaných za rok
- To vedlo k inflaci **přibližně 0,52 %** (620,5 tis. za rok / 119,3 mil. celkem)

<Alert variant="update">
<AlertContent>
<AlertDescription>
**Celková anualizovaná míra vydávání (před Sloučením): ~4,61 %** (4,09 % + 0,52 %)

**~88,7 %** vydávaných ETH směřovalo k těžařům v exekuční vrstvě (4,09 / 4,61 * 100)

**~11,3 %** bylo vydáváno uzamykatelům ve vrstvě konsenzu (0,52 / 4,61 * 100)
</AlertDescription>
</AlertContent>
</Alert>

## Po Sloučení (současnost) {#post-merge}

### Vydávání v exekuční vrstvě {#el-issuance-post-merge}

Vydávání ETH v exekuční vrstvě je od Sloučení nulové. Podle nových pravidel konsenzu už důkaz prací není platným způsobem tvorby bloků. Veškerá činnost v exekuční vrstvě je seskupena do „beacon bloků“, které jsou potvrzovány a publikovány validátory důkazu podílem. Odměny za potvrzování a publikování beacon bloků jsou evidovány samostatně ve vrstvě konsenzu.

### Vydávání ve vrstvě konsenzu {#cl-issuance-post-merge}

Vydávání ETH ve vrstvě konsenzu pokračuje stejně jako před Sloučením, s malými odměnami pro validátory, kteří potvrzují a navrhují bloky. Odměny validátorů se nadále připisují k jejich _zůstatkům_ spravovaným ve vrstvě konsenzu. Na rozdíl od aktuálních účtů („exekučních“ účtů), které mohou provádět transakce na hlavní síti, tyto samostatné účty Etherea nemohou volně transakčně interagovat s jinými účty Etherea. Prostředky na těchto účtech lze stáhnout pouze na jednu specifikovanou exekuční adresu.

Od vylepšení Shanghai/Capella, které proběhlo v dubnu 2023, je umožněno uzamykatelům vybírat tyto prostředky. Uzamykatelé mají motivaci k vybrání svých _výdělků/odměn (přebytek nad 32 ETH)_, protože tyto prostředky nijak nepřispívají k váze jejich uzamčení (která se maximálně rovná 32).

Uzamykatelé se také mohou rozhodnout odejít a vybrat celý zůstatek. Aby bylo zajištěno, že Ethereum zůstane stabilní, je počet validátorů, kteří mohou odejít současně, omezen.

Přibližně 0,33 % z celkového počtu validátorů může odejít během jednoho dne. Ve výchozím nastavení mohou odejít čtyři (4) validátoři během jedné epochy (každých 6,4 minuty, tedy 900 za den). Další jeden (1) validátor dostane povolení k odchodu na každých 65 536 (2<sup>16</sup>) dalších validátorů nad 262 144 (2<sup>18</sup>). Například, s více než 327 680 validátory může odejít pět (5) validátorů během jedné epochy (1 125 za den). Šest (6) dostane povolení s celkovým počtem aktivních validátorů nad 393 216 a tak dále.

Čím více validátorů vybírá své prostředky, tím více je maximální počet odcházejících validátorů postupně snižován na minimálně čtyři, aby se úmyslně zabránilo hromadnému destabilizujícímu vybírání velkého množství uzamčených ETH současně.

### Rozbor inflace po Sloučení {#post-merge-inflation-breakdown}

- Celková nabídka ETH: **~120 520 000 ETH** (v době Sloučení v září 2022)
- Vydávání v exekuční vrstvě: **0**
- Vydávání ve vrstvě konsenzu: Stejné jako výše, roční míra vydávání (při celkovém uzamčení 14 milionů ETH) je **~0,52 %**

<Alert variant="update">
<AlertContent>
<AlertDescription>
Celková roční míra vydávání: **~0,52 %**

Čisté snížení ročního vydávání ETH: **~88,7 %** ((4,61 % - 0,52 %) / 4,61 % * 100)
</AlertDescription>
</AlertContent>
</Alert>

## <Emoji text=":fire:" size="1" />Pálení {#the-burn}

Opakem vydávání ETH je stupeň, při které je ETH pálen. Aby byla transakce na Ethereu provedena, musí být zaplacen minimální poplatek (známý jako „základní poplatek“), který se neustále mění (blok od bloku) v závislosti na aktivitě sítě. Poplatek je placen v ETH a je _nezbytný_ pro to, aby byla transakce považována za platnou. Tento poplatek je během transakčního procesu _pálen_, čímž se odstraňuje z oběhu.

<Alert variant="update">
<AlertContent>
<AlertDescription>
Pálení poplatků bylo spuštěno s [vylepšením London](/Ethereum-forks/#london) v srpnu 2021 a od Sloučení zůstává beze změn.
</AlertDescription>
</AlertContent>
</Alert>

Kromě pálení poplatků zavedeného s vylepšením London mohou validátoři také dostávat pokuty za to, že jsou offline, nebo hůře, mohou být „potrestáni“ za porušení specifických pravidel, které ohrožuje bezpečnost sítě. Tyto pokuty vedou k odečtení ETH od zůstatku validátora, aniž by byly převedeny jako odměna jinému účtu, čímž se efektivně pálí/odstraňují z oběhu.

### Výpočet průměrné ceny paliva za účelem deflace {#calculating-average-gas-price-for-deflation}

Jak bylo uvedeno výše, množství vydaného ETH za daný den závisí na celkovém uzamčeném ETH. V době psaní tohoto textu je to přibližně 1700 ETH/den.

Abychom určili průměrnou cenu paliva potřebnou k úplné kompenzaci vydávání za dané 24hodinové období, začneme výpočtem celkového počtu bloků za den, při blokovém čase 12 sekund:

- `(1 blok za 12 sekund) * (60 sekund za jednu minutu) = 5 bloků za jednu minutu`
- `(5 bloků za jednu minutu) * (60 minut za jednu hodinu) = 300 bloků za jednu hodinu`
- `(300 bloků za jednu hodinu) * (24 hodin za jeden den) = 7200 bloků za jeden den`

Každý blok cílí na `15x10^6 paliva za blok` ([více o palivu](/developers/docs/gas/)). Použitím tohoto výpočtu můžeme stanovit průměrnou cenu paliva (v jednotkách gwei za jednotku paliva) potřebnou k vyrovnání vydávání, pokud je dané denní vydávání ETH v objemu 1700 ETH:

- `7200 bloků za jeden den * 15x10^6 paliva za jeden blok * `**`Y gwei za jedno palivo`**` * 1 ETH/ 10^9 gwei = 1700 ETH za jeden den`

Řešení pro `Y`:

- `Y = (1700(10^9))/(7200 * 15(10^6)) = (17x10^3)/(72 * 15) = 16 gwei` (zaokrouhleno na dvě číslice)

Dalším způsobem, jak upravit tento poslední krok, by bylo nahradit číslo `1700` proměnnou `X`, která představuje denní vydávání ETH, a zjednodušit zbytek na:

- `Y = (X(10^3)/(7200 * 15)) = X/108`

To můžeme zjednodušit a zapsat jako funkci `X`:

- `f(X) = X/108`, kde `X` je denní vydávání ETH, a `f(X)` představuje cenu gwei za jednotku paliva potřebnou k vyrovnání veškerého nově vydaného ETH.

Například, pokud `X` (denní vydávání ETH) vzroste na 1800 na základě celkového uzamčeného ETH, `f(X)` (gwei potřebný k vyrovnání veškerého vydávání) by pak byl `17 gwei` (za použití dvou platných číslic)

## Další informace {#further-reading}

- [Sloučení](/roadmap/merge/)
- [Ultrasound.money](https://ultrasound.money/) - _Dashboardy dostupné k vizualizaci vydávání a pálení ETH v reálném čase_
- [Charting Ethereum Issuance](https://www.attestant.io/posts/charting-Ethereum-issuance/) - _Jim McDonald 2020_
