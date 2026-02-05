---
title: Proof-of-stake (PoS)
description: Vysvětlení konsensuálního protokolu důkaz podílem a jeho role v platformě Ethereum.
lang: cs
---

Důkaz podílem (PoS) je základem [mechanismu konsensu](/developers/docs/consensus-mechanisms/) sítě Ethereum. Ethereum přešlo v roce 2022 na mechanismus důkazu podílem, protože je bezpečnější, méně energeticky náročný a lepší pro implementaci nových řešení škálování ve srovnání s předchozí architekturou [důkazu prací](/developers/docs/consensus-mechanisms/pow).

## Předpoklady {#prerequisites}

Pro lepší pochopení této stránky vám doporučujeme si nejprve přečíst o [mechanismech konsensu](/developers/docs/consensus-mechanisms/).

## Co je proof of stake (PoS)? {#what-is-pos}

Důkaz podílem je způsob, jak prokázat, že validátoři vložili do sítě něco hodnotného, co může být zničeno, pokud jednají nečestně. V mechanismu důkazu podílem Etherea validátoři explicitně stakují kapitál ve formě ETH do chytrého kontraktu na Ethereu. Validátor je pak zodpovědný za kontrolu, zda jsou nové bloky šířené po síti platné, a občas za vytváření a šíření nových bloků. Pokud se pokusí síť podvést (například navržením více bloků, když by měli poslat jeden, nebo zasláním konfliktních atestací), může být část nebo celé jejich stakované ETH zničeno.

## Validátoři {#validators}

Aby se uživatel mohl stát validátorem, musí vložit 32 ETH do depozitního kontraktu a spustit tři samostatné softwarové programy: exekučního klienta, konsensuálního klienta a klienta validátora. Po vložení ETH se uživatel zařadí do aktivační fronty, která omezuje rychlost připojování nových validátorů do sítě. Po aktivaci validátoři dostávají nové bloky od peerů v síti Ethereum. Transakce doručené v bloku jsou znovu provedeny, aby se zkontrolovalo, že navrhované změny stavu Etherea jsou platné, a zkontroluje se podpis bloku. Validátor pak pošle hlas (nazývaný atestace) ve prospěch daného bloku po celé síti.

Zatímco v případě důkazu prací je časování bloků určeno obtížností těžby, v případě důkazu podílem je tempo pevně dané. Čas v síti Ethereum s důkazem podílem je rozdělen na sloty (12 sekund) a epochy (32 slotů). V každém slotu je náhodně vybrán jeden validátor, který bude navrhovatelem bloku. Tento validátor je zodpovědný za vytvoření nového bloku a jeho odeslání ostatním uzlům v síti. V každém slotu je také náhodně vybrán výbor validátorů, jejichž hlasy se použijí k určení platnosti navrhovaného bloku. Rozdělení sady validátorů do výborů je důležité pro udržení zvládnutelné zátěže sítě. Výbory rozdělují sadu validátorů tak, aby každý aktivní validátor atestoval v každé epoše, ale ne v každém slotu.

## Jak se transakce provádí v síti Ethereum s PoS {#transaction-execution-ethereum-pos}

Následující text poskytuje kompletní vysvětlení toho, jak se transakce provádí v síti Ethereum s mechanismem důkazu podílem.

1. Uživatel vytvoří a podepíše [transakci](/developers/docs/transactions/) svým soukromým klíčem. To obvykle zajišťuje peněženka nebo knihovna, jako je [ethers.js](https://docs.ethers.org/v6/), [web3js](https://docs.web3js.org/), [web3py](https://web3py.readthedocs.io/en/v5/) atd., ale na pozadí uživatel odesílá požadavek na uzel pomocí Ethereum [JSON-RPC API](/developers/docs/apis/json-rpc/). Uživatel definuje množství gasu, které je ochoten zaplatit jako spropitné validátorovi, aby ho motivoval k zahrnutí transakce do bloku. [Spropitné](/developers/docs/gas/#priority-fee) se vyplácí validátorovi, zatímco [základní poplatek](/developers/docs/gas/#base-fee) je spálen.
2. Transakce je odeslána [exekučnímu klientovi](/developers/docs/nodes-and-clients/#execution-client) sítě Ethereum, který ověří její platnost. To znamená zajistit, aby odesílatel měl dostatek ETH k provedení transakce a aby ji podepsal správným klíčem.
3. Pokud je transakce platná, exekuční klient ji přidá do svého lokálního mempoolu (seznamu nevyřízených transakcí) a také ji rozešle ostatním uzlům prostřednictvím gossip sítě exekuční vrstvy. Když se o transakci dozví další uzly, přidají ji také do svého lokálního mempoolu. Pokročilí uživatelé se mohou zdržet vysílání své transakce a místo toho ji přeposlat specializovaným tvůrcům bloků, jako je [Flashbots Auction](https://docs.flashbots.net/flashbots-auction/overview). To jim umožňuje organizovat transakce v nadcházejících blocích pro maximální zisk ([MEV](/developers/docs/mev/#mev-extraction)).
4. Jeden z validátorských uzlů v síti je navrhovatelem bloku pro aktuální slot, který byl předtím pseudo-náhodně vybrán pomocí RANDAO. Tento uzel je zodpovědný za sestavení a vysílání dalšího bloku, který má být přidán do blockchainu Etherea, a za aktualizaci globálního stavu. Uzel se skládá ze tří částí: exekučního klienta, konsensuálního klienta a klienta validátora. Exekuční klient seskupuje transakce z lokálního mempoolu do "exekuční datové části" a lokálně je provádí, aby vygeneroval změnu stavu. Tato informace se předává konsensuálnímu klientovi, kde je exekuční datová část zabalena jako součást "beacon bloku", který také obsahuje informace o odměnách, penále, slashingu, atestacích atd., které síti umožňují dohodnout se na sekvenci bloků na čele řetězce. Komunikace mezi exekučním a konsensuálním klientem je podrobněji popsána v části [Propojení konsensuálního a exekučního klienta](/developers/docs/networking-layer/#connecting-clients).
5. Ostatní uzly přijímají nový beacon blok v gossip síti konsensuální vrstvy. Předají jej svému exekučnímu klientovi, kde jsou transakce znovu lokálně provedeny, aby se zajistilo, že navrhovaná změna stavu je platná. Klient validátora pak atestuje, že blok je platný a je logickým dalším blokem v jeho pohledu na řetězec (což znamená, že navazuje na řetězec s největší váhou atestací, jak je definováno v [pravidlech výběru větve](/developers/docs/consensus-mechanisms/pos/#fork-choice)). Blok je přidán do lokální databáze v každém uzlu, který ho atestuje.
6. Transakce může být považována za "finalizovanou", pokud se stala součástí řetězce s "nadpolovičním spojením" mezi dvěma kontrolními body. Kontrolní body se vyskytují na začátku každé epochy a existují proto, aby se zohlednila skutečnost, že v každém slotu atestuje pouze podmnožina aktivních validátorů, ale v každé epoše atestují všichni aktivní validátoři. Proto pouze mezi epochami může být prokázáno ‚nadpoloviční spojení‘ (to je místo, kde se 66 % z celkového stakovaného ETH v síti shodne na dvou kontrolních bodech).

Více podrobností o finalitě naleznete níže.

## Konečnost {#finality}

Transakce má v distribuovaných sítích "finalitu", pokud je součástí bloku, který nelze změnit, aniž by bylo spáleno velké množství ETH. V síti Ethereum s důkazem podílem je to řešeno pomocí "kontrolních" bloků. První blok v každé epoše je kontrolním bodem. Validátoři hlasují pro dvojice kontrolních bodů, které považují za platné. Pokud dvojice kontrolních bodů získá hlasy představující alespoň dvě třetiny z celkového stakovaného ETH, jsou kontrolní body vylepšeny. Novější z těchto dvou (cíl) se stane "opodstatněným". Dřívější z nich je již opodstatněný, protože byl "cílem" v předchozí epoše. Nyní je vylepšen na "finalizovaný". Tento proces vylepšování kontrolních bodů zajišťuje **[Casper the Friendly Finality Gadget (Casper-FFG)](https://arxiv.org/pdf/1710.09437)**. Casper-FFG je nástroj pro finalitu bloku v rámci konsensu. Jakmile je blok finalizován, nelze jej vrátit ani změnit bez většinového slashingu stakerů, což ho činí ekonomicky neživotaschopným.

Aby mohl útočník vrátit finalizovaný blok, musel by se zavázat ke ztrátě nejméně jedné třetiny celkové zásoby stakovaného ETH. Přesný důvod je vysvětlen v tomto [blogovém příspěvku nadace Ethereum](https://blog.ethereum.org/2016/05/09/on-settlement-finality/). Protože finalita vyžaduje dvoutřetinovou většinu, útočník by mohl zabránit síti v dosažení finality hlasováním s jednou třetinou celkového podílu. Existuje mechanismus na obranu proti tomu: [únik z nečinnosti](https://eth2book.info/bellatrix/part2/incentives/inactivity). Tento mechanismus se aktivuje vždy, když se řetězec nepodaří finalizovat po dobu delší než čtyři epochy. Únik z nečinnosti odčerpává stakované ETH od validátorů, kteří hlasují proti většině, což umožňuje většině znovu získat dvoutřetinovou většinu a finalizovat řetězec.

## Kryptoekonomická bezpečnost {#crypto-economic-security}

Provozování validátora je závazek. Od validátora se očekává, že bude udržovat dostatečný hardware a konektivitu, aby se mohl účastnit validace a navrhování bloků. Na oplátku je validátor placen v ETH (jeho stakovaný zůstatek se zvyšuje). Na druhou stranu účast v roli validátora také otevírá nové možnosti pro uživatele, jak zaútočit na síť za účelem osobního zisku nebo sabotáže. Aby se tomu zabránilo, validátoři přicházejí o odměny v ETH, pokud se neúčastní, když jsou vyzváni, a jejich stávající podíl může být zničen, pokud se chovají nečestně. Za nečestné lze považovat dvě hlavní chování: navrhování více bloků v jednom slotu (ekvivokace) a předkládání rozporuplných atestací.

Množství seknutého ETH závisí na tom, kolik validátorů je také seknuto přibližně ve stejnou dobu. Toto je známé jako ["korelační pokuta"](https://eth2book.info/bellatrix/part2/incentives/slashing#the-correlation-penalty) a může být malá (~1% podílu pro jednoho samostatně seknutého validátora) nebo může vést ke zničení 100% podílu validátora (událost hromadného slashingu). Je uložena v polovině období nuceného odchodu, které začíná okamžitou pokutou (až 1 ETH) 1. den, korelační pokutou 18. den a nakonec vyloučením ze sítě 36. den. Dostávají každý den malé pokuty za atestace, protože jsou přítomni v síti, ale nepředkládají hlasy. To vše znamená, že koordinovaný útok by byl pro útočníka velmi nákladný.

## Výběr větve {#fork-choice}

Když síť funguje optimálně a poctivě, na čele řetězce je vždy jen jeden nový blok a všichni validátoři ho atestují. Je však možné, že validátoři mají různé pohledy na čelo řetězce kvůli latenci sítě nebo protože navrhovatel bloku ekvivokoval. Proto konsensuální klienti vyžadují algoritmus, který rozhodne, kterému dát přednost. Algoritmus používaný v síti Ethereum s důkazem podílem se nazývá [LMD-GHOST](https://arxiv.org/pdf/2003.03052.pdf) a funguje tak, že identifikuje větev, která má ve své historii největší váhu atestací.

## Důkaz podílem a bezpečnost {#pos-and-security}

Hrozba [51% útoku](https://www.investopedia.com/terms/1/51-attack.asp) stále existuje u důkazu podílem, stejně jako u důkazu prací, ale pro útočníky je ještě riskantnější. Útočník by potřeboval 51 % stakovaného ETH. Poté by mohli použít své vlastní atestace, aby zajistili, že jejich preferovaná větev bude ta s nejvíce nahromaděnými atestacemi. „Váha“ nahromaděných atestací je to, co konsensuální klienti používají k určení správného řetězce, takže tento útočník by byl schopen učinit svou větev kanonickou. Silnou stránkou důkazu podílem oproti důkazu prací je však to, že komunita má flexibilitu při zahájení protiútoku. Poctiví validátoři by se například mohli rozhodnout pokračovat v budování menšinového řetězce a ignorovat útočníkovu větev a zároveň povzbuzovat aplikace, burzy a pooly, aby udělaly totéž. Mohli by se také rozhodnout násilně odstranit útočníka ze sítě a zničit jeho stakované ETH. Jedná se o silnou ekonomickou obranu proti 51% útoku.

Kromě 51% útoků se mohou záškodníci pokusit i o jiné typy škodlivých aktivit, jako jsou:

- útoky na velkou vzdálenost (ačkoli nástroj finality tento vektor útoku neutralizuje)
- krátkodobé „reorganizace“ (ačkoli toto zmírňuje podpora navrhovatele a termíny pro atestace)
- odrážecí a vyvažovací útoky (také zmírněné podporou navrhovatele a tyto útoky byly stejně prokázány pouze za idealizovaných síťových podmínek)
- lavinové útoky (neutralizované pravidlem algoritmu pro výběr větve, který zvažuje pouze nejnovější zprávu)

Celkově se ukázalo, že důkaz podílem, jak je implementován na Ethereu, je ekonomicky bezpečnější než důkaz prací.

## Výhody a nevýhody {#pros-and-cons}

| Plusy                                                                                                                                                                                                                                                          | Minusy                                                                                                          |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| Staking usnadňuje jednotlivcům účast na zabezpečení sítě a podporuje decentralizaci. validátorský uzel lze provozovat na běžném notebooku. Staking pooly umožňují uživatelům stakovat bez nutnosti mít 32 ETH. | Důkaz podílem je mladší a méně prověřený v praxi ve srovnání s důkazem prací.                   |
| Staking je více decentralizovaný. Úspory z rozsahu se neuplatňují stejným způsobem jako při těžbě s PoW.                                                                                                                       | Důkaz podílem je složitější na implementaci než důkaz prací.                                    |
| Důkaz podílem nabízí větší kryptoekonomickou bezpečnost než důkaz prací.                                                                                                                                                                       | Uživatelé musí spustit tři softwarové programy, aby se mohli podílet na důkazu podílem Etherea. |
| K motivaci účastníků sítě je zapotřebí menší vydávání nových ETH.                                                                                                                                                                              |                                                                                                                 |

### Srovnání s důkazem prací {#comparison-to-proof-of-work}

Ethereum původně používalo důkaz prací, ale v září 2022 přešlo na důkaz podílem. PoS nabízí několik výhod oproti PoW, jako jsou:

- lepší energetická účinnost – není třeba spotřebovávat velké množství energie na výpočty v rámci důkazu prací
- nižší bariéry vstupu, snížené hardwarové nároky – není potřeba elitní hardware, abyste měli šanci vytvářet nové bloky
- snížené riziko centralizace – důkaz podílem by měl vést k většímu počtu uzlů zabezpečujících síť
- kvůli nízké energetické náročnosti je k motivaci účasti zapotřebí menší vydávání ETH
- ekonomické pokuty za špatné chování činí útoky ve stylu 51 % pro útočníka nákladnějšími ve srovnání s důkazem prací
- komunita se může uchýlit k sociální obnově poctivého řetězce, pokud by 51% útok překonal kryptoekonomickou obranu.

## Další čtení {#further-reading}

- [Často kladené otázky k důkazu podílem](https://vitalik.eth.limo/general/2017/12/31/pos_faq.html) _Vitalik Buterin_
- [Co je důkaz podílem](https://consensys.net/blog/blockchain-explained/what-is-proof-of-stake/) _ConsenSys_
- [Co je důkaz podílem a proč na něm záleží](https://bitcoinmagazine.com/culture/what-proof-of-stake-is-and-why-it-matters-1377531463) _Vitalik Buterin_
- [Proč důkaz podílem (listopad 2020)](https://vitalik.eth.limo/general/2020/11/06/pos2020.html) _Vitalik Buterin_
- [Důkaz podílem: Jak jsem se naučil milovat slabou subjektivitu](https://blog.ethereum.org/2014/11/25/proof-stake-learned-love-weak-subjectivity/) _Vitalik Buterin_
- [Útok a obrana Etherea s důkazem podílem](https://mirror.xyz/jmcook.eth/YqHargbVWVNRQqQpVpzrqEQ8IqwNUJDIpwRP7SS5FXs)
- [Filozofie návrhu důkazu podílem](https://medium.com/@VitalikButerin/a-proof-of-stake-design-philosophy-506585978d51) _Vitalik Buterin_
- [Video: Vitalik Buterin vysvětluje důkaz podílem Lexi Fridmanovi](https://www.youtube.com/watch?v=3yrqBG-7EVE)

## Související témata {#related-topics}

- [Důkaz prací](/developers/docs/consensus-mechanisms/pow/)
- [Důkaz autoritou](/developers/docs/consensus-mechanisms/poa/)
