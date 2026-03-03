---
title: Pomoc s podvody a jejich nahlášení
description: Co dělat, pokud jste se stali obětí podvodu, jak zabezpečit zbývající aktiva a kde podvod nahlásit.
lang: cs
---

# Někdo mě podvedl, nebo jsem přišel(a) o prostředky {#scam-help}

Podvody s kryptoměnami se zaměřují na lidi všech úrovní zkušeností, včetně profesionálů v oblasti financí a technologií. Nejste v tom sami a to, že jste tady, je správný první krok.

<Alert variant="error">
<AlertEmoji text=":rotating_light:"/>
<AlertContent>
<AlertDescription>

**Nikdo nemůže zvrátit blockchainové transakce.** Pokud vás někdo kontaktuje s tvrzením, že vám za poplatek může obnovit vaše prostředky, jedná se téměř jistě o druhý podvod. Viz [podvody s obnovou](#recovery-scams) níže.

</AlertDescription>
</AlertContent>
</Alert>

## Zabezpečte svá zbývající aktiva {#secure-assets}

Pokud jste komunikovali s podvodníkem nebo máte podezření, že vaše peněženka byla kompromitována, okamžitě podnikněte následující kroky:

1. **Přesuňte zbývající prostředky** do nové, bezpečné peněženky, ke které podvodník nemá přístup
2. **Zrušte schválení tokenů.** Podvodníci vás často přimějí schválit neomezené utrácení tokenů. Zrušení těchto oprávnění zabrání dalšímu odčerpávání prostředků z vaší peněženky
3. **Změňte hesla** na všech propojených účtech na burzách
4. **Povolte dvoufázové ověření (2FA)** na všech účtech souvisejících s kryptoměnami

### Jak zrušit schválení tokenů {#revoke-approvals}

Když komunikujete s dapp nebo chytrým kontraktem, možná jste mu udělili oprávnění utrácet vaše tokeny. Pokud vás podvodník přiměl schválit škodlivý kontrakt, může pokračovat v odčerpávání vašich tokenů i po původním podvodu.

Použijte tyto nástroje ke kontrole a zrušení schválení:

- [Revoke.cash](https://revoke.cash/): připojte svou peněženku, abyste viděli všechna aktivní schválení a zrušili je
- [Revokescout](https://revoke.blockscout.com/): zkontrolujte a zrušte schválení prostřednictvím Blockscout
- [Etherscan Token Approval Checker](https://etherscan.io/tokenapprovalchecker): zkontrolujte a zrušte schválení prostřednictvím Etherscanu

<DocLink href="/guides/how-to-revoke-token-access/">
  Podrobný průvodce: Jak zrušit přístup k tokenům
</DocLink>

## Nahlaste podvodné adresy a webové stránky {#report}

Nahlášení pomáhá varovat ostatní uživatele a může pomoci při vyšetřování orgánů činných v trestním řízení. Vše zdokumentujte: haše transakcí, adresy peněženek, snímky obrazovky a jakoukoli komunikaci s podvodníkem.

### Nahlaste podvodnou adresu {#report-address}

- [Chainabuse](https://www.chainabuse.com/): komunitní databáze pro hlášení podvodů. Odesílejte hlášení a vyhledávejte známé podvodné adresy
- [Etherscan report](https://info.etherscan.com/report-address/): označte adresu na nejpoužívanějším prohlížeči bloků Etherea
- [CryptoScamDB](https://cryptoscamdb.org/): open-source databáze sledující podvody s kryptoměnami

### Nahlaste podvodný web nebo účet na sociálních sítích {#report-website}

- [PhishTank](https://phishtank.org/): odešlete a ověřte phishingové adresy URL
- [Google Safe Browsing](https://safebrowsing.google.com/safebrowsing/report_phish/): nahlaste phishingové stránky společnosti Google, aby byly zablokovány v prohlížeči Chrome a dalších prohlížečích
- [Netcraft](https://report.netcraft.com/report/mistake): nahlaste škodlivé a podvodné webové stránky
- Nahlaste podvod přímo na platformě sociálních médií, kde k němu došlo (Twitter/X, Discord i Telegram mají funkce pro nahlašování)

### Nahlaste to orgánům činným v trestním řízení {#report-law-enforcement}

- **Spojené státy:** [FBI Internet Crime Complaint Center (IC3)](https://www.ic3.gov/)
- **Spojené království:** [Action Fraud](https://www.actionfraud.police.uk/)
- **Evropská unie:** [Europol](https://www.europol.europa.eu/report-a-crime)
- **Ostatní země:** podejte hlášení na místní policii. Podvody s kryptoměnami jsou ve většině jurisdikcí trestným činem

## Analyzujte, co se stalo {#analyze}

Pochopení toho, kam vaše prostředky šly, může pomoci s hlášeními a může podpořit snahy o obnovu, pokud prostředky skončí na centralizované burze.

- [Blockscout](https://eth.blockscout.com/): open-source prohlížeč bloků pro vyhledání jakéhokoli haše transakce nebo adresy peněženky, abyste zjistili, kam byly prostředky odeslány
- [Etherscan](https://etherscan.io/): vyhledejte jakýkoli haš transakce nebo adresu peněženky, abyste viděli, kam byly prostředky odeslány
- [Vyhledávání na Chainabuse](https://www.chainabuse.com/): zkontrolujte, zda adresa již byla nahlášena jinými oběťmi
- [MetaSleuth](https://metasleuth.io/) od BlockSec: vizuální nástroj pro sledování transakcí, který mapuje toky prostředků

**Pokud byly prostředky odeslány na centralizovanou burzu** (jako Coinbase, Binance, Kraken), okamžitě kontaktujte jejich tým podpory s podrobnostmi o transakci. Burzy mohou někdy zmrazit účty označené jako podvodné.

## Krutá pravda {#hard-truth}

Protože je Ethereum decentralizované, žádná centrální autorita nemůže zvrátit transakce ani obnovit ukradené prostředky. Jakmile je transakce potvrzena na blockchainu, je konečná.

Nahlašování má stále smysl. Hlášení pomáhají orgánům činným v trestním řízení sledovat organizované podvodné skupiny a označování adres na Chainabuse a Etherscanu varuje budoucí potenciální oběti.

## Typy podvodů, na které si dát pozor {#scam-types}

<ExpandableCard
title="Podvody s dárky a airdropy"
contentPreview="Nikdo nerozdává ETH zdarma. Tyto nabídky jsou vždy podvody."
eventCategory="SupportScamPage"
eventName="clicked giveaway scam"

>

Podvodníci vytvářejí falešné dárky slibující, že znásobí vaše ETH, nebo vám dají tokeny zdarma. Často se vydávají za známé osobnosti, jako je Vitalik Buterin. Pokud pošlete ETH na "dárkovou" adresu, nic nedostanete zpět.

**Pamatujte:** Vitalik a další prominentní osobnosti vás nikdy nepožádají o zaslání ETH.

[Více o běžných podvodech](/security/#common-scams)

</ExpandableCard>

<ExpandableCard
title="Vydávání se za někoho jiného a falešná podpora"
contentPreview="Nikdo z Etherea nebo ethereum.org vás nikdy nebude kontaktovat jako první."
eventCategory="SupportScamPage"
eventName="clicked impersonation scam"

>

Podvodníci se na Discordu, Telegramu a sociálních sítích vydávají za členy týmu Etherea, moderátory nebo agenty podpory. Mohou vám posílat přímé zprávy s nabídkou pomoci nebo tvrdit, že je problém s vaším účtem.

**Pamatujte:**

- Neexistuje žádný "tým podpory Etherea"
- Skuteční moderátoři vám nikdy nepošlou přímou zprávu jako první
- Nikdy s nikým a z žádného důvodu nesdílejte svou bezpečnostní frázi nebo soukromé klíče
- Nikdy neklikejte na odkazy zaslané v nevyžádaných zprávách

</ExpandableCard>

<ExpandableCard
title="Podvody s obnovou"
contentPreview="Poté, co jste se stali obětí podvodu, dejte si pozor na falešné „experty na obnovu kryptoměn“."
eventCategory="SupportScamPage"
eventName="clicked recovery scam"

>

Podvody s obnovou se zaměřují konkrétně na lidi, kteří již o prostředky přišli. Podvodníci sledují na sociálních sítích lidi, kteří mluví o tom, že byli podvedeni, a pak se jim ozvou a vydávají se za "blockchainové vyšetřovatele" nebo "experty na obnovu kryptoměn".

Slibují, že vystopují a obnoví vaše ukradené kryptoměny za poplatek předem. Poté, co zaplatíte, zmizí.

**Žádná legitimní služba nemůže zvrátit blockchainové transakce.** Každý, kdo to slibuje, lže. Jedná se o jeden z nejčastějších následných podvodů.

</ExpandableCard>

<ExpandableCard
title="Phishingové weby a falešné aplikace"
contentPreview="Podvodné stránky napodobují skutečné peněženky a burzy, aby ukradly vaše přihlašovací údaje."
eventCategory="SupportScamPage"
eventName="clicked phishing scam"

>

Phishingové stránky vypadají identicky jako skutečné aplikace peněženek, burzy nebo platformy DeFi. Přimějí vás zadat vaši bezpečnostní frázi nebo připojit vaši peněženku a poté vám odčerpají prostředky.

**Chraňte se:**

- Před připojením peněženky si vždy ověřte adresu URL
- Uložte si do záložek oficiální stránky, které pravidelně používáte
- Nikdy nezadávejte svou bezpečnostní frázi na žádné webové stránce. Legitimní aplikace ji nikdy nevyžadují
- Použijte [PhishTank](https://phishtank.org/) ke kontrole podezřelých adres URL

<DocLink href="/guides/how-to-id-scam-tokens/">
  Jak rozpoznat podvodné tokeny
</DocLink>

</ExpandableCard>

<DocLink href="/security/">
  Kompletní průvodce zabezpečením Etherea a prevencí podvodů
</DocLink>
