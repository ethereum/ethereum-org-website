---
title: Danksharding
description: Seznamte se s Proto-Dankshardingem a Dankshardingem - dvěma po sobě jdoucími vylepšeními pro škálování Etherea.
lang: cs
summaryPoints:
  - Danksharding je vícestupňové vylepšení, které má zlepšit škálovatelnost a kapacitu Etherea.
  - První fáze, Proto-Danksharding, přidává do bloků datové bloby.
  - Datové bloby nabízejí levnější způsob zveřejnění dat rollupů na Ethereu a tyto náklady mohou být replikovány na uživatele ve formě nižších transakčních poplatků.
  - V dalších krocích rozloží plný Danksharding odpovědnost za ověřování datových blobů mezi podmnožiny uzlů, což dále škáluje Ethereum na více než 100 000 transakcí za sekundu.
---

# Danksharding {#danksharding}

**Danksharding** je způsob, jehož pomocí se Ethereum stává skutečně škálovatelným blockchainem, ale k tomu je potřeba několik aktualizací protokolu. **Proto-Danksharding** je mezikrokem na této cestě. Obě vylepšení mají za cíl co nejvíce zlevnit transakce na druhé vrstvě pro uživatele a měly by zvýšit škálovatelnost Etherea na > 100 000 transakcí za sekundu.

## Co je Proto-Danksharding? {#what-is-protodanksharding}

Proto-Danksharding, známý také jako [EIP-4844](https://eips.ethereum.org/EIPS/eip-4844), je způsob, jakým mohou [rollupy](/layer-2/#rollups) přidávat levnější data do bloků. Název pochází od dvou výzkumníků, kteří tento nápad navrhli: Protolambdy a Dankrada Feista. Historicky byly rollupy omezeny v tom, jak levně mohou zpracovávat uživatelské transakce, protože jejich transakce byly ukládány do `CALLDATA`.

Toto je drahé, protože CALLDATA jsou zpracovávána všemi uzly na Ethereu a zůstávají na blockchainu navždy, i když rollupy potřebují tato data jen po krátkou dobu. Proto-Danksharding zavádí datové bloby, které mohou být odeslány a připojeny k blokům. Data v těchto blobech nejsou přístupná pro EVM a jsou automaticky smazána po stanovené době (v době psaní tohoto článku to bylo 4 096 epoch, což je přibližně 18 dní). To znamená, že rollupy mohou odesílat svá data mnohem levněji a přenést úspory na koncové uživatele ve formě levnějších transakcí.

<ExpandableCard title="Proč bloby zlevňují rollupy?" eventCategory="/roadmap/danksharding" eventName="clicked why do blocks make rollups cheaper?">

Rollupy jsou způsobem, jak škálovat Ethereum tím, že seskupují transakce mimo řetězec a poté zveřejňují výsledky na Ethereu. Rollup se v podstatě skládá ze dvou částí: dat a ověření provedení. Data jsou úplné sekvence transakcí, které jsou zpracovány rollupem k vytvoření změny stavu, jež je zveřejněna na Ethereu. Ověření provedení je opětovné provedení těchto transakcí nějakým poctivým aktérem (tzv. „schvalovatel“), aby bylo zajištěno, že navrhovaná změna stavu je správná. K provedení ověření musí být transakční data dostupná dostatečně dlouho na to, aby si je mohl kdokoliv stáhnout a zkontrolovat. To znamená, že jakékoliv nepoctivé chování sequencera rollupu může být identifikováno a napadnuto ověřovatelem. Nicméně není nutné, aby byla tato data dostupná navždy.

</ExpandableCard>

<ExpandableCard title="Proč je v pořádku mazat blobová data?" eventCategory="/roadmap/danksharding" eventName="clicked why is it OK to delete the blob data?">

Rollupy zveřejňují závazky ke svým transakčním datům na blockchainu a také zpřístupňují skutečná data v datových blobech. To znamená, že ověřovatelé mohou verifikovat, že jsou závazky platné, nebo napadnout data, která považují za nesprávná. Na úrovni uzlů jsou tyto datové bloby uloženy v konsenzus klientech. Konsenzus klienti potvrzují, že data viděli a že byla rozšířena po celé síti. Pokud by se data uchovávala navždy, tito klienti by zůstali přetíženi, což by vedlo k velkým požadavkům na hardware pro provozování uzlů. Místo toho se data automaticky mažou z uzlu každých 18 dní. Atestace konsenzus klientů prokazují, že ověřovatelé měli dostatečnou příležitost data ověřit. Skutečná data mohou být uložena mimo řetězec provozovateli rollupu, uživateli nebo ostatními.

</ExpandableCard>

### Jak jsou data v blobech ověřována? {#how-are-blobs-verified}

Rollupy zveřejňují transakce, které provádějí, v datových blobech. Zároveň k těmto datům zveřejňují „závazek“. Dělají to tak, že datům přizpůsobí polynomiální funkci. Tato funkce může být poté vyhodnocena na různých bodech. Např. pokud definujeme extrémně jednoduchou funkci `f(x) = 2x – 1`, můžeme tuto funkci vyhodnotit pro `x = 1`, `x = 2`, `x = 3` a získat výsledky `1, 3, 5`. Ověřovatel aplikuje stejnou funkci na data a vyhodnotí ji ve stejných bodech. Pokud byla původní data změněna, funkce nebude identická, a proto ani hodnoty vyhodnocené v každém bodě nejsou stejné. Ve skutečnosti jsou závazek a důkaz složitější, protože jsou zabaleny v kryptografických funkcích.

### Co je KZG? {#what-is-kzg}

KZG znamená Kate-Zaverucha-Goldberg – jména tří [původních autorů](https://link.springer.com/chapter/10.1007/978-3-642-17373-8_11) schématu, které redukuje blob dat na malý [kryptografický „závazek“](https://dankradfeist.de/ethereum/2020/06/16/kate-polynomial-commitments.html). Blob dat předložený rollupem musí být ověřen, aby bylo zajištěno, že rollup nejedná nepoctivě. To zahrnuje ověřovatelovo opětovné provedení transakcí v blobu, aby bylo ověřeno, že závazek byl platný. To je konceptuálně stejné jako způsob, jakým exekuční klienti kontrolují platnost transakcí na Ethereu na vrstvě 1 pomocí Merkle důkazů. KZG je alternativní důkaz, který přizpůsobí polynomiální rovnici datům. Závazek vyhodnocuje polynom na určitých tajných bodech dat. Ověřovatel by přizpůsobil stejný polynom datům a vyhodnotil ho na stejných hodnotách, přičemž by ověřil, že výsledek je stejný. To je způsob, jak ověřit data, který je kompatibilní s technikami zero-knowledge používanými některými rollupy a nakonec i jinými částmi protokolu Ethereum.

### Co byl Ceremoniál KZG? {#what-is-a-kzg-ceremony}

Ceremoniál KZG byla akce, při které se spousta lidí z celé Ethereum komunity společně podílela na vygenerování tajného náhodného řetězce čísel, který lze použít k ověřování dat. Je klíčové, aby tento řetězec čísel nebyl nikomu znám a nemohl být nikým znovu vytvořen. Proto každý účastník ceremoniálu obdržel řetězec od předchozího účastníka. Poté vytvořil nové náhodné hodnoty (např. tím, že dovolil prohlížeči měřit pohyb myši) a smíchal je s předchozí hodnotou. Následně tuto novou hodnotu odeslal dalšímu účastníkovi a na svém lokálním zařízení ji zničil. Pokud alespoň jeden účastník tohoto ceremoniálu postupoval poctivě, konečná hodnota bude pro útočníka neznámá.

Ceremoniál KZG EIP-4844 byl veřejný a zúčastnily se ho desítky tisíc uživatelů, kteří přidali svou vlastní entropii (náhodnost). Celkem šlo o 140 000 příspěvků, což z něj činí největší ceremoniál svého druhu na světě. Aby byl ceremoniál znehodnocen, muselo by 100 % účastníků jednat nepoctivě. Z pohledu účastníků stačí vědět, že jen oni jednali poctivě, není třeba důvěřovat nikomu jinému, protože vědí, že ceremoniál zabezpečili (individuálně splnili požadavek, aby alespoň jeden účastník z N byl poctivý).

<ExpandableCard title="K čemu se používá náhodné číslo z Ceremoniálu KZG?" eventCategory="/roadmap/danksharding" eventName="clicked why is the random number from the KZG ceremony used for?">

Když rollup zveřejní data v blobu, poskytne také „závazek“, který zveřejní na blockchainu. Tento závazek je výsledkem vyhodnocení polynomu přizpůsobeného datům v určitých bodech. Tyto body jsou definovány náhodnými čísly generovanými v ceremoniálu KZG. Ověřovatelé mohou poté vyhodnotit polynom ve stejných bodech, aby ověřili data – pokud dosáhnou stejných hodnot, jsou data správná.

</ExpandableCard>

<ExpandableCard title="Proč musí náhodná data KZG zůstat utajená?" eventCategory="/roadmap/danksharding" eventName="clicked why does the KZG random data have to stay secret?">

Pokud někdo zná náhodné body použité pro vytvoření závazku, je pro něj snadné vytvořit nový polynom, který se bude shodovat v těchto konkrétních bodech (tj. „kolize“). To znamená, že by byl schopen přidat nebo odebrat data z blobu a stále poskytovat platný důkaz. Aby se tomu zabránilo, místo toho, aby ověřovatelé dostávali skutečné tajné body, obdrží body zabalené v kryptografické „černé skříňce“ pomocí eliptických křivek. Tyto body efektivně zamíchají hodnoty tak, aby původní hodnoty nemohly být zpětně rekonstruovány, ale s určitým chytrým algebraickým postupem mohou ověřovatelé stále vyhodnotit polynomy v bodech, které reprezentují.

</ExpandableCard>

<InfoBanner isWarning mb={8}>
  Ani Danksharding, ani Proto-Danksharding nesledují tradiční model „tříštění“, který má za cíl rozdělit blockchain do více částí. Shard chainy již nejsou součástí plánu. Místo toho Danksharding využívá ke škálování Etherea distribuované vzorkování dat napříč bloby. To je mnohem jednodušší na implementaci. Tento model je někdy označován jako „tříštění dat“.
</InfoBanner>

## Co je Danksharding? {#what-is-danksharding}

Danksharding je úplná realizace škálování rollupů, které začalo s Proto-Danksharding. Danksharding přinese obrovské množství prostoru na Ethereu, kde mohou rollupy ukládat svá komprimovaná transakční data. To znamená, že Ethereum bude schopno snadno podporovat stovky jednotlivých rollupů a umožní provádění milionů transakcí za sekundu.

Funguje to tak, že se rozšíří počet blobů připojených k blokům ze šesti (6) v Proto-Danksharding na 64 v úplném Danksharding. Zbytek změn vyžaduje aktualizace způsobu, jakým konsenzus klienti fungují, aby byli schopni zpracovávat nové velké bloby. Některé z těchto změn jsou již součástí plánu pro jiné účely nezávisle na Danksharding. Např. Danksharding vyžaduje implementaci oddělení navrhovatelů a stavitelů bloků (proposer-builder separation). To je vylepšení, které rozděluje úkoly budování bloků a jejich navrhování mezi různé validátory. Podobně je pro Danksharding potřeba vzorkování dostupnosti dat, ale to je také nezbytné pro vývoj jednoduchých klientů, které neukládají velké množství historických dat („bezstavové klienty“).

<ExpandableCard title="Proč Danksharding vyžaduje oddělení navrhovatelů a stavitelů bloků?" eventCategory="/roadmap/danksharding" eventName="clicked why does danksharding require proposer-builder separation?">

Oddělení navrhovatelů a stavitelů bloků je nezbytné k tomu, aby jednotliví validátoři nemuseli generovat drahé závazky a důkazy pro 32 MB blobových dat. To by příliš zatěžovalo domácí validátory a vyžadovalo by to investice do výkonnějšího hardwaru, což by signifikantně snížilo decentralizaci. Místo toho převezmou zodpovědnost za tuto náročnou výpočetní práci specializovaní stavitelé bloků. Poté zpřístupní své bloky navrhovatelům bloků, aby je mohli šířit. Navrhovatel bloku jednoduše vybere blok, který je nejziskovější. Každý může levně a rychle ověřit bloby, což znamená, že jakýkoliv běžný validátor může zkontrolovat poctivost jednání stavitelů bloků. To umožňuje zpracování velkých blobů bez obětování decentralizace. Nepoctiví stavitelé bloků by mohli být jednoduše vyloučeni ze sítě a penalizováni a další by je nahradili, protože stavba bloků je výnosná činnost.

</ExpandableCard>

<ExpandableCard title="Proč Danksharding vyžaduje vzorkování dostupnosti dat?" eventCategory="/roadmap/danksharding" eventName="clicked why does danksharding require data availability sampling?">

Vzorkování dostupnosti dat je nezbytné pro validátory k rychlému a efektivnímu ověřování blobových dat. Pomocí vzorkování dostupnosti dat si mohou být validátoři jistí, že byla blobová data dostupná a správně potvrzena. Každý validátor může náhodně vybrat jen několik datových bodů a vytvořit důkaz, což znamená, že žádný validátor nemusí kontrolovat celý blob. Pokud nějaká data chybí, budou rychle identifikována a blob bude zamítnut.

</ExpandableCard>

### Aktuální průběh {#current-progress}

Úplný Danksharding je vzdálen několik let. Mezitím Ceremoniál KZG skončil s více než 140 000 příspěvky a [EIP](https://eips.ethereum.org/EIPS/eip-4844) pro Proto-Danksharding je hotový. Tento návrh byl plně implementován na všech testovacích sítích a byl spuštěn na hlavní síti s vylepšením sítě Cancun-Deneb („Dencun“) v březnu 2024.

### Další informace {#further-reading}

- [Poznámky k Proto-Dankshardingu](https://notes.ethereum.org/@vbuterin/proto_danksharding_faq) – _Vitalik Buterin_
- [Poznámky Dankrada k Dankshardingu](https://notes.ethereum.org/@dankrad/new_sharding)
- [Diskuze mezi Dankradem, Protem a Vitalikem o Dankshardingu](https://www.youtube.com/watch?v=N5p0TB77flM)
- [Ceremoniál KZG](https://ceremony.ethereum.org/)
- [Přednáška Carla Beekhuizena na Devconu o důvěryhodných nastaveních](https://archive.devcon.org/archive/watch/6/the-kzg-ceremony-or-how-i-learnt-to-stop-worrying-and-love-trusted-setups/?tab=YouTube)
- [Více o vzorkování dostupnosti dat pro bloby](https://hackmd.io/@vbuterin/sharding_proposal#ELI5-data-availability-sampling)
- [Dankrad Feist o KZG závazcích a důkazech](https://youtu.be/8L2C6RDMV9Q)
- [KZG polynomiální závazky](https://dankradfeist.de/ethereum/2020/06/16/kate-polynomial-commitments.html)
