---
title: Příprava na budoucnost Etherea
description: Neustávající práce na vylepšeních činí Ethereum odolnou, decentralizovanou základní vrstvou, bez ohledu na to, co nám budoucnost přinese.
lang: cs
image: /images/roadmap/roadmap-future.png
alt: "Plán Etherea"
template: roadmap
---

Některé části plánu nejsou nezbytně nutné pro škálování nebo zabezpečení Etherea v blízké budoucnosti, ale pro stabilitu a spolehlivost ve vzdálené budoucnosti.

## Kvantová odolnost {#quantum-resistance}

Až se kvantové počítače stanou realitou, bude část [kryptografie](/glossary/#cryptography), která zabezpečuje dnešní Ethereum, kompromitována. Přestože kvantové počítače jsou pravděpodobně desítky let vývoje daleko od toho, aby se staly skutečnou hrozbou pro moderní kryptografii, Ethereum je budováno tak, aby bylo bezpečné po celá staletí. To znamená, že [Ethereum musí být co nejdříve kvantově odolné](https://consensys.net/blog/developers/how-will-quantum-supremacy-affect-blockchain/).

Výzva, které čelí vývojáři Etherea, spočívá v tom, že současný protokol [proof-of-stake](/glossary/#pos) se spoléhá na velmi účinné schéma podpisů známé jako BLS k agregaci hlasů pro platné [bloky](/glossary/#block). Toto schéma podpisu je ohroženo kvantovými počítači, ale kvantově odolné alternativy nejsou tak účinné.

Je známo, že schémata závazků [„KZG“](/roadmap/danksharding/#what-is-kzg) používaná na několika místech v síti Ethereum ke generování kryptografických tajemství jsou kvantově zranitelná. V současné době se to obchází pomocí „důvěryhodných nastavení“ (pro která byla hlavní ustavující ceremonie úspěšně dokončena v roce 2023), kde mnoho uživatelů generovalo náhodnost, kterou nelze zpětně analyzovat kvantovým počítačem. Ideálním dlouhodobým řešením by však bylo místo toho začlenit kvantově bezpečnou kryptografii. Existují dva hlavní přístupy, které by se mohly stát účinnými náhradami za schéma BLS: podepisování [založené na STARK](https://hackmd.io/@vbuterin/stark_aggregation) a podepisování [založené na mřížce](https://medium.com/asecuritysite-when-bob-met-alice/so-what-is-lattice-encryption-326ac66e3175). **Tyto přístupy jsou stále aktivně zkoumány a prototypovány**.

[Přečtěte si o KZG a důvěryhodných nastaveních](/roadmap/danksharding#what-is-kzg)

## Jednodušší a efektivnější Ethereum {#simpler-more-efficient-ethereum}

Složitost vytváří příležitosti pro chyby nebo zranitelnosti, které mohou útočníci zneužít. Součástí plánu je proto zjednodušení Etherea a odstranění nebo úprava kódu, který přetrval z různých vylepšení, ale již není potřeba nebo ho lze nyní vylepšit. Štíhlý a jednoduchý kód je pro vývojáře snazší udržovat a rozvíjet.

Aby byl [Ethereum Virtual Machine (EVM)](/developers/docs/evm) jednodušší a efektivnější, neustále se zkoumají a implementují vylepšení. To zahrnuje jak řešení zastaralých komponent, tak zavádění optimalizací.

**Nedávno implementované změny:**

- **Přepracování výpočtu poplatků:** Způsob, jakým se počítá [gas (palivo)](/glossary/#gas), byl výrazně vylepšen pomocí **EIP-1559 (implementováno ve vylepšení London, 2021)**, které zavedlo základní poplatek a mechanismus pálení pro předvídatelnější ceny transakcí.
- **Omezení `SELFDESTRUCT`:** Operační kód `SELFDESTRUCT` sice byl zřídka používán, ale představoval potenciální rizika. Jeho funkčnost byla výrazně **omezena ve vylepšení Dencun (březen 2024) prostřednictvím EIP-6780**, aby se zmírnila rizika, zejména pokud jde o správu stavu.
- **Modernizované typy transakcí:** Byly zavedeny nové formáty transakcí (např. prostřednictvím **EIP-2718** a **EIP-4844** pro bloby ve vylepšení Dencun) pro podporu nových funkcí a zlepšení efektivity oproti starším typům.

**Probíhající a budoucí cíle:**

- **Další řešení `SELFDESTRUCT`:** Ačkoli je operační kód `SELFDESTRUCT` omezen, stále se zvažuje jeho **potenciální úplné odstranění** v budoucích vylepšeních pro další zjednodušení stavu EVM. ([Více kontextu k problémům se SELFDESTRUCT](https://hackmd.io/@vbuterin/selfdestruct)).
- **Postupné odstraňování starších typů transakcí:** Ačkoli [klienti Etherea](/glossary/#consensus-client) stále podporují starší typy transakcí pro zpětnou kompatibilitu, cílem je podpořit přechod na novější typy a v budoucnu **potenciálně ukončit podporu nebo plně odstranit nejstarší formáty**.
- **Pokračující výzkum efektivity gasu:** Pokračuje zkoumání **dalších vylepšení výpočtu gasu**, což může zahrnovat koncepty jako vícerozměrný gas pro lepší zohlednění využití zdrojů.
- **Optimalizované kryptografické operace:** Pokračuje úsilí o **zavedení účinnějších metod pro aritmetiku**, která je základem kryptografických operací používaných v EVM.

Podobně existují aktualizace, které lze provést v jiných částech současných klientů Etherea. Jedním z příkladů je, že současní exekutivní a konsensuální klienti používají jiný typ komprese dat. Sdílení dat mezi klienty bude mnohem jednodušší a intuitivnější, když bude schéma komprese jednotné v celé síti. Tato oblast zůstává předmětem zkoumání.

## Aktuální postup {#current-progress}

Mnoho dlouhodobých vylepšení pro budoucí odolnost, zejména **úplná kvantová odolnost pro klíčové protokoly, je stále ve fázi výzkumu a jejich implementace může být vzdálená několik let**.

Nicméně **v úsilí o zjednodušení již bylo dosaženo významného pokroku.** Například klíčové změny jako **omezení `SELFDESTRUCT` (EIP-6780)** a zavedení **transakcí přenášejících bloby (EIP-4844)** byly implementovány ve **vylepšení Dencun (březen 2024)**. Pokračuje také práce na harmonizaci kompresních schémat klientů a dalších vylepšeních efektivity.

**Další informace**

- [Gas (palivo)](/developers/docs/gas)
- [EVM](/developers/docs/evm)
- [Datové struktury](/developers/docs/data-structures-and-encoding)