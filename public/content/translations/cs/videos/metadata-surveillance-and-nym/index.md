---
title: "Speciál ke Dni ochrany osobních údajů – Sledování metadat a Nym"
description: "Rozhovor ke Dni ochrany osobních údajů o sledování metadat: co o vás metadata prozradí, i když je obsah zpráv zašifrovaný, a jak nástroje pro ochranu soukromí na úrovni sítě, jako je Nym, fungují k jejich ochraně."
lang: cs
youtubeId: "QBX5AK3DXqw"
uploadDate: 2023-01-30
duration: "0:07:49"
educationLevel: beginner
topic:
  - "privacy"
format: interview
author: Nym
breadcrumb: "Soukromí"
---

Příspěvek od **Nym** s hlavní vědkyní Nym Claudií Diaz, který zkoumá mechanismy metadat, jejich kritickou roli v moderním sledování, osobní údaje, které odhalují, a kroky, které můžeme podniknout, abychom získali zpět své soukromí.

*Tento přepis je přístupnou kopií [původního přepisu videa](https://www.youtube.com/watch?v=QBX5AK3DXqw) zveřejněného společností Nym. Pro lepší čitelnost byl lehce upraven.*

### Úvod (0:04) {#intro-004}

Co jsou komunikační metadata? Týkají se všeho ohledně komunikace, co není samotným obsahem toho, co se skutečně říká. Zahrnuje to například původ komunikace, cíl, čas odeslání informací, množství odeslaných informací a jakékoli detekovatelné vzorce, včetně načasování a velikosti vyměňovaných paketů.

### Komunikační metadata (0:27) {#communications-metadata-027}

Komunikační metadata jsou ve výchozím nastavení odhalena ve všech internetových protokolech: TCP/IP, HTTP, UDP, FTP. Dokonce i bezpečné protokoly, jako je TLS nebo zabezpečené DNS, které chrání obsah pomocí koncového šifrování (end-to-end encryption), stále zobrazují komunikační metadata: původ, cíl, načasování, délku a tak dále.

Takže tyto informace jsou odhaleny, ale komu? Kdo je může získat?

### Kdo má přístup k metadatům (1:10) {#who-gets-access-to-metadata-110}

Existuje řada subjektů, které jsou zprostředkovateli v internetové komunikaci a mají přístup k těmto komunikačním metadatům. Patří sem velcí hráči v internetové infrastruktuře, jako jsou poskytovatelé internetových služeb, uzly výměny dat (exchanges), autonomní systémy, BGP směrovače a obecně účastníci internetové páteřní sítě; ti mohou získat přístup k velkému množství komunikačních metadat. 

Ale i malí hráči, jako je kdokoli, kdo provozuje Wi-Fi směrovač nebo místní síť (LAN), nebo někdo, kdo je schopen lokálně odposlouchávat, také získají přístup ke komunikačním metadatům. A samozřejmě je známo, že protivníci na úrovni národních států, jako je NSA, shromažďují metadata ve velkém měřítku a analyzují je za účelem získání nejrůznějších zpravodajských informací.

### Proč jsou metadata důležitá (2:00) {#why-is-metadata-important-200}

Existuje více důvodů, proč jsou metadata velmi zajímavým typem dat ke shromažďování a využívání. Jsou strojově čitelná, protože mluví jazykem počítačů; je to v podstatě jazyk pro počítače, aby mohly správně směrovat komunikaci od zdroje k cíli. Jsou tedy strojově čitelná, a to znamená, že jim stroje mohou velmi snadno porozumět ve velkém měřítku, na rozdíl od přirozeného lidského jazyka, který je mnohem obtížnější interpretovat, protože lidé možná používají slova určitým způsobem nebo mají nuance, a to je mnohem těžší interpretovat. Metadata jsou na druhou stranu opravdu snadná.

Mají také mnohem menší objem než samotný obsah. Pokud si například představíte video na YouTube, samotný obsah může mít několik gigabajtů, ale metadata by zahrnovala pouze to, jaká je URL adresa videa, kolik bajtů obsahuje a v jakém čase bylo sledováno. Může to tedy být mnohem méně než skutečný obsah a je to také zvládnutelné z hlediska velikosti.

Metadata mají také mnohem nižší ochranu než obsah. Není legální jen tak zachytávat komunikaci lidí a dívat se do obsahu, to je chráněno zákonem. Ale metadata, protože nejsou považována za tak citlivá, mají mnohem nižší ochranu. Mnoho subjektů tak může tato metadata legálně shromažďovat a analyzovat, aby zjistily informace o tom, co lidé na internetu dělají.

Je to tedy velký problém? Můžeme říct: „No, jsou to jen metadata. Dokud nevíš, co říkám, měl bych se opravdu obávat toho, že víš, s kým a v jakém čase mluvím?“ 

Existuje několik citátů, které ukazují, jak jsou metadata ve skutečnosti považována za extrémně cenná. Hlavní právní zástupce NSA Stewart Baker řekl, že metadata vám o životě někoho řeknou naprosto všechno – pokud máte dostatek metadat, obsah vlastně nepotřebujete. Takto mocná jsou v tom, že dokážou pochopit, o co se někdo zajímá, jaká je jeho sociální síť, jaké má koníčky, jaké má úmysly, jaké má zájmy. Vlastně nepotřebujete slyšet, co říkají; stačí, že jste schopni sledovat všechna metadata.

A Whitfield Diffie a Susan Landau ve své knize *Privacy on the Line* říkají, že analýza provozu, nikoli kryptoanalýza, je páteří komunikačního zpravodajství. Je to proto, že ji můžete shromažďovat ve velkém měřítku, můžete ji analyzovat ve velkém měřítku a poskytne vám všechny velké vzorce, celkový obraz, který vám pak umožní přiblížit se a proniknout ke konkrétním cílům, které považujete za nejzajímavější. Ale nejprve je najdete pomocí analýzy provozu na metadatech.

Analýzu provozu metadat lze dokonce použít k obnovení zašifrovaného obsahu bez prolomení kryptografie. Předpokládejme, že máme dokonalou kryptografii: žádné množství kryptoanalýzy ji nedokáže prolomit a tajné klíče jsou dokonale tajné. Měli bychom mít jistotu, že je tento obsah chráněn a protivník se o něm nedokáže nic dozvědět.

Existuje však mnoho situací, kdy analýza provozu komunikačních metadat může fungovat jako postranní kanál (side channel), který tento zašifrovaný obsah odhalí.

### Sledování metadat (5:15) {#metadata-surveillance-515}

Jedním z příkladů je, když prohlížíte webové stránky pomocí HTTPS. V principu, protože komunikace s tímto webem je zašifrovaná, někdo, kdo vaši komunikaci sleduje, nedokáže říct, na jakou konkrétní stránku na webu přistupujete. Pokud například jdete na WebMD zkontrolovat nemoci, pozorovatel nebo odposlouchávač uvidí: „Dobře, prohlížíš si lékařské informace na WebMD,“ ale nedokáže říct, jakou konkrétní nemoc hledáš.

Způsob, jak zjistit, co někdo v tomto scénáři dělá, by však pro protivníka spočíval v tom, že by si nejprve stáhl všechny stránky na webu a pro každou stránku zaznamenal vzorec paketů, které jsou vidět na komunikační lince. V podstatě to, jaký počet paketů jde kterým směrem, jaké jsou velikosti těchto paketů a jaká je doba mezi jedním paketem a dalším. 

Tímto způsobem můžete vytvořit otisk (fingerprint) každé z těchto stránek, takže když cíl stahuje stránku ze zašifrovaného webu, jste schopni porovnat počet paketů v každém směru a jejich velikosti, abyste uhodli, na jakou konkrétní webovou stránku se dívá, i když je samotná webová stránka zašifrovaná a vy byste neměli být schopni tento obsah zjistit.

To je samozřejmě znepokojivé. I když můžeme mít koncové šifrování, jsme velmi daleko od toho, abychom měli hotovo, pokud jde o ochranu soukromí naší komunikace.

### Seznam přání pro soukromou komunikaci (6:40) {#a-wish-list-for-private-communications-640}

Pokud bychom tedy chtěli mít seznam přání toho, co by dokonale bezpečná komunikační síť nabízela, jaké vlastnosti bychom chtěli? 

Samozřejmě chceme chránit to, co uživatel říká přes zašifrovaný kanál, a koncové šifrování je již velmi důležitým krokem k dosažení tohoto cíle. Ale nejen to, chceme také skrýt, s kým uživatel komunikuje, tedy kdo je komunikačním partnerem, od koho přijímáte pakety nebo komu pakety posíláte. Také polohu, tedy odkud komunikujete; kdy a jak dlouho komunikujete; kolik bajtů dat si vyměňujete; a jakékoli další vzorce v komunikaci. A mohli byste dokonce zajít tak daleko, že byste řekli, že chceme skrýt, zda někdo vůbec komunikuje, nebo ne.

To všechno jsou vlastnosti, které se anonymní komunikační systémy snaží poskytovat, a v prostoru řešení jsou mixnety jedním z nejlepších řešení, které máme k poskytování těchto druhů vlastností.