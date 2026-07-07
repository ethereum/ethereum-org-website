---
title: Danksharding
description: Přečtěte si o proto-dankshardingu a dankshardingu – dvou po sobě jdoucích aktualizacích pro škálování Etherea.
lang: cs
summaryPoints:
  - Danksharding je vícefázová aktualizace pro zlepšení škálovatelnosti a kapacity Etherea.
  - První fáze, proto-danksharding, přidává do bloků datové bloby.
  - Datové bloby nabízejí rollupům levnější způsob, jak odesílat data do Etherea, a tyto náklady mohou být přeneseny na uživatele ve formě nižších transakčních poplatků.
  - Později plný danksharding rozdělí odpovědnost za ověřování datových blobů mezi podmnožiny uzlů, čímž se Ethereum dále škáluje na více než 100 000 transakcí za sekundu.
---

**Danksharding** je způsob, jakým se [Ethereum](/) stane skutečně škálovatelným blockchainem, ale k dosažení tohoto cíle je zapotřebí několik aktualizací protokolu. **Proto-danksharding** je mezikrokem na této cestě. Oba mají za cíl učinit transakce na vrstvě 2 (l2) pro uživatele co nejlevnějšími a měly by škálovat Ethereum na více než 100 000 transakcí za sekundu.

## Co je proto-danksharding? {#what-is-protodanksharding}

Proto-danksharding, známý také jako [EIP-4844](https://eips.ethereum.org/EIPS/eip-4844), je způsob, jakým mohou [rollupy](/layer-2/#rollups) přidávat do bloků levnější data. Název pochází od dvou výzkumníků, kteří s tímto nápadem přišli: Protolambda a Dankrad Feist. Historicky byly rollupy omezeny v tom, jak levné mohou být uživatelské transakce, skutečností, že odesílají své transakce v `CALLDATA`.

To je drahé, protože je to zpracováváno všemi uzly Etherea a zůstává to onchain navždy, i když rollupy potřebují data jen na krátkou dobu. Proto-danksharding zavádí datové bloby, které lze odesílat a připojovat k blokům. Data v těchto blobech nejsou přístupná pro EVM a jsou automaticky smazána po stanovené době (v době psaní tohoto textu je to nastaveno na 4096 epoch, tedy asi 18 dní). To znamená, že rollupy mohou odesílat svá data mnohem levněji a přenést úspory na koncové uživatele ve formě levnějších transakcí.

<ExpandableCard title="Proč bloby zlevňují rollupy?" eventCategory="/roadmap/danksharding" eventName="clicked why do blocks make rollups cheaper?">

Rollupy jsou způsob, jak škálovat Ethereum dávkováním transakcí offchain a následným odesláním výsledků do Etherea. Rollup se v podstatě skládá ze dvou částí: dat a kontroly provedení. Data představují celou sekvenci transakcí, která je zpracovávána rollupem za účelem vytvoření změny stavu odesílané do Etherea. Kontrola provedení je opětovné provedení těchto transakcí nějakým poctivým aktérem („dokazovatelem“), aby se zajistilo, že navrhovaná změna stavu je správná. K provedení kontroly provedení musí být transakční data k dispozici dostatečně dlouho na to, aby si je kdokoli mohl stáhnout a zkontrolovat. To znamená, že jakékoli nepoctivé chování sekvenceru rollupu může být identifikováno a napadnuto dokazovatelem. Nemusí však být k dispozici navždy.

</ExpandableCard>

<ExpandableCard title="Proč je v pořádku smazat data blobů?" eventCategory="/roadmap/danksharding" eventName="clicked why is it OK to delete the blob data?">

Rollupy odesílají závazky ke svým transakčním datům onchain a také zpřístupňují skutečná data v datových blobech. To znamená, že dokazovatelé mohou zkontrolovat, zda jsou závazky platné, nebo napadnout data, o kterých si myslí, že jsou nesprávná. Na úrovni uzlu jsou datové bloby uchovávány v konsensuálním klientovi. Konsensuální klienti potvrzují, že data viděli a že byla šířena po síti. Pokud by se data uchovávala navždy, tito klienti by se neúměrně zvětšili, což by vedlo k velkým hardwarovým požadavkům na provoz uzlů. Místo toho jsou data z uzlu automaticky promazávána každých 18 dní. Potvrzení konsensuálního klienta prokazují, že dokazovatelé měli dostatečnou příležitost data ověřit. Skutečná data mohou být uložena offchain provozovateli rollupů, uživateli nebo jinými subjekty.

</ExpandableCard>

### Jak jsou data v blobech ověřována? {#how-are-blobs-verified}

Rollupy odesílají transakce, které provádějí, v datových blobech. Odesílají také „závazek“ k těmto datům. Dělají to tak, že na data aplikují polynomiální funkci. Tuto funkci lze poté vyhodnotit v různých bodech. Pokud například definujeme extrémně jednoduchou funkci `f(x) = 2x-1`, pak můžeme tuto funkci vyhodnotit pro `x = 1`, `x = 2`, `x = 3`, což dává výsledky `1, 3, 5`. Dokazovatel aplikuje stejnou funkci na data a vyhodnotí ji ve stejných bodech. Pokud se původní data změní, funkce nebude identická, a proto nebudou identické ani hodnoty vyhodnocené v každém bodě. Ve skutečnosti jsou závazek a důkaz složitější, protože jsou zabaleny do kryptografických funkcí.

### Co je KZG? {#what-is-kzg}

KZG je zkratka pro Kate-Zaverucha-Goldberg – jména tří [původních autorů](https://link.springer.com/chapter/10.1007/978-3-642-17373-8_11) schématu, které redukuje datový blob na malý [kryptografický „závazek“](https://dankradfeist.de/ethereum/2020/06/16/kate-polynomial-commitments.html). Datový blob odeslaný rollupem musí být ověřen, aby se zajistilo, že se rollup nechová nesprávně. To zahrnuje dokazovatele, který znovu provede transakce v blobu, aby zkontroloval, zda byl závazek platný. Koncepčně je to stejné jako způsob, jakým exekuční klienti kontrolují platnost transakcí Etherea na vrstvě 1 (l1) pomocí Merkleových důkazů. KZG je alternativní důkaz, který na data aplikuje polynomiální rovnici. Závazek vyhodnocuje polynom v některých tajných datových bodech. Dokazovatel by aplikoval stejný polynom na data a vyhodnotil jej na stejných hodnotách, přičemž by zkontroloval, zda je výsledek stejný. Jedná se o způsob ověření dat, který je kompatibilní s technikami s nulovým vědomím používanými některými rollupy a případně dalšími částmi protokolu Ethereum.

### Co byl ceremoniál KZG? {#what-is-a-kzg-ceremony}

Ceremoniál KZG byl způsob, jakým mohlo mnoho lidí z celé komunity Etherea společně vygenerovat tajný náhodný řetězec čísel, který lze použít k ověření některých dat. Je velmi důležité, aby tento řetězec čísel nebyl znám a nikdo jej nemohl znovu vytvořit. Aby se to zajistilo, každá osoba, která se ceremoniálu zúčastnila, obdržela řetězec od předchozího účastníka. Poté vytvořila nějaké nové náhodné hodnoty (např. tím, že svému prohlížeči umožnila měřit pohyb myši) a smíchala je s předchozí hodnotou. Následně odeslala hodnotu dalšímu účastníkovi a zničila ji ze svého lokálního počítače. Dokud to alespoň jedna osoba v ceremoniálu udělala poctivě, konečná hodnota bude pro útočníka neznámá.

Ceremoniál KZG pro EIP-4844 byl otevřen veřejnosti a zúčastnily se ho desítky tisíc lidí, aby přidali svou vlastní entropii (náhodnost). Celkem bylo zaznamenáno více než 140 000 příspěvků, což z něj činí největší ceremoniál svého druhu na světě. Aby byl ceremoniál narušen, muselo by být 100 % těchto účastníků aktivně nepoctivých. Z pohledu účastníků, pokud vědí, že byli poctiví, není třeba důvěřovat nikomu jinému, protože vědí, že ceremoniál zabezpečili (individuálně splnili požadavek 1 z N poctivých účastníků).

<ExpandableCard title="K čemu se používá náhodné číslo z ceremonie KZG?" eventCategory="/roadmap/danksharding" eventName="clicked why is the random number from the KZG ceremony used for?">

Když rollup odešle data v blobu, poskytne „závazek“, který odešle onchain. Tento závazek je výsledkem vyhodnocení polynomu aplikovaného na data v určitých bodech. Tyto body jsou definovány náhodnými čísly vygenerovanými v ceremoniálu KZG. Dokazovatelé pak mohou vyhodnotit polynom ve stejných bodech za účelem ověření dat – pokud dospějí ke stejným hodnotám, pak jsou data správná.

</ExpandableCard>

<ExpandableCard title="Proč musí náhodná data KZG zůstat tajná?" eventCategory="/roadmap/danksharding" eventName="clicked why does the KZG random data have to stay secret?">

Pokud někdo zná náhodná místa použitá pro závazek, je pro něj snadné vygenerovat nový polynom, který se shoduje v těchto konkrétních bodech (tj. „kolize“). To znamená, že by mohl přidat nebo odebrat data z blobu a stále poskytnout platný důkaz. Aby se tomu zabránilo, místo toho, aby dokazovatelé dostali skutečná tajná místa, obdrží místa zabalená v kryptografické „černé skříňce“ pomocí eliptických křivek. Ty efektivně zamíchají hodnoty takovým způsobem, že původní hodnoty nelze zpětně analyzovat, ale pomocí chytré algebry mohou dokazovatelé a ověřovatelé stále vyhodnocovat polynomy v bodech, které představují.

</ExpandableCard>

<Alert variant="warning">
  Ani danksharding, ani proto-danksharding nesledují tradiční model „shardingu“, jehož cílem je rozdělit blockchain na více částí. Shardové řetězce již nejsou součástí plánu. Místo toho danksharding využívá distribuované vzorkování dat napříč bloby ke škálování Etherea. To je mnohem jednodušší na implementaci. Tento model byl někdy označován jako „data-sharding“.
</Alert>

## Co je danksharding? {#what-is-danksharding}

Danksharding je plnou realizací škálování rollupů, které začalo s proto-dankshardingem. Danksharding přinese na Ethereu obrovské množství prostoru pro rollupy, aby mohly ukládat svá komprimovaná transakční data. To znamená, že Ethereum bude schopno snadno podporovat stovky jednotlivých rollupů a učinit miliony transakcí za sekundu realitou.

Funguje to tak, že se rozšíří počet blobů připojených k blokům ze šesti (6) v proto-dankshardingu na 64 v plném dankshardingu. Zbytek požadovaných změn jsou všechno aktualizace způsobu, jakým fungují konsensuální klienti, aby jim umožnily zpracovávat nové velké bloby. Několik z těchto změn je již v plánu pro jiné účely nezávislé na dankshardingu. Například danksharding vyžaduje, aby bylo implementováno oddělení navrhovatele a tvůrce (PBS). Jedná se o aktualizaci, která odděluje úkoly vytváření bloků a navrhování bloků mezi různé validátory. Podobně je pro danksharding vyžadováno vzorkování dostupnosti dat, ale je také vyžadováno pro vývoj velmi lehkých klientů, kteří neukládají mnoho historických dat („bezstavoví klienti“).

<ExpandableCard title="Proč danksharding vyžaduje oddělení navrhovatele a tvůrce?" eventCategory="/roadmap/danksharding" eventName="clicked why does danksharding require proposer-builder separation?">

Oddělení navrhovatele a tvůrce (PBS) je vyžadováno, aby se zabránilo tomu, že by jednotliví validátoři museli generovat drahé závazky a důkazy pro 32 MB dat v blobech. To by příliš zatěžovalo domácí stakery a vyžadovalo by to od nich investice do výkonnějšího hardwaru, což poškozuje decentralizaci. Místo toho přebírají odpovědnost za tuto nákladnou výpočetní práci specializovaní tvůrci bloků. Poté zpřístupní své bloky navrhovatelům bloků k vysílání. Navrhovatel bloku si jednoduše vybere blok, který je nejziskovější. Kdokoli může bloby levně a rychle ověřit, což znamená, že jakýkoli běžný validátor může zkontrolovat, zda se tvůrci bloků chovají poctivě. To umožňuje zpracovávat velké bloby bez obětování decentralizace. Nepoctiví tvůrci bloků by mohli být jednoduše vyloučeni ze sítě a penalizováni – na jejich místo nastoupí jiní, protože vytváření bloků je zisková činnost.

</ExpandableCard>

<ExpandableCard title="Proč danksharding vyžaduje vzorkování dostupnosti dat?" eventCategory="/roadmap/danksharding" eventName="clicked why does danksharding require data availability sampling?">

Vzorkování dostupnosti dat je vyžadováno, aby validátoři mohli rychle a efektivně ověřovat data v blobech. Pomocí vzorkování dostupnosti dat si mohou být validátoři velmi jisti, že data v blobech byla dostupná a správně zavázána. Každý validátor může náhodně vzorkovat jen několik datových bodů a vytvořit důkaz, což znamená, že žádný validátor nemusí kontrolovat celý blob. Pokud nějaká data chybí, budou rychle identifikována a blob bude odmítnut.

</ExpandableCard>

### Současný pokrok {#current-progress}

Plný danksharding je vzdálen několik let. Mezitím byl ceremoniál KZG ukončen s více než 140 000 příspěvky a [EIP](https://eips.ethereum.org/EIPS/eip-4844) pro proto-danksharding dospěl. Tento návrh byl plně implementován ve všech testnetech a byl spuštěn na Mainnetu s aktualizací sítě Cancun-Deneb („Dencun“) v březnu 2024.

### Další čtení {#further-reading}

- [Poznámky k proto-dankshardingu](https://notes.ethereum.org/@vbuterin/proto_danksharding_faq) – _Vitalik Buterin_
- [Dankradovy poznámky k dankshardingu](https://notes.ethereum.org/@dankrad/new_sharding)
- [Dankrad, Proto a Vitalik diskutují o dankshardingu](https://www.youtube.com/watch?v=N5p0TB77flM)
- [Ceremoniál KZG](https://ceremony.ethereum.org/)
- [Přednáška Carla Beekhuizena na Devconu o důvěryhodných nastaveních](https://archive.devcon.org/archive/watch/6/the-kzg-ceremony-or-how-i-learnt-to-stop-worrying-and-love-trusted-setups/?tab=YouTube)
- [Více o vzorkování dostupnosti dat pro bloby](https://hackmd.io/@vbuterin/sharding_proposal#ELI5-data-availability-sampling)
- [Dankrad Feist o závazcích a důkazech KZG](https://youtu.be/8L2C6RDMV9Q)
- [Polynomiální závazky KZG](https://dankradfeist.de/ethereum/2020/06/16/kate-polynomial-commitments.html)