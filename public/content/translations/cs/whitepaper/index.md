---
title: "Bílá kniha Ethereum"
description: "Úvodní dokument platformy Ethereum, který byl zveřejněn v roce 2013 před jeho spuštěním."
lang: cs
sidebarDepth: 2
hideEditButton: true
---

# Bílá kniha Etherea {#ethereum-whitepaper}

_Tento úvodní dokument byl původně zveřejněn v roce 2014 Vitalikem Buterinem, zakladatelem [Etherea](/what-is-ethereum/), před zahájením projektu v roce 2015._ Stojí za zmínku, že Ethereum, stejně jako mnoho komunitně řízených, open-source softwarových projektů, se od svého počátku vyvíjelo._

_I když je tento dokument několik let starý, udržujeme ho, protože nadále slouží jako užitečná reference a přesná reprezentace Etherea a jeho vize. _Chcete-li se dozvědět o nejnovějším vývoji Etherea a o tom, jak se provádějí změny protokolu, doporučujeme [tohoto průvodce](/learn/)._

[Výzkumníci a akademici, kteří hledají historickou nebo kanonickou verzi bílé knihy [z prosince 2014], by měli použít toto PDF.](./whitepaper-pdf/Ethereum_Whitepaper_-_Buterin_2014.pdf)

## Platforma nové generace pro chytré kontrakty a decentralizované aplikace {#a-next-generation-smart-contract-and-decentralized-application-platform}

Vývoj Bitcoinu Satoshi Nakamotem v roce 2009 byl často oslavován jako radikální vývoj v oblasti peněz a měny, jelikož se jednalo o první příklad digitálního aktiva, které současně nemá žádné krytí ani „[vnitřní hodnotu](https://bitcoinmagazine.com/culture/an-exploration-of-intrinsic-value-what-it-is-why-bitcoin-doesnt-have-it-and-why-bitcoin-does-have-it)“ a žádného centralizovaného emitenta ani správce. Nicméně další, pravděpodobně důležitější součástí bitcoinového experimentu je základní blockchainová technologie jako nástroj distribuovaného konsensu a pozornost se rychle začíná přesouvat k tomuto dalšímu aspektu Bitcoinu. Mezi běžně uváděné alternativní aplikace blockchainové technologie patří používání digitálních aktiv na blockchainu k reprezentaci vlastních měn a finančních nástrojů („[barevné mince](https://docs.google.com/a/buterin.com/document/d/1AnkP_cVZTCMLIzw4DvsW6M8Q2JC0lIzrTLuoWu2z1BE/edit)“), vlastnictví podkladového fyzického zařízení („[chytrý majetek](https://en.bitcoin.it/wiki/Smart_Property)“), nezastupitelných aktiv, jako jsou názvy domén („[Namecoin](http://namecoin.org)“), a také složitější aplikace zahrnující přímé ovládání digitálních aktiv částí kódu implementující libovolná pravidla („[chytré kontrakty](http://www.fon.hum.uva.nl/rob/Courses/InformationInSpeech/CDROM/Literature/LOTwinterschool2006/szabo.best.vwh.net/idea.html)“) nebo dokonce blockchainové „[decentralizované autonomní organizace](http://bitcoinmagazine.com/7050/bootstrapping-a-decentralized-autonomous-corporation-part-i/)“ (DAO). Ethereum má v úmyslu poskytnout blockchain s vestavěným plnohodnotným Turing-úplným programovacím jazykem, který lze použít k vytváření „kontraktů“, jež lze použít ke kódování libovolných funkcí přechodu stavu, což uživatelům umožňuje vytvářet kterýkoli z výše popsaných systémů a mnoho dalších, které jsme si dosud ani nedokázali představit, a to jednoduše sepsáním logiky do několika řádků kódu.

## Úvod do Bitcoinu a stávajících konceptů {#introduction-to-bitcoin-and-existing-concepts}

### Historie {#history}

Koncept decentralizované digitální měny a alternativních aplikací, jako jsou registry majetku, existuje již desítky let. Anonymní protokoly elektronické hotovosti z 80. a 90. let, které se většinou spoléhaly na kryptografickou primitivu známou jako Chaumian blinding, poskytovaly měnu s vysokým stupněm soukromí, ale protokoly se z velké části neprosadily kvůli své závislosti na centralizovaném zprostředkovateli. V roce 1998 se [b-money](http://www.weidai.com/bmoney.txt) od Wei Daie stal prvním návrhem, který představil myšlenku vytváření peněz řešením výpočetních hádanek a také decentralizovaným konsensem, ale návrh byl skoupý na podrobnosti o tom, jak by mohl být decentralizovaný konsensus skutečně implementován. V roce 2005 představil Hal Finney koncept „[opakovaně použitelných důkazů prací](https://nakamotoinstitute.org/finney/rpow/)“, systém, který využívá myšlenky z b-money spolu s výpočetně obtížnými hádankami Hashcash od Adama Backa k vytvoření konceptu kryptoměny, ale opět zaostal za ideálem tím, že se spoléhal na důvěryhodné výpočty jako backend. V roce 2009 byla decentralizovaná měna poprvé v praxi implementována Satoshim Nakamotem, který zkombinoval zavedené primitivy pro správu vlastnictví prostřednictvím kryptografie s veřejným klíčem s konsensuálním algoritmem pro sledování toho, kdo vlastní mince, známým jako „důkaz prací“.

Mechanismus důkazu prací byl v tomto oboru průlomový, protože současně vyřešil dva problémy. Zaprvé, poskytl jednoduchý a středně účinný konsensuální algoritmus, který umožňuje uzlům v síti kolektivně se dohodnout na sadě kanonických aktualizací stavu bitcoinové účetní knihy. Zadruhé, poskytl mechanismus umožňující volný vstup do procesu konsensu, čímž vyřešil politický problém rozhodování o tom, kdo může konsensus ovlivnit, a zároveň zabránil Sybil útokům. Děje se tak nahrazením formální bariéry účasti, jako je požadavek na registraci jako jedinečná entita na určitém seznamu, ekonomickou bariérou – váha jednoho uzlu v procesu hlasování o konsensu je přímo úměrná výpočetnímu výkonu, který uzel přináší. Od té doby byl navržen alternativní přístup nazývaný _důkaz podílem_, který počítá váhu uzlu jako úměrnou jeho drženým měnám, a ne výpočetním zdrojům; diskuse o relativních výhodách obou přístupů je nad rámec tohoto dokumentu, ale je třeba poznamenat, že oba přístupy mohou být použity jako páteř kryptoměny.

### Bitcoin jako systém přechodu stavu {#bitcoin-as-a-state-transition-system}

![Přechod stavu Etherea](./ethereum-state-transition.png)

Z technického hlediska lze na účetní knihu kryptoměny, jako je Bitcoin, pohlížet jako na systém přechodu stavu, kde existuje „stav“ sestávající ze stavu vlastnictví všech existujících bitcoinů a „funkce přechodu stavu“, která přijímá stav a transakci a vydává nový stav, který je výsledkem. Například ve standardním bankovním systému je stavem rozvaha, transakcí je požadavek na přesun X USD z A do B a funkce přechodu stavu snižuje hodnotu na účtu A o X USD a zvyšuje hodnotu na účtu B o X USD. Pokud má účet A na prvním místě méně než X USD, funkce přechodu stavu vrátí chybu. Lze tedy formálně definovat:

```
APPLY(S,TX) -> S' nebo ERROR
```

Ve výše definovaném bankovním systému:

```js
APPLY({ Alice: $50, Bob: $50 },"send $20 from Alice to Bob") = { Alice: $30, Bob: $70 }
```

Ale:

```js
APPLY({ Alice: $50, Bob: $50 },"send $70 from Alice to Bob") = ERROR
```

„Stav“ v Bitcoinu je soubor všech mincí (technicky „neutracené transakční výstupy“ neboli UTXO), které byly vyraženy a dosud neutraceny, přičemž každé UTXO má nominální hodnotu a vlastníka (definovaného 20bajtovou adresou, která je v podstatě kryptografickým veřejným klíčem<sup>[fn1](#notes)</sup>). Transakce obsahuje jeden nebo více vstupů, přičemž každý vstup obsahuje odkaz na existující UTXO a kryptografický podpis vytvořený soukromým klíčem spojeným s adresou vlastníka, a jeden nebo více výstupů, přičemž každý výstup obsahuje nové UTXO, které má být přidáno do stavu.

Funkci přechodu stavu `APPLY(S,TX) -> S'` lze zhruba definovat takto:

<ol>
  <li>
    Pro každý vstup v <code>TX</code>:
    <ul>
    <li>
        Pokud odkazované UTXO není v <code>S</code>, vrátí chybu.
    </li>
    <li>
        Pokud poskytnutý podpis neodpovídá vlastníkovi UTXO, vrátí chybu.
    </li>
    </ul>
  </li>
  <li>
    Pokud je součet nominálních hodnot všech vstupních UTXO menší než součet nominálních hodnot všech výstupních UTXO, vrátí chybu.
  </li>
  <li>
    Vrátí <code>S</code> se všemi odstraněnými vstupními UTXO a přidanými všemi výstupními UTXO.
  </li>
</ol>

První polovina prvního kroku brání odesílatelům transakcí utrácet mince, které neexistují, druhá polovina prvního kroku brání odesílatelům transakcí utrácet mince jiných lidí a druhý krok vynucuje zachování hodnoty. Aby bylo možné toto použít k platbě, protokol je následující. Předpokládejme, že Alice chce poslat 11,7 BTC Bobovi. Nejprve Alice vyhledá sadu dostupných UTXO, které vlastní, v celkové výši alespoň 11,7 BTC. Reálně se Alici nepodaří získat přesně 11,7 BTC; řekněme, že nejmenší, co může získat, je 6+4+2=12. Poté vytvoří transakci s těmito třemi vstupy a dvěma výstupy. První výstup bude 11,7 BTC s Bobovou adresou jako vlastníkem a druhý výstup bude zbývajících 0,3 BTC „drobné“, jejichž vlastníkem bude sama Alice.

### Těžba {#mining}

![Bloky Etherea](./ethereum-blocks.png)

Pokud bychom měli přístup k důvěryhodné centralizované službě, implementace tohoto systému by byla triviální; mohl by být jednoduše nakódován přesně tak, jak je popsáno, s použitím pevného disku centralizovaného serveru ke sledování stavu. S Bitcoinem se však snažíme vybudovat decentralizovaný měnový systém, takže budeme muset zkombinovat systém transakcí stavu s konsensuálním systémem, abychom zajistili, že se všichni shodnou na pořadí transakcí. Decentralizovaný proces konsensu Bitcoinu vyžaduje, aby se uzly v síti neustále pokoušely vytvářet balíčky transakcí nazývané „bloky“. Síť je navržena tak, aby produkovala zhruba jeden blok každých deset minut, přičemž každý blok obsahuje časové razítko, nonce, odkaz na (tj. haš) předchozí blok a seznam všech transakcí, které proběhly od předchozího bloku. Postupem času se tak vytváří trvalý, neustále se rozrůstající „blockchain“, který se neustále aktualizuje, aby představoval nejnovější stav bitcoinové účetní knihy.

Algoritmus pro kontrolu platnosti bloku, vyjádřený v tomto paradigmatu, je následující:

1. Zkontrolujte, zda předchozí blok, na který se blok odkazuje, existuje a je platný.
2. Zkontrolujte, zda je časové razítko bloku větší než časové razítko předchozího bloku<sup>[fn2](#notes)</sup> a menší než 2 hodiny do budoucnosti.
3. Zkontrolujte, zda je důkaz prací na bloku platný.
4. Nechť `S[0]` je stav na konci předchozího bloku.
5. Předpokládejme, že `TX` je seznam transakcí bloku s `n` transakcemi. Pro všechna `i` v `0...n-1`, nastavte `S[i+1] = APPLY(S[i],TX[i])`. Pokud jakákoli aplikace vrátí chybu, ukončete a vraťte false.
6. Vraťte true a zaregistrujte `S[n]` jako stav na konci tohoto bloku.

V podstatě každá transakce v bloku musí poskytnout platný přechod stavu z toho, co byl kanonický stav před provedením transakce, na nějaký nový stav. Všimněte si, že stav není v bloku nijak zakódován; je to čistě abstrakce, kterou si pamatuje ověřovací uzel a lze ji (bezpečně) vypočítat pro jakýkoli blok pouze tak, že se začne od stavu geneze a postupně se aplikuje každá transakce v každém bloku. Kromě toho si všimněte, že záleží na pořadí, v jakém těžař zahrnuje transakce do bloku; pokud jsou v bloku dvě transakce A a B takové, že B utratí UTXO vytvořené A, pak bude blok platný, pokud A přijde před B, ale ne jinak.

Jedinou podmínkou platnosti uvedenou ve výše uvedeném seznamu, která se v jiných systémech nenachází, je požadavek na „důkaz prací“. Přesnou podmínkou je, že dvojitý haš SHA256 každého bloku, považovaný za 256bitové číslo, musí být menší než dynamicky upravený cíl, který je v době psaní tohoto článku přibližně 2<sup>187</sup>. Účelem je, aby bylo vytváření bloků výpočetně „obtížné“, což zabrání Sybil útočníkům v předělání celého blockchainu ve svůj prospěch. Protože SHA256 je navržen jako zcela nepředvídatelná pseudonáhodná funkce, jediným způsobem, jak vytvořit platný blok, je jednoduše metoda pokus-omyl, opakované zvyšování nonce a zjišťování, zda se nový haš shoduje.

Při současném cíli ~2<sup>187</sup> musí síť provést v průměru ~2<sup>69</sup> pokusů, než je nalezen platný blok; obecně je cíl rekalibrován sítí každých 2016 bloků, takže v průměru je nový blok vytvořen nějakým uzlem v síti každých deset minut. Aby byli těžaři za tuto výpočetní práci odměněni, je těžař každého bloku oprávněn zahrnout transakci, která mu z ničeho nic přidělí 25 BTC. Kromě toho, pokud má jakákoli transakce vyšší celkovou nominální hodnotu ve svých vstupech než ve svých výstupech, rozdíl také připadne těžaři jako „transakční poplatek“. Mimochodem, toto je také jediný mechanismus, kterým se vydávají BTC; stav geneze neobsahoval vůbec žádné mince.

Abychom lépe porozuměli účelu těžby, podívejme se, co se stane v případě škodlivého útočníka. Protože základní kryptografie Bitcoinu je známá jako bezpečná, útočník se zaměří na tu část systému Bitcoinu, která není přímo chráněna kryptografií: pořadí transakcí. Strategie útočníka je jednoduchá:

1. Pošlete 100 BTC obchodníkovi výměnou za nějaký produkt (nejlépe rychle dodávané digitální zboží).
2. Počkejte na doručení produktu.
3. Vytvořte další transakci, která pošle stejných 100 BTC sobě.
4. Pokuste se přesvědčit síť, že jeho transakce k sobě samému byla ta, která přišla jako první.

Jakmile proběhne krok (1), po několika minutách nějaký těžař zahrne transakci do bloku, řekněme bloku číslo 270000. Asi po hodině bude do řetězce za tento blok přidáno dalších pět bloků, přičemž každý z těchto bloků nepřímo odkazuje na transakci a tím ji „potvrzuje“. V tomto okamžiku obchodník přijme platbu jako dokončenou a doručí produkt; protože předpokládáme, že se jedná o digitální zboží, doručení je okamžité. Nyní útočník vytvoří další transakci, která posílá 100 BTC sobě. Pokud útočník transakci jednoduše vypustí do světa, nebude zpracována; těžaři se pokusí spustit `APPLY(S,TX)` a všimnou si, že `TX` spotřebovává UTXO, které již není ve stavu. Místo toho útočník vytvoří „větev“ blockchainu tím, že začne těžit další verzi bloku 270000 odkazující na stejný blok 269999 jako rodič, ale s novou transakcí na místě té staré. Protože jsou data bloku odlišná, vyžaduje to přepracování důkazu prací. Kromě toho má nová verze bloku 270000 od útočníka jiný haš, takže původní bloky 270001 až 270005 na ni „neukazují“; původní řetězec a nový řetězec útočníka jsou tedy zcela oddělené. Pravidlem je, že ve větvi je za pravdu považován nejdelší blockchain, a tak legitimní těžaři budou pracovat na řetězci 270005, zatímco útočník sám pracuje na řetězci 270000. Aby útočník učinil svůj blockchain nejdelším, musel by mít více výpočetního výkonu než zbytek sítě dohromady, aby je dohnal (odtud „51% útok“).

### Merkleovy stromy {#merkle-trees}

![SPV v Bitcoinu](./spv-bitcoin.png)

_Vlevo: stačí prezentovat pouze malý počet uzlů v Merkleově stromu, aby se poskytl důkaz o platnosti větve._

_Vpravo: jakýkoli pokus o změnu jakékoli části Merkleova stromu nakonec povede k nekonzistenci někde výše v řetězci._

Důležitou vlastností škálovatelnosti Bitcoinu je, že blok je uložen ve víceúrovňové datové struktuře. „Haš“ bloku je ve skutečnosti pouze haš hlavičky bloku, přibližně 200bajtový kus dat, který obsahuje časové razítko, nonce, haš předchozího bloku a kořenový haš datové struktury zvané Merkleův strom, která ukládá všechny transakce v bloku. Merkleův strom je typ binárního stromu, složený ze sady uzlů s velkým počtem listových uzlů na dně stromu obsahujících podkladová data, sady mezilehlých uzlů, kde každý uzel je hašem svých dvou potomků, a nakonec jednoho kořenového uzlu, také tvořeného hašem svých dvou potomků, představujícího „vrchol“ stromu. Účelem Merkleova stromu je umožnit, aby data v bloku byla doručována po částech: uzel si může stáhnout pouze hlavičku bloku z jednoho zdroje, malou část stromu, která je pro něj relevantní, z jiného zdroje a stále si být jistý, že všechna data jsou správná. Důvodem, proč to funguje, je, že se haše šíří nahoru: pokud se škodlivý uživatel pokusí zaměnit falešnou transakci na dně Merkleova stromu, tato změna způsobí změnu v uzlu nad ním a poté změnu v uzlu nad ním, což nakonec změní kořen stromu a tím i haš bloku, což způsobí, že jej protokol zaregistruje jako zcela odlišný blok (téměř jistě s neplatným důkazem prací).

Protokol Merkleova stromu je pravděpodobně nezbytný pro dlouhodobou udržitelnost. „Plný uzel“ v síti Bitcoin, který ukládá a zpracovává celý obsah každého bloku, zabírá v síti Bitcoin k dubnu 2014 asi 15 GB diskového prostoru a roste o více než gigabajt za měsíc. V současné době je to životaschopné pro některé stolní počítače a ne pro telefony a později v budoucnu se budou moci účastnit pouze podniky a nadšenci. Protokol známý jako „zjednodušené ověření platby“ (SPV) umožňuje existenci další třídy uzlů, nazývaných „lehké uzly“, které stahují hlavičky bloků, ověřují důkaz prací na hlavičkách bloků a poté stahují pouze „větve“ spojené s transakcemi, které jsou pro ně relevantní. To umožňuje lehkým uzlům se silnou zárukou bezpečnosti určit stav jakékoli bitcoinové transakce a jejich aktuální zůstatek, zatímco stahují pouze velmi malou část celého blockchainu.

### Alternativní blockchainové aplikace {#alternative-blockchain-applications}

Myšlenka převzetí základní myšlenky blockchainu a její aplikace na jiné koncepty má také dlouhou historii. V roce 2005 přišel Nick Szabo s konceptem „[bezpečných vlastnických titulů s autoritou vlastníka](https://nakamotoinstitute.org/library/secure-property-titles/)“, dokumentem popisujícím, jak „nové pokroky v technologii replikovaných databází“ umožní vytvořit systém založený na blockchainu pro ukládání registru toho, kdo vlastní jakou půdu, a vytvořit tak propracovaný rámec zahrnující koncepty, jako je usedlost, vydržení a georgiánská daň z pozemků. Bohužel v té době nebyl k dispozici žádný účinný replikovaný databázový systém, a tak protokol nebyl nikdy v praxi implementován. Po roce 2009, jakmile byl vyvinut decentralizovaný konsensus Bitcoinu, se však rychle začaly objevovat řady alternativních aplikací.

- **Namecoin** – vytvořený v roce 2010, [Namecoin](https://namecoin.org/) lze nejlépe popsat jako decentralizovanou databázi pro registraci jmen. V decentralizovaných protokolech jako Tor, Bitcoin a BitMessage musí existovat nějaký způsob identifikace účtů, aby s nimi mohli ostatní lidé interagovat, ale ve všech stávajících řešeních je jediným dostupným druhem identifikátoru pseudonáhodný haš jako `1LW79wp5ZBqaHW1jL5TCiBCrhQYtHagUWy`. V ideálním případě by si člověk přál mít účet se jménem jako „george“. Problémem však je, že pokud si jedna osoba může vytvořit účet s názvem „george“, pak někdo jiný může použít stejný postup k registraci „george“ pro sebe a vydávat se za ni. Jediným řešením je paradigma „kdo dřív přijde, ten dřív mele“, kde první registrátor uspěje a druhý selže – problém dokonale vhodný pro konsensuální protokol Bitcoinu. Namecoin je nejstarší a nejúspěšnější implementací systému registrace jmen využívajícího takovou myšlenku.
- **Barevné mince** – účelem [barevných mincí](https://docs.google.com/a/buterin.com/document/d/1AnkP_cVZTCMLIzw4DvsW6M8Q2JC0lIzrTLuoWu2z1BE/edit) je sloužit jako protokol, který lidem umožňuje vytvářet si vlastní digitální měny – nebo, v důležitém triviálním případě měny s jednou jednotkou, digitální tokeny na bitcoinovém blockchainu. V protokolu barevných mincí se „vydává“ nová měna veřejným přiřazením barvy konkrétnímu bitcoinovému UTXO a protokol rekurzivně definuje barvu ostatních UTXO tak, aby byla stejná jako barva vstupů, které transakce, jež je vytvořila, utratila (v případě vstupů se smíšenými barvami platí některá zvláštní pravidla). To umožňuje uživatelům udržovat peněženky obsahující pouze UTXO určité barvy a posílat je podobně jako běžné bitcoiny, přičemž zpětně procházejí blockchainem, aby určili barvu jakéhokoli UTXO, které obdrží.
- **Metacoiny** – myšlenkou metacoinu je mít protokol, který žije nad Bitcoinem, používá bitcoinové transakce k ukládání transakcí metacoinů, ale má jinou funkci přechodu stavu, `APPLY'`. Protože protokol metacoinů nemůže zabránit tomu, aby se v bitcoinovém blockchainu objevovaly neplatné transakce metacoinů, je přidáno pravidlo, že pokud `APPLY'(S,TX)` vrátí chybu, protokol se ve výchozím nastavení vrátí k `APPLY'(S,TX) = S`. To poskytuje snadný mechanismus pro vytvoření libovolného protokolu kryptoměny, potenciálně s pokročilými funkcemi, které nelze implementovat uvnitř samotného Bitcoinu, ale s velmi nízkými náklady na vývoj, protože složitosti těžby a sítí jsou již řešeny protokolem Bitcoinu. Metacoiny byly použity k implementaci některých tříd finančních kontraktů, registrace jmen a decentralizované směny.

Obecně tedy existují dva přístupy k budování konsensuálního protokolu: vybudování nezávislé sítě a vybudování protokolu nad Bitcoinem. První přístup, i když je v případě aplikací jako Namecoin poměrně úspěšný, je obtížné implementovat; každá jednotlivá implementace potřebuje nabootstrapovat nezávislý blockchain, stejně jako vybudovat a otestovat veškerý nezbytný kód pro přechod stavu a síťování. Kromě toho předpovídáme, že sada aplikací pro technologii decentralizovaného konsensu bude následovat rozdělení mocninného zákona, kde by drtivá většina aplikací byla příliš malá na to, aby si zasloužila vlastní blockchain, a poznamenáváme, že existují velké třídy decentralizovaných aplikací, zejména decentralizované autonomní organizace, které spolu musí interagovat.

Přístup založený na Bitcoinu má na druhou stranu tu chybu, že nedědí funkce zjednodušeného ověření platby Bitcoinu. SPV funguje pro Bitcoin, protože může použít hloubku blockchainu jako zástupce pro platnost; v určitém okamžiku, jakmile předkové transakce sahají dostatečně daleko do minulosti, lze s jistotou říci, že byli legitimní součástí stavu. Meta-protokoly založené na blockchainu na druhou stranu nemohou donutit blockchain, aby nezahrnoval transakce, které nejsou platné v kontextu jejich vlastních protokolů. Proto by plně bezpečná implementace SPV meta-protokolu musela zpětně prohledat celý bitcoinový blockchain až na začátek, aby se zjistilo, zda jsou určité transakce platné. V současné době se všechny „lehké“ implementace meta-protokolů založených na Bitcoinu spoléhají na důvěryhodný server, který poskytuje data, což je pravděpodobně vysoce suboptimální výsledek, zejména když jedním z hlavních účelů kryptoměny je eliminovat potřebu důvěry.

### Skriptování {#scripting}

I bez jakýchkoli rozšíření bitcoinový protokol ve skutečnosti umožňuje slabou verzi konceptu „chytrých kontraktů“. UTXO v Bitcoinu mohou být vlastněny nejen veřejným klíčem, ale také složitějším skriptem vyjádřeným v jednoduchém programovacím jazyce založeném na zásobníku. V tomto paradigmatu musí transakce utrácející toto UTXO poskytnout data, která vyhovují skriptu. Dokonce i základní mechanismus vlastnictví veřejného klíče je implementován prostřednictvím skriptu: skript přijímá jako vstup podpis eliptické křivky, ověřuje jej proti transakci a adrese, která vlastní UTXO, a vrací 1, pokud je ověření úspěšné, a 0 jinak. Existují i další, složitější skripty pro různé další případy použití. Například lze sestavit skript, který k ověření vyžaduje podpisy od dvou z daných tří soukromých klíčů („multisig“), což je nastavení užitečné pro firemní účty, zabezpečené spořicí účty a některé situace úschovy u obchodníka. Skripty lze také použít k placení odměn za řešení výpočetních problémů a lze dokonce sestavit skript, který říká něco jako „toto bitcoinové UTXO je vaše, pokud můžete poskytnout SPV důkaz, že jste mi poslali transakci Dogecoinu této nominální hodnoty“, což v podstatě umožňuje decentralizovanou směnu mezi kryptoměnami.

Skriptovací jazyk implementovaný v Bitcoinu má však několik důležitých omezení:

- **Nedostatek Turingovy úplnosti** – to znamená, že i když existuje velká podmnožina výpočtů, které skriptovací jazyk Bitcoinu podporuje, zdaleka nepodporuje vše. Hlavní chybějící kategorií jsou smyčky. Děje se tak, aby se zabránilo nekonečným smyčkám během ověřování transakcí; teoreticky je to pro programátory skriptů překonatelná překážka, protože jakoukoli smyčku lze simulovat jednoduchým opakováním podkladového kódu mnohokrát s příkazem if, ale vede to ke skriptům, které jsou velmi prostorově neefektivní. Například implementace alternativního algoritmu podpisu eliptické křivky by pravděpodobně vyžadovala 256 opakovaných kol násobení, všechna jednotlivě zahrnutá v kódu.
- **Slepota vůči hodnotě** – neexistuje způsob, jak by skript UTXO poskytoval jemnozrnnou kontrolu nad částkou, kterou lze vybrat. Například jedním z mocných případů použití orákulového kontraktu by byl zajišťovací kontrakt, kde A a B vloží BTC v hodnotě 1000 USD a po 30 dnech skript pošle BTC v hodnotě 1000 USD straně A a zbytek straně B. To by vyžadovalo orákulum, aby určilo hodnotu 1 BTC v USD, ale i tak je to obrovské zlepšení z hlediska požadavků na důvěru a infrastrukturu oproti plně centralizovaným řešením, která jsou nyní k dispozici. Jelikož jsou však UTXO typu „všechno nebo nic“, jediným způsobem, jak toho dosáhnout, je velmi neefektivní hack spočívající v tom, že máme mnoho UTXO různých nominálních hodnot (např. jedno UTXO 2<sup>k</sup> pro každé k až do 30) a orákulum vybírá, které UTXO pošle A a které B.
- **Nedostatek stavu** – UTXO mohou být buď utracené, nebo neutracené; neexistuje příležitost pro vícestupňové kontrakty nebo skripty, které by si uchovávaly jakýkoli jiný vnitřní stav nad rámec toho. To ztěžuje vytváření vícestupňových opčních kontraktů, nabídek decentralizované směny nebo dvoustupňových kryptografických závazkových protokolů (nezbytných pro bezpečné výpočetní odměny). Znamená to také, že UTXO lze použít pouze k vytváření jednoduchých, jednorázových kontraktů a ne složitějších „stavových“ kontraktů, jako jsou decentralizované organizace, a ztěžuje implementaci meta-protokolů. Binární stav v kombinaci se slepotou vůči hodnotě také znamená, že další důležitá aplikace, limity pro výběr, je nemožná.
- **Slepota vůči blockchainu** – UTXO jsou slepé vůči datům blockchainu, jako je nonce, časové razítko a haš předchozího bloku. To výrazně omezuje aplikace v hazardních hrách a několika dalších kategoriích tím, že zbavuje skriptovací jazyk potenciálně cenného zdroje náhodnosti.

Vidíme tedy tři přístupy k budování pokročilých aplikací nad kryptoměnou: vybudování nového blockchainu, použití skriptování nad Bitcoinem a vybudování meta-protokolu nad Bitcoinem. Budování nového blockchainu umožňuje neomezenou svobodu při budování sady funkcí, ale za cenu času na vývoj, úsilí o bootstrapování a bezpečnosti. Použití skriptování je snadné implementovat a standardizovat, ale je velmi omezené ve svých schopnostech, a meta-protokoly, i když snadné, trpí chybami ve škálovatelnosti. S Ethereem máme v úmyslu vybudovat alternativní rámec, který poskytuje ještě větší zisky ve snadnosti vývoje a také ještě silnější vlastnosti lehkého klienta, a zároveň umožňuje aplikacím sdílet ekonomické prostředí a bezpečnost blockchainu.

## Ethereum {#ethereum}

Záměrem Etherea je vytvořit alternativní protokol pro budování decentralizovaných aplikací, který poskytuje jinou sadu kompromisů, o kterých se domníváme, že budou velmi užitečné pro velkou třídu decentralizovaných aplikací, se zvláštním důrazem na situace, kde je důležitá rychlá doba vývoje, bezpečnost pro malé a zřídka používané aplikace a schopnost různých aplikací velmi efektivně interagovat. Ethereum to dělá tím, že buduje to, co je v podstatě ultimátní abstraktní základní vrstva: blockchain s vestavěným Turing-úplným programovacím jazykem, který umožňuje komukoli psát chytré kontrakty a decentralizované aplikace, kde si mohou vytvářet vlastní libovolná pravidla pro vlastnictví, formáty transakcí a funkce přechodu stavu. Základní verze Namecoinu může být napsána ve dvou řádcích kódu a další protokoly, jako jsou měny a reputační systémy, mohou být vytvořeny za méně než dvacet. Chytré kontrakty, kryptografické „schránky“, které obsahují hodnotu a odemknou ji pouze v případě splnění určitých podmínek, lze také postavit na této platformě, s mnohem větší mocí než nabízí skriptování Bitcoinu, a to díky přidaným schopnostem Turingovy úplnosti, povědomí o hodnotě, povědomí o blockchainu a stavu.

### Účty Etherea {#ethereum-accounts}

V Ethereu je stav tvořen objekty zvanými „účty“, přičemž každý účet má 20bajtovou adresu a přechody stavu jsou přímé převody hodnoty a informací mezi účty. Účet Etherea obsahuje čtyři pole:

- **Nonce**, čítač používaný k zajištění, že každá transakce může být zpracována pouze jednou.
- Aktuální **zůstatek etheru** na účtu.
- **Kód kontraktu** účtu, pokud existuje.
- **Úložiště** účtu (ve výchozím nastavení prázdné).

„Ether“ je hlavní interní krypto-palivo Etherea a používá se k placení transakčních poplatků. Obecně existují dva typy účtů: **externě vlastněné účty**, ovládané soukromými klíči, a **kontraktní účty**, ovládané jejich kódem kontraktu. Externě vlastněný účet nemá žádný kód a z externě vlastněného účtu lze posílat zprávy vytvořením a podepsáním transakce; v kontraktním účtu se při každém přijetí zprávy aktivuje jeho kód, což mu umožňuje číst a zapisovat do interního úložiště a posílat další zprávy nebo naopak vytvářet kontrakty.

Všimněte si, že „kontrakty“ v Ethereu by neměly být vnímány jako něco, co by se mělo „plnit“ nebo „dodržovat“; spíše se podobají „autonomním agentům“, kteří žijí uvnitř exekučního prostředí Etherea, vždy provádějí specifický kus kódu, když jsou „pošťouchnuti“ zprávou nebo transakcí, a mají přímou kontrolu nad svým vlastním zůstatkem etheru a svým vlastním úložištěm klíč/hodnota pro sledování trvalých proměnných.

### Zprávy a transakce {#messages-and-transactions}

Termín „transakce“ se v Ethereu používá k označení podepsaného datového balíčku, který ukládá zprávu, která má být odeslána z externě vlastněného účtu. Transakce obsahují:

- Příjemce zprávy
- Podpis identifikující odesílatele
- Množství etheru k převodu od odesílatele k příjemci
- Volitelné datové pole
- Hodnota `STARTGAS`, představující maximální počet výpočetních kroků, které může exekuce transakce provést.
- Hodnota `GASPRICE`, představující poplatek, který odesílatel platí za výpočetní krok.

První tři jsou standardní pole očekávaná v jakékoli kryptoměně. Datové pole nemá ve výchozím nastavení žádnou funkci, ale virtuální stroj má operační kód, pomocí kterého může kontrakt přistupovat k datům; jako příklad použití, pokud kontrakt funguje jako služba registrace domén na blockchainu, pak si může přát interpretovat data, která mu jsou předávána, jako obsahující dvě „pole“, první pole je doména k registraci a druhé pole je IP adresa, na kterou se má zaregistrovat. Kontrakt by si přečetl tyto hodnoty z dat zprávy a vhodně je umístil do úložiště.

Pole `STARTGAS` a `GASPRICE` jsou klíčová pro model Etherea proti útokům odepření služby. Aby se zabránilo náhodným nebo nepřátelským nekonečným smyčkám nebo jinému plýtvání výpočetními prostředky v kódu, musí každá transakce nastavit limit, kolik výpočetních kroků exekuce kódu může použít. Základní jednotkou výpočtu je „palivo“; obvykle stojí výpočetní krok 1 jednotku paliva, ale některé operace stojí vyšší množství paliva, protože jsou výpočetně náročnější nebo zvyšují množství dat, která musí být uložena jako součást stavu. Za každý bajt v datech transakce se také účtuje poplatek 5 jednotek paliva. Záměrem systému poplatků je vyžadovat od útočníka, aby platil úměrně za každý zdroj, který spotřebuje, včetně výpočtů, šířky pásma a úložiště; proto každá transakce, která vede k tomu, že síť spotřebuje větší množství kteréhokoli z těchto zdrojů, musí mít poplatek za palivo zhruba úměrný přírůstku.

### Zprávy {#messages}

Kontrakty mají schopnost posílat „zprávy“ jiným kontraktům. Zprávy jsou virtuální objekty, které se nikdy neserializují a existují pouze v exekučním prostředí Etherea. Zpráva obsahuje:

- Odesílatel zprávy (implicitní)
- Příjemce zprávy
- Množství etheru k převodu spolu se zprávou
- Volitelné datové pole
- Hodnota `STARTGAS`

V podstatě je zpráva jako transakce, s tím rozdílem, že je vytvořena kontraktem a ne externím aktérem. Zpráva se vytvoří, když kontrakt, který právě provádí kód, provede operační kód `CALL`, který vytvoří a provede zprávu. Stejně jako transakce vede zpráva k tomu, že účet příjemce spustí svůj kód. Kontrakty tedy mohou mít vztahy s jinými kontrakty přesně stejným způsobem jako externí aktéři.

Všimněte si, že povolené množství paliva přiřazené transakcí nebo kontraktem se vztahuje na celkové množství paliva spotřebované danou transakcí a všemi dílčími exekucemi. Například, pokud externí aktér A pošle transakci B s 1000 jednotkami paliva, a B spotřebuje 600 jednotek paliva před odesláním zprávy C, a interní exekuce C spotřebuje 300 jednotek paliva před návratem, pak B může utratit dalších 100 jednotek paliva, než mu palivo dojde.

### Funkce přechodu stavu Etherea {#ethereum-state-transition-function}

![Přechod stavu etheru](./ether-state-transition.png)

Funkci přechodu stavu Etherea, `APPLY(S,TX) -> S'`, lze definovat takto:

1. Zkontrolujte, zda je transakce dobře zformovaná (tj. má správný počet hodnot), podpis je platný a nonce se shoduje s nonce v účtu odesílatele. Pokud ne, vrátí chybu.
2. Vypočítejte transakční poplatek jako `STARTGAS * GASPRICE` a z podpisu určete odesílající adresu. Odečtěte poplatek ze zůstatku účtu odesílatele a zvyšte nonce odesílatele. Pokud není dostatečný zůstatek k útratě, vrátí chybu.
3. Inicializujte `GAS = STARTGAS` a odeberte určité množství paliva za bajt na zaplacení bajtů v transakci.
4. Převeďte hodnotu transakce z účtu odesílatele na účet příjemce. Pokud přijímající účet ještě neexistuje, vytvořte jej. Pokud je přijímající účet kontrakt, spusťte kód kontraktu buď do dokončení, nebo dokud exekuci nedojde palivo.
5. Pokud se převod hodnoty nezdařil, protože odesílatel neměl dostatek peněz, nebo exekuci kódu došlo palivo, vraťte všechny změny stavu s výjimkou platby poplatků a přidejte poplatky na účet těžaře.
6. V opačném případě vraťte poplatky za veškeré zbývající palivo odesílateli a pošlete poplatky zaplacené za spotřebované palivo těžaři.

Předpokládejme například, že kód kontraktu je:

```py
if !self.storage[calldataload(0)]:
  self.storage[calldataload(0)] = calldataload(32)
```

Všimněte si, že ve skutečnosti je kód kontraktu napsán v nízkoúrovňovém kódu EVM; tento příklad je pro přehlednost napsán v Serpentu, jednom z našich vysokoúrovňových jazyků, a lze jej zkompilovat do kódu EVM. Předpokládejme, že úložiště kontraktu je na začátku prázdné a je odeslána transakce s hodnotou 10 etherů, 2000 jednotek paliva, cenou paliva 0,001 etheru a 64 bajty dat, přičemž bajty 0-31 představují číslo `2` a bajty 32-63 představují řetězec `CHARLIE`. Proces funkce přechodu stavu v tomto případě je následující:

1. Zkontrolujte, zda je transakce platná a dobře formátovaná.
2. Zkontrolujte, zda má odesílatel transakce alespoň 2000 \* 0,001 = 2 ethery. Pokud ano, odečtěte 2 ethery z účtu odesílatele.
3. Inicializujte palivo = 2000; za předpokladu, že transakce je 170 bajtů dlouhá a poplatek za bajt je 5, odečtěte 850, takže zbývá 1150 jednotek paliva.
4. Odečtěte dalších 10 etherů z účtu odesílatele a přidejte je na účet kontraktu.
5. Spusťte kód. V tomto případě je to jednoduché: zkontroluje, zda je použito úložiště kontraktu na indexu `2`, všimne si, že není, a tak nastaví úložiště na indexu `2` na hodnotu `CHARLIE`. Předpokládejme, že to zabere 187 jednotek paliva, takže zbývající množství paliva je 1150 - 187 = 963.
6. Přidejte 963 \* 0,001 = 0,963 etheru zpět na účet odesílatele a vraťte výsledný stav.

Pokud by na přijímajícím konci transakce nebyl žádný kontrakt, pak by celkový transakční poplatek byl jednoduše roven poskytnuté ceně `GASPRICE` vynásobené délkou transakce v bajtech a data odeslaná spolu s transakcí by byla irelevantní.

Všimněte si, že zprávy fungují ekvivalentně transakcím, pokud jde o vrácení změn: pokud exekuci zprávy dojde palivo, pak se exekuce této zprávy a všechny ostatní exekuce spuštěné touto exekucí vrátí, ale rodičovské exekuce se vracet nemusí. To znamená, že je „bezpečné“, aby kontrakt volal jiný kontrakt, protože pokud A volá B s G jednotkami paliva, pak exekuce A zaručeně ztratí maximálně G jednotek paliva. Nakonec si všimněte, že existuje operační kód `CREATE`, který vytváří kontrakt; jeho exekuční mechanika je obecně podobná `CALL`, s výjimkou, že výstup exekuce určuje kód nově vytvořeného kontraktu.

### Exekuce kódu {#code-execution}

Kód v kontraktech Etherea je napsán v nízkoúrovňovém, zásobníkovém bajtkódovém jazyce, označovaném jako „kód virtuálního stroje Etherea“ nebo „kód EVM“. Kód se skládá z řady bajtů, kde každý bajt představuje operaci. Obecně platí, že exekuce kódu je nekonečná smyčka, která spočívá v opakovaném provádění operace na aktuálním programovém čítači (který začíná na nule) a následném zvýšení programového čítače o jedna, dokud není dosaženo konce kódu nebo není detekována chyba nebo instrukce `STOP` či `RETURN`. Operace mají přístup ke třem typům prostoru pro ukládání dat:

- **Zásobník**, kontejner typu „poslední dovnitř, první ven“, do kterého lze hodnoty vkládat a odebírat.
- **Paměť**, nekonečně rozšiřitelné pole bajtů.
- Dlouhodobé **úložiště** kontraktu, úložiště klíč/hodnota. Na rozdíl od zásobníku a paměti, které se po skončení výpočtu resetují, úložiště přetrvává dlouhodobě.

Kód může také přistupovat k hodnotě, odesílateli a datům příchozí zprávy, stejně jako k datům hlavičky bloku, a kód může také vrátit pole bajtů dat jako výstup.

Formální model provádění EVM kódu je překvapivě jednoduchý. Během chodu Ethereum Virtual Machine (EVM) může být jeho úplný výpočetní stav definován n-ticí `(block_state, transaction, message, code, memory, stack, pc, gas)`, kde `block_state` je globální stav obsahující všechny účty a zahrnující jejich zůstatky a úložiště. Na začátku každého kola provádění je aktuální instrukce nalezena tak, že se vezme `pc`-tý bajt `kódu` (nebo 0, pokud `pc >= len(code)`), a každá instrukce má svou vlastní definici z hlediska toho, jak ovlivňuje danou n-tici. Například `ADD` sejme dvě položky ze zásobníku a vloží jejich součet, sníží `palivo` o 1, navýší `pc` o 1 a `SSTORE` sejme dvě vrchní položky ze zásobníku a vloží druhou položku do úložiště kontraktu na index určený první položkou. Ačkoliv existuje mnoho způsobů, jak optimalizovat provádění Ethereum Virtual Machine (EVM) pomocí kompilace just-in-time, základní implementace Etherea může být napsána na několika stech řádcích kódu.

### Blockchain a těžba {#blockchain-and-mining}

![Diagram použití bloku v Ethereu](./ethereum-apply-block-diagram.png)

Blockchain Etherea je v mnoha ohledech podobný blockchainu Bitcoinu, ačkoli má některé rozdíly. Hlavním rozdílem mezi Ethereem a Bitcoinem s ohledem na architekturu blockchainu je, že na rozdíl od Bitcoinu obsahují bloky Etherea kopii seznamu transakcí i nejnovějšího stavu. Kromě toho jsou v bloku uloženy také dvě další hodnoty, číslo bloku a obtížnost. Základní algoritmus validace bloku v Ethereu je následující:

1. Zkontrolujte, zda odkazovaný předchozí blok existuje a je platný.
2. Zkontrolujte, zda je časové razítko bloku větší než časové razítko odkazovaného předchozího bloku a není víc než 15 minut v budoucnosti.
3. Zkontrolujte, zda jsou platné číslo bloku, obtížnost, kořen transakce, kořen strýce a palivový limit (různé nízkoúrovňové koncepty specifické pro Ethereum).
4. Zkontrolujte, zda je důkaz prací na bloku platný.
5. Nechť `S[0]` je stav na konci předchozího bloku.
6. Nechť `TX` je seznam transakcí bloku, s `n` transakcemi. Pro všechna `i` v `0...n-1`, nastavte `S[i+1] = APPLY(S[i],TX[i])`. Pokud některá z aplikací vrátí chybu, nebo pokud celkové spotřebované palivo v bloku až do tohoto bodu překročí `GASLIMIT`, vraťte chybu.
7. Nechť `S_FINAL` je `S[n]`, ale s připočtením odměny za blok vyplacené těžaři.
8. Zkontrolujte, zda je kořen Merkleova stromu stavu `S_FINAL` roven konečnému kořenu stavu uvedenému v záhlaví bloku. Pokud ano, blok je platný; jinak platný není.

Tento přístup se může na první pohled zdát velmi neefektivní, protože u každého bloku je potřeba ukládat celý stav, ale ve skutečnosti by měla být efektivita srovnatelná s efektivitou Bitcoinu. Důvodem je, že stav je uložen ve stromové struktuře a po každém bloku je třeba změnit jen malou část stromu. Obecně platí, že mezi dvěma sousedními bloky by velká většina stromu měla být stejná, a proto mohou být data uložena jednou a dvakrát odkazována pomocí ukazatelů (tj. hašů podstromů). K dosažení tohoto cíle se používá speciální druh stromu známý jako „strom Patricia“, včetně úpravy konceptu Merkleova stromu, která umožňuje efektivně vkládat a mazat uzly, a nejen je měnit. Navíc, protože všechny informace o stavu jsou součástí posledního bloku, není nutné ukládat celou historii blockchainu – strategie, u níž lze spočítat, že pokud by mohla být aplikována na Bitcoin, poskytla by 5–20× úsporu místa.

Často kladenou otázkou je, „kde“ se kód kontraktu provádí, pokud jde o fyzický hardware. Odpověď je jednoduchá: proces provádění kódu kontraktu je součástí definice funkce přechodu stavu, která je součástí algoritmu validace bloku, takže pokud je transakce přidána do bloku `B`, spuštění kódu vyvolané touto transakcí bude provedeno všemi uzly, nyní i v budoucnu, které si stáhnou a validují blok `B`.

## Aplikace {#applications}

Obecně existují tři typy aplikací nad Ethereem. První kategorií jsou finanční aplikace, které uživatelům poskytují výkonnější způsoby správy a uzavírání smluv s použitím jejich peněz. To zahrnuje dílčí měny, finanční deriváty, zajišťovací smlouvy, spořicí peněženky, závěti a nakonec i některé třídy plnohodnotných pracovních smluv. Druhou kategorií jsou polofinanční aplikace, kde jde o peníze, ale je zde také silná nepeněžní stránka toho, co se děje; dokonalým příkladem jsou samočinně vynutitelné odměny za řešení výpočetních problémů. Nakonec jsou zde aplikace jako online hlasování a decentralizované řízení, které nejsou vůbec finanční.

### Tokenové systémy {#token-systems}

Tokenové systémy na blockchainu mají mnoho aplikací, od dílčích měn představujících aktiva jako USD nebo zlato až po akcie společností, jednotlivé tokeny představující chytrý majetek, zabezpečené nepadělatelné kupony, a dokonce i tokenové systémy bez jakékoli vazby na konvenční hodnotu, používané jako bodové systémy pro motivaci. Tokenové systémy lze v Ethereu implementovat překvapivě snadno. Klíčovým bodem k pochopení je, že měna nebo tokenový systém je v podstatě databáze s jednou operací: odečíst X jednotek od A a dát X jednotek B za podmínky, že (i) A mělo před transakcí alespoň X jednotek a (2) transakce je schválena A. K implementaci tokenového systému stačí implementovat tuto logiku do kontraktu.

Základní kód pro implementaci tokenového systému v Serpentu vypadá následovně:

```py
def send(to, value):
  if self.storage[msg.sender] >= value:
    self.storage[msg.sender] = self.storage[msg.sender] - value
    self.storage[to] = self.storage[to] + value
```

Jedná se v podstatě o doslovnou implementaci funkce přechodu stavu „bankovního systému“ popsané výše v tomto dokumentu. Je třeba přidat několik řádků kódu navíc, aby se zajistil počáteční krok distribuce měnových jednotek a několik dalších okrajových případů, a v ideálním případě by se měla přidat funkce, která by ostatním kontraktům umožnila dotazovat se na zůstatek na adrese. Ale to je vše. Teoreticky mohou tokenové systémy založené na Ethereu, které fungují jako dílčí měny, potenciálně zahrnovat další důležitou funkci, kterou onchain meta-měny založené na Bitcoinu postrádají: schopnost platit transakční poplatky přímo v dané měně. Způsob, jakým by to bylo implementováno, je, že kontrakt by si udržoval zůstatek etherů, z něhož by vracel ethery použité na zaplacení poplatků odesílateli, a tento zůstatek by doplňoval sběrem interních měnových jednotek, které přijímá na poplatcích, a jejich dalším prodejem v neustále probíhající aukci. Uživatelé by tak museli „aktivovat“ své účty pomocí etherů, ale jakmile tam ethery jsou, byly by opakovaně použitelné, protože kontrakt by je pokaždé vrátil.

### Finanční deriváty a měny se stabilní hodnotou {#financial-derivatives-and-stable-value-currencies}

Finanční deriváty jsou nejběžnější aplikací „chytrého kontraktu“ a jednou z nejjednodušších na implementaci v kódu. Hlavní výzvou při implementaci finančních kontraktů je, že většina z nich vyžaduje odkaz na externí cenový ticker; například velmi žádanou aplikací je chytrý kontrakt, který zajišťuje proti volatilitě etheru (nebo jiné kryptoměny) vůči americkému dolaru, ale to vyžaduje, aby kontrakt znal hodnotu ETH/USD. Nejjednodušším způsobem, jak toho dosáhnout, je prostřednictvím kontraktu „datového zdroje“ udržovaného konkrétní stranou (např. NASDAQ), který je navržen tak, aby tato strana mohla kontrakt podle potřeby aktualizovat, a poskytuje rozhraní, které umožňuje ostatním kontraktům poslat zprávu tomuto kontraktu a získat zpět odpověď, která poskytuje cenu.

S touto kritickou složkou by zajišťovací smlouva vypadala následovně:

1. Počkejte, až strana A vloží 1000 etherů.
2. Počkejte, až strana B vloží 1000 etherů.
3. Zaznamenejte hodnotu 1000 etherů v USD, vypočtenou dotazem na kontrakt datového kanálu, do úložiště; řekněme, že je to $x.
4. Po 30 dnech povolte straně A nebo B „reaktivovat“ kontrakt, aby se odeslaly ethery v hodnotě $x (vypočteno opětovným dotazem na kontrakt datového kanálu pro získání nové ceny) straně A a zbytek straně B.

Takový kontrakt by měl značný potenciál v krypto-obchodu. Jedním z hlavních problémů uváděných v souvislosti s kryptoměnami je skutečnost, že jsou volatilní; ačkoli mnoho uživatelů a obchodníků může chtít bezpečnost a pohodlí při nakládání s kryptografickými aktivy, nemusí si přát čelit vyhlídce na ztrátu 23 % hodnoty svých prostředků během jediného dne. Až dosud byla nejčastěji navrhovaným řešením aktiva krytá emitentem. Myšlenka je taková, že emitent vytvoří dílčí měnu, ve které má právo vydávat a odvolávat jednotky, a poskytne jednu jednotku měny každému, kdo mu (offline) poskytne jednu jednotku určeného podkladového aktiva (např. zlato, USD). Emitent pak slíbí, že poskytne jednu jednotku podkladového aktiva každému, kdo pošle zpět jednu jednotku kryptoaktiva. Tento mechanismus umožňuje „povýšit“ jakékoli nekryptografické aktivum na kryptografické aktivum za předpokladu, že emitent je důvěryhodný.

V praxi však emitenti nejsou vždy důvěryhodní a v některých případech je bankovní infrastruktura příliš slabá nebo příliš nepřátelská na to, aby takové služby existovaly. Finanční deriváty poskytují alternativu. Zde, namísto jediného emitenta poskytujícího prostředky na krytí aktiva, hraje tuto roli decentralizovaný trh spekulantů, kteří sázejí na to, že cena kryptografického referenčního aktiva (např. ETH) poroste. Na rozdíl od emitentů nemají spekulanti možnost nesplnit svou část dohody, protože zajišťovací smlouva drží jejich prostředky v úschově. Všimněte si, že tento přístup není plně decentralizovaný, protože k poskytnutí cenového tickeru je stále zapotřebí důvěryhodný zdroj, i když je to pravděpodobně stále obrovské zlepšení, pokud jde o snížení požadavků na infrastrukturu (na rozdíl od role emitenta, vydávání cenového kanálu nevyžaduje žádné licence a lze jej pravděpodobně kategorizovat jako svobodu projevu) a snížení potenciálu podvodů.

### Systémy identity a reputace {#identity-and-reputation-systems}

Nejstarší alternativní kryptoměna vůbec, [Namecoin](http://namecoin.org/), se pokusila použít blockchain podobný Bitcoinu k poskytnutí systému registrace jmen, kde si uživatelé mohou registrovat svá jména ve veřejné databázi spolu s dalšími daty. Hlavním uváděným případem použití je systém [DNS](https://wikipedia.org/wiki/Domain_Name_System), který mapuje názvy domén jako „bitcoin.org“ (nebo v případě Namecoinu „bitcoin.bit“) na IP adresu. Další případy použití zahrnují ověřování e-mailů a potenciálně pokročilejší systémy reputace. Zde je základní kontrakt pro poskytnutí systému registrace jmen podobného Namecoinu v síti Ethereum:

```py
def register(name, value):
  if !self.storage[name]:
    self.storage[name] = value
```

Kontrakt je velmi jednoduchý; je to pouze databáze uvnitř sítě Ethereum, do které lze přidávat, ale nikoli ji upravovat nebo z ní odstraňovat. Kdokoli si může zaregistrovat jméno s nějakou hodnotou a tato registrace pak zůstane navždy. Sofistikovanější kontrakt pro registraci jmen bude mít také „funkční klauzuli“, která umožní ostatním kontraktům, aby se na něj dotazovaly, a také mechanismus pro „vlastníka“ (tj. prvního registrátora) jména ke změně dat nebo převodu vlastnictví. Navrch lze dokonce přidat funkce reputace a sítě důvěry.

### Decentralizované úložiště souborů {#decentralized-file-storage}

V posledních několika letech se objevila řada populárních online startupů pro ukládání souborů, z nichž nejvýznamnější je Dropbox, které se snaží uživatelům umožnit nahrát zálohu svého pevného disku a nechat službu zálohu uložit a umožnit uživateli k ní přistupovat výměnou za měsíční poplatek. V současnosti je však trh s ukládáním souborů občas relativně neefektivní; letmý pohled na různá stávající řešení ukazuje, že zejména na úrovni „uncanny valley“ 20–200 GB, kde nefungují ani bezplatné kvóty, ani slevy na podnikové úrovni, jsou měsíční ceny za běžné ukládání souborů takové, že za jeden měsíc zaplatíte více než náklady na celý pevný disk. Kontrakty Etherea mohou umožnit rozvoj decentralizovaného ekosystému pro ukládání souborů, kde si jednotliví uživatelé mohou vydělávat malé částky peněz pronájmem svých vlastních pevných disků a nevyužité místo lze využít k dalšímu snížení nákladů na ukládání souborů.

Klíčovým základním kamenem takového zařízení by bylo to, co jsme nazvali „decentralizovaný kontrakt Dropbox“. Tento kontrakt funguje následovně. Nejprve se požadovaná data rozdělí na bloky, každý blok se zašifruje pro ochranu soukromí a z nich se vytvoří Merkleův strom. Poté se vytvoří kontrakt s pravidlem, že každých N bloků kontrakt vybere náhodný index v Merkleově stromě (s použitím hashe předchozího bloku, který je přístupný z kódu kontraktu, jako zdroje náhodnosti) a dá X etherů první entitě, která dodá transakci s důkazem vlastnictví bloku na daném indexu ve stromě podobným zjednodušenému ověření platby. Když si uživatel chce znovu stáhnout svůj soubor, může k jeho obnovení použít protokol mikroplatebního kanálu (např. zaplatit 1 szabo za 32 kilobajtů). Poplatkově nejefektivnější přístup je, aby plátce nezveřejňoval transakci až do konce, ale místo toho po každých 32 kilobajtech nahradil transakci o něco lukrativnější se stejnou hodnotou nonce.

Důležitou vlastností protokolu je, že ačkoli se může zdát, že se spoléháte na mnoho náhodných uzlů, že se nerozhodnou soubor zapomenout, toto riziko lze snížit téměř na nulu rozdělením souboru na mnoho částí pomocí sdílení tajemství a sledováním kontraktů, abyste viděli, že každá část je stále v držení některého uzlu. Pokud kontrakt stále vyplácí peníze, poskytuje to kryptografický důkaz, že někdo tam venku stále ukládá soubor.

### Decentralizované autonomní organizace {#decentralized-autonomous-organizations}

Obecný koncept „decentralizované autonomní organizace“ je koncept virtuální entity, která má určitou sadu členů nebo akcionářů, kteří, snad s 67% většinou, mají právo utrácet prostředky entity a upravovat její kód. Členové by kolektivně rozhodovali o tom, jak by organizace měla alokovat své prostředky. Metody alokace prostředků DAO by se mohly pohybovat od odměn, platů až po exotičtější mechanismy, jako je interní měna pro odměňování práce. To v podstatě replikuje právní náležitosti tradiční společnosti nebo neziskové organizace, ale k vymáhání používá pouze kryptografickou technologii blockchainu. Dosud se velká část diskusí o DAO točila kolem „kapitalistického“ modelu „decentralizované autonomní korporace“ (DAC) s akcionáři pobírajícími dividendy a obchodovatelnými akciemi; alternativa, možná popsaná jako „decentralizovaná autonomní komunita“, by měla, že by všichni členové měli stejný podíl na rozhodování a vyžadovala by souhlas 67 % stávajících členů s přidáním nebo odebráním člena. Požadavek, že jedna osoba může mít pouze jedno členství, by pak musela být kolektivně vymáhána skupinou.

Obecný nástin, jak naprogramovat DAO, je následující. Nejjednodušší design je prostě kus samomodifikujícího se kódu, který se změní, pokud se na změně shodnou dvě třetiny členů. Ačkoli je kód teoreticky neměnný, lze to snadno obejít a mít de facto proměnlivost tím, že části kódu jsou v samostatných kontraktech a adresa, které kontrakty se mají volat, je uložena v modifikovatelném úložišti. V jednoduché implementaci takového kontraktu DAO by existovaly tři typy transakcí, které se liší daty poskytnutými v transakci:

- `[0,i,K,V]` pro registraci návrhu s indexem `i` ke změně adresy na indexu úložiště `K` na hodnotu `V`
- `[1,i]` pro registraci hlasu pro návrh `i`
- `[2,i]` pro finalizaci návrhu `i`, pokud bylo odevzdáno dostatek hlasů

Kontrakt by pak měl pro každou z těchto možností klauzule. Udržoval by záznam o všech otevřených změnách úložiště spolu se seznamem, kdo pro ně hlasoval. Měl by také seznam všech členů. Když jakákoli změna úložiště dosáhne hlasování dvou třetin členů, finalizační transakce by mohla změnu provést. Sofistikovanější kostra by také měla vestavěnou možnost hlasování pro funkce, jako je odeslání transakce, přidávání a odebírání členů, a může dokonce poskytovat delegování hlasů ve stylu [Liquid Democracy](https://wikipedia.org/wiki/Liquid_democracy) (tj. kdokoli může pověřit někoho, aby za něj hlasoval, a pověření je tranzitivní, takže pokud A pověří B a B pověří C, pak C určuje hlas A). Tento design by umožnil DAO organicky růst jako decentralizovaná komunita, což by lidem nakonec umožnilo delegovat úkol filtrování, kdo je členem, na specialisty, ačkoli na rozdíl od „současného systému“ se specialisté mohou snadno objevovat a mizet v čase, jak jednotliví členové komunity mění své postoje.

Alternativním modelem je decentralizovaná korporace, kde jakýkoli účet může mít nula nebo více podílů a k rozhodnutí jsou zapotřebí dvě třetiny podílů. Kompletní kostra by zahrnovala funkčnost správy aktiv, schopnost učinit nabídku na nákup nebo prodej akcií a schopnost přijímat nabídky (nejlépe s mechanismem párování příkazů uvnitř kontraktu). Delegace by také existovala ve stylu likvidní demokracie, což zobecňuje koncept „představenstva“.

### Další aplikace {#further-applications}

**1.** Spořicí peněženky\*\*. Předpokládejme, že Alice chce mít své prostředky v bezpečí, ale obává se, že ztratí svůj privátní klíč nebo jí ho někdo hackne. Vloží ethery do kontraktu s Bobem, bankou, následovně:

- Alice sama může denně vybrat maximálně 1 % prostředků.
- Bob sám může denně vybrat maximálně 1 % prostředků, ale Alice má možnost provést transakci se svým klíčem, která tuto schopnost vypne.
- Alice a Bob společně mohou vybrat cokoli.

Normálně je pro Alici 1 % denně dostačující, a pokud chce vybrat více, může požádat Boba o pomoc. Pokud dojde k hacknutí Alicina klíče, běží za Bobem, aby přesunul prostředky do nového kontraktu. Pokud ztratí svůj klíč, Bob nakonec prostředky dostane ven. Pokud se Bob ukáže jako zlovolný, může mu vypnout schopnost vybírat prostředky.

**2.** Pojištění úrody\*\*. Lze snadno vytvořit kontrakt na finanční deriváty, ale s použitím datového kanálu o počasí namísto jakéhokoli cenového indexu. Pokud si farmář v Iowě zakoupí derivát, který vyplácí inverzně na základě srážek v Iowě, pak v případě sucha farmář automaticky obdrží peníze, a pokud bude dostatek deště, bude farmář spokojený, protože jeho úroda bude dobrá. To lze obecně rozšířit na pojištění proti přírodním katastrofám.

**3.** Decentralizovaný datový kanál\*\*. U finančních rozdílových smluv může být skutečně možné decentralizovat datový zdroj prostřednictvím protokolu zvaného „[SchellingCoin](https://blog.ethereum.org/2014/03/28/schellingcoin-a-minimal-trust-universal-data-feed/)“. SchellingCoin v zásadě funguje následovně: N stran vloží do systému hodnotu daného údaje (např. cenu ETH/USD), hodnoty se seřadí a každý mezi 25. a 75. percentilem získá jako odměnu jeden token. Každý má motivaci poskytnout odpověď, kterou poskytnou všichni ostatní, a jedinou hodnotou, na které se může reálně shodnout velký počet hráčů, je zřejmá výchozí hodnota: pravda. To vytváří decentralizovaný protokol, který teoreticky může poskytnout libovolný počet hodnot, včetně ceny ETH/USD, teploty v Berlíně nebo dokonce výsledku konkrétního složitého výpočtu.

**4. Chytrá vícenásobná úschova**. Bitcoin umožňuje transakční kontrakty s vícenásobným podpisem, kde například tři z daných pěti klíčů mohou utratit prostředky. Ethereum umožňuje větší granularitu; například čtyři z pěti mohou utratit vše, tři z pěti mohou utratit až 10 % denně a dva z pěti mohou utratit až 0,5 % denně. Navíc je multisig Etherea asynchronní – dvě strany mohou zaregistrovat své podpisy na blockchainu v různých časech a poslední podpis automaticky odešle transakci.

**5. Cloud computing**. Technologii EVM lze také použít k vytvoření ověřitelného výpočetního prostředí, které uživatelům umožňuje požádat ostatní o provedení výpočtů a poté volitelně požádat o důkazy, že výpočty na určitých náhodně vybraných kontrolních bodech (checkpoint) byly provedeny správně. To umožňuje vytvoření trhu s cloud computingem, kde se může každý uživatel zapojit se svým stolním počítačem, notebookem nebo specializovaným serverem, a namátkové kontroly spolu s bezpečnostními vklady lze použít k zajištění důvěryhodnosti systému (tj. uzly nemohou se ziskem podvádět). Ačkoli takový systém nemusí být vhodný pro všechny úkoly; úkoly, které vyžadují vysokou úroveň meziprocesové komunikace, například nelze snadno provádět na velkém cloudu uzlů. Jiné úkoly je však mnohem snazší paralelizovat; projekty jako SETI@home, folding@home a genetické algoritmy lze na takové platformě snadno implementovat.

**6. Peer-to-peer hazardní hry**. Na blockchainu Etherea lze implementovat libovolný počet peer-to-peer protokolů pro hazardní hry, jako je například [Cyberdice](http://www.cl.cam.ac.uk/~fms27/papers/2008-StajanoCla-cyberdice.pdf) od Franka Stajana a Richarda Claytona. Nejjednodušším protokolem pro hazardní hry je ve skutečnosti prostě kontrakt na rozdíl na haši dalšího bloku a odtud lze budovat pokročilejší protokoly, které vytvářejí služby hazardních her s téměř nulovými poplatky, které nemají žádnou možnost podvádět.

**7. Predikční trhy**. Pokud je k dispozici orákulum nebo SchellingCoin, je také snadné implementovat predikční trhy, a predikční trhy spolu se SchellingCoinem se mohou ukázat jako první hlavní aplikace [futarchie](https://mason.gmu.edu/~rhanson/futarchy.html) jakožto protokolu pro správu decentralizovaných organizací.

**8. Onchain decentralizovaná tržiště**, využívající systém identity a reputace jako základ.

## Různé a obavy {#miscellanea-and-concerns}

### Modifikovaná implementace GHOST {#modified-ghost-implementation}

Protokol „Greedy Heaviest Observed Subtree“ (GHOST) je inovace, kterou poprvé představili Yonatan Sompolinsky a Aviv Zohar v [prosinci 2013](https://eprint.iacr.org/2013/881.pdf). Motivací protokolu GHOST je, že blockchainy s rychlými časy potvrzení v současné době trpí sníženou bezpečností kvůli vysoké míře zastaralých bloků (stale rate) – protože bloky potřebují určitý čas na šíření sítí, pokud těžař A vytěží blok a pak těžař B náhodou vytěží další blok předtím, než se blok těžaře A rozšíří k B, blok těžaře B bude nakonec zbytečný a nepřispěje k bezpečnosti sítě. Dále je zde problém centralizace: pokud je těžař A těžařský pool s 30 % hashpower a B má 10 % hashpower, A bude mít 70 % riziko produkce zastaralého bloku (protože v ostatních 30 % času A vytvořil poslední blok a tak získá data pro těžbu okamžitě), zatímco B bude mít 90 % riziko produkce zastaralého bloku. Pokud je tedy interval bloku dostatečně krátký na to, aby byla míra zastaralých bloků vysoká, A bude podstatně efektivnější jednoduše díky své velikosti. Kombinací těchto dvou efektů je velmi pravděpodobné, že blockchainy, které produkují bloky rychle, povedou k tomu, že jeden těžařský pool bude mít dostatečně velké procento síťového hashpower, aby měl de facto kontrolu nad procesem těžby.

Jak popsali Sompolinsky a Zohar, GHOST řeší první problém ztráty bezpečnosti sítě tím, že do výpočtu, který řetězec je „nejdelší“, zahrnuje i zastaralé bloky; to znamená, že do výpočtu, který blok má největší celkový důkaz prací, se přidávají nejen rodič a další předci bloku, ale také zastaralí potomci předka bloku (v žargonu Etherea „strýcové“). Abychom vyřešili druhý problém centralizačního zkreslení, jdeme nad rámec protokolu popsaného Sompolinskym a Zoharem a poskytujeme také odměny za bloky zastaralým blokům: zastaralý blok obdrží 87,5 % své základní odměny a synovec, který zastaralý blok zahrne, obdrží zbývajících 12,5 %. Transakční poplatky se však strýcům neudělují.

Ethereum implementuje zjednodušenou verzi protokolu GHOST, která sestupuje pouze o sedm úrovní. Konkrétně je definována následovně:

- Blok musí specifikovat rodiče a musí specifikovat 0 nebo více strýců.
- Strýc zahrnutý v bloku B musí mít následující vlastnosti:
  - Musí být přímým potomkem předka k-té generace B, kde `2 <= k <= 7`.
  - Nemůže být předkem B.
  - Strýc musí být platným záhlavím bloku, ale nemusí být dříve ověřeným nebo dokonce platným blokem.
  - Strýc se musí lišit od všech strýců zahrnutých v předchozích blocích a všech ostatních strýců zahrnutých ve stejném bloku (zákaz dvojího zahrnutí).
- Za každého strýce U v bloku B dostane těžař B navíc 3,125 % k odměně z coinbase a těžař U dostane 93,75 % standardní odměny z coinbase.

Tato omezená verze GHOST, kde strýcové mohou být zahrnuti pouze do 7 generací, byla použita ze dvou důvodů. Za prvé, neomezený GHOST by přinesl příliš mnoho komplikací do výpočtu, kteří strýcové pro daný blok jsou platní. Za druhé, neomezený GHOST s kompenzací, jak se používá v Ethereu, odstraňuje motivaci pro těžaře těžit na hlavním řetězci a ne na řetězci veřejného útočníka.

### Poplatky {#fees}

Protože každá transakce zveřejněná na blockchainu ukládá síti náklady na její stažení a ověření, je zapotřebí nějaký regulační mechanismus, typicky zahrnující transakční poplatky, aby se zabránilo zneužití. Výchozí přístup, používaný v Bitcoinu, spočívá v čistě dobrovolných poplatcích, které se spoléhají na těžaře, že budou fungovat jako strážci a nastaví dynamická minima. Tento přístup byl v komunitě Bitcoinu přijat velmi příznivě, zejména proto, že je „založen na trhu“, což umožňuje, aby nabídka a poptávka mezi těžaři a odesílateli transakcí určovala cenu. Problém s touto linií úvah je však v tom, že zpracování transakcí není trh; ačkoli je intuitivně lákavé chápat zpracování transakcí jako službu, kterou těžař nabízí odesílateli, ve skutečnosti každá transakce, kterou těžař zahrne, bude muset být zpracována každým uzlem v síti, takže drtivou většinu nákladů na zpracování transakcí nesou třetí strany, a nikoli těžař, který rozhoduje o tom, zda ji zahrnout či nikoli. Proto je velmi pravděpodobné, že dojde k problémům tragédie obecní pastviny.

Jak se však ukazuje, tato chyba v tržním mechanismu se při určitém nepřesném zjednodušujícím předpokladu magicky sama vyruší. Argument je následující. Předpokládejme, že:

1. Transakce vede k `k` operacím a nabízí odměnu `kR` jakémukoli těžaři, který ji zahrne, kde `R` je nastaveno odesílatelem a `k` a `R` jsou (zhruba) viditelné pro těžaře předem.
2. Operace má pro jakýkoli uzel náklady na zpracování `C` (tj. všechny uzly mají stejnou efektivitu)
3. Existuje `N` těžebních uzlů, z nichž každý má naprosto stejný výpočetní výkon (tj. `1/N` z celkového)
4. Neexistují žádné plné uzly, které by netěžily.

Těžař by byl ochoten zpracovat transakci, pokud je očekávaná odměna větší než náklady. Očekávaná odměna je tedy `kR/N`, protože těžař má šanci `1/N` na zpracování dalšího bloku, a náklady na zpracování pro těžaře jsou jednoduše `kC`. Těžaři tedy budou zahrnovat transakce, kde `kR/N > kC`, neboli `R > NC`. Všimněte si, že `R` je poplatek za operaci poskytnutý odesílatelem, a je tedy dolní hranicí přínosu, který odesílatel z transakce odvozuje, a `NC` jsou celkové náklady celé sítě na zpracování operace. Těžaři tedy mají motivaci zahrnovat pouze ty transakce, u kterých celkový užitkový přínos převyšuje náklady.

V reálu však existuje několik důležitých odchylek od těchto předpokladů:

1. Těžař platí vyšší náklady na zpracování transakce než ostatní ověřovací uzly, protože dodatečný čas na ověření zpožďuje šíření bloku a tím zvyšuje šanci, že se blok stane zastaralým.
2. Existují plné uzly, které netěží.
3. Rozdělení těžařského výkonu může v praxi skončit radikálně nerovnostářsky.
4. Existují spekulanti, političtí nepřátelé a blázni, jejichž funkce užitku zahrnuje poškozování sítě, a ti mohou chytře nastavit kontrakty, kde jejich náklady jsou mnohem nižší než náklady placené ostatními ověřovacími uzly.

(1) způsobuje tendenci těžaře zahrnovat méně transakcí a
(2) zvyšuje `NC`; proto se tyto dva efekty alespoň částečně
ruší
.<sup>[Jak?](https://web.archive.org/web/20250427212319/https://github.com/ethereum/wiki/issues/447#issuecomment-316972260#issuecomment-316972260)</sup>
(3) a (4) jsou hlavní problém; k jejich vyřešení jednoduše zavedeme
plovoucí strop: žádný blok nemůže mít více operací než
`BLK_LIMIT_FACTOR` násobek dlouhodobého exponenciálního klouzavého průměru.
Konkrétně:

```js
blk.oplimit = floor((blk.parent.oplimit \* (EMAFACTOR - 1) +
floor(parent.opcount \* BLK\_LIMIT\_FACTOR)) / EMA\_FACTOR)
```

`BLK_LIMIT_FACTOR` a `EMA_FACTOR` jsou konstanty, které budou prozatím nastaveny na 65536 a 1,5, ale po další analýze se pravděpodobně změní.

Existuje další faktor, který v Bitcoinu odrazuje od velkých velikostí bloků: velké bloky se budou šířit déle, a proto mají vyšší pravděpodobnost, že se stanou zastaralými. V Ethereu mohou bloky s vysokou spotřebou paliva také trvat déle, než se rozšíří, a to jak proto, že jsou fyzicky větší, tak proto, že jejich validace trvá déle kvůli zpracování přechodů stavů transakcí. Toto zpoždění jako demotivující faktor je v Bitcoinu významným faktorem, ale v Ethereu méně kvůli protokolu GHOST; spoléhání se na regulované limity bloků proto poskytuje stabilnější základ.

### Výpočty a Turingova úplnost {#computation-and-turing-completeness}

Důležitou poznámkou je, že Ethereum Virtual Machine (EVM) je Turingovsky úplný; to znamená, že kód EVM může zakódovat jakýkoli výpočet, který lze provést, včetně nekonečných smyček. Kód EVM umožňuje smyčky dvěma způsoby. Za prvé, existuje instrukce `JUMP`, která umožňuje programu skočit zpět na předchozí místo v kódu, a instrukce `JUMPI` pro podmíněný skok, což umožňuje příkazy jako `while x < 27: x = x * 2`. Za druhé, kontrakty mohou volat jiné kontrakty, což potenciálně umožňuje smyčky prostřednictvím rekurze. To přirozeně vede k problému: mohou zlovolní uživatelé v podstatě vypnout těžaře a plné uzly tím, že je donutí vstoupit do nekonečné smyčky? Problém vzniká kvůli problému v informatice známému jako problém zastavení: neexistuje způsob, jak v obecném případě zjistit, zda se daný program někdy zastaví.

Jak je popsáno v sekci o přechodu stavu, naše řešení funguje tak, že vyžaduje, aby transakce nastavila maximální počet výpočetních kroků, které může provést, a pokud provádění trvá déle, výpočet se vrátí zpět, ale poplatky jsou stále zaplaceny. Zprávy fungují stejným způsobem. Pro ukázku motivace našeho řešení zvažte následující příklady:

- Útočník vytvoří kontrakt, který spouští nekonečnou smyčku, a poté odešle transakci aktivující tuto smyčku těžaři. Těžař zpracuje transakci, spustí nekonečnou smyčku a počká, až mu dojde palivo. I když provádění dojde palivo a zastaví se v polovině, transakce je stále platná a těžař si stále nárokuje poplatek od útočníka za každý výpočetní krok.
- Útočník vytvoří velmi dlouhou nekonečnou smyčku s úmyslem donutit těžaře počítat tak dlouho, že než výpočet skončí, vyjde několik dalších bloků a pro těžaře nebude možné zahrnout transakci a nárokovat si poplatek. Útočník však bude muset zadat hodnotu pro `STARTGAS`, která omezí počet výpočetních kroků, které může provádění provést, takže těžař bude předem vědět, že výpočet bude trvat nadměrně velký počet kroků.
- Útočník vidí kontrakt s kódem v podobě `send(A,contract.storage[A]); contract.storage[A] = 0` a pošle transakci s právě takovým množstvím paliva, aby se provedl první krok, ale ne druhý (tj. provede výběr, ale nenechá klesnout zůstatek). Autor kontraktu se nemusí starat o ochranu proti takovým útokům, protože pokud se provádění zastaví v polovině, změny se vrátí zpět.
- Finanční kontrakt funguje tak, že bere medián z devíti proprietárních datových kanálů, aby se minimalizovalo riziko. Útočník převezme jeden z datových kanálů, který je navržen tak, aby byl modifikovatelný pomocí mechanismu volání s proměnnou adresou popsaného v sekci o DAO, a převede jej tak, aby běžel v nekonečné smyčce, čímž se pokouší donutit jakékoli pokusy o nárokování prostředků z finančního kontraktu, aby jim došlo palivo. Finanční kontrakt však může nastavit palivový limit na zprávu, aby se tomuto problému zabránilo.

Alternativou k Turingově úplnosti je Turingova neúplnost, kde `JUMP` a `JUMPI` neexistují a v zásobníku volání může v daném okamžiku existovat pouze jedna kopie každého kontraktu. S tímto systémem by popsaný systém poplatků a nejistoty ohledně účinnosti našeho řešení nemusely být nutné, protože náklady na provedení kontraktu by byly shora omezeny jeho velikostí. Navíc, Turingova neúplnost není ani tak velkým omezením; ze všech příkladů kontraktů, které jsme interně vymysleli, zatím pouze jeden vyžadoval smyčku, a i tu by bylo možné odstranit 26 opakováním jednořádkového kusu kódu. Vzhledem k vážným důsledkům Turingovy úplnosti a omezenému přínosu, proč jednoduše nemít Turingovsky neúplný jazyk? Ve skutečnosti však Turingova neúplnost zdaleka není elegantním řešením problému. Abyste pochopili proč, zvažte následující kontrakty:

```sh
C0: call(C1); call(C1);
C1: call(C2); call(C2);
C2: call(C3); call(C3);
...
C49: call(C50); call(C50);
C50: (spusť jeden krok programu a zaznamenej změnu v úložišti)
```

Nyní odešlete transakci do A. V 51 transakcích tak máme kontrakt, který zabere 2<sup>50</sup> výpočetních kroků. Těžaři by se mohli pokusit odhalit takové logické bomby předem udržováním hodnoty u každého kontraktu, která specifikuje maximální počet výpočetních kroků, které může provést, a výpočtem této hodnoty pro kontrakty, které rekurzivně volají jiné kontrakty, ale to by vyžadovalo, aby těžaři zakázali kontrakty, které vytvářejí jiné kontrakty (protože vytvoření a provedení všech 26 výše uvedených kontraktů by se dalo snadno sloučit do jediného kontraktu). Dalším problematickým bodem je, že pole adresy zprávy je proměnná, takže obecně nemusí být ani možné předem zjistit, které další kontrakty daný kontrakt zavolá. Celkově tedy docházíme k překvapivému závěru: Turingova úplnost je překvapivě snadno zvládnutelná a absence Turingovy úplnosti je stejně překvapivě obtížně zvládnutelná, pokud nejsou zavedeny naprosto stejné kontroly – ale v takovém případě, proč prostě nenechat protokol být Turingovsky úplný?

### Měna a vydávání {#currency-and-issuance}

Síť Ethereum zahrnuje svou vlastní vestavěnou měnu, ether, která slouží dvojímu účelu: poskytuje primární vrstvu likvidity pro efektivní směnu mezi různými typy digitálních aktiv a, což je důležitější, poskytuje mechanismus pro placení transakčních poplatků. Pro pohodlí a pro zamezení budoucím sporům (viz současná debata o mBTC/uBTC/satoshi v Bitcoinu) budou denominace předem označeny:

- 1: wei
- 10<sup>12</sup>: szabo
- 10<sup>15</sup>: finney
- 10<sup>18</sup>: ether

Toto by se mělo brát jako rozšířená verze konceptu „dolarů“ a „centů“ nebo „BTC“ a „satoshi“. V blízké budoucnosti očekáváme, že „ether“ se bude používat pro běžné transakce, „finney“ pro mikrotransakce a „szabo“ a „wei“ pro technické diskuse o poplatcích a implementaci protokolu; zbývající denominace se mohou stát užitečnými později a v tuto chvíli by neměly být zahrnuty v klientech.

Model vydávání bude následující:

- Ether bude uvolněn v prodeji měny za cenu 1000-2000 etherů za BTC, což je mechanismus určený k financování organizace Ethereum a placení za vývoj, který byl s úspěchem použit i na jiných platformách, jako jsou Mastercoin a NXT. Dřívější kupující budou těžit z větších slev. BTC získané z prodeje budou plně použity na platy a odměny pro vývojáře a investovány do různých ziskových i neziskových projektů v ekosystému Etherea a kryptoměn.
- 0,099násobek celkového prodaného množství (60102216 ETH) bude přidělen organizaci na kompenzaci raných přispěvatelů a na platbu výdajů denominovaných v ETH před genesis blokem.
- 0,099násobek celkového prodaného množství bude udržován jako dlouhodobá rezerva.
- 0,26násobek celkového prodaného množství bude od tohoto bodu navždy přidělován těžařům ročně.

| Skupina                        | Při spuštění | Po 1 roce | Po 5 letech |
| ------------------------------ | ------------ | --------- | ----------- |
| Měnové jednotky                | 1,198X       | 1,458X    | 2,498X      |
| Kupující                       | 83,5 %       | 68,6 %    | 40,0 %      |
| Rezerva utracená před prodejem | 8,26 %       | 6,79 %    | 3,96 %      |
| Rezerva použitá po prodeji     | 8,26 %       | 6,79 %    | 3,96 %      |
| Těžaři                         | 0%           | 17,8 %    | 52,0 %      |

#### Dlouhodobá míra růstu nabídky (v procentech)

![Inflace Etherea](./ethereum-inflation.png)

_Navzdory lineárnímu vydávání měny, stejně jako u Bitcoinu, míra růstu nabídky v čase přesto směřuje k nule._

Dvě hlavní volby ve výše uvedeném modelu jsou (1) existence a velikost nadačního poolu a (2) existence trvale rostoucí lineární nabídky, na rozdíl od omezené nabídky jako v Bitcoinu. Odůvodnění nadačního poolu je následující. Pokud by nadační pool neexistoval a lineární vydávání by se snížilo na 0,217x, aby se dosáhlo stejné míry inflace, pak by celkové množství etheru bylo o 16,5 % menší a každá jednotka by tak byla o 19,8 % cennější. V rovnováze by se tedy v prodeji nakoupilo o 19,8 % více etheru, takže každá jednotka by byla opět přesně stejně cenná jako předtím. Organizace by pak také měla 1,198x více BTC, což lze považovat za rozdělené do dvou částí: původní BTC a dodatečných 0,198x. Tato situace je tedy _přesně ekvivalentní_ nadaci, ale s jedním důležitým rozdílem: organizace drží čistě BTC, a tak není motivována podporovat hodnotu jednotky etheru.

Model permanentního lineárního růstu nabídky snižuje riziko toho, co někteří považují za nadměrnou koncentraci bohatství v Bitcoinu, a dává jednotlivcům žijícím v současných i budoucích érách spravedlivou šanci získat měnové jednotky, přičemž si zachovává silnou motivaci získávat a držet ether, protože „míra růstu nabídky“ jako procento stále v čase směřuje k nule. Také teoretizujeme, že protože se mince v průběhu času vždy ztrácejí kvůli neopatrnosti, smrti atd. a ztrátu mincí lze modelovat jako procento z celkové zásoby za rok, celková zásoba měny v oběhu se nakonec stabilizuje na hodnotě rovné ročnímu vydávání dělenému mírou ztráty (např. při míře ztráty 1 %, jakmile zásoba dosáhne 26X, bude každý rok vytěženo 0,26X a 0,26X ztraceno, čímž se vytvoří rovnováha).

Všimněte si, že v budoucnu je pravděpodobné, že Ethereum přejde na model proof-of-stake pro zabezpečení, což sníží požadavek na vydávání na hodnotu mezi nulou a 0,05X ročně. V případě, že organizace Ethereum ztratí financování nebo z jakéhokoli jiného důvodu zmizí, necháváme otevřenou „společenskou smlouvu“: kdokoli má právo vytvořit budoucí kandidátskou verzi Etherea, s jedinou podmínkou, že množství etheru musí být nanejvýš rovno `60102216 * (1.198 + 0.26 * n)`, kde `n` je počet let po genesis bloku. Tvůrci mohou volně prodávat v rámci crowdfundingu nebo jinak přidělit část nebo celou odchylku mezi expanzí nabídky řízenou PoS a maximální povolenou expanzí nabídky k zaplacení vývoje. Kandidátské vylepšení, které nesplňují společenskou smlouvu, mohou být oprávněně forkovány do vyhovujících verzí.

### Centralizace těžby {#mining-centralization}

Těžební algoritmus Bitcoinu funguje tak, že těžaři počítají SHA256 na mírně upravených verzích záhlaví bloku milionykrát znovu a znovu, dokud nakonec jeden uzel nenajde verzi, jejíž haš je menší než cíl (v současnosti kolem 2<sup>192</sup>). Tento těžební algoritmus je však zranitelný vůči dvěma formám centralizace. Za prvé, těžařský ekosystém začaly ovládat ASIC (aplikačně specifické integrované obvody), počítačové čipy navržené pro specifický úkol těžby Bitcoinu, a proto tisíckrát efektivnější. To znamená, že těžba Bitcoinu již není vysoce decentralizovanou a rovnostářskou činností, ale vyžaduje kapitál v milionech dolarů pro efektivní účast. Za druhé, většina těžařů Bitcoinu ve skutečnosti neprovádí validaci bloků lokálně; místo toho se spoléhají na centralizovaný těžařský pool, který jim poskytuje záhlaví bloků. Tento problém je pravděpodobně ještě horší: v době psaní tohoto textu tři největší těžařské pooly nepřímo ovládají zhruba 50 % výpočetního výkonu v síti Bitcoin, ačkoli to je zmírněno skutečností, že těžaři mohou přejít do jiných těžařských poolů, pokud se pool nebo koalice pokusí o 51% útok.

Současným záměrem Etherea je použít těžební algoritmus, kde jsou těžaři povinni načítat náhodná data ze stavu, vypočítat některé náhodně vybrané transakce z posledních N bloků v blockchainu a vrátit haš výsledku. To má dva důležité přínosy. Zaprvé, kontrakty na Ethereu mohou zahrnovat jakýkoli druh výpočtu, takže ASIC pro Ethereum by v podstatě byl ASIC pro obecné výpočty – tj. lepší CPU. Za druhé, těžba vyžaduje přístup k celému blockchainu, což nutí těžaře ukládat celý blockchain a být alespoň schopni ověřit každou transakci. To odstraňuje potřebu centralizovaných těžařských poolů; ačkoli těžařské pooly mohou stále plnit legitimní roli vyrovnávání náhodnosti distribuce odměn, tuto funkci mohou stejně dobře plnit peer-to-peer pooly bez centrální kontroly.

Tento model není otestován a mohou se vyskytnout obtíže při snaze vyhnout se určitým chytrým optimalizacím při použití provádění kontraktů jako těžebního algoritmu. Jednou obzvláště zajímavou vlastností tohoto algoritmu je však to, že umožňuje komukoli „otrávit studnu“ zavedením velkého počtu kontraktů do blockchainu, které jsou speciálně navrženy tak, aby zmařily určité ASIC. Existují ekonomické pobídky pro výrobce ASIC, aby použili takový trik k vzájemnému útoku. Řešení, které vyvíjíme, je tedy nakonec spíše adaptivním ekonomicko-lidským řešením než čistě technickým.

### Škálovatelnost {#scalability}

Jednou z běžných obav ohledně Etherea je otázka škálovatelnosti. Stejně jako Bitcoin, i Ethereum trpí nedostatkem, že každá transakce musí být zpracována každým uzlem v síti. U Bitcoinu je velikost současného blockchainu přibližně 15 GB a roste o přibližně 1 MB za hodinu. Pokud by síť Bitcoin zpracovávala 2000 transakcí za sekundu jako Visa, rostla by o 1 MB za tři sekundy (1 GB za hodinu, 8 TB ročně). Ethereum pravděpodobně utrpí podobný růstový vzorec, zhoršený skutečností, že na blockchainu Etherea bude mnoho aplikací, nejen měna jako v případě Bitcoinu, ale zmírněný skutečností, že plné uzly Etherea potřebují ukládat pouze stav namísto celé historie blockchainu.

Problém s tak velkou velikostí blockchainu je riziko centralizace. Pokud by se velikost blockchainu zvýšila například na 100 TB, pravděpodobným scénářem by bylo, že plné uzly by provozoval jen velmi malý počet velkých podniků a všichni běžní uživatelé by používali lehké SPV uzly. V takové situaci vzniká potenciální obava, že by se plné uzly mohly spojit a všechny se dohodnout, že budou podvádět nějakým ziskovým způsobem (např. změní odměnu za blok, dají si BTC). Lehké uzly by neměly žádný způsob, jak to okamžitě odhalit. Samozřejmě, pravděpodobně by existoval alespoň jeden poctivý plný uzel a po několika hodinách by se informace o podvodu dostaly ven prostřednictvím kanálů jako Reddit, ale v tu chvíli by bylo příliš pozdě: bylo by na běžných uživatelích, aby zorganizovali snahu o zařazení daných bloků na černou listinu, což je masivní a pravděpodobně neproveditelný koordinační problém v podobném měřítku jako provedení úspěšného 51% útoku. V případě Bitcoinu je to v současnosti problém, ale existuje modifikace blockchainu [navržená Peterem Toddem](https://web.archive.org/web/20140623061815/http://sourceforge.net/p/bitcoin/mailman/message/31709140/), která tento problém zmírní.

V blízké budoucnosti Ethereum použije dvě další strategie, jak se s tímto problémem vypořádat. Za prvé, kvůli těžebním algoritmům založeným na blockchainu bude alespoň každý těžař nucen být plným uzlem, což vytváří dolní hranici počtu plných uzlů. Za druhé, a co je důležitější, zahrneme do blockchainu po zpracování každé transakce mezilehlý kořen stavového stromu. I když je validace bloků centralizovaná, pokud existuje alespoň jeden poctivý ověřovací uzel, lze problém centralizace obejít pomocí ověřovacího protokolu. Pokud těžař zveřejní neplatný blok, musí být tento blok buď špatně naformátován, nebo je stav `S[n]` nesprávný. Protože víme, že `S[0]` je správný, musí existovat nějaký první stav `S[i]`, který je nesprávný, zatímco `S[i-1]` je správný. Ověřující uzel by poskytl index `i` spolu s „důkazem neplatnosti“, který se skládá z podmnožiny uzlů Patricia stromu potřebných ke zpracování `APPLY(S[i-1],TX[i]) -> S[i]`. Uzly by mohly použít tyto uzly ke spuštění této části výpočtu a zjistit, že vygenerované `S[i]` neodpovídá poskytnutému `S[i]`.

Další, sofistikovanější útok by zahrnoval zákeřné těžaře publikující neúplné bloky, takže by ani neexistovaly úplné informace k určení, zda jsou bloky platné. Řešením je protokol výzva-odpověď: ověřovací uzly vydávají „výzvy“ ve formě indexů cílových transakcí a po obdržení uzlu lehký uzel považuje blok za nedůvěryhodný, dokud jiný uzel, ať už těžař nebo jiný ověřovatel, neposkytne podmnožinu uzlů Patricia jako důkaz platnosti.

## Závěr {#conclusion}

Protokol Ethereum byl původně koncipován jako vylepšená verze kryptoměny, která poskytuje pokročilé funkce, jako je úschova na blockchainu, limity pro výběr, finanční smlouvy, trhy s hazardními hrami a podobně, a to prostřednictvím vysoce zobecněného programovacího jazyka. Protokol Ethereum by přímo „nepodporoval“ žádnou z aplikací, ale existence Turingovsky úplného programovacího jazyka znamená, že pro jakýkoli typ transakce nebo aplikaci lze teoreticky vytvořit libovolné kontrakty. Na Ethereu je však zajímavější to, že protokol Ethereum dalece přesahuje pouhou měnu. Protokoly kolem decentralizovaného ukládání souborů, decentralizovaných výpočtů a decentralizovaných predikčních trhů, mezi desítkami dalších takových konceptů, mají potenciál podstatně zvýšit efektivitu výpočetního průmyslu a poskytnout masivní impuls dalším protokolům peer-to-peer tím, že poprvé přidávají ekonomickou vrstvu. A konečně, existuje také podstatná řada aplikací, které nemají s penězi vůbec nic společného.

Koncept funkce libovolného přechodu stavu, jak je implementován protokolem Ethereum, poskytuje platformu s jedinečným potenciálem. Namísto toho, aby byl Ethereum uzavřeným, jednoúčelovým protokolem určeným pro specifickou řadu aplikací v oblasti ukládání dat, hazardních her nebo financí, je z podstaty otevřený a věříme, že je mimořádně vhodný k tomu, aby v nadcházejících letech sloužil jako základní vrstva pro velmi velký počet finančních i nefinančních protokolů.

## Poznámky a další literatura {#notes-and-further-reading}

### Poznámky {#notes}

1. Zkušený čtenář si může všimnout, že bitcoinová adresa je ve skutečnosti haš veřejného klíče eliptické křivky, a nikoli veřejný klíč samotný. V kryptografické terminologii je však zcela legitimní označovat haš veřejného klíče jako veřejný klíč samotný. Důvodem je, že kryptografie Bitcoinu může být považována za vlastní algoritmus digitálního podpisu, kde se veřejný klíč skládá z haše veřejného klíče ECC, podpis se skládá z veřejného klíče ECC zřetězeného s podpisem ECC a ověřovací algoritmus zahrnuje kontrolu veřejného klíče ECC v podpisu oproti haši veřejného klíče ECC poskytnutého jako veřejný klíč a následné ověření podpisu ECC oproti veřejnému klíči ECC.
2. Technicky medián 11 předchozích bloků.
3. Interně jsou 2 a „CHARLIE“ obě čísla<sup>[fn3](#notes)</sup>, přičemž druhé je v reprezentaci big-endian se základem 256. Čísla mohou být alespoň 0 a nejvýše 2<sup>256</sup>-1.

### Další čtení {#further-reading}

1. [Vnitřní hodnota](https://bitcoinmagazine.com/culture/an-exploration-of-intrinsic-value-what-it-is-why-bitcoin-doesnt-have-it-and-why-bitcoin-does-have-it)
2. [Chytrý majetek](https://en.bitcoin.it/wiki/Smart_Property)
3. [Chytré kontrakty](https://en.bitcoin.it/wiki/Contracts)
4. [B-money](http://www.weidai.com/bmoney.txt)
5. [Opakovaně použitelné důkazy prací](https://nakamotoinstitute.org/finney/rpow/)
6. [Bezpečné vlastnické tituly s autoritou vlastníka](https://nakamotoinstitute.org/library/secure-property-titles/)
7. [Bílá kniha Bitcoinu](http://bitcoin.org/bitcoin.pdf)
8. [Namecoin](https://namecoin.org/)
9. [Zookův trojúhelník](https://wikipedia.org/wiki/Zooko's_triangle)
10. [Bílá kniha Colored coins](https://docs.google.com/a/buterin.com/document/d/1AnkP_cVZTCMLIzw4DvsW6M8Q2JC0lIzrTLuoWu2z1BE/edit)
11. [Bílá kniha Mastercoin](https://github.com/mastercoin-MSC/spec)
12. [Decentralizované autonomní korporace, Bitcoin Magazine](http://bitcoinmagazine.com/7050/bootstrapping-a-decentralized-autonomous-corporation-part-i/)
13. [Zjednodušené ověření platby](https://en.bitcoin.it/wiki/Scalability#Simplified_payment_verification)
14. [Merkleovy stromy](https://wikipedia.org/wiki/Merkle_tree)
15. [Patricia stromy](https://wikipedia.org/wiki/Patricia_tree)
16. [GHOST](https://eprint.iacr.org/2013/881.pdf)
17. [StorJ a autonomní agenti, Jeff Garzik](http://garzikrants.blogspot.ca/2013/01/storj-and-bitcoin-autonomous-agents.html)
18. [Mike Hearn o chytrém majetku na Turing Festivalu](https://www.youtube.com/watch?v=MVyv4t0OKe4)
19. [Ethereum RLP](/developers/docs/data-structures-and-encoding/rlp/)
20. [Merkle-Patricia stromy na Ethereu](/developers/docs/data-structures-and-encoding/patricia-merkle-trie/)
21. [Peter Todd o Merkleových součtových stromech](https://web.archive.org/web/20140623061815/http://sourceforge.net/p/bitcoin/mailman/message/31709140/)

_Historii bílé knihy najdete na [této wiki](https://web.archive.org/web/20250427212319/https://github.com/ethereum/wiki/blob/old-before-deleting-all-files-go-to-wiki-wiki-instead/old-whitepaper-for-historical-reference.md)._

_Ethereum, stejně jako mnoho komunitou řízených softwarových projektů s otevřeným zdrojovým kódem, se od svého počátečního vzniku vyvíjelo. _Chcete-li se dozvědět o nejnovějším vývoji Etherea a o tom, jak se provádějí změny protokolu, doporučujeme [tohoto průvodce](/learn/)._
