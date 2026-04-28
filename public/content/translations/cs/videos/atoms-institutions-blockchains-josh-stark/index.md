---
title: "Atomy, instituce, blockchainy"
description: "Josh Stark navrhuje nový rámec pro pochopení toho, co jsou blockchainy, a představuje koncept „tvrdosti“ jako sdílené vlastnosti, která spojuje atomy, instituce a blockchainy jako stavební materiály civilizace."
lang: cs
youtubeId: "zI07mqNdxzA"
uploadDate: 2024-04-06
duration: "0:29:13"
educationLevel: beginner
topic:
  - "jak-funguje-ethereum"
  - "blockchain"
  - "ethereum"
format: presentation
author: ETHGlobal
breadcrumb: "Atomy, instituce, blockchainy"
---

Filozofická přednáška, kterou přednesl **Josh Stark** z Nadace Ethereum na konferenci Pragma Denver 2024, navrhuje nový rámec pro pochopení blockchainů. Přednáška představuje koncept „tvrdosti“ jako sdílené vlastnosti, která spojuje atomy, instituce a blockchainy jako stavební materiály civilizace.

*Tento přepis je přístupnou kopií [původního přepisu videa](https://www.youtube.com/watch?v=zI07mqNdxzA) zveřejněného organizací ETHGlobal. Byl lehce upraven pro lepší čitelnost.*

#### Proč nedokážeme vysvětlit blockchainy? (0:00) {#why-cant-we-explain-blockchains-000}

Ahoj všichni, děkuji, že jste tady na konferenci Pragma v Denveru. Jmenuji se Josh. Pracuji v Nadaci Ethereum — jsem v ní už asi pět let. Rád vtipkuji, že mojí prací je přijít na to, co by mělo být mojí prací, a to se mění každých šest měsíců.

Během své kariéry v kryptu jsem dělal spoustu různých věcí. Pracoval jsem na rané peněžence pro Bitcoin. Postavil jsem — no, spíše koupil — bitcoinový bankomat v Torontu a provozoval ho asi rok v roce 2015. V roce 2017 jsem spoluzaložil ETHGlobal a také společnost s názvem L4, která pracovala na raných řešeních škálování na vrstvě 2 (L2). A v průběhu let jsem napsal spoustu příspěvků na blog.

Přes to všechno jsem stále nedokázal pořádně vysvětlit, co vlastně děláme nebo proč. Měl jsem pocit, že je to velmi důležité, že to změní svět. Nechápejte mě špatně — dokážu mluvit o jednotlivých aplikacích. Umíme vysvětlit Bitcoin, NFT, Uniswap, ENS. Všechny tyto věci ve svých malých bublinách není tak těžké vysvětlit. Ale když se snažíme mluvit o celkovém obrazu — co to znamená, že existuje jedna technologie, která to všechno umožňuje — začínáme klopýtat. Děláme mentální gymnastiku, házíme po lidech módní slova a snažíme se věci vysvětlit.

Opravdu se musíme dostat k jádru věci a nemyslím si, že jsme tak blízko. Je to problém! Pokud dokážeme mluvit o těchto jednotlivých aplikacích, ale nedokážeme formulovat, co mají společného — něco nám uniká. Existuje úroveň vysvětlení, která ještě nebyla nalezena, a myslím, že je důležitá. Mám pocit, že jakmile ji najdeme, bude nám připadat naprosto zřejmá.

Takže to začalo velmi specifickou otázkou, kterou jsem měl: co je to za univerzální technologii? Co je to za základní schopnost? A změnilo se to v něco, co mi přijde mnohem zajímavější.

#### Claude Shannon a myšlenka informace (4:00) {#claude-shannon-and-the-idea-of-information-400}

Dovolte mi vyprávět vám příběh. Ve 30. a 40. letech 20. století byl Claude Shannon obklopen počátky nového věku. V Bellových laboratořích pracoval během války na systémech řízení palby a kryptografii a začal přemýšlet o obecnějším přístupu k informacím. Zpočátku tomu neříkal informace — v roce 1939 napsal kolegovi, že přemýšlí o „přenosu inteligence“. Slovo informace tehdy mělo jiný význam.

V roce 1948 publikoval „Matematickou teorii komunikace“ — stěžejní práci, která připravila půdu pro informační věk. Pro nás je nejdůležitější, že poprvé představila abstraktní myšlenku informace — definici, která nebyla vázána na hudbu, řeč, literaturu nebo kódy. Toto je práce, která představila bit — nedělitelnou jednotku informace, kterou lze měřit v jakémkoli kontextu.

Před tímto okamžikem nikdo ve skutečnosti neměl tento koncept informace jako univerzální, obecné věci. Teď se to může zdát šílené — informační technologie používáme už tisíce let. Je to neoddělitelně spjato s tím, co znamená být člověkem, používat řeč a jazyk. Ale základní vlastnost společnou všem těmto věcem jsme pojmenovali až velmi nedávno.

Co chci, abyste si z toho odnesli: byla doba, než jsme měli myšlenku informace, a doba poté. Co když nám podobně uniká něco tak zásadního? To je moje hypotéza.

#### Tři vodítka (7:00) {#three-clues-700}

Jak se snažím vysvětlit blockchainy, neustále narážím na tyto zvláštní věci, o kterých si myslím, že jsou vodítky k něčemu většímu.

**První vodítko** — popisujeme blockchainy jako nevyžadující důvěru i jako důvěryhodné. To je zvláštní. V Satoshiho whitepaperu mluvíme o odstranění potřeby důvěry. Ale ve whitepaperu Etherea mluvíme o využití Etherea k tomu, aby byly aplikace důvěryhodnější. Časopis The Economist nazval blockchainy „strojem na důvěru“. Myslíme tím něco skutečného, když říkáme, že blockchainy jsou nevyžadující důvěru, a myslíme tím něco skutečného, když říkáme, že jsou důvěryhodné. Náš jazyk to ještě nedohnal. Těmto zdánlivým rozporům vždy stojí za to věnovat pozornost — někdy odhalují mezeru v našich abstrakcích.

**Druhé vodítko** — hodně mluvíme o tom, jak se blockchainy liší od centralizovaných institucí — Bitcoin versus centrální banky, ENS versus DNS. Ale málokdy mluvíme o tom, co mají společného. Mohou se navzájem nahrazovat. Pokud jste někdy směnili fiat peníze za Bitcoin, nahradili jste je navzájem. Musí mít něco společného, aby k této záměně docházelo tak pravidelně.

U aut jsme mluvili o „kočárech bez koní“, ale alespoň jsme je dokázali pojmenovat — vozidla. U digitálních záznamů jsme mluvili o „bezpapírových“ médiích, ale znali jsme kategorii — informace. Zdá se, že jsme vynalezli technologii dříve, než jsme vynalezli kategorii, do které patří.

**Třetí vodítko** — Satoshiho práce začíná těmito slovy: „obchod na internetu se začal téměř výhradně spoléhat na finanční instituce sloužící jako důvěryhodné třetí strany.“ Satoshi porovnával Bitcoin s institucemi, ne s jiným softwarem. Něco na tom je.

#### Představení tvrdosti (11:00) {#introducing-hardness-1100}

Tady je moje odpověď na to, co patří do této škatulky. Říkám tomu **tvrdost**. Zde je příběh v pěti jednoduchých krocích a pak půjdeme více do hloubky.

Za prvé — naše civilizace závisí na sociální infrastruktuře, jako jsou peníze, právo a mnoho dalších věcí, a ty musí být spolehlivé. Musí se chovat tak, jak očekáváme, alespoň většinu času, aby pro nás byly užitečné. Jinak bychom se na ně nespoléhali — nestaly by se penězi.

Za druhé — je velmi obtížné dosáhnout této nezbytné úrovně spolehlivosti. Zatím existují v podstatě jen tři způsoby, jak jsme to kdy udělali: pomocí atomů, pomocí institucí a nyní pomocí blockchainů.

Za třetí — existuje nerozpoznaná vlastnost společná všem třem, kterou nazývám tvrdost. Tvrdost je schopnost, síla, která nám umožňuje učinit budoucnost předvídatelnější ve velmi specifických ohledech, které vyžadujeme pro složité koordinační hry.

Za čtvrté — každý z těchto tří zdrojů tvrdosti má jiné vlastnosti, díky kterým jsou užitečné v různých kontextech.

A za páté — můžeme je používat společně a navzájem je nahrazovat.

Míra inflace zlata je spolehlivá díky fyzikálním vlastnostem naší planety — je tvrdá jako atomy. Kontrakt je spolehlivý, protože instituce přijdou a zabaví vám majetek, pokud nedodržíte své závazky. Chytrý kontrakt bude fungovat, protože je zabezpečen kryptoekonomickým protokolem, ve kterém jde o miliardy dolarů.

O atomech, institucích a blockchainech můžete přemýšlet jako o stavebních materiálech — jako o dřevě, betonu a oceli. Jsou odlišné, ale jsou součástí společné kategorie. A tyto věci nepoužíváme ke stavbě budov, ale k budování civilizace. Možná s lepšími materiály dokážeme vybudovat větší, lepší a silnější civilizaci, než je ta, kterou máme nyní.

#### Co je to tvrdost? (14:00) {#what-is-hardness-1400}

Dovolte mi přesněji definovat, co myslím tvrdostí. Není to jen tak ledajaká spolehlivost, kterou by mohlo mít cokoliv. Tvrdost je specifický druh. První věc, kterou je třeba poznamenat, je, že jde o typ spolehlivosti, na kterém záleží při sociální koordinaci. Nejen to, že tento stůl je spolehlivě stůl — ale že můžete zaplatit nájem, že kontrakt bude vymáhán, že ekonomika je silná. K tomu je tvrdost určena.

A co přesně je výsledkem? Bohužel zde zavádím další nové slovo, kterému říkám **odlitek** (cast). Odlitek je jakýkoli možný budoucí stav světa, který je učiněn jistým nebo bezpečným pomocí tvrdosti. Omlouvám se za žargon, ale důvodem, proč zde mít nové slovo, je to, že si nemyslím, že máme nějaké, které by bylo zobecnitelné napříč všemi zdroji tvrdosti. Je to možná jako bit — potřebujeme koncept, o kterém můžeme mluvit v mnoha různých kontextech a přepínat mezi zdroji, aniž bychom byli vázáni na jeden z nich.

Odlitek související s půjčkou by byl: pokud Alice Bobovi nezaplatí, právní instituce použijí stále přísnější hrozby a kroky, aby ji k tomu donutily. Tento odlitek je ztvrdlý pomocí institucionální tvrdosti. Odlitek týkající se zlata by mohl být, že každý rok po dobu příštích 20 let vstoupí na trh určité množství zlata — což je spolehlivé díky fyzikálním vlastnostem naší Země. A odlitek týkající se Etherea by mohl být nárok, že aktiva lze převést pouze tehdy, pokud držíte soukromý klíč odpovídající určitému veřejnému klíči — ztvrdlý pomocí blockchainové tvrdosti.

V praxi obvykle pracujeme se svazky těchto věcí, které jsou navzájem propletené. Pokud vlastníte zlato a držíte ho v bance, záleží vám na mnoha věcech: odlitky o nabídce zlata v budoucnosti, odlitky o pevnosti bankovního trezoru, odlitky o síle právní dohody mezi vámi a vaší bankou, odlitky o spolehlivosti právního systému ve vaší zemi, který by tato pravidla vymáhal, kdyby se něco pokazilo.

Za druhé, o tvrdosti lze mluvit jako o měřítku bezpečnosti. Teoreticky je vždy měřitelná, i když v praxi je to obtížné. Jak tvrdý je tento odlitek, že každý rok po dobu příštích 20 let vstoupí na trh určité množství zlata? Jedním ze způsobů, jak se na to dívat, je přes pravděpodobnost — podívat se na všechna data a pokusit se předpovědět pravděpodobnost. Nebo se na to můžete podívat z pohledu nákladů: kolik by někoho stálo tento odlitek rozbít? Pokud jste národní stát, mohli byste využít sílu války a mezinárodní regulace. Nebo byste mohli jít jinou cestou a získat z vesmíru asteroid se spoustou zlata, čímž byste obešli fyzikální omezení Země. Téměř každý odlitek má svou cenu, za kterou ho lze rozbít.

A konečně, tvrdost pochází z určitých zdrojů — atomů, institucí a blockchainů. Každý z nich má jiné vlastnosti, díky kterým jsou užitečné v různých kontextech.

Na tomto rámci se mi líbí, že nám umožňuje klást hlubší otázky — nejen mluvit o specifických vlastnostech blockchainů, ale porovnávat všechny tyto různé věci a přemýšlet o tom, kde jsou vhodné, jak je používáme a v jaké kombinaci.

#### Tvrdost atomů (19:00) {#atom-hardness-1900}

Tvrdost atomů spočívá v tom, když nacházíme spolehlivost v přírodě kolem nás — v doslovných fyzických atomech, ale i v jiných přirozeně se vyskytujících vlastnostech. Děláme to, když používáme zlaté korálky jako peníze, když používáme fyzické struktury k definování vlastnických práv nebo když zaznamenáváme vlastnická práva do fyzického objektu, jako je listina.

Má to mnoho výhod: automatické vymáhání, sdílený stav, univerzální soubor pravidel. Pro lidskou civilizaci je velmi výhodné, že fyzikální zákony platí všude stejně, alespoň v makroskopických měřítkách, na kterých nám záleží nejvíce.

Má to ale i své slabiny. Jsme omezeni tím, co můžeme najít ve světě. Tvrdost atomů je trochu jako architekt, který chce do svého domu zakomponovat skalní stěnu — musíte najít takovou, která bude fungovat. Nemůžete si skalní stěnu jen tak vyrobit. Můžete ji trochu upravit, ale spoléháte se na to, že najdete přirozeně se vyskytující prvek, který vyhovuje vaší konkrétní potřebě.

Nemůžeme jí dát nová pravidla. Máme zlato, ale nemůžeme vesmír požádat, aby nám dal nový druh zlata s nižší inflací, spravedlivějším geografickým rozložením nebo aby možná vyřešil problém s hmotností. To udělat nemůžeme. A má velmi omezenou programovatelnost — z tvrdosti atomů můžete vytvořit jen určité druhy ztvrdlých věcí, hlavně peníze. Z atomů nemůžete vytvořit manželskou smlouvu. K tomu potřebujete něco složitějšího, jako je instituce.

A odlitky jsou často podkopávány naší rostoucí lidskou kontrolou nad přírodou. Používat mušle jako peníze je v pořádku, dokud se nestanete součástí globální ekonomiky, která může radikálně narušit vaše očekávání ohledně inflace mušlí, a najednou je vaše ekonomika zničena. Používání zlata jako prostředku směny může jednoho dne čelit stejnému problému, pokud a až budeme schopni získat zlato z asteroidů a změnit naše předpoklady o nabídce.

Ale je to ještě jemnější. Někdy máme odlitky, o kterých si ani neuvědomujeme, že existují, ale pak zmizí, protože se něco změnilo. Dlouhou dobu existoval tvrdý odlitek ohledně rychlosti obchodování na finančních trzích — mohlo se to dít jen určitým tempem, možná tempem, jakým na sebe lidé dokážou křičet na parketu. Tento odlitek byl tvrdý jako atomy — prostě jsme nedokázali komunikovat rychleji. Nové technologie však tyto předpoklady zcela podkopaly. Uvědomili jsme si, že se nám vlastně líbila verze toho starého odlitku, a vytvořili jsme ho znovu z institucí — zavedením regulací, které omezují rychlost obchodování a vynucují přerušovače obchodování (circuit breakers).

#### Institucionální tvrdost (22:00) {#institutional-hardness-2200}

Institucionální tvrdost je velmi široká kategorie — pokrývá většinu věcí, které nás napadnou, když pomyslíme na civilizaci. Naše právní systémy, zákonodárné sbory, policejní složky, korporace, prostě všechno. Všechny instituce, které poskytují nějaký druh tvrdosti. Vytvořili jsme odlitky, které daly našim společnostem řád a trestaly asociální chování. Vytvořili jsme tvrdost jako platformu, která umožňuje komukoli vytvořit si vlastní odlitky ztvrdlé institucemi, pokud dodržujete určitá pravidla. Vytvořili jsme odlitky, které zrodily nová aktiva a poskytly zdroje úvěrů rostoucím ekonomikám.

Institucionální tvrdost má mnoho výhod. Je velmi programovatelná — lidské bytosti seskupené do organizací dokážou přijímat opravdu složité nebo jemné instrukce. To je velmi velký prostor pro návrh možných odlitků. A jsou tvořeny lidmi a lidé jsou dobří. Možná je dobře, že někdy může někdo zasáhnout a říct: „Tohle nebudu vymáhat, protože si myslím, že je to špatně.“ Je dobře, že možná někdy existuje v systému trhlina, aby někdo mohl být whistleblowerem nebo rebelem.

Má to ale i mnoho slabin. Je omezena hranicemi — pouze v určitých zemích máte skutečně přístup k institucím, které vymáhají právní stát. Je vystavena politickému selhání nebo selhání státu — pokud se vaše vláda prostě nedokáže na věcech dohodnout, nebo jste napadeni agresivním národem, určité instituce, na které se spoléháte ohledně peněz nebo kontraktů, se mohou prostě rozpadnout. Často jsou neprůhledné — je těžké říct, zda je instituce skutečně tvrdá nebo ne, dokud se něco nepokazí. Mají vysoké počáteční náklady — nemůžeme jen tak snadno vytvářet nové instituce v měřítku Fedu nebo právního systému, abychom na nich mohli iterovat. Jsme tak trochu uvězněni s těmi, které máme.

A jsou tvořeny lidmi a lidé jsou špatní. Realita v této zemi a mnoha dalších je taková, že mnoho lidí ve skutečnosti nemělo přístup k tvrdosti poskytované institucemi. Nemohli získat hypotéku. Nemohli si otevřít bankovní účet. Protože když naplníte instituci lidmi, podléhá jejich zlu, jejich předsudkům, jejich ideologiím. A naše závislost na institucionální tvrdosti se jen zvyšuje. Problém s tím, že software pohlcuje svět, je ten, že většina softwaru je ve skutečnosti tvořena jen institucí za obrazovkou, a my jim v důsledku toho dáváme stále více moci.

#### Blockchainová tvrdost (24:20) {#blockchain-hardness-2420}

Satoshiho vynález byl samozřejmě víc než jen Bitcoin — bylo to jádro univerzální techniky pro vytváření digitální tvrdosti v digitálním prostředí. Má mnoho silných stránek: univerzální globální přístup, je tvořen softwarem a software může psát kdokoli, míra tvrdosti může být transparentní a auditovatelná, nízké počáteční náklady, snadná iterace a je zabezpečen tržními pobídkami — a trhy jsou racionální.

Má to ale i slabiny. Vyžaduje to technologickou civilizaci — dříve jsme blockchainy mít nemohli kvůli jejich požadavkům a civilizace v budoucnosti, která nebude mít to, co máme my, je také nebude moci používat. Je tvořen softwarem a software může být napsán špatně. Rozsah odlitků je omezen na onchain prostředí. A je zabezpečen tržními pobídkami — a trhy jsou iracionální.

#### Proč na tom záleží (25:10) {#why-this-matters-2510}

Co to tedy znamená? Co nám to dává? Proč je to víc než jen akademický zájem?

Mnoho věcí začne dávat mnohem větší smysl, když se na ně podíváme touto optikou. Jednou z nich je otázka, kterou jsme začali: proč říkáme, že blockchainy jsou nevyžadující důvěru i důvěryhodné? Vysvětlení je následující — když říkáme, že blockchainy jsou nevyžadující důvěru, ve skutečnosti tím myslíme, že jejich tvrdost nezávisí na osobě nebo instituci. A když říkáme, že jsou důvěryhodné, myslíme tím jen to, že mají tvrdost — jen jiného druhu. Naše neschopnost rozlišit to je to, co způsobuje tento zmatený jazyk.

Vysvětluje to, proč soukromé nebo centralizované blockchainy nejsou zajímavé. Blockchain, který není decentralizovaný, se prostě zhroutí zpět do podoby instituce. Pokud je řízen třemi bankami nebo hrstkou validátorů, kteří jsou všichni financováni stejnou organizací, pak je to jen EVM zabezpečené institucionální tvrdostí. To nejzajímavější na blockchainech není EVM — je to to, že existuje jiný zdroj tvrdosti, který nekoreluje s institucemi a nepodléhá stejným selháním a omezením. Proto je to jiné. Proto na tom záleží.

Pomáhá to také pochopit spektrum možností a výchozí ideologie, do kterých lidé v blockchainovém prostoru spadají. Mnoho lidí se velmi soustředí na využití blockchainové tvrdosti k tomu, aby konkurovali institucionální tvrdosti nebo ji nahradili — o tom je velká část bitcoinové komunity, o tom jsou z velké části decentralizované finance (DeFi). Dokonce i ENS se snaží nějakým způsobem nahradit DNS nebo mu konkurovat. Ale pak jsou tu také lidé, kteří vidí, že blockchainová tvrdost dokáže věci, které institucionální tvrdost nedokáže — nápady, které ještě nikdo nikdy nezkusil, protože jsme nikdy neměli tuto schopnost, tuto určitou příchuť tvrdosti. A nyní můžeme tyto věci prozkoumat. Možná tam patří NFT, nebo hry jako Dark Forest, nebo hnutí kolem autonomních světů.

#### Zvyšování našich ambicí (27:00) {#raising-our-ambitions-2700}

A co je nejdůležitější, myslím si, že tento rámec zvyšuje naše ambice. Osobně je to to, na čem mi záleží, a možná to rezonuje i s vámi — nejsem tu jen kvůli těmto jednotlivým aplikacím. Nejsem někdo, komu jde jen o Bitcoin, jen o DeFi nebo jen o NFT. Možná jste na tom stejně. Děje se tu něco většího.

Můžeme si upřímně klást vyšší cíle než jen peníze. Můžeme si klást vyšší cíle než jen finance. Je tu mnohem větší obraz. Myslím, že to vlastně pomáhá definovat vizi, která se zdá být svým rozsahem adekvátní výzvám, kterým čelíme, a příležitostem, které blockchainy nabízejí.

Naším posláním není jen nahradit Fed. Posláním je vylepšit a rozšířit samotné materiály, které jsme použili k vybudování naší civilizace — snížit náklady na tyto nástroje tak, aby k nim měl přístup každý na Zemi, a umožnit tak více změn. A mimochodem, tyto náklady se brzy sníží.

Pomoci lidstvu pokračovat v hraní této nekonečné hry tím, že umožníme více lidem měnit pravidla. Jen velmi málo lidí může přijmout zákon, ale kdokoli může napsat chytrý kontrakt. Tuto schopnost rozšiřujeme.

Myslím, že spousta lidí v mnoha různých zemích a mnoha ideologiích má pocit, že jsme uvízli — že pravidla hry už nejsou taková, jaká by měla být, ale my jsme bezmocní je změnit. V mnoha ohledech jsme uvízli v tomto lokálním maximu a tušíme, že je to špatně. Blockchainy to nenapraví, ale myslím, že mohou pomoci. Otevírají nový prostor pro experimentování. Umožňují více lidem měnit pravidla, psát nová pravidla, přispívat do této nekonečné hry. Nemůžeme psát zákony, ale můžeme napsat chytrý kontrakt.

Chci skončit touto poznámkou: pokud jste už někdy viděli přednášky lidí z Nadace Ethereum, víte, že máme rádi knihu *Konečné a nekonečné hry* (Finite and Infinite Games). Jednou z maxim z této knihy je, že pokračovat může jen to, co se může změnit. Nemůžeme zůstat trčet v tomto lokálním maximu. Musíme věci změnit. A myslím, že blockchainy nám v tom pomáhají. Mnohokrát děkuji.