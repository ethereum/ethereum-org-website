---
title: Příprava na budoucnost Etherea
description: Neustávající práce na vylepšeních činí Ethereum odolnou, decentralizovanou základní vrstvou, bez ohledu na to, co nám budoucnost přinese.
lang: cs
image: /images/roadmap/roadmap-future.png
alt: "Plán Etherea"
template: roadmap
---

Některé části plánu nejsou nezbytně nutné pro škálování nebo zabezpečení Etherea v blízké budoucnosti, ale pro stabilitu a spolehlivost ve vzdálené budoucnosti.

## Odolnost proti kvantovým počítačům {#quantum-resistance}

Až budou vynalezeny kvantové počítače, bude část [kryptografie](/glossary/#cryptography) zajišťující bezpečnost současného Etherea ohrožena. Přestože kvantové počítače jsou pravděpodobně desítky let vývoje daleko od toho, aby se staly skutečnou hrozbou pro moderní kryptografii, Ethereum je budováno tak, aby bylo bezpečné po celá staletí. I tak je ale snaha o [Ethereum odolné proti útokům kvantových počítačům](https://consensys.net/blog/developers/how-will-quantum-supremacy-affect-blockchain/) prioritou.

Výzva, před kterou vývojáři Etherea stojí, spočívá v tom, že současný protokol [Důkaz podílem](/glossary/#pos) spoléhá na efektivní podpisové schéma pro agregaci hlasů na platných [blocích](/glossary/#block), známé jako BLS. Toto schéma podpisu je ohroženo kvantovými počítači, ale kvantově odolné alternativy nejsou tak účinné.

Je známo, že [schémata závazků „KZG“](/roadmap/danksharding/#what-is-kzg), která se v Ethereu používají ke generování kryptografických tajemství, jsou kvantově zranitelná. V současné době se tento problém obchází pomocí „nastavení s nutností důvěry“, kde mnoho uživatelů generuje náhodnost, kterou nelze zpětně analyzovat kvantovým počítačem. Ideálním řešením by však bylo začlenit místo toho kvantově bezpečnou kryptografii. Existují dva hlavní přístupy, které by mohly účinně nahradit BLS schéma: Podepisování založené na [STARK](https://hackmd.io/@vbuterin/stark_aggregation) technologii a podepisování založené na [mřížce](https://medium.com/asecuritysite-when-bob-met-alice/so-what-is-lattice-encryption-326ac66e3175). **Ty jsou v současné době zkoumány a prototypovány**.

<ButtonLink variant="outline-color" href="/roadmap/danksharding#what-is-kzg"> Další materiály o KZG a nastaveních s nutností důvěry</ButtonLink>

## Jednodušší a efektivnější Ethereum {#simpler-more-efficient-ethereum}

Složitost vytváří příležitosti pro chyby nebo zranitelnosti, které mohou útočníci zneužít. Proto je součástí plánu vývoje Etherea jeho zjednodušení a odstranění kódu, který byl připojen s různými vylepšeními, ale už není potřeba nebo je možné ho vylepšit. Štíhlý a jednoduchý kód je pro vývojáře snazší udržovat a rozvíjet.

V plánu je několik aktualizací, které budou provedeny ve [virtuálním stroji Etherea (EVM)](/developers/docs/evm) za účelem zjednodušení a zvýšení efektivity. Patří mezi ně [odstranění opkódu SELFDESTRUCT](https://hackmd.io/@vbuterin/selfdestruct) – jedná se o zřídka používaný příkaz, který už není potřeba a za určitých okolností může být jeho použití nebezpečné, zejména v kombinaci s dalšími budoucími vylepšeními úložiště Etherea. [Klienti na Ethereu](/glossary/#consensus-client) také stále podporují některé staré typy transakcí, které lze nyní zcela odstranit. Způsob výpočtu [transakčního poplatku](/glossary/#gas) je také možné zlepšit. Dále mohou být zavedeny efektivnější metody pro aritmetický základ některých kryptografických operací.

Podobně existují aktualizace, které lze provést v jiných částech současných klientů Etherea. Jedním z příkladů je, že současní exekutivní a konsensuální klienti používají jiný typ komprese dat. Sdílení dat mezi klienty bude mnohem jednodušší a intuitivnější, když bude schéma komprese jednotné v celé síti.

## Aktuální průběh {#current-progress}

Většina vylepšení potřebných pro budoucí zabezpečení Etherea je **stále ve fázi výzkumu a může trvat několik let**, než dojde k jejich implementaci. Vylepšení, jako je odstranění SELFDESTRUCT a harmonizace kompresního schématu používaného v exekučních a konsensuálních klientech, pravděpodobně přijdou dříve než kvantově odolná kryptografie.

**Další informace**

- [Palivo](/developers/docs/gas)
- [EVM](/developers/docs/evm)
- [Datové struktury](/developers/docs/data-structures-and-encoding)
