---
title: Často kladené dotazy
description: Časté dotazy ohledně Etherea týkající se peněženek, transakcí, stakingu a dalších témat.
lang: cs
---

## Poslal(a) jsem krypto na špatnou adresu {#wrong-wallet}

Transakce odeslaná v síti Ethereum je nevratná. Pokud jste bohužel poslali ETH nebo tokeny do špatné peněženky, neexistuje žádný způsob, jak transakci zvrátit.

**Co můžete dělat:**

- **Pokud znáte vlastníka adresy**, kontaktujte ho přímo a požádejte ho o vrácení prostředků
- **Pokud adresa patří burze nebo známé službě**, kontaktujte jejich tým podpory, protože by vám mohli pomoci
- **Pokud jste poslali tokeny na adresu kontraktu**, zkontrolujte, zda má kontrakt funkci pro výběr nebo obnovu (to je vzácné)

Ve většině případů neexistuje způsob, jak prostředky získat zpět. Žádná centrální organizace, subjekt ani osoba nevlastní Ethereum, což znamená, že nikdo nemůže transakce zvrátit. Před potvrzením vždy dvakrát zkontrolujte adresu příjemce.

## Ztratil(a) jsem přístup ke své peněžence {#lost-wallet-access}

Vaše možnosti obnovy závisí na typu peněženky, kterou používáte.

### Pokud máte svou seed frázi (obnovovací frázi) {#if-you-have-your-seed-phrase-recovery-phrase}

Svou peněženku můžete obnovit v jakékoli kompatibilní aplikaci peněženky pomocí vaší seed fráze. Proto je naprosto zásadní uchovávat vaši seed frázi bezpečně offline. Pokyny k obnově najdete v dokumentaci poskytovatele vaší peněženky.

### Pokud jste ztratili svou seed frázi {#if-you-have-lost-your-seed-phrase}

Bez vaší seed fráze nebo soukromých klíčů nelze vaše prostředky obnovit. Nikdo, včetně ethereum.org, nemůže resetovat vaše heslo nebo obnovit přístup k peněžence s vlastní správou.

### Pokud je váš účet na burze {#if-your-account-is-on-an-exchange}

Pokud je váš účet na centralizované burze, jako je Coinbase, Binance nebo Kraken, kontaktujte přímo tým podpory dané burzy. Mají kontrolu nad účty na své platformě a mohou vám pomoci s resetováním hesla nebo obnovou účtu.

<Alert variant="warning">
<AlertEmoji text=":shield:"/>
<AlertContent>
<AlertDescription>

**Nikdy nesdílejte svou seed frázi s nikým**, kdo tvrdí, že vám pomůže obnovit vaši peněženku. Jedná se o jednu z nejčastějších taktik podvodníků. Žádná legitimní služba vás nikdy nepožádá o vaši seed frázi.

</AlertDescription>
</AlertContent>
</Alert>

<DocLink href="/guides/how-to-use-a-wallet/">
  Jak používat peněženku
</DocLink>

## Moje transakce je zaseknutá nebo čekající {#stuck-transaction}

Transakce v síti Ethereum se mohou zaseknout, když byl poplatek za plyn, který jste nastavili, nižší, než co síť aktuálně vyžaduje. Většina peněženek vám to umožní opravit:

- **Zrychlit:** Znovu odešlete stejnou transakci s vyšším poplatkem za plyn
- **Zrušit:** Pošlete transakci s 0 ETH na svou vlastní adresu pomocí stejné nonce jako má čekající transakce

### Užiteční průvodci {#helpful-guides}

- [Jak zrychlit nebo zrušit čekající transakci v MetaMask](https://support.metamask.io/transactions-and-gas/transactions/how-to-speed-up-or-cancel-a-pending-transaction/)
- [Jak zrušit čekající transakce v síti Ethereum](https://info.etherscan.com/how-to-cancel-ethereum-pending-transactions/)

## Jak mohu uplatnit nárok na Ethereum z rozdávání (giveaway)? {#giveaway-scam}

Rozdávání Etherea (giveaways) jsou podvody navržené tak, aby vám ukradly vaše ETH. Nenechte se zlákat nabídkami, které se zdají být příliš dobré na to, aby to byla pravda. Pokud pošlete ETH na adresu rozdávání, nic neobdržíte a nebudete moci získat své prostředky zpět.

[Více o prevenci podvodů](/security/#common-scams)

## Jak mohu stakovat ETH? {#how-to-stake}

Chcete-li se stát validátorem, musíte stakovat 32 ETH do depozitního kontraktu Etherea a nastavit uzel validátoru. Můžete se také zúčastnit s menším množstvím ETH prostřednictvím staking poolů.

Více informací je k dispozici na našich [stránkách o stakingu](/staking/) a na [staking launchpadu](https://launchpad.ethereum.org/).

## Jak mohu těžit Ethereum? {#mining-ethereum}

Těžba Etherea již není možná. Těžba byla vypnuta, když Ethereum přešlo z [důkazu prací (PoW)](/glossary/#pow) na [důkaz podílem (PoS)](/glossary/#pos) během [Merge](/roadmap/merge/) v září 2022. Nyní má Ethereum místo těžařů validátory. Kdokoli může [stakovat](/glossary/#staking) ETH a získávat odměny za staking za provozování softwaru validátoru k zabezpečení sítě.