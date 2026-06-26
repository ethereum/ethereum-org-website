---
title: Přidávání vrstev 2
description: Zásady, které používáme při přidávání vrstvy 2 na ethereum.org
lang: cs
---

Chceme se ujistit, že uvádíme ty nejlepší možné zdroje, aby se uživatelé mohli v prostoru vrstvy 2 pohybovat bezpečně a s jistotou.

Kdokoli může navrhnout přidání vrstvy 2 na ethereum.org. Pokud existuje vrstva 2, kterou jsme vynechali, **[navrhněte ji prosím](https://github.com/ethereum/ethereum-org-website/issues/new?assignees=&labels=feature+%3Asparkles%3A%2Ccontent+%3Afountain_pen%3A&template=suggest_layer2.yaml)!**

V současné době uvádíme l2 na následujících stránkách:

- [Optimistické rollupy](/developers/docs/scaling/optimistic-rollups/)
- [Rollupy s nulovou znalostí](/developers/docs/scaling/zk-rollups/)
- [Vrstva 2](/layer-2/)

Vrstva 2 je pro Ethereum relativně nové a vzrušující paradigma. Snažili jsme se vytvořit spravedlivý rámec pro posuzování na ethereum.org, ale kritéria pro zařazení se budou v průběhu času měnit a vyvíjet.

## Rámec pro rozhodování {#decision-framework}

### Kritéria pro zařazení: nezbytné požadavky {#criteria-for-inclusion-the-must-haves}

**Zařazení na L2BEAT**

- Aby mohl být projekt zvažován, musí být uveden na [L2BEAT](https://l2beat.com). L2BEAT poskytuje robustní hodnocení rizik projektů vrstvy 2, o které se opíráme při hodnocení l2 projektů. **Pokud projekt není uveden na L2BEAT, nezařadíme jej jako l2 na ethereum.org.**
- [Přečtěte si, jak přidat svůj l2 projekt na L2BEAT](https://github.com/l2beat/l2beat/blob/master/CONTRIBUTING.md).

**Open source**

- Váš kód musí být přístupný a měli byste přijímat PR od širší komunity.

**Kategorie vrstvy 2**

V současné době považujeme za řešení vrstvy 2 následující:

- Optimistický rollup
- Rollup s nulovou znalostí

_Jiná řešení škálování, která nevyužívají Ethereum pro dostupnost dat nebo bezpečnost, nepovažujeme za vrstvu 2._

**Ethereum pro dostupnost dat**

- Dostupnost dat je důležitým rozlišovacím faktorem mezi ostatními řešeními škálování a vrstvou 2. Aby mohl být projekt zvažován pro zařazení, **musí** pro dostupnost dat využívat Ethereum Mainnet.

**Mosty**

- Jak se mohou uživatelé připojit k vrstvě 2?

**Datum spuštění projektu**

- Vrstva 2, která je „živě“ na Mainnetu déle než 6 měsíců.

- U novějších projektů, které nebyly prověřeny uživateli v praxi, je menší pravděpodobnost, že budou zařazeny.

**Externí bezpečnostní audit**

- Ať už prostřednictvím auditu, interního bezpečnostního týmu nebo jiné metody, bezpečnost vašeho produktu musí být spolehlivě otestována. To snižuje riziko pro naše uživatele a ukazuje nám, že berete bezpečnost vážně.

**Trvalá uživatelská základna**

- Budeme zvažovat metriky, jako je historie celkové uzamčené hodnoty (TVL), statistiky transakcí a to, zda jej používají známé společnosti nebo projekty.

**Aktivní vývojový tým**

- Nezařadíme vrstvu 2, která nemá aktivní tým pracující na projektu.

**Prohlížeč bloků**

- Zařazené projekty vyžadují funkční prohlížeč bloků, který uživatelům umožní snadnou navigaci v řetězci.

### Další kritéria: co by bylo dobré mít {#nice-to-haves}

**Podpora projektu na burzách**

- Mohou uživatelé vkládat a/nebo vybírat prostředky přímo z burzy?

**Odkazy na decentralizované aplikace (dapp) v ekosystému vrstvy 2**

- Chceme být schopni poskytnout informace o tom, co mohou uživatelé očekávat, že budou moci na této vrstvě 2 dělat. (např. https://portal.arbitrum.io/, https://www.optimism.io/apps)

**Seznamy kontraktů tokenů**

- Vzhledem k tomu, že aktiva budou mít na vrstvě 2 novou adresu, pokud je k dispozici zdroj se seznamem tokenů, prosím sdílejte jej.

**Nativní podpora peněženek**

- Podporují nějaké peněženky l2 nativně?

## Přidejte svou vrstvu 2 {#add-exchange}

Pokud chcete přidat vrstvu 2 na ethereum.org, vytvořte issue na GitHubu.

<ButtonLink href="https://github.com/ethereum/ethereum-org-website/issues/new?assignees=&labels=feature+%3Asparkles%3A%2Ccontent+%3Afountain_pen%3A&template=suggest_layer2.yaml">
  Vytvořit issue
</ButtonLink>