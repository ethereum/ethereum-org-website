---
title: "Bezpečnější Ethereum"
description: "Plán vývoje Etherea dnes posiluje tvorbu bloků a odolnost vůči cenzuře, zatímco připravuje protokol na kvantovou éru a desetiletí spolehlivého provozu."
lang: cs
image: /images/roadmap/roadmap-security.png
alt: "Plán vývoje Etherea"
template: roadmap
summaryPoints:
  - Krátkodobá vylepšení zabezpečení, jako je zakotvené oddělení navrhovatele a tvůrce a seznamy pro zahrnutí, jsou v aktivním vývoji
  - Postkvantová příprava probíhá roky před jakoukoli reálnou kvantovou hrozbou
  - Zjednodušení protokolu odstraňuje složitost a zmenšuje prostor pro útoky na Ethereum
---

Ethereum je již nyní velmi bezpečná, decentralizovaná platforma pro [chytré kontrakty](/glossary/#smart-contract). Plán vývoje má za cíl udržet tento stav po celá desetiletí tím, že **posiluje síť již dnes a zároveň se připravuje na hrozby, které se mohou objevit až za několik let**. Krátkodobé aktualizace lze sledovat na [forkcast.org](https://forkcast.org) a dlouhodobý návrh plánu vývoje je zveřejněn na [strawmap.org](https://strawmap.org).

<ExpandableCard title="Je dnes Ethereum bezpečné?" eventCategory="/roadmap/security" eventName="clicked is ethereum secure today?">

Ano. Ethereum běží nepřetržitě od roku 2015 bez výpadků. Vylepšení na této stránce činí již tak bezpečnou síť odolnější vůči útokům, cenzuře nebo narušení.

</ExpandableCard>

## Tvorba bloků nevyžadující důvěru {#trustless-block-building}

Většina bloků Etherea je dnes sestavována prostřednictvím dělby práce: specializovaní tvůrci sestaví co nejhodnotnější blok a [validátor](/glossary/#validator), který je na řadě, navrhne nejlepší nabídku. To brání tomu, aby profesionální tvorba bloků koncentrovala [stake](/glossary/#staking) mezi největší operátory, ale od roku 2022 se spoléhá na software mimo protokol, který síť nemůže ověřit.

**Zakotvené oddělení navrhovatele a tvůrce (ePBS, neboli EIP-7732)** přesouvá toto rozdělení do protokolu, čímž odstraňuje nutnost důvěřovat zprostředkovatelům (relays), tedy třetím stranám, které v současnosti předávají bloky mezi tvůrci a validátory. ePBS je hlavním bodem nadcházejícího upgradu [Glamsterdam](/roadmap/glamsterdam/), který je plánován na rok 2026. Pro Mainnet zatím nebylo stanoveno žádné datum; klientské týmy jej testují na devnetech (dočasných testovacích sítích).

<ButtonLink variant="outline" href="/roadmap/pbs/">Více o oddělení navrhovatele a tvůrce</ButtonLink>

## Odolnost vůči cenzuře {#censorship-resistance}

Síť odolná vůči cenzuře znamená, že nikdo nemůže zabránit tomu, aby se platná transakce dostala do řetězce. **Seznamy pro zahrnutí vynucené volbou forku (FOCIL, neboli EIP-7805)** dávají mnoha validátorům možnost mluvit do toho, co musí blok obsahovat: zveřejňují seznamy čekajících transakcí, které je tvůrce bloku povinen zahrnout. Žádný jednotlivý aktér tak nemůže vaši transakci potichu vynechat.

FOCIL je hlavním bodem vrstvy konsensu v upgradu Hegotá, který následuje po Glamsterdamu a je plánován na rok 2027. Byl záměrně naplánován až po Glamsterdamu, aby ePBS a FOCIL nikdy nebyly nasazeny jako jedna neotestovaná kombinace. Výzkum šifrovaných mempoolů, které by skryly obsah čekajících transakcí, dokud nebudou bezpečně zahrnuty do bloku, nadále pokračuje.

## Rychlejší finalita {#faster-finality}

Pro uživatele je [finalita](/glossary/#finality) okamžikem, kdy se transakce stává trvalou, a kdy by její zvrácení stálo útočníka obrovské množství stakovaných ETH. Dnes finalita trvá přibližně 15 minut a **výzkumníci to chtějí dramaticky zkrátit**. Práce začaly jako finalita v jednom slotu, vyvinuly se ve finalitu ve třech slotech a nyní pokračují jako Minimmit, jednokolový protokol konsensu v programu Lean Ethereum představeném v červenci 2025. Finalita v řádu sekund je dlouhodobým cílem v návrhu plánu vývoje, který směřuje zhruba k roku 2029. Toto zůstává předmětem aktivního výzkumu a žádný upgrade týkající se finality zatím nebyl přiřazen k žádnému forku.

<ButtonLink variant="outline" href="/roadmap/single-slot-finality/">Více o výzkumu rychlejší finality</ButtonLink>

## Odolní validátoři {#resilient-validators}

Validátor je obvykle jeden stroj, který drží jeden podpisový klíč. **Technologie distribuovaných validátorů (DVT)** nahrazuje tento jediný stroj výborem strojů, které sdílejí klíč a podepisují společně, takže selhání jednoho počítače nebo krádež jednoho klíče nevyřadí validátor z provozu. DVT je v produkčním provozu a je ve velkém měřítku využívána operátory stakingu. V lednu 2026 navrhl Vitalik Buterin zjednodušenou variantu na úrovni protokolu zvanou DVT-lite; jedná se o raný návrh bez naplánovaného forku.

Síť se také chrání prostřednictvím [klientské diverzity](/developers/docs/nodes-and-clients/client-diversity/): Ethereum běží na několika nezávisle vytvořených softwarových implementacích, takže chyba v jednom klientovi neohrozí zbytek sítě.

Dva dřívější výzkumné nápady, view-merge a tajná volba lídra, již nejsou aktivními položkami plánu vývoje.

<ButtonLink variant="outline" href="/staking/dvt/">Více o technologii distribuovaných validátorů</ButtonLink>

## Kvantová odolnost {#quantum-resistance}

Ethereum využívá [kryptografii](/glossary/#cryptography) k udržení bezpečnosti sítě a ochraně prostředků uživatelů. Časem budou některé z těchto kryptografických metod **zranitelné vůči kvantovým počítačům**, které dokážou řešit specifické matematické problémy exponenciálně rychleji než klasické stroje.

**Žádný kvantový počítač dnes nedokáže prolomit kryptografii Etherea.** Potřebný hardware zatím v dostatečném měřítku neexistuje. Nedávný výzkum však naznačuje, že se tato propast zmenšuje rychleji, než se dříve očekávalo. V březnu 2026 publikovala společnost Google Quantum AI článek, ve kterém odhaduje, že prolomení 256bitové kryptografie eliptických křivek (typ, který Ethereum používá pro podpisy účtů) by mohlo vyžadovat zhruba 1 200 logických qubitů, což je asi 20krát méně než dřívější odhady.

Kryptografické přechody trvají roky, než se bezpečně naplánují a provedou, takže přípravy probíhají již nyní, dlouho předtím, než bude existovat samotný hardware. Byly identifikovány čtyři oblasti, které vyžadují postkvantové upgrady: podpisy konsensu validátorů (BLS), závazková schémata používaná pro dostupnost dat (KZG), podpisy účtů (ECDSA) a systémy důkazů s nulovou znalostí používané [rollupy](/glossary/#rollups).

Nadace Ethereum vytvořila v lednu 2026 specializovaný **tým pro postkvantovou bezpečnost** a jeho práce je veřejně sledována na [pq.ethereum.org](https://pq.ethereum.org). Aktivní práce zahrnuje podpisy validátorů založené na hashi (leanXMSS) spárované s minimálním zkVM (leanVM), které efektivně agreguje větší kvantově bezpečné podpisy, a týdenní interop devnety s více než 10 klientskými týmy.

Klíčovou součástí strategie přechodu je **EIP-8141**, který zavádí nativní [abstrakci účtu](/roadmap/account-abstraction/). To umožňuje jednotlivým účtům zvolit si vlastní ověřování podpisů, což znamená, že by uživatelé mohli přejít na kvantově bezpečné podpisy, aniž by museli čekat na jedinou migraci v rámci celého protokolu. O EIP-8141 se uvažuje pro upgrade Hegotá. Milníky hlavní postkvantové infrastruktury mají za cíl dokončení přibližně do roku 2029. Jedná se o plánované cíle, které se mohou změnit.

<ExpandableCard title="Mohou dnes kvantové počítače ukrást moje ETH?" eventCategory="/roadmap/security" eventName="clicked can quantum computers steal my ETH today?">

Ne. Žádný kvantový počítač dnes nedokáže prolomit kryptografii Etherea. Práce popsaná na této stránce je včasnou přípravou na hrozbu, která je ještě roky vzdálená. Až budou k dispozici postkvantové peněženky, software peněženky vás provede migrací. Prozatím nemusíte dělat vůbec nic.

</ExpandableCard>

<ButtonLink variant="outline" href="/roadmap/security/quantum-resistance/">Více o kvantové odolnosti</ButtonLink>

## Jednodušší a efektivnější protokol {#simpler-and-more-efficient-protocol}

Složitost vytváří příležitosti pro chyby a zranitelnosti. Část plánu vývoje se zaměřuje na **zjednodušení Etherea a odstranění technického dluhu**, aby se protokol snáze udržoval, auditoval a dalo se o něm lépe uvažovat. Jednodušší protokol také poskytuje útočníkům menší prostor pro zkoumání.

Dosud dodáno:

- **[Pectra (květen 2025)](/roadmap/pectra/)**: Zavedla EIP-7702, který umožňuje externě vlastněným účtům dočasně delegovat na kód chytrého kontraktu, což je odrazový můstek k plné abstrakci účtu.
- **[Fusaka (prosinec 2025)](/roadmap/fusaka/)**: Nasadila PeerDAS (EIP-7594), který distribuuje zátěž dostupnosti dat napříč sítí. Také zvýšila parametry blobů, čímž rozšířila datovou propustnost pro rollupy.
- **[Dencun (březen 2024)](/roadmap/dencun/)**: Zavedl blob transakce (EIP-4844) pro levnější data rollupů a omezil `SELFDESTRUCT` (EIP-6780), aby odstranil dlouhodobý zdroj složitosti.
- **[Shapella (duben 2023)](/staking/withdrawals/)**: Umožnila validátorům vybírat stakované ETH (EIP-4895), čímž odstranila dřívější omezení stakingu typu [důkaz podílem (PoS)](/glossary/#pos).
- **London (srpen 2021)**: Přepracoval oceňování gasu pomocí EIP-1559, zavedl základní poplatek a mechanismus pro spálení pro předvídatelnější transakční náklady.

Probíhá:

- **Glamsterdam (plánováno na rok 2026)**: Hlavními body jsou ePBS (EIP-7732) a seznamy přístupů na úrovni bloků (EIP-7928), přičemž se zvažuje také přecenění gasu.
- **Hegotá (plánováno na rok 2027)**: FOCIL (EIP-7805) je hlavním bodem vrstvy konsensu. Zvažuje se zahrnutí: EIP-8141 (nativní abstrakce účtu).
- **Průběžně**: Snahy o zjednodušení [EVM](/developers/docs/evm/), harmonizaci klientských implementací a postupné vyřazování zastaralých funkcí pokračují napříč klientskými týmy. Práce na bezstavovosti (umožňující účastníkům ověřovat řetězec bez ukládání všech jeho dat) se přepracovává s využitím kvantově bezpečných binárních hashovacích stromů, přičemž konečný přístup ještě nebyl potvrzen.

## Současný pokrok {#current-progress}

K polovině roku 2026:

- **Tvorba bloků a odolnost vůči cenzuře**: ePBS a seznamy přístupů na úrovni bloků běží na devnetech Glamsterdamu. FOCIL je plánován pro Hegotá s cílem v roce 2027.
- **Finalita**: Minimmit a širší práce na konsensu Lean Ethereum zůstávají v aktivním výzkumu, zatím bez přiřazení k forku.
- **Kvantová odolnost**: Běží týdenní postkvantové interop devnety a milníky hlavní infrastruktury směřují přibližně k roku 2029.
- **Zjednodušení**: Pectra a Fusaka byly nasazeny; Glamsterdam a Hegotá přinášejí další kolo úklidu.

Žádná část této práce není dokončena a všechny časové osy jsou odhady, které se mohou změnit.

## Další čtení {#further-reading}

- [Forkcast: Sledování upgradů sítě Ethereum](https://forkcast.org)
- [Strawmap: návrh plánu vývoje Etherea na vrstvě 1 (l1)](https://strawmap.org) - _EF Architecture_
- [Postkvantové Ethereum](https://pq.ethereum.org) - _Nadace Ethereum_
- [Sledování plánu vývoje Lean Ethereum](https://leanroadmap.org) - _ReamLabs_
- [Důkaz podílem (PoS) a finalita](/developers/docs/consensus-mechanisms/pos/#finality)
- [EVM](/developers/docs/evm/)