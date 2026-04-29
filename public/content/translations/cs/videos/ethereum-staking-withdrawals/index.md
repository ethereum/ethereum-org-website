---
title: "Jak fungují výběry na Ethereu?"
description: "Jak fungují výběry ze stakingu na Ethereu po aktualizaci Šanghaj/Capella, včetně technického procesu, fronty pro výběr a toho, co stakeři potřebují vědět o přístupu ke svému stakovanému ETH."
lang: cs
youtubeId: "RwwU3P9n3uo"
uploadDate: 2023-03-30
duration: "0:11:39"
educationLevel: intermediate
topic:
  - "jak-funguje-ethereum"
  - "staking"
  - "vybery"
format: explainer
author: Finematics
breadcrumb: "Výběry ze stakingu"
---

Vysvětlení od **Finematics**, které pokrývá, jak fungují výběry ze stakingu na Ethereu po aktualizaci Šanghaj/Capella, včetně mechanismů částečných a úplných výběrů, běžných mylných představ a důsledků pro ekosystém stakingu.

*Tento přepis je přístupnou kopií [původního přepisu videa](https://www.youtube.com/watch?v=RwwU3P9n3uo) zveřejněného kanálem Finematics. Pro lepší čitelnost byl lehce upraven.*

#### Beacon chain (0:31) {#the-beacon-chain-031}

S rychle se blížící aktualizací Šanghaj/Capella probíhá mnoho diskusí o výběrech ze stakingu na Ethereu a o tom, co to znamená pro celý ekosystém Etherea.

Začněme tím, že pochopíme, jak jsme se sem dostali a proč nebyly výběry ze stakingu povoleny, když Ethereum přešlo z důkazu prací (PoW) na důkaz podílem (PoS).

Přechod na důkaz podílem proběhl v několika krocích, aby se minimalizoval počet velkých změn probíhajících současně. Tento přístup byl nezbytný, zejména pro zavedenou síť, která ročně vypořádává hodnotu v bilionech dolarů. Nejvýznamnějšími kroky byly: spuštění Beacon chainu a Merge.

Spuštění Beacon chainu v roce 2020 vytvořilo základ pro tento přechod vytvořením samostatné vrstvy konsensu na bázi důkazu podílem, která běžela souběžně s řetězcem Etherea na bázi důkazu prací. Dřívější spuštění Beacon chainu umožnilo nashromáždit dostatek ETH k zabezpečení sítě před vypořádáním transakcí se skutečnou hodnotou. Umožnilo to také dlouhodobé testování nového modelu konsensu důkazu podílem se skutečnými prostředky ve staku.

První účastníci sítě vložili miliony ETH k zabezpečení sítě Etherea na bázi důkazu podílem, přestože věděli, že si své ETH budou moci vybrat až mnohem později.

Další velký krok, Merge, spojil vrstvu konsensu na bázi důkazu podílem s exekuční vrstvou. To umožnilo konečně opustit důkaz prací a zachovat pouze jeden kanonický řetězec – Ethereum – nyní zabezpečený miliony stakovaných ETH. Merge byl zdaleka největší změnou v historii Etherea. Vzhledem k povaze této aktualizace musela proběhnout bez jakéhokoli výpadku.

Aby se minimalizovalo riziko, byl rozsah Merge zmenšen a součástí aktualizace nebyly žádné další funkce – kromě přechodu z důkazu prací na důkaz podílem. Největší „škrt“, který musel být proveden, se týkal výběrů, které se staly středobodem nadcházející aktualizace Šanghaj/Capella.

#### Výběry (2:09) {#withdrawals-209}

Výběry ze stakingu, jak už název napovídá, umožní stakerům vybrat si své uzamčené ETH. Existují dva typy výběrů: „částečné“ a „úplné“.

K **částečnému výběru** dochází, když si validátor vybere své nashromážděné odměny – dodatečný zůstatek nad maximální efektivní zůstatek 32 ETH. Částečný výběr lze také označit jako „výplatu odměny“ nebo „výplatu přebytečného zůstatku“.

K **úplnému výběru** dochází, když validátor dokončí proces výstupu a je vybrán celý jeho zůstatek. K tomu dochází pouze tehdy, když validátor opustí systém buď dobrovolně, nebo je nuceně odstraněn v procesu zvaném „penalizace“ (slashing).

Jakmile budou výběry ze stakingu povoleny, budou automaticky distribuovány každých několik dní. Proces výběru se navíc iniciuje na vrstvě konsensu, takže v žádném z kroků není vyžadován žádný transakční poplatek.

Aby mohl validátor začít vybírat své odměny ze stakingu, bude muset poskytnout svou adresu pro výběr pouze jednou. Vzhledem k tomu, že výběry ovlivňují jak vrstvu konsensu, tak exekuční vrstvu Etherea, musí být aktualizovány obě části sítě. „Šanghaj“ je název aktualizace exekuční vrstvy obsahující výběry, které jsou specifikovány v EIP-4895. „Capella“ je název odpovídající aktualizace vrstvy konsensu, která se aktivuje ve stejnou dobu. Tyto dvě aktualizace se někdy také označují jako „Shapella“.

#### Mechanismy (3:40) {#mechanics-340}

V ekosystému Etherea má každý validátor odpovídající index. Kromě toho mají také dva typy pověření k výběru, definované buď jako `0x00` nebo `0x01`.

`0x00` znamená, že konkrétní validátor nemá přidruženou adresu pro výběr. Tato pověření jsou odvozena jako hash veřejného klíče BLS, jehož první bajt je nahrazen nulovým bajtem – odtud pochází název.

`0x01` znamená, že validátor poskytl svou adresu pro výběr. Tato pověření k výběru jsou reprezentována jako `0x01` následované 11 bajty nul a poté zvolenou adresou Etherea.

Aby bylo možné povolit výběry, validátoři s pověřeními `0x00` budou muset podepsat zprávu „BLSToExecutionChange“. To bude možné po aktualizaci Capella.

Jakmile budou výběry povoleny, validátor navrhující blok lineárně prohledá indexy validátorů, aby našel prvních 16 validátorů s pověřeními `0x01`, kteří buď:

- Mají zůstatek přesahující 32 ETH (nashromážděné odměny validátora)
- Jsou „vybratelní“ (zcela dokončili výstup ze sady validátorů)

Lineární vyhledávání se zastaví buď po nalezení 16 validátorů splňujících tato kritéria, nebo po 16 384 iteracích. Algoritmus si pamatuje index, na kterém se vyhledávání zastavilo, takže další validátor navrhující blok může pokračovat od tohoto indexu. Po dosažení posledního indexu začne algoritmus od začátku – od indexu 0.

Dobrou analogií by byly analogové hodiny, kde ručička ukazuje na hodinu, postupuje jedním směrem, nepřeskakuje žádné hodiny a po dosažení posledního čísla se nakonec vrátí zpět na začátek.

Po dokončení skenování vytvoří validátor seznam výběrů, které budou zahrnuty do jeho exekučního payloadu. Každá položka v seznamu obsahuje:

- **WithdrawalIndex** — monotónně rostoucí index, začínající od 0, který se zvyšuje o 1 za každý výběr, aby jednoznačně identifikoval každý výběr
- **ValidatorIndex** — index validátora, jehož zůstatek je vybírán
- **ExecutionAddress** — adresa ETH na exekuční vrstvě, kam má být výběr odeslán
- **Amount** — částka v Gwei, která má být odeslána na exekuční adresu

Při sestavování nebo zpracování bloku aplikují klienti exekuční vrstvy tyto výběry na konci bloku. Zpracování výběrů nesoutěží s uživatelskými transakcemi o místo v bloku. Při maximálním počtu 16 výběrů zpracovaných v jednom bloku by mělo být zpracováno maximálně 115 200 výběrů denně, za předpokladu, že nedojde k žádným zmeškaným slotům.

Návrh výběrů je jednoduchý, ale extrémně robustní.

#### Mylné představy (6:30) {#misconceptions-630}

První mylná představa tvrdí, že při zpracování výběrů existuje rozdíl mezi „úplným“ a „částečným“ výběrem z hlediska priority nebo pořadí. Úplné i částečné výběry probíhají, když lineární skenování sady validátorů dosáhne indexu validátora. Jediný rozdíl je v tom, že v případě úplných výběrů musí validátor opustit frontu pro výstup a dosáhnout „epochy pro výběr“ (withdrawable epoch), než jej lineární skenování může zachytit.

Další mylnou představou je, že uživatelé přijdou o své odměny, pokud neposkytnou adresu pro výběr. To není pravda – v případě, že validátor zapomene poskytnout adresu pro výběr, jeho odměny v ETH nebudou po povolení výběrů odeslány do prázdna. Místo toho skenování přeskočí validátory, kteří neposkytli své adresy pro výběr.

Je důležité si pamatovat, že adresu pro výběr nelze změnit a nastavuje se pouze jednou. Stakeři musí být při nastavování adresy pro výběr extrémně opatrní a zajistit, aby měli plné vlastnictví poskytnuté adresy.

Existují také spekulace, že stakeři po povolení výběrů vyberou z ekosystému Etherea velké množství ETH, přičemž silnější verze tohoto argumentu předpokládá, že to destabilizuje mechanismus konsensu důkazu podílem. Ačkoli nemůžeme plně předpovědět, kolik ETH bude v průběhu času vybráno, existuje několik důležitých protiargumentů:

Zaprvé, většina stakerů jsou raní osvojitelé Etherea, kteří byli dostatečně odvážní na to, aby stakovali v době, kdy ještě nebylo jisté, kdy budou výběry povoleny. Mnoho stakerů vyjádřilo přání pokračovat ve stakingu, aby podpořili síť a nadále získávali odměny denominované v ETH.

Zadruhé, aby se zajistilo, že mechanismus konsensu důkazu podílem a aktivní sada validátorů zůstanou stabilní, Ethereum implementovalo frontu pro výběr pro všechny validátory, kteří si přejí provést výstup. Tato fronta omezuje počet validátorů, kteří mohou opustit ekosystém současně.

První skenování výběrů vybere spoustu nashromážděných odměn – v podstatě od vzniku Beacon chainu. Následující skenování však budou zpracovávat mnohem menší množství ETH.

#### Důsledky (8:39) {#implications-839}

Povolení výběrů vytvoří otevřený, oboustranný tok stakingu. V současné době je tok stakingu jednostranný – ETH může do sítě pouze proudit a nikdy z ní nevystoupit. Zajímavé je, že povolení výběrů může motivovat ještě více lidí ke stakingu, protože budou vědět, že si své ETH mohou vždy vybrat, pokud je budou potřebovat na něco jiného.

Stakeři, kteří neprovozují vlastní validátory a stakují u centralizovaného poskytovatele stakingu, budou moci změnit svého poskytovatele za jiného. Mohou vybrat prostředky od poskytovatele, který nabízí nižší sazbu za staking, k poskytovateli, který nabízí lepší sazbu, přejít od centralizovaného poskytovatele k decentralizovanému, nebo dokonce provozovat vlastní validátor.

Výběry také ovlivní deriváty pro likvidní staking, jako jsou Lido, Rocket Pool a další. Tokeny likvidního stakingu (LST), jako jsou stETH nebo rETH, měly v minulosti tendenci dočasně ztrácet svou cenovou vazbu na cenu ETH během tržních turbulencí. S oboustranným tokem stakingu by však jakýkoli významný nesoulad v jejich vazbě byl rychle odstraněn pomocí arbitráže.

Raní osvojitelé v oblasti likvidního stakingu a centralizovaného stakingu získali drtivou většinu trhu, protože neměli velkou konkurenci. Tržní podíl těchto zavedených hráčů by však mohl zaznamenat velkou změnu, jakmile budou výběry povoleny, zejména pokud nebudou nabízet konkurenceschopnou sazbu. Možnost volně přecházet mezi poskytovateli stakingu prospěje trhu se stakingem ETH.

#### Shrnutí (10:01) {#summary-1001}

Povolení výběrů ze stakingu je jednou z nejočekávanějších aktualizací Etherea. Bude nesmírně důležité zajistit, aby tato změna proběhla hladce. Aby se pomohlo s testováním, budou mít validátoři k dispozici několik devnetů a testnetů, aby si mohli projít celým procesem a vyřešit případné problémy před spuštěním na Mainnetu.

Výběry jsou dalším vylepšením, které posouvá Ethereum o krok dále k budování udržitelné, bezpečné a decentralizované budoucnosti. Očekává se, že aktualizace Shapella proběhne v první polovině roku 2023.

V době natáčení tohoto videa Beacon chain nashromáždil více než 17 milionů ETH napříč více než 530 000 validátory. Průměrný zůstatek validátora je těsně nad 34 ETH, což znamená více než 1 milion ETH v nashromážděných odměnách. Bude zajímavé sledovat, jak výběry tato čísla ovlivní.