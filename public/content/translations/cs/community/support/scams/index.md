---
title: Byl jsem podveden nebo jsem přišel o prostředky
metaTitle: Pomoc a hlášení podvodů
description: Co dělat, pokud jste se stali obětí podvodu, jak zabezpečit zbývající aktiva a kde nahlásit podvod.
lang: cs
---

Podvody s kryptoměnami cílí na lidi všech úrovní zkušeností, včetně profesionálů v oblasti financí a technologií. Nejste v tom sami a to, že jste tady, je správný první krok.

<Alert variant="error">
<AlertEmoji text=":rotating_light:"/>
<AlertContent>
<AlertDescription>

**Nikdo nemůže zvrátit transakce na blockchainu.** Pokud vás někdo kontaktuje s tvrzením, že dokáže za poplatek získat vaše prostředky zpět, jde téměř jistě o další podvod. Viz [podvody s obnovou prostředků](#scam-types) níže.

</AlertDescription>
</AlertContent>
</Alert>

## Zabezpečte svá zbývající aktiva {#secure-assets}

Pokud jste komunikovali s podvodníkem nebo máte podezření, že je vaše peněženka kompromitována, okamžitě proveďte tyto kroky:

1. **Přesuňte zbývající prostředky** do nové, bezpečné peněženky, ke které podvodník nemá přístup
2. **Zrušte schválení tokenů.** Podvodníci vás často zmanipulují ke schválení neomezeného utrácení tokenů. Zrušení těchto oprávnění zabrání dalšímu vysávání vaší peněženky
3. **Změňte hesla** u všech účtů na burzách, které by mohly být propojeny
4. **Povolte dvoufázové ověření (2FA)** u všech účtů souvisejících s kryptem

### Jak zrušit schválení tokenů {#revoke-approvals}

Když interagujete s decentralizovanou aplikací (dapp) nebo chytrým kontraktem, možná jste jim udělili oprávnění utrácet vaše tokeny. Pokud vás podvodník zmanipuloval ke schválení škodlivého kontraktu, může pokračovat ve vysávání vašich tokenů i po počátečním podvodu.

K ověření a zrušení schválení použijte tyto nástroje:

- [Revoke.cash](https://revoke.cash/): připojte svou peněženku, abyste viděli všechna aktivní schválení a mohli je zrušit
- [Revokescout](https://revoke.blockscout.com/): zkontrolujte a zrušte schválení přes Blockscout
- [Etherscan Token Approval Checker](https://etherscan.io/tokenapprovalchecker): zkontrolujte a zrušte schválení přes Etherscan

<DocLink href="/guides/how-to-revoke-token-access/">
  Podrobný průvodce: Jak zrušit přístup k tokenům
</DocLink>

## Nahlaste podvodné adresy a webové stránky {#report}

Nahlášení pomáhá varovat ostatní uživatele a může pomoci při vyšetřování orgánům činným v trestním řízení. Vše zdokumentujte: hashe transakcí, adresy peněženek, snímky obrazovky a jakoukoli komunikaci s podvodníkem.

### Nahlaste podvodnou adresu {#report-address}

- [Chainabuse](https://www.chainabuse.com/): komunitou spravovaná databáze pro hlášení podvodů. Odešlete hlášení a vyhledejte známé podvodné adresy
- [Nahlášení na Etherscanu](https://info.etherscan.com/report-address/): označte adresu na nejpoužívanějším prohlížeči bloků Etherea
- [CryptoScamDB](https://cryptoscamdb.org/): open-source databáze sledující podvody s kryptoměnami

### Nahlaste podvodnou webovou stránku nebo účet na sociálních sítích {#report-website}

- [PhishTank](https://phishtank.org/): odešlete a ověřte phishingové URL adresy
- [Google Safe Browsing](https://safebrowsing.google.com/safebrowsing/report_phish/): nahlaste phishingové stránky Googlu, aby byly zablokovány v prohlížeči Chrome a dalších prohlížečích
- [Netcraft](https://report.netcraft.com/report/mistake): nahlaste škodlivé a podvodné webové stránky
- Nahlaste to přímo na platformě sociálních médií, kde k podvodu došlo (Twitter/X, Discord i Telegram mají funkce pro nahlašování)

### Nahlaste to orgánům činným v trestním řízení {#report-law-enforcement}

- **Spojené státy:** [FBI Internet Crime Complaint Center (IC3)](https://www.ic3.gov/)
- **Spojené království:** [Action Fraud](https://www.actionfraud.police.uk/)
- **Evropská unie:** [Europol](https://www.europol.europa.eu/report-a-crime)
- **Ostatní země:** podejte trestní oznámení na místní policii. Podvody s kryptoměnami jsou ve většině jurisdikcí trestným činem

## Analyzujte, co se stalo {#analyze}

Pochopení toho, kam vaše prostředky odešly, může pomoci při nahlašování a může podpořit snahy o jejich získání zpět, pokud prostředky skončí na centralizované burze.

- [Blockscout](https://eth.blockscout.com/): open-source prohlížeč bloků pro vyhledání jakéhokoli hashe transakce nebo adresy peněženky, abyste viděli, kam byly prostředky odeslány
- [Etherscan](https://etherscan.io/): vyhledejte jakýkoli hash transakce nebo adresu peněženky, abyste viděli, kam byly prostředky odeslány
- [Vyhledávání na Chainabuse](https://www.chainabuse.com/): zkontrolujte, zda adresa již nebyla nahlášena jinými oběťmi
- [MetaSleuth](https://metasleuth.io/) od BlockSec: nástroj pro vizuální sledování transakcí, který mapuje toky prostředků

**Pokud byly prostředky odeslány na centralizovanou burzu** (jako Coinbase, Binance, Kraken), okamžitě kontaktujte jejich tým podpory s podrobnostmi o transakci. Burzy mohou někdy zmrazit účty označené pro podvod.

## Krutá pravda {#hard-truth}

Protože je Ethereum decentralizované, žádná centrální autorita nemůže zvrátit transakce ani získat zpět ukradené prostředky. Jakmile je transakce potvrzena na blockchainu, je konečná.

Nahlašování má přesto smysl. Hlášení pomáhají orgánům činným v trestním řízení sledovat organizované podvodné skupiny a označení adres na Chainabuse a Etherscanu varuje budoucí potenciální oběti.

## Typy podvodů, na které si dát pozor {#scam-types}

<ExpandableCard
title="Giveaway and airdrop scams"
contentPreview="No one is giving away free ETH. These offers are always scams."
eventCategory="SupportScamPage"
eventName="clicked giveaway scam"
>

Podvodníci vytvářejí falešné soutěže (giveaways), ve kterých slibují znásobení vašeho ETH nebo tokeny zdarma. Často se vydávají za známé osobnosti, jako je Vitalik Buterin. Pokud pošlete ETH na adresu takové "soutěže", nic zpět nedostanete.

**Pamatujte:** Vitalik a další prominentní osobnosti vás nikdy nepožádají, abyste jim poslali ETH.

[Více o běžných podvodech](/security/#common-scams)

</ExpandableCard>

<ExpandableCard
title="Impersonation and fake support"
contentPreview="No one from Ethereum or ethereum.org will ever contact you first."
eventCategory="SupportScamPage"
eventName="clicked impersonation scam"
>

Podvodníci se vydávají za členy týmu Etherea, moderátory nebo agenty podpory na Discordu, Telegramu a sociálních sítích. Mohou vám posílat soukromé zprávy s nabídkou pomoci nebo tvrzením, že je s vaším účtem problém.

**Pamatujte:**

- Neexistuje žádný "tým podpory Etherea"
- Skuteční moderátoři vám nikdy nepošlou soukromou zprávu jako první
- Nikdy s nikým a z žádného důvodu nesdílejte svou seed frázi ani soukromé klíče
- Nikdy neklikejte na odkazy zaslané v nevyžádaných zprávách

</ExpandableCard>

<ExpandableCard
title="Recovery scams"
contentPreview="After being scammed, watch out for fake 'crypto recovery experts.'"
eventCategory="SupportScamPage"
eventName="clicked recovery scam"
>

Podvody s obnovou prostředků se specificky zaměřují na lidi, kteří již o prostředky přišli. Podvodníci sledují sociální sítě a hledají lidi, kteří mluví o tom, že byli podvedeni, a poté je kontaktují a vydávají se za "vyšetřovatele blockchainu" nebo "experty na obnovu krypta".

Slibují, že za poplatek předem vystopují a získají zpět vaše ukradené krypto. Jakmile zaplatíte, zmizí.

**Žádná legitimní služba nemůže zvrátit transakce na blockchainu.** Každý, kdo to slibuje, lže. Jedná se o jeden z nejběžnějších následných podvodů.

</ExpandableCard>

<ExpandableCard
title="Phishing websites and fake apps"
contentPreview="Scam sites mimic real wallets and exchanges to steal your credentials."
eventCategory="SupportScamPage"
eventName="clicked phishing scam"
>

Phishingové stránky vypadají identicky jako skutečné aplikace peněženek, burzy nebo platformy decentralizovaných financí (DeFi). Zmanipulují vás k zadání vaší seed fráze nebo připojení vaší peněženky a poté vaše prostředky vysají.

**Chraňte se:**

- Před připojením peněženky vždy ověřte URL adresu
- Uložte si do záložek oficiální stránky, které pravidelně používáte
- Nikdy nezadávejte svou seed frázi na žádné webové stránce. Legitimní aplikace o ni nikdy nežádají
- K ověření podezřelých URL adres použijte [PhishTank](https://phishtank.org/)

<DocLink href="/guides/how-to-id-scam-tokens/">
  Jak identifikovat podvodné tokeny
</DocLink>

</DocLink>

<DocLink href="/security/">
  Kompletní průvodce bezpečností Etherea a prevencí podvodů
</DocLink>