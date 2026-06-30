---
title: Co jsou důkazy s nulovou znalostí?
metaTitle: Důkazy s nulovou znalostí
description: Netechnický úvod do důkazů s nulovou znalostí pro začátečníky.
lang: cs
---

Důkaz s nulovou znalostí je způsob, jak prokázat platnost tvrzení, aniž by bylo odhaleno samotné tvrzení. „Dokazovatel“ je strana, která se snaží prokázat nárok, zatímco „ověřovatel“ je zodpovědný za ověření tohoto nároku.

Důkazy s nulovou znalostí se poprvé objevily v článku z roku 1985 „[The knowledge complexity of interactive proof systems](http://people.csail.mit.edu/silvio/Selected%20Scientific%20Papers/Proof%20Systems/The_Knowledge_Complexity_Of_Interactive_Proof_Systems.pdf)“, který poskytuje definici důkazů s nulovou znalostí široce používanou dodnes:

> Protokol s nulovým vědomím je metoda, pomocí které může jedna strana (dokazovatel) **prokázat** druhé straně (ověřovateli), **že je něco pravda, aniž by odhalila jakékoli informace** kromě faktu, že toto konkrétní tvrzení je pravdivé.

Důkazy s nulovou znalostí se v průběhu let zdokonalily a nyní se používají v několika aplikacích v reálném světě.

<VideoWatch slug="zero-knowledge-proofs-5-levels" />

## Proč potřebujeme důkazy s nulovou znalostí? {#why-zero-knowledge-proofs-are-important}

Důkazy s nulovou znalostí představovaly průlom v aplikované kryptografii, protože slibovaly zlepšení bezpečnosti informací pro jednotlivce. Představte si, jak byste mohli prokázat nárok (např. „Jsem občanem země X“) jiné straně (např. poskytovateli služeb). K podložení svého nároku byste museli poskytnout „důkaz“, jako je cestovní pas nebo řidičský průkaz.

Tento přístup má však své problémy, především nedostatek soukromí. Osobně identifikovatelné informace (PII) sdílené se službami třetích stran jsou uloženy v centrálních databázích, které jsou zranitelné vůči hackerským útokům. Vzhledem k tomu, že krádeže identity se stávají kritickým problémem, objevuje se volání po způsobech sdílení citlivých informací, které by lépe chránily soukromí.

Důkazy s nulovou znalostí tento problém řeší tím, že **eliminují potřebu odhalovat informace k prokázání platnosti nároků**. Protokol s nulovým vědomím používá tvrzení (nazývané „svědek“) jako vstup k vygenerování stručného důkazu jeho platnosti. Tento důkaz poskytuje silné záruky, že tvrzení je pravdivé, aniž by odhalil informace použité k jeho vytvoření.

Vrátíme-li se k našemu dřívějšímu příkladu, jediným důkazem, který potřebujete k prokázání svého nároku na občanství, je důkaz s nulovou znalostí. Ověřovatel musí pouze zkontrolovat, zda platí určité vlastnosti důkazu, aby se přesvědčil, že platí i základní tvrzení.

## Případy užití pro důkazy s nulovou znalostí {#use-cases-for-zero-knowledge-proofs}

### Anonymní platby {#anonymous-payments}

Platby kreditní kartou jsou často viditelné pro více stran, včetně poskytovatele plateb, bank a dalších zainteresovaných stran (např. vládních úřadů). Ačkoli má finanční dohled výhody pro identifikaci nelegální činnosti, narušuje také soukromí běžných občanů.

Kryptoměny měly uživatelům poskytnout prostředek k provádění soukromých peer-to-peer transakcí. Většina transakcí s kryptoměnami je však veřejně viditelná na veřejných blockchainech. Identity uživatelů jsou často pseudonymní a buď jsou záměrně spojeny s identitami v reálném světě (např. uvedením ETH adres na profilech na Twitteru nebo GitHubu), nebo je lze s identitami v reálném světě spojit pomocí základní analýzy onchain a offchain dat.

Existují specifické „mince zaměřené na soukromí“ (privacy coins) navržené pro zcela anonymní transakce. Blockchainy zaměřené na soukromí, jako jsou Zcash a Monero, skrývají podrobnosti o transakcích, včetně adres odesílatele/příjemce, typu aktiva, množství a časové osy transakce.

Zabudováním technologie s nulovým vědomím do protokolu umožňují [blockchainové](/glossary/#blockchain) sítě zaměřené na soukromí [uzlům](/glossary/#node) validovat transakce bez nutnosti přístupu k transakčním datům. [EIP-7503](https://eips.ethereum.org/EIPS/eip-7503) je příkladem navrhovaného designu, který umožní nativní soukromé převody hodnoty na blockchainu [Ethereum](/). Takové návrhy je však obtížné implementovat kvůli kombinaci obav o bezpečnost, regulaci a uživatelskou zkušenost (UX).  

**Důkazy s nulovou znalostí se také používají k anonymizaci transakcí na veřejných blockchainech**. Příkladem je Tornado Cash, decentralizovaná, nekustodiální služba, která uživatelům umožňuje provádět soukromé transakce na Ethereu. Tornado Cash používá důkazy s nulovou znalostí k zamlžení podrobností o transakcích a zaručení finančního soukromí. Bohužel, protože se jedná o nástroje pro soukromí typu „opt-in“ (na vyžádání), jsou spojovány s nezákonnou činností. Aby se to překonalo, soukromí se nakonec musí stát výchozím nastavením na veřejných blockchainech. Zjistěte více o [soukromí na Ethereu](/privacy/).

### Ochrana identity {#identity-protection}

Současné systémy správy identit vystavují osobní údaje riziku. Důkazy s nulovou znalostí mohou jednotlivcům pomoci ověřit identitu a zároveň chránit citlivé údaje.

Důkazy s nulovou znalostí jsou obzvláště užitečné v kontextu [decentralizované identity (DID)](/decentralized-identity/). Decentralizovaná identita (DID) (také označovaná jako „sebeurčující identita“) dává jednotlivci možnost kontrolovat přístup k osobním identifikátorům. Prokázání vašeho občanství bez odhalení vašeho daňového identifikačního čísla nebo údajů z pasu je dobrým příkladem toho, jak technologie s nulovým vědomím umožňuje decentralizovanou identitu.

<Alert variant="info">
  <AlertEmoji text="💡" />
  <AlertContent>
    <AlertTitle className="mb-2">
      ZKP + identita v praxi: Bhútánské národní digitální ID (NDI) na Ethereu
    </AlertTitle>
    <AlertDescription>
      <p>
        Příkladem z reálného světa, kde se ZKP používá pro systémy správy identit, je systém národního digitálního ID (NDI) Bhútánského království, postavený na Ethereu. Bhútánské NDI využívá ZKP k tomu, aby občanům umožnilo kryptograficky prokázat fakta o sobě, jako například „Jsem občan“ nebo „Je mi více než 18 let“, aniž by odhalili citlivé osobní údaje na svém průkazu totožnosti.
      </p>
      <p>
        Zjistěte více o bhútánském NDI v <a href="/decentralized-identity/#national-and-government-id">případové studii o decentralizované identitě</a>.
      </p>
    </AlertDescription>
  </AlertContent>
</Alert>

### Důkaz lidskosti (Proof of Humanity) {#proof-of-humanity}

Jedním z nejrozšířenějších příkladů důkazů s nulovou znalostí v praxi je dnes [protokol World ID](https://world.org/blog/world/world-id-faqs), který lze považovat za „globální digitální pas pro věk umělé inteligence“. Umožňuje lidem prokázat, že jsou jedinečnými jednotlivci, aniž by odhalili osobní údaje. Toho je dosaženo prostřednictvím zařízení zvaného Orb, které naskenuje duhovku osoby a vygeneruje kód duhovky. Kód duhovky je zkontrolován a ověřen, aby se potvrdilo, že daná osoba je biologicky jedinečná lidská bytost. Po ověření je závazek identity vygenerovaný na zařízení uživatele (a nespojený s biometrickými údaji ani z nich neodvozený) přidán do zabezpečeného seznamu na blockchainu. Poté, kdykoli chce uživatel prokázat, že je ověřeným člověkem – ať už kvůli přihlášení, odevzdání hlasu nebo jiným akcím – může vygenerovat důkaz s nulovou znalostí, který potvrdí jeho členství v seznamu. Kouzlo použití důkazu s nulovou znalostí spočívá v tom, že je odhaleno pouze jedno tvrzení: tato osoba je jedinečná. Vše ostatní zůstává v soukromí.

World ID spoléhá na [protokol Semaphore](https://docs.semaphore.pse.dev/) vyvinutý [týmem PSE](https://pse.dev/) v Nadaci Ethereum. Semaphore je navržen jako odlehčený, ale výkonný způsob generování a ověřování důkazů s nulovou znalostí. Umožňuje uživatelům prokázat, že jsou součástí skupiny (v tomto případě ověřených lidí), aniž by ukázali, kterým členem skupiny jsou. Semaphore je také vysoce flexibilní a umožňuje vytvářet skupiny na základě široké škály kritérií, jako je ověření identity, účast na událostech nebo vlastnictví pověření.

### Autentizace {#authentication}

Používání online služeb vyžaduje prokázání vaší identity a práva na přístup k těmto platformám. To často vyžaduje poskytnutí osobních údajů, jako jsou jména, e-mailové adresy, data narození a podobně. Možná si také budete muset pamatovat dlouhá hesla, jinak riskujete ztrátu přístupu.

Důkazy s nulovou znalostí však mohou zjednodušit autentizaci jak pro platformy, tak pro uživatele. Jakmile je vygenerován ZK důkaz pomocí veřejných vstupů (např. dat potvrzujících členství uživatele na platformě) a soukromých vstupů (např. údajů uživatele), uživatel jej může jednoduše předložit k ověření své identity, když potřebuje získat přístup ke službě. To zlepšuje uživatelskou zkušenost a osvobozuje organizace od nutnosti ukládat obrovské množství informací o uživatelích.

### Ověřitelné výpočty {#verifiable-computation}

Ověřitelné výpočty jsou další aplikací technologie s nulovým vědomím pro vylepšení návrhů blockchainu. Ověřitelné výpočty nám umožňují outsourcovat výpočty na jiný subjekt při zachování ověřitelných výsledků. Subjekt předloží výsledek spolu s důkazem ověřujícím, že program byl spuštěn správně.

Ověřitelné výpočty jsou **klíčové pro zlepšení rychlosti zpracování na blockchainech** bez snížení bezpečnosti. Pochopení tohoto konceptu vyžaduje znalost rozdílů v navrhovaných řešeních pro škálování Etherea.

[Onchain řešení škálování](/developers/docs/scaling/#onchain-scaling), jako je sharding, vyžadují rozsáhlé úpravy základní vrstvy blockchainu. Tento přístup je však vysoce komplexní a chyby v implementaci mohou narušit bezpečnostní model Etherea.

[Offchain řešení škálování](/developers/docs/scaling/#offchain-scaling) nevyžadují přepracování základního protokolu Etherea. Místo toho spoléhají na model outsourcovaných výpočtů ke zlepšení propustnosti na základní vrstvě Etherea.

Zde je ukázka, jak to funguje v praxi:

- Místo zpracování každé transakce Ethereum přesouvá provádění na samostatný řetězec.

- Po zpracování transakcí druhý řetězec vrátí výsledky, které se aplikují na stav Etherea.

Výhodou je, že Ethereum nemusí provádět žádné výpočty a stačí mu pouze aplikovat výsledky z outsourcovaných výpočtů na svůj stav. To snižuje přetížení sítě a také zlepšuje rychlost transakcí (offchain protokoly jsou optimalizovány pro rychlejší provádění).

Řetězec potřebuje způsob, jak validovat offchain transakce bez jejich opětovného provádění, jinak se hodnota offchain provádění ztratí.

Zde přicházejí na řadu ověřitelné výpočty. Když uzel provede transakci mimo Ethereum, předloží důkaz s nulovou znalostí, aby prokázal správnost offchain provedení. Tento důkaz (nazývaný [důkaz platnosti](/glossary/#validity-proof)) zaručuje, že transakce je platná, což Ethereu umožňuje aplikovat výsledek na svůj stav – aniž by muselo čekat, až jej někdo zpochybní.

[Zero-knowledge rollupy](/developers/docs/scaling/zk-rollups) a [validia](/developers/docs/scaling/validium/) jsou dvě offchain řešení škálování, která používají důkazy platnosti k zajištění bezpečné škálovatelnosti. Tyto protokoly provádějí tisíce transakcí offchain a předkládají důkazy k ověření na Ethereu. Tyto výsledky lze aplikovat okamžitě po ověření důkazu, což Ethereu umožňuje zpracovat více transakcí bez zvýšení výpočetní zátěže na základní vrstvě.

Kromě škálování na vrstvě 2 (l2) mohou důkazy s nulovou znalostí také ověřovat samotné provádění bloků na vrstvě 1 (l1) Etherea. [zkEVM pro ověřování na l1](/roadmap/zkevm/) by validátorům umožnilo ověřovat bloky kontrolou důkazu namísto opětovného provádění všech transakcí – což by umožnilo vyšší limity gasu bez zvýšení hardwarových požadavků na validátory.

### Snížení úplatkářství a tajných dohod při onchain hlasování {#secure-blockchain-voting}

Schémata hlasování na blockchainu mají mnoho příznivých vlastností: jsou plně auditovatelná, bezpečná proti útokům, odolná vůči cenzuře a bez geografických omezení. Ale ani onchain hlasovací schémata nejsou imunní vůči problému **tajných dohod (koluzí)**.

Tajná dohoda, definovaná jako „koordinace za účelem omezení otevřené soutěže klamáním, podváděním a zaváděním ostatních“, může mít podobu zlomyslného aktéra, který ovlivňuje hlasování nabízením úplatků. Například Alice může obdržet úplatek od Boba, aby na hlasovacím lístku dala hlas pro `option B`, i když preferuje `option A`.

Úplatkářství a tajné dohody omezují efektivitu jakéhokoli procesu, který používá hlasování jako signalizační mechanismus (zejména tam, kde uživatelé mohou prokázat, jak hlasovali). To může mít značné důsledky, zejména tam, kde jsou hlasy zodpovědné za alokaci vzácných zdrojů.

Například [mechanismy kvadratického financování](https://www.radicalxchange.org/wiki/plural-funding/) spoléhají na dary k měření preferencí pro určité možnosti mezi různými projekty veřejných statků. Každý dar se počítá jako „hlas“ pro konkrétní projekt, přičemž projekty, které obdrží více hlasů, získají více prostředků ze sdíleného fondu (matching pool).

Použití onchain hlasování činí kvadratické financování náchylným k tajným dohodám: blockchainové transakce jsou veřejné, takže ten, kdo uplácí, může zkontrolovat onchain aktivitu podplaceného, aby viděl, jak „hlasoval“. Tímto způsobem přestává být kvadratické financování efektivním prostředkem pro alokaci finančních prostředků na základě agregovaných preferencí komunity.

Naštěstí novější řešení, jako je MACI (Minimum Anti-Collusion Infrastructure), používají důkazy s nulovou znalostí k tomu, aby onchain hlasování (např. mechanismy kvadratického financování) bylo odolné vůči úplatkářství a tajným dohodám. MACI je sada chytrých kontraktů a skriptů, které umožňují centrálnímu správci (nazývanému „koordinátor“) agregovat hlasy a sčítat výsledky, _aniž by_ odhalil podrobnosti o tom, jak každý jednotlivec hlasoval. I tak je stále možné ověřit, že hlasy byly sečteny správně, nebo potvrdit, že se konkrétní jednotlivec zúčastnil kola hlasování.

#### Jak MACI funguje s důkazy s nulovou znalostí? {#how-maci-works-with-zk-proofs}

Na začátku koordinátor nasadí kontrakt MACI na Ethereu, načež se uživatelé mohou přihlásit k hlasování (registrací svého veřejného klíče v chytrém kontraktu). Uživatelé odevzdávají hlasy zasíláním zpráv zašifrovaných svým veřejným klíčem do chytrého kontraktu (platný hlas musí být mimo jiné podepsán nejnovějším veřejným klíčem spojeným s identitou uživatele). Poté, jakmile skončí období hlasování, koordinátor zpracuje všechny zprávy, sečte hlasy a ověří výsledky onchain.

V MACI se důkazy s nulovou znalostí používají k zajištění správnosti výpočtů tím, že znemožňují koordinátorovi nesprávně zpracovat hlasy a sečíst výsledky. Toho je dosaženo tím, že se od koordinátora vyžaduje vygenerování ZK-SNARK důkazů ověřujících, že a) všechny zprávy byly zpracovány správně b) konečný výsledek odpovídá součtu všech _platných_ hlasů.

Tudíž i bez sdílení rozpisu hlasů na uživatele (jak tomu obvykle bývá) MACI zaručuje integritu výsledků vypočítaných během procesu sčítání. Tato funkce je užitečná při snižování efektivity základních schémat tajných dohod. Tuto možnost můžeme prozkoumat na předchozím příkladu, kdy Bob podplatí Alici, aby hlasovala pro určitou možnost:

- Alice se zaregistruje k hlasování odesláním svého veřejného klíče do chytrého kontraktu.
- Alice souhlasí, že bude hlasovat pro `option B` výměnou za úplatek od Boba.
- Alice hlasuje pro `option B`.
- Alice tajně odešle zašifrovanou transakci, aby změnila veřejný klíč spojený s její identitou.
- Alice odešle další (zašifrovanou) zprávu do chytrého kontraktu, ve které hlasuje pro `option A` pomocí nového veřejného klíče.
- Alice ukáže Bobovi transakci, která ukazuje, že hlasovala pro `option B` (což je neplatné, protože veřejný klíč již není v systému spojen s identitou Alice).
- Při zpracování zpráv koordinátor přeskočí hlas Alice pro `option B` a započítá pouze hlas pro `option A`. Bobův pokus o tajnou dohodu s Alicí a manipulaci s onchain hlasováním tak selže.

Použití MACI _vyžaduje_ důvěru v koordinátora, že se tajně nedohodne s těmi, kdo uplácejí, nebo se sám nepokusí podplatit voliče. Koordinátor může dešifrovat zprávy uživatelů (což je nezbytné pro vytvoření důkazu), takže může přesně ověřit, jak každá osoba hlasovala.

Ale v případech, kdy koordinátor zůstává čestný, představuje MACI mocný nástroj pro zaručení nedotknutelnosti onchain hlasování. To vysvětluje jeho popularitu mezi aplikacemi kvadratického financování (např. [clr.fund](https://clr.fund/#/about/maci)), které silně spoléhají na integritu hlasovacích rozhodnutí každého jednotlivce.

[Zjistěte více o MACI](https://maci.pse.dev/).

## Jak fungují důkazy s nulovou znalostí? {#how-do-zero-knowledge-proofs-work}

Důkaz s nulovou znalostí vám umožňuje prokázat pravdivost tvrzení, aniž byste sdíleli obsah tvrzení nebo odhalili, jak jste pravdu zjistili. Aby to bylo možné, protokoly s nulovým vědomím spoléhají na algoritmy, které přijmou nějaká data jako vstup a vrátí „pravda“ (true) nebo „nepravda“ (false) jako výstup.

Protokol s nulovým vědomím musí splňovat následující kritéria:

1. **Úplnost (Completeness)**: Pokud je vstup platný, protokol s nulovým vědomím vždy vrátí „pravda“. Pokud je tedy základní tvrzení pravdivé a dokazovatel i ověřovatel jednají čestně, důkaz může být přijat.

2. **Korektnost (Soundness)**: Pokud je vstup neplatný, je teoreticky nemožné oklamat protokol s nulovým vědomím, aby vrátil „pravda“. Lhající dokazovatel tedy nemůže oklamat čestného ověřovatele, aby uvěřil, že neplatné tvrzení je platné (s výjimkou nepatrné pravděpodobnosti).

3. **Nulové vědomí (Zero-knowledge)**: Ověřovatel se o tvrzení nedozví nic jiného než jeho platnost nebo neplatnost (má o tvrzení „nulové vědomí“). Tento požadavek také brání ověřovateli odvodit z důkazu původní vstup (obsah tvrzení).

V základní podobě se důkaz s nulovou znalostí skládá ze tří prvků: **svědek (witness)**, **výzva (challenge)** a **odpověď (response)**.

- **Svědek**: Pomocí důkazu s nulovou znalostí chce dokazovatel prokázat znalost nějaké skryté informace. Tajná informace je „svědkem“ důkazu a předpokládaná znalost svědka dokazovatelem vytváří sadu otázek, na které může odpovědět pouze strana se znalostí této informace. Dokazovatel tedy zahájí proces dokazování tím, že náhodně vybere otázku, vypočítá odpověď a odešle ji ověřovateli.

- **Výzva**: Ověřovatel náhodně vybere další otázku ze sady a požádá dokazovatele, aby na ni odpověděl.

- **Odpověď**: Dokazovatel přijme otázku, vypočítá odpověď a vrátí ji ověřovateli. Odpověď dokazovatele umožňuje ověřovateli zkontrolovat, zda má dokazovatel skutečně přístup ke svědkovi. Aby se zajistilo, že dokazovatel neuhodl naslepo a nezískal správné odpovědi náhodou, vybere ověřovatel další otázky. Opakováním této interakce mnohokrát se možnost, že dokazovatel předstírá znalost svědka, výrazně snižuje, dokud není ověřovatel spokojen.

Výše uvedené popisuje strukturu „interaktivního důkazu s nulovou znalostí“. Rané protokoly s nulovým vědomím používaly interaktivní dokazování, kde ověření platnosti tvrzení vyžadovalo obousměrnou komunikaci mezi dokazovateli a ověřovateli.

Dobrým příkladem, který ilustruje, jak fungují interaktivní důkazy, je slavný [příběh o jeskyni Ali Baby](https://en.wikipedia.org/wiki/Zero-knowledge_proof#The_Ali_Baba_cave) od Jean-Jacquese Quisquatera. V příběhu chce Peggy (dokazovatel) dokázat Victorovi (ověřovateli), že zná tajnou frázi k otevření magických dveří, aniž by tuto frázi odhalila.

### Neinteraktivní důkazy s nulovou znalostí {#non-interactive-zero-knowledge-proofs}

Ačkoli bylo interaktivní dokazování revoluční, mělo omezenou užitečnost, protože vyžadovalo, aby obě strany byly k dispozici a opakovaně spolu interagovaly. I kdyby byl ověřovatel přesvědčen o poctivosti dokazovatele, důkaz by nebyl k dispozici pro nezávislé ověření (výpočet nového důkazu vyžadoval novou sadu zpráv mezi dokazovatelem a ověřovatelem).

K vyřešení tohoto problému navrhli Manuel Blum, Paul Feldman a Silvio Micali první [neinteraktivní důkazy s nulovou znalostí](https://dl.acm.org/doi/10.1145/62212.62222), kde mají dokazovatel a ověřovatel sdílený klíč. To umožňuje dokazovateli demonstrovat svou znalost nějaké informace (tj. svědka), aniž by poskytl samotnou informaci.

Na rozdíl od interaktivních důkazů vyžadovaly neinteraktivní důkazy pouze jedno kolo komunikace mezi účastníky (dokazovatelem a ověřovatelem). Dokazovatel předá tajnou informaci speciálnímu algoritmu k výpočtu důkazu s nulovou znalostí. Tento důkaz je odeslán ověřovateli, který pomocí jiného algoritmu zkontroluje, zda dokazovatel zná tajnou informaci.

Neinteraktivní dokazování snižuje komunikaci mezi dokazovatelem a ověřovatelem, díky čemuž jsou ZK důkazy efektivnější. Navíc, jakmile je důkaz vygenerován, je k dispozici komukoli jinému (s přístupem ke sdílenému klíči a ověřovacímu algoritmu) k ověření.

Neinteraktivní důkazy představovaly průlom pro technologii s nulovým vědomím a podnítily vývoj dokazovacích systémů používaných dodnes. O těchto typech důkazů pojednáváme níže:

### Typy důkazů s nulovou znalostí {#types-of-zero-knowledge-proofs}

#### ZK-SNARKs {#zk-snarks}

ZK-SNARK je zkratka pro **Zero-Knowledge Succinct Non-Interactive Argument of Knowledge** (Stručný neinteraktivní argument znalosti s nulovým vědomím). Protokol ZK-SNARK má následující vlastnosti:

- **Nulové vědomí (Zero-knowledge)**: Ověřovatel může validovat integritu tvrzení, aniž by o tvrzení věděl cokoli dalšího. Jediná znalost, kterou má ověřovatel o tvrzení, je, zda je pravdivé nebo nepravdivé.

- **Stručný (Succinct)**: Důkaz s nulovou znalostí je menší než svědek a lze jej rychle ověřit.

- **Neinteraktivní (Non-interactive)**: Důkaz je „neinteraktivní“, protože dokazovatel a ověřovatel spolu interagují pouze jednou, na rozdíl od interaktivních důkazů, které vyžadují více kol komunikace.

- **Argument**: Důkaz splňuje požadavek „korektnosti“, takže podvádění je extrémně nepravděpodobné.

- **Znalosti (Of Knowledge)**: Důkaz s nulovou znalostí nelze zkonstruovat bez přístupu k tajné informaci (svědkovi). Pro dokazovatele, který nemá svědka, je obtížné, ne-li nemožné, vypočítat platný důkaz s nulovou znalostí.

Dříve zmíněný „sdílený klíč“ odkazuje na veřejné parametry, na kterých se dokazovatel a ověřovatel dohodnou, že je budou používat při generování a ověřování důkazů. Generování veřejných parametrů (souhrnně známých jako Common Reference String (CRS)) je citlivá operace kvůli jejímu významu pro bezpečnost protokolu. Pokud se entropie (náhodnost) použitá při generování CRS dostane do rukou nepoctivého dokazovatele, může vypočítat falešné důkazy.

[Vícestranné výpočty (MPC)](https://en.wikipedia.org/wiki/Secure_multi-party_computation) jsou způsobem, jak snížit rizika při generování veřejných parametrů. Více stran se účastní [ceremonie důvěryhodného nastavení](https://zkproof.org/2021/06/30/setup-ceremonies/amp/), kde každá osoba přispívá nějakými náhodnými hodnotami k vygenerování CRS. Dokud alespoň jedna čestná strana zničí svou část entropie, protokol ZK-SNARK si zachovává výpočetní korektnost.

Důvěryhodná nastavení vyžadují, aby uživatelé důvěřovali účastníkům při generování parametrů. Vývoj ZK-STARKů však umožnil dokazovací protokoly, které fungují s nedůvěryhodným nastavením.

#### ZK-STARKs {#zk-starks}

ZK-STARK je zkratka pro **Zero-Knowledge Scalable Transparent Argument of Knowledge** (Škálovatelný transparentní argument znalosti s nulovým vědomím). ZK-STARKy jsou podobné ZK-SNARKům, s tím rozdílem, že jsou:

- **Škálovatelné (Scalable)**: ZK-STARK je rychlejší než ZK-SNARK při generování a ověřování důkazů, když je velikost svědka větší. U STARK důkazů se časy dokazovatele a ověření s rostoucím svědkem zvyšují jen nepatrně (časy dokazovatele a ověřovatele u SNARKů rostou lineárně s velikostí svědka).

- **Transparentní (Transparent)**: ZK-STARK spoléhá na veřejně ověřitelnou náhodnost ke generování veřejných parametrů pro dokazování a ověřování namísto důvěryhodného nastavení. Jsou tedy transparentnější ve srovnání se ZK-SNARKy.

ZK-STARKy produkují větší důkazy než ZK-SNARKy, což znamená, že mají obecně vyšší režii na ověřování. Existují však případy (jako je dokazování velkých datových sad), kdy mohou být ZK-STARKy nákladově efektivnější než ZK-SNARKy.

## Nevýhody používání důkazů s nulovou znalostí {#drawbacks-of-using-zero-knowledge-proofs}

### Náklady na hardware {#hardware-costs}

Generování důkazů s nulovou znalostí zahrnuje velmi složité výpočty, které se nejlépe provádějí na specializovaných strojích. Vzhledem k tomu, že tyto stroje jsou drahé, jsou často mimo dosah běžných jednotlivců. Kromě toho aplikace, které chtějí používat technologii s nulovým vědomím, musí zohlednit náklady na hardware – což může zvýšit náklady pro koncové uživatele.

### Náklady na ověření důkazu {#proof-verification-costs}

Ověřování důkazů také vyžaduje složité výpočty a zvyšuje náklady na implementaci technologie s nulovým vědomím v aplikacích. Tyto náklady jsou obzvláště relevantní v kontextu dokazování výpočtů. Například ZK-rollupy platí ~ 500 000 gasu za ověření jediného ZK-SNARK důkazu na Ethereu, přičemž ZK-STARKy vyžadují ještě vyšší poplatky.

### Předpoklady důvěry {#trust-assumptions}

V ZK-SNARKu je Common Reference String (veřejné parametry) vygenerován jednou a je k dispozici pro opakované použití stranám, které se chtějí účastnit protokolu s nulovým vědomím. Veřejné parametry jsou vytvářeny prostřednictvím ceremonie důvěryhodného nastavení, kde se předpokládá, že účastníci jsou čestní.

Uživatelé však ve skutečnosti nemají žádný způsob, jak posoudit poctivost účastníků, a musí vzít vývojáře za slovo. ZK-STARKy jsou bez předpokladů důvěry, protože náhodnost použitá při generování řetězce je veřejně ověřitelná. Mezitím výzkumníci pracují na nedůvěryhodných nastaveních pro ZK-SNARKy, aby zvýšili bezpečnost dokazovacích mechanismů.

### Hrozby kvantových počítačů {#quantum-computing-threats}

ZK-SNARK používá k šifrování kryptografii eliptických křivek. Ačkoli se problém diskrétního logaritmu eliptické křivky zatím považuje za neřešitelný, vývoj kvantových počítačů by mohl tento bezpečnostní model v budoucnu prolomit.

ZK-STARK je považován za imunní vůči hrozbě kvantových počítačů, protože pro svou bezpečnost spoléhá pouze na hashovací funkce odolné proti kolizím. Na rozdíl od párů veřejného a soukromého klíče používaných v kryptografii eliptických křivek je hashování odolné proti kolizím pro algoritmy kvantových počítačů obtížnější prolomit.

## Další čtení {#further-reading}

- [Přehled případů užití pro důkazy s nulovou znalostí](https://pse.dev/projects) — _Tým Privacy and Scaling Explorations_
- [SNARKy vs. STARKy vs. Rekurzivní SNARKy](https://www.alchemy.com/overviews/snarks-vs-starks) — _Alchemy Overviews_
- [Důkaz s nulovou znalostí: Zlepšení soukromí na blockchainu](https://www.altoros.com/blog/zero-knowledge-proof-improving-privacy-for-a-blockchain/) — _Dmitry Lavrenov_
- [zk-SNARKy — Realistický příklad nulového vědomí a hluboký ponor](https://medium.com/coinmonks/zk-snarks-a-realistic-zero-knowledge-example-and-deep-dive-c5e6eaa7131c) — _Adam Luciano_
- [ZK-STARKy — Vytvořte ověřitelnou důvěru, a to i proti kvantovým počítačům](https://medium.com/coinmonks/zk-starks-create-verifiable-trust-even-against-quantum-computers-dd9c6a2bb13d) — _Adam Luciano_
- [Přibližný úvod do toho, jak jsou zk-SNARKy možné](https://vitalik.eth.limo/general/2021/01/26/snarks.html) — _Vitalik Buterin_
- [Proč jsou důkazy s nulovou znalostí (ZKP) přelomové pro sebeurčující identitu](https://frankiefab.hashnode.dev/why-zero-knowledge-proofs-zkps-is-a-game-changer-for-self-sovereign-identity) — _Franklin Ohaegbulam_
- [Vysvětlení EIP-7503: Umožnění soukromých převodů na Ethereu pomocí ZK důkazů](https://web.archive.org/web/20251116093505/https://research.2077.xyz/eip-7503-zero-knowledge-wormholes-for-private-ethereum-transactions/) — _Emmanuel Awosika_
- [Karetní hra ZK: hra pro naučení základů ZK a případů užití v reálném životě](https://github.com/ZK-card/zk-cards) - _ZK-Cards_
