---
title: Jak propojit tokeny do 2. vrstvy
description: "Návod vysvětlující, jak přesunout tokeny z Etherea do 2. vrstvy pomocí mostu."
lang: cs
---

# Jak propojit tokeny do 2. vrstvy

Pokud je na Ethereu velký provoz, může se to prodražit. Jedním z řešení je vytvoření nových „vrstev“: tj. různých sítí, které fungují podobně jako samotné Ethereum. Tyto takzvané 2. vrstvy pomáhají snižovat přetížení a náklady na Ethereum tím, že zpracovávají mnohem více transakcí za nižší poplatky a jejich výsledek ukládají na Ethereum pouze jednou za čas. Tyto 2. vrstvy nám tak umožňují provádět transakce s vyšší rychlostí a nižšími náklady. Mnoho populárních krypto projektů přechází na 2. vrstvu právě kvůli těmto výhodám. Nejjednodušší způsob, jak přesunout tokeny z Etherea do 2. vrstvy, je použít most.

**Předpoklady:**

- mít kryptoměnovou peněženku – pokud ji nemáte, řiďte se tímto návodem a [vytvořte si účet na Ethereu](/guides/how-to-create-an-ethereum-account/)
- mít v peněžence prostředky

## 1. Určete, kterou síť 2. vrstvy chcete použít

Více informací o různých projektech a důležitých odkazech najdete na naší [stránce o druhé vrstvě](/layer-2/).

## 2. Otevřete si vybraný most

Mezi populární 2. vrstvy patří:

- [Přemostění Arbitrum](https://portal.arbitrum.io/bridge?l2ChainId=42161)
- [Přemostění Optimism](https://app.optimism.io/bridge/deposit)
- [Přemostění sítě Boba](https://hub.boba.network/)

## 3. Připojte se k mostu pomocí vaší peněženky

Ujistěte se, že je vaše peněženka připojena k síti hlavní síti Etherea. Pokud není, webová stránka vás automaticky vyzve k přepnutí sítě.

![Společné rozhraní pro přemosťování tokenů](./bridge1.png)

## 4. Zadejte částku a přesuňte prostředky

Zkontrolujte si částku, kterou získáte na oplátku v síti 2. vrstvy, a poplatky, abyste se vyhnuli nepříjemným překvapením.

![Společné rozhraní pro přemosťování tokenů](./bridge2.png)

## 5. Potvrďte tuto transakci ve své peněžence

Za zpracování transakce budete muset zaplatit poplatek (nazývaný [palivo](/glossary/#gas)) ve formě ETH.

![Společné rozhraní pro přemosťování tokenů](./bridge3.png)

## 6. Počkejte, až budou vaše prostředky převedeny

Tento proces by neměl trvat déle než 10 minut.

## 7. Přidejte vybranou síť 2. vrstvy do své peněženky (volitelné)

Podrobnosti o síti RPC můžete zjistit pomocí [chainlist.org](http://chainlist.org). Po přidání sítě a dokončení transakce byste měli tokeny vidět ve své peněžence. <br />

<Alert variant="update">
<AlertEmoji text=":eyes:"/>
<AlertContent className="justify-between flex-row items-center">
  <div>Chcete se dozvědět více?
</div>
  <ButtonLink href="/guides/">
    Podívejte se na naše další návody
  </ButtonLink>
</AlertContent>
</Alert>

## Často kladené dotazy

### Co když mám prostředky na burze?

Možná budete moci vybírat na některé 2. vrstvě přímo z burzy. Další informace naleznete v části „Přejít na druhou vrstvu“ na naší [stránce o druhé vrstvě](/layer-2/).

### Mohu se po přesunu svých tokenů na 2. vrstvu vrátit zpět do hlavní sítě Etherea?

Ano, své prostředky můžete kdykoli přesunout zpět do hlavní sítě pomocí stejného mostu.
