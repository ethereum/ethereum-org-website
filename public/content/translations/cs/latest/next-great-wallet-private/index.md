---
title: "Další skvělá peněženka bude chránit soukromí"
description: "Vaše peněženka vidí každou adresu, kterou držíte, každou decentralizovanou aplikaci (dapp), ke které se připojíte, a každý požadavek, který vznesete. Stejná pozice jí umožňuje to všechno chránit. Praktický pohled na nástroje pro ochranu soukromí, výchozí nastavení a dosud nevydané nápady, které budou definovat další generaci peněženek na Ethereu."
author: "Elliott Alexander"
team: ""
tags:
  - "soukromí"
  - "peněženky"
  - "důkazy s nulovou znalostí"
published: 2026-07-02
image: /images/developers/blog/latest-post-header-1.png
breadcrumb: "Další skvělá peněženka"
lang: cs
---

Udělejte si obrázek o dvou minutách, které strávíte ve své peněžence. Otevřete aplikaci, podíváte se na svůj zůstatek, připojíte se k decentralizované aplikaci (dapp), kterou jste chtěli vyzkoušet, schválíte transakci, kterou vám předloží, a pošlete příteli ETH, které mu dlužíte za oběd.

Nic z toho nepůsobí tak, že by vás někdo sledoval. Nikdo se neptal na vaše jméno. Zavřete aplikaci a pokračujete ve svém dni.

Nyní si spočítejme, co ve skutečnosti uniklo. Při spuštění, ještě než jste cokoli udělali, se hromada analytických služeb dozvěděla vaši IP adresu a to, že používáte tuto peněženku. Server, přes který vaše peněženka čte řetězec, viděl každou adresu, kterou držíte, dotazovanou z jedné IP adresy – vaše celé portfolio, úhledně seskupené pro kohokoli, kdo uchovává logy. Dapp získala vaši aktivní adresu, což je vše, co kdokoli potřebuje k vyhledání její celé historie. A platba vašemu příteli je trvalý veřejný záznam, který spojuje vaši peněženku s tou jeho.

Každý z těchto úniků prošel stejným kusem softwaru. Peněženka načetla analytiku, vybrala daný server, předala adresu, sestavila transakci. Ale stejná pozice je dvousečná zbraň: vrstva, která vidí všechno, je zároveň vrstvou, která může všechno chránit.

Mnoho peněženek má obchodní modely založené na shromažďování těchto informací, ale existují způsoby, jak to dělat, aniž by byli uživatelé vystaveni riziku. Část toho, co je k tomu potřeba, leží ladem, funguje a je ignorována. Na část z toho ještě nikdo nepřišel. Obě poloviny představují příležitost a ten, kdo se jich chopí, buduje další skvělou peněženku.

## Co vaše peněženka prozrazuje onchain {#what-your-wallet-gives-away-onchain}

Začněme onchain, s tím, co je veřejné bez ohledu na to, jakou peněženku používáte. Adresa nenese žádné jméno a už jen tento samotný fakt přináší velkou úlevu. Ale každá platba, kterou jste obdrželi, každý kontrakt, se kterým jste přišli do styku, velikost vašeho zůstatku v daném okamžiku a úplný seznam všech, se kterými jste kdy provedli transakci, leží na očích a kdokoli si je může svobodně vyhledat. Pseudonymita znamená jen to, že je to zařazeno pod zástupným identifikátorem místo vašeho jména.

Standardní obranou je rozložení vaší aktivity na několik adres, což většina zkušených uživatelů dělá. Pomáhá to méně, než by se mohlo zdát. Zafinancujte dvě adresy ze stejného zdroje, nebo je nechte, ať si navzájem jednou zaplatí, a pro kohokoli, kdo provádí shlukovou analýzu (cluster analysis), se spojí do jediné entity.

Už v roce 2020 dokázala [studie](https://fc20.ifca.ai/preproceedings/31.pdf) prvních čtyř let Etherea seskupit 17,9 % všech aktivních externě vlastněných účtů, čímž odhalila více než 340 000 entit ovládajících více adres. To bylo před šesti lety a jedním boomem umělé inteligence. Vaše pečlivé oddělování je jen pár kroků od toho, aby bylo zmařeno.

Dříve nebo později se tento shluk spojí se skutečnou osobou. Zaregistrujte si ENS jméno, které odráží vaši přezdívku na sociálních sítích, proveďte jeden výběr z burzy, která má sken vašeho pasu, nebo přijměte platbu od někoho, kdo si vede označené adresy v tabulce, a shluk přestane být abstraktní.

Úniky dat také hrají svou roli – e-mail uniklý spolu s adresou bydliště, spárovaný s ENS jménem, které vypadá jako onen e-mail. Nic z toho už nevyžaduje soudní příkaz ani specialistu. Umělá inteligence proměnila prohledávání milionů záznamů kvůli jedné dobré shodě v práci, která proběhne přes noc, a náklady na ni neustále klesají.

## Co vaše peněženka prozrazuje předtím, než provedete transakci {#what-your-wallet-gives-away-before-you-transact}

Onchain stopa alespoň vyžadovala, abyste provedli transakci. Ta offchain začíná dříve. Na začátku roku 2026 jeden výzkumník [prohnal třináct populárních peněženek přes analyzátor paketů (packet sniffer)](https://www.theopensourcepress.com/crypto-wallet-ip-exposure-scorecard-2026/) na čistém zařízení a zaznamenal, co každá z nich udělala při prvním spuštění, ještě předtím, než existoval jakýkoli účet. Průměrná peněženka kontaktovala asi čtrnáct domén. Ta nejhorší kontaktovala 26 domén na 41 IP adresách, včetně volání infrastruktury pro zjištění zůstatku u tří různých poskytovatelů, a to u uživatele, který si ještě ani nevytvořil peněženku. Další peněženka v testu obsahovala službu pro fingerprinting zařízení spolu s osmi subdoménami pro marketingovou atribuci.

Všechno to jsou běžné opory spotřebitelských aplikací – analytika, hlášení pádů, marketingová atribuce – ale tohle není Candy Crush, je to aplikace, jejímž hlavním tahákem je samosvrchovanost. Stejný test našel [jednu peněženku](https://cakewallet.com/), která při prvním spuštění neodeslala vůbec nic: nula paketů, nula DNS požadavků. Nic na peněžence nevyžaduje takovéto "žvanění".

Pak je tu únik, který se nikdy neuzavře. Vaše peněženka neuchovává kopii řetězce; kdykoli čte zůstatek nebo odesílá transakci, dotazuje se serveru zvaného poskytovatel RPC (Remote Procedure Call). Pokud neprovozujete vlastní uzel, každý požadavek prochází jedním z nich a výchozí poskytovatel vidí váš úplný seznam adres, vaši IP adresu a načasování všeho, co děláte. Spárování této IP adresy se jménem předplatitele je pro vládu rutinní žádostí o záznamy.

Když výchozí poskytovatel MetaMasku [v roce 2022 přiznal](https://www.coindesk.com/business/2022/12/06/consensys-to-update-metamask-crypto-wallet-in-response-to-privacy-backlash), že logoval IP adresy spolu s adresami peněženek, odpor komunity ho donutil [zkrátit dobu uchovávání na sedm dní](https://consensys.io/blog/consensys-data-retention-update). Čest tomu, komu čest náleží, ale tato náprava je pouze interním pravidlem a architektura pod tím zůstává nezměněna: jeden server stále přijímá každý váš požadavek. A takový log nemusí být ani vyžádán, aby napáchal škody; stačí, že existuje. Databáze jsou narušovány, prodávány a potichu slučovány s jinými a log, který sám o sobě nic neznamenal, s vámi může být spojen roky poté, co byl zapsán.

Na celé této vrstvě je třeba si všimnout toho, že uživatel z ní nikdy nic nevidí. Odeslání peněz vám alespoň předloží potvrzovací obrazovku; metadata žádnou obrazovku nemají. Nikdo neschvaluje, aby jeho seznam adres cestoval s jeho IP adresou, a žádná výzva k podepisování nepokrývá analytiku.

Tato výchozí nastavení vzešla ze standardní příručky spotřebitelských aplikací – solidní infrastruktura, užitečná hlášení o pádech, metriky růstu – aplikovaná bez většího rozmyslu na aplikaci, která drží peníze lidí. Což je ta povzbudivá část: každý únik zmíněný v této části lze vysledovat zpět k rozhodnutí, které může tvůrce peněženky učinit.

## Kdo se dívá {#whos-looking}

Začněme u přihlížejících, které byste chtěli nejméně. Zločinci přišli na to, že veřejná účetní kniha funguje také jako katalog lidí, kterým lze úspory vzít násilím. Útoky francouzským klíčem (wrench attacks) – loupeže, při kterých je klíč získán násilím nebo hrozbou násilí – [vyskočily v roce 2025 o 75 %](https://www.coindesk.com/markets/2026/02/02/crypto-crime-is-getting-violent-wrench-attacks-jumped-75-in-2026) a oběti ztratily jen [za první čtyři měsíce roku 2026 přibližně 101 milionů dolarů](https://cointelegraph.com/news/europe-crypto-wrench-attacks-losses-101m-certik-report). A vzorec se posunul směrem k tomu, co vyšetřovatelé nazývají cílení na základě dat (data-driven targeting), kdy útočníci profilují držbu oběti onchain ještě předtím, než vůbec zaklepou. Ve více než polovině nedávných incidentů se dostali k manželovi/manželce, dítěti nebo rodiči jako k páce. Zůstatek v peněžence, který lze vysledovat až k vašim vchodovým dveřím, je pro zločince trvalou pozvánkou.

Pak jsou tu přihlížející s odznaky. Transparentní účetní kniha je sledovací systém, který žádná vláda nemusí budovat: kompletní záznam o tom, kdo komu zaplatil, kdy a kolik, ležící na veřejnosti, vzdálený jeden dotaz bez nutnosti soudního příkazu. Jak moc by vás to mělo znepokojovat, závisí na tom, kdo vám vládne, a pro miliony lidí je odpovědí vláda, která trestá dar opoziční straně, předplatné VPN nebo úspory držené v měně, kterou stát nemůže natisknout.

Pro tyto uživatele je finanční odhalení modelem hrozby a výchozí nastavení peněženky rozhodují o tom, jak moc jsou odhaleni.

Oba druhy přihlížejících dostávají stejné vylepšení. Umělá inteligence zlevňuje sledování každým rokem a vše, co kdy bylo zapsáno do řetězce, zůstává zapsáno, dostupné pro jakoukoli novou analytickou techniku, která přijde příště. Nic z toho není obžalobou veřejné účetní knihy; transparentnost je to, co umožňuje komukoli ověřit řetězec. Odhalení spočívá ve stopě, která spojuje záznam s vámi – vzorce financování, opakovaně použité adresy, logy serverů.

Peněženky zatím tuto stopu ponechávaly na místě, protože její ponechání je cestou nejmenšího odporu, jak pro software, tak pro uživatele. Je to také přesně ta věc, kterou má peněženka nejlepší předpoklady rozpustit.

## Proč je peněženka místem, kde se řeší soukromí {#why-the-wallet-is-where-privacy-gets-fixed}

Je namístě se ptát, proč je něco z toho úkolem peněženky. Probíhají [aktivní průzkumy směrem k ochraně soukromí](https://ethresear.ch/t/ethereum-privacy-the-road-to-self-sovereignty/22115) na základní vrstvě Etherea a protokol může nakonec nést část této zátěže. Ale řetězec se aktualizuje prostřednictvím hard forků, v nejlepším případě dvou ročně, a změny týkající se soukromí se rozloží do několika z nich. To je časová osa měřená v letech a rozhodovaná procesem, který by se neměl uspěchat.

Mezitím se jednotlivci právě teď rozhodují, zda je bezpečné nechat si platit onchain, darovat, držet tam úspory. Potřebují soukromí, které dorazí rychleji, než může poskytnout proces sociálního konsensu Etherea a plán forků.

Aplikační vrstva má pro tento problém špatný tvar. I kdyby každá decentralizovaná aplikace (dapp) dodala svou vlastní funkci ochrany soukromí, každá by mohla chránit pouze aktivitu uvnitř svých vlastních zdí, svým vlastním způsobem, se svými vlastními zvláštnostmi a tajemstvími, která by uživatel musel spravovat. To, co vás odhaluje, jsou spojení probíhající napříč všemi z nich – sdílené adresy, stopy financování, odkazy zpět na vás – a tato spojení žijí v prostoru mezi aplikacemi. Řešit soukromí aplikaci po aplikaci znamená řešit ho všude kromě místa, kde problém skutečně je. Dapps nejsou místem, kde může žít skutečné řešení.

Zbývá tedy peněženka. Je to ten jediný kus softwaru, který vidí každou dapp, ke které se připojíte, každou adresu, kterou ovládáte, a každý požadavek, který vznesete. Stejná viditelnost, která dělá děravou peněženku tak nákladnou, je to, co umožňuje té pečlivé koordinovat soukromí napříč vším, co děláte: vybírat, která adresa čelí které aplikaci, směrovat čtení tak, aby žádný server nezískal celý obrázek, a provádět účetnictví, které protokoly pro ochranu soukromí vyžadují.

A tyto protokoly jsou dále, než většina tvůrců předpokládá. [Railgun](https://railgun.org/) zpracoval více než [5 miliard dolarů v kumulativním objemu](https://dune.com/railgun_project/railgun) a dnes drží kolem [80 milionů dolarů](https://defillama.com/protocol/railgun), nástroje pro skryté adresy (stealth addresses) jako [Umbra](https://www.techflowpost.com/en-US/article/30477) vygenerovaly desítky tisíc jednorázových adres a podle [jednoho sčítání](https://wublock.substack.com/p/ethereum-privacys-https-moment-from) více než 35 týmů sleduje přes tucet různých přístupů k privátním převodům.

Nic z toho zatím není mainstream a některé kousky skutečně chybí. Ale protokoly fungují, pohybují se přes ně skutečné peníze a to, co jim chybí, je místo v hlavním toku uživatele. Právě zde nastupuje prozíravá peněženka.

## Co peněženka chránící soukromí vlastně dělá {#what-a-privacy-preserving-wallet-actually-does}

Odmyslete si žargon a většina práce na ochraně soukromí je účetnictví. Použijte novou adresu tady, nasměrujte vklad tamtudy, hlídejte tuto poznámku, počkejte před výběrem, nikdy nedovolte, aby se tyto dva účty dotkly. Je to disciplína, ve které jsou lidé špatní a pro kterou je software stvořen, a dnes leží téměř výhradně na uživateli.

Peněženka chránící soukromí je taková, která dělá účetnictví sama, místo aby ho nechávala na uživateli. Uživatel se rozhodne, co chce udělat; peněženka se postará o to, aby to nezanechalo žádnou stopu vedoucí zpět k němu.

Začněme tím, co je v provozu. Chráněné fondy (shielded pools) fungují už dnes: Railgun udržuje privátní zůstatek vedle vašeho veřejného, a jakmile jsou prostředky uvnitř, platba ven neprozradí nic o vašich dalších aktivech. Náklady jsou reálné – vyšší poplatky než u běžného převodu, generování důkazu měřené v sekundách, určitá závislost na relayerech – ale protokol přenesl miliardy v objemu i s těmito kompromisy.

Spojte to se zvykem, pro který není potřeba žádný protokol: nová adresa pro každou protistranu. Když se uživatel připojí k nové dapp, peněženka pro ni může nabídnout vyhrazenou adresu, financovanou z chráněného zůstatku, takže aplikace vidí účet bez historie a bez sourozenců. Skryté adresy ([ERC-5564](https://eips.ethereum.org/EIPS/eip-5564)) rozšiřují stejný krok na přijímání plateb. Mixéry jako [Tornado Cash](https://tornadocash.eth.limo/) a [Privacy Pools](https://privacypools.com/) dělají jednodušší, užší práci: prostředky vstoupí z jedné adresy a vystoupí na jinou, přičemž spojení mezi nimi je přerušeno. To je nástroj pro financování nové adresy, kterou k vám nikdo nemůže vysledovat – a chybějícím kouskem je peněženka, která takovou adresu vytvoří na požádání, místo aby tento rituál nechala na uživateli. Nic z toho nečeká na hard fork nebo výzkumný grant. Čeká to na peněženku ochotnou nést účetnictví jménem uživatelů.

Síťová stránka je většinou o rozhodnutích. Vydat aplikaci s nulovou analytikou třetích stran je volba a minimálně jedna peněženka na trhu ji už učinila. Pokud jde o vystavení RPC, většina peněženek vám již umožňuje změnit poskytovatele, takže tato možnost existuje, zastrčená na stránce nastavení, kterou navštěvují pokročilí uživatelé a všichni ostatní ji nikdy nenajdou.

Dosud nerealizovaným krokem je oddělení: přiřadit různé poskytovatele k různým adresám, aby žádný server nikdy neviděl celý seznam, a vložit proxy mezi peněženku a poskytovatele, aby IP adresa a adresy nikdy necestovaly společně. Lehký klient jako [Helios](https://github.com/a16z/helios) nebo [Colibri](https://github.com/corpus-core/colibri-stateless) umožňuje peněžence ověřit odpovědi, které dostává, místo aby jim slepě věřila. Každá z těchto věcí něco stojí na infrastruktuře, latenci nebo inženýrském čase, ale žádná z nich nevyžaduje novou kryptografii.

Pak je tu nová hranice. Čtení vašich zůstatků dnes znamená odhalení vaší sady adres komukoli, kdo obsluhuje dotaz, a práce na nápravě probíhá právě teď: Důvěryhodná spouštěcí prostředí (Trusted Execution Environments) spárovaná s Oblivious RAM, privátní vyhledávání informací a lehcí klienti směřující k plně privátnímu čtení. Nic z toho ještě není natolik usazené, aby se to dalo zkopírovat z referenční implementace, což je přesně to, co z toho dělá území, které stojí za to obsadit.

Strana zápisu má stejný tvar: peer-to-peer vysílání a mixnety by zabránily tomu, aby transakce nesla vaši IP adresu na server. Peněženky, které tyto kousky nasadí jako první, budou těmi, se kterými se bude zbytek pole měřit.

Tady je laťka a všimněte si, že je to spíše laťka uživatelské zkušenosti než laťka nové kryptografie. Vezměte si část, kterou tento článek začal – spustit, připojit, schválit, zaplatit – a zachovejte ji tak, aby to byla stále rozpoznatelně ta samá relace. Budou tu kompromisy; vygenerování důkazu trvá sekundy, chráněný převod stojí více a jeden nebo dva nové koncepty možná budou potřebovat název v rozhraní.

To, jak malé se tyto rozdíly budou zdát, je uměním integrace a oddělí to peněženky, které to udělají správně, od těch, které to sice technicky nabízejí, ale způsoby, které uživatelům ztěžují život. Co se musí úplně změnit: při spuštění se nespustí žádná analytika, každá nová dapp se setká s adresou bez historie a platba příteli neprozradí nic o účtech, které za ní stojí.

Soukromí, které po uživateli žádá, aby se stal jiným člověkem, se nikdy nerozšíří. Když dorazí uvnitř zážitku, kterému uživatelé již rozumí, je to prostě lepší peněženka.

## Nápady, které stojí za to ukrást {#ideas-worth-stealing}

Za základy se nachází vrstva funkcí, které, pokud vím, ještě nikdo nevydal. Jsou to jen nápady, ale každý z nich je přesně tím, co by mohlo z jedné peněženky udělat jasnou volbu.

Začněme načasováním. Množiny anonymity (anonymity sets) potřebují čas, aby mezi jednotlivými kroky narostly, a vaše časová razítka potichu prozrazují více, než byste si mysleli – kdy jste vzhůru, v jakém časovém pásmu se nacházíte, ve kterých dnech provádíte transakce. Peněženka by mohla zařadit do fronty cokoli, co není naléhavé, a odeslat to v neobvyklou dobu: chráněný vklad se vypořádá přes noc, prostředky jsou do rána připraveny a onchain se nikdy nevytvoří žádný rytmus vašeho života.

Pak je tu tlačítko pro snadné řešení. Uživatel, který se objeví dnes, je plně odhalen – jedna hojně používaná seed fráze, roky historie za ní. Nechte ho ji zadat a peněženka navrhne plán migrace, který má schválit – tolik do Railgunu, tolik do Privacy Pools, upravte si rozdělení, jak chcete. Později, kdykoli jsou prostředky potřeba na veřejnosti, vynoří se připravené a neodhalené: nová adresa, neobvyklá hodina, částka, která neodráží to, co šlo dovnitř. A často ani není potřeba žádná cesta ven. Uvnitř ekosystému Railgun může uživatel převádět a obchodovat, aniž by se kdy vynořil, a navíc ušetří poplatky za výstup. Uživatel, který byl v pondělí otevřenou knihou, je do pátku nečitelný, a jediné, co udělal, bylo, že schválil plán.

Peněženka by také mohla provádět kontrolu (linting) soukromí. Shlukovací heuristiky v první polovině tohoto článku jsou veřejné, takže je namiřte na uživatelovu vlastní čekající transakci a varujte ho před podpisem: tato platba propojí tyto dva účty, tento výběr odpovídá vašemu vkladu na cent přesně. Peněženky již simulují transakce, aby zachytily odčerpání prostředků. Simulace toho, co se dozví přihlížející, je stejný krok zaměřený na jiné riziko.

A ukažte lidem, co už pozorovatel vidí. Nástěnka (dashboard), která provádí shlukovou analýzu napříč uživatelovými vlastními účty, mění abstraktní hrozbu v něco, na co uživatelé cítí potřebu reagovat: těchto pět adres je pro pozorovatele jednou entitou, tento účet je čistý, toto ENS jméno je spojuje. Také to dává výše zmíněné funkci snadného tlačítka její "před a po".

## Kroky k akci {#action-steps}

### Pro tvůrce {#for-builders}

Každá část tohoto článku končí na stejném místě: u volby, kterou může peněženka učinit.

Způsobem, jak tyto volby učinit, jsou rozumná výchozí nastavení, která může uživatel přepsat, a to každé z nich. Nastavte jako výchozí privátní cestu, protože výchozí nastavení je to, s čím bude většina uživatelů žít. Ale nechte to otevřené volitelnosti řízené uživatelem, protože uživateli, který nemůže nasměrovat svou peněženku na jiný RPC server nebo na svůj vlastní uzel, nebyla ve skutečnosti předána samosvrchovanost.

Nemusíte začínat na zelené louce. [Kohaku SDK](https://github.com/ethereum/kohaku) balí několik primitiv z tohoto článku – chráněné zůstatky, mixéry, lehké klienty – takže je peněženka může adoptovat, aniž by musela každý protokol budovat od nuly. Kousky leží na poličce. Na některých věcech záleží dávno předtím, než o ně někdo požádá. Nikdo neviděl ani davy sepisující petice za end-to-end šifrování; bylo dodáno jako výchozí, miliardy lidí ho dostaly, aniž by si toho všimly nebo se o to staraly, a dnes aplikace pro zasílání zpráv bez něj působí rozbitě a jako narušení soukromí.

Peníze, které nelze použít k vašemu nalezení, profilování nebo cílení na vás, patří do stejné kategorie. Peněženka, která s nimi takto zachází, bude tou další skvělou.

### Pro uživatele {#for-users}

Peněženka, kterou používáte, je ta, kterou propagujete jako normu. Vybírejte si peněženky, které berou vaše soukromí a bezpečnost vážně. To může znamenat obětování nejplynulejšího rozhraní za to nejbezpečnější a nejvíce privátní. Právě teď to pravděpodobně znamená sledovat novinky na [Walletbeat](https://www.walletbeat.fyi/), dívat se, které peněženky se posouvají směrem k umožnění uživatelského soukromí, a udělat si čas na jejich vyzkoušení.

## Pro další zkoumání {#for-further-exploration}

- [Hodnocení soukromí peněženek](https://www.theopensourcepress.com/crypto-wallet-ip-exposure-scorecard-2026/) - Síťové odhalení 13 peněženek při prvním spuštění
- [ERC-5564: Skryté adresy (Stealth Addresses)](https://eips.ethereum.org/EIPS/eip-5564)
- [Railgun](https://railgun.org/), [Privacy Pools](https://privacypools.com/) a [Tornado Cash](https://tornadocash.eth.limo/)
- Lehcí klienti [Helios](https://github.com/a16z/helios) a [Colibri](https://github.com/corpus-core/colibri-stateless)
- [Kohaku](https://github.com/ethereum/kohaku) - SDK pro ochranu soukromí pro tvůrce peněženek
- [Walletbeat](https://www.walletbeat.fyi/) - Jak si vedou stávající peněženky