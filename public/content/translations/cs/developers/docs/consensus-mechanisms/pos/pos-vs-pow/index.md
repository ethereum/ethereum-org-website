---
title: Důkaz podílem (PoS) vs. důkaz prací (PoW)
description: Srovnání mechanismů konsensu Etherea založených na důkazu podílem (PoS) a důkazu prací (PoW)
lang: cs
---

Když bylo spuštěno [Ethereum](/), důkaz podílem (PoS) stále vyžadoval mnoho výzkumu a vývoje, než mu mohlo být svěřeno zabezpečení Etherea. Důkaz prací (PoW) byl jednodušší mechanismus, který se již osvědčil u Bitcoinu, což znamenalo, že jej hlavní vývojáři mohli okamžitě implementovat a Ethereum spustit. Trvalo dalších osm let, než byl důkaz podílem vyvinut do fáze, kdy mohl být implementován.

Tato stránka vysvětluje důvody přechodu Etherea z důkazu prací na důkaz podílem a s tím spojené kompromisy.

## Bezpečnost {#security}

Výzkumníci Etherea považují důkaz podílem (PoS) za bezpečnější než důkaz prací (PoW). Nicméně na skutečném Ethereum Mainnetu byl implementován teprve nedávno a není tak prověřený časem jako důkaz prací. Následující sekce probírají výhody a nevýhody bezpečnostního modelu důkazu podílem ve srovnání s důkazem prací.

### Náklady na útok {#cost-to-attack}

V důkazu podílem (PoS) se od validátorů vyžaduje, aby uzamkli („stake“) alespoň 32 ETH do chytrého kontraktu. Ethereum může spálit stakovaný ether, aby potrestalo validátory, kteří se chovají nesprávně. K dosažení konsensu musí alespoň 66 % celkového stakovaného etheru hlasovat pro konkrétní sadu bloků. Bloky, pro které hlasovalo >=66 % staku, jsou „finalizováno“ (finalizovány), což znamená, že nemohou být odstraněny nebo reorganizovány.

Útok na síť může znamenat zabránění finalizaci řetězce nebo zajištění určité organizace bloků v kanonickém řetězci, která nějakým způsobem přináší útočníkovi prospěch. To vyžaduje, aby útočník odklonil cestu poctivého konsensu buď nahromaděním velkého množství etheru a přímým hlasováním s ním, nebo oklamáním poctivých validátorů, aby hlasovali určitým způsobem. Pomineme-li sofistikované útoky s nízkou pravděpodobností, které klamou poctivé validátory, náklady na útok na Ethereum se rovnají nákladům na stake, který musí útočník nahromadit, aby ovlivnil konsensus ve svůj prospěch.

Nejnižší náklady na útok představují >33 % celkového staku. Útočník držící >33 % celkového staku může způsobit zpoždění finality jednoduše tím, že se odpojí (přejde offline). Pro síť je to relativně menší problém, protože existuje mechanismus známý jako „únik za neaktivitu“, který odčerpává stake od offline validátorů, dokud online většina nepředstavuje 66 % staku a nemůže řetězec znovu finalizovat. Teoreticky je také možné, aby útočník způsobil dvojitou finalitu s o něco více než 33 % celkového staku tím, že vytvoří dva bloky místo jednoho, když je požádán, aby byl producentem bloku, a poté bude dvojitě hlasovat se všemi svými validátory. Každý fork vyžaduje pouze to, aby 50 % zbývajících poctivých validátorů vidělo každý blok jako první, takže pokud se jim podaří správně načasovat své zprávy, mohou být schopni finalizovat oba forky. To má nízkou pravděpodobnost úspěchu, ale pokud by útočník dokázal způsobit dvojitou finalitu, komunita Etherea by se musela rozhodnout následovat jeden fork, v takovém případě by validátoři útočníka byli na tom druhém nutně penalizováni.

S >33 % celkového staku má útočník šanci mít menší (zpoždění finality) nebo závažnější (dvojitá finalita) dopad na síť Ethereum. S více než 14 000 000 ETH stakovanými v síti a reprezentativní cenou 1000 USD/ETH jsou minimální náklady na provedení těchto útoků `1000 x 14,000,000 x 0.33 = $4,620,000,000`. Útočník by o tyto peníze přišel prostřednictvím penalizace a byl by ze sítě vyloučen. Aby mohl zaútočit znovu, musel by (znovu) nahromadit >33 % staku a (znovu) jej spálit. Každý pokus o útok na síť by stál >4,6 miliardy USD (při 1000 USD/ETH a 14 milionech stakovaných ETH). Útočník je také vyloučen ze sítě, když je penalizován, a musí se připojit do fronty na aktivaci, aby se mohl znovu připojit. To znamená, že frekvence opakovaného útoku je omezena nejen rychlostí, jakou může útočník nahromadit >33 % celkového staku, ale také časem, který zabere připojení všech jeho validátorů do sítě. Pokaždé, když útočník zaútočí, stává se mnohem chudším a zbytek komunity bohatším díky výslednému nabídkovému šoku.

Jiné útoky, jako jsou 51% útoky nebo zvrácení finality s 66 % celkového staku, vyžadují podstatně více ETH a jsou pro útočníka mnohem nákladnější.

Porovnejte to s důkazem prací (PoW). Náklady na spuštění útoku na Ethereum s důkazem prací se rovnaly nákladům na trvalé vlastnictví >50 % celkového hashovacího výkonu sítě. To představovalo náklady na hardware a provoz dostatečného výpočetního výkonu k tomu, aby útočník překonal ostatní těžaře a konzistentně počítal řešení důkazu prací. Ethereum se těžilo převážně pomocí GPU spíše než ASIC, což udržovalo náklady na nižší úrovni (ačkoli kdyby Ethereum zůstalo u důkazu prací, těžba pomocí ASIC by se možná stala populárnější). Protivník by musel nakoupit spoustu hardwaru a platit za elektřinu k jeho provozu, aby mohl zaútočit na síť Ethereum s důkazem prací, ale celkové náklady by byly nižší než náklady potřebné k nahromadění dostatečného množství ETH k zahájení útoku. 51% útok je u důkazu prací přibližně [20x levnější](https://youtu.be/1m12zgJ42dI?t=1562) než u důkazu podílem. Pokud by byl útok odhalen a řetězec by prošel hard forkem k odstranění jeho změn, útočník by mohl opakovaně použít stejný hardware k útoku na nový fork.

### Komplexita {#complexity}

Důkaz podílem (PoS) je mnohem komplexnější než důkaz prací (PoW). To by mohl být bod ve prospěch důkazu prací, protože je těžší náhodně zanést chyby nebo nezamýšlené efekty do jednodušších protokolů. Tato komplexita však byla zkrocena roky výzkumu a vývoje, simulacemi a implementacemi na testnetech. Protokol důkazu podílem byl nezávisle implementován pěti samostatnými týmy (na každé z vrstev provádění a konsensu) v pěti programovacích jazycích, což poskytuje odolnost proti chybám klientů.

Pro bezpečný vývoj a testování logiky konsensu důkazu podílem byl Beacon chain spuštěn dva roky předtím, než byl důkaz podílem implementován na Ethereum Mainnet. Beacon chain fungoval jako pískoviště pro testování důkazu podílem, protože to byl živý blockchain implementující logiku konsensu důkazu podílem, ale bez dotyku se skutečnými transakcemi Etherea – efektivně dosahoval konsensu pouze sám na sobě. Jakmile byl po dostatečnou dobu stabilní a bez chyb, byl Beacon chain „sloučen“ s Ethereum Mainnetem. To vše přispělo ke zkrocení komplexity důkazu podílem do té míry, že riziko nezamýšlených důsledků nebo chyb klientů bylo velmi nízké.

### Plocha pro útok {#attack-surface}

Důkaz podílem (PoS) je komplexnější než důkaz prací (PoW), což znamená, že existuje více potenciálních vektorů útoku, se kterými je třeba se vypořádat. Místo jedné peer-to-peer sítě spojující klienty existují dvě, z nichž každá implementuje samostatný protokol. Mít jednoho konkrétního validátora předem vybraného k navržení bloku v každém slotu vytváří potenciál pro útoky typu odepření služby, kdy velké množství síťového provozu vyřadí tohoto konkrétního validátora offline.

Existují také způsoby, jak mohou útočníci pečlivě načasovat vydání svých bloků nebo atestací tak, aby je přijala určitá část poctivé sítě, což je ovlivní, aby hlasovali určitým způsobem. Nakonec může útočník jednoduše nahromadit dostatek ETH ke stakování a ovládnout mechanismus konsensu. Každý z těchto [vektorů útoku má přidruženou obranu](/developers/docs/consensus-mechanisms/pos/attack-and-defense), ale u důkazu prací tyto vektory vůbec neexistují, a proto je není třeba bránit.

## Decentralizace {#decentralization}

Důkaz podílem (PoS) je více decentralizovaný než důkaz prací (PoW), protože závody ve zbrojení v těžebním hardwaru mají tendenci cenově vytlačit jednotlivce a malé organizace. Ačkoli technicky může kdokoli začít s těžbou na skromném hardwaru, jeho pravděpodobnost získání jakékoli odměny je ve srovnání s institucionálními těžebními operacemi mizivě malá. U důkazu podílem jsou náklady na staking a procentuální návratnost tohoto staku pro všechny stejné. Provozování validátoru v současnosti stojí 32 ETH.

Na druhou stranu vynález derivátů pro likvidní staking vedl k obavám z centralizace, protože několik velkých poskytovatelů spravuje obrovské množství stakovaného ETH. To je problematické a je třeba to co nejdříve napravit, ale je to také více nuancované, než se zdá. Centralizovaní poskytovatelé stakingu nemají nutně centralizovanou kontrolu nad validátory – často je to jen způsob, jak vytvořit centrální pool ETH, který může stakovat mnoho nezávislých provozovatelů uzlů, aniž by každý účastník potřeboval vlastních 32 ETH.

Nejlepší možností pro Ethereum je, aby validátoři běželi lokálně na domácích počítačích, čímž se maximalizuje decentralizace. To je důvod, proč se Ethereum brání změnám, které zvyšují hardwarové požadavky na provozování uzlu/validátoru.

## Udržitelnost {#sustainability}

Důkaz podílem (PoS) je uhlíkově nenáročný způsob zabezpečení blockchainu. V rámci důkazu prací (PoW) těžaři soutěží o právo vytěžit blok. Těžaři jsou úspěšnější, když dokážou provádět výpočty rychleji, což motivuje k investicím do hardwaru a spotřeby energie. To bylo pozorováno u Etherea před jeho přechodem na důkaz podílem. Krátce před přechodem na důkaz podílem spotřebovávalo Ethereum přibližně 78 TWh/rok – stejně jako malá země. Přechod na důkaz podílem však snížil tento výdej energie o ~99,98 %. Důkaz podílem udělal z Etherea energeticky účinnou a nízkouhlíkovou platformu.

[Více o spotřebě energie Etherea](/energy-consumption)

## Emise {#issuance}

Ethereum s důkazem podílem (PoS) může platit za svou bezpečnost vydáváním mnohem menšího počtu mincí než Ethereum s důkazem prací (PoW), protože validátoři nemusí platit vysoké náklady na elektřinu. V důsledku toho může ETH snížit svou inflaci nebo se dokonce stát deflačním, když se spálí velké množství ETH. Nižší úroveň inflace znamená, že bezpečnost Etherea je levnější, než byla v rámci důkazu prací.

## Učíte se raději vizuálně? {#visual-learner}


<VideoWatch slug="pow-vs-pos" />

## Další čtení {#further-reading}

- [Vitalikova filozofie návrhu důkazu podílem](https://medium.com/@VitalikButerin/a-proof-of-stake-design-philosophy-506585978d51)
- [Vitalikovy často kladené dotazy k důkazu podílem](https://vitalik.eth.limo/general/2017/12/31/pos_faq.html#what-is-proof-of-stake)
- [Video „Jednoduše vysvětleno“ o PoS vs. PoW](https://www.youtube.com/watch?v=M3EFi_POhps)