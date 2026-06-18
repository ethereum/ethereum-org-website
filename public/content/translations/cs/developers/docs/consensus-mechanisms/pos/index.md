---
title: Důkaz podílem (PoS)
description: Vysvětlení protokolu konsensu důkaz podílem (PoS) a jeho role v Ethereu.
lang: cs
---

Důkaz podílem (PoS) je základem [mechanismu konsensu](/developers/docs/consensus-mechanisms/) Etherea. Ethereum zapnulo svůj mechanismus důkazu podílem v roce 2022, protože je bezpečnější, méně energeticky náročný a lepší pro implementaci nových řešení škálování ve srovnání s předchozí architekturou [důkazu prací (PoW)](/developers/docs/consensus-mechanisms/pow).

## Předpoklady {#prerequisites}

Pro lepší pochopení této stránky doporučujeme nejprve si přečíst o [mechanismech konsensu](/developers/docs/consensus-mechanisms/).

## Co je důkaz podílem (PoS)? {#what-is-pos}

Důkaz podílem je způsob, jak dokázat, že validátoři vložili do sítě něco hodnotného, co může být zničeno, pokud se budou chovat nečestně. V důkazu podílem [Etherea](/) validátoři explicitně stakují kapitál ve formě ETH do chytrého kontraktu na Ethereu. Validátor je pak zodpovědný za kontrolu, zda jsou nové bloky šířené po síti platné, a příležitostně sám vytváří a šíří nové bloky. Pokud se pokusí podvést síť (například navržením více bloků, když by měli poslat jeden, nebo odesláním konfliktních atestací), část nebo celé jejich stakované ETH může být zničeno.

## Validátoři {#validators}

Aby se uživatel mohl účastnit jako validátor, musí vložit 32 ETH do depozitního kontraktu a spustit tři samostatné softwary: exekučního klienta, konsensuálního klienta a klienta validátora. Po vložení svého ETH se uživatel připojí do fronty pro aktivaci, která omezuje rychlost připojování nových validátorů do sítě. Po aktivaci validátoři přijímají nové bloky od peerů v síti Ethereum. Transakce doručené v bloku jsou znovu spuštěny, aby se zkontrolovalo, že navrhované změny stavu Etherea jsou platné, a zkontroluje se podpis bloku. Validátor poté odešle hlas (nazývaný atestace) ve prospěch tohoto bloku napříč sítí.

Zatímco u důkazu prací je načasování bloků určeno obtížností těžby, u důkazu podílem je tempo pevně dané. Čas v Ethereu s důkazem podílem je rozdělen na sloty (12 sekund) a epochy (32 slotů). V každém slotu je náhodně vybrán jeden validátor jako navrhovatel bloku. Tento validátor je zodpovědný za vytvoření nového bloku a jeho odeslání dalším uzlům v síti. Také v každém slotu je náhodně vybrán výbor validátorů, jejichž hlasy se používají k určení platnosti navrhovaného bloku. Rozdělení sady validátorů do výborů je důležité pro udržení zvládnutelného zatížení sítě. Výbory rozdělují sadu validátorů tak, aby každý aktivní validátor atestoval v každé epoše, ale ne v každém slotu.

## Jak se provádí transakce v Ethereu s PoS {#transaction-execution-ethereum-pos}

Následující text poskytuje komplexní vysvětlení toho, jak se transakce provádí v Ethereu s důkazem podílem.

1. Uživatel vytvoří a podepíše [transakci](/developers/docs/transactions/) svým soukromým klíčem. To obvykle řeší peněženka nebo knihovna, jako je [Ethers.js](https://docs.ethers.org/v6/), [web3js](https://docs.web3js.org/), [web3py](https://web3py.readthedocs.io/en/v5/) atd., ale interně uživatel odesílá požadavek na uzel pomocí [JSON-RPC API](/developers/docs/apis/json-rpc/) Etherea. Uživatel definuje množství gasu, které je ochoten zaplatit jako prioritní poplatek validátorovi, aby ho povzbudil k zahrnutí transakce do bloku. [Prioritní poplatky](/developers/docs/gas/#priority-fee) jsou vyplaceny validátorovi, zatímco [základní poplatek](/developers/docs/gas/#base-fee) je spálen.
2. Transakce je odeslána [exekučnímu klientovi](/developers/docs/nodes-and-clients/#execution-client) Etherea, který ověří její platnost. To znamená zajištění, že odesílatel má dostatek ETH k provedení transakce a že ji podepsal správným klíčem.
3. Pokud je transakce platná, exekuční klient ji přidá do svého lokálního mempoolu (seznamu čekajících transakcí) a také ji vysílá dalším uzlům přes gossip síť exekuční vrstvy. Když se o transakci dozvědí další uzly, přidají ji také do svého lokálního mempoolu. Pokročilí uživatelé se mohou zdržet vysílání své transakce a místo toho ji předat specializovaným tvůrcům bloků, jako je [Flashbots Auction](https://docs.flashbots.net/flashbots-auction/overview). To jim umožňuje organizovat transakce v nadcházejících blocích pro maximální zisk ([MEV](/developers/docs/mev/#mev-extraction)).
4. Jeden z uzlů validátora v síti je navrhovatelem bloku pro aktuální slot, přičemž byl dříve pseudonáhodně vybrán pomocí RANDAO. Tento uzel je zodpovědný za sestavení a vysílání dalšího bloku, který má být přidán do blockchainu Etherea, a za aktualizaci globálního stavu. Uzel se skládá ze tří částí: exekučního klienta, konsensuálního klienta a klienta validátora. Exekuční klient sdružuje transakce z lokálního mempoolu do „exekučního payloadu“ a provádí je lokálně, aby vygeneroval změnu stavu. Tyto informace jsou předány konsensuálnímu klientovi, kde je exekuční payload zabalen jako součást „beacon bloku“, který také obsahuje informace o odměnách, trestech, penalizacích, atestacích atd., které umožňují síti dohodnout se na sekvenci bloků na vrcholu řetězce. Komunikace mezi exekučními a konsensuálními klienty je podrobněji popsána v části [Propojení konsensuálních a exekučních klientů](/developers/docs/networking-layer/#connecting-clients).
5. Ostatní uzly přijmou nový beacon blok na gossip síti vrstvy konsensu. Předají jej svému exekučnímu klientovi, kde jsou transakce lokálně znovu spuštěny, aby se zajistilo, že navrhovaná změna stavu je platná. Klient validátora poté atestuje, že blok je platný a je logickým dalším blokem v jejich pohledu na řetězec (což znamená, že staví na řetězci s největší vahou atestací, jak je definováno v [pravidlech volby forku](/developers/docs/consensus-mechanisms/pos/#fork-choice)). Blok je přidán do lokální databáze v každém uzlu, který jej atestuje.
6. Transakci lze považovat za „finalizovanou“, pokud se stala součástí řetězce s „odkazem supervětšiny“ mezi dvěma kontrolními body. Kontrolní body se vyskytují na začátku každé epochy a existují proto, aby zohlednily skutečnost, že v každém slotu atestuje pouze podmnožina aktivních validátorů, ale všichni aktivní validátoři atestují napříč každou epochou. Proto lze „odkaz supervětšiny“ prokázat pouze mezi epochami (to je situace, kdy se 66 % celkového stakovaného ETH v síti shodne na dvou kontrolních bodech).

Více podrobností o finalitě naleznete níže.

## Finalita {#finality}

Transakce má v distribuovaných sítích „finalitu“, když je součástí bloku, který se nemůže změnit bez spálení velkého množství ETH. V Ethereu s důkazem podílem je to spravováno pomocí bloků „kontrolních bodů“. První blok v každé epoše je kontrolní bod. Validátoři hlasují pro páry kontrolních bodů, které považují za platné. Pokud pár kontrolních bodů přiláká hlasy představující alespoň dvě třetiny celkového stakovaného ETH, kontrolní body jsou povýšeny. Novější z těchto dvou (cíl) se stává „ospravedlněným“. Dřívější z těchto dvou je již ospravedlněný, protože byl „cílem“ v předchozí epoše. Nyní je povýšen na „finalizovaný“. Tento proces povyšování kontrolních bodů je řízen pomocí **[Casper the Friendly Finality Gadget (Casper FFG)](https://arxiv.org/pdf/1710.09437)**. Casper FFG je nástroj pro finalitu bloků pro konsensus. Jakmile je blok finalizován, nemůže být zvrácen nebo změněn bez většinové penalizace stakerů, což to činí ekonomicky neproveditelným.

Ke zvrácení finalizovaného bloku by se útočník zavázal ke ztrátě alespoň jedné třetiny celkové nabídky stakovaného ETH. Přesný důvod je vysvětlen v tomto [příspěvku na blogu Nadace Ethereum](https://blog.ethereum.org/2016/05/09/on-settlement-finality). Vzhledem k tomu, že finalita vyžaduje dvoutřetinovou většinu, útočník by mohl zabránit síti v dosažení finality hlasováním s jednou třetinou celkového staku. Existuje mechanismus, jak se proti tomu bránit: [únik za neaktivitu](https://eth2book.info/bellatrix/part2/incentives/inactivity). Ten se aktivuje, kdykoli se řetězci nepodaří finalizovat po dobu delší než čtyři epochy. Únik za neaktivitu odčerpává stakované ETH od validátorů hlasujících proti většině, což umožňuje většině znovu získat dvoutřetinovou většinu a finalizovat řetězec.

## Kryptoekonomická bezpečnost {#crypto-economic-security}

Provozování validátora je závazek. Očekává se, že validátor bude udržovat dostatečný hardware a konektivitu, aby se mohl účastnit validace bloku a návrhu. Na oplátku je validátor placen v ETH (jejich stakovaný zůstatek se zvyšuje). Na druhou stranu účast jako validátor také otevírá uživatelům nové cesty k útoku na síť za účelem osobního zisku nebo sabotáže. Aby se tomu zabránilo, validátoři přicházejí o odměny v ETH, pokud se nezúčastní, když jsou k tomu vyzváni, a jejich stávající stake může být zničen, pokud se chovají nečestně. Dvě primární chování lze považovat za nečestná: navrhování více bloků v jednom slotu (equivocation) a předkládání protichůdných atestací.

Množství penalizovaného ETH závisí na tom, kolik validátorů je také penalizováno přibližně ve stejnou dobu. To je známé jako [„korelační penalizace“](https://eth2book.info/bellatrix/part2/incentives/slashing#the-correlation-penalty) a může být menší (~1 % staku pro jednoho validátora penalizovaného samostatně) nebo může vést ke zničení 100 % staku validátora (událost hromadné penalizace). Ukládá se v polovině období nuceného výstupu, které začíná okamžitou penalizací (až 1 ETH) v den 1, korelační penalizací v den 18 a nakonec vyloučením ze sítě v den 36. Každý den dostávají menší penalizace za atestace, protože jsou přítomni v síti, ale neodesílají hlasy. To vše znamená, že koordinovaný útok by byl pro útočníka velmi nákladný.

## Volba forku {#fork-choice}

Když síť funguje optimálně a čestně, na vrcholu řetězce je vždy jen jeden nový blok a všichni validátoři jej atestují. Je však možné, že validátoři mají různé pohledy na vrchol řetězce kvůli latenci sítě nebo proto, že navrhovatel bloku jednal dvojznačně (equivocation). Proto konsensuální klienti vyžadují algoritmus, který rozhodne, kterému dát přednost. Algoritmus používaný v Ethereu s důkazem podílem se nazývá [LMD-GHOST](https://arxiv.org/pdf/2003.03052.pdf) a funguje tak, že identifikuje fork, který má ve své historii největší váhu atestací.

## Důkaz podílem a bezpečnost {#pos-and-security}

Hrozba [51% útoku](https://www.investopedia.com/terms/1/51-attack.asp) stále existuje u důkazu podílem stejně jako u důkazu prací, ale pro útočníky je ještě riskantnější. Útočník by potřeboval 51 % stakovaného ETH. Poté by mohl použít své vlastní atestace k zajištění toho, aby jeho preferovaný fork byl ten s nejvíce nashromážděnými atestacemi. „Váha“ nashromážděných atestací je to, co konsensuální klienti používají k určení správného řetězce, takže tento útočník by byl schopen učinit svůj fork kanonickým. Silnou stránkou důkazu podílem oproti důkazu prací je však to, že komunita má flexibilitu při zahájení protiútoku. Například čestní validátoři by se mohli rozhodnout pokračovat ve stavění na menšinovém řetězci a ignorovat útočníkův fork, přičemž by povzbuzovali aplikace, burzy a pooly, aby udělaly totéž. Mohli by se také rozhodnout násilně odstranit útočníka ze sítě a zničit jeho stakované ETH. To jsou silné ekonomické obrany proti 51% útoku.

Kromě 51% útoků se mohou špatní aktéři pokusit i o jiné typy škodlivých aktivit, jako jsou:

- útoky na dlouhou vzdálenost (ačkoli nástroj pro finalitu tento vektor útoku neutralizuje)
- krátkodobé „reorganizace“ (ačkoli zvýhodnění navrhovatele a termíny atestací to zmírňují)
- útoky typu bouncing a balancing (také zmírněny zvýhodněním navrhovatele a tyto útoky byly každopádně demonstrovány pouze za idealizovaných síťových podmínek)
- lavinové útoky (neutralizovány pravidlem algoritmů volby forku, které zvažuje pouze nejnovější zprávu)

Celkově se ukázalo, že důkaz podílem, jak je implementován na Ethereu, je ekonomicky bezpečnější než důkaz prací.

## Výhody a nevýhody {#pros-and-cons}

| Výhody                                                                                                                                                                                                              | Nevýhody                                                                                |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------- |
| Staking usnadňuje jednotlivcům účast na zabezpečení sítě, což podporuje decentralizaci. Uzel validátora lze spustit na běžném notebooku. Staking pooly umožňují uživatelům stakovat, aniž by měli 32 ETH. | Důkaz podílem je mladší a méně prověřený v praxi ve srovnání s důkazem prací            |
| Staking je více decentralizovaný. Úspory z rozsahu neplatí stejným způsobem jako u těžby PoW.                                                                                                         | Důkaz podílem je složitější na implementaci než důkaz prací                             |
| Důkaz podílem nabízí větší kryptoekonomickou bezpečnost než důkaz prací                                                                                                                                           | Uživatelé musí spustit tři softwary, aby se mohli účastnit důkazu podílem Etherea. |
| K motivaci účastníků sítě je zapotřebí menší emise nového ETH                                                                                                                                            |                                                                                         |

### Srovnání s důkazem prací {#comparison-to-proof-of-work}

Ethereum původně používalo důkaz prací, ale v září 2022 přešlo na důkaz podílem. PoS nabízí oproti PoW několik výhod, jako například:

- lepší energetická účinnost – není třeba spotřebovávat spoustu energie na výpočty důkazu prací
- nižší bariéry vstupu, snížené hardwarové požadavky – není potřeba elitní hardware, abyste měli šanci vytvářet nové bloky
- snížené riziko centralizace – důkaz podílem by měl vést k tomu, že síť bude zabezpečovat více uzlů
- kvůli nízkým energetickým požadavkům je k motivaci k účasti zapotřebí menší emise ETH
- ekonomické tresty za špatné chování činí útoky typu 51 % pro útočníka nákladnějšími ve srovnání s důkazem prací
- komunita se může uchýlit k sociální obnově čestného řetězce, pokud by 51% útok překonal kryptoekonomické obrany.

## Další čtení {#further-reading}

- [Často kladené dotazy k důkazu podílem](https://vitalik.eth.limo/general/2017/12/31/pos_faq.html) _Vitalik Buterin_
- [Co je důkaz podílem](https://consensys.net/blog/blockchain-explained/what-is-proof-of-stake/) _ConsenSys_
- [Co je důkaz podílem a proč na něm záleží](https://bitcoinmagazine.com/culture/what-proof-of-stake-is-and-why-it-matters-1377531463) _Vitalik Buterin_
- [Proč důkaz podílem (listopad 2020)](https://vitalik.eth.limo/general/2020/11/06/pos2020.html) _Vitalik Buterin_
- [Důkaz podílem: Jak jsem se naučil milovat slabou subjektivitu](https://blog.ethereum.org/2014/11/25/proof-stake-learned-love-weak-subjectivity) _Vitalik Buterin_
- [Útok a obrana Etherea s důkazem podílem](https://mirror.xyz/jmcook.eth/YqHargbVWVNRQqQpVpzrqEQ8IqwNUJDIpwRP7SS5FXs)
- [Filozofie návrhu důkazu podílem](https://medium.com/@VitalikButerin/a-proof-of-stake-design-philosophy-506585978d51) _Vitalik Buterin_
- [Video: Vitalik Buterin vysvětluje důkaz podílem Lexi Fridmanovi](https://www.youtube.com/watch?v=3yrqBG-7EVE)

## Související témata {#related-topics}

- [Důkaz prací (PoW)](/developers/docs/consensus-mechanisms/pow/)
- [Důkaz autority](/developers/docs/consensus-mechanisms/poa/)