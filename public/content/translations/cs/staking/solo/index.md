---
title: Uzamykejte své ETH z domova
description: Přehled toho, jak začít uzamykat své ETH z domova
lang: cs
template: staking
emoji: ":money_with_wings:"
image: /images/staking/leslie-saas.png
alt: Nosorožec Leslie na svém vlastním počítačovém čipu.
sidebarDepth: 2
summaryPoints:
  - Získejte maximální odměny přímo z protokolu za to, že váš validátor bude správně fungovat a bude online
  - Spusťte domácí hardware a osobně přidejte k zabezpečení a decentralizaci sítě Ethereum
  - Odstraňte důvěru a nikdy se nevzdávejte kontroly nad klíči ke svým prostředkům
---

## Co je uzamčení z domova? {#what-is-solo-staking}

Uzamčení z domova je akt [spuštění uzlu Ethereum](/run-a-node/) připojeného k internetu a vložení 32 ETH k aktivaci [validátoru](#faq), což vám dává možnost přímo se podílet na konsenzu sítě.

**Uzamčení z domova zvyšuje decentralizaci sítě Ethereum**, díky čemuž je Ethereum odolnější vůči cenzuře a útokům. Jiné metody vkladů nemusí síti pomoci stejným způsobem. Uzamčení z domova je nejlepší možností uzamčení pro zajištění Etherea.

Uzel Ethereum se skládá jak z klienta prováděcí vrstvy (EL), tak z klienta konsensuální vrstvy (CL). Tyto klienty jsou software, který společně s platnou sadou podpisových klíčů ověřuje transakce a bloky, osvědčuje správnému vedoucímu řetězce, shromažďuje atestace a navrhuje bloky.

Uzamykatelé z domova jsou zodpovědní za provoz hardwaru potřebného ke spuštění těchto klientů. Důrazně se doporučuje používat k tomu vyhrazený počítač, který obsluhujete z domova – to je mimořádně prospěšné pro zdraví sítě.

Uzamykatel z domova dostává odměny přímo z protokolu za to, že jejich validátor řádně funguje a je online.

## Proč uzamykat z domova? {#why-stake-solo}

Uzamčení z domova přináší větší odpovědnost, ale poskytuje vám maximální kontrolu nad vašimi prostředky a nastavením uzamčení.

<CardGrid>
  <Card title="Vydělávejte čerstvé ETH" emoji="💸" description="Earn ETH-denominated rewards directly from the protocol when your validator is online, without any middlemen taking a cut." />
  <Card title="Plná kontrola" emoji="🎛️" description="Keep your own keys. Choose the combination of clients and hardware that allows you to minimize your risk and best contribute to the health and security of the network. Third-party staking services make these decisions for you, and they don't always make the safest choices." />
  <Card title="Zabezpečení sítě" emoji="🔐" description="Home staking is the most impactful way to stake. By running a validator on your own hardware at home, you strengthen the robustness, decentralization, and security of the Ethereum protocol." />
</CardGrid>

## Úvahy před uzamčením z domova {#considerations-before-staking-solo}

I když bychom si přáli, aby bylo uzamčení z domova dostupné a bez rizika pro každého, není to realita. Než se rozhodnete uzamčít své ETH z domova, je třeba mít na paměti několik praktických a vážných úvah.

<InfoGrid>
<ExpandableCard title="Povinná četba" eventCategory="SoloStaking" eventName="clicked required reading">
Při provozu vlastního uzlu byste měli strávit nějaký čas učením se, jak používat software, který jste si vybrali. To zahrnuje čtení příslušné dokumentace a naladění se na komunikační kanály těchto vývojářských týmů.

Čím více budete rozumět softwaru, který používáte, a tomu, jak funguje důkaz podílem, tím méně riskantní to bude jako vkladatel a tím snazší bude opravit jakékoli problémy, které se mohou během cesty objevit jako operátor uzlu.
</ExpandableCard>

<ExpandableCard title="Pohodlné s počítači" eventCategory="SoloStaking" eventName="clicked comfortable with computers">
Nastavení uzlů vyžaduje při práci s počítači přiměřenou úroveň pohodlí, i když nové nástroje to postupem času usnadňují. Pochopení rozhraní příkazového řádku je užitečné, ale již není striktně vyžadováno.

Vyžaduje také velmi základní nastavení hardwaru a určité porozumění minimálním doporučeným specifikacím.
</ExpandableCard>

<ExpandableCard title="Bezpečná správa klíčů" eventCategory="SoloStaking" eventName="clicked secure key management">
Stejně jako privátní klíče zajišťují vaši adresu Ethereum, budete muset vygenerovat klíče speciálně pro váš validátor. Musíte rozumět tomu, jak uchovat všechny počáteční fráze nebo privátní klíče v bezpečí.{' '}

<a href="/security/">Zabezpečení Etherea a prevence podvodů</a>
</ExpandableCard>

<ExpandableCard title="Maintenance" eventCategory="SoloStaking" eventName="clicked maintenance">
Hardware občas selže, dojde k chybě síťových připojení a klientský software občas potřebuje upgrade. Údržba uzlů je nevyhnutelná a občas bude vyžadovat vaši pozornost. Budete si chtít být jisti, že budete informováni o všech očekávaných upgradech sítě nebo jiných důležitých upgradech klientů.
</ExpandableCard>

<ExpandableCard title="Spolehlivá doba provozuschopnosti" eventCategory="SoloStaking" eventName="clicked reliable uptime">
Vaše odměny jsou úměrné době, kdy je váš validátor online a řádně osvědčuje. Za prostoje jsou penalizovány úměrně tomu, kolik dalších validátorů je současně offline, ale <a href="#faq">nevede k trestu</a>. Záleží také na šířce pásma, protože odměny se snižují za atestace, které nejsou obdrženy včas. Požadavky se budou lišit, ale doporučuje se minimálně 10 Mb/s nahoru a dolů.
</ExpandableCard>

<ExpandableCard title="Riziko trestu" eventCategory="SoloStaking" eventName="clicked slashing risk">
Na rozdíl od penalizace za nečinnost za to, že jste offline, je <em>trest</em> mnohem závažnějším penalizací vyhrazeným za škodlivé přestupky. Spuštěním menšinového klienta s vašimi klíči načtenými pouze na jednom počítači je minimalizováno riziko, že budete potrestáni. Jak již bylo řečeno, všichni vkladatelé si musí být vědomi rizik trestání.

<a href="https://medium.com/prysmatic-labs/eth2-slashing-prevention-tips-f6faa5025f50/">Další informace o trestu a životním cyklu validátoru</a>
</ExpandableCard>
</InfoGrid>

<StakingComparison page="solo" />

## Jak to funguje {#how-it-works}

<StakingHowSoloWorks />

Když budete aktivní, budete získávat odměny ETH, které budou pravidelně ukládány na vaši adresu pro výběr.

Pokud budete chtít, můžete odejít jako validátor, což eliminuje požadavek být online a zastaví jakékoli další odměny. Váš zbývající zůstatek bude poté vybrán na adresu pro výběr, kterou určíte při nastavení.

[Více o výběru vkladů](/staking/withdrawals/)

## Začněte s vklady na spouštěcím panelu {#get-started-on-the-staking-launchpad}

Vkladový spouštěcí panel je open source aplikace, která vám pomůže stát se vkladatelem. Provede vás výběrem vašich klientů, vygenerováním vašich klíčů a uložením vašeho ETH do smlouvy o vkladu. K dispozici je kontrolní seznam, abyste se ujistili, že jste probrali vše, abyste mohli svůj validátor bezpečně nastavit.

<StakingLaunchpadWidget />

## Co je třeba zvážit u nástrojů pro nastavení uzlů a klienta {#node-tool-considerations}

Existuje rostoucí počet nástrojů a služeb, které vám pomohou uzamčít vaše ETH z domova, ale každý přichází s jinými riziky a výhodami.

Atributové indikátory se používají níže k signalizaci pozoruhodných silných nebo slabých stránek, které mohou mít uvedený vkladový nástroj. Použijte tuto část jako referenci, jak definujeme tyto atributy, když vybíráte nástroje, které vám pomohou s vaší cestou vkladu.

<StakingConsiderations page="solo" />

## Prozkoumejte nástroje pro nastavení uzlu a klienta {#node-and-client-tools}

K dispozici jsou různé možnosti, které vám pomohou s nastavením. Pomocí výše uvedených indikátorů vás provedou níže uvedenými nástroji.

<ProductDisclaimer />

### Nástroje uzlu

<StakingProductsCardGrid category="nodeTools" />

Vezměte prosím na vědomí, že je důležité vybrat [menšinového klienta](/developers/docs/nodes-and-clients/client-diversity/), protože zlepšuje zabezpečení sítě a omezuje vaše riziko. Nástroje, které umožňují nastavení menšinového klienta, jsou označeny jako <em style={{ textTransform: "uppercase" }}>„multi-klient“.</em>

### Generátory klíčů

Tyto nástroje lze použít jako alternativu k [Staking Deposit CLI](https://github.com/ethereum/staking-deposit-cli/), které vám pomohou s generováním klíčů.

<StakingProductsCardGrid category="keyGen" />

Máte návrh na vkladový nástroj, který nám chyběl? Podívejte se na naše [zásady pro záznam produktů](/contributing/adding-staking-products/), abyste zjistili, zda by se hodily, a odešlete je ke kontrole.

## Prozkoumejte návody na uzamčení z domova {#staking-guides}

<StakingGuides />

## Často kladené dotazy {#faq}

Toto je několik nejčastějších otázek týkajících se vkládání, které stojí za to vědět.

<ExpandableCard title="Co je to validátor?">

<em>Validátor</em> je virtuální entita, která žije na Ethereu a účastní se konsenzu protokolu Ethereum. Validátory jsou reprezentovány zůstatkem, veřejným klíčem a dalšími vlastnostmi. <em>Klient validátoru</em> je software, který jedná jménem validátoru tím, že drží a používá jeho privátní klíč. Jeden klient validátoru může pojmout mnoho párů klíčů a ovládat mnoho validátorů.

</ExpandableCard>

<ExpandableCard title="Mohu vložit více než 32 ETH?">
Každý pár klíčů spojený s validátorem vyžaduje k aktivaci přesně 32 ETH. Více ETH uložených na jednu sadu klíčů nezvyšuje potenciál odměn, protože každý validátor je omezen na <a href="https://www.attestant.io/posts/understanding-validator-effective-balance/">efektivní zůstatek</a> 32 ETH. To znamená, že vytyčování se provádí ve 32 krocích ETH, z nichž každý má svou vlastní sadu klíčů a zůstatek.

Nevkládejte více než 32 ETH na jeden validátor. Nezvýší to vaše odměny. Pokud byla pro validátor nastavena adresa pro výběr, přebytečné prostředky nad 32 ETH budou automaticky vybrány na tuto adresu během příští <a href="/staking/withdrawals/#validator-sweeping">kontroly validátoru</a>.

Pokud se vám uzamčení z domova zdá příliš náročné, zvažte použití poskytovatele typu <a href="/staking/saas/">uzamčení-jako-služba</a>, nebo pokud pracujete s méně než 32 ETH, koukněte se na <a href="/staking/pools/">vkladové fondy</a>.
</ExpandableCard>

<ExpandableCard title="Budu potrestán, když přejdu offline? (ve zkratce: Ne.)">
Přechod do režimu offline v době, kdy se síť správně dokončuje, NEBUDE mít za následek trest. Malé <em>pokuty za nečinnost</em> jsou uvaleny, pokud váš validátor není k dispozici k ověření pro danou epochu (každé 6,4 minuty), ale to je velmi odlišné od <em>trestání</em>. Tyto sankce jsou o něco nižší než odměna, kterou byste získali, pokud by byl validátor k dispozici k potvrzení, a ztráty lze získat zpět s přibližně stejným množstvím času, kdy budete znovu online.

Všimněte si, že sankce za nečinnost jsou úměrné tomu, kolik validátorů je současně offline. V případech, kdy je velká část sítě offline najednou, budou postihy pro každý z těchto validátorů vyšší, než když je jeden validátor nedostupný.

V extrémních případech, pokud se síť přestane dokončovat v důsledku toho, že více než třetina validátorů je offline, tito uživatelé utrpí takzvaný <em>kvadratický únik nečinnosti</em>, což je exponenciální odliv ETH z účtů offline validátoru. To umožňuje, aby se síť časem samoopravila spotřebováním ETH neaktivních validátorů, dokud nebude zůstatek 16 ETH, přičemž budou automaticky vyřazeny z fondu validátorů. Zbývající online validátoři budou nakonec opět zahrnovat více než 2/3 sítě, čímž uspokojí nadpoloviční většinu potřebnou k opětovnému dokončení řetězce.
</ExpandableCard>

<ExpandableCard title="Jak zajistím, že nebudu potrestán?">
Stručně řečeno, toto nelze nikdy plně zaručit, ale pokud jednáte v dobré víře, provozujete menšinového klienta a své podpisové klíče budete mít vždy pouze na jednom počítači, je riziko, že budete potrestáni, téměř nulové.

Existuje jen několik konkrétních způsobů, které mohou vést k tomu, že validátor bude potrestán a vyřazen ze sítě. V době psaní tohoto dokumentu byly tresty, ke kterým došlo, výhradně produktem nadbytečných hardwarových nastavení, kde jsou podpisové klíče uloženy na dvou samostatných počítačích najednou. To může neúmyslně vést k <em>dvojitému hlasování</em> z vašich klíčů, za což můžete být potrestáni.

Provozování supervětšinového klienta (jakéhokoli klienta používaného více než 2/3 sítě) také nese riziko potenciálního trestu v případě, že tento klient má chybu, která vede k rozvětvení řetězce. To může mít za následek vadnou vidlici, která se finalizuje. Oprava zpět na zamýšlený řetězec by vyžadovala odeslání <em>prostorového hlasování</em> pokusem o vrácení dokončeného bloku. Za to můžete být také potrestáni. Lze se tomu vyhnout tím, že místo toho spustíte menšinového klienta.

Ekvivalentní chyby v <em>menšinovém klientu by se nikdy nedokončily</em>, a proto by nikdy nevedly k prostorovému hlasování a jednoduše by vedly k penalizaci za nečinnost, <em>nikoli trestu</em>.

<ul>
  <li><a href="https://hackernoon.com/ethereums-client-diversity-problem">Zjistěte více o důležitosti provozování menšinového klienta.</a></li>
  <li><a href="https://medium.com/prysmatic-labs/eth2-slashing-prevention-tips-f6faa5025f50">Přečtěte si více o prevenci trest</a></li>
</ul>
</ExpandableCard>

<ExpandableCard title="Který klient je lepší?">
Jednotlivé klienty se mohou mírně lišit, pokud jde o výkon a uživatelské rozhraní, protože každý je vyvíjen různými týmy pomocí různých programovacích jazyků. Jak již bylo řečeno, žádný z nich není „nejlepší“ Všechny produkční klienty jsou vynikající softwary, které všechny provádějí stejné základní funkce pro synchronizaci a interakci s blockchainem.

Protože všechny produkční klienty poskytují stejnou základní funkcionalitu, je ve skutečnosti velmi důležité, abyste si vybrali <strong>menšinového klienta</strong>, což znamená jakéhokoli klienta, kterého momentálně NEPOUŽÍVÁ většina validátorů v síti. Může to znít neintuitivně, ale provozování většinového nebo supervětšinového klienta vás vystavuje zvýšenému riziku trestu v případě chyby v tomto klientu. Provozování menšinového klienta tato rizika drasticky omezuje.

<a href="https://mirror.xyz/jmcook.eth/S7ONEka_0RgtKTZ3-dakPmAHQNPvuj15nh0YGKPFriA">Další informace o tom, proč je rozmanitost klientů kritická</a>
</ExpandableCard>

<ExpandableCard title="Mohu použít pouze VPS (virtuální soukromý server)?">
Ačkoli lze jako náhradu domácího hardwaru použít virtuální privátní server (VPS), na fyzickém přístupu a umístění vašeho klienta validátoru <em>záleží</em>. Centralizovaná cloudová řešení, jako jsou Amazon Web Services nebo Digital Ocean, umožňují pohodlí, kdy nemusíte získávat a provozovat hardware na úkor centralizace sítě.

Čím více klientů validátoru běží na jediném centralizovaném řešení cloudového úložiště, tím nebezpečnější se to pro tyto uživatele stává. Jakákoli událost, která odpojí tyto poskytovatele, ať už útokem, regulačními požadavky nebo jen výpadky napájení/internetu, bude mít za následek, že každý validační klient, který spoléhá na tento server, bude zároveň offline.

Offline sankce jsou úměrné tomu, kolik ostatních je současně offline. Používání VPS výrazně zvyšuje riziko, že offline sankce budou přísnější, a zvyšuje vaše riziko kvadratického úniku nebo trestu v případě, že je výpadek dostatečně velký. Pro minimalizaci vlastního rizika a rizika pro síť se uživatelům důrazně doporučuje, aby si pořídili a provozovali svůj vlastní hardware.
</ExpandableCard>

<ExpandableCard title="Jak mohu odemknout své odměny nebo získat zpět své ETH?">

Výběry jakéhokoli druhu z Beacon Chain vyžadují nastavení přihlašovacích údajů k výběru.

Noví vkladatelé provádí nastavení v době generování klíče a vkladu. Stávající vkladatelé, kteří ještě nastavení neprovedli, mohou upgradovat své klíče na podporu této funkce.

Jakmile jsou přihlašovací údaje pro výběr nastaveny, platby odměn (nashromážděné ETH za prvních 32) budou pravidelně automaticky distribuovány na adresu výběru.

Chcete-li odemknout a získat zpět celý zůstatek, musíte také dokončit proces opuštění validátoru.

<ButtonLink href="/staking/withdrawals/">Více o výběru vkladů</ButtonLink>
</ExpandableCard>

## Další informace {#further-reading}

- [Adresář vkládání Etherea](https://www.staking.directory/) – _Eridian a Spacesider_
- [Problém s diverzitou klientů Etherea](https://hackernoon.com/ethereums-client-diversity-problem) – _@emmanuelawosika 2022_
- [Pomáháme rozmanitosti klientů](https://www.attestant.io/posts/helping-client-diversity/) – _Jim McDonald 2022_
- [Klientská diverzita na konsensuální vrstvě Etherea](https://mirror.xyz/jmcook.eth/S7ONEka_0RgtKTZ3-dakPmAHQNPvuj15nh0YGKPFriA) – _jmcook.eth 2022_
- [Jak na to: Nakupovat hardware validátoru Ethereum](https://www.youtube.com/watch?v=C2wwu1IlhDc) – _EthStaker 2022_
- [Krok za krokem: Jak se připojit k testovací síti Ethereum 2.0](https://kb.beaconcha.in/guides/tutorial-eth2-multiclient) – _ Butta_
- [Tipy pro prevenci trestu Eth2](https://medium.com/prysmatic-labs/eth2-slashing-prevention-tips-f6faa5025f50) – _Raul Jordan 2020 _

<QuizWidget quizKey="solo-staking" />
