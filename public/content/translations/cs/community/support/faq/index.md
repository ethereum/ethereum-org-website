---
title: "Často kladené dotazy"
description: "Běžné dotazy o Ethereu týkající se peněženek, transakcí, uzamykání a dalších věcí."
lang: cs
---

# Často kladené dotazy {#faq}

## Poslal jsem krypto na špatnou adresu {#wrong-wallet}

Transakce odeslaná na Ethereu je nevratná. Pokud jste bohužel poslali ETH nebo tokeny na špatnou peněženku, neexistuje způsob, jak transakci vrátit.

**Co můžete udělat:**

- **Pokud znáte majitele adresy**, kontaktujte ho přímo a požádejte ho o vrácení prostředků
- **Pokud adresa patří burze nebo známé službě**, kontaktujte jejich tým podpory, protože by vám mohli pomoci
- **Pokud jste odeslali tokeny na adresu kontraktu**, zkontrolujte, zda má kontrakt funkci pro výběr nebo obnovení (to je vzácné)

Ve většině případů neexistuje způsob, jak prostředky získat zpět. Ethereum nevlastní žádná centrální organizace, subjekt ani osoba, což znamená, že nikdo nemůže transakce vrátit. Před potvrzením si vždy dvakrát zkontrolujte adresu příjemce.

## Ztratil jsem přístup ke své peněžence {#lost-wallet-access}

Možnosti obnovení závisí na typu peněženky, kterou používáte.

### Pokud máte svou bezpečnostní frázi (frázi pro obnovení)

Pomocí bezpečnostní fráze můžete svou peněženku obnovit v jakékoli kompatibilní aplikaci peněženky. Proto je důležité, abyste svou bezpečnostní frázi uchovávali bezpečně v režimu offline. Pokyny k obnovení naleznete v dokumentaci poskytovatele vaší peněženky.

### Pokud jste ztratili svou bezpečnostní frázi

Bez vaší bezpečnostní fráze nebo privátních klíčů nelze vaše prostředky obnovit. Nikdo, včetně ethereum.org, vám nemůže obnovit heslo ani přístup k peněžence s vlastní správou.

### Pokud je váš účet na burze

Pokud je váš účet na centralizované burze, jako je Coinbase, Binance nebo Kraken, kontaktujte přímo tým podpory burzy. Oni spravují účty na své platformě a mohou vám pomoci s resetováním hesla nebo obnovením účtu.

<Alert variant="warning">
<AlertEmoji text=":shield:"/>
<AlertContent>
<AlertDescription>

**Nikdy nesdělujte svou bezpečnostní frázi nikomu**, kdo tvrdí, že vám pomáhá obnovit vaši peněženku. Jedná se o jednu z nejčastějších podvodných taktik. Žádná legitimní služba vás nikdy nepožádá o vaši bezpečnostní frázi.
</AlertDescription>
</AlertContent>
</Alert>

<DocLink href="/guides/how-to-use-a-wallet/">
  Jak používat peněženku
</DocLink>

## Moje transakce je zaseknutá nebo čeká na vyřízení {#stuck-transaction}

Transakce na Ethereu se mohou zaseknout, když je vámi nastavený poplatek za palivo nižší, než síť aktuálně vyžaduje. Většina peněženek vám to umožní opravit:

- **Urychlit:** Odešlete stejnou transakci znovu s vyšším poplatkem za palivo
- **Zrušit:** Odešlete transakci 0 ETH na svou vlastní adresu se stejným nonce, jaké má čekající transakce

### Užitečné příručky

- [Jak urychlit nebo zrušit nevyřízenou transakci na MetaMask](https://support.metamask.io/transactions-and-gas/transactions/how-to-speed-up-or-cancel-a-pending-transaction/)
- [Jak zrušit nevyřízené transakce na Ethereu](https://info.etherscan.com/how-to-cancel-ethereum-pending-transactions/)

## Jak mohu získat svou odměnu z Ethereum giveaway? {#giveaway-scam}

Ethereum giveaway jsou podvody navržené k tomu, aby vám ukradly ETH. Nenechte se zlákat nabídkami, které se zdají být příliš dobré na to, aby byly pravdivé. Pokud pošlete ETH na adresu giveaway, žádnou odměnu nedostanete a nebudete moci své prostředky získat zpět.

[Více o prevenci podvodů](/security/#common-scams)

## Jak stakovat ETH? {#how-to-stake}

Chcete-li se stát validátorem, musíte zastakovat 32 ETH v Ethereum deposit contractu a nastavit validační síťový uzel. S menším množstvím ETH se můžete také zúčastnit prostřednictvím stakingových poolů.

Více informací je k dispozici na našich [stránkách o uzamykání](/staking/) a na [staking launchpadu](https://launchpad.ethereum.org/).

## Jak mohu těžit Ethereum? Těžba Etherea {#mining-ethereum}

Těžba Etherea už není možná. Těžba byla vypnuta, když Ethereum v září 2022 během [Sloučení (The Merge)](/roadmap/merge/) přešlo z [důkazu prací](/glossary/#pow) na [důkaz podílem](/glossary/#pos). Nyní má Ethereum místo těžařů validátory. Každý může [stakovat](/glossary/#staking) ETH a dostávat odměny za stakování za provozování validačního softwaru zabezpečujícího síť.
