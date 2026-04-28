---
title: "Odemykání škálování Etherea: Vysvětlení EIP-4844"
description: "Finematics vysvětluje EIP-4844 (proto-danksharding), klíčovou aktualizaci v hard forku Dencun, která zavádí blobové transakce pro dramatické snížení nákladů pro rollupy na vrstvě 2 na Ethereu."
lang: cs
youtubeId: "HT9PHWloIiU"
uploadDate: 2024-03-11
duration: "0:10:56"
educationLevel: intermediate
topic:
  - "jak-funguje-ethereum"
  - "škálování"
  - "eip-4844"
  - "dencun"
  - "aktualizace"
format: explainer
author: Finematics
breadcrumb: "Vysvětlení EIP-4844"
---

Vysvětlující video od **Finematics** pokrývající EIP-4844 (proto-danksharding), klíčovou aktualizaci v hard forku Dencun, která zavádí blobové transakce pro dramatické snížení nákladů pro rollupy na vrstvě 2 na Ethereu.

*Tento přepis je přístupnou kopií [původního přepisu videa](https://www.youtube.com/watch?v=HT9PHWloIiU) zveřejněného kanálem Finematics. Byl lehce upraven pro lepší čitelnost.*

#### Úvod (0:00) {#introduction-000}

Škálování Etherea je již nějakou dobu žhavě diskutovaným tématem. Řešení na vrstvě 2 (l2) stála v čele této bitvy a nabízela způsob, jak zpracovávat transakce mimo hlavní řetězec, aby se zmírnilo přetížení a snížily poplatky. Má to ale háček – i l2 čelí omezením, která brání jejich efektivitě a škálovatelnosti. EIP-4844 je dalším krokem ke zvýšení potenciálu l2 a sladění Etherea s jeho plánem škálování.

O čem tedy EIP-4844 vlastně je? Jak přesně pomáhá se škálováním l2? Jaké nové možnosti odemyká? A je pravda, že může snížit transakční poplatky na l2 o více než 90 %?

#### Co je EIP-4844 a proto-danksharding (0:52) {#what-is-eip-4844-and-proto-danksharding-052}

Pro připomenutí, EIP znamená Ethereum Improvement Proposal (Návrh na vylepšení Etherea), což je proces, jehož prostřednictvím mohou vývojáři navrhovat změny v protokolu Etherea. Konkrétně EIP-4844 navrhuje nový typ transakce, který může významně zlepšit způsob, jakým jsou data na Ethereu spravována a zpracovávána. Možná jste také slyšeli název „proto-danksharding“, který se nyní používá zaměnitelně s EIP-4844.

Proto-danksharding je počáteční implementací plného dankshardingu. Pokládá základy pro další škálování pomocí dankshardingu v budoucnu. Toho je dosaženo implementací většiny logiky a „lešení“, které tvoří plnou specifikaci dankshardingu, aniž by se implementoval samotný data sharding. Tento postup umožňuje snazší a méně rušivý přechod, který může proběhnout v rámci několika aktualizací sítě, aniž by se do Etherea vneslo příliš mnoho rizika v jedné aktualizaci.

Hlavní myšlenkou EIP-4844 je podpořit budoucnost Etherea zaměřenou na rollupy. Rollupy jsou řešení na vrstvě 2, která zpracovávají transakce mimo hlavní řetězec Etherea, ale dědí jeho bezpečnost. Cílem EIP-4844 je učinit rollupy levnějšími a efektivnějšími zavedením nového typu transakce, který mohou rollupy využít k tomu, aby snížily své provozní náklady o řád. To následně umožní, aby aplikace postavené na rollupech byly mnohem levnější na používání, a zvýší se tak adopce celého ekosystému Etherea.

Představte si, že provádíte swap na DEX na jednom z rollupů. Pokud jsou současné náklady na takovou operaci řekněme 1 dolar, po EIP-4844 se s největší pravděpodobností sníží na přibližně 0,10 dolaru. Dopad v tomto příkladu má však určitá úskalí, kterým se budeme věnovat později ve videu.

EIP-4844 bude společně s několika dalšími EIP zahrnuto do nadcházející aktualizace Dencun.

#### Technické detaily (2:50) {#technical-details-250}

Nyní se pojďme blíže podívat na to, jak EIP-4844 funguje.

EIP-4844 zavádí do Etherea nový typ transakce, který přijímá datové „bloby“, jež mají být na krátkou dobu uchovány v uzlu Beacon. Tyto změny jsou dopředně kompatibilní s plánem škálování Etherea a bloby jsou dostatečně malé na to, aby využití disku zůstalo zvládnutelné. Blobové transakce jsou ve stejném formátu, v jakém se očekává jejich existence ve finální specifikaci dankshardingu.

To přichází ruku v ruce s „trhem poplatků za blob“, což zajišťuje, že prostor pro bloby je využíván efektivně a zůstává ekonomicky životaschopný. Toho je dosaženo zavedením blob gasu jako nového typu gasu. Je nezávislý na běžném gasu. Prozatím jsou v blob gasu oceňovány pouze bloby.

Bloby tvoří 4 096 prvků pole, z nichž každý má 32 bajtů. Limit blobů na blok je řízen parametrem MAX_BLOBS_PER_BLOCK. Limit může začít nízko a růst v průběhu několika aktualizací sítě. Zpočátku aktualizace Dencun cílí na 6 blobů na blok. 4 096 × 32 bajtů × 6 na blok = 0,75 MB na blok.

Bloby jsou uchovávány v uzlech Beacon (vrstva konsensu), nikoli v exekuční vrstvě. Budoucí práce na shardingu vyžadují pouze změny v uzlu Beacon, což umožňuje exekuční vrstvě pracovat paralelně na jiných iniciativách.

Bloby mají krátkou životnost a jsou prořezávány přibližně po dvou týdnech. Jsou k dispozici dostatečně dlouho na to, aby si je mohli všichni aktéři rollupu načíst, ale dostatečně krátce na to, aby využití disku zůstalo zvládnutelné. To umožňuje, aby byly bloby naceněny levněji než data volání (calldata), což jsou data uložená v historii navždy.

Kryptografickou páteří EIP-4844 jsou závazky KZG. Aniž bychom zacházeli do přílišných detailů, umožňují efektivní a bezpečné zahrnutí dat, což je klíčové pro funkčnost blobových transakcí. Tímto způsobem musí EVM v exekuční vrstvě interpretovat pouze závazky k blobům, a nikoli samotné bloby.

Pro vygenerování sdíleného tajemství pro závazky KZG proběhla široce distribuovaná ceremonie v prohlížeči, takže všichni účastníci sítě Ethereum měli možnost zajistit, že bylo vygenerováno správně a bezpečně.

EIP-4844 přidává nový předkompilovaný kontrakt zvaný vyhodnocení bodu (point evaluation), který ověřuje důkaz KZG tvrdící, že blob (reprezentovaný závazkem) se v daném bodě vyhodnotí na danou hodnotu.

Jak přesně se to tedy všechno vztahuje na rollupy? S novým prostorem pro bloby budou rollupy moci vkládat svá data bloků do blobů namísto dražších dat volání, která se k tomuto účelu používala doposud. Využití krátkodobého prostoru pro bloby ve vrstvě konsensu je možné, protože rollupy potřebují, aby data byla dostupná pouze tak dlouho, aby poctiví aktéři mohli zkonstruovat stav rollupu.

V případě optimistických rollupů, jako jsou Optimism nebo Arbitrum, stačí poskytovat podkladová data pouze po dobu, kdy je otevřeno okno pro zpochybnění podvodu. Důkaz o podvodu může ověřit přechod v menších krocích, přičemž načítá maximálně několik hodnot blobu najednou prostřednictvím dat volání.

ZK rollupy by poskytovaly dva závazky ke svým transakcím nebo datům o změně stavu: závazek blobu a vlastní závazek ZK rollupu pomocí jakéhokoli systému důkazů, který rollup interně používá. Použily by také protokol důkazu o ekvivalenci s využitím dříve zmíněného předkompilovaného kontraktu pro vyhodnocení bodu, aby dokázaly, že oba závazky odkazují na stejná data.

#### Dopad (6:25) {#impact-625}

Dopad EIP-4844 na ekosystém Etherea nelze přeceňovat. Pro začátek dramaticky zlepšuje škálovatelnost řešení na vrstvě 2, snižuje jejich provozní náklady a činí je konkurenceschopnějšími vůči jiným, levným, alternativním blockchainům. Snížení provozních nákladů je možné, protože drtivá většina nákladů, které v současnosti rollupy nesou, je způsobena poplatky placenými za data volání.

EIP-4844 navíc pokládá základy pro ještě další škálování prostřednictvím plného dankshardingu. Tato budoucí aktualizace rozdělí síť Ethereum na několik datových shardů, z nichž každý bude schopen ukládat data nezávisle, což dále zvýší kapacitu sítě.

S klesajícími provozními náklady bychom mohli být svědky vlny vzniku nových řešení na vrstvě 2, což přiláká vývojáře k budování inovativních aplikací na rollupech.

Pokud jde o snížení transakčních nákladů na rollupech, ilustrované naším předchozím příkladem swapu na DEX, situace je složitá. Za předpokladu, že poptávka po rollupech zůstane po EIP-4844 konstantní, mohli bychom skutečně očekávat výrazné snížení nákladů pro uživatele. Zlepšení škálovatelnosti však může vést k nepředvídaným ekonomickým dopadům. Například nižší transakční poplatky pro koncové uživatele by mohly přimět více lidí k používání rollupů, což by následně zvýšilo poptávku po síťových zdrojích a potenciálně zvýšilo transakční náklady.

Jedna věc je jistá – i kdyby hlavním výsledkem bylo zvýšení propustnosti transakcí a náklady na transakce by zůstaly stejné, EIP-4844 pokládá základy pro ještě větší škálovatelnost v budoucnu, což nakonec povede k levnějším transakcím pro uživatele.

#### Shrnutí (8:04) {#summary-804}

Komunita Etherea již dokončila testování EIP-4844 na různých testnetech, přičemž spuštění na Mainnetu se očekává 13. března. Jedná se o monumentální krok k dosažení bezkonkurenční škálovatelnosti pro Ethereum. Již nyní můžeme vidět, že většina hlavních l2 se zavazuje začít využívat nový prostor pro bloby, jakmile proběhne aktualizace Dencun.

Závěrem lze říci, že EIP-4844 je více než jen aktualizace. Je to klíčový okamžik na cestě Etherea k tomu, aby se stalo škálovatelnějším, efektivnějším a uživatelsky přívětivějším blockchainem. Snížením nákladů a zvýšením efektivity řešení na vrstvě 2 je Ethereum připraveno upevnit svou pozici přední platformy pro decentralizované aplikace.