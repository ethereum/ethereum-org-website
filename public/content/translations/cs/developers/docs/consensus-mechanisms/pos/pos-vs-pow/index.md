---
title: Důkaz podílem vs. důkaz prací
description: Srovnání mechanismu konsensu Etherea založeného na důkazu podílem a důkazu prací
lang: cs
---

Když bylo Ethereum spuštěno, důkaz podílem ještě potřeboval hodně výzkumu a vývoje, než mu mohlo být svěřeno zabezpečení Etherea. Důkaz prací byl jednodušší mechanismus, který již byl prověřen Bitcoinem, což znamenalo, že ho hlavní vývojáři mohli ihned implementovat a spustit tak Ethereum. Trvalo dalších osm let, než se důkaz podílem vyvinul do bodu, kdy mohl být implementován.

Tato stránka vysvětluje důvody přechodu Etherea z důkazu prací na důkaz podílem a s tím spojené kompromisy.

## Bezpečnost {#security}

Výzkumníci Etherea považují důkaz podílem za bezpečnější než důkaz prací. Byl však implementován teprve nedávno na skutečné hlavní síti Etherea a je méně časem prověřený než důkaz prací. Následující části pojednávají o výhodách a nevýhodách bezpečnostního modelu důkazu podílem ve srovnání s důkazem prací.

### Náklady na útok {#cost-to-attack}

V systému důkazu podílem musí validátoři uzamknout („stakovat“) alespoň 32 ETH v chytrém kontraktu. Ethereum může zničit uzamčený ether, aby potrestalo validátory, kteří se chovají nesprávně. Aby se dosáhlo konsensu, musí pro určitou sadu bloků hlasovat alespoň 66 % z celkového uzamčeného etheru. Bloky, pro které hlasovalo >=66 % vkladu, se stávají „finalizovanými“, což znamená, že je nelze odstranit ani přeorganizovat.

Útok na síť může znamenat zabránění finalizaci řetězce nebo zajištění určitého uspořádání bloků v kanonickém řetězci, které nějakým způsobem prospívá útočníkovi. To vyžaduje, aby útočník odklonil cestu poctivého konsensu buď nahromaděním velkého množství etheru a přímým hlasováním s ním, nebo tím, že přiměje poctivé validátory, aby hlasovali určitým způsobem. Kromě sofistikovaných, málo pravděpodobných útoků, které klamou poctivé validátory, jsou náklady na útok na Ethereum náklady na vklad, který musí útočník nahromadit, aby ovlivnil konsensus ve svůj prospěch.

Nejnižší náklady na útok jsou >33 % z celkového vkladu. Útočník, který drží >33 % celkového vkladu, může způsobit zpoždění finality tím, že se jednoduše odpojí. Pro síť se jedná o relativně malý problém, protože existuje mechanismus známý jako „únik z nečinnosti“ (inactivity leak), který přesouvá vklady od offline validátorů, dokud online většina nepředstavuje 66 % vkladu a nemůže řetězec znovu finalizovat. Je také teoreticky možné, aby útočník s více než 33 % celkového vkladu způsobil dvojí finalitu tím, že vytvoří dva bloky místo jednoho, když je požádán, aby byl producentem bloku, a poté provede dvojité hlasování se všemi svými validátory. Každá větev vyžaduje pouze 50 % zbývajících poctivých validátorů, aby viděli každý blok jako první, takže pokud se jim podaří správně načasovat své zprávy, mohou být schopni finalizovat obě větve. Pravděpodobnost úspěchu je nízká, ale pokud by se útočníkovi podařilo způsobit dvojitou finalitu, komunita Etherea by se musela rozhodnout následovat jednu větev, v takovém případě by u validátorů útočníka na druhé větvi nutně došlo ke slashingu.

S >33 % z celkového vkladu má útočník šanci mít menší (zpoždění finality) nebo závažnější (dvojitá finalita) dopad na síť Etherea. S více než 14 000 000 ETH uzamčenými v síti a reprezentativní cenou 1000 $/ETH jsou minimální náklady na provedení těchto útoků `1000 x 14 000 000 x 0.33 = 4 620 000 000 $`. Útočník by o tyto peníze přišel prostřednictvím slashingu a byl by vyloučen ze sítě. Aby mohl zaútočit znovu, musel by (znovu) nashromáždit >33 % vkladu a (znovu) jej spálit. Každý pokus o útok na síť by stál více než 4,6 miliardy dolarů (při ceně 1 000 $/ETH a 14 milionech uzamčených ETH). Útočník je také vyloučen ze sítě, když dojde ke slashingu, a musí se zařadit do aktivační fronty, aby se mohl znovu připojit. To znamená, že rychlost opakovaného útoku je omezena nejen rychlostí, jakou může útočník nashromáždit >33 % z celkového vkladu, ale také časem, který je zapotřebí k zapojení všech jeho validátorů do sítě. Pokaždé, když útočník zaútočí, výrazně zchudne a zbytek komunity zbohatne díky výslednému šoku v nabídce.

Jiné útoky, jako jsou 51% útoky nebo zvrácení finality s 66 % celkového vkladu, vyžadují podstatně více ETH a jsou pro útočníka mnohem nákladnější.

Porovnejte to s důkazem prací. Náklady na zahájení útoku na Ethereum s důkazem prací byly náklady na trvalé vlastnictví >50 % celkového hashratu sítě. To se rovnalo nákladům na hardware a provoz dostatečného výpočetního výkonu, aby bylo možné trvale překonávat ostatní těžaře při výpočtu řešení pro důkaz prací. Ethereum se většinou těžilo pomocí GPU, nikoli ASIC, což udržovalo nízké náklady (ačkoli kdyby Ethereum zůstalo u důkazu prací, těžba pomocí ASIC by se mohla stát populárnější). Protivník by musel nakoupit spoustu hardwaru a zaplatit za elektřinu k jeho provozu, aby zaútočil na síť Ethereum s důkazem prací, ale celkové náklady by byly nižší než náklady potřebné k nashromáždění dostatečného množství ETH k zahájení útoku. 51% útok je na důkazu prací přibližně [20krát levnější](https://youtu.be/1m12zgJ42dI?t=1562) než na důkazu podílem. Pokud by byl útok odhalen a v řetězci by došlo k hard forku, aby se odstranily změny útočníka, mohl by útočník opakovaně použít stejný hardware k útoku na novou větev.

### Složitost {#complexity}

Důkaz podílem je mnohem složitější než důkaz prací. To by mohlo být plus pro důkaz prací, protože je těžší náhodně zavést chyby nebo nezamýšlené efekty do jednodušších protokolů. Složitost však byla zkrocena lety výzkumu a vývoje, simulacemi a implementacemi na testnetech. Protokol důkazu podílem byl nezávisle implementován pěti samostatnými týmy (na exekuční i konsensuální vrstvě) v pěti programovacích jazycích, což poskytuje odolnost proti chybám klientů.

Pro bezpečný vývoj a testování logiky konsensu důkazu podílem byl Beacon Chain spuštěn dva roky před implementací důkazu podílem na hlavní síti Etherea. Beacon Chain fungoval jako sandbox pro testování důkazu podílem, protože to byl živý blockchain implementující logiku konsensu důkazu podílem, ale bez dotyku reálných transakcí Etherea – v podstatě jen dosahoval konsensu sám o sobě. Jakmile byl po dostatečně dlouhou dobu stabilní a bez chyb, Beacon Chain byl „sloučen“ s hlavní sítí Etherea. To vše přispělo ke zkrocení složitosti důkazu podílem do té míry, že riziko nezamýšlených důsledků nebo chyb klienta bylo velmi nízké.

### Vektor útoku {#attack-surface}

Důkaz podílem je složitější než důkaz prací, což znamená, že existuje více potenciálních vektorů útoku, které je třeba řešit. Místo jedné peer-to-peer sítě spojující klienty existují dvě, z nichž každá implementuje samostatný protokol. To, že je v každém slotu předem vybrán jeden konkrétní validátor, který navrhuje blok, vytváří potenciál pro útok odepření služby, kdy velké množství síťového provozu vyřadí tohoto konkrétního validátora z provozu.

Existují také způsoby, jak mohou útočníci pečlivě načasovat vydání svých bloků nebo atestací tak, aby je obdržela určitá část poctivé sítě, a ovlivnit je tak, aby hlasovali určitým způsobem. Nakonec může útočník jednoduše nashromáždit dostatek ETH k uzamčení a ovládnout mechanismus konsensu. Každý z těchto [vektorů útoku má přidruženou obranu](/developers/docs/consensus-mechanisms/pos/attack-and-defense), ale v rámci důkazu prací tyto vektory neexistují.

## Decentralizace {#decentralization}

Důkaz podílem je decentralizovanější než důkaz prací, protože závody ve zbrojení těžebního hardwaru mají tendenci vytlačovat jednotlivce a malé organizace z trhu. I když kdokoli může technicky začít těžit se skromným hardwarem, jeho pravděpodobnost získání jakékoli odměny je mizivě malá ve srovnání s institucionálními těžebními operacemi. U důkazu podílem jsou náklady na uzamčení a procentuální návratnost tohoto vkladu pro všechny stejné. Provoz validátoru v současné době stojí 32 ETH.

Na druhou stranu, vynález derivátů tekutého stakingu vedl k obavám z centralizace, protože několik velkých poskytovatelů spravuje velké množství uzamčených ETH. To je problematické a je třeba to co nejdříve napravit, ale je to také složitější, než se zdá. Centralizovaní poskytovatelé stakingu nemusí nutně mít centralizovanou kontrolu nad validátory – často je to jen způsob, jak vytvořit centrální pool ETH, který může mnoho nezávislých operátorů uzlů stakovat, aniž by každý účastník potřeboval vlastních 32 ETH.

Nejlepší možností pro Ethereum je, aby byly validátory provozovány lokálně na domácích počítačích, což maximalizuje decentralizaci. Proto se Ethereum brání změnám, které zvyšují hardwarové nároky na provoz uzlu/validátoru.

## Udržitelnost {#sustainability}

Důkaz podílem je uhlíkově nenáročný způsob zabezpečení blockchainu. V rámci důkazu prací těžaři soutěží o právo vytěžit blok. Těžaři jsou úspěšnější, když mohou provádět výpočty rychleji, což motivuje k investicím do hardwaru a spotřeby energie. To bylo pozorováno u Etherea předtím, než přešlo na důkaz podílem. Krátce před přechodem na důkaz podílem Ethereum spotřebovávalo přibližně 78 TWh/rok – tolik jako malá země. Přechod na důkaz podílem však snížil tyto energetické výdaje o ~99,98 %. Díky důkazu podílem se z Etherea stala energeticky účinná a nízkouhlíková platforma.

[Více o spotřebě energie Etherea](/energy-consumption)

## Vydávání {#issuance}

Ethereum s důkazem podílem může platit za svou bezpečnost vydáváním mnohem menšího počtu mincí než Ethereum s důkazem prací, protože validátoři nemusí platit vysoké náklady na elektřinu. V důsledku toho může ETH snížit svou inflaci nebo se dokonce stát deflačním, když se spálí velké množství ETH. Nižší míra inflace znamená, že zabezpečení Etherea je levnější, než bylo u důkazu prací.

## Učíte se spíše vizuálně? Vizuální výuka {#visual-learner}

Podívejte se, jak Justin Drake vysvětluje výhody důkazu podílem oproti důkazu prací:

<YouTube id="1m12zgJ42dI" />

## Další čtení {#further-reading}

- [Vitalikova filozofie návrhu důkazu podílem](https://medium.com/@VitalikButerin/a-proof-of-stake-design-philosophy-506585978d51)
- [Vitalikovy časté dotazy k důkazu podílem](https://vitalik.eth.limo/general/2017/12/31/pos_faq.html#what-is-proof-of-stake)
- [Video „Jednoduše vysvětleno“ o PoS vs. PoW](https://www.youtube.com/watch?v=M3EFi_POhps)
