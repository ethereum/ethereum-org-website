---
title: "EIP-7805: Seznamy zahrnutí vynucené volbou forku (FOCIL)"
description: "Výzkumníci Etherea Thomas Thiery a Julian Ma podrobně rozebírají EIP-7805 (FOCIL), který využívá agregované lokální seznamy zahrnutí k zajištění toho, že platné transakce nebudou moci být cenzurovány tvůrci bloků."
lang: cs
youtubeId: "cUGyLx-mf6I"
uploadDate: 2025-02-12
duration: "1:00:30"
educationLevel: advanced
topic:
  - "privacy"
  - "network-upgrades"
  - "roadmap-and-priorities"
format: presentation
author: ECH Institute
breadcrumb: "EIP-7805 (FOCIL)"
---

Epizoda 141 pořadu **PEEPanEIP** od Ethereum Cat Herders. K moderátorce Pooje Ranjan se připojili **Thomas Thiery** a **Julian Ma**, výzkumníci ze skupiny Robust Incentives Group v Nadaci Ethereum a spoluautoři [EIP-7805](https://eips.ethereum.org/EIPS/eip-7805), aby vysvětlili seznamy zahrnutí vynucené volbou forku (FOCIL): proč Ethereum potřebuje odolnost vůči cenzuře na úrovni protokolu, jak tento mechanismus funguje a v jaké fázi je jeho implementace.

*Tento přepis je přístupnou kopií [původního přepisu videa](https://www.youtube.com/watch?v=cUGyLx-mf6I) zveřejněného skupinou Ethereum Cat Herders. Pro lepší čitelnost byl lehce upraven.*

#### Úvod (0:35) {#introduction-035}

**Pooja Ranjan:** Dobrý den a vítejte u PEEPanEIP, jedinečného pořadu, kde se podrobně věnujeme návrhům na vylepšení Etherea (Ethereum Improvement Proposals) a zkoumáme jejich dopad na ekosystém. Toto je 141. epizoda, kterou vám přináší Ethereum Cat Herders. Jsem vaše moderátorka Pooja Ranjan a dnes se budeme bavit o EIP-7805, seznamech pro zahrnutí vynucených volbou forku (Fork-choice enforced Inclusion Lists).

EIP-7805, zdokumentovaný v listopadu 2024, je hlavní návrh (core proposal) ve standardizačním procesu (standards track), který je v současné době ve fázi konceptu (draft). Tento návrh má umožnit výboru validátorů vynutit zahrnutí sady transakcí do každého bloku. Návrh, jehož spoluautory jsou Thomas Thiery, Francesco D'Amato, Julian Ma, Barnabé Monnot, Terence Tsao, Jacob Kaufmann a Jihoon Song, je aktivně diskutován pro budoucí upgrade.

V této epizodě prozkoumáme podrobnosti EIP-7805, jeho důsledky a potenciální dopad na ekosystém Etherea. Abychom si o návrhu popovídali více, připojili se k nám Thomas Thiery a Julian Ma. Vítejte v PEEPanEIP.

**Thomas Thiery:** Děkujeme za pozvání.

**Julian Ma:** Ano, moc děkujeme za pozvání.

**Pooja Ranjan:** Těšíme se, až se dozvíme přehled o tomto návrhu, v jaké fázi se dnes nachází a jak brzy ho můžeme vidět na Ethereum Mainnetu. Než ale začneme, naše komunita ráda poznává výzkumníky a vývojáře, kteří za touto prací stojí. Mohli byste se s námi podělit o něco málo o sobě, o projektu, do kterého jste momentálně zapojeni, a o vaší cestě ekosystémem Etherea?

#### Představení hostů (2:14) {#guest-introductions-214}

**Julian Ma:** Jasně, můžu začít. Jsem Julian, výzkumník ve skupině Robust Incentives Group, stejně jako Thomas, v Nadaci Ethereum. Skupina Robust Incentives Group se velmi široce zabývá ekonomií protokolu. Někteří z nás se zabývali mechanismy transakčních poplatků, jako je EIP-1559, a další se zaměřili na útoky na vrstvu konsensu, většinou ty motivované ekonomickými pobídkami.

Já osobně jsem začal stáží, kde jsem zkoumal deriváty základního poplatku, a poté jsem nastoupil na plný úvazek. Pracoval jsem převážně na oddělení navrhovatele a tvůrce (PBS) a tématech souvisejících s MEV, a nyní se zaměřuji na seznamy pro zahrnutí (inclusion lists) prostřednictvím FOCIL v rámci tohoto EIP a těším se na oddělení atestátora a navrhovatele (attester-proposer separation). Řekl bych, že mě nejvíce baví převádět výzkum do praxe prostřednictvím tohoto procesu, kdy začínáme s teoretičtější prací a směřujeme k EIP, které snad bude navrženo a implementováno v rámci Etherea.

**Thomas Thiery:** Já jsem Thomas. Také pracuji v Nadaci Ethereum ve skupině Robust Incentives Group, kde se věnuji výzkumu. Původně mám doktorát z neurovědy, což bylo velmi odlišné. Ale začal jsem se zajímat o blockchainy a distribuované systémy, chtěl jsem zkusit něco trochu jiného a přidal jsem se ke krypto datové společnosti jménem Dune. Zůstal jsem tam nějakou dobu, ale pak mi začal chybět výzkum a měl jsem to štěstí, že jsem se mohl připojit k EF (Nadaci Ethereum) a skupině Robust Incentives Group, což je zatím skvělé.

Pracoval jsem na podobných tématech. Když jsem nastoupil, MEV bylo docela velké téma. Zajímavé je, že mé úplně první výzkumné příspěvky byly velmi malé, ale týkaly se zpoždění zahrnutí (inclusion delays) a odolnosti vůči cenzuře. Do hloubky jsem se do toho ponořil až nedávno. Posledního půl roku až rok jsem aktivnější v oblasti odolnosti vůči cenzuře a zahrnování transakcí. Je opravdu skvělé moci začít s výzkumnými nápady, vylepšit předchozí myšlenky, které byly velmi zajímavé, ale nezahrnovaly některé detaily, o kterých budeme mluvit, přijít s návrhem a nyní mít implementace a devnety, o kterých si většina lidí, se kterými jsem mluvil, myslí, že by byly pro Ethereum dobrým přínosem.

**Pooja Ranjan:** Děkuji za sdílení. Je vždy inspirativní dozvědět se něco o minulosti vývojářů. Je zajímavé vidět, že pocházejí z různých oborů a nakonec přispívají do ekosystému Etherea. Chápu, že tu dnes máme prezentaci. Takže bez dalších okolků, pojďme se na ni podívat.

#### Prezentace: cíle FOCIL (5:16) {#presentation-goals-of-focil-516}

**Julian Ma:** Skvělé, moc vám děkuji. Rád bych začal krátkou prezentací o tom, jak EIP-7805, neboli FOCIL, funguje a proč přesně to chceme udělat. Má to sloužit k zahájení konverzace, takže to nebude příliš do hloubky, abychom nechali prostor pro následnou diskuzi.

Hlavním cílem FOCIL je zvýšit důvěryhodnou neutralitu Etherea. FOCIL toho dosahuje odstraněním monopolu na zahrnutí, který v současnosti drží jediný navrhovatel nebo tvůrce bloku v rámci jednoho slotu. Místo toho FOCIL umožňuje, aby se na tvorbě bloku podílelo více validátorů tím, že do každého bloku zahrnou transakce.

Cílem na vyšší úrovni je usilovat o vlastnost, kterou nazýváme neutralita řetězce. To znamená, že jakákoli čekající transakce platící poplatek by měla být zahrnuta, pokud je k dispozici a pokud je onchain místo pro její zahrnutí. Věříme, že pokud je tato vlastnost dostatečně splněna, zvýšíme tím důvěryhodnou neutralitu Etherea.

#### Proč potřebujeme FOCIL a proč právě teď? (6:09) {#why-do-we-need-focil-and-why-now-609}

**Julian Ma:** Proč něco takového potřebujeme? V současnosti téměř všichni validátoři outsourcují tvorbu bloků do MEV-Boost, což je trh mimo protokol, kde tvůrci přihazují na práva k tvorbě bloků. Na tomto trhu skutečně dominují pouze dva subjekty, což znamená, že 90 % bloků tvoří pouze tyto dva subjekty.

Zde vidíme, že Ethereum už nemůže čerpat svou důvěryhodnou neutralitu z lokální tvorby bloků. Kdysi tomu tak bylo. Začalo to tím, že navrhovatelé byli rozmístěni po celém světě a každý tvořil své bloky lokálně, což znamenalo, že byly zahrnuty všechny transakce. Ale teď, když je tvorba bloků outsourcována na tyto sofistikované subjekty, to už nestačí. Je tedy nutné zavést robustnější opatření proti cenzuře a FOCIL je tím nejznámějším způsobem, jak toho dosáhnout.

Proč bychom měli FOCIL implementovat právě teď? Možná si myslíte, že tvůrci teď tolik necenzurují, ale mohli by s tím začít kdykoli, ať už z regulačních nebo ekonomických důvodů. A ekonomická cenzura je rozhodně něco, co by se nemělo podceňovat. Je také dobré zavést FOCIL v době, kdy je cenzury relativně málo, protože ho pak zavedete jako základ a jako výchozí standard. Všichni validátoři vytvářejí seznamy pro zahrnutí bez ohledu na svou jurisdikci nebo ekonomické pobídky, což způsobuje jen malou nestabilitu trhu. Zatímco kdybyste FOCIL zaváděli v době, kdy všichni tvůrci cenzurují, bylo by to pravděpodobně mnohem obtížnější.

Dále se v dnešní době stávají stále populárnějšími tzv. based rollupy, které se budou spoléhat na tvorbu bloků na Ethereu. Pokud chceme poskytovat sekvenování, které má Ethereum, je nutné zde zajistit důvěryhodnou neutralitu prostřednictvím FOCIL.

A potenciálně by FOCIL mohl pomoci se škálováním, záleží na tom, koho se zeptáte. Dnes Ethereum stále čerpá svou odolnost vůči cenzuře z lokální tvorby bloků. Pokud by Ethereum mohlo čerpat odolnost vůči cenzuře odjinud, například prostřednictvím FOCIL, pak bychom možná mohli zvýšit očekávání, která máme od tvůrců bloků, a povolit například více blobů. Ale potenciálně by to šlo udělat i bez FOCIL. Proto bylo navrženo implementovat FOCIL ve Fusaka.

#### Jak funguje FOCIL (8:10) {#how-focil-works-810}

**Julian Ma:** Nyní vás provedu tím, jak FOCIL funguje. Začneme od základů a půjdeme krok za krokem, dokud nebudeme mít celý mechanismus, a pak prozkoumáme, jak tento kompletní mechanismus splňuje vlastnosti, které požadujeme.

Základní myšlenkou seznamu pro zahrnutí (inclusion list), kterou již dříve navrhl Mike Neuder, je, že existuje seznam transakcí, který nějakým způsobem omezuje blok. Takže existuje například seznam pro zahrnutí, který obsahuje transakce A a B, je podepsán někým, koho protokol uznává, a tyto transakce pak musí být zahrnuty do nějakého bloku. FOCIL na tom nic nemění. Staví na tom a jde spíše o to, kdo tento seznam vytváří a jak je jeho dodržování vynucováno.

Kdo tedy tento seznam vytváří? To je první krok fungování protokolu FOCIL. V každém slotu je vybráno 16 validátorů jako členů výboru pro seznamy pro zahrnutí. Každý z těchto členů výboru sleduje mempool a sestavuje svůj vlastní seznam pro zahrnutí. Seznam pro zahrnutí by měl mít velikost přibližně 8 kilobajtů, neboli asi 20 průměrných transakcí, což znamená celkem asi 320 průměrných transakcí.

Druhým krokem je distribuce těchto seznamů pro zahrnutí. Členové výboru pro seznamy pro zahrnutí distribuují své seznamy přes globální téma (global topic) a sami je do bloku nezahrnují. Musí tak učinit před 9. sekundou slotu, kdy atestátoři zmrazí svůj pohled na lokální seznamy pro zahrnutí. Jak uvidíme v dalším kroku, atestátoři jsou ti, kteří tyto seznamy pro zahrnutí skutečně vynucují, jak už název napovídá: seznamy pro zahrnutí vynucované volbou forku (fork-choice enforced inclusion lists). Zmrazí svůj pohled na to, které seznamy pro zahrnutí budou vynucovat, v 9. sekundě, což zabraňuje útokům s rozděleným pohledem (split-view attacks). Producent bloku má stále několik sekund navíc, aby mohl sledovat seznamy pro zahrnutí a zajistit, že nebude negativně ovlivněn tím, že by mu nějaké seznamy chyběly, takže producent bloku v tomto nastavení nenese žádné riziko.

Pak přejdeme k poslednímu kroku, kterým je vynucování. Jak jsem řekl, vynucování se provádí prostřednictvím volby forku. Atestátoři dají hlas bloku pouze tehdy, pokud splňuje podmínku seznamu pro zahrnutí. Dělají to tak, že sledují seznamy pro zahrnutí, které byly odeslány v globálním tématu, vytvoří agregovaný seznam transakcí, které v těchto seznamech viděli, a poté zkontrolují, zda jsou všechny tyto transakce v bloku. Pokud tato kontrola projde, dají bloku hlas. Může také nastat situace, že v bloku nejsou všechny transakce ze seznamů pro zahrnutí, ale blok je plný. V takovém případě atestátoři také dají bloku hlas. Takže atestátoři dají bloku hlas, ledaže by blok neobsahoval dané transakce a zároveň nebyl plný.

Abychom si shrnuli celý mechanismus: v každém slotu je vybráno 16 členů výboru jako členů výboru pro seznamy pro zahrnutí. Ti sledují mempool a vytvářejí objekty seznamů pro zahrnutí, které distribuují přes globální téma před uplynutím lhůty, v tomto případě do 9. sekundy. Tvůrce tyto seznamy pro zahrnutí sleduje a zahrne všechny transakce, které viděl, do svého bloku. Atestátoři pak zkontrolují, zda jsou všechny transakce, které viděli před 9. sekundou v seznamech pro zahrnutí, skutečně v bloku. Pokud tato kontrola projde, dají bloku hlas a přesuneme se k dalšímu slotu, kde se celé toto nastavení opakuje.

#### IL Boost a uncrowdability (11:07) {#il-boost-and-uncrowdability-1107}

**Julian Ma:** Jednou z velkých obav ohledně seznamů zahrnutí (inclusion lists), kterou vyjádřil Mike u předchozího EIP a která zaznívala i během následného vývoje, je „IL Boost“, neboli uncrowdability. Odkazuje to na skutečnost, že navrhovatelé seznamu zahrnutí by mohli chtít prodat svá práva na jeho vytvoření. Je to velmi logická obava, protože to samé vidíme u tvorby bloků: prodej tohoto práva vede k centralizovanému trhu sofistikovaných tvůrců.

Tvrdíme, že FOCIL je vůči těmto trhům podobným MEV-Boost, nebo IL Boost, jak se jim hovorově říká, odolný, a to díky následujícím vlastnostem. FOCIL nezaručuje žádné pořadí transakcí. Bez ohledu na to, kam svou transakci v seznamu zahrnutí umístíte, bude seřazena tak, jak uzná za vhodné tvůrce bloku. Pokud byste do seznamu zahrnuli například arbitrážní transakci, je vysoce nepravděpodobné, že ji tvůrce umístí na začátek bloku, aby se arbitráž skutečně provedla. Místo toho to tvůrce pravděpodobně udělá sám.

Navíc není možný soukromý tok transakcí (private order flow). Tyto seznamy zahrnutí jsou distribuovány přes globální téma, takže vaše transakce jsou veřejné ještě předtím, než tvůrce sestaví blok. Není možné, aby se soukromý tok transakcí dostal do bloku prostřednictvím seznamu zahrnutí.

Zatřetí, na každý slot připadá více navrhovatelů seznamu zahrnutí. I kdyby bylo co cenného prodávat, všech 16 členů výboru pro seznam zahrnutí má stejnou možnost tento seznam vytvořit, takže konkurence mezi těmito navrhovateli by srazila hodnotu na nulu.

A konečně, tyto seznamy zahrnutí se vytvářejí 3 sekundy předtím, než jedná producent bloku. Existují 3 sekundy dodatečných informací, které jsou obvykle pro transakce typu MEV extrémně relevantní a které dorazí poté, co je seznam zahrnutí potvrzen, a předtím, než jedná producent bloku, což znamená, že existuje jen velmi malá informační výhoda. Ve skutečnosti jsou ti, kteří se snaží využít seznamy zahrnutí jako nástroj pro MEV, v informační nevýhodě.

Z těchto důvodů se domníváme, že žádný jednotlivý navrhovatel seznamu zahrnutí nemá pravomoc zahrnovat, řadit nebo vylučovat, což je základní definice MEV. Proto by seznamy zahrnutí neměly podléhat MEV.

#### Shrnutí prezentace (13:09) {#summary-of-the-presentation-1309}

**Julian Ma:** Abych shrnul tuto rychlou prezentaci: FOCIL umožňuje více validátorům přispívat k tvorbě bloku, čímž zabraňuje monopolu na zahrnutí transakcí ze strany jediného navrhovatele a posiluje důvěryhodnou neutralitu Etherea. Věříme, že je nutné implementovat FOCIL nyní, protože v současnosti existují pouze dva dominantní tvůrci, kteří by mohli kdykoli začít cenzurovat, a to z ekonomických důvodů, ze kterých by mohli těžit. Tvorba bloků by mohla nést větší zátěž, protože based rollupy budou chtít využívat sekvenovací vlastnosti Etherea. Spuštění FOCIL proběhne mnohem hladčeji, když je málo cenzurujících stran: zaprvé proto, že to znamená, že pro validátory je výchozím stavem vytvářet seznamy pro zahrnutí, a zadruhé proto, že to znamená menší nestabilitu trhu mezi tvůrci, kteří cenzurují, a tvůrci, kteří necenzurují. A konečně, FOCIL by mohl potenciálně pomoci se škálováním, což je možná téma, do kterého se můžeme ponořit hlouběji.

Děkuji za čas na tuto krátkou prezentaci. Chtěl jsem jen ukázat QR kód, který vede na EIP, pro ty, kteří mají zájem.

**Pooja Ranjan:** Moc děkuji za tuto rychlou prezentaci a přehled návrhu.

#### Q&A: Jak se EIP-7805 liší od EIP-7547? (14:17) {#qa-how-does-eip-7805-differ-from-eip-7547-1417}

**Pooja Ranjan:** Ráda bych začala sekci Q&A úplně první otázkou ohledně dřívějšího návrhu, který byl také zmíněn ve vaší prezentaci: návrh 7547, seznamy pro zahrnutí (inclusion lists), od Mika Neudera. Chci pochopit základní rozdíl mezi tímto návrhem a FOCIL, který máme u 7805. Ve své prezentaci jste se částečně dotkli IL Boost a nepřeplnitelnosti (uncrowdability). Chtěli byste to možná trochu více vysvětlit?

**Julian Ma:** Možná je Thomas nejvhodnější osobou k zodpovězení toho, jak se 7805 liší od 7547, ale mohu k tomu něco málo říct. Za prvé, FOCIL je pro stejný slot, zatímco 7547 byl pro další slot. Vlastnost stejného slotu některé věci usnadňuje, protože to znamená, že seznam pro zahrnutí nemusí být uložen onchain.

Pokud jde o vlastnost nepřeplnitelnosti, ta je velmi zajímavá a subtilní. V rámci 7547, což byl skvělý návrh, na kterém náš návrh staví, je seznam pro zahrnutí bezpodmínečně připojen na konec bloku a vytváří ho jedna osoba. To má několik odlišných vlastností od našeho. Za prvé, transakce jsou seřazeny. Může se stát, že v budoucnu bude velmi cenné mít arbitráž na konci bloku (bottom-of-block arbitrage), a ve skutečnosti některý z Thomasových výzkumů zdůraznil, že by to mohlo být potenciálně cenné místo. Mít práva na vytvoření seznamu pro zahrnutí znamená, že jste poslední osobou, která v bloku jedná, a v některých případech to může být cenné. Za druhé, vytváří ho jedna jediná osoba, takže zde není tento konkurenční efekt mezi členy výboru pro seznamy pro zahrnutí. Výbor o jedné osobě má plné právo zahrnout transakce na konec bloku, což ho může také učinit cennějším. Za třetí, je tu tato bezpodmínečná vlastnost, což znamená, že bez ohledu na to, co udělá producent bloku, vaše transakce bude stejně zahrnuta onchain. Takže to má několik dodatečných záruk nad rámec nezbytného minima pro zahrnutí, které by to mohly do jisté míry učinit cenným.

**Thomas Thiery:** Velkým rozdílem je také počet navrhovatelů seznamu pro zahrnutí, které máme. V předchozím návrhu existoval mechanismus, pomocí kterého navrhovatel slotu n vytvoří seznam pro zahrnutí, který musí navrhovatel slotu n+1 vynutit. Dvě hlavní věci zde: za prvé, je tu zpoždění o jeden slot, takže transakce v seznamu pro zahrnutí musí být zahrnuty až v dalším slotu dalším navrhovatelem. A je tu pouze jeden navrhovatel, který skutečně vytváří seznam pro zahrnutí. S FOCIL jich máme 16. To dělá obrovský rozdíl, protože nyní potřebujeme, aby byl poctivý pouze jeden ze 16 členů výboru IL, aby celý mechanismus fungoval tak, jak má. Znásobuje to vaše šance, že budete mít skutečně dobrý mechanismus odolný vůči cenzuře, zatímco dříve jste se spoléhali na jedinou stranu.

A pak ještě několik techničtějších detailů: existovaly určité nekompatibility s abstrakcí účtu a bylo těžké se vypořádat s ekvivokací IL, což znamená, že někdo odešle dva různé seznamy pro zahrnutí. Ekvivokace bloku je známá věc a je penalizována protokolem, ale protože v předchozím návrhu šlo všechno onchain, museli jste se také vypořádat s podivnými okrajovými případy a nebylo příliš snadné jim vyhovět. S FOCIL seznamy pro zahrnutí nejdou onchain. Jsou pouze vysílány přes P2P síť vrstvy konsensu. Je to trochu technické, ale dělá to velký rozdíl při řešení těchto okrajových případů způsobených abstrakcí účtu nebo útoků, kdy rozdělíte síť na dva pohledy pomocí ekvivokace IL.

**Pooja Ranjan:** Moc vám děkuji. Pro lidi, kteří by se chtěli dozvědět více o návrhu 7547, máme nahranou epizodu s Mikem Neuderem, epizodu 130 PEEPanEIP, která poskytuje přehled na vysoké úrovni. Vždy ráda vidím konkurenční návrhy, protože vím, že je to pro zlepšení ekosystému a řetězce. Vidím, že v chatu je několik otázek. Možná bych ráda pozvala Katayu, aby se podělila o svou otázku.

#### Musí navrhovatel zahrnout všech 16 seznamů? (19:05) {#does-the-proposer-have-to-include-all-16-lists-1905}

**Kataya:** Dobrý den, děkuji. Moje otázka zněla: dostane navrhovatel bloku 16 seznamů k zahrnutí, každý od jednoho člena výboru, a musí zahrnout všechny transakce z těchto seznamů?

**Thomas Thiery:** Ano, přesně tak. Uděláte sjednocení všech transakcí napříč všemi seznamy, v našem případě 16 seznamy. Očividně může dojít k překryvu, takže uděláte sjednocení a odstraníte duplicity, ale ano, všechny transakce ve všech seznamech musí být zahrnuty do bloku, aby jej atestátoři považovali za platný.

**Pooja Ranjan:** Další otázka v chatu je od Justina. Justine, chtěl byste hostům přečíst svou otázku?

#### Transakce ze soukromého mempoolu v seznamech zahrnutí (19:55) {#private-mempool-transactions-in-inclusion-lists-1955}

**Justin:** Kladl jsem už tolik otázek. Chtěl jsem se zeptat, co brání vložení transakce ze soukromého mempoolu do seznamu zahrnutí, a myslím, že to bylo docela dobře zodpovězeno. Zní to, že je to naprosto v pořádku, vzhledem k tomu, že tvůrce je v podstatě stejně seřadí, jak uzná za vhodné, a vaše transakce se stane veřejnou, jakmile se dostane na IL. Takže myslím, že to dává smysl. Děkuji.

**Thomas Thiery:** To byla jedna z úvah, jak zmínil Julian. Opravdu jsme nechtěli, aby se FOCIL a seznamy zahrnutí používaly k zahrnování MEV transakcí, soukromého toku objednávek nebo předběžných potvrzení, protože to, co nakonec chceme, je odolnost vůči cenzuře, a pokud si nedáte pozor, je velmi snadné, aby se mechanismus stal nástrojem pro zahrnování hodnotných transakcí. Skutečnost, že když zahrnete svou transakci do seznamu zahrnutí, automaticky se stane veřejnou, každý ji může vidět, nemá žádné záruky pořadí a tvůrce ji může zahrnout kamkoli do bloku, ji činí nepříliš vhodnou pro hodnotné transakce.

Takže buď máte veřejnou transakci a můžete ji prostě odeslat do veřejného mempoolu, aby byla zahrnuta do seznamu zahrnutí, nebo máte hodnotné soukromé transakce a pak byste nešli přes FOCIL, protože existují lepší způsoby, jak to udělat. Kontaktovali byste přímo tvůrce a poslali ji soukromými kanály.

**Pooja Ranjan:** Děkuji za sdílení. Vidím, že další otázku má Ladislaus.

#### FOCIL a škálování (21:41) {#focil-and-scaling-2141}

**Ladislaus:** Ahoj lidi. Tohle se týká bodu, který jste zmínili ohledně FOCIL a škálování. V poslední době jsem, stejně jako my všichni, zaznamenal nějaké diskuze o škálování Etherea, a jak jste správně zmínili, je tu úzké hrdlo v podobě několika málo tvůrců. Osobně rád vnímám FOCIL jako znovuposílení lokální tvorby bloků a vidím to jako nutnost, která by měla být zakotvena v protokolu předtím, než zvýšíme požadavky na šířku pásma nebo požadavky na uzly obecně. Možná byste mohli přiblížit, jak o tom přemýšlíte, a také další potenciální způsoby škálování, možná i bez FOCIL, jak jste zmínili.

**Julian Ma:** Děkuji za otázku. Nejprve k argumentům pro škálování pomocí FOCIL. V současné době 90 % validátorů outsourcuje tvorbu bloků přes MEV-Boost a tyto sofistikované subjekty mají zjevně větší šířku pásma, než jsou minimální hardwarové požadavky. Mohly by například do svých bloků zahrnout více blobů, aniž by to vedlo k jakýmkoli problémům. Zajímavé však je, že Ethereum spoléhá na lokální tvorbu bloků kvůli důvěryhodné neutralitě neboli odolnosti vůči cenzuře, protože tyto dva sofistikované subjekty nejsou těmi, na kterých by se dala odolnost Etherea vůči cenzuře postavit.

Protokol Etherea tedy musí být stále navržen tak, aby bylo možné provádět lokální tvorbu bloků, a ve skutečnosti jej navrhujeme tak, aby to nebylo ve srovnání s MEV-Boost nevýhodné. To je v designu Etherea, ale v praxi je samozřejmě MEV-Boost mnohem ziskovější: zaprvé proto, že tito sofistikovaní tvůrci bloků mají složitější algoritmy, a zadruhé proto, že mají mnohem více soukromého toku objednávek. Nedávný výzkum od Data Always ukázal, že bloky z MEV-Boost obsahují mnohem více transakcí. Už jen to samo o sobě vede k většímu zisku.

Přesto je protokol navržen tak, aby v rámci jeho pravidel nepůsobily žádné síly, které by činily jednoho validátora méně ziskovým než jiného. Pokud chceme toto pravidlo zachovat, pak je FOCIL nezbytný, protože pak mohou lokální tvůrci bloků přispívat do seznamů pro zahrnutí a tím udržovat odolnost vůči cenzuře. Mohli bychom se však tohoto pravidla také zbavit a v podstatě říct, že lokální tvůrci bloků mohou zahrnout určitý počet blobů, ale sofistikovanější tvůrci bloků by mohli zahrnout více blobů, a to až do takové míry, že by lokální tvůrci bloků tuto zátěž při samotném vytváření bloku nezvládli. Pokud tedy chceme zachovat pravidlo, že maximum je nastaveno podle nejnižších hardwarových požadavků, pak potřebujeme FOCIL. Pokud nám nevadí toto pravidlo zmírnit, pak potenciálně FOCIL pro škálování nepotřebujeme.

**Thomas Thiery:** Je to asi velmi podobné, ale právě teď jsme na Ethereu ve zvláštní pozici, protože spoléháme na sofistikované tvůrce, že vytvoří většinu bloků, ale ti nejsou zrovna ideální pro odolnost vůči cenzuře, protože jde jen o dvě strany. Pokud se z nějakého libovolného důvodu rozhodnou cenzurovat transakce nebo některé adresy, pak v podstatě nemáme odolnost vůči cenzuře ani přístup bez povolení (permissionlessness), což je také velmi důležité. Znamená to, že mohou cenzurovat nebo bránit jakýmkoli aktérům, kterým chtějí, v účasti onchain, což je velmi špatné.

A vlastnosti odolnosti vůči cenzuře, které si udržujeme, nejsou nijak úžasné, že? Vzhledem k tomu, že většinu bloků vytvářejí tito dva tvůrci, musíte v podstatě čekat, až bude zvolen jeden lokální tvůrce bloku a navrhne blok, který bude obsahovat všechny tyto transakce, jež jsou normálně cenzurovány, což není zrovna skvělý pocit. Znamená to, že tito uživatelé budou muset čekat 10, 12, nevím, prostě spoustu bloků, než budou jejich transakce skutečně zahrnuty onchain.

Takže si opravdu chceme udržet domácí stakery a lokální tvůrce bloků, protože právě oni zachovávají odolnost vůči cenzuře. Zároveň dnes ani jejich využívání není ideální, protože stále musíte čekat spoustu času, než bude vaše transakce zahrnuta, pokud je cenzurována těmito dvěma tvůrci. S FOCIL se přesouváme do světa, kde účastníci zaručující odolnost vůči cenzuře, v našem případě členové výboru pro seznamy pro zahrnutí, mohou být odlišní od lidí, kteří vytvářejí bloky. Myslím, že to otevírá velmi zajímavé možnosti, protože se nyní nemusíme spoléhat na naprosto stejného účastníka, že bude jak vytvářet hodnotné bloky, tak přispívat k odolnosti vůči cenzuře. FOCIL lze také považovat za první krok v tomto důležitém směru, protože tu máte dvě velmi odlišné povinnosti a dnes žádáme naprosto stejné uzly validátorů, aby dělaly obojí, což vytváří značné napětí.

**Pooja Ranjan:** Moc vám děkuji. Myslím, že další otázku má Luis.

#### Kritéria pro výběr transakcí (26:46) {#criteria-for-selecting-transactions-2646}

**Luis Pinto:** Připojil jsem se pár minut po začátku, ale připadá mi, že to decentralizuje výběr transakcí v síti jako celku. To je podle mého názoru velmi dobré; bojuje to proti MEV a cenzuře. A rozhodně se mi líbí ta část, že tuto práci dělají atestátoři, protože v budoucnu budou mít nižší hardwarové požadavky než tvůrci, a to tím spíše s bezstavovostí a bezstavovými klienty. Jelikož to budete moci provozovat na velmi slabém hardwaru, dělá to věci velmi decentralizovanými. Hádám, že hlavní výzvou zde je definovat kritéria pro výběr transakcí do těchto seznamů pro zahrnutí (inclusion lists), ať už se rozhodnete pro prioritní poplatky nebo počet blobů; je tu tolik proměnných. Shodli jste se už na nějakém souboru kritérií, která plánujete vynucovat?

**Thomas Thiery:** To je skvělá otázka. Má to dvě roviny. Ta první je velmi důležitá a týká se snahy oddělit atestátory od lidí, kteří tvoří nebo navrhují blok. To je celá ta oblast výzkumu oddělení atestátora a navrhovatele (APS); Julian na tom pracoval docela dost. Říkáme tomu rozdělování rolí, aby více odpovídaly povinnostem protokolu. Napsal jsem příspěvek, který jsem právě sdílel, o možném oddělení, které je velmi otevřené, a uvítal bych k němu od lidí více podnětů. V tomto příspěvku dělám rozdíl mezi atestátory, zahrnovateli, což jsou nyní členové výboru pro IL, a exekučními navrhovateli, neboli tvůrci. Myslím, že to jsou zásadně odlišné povinnosti a možná bychom pro ně měli mít různé role.

Co se týče pravidla pro zahrnutí, to je velmi dobrá otázka. Docela dost jsme o tom přemýšleli a myslím, že jsme dospěli ke dvěma věcem. Ta první je, že chceme rozmanitost pravidel. Nechceme jedno jediné pravidlo, například řazení sestupně podle prioritních poplatků pro všechny klienty, protože pak můžete začít taktizovat a snažit se přeskládat mempool tak, aby do IL byly zahrnuty pouze vaše transakce. Ale pokud máte rozmanitá pravidla, včetně pravidla, které také zohledňuje dobu, po kterou transakce čekala v mempoolu, a různí klienti implementují různá pravidla, všechna v podobném duchu, většinou kolem prioritních poplatků a doby čekání v mempoolu, pak je velmi, velmi těžké to zmanipulovat a protokol to dělá ještě robustnějším. Myslím, že je to také dobrý způsob, jak využít rozmanitosti klientů, kterou dnes na Ethereu máme, a nechat klienty dělat vlastní vyhraněná rozhodnutí. Máme na mysli určitá pravidla, ale myslíme si, že klienti si také mohou vybrat pravidla, která jsou pro ně nejlepší. Dokud nebudou mít všichni úplně stejné pravidlo řazení podle prioritních poplatků, budeme v pohodě.

**Luis Pinto:** Dobře, takže tato kritéria také distribuujete a necháváte ty, kteří tvoří seznamy pro zahrnutí, aby měli svá vlastní kritéria. Nebo to bude součástí protokolu?

**Julian Ma:** Pravidlo pro zahrnutí nebude součástí protokolu. Zaprvé je velmi těžké ho vynutit a zadruhé je vlastně lepší nevynucovat nic. Pokud dovolíme členům výboru, aby se sami rozhodli, nebo necháme týmy klientů jednat jejich jménem v tom, jak zahrnují transakce, pak v síti vytvoříme určitou robustnost. Lidé s různými preferencemi budou provádět zahrnutí různými způsoby, což znamená, že je těžší na systém zaútočit.

**Luis Pinto:** Dobře, děkuji.

#### Kompatibilita s EIP-7702, ePBS a PeerDAS (30:43) {#compatibility-with-eip-7702-epbs-and-peerdas-3043}

**Pooja Ranjan:** Moc vám děkuji. Pokud tomu dobře rozumím, tento návrh je již navržen pro upgrade po Pectra, Fusaka. A vzhledem k tomu, že Fusaka může, ale nemusí zahrnovat některé další EIP, na kterých se pracuje, zajímalo by mě, jaký je stav kompatibility FOCIL s ohledem na návrhy, jako je 7702, což je pro abstrakci účtu, ePBS a PeerDAS.

**Thomas Thiery:** Skvělá otázka. Měli jsme tu trochu výhodu díky historii seznamů pro zahrnutí. Jak jsme zmínili, návrh 7547 byl zvažován pro zahrnutí a poté odmítnut kvůli nekompatibilitám. Takže jsme si dali velký pozor, abychom je vyřešili, než jsme podali nový návrh, protože jsme věděli, že se na to lidé budou dívat se stejnými otázkami, což dává smysl.

Jsme si velmi jistí, protože jsme také mluvili s týmy pro abstrakci účtu a hodně jsme mluvili s Potuzem a Terencem. Terence nám aktivně pomáhal a pracoval jak na ePBS, tak na FOCIL, takže pro nás bylo velmi snadné ověřit, zda je to také kompatibilní. Opravdu si nemyslím, že by existovaly nekompatibility s jakýmikoli jinými EIP. U ePBS si musíte dávat pozor na načasování, protože oddělujete exekuční payload od bloku konsensu, takže se mění celé načasování slotu, a nyní také přidáváte vytváření IL, které musí být provedeno předtím, než je navržen payload. Takže si musíte dávat pozor na načasování, ale pokud si dobře pamatuji, od doby, kdy jsme o tom naposledy mluvili s Potuzem i Terencem, nebyla tam vůbec žádná zásadní nekompatibilita. Myslím, že co se týče kompatibility, vypadá to dobře.

**Pooja Ranjan:** To je dobré vědět. Všimla jsem si, že Jihoon také sdílel HackMD, který přidáme do zdrojů pro lidi, kteří by se chtěli dozvědět více o kompatibilitě konkrétně s ePBS. A ano, pamatuji si z posledního rozhovoru s Mikem, že návrh nebyl zahrnut kvůli nekompatibilitě s abstrakcí účtu. Takže je dobré vědět, že to už bylo vyřešeno.

#### FOCIL a multi-slot MEV (33:04) {#focil-and-multi-slot-mev-3304}

**Pooja Ranjan:** Procházela jsem dokumenty a podrobnosti přidané na web FOCIL, meetfocil.eth.limo, a narazila jsem na termín zvaný multi-slot MEV. Julian také zmínil, že MEV-Boost je obecně ziskový, navzdory přání a úsilí vývojářů udržet ho v rovnováze. Zajímalo by mě, jak tomu FOCIL zabrání.

**Julian Ma:** Děkuji za vaši otázku. Nejprve mi dovolte říci něco o FOCIL a MEV, a pak můžeme přejít k multi-slot MEV. FOCIL nutně nezabraňuje MEV, a to právě proto, že chceme oddělit části týkající se MEV a části týkající se zahrnutí. Podle našeho názoru je důležité to udělat, protože jinak by se objevily trhy typu IL Boost. Z tohoto pohledu, pokud by seznam pro zahrnutí mohl omezit množství MEV, které lze vytěžit, pak by se tvorba seznamu pro zahrnutí stala velmi cennou a lidé by kolem ní začali vytvářet trhy. Náš návrh je tu skutečně od toho, aby poskytoval minimální záruku zahrnutí, což znamená, že není tak cenné být členem výboru pro seznam pro zahrnutí, a je jich 16, což znamená, že neexistuje žádný trh sofistikovaných producentů.

A teď k multi-slot MEV: FOCIL zmírňuje některé problémy, ale neřeší je úplně. To je opět způsobeno touto nekompatibilitou mezi poskytováním odolnosti vůči cenzuře a řešením pro MEV. To, co FOCIL dělá, je, že umožňuje zahrnutí jakékoli transakce, pokud zaplatí poplatky, což do jisté míry řeší multi-slot MEV. Multi-slot MEV v tomto případě znamená, že strana je schopna vytěžit více MEV, pokud kontroluje dva bloky po sobě.

FOCIL zmírňuje některé problémy, protože vám umožňuje vložit vaši transakci. Pokud například potřebujete vložit transakci likvidující nedobytný dluh na nějaké pozici, můžete tak učinit, i když se vás navrhovatel pokusí cenzurovat a v dalším bloku by z vás vytěžil MEV.

Důvodem, proč neřeší všechny problémy, je nepříznivý výběr (adverse selection), ekonomická vlastnost, kdy má jedna osoba více informací než druhá. Jedním z příkladů multi-slot MEV by byla těžba arbitráže přes dva bloky, kdy tvůrce bloku nevytěží arbitráž v prvním bloku, ale udělá to až ve druhém bloku. Existují určité teoretické výsledky, které ukazují, že to může být pro tvůrce bloku ziskovější než těžba arbitráže v obou slotech. Mohli byste si myslet, že zde FOCIL pomáhá, protože arbitražéři by v principu mohli zahrnout svou transakci do seznamu pro zahrnutí, a tím si vynutit určitý druh arbitráže. Ačkoli tomu tak je, pro arbitražéry není motivačně kompatibilní odeslat svou transakci do FOCIL, protože stále uplynou 3 sekundy mezi odesláním jejich transakce a okamžikem, kdy může tvůrce bloku jednat. Pokud se snažíte provést arbitráž a cena se na nějakém externím trhu neustále pohybuje, nechcete se zavázat 3 sekundy předem, protože máte mnohem méně informací než tvůrce bloku, který jedná po vás. Nepříznivý výběr vstupuje do hry, protože tvůrce má více informací: nechá vás vyhrát, pokud je to pro vás nevýhodné, pokud se cena na externím trhu v těch třech sekundách navíc pohnula proti vám, a nechá vyhrát sebe, pokud je to pro něj výhodnější.

FOCIL tedy řeší ty části multi-slot MEV, kde transakce netrpí nepříznivým výběrem. U transakcí, kde dochází k nepříznivému výběru, je to o něco složitější, ale do jisté míry to problém zmírňuje. V principu to zlepšuje situaci oproti současnému stavu, ale stále je na čem pracovat.

**Pooja Ranjan:** Velmi dobře, moc děkuji za sdílení. Chápu, že probíhá spousta výzkumů, které se zabývají problematikou MEV, takže je dobré vědět, že alespoň v principu to pomůže více než současný scénář.

#### Kompromisy a výzvy (36:44) {#trade-offs-and-challenges-3644}

**Pooja Ranjan:** Mám jednu otázku týkající se toho, co Thomas zmínil dříve o IL ekvivokaci. Všimla jsem si, že v části návrhu věnované bezpečnostním úvahám je zmíněno poměrně dost bodů, jako je živost konsensu, IL ekvivokace a tvorba payloadu. Co byste považoval za největší kompromis nebo něco, co by mohlo vyžadovat další výzkum a mohlo by zabránit tomu, aby se tento návrh dostal do dalšího upgradu v současné podobě?

**Thomas Thiery:** Abych byl upřímný, myslím si, že sekce o bezpečnostních úvahách byla hlavně způsobem, jak ukázat, že jsme na bezpečnost mysleli a vyřešili případné obavy. Jde spíše o to, než že bychom měli nezodpovězené otázky ohledně bezpečnostních věcí, o kterých nevíme. Nemyslím si, že by z hlediska bezpečnostních úvah existovaly nějaké velké překážky nebo problémy.

Co se týče kompromisů: pokud se na to podíváte velmi úzce, je pravda, že FOCIL přidává validátorům určité úkoly, a to jak v případě, kdy musí navrhnout seznam pro zahrnutí (inclusion list), tak pro atestátory, když musí zkontrolovat o jednu podmínku navíc, aby se ujistili, že je blok platný podle seznamů pro zahrnutí. Přidává to také malý úkol pro navrhovatele, protože ten se nyní musí ujistit, že jeho payload skutečně obsahuje transakce z IL. Pro mě je to jediný kompromis a tyto úkoly nejsou nijak těžké ani složité. Člen IL výboru pouze monitoruje veřejný mempool a zahrnuje transakce do seznamu, který odešle. Nevyžaduje to žádné zvláštní dovednosti ani sofistikovanost, což je podle mě fajn. Na druhou stranu, jak jsme řekli, by to mohlo odemknout velká vylepšení škálování a lepší oddělení účastníků a povinností v rámci protokolu.

Možná jsem zaujatý, ale nevidím v tom žádné velké kompromisy. Myslím si, že to tak trochu staví všechno na hlavu, pokud jde o odolnost vůči cenzuře. Nyní v podstatě stačí, aby bylo poctivých pouze 15 % sítě, aby všechny transakce, včetně těch, které by mohly být cenzurovány tvůrci, byly zahrnuty do dalšího bloku, což je velmi velké zlepšení. Upřímně si nemyslím, že byste tam dělali spoustu kompromisů.

**Pooja Ranjan:** To je dobré vědět. Ve většině návrhů zjišťujeme, že sekce bezpečnostních úvah neobsahuje buď žádné, nebo jen velmi málo informací, takže je dobré vědět, že v této oblasti proběhl výzkum a jsme si vědomi možných bezpečnostních úvah. Jsem ráda, že to není překážka nebo potenciální výzva pro budoucí implementaci a přijetí.

#### Mechanismy transakčních poplatků pro seznamy zahrnutí (39:50) {#transaction-fee-mechanisms-for-inclusion-lists-3950}

**Pooja Ranjan:** Mám dotaz ohledně některých otevřených otázek, které jsem našla přímo na webu, ohledně mechanismu transakčních poplatků. Zajímalo by mě, jestli jsou nějaké novinky, nebo jestli byste se chtěli podělit o více informací o tom, jaký je nejlepší způsob účtování poplatků a jejich rozdělování za zahrnutí do seznamu zahrnutí.

**Thomas Thiery:** Máme probíhající grant, který se zaměřuje specificky na toto a na motivační mechanismy pro odměňování členů výboru IL (seznamu zahrnutí). Není to snadné. Je to složité, a bez ohledu na to, jak k tomu přistoupíte, jde o velmi velké změny. Změna poplatků na Ethereu, ať už poplatek změníte, přidáte nový, nebo přidáte novou emisi, to všechno jsou velké změny, které vyžadují spoustu zvažování a péče. Ale zkoumá se to a nápady ohledně rozdělování poplatků například mezi členy výboru, kteří zahrnou transakci, se zdají být docela dobré. Má to v podstatě vlastnosti, které chceme, protože chceme odměnit lidi za to, že zahrnou transakce, které by ostatní možná zahrnout nechtěli. Takže o tom docela hluboce přemýšlíme a máme na to probíhající grant.

Je tu také otázka, zda vůbec někdy budeme chtít dávat poplatky členům výboru IL, protože je obzvláště těžké odměňovat menší účastníky, kteří jsou distribuováni po celém světě. Nechcete Sybil útoky a nechcete, aby velcí účastníci s velkým stakem vytlačili ostatní z výboru IL. Jak tomu zabráníte? To je velmi těžké. Takže musíte vzít v úvahu spoustu návrhových aspektů.

Jeden z mých nedávných názorů je: co kdybychom do FOCIL přidali nějaké skvělé funkce, jako je soukromí, takže byste vlastně nemohli vědět, kdo navrhl daný seznam transakcí? Víte, že to byl někdo, kdo byl skutečně vybrán jako člen výboru IL, ale nevíte přesně, kdo navrhl který seznam, takže nemůžete spojit členy výboru IL se sadou transakcí v jejich IL. Pokud bychom to mohli mít a nechat roli výboru IL jako volitelnou (opt-in), pak bychom v protokolu pravděpodobně měli poctivé účastníky spoléhající na altruistické chování a možná bychom vůbec nepotřebovali nastavovat mechanismus poplatků. To je velmi čerstvý, subjektivní názor a právě teď se velmi intenzivně zkoumá. Všechno toto jsou diskuse o „budoucnosti FOCIL“; nemají být zahrnuty do současného EIP.

**Julian Ma:** Jen abych to doplnil, ta poslední část je také velmi důležitá: EIP-7805 nezahrnuje žádný mechanismus transakčních poplatků, aby byla jeho implementace jednodušší. Je to v podstatě ten nejmenší možný způsob, jak můžeme poskytnout vlastnosti odolnosti vůči cenzuře, ale je velmi dobře rozšiřitelný. Zabýváme se tím. Thomas odvedl kus práce při zkoumání oddělených transakčních poplatků pro zahrnovatele a pro navrhovatele. Pak, jak Thomas zmínil, máme probíhající grant se skvělým výzkumníkem z Nethermind, který se zabývá vytvořením mechanismu transakčních poplatků pro FOCIL, a to je velmi slibné. A nakonec proběhla práce na mechanismu transakčních poplatků pro variantu FOCIL zvanou AUCIL, což je návrh seznamu zahrnutí založený na aukcích, který navrhli Sarisht Wadhwa, Fan Zhang a Kartik Nayak společně s několika autory FOCIL, a který hledá způsoby, jak motivovat členy výboru seznamu zahrnutí.

K Luisově dřívější poznámce, motivace je do značné míry o tom, jak jsou seznamy zahrnutí vytvářeny. Znamená to, že protokol chce poskytnout určitý pohled na to, jak by se měli členové výboru seznamu zahrnutí chovat. Obvykle to vede k tomu, že chce, aby určití účastníci dělali různé věci. Může například seřadit členy výboru a přidělit jim určité transakce prostřednictvím korelované rovnováhy, aby mezi členy výboru stále existovalo nějaké odlišné chování. Takže to není součástí současného návrhu, ale rozhodně se tím zabýváme a zapadá to do linie rozšiřitelnosti FOCIL.

**Pooja Ranjan:** Oh, to je zajímavé. Takže bychom se měli těšit na nějaké doplňující návrhy v budoucnu, které vylepší současné funkce FOCIL.

#### Velikost seznamu zahrnutí (44:16) {#inclusion-list-size-4416}

**Pooja Ranjan:** Mám další otázku. Nejsem si jistá, jestli by to mělo být součástí současného návrhu, ale zajímalo by mě, jestli je nějaká novinka ohledně velikosti IL. Seznamy zahrnutí (inclusion lists) musí mít pravděpodobně omezenou velikost, aby se zabránilo nadměrnému využití šířky pásma. Máme nějaký další výzkum nebo novinky o tom, jak lze určit optimální velikost seznamu zahrnutí?

**Thomas Thiery:** Ve specifikaci máme nyní pevnou velikost a už tam nějakou dobu je: 8 kilobajtů. Uvedli jsme to v kilobajtech, protože to, co FOCIL a IL skutečně spotřebovávají, je šířka pásma, a to je v podstatě vše. Pokud vezmete medián velikosti transakce, dostaneme se na zhruba 40 transakcí na IL, a pokud jsou všechny transakce unikátní, je to asi 640 transakcí, které by se daly zkombinovat dohromady napříč všemi 16 členy výboru.

Nevím, jestli je potřeba dělat příliš mnoho výzkumu ohledně přesné optimální velikosti. Rozhodli jsme se pro toto: 16 krát 8 kilobajtů je v podstatě velikost blobu, takže to dohromady není obrovské množství šířky pásma. A protože kombinace transakcí napříč IL je větší než blok, nemyslím si, že bychom tam narazili na problémy.

Do budoucna by se velikost IL mohla zvětšit, ale také by se dalo zvážit zvýšení počtu členů výboru IL. To vám dává ještě větší šanci získat jednoho poctivého člena výboru IL, pokud se většina sítě rozhodne začít cenzurovat. Takže to je také něco, co bychom mohli udělat. Prozatím se zdá, že 16 bude naprosto v pořádku a dostatečné, ale v budoucnu si s těmito parametry rozhodně můžete pohrát, pokud se cenzura vymkne kontrole, nebo pokud budeme muset podniknout další kroky.

#### Metriky pro sledování adopce (46:39) {#metrics-to-track-adoption-4639}

**Pooja Ranjan:** Jen doplňující otázka: máte na mysli nějaké metriky, které můžeme sledovat, abychom porozuměli adopci nebo úspěchu tohoto návrhu?

**Julian Ma:** To je skvělá otázka. Dovolte mi rychle odpovědět a pak předám slovo Thomasovi. Některé jednoduché metriky jsou prostě to, kolik seznamů pro zahrnutí (inclusion lists) je navrženo jako neprázdných. A můžete si představit dashboardy, jako je série „.pics“ od Toniho Wahrstättera, kde je to možná trochu propracovanější a těmto seznamům pro zahrnutí se přiřazuje nějaké měřítko kvality. V principu však stačí, aby pouze jedna osoba na slot vytvořila správný seznam pro zahrnutí, aby byla zajištěna odolnost vůči cenzuře.

Myslím, že je to tak důležitý bod, že je důležité implementovat FOCIL brzy, protože teď jsme v takovém magickém režimu, kdy tvůrci bloků příliš necenzurují a validátoři také příliš necenzurují. Řekl bych, že je to velmi křehké. Až doteď tvůrci bloků cenzurovali po dlouhou dobu, a pokud zavedeme FOCIL nyní, máme možnost z toho udělat standard, který všichni tito validátoři přijmou a budou vytvářet smysluplné seznamy pro zahrnutí. Protože tvůrci bloků necenzurují, nevzniká zde žádná nestabilita trhu. Pokud počkáme, až se mezi tvůrci objeví cenzura, bude mnohem těžší FOCIL zavést a dokážu si představit, že všechny metriky, které by se použily k měření adopce, by byly mnohem horší.

**Thomas Thiery:** Další klíčovou metrikou, na kterou je třeba se zaměřit, je doslova zpoždění zahrnutí pro veřejné transakce v mempoolu. Vezmete všechny transakce, které čekají ve veřejném mempoolu, a podíváte se, jak rychle jsou zahrnuty. Pokud FOCIL funguje, budou všechny zahrnuty v dalším bloku. Pokud ne, znamená to, že velká část validátorů cenzuruje. Takže další metrikou, na kterou se můžeme podívat, je to, kdo cenzuruje a jaká část sítě cenzuruje. Budeme mít dashboardy a velmi transparentní metriky, abychom to mohli sledovat, protože to je v podstatě to, co má FOCIL dělat. Pokud veřejné transakce nejsou zahrnuty v dalším bloku, znamená to, že velmi velká část sítě tyto transakce ve skutečnosti cenzuruje.

**Pooja Ranjan:** Velmi zajímavé. Takže to je možná něco pro výzkumníky: možný seznam přání pro upgrady, že by vývojáři měli sdílet dashboardy a nástroje pro sledování metrik pro daný návrh, kdykoli je zahrnut do upgradu sítě.

#### Stav implementace klientů (49:11) {#client-implementation-status-4911}

**Pooja Ranjan:** Jak zmínil Julian, tento návrh možná bude nutné implementovat co nejdříve. Jsem zvědavá, jak jsme na tom s implementací klientů, protože si pamatuji, že na posledním hovoru o testnetech Paritosh zmiňoval přidání nějaké podpory s devnety. Takže jak na tom jsme?

**Thomas Thiery:** Jde nám to docela dobře. Především bylo super vidět, jak se lidé chopili implementační části FOCIL, protože já nejsem vývojář, jsem výzkumník. S vývojáři spolupracuji od začátku, ale nejsem ten, kdo by věci implementoval do klientů.

Ti, kteří to vedli, byli tři: máme Terence z Prysm a Jihoona, který Terencovi hodně pomáhal s Prysm, ale pracoval také na Geth. Takže teď máme fungující devnet pro Prysm a Geth, což je skvělé, a probíhá spousta testů. Nyní se také snažíme, aby byl FOCIL zobrazen a viditelný v průzkumníku Dora. Pak je tu Jacob, který pracoval na Lighthouse a Reth, a vím, že tam stále probíhá nějaké úsilí. Lodestar byl v poslední době velmi aktivní; myslím, že jsou velmi blízko k tomu, aby měli fungující devnet. Dnes jsme měli zprávy od Nethermind, že mají prototyp, což je super. Mám pocit, že na některé zapomínám... Nimbus se také přidává, říká Jihoon. To je opravdu skvělé.

Celkově máme připraveno a spuštěno stále více devnetů, lokálních devnetů a stále více kombinací mezi klienty exekuční vrstvy a vrstvy konsensu. Došlo k opravdu dobrému pokroku a je hezké to vidět, protože všichni víme, že vývojáři jsou teď docela zaneprázdněni s blížící se aktualizací Pectra a už pracují na PeerDAS a dalších věcech. Bylo opravdu skvělé vidět, jak lidem na Ethereu celkově hodně záleží na odolnosti vůči cenzuře. Většina týmů, které jsem specificky neoslovil, se prostě k úsilí připojila a nyní pracují na devnetech a testování.

**Pooja Ranjan:** Děkuji za sdílení. Těším se na sledování novinek ohledně devnetů. Nejsem si jistá, kolik iterací tohoto devnetu bude, ale jsem nadšená, že se to blíží. Vidím, že Justin tu má otázku. Justine, prosím, pokračuj.

#### FOCIL ve Fusaka nebo Glamsterdam? (52:07) {#focil-in-fusaka-or-glamsterdam-5207}

**Justin:** Dobrá, na tohle se připoutejte. Zmínil jsi velmi dobrý postřeh, že nejlepší čas řešit cenzuru je ještě předtím, než k ní dojde, že? Takže: FOCIL ve Fusaka, nebo to může počkat na Glamsterdam? A co bych měl jako vývojář prosazovat?

**Thomas Thiery:** Otevřeli jsme PR a bylo sloučeno, přičemž FOCIL je navrhován pro Fusaka. Myslíme si, že by se měl dostat do Fusaka. Část důvodu je ta, že někteří klienti na něm už začali pracovat a nenarazili na příliš mnoho překážek. Není to jako jiné návrhy, které je mnohem těžší implementovat a vyžadují mnohem více práce. A není to ani příliš kontroverzní. Nemyslím si, že by někdo bojoval proti odolnosti vůči cenzuře, a všichni tak nějak souhlasí, že to musí být zahrnuto co nejdříve. Takže já bych byl pro Fusaka.

Nevím, jestli to může počkat, nebo ne. Návrhy a upgrady mohou počkat vždycky. Jen se chci vyhnout světu, ve kterém nebude tak snadné tyto změny implementovat. Věci se mohou velmi rychle obrátit. Jak jsme viděli, šlo to i opačným směrem: před několika měsíci jeden z hlavních tvůrců zničehonic přestal cenzurovat. Ptali jsme se proč a odpověď zněla: „jo, prostě jsme se rozhodli, že nebudeme.“ V tomto případě to bylo dobře, protože to bylo k lepšímu, ale může se to úplně zvrátit zpět, a pak bychom tu mohli mít dva tvůrce, kteří by cenzurovali některé transakce, a byli bychom zpátky ve velmi špatné situaci.

Další věc, kterou chci zmínit, protože si myslím, že je důležitá: pokud se vydáme směrem k některým věcem, o kterých jsme mluvili, jako je APS, kde můžete skutečně oddělit atestátora a navrhovatele pomocí některých návrhů, na kterých jsme pracovali, musíme mít FOCIL zavedený ještě předtím a musíme vědět, že FOCIL funguje. Potřebujeme FOCIL na Mainnetu po dobu šesti měsíců, roku, abychom si byli skutečně jisti, že plní svůj účel, kterým je udržování a zlepšování vlastností Etherea z hlediska odolnosti vůči cenzuře. Takže další naléhavost, alespoň pro mě, spočívá v tom, že pokud chceme ochránit atestátory před hrami s načasováním a některými dalšími obavami, ke kterým se chceme dostat s APS, potřebujeme FOCIL co nejdříve.

**Pooja Ranjan:** Někdy je smutné vidět, když návrhy nejsou vybrány pro další nebo nejbližší upgrade, ale do jednoho upgradu lze zahrnout jen omezené množství návrhů. Opravdu si vážím veškeré tvrdé práce, která stojí za předložením návrhu, jeho připraveností i testováním, které s tím souvisí. Takže vám moc děkuji za veškerou práci, kterou děláte pro ekosystém Etherea.

#### Bleskové otázky (55:18) {#rapid-fire-5518}

**Pooja Ranjan:** Než to uzavřeme, máme tu rychlé kolo bleskových otázek. Jedinou podmínkou je, že odpověď by měla být jedním slovem nebo jednou větou, a zkusíme to na čas, možná 30 sekund na každou. Pokud jste připraveni, pojďme na to a začneme s Julianem. Co je momentálně nejtěžším problémem ve výzkumu blockchainu?

**Julian Ma:** Nebudu z toho dělat meme, takže odpovím vážně. Řekl bych, že nejtěžším problémem je budoucnost stakingu: co budoucnost stakingu znamená, jaké role plní jednotliví poskytovatelé služeb, jak jsou za to odměňováni a jaké jsou mezi nimi vztahy.

**Pooja Ranjan:** Jaký je jeden případ užití blockchainu, který nebyl dostatečně prozkoumán?

**Julian Ma:** Řekl bych, že FOCIL.

**Pooja Ranjan:** Co je dnes největším bezpečnostním rizikem pro Ethereum?

**Julian Ma:** Upřímně bych řekl, že odolnost vůči cenzuře je zde velmi kritická, kvůli věcem jako multi-block MEV, které by mohly představovat obrovská bezpečnostní rizika, například pro L2.

**Pooja Ranjan:** Mělo by být MEV minimalizováno, přijato, nebo něco mezi tím?

**Julian Ma:** V tomto do značné míry souhlasím s postojem Flashbots, že by mělo být demokratizováno, což znamená, že by mělo být maximalizováno tam, kde je to nutné, a minimalizováno na aplikační vrstvě.

**Pooja Ranjan:** Stojí decentralizace vždy za ty kompromisy?

**Julian Ma:** Většinou za ty kompromisy stojí.

**Pooja Ranjan:** Jaká je největší inovace, kterou Ethereum přineslo světu?

**Julian Ma:** Zde bych rád citoval přednášku Mika Neudera z Devconu o digitálních vlastnických právech. Řekl bych, že jsou to digitální vlastnická práva odolná vůči cenzuře, která skutečně mění svět.

**Pooja Ranjan:** Moc děkuji, velmi dobře zodpovězeno. Moje další sada otázek je pro Thomase. Takže, kdyby Ethereum neexistovalo, na kterém blockchainu bys pracoval?

**Thomas Thiery:** Myslím, že z toho udělám velký meme, a Julian mě trochu vypekl, protože jsem si myslel, že udělá to samé. Ten blockchain by byl FOCIL.

**Pooja Ranjan:** Jaký je nejpřeceňovanější případ užití blockchainu?

**Thomas Thiery:** Žádný případ užití nestojí za ten humbuk bez FOCILu.

**Pooja Ranjan:** Jaká je jedna věc, kterou musí Ethereum co nejdříve zlepšit?

**Thomas Thiery:** Odolnost vůči cenzuře, pomocí FOCILu.

**Pooja Ranjan:** Jedno slovo, které by popsalo decentralizaci?

**Thomas Thiery:** FOCIL.

**Pooja Ranjan:** Myslíš si, že Ethereum plně vyřeší škálovatelnost?

**Thomas Thiery:** Ethereum s FOCILem, ano.

**Pooja Ranjan:** Škálování vrstvy 1 nebo škálování vrstvy 2, co vyhraje?

**Thomas Thiery:** Nekonečno vrstev, všechny s FOCILem.

**Pooja Ranjan:** Velmi dobře, moc děkuji, Thomasi. Děkuji za zodpovězení všech těchto otázek. Když už to uzavíráme, ráda bych vám dala tuto příležitost: pokud máte nějaký vzkaz pro komunitu ohledně tohoto návrhu, nebo pro komunitu Etherea obecně.

#### Vzkazy komunitě (58:08) {#messages-to-the-community-5808}

**Thomas Thiery:** Vlastně je to velmi důležitý bod, protože neustále vedeme aktivní diskuse a vše je veřejné na Discordu. Na začátku byla snaha udělat to všechno veřejné a lidé to tak skutečně dělají, z čehož mám velkou radost. Diskuse a pokrok můžete sledovat na veřejném Discordu Eth R&D, v kanálu inclusion-list. Tam se teď v podstatě všechno odehrává. Dále se nám můžete ozvat na Twitteru, Telegramu, prostě kdekoli. Neváhejte.

Čím více lidí oslovíme a zapojíme, tím lepší bude návrh a tím lepší bude i implementace. Takže pokud můžete jakkoli pomoci, ozvěte se a my vám rádi pomůžeme na všech frontách, dokonce i v oblasti výzkumu. Myslím, že je pro nás ještě vhodnější spolupracovat s lidmi, kteří chtějí pracovat na budoucnosti FOCILu. Zmínili jsme soukromí, zmínili jsme mechanismy transakčních poplatků a také se budeme hodně soustředit na FOCIL pro bloby. Všechny tyto věci vyžadují lidi a výzkumné úsilí. Pokud máte zájem, ozvěte se. Moc děkujeme za pozvání a díky také za veškerou práci, kterou děláte pro Ethereum.

**Julian Ma:** Jen bych k tomu dodal, že doufám, že jsme pro FOCIL někoho nadchli. Pokud jste nadšení, dejte nám prosím vědět. A pokud máte ještě nějaké otázky, rádi vám je zodpovíme a doufáme, že vás přesvědčíme, že FOCIL je skutečně ta správná cesta. Moc vám děkuji. Bylo mi opravdu potěšením tu být a děkuji za uspořádání tohoto setkání. A samozřejmě děkuji také všem za účast.

#### Závěrečná slova (59:52) {#closing-words-5952}

**Pooja Ranjan:** Děkuji. To je pro dnešek vše. Obrovské díky patří Thomasovi a Julianovi, že se k nám dnes připojili a podělili se o své poznatky o EIP-7805. Děkuji všem účastníkům; vaše dotazy jsou povzbuzující a poučné. Děkujeme za sledování. Pokud se vám tento rozhovor líbil, nezapomeňte dát like, odebírat a sdílet tuto epizodu s dalšími nadšenci do Etherea. V rámci PEEPanEIP vám přineseme další EIP a pokroky ve výzkumu. Do příště, nepřestávejte příst nad novými znalostmi a prozkoumávat Ethereum s Ethereum Cat Herders. Užijte si zbytek dne.