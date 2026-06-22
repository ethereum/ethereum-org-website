---
title: Bílá kniha Etherea
description: Úvodní dokument k Ethereu, publikovaný v roce 2013 před jeho spuštěním.
lang: cs
sidebarDepth: 2
hideEditButton: true
authors: ["Vitalik Buterin"]
---

<WhitepaperBridge />

_Ačkoli je již několik let starý, ponecháváme níže původní dokument, protože i nadále slouží jako užitečná reference a přesná reprezentace [Etherea](/) a jeho vize._

## Platforma pro chytré kontrakty a decentralizované aplikace nové generace {#a-next-generation-smart-contract-and-decentralized-application-platform}

Vývoj Bitcoinu Satoshi Nakamotem v roce 2009 je často oslavován jako radikální pokrok v oblasti peněz a měn, přičemž jde o první příklad digitálního aktiva, které současně nemá žádné krytí ani „[vnitřní hodnotu](https://bitcoinmagazine.com/culture/an-exploration-of-intrinsic-value-what-it-is-why-bitcoin-doesnt-have-it-and-why-bitcoin-does-have-it)“ a nemá žádného centralizovaného vydavatele ani správce. Nicméně další, pravděpodobně důležitější součástí bitcoinového experimentu je základní technologie blockchainu jakožto nástroj distribuovaného konsensu a pozornost se rychle začíná přesouvat k tomuto dalšímu aspektu Bitcoinu. Mezi běžně uváděné alternativní aplikace technologie blockchain patří využití digitálních aktiv na blockchainu k reprezentaci vlastních měn a finančních nástrojů („[colored coins](https://docs.google.com/a/buterin.com/document/d/1AnkP_cVZTCMLIzw4DvsW6M8Q2JC0lIzrTLuoWu2z1BE/edit)“), vlastnictví podkladového fyzického zařízení („[chytrý majetek](https://en.bitcoin.it/wiki/Smart_Property)“), nezaměnitelných aktiv, jako jsou doménová jména („[Namecoin](http://namecoin.org)“), a také složitější aplikace, které zahrnují digitální aktiva přímo řízená kusem kódu implementujícím libovolná pravidla („[chytré kontrakty](http://www.fon.hum.uva.nl/rob/Courses/InformationInSpeech/CDROM/Literature/LOTwinterschool2006/szabo.best.vwh.net/idea.html)“), nebo dokonce na blockchainu založené „[decentralizované autonomní organizace](http://bitcoinmagazine.com/7050/bootstrapping-a-decentralized-autonomous-corporation-part-i/)“ (DAO). To, co Ethereum zamýšlí poskytnout, je blockchain s vestavěným plnohodnotným Turingovsky úplným programovacím jazykem, který lze použít k vytvoření „kontraktů“, jež mohou kódovat libovolné funkce přechodu stavu, což uživatelům umožňuje vytvořit jakýkoli z výše popsaných systémů, stejně jako mnoho dalších, které jsme si dosud ani nedokázali představit, jednoduše zapsáním logiky do několika řádků kódu.

## Úvod do Bitcoinu a existujících konceptů {#introduction-to-bitcoin-and-existing-concepts}

### Historie {#history}

Koncept decentralizované digitální měny, stejně jako alternativní aplikace typu registrů majetku, existuje již desítky let. Anonymní protokoly elektronické hotovosti (e-cash) z 80. a 90. let, většinou spoléhající na kryptografické primitivum známé jako Chaumovo slepé podepisování (Chaumian blinding), poskytovaly měnu s vysokou mírou soukromí, ale tyto protokoly se z velké části neuchytily kvůli své závislosti na centralizovaném zprostředkovateli. V roce 1998 se [b-money](http://www.weidai.com/bmoney.txt) od Wei Daie stal prvním návrhem, který představil myšlenku vytváření peněz řešením výpočetních hádanek a decentralizovaného konsensu, ale návrh postrádal detaily o tom, jak by mohl být decentralizovaný konsensus skutečně implementován. V roce 2005 představil Hal Finney koncept „[opakovaně použitelných důkazů prací](https://nakamotoinstitute.org/finney/rpow/)“ (reusable proofs of work), systém, který využívá myšlenky z b-money společně s výpočetně náročnými hádankami Hashcash od Adama Backa k vytvoření konceptu kryptoměny, ale opět nedosáhl ideálu, protože spoléhal na důvěryhodné výpočty (trusted computing) jako backend. V roce 2009 byla decentralizovaná měna poprvé implementována v praxi Satoshi Nakamotem, který zkombinoval zavedená primitiva pro správu vlastnictví pomocí kryptografie veřejného klíče s algoritmem konsensu pro sledování toho, kdo vlastní mince, známým jako „důkaz prací (PoW)“.

Mechanismus za důkazem prací (PoW) byl v tomto prostoru průlomový, protože současně řešil dva problémy. Zaprvé poskytl jednoduchý a středně efektivní algoritmus konsensu, který umožnil uzlům v síti kolektivně se shodnout na sadě kanonických aktualizací stavu účetní knihy Bitcoinu. Zadruhé poskytl mechanismus umožňující volný vstup do procesu konsensu, čímž vyřešil politický problém rozhodování o tom, kdo může konsensus ovlivňovat, a zároveň zabránil Sybil útokům. Dělá to tak, že nahrazuje formální bariéru účasti, jako je požadavek na registraci jako jedinečná entita na konkrétním seznamu, ekonomickou bariérou – váha jednoho uzlu v procesu hlasování o konsensu je přímo úměrná výpočetnímu výkonu, který uzel přináší. Od té doby byl navržen alternativní přístup zvaný _důkaz podílem (PoS)_, který vypočítává váhu uzlu jako úměrnou jeho držbě měny a nikoli výpočetním zdrojům; diskuse o relativních výhodách obou přístupů přesahuje rámec tohoto dokumentu, ale je třeba poznamenat, že oba přístupy lze použít jako páteř kryptoměny.

### Bitcoin jako systém přechodu stavů {#bitcoin-as-a-state-transition-system}

![Ethereum state transition](./ethereum-state-transition.png)

Z technického hlediska lze účetní knihu kryptoměny, jako je Bitcoin, považovat za systém přechodu stavů, kde existuje „stav“ skládající se ze stavu vlastnictví všech existujících bitcoinů a „funkce přechodu stavu“, která vezme stav a transakci a na výstupu vytvoří nový stav, který je výsledkem. Ve standardním bankovním systému je například stavem rozvaha, transakce je požadavek na přesun X $ od A k B a funkce přechodu stavu sníží hodnotu na účtu A o X $ a zvýší hodnotu na účtu B o X $. Pokud má účet A na prvním místě méně než X $, funkce přechodu stavu vrátí chybu. Lze tedy formálně definovat:

```
APPLY(S,TX) -> S' or ERROR
```

Ve výše definovaném bankovním systému:

```js
APPLY({ Alice: $50, Bob: $50 },"send $20 from Alice to Bob") = { Alice: $30, Bob: $70 }
```

Ale:

```js
APPLY({ Alice: $50, Bob: $50 },"send $70 from Alice to Bob") = ERROR
```

„Stav“ v Bitcoinu je sbírka všech mincí (technicky „nevyužitých transakčních výstupů“ neboli UTXO), které byly vyraženy a dosud nebyly utraceny, přičemž každé UTXO má nominální hodnotu a vlastníka (definovaného 20bajtovou adresou, což je v podstatě kryptografický veřejný klíč<sup>[fn1](#notes)</sup>). Transakce obsahuje jeden nebo více vstupů, přičemž každý vstup obsahuje odkaz na existující UTXO a kryptografický podpis vytvořený soukromým klíčem spojeným s adresou vlastníka, a jeden nebo více výstupů, přičemž každý výstup obsahuje nové UTXO, které má být přidáno do stavu.

Funkci přechodu stavu `APPLY(S,TX) -> S'` lze zhruba definovat následovně:

<ol>
  <li>
    Pro každý vstup v <code>TX</code>:
    <ul>
    <li>
        Pokud odkazované UTXO není v <code>S</code>, vraťte chybu.
    </li>
    <li>
        Pokud poskytnutý podpis neodpovídá vlastníkovi UTXO, vraťte chybu.
    </li>
    </ul>
  </li>
  <li>
    Pokud je součet nominálních hodnot všech vstupních UTXO menší než součet nominálních hodnot všech výstupních UTXO, vraťte chybu.
  </li>
  <li>
    Vraťte <code>S</code> s odstraněnými všemi vstupními UTXO a přidanými všemi výstupními UTXO.
  </li>
</ol>

První polovina prvního kroku brání odesílatelům transakcí utrácet mince, které neexistují, druhá polovina prvního kroku brání odesílatelům transakcí utrácet mince jiných lidí a druhý krok vynucuje zachování hodnoty. Aby se to dalo použít k platbě, protokol je následující. Předpokládejme, že Alice chce poslat 11,7 BTC Bobovi. Nejprve bude Alice hledat sadu dostupných UTXO, které vlastní a které dávají dohromady alespoň 11,7 BTC. Realisticky Alice nebude schopna získat přesně 11,7 BTC; řekněme, že nejmenší, co může získat, je 6+4+2=12. Poté vytvoří transakci s těmito třemi vstupy a dvěma výstupy. Prvním výstupem bude 11,7 BTC s Bobovou adresou jako vlastníkem a druhým výstupem bude zbývajících 0,3 BTC jako „drobné“, přičemž vlastníkem bude sama Alice.

### Těžba {#mining}

![Ethereum blocks](./ethereum-blocks.png)

Pokud bychom měli přístup k důvěryhodné centralizované službě, implementace tohoto systému by byla triviální; mohl by být jednoduše naprogramován přesně tak, jak je popsáno, s využitím pevného disku centralizovaného serveru ke sledování stavu. S Bitcoinem se však snažíme vybudovat decentralizovaný měnový systém, takže budeme muset zkombinovat systém stavových transakcí se systémem konsensu, abychom zajistili, že se všichni shodnou na pořadí transakcí. Proces decentralizovaného konsensu Bitcoinu vyžaduje, aby se uzly v síti neustále pokoušely vytvářet balíčky transakcí zvané „bloky“. Síť má produkovat zhruba jeden blok každých deset minut, přičemž každý blok obsahuje časové razítko, nonce, odkaz na (tj. hash) předchozí blok a seznam všech transakcí, které proběhly od předchozího bloku. Postupem času to vytváří trvalý, neustále rostoucí „blockchain“, který se neustále aktualizuje, aby reprezentoval nejnovější stav účetní knihy Bitcoinu.

Algoritmus pro kontrolu, zda je blok platný, vyjádřený v tomto paradigmatu, je následující:

1. Zkontrolujte, zda předchozí blok odkazovaný blokem existuje a je platný.
2. Zkontrolujte, zda je časové razítko bloku větší než časové razítko předchozího bloku<sup>[fn2](#notes)</sup> a menší než 2 hodiny do budoucnosti.
3. Zkontrolujte, zda je důkaz prací (PoW) na bloku platný.
4. Nechť `S[0]` je stav na konci předchozího bloku.
5. Předpokládejme, že `TX` je seznam transakcí bloku s `n` transakcemi. Pro všechny `i` v `0...n-1` nastavte `S[i+1] = APPLY(S[i],TX[i])` Pokud jakákoli aplikace vrátí chybu, ukončete a vraťte false.
6. Vraťte true a zaregistrujte `S[n]` jako stav na konci tohoto bloku.

V podstatě každá transakce v bloku musí poskytovat platný přechod stavu z toho, co bylo kanonickým stavem před provedením transakce, do nějakého nového stavu. Všimněte si, že stav není v bloku nijak zakódován; je to čistě abstrakce, kterou si má pamatovat validující uzel, a lze ji (bezpečně) vypočítat pro jakýkoli blok pouze tak, že se začne od genesis stavu a postupně se aplikuje každá transakce v každém bloku. Dále si všimněte, že záleží na pořadí, ve kterém těžař zahrne transakce do bloku; pokud jsou v bloku dvě transakce A a B takové, že B utrácí UTXO vytvořené A, pak bude blok platný, pokud A předchází B, ale ne naopak.

Jedinou podmínkou platnosti přítomnou ve výše uvedeném seznamu, která se v jiných systémech nenachází, je požadavek na „důkaz prací (PoW)“. Přesnou podmínkou je, že dvojitý SHA-256 hash každého bloku, považovaný za 256bitové číslo, musí být menší než dynamicky upravovaný cíl, který je v době psaní tohoto textu přibližně 2<sup>187</sup>. Účelem toho je učinit vytváření bloků výpočetně „těžkým“, čímž se zabrání Sybil útočníkům v přetvoření celého blockchainu v jejich prospěch. Protože SHA-256 je navržen jako zcela nepředvídatelná pseudonáhodná funkce, jediným způsobem, jak vytvořit platný blok, je jednoduše pokus a omyl, opakované inkrementování nonce a sledování, zda se nový hash shoduje.

Při současném cíli ~2<sup>187</sup> musí síť provést v průměru ~2<sup>69</sup> pokusů, než je nalezen platný blok; obecně je cíl sítí rekalibrován každých 2016 bloků tak, aby v průměru nějaký uzel v síti vyprodukoval nový blok každých deset minut. Aby byli těžaři za tuto výpočetní práci kompenzováni, má těžař každého bloku právo zahrnout transakci, která mu z ničeho nic přidělí 25 BTC. Navíc, pokud má jakákoli transakce vyšší celkovou nominální hodnotu na svých vstupech než na svých výstupech, rozdíl jde také těžaři jako „transakční poplatek“. Mimochodem, toto je také jediný mechanismus, kterým jsou BTC emitovány; genesis stav neobsahoval vůbec žádné mince.

Abychom lépe porozuměli účelu těžby, podívejme se, co se stane v případě škodlivého útočníka. Vzhledem k tomu, že základní kryptografie Bitcoinu je známá jako bezpečná, útočník se zaměří na jedinou část systému Bitcoin, která není přímo chráněna kryptografií: pořadí transakcí. Strategie útočníka je jednoduchá:

1. Poslat 100 BTC obchodníkovi výměnou za nějaký produkt (nejlépe digitální zboží s rychlým dodáním).
2. Počkat na dodání produktu.
3. Vytvořit další transakci, která pošle stejných 100 BTC jemu samotnému.
4. Pokusit se přesvědčit síť, že jeho transakce jemu samotnému byla ta, která přišla jako první.

Jakmile proběhne krok (1), po několika minutách nějaký těžař zahrne transakci do bloku, řekněme bloku číslo 270000. Asi po jedné hodině bude do řetězce za tento blok přidáno dalších pět bloků, přičemž každý z těchto bloků nepřímo ukazuje na transakci a tím ji „potvrzuje“. V tomto okamžiku obchodník přijme platbu jako finalizovanou a dodá produkt; protože předpokládáme, že se jedná o digitální zboží, dodání je okamžité. Nyní útočník vytvoří další transakci, kterou pošle 100 BTC sobě. Pokud ji útočník jednoduše vypustí do světa, transakce nebude zpracována; těžaři se pokusí spustit `APPLY(S,TX)` a všimnou si, že `TX` spotřebovává UTXO, které již není ve stavu. Místo toho tedy útočník vytvoří „fork“ blockchainu, počínaje vytěžením další verze bloku 270000 ukazující na stejný blok 269999 jako na rodiče, ale s novou transakcí namísto té staré. Protože data bloku jsou odlišná, vyžaduje to předělání důkazu prací (PoW). Kromě toho má útočníkova nová verze bloku 270000 jiný hash, takže původní bloky 270001 až 270005 na něj „neukazují“; původní řetězec a útočníkův nový řetězec jsou tedy zcela oddělené. Pravidlem je, že ve forku je za pravdu považován nejdelší blockchain, a tak legitimní těžaři budou pracovat na řetězci 270005, zatímco útočník sám pracuje na řetězci 270000. Aby útočník udělal svůj blockchain nejdelším, musel by mít větší výpočetní výkon než zbytek sítě dohromady, aby ji dohnal (odtud „51% útok“).

### Merkleovy stromy {#merkle-trees}

![SPV in Bitcoin](./spv-bitcoin.png)

_Vlevo: k poskytnutí důkazu o platnosti větve stačí prezentovat pouze malý počet uzlů v Merkleově stromu._

_Vpravo: jakýkoli pokus o změnu jakékoli části Merkleova stromu nakonec povede k nekonzistenci někde výše v řetězci._

Důležitou vlastností škálovatelnosti Bitcoinu je, že blok je uložen ve víceúrovňové datové struktuře. „Hash“ bloku je ve skutečnosti pouze hash hlavičky bloku, zhruba 200bajtového kusu dat, který obsahuje časové razítko, nonce, hash předchozího bloku a kořenový hash datové struktury zvané Merkleův strom, která ukládá všechny transakce v bloku. Merkleův strom je typ binárního stromu, složený ze sady uzlů s velkým počtem listových uzlů ve spodní části stromu obsahujících podkladová data, sady mezilehlých uzlů, kde každý uzel je hashem svých dvou potomků, a nakonec jediného kořenového uzlu, rovněž vytvořeného z hashe svých dvou potomků, představujícího „vrchol“ stromu. Účelem Merkleova stromu je umožnit doručování dat v bloku po částech: uzel si může stáhnout pouze hlavičku bloku z jednoho zdroje, malou část stromu, která je pro něj relevantní, z jiného zdroje, a přesto si může být jistý, že všechna data jsou správná. Důvodem, proč to funguje, je to, že hashe se šíří nahoru: pokud se škodlivý uživatel pokusí vyměnit falešnou transakci ve spodní části Merkleova stromu, tato změna způsobí změnu v uzlu nad ním a poté změnu v uzlu nad ním, čímž se nakonec změní kořen stromu a tím i hash bloku, což způsobí, že jej protokol zaregistruje jako zcela odlišný blok (téměř jistě s neplatným důkazem prací).

Protokol Merkleova stromu je pravděpodobně nezbytný pro dlouhodobou udržitelnost. „Plný uzel“ v síti Bitcoin, ten, který ukládá a zpracovává celý každý blok, zabírá v síti Bitcoin k dubnu 2014 asi 15 GB místa na disku a roste o více než gigabajt měsíčně. V současné době je to schůdné pro některé stolní počítače a ne pro telefony, a později v budoucnu se budou moci účastnit pouze podniky a nadšenci. Protokol známý jako „zjednodušené ověření platby“ (SPV) umožňuje existenci další třídy uzlů, zvaných „lehké uzly“, které stahují hlavičky bloků, ověřují důkaz prací na hlavičkách bloků a poté stahují pouze „větve“ spojené s transakcemi, které jsou pro ně relevantní. To umožňuje lehkým uzlům se silnou zárukou bezpečnosti určit, jaký je stav jakékoli bitcoinové transakce a jejich aktuální zůstatek, a to při stahování pouze velmi malé části celého blockchainu.

### Alternativní blockchainové aplikace {#alternative-blockchain-applications}

Myšlenka vzít základní myšlenku blockchainu a aplikovat ji na jiné koncepty má také dlouhou historii. V roce 2005 přišel Nick Szabo s konceptem „[bezpečných vlastnických práv s autoritou vlastníka](https://nakamotoinstitute.org/library/secure-property-titles/)“, dokumentem popisujícím, jak „nové pokroky v technologii replikovaných databází“ umožní systém založený na blockchainu pro ukládání registru toho, kdo vlastní jaký pozemek, čímž se vytvoří propracovaný rámec zahrnující koncepty jako homesteading, vydržení a georgistická daň z pozemků. V té době však bohužel nebyl k dispozici žádný efektivní systém replikované databáze, a tak protokol nebyl nikdy implementován v praxi. Po roce 2009, jakmile byl vyvinut decentralizovaný konsensus Bitcoinu, se však rychle začala objevovat řada alternativních aplikací.

- **Namecoin** – vytvořený v roce 2010, [Namecoin](https://namecoin.org/) lze nejlépe popsat jako decentralizovanou databázi registrace jmen. V decentralizovaných protokolech, jako jsou Tor, Bitcoin a BitMessage, musí existovat nějaký způsob identifikace účtů, aby s nimi mohli ostatní lidé komunikovat, ale ve všech existujících řešeních je jediným dostupným druhem identifikátoru pseudonáhodný hash jako `1LW79wp5ZBqaHW1jL5TCiBCrhQYtHagUWy`. V ideálním případě by člověk chtěl mít možnost mít účet se jménem jako „george“. Problém je však v tom, že pokud si jedna osoba může vytvořit účet s názvem „george“, pak někdo jiný může použít stejný proces k registraci „george“ i pro sebe a vydávat se za ni. Jediným řešením je paradigma „kdo dřív přijde, ten dřív mele“ (first-to-file), kde první registrující uspěje a druhý selže – problém dokonale vhodný pro protokol konsensu Bitcoinu. Namecoin je nejstarší a nejúspěšnější implementací systému registrace jmen využívající takovou myšlenku.
- **Colored coins** – účelem [barevných mincí](https://docs.google.com/a/buterin.com/document/d/1AnkP_cVZTCMLIzw4DvsW6M8Q2JC0lIzrTLuoWu2z1BE/edit) (colored coins) je sloužit jako protokol, který lidem umožní vytvářet si vlastní digitální měny – nebo, v důležitém triviálním případě měny s jednou jednotkou, digitální tokeny, na blockchainu Bitcoinu. V protokolu barevných mincí se nová měna „emituje“ veřejným přiřazením barvy konkrétnímu bitcoinovému UTXO a protokol rekurzivně definuje barvu dalších UTXO tak, aby byla stejná jako barva vstupů, které transakce, jež je vytvořila, utratila (v případě vstupů se smíšenými barvami platí některá zvláštní pravidla). To umožňuje uživatelům udržovat peněženky obsahující pouze UTXO konkrétní barvy a posílat je podobně jako běžné bitcoiny, přičemž se zpětně prohledává blockchain, aby se určila barva jakéhokoli UTXO, které obdrží.
- **Metacoins** – myšlenkou za metacoinem je mít protokol, který žije nad Bitcoinem, využívá bitcoinové transakce k ukládání transakcí metacoinu, ale má jinou funkci přechodu stavu, `APPLY'`. Protože protokol metacoinu nemůže zabránit tomu, aby se v blockchainu Bitcoinu objevily neplatné transakce metacoinu, je přidáno pravidlo, že pokud `APPLY'(S,TX)` vrátí chybu, protokol se vrátí k `APPLY'(S,TX) = S`. To poskytuje snadný mechanismus pro vytvoření libovolného protokolu kryptoměny, potenciálně s pokročilými funkcemi, které nelze implementovat uvnitř samotného Bitcoinu, ale s velmi nízkými náklady na vývoj, protože složitosti těžby a sítí již řeší protokol Bitcoinu. Metacoiny byly použity k implementaci některých tříd finančních kontraktů, registrace jmen a decentralizované burzy.

Obecně tedy existují dva přístupy k budování protokolu konsensu: vybudování nezávislé sítě a vybudování protokolu nad Bitcoinem. První přístup, ačkoli je poměrně úspěšný v případě aplikací jako Namecoin, je obtížné implementovat; každá jednotlivá implementace musí nastartovat (bootstrap) nezávislý blockchain a také vybudovat a otestovat veškerý nezbytný kód pro přechod stavu a sítě. Kromě toho předpovídáme, že sada aplikací pro technologii decentralizovaného konsensu bude následovat rozdělení podle mocninného zákona (power law distribution), kde by drtivá většina aplikací byla příliš malá na to, aby ospravedlnila svůj vlastní blockchain, a poznamenáváme, že existují velké třídy decentralizovaných aplikací, zejména decentralizované autonomní organizace, které spolu potřebují komunikovat.

Přístup založený na Bitcoinu má na druhou stranu tu vadu, že nedědí funkce zjednodušeného ověření platby Bitcoinu. SPV funguje pro Bitcoin, protože může použít hloubku blockchainu jako zástupný ukazatel platnosti; v určitém okamžiku, jakmile předkové transakce sahají dostatečně daleko do minulosti, lze s jistotou říci, že byli legitimně součástí stavu. Metaprotokoly založené na blockchainu na druhou stranu nemohou donutit blockchain, aby nezahrnoval transakce, které nejsou platné v kontextu jejich vlastních protokolů. Plně bezpečná implementace metaprotokolu SPV by proto musela zpětně skenovat celou cestu až na začátek blockchainu Bitcoinu, aby určila, zda jsou určité transakce platné, či nikoli. V současné době všechny „lehké“ implementace metaprotokolů založených na Bitcoinu spoléhají na důvěryhodný server, který poskytuje data, což je pravděpodobně vysoce suboptimální výsledek, zejména když jedním z primárních účelů kryptoměny je eliminovat potřebu důvěry.

### Skriptování {#scripting}

I bez jakýchkoli rozšíření protokol Bitcoinu ve skutečnosti usnadňuje slabou verzi konceptu „chytrých kontraktů“. UTXO v Bitcoinu může být vlastněno nejen veřejným klíčem, ale také složitějším skriptem vyjádřeným v jednoduchém programovacím jazyce založeném na zásobníku. V tomto paradigmatu musí transakce utrácející toto UTXO poskytnout data, která vyhovují skriptu. Dokonce i základní mechanismus vlastnictví veřejného klíče je implementován pomocí skriptu: skript vezme jako vstup podpis eliptické křivky, ověří jej vůči transakci a adrese, která vlastní UTXO, a vrátí 1, pokud je ověření úspěšné, a 0 v opačném případě. Pro různé další případy použití existují jiné, složitější skripty. Lze například zkonstruovat skript, který k ověření vyžaduje podpisy ze dvou z daných tří soukromých klíčů („multisig“), což je nastavení užitečné pro firemní účty, bezpečné spořicí účty a některé situace úschovy u obchodníků. Skripty lze také použít k vyplácení odměn za řešení výpočetních problémů a lze dokonce zkonstruovat skript, který říká něco jako „toto bitcoinové UTXO je vaše, pokud můžete poskytnout důkaz SPV, že jste mi poslali transakci Dogecoinu v této nominální hodnotě“, což v podstatě umožňuje decentralizovanou výměnu mezi kryptoměnami.

Skriptovací jazyk implementovaný v Bitcoinu má však několik důležitých omezení:

- **Nedostatek Turingovy úplnosti** – to znamená, že ačkoli existuje velká podmnožina výpočtů, které skriptovací jazyk Bitcoinu podporuje, zdaleka nepodporuje vše. Hlavní kategorií, která chybí, jsou smyčky. Děje se tak proto, aby se zabránilo nekonečným smyčkám během ověřování transakcí; teoreticky je to pro programátory skriptů překonatelná překážka, protože jakoukoli smyčku lze simulovat jednoduchým opakováním podkladového kódu mnohokrát pomocí příkazu if, ale vede to ke skriptům, které jsou velmi prostorově neefektivní. Například implementace alternativního algoritmu podpisu eliptické křivky by pravděpodobně vyžadovala 256 opakovaných kol násobení, všechna jednotlivě zahrnutá v kódu.
- **Slepota vůči hodnotě** – neexistuje způsob, jak by skript UTXO mohl poskytnout jemnou kontrolu nad částkou, kterou lze vybrat. Například jedním mocným případem použití kontraktu orákula by byl zajišťovací kontrakt (hedging contract), kde A a B vloží BTC v hodnotě 1000 $ a po 30 dnech skript pošle BTC v hodnotě 1000 $ A a zbytek B. To by vyžadovalo orákulum k určení hodnoty 1 BTC v USD, ale i tak je to obrovské zlepšení z hlediska důvěry a požadavků na infrastrukturu oproti plně centralizovaným řešením, která jsou nyní k dispozici. Protože jsou však UTXO typu všechno nebo nic, jediným způsobem, jak toho dosáhnout, je velmi neefektivní hack spočívající v tom, že existuje mnoho UTXO různých nominálních hodnot (např. jedno UTXO o velikosti 2<sup>k</sup> pro každé k až do 30) a orákulum vybere, které UTXO pošle A a které B.
- **Nedostatek stavu** – UTXO může být buď utraceno, nebo neutraceno; neexistuje žádná příležitost pro vícestupňové kontrakty nebo skripty, které by kromě toho udržovaly jakýkoli jiný vnitřní stav. To ztěžuje vytváření vícestupňových opčních kontraktů, nabídek decentralizovaných burz nebo dvoustupňových protokolů kryptografických závazků (nezbytných pro bezpečné výpočetní odměny). Znamená to také, že UTXO lze použít pouze k budování jednoduchých, jednorázových kontraktů a nikoli složitějších „stavových“ kontraktů, jako jsou decentralizované organizace, a ztěžuje to implementaci metaprotokolů. Binární stav v kombinaci se slepotou vůči hodnotě také znamená, že další důležitá aplikace, limity pro výběr, je nemožná.
- **Slepota vůči blockchainu** – UTXO jsou slepá vůči datům blockchainu, jako je nonce, časové razítko a hash předchozího bloku. To vážně omezuje aplikace v hazardních hrách a několika dalších kategoriích tím, že připravuje skriptovací jazyk o potenciálně cenný zdroj náhodnosti.

Vidíme tedy tři přístupy k budování pokročilých aplikací nad kryptoměnou: vybudování nového blockchainu, použití skriptování nad Bitcoinem a vybudování metaprotokolu nad Bitcoinem. Vybudování nového blockchainu umožňuje neomezenou svobodu při budování sady funkcí, ale za cenu doby vývoje, úsilí při spouštění (bootstrapping) a bezpečnosti. Použití skriptování se snadno implementuje a standardizuje, ale je velmi omezené ve svých schopnostech, a metaprotokoly, ačkoli jsou snadné, trpí chybami ve škálovatelnosti. S Ethereem zamýšlíme vybudovat alternativní rámec, který poskytuje ještě větší zisky ve snadnosti vývoje a také ještě silnější vlastnosti lehkého klienta, a zároveň umožňuje aplikacím sdílet ekonomické prostředí a bezpečnost blockchainu.

## Ethereum {#ethereum}

Záměrem Etherea je vytvořit alternativní protokol pro budování decentralizovaných aplikací (dapps), který poskytuje odlišný soubor kompromisů. Věříme, že bude velmi užitečný pro velkou třídu decentralizovaných aplikací, se zvláštním důrazem na situace, kde je důležitá rychlá doba vývoje, bezpečnost pro malé a zřídka používané aplikace a schopnost různých aplikací velmi efektivně interagovat. Ethereum toho dosahuje vybudováním toho, co je v podstatě ultimátní abstraktní základní vrstvou: blockchain s vestavěným Turingovsky úplným programovacím jazykem, který umožňuje komukoli psát chytré kontrakty a decentralizované aplikace, kde si mohou vytvořit svá vlastní libovolná pravidla pro vlastnictví, formáty transakcí a funkce přechodu stavu. Ořezaná verze Namecoinu může být napsána ve dvou řádcích kódu a další protokoly, jako jsou měny a systémy reputace, mohou být postaveny na méně než dvaceti. Chytré kontrakty, kryptografické „schránky“, které obsahují hodnotu a odemknou ji pouze při splnění určitých podmínek, mohou být také postaveny na této platformě. Mají mnohem větší sílu než to, co nabízí skriptování Bitcoinu, a to díky přidaným schopnostem Turingovy úplnosti, povědomí o hodnotě, povědomí o blockchainu a stavu.

### Účty v Ethereu {#ethereum-accounts}

V Ethereu je stav tvořen objekty zvanými „účty“, přičemž každý účet má 20bajtovou adresu a přechody stavu jsou přímé převody hodnoty a informací mezi účty. Účet v Ethereu obsahuje čtyři pole:

- **nonce**, počítadlo používané k zajištění toho, že každá transakce může být zpracována pouze jednou
- Aktuální **zůstatek etheru** na účtu
- **Kód kontraktu** účtu, pokud je přítomen
- **Úložiště** účtu (ve výchozím nastavení prázdné)

„Ether“ je hlavní interní krypto-palivo Etherea a používá se k placení transakčních poplatků. Obecně existují dva typy účtů: **externě vlastněné účty**, ovládané soukromými klíči, a **kontraktové účty**, ovládané jejich kódem kontraktu. Externě vlastněný účet nemá žádný kód a zprávy z něj lze odesílat vytvořením a podepsáním transakce; u kontraktového účtu se pokaždé, když obdrží zprávu, aktivuje jeho kód, což mu umožňuje číst a zapisovat do interního úložiště a následně odesílat další zprávy nebo vytvářet kontrakty.

Všimněte si, že „kontrakty“ v Ethereu by neměly být vnímány jako něco, co by mělo být „splněno“ nebo „dodrženo“; spíše se podobají „autonomním agentům“, kteří žijí uvnitř prováděcího prostředí Etherea, vždy spustí specifickou část kódu, když jsou „pošťouchnuti“ zprávou nebo transakcí, a mají přímou kontrolu nad svým vlastním zůstatkem etheru a vlastním úložištěm klíč/hodnota pro sledování trvalých proměnných.

### Zprávy a transakce {#messages-and-transactions}

Termín „transakce“ se v Ethereu používá k označení podepsaného datového balíčku, který uchovává zprávu k odeslání z externě vlastněného účtu. Transakce obsahují:

- Příjemce zprávy
- Podpis identifikující odesílatele
- Množství etheru k převodu od odesílatele k příjemci
- Volitelné datové pole
- Hodnotu `STARTGAS`, představující maximální počet výpočetních kroků, které může provádění transakce zabrat
- Hodnotu `GASPRICE`, představující poplatek, který odesílatel platí za každý výpočetní krok

První tři jsou standardní pole očekávaná v jakékoli kryptoměně. Datové pole nemá ve výchozím nastavení žádnou funkci, ale virtuální stroj má operační kód, pomocí kterého může kontrakt k datům přistupovat; jako příklad použití, pokud kontrakt funguje jako onchain služba pro registraci domén, pak může chtít interpretovat předávaná data tak, že obsahují dvě „pole“, přičemž první pole je doména k registraci a druhé pole je IP adresa, na kterou se má zaregistrovat. Kontrakt by tyto hodnoty přečetl z dat zprávy a odpovídajícím způsobem je umístil do úložiště.

Pole `STARTGAS` a `GASPRICE` jsou klíčová pro model Etherea proti odepření služby (anti-denial of service). Aby se zabránilo náhodným nebo nepřátelským nekonečným smyčkám či jinému plýtvání výpočetním výkonem v kódu, každá transakce musí nastavit limit, kolik výpočetních kroků provádění kódu může využít. Základní jednotkou výpočtu je „gas“; obvykle stojí jeden výpočetní krok 1 gas, ale některé operace stojí vyšší množství gasu, protože jsou výpočetně náročnější nebo zvyšují množství dat, která musí být uložena jako součást stavu. Existuje také poplatek 5 gas za každý bajt v datech transakce. Záměrem systému poplatků je vyžadovat, aby útočník platil úměrně za každý zdroj, který spotřebuje, včetně výpočtů, šířky pásma a úložiště; proto každá transakce, která vede k tomu, že síť spotřebuje větší množství kteréhokoli z těchto zdrojů, musí mít poplatek za plyn zhruba úměrný tomuto nárůstu.

### Zprávy {#messages}

Kontrakty mají schopnost posílat „zprávy“ jiným kontraktům. Zprávy jsou virtuální objekty, které se nikdy neserializují a existují pouze v prováděcím prostředí Etherea. Zpráva obsahuje:

- Odesílatele zprávy (implicitní)
- Příjemce zprávy
- Množství etheru k převodu spolu se zprávou
- Volitelné datové pole
- Hodnotu `STARTGAS`

Zpráva je v podstatě jako transakce, s tím rozdílem, že je vytvořena kontraktem a ne externím aktérem. Zpráva je vytvořena, když kontrakt, který právě provádí kód, spustí operační kód `CALL`, což vytvoří a provede zprávu. Stejně jako transakce, zpráva vede k tomu, že účet příjemce spustí svůj kód. Kontrakty tak mohou mít vztahy s jinými kontrakty přesně stejným způsobem jako externí aktéři.

Všimněte si, že povolený limit gasu přidělený transakcí nebo kontraktem se vztahuje na celkový gas spotřebovaný touto transakcí a všemi dílčími prováděními. Například, pokud externí aktér A pošle transakci B s 1000 gas a B spotřebuje 600 gas před odesláním zprávy C, a interní provádění C spotřebuje 300 gas před návratem, pak B může utratit dalších 100 gas, než mu gas dojde.

### Funkce přechodu stavu Etherea {#ethereum-state-transition-function}

![Ether state transition](./ether-state-transition.png)

Funkci přechodu stavu Etherea, `APPLY(S,TX) -> S'`, lze definovat následovně:

1. Zkontrolujte, zda je transakce správně naformátována (tj. má správný počet hodnot), podpis je platný a nonce odpovídá nonce na účtu odesílatele. Pokud ne, vraťte chybu.
2. Vypočítejte transakční poplatek jako `STARTGAS * GASPRICE` a určete odesílací adresu z podpisu. Odečtěte poplatek ze zůstatku na účtu odesílatele a zvyšte nonce odesílatele. Pokud není dostatečný zůstatek k útratě, vraťte chybu.
3. Inicializujte `GAS = STARTGAS` a odečtěte určité množství gasu za bajt k zaplacení za bajty v transakci.
4. Převeďte hodnotu transakce z účtu odesílatele na přijímající účet. Pokud přijímající účet ještě neexistuje, vytvořte jej. Pokud je přijímající účet kontrakt, spusťte kód kontraktu buď do dokončení, nebo dokud provádění nedojde gas.
5. Pokud převod hodnoty selhal, protože odesílatel neměl dostatek peněz, nebo provádění kódu došel gas, zvraťte všechny změny stavu kromě platby poplatků a přidejte poplatky na účet těžaře.
6. V opačném případě vraťte poplatky za veškerý zbývající gas odesílateli a pošlete poplatky zaplacené za spotřebovaný gas těžaři.

Předpokládejme například, že kód kontraktu je:

```py
if !self.storage[calldataload(0)]:
  self.storage[calldataload(0)] = calldataload(32)
```

Všimněte si, že ve skutečnosti je kód kontraktu napsán v nízkoúrovňovém kódu EVM; tento příklad je pro přehlednost napsán v Serpentu, jednom z našich vysokoúrovňových jazyků, a může být zkompilován do kódu EVM. Předpokládejme, že úložiště kontraktu začíná prázdné a je odeslána transakce s hodnotou 10 etherů, 2000 gas, cenou gasu 0,001 etheru a 64 bajty dat, přičemž bajty 0-31 představují číslo `2` a bajty 32-63 představují řetězec `CHARLIE`<sup>[fn3](#notes)</sup>. Proces pro funkci přechodu stavu je v tomto případě následující:

1. Zkontrolujte, zda je transakce platná a správně naformátovaná.
2. Zkontrolujte, zda má odesílatel transakce alespoň 2000 \* 0,001 = 2 ethery. Pokud ano, odečtěte 2 ethery z účtu odesílatele.
3. Inicializujte gas = 2000; za předpokladu, že transakce je dlouhá 170 bajtů a poplatek za bajt je 5, odečtěte 850, takže zbývá 1150 gas.
4. Odečtěte dalších 10 etherů z účtu odesílatele a přidejte je na účet kontraktu.
5. Spusťte kód. V tomto případě je to jednoduché: zkontroluje, zda je úložiště kontraktu na indexu `2` použito, zjistí, že není, a tak nastaví úložiště na indexu `2` na hodnotu `CHARLIE`. Předpokládejme, že to zabere 187 gas, takže zbývající množství gasu je 1150 - 187 = 963.
6. Přidejte 963 \* 0,001 = 0,963 etheru zpět na účet odesílatele a vraťte výsledný stav.

Pokud by na přijímajícím konci transakce nebyl žádný kontrakt, pak by se celkový transakční poplatek jednoduše rovnal poskytnuté hodnotě `GASPRICE` vynásobené délkou transakce v bajtech a data odeslaná spolu s transakcí by byla irelevantní.

Všimněte si, že zprávy fungují ekvivalentně k transakcím, pokud jde o zvrácení (reverts): pokud provádění zprávy dojde gas, pak se provádění této zprávy a všechna další provádění spuštěná tímto prováděním zvrátí, ale nadřazená provádění se zvrátit nemusí. To znamená, že je „bezpečné“, aby kontrakt volal jiný kontrakt, protože pokud A volá B s G gas, pak je zaručeno, že provádění A ztratí maximálně G gas. Nakonec si všimněte, že existuje operační kód `CREATE`, který vytváří kontrakt; mechanismus jeho provádění je obecně podobný `CALL`, s tou výjimkou, že výstup provádění určuje kód nově vytvořeného kontraktu.

### Provádění kódu {#code-execution}

Kód v kontraktech Etherea je napsán v nízkoúrovňovém bajtkódovém jazyce založeném na zásobníku, označovaném jako „kód virtuálního stroje Etherea“ nebo „kód EVM“. Kód se skládá ze série bajtů, kde každý bajt představuje operaci. Obecně je provádění kódu nekonečná smyčka, která se skládá z opakovaného provádění operace na aktuálním čítači programu (který začíná na nule) a následného zvýšení čítače programu o jedna, dokud není dosaženo konce kódu nebo není detekována chyba či instrukce `STOP` nebo `RETURN`. Operace mají přístup ke třem typům prostoru, do kterých lze ukládat data:

- **Zásobník (stack)**, kontejner typu LIFO (last-in-first-out), do kterého lze hodnoty vkládat (push) a odebírat (pop)
- **Paměť (memory)**, nekonečně rozšiřitelné pole bajtů
- Dlouhodobé **úložiště (storage)** kontraktu, úložiště klíč/hodnota. Na rozdíl od zásobníku a paměti, které se po skončení výpočtu resetují, úložiště přetrvává dlouhodobě.

Kód může také přistupovat k hodnotě, odesílateli a datům příchozí zprávy, stejně jako k datům hlavičky bloku, a kód může také vrátit pole bajtů dat jako výstup.

Formální model provádění kódu EVM je překvapivě jednoduchý. Zatímco virtuální stroj Etherea běží, jeho plný výpočetní stav může být definován n-ticí `(block_state, transaction, message, code, memory, stack, pc, gas)`, kde `block_state` je globální stav obsahující všechny účty a zahrnuje zůstatky a úložiště. Na začátku každého kola provádění se aktuální instrukce najde tak, že se vezme `pc`-tý bajt z `code` (nebo 0, pokud `pc >= len(code)`), a každá instrukce má svou vlastní definici z hlediska toho, jak ovlivňuje n-tici. Například `ADD` odebere dvě položky ze zásobníku a vloží jejich součet, sníží `gas` o 1 a zvýší `pc` o 1, a `SSTORE` odebere horní dvě položky ze zásobníku a vloží druhou položku do úložiště kontraktu na index specifikovaný první položkou. Ačkoli existuje mnoho způsobů, jak optimalizovat provádění virtuálního stroje Etherea pomocí just-in-time kompilace, základní implementaci Etherea lze provést v několika stech řádcích kódu.

### Blockchain a těžba {#blockchain-and-mining}

![Ethereum apply block diagram](./ethereum-apply-block-diagram.png)

Blockchain Etherea je v mnoha ohledech podobný blockchainu Bitcoinu, ačkoli má určité rozdíly. Hlavní rozdíl mezi Ethereem a Bitcoinem s ohledem na architekturu blockchainu spočívá v tom, že na rozdíl od Bitcoinu obsahují bloky Etherea kopii jak seznamu transakcí, tak nejnovějšího stavu. Kromě toho jsou v bloku uloženy také dvě další hodnoty, číslo bloku a obtížnost. Základní algoritmus pro validaci bloku v Ethereu je následující:

1. Zkontrolujte, zda odkazovaný předchozí blok existuje a je platný.
2. Zkontrolujte, zda je časové razítko bloku větší než časové razítko odkazovaného předchozího bloku a menší než 15 minut do budoucnosti.
3. Zkontrolujte, zda jsou číslo bloku, obtížnost, kořen transakcí (transaction root), kořen strýčků (uncle root) a limit plynu (různé nízkoúrovňové koncepty specifické pro Ethereum) platné.
4. Zkontrolujte, zda je důkaz prací (PoW) na bloku platný.
5. Nechť `S[0]` je stav na konci předchozího bloku.
6. Nechť `TX` je seznam transakcí bloku s `n` transakcemi. Pro všechny `i` v `0...n-1` nastavte `S[i+1] = APPLY(S[i],TX[i])`. Pokud jakákoli aplikace vrátí chybu, nebo pokud celkový gas spotřebovaný v bloku až do tohoto bodu překročí `GASLIMIT`, vraťte chybu.
7. Nechť `S_FINAL` je `S[n]`, ale s přidáním odměny za blok vyplacené těžaři.
8. Zkontrolujte, zda se kořen Merkleova stromu stavu `S_FINAL` rovná kořenu konečného stavu poskytnutému v hlavičce bloku. Pokud ano, blok je platný; v opačném případě platný není.

Tento přístup se může na první pohled zdát vysoce neefektivní, protože potřebuje ukládat celý stav s každým blokem, ale ve skutečnosti by efektivita měla být srovnatelná s Bitcoinem. Důvodem je, že stav je uložen ve stromové struktuře a po každém bloku je třeba změnit pouze malou část stromu. Obecně by tedy mezi dvěma sousedními bloky měla být naprostá většina stromu stejná, a proto mohou být data uložena jednou a odkazována dvakrát pomocí ukazatelů (tj. hashů podstromů). K dosažení tohoto cíle se používá speciální druh stromu známý jako „Patricia strom“, včetně úpravy konceptu Merkleova stromu, která umožňuje efektivně vkládat a mazat uzly, a nejen je měnit. Navíc, protože všechny informace o stavu jsou součástí posledního bloku, není nutné ukládat celou historii blockchainu – což je strategie, u které lze spočítat, že pokud by mohla být aplikována na Bitcoin, poskytla by 5-20násobnou úsporu místa.

Často kladenou otázkou je, „kde“ se kód kontraktu provádí, z hlediska fyzického hardwaru. To má jednoduchou odpověď: proces provádění kódu kontraktu je součástí definice funkce přechodu stavu, která je součástí algoritmu pro validaci bloku, takže pokud je transakce přidána do bloku `B`, provádění kódu vyvolané touto transakcí bude provedeno všemi uzly, nyní i v budoucnu, které stáhnou a zvalidují blok `B`.

## Aplikace {#applications}

Obecně existují tři typy aplikací postavených na Ethereu. První kategorií jsou finanční aplikace, které uživatelům poskytují mocnější způsoby správy a uzavírání kontraktů s využitím jejich peněz. Patří sem dílčí měny (sub-currencies), finanční deriváty, zajišťovací kontrakty, spořicí peněženky, závěti a nakonec i některé třídy plnohodnotných pracovních kontraktů. Druhou kategorií jsou polofinanční aplikace, kde sice figurují peníze, ale to, co se provádí, má i silnou nepeněžní stránku; dokonalým příkladem jsou automaticky vymahatelné odměny za řešení výpočetních problémů. Nakonec existují aplikace, jako je online hlasování a decentralizovaná správa, které nejsou finanční vůbec.

### Systémy tokenů {#token-systems}

Systémy tokenů na blockchainu mají mnoho aplikací, od dílčích měn reprezentujících aktiva jako USD nebo zlato, přes firemní akcie, jednotlivé tokeny představující chytrý majetek, bezpečné nepadělatelné kupóny, až po systémy tokenů bez jakékoli vazby na konvenční hodnotu, které se používají jako bodové systémy pro motivaci. Systémy tokenů se v Ethereu implementují překvapivě snadno. Klíčové je pochopit, že měna nebo systém tokenů je v podstatě jen databáze s jedinou operací: odečíst X jednotek od A a dát X jednotek B, s podmínkou, že (i) A měl před transakcí alespoň X jednotek a (2) transakce je schválena subjektem A. K implementaci systému tokenů stačí pouze implementovat tuto logiku do kontraktu.

Základní kód pro implementaci systému tokenů v jazyce Serpent vypadá následovně:

```py
def send(to, value):
  if self.storage[msg.sender] >= value:
    self.storage[msg.sender] = self.storage[msg.sender] - value
    self.storage[to] = self.storage[to] + value
```

Jde v podstatě o doslovnou implementaci funkce přechodu stavu „bankovního systému“, která je popsána výše v tomto dokumentu. Je třeba přidat několik dalších řádků kódu, které zajistí počáteční krok distribuce měnových jednotek a ošetří několik dalších okrajových případů. Ideálně by se přidala i funkce, která by ostatním kontraktům umožnila dotazovat se na zůstatek adresy. Ale to je vše. Teoreticky mohou systémy tokenů založené na Ethereu, které fungují jako dílčí měny, potenciálně obsahovat další důležitou funkci, která onchain metaměnám založeným na Bitcoinu chybí: možnost platit transakční poplatky přímo v dané měně. Způsob, jakým by se to implementovalo, spočívá v tom, že by kontrakt udržoval zůstatek etheru, ze kterého by odesílateli vracel ether použitý na zaplacení poplatků, a tento zůstatek by doplňoval tím, že by shromažďoval interní měnové jednotky vybrané na poplatcích a dále je prodával v neustále probíhající aukci. Uživatelé by si tak museli své účty „aktivovat“ etherem, ale jakmile by tam ether byl, dal by se používat opakovaně, protože by ho kontrakt pokaždé vrátil.

### Finanční deriváty a měny se stabilní hodnotou {#financial-derivatives-and-stable-value-currencies}

Finanční deriváty jsou nejběžnější aplikací „chytrého kontraktu“ a jednou z nejjednodušších na implementaci v kódu. Hlavní výzvou při implementaci finančních kontraktů je to, že většina z nich vyžaduje odkaz na externí cenový zdroj (price ticker); velmi žádanou aplikací je například chytrý kontrakt, který zajišťuje proti volatilitě etheru (nebo jiné kryptoměny) vůči americkému dolaru, ale k tomu je nutné, aby kontrakt znal hodnotu ETH/USD. Nejjednodušším způsobem, jak toho dosáhnout, je prostřednictvím kontraktu „datového zdroje“ (data feed), který spravuje konkrétní strana (např. NASDAQ), navrženého tak, aby tato strana měla možnost kontrakt podle potřeby aktualizovat, a poskytujícího rozhraní, které umožňuje ostatním kontraktům odeslat tomuto kontraktu zprávu a získat zpět odpověď s cenou.

S touto klíčovou ingrediencí by zajišťovací kontrakt vypadal následovně:

1. Počkat, až strana A vloží 1000 etherů.
2. Počkat, až strana B vloží 1000 etherů.
3. Zaznamenat hodnotu 1000 etherů v USD, vypočítanou dotazem na kontrakt datového zdroje, do úložiště, řekněme, že je to $x.
4. Po 30 dnech umožnit straně A nebo B „znovu aktivovat“ kontrakt za účelem odeslání etheru v hodnotě $x (vypočítané opětovným dotazem na kontrakt datového zdroje pro získání nové ceny) straně A a zbytku straně B.

Takový kontrakt by měl v krypto-komerci značný potenciál. Jedním z hlavních zmiňovaných problémů kryptoměn je skutečnost, že jsou volatilní; ačkoli mnoho uživatelů a obchodníků může chtít bezpečnost a pohodlí při nakládání s kryptografickými aktivy, nemusí chtít čelit vyhlídce, že během jediného dne ztratí 23 % hodnoty svých prostředků. Dosud nejčastěji navrhovaným řešením byla aktiva krytá emitentem; myšlenka spočívá v tom, že emitent vytvoří dílčí měnu, ve které má právo vydávat a stahovat jednotky, a poskytne jednu jednotku měny každému, kdo mu (offline) poskytne jednu jednotku specifikovaného podkladového aktiva (např. zlato, USD). Emitent pak slibuje, že poskytne jednu jednotku podkladového aktiva každému, kdo pošle zpět jednu jednotku kryptoaktiva. Tento mechanismus umožňuje „povýšit“ jakékoli nekryptografické aktivum na kryptografické aktivum za předpokladu, že lze emitentovi důvěřovat.

V praxi však emitenti nejsou vždy důvěryhodní a v některých případech je bankovní infrastruktura příliš slabá nebo příliš nepřátelská na to, aby takové služby mohly existovat. Finanční deriváty představují alternativu. Zde místo jediného emitenta, který poskytuje prostředky na krytí aktiva, hraje tuto roli decentralizovaný trh spekulantů, kteří sázejí na to, že cena kryptografického referenčního aktiva (např. ETH) poroste. Na rozdíl od emitentů nemají spekulanti možnost nesplnit svou část dohody, protože zajišťovací kontrakt drží jejich prostředky v úschově (escrow). Všimněte si, že tento přístup není plně decentralizovaný, protože k poskytování cenového zdroje je stále zapotřebí důvěryhodný zdroj, ačkoli i tak jde pravděpodobně o obrovské zlepšení z hlediska snížení požadavků na infrastrukturu (na rozdíl od role emitenta nevyžaduje vydávání cenového zdroje žádné licence a lze jej pravděpodobně kategorizovat jako svobodu projevu) a snížení potenciálu pro podvody.

### Systémy identity a reputace {#identity-and-reputation-systems}

Vůbec první alternativní kryptoměna, [Namecoin](http://namecoin.org/), se pokusila využít blockchain podobný Bitcoinu k poskytování systému registrace jmen, kde si uživatelé mohou registrovat svá jména ve veřejné databázi spolu s dalšími údaji. Hlavním uváděným případem užití je systém [DNS](https://wikipedia.org/wiki/Domain_Name_System), který mapuje doménová jména jako „bitcoin.org“ (nebo v případě Namecoinu „bitcoin.bit“) na IP adresu. Mezi další případy užití patří ověřování e-mailů a potenciálně pokročilejší systémy reputace. Zde je základní kontrakt pro poskytování systému registrace jmen podobného Namecoinu na Ethereu:

```py
def register(name, value):
  if !self.storage[name]:
    self.storage[name] = value
```

Kontrakt je velmi jednoduchý; je to jen databáze uvnitř sítě Ethereum, do které lze přidávat, ale nelze z ní upravovat ani odstraňovat. Kdokoli může zaregistrovat jméno s nějakou hodnotou a tato registrace pak zůstává navždy. Sofistikovanější kontrakt pro registraci jmen bude mít také „klauzuli funkce“, která umožní ostatním kontraktům se na něj dotazovat, a také mechanismus pro „vlastníka“ (tj. prvního registrujícího) jména, aby mohl změnit data nebo převést vlastnictví. Navrch lze dokonce přidat funkce reputace a sítě důvěry (web-of-trust).

### Decentralizované ukládání souborů {#decentralized-file-storage}

V posledních několika letech se objevila řada populárních startupů pro online ukládání souborů, z nichž nejvýznamnější je Dropbox, které se snaží uživatelům umožnit nahrát zálohu jejich pevného disku a nechat službu tuto zálohu uložit a umožnit k ní uživateli přístup výměnou za měsíční poplatek. V současné době je však trh s ukládáním souborů někdy poměrně neefektivní; zběžný pohled na různá existující řešení ukazuje, že zejména na úrovni „uncanny valley“ 20–200 GB, kde neplatí ani bezplatné kvóty, ani slevy na podnikové úrovni, jsou měsíční ceny za běžné ukládání souborů takové, že za jediný měsíc zaplatíte více, než je cena celého pevného disku. Kontrakty Etherea mohou umožnit vývoj decentralizovaného ekosystému pro ukládání souborů, kde si jednotliví uživatelé mohou vydělat malé částky peněz pronajímáním vlastních pevných disků a nevyužité místo lze využít k dalšímu snížení nákladů na ukládání souborů.

Klíčovým základním prvkem takového zařízení by bylo to, co jsme nazvali „decentralizovaný kontrakt Dropboxu“. Tento kontrakt funguje následovně. Nejprve se požadovaná data rozdělí na bloky, každý blok se zašifruje kvůli soukromí a vytvoří se z nich Merkleův strom. Poté se vytvoří kontrakt s pravidlem, že každých N bloků kontrakt vybere náhodný index v Merkleově stromu (s využitím hashe předchozího bloku, který je přístupný z kódu kontraktu, jako zdroje náhodnosti) a dá X etherů první entitě, která dodá transakci s důkazem vlastnictví bloku na daném indexu ve stromu, podobným zjednodušenému ověření platby. Když si uživatel chce svůj soubor znovu stáhnout, může k obnovení souboru použít protokol kanálu pro mikroplatby (např. zaplatit 1 szabo za 32 kilobajtů); z hlediska poplatků je nejefektivnějším přístupem, když plátce transakci nezveřejní až do konce, ale místo toho po každých 32 kilobajtech nahradí transakci o něco lukrativnější transakcí se stejnou hodnotou nonce.

Důležitou vlastností protokolu je, že ačkoli se může zdát, že člověk důvěřuje mnoha náhodným uzlům, že se nerozhodnou soubor zapomenout, lze toto riziko snížit téměř na nulu rozdělením souboru na mnoho částí prostřednictvím sdílení tajemství (secret sharing) a sledováním kontraktů, aby se zjistilo, zda je každá část stále v držení nějakého uzlu. Pokud kontrakt stále vyplácí peníze, poskytuje to kryptografický důkaz, že někdo tam venku soubor stále ukládá.

### Decentralizované autonomní organizace {#decentralized-autonomous-organizations}

Obecný koncept „decentralizované autonomní organizace“ (DAO) představuje virtuální entitu, která má určitou skupinu členů nebo akcionářů, kteří mají, řekněme s 67% většinou, právo utrácet prostředky entity a upravovat její kód. Členové by kolektivně rozhodovali o tom, jak by měla organizace alokovat své prostředky. Metody alokace prostředků DAO by mohly sahat od odměn (bounties) a platů až po exotičtější mechanismy, jako je interní měna pro odměňování práce. To v podstatě kopíruje právní náležitosti tradiční společnosti nebo neziskové organizace, ale k vymáhání využívá pouze kryptografickou technologii blockchainu. Dosud se většina diskusí o DAO točila kolem „kapitalistického“ modelu „decentralizované autonomní korporace“ (DAC) s akcionáři pobírajícími dividendy a obchodovatelnými akciemi; alternativa, kterou lze možná popsat jako „decentralizovanou autonomní komunitu“, by znamenala, že by všichni členové měli stejný podíl na rozhodování a k přidání nebo odebrání člena by byl nutný souhlas 67 % stávajících členů. Požadavek, aby jedna osoba mohla mít pouze jedno členství, by pak musela skupina vymáhat kolektivně.

Obecný nástin toho, jak naprogramovat DAO, je následující. Nejjednodušším návrhem je prostě kus sebemodifikujícího se kódu, který se změní, pokud se na změně shodnou dvě třetiny členů. Ačkoli je kód teoreticky neměnný, lze to snadno obejít a dosáhnout de facto měnitelnosti tím, že se části kódu umístí do samostatných kontraktů a adresa, které kontrakty se mají volat, se uloží do modifikovatelného úložiště. V jednoduché implementaci takového kontraktu DAO by existovaly tři typy transakcí, které by se lišily podle dat poskytnutých v transakci:

- `[0,i,K,V]` pro registraci návrhu s indexem `i` na změnu adresy na indexu úložiště `K` na hodnotu `V`
- `[1,i]` pro registraci hlasu ve prospěch návrhu `i`
- `[2,i]` pro finalizaci návrhu `i`, pokud byl odevzdán dostatek hlasů

Kontrakt by pak měl klauzule pro každý z těchto případů. Udržoval by záznam o všech otevřených změnách úložiště spolu se seznamem těch, kteří pro ně hlasovali. Měl by také seznam všech členů. Když by jakákoli změna úložiště získala hlasy dvou třetin členů, finalizační transakce by mohla změnu provést. Sofistikovanější kostra by měla také zabudovanou možnost hlasování pro funkce, jako je odeslání transakce, přidávání členů a odebírání členů, a mohla by dokonce poskytovat delegaci hlasů ve stylu [tekuté demokracie (Liquid Democracy)](https://wikipedia.org/wiki/Liquid_democracy) (tj. kdokoli může pověřit někoho, aby hlasoval za něj, a pověření je tranzitivní, takže pokud A pověří B a B pověří C, pak C určuje hlas A). Tento návrh by umožnil DAO organicky růst jako decentralizovaná komunita, což by lidem umožnilo nakonec delegovat úkol filtrování toho, kdo je členem, na specialisty, ačkoli na rozdíl od „současného systému“ mohou specialisté v průběhu času snadno vznikat a zanikat, jak jednotliví členové komunity mění své preference.

Alternativním modelem je decentralizovaná korporace, kde jakýkoli účet může mít nula nebo více akcií a k rozhodnutí jsou zapotřebí dvě třetiny akcií. Kompletní kostra by zahrnovala funkce správy aktiv, možnost podat nabídku na nákup nebo prodej akcií a možnost přijímat nabídky (nejlépe s mechanismem párování objednávek uvnitř kontraktu). Delegace by také existovala ve stylu tekuté demokracie, což by zobecnilo koncept „představenstva“.

### Další aplikace {#further-applications}

**1. Spořicí peněženky**. Předpokládejme, že Alice chce udržet své prostředky v bezpečí, ale obává se, že ztratí svůj soukromý klíč nebo jí ho někdo hackne. Vloží ether do kontraktu s Bobem, bankou, následovně:

- Sama Alice může vybrat maximálně 1 % prostředků denně.
- Sám Bob může vybrat maximálně 1 % prostředků denně, ale Alice má možnost provést transakci se svým klíčem, čímž tuto možnost vypne.
- Alice a Bob společně mohou vybrat cokoli.

Normálně Alici stačí 1 % denně, a pokud chce Alice vybrat více, může požádat Boba o pomoc. Pokud je Alicin klíč hacknut, běží za Bobem, aby přesunul prostředky do nového kontraktu. Pokud ztratí svůj klíč, Bob nakonec prostředky vybere. Pokud se ukáže, že Bob má zlé úmysly, může mu možnost výběru vypnout.

**2. Pojištění úrody**. Lze snadno vytvořit kontrakt na finanční deriváty, ale místo jakéhokoli cenového indexu použít datový zdroj o počasí. Pokud si farmář v Iowě koupí derivát, který vyplácí nepřímo úměrně na základě srážek v Iowě, pak v případě sucha farmář automaticky obdrží peníze, a pokud bude dostatek deště, bude farmář spokojený, protože se jeho úrodě bude dařit. To lze obecně rozšířit na pojištění proti přírodním katastrofám.

**3. Decentralizovaný datový zdroj**. U finančních rozdílových smluv (contracts for difference) může být ve skutečnosti možné decentralizovat datový zdroj prostřednictvím protokolu zvaného „[SchellingCoin](https://blog.ethereum.org/2014/03/28/schellingcoin-a-minimal-trust-universal-data-feed)“. SchellingCoin v podstatě funguje následovně: N stran vloží do systému hodnotu daného údaje (např. cenu ETH/USD), hodnoty se seřadí a každý mezi 25. a 75. percentilem získá jeden token jako odměnu. Každý má motivaci poskytnout odpověď, kterou poskytnou všichni ostatní, a jedinou hodnotou, na které se může velké množství hráčů reálně shodnout, je zřejmá výchozí hodnota: pravda. Tím vzniká decentralizovaný protokol, který může teoreticky poskytovat libovolný počet hodnot, včetně ceny ETH/USD, teploty v Berlíně nebo dokonce výsledku konkrétního složitého výpočtu.

**4. Chytrá multisig úschova**. Bitcoin umožňuje multisig transakční kontrakty, kde například tři z daných pěti klíčů mohou utratit prostředky. Ethereum umožňuje větší granularitu; například čtyři z pěti mohou utratit vše, tři z pěti mohou utratit až 10 % denně a dva z pěti mohou utratit až 0,5 % denně. Multisig na Ethereu je navíc asynchronní – dvě strany mohou zaregistrovat své podpisy na blockchainu v různou dobu a poslední podpis automaticky odešle transakci.

**5. Cloud computing**. Technologii EVM lze také použít k vytvoření ověřitelného výpočetního prostředí, které uživatelům umožňuje požádat ostatní o provedení výpočtů a poté volitelně požádat o důkazy, že výpočty v určitých náhodně vybraných kontrolních bodech byly provedeny správně. To umožňuje vytvoření trhu s cloud computingem, kde se může zapojit jakýkoli uživatel se svým stolním počítačem, notebookem nebo specializovaným serverem, a namátkové kontroly spolu s bezpečnostními vklady lze použít k zajištění důvěryhodnosti systému (tj. uzly nemohou ziskově podvádět). Ačkoli takový systém nemusí být vhodný pro všechny úkoly; například úkoly, které vyžadují vysokou úroveň meziprocesové komunikace, nelze snadno provádět na velkém cloudu uzlů. Jiné úkoly je však mnohem snazší paralelizovat; projekty jako SETI@home, folding@home a genetické algoritmy lze na takové platformě snadno implementovat.

**6. Peer-to-peer hazardní hry**. Na blockchainu Etherea lze implementovat libovolné množství peer-to-peer hazardních protokolů, jako je [Cyberdice](http://www.cl.cam.ac.uk/~fms27/papers/2008-StajanoCla-cyberdice.pdf) od Franka Stajana a Richarda Claytona. Nejjednodušším hazardním protokolem je ve skutečnosti prostě rozdílová smlouva na hash dalšího bloku a odtud lze budovat pokročilejší protokoly, čímž vznikají hazardní služby s téměř nulovými poplatky, které nemají možnost podvádět.

**7. Predikční trhy**. Za předpokladu existence orákula nebo SchellingCoinu je také snadné implementovat predikční trhy a predikční trhy spolu se SchellingCoinem se mohou ukázat jako první mainstreamová aplikace [futarchie](https://mason.gmu.edu/~rhanson/futarchy.html) jako protokolu správy pro decentralizované organizace.

**8. Onchain decentralizovaná tržiště**, využívající systém identity a reputace jako základ.

## Různé a obavy {#miscellanea-and-concerns}

### Modifikovaná implementace GHOST {#modified-ghost-implementation}

Protokol „Greedy Heaviest Observed Subtree“ (GHOST) je inovace, kterou poprvé představili Yonatan Sompolinsky a Aviv Zohar v [prosinci 2013](https://eprint.iacr.org/2013/881.pdf). Motivací pro GHOST je skutečnost, že blockchainy s rychlými časy potvrzení v současnosti trpí sníženou bezpečností kvůli vysoké míře zastaralých bloků (stale rate) – protože šíření bloku (block propagation) sítí trvá určitou dobu, pokud těžař A vytěží blok a těžař B náhodou vytěží další blok dříve, než se blok těžaře A rozšíří k B, blok těžaře B přijde vniveč a nepřispěje k bezpečnosti sítě. Dále je zde problém centralizace: pokud je těžař A těžební pool s 30 % hashovacího výkonu a B má 10 % hashovacího výkonu, A bude mít riziko vyprodukování zastaralého bloku v 70 % případů (protože ve zbývajících 30 % případů A vyprodukoval poslední blok, a tak získá data pro těžbu okamžitě), zatímco B bude mít riziko vyprodukování zastaralého bloku v 90 % případů. Pokud je tedy interval bloku dostatečně krátký na to, aby byla míra zastaralých bloků vysoká, A bude podstatně efektivnější jednoduše díky své velikosti. Kombinace těchto dvou efektů znamená, že blockchainy, které produkují bloky rychle, velmi pravděpodobně povedou k tomu, že jeden těžební pool získá dostatečně velké procento hashovacího výkonu sítě k tomu, aby měl de facto kontrolu nad procesem těžby.

Jak popsali Sompolinsky a Zohar, GHOST řeší první problém ztráty bezpečnosti sítě tím, že do výpočtu toho, který řetězec je „nejdelší“, zahrnuje i zastaralé bloky; to znamená, že do výpočtu toho, který blok je podpořen největším celkovým důkazem prací (PoW), se přidává nejen rodič a další předci bloku, ale také zastaralí potomci předka bloku (v žargonu Etherea „strýčkové“ neboli „uncles“). Abychom vyřešili druhý problém tendence k centralizaci, jdeme nad rámec protokolu popsaného Sompolinskym a Zoharem a poskytujeme odměny za blok i zastaralým blokům: zastaralý blok obdrží 87,5 % své základní odměny a synovec, který zastaralý blok zahrne, obdrží zbývajících 12,5 %. Transakční poplatky se však strýčkům neudělují.

Ethereum implementuje zjednodušenou verzi GHOST, která jde pouze do hloubky sedmi úrovní. Konkrétně je definována takto:

- Blok musí specifikovat rodiče a musí specifikovat 0 nebo více strýčků.
- Strýček zahrnutý v bloku B musí mít následující vlastnosti:
  - Musí to být přímý potomek předka B v k-té generaci, kde `2 <= k <= 7`.
  - Nemůže to být předek B.
  - Strýček musí být platná hlavička bloku, ale nemusí to být dříve ověřený nebo dokonce platný blok.
  - Strýček se musí lišit od všech strýčků zahrnutých v předchozích blocích a všech ostatních strýčků zahrnutých ve stejném bloku (zákaz dvojitého zahrnutí).
- Za každého strýčka U v bloku B získá těžař bloku B dalších 3,125 % přidaných ke své odměně z coinbase a těžař U získá 93,75 % standardní odměny z coinbase.

Tato omezená verze GHOST, kde lze strýčky zahrnout pouze do 7 generací, byla použita ze dvou důvodů. Zaprvé, neomezený GHOST by vnesl příliš mnoho komplikací do výpočtu toho, kteří strýčkové jsou pro daný blok platní. Zadruhé, neomezený GHOST s kompenzací, jak se používá v Ethereu, odstraňuje motivaci těžaře těžit na hlavním řetězci a ne na řetězci veřejného útočníka.

### Poplatky {#fees}

Protože každá transakce publikovaná do blockchainu představuje pro síť náklady spojené s nutností jejího stažení a ověření, je zapotřebí nějaký regulační mechanismus, obvykle zahrnující transakční poplatky, aby se zabránilo zneužití. Výchozím přístupem, který se používá v síti Bitcoin, jsou čistě dobrovolné poplatky, přičemž se spoléhá na to, že těžaři budou fungovat jako strážci a stanoví dynamická minima. Tento přístup byl v bitcoinové komunitě přijat velmi příznivě, zejména proto, že je „tržní“ a umožňuje, aby cenu určovala nabídka a poptávka mezi těžaři a odesílateli transakcí. Problémem této úvahy však je, že zpracování transakcí není trh; ačkoli je intuitivně lákavé chápat zpracování transakcí jako službu, kterou těžař nabízí odesílateli, ve skutečnosti bude muset každou transakci, kterou těžař zahrne, zpracovat každý uzel v síti, takže drtivou většinu nákladů na zpracování transakcí nesou třetí strany, a nikoli těžař, který rozhoduje o tom, zda ji zahrne, či nikoli. Proto je velmi pravděpodobné, že dojde k problémům typu tragédie obecní pastviny (tragedy of the commons).

Jak se však ukazuje, tento nedostatek tržního mechanismu se při určitém nepřesném zjednodušujícím předpokladu magicky vyruší. Argument je následující. Předpokládejme, že:

1. Transakce vede k `k` operacím a nabízí odměnu `kR` jakémukoli těžaři, který ji zahrne, kde `R` nastavuje odesílatel a `k` a `R` jsou pro těžaře (zhruba) viditelné předem.
2. Operace má náklady na zpracování `C` pro jakýkoli uzel (tj. všechny uzly mají stejnou efektivitu).
3. Existuje `N` těžebních uzlů, z nichž každý má přesně stejný výpočetní výkon (tj. `1/N` z celkového výkonu).
4. Neexistují žádné netěžící plné uzly.

Těžař by byl ochoten zpracovat transakci, pokud je očekávaná odměna vyšší než náklady. Očekávaná odměna je tedy `kR/N`, protože těžař má šanci `1/N` na zpracování dalšího bloku, a náklady na zpracování pro těžaře jsou jednoduše `kC`. Těžaři proto zahrnou transakce, kde `kR/N > kC`, neboli `R > NC`. Všimněte si, že `R` je poplatek za operaci poskytnutý odesílatelem, a je tedy spodní hranicí užitku, který odesílatel z transakce má, a `NC` jsou náklady celé sítě dohromady na zpracování jedné operace. Těžaři tak mají motivaci zahrnout pouze ty transakce, u nichž celkový utilitární užitek převyšuje náklady.

Ve skutečnosti však existuje několik důležitých odchylek od těchto předpokladů:

1. Těžař platí za zpracování transakce vyšší náklady než ostatní ověřující uzly, protože dodatečný čas na ověření zpožďuje šíření bloku, a tím zvyšuje šanci, že se blok stane zastaralým.
2. Existují netěžící plné uzly.
3. Rozdělení těžebního výkonu může v praxi skončit radikálně nerovnostářsky.
4. Spekulanti, političtí nepřátelé a šílenci, jejichž užitková funkce zahrnuje způsobení škody síti, skutečně existují a mohou chytře nastavit kontrakty tak, aby jejich náklady byly mnohem nižší než náklady placené ostatními ověřujícími uzly.

(1) způsobuje tendenci těžaře zahrnovat méně transakcí a
(2) zvyšuje `NC`; tyto dva efekty se tedy alespoň částečně
navzájem vyruší.<sup>[Jak?](https://web.archive.org/web/20250427212319/https://github.com/ethereum/wiki/issues/447#issuecomment-316972260#issuecomment-316972260)</sup>
(3) a (4) představují hlavní problém; abychom je vyřešili, jednoduše zavedeme
plovoucí limit: žádný blok nemůže mít více operací než
`BLK_LIMIT_FACTOR` násobek dlouhodobého exponenciálního klouzavého průměru.
Konkrétně:

```js
blk.oplimit = floor((blk.parent.oplimit \* (EMAFACTOR - 1) +
floor(parent.opcount \* BLK\_LIMIT\_FACTOR)) / EMA\_FACTOR)
```

`BLK_LIMIT_FACTOR` a `EMA_FACTOR` jsou konstanty, které budou prozatím nastaveny na 65536 a 1,5, ale po další analýze se pravděpodobně změní.

V síti Bitcoin existuje další faktor, který odrazuje od velkých velikostí bloků: šíření velkých bloků bude trvat déle, a proto mají vyšší pravděpodobnost, že se stanou zastaralými. V Ethereu může šíření bloků s vysokou spotřebou gasu také trvat déle, a to jak proto, že jsou fyzicky větší, tak proto, že zpracování přechodů stavu transakcí za účelem validace trvá déle. Tato demotivace způsobená zpožděním je v síti Bitcoin významným faktorem, ale v Ethereu méně kvůli protokolu GHOST; spoléhání se na regulované limity bloků proto poskytuje stabilnější základ.

### Výpočty a Turingova úplnost {#computation-and-turing-completeness}

Důležitou poznámkou je, že virtuální stroj Etherea (EVM) je Turingovsky úplný; to znamená, že kód EVM může zakódovat jakýkoli výpočet, který lze myslitelně provést, včetně nekonečných smyček. Kód EVM umožňuje vytváření smyček dvěma způsoby. Zaprvé existuje instrukce `JUMP`, která umožňuje programu skočit zpět na předchozí místo v kódu, a instrukce `JUMPI` pro podmíněné skoky, což umožňuje příkazy jako `while x < 27: x = x * 2`. Zadruhé, kontrakty mohou volat jiné kontrakty, což potenciálně umožňuje vytváření smyček prostřednictvím rekurze. To přirozeně vede k problému: mohou zlomyslní uživatelé v podstatě odstavit těžaře a plné uzly tím, že je donutí vstoupit do nekonečné smyčky? Tento problém vyvstává kvůli problému v informatice známému jako problém zastavení (halting problem): v obecném případě neexistuje způsob, jak zjistit, zda se daný program někdy zastaví, nebo ne.

Jak je popsáno v části o přechodu stavu, naše řešení funguje tak, že vyžaduje, aby transakce nastavila maximální počet výpočetních kroků, které smí provést, a pokud provádění trvá déle, výpočet je zvrácen, ale poplatky jsou stále zaplaceny. Zprávy fungují stejným způsobem. Abychom ukázali motivaci našeho řešení, zvažte následující příklady:

- Útočník vytvoří kontrakt, který spouští nekonečnou smyčku, a poté odešle těžaři transakci, která tuto smyčku aktivuje. Těžař transakci zpracuje, spustí nekonečnou smyčku a bude čekat, až jí dojde gas. I když provádění dojde gas a zastaví se v polovině, transakce je stále platná a těžař si od útočníka stále nárokuje poplatek za každý výpočetní krok.
- Útočník vytvoří velmi dlouhou nekonečnou smyčku se záměrem donutit těžaře počítat tak dlouho, že v době, kdy výpočet skončí, vyjde několik dalších bloků a těžař nebude moci transakci zahrnout, aby si mohl nárokovat poplatek. Útočník však bude muset odeslat hodnotu pro `STARTGAS`, která omezí počet výpočetních kroků, které může provádění zabrat, takže těžař bude předem vědět, že výpočet zabere neúměrně velký počet kroků.
- Útočník vidí kontrakt s kódem v nějaké podobě jako `send(A,contract.storage[A]); contract.storage[A] = 0` a odešle transakci s právě takovým množstvím gasu, aby se provedl první krok, ale ne druhý (tj. provede výběr, ale nedovolí, aby se zůstatek snížil). Autor kontraktu se nemusí obávat ochrany proti takovým útokům, protože pokud se provádění zastaví v polovině, změny se zvrátí.
- Finanční kontrakt funguje tak, že bere medián z devíti proprietárních cenových zdrojů (data feeds), aby se minimalizovalo riziko. Útočník převezme jeden z datových zdrojů, který je navržen tak, aby jej bylo možné upravovat prostřednictvím mechanismu volání proměnné adresy popsaného v části o DAO, a převede jej na spuštění nekonečné smyčky, čímž se pokusí donutit jakékoli pokusy o nárokování prostředků z finančního kontraktu k vyčerpání gasu. Finanční kontrakt však může u zprávy nastavit limit plynu (gas limit), aby tomuto problému zabránil.

Alternativou k Turingově úplnosti je Turingova neúplnost, kde `JUMP` a `JUMPI` neexistují a v zásobníku volání (call stack) smí v daném okamžiku existovat pouze jedna kopie každého kontraktu. S tímto systémem by popsaný systém poplatků a nejistoty ohledně účinnosti našeho řešení nemusely být nutné, protože náklady na provedení kontraktu by byly shora omezeny jeho velikostí. Navíc Turingova neúplnost není ani tak velkým omezením; ze všech příkladů kontraktů, které jsme interně vymysleli, zatím pouze jeden vyžadoval smyčku, a i tu by bylo možné odstranit provedením 26 opakování jednořádkového kusu kódu. Vzhledem k vážným důsledkům Turingovy úplnosti a omezenému přínosu, proč prostě nemít Turingovsky neúplný jazyk? Ve skutečnosti má však Turingova neúplnost k elegantnímu řešení problému daleko. Abychom pochopili proč, zvažte následující kontrakty:

```sh
C0: call(C1); call(C1);
C1: call(C2); call(C2);
C2: call(C3); call(C3);
...
C49: call(C50); call(C50);
C50: (run one step of a program and record the change in storage)
```

Nyní odešlete transakci do A. Tímto způsobem máme v 51 transakcích kontrakt, který zabere 2<sup>50</sup> výpočetních kroků. Těžaři by se mohli pokusit odhalit takové logické bomby předem tím, že by u každého kontraktu udržovali hodnotu specifikující maximální počet výpočetních kroků, které může provést, a počítali by to pro kontrakty volající jiné kontrakty rekurzivně, ale to by vyžadovalo, aby těžaři zakázali kontrakty, které vytvářejí jiné kontrakty (protože vytvoření a provedení všech 26 výše uvedených kontraktů by se dalo snadno spojit do jediného kontraktu). Dalším problematickým bodem je, že pole adresy zprávy je proměnná, takže obecně nemusí být ani možné předem říci, které další kontrakty daný kontrakt zavolá. Celkově tedy docházíme k překvapivému závěru: Turingova úplnost se překvapivě snadno spravuje a nedostatek Turingovy úplnosti se spravuje stejně překvapivě obtížně, pokud nejsou zavedeny naprosto stejné kontroly – ale v tom případě, proč prostě nenechat protokol být Turingovsky úplný?

### Měna a emise {#currency-and-issuance}

Síť Ethereum obsahuje svou vlastní vestavěnou měnu, ether, která slouží dvojímu účelu: poskytuje primární vrstvu likvidity umožňující efektivní směnu mezi různými typy digitálních aktiv a, což je důležitější, poskytuje mechanismus pro placení transakčních poplatků. Pro pohodlí a aby se předešlo budoucím sporům (viz současná debata o mBTC/uBTC/satoshi v síti Bitcoin), budou nominální hodnoty předem označeny:

- 1: Wei
- 10<sup>12</sup>: szabo
- 10<sup>15</sup>: finney
- 10<sup>18</sup>: ether

To by mělo být chápáno jako rozšířená verze konceptu „dolarů“ a „centů“ nebo „BTC“ a „satoshi“. V blízké budoucnosti očekáváme, že „ether“ se bude používat pro běžné transakce, „finney“ pro mikrotransakce a „szabo“ a „Wei“ pro technické diskuse o poplatcích a implementaci protokolu; zbývající nominální hodnoty se mohou stát užitečnými později a v této fázi by neměly být zahrnuty do klientů.

Model emise bude následující:

- Ether bude uvolněn v prodeji měny za cenu 1000–2000 etherů za BTC, což je mechanismus určený k financování organizace Ethereum a zaplacení vývoje, který s úspěchem použily i jiné platformy, jako jsou Mastercoin a NXT. Dřívější kupující budou těžit z větších slev. BTC získané z prodeje budou plně použity na výplatu platů a odměn vývojářům a investovány do různých ziskových i neziskových projektů v ekosystému Etherea a kryptoměn.
- 0,099násobek celkového prodaného množství (60 102 216 ETH) bude přidělen organizaci na kompenzaci prvních přispěvatelů a zaplacení výdajů denominovaných v ETH před genesis blokem.
- 0,099násobek celkového prodaného množství bude udržován jako dlouhodobá rezerva.
- 0,26násobek celkového prodaného množství bude od tohoto okamžiku navždy každoročně přidělován těžařům.

| Skupina | Při spuštění | Po 1 roce | Po 5 letech |
| ---------------------- | --------- | ------------ | ------------- |
| Měnové jednotky | 1,198X | 1,458X | 2,498X |
| Kupující | 83,5 % | 68,6 % | 40,0 % |
| Rezerva utracená před prodejem | 8,26 % | 6,79 % | 3,96 % |
| Rezerva použitá po prodeji | 8,26 % | 6,79 % | 3,96 % |
| Těžaři | 0 % | 17,8 % | 52,0 % |

#### Dlouhodobá míra růstu nabídky (v procentech) {#long-term-supply-growth-rate-percent}

![Ethereum inflation](./ethereum-inflation.png)

_Navzdory lineární emisi měny, stejně jako u sítě Bitcoin, míra růstu nabídky v průběhu času přesto klesá k nule._

Dvěma hlavními volbami ve výše uvedeném modelu jsou (1) existence a velikost nadačního fondu (endowment pool) a (2) existence trvale rostoucí lineární nabídky, na rozdíl od zastropované nabídky jako v síti Bitcoin. Odůvodnění nadačního fondu je následující. Pokud by nadační fond neexistoval a lineární emise by se snížila na 0,217násobek, aby se zajistila stejná míra inflace, pak by celkové množství etheru bylo o 16,5 % menší, a tak by každá jednotka byla o 19,8 % cennější. V rovnovážném stavu by se tedy v prodeji nakoupilo o 19,8 % více etheru, takže by každá jednotka byla opět přesně stejně cenná jako předtím. Organizace by pak také měla 1,198krát více BTC, což lze považovat za rozdělené na dvě části: původní BTC a dodatečných 0,198násobek. Tato situace je tedy _přesně ekvivalentní_ nadačnímu fondu, ale s jedním důležitým rozdílem: organizace drží čistě BTC, a proto není motivována k podpoře hodnoty jednotky etheru.

Model trvalého lineárního růstu nabídky snižuje riziko toho, co někteří považují za nadměrnou koncentraci bohatství v síti Bitcoin, a dává jednotlivcům žijícím v současnosti i budoucnosti spravedlivou šanci získat měnové jednotky, přičemž si zároveň zachovává silnou motivaci získávat a držet ether, protože „míra růstu nabídky“ v procentech v průběhu času stále klesá k nule. Také teoretizujeme, že protože se mince v průběhu času vždy ztrácejí kvůli neopatrnosti, úmrtí atd., a ztrátu mincí lze modelovat jako procento z celkové nabídky za rok, celková nabídka měny v oběhu se ve skutečnosti nakonec stabilizuje na hodnotě rovnající se roční emisi vydělené mírou ztráty (např. při míře ztráty 1 %, jakmile nabídka dosáhne 26X, pak se každý rok vytěží 0,26X a ztratí 0,26X, čímž vznikne rovnováha).

Všimněte si, že v budoucnu je pravděpodobné, že Ethereum přejde z bezpečnostních důvodů na model důkaz podílem (PoS), čímž se požadavek na emisi sníží někam mezi nulu a 0,05X ročně. V případě, že organizace Ethereum ztratí financování nebo z jakéhokoli jiného důvodu zanikne, necháváme otevřenou „společenskou smlouvu“: kdokoli má právo vytvořit budoucí kandidátskou verzi Etherea, přičemž jedinou podmínkou je, že množství etheru musí být maximálně rovno `60102216 * (1.198 + 0.26 * n)`, kde `n` je počet let po genesis bloku. Tvůrci mohou volně prodávat v rámci crowdfundingu nebo jinak přidělit část nebo celý rozdíl mezi expanzí nabídky řízenou PoS a maximální povolenou expanzí nabídky na zaplacení vývoje. Kandidátské upgrady, které nejsou v souladu se společenskou smlouvou, mohou být oprávněně forknuty do vyhovujících verzí.

### Centralizace těžby {#mining-centralization}

Těžební algoritmus sítě Bitcoin funguje tak, že těžaři počítají SHA-256 na mírně upravených verzích hlavičky bloku milionkrát znovu a znovu, dokud nakonec jeden uzel nepřijde s verzí, jejíž hash je menší než cíl (v současnosti kolem 2<sup>192</sup>). Tento těžební algoritmus je však zranitelný vůči dvěma formám centralizace. Zaprvé, těžební ekosystém začaly ovládat ASIC (aplikačně specifické integrované obvody), počítačové čipy navržené pro specifický úkol těžby Bitcoinu, a proto jsou v něm tisíckrát efektivnější. To znamená, že těžba Bitcoinu již není vysoce decentralizovanou a rovnostářskou činností, ale vyžaduje miliony dolarů kapitálu k efektivní účasti. Zadruhé, většina těžařů Bitcoinu ve skutečnosti neprovádí validaci bloku lokálně; místo toho se spoléhají na centralizovaný těžební pool, který jim poskytne hlavičky bloků. Tento problém je pravděpodobně horší: v době psaní tohoto textu tři největší těžební pooly nepřímo kontrolují zhruba 50 % výpočetního výkonu v síti Bitcoin, ačkoli to zmírňuje skutečnost, že těžaři mohou přejít k jiným těžebním poolům, pokud se pool nebo koalice pokusí o 51% útok.

Současným záměrem v Ethereu je použít těžební algoritmus, kde se od těžařů vyžaduje, aby načetli náhodná data ze stavu, vypočítali některé náhodně vybrané transakce z posledních N bloků v blockchainu a vrátili hash výsledku. To má dvě důležité výhody. Zaprvé, kontrakty Etherea mohou zahrnovat jakýkoli druh výpočtu, takže ASIC pro Ethereum by byl v podstatě ASIC pro obecné výpočty – tj. lepší CPU. Zadruhé, těžba vyžaduje přístup k celému blockchainu, což nutí těžaře ukládat celý blockchain a být alespoň schopni ověřit každou transakci. Tím se odstraňuje potřeba centralizovaných těžebních poolů; ačkoli těžební pooly mohou stále plnit legitimní roli vyrovnávání náhodnosti rozdělování odměn, tuto funkci mohou stejně dobře plnit peer-to-peer pooly bez centrální kontroly.

Tento model je nevyzkoušený a při používání provádění kontraktů jako těžebního algoritmu se mohou vyskytnout potíže s tím, jak se vyhnout určitým chytrým optimalizacím. Jednou z obzvláště zajímavých vlastností tohoto algoritmu však je, že umožňuje komukoli „otrávit studnu“ tím, že do blockchainu zavede velké množství kontraktů speciálně navržených tak, aby zmařily určité ASIC. Existují ekonomické pobídky pro výrobce ASIC, aby takový trik použili k vzájemným útokům. Řešení, které vyvíjíme, je tedy v konečném důsledku spíše adaptivním ekonomickým lidským řešením než čistě technickým.

### Škálovatelnost {#scalability}

Jednou z častých obav ohledně Etherea je otázka škálovatelnosti. Stejně jako Bitcoin, i Ethereum trpí nedostatkem, že každou transakci musí zpracovat každý uzel v síti. U sítě Bitcoin se velikost současného blockchainu pohybuje kolem 15 GB a roste zhruba o 1 MB za hodinu. Pokud by síť Bitcoin měla zpracovávat 2000 transakcí za sekundu jako Visa, rostla by o 1 MB za tři sekundy (1 GB za hodinu, 8 TB za rok). Ethereum bude pravděpodobně trpět podobným vzorcem růstu, který je zhoršen skutečností, že nad blockchainem Etherea bude existovat mnoho aplikací namísto pouhé měny, jako je tomu u Bitcoinu, ale zmírněn skutečností, že plné uzly Etherea potřebují ukládat pouze stav namísto celé historie blockchainu.

Problémem tak velké velikosti blockchainu je riziko centralizace. Pokud se velikost blockchainu zvýší řekněme na 100 TB, pak by pravděpodobným scénářem bylo, že by plné uzly provozoval pouze velmi malý počet velkých podniků, přičemž všichni běžní uživatelé by používali lehké uzly SPV. V takové situaci vyvstává potenciální obava, že by se plné uzly mohly spojit a všechny se dohodnout na podvádění nějakým výnosným způsobem (např. změnit odměnu za blok, přidělit si BTC). Lehké uzly by neměly žádný způsob, jak to okamžitě odhalit. Samozřejmě by pravděpodobně existoval alespoň jeden poctivý plný uzel a po několika hodinách by informace o podvodu pronikly přes kanály jako Reddit, ale v tu chvíli by už bylo příliš pozdě: bylo by na běžných uživatelích, aby zorganizovali úsilí o zařazení daných bloků na černou listinu, což je masivní a pravděpodobně neproveditelný koordinační problém v podobném měřítku jako provedení úspěšného 51% útoku. V případě Bitcoinu je to v současnosti problém, ale existuje modifikace blockchainu, kterou [navrhl Peter Todd](https://web.archive.org/web/20140623061815/http://sourceforge.net/p/bitcoin/mailman/message/31709140/) a která tento problém zmírní.

V blízké budoucnosti použije Ethereum k řešení tohoto problému dvě další strategie. Zaprvé, kvůli těžebním algoritmům založeným na blockchainu bude alespoň každý těžař nucen být plným uzlem, čímž se vytvoří spodní hranice počtu plných uzlů. Zadruhé a co je důležitější, po zpracování každé transakce zahrneme do blockchainu kořen stromu mezistavu. I když je validace bloku centralizovaná, pokud existuje alespoň jeden poctivý ověřující uzel, lze problém centralizace obejít prostřednictvím verifikačního protokolu. Pokud těžař publikuje neplatný blok, musí být tento blok buď špatně naformátován, nebo je stav `S[n]` nesprávný. Vzhledem k tomu, že je známo, že `S[0]` je správný, musí existovat nějaký první stav `S[i]`, který je nesprávný, kde `S[i-1]` je správný. Ověřující uzel by poskytl index `i` spolu s „důkazem neplatnosti“ sestávajícím z podmnožiny uzlů stromu Patricia, které jsou potřeba ke zpracování `APPLY(S[i-1],TX[i]) -> S[i]`. Uzly by mohly tyto uzly použít ke spuštění této části výpočtu a vidět, že vygenerovaný `S[i]` neodpovídá poskytnutému `S[i]`.

Další, sofistikovanější útok by spočíval v tom, že by zlomyslní těžaři publikovali neúplné bloky, takže by ani neexistovaly úplné informace k určení, zda jsou bloky platné, či nikoli. Řešením je protokol výzva-odpověď (challenge-response): ověřovací uzly vydávají „výzvy“ ve formě indexů cílových transakcí a po přijetí uzlu lehký uzel považuje blok za nedůvěryhodný, dokud jiný uzel, ať už těžař nebo jiný ověřovatel, neposkytne podmnožinu uzlů Patricia jako důkaz platnosti.

## Závěr {#conclusion}

Protokol Ethereum byl původně koncipován jako vylepšená verze kryptoměny, která poskytuje pokročilé funkce, jako je úschova na blockchainu, limity výběrů, finanční kontrakty, sázkové trhy a podobně, prostřednictvím vysoce zobecněného programovacího jazyka. Protokol Ethereum by přímo „nepodporoval“ žádnou z aplikací, ale existence turingovsky úplného programovacího jazyka znamená, že teoreticky lze vytvořit libovolné kontrakty pro jakýkoli typ transakce nebo aplikace. Co je však na Ethereu zajímavější, je to, že protokol Ethereum sahá daleko za hranice pouhé měny. Protokoly pro decentralizované ukládání souborů, decentralizované výpočty a decentralizované predikční trhy, spolu s desítkami dalších podobných konceptů, mají potenciál podstatně zvýšit efektivitu výpočetního průmyslu a poskytnout masivní podporu dalším peer-to-peer protokolům tím, že vůbec poprvé přidávají ekonomickou vrstvu. Konečně je zde také značná řada aplikací, které nemají s penězi vůbec nic společného.

Koncept libovolné funkce přechodu stavu, jak ji implementuje protokol Ethereum, poskytuje platformu s jedinečným potenciálem; namísto toho, aby šlo o uzavřený, jednoúčelový protokol určený pro specifickou řadu aplikací v oblasti ukládání dat, hazardních her nebo financí, je Ethereum ze své podstaty otevřené a věříme, že je mimořádně vhodné k tomu, aby v nadcházejících letech sloužilo jako základní vrstva pro obrovské množství finančních i nefinančních protokolů.

## Poznámky a další čtení {#notes-and-further-reading}

### Poznámky {#notes}

1. Pozorný čtenář si může všimnout, že bitcoinová adresa je ve skutečnosti hash veřejného klíče eliptické křivky, a nikoli samotný veřejný klíč. Nicméně je naprosto legitimní kryptografickou terminologií označovat hash veřejného klíče za samotný veřejný klíč. Je tomu tak proto, že kryptografii Bitcoinu lze považovat za vlastní algoritmus digitálního podpisu, kde se veřejný klíč skládá z hashe veřejného klíče ECC, podpis se skládá z veřejného klíče ECC spojeného s podpisem ECC a ověřovací algoritmus zahrnuje kontrolu veřejného klíče ECC v podpisu vůči hashi veřejného klíče ECC poskytnutému jako veřejný klíč a následné ověření podpisu ECC vůči veřejnému klíči ECC.
2. Technicky vzato jde o medián z 11 předchozích bloků.
3. Interně jsou 2 i „CHARLIE“ čísla, přičemž to druhé je v reprezentaci big-endian o základu 256. Čísla mohou být minimálně 0 a maximálně 2<sup>256</sup>-1.

### Další čtení {#further-reading}

1. [Vnitřní hodnota](https://bitcoinmagazine.com/culture/an-exploration-of-intrinsic-value-what-it-is-why-bitcoin-doesnt-have-it-and-why-bitcoin-does-have-it)
2. [Chytrý majetek](https://en.bitcoin.it/wiki/Smart_Property)
3. [Chytré kontrakty](https://en.bitcoin.it/wiki/Contracts)
4. [B-money](http://www.weidai.com/bmoney.txt)
5. [Opakovaně použitelné důkazy prací (PoW)](https://nakamotoinstitute.org/finney/rpow/)
6. [Bezpečné vlastnické tituly s autoritou vlastníka](https://nakamotoinstitute.org/library/secure-property-titles/)
7. [Bitcoin whitepaper](https://bitcoin.org/bitcoin.pdf)
8. [Namecoin](https://namecoin.org/)
9. [Zookův trojúhelník](https://wikipedia.org/wiki/Zooko's_triangle)
10. [Colored coins whitepaper](https://docs.google.com/a/buterin.com/document/d/1AnkP_cVZTCMLIzw4DvsW6M8Q2JC0lIzrTLuoWu2z1BE/edit)
11. [Mastercoin whitepaper](https://github.com/mastercoin-MSC/spec)
12. [Decentralizované autonomní korporace, Bitcoin Magazine](http://bitcoinmagazine.com/7050/bootstrapping-a-decentralized-autonomous-corporation-part-i/)
13. [Zjednodušené ověření platby](https://en.bitcoin.it/wiki/Scalability#Simplified_payment_verification)
14. [Merkleovy stromy](https://wikipedia.org/wiki/Merkle_tree)
15. [Patricia stromy](https://wikipedia.org/wiki/Patricia_tree)
16. [GHOST](https://eprint.iacr.org/2013/881.pdf)
17. [StorJ a autonomní agenti, Jeff Garzik](http://garzikrants.blogspot.ca/2013/01/storj-and-bitcoin-autonomous-agents.html)
18. [Mike Hearn o chytrém majetku na Turing Festivalu](https://www.youtube.com/watch?v=MVyv4t0OKe4)
19. [Ethereum RLP](/developers/docs/data-structures-and-encoding/rlp/)
20. [Ethereum Merkle Patricia stromy](/developers/docs/data-structures-and-encoding/patricia-merkle-trie/)
21. [Peter Todd o Merkleových součtových stromech](https://web.archive.org/web/20140623061815/http://sourceforge.net/p/bitcoin/mailman/message/31709140/)

_Pro historii tohoto whitepaperu se podívejte na [tuto wiki](https://web.archive.org/web/20250427212319/https://ethereum.org/whitepaper/)._

_Ethereum se, podobně jako mnoho jiných open-source softwarových projektů řízených komunitou, od svého počátku vyvíjelo. Chcete-li se dozvědět o nejnovějším vývoji Etherea a o tom, jak se provádějí změny protokolu, doporučujeme [tohoto průvodce](/learn/)._
