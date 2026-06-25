---
title: "Příprava Etherea a kryptografie na kvantovou budoucnost"
description: "Tyto upgrady upevňují pozici Etherea jako odolné, decentralizované základní vrstvy pro budoucnost, ať už přinese cokoli."
lang: cs
image: /images/roadmap/roadmap-future.png
alt: "Plán vývoje Etherea"
template: roadmap
summaryPoints:
  - Postkvantová kryptografie zajišťuje, že Ethereum dokáže přežít pokročilé hardwarové hrozby s tím, jak postupuje vývoj kvantových počítačů
  - Zjednodušení protokolu usnadňuje údržbu, audit a zabezpečení Etherea
  - Nedávné upgrady již přinesly smysluplná zlepšení efektivity
---

Některé části plánu vývoje se netýkají současného škálování nebo zabezpečení Etherea. Jsou o tom, aby bylo Ethereum **stabilní a spolehlivé i v daleké budoucnosti**. To znamená přípravu na nové druhy hrozeb a odstranění zbytečné složitosti z protokolu.

## Odolnost vůči kvantovým počítačům {#quantum-resistance}

Ethereum využívá [kryptografii](/glossary/#cryptography) k udržení bezpečnosti sítě a ochraně prostředků uživatelů. Časem budou některé z těchto kryptografických metod **zranitelné vůči kvantovým počítačům**, které dokážou řešit specifické matematické problémy exponenciálně rychleji než klasické stroje.

**Žádný kvantový počítač dnes nedokáže prolomit kryptografii Etherea.** Potřebný hardware zatím v dostatečném měřítku neexistuje. Nedávný výzkum však naznačuje, že se tato propast uzavírá rychleji, než se dříve očekávalo. V březnu 2026 publikovala společnost Google Quantum AI článek, ve kterém odhaduje, že prolomení 256bitové kryptografie eliptických křivek (typ, který Ethereum používá pro podpisy účtů) by mohlo vyžadovat zhruba 1 200 logických qubitů, což je asi 20krát méně než dřívější odhady. Google si stanovil interní termín do roku 2029 pro migraci vlastních systémů na kryptografii bezpečnou proti kvantovým počítačům.

Plánování a bezpečné provedení kryptografických přechodů trvá roky. Protože je bezpečnostní model Etherea navržen tak, aby vydržel desítky let, byla postkvantová příprava v plánu vývoje Etherea ještě předtím, než se objevila v hlavních zprávách. Příprava sítě probíhá již nyní, aby se zajistil hladký přechod, a nejedná se o reakci na stav nouze.

### Co je v ohrožení? {#what-is-at-risk}

Byly identifikovány čtyři hlavní oblasti kryptografie Etherea, které vyžadují postkvantové upgrady:

1. **Podpisy konsensu (BLS)**: [Validátory](/glossary/#validator) používají podpisy BLS k hlasování o platných [blocích](/glossary/#block). Kvantový počítač by mohl tyto podpisy zfalšovat.
2. **Dostupnost dat (závazky KZG)**: [Závazková schémata](/roadmap/danksharding/#what-is-kzg), která pomáhají Ethereu škálovat, spoléhají na matematiku (konkrétně párování eliptických křivek), která je zranitelná vůči kvantovým útokům.
3. **Podpisy účtů (ECDSA)**: Schéma podpisu, které chrání jednotlivé účty Etherea. Když účet odešle transakci, jeho veřejný klíč je odhalen onchain. Kvantový počítač by mohl z tohoto odhaleného veřejného klíče odvodit soukromý klíč, což by potenciálně umožnilo krádež prostředků.
4. **Důkazy s nulovou znalostí (ZK-proofs) na aplikační vrstvě**: Systémy důkazů s nulovou znalostí používané rollupy a dalšími aplikacemi spoléhají na kryptografické předpoklady, které by kvantové počítače mohly narušit.

<ExpandableCard title="Mohou mi dnes kvantové počítače ukrást ETH?" eventCategory="/roadmap/future-proofing" eventName="clicked can quantum computers steal my ETH today?">

Ne. Žádný kvantový počítač dnes nedokáže prolomit kryptografii Etherea. Práce popsaná na této stránce je přípravou na budoucnost, nikoli reakcí na aktivní hrozbu. Až budou k dispozici postkvantové peněženky, software peněženky vás provede migrací. Prozatím nemusíte dělat vůbec nic.

</ExpandableCard>

### Co se s tím dělá? {#what-is-being-done}

Ethereum je v současnosti nejproaktivnějším obráncem proti kvantovým hrozbám v blockchainovém ekosystému. Nadace Ethereum vytvořila v lednu 2026 specializovaný **tým pro postkvantovou bezpečnost** a aktivní práce probíhá napříč mnoha týmy klientů a výzkumnými skupinami. Práce postkvantového týmu Nadace Ethereum je veřejně sledována na [pq.ethereum.org](https://pq.ethereum.org).

Aktivní práce zahrnuje:

- **Podpisy založené na hashi (leanXMSS)**: Náhrada za podpisy validátorů bezpečná proti kvantovým počítačům, postavená na hashovacích funkcích, které kvantové počítače nedokážou efektivně prolomit.
- **Minimální zkVM (leanVM)**: Protože jsou podpisy bezpečné proti kvantovým počítačům větší než v současnosti používané podpisy, je leanXMSS spárován s minimálním zkVM (leanVM). Tento engine efektivně agreguje podpisy bezpečné proti kvantovým počítačům a komprimuje data 250krát, takže síť zůstane i po přechodu rychlá.
- **Týdenní testování interoperability**: Více než 10 týmů klientů se účastní pravidelných postkvantových devnetů.
- **Dostupnost dat:** Upgrade základní kryptografie používané ke zpracování velkého množství síťových dat zajistí, že Ethereum zůstane rychlé a cenově dostupné, aniž by riskovalo budoucí kvantové zranitelnosti.
- **Cena Poseidon**: Výzkumná cena ve výši 1 milionu dolarů zaměřená na vylepšení kryptografických primitiv založených na hashi.
- **Standardy NIST**: Americký Národní institut standardů a technologie (NIST) dokončil v srpnu 2024 tři standardy postkvantové kryptografie (ML-KEM, ML-DSA, SLH-DSA). Práce Etherea staví na těchto základech.

Klíčovou součástí strategie přechodu je **EIP-8141**, který zavádí nativní [abstrakci účtu](/roadmap/account-abstraction/). To umožňuje jednotlivým účtům zvolit si vlastní ověření podpisu, což znamená, že by uživatelé mohli přejít na podpisy bezpečné proti kvantovým počítačům, **aniž by museli čekat na jedinou migraci v rámci celého protokolu**. O EIP-8141 se uvažuje pro hard fork Hegotá (plánovaný na druhou polovinu roku 2026).

Nadace Ethereum nastínila strukturované milníky forků, jejichž cílem je dokončení základní postkvantové infrastruktury přibližně do roku 2029. Jedná se o plánované cíle, nikoli o zaručené závazky.

[Přečtěte si našeho podrobného průvodce postkvantovou kryptografií na Ethereu](/roadmap/future-proofing/quantum-resistance/)

## Jednodušší a efektivnější Ethereum {#simpler-more-efficient-ethereum}

Složitost vytváří příležitosti pro chyby a zranitelnosti. Část plánu vývoje se zaměřuje na **zjednodušení Etherea a odstranění technického dluhu**, aby bylo snazší protokol udržovat, auditovat a logicky analyzovat.

### Co již bylo dodáno {#what-has-been-delivered}

Několik nedávných upgradů učinilo Ethereum jednodušším a efektivnějším:

- **[Pectra (květen 2025)](/roadmap/pectra/)**: Zavedl EIP-7702, který umožňuje externě vlastněným účtům dočasně delegovat na kód chytrého kontraktu, což je odrazový můstek k plné [abstrakci účtu](/roadmap/account-abstraction/). Dále přidal předkompilovaný kontrakt BLS12-381 (EIP-2537), zpracování vkladů onchain (EIP-6110), přístup k historickým hashům bloků v EVM (EIP-2935) a zvýšil maximální efektivní zůstatek pro validátory (EIP-7251).
- **[Fusaka (prosinec 2025)](/roadmap/fusaka/)**: Nasadil PeerDAS (EIP-7594), peer-to-peer systém vzorkování dostupnosti dat, který rozděluje zátěž dostupnosti dat napříč sítí. Také zvýšil parametry blobů, čímž rozšířil propustnost dat pro [rollupy](/glossary/#rollups).
- **[Dencun (březen 2024)](/roadmap/dencun/)**: Zavedl blobové transakce (EIP-4844) pro levnější data rollupů a omezil `SELFDESTRUCT` (EIP-6780), aby odstranil dlouhodobý zdroj složitosti.
- **[London (srpen 2021)](/ethereum-forks/#london)**: Přepracoval cenotvorbu [gasu](/glossary/#gas) pomocí EIP-1559, čímž zavedl základní poplatek a mechanismus spalování pro předvídatelnější transakční náklady.

### Na čem se pracuje {#what-is-in-progress}

- **[Glamsterdam (plánováno na první polovinu roku 2026)](/roadmap/glamsterdam/)**: Zvažuje se zahrnutí: zakotvené oddělení navrhovatele a tvůrce (PBS) (EIP-7732), seznamy přístupů na úrovni bloku (EIP-7928) a přecenění gasu pro lepší sladění nákladů se skutečným využitím zdrojů.
- **Hegotá (plánováno na druhou polovinu roku 2026)**: Zvažuje se zahrnutí: [Verkle stromy](/roadmap/verkle-trees/), které nahradí současnou datovou strukturu efektivnější, jež umožní bezstavové klienty. Cílí se také na EIP-8141 (nativní abstrakce účtu).
- **Probíhající**: Úsilí o zjednodušení [EVM](/developers/docs/evm/), harmonizaci implementací klientů a postupné vyřazování zastaralých funkcí pokračuje napříč vývojářskou komunitou Etherea.

## Současný pokrok {#current-progress}

Začátkem roku 2026:

**Zjednodušení a efektivita**: Pectra a Fusaka přinesly skutečná zlepšení ve flexibilitě účtů, dostupnosti dat a operacích validátorů. Glamsterdam a Hegotá jsou v aktivním vývoji s jasnými cíli učinit síť odolnější a efektivnější a zároveň odstranit externí závislosti.

**Postkvantová kryptografie**: Probíhá aktivní výzkum a raná implementace. Ekosystém financoval výzkumné ceny a provozuje týdenní devnety pro interoperabilitu napříč mnoha klienty, a to navíc k výzkumu prováděnému specializovaným postkvantovým týmem Nadace Ethereum. Ačkoli strukturované milníky forků cílí na dokončení přibližně v roce 2029, raný výzkum přináší hmatatelné důkazy, které ukazují, že postkvantové provádění je životaschopné již dnes.

**Abstrakce účtu a agilita podpisů**: EIP-7702 byl nasazen v Pectře. EIP-8141, o kterém se uvažuje pro Hegotá, umožní účtům používat jakékoli schéma podpisu, což uživatelům poskytne cestu k přijetí podpisů bezpečných proti kvantovým počítačům ještě před dokončením úplného přechodu protokolu.

Žádná část této práce není dokončena. Časové osy jsou cíle, nikoli záruky. Rozsah a tempo aktivního vývoje však představují jasný závazek udržet Ethereum dlouhodobě bezpečné a efektivní.

**Další čtení**

- [Postkvantová kryptografie na Ethereu](/roadmap/future-proofing/quantum-resistance/)
- [strawmap.org](https://strawmap.org/) - _Architektura EF_
- [pq.ethereum.org](https://pq.ethereum.org)
- [Gas](/developers/docs/gas/)
- [EVM](/developers/docs/evm/)
- [Datové struktury](/developers/docs/data-structures-and-encoding/)