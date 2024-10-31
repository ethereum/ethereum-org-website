---
title: Dôkaz nulovou znalosťou
description: Netechnický úvod do dôkazov s nulovou znalosťou pre začiatočníkov.
lang: sk
---

# Čo sú dôkazy s nulovou znalosťou? {#what-are-zk-proofs}

Dôkaz s nulovou znalosťou je spôsob, ako preukázať platnosť tvrdenia bez toho, aby bolo odhalené samotné tvrdenie. „Dokazovateľ“ je strana, ktorá sa snaží preukázať tvrdenie, zatiaľ čo „overovateľ“ je zodpovedný za overenie tvrdenia.

Dôkazy s nulovou znalosťou sa prvýkrát objavili v dokumente z roku 1985 s názvom „[Znalostná komplexita interaktívnych dôkazných systémov](http://people.csail.mit.edu/silvio/Selected%20Scientific%20Papers/Proof%20Systems/The_Knowledge_Complexity_Of_Interactive_Proof_Systems.pdf)“. Ten poskytuje definíciu dôkazov s nulovými znalosťami, ktorá sa dnes používa najviac:

> Protokol s nulovou znalosťou je metóda, pomocou ktorej jedna strana (dokazovateľ) **môže preukázať** druhej strane (overovateľovi), **že je niečo pravdivé bez toho, aby prezradila akékoľvek informácie** okrem skutočnosti, že toto konkrétne tvrdenie je pravdivé.

Dôkazy s nulovou znalosťou sa v priebehu rokov vylepšovali a teraz sa používajú v aplikáciách v reálnom svete.

<YouTube id="fOGdb1CTu5c" />

## Prečo potrebujeme dôkazy s nulovou znalosťou? {#why-zero-knowledge-proofs-are-important}

Dôkazy s nulovou znalosťou predstavovali prielom v aplikovanej kryptografii, pretože sľubovali zlepšenie bezpečnosti užívateľských informácií. Zamyslite sa, ako by ste mohli preukázať nejaký výrok (napr. „som občan zeme X“) inej strane (napr. poskytovateľovi služieb). Budete musieť poskytnúť „dôkaz“ na podporu tohto výroku, ako je cestovný pas alebo vodičský preukaz.

Tento prístup však prináša problémy, najmä nedostatok súkromia. Osobne identifikovateľné informácie (PII) zdieľané službami tretích strán sú uložené v centrálnych databázách, ktoré sú zraniteľné proti útokom hackerov. Krádeže identity sa stávajú kritickým problémom, a preto sa objavujú výzvy na vytvorenie prostriedkov na ochranu súkromia pri zdieľaní citlivých informácií.

Dôkazy s nulovou znalosťou riešia tento problém tým, že **odstraňujú potrebu odhaľovať citlivé informácie na účely preukázania platnosti tvrdenia**. Protokol s nulovou znalosťou používa výrok (nazývaný „svedok“) ako vstup pre vytvorenie stručného dôkazu jeho platnosti. Tento dôkaz poskytuje záruku, že vyhlásenie je pravdivé bez toho, aby odhalil informácie použité pri jeho vytváraní.

Vráťme sa k nášmu príkladu – jediný dôkaz, ktorý potrebujete na preukázanie svojho občianstva, je dôkaz s nulovou znalosťou. Overovateľ musí iba skontrolovať, či platia určité vlastnosti dôkazu, aby sa presvedčil, že platí aj základné tvrdenie.

## Ukážkové prípady použitia dôkazov s nulovou znalosťou {#use-cases-for-zero-knowledge-proofs}

### Anonymné platby {#anonymous-payments}

Platby kreditnou kartou sú často viditeľné pre viac strán, vrátane poskytovateľa platieb, bánk a ďalších zainteresovaných strán (napr. vládnych úradov). Finančný dohľad má síce výhody, napríklad v prípade odhaľovania nezákonnej činnosti, ale tiež narúša súkromie bežných občanov.

Kryptomeny boli vyvinuté ako nástroj na uskutočňovanie súkromných peer-to-peer transakcií. Väčšina transakcií s kryptomenami je však otvorene viditeľná na verejných blockchainoch. Identity užívateľov sú často pseudonymné a buď zámerne prepojené s identitami v reálnom svete (napr. zahrnutím ethereovských adries na profily Twitter alebo GitHub), alebo môžu byť spojené s identitami v reálnom svete pomocou dátovej analýzy aktivity užívateľa.

Existujú špecifické „kryptomeny na ochranu súkromia“ určené pre úplne anonymné transakcie. Blockchainy zamerané na súkromie, ako sú Zcash a Monero, neuvádzajú podrobnosti o transakcii, vrátane adries odosielateľa/príjemcu, typu finančných prostriedkov, množstva a časovej osi transakcie.

Vďaka zahrnutiu technológie nulovej znalosti umožňujú [blockchainové](/glossary/#blockchain) siete, ktoré sa zameriavajú na súkromie, umožňujú [uzlom](/glossary/#node) overovať transakcie bez nutnosti prístupu k dátam transakcií.

**Dôkazy s nulovými znalosťami sa tiež používajú pri anonymizácii transakcií na verejných blockchainoch**. Príkladom je Tornado Cash, decentralizovaná služba bez tretej strany, ktorá používateľom umožňuje vykonávať súkromné ​​transakcie na Ethereu. Tornado Cash používa dôkazy s nulovou znalosťou na skrytie podrobností o transakciách a na zabezpečenie finančného súkromia. Bohužiaľ, pretože sa jedná o „opt-in“ nástroje ochrany osobných údajov, sú spájané s nezákonnou činnosťou. Na vyriešenie tohto problému je potrebné, aby sa súkromie stalo východiskovým nastavením verejných blockchainov.

### Ochrana identity {#identity-protection}

Väčšina súčasných systémov slúžiacich na správu identít ohrozuje osobné údaje. Dôkazy s nulovou znalosťou môžu jednotlivcom pomôcť overiť svoju identitu a zároveň chrániť citlivé detaily.

Dôkazy s nulovou znalosťou sú obzvlášť užitočné v kontexte [decentralizovanej identity](/decentralized-identity/). Decentralizovaná identita (tiež popisovaná ako „samostatná identita“) dáva jednotlivcovi možnosť prevziať kontrolu nad prístupom k osobným údajom. Dobrým príkladom toho, ako technológia s nulovou znalosťou umožňuje decentralizovanú identitu, je preukazovanie občianstva bez odhalenia údajov o vašom daňovom identifikačnom čísle alebo pase.

### Overenie {#authentication}

Používanie online služieb je často podmienené preukázaním vašej identity a právami na prístup k týmto platformám. To často vyžaduje poskytnutie osobných údajov, ako sú mená, e-mailové adresy, dátumy narodenia atď. Možno si tiež budete musieť zapamätať dlhé heslá alebo riskovať stratu prístupu.

Dôkazy s nulovou znalosťou môžu zjednodušiť overovanie pre platformy aj užívateľov. Akonáhle je vygenerovaný ZK dôkaz pomocou verejných vstupov (napr. z dát potvrdzujúcich členstvo užívateľa na platforme) a súkromných vstupov (napr. údajov o užívateľovi), môže ho užívateľ jednoducho predložiť na overenie svojej identity. To zlepšuje používateľskú skúsenosť a zbavuje organizácie potreby ukladať obrovské množstvo užívateľských informácií.

### Overiteľný výpočet {#verifiable-computation}

Overiteľný výpočet je ďalšou aplikáciou technológie s nulovou znalosťou pre zlepšenie chodu blockchainu. Umožňuje nám outsourcovať výpočty inému subjektu a to pri zachovaní overiteľných výsledkov. Subjekt predloží výsledok spolu s dokladom, ktorý overuje, že program bol spustený správne.

Overiteľný výpočet je **zásadný pre zlepšenie rýchlosti spracovania na blockchain** a to bez zníženia bezpečnosti. Pochopenie tohto princípu vyžaduje znalosť rozdielov v navrhovaných riešeniach pre škálovanie Etherea.

[Riešenia škálovania blockchainu](/developers/docs/scaling/#on-chain-scaling), ako je sharding, vyžadujú rozsiahlu úpravu základnej vrstvy blockchainu. Tento prístup je však veľmi zložitý a chyby v implementácii môžu podkopať bezpečnostný model Etherea.

[Riešenia škálovania mimo blockchain](/developers/docs/scaling/#off-chain-scaling) nevyžadujú prepracovanie základného protokolu Etherea. Namiesto toho sa spoliehajú na outsourcovaný výpočtový model na zlepšenie priepustnosti transakcií na základnej vrstve Etherea.

V praxi to funguje takto:

- Namiesto spracovania každej transakcie presunie Ethereum jej exekúciu na samostatný blockchain.

- Po spracovaní transakcií vráti tento blockchain výsledky, ktoré sa aplikujú do stavu Etherea.

Výhodou je, že Ethereum nemusí vykonávať žiadnu exekúciu a potrebuje iba aplikovať výsledky z outsourcovaných výpočtov na svoj stav. To znižuje zahltenie siete a taktiež zlepšuje rýchlosť transakcií (protokoly mimo blockchain sa optimalizujú pre rýchlejšiu exekúciu).

Blockchain potrebuje spôsob, ako overovať transakcie externe bez opätovného vykonávania, inak dôjde k strate výhody externej exekúcie.

Tu prichádza na rad overiteľný výpočet. Keď uzol vykoná transakciu mimo Ethereum, predloží dôkaz s nulovou znalosťou, aby preukázal správnosť externej exekúcie. Tento dôkaz (nazývaný [dôkaz platnosti)](/glossary/#validity-proof) zaručuje, že transakcia je platná, čo umožňuje Ethereu aplikovať výsledok na svoj stav – bez toho, aby čakal, či tento výsledok niekto spochybní.

[Rollupy s nulovou znalosťou](/developers/docs/scaling/zk-rollups) a [validia](/developers/docs/scaling/validía/) sú dve riešenia škálovania mimo blockchain, ktoré používajú dôkazy platnosti na zabezpečenie bezpečnej škálovateľnosti. Tieto protokoly vykonávajú tisíce transakcií mimo blockchain a predkladajú dôkazy na overenie na Ethereu. Tieto výsledky je možné použiť okamžite po overení dôkazu, čo umožňuje Ethereu spracovať viac transakcií bez zvýšenia náročnosti výpočtov na základnej vrstve.

### Zníženie úplatkárstva a tajných dohôd pri hlasovaní na blockchaine {#secure-blockchain-voting}

Hlasovacie schémy na blockchaine majú veľa dobrých vlastností: sú plne auditovateľné, zabezpečené proti útokom, odolné voči cenzúre a nemajú žiadne geografické obmedzenia. Ale nie sú imúnne voči problému **tajnej dohody**.

Tajná dohoda, definovaná ako „koordinácia za účelom obmedzenia otvorenej súťaže klamaním, podvádzaním a navádzaním druhých“, môže mať podobu ponúkania úplatkov. Napríklad Alice môže dostať úplatok od Boba, aby hlasovala za `možnosť B` na hlasovacom lístku, aj keď dáva prednosť `možnosti A`.

Úplatkárstvo a tajné dohody obmedzujú efektivitu akéhokoľvek procesu, ktorý využíva hlasovanie, (ale najmä tých, kde používatelia môžu preukázať, ako hlasovali). To môže mať neblahé dôsledky najmä na miestach, kde hlasy slúžia na prideľovanie obmedzených zdrojov.

Napríklad [kvadratické mechanizmy financovania](https://www.radicalxchange.org/concepts/plural-funding/) využívajú dary na meranie preferencie verejnoprospešných projektov. Každý dar sa počíta ako „hlas“ pre konkrétny projekt, pričom projekty, ktoré získajú viac hlasov, získajú viac prostriedkov zo zodpovedajúcej skupiny.

Vďaka hlasovaniu na blockchaine je kvadratické financovanie náchylné k tajným dohodám: blockchainové transakcie sú verejné, takže úplatkári môžu kontrolovať aktivitu úplatníka v reťazci, pretože vidia, ako kto „hlasoval“. Týmto spôsobom kvadratické financovanie prestáva byť efektívnym prostriedkom na alokáciu finančných prostriedkov na základe preferencií komunity.

Novšie riešenia, ako je MACI (Minimum Anti-Collusion Infrastructure), našťastie používajú dôkazy s nulovou znalosťou, aby bolo hlasovanie na blockchaine (napr. kvadratické mechanizmy financovania) odolné voči úplatkom a tajným dohodám. MACI je sada smart kontraktov a skriptov, ktoré umožňujú centrálnemu správcovi (nazývanému „koordinátor“) zhromažďovať hlasy a sčítať výsledky _bez toho, aby_ odhaľovali podrobnosti o tom, ako jednotlivci hlasovali. Aj tak je možné overiť, že hlasy boli riadne spočítané, prípadne potvrdiť, že sa konkrétny jednotlivec zúčastnil hlasovania.

#### Ako MACI pracuje s dôkazmi s nulovou znalosťou? {#how-maci-works-with-zk-proofs}

Na začiatku koordinátora nasadí MACI kontrakt na Ethereum, používatelia sa môžu prihlásiť k hlasovaniu (registrácia svojho verejného kľúča do smart kontraktu). Používatelia hlasujú zaslaním správy zašifrovanej ich verejným kľúčom do smart kontraktu (platný hlas musí byť mimo iného podpísaný najnovším verejným kľúčom spojeným s identitou používateľa). Po skončení hlasovania koordinátor spracuje všetky správy, spočíta hlasy a overuje výsledky v blockchaine.

V MACI sa dôkazy s nulovou znalosťou používajú k zaisteniu správnosti výpočtu tým, že koordinátorovi znemožnia nesprávne spracovanie hlasov a sčítanie výsledkov. Toto je dosiahnuté tým, že koordinátor musí vygenerovať dôkazy ZK-SNARK, ktoré overujú, že a) všetky správy boli spracované správne, b) konečný výsledok zodpovedá súčtu všetkých _platných_ hlasov.

MACI teda zaručuje integritu výsledkov vypočítaných počas sčítavania hlasov aj bez zdieľania rozdelenia hlasov na používateľov (ako je to zvyčajne). Táto funkcia je užitočná pri znižovaní účinnosti základných tajných dohôd. Túto možnosť môžeme ilustrovať pomocou predchádzajúceho príkladu, keď Bob podplatil Alicu, aby nehlasovala pre jej preferovanú možnosť:

- Alica sa zaregistruje k hlasovaniu zaslaním svojho verejného kľúča do smart kontraktu.
- Alica súhlasí, že bude hlasovať pre `možnosť B` výmenou za úplatok od Boba.
- Alica hlasuje pre `možnosť B`.
- Alica tajne odošle zašifrovanú transakciu, a tým zmení verejný kľúč spojený so svojou identitou.
- Alica odošle ďalšiu (zašifrovanú) správu do smart kontraktu, čím hlasuje pre `možnosť A` pomocou nového verejného kľúča.
- Alica ukáže Bobovi transakciu, ktorá preukáže, že hlasovala za `možnosť B` (táto transakcia je neplatná, pretože verejný kľúč, ktorý pre tento hlas použila, už nie je spojený s Alicinou identitou v systéme).
- Pri spracovávaní správ koordinátor preskočí Alicin hlas pre `možnosť B` a započítava sa iba hlas pre `možnosť A`. Bobov pokus manipulovať s hlasovaním pomocou dohody s Alicou zlyhá.

Používanie MACI _vyžaduje_ vieru, že sa koordinátor nedohovorí s úplatkármi alebo sa nepokúša podplatiť samotného voliča. Koordinátor môže dešifrovať užívateľské správy (nevyhnutné pre vytvorenie dôkazu), takže pre neho nie je problém presne overiť, ako kto hlasoval.

Ale v prípadoch, kedy je koordinátor čestný, MACI predstavuje mocný nástroj pre zaručenie poctivosti hlasovania v reťazci. To vysvetľuje jeho popularitu medzi aplikáciami kvadratického financovania (napr. [clr.fund](https://clr.fund/#/about/maci)), ktoré do značnej miery spoliehajú na nedotknuteľnosť voľby každého jednotlivca.

[Zistite viac o MACI](https://privacy-scaling-explorations.github.io/maci/).

## Ako dôkazy s nulovou znalosťou fungujú? {#how-do-zero-knowledge-proofs-work}

Dôkaz s nulovou znalosťou vám umožňuje preukázať pravdivosť tvrdenia, bez toho aby by ste zdieľali obsah alebo, ako ste zistili pravdu. Aby to bolo možné, protokoly s nulovou znalosťou sa spoliehajú na algoritmy, ktoré berú isté údaje ako vstup a vracajú „pravda“ alebo „nepravda“ ako výstup.

Protokol s nulovou znalosťou musí spĺňať tieto kritériá:

1. **Úplnosť**: ak je platný, protokol s nulovou znalosťou vždy vráti hodnotu „pravda“. Pokiaľ je teda základné tvrdenie pravdivé a dokazovateľ i overovateľ konajú čestne, je možné ho potvrdiť.

2. **Spoľahlivosť**: ak je vstup neplatný, je teoreticky nemožné oklamať protokol s nulovou znalosťou tak, aby sa vrátila hodnota „pravda“. Nepoctivý dokazovateľ teda nemôže oklamať poctivého overovateľa, nebude schopný ho presvedčiť, že neplatný výrok je platný (s výnimkou zanedbateľnej miery pravdepodobnosti).

3. **Nulová znalosť**: overovateľ sa o výroku nedozvie nič okrem jeho platnosti alebo nepravdivosti (má „nulovú znalost“ výroku). Táto požiadavka tiež bráni overovateľovi na základe dôkazu uhádnuť pôvodný vstup (obsah vyhlásenia).

V základnej podobe sa dôkaz s nulovou znalosťou skladá z troch prvkov. Sú to: **svedok**, **skúška** a **odpoveď**.

- **Svedok**: dôkazom s nulovou znalosťou chce dokazovať znalosť nejakej skrytej informácie. Tajná informácia je „svedkom“ dôkazu a predpokladaná znalosť svedka zo strany overovateľa vytvára súbor otázok, na ktoré môže odpovedať iba strana, ktorá tieto informácie pozná. Dokazovateľ teda zaháji proces dokazovania náhodným výberom otázok, vypočítaním odpovedi a jej odoslaním overovateľovi.

- **Skúška**: overovateľ náhodne vyberie ďalšiu otázku zo sady a požiada dokazovateľa, aby na ňu odpovedal.

- **Odpoveď**: dokazovateľ prijme otázku, vyráta odpoveď a vráti ju overovateľovi. Odpoveď dokazovateľa umožňuje overiť, či má skutočne prístup ku svedkovi. Aby dokazovateľ nehádal naslepo a náhodou správne odpovede neuhádol, vyberie overovateľ viac otázok, na ktoré sa bude pýtať. Mnohonásobným opakovaním tohto postupu výrazne klesá možnosť podvodu zo strany dokazovateľov. Je preto nutné proces vykonávať až, kým nie je overovateľ spokojný.

Vyššie uvedené popisuje štruktúru „interaktívneho dôkazu s nulovou znalosťou“. Ranné protokoly s nulovou znalosťou používali interaktívne dokazovanie, kde potvrdenie platnosti vyžaduje spätnú komunikáciu medzi dokazovateľmi a overovateľmi.

Dobrým príkladom, ktorý ilustruje, ako fungujú, interaktívne dôkazy, je slávny príbeh jaskyne [Ali Baba](https://en.wikipedia.org/wiki/Zero-knowledge_proof#The_Ali_Baba_cave) od Jeana-Jacquese Quisquatera. V príbehu chce Peggy (dokazovateľ) dokázať Viktorovi (overovateľ), že pozná tajnú frázu, ako otvoriť kúzelné dvere, bez toho aby ju prezradila.

### Neinteraktívne dôkazy s nulovou znalosťou {#non-interactive-zero-knowledge-proofs}

I keď je interaktívne dokazovanie revolučné, malo obmezenú užitočnosť, pretože vyžadovalo, aby boli obe strany k dispozícii a interagovali opakovane. Aj keby bol overovateľ presvedčený o poctivosti dokazovateľa, dôkaz by nebol k dispozícii pre nezávislé overenie (pretože výpočet nového dôkazu vyžadoval novú sadu správ medzi dokazovateľom a overovateľom).

Na vyriešenie tohto problému Manuel Blum, Paul Feldman a Silvio Micali navrhli prvé [neinteraktívne dôkazy s nulovou znalosťou](https://dl.acm.org/doi/10.1145/62212.62222), kde dokazovateľ a overovateľ majú zdieľaný kľúč. To umožňuje dokazovať svoju znalosť niektorých informácií (tj. svedka), avšak zároveň bez poskytnutie samotnej informácie.

Na rozdiel od interaktívnych dôkazov si vyžadujú neinteraktívne dôkazy iba jedno kolo komunikácie medzi účastníkmi (dokazovateľmi a overovateľmi). Dokazovateľ odovzdá tajné informácie špeciálnemu algoritmu pre výpočet dôkazu s nulovou znalosťou. Tento dôkaz je zaslaný overovateľovi, ktorý pomocou iného algoritmu kontroluje, že dokazovateľ pozná tajné informácie.

Neinteraktívne dokazovanie obmedzuje komunikáciu medzi dokazovateľom a overovateľom, čo zefektívňuje proces overovania. Okrem toho po vygenerovaní dôkazu ho môže overiť ktokoľvek iný (s prístupom ku zdieľanému kľúču a overovaciemu algoritmu).

Neinteraktívne dôkazy predstavovali prielom v technológii nulovej znalosti a podnietili vývoj dnes používaných dôkazných systémov. Typy týchto dôkazov rozoberieme nižšie:

### Typy dôkazov s nulovou znalosťou {#types-of-zero-knowledge-proofs}

#### ZK-SNARKs {#zk-snarks}

ZK-SNARK je skratka pre **Zero-Knowledge Succinct Non-Interactive Argument of Knowledge**. Protokol ZK-SNARK má nasledujúce vlastnosti:

- **Nulová znalosť**: overovateľ môže overiť platnosť tvrdenia, bez toho, aby o tvrdení vedel čokoľvek iné. Jediné, čo overovateľ o vyhlásení vie je, či je pravdivé alebo nepravdivé.

- **Spoľahlivosť**: dôkaz s nulovou znalosťou je menší než svedok a je možné ho rýchlo overiť.

- **Neinteraktivita**: dôkaz je „neinteraktívny“, pretože dokazovateľ a overovateľ interagujú iba raz, na rozdiel od interaktívnych dôkazov, ktoré vyžadujú viac kôl komunikácie.

- **Dôveryhodnosť**: dôkaz splňuje požiadavku „spoľahlivosti“, takže podvádzanie je extrémne nepravdepodobné.

- **(Chýbajúci) Znalosť**: dôkaz s nulovou znalosťou nemôže byť konštruovaný bez prístupu k tajným informáciám (svedok). Pre dokazovateľa, ktorý nepozná svedka, je ťažké, ak nie nemožné vypočítať platný dôkaz s nulovou znalosťou.

Uvedený „zdieľaný kľúč“ odkazuje na verejné parametre, na ktorých sa dokazovateľ a overovateľ dohovárajú pri generovaní a overovaní dôkazov. Generovanie verejných parametrov (súhrnne známych ako Common Reference String (CRS)) je citlivá operácia, pretože je kľúčová pre zabezpečenie protokolu. Ak sa entropia (náhodnost) použitá pri generovaní CRS dostane do rúk nepoctivého dokazovateľa, môže vypočítať falošné dôkazy.

[Výpočet viacerými stranami (MPC)](https://en.wikipedia.org/wiki/Secure_multi-party_computation) je spôsob, ako znížiť rizika pri generovaní verejných parametrov. Prebieha tak, že sa niekoľko účastníkov pripojí k takzvanému [dôveryhodnému obradu nastavení](https://zkproof.org/2021/06/30/setup-ceremonies/amp/), kde každá osoba prispeje k vytvoreniu CRS náhodnými hodnotami. Ak aspoň jeden čestný účastník zničí svoju časť entropie, protokol ZK-SNARK si uchováva výpočetnú spoľahlivosť.

Dôveryhodné nastavenia vyžadujú, aby používatelia dôverovali účastníkom pri generovaní verejných parametrov. Vývoj ZK-STARKu obsahuje však aj vznik overovacích protokolov, ktoré pracujú s nastavením, ktorému nie je možné neveriť.

#### ZK-STARKs {#zk-starks}

ZK-STARK je skratka pre **Zero-Knowledge Scalable Transparent Argument of Knowledge**. ZK-STARKy sú podobné ZK-SNARKom až na to, že sú:

- **Škálovateľné**: ZK-STARK je rýchlejší ako ZK-SNARK pri generovaní a overovaní dôkazov, pokiaľ je svedok väčší. S dôkazmi typu STARK sa časy dokazovania a overovania rastúceho objemu dát svedka len mierne predlžujú (doby dokazovania a overovania typu SNARK rastú s veľkosťou svedka lineárne).

- **Transparentné**: ZK-STARK spochybňuje verejne overiteľnú náhodnosť pri generovaní verejných parametrov pre preukázanie a overenie dôkazu, miesto nastavenia, ktorému je treba dôverovať. Sú teda v porovnaní so ZK-SNARK transparentnejšie.

ZK-STARK vyrába väčšie dôkazy ako ZK-SNARK, čo znamená, že majú všeobecne vyššie overovacie náklady. Existujú však prípady (ako je preukazovanie veľkých dátových sád), kedy môžu byť ZK-STARK cenovo výhodnejšie ako ZK-SNARK.

## Nevýhody použitia dôkazov s nulovou znalosťou {#drawbacks-of-using-zero-knowledge-proofs}

### Náklady na hardvér {#hardware-costs}

Generovanie dôkazov s nulovou znalosťou zahŕňa veľmi zložité výpočty, ktoré sa najlepšie robia na špecializovaných strojoch. Keďže sú tieto stroje drahé, sú často mimo dosahu jednotlivcov. Navyše aplikácie, ktoré by chceli používať technológiu s nulovou znalosťou, musia počítať s nákladmi na hardvér – čo môže zvýšiť náklady pre koncových užívateľov.

### Náklady na overenie dôkazu {#proof-verification-costs}

Overovanie dôkazov tiež vyžaduje zložité výpočty a zvyšuje náklady na implementáciu technológie s nulovou znalosťou v aplikáciách. Tieto náklady sú obzvlášť dôležité v súvislosti s preukazovaním správnosti výpočtov. Napríklad ZK-rollupy platia asi 500 000 gasu za overenie jediného dôkazu ZK-SNARK na Ethereu, pričom ZK-STARK vyžadujú ešte vyššie poplatky.

### Predpoklady dôvery {#trust-assumptions}

V ZK-SNARK je spoločný referenčný reťazec (verejné parametre) generovaný raz a je zúčastneným stranám k dispozícii na opätovné použitie. Verejné parametre sú vytvárané prostredníctvom tzv. dôveryhodného obradu nastavení, ktorý predpokladá, že účastníci sú čestní.

Ale v skutočnosti neexistuje spôsob, ako by používatelia mohli posúdiť poctivosť všetkých účastníkov a musia veriť vývojárom. ZK-STARK sú bez predpokladu dôvery, pretože náhodnosť použitá pri generovaní reťazca je verejne overiteľná. V súčasnej dobe výskumníci pracujú na nastaveniach pre ZK-SNARK, ktoré tiež nevyžadujú dôveru, aby zvýšili bezpečnosť dokazovacích mechanizmov.

### Hrozby kvantových počítačov {#quantum-computing-threats}

ZK-SNARK používa na šifrovanie kryptografiu eliptickej krivky. V súčasnosti sa predpokladá, že problém diskrétneho logaritmu eliptickej krivky je neriešiteľný, ale vývoj kvantových počítačov by tento bezpečnostný model mohol v budúcnosti ohroziť.

ZK-STARK je považovaný za imúnny voči hrozbe kvantových počítačov, pretože na šifrovanie používa hashe odolné proti kolíziám. Na rozdiel od párov verejného a súkromného kľúča, ktorý sa používa v kryptografii eliptických kriviek, je hašovanie odolné proti kolíziám pre algoritmy kvantových počítačov ťažšie prelomiť.

## Ďalšie zdroje informácií {#further-reading}

- [Prehľad modelových príkladov využitia dôkazov s nulovou znalosťou](https://pse.dev/projects) – _Tím pre prieskum súkromia a škálovania_
- [SNARKs vs. STARKS vs. rekurzívne SNARKs](https://www.alchemy.com/overviews/snarks-vs-starks) — _Alchemy Overviews_
- [Dôkaz s nulovou znalosťou: zlepšenie súkromia na blockchaine](https://www.altoros.com/blog/zero-knowledge-proof-improving-privacy-for-a-blockchain/) – _Dmitrij Lavrenov_
- [zk-SNARKs — realistický príklad použitia nulových znalostí, ktorý ide do hĺbky](https://medium.com/coinmonks/zk-snarks-a-realistic-zero-knowledge-example-and-deep-dive-c5e6eaa7131c) – _Adam Luciano_
- [ZK-STARKs — vytvorte overiteľnú dôveru, odolnú dokonca aj proti kvantovým počítačom](https://medium.com/coinmonks/zk-starks-create-verifiable-trust-even-against-quantum-computers-dd9c6a2bb13d) – _Adam Luciano_
- [Približný úvod k tomu, ako fungujú sk-SNARKy](https://vitalik.eth.limo/general/2021/01/26/snarks.html) – _Vitalik Buterin_
- [Prečo je Zero Knowledge Proofs (ZKP) zásadnou zmenou pre samostatnú identitu](https://frankiefab.hashnode.dev/why-zero-knowledge-proofs-zkps-is-a-game-changer-for-self-sovereign-identity) – _Franklin Ohaegbulam_

