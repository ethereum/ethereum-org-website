---
title: Domácí staking ETH
description: Přehled toho, jak začít se stakingem ETH z domova
lang: cs
template: staking
emoji: ":money_with_wings:"
image: /images/staking/leslie-solo.png
alt: Nosorožec Leslie na svém vlastním počítačovém čipu.
sidebarDepth: 2
summaryPoints:
  - Získejte maximální odměny přímo z protokolu za to, že udržujete svůj validátor správně fungující a online
  - Provozujte domácí hardware a osobně přispějte k bezpečnosti a decentralizaci sítě Ethereum
  - Odstraňte nutnost důvěry a nikdy se nevzdávejte kontroly nad klíči ke svým prostředkům
---

## Co je domácí staking? {#what-is-solo-staking}

Domácí staking je proces [provozování uzlu Etherea](/run-a-node/) připojeného k internetu a vložení 32 ETH k aktivaci [validátora](#faq), což vám dává možnost přímo se podílet na konsensu sítě.

**Domácí staking zvyšuje decentralizaci sítě Ethereum**, díky čemuž je [Ethereum](/) odolnější vůči cenzuře a robustnější proti útokům. Jiné metody stakingu nemusí síti pomáhat stejným způsobem. Domácí staking je nejlepší možností stakingu pro zabezpečení Etherea.

Uzel Etherea se skládá z klienta exekuční vrstvy (EL) a klienta vrstvy konsensu (CL). Tito klienti jsou software, který spolupracuje, spolu s platnou sadou podepisovacích klíčů, na ověřování transakcí a bloků, potvrzování správného vrcholu řetězce, agregaci atestací a navrhování bloků.

Domácí stakeři jsou zodpovědní za provoz hardwaru potřebného k běhu těchto klientů. Důrazně se doporučuje použít k tomu vyhrazený počítač, který provozujete z domova – to je pro zdraví sítě nesmírně prospěšné.

Domácí staker získává odměny přímo z protokolu za to, že udržuje svůj validátor správně fungující a online.

## Proč stakovat z domova? {#why-stake-solo}

Domácí staking s sebou přináší větší zodpovědnost, ale poskytuje vám maximální kontrolu nad vašimi prostředky a nastavením stakingu.

<Grid>
  <Card title="Získejte nové ETH" emoji="💸" description="Získávejte odměny v ETH přímo z protokolu, když je váš validátor online, bez prostředníků, kteří by si brali podíl." />
  <Card title="Plná kontrola" emoji="🎛️" description="Ponechte si své vlastní klíče. Vyberte si kombinaci klientů a hardwaru, která vám umožní minimalizovat riziko a co nejlépe přispět ke zdraví a bezpečnosti sítě. Stakingové služby třetích stran dělají tato rozhodnutí za vás a ne vždy volí ty nejbezpečnější možnosti." />
  <Card title="Bezpečnost sítě" emoji="🔐" description="Domácí staking je nejúčinnější způsob, jak provádět staking. Provozováním validátoru na vlastním hardwaru doma posilujete robustnost, decentralizaci a bezpečnost protokolu Ethereum." />
</Grid>

## Co zvážit před domácím stakingem {#considerations-before-staking-solo}

Jakkoli bychom si přáli, aby byl domácí staking přístupný a bez rizika pro každého, realita je jiná. Než se rozhodnete pro domácí staking svého ETH, je třeba mít na paměti některé praktické a vážné ohledy.

<ExpandableCard title="Povinná četba" eventCategory="SoloStaking" eventName="clicked required reading">
Při provozování vlastního uzlu byste měli strávit nějaký čas tím, že se naučíte používat software, který jste si vybrali. To zahrnuje čtení příslušné dokumentace a sledování komunikačních kanálů těchto vývojářských týmů.

Čím více rozumíte softwaru, který provozujete, a tomu, jak funguje důkaz podílem (PoS), tím méně rizikové to pro vás jako stakera bude a tím snazší bude vyřešit jakékoli problémy, které se mohou během provozování uzlu objevit.
</ExpandableCard>

<ExpandableCard title="Zkušenosti s počítači" eventCategory="SoloStaking" eventName="clicked comfortable with computers">
Nastavení uzlu vyžaduje přiměřenou úroveň pohodlí při práci s počítači, ačkoli nové nástroje to postupem času usnadňují. Porozumění rozhraní příkazového řádku je užitečné, ale již není striktně vyžadováno.

Vyžaduje to také velmi základní nastavení hardwaru a určité pochopení minimálních doporučených specifikací.
</ExpandableCard>

<ExpandableCard title="Bezpečná správa klíčů" eventCategory="SoloStaking" eventName="clicked secure key management">
Stejně jako soukromé klíče zabezpečují vaši adresu na Ethereu, budete muset vygenerovat klíče speciálně pro váš validátor. Musíte rozumět tomu, jak udržet jakékoli seed fráze nebo soukromé klíče v bezpečí.{' '}

[Bezpečnost Etherea a prevence podvodů](/security/)
</ExpandableCard>

<ExpandableCard title="Údržba" eventCategory="SoloStaking" eventName="clicked maintenance">
Hardware občas selže, síťová připojení vykazují chyby a klientský software občas potřebuje aktualizaci. Údržba uzlu je nevyhnutelná a občas bude vyžadovat vaši pozornost. Budete se chtít ujistit, že máte přehled o všech očekávaných upgradech sítě nebo jiných kritických aktualizacích klientů.
</ExpandableCard>

<ExpandableCard title="Spolehlivá dostupnost" eventCategory="SoloStaking" eventName="clicked reliable uptime">
Vaše odměny jsou úměrné době, po kterou je váš validátor online a správně atestuje. Výpadky znamenají sankce úměrné tomu, kolik dalších validátorů je ve stejnou dobu offline, ale <a href="#faq">nevedou k penalizaci (slashingu)</a>. Záleží také na šířce pásma, protože odměny se snižují za atestace, které nejsou přijaty včas. Požadavky se budou lišit, ale doporučuje se minimálně 10 Mb/s pro stahování i odesílání.
</ExpandableCard>

<ExpandableCard title="Riziko penalizace" eventCategory="SoloStaking" eventName="clicked slashing risk">
Na rozdíl od sankcí za neaktivitu při výpadku je <em>penalizace (slashing)</em> mnohem vážnější trest vyhrazený pro škodlivé prohřešky. Provozováním menšinového klienta s klíči načtenými vždy pouze na jednom počítači se vaše riziko penalizace minimalizuje. Přesto si všichni stakeři musí být vědomi rizik penalizace.

<a href="https://medium.com/prysmatic-labs/eth2-slashing-prevention-tips-f6faa5025f50/"> Více o penalizaci a životním cyklu validátora</a>
</ExpandableCard>

<StakingComparison page="solo" />

## Jak to funguje {#how-it-works}

<StakingHowSoloWorks />

Během aktivity budete získávat odměny v ETH, které budou pravidelně ukládány na vaši adresu pro výběr.

Pokud budete někdy chtít, můžete provést výstup jako validátor, což eliminuje požadavek být online a zastaví jakékoli další odměny. Váš zbývající zůstatek bude poté vybrán na adresu pro výběr, kterou určíte během nastavení.

[Více o výběrech ze stakingu](/staking/withdrawals/)

## Začněte na Staking Launchpadu {#get-started-on-the-staking-launchpad}

Staking Launchpad je open source aplikace, která vám pomůže stát se stakerem. Provede vás výběrem vašich klientů, vygenerováním vašich klíčů a vložením vašeho ETH do kontraktu pro stakingový vklad. K dispozici je kontrolní seznam, abyste se ujistili, že jste pokryli vše pro bezpečné nastavení vašeho validátora.

<StakingLaunchpadWidget />

## Co zvážit u nástrojů pro nastavení uzlu a klienta {#node-tool-considerations}

Existuje rostoucí počet nástrojů a služeb, které vám pomohou s domácím stakingem vašeho ETH, ale každý z nich přináší jiná rizika a výhody.

Níže jsou použity indikátory atributů k signalizaci významných silných nebo slabých stránek, které může uvedený nástroj pro staking mít. Tuto sekci použijte jako referenci pro to, jak tyto atributy definujeme, zatímco si vybíráte, jaké nástroje vám pomohou na vaší cestě stakingem.

<StakingConsiderations page="solo" />

## Prozkoumejte nástroje pro nastavení uzlu a klienta {#node-and-client-tools}

K dispozici je celá řada možností, které vám pomohou s nastavením. Použijte výše uvedené indikátory, které vás provedou níže uvedenými nástroji.

<ProductDisclaimer />

### Nástroje pro uzly {#node-tools}

<StakingProductsCardGrid category="nodeTools" />

Vezměte prosím na vědomí důležitost výběru [menšinového klienta](/developers/docs/nodes-and-clients/client-diversity/), protože to zlepšuje bezpečnost sítě a omezuje vaše riziko. Nástroje, které vám umožňují nastavit menšinového klienta, jsou označeny jako <em style={{ textTransform: "uppercase" }}>„multi-client“.</em>

### Generátory klíčů {#key-generators}

Tyto nástroje lze použít jako alternativu k [Staking Deposit CLI](https://github.com/ethereum/staking-deposit-cli/) pro pomoc s generováním klíčů.

<StakingProductsCardGrid category="keyGen" />

Máte návrh na nástroj pro staking, který jsme vynechali? Podívejte se na naše [zásady pro zařazení produktů](/contributing/adding-staking-products/), abyste zjistili, zda by se hodil, a odešlete jej ke kontrole.

## Prozkoumejte průvodce domácím stakingem {#staking-guides}

<StakingGuides />

## Často kladené dotazy {#faq}

Zde je několik nejčastějších otázek o stakingu, o kterých stojí za to vědět.

<ExpandableCard title="Co je to validátor?">

<em>Validátor</em> je virtuální entita, která žije na Ethereu a podílí se na konsensu protokolu Ethereum. Validátory jsou reprezentovány zůstatkem, veřejným klíčem a dalšími vlastnostmi. <em>Klientský software validátora</em> je software, který jedná jménem validátora tím, že drží a používá jeho soukromý klíč. Jeden klientský software validátora může držet mnoho párů klíčů a ovládat tak mnoho validátorů.

</ExpandableCard>

<ExpandableCard title="Mohu vložit více než 32 ETH?">
Ano, moderní účty validátorů jsou schopny držet až 2048 ETH. Dodatečné ETH nad 32 se bude úročit postupně a bude se zvyšovat v celočíselných přírůstcích, jak se bude zvyšovat váš skutečný zůstatek. To je známé jako váš <a href="https://www.attestant.io/posts/understanding-validator-effective-balance/">efektivní zůstatek</a>.

Ke zvýšení efektivního zůstatku účtu, a tím i ke zvýšení odměn, musí být překročena rezerva 0,25 ETH nad jakoukoli prahovou hodnotou celého ETH. Například účet se skutečným zůstatkem 32,9 a efektivním zůstatkem 32 by musel vydělat dalších 0,35 ETH, aby se jeho skutečný zůstatek dostal nad 33,25, než by se spustilo zvýšení efektivního zůstatku.

Tato rezerva také zabraňuje poklesu efektivního zůstatku, dokud neklesne o 0,25 ETH pod svůj aktuální efektivní zůstatek.

Každý pár klíčů spojený s validátorem vyžaduje k aktivaci alespoň 32 ETH. Jakýkoli zůstatek nad tuto částku může být kdykoli vybrán na přidruženou adresu pro výběr prostřednictvím transakce podepsané touto adresou. Jakékoli prostředky nad maximální efektivní zůstatek budou automaticky pravidelně vybírány.

Pokud se vám domácí staking zdá příliš náročný, zvažte využití poskytovatele [stakingu jako služby](/staking/saas/), nebo pokud pracujete s méně než 32 ETH, podívejte se na [stakingové pooly](/staking/pools/).
</ExpandableCard>

<ExpandableCard title="Budu penalizován, když budu offline? (ve zkratce: Ne.)">
Výpadek, když síť správně finalizuje, NEPOVEDE k penalizaci (slashingu). Pokud váš validátor není k dispozici pro atestaci v dané epoše (každá trvá 6,4 minuty), vznikají malé <em>sankce za neaktivitu</em>, ale to je velmi odlišné od <em>penalizace</em>. Tyto sankce jsou o něco menší než odměna, kterou byste získali, kdyby byl validátor k dispozici pro atestaci, a ztráty lze získat zpět přibližně za stejnou dobu, kdy budete opět online.

Vezměte na vědomí, že sankce za neaktivitu jsou úměrné tomu, kolik validátorů je ve stejnou dobu offline. V případech, kdy je velká část sítě offline najednou, budou sankce pro každého z těchto validátorů vyšší, než když je nedostupný pouze jeden validátor.

V extrémních případech, pokud síť přestane finalizovat v důsledku toho, že je více než třetina validátorů offline, utrpí tito uživatelé to, co je známé jako <em>kvadratický únik za neaktivitu</em>, což je exponenciální odčerpávání ETH z offline účtů validátorů. To umožňuje síti se nakonec sama uzdravit tím, že spálí ETH neaktivních validátorů, dokud jejich zůstatek nedosáhne 16 ETH, v kterémžto okamžiku budou automaticky vyřazeni z poolu validátorů. Zbývající online validátoři budou nakonec opět tvořit více než 2/3 sítě, čímž uspokojí supervětšinu potřebnou k opětovné finalizaci řetězce.
</ExpandableCard>

<ExpandableCard title="Jak zajistím, že nebudu penalizován?">
Stručně řečeno, to nelze nikdy plně zaručit, ale pokud jednáte v dobré víře, provozujete menšinového klienta a své podepisovací klíče uchováváte vždy pouze na jednom počítači, riziko penalizace je téměř nulové.

Existuje jen několik specifických způsobů, které mohou vést k tomu, že bude validátor penalizován a vyřazen ze sítě. V době psaní tohoto textu byly penalizace, ke kterým došlo, výhradně produktem redundantních hardwarových nastavení, kde jsou podepisovací klíče uloženy na dvou samostatných počítačích najednou. To může neúmyslně vést k <em>dvojitému hlasu</em> z vašich klíčů, což je prohřešek trestaný penalizací.

Provozování klienta se supervětšinou (jakýkoli klient používaný více než 2/3 sítě) s sebou také nese riziko potenciální penalizace v případě, že má tento klient chybu, která vede k forku řetězce. To může vést k chybnému forku, který je finalizován. K nápravě zpět na zamýšlený řetězec by bylo nutné odeslat <em>obklopující hlas (surround vote)</em> pokusem o zrušení finalizovaného bloku. To je také prohřešek trestaný penalizací a lze se mu vyhnout jednoduše tím, že místo toho budete provozovat menšinového klienta.

Ekvivalentní chyby v <em>menšinovém klientovi by se nikdy nefinalizovaly</em>, a proto by nikdy nevedly k obklopujícímu hlasu a jednoduše by vedly k sankcím za neaktivitu, <em>nikoli k penalizaci</em>.

<ul>
  <li><a href="https://hackernoon.com/ethereums-client-diversity-problem">Přečtěte si více o důležitosti provozování menšinového klienta.</a></li>
  <li><a href="https://medium.com/prysmatic-labs/eth2-slashing-prevention-tips-f6faa5025f50">Přečtěte si více o prevenci penalizace</a></li>
</ul>
</ExpandableCard>

<ExpandableCard title="Který klient je nejlepší?">
Jednotliví klienti se mohou mírně lišit z hlediska výkonu a uživatelského rozhraní, protože každý z nich je vyvíjen jinými týmy pomocí různých programovacích jazyků. Přesto žádný z nich není „nejlepší“. Všichni produkční klienti jsou vynikající kusy softwaru, které všechny plní stejné základní funkce pro synchronizaci a interakci s blockchainem.

Vzhledem k tomu, že všichni produkční klienti poskytují stejnou základní funkcionalitu, je ve skutečnosti velmi důležité, abyste si vybrali <strong>menšinového klienta</strong>, což znamená jakéhokoli klienta, který v současné době NENÍ používán většinou validátorů v síti. Může to znít neintuitivně, ale provozování většinového klienta nebo klienta se supervětšinou vás vystavuje zvýšenému riziku penalizace v případě chyby v tomto klientovi. Provozování menšinového klienta tato rizika drasticky omezuje.

<a href="https://mirror.xyz/jmcook.eth/S7ONEka_0RgtKTZ3-dakPmAHQNPvuj15nh0YGKPFriA">Přečtěte si více o tom, proč je klientská diverzita kritická</a>
</ExpandableCard>

<ExpandableCard title="Mohu použít jen VPS (virtuální privátní server)?">
Ačkoli lze jako náhradu za domácí hardware použít virtuální privátní server (VPS), na fyzickém přístupu a umístění vašeho klientského softwaru validátora <em>záleží</em>. Centralizovaná cloudová řešení, jako jsou Amazon Web Services nebo Digital Ocean, umožňují pohodlí v tom, že nemusíte pořizovat a provozovat hardware, na úkor centralizace sítě.

Čím více klientských softwarů validátorů běží na jediném centralizovaném řešení cloudového úložiště, tím nebezpečnější to pro tyto uživatele je. Jakákoli událost, která tyto poskytovatele odpojí, ať už útokem, regulačními požadavky nebo jen výpadky napájení/internetu, povede k tomu, že každý klientský software validátora, který na tento server spoléhá, bude offline ve stejnou dobu.

Sankce za výpadek jsou úměrné tomu, kolik dalších je offline ve stejnou dobu. Použití VPS výrazně zvyšuje riziko, že sankce za výpadek budou přísnější, a zvyšuje vaše riziko kvadratického úniku nebo penalizace v případě, že je výpadek dostatečně velký. K minimalizaci vlastního rizika a rizika pro síť se uživatelům důrazně doporučuje pořídit si a provozovat vlastní hardware.
</ExpandableCard>

<ExpandableCard title="Jak odemknu své odměny nebo získám zpět své ETH?">

Výběry jakéhokoli druhu z Beacon chainu vyžadují nastavení pověření k výběru.

Noví stakeři to nastavují v době generování klíčů a vkladu. Stávající stakeři, kteří to ještě nenastavili, mohou upgradovat své klíče, aby tuto funkcionalitu podporovaly.

Jakmile je pověření k výběru nastaveno, platby odměn (nashromážděné ETH nad počátečních 32) budou automaticky pravidelně distribuovány na adresu pro výběr.

Chcete-li odemknout a získat zpět celý svůj zůstatek, musíte také dokončit proces výstupu vašeho validátora.

<ButtonLink href="/staking/withdrawals/">Více o výběrech ze stakingu</ButtonLink>
</ButtonLink>

## Další čtení {#further-reading}

- [Adresář stakingu na Ethereu](https://www.staking.directory/) - _Eridian a Spacesider_
- [Problém klientské diverzity Etherea](https://hackernoon.com/ethereums-client-diversity-problem) - _@emmanuelawosika 2022_
- [Pomoc klientské diverzitě](https://www.attestant.io/posts/helping-client-diversity/) - _Jim McDonald 2022_
- [Klientská diverzita na vrstvě konsensu Etherea](https://mirror.xyz/jmcook.eth/S7ONEka_0RgtKTZ3-dakPmAHQNPvuj15nh0YGKPFriA) - _jmcook.eth 2022_
- [Jak na to: Nákup hardwaru pro validátor Etherea](https://www.youtube.com/watch?v=C2wwu1IlhDc) - _EthStaker 2022_
- [Tipy pro prevenci penalizace na Eth2](https://medium.com/prysmatic-labs/eth2-slashing-prevention-tips-f6faa5025f50) - _Raul Jordan 2020_

<QuizWidget quizKey="staking-solo" />