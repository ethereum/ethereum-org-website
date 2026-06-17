---
title: Často kladené dotazy
description: Často kladené dotazy ohledně Etherea s důkazem podílem (PoS).
lang: cs
---

## Co je důkaz podílem (PoS) {#what-is-proof-of-stake}

Důkaz podílem (PoS) je třída algoritmů, která může poskytovat bezpečnost blockchainům tím, že zajišťuje, aby útočníci, kteří jednají nečestně, přišli o svá hodnotná aktiva. Systémy s důkazem podílem vyžadují, aby skupina validátorů poskytla určité aktivum, které může být zničeno, pokud se validátor zapojí do nějakého prokazatelně nečestného chování. Ethereum používá mechanismus konsensu důkaz podílem k zabezpečení blockchainu.

## Jak si stojí důkaz podílem (PoS) v porovnání s důkazem prací (PoW)? {#comparison-to-proof-of-work}

Jak důkaz prací (PoW), tak důkaz podílem (PoS) jsou mechanismy, které ekonomicky odrazují zlomyslné aktéry od spamování nebo podvádění sítě. V obou případech uzly, které se aktivně účastní konsensu, vkládají „do sítě“ nějaké aktivum, o které přijdou, pokud se budou chovat nesprávně.

U důkazu prací je tímto aktivem energie. Uzel, známý jako těžař, spouští algoritmus, jehož cílem je vypočítat hodnotu rychleji než jakýkoli jiný uzel. Nejrychlejší uzel má právo navrhnout blok do řetězce. Aby těžař změnil historii řetězce nebo ovládl návrh bloku, musel by mít tak velký výpočetní výkon, že by tento závod vždy vyhrál. To je neúměrně drahé a obtížně proveditelné, což chrání řetězec před útoky. Energie potřebná k „těžbě“ pomocí důkazu prací je aktivum reálného světa, za které těžaři platí.

Důkaz podílem vyžaduje, aby uzly, známé jako validátory, explicitně odeslaly krypto aktivum do chytrého kontraktu. Pokud se validátor chová nesprávně, může být toto krypto zničeno, protože provádí „staking“ svých aktiv přímo do řetězce namísto nepřímo prostřednictvím výdajů na energii.

Důkaz prací je mnohem náročnější na energii, protože se při procesu těžby spaluje elektřina. Důkaz podílem na druhou stranu vyžaduje jen velmi malé množství energie – validátory Etherea mohou běžet i na zařízení s nízkým výkonem, jako je Raspberry Pi. Mechanismus důkazu podílem Etherea je považován za bezpečnější než důkaz prací, protože náklady na útok jsou vyšší a důsledky pro útočníka jsou závažnější.

Důkaz prací versus důkaz podílem je sporné téma. [Blog Vitalika Buterina](https://vitalik.eth.limo/general/2017/12/31/pos_faq.html#what-are-the-benefits-of-proof-of-stake-as-opposed-to-proof-of-work) a debata mezi Justinem Drakem a Lyn Alden poskytují dobré shrnutí argumentů.

<VideoWatch slug="pow-vs-pos" />

## Je důkaz podílem energeticky účinný? {#is-pos-energy-efficient}

Ano. Uzly v síti s důkazem podílem spotřebovávají nepatrné množství energie. Studie třetí strany dospěla k závěru, že celá síť Etherea s důkazem podílem spotřebuje přibližně 0,0026 TWh/rok – asi 13 000krát méně než samotné hraní her v USA.

[Více o spotřebě energie Etherea](/energy-consumption/).

## Je důkaz podílem bezpečný? {#is-pos-secure}

Důkaz podílem Etherea je velmi bezpečný. Tento mechanismus byl zkoumán, vyvíjen a přísně testován po dobu osmi let, než byl spuštěn. Záruky bezpečnosti se liší od blockchainů s důkazem prací. U důkazu podílem mohou být zlomyslné validátory aktivně potrestány („penalizovány“) a vyloučeny ze sady validátorů, což je stojí značné množství ETH. V rámci důkazu prací může útočník svůj útok opakovat, dokud má dostatečný hashovací výkon. Je také nákladnější provést ekvivalentní útoky na Ethereum s důkazem podílem než v rámci důkazu prací. K ovlivnění živosti (liveness) řetězce je zapotřebí alespoň 33 % z celkového stakovaného etheru v síti (s výjimkou případů velmi sofistikovaných útoků s extrémně nízkou pravděpodobností úspěchu). K ovládnutí obsahu budoucích bloků je zapotřebí alespoň 51 % z celkového stakovaného ETH a k přepsání historie je potřeba více než 66 % celkového staku. Protokol Etherea by tato aktiva zničil ve scénářích 33% nebo 51% útoku a prostřednictvím sociálního konsensu ve scénáři 66% útoku.

- [Více o obraně Etherea s důkazem podílem před útočníky](/developers/docs/consensus-mechanisms/pos/attack-and-defense)
- [Více o návrhu důkazu podílem](https://medium.com/@VitalikButerin/a-proof-of-stake-design-philosophy-506585978d51)

## Dělá důkaz podílem Ethereum levnějším? {#does-pos-make-ethereum-cheaper}

Ne. Náklady na odeslání transakce (poplatek za plyn) jsou určovány dynamickým trhem poplatků, který roste s vyšší poptávkou v síti. Mechanismus konsensu to přímo neovlivňuje.

[Více o gasu](/developers/docs/gas).

## Co jsou uzly, klienti a validátory? {#what-are-nodes-clients-and-validators}

Uzly jsou počítače připojené k síti Ethereum. Klienti jsou software, který na nich běží a který mění počítač na uzel. Existují dva typy klientů: exekuční klienti a konsensuální klienti. K vytvoření uzlu jsou zapotřebí oba. Validátor je volitelný doplněk konsensuálního klienta, který umožňuje uzlu účastnit se konsensu důkazu podílem. To znamená vytváření a navrhování bloků, když je vybrán, a atestování bloků, o kterých se dozví v síti. K provozování validátoru musí provozovatel uzlu vložit 32 ETH do depozitního kontraktu.

- [Více o uzlech a klientech](/developers/docs/nodes-and-clients)
- [Více o stakingu](/staking)

## Je důkaz podílem nová myšlenka? {#is-pos-new}

Ne. Uživatel na fóru BitcoinTalk [navrhl základní myšlenku důkazu podílem](https://bitcointalk.org/index.php?topic=27787.0) jako vylepšení pro Bitcoin v roce 2011. Trvalo jedenáct let, než byl připraven k implementaci na Ethereum Mainnet. Některé jiné řetězce implementovaly důkaz podílem dříve než Ethereum, ale ne specifický mechanismus Etherea (známý jako Gasper).

## Co je zvláštního na důkazu podílem Etherea? {#why-is-ethereum-pos-special}

Mechanismus důkazu podílem Etherea je jedinečný svým designem. Nebyl to první mechanismus důkazu podílem, který byl navržen a implementován, ale je nejrobustnější. Mechanismus důkazu podílem je známý jako „Casper“. Casper definuje, jak jsou validátory vybírány k navrhování bloků, jak a kdy se provádějí atestace, jak se atestace počítají, odměny a tresty udělované validátorům, podmínky pro penalizaci, bezpečnostní mechanismy, jako je únik za neaktivitu, a podmínky pro „finalitu“. Finalita je podmínka, že aby byl blok považován za trvalou součást kanonického řetězce, musí pro něj hlasovat alespoň 66 % z celkového stakovaného ETH v síti. Výzkumníci vyvinuli Casper speciálně pro Ethereum a Ethereum je první a jediný blockchain, který jej implementoval.

Kromě Casperu používá důkaz podílem Etherea algoritmus volby forku zvaný LMD-GHOST. To je vyžadováno v případě, že nastane situace, kdy existují dva bloky pro stejný slot. Tím vzniknou dva forky blockchainu. LMD-GHOST vybere ten, který má největší „váhu“ atestací. Váha je počet atestací vážený efektivním zůstatkem validátorů. LMD-GHOST je pro Ethereum unikátní.

Kombinace Casperu a LMD-GHOST je známá jako Gasper.

[Více o Gasperu](/developers/docs/consensus-mechanisms/pos/gasper/)

## Co je penalizace? {#what-is-slashing}

Penalizace (slashing) je termín označující zničení části staku validátoru a vyloučení validátoru ze sítě. Množství ETH ztraceného při penalizaci se úměrně zvyšuje s počtem penalizovaných validátorů – to znamená, že tajně spolupracující validátory jsou potrestány přísněji než jednotlivci.

[Více o penalizaci](/developers/docs/consensus-mechanisms/pos/rewards-and-penalties#slashing)

## Proč validátory potřebují 32 ETH? {#why-32-eth}

Validátory musí stakovat ETH, aby měly co ztratit, pokud se budou chovat nesprávně. Důvodem, proč musí stakovat konkrétně 32 ETH, je umožnit běh uzlů na skromném hardwaru. Pokud by bylo minimální množství ETH na validátor nižší, pak by se zvýšil počet validátorů a tím i počet zpráv, které musí být zpracovány v každém slotu, což by znamenalo, že by k provozu uzlu byl zapotřebí výkonnější hardware.

## Jak jsou vybírány validátory? {#how-are-validators-selected}

Jeden validátor je pseudonáhodně vybrán, aby navrhl blok v každém slotu pomocí algoritmu zvaného RANDAO, který míchá hash od navrhovatele bloku se seedem, který se aktualizuje s každým blokem. Tato hodnota se používá k výběru konkrétního validátoru z celkové sady validátorů. Výběr validátoru je pevně stanoven dvě epochy předem.

[Více o výběru validátorů](/developers/docs/consensus-mechanisms/pos/block-proposal)

## Co je stake grinding? {#what-is-stake-grinding}

Stake grinding je kategorie útoku na sítě s důkazem podílem, kde se útočník snaží ovlivnit algoritmus výběru validátorů ve prospěch svých vlastních validátorů. Útoky stake grinding na RANDAO vyžadují přibližně polovinu celkového stakovaného ETH.

[Více o stake grindingu](https://eth2book.info/altair/part2/building_blocks/randomness/#randao-biasability)

## Co je sociální osekání? {#what-is-social-slashing}

Sociální osekání je schopnost komunity koordinovat fork blockchainu v reakci na útok. Umožňuje komunitě zotavit se z toho, že útočník finalizuje nečestný řetězec. Sociální osekání lze také použít proti útokům cenzury.

- [Více o sociálním osekání](https://ercwl.medium.com/the-case-for-social-slashing-59277ff4d9c7)
- [Vitalik Buterin o sociálním osekání](https://vitalik.eth.limo/general/2017/12/31/pos_faq.html#what-is-proof-of-stake)

## Budu penalizován? {#will-i-get-slashed}

Jako validátor je velmi obtížné být penalizován, pokud se záměrně nezapojíte do zlomyslného chování. Penalizace se uplatňuje pouze ve velmi specifických scénářích, kdy validátory navrhnou více bloků pro stejný slot nebo si protiřečí svými atestacemi – je velmi nepravděpodobné, že by k nim došlo náhodou.

[Více o podmínkách penalizace](https://eth2book.info/altair/part2/incentives/slashing)

## Co je problém ničeho v sázce? {#what-is-nothing-at-stake-problem}

Problém ničeho v sázce je koncepční problém u některých mechanismů důkazu podílem, kde existují pouze odměny a žádné tresty. Pokud není nic v sázce, pragmatický validátor je stejně ochotný atestovat jakýkoli, nebo dokonce více forků blockchainu, protože to zvyšuje jeho odměny. Ethereum to obchází pomocí podmínek finality a penalizace, aby zajistilo jeden kanonický řetězec.

[Více o problému ničeho v sázce](https://vitalik.eth.limo/general/2017/12/31/pos_faq.html#what-is-the-nothing-at-stake-problem-and-how-can-it-be-fixed)

## Co je algoritmus volby forku? {#what-is-a-fork-choice-algorithm}

Algoritmus volby forku implementuje pravidla určující, který řetězec je ten kanonický. Za optimálních podmínek není potřeba pravidlo volby forku, protože na každý slot připadá pouze jeden navrhovatel bloku a jeden blok, ze kterého lze vybírat. Občas však více bloků pro stejný slot nebo pozdě příchozí informace vedou k více možnostem, jak jsou bloky poblíž hlavy řetězce uspořádány. V těchto případech musí všichni klienti implementovat určitá pravidla identicky, aby se ujistili, že všichni vyberou správnou sekvenci bloků. Algoritmus volby forku tato pravidla kóduje.

Algoritmus volby forku Etherea se nazývá LMD-GHOST. Vybírá fork s největší váhou atestací, což znamená ten, pro který hlasovalo nejvíce stakovaného ETH.

[Více o LMD-GHOST](/developers/docs/consensus-mechanisms/pos/gasper/#fork-choice)

## Co je finalita v důkazu podílem? {#what-is-finality}

Finalita v důkazu podílem je záruka, že daný blok je trvalou součástí kanonického řetězce a nemůže být zvrácen, pokud nedojde k selhání konsensu, při kterém útočník spálí 33 % z celkového stakovaného etheru. Jedná se o „kryptoekonomickou“ finalitu, na rozdíl od „pravděpodobnostní finality“, která je relevantní pro blockchainy s důkazem prací. U pravděpodobnostní finality neexistují žádné explicitní stavy finalizováno/nefinalizováno pro bloky – jednoduše se stává stále méně pravděpodobným, že by blok mohl být odstraněn z řetězce, jak stárne, a uživatelé sami určují, kdy jsou si dostatečně jisti, že je blok „bezpečný“. S kryptoekonomickou finalitou musí pro páry bloků kontrolních bodů hlasovat 66 % stakovaného etheru. Pokud je tato podmínka splněna, bloky mezi těmito kontrolními body jsou explicitně „finalizovány“.

[Více o finalitě](/developers/docs/consensus-mechanisms/pos/#finality)

## Co je „slabá subjektivita“? {#what-is-weak-subjectivity}

Slabá subjektivita je vlastnost sítí s důkazem podílem, kde se k potvrzení aktuálního stavu blockchainu používají sociální informace. Novým uzlům nebo uzlům, které se znovu připojují k síti po dlouhé době offline, může být poskytnut nedávný stav, aby uzel mohl okamžitě vidět, zda je na správném řetězci. Tyto stavy jsou známé jako „kontrolní body slabé subjektivity“ a lze je získat od jiných provozovatelů uzlů mimo pásmo (out-of-band), z průzkumníků bloků nebo z několika veřejných koncových bodů.

[Více o slabé subjektivitě](/developers/docs/consensus-mechanisms/pos/weak-subjectivity)

## Je důkaz podílem odolný vůči cenzuře? {#is-pos-censorship-resistant}

Odolnost vůči cenzuře je v současné době těžké prokázat. Na rozdíl od důkazu prací však důkaz podílem nabízí možnost koordinovat penalizace k potrestání cenzurujících validátorů. Připravují se změny protokolu, které oddělují tvůrce bloků od navrhovatelů bloků a implementují seznamy transakcí, které tvůrci musí zahrnout do každého bloku. Tento návrh je známý jako oddělení navrhovatele a tvůrce (PBS) a pomáhá zabránit validátorům v cenzurování transakcí.

[Více o oddělení navrhovatele a tvůrce (PBS)](https://notes.ethereum.org/@fradamt/H1TsYRfJc#Original-basic-scheme)

## Může být systém důkazu podílem Etherea vystaven 51% útoku? {#pos-51-attack}

Ano. Důkaz podílem je zranitelný vůči 51% útokům, stejně jako důkaz prací. Místo toho, aby útočník vyžadoval 51 % hashovacího výkonu sítě, vyžaduje 51 % z celkového stakovaného ETH. Útočník, který nashromáždí 51 % celkového staku, získá kontrolu nad algoritmem volby forku. To útočníkovi umožňuje cenzurovat určité transakce, provádět reorganizace na krátkou vzdálenost a extrahovat MEV přeskupováním bloků ve svůj prospěch.

[Více o útocích na důkaz podílem](/developers/docs/consensus-mechanisms/pos/attack-and-defense)

## Co je sociální koordinace a proč je potřebná? {#what-is-social-coordination}

Sociální koordinace je poslední linií obrany pro Ethereum, která by umožnila obnovit čestný řetězec z útoku, který finalizoval nečestné bloky. V tomto případě by se komunita Etherea musela koordinovat „mimo pásmo“ (out-of-band) a dohodnout se na použití čestného menšinového forku, přičemž by v tomto procesu penalizovala validátory útočníka. To by vyžadovalo, aby aplikace a burzy také uznaly čestný fork.

[Přečtěte si více o sociální koordinaci](/developers/docs/consensus-mechanisms/pos/attack-and-defense#people-the-last-line-of-defense)

## Bohatnou bohatí v důkazu podílem více? {#do-rich-get-richer}

Čím více ETH má někdo ke stakování, tím více validátorů může provozovat a tím více odměn může získat. Odměny rostou lineárně s množstvím stakovaného ETH a každý získá stejný procentuální výnos. Důkaz prací obohacuje bohaté více než důkaz podílem, protože bohatší těžaři, kteří nakupují hardware ve velkém, těží z úspor z rozsahu, což znamená, že vztah mezi bohatstvím a odměnou je nelineární.

## Je důkaz podílem více centralizovaný než důkaz prací? {#is-pos-decentralized}

Ne, důkaz prací směřuje k centralizaci, protože náklady na těžbu rostou a vytlačují jednotlivce, pak vytlačují malé společnosti a tak dále. Současným problémem důkazu podílem je vliv derivátů likvidního stakingu (LSD). Jedná se o tokeny představující ETH stakované nějakým poskytovatelem, které může kdokoli swapovat na sekundárních trzích, aniž by bylo skutečné ETH od-stakováno. LSD umožňují uživatelům stakovat s méně než 32 ETH, ale také vytvářejí riziko centralizace, kdy několik velkých organizací může nakonec ovládat velkou část staku. To je důvod, proč je [sólo staking](/staking/solo) tou nejlepší volbou pro Ethereum.

[Více o centralizaci staku v LSD](https://notes.ethereum.org/@djrtwo/risks-of-lsd)

## Proč mohu stakovat pouze ETH? {#why-can-i-only-stake-eth}

ETH je nativní měna Etherea. Je nezbytné mít jedinou měnu, ve které jsou denominovány všechny staky, a to jak pro účtování efektivních zůstatků pro vážení hlasů, tak pro bezpečnost. Samotné ETH je spíše základní součástí Etherea než chytrým kontraktem. Začlenění jiných měn by výrazně zvýšilo složitost a snížilo bezpečnost stakingu.

## Je Ethereum jediným blockchainem s důkazem podílem? {#is-ethereum-the-only-pos-blockchain}

Ne, existuje několik blockchainů s důkazem podílem. Žádný není identický s Ethereem; mechanismus důkazu podílem Etherea je jedinečný.

## Co je Merge? {#what-is-the-merge}

Merge byl okamžik, kdy Ethereum vypnulo svůj mechanismus konsensu založený na důkazu prací a zapnulo svůj mechanismus konsensu založený na důkazu podílem. Merge proběhl 15. září 2022.

[Více o Merge](/roadmap/merge)

## Co je živost (liveness) a bezpečnost (safety)? {#what-are-liveness-and-safety}

Živost a bezpečnost jsou dvě základní bezpečnostní hlediska pro blockchain. Živost je dostupnost finalizujícího řetězce. Pokud řetězec přestane finalizovat nebo k němu uživatelé nemají snadný přístup, jedná se o selhání živosti. Extrémně vysoké náklady na přístup by také mohly být považovány za selhání živosti. Bezpečnost odkazuje na to, jak obtížné je zaútočit na řetězec – tj. finalizovat konfliktní kontrolní body.

[Přečtěte si více v dokumentu o Casperu](https://arxiv.org/pdf/1710.09437.pdf)