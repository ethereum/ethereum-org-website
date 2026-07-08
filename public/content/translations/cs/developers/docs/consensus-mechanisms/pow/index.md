---
title: "Důkaz prací (PoW)"
description: "Vysvětlení protokolu konsensu důkaz prací (PoW) a jeho role v Ethereu."
lang: cs
---

Síť [Ethereum](/) začala používat mechanismus konsensu, který zahrnoval **[důkaz prací (PoW)](/developers/docs/consensus-mechanisms/pow)**. To umožnilo uzlům sítě Ethereum shodnout se na stavu všech informací zaznamenaných na blockchainu Etherea a zabránilo určitým druhům ekonomických útoků. Ethereum však v roce 2022 důkaz prací (PoW) vypnulo a místo něj začalo používat [důkaz podílem (PoS)](/developers/docs/consensus-mechanisms/pos).

<Alert variant="update">
<AlertEmoji text=":wave:"/>
<AlertContent>
<AlertDescription>
    Důkaz prací (PoW) je nyní zastaralý. Ethereum již nepoužívá důkaz prací jako součást svého mechanismu konsensu. Místo toho používá důkaz podílem (PoS). Přečtěte si více o [důkazu podílem (PoS)](/developers/docs/consensus-mechanisms/pos/) a [stakingu](/staking/).
</AlertDescription>
</AlertContent>
</Alert>

## Předpoklady {#prerequisites}

Pro lepší pochopení této stránky doporučujeme nejprve si přečíst o [transakcích](/developers/docs/transactions/), [blocích](/developers/docs/blocks/) a [mechanismech konsensu](/developers/docs/consensus-mechanisms/).

## Co je důkaz prací (PoW)? {#what-is-pow}

Nakamotův konsensus, který využívá důkaz prací (PoW), je mechanismus, který kdysi umožňoval decentralizované síti Ethereum dosáhnout konsensu (tj. shody všech uzlů) na věcech, jako jsou zůstatky na účtech a pořadí transakcí. To bránilo uživatelům v „dvojím útracení“ (double spending) jejich mincí a zajišťovalo, že řetězec Etherea bylo nesmírně obtížné napadnout nebo s ním manipulovat. Tyto bezpečnostní vlastnosti nyní pocházejí z důkazu podílem (PoS) pomocí mechanismu konsensu známého jako [Gasper](/developers/docs/consensus-mechanisms/pos/gasper/).

## Důkaz prací a těžba {#pow-and-mining}

Důkaz prací (PoW) je základní algoritmus, který nastavuje obtížnost a pravidla pro práci, kterou těžaři vykonávají na PoW blockchainech. Těžba je samotná „práce“. Je to akt přidávání platných bloků do řetězce. To je důležité, protože délka řetězce pomáhá síti sledovat správný fork blockchainu. Čím více „práce“ je odvedeno, tím delší je řetězec a čím vyšší je číslo bloku, tím jistější si síť může být aktuálním stavem věcí.

[Více o těžbě](/developers/docs/consensus-mechanisms/pow/mining/)

## Jak fungoval důkaz prací na Ethereu? {#how-it-works}

Transakce na Ethereu jsou zpracovávány do bloků. V nyní zastaralém Ethereu s důkazem prací (PoW) každý blok obsahoval:

- obtížnost bloku (block difficulty) – například: 3,324,092,183,262,715
- mixHash – například: `0x44bca881b07a6a09f83b130798072441705d9a665c5ac8bdf2f39a3cdf3bee29`
- nonce – například: `0xd3ee432b4fb3d26b`

Tato data bloku přímo souvisela s důkazem prací.

### Práce v důkazu prací {#the-work}

Protokol důkazu prací, Ethash, vyžadoval, aby těžaři prošli intenzivním závodem pokusů a omylů, aby našli nonce pro blok. Do řetězce mohly být přidány pouze bloky s platnou nonce.

Při závodě o vytvoření bloku těžař opakovaně proháněl matematickou funkcí datovou sadu, kterou bylo možné získat pouze stažením a spuštěním celého řetězce (jak to těžař dělá). Datová sada se používala k vygenerování mixHash pod cílovou hodnotou, která je diktována obtížností bloku. Nejlepší způsob, jak toho dosáhnout, je metoda pokus-omyl.

Obtížnost určovala cíl pro hash. Čím nižší byl cíl, tím menší byla množina platných hashů. Jakmile byl hash vygenerován, bylo pro ostatní těžaře a klienty neuvěřitelně snadné jej ověřit. I kdyby se změnila jen jedna transakce, hash by byl úplně jiný, což by signalizovalo podvod.

Hashování usnadňuje odhalení podvodu. Ale důkaz prací jako proces byl také velkým odstrašujícím prostředkem proti útokům na řetězec.

### Důkaz prací a bezpečnost {#security}

Těžaři byli motivováni k tomu, aby tuto práci vykonávali na hlavním řetězci Etherea. Pro podmnožinu těžařů existovala jen malá motivace k založení vlastního řetězce – podkopává to systém. Blockchainy spoléhají na to, že mají jediný stav jako zdroj pravdy.

Cílem důkazu prací bylo prodloužit řetězec. Nejdelší řetězec byl nejvíce uvěřitelný jako ten platný, protože na jeho vygenerování bylo vynaloženo nejvíce výpočetní práce. V rámci PoW systému Etherea bylo téměř nemožné vytvářet nové bloky, které by mazaly transakce, vytvářely falešné nebo udržovaly druhý řetězec. To proto, že by zlomyslný těžař musel vždy vyřešit nonce bloku rychleji než všichni ostatní.

Aby mohl zlomyslný těžař konzistentně vytvářet škodlivé, ale platné bloky, potřeboval by více než 51 % těžebního výkonu sítě, aby porazil všechny ostatní. Takové množství „práce“ vyžaduje spoustu drahého výpočetního výkonu a vynaložená energie by mohla dokonce převýšit zisky z útoku.

### Ekonomika důkazu prací {#economics}

Důkaz prací byl také zodpovědný za vydávání nové měny do systému a motivaci těžařů k práci.

Od upgradu [Konstantinopol](/ethereum-forks/#constantinople) byli těžaři, kteří úspěšně vytvořili blok, odměněni dvěma nově vyraženými ETH a částí transakčních poplatků. Ommer bloky (tzv. strýčkovské bloky) byly také kompenzovány 1,75 ETH. Ommer bloky byly platné bloky vytvořené těžařem prakticky ve stejnou dobu, kdy jiný těžař vytvořil kanonický blok, což bylo nakonec určeno tím, na kterém řetězci se stavělo dříve. K ommer blokům obvykle docházelo kvůli latenci sítě.

## Finalita {#finality}

Transakce má na Ethereu „finalitu“, když je součástí bloku, který se nemůže změnit.

Protože těžaři pracovali decentralizovaným způsobem, mohly být vytěženy dva platné bloky současně. To vytváří dočasný fork. Nakonec se jeden z těchto řetězců stal přijatým řetězcem poté, co byly vytěženy a přidány další bloky, čímž se stal delším.

Aby to bylo ještě složitější, transakce odmítnuté na dočasném forku nemusely být zahrnuty do přijatého řetězce. To znamená, že by mohly být zvráceny. Finalita tedy odkazuje na dobu, kterou byste měli počkat, než budete transakci považovat za nevratnou. V předchozím Ethereu s důkazem prací platilo, že čím více bloků bylo vytěženo na konkrétním bloku `N`, tím vyšší byla jistota, že transakce v `N` byly úspěšné a nebudou vráceny zpět. Nyní, s důkazem podílem (PoS), je finalizace explicitní, nikoli pravděpodobnostní vlastností bloku.

## Spotřeba energie důkazu prací {#energy}

Hlavní kritikou důkazu prací je množství vydané energie potřebné k udržení bezpečnosti sítě. K udržení bezpečnosti a decentralizace spotřebovávalo Ethereum na důkazu prací velké množství energie. Krátce před přechodem na důkaz podílem spotřebovávali těžaři Etherea společně asi 70 TWh/rok (zhruba stejně jako Česká republika – podle [digiconomist](https://digiconomist.net/) k 18. červenci 2022).

## Výhody a nevýhody {#pros-and-cons}

| Výhody                                                                                                                                                                                                                         | Nevýhody                                                                                                                                         |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| Důkaz prací (PoW) je neutrální. K začátku nepotřebujete ETH a odměny za bloky vám umožní přejít z 0 ETH na kladný zůstatek. U [důkazu podílem (PoS)](/developers/docs/consensus-mechanisms/pos/) potřebujete ETH do začátku. | Důkaz prací spotřebovává tolik energie, že je to špatné pro životní prostředí.                                                                      |
| Důkaz prací je vyzkoušený a otestovaný mechanismus konsensu, který udržoval Bitcoin a Ethereum bezpečné a decentralizované po mnoho let.                                                                                          | Pokud chcete těžit, potřebujete tak specializované vybavení, že je to do začátku velká investice.                                                |
| Ve srovnání s důkazem podílem je relativně snadné jej implementovat.                                                                                                                                                                | Kvůli rostoucí potřebě výpočtů by těžební pooly mohly potenciálně ovládnout těžební hru, což by vedlo k centralizaci a bezpečnostním rizikům. |

## Srovnání s důkazem podílem {#compared-to-pos}

Z celkového pohledu má důkaz podílem (PoS) stejný konečný cíl jako důkaz prací (PoW): pomoci decentralizované síti bezpečně dosáhnout konsensu. Má však určité rozdíly v procesu a obsazení:

- Důkaz podílem vyměňuje důležitost výpočetního výkonu za stakované ETH.
- Důkaz podílem nahrazuje těžaře validátory. Validátoři stakují své ETH, aby aktivovali schopnost vytvářet nové bloky.
- Validátoři nesoutěží o vytváření bloků, místo toho jsou náhodně vybíráni algoritmem.
- Finalita je jasnější: v určitých kontrolních bodech (checkpoints), pokud se 2/3 validátorů shodnou na stavu bloku, je považován za finální. Validátoři na to musí vsadit celý svůj stake, takže pokud se pokusí o tajnou dohodu, přijdou o celý svůj stake.

[Více o důkazu podílem](/developers/docs/consensus-mechanisms/pos/)

## Učíte se raději vizuálně? {#visual-learner}

<VideoWatch slug="proof-of-work-explained" />

## Další čtení {#further-reading}

- [Útok většiny (Majority attack)](https://en.bitcoin.it/wiki/Majority_attack)
- [O finalitě vypořádání](https://blog.ethereum.org/2016/05/09/on-settlement-finality)

### Videa {#videos}

- [Technické vysvětlení protokolů důkazu prací](https://youtu.be/9V1bipPkCTU)

## Související témata {#related-topics}

- [Těžba](/developers/docs/consensus-mechanisms/pow/mining/)
- [Důkaz podílem (PoS)](/developers/docs/consensus-mechanisms/pos/)
- [Důkaz autority](/developers/docs/consensus-mechanisms/poa/)