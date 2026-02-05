---
title: Důkazy s nulovou znalostí
description: Netechnický úvod do důkazů s nulovou znalostí pro začátečníky.
lang: cs
---

# Co jsou důkazy s nulovou znalostí? {#what-are-zk-proofs}

Důkaz s nulovou znalostí je způsob, jak prokázat platnost tvrzení, aniž by bylo odhaleno samotné tvrzení. „Dokazovatel“ je strana, která se snaží prokázat tvrzení, zatímco „ověřovatel“ je odpovědný za ověření tvrzení.

Důkazy s nulovou znalostí se poprvé objevily v článku z roku 1985 „[The knowledge complexity of interactive proof systems](http://people.csail.mit.edu/silvio/Selected%20Scientific%20Papers/Proof%20Systems/The_Knowledge_Complexity_Of_Interactive_Proof_Systems.pdf)“, který poskytuje definici důkazů s nulovou znalostí, jež se dnes široce používá:

> Protokol s nulovou znalostí je metoda, kterou může jedna strana (dokazovatel) **prokázat** druhé straně (ověřovateli), **že je něco pravdivé, aniž by prozradila jakoukoli jinou informaci** kromě skutečnosti, že toto konkrétní tvrzení je pravdivé.

Důkazy s nulovou znalostí se v průběhu let vylepšovaly a nyní se používají v aplikacích v reálném světě.

<YouTube id="fOGdb1CTu5c" />

## Proč potřebujeme důkazy s nulovou znalostí? {#why-zero-knowledge-proofs-are-important}

Důkazy nulové znalosti představovaly průlom v aplikované kryptografii, protože slibovaly zlepšení bezpečnosti uživatelských informací. Zamyslete se, jak byste mohli prokázat nějaký výrok (např. „Jsem občan země X“) jiné straně (např. poskytovateli služeb). Budete muset poskytnout „důkaz“ na podporu tohoto výroku, jako je cestovní pas nebo řidičský průkaz.

S tímto přístupem se ale pojí různé problémy, především nedostatek soukromí. Informace identifikující osobu (Personally Identifiable Information, PII) sdílené se službami třetích stran jsou uloženy v centrálních databázích, které jsou zranitelné vůči útokům hackerů. Vzhledem k tomu, že krádež identity je kritickým problémem, zvyšují se požadavky na další na ochranu soukromí při sdílení citlivých informací.

Důkazy s nulovou znalostí řeší tento problém **odstraněním potřeby odhalovat informace k prokázání platnosti tvrzení**. Protokol s nulovou znalostí používá výrok (nazývaný „svědek“) jako vstup pro vytvoření stručného důkazu jeho platnosti. Tento důkaz poskytuje záruku, že je prohlášení pravdivé, aniž by odhalil informace použité při jeho vytváření.

Vraťme se k našemu příkladu: Jediný důkaz, který potřebujete k prokázání svého občanství, je důkaz nulové znalosti. Ověřovatel musí pouze zkontrolovat, zda platí určité vlastnosti důkazu, aby se přesvědčil, že platí i základní tvrzení.

## Případy použití důkazů s nulovou znalostí {#use-cases-for-zero-knowledge-proofs}

### Anonymní platby {#anonymous-payments}

Platby kreditní kartou jsou často viditelné pro více stran, včetně poskytovatele plateb, bank a dalších zainteresovaných stran (např. vládních úřadů). Finanční dohled má sice výhody, například v případě odhalování nezákonné činnosti, ale také narušuje soukromí běžných občanů.

Kryptoměny byly vyvinuty jako nástroj pro uskutečňování soukromých peer-to-peer transakcí. Většina transakcí s kryptoměnami je ale otevřeně viditelná na veřejných blockchainech. Identity uživatelů jsou často pseudonymní a buď úmyslně propojeny s identitami v reálném světě (např. uvedením ETH adres na profilech na Twitteru nebo GitHubu), nebo mohou být spojeny s identitami v reálném světě pomocí základní analýzy dat na blockchainu a mimo něj.

Existují specifické „kryptoměny na ochranu soukromí“ určené pro zcela anonymní transakce. Blockchainy zaměřené na soukromí, jako jsou Zcash a Monero, neuvádí podrobnosti o transakci, včetně adres odesílatele/příjemce, typu finančních prostředků, množství a časové osy transakce.

Díky zahrnutí technologie s nulovou znalostí do protokolu umožňují [blockchainové](/glossary/#blockchain) sítě zaměřené na soukromí [uzlům](/glossary/#node) ověřovat transakce, aniž by potřebovaly přístup k transakčním datům. [EIP-7503](https://eips.ethereum.org/EIPS/eip-7503) je příkladem navrženého designu, který umožní nativní soukromé převody hodnoty na blockchainu Etherea. Takové návrhy je však obtížné realizovat kvůli kombinaci bezpečnostních, regulačních a uživatelských obav.

**Důkazy s nulovými znalostmi se také používají při anonymizaci transakcí na veřejných blockchainech**. Příkladem je Tornado Cash, decentralizovaná služba bez třetí strany, která uživatelům umožňuje provádět soukromé transakce na Ethereu. Tornado Cash používá důkazy s nulovou znalostí ke skrytí podrobností o transakcích a k zajištění finančního soukromí. Bohužel, protože se jedná o "opt-in" nástroje ochrany osobních údajů, jsou spojovány s nezákonnou činností. Pro vyřešení tohoto problému je třeba, aby se soukromí stalo výchozím nastavením veřejných blockchainů. Zjistěte více o [soukromí na Ethereu](/privacy/).

### Ochrana identity {#identity-protection}

Většina současných systémů sloužících ke správě identit ohrožuje osobní údaje. Důkazy s nulovou znalostí mohou jednotlivcům pomoci ověřit svoji identitu a zároveň chránit citlivé detaily.

Důkazy s nulovou znalostí jsou obzvláště užitečné v kontextu [decentralizované identity](/decentralized-identity/). Decentralizovaná identita (také popisovaná jako „samostatná identita“) dává jednotlivci možnost převzít kontrolu nad přístupem k osobním údajům. Dobrým příkladem toho, jak technologie s nulovou znalostí umožňuje decentralizovanou identitu, je prokazování občanství bez odhalení údajů o vašem daňovém identifikačním čísle nebo pasu.

<Alert variant="info">
  <AlertEmoji text="💡" />
  <AlertContent>
    <AlertTitle className="mb-2">
      ZKP + identita v akci: Bhútánské národní digitální ID (NDI) na Ethereu
    </AlertTitle>
    <AlertDescription>
      <p>
        Reálným příkladem použití ZKP pro systémy správy identity je systém národního digitálního ID (NDI) Bhútánského království, postavený na Ethereu. Bhútánské NDI používá ZKP, aby občané mohli kryptograficky prokázat fakta o sobě, jako například "Jsem občan" nebo "Je mi více než 18 let", aniž by odhalili citlivé osobní údaje na svém průkazu.
      </p>
      <p>
        Více informací o bhútánském NDI se dozvíte v <a href="/decentralized-identity/#national-and-government-id">případové studii Decentralizovaná identita</a>.
      </p>
    </AlertDescription>
  </AlertContent>
</Alert>

### Důkaz lidství {#proof-of-humanity}

Jedním z nejpoužívanějších příkladů důkazů s nulovou znalostí v praxi je dnes protokol [World ID](https://world.org/blog/world/world-id-faqs), který si lze představit jako „globální digitální pas pro věk umělé inteligence“. Umožňuje lidem prokázat, že jsou jedineční, aniž by odhalili osobní údaje. Toho je dosaženo prostřednictvím zařízení zvaného Orb, které naskenuje duhovku člověka a vygeneruje kód duhovky. Kód duhovky je zkontrolován a ověřen, aby se potvrdilo, že osoba je biologicky jedinečnou lidskou bytostí. Po ověření je na zabezpečený seznam na blockchainu přidán závazek identity vygenerovaný na zařízení uživatele (který není spojen s biometrickými údaji ani z nich odvozen). Kdykoli pak uživatel chce prokázat, že je ověřený člověk – ať už se chce přihlásit, hlasovat nebo provést jiné akce – může vygenerovat důkaz s nulovou znalostí, který potvrdí jeho členství v seznamu. Krása použití důkazu s nulovou znalostí spočívá v tom, že je odhalen pouze jeden výrok: tato osoba je jedinečná. Všechno ostatní zůstává soukromé.

World ID se spoléhá na [protokol Semaphore](https://docs.semaphore.pse.dev/) vyvinutý [týmem PSE](https://pse.dev/) v nadaci Ethereum. Semaphore je navržen jako odlehčený, ale výkonný způsob generování a ověřování důkazů s nulovou znalostí. Umožňuje uživatelům prokázat, že jsou součástí skupiny (v tomto případě ověření lidé), aniž by ukázali, kterým členem skupiny jsou. Semaphore je také vysoce flexibilní a umožňuje vytvářet skupiny na základě široké škály kritérií, jako je ověření identity, účast na událostech nebo vlastnictví pověření.

### Ověřování {#authentication}

Používání online služeb je často podmíněno prokázáním vaší identity a právy na přístup k těmto platformám. To často vyžaduje poskytnutí osobních údajů, jako jsou jména, e-mailové adresy, data narození atd. Možná si také budete muset zapamatovat dlouhá hesla nebo riskovat ztrátu přístupu.

Důkazy s nulovou znalostí mohou zjednodušit ověřování pro platformy i uživatele. Jakmile je vygenerován ZK důkaz pomocí veřejných vstupů (např. z dat potvrzujících členství uživatele na platformě) a soukromých vstupů (např. údajů o uživateli), může jej uživatel jednoduše předložit k ověření své identity. To zlepšuje uživatelskou zkušenost a zbavuje organizace potřeby ukládat obrovské množství uživatelských informací.

### Ověřitelný výpočet {#verifiable-computation}

Ověřitelný výpočet je další aplikací technologie s nulovou znalostí pro zlepšení chodu blockchainu. Umožňuje nám outsourcovat výpočty jinému subjektu a to při zachování ověřitelných výsledků. Subjekt předloží výsledek spolu s dokladem, který ověřuje, že program byl spuštěn správně.

Ověřitelný výpočet je **zásadní pro zlepšení rychlosti zpracování na blockchainech** bez snížení bezpečnosti. Pochopení tohoto principu vyžaduje znalost rozdílů v navrhovaných řešeních pro škálování Etherea.

[Řešení pro škálování na blockchainu](/developers/docs/scaling/#onchain-scaling), jako je sharding, vyžadují rozsáhlé úpravy základní vrstvy blockchainu. Tento přístup je však velmi složitý a chyby v implementaci mohou podkopat bezpečnostní model Etherea.

[Řešení pro škálování mimo blockchain](/developers/docs/scaling/#offchain-scaling) nevyžadují přepracování základního protokolu Etherea. Místo toho se spoléhají na outsourcovaný výpočetní model pro zlepšení propustnosti transakcí na základní vrstvě Etherea.

V praxi to funguje takto:

- Namísto zpracování každé transakce přesune Ethereum její exekuci na samostatný blockchain.

- Po zpracování transakcí vrátí tento blockchain výsledky, které se aplikují do stavu Etherea.

Výhodou je, že Ethereum nemusí provádět žádnou exekuci a potřebuje pouze aplikovat výsledky z outsourcovaných výpočtů na svůj stav. To snižuje zahlcení sítě a také zlepšuje rychlost transakcí (protokoly mimo blockchain se optimalizují pro rychlejší exekuci).

Blockchain potřebuje způsob, jak ověřovat transakce mimo blockchain bez opětovného provádění, jinak dojde ke ztrátě výhody exekuce mimo blockchain.

Zde přichází na řadu ověřitelný výpočet. Když uzel provede transakci mimo Ethereum, předloží důkaz nulové znalosti, aby prokázal správnost exekuce mimo blockchain. Tento důkaz (nazývaný [důkaz platnosti](/glossary/#validity-proof)) zaručuje, že transakce je platná, a umožňuje Ethereu aplikovat výsledek na svůj stav – aniž by čekal, zda ho někdo zpochybní.

[Rollupy s nulovou znalostí](/developers/docs/scaling/zk-rollups) a [validia](/developers/docs/scaling/validium/) jsou dvě řešení škálování mimo blockchain, která používají důkazy platnosti k zajištění bezpečné škálovatelnosti. Tyto protokoly provádějí tisíce transakcí mimo blockchain a předkládají důkazy k ověření na Ethereu. Tyto výsledky lze použít okamžitě po ověření důkazu, což umožňuje Ethereu zpracovat více transakcí bez zvýšení náročnosti výpočtů na základní vrstvě.

### Snížení úplatkářství a tajných dohod při hlasování na blockchainu {#secure-blockchain-voting}

Hlasovací schémata na blockchainu mají spoustu dobrých vlastností: Jsou plně auditovatelná, zabezpečená proti útokům, odolná vůči cenzuře a nemají žádná geografická omezení. Ale ani systémy hlasování na blockchainu nejsou imunní vůči problému **koluze**.

Tajná dohoda, definovaná jako „koordinace za účelem omezení otevřené soutěže klamáním, podváděním a navedením druhých“, může mít podobu nabízení úplatků. Například Alice může dostat úplatek od Boba, aby hlasovala pro `možnost B` na hlasovacím lístku, i když dává přednost `možnosti A`.

Úplatkářství a tajné dohody omezují efektivitu jakéhokoli procesu, který využívá hlasování, ale zejména těch, kde uživatelé mohou prokázat, jak hlasovali. To může mít neblahé důsledky zejména na místech, kde hlasy slouží k přidělování omezených zdrojů.

Například [mechanismy kvadratického financování](https://www.radicalxchange.org/wiki/plural-funding/) se spoléhají na dary k měření preferencí pro určité možnosti mezi různými projekty veřejných statků. Každý dar se počítá jako „hlas“ pro konkrétní projekt, přičemž projekty, které získají více hlasů, získají více prostředků z odpovídající skupiny.

Díky hlasování na blockchainu je kvadratické financování náchylné k tajným dohodám: Blockchainové transakce jsou veřejné, takže úplatkáři mohou kontrolovat aktivitu úplatkáře na blockchainu, protože vidí, jak kdo „hlasoval“. Tímto způsobem kvadratické financování přestává být efektivním prostředkem pro alokaci finančních prostředků na základě preferencí komunity.

Naštěstí novější řešení jako MACI (Minimum Anti-Collusion Infrastructure) používají důkazy s nulovou znalostí, aby bylo hlasování na blockchainu (např. mechanismy kvadratického financování) odolné vůči úplatkům a tajným dohodám. MACI je sada chytrých kontraktů a skriptů, které umožňují centrálnímu správci (nazývanému "koordinátor") shromažďovat hlasy a sčítat výsledky, _aniž by_ odhalovaly podrobnosti o tom, jak jednotlivci hlasovali. I tak je možné ověřit, že hlasy byly řádně sečteny, případně potvrdit, že se konkrétní jednotlivec zúčastnil hlasování.

#### Jak MACI pracuje s důkazy s nulovou znalostí? {#how-maci-works-with-zk-proofs}

Na začátku koordinátor zařadí MACI kontrakt na Ethereum, pté se uživatelé mohou přihlásit k hlasování (registrací svého veřejného klíče do chytrého kontraktu). Uživatelé hlasují zasíláním zpráv zašifrovaných jejich veřejným klíčem do chytrého kontraktu (platný hlas musí být mimo jiné podepsán nejnovějším veřejným klíčem spojeným s identitou uživatele). Poté koordinátor zpracuje všechny zprávy po skončení hlasování, sečte hlasy a ověří výsledky na blockchainu.

V MACI se důkazy s nulovou znalostí používají k zajištění správnosti výpočtu tím, že koordinátorovi znemožní nesprávné zpracování hlasů a sečtení výsledků. Toho je dosaženo tím, že koordinátor musí vygenerovat ZK-SNARK důkazy ověřující, že a) všechny zprávy byly zpracovány správně b) konečný výsledek odpovídá součtu všech _platných_ hlasů.

MACI tedy i bez sdílení podrobností o hlasech uživatelů (jak je tomu obvykle) zaručuje integritu výsledků hlasování. Tato funkce je užitečná při snižování účinnosti základních tajných dohod. Tuto možnost můžeme ilustrovat pomocí předchozího příkladu, kdy Bob podplatil Alici, aby hlasovala pro jím preferovanou možnost:

- Alice se zaregistruje k hlasování zasláním svého veřejného klíče do chytrého kontraktu.
- Alice souhlasí, že bude hlasovat pro `možnost B` výměnou za úplatek od Boba.
- Alice hlasuje pro `možnost B`.
- Alice tajně odešle zašifrovanou transakci, a tím změní veřejný klíč spojený se svou identitou.
- Alice pošle další (zašifrovanou) zprávu do chytrého kontraktu, kde hlasuje pro `možnost A` pomocí nového veřejného klíče.
- Alice ukáže Bobovi transakci, která dokazuje, že hlasovala pro `možnost B` (která je neplatná, protože veřejný klíč již není v systému spojen s Alicinou identitou).
- Při zpracování zpráv koordinátor přeskočí Alicin hlas pro `možnost B` a započítá pouze hlas pro `možnost A`. Proto Bobův pokus manipulovat s hlasováním pomocí tajné dohody s Alicí selže.

Použití MACI _vyžaduje_ důvěru, že koordinátor nebude tajně spolupracovat s úplatkáři ani se nepokusí uplatit samotné voliče. Koordinátor může dešifrovat uživatelské zprávy (nezbytné pro vytvoření důkazu), takže pro něj není problém přesně ověřit, jak kdo hlasoval.

Ale v případech, kdy je koordinátor čestný, MACI představuje mocný nástroj pro zaručení poctivosti hlasování na blockchainu. To vysvětluje jeho popularitu mezi aplikacemi kvadratického financování (např. [clr.fund](https://clr.fund/#/about/maci)), které se silně spoléhají na integritu volebních rozhodnutí každého jednotlivce.

[Zjistěte více o MACI](https://maci.pse.dev/).

## Jak důkazy s nulovou znalostí fungují? {#how-do-zero-knowledge-proofs-work}

Důkaz s nulovou znalostí vám umožňuje prokázat pravdivost tvrzení, aniž byste sdíleli obsah tvrzení nebo odhalili, jak jste pravdu zjistili. Aby to bylo možné, protokoly s nulovou znalostí spoléhají na algoritmy, které berou jistá data jako vstup a vracejí „pravda“ nebo „nepravda“ jako výstup.

Protokol s nulovou znalostí musí splňovat tato kritéria:

1. **Úplnost**: Pokud je vstup platný, protokol s nulovou znalostí vždy vrátí hodnotu „true“. Pokud je tedy základní tvrzení pravdivé a dokazovatel i ověřovatel jednají čestně, je možné důkaz přijmout.

2. **Spolehlivost**: Pokud je vstup neplatný, je teoreticky nemožné přimět protokol s nulovou znalostí, aby vrátil hodnotu „true“. Nepoctivý dokazovatel tedy nemůže oklamat poctivého ověřovatele, nebude schopen ho přesvědčit, že neplatný výrok je platný (s výjimkou zanedbatelné míry pravděpodobnosti).

3. **Nulová znalost**: Ověřovatel se o tvrzení nedozví nic kromě jeho platnosti nebo nepravdivosti (má o tvrzení „nulovou znalost“). Tento požadavek také brání ověřovateli na základě důkazu uhodnout původní vstup (obsah prohlášení).

V základní podobě se důkaz s nulovou znalostí skládá ze tří prvků: **svědek**, **výzva** a **odpověď**.

- **Svědek**: Pomocí důkazu s nulovou znalostí chce dokazovatel prokázat znalost nějaké skryté informace. Tajná informace je „svědkem“ důkazu a předpokládaná znalost svědka ověřovatelem vytváří soubor otázek, na které může odpovědět pouze strana, která tyto informace zná. Dokazovatel tedy zahájí proces dokazování náhodným výběrem otázky, vypočítáním odpovědi a jejím odesláním ověřovateli.

- **Výzva**: Ověřovatel náhodně vybere ze sady další otázku a požádá dokazovatele, aby na ni odpověděl.

- **Odpověď**: Dokazovatel přijme otázku, vypočítá odpověď a vrátí ji ověřovateli. Odpověď dokazovatele umožňuje ověřovateli zkontrolovat, zda má skutečně přístup ke svědkovi. Aby dokazovatel nehádal naslepo a náhodou správné odpovědi neuhodl, vybere ověřovatel více otázek, na které se bude ptát. Mnohonásobným opakováním tohoto postupu výrazně klesá možnost podvodu ze strany dokazovatele. Je proto nutné provést ho několikrát za sebou, dokud není ověřovatel spokojen.

Výše uvedené popisuje strukturu „interaktivního důkazu s nulovou znalostí“. Rané protokoly s nulovou znalostí používaly interaktivní dokazování, kde ověření platnosti prohlášení vyžadovalo zpětnou komunikaci mezi dokazovateli a ověřovateli.

Dobrým příkladem, který ilustruje, jak fungují interaktivní důkazy, je slavný [příběh o jeskyni Ali Baby](https://en.wikipedia.org/wiki/Zero-knowledge_proof#The_Ali_Baba_cave) od Jeana-Jacquese Quisquatera. V příběhu chce Peggy (dokazovatel) dokázat Victorovi (ověřovatel), že zná tajnou frázi, jak otevřít kouzelné dveře, aniž by ji prozradila.

### Neinteraktivní důkazy s nulovou znalostí {#non-interactive-zero-knowledge-proofs}

I když je interaktivní dokazování revoluční, mělo omezenou užitečnost, protože vyžadovalo, aby byly obě strany k dispozici a interagovaly opakovaně. I kdyby byl ověřovatel přesvědčen o poctivosti dokazovatele, důkaz by nebyl k dispozici pro nezávislé ověření (protože výpočet nového důkazu vyžadoval novou sadu zpráv mezi dokazovatelem a ověřovatelem).

K vyřešení tohoto problému navrhli Manuel Blum, Paul Feldman a Silvio Micali první [neinteraktivní důkazy s nulovou znalostí](https://dl.acm.org/doi/10.1145/62212.62222), kde dokazovatel a ověřovatel mají sdílený klíč. To umožňuje dokazovateli prokázat svou znalost některých informací (tj. svědka), aniž by poskytoval informace samotné.

Na rozdíl od interaktivních důkazů vyžadují neinteraktivní důkazy pouze jedno kolo komunikace mezi účastníky (dokazovatelem a ověřovatelem). Dokazovatel předá tajné informace speciálnímu algoritmu pro výpočet důkazu s nulovou znalostí. Tento důkaz je zaslán ověřovateli, který pomocí jiného algoritmu zkontroluje, že dokazovatel zná tajné informace.

Neinteraktivní dokazování omezuje komunikaci mezi dokazovatelem a ověřovatelem, což zefektivňuje proces ověřování. Jakmile je navíc vygenerován důkaz, může ho ověřit kdokoliv (s přístupem ke sdílenému klíči a ověřovacímu algoritmu).

Neinteraktivní důkazy představovaly průlom v technologii nulové znalosti a podnítily vývoj dnes používaných důkazních systémů. Typy těchto důkazů rozebíráme níže:

### Typy důkazů s nulovou znalostí {#types-of-zero-knowledge-proofs}

#### ZK-SNARKs {#zk-snarks}

ZK-SNARK je zkratka pro **Zero-Knowledge Succinct Non-Interactive Argument of Knowledge**. Protokol ZK-SNARK má následující vlastnosti:

- **Nulová znalost**: Ověřovatel může potvrdit integritu tvrzení, aniž by o něm věděl cokoli jiného. Jediné, co ověřovatel o prohlášení ví, je, zda je pravdivé nebo nepravdivé.

- **Stručnost**: Důkaz s nulovou znalostí je menší než svědek a lze jej rychle ověřit.

- **Neinteraktivní**: Důkaz je „neinteraktivní“, protože dokazovatel a ověřovatel spolu komunikují pouze jednou, na rozdíl od interaktivních důkazů, které vyžadují více kol komunikace.

- **Argument**: Důkaz splňuje požadavek na „spolehlivost“, takže podvádění je extrémně nepravděpodobné.

- **(Ze) znalosti**: Důkaz s nulovou znalostí nelze zkonstruovat bez přístupu k tajným informacím (svědkovi). Pro dokazovatele, který nezná svědka, je obtížné, ne-li nemožné, vypočítat platný důkaz s nulovou znalostí.

Výše zmíněný „sdílený klíč“ odkazuje na veřejné parametry, na kterých se dokazovatel a ověřovatel domluví při generování a ověřování důkazů. Generování veřejných parametrů (souhrnně známých jako Common Reference String (CRS)) je citlivá operace, protože je klíčová pro zabezpečení protokolu. Pokud se entropie (náhodnost) použitá při generování CRS dostane do rukou nepoctivého dokazovatele, může vypočítat falešné důkazy.

[Vícečlenný výpočet (MPC)](https://en.wikipedia.org/wiki/Secure_multi-party_computation) je způsob, jak snížit rizika při generování veřejných parametrů. Více stran se účastní [ceremonie důvěryhodného nastavení](https://zkproof.org/2021/06/30/setup-ceremonies/amp/), kde každá osoba přispěje náhodnými hodnotami k vygenerování CRS. Pokud alespoň jeden čestný účastník zničí svou část entropie, protokol ZK-SNARK si zachovává výpočetní spolehlivost.

Důvěryhodná nastavení vyžadují, aby uživatelé důvěřovali účastníkům při generování veřejných parametrů. Vývoj ZK-STARKů však umožnil vznik ověřovacích protokolů, které pracují s nastavením, kterému není třeba důvěřovat.

#### ZK-STARKs {#zk-starks}

ZK-STARK je zkratka pro **Zero-Knowledge Scalable Transparent Argument of Knowledge**. ZK-STARK jsou podobné ZK-SNARK, až na to, že jsou:

- **Škálovatelné**: ZK-STARK je rychlejší než ZK-SNARK při generování a ověřování důkazů, když je velikost svědka větší. S důkazy typu STARK se časy dokazování a ověřování s rostoucím objemem dat svědka jen mírně prodlužují (doby dokazování a ověřování typu SNARK rostou s velikostí svědka lineárně).

- **Transparentní**: ZK-STARK se spoléhá na veřejně ověřitelnou náhodnost pro generování veřejných parametrů pro dokazování a ověřování namísto důvěryhodného nastavení. Jsou tedy ve srovnání se ZK-SNARK transparentnější.

ZK-STARK produkují větší důkazy než ZK-SNARK, což znamená, že mají obecně vyšší ověřovací náklady. Existují však případy (jako je prokazování velkých datových sad), kdy mohou být ZK-STARK cenově výhodnější než ZK-SNARK.

## Nevýhody používání důkazů s nulovou znalostí {#drawbacks-of-using-zero-knowledge-proofs}

### Náklady na hardware {#hardware-costs}

Generování důkazů nulové znalosti zahrnuje velmi složité výpočty, které se nejlépe dělají na specializovaných strojích. Jelikož jsou tyto stroje drahé, jsou často mimo dosah jednotlivců. Navíc aplikace, které by chtěly používat technologii s nulovou znalostí, musí počítat s náklady na hardware – což může zvýšit náklady pro koncové uživatele.

### Náklady na ověření důkazu {#proof-verification-costs}

Ověřování důkazů také vyžaduje složité výpočty a zvyšuje náklady na implementaci technologie s nulovou znalostí v aplikacích. Tyto náklady jsou obzvláště důležité v souvislosti s prokazováním správnosti výpočtů. Např. ZK-rollupy platí asi 500 000 jednotek paliva za ověření jediného důkazu ZK-SNARK na Ethereu, přičemž ZK-STARK vyžadují ještě vyšší poplatky.

### Předpoklady důvěry {#trust-assumptions}

V ZK-SNARK je společný referenční řetězec (veřejné parametry) generován jednou a je zúčastněným stranám k dispozici pro opětovné použití. Veřejné parametry jsou vytvářeny prostřednictvím tzv. důvěryhodného obřadu nastavení, který předpokládá, že účastníci jsou čestní.

Ale ve skutečnosti neexistuje způsob, jak by uživatelé mohli posoudit poctivost všech účastníků. Také musí věřit vývojářům. ZK-STARK jsou bez předpokladu důvěry, protože náhodnost použitá při generování řetězce je veřejně ověřitelná. V současné době výzkumníci pracují na nastaveních pro ZK-SNARK, která také nevyžadují důvěru, aby zvýšili bezpečnost dokazovacích mechanismů.

### Hrozby kvantových počítačů {#quantum-computing-threats}

ZK-SNARK používá pro šifrování kryptografii eliptické křivky. V současnosti se předpokládá, že problém diskrétního logaritmu eliptické křivky je těžko řešitelný, ale vývoj kvantových počítačů by tento bezpečnostní model mohl v budoucnu ohrozit.

ZK-STARK je považován za imunní vůči hrozbě kvantových počítačů, protože pro šifrování používá hashe odolné proti kolizím. Na rozdíl od párů veřejného a privátního klíče, který se používá v kryptografii eliptických křivek, je hašování odolné proti kolizím pro algoritmy kvantových počítačů obtížnější prolomit.

## Další čtení {#further-reading}

- [Přehled případů použití důkazů s nulovou znalostí](https://pse.dev/projects) — _Tým pro zkoumání soukromí a škálování_
- [SNARKy vs. STARKy vs. rekurzivní SNARKy](https://www.alchemy.com/overviews/snarks-vs-starks) — _Alchemy Overviews_
- [Důkaz s nulovou znalostí: Zlepšení soukromí na blockchainu](https://www.altoros.com/blog/zero-knowledge-proof-improving-privacy-for-a-blockchain/) — _Dmitry Lavrenov_
- [zk-SNARKs — Realistický příklad a hluboký ponor do nulové znalosti](https://medium.com/coinmonks/zk-snarks-a-realistic-zero-knowledge-example-and-deep-dive-c5e6eaa7131c) — _Adam Luciano_
- [ZK-STARKy — Vytvořte ověřitelnou důvěru i proti kvantovým počítačům](https://medium.com/coinmonks/zk-starks-create-verifiable-trust-even-against-quantum-computers-dd9c6a2bb13d) — _Adam Luciano_
- [Přibližný úvod do toho, jak jsou zk-SNARKy možné](https://vitalik.eth.limo/general/2021/01/26/snarks.html) — _Vitalik Buterin_
- [Proč jsou důkazy s nulovou znalostí (ZKP) přelomové pro sebe-suverénní identitu](https://frankiefab.hashnode.dev/why-zero-knowledge-proofs-zkps-is-a-game-changer-for-self-sovereign-identity) — _Franklin Ohaegbulam_
- [Vysvětlení EIP-7503: Umožnění soukromých převodů na Ethereu s ZK důkazy](https://research.2077.xyz/eip-7503-zero-knowledge-wormholes-for-private-ethereum-transactions#introduction) — _Emmanuel Awosika_
- [Karetní hra ZK: hra pro naučení základů ZK a reálných případů použití](https://github.com/ZK-card/zk-cards) - _ZK-Cards_
