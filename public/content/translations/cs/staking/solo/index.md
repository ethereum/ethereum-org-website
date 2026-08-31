---
title: Domácí staking vašeho ETH
description: Přehled toho, jak začít se stakingem ETH z domova
lang: cs
template: staking
image: /images/staking/leslie-solo.png
sidebarDepth: 2
summaryPoints:
  - Získejte maximální odměny přímo z protokolu za to, že udržujete svůj validátor správně fungující a online
  - Provozujte domácí hardware a osobně přispějte k bezpečnosti a decentralizaci sítě Ethereum
  - Odstraňte nutnost důvěry a nikdy se nevzdávejte kontroly nad klíči ke svým prostředkům
---

## Co je domácí staking? {#what-is-solo-staking}

Domácí staking je proces [provozování uzlu sítě Ethereum](/run-a-node/) připojeného k internetu a vložení alespoň 32 ETH k aktivaci [validátora](#faq), což vám dává možnost přímo se podílet na konsensu sítě.

Domácí staking je nejpřímější způsob stakingu. Mezi vámi a protokolem nestojí žádné chytré kontrakty, operátoři ani správci. Držíte své vlastní klíče, aktivně se podílíte na validaci sítě [Ethereum](/) a dostáváte odměny sítě přímo. Každá jiná metoda stakingu přidává k této základní síťové aktivitě další vrstvy technologie, middlewaru nebo služeb.

**Domácí staking zvyšuje decentralizaci sítě Ethereum**, čímž se Ethereum stává odolnějším vůči cenzuře a robustnějším proti útokům. Jiné metody stakingu nemusí síti pomáhat stejným způsobem. Domácí staking je nejlepší možností stakingu pro zabezpečení Etherea.

Uzel sítě Ethereum se skládá z klienta exekuční vrstvy (EL) a klienta vrstvy konsensu (CL). Tito klienti jsou software, který spolupracuje s platnou sadou podepisovacích klíčů na ověřování transakcí a bloků, potvrzování správné hlavy řetězce, agregaci atestací a navrhování bloků.

Domácí stakeři jsou zodpovědní za provoz hardwaru potřebného k běhu těchto klientů. Důrazně se doporučuje použít k tomu vyhrazený počítač, který provozujete z domova – to je pro zdraví sítě nesmírně prospěšné.

Domácí staker dostává odměny přímo z protokolu za to, že udržuje svůj validátor správně fungující a online.

## Proč stakovat z domova? {#why-stake-solo}

Domácí staking s sebou přináší větší zodpovědnost, ale poskytuje vám maximální kontrolu nad vašimi prostředky a nastavením stakingu.

<Grid>
  <Card title="Ponechte si všechny odměny" icon={<HandCoins />} description="Domácí stakeři dostávají 100 % odměn protokolu, které jsou vypláceny přímo protokolem, zatímco je váš validátor online." />
  <Card title="Svrchovanost" icon={<KeyRound />} description="Mějte své vlastní klíče a plnou správu nad svými prostředky za všech okolností. Vyberte si kombinaci klientů a hardwaru, která vám umožní minimalizovat riziko. Žádná třetí strana za vás nemůže tato rozhodnutí učinit ani omezit vaše výběry." />
  <Card title="Klientská a geografická diverzita" icon={<GlobeLock />} description="Domácí stakeři provozující menšinové klienty na hardwaru rozmístěném na mnoha místech posilují decentralizaci a bezpečnost sítě." />
</Grid>

## Co zvážit před domácím stakingem {#considerations-before-staking-solo}

Jakkoli bychom si přáli, aby byl domácí staking přístupný a bez rizika pro každého, není to realita. Než se rozhodnete pro domácí staking svého ETH, je třeba mít na paměti některé praktické a vážné ohledy.

<ExpandableCard title="Povinná četba" eventCategory="SoloStaking" eventName="clicked required reading">
Při provozování vlastního uzlu byste měli strávit nějaký čas tím, že se naučíte používat software, který jste si vybrali. To zahrnuje čtení příslušné dokumentace a sledování komunikačních kanálů těchto vývojářských týmů.

Čím více rozumíte softwaru, který provozujete, a tomu, jak funguje důkaz podílem (PoS), tím méně riskantní to pro vás jako stakera bude a tím snazší bude vyřešit jakékoli problémy, které se mohou během provozu uzlu vyskytnout.
</ExpandableCard>

<ExpandableCard title="Znalost práce s počítačem" eventCategory="SoloStaking" eventName="clicked comfortable with computers">
Nastavení uzlu vyžaduje přiměřenou úroveň dovedností při práci s počítači, ačkoli nové nástroje to postupem času usnadňují. Porozumění rozhraní příkazového řádku je užitečné, ale již není striktně vyžadováno.

Vyžaduje to také velmi základní nastavení hardwaru a určité pochopení minimálních doporučených specifikací.
</ExpandableCard>

<ExpandableCard title="Hardwarové požadavky" eventCategory="SoloStaking" eventName="clicked hardware requirements">
Aktuální pokyny komunity pro hardware a šířku pásma validátora jsou udržovány v [doporučeních pro hardware a šířku pásma (EIP-7870)](https://eips.ethereum.org/EIPS/eip-7870). Jako hrubé vodítko počítejte se 4 TB NVMe SSD, 64 GB RAM (může fungovat i méně, ale toto je doporučená rezerva), solidním moderním vícejádrovým procesorem a internetovým připojením s rychlostí stahování přibližně 50 Mbps a odesílání 25 Mbps.

Vzhledem k tomu, že upgrade Fusaka zavedl PeerDAS, stakingový uzel potřebuje ukládat a stahovat pouze zlomek dat blobů sítě, což výrazně snižuje požadavky na disk a šířku pásma pro domácí stakery.
</ExpandableCard>

<ExpandableCard title="Bezpečná správa klíčů" eventCategory="SoloStaking" eventName="clicked secure key management">
Stejně jako soukromé klíče zabezpečují vaši adresu na Ethereu, budete muset vygenerovat klíče speciálně pro váš validátor. Musíte rozumět tomu, jak udržet jakékoli seed fráze nebo soukromé klíče v bezpečí.{' '}

[Bezpečnost Etherea a prevence podvodů](/security/)
</ExpandableCard>

<ExpandableCard title="Údržba" eventCategory="SoloStaking" eventName="clicked maintenance">
Hardware občas selže, síťová připojení vykazují chyby a klientský software občas potřebuje aktualizaci. Údržba uzlu je nevyhnutelná a občas bude vyžadovat vaši pozornost. Budete se chtít ujistit, že máte přehled o všech očekávaných upgradech sítě nebo jiných kritických aktualizacích klientů.
</ExpandableCard>

<ExpandableCard title="Spolehlivá dostupnost" eventCategory="SoloStaking" eventName="clicked reliable uptime">
Vaše odměny jsou úměrné době, po kterou je váš validátor online a správně atestuje. Výpadky znamenají penalizace úměrné tomu, kolik dalších validátorů je ve stejnou dobu offline, ale [nevedou k penalizaci (slashingu)](#faq). Na šířce pásma také záleží, protože odměny se snižují za atestace, které nejsou přijaty včas. Požadavky se budou lišit, ale aktuální [doporučení pro hardware a šířku pásma (EIP-7870)](https://eips.ethereum.org/EIPS/eip-7870) navrhují přibližně 50 Mbps pro stahování a 25 Mbps pro odesílání.
</ExpandableCard>

<ExpandableCard title="Riziko penalizace" eventCategory="SoloStaking" eventName="clicked slashing risk">
Na rozdíl od penalizací za neaktivitu z důvodu offline stavu je <em>slashing</em> (penalizace) mnohem vážnější trest vyhrazený pro škodlivé prohřešky. Provozováním menšinového klienta s klíči načtenými pouze na jednom počítači současně se vaše riziko penalizace minimalizuje. Přesto si všichni stakeři musí být vědomi rizik penalizace.

<a href="https://medium.com/prysmatic-labs/eth2-slashing-prevention-tips-f6faa5025f50/"> Více o penalizaci a životním cyklu validátora</a>
</ExpandableCard>

## Porovnání možností stakingu {#comparison-of-staking-options}

<StakingComparison page="solo" />

## Jak to funguje {#how-it-works}

<StakingHowSoloWorks />

Jakmile je váš uzel synchronizován a vaše klíče jsou vygenerovány, vložíte svůj stake k aktivaci vašeho validátora. Jeden validátor vyžaduje minimálně 32 ETH a může držet až 2048 ETH. Síť rozpozná vklady přibližně za 13 minut, ale noví validátoři procházejí frontou pro aktivaci, než začnou atestovat; její délka se liší podle poptávky.

Během aktivity budete získávat odměny v ETH. S pověřením k výběru se složeným úročením (0x02) se odměny automaticky přidávají k vašemu staku; s pověřením k běžným výběrům (0x01) jsou odměny nad počátečních 32 ETH pravidelně převáděny na vaši adresu pro výběr.

Pokud si to budete někdy přát, můžete jako validátor vystoupit, což eliminuje požadavek být online a zastaví jakékoli další odměny. Váš zbývající zůstatek bude poté vybrán na adresu pro výběr, kterou určíte během nastavení. Výstupy lze iniciovat pomocí vašich podepisovacích klíčů validátora nebo spustit přímo z vaší adresy pro výběr pomocí transakce na exekuční vrstvě, takže konečná kontrola nad vašimi prostředky vždy zůstává na vaší adrese pro výběr.

### Složené úročení a maximum 2048 ETH {#compounding}

Validátoři mají jeden ze dvou typů pověření k výběru:

- **Běžné výběry (0x01)**: efektivní zůstatek validátora je omezen na 32 ETH a jakýkoli zůstatek nad tuto hodnotu je každých několik dní automaticky převeden na vaši adresu pro výběr.
- **Složené úročení (0x02)**: efektivní zůstatek validátora může růst až do 2048 ETH. Odměny se automaticky úročí a získáváte odměny z každého celého ETH nad minimum 32 ETH, takže můžete stakovat flexibilní částky, jako je 40 ETH, nejen násobky 32. Pouze zůstatek nad 2048 ETH je automaticky převeden; výběr čehokoli jiného znamená ruční spuštění částečného výběru z vaší adresy pro výběr, což stojí gas.

Pokud provozujete více validátorů, můžete je konsolidovat do jednoho validátora se složeným úročením, aniž byste museli vystoupit a znovu vstoupit do sítě, čímž snížíte režii na údržbu. O konsolidaci se žádá z vaší adresy pro výběr a podléhá frontám na zpracování. Přepnutí validátora z pověření 0x01 na 0x02 využívá stejný mechanismus a **nelze jej zvrátit** bez úplného výstupu a opětovného vložení.

[Více o výběrech ze stakingu](/staking/withdrawals/)

## Začněte na Staking Launchpadu {#get-started-on-the-staking-launchpad}

Staking Launchpad je open source aplikace, která vám pomůže stát se stakerem. Provede vás výběrem vašich klientů, vygenerováním vašich klíčů a vložením vašeho ETH do stakingového vkladového kontraktu. K dispozici je kontrolní seznam, abyste se ujistili, že jste pokryli vše pro bezpečné nastavení vašeho validátora.

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

## Skupinový staking: domácí staking s odolností proti chybám {#squad-staking}

**Technologie distribuovaných validátorů (DVT)** umožňuje, aby jeden validátor běžel napříč clusterem počítačů namísto pouze jednoho. Klíč validátora je rozdělen na podíly pomocí distribuovaného generování klíčů a prahová hodnota clusteru (například jakékoli 3 ze 4 uzlů) musí podepisovat společně; úplný klíč nikdy neexistuje na žádném jednotlivém počítači. Pokud jeden počítač selže, přejde do režimu offline nebo je špatně nakonfigurován, zbytek clusteru udržuje validátor v atestaci.

Pro domácí stakery to umožňuje „skupinový staking“ (squad staking): spojení s přáteli nebo jinými členy komunity za účelem společného provozování validátorů, čímž se odstraní jednotlivé body selhání sólového nastavení a sníží se riziko penalizace z jednoho špatně se chovajícího počítače. Obol a SSV Network poskytují produkční implementace DVT, které se dnes používají napříč domácím stakingem, stakingem jako službou a stakingovými pooly.

[Více o technologii distribuovaných validátorů](/staking/dvt/)

## Provozujte validátory pro stakingový protokol {#run-validators-for-a-staking-protocol}

Pokud máte hardware a dovednosti k provozování uzlu, ale méně než 32 ETH, některé stakingové protokoly spárují váš validátor s ETH od svých stakerů ve společném stakingu. Složíte menší kauci jako zajištění a provozujete validátor na svém vlastním počítači; protokol dodá zbytek staku a vy získáte podíl na odměnách.

Jedná se o hybridní přístup: ponecháváte si odpovědnost (a uspokojení) z provozování vlastního hardwaru, ale váš validátor funguje podle chytrých kontraktů, správy a pravidel výkonu protokolu, což je jiný profil důvěry než přímý staking vašeho vlastního ETH.

Zjistěte více o tom, jak tyto protokoly fungují, včetně jejich předpokladů důvěry a mechaniky tokenů, na [stránce o společném stakingu](/staking/pools/).

## Další způsoby, jak využít váš uzel {#more-ways-to-use-your-node}

K tomu, abyste uplatnili dovednosti v provozování uzlu, nemusíte vůbec stakovat. Kdokoli může [provozovat uzel sítě Ethereum](/run-a-node/) bez vložení jakéhokoli ETH. Získáte tak vlastní ověřený pohled na řetězec, svůj vlastní soukromý koncový bod pro odesílání transakcí a interakci s aplikacemi a přispějete ke zdraví a odolnosti sítě. Provozování uzlu je také dobrý způsob, jak získat zkušenosti před aktivací validátora, aniž byste riskovali jakékoli ETH.

<StakingCommunityCallout className="my-16" />

## Často kladené otázky {#faq}

Zde je několik nejčastějších otázek o stakingu, o kterých stojí za to vědět.

<ExpandableCard title="Co je to validátor?">

<em>Validátor</em> je virtuální entita, která žije na Ethereu a podílí se na konsensu protokolu Ethereum. Validátoři jsou reprezentováni zůstatkem, veřejným klíčem a dalšími vlastnostmi. <em>Klient validátora</em> je software, který jedná jménem validátora tím, že drží a používá jeho soukromý klíč. Jeden klient validátora může držet mnoho párů klíčů a ovládat tak mnoho validátorů.

</ExpandableCard>

<ExpandableCard title="Mohu vložit více než 32 ETH?">
Ano. Validátor s pověřením k výběru se _složeným úročením_ (0x02) může držet efektivní zůstatek až 2048 ETH, zatímco minimum pro aktivaci zůstává 32 ETH. Odměny na validátoru se složeným úročením se automaticky přidávají k jeho staku a získává odměny z každého celého ETH nad minimum 32 ETH, takže můžete stakovat částky, které nejsou násobky 32. Viz [Složené úročení a maximum 2048 ETH](#compounding).

Validátoři s pověřením k _běžným výběrům_ (0x01) zůstávají omezeni na efektivní zůstatek 32 ETH, přičemž jakýkoli zůstatek nad tuto hodnotu je každých několik dní automaticky převeden na adresu pro výběr.

U validátora se složeným úročením se automaticky převádí pouze zůstatek nad maximum 2048 ETH. Chcete-li vybrat cokoli pod touto hodnotou, spustíte částečný výběr ze své adresy pro výběr (transakce, která stojí gas), což může odčerpat jakýkoli zůstatek nad minimum 32 ETH. Pokud provozujete více validátorů, můžete je také konsolidovat do jednoho validátora se složeným úročením, aniž byste museli vystoupit ze sítě.

[Více o výběrech ze stakingu](/staking/withdrawals/)
</ExpandableCard>

<ExpandableCard title="Budu penalizován, když budu offline? (ve zkratce: Ne.)">
Přechod do režimu offline, když síť správně finalizuje, NEPOVEDE k penalizaci (slashingu). Pokud váš validátor není k dispozici pro atestaci v dané epoše (každá trvá 6,4 minuty), vznikají malé <em>penalizace za neaktivitu</em>, ale to je velmi odlišné od <em>slashingu</em>. Tyto penalizace jsou o něco menší než odměna, kterou byste získali, kdyby byl validátor k dispozici pro atestaci, a ztráty lze získat zpět přibližně za stejnou dobu, po kterou budete opět online.

Vezměte na vědomí, že penalizace za neaktivitu jsou úměrné tomu, kolik validátorů je ve stejnou dobu offline. V případech, kdy je velká část sítě offline najednou, budou penalizace pro každého z těchto validátorů vyšší, než když je nedostupný pouze jeden validátor.

V extrémních případech, pokud síť přestane finalizovat v důsledku toho, že je více než třetina validátorů offline, utrpí tito uživatelé to, co je známé jako <em>kvadratický únik za neaktivitu</em>, což je exponenciální odčerpávání ETH z účtů offline validátorů. To umožňuje síti se nakonec sama uzdravit tím, že spálí ETH neaktivních validátorů, dokud jejich zůstatek nedosáhne 16 ETH, v kterémžto okamžiku budou automaticky vyřazeni z poolu validátorů. Zbývající online validátoři budou nakonec opět tvořit více než 2/3 sítě, čímž uspokojí supervětšinu potřebnou k opětovné finalizaci řetězce.
</ExpandableCard>

<ExpandableCard title="Jak zajistím, že nebudu penalizován?">
Stručně řečeno, to nelze nikdy plně zaručit, ale pokud jednáte v dobré víře, provozujete menšinového klienta a své podepisovací klíče uchováváte vždy pouze na jednom počítači, riziko penalizace je téměř nulové.

Existuje jen několik specifických způsobů, které mohou vést k tomu, že bude validátor penalizován a vyřazen ze sítě. V době psaní tohoto textu byly penalizace, ke kterým došlo, výhradně produktem redundantních hardwarových nastavení, kde jsou podepisovací klíče uloženy na dvou samostatných počítačích najednou. To může neúmyslně vést k <em>dvojitému hlasování</em> z vašich klíčů, což je přestupek trestaný penalizací.

Provozování klienta se supervětšinou (jakýkoli klient používaný více než 2/3 sítě) s sebou také nese riziko potenciální penalizace v případě, že má tento klient chybu, která vede k forku řetězce. To může vést k chybnému forku, který je finalizován. K nápravě zpět na zamýšlený řetězec by bylo nutné odeslat <em>obklopující hlas</em> (surround vote) pokusem o zrušení finalizovaného bloku. To je také přestupek trestaný penalizací a lze se mu vyhnout jednoduše tím, že místo toho budete provozovat menšinového klienta.

Ekvivalentní chyby v <em>menšinovém klientovi by se nikdy nefinalizovaly</em>, a proto by nikdy nevedly k obklopujícímu hlasu a jednoduše by vedly k penalizacím za neaktivitu, <em>nikoli k penalizaci (slashingu)</em>.

<ul>
  <li><a href="https://clientdiversity.org/">Zjistěte více o důležitosti provozování menšinového klienta.</a></li>
  <li><a href="/developers/docs/consensus-mechanisms/pos/rewards-and-penalties/">Zjistěte více o odměnách, penalizacích a slashingu</a></li>
</ul>
</ExpandableCard>

<ExpandableCard title="Který klient je nejlepší?">
Jednotliví klienti se mohou mírně lišit z hlediska výkonu a uživatelského rozhraní, protože každý z nich je vyvíjen jinými týmy pomocí různých programovacích jazyků. Přesto žádný z nich není „nejlepší“. Všichni produkční klienti jsou vynikající kusy softwaru, které všechny plní stejné základní funkce pro synchronizaci a interakci s blockchainem.

Vzhledem k tomu, že všichni produkční klienti poskytují stejnou základní funkcionalitu, je ve skutečnosti velmi důležité, abyste si vybrali <strong>menšinového klienta</strong>, což znamená jakéhokoli klienta, který NENÍ v současné době používán většinou validátorů v síti. Může to znít neintuitivně, ale provozování většinového klienta nebo klienta se supervětšinou vás vystavuje zvýšenému riziku penalizace v případě chyby v tomto klientovi. Provozování menšinového klienta tato rizika drasticky omezuje.

<a href="https://mirror.xyz/jmcook.eth/S7ONEka_0RgtKTZ3-dakPmAHQNPvuj15nh0YGKPFriA">Zjistěte více o tom, proč je klientská diverzita kritická</a>
</ExpandableCard>

<ExpandableCard title="Mohu použít jen VPS (virtuální privátní server)?">
Ačkoli lze virtuální privátní server (VPS) použít jako náhradu za domácí hardware, na fyzickém přístupu a umístění vašeho klienta validátora <em>záleží</em>. Centralizovaná cloudová řešení, jako jsou Amazon Web Services nebo Digital Ocean, umožňují pohodlí v tom, že nemusíte pořizovat a provozovat hardware, na úkor centralizace sítě.

Čím více klientů validátora běží na jediném centralizovaném řešení cloudového úložiště, tím nebezpečnější to pro tyto uživatele je. Jakákoli událost, která tyto poskytovatele odpojí, ať už útokem, regulačními požadavky nebo jen výpadky napájení/internetu, povede k tomu, že každý klient validátora, který na tento server spoléhá, přejde do režimu offline ve stejnou dobu.

Penalizace za offline stav jsou úměrné tomu, kolik dalších je ve stejnou dobu offline. Použití VPS výrazně zvyšuje riziko, že penalizace za offline stav budou přísnější, a zvyšuje vaše riziko kvadratického úniku nebo penalizace (slashingu) v případě, že je výpadek dostatečně velký. K minimalizaci vlastního rizika a rizika pro síť se uživatelům důrazně doporučuje pořídit si a provozovat vlastní hardware.
</ExpandableCard>

<ExpandableCard title="Jak odemknu své odměny nebo získám své ETH zpět?">

Každý výběr vyžaduje, aby měl váš validátor nastavenou adresu pro výběr. Noví stakeři to nastavují v době generování klíčů a vkladu. Stakeři z raných dnů sítě, kteří si ještě nenastavili adresu pro výběr, budou muset před výběrem aktualizovat svá pověření k výběru.

U validátorů s pověřením k běžným výběrům (0x01) jsou platby odměn (nashromážděné ETH nad počátečních 32) pravidelně automaticky distribuovány na adresu pro výběr. U validátorů se složeným úročením (0x02) zůstávají odměny stakovány a automaticky se úročí. Jakýkoli zůstatek nad 32 ETH můžete vybrat spuštěním částečného výběru z vaší adresy pro výběr.

Chcete-li odemknout a získat zpět celý svůj zůstatek, musíte vystoupit ze svého validátora. Můžete to provést pomocí svých podepisovacích klíčů validátora nebo to spustit přímo z vaší adresy pro výběr pomocí transakce na exekuční vrstvě, což znamená, že vaše prostředky zůstávají obnovitelné, i když se vaše podepisovací klíče ztratí.

<ButtonLink href="/staking/withdrawals/">Více o výběrech ze stakingu</ButtonLink>
</ExpandableCard>

## Další čtení {#further-reading}

- [Statistiky klientské diverzity a průvodci migrací](https://clientdiversity.org/)
- [Pomoc klientské diverzitě](https://www.attestant.io/posts/helping-client-diversity/) - _Jim McDonald 2022_
- [Klientská diverzita na vrstvě konsensu Etherea](https://mirror.xyz/jmcook.eth/S7ONEka_0RgtKTZ3-dakPmAHQNPvuj15nh0YGKPFriA) - _jmcook.eth 2022_
- [Jak na to: Nákup hardwaru pro validátor Etherea](https://www.youtube.com/watch?v=C2wwu1IlhDc) - _EthStaker 2022_
- [EIP-7870: Doporučení pro hardware a šířku pásma](https://eips.ethereum.org/EIPS/eip-7870)
- [Upgrade Pectra: maximální efektivní zůstatek a další](/roadmap/pectra/maxeb/)

<QuizWidget quizKey="staking-solo" />