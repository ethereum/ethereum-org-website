---
title: Důkaz nulovou znalostí
description: Netechnický úvod do důkazů s nulovou znalostí pro začátečníky.
lang: cs
---

## Co jsou důkazy s nulovou znalostí? {#what-are-zk-proofs}

Důkaz s nulovou znalostí je způsob, jak prokázat platnost tvrzení, aniž by bylo odhaleno samotné tvrzení. „Dokazovatel“ je strana, která se snaží prokázat tvrzení, zatímco „ověřovatel“ je odpovědný za ověření tvrzení.

Důkazy s nulovou znalostí se poprvé objevily v dokumentu z roku 1985 s názvem „[Znalostí komplexita interaktivních důkazních systémů](http://people.csail.mit.edu/silvio/Selected%20Scientific%20Papers/Proof%20Systems/The_Knowledge_Complexity_Of_Interactive_Proof_Systems.pdf)“. Ten poskytuje definici důkazů s nulovými znalostmi, která se dnes používá nejvíce:

> Protokol s nulovou znalostí je metoda, kterou může jedna strana (dokazovatel) prokázat druhé straně (ověřovateli), že je něco pravdivé, aniž by prozradila jakoukoli jinou informaci kromě skutečnosti, že toto konkrétní tvrzení je pravdivé.

Důkazy s nulovou znalostí se v průběhu let vylepšovaly a nyní se používají v aplikacích v reálném světě.

## Proč potřebujeme důkazy s nulovou znalostí? {#why-zero-knowledge-proofs-are-important}

Důkazy s nulovou znalostí představovaly průlom v aplikované kryptografii, protože slibovaly zlepšení bezpečnosti uživatelských informací. Zamyslete se, jak byste mohli prokázat nějaký výrok (např. „Jsem občan země X“) jiné straně (např. poskytovateli služeb). Budete muset poskytnout „důkaz“ na podporu tohoto výroku, jako je cestovní pas nebo řidičský průkaz.

S tímto přístupem se ale pojí různé problémy, především nedostatek soukromí. Informace identifikující osobu (Personally Identifiable Information, PII) sdílené se službami třetích stran jsou uloženy v centrálních databázích, které jsou zranitelné vůči útokům hackerů. Vzhledem k tomu, že krádež identity je kritickým problémem, zvyšujíi se požadavky na další na ochranu soukromí při sdílení citlivých informací.

Důkazy s nulovou znalostí řeší tento problém tím, že odstraňují potřebu odhalovat citlivé informace za účelem prokázání platnosti tvrzení. Protokol s nulovou znalostí používá výrok (nazývaný „svědek“) jako vstup pro vytvoření stručného důkazu jeho platnosti. Tento důkaz poskytuje záruku, že prohlášení je pravdivé, aniž by odhalil informace použité při jeho vytváření.

Vraťme se k našemu příkladu: Jediný důkaz, který potřebujete k prokázání svého občanství, je důkaz s nulovou znalostí. Ověřovatel musí pouze zkontrolovat, zda platí určité vlastnosti důkazu, aby se přesvědčil, že platí i základní tvrzení.

## Jak důkazy s nulovou znalostí fungují? {#how-do-zero-knowledge-proofs-work}

Důkaz s nulovou znalostí vám umožňuje prokázat pravdivost tvrzení, aniž byste sdíleli obsah tvrzení nebo odhalili, jak jste pravdu zjistili. Aby to bylo možné, protokoly s nulovou znalostí spoléhají na algoritmy, které berou jistá data jako vstup a vracejí „pravda“ nebo „nepravda“ jako výstup.

Protokol s nulovou znalostí musí splňovat tato kritéria:

1. **Úplnost:** Pokud je vstup platný, protokol s nulovou znalostí vždy vrátí hodnotu „true“. Pokud je tedy základní tvrzení pravdivé a dokazovatel i ověřovatel jednají čestně, je možné důkaz přijmout.

2. **Spolehlivost**: Pokud je vstup neplatný, je teoreticky nemožné přimět protokol s nulovou znalostí, aby vrátil hodnotu „pravda“. Nepoctivý dokazovatel tedy nemůže oklamat poctivého ověřovatele, nebude schopen ho přesvědčit, že neplatný výrok je platný (s výjimkou zanedbatelné míry pravděpodobnosti).

3. **Nulová znalost**: Ověřovatel se o výroku nedozví nic kromě jeho platnosti nebo nepravdivosti (má „nulovou znalost“ výroku). Tento požadavek také brání ověřovateli na základě důkazu uhodnout původní vstup (obsah prohlášení).

V základní podobě se důkaz s nulovou znalostí skládá ze tří prvků. Jsou to: **svědek**, **zkouška** a **odpověď**.

- **Svědek**: Důkazem s nulovou znalostí chce dokazovatel prokázat znalost nějaké skryté informace. Tajná informace je „svědkem“ důkazu a předpokládaná znalost svědka ověřovatelem vytváří soubor otázek, na které může odpovědět pouze strana, která tyto informace zná. Dokazovatel tedy zahájí proces dokazování náhodným výběrem otázky, vypočítáním odpovědi a jejím odesláním ověřovateli.

- **Zkouška**: Ověřovatel náhodně vybere další otázku ze sady a požádá dokazovatele, aby na ni odpověděl.

- **Odpověď**: Dokazovatel přijme otázku, vypočítá odpověď a vrátí ji ověřovateli. Odpověď dokazovatele umožňuje ověřovateli zkontrolovat, zda má skutečně přístup ke svědkovi. Aby dokazovatel nehádal naslepo a náhodou správné odpovědi neuhodl, vybere ověřovatel více otázek, na které se bude ptát. Mnohonásobným opakováním tohoto postupu výrazně klesá možnost podvodu ze strany dokazovatele. Je proto nutné provést ho několikrát za sebou, dokud není ověřovatel spokojen.

Výše uvedené popisuje strukturu „interaktivního důkazu s nulovou znalostí“. Rané protokoly s nulovou znalostí používaly interaktivní dokazování, kde ověření platnosti prohlášení vyžadovalo zpětnou komunikaci mezi dokazovateli a ověřovateli.

Dobrým příkladem, který ilustruje, jak fungují interaktivní důkazy, je slavný [příběh jeskyně Ali Baba](https://en.wikipedia.org/wiki/Zero-knowledge_proof#The_Ali_Baba_cave) od Jeana-Jacquese Quisquatera. V příběhu chce Peggy (dokazovatel) dokázat Victorovi (ověřovatel), že zná tajnou frázi, jak otevřít kouzelné dveře, aniž by ji prozradila.

### Neinteraktivní důkazy s nulovou znalostí {#non-interactive-zero-knowledge-proofs}

I když je interaktivní dokazování revoluční, mělo omezenou užitečnost, protože vyžadovalo, aby byly obě strany k dispozici a interagovaly opakovaně. I kdyby byl ověřovatel přesvědčen o poctivosti dokazovatele, důkaz by nebyl k dispozici pro nezávislé ověření (protože výpočet nového důkazu vyžadoval novou sadu zpráv mezi dokazovatelem a ověřovatelem).

K vyřešení tohoto problému Manuel Blum, Paul Feldman a Silvio Micali navrhli první [neinteraktivní důkazy s nulovou znalostí](https://dl.acm.org/doi/10.1145/62212.62222), kde dokazobvatel a ověřovatel sdílejí klíč. To umožňuje dokazovateli prokázat svou znalost některých informací (tj. svědka), aniž by poskytoval informace samotné.

Na rozdíl od interaktivních důkazů vyžadují neinteraktivní důkazy pouze jedno kolo komunikace mezi účastníky (dokazovatelem a ověřovatelem). Dokazovatel předá tajné informace speciálnímu algoritmu pro výpočet důkazu s nulovou znalostí. Tento důkaz je zaslán ověřovateli, který pomocí jiného algoritmu zkontroluje, že dokazovatel zná tajné informace.

Neinteraktivní dokazování omezuje komunikaci mezi dokazovatelem a ověřovatelem, což zefektivňuje proces ověřování. Jakmile je navíc vygenerován důkaz, může ho ověřit kdokoliv (s přístupem ke sdílenému klíči a ověřovacímu algoritmu).

Neinteraktivní důkazy představovaly průlom v technologii nulové znalosti a podnítily vývoj dnes používaných důkazních systémů. Typy těchto důkazů rozebíráme níže:

### Typy důkazů s nulovou znalostí {#types-of-zero-knowledge-proofs}

#### ZK-SNARKs {#zk-snarks}

ZK-SNARK je zkratka pro **Zero-Knowledge Succinct Non-Interactive Argument of Knowledge**. Protokol ZK-SNARK má následující vlastnosti:

- **Nulová znalost**: Ověřovatel může ověřit platnost tvrzení, aniž by o tvrzení věděl cokoliv dalšího. Jediné, co ověřovatel o prohlášení ví, je, zda je pravdivé nebo nepravdivé.

- **Spolehlivost**: Důkaz s nulovou znalostí je menší než svědek a je možné ho ověřit rychle.

- **Neinteraktivita**: Důkaz je „neinteraktivní“, protože dokazovatel a ověřovatel interagují pouze jednou, na rozdíl od interaktivních důkazů, které vyžadují více kol komunikace.

- **Důvěryhodnost**: Důkaz splňuje požadavek „spolehlivosti“, takže podvádění je extrémně nepravděpodobné.

- **(Chybějící) Znalost**: Důkaz s nulovou znalostí nemůže být konstruován bez přístupu k tajným informacím (svědek). Pro dokazovatele, který nezná svědka, je obtížné, ne-li nemožné, vypočítat platný důkaz s nulovou znalostí.

Výše zmíněný „sdílený klíč“ odkazuje na veřejné parametry, na kterých se dokazovatel a ověřovatel domluví při generování a ověřování důkazů. Generování veřejných parametrů (souhrnně známých jako Common Reference String (CRS)) je citlivá operace, protože je klíčová pro zabezpečení protokolu. Pokud se entropie (náhodnost) použitá při generování CRS dostane do rukou nepoctivého dokazovatele, může vypočítat falešné důkazy.

[Multi-party computing (MPC)](https://en.wikipedia.org/wiki/Secure_multi-party_computation) je způsob, jak snížit rizika při generování veřejných parametrů. Probíhá tak, že se několik účastníků připojí k takzvanému [důvěryhodnému obřadu nastavení](https://zkproof.org/2021/06/30/setup-ceremonies/amp/), kde každá osoba k vytvoření CRS přispěje náhodnými hodnotami. Pokud alespoň jeden čestný účastník zničí svou část entropie, protokol ZK-SNARK si zachovává výpočetní spolehlivost.

Důvěryhodná nastavení vyžadují, aby uživatelé důvěřovali účastníkům při generování veřejných parametrů. Vývoj ZK-STARKů však umožnil vznik ověřovacích protokolů, které pracují s nastavením, kterému není třeba důvěřovat.

#### ZK-STARKs {#zk-starks}

ZK-STARK je zkratka pro **Zero-Knowledge Scalable Transparent Argument of Knowledge**. ZK-STARK jsou podobné ZK-SNARK, až na to, že jsou:

- **Škálovatelné**: ZK-STARK je rychlejší než ZK-SNARK při generování a ověřování důkazů, pokud je svědek větší. S důkazy typu STARK se časy dokazování a ověřování s rostoucím objemem dat svědka jen mírně prodlužují (doby dokazování a ověřování typu SNARK rostou s velikostí svědka lineárně).

- **Transparentní**: ZK-STARK spoléhá na veřejně ověřitelnou náhodnost při generování veřejných parametrů pro prokázání a ověření důkazu, namísto nastavení, kterému je třeba důvěřovat. Jsou tedy ve srovnání se ZK-SNARK transparentnější.

ZK-STARK produkují větší důkazy než ZK-SNARK, což znamená, že mají obecně vyšší ověřovací náklady. Existují však případy (jako je prokazování velkých datových sad), kdy mohou být ZK-STARK cenově výhodnější než ZK-SNARK.

## Ukázkové případy použití důkazů s nulovou znalostí {#use-cases-for-zero-knowledge-proofs}

### Anonymní platby {#anonymous-payments}

Platby kreditní kartou jsou často viditelné pro více stran, včetně poskytovatele plateb, bank a dalších zainteresovaných stran (např. vládních úřadů). Finanční dohled má sice výhody, například v případě odhalování nezákonné činnosti, ale také narušuje soukromí běžných občanů.

Kryptoměny byly vyvinuty jako nástroj pro uskutečňování soukromých peer-to-peer transakcí. Většina transakcí s kryptoměnami je ale otevřeně viditelná na veřejných blockchainech. Identity uživatelů jsou často pseudonymní a buď záměrně propojeny s identitami v reálném světě (např. zahrnutím ethereovských adres na profily Twitter nebo GitHub), nebo mohou být spojeny s identitami v reálném světě pomocí datové analýzy aktivity uživatele.

Existují specifické „kryptoměny na ochranu soukromí“ určené pro zcela anonymní transakce. Blockchainy zaměřené na soukromí, jako jsou Zcash a Monero, neuvádí podrobnosti o transakci, včetně adres odesílatele/příjemce, typu finančních prostředků, množství a časové osy transakce.

Díky zahrnutí technologie nulové znalosti umožňují blockchainové sítě, které se zaměřují na soukromí, síťovým uzlům ověřovat transakce bez nutnosti přístupu k datům transakcí.

Důkazy s nulovými znalostmi se také používají při anonymizaci transakcí na veřejných blockchainech. Příkladem je Tornado Cash, decentralizovaná služba bez třetí strany, která uživatelům umožňuje provádět soukromé transakce na Ethereu. Tornado Cash používá důkazy s nulovou znalostí ke skrytí podrobností o transakcích a k zajištění finančního soukromí. Bohužel, protože se jedná o "opt-in" nástroje ochrany osobních údajů, jsou spojovány s nezákonnou činností. Pro vyřešení tohoto problému je třeba, aby se soukromí stalo výchozím nastavením veřejných blockchainů.

### Ochrana identity {#identity-protection}

Většina současných systémů sloužících ke správě identit ohrožuje osobní údaje. Důkazy s nulovou znalostí mohou jednotlivcům pomoci ověřit svoji identitu a zároveň chránit citlivé detaily.

Důkazy s nulovou znalostí jsou zvláště užitečné v kontextu [decentralizované identity](/decentralized-identity/). Decentralizovaná identita (také popisovaná jako „samostatná identita“) dává jednotlivci možnost převzít kontrolu nad přístupem k osobním údajům. Dobrým příkladem toho, jak technologie s nulovou znalostí umožňuje decentralizovanou identitu, je prokazování občanství bez odhalení údajů o vašem daňovém identifikačním čísle nebo pasu.

### Ověření {#authentication}

Používání online služeb je často podmíněno prokázáním vaší identity a právy na přístup k těmto platformám. To často vyžaduje poskytnutí osobních údajů, jako jsou jména, e-mailové adresy, data narození atd. Možná si také budete muset zapamatovat dlouhá hesla nebo riskovat ztrátu přístupu.

Důkazy s nulovou znalostí mohou zjednodušit ověřování pro platformy i uživatele. Jakmile je vygenerován ZK důkaz pomocí veřejných vstupů (např. z dat potvrzujících členství uživatele na platformě) a soukromých vstupů (např. údajů o uživateli), může jej uživatel jednoduše předložit k ověření své identity. To zlepšuje uživatelskou zkušenost a zbavuje organizace potřeby ukládat obrovské množství uživatelských informací.

### Ověřitelný výpočet {#verifiable-computation}

Ověřitelný výpočet je další aplikací technologie s nulovou znalostí pro zlepšení chodu blockchainu. Umožňuje nám outsourcovat výpočty jinému subjektu a to při zachování ověřitelných výsledků. Subjekt předloží výsledek spolu s dokladem, který ověřuje, že program byl spuštěn správně.

Ověřitelný výpočet je zásadní pro zlepšení rychlosti zpracování na blockchain a to bez snížení bezpečnosti. Pochopení tohoto principu vyžaduje znalost rozdílů v navrhovaných řešeních pro škálování Etherea.

[Řešení škálování blockchainu](/developers/docs/scaling/#on-chain-scaling), jako je sharding, vyžadují rozsáhlou úpravu základní vrstvy blockchainu. Tento přístup je však velmi složitý a chyby v implementaci mohou podkopat bezpečnostní model Etherea.

[Řešení škálování mimo blockchain](/developers/docs/scaling/#off-chain-scaling) nevyžadují přepracování základního protokolu Etherea. Místo toho se spoléhají na outsourcovaný výpočetní model pro zlepšení propustnosti transakcí na základní vrstvě Etherea.

V praxi to funguje takto:

- Namísto zpracování každé transakce přesune Ethereum její exekuci na samostatný blockchain.

- Po zpracování transakcí vrátí tento blockchain výsledky, které se aplikují do stavu Etherea.

Výhodou je, že Ethereum nemusí provádět žádnou exekuci a potřebuje pouze aplikovat výsledky z outsourcovaných výpočtů na svůj stav. To snižuje zahlcení sítě a také zlepšuje rychlost transakcí (protokoly mimo blockchain se optimalizují pro rychlejší exekuci).

Blockchain potřebuje způsob, jak ověřovat transakce externě bez opětovného provádění, jinak dojde ke ztrátě výhody externí exekuce.

Zde přichází na řadu ověřitelný výpočet. Když síťový uzel provede transakci mimo Ethereum, předloží důkaz s nulovou znalostí, aby prokázal správnost externí exekuce. Tento důkaz (nazývaný [důkaz platnosti](/glossary/#validity-proof)) zaručuje, že transakce je platná, což umožňuje Ethereu aplikovat výsledek na svůj stav – aniž by čekal, zda tento výsledek někdo zpochybní.

[Rollupy s nulovou znalostí](/developers/docs/scaling/zk-rollups) a [validia](/developers/docs/scaling/validium/) jsou dvě řešení škálování mimo blockchain, která používají důkazy platnosti k zajištění bezpečné škálovatelnosti. Tyto protokoly provádějí tisíce transakcí mimo blockchain a předkládají důkazy k ověření na Ethereu. Tyto výsledky lze použít okamžitě po ověření důkazu, což umožňuje Ethereu zpracovat více transakcí bez zvýšení náročnosti výpočtů na základní vrstvě.

### Snížení úplatkářství a tajných dohod při hlasování {#secure-blockchain-voting}

Hlasovací schémata na blockchainu mají spoustu dobrých vlastností: Jsou plně auditovatelná, zabezpečená proti útokům, odolná vůči cenzuře a nemají žádná geografická omezení. Ale nejsou imunní vůči problému **tajné dohody**.

Tajná dohoda, definovaná jako „koordinace za účelem omezení otevřené soutěže klamáním, podváděním a navedením druhých“, může mít podobu nabízení úplatků. Například Alice může dostat úplatek od Boba, aby hlasovala pro `možnost B` na hlasovacím lístku, i když dává přednost `možnosti A`.

Úplatkářství a tajné dohody omezují efektivitu jakéhokoli procesu, který využívá hlasování, ale zejména těch, kde uživatelé mohou prokázat, jak hlasovali. To může mít neblahé důsledky zejména na místech, kde hlasy slouží k přidělování omezených zdrojů.

Například [kvadratické mechanismy financování](https://www.radicalxchange.org/concepts/plural-funding/) využívají dary k měření preference veřejně prospěšných projektů. Každý dar se počítá jako „hlas“ pro konkrétní projekt, přičemž projekty, které získají více hlasů, získají více prostředků z odpovídající skupiny.

Díky hlasování na blockchainu je kvadratické financování náchylné k tajným dohodám: Blockchainové transakce jsou veřejné, takže úplatkáři mohou kontrolovat aktivitu úplatníka v řetězci, protože vidí, jak kdo „hlasoval“. Tímto způsobem kvadratické financování přestává být efektivním prostředkem pro alokaci finančních prostředků na základě preferencí komunity.

Novější řešení, jako je MACI (Minimum Anti-Collusion Infrastructure), naštěstí používají důkazy s nulovou znalostí, aby bylo hlasování na blockchainu (např. kvadratické mechanismy financování) odolné vůči úplatkům a tajným dohodám. MACI je sada smart kontraktů a skriptů, které umožňují centrálnímu správci (nazývanému „koordinátor“) shromažďovat hlasy a sčítat výsledky, _aniž by odhalovaly_ podrobnosti o tom, jak jednotlivci hlasovali. I tak je možné ověřit, že hlasy byly řádně sečteny, případně potvrdit, že se konkrétní jednotlivec zúčastnil hlasování.

#### Jak MACI pracuje s důkazy s nulovou znalostí? {#how-maci-works-with-zk-proofs}

Na začátku koordinátor zařadí MACI kontrakt na Ethereum, pté se uživatelé mohou přihlásit k hlasování (registrací svého veřejného klíče do smart kontraktu). Uživatelé hlasují zasíláním zpráv zašifrovaných jejich veřejným klíčem do smart kontraktu (platný hlas musí být mimo jiné podepsán nejnovějším veřejným klíčem spojeným s identitou uživatele). Poté skončení hlasování koordinátor zpracuje všechny zprávy, sečte hlasy a ověří výsledky na blockchainu.

V MACI se důkazy s nulovou znalostí používají k zajištění správnosti výpočtu tím, že koordinátorovi znemožní nesprávné zpracování hlasů a sečtení výsledků. Toho je dosaženo tím, že koordinátor musí vygenerovat důkazy ZK-SNARK ověřující, že a) všechny zprávy byly zpracovány správně, b) konečný výsledek odpovídá součtu všech _platných_ hlasů.

MACI tedy i bez sdílení podrobností o hlasech uživatelů (jak je tomu obvykle) zaručuje integritu výsledků hlasování. Tato funkce je užitečná při snižování účinnosti základních tajných dohod. Tuto možnost můžeme ilustrovat pomocí předchozího příkladu, kdy Bob podplatil Alici, aby hlasovala pro jím preferovanou možnost:

- Alice se zaregistruje k hlasování zasláním svého veřejného klíče do smart kontraktu.
- Alice souhlasí, že bude hlasovat pro `možnost B` výměnou za úplatek od Boba.
- Alice hlasuje pro `možnost B`.
- Alice tajně odešle zašifrovanou transakci, a tím změní veřejný klíč spojený se svou identitou.
- Alice odešle další (zašifrovanou) zprávu do smart kontraktu, čímž hlasuje pro `možnost A` pomocí nového veřejného klíče.
- Alice ukáže Bobovi transakci, která prokazuje, že hlasovala pro `možnost B` (tato transakce je neplatná, protože veřejný klíč, který pro tento hlas použila, již není spojen s Alicinou identitou v systému)
- Při zpracovávání zpráv koordinátor přeskočí Alicin hlas pro `možnost B` a započítává pouze hlas pro `možnost A`. Bobův pokus manipulovat s hlasováním pomocí dohody s Alicí selže.

Používání MACI _vyžaduje_ víru, že se koordinátor nedomluví s úplatkáři nebo se nepokusí uplatit samotné voliče. Koordinátor může dešifrovat uživatelské zprávy (nezbytné pro vytvoření důkazu), takže pro něj není problém přesně ověřit, jak kdo hlasoval.

Ale v případech, kdy je koordinátor čestný, MACI představuje mocný nástroj pro zaručení poctivosti hlasování v řetězci. To vysvětluje jeho popularitu mezi aplikacemi kvadratického financování (např. [clr.fund](https://clr.fund/#/about/maci)), které do značné míry spoléhají na nedotknutelnost volby každého jednotlivce.

[Zjistěte více o MACI](https://privacy-scaling-explorations.github.io/maci/).

## Nevýhody použití důkazů s nulovou znalostí {#drawbacks-of-using-zero-knowledge-proofs}

### Náklady na hardware {#hardware-costs}

Generování důkazů s nulovou znalostí zahrnuje velmi složité výpočty, které se nejlépe dělají na specializovaných strojích. Jelikož jsou tyto stroje drahé, jsou často mimo dosah jednotlivců. Navíc aplikace, které by chtěly používat technologii s nulovou znalostí, musí počítat s náklady na hardware – což může zvýšit náklady pro koncové uživatele.

### Náklady na ověření důkazu {#proof-verification-costs}

Ověřování důkazů také vyžaduje složité výpočty a zvyšuje náklady na implementaci technologie s nulovou znalostí v aplikacích. Tyto náklady jsou obzvláště důležité v souvislosti s prokazováním správnosti výpočtů. Například ZK-rollupy platí asi 500 000 gasu za ověření jediného důkazu ZK-SNARK na Ethereu, přičemž ZK-STARK vyžadují ještě vyšší poplatky.

### Předpoklady důvěry {#trust-assumptions}

V ZK-SNARK je společný referenční řetězec (veřejné parametry) generován jednou a je zúčastněným stranám k dispozici pro opětovné použití. Veřejné parametry jsou vytvářeny prostřednictvím tzv. důvěryhodného obřadu nastavení, který předpokládá, že účastníci jsou čestní.

Ale ve skutečnosti neexistuje způsob, jak by uživatelé mohli posoudit poctivost všech účastníků. Také musí věřit vývojářům. ZK-STARK jsou bez nostnosti důvěry, protože náhodnost použitá při generování řetězce je veřejně ověřitelná. V současné době výzkumníci pracují na nastaveních pro ZK-SNARK, která také nevyžadují důvěru, aby zvýšili bezpečnost dokazovacích mechanismů.

### Hrozby kvantových počítačů {#quantum-computing-threats}

ZK-SNARK používá pro šifrování kryptografii eliptických křivek ([ECDSA](/glossary/#ecdsa)). Zatímco algoritmus ECDSA je prozatím bezpečný, vývoj kvantových počítačů by mohl v budoucnu narušit jeho bezpečnostní model.

ZK-STARK je považován za imunní vůči hrozbě kvantových počítačů, protože pro šifrování používá hashe odolné proti kolizím. Na rozdíl od párů veřejného a soukromého klíče, který se používá v kryptografii eliptických křivek, je hašování odolné proti kolizím pro algoritmy kvantových počítačů obtížnější prolomit.

## Další četba {#further-reading}

- [Počítačový vědec vysvětluje jeden koncept v 5 úrovních obtížnosti | WIRED](https://www.youtube.com/watch?v=fOGdb1CTu5c) – _Wired YouTube kanál_
- [Přehled modelových příkladů využití důkazů s nulovou znalostí](https://pse.dev/projects) — _Tým pro průzkum soukromí a škálování_
- [SNARKs vs. STARKS vs. rekurzivní SNARKs](https://www.alchemy.com/overviews/snarks-vs-starks) — _Alchemy Overviews_
- [Důkaz s nulovou znalostí: Zlepšení soukromí na blockchainu](https://www.altoros.com/blog/zero-knowledge-proof-improving-privacy-for-a-blockchain/) – _Dmitrij Lavrenov_
- [zk-SNARKs — Realistický příklad použití nulových znalostí, který jde do hloubky](https://medium.com/coinmonks/zk-snarks-a-realistic-zero-knowledge-example-and-deep-dive-c5e6eaa7131c) — _Adam Luciano_
- [ZK-STARKs — Vytvořte ověřitelnou důvěru, odolnou dokonce i proti kvantovým počítačům](https://medium.com/coinmonks/zk-starks-create-verifiable-trust-even-against-quantum-computers-dd9c6a2bb13d) — _Adam Luciano_
- [Přibližné úvod k tomu, jak fungují zk-SNARKy](https://vitalik.eth.limo/general/2021/01/26/snarks.html) — _Vitalik Buterin_
- [Co jsou důkazy s nulovou znalostí a jaká je jejich role na blockchainu?](https://www.leewayhertz.com/zero-knowledge-proof-and-blockchain/)— _LeewayHertz_
