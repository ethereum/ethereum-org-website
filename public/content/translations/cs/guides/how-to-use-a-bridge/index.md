---
title: Jak přemostit tokeny na vrstvu 2
description: Průvodce vysvětlující, jak přesunout tokeny z Etherea na vrstvu 2 pomocí mostu.
lang: cs
---

Pokud je na Ethereu velký provoz, může se prodražit. Jedním z řešení je vytvoření nových „vrstev“: tj. různých sítí, které fungují podobně jako samotné Ethereum. Tyto takzvané vrstvy 2 (l2) pomáhají snížit přetížení a náklady na Ethereu tím, že zpracovávají mnohem více transakcí s nižšími poplatky a výsledek ukládají na Ethereum jen občas. Díky tomu nám tyto vrstvy 2 umožňují provádět transakce s vyšší rychlostí a nižšími náklady. Mnoho populárních krypto projektů přechází na vrstvy 2 právě kvůli těmto výhodám. Nejjednodušší způsob, jak přesunout tokeny z Etherea na vrstvu 2, je použít most.

**Předpoklady:** 

- mít krypto peněženku – pokud ji nemáte, postupujte podle tohoto průvodce a [vytvořte si účet na Ethereu](/guides/how-to-create-an-ethereum-account/)
- přidat prostředky do své peněženky

## 1. Určete, kterou síť vrstvy 2 chcete použít {#1-determine-which-layer-2-network-you-want-to-use}

Více o různých projektech a důležitých odkazech se dozvíte na naší [stránce o vrstvě 2](/layer-2/).

## 2. Přejděte na vybraný most {#2-go-to-the-selected-bridge}

Některé populární vrstvy 2 jsou:

- [Most Arbitrum](https://portal.arbitrum.io/bridge?l2ChainId=42161)
- [Most Optimism](https://app.optimism.io/bridge/deposit)
- [Most sítě Boba](https://hub.boba.network/)

## 3. Připojte se k mostu pomocí své peněženky {#3-connect-to-the-bridge-with-your-wallet}

Ujistěte se, že je vaše peněženka připojena k síti Ethereum Mainnet. Pokud není, webová stránka vás automaticky vyzve k přepnutí sítí.

![Common interface for bridging tokens](./bridge1.png)

## 4. Zadejte částku a přesuňte prostředky {#4-specify-the-amount-and-move-the-funds}

Zkontrolujte částku, kterou získáte zpět v síti vrstvy 2, a poplatky, abyste se vyhnuli nepříjemným překvapením.

![Common interface for bridging tokens](./bridge2.png)

## 5. Potvrďte transakci ve své peněžence {#5-confirm-the-transaction-in-your-wallet}

Za zpracování transakce budete muset zaplatit poplatek (zvaný [gas](/glossary/#gas)) ve formě ETH.

![Common interface for bridging tokens](./bridge3.png)

## 6. Počkejte na přesun vašich prostředků {#6-wait-for-your-funds-to-be-moved}

Tento proces by neměl trvat déle než 10 minut.

## 7. Přidejte vybranou síť vrstvy 2 do své peněženky (volitelné) {#7-add-the-selected-layer-2-network-to-your-wallet-optional}

K nalezení RPC údajů sítě můžete použít [chainlist.org](https://chainlist.org). Jakmile je síť přidána a transakce dokončena, měli byste vidět tokeny ve své peněžence.
<br />

<Alert variant="update">
<AlertEmoji text=":eyes:"/>
<AlertContent className="justify-between flex-row items-center">
  <div>Chcete se dozvědět více?</div>
  <ButtonLink href="/guides/">
    Podívejte se na naše další průvodce
  </ButtonLink>
</AlertContent>
</Alert>

## Často kladené dotazy {#frequently-asked-questions}

### Co když mám prostředky na burze? {#what-if-i-have-funds-on-an-exchange}

Na některé vrstvy 2 si možná budete moci vybrat prostředky přímo z burzy. Další informace najdete v sekci „Přesun na vrstvu 2“ na naší [stránce o vrstvě 2](/layer-2/).

### Mohu se vrátit na Ethereum Mainnet poté, co přemostím své tokeny na L2? {#can-i-go-back-to-ethereum-mainnet-after-i-bridge-my-tokens-to-l2}

Ano, své prostředky můžete vždy přesunout zpět na Mainnet pomocí stejného mostu.