---
title: Často kladené otázky
description: Často kladené otázky ohledně Etherea s důkazem podílem.
lang: cs
---

## Co je to důkaz podílem {#what-is-proof-of-stake}

Důkaz podílem je třída algoritmu, která může poskytnout zabezpečení blockchainům tím, že zajistí, že útočníci, kteří jednají nečestně, přijdou o hodnotná aktiva. Systémy s důkazem podílem vyžadují, aby sada validátorů zpřístupnila nějaký majetek, který může být zničen, pokud se validátor prokazatelně chová nečestně. Ethereum používá mechanismus důkazu podílem k zabezpečení blockchainu.

## Jak si stojí důkaz podílem v porovnání s důkazem prací? {#comparison-to-proof-of-work}

Jak důkaz prací, tak důkaz podílem jsou mechanismy, které ekonomicky odrazují škodlivé aktéry od spamování nebo podvodů v síti. V obou případech uzly, které se aktivně účastní konsensu, vkládají "do sítě" nějaké aktivum, o které přijdou, pokud se budou chovat nesprávně.

V případě důkazu prací je tímto aktivem energie. Uzel, známý jako těžař, spouští algoritmus, jehož cílem je vypočítat hodnotu rychleji než jakýkoli jiný uzel. Nejrychlejší uzel má právo navrhnout blok do řetězce. Aby mohl těžař změnit historii řetězce nebo ovládnout navrhování bloků, musel by mít tolik výpočetního výkonu, aby vždy vyhrál závod. Je to neúměrně drahé a obtížně proveditelné, což chrání řetězec před útoky. Energie potřebná k "těžbě" pomocí důkazu prací je reálné aktivum, za které těžaři platí.

Důkaz podílem vyžaduje, aby uzly, známé jako validátoři, explicitně odeslaly kryptoaktivum do chytrého kontraktu. Pokud se validátor chová nesprávně, může být toto kryptoaktivum zničeno, protože svá aktiva "stakují" přímo do řetězce, nikoli nepřímo prostřednictvím výdajů na energii.

Důkaz prací je mnohem energeticky náročnější, protože při procesu těžby se spotřebovává elektřina. Na druhou stranu důkaz podílem vyžaduje jen velmi malé množství energie – validátoři Etherea mohou dokonce běžet na zařízení s nízkou spotřebou, jako je Raspberry Pi. Mechanismus důkazu podílem Etherea je považován za bezpečnější než důkaz prací, protože náklady na útok jsou vyšší a důsledky pro útočníka jsou závažnější.

Důkaz prací versus důkaz podílem je kontroverzní téma. [Blog Vitalika Buterina](https://vitalik.eth.limo/general/2017/12/31/pos_faq.html#what-are-the-benefits-of-proof-of-stake-as-opposed-to-proof-of-work) a debata mezi Justinem Drakem a Lyn Aldenovou poskytují dobré shrnutí argumentů.

<YouTube id="1m12zgJ42dI" />

## Je důkaz podílem energeticky účinný? {#is-pos-energy-efficient}

Ano. Uzly v síti s důkazem podílem spotřebovávají nepatrné množství energie. Studie třetí strany dospěla k závěru, že celá síť Ethereum s důkazem podílem spotřebuje přibližně 0,0026 TWh/rok – což je asi 13 000krát méně než hraní her v samotných USA.

[Více o spotřebě energie Etherea](/energy-consumption/).

## Je důkaz podílem bezpečný? {#is-pos-secure}

Důkaz podílem Etherea je velmi bezpečný. Mechanismus byl osm let důkladně zkoumán, vyvíjen a testován, než byl spuštěn do ostrého provozu. Bezpečnostní záruky se liší od blockchainů s důkazem prací. V důkazu podílem mohou být škodliví validátoři aktivně potrestáni ("slashed") a vyloučeni ze sady validátorů, což je stojí značné množství ETH. V případě důkazu prací může útočník opakovat svůj útok, dokud má dostatečný hašovací výkon. Je také nákladnější provádět ekvivalentní útoky na Ethereum s důkazem podílem než na Ethereum s důkazem prací. K ovlivnění živosti řetězce je zapotřebí alespoň 33 % z celkového stakovaného etheru v síti (kromě případů velmi sofistikovaných útoků s extrémně nízkou pravděpodobností úspěchu). K ovládání obsahu budoucích bloků je zapotřebí alespoň 51 % z celkového stakovaného ETH a k přepsání historie je zapotřebí více než 66 % z celkového staku. Protokol Etherea by zničil tato aktiva ve scénářích 33% nebo 51% útoku a prostřednictvím společenského konsensu ve scénáři 66% útoku.

- [Více o obraně Etherea s důkazem podílem před útočníky](/developers/docs/consensus-mechanisms/pos/attack-and-defense)
- [Více o návrhu důkazu podílem](https://medium.com/@VitalikButerin/a-proof-of-stake-design-philosophy-506585978d51)

## Je díky důkazu podílem Ethereum levnější? {#does-pos-make-ethereum-cheaper}

Ne. Cena za odeslání transakce (poplatek za gas) je určena dynamickým trhem s poplatky, který se zvyšuje s rostoucí poptávkou v síti. Mechanismus konsensu to přímo neovlivňuje.

[Více o gasu](/developers/docs/gas).

## Co jsou to uzly, klienti a validátoři? {#what-are-nodes-clients-and-validators}

Uzly jsou počítače připojené k síti Ethereum. Klienti jsou software, který na nich běží a který z počítače dělá uzel. Existují dva typy klientů: exekuční klienti a konsensuální klienti. K vytvoření uzlu jsou zapotřebí oba. Validátor je volitelný doplněk ke konsensuálnímu klientovi, který uzlu umožňuje účastnit se konsensu důkazu podílem. To znamená vytvářet a navrhovat bloky, když je uzel vybrán, a potvrzovat bloky, o kterých se dozví v síti. Pro provozování validátoru musí operátor uzlu vložit 32 ETH do depozitního kontraktu.

- [Více o uzlech a klientech](/developers/docs/nodes-and-clients)
- [Více o stakování](/staking)

## Je důkaz podílem nová myšlenka? {#is-pos-new}

Ne. Uživatel na BitcoinTalku [navrhl základní myšlenku důkazu podílem](https://bitcointalk.org/index.php?topic=27787.0) jako vylepšení Bitcoinu v roce 2011. Trvalo jedenáct let, než byl připraven k implementaci na hlavní síti Ethereum. Některé jiné řetězce implementovaly důkaz podílem dříve než Ethereum, ale ne specifický mechanismus Etherea (známý jako Gasper).

## Čím je důkaz podílem na Ethereu výjimečný? {#why-is-ethereum-pos-special}

Mechanismus důkazu podílem na Ethereu je svým designem unikátní. Nebyl to první mechanismus důkazu podílem, který byl navržen a implementován, ale je nejrobustnější. Tento mechanismus důkazu podílem je známý jako "Casper". Casper definuje, jak jsou vybíráni validátoři pro navrhování bloků, jak a kdy se provádějí atestace, jak se atestace počítají, odměny a tresty pro validátory, podmínky pro slashing, bezpečnostní mechanismy jako únik neaktivity a podmínky pro "finalitu". Finalita je podmínka, že aby byl blok považován za trvalou součást kanonického řetězce, musí pro něj hlasovat alespoň 66 % z celkového stakovaného ETH v síti. Výzkumníci vyvinuli Casper speciálně pro Ethereum a Ethereum je první a jediný blockchain, který ho implementoval.

Kromě Casperu používá důkaz podílem Etherea algoritmus pro výběr větve nazvaný LMD-GHOST. To je nutné pro případ, že nastane situace, kdy pro stejný slot existují dva bloky. Tím vzniknou dvě větve blockchainu. LMD-GHOST vybere tu, která má největší "váhu" atestací. Váha je počet atestací vážený efektivním zůstatkem validátorů. LMD-GHOST je unikátní pro Ethereum.

Kombinace Casper a LMD_GHOST je známá jako Gasper.

[Více o Gasperu](/developers/docs/consensus-mechanisms/pos/gasper/)

## Co je to slashing? {#what-is-slashing}

Slashing je termín pro zničení části staku validátora a jeho vyloučení ze sítě. Množství ETH ztracených při slashingu se škáluje s počtem „slashed“ validátorů – to znamená, že tajně spolupracující validátoři jsou potrestáni přísněji než jednotlivci.

[Více o slashingu](/developers/docs/consensus-mechanisms/pos/rewards-and-penalties#slashing)

## Proč validátoři potřebují 32 ETH? {#why-32-eth}

Validátoři musí stakovat ETH, aby měli co ztratit, pokud se budou chovat nesprávně. Důvodem, proč musí stakovat právě 32 ETH, je umožnit provoz uzlů na skromném hardwaru. Pokud by bylo minimum ETH na validátora nižší, počet validátorů a tím i počet zpráv, které musí být zpracovány v každém slotu, by se zvýšil, což by znamenalo, že k provozu uzlu by byl zapotřebí výkonnější hardware.

## Jak jsou vybíráni validátoři? {#how-are-validators-selected}

Jeden validátor je pseudo-náhodně vybrán, aby navrhl blok v každém slotu pomocí algoritmu zvaného RANDAO, který mísí haš od navrhovatele bloku se seedem, který se aktualizuje s každým blokem. Tato hodnota se používá k výběru konkrétního validátora z celkové sady validátorů. Výběr validátora je stanoven s předstihem dvou epoch.

[Více o výběru validátorů](/developers/docs/consensus-mechanisms/pos/block-proposal)

## Co je to „stake grinding“? {#what-is-stake-grinding}

„Stake grinding“ je kategorie útoku na sítě s důkazem podílem, kde se útočník snaží ovlivnit algoritmus výběru validátorů ve prospěch svých vlastních validátorů. Útoky typu „stake grinding“ na RANDAO vyžadují asi polovinu celkového stakovaného ETH.

[Více o „stake grinding“](https://eth2book.info/altair/part2/building_blocks/randomness/#randao-biasability)

## Co je to sociální slashing? {#what-is-social-slashing}

Sociální slashing je schopnost komunity koordinovat větev blockchainu v reakci na útok. Umožňuje komunitě zotavit se poté, co útočník finalizuje nečestný řetězec. Sociální slashing lze také použít proti útokům cenzury.

- [Více o sociálním slashingu](https://ercwl.medium.com/the-case-for-social-slashing-59277ff4d9c7)
- [Vitalik Buterin o sociálním slashingu](https://vitalik.eth.limo/general/2017/12/31/pos_faq.html#what-is-proof-of-stake)

## Hrozí mi slashing? {#will-i-get-slashed}

Jako validátorovi vám hrozí slashing jen velmi těžko, pokud se záměrně nezapojíte do škodlivého chování. Slashing se provádí pouze ve velmi specifických scénářích, kdy validátoři navrhnou více bloků pro stejný slot nebo si protiřečí svými atestacemi – je velmi nepravděpodobné, že by k tomu došlo náhodou.

[Více o podmínkách pro slashing](https://eth2book.info/altair/part2/incentives/slashing)

## Co je to problém „nothing-at-stake“? {#what-is-nothing-at-stake-problem}

Problém „nothing-at-stake“ je koncepční problém některých mechanismů důkazu podílem, kde existují pouze odměny a žádné tresty. Pokud není nic v sázce, pragmatický validátor je stejně ochoten potvrzovat jakoukoli, nebo dokonce více větví blockchainu, protože to zvyšuje jeho odměny. Ethereum tento problém řeší pomocí podmínek finality a slashingu, aby zajistilo jeden kanonický řetězec.

[Více o problému „nothing-at-stake“](https://vitalik.eth.limo/general/2017/12/31/pos_faq.html#what-is-the-nothing-at-stake-problem-and-how-can-it-be-fixed)

## Co je to algoritmus pro výběr větve? {#what-is-a-fork-choice-algorithm}

Algoritmus pro výběr větve implementuje pravidla, která určují, který řetězec je ten kanonický. Za optimálních podmínek není pravidlo pro výběr větve potřeba, protože na každý slot připadá pouze jeden navrhovatel bloku a na výběr je pouze jeden blok. Občas se však stane, že více bloků pro stejný slot nebo pozdě doručené informace vedou k více možnostem, jak jsou bloky poblíž hlavy řetězce uspořádány. V těchto případech musí všichni klienti implementovat některá pravidla identicky, aby bylo zajištěno, že všichni vyberou správnou sekvenci bloků. Algoritmus pro výběr větve tato pravidla kóduje.

Algoritmus Etherea pro výběr větve se nazývá LMD-GHOST. Vybírá větev s největší váhou atestací, což znamená tu, pro kterou hlasovala většina stakovaného ETH.

[Více o LMD-GHOST](/developers/docs/consensus-mechanisms/pos/gasper/#fork-choice)

## Co je to finalita v důkazu podílem? {#what-is-finality}

Finalita v důkazu podílem je záruka, že daný blok je trvalou součástí kanonického řetězce a nelze jej vrátit zpět, pokud nedojde k selhání konsensu, při kterém útočník spálí 33 % z celkového stakovaného etheru. Jedná se o "kryptoekonomickou" finalitu, na rozdíl od "pravděpodobnostní finality", která je relevantní pro blockchainy s důkazem prací. Při pravděpodobnostní finalitě neexistují pro bloky žádné explicitní finalizované/nefinalizované stavy – jednoduše se stává stále méně pravděpodobným, že by blok mohl být z řetězce odstraněn, čím je starší, a uživatelé si sami určují, kdy jsou dostatečně přesvědčeni, že je blok "bezpečný". Při kryptoekonomické finalitě musí pro páry kontrolních bloků (checkpoint) hlasovat 66 % stakovaného etheru. Pokud je tato podmínka splněna, bloky mezi těmito kontrolními body jsou explicitně "finalizovány".

[Více o finalitě](/developers/docs/consensus-mechanisms/pos/#finality)

## Co je to "slabá subjektivita"? {#what-is-weak-subjectivity}

Slabá subjektivita je vlastnost sítí s důkazem podílem, kde se sociální informace používají k potvrzení aktuálního stavu blockchainu. Novým uzlům nebo uzlům, které se znovu připojují k síti po dlouhé době offline, lze poskytnout nedávný stav, takže uzel může okamžitě zjistit, zda je na správném řetězci. Tyto stavy jsou známé jako "kontrolní body slabé subjektivity" a lze je získat od jiných operátorů uzlů mimo pásmo (out-of-band), z prohlížečů bloků nebo z několika veřejných koncových bodů.

[Více o slabé subjektivitě](/developers/docs/consensus-mechanisms/pos/weak-subjectivity)

## Je důkaz podílem odolný proti cenzuře? {#is-pos-censorship-resistant}

Odolnost proti cenzuře je v současné době obtížné prokázat. Na rozdíl od důkazu prací však důkaz podílem nabízí možnost koordinovat slashingy k potrestání cenzurujících validátorů. Připravují se změny protokolu, které oddělují tvůrce bloků od navrhovatelů bloků a implementují seznamy transakcí, které tvůrci musí do každého bloku zahrnout. Tento návrh je známý jako oddělení navrhovatele a tvůrce (proposer-builder separation) a pomáhá zabránit validátorům v cenzurování transakcí.

[Více o oddělení navrhovatele a tvůrce](https://notes.ethereum.org/@fradamt/H1TsYRfJc#Original-basic-scheme)

## Může být systém důkazu podílem Etherea napaden 51% útokem? {#pos-51-attack}

Ano. Důkaz podílem je zranitelný vůči 51% útokům, stejně jako důkaz prací. Místo toho, aby útočník potřeboval 51 % hašovacího výkonu sítě, potřebuje 51 % celkového stakovaného ETH. Útočník, který nashromáždí 51 % celkového staku, získá kontrolu nad algoritmem pro výběr větve. To útočníkovi umožňuje cenzurovat určité transakce, provádět reorganizace krátkého dosahu a extrahovat MEV přeskupováním bloků ve svůj prospěch.

[Více o útocích na důkaz podílem](/developers/docs/consensus-mechanisms/pos/attack-and-defense)

## Co je to sociální koordinace a proč je potřebná? {#what-is-social-coordination}

Sociální koordinace je poslední obrannou linií Etherea, která by umožnila obnovit poctivý řetězec z útoku, který finalizoval nepoctivé bloky. V tomto případě by se komunita Etherea musela koordinovat "mimo pásmo" (out-of-band) a dohodnout se na použití poctivé menšinové větve, přičemž by v procesu provedla slashing validátorů útočníka. To by vyžadovalo, aby i aplikace a burzy uznaly poctivou větev.

[Přečtěte si více o sociální koordinaci](/developers/docs/consensus-mechanisms/pos/attack-and-defense#people-the-last-line-of-defense)

## Bohatnou v důkazu podílem bohatí? {#do-rich-get-richer}

Čím více ETH někdo stakuje, tím více validátorů může provozovat a tím více odměn může získat. Odměny se škálují lineárně s množstvím stakovaného ETH a každý dostává stejné procentuální zhodnocení. Důkaz prací obohacuje bohaté více než důkaz podílem, protože bohatší těžaři, kteří nakupují hardware ve velkém, těží z úspor z rozsahu, což znamená, že vztah mezi bohatstvím a odměnou je nelineární.

## Je důkaz podílem centralizovanější než důkaz prací? {#is-pos-decentralized}

Ne, důkaz prací má tendenci k centralizaci, protože náklady na těžbu rostou a vytlačují jednotlivce, pak malé společnosti a tak dále. Současným problémem důkazu podílem je vliv derivátů likvidního stakování (LSD). Jedná se o tokeny reprezentující ETH stakované nějakým poskytovatelem, které může kdokoli směnit na sekundárních trzích, aniž by skutečné ETH bylo odemčeno (unstaked). LSD umožňují uživatelům stakovat s méně než 32 ETH, ale také vytvářejí riziko centralizace, kde několik velkých organizací může nakonec ovládat velkou část staku. [samostatné stakování](/staking/solo) je pro Ethereum nejlepší volbou.

[Více o centralizaci staku v LSD](https://notes.ethereum.org/@djrtwo/risks-of-lsd)

## Proč mohu stakovat pouze ETH? {#why-can-i-only-stake-eth}

ETH je vlastní měna na platformě Ethereum. Je nezbytné mít jednotnou měnu, ve které jsou denominovány všechny staky, a to jak pro účtování efektivních zůstatků pro vážení hlasů, tak pro bezpečnost. Samotné ETH je základní součástí Etherea, nikoli chytrý kontrakt. Začlenění jiných měn by výrazně zvýšilo složitost a snížilo bezpečnost stakování.

## Je Ethereum jediný blockchain s důkazem podílem? {#is-ethereum-the-only-pos-blockchain}

Ne, existuje několik blockchainů s důkazem podílem. Žádný není identický s Ethereem; mechanismus důkazu podílem Etherea je unikátní.

## Co je to The Merge? {#what-is-the-merge}

The Merge byl okamžik, kdy Ethereum vypnulo svůj mechanismus konsensu založený na důkazu prací a zapnulo svůj mechanismus konsensu založený na důkazu podílem. The Merge proběhlo 15. září 2022.

[Více o The Merge](/roadmap/merge)

## Co je to živost a bezpečnost? {#what-are-liveness-and-safety}

Živost a bezpečnost jsou dva základní bezpečnostní aspekty blockchainu. Živost je dostupnost finalizujícího řetězce. Pokud řetězec přestane finalizovat nebo k němu uživatelé nemohou snadno přistupovat, jedná se o selhání živosti. Extrémně vysoké náklady na přístup by také mohly být považovány za selhání živosti. Bezpečnost se týká toho, jak obtížné je zaútočit na řetězec – tj. finalizovat konfliktní kontrolní body (checkpointy).

[Přečtěte si více v dokumentu o Casperu](https://arxiv.org/pdf/1710.09437.pdf)
