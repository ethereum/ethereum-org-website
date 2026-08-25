---
title: "Důkazy s nulovou znalostí vysvětlené v 5 úrovních obtížnosti"
description: "Počítačový vědec vysvětluje důkazy s nulovou znalostí v pěti různých úrovních složitosti, od dítěte po experta."
lang: cs
youtubeId: "fOGdb1CTu5c"
uploadDate: 2021-12-13
duration: "0:18:19"
educationLevel: beginner
topic:
  - "privacy-and-security"
  - "zero-knowledge-proofs"
  - "cryptography"
format: explainer
author: WIRED
breadcrumb: "Důkazy s nulovou znalostí"
---

Počítačový vědec **Amit Sahai**, profesor na UCLA Samueli School of Engineering, vysvětluje důkazy s nulovou znalostí v pěti úrovních složitosti, od dítěte po experta, v této produkci od **WIRED**. Koncept je demonstrován prostřednictvím fyzických analogií a diskutován ve stále větší technické hloubce, čímž zpřístupňuje jeden z nejdůležitějších konceptů kryptografie úplně všem.

*Tento přepis je přístupnou kopií [původního přepisu videa](https://www.youtube.com/watch?v=fOGdb1CTu5c) publikovaného společností WIRED. Byl lehce upraven pro lepší čitelnost.*

#### Úvod (0:00) {#introduction-000}

**Amit Sahai:** Ahoj, jmenuji se Amit Sahai a jsem profesorem počítačových věd na UCLA Samueli School of Engineering. Dnes jsem byl požádán, abych vysvětlil důkazy s nulovou znalostí v pěti úrovních rostoucí složitosti.

Důkaz s nulovou znalostí je způsob, jakým může dokazovatel přesvědčit ověřovatele, že je nějaké tvrzení pravdivé, a přitom neodhalit žádné další informace kromě samotného faktu, že je tvrzení pravdivé. Důkazy s nulovou znalostí se používají v blockchainech a kryptoměnách. Kryptografové jsou nadšeni z důkazů s nulovým vědomím kvůli jejich úžasným matematickým vlastnostem, ale také kvůli jejich neuvěřitelné využitelnosti v mnoha různých scénářích.

#### Úroveň 1: dítě (0:41) {#level-1-child-041}

**Amit Sahai:** Jaký je tvůj oblíbený předmět?

**Chelsea:** Řekla bych, že matematika. Některé malé problémy mohou být ve skutečnosti velmi velké a složité. Je to jako hlavolam.

**Amit Sahai:** Miluji matematiku ze stejného důvodu. Dnes ti povím o věci zvané důkaz s nulovou znalostí. V důkazu s nulovou znalostí figurují dva lidé — je tu dokazovatel a ověřovatel. Chci ti dokázat, že je něco pravda, ale zvláštní na tom je, že ti to chci dokázat, aniž bych ti řekl jakýkoli důvod proč. Pamatuji si, když jsem o tom slyšel poprvé, říkal jsem si: počkat, cože? Jak je to vůbec možné?

Takže, co vidíš na této fotce?

**Chelsea:** Spoustu tučňáků.

**Amit Sahai:** Jo. Mezi všemi těmito tučňáky se skrývá papuchalk. Chceš ho zkusit najít? Vidíš, kde je? Já vím, kde je, ale nechci ti to říct. Věříš mi?

**Chelsea:** Jo.

**Amit Sahai:** Ale co kdybych ti mohl dokázat, že vím, kde ten papuchalk je, aniž bych ti prozradil jeho polohu? Ukážu ti to. Vzal jsem tu fotku a dal ji sem za tenhle plakát. Proč se nezkusíš podívat touhle dírkou?

**Chelsea:** Vidím papuchalka.

**Amit Sahai:** Takže když se podíváš na tuhle desku, nevíme, kde ta fotka byla, že? Byla fotka rohem tady, v tom případě by byl papuchalk úplně na téhle straně? Nebo byla fotka rohem tady, v tom případě by byl papuchalk na druhé straně? Tohle je tedy opravdu jednoduchý příklad důkazu s nulovou znalostí. Přesvědčil jsem tě, že vím, kde papuchalk je, ale nic dalšího ses nedozvěděla.

**Chelsea:** Proč studuješ důkazy s nulovou znalostí?

**Amit Sahai:** Když jsem se o nich dozvěděl poprvé, prostě mi přišly hrozně super. Ale ukázalo se, že jsou také velmi užitečné — a to nejen k hledání papuchalků. Pokud jen zadáš své heslo a hacker se nabourá do počítače, může tvé heslo jednoduše získat. Co kdybychom se místo toho mohli nějak přihlásit pomocí důkazu s nulovou znalostí? Mohla bys prostě dokázat, že jsi Chelsea, aniž bys jim cokoli prozradila. Kdybys to dokázala, bylo by to úžasné, protože i kdyby se hacker naboural do počítače, nic by nezjistil — protože ani samotný počítač se nic nedozví.

Takže Chelsea, tvými vlastními slovy, co je to důkaz s nulovou znalostí?

**Chelsea:** Důkaz s nulovou znalostí je důkaz nějakého tvrzení. Neukážeš jim proč nebo co. Jen jim ukážeš malý kousek, nebo prostě uděláš nějaký divný kouzelnický trik, který vlastně není kouzelnický trik, a oni budou přesvědčeni. A ty jsi jim neukázal proč, ani nic podobného.

#### Úroveň 2: teenager (3:31) {#level-2-teen-331}

**Amit Sahai:** Takže, slyšel jsi už někdy pojem důkaz s nulovou znalostí?

**Teenager:** Neslyšel, ne.

**Amit Sahai:** Je to způsob, jakým může dokazovatel přesvědčit ověřovatele, že je něco pravda, aniž by prozradil cokoli o tom, proč je to pravda, což zní naprosto bizarně. Chci ti dokázat, že znám tuhle kombinaci, aniž bych ti tu kombinaci prozradil. A ty bys mohl napsat malý vzkaz, tajemství, které bych rozhodně nemohl znát. Slož ho a strč ho sem. A pak, pokud tu kombinaci znám, měl bych být schopen to otevřít a říct ti, co jsi napsal.

Dobrá. „Můj pes se jmenuje Doug.“

**Teenager:** Přišel jsi na to, jaká to byla kombinace?

**Amit Sahai:** Ne. Takže nikde v této interakci jsi neviděl žádnou informaci, kterou bys už neznal. A přesto jsem tě přesvědčil, že tu kombinaci znám.

**Teenager:** Jaký je tedy přesný účel důkazu s nulovou znalostí? Je to jako dokázat něco, ale bez poskytnutí dostatku informací, které by mohly ohrozit to, co dokazuješ?

**Amit Sahai:** Lidé si navzájem nedůvěřují. A kdybych byl schopen někomu dokázat, že jsem něco udělal správně, aniž bych musel prozradit svá tajemství, pak by mi ten člověk důvěřoval více.

**Teenager:** Jak to souvisí s počítačovými technologiemi? Je to osobní interakce?

**Amit Sahai:** Předpokládejme, že by sis chtěl vyměňovat zprávy s někým, koho znáš. Pravděpodobně byste se nejdřív sešli a vymysleli nějaký tajný kód, že? A pak byste si v tom kódu psali zprávy. Ale co když jsi toho člověka nikdy předtím nepotkal? Co když si chceš vyměňovat tajné zprávy se mnou a my jsme se nikdy předtím neviděli? Jak bychom to vůbec mohli udělat?

**Teenager:** Nemám tušení.

**Amit Sahai:** Zní to nemožně, že? Ale není. Nepoužil bys fyzický zámek nebo fyzickou schránku. Místo toho bychom k těmto věcem použili matematiku. Mohl bys vzít zprávu a zašifrovat ji pomocí matematiky. A já bych ti pak mohl dokázat, že znám klíč, otevřít ji a poslat ti ji zpět. Tím bych ti dokazoval, že znám matematický klíč k matematické schránce.

Takže na základě toho, o čem jsme dnes mluvili, tvými vlastními slovy, co je to důkaz s nulovou znalostí?

**Teenager:** Je to jako když máte nějaké opravdu důležité tajemství, o kterém chcete, aby někdo věděl, ale nechcete mu říct všechno. Můžete použít důkaz s nulovou znalostí, abyste mu to tajemství dokázali, ale neprozradili ho celé.

#### Úroveň 3: vysokoškolák (6:13) {#level-3-college-student-613}

**Amit Sahai:** Co studuješ?

**Vysokoškolák:** Jsem studentem prvního ročníku počítačových věd na USC Viterbi. Zajímám se o všechny věci jako data, internet, blockchain a kryptoměny.

**Amit Sahai:** Slyšel jsi někdy o důkazech s nulovou znalostí?

**Vysokoškolák:** Jen letmo.

**Amit Sahai:** Vlastně právě v oblasti blockchainu vidíme, jak se důkazy s nulovou znalostí implementují — a myslím, že je to teprve začátek. Ve svém jádru je důkaz s nulovou znalostí interakcí mezi dvěma lidmi. Měl bych být schopen tě přesvědčit, že je nějaké tvrzení pravdivé, ale ty nebudeš mít tušení, proč je pravdivé.

Způsob, jakým k tomu přistoupíme, je prostřednictvím něčeho, co se nazývá NP-úplnost. NP-úplný problém je problém, který je opravdu těžké vyřešit. Ale pokud ho dokážeš vyřešit, dokážeš vyřešit jakýkoli problém, který patří do třídy NP — a to zahrnuje obrovské množství problémů. Použijeme NP-úplný problém k tomu, abychom prostřednictvím důkazu s nulovou znalostí dokázali neuvěřitelnou škálu tvrzení. Konkrétní NP-úplný problém, na který se podíváme, se nazývá barvení mapy třemi barvami.

Tady máme mapu s řadou zemí, uspořádaných tak, že žádné země se stejnou barvou nesdílejí hranici. To je to, co dělá takovou mapu platně obarvenou. Ukazuje se, že to, zda lze mapu takto obarvit třemi barvami, je příkladem NP-úplného problému.

Možná to, co opravdu chceš udělat, je poskytnout důkaz s nulovou znalostí, že máš alespoň 0,3 bitcoinu, aniž bys prozradil adresu svého účtu. Ukazuje se, že mohu vzít toto tvrzení a převést ho na mapu zemí. Tato mapa zemí bude obarvitelná třemi barvami pouze tehdy, pokud máš alespoň 0,2 bitcoinu.

**Vysokoškolák:** Jak bychom něco takového přeměnili na důkaz s nulovou znalostí?

**Amit Sahai:** Prvním krokem samozřejmě je, že musíme vymazat všechny barvy. Do každé z těchto obálek jsem vložil barvu. Jak teď víš, že je to platné obarvení? Nevíš. Musíš si vybrat jakékoli dvě sousední země — můžeš si je vybrat jakkoli chceš, zcela náhodně.

**Vysokoškolák:** Můžu si vzít tyhle dvě?

**Amit Sahai:** Tady máme zelenou a tady modrou. Jak vidíš, jsou to dvě různé barvy. Takže máš trochu jistoty, že se mi to podařilo obarvit správně — ale ne zas tak velkou jistotu, protože jsem ti ukázal jen dvě země. Jedním ze způsobů, jak získat větší jistotu, je otevřít jich víc, ale to by znamenalo odhalit ti informace. A to já nechci.

Takže tě místo toho poprosím, aby ses otočil. A teď tyhle barvy prohodíme.

Můžeš si náhodně vybrat dvě země a my zase odhalíme dvě barvy.

**Vysokoškolák:** Vezmu si tuhle a tuhle.

**Amit Sahai:** Je od tebe chytré, že to kontroluješ na té samé, kterou jsi už měl. Ale jak uvidíš, teď už není zelená — je modrá. A tahle je naopak zelená. Barvy, které jsem ti ukázal minule, s těmito novými barvami nefungují. Ale funguje to pro toto obarvení, které ti ukazuji právě teď. Takže to, co jsme udělali, je, že jsme ti znemožnili poskládat si ty kousky dohromady. A pokud to uděláš tisíckrát a já ti pokaždé správně ukážu různé barvy, budeš opravdu přesvědčený. A to je vše — to je celý důkaz s nulovou znalostí.

**Vysokoškolák:** Takže je to jako pravděpodobnostní důkaz?

**Amit Sahai:** Jo. Ve skutečných implementacích bychom nepoužívali obálky — použil bys šifrování. Ale tohle je ten protokol.

**Vysokoškolák:** Jaké jsou tedy širší důsledky důkazů s nulovou znalostí? Mají být praktičtější pro implementaci, nebo mají strukturálně něco dokazovat?

**Amit Sahai:** Není to o tom, udělat něco efektivnějším. Je to o dělání věcí, které jsme dříve prostě neuměli. Můžu ti vlastně dokázat, aniž bych prozradil jakékoli ze svých tajemství, že se chovám čestně. Mohl bych ti dokázat, že jsem správně podepsal nějaký zašifrovaný dokument, aniž bych prozradil, co ten tajný dokument obsahoval. Tato schopnost změnit pravidla hry — skutečně změnit to, co dokážeme — je to, co důkazy s nulovým vědomím přinášejí.

**Vysokoškolák:** Kde si myslíš, že bychom mohli pomocí důkazů s nulovou znalostí vybudovat větší důvěru?

**Amit Sahai:** Jedním skvělým příkladem jsou volby. Pokud bys mohl dokázat, že volby proběhly správně — že každý hlas byl započítán a vše se sečetlo tak, že vyhrála jedna osoba s konkrétním celkovým počtem — s nulovým vědomím, pak nemusíš prozrazovat skutečné hlasy žádného člověka. A přesto by všichni viděli, že to bylo provedeno správně.

#### Úroveň 4: postgraduální student (11:59) {#level-4-grad-student-1159}

**Amit Sahai:** Je skvělé, že jsi tady a že si s tebou můžu popovídat, Eli. Můžeš mi říct něco málo o svém výzkumu?

**Eli:** Můj výzkum se týká kryptografie. Konkrétně pracuji na některých protokolech pro vícestranné výpočty (multi-party computation). Ten, na kterém pracuji právě teď, je systém pro výpočet souhrnných statistik, aby poskytovatelé služeb jako Google Chrome nebo Tesla mohli tyto statistiky shromažďovat, aniž by se dozvěděli cokoli o datech jednotlivých uživatelů. Já jako uživatel nemusím Firefoxu sdělovat, že moje oblíbená webová stránka je mylittlepony.com. Ale oni mohou vědět, kolik uživatelů na mylittlepony.com chodí každý den.

**Amit Sahai:** To je úžasné. Vícestranné výpočty jsou mému srdci velmi blízké. Důkazy s nulovou znalostí jsou samozřejmě o dokazování věcí jiné osobě, aniž byste odhalili podrobnosti o tom, co dokazujete. Ale podle mě jde nulové vědomí ještě dál. Je to tento zastřešující koncept, který můžete často vidět ve vícestranných výpočtech, kde chcete splnit nějaký úkol, aniž byste odhalili cokoli víc, než co přesně k jeho splnění potřebujete.

**Eli:** Přesně tak, a umožňuje vám to dokázat, že jste se chovali čestně, aniž byste odhalili jakákoli tajemství, která k tomu čestnému chování používáte. Víme, že důkazy s nulovou znalostí pro NP-úplné jazyky hrají v kryptografii obrovskou roli. Jaká byla tvoje první zkušenost s NP-úplností?

**Amit Sahai:** Moje první setkání proběhlo v mé úplně první hodině algoritmů během bakalářského studia. NP-úplný jazyk je tento úžasný problém, který vám neřekne jen něco o sobě, ale jeho vyřešení vám může prozradit něco o celé třídě opravdu zajímavých problémů.

**Eli:** Když jsi poprvé začal přemýšlet o důkazech jako o interaktivní hře, kde spolu mluvíme, umožnilo to vznik nulového vědomí?

**Amit Sahai:** Rozhodně. A myšlenka, že by náhodnost mohla být užitečná k dokazování něčeho — to se opět zdá tak neintuitivní, pokud přemýšlíme o platónském ideálu důkazu. Není tam přítomna žádná náhodnost, žádný nedeterminismus.

**Eli:** Souvisí to s celou tou myšlenkou postavit důkaz na hlavu. Ve starém klasickém důkazu jde náhodnost vyloženě proti cíli toho, o co se snažíte, protože se snažíte udělat všechno zřejmé a odhalit tok informací. Ale jakmile to postavíte na hlavu a už se o to nesnažíte, najednou se všechny špatné vlastnosti náhodnosti stanou dobrými.

**Amit Sahai:** Přesně tak. Náhodnost je nepředvídatelná, a to je to, co chceme. Chceme, aby ta nepředvídatelnost ve skutečnosti skryla informace, které chceme skrýt. Jak jsi využil nulové vědomí v projektech, na kterých jsi pracoval? S jakými výzvami se setkáváš?

**Eli:** Obvykle je nejtěžší přijít na to, kde přesně je nejlepší místo pro jeho použití. Napsal jsem několik prací, které využívaly nulové vědomí spíše teoretickým způsobem, ale pokud jde o aplikace, některé z nejzajímavějších aplikací, které jsem zatím viděl, byly v oblasti blockchainu.

**Amit Sahai:** Jaká jsou některá úzká hrdla efektivity?

**Eli:** Jednou z nejlepších věcí na důkazech s nulovou znalostí je, že jich existuje tolik druhů — rád jim říkám příchutě. Obecně platí, že když používáte důkazy s nulovou znalostí v aplikaci, hlavní úzké hrdlo bývá na straně dokazovatele.

**Amit Sahai:** Můžeš vzít práci dokazovatele a rozdělit ji do spousty paralelních výpočtů?

**Eli:** To je tak zábavná otázka. Myslím, že jako obor na ni stále neznáme odpověď. Jednou z nejúžasnějších věcí, které jsem za poslední tři nebo čtyři roky viděl, je přechod od teorie k praxi — vidět, jak se všechny tyto úžasné systémy, které lidé vymysleli za posledních 30 let, začínají stávat dostatečně efektivními na to, aby mohly být vytvořeny.

**Amit Sahai:** Nepochybně. A obzvláště s cloud computingem — využití síly cloudu k umožnění důkazů s nulovou znalostí by bylo úžasné. Také v oblasti blockchainu, pokud chcete urychlit generování důkazů, kdyby se to dalo dělat distribuovaně, bylo by to skvělé. Jednou z mých nadějí je, že síla vícestranných výpočtů spočívá ve spojování lidí, kteří si navzájem nedůvěřují. Můžeme vzít tuto sílu v kryptografii a použít ji k tomu, abychom pomohli s obrovskou mírou nedůvěry, která v současnosti ve společnosti panuje?

**Eli:** Myslím, že to je jeden z důvodů, proč mě vícestranné výpočty tak přitahovaly. Jedním z nejdůležitějších problémů na světě je skutečnost, že si tolik lidí navzájem nedůvěřuje. Být schopen použít matematiku k vytvoření technologie, která lidem umožňuje spolupracovat, aniž by si museli důvěřovat, je opravdu skvělé a úžasné poslání.

#### Úroveň 5: expert (17:10) {#level-5-expert-1710}

**Amit Sahai:** Shang-Hua, je tak skvělé tě zase vidět. Myslím, že naposledy jsme se viděli v roce 2017 nebo tak nějak.

**Shang-Hua:** Myslím, že jsme si jednou volali přes Zoom během pandemie, ale je dobré tě vidět osobně. Vlastně v roce 86 jsem chodil na kurz kryptografie s profesorem Leonardem Adlemanem, tím A z RSA. Zadal mi práci od Goldwasserové, Micaliho a Charlieho Rackoffa o důkazu s nulovou znalostí. Takže to byla skutečně moje úplně první prezentace v této zemi — o nulovém vědomí.

**Amit Sahai:** To je úžasné. Je to takový téměř hypnotický koncept.

**Shang-Hua:** Je také zajímavé, jak tyto koncepty matematicky formulovat. Máme například data. Z dat nakonec můžete prostřednictvím dolování dat (data mining) získat informace. A pak tu máte slovo „znalost“. O znalosti se dlouho debatuje i ve filozofii. Co je to znalost? Ale tady je velmi fascinující způsob, jakým chtějí matematici nebo počítačoví vědci tuto znalost zachytit. Neřeklo se „důkaz s nulovou informací“. Jaký je tedy tvůj názor na to, proč „znalost“ spíše než „informace“ nebo „důkaz s nulovými daty“? Je jasné, že tam data jsou, takže to nemohou být nulová data.

**Amit Sahai:** Naprosto. Nemyslím si, že na tuto otázku máme stále zcela uspokojivou odpověď. Co bylo tak krásným poznatkem, je myšlenka, že nulové vědomí je něco, co už dokážete předpovědět. Pokud už dokážete předpovědět odpověď, pak touto interakcí nesmíte získávat žádné znalosti. Tento poznatek — schopnost přesně předpovědět budoucnost a to, že je to důkazem nedostatku nových znalostí — byl tak krásný, úžasný poznatek.

**Shang-Hua:** No, není tu nulová informace. Zásadně, z pohledu výpočetní techniky a bezpečnosti, záleží na tom, kolik znalostí získáváte, více než na tom, kolik informací jste získali a kolik dat máte. Data neznamenají okamžitě znalost. Ale lidé to nedokážou vždy rozlišit.

**Amit Sahai:** Správně. Například v lékařském výzkumu — jak úžasné by bylo mít lék a dokázat, že v tomto modelu funguje, aniž byste museli odhalit strukturu dané sloučeniny?

**Shang-Hua:** Jaké bys řekl, že jsou další směry v této oblasti?

**Amit Sahai:** Tento koncept programů s nulovým vědomím by vám umožnil provádět zcela libovolné výpočty způsobem s nulovým vědomím, bez jakékoli interakce. Můžu prostě vzít program, převést ho na program s nulovým vědomím — nebo obfuskovaný program — a pak vám ho prostě poslat. Můžete ho spustit a získat užitek z tohoto výpočtu, aniž byste se mnou museli dál mluvit.

**Shang-Hua:** To je pravda. Je v tom neinteraktivní povaha. Ale je v tom ověřitelnost. V blockchainu také začali do účetní knihy začleňovat obecnější důkaz s nulovou znalostí.

**Amit Sahai:** Rozhodně se teď nacházíme v okamžiku, kdy se nulové vědomí bude používat stále více. V oblasti nulového vědomí se koná tolik konferencí a setkání, kam ty a já nejsme pozváni — protože jsou pro lidi, kteří vyvíjejí, lidi, kteří programují, ne pro nás matematiky. A myslím, že to je znamení. Je to znamení, že naše dítě dospělo a je čas, aby se rozvíjelo.

**Shang-Hua:** Myslím, že je to hluboké, studenti se mě často ptají, jaké jsou budoucí směry — jak z hlediska kryptografie, důkazu s nulovou znalostí, v reálném světě, tak v matematických výpočtech.

**Amit Sahai:** To je skvělá otázka. Přál bych si vidět do budoucnosti. Nemůžu, ale zkusím to. Myslím, že jsme v kryptografii za posledních několik desetiletí udělali tolik, ale rozumíme tak málu. Nejzásadnějším aspektem je pochopení obtížnosti — jak získáme těžké problémy? Jak vlastně budujeme matematicky těžké problémy, abychom je pak mohli použít k vytvoření efektivních programů a důkazů s nulovým vědomím?

**Shang-Hua:** Hádám, že i v kvantových výpočtech potřebujete ještě těžší problémy.

**Amit Sahai:** Vskutku. Teď, když se na nás řítí hrozba kvantových výpočtů, všichni víme, že kvantové počítače dokážou prolomit spoustu kryptografických systémů. Je to hluboká výzva. Můžeme tedy najít nové zdroje obtížnosti, které jsou odolné vůči kvantovým počítačům — které ani kvantové počítače nedokážou prolomit? To je něco, na čem pracuji posledních několik let.

**Shang-Hua:** Ale jsem si jistý, že budou motivovat krásnou matematiku.

**Amit Sahai:** Ano, to je pravda. Jednou ze skvělých věcí na reálném světě je, že lidé v reálném světě mají požadavky. A tyto požadavky často znějí nemožně. A tady přicházíme na řadu my — je naší prací udělat nemožné možným.