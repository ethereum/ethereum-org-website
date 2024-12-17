---
title: Sólo stakovanie vašich ETH
description: Prehľad toho, ako začať sólo stakovať ETH
lang: sk
template: staking
emoji: ":money_with_wings:"
image: /images/staking/leslie-solo.png
alt: Nosorožec Leslie na svojom vlastnom počítačovom čipe.
sidebarDepth: 2
summaryPoints:
  - Získajte maximálne odmeny priamo z protokolu za to, že váš validátor bude správne fungovať a bude online
  - Spustite domáci hardvér a osobne sa pridajte k zabezpečeniu a decentralizácii siete Ethereum
  - Odstráňte potrebu niekomu dôverovať a nikdy sa nevzdávajte kontroly nad kľúčmi k svojim prostriedkom
---

## Čo je sólo stakovanie? {#what-is-solo-staking}

Sólo stakovanie je akt [spustenia uzla Ethereum](/run-a-node/) pripojeného k internetu a vložením 32 ETH na aktiváciu [validátora](#faq), čo vám dáva možnosť priamo sa podieľať na konsenze siete.

**Sólo stakovanie zvyšuje decentralizáciu siete Ethereum**, vďaka čomu je Ethereum odolnejší voči cenzúre a voči útokom. Iné metódy stakovania nemusia sieti pomôcť rovnakým spôsobom. Sólo stakovanie je najlepšou možnosťou stakovania na zabezpečenie Etherea.

Ethereum uzol pozostáva z klienta vykonávacej vrstvy (EL), ako aj klienta konsenzuálnej vrstvy (CL). Títo klienti sú softvér, ktorý spoločne s platnou sadou podpisových kľúčov overuje transakcie a bloky, osvedčuje správnemu vedúcemu reťazca, zhromažďuje atestácie a navrhuje bloky.

Sólo stakeri sú zodpovední za prevádzku hardvéru potrebného na spustenie týchto klientov. Dôrazne sa odporúča používať na to vyhradený počítač, ktorý obsluhujete z domu – to je mimoriadne prospešné pre zdravie siete.

Sólo staker dostáva odmeny priamo z protokolu za to, že ich validátor riadne funguje a je online.

## Prečo stakovať sólo? {#why-stake-solo}

Sólo stakovanie prináša väčšiu zodpovednosť, ale poskytuje vám maximálnu kontrolu nad vašimi prostriedkami a nastavením stakovania.

<CardGrid>
  <Card title="Zarábajte čerstvé ETH" emoji="💸" description="Earn ETH-denominated rewards directly from the protocol when your validator is online, without any middlemen taking a cut." />
  <Card title="Plná kontrola" emoji="🎛️" description="Keep your own keys. Choose the combination of clients and hardware that allows you to minimize your risk and best contribute to the health and security of the network. Third-party staking services make these decisions for you, and they don't always make the safest choices." />
  <Card title="Zabezpečenie siete" emoji="🔐" description="Solo staking is the most impactful way to stake. By running a validator on your own hardware at home, you strengthen the robustness, decentralization, and security of the Ethereum protocol." />
</CardGrid>

## Úvahy pred sólo stakovaním {#considerations-before-staking-solo}

Akokoľvek si prajeme, aby bolo sólo stakovanie prístupné a bez rizika pre každého, nie je to realita. Než sa rozhodnete stakovať svoje ETH sólo, treba mať na pamäti niekoľko praktických a vážnych úvah.

<InfoGrid>
<ExpandableCard title="Povinné čítanie" eventCategory="SoloStaking" eventName="clicked required reading">
Pri prevádzke vlastného uzla by ste mali stráviť nejaký čas učením sa, ako používať softvér, ktorý ste si vybrali. To zahŕňa čítanie príslušnej dokumentácie a sledovanie komunikačných kanálov týchto vývojárskych tímov.

Čím viac budete rozumieť softvéru, ktorý používate, a tomu, ako funguje proof-of-stake, tým menej riskantné pre vás bude byť stakerom a tým ľahšie bude opraviť akékoľvek problémy, ktoré môžete, ako operátor uzla počas stakovania objaviť.
</ExpandableCard>

<ExpandableCard title="Počítačová zdatnosť" eventCategory="SoloStaking" eventName="clicked comfortable with computers">
Nastavenie uzlov si vyžaduje pri práci s počítačmi primeranú úroveň sebaistoty, aj keď nové nástroje to postupom času uľahčujú. Pochopenie rozhrania príkazového riadka je užitočné, ale už nie je striktne vyžadované.

Vyžaduje si tiež veľmi základné znalosti nastavenia hardvéru a určité porozumenie minimálnym odporúčaným špecifikáciám.
</ExpandableCard>

<ExpandableCard title="Bezpečná správa kľúčov" eventCategory="SoloStaking" eventName="clicked secure key management">
Rovnako ako súkromné ​​kľúče zaisťujú vašu adresu Ethereum, budete musieť vygenerovať kľúče špeciálne pre validátora. Musíte rozumieť tomu, ako uchovať všetky počiatočné frázy alebo súkromné ​​kľúče v bezpečí.{' '}

<a href="/security/">Zabezpečenie Etherea a prevencia podvodov</a>
</ExpandableCard>

<ExpandableCard title="Maintenance" eventCategory="SoloStaking" eventName="clicked maintenance">
Hardvér občas zlyhá, dôjde k chybe sieťových pripojení a klientsky softvér občas potrebuje upgrade. Údržba uzlov je nevyhnutná a občas bude vyžadovať vašu pozornosť. Budete si chcieť byť istí, že budete informovaný o všetkých očakávaných upgradoch siete alebo iných dôležitých upgradoch klientov.
</ExpandableCard>

<ExpandableCard title="Spoľahlivá doba prevádzkyschopnosti" eventCategory="SoloStaking" eventName="clicked reliable uptime">
Vaše odmeny sú úmerné dobe, kedy je váš validátor online a riadne osvedčuje. Prestoje sú penalizované úmerne tomu, koľko ďalších validátorov je súčasne offline, <a href="#faq">ale nevedú k slashingu</a>. Záleží tiež na kvalite pripojenia, pretože odmeny sa znižujú za atestácie, ktoré nie sú obdržané včas. Požiadavky sa budú líšiť, ale odporúča sa minimálne 10 Mb/s pre upload a download.
</ExpandableCard>

<ExpandableCard title="Riziko trestu" eventCategory="SoloStaking" eventName="clicked slashing risk">
Na rozdiel od penalizácie za nečinnosť za to že ste offline je <em>slahing</em> oveľa prísnejší trest vyhradený pre zlomyseľné priestupky. Spustením menšinového klienta s vašimi kľúčmi načítanými iba na jednom počítači je minimalizované riziko, že budete potrestaní. Ako už bolo povedané, všetci stakeri si musia byť vedomí rizík slashingu.

<a href="https://medium.com/prysmatic-labs/eth2-slashing-prevention-tips-f6faa5025f50/">Ďalšie informácie o slashingu a životnom cykle validátora</a>
</ExpandableCard>
</InfoGrid>

<StakingComparison page="solo" />

## Ako to funguje {#how-it-works}

<StakingHowSoloWorks />

Keď budete aktívny, budete získavať odmeny ETH, ktoré budú pravidelne ukladané na vašu adresu pre výber.

Ak budete chcieť, môžete odísť ako validátor, čo eliminuje požiadavku byť online a zastaví akékoľvek ďalšie odmeny. Váš zostatok bude potom vybraný na adresu pre výber, ktorú určíte pri nastavení.

[Viac o výbere staknutých vkladov](/staking/withdrawals/)

## Začnite so Staking Launchpadom {#get-started-on-the-staking-launchpad}

Staking Launchpad je aplikácia s otvoreným zdrojovým kódom, ktorá vám pomôže stať sa stakerom. Prevedie vás výberom vašich klientov, vygenerovaním vašich kľúčov a uložením vášho ETH do kontraktu o stakovaní. K dispozícii je kontrolný zoznam, aby ste sa uistili, že ste urobili všetko pre to, aby ste mohli svoj validátor bezpečne spustiť.

<StakingLaunchpadWidget />

## Čo je potrebné zvážiť pri nástrojoch na nastavenie uzlov a klienta {#node-tool-considerations}

Existuje rastúci počet nástrojov a služieb, ktoré vám pomôžu sólo stakovať vaše ETH, ale každý má iné riziká a výhody.

Atribútové indikátory sa používajú nižšie na signalizáciu významných silných alebo slabých stránok, ktoré môže mať uvedený nástroj na stakovanie. Použite túto časť ako referenciu, ako definujeme tieto atribúty, keď si budete vyberať nástroje, ktoré vám pomôžu na vašej ceste stakovania.

<StakingConsiderations page="solo" />

## Preskúmajte nástroje pre nastavenie uzla a klienta {#node-and-client-tools}

K dispozícii sú rôzne možnosti, ktoré vám pomôžu s nastavením. Pomocou vyššie uvedených indikátorov sa môžete orientovať v týchto nástrojoch.

<ProductDisclaimer />

### Nástroje uzla

<StakingProductsCardGrid category="nodeTools" />

Dbajte na to, že je dôležité vybrať si [menšinového klienta](/developers/docs/nodes-and-clients/client-diversity/), pretože zlepšuje zabezpečenie siete a obmedzuje vaše riziko. Nástroje, ktoré umožňujú nastavenie menšinového klienta, sú označené ako <em style={{ textTransform: "uppercase" }}>„multi-klient“</em>.

### Generátory kľúčov

Tieto nástroje je možné použiť ako alternatívu k [Staking Deposit CLI](https://github.com/ethereum/staking-deposit-cli/), ktoré vám pomôžu s generovaním kľúčov.

<StakingProductsCardGrid category="keyGen" />

Máte návrh na staking nástroj, ko ktorom nevieme? Pozrite sa na naše [zásady listovania produktov](/contributing/adding-staking-products/), aby ste zistili, či by sa hodili, a odošlite ich na kontrolu.

## Preskúmajte sprievodcu sólo stakovaním {#staking-guides}

<StakingGuides />

## Často kladené otázky {#faq}

Toto je niekoľko najčastejších otázok týkajúcich sa stakovania, o ktorých stojí za to vedieť.

<ExpandableCard title="Čo je validátor?">

<em>Validátor</em> je virtuálna entita, ktorá žije na Ethereu a zúčastňuje sa konsenzu protokolu Ethereum. Validátory sú reprezentované zostatkom, verejným kľúčom a ďalšími vlastnosťami. <em>Klient validátora</em> je softvér, ktorý koná v mene validátora tým, že drží a používa jeho súkromný kľúč. Jeden klient validátora môže pojať mnoho párov kľúčov a ovládať mnoho validátorov.

</ExpandableCard>

<ExpandableCard title="Môžem vložiť viac ako 32 ETH?">
Každý pár kľúčov spojený s validátorom a vyžaduje na aktiváciu presne 32 ETH. Viac ETH uložených na jednu sadu kľúčov nezvyšuje potenciál odmien, pretože každý validátor je obmedzený na <a href="https://www.attestant.io/posts/understanding-validator-effective-balance/">efektívny zostatok</a> 32 ETH. To znamená, že stakovanie je hotový pri sade 32 ETH, z ktorých každá má svoju vlastnú sadu kľúčov a zostatok.

Nevkladajte viac ako 32 ETH na jeden validátor. Nezvýši to vaše odmeny. Ak bola pre validátor nastavená adresa pre výber, prebytočné prostriedky nad 32 ETH budú automaticky vybrané na túto adresu počas nasledujúcej <a href="/staking/withdrawals/#validator-sweeping">kontroly validátora</a>.

Pokiaľ sa vám sólo stakovanie zdá príliš náročné, zvážte použitie poskytovateľa <a href="/staking/saas/">stakovanie ako služba</a>, alebo ak pracujete s menej ako 32 ETH, vyskúšajte <a href="/staking/pools/">stakovacie pooly</a>.
</ExpandableCard>

<ExpandableCard title="Budem potrestaný, keď prejdem offline? (v skratke: nie.)">
Prechod do režimu offline v čase, keď sa sieť správne dokončuje, NEBUDE mať za následok pokutu. Malé <em>tresty za nečinnosť</em> sú uvalené, pokiaľ váš validátor nie je k dispozícii na overenie pre danú epochu (každých 6,4 minúty), ale to je od <em>pokút</em> odlišné. Tieto sankcie sú o niečo nižšie ako odmena, ktorú by ste získali, ak by bol validátor k dispozícii na potvrdenie, a straty je možné získať späť s približne rovnakým množstvom času, kedy budete znova online.

Všimnite si, že sankcie za nečinnosť sú úmerné tomu, koľko validátorov je súčasne offline. V prípadoch, keď je veľká časť siete offline naraz, budú postihy pre každý z týchto validátorov vyššie, než keď je jeden validátor nedostupný.

V extrémnych prípadoch, ak sa sieť prestane dokončovať v dôsledku toho, že viac ako tretina validátorov je offline, títo používatelia utrpia takzvaný <em>kvadratický únik nečinnosti</em>, čo je exponenciálny odliv ETH z účtov offline validátora. To umožňuje, aby sa sieť časom samoopravila spotrebovaním ETH neaktívnych validátorov, pokiaľ ich zostatok nebude 16 EHT, pričom následne budú automaticky vyradené z fondu validátorov. Zostávajúci online validátori budú nakoniec opäť zahŕňať viac ako 2/3 siete, čím uspokoja nadpolovičnú väčšinu potrebnú na opätovné dokončenie reťazca.
</ExpandableCard>

<ExpandableCard title="Ako zaistím, že nebudem potrestaný?">
Stručne povedané, toto nie je možné nikdy plne zaručiť, ale ak konáte v dobrej viere, prevádzkujete menšinového klienta a svoje podpisové kľúče budete mať vždy iba na jednom počítači, je riziko, že budete potrestaní, takmer nulové.

Existuje len niekoľko konkrétnych spôsobov, ktoré môžu viesť k tomu, že validátor bude potrestaný a vyradený zo siete. V čase písania tohto dokumentu boli tresty, ku ktorým došlo, výhradne produktom nadbytočných hardvérových nastavení, kde sú podpisové kľúče uložené na dvoch samostatných počítačoch naraz. To môže neúmyselne viesť k <em>dvojitému hlasovaniu</em> z vašich kľúčov, za čo môžete byť potrestaní.

Prevádzkovanie superväčšinového klienta (akéhokoľvek klienta používaného viac ako 2/3 siete) tiež nesie riziko potenciálneho trestu v prípade, že tento klient má chybu, ktorá vedie k rozvetveniu reťazca. To môže mať za následok chybné rozdelenie, ktoré sa finalizuje. Oprava späť na zamýšľaný reťazec by vyžadovala odoslanie <em>priestorového hlasovania</em> pokusom o vrátenie dokončeného bloku. Za to môžete byť tiež potrestaní. Možno sa tomu vyhnúť tým, že namiesto toho spustíte menšinového klienta.

Ekvivalentné chyby v <em>menšinovom klientovi by sa nikdy nedokončili</em>, a preto by nikdy neviedli k priestorovému hlasovaniu a jednoducho by viedli k penalizácii za nečinnosť, <em>nie pokute</em>.

<ul>
  <li><a href="https://hackernoon.com/ethereums-client-diversity-problem">Zistite viac o dôležitosti prevádzkovania menšinového klienta.</a></li>
  <li><a href="https://medium.com/prysmatic-labs/eth2-slashing-prevention-tips-f6faa5025f50">Prečítajte si viac o prevencii pokút</a></li>
</ul>
</ExpandableCard>

<ExpandableCard title="Ktorý klient je najlepší?">
Jednotliví klienti sa môžu mierne líšiť, pokiaľ ide o výkon a užívateľské rozhranie, pretože každý je vyvíjaný rôznymi tímami pomocou rôznych programovacích jazykov. Ako už bolo povedané, žiadny z nich nie je „najlepší.“ Všetci produkční klienti sú vynikajúce softvéry, ktoré všetky vykonávajú rovnaké základné funkcie pre synchronizáciu a interakciu s blockchainom.

Pretože všetci produkční klienti poskytujú rovnakú základnú funkcionalitu, je v skutočnosti veľmi dôležité, aby ste si vybrali <strong>menšinového klienta</strong>, čo znamená akéhokoľvek klienta, ktorého momentálne NEPOUŽÍVA väčšina validátorov v sieti. Môže to znieť neintuitívne, ale prevádzkovanie väčšinového alebo superväčšinového klienta vás vystavuje zvýšenému riziku trestu v prípade chyby v tomto klientovi. Prevádzkovanie menšinového klienta tieto riziká drasticky obmedzuje.

<a href="https://mirror.xyz/jmcook.eth/S7ONEka_0RgtKTZ3-dakPmAHQNPvuj15nh0YGKPFriA">Ďalšie informácie o tom, prečo je rozmanitosť klientov kritická</a>
</ExpandableCard>

<ExpandableCard title="Môžem použiť iba VPS (virtuálny súkromný server)?">
Hoci je možné ako náhradu domáceho hardvéru použiť virtuálny privátny server (VPS), na fyzickom prístupe a umiestnení vášho klienta validátora <em>záleží</em>. Centralizované cloudové riešenia, ako sú Amazon Web Services alebo Digital Ocean, umožňujú pohodlie, kedy nemusíte získavať a prevádzkovať hardvér na úkor centralizácie siete.

Čím viac klientov validátora beží na jedinom centralizovanom riešení cloudového úložiska, tým je to pre týchto používateľov nebezpečnejšie. Akákoľvek udalosť, ktorá odpojí týchto poskytovateľov, či už útokom, regulačnými požiadavkami alebo len výpadkami napájania/internetu, bude mať za následok, že každý validačný klient, ktorý sa spolieha na tento server, bude zároveň offline.

Offline sankcie sú úmerné tomu, koľko ostatných je súčasne offline. Používanie VPS výrazne zvyšuje riziko, že offline sankcie budú prísnejšie, a zvyšuje vaše riziko kvadratického úniku alebo trestu v prípade, že je výpadok dostatočne veľký. Na minimalizáciu vlastného rizika a rizika pre sieť sa užívateľom dôrazne odporúča, aby si zaobstarali a prevádzkovali svoj vlastný hardvér.
</ExpandableCard>

<ExpandableCard title="Ako môžem odomknúť svoje odmeny alebo získať späť svoje ETH?">

Výbery akéhokoľvek druhu z Beacon Chainu vyžadujú nastavenie prihlasovacích údajov k výberu.

Noví stakerí vykonávajú nastavenia v čase generovania kľúča a vkladu. Existujúci stakerí, ktorí ešte nastavenia nevykonali, môžu upgradovať svoje kľúče na podporu tejto funkcie.

Akonáhle sú prihlasovacie údaje pre výber nastavené, platby odmien (nazhromaždené ETH nad počiatočných 32) budú pravidelne automaticky distribuované na adresu výberu.

Ak chcete odomknúť a získať späť celý zostatok, musíte tiež dokončiť proces opustenia validátora.

<ButtonLink href="/staking/withdrawals/">Viac o výbere staknutých vkladov</ButtonLink>
</ExpandableCard>

## Ďalšie zdroje informácií {#further-reading}

- [Adresár stakovania Etherea](https://www.staking.directory/) – _Eridian a Spacesider_
- [Problém s diverzitou klientov Etherea](https://hackernoon.com/ethereums-client-diversity-problem) – _@emmanuelawosika 2022_
- [Pomáhame rozmanitosti klientov](https://www.attestant.io/posts/helping-client-diversity/) – _Jim McDonald 2022_
- [Klientska diverzita na konsenzuálnej vrstve Etherea](https://mirror.xyz/jmcook.eth/S7ONEka_0RgtKTZ3-dakPmAHQNPvuj15nh0YGKPFriA) – _jmcook.eth 2022_
- [Ako na to: nakupovať hardvér validátora Ethereum](https://www.youtube.com/watch?v=C2wwu1IlhDc) – _EthStaker 2022_
- [Krok za krokom: ako sa pripojiť k testovacej sieti Ethereum 2.0](https://kb.beaconcha.in/guides/tutorial-eth2-multiclient) – _Butta_
- [Tipy na prevenciu trestu Eth2](https://medium.com/prysmatic-labs/eth2-slashing-prevention-tips-f6faa5025f50) – _Raul Jordan 2020_

<QuizWidget quizKey="staking-solo" />
