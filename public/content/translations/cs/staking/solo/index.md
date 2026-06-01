---
title: "Uzamykejte své ETH z domova"
description: "Přehled toho, jak začít uzamykat své ETH z domova"
lang: cs
template: staking
emoji: ":money_with_wings:"
image: /images/staking/leslie-rhino-mascot-computer-chip.png
alt: "Nosorožec Leslie na svém vlastním počítačovém čipu."
sidebarDepth: 2
summaryPoints:
  - Získejte maximální odměny přímo z protokolu za to, že váš validátor bude správně fungovat a bude online
  - Spusťte domácí hardware a osobně přidejte k zabezpečení a decentralizaci sítě Ethereum
  - Odstraňte důvěru a nikdy se nevzdávejte kontroly nad klíči ke svým prostředkům
---

## Co je uzamčení z domova? {#what-is-solo-staking}

Uzamčení z domova je akt [spuštění ethereového uzlu](/run-a-node/) připojeného k internetu a vložení 32 ETH k aktivaci [validátora](#faq), což vám dává možnost přímo se podílet na konsensu sítě.

**Uzamčení z domova zvyšuje decentralizaci sítě Ethereum, díky čemuž je Ethereum odolnější vůči cenzuře a robustnější proti útokům.** Jiné metody uzamčení nemusí síti pomoci stejným způsobem. Uzamčení z domova je nejlepší možností uzamčení pro zabezpečení Etherea.

Uzel Etherea se skládá jak z klienta exekuční vrstvy (EL), tak z klienta konsensuální vrstvy (CL). Tito klienti jsou software, který spolupracuje s platnou sadou podpisových klíčů na ověřování transakcí a bloků, potvrzování správné hlavy řetězce, agregaci atestací a navrhování bloků.

Domácí stakeři jsou zodpovědní za provoz hardwaru potřebného ke spuštění těchto klientů. Důrazně se doporučuje používat k tomu vyhrazený počítač, který provozujete z domova – je to nesmírně prospěšné pro zdraví sítě.

Uzamykatel z domova dostává odměny přímo z protokolu za to, že jejich validátor řádně funguje a je online.

## Proč provádět uzamčení z domova? {#why-stake-solo}

Uzamčení z domova přináší větší odpovědnost, ale poskytuje vám maximální kontrolu nad vašimi prostředky a nastavením uzamčení.

<CardGrid>
  <Card title="Získejte nové ETH" emoji="💸" description="Získejte odměny v ETH přímo z protokolu, když je váš validátor online, aniž by si zprostředkovatelé brali svůj podíl." />
  <Card title="Plná kontrola" emoji="🎛️" description="Ponechte si své vlastní klíče. Vyberte si kombinaci klientů a hardwaru, která vám umožní minimalizovat riziko a co nejlépe přispět ke zdraví a bezpečnosti sítě. Stakingové služby třetích stran tato rozhodnutí dělají za vás a ne vždy volí ta nejbezpečnější řešení." />
  <Card title="Zabezpečení sítě" emoji="🔐" description="Domácí staking je nejúčinnější způsob stakingu. Provozováním validátoru na vlastním hardwaru doma posilujete odolnost, decentralizaci a bezpečnost protokolu Ethereum." />
</CardGrid>

## Co zvážit před uzamčením z domova {#considerations-before-staking-solo}

I když bychom si přáli, aby bylo uzamčení z domova dostupné a bez rizika pro každého, není to realita. Než se rozhodnete uzamknout své ETH z domova, je třeba mít na paměti několik praktických a závažných aspektů.

<InfoGrid>
<ExpandableCard title="Povinná četba" eventCategory="SoloStaking" eventName="clicked required reading">
Při provozu vlastního uzlu byste měli strávit nějaký čas tím, že se naučíte používat software, který jste si vybrali. To zahrnuje čtení příslušné dokumentace a sledování komunikačních kanálů těchto vývojářských týmů.

Čím více budete rozumět softwaru, který používáte, a tomu, jak funguje proof-of-stake, tím méně riskantní to bude jako pro stakera a tím snazší bude opravit jakékoli problémy, které se mohou vyskytnout v průběhu provozu uzlu.
</ExpandableCard>

<ExpandableCard title="Pohodlná práce s počítačem" eventCategory="SoloStaking" eventName="clicked comfortable with computers">
Nastavení uzlů vyžaduje přiměřenou úroveň pohodlí při práci s počítači, i když nové nástroje to postupem času usnadňují. Pochopení rozhraní příkazového řádku je užitečné, ale již není striktně vyžadováno.

Vyžaduje také velmi základní nastavení hardwaru a určité porozumění minimálním doporučeným specifikacím.
</ExpandableCard>

<ExpandableCard title="Bezpečná správa klíčů" eventCategory="SoloStaking" eventName="clicked secure key management">
Stejně jako privátní klíče zajišťují vaši adresu Ethereum, budete muset vygenerovat klíče speciálně pro váš validátor. Musíte rozumět tomu, jak uchovat bezpečnostní fráze nebo soukromé klíče v bezpečí.{' '}

[Zabezpečení Etherea a prevence podvodů](/security/)
</ExpandableCard>

<ExpandableCard title="Údržba" eventCategory="SoloStaking" eventName="clicked maintenance">
Hardware občas selže, dojde k chybě síťových připojení a klientský software občas potřebuje upgrade. Údržba uzlů je nevyhnutelná a občas bude vyžadovat vaši pozornost. Budete si chtít být jisti, že budete informováni o všech očekávaných upgradech sítě nebo jiných důležitých upgradech klientů.
</ExpandableCard>

<ExpandableCard title="Spolehlivá dostupnost" eventCategory="SoloStaking" eventName="clicked reliable uptime">
Vaše odměny jsou úměrné době, kdy je váš validátor online a řádně provádí atestace. Za prostoje jsou penalizovány úměrně tomu, kolik dalších validátorů je současně offline, ale <a href="#faq">nevede to k trestu</a>. Záleží také na šířce pásma, protože odměny se snižují za atestace, které nejsou obdrženy včas. Požadavky se budou lišit, ale doporučuje se minimálně 10 Mb/s pro odesílání i stahování.
</ExpandableCard>

<ExpandableCard title="Riziko potrestání" eventCategory="SoloStaking" eventName="clicked slashing risk">
Na rozdíl od penalizace za nečinnost za to, že jste offline, je <em>trestání</em> mnohem závažnějším trestem vyhrazeným za škodlivé přestupky. Spuštěním menšinového klienta s vašimi klíči načtenými pouze na jednom počítači je riziko potrestání minimalizováno. Jak již bylo řečeno, všichni stakeři si musí být vědomi rizik trestání.

<a href="https://medium.com/prysmatic-labs/eth2-slashing-prevention-tips-f6faa5025f50/"> Více o trestání a životním cyklu validátoru</a>
</ExpandableCard>

</InfoGrid>

<StakingComparison page="solo" />

## Jak to funguje {#how-it-works}

<StakingHowSoloWorks />

Když budete aktivní, budete získávat odměny ETH, které budou pravidelně ukládány na vaši adresu pro výběr.

Pokud budete chtít, můžete odejít jako validátor, což eliminuje požadavek být online a zastaví jakékoli další odměny. Váš zbývající zůstatek bude poté vybrán na adresu pro výběr, kterou určíte při nastavení.

[Více o výběrech uzamčených prostředků](/staking/withdrawals/)

## Začněte se Staking Launchpad {#get-started-on-the-staking-launchpad}

Staking Launchpad je open source aplikace, která vám pomůže stát se stakerem. Provede vás výběrem vašich klientů, vygenerováním vašich klíčů a uložením vašeho ETH do smlouvy o vkladu. K dispozici je kontrolní seznam, abyste se ujistili, že jste probrali vše, abyste mohli svůj validátor bezpečně nastavit.

<StakingLaunchpadWidget />

## Co je třeba zvážit u nástrojů pro nastavení uzlů a klientů {#node-tool-considerations}

Existuje rostoucí počet nástrojů a služeb, které vám pomohou uzamčít vaše ETH z domova, ale každý přichází s jinými riziky a výhodami.

Atributové indikátory se používají níže k signalizaci pozoruhodných silných nebo slabých stránek, které může mít uvedený nástroj pro uzamčení. Použijte tuto část jako referenci, jak definujeme tyto atributy, když vybíráte nástroje, které vám pomohou s vaší cestou uzamčení.

<StakingConsiderations page="solo" />

## Prozkoumejte nástroje pro nastavení uzlů a klientů {#node-and-client-tools}

K dispozici jsou různé možnosti, které vám pomohou s nastavením. Pomocí výše uvedených indikátorů vás provedou níže uvedenými nástroji.

<ProductDisclaimer />

### Nástroje uzlu

<StakingProductsCardGrid category="nodeTools" />

Vezměte prosím na vědomí, že je důležité vybrat [menšinového klienta](/developers/docs/nodes-and-clients/client-diversity/), protože zlepšuje zabezpečení sítě a omezuje vaše riziko. Nástroje, které umožňují nastavení menšinového klienta, jsou označeny jako <em style={{ textTransform: "uppercase" }}>„multi-klientské“</em>.

### Generátory klíčů

Tyto nástroje lze použít jako alternativu k [Staking Deposit CLI](https://github.com/ethereum/staking-deposit-cli/), které vám pomohou s generováním klíčů.

<StakingProductsCardGrid category="keyGen" />

Máte návrh na vkladový nástroj, který nám chyběl? Podívejte se na naše [zásady pro uvádění produktů](/contributing/adding-staking-products/), abyste zjistili, zda je váš produkt vhodný, a mohli ho odeslat ke kontrole.

## Prozkoumejte návody na uzamčení z domova {#staking-guides}

<StakingGuides />

## Často kladené dotazy {#faq}

Toto je několik nejčastějších otázek týkajících se vkládání, které stojí za to vědět.

<ExpandableCard title="Co je to validátor?">

<em>Validátor</em> je virtuální entita, která žije na Ethereu a účastní se konsensu protokolu Ethereum. Validátory jsou reprezentovány zůstatkem, veřejným klíčem a dalšími vlastnostmi. <em>Klient validátoru</em> je software, který jedná jménem validátoru tím, že drží a používá jeho privátní klíč. Jeden klient validátoru může pojmout mnoho párů klíčů a ovládat mnoho validátorů.
</ExpandableCard>

<ExpandableCard title="Mohu vložit více než 32 ETH?">
Ano, moderní účty validátorů mohou pojmout až 2048 ETH. Další ETH nad 32 se budou sčítat postupně, přičemž se budou zvyšovat v celočíselných přírůstcích, jak se bude zvyšovat váš skutečný zůstatek. Toto je známé jako váš <a href="https://www.attestant.io/posts/understanding-validator-effective-balance/">efektivní zůstatek</a>.

Pro zvýšení efektivního zůstatku účtu a tím i zvýšení odměn musí být překročena rezerva 0,25 ETH nad jakoukoli plnou prahovou hodnotou ETH. Například účet se skutečným zůstatkem 32,9 a efektivním zůstatkem 32 by musel vydělat dalších 0,35 ETH, aby se jeho skutečný zůstatek dostal nad 33,25, než by se spustilo zvýšení efektivního zůstatku.

Tato rezerva také zabraňuje poklesu efektivního zůstatku, dokud neklesne o 0,25 ETH pod svůj aktuální efektivní zůstatek.

Každý pár klíčů spojený s validátorem vyžaduje k aktivaci alespoň 32 ETH. Jakýkoli zůstatek nad touto částkou může být kdykoli vybrán na přidruženou adresu pro výběr prostřednictvím transakce podepsané touto adresou. Jakékoli prostředky nad maximálním efektivním zůstatkem budou automaticky periodicky vybírány.

Pokud se vám zdá uzamčení z domova příliš náročné, zvažte použití poskytovatele [uzamčení jako služby](/staking/saas/), nebo pokud pracujete s méně než 32 ETH, podívejte se na [fondy uzamčení](/staking/pools/).
</ExpandableCard>

<ExpandableCard title="Budu potrestán, když budu offline? (tl;dr: Ne.)">
Přechod do režimu offline v době, kdy se síť správně finalizuje, NEBUDE mít za následek trestání. Malé <em>pokuty za nečinnost</em> jsou uvaleny, pokud váš validátor není k dispozici k atestaci pro danou epochu (každá o délce 6,4 minuty), ale to je velmi odlišné od <em>trestání</em>. Tyto sankce jsou o něco nižší než odměna, kterou byste získali, pokud by byl validátor k dispozici pro atestaci, a ztráty lze získat zpět s přibližně stejným množstvím času, kdy budete znovu online.

Všimněte si, že sankce za nečinnost jsou úměrné tomu, kolik validátorů je současně offline. V případech, kdy je velká část sítě offline najednou, budou postihy pro každý z těchto validátorů vyšší, než když je jeden validátor nedostupný.

V extrémních případech, pokud se síť přestane finalizovat v důsledku toho, že více než třetina validátorů je offline, tito uživatelé utrpí takzvaný <em>kvadratický únik nečinnosti</em>, což je exponenciální odliv ETH z účtů offline validátoru. To umožňuje, aby se síť časem samoopravila spálením ETH neaktivních validátorů, dokud jejich zůstatek nedosáhne 16 ETH, přičemž budou automaticky vyřazeni z fondu validátorů. Zbývající online validátoři budou nakonec opět tvořit více než 2/3 sítě, čímž uspokojí nadpoloviční většinu potřebnou k opětovné finalizaci řetězce.
</ExpandableCard>

<ExpandableCard title="Jak se vyhnout potrestání?">
Stručně řečeno, toto nelze nikdy plně zaručit, ale pokud jednáte v dobré víře, provozujete menšinového klienta a své podpisové klíče máte vždy jen na jednom počítači, riziko potrestání je téměř nulové.

Existuje jen několik konkrétních způsobů, které mohou vést k tomu, že validátor bude potrestán a vyřazen ze sítě. V době psaní tohoto dokumentu byly tresty, ke kterým došlo, výhradně produktem redundantních hardwarových nastavení, kde jsou podpisové klíče uloženy na dvou samostatných počítačích najednou. To může neúmyslně vést k <em>dvojitému hlasování</em> z vašich klíčů, za což můžete být potrestáni.

Provozování supervětšinového klienta (jakéhokoli klienta používaného více než 2/3 sítě) také nese riziko potenciálního trestání v případě, že tento klient má chybu, která vede k větvi řetězce. To může mít za následek vadnou větev, která se finalizuje. Oprava zpět na zamýšlený řetězec by vyžadovala odeslání <em>prostorového hlasování</em> pokusem o vrácení finalizovaného bloku. Za to můžete být také potrestáni. Lze se tomu vyhnout tím, že místo toho spustíte menšinového klienta.

Ekvivalentní chyby v <em>menšinovém klientu by se nikdy nedokončily</em>, a proto by nikdy nevedly k prostorovému hlasování a jednoduše by vedly k penalizaci za nečinnost, <em>nikoli trestu</em>.

<ul>
  <li><a href="https://hackernoon.com/ethereums-client-diversity-problem">Zjistěte více o důležitosti provozování menšinového klienta.</a></li>
  <li><a href="https://medium.com/prysmatic-labs/eth2-slashing-prevention-tips-f6faa5025f50">Přečtěte si více o prevenci trestání</a></li>
</ul>
</ExpandableCard>

<ExpandableCard title="Který klient je nejlepší?">
Jednotliví klienti se mohou mírně lišit, pokud jde o výkon a uživatelské rozhraní, protože každý je vyvíjen různými týmy pomocí různých programovacích jazyků. Jak již bylo řečeno, žádný z nich není „nejlepší“. Všechny produkční klienty jsou vynikající softwary, které všechny provádějí stejné základní funkce pro synchronizaci a interakci s blockchainem.

Protože všechny produkční klienty poskytují stejnou základní funkcionalitu, je ve skutečnosti velmi důležité, abyste si vybrali <strong>menšinového klienta</strong>, což znamená jakéhokoli klienta, kterého momentálně NEPOUŽÍVÁ většina validátorů v síti. Může to znít neintuitivně, ale provozování většinového nebo supervětšinového klienta vás vystavuje zvýšenému riziku trestání v případě chyby v tomto klientu. Provozování menšinového klienta tato rizika drasticky omezuje.

<a href="https://mirror.xyz/jmcook.eth/S7ONEka_0RgtKTZ3-dakPmAHQNPvuj15nh0YGKPFriA">Další informace o tom, proč je rozmanitost klientů kritická</a>
</ExpandableCard>

<ExpandableCard title="Můžu prostě použít VPS (virtuální privátní server)?">
Ačkoli lze jako náhradu domácího hardwaru použít virtuální privátní server (VPS), na fyzickém přístupu a umístění vašeho klienta validátoru <em>záleží</em>. Centralizovaná cloudová řešení, jako jsou Amazon Web Services nebo Digital Ocean, umožňují pohodlí, kdy nemusíte získávat a provozovat hardware na úkor centralizace sítě.

Čím více klientů validátoru běží na jediném centralizovaném řešení cloudového úložiště, tím nebezpečnější se to pro tyto uživatele stává. Jakákoli událost, která odpojí tyto poskytovatele, ať už útokem, regulačními požadavky nebo jen výpadky napájení/internetu, bude mít za následek, že každý validační klient, který spoléhá na tento server, bude zároveň offline.

Offline sankce jsou úměrné tomu, kolik ostatních je současně offline. Používání VPS výrazně zvyšuje riziko, že offline sankce budou přísnější, a zvyšuje vaše riziko kvadratického úniku nebo trestání v případě, že je výpadek dostatečně velký. Pro minimalizaci vlastního rizika a rizika pro síť se uživatelům důrazně doporučuje, aby si pořídili a provozovali svůj vlastní hardware.
</ExpandableCard>

<ExpandableCard title="Jak si odemknu odměny nebo dostanu zpět svá ETH?">

Výběry jakéhokoli druhu z Beacon Chain vyžadují nastavení přihlašovacích údajů k výběru.

Noví stakeři toto nastavují v době generování klíče a vkladu. Stávající stakeři, kteří ještě nastavení neprovedli, mohou upgradovat své klíče na podporu této funkce.

Jakmile jsou přihlašovací údaje pro výběr nastaveny, platby odměn (nashromážděné ETH za prvních 32) budou pravidelně automaticky distribuovány na adresu výběru.

Chcete-li odemknout a získat zpět celý zůstatek, musíte také dokončit proces opuštění validátoru.

<ButtonLink href="/staking/withdrawals/">Více o výběrech ze stakování</ButtonLink>
</ExpandableCard>

## Další čtení {#further-reading}

- [Adresář stakování Etherea](https://www.staking.directory/) - _Eridian and Spacesider_
- [Problém diverzity klientů Etherea](https://hackernoon.com/ethereums-client-diversity-problem) – _@emmanuelawosika 2022_
- [Jak pomoci diverzitě klientů](https://www.attestant.io/posts/helping-client-diversity/) – _Jim McDonald 2022_
- [Diverzita klientů na konsensuální vrstvě Etherea](https://mirror.xyz/jmcook.eth/S7ONEka_0RgtKTZ3-dakPmAHQNPvuj15nh0YGKPFriA) – _jmcook.eth 2022_
- [Jak na to: Nákup hardwaru pro validátor Etherea](https://www.youtube.com/watch?v=C2wwu1IlhDc) – _EthStaker 2022_
- [Tipy pro prevenci trestání na Eth2](https://medium.com/prysmatic-labs/eth2-slashing-prevention-tips-f6faa5025f50) – _Raul Jordan 2020_

<QuizWidget quizKey="staking-solo" />
