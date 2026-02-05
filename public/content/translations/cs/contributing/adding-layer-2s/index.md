---
title: Přidávání vrstev 2
description: Zásady, které používáme při přidávání vrstev 2 na ethereum.org
lang: cs
---

# Přidání druhých vrstev {#adding-layer-2}

Chceme se ujistit, že uvádíme ty nejlepší možné zdroje, aby se uživatelé mohli bezpečně a s jistotou pohybovat v prostoru vrstev 2.

Kdokoli může na stránkách ethereum.org navrhnout vrstvy 2. Pokud jsme nějakou druhou vrstvu vynechali, **[navrhněte ji, prosím](https://github.com/ethereum/ethereum-org-website/issues/new?assignees=&labels=feature+%3Asparkles%3A%2Ccontent+%3Afountain_pen%3A&template=suggest_layer2.yaml)!**

V současné době uvádíme seznam vrstev 2 na následujících stránkách:

- [Optimistické rollupy](/developers/docs/scaling/optimistic-rollups/)
- [Rollupy s nulovou znalostí](/developers/docs/scaling/zk-rollups/)
- [Druhá vrstva](/layer-2/)

Vrstva 2 je pro Ethereum relativně nové a vzrušující paradigma. Snažili jsme se vytvořit spravedlivý framework pro posuzování na ethereum.org, ale kritéria pro zařazení do seznamu se budou časem měnit a vyvíjet.

## Rozhodovací rámec {#decision-framework}

### Kritéria pro zařazení: co je nutností {#criteria-for-inclusion-the-must-haves}

**Uvedení na L2BEAT**

- Aby mohl být tento projekt zařazen, musí být uveden na [L2BEAT](https://l2beat.com). L2BEAT poskytuje robustní hodnocení rizik projektů vrstev 2, o které se při hodnocení opíráme. **Pokud projekt není uveden na L2BEAT, nebudeme ho uvádět jako vrstvu 2 na ethereum.org.**
- [Zjistěte, jak přidat svůj projekt L2 na L2BEAT](https://github.com/l2beat/l2beat/blob/master/CONTRIBUTING.md).

**Open source**

- Váš kód musí být přístupný a měli byste přijímat pull requesty od širší komunity.

**Kategorie vrstvy 2**

V současné době považujeme za řešení vrstvy 2 následující řešení:

- Optimistický rollup
- Rollup nulové znalosti

_Ostatní řešení škálování, která nevyužívají Ethereum pro dostupnost dat nebo zabezpečení, nepovažujeme za druhou vrstvu._

**Ethereum pro dostupnost dat**

- Dostupnost dat je důležitým rozlišovacím faktorem mezi ostatními řešeními škálování a vrstvou 2. Projekt **musí** používat hlavní síť Etherea pro dostupnost dat, aby mohl být zařazen do seznamu.

**Přemostění**

- Jak se mohou uživatelé přemostit na vrstvu 2?

**Datum spuštění projektu**

- Vrstva 2, která je na hlavní síti „naživu“ již více než 6 měsíců

- U novějších projektů, které ještě nebyly testovány uživateli, je pravděpodobnost zařazení do seznamu nižší.

**Externí bezpečnostní audit**

- Ať už prostřednictvím auditu, interního bezpečnostního týmu nebo jiné metody, zabezpečení vašeho produktu musí být spolehlivě otestováno. Snižujete tím riziko pro naše uživatele a dáváte nám najevo, že zabezpečení berete vážně.

**Stálá uživatelská základna**

- Budeme brát v úvahu metriky, jako je historie TVL, statistiky transakcí a to, zda ji používají známé společnosti nebo projekty

**Aktivní vývojářský tým**

- Nebudeme uvádět vrstvu 2, která nemá aktivní tým pracující na projektu.

**Průzkumník bloků**

- Uvedené projekty vyžadují funkční průzkumník bloků, který uživatelům umožní snadnou navigaci v blockchainu.

### Další kritéria: užitečné vlastnosti {#nice-to-haves}

**Projekt podporuje burzy**

- Mohou uživatelé vkládat a/nebo vybírat peníze přímo na burze?

**Odkazy na dappky v ekosystému vrstvy 2**

- Chceme být schopni poskytnout informace o tom, co mohou uživatelé očekávat, že budou moci na této vrstvě 2 dělat. (např. https://portal.arbitrum.io/, https://www.optimism.io/apps)

**Seznamy tokenových kontraktů**

- Vzhledem k tomu, že aktiva budou mít novou adresu na vrstvě 2, pokud je k dispozici zdroj seznamu tokenů, uveďte ho.

**Nativní podpora peněženek**

- Podporují některé peněženky nativně vrstvu 2?

## Přidejte svou druhou vrstvu {#add-exchange}

Pokud chcete přidat vrstvu 2 na ethereum.org, vytvořte problém na GitHubu.

<ButtonLink href="https://github.com/ethereum/ethereum-org-website/issues/new?assignees=&labels=feature+%3Asparkles%3A%2Ccontent+%3Afountain_pen%3A&template=suggest_layer2.yaml">
  Vytvořit issue
</ButtonLink>
